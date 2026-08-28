export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x181a1b,
    metalness: 0.0,
    roughness: 0.4,
  });

  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x030404,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const clay_baseMat = new THREE.MeshStandardMaterial({
    color: 0xa47b52,
    metalness: 0.0,
    roughness: 0.9,
  });

  const bodyCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.23, 0.025),
    new THREE.Vector2(0.29, 0.055),
    new THREE.Vector2(0.35, 0.145),
    new THREE.Vector2(0.38, 0.285),
    new THREE.Vector2(0.375, 0.415),
    new THREE.Vector2(0.345, 0.555),
    new THREE.Vector2(0.295, 0.685),
    new THREE.Vector2(0.245, 0.795),
    new THREE.Vector2(0.212, 0.895),
    new THREE.Vector2(0.215, 0.975),
    new THREE.Vector2(0.245, 1.055),
    new THREE.Vector2(0.285, 1.108),
  ]);

  const bodyProfile = [
    new THREE.Vector2(0.0, 0.025),
    ...bodyCurve.getSpacedPoints(56),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const inner_cavityCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.0, 0.845),
    new THREE.Vector2(0.09, 0.855),
    new THREE.Vector2(0.15, 0.895),
    new THREE.Vector2(0.18, 0.965),
    new THREE.Vector2(0.195, 1.035),
    new THREE.Vector2(0.205, 1.084),
  ]);
  const inner_cavityProfile = inner_cavityCurve.getSpacedPoints(32);
  const inner_cavityGeom = new THREE.LatheGeometry(inner_cavityProfile, 64);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  root.add(inner_cavity);

  const rimGeom = new THREE.TorusGeometry(0.247, 0.041, 18, 64);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.108;
  root.add(rim);

  const clay_baseGeom = new THREE.CylinderGeometry(0.235, 0.225, 0.022, 64);
  const clay_base = new THREE.Mesh(clay_baseGeom, clay_baseMat);
  clay_base.position.y = 0.011;
  root.add(clay_base);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}