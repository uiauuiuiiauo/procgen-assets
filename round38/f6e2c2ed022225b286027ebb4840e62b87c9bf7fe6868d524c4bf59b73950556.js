export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_wooden_finial";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b542f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xa5683b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x5a301d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x352016,
    metalness: 0.0,
    roughness: 0.9,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const silverHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x48463f,
    metalness: 0.5,
    roughness: 0.5,
  });

  function createRoundedSquareGeom(width, depth, height, radius, bevel) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 4,
    });
    geom.rotateX(-Math.PI / 2);
    geom.center();
    return geom;
  }

  const base_bottomGeom = createRoundedSquareGeom(1.50, 1.50, 0.24, 0.11, 0.035);
  const base_bottom = new THREE.Mesh(base_bottomGeom, woodMat);
  base_bottom.name = "base_bottom";
  base_bottom.position.y = 0.155;
  root.add(base_bottom);

  const base_bevelGeom = createRoundedSquareGeom(1.42, 1.42, 0.12, 0.085, 0.045);
  const base_bevel = new THREE.Mesh(base_bevelGeom, woodHighlightMat);
  base_bevel.name = "base_bevel";
  base_bevel.position.y = 0.335;
  root.add(base_bevel);

  const base_upperGeom = createRoundedSquareGeom(1.20, 1.20, 0.12, 0.055, 0.035);
  const base_upper = new THREE.Mesh(base_upperGeom, woodMat);
  base_upper.name = "base_upper";
  base_upper.position.y = 0.465;
  root.add(base_upper);

  const base_top_plateGeom = createRoundedSquareGeom(1.08, 1.08, 0.09, 0.035, 0.025);
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, woodHighlightMat);
  base_top_plate.name = "base_top_plate";
  base_top_plate.position.y = 0.565;
  root.add(base_top_plate);

  const lower_plinthGeom = new THREE.CylinderGeometry(0.35, 0.39, 0.17, 8);
  const lower_plinth = new THREE.Mesh(lower_plinthGeom, woodMat);
  lower_plinth.name = "lower_plinth";
  lower_plinth.position.y = 0.695;
  root.add(lower_plinth);

  const lower_plinth_capGeom = new THREE.CylinderGeometry(0.34, 0.36, 0.08, 32);
  const lower_plinth_cap = new THREE.Mesh(lower_plinth_capGeom, woodHighlightMat);
  lower_plinth_cap.name = "lower_plinth_cap";
  lower_plinth_cap.position.y = 0.79;
  root.add(lower_plinth_cap);

  const shaft_base_moldingProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.29, 0.00),
    new THREE.Vector2(0.34, 0.025),
    new THREE.Vector2(0.375, 0.075),
    new THREE.Vector2(0.38, 0.125),
    new THREE.Vector2(0.35, 0.18),
    new THREE.Vector2(0.30, 0.225),
    new THREE.Vector2(0.285, 0.25),
    new THREE.Vector2(0.00, 0.25),
  ];
  const shaft_base_moldingGeom = new THREE.LatheGeometry(shaft_base_moldingProfile, 48);
  const shaft_base_molding = new THREE.Mesh(shaft_base_moldingGeom, woodHighlightMat);
  shaft_base_molding.name = "shaft_base_molding";
  shaft_base_molding.position.y = 0.80;
  root.add(shaft_base_molding);

  const wooden_shaftProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.275, 0.00),
    new THREE.Vector2(0.285, 0.08),
    new THREE.Vector2(0.278, 0.45),
    new THREE.Vector2(0.270, 0.90),
    new THREE.Vector2(0.260, 1.30),
    new THREE.Vector2(0.250, 1.42),
    new THREE.Vector2(0.00, 1.42),
  ];
  const wooden_shaftGeom = new THREE.LatheGeometry(wooden_shaftProfile, 64);
  const wooden_shaft = new THREE.Mesh(wooden_shaftGeom, woodMat);
  wooden_shaft.name = "wooden_shaft";
  wooden_shaft.position.y = 1.00;
  root.add(wooden_shaft);

  const shaft_top_moldingProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.255, 0.00),
    new THREE.Vector2(0.285, 0.025),
    new THREE.Vector2(0.325, 0.065),
    new THREE.Vector2(0.35, 0.115),
    new THREE.Vector2(0.34, 0.165),
    new THREE.Vector2(0.295, 0.215),
    new THREE.Vector2(0.27, 0.235),
    new THREE.Vector2(0.00, 0.235),
  ];
  const shaft_top_moldingGeom = new THREE.LatheGeometry(shaft_top_moldingProfile, 48);
  const shaft_top_molding = new THREE.Mesh(shaft_top_moldingGeom, woodHighlightMat);
  shaft_top_molding.name = "shaft_top_molding";
  shaft_top_molding.position.y = 2.36;
  root.add(shaft_top_molding);

  const silver_pedestalProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.265, 0.00),
    new THREE.Vector2(0.285, 0.035),
    new THREE.Vector2(0.275, 0.085),
    new THREE.Vector2(0.235, 0.135),
    new THREE.Vector2(0.215, 0.22),
    new THREE.Vector2(0.235, 0.29),
    new THREE.Vector2(0.305, 0.345),
    new THREE.Vector2(0.345, 0.395),
    new THREE.Vector2(0.33, 0.445),
    new THREE.Vector2(0.275, 0.485),
    new THREE.Vector2(0.255, 0.535),
    new THREE.Vector2(0.265, 0.585),
    new THREE.Vector2(0.295, 0.625),
    new THREE.Vector2(0.00, 0.64),
  ];
  const silver_pedestalGeom = new THREE.LatheGeometry(silver_pedestalProfile, 64);
  const silver_pedestal = new THREE.Mesh(silver_pedestalGeom, silverMat);
  silver_pedestal.name = "silver_pedestal";
  silver_pedestal.position.y = 2.54;
  root.add(silver_pedestal);

  const pedestal_lower_bandGeom = new THREE.TorusGeometry(0.275, 0.014, 10, 48);
  const pedestal_lower_band = new THREE.Mesh(pedestal_lower_bandGeom, patinaMat);
  pedestal_lower_band.name = "pedestal_lower_band";
  pedestal_lower_band.rotation.x = Math.PI / 2;
  pedestal_lower_band.position.y = 2.59;
  root.add(pedestal_lower_band);

  const pedestal_lower_highlightGeom = new THREE.TorusGeometry(0.282, 0.009, 8, 48);
  const pedestal_lower_highlight = new THREE.Mesh(pedestal_lower_highlightGeom, silverHighlightMat);
  pedestal_lower_highlight.name = "pedestal_lower_highlight";
  pedestal_lower_highlight.rotation.x = Math.PI / 2;
  pedestal_lower_highlight.position.y = 2.625;
  root.add(pedestal_lower_highlight);

  const pedestal_upper_bandGeom = new THREE.TorusGeometry(0.305, 0.018, 10, 48);
  const pedestal_upper_band = new THREE.Mesh(pedestal_upper_bandGeom, patinaMat);
  pedestal_upper_band.name = "pedestal_upper_band";
  pedestal_upper_band.rotation.x = Math.PI / 2;
  pedestal_upper_band.position.y = 2.96;
  root.add(pedestal_upper_band);

  const pedestal_upper_highlightGeom = new THREE.TorusGeometry(0.305, 0.010, 8, 48);
  const pedestal_upper_highlight = new THREE.Mesh(pedestal_upper_highlightGeom, silverHighlightMat);
  pedestal_upper_highlight.name = "pedestal_upper_highlight";
  pedestal_upper_highlight.rotation.x = Math.PI / 2;
  pedestal_upper_highlight.position.y = 2.985;
  root.add(pedestal_upper_highlight);

  const finial_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.245, 0.00),
    new THREE.Vector2(0.285, 0.045),
    new THREE.Vector2(0.325, 0.12),
    new THREE.Vector2(0.375, 0.25),
    new THREE.Vector2(0.39, 0.36),
    new THREE.Vector2(0.365, 0.48),
    new THREE.Vector2(0.315, 0.59),
    new THREE.Vector2(0.245, 0.70),
    new THREE.Vector2(0.19, 0.78),
    new THREE.Vector2(0.00, 0.79),
  ];
  const finial_bodyGeom = new THREE.LatheGeometry(finial_bodyProfile, 64);
  const finial_body = new THREE.Mesh(finial_bodyGeom, silverMat);
  finial_body.name = "finial_body";
  finial_body.position.y = 3.11;
  root.add(finial_body);

  const finial_base_collarGeom = new THREE.CylinderGeometry(0.255, 0.275, 0.075, 48);
  const finial_base_collar = new THREE.Mesh(finial_base_collarGeom, silverMat);
  finial_base_collar.name = "finial_base_collar";
  finial_base_collar.position.y = 3.135;
  root.add(finial_base_collar);

  const finial_base_grooveGeom = new THREE.TorusGeometry(0.258, 0.012, 8, 48);
  const finial_base_groove = new THREE.Mesh(finial_base_grooveGeom, patinaMat);
  finial_base_groove.name = "finial_base_groove";
  finial_base_groove.rotation.x = Math.PI / 2;
  finial_base_groove.position.y = 3.165;
  root.add(finial_base_groove);

  const finial_base_highlightGeom = new THREE.TorusGeometry(0.265, 0.008, 8, 48);
  const finial_base_highlight = new THREE.Mesh(finial_base_highlightGeom, silverHighlightMat);
  finial_base_highlight.name = "finial_base_highlight";
  finial_base_highlight.rotation.x = Math.PI / 2;
  finial_base_highlight.position.y = 3.18;
  root.add(finial_base_highlight);

  const finial_neck_grooveGeom = new THREE.TorusGeometry(0.192, 0.010, 8, 48);
  const finial_neck_groove = new THREE.Mesh(finial_neck_grooveGeom, patinaMat);
  finial_neck_groove.name = "finial_neck_groove";
  finial_neck_groove.rotation.x = Math.PI / 2;
  finial_neck_groove.position.y = 3.875;
  root.add(finial_neck_groove);

  const finial_neck_highlightGeom = new THREE.TorusGeometry(0.198, 0.007, 8, 48);
  const finial_neck_highlight = new THREE.Mesh(finial_neck_highlightGeom, silverHighlightMat);
  finial_neck_highlight.name = "finial_neck_highlight";
  finial_neck_highlight.rotation.x = Math.PI / 2;
  finial_neck_highlight.position.y = 3.89;
  root.add(finial_neck_highlight);

  const top_capProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.18, 0.00),
    new THREE.Vector2(0.215, 0.025),
    new THREE.Vector2(0.225, 0.055),
    new THREE.Vector2(0.205, 0.085),
    new THREE.Vector2(0.165, 0.105),
    new THREE.Vector2(0.145, 0.115),
    new THREE.Vector2(0.00, 0.115),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 48);
  const top_cap = new THREE.Mesh(top_capGeom, silverMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 3.88;
  root.add(top_cap);

  const top_cap_grooveGeom = new THREE.TorusGeometry(0.205, 0.012, 8, 48);
  const top_cap_groove = new THREE.Mesh(top_cap_grooveGeom, patinaMat);
  top_cap_groove.name = "top_cap_groove";
  top_cap_groove.rotation.x = Math.PI / 2;
  top_cap_groove.position.y = 3.91;
  root.add(top_cap_groove);

  const top_cap_highlightGeom = new THREE.TorusGeometry(0.208, 0.008, 8, 48);
  const top_cap_highlight = new THREE.Mesh(top_cap_highlightGeom, silverHighlightMat);
  top_cap_highlight.name = "top_cap_highlight";
  top_cap_highlight.rotation.x = Math.PI / 2;
  top_cap_highlight.position.y = 3.925;
  root.add(top_cap_highlight);

  const top_knobProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.145, 0.00),
    new THREE.Vector2(0.155, 0.025),
    new THREE.Vector2(0.145, 0.065),
    new THREE.Vector2(0.125, 0.105),
    new THREE.Vector2(0.09, 0.145),
    new THREE.Vector2(0.045, 0.17),
    new THREE.Vector2(0.00, 0.178),
  ];
  const top_knobGeom = new THREE.LatheGeometry(top_knobProfile, 48);
  const top_knob = new THREE.Mesh(top_knobGeom, silverHighlightMat);
  top_knob.name = "top_knob";
  top_knob.position.y = 3.99;
  root.add(top_knob);

  const top_knob_tipGeom = new THREE.SphereGeometry(0.024, 16, 10);
  const top_knob_tip = new THREE.Mesh(top_knob_tipGeom, silverHighlightMat);
  top_knob_tip.name = "top_knob_tip";
  top_knob_tip.position.y = 4.168;
  root.add(top_knob_tip);

  const zAxis = new THREE.Vector3(0, 0, 1);

  function setSurfaceMatrix(mesh, index, x, y, z, normal, sx, sy, sz, rotation) {
    const position = new THREE.Vector3(x, y, z);
    const surfaceNormal = normal.clone().normalize();
    const orientation = new THREE.Quaternion().setFromUnitVectors(zAxis, surfaceNormal);
    const twist = new THREE.Quaternion().setFromAxisAngle(zAxis, rotation);
    orientation.multiply(twist);
    const scale = new THREE.Vector3(sx, sy, sz);
    const matrix = new THREE.Matrix4().compose(position, orientation, scale);
    mesh.setMatrixAt(index, matrix);
  }

  const base_front_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const base_front_grain = new THREE.InstancedMesh(base_front_grainGeom, woodGrainMat, 56);
  base_front_grain.name = "base_front_grain";
  for (let i = 0; i < 56; i++) {
    const width = 0.14 + ((i * 5) % 8) * 0.035;
    const x = -0.58 + (((i * 37) % 97) / 96) * 1.16;
    const y = 0.055 + (((i * 29) % 89) / 88) * 0.275;
    const rotation = (((i * 13) % 9) - 4) * 0.012;
    setSurfaceMatrix(
      base_front_grain,
      i,
      x,
      y,
      0.793,
      new THREE.Vector3(0, 0, 1),
      width,
      0.006,
      0.006,
      rotation
    );
  }
  base_front_grain.instanceMatrix.needsUpdate = true;
  root.add(base_front_grain);

  const base_side_grain = new THREE.InstancedMesh(base_front_grainGeom, woodGrainMat, 40);
  base_side_grain.name = "base_side_grain";
  for (let i = 0; i < 40; i++) {
    const side = i < 20 ? -1 : 1;
    const j = i % 20;
    const width = 0.14 + ((j * 7) % 8) * 0.035;
    const z = -0.58 + (((j * 31) % 83) / 82) * 1.16;
    const y = 0.06 + (((j * 23) % 79) / 78) * 0.27;
    setSurfaceMatrix(
      base_side_grain,
      i,
      side * 0.793,
      y,
      z,
      new THREE.Vector3(side, 0, 0),
      0.006,
      0.006,
      width,
      (((j * 5) % 7) - 3) * 0.012
    );
  }
  base_side_grain.instanceMatrix.needsUpdate = true;
  root.add(base_side_grain);

  const base_top_grain = new THREE.InstancedMesh(base_front_grainGeom, woodGrainMat, 28);
  base_top_grain.name = "base_top_grain";
  for (let i = 0; i < 28; i++) {
    const width = 0.16 + ((i * 5) % 7) * 0.04;
    const x = -0.45 + (((i * 29) % 73) / 72) * 0.90;
    const z = -0.46 + (((i * 41) % 79) / 78) * 0.92;
    setSurfaceMatrix(
      base_top_grain,
      i,
      x,
      0.632,
      z,
      new THREE.Vector3(0, 1, 0),
      width,
      0.005,
      0.012,
      (((i * 11) % 9) - 4) * 0.018
    );
  }
  base_top_grain.instanceMatrix.needsUpdate = true;
  root.add(base_top_grain);

  function shaftRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - 1.00) / 1.42));
    return 0.285 - 0.035 * t;
  }

  const shaft_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const shaft_grain = new THREE.InstancedMesh(shaft_grainGeom, woodGrainMat, 52);
  shaft_grain.name = "shaft_grain";
  for (let i = 0; i < 52; i++) {
    const y = 1.08 + (((i * 43) % 101) / 100) * 1.24;
    const angle = (((i * 47) % 103) / 103) * Math.PI * 2;
    const radius = shaftRadiusAt(y) + 0.005;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const length = 0.035 + ((i * 11) % 8) * 0.014;
    const width = 0.005 + (i % 3) * 0.002;
    const tilt = (((i * 7) % 7) - 3) * 0.025;
    setSurfaceMatrix(
      shaft_grain,
      i,
      normal.x * radius,
      y,
      normal.z * radius,
      normal,
      width,
      length,
      0.006,
      tilt
    );
  }
  shaft_grain.instanceMatrix.needsUpdate = true;
  root.add(shaft_grain);

  const lower_plinth_grain = new THREE.InstancedMesh(shaft_grainGeom, woodGrainMat, 16);
  lower_plinth_grain.name = "lower_plinth_grain";
  for (let i = 0; i < 16; i++) {
    const y = 0.635 + (((i * 17) % 31) / 30) * 0.12;
    const t = (y - 0.61) / 0.17;
    const radius = 0.39 - 0.04 * t + 0.005;
    const angle = (i / 16) * Math.PI * 2;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    setSurfaceMatrix(
      lower_plinth_grain,
      i,
      normal.x * radius,
      y,
      normal.z * radius,
      normal,
      0.007,
      0.045 + (i % 4) * 0.012,
      0.006,
      0
    );
  }
  lower_plinth_grain.instanceMatrix.needsUpdate = true;
  root.add(lower_plinth_grain);

  function finialRadiusAt(y) {
    const t = y - 3.11;
    if (t < 0.12) return 0.245 + (t / 0.12) * 0.08;
    if (t < 0.36) return 0.325 + ((t - 0.12) / 0.24) * 0.065;
    if (t < 0.48) return 0.39 - ((t - 0.36) / 0.12) * 0.025;
    if (t < 0.59) return 0.365 - ((t - 0.48) / 0.11) * 0.05;
    if (t < 0.70) return 0.315 - ((t - 0.59) / 0.11) * 0.07;
    return Math.max(0.19, 0.245 - ((t - 0.70) / 0.08) * 0.055);
  }

  function finialSurfacePoint(angle, y, extra) {
    const radius = finialRadiusAt(y) + extra;
    return new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
  }

  const finial_ornament = new THREE.Group();
  finial_ornament.name = "finial_ornament";
  root.add(finial_ornament);

  function addFinialGroove(samples, name) {
    const points = [];
    for (let i = 0; i < samples.length; i++) {
      points.push(finialSurfacePoint(samples[i][0], samples[i][1], 0.009));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 28, 0.009, 6, false);
    const mesh = new THREE.Mesh(geom, patinaMat);
    mesh.name = name;
    finial_ornament.add(mesh);
    return mesh;
  }

  function addFinialHighlight(samples, name) {
    const points = [];
    for (let i = 0; i < samples.length; i++) {
      points.push(finialSurfacePoint(samples[i][0], samples[i][1], 0.017));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 28, 0.0035, 6, false);
    const mesh = new THREE.Mesh(geom, silverHighlightMat);
    mesh.name = name;
    finial_ornament.add(mesh);
    return mesh;
  }

  const finial_center_ridge = addFinialGroove([
    [Math.PI / 2, 3.18],
    [Math.PI / 2, 3.34],
    [Math.PI / 2, 3.53],
    [Math.PI / 2, 3.72],
    [Math.PI / 2, 3.86],
  ], "finial_center_ridge");

  const finial_left_outer_ridge = addFinialGroove([
    [1.57, 3.20],
    [1.43, 3.34],
    [1.25, 3.51],
    [1.08, 3.69],
    [0.96, 3.82],
  ], "finial_left_outer_ridge");

  const finial_right_outer_ridge = addFinialGroove([
    [1.57, 3.20],
    [1.71, 3.34],
    [1.89, 3.51],
    [2.06, 3.69],
    [2.18, 3.82],
  ], "finial_right_outer_ridge");

  const finial_left_scroll = addFinialGroove([
    [1.55, 3.20],
    [1.42, 3.25],
    [1.25, 3.35],
    [1.10, 3.47],
    [1.06, 3.58],
    [1.14, 3.66],
    [1.27, 3.66],
    [1.36, 3.58],
    [1.34, 3.49],
    [1.27, 3.46],
  ], "finial_left_scroll");

  const finial_right_scroll = addFinialGroove([
    [1.59, 3.20],
    [1.72, 3.25],
    [1.89, 3.35],
    [2.04, 3.47],
    [2.08, 3.58],
    [2.00, 3.66],
    [1.87, 3.66],
    [1.78, 3.58],
    [1.80, 3.49],
    [1.87, 3.46],
  ], "finial_right_scroll");

  const finial_left_inner_leaf = addFinialGroove([
    [1.54, 3.21],
    [1.49, 3.37],
    [1.43, 3.55],
    [1.46, 3.72],
    [1.52, 3.84],
  ], "finial_left_inner_leaf");

  const finial_right_inner_leaf = addFinialGroove([
    [1.60, 3.21],
    [1.65, 3.37],
    [1.71, 3.55],
    [1.68, 3.72],
    [1.62, 3.84],
  ], "finial_right_inner_leaf");

  const finial_left_highlight = addFinialHighlight([
    [1.59, 3.23],
    [1.47, 3.36],
    [1.31, 3.52],
    [1.16, 3.69],
    [1.04, 3.80],
  ], "finial_left_highlight");

  const finial_right_highlight = addFinialHighlight([
    [1.55, 3.23],
    [1.67, 3.36],
    [1.83, 3.52],
    [1.98, 3.69],
    [2.10, 3.80],
  ], "finial_right_highlight");

  const finial_left_scroll_highlight = addFinialHighlight([
    [1.51, 3.25],
    [1.37, 3.34],
    [1.22, 3.46],
    [1.17, 3.57],
    [1.24, 3.63],
  ], "finial_left_scroll_highlight");

  const finial_right_scroll_highlight = addFinialHighlight([
    [1.63, 3.25],
    [1.77, 3.34],
    [1.92, 3.46],
    [1.97, 3.57],
    [1.90, 3.63],
  ], "finial_right_scroll_highlight");

  const ornament_repeat_a = finial_left_scroll.clone();
  ornament_repeat_a.name = "ornament_repeat_a";
  ornament_repeat_a.rotation.y = Math.PI * 2 / 3;
  finial_ornament.add(ornament_repeat_a);

  const ornament_repeat_b = finial_left_scroll.clone();
  ornament_repeat_b.name = "ornament_repeat_b";
  ornament_repeat_b.rotation.y = Math.PI * 4 / 3;
  finial_ornament.add(ornament_repeat_b);

  const ornament_repeat_c = finial_right_scroll.clone();
  ornament_repeat_c.name = "ornament_repeat_c";
  ornament_repeat_c.rotation.y = Math.PI * 2 / 3;
  finial_ornament.add(ornament_repeat_c);

  const ornament_repeat_d = finial_right_scroll.clone();
  ornament_repeat_d.name = "ornament_repeat_d";
  ornament_repeat_d.rotation.y = Math.PI * 4 / 3;
  finial_ornament.add(ornament_repeat_d);

  const ornament_repeat_e = finial_center_ridge.clone();
  ornament_repeat_e.name = "ornament_repeat_e";
  ornament_repeat_e.rotation.y = Math.PI * 2 / 3;
  finial_ornament.add(ornament_repeat_e);

  const ornament_repeat_f = finial_center_ridge.clone();
  ornament_repeat_f.name = "ornament_repeat_f";
  ornament_repeat_f.rotation.y = Math.PI * 4 / 3;
  finial_ornament.add(ornament_repeat_f);

  const finial_leaf_inlaysGeom = new THREE.SphereGeometry(1, 12, 8);
  const finial_leaf_inlays = new THREE.InstancedMesh(finial_leaf_inlaysGeom, patinaMat, 12);
  finial_leaf_inlays.name = "finial_leaf_inlays";
  const leafData = [
    [1.18, 3.53, -0.55, 0.027, 0.075],
    [1.36, 3.67, 0.35, 0.024, 0.085],
    [1.50, 3.75, 0.00, 0.022, 0.095],
    [1.64, 3.75, 0.00, 0.022, 0.095],
    [1.78, 3.67, -0.35, 0.024, 0.085],
    [2.00, 3.53, 0.55, 0.027, 0.075],
    [1.08, 3.39, -0.75, 0.020, 0.055],
    [1.42, 3.43, 0.55, 0.020, 0.060],
    [1.70, 3.43, -0.55, 0.020, 0.060],
    [2.04, 3.39, 0.75, 0.020, 0.055],
    [1.28, 3.76, -0.25, 0.018, 0.065],
    [1.86, 3.76, 0.25, 0.018, 0.065],
  ];
  for (let i = 0; i < leafData.length; i++) {
    const data = leafData[i];
    const angle = data[0];
    const radius = finialRadiusAt(data[1]) + 0.013;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    setSurfaceMatrix(
      finial_leaf_inlays,
      i,
      normal.x * radius,
      data[1],
      normal.z * radius,
      normal,
      data[3],
      data[4],
      0.007,
      data[2]
    );
  }
  finial_leaf_inlays.instanceMatrix.needsUpdate = true;
  finial_ornament.add(finial_leaf_inlays);

  const finial_leaf_highlights = new THREE.InstancedMesh(
    finial_leaf_inlaysGeom,
    silverHighlightMat,
    12
  );
  finial_leaf_highlights.name = "finial_leaf_highlights";
  for (let i = 0; i < leafData.length; i++) {
    const data = leafData[i];
    const angle = data[0];
    const radius = finialRadiusAt(data[1]) + 0.021;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    setSurfaceMatrix(
      finial_leaf_highlights,
      i,
      normal.x * radius,
      data[1],
      normal.z * radius,
      normal,
      data[3] * 0.38,
      data[4] * 0.72,
      0.004,
      data[2]
    );
  }
  finial_leaf_highlights.instanceMatrix.needsUpdate = true;
  finial_ornament.add(finial_leaf_highlights);

  const finial_leaf_repeat_a = finial_leaf_inlays.clone();
  finial_leaf_repeat_a.name = "finial_leaf_repeat_a";
  finial_leaf_repeat_a.rotation.y = Math.PI * 2 / 3;
  finial_ornament.add(finial_leaf_repeat_a);

  const finial_leaf_repeat_b = finial_leaf_inlays.clone();
  finial_leaf_repeat_b.name = "finial_leaf_repeat_b";
  finial_leaf_repeat_b.rotation.y = Math.PI * 4 / 3;
  finial_ornament.add(finial_leaf_repeat_b);

  const finial_leaf_highlight_repeat_a = finial_leaf_highlights.clone();
  finial_leaf_highlight_repeat_a.name = "finial_leaf_highlight_repeat_a";
  finial_leaf_highlight_repeat_a.rotation.y = Math.PI * 2 / 3;
  finial_ornament.add(finial_leaf_highlight_repeat_a);

  const finial_leaf_highlight_repeat_b = finial_leaf_highlights.clone();
  finial_leaf_highlight_repeat_b.name = "finial_leaf_highlight_repeat_b";
  finial_leaf_highlight_repeat_b.rotation.y = Math.PI * 4 / 3;
  finial_ornament.add(finial_leaf_highlight_repeat_b);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}