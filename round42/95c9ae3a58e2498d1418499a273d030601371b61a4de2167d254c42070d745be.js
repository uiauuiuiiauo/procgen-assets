export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "walnut_hutch";

  const cabinet_width = 1.18;
  const cabinet_depth = 0.56;
  const lower_top = 1.03;
  const upper_top = 2.24;

  const walnutMat = new THREE.MeshStandardMaterial({
    color: 0x4a281b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const walnutTrimMat = new THREE.MeshStandardMaterial({
    color: 0x6b3a24,
    metalness: 0.0,
    roughness: 0.6,
  });
  const walnutPanelMat = new THREE.MeshStandardMaterial({
    color: 0x552d1d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x24140f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const interiorWoodMat = new THREE.MeshStandardMaterial({
    color: 0x301b14,
    metalness: 0.0,
    roughness: 0.6,
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  function add_box(name, width, height, depth, material, x, y, z, parent = root) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material
    );
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const lower_sideGeom = new THREE.BoxGeometry(0.075, 0.82, cabinet_depth);
  const left_lower_side = new THREE.Mesh(lower_sideGeom, walnutMat);
  left_lower_side.name = "left_lower_side";
  left_lower_side.position.set(-0.5525, 0.62, 0);
  root.add(left_lower_side);

  const right_lower_side = new THREE.Mesh(lower_sideGeom, walnutMat);
  right_lower_side.name = "right_lower_side";
  right_lower_side.position.set(0.5525, 0.62, 0);
  root.add(right_lower_side);

  const lower_back = add_box(
    "lower_back", 1.03, 0.78, 0.035, interiorWoodMat,
    0, 0.62, -0.262
  );

  const lower_bottom = add_box(
    "lower_bottom", 1.08, 0.07, 0.52, walnutMat,
    0, 0.235, 0
  );
  const lower_top_rail = add_box(
    "lower_top_rail", 1.10, 0.075, 0.54, walnutMat,
    0, 0.985, 0
  );

  const lower_left_front_stile = add_box(
    "lower_left_front_stile", 0.085, 0.82, 0.07,
    walnutTrimMat, -0.548, 0.62, 0.292
  );
  const lower_right_front_stile = add_box(
    "lower_right_front_stile", 0.085, 0.82, 0.07,
    walnutTrimMat, 0.548, 0.62, 0.292
  );

  const lower_left_side_inset = add_box(
    "lower_left_side_inset", 0.014, 0.68, 0.39,
    walnutPanelMat, -0.594, 0.62, -0.015
  );
  const lower_right_side_inset = add_box(
    "lower_right_side_inset", 0.014, 0.68, 0.39,
    walnutPanelMat, 0.594, 0.62, -0.015
  );

  const lower_side_vertical_trimGeom = new THREE.BoxGeometry(0.018, 0.72, 0.035);
  const lower_side_vertical_trims = new THREE.InstancedMesh(
    lower_side_vertical_trimGeom, darkWoodMat, 4
  );
  lower_side_vertical_trims.name = "lower_side_vertical_trims";
  const lower_trim_dummy = new THREE.Object3D();
  let lower_trim_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.215, 0.185]) {
      lower_trim_dummy.position.set(side * 0.603, 0.62, z);
      lower_trim_dummy.rotation.set(0, 0, 0);
      lower_trim_dummy.scale.set(1, 1, 1);
      lower_trim_dummy.updateMatrix();
      lower_side_vertical_trims.setMatrixAt(lower_trim_index++, lower_trim_dummy.matrix);
    }
  }
  lower_side_vertical_trims.instanceMatrix.needsUpdate = true;
  root.add(lower_side_vertical_trims);

  const lower_side_horizontal_trimGeom = new THREE.BoxGeometry(0.018, 0.04, 0.43);
  const lower_side_horizontal_trims = new THREE.InstancedMesh(
    lower_side_horizontal_trimGeom, darkWoodMat, 4
  );
  lower_side_horizontal_trims.name = "lower_side_horizontal_trims";
  lower_trim_index = 0;
  for (const side of [-1, 1]) {
    for (const y of [0.26, 0.98]) {
      lower_trim_dummy.position.set(side * 0.603, y, -0.015);
      lower_trim_dummy.updateMatrix();
      lower_side_horizontal_trims.setMatrixAt(lower_trim_index++, lower_trim_dummy.matrix);
    }
  }
  lower_side_horizontal_trims.instanceMatrix.needsUpdate = true;
  root.add(lower_side_horizontal_trims);

  const upper_sideGeom = new THREE.BoxGeometry(0.075, 1.18, cabinet_depth);
  const left_upper_side = new THREE.Mesh(upper_sideGeom, walnutMat);
  left_upper_side.name = "left_upper_side";
  left_upper_side.position.set(-0.5525, 1.63, 0);
  root.add(left_upper_side);

  const right_upper_side = new THREE.Mesh(upper_sideGeom, walnutMat);
  right_upper_side.name = "right_upper_side";
  right_upper_side.position.set(0.5525, 1.63, 0);
  root.add(right_upper_side);

  const upper_back = add_box(
    "upper_back", 1.03, 1.14, 0.035, interiorWoodMat,
    0, 1.63, -0.262
  );

  const upper_bottom_shelf = add_box(
    "upper_bottom_shelf", 1.09, 0.075, 0.54, walnutMat,
    0, 1.055, 0
  );
  const upper_top_rail = add_box(
    "upper_top_rail", 1.10, 0.09, 0.54, walnutMat,
    0, 2.185, 0
  );

  const upper_left_front_stile = add_box(
    "upper_left_front_stile", 0.085, 1.17, 0.07,
    walnutTrimMat, -0.548, 1.63, 0.292
  );
  const upper_right_front_stile = add_box(
    "upper_right_front_stile", 0.085, 1.17, 0.07,
    walnutTrimMat, 0.548, 1.63, 0.292
  );

  const upper_left_side_inset = add_box(
    "upper_left_side_inset", 0.014, 1.05, 0.39,
    walnutPanelMat, -0.594, 1.63, -0.015
  );
  const upper_right_side_inset = add_box(
    "upper_right_side_inset", 0.014, 1.05, 0.39,
    walnutPanelMat, 0.594, 1.63, -0.015
  );

  const upper_side_vertical_trimGeom = new THREE.BoxGeometry(0.018, 1.09, 0.035);
  const upper_side_vertical_trims = new THREE.InstancedMesh(
    upper_side_vertical_trimGeom, darkWoodMat, 4
  );
  upper_side_vertical_trims.name = "upper_side_vertical_trims";
  const upper_trim_dummy = new THREE.Object3D();
  let upper_trim_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.215, 0.185]) {
      upper_trim_dummy.position.set(side * 0.603, 1.63, z);
      upper_trim_dummy.rotation.set(0, 0, 0);
      upper_trim_dummy.scale.set(1, 1, 1);
      upper_trim_dummy.updateMatrix();
      upper_side_vertical_trims.setMatrixAt(upper_trim_index++, upper_trim_dummy.matrix);
    }
  }
  upper_side_vertical_trims.instanceMatrix.needsUpdate = true;
  root.add(upper_side_vertical_trims);

  const upper_side_horizontal_trimGeom = new THREE.BoxGeometry(0.018, 0.04, 0.43);
  const upper_side_horizontal_trims = new THREE.InstancedMesh(
    upper_side_horizontal_trimGeom, darkWoodMat, 4
  );
  upper_side_horizontal_trims.name = "upper_side_horizontal_trims";
  upper_trim_index = 0;
  for (const side of [-1, 1]) {
    for (const y of [1.09, 2.17]) {
      upper_trim_dummy.position.set(side * 0.603, y, -0.015);
      upper_trim_dummy.updateMatrix();
      upper_side_horizontal_trims.setMatrixAt(upper_trim_index++, upper_trim_dummy.matrix);
    }
  }
  upper_side_horizontal_trims.instanceMatrix.needsUpdate = true;
  root.add(upper_side_horizontal_trims);

  const upper_shelf = add_box(
    "upper_shelf", 1.02, 0.045, 0.49, walnutMat,
    0, 1.485, 0.015
  );
  const upper_shelf_fascia = add_box(
    "upper_shelf_fascia", 1.03, 0.065, 0.055,
    walnutTrimMat, 0, 1.485, 0.292
  );

  const upper_arch_bracketShape = new THREE.Shape();
  upper_arch_bracketShape.moveTo(0.34, 0.04);
  upper_arch_bracketShape.lineTo(0.48, 0.04);
  upper_arch_bracketShape.lineTo(0.48, -0.08);
  upper_arch_bracketShape.bezierCurveTo(0.45, -0.08, 0.43, -0.055, 0.41, -0.025);
  upper_arch_bracketShape.bezierCurveTo(0.39, 0.005, 0.36, 0.025, 0.34, 0.025);
  upper_arch_bracketShape.closePath();
  const upper_arch_bracketGeom = new THREE.ExtrudeGeometry(
    upper_arch_bracketShape,
    {
      depth: 0.035,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 2,
    }
  );

  const right_upper_arch_bracket = new THREE.Mesh(
    upper_arch_bracketGeom, walnutTrimMat
  );
  right_upper_arch_bracket.name = "right_upper_arch_bracket";
  right_upper_arch_bracket.position.set(0, 2.075, 0.294);
  root.add(right_upper_arch_bracket);

  const left_upper_arch_bracket = new THREE.Mesh(
    upper_arch_bracketGeom, walnutTrimMat
  );
  left_upper_arch_bracket.name = "left_upper_arch_bracket";
  left_upper_arch_bracket.position.set(0, 2.075, 0.294);
  left_upper_arch_bracket.scale.x = -1;
  root.add(left_upper_arch_bracket);

  const arch_points = [
    new THREE.Vector3(-0.48, 2.075, 0.337),
    new THREE.Vector3(-0.36, 2.075, 0.337),
    new THREE.Vector3(-0.27, 2.135, 0.337),
    new THREE.Vector3(0, 2.18, 0.337),
    new THREE.Vector3(0.27, 2.135, 0.337),
    new THREE.Vector3(0.36, 2.075, 0.337),
    new THREE.Vector3(0.48, 2.075, 0.337),
  ];
  const upper_arch_trimGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(arch_points, false, "centripetal"),
    48,
    0.014,
    8,
    false
  );
  const upper_arch_trim = new THREE.Mesh(upper_arch_trimGeom, walnutTrimMat);
  upper_arch_trim.name = "upper_arch_trim";
  root.add(upper_arch_trim);

  const upper_flutingGeom = new THREE.BoxGeometry(0.009, 0.82, 0.012);
  const upper_fluting = new THREE.InstancedMesh(
    upper_flutingGeom, darkWoodMat, 4
  );
  upper_fluting.name = "upper_fluting";
  const fluting_dummy = new THREE.Object3D();
  let fluting_index = 0;
  for (const side of [-1, 1]) {
    for (const offset of [0.021, 0.046]) {
      fluting_dummy.position.set(
        side * (0.548 - offset),
        1.62,
        0.334
      );
      fluting_dummy.rotation.set(0, 0, 0);
      fluting_dummy.scale.set(1, 1, 1);
      fluting_dummy.updateMatrix();
      upper_fluting.setMatrixAt(fluting_index++, fluting_dummy.matrix);
    }
  }
  upper_fluting.instanceMatrix.needsUpdate = true;
  root.add(upper_fluting);

  const lower_doorGeom = new THREE.BoxGeometry(0.495, 0.69, 0.035);
  const lower_left_door = new THREE.Mesh(lower_doorGeom, walnutMat);
  lower_left_door.name = "lower_left_door";
  lower_left_door.position.set(-0.2525, 0.61, 0.316);
  root.add(lower_left_door);

  const lower_right_door = new THREE.Mesh(lower_doorGeom, walnutMat);
  lower_right_door.name = "lower_right_door";
  lower_right_door.position.set(0.2525, 0.61, 0.316);
  root.add(lower_right_door);

  const lower_panel_shadowGeom = new THREE.BoxGeometry(0.36, 0.50, 0.018);
  const lower_left_panel_shadow = new THREE.Mesh(
    lower_panel_shadowGeom, darkWoodMat
  );
  lower_left_panel_shadow.name = "lower_left_panel_shadow";
  lower_left_panel_shadow.position.set(-0.2525, 0.61, 0.342);
  root.add(lower_left_panel_shadow);

  const lower_right_panel_shadow = new THREE.Mesh(
    lower_panel_shadowGeom, darkWoodMat
  );
  lower_right_panel_shadow.name = "lower_right_panel_shadow";
  lower_right_panel_shadow.position.set(0.2525, 0.61, 0.342);
  root.add(lower_right_panel_shadow);

  const lower_panelShape = new THREE.Shape();
  lower_panelShape.moveTo(-0.14, -0.19);
  lower_panelShape.lineTo(0.14, -0.19);
  lower_panelShape.lineTo(0.14, 0.19);
  lower_panelShape.lineTo(-0.14, 0.19);
  lower_panelShape.closePath();
  const lower_panelGeom = new THREE.ExtrudeGeometry(lower_panelShape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.018,
    bevelSegments: 2,
  });

  const lower_left_panel = new THREE.Mesh(lower_panelGeom, walnutPanelMat);
  lower_left_panel.name = "lower_left_panel";
  lower_left_panel.position.set(-0.2525, 0.61, 0.352);
  root.add(lower_left_panel);

  const lower_right_panel = new THREE.Mesh(lower_panelGeom, walnutPanelMat);
  lower_right_panel.name = "lower_right_panel";
  lower_right_panel.position.set(0.2525, 0.61, 0.352);
  root.add(lower_right_panel);

  const lower_panel_horizontal_moldingGeom =
    new THREE.CylinderGeometry(0.012, 0.012, 0.31, 10);
  const lower_panel_horizontal_moldings = new THREE.InstancedMesh(
    lower_panel_horizontal_moldingGeom, walnutTrimMat, 4
  );
  lower_panel_horizontal_moldings.name = "lower_panel_horizontal_moldings";
  const panel_dummy = new THREE.Object3D();
  let panel_index = 0;
  for (const x of [-0.2525, 0.2525]) {
    for (const y of [0.405, 0.815]) {
      panel_dummy.position.set(x, y, 0.385);
      panel_dummy.rotation.set(0, 0, Math.PI / 2);
      panel_dummy.scale.set(1, 1, 1);
      panel_dummy.updateMatrix();
      lower_panel_horizontal_moldings.setMatrixAt(panel_index++, panel_dummy.matrix);
    }
  }
  lower_panel_horizontal_moldings.instanceMatrix.needsUpdate = true;
  root.add(lower_panel_horizontal_moldings);

  const lower_panel_vertical_moldingGeom =
    new THREE.CylinderGeometry(0.012, 0.012, 0.39, 10);
  const lower_panel_vertical_moldings = new THREE.InstancedMesh(
    lower_panel_vertical_moldingGeom, walnutTrimMat, 4
  );
  lower_panel_vertical_moldings.name = "lower_panel_vertical_moldings";
  panel_index = 0;
  for (const x of [-0.2525, 0.2525]) {
    for (const offset of [-0.155, 0.155]) {
      panel_dummy.position.set(x + offset, 0.61, 0.385);
      panel_dummy.rotation.set(0, 0, 0);
      panel_dummy.updateMatrix();
      lower_panel_vertical_moldings.setMatrixAt(panel_index++, panel_dummy.matrix);
    }
  }
  lower_panel_vertical_moldings.instanceMatrix.needsUpdate = true;
  root.add(lower_panel_vertical_moldings);

  const lower_center_seam = add_box(
    "lower_center_seam", 0.014, 0.69, 0.012,
    darkWoodMat, 0, 0.61, 0.354
  );

  const knob_stemGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.05, 12);
  const lower_left_knob_stem = new THREE.Mesh(knob_stemGeom, hardwareMat);
  lower_left_knob_stem.name = "lower_left_knob_stem";
  lower_left_knob_stem.rotation.x = Math.PI / 2;
  lower_left_knob_stem.position.set(-0.065, 0.61, 0.378);
  root.add(lower_left_knob_stem);

  const lower_right_knob_stem = new THREE.Mesh(knob_stemGeom, hardwareMat);
  lower_right_knob_stem.name = "lower_right_knob_stem";
  lower_right_knob_stem.rotation.x = Math.PI / 2;
  lower_right_knob_stem.position.set(0.065, 0.61, 0.378);
  root.add(lower_right_knob_stem);

  const knobGeom = new THREE.SphereGeometry(0.034, 16, 10);
  const lower_left_knob = new THREE.Mesh(knobGeom, hardwareMat);
  lower_left_knob.name = "lower_left_knob";
  lower_left_knob.position.set(-0.065, 0.61, 0.412);
  lower_left_knob.scale.set(0.9, 1.0, 0.8);
  root.add(lower_left_knob);

  const lower_right_knob = new THREE.Mesh(knobGeom, hardwareMat);
  lower_right_knob.name = "lower_right_knob";
  lower_right_knob.position.set(0.065, 0.61, 0.412);
  lower_right_knob.scale.set(0.9, 1.0, 0.8);
  root.add(lower_right_knob);

  const hinge_plateGeom = new THREE.BoxGeometry(0.026, 0.105, 0.018);
  const lower_hinge_plates = new THREE.InstancedMesh(
    hinge_plateGeom, hardwareMat, 4
  );
  lower_hinge_plates.name = "lower_hinge_plates";
  const hinge_dummy = new THREE.Object3D();
  const hinge_positions = [
    [-0.495, 0.42],
    [-0.495, 0.80],
    [0.495, 0.42],
    [0.495, 0.80],
  ];
  for (let i = 0; i < hinge_positions.length; i++) {
    hinge_dummy.position.set(
      hinge_positions[i][0],
      hinge_positions[i][1],
      0.365
    );
    hinge_dummy.rotation.set(0, 0, 0);
    hinge_dummy.scale.set(1, 1, 1);
    hinge_dummy.updateMatrix();
    lower_hinge_plates.setMatrixAt(i, hinge_dummy.matrix);
  }
  lower_hinge_plates.instanceMatrix.needsUpdate = true;
  root.add(lower_hinge_plates);

  const hinge_barrelGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.115, 10);
  const lower_hinge_barrels = new THREE.InstancedMesh(
    hinge_barrelGeom, hardwareMat, 4
  );
  lower_hinge_barrels.name = "lower_hinge_barrels";
  for (let i = 0; i < hinge_positions.length; i++) {
    const side = hinge_positions[i][0] < 0 ? -1 : 1;
    hinge_dummy.position.set(
      hinge_positions[i][0] + side * 0.017,
      hinge_positions[i][1],
      0.378
    );
    hinge_dummy.updateMatrix();
    lower_hinge_barrels.setMatrixAt(i, hinge_dummy.matrix);
  }
  lower_hinge_barrels.instanceMatrix.needsUpdate = true;
  root.add(lower_hinge_barrels);

  const lower_front_flutingGeom = new THREE.BoxGeometry(0.009, 0.56, 0.012);
  const lower_front_fluting = new THREE.InstancedMesh(
    lower_front_flutingGeom, darkWoodMat, 4
  );
  lower_front_fluting.name = "lower_front_fluting";
  fluting_index = 0;
  for (const side of [-1, 1]) {
    for (const offset of [0.021, 0.046]) {
      fluting_dummy.position.set(
        side * (0.548 - offset),
        0.61,
        0.334
      );
      fluting_dummy.updateMatrix();
      lower_front_fluting.setMatrixAt(fluting_index++, fluting_dummy.matrix);
    }
  }
  lower_front_fluting.instanceMatrix.needsUpdate = true;
  root.add(lower_front_fluting);

  const middle_transitionGeom = new THREE.BoxGeometry(1.25, 0.055, 0.60);
  const middle_transition = new THREE.Mesh(middle_transitionGeom, walnutMat);
  middle_transition.name = "middle_transition";
  middle_transition.position.set(0, lower_top, 0);
  root.add(middle_transition);

  const middle_front_moldingGeom =
    new THREE.CylinderGeometry(0.026, 0.026, 1.29, 14);
  const middle_front_molding = new THREE.Mesh(
    middle_front_moldingGeom, walnutTrimMat
  );
  middle_front_molding.name = "middle_front_molding";
  middle_front_molding.rotation.z = Math.PI / 2;
  middle_front_molding.position.set(0, 1.045, 0.323);
  root.add(middle_front_molding);

  const middle_side_moldingGeom =
    new THREE.CylinderGeometry(0.021, 0.021, 0.58, 12);
  const middle_side_moldings = new THREE.InstancedMesh(
    middle_side_moldingGeom, walnutTrimMat, 2
  );
  middle_side_moldings.name = "middle_side_moldings";
  const middle_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    middle_dummy.position.set(i === 0 ? -0.625 : 0.625, 1.045, 0);
    middle_dummy.rotation.set(Math.PI / 2, 0, 0);
    middle_dummy.scale.set(1, 1, 1);
    middle_dummy.updateMatrix();
    middle_side_moldings.setMatrixAt(i, middle_dummy.matrix);
  }
  middle_side_moldings.instanceMatrix.needsUpdate = true;
  root.add(middle_side_moldings);

  const top_crownShape = new THREE.Shape();
  top_crownShape.moveTo(-0.61, -0.06);
  top_crownShape.lineTo(-0.61, 0.005);
  top_crownShape.bezierCurveTo(-0.61, 0.035, -0.59, 0.05, -0.55, 0.055);
  top_crownShape.lineTo(-0.55, 0.085);
  top_crownShape.lineTo(-0.49, 0.105);
  top_crownShape.lineTo(0.49, 0.105);
  top_crownShape.lineTo(0.55, 0.085);
  top_crownShape.lineTo(0.55, 0.055);
  top_crownShape.lineTo(0.61, 0.005);
  top_crownShape.lineTo(0.61, -0.06);
  top_crownShape.closePath();
  const top_crownGeom = new THREE.ExtrudeGeometry(top_crownShape, {
    depth: 0.62,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const top_crown = new THREE.Mesh(top_crownGeom, walnutMat);
  top_crown.name = "top_crown";
  top_crown.position.set(0, upper_top, -0.31);
  root.add(top_crown);

  const top_front_beadGeom =
    new THREE.CylinderGeometry(0.026, 0.026, 1.25, 14);
  const top_front_bead = new THREE.Mesh(top_front_beadGeom, walnutTrimMat);
  top_front_bead.name = "top_front_bead";
  top_front_bead.rotation.z = Math.PI / 2;
  top_front_bead.position.set(0, 2.205, 0.326);
  root.add(top_front_bead);

  const top_inner_beadGeom =
    new THREE.CylinderGeometry(0.018, 0.018, 1.17, 12);
  const top_inner_bead = new THREE.Mesh(top_inner_beadGeom, walnutTrimMat);
  top_inner_bead.name = "top_inner_bead";
  top_inner_bead.rotation.z = Math.PI / 2;
  top_inner_bead.position.set(0, 2.255, 0.329);
  root.add(top_inner_bead);

  const top_lipGeom = new THREE.BoxGeometry(1.31, 0.045, 0.66);
  const top_lip = new THREE.Mesh(top_lipGeom, walnutTrimMat);
  top_lip.name = "top_lip";
  top_lip.position.set(0, 2.325, 0);
  root.add(top_lip);

  const top_lip_beadGeom =
    new THREE.CylinderGeometry(0.019, 0.019, 1.33, 12);
  const top_lip_bead = new THREE.Mesh(top_lip_beadGeom, walnutTrimMat);
  top_lip_bead.name = "top_lip_bead";
  top_lip_bead.rotation.z = Math.PI / 2;
  top_lip_bead.position.set(0, 2.345, 0.337);
  root.add(top_lip_bead);

  const base_front_rail = add_box(
    "base_front_rail", 1.18, 0.11, 0.09,
    walnutTrimMat, 0, 0.225, 0.285
  );
  const base_side_railGeom = new THREE.BoxGeometry(0.09, 0.11, 0.52);
  const base_side_rails = new THREE.InstancedMesh(
    base_side_railGeom, walnutTrimMat, 2
  );
  base_side_rails.name = "base_side_rails";
  const base_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    base_dummy.position.set(i === 0 ? -0.545 : 0.545, 0.225, 0);
    base_dummy.rotation.set(0, 0, 0);
    base_dummy.scale.set(1, 1, 1);
    base_dummy.updateMatrix();
    base_side_rails.setMatrixAt(i, base_dummy.matrix);
  }
  base_side_rails.instanceMatrix.needsUpdate = true;
  root.add(base_side_rails);

  const base_front_beadGeom =
    new THREE.CylinderGeometry(0.018, 0.018, 1.19, 12);
  const base_front_bead = new THREE.Mesh(base_front_beadGeom, walnutTrimMat);
  base_front_bead.name = "base_front_bead";
  base_front_bead.rotation.z = Math.PI / 2;
  base_front_bead.position.set(0, 0.275, 0.337);
  root.add(base_front_bead);

  const legShape = new THREE.Shape();
  legShape.moveTo(-0.075, 0);
  legShape.lineTo(0.075, 0);
  legShape.lineTo(0.065, 0.08);
  legShape.bezierCurveTo(0.045, 0.14, 0.04, 0.22, 0.055, 0.28);
  legShape.bezierCurveTo(0.075, 0.33, 0.105, 0.36, 0.105, 0.40);
  legShape.lineTo(-0.105, 0.40);
  legShape.bezierCurveTo(-0.105, 0.36, -0.075, 0.33, -0.055, 0.28);
  legShape.bezierCurveTo(-0.04, 0.22, -0.045, 0.14, -0.065, 0.08);
  legShape.closePath();

  const legGeom = new THREE.ExtrudeGeometry(legShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  legGeom.translate(0, 0, -0.07);

  const front_left_leg = new THREE.Mesh(legGeom, walnutMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-0.50, -0.17, 0.22);
  root.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(legGeom, walnutMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(0.50, -0.17, 0.22);
  root.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(legGeom, walnutMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-0.50, -0.17, -0.20);
  root.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(legGeom, walnutMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(0.50, -0.17, -0.20);
  root.add(rear_right_leg);

  const left_base_bracket = add_box(
    "left_base_bracket", 0.13, 0.075, 0.18,
    darkWoodMat, -0.42, 0.19, 0.18
  );
  left_base_bracket.rotation.z = -0.18;

  const right_base_bracket = add_box(
    "right_base_bracket", 0.13, 0.075, 0.18,
    darkWoodMat, 0.42, 0.19, 0.18
  );
  right_base_bracket.rotation.z = 0.18;

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