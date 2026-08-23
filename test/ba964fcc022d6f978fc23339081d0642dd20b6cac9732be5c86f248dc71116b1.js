export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cassette_tape";

  const shell_group = new THREE.Group();
  shell_group.name = "shell_group";
  root.add(shell_group);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  root.add(label_group);

  const tape_window_group = new THREE.Group();
  tape_window_group.name = "tape_window_group";
  root.add(tape_window_group);

  const mechanism_group = new THREE.Group();
  mechanism_group.name = "mechanism_group";
  root.add(mechanism_group);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x0879b8,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.82
  });
  const dark_blueMat = new THREE.MeshStandardMaterial({
    color: 0x164d73,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xd82f38,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.78
  });
  const cyan_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x12b9d4,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.72
  });
  const purple_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x70459c,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.72
  });
  const amber_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xff9a20,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.72
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf2efe4,
    metalness: 0.0,
    roughness: 0.7
  });
  const pale_blueMat = new THREE.MeshStandardMaterial({
    color: 0xbcecf1,
    metalness: 0.0,
    roughness: 0.7
  });
  const pale_pinkMat = new THREE.MeshStandardMaterial({
    color: 0xf4c8d6,
    metalness: 0.0,
    roughness: 0.7
  });
  const pale_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffdc62,
    metalness: 0.0,
    roughness: 0.7
  });
  const pale_greenMat = new THREE.MeshStandardMaterial({
    color: 0xc7ed85,
    metalness: 0.0,
    roughness: 0.7
  });
  const red_inkMat = new THREE.MeshStandardMaterial({
    color: 0xe33b32,
    metalness: 0.0,
    roughness: 0.7
  });
  const cyan_inkMat = new THREE.MeshStandardMaterial({
    color: 0x27a9cf,
    metalness: 0.0,
    roughness: 0.7
  });
  const yellow_inkMat = new THREE.MeshStandardMaterial({
    color: 0xf4cf3e,
    metalness: 0.0,
    roughness: 0.7
  });
  const green_inkMat = new THREE.MeshStandardMaterial({
    color: 0x75b93e,
    metalness: 0.0,
    roughness: 0.7
  });
  const purple_inkMat = new THREE.MeshStandardMaterial({
    color: 0x7650a4,
    metalness: 0.0,
    roughness: 0.7
  });
  const dark_printMat = new THREE.MeshStandardMaterial({
    color: 0x24323a,
    metalness: 0.0,
    roughness: 0.7
  });
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x263540,
    metalness: 0.0,
    roughness: 0.3
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    metalness: 0.0,
    roughness: 0.8
  });
  const screw_slotMat = new THREE.MeshStandardMaterial({
    color: 0x45474c,
    metalness: 0.0,
    roughness: 0.8
  });
  const tape_blackMat = new THREE.MeshStandardMaterial({
    color: 0x17191e,
    metalness: 0.0,
    roughness: 0.8
  });
  const tape_burgundyMat = new THREE.MeshStandardMaterial({
    color: 0x713440,
    metalness: 0.0,
    roughness: 0.8
  });
  const tape_grayMat = new THREE.MeshStandardMaterial({
    color: 0x77787a,
    metalness: 0.0,
    roughness: 0.8
  });
  const tape_silverMat = new THREE.MeshStandardMaterial({
    color: 0xbfc0c0,
    metalness: 0.0,
    roughness: 0.8
  });
  const white_hubMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8df,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const clear_guardMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.42
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
    shape.closePath();
    return shape;
  }

  function roundedRectGeometry(width, height, radius, depth, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth: depth,
        steps: 1,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function addFlatBox(name, width, height, depth, material, x, y, z, parent) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const outer_shellGeom = roundedRectGeometry(3.2, 1.8, 0.17, 0.28, 0.025);
  const outer_shell = new THREE.Mesh(outer_shellGeom, blue_plasticMat);
  outer_shell.name = "outer_shell";
  shell_group.add(outer_shell);

  const rear_backplateGeom = roundedRectGeometry(3.08, 1.68, 0.14, 0.04, 0.008);
  const rear_backplate = new THREE.Mesh(rear_backplateGeom, dark_blueMat);
  rear_backplate.name = "rear_backplate";
  rear_backplate.position.z = -0.15;
  shell_group.add(rear_backplate);

  const top_edge_railGeom = new THREE.BoxGeometry(2.86, 0.075, 0.09);
  const top_edge_rail = new THREE.Mesh(top_edge_railGeom, dark_blueMat);
  top_edge_rail.name = "top_edge_rail";
  top_edge_rail.position.set(0, 0.845, 0.145);
  shell_group.add(top_edge_rail);

  const bottom_edge_railGeom = new THREE.BoxGeometry(2.72, 0.075, 0.09);
  const bottom_edge_rail = new THREE.Mesh(bottom_edge_railGeom, dark_blueMat);
  bottom_edge_rail.name = "bottom_edge_rail";
  bottom_edge_rail.position.set(0, -0.845, 0.145);
  shell_group.add(bottom_edge_rail);

  const left_side_railGeom = new THREE.BoxGeometry(0.075, 1.45, 0.09);
  const left_side_rail = new THREE.Mesh(left_side_railGeom, dark_blueMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-1.555, -0.02, 0.145);
  shell_group.add(left_side_rail);

  const right_side_railGeom = new THREE.BoxGeometry(0.075, 1.45, 0.09);
  const right_side_rail = new THREE.Mesh(right_side_railGeom, dark_blueMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(1.555, -0.02, 0.145);
  shell_group.add(right_side_rail);

  const top_rainbow_cyan = addFlatBox(
    "top_rainbow_cyan", 0.46, 0.038, 0.012,
    cyan_inkMat, -1.02, 0.826, 0.196, shell_group
  );
  const top_rainbow_green = addFlatBox(
    "top_rainbow_green", 0.34, 0.038, 0.012,
    green_inkMat, -0.66, 0.826, 0.196, shell_group
  );
  const top_rainbow_amber = addFlatBox(
    "top_rainbow_amber", 0.43, 0.038, 0.012,
    amber_plasticMat, -0.27, 0.826, 0.196, shell_group
  );
  const top_rainbow_red = addFlatBox(
    "top_rainbow_red", 0.43, 0.038, 0.012,
    red_inkMat, 0.16, 0.826, 0.196, shell_group
  );
  const top_rainbow_purple = addFlatBox(
    "top_rainbow_purple", 0.46, 0.038, 0.012,
    purple_inkMat, 0.61, 0.826, 0.196, shell_group
  );
  const top_rainbow_blue = addFlatBox(
    "top_rainbow_blue", 0.62, 0.038, 0.012,
    cyan_plasticMat, 1.08, 0.826, 0.196, shell_group
  );

  const label_borderGeom = roundedRectGeometry(2.96, 1.27, 0.105, 0.018, 0.004);
  const label_border = new THREE.Mesh(label_borderGeom, dark_blueMat);
  label_border.name = "label_border";
  label_border.position.set(0, 0.13, 0.158);
  label_group.add(label_border);

  const paper_labelGeom = roundedRectGeometry(2.87, 1.18, 0.075, 0.014, 0.003);
  const paper_label = new THREE.Mesh(paper_labelGeom, paperMat);
  paper_label.name = "paper_label";
  paper_label.position.set(0, 0.13, 0.176);
  label_group.add(paper_label);

  const label_cyan_washShape = new THREE.Shape();
  label_cyan_washShape.moveTo(-1.36, 0.68);
  label_cyan_washShape.lineTo(-0.72, 0.68);
  label_cyan_washShape.lineTo(-1.08, 0.25);
  label_cyan_washShape.lineTo(-1.36, 0.27);
  label_cyan_washShape.closePath();
  const label_cyan_washGeom = new THREE.ShapeGeometry(label_cyan_washShape);
  const label_cyan_wash = new THREE.Mesh(label_cyan_washGeom, pale_blueMat);
  label_cyan_wash.name = "label_cyan_wash";
  label_cyan_wash.position.z = 0.187;
  label_group.add(label_cyan_wash);

  const label_pink_washShape = new THREE.Shape();
  label_pink_washShape.moveTo(0.25, 0.68);
  label_pink_washShape.lineTo(1.02, 0.68);
  label_pink_washShape.lineTo(0.84, 0.29);
  label_pink_washShape.lineTo(0.12, 0.25);
  label_pink_washShape.closePath();
  const label_pink_washGeom = new THREE.ShapeGeometry(label_pink_washShape);
  const label_pink_wash = new THREE.Mesh(label_pink_washGeom, pale_pinkMat);
  label_pink_wash.name = "label_pink_wash";
  label_pink_wash.position.z = 0.188;
  label_group.add(label_pink_wash);

  const label_yellow_washShape = new THREE.Shape();
  label_yellow_washShape.moveTo(1.02, 0.68);
  label_yellow_washShape.lineTo(1.36, 0.55);
  label_yellow_washShape.lineTo(1.36, 0.25);
  label_yellow_washShape.lineTo(0.86, 0.29);
  label_yellow_washShape.closePath();
  const label_yellow_washGeom = new THREE.ShapeGeometry(label_yellow_washShape);
  const label_yellow_wash = new THREE.Mesh(label_yellow_washGeom, pale_yellowMat);
  label_yellow_wash.name = "label_yellow_wash";
  label_yellow_wash.position.z = 0.189;
  label_group.add(label_yellow_wash);

  const label_green_washShape = new THREE.Shape();
  label_green_washShape.moveTo(-0.12, -0.44);
  label_green_washShape.lineTo(0.72, -0.44);
  label_green_washShape.lineTo(0.48, -0.28);
  label_green_washShape.lineTo(-0.25, -0.27);
  label_green_washShape.closePath();
  const label_green_washGeom = new THREE.ShapeGeometry(label_green_washShape);
  const label_green_wash = new THREE.Mesh(label_green_washGeom, pale_greenMat);
  label_green_wash.name = "label_green_wash";
  label_green_wash.position.z = 0.189;
  label_group.add(label_green_wash);

  const label_top_rule = addFlatBox(
    "label_top_rule", 2.72, 0.012, 0.008, cyan_inkMat,
    0, 0.245, 0.197, label_group
  );
  const label_red_band = addFlatBox(
    "label_red_band", 2.76, 0.135, 0.009, red_inkMat,
    0, -0.285, 0.198, label_group
  );

  const barcode_barsGeom = new THREE.BoxGeometry(0.012, 0.15, 0.008);
  const barcode_bars = new THREE.InstancedMesh(barcode_barsGeom, dark_printMat, 11);
  barcode_bars.name = "barcode_bars";
  const barcode_matrix = new THREE.Matrix4();
  const barcode_quaternion = new THREE.Quaternion();
  for (let i = 0; i < 11; i++) {
    const barScale = 0.72 + (i % 4) * 0.14;
    const barPosition = new THREE.Vector3(0.98 + i * 0.034, -0.19, 0.207);
    const barScaleVector = new THREE.Vector3(1, barScale, 1);
    barcode_matrix.compose(barPosition, barcode_quaternion, barScaleVector);
    barcode_bars.setMatrixAt(i, barcode_matrix);
  }
  barcode_bars.instanceMatrix.needsUpdate = true;
  label_group.add(barcode_bars);

  const printed_number_one = addFlatBox(
    "printed_number_one", 0.018, 0.13, 0.008, dark_printMat,
    1.16, 0.18, 0.207, label_group
  );
  printed_number_one.rotation.z = -0.12;
  const printed_number_two = addFlatBox(
    "printed_number_two", 0.018, 0.11, 0.008, dark_printMat,
    1.16, -0.02, 0.207, label_group
  );
  printed_number_two.rotation.z = Math.PI / 2;

  const window_surroundGeom = roundedRectGeometry(2.02, 0.55, 0.255, 0.03, 0.006);
  const window_surround = new THREE.Mesh(window_surroundGeom, dark_blueMat);
  window_surround.name = "window_surround";
  window_surround.position.set(0, -0.03, 0.205);
  tape_window_group.add(window_surround);

  const central_tape_windowGeom = roundedRectGeometry(1.91, 0.46, 0.215, 0.018, 0.003);
  const central_tape_window = new THREE.Mesh(central_tape_windowGeom, windowMat);
  central_tape_window.name = "central_tape_window";
  central_tape_window.position.set(0, -0.03, 0.224);
  tape_window_group.add(central_tape_window);

  const left_reel_backingGeom = new THREE.CylinderGeometry(0.245, 0.245, 0.018, 32);
  const left_reel_backing = new THREE.Mesh(left_reel_backingGeom, tape_blackMat);
  left_reel_backing.name = "left_reel_backing";
  left_reel_backing.rotation.x = Math.PI / 2;
  left_reel_backing.position.set(-0.69, -0.03, 0.242);
  tape_window_group.add(left_reel_backing);

  const right_reel_backingGeom = new THREE.CylinderGeometry(0.245, 0.245, 0.018, 32);
  const right_reel_backing = new THREE.Mesh(right_reel_backingGeom, tape_blackMat);
  right_reel_backing.name = "right_reel_backing";
  right_reel_backing.rotation.x = Math.PI / 2;
  right_reel_backing.position.set(0.69, -0.03, 0.242);
  tape_window_group.add(right_reel_backing);

  const left_reel_colored_tapeGeom = new THREE.TorusGeometry(0.15, 0.035, 10, 32);
  const left_reel_colored_tape = new THREE.Mesh(left_reel_colored_tapeGeom, tape_burgundyMat);
  left_reel_colored_tape.name = "left_reel_colored_tape";
  left_reel_colored_tape.position.set(-0.69, -0.03, 0.256);
  tape_window_group.add(left_reel_colored_tape);

  const right_reel_colored_tapeGeom = new THREE.TorusGeometry(0.15, 0.035, 10, 32);
  const right_reel_colored_tape = new THREE.Mesh(right_reel_colored_tapeGeom, green_inkMat);
  right_reel_colored_tape.name = "right_reel_colored_tape";
  right_reel_colored_tape.position.set(0.69, -0.03, 0.256);
  tape_window_group.add(right_reel_colored_tape);

  const left_reel_hubGeom = new THREE.TorusGeometry(0.145, 0.052, 12, 32);
  const left_reel_hub = new THREE.Mesh(left_reel_hubGeom, white_hubMat);
  left_reel_hub.name = "left_reel_hub";
  left_reel_hub.position.set(-0.69, -0.03, 0.271);
  tape_window_group.add(left_reel_hub);

  const right_reel_hubGeom = new THREE.TorusGeometry(0.145, 0.052, 12, 32);
  const right_reel_hub = new THREE.Mesh(right_reel_hubGeom, white_hubMat);
  right_reel_hub.name = "right_reel_hub";
  right_reel_hub.position.set(0.69, -0.03, 0.271);
  tape_window_group.add(right_reel_hub);

  const left_reel_outer_ringGeom = new THREE.TorusGeometry(0.205, 0.028, 10, 32);
  const left_reel_outer_ring = new THREE.Mesh(left_reel_outer_ringGeom, red_plasticMat);
  left_reel_outer_ring.name = "left_reel_outer_ring";
  left_reel_outer_ring.position.set(-0.69, -0.03, 0.273);
  tape_window_group.add(left_reel_outer_ring);

  const right_reel_outer_ringGeom = new THREE.TorusGeometry(0.205, 0.028, 10, 32);
  const right_reel_outer_ring = new THREE.Mesh(right_reel_outer_ringGeom, green_inkMat);
  right_reel_outer_ring.name = "right_reel_outer_ring";
  right_reel_outer_ring.position.set(0.69, -0.03, 0.273);
  tape_window_group.add(right_reel_outer_ring);

  const reel_teethGeom = new THREE.BoxGeometry(0.052, 0.075, 0.018);
  const reel_teeth = new THREE.InstancedMesh(reel_teethGeom, white_hubMat, 12);
  reel_teeth.name = "reel_teeth";
  const tooth_matrix = new THREE.Matrix4();
  const tooth_axis = new THREE.Vector3(0, 0, 1);
  for (let reelIndex = 0; reelIndex < 2; reelIndex++) {
    const centerX = reelIndex === 0 ? -0.69 : 0.69;
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      const toothPosition = new THREE.Vector3(
        centerX + Math.cos(angle) * 0.145,
        -0.03 + Math.sin(angle) * 0.145,
        0.284
      );
      const toothQuaternion = new THREE.Quaternion().setFromAxisAngle(tooth_axis, angle);
      tooth_matrix.compose(toothPosition, toothQuaternion, new THREE.Vector3(1, 1, 1));
      reel_teeth.setMatrixAt(reelIndex * 6 + i, tooth_matrix);
    }
  }
  reel_teeth.instanceMatrix.needsUpdate = true;
  tape_window_group.add(reel_teeth);

  const center_tape_black_left = addFlatBox(
    "center_tape_black_left", 0.12, 0.29, 0.018, tape_blackMat,
    -0.235, -0.03, 0.253, tape_window_group
  );
  const center_tape_gray = addFlatBox(
    "center_tape_gray", 0.10, 0.29, 0.018, tape_grayMat,
    -0.135, -0.03, 0.253, tape_window_group
  );
  const center_tape_burgundy = addFlatBox(
    "center_tape_burgundy", 0.10, 0.29, 0.018, tape_burgundyMat,
    -0.035, -0.03, 0.253, tape_window_group
  );
  const center_tape_silver = addFlatBox(
    "center_tape_silver", 0.12, 0.29, 0.018, tape_silverMat,
    0.065, -0.03, 0.253, tape_window_group
  );
  const center_tape_white = addFlatBox(
    "center_tape_white", 0.11, 0.29, 0.018, white_hubMat,
    0.165, -0.03, 0.253, tape_window_group
  );
  const center_tape_black_right = addFlatBox(
    "center_tape_black_right", 0.08, 0.29, 0.018, tape_blackMat,
    0.255, -0.03, 0.253, tape_window_group
  );

  const center_tape_upper_shadow = addFlatBox(
    "center_tape_upper_shadow", 0.55, 0.025, 0.02, dark_printMat,
    0.01, 0.115, 0.265, tape_window_group
  );
  const center_tape_lower_shadow = addFlatBox(
    "center_tape_lower_shadow", 0.55, 0.025, 0.02, dark_printMat,
    0.01, -0.175, 0.265, tape_window_group
  );

  const lower_mechanism_shape = new THREE.Shape();
  lower_mechanism_shape.moveTo(-0.62, -0.84);
  lower_mechanism_shape.lineTo(1.18, -0.84);
  lower_mechanism_shape.lineTo(0.91, -0.43);
  lower_mechanism_shape.lineTo(-0.42, -0.43);
  lower_mechanism_shape.closePath();
  const lower_mechanism_coverGeom = new THREE.ExtrudeGeometry(lower_mechanism_shape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  lower_mechanism_coverGeom.translate(0, 0, -0.0125);
  const lower_mechanism_cover = new THREE.Mesh(lower_mechanism_coverGeom, red_plasticMat);
  lower_mechanism_cover.name = "lower_mechanism_cover";
  lower_mechanism_cover.position.z = 0.174;
  mechanism_group.add(lower_mechanism_cover);

  const lower_blue_inset_shape = new THREE.Shape();
  lower_blue_inset_shape.moveTo(-1.38, -0.84);
  lower_blue_inset_shape.lineTo(-0.55, -0.84);
  lower_blue_inset_shape.lineTo(-0.40, -0.43);
  lower_blue_inset_shape.lineTo(-1.35, -0.43);
  lower_blue_inset_shape.closePath();
  const lower_blue_insetGeom = new THREE.ExtrudeGeometry(lower_blue_inset_shape, {
    depth: 0.022,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  lower_blue_insetGeom.translate(0, 0, -0.011);
  const lower_blue_inset = new THREE.Mesh(lower_blue_insetGeom, cyan_plasticMat);
  lower_blue_inset.name = "lower_blue_inset";
  lower_blue_inset.position.z = 0.176;
  mechanism_group.add(lower_blue_inset);

  const lower_guard_plate_shape = new THREE.Shape();
  lower_guard_plate_shape.moveTo(-0.58, -0.82);
  lower_guard_plate_shape.lineTo(1.15, -0.82);
  lower_guard_plate_shape.lineTo(0.88, -0.47);
  lower_guard_plate_shape.lineTo(-0.45, -0.47);
  lower_guard_plate_shape.closePath();
  const lower_guard_plateGeom = new THREE.ExtrudeGeometry(lower_guard_plate_shape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  lower_guard_plateGeom.translate(0, 0, -0.009);
  const lower_guard_plate = new THREE.Mesh(lower_guard_plateGeom, clear_guardMat);
  lower_guard_plate.name = "lower_guard_plate";
  lower_guard_plate.position.z = 0.205;
  mechanism_group.add(lower_guard_plate);

  const lower_mechanism_band = addFlatBox(
    "lower_mechanism_band", 1.45, 0.045, 0.025, purple_plasticMat,
    0.22, -0.49, 0.221, mechanism_group
  );
  lower_mechanism_band.rotation.z = 0.08;

  const lower_left_portGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.025, 20);
  const lower_left_port = new THREE.Mesh(lower_left_portGeom, screwMat);
  lower_left_port.name = "lower_left_port";
  lower_left_port.rotation.x = Math.PI / 2;
  lower_left_port.position.set(-1.05, -0.68, 0.218);
  mechanism_group.add(lower_left_port);

  const lower_left_port_rimGeom = new THREE.TorusGeometry(0.075, 0.012, 8, 24);
  const lower_left_port_rim = new THREE.Mesh(lower_left_port_rimGeom, dark_blueMat);
  lower_left_port_rim.name = "lower_left_port_rim";
  lower_left_port_rim.position.set(-1.05, -0.68, 0.235);
  mechanism_group.add(lower_left_port_rim);

  const lower_green_indicatorGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.024, 20);
  const lower_green_indicator = new THREE.Mesh(lower_green_indicatorGeom, pale_greenMat);
  lower_green_indicator.name = "lower_green_indicator";
  lower_green_indicator.rotation.x = Math.PI / 2;
  lower_green_indicator.position.set(-0.67, -0.72, 0.222);
  mechanism_group.add(lower_green_indicator);

  const lower_metal_pinGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.026, 20);
  const lower_metal_pin = new THREE.Mesh(lower_metal_pinGeom, silverMat);
  lower_metal_pin.name = "lower_metal_pin";
  lower_metal_pin.rotation.x = Math.PI / 2;
  lower_metal_pin.position.set(0.57, -0.68, 0.226);
  mechanism_group.add(lower_metal_pin);

  const lower_red_indicatorGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.026, 20);
  const lower_red_indicator = new THREE.Mesh(lower_red_indicatorGeom, red_plasticMat);
  lower_red_indicator.name = "lower_red_indicator";
  lower_red_indicator.rotation.x = Math.PI / 2;
  lower_red_indicator.position.set(0.94, -0.66, 0.226);
  mechanism_group.add(lower_red_indicator);

  const lower_blue_capGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.029, 18);
  const lower_blue_cap = new THREE.Mesh(lower_blue_capGeom, cyan_plasticMat);
  lower_blue_cap.name = "lower_blue_cap";
  lower_blue_cap.rotation.x = Math.PI / 2;
  lower_blue_cap.position.set(0.94, -0.66, 0.243);
  mechanism_group.add(lower_blue_cap);

  const lower_center_screwGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 20);
  const lower_center_screw = new THREE.Mesh(lower_center_screwGeom, screwMat);
  lower_center_screw.name = "lower_center_screw";
  lower_center_screw.rotation.x = Math.PI / 2;
  lower_center_screw.position.set(0.05, -0.57, 0.226);
  hardware_group.add(lower_center_screw);

  const lower_center_slot_horizontal = addFlatBox(
    "lower_center_slot_horizontal", 0.085, 0.014, 0.008, screw_slotMat,
    0.05, -0.57, 0.242, hardware_group
  );
  lower_center_slot_horizontal.rotation.z = 0.35;
  const lower_center_slot_vertical = addFlatBox(
    "lower_center_slot_vertical", 0.014, 0.085, 0.008, screw_slotMat,
    0.05, -0.57, 0.243, hardware_group
  );
  lower_center_slot_vertical.rotation.z = Math.PI / 2 + 0.35;

  const corner_screwsGeom = new THREE.CylinderGeometry(0.083, 0.083, 0.028, 20);
  const corner_screws = new THREE.InstancedMesh(corner_screwsGeom, screwMat, 4);
  corner_screws.name = "corner_screws";
  const screw_positions = [
    new THREE.Vector3(-1.43, 0.72, 0.205),
    new THREE.Vector3(1.43, 0.72, 0.205),
    new THREE.Vector3(-1.43, -0.72, 0.205),
    new THREE.Vector3(1.43, -0.72, 0.205)
  ];
  const screw_rotation = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0), Math.PI / 2
  );
  const screw_matrix = new THREE.Matrix4();
  for (let i = 0; i < screw_positions.length; i++) {
    screw_matrix.compose(screw_positions[i], screw_rotation, new THREE.Vector3(1, 1, 1));
    corner_screws.setMatrixAt(i, screw_matrix);
  }
  corner_screws.instanceMatrix.needsUpdate = true;
  hardware_group.add(corner_screws);

  const corner_screw_slotsGeom = new THREE.BoxGeometry(0.09, 0.014, 0.008);
  const corner_screw_slots = new THREE.InstancedMesh(
    corner_screw_slotsGeom, screw_slotMat, 8
  );
  corner_screw_slots.name = "corner_screw_slots";
  const slot_matrix = new THREE.Matrix4();
  const z_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < screw_positions.length; i++) {
    for (let arm = 0; arm < 2; arm++) {
      const angle = arm * Math.PI / 2 + (i % 2) * 0.18;
      const slotQuaternion = new THREE.Quaternion().setFromAxisAngle(z_axis, angle);
      slot_matrix.compose(
        new THREE.Vector3(screw_positions[i].x, screw_positions[i].y, 0.224),
        slotQuaternion,
        new THREE.Vector3(1, 1, 1)
      );
      corner_screw_slots.setMatrixAt(i * 2 + arm, slot_matrix);
    }
  }
  corner_screw_slots.instanceMatrix.needsUpdate = true;
  hardware_group.add(corner_screw_slots);

  const left_side_tab = addFlatBox(
    "left_side_tab", 0.07, 0.22, 0.13, red_plasticMat,
    -1.615, -0.56, 0.02, shell_group
  );
  const right_side_tab = addFlatBox(
    "right_side_tab", 0.07, 0.18, 0.13, purple_plasticMat,
    1.615, 0.46, 0.02, shell_group
  );

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