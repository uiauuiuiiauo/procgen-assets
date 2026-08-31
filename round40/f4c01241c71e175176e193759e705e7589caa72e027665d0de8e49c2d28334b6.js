export default function generate(THREE) {
  const root = new THREE.Group();

  const seatW = 0.88;
  const seatD = 0.68;
  const seatH = 0.50;
  const cushionH = 0.19;
  const backH = 0.80;
  const armW = 0.24;
  const armH = 0.72;
  const legH = 0.08;
  const moduleCount = 1;
  const cushionW = seatW / moduleCount;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xcbb99f,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xaa967c,
    metalness: 0.0,
    roughness: 0.95
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171614,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const shapeWidth = Math.max(0.02, width - bevel * 2);
    const shapeHeight = Math.max(0.02, height - bevel * 2);
    const halfW = shapeWidth / 2;
    const halfH = shapeHeight / 2;
    const corner = Math.min(radius, halfW, halfH);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + corner, -halfH);
    shape.lineTo(halfW - corner, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + corner);
    shape.lineTo(halfW, halfH - corner);
    shape.quadraticCurveTo(halfW, halfH, halfW - corner, halfH);
    shape.lineTo(-halfW + corner, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - corner);
    shape.lineTo(-halfW, -halfH + corner);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + corner, -halfH);
    shape.closePath();

    const innerDepth = Math.max(0.01, depth - bevel * 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: innerDepth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4
    });
    geometry.translate(0, 0, -innerDepth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  const seat_baseGeom = roundedBoxGeometry(1.00, 0.35, 0.80, 0.09, 0.035);
  const seat_base = new THREE.Mesh(seat_baseGeom, fabricMat);
  seat_base.position.set(0, 0.265, 0.04);
  root.add(seat_base);

  const front_apronGeom = roundedBoxGeometry(0.92, 0.28, 0.12, 0.075, 0.025);
  const front_apron = new THREE.Mesh(front_apronGeom, fabricMat);
  front_apron.position.set(0, 0.27, 0.425);
  root.add(front_apron);

  const seat_cushionGeom = roundedBoxGeometry(
    cushionW,
    cushionH,
    seatD,
    0.085,
    0.032
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.position.set(0, seatH, 0.11);
  root.add(seat_cushion);

  const seat_front_pipingGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    seatW - 0.12,
    10
  );
  const seat_front_piping = new THREE.Mesh(seat_front_pipingGeom, seamMat);
  seat_front_piping.rotation.z = Math.PI / 2;
  seat_front_piping.position.set(0, 0.455, 0.454);
  root.add(seat_front_piping);

  const seat_side_pipingGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    seatD - 0.12,
    10
  );
  const seat_left_piping = new THREE.Mesh(seat_side_pipingGeom, seamMat);
  seat_left_piping.rotation.x = Math.PI / 2;
  seat_left_piping.position.set(-0.432, 0.455, 0.11);
  root.add(seat_left_piping);

  const seat_right_piping = new THREE.Mesh(seat_side_pipingGeom, seamMat);
  seat_right_piping.rotation.x = Math.PI / 2;
  seat_right_piping.position.set(0.432, 0.455, 0.11);
  root.add(seat_right_piping);

  const backrestShape = new THREE.Shape();
  backrestShape.moveTo(-0.48, -backH / 2);
  backrestShape.lineTo(0.48, -backH / 2);
  backrestShape.lineTo(0.54, 0.14);
  backrestShape.quadraticCurveTo(0.56, 0.29, 0.40, 0.36);
  backrestShape.quadraticCurveTo(0.00, 0.47, -0.40, 0.36);
  backrestShape.quadraticCurveTo(-0.56, 0.29, -0.54, 0.14);
  backrestShape.lineTo(-0.48, -backH / 2);
  backrestShape.closePath();

  const backrestGeom = new THREE.ExtrudeGeometry(backrestShape, {
    depth: 0.16,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4
  });
  backrestGeom.translate(0, 0, -0.08);
  backrestGeom.computeVertexNormals();

  const backrest = new THREE.Mesh(backrestGeom, fabricMat);
  backrest.position.set(0, 0.79, -0.35);
  root.add(backrest);

  const backrest_paddingGeom = new THREE.SphereGeometry(1, 32, 20);
  const backrest_padding = new THREE.Mesh(backrest_paddingGeom, fabricMat);
  backrest_padding.scale.set(0.49, 0.32, 0.075);
  backrest_padding.position.set(0, 0.81, -0.235);
  root.add(backrest_padding);

  const arm_sideGeom = roundedBoxGeometry(
    armW,
    armH,
    0.86,
    0.105,
    0.035
  );

  const left_arm_side = new THREE.Mesh(arm_sideGeom, fabricMat);
  left_arm_side.position.set(-0.55, 0.46, 0.02);
  root.add(left_arm_side);

  const right_arm_side = new THREE.Mesh(arm_sideGeom, fabricMat);
  right_arm_side.position.set(0.55, 0.46, 0.02);
  root.add(right_arm_side);

  const arm_rollPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.68, 0.36),
      new THREE.Vector3(0, 0.72, 0.25),
      new THREE.Vector3(0, 0.78, 0.06),
      new THREE.Vector3(0, 0.87, -0.15),
      new THREE.Vector3(0, 0.98, -0.30)
    ],
    false,
    "centripetal"
  );
  const arm_rollGeom = new THREE.TubeGeometry(
    arm_rollPath,
    36,
    0.115,
    16,
    false
  );

  const left_arm_roll = new THREE.Mesh(arm_rollGeom, fabricMat);
  left_arm_roll.position.x = -0.55;
  root.add(left_arm_roll);

  const right_arm_roll = new THREE.Mesh(arm_rollGeom, fabricMat);
  right_arm_roll.position.x = 0.55;
  root.add(right_arm_roll);

  const arm_front_capGeom = new THREE.CylinderGeometry(
    0.122,
    0.122,
    0.035,
    24
  );
  const arm_cap_pipingGeom = new THREE.TorusGeometry(
    0.108,
    0.008,
    8,
    28
  );
  const arm_cap_seamGeom = new THREE.TorusGeometry(
    0.040,
    0.004,
    7,
    20
  );

  const left_arm_front_cap = new THREE.Mesh(arm_front_capGeom, fabricMat);
  left_arm_front_cap.rotation.x = Math.PI / 2;
  left_arm_front_cap.position.set(-0.55, 0.68, 0.472);
  root.add(left_arm_front_cap);

  const right_arm_front_cap = new THREE.Mesh(arm_front_capGeom, fabricMat);
  right_arm_front_cap.rotation.x = Math.PI / 2;
  right_arm_front_cap.position.set(0.55, 0.68, 0.472);
  root.add(right_arm_front_cap);

  const left_arm_cap_piping = new THREE.Mesh(arm_cap_pipingGeom, seamMat);
  left_arm_cap_piping.position.set(-0.55, 0.68, 0.493);
  root.add(left_arm_cap_piping);

  const right_arm_cap_piping = new THREE.Mesh(arm_cap_pipingGeom, seamMat);
  right_arm_cap_piping.position.set(0.55, 0.68, 0.493);
  root.add(right_arm_cap_piping);

  const left_arm_cap_seam = new THREE.Mesh(arm_cap_seamGeom, seamMat);
  left_arm_cap_seam.position.set(-0.55, 0.68, 0.495);
  root.add(left_arm_cap_seam);

  const right_arm_cap_seam = new THREE.Mesh(arm_cap_seamGeom, seamMat);
  right_arm_cap_seam.position.set(0.55, 0.68, 0.495);
  root.add(right_arm_cap_seam);

  const feetGeom = new THREE.CylinderGeometry(0.065, 0.075, legH, 18);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  const footPositions = [
    [-0.42, legH / 2, 0.34],
    [0.42, legH / 2, 0.34],
    [-0.42, legH / 2, -0.31],
    [0.42, legH / 2, -0.31]
  ];
  const footTransform = new THREE.Object3D();
  for (let i = 0; i < footPositions.length; i++) {
    const position = footPositions[i];
    footTransform.position.set(position[0], position[1], position[2]);
    footTransform.scale.set(1, 1, 0.72);
    footTransform.updateMatrix();
    feet.setMatrixAt(i, footTransform.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}