export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x3b2119,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x24120e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x080706,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const grainMat = new THREE.LineBasicMaterial({
    color: 0x160b08,
    transparent: true,
    opacity: 0.42,
  });

  const bellProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.46, 0.00),
    new THREE.Vector2(0.50, 0.03),
    new THREE.Vector2(0.49, 0.08),
    new THREE.Vector2(0.42, 0.15),
    new THREE.Vector2(0.34, 0.28),
    new THREE.Vector2(0.28, 0.48),
    new THREE.Vector2(0.23, 0.76),
    new THREE.Vector2(0.19, 1.08),
    new THREE.Vector2(0.18, 1.34),
    new THREE.Vector2(0.19, 1.52),
    new THREE.Vector2(0.23, 1.62),
    new THREE.Vector2(0.00, 1.62),
  ];
  const bellGeom = new THREE.LatheGeometry(bellProfile, 48);
  const bell = new THREE.Mesh(bellGeom, woodMat);
  root.add(bell);

  const bell_rimGeom = new THREE.TorusGeometry(0.475, 0.026, 10, 48);
  const bell_rim = new THREE.Mesh(bell_rimGeom, darkWoodMat);
  bell_rim.rotation.x = Math.PI / 2;
  bell_rim.position.y = 0.035;
  root.add(bell_rim);

  const bell_neckGeom = new THREE.CylinderGeometry(0.205, 0.225, 0.28, 32);
  const bell_neck = new THREE.Mesh(bell_neckGeom, woodMat);
  bell_neck.position.y = 1.70;
  root.add(bell_neck);

  const bell_neck_ringGeom = new THREE.TorusGeometry(0.218, 0.030, 10, 36);
  const bell_neck_ring = new THREE.Mesh(bell_neck_ringGeom, darkWoodMat);
  bell_neck_ring.rotation.x = Math.PI / 2;
  bell_neck_ring.position.y = 1.57;
  root.add(bell_neck_ring);

  const lower_connectorProfile = [
    new THREE.Vector2(0.00, 1.76),
    new THREE.Vector2(0.20, 1.76),
    new THREE.Vector2(0.24, 1.82),
    new THREE.Vector2(0.25, 1.90),
    new THREE.Vector2(0.22, 1.98),
    new THREE.Vector2(0.29, 2.04),
    new THREE.Vector2(0.32, 2.12),
    new THREE.Vector2(0.29, 2.20),
    new THREE.Vector2(0.22, 2.27),
    new THREE.Vector2(0.21, 2.34),
    new THREE.Vector2(0.25, 2.40),
    new THREE.Vector2(0.24, 2.47),
    new THREE.Vector2(0.20, 2.52),
    new THREE.Vector2(0.00, 2.52),
  ];
  const lower_connectorGeom = new THREE.LatheGeometry(lower_connectorProfile, 40);
  const lower_connector = new THREE.Mesh(lower_connectorGeom, woodMat);
  root.add(lower_connector);

  const lower_connector_ringGeom = new THREE.TorusGeometry(0.225, 0.025, 10, 36);
  const lower_connector_ring = new THREE.Mesh(lower_connector_ringGeom, darkWoodMat);
  lower_connector_ring.rotation.x = Math.PI / 2;
  lower_connector_ring.position.y = 2.40;
  root.add(lower_connector_ring);

  const main_bodyGeom = new THREE.CylinderGeometry(0.185, 0.205, 1.16, 32);
  const main_body = new THREE.Mesh(main_bodyGeom, woodMat);
  main_body.position.y = 3.04;
  root.add(main_body);

  const main_body_lower_ringGeom = new THREE.TorusGeometry(0.210, 0.038, 12, 40);
  const main_body_lower_ring = new THREE.Mesh(main_body_lower_ringGeom, darkWoodMat);
  main_body_lower_ring.rotation.x = Math.PI / 2;
  main_body_lower_ring.position.y = 2.51;
  root.add(main_body_lower_ring);

  const main_body_upper_ringGeom = new THREE.TorusGeometry(0.205, 0.045, 12, 40);
  const main_body_upper_ring = new THREE.Mesh(main_body_upper_ringGeom, darkWoodMat);
  main_body_upper_ring.rotation.x = Math.PI / 2;
  main_body_upper_ring.position.y = 3.59;
  root.add(main_body_upper_ring);

  const middle_bodyGeom = new THREE.CylinderGeometry(0.175, 0.195, 0.94, 32);
  const middle_body = new THREE.Mesh(middle_bodyGeom, woodMat);
  middle_body.position.y = 4.08;
  root.add(middle_body);

  const middle_body_upper_ringGeom = new THREE.TorusGeometry(0.190, 0.035, 10, 36);
  const middle_body_upper_ring = new THREE.Mesh(middle_body_upper_ringGeom, darkWoodMat);
  middle_body_upper_ring.rotation.x = Math.PI / 2;
  middle_body_upper_ring.position.y = 4.56;
  root.add(middle_body_upper_ring);

  const upper_bodyGeom = new THREE.CylinderGeometry(0.160, 0.180, 0.96, 32);
  const upper_body = new THREE.Mesh(upper_bodyGeom, woodMat);
  upper_body.position.y = 5.06;
  root.add(upper_body);

  const upper_body_lower_ringGeom = new THREE.TorusGeometry(0.180, 0.032, 10, 36);
  const upper_body_lower_ring = new THREE.Mesh(upper_body_lower_ringGeom, darkWoodMat);
  upper_body_lower_ring.rotation.x = Math.PI / 2;
  upper_body_lower_ring.position.y = 4.60;
  root.add(upper_body_lower_ring);

  const upper_body_upper_ringGeom = new THREE.TorusGeometry(0.170, 0.032, 10, 36);
  const upper_body_upper_ring = new THREE.Mesh(upper_body_upper_ringGeom, darkWoodMat);
  upper_body_upper_ring.rotation.x = Math.PI / 2;
  upper_body_upper_ring.position.y = 5.55;
  root.add(upper_body_upper_ring);

  const upper_body_top_ringGeom = new THREE.TorusGeometry(0.168, 0.022, 10, 36);
  const upper_body_top_ring = new THREE.Mesh(upper_body_top_ringGeom, darkWoodMat);
  upper_body_top_ring.rotation.x = Math.PI / 2;
  upper_body_top_ring.position.y = 5.66;
  root.add(upper_body_top_ring);

  const curved_neckPoints = [
    new THREE.Vector3(0.00, 5.55, 0),
    new THREE.Vector3(0.00, 5.95, 0),
    new THREE.Vector3(0.01, 6.34, 0),
    new THREE.Vector3(0.08, 6.67, 0),
    new THREE.Vector3(0.27, 6.94, 0),
    new THREE.Vector3(0.55, 7.10, 0),
    new THREE.Vector3(0.82, 7.12, 0),
    new THREE.Vector3(1.05, 7.02, 0),
    new THREE.Vector3(1.22, 6.88, 0),
  ];
  const curved_neckPath = new THREE.CatmullRomCurve3(
    curved_neckPoints,
    false,
    "centripetal"
  );
  const curved_neckGeom = new THREE.TubeGeometry(
    curved_neckPath,
    72,
    0.175,
    18,
    false
  );
  const curved_neck = new THREE.Mesh(curved_neckGeom, woodMat);
  root.add(curved_neck);

  const elbow_side_portGeom = new THREE.SphereGeometry(1, 16, 10);
  const elbow_side_port = new THREE.Mesh(elbow_side_portGeom, openingMat);
  elbow_side_port.position.set(-0.177, 6.34, 0.015);
  elbow_side_port.scale.set(0.025, 0.105, 0.050);
  root.add(elbow_side_port);

  const mouthpiece_start = new THREE.Vector3(1.18, 6.92, 0);
  const mouthpiece_end = new THREE.Vector3(1.82, 6.55, 0);
  const mouthpiece_direction = mouthpiece_end.clone().sub(mouthpiece_start);
  const mouthpiece_length = mouthpiece_direction.length();
  mouthpiece_direction.normalize();

  const mouthpieceGeom = new THREE.CylinderGeometry(
    0.145,
    0.180,
    mouthpiece_length,
    32
  );
  const mouthpiece = new THREE.Mesh(mouthpieceGeom, woodMat);
  mouthpiece.position.copy(mouthpiece_start).add(mouthpiece_end).multiplyScalar(0.5);
  mouthpiece.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    mouthpiece_direction
  );
  root.add(mouthpiece);

  const mouthpiece_jointGeom = new THREE.TorusGeometry(0.181, 0.022, 10, 36);
  const mouthpiece_joint = new THREE.Mesh(mouthpiece_jointGeom, darkWoodMat);
  mouthpiece_joint.position.copy(mouthpiece_start).lerp(mouthpiece_end, 0.08);
  mouthpiece_joint.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    mouthpiece_direction
  );
  root.add(mouthpiece_joint);

  const mouthpiece_end_ringGeom = new THREE.TorusGeometry(0.148, 0.024, 10, 36);
  const mouthpiece_end_ring = new THREE.Mesh(mouthpiece_end_ringGeom, darkWoodMat);
  mouthpiece_end_ring.position.copy(mouthpiece_end);
  mouthpiece_end_ring.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    mouthpiece_direction
  );
  root.add(mouthpiece_end_ring);

  const mouthpiece_openingGeom = new THREE.CircleGeometry(0.122, 32);
  const mouthpiece_opening = new THREE.Mesh(mouthpiece_openingGeom, openingMat);
  mouthpiece_opening.position
    .copy(mouthpiece_end)
    .addScaledVector(mouthpiece_direction, 0.012);
  mouthpiece_opening.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    mouthpiece_direction
  );
  root.add(mouthpiece_opening);

  const fipple_windowShape = new THREE.Shape();
  fipple_windowShape.moveTo(-0.060, -0.170);
  fipple_windowShape.bezierCurveTo(-0.085, -0.110, -0.080, 0.080, -0.045, 0.155);
  fipple_windowShape.bezierCurveTo(-0.015, 0.190, 0.035, 0.185, 0.058, 0.145);
  fipple_windowShape.lineTo(0.065, -0.125);
  fipple_windowShape.bezierCurveTo(0.045, -0.180, -0.020, -0.195, -0.060, -0.170);
  fipple_windowShape.closePath();

  const fipple_windowGeom = new THREE.ShapeGeometry(fipple_windowShape, 12);
  const fipple_window = new THREE.Mesh(fipple_windowGeom, openingMat);
  fipple_window.position.set(0, 5.91, 0.176);
  root.add(fipple_window);

  const fipple_window_rimGeom = new THREE.ShapeGeometry(fipple_windowShape, 12);
  const fipple_window_rim = new THREE.Mesh(fipple_window_rimGeom, darkWoodMat);
  fipple_window_rim.position.set(0, 5.91, 0.171);
  fipple_window_rim.scale.set(1.18, 1.10, 1);
  root.add(fipple_window_rim);
  root.remove(fipple_window);
  root.add(fipple_window_rim);
  root.add(fipple_window);

  const key_stemGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.11, 12);
  const key_paddleGeom = new THREE.SphereGeometry(1, 16, 10);

  const upper_key_stem = new THREE.Mesh(key_stemGeom, darkWoodMat);
  upper_key_stem.rotation.z = Math.PI / 2;
  upper_key_stem.position.set(-0.215, 3.16, 0.025);
  root.add(upper_key_stem);

  const upper_key_paddle = new THREE.Mesh(key_paddleGeom, darkWoodMat);
  upper_key_paddle.position.set(-0.275, 3.16, 0.025);
  upper_key_paddle.scale.set(0.045, 0.085, 0.055);
  root.add(upper_key_paddle);

  const lower_key_stem = new THREE.Mesh(key_stemGeom, darkWoodMat);
  lower_key_stem.rotation.z = Math.PI / 2;
  lower_key_stem.position.set(-0.215, 2.82, 0.025);
  root.add(lower_key_stem);

  const lower_key_paddle = new THREE.Mesh(key_paddleGeom, darkWoodMat);
  lower_key_paddle.position.set(-0.275, 2.82, 0.025);
  lower_key_paddle.scale.set(0.045, 0.085, 0.055);
  root.add(lower_key_paddle);

  const bell_grain_points = [];
  const bellGrainYs = [0.14, 0.30, 0.52, 0.78, 1.05, 1.30, 1.50];
  const bellGrainRs = [0.42, 0.34, 0.28, 0.23, 0.19, 0.18, 0.20];
  for (let i = 0; i < 5; i++) {
    const baseX = -0.16 + i * 0.08;
    for (let j = 0; j < bellGrainYs.length - 1; j++) {
      const x0 = baseX + Math.sin((i + 1) * (j + 1) * 0.7) * 0.008;
      const x1 = baseX + Math.sin((i + 1) * (j + 2) * 0.7) * 0.008;
      const z0 = Math.sqrt(Math.max(0.001, bellGrainRs[j] * bellGrainRs[j] - x0 * x0)) + 0.004;
      const z1 = Math.sqrt(Math.max(0.001, bellGrainRs[j + 1] * bellGrainRs[j + 1] - x1 * x1)) + 0.004;
      bell_grain_points.push(
        new THREE.Vector3(x0, bellGrainYs[j], z0),
        new THREE.Vector3(x1, bellGrainYs[j + 1], z1)
      );
    }
  }
  const bell_grainGeom = new THREE.BufferGeometry().setFromPoints(bell_grain_points);
  const bell_grain = new THREE.LineSegments(bell_grainGeom, grainMat);
  root.add(bell_grain);

  const body_grain_points = [];
  const bodyGrainYs = [2.62, 2.90, 3.18, 3.45, 3.72, 4.02, 4.30, 4.62, 4.92, 5.22, 5.48];
  const bodyGrainRs = [0.205, 0.200, 0.198, 0.194, 0.190, 0.188, 0.184, 0.180, 0.176, 0.168, 0.162];
  for (let i = 0; i < 4; i++) {
    const baseX = -0.105 + i * 0.070;
    for (let j = 0; j < bodyGrainYs.length - 1; j++) {
      const x0 = baseX + Math.sin((i + 2) * (j + 1) * 0.55) * 0.006;
      const x1 = baseX + Math.sin((i + 2) * (j + 2) * 0.55) * 0.006;
      const z0 = Math.sqrt(Math.max(0.001, bodyGrainRs[j] * bodyGrainRs[j] - x0 * x0)) + 0.003;
      const z1 = Math.sqrt(Math.max(0.001, bodyGrainRs[j + 1] * bodyGrainRs[j + 1] - x1 * x1)) + 0.003;
      body_grain_points.push(
        new THREE.Vector3(x0, bodyGrainYs[j], z0),
        new THREE.Vector3(x1, bodyGrainYs[j + 1], z1)
      );
    }
  }
  const body_grainGeom = new THREE.BufferGeometry().setFromPoints(body_grain_points);
  const body_grain = new THREE.LineSegments(body_grainGeom, grainMat);
  root.add(body_grain);

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

  fitToUnitCube(THREE, root);
  return root;
}