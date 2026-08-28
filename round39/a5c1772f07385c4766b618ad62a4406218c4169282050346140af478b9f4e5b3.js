export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "luminous_cow_milk_carton";

  const cartonW = 0.90;
  const cartonD = 0.70;
  const bodyBottom = 0.10;
  const bodyTop = 1.02;
  const bodyH = bodyTop - bodyBottom;
  const roofRise = 0.38;
  const roofPeak = bodyTop + roofRise;
  const roofSlope = Math.sqrt((cartonD * 0.5) ** 2 + roofRise ** 2);
  const roofAngle = Math.atan2(roofRise, cartonD * 0.5);

  const blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x0750e8,
    metalness: 0.0,
    roughness: 0.3
  });
  const dark_blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x003394,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyan_acrylicMat = new THREE.MeshStandardMaterial({
    color: 0x00bde9,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.78
  });
  const frosted_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x8eefff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.82
  });
  const neonMat = new THREE.MeshStandardMaterial({
    color: 0x7fffff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x7fffff,
    emissiveIntensity: 1.0
  });
  const neon_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffffff,
    emissiveIntensity: 1.0
  });
  const dark_inkMat = new THREE.MeshStandardMaterial({
    color: 0x00225f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pale_inkMat = new THREE.MeshStandardMaterial({
    color: 0x8edfff,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const carton_bodyGeom = new THREE.BoxGeometry(cartonW, bodyH, cartonD);
  const carton_body = new THREE.Mesh(carton_bodyGeom, blue_plasticMat);
  carton_body.name = "carton_body";
  carton_body.position.y = bodyBottom + bodyH * 0.5;
  root.add(carton_body);

  const front_panelGeom = new THREE.BoxGeometry(
    cartonW - 0.065,
    bodyH - 0.09,
    0.012
  );
  const front_panel = new THREE.Mesh(front_panelGeom, blue_plasticMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, bodyBottom + bodyH * 0.5, cartonD * 0.5 + 0.006);
  root.add(front_panel);

  const side_panelGeom = new THREE.BoxGeometry(
    0.012,
    bodyH - 0.09,
    cartonD - 0.065
  );
  const left_side_panel = new THREE.Mesh(side_panelGeom, blue_plasticMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(
    -cartonW * 0.5 - 0.006,
    bodyBottom + bodyH * 0.5,
    0
  );
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, blue_plasticMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(
    cartonW * 0.5 + 0.006,
    bodyBottom + bodyH * 0.5,
    0
  );
  root.add(right_side_panel);

  const bottom_baseGeom = new THREE.BoxGeometry(
    cartonW + 0.035,
    0.075,
    cartonD + 0.035
  );
  const bottom_base = new THREE.Mesh(bottom_baseGeom, dark_blue_plasticMat);
  bottom_base.name = "bottom_base";
  bottom_base.position.y = 0.075;
  root.add(bottom_base);

  const front_roofGeom = new THREE.BoxGeometry(
    cartonW + 0.035,
    0.035,
    roofSlope
  );
  const front_roof = new THREE.Mesh(front_roofGeom, blue_plasticMat);
  front_roof.name = "front_roof";
  front_roof.position.set(0, bodyTop + roofRise * 0.5, cartonD * 0.25);
  front_roof.rotation.x = roofAngle;
  root.add(front_roof);

  const back_roofGeom = front_roofGeom;
  const back_roof = new THREE.Mesh(back_roofGeom, blue_plasticMat);
  back_roof.name = "back_roof";
  back_roof.position.set(0, bodyTop + roofRise * 0.5, -cartonD * 0.25);
  back_roof.rotation.x = -roofAngle;
  root.add(back_roof);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-cartonD * 0.5, 0);
  gableShape.lineTo(cartonD * 0.5, 0);
  gableShape.lineTo(0, roofRise);
  gableShape.closePath();
  const gableGeom = new THREE.ShapeGeometry(gableShape);

  const left_gable = new THREE.Mesh(gableGeom, dark_blue_plasticMat);
  left_gable.name = "left_gable";
  left_gable.rotation.y = -Math.PI * 0.5;
  left_gable.position.set(-cartonW * 0.5 - 0.019, bodyTop, 0);
  root.add(left_gable);

  const right_gable = new THREE.Mesh(gableGeom, dark_blue_plasticMat);
  right_gable.name = "right_gable";
  right_gable.rotation.y = Math.PI * 0.5;
  right_gable.position.set(cartonW * 0.5 + 0.019, bodyTop, 0);
  root.add(right_gable);

  const top_finShape = new THREE.Shape();
  top_finShape.moveTo(-cartonD * 0.5, 0);
  top_finShape.lineTo(cartonD * 0.5, 0);
  top_finShape.lineTo(cartonD * 0.5 - 0.015, 0.155);
  top_finShape.bezierCurveTo(
    cartonD * 0.28, 0.175,
    -cartonD * 0.28, 0.185,
    -cartonD * 0.5 + 0.035, 0.175
  );
  top_finShape.bezierCurveTo(
    -cartonD * 0.5 - 0.012, 0.165,
    -cartonD * 0.5 - 0.012, 0.105,
    -cartonD * 0.5, 0
  );
  top_finShape.closePath();
  const top_finGeom = new THREE.ExtrudeGeometry(top_finShape, {
    depth: cartonW + 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const top_fin = new THREE.Mesh(top_finGeom, blue_plasticMat);
  top_fin.name = "top_fin";
  top_fin.rotation.y = Math.PI * 0.5;
  top_fin.position.set(-cartonW * 0.5 - 0.0125, roofPeak, 0);
  root.add(top_fin);

  const top_fold_lineGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    cartonW + 0.025,
    10
  );
  const top_fold_line = new THREE.Mesh(top_fold_lineGeom, neonMat);
  top_fold_line.name = "top_fold_line";
  top_fold_line.rotation.z = Math.PI * 0.5;
  top_fold_line.position.set(0, roofPeak + 0.055, -cartonD * 0.5 + 0.012);
  root.add(top_fold_line);

  const eave_railGeom = new THREE.CylinderGeometry(
    0.023,
    0.023,
    cartonW + 0.055,
    14
  );
  const front_eave_rail = new THREE.Mesh(eave_railGeom, frosted_edgeMat);
  front_eave_rail.name = "front_eave_rail";
  front_eave_rail.rotation.z = Math.PI * 0.5;
  front_eave_rail.position.set(0, bodyTop, cartonD * 0.5 + 0.012);
  root.add(front_eave_rail);

  const back_eave_rail = new THREE.Mesh(eave_railGeom, frosted_edgeMat);
  back_eave_rail.name = "back_eave_rail";
  back_eave_rail.rotation.z = Math.PI * 0.5;
  back_eave_rail.position.set(0, bodyTop, -cartonD * 0.5 - 0.012);
  root.add(back_eave_rail);

  const side_eaveGeom = new THREE.CylinderGeometry(
    0.023,
    0.023,
    cartonD + 0.045,
    14
  );
  const left_eave_rail = new THREE.Mesh(side_eaveGeom, frosted_edgeMat);
  left_eave_rail.name = "left_eave_rail";
  left_eave_rail.rotation.x = Math.PI * 0.5;
  left_eave_rail.position.set(-cartonW * 0.5 - 0.012, bodyTop, 0);
  root.add(left_eave_rail);

  const right_eave_rail = new THREE.Mesh(side_eaveGeom, frosted_edgeMat);
  right_eave_rail.name = "right_eave_rail";
  right_eave_rail.rotation.x = Math.PI * 0.5;
  right_eave_rail.position.set(cartonW * 0.5 + 0.012, bodyTop, 0);
  root.add(right_eave_rail);

  const roof_ridge_lightGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    cartonW + 0.025,
    12
  );
  const roof_ridge_light = new THREE.Mesh(roof_ridge_lightGeom, neonMat);
  roof_ridge_light.name = "roof_ridge_light";
  roof_ridge_light.rotation.z = Math.PI * 0.5;
  roof_ridge_light.position.set(0, roofPeak + 0.008, 0);
  root.add(roof_ridge_light);

  const bottom_railGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    cartonW + 0.04,
    12
  );
  const front_bottom_rail = new THREE.Mesh(bottom_railGeom, frosted_edgeMat);
  front_bottom_rail.name = "front_bottom_rail";
  front_bottom_rail.rotation.z = Math.PI * 0.5;
  front_bottom_rail.position.set(0, 0.105, cartonD * 0.5 + 0.012);
  root.add(front_bottom_rail);

  const back_bottom_rail = new THREE.Mesh(bottom_railGeom, frosted_edgeMat);
  back_bottom_rail.name = "back_bottom_rail";
  back_bottom_rail.rotation.z = Math.PI * 0.5;
  back_bottom_rail.position.set(0, 0.105, -cartonD * 0.5 - 0.012);
  root.add(back_bottom_rail);

  const corner_postsGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    bodyH - 0.025,
    12
  );
  const corner_posts = new THREE.InstancedMesh(
    corner_postsGeom,
    frosted_edgeMat,
    4
  );
  corner_posts.name = "corner_posts";
  const cornerDummy = new THREE.Object3D();
  const cornerPositions = [
    [-cartonW * 0.5, bodyBottom + bodyH * 0.5, cartonD * 0.5],
    [cartonW * 0.5, bodyBottom + bodyH * 0.5, cartonD * 0.5],
    [-cartonW * 0.5, bodyBottom + bodyH * 0.5, -cartonD * 0.5],
    [cartonW * 0.5, bodyBottom + bodyH * 0.5, -cartonD * 0.5]
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    cornerDummy.position.set(p[0], p[1], p[2]);
    cornerDummy.rotation.set(0, 0, 0);
    cornerDummy.scale.set(1, 1, 1);
    cornerDummy.updateMatrix();
    corner_posts.setMatrixAt(i, cornerDummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const corner_connectorsGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const corner_connectors = new THREE.InstancedMesh(
    corner_connectorsGeom,
    frosted_edgeMat,
    8
  );
  corner_connectors.name = "corner_connectors";
  let connectorIndex = 0;
  for (const x of [-cartonW * 0.5, cartonW * 0.5]) {
    for (const z of [-cartonD * 0.5, cartonD * 0.5]) {
      for (const y of [0.13, 0.99]) {
        cornerDummy.position.set(x, y, z);
        cornerDummy.rotation.set(0, 0, 0);
        cornerDummy.scale.set(1, 1, 1);
        cornerDummy.updateMatrix();
        corner_connectors.setMatrixAt(connectorIndex++, cornerDummy.matrix);
      }
    }
  }
  corner_connectors.instanceMatrix.needsUpdate = true;
  root.add(corner_connectors);

  const front_eave_glowGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    cartonW - 0.04,
    10
  );
  const front_eave_glow = new THREE.Mesh(front_eave_glowGeom, neon_coreMat);
  front_eave_glow.name = "front_eave_glow";
  front_eave_glow.rotation.z = Math.PI * 0.5;
  front_eave_glow.position.set(0, bodyTop + 0.006, cartonD * 0.5 + 0.029);
  root.add(front_eave_glow);

  const front_bottom_glowGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    cartonW - 0.05,
    10
  );
  const front_bottom_glow = new THREE.Mesh(front_bottom_glowGeom, neon_coreMat);
  front_bottom_glow.name = "front_bottom_glow";
  front_bottom_glow.rotation.z = Math.PI * 0.5;
  front_bottom_glow.position.set(0, 0.105, cartonD * 0.5 + 0.029);
  root.add(front_bottom_glow);

  const front_roof_trimGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    roofSlope,
    10
  );
  const front_roof_left_trim = new THREE.Mesh(front_roof_trimGeom, neonMat);
  front_roof_left_trim.name = "front_roof_left_trim";
  front_roof_left_trim.rotation.x = roofAngle;
  front_roof_left_trim.position.set(
    -cartonW * 0.5 - 0.012,
    bodyTop + roofRise * 0.5,
    cartonD * 0.25
  );
  root.add(front_roof_left_trim);

  const front_roof_right_trim = new THREE.Mesh(front_roof_trimGeom, neonMat);
  front_roof_right_trim.name = "front_roof_right_trim";
  front_roof_right_trim.rotation.x = roofAngle;
  front_roof_right_trim.position.set(
    cartonW * 0.5 + 0.012,
    bodyTop + roofRise * 0.5,
    cartonD * 0.25
  );
  root.add(front_roof_right_trim);

  const cow_circleGeom = new THREE.CircleGeometry(1, 28);

  function addEllipse(parent, name, rx, ry, material, x, y, z, rotation) {
    const ellipse = new THREE.Mesh(cow_circleGeom, material);
    ellipse.name = name;
    ellipse.position.set(x, y, z);
    ellipse.scale.set(rx, ry, 1);
    ellipse.rotation.z = rotation || 0;
    parent.add(ellipse);
    return ellipse;
  }

  function addNeonPath(parent, name, coordinates, closed, radius) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(new THREE.Vector3(coordinates[i][0], coordinates[i][1], 0.021));
    }
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const segments = Math.max(8, coordinates.length * 5);

    const outlineGeom = new THREE.TubeGeometry(
      curve,
      segments,
      radius,
      8,
      closed
    );
    const outline = new THREE.Mesh(outlineGeom, neonMat);
    outline.name = name;
    parent.add(outline);

    const coreGeom = new THREE.TubeGeometry(
      curve,
      segments,
      radius * 0.42,
      7,
      closed
    );
    const core = new THREE.Mesh(coreGeom, neon_coreMat);
    core.name = name + "_core";
    core.position.z = radius * 0.70;
    parent.add(core);
    return outline;
  }

  const front_cow = new THREE.Group();
  front_cow.name = "front_cow";
  front_cow.position.set(0, 0.55, cartonD * 0.5 + 0.015);
  front_cow.scale.setScalar(0.84);
  root.add(front_cow);

  const front_cow_body_fill = addEllipse(
    front_cow, "front_cow_body_fill", 0.305, 0.185, dark_inkMat,
    -0.015, -0.105, 0.004, -0.04
  );
  const front_cow_head_fill = addEllipse(
    front_cow, "front_cow_head_fill", 0.165, 0.205, dark_inkMat,
    0.135, 0.115, 0.006, -0.08
  );
  const front_cow_left_ear_fill = addEllipse(
    front_cow, "front_cow_left_ear_fill", 0.075, 0.047, dark_inkMat,
    0.005, 0.205, 0.006, 0.48
  );
  const front_cow_right_ear_fill = addEllipse(
    front_cow, "front_cow_right_ear_fill", 0.075, 0.047, dark_inkMat,
    0.275, 0.205, 0.006, -0.48
  );
  const front_cow_left_horn_fill = addEllipse(
    front_cow, "front_cow_left_horn_fill", 0.033, 0.068, dark_inkMat,
    0.055, 0.305, 0.006, -0.48
  );
  const front_cow_right_horn_fill = addEllipse(
    front_cow, "front_cow_right_horn_fill", 0.033, 0.068, dark_inkMat,
    0.235, 0.315, 0.006, 0.48
  );
  const front_cow_left_eye = addEllipse(
    front_cow, "front_cow_left_eye", 0.020, 0.037, pale_inkMat,
    0.085, 0.165, 0.024, -0.08
  );
  const front_cow_right_eye = addEllipse(
    front_cow, "front_cow_right_eye", 0.020, 0.037, pale_inkMat,
    0.195, 0.175, 0.024, -0.08
  );
  const front_cow_muzzle_fill = addEllipse(
    front_cow, "front_cow_muzzle_fill", 0.165, 0.082, pale_inkMat,
    0.205, -0.015, 0.022, -0.12
  );
  const front_cow_left_nostril = addEllipse(
    front_cow, "front_cow_left_nostril", 0.010, 0.017, dark_inkMat,
    0.155, -0.006, 0.026, -0.25
  );
  const front_cow_right_nostril = addEllipse(
    front_cow, "front_cow_right_nostril", 0.010, 0.017, dark_inkMat,
    0.252, -0.026, 0.026, -0.25
  );

  const front_cow_body_outline = addNeonPath(
    front_cow,
    "front_cow_body_outline",
    [
      [0.10, 0.035], [0.015, 0.070], [-0.105, 0.060],
      [-0.205, 0.015], [-0.270, -0.075], [-0.285, -0.185],
      [-0.255, -0.300], [-0.205, -0.355], [-0.145, -0.345],
      [-0.105, -0.285], [-0.085, -0.165], [0.005, -0.120],
      [0.080, -0.165], [0.115, -0.285], [0.155, -0.350],
      [0.220, -0.350], [0.255, -0.295], [0.235, -0.175],
      [0.215, -0.085], [0.235, 0.005]
    ],
    true,
    0.012
  );

  const front_cow_head_outline = addNeonPath(
    front_cow,
    "front_cow_head_outline",
    [
      [0.045, 0.235], [0.010, 0.270], [0.035, 0.315],
      [0.070, 0.345], [0.105, 0.315], [0.130, 0.280],
      [0.175, 0.305], [0.215, 0.345], [0.250, 0.325],
      [0.260, 0.275], [0.300, 0.245], [0.305, 0.200],
      [0.275, 0.170], [0.250, 0.145], [0.270, 0.080],
      [0.255, 0.015], [0.215, -0.045], [0.165, -0.075],
      [0.105, -0.060], [0.060, -0.010], [0.030, 0.065],
      [0.020, 0.145]
    ],
    true,
    0.012
  );

  const front_cow_left_ear = addNeonPath(
    front_cow,
    "front_cow_left_ear",
    [
      [0.045, 0.235], [-0.015, 0.275], [-0.080, 0.255],
      [-0.095, 0.210], [-0.055, 0.175], [0.010, 0.200]
    ],
    true,
    0.010
  );

  const front_cow_right_ear = addNeonPath(
    front_cow,
    "front_cow_right_ear",
    [
      [0.245, 0.250], [0.305, 0.285], [0.365, 0.260],
      [0.380, 0.215], [0.335, 0.180], [0.275, 0.200]
    ],
    true,
    0.010
  );

  const front_cow_left_horn = addNeonPath(
    front_cow,
    "front_cow_left_horn",
    [
      [0.070, 0.315], [0.025, 0.370], [0.040, 0.415],
      [0.075, 0.395], [0.105, 0.335]
    ],
    false,
    0.009
  );

  const front_cow_right_horn = addNeonPath(
    front_cow,
    "front_cow_right_horn",
    [
      [0.215, 0.325], [0.255, 0.385], [0.290, 0.410],
      [0.310, 0.380], [0.270, 0.315]
    ],
    false,
    0.009
  );

  const front_cow_muzzle_outline = addNeonPath(
    front_cow,
    "front_cow_muzzle_outline",
    [
      [0.095, 0.025], [0.145, 0.060], [0.225, 0.055],
      [0.285, 0.015], [0.290, -0.035], [0.245, -0.075],
      [0.165, -0.070], [0.110, -0.035]
    ],
    true,
    0.008
  );

  const front_cow_front_leg = addNeonPath(
    front_cow,
    "front_cow_front_leg",
    [
      [0.135, -0.175], [0.125, -0.275], [0.115, -0.385],
      [0.155, -0.425], [0.205, -0.405], [0.205, -0.365],
      [0.175, -0.345], [0.180, -0.245]
    ],
    false,
    0.010
  );

  const front_cow_rear_leg = addNeonPath(
    front_cow,
    "front_cow_rear_leg",
    [
      [-0.175, -0.205], [-0.180, -0.305], [-0.190, -0.405],
      [-0.150, -0.445], [-0.095, -0.420], [-0.095, -0.380],
      [-0.125, -0.360], [-0.115, -0.255]
    ],
    false,
    0.010
  );

  const front_cow_tail = addNeonPath(
    front_cow,
    "front_cow_tail",
    [
      [-0.245, -0.080], [-0.315, -0.130], [-0.330, -0.215],
      [-0.300, -0.270], [-0.265, -0.255], [-0.275, -0.215],
      [-0.300, -0.200]
    ],
    false,
    0.009
  );

  const front_cow_udder = addNeonPath(
    front_cow,
    "front_cow_udder",
    [
      [0.010, -0.225], [0.045, -0.270], [0.100, -0.265],
      [0.130, -0.230], [0.095, -0.205], [0.050, -0.210]
    ],
    true,
    0.008
  );

  const side_cow_body_fillGeom = new THREE.CircleGeometry(1, 28);

  function createSideCow(label) {
    const side_cow = new THREE.Group();
    side_cow.name = label;

    const side_cow_body_fill = new THREE.Mesh(
      side_cow_body_fillGeom,
      dark_inkMat
    );
    side_cow_body_fill.name = label + "_body_fill";
    side_cow_body_fill.position.set(-0.025, -0.115, 0.004);
    side_cow_body_fill.scale.set(0.225, 0.175, 1);
    side_cow.add(side_cow_body_fill);

    addEllipse(
      side_cow, label + "_head_fill", 0.125, 0.175, dark_inkMat,
      0.105, 0.125, 0.006, -0.08
    );
    addEllipse(
      side_cow, label + "_left_ear_fill", 0.058, 0.040, dark_inkMat,
      0.005, 0.215, 0.006, 0.45
    );
    addEllipse(
      side_cow, label + "_right_ear_fill", 0.058, 0.040, dark_inkMat,
      0.215, 0.215, 0.006, -0.45
    );
    addEllipse(
      side_cow, label + "_muzzle_fill", 0.118, 0.067, pale_inkMat,
      0.145, 0.005, 0.022, -0.10
    );
    addEllipse(
      side_cow, label + "_front_eye", 0.015, 0.028, pale_inkMat,
      0.145, 0.165, 0.025, 0
    );

    addNeonPath(
      side_cow,
      label + "_body_outline",
      [
        [0.095, 0.025], [0.020, 0.055], [-0.080, 0.045],
        [-0.155, -0.005], [-0.205, -0.090], [-0.215, -0.190],
        [-0.190, -0.285], [-0.145, -0.330], [-0.095, -0.315],
        [-0.065, -0.250], [-0.050, -0.155], [0.020, -0.120],
        [0.075, -0.170], [0.105, -0.275], [0.145, -0.330],
        [0.195, -0.315], [0.210, -0.260], [0.180, -0.145],
        [0.170, -0.050], [0.180, 0.020]
      ],
      true,
      0.010
    );

    addNeonPath(
      side_cow,
      label + "_head_outline",
      [
        [0.040, 0.225], [0.010, 0.265], [0.035, 0.310],
        [0.075, 0.335], [0.105, 0.305], [0.145, 0.325],
        [0.180, 0.300], [0.190, 0.255], [0.230, 0.235],
        [0.235, 0.195], [0.205, 0.165], [0.195, 0.105],
        [0.220, 0.050], [0.195, -0.015], [0.155, -0.055],
        [0.095, -0.050], [0.055, -0.005], [0.030, 0.070],
        [0.020, 0.155]
      ],
      true,
      0.010
    );

    addNeonPath(
      side_cow,
      label + "_left_ear",
      [
        [0.045, 0.230], [-0.010, 0.275], [-0.070, 0.255],
        [-0.075, 0.210], [-0.030, 0.180], [0.020, 0.205]
      ],
      true,
      0.008
    );

    addNeonPath(
      side_cow,
      label + "_right_ear",
      [
        [0.205, 0.235], [0.250, 0.275], [0.305, 0.250],
        [0.310, 0.205], [0.270, 0.175], [0.220, 0.200]
      ],
      true,
      0.008
    );

    addNeonPath(
      side_cow,
      label + "_horn",
      [
        [0.110, 0.315], [0.130, 0.370], [0.165, 0.395],
        [0.185, 0.370], [0.160, 0.315]
      ],
      false,
      0.008
    );

    addNeonPath(
      side_cow,
      label + "_muzzle_outline",
      [
        [0.070, 0.035], [0.115, 0.065], [0.180, 0.055],
        [0.220, 0.015], [0.215, -0.035], [0.175, -0.065],
        [0.110, -0.055], [0.075, -0.020]
      ],
      true,
      0.007
    );

    addNeonPath(
      side_cow,
      label + "_front_leg",
      [
        [0.105, -0.155], [0.100, -0.250], [0.095, -0.365],
        [0.130, -0.405], [0.170, -0.390], [0.170, -0.350],
        [0.145, -0.335], [0.145, -0.230]
      ],
      false,
      0.009
    );

    addNeonPath(
      side_cow,
      label + "_rear_leg",
      [
        [-0.135, -0.175], [-0.140, -0.275], [-0.145, -0.385],
        [-0.110, -0.425], [-0.065, -0.405], [-0.065, -0.365],
        [-0.090, -0.345], [-0.085, -0.245]
      ],
      false,
      0.009
    );

    addNeonPath(
      side_cow,
      label + "_tail",
      [
        [-0.185, -0.070], [-0.255, -0.115], [-0.275, -0.190],
        [-0.245, -0.245], [-0.210, -0.225], [-0.220, -0.190],
        [-0.250, -0.200]
      ],
      false,
      0.008
    );

    return side_cow;
  }

  const left_side_cow = createSideCow("left_side_cow");
  left_side_cow.position.set(-cartonW * 0.5 - 0.015, 0.55, 0);
  left_side_cow.rotation.y = -Math.PI * 0.5;
  left_side_cow.scale.setScalar(0.90);
  root.add(left_side_cow);

  const right_side_cow = left_side_cow.clone(true);
  right_side_cow.name = "right_side_cow";
  right_side_cow.position.set(cartonW * 0.5 + 0.015, 0.55, 0);
  right_side_cow.rotation.y = Math.PI * 0.5;
  root.add(right_side_cow);

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