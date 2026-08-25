export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 4.4;
  const bodyH = 6.4;
  const bodyD = 0.34;
  const screenW = 3.5;
  const screenH = 4.55;
  const screenY = 0.32;

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rearMat = new THREE.MeshStandardMaterial({
    color: 0x666a6d,
    metalness: 0.6,
    roughness: 0.5,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x050708,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x06264d,
    emissive: 0x06264d,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const headerMat = new THREE.MeshStandardMaterial({
    color: 0x0088ed,
    emissive: 0x0088ed,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const footerMat = new THREE.MeshStandardMaterial({
    color: 0x007bd5,
    emissive: 0x007bd5,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const tableMat = new THREE.MeshStandardMaterial({
    color: 0x142f58,
    emissive: 0x142f58,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const alertMat = new THREE.MeshStandardMaterial({
    color: 0xdc3159,
    emissive: 0xdc3159,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const whiteUiMat = new THREE.MeshBasicMaterial({ color: 0xd9f4ff });
  const cyanUiMat = new THREE.MeshBasicMaterial({ color: 0x31d9ff });
  const greenUiMat = new THREE.MeshBasicMaterial({ color: 0x6cff45 });
  const yellowUiMat = new THREE.MeshBasicMaterial({ color: 0xffd84a });
  const magentaUiMat = new THREE.MeshBasicMaterial({ color: 0xff43c6 });
  const orangeUiMat = new THREE.MeshBasicMaterial({ color: 0xff9c28 });
  const redUiMat = new THREE.MeshBasicMaterial({ color: 0xff4059 });
  const gridUiMat = new THREE.MeshBasicMaterial({ color: 0x1878b8 });
  const mutedGridUiMat = new THREE.MeshBasicMaterial({ color: 0x0d5687 });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  function roundedPanelGeometry(w, h, r, depth, bevel) {
    return new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth,
      steps: 1,
      bevelEnabled: bevel,
      bevelThickness: bevel ? 0.025 : 0,
      bevelSize: bevel ? 0.025 : 0,
      bevelSegments: bevel ? 3 : 1,
    });
  }

  const rear_shellGeom = roundedPanelGeometry(bodyW - 0.1, bodyH - 0.12, 0.34, 0.16, true);
  const rear_shell = new THREE.Mesh(rear_shellGeom, rearMat);
  rear_shell.position.z = -bodyD;
  root.add(rear_shell);

  const housingGeom = roundedPanelGeometry(bodyW, bodyH, 0.38, 0.3, true);
  const housing = new THREE.Mesh(housingGeom, housingMat);
  root.add(housing);

  const front_bezelGeom = roundedPanelGeometry(4.02, 5.36, 0.28, 0.055, true);
  const front_bezel = new THREE.Mesh(front_bezelGeom, bezelMat);
  front_bezel.position.set(0, 0.22, 0.285);
  root.add(front_bezel);

  const display_screenGeom = roundedPanelGeometry(screenW, screenH, 0.055, 0.014, false);
  const display_screen = new THREE.Mesh(display_screenGeom, screenMat);
  display_screen.position.set(0, screenY, 0.355);
  root.add(display_screen);

  const screen_content = new THREE.Group();
  screen_content.position.y = screenY;
  root.add(screen_content);

  const top_headerGeom = new THREE.PlaneGeometry(3.39, 0.32);
  const top_header = new THREE.Mesh(top_headerGeom, headerMat);
  top_header.position.set(0, 2.08, 0.374);
  screen_content.add(top_header);

  const header_logoGeom = new THREE.CircleGeometry(0.105, 6);
  const header_logo = new THREE.Mesh(header_logoGeom, greenUiMat);
  header_logo.position.set(-1.48, 2.08, 0.382);
  header_logo.rotation.z = Math.PI / 6;
  screen_content.add(header_logo);

  const header_status_buttonGeom = new THREE.PlaneGeometry(0.25, 0.13);
  const header_status_button = new THREE.Mesh(header_status_buttonGeom, footerMat);
  header_status_button.position.set(1.13, 2.08, 0.382);
  screen_content.add(header_status_button);

  const header_alert_buttonGeom = new THREE.PlaneGeometry(0.39, 0.17);
  const header_alert_button = new THREE.Mesh(header_alert_buttonGeom, alertMat);
  header_alert_button.position.set(1.49, 2.08, 0.382);
  screen_content.add(header_alert_button);

  const alert_iconShape = new THREE.Shape();
  alert_iconShape.moveTo(0, 0.065);
  alert_iconShape.lineTo(-0.055, -0.05);
  alert_iconShape.lineTo(0.055, -0.05);
  alert_iconShape.lineTo(0, 0.065);
  const alert_iconGeom = new THREE.ShapeGeometry(alert_iconShape);
  const alert_icon = new THREE.Mesh(alert_iconGeom, whiteUiMat);
  alert_icon.position.set(1.49, 2.08, 0.389);
  screen_content.add(alert_icon);

  const upper_graph_backdropGeom = new THREE.PlaneGeometry(3.2, 1.64);
  const upper_graph_backdrop = new THREE.Mesh(upper_graph_backdropGeom, screenMat);
  upper_graph_backdrop.position.set(0, 0.96, 0.373);
  screen_content.add(upper_graph_backdrop);

  const lower_graph_backdropGeom = new THREE.PlaneGeometry(3.2, 1.34);
  const lower_graph_backdrop = new THREE.Mesh(lower_graph_backdropGeom, screenMat);
  lower_graph_backdrop.position.set(0, -0.46, 0.373);
  screen_content.add(lower_graph_backdrop);

  const metric_table_backgroundGeom = new THREE.PlaneGeometry(3.2, 0.62);
  const metric_table_background = new THREE.Mesh(metric_table_backgroundGeom, tableMat);
  metric_table_background.position.set(0, -1.62, 0.374);
  screen_content.add(metric_table_background);

  const bottom_navigationGeom = new THREE.PlaneGeometry(3.39, 0.29);
  const bottom_navigation = new THREE.Mesh(bottom_navigationGeom, footerMat);
  bottom_navigation.position.set(0, -2.075, 0.374);
  screen_content.add(bottom_navigation);

  const grid_barGeom = new THREE.BoxGeometry(1, 1, 0.006);
  const transform_dummy = new THREE.Object3D();

  function createGrid(width, height, cols, rows, mat) {
    const count = cols + rows;
    const mesh = new THREE.InstancedMesh(grid_barGeom, mat, count);
    let index = 0;

    for (let i = 0; i <= cols; i++) {
      const x = -width / 2 + width * i / cols;
      transform_dummy.position.set(x, 0, 0);
      transform_dummy.rotation.set(0, 0, 0);
      transform_dummy.scale.set(i % cols === 0 ? 0.012 : 0.006, height, 1);
      transform_dummy.updateMatrix();
      mesh.setMatrixAt(index++, transform_dummy.matrix);
    }

    for (let i = 0; i <= rows; i++) {
      const y = -height / 2 + height * i / rows;
      transform_dummy.position.set(0, y, 0);
      transform_dummy.rotation.set(0, 0, 0);
      transform_dummy.scale.set(width, i % rows === 0 ? 0.012 : 0.006, 1);
      transform_dummy.updateMatrix();
      mesh.setMatrixAt(index++, transform_dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const upper_chart_grid = createGrid(3.08, 1.48, 8, 5, mutedGridUiMat);
  upper_chart_grid.position.set(0, 0.96, 0.381);
  screen_content.add(upper_chart_grid);

  const lower_chart_grid = createGrid(3.08, 1.18, 7, 4, mutedGridUiMat);
  lower_chart_grid.position.set(0, -0.46, 0.381);
  screen_content.add(lower_chart_grid);

  const table_dividers = new THREE.InstancedMesh(grid_barGeom, gridUiMat, 12);
  let tableDividerIndex = 0;
  for (let i = 0; i <= 4; i++) {
    transform_dummy.position.set(-1.5 + i * 0.75, -1.62, 0.382);
    transform_dummy.rotation.set(0, 0, 0);
    transform_dummy.scale.set(0.008, 0.57, 1);
    transform_dummy.updateMatrix();
    table_dividers.setMatrixAt(tableDividerIndex++, transform_dummy.matrix);
  }
  for (let i = 0; i <= 3; i++) {
    transform_dummy.position.set(0, -1.88 + i * 0.24, 0.382);
    transform_dummy.rotation.set(0, 0, 0);
    transform_dummy.scale.set(3.12, 0.008, 1);
    transform_dummy.updateMatrix();
    table_dividers.setMatrixAt(tableDividerIndex++, transform_dummy.matrix);
  }
  table_dividers.instanceMatrix.needsUpdate = true;
  screen_content.add(table_dividers);

  function createPolyline(points, material, radius) {
    const pathPoints = points.map((point) => new THREE.Vector3(point[0], point[1], 0));
    const path = new THREE.CatmullRomCurve3(pathPoints, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      path,
      Math.max(24, points.length * 5),
      radius,
      6,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  const upper_chart = new THREE.Group();
  upper_chart.position.z = 0.391;
  screen_content.add(upper_chart);

  const upper_green_trace = createPolyline([
    [-1.5, 0.58], [-1.25, 0.91], [-0.98, 1.22], [-0.72, 1.02],
    [-0.46, 0.62], [-0.2, 0.22], [0.04, 1.43], [0.27, 0.72],
    [0.52, 0.23], [0.78, 0.28], [1.05, 0.62], [1.3, 0.94], [1.5, 1.02],
  ], greenUiMat, 0.018);
  upper_chart.add(upper_green_trace);

  const upper_magenta_trace = createPolyline([
    [-1.5, 0.77], [-1.24, 0.47], [-0.98, 0.2], [-0.72, 0.73],
    [-0.46, 0.43], [-0.2, 0.22], [0.04, 1.42], [0.27, 1.5],
    [0.52, 0.66], [0.78, 0.2], [1.05, 0.3], [1.3, 0.73], [1.5, 1.02],
  ], magentaUiMat, 0.019);
  upper_chart.add(upper_magenta_trace);

  const upper_cyan_trace = createPolyline([
    [-1.5, 0.2], [-1.25, 0.18], [-0.98, 0.22], [-0.72, 0.38],
    [-0.46, 0.68], [-0.2, 0.22], [0.04, 0.2], [0.27, 0.2],
    [0.52, 0.21], [0.78, 0.26], [1.05, 1.43], [1.3, 0.31], [1.5, 0.2],
  ], cyanUiMat, 0.019);
  upper_chart.add(upper_cyan_trace);

  const upper_orange_trace = createPolyline([
    [-1.5, 0.73], [-1.25, 0.46], [-0.98, 0.21], [-0.72, 0.2],
    [-0.46, 0.4], [-0.2, 0.22], [0.04, 0.2], [0.27, 0.2],
    [0.52, 0.22], [0.78, 0.31], [1.05, 0.59], [1.3, 1.0], [1.5, 1.45],
  ], orangeUiMat, 0.019);
  upper_chart.add(upper_orange_trace);

  const upper_yellow_trace = createPolyline([
    [-0.72, 0.2], [-0.46, 0.34], [-0.2, 0.22], [0.04, 1.42],
  ], yellowUiMat, 0.022);
  upper_chart.add(upper_yellow_trace);

  const lower_chart = new THREE.Group();
  lower_chart.position.z = 0.391;
  screen_content.add(lower_chart);

  const lower_green_trace = createPolyline([
    [-1.5, -1.0], [-1.23, -0.96], [-0.95, -0.82], [-0.68, -0.4],
    [-0.39, -0.62], [-0.1, -0.98], [0.18, -0.85], [0.47, -0.28],
    [0.76, -0.16], [1.06, -0.08], [1.32, -0.04], [1.5, -0.02],
  ], greenUiMat, 0.018);
  lower_chart.add(lower_green_trace);

  const lower_magenta_trace = createPolyline([
    [-1.5, -1.0], [-1.23, -0.62], [-0.95, -0.36], [-0.68, -0.43],
    [-0.39, -0.75], [-0.1, -0.84], [0.18, -0.72], [0.47, -0.58],
    [0.76, -0.54], [1.06, -0.48], [1.32, -0.38], [1.5, -0.62],
  ], magentaUiMat, 0.019);
  lower_chart.add(lower_magenta_trace);

  const lower_cyan_trace = createPolyline([
    [-1.5, -1.0], [-1.23, -0.72], [-0.95, -0.45], [-0.68, -0.27],
    [-0.39, -0.38], [-0.1, -0.82], [0.18, -0.98], [0.47, -0.62],
    [0.76, -0.31], [1.06, -0.16], [1.32, -0.1], [1.5, -0.08],
  ], cyanUiMat, 0.018);
  lower_chart.add(lower_cyan_trace);

  const lower_orange_trace = createPolyline([
    [-1.5, -1.0], [-1.23, -0.92], [-0.95, -0.72], [-0.68, -0.82],
    [-0.39, -0.62], [-0.1, -0.96], [0.18, -0.9], [0.47, -0.56],
    [0.76, -0.48], [1.06, -0.32], [1.32, -0.25], [1.5, -0.62],
  ], orangeUiMat, 0.017);
  lower_chart.add(lower_orange_trace);

  const ui_pixelGeom = new THREE.BoxGeometry(1, 1, 0.006);

  function createPixelText(text, x, y, scale, mat) {
    const patterns = {
      "0": ["111", "101", "101", "101", "111"],
      "1": ["010", "110", "010", "010", "111"],
      "2": ["111", "001", "111", "100", "111"],
      "3": ["111", "001", "111", "001", "111"],
      "4": ["101", "101", "111", "001", "001"],
      "5": ["111", "100", "111", "001", "111"],
      "6": ["111", "100", "111", "101", "111"],
      "7": ["111", "001", "010", "010", "010"],
      "8": ["111", "101", "111", "101", "111"],
      "9": ["111", "101", "111", "001", "111"],
      "A": ["010", "101", "111", "101", "101"],
      "B": ["110", "101", "110", "101", "110"],
      "C": ["111", "100", "100", "100", "111"],
      "D": ["110", "101", "101", "101", "110"],
      "E": ["111", "100", "110", "100", "111"],
      "F": ["111", "100", "110", "100", "100"],
      "I": ["111", "010", "010", "010", "111"],
      "L": ["100", "100", "100", "100", "111"],
      "M": ["101", "111", "111", "101", "101"],
      "N": ["101", "111", "111", "111", "101"],
      "O": ["111", "101", "101", "101", "111"],
      "P": ["110", "101", "110", "100", "100"],
      "R": ["110", "101", "110", "101", "101"],
      "S": ["111", "100", "111", "001", "111"],
      "T": ["111", "010", "010", "010", "010"],
      "U": ["101", "101", "101", "101", "111"],
      "V": ["101", "101", "101", "101", "010"],
      "W": ["101", "101", "111", "111", "101"],
      "Y": ["101", "101", "010", "010", "010"],
      "/": ["001", "001", "010", "100", "100"],
      " ": ["000", "000", "000", "000", "000"],
    };

    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const pattern = patterns[text[i]] || patterns[" "];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (pattern[row][col] === "1") count++;
        }
      }
    }

    const mesh = new THREE.InstancedMesh(ui_pixelGeom, mat, count);
    const pitchX = scale * 1.2;
    const pitchY = scale * 1.15;
    const spanX = (text.length * 4 - 1) * pitchX;
    const spanY = 5 * pitchY;
    let index = 0;

    for (let i = 0; i < text.length; i++) {
      const pattern = patterns[text[i]] || patterns[" "];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (pattern[row][col] !== "1") continue;
          transform_dummy.position.set(
            x - spanX / 2 + (i * 4 + col) * pitchX,
            y + spanY / 2 - (row + 0.5) * pitchY,
            0
          );
          transform_dummy.rotation.set(0, 0, 0);
          transform_dummy.scale.set(scale, scale, 1);
          transform_dummy.updateMatrix();
          mesh.setMatrixAt(index++, transform_dummy.matrix);
        }
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const header_title = createPixelText("MONITOR", -0.96, 2.08, 0.027, whiteUiMat);
  header_title.position.z = 0.39;
  screen_content.add(header_title);

  const header_reading = createPixelText("T 2.00 / 1.00", 0.36, 2.08, 0.021, whiteUiMat);
  header_reading.position.z = 0.39;
  screen_content.add(header_reading);

  const status_label = createPixelText("STATUS", 1.04, 1.67, 0.018, whiteUiMat);
  status_label.position.z = 0.39;
  screen_content.add(status_label);

  const upper_title = createPixelText("WAVEFORM A", -1.38, 1.63, 0.023, whiteUiMat);
  upper_title.position.z = 0.39;
  screen_content.add(upper_title);

  const upper_y_label = createPixelText("VALUE", -1.62, 0.92, 0.014, whiteUiMat);
  upper_y_label.rotation.z = -Math.PI / 2;
  upper_y_label.position.z = 0.39;
  screen_content.add(upper_y_label);

  const upper_axis_labels = new THREE.Group();
  upper_axis_labels.position.z = 0.39;
  const upper_zero = createPixelText("0", -1.52, 0.2, 0.014, whiteUiMat);
  const upper_one_hundred = createPixelText("100", -1.52, 0.61, 0.014, whiteUiMat);
  const upper_two_hundred = createPixelText("200", -1.52, 1.02, 0.014, whiteUiMat);
  const upper_three_hundred = createPixelText("300", -1.52, 1.43, 0.014, whiteUiMat);
  upper_axis_labels.add(upper_zero, upper_one_hundred, upper_two_hundred, upper_three_hundred);
  screen_content.add(upper_axis_labels);

  const lower_title = createPixelText("WAVEFORM B", -1.38, -0.08, 0.021, whiteUiMat);
  lower_title.position.z = 0.39;
  screen_content.add(lower_title);

  const lower_y_label = createPixelText("LEVEL", -1.62, -0.47, 0.013, whiteUiMat);
  lower_y_label.rotation.z = -Math.PI / 2;
  lower_y_label.position.z = 0.39;
  screen_content.add(lower_y_label);

  const table_header_text = createPixelText("METRIC TABLE", -1.33, -1.39, 0.017, whiteUiMat);
  table_header_text.position.z = 0.39;
  screen_content.add(table_header_text);

  const table_green_values = new THREE.Group();
  table_green_values.position.z = 0.39;
  const table_green_value_1 = createPixelText("10", -1.34, -1.55, 0.018, greenUiMat);
  const table_green_value_2 = createPixelText("200", -1.34, -1.79, 0.018, greenUiMat);
  const table_green_value_3 = createPixelText("120", -0.55, -1.55, 0.018, greenUiMat);
  const table_green_value_4 = createPixelText("30", -0.55, -1.79, 0.018, greenUiMat);
  const table_green_value_5 = createPixelText("999", 0.95, -1.48, 0.018, greenUiMat);
  const table_green_value_6 = createPixelText("1000", 1.28, -1.48, 0.018, greenUiMat);
  table_green_values.add(
    table_green_value_1,
    table_green_value_2,
    table_green_value_3,
    table_green_value_4,
    table_green_value_5,
    table_green_value_6
  );
  screen_content.add(table_green_values);

  const table_red_values = new THREE.Group();
  table_red_values.position.z = 0.39;
  const table_red_value_1 = createPixelText("80", -0.05, -1.55, 0.018, redUiMat);
  const table_red_value_2 = createPixelText("130", -0.05, -1.79, 0.018, redUiMat);
  const table_red_value_3 = createPixelText("40", 0.48, -1.55, 0.018, redUiMat);
  const table_red_value_4 = createPixelText("200", 0.48, -1.79, 0.018, redUiMat);
  const table_red_value_5 = createPixelText("100", 0.95, -1.79, 0.018, redUiMat);
  table_red_values.add(
    table_red_value_1,
    table_red_value_2,
    table_red_value_3,
    table_red_value_4,
    table_red_value_5
  );
  screen_content.add(table_red_values);

  const table_cyan_values = new THREE.Group();
  table_cyan_values.position.z = 0.39;
  const table_cyan_value_1 = createPixelText("00", 0.48, -1.39, 0.018, cyanUiMat);
  const table_cyan_value_2 = createPixelText("10", 0.48, -1.63, 0.018, cyanUiMat);
  const table_cyan_value_3 = createPixelText("150", 1.28, -1.63, 0.018, cyanUiMat);
  const table_cyan_value_4 = createPixelText("100", 1.28, -1.91, 0.018, cyanUiMat);
  table_cyan_values.add(
    table_cyan_value_1,
    table_cyan_value_2,
    table_cyan_value_3,
    table_cyan_value_4
  );
  screen_content.add(table_cyan_values);

  const navigation_iconGeom = new THREE.CircleGeometry(0.045, 12);
  const navigation_icons = new THREE.InstancedMesh(navigation_iconGeom, whiteUiMat, 8);
  for (let i = 0; i < 8; i++) {
    transform_dummy.position.set(-1.48 + i * 0.41, -2.075, 0.39);
    transform_dummy.rotation.set(0, 0, i * 0.31);
    transform_dummy.scale.set(1, 0.72, 1);
    transform_dummy.updateMatrix();
    navigation_icons.setMatrixAt(i, transform_dummy.matrix);
  }
  navigation_icons.instanceMatrix.needsUpdate = true;
  screen_content.add(navigation_icons);

  const navigation_labels = new THREE.Group();
  navigation_labels.position.z = 0.39;
  for (let i = 0; i < 8; i++) {
    const label = createPixelText("A", -1.48 + i * 0.41, -2.14, 0.009, whiteUiMat);
    navigation_labels.add(label);
  }
  screen_content.add(navigation_labels);

  const power_button_ringGeom = new THREE.TorusGeometry(0.245, 0.025, 10, 32);
  const power_button_ring = new THREE.Mesh(power_button_ringGeom, rubberMat);
  power_button_ring.position.set(0, -2.62, 0.35);
  root.add(power_button_ring);

  const power_buttonGeom = new THREE.CircleGeometry(0.218, 32);
  const power_button = new THREE.Mesh(power_buttonGeom, housingMat);
  power_button.position.set(0, -2.62, 0.352);
  root.add(power_button);

  const power_icon_arcGeom = new THREE.TorusGeometry(0.075, 0.012, 6, 24, Math.PI * 1.55);
  const power_icon_arc = new THREE.Mesh(power_icon_arcGeom, rubberMat);
  power_icon_arc.position.set(0, -2.64, 0.365);
  power_icon_arc.rotation.z = Math.PI * 0.72;
  root.add(power_icon_arc);

  const power_icon_stemGeom = new THREE.BoxGeometry(0.025, 0.11, 0.012);
  const power_icon_stem = new THREE.Mesh(power_icon_stemGeom, rubberMat);
  power_icon_stem.position.set(0, -2.56, 0.366);
  root.add(power_icon_stem);

  const status_ledGeom = new THREE.CircleGeometry(0.035, 16);
  const status_led = new THREE.Mesh(status_ledGeom, rubberMat);
  status_led.position.set(-0.43, -2.62, 0.354);
  root.add(status_led);

  const side_buttonGeom = new THREE.BoxGeometry(0.035, 0.34, 0.12);
  const side_button = new THREE.Mesh(side_buttonGeom, rearMat);
  side_button.position.set(-bodyW / 2 - 0.015, 1.62, -0.02);
  root.add(side_button);

  const lower_side_slotGeom = new THREE.BoxGeometry(0.025, 0.28, 0.1);
  const lower_side_slot = new THREE.Mesh(lower_side_slotGeom, rearMat);
  lower_side_slot.position.set(-bodyW / 2 - 0.012, -1.75, -0.03);
  root.add(lower_side_slot);

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
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }
}