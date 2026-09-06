export default function generate(THREE) {
  const root = new THREE.Group();

  const cabinetW = 1.20;
  const cabinetD = 1.02;
  const cabinetH = 0.72;
  const cabinetTopY = 0.76;

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0x4b4d4f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x3a3c3e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const whitePlasticMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grayButtonMat = new THREE.MeshStandardMaterial({
    color: 0xaeb3b4,
    metalness: 0.0,
    roughness: 0.8,
  });
  const redButtonMat = new THREE.MeshStandardMaterial({
    color: 0xd94843,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenButtonMat = new THREE.MeshStandardMaterial({
    color: 0x43c96b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf1d51b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.25,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x14233b,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x101d31,
    emissiveIntensity: 1.0,
  });
  const screenBlueMat = new THREE.MeshStandardMaterial({
    color: 0x49688f,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x263d5c,
    emissiveIntensity: 1.0,
  });
  const screenIconMat = new THREE.MeshStandardMaterial({
    color: 0x67b9e8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x367aa8,
    emissiveIntensity: 1.0,
  });
  const screenGreenMat = new THREE.MeshStandardMaterial({
    color: 0x57c96c,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x2f8b49,
    emissiveIntensity: 1.0,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xd8d9d6,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function roundedPanelGeometry(width, height, depth, radius, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
        curveSegments: 8,
      }
    );
  }

  const cabinetGeom = roundedPanelGeometry(
    cabinetW,
    cabinetH,
    cabinetD,
    0.045,
    0.012
  );
  const cabinet_body = new THREE.Mesh(cabinetGeom, cabinetMat);
  cabinet_body.position.set(0, 0.40, -cabinetD / 2);
  root.add(cabinet_body);

  const top_coverGeom = new THREE.BoxGeometry(1.16, 0.05, 0.98);
  const top_cover = new THREE.Mesh(top_coverGeom, cabinetMat);
  top_cover.position.set(0, 0.775, -0.01);
  root.add(top_cover);

  const front_service_panelGeom = roundedPanelGeometry(
    1.02,
    0.43,
    0.018,
    0.018,
    0.003
  );
  const front_service_panel = new THREE.Mesh(front_service_panelGeom, panelMat);
  front_service_panel.position.set(0, 0.36, 0.523);
  root.add(front_service_panel);

  const front_panel_top_seamGeom = new THREE.BoxGeometry(1.03, 0.008, 0.008);
  const front_panel_top_seam = new THREE.Mesh(front_panel_top_seamGeom, darkMat);
  front_panel_top_seam.position.set(0, 0.58, 0.548);
  root.add(front_panel_top_seam);

  const front_panel_left_seamGeom = new THREE.BoxGeometry(0.008, 0.42, 0.008);
  const front_panel_left_seam = new THREE.Mesh(front_panel_left_seamGeom, darkMat);
  front_panel_left_seam.position.set(-0.515, 0.36, 0.548);
  root.add(front_panel_left_seam);

  const front_panel_right_seam = new THREE.Mesh(
    front_panel_left_seamGeom,
    darkMat
  );
  front_panel_right_seam.position.set(0.515, 0.36, 0.548);
  root.add(front_panel_right_seam);

  const service_discGeom = new THREE.CylinderGeometry(0.165, 0.165, 0.018, 40);
  const service_disc = new THREE.Mesh(service_discGeom, panelMat);
  service_disc.rotation.x = Math.PI / 2;
  service_disc.position.set(0.25, 0.285, 0.557);
  root.add(service_disc);

  const service_disc_rimGeom = new THREE.TorusGeometry(0.165, 0.006, 8, 40);
  const service_disc_rim = new THREE.Mesh(service_disc_rimGeom, darkMat);
  service_disc_rim.position.set(0.25, 0.285, 0.569);
  root.add(service_disc_rim);

  const service_disc_screwsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.008,
    12
  );
  const service_disc_screws = new THREE.InstancedMesh(
    service_disc_screwsGeom,
    silverMat,
    3
  );
  const serviceScrewPositions = [
    [-0.105, 0.145],
    [0.125, 0.125],
    [0.145, -0.125],
  ];
  const serviceScrewDummy = new THREE.Object3D();
  for (let i = 0; i < serviceScrewPositions.length; i++) {
    serviceScrewDummy.position.set(
      0.25 + serviceScrewPositions[i][0],
      0.285 + serviceScrewPositions[i][1],
      0.574
    );
    serviceScrewDummy.rotation.set(Math.PI / 2, 0, 0);
    serviceScrewDummy.updateMatrix();
    service_disc_screws.setMatrixAt(i, serviceScrewDummy.matrix);
  }
  root.add(service_disc_screws);

  const lower_pull_frameGeom = roundedPanelGeometry(
    0.29,
    0.115,
    0.024,
    0.012,
    0.002
  );
  const lower_pull_frame = new THREE.Mesh(lower_pull_frameGeom, darkMat);
  lower_pull_frame.position.set(-0.12, 0.105, 0.548);
  root.add(lower_pull_frame);

  const lower_pull_recessGeom = new THREE.BoxGeometry(0.235, 0.065, 0.018);
  const lower_pull_recess = new THREE.Mesh(lower_pull_recessGeom, blackMetalMat);
  lower_pull_recess.position.set(-0.12, 0.108, 0.573);
  root.add(lower_pull_recess);

  const lower_pull_barGeom = new THREE.BoxGeometry(0.205, 0.018, 0.022);
  const lower_pull_bar = new THREE.Mesh(lower_pull_barGeom, silverMat);
  lower_pull_bar.position.set(-0.12, 0.108, 0.586);
  root.add(lower_pull_bar);

  const front_toggle_frameGeom = new THREE.BoxGeometry(0.075, 0.09, 0.025);
  const front_toggle_frame = new THREE.Mesh(front_toggle_frameGeom, darkMat);
  front_toggle_frame.position.set(-0.12, 0.285, 0.561);
  root.add(front_toggle_frame);

  const front_toggleGeom = new THREE.BoxGeometry(0.035, 0.045, 0.025);
  const front_toggle = new THREE.Mesh(front_toggleGeom, blackMetalMat);
  front_toggle.position.set(-0.12, 0.285, 0.582);
  front_toggle.rotation.x = -0.18;
  root.add(front_toggle);

  const brandGlyphs = {
    B: ["110", "101", "110", "101", "110"],
    E: ["111", "100", "110", "100", "111"],
    N: ["101", "111", "111", "111", "101"],
    A: ["010", "101", "111", "101", "101"],
    Z: ["111", "001", "010", "100", "111"],
  };
  const brandWord = "BENAZEN";
  let brandPixelCount = 0;
  for (let g = 0; g < brandWord.length; g++) {
    const rows = brandGlyphs[brandWord[g]];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        if (rows[r][c] === "1") brandPixelCount++;
      }
    }
  }

  const brand_markGeom = new THREE.BoxGeometry(0.009, 0.009, 0.004);
  const brand_mark = new THREE.InstancedMesh(
    brand_markGeom,
    labelMat,
    brandPixelCount
  );
  const brandDummy = new THREE.Object3D();
  const brandPitch = 0.011;
  const brandStartX = -0.45;
  const brandStartY = 0.505;
  let brandIndex = 0;
  for (let g = 0; g < brandWord.length; g++) {
    const rows = brandGlyphs[brandWord[g]];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < rows[r].length; c++) {
        if (rows[r][c] === "1") {
          brandDummy.position.set(
            brandStartX + (g * 4 + c + 0.5) * brandPitch,
            brandStartY - (r + 0.5) * brandPitch,
            0.555
          );
          brandDummy.rotation.set(0, 0, 0);
          brandDummy.updateMatrix();
          brand_mark.setMatrixAt(brandIndex++, brandDummy.matrix);
        }
      }
    }
  }
  root.add(brand_mark);

  const information_labelGeom = new THREE.BoxGeometry(0.18, 0.075, 0.005);
  const information_label = new THREE.Mesh(information_labelGeom, labelMat);
  information_label.position.set(-0.36, 0.315, 0.555);
  root.add(information_label);

  const label_linesGeom = new THREE.BoxGeometry(0.12, 0.004, 0.003);
  const label_lines = new THREE.InstancedMesh(label_linesGeom, darkMat, 5);
  const labelDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    labelDummy.position.set(-0.36, 0.337 - i * 0.011, 0.559);
    labelDummy.scale.set(1 - i * 0.08, 1, 1);
    labelDummy.updateMatrix();
    label_lines.setMatrixAt(i, labelDummy.matrix);
  }
  root.add(label_lines);

  const front_screwsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.007, 10);
  const front_screws = new THREE.InstancedMesh(front_screwsGeom, silverMat, 6);
  const frontScrewPositions = [
    [-0.47, 0.54],
    [0.47, 0.54],
    [-0.47, 0.17],
    [0.47, 0.17],
    [-0.47, 0.38],
    [0.47, 0.38],
  ];
  const frontScrewDummy = new THREE.Object3D();
  for (let i = 0; i < frontScrewPositions.length; i++) {
    frontScrewDummy.position.set(
      frontScrewPositions[i][0],
      frontScrewPositions[i][1],
      0.558
    );
    frontScrewDummy.rotation.set(Math.PI / 2, 0, 0);
    frontScrewDummy.updateMatrix();
    front_screws.setMatrixAt(i, frontScrewDummy.matrix);
  }
  root.add(front_screws);

  const control_deckGeom = new THREE.BoxGeometry(1.17, 0.105, 0.40);
  const control_deck = new THREE.Mesh(control_deckGeom, cabinetMat);
  control_deck.position.set(0, 0.705, 0.385);
  root.add(control_deck);

  const control_surfaceGeom = new THREE.BoxGeometry(1.08, 0.018, 0.34);
  const control_surface = new THREE.Mesh(control_surfaceGeom, panelMat);
  control_surface.position.set(0, 0.765, 0.39);
  root.add(control_surface);

  const front_work_surface_lipGeom = new THREE.BoxGeometry(1.17, 0.055, 0.045);
  const front_work_surface_lip = new THREE.Mesh(
    front_work_surface_lipGeom,
    cabinetMat
  );
  front_work_surface_lip.position.set(0, 0.70, 0.575);
  root.add(front_work_surface_lip);

  const keypad_keysGeom = new THREE.BoxGeometry(0.055, 0.018, 0.045);
  const keypad_keys = new THREE.InstancedMesh(
    keypad_keysGeom,
    grayButtonMat,
    20
  );
  const keypadDummy = new THREE.Object3D();
  let keypadIndex = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      keypadDummy.position.set(
        -0.16 + col * 0.068,
        0.786,
        0.31 + row * 0.058
      );
      keypadDummy.rotation.set(0, 0, 0);
      keypadDummy.updateMatrix();
      keypad_keys.setMatrixAt(keypadIndex++, keypadDummy.matrix);
    }
  }
  root.add(keypad_keys);

  const function_keyGeom = new THREE.BoxGeometry(0.066, 0.022, 0.052);

  const green_function_key = new THREE.Mesh(function_keyGeom, greenButtonMat);
  green_function_key.position.set(-0.43, 0.789, 0.30);
  green_function_key.rotation.y = -0.08;
  root.add(green_function_key);

  const blue_function_key = new THREE.Mesh(function_keyGeom, grayButtonMat);
  blue_function_key.position.set(-0.34, 0.789, 0.30);
  blue_function_key.rotation.y = -0.04;
  root.add(blue_function_key);

  const red_function_key = new THREE.Mesh(function_keyGeom, redButtonMat);
  red_function_key.position.set(-0.43, 0.789, 0.405);
  red_function_key.rotation.y = 0.08;
  root.add(red_function_key);

  const gray_function_key = new THREE.Mesh(function_keyGeom, grayButtonMat);
  gray_function_key.position.set(-0.33, 0.789, 0.405);
  root.add(gray_function_key);

  const red_enter_key = new THREE.Mesh(function_keyGeom, redButtonMat);
  red_enter_key.position.set(0.105, 0.789, 0.465);
  red_enter_key.rotation.y = -0.08;
  root.add(red_enter_key);

  const green_confirm_key = new THREE.Mesh(function_keyGeom, greenButtonMat);
  green_confirm_key.position.set(0.39, 0.789, 0.335);
  root.add(green_confirm_key);

  const red_stop_key = new THREE.Mesh(function_keyGeom, redButtonMat);
  red_stop_key.position.set(0.31, 0.789, 0.275);
  root.add(red_stop_key);

  const black_rockerGeom = new THREE.BoxGeometry(0.06, 0.035, 0.055);
  const black_rocker = new THREE.Mesh(black_rockerGeom, darkMat);
  black_rocker.position.set(0.48, 0.79, 0.405);
  black_rocker.rotation.x = -0.18;
  root.add(black_rocker);

  const control_knob_baseGeom = new THREE.CylinderGeometry(
    0.066,
    0.066,
    0.018,
    24
  );
  const control_knob_base = new THREE.Mesh(control_knob_baseGeom, darkMat);
  control_knob_base.position.set(0.22, 0.786, 0.43);
  root.add(control_knob_base);

  const control_knobGeom = new THREE.CylinderGeometry(0.041, 0.052, 0.06, 20);
  const control_knob = new THREE.Mesh(control_knobGeom, blackMetalMat);
  control_knob.position.set(0.22, 0.82, 0.43);
  root.add(control_knob);

  const control_knob_indicatorGeom = new THREE.BoxGeometry(0.008, 0.006, 0.032);
  const control_knob_indicator = new THREE.Mesh(
    control_knob_indicatorGeom,
    silverMat
  );
  control_knob_indicator.position.set(0.22, 0.853, 0.42);
  root.add(control_knob_indicator);

  const emergency_stop_baseGeom = new THREE.CylinderGeometry(
    0.068,
    0.068,
    0.018,
    28
  );
  const emergency_stop_base = new THREE.Mesh(
    emergency_stop_baseGeom,
    yellowMat
  );
  emergency_stop_base.position.set(0.405, 0.786, 0.445);
  root.add(emergency_stop_base);

  const emergency_stop_collarGeom = new THREE.CylinderGeometry(
    0.052,
    0.058,
    0.025,
    28
  );
  const emergency_stop_collar = new THREE.Mesh(
    emergency_stop_collarGeom,
    yellowMat
  );
  emergency_stop_collar.position.set(0.405, 0.805, 0.445);
  root.add(emergency_stop_collar);

  const emergency_stop_buttonGeom = new THREE.CylinderGeometry(
    0.046,
    0.052,
    0.045,
    28
  );
  const emergency_stop_button = new THREE.Mesh(
    emergency_stop_buttonGeom,
    redButtonMat
  );
  emergency_stop_button.position.set(0.405, 0.835, 0.445);
  root.add(emergency_stop_button);

  const emergency_stop_capGeom = new THREE.SphereGeometry(0.047, 24, 12);
  const emergency_stop_cap = new THREE.Mesh(
    emergency_stop_capGeom,
    redButtonMat
  );
  emergency_stop_cap.scale.set(1, 0.45, 1);
  emergency_stop_cap.position.set(0.405, 0.858, 0.445);
  root.add(emergency_stop_cap);

  const control_green_indicatorGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.008,
    16
  );
  const control_green_indicator = new THREE.Mesh(
    control_green_indicatorGeom,
    screenGreenMat
  );
  control_green_indicator.position.set(0.39, 0.785, 0.39);
  root.add(control_green_indicator);

  const display_group = new THREE.Group();
  display_group.position.set(0, 1.045, 0.155);
  display_group.rotation.x = -0.28;
  root.add(display_group);

  const display_housingGeom = roundedPanelGeometry(
    1.08,
    0.58,
    0.075,
    0.035,
    0.008
  );
  const display_housing = new THREE.Mesh(display_housingGeom, cabinetMat);
  display_housing.position.z = -0.038;
  display_group.add(display_housing);

  const screen_bezelGeom = roundedPanelGeometry(
    0.91,
    0.45,
    0.018,
    0.018,
    0.003
  );
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, darkMat);
  screen_bezel.position.set(0, 0, 0.038);
  display_group.add(screen_bezel);

  const display_screenGeom = new THREE.BoxGeometry(0.82, 0.37, 0.008);
  const display_screen = new THREE.Mesh(display_screenGeom, screenMat);
  display_screen.position.set(0, 0, 0.058);
  display_group.add(display_screen);

  const screen_sidebarGeom = new THREE.BoxGeometry(0.065, 0.35, 0.004);
  const screen_sidebar = new THREE.Mesh(screen_sidebarGeom, screenBlueMat);
  screen_sidebar.position.set(-0.372, 0, 0.064);
  display_group.add(screen_sidebar);

  const screen_topbarGeom = new THREE.BoxGeometry(0.72, 0.025, 0.004);
  const screen_topbar = new THREE.Mesh(screen_topbarGeom, screenBlueMat);
  screen_topbar.position.set(0.025, 0.166, 0.064);
  display_group.add(screen_topbar);

  const screen_bottombarGeom = new THREE.BoxGeometry(0.72, 0.035, 0.004);
  const screen_bottombar = new THREE.Mesh(screen_bottombarGeom, screenBlueMat);
  screen_bottombar.position.set(0.025, -0.166, 0.064);
  display_group.add(screen_bottombar);

  const screen_right_overlayGeom = new THREE.BoxGeometry(0.13, 0.25, 0.004);
  const screen_right_overlay = new THREE.Mesh(
    screen_right_overlayGeom,
    darkMat
  );
  screen_right_overlay.position.set(0.335, 0.035, 0.064);
  display_group.add(screen_right_overlay);

  const screen_iconsGeom = new THREE.BoxGeometry(0.027, 0.027, 0.004);
  const screen_icons = new THREE.InstancedMesh(
    screen_iconsGeom,
    screenIconMat,
    5
  );
  const iconDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    iconDummy.position.set(-0.372, 0.13 - i * 0.065, 0.068);
    iconDummy.rotation.set(0, 0, i % 2 === 0 ? 0 : 0.12);
    iconDummy.updateMatrix();
    screen_icons.setMatrixAt(i, iconDummy.matrix);
  }
  display_group.add(screen_icons);

  const screen_text_linesGeom = new THREE.BoxGeometry(0.04, 0.004, 0.003);
  const screen_text_lines = new THREE.InstancedMesh(
    screen_text_linesGeom,
    labelMat,
    8
  );
  const screenTextDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const row = Math.floor(i / 2);
    screenTextDummy.position.set(
      -0.325 + (i % 2) * 0.055,
      0.145 - row * 0.072,
      0.068
    );
    screenTextDummy.scale.set(i % 2 === 0 ? 1 : 0.65, 1, 1);
    screenTextDummy.updateMatrix();
    screen_text_lines.setMatrixAt(i, screenTextDummy.matrix);
  }
  display_group.add(screen_text_lines);

  const screen_status_lightGeom = new THREE.BoxGeometry(0.012, 0.012, 0.004);
  const screen_status_light = new THREE.Mesh(
    screen_status_lightGeom,
    screenIconMat
  );
  screen_status_light.position.set(0.29, -0.166, 0.068);
  display_group.add(screen_status_light);

  const upper_side_access_panelGeom = new THREE.BoxGeometry(
    0.018,
    0.37,
    0.46
  );
  const upper_side_access_panel = new THREE.Mesh(
    upper_side_access_panelGeom,
    panelMat
  );
  upper_side_access_panel.position.set(0.615, 0.575, -0.22);
  root.add(upper_side_access_panel);

  const lower_side_access_panelGeom = new THREE.BoxGeometry(
    0.018,
    0.30,
    0.46
  );
  const lower_side_access_panel = new THREE.Mesh(
    lower_side_access_panelGeom,
    panelMat
  );
  lower_side_access_panel.position.set(0.615, 0.235, -0.22);
  root.add(lower_side_access_panel);

  const side_horizontal_seamGeom = new THREE.BoxGeometry(0.009, 0.009, 0.48);
  const side_horizontal_seam = new THREE.Mesh(
    side_horizontal_seamGeom,
    darkMat
  );
  side_horizontal_seam.position.set(0.627, 0.39, -0.22);
  root.add(side_horizontal_seam);

  const side_vertical_seamGeom = new THREE.BoxGeometry(0.009, 0.61, 0.009);
  const side_vertical_seam = new THREE.Mesh(side_vertical_seamGeom, darkMat);
  side_vertical_seam.position.set(0.627, 0.43, 0.015);
  root.add(side_vertical_seam);

  const side_panel_screwsGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.008,
    10
  );
  const side_panel_screws = new THREE.InstancedMesh(
    side_panel_screwsGeom,
    silverMat,
    8
  );
  const sideScrewPositions = [
    [0.73, -0.43],
    [0.73, -0.02],
    [0.42, -0.43],
    [0.42, -0.02],
    [0.37, -0.43],
    [0.37, -0.02],
    [0.10, -0.43],
    [0.10, -0.02],
  ];
  const sideScrewDummy = new THREE.Object3D();
  for (let i = 0; i < sideScrewPositions.length; i++) {
    sideScrewDummy.position.set(
      0.631,
      sideScrewPositions[i][0],
      sideScrewPositions[i][1]
    );
    sideScrewDummy.rotation.set(0, 0, -Math.PI / 2);
    sideScrewDummy.updateMatrix();
    side_panel_screws.setMatrixAt(i, sideScrewDummy.matrix);
  }
  root.add(side_panel_screws);

  const reelShape = new THREE.Shape();
  reelShape.absarc(0, 0, 0.15, 0, Math.PI * 2, false);
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    const hole = new THREE.Path();
    hole.absellipse(
      Math.cos(angle) * 0.077,
      Math.sin(angle) * 0.077,
      0.043,
      0.024,
      0,
      Math.PI * 2,
      true,
      angle
    );
    reelShape.holes.push(hole);
  }

  const reelGeom = new THREE.ExtrudeGeometry(reelShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 1,
    curveSegments: 20,
  });

  const upper_reel_backingGeom = new THREE.CylinderGeometry(
    0.125,
    0.125,
    0.05,
    32
  );
  const upper_reel_backing = new THREE.Mesh(
    upper_reel_backingGeom,
    copperMat
  );
  upper_reel_backing.rotation.z = Math.PI / 2;
  upper_reel_backing.position.set(0.642, 0.59, -0.25);
  root.add(upper_reel_backing);

  const upper_reel = new THREE.Mesh(reelGeom, blackMetalMat);
  upper_reel.rotation.y = Math.PI / 2;
  upper_reel.position.set(0.665, 0.59, -0.25);
  root.add(upper_reel);

  const lower_reel_backing = new THREE.Mesh(
    upper_reel_backingGeom,
    copperMat
  );
  lower_reel_backing.rotation.z = Math.PI / 2;
  lower_reel_backing.position.set(0.642, 0.27, -0.25);
  root.add(lower_reel_backing);

  const lower_reel = new THREE.Mesh(reelGeom, blackMetalMat);
  lower_reel.rotation.y = Math.PI / 2;
  lower_reel.position.set(0.665, 0.27, -0.25);
  root.add(lower_reel);

  const reel_hubGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.045, 20);
  const upper_reel_hub = new THREE.Mesh(reel_hubGeom, blackMetalMat);
  upper_reel_hub.rotation.z = Math.PI / 2;
  upper_reel_hub.position.set(0.704, 0.59, -0.25);
  root.add(upper_reel_hub);

  const lower_reel_hub = new THREE.Mesh(reel_hubGeom, blackMetalMat);
  lower_reel_hub.rotation.z = Math.PI / 2;
  lower_reel_hub.position.set(0.704, 0.27, -0.25);
  root.add(lower_reel_hub);

  const reel_axleGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.055, 14);
  const upper_reel_axle = new THREE.Mesh(reel_axleGeom, silverMat);
  upper_reel_axle.rotation.z = Math.PI / 2;
  upper_reel_axle.position.set(0.73, 0.59, -0.25);
  root.add(upper_reel_axle);

  const lower_reel_axle = new THREE.Mesh(reel_axleGeom, silverMat);
  lower_reel_axle.rotation.z = Math.PI / 2;
  lower_reel_axle.position.set(0.73, 0.27, -0.25);
  root.add(lower_reel_axle);

  const lower_reel_guide_rodGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.27,
    12
  );
  const lower_reel_guide_rod = new THREE.Mesh(
    lower_reel_guide_rodGeom,
    silverMat
  );
  lower_reel_guide_rod.rotation.x = Math.PI / 2;
  lower_reel_guide_rod.position.set(0.665, 0.13, -0.25);
  root.add(lower_reel_guide_rod);

  const reel_guide_bracketGeom = new THREE.BoxGeometry(0.06, 0.045, 0.06);
  const reel_guide_bracket = new THREE.Mesh(
    reel_guide_bracketGeom,
    blackMetalMat
  );
  reel_guide_bracket.position.set(0.64, 0.13, -0.10);
  root.add(reel_guide_bracket);

  const side_vent_backingGeom = new THREE.BoxGeometry(0.018, 0.16, 0.29);
  const side_vent_backing = new THREE.Mesh(side_vent_backingGeom, darkMat);
  side_vent_backing.position.set(0.621, 0.17, 0.22);
  root.add(side_vent_backing);

  const side_vent_slatsGeom = new THREE.BoxGeometry(0.022, 0.012, 0.245);
  const side_vent_slats = new THREE.InstancedMesh(
    side_vent_slatsGeom,
    blackMetalMat,
    6
  );
  const ventDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    ventDummy.position.set(0.635, 0.115 + i * 0.022, 0.22);
    ventDummy.rotation.set(0, 0, 0);
    ventDummy.updateMatrix();
    side_vent_slats.setMatrixAt(i, ventDummy.matrix);
  }
  root.add(side_vent_slats);

  const side_access_discGeom = new THREE.CylinderGeometry(
    0.145,
    0.145,
    0.026,
    40
  );
  const side_access_disc = new THREE.Mesh(
    side_access_discGeom,
    whitePlasticMat
  );
  side_access_disc.rotation.z = Math.PI / 2;
  side_access_disc.position.set(0.64, 0.34, 0.34);
  root.add(side_access_disc);

  const side_access_ringGeom = new THREE.TorusGeometry(0.145, 0.007, 8, 40);
  const side_access_ring = new THREE.Mesh(side_access_ringGeom, silverMat);
  side_access_ring.rotation.y = Math.PI / 2;
  side_access_ring.position.set(0.657, 0.34, 0.34);
  root.add(side_access_ring);

  const side_access_spokesGeom = new THREE.BoxGeometry(0.025, 0.095, 0.027);
  const side_access_spokes = new THREE.InstancedMesh(
    side_access_spokesGeom,
    blackMetalMat,
    3
  );
  const accessSpokeDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    const angle = (i / 3) * Math.PI * 2;
    accessSpokeDummy.position.set(
      0.66,
      0.34 + Math.cos(angle) * 0.055,
      0.34 + Math.sin(angle) * 0.055
    );
    accessSpokeDummy.rotation.set(angle, 0, 0);
    accessSpokeDummy.updateMatrix();
    side_access_spokes.setMatrixAt(i, accessSpokeDummy.matrix);
  }
  root.add(side_access_spokes);

  const side_access_hubGeom = new THREE.CylinderGeometry(
    0.036,
    0.036,
    0.045,
    20
  );
  const side_access_hub = new THREE.Mesh(side_access_hubGeom, blackMetalMat);
  side_access_hub.rotation.z = Math.PI / 2;
  side_access_hub.position.set(0.67, 0.34, 0.34);
  root.add(side_access_hub);

  const side_access_axleGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.055,
    14
  );
  const side_access_axle = new THREE.Mesh(side_access_axleGeom, silverMat);
  side_access_axle.rotation.z = Math.PI / 2;
  side_access_axle.position.set(0.696, 0.34, 0.34);
  root.add(side_access_axle);

  const feetGeom = new THREE.BoxGeometry(0.16, 0.09, 0.16);
  const feet = new THREE.InstancedMesh(feetGeom, darkMat, 4);
  const footPositions = [
    [-0.46, 0.39],
    [0.46, 0.39],
    [-0.46, -0.39],
    [0.46, -0.39],
  ];
  const footDummy = new THREE.Object3D();
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(footPositions[i][0], 0.015, footPositions[i][1]);
    footDummy.rotation.set(0, 0, 0);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  root.add(feet);

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