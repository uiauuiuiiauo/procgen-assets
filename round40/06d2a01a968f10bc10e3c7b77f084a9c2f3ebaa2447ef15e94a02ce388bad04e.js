export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "black_ceramic_vase";

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x181a1c,
    metalness: 0.0,
    roughness: 0.4,
  });

  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const foot_ringMat = new THREE.MeshStandardMaterial({
    color: 0xb4875e,
    metalness: 0.0,
    roughness: 0.9,
  });

  const outer_profile_curve = new THREE.SplineCurve([
    new THREE.Vector2(0.285, 0.040),
    new THREE.Vector2(0.330, 0.075),
    new THREE.Vector2(0.405, 0.180),
    new THREE.Vector2(0.458, 0.360),
    new THREE.Vector2(0.466, 0.535),
    new THREE.Vector2(0.430, 0.700),
    new THREE.Vector2(0.350, 0.865),
    new THREE.Vector2(0.278, 1.015),
    new THREE.Vector2(0.248, 1.125),
    new THREE.Vector2(0.260, 1.215),
    new THREE.Vector2(0.305, 1.295),
    new THREE.Vector2(0.360, 1.340),
  ]);

  const vase_bodyProfile = outer_profile_curve.getSpacedPoints(64);
  vase_bodyProfile.unshift(new THREE.Vector2(0.0, 0.040));

  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const inner_cavity_curve = new THREE.SplineCurve([
    new THREE.Vector2(0.000, 1.145),
    new THREE.Vector2(0.105, 1.155),
    new THREE.Vector2(0.205, 1.190),
    new THREE.Vector2(0.270, 1.245),
    new THREE.Vector2(0.307, 1.315),
    new THREE.Vector2(0.312, 1.340),
  ]);

  const inner_cavityProfile = inner_cavity_curve.getSpacedPoints(32);
  const inner_cavityGeom = new THREE.LatheGeometry(inner_cavityProfile, 64);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  inner_cavity.name = "inner_cavity";
  root.add(inner_cavity);

  const rolled_rimGeom = new THREE.TorusGeometry(0.336, 0.035, 18, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, vase_bodyMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 1.340;
  root.add(rolled_rim);

  const foot_ringGeom = new THREE.CylinderGeometry(0.302, 0.294, 0.040, 64);
  const foot_ring = new THREE.Mesh(foot_ringGeom, foot_ringMat);
  foot_ring.name = "foot_ring";
  foot_ring.position.y = 0.020;
  root.add(foot_ring);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
}