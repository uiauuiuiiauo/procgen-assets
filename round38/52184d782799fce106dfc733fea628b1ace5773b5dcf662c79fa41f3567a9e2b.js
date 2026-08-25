export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "product_carton";

  const cartonW = 0.90;
  const cartonH = 1.45;
  const cartonD = 0.68;
  const frontZ = cartonD / 2;
  const sideX = cartonW / 2;
  const topY = cartonH;

  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffc51a,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xffa51c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x0753b7,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const darkBlueMat = new THREE.MeshStandardMaterial({
    color: 0x173f91,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x61c84e,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const tealMat = new THREE.MeshStandardMaterial({
    color: 0x079b92,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: 0xb51b91,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xe63b35,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const whiteInkMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f2,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const logoBlueMat = new THREE.MeshStandardMaterial({
    color: 0x064a9b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x747979,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const interiorDarkMat = new THREE.MeshStandardMaterial({
    color: 0x454b4d,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde5e5,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const clearGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0f0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0xf2a900,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const liquidLightMat = new THREE.MeshStandardMaterial({
    color: 0xffd43b,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  function makeShapeGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function makeWindowGeometry(width, height) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.50, -height * 0.48);
    shape.lineTo(width * 0.50, -height * 0.48);
    shape.quadraticCurveTo(
      width * 0.50,
      -height * 0.20,
      width * 0.49,
      height * 0.25
    );
    shape.quadraticCurveTo(
      width * 0.48,
      height * 0.40,
      width * 0.31,
      height * 0.46
    );
    shape.quadraticCurveTo(
      0,
      height * 0.54,
      -width * 0.31,
      height * 0.46
    );
    shape.quadraticCurveTo(
      -width * 0.48,
      height * 0.40,
      -width * 0.49,
      height * 0.25
    );
    shape.quadraticCurveTo(
      -width * 0.50,
      -height * 0.20,
      -width * 0.50,
      -height * 0.48
    );
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const carton_shellGeom = new THREE.BoxGeometry(cartonW, cartonH, cartonD);
  const carton_shell = new THREE.Mesh(carton_shellGeom, paperMat);
  carton_shell.position.y = cartonH / 2;
  carton_shell.name = "carton_shell";
  root.add(carton_shell);

  const front_panelGeom = new THREE.PlaneGeometry(cartonW - 0.012, cartonH - 0.014);
  const front_panel = new THREE.Mesh(front_panelGeom, yellowMat);
  front_panel.position.set(0, cartonH / 2, frontZ + 0.003);
  front_panel.name = "front_panel";
  root.add(front_panel);

  const front_blue_headerGeom = makeShapeGeometry([
    [-0.444, 1.444],
    [0.444, 1.444],
    [0.444, 1.065],
    [0.275, 0.965],
    [-0.055, 0.895],
    [-0.275, 0.945],
    [-0.444, 1.070]
  ]);
  const front_blue_header = new THREE.Mesh(front_blue_headerGeom, blueMat);
  front_blue_header.position.z = frontZ + 0.006;
  front_blue_header.name = "front_blue_header";
  root.add(front_blue_header);

  const front_magenta_cornerGeom = makeShapeGeometry([
    [-0.444, 1.115],
    [-0.265, 1.025],
    [-0.305, 0.885],
    [-0.444, 0.925]
  ]);
  const front_magenta_corner = new THREE.Mesh(front_magenta_cornerGeom, magentaMat);
  front_magenta_corner.position.z = frontZ + 0.008;
  front_magenta_corner.name = "front_magenta_corner";
  root.add(front_magenta_corner);

  const front_magenta_swooshGeom = makeShapeGeometry([
    [-0.035, 0.910],
    [0.265, 0.850],
    [0.444, 0.765],
    [0.444, 0.605],
    [0.285, 0.670],
    [0.095, 0.795]
  ]);
  const front_magenta_swoosh = new THREE.Mesh(front_magenta_swooshGeom, magentaMat);
  front_magenta_swoosh.position.z = frontZ + 0.008;
  front_magenta_swoosh.name = "front_magenta_swoosh";
  root.add(front_magenta_swoosh);

  const front_blue_lower_shapeGeom = makeShapeGeometry([
    [0.125, 0.790],
    [0.444, 0.655],
    [0.444, 0.270],
    [0.275, 0.215],
    [0.155, 0.300]
  ]);
  const front_blue_lower_shape = new THREE.Mesh(front_blue_lower_shapeGeom, blueMat);
  front_blue_lower_shape.position.z = frontZ + 0.008;
  front_blue_lower_shape.name = "front_blue_lower_shape";
  root.add(front_blue_lower_shape);

  const front_red_footerGeom = makeShapeGeometry([
    [-0.444, 0.275],
    [0.095, 0.220],
    [0.145, 0.006],
    [-0.444, 0.006]
  ]);
  const front_red_footer = new THREE.Mesh(front_red_footerGeom, redMat);
  front_red_footer.position.z = frontZ + 0.008;
  front_red_footer.name = "front_red_footer";
  root.add(front_red_footer);

  const front_magenta_footerGeom = makeShapeGeometry([
    [0.145, 0.225],
    [0.444, 0.185],
    [0.444, 0.006],
    [0.095, 0.006]
  ]);
  const front_magenta_footer = new THREE.Mesh(front_magenta_footerGeom, magentaMat);
  front_magenta_footer.position.z = frontZ + 0.009;
  front_magenta_footer.name = "front_magenta_footer";
  root.add(front_magenta_footer);

  const front_window_recessGeom = makeWindowGeometry(0.595, 0.735);
  const front_window_recess = new THREE.Mesh(front_window_recessGeom, interiorDarkMat);
  front_window_recess.position.set(-0.006, 0.585, frontZ + 0.010);
  front_window_recess.name = "front_window_recess";
  root.add(front_window_recess);

  const front_windowGeom = makeWindowGeometry(0.555, 0.695);
  const front_window = new THREE.Mesh(front_windowGeom, frostedGlassMat);
  front_window.position.set(-0.006, 0.585, frontZ + 0.014);
  front_window.name = "front_window";
  root.add(front_window);

  const front_window_borderPoints = [
    new THREE.Vector3(-0.294, 0.236, frontZ + 0.018),
    new THREE.Vector3(-0.288, 0.470, frontZ + 0.018),
    new THREE.Vector3(-0.278, 0.805, frontZ + 0.018),
    new THREE.Vector3(-0.220, 0.885, frontZ + 0.018),
    new THREE.Vector3(0.000, 0.940, frontZ + 0.018),
    new THREE.Vector3(0.220, 0.885, frontZ + 0.018),
    new THREE.Vector3(0.278, 0.805, frontZ + 0.018),
    new THREE.Vector3(0.288, 0.470, frontZ + 0.018),
    new THREE.Vector3(0.294, 0.236, frontZ + 0.018)
  ];
  const front_window_borderCurve = new THREE.CatmullRomCurve3(
    front_window_borderPoints,
    true,
    "centripetal"
  );
  const front_window_borderGeom = new THREE.TubeGeometry(
    front_window_borderCurve,
    64,
    0.010,
    8,
    true
  );
  const front_window_border = new THREE.Mesh(front_window_borderGeom, silverMat);
  front_window_border.name = "front_window_border";
  root.add(front_window_border);

  const front_cup_bodyGeom = new THREE.CylinderGeometry(
    0.185,
    0.112,
    0.485,
    32,
    1,
    true
  );
  const front_cup_body = new THREE.Mesh(front_cup_bodyGeom, clearGlassMat);
  front_cup_body.position.set(0.020, 0.505, frontZ - 0.043);
  front_cup_body.name = "front_cup_body";
  root.add(front_cup_body);

  const front_cup_rimGeom = new THREE.TorusGeometry(0.174, 0.012, 10, 36);
  const front_cup_rim = new THREE.Mesh(front_cup_rimGeom, silverMat);
  front_cup_rim.rotation.x = Math.PI / 2;
  front_cup_rim.position.set(0.020, 0.748, frontZ - 0.043);
  front_cup_rim.name = "front_cup_rim";
  root.add(front_cup_rim);

  const front_cup_baseGeom = new THREE.CylinderGeometry(0.112, 0.112, 0.014, 28);
  const front_cup_base = new THREE.Mesh(front_cup_baseGeom, clearGlassMat);
  front_cup_base.position.set(0.020, 0.260, frontZ - 0.043);
  front_cup_base.name = "front_cup_base";
  root.add(front_cup_base);

  const front_cup_base_ringGeom = new THREE.TorusGeometry(0.105, 0.007, 8, 28);
  const front_cup_base_ring = new THREE.Mesh(front_cup_base_ringGeom, silverMat);
  front_cup_base_ring.rotation.x = Math.PI / 2;
  front_cup_base_ring.position.set(0.020, 0.269, frontZ - 0.043);
  front_cup_base_ring.name = "front_cup_base_ring";
  root.add(front_cup_base_ring);

  const front_cup_highlightCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.105, 0.315, frontZ - 0.015),
    new THREE.Vector3(-0.120, 0.485, frontZ - 0.012),
    new THREE.Vector3(-0.105, 0.675, frontZ - 0.014),
    new THREE.Vector3(-0.075, 0.720, frontZ - 0.016)
  ]);
  const front_cup_highlightGeom = new THREE.TubeGeometry(
    front_cup_highlightCurve,
    24,
    0.006,
    6,
    false
  );
  const front_cup_highlight = new THREE.Mesh(front_cup_highlightGeom, whiteInkMat);
  front_cup_highlight.name = "front_cup_highlight";
  root.add(front_cup_highlight);

  const right_panelGeom = new THREE.PlaneGeometry(cartonD - 0.012, cartonH - 0.014);
  const right_panel = new THREE.Mesh(right_panelGeom, greenMat);
  right_panel.rotation.y = Math.PI / 2;
  right_panel.position.set(sideX + 0.003, cartonH / 2, 0);
  right_panel.name = "right_panel";
  root.add(right_panel);

  const side_teal_footerGeom = makeShapeGeometry([
    [-0.334, 0.006],
    [0.334, 0.006],
    [0.334, 0.245],
    [0.070, 0.315],
    [-0.155, 0.275]
  ]);
  const side_teal_footer = new THREE.Mesh(side_teal_footerGeom, tealMat);
  side_teal_footer.rotation.y = Math.PI / 2;
  side_teal_footer.position.x = sideX + 0.006;
  side_teal_footer.name = "side_teal_footer";
  root.add(side_teal_footer);

  const side_yellow_diagonalGeom = makeShapeGeometry([
    [-0.334, 0.610],
    [0.334, 0.875],
    [0.334, 1.185],
    [-0.334, 0.820]
  ]);
  const side_yellow_diagonal = new THREE.Mesh(side_yellow_diagonalGeom, yellowMat);
  side_yellow_diagonal.rotation.y = Math.PI / 2;
  side_yellow_diagonal.position.x = sideX + 0.007;
  side_yellow_diagonal.name = "side_yellow_diagonal";
  root.add(side_yellow_diagonal);

  const side_blue_swooshGeom = makeShapeGeometry([
    [-0.334, 0.925],
    [0.105, 0.820],
    [0.334, 0.925],
    [0.334, 1.015],
    [0.080, 0.900]
  ]);
  const side_blue_swoosh = new THREE.Mesh(side_blue_swooshGeom, blueMat);
  side_blue_swoosh.rotation.y = Math.PI / 2;
  side_blue_swoosh.position.x = sideX + 0.009;
  side_blue_swoosh.name = "side_blue_swoosh";
  root.add(side_blue_swoosh);

  const side_badge_outerGeom = new THREE.CircleGeometry(0.070, 28);
  const side_badge_outer = new THREE.Mesh(side_badge_outerGeom, whiteInkMat);
  side_badge_outer.rotation.y = Math.PI / 2;
  side_badge_outer.position.set(sideX + 0.012, 0.690, -0.185);
  side_badge_outer.name = "side_badge_outer";
  root.add(side_badge_outer);

  const side_badge_redGeom = new THREE.CircleGeometry(0.052, 24);
  const side_badge_red = new THREE.Mesh(side_badge_redGeom, redMat);
  side_badge_red.rotation.y = Math.PI / 2;
  side_badge_red.position.set(sideX + 0.014, 0.690, -0.185);
  side_badge_red.name = "side_badge_red";
  root.add(side_badge_red);

  const side_badge_centerGeom = new THREE.CircleGeometry(0.026, 20);
  const side_badge_center = new THREE.Mesh(side_badge_centerGeom, whiteInkMat);
  side_badge_center.rotation.y = Math.PI / 2;
  side_badge_center.position.set(sideX + 0.016, 0.690, -0.185);
  side_badge_center.name = "side_badge_center";
  root.add(side_badge_center);

  const side_label_backGeom = new THREE.PlaneGeometry(0.190, 0.135);
  const side_label_back = new THREE.Mesh(side_label_backGeom, whiteInkMat);
  side_label_back.rotation.y = Math.PI / 2;
  side_label_back.position.set(sideX + 0.012, 0.535, -0.190);
  side_label_back.name = "side_label_back";
  root.add(side_label_back);

  const side_label_line_1Geom = new THREE.PlaneGeometry(0.125, 0.014);
  const side_label_line_1 = new THREE.Mesh(side_label_line_1Geom, blueMat);
  side_label_line_1.rotation.y = Math.PI / 2;
  side_label_line_1.position.set(sideX + 0.015, 0.555, -0.190);
  side_label_line_1.name = "side_label_line_1";
  root.add(side_label_line_1);

  const side_label_line_2Geom = new THREE.PlaneGeometry(0.105, 0.012);
  const side_label_line_2 = new THREE.Mesh(side_label_line_2Geom, blueMat);
  side_label_line_2.rotation.y = Math.PI / 2;
  side_label_line_2.position.set(sideX + 0.015, 0.520, -0.190);
  side_label_line_2.name = "side_label_line_2";
  root.add(side_label_line_2);

  const side_label_line_3Geom = new THREE.PlaneGeometry(0.080, 0.010);
  const side_label_line_3 = new THREE.Mesh(side_label_line_3Geom, blueMat);
  side_label_line_3.rotation.y = Math.PI / 2;
  side_label_line_3.position.set(sideX + 0.015, 0.490, -0.190);
  side_label_line_3.name = "side_label_line_3";
  root.add(side_label_line_3);

  const side_bowl_outerGeom = new THREE.CircleGeometry(0.205, 36);
  const side_bowl_outer = new THREE.Mesh(side_bowl_outerGeom, whiteInkMat);
  side_bowl_outer.rotation.y = Math.PI / 2;
  side_bowl_outer.scale.set(0.78, 1.0, 1.0);
  side_bowl_outer.position.set(sideX + 0.014, 0.305, -0.075);
  side_bowl_outer.name = "side_bowl_outer";
  root.add(side_bowl_outer);

  const side_bowl_innerGeom = new THREE.CircleGeometry(0.166, 36);
  const side_bowl_inner = new THREE.Mesh(side_bowl_innerGeom, liquidMat);
  side_bowl_inner.rotation.y = Math.PI / 2;
  side_bowl_inner.scale.set(0.76, 1.0, 1.0);
  side_bowl_inner.position.set(sideX + 0.017, 0.315, -0.075);
  side_bowl_inner.name = "side_bowl_inner";
  root.add(side_bowl_inner);

  const side_bowl_highlightGeom = new THREE.CircleGeometry(0.060, 24);
  const side_bowl_highlight = new THREE.Mesh(side_bowl_highlightGeom, liquidLightMat);
  side_bowl_highlight.rotation.y = Math.PI / 2;
  side_bowl_highlight.scale.set(0.55, 1.0, 1.0);
  side_bowl_highlight.position.set(sideX + 0.020, 0.350, -0.035);
  side_bowl_highlight.name = "side_bowl_highlight";
  root.add(side_bowl_highlight);

  const side_liquid_streamShape = new THREE.Shape();
  side_liquid_streamShape.moveTo(-0.145, 1.060);
  side_liquid_streamShape.bezierCurveTo(-0.130, 0.930, -0.105, 0.820, -0.090, 0.735);
  side_liquid_streamShape.bezierCurveTo(-0.070, 0.640, -0.025, 0.555, 0.010, 0.475);
  side_liquid_streamShape.lineTo(0.065, 0.490);
  side_liquid_streamShape.bezierCurveTo(0.025, 0.600, -0.010, 0.690, -0.030, 0.770);
  side_liquid_streamShape.bezierCurveTo(-0.060, 0.890, -0.085, 1.000, -0.085, 1.060);
  side_liquid_streamShape.closePath();
  const side_liquid_streamGeom = new THREE.ShapeGeometry(side_liquid_streamShape);
  const side_liquid_stream = new THREE.Mesh(side_liquid_streamGeom, liquidMat);
  side_liquid_stream.rotation.y = Math.PI / 2;
  side_liquid_stream.position.x = sideX + 0.021;
  side_liquid_stream.name = "side_liquid_stream";
  root.add(side_liquid_stream);

  const side_liquid_highlightShape = new THREE.Shape();
  side_liquid_highlightShape.moveTo(-0.118, 1.035);
  side_liquid_highlightShape.bezierCurveTo(-0.105, 0.900, -0.080, 0.800, -0.065, 0.720);
  side_liquid_highlightShape.bezierCurveTo(-0.045, 0.630, -0.010, 0.560, 0.020, 0.500);
  side_liquid_highlightShape.lineTo(0.036, 0.510);
  side_liquid_highlightShape.bezierCurveTo(0.005, 0.610, -0.020, 0.700, -0.038, 0.780);
  side_liquid_highlightShape.bezierCurveTo(-0.060, 0.890, -0.075, 0.980, -0.074, 1.035);
  side_liquid_highlightShape.closePath();
  const side_liquid_highlightGeom = new THREE.ShapeGeometry(side_liquid_highlightShape);
  const side_liquid_highlight = new THREE.Mesh(side_liquid_highlightGeom, liquidLightMat);
  side_liquid_highlight.rotation.y = Math.PI / 2;
  side_liquid_highlight.position.x = sideX + 0.023;
  side_liquid_highlight.name = "side_liquid_highlight";
  root.add(side_liquid_highlight);

  const side_splashGeom = new THREE.CircleGeometry(0.020, 18);
  const side_splash = new THREE.InstancedMesh(side_splashGeom, liquidLightMat, 5);
  const sideSplashData = [
    [-0.175, 0.575, 1.25, 0.58, -0.35],
    [-0.165, 0.630, 0.80, 0.48, 0.25],
    [-0.015, 0.535, 1.10, 0.55, 0.55],
    [0.025, 0.575, 0.72, 0.46, -0.45],
    [-0.120, 0.490, 0.65, 0.42, 0.15]
  ];
  const sideSplashDummy = new THREE.Object3D();
  const sideSplashQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2
  );
  for (let i = 0; i < sideSplashData.length; i++) {
    const data = sideSplashData[i];
    const localRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      data[4]
    );
    sideSplashDummy.position.set(sideX + 0.024, data[1], data[0]);
    sideSplashDummy.quaternion.copy(sideSplashQuat).multiply(localRotation);
    sideSplashDummy.scale.set(data[2], data[3], 1);
    sideSplashDummy.updateMatrix();
    side_splash.setMatrixAt(i, sideSplashDummy.matrix);
  }
  side_splash.instanceMatrix.needsUpdate = true;
  side_splash.name = "side_splash";
  root.add(side_splash);

  const top_panelGeom = new THREE.PlaneGeometry(cartonW - 0.012, cartonD - 0.012);
  const top_panel = new THREE.Mesh(top_panelGeom, orangeMat);
  top_panel.rotation.x = -Math.PI / 2;
  top_panel.position.y = topY + 0.003;
  top_panel.name = "top_panel";
  root.add(top_panel);

  const top_yellow_patchGeom = new THREE.PlaneGeometry(0.590, cartonD - 0.018);
  const top_yellow_patch = new THREE.Mesh(top_yellow_patchGeom, yellowMat);
  top_yellow_patch.rotation.x = -Math.PI / 2;
  top_yellow_patch.position.set(0.155, topY + 0.006, 0);
  top_yellow_patch.name = "top_yellow_patch";
  root.add(top_yellow_patch);

  const top_blue_patchGeom = new THREE.PlaneGeometry(0.335, cartonD - 0.018);
  const top_blue_patch = new THREE.Mesh(top_blue_patchGeom, blueMat);
  top_blue_patch.rotation.x = -Math.PI / 2;
  top_blue_patch.position.set(-0.295, topY + 0.007, 0);
  top_blue_patch.name = "top_blue_patch";
  root.add(top_blue_patch);

  const top_magenta_cornerGeom = makeShapeGeometry([
    [0.245, -0.334],
    [0.444, -0.334],
    [0.444, -0.115],
    [0.330, -0.165]
  ]);
  const top_magenta_corner = new THREE.Mesh(top_magenta_cornerGeom, magentaMat);
  top_magenta_corner.rotation.x = -Math.PI / 2;
  top_magenta_corner.position.y = topY + 0.009;
  top_magenta_corner.name = "top_magenta_corner";
  root.add(top_magenta_corner);

  const top_green_ruleGeom = new THREE.PlaneGeometry(0.510, 0.022);
  const top_green_rule = new THREE.Mesh(top_green_ruleGeom, greenMat);
  top_green_rule.rotation.x = -Math.PI / 2;
  top_green_rule.position.set(-0.020, topY + 0.010, -0.225);
  top_green_rule.name = "top_green_rule";
  root.add(top_green_rule);

  const top_cup_imageGeom = new THREE.CircleGeometry(0.128, 32);
  const top_cup_image = new THREE.Mesh(top_cup_imageGeom, silverMat);
  top_cup_image.rotation.x = -Math.PI / 2;
  top_cup_image.scale.set(1.0, 0.56, 1.0);
  top_cup_image.position.set(0.025, topY + 0.012, 0.015);
  top_cup_image.name = "top_cup_image";
  root.add(top_cup_image);

  const top_cup_openingGeom = new THREE.CircleGeometry(0.102, 28);
  const top_cup_opening = new THREE.Mesh(top_cup_openingGeom, interiorDarkMat);
  top_cup_opening.rotation.x = -Math.PI / 2;
  top_cup_opening.scale.set(1.0, 0.52, 1.0);
  top_cup_opening.position.set(0.025, topY + 0.014, 0.008);
  top_cup_opening.name = "top_cup_opening";
  root.add(top_cup_opening);

  const top_red_bannerGeom = new THREE.PlaneGeometry(0.485, 0.055);
  const top_red_banner = new THREE.Mesh(top_red_bannerGeom, redMat);
  top_red_banner.rotation.x = -Math.PI / 2;
  top_red_banner.position.set(-0.050, topY + 0.012, 0.235);
  top_red_banner.name = "top_red_banner";
  root.add(top_red_banner);

  const front_right_cornerGeom = new THREE.BoxGeometry(0.012, cartonH - 0.01, 0.012);
  const front_right_corner = new THREE.Mesh(front_right_cornerGeom, paperMat);
  front_right_corner.position.set(sideX + 0.004, cartonH / 2, frontZ + 0.002);
  front_right_corner.name = "front_right_corner";
  root.add(front_right_corner);

  const front_top_seamGeom = new THREE.BoxGeometry(cartonW - 0.012, 0.010, 0.012);
  const front_top_seam = new THREE.Mesh(front_top_seamGeom, paperMat);
  front_top_seam.position.set(0, topY - 0.004, frontZ + 0.004);
  front_top_seam.name = "front_top_seam";
  root.add(front_top_seam);

  const side_top_seamGeom = new THREE.BoxGeometry(0.012, 0.010, cartonD - 0.012);
  const side_top_seam = new THREE.Mesh(side_top_seamGeom, paperMat);
  side_top_seam.position.set(sideX + 0.004, topY - 0.004, 0);
  side_top_seam.name = "side_top_seam";
  root.add(side_top_seam);

  const glyphs = {
    " ": [
      "00000", "00000", "00000", "00000", "00000", "00000", "00000"
    ],
    A: [
      "01110", "10001", "10001", "11111", "10001", "10001", "10001"
    ],
    B: [
      "11110", "10001", "10001", "11110", "10001", "10001", "11110"
    ],
    D: [
      "11110", "10001", "10001", "10001", "10001", "10001", "11110"
    ],
    E: [
      "11111", "10000", "10000", "11110", "10000", "10000", "11111"
    ],
    I: [
      "11111", "00100", "00100", "00100", "00100", "00100", "11111"
    ],
    L: [
      "10000", "10000", "10000", "10000", "10000", "10000", "11111"
    ],
    M: [
      "10001", "11011", "10101", "10101", "10001", "10001", "10001"
    ],
    O: [
      "01110", "10001", "10001", "10001", "10001", "10001", "01110"
    ],
    P: [
      "11110", "10001", "10001", "11110", "10000", "10000", "10000"
    ],
    R: [
      "11110", "10001", "10001", "11110", "10100", "10010", "10001"
    ],
    T: [
      "11111", "00100", "00100", "00100", "00100", "00100", "00100"
    ]
  };

  function makePixelText(text, cell, fillMaterial, shadowMaterial, shadowOffset) {
    let count = 0;
    for (let ci = 0; ci < text.length; ci++) {
      const pattern = glyphs[text[ci]] || glyphs[" "];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col] === "1") count++;
        }
      }
    }

    const pixelGeom = new THREE.BoxGeometry(
      cell * 0.82,
      cell * 0.82,
      0.0035
    );
    const shadow = new THREE.InstancedMesh(pixelGeom, shadowMaterial, count);
    const face = new THREE.InstancedMesh(pixelGeom, fillMaterial, count);
    const dummy = new THREE.Object3D();
    const totalWidth = (text.length * 6 - 1) * cell;
    let index = 0;

    for (let ci = 0; ci < text.length; ci++) {
      const pattern = glyphs[text[ci]] || glyphs[" "];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col] !== "1") continue;
          const px = ci * cell * 6 + col * cell - totalWidth / 2;
          const py = (3 - row) * cell;

          dummy.position.set(
            px + shadowOffset[0],
            py + shadowOffset[1],
            0
          );
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          shadow.setMatrixAt(index, dummy.matrix);

          dummy.position.set(px, py, 0.004);
          dummy.updateMatrix();
          face.setMatrixAt(index, dummy.matrix);
          index++;
        }
      }
    }

    shadow.instanceMatrix.needsUpdate = true;
    face.instanceMatrix.needsUpdate = true;
    shadow.name = "logo_shadow";
    face.name = "logo_face";
    return { shadow, face, totalWidth };
  }

  const front_logo_parts = makePixelText(
    "TETARA",
    0.0205,
    whiteInkMat,
    logoBlueMat,
    [0.009, -0.009]
  );
  const front_logo_shadow = front_logo_parts.shadow;
  const front_logo = front_logo_parts.face;
  front_logo.position.set(0, 1.155, frontZ + 0.014);
  front_logo.name = "front_logo";
  root.add(front_logo_shadow, front_logo);

  const side_logo_parts = makePixelText(
    "TETARA",
    0.0155,
    whiteInkMat,
    logoBlueMat,
    [0.007, -0.007]
  );
  const side_logo_shadow = side_logo_parts.shadow;
  const side_logo = side_logo_parts.face;
  side_logo.rotation.y = Math.PI / 2;
  side_logo.position.set(sideX + 0.016, 1.155, 0);
  side_logo.name = "side_logo";
  root.add(side_logo_shadow, side_logo);

  const top_logo_parts = makePixelText(
    "TETARA",
    0.0145,
    whiteInkMat,
    logoBlueMat,
    [0.006, -0.006]
  );
  const top_logo_shadow = top_logo_parts.shadow;
  const top_logo = top_logo_parts.face;
  top_logo.rotation.x = -Math.PI / 2;
  top_logo.position.set(0.020, topY + 0.016, -0.070);
  top_logo.name = "top_logo";
  root.add(top_logo_shadow, top_logo);

  const front_badge_outerGeom = new THREE.CircleGeometry(0.052, 24);
  const front_badge_outer = new THREE.Mesh(front_badge_outerGeom, orangeMat);
  front_badge_outer.position.set(0.015, 1.345, frontZ + 0.015);
  front_badge_outer.name = "front_badge_outer";
  root.add(front_badge_outer);

  const front_badge_innerGeom = new THREE.CircleGeometry(0.032, 20);
  const front_badge_inner = new THREE.Mesh(front_badge_innerGeom, whiteInkMat);
  front_badge_inner.position.set(0.015, 1.345, frontZ + 0.018);
  front_badge_inner.name = "front_badge_inner";
  root.add(front_badge_inner);

  const front_badge_markShape = new THREE.Shape();
  front_badge_markShape.moveTo(-0.020, -0.010);
  front_badge_markShape.lineTo(0.000, -0.018);
  front_badge_markShape.lineTo(0.021, 0.013);
  front_badge_markShape.lineTo(-0.006, 0.016);
  front_badge_markShape.closePath();
  const front_badge_markGeom = new THREE.ShapeGeometry(front_badge_markShape);
  const front_badge_mark = new THREE.Mesh(front_badge_markGeom, orangeMat);
  front_badge_mark.position.set(0.015, 1.345, frontZ + 0.020);
  front_badge_mark.name = "front_badge_mark";
  root.add(front_badge_mark);

  const front_small_printGeom = new THREE.BoxGeometry(0.032, 0.008, 0.003);
  const front_small_print = new THREE.InstancedMesh(
    front_small_printGeom,
    whiteInkMat,
    24
  );
  const frontPrintDummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const row = Math.floor(i / 8);
    const col = i % 8;
    frontPrintDummy.position.set(
      -0.345 + col * 0.047,
      0.190 - row * 0.043,
      frontZ + 0.014
    );
    frontPrintDummy.scale.set(0.55 + ((i * 3) % 5) * 0.10, 1, 1);
    frontPrintDummy.updateMatrix();
    front_small_print.setMatrixAt(i, frontPrintDummy.matrix);
  }
  front_small_print.instanceMatrix.needsUpdate = true;
  front_small_print.name = "front_small_print";
  root.add(front_small_print);

  const front_bottom_word_parts = makePixelText(
    "DRTPRETE",
    0.0095,
    whiteInkMat,
    darkBlueMat,
    [0.003, -0.003]
  );
  const front_bottom_word_shadow = front_bottom_word_parts.shadow;
  const front_bottom_word = front_bottom_word_parts.face;
  front_bottom_word.position.set(0.035, 0.075, frontZ + 0.016);
  front_bottom_word.name = "front_bottom_word";
  root.add(front_bottom_word_shadow, front_bottom_word);

  const top_fold_flapGeom = new THREE.BoxGeometry(
    cartonW * 0.94,
    0.012,
    cartonD * 0.20
  );
  const top_fold_flap = new THREE.Mesh(top_fold_flapGeom, blueMat);
  top_fold_flap.position.set(-0.010, topY + 0.018, cartonD * 0.40);
  top_fold_flap.rotation.x = -0.045;
  top_fold_flap.name = "top_fold_flap";
  root.add(top_fold_flap);

  const top_fold_lineGeom = new THREE.BoxGeometry(
    cartonW * 0.88,
    0.006,
    0.008
  );
  const top_fold_line = new THREE.Mesh(top_fold_lineGeom, paperMat);
  top_fold_line.position.set(-0.020, topY + 0.027, cartonD * 0.30);
  top_fold_line.name = "top_fold_line";
  root.add(top_fold_line);

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