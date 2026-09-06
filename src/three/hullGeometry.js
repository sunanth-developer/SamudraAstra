import * as THREE from 'three'

function stationPoints(station) {
  const { halfW, deck, keel } = station
  const chine = keel + (deck - keel) * 0.38
  const sheer = deck - 0.018
  return [
    new THREE.Vector3(station.x, deck, 0),
    new THREE.Vector3(station.x, sheer, halfW * 0.72),
    new THREE.Vector3(station.x, chine, halfW),
    new THREE.Vector3(station.x, keel, halfW * 0.22),
    new THREE.Vector3(station.x, keel, -halfW * 0.22),
    new THREE.Vector3(station.x, chine, -halfW),
    new THREE.Vector3(station.x, sheer, -halfW * 0.72),
  ]
}

export function createUsvHullGeometry(scale = 1) {
  const stations = [
    { x: -2.08, halfW: 0.2, deck: 0.15, keel: -0.07 },
    { x: -1.55, halfW: 0.36, deck: 0.2, keel: -0.12 },
    { x: -0.72, halfW: 0.42, deck: 0.22, keel: -0.14 },
    { x: 0.18, halfW: 0.39, deck: 0.21, keel: -0.13 },
    { x: 1.02, halfW: 0.31, deck: 0.18, keel: -0.1 },
    { x: 1.68, halfW: 0.18, deck: 0.13, keel: -0.06 },
    { x: 2.12, halfW: 0.07, deck: 0.075, keel: -0.015 },
    { x: 2.42, halfW: 0.01, deck: 0.028, keel: 0.01 },
  ]

  const rings = stations.map(stationPoints)
  const positions = []
  const normals = []

  const pushTri = (a, b, c) => {
    const ab = new THREE.Vector3().subVectors(b, a)
    const ac = new THREE.Vector3().subVectors(c, a)
    const n = new THREE.Vector3().crossVectors(ab, ac).normalize()
    ;[a, b, c].forEach((p) => {
      positions.push(p.x * scale, p.y * scale, p.z * scale)
      normals.push(n.x, n.y, n.z)
    })
  }

  for (let i = 0; i < rings.length - 1; i += 1) {
    const a = rings[i]
    const b = rings[i + 1]
    for (let k = 0; k < a.length - 1; k += 1) {
      pushTri(a[k], a[k + 1], b[k])
      pushTri(a[k + 1], b[k + 1], b[k])
    }
    pushTri(a[a.length - 1], a[0], b[b.length - 1])
    pushTri(a[0], b[0], b[b.length - 1])
  }

  const bow = rings[rings.length - 1]
  const tip = new THREE.Vector3(2.55, 0.04, 0)
  for (let k = 0; k < bow.length - 1; k += 1) pushTri(bow[k], bow[k + 1], tip)
  pushTri(bow[bow.length - 1], bow[0], tip)

  const stern = rings[0]
  const back = new THREE.Vector3(-2.16, 0.04, 0)
  for (let k = 0; k < stern.length - 1; k += 1) pushTri(stern[k + 1], stern[k], back)
  pushTri(stern[0], stern[stern.length - 1], back)

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  geometry.computeVertexNormals()
  return geometry
}
