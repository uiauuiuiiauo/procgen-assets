export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_group = new THREE.Group();
  root.add(tool_group);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blade_bevelMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x6f3425,
    metalness: 0.0,
    roughness: 0.7,
  });
  const handle_seamMat = new THREE.MeshStandardMaterial({
    color: 0x3c1d17,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rear_gripMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rear_grip_seamMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blade_slotMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blade_engravingMat = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const bladeThickness = 0.05;
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.20, -0.14);
  bladeShape.lineTo(0.20, -0.14);
  bladeShape.lineTo(0.20, 0.03);
  bladeShape.lineTo(0.17, 0.10);
  bladeShape.lineTo(0.145, 0.16);

  const serrationCount = 22;
  const serrationStart = 0.16;
  const serrationEnd = 1.68;
  const serrationPitch = (serrationEnd - serrationStart) / serrationCount;

  function bladeEdgeX(t) {
    return 0.145 * (1 - t) + 0.025 * t;
  }

  for (let i = 0; i < serrationCount; i++) {
    const t0 = i / serrationCount;
    const t1 = (i + 1) / serrationCount;
    const z0 = serrationStart + serrationPitch * i;
    const z1 = serrationStart + serrationPitch * (i + 1);
    const zMid = (z0 + z1) * 0.5;
    const edgeX = bladeEdgeX((zMid - serrationStart) / (serrationEnd - serrationStart));
    bladeShape.lineTo(edgeX, z0);
    bladeShape.lineTo(edgeX + 0.042, zMid);
    bladeShape.lineTo(edgeX, z1);
  }

  bladeShape.lineTo(0.018, 1.82);
  bladeShape.lineTo(-0.018, 1.90);
  bladeShape.lineTo(-0.055, 1.82);

  const leftToothStart = 1.82;
  const leftToothEnd = 0.34;
  const leftToothCount = 15;
  for (let i = 0; i < leftToothCount; i++) {
    const t0 = i / leftToothCount;
    const t1 = (i + 1) / leftToothCount;
    const z0 = leftToothStart + (leftToothEnd - leftToothStart) * t0;
    const z1 = leftToothStart + (leftToothEnd - leftToothStart) * t1;
    const zMid = (z0 + z1) * 0.5;
    const edgeX = -0.055 * (1 - t0) - 0.09 * t0;
    bladeShape.lineTo(edgeX - 0.026, zMid);
    bladeShape.lineTo(edgeX - 0.012, z1);
  }

  bladeShape.lineTo(-0.16, 0.20);
  bladeShape.lineTo(-0.20, 0.08);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: bladeThickness,
    steps: 1,
    bevelEnabled: false,
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.rotation.x = Math.PI / 2;
  blade.position.y = bladeThickness / 2;
  tool_group.add(blade);

  const blade_bevelShape = new THREE.Shape();
  blade_bevelShape.moveTo(-0.194, -0.10);
  blade_bevelShape.lineTo(-0.194, 0.07);
  blade_bevelShape.lineTo(-0.158, 0.18);
  blade_bevelShape.lineTo(-0.142, 0.25);
  blade_bevelShape.lineTo(-0.073, 1.78);
  blade_bevelShape.lineTo(-0.018, 1.875);
  blade_bevelShape.lineTo(-0.052, 1.79);
  blade_bevelShape.lineTo(-0.116, 0.28);
  blade_bevelShape.lineTo(-0.135, 0.20);
  blade_bevelShape.closePath();

  const blade_bevelGeom = new THREE.ShapeGeometry(blade_bevelShape, 1);
  const blade_bevel = new THREE.Mesh(blade_bevelGeom, blade_bevelMat);
  blade_bevel.rotation.x = Math.PI / 2;
  blade_bevel.position.y = bladeThickness / 2 + 0.002;
  tool_group.add(blade_bevel);

  const blade_brush_points = [];
  for (let i = 0; i < 11; i++) {
    const z0 = 0.28 + i * 0.105;
    const z1 = z0 + 0.075;
    const t0 = (z0 - serrationStart) / (serrationEnd - serrationStart);
    const t1 = (z1 - serrationStart) / (serrationEnd - serrationStart);
    const x0 = -0.10 + 0.22 * t0;
    const x1 = -0.10 + 0.22 * t1;
    blade_brush_points.push(
      new THREE.Vector3(x0, bladeThickness / 2 + 0.003, z0),
      new THREE.Vector3(x1, bladeThickness / 2 + 0.003, z1)
    );
  }
  const blade_brush_linesGeom = new THREE.BufferGeometry().setFromPoints(blade_brush_points);
  const blade_brush_linesMat = new THREE.LineBasicMaterial({
    color: 0x6f7477,
    transparent: true,
    opacity: 0.28,
  });
  const blade_brush_lines = new THREE.LineSegments(blade_brush_linesGeom, blade_brush_linesMat);
  tool_group.add(blade_brush_lines);

  const tangThickness = 0.075;
  const tangShape = new THREE.Shape();
  tangShape.moveTo(-0.17, -0.36);
  tangShape.lineTo(0.17, -0.36);
  tangShape.lineTo(0.205, -0.31);
  tangShape.lineTo(0.205, -0.02);
  tangShape.lineTo(0.18, 0.08);
  tangShape.lineTo(-0.18, 0.08);
  tangShape.lineTo(-0.205, -0.02);
  tangShape.lineTo(-0.205, -0.31);
  tangShape.closePath();

  const tangGeom = new THREE.ExtrudeGeometry(tangShape, {
    depth: tangThickness,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const tang = new THREE.Mesh(tangGeom, bladeMat);
  tang.rotation.x = Math.PI / 2;
  tang.position.y = tangThickness / 2;
  tool_group.add(tang);

  const tang_bevelShape = new THREE.Shape();
  tang_bevelShape.moveTo(-0.17, -0.34);
  tang_bevelShape.lineTo(0.17, -0.34);
  tang_bevelShape.lineTo(0.195, -0.29);
  tang_bevelShape.lineTo(0.195, -0.03);
  tang_bevelShape.lineTo(0.17, 0.055);
  tang_bevelShape.lineTo(-0.17, 0.055);
  tang_bevelShape.lineTo(-0.195, -0.03);
  tang_bevelShape.lineTo(-0.195, -0.29);
  tang_bevelShape.closePath();

  const tang_bevelGeom = new THREE.ShapeGeometry(tang_bevelShape, 1);
  const tang_bevel = new THREE.Mesh(tang_bevelGeom, blade_bevelMat);
  tang_bevel.rotation.x = Math.PI / 2;
  tang_bevel.position.y = tangThickness / 2 + 0.008;
  tool_group.add(tang_bevel);

  const blade_slotGeom = new THREE.BoxGeometry(0.014, 0.024, 0.15);
  const blade_slot = new THREE.Mesh(blade_slotGeom, blade_slotMat);
  blade_slot.position.set(0.207, -0.004, -0.13);
  tool_group.add(blade_slot);

  const handlePoints = [
    new THREE.Vector3(-0.19, 0, -0.31),
    new THREE.Vector3(-0.29, 0, -0.48),
    new THREE.Vector3(-0.39, 0, -0.72),
    new THREE.Vector3(-0.46, 0, -1.00),
    new THREE.Vector3(-0.45, 0, -1.25),
    new THREE.Vector3(-0.36, 0, -1.46),
    new THREE.Vector3(-0.20, 0, -1.59),
    new THREE.Vector3(0.00, 0, -1.64),
    new THREE.Vector3(0.20, 0, -1.59),
    new THREE.Vector3(0.36, 0, -1.46),
    new THREE.Vector3(0.45, 0, -1.25),
    new THREE.Vector3(0.46, 0, -1.00),
    new THREE.Vector3(0.39, 0, -0.72),
    new THREE.Vector3(0.29, 0, -0.48),
    new THREE.Vector3(0.19, 0, -0.31),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal",
    0.5
  );
  const handleGeom = new THREE.TubeGeometry(handleCurve, 96, 0.105, 14, false);
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.scale.y = 0.78;
  tool_group.add(handle);

  const front_grip_capsGeom = new THREE.SphereGeometry(0.105, 20, 12);
  const front_grip_caps = new THREE.InstancedMesh(front_grip_capsGeom, handleMat, 2);
  const cap_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    cap_dummy.position.set(i === 0 ? -0.19 : 0.19, 0, -0.31);
    cap_dummy.scale.set(0.95, 0.78, 1.18);
    cap_dummy.updateMatrix();
    front_grip_caps.setMatrixAt(i, cap_dummy.matrix);
  }
  front_grip_caps.instanceMatrix.needsUpdate = true;
  tool_group.add(front_grip_caps);

  const rearGripPoints = [
    new THREE.Vector3(-0.45, 0, -1.22),
    new THREE.Vector3(-0.38, 0, -1.42),
    new THREE.Vector3(-0.23, 0, -1.57),
    new THREE.Vector3(0.00, 0, -1.64),
    new THREE.Vector3(0.23, 0, -1.57),
    new THREE.Vector3(0.38, 0, -1.42),
    new THREE.Vector3(0.45, 0, -1.22),
  ];
  const rearGripCurve = new THREE.CatmullRomCurve3(
    rearGripPoints,
    false,
    "centripetal",
    0.5
  );
  const rear_gripGeom = new THREE.TubeGeometry(rearGripCurve, 48, 0.109, 14, false);
  const rear_grip = new THREE.Mesh(rear_gripGeom, rear_gripMat);
  rear_grip.scale.y = 0.78;
  tool_group.add(rear_grip);

  const handle_seamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.245, 0, -0.40),
    new THREE.Vector3(0.335, 0, -0.60),
    new THREE.Vector3(0.405, 0, -0.84),
    new THREE.Vector3(0.425, 0, -1.08),
  ], false, "centripetal", 0.5);
  const handle_seamGeom = new THREE.TubeGeometry(handle_seamCurve, 24, 0.006, 6, false);
  const handle_seam = new THREE.Mesh(handle_seamGeom, handle_seamMat);
  handle_seam.scale.y = 0.78;
  tool_group.add(handle_seam);

  const rear_grip_seamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.37, 0, -1.43),
    new THREE.Vector3(0.25, 0, -1.57),
    new THREE.Vector3(0.06, 0, -1.64),
  ], false, "centripetal", 0.5);
  const rear_grip_seamGeom = new THREE.TubeGeometry(
    rear_grip_seamCurve,
    18,
    0.006,
    6,
    false
  );
  const rear_grip_seam = new THREE.Mesh(rear_grip_seamGeom, rear_grip_seamMat);
  rear_grip_seam.scale.y = 0.78;
  tool_group.add(rear_grip_seam);

  const blade_engraving = new THREE.Group();
  blade_engraving.position.y = tangThickness / 2 + 0.011;

  const engraving_ringGeom = new THREE.RingGeometry(0.031, 0.038, 20);
  const engraving_ring = new THREE.Mesh(engraving_ringGeom, blade_engravingMat);
  engraving_ring.rotation.x = -Math.PI / 2;
  engraving_ring.position.set(-0.052, 0, -0.174);
  blade_engraving.add(engraving_ring);

  const engraving_centerGeom = new THREE.CircleGeometry(0.012, 14);
  const engraving_center = new THREE.Mesh(engraving_centerGeom, blade_engravingMat);
  engraving_center.rotation.x = -Math.PI / 2;
  engraving_center.position.set(-0.052, 0.0002, -0.174);
  blade_engraving.add(engraving_center);

  const engraving_linesGeom = new THREE.BoxGeometry(0.075, 0.0025, 0.006);
  const engraving_lines = new THREE.InstancedMesh(
    engraving_linesGeom,
    blade_engravingMat,
    5
  );
  const engraving_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    engraving_dummy.position.set(0.066, 0, -0.235 + i * 0.025);
    engraving_dummy.scale.set(1 - i * 0.08, 1, 1);
    engraving_dummy.updateMatrix();
    engraving_lines.setMatrixAt(i, engraving_dummy.matrix);
  }
  engraving_lines.instanceMatrix.needsUpdate = true;
  blade_engraving.add(engraving_lines);
  tool_group.add(blade_engraving);

  tool_group.rotation.y = -Math.PI / 4;

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