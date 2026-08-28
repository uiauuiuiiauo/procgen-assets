export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "desktop_calculator";

  const bodyW = 3.6;
  const bodyD = 4.0;
  const bodyH = 0.30;
  const deckAngle = Math.atan(0.34 / 2.35);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const blackKeyMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x18201c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lcdMat = new THREE.MeshStandardMaterial({
    color: 0x78a85f,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x263a20,
    emissiveIntensity: 0.18,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0x8f302b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xb69a63,
    metalness: 0.0,
    roughness: 0.4,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xe7e9e6,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function roundedPlateGeometry(width, depth, height, radius, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, depth, radius),
      {
        depth: height,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
        curveSegments: 8,
      }
    );
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function roundedPanelGeometry(width, height, depth, radius, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
        curveSegments: 8,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const bottom_trimGeom = roundedPlateGeometry(
    bodyW - 0.08,
    bodyD - 0.08,
    0.10,
    0.20,
    0.025
  );
  const bottom_trim = new THREE.Mesh(bottom_trimGeom, rubberMat);
  bottom_trim.name = "bottom_trim";
  bottom_trim.position.y = -0.02;
  root.add(bottom_trim);

  const body_shellGeom = roundedPlateGeometry(
    bodyW,
    bodyD,
    bodyH,
    0.22,
    0.045
  );
  const body_shell = new THREE.Mesh(body_shellGeom, silverMat);
  body_shell.name = "body_shell";
  body_shell.position.y = 0.05;
  root.add(body_shell);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.10, 0.12, 0.06, 16);
  const rubber_feet = new THREE.InstancedMesh(
    rubber_feetGeom,
    rubberMat,
    4
  );
  rubber_feet.name = "rubber_feet";
  const footPositions = [
    [-1.45, -0.075, -1.55],
    [1.45, -0.075, -1.55],
    [-1.45, -0.075, 1.55],
    [1.45, -0.075, 1.55],
  ];
  const footMatrix = new THREE.Matrix4();
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    footMatrix.makeTranslation(p[0], p[1], p[2]);
    rubber_feet.setMatrixAt(i, footMatrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  root.add(rubber_feet);

  const display_group = new THREE.Group();
  display_group.name = "display_group";
  display_group.position.set(0, 0.405, -1.10);
  display_group.rotation.x = deckAngle;
  root.add(display_group);

  const display_bezelGeom = roundedPanelGeometry(
    2.94,
    0.78,
    0.055,
    0.09,
    0.012
  );
  const display_bezel = new THREE.Mesh(display_bezelGeom, bezelMat);
  display_bezel.name = "display_bezel";
  display_bezel.position.z = 0.018;
  display_group.add(display_bezel);

  const display_screenGeom = roundedPanelGeometry(
    2.65,
    0.55,
    0.025,
    0.055,
    0.006
  );
  const display_screen = new THREE.Mesh(display_screenGeom, lcdMat);
  display_screen.name = "display_screen";
  display_screen.position.set(0, -0.01, 0.055);
  display_group.add(display_screen);

  const solar_panelGeom = new THREE.BoxGeometry(0.46, 0.085, 0.018);
  const solar_panel = new THREE.Mesh(solar_panelGeom, goldMat);
  solar_panel.name = "solar_panel";
  solar_panel.position.set(-1.08, 0.455, -0.305);
  solar_panel.rotation.x = deckAngle;
  root.add(solar_panel);

  const red_buttonGeom = roundedPlateGeometry(
    0.48,
    0.17,
    0.055,
    0.045,
    0.012
  );
  const red_button = new THREE.Mesh(red_buttonGeom, redMat);
  red_button.name = "red_button";
  red_button.position.set(1.15, 0.455, -0.285);
  red_button.rotation.x = deckAngle;
  root.add(red_button);

  const keypad_group = new THREE.Group();
  keypad_group.name = "keypad_group";
  keypad_group.position.set(0, 0.405, 0.72);
  keypad_group.rotation.x = deckAngle;
  root.add(keypad_group);

  const standardKeyPositions = [];
  const functionKeyPositions = [];
  const rowZ = [0.72, 0.33, -0.06, -0.45];

  for (let row = 0; row < 4; row++) {
    for (let column = 0; column < 4; column++) {
      standardKeyPositions.push({
        x: -1.14 + column * 0.59,
        z: rowZ[row],
      });
    }
  }
  for (let column = 0; column < 5; column++) {
    functionKeyPositions.push({
      x: -1.28 + column * 0.64,
      z: -0.91,
    });
  }

  const standard_keysGeom = roundedPlateGeometry(
    0.50,
    0.31,
    0.085,
    0.055,
    0.018
  );
  const standard_keys = new THREE.InstancedMesh(
    standard_keysGeom,
    blackKeyMat,
    standardKeyPositions.length
  );
  standard_keys.name = "standard_keys";
  const keyMatrix = new THREE.Matrix4();
  for (let i = 0; i < standardKeyPositions.length; i++) {
    const p = standardKeyPositions[i];
    keyMatrix.makeTranslation(p.x, 0, p.z);
    standard_keys.setMatrixAt(i, keyMatrix);
  }
  standard_keys.instanceMatrix.needsUpdate = true;
  keypad_group.add(standard_keys);

  const function_keysGeom = roundedPlateGeometry(
    0.48,
    0.25,
    0.075,
    0.05,
    0.016
  );
  const function_keys = new THREE.InstancedMesh(
    function_keysGeom,
    blackKeyMat,
    functionKeyPositions.length
  );
  function_keys.name = "function_keys";
  for (let i = 0; i < functionKeyPositions.length; i++) {
    const p = functionKeyPositions[i];
    keyMatrix.makeTranslation(p.x, 0, p.z);
    function_keys.setMatrixAt(i, keyMatrix);
  }
  function_keys.instanceMatrix.needsUpdate = true;
  keypad_group.add(function_keys);

  const wide_operator_keyGeom = roundedPlateGeometry(
    0.50,
    0.72,
    0.085,
    0.06,
    0.018
  );
  const wide_operator_key = new THREE.Mesh(
    wide_operator_keyGeom,
    blackKeyMat
  );
  wide_operator_key.name = "wide_operator_key";
  wide_operator_key.position.set(1.16, 0, 0.185);
  keypad_group.add(wide_operator_key);

  const labelStrokes = [];

  function addStroke(x, z, length, width, angle) {
    labelStrokes.push({ x, z, length, width, angle });
  }

  const segmentDefinitions = [
    [0, -0.085, 0.15, 0],
    [0.082, -0.043, 0.07, Math.PI / 2],
    [0.082, 0.043, 0.07, Math.PI / 2],
    [0, 0.085, 0.15, 0],
    [-0.082, 0.043, 0.07, Math.PI / 2],
    [-0.082, -0.043, 0.07, Math.PI / 2],
    [0, 0, 0.15, 0],
  ];
  const digitSegments = [
    [],
    [1, 2],
    [0, 1, 6, 4, 3],
    [0, 1, 6, 2, 3],
    [5, 6, 1, 2],
    [0, 5, 6, 2, 3],
    [0, 5, 6, 4, 2, 3],
    [0, 1, 2],
    [],
    [0, 1, 2, 3, 4, 5, 6],
  ];

  function addDigit(digit, x, z) {
    const segments = digitSegments[digit];
    for (let i = 0; i < segments.length; i++) {
      const d = segmentDefinitions[segments[i]];
      addStroke(x + d[0], z + d[1], d[2], 0.022, d[3]);
    }
  }

  const digitPositions = [
    [-1.14, 0.33],
    [-0.55, 0.33],
    [0.04, 0.33],
    [0.63, 0.33],
    [-1.14, -0.06],
    [-0.55, -0.06],
    [0.04, -0.06],
    [-1.14, -0.45],
    [-0.55, -0.45],
    [0.04, -0.45],
  ];
  for (let digit = 1; digit <= 9; digit++) {
    addDigit(digit, digitPositions[digit - 1][0], digitPositions[digit - 1][1]);
  }

  addDigit(0, 0.04, 0.72);
  addStroke(-1.17, 0.70, 0.13, 0.025, 0);
  addStroke(-1.17, 0.75, 0.13, 0.025, Math.PI / 2);

  addStroke(0.61, 0.70, 0.16, 0.025, 0);
  addStroke(0.67, 0.74, 0.10, 0.025, Math.PI / 2);
  addStroke(0.61, 0.78, 0.12, 0.025, 0);

  addStroke(1.16, 0.31, 0.17, 0.026, Math.PI / 2);
  addStroke(1.16, 0.06, 0.17, 0.026, 0);

  addStroke(-1.31, -0.91, 0.13, 0.022, Math.PI / 2);
  addStroke(-1.25, -0.95, 0.09, 0.022, 0);
  addStroke(-1.19, -0.91, 0.13, 0.022, Math.PI / 2);

  addStroke(-0.69, -0.91, 0.15, 0.022, Math.PI / 2);
  addStroke(-0.61, -0.95, 0.11, 0.022, 0);
  addStroke(-0.61, -0.87, 0.11, 0.022, 0);

  addStroke(-0.03, -0.95, 0.15, 0.022, 0);
  addStroke(-0.03, -0.87, 0.15, 0.022, 0);
  addStroke(-0.03, -0.91, 0.16, 0.022, 0.78);

  addStroke(0.55, -0.91, 0.17, 0.022, Math.PI / 2);
  addStroke(0.63, -0.91, 0.17, 0.022, Math.PI / 2);

  addStroke(1.16, -0.93, 0.17, 0.022, 0);
  addStroke(1.16, -0.89, 0.17, 0.022, 0);

  const key_labelsGeom = new THREE.BoxGeometry(1, 1, 1);
  const key_labels = new THREE.InstancedMesh(
    key_labelsGeom,
    labelMat,
    labelStrokes.length
  );
  key_labels.name = "key_labels";

  const labelPosition = new THREE.Vector3();
  const labelQuaternion = new THREE.Quaternion();
  const labelScale = new THREE.Vector3();
  const labelMatrix = new THREE.Matrix4();
  const upAxis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < labelStrokes.length; i++) {
    const stroke = labelStrokes[i];
    labelPosition.set(stroke.x, 0.112, stroke.z);
    labelQuaternion.setFromAxisAngle(upAxis, stroke.angle);
    labelScale.set(stroke.length, 0.009, stroke.width);
    labelMatrix.compose(labelPosition, labelQuaternion, labelScale);
    key_labels.setMatrixAt(i, labelMatrix);
  }
  key_labels.instanceMatrix.needsUpdate = true;
  keypad_group.add(key_labels);

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