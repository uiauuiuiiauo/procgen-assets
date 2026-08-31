export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "graphing_calculator";

  const bodyW = 0.78;
  const bodyH = 1.34;
  const bodyD = 0.14;
  const keyZ = 0.098;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x242629,
    metalness: 0.0,
    roughness: 0.8,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.0,
    roughness: 0.8,
  });
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x303338,
    metalness: 0.0,
    roughness: 0.8,
  });
  const screen_frameMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
  });
  const labelMat = new THREE.MeshBasicMaterial({ color: 0xf1f3ef });
  const dark_labelMat = new THREE.MeshBasicMaterial({ color: 0x273238 });

  const red_keyMat = new THREE.MeshStandardMaterial({
    color: 0xd94057,
    metalness: 0.0,
    roughness: 0.3,
  });
  const purple_keyMat = new THREE.MeshStandardMaterial({
    color: 0x6556b8,
    metalness: 0.0,
    roughness: 0.3,
  });
  const green_keyMat = new THREE.MeshStandardMaterial({
    color: 0x789b58,
    metalness: 0.0,
    roughness: 0.3,
  });
  const brown_keyMat = new THREE.MeshStandardMaterial({
    color: 0x806b5b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cyan_keyMat = new THREE.MeshStandardMaterial({
    color: 0x35b4c4,
    metalness: 0.0,
    roughness: 0.3,
  });
  const olive_keyMat = new THREE.MeshStandardMaterial({
    color: 0x77765d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellow_keyMat = new THREE.MeshStandardMaterial({
    color: 0xffbd16,
    metalness: 0.0,
    roughness: 0.3,
  });

  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xd8f1ed,
    metalness: 0.0,
    roughness: 0.2,
    emissive: 0xd8f1ed,
    emissiveIntensity: 1.0,
  });
  const screen_headerMat = new THREE.MeshBasicMaterial({ color: 0x123653 });
  const screen_menuMat = new THREE.MeshBasicMaterial({ color: 0xb8d9dc });
  const screen_axisMat = new THREE.MeshBasicMaterial({ color: 0x567b80 });
  const screen_gridMat = new THREE.MeshBasicMaterial({ color: 0x9bc9c7 });
  const screen_blueMat = new THREE.MeshBasicMaterial({ color: 0x1455a4 });
  const screen_redMat = new THREE.MeshBasicMaterial({ color: 0xb51f43 });
  const screen_darkMat = new THREE.MeshBasicMaterial({ color: 0x234655 });
  const screen_greenMat = new THREE.MeshBasicMaterial({ color: 0x4d9a75 });
  const screen_yellowMat = new THREE.MeshBasicMaterial({ color: 0xd5a72a });

  const top_displayMat = new THREE.MeshStandardMaterial({
    color: 0x17251f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const top_display_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x8da596,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
  });
  const status_ledMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const stylusMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const stylus_detailMat = new THREE.MeshStandardMaterial({
    color: 0x34373a,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedRectGeometry(width, height, depth, radius, bevel) {
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

  function addBox(parent, width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material
    );
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-0.29, -bodyH / 2);
  bodyShape.lineTo(0.29, -bodyH / 2);
  bodyShape.quadraticCurveTo(0.38, -bodyH / 2, 0.39, -0.59);
  bodyShape.lineTo(0.39, -0.13);
  bodyShape.quadraticCurveTo(0.39, -0.07, 0.365, -0.01);
  bodyShape.lineTo(0.335, 0.055);
  bodyShape.quadraticCurveTo(0.325, 0.08, 0.34, 0.12);
  bodyShape.lineTo(0.375, 0.49);
  bodyShape.quadraticCurveTo(0.39, 0.63, 0.27, bodyH / 2);
  bodyShape.lineTo(-0.27, bodyH / 2);
  bodyShape.quadraticCurveTo(-0.39, 0.63, -0.375, 0.49);
  bodyShape.lineTo(-0.34, 0.12);
  bodyShape.quadraticCurveTo(-0.325, 0.08, -0.335, 0.055);
  bodyShape.lineTo(-0.365, -0.01);
  bodyShape.quadraticCurveTo(-0.39, -0.07, -0.39, -0.13);
  bodyShape.lineTo(-0.39, -0.59);
  bodyShape.quadraticCurveTo(-0.38, -bodyH / 2, -0.29, -bodyH / 2);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: bodyD,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 4,
  });
  bodyGeom.translate(0, 0, -bodyD / 2);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const lower_case_seamGeom = new THREE.BoxGeometry(0.68, 0.009, 0.008);
  const lower_case_seam = new THREE.Mesh(lower_case_seamGeom, edgeMat);
  lower_case_seam.name = "lower_case_seam";
  lower_case_seam.position.set(0, -0.615, 0.091);
  root.add(lower_case_seam);

  const bottom_footGeom = new THREE.BoxGeometry(0.46, 0.018, 0.09);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, edgeMat);
  bottom_foot.name = "bottom_foot";
  bottom_foot.position.set(0, -0.688, -0.015);
  root.add(bottom_foot);

  const top_display_frameGeom = roundedRectGeometry(
    0.54,
    0.145,
    0.018,
    0.025,
    0.004
  );
  const top_display_frame = new THREE.Mesh(
    top_display_frameGeom,
    screen_frameMat
  );
  top_display_frame.name = "top_display_frame";
  top_display_frame.position.set(-0.055, 0.515, 0.093);
  root.add(top_display_frame);

  const top_displayGeom = roundedRectGeometry(
    0.495,
    0.108,
    0.008,
    0.018,
    0.002
  );
  const top_display = new THREE.Mesh(top_displayGeom, top_displayMat);
  top_display.name = "top_display";
  top_display.position.set(-0.055, 0.515, 0.108);
  root.add(top_display);

  const top_display_glassGeom = roundedRectGeometry(
    0.488,
    0.101,
    0.003,
    0.016,
    0.001
  );
  const top_display_glass = new THREE.Mesh(
    top_display_glassGeom,
    top_display_glassMat
  );
  top_display_glass.name = "top_display_glass";
  top_display_glass.position.set(-0.055, 0.515, 0.115);
  root.add(top_display_glass);

  const status_ledGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.008,
    16
  );
  const status_led = new THREE.Mesh(status_ledGeom, status_ledMat);
  status_led.name = "status_led";
  status_led.rotation.x = Math.PI / 2;
  status_led.position.set(-0.19, 0.416, 0.097);
  root.add(status_led);

  const speaker_slitsGeom = new THREE.BoxGeometry(0.14, 0.012, 0.007);
  const speaker_slits = new THREE.InstancedMesh(
    speaker_slitsGeom,
    edgeMat,
    3
  );
  speaker_slits.name = "speaker_slits";
  const speaker_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    speaker_dummy.position.set(0.255, 0.535 - i * 0.038, 0.096);
    speaker_dummy.rotation.set(0, 0, 0);
    speaker_dummy.scale.set(1, 1, 1);
    speaker_dummy.updateMatrix();
    speaker_slits.setMatrixAt(i, speaker_dummy.matrix);
  }
  speaker_slits.instanceMatrix.needsUpdate = true;
  root.add(speaker_slits);

  const screen_frameGeom = roundedRectGeometry(
    0.64,
    0.405,
    0.022,
    0.025,
    0.005
  );
  const screen_frame = new THREE.Mesh(screen_frameGeom, screen_frameMat);
  screen_frame.name = "screen_frame";
  screen_frame.position.set(0, 0.255, 0.092);
  root.add(screen_frame);

  const screenGeom = roundedRectGeometry(
    0.58,
    0.345,
    0.008,
    0.015,
    0.002
  );
  const screen = new THREE.Mesh(screenGeom, screenMat);
  screen.name = "screen";
  screen.position.set(0, 0.255, 0.108);
  root.add(screen);

  const screen_headerGeom = new THREE.BoxGeometry(0.565, 0.055, 0.003);
  const screen_header = new THREE.Mesh(screen_headerGeom, screen_headerMat);
  screen_header.name = "screen_header";
  screen_header.position.set(0, 0.4075, 0.115);
  root.add(screen_header);

  const screen_menu_barGeom = new THREE.BoxGeometry(0.565, 0.047, 0.003);
  const screen_menu_bar = new THREE.Mesh(screen_menu_barGeom, screen_menuMat);
  screen_menu_bar.name = "screen_menu_bar";
  screen_menu_bar.position.set(0, 0.3565, 0.115);
  root.add(screen_menu_bar);

  const screen_header_marksGeom = new THREE.BoxGeometry(
    0.022,
    0.004,
    0.002
  );
  const screen_header_marks = new THREE.InstancedMesh(
    screen_header_marksGeom,
    labelMat,
    8
  );
  screen_header_marks.name = "screen_header_marks";
  const screen_mark_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    screen_mark_dummy.position.set(-0.235 + i * 0.067, 0.407, 0.118);
    screen_mark_dummy.rotation.set(0, 0, 0);
    screen_mark_dummy.scale.set(0.65 + (i % 3) * 0.18, 1, 1);
    screen_mark_dummy.updateMatrix();
    screen_header_marks.setMatrixAt(i, screen_mark_dummy.matrix);
  }
  screen_header_marks.instanceMatrix.needsUpdate = true;
  root.add(screen_header_marks);

  const graph_grid = new THREE.Group();
  graph_grid.name = "graph_grid";
  root.add(graph_grid);

  const screen_vertical_gridGeom = new THREE.BoxGeometry(
    0.0015,
    0.205,
    0.002
  );
  const screen_vertical_grid = new THREE.InstancedMesh(
    screen_vertical_gridGeom,
    screen_gridMat,
    5
  );
  screen_vertical_grid.name = "screen_vertical_grid";
  const grid_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    grid_dummy.position.set(-0.24 + i * 0.12, 0.215, 0.116);
    grid_dummy.rotation.set(0, 0, 0);
    grid_dummy.scale.set(1, 1, 1);
    grid_dummy.updateMatrix();
    screen_vertical_grid.setMatrixAt(i, grid_dummy.matrix);
  }
  screen_vertical_grid.instanceMatrix.needsUpdate = true;
  graph_grid.add(screen_vertical_grid);

  const screen_horizontal_gridGeom = new THREE.BoxGeometry(
    0.50,
    0.0015,
    0.002
  );
  const screen_horizontal_grid = new THREE.InstancedMesh(
    screen_horizontal_gridGeom,
    screen_gridMat,
    4
  );
  screen_horizontal_grid.name = "screen_horizontal_grid";
  for (let i = 0; i < 4; i++) {
    grid_dummy.position.set(0, 0.12 + i * 0.063, 0.116);
    grid_dummy.rotation.set(0, 0, 0);
    grid_dummy.scale.set(1, 1, 1);
    grid_dummy.updateMatrix();
    screen_horizontal_grid.setMatrixAt(i, grid_dummy.matrix);
  }
  screen_horizontal_grid.instanceMatrix.needsUpdate = true;
  graph_grid.add(screen_horizontal_grid);

  const screen_axes = new THREE.Group();
  screen_axes.name = "screen_axes";
  addBox(screen_axes, 0.50, 0.003, 0.002, screen_axisMat, 0, 0.112, 0.119);
  addBox(screen_axes, 0.003, 0.205, 0.002, screen_axisMat, -0.245, 0.215, 0.119);
  addBox(screen_axes, 0.255, 0.003, 0.002, screen_axisMat, 0.145, 0.125, 0.119);
  addBox(screen_axes, 0.003, 0.16, 0.002, screen_axisMat, 0.015, 0.205, 0.119);
  root.add(screen_axes);

  const red_graph_points = [
    new THREE.Vector3(-0.225, 0.305, 0.123),
    new THREE.Vector3(-0.205, 0.225, 0.123),
    new THREE.Vector3(-0.18, 0.155, 0.123),
    new THREE.Vector3(-0.145, 0.19, 0.123),
    new THREE.Vector3(-0.12, 0.295, 0.123),
    new THREE.Vector3(-0.095, 0.235, 0.123),
    new THREE.Vector3(-0.065, 0.17, 0.123),
    new THREE.Vector3(-0.025, 0.14, 0.123),
  ];
  const red_graphGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(red_graph_points, false, "centripetal"),
    32,
    0.0024,
    6,
    false
  );
  const red_graph = new THREE.Mesh(red_graphGeom, screen_redMat);
  red_graph.name = "red_graph";
  root.add(red_graph);

  const blue_graph_points = [
    new THREE.Vector3(-0.235, 0.17, 0.122),
    new THREE.Vector3(-0.19, 0.145, 0.122),
    new THREE.Vector3(-0.14, 0.135, 0.122),
    new THREE.Vector3(-0.08, 0.15, 0.122),
    new THREE.Vector3(-0.025, 0.19, 0.122),
    new THREE.Vector3(0.035, 0.255, 0.122),
    new THREE.Vector3(0.075, 0.17, 0.122),
    new THREE.Vector3(0.12, 0.125, 0.122),
    new THREE.Vector3(0.17, 0.19, 0.122),
    new THREE.Vector3(0.225, 0.235, 0.122),
  ];
  const blue_graphGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(blue_graph_points, false, "centripetal"),
    40,
    0.0024,
    6,
    false
  );
  const blue_graph = new THREE.Mesh(blue_graphGeom, screen_blueMat);
  blue_graph.name = "blue_graph";
  root.add(blue_graph);

  const graph_markersGeom = new THREE.BoxGeometry(0.009, 0.009, 0.002);
  const graph_markers = new THREE.InstancedMesh(
    graph_markersGeom,
    screen_redMat,
    red_graph_points.length
  );
  graph_markers.name = "graph_markers";
  const marker_dummy = new THREE.Object3D();
  for (let i = 0; i < red_graph_points.length; i++) {
    marker_dummy.position.copy(red_graph_points[i]);
    marker_dummy.position.z = 0.125;
    marker_dummy.rotation.set(0, 0, Math.PI / 4);
    marker_dummy.scale.set(1, 1, 1);
    marker_dummy.updateMatrix();
    graph_markers.setMatrixAt(i, marker_dummy.matrix);
  }
  graph_markers.instanceMatrix.needsUpdate = true;
  root.add(graph_markers);

  const screen_equation_marksGeom = new THREE.BoxGeometry(
    0.025,
    0.004,
    0.002
  );
  const screen_equation_marks = new THREE.InstancedMesh(
    screen_equation_marksGeom,
    screen_darkMat,
    12
  );
  screen_equation_marks.name = "screen_equation_marks";
  const equation_positions = [
    [-0.03, 0.325],
    [0.01, 0.325],
    [0.055, 0.325],
    [0.10, 0.325],
    [0.145, 0.325],
    [0.19, 0.325],
    [-0.19, 0.09],
    [-0.15, 0.09],
    [-0.11, 0.09],
    [0.08, 0.09],
    [0.13, 0.09],
    [0.18, 0.09],
  ];
  for (let i = 0; i < equation_positions.length; i++) {
    marker_dummy.position.set(
      equation_positions[i][0],
      equation_positions[i][1],
      0.12
    );
    marker_dummy.rotation.set(0, 0, 0);
    marker_dummy.scale.set(0.65 + (i % 4) * 0.15, 1, 1);
    marker_dummy.updateMatrix();
    screen_equation_marks.setMatrixAt(i, marker_dummy.matrix);
  }
  screen_equation_marks.instanceMatrix.needsUpdate = true;
  root.add(screen_equation_marks);

  const screen_color_icons = new THREE.Group();
  screen_color_icons.name = "screen_color_icons";
  addBox(screen_color_icons, 0.018, 0.014, 0.002, screen_redMat, 0.02, 0.325, 0.121);
  addBox(screen_color_icons, 0.018, 0.014, 0.002, screen_greenMat, -0.015, 0.325, 0.121);
  addBox(screen_color_icons, 0.018, 0.014, 0.002, screen_yellowMat, -0.05, 0.325, 0.121);
  root.add(screen_color_icons);

  const keyGeom = roundedRectGeometry(
    0.105,
    0.072,
    0.026,
    0.018,
    0.004
  );
  const small_keyGeom = roundedRectGeometry(
    0.078,
    0.047,
    0.024,
    0.014,
    0.004
  );
  const wide_keyGeom = roundedRectGeometry(
    0.245,
    0.075,
    0.026,
    0.02,
    0.004
  );
  const round_keyGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.026,
    24
  );

  function placeKey(mesh, name, x, y, z) {
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  const top_function_left = placeKey(
    new THREE.Mesh(small_keyGeom, keyMat),
    "top_function_left",
    -0.245,
    -0.012,
    keyZ
  );
  const top_function_center = placeKey(
    new THREE.Mesh(small_keyGeom, keyMat),
    "top_function_center",
    -0.135,
    -0.012,
    keyZ
  );
  const top_function_right = placeKey(
    new THREE.Mesh(small_keyGeom, keyMat),
    "top_function_right",
    0.105,
    -0.012,
    keyZ
  );
  const top_shift_key = placeKey(
    new THREE.Mesh(small_keyGeom, keyMat),
    "top_shift_key",
    0.225,
    -0.012,
    keyZ
  );

  const navigation_pad = placeKey(
    new THREE.Mesh(round_keyGeom, keyMat),
    "navigation_pad",
    -0.025,
    -0.075,
    keyZ
  );
  navigation_pad.rotation.x = Math.PI / 2;

  const yellow_confirm_key = placeKey(
    new THREE.Mesh(round_keyGeom, yellow_keyMat),
    "yellow_confirm_key",
    0.255,
    -0.075,
    keyZ
  );
  yellow_confirm_key.rotation.x = Math.PI / 2;
  yellow_confirm_key.scale.set(1.12, 1.12, 1.12);

  const keypad_row_1_red_key = placeKey(
    new THREE.Mesh(keyGeom, red_keyMat),
    "keypad_row_1_red_key",
    -0.255,
    -0.17,
    keyZ
  );
  const keypad_row_1_key_6 = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_1_key_6",
    -0.085,
    -0.17,
    keyZ
  );
  const keypad_row_1_key_5 = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_1_key_5",
    0.085,
    -0.17,
    keyZ
  );
  const keypad_row_1_key_4 = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_1_key_4",
    0.255,
    -0.17,
    keyZ
  );

  const keypad_row_2_purple_key = placeKey(
    new THREE.Mesh(keyGeom, purple_keyMat),
    "keypad_row_2_purple_key",
    -0.255,
    -0.282,
    keyZ
  );
  const keypad_row_2_key_2 = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_2_key_2",
    -0.085,
    -0.282,
    keyZ
  );
  const keypad_row_2_key_c = placeKey(
    new THREE.Mesh(keyGeom, olive_keyMat),
    "keypad_row_2_key_c",
    0.085,
    -0.282,
    keyZ
  );
  const keypad_row_2_key_x = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_2_key_x",
    0.255,
    -0.282,
    keyZ
  );

  const keypad_row_3_green_key = placeKey(
    new THREE.Mesh(keyGeom, green_keyMat),
    "keypad_row_3_green_key",
    -0.255,
    -0.394,
    keyZ
  );
  const keypad_row_3_key_0 = placeKey(
    new THREE.Mesh(keyGeom, brown_keyMat),
    "keypad_row_3_key_0",
    -0.085,
    -0.394,
    keyZ
  );
  const keypad_row_3_key_e = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_3_key_e",
    0.085,
    -0.394,
    keyZ
  );
  const keypad_row_3_key_equals = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_3_key_equals",
    0.255,
    -0.394,
    keyZ
  );

  const keypad_row_4_cyan_key = placeKey(
    new THREE.Mesh(keyGeom, cyan_keyMat),
    "keypad_row_4_cyan_key",
    -0.255,
    -0.506,
    keyZ
  );
  const keypad_row_4_navigation_key = placeKey(
    new THREE.Mesh(wide_keyGeom, keyMat),
    "keypad_row_4_navigation_key",
    -0.045,
    -0.506,
    keyZ
  );
  const keypad_row_4_key_multiply = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_4_key_multiply",
    0.16,
    -0.506,
    keyZ
  );
  const keypad_row_4_key_on = placeKey(
    new THREE.Mesh(keyGeom, keyMat),
    "keypad_row_4_key_on",
    0.285,
    -0.506,
    keyZ
  );

  const red_action_key = placeKey(
    new THREE.Mesh(keyGeom, red_keyMat),
    "red_action_key",
    0.245,
    -0.603,
    keyZ
  );

  const key_label_transforms = [];
  const keyColor = new THREE.Color(0xf1f3ef);
  const keyDarkColor = new THREE.Color(0x273238);

  function addKeyStroke(x, y, length, thickness, angle, z, color) {
    key_label_transforms.push({
      x,
      y,
      z: z === undefined ? 0.119 : z,
      length,
      thickness,
      angle,
      color: color === undefined ? keyColor : color,
    });
  }

  const segmentMap = {
    "0": "abcdef",
    "1": "bc",
    "2": "abdeg",
    "3": "abcdg",
    "4": "bcfg",
    "5": "acdfg",
    "6": "acdefg",
    "7": "abc",
    "8": "abcdefg",
    "9": "abcdfg",
  };

  function addSevenSegment(x, y, digit) {
    const active = segmentMap[digit];
    const halfH = 0.019;
    const halfW = 0.011;
    const horizontal = 0.022;
    const vertical = 0.018;
    const thickness = 0.0035;
    if (active.indexOf("a") >= 0) {
      addKeyStroke(x, y + halfH, horizontal, thickness, 0);
    }
    if (active.indexOf("g") >= 0) {
      addKeyStroke(x, y, horizontal, thickness, 0);
    }
    if (active.indexOf("d") >= 0) {
      addKeyStroke(x, y - halfH, horizontal, thickness, 0);
    }
    if (active.indexOf("b") >= 0) {
      addKeyStroke(x + halfW, y + halfH / 2, vertical, thickness, Math.PI / 2);
    }
    if (active.indexOf("c") >= 0) {
      addKeyStroke(x + halfW, y - halfH / 2, vertical, thickness, Math.PI / 2);
    }
    if (active.indexOf("f") >= 0) {
      addKeyStroke(x - halfW, y + halfH / 2, vertical, thickness, Math.PI / 2);
    }
    if (active.indexOf("e") >= 0) {
      addKeyStroke(x - halfW, y - halfH / 2, vertical, thickness, Math.PI / 2);
    }
  }

  function addSymbol(x, y, symbol) {
    if (segmentMap[symbol]) {
      addSevenSegment(x, y, symbol);
      return;
    }
    if (symbol === "+") {
      addKeyStroke(x, y, 0.032, 0.004, 0);
      addKeyStroke(x, y, 0.032, 0.004, Math.PI / 2);
    } else if (symbol === "-") {
      addKeyStroke(x, y, 0.034, 0.004, 0);
    } else if (symbol === "=") {
      addKeyStroke(x, y + 0.007, 0.034, 0.004, 0);
      addKeyStroke(x, y - 0.007, 0.034, 0.004, 0);
    } else if (symbol === "x") {
      addKeyStroke(x, y, 0.038, 0.004, Math.PI / 4);
      addKeyStroke(x, y, 0.038, 0.004, -Math.PI / 4);
    } else if (symbol === "?") {
      addKeyStroke(x - 0.004, y + 0.009, 0.024, 0.004, Math.PI / 4);
      addKeyStroke(x + 0.003, y + 0.006, 0.022, 0.004, -Math.PI / 4);
      addKeyStroke(x, y - 0.015, 0.006, 0.006, 0);
    } else if (symbol === "C") {
      addKeyStroke(x + 0.002, y + 0.018, 0.026, 0.004, 0);
      addKeyStroke(x + 0.002, y - 0.018, 0.026, 0.004, 0);
      addKeyStroke(x - 0.011, y, 0.036, 0.004, Math.PI / 2);
    } else if (symbol === "on") {
      const ringGeom = new THREE.TorusGeometry(0.014, 0.0025, 6, 18);
      const ring = new THREE.Mesh(ringGeom, labelMat);
      ring.position.set(x, y, 0.119);
      root.add(ring);
      addKeyStroke(x, y + 0.012, 0.022, 0.004, Math.PI / 2);
    } else if (symbol === "play") {
      addKeyStroke(x - 0.006, y, 0.026, 0.004, Math.PI / 3);
      addKeyStroke(x + 0.006, y, 0.026, 0.004, -Math.PI / 3);
      addKeyStroke(x, y, 0.005, 0.005, 0);
    } else if (symbol === "back") {
      addKeyStroke(x + 0.004, y, 0.034, 0.004, Math.PI / 2);
      addKeyStroke(x - 0.006, y + 0.009, 0.024, 0.004, -Math.PI / 4);
      addKeyStroke(x - 0.006, y - 0.009, 0.024, 0.004, Math.PI / 4);
    }
  }

  addSymbol(-0.255, -0.17, "3");
  addSymbol(-0.085, -0.17, "6");
  addSymbol(0.085, -0.17, "5");
  addSymbol(0.255, -0.17, "4");
  addSymbol(-0.255, -0.282, "7");
  addSymbol(-0.085, -0.282, "2");
  addSymbol(0.085, -0.282, "C");
  addSymbol(0.255, -0.282, "x");
  addSymbol(-0.255, -0.394, "1");
  addSymbol(-0.085, -0.394, "0");
  addSymbol(0.085, -0.394, "E");
  addSymbol(0.255, -0.394, "=");
  addSymbol(-0.255, -0.506, "?");
  addSymbol(-0.045, -0.506, "play");
  addSymbol(0.16, -0.506, "x");
  addSymbol(0.285, -0.506, "on");
  addSymbol(0.245, -0.603, "back");

  addKeyStroke(-0.245, -0.012, 0.038, 0.004, Math.PI / 2);
  addKeyStroke(-0.235, -0.004, 0.022, 0.004, 0);
  addKeyStroke(-0.145, -0.012, 0.028, 0.004, 0);
  addKeyStroke(-0.126, -0.004, 0.018, 0.004, Math.PI / 2);
  addKeyStroke(0.095, -0.012, 0.03, 0.004, 0);
  addKeyStroke(0.116, -0.012, 0.03, 0.004, Math.PI / 2);
  addKeyStroke(0.225, -0.012, 0.036, 0.004, 0);

  addKeyStroke(-0.025, -0.057, 0.026, 0.004, Math.PI / 4);
  addKeyStroke(-0.025, -0.057, 0.026, 0.004, -Math.PI / 4);
  addKeyStroke(0.255, -0.057, 0.024, 0.004, Math.PI / 4);
  addKeyStroke(0.255, -0.057, 0.024, 0.004, -Math.PI / 4);

  addKeyStroke(-0.245, -0.638, 0.035, 0.003, 0, 0.094, keyDarkColor);
  addKeyStroke(-0.13, -0.638, 0.028, 0.003, 0, 0.094, keyDarkColor);
  addKeyStroke(0.10, -0.638, 0.035, 0.003, 0, 0.094, keyDarkColor);
  addKeyStroke(0.235, -0.638, 0.03, 0.003, 0, 0.094, keyDarkColor);

  const key_labelsGeom = new THREE.BoxGeometry(1, 1, 1);
  const key_labels = new THREE.InstancedMesh(
    key_labelsGeom,
    labelMat,
    key_label_transforms.length
  );
  key_labels.name = "key_labels";
  const label_dummy = new THREE.Object3D();
  for (let i = 0; i < key_label_transforms.length; i++) {
    const transform = key_label_transforms[i];
    label_dummy.position.set(transform.x, transform.y, transform.z);
    label_dummy.rotation.set(0, 0, transform.angle);
    label_dummy.scale.set(transform.length, transform.thickness, 0.003);
    label_dummy.updateMatrix();
    key_labels.setMatrixAt(i, label_dummy.matrix);
    key_labels.setColorAt(i, new THREE.Color(transform.color));
  }
  key_labels.instanceMatrix.needsUpdate = true;
  if (key_labels.instanceColor) {
    key_labels.instanceColor.needsUpdate = true;
  }
  root.add(key_labels);

  const stylus_group = new THREE.Group();
  stylus_group.name = "stylus_group";
  stylus_group.position.set(0.425, -0.12, -0.035);
  stylus_group.rotation.z = 0.14;
  root.add(stylus_group);

  const stylus_bodyGeom = new THREE.CylinderGeometry(
    0.032,
    0.034,
    0.42,
    20
  );
  const stylus_body = new THREE.Mesh(stylus_bodyGeom, stylusMat);
  stylus_body.name = "stylus_body";
  stylus_group.add(stylus_body);

  const stylus_tipGeom = new THREE.ConeGeometry(0.032, 0.11, 20);
  const stylus_tip = new THREE.Mesh(stylus_tipGeom, stylusMat);
  stylus_tip.name = "stylus_tip";
  stylus_tip.position.y = 0.265;
  stylus_group.add(stylus_tip);

  const stylus_end_capGeom = new THREE.SphereGeometry(0.034, 20, 10);
  const stylus_end_cap = new THREE.Mesh(stylus_end_capGeom, stylusMat);
  stylus_end_cap.name = "stylus_end_cap";
  stylus_end_cap.position.y = -0.215;
  stylus_end_cap.scale.set(1, 0.75, 1);
  stylus_group.add(stylus_end_cap);

  const stylus_ringsGeom = new THREE.TorusGeometry(0.033, 0.003, 8, 20);
  const stylus_rings = new THREE.InstancedMesh(
    stylus_ringsGeom,
    stylus_detailMat,
    3
  );
  stylus_rings.name = "stylus_rings";
  const stylus_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    stylus_dummy.position.set(0, -0.08 + i * 0.055, 0);
    stylus_dummy.rotation.set(Math.PI / 2, 0, 0);
    stylus_dummy.scale.set(1, 1, 1);
    stylus_dummy.updateMatrix();
    stylus_rings.setMatrixAt(i, stylus_dummy.matrix);
  }
  stylus_rings.instanceMatrix.needsUpdate = true;
  stylus_group.add(stylus_rings);

  const stylus_clipGeom = new THREE.BoxGeometry(0.012, 0.24, 0.012);
  const stylus_clip = new THREE.Mesh(stylus_clipGeom, stylus_detailMat);
  stylus_clip.name = "stylus_clip";
  stylus_clip.position.set(0.034, -0.055, 0);
  stylus_group.add(stylus_clip);

  const stylus_dockGeom = new THREE.TorusGeometry(0.038, 0.008, 8, 24);
  const stylus_dock = new THREE.Mesh(stylus_dockGeom, edgeMat);
  stylus_dock.name = "stylus_dock";
  stylus_dock.position.set(0.397, -0.12, 0.075);
  stylus_dock.rotation.y = Math.PI / 2;
  root.add(stylus_dock);

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