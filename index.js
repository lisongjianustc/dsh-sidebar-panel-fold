/**
 * Host half of the sidebar panel fold bundle.
 *
 * The fold list is a small durable preference: the Client shows a switch per
 * global panel and this half stores the ids whose launcher stays in the
 * sidebar. It lives under the DSH home (`plugin-state/sidebar-panel-fold/`) so
 * it survives restarts, port changes, browser profiles and plugin upgrades, and
 * it is served to the page over one same-origin prefix route. Nothing is
 * registered on the Host, and the bundle imports no other package.
 */
import { homedir } from 'node:os'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** DSH home; the profile lives under it, so per-user plugin state belongs here too. */
const DSH_HOME = process.env.DSH_HOME ?? join(homedir(), '.dsh')
/** Directory holding this bundle's durable preference. */
const STATE_DIR = join(DSH_HOME, 'plugin-state', 'sidebar-panel-fold')
/** Durable preference file: `{ "visible": ["dsh-context", "agents"] }`. */
const STATE_FILE = join(STATE_DIR, 'visible-panels.json')
/** Root-absolute prefix this bundle serves. */
const ROUTE = '/sidebar-panel-fold/api'
/** Panels shown before the user changes anything; Plugins is never configurable. */
const DEFAULT_VISIBLE = ['dsh-context', 'agents']
/** Byte cap for one request body. */
const BODY_LIMIT = 16 * 1024
/** Harness browser-auth cookie prefix: only an application on this machine holds it. */
const BROWSER_AUTH_COOKIE_PREFIX = 'dsh-auth-'

const JSON_HEADERS = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'referrer-policy': 'no-referrer',
}

/** Last state this process read or wrote; the file is only re-read on startup. */
let cached

/**
 * Keep only distinct non-blank panel ids, in order.
 * @param value - candidate list from the file or the page.
 * @returns the normalized visible list.
 */
function normalizeVisible(value) {
  if (!Array.isArray(value)) return DEFAULT_VISIBLE.slice()
  const out = []
  for (const item of value) {
    if (typeof item !== 'string' || item === '') continue
    if (out.includes(item)) continue
    out.push(item)
  }
  return out
}

/**
 * Read the durable state, falling back to the shipped default.
 * @returns the current state.
 */
async function readState() {
  if (cached !== undefined) return cached
  try {
    const parsed = JSON.parse(await readFile(STATE_FILE, 'utf8'))
    cached = { visible: normalizeVisible(parsed.visible) }
  } catch {
    /* a missing or unreadable preference is simply the default */
    cached = { visible: DEFAULT_VISIBLE.slice() }
  }
  return cached
}

/**
 * Persist one visible list, keeping the in-memory value even when the write fails.
 * @param visible - the requested visible panel ids.
 * @returns the state that is now served.
 */
async function writeState(visible) {
  const next = { visible: normalizeVisible(visible) }
  cached = next
  try {
    await mkdir(STATE_DIR, { recursive: true })
    await writeFile(STATE_FILE, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
  } catch {
    /* the page still sees the value for this process */
  }
  return next
}

/** Write one JSON response. */
function writeJson(res, status, body) {
  res.writeHead(status, JSON_HEADERS)
  res.end(JSON.stringify(body))
}

/** Whether the socket is loopback. */
function isLoopbackAddress(address) {
  return address === '127.0.0.1' || address === '::1' || address === '::ffff:127.0.0.1'
}

/** Whether the request carries a browser signal that it comes from this origin. */
function hasSameOriginMarker(req) {
  if (req.headers['sec-fetch-site'] === 'same-origin') return true
  const origin = req.headers.origin
  const host = req.headers.host
  if (typeof origin === 'string' && typeof host === 'string') {
    try {
      return new URL(origin).host === host
    } catch {
      return false
    }
  }
  const cookie = req.headers.cookie
  if (typeof cookie === 'string') {
    return cookie.split(';').some((part) => part.trim().startsWith(BROWSER_AUTH_COOKIE_PREFIX))
  }
  return false
}

/** The fence admits this machine's own browser only. */
function isTrustedRequest(req) {
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  if (isLoopbackAddress(req.socket?.remoteAddress)) return true
  return hasSameOriginMarker(req)
}

/**
 * Read one JSON object body under the byte cap.
 * @param req - the incoming request.
 * @returns the parsed body.
 */
async function readJsonBody(req) {
  const chunks = []
  let size = 0
  for await (const chunk of req) {
    size += chunk.length
    if (size > BODY_LIMIT) throw new Error('body-too-large')
    chunks.push(chunk)
  }
  if (size === 0) return {}
  const value = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error('invalid-body')
  return value
}

/** Serve `GET /state` and `POST /state` for the page. */
async function handle(req, res) {
  if (!isTrustedRequest(req)) {
    writeJson(res, 403, { ok: false, code: 'forbidden', message: 'this route is served to this machine\'s own browser only' })
    return
  }
  const url = new URL(req.url ?? '/', 'http://127.0.0.1')
  const suffix = url.pathname.startsWith(ROUTE) ? url.pathname.slice(ROUTE.length) : url.pathname
  const path = suffix === '' ? '/' : suffix
  try {
    if (path !== '/state') {
      writeJson(res, 404, { ok: false, code: 'not-found', message: `no route serves ${path}` })
      return
    }
    if (req.method === 'GET') {
      const state = await readState()
      writeJson(res, 200, { ok: true, visible: state.visible })
      return
    }
    if (req.method === 'POST') {
      const body = await readJsonBody(req)
      const state = await writeState(body.visible)
      writeJson(res, 200, { ok: true, visible: state.visible })
      return
    }
    writeJson(res, 405, { ok: false, code: 'method-not-allowed', message: 'this route serves GET and POST' })
  } catch (error) {
    const code = error instanceof Error && error.message === 'body-too-large' ? 'body-too-large' : 'invalid-request'
    writeJson(res, 400, { ok: false, code, message: 'the request could not be applied' })
  }
}

/**
 * Register the state route when this deployment serves a web UI.
 * @param ctx - Host plugin context.
 */
export function apply(ctx) {
  ctx.inject(['webServer'], (scope) => {
    scope.effect(
      () => scope.webServer.register({ kind: 'prefix', path: ROUTE, handler: handle }),
      'sidebar-panel-fold: state route',
    )
  })
}
