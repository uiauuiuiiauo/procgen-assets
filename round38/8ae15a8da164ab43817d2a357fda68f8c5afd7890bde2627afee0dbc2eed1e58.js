export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_piano_keyboard";

  const chassis = new THREE.Group();
  chassis.name = "chassis";
  root.add(chassis);

  const keyboard = new THREE.Group();
  keyboard.name = "keyboard";
  root.add(keyboard);

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x0b0b0b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const white_keysMat = new THREE.MeshStandardMaterial({
    color: 0xf4f3ed,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_keysMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const key_bedMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brand_markMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const status_ledMat = new THREE.MeshStandardMaterial({
    color: 0x9aa4aa,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x9aa4aa,
    emissiveIntensity: 1.0,
  });

  function createRoundedBoxGeometry(width, height, depth, radius, bevel) {
    const halfW = width / 2;
    const halfD = depth / 2;
    const r = Math.min(radius, halfW, halfD);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + r, -halfD);
    shape.lineTo(halfW - r, -halfD);
    shape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + r);
    shape.lineTo(halfW, halfD - r);
    shape.quadraticCurveTo(halfW, halfD, halfW - r, halfD);
    shape.lineTo(-halfW + r, halfD);
    shape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - r);
    shape.lineTo(-halfW, -halfD + r);
    shape.quadraticCurveTo(-halfW, -halfD, -halfW + r, -halfD);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 4,
      bevelEnabled: bevel > 0,
      bevelSegments: 2,
      bevelSize: bevel,
      bevelThickness: bevel,
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function createBlackKeyGeometry(width, height, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-depth * 0.50, 0);
    shape.lineTo(depth * 0.50, 0);
    shape.lineTo(depth * 0.43, height * 0.88);
    shape.lineTo(depth * 0.28, height);
    shape.lineTo(-depth * 0.28, height);
    shape.lineTo(-depth * 0.43, height * 0.88);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: width,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.008,
      bevelThickness: 0.008,
    });
    geometry.translate(0, 0, -width / 2);
    geometry.rotateY(Math.PI / 2);
    return geometry;
  }

  const caseW = 6.8;
  const caseD = 2.1;
  const whiteKeyCount = 15;
  const whiteKeyW = 0.34;
  const whiteKeyGap = 0.01;
  const whiteKeyD = 1.22;
  const keySpan = whiteKeyCount * whiteKeyW + (whiteKeyCount - 1) * whiteKeyGap;
  const keyboardCenterZ = 0.07;

  const base_caseGeom = createRoundedBoxGeometry(caseW, 0.48, caseD, 0.15, 0.04);
  const base_case = new THREE.Mesh(base_caseGeom, housingMat);
  base_case.name = "base_case";
  base_case.position.y = 0.24;
  chassis.add(base_case);

  const front_fasciaGeom = createRoundedBoxGeometry(6.56, 0.36, 0.055, 0.025, 0.012);
  const front_fascia = new THREE.Mesh(front_fasciaGeom, edgeMat);
  front_fascia.name = "front_fascia";
  front_fascia.position.set(0, 0.25, 1.073);
  chassis.add(front_fascia);

  const front_seamGeom = new THREE.BoxGeometry(6.36, 0.018, 0.018);
  const front_seam = new THREE.Mesh(front_seamGeom, edgeMat);
  front_seam.name = "front_seam";
  front_seam.position.set(0, 0.477, 1.094);
  chassis.add(front_seam);

  const key_bedGeom = createRoundedBoxGeometry(5.42, 0.045, 1.43, 0.035, 0.008);
  const key_bed = new THREE.Mesh(key_bedGeom, key_bedMat);
  key_bed.name = "key_bed";
  key_bed.position.set(0, 0.505, keyboardCenterZ);
  keyboard.add(key_bed);

  const left_key_cheekGeom = createRoundedBoxGeometry(0.62, 0.14, 1.46, 0.045, 0.015);
  const left_key_cheek = new THREE.Mesh(left_key_cheekGeom, housingMat);
  left_key_cheek.name = "left_key_cheek";
  left_key_cheek.position.set(-2.89, 0.56, keyboardCenterZ);
  chassis.add(left_key_cheek);

  const right_key_cheekGeom = left_key_cheekGeom;
  const right_key_cheek = new THREE.Mesh(right_key_cheekGeom, housingMat);
  right_key_cheek.name = "right_key_cheek";
  right_key_cheek.position.set(2.89, 0.56, keyboardCenterZ);
  chassis.add(right_key_cheek);

  const rear_key_railGeom = createRoundedBoxGeometry(5.42, 0.14, 0.23, 0.04, 0.015);
  const rear_key_rail = new THREE.Mesh(rear_key_railGeom, housingMat);
  rear_key_rail.name = "rear_key_rail";
  rear_key_rail.position.set(0, 0.56, -0.665);
  chassis.add(rear_key_rail);

  const front_key_railGeom = createRoundedBoxGeometry(5.42, 0.14, 0.23, 0.04, 0.015);
  const front_key_rail = new THREE.Mesh(front_key_railGeom, housingMat);
  front_key_rail.name = "front_key_rail";
  front_key_rail.position.set(0, 0.56, 0.805);
  chassis.add(front_key_rail);

  const white_keysGeom = createRoundedBoxGeometry(
    whiteKeyW - 0.008,
    0.08,
    whiteKeyD,
    0.012,
    0.006
  );
  const white_keys = new THREE.InstancedMesh(
    white_keysGeom,
    white_keysMat,
    whiteKeyCount
  );
  white_keys.name = "white_keys";

  const whiteKeyMatrix = new THREE.Matrix4();
  for (let i = 0; i < whiteKeyCount; i++) {
    const x = -keySpan / 2 + whiteKeyW / 2 + i * (whiteKeyW + whiteKeyGap);
    whiteKeyMatrix.makeTranslation(x, 0.56, keyboardCenterZ);
    white_keys.setMatrixAt(i, whiteKeyMatrix);
  }
  white_keys.instanceMatrix.needsUpdate = true;
  keyboard.add(white_keys);

  const blackKeyW = 0.205;
  const blackKeyH = 0.18;
  const blackKeyD = 0.72;
  const black_keysGeom = createBlackKeyGeometry(
    blackKeyW,
    blackKeyH,
    blackKeyD
  );
  const blackKeyAfter = [0, 1, 3, 4, 5, 7, 8, 10, 11, 12];
  const black_keys = new THREE.InstancedMesh(
    black_keysGeom,
    black_keysMat,
    blackKeyAfter.length
  );
  black_keys.name = "black_keys";

  const blackKeyMatrix = new THREE.Matrix4();
  for (let i = 0; i < blackKeyAfter.length; i++) {
    const boundary = blackKeyAfter[i] + 1;
    const x =
      -keySpan / 2 +
      boundary * whiteKeyW +
      (boundary - 0.5) * whiteKeyGap;
    blackKeyMatrix.makeTranslation(x, 0.605, -0.045);
    black_keys.setMatrixAt(i, blackKeyMatrix);
  }
  black_keys.instanceMatrix.needsUpdate = true;
  keyboard.add(black_keys);

  const brandPatterns = [
    ["111", "100", "101", "101", "111"],
    ["101", "101", "101", "101", "111"],
    ["101", "111", "111", "101", "101"],
    ["110", "101", "110", "101", "101"],
    ["101", "111", "111", "111", "101"],
  ];
  const brandCells = [];
  for (let letter = 0; letter < brandPatterns.length; letter++) {
    for (let row = 0; row < 5; row++) {
      for (let column = 0; column < 3; column++) {
        if (brandPatterns[letter][row][column] === "1") {
          brandCells.push([letter, row, column]);
        }
      }
    }
  }

  const brand_markGeom = new THREE.BoxGeometry(0.016, 0.006, 0.016);
  const brand_mark = new THREE.InstancedMesh(
    brand_markGeom,
    brand_markMat,
    brandCells.length
  );
  brand_mark.name = "brand_mark";

  const brandCellMatrix = new THREE.Matrix4();
  const brandPitch = 0.019;
  const brandStartX = -3.02;
  const brandStartZ = -0.82;
  for (let i = 0; i < brandCells.length; i++) {
    const cell = brandCells[i];
    const x = brandStartX + (cell[0] * 4 + cell[2]) * brandPitch;
    const z = brandStartZ + cell[1] * brandPitch;
    brandCellMatrix.makeTranslation(x, 0.642, z);
    brand_mark.setMatrixAt(i, brandCellMatrix);
  }
  brand_mark.instanceMatrix.needsUpdate = true;
  chassis.add(brand_mark);

  const status_ledGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.008, 16);
  const status_led = new THREE.Mesh(status_ledGeom, status_ledMat);
  status_led.name = "status_led";
  status_led.position.set(2.68, 0.642, -0.82);
  chassis.add(status_led);

  const rubber_feetGeom = createRoundedBoxGeometry(0.34, 0.08, 0.25, 0.04, 0.01);
  const rubber_feetMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubber_feet = new THREE.InstancedMesh(
    rubber_feetGeom,
    rubber_feetMat,
    4
  );
  rubber_feet.name = "rubber_feet";

  const footPositions = [
    [-2.95, -0.045, 0.76],
    [2.95, -0.045, 0.76],
    [-2.95, -0.045, -0.76],
    [2.95, -0.045, -0.76],
  ];
  const footMatrix = new THREE.Matrix4();
  for (let i = 0; i < footPositions.length; i++) {
    const position = footPositions[i];
    footMatrix.makeTranslation(position[0], position[1], position[2]);
    rubber_feet.setMatrixAt(i, footMatrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  chassis.add(rubber_feet);

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