export default function generate(THREE) {
  const root = new THREE.Group();

  const cabinetW = 1.18;
  const cabinetH = 2.35;
  const cabinetD = 0.76;
  const frontZ = cabinetD / 2;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x4a2117,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x74391f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const goldWoodMat = new THREE.MeshStandardMaterial({
    color: 0xb17a35,
    metalness: 0.0,
    roughness: 0.6,
  });
  const burgundyMat = new THREE.MeshStandardMaterial({
    color: 0x2d181d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkPanelMat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grilleLineMat = new THREE.LineBasicMaterial({
    color: 0x42474a,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd1b66b,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const redPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xc82f35,
    metalness: 0.0,
    roughness: 0.3,
  });
  const creamPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xd8d3b6,
    metalness: 0.0,
    roughness: 0.3,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xbfc6b4,
    metalness: 0.0,
    roughness: 0.7,
  });
  const screenDarkMat = new THREE.MeshStandardMaterial({
    color: 0x20282a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const redGraphMat = new THREE.LineBasicMaterial({
    color: 0xd05454,
  });
  const cyanGraphMat = new THREE.LineBasicMaterial({
    color: 0x62c6c0,
  });
  const greenGraphMat = new THREE.LineBasicMaterial({
    color: 0x78a868,
  });
  const gridLineMat = new THREE.LineBasicMaterial({
    color: 0x78817a,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde7e9,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function addBox(w, h, d, mat, x, y, z, parent = root) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addStroke(points, radius, mat, parent = root) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(2, (points.length - 1) * 6),
      radius,
      8,
      false
    );
    const mesh = new THREE.Mesh(geometry, mat);
    parent.add(mesh);
    return mesh;
  }

  function addLineSegments(positions, mat, parent = root) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    const lines = new THREE.LineSegments(geometry, mat);
    parent.add(lines);
    return lines;
  }

  const cabinet_bodyGeom = new THREE.BoxGeometry(
    cabinetW - 0.10,
    cabinetH - 0.06,
    cabinetD - 0.05
  );
  const cabinet_body = new THREE.Mesh(cabinet_bodyGeom, woodMat);
  cabinet_body.position.set(0, cabinetH / 2, -0.015);
  root.add(cabinet_body);

  const side_panelGeom = new THREE.BoxGeometry(0.075, 2.27, cabinetD);
  const left_side_panel = new THREE.Mesh(side_panelGeom, woodMat);
  left_side_panel.position.set(-0.555, 1.175, 0);
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, woodMat);
  right_side_panel.position.set(0.555, 1.175, 0);
  root.add(right_side_panel);

  const rear_panel = addBox(
    1.04,
    2.19,
    0.045,
    woodHighlightMat,
    0,
    1.18,
    -0.397
  );

  const top_cap = addBox(1.18, 0.075, 0.78, woodMat, 0, 2.315, 0);

  const front_postGeom = new THREE.CylinderGeometry(0.048, 0.048, 2.23, 16);
  const left_front_post = new THREE.Mesh(front_postGeom, woodHighlightMat);
  left_front_post.position.set(-0.545, 1.17, frontZ + 0.015);
  root.add(left_front_post);

  const right_front_post = new THREE.Mesh(front_postGeom, woodHighlightMat);
  right_front_post.position.set(0.545, 1.17, frontZ + 0.015);
  root.add(right_front_post);

  const gold_trimGeom = new THREE.CylinderGeometry(0.014, 0.014, 2.15, 10);
  const left_gold_trim = new THREE.Mesh(gold_trimGeom, goldWoodMat);
  left_gold_trim.position.set(-0.493, 1.16, frontZ + 0.055);
  root.add(left_gold_trim);

  const right_gold_trim = new THREE.Mesh(gold_trimGeom, goldWoodMat);
  right_gold_trim.position.set(0.493, 1.16, frontZ + 0.055);
  root.add(right_gold_trim);

  const lower_gold_trim = addBox(
    0.96,
    0.014,
    0.025,
    goldWoodMat,
    0,
    0.13,
    frontZ + 0.046
  );

  const top_marquee_rail = addStroke(
    [
      new THREE.Vector3(-0.52, 2.30, frontZ + 0.025),
      new THREE.Vector3(-0.27, 2.275, frontZ + 0.045),
      new THREE.Vector3(0.00, 2.265, frontZ + 0.05),
      new THREE.Vector3(0.27, 2.275, frontZ + 0.045),
      new THREE.Vector3(0.52, 2.30, frontZ + 0.025),
    ],
    0.035,
    woodHighlightMat
  );

  const marquee_frame = addBox(
    1.00,
    0.34,
    0.055,
    woodHighlightMat,
    0,
    2.075,
    frontZ + 0.018
  );
  const marquee_face = addBox(
    0.91,
    0.245,
    0.025,
    burgundyMat,
    0,
    2.075,
    frontZ + 0.058
  );
  const marquee_top_border = addBox(
    0.90,
    0.012,
    0.018,
    goldMat,
    0,
    2.194,
    frontZ + 0.077
  );
  const marquee_bottom_border = addBox(
    0.90,
    0.012,
    0.018,
    goldMat,
    0,
    1.956,
    frontZ + 0.077
  );
  const marquee_left_border = addBox(
    0.012,
    0.25,
    0.018,
    goldMat,
    -0.444,
    2.075,
    frontZ + 0.077
  );
  const marquee_right_border = addBox(
    0.012,
    0.25,
    0.018,
    goldMat,
    0.444,
    2.075,
    frontZ + 0.077
  );

  const marquee_lettering = new THREE.Group();
  root.add(marquee_lettering);

  const letterStrokes = {
    D: [
      [0, 0, 0, 1], [0, 1, 0.62, 1], [0.62, 1, 0.88, 0.78],
      [0.88, 0.78, 0.88, 0.22], [0.88, 0.22, 0.62, 0], [0.62, 0, 0, 0],
    ],
    U: [
      [0, 1, 0, 0.18], [0, 0.18, 0.18, 0], [0.18, 0, 0.70, 0],
      [0.70, 0, 0.88, 0.18], [0.88, 0.18, 0.88, 1],
    ],
    K: [
      [0, 0, 0, 1], [0, 0.48, 0.88, 1], [0, 0.48, 0.88, 0],
    ],
    E: [
      [0.88, 1, 0, 1], [0, 1, 0, 0], [0, 0.50, 0.70, 0.50],
      [0, 0, 0.88, 0],
    ],
    B: [
      [0, 0, 0, 1], [0, 1, 0.65, 1], [0.65, 1, 0.86, 0.78],
      [0.86, 0.78, 0.65, 0.52], [0.65, 0.52, 0, 0.52],
      [0.65, 0.52, 0.88, 0.25], [0.88, 0.25, 0.65, 0],
      [0.65, 0, 0, 0],
    ],
    O: [
      [0.16, 0, 0.72, 0], [0.72, 0, 0.88, 0.18],
      [0.88, 0.18, 0.88, 0.82], [0.88, 0.82, 0.72, 1],
      [0.72, 1, 0.16, 1], [0.16, 1, 0, 0.82],
      [0, 0.82, 0, 0.18], [0, 0.18, 0.16, 0],
    ],
    X: [[0, 1, 0.88, 0], [0.88, 1, 0, 0]],
  };

  const marqueeText = "DUKEBOX";
  const letterW = 0.078;
  const letterH = 0.135;
  const letterGap = 0.018;
  const textWidth = marqueeText.length * letterW + (marqueeText.length - 1) * letterGap;
  const textStartX = -textWidth / 2;
  const textBaseY = 2.005;

  for (let i = 0; i < marqueeText.length; i++) {
    const character = marqueeText[i];
    const strokes = letterStrokes[character];
    const offsetX = textStartX + i * (letterW + letterGap);
    for (let j = 0; j < strokes.length; j++) {
      const stroke = strokes[j];
      addStroke(
        [
          new THREE.Vector3(
            offsetX + stroke[0] * letterW,
            textBaseY + stroke[1] * letterH,
            frontZ + 0.094
          ),
          new THREE.Vector3(
            offsetX + stroke[2] * letterW,
            textBaseY + stroke[3] * letterH,
            frontZ + 0.094
          ),
        ],
        0.006,
        goldMat,
        marquee_lettering
      );
    }
  }

  const screen_backing = addBox(
    0.96,
    0.73,
    0.045,
    darkPanelMat,
    0,
    1.615,
    frontZ + 0.018
  );

  const screen_graphics = new THREE.Group();
  screen_graphics.position.set(0, 1.615, frontZ + 0.048);
  root.add(screen_graphics);

  const screen_inner_frame = addBox(
    0.79,
    0.515,
    0.018,
    brushedMetalMat,
    0,
    0,
    0,
    screen_graphics
  );
  const screen_left_display = addBox(
    0.275,
    0.46,
    0.012,
    screenDarkMat,
    -0.235,
    0,
    0.015,
    screen_graphics
  );
  const screen_right_display = addBox(
    0.455,
    0.46,
    0.012,
    screenMat,
    0.155,
    0,
    0.015,
    screen_graphics
  );
  const screen_header = addBox(
    0.76,
    0.055,
    0.014,
    darkPanelMat,
    0,
    0.225,
    0.024,
    screen_graphics
  );
  const screen_footer = addBox(
    0.76,
    0.06,
    0.014,
    darkPanelMat,
    0,
    -0.225,
    0.024,
    screen_graphics
  );

  const gridPositions = [];
  for (let i = 0; i <= 8; i++) {
    const x = -0.055 + i * 0.048;
    gridPositions.push(x, -0.19, 0.029, x, 0.19, 0.029);
  }
  for (let i = 0; i <= 7; i++) {
    const y = -0.18 + i * 0.052;
    gridPositions.push(-0.055, y, 0.029, 0.365, y, 0.029);
  }
  const screen_grid = addLineSegments(gridPositions, gridLineMat, screen_graphics);

  const redTracePoints = [];
  const cyanTracePoints = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const x = -0.05 + t * 0.40;
    redTracePoints.push(
      new THREE.Vector3(x, -0.16 + t * 0.30 + Math.sin(t * Math.PI) * 0.025, 0.034)
    );
    cyanTracePoints.push(
      new THREE.Vector3(x, -0.12 - t * 0.065 + Math.sin(t * Math.PI * 2) * 0.018, 0.036)
    );
  }

  const red_traceGeom = new THREE.BufferGeometry().setFromPoints(redTracePoints);
  const red_trace = new THREE.Line(red_traceGeom, redGraphMat);
  screen_graphics.add(red_trace);

  const cyan_traceGeom = new THREE.BufferGeometry().setFromPoints(cyanTracePoints);
  const cyan_trace = new THREE.Line(cyan_traceGeom, cyanGraphMat);
  screen_graphics.add(cyan_trace);

  const greenTracePoints = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    greenTracePoints.push(
      new THREE.Vector3(-0.04 + t * 0.38, 0.075 + Math.sin(t * Math.PI) * 0.055, 0.038)
    );
  }
  const green_traceGeom = new THREE.BufferGeometry().setFromPoints(greenTracePoints);
  const green_trace = new THREE.Line(green_traceGeom, greenGraphMat);
  screen_graphics.add(green_trace);

  const dial_faceGeom = new THREE.CircleGeometry(0.086, 28);
  const dial_face = new THREE.Mesh(dial_faceGeom, screenDarkMat);
  dial_face.position.set(-0.235, -0.035, 0.034);
  screen_graphics.add(dial_face);

  const dial_ringGeom = new THREE.RingGeometry(0.073, 0.084, 28);
  const dial_ring = new THREE.Mesh(dial_ringGeom, brushedMetalMat);
  dial_ring.position.set(-0.235, -0.035, 0.038);
  screen_graphics.add(dial_ring);

  const dialTickPositions = [];
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const x0 = -0.235 + Math.cos(angle) * 0.061;
    const y0 = -0.035 + Math.sin(angle) * 0.061;
    const x1 = -0.235 + Math.cos(angle) * 0.073;
    const y1 = -0.035 + Math.sin(angle) * 0.073;
    dialTickPositions.push(x0, y0, 0.041, x1, y1, 0.041);
  }
  const dial_ticks = addLineSegments(
    dialTickPositions,
    new THREE.LineBasicMaterial({ color: 0xc7c9b8 }),
    screen_graphics
  );

  const dial_needle = addStroke(
    [
      new THREE.Vector3(-0.235, -0.035, 0.044),
      new THREE.Vector3(-0.205, 0.025, 0.044),
    ],
    0.003,
    redPlasticMat,
    screen_graphics
  );

  const screen_red_label = addBox(
    0.12,
    0.025,
    0.012,
    redPlasticMat,
    0.245,
    0.226,
    0.034,
    screen_graphics
  );
  const screen_green_label = addBox(
    0.075,
    0.025,
    0.012,
    creamPlasticMat,
    -0.02,
    0.226,
    0.034,
    screen_graphics
  );

  const footer_buttonsGeom = new THREE.BoxGeometry(0.047, 0.026, 0.014);
  const footer_buttons = new THREE.InstancedMesh(
    footer_buttonsGeom,
    redPlasticMat,
    7
  );
  const footer_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    footer_dummy.position.set(-0.03 + i * 0.064, -0.225, 0.038);
    footer_dummy.rotation.set(0, 0, 0);
    footer_dummy.scale.set(1, 1, 1);
    footer_dummy.updateMatrix();
    footer_buttons.setMatrixAt(i, footer_dummy.matrix);
  }
  footer_buttons.instanceMatrix.needsUpdate = true;
  screen_graphics.add(footer_buttons);

  const screen_glassGeom = new THREE.PlaneGeometry(0.91, 0.66);
  const screen_glass = new THREE.Mesh(screen_glassGeom, glassMat);
  screen_glass.position.set(0, 1.615, frontZ + 0.105);
  screen_glass.rotation.x = -0.055;
  root.add(screen_glass);

  const screen_top_bezel = addBox(
    0.98,
    0.055,
    0.075,
    darkPanelMat,
    0,
    1.965,
    frontZ + 0.062
  );
  const screen_bottom_bezel = addBox(
    0.98,
    0.06,
    0.075,
    darkPanelMat,
    0,
    1.265,
    frontZ + 0.065
  );
  const screen_left_bezel = addBox(
    0.055,
    0.70,
    0.075,
    darkPanelMat,
    -0.485,
    1.615,
    frontZ + 0.064
  );
  const screen_right_bezel = addBox(
    0.055,
    0.70,
    0.075,
    darkPanelMat,
    0.485,
    1.615,
    frontZ + 0.064
  );

  const control_console = new THREE.Group();
  control_console.position.set(0, 1.185, frontZ + 0.075);
  control_console.rotation.x = 0.27;
  root.add(control_console);

  const control_deck = addBox(
    1.00,
    0.31,
    0.045,
    brushedMetalMat,
    0,
    0,
    0,
    control_console
  );
  const left_control_panel = addBox(
    0.34,
    0.225,
    0.018,
    darkPanelMat,
    -0.315,
    0.015,
    0.032,
    control_console
  );
  const center_control_panel = addBox(
    0.37,
    0.225,
    0.018,
    darkPanelMat,
    0,
    0.015,
    0.032,
    control_console
  );
  const right_control_panel = addBox(
    0.25,
    0.225,
    0.018,
    darkPanelMat,
    0.345,
    0.015,
    0.032,
    control_console
  );

  const knobBaseGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.018, 20);
  const knobGeom = new THREE.CylinderGeometry(0.038, 0.045, 0.052, 16);

  const left_knob_base = new THREE.Mesh(knobBaseGeom, silverMat);
  left_knob_base.rotation.x = Math.PI / 2;
  left_knob_base.position.set(-0.385, 0.035, 0.058);
  control_console.add(left_knob_base);

  const left_knob = new THREE.Mesh(knobGeom, blackMat);
  left_knob.rotation.x = Math.PI / 2;
  left_knob.position.set(-0.385, 0.035, 0.082);
  control_console.add(left_knob);

  const center_knob_base = new THREE.Mesh(knobBaseGeom, silverMat);
  center_knob_base.rotation.x = Math.PI / 2;
  center_knob_base.position.set(-0.205, 0.035, 0.058);
  control_console.add(center_knob_base);

  const center_knob = new THREE.Mesh(knobGeom, blackMat);
  center_knob.rotation.x = Math.PI / 2;
  center_knob.position.set(-0.205, 0.035, 0.082);
  control_console.add(center_knob);

  const knobMarkerGeom = new THREE.BoxGeometry(0.008, 0.035, 0.008);
  const left_knob_marker = new THREE.Mesh(knobMarkerGeom, redPlasticMat);
  left_knob_marker.position.set(-0.385, 0.055, 0.112);
  left_knob_marker.rotation.z = -0.45;
  control_console.add(left_knob_marker);

  const center_knob_marker = new THREE.Mesh(knobMarkerGeom, redPlasticMat);
  center_knob_marker.position.set(-0.205, 0.055, 0.112);
  center_knob_marker.rotation.z = 0.35;
  control_console.add(center_knob_marker);

  const red_control_button = addBox(
    0.075,
    0.045,
    0.025,
    redPlasticMat,
    -0.08,
    0.075,
    0.061,
    control_console
  );
  const cream_control_button = addBox(
    0.075,
    0.045,
    0.025,
    creamPlasticMat,
    0.015,
    0.075,
    0.061,
    control_console
  );
  const black_control_button = addBox(
    0.075,
    0.045,
    0.025,
    blackMat,
    0.11,
    0.075,
    0.061,
    control_console
  );

  const faderGeom = new THREE.BoxGeometry(0.035, 0.09, 0.025);
  const center_fader_left = new THREE.Mesh(faderGeom, blackMat);
  center_fader_left.position.set(-0.055, -0.045, 0.065);
  center_fader_left.rotation.z = -0.18;
  control_console.add(center_fader_left);

  const center_fader_middle = new THREE.Mesh(faderGeom, blackMat);
  center_fader_middle.position.set(0.045, -0.035, 0.065);
  center_fader_middle.rotation.z = -0.18;
  control_console.add(center_fader_middle);

  const center_fader_right = new THREE.Mesh(faderGeom, blackMat);
  center_fader_right.position.set(0.145, -0.05, 0.065);
  center_fader_right.rotation.z = -0.18;
  control_console.add(center_fader_right);

  const right_toggle_base = addBox(
    0.13,
    0.075,
    0.018,
    brushedMetalMat,
    0.345,
    0.07,
    0.056,
    control_console
  );
  const right_toggle = addBox(
    0.07,
    0.045,
    0.035,
    blackMat,
    0.345,
    0.075,
    0.082,
    control_console
  );
  const right_red_switch = addBox(
    0.09,
    0.04,
    0.025,
    redPlasticMat,
    0.345,
    -0.065,
    0.066,
    control_console
  );

  const control_labelGeom = new THREE.BoxGeometry(0.052, 0.008, 0.008);
  const control_labels = new THREE.InstancedMesh(
    control_labelGeom,
    silverMat,
    8
  );
  const control_dummy = new THREE.Object3D();
  const controlLabelPositions = [
    [-0.40, 0.115], [-0.22, 0.115], [-0.08, 0.115], [0.08, 0.115],
    [-0.05, -0.115], [0.06, -0.115], [0.18, -0.115], [0.34, -0.115],
  ];
  for (let i = 0; i < controlLabelPositions.length; i++) {
    control_dummy.position.set(
      controlLabelPositions[i][0],
      controlLabelPositions[i][1],
      0.054
    );
    control_dummy.rotation.set(0, 0, 0);
    control_dummy.scale.set(1, 1, 1);
    control_dummy.updateMatrix();
    control_labels.setMatrixAt(i, control_dummy.matrix);
  }
  control_labels.instanceMatrix.needsUpdate = true;
  control_console.add(control_labels);

  const control_front_lip = addBox(
    1.04,
    0.055,
    0.075,
    silverMat,
    0,
    1.075,
    frontZ + 0.155
  );

  const lower_door_frame = addBox(
    0.98,
    0.91,
    0.045,
    woodHighlightMat,
    0,
    0.625,
    frontZ + 0.018
  );
  const lower_door = addBox(
    0.90,
    0.83,
    0.035,
    burgundyMat,
    0,
    0.625,
    frontZ + 0.052
  );

  const upper_air_vent_frame = addBox(
    0.32,
    0.27,
    0.035,
    blackMat,
    0,
    0.755,
    frontZ + 0.082
  );
  const upper_air_vent = addBox(
    0.27,
    0.22,
    0.018,
    grilleMat,
    0,
    0.755,
    frontZ + 0.108
  );
  const ventLinePositions = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 8; col++) {
      const x = -0.112 + col * 0.032;
      const y = 0.825 - row * 0.025;
      ventLinePositions.push(
        x - 0.010, y + 0.006, frontZ + 0.121,
        x + 0.010, y - 0.006, frontZ + 0.121
      );
    }
  }
  const upper_vent_slats = addLineSegments(
    ventLinePositions,
    grilleLineMat
  );

  const payment_slot_frame = addBox(
    0.34,
    0.16,
    0.035,
    blackMat,
    0,
    0.435,
    frontZ + 0.082
  );
  const payment_slot_body = addBox(
    0.30,
    0.12,
    0.025,
    darkPanelMat,
    0,
    0.435,
    frontZ + 0.105
  );
  const left_coin_slot = addBox(
    0.095,
    0.045,
    0.018,
    blackMat,
    -0.095,
    0.445,
    frontZ + 0.126
  );
  const right_bill_slot = addBox(
    0.095,
    0.055,
    0.018,
    blackMat,
    0.095,
    0.44,
    frontZ + 0.126
  );

  const lower_air_vent_frame = addBox(
    0.34,
    0.21,
    0.035,
    blackMat,
    0,
    0.205,
    frontZ + 0.082
  );
  const lower_air_vent = addBox(
    0.29,
    0.16,
    0.018,
    grilleMat,
    0,
    0.205,
    frontZ + 0.108
  );
  const lowerVentLinePositions = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 9; col++) {
      const x = -0.12 + col * 0.03;
      const y = 0.25 - row * 0.023;
      lowerVentLinePositions.push(
        x - 0.009, y + 0.005, frontZ + 0.121,
        x + 0.009, y - 0.005, frontZ + 0.121
      );
    }
  }
  const lower_vent_slats = addLineSegments(
    lowerVentLinePositions,
    grilleLineMat
  );

  const door_lockGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.018, 16);
  const door_lock = new THREE.Mesh(door_lockGeom, silverMat);
  door_lock.rotation.x = Math.PI / 2;
  door_lock.position.set(0, 1.005, frontZ + 0.095);
  root.add(door_lock);

  const door_lock_centerGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.022, 10);
  const door_lock_center = new THREE.Mesh(door_lock_centerGeom, blackMat);
  door_lock_center.rotation.x = Math.PI / 2;
  door_lock_center.position.set(0, 1.005, frontZ + 0.108);
  root.add(door_lock_center);

  const base_plinth = addBox(
    1.08,
    0.13,
    0.70,
    darkPanelMat,
    0,
    0.075,
    0
  );

  const footGeom = new THREE.CylinderGeometry(0.035, 0.04, 0.07, 12);
  const cabinet_feet = new THREE.InstancedMesh(footGeom, blackMat, 4);
  const foot_dummy = new THREE.Object3D();
  const footPositions = [
    [-0.47, 0.005, 0.29],
    [0.47, 0.005, 0.29],
    [-0.47, 0.005, -0.29],
    [0.47, 0.005, -0.29],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    foot_dummy.position.set(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.scale.set(1, 1, 1);
    foot_dummy.updateMatrix();
    cabinet_feet.setMatrixAt(i, foot_dummy.matrix);
  }
  cabinet_feet.instanceMatrix.needsUpdate = true;
  root.add(cabinet_feet);

  const side_screwsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12);
  const side_screws = new THREE.InstancedMesh(side_screwsGeom, silverMat, 6);
  const screw_dummy = new THREE.Object3D();
  const screwPositions = [
    [-0.602, 0.28, 0.22],
    [-0.602, 1.10, 0.22],
    [-0.602, 2.12, 0.22],
    [0.602, 0.28, 0.22],
    [0.602, 1.10, 0.22],
    [0.602, 2.12, 0.22],
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    screw_dummy.position.set(
      screwPositions[i][0],
      screwPositions[i][1],
      screwPositions[i][2]
    );
    screw_dummy.rotation.set(0, 0, Math.PI / 2);
    screw_dummy.scale.set(1, 1, 1);
    screw_dummy.updateMatrix();
    side_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  side_screws.instanceMatrix.needsUpdate = true;
  root.add(side_screws);

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