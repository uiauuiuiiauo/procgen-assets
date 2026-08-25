export default function generate(THREE) {
  const root = new THREE.Group();

  const main_housingMat = new THREE.MeshStandardMaterial({
    color: 0x626568,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rear_housingMat = new THREE.MeshStandardMaterial({
    color: 0x4b4d50,
    metalness: 0.0,
    roughness: 0.8,
  });
  const black_panelMat = new THREE.MeshStandardMaterial({
    color: 0x101112,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x424448,
    metalness: 0.0,
    roughness: 0.8,
  });
  const sliderMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xe7e9e8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const printed_markingMat = new THREE.MeshStandardMaterial({
    color: 0x242629,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lcd_screenMat = new THREE.MeshStandardMaterial({
    color: 0x9fb7a0,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lcd_digitMat = new THREE.MeshStandardMaterial({
    color: 0x26302c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const ventMat = new THREE.MeshStandardMaterial({
    color: 0x2d2f31,
    metalness: 0.0,
    roughness: 0.8,
  });
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x5b5d60,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedRectGeometry(width, height, radius, depth, bevelSize) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelThickness: bevelSize,
      bevelSize,
      bevelSegments: 3,
      curveSegments: 8,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    const position = new THREE.Vector3(x, y, z);
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(rx, ry, rz)
    );
    const scale = new THREE.Vector3(sx, sy, sz);
    const matrix = new THREE.Matrix4().compose(position, quaternion, scale);
    mesh.setMatrixAt(index, matrix);
  }

  const baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.50, 0.00),
    new THREE.Vector2(0.62, 0.025),
    new THREE.Vector2(0.67, 0.075),
    new THREE.Vector2(0.67, 0.145),
    new THREE.Vector2(0.62, 0.195),
    new THREE.Vector2(0.50, 0.225),
    new THREE.Vector2(0.00, 0.225),
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 40);
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.position.set(0.10, 0, -0.10);
  base.scale.set(1.0, 1.0, 0.66);
  root.add(base);

  const supportShape = new THREE.Shape();
  supportShape.moveTo(-0.34, 0.18);
  supportShape.lineTo(0.57, 0.18);
  supportShape.lineTo(0.47, 0.66);
  supportShape.quadraticCurveTo(0.39, 1.03, 0.42, 1.34);
  supportShape.lineTo(0.30, 1.60);
  supportShape.lineTo(-0.12, 1.34);
  supportShape.quadraticCurveTo(-0.34, 0.82, -0.34, 0.18);

  const supportGeom = new THREE.ExtrudeGeometry(supportShape, {
    depth: 0.42,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  supportGeom.translate(0, 0, -0.21);
  const support = new THREE.Mesh(supportGeom, rear_housingMat);
  support.position.z = -0.22;
  root.add(support);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.38, 0.18);
  handleShape.quadraticCurveTo(-0.50, 0.27, -0.45, 0.52);
  handleShape.lineTo(-0.25, 1.22);
  handleShape.quadraticCurveTo(-0.18, 1.52, 0.03, 1.65);
  handleShape.lineTo(0.48, 1.61);
  handleShape.quadraticCurveTo(0.67, 1.48, 0.66, 1.24);
  handleShape.lineTo(0.58, 0.48);
  handleShape.quadraticCurveTo(0.55, 0.22, 0.32, 0.16);
  handleShape.lineTo(-0.38, 0.18);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.46,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
  });
  handleGeom.translate(0, 0, -0.23);
  const handle = new THREE.Mesh(handleGeom, main_housingMat);
  handle.position.z = 0.01;
  root.add(handle);

  const vent_slotsGeom = roundedRectGeometry(0.034, 0.23, 0.017, 0.008, 0.002);
  const vent_slots = new THREE.InstancedMesh(vent_slotsGeom, ventMat, 5);
  for (let i = 0; i < 5; i++) {
    setInstance(
      vent_slots,
      i,
      0.16 + i * 0.065,
      0.57 + i * 0.012,
      0.285,
      0,
      0,
      -0.20,
      1,
      0.78 + i * 0.07,
      1
    );
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  root.add(vent_slots);

  const handle_seamCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, 0.27, 0.291),
    new THREE.Vector3(0.29, 0.22, 0.291),
    new THREE.Vector3(0.48, 0.29, 0.291),
    new THREE.Vector3(0.57, 0.45, 0.291),
  ]);
  const handle_seamGeom = new THREE.TubeGeometry(
    handle_seamCurve,
    18,
    0.007,
    6,
    false
  );
  const handle_seam = new THREE.Mesh(handle_seamGeom, printed_markingMat);
  root.add(handle_seam);

  const instrument_group = new THREE.Group();
  instrument_group.position.set(0, 1.76, 0);
  instrument_group.rotation.z = 0.27;
  root.add(instrument_group);

  const rear_housingGeom = roundedRectGeometry(3.12, 1.28, 0.25, 0.42, 0.045);
  const rear_housing = new THREE.Mesh(rear_housingGeom, rear_housingMat);
  rear_housing.position.set(0.05, 0.035, -0.13);
  instrument_group.add(rear_housing);

  const main_housingGeom = roundedRectGeometry(3.04, 1.18, 0.22, 0.46, 0.04);
  const main_housing = new THREE.Mesh(main_housingGeom, main_housingMat);
  instrument_group.add(main_housing);

  const rear_end_capGeom = roundedRectGeometry(0.54, 1.02, 0.20, 0.34, 0.035);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, rear_housingMat);
  rear_end_cap.position.set(1.48, 0.02, -0.23);
  instrument_group.add(rear_end_cap);

  const rear_side_buttonGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.075, 16);
  const rear_side_button = new THREE.Mesh(rear_side_buttonGeom, dialMat);
  rear_side_button.rotation.z = Math.PI / 2;
  rear_side_button.position.set(1.71, 0.08, -0.02);
  instrument_group.add(rear_side_button);

  const black_panelGeom = roundedRectGeometry(1.88, 0.92, 0.15, 0.025, 0.008);
  const black_panel = new THREE.Mesh(black_panelGeom, black_panelMat);
  black_panel.position.set(0.58, 0.09, 0.285);
  instrument_group.add(black_panel);

  const lcd_bezelGeom = roundedRectGeometry(1.22, 0.70, 0.075, 0.026, 0.007);
  const lcd_bezel = new THREE.Mesh(lcd_bezelGeom, black_panelMat);
  lcd_bezel.position.set(0.72, 0.10, 0.310);
  instrument_group.add(lcd_bezel);

  const lcd_screenGeom = roundedRectGeometry(1.08, 0.57, 0.045, 0.012, 0.003);
  const lcd_screen = new THREE.Mesh(lcd_screenGeom, lcd_screenMat);
  lcd_screen.position.set(0.72, 0.10, 0.330);
  instrument_group.add(lcd_screen);

  const lcdBarSpecs = [];
  const digitSegments = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "c", "d", "g"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };

  function addLcdBar(x, y, width, height, rotation) {
    lcdBarSpecs.push([x, y, width, height, rotation || 0]);
  }

  function addLcdDigit(character, x, y, scale) {
    const horizontal = 0.14 * scale;
    const vertical = 0.115 * scale;
    const thickness = 0.025 * scale;
    const xSide = 0.068 * scale;
    const yEdge = 0.122 * scale;
    const yHalf = 0.061 * scale;
    const centers = {
      a: [x, y + yEdge, horizontal, thickness, 0],
      b: [x + xSide, y + yHalf, thickness, vertical, 0],
      c: [x + xSide, y - yHalf, thickness, vertical, 0],
      d: [x, y - yEdge, horizontal, thickness, 0],
      e: [x - xSide, y - yHalf, thickness, vertical, 0],
      f: [x - xSide, y + yHalf, thickness, vertical, 0],
      g: [x, y, horizontal, thickness, 0],
    };
    const active = digitSegments[character] || [];
    for (const segment of active) {
      const center = centers[segment];
      addLcdBar(center[0], center[1], center[2], center[3], center[4]);
    }
  }

  addLcdDigit("2", 0.34, 0.10, 1.0);
  addLcdDigit("3", 0.62, 0.10, 1.0);
  addLcdDigit("7", 0.90, 0.10, 1.0);
  addLcdBar(0.505, 0.015, 0.025, 0.025, 0);
  addLcdBar(0.755, 0.015, 0.025, 0.025, 0);
  addLcdDigit("0", 1.055, 0.325, 0.27);
  addLcdDigit("0", 1.145, 0.325, 0.27);
  addLcdDigit("0", 1.235, 0.325, 0.27);
  addLcdBar(0.31, 0.335, 0.055, 0.012, 0);
  addLcdBar(0.36, 0.335, 0.032, 0.012, 0);

  const lcd_segmentsGeom = new THREE.BoxGeometry(1, 1, 1);
  const lcd_segments = new THREE.InstancedMesh(
    lcd_segmentsGeom,
    lcd_digitMat,
    lcdBarSpecs.length
  );
  for (let i = 0; i < lcdBarSpecs.length; i++) {
    const spec = lcdBarSpecs[i];
    setInstance(
      lcd_segments,
      i,
      spec[0],
      spec[1],
      0.345,
      0,
      0,
      spec[4],
      spec[2],
      spec[3],
      0.008
    );
  }
  lcd_segments.instanceMatrix.needsUpdate = true;
  instrument_group.add(lcd_segments);

  const dialCenterX = -0.34;
  const dialCenterY = -0.02;

  const dial_backplateGeom = new THREE.CylinderGeometry(0.365, 0.365, 0.035, 40);
  const dial_backplate = new THREE.Mesh(dial_backplateGeom, black_panelMat);
  dial_backplate.rotation.x = Math.PI / 2;
  dial_backplate.position.set(dialCenterX, dialCenterY, 0.318);
  instrument_group.add(dial_backplate);

  const dial_knobGeom = new THREE.CylinderGeometry(0.295, 0.295, 0.13, 48);
  const dial_knob = new THREE.Mesh(dial_knobGeom, dialMat);
  dial_knob.rotation.x = Math.PI / 2;
  dial_knob.position.set(dialCenterX, dialCenterY, 0.385);
  instrument_group.add(dial_knob);

  const dial_faceGeom = new THREE.CylinderGeometry(0.265, 0.265, 0.014, 48);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.set(dialCenterX, dialCenterY, 0.455);
  instrument_group.add(dial_face);

  const dial_knurlGeom = new THREE.BoxGeometry(1, 1, 1);
  const dial_knurl = new THREE.InstancedMesh(dial_knurlGeom, dialMat, 32);
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    setInstance(
      dial_knurl,
      i,
      dialCenterX + Math.cos(angle) * 0.305,
      dialCenterY + Math.sin(angle) * 0.305,
      0.391,
      0,
      0,
      angle - Math.PI / 2,
      0.035,
      0.065,
      0.105
    );
  }
  dial_knurl.instanceMatrix.needsUpdate = true;
  instrument_group.add(dial_knurl);

  const dial_ticksGeom = new THREE.BoxGeometry(1, 1, 1);
  const dial_ticks = new THREE.InstancedMesh(dial_ticksGeom, markingMat, 28);
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    const major = i % 4 === 0;
    setInstance(
      dial_ticks,
      i,
      dialCenterX + Math.cos(angle) * 0.415,
      dialCenterY + Math.sin(angle) * 0.415,
      0.315,
      0,
      0,
      angle - Math.PI / 2,
      major ? 0.018 : 0.011,
      major ? 0.078 : 0.048,
      0.010
    );
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  instrument_group.add(dial_ticks);

  const dial_pointerGeom = new THREE.BoxGeometry(0.025, 0.095, 0.012);
  const dial_pointer = new THREE.Mesh(dial_pointerGeom, markingMat);
  dial_pointer.position.set(dialCenterX + 0.215, dialCenterY - 0.215, 0.463);
  dial_pointer.rotation.z = -Math.PI / 4;
  instrument_group.add(dial_pointer);

  const unit_markGeom = new THREE.TorusGeometry(0.052, 0.011, 8, 24);
  const unit_mark = new THREE.Mesh(unit_markGeom, markingMat);
  unit_mark.position.set(-0.20, 0.405, 0.316);
  instrument_group.add(unit_mark);

  const slider_trackGeom = roundedRectGeometry(1.20, 0.105, 0.045, 0.025, 0.005);
  const slider_track = new THREE.Mesh(slider_trackGeom, sliderMat);
  slider_track.position.set(-0.96, -0.30, 0.289);
  instrument_group.add(slider_track);

  const slider_knobGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.105, 24);
  const slider_knob = new THREE.Mesh(slider_knobGeom, sliderMat);
  slider_knob.rotation.x = Math.PI / 2;
  slider_knob.position.set(-1.37, -0.30, 0.355);
  instrument_group.add(slider_knob);

  const slider_knob_faceGeom = new THREE.CylinderGeometry(0.070, 0.070, 0.014, 24);
  const slider_knob_face = new THREE.Mesh(slider_knob_faceGeom, dialMat);
  slider_knob_face.rotation.x = Math.PI / 2;
  slider_knob_face.position.set(-1.37, -0.30, 0.414);
  instrument_group.add(slider_knob_face);

  const slider_knob_rimGeom = new THREE.TorusGeometry(0.071, 0.012, 8, 24);
  const slider_knob_rim = new THREE.Mesh(slider_knob_rimGeom, sliderMat);
  slider_knob_rim.position.set(-1.37, -0.30, 0.423);
  instrument_group.add(slider_knob_rim);

  const range_knob_mountGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.08, 24);
  const range_knob_mount = new THREE.Mesh(range_knob_mountGeom, sliderMat);
  range_knob_mount.rotation.x = Math.PI / 2;
  range_knob_mount.position.set(-1.10, 0.27, 0.315);
  instrument_group.add(range_knob_mount);

  const range_knobGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.18, 24);
  const range_knob = new THREE.Mesh(range_knobGeom, dialMat);
  range_knob.rotation.x = Math.PI / 2;
  range_knob.position.set(-1.10, 0.27, 0.405);
  instrument_group.add(range_knob);

  const range_knob_capGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.012, 24);
  const range_knob_cap = new THREE.Mesh(range_knob_capGeom, dialMat);
  range_knob_cap.rotation.x = Math.PI / 2;
  range_knob_cap.position.set(-1.10, 0.27, 0.501);
  instrument_group.add(range_knob_cap);

  const range_knob_ridgesGeom = new THREE.BoxGeometry(1, 1, 1);
  const range_knob_ridges = new THREE.InstancedMesh(
    range_knob_ridgesGeom,
    sliderMat,
    16
  );
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    setInstance(
      range_knob_ridges,
      i,
      -1.10 + Math.cos(angle) * 0.151,
      0.27 + Math.sin(angle) * 0.151,
      0.408,
      0,
      0,
      angle - Math.PI / 2,
      0.022,
      0.034,
      0.16
    );
  }
  range_knob_ridges.instanceMatrix.needsUpdate = true;
  instrument_group.add(range_knob_ridges);

  const scale_ticksGeom = new THREE.BoxGeometry(1, 1, 1);
  const scale_ticks = new THREE.InstancedMesh(scale_ticksGeom, printed_markingMat, 15);
  for (let i = 0; i < 15; i++) {
    const height = i % 4 === 0 ? 0.105 : (i % 2 === 0 ? 0.075 : 0.052);
    setInstance(
      scale_ticks,
      i,
      -1.42 + i * 0.081,
      -0.18 - height / 2,
      0.284,
      0,
      0,
      0,
      0.012,
      height,
      0.009
    );
  }
  scale_ticks.instanceMatrix.needsUpdate = true;
  instrument_group.add(scale_ticks);

  const scaleLabelSpecs = [];
  function addSevenSegmentLabel(text, x, y, scale) {
    const step = 0.115 * scale;
    const horizontal = 0.090 * scale;
    const vertical = 0.074 * scale;
    const thickness = 0.014 * scale;
    const centers = {
      a: [0, 0.084 * scale, horizontal, thickness, 0],
      b: [0.048 * scale, 0.042 * scale, thickness, vertical, 0],
      c: [0.048 * scale, -0.042 * scale, thickness, vertical, 0],
      d: [0, -0.084 * scale, horizontal, thickness, 0],
      e: [-0.048 * scale, -0.042 * scale, thickness, vertical, 0],
      f: [-0.048 * scale, 0.042 * scale, thickness, vertical, 0],
      g: [0, 0, horizontal, thickness, 0],
    };
    const segments = {
      "0": ["a", "b", "c", "d", "e", "f"],
      "1": ["b", "c"],
      "2": ["a", "b", "g", "e", "d"],
      "3": ["a", "b", "c", "d", "g"],
      "4": ["f", "g", "b", "c"],
      "5": ["a", "f", "g", "c", "d"],
      "6": ["a", "f", "g", "e", "c", "d"],
      "7": ["a", "b", "c"],
      "8": ["a", "b", "c", "d", "e", "f", "g"],
      "9": ["a", "b", "c", "d", "f", "g"],
    };
    for (let digitIndex = 0; digitIndex < text.length; digitIndex++) {
      const digitX = x + (digitIndex - (text.length - 1) / 2) * step;
      const active = segments[text[digitIndex]] || [];
      for (const segment of active) {
        const center = centers[segment];
        scaleLabelSpecs.push([
          digitX + center[0],
          y + center[1],
          center[2],
          center[3],
          center[4],
        ]);
      }
    }
  }

  addSevenSegmentLabel("0", -1.42, -0.47, 0.72);
  addSevenSegmentLabel("10", -0.91, -0.46, 0.68);
  addSevenSegmentLabel("20", -0.38, -0.46, 0.68);

  const scale_labelsGeom = new THREE.BoxGeometry(1, 1, 1);
  const scale_labels = new THREE.InstancedMesh(
    scale_labelsGeom,
    printed_markingMat,
    scaleLabelSpecs.length
  );
  for (let i = 0; i < scaleLabelSpecs.length; i++) {
    const spec = scaleLabelSpecs[i];
    setInstance(
      scale_labels,
      i,
      spec[0],
      spec[1],
      0.284,
      0,
      0,
      spec[4],
      spec[2],
      spec[3],
      0.009
    );
  }
  scale_labels.instanceMatrix.needsUpdate = true;
  instrument_group.add(scale_labels);

  const brandSpecs = [];
  const glyphs = {
    F: [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0.52, 0.82, 0.52]],
    L: [[0, 1, 0, 0], [0, 0, 1, 0]],
    E: [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0.52, 0.82, 0.52], [0, 1, 1, 1]],
    X: [[0, 1, 1, 0], [1, 1, 0, 0]],
    O: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 0, 0, 0]],
    N: [[0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]],
  };
  const brandText = "FLEXION";
  const brandStartX = 0.20;
  const brandBaseY = 0.49;
  const brandCharW = 0.075;
  const brandCharH = 0.115;
  const brandGap = 0.025;

  for (let letterIndex = 0; letterIndex < brandText.length; letterIndex++) {
    const lines = glyphs[brandText[letterIndex]] || [];
    const letterX = brandStartX + letterIndex * (brandCharW + brandGap);
    for (const line of lines) {
      const x1 = letterX + line[0] * brandCharW;
      const y1 = brandBaseY + line[1] * brandCharH;
      const x2 = letterX + line[2] * brandCharW;
      const y2 = brandBaseY + line[3] * brandCharH;
      const dx = x2 - x1;
      const dy = y2 - y1;
      brandSpecs.push([
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        Math.sqrt(dx * dx + dy * dy),
        Math.atan2(dy, dx),
      ]);
    }
  }

  const brand_markGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_mark = new THREE.InstancedMesh(
    brand_markGeom,
    markingMat,
    brandSpecs.length
  );
  for (let i = 0; i < brandSpecs.length; i++) {
    const spec = brandSpecs[i];
    setInstance(
      brand_mark,
      i,
      spec[0],
      spec[1],
      0.316,
      0,
      0,
      spec[3],
      spec[2],
      0.012,
      0.009
    );
  }
  brand_mark.instanceMatrix.needsUpdate = true;
  instrument_group.add(brand_mark);

  const calibrationSpecs = [
    [-0.47, 0.525, 0.08, 0.012, 0],
    [-0.38, 0.525, 0.05, 0.012, 0],
    [-0.31, 0.525, 0.07, 0.012, 0],
    [-0.23, 0.525, 0.04, 0.012, 0],
    [-0.43, 0.565, 0.11, 0.010, 0],
    [-0.30, 0.565, 0.08, 0.010, 0],
  ];
  const calibration_markGeom = new THREE.BoxGeometry(1, 1, 1);
  const calibration_mark = new THREE.InstancedMesh(
    calibration_markGeom,
    markingMat,
    calibrationSpecs.length
  );
  for (let i = 0; i < calibrationSpecs.length; i++) {
    const spec = calibrationSpecs[i];
    setInstance(
      calibration_mark,
      i,
      spec[0],
      spec[1],
      0.316,
      0,
      0,
      spec[4],
      spec[2],
      spec[3],
      0.009
    );
  }
  calibration_mark.instanceMatrix.needsUpdate = true;
  instrument_group.add(calibration_mark);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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