export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 1.04;
  const bodyH = 1.44;
  const bodyD = 0.14;

  const housingMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const housing_sideMat = new THREE.MeshStandardMaterial({
    color: 0x686b6d,
    metalness: 0.6,
    roughness: 0.5
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.3
  });
  const bezel_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.3
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x06284b,
    emissive: 0x06284b,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.2
  });
  const headerMat = new THREE.MeshStandardMaterial({
    color: 0x0089ed,
    emissive: 0x0089ed,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.2
  });
  const footerMat = new THREE.MeshStandardMaterial({
    color: 0x007bd5,
    emissive: 0x007bd5,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.2
  });
  const tableMat = new THREE.MeshStandardMaterial({
    color: 0x102f50,
    emissive: 0x102f50,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3
  });
  const alertMat = new THREE.MeshStandardMaterial({
    color: 0xe33455,
    emissive: 0xe33455,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.2
  });
  const white_uiMat = new THREE.MeshBasicMaterial({ color: 0xe8f5ff });
  const cyan_uiMat = new THREE.MeshBasicMaterial({ color: 0x43dcff });
  const green_uiMat = new THREE.MeshBasicMaterial({ color: 0x55f18a });
  const yellow_uiMat = new THREE.MeshBasicMaterial({ color: 0xffd84a });
  const magenta_uiMat = new THREE.MeshBasicMaterial({ color: 0xff4ac8 });
  const orange_uiMat = new THREE.MeshBasicMaterial({ color: 0xff9c35 });
  const red_uiMat = new THREE.MeshBasicMaterial({ color: 0xff4060 });
  const iconMat = new THREE.MeshBasicMaterial({ color: 0x768188 });
  const indicatorMat = new THREE.MeshBasicMaterial({ color: 0x111519 });

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

  function roundedRectGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth: depth,
        steps: 1,
        curveSegments: 10,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: bevel > 0 ? 3 : 1
      }
    );
  }

  function addUiBox(parent, width, height, material, x, y, z) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.0015),
      material
    );
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addPolyline(parent, points, material, radius, z) {
    const pathPoints = [];
    for (let i = 0; i < points.length; i++) {
      pathPoints.push(new THREE.Vector3(points[i][0], points[i][1], z));
    }
    const path = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      path,
      Math.max(24, points.length * 4),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    parent.add(mesh);
    return mesh;
  }

  const housingGeom = roundedRectGeometry(bodyW, bodyH, 0.095, bodyD, 0.018);
  const housing = new THREE.Mesh(housingGeom, housingMat);
  housing.position.z = -bodyD / 2;
  root.add(housing);

  const rear_shellGeom = roundedRectGeometry(0.99, 1.38, 0.085, 0.025, 0.01);
  const rear_shell = new THREE.Mesh(rear_shellGeom, housing_sideMat);
  rear_shell.position.z = -0.112;
  root.add(rear_shell);

  const left_side_seamGeom = new THREE.BoxGeometry(0.008, 0.86, 0.012);
  const left_side_seam = new THREE.Mesh(left_side_seamGeom, housing_sideMat);
  left_side_seam.position.set(-0.537, 0.08, -0.025);
  root.add(left_side_seam);

  const left_side_buttonGeom = new THREE.BoxGeometry(0.012, 0.075, 0.026);
  const left_side_button = new THREE.Mesh(left_side_buttonGeom, housing_sideMat);
  left_side_button.position.set(-0.542, 0.40, -0.005);
  root.add(left_side_button);

  const front_bezelGeom = roundedRectGeometry(0.96, 1.12, 0.065, 0.016, 0.006);
  const front_bezel = new THREE.Mesh(front_bezelGeom, bezel_edgeMat);
  front_bezel.position.set(0, 0.12, 0.069);
  root.add(front_bezel);

  const bezel_insetGeom = roundedRectGeometry(0.925, 1.075, 0.055, 0.009, 0.004);
  const bezel_inset = new THREE.Mesh(bezel_insetGeom, bezelMat);
  bezel_inset.position.set(0, 0.12, 0.082);
  root.add(bezel_inset);

  const display_group = new THREE.Group();
  display_group.position.set(0, 0.12, 0.094);
  root.add(display_group);

  const screen_backgroundGeom = roundedRectGeometry(0.75, 0.82, 0.014, 0.004, 0);
  const screen_background = new THREE.Mesh(screen_backgroundGeom, screenMat);
  display_group.add(screen_background);

  const top_headerGeom = new THREE.BoxGeometry(0.72, 0.064, 0.002);
  const top_header = new THREE.Mesh(top_headerGeom, headerMat);
  top_header.position.set(0, 0.378, 0.007);
  display_group.add(top_header);

  const header_dividerGeom = new THREE.BoxGeometry(0.72, 0.004, 0.002);
  const header_divider = new THREE.Mesh(header_dividerGeom, cyan_uiMat);
  header_divider.position.set(0, 0.344, 0.008);
  display_group.add(header_divider);

  const header_logoGeom = new THREE.OctahedronGeometry(0.018, 0);
  const header_logo = new THREE.Mesh(header_logoGeom, green_uiMat);
  header_logo.position.set(-0.322, 0.379, 0.013);
  header_logo.scale.set(0.8, 1.0, 0.25);
  display_group.add(header_logo);

  const header_logo_centerGeom = new THREE.BoxGeometry(0.007, 0.025, 0.001);
  const header_logo_center = new THREE.Mesh(header_logo_centerGeom, cyan_uiMat);
  header_logo_center.position.set(-0.322, 0.379, 0.018);
  header_logo_center.rotation.z = -0.45;
  display_group.add(header_logo_center);

  const header_textGeom = new THREE.BoxGeometry(0.025, 0.006, 0.001);
  const header_text = new THREE.InstancedMesh(header_textGeom, white_uiMat, 8);
  const headerTextData = [
    [-0.266, 0.382, 1.1],
    [-0.235, 0.382, 0.7],
    [-0.210, 0.382, 1.0],
    [-0.181, 0.382, 0.8],
    [-0.154, 0.382, 1.2],
    [-0.120, 0.382, 0.65],
    [-0.098, 0.382, 0.9],
    [-0.072, 0.382, 0.7]
  ];
  for (let i = 0; i < headerTextData.length; i++) {
    const item = headerTextData[i];
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(item[0], item[1], 0.012),
      new THREE.Quaternion(),
      new THREE.Vector3(item[2], 1, 1)
    );
    header_text.setMatrixAt(i, matrix);
  }
  header_text.instanceMatrix.needsUpdate = true;
  display_group.add(header_text);

  const header_status_buttonGeom = new THREE.BoxGeometry(0.044, 0.026, 0.002);
  const header_status_button = new THREE.Mesh(header_status_buttonGeom, footerMat);
  header_status_button.position.set(0.245, 0.379, 0.011);
  display_group.add(header_status_button);

  const header_status_markGeom = new THREE.BoxGeometry(0.020, 0.005, 0.001);
  const header_status_mark = new THREE.Mesh(header_status_markGeom, white_uiMat);
  header_status_mark.position.set(0.245, 0.379, 0.014);
  display_group.add(header_status_mark);

  const header_alert_buttonGeom = new THREE.BoxGeometry(0.064, 0.032, 0.002);
  const header_alert_button = new THREE.Mesh(header_alert_buttonGeom, alertMat);
  header_alert_button.position.set(0.326, 0.379, 0.011);
  display_group.add(header_alert_button);

  const header_alert_markGeom = new THREE.BoxGeometry(0.025, 0.006, 0.001);
  const header_alert_mark = new THREE.Mesh(header_alert_markGeom, white_uiMat);
  header_alert_mark.position.set(0.326, 0.379, 0.014);
  header_alert_mark.rotation.z = 0.15;
  display_group.add(header_alert_mark);

  const upper_chart = new THREE.Group();
  display_group.add(upper_chart);

  const upper_chart_backgroundGeom = new THREE.BoxGeometry(0.64, 0.26, 0.001);
  const upper_chart_background = new THREE.Mesh(upper_chart_backgroundGeom, tableMat);
  upper_chart_background.position.set(0, 0.145, 0.004);
  upper_chart.add(upper_chart_background);

  const upper_chart_left_border = addUiBox(
    upper_chart, 0.003, 0.26, cyan_uiMat, -0.321, 0.145, 0.007
  );
  const upper_chart_right_border = addUiBox(
    upper_chart, 0.003, 0.26, cyan_uiMat, 0.321, 0.145, 0.007
  );
  const upper_chart_top_border = addUiBox(
    upper_chart, 0.64, 0.003, cyan_uiMat, 0, 0.275, 0.007
  );
  const upper_chart_bottom_border = addUiBox(
    upper_chart, 0.64, 0.003, cyan_uiMat, 0, 0.015, 0.007
  );

  const upper_grid_verticalGeom = new THREE.BoxGeometry(0.0015, 0.245, 0.001);
  const upper_grid_vertical = new THREE.InstancedMesh(
    upper_grid_verticalGeom, cyan_uiMat, 6
  );
  for (let i = 0; i < 6; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(-0.25 + i * 0.10, 0.145, 0.006);
    upper_grid_vertical.setMatrixAt(i, matrix);
  }
  upper_grid_vertical.instanceMatrix.needsUpdate = true;
  upper_chart.add(upper_grid_vertical);

  const upper_grid_horizontalGeom = new THREE.BoxGeometry(0.62, 0.0015, 0.001);
  const upper_grid_horizontal = new THREE.InstancedMesh(
    upper_grid_horizontalGeom, cyan_uiMat, 5
  );
  for (let i = 0; i < 5; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(0, 0.045 + i * 0.05, 0.006);
    upper_grid_horizontal.setMatrixAt(i, matrix);
  }
  upper_grid_horizontal.instanceMatrix.needsUpdate = true;
  upper_chart.add(upper_grid_horizontal);

  const upper_green_line = addPolyline(
    upper_chart,
    [
      [-0.31, 0.145], [-0.25, 0.195], [-0.19, 0.235], [-0.13, 0.215],
      [-0.07, 0.125], [-0.01, 0.075], [0.05, 0.252], [0.10, 0.112]
    ],
    green_uiMat, 0.0032, 0.013
  );

  const upper_magenta_line = addPolyline(
    upper_chart,
    [
      [-0.31, 0.115], [-0.25, 0.078], [-0.19, 0.105], [-0.13, 0.218],
      [-0.07, 0.195], [-0.01, 0.068], [0.05, 0.266], [0.11, 0.155],
      [0.17, 0.092], [0.23, 0.088], [0.29, 0.125], [0.31, 0.255]
    ],
    magenta_uiMat, 0.0032, 0.014
  );

  const upper_cyan_line = addPolyline(
    upper_chart,
    [
      [-0.31, 0.145], [-0.25, 0.066], [-0.19, 0.072], [-0.13, 0.118],
      [-0.07, 0.195], [-0.01, 0.065], [0.05, 0.064], [0.11, 0.074],
      [0.17, 0.086], [0.23, 0.252], [0.27, 0.145], [0.31, 0.075]
    ],
    cyan_uiMat, 0.0032, 0.015
  );

  const upper_orange_line = addPolyline(
    upper_chart,
    [
      [-0.31, 0.145], [-0.25, 0.125], [-0.19, 0.085], [-0.13, 0.066],
      [-0.07, 0.067], [-0.01, 0.066], [0.05, 0.071], [0.11, 0.082],
      [0.17, 0.105], [0.23, 0.155], [0.27, 0.215], [0.31, 0.258]
    ],
    orange_uiMat, 0.0032, 0.016
  );

  const upper_yellow_segment = addPolyline(
    upper_chart,
    [
      [-0.13, 0.218], [-0.10, 0.175], [-0.07, 0.115], [-0.04, 0.070]
    ],
    yellow_uiMat, 0.0035, 0.017
  );

  const chart_markerGeom = new THREE.SphereGeometry(0.006, 10, 6);
  const upper_chart_markers = new THREE.InstancedMesh(chart_markerGeom, yellow_uiMat, 7);
  const upperMarkerData = [
    [-0.19, 0.235], [-0.07, 0.195], [0.05, 0.266], [0.17, 0.092],
    [0.23, 0.252], [0.27, 0.215], [0.31, 0.258]
  ];
  for (let i = 0; i < upperMarkerData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(upperMarkerData[i][0], upperMarkerData[i][1], 0.019),
      new THREE.Quaternion(),
      new THREE.Vector3(1, 1, 0.35)
    );
    upper_chart_markers.setMatrixAt(i, matrix);
  }
  upper_chart_markers.instanceMatrix.needsUpdate = true;
  upper_chart.add(upper_chart_markers);

  const upper_chart_labelsGeom = new THREE.BoxGeometry(0.020, 0.004, 0.001);
  const upper_chart_labels = new THREE.InstancedMesh(
    upper_chart_labelsGeom, white_uiMat, 12
  );
  const upperLabelData = [
    [-0.30, 0.032], [-0.24, 0.032], [-0.16, 0.032], [-0.08, 0.032],
    [0.00, 0.032], [0.08, 0.032], [0.16, 0.032], [0.24, 0.032],
    [0.30, 0.032], [-0.342, 0.085], [-0.342, 0.155], [-0.342, 0.225]
  ];
  for (let i = 0; i < upperLabelData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(upperLabelData[i][0], upperLabelData[i][1], 0.017);
    upper_chart_labels.setMatrixAt(i, matrix);
  }
  upper_chart_labels.instanceMatrix.needsUpdate = true;
  upper_chart.add(upper_chart_labels);

  const title_glyphGeom = new THREE.BoxGeometry(0.018, 0.006, 0.001);
  const chart_title_glyphs = new THREE.InstancedMesh(title_glyphGeom, white_uiMat, 10);
  for (let i = 0; i < 10; i++) {
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(-0.30 + i * 0.026, 0.316, 0.014),
      new THREE.Quaternion(),
      new THREE.Vector3(0.65 + (i % 3) * 0.22, 1, 1)
    );
    chart_title_glyphs.setMatrixAt(i, matrix);
  }
  chart_title_glyphs.instanceMatrix.needsUpdate = true;
  display_group.add(chart_title_glyphs);

  const status_avatarGeom = new THREE.CircleGeometry(0.018, 18);
  const status_avatar = new THREE.Mesh(status_avatarGeom, yellow_uiMat);
  status_avatar.position.set(0.255, 0.309, 0.015);
  display_group.add(status_avatar);

  const status_avatar_body = addUiBox(
    display_group, 0.025, 0.022, yellow_uiMat, 0.255, 0.286, 0.015
  );
  status_avatar_body.rotation.z = -0.12;

  const status_readout_one = addUiBox(
    display_group, 0.035, 0.008, white_uiMat, 0.318, 0.315, 0.015
  );
  const status_readout_two = addUiBox(
    display_group, 0.026, 0.008, cyan_uiMat, 0.323, 0.298, 0.015
  );

  const separator_stripGeom = new THREE.BoxGeometry(0.72, 0.018, 0.002);
  const separator_strip = new THREE.Mesh(separator_stripGeom, footerMat);
  separator_strip.position.set(0, -0.002, 0.008);
  display_group.add(separator_strip);

  const separator_markerGeom = new THREE.BoxGeometry(0.025, 0.006, 0.001);
  const separator_marker = new THREE.Mesh(separator_markerGeom, cyan_uiMat);
  separator_marker.position.set(0, -0.002, 0.012);
  display_group.add(separator_marker);

  const lower_chart = new THREE.Group();
  display_group.add(lower_chart);

  const lower_chart_backgroundGeom = new THREE.BoxGeometry(0.64, 0.23, 0.001);
  const lower_chart_background = new THREE.Mesh(lower_chart_backgroundGeom, tableMat);
  lower_chart_background.position.set(0, -0.125, 0.004);
  lower_chart.add(lower_chart_background);

  const lower_chart_left_border = addUiBox(
    lower_chart, 0.003, 0.23, cyan_uiMat, -0.321, -0.125, 0.007
  );
  const lower_chart_right_border = addUiBox(
    lower_chart, 0.003, 0.23, cyan_uiMat, 0.321, -0.125, 0.007
  );
  const lower_chart_top_border = addUiBox(
    lower_chart, 0.64, 0.003, cyan_uiMat, 0, -0.010, 0.007
  );
  const lower_chart_bottom_border = addUiBox(
    lower_chart, 0.64, 0.003, cyan_uiMat, 0, -0.240, 0.007
  );

  const lower_grid_verticalGeom = new THREE.BoxGeometry(0.0015, 0.218, 0.001);
  const lower_grid_vertical = new THREE.InstancedMesh(
    lower_grid_verticalGeom, cyan_uiMat, 6
  );
  for (let i = 0; i < 6; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(-0.25 + i * 0.10, -0.125, 0.006);
    lower_grid_vertical.setMatrixAt(i, matrix);
  }
  lower_grid_vertical.instanceMatrix.needsUpdate = true;
  lower_chart.add(lower_grid_vertical);

  const lower_grid_horizontalGeom = new THREE.BoxGeometry(0.62, 0.0015, 0.001);
  const lower_grid_horizontal = new THREE.InstancedMesh(
    lower_grid_horizontalGeom, cyan_uiMat, 5
  );
  for (let i = 0; i < 5; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(0, -0.215 + i * 0.045, 0.006);
    lower_grid_horizontal.setMatrixAt(i, matrix);
  }
  lower_grid_horizontal.instanceMatrix.needsUpdate = true;
  lower_chart.add(lower_grid_horizontal);

  const lower_green_line = addPolyline(
    lower_chart,
    [
      [-0.31, -0.220], [-0.25, -0.205], [-0.19, -0.180], [-0.13, -0.115],
      [-0.07, -0.075], [-0.01, -0.120], [0.05, -0.205], [0.11, -0.215],
      [0.17, -0.105], [0.23, -0.060], [0.29, -0.050], [0.31, -0.045]
    ],
    green_uiMat, 0.0032, 0.013
  );

  const lower_magenta_line = addPolyline(
    lower_chart,
    [
      [-0.31, -0.220], [-0.25, -0.175], [-0.19, -0.110], [-0.13, -0.075],
      [-0.07, -0.105], [-0.01, -0.155], [0.05, -0.185], [0.11, -0.175],
      [0.17, -0.150], [0.23, -0.145], [0.27, -0.100], [0.31, -0.080]
    ],
    magenta_uiMat, 0.0032, 0.014
  );

  const lower_cyan_line = addPolyline(
    lower_chart,
    [
      [-0.31, -0.220], [-0.25, -0.145], [-0.19, -0.080], [-0.13, -0.072],
      [-0.07, -0.115], [-0.01, -0.198], [0.05, -0.175], [0.11, -0.115],
      [0.17, -0.080], [0.23, -0.060], [0.29, -0.050], [0.31, -0.045]
    ],
    cyan_uiMat, 0.0032, 0.015
  );

  const lower_orange_line = addPolyline(
    lower_chart,
    [
      [-0.31, -0.220], [-0.25, -0.190], [-0.19, -0.130], [-0.13, -0.105],
      [-0.07, -0.150], [-0.01, -0.205], [0.05, -0.155], [0.11, -0.100],
      [0.17, -0.080], [0.23, -0.090], [0.27, -0.035], [0.31, -0.055]
    ],
    orange_uiMat, 0.0032, 0.016
  );

  const lower_chart_markers = new THREE.InstancedMesh(chart_markerGeom, yellow_uiMat, 6);
  const lowerMarkerData = [
    [-0.19, -0.110], [-0.13, -0.075], [-0.01, -0.198], [0.17, -0.105],
    [0.23, -0.060], [0.31, -0.045]
  ];
  for (let i = 0; i < lowerMarkerData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(lowerMarkerData[i][0], lowerMarkerData[i][1], 0.019),
      new THREE.Quaternion(),
      new THREE.Vector3(1, 1, 0.35)
    );
    lower_chart_markers.setMatrixAt(i, matrix);
  }
  lower_chart_markers.instanceMatrix.needsUpdate = true;
  lower_chart.add(lower_chart_markers);

  const lower_chart_labelsGeom = new THREE.BoxGeometry(0.020, 0.004, 0.001);
  const lower_chart_labels = new THREE.InstancedMesh(
    lower_chart_labelsGeom, white_uiMat, 11
  );
  const lowerLabelData = [
    [-0.30, -0.228], [-0.24, -0.228], [-0.16, -0.228], [-0.08, -0.228],
    [0.00, -0.228], [0.08, -0.228], [0.16, -0.228], [0.24, -0.228],
    [0.30, -0.228], [-0.342, -0.165], [-0.342, -0.085]
  ];
  for (let i = 0; i < lowerLabelData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(lowerLabelData[i][0], lowerLabelData[i][1], 0.017);
    lower_chart_labels.setMatrixAt(i, matrix);
  }
  lower_chart_labels.instanceMatrix.needsUpdate = true;
  lower_chart.add(lower_chart_labels);

  const lower_title_glyphs = new THREE.InstancedMesh(title_glyphGeom, white_uiMat, 7);
  for (let i = 0; i < 7; i++) {
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(-0.30 + i * 0.024, -0.028, 0.014),
      new THREE.Quaternion(),
      new THREE.Vector3(0.75 + (i % 2) * 0.3, 1, 1)
    );
    lower_title_glyphs.setMatrixAt(i, matrix);
  }
  lower_title_glyphs.instanceMatrix.needsUpdate = true;
  display_group.add(lower_title_glyphs);

  const data_tableGeom = new THREE.BoxGeometry(0.72, 0.106, 0.002);
  const data_table = new THREE.Mesh(data_tableGeom, tableMat);
  data_table.position.set(0, -0.314, 0.006);
  display_group.add(data_table);

  const data_table_top_border = addUiBox(
    display_group, 0.72, 0.003, cyan_uiMat, 0, -0.260, 0.010
  );
  const data_table_bottom_border = addUiBox(
    display_group, 0.72, 0.003, cyan_uiMat, 0, -0.367, 0.010
  );

  const table_column_dividersGeom = new THREE.BoxGeometry(0.0015, 0.096, 0.001);
  const table_column_dividers = new THREE.InstancedMesh(
    table_column_dividersGeom, cyan_uiMat, 7
  );
  for (let i = 0; i < 7; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(-0.30 + i * 0.10, -0.314, 0.009);
    table_column_dividers.setMatrixAt(i, matrix);
  }
  table_column_dividers.instanceMatrix.needsUpdate = true;
  display_group.add(table_column_dividers);

  const table_header_marksGeom = new THREE.BoxGeometry(0.032, 0.005, 0.001);
  const table_header_marks = new THREE.InstancedMesh(
    table_header_marksGeom, white_uiMat, 14
  );
  for (let i = 0; i < 14; i++) {
    const column = i % 7;
    const row = Math.floor(i / 7);
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(-0.30 + column * 0.10, -0.278 - row * 0.018, 0.013),
      new THREE.Quaternion(),
      new THREE.Vector3(0.55 + (i % 3) * 0.2, 1, 1)
    );
    table_header_marks.setMatrixAt(i, matrix);
  }
  table_header_marks.instanceMatrix.needsUpdate = true;
  display_group.add(table_header_marks);

  const green_table_cellsGeom = new THREE.BoxGeometry(0.030, 0.008, 0.001);
  const green_table_cells = new THREE.InstancedMesh(
    green_table_cellsGeom, green_uiMat, 8
  );
  const greenCellData = [
    [-0.30, -0.302], [-0.30, -0.322], [-0.20, -0.302], [-0.20, -0.342],
    [-0.10, -0.322], [0.00, -0.302], [0.10, -0.322], [0.20, -0.342]
  ];
  for (let i = 0; i < greenCellData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(greenCellData[i][0], greenCellData[i][1], 0.014);
    green_table_cells.setMatrixAt(i, matrix);
  }
  green_table_cells.instanceMatrix.needsUpdate = true;
  display_group.add(green_table_cells);

  const cyan_table_cellsGeom = new THREE.BoxGeometry(0.030, 0.008, 0.001);
  const cyan_table_cells = new THREE.InstancedMesh(
    cyan_table_cellsGeom, cyan_uiMat, 8
  );
  const cyanCellData = [
    [-0.30, -0.342], [-0.20, -0.282], [-0.20, -0.322], [-0.10, -0.282],
    [-0.10, -0.342], [0.00, -0.322], [0.00, -0.342], [0.20, -0.282]
  ];
  for (let i = 0; i < cyanCellData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(cyanCellData[i][0], cyanCellData[i][1], 0.014);
    cyan_table_cells.setMatrixAt(i, matrix);
  }
  cyan_table_cells.instanceMatrix.needsUpdate = true;
  display_group.add(cyan_table_cells);

  const red_table_cellsGeom = new THREE.BoxGeometry(0.030, 0.008, 0.001);
  const red_table_cells = new THREE.InstancedMesh(
    red_table_cellsGeom, red_uiMat, 7
  );
  const redCellData = [
    [-0.10, -0.302], [-0.10, -0.342], [0.00, -0.282], [0.10, -0.282],
    [0.10, -0.342], [0.20, -0.302], [0.30, -0.322]
  ];
  for (let i = 0; i < redCellData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(redCellData[i][0], redCellData[i][1], 0.014);
    red_table_cells.setMatrixAt(i, matrix);
  }
  red_table_cells.instanceMatrix.needsUpdate = true;
  display_group.add(red_table_cells);

  const yellow_table_cellsGeom = new THREE.BoxGeometry(0.030, 0.008, 0.001);
  const yellow_table_cells = new THREE.InstancedMesh(
    yellow_table_cellsGeom, yellow_uiMat, 5
  );
  const yellowCellData = [
    [-0.20, -0.342], [-0.10, -0.322], [0.10, -0.302], [0.20, -0.322],
    [0.30, -0.342]
  ];
  for (let i = 0; i < yellowCellData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(yellowCellData[i][0], yellowCellData[i][1], 0.014);
    yellow_table_cells.setMatrixAt(i, matrix);
  }
  yellow_table_cells.instanceMatrix.needsUpdate = true;
  display_group.add(yellow_table_cells);

  const bottom_navigationGeom = new THREE.BoxGeometry(0.72, 0.052, 0.002);
  const bottom_navigation = new THREE.Mesh(bottom_navigationGeom, footerMat);
  bottom_navigation.position.set(0, -0.388, 0.008);
  display_group.add(bottom_navigation);

  const nav_back_iconShape = new THREE.Shape();
  nav_back_iconShape.moveTo(-0.014, 0);
  nav_back_iconShape.lineTo(0.011, 0.012);
  nav_back_iconShape.lineTo(0.011, -0.012);
  nav_back_iconShape.closePath();
  const nav_back_iconGeom = new THREE.ShapeGeometry(nav_back_iconShape);
  const nav_back_icon = new THREE.Mesh(nav_back_iconGeom, white_uiMat);
  nav_back_icon.position.set(-0.315, -0.388, 0.013);
  display_group.add(nav_back_icon);

  const nav_square_iconGeom = new THREE.BoxGeometry(0.025, 0.021, 0.001);
  const nav_square_icon = new THREE.Mesh(nav_square_iconGeom, white_uiMat);
  nav_square_icon.position.set(-0.205, -0.388, 0.013);
  display_group.add(nav_square_icon);

  const nav_square_insetGeom = new THREE.BoxGeometry(0.017, 0.013, 0.001);
  const nav_square_inset = new THREE.Mesh(nav_square_insetGeom, footerMat);
  nav_square_inset.position.set(-0.205, -0.388, 0.015);
  display_group.add(nav_square_inset);

  const nav_home_iconShape = new THREE.Shape();
  nav_home_iconShape.moveTo(-0.013, -0.010);
  nav_home_iconShape.lineTo(-0.013, 0.008);
  nav_home_iconShape.lineTo(0.013, 0.008);
  nav_home_iconShape.lineTo(0.013, -0.010);
  nav_home_iconShape.lineTo(0.000, -0.016);
  nav_home_iconShape.closePath();
  const nav_home_iconGeom = new THREE.ShapeGeometry(nav_home_iconShape);
  const nav_home_icon = new THREE.Mesh(nav_home_iconGeom, green_uiMat);
  nav_home_icon.position.set(-0.085, -0.388, 0.013);
  display_group.add(nav_home_icon);

  const nav_center_iconGeom = new THREE.BoxGeometry(0.030, 0.025, 0.001);
  const nav_center_icon = new THREE.Mesh(nav_center_iconGeom, yellow_uiMat);
  nav_center_icon.position.set(0.030, -0.388, 0.013);
  display_group.add(nav_center_icon);

  const nav_status_iconGeom = new THREE.BoxGeometry(0.030, 0.021, 0.001);
  const nav_status_icon = new THREE.Mesh(nav_status_iconGeom, green_uiMat);
  nav_status_icon.position.set(0.145, -0.388, 0.013);
  display_group.add(nav_status_icon);

  const nav_menu_barsGeom = new THREE.BoxGeometry(0.025, 0.005, 0.001);
  const nav_menu_bars = new THREE.InstancedMesh(nav_menu_barsGeom, white_uiMat, 8);
  const navMenuData = [
    [0.225, -0.388], [0.260, -0.388], [0.295, -0.388],
    [0.325, -0.380], [0.325, -0.396], [0.225, -0.374],
    [0.260, -0.374], [0.295, -0.374]
  ];
  for (let i = 0; i < navMenuData.length; i++) {
    const matrix = new THREE.Matrix4();
    matrix.makeTranslation(navMenuData[i][0], navMenuData[i][1], 0.013);
    nav_menu_bars.setMatrixAt(i, matrix);
  }
  nav_menu_bars.instanceMatrix.needsUpdate = true;
  display_group.add(nav_menu_bars);

  const power_buttonGeom = new THREE.CylinderGeometry(0.061, 0.061, 0.012, 32);
  const power_button = new THREE.Mesh(power_buttonGeom, housing_sideMat);
  power_button.rotation.x = Math.PI / 2;
  power_button.position.set(0.14, -0.565, 0.092);
  root.add(power_button);

  const power_button_ringGeom = new THREE.TorusGeometry(0.061, 0.004, 8, 32);
  const power_button_ring = new THREE.Mesh(power_button_ringGeom, indicatorMat);
  power_button_ring.position.set(0.14, -0.565, 0.101);
  root.add(power_button_ring);

  const power_icon_arcGeom = new THREE.TorusGeometry(
    0.025, 0.003, 6, 24, Math.PI * 1.5
  );
  const power_icon_arc = new THREE.Mesh(power_icon_arcGeom, iconMat);
  power_icon_arc.position.set(0.14, -0.568, 0.106);
  power_icon_arc.rotation.z = Math.PI * 0.75;
  root.add(power_icon_arc);

  const power_icon_stemGeom = new THREE.BoxGeometry(0.006, 0.029, 0.003);
  const power_icon_stem = new THREE.Mesh(power_icon_stemGeom, iconMat);
  power_icon_stem.position.set(0.14, -0.548, 0.106);
  root.add(power_icon_stem);

  const status_ledGeom = new THREE.SphereGeometry(0.008, 12, 8);
  const status_led = new THREE.Mesh(status_ledGeom, indicatorMat);
  status_led.position.set(0.035, -0.566, 0.099);
  status_led.scale.set(1, 1, 0.45);
  root.add(status_led);

  fitToUnitCube(root);
  return root;

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
}