export default function generate(THREE) {
  const root = new THREE.Group();

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0x666a6c,
    metalness: 0.0,
    roughness: 0.8
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x111314,
    metalness: 0.0,
    roughness: 0.3
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x55595b,
    metalness: 0.0,
    roughness: 0.8
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x8fa68f,
    metalness: 0.0,
    roughness: 0.3
  });
  const digitMat = new THREE.MeshStandardMaterial({
    color: 0x101713,
    metalness: 0.0,
    roughness: 0.8
  });
  const whiteMarkMat = new THREE.MeshStandardMaterial({
    color: 0xe8ecec,
    metalness: 0.0,
    roughness: 0.7
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = -width / 2;
    const y = -height / 2;
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    shape.closePath();
    return shape;
  }

  const base_footGeom = new THREE.CylinderGeometry(0.5, 0.53, 0.15, 48);
  const base_foot = new THREE.Mesh(base_footGeom, housingMat);
  base_foot.scale.set(1.12, 1, 0.62);
  base_foot.position.set(0, -0.91, -0.03);
  root.add(base_foot);

  const base_topGeom = new THREE.CylinderGeometry(0.46, 0.49, 0.08, 48);
  const base_top = new THREE.Mesh(base_topGeom, housingMat);
  base_top.scale.set(1.08, 1, 0.58);
  base_top.position.set(0, -0.82, -0.03);
  root.add(base_top);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.18, -0.86);
  handleShape.quadraticCurveTo(-0.29, -0.84, -0.31, -0.7);
  handleShape.lineTo(-0.37, -0.13);
  handleShape.quadraticCurveTo(-0.38, 0.02, -0.48, 0.14);
  handleShape.lineTo(0.25, 0.14);
  handleShape.quadraticCurveTo(0.29, -0.03, 0.31, -0.17);
  handleShape.lineTo(0.39, -0.69);
  handleShape.quadraticCurveTo(0.4, -0.82, 0.27, -0.88);
  handleShape.closePath();

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.36,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 12
  });
  const handle = new THREE.Mesh(handleGeom, housingMat);
  handle.position.z = -0.19;
  root.add(handle);

  const handle_vent_slotsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.14,
    10
  );
  const handle_vent_slots = new THREE.InstancedMesh(
    handle_vent_slotsGeom,
    darkMat,
    4
  );
  const ventDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    ventDummy.position.set(0.095 + i * 0.047, -0.57, 0.218);
    ventDummy.rotation.set(0, 0, -0.18);
    ventDummy.scale.set(1, 1, 0.45);
    ventDummy.updateMatrix();
    handle_vent_slots.setMatrixAt(i, ventDummy.matrix);
  }
  handle_vent_slots.instanceMatrix.needsUpdate = true;
  root.add(handle_vent_slots);

  const handle_lower_seamGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.23, -0.79, 0.216),
      new THREE.Vector3(0.31, -0.72, 0.216)
    ),
    1,
    0.006,
    6,
    false
  );
  const handle_lower_seam = new THREE.Mesh(handle_lower_seamGeom, darkMat);
  root.add(handle_lower_seam);

  const support_finShape = new THREE.Shape();
  support_finShape.moveTo(-0.43, -0.82);
  support_finShape.lineTo(-0.46, -0.1);
  support_finShape.lineTo(-0.25, -0.56);
  support_finShape.lineTo(-0.18, -0.82);
  support_finShape.closePath();

  const support_finGeom = new THREE.ExtrudeGeometry(support_finShape, {
    depth: 0.1,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  const support_fin = new THREE.Mesh(support_finGeom, darkMat);
  support_fin.position.z = -0.17;
  root.add(support_fin);

  const head_group = new THREE.Group();
  head_group.position.set(0, 0.1, 0);
  head_group.rotation.z = 0.27;
  root.add(head_group);

  const head_housingShape = roundedRectShape(2.05, 0.64, 0.17);
  const head_housingGeom = new THREE.ExtrudeGeometry(head_housingShape, {
    depth: 0.34,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 16
  });
  const head_housing = new THREE.Mesh(head_housingGeom, housingMat);
  head_housing.position.z = -0.17;
  head_group.add(head_housing);

  const rear_capShape = roundedRectShape(0.55, 0.48, 0.14);
  const rear_capGeom = new THREE.ExtrudeGeometry(rear_capShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 12
  });
  const rear_cap = new THREE.Mesh(rear_capGeom, housingMat);
  rear_cap.position.set(0.75, 0, -0.225);
  head_group.add(rear_cap);

  const rear_cap_seamGeom = new THREE.BoxGeometry(0.014, 0.37, 0.012);
  const rear_cap_seam = new THREE.Mesh(rear_cap_seamGeom, darkMat);
  rear_cap_seam.position.set(0.82, 0, -0.13);
  head_group.add(rear_cap_seam);

  const control_panelShape = roundedRectShape(1.15, 0.46, 0.095);
  const control_panelGeom = new THREE.ExtrudeGeometry(control_panelShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
    curveSegments: 12
  });
  const control_panel = new THREE.Mesh(control_panelGeom, panelMat);
  control_panel.position.set(0.38, 0.04, 0.197);
  head_group.add(control_panel);

  const display_bezelShape = roundedRectShape(0.72, 0.34, 0.055);
  const display_bezelGeom = new THREE.ExtrudeGeometry(display_bezelShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 10
  });
  const display_bezel = new THREE.Mesh(display_bezelGeom, darkMat);
  display_bezel.position.set(0.52, 0.045, 0.222);
  head_group.add(display_bezel);

  const lcd_screenShape = roundedRectShape(0.64, 0.27, 0.035);
  const lcd_screenGeom = new THREE.ExtrudeGeometry(lcd_screenShape, {
    depth: 0.006,
    steps: 1,
    bevelEnabled: false,
    curveSegments: 10
  });
  const lcd_screen = new THREE.Mesh(lcd_screenGeom, screenMat);
  lcd_screen.position.set(0.52, 0.045, 0.239);
  head_group.add(lcd_screen);

  const segmentDefinitions = [
    { x: 0, y: 0.082, w: 0.082, h: 0.014 },
    { x: 0.047, y: 0.041, w: 0.014, h: 0.067 },
    { x: 0.047, y: -0.041, w: 0.014, h: 0.067 },
    { x: 0, y: -0.082, w: 0.082, h: 0.014 },
    { x: -0.047, y: -0.041, w: 0.014, h: 0.067 },
    { x: -0.047, y: 0.041, w: 0.014, h: 0.067 },
    { x: 0, y: 0, w: 0.082, h: 0.014 }
  ];
  const digitPatterns = {
    7: [0, 1, 2],
    2: [0, 1, 6, 4, 3]
  };
  const digitValues = [7, 2, 7];
  const digitCenters = [0.32, 0.52, 0.72];
  const display_digitsGeom = new THREE.BoxGeometry(1, 1, 0.006);
  const display_digits = new THREE.InstancedMesh(
    display_digitsGeom,
    digitMat,
    11
  );
  const digitDummy = new THREE.Object3D();
  let segmentIndex = 0;
  for (let digitIndex = 0; digitIndex < digitValues.length; digitIndex++) {
    const activeSegments = digitPatterns[digitValues[digitIndex]];
    for (let i = 0; i < activeSegments.length; i++) {
      const segment = segmentDefinitions[activeSegments[i]];
      digitDummy.position.set(
        digitCenters[digitIndex] + segment.x,
        0.045 + segment.y,
        0.251
      );
      digitDummy.rotation.set(0, 0, 0);
      digitDummy.scale.set(segment.w, segment.h, 1);
      digitDummy.updateMatrix();
      display_digits.setMatrixAt(segmentIndex, digitDummy.matrix);
      segmentIndex++;
    }
  }
  display_digits.instanceMatrix.needsUpdate = true;
  head_group.add(display_digits);

  const display_decimalGeom = new THREE.CircleGeometry(0.012, 14);
  const display_decimal = new THREE.Mesh(display_decimalGeom, digitMat);
  display_decimal.position.set(0.62, -0.032, 0.255);
  head_group.add(display_decimal);

  const display_status_marksGeom = new THREE.BoxGeometry(1, 1, 0.005);
  const display_status_marks = new THREE.InstancedMesh(
    display_status_marksGeom,
    digitMat,
    6
  );
  const statusMarks = [
    [0.27, 0.15, 0.035, 0.006],
    [0.31, 0.15, 0.018, 0.006],
    [0.68, 0.15, 0.05, 0.006],
    [0.74, 0.15, 0.026, 0.006],
    [0.77, 0.15, 0.012, 0.006],
    [0.31, -0.065, 0.055, 0.006]
  ];
  const statusDummy = new THREE.Object3D();
  for (let i = 0; i < statusMarks.length; i++) {
    const mark = statusMarks[i];
    statusDummy.position.set(mark[0], mark[1], 0.255);
    statusDummy.rotation.set(0, 0, 0);
    statusDummy.scale.set(mark[2], mark[3], 1);
    statusDummy.updateMatrix();
    display_status_marks.setMatrixAt(i, statusDummy.matrix);
  }
  display_status_marks.instanceMatrix.needsUpdate = true;
  head_group.add(display_status_marks);

  const dialX = -0.15;
  const dialY = 0.015;

  const dial_scale_arcGeom = new THREE.RingGeometry(
    0.278,
    0.284,
    48,
    1,
    -1.25,
    2.5
  );
  const dial_scale_arc = new THREE.Mesh(dial_scale_arcGeom, whiteMarkMat);
  dial_scale_arc.position.set(dialX, dialY, 0.228);
  head_group.add(dial_scale_arc);

  const dial_tick_marksGeom = new THREE.BoxGeometry(0.011, 0.052, 0.007);
  const dial_tick_marks = new THREE.InstancedMesh(
    dial_tick_marksGeom,
    whiteMarkMat,
    17
  );
  const tickDummy = new THREE.Object3D();
  for (let i = 0; i < 17; i++) {
    const angle = -1.2 + (2.4 * i) / 16;
    tickDummy.position.set(
      dialX + Math.cos(angle) * 0.255,
      dialY + Math.sin(angle) * 0.255,
      0.232
    );
    tickDummy.rotation.set(0, 0, angle - Math.PI / 2);
    tickDummy.scale.set(1, i % 4 === 0 ? 1.25 : 0.78, 1);
    tickDummy.updateMatrix();
    dial_tick_marks.setMatrixAt(i, tickDummy.matrix);
  }
  dial_tick_marks.instanceMatrix.needsUpdate = true;
  head_group.add(dial_tick_marks);

  const dial_knobGeom = new THREE.CylinderGeometry(
    0.205,
    0.205,
    0.12,
    40
  );
  const dial_knob = new THREE.Mesh(dial_knobGeom, knobMat);
  dial_knob.rotation.x = Math.PI / 2;
  dial_knob.position.set(dialX, dialY, 0.285);
  head_group.add(dial_knob);

  const dial_knob_faceGeom = new THREE.CylinderGeometry(
    0.178,
    0.178,
    0.012,
    40
  );
  const dial_knob_face = new THREE.Mesh(dial_knob_faceGeom, knobMat);
  dial_knob_face.rotation.x = Math.PI / 2;
  dial_knob_face.position.set(dialX, dialY, 0.35);
  head_group.add(dial_knob_face);

  const dial_knob_ridgesGeom = new THREE.BoxGeometry(0.014, 0.042, 0.1);
  const dial_knob_ridges = new THREE.InstancedMesh(
    dial_knob_ridgesGeom,
    darkMat,
    28
  );
  const ridgeDummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = (i / 28) * Math.PI * 2;
    ridgeDummy.position.set(
      dialX + Math.cos(angle) * 0.207,
      dialY + Math.sin(angle) * 0.207,
      0.285
    );
    ridgeDummy.rotation.set(0, 0, angle - Math.PI / 2);
    ridgeDummy.scale.set(1, 1, 1);
    ridgeDummy.updateMatrix();
    dial_knob_ridges.setMatrixAt(i, ridgeDummy.matrix);
  }
  dial_knob_ridges.instanceMatrix.needsUpdate = true;
  head_group.add(dial_knob_ridges);

  const power_ringGeom = new THREE.TorusGeometry(0.034, 0.006, 8, 24);
  const power_ring = new THREE.Mesh(power_ringGeom, whiteMarkMat);
  power_ring.position.set(-0.15, 0.31, 0.235);
  head_group.add(power_ring);

  const slider_trackGeom = new THREE.BoxGeometry(0.77, 0.045, 0.018);
  const slider_track = new THREE.Mesh(slider_trackGeom, darkMat);
  slider_track.position.set(-0.63, -0.19, 0.219);
  head_group.add(slider_track);

  const slider_pointerGeom = new THREE.CylinderGeometry(
    0.048,
    0.048,
    0.052,
    20
  );
  const slider_pointer = new THREE.Mesh(slider_pointerGeom, knobMat);
  slider_pointer.rotation.x = Math.PI / 2;
  slider_pointer.position.set(-0.88, -0.19, 0.252);
  head_group.add(slider_pointer);

  const slider_pointer_centerGeom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.056,
    20
  );
  const slider_pointer_center = new THREE.Mesh(
    slider_pointer_centerGeom,
    darkMat
  );
  slider_pointer_center.rotation.x = Math.PI / 2;
  slider_pointer_center.position.set(-0.88, -0.19, 0.257);
  head_group.add(slider_pointer_center);

  const ruler_tick_marksGeom = new THREE.BoxGeometry(0.008, 0.055, 0.006);
  const ruler_tick_marks = new THREE.InstancedMesh(
    ruler_tick_marksGeom,
    darkMat,
    13
  );
  const rulerDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    rulerDummy.position.set(-0.95 + i * 0.055, -0.085, 0.228);
    rulerDummy.rotation.set(0, 0, 0);
    rulerDummy.scale.set(1, i % 5 === 0 ? 1.65 : i % 2 === 0 ? 1.15 : 0.72, 1);
    rulerDummy.updateMatrix();
    ruler_tick_marks.setMatrixAt(i, rulerDummy.matrix);
  }
  ruler_tick_marks.instanceMatrix.needsUpdate = true;
  head_group.add(ruler_tick_marks);

  const sevenSegmentMap = {
    0: [0, 1, 2, 3, 4, 5],
    1: [1, 2],
    2: [0, 1, 6, 4, 3],
    3: [0, 1, 2, 3, 6],
    4: [5, 6, 1, 2],
    5: [0, 5, 6, 2, 3],
    6: [0, 5, 6, 4, 2, 3],
    7: [0, 1, 2],
    8: [0, 1, 2, 3, 4, 5, 6],
    9: [0, 1, 2, 3, 5, 6]
  };

  function collectNumber(target, value, centerX, centerY, size, z) {
    const text = String(value);
    const spacing = size * 1.25;
    const startX = centerX - ((text.length - 1) * spacing) / 2;
    for (let i = 0; i < text.length; i++) {
      const activeSegments = sevenSegmentMap[text[i]];
      for (let j = 0; j < activeSegments.length; j++) {
        const segment = segmentDefinitions[activeSegments[j]];
        target.push({
          x: startX + i * spacing + segment.x * size,
          y: centerY + segment.y * size,
          z,
          w: segment.w * size,
          h: segment.h * size
        });
      }
    }
  }

  const printedTransforms = [];
  collectNumber(printedTransforms, 7, -0.83, -0.015, 0.34, 0.229);
  collectNumber(printedTransforms, 10, -0.61, -0.012, 0.34, 0.229);
  collectNumber(printedTransforms, 13, -0.39, -0.012, 0.34, 0.229);
  collectNumber(printedTransforms, 0, -0.91, -0.29, 0.3, 0.229);
  collectNumber(printedTransforms, 10, -0.54, -0.29, 0.28, 0.229);

  const printed_scale_numbersGeom = new THREE.BoxGeometry(1, 1, 0.005);
  const printed_scale_numbers = new THREE.InstancedMesh(
    printed_scale_numbersGeom,
    darkMat,
    printedTransforms.length
  );
  const printedDummy = new THREE.Object3D();
  for (let i = 0; i < printedTransforms.length; i++) {
    const transform = printedTransforms[i];
    printedDummy.position.set(transform.x, transform.y, transform.z);
    printedDummy.rotation.set(0, 0, 0);
    printedDummy.scale.set(transform.w, transform.h, 1);
    printedDummy.updateMatrix();
    printed_scale_numbers.setMatrixAt(i, printedDummy.matrix);
  }
  printed_scale_numbers.instanceMatrix.needsUpdate = true;
  head_group.add(printed_scale_numbers);

  const pixelFont = {
    F: ["111", "100", "110", "100", "100"],
    L: ["100", "100", "100", "100", "111"],
    E: ["111", "100", "110", "100", "111"],
    X: ["101", "101", "010", "101", "101"],
    T: ["111", "010", "010", "010", "010"],
    O: ["111", "101", "101", "101", "111"],
    N: ["101", "111", "111", "111", "101"]
  };
  const pixelTransforms = [];

  function collectPixelWord(word, startX, topY, cell, z) {
    for (
      let letterIndex = 0;
      letterIndex < word.length;
      letterIndex++
    ) {
      const rows = pixelFont[word[letterIndex]];
      for (let row = 0; row < rows.length; row++) {
        for (let column = 0; column < rows[row].length; column++) {
          if (rows[row][column] === "1") {
            pixelTransforms.push({
              x: startX + (letterIndex * 4 + column) * cell,
              y: topY - row * cell,
              z,
              size: cell * 0.72
            });
          }
        }
      }
    }
  }

  collectPixelWord("FLEXTON", 0.4, -0.135, 0.012, 0.235);
  collectPixelWord("FLEXTON", -0.02, 0.285, 0.009, 0.235);

  const brand_labelGeom = new THREE.BoxGeometry(1, 1, 0.005);
  const brand_label = new THREE.InstancedMesh(
    brand_labelGeom,
    whiteMarkMat,
    pixelTransforms.length
  );
  const pixelDummy = new THREE.Object3D();
  for (let i = 0; i < pixelTransforms.length; i++) {
    const transform = pixelTransforms[i];
    pixelDummy.position.set(transform.x, transform.y, transform.z);
    pixelDummy.rotation.set(0, 0, 0);
    pixelDummy.scale.set(transform.size, transform.size, 1);
    pixelDummy.updateMatrix();
    brand_label.setMatrixAt(i, pixelDummy.matrix);
  }
  brand_label.instanceMatrix.needsUpdate = true;
  head_group.add(brand_label);

  const adjustment_knob_group = new THREE.Group();
  adjustment_knob_group.position.set(-0.72, 0.31, 0);
  adjustment_knob_group.rotation.z = -0.28;
  head_group.add(adjustment_knob_group);

  const adjustment_stemGeom = new THREE.CylinderGeometry(
    0.04,
    0.04,
    0.1,
    16
  );
  const adjustment_stem = new THREE.Mesh(adjustment_stemGeom, darkMat);
  adjustment_stem.position.y = 0.04;
  adjustment_knob_group.add(adjustment_stem);

  const adjustment_knobGeom = new THREE.CylinderGeometry(
    0.086,
    0.092,
    0.15,
    20
  );
  const adjustment_knob = new THREE.Mesh(adjustment_knobGeom, knobMat);
  adjustment_knob.position.y = 0.14;
  adjustment_knob_group.add(adjustment_knob);

  const adjustment_knob_ridgesGeom = new THREE.BoxGeometry(
    0.012,
    0.13,
    0.014
  );
  const adjustment_knob_ridges = new THREE.InstancedMesh(
    adjustment_knob_ridgesGeom,
    darkMat,
    18
  );
  const adjustmentDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    adjustmentDummy.position.set(
      Math.cos(angle) * 0.089,
      0.14,
      Math.sin(angle) * 0.089
    );
    adjustmentDummy.rotation.set(0, -angle, 0);
    adjustmentDummy.scale.set(1, 1, 1);
    adjustmentDummy.updateMatrix();
    adjustment_knob_ridges.setMatrixAt(i, adjustmentDummy.matrix);
  }
  adjustment_knob_ridges.instanceMatrix.needsUpdate = true;
  adjustment_knob_group.add(adjustment_knob_ridges);

  const adjustment_knob_capGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.012,
    20
  );
  const adjustment_knob_cap = new THREE.Mesh(
    adjustment_knob_capGeom,
    knobMat
  );
  adjustment_knob_cap.position.y = 0.221;
  adjustment_knob_group.add(adjustment_knob_cap);

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