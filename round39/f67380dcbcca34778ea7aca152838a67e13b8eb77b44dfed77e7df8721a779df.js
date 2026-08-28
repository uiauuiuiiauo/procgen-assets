export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5b5d60,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkBodyMat = new THREE.MeshStandardMaterial({
    color: 0x3e4042,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x101112,
    metalness: 0.0,
    roughness: 0.8,
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x55575a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const whiteMarkMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e4,
    metalness: 0.0,
    roughness: 0.7,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x9fb592,
    metalness: 0.0,
    roughness: 0.3,
  });
  const digitMat = new THREE.MeshStandardMaterial({
    color: 0x17201a,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeRoundedRectGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();

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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeHandleGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0.48, 0.34);
    shape.lineTo(-0.14, 0.25);
    shape.bezierCurveTo(-0.32, 0.03, -0.44, -0.34, -0.49, -0.66);
    shape.lineTo(-0.49, -1.13);
    shape.bezierCurveTo(-0.48, -1.34, -0.31, -1.48, -0.08, -1.50);
    shape.lineTo(0.12, -1.48);
    shape.bezierCurveTo(0.36, -1.44, 0.48, -1.29, 0.48, -1.08);
    shape.bezierCurveTo(0.47, -0.72, 0.39, -0.28, 0.34, -0.02);
    shape.bezierCurveTo(0.32, 0.14, 0.35, 0.27, 0.48, 0.34);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.44,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -0.22);
    return geometry;
  }

  const baseGeom = makeRoundedRectGeometry(1.38, 0.62, 0.18, 0.25, 0.035);
  const base = new THREE.Mesh(baseGeom, darkBodyMat);
  base.rotation.x = -Math.PI / 2;
  base.position.set(-0.03, -1.64, -0.08);
  root.add(base);

  const base_topGeom = makeRoundedRectGeometry(1.18, 0.46, 0.07, 0.20, 0.02);
  const base_top = new THREE.Mesh(base_topGeom, bodyMat);
  base_top.rotation.x = -Math.PI / 2;
  base_top.position.set(-0.03, -1.51, -0.08);
  root.add(base_top);

  const handleGeom = makeHandleGeometry();
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  handle.position.z = -0.08;
  root.add(handle);

  const rear_supportShape = new THREE.Shape();
  rear_supportShape.moveTo(-0.50, -1.43);
  rear_supportShape.lineTo(-0.18, -1.43);
  rear_supportShape.lineTo(-0.30, -0.32);
  rear_supportShape.lineTo(-0.48, -0.22);
  rear_supportShape.closePath();

  const rear_supportGeom = new THREE.ExtrudeGeometry(rear_supportShape, {
    depth: 0.30,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  rear_supportGeom.translate(0, 0, -0.15);
  const rear_support = new THREE.Mesh(rear_supportGeom, darkBodyMat);
  rear_support.position.z = -0.24;
  root.add(rear_support);

  const handle_seamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.43, -1.22, 0.205),
    new THREE.Vector3(-0.22, -1.31, 0.205),
    new THREE.Vector3(0.03, -1.34, 0.205),
    new THREE.Vector3(0.27, -1.27, 0.205),
    new THREE.Vector3(0.40, -1.12, 0.205),
  ]);
  const handle_seamGeom = new THREE.TubeGeometry(
    handle_seamCurve,
    24,
    0.009,
    6,
    false
  );
  const handle_seam = new THREE.Mesh(handle_seamGeom, markingMat);
  root.add(handle_seam);

  const handle_ventsGeom = new THREE.CapsuleGeometry(0.018, 0.20, 4, 8);
  const handle_vents = new THREE.InstancedMesh(
    handle_ventsGeom,
    markingMat,
    5
  );
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    vent_dummy.position.set(-0.25 + i * 0.075, -1.00 + i * 0.006, 0.205);
    vent_dummy.rotation.set(0, 0, 0.24);
    vent_dummy.scale.set(1, 0.78 + i * 0.055, 1);
    vent_dummy.updateMatrix();
    handle_vents.setMatrixAt(i, vent_dummy.matrix);
  }
  handle_vents.instanceMatrix.needsUpdate = true;
  root.add(handle_vents);

  const meter_head = new THREE.Group();
  meter_head.position.set(0, 0.62, 0.03);
  meter_head.rotation.z = 0.28;
  root.add(meter_head);

  const rear_housingGeom = makeRoundedRectGeometry(
    3.26,
    1.46,
    0.44,
    0.27,
    0.045
  );
  const rear_housing = new THREE.Mesh(rear_housingGeom, darkBodyMat);
  rear_housing.position.set(0.04, 0.025, -0.15);
  meter_head.add(rear_housing);

  const front_housingGeom = makeRoundedRectGeometry(
    3.18,
    1.38,
    0.25,
    0.24,
    0.035
  );
  const front_housing = new THREE.Mesh(front_housingGeom, bodyMat);
  front_housing.position.set(-0.01, 0, 0.08);
  meter_head.add(front_housing);

  const rear_end_capGeom = makeRoundedRectGeometry(
    0.48,
    1.10,
    0.34,
    0.20,
    0.035
  );
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, darkBodyMat);
  rear_end_cap.position.set(1.69, 0.02, -0.19);
  meter_head.add(rear_end_cap);

  const side_buttonGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.07,
    16
  );
  const side_button = new THREE.Mesh(side_buttonGeom, blackPlasticMat);
  side_button.rotation.z = Math.PI / 2;
  side_button.position.set(1.91, 0.10, -0.12);
  meter_head.add(side_button);

  const control_panelGeom = makeRoundedRectGeometry(
    2.25,
    1.15,
    0.035,
    0.20,
    0.008
  );
  const control_panel = new THREE.Mesh(control_panelGeom, blackPlasticMat);
  control_panel.position.set(0.38, 0.035, 0.238);
  meter_head.add(control_panel);

  const display_bezelGeom = makeRoundedRectGeometry(
    1.43,
    0.82,
    0.035,
    0.08,
    0.008
  );
  const display_bezel = new THREE.Mesh(display_bezelGeom, blackPlasticMat);
  display_bezel.position.set(0.64, 0.085, 0.270);
  meter_head.add(display_bezel);

  const display_screenGeom = makeRoundedRectGeometry(
    1.26,
    0.67,
    0.018,
    0.045,
    0.004
  );
  const display_screen = new THREE.Mesh(display_screenGeom, screenMat);
  display_screen.position.set(0.64, 0.085, 0.298);
  meter_head.add(display_screen);

  const digit_segmentGeom = new THREE.BoxGeometry(1, 1, 1);
  const digitPatterns = [
    [0, 1, 2, 3, 4, 5],
    [1, 2],
    [0, 1, 6, 4, 3],
    [0, 1, 2, 3, 6],
    [5, 6, 1, 2],
    [0, 5, 6, 2, 3],
    [0, 5, 6, 4, 3, 2],
    [0, 1, 2],
    [0, 1, 2, 3, 4, 5, 6],
    [0, 1, 2, 3, 5, 6],
  ];
  const digitValues = [2, 7, 1];
  const digitCenters = [0.25, 0.65, 1.02];
  const digitWidth = 0.22;
  const digitHeight = 0.43;
  const segmentThickness = 0.035;
  const segmentDefs = [
    [0, digitHeight / 2, digitWidth, segmentThickness],
    [digitWidth / 2, digitHeight / 4, segmentThickness, digitHeight / 2],
    [digitWidth / 2, -digitHeight / 4, segmentThickness, digitHeight / 2],
    [0, -digitHeight / 2, digitWidth, segmentThickness],
    [-digitWidth / 2, -digitHeight / 4, segmentThickness, digitHeight / 2],
    [-digitWidth / 2, digitHeight / 4, segmentThickness, digitHeight / 2],
    [0, 0, digitWidth, segmentThickness],
  ];

  let digitSegmentCount = 0;
  for (let i = 0; i < digitValues.length; i++) {
    digitSegmentCount += digitPatterns[digitValues[i]].length;
  }

  const display_digits = new THREE.InstancedMesh(
    digit_segmentGeom,
    digitMat,
    digitSegmentCount
  );
  const digit_dummy = new THREE.Object3D();
  let digitIndex = 0;
  for (let i = 0; i < digitValues.length; i++) {
    const pattern = digitPatterns[digitValues[i]];
    for (let j = 0; j < pattern.length; j++) {
      const def = segmentDefs[pattern[j]];
      digit_dummy.position.set(
        digitCenters[i] + def[0],
        0.075 + def[1],
        0.319
      );
      digit_dummy.rotation.set(0, 0, 0);
      digit_dummy.scale.set(def[2], def[3], 0.012);
      digit_dummy.updateMatrix();
      display_digits.setMatrixAt(digitIndex, digit_dummy.matrix);
      digitIndex++;
    }
  }
  display_digits.instanceMatrix.needsUpdate = true;
  meter_head.add(display_digits);

  const display_decimalGeom = new THREE.CircleGeometry(0.025, 16);
  const display_decimal = new THREE.Mesh(display_decimalGeom, digitMat);
  display_decimal.position.set(0.46, -0.125, 0.326);
  meter_head.add(display_decimal);

  const status_marks = new THREE.InstancedMesh(
    digit_segmentGeom,
    digitMat,
    8
  );
  const status_dummy = new THREE.Object3D();
  const statusMarks = [
    [0.27, 0.365, 0.09, 0.014],
    [0.37, 0.365, 0.06, 0.014],
    [0.45, 0.365, 0.018, 0.075],
    [1.10, 0.365, 0.018, 0.075],
    [1.15, 0.400, 0.075, 0.014],
    [1.15, 0.365, 0.055, 0.014],
    [1.15, 0.330, 0.075, 0.014],
    [0.83, -0.190, 0.12, 0.012],
  ];
  for (let i = 0; i < statusMarks.length; i++) {
    const mark = statusMarks[i];
    status_dummy.position.set(mark[0], mark[1], 0.321);
    status_dummy.rotation.set(0, 0, 0);
    status_dummy.scale.set(mark[2], mark[3], 0.010);
    status_dummy.updateMatrix();
    status_marks.setMatrixAt(i, status_dummy.matrix);
  }
  status_marks.instanceMatrix.needsUpdate = true;
  meter_head.add(status_marks);

  const dialCenterX = -0.43;
  const dialCenterY = -0.02;

  const dial_tickGeom = new THREE.BoxGeometry(0.022, 0.085, 0.014);
  const dial_ticks = new THREE.InstancedMesh(
    dial_tickGeom,
    whiteMarkMat,
    28
  );
  const dial_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2;
    const radius = 0.505;
    dial_dummy.position.set(
      dialCenterX + Math.cos(angle) * radius,
      dialCenterY + Math.sin(angle) * radius,
      0.281
    );
    dial_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    dial_dummy.scale.set(1, i % 4 === 0 ? 1.25 : 0.72, 1);
    dial_dummy.updateMatrix();
    dial_ticks.setMatrixAt(i, dial_dummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  meter_head.add(dial_ticks);

  const dial_knobGeom = new THREE.CylinderGeometry(
    0.365,
    0.365,
    0.16,
    48
  );
  const dial_knob = new THREE.Mesh(dial_knobGeom, knobMat);
  dial_knob.rotation.x = Math.PI / 2;
  dial_knob.position.set(dialCenterX, dialCenterY, 0.345);
  meter_head.add(dial_knob);

  const dial_knob_faceGeom = new THREE.CylinderGeometry(
    0.335,
    0.335,
    0.025,
    48
  );
  const dial_knob_face = new THREE.Mesh(dial_knob_faceGeom, knobMat);
  dial_knob_face.rotation.x = Math.PI / 2;
  dial_knob_face.position.set(dialCenterX, dialCenterY, 0.433);
  meter_head.add(dial_knob_face);

  const dial_knob_edgeGeom = new THREE.TorusGeometry(
    0.333,
    0.028,
    8,
    48
  );
  const dial_knob_edge = new THREE.Mesh(dial_knob_edgeGeom, darkBodyMat);
  dial_knob_edge.position.set(dialCenterX, dialCenterY, 0.431);
  meter_head.add(dial_knob_edge);

  const dial_ridgeGeom = new THREE.BoxGeometry(0.045, 0.082, 0.13);
  const dial_knob_ridges = new THREE.InstancedMesh(
    dial_ridgeGeom,
    knobMat,
    32
  );
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    ridge_dummy.position.set(
      dialCenterX + Math.cos(angle) * 0.382,
      dialCenterY + Math.sin(angle) * 0.382,
      0.345
    );
    ridge_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    ridge_dummy.scale.set(1, 1, 1);
    ridge_dummy.updateMatrix();
    dial_knob_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  dial_knob_ridges.instanceMatrix.needsUpdate = true;
  meter_head.add(dial_knob_ridges);

  const dial_indicatorGeom = makeRoundedRectGeometry(
    0.035,
    0.105,
    0.018,
    0.012,
    0.003
  );
  const dial_indicator = new THREE.Mesh(
    dial_indicatorGeom,
    whiteMarkMat
  );
  dial_indicator.position.set(dialCenterX, dialCenterY - 0.31, 0.455);
  meter_head.add(dial_indicator);

  const power_ringGeom = new THREE.TorusGeometry(0.065, 0.012, 8, 24);
  const power_ring = new THREE.Mesh(power_ringGeom, whiteMarkMat);
  power_ring.position.set(-0.28, 0.49, 0.282);
  meter_head.add(power_ring);

  const scale_slotGeom = makeRoundedRectGeometry(
    1.34,
    0.12,
    0.025,
    0.055,
    0.006
  );
  const scale_slot = new THREE.Mesh(scale_slotGeom, blackPlasticMat);
  scale_slot.position.set(-0.96, -0.31, 0.238);
  meter_head.add(scale_slot);

  const slider_knobGeom = new THREE.CylinderGeometry(
    0.115,
    0.115,
    0.13,
    24
  );
  const slider_knob = new THREE.Mesh(slider_knobGeom, blackPlasticMat);
  slider_knob.rotation.x = Math.PI / 2;
  slider_knob.position.set(-1.35, -0.31, 0.305);
  meter_head.add(slider_knob);

  const slider_knob_faceGeom = new THREE.CylinderGeometry(
    0.082,
    0.082,
    0.025,
    24
  );
  const slider_knob_face = new THREE.Mesh(
    slider_knob_faceGeom,
    markingMat
  );
  slider_knob_face.rotation.x = Math.PI / 2;
  slider_knob_face.position.set(-1.35, -0.31, 0.382);
  meter_head.add(slider_knob_face);

  const slider_indicatorGeom = new THREE.BoxGeometry(0.025, 0.16, 0.018);
  const slider_indicator = new THREE.Mesh(
    slider_indicatorGeom,
    whiteMarkMat
  );
  slider_indicator.position.set(-1.35, -0.31, 0.402);
  meter_head.add(slider_indicator);

  const scale_tickGeom = new THREE.BoxGeometry(0.022, 0.11, 0.014);
  const scale_ticks = new THREE.InstancedMesh(
    scale_tickGeom,
    markingMat,
    13
  );
  const scale_dummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    scale_dummy.position.set(-1.53 + i * 0.095, -0.445, 0.242);
    scale_dummy.rotation.set(0, 0, 0);
    scale_dummy.scale.set(1, i % 2 === 0 ? 1.45 : 0.78, 1);
    scale_dummy.updateMatrix();
    scale_ticks.setMatrixAt(i, scale_dummy.matrix);
  }
  scale_ticks.instanceMatrix.needsUpdate = true;
  meter_head.add(scale_ticks);

  const range_knobGeom = new THREE.CylinderGeometry(
    0.18,
    0.18,
    0.18,
    32
  );
  const range_knob = new THREE.Mesh(range_knobGeom, knobMat);
  range_knob.rotation.x = Math.PI / 2;
  range_knob.position.set(-1.30, 0.35, 0.315);
  meter_head.add(range_knob);

  const range_knob_faceGeom = new THREE.CylinderGeometry(
    0.155,
    0.155,
    0.025,
    32
  );
  const range_knob_face = new THREE.Mesh(range_knob_faceGeom, knobMat);
  range_knob_face.rotation.x = Math.PI / 2;
  range_knob_face.position.set(-1.30, 0.35, 0.418);
  meter_head.add(range_knob_face);

  const range_ridgeGeom = new THREE.BoxGeometry(0.035, 0.065, 0.15);
  const range_knob_ridges = new THREE.InstancedMesh(
    range_ridgeGeom,
    darkBodyMat,
    20
  );
  const range_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    range_dummy.position.set(
      -1.30 + Math.cos(angle) * 0.19,
      0.35 + Math.sin(angle) * 0.19,
      0.315
    );
    range_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    range_dummy.scale.set(1, 1, 1);
    range_dummy.updateMatrix();
    range_knob_ridges.setMatrixAt(i, range_dummy.matrix);
  }
  range_knob_ridges.instanceMatrix.needsUpdate = true;
  meter_head.add(range_knob_ridges);

  const scale_labelGeom = new THREE.BoxGeometry(1, 1, 1);
  const scale_labels = new THREE.InstancedMesh(
    scale_labelGeom,
    markingMat,
    12
  );
  const label_dummy = new THREE.Object3D();
  const labelData = [
    [-1.43, -0.59, 0.07, 0.018, 0],
    [-1.43, -0.67, 0.018, 0.08, 0],
    [-1.10, -0.59, 0.07, 0.018, 0],
    [-1.04, -0.56, 0.018, 0.08, 0],
    [-1.04, -0.67, 0.018, 0.08, 0],
    [-0.72, -0.59, 0.07, 0.018, 0],
    [-0.66, -0.56, 0.018, 0.08, 0],
    [-0.66, -0.67, 0.018, 0.08, 0],
    [-0.38, -0.59, 0.07, 0.018, 0],
    [-0.32, -0.56, 0.018, 0.08, 0],
    [-0.32, -0.67, 0.018, 0.08, 0],
    [-0.20, -0.59, 0.07, 0.018, 0],
  ];
  for (let i = 0; i < labelData.length; i++) {
    const item = labelData[i];
    label_dummy.position.set(item[0], item[1], 0.244);
    label_dummy.rotation.set(0, 0, item[4]);
    label_dummy.scale.set(item[2], item[3], 0.012);
    label_dummy.updateMatrix();
    scale_labels.setMatrixAt(i, label_dummy.matrix);
  }
  scale_labels.instanceMatrix.needsUpdate = true;
  meter_head.add(scale_labels);

  const brand_marks = new THREE.InstancedMesh(
    scale_labelGeom,
    whiteMarkMat,
    18
  );
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    brand_dummy.position.set(0.10 + i * 0.105, -0.485, 0.282);
    brand_dummy.rotation.set(0, 0, i % 3 === 0 ? -0.12 : 0);
    brand_dummy.scale.set(0.065, 0.018, 0.012);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, brand_dummy.matrix);

    brand_dummy.position.set(0.14 + i * 0.105, 0.595, 0.282);
    brand_dummy.rotation.set(0, 0, i % 2 === 0 ? 0.08 : 0);
    brand_dummy.scale.set(0.058, 0.014, 0.012);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i + 9, brand_dummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  meter_head.add(brand_marks);

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