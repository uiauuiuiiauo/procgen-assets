export default function generate(THREE) {
  const root = new THREE.Group();

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x7a3523,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x4b2118,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0xb66a3d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb99d52,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd0b65f,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xa98d45,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xd2bd6a,
    metalness: 0.25,
    roughness: 0.55,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x292a25,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xa9362f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rivetMat = new THREE.MeshStandardMaterial({
    color: 0x663a32,
    metalness: 0.45,
    roughness: 0.3,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8e1bd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const leather_caseProfile = [
    new THREE.Vector2(0.0, -0.23),
    new THREE.Vector2(1.16, -0.23),
    new THREE.Vector2(1.29, -0.20),
    new THREE.Vector2(1.40, -0.13),
    new THREE.Vector2(1.48, -0.02),
    new THREE.Vector2(1.49, 0.08),
    new THREE.Vector2(1.45, 0.18),
    new THREE.Vector2(1.37, 0.27),
    new THREE.Vector2(1.25, 0.33),
    new THREE.Vector2(0.0, 0.33),
  ];
  const leather_caseGeom = new THREE.LatheGeometry(leather_caseProfile, 64);
  const leather_case = new THREE.Mesh(leather_caseGeom, leatherMat);
  leather_case.rotation.x = Math.PI / 2;
  root.add(leather_case);

  const leather_outer_ridgeGeom = new THREE.TorusGeometry(1.405, 0.055, 12, 64);
  const leather_outer_ridge = new THREE.Mesh(leather_outer_ridgeGeom, darkLeatherMat);
  leather_outer_ridge.position.z = 0.265;
  root.add(leather_outer_ridge);

  const leather_inner_ridgeGeom = new THREE.TorusGeometry(1.255, 0.035, 10, 64);
  const leather_inner_ridge = new THREE.Mesh(leather_inner_ridgeGeom, darkLeatherMat);
  leather_inner_ridge.position.z = 0.337;
  root.add(leather_inner_ridge);

  const leather_wear_marksGeom = new THREE.BoxGeometry(0.12, 0.009, 0.005);
  const leather_wear_marks = new THREE.InstancedMesh(
    leather_wear_marksGeom,
    wearMat,
    28
  );
  const wear_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    const radius = 1.315 + 0.018 * ((i % 3) - 1);
    const lengthScale = 0.45 + (i % 5) * 0.11;
    wear_dummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.346
    );
    wear_dummy.rotation.set(0, 0, -angle + 0.18 * ((i % 2) * 2 - 1));
    wear_dummy.scale.set(lengthScale, 1, 1);
    wear_dummy.updateMatrix();
    leather_wear_marks.setMatrixAt(i, wear_dummy.matrix);
  }
  leather_wear_marks.instanceMatrix.needsUpdate = true;
  root.add(leather_wear_marks);

  const bezel_baseGeom = new THREE.CylinderGeometry(1.225, 1.225, 0.105, 64);
  const bezel_base = new THREE.Mesh(bezel_baseGeom, brassMat);
  bezel_base.rotation.x = Math.PI / 2;
  bezel_base.position.z = 0.375;
  root.add(bezel_base);

  const bezel_outer_rimGeom = new THREE.TorusGeometry(1.18, 0.055, 14, 64);
  const bezel_outer_rim = new THREE.Mesh(bezel_outer_rimGeom, polishedBrassMat);
  bezel_outer_rim.position.z = 0.425;
  root.add(bezel_outer_rim);

  const dial_faceGeom = new THREE.CylinderGeometry(1.055, 1.055, 0.03, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.438;
  root.add(dial_face);

  const bezel_inner_rimGeom = new THREE.TorusGeometry(1.06, 0.027, 12, 64);
  const bezel_inner_rim = new THREE.Mesh(bezel_inner_rimGeom, polishedBrassMat);
  bezel_inner_rim.position.z = 0.458;
  root.add(bezel_inner_rim);

  const dial_borderGeom = new THREE.TorusGeometry(0.985, 0.009, 8, 64);
  const dial_border = new THREE.Mesh(dial_borderGeom, brushedBrassMat);
  dial_border.position.z = 0.462;
  root.add(dial_border);

  const minor_ticksGeom = new THREE.BoxGeometry(0.011, 0.07, 0.008);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, inkMat, 80);
  const tick_dummy = new THREE.Object3D();
  let minorIndex = 0;
  for (let i = 0; i < 100; i++) {
    if (i % 5 === 0) continue;
    const angle = i / 100 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.92,
      Math.cos(angle) * 0.92,
      0.469
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    minor_ticks.setMatrixAt(minorIndex, tick_dummy.matrix);
    minorIndex++;
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  root.add(minor_ticks);

  const major_ticksGeom = new THREE.BoxGeometry(0.027, 0.145, 0.01);
  const major_ticks = new THREE.InstancedMesh(major_ticksGeom, inkMat, 8);
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.885,
      Math.cos(angle) * 0.885,
      0.471
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    major_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  major_ticks.instanceMatrix.needsUpdate = true;
  root.add(major_ticks);

  const cardinal_ticksGeom = new THREE.BoxGeometry(0.045, 0.205, 0.012);
  const cardinal_ticks = new THREE.InstancedMesh(cardinal_ticksGeom, inkMat, 4);
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.85,
      Math.cos(angle) * 0.85,
      0.473
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    cardinal_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  cardinal_ticks.instanceMatrix.needsUpdate = true;
  root.add(cardinal_ticks);

  const numeral_markersGeom = new THREE.BoxGeometry(0.095, 0.027, 0.009);
  const numeral_markers = new THREE.InstancedMesh(
    numeral_markersGeom,
    inkMat,
    8
  );
  const numeral_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    numeral_dummy.position.set(
      Math.sin(angle) * 0.69,
      Math.cos(angle) * 0.69,
      0.474
    );
    numeral_dummy.rotation.set(0, 0, -angle);
    numeral_dummy.scale.set(0.75 + (i % 2) * 0.25, 1, 1);
    numeral_dummy.updateMatrix();
    numeral_markers.setMatrixAt(i, numeral_dummy.matrix);
  }
  numeral_markers.instanceMatrix.needsUpdate = true;
  root.add(numeral_markers);

  const numeral_zerosGeom = new THREE.TorusGeometry(0.052, 0.012, 8, 20);
  const numeral_zeros = new THREE.InstancedMesh(numeral_zerosGeom, inkMat, 3);
  const zeroPositions = [
    [-0.57, 0.03, 1.0],
    [0.57, -0.31, 0.9],
    [0.04, -0.66, 0.75],
  ];
  for (let i = 0; i < zeroPositions.length; i++) {
    const item = zeroPositions[i];
    numeral_dummy.position.set(item[0], item[1], 0.478);
    numeral_dummy.rotation.set(0, 0, 0);
    numeral_dummy.scale.set(item[2], item[2], 1);
    numeral_dummy.updateMatrix();
    numeral_zeros.setMatrixAt(i, numeral_dummy.matrix);
  }
  numeral_zeros.instanceMatrix.needsUpdate = true;
  root.add(numeral_zeros);

  const dial_rivetsGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.024, 20);
  const dial_rivets = new THREE.InstancedMesh(dial_rivetsGeom, rivetMat, 2);
  const rivet_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    rivet_dummy.position.set(i === 0 ? -0.37 : 0.37, 0.51, 0.479);
    rivet_dummy.rotation.set(Math.PI / 2, 0, 0);
    rivet_dummy.scale.set(1, 1, 1);
    rivet_dummy.updateMatrix();
    dial_rivets.setMatrixAt(i, rivet_dummy.matrix);
  }
  dial_rivets.instanceMatrix.needsUpdate = true;
  root.add(dial_rivets);

  const central_plateGeom = new THREE.CylinderGeometry(0.425, 0.425, 0.026, 64);
  const central_plate = new THREE.Mesh(central_plateGeom, brushedBrassMat);
  central_plate.rotation.x = Math.PI / 2;
  central_plate.position.z = 0.48;
  root.add(central_plate);

  const central_plate_rimGeom = new THREE.TorusGeometry(0.415, 0.012, 8, 64);
  const central_plate_rim = new THREE.Mesh(
    central_plate_rimGeom,
    polishedBrassMat
  );
  central_plate_rim.position.z = 0.495;
  root.add(central_plate_rim);

  const central_groovesGeom = new THREE.TorusGeometry(0.27, 0.004, 6, 48);
  const central_grooves = new THREE.InstancedMesh(
    central_groovesGeom,
    brassMat,
    3
  );
  const grooveScales = [0.55, 0.82, 1.18];
  for (let i = 0; i < grooveScales.length; i++) {
    numeral_dummy.position.set(0, 0, 0.496);
    numeral_dummy.rotation.set(0, 0, 0);
    numeral_dummy.scale.set(grooveScales[i], grooveScales[i], 1);
    numeral_dummy.updateMatrix();
    central_grooves.setMatrixAt(i, numeral_dummy.matrix);
  }
  central_grooves.instanceMatrix.needsUpdate = true;
  root.add(central_grooves);

  const needle_assembly = new THREE.Group();
  needle_assembly.position.z = 0.505;
  needle_assembly.rotation.z = -Math.PI / 4;
  root.add(needle_assembly);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(0.045, -1.015);
  needleShape.lineTo(0.019, -0.32);
  needleShape.lineTo(0.027, 0.12);
  needleShape.lineTo(0.067, 0.77);
  needleShape.lineTo(0.0, 1.025);
  needleShape.lineTo(-0.067, 0.77);
  needleShape.lineTo(-0.027, 0.12);
  needleShape.lineTo(-0.019, -0.32);
  needleShape.closePath();

  const needleGeom = new THREE.ExtrudeGeometry(needleShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const needle = new THREE.Mesh(needleGeom, silverMat);
  needle_assembly.add(needle);

  const red_counterweight_tipGeom = new THREE.BoxGeometry(0.035, 0.19, 0.014);
  const red_counterweight_tip = new THREE.Mesh(
    red_counterweight_tipGeom,
    redMat
  );
  red_counterweight_tip.position.set(0, -0.925, 0.009);
  needle_assembly.add(red_counterweight_tip);

  const red_needle_tipGeom = new THREE.BoxGeometry(0.075, 0.205, 0.014);
  const red_needle_tip = new THREE.Mesh(red_needle_tipGeom, redMat);
  red_needle_tip.position.set(0, 0.91, 0.009);
  needle_assembly.add(red_needle_tip);

  const hub_baseGeom = new THREE.CylinderGeometry(0.16, 0.16, 0.032, 40);
  const hub_base = new THREE.Mesh(hub_baseGeom, silverMat);
  hub_base.rotation.x = Math.PI / 2;
  hub_base.position.z = 0.525;
  root.add(hub_base);

  const hub_capGeom = new THREE.SphereGeometry(0.13, 32, 16);
  const hub_cap = new THREE.Mesh(hub_capGeom, polishedBrassMat);
  hub_cap.scale.set(1, 1, 0.48);
  hub_cap.position.z = 0.552;
  root.add(hub_cap);

  const hub_pinGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.012, 20);
  const hub_pin = new THREE.Mesh(hub_pinGeom, silverMat);
  hub_pin.rotation.x = Math.PI / 2;
  hub_pin.position.z = 0.616;
  root.add(hub_pin);

  const glass_coverGeom = new THREE.CircleGeometry(1.035, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.position.z = 0.628;
  root.add(glass_cover);

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