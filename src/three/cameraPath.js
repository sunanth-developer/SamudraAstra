function lerp(a, b, t) {
  return a + (b - a) * t
}

function lerpVec(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

const KEYS = [
  { t: 0, pos: [0.15, 1.85, 7.4], look: [0, 0.32, 0], fog: 0.028, under: 0 },
  { t: 0.12, pos: [2.8, 1.7, 6.2], look: [0.05, 0.36, 0], fog: 0.024, under: 0 },
  { t: 0.26, pos: [0.4, 1.7, 7.4], look: [0, 0.35, 0], fog: 0.022, under: 0 },
  { t: 0.4, pos: [-6.2, 2.0, 3.0], look: [0.1, 0.4, 0], fog: 0.02, under: 0.05 },
  { t: 0.56, pos: [-0.2, -0.45, 4.4], look: [0.3, -0.5, 0.1], fog: 0.046, under: 1 },
  { t: 0.7, pos: [4.6, 2.8, 4.0], look: [0.1, 0.35, 0], fog: 0.024, under: 0.2 },
  { t: 0.84, pos: [0.1, 8.6, 0.15], look: [0.1, 0.05, 0], fog: 0.018, under: 0.06 },
  { t: 1, pos: [12.8, 5.4, 14.6], look: [1.8, 0.5, -2], fog: 0.016, under: 0 },
]

export function sampleCamera(progress) {
  const t = Math.min(1, Math.max(0, progress))
  let i = 0
  while (i < KEYS.length - 1 && KEYS[i + 1].t < t) i += 1
  const a = KEYS[i]
  const b = KEYS[Math.min(i + 1, KEYS.length - 1)]
  const span = b.t - a.t || 1
  const u = (t - a.t) / span
  const ease = u * u * (3 - 2 * u)
  return {
    position: lerpVec(a.pos, b.pos, ease),
    look: lerpVec(a.look, b.look, ease),
    fog: lerp(a.fog, b.fog, ease),
    under: lerp(a.under, b.under, ease),
  }
}

export function viewIndex(progress) {
  if (progress < 0.26) return 0
  if (progress < 0.5) return 1
  if (progress < 0.78) return 2
  return 3
}

const SHOWCASE = [
  { t: 0, pos: [4.8, 1.8, 5.0], look: [0.15, 0.42, 0], fog: 0.022, under: 0 },
  { t: 0.34, pos: [0.15, 1.55, 6.8], look: [0.1, 0.35, 0], fog: 0.018, under: 0 },
  { t: 0.67, pos: [0.1, 8.2, 0.12], look: [0.1, 0.04, 0], fog: 0.015, under: 0 },
  { t: 1, pos: [2.05, 1.15, 1.7], look: [0.2, 0.7, 0], fog: 0.028, under: 0 },
]

export function sampleShowcaseCamera(progress) {
  const t = Math.min(1, Math.max(0, progress))
  let i = 0
  while (i < SHOWCASE.length - 1 && SHOWCASE[i + 1].t < t) i += 1
  const a = SHOWCASE[i]
  const b = SHOWCASE[Math.min(i + 1, SHOWCASE.length - 1)]
  const span = b.t - a.t || 1
  const u = (t - a.t) / span
  const ease = u * u * (3 - 2 * u)
  return {
    position: lerpVec(a.pos, b.pos, ease),
    look: lerpVec(a.look, b.look, ease),
    fog: lerp(a.fog, b.fog, ease),
    under: lerp(a.under, b.under, ease),
  }
}

export function showcaseViewIndex(progress) {
  return Math.min(3, Math.max(0, Math.floor(progress * 3.999)))
}

const MOBILE_PULL = 1.78
const MOBILE_LOOK_LIFT = 0.34
const DESKTOP_PULL = 1.14

function pullCamera(sample, pull, lift = 0) {
  const look = [sample.look[0], sample.look[1] + lift, sample.look[2]]
  return {
    ...sample,
    look,
    position: [
      sample.look[0] + (sample.position[0] - sample.look[0]) * pull,
      sample.look[1] + (sample.position[1] - sample.look[1]) * pull + lift,
      sample.look[2] + (sample.position[2] - sample.look[2]) * pull,
    ],
  }
}

export function fitMobileCamera(sample) {
  return pullCamera(sample, MOBILE_PULL, MOBILE_LOOK_LIFT)
}

export function fitDesktopCamera(sample) {
  return pullCamera(sample, DESKTOP_PULL)
}

export const VESSEL_VIEW_SCALE = {
  desktop: 1,
  mobile: 0.56,
}

export function heroCameraStart(mobile = false) {
  const start = {
    position: KEYS[0].pos,
    look: KEYS[0].look,
    fog: KEYS[0].fog,
    under: KEYS[0].under,
  }
  return mobile ? fitMobileCamera(start) : fitDesktopCamera(start)
}
