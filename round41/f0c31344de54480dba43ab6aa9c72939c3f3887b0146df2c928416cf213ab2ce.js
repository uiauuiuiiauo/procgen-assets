export default function generate(THREE) {
  const bottle = new THREE.Group();

  const amber_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xa66a25,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.76,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const dark_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x4b260f,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const etched_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x68472f,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });

  const bottle_profile = [
    new THREE.Vector2(0.00, 0.035),
    new THREE.Vector2(0.50, 0.025),
    new THREE.Vector2(0.60, 0.035),
    new THREE.Vector2(0.65, 0.075),
    new THREE.Vector2(0.675, 0.16),
    new THREE.Vector2(0.68, 0.30),
    new THREE.Vector2(0.68, 1.60),
    new THREE.Vector2(0.675, 1.75),
    new THREE.Vector2(0.65, 1.92),
    new THREE.Vector2(0.60, 2.08),
    new THREE.Vector2(0.52, 2.23),
    new THREE.Vector2(0.42, 2.36),
    new THREE.Vector2(0.33, 2.46),
    new THREE.Vector2(0.275, 2.56),
    new THREE.Vector2(0.25, 2.68),
    new THREE.Vector2(0.245, 3.23),
    new THREE.Vector2(0.255, 3.28),
    new THREE.Vector2(0.225, 3.31),
    new THREE.Vector2(0.19, 3.31),
    new THREE.Vector2(0.18, 3.27),
    new THREE.Vector2(0.19, 2.70),
    new THREE.Vector2(0.205, 2.61),
    new THREE.Vector2(0.245, 2.50),
    new THREE.Vector2(0.31, 2.40),
    new THREE.Vector2(0.40, 2.30),
    new THREE.Vector2(0.50, 2.17),
    new THREE.Vector2(0.58, 2.02),
    new THREE.Vector2(0.625, 1.86),
    new THREE.Vector2(0.64, 1.68),
    new THREE.Vector2(0.64, 0.28),
    new THREE.Vector2(0.625, 0.18),
    new THREE.Vector2(0.57, 0.11),
    new THREE.Vector2(0.46, 0.085),
    new THREE.Vector2(0.00, 0.085),
  ];

  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_profile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, amber_glassMat);
  bottle_body.renderOrder = 0;
  bottle.add(bottle_body);

  const mouth_rim_profile = [
    new THREE.Vector2(0.245, 3.20),
    new THREE.Vector2(0.305, 3.205),
    new THREE.Vector2(0.355, 3.235),
    new THREE.Vector2(0.375, 3.285),
    new THREE.Vector2(0.375, 3.375),
    new THREE.Vector2(0.350, 3.420),
    new THREE.Vector2(0.295, 3.445),
    new THREE.Vector2(0.205, 3.445),
    new THREE.Vector2(0.175, 3.420),
    new THREE.Vector2(0.165, 3.375),
    new THREE.Vector2(0.168, 3.295),
    new THREE.Vector2(0.190, 3.245),
    new THREE.Vector2(0.245, 3.20),
  ];
  const mouth_rimGeom = new THREE.LatheGeometry(mouth_rim_profile, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, dark_glassMat);
  mouth_rim.renderOrder = 1;
  bottle.add(mouth_rim);

  const inner_mouthGeom = new THREE.CircleGeometry(0.168, 48);
  const inner_mouth = new THREE.Mesh(inner_mouthGeom, dark_glassMat);
  inner_mouth.rotation.x = -Math.PI / 2;
  inner_mouth.position.y = 3.385;
  inner_mouth.renderOrder = 2;
  bottle.add(inner_mouth);

  const base_ringGeom = new THREE.TorusGeometry(0.60, 0.055, 16, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, dark_glassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.075;
  base_ring.renderOrder = 1;
  bottle.add(base_ring);

  const bottom_punt_ringGeom = new THREE.TorusGeometry(0.245, 0.025, 12, 48);
  const bottom_punt_ring = new THREE.Mesh(bottom_punt_ringGeom, dark_glassMat);
  bottom_punt_ring.rotation.x = Math.PI / 2;
  bottom_punt_ring.position.y = 0.105;
  bottom_punt_ring.renderOrder = 1;
  bottle.add(bottom_punt_ring);

  const neck_bandGeom = new THREE.TorusGeometry(0.247, 0.011, 10, 48);
  const neck_band = new THREE.Mesh(neck_bandGeom, dark_glassMat);
  neck_band.rotation.x = Math.PI / 2;
  neck_band.position.y = 3.175;
  neck_band.renderOrder = 1;
  bottle.add(neck_band);

  function bottleRadiusAt(y) {
    if (y <= 1.70) return 0.68;
    if (y <= 1.90) return 0.68 - (y - 1.70) * 0.15;
    if (y <= 2.10) return 0.65 - (y - 1.90) * 0.25;
    return 0.60;
  }

  function surfacePoint(angle, y, offset) {
    const radius = bottleRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function createSurfaceGrooveGeometry(control_points, radius) {
    const path_points = [];
    for (let i = 0; i < control_points.length; i++) {
      const point = control_points[i];
      path_points.push(surfacePoint(point[0], point[1], 0.006));
    }
    const path = new THREE.CatmullRomCurve3(
      path_points,
      false,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(path, 40, radius, 7, false);
  }

  function createGroovePair(geometry) {
    const pair = new THREE.InstancedMesh(geometry, etched_glassMat, 2);
    const transform = new THREE.Matrix4();
    transform.identity();
    pair.setMatrixAt(0, transform);
    transform.makeRotationY(Math.PI);
    pair.setMatrixAt(1, transform);
    pair.instanceMatrix.needsUpdate = true;
    pair.renderOrder = 3;
    return pair;
  }

  const etched_swirls = new THREE.Group();

  const upper_swoopGeom = createSurfaceGrooveGeometry([
    [2.72, 1.66],
    [2.55, 1.51],
    [2.34, 1.31],
    [2.08, 1.10],
    [1.80, 0.96],
    [1.52, 0.91],
    [1.24, 0.98],
    [0.96, 1.18],
    [0.70, 1.45],
    [0.48, 1.67],
  ], 0.011);
  const upper_swoop = createGroovePair(upper_swoopGeom);
  etched_swirls.add(upper_swoop);

  const upper_inner_swoopGeom = createSurfaceGrooveGeometry([
    [2.67, 1.58],
    [2.45, 1.39],
    [2.20, 1.19],
    [1.92, 1.04],
    [1.64, 0.99],
    [1.36, 1.06],
    [1.08, 1.25],
    [0.82, 1.52],
    [0.61, 1.64],
  ], 0.008);
  const upper_inner_swoop = createGroovePair(upper_inner_swoopGeom);
  etched_swirls.add(upper_inner_swoop);

  const lower_swoopGeom = createSurfaceGrooveGeometry([
    [2.74, 1.27],
    [2.55, 1.05],
    [2.34, 0.79],
    [2.10, 0.51],
    [1.84, 0.29],
    [1.57, 0.20],
    [1.30, 0.27],
    [1.03, 0.49],
    [0.77, 0.79],
    [0.53, 1.10],
    [0.38, 1.28],
  ], 0.012);
  const lower_swoop = createGroovePair(lower_swoopGeom);
  etched_swirls.add(lower_swoop);

  const lower_inner_swoopGeom = createSurfaceGrooveGeometry([
    [2.68, 1.17],
    [2.45, 0.94],
    [2.21, 0.68],
    [1.96, 0.43],
    [1.70, 0.28],
    [1.44, 0.29],
    [1.18, 0.46],
    [0.92, 0.73],
    [0.68, 1.01],
    [0.49, 1.18],
  ], 0.008);
  const lower_inner_swoop = createGroovePair(lower_inner_swoopGeom);
  etched_swirls.add(lower_inner_swoop);

  const rising_cutGeom = createSurfaceGrooveGeometry([
    [2.58, 0.31],
    [2.39, 0.47],
    [2.19, 0.66],
    [1.98, 0.86],
    [1.76, 1.08],
    [1.53, 1.31],
    [1.29, 1.52],
    [1.03, 1.66],
  ], 0.009);
  const rising_cut = createGroovePair(rising_cutGeom);
  etched_swirls.add(rising_cut);

  const crossing_cutGeom = createSurfaceGrooveGeometry([
    [0.48, 0.34],
    [0.67, 0.52],
    [0.88, 0.73],
    [1.09, 0.95],
    [1.31, 1.18],
    [1.54, 1.40],
    [1.78, 1.59],
    [2.02, 1.69],
  ], 0.010);
  const crossing_cut = createGroovePair(crossing_cutGeom);
  etched_swirls.add(crossing_cut);

  bottle.add(etched_swirls);

  function fitToUnitCube(root) {
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    root.scale.setScalar(scale);
    root.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(bottle);
  return bottle;
}