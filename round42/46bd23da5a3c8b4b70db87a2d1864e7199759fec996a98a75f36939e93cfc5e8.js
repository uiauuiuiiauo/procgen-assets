export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const thickGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8d1d4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x354044,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.270, 0.000),
    new THREE.Vector2(0.340, 0.018),
    new THREE.Vector2(0.385, 0.055),
    new THREE.Vector2(0.414, 0.120),
    new THREE.Vector2(0.425, 0.210),
    new THREE.Vector2(0.423, 0.300),
    new THREE.Vector2(0.405, 0.410),
    new THREE.Vector2(0.372, 0.530),
    new THREE.Vector2(0.330, 0.650),
    new THREE.Vector2(0.286, 0.760),
    new THREE.Vector2(0.245, 0.860),
    new THREE.Vector2(0.205, 0.960),
    new THREE.Vector2(0.168, 1.055),
    new THREE.Vector2(0.142, 1.135),
    new THREE.Vector2(0.126, 1.205),
    new THREE.Vector2(0.120, 1.270),
    new THREE.Vector2(0.120, 1.340),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, glassMat);
  root.add(body);

  const inner_neckGeom = new THREE.CylinderGeometry(
    0.103,
    0.103,
    0.225,
    64,
    1,
    true
  );
  const inner_neck = new THREE.Mesh(inner_neckGeom, glassMat);
  inner_neck.position.y = 1.242;
  root.add(inner_neck);

  const rolled_lipProfile = [
    new THREE.Vector2(0.118, 1.315),
    new THREE.Vector2(0.143, 1.322),
    new THREE.Vector2(0.164, 1.340),
    new THREE.Vector2(0.171, 1.363),
    new THREE.Vector2(0.166, 1.386),
    new THREE.Vector2(0.149, 1.403),
    new THREE.Vector2(0.124, 1.410),
    new THREE.Vector2(0.106, 1.401),
    new THREE.Vector2(0.101, 1.384),
    new THREE.Vector2(0.104, 1.355),
    new THREE.Vector2(0.111, 1.330),
    new THREE.Vector2(0.118, 1.315),
  ];
  const rolled_lipGeom = new THREE.LatheGeometry(rolled_lipProfile, 64);
  const rolled_lip = new THREE.Mesh(rolled_lipGeom, thickGlassMat);
  root.add(rolled_lip);

  const neck_collarGeom = new THREE.TorusGeometry(0.120, 0.008, 12, 64);
  const neck_collar = new THREE.Mesh(neck_collarGeom, thickGlassMat);
  neck_collar.rotation.x = Math.PI / 2;
  neck_collar.position.y = 1.315;
  root.add(neck_collar);

  const mouth_rimGeom = new THREE.RingGeometry(0.101, 0.148, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, thickGlassMat);
  mouth_rim.rotation.x = -Math.PI / 2;
  mouth_rim.position.y = 1.407;
  root.add(mouth_rim);

  const inner_openingGeom = new THREE.CircleGeometry(0.100, 64);
  const inner_opening = new THREE.Mesh(inner_openingGeom, openingMat);
  inner_opening.rotation.x = -Math.PI / 2;
  inner_opening.position.y = 1.397;
  root.add(inner_opening);

  const base_ringGeom = new THREE.TorusGeometry(0.337, 0.018, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, thickGlassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.027;
  root.add(base_ring);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.272, 0.010, 10, 64);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, thickGlassMat);
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.043;
  root.add(inner_base_ring);

  const bottom_puntGeom = new THREE.TorusGeometry(0.105, 0.006, 8, 48);
  const bottom_punt = new THREE.Mesh(bottom_puntGeom, thickGlassMat);
  bottom_punt.rotation.x = Math.PI / 2;
  bottom_punt.position.y = 0.047;
  root.add(bottom_punt);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}