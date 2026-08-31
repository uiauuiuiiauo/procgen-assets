export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "desktop_stationery_organizer";

  const cabinet_group = new THREE.Group();
  cabinet_group.name = "cabinet_group";
  root.add(cabinet_group);

  const upper_organizer_group = new THREE.Group();
  upper_organizer_group.name = "upper_organizer_group";
  root.add(upper_organizer_group);

  const lower_cubby_group = new THREE.Group();
  lower_cubby_group.name = "lower_cubby_group";
  root.add(lower_cubby_group);

  const bottom_drawer_group = new THREE.Group();
  bottom_drawer_group.name = "bottom_drawer_group";
  root.add(bottom_drawer_group);

  const stationery_group = new THREE.Group();
  stationery_group.name = "stationery_group";
  root.add(stationery_group);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const cardboardMat = new THREE.MeshStandardMaterial({
    color: 0xb98b62,
    metalness: 0.0,
    roughness: 0.9
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1ed,
    metalness: 0.0,
    roughness: 0.8
  });
  const bluePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x2468a8,
    metalness: 0.0,
    roughness: 0.3
  });
  const lightBluePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x83add0,
    metalness: 0.0,
    roughness: 0.3
  });
  const redPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xd93445,
    metalness: 0.0,
    roughness: 0.3
  });
  const greenPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x28a85a,
    metalness: 0.0,
    roughness: 0.3
  });
  const yellowPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xf0d429,
    metalness: 0.0,
    roughness: 0.3
  });
  const pinkPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xe94d86,
    metalness: 0.0,
    roughness: 0.3
  });
  const orangePlasticMat = new THREE.MeshStandardMaterial({
    color: 0xf28b24,
    metalness: 0.0,
    roughness: 0.3
  });
  const purplePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x7452a6,
    metalness: 0.0,
    roughness: 0.3
  });
  const whitePlasticMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.3
  });
  const paleGreenPaperMat = new THREE.MeshStandardMaterial({
    color: 0xb9dfbd,
    metalness: 0.0,
    roughness: 0.8
  });
  const palePinkPaperMat = new THREE.MeshStandardMaterial({
    color: 0xf1a7b8,
    metalness: 0.0,
    roughness: 0.8
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const side_panelGeom = new THREE.BoxGeometry(0.045, 1.32, 0.66);

  const left_side_panel = new THREE.Mesh(side_panelGeom, silverMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.56, 0.70, -0.01);
  cabinet_group.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, silverMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.56, 0.70, -0.01);
  cabinet_group.add(right_side_panel);

  const side_front_edgeGeom = new THREE.BoxGeometry(0.055, 1.30, 0.035);
  const side_front_edges = new THREE.InstancedMesh(side_front_edgeGeom, polishedMat, 2);
  side_front_edges.name = "side_front_edges";
  setInstance(side_front_edges, 0, -0.56, 0.70, 0.326);
  setInstance(side_front_edges, 1, 0.56, 0.70, 0.326);
  side_front_edges.instanceMatrix.needsUpdate = true;
  cabinet_group.add(side_front_edges);

  const back_panelGeom = new THREE.BoxGeometry(1.08, 1.28, 0.025);
  const back_panel = new THREE.Mesh(back_panelGeom, darkMetalMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, 0.69, -0.337);
  cabinet_group.add(back_panel);

  const bottom_panelGeom = new THREE.BoxGeometry(1.08, 0.045, 0.64);
  const bottom_panel = new THREE.Mesh(bottom_panelGeom, silverMat);
  bottom_panel.name = "bottom_panel";
  bottom_panel.position.set(0, 0.045, -0.005);
  cabinet_group.add(bottom_panel);

  const cubby_floorGeom = new THREE.BoxGeometry(1.07, 0.045, 0.62);
  const cubby_floor = new THREE.Mesh(cubby_floorGeom, darkMetalMat);
  cubby_floor.name = "cubby_floor";
  cubby_floor.position.set(0, 0.345, -0.005);
  lower_cubby_group.add(cubby_floor);

  const cubby_back_insertGeom = new THREE.BoxGeometry(0.94, 0.39, 0.025);
  const cubby_back_insert = new THREE.Mesh(cubby_back_insertGeom, blackMat);
  cubby_back_insert.name = "cubby_back_insert";
  cubby_back_insert.position.set(0, 0.555, -0.315);
  lower_cubby_group.add(cubby_back_insert);

  const cubby_dividerGeom = new THREE.BoxGeometry(0.025, 0.40, 0.56);
  const cubby_divider = new THREE.Mesh(cubby_dividerGeom, darkMetalMat);
  cubby_divider.name = "cubby_divider";
  cubby_divider.position.set(-0.13, 0.56, -0.005);
  lower_cubby_group.add(cubby_divider);

  const cubby_top_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.12, 12);
  const cubby_top_rail = new THREE.Mesh(cubby_top_railGeom, polishedMat);
  cubby_top_rail.name = "cubby_top_rail";
  cubby_top_rail.rotation.z = Math.PI / 2;
  cubby_top_rail.position.set(0, 0.775, 0.345);
  lower_cubby_group.add(cubby_top_rail);

  const cubby_side_railGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.62, 10);
  const cubby_side_rails = new THREE.InstancedMesh(cubby_side_railGeom, polishedMat, 2);
  cubby_side_rails.name = "cubby_side_rails";
  setInstance(cubby_side_rails, 0, -0.535, 0.775, 0.01, Math.PI / 2, 0, 0);
  setInstance(cubby_side_rails, 1, 0.535, 0.775, 0.01, Math.PI / 2, 0, 0);
  cubby_side_rails.instanceMatrix.needsUpdate = true;
  lower_cubby_group.add(cubby_side_rails);

  const upper_floorGeom = new THREE.BoxGeometry(1.08, 0.045, 0.64);
  const upper_floor = new THREE.Mesh(upper_floorGeom, brushedMat);
  upper_floor.name = "upper_floor";
  upper_floor.position.set(0, 0.795, -0.005);
  upper_organizer_group.add(upper_floor);

  const upper_back_panelGeom = new THREE.BoxGeometry(1.07, 0.46, 0.025);
  const upper_back_panel = new THREE.Mesh(upper_back_panelGeom, silverMat);
  upper_back_panel.name = "upper_back_panel";
  upper_back_panel.position.set(0, 1.035, -0.325);
  upper_organizer_group.add(upper_back_panel);

  const upper_back_insetGeom = new THREE.BoxGeometry(0.68, 0.25, 0.012);
  const upper_back_inset = new THREE.Mesh(upper_back_insetGeom, darkMetalMat);
  upper_back_inset.name = "upper_back_inset";
  upper_back_inset.position.set(-0.16, 1.105, -0.308);
  upper_organizer_group.add(upper_back_inset);

  const upper_side_cheekShape = new THREE.Shape();
  upper_side_cheekShape.moveTo(-0.34, 0.00);
  upper_side_cheekShape.lineTo(0.34, 0.00);
  upper_side_cheekShape.lineTo(0.34, 0.50);
  upper_side_cheekShape.lineTo(-0.34, 0.29);
  upper_side_cheekShape.closePath();

  const upper_side_cheekGeom = new THREE.ExtrudeGeometry(upper_side_cheekShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: false
  });

  const left_upper_cheek = new THREE.Mesh(upper_side_cheekGeom, silverMat);
  left_upper_cheek.name = "left_upper_cheek";
  left_upper_cheek.rotation.y = -Math.PI / 2;
  left_upper_cheek.position.set(-0.535, 0.79, 0);
  upper_organizer_group.add(left_upper_cheek);

  const right_upper_cheek = new THREE.Mesh(upper_side_cheekGeom, silverMat);
  right_upper_cheek.name = "right_upper_cheek";
  right_upper_cheek.rotation.y = -Math.PI / 2;
  right_upper_cheek.position.set(0.58, 0.79, 0);
  upper_organizer_group.add(right_upper_cheek);

  const upper_front_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.13, 12);
  const upper_front_rail = new THREE.Mesh(upper_front_railGeom, polishedMat);
  upper_front_rail.name = "upper_front_rail";
  upper_front_rail.rotation.z = Math.PI / 2;
  upper_front_rail.position.set(0, 0.81, 0.35);
  upper_organizer_group.add(upper_front_rail);

  const upper_side_railGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.66, 10);
  const upper_side_rails = new THREE.InstancedMesh(upper_side_railGeom, polishedMat, 2);
  upper_side_rails.name = "upper_side_rails";
  setInstance(upper_side_rails, 0, -0.555, 0.81, 0.01, Math.PI / 2, 0, 0);
  setInstance(upper_side_rails, 1, 0.555, 0.81, 0.01, Math.PI / 2, 0, 0);
  upper_side_rails.instanceMatrix.needsUpdate = true;
  upper_organizer_group.add(upper_side_rails);

  const upper_cross_dividerGeom = new THREE.BoxGeometry(0.96, 0.20, 0.025);
  const upper_cross_divider = new THREE.Mesh(upper_cross_dividerGeom, brushedMat);
  upper_cross_divider.name = "upper_cross_divider";
  upper_cross_divider.position.set(0, 0.90, 0.035);
  upper_organizer_group.add(upper_cross_divider);

  const rear_tool_backdropGeom = new THREE.BoxGeometry(0.50, 0.25, 0.025);
  const rear_tool_backdrop = new THREE.Mesh(rear_tool_backdropGeom, blackMat);
  rear_tool_backdrop.name = "rear_tool_backdrop";
  rear_tool_backdrop.position.set(-0.17, 1.105, -0.295);
  upper_organizer_group.add(rear_tool_backdrop);

  const bottom_drawer_frontGeom = new THREE.BoxGeometry(1.10, 0.30, 0.045);
  const bottom_drawer_front = new THREE.Mesh(bottom_drawer_frontGeom, silverMat);
  bottom_drawer_front.name = "bottom_drawer_front";
  bottom_drawer_front.position.set(0, 0.19, 0.405);
  bottom_drawer_group.add(bottom_drawer_front);

  const drawer_top_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.13, 12);
  const drawer_top_rail = new THREE.Mesh(drawer_top_railGeom, polishedMat);
  drawer_top_rail.name = "drawer_top_rail";
  drawer_top_rail.rotation.z = Math.PI / 2;
  drawer_top_rail.position.set(0, 0.355, 0.425);
  bottom_drawer_group.add(drawer_top_rail);

  const drawer_bottom_railGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.10, 10);
  const drawer_bottom_rail = new THREE.Mesh(drawer_bottom_railGeom, polishedMat);
  drawer_bottom_rail.name = "drawer_bottom_rail";
  drawer_bottom_rail.rotation.z = Math.PI / 2;
  drawer_bottom_rail.position.set(0, 0.035, 0.425);
  bottom_drawer_group.add(drawer_bottom_rail);

  const drawer_side_railGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.29, 10);
  const drawer_side_rails = new THREE.InstancedMesh(drawer_side_railGeom, polishedMat, 2);
  drawer_side_rails.name = "drawer_side_rails";
  setInstance(drawer_side_rails, 0, -0.555, 0.19, 0.425);
  setInstance(drawer_side_rails, 1, 0.555, 0.19, 0.425);
  drawer_side_rails.instanceMatrix.needsUpdate = true;
  bottom_drawer_group.add(drawer_side_rails);

  const drawer_shadow_gapGeom = new THREE.BoxGeometry(1.02, 0.018, 0.025);
  const drawer_shadow_gap = new THREE.Mesh(drawer_shadow_gapGeom, blackMat);
  drawer_shadow_gap.name = "drawer_shadow_gap";
  drawer_shadow_gap.position.set(0, 0.365, 0.386);
  bottom_drawer_group.add(drawer_shadow_gap);

  const right_inner_panelGeom = new THREE.BoxGeometry(0.025, 0.68, 0.57);
  const right_inner_panel = new THREE.Mesh(right_inner_panelGeom, brushedMat);
  right_inner_panel.name = "right_inner_panel";
  right_inner_panel.position.set(0.525, 0.49, -0.005);
  lower_cubby_group.add(right_inner_panel);

  const side_handleGeom = new THREE.BoxGeometry(0.014, 0.045, 0.14);
  const side_handle = new THREE.Mesh(side_handleGeom, blackMat);
  side_handle.name = "side_handle";
  side_handle.position.set(0.589, 1.055, 0.16);
  upper_organizer_group.add(side_handle);

  const side_handle_lipGeom = new THREE.BoxGeometry(0.016, 0.012, 0.12);
  const side_handle_lip = new THREE.Mesh(side_handle_lipGeom, polishedMat);
  side_handle_lip.name = "side_handle_lip";
  side_handle_lip.position.set(0.596, 1.032, 0.16);
  upper_organizer_group.add(side_handle_lip);

  const screw_positions = [
    [-0.588, 0.18, 0.285],
    [-0.588, 0.61, 0.285],
    [-0.588, 1.02, 0.285],
    [0.588, 0.18, 0.285],
    [0.588, 0.61, 0.285],
    [0.588, 1.02, 0.285],
    [0.588, 0.79, -0.245],
    [0.588, 1.18, -0.245],
    [-0.588, 0.79, -0.245],
    [-0.588, 1.18, -0.245],
    [-0.47, 0.105, 0.432],
    [0.47, 0.105, 0.432],
    [-0.48, 0.82, 0.35],
    [0.48, 0.82, 0.35]
  ];
  const side_screwsGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.008, 12);
  const side_screws = new THREE.InstancedMesh(
    side_screwsGeom,
    polishedMat,
    screw_positions.length
  );
  side_screws.name = "side_screws";
  for (let i = 0; i < screw_positions.length; i++) {
    const p = screw_positions[i];
    setInstance(side_screws, i, p[0], p[1], p[2], 0, 0, Math.PI / 2);
  }
  side_screws.instanceMatrix.needsUpdate = true;
  cabinet_group.add(side_screws);

  const cardboard_front_dividerGeom = new THREE.BoxGeometry(0.42, 0.22, 0.025);
  const cardboard_front_divider = new THREE.Mesh(cardboard_front_dividerGeom, cardboardMat);
  cardboard_front_divider.name = "cardboard_front_divider";
  cardboard_front_divider.position.set(0.22, 0.91, 0.19);
  upper_organizer_group.add(cardboard_front_divider);

  const cardboard_side_dividerGeom = new THREE.BoxGeometry(0.025, 0.22, 0.31);
  const cardboard_side_divider = new THREE.Mesh(cardboard_side_dividerGeom, cardboardMat);
  cardboard_side_divider.name = "cardboard_side_divider";
  cardboard_side_divider.position.set(0.425, 0.91, 0.035);
  upper_organizer_group.add(cardboard_side_divider);

  const pencil_cupGeom = new THREE.BoxGeometry(0.25, 0.29, 0.025);
  const pencil_cup = new THREE.Mesh(pencil_cupGeom, brushedMat);
  pencil_cup.name = "pencil_cup";
  pencil_cup.position.set(0.22, 1.075, 0.075);
  upper_organizer_group.add(pencil_cup);

  const pencil_cup_holesGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.008, 10);
  const pencil_cup_holes = new THREE.InstancedMesh(pencil_cup_holesGeom, blackMat, 5);
  pencil_cup_holes.name = "pencil_cup_holes";
  for (let i = 0; i < 5; i++) {
    setInstance(
      pencil_cup_holes,
      i,
      0.13 + i * 0.045,
      1.145,
      0.092,
      Math.PI / 2,
      0,
      0
    );
  }
  pencil_cup_holes.instanceMatrix.needsUpdate = true;
  upper_organizer_group.add(pencil_cup_holes);

  const rear_pink_folderGeom = new THREE.BoxGeometry(0.055, 0.34, 0.25);
  const rear_pink_folder = new THREE.Mesh(rear_pink_folderGeom, pinkPlasticMat);
  rear_pink_folder.name = "rear_pink_folder";
  rear_pink_folder.position.set(0.08, 1.19, -0.16);
  rear_pink_folder.rotation.x = -0.08;
  stationery_group.add(rear_pink_folder);

  const rear_blue_folderGeom = new THREE.BoxGeometry(0.06, 0.36, 0.27);
  const rear_blue_folder = new THREE.Mesh(rear_blue_folderGeom, bluePlasticMat);
  rear_blue_folder.name = "rear_blue_folder";
  rear_blue_folder.position.set(0.28, 1.19, -0.15);
  rear_blue_folder.rotation.x = -0.12;
  stationery_group.add(rear_blue_folder);

  const rear_cream_folderGeom = new THREE.BoxGeometry(0.055, 0.38, 0.28);
  const rear_cream_folder = new THREE.Mesh(rear_cream_folderGeom, paperMat);
  rear_cream_folder.name = "rear_cream_folder";
  rear_cream_folder.position.set(0.39, 1.20, -0.14);
  rear_cream_folder.rotation.x = -0.15;
  stationery_group.add(rear_cream_folder);

  const rear_cardstock_folderGeom = new THREE.BoxGeometry(0.06, 0.40, 0.29);
  const rear_cardstock_folder = new THREE.Mesh(rear_cardstock_folderGeom, cardboardMat);
  rear_cardstock_folder.name = "rear_cardstock_folder";
  rear_cardstock_folder.position.set(0.47, 1.205, -0.13);
  rear_cardstock_folder.rotation.x = -0.18;
  stationery_group.add(rear_cardstock_folder);

  const right_folder_colors = [
    bluePlasticMat,
    lightBluePlasticMat,
    whitePlasticMat,
    orangePlasticMat,
    yellowPlasticMat,
    greenPlasticMat
  ];
  const right_folderGeom = new THREE.BoxGeometry(0.038, 0.32, 0.26);
  const right_folder_set = new THREE.Group();
  right_folder_set.name = "right_folder_set";
  for (let i = 0; i < right_folder_colors.length; i++) {
    const right_folder = new THREE.Mesh(right_folderGeom, right_folder_colors[i]);
    right_folder.name = "right_folder_" + i;
    right_folder.position.set(0.31 + i * 0.035, 1.16, 0.015);
    right_folder.rotation.x = -0.20 - i * 0.012;
    right_folder.rotation.z = (i - 2.5) * 0.012;
    right_folder_set.add(right_folder);
  }
  stationery_group.add(right_folder_set);

  const upright_penGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.34, 10);
  const upright_blue_pen = new THREE.Mesh(upright_penGeom, bluePlasticMat);
  upright_blue_pen.name = "upright_blue_pen";
  upright_blue_pen.position.set(0.31, 1.13, 0.17);
  upright_blue_pen.rotation.z = -0.08;
  stationery_group.add(upright_blue_pen);

  const upright_red_pen = new THREE.Mesh(upright_penGeom, redPlasticMat);
  upright_red_pen.name = "upright_red_pen";
  upright_red_pen.position.set(0.355, 1.13, 0.175);
  upright_red_pen.rotation.z = 0.04;
  stationery_group.add(upright_red_pen);

  const upright_green_pen = new THREE.Mesh(upright_penGeom, greenPlasticMat);
  upright_green_pen.name = "upright_green_pen";
  upright_green_pen.position.set(0.40, 1.13, 0.17);
  upright_green_pen.rotation.z = -0.03;
  stationery_group.add(upright_green_pen);

  const upright_yellow_pen = new THREE.Mesh(upright_penGeom, yellowPlasticMat);
  upright_yellow_pen.name = "upright_yellow_pen";
  upright_yellow_pen.position.set(0.445, 1.13, 0.16);
  upright_yellow_pen.rotation.z = 0.07;
  stationery_group.add(upright_yellow_pen);

  const marker_barrelGeom = new THREE.CylinderGeometry(0.021, 0.021, 0.36, 12);
  const rear_marker_barrels = new THREE.Group();
  rear_marker_barrels.name = "rear_marker_barrels";
  const rear_marker_mats = [pinkPlasticMat, yellowPlasticMat, bluePlasticMat];
  for (let i = 0; i < rear_marker_mats.length; i++) {
    const rear_marker_barrel = new THREE.Mesh(marker_barrelGeom, rear_marker_mats[i]);
    rear_marker_barrel.name = "rear_marker_barrel_" + i;
    rear_marker_barrel.rotation.z = Math.PI / 2;
    rear_marker_barrel.position.set(-0.22 + i * 0.01, 1.13 + i * 0.035, -0.245 + i * 0.012);
    rear_marker_barrels.add(rear_marker_barrel);
  }
  stationery_group.add(rear_marker_barrels);

  const marker_capGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.065, 12);
  const rear_marker_caps = new THREE.Group();
  rear_marker_caps.name = "rear_marker_caps";
  for (let i = 0; i < rear_marker_mats.length; i++) {
    const rear_marker_cap = new THREE.Mesh(marker_capGeom, rear_marker_mats[i]);
    rear_marker_cap.name = "rear_marker_cap_" + i;
    rear_marker_cap.rotation.z = Math.PI / 2;
    rear_marker_cap.position.set(-0.43 + i * 0.01, 1.13 + i * 0.035, -0.245 + i * 0.012);
    rear_marker_caps.add(rear_marker_cap);
  }
  stationery_group.add(rear_marker_caps);

  const scissor_ringGeom = new THREE.TorusGeometry(0.045, 0.009, 8, 20);

  const red_scissors = new THREE.Group();
  red_scissors.name = "red_scissors";
  red_scissors.position.set(-0.035, 1.20, 0.045);
  const red_scissor_left_ring = new THREE.Mesh(scissor_ringGeom, redPlasticMat);
  red_scissor_left_ring.name = "red_scissor_left_ring";
  red_scissor_left_ring.position.x = -0.035;
  red_scissor_left_ring.rotation.z = -0.18;
  red_scissors.add(red_scissor_left_ring);
  const red_scissor_right_ring = new THREE.Mesh(scissor_ringGeom, redPlasticMat);
  red_scissor_right_ring.name = "red_scissor_right_ring";
  red_scissor_right_ring.position.x = 0.035;
  red_scissor_right_ring.rotation.z = 0.18;
  red_scissors.add(red_scissor_right_ring);
  stationery_group.add(red_scissors);

  const blue_scissors = new THREE.Group();
  blue_scissors.name = "blue_scissors";
  blue_scissors.position.set(0.105, 1.205, 0.025);
  const blue_scissor_left_ring = new THREE.Mesh(scissor_ringGeom, bluePlasticMat);
  blue_scissor_left_ring.name = "blue_scissor_left_ring";
  blue_scissor_left_ring.position.x = -0.035;
  blue_scissor_left_ring.rotation.z = -0.14;
  blue_scissors.add(blue_scissor_left_ring);
  const blue_scissor_right_ring = new THREE.Mesh(scissor_ringGeom, bluePlasticMat);
  blue_scissor_right_ring.name = "blue_scissor_right_ring";
  blue_scissor_right_ring.position.x = 0.035;
  blue_scissor_right_ring.rotation.z = 0.14;
  blue_scissors.add(blue_scissor_right_ring);
  stationery_group.add(blue_scissors);

  const green_scissors = new THREE.Group();
  green_scissors.name = "green_scissors";
  green_scissors.position.set(0.225, 1.19, 0.065);
  const green_scissor_left_ring = new THREE.Mesh(scissor_ringGeom, greenPlasticMat);
  green_scissor_left_ring.name = "green_scissor_left_ring";
  green_scissor_left_ring.position.x = -0.035;
  green_scissor_left_ring.rotation.z = -0.20;
  green_scissors.add(green_scissor_left_ring);
  const green_scissor_right_ring = new THREE.Mesh(scissor_ringGeom, greenPlasticMat);
  green_scissor_right_ring.name = "green_scissor_right_ring";
  green_scissor_right_ring.position.x = 0.035;
  green_scissor_right_ring.rotation.z = 0.20;
  green_scissors.add(green_scissor_right_ring);
  stationery_group.add(green_scissors);

  const spiral_ringGeom = new THREE.TorusGeometry(0.018, 0.0035, 6, 12);
  const rear_spiral_rings = new THREE.InstancedMesh(spiral_ringGeom, polishedMat, 8);
  rear_spiral_rings.name = "rear_spiral_rings";
  for (let i = 0; i < 8; i++) {
    setInstance(rear_spiral_rings, i, 0.015, 1.06 + i * 0.025, 0.025);
  }
  rear_spiral_rings.instanceMatrix.needsUpdate = true;
  stationery_group.add(rear_spiral_rings);

  const rear_spiral_coreGeom = new THREE.CylinderGeometry(0.004, 0.004, 0.22, 8);
  const rear_spiral_core = new THREE.Mesh(rear_spiral_coreGeom, darkMetalMat);
  rear_spiral_core.name = "rear_spiral_core";
  rear_spiral_core.position.set(0.015, 1.16, 0.025);
  stationery_group.add(rear_spiral_core);

  const lower_paper_stackGeom = new THREE.BoxGeometry(0.56, 0.012, 0.36);
  const lower_paper_stack = new THREE.Group();
  lower_paper_stack.name = "lower_paper_stack";
  const lower_paper_mats = [
    paleGreenPaperMat,
    palePinkPaperMat,
    yellowPlasticMat,
    paperMat,
    paleGreenPaperMat
  ];
  for (let i = 0; i < lower_paper_mats.length; i++) {
    const lower_paper_sheet = new THREE.Mesh(lower_paper_stackGeom, lower_paper_mats[i]);
    lower_paper_sheet.name = "lower_paper_sheet_" + i;
    lower_paper_sheet.position.set(
      0.23 + (i % 2) * 0.008,
      0.815 + i * 0.012,
      0.13 + i * 0.003
    );
    lower_paper_sheet.rotation.y = (i - 2) * 0.008;
    lower_paper_stack.add(lower_paper_sheet);
  }
  stationery_group.add(lower_paper_stack);

  const left_paper_stackGeom = new THREE.BoxGeometry(0.47, 0.012, 0.34);
  const left_paper_stack = new THREE.Group();
  left_paper_stack.name = "left_paper_stack";
  const left_paper_mats = [
    palePinkPaperMat,
    paleGreenPaperMat,
    yellowPlasticMat,
    paperMat,
    palePinkPaperMat
  ];
  for (let i = 0; i < left_paper_mats.length; i++) {
    const left_paper_sheet = new THREE.Mesh(left_paper_stackGeom, left_paper_mats[i]);
    left_paper_sheet.name = "left_paper_sheet_" + i;
    left_paper_sheet.position.set(
      -0.28 + (i % 2) * 0.007,
      0.815 + i * 0.012,
      0.14 + i * 0.002
    );
    left_paper_sheet.rotation.y = (2 - i) * 0.009;
    left_paper_stack.add(left_paper_sheet);
  }
  stationery_group.add(left_paper_stack);

  const top_notebook = new THREE.Group();
  top_notebook.name = "top_notebook";
  top_notebook.position.set(-0.20, 0.94, 0.105);
  top_notebook.rotation.y = -0.04;

  const top_notebook_pagesGeom = new THREE.BoxGeometry(0.45, 0.075, 0.31);
  const top_notebook_pages = new THREE.Mesh(top_notebook_pagesGeom, paperMat);
  top_notebook_pages.name = "top_notebook_pages";
  top_notebook.add(top_notebook_pages);

  const top_notebook_bottom_coverGeom = new THREE.BoxGeometry(0.47, 0.012, 0.33);
  const top_notebook_bottom_cover = new THREE.Mesh(top_notebook_bottom_coverGeom, lightBluePlasticMat);
  top_notebook_bottom_cover.name = "top_notebook_bottom_cover";
  top_notebook_bottom_cover.position.y = -0.043;
  top_notebook.add(top_notebook_bottom_cover);

  const top_notebook_top_coverGeom = new THREE.BoxGeometry(0.47, 0.012, 0.33);
  const top_notebook_top_cover = new THREE.Mesh(top_notebook_top_coverGeom, lightBluePlasticMat);
  top_notebook_top_cover.name = "top_notebook_top_cover";
  top_notebook_top_cover.position.y = 0.043;
  top_notebook.add(top_notebook_top_cover);

  const top_notebook_spiralGeom = new THREE.TorusGeometry(0.018, 0.0035, 6, 12);
  const top_notebook_spiral = new THREE.InstancedMesh(
    top_notebook_spiralGeom,
    polishedMat,
    10
  );
  top_notebook_spiral.name = "top_notebook_spiral";
  for (let i = 0; i < 10; i++) {
    setInstance(top_notebook_spiral, i, 0.225, 0, -0.13 + i * 0.029);
  }
  top_notebook_spiral.instanceMatrix.needsUpdate = true;
  top_notebook.add(top_notebook_spiral);
  stationery_group.add(top_notebook);

  const lower_yellow_packetGeom = new THREE.BoxGeometry(0.22, 0.018, 0.17);
  const lower_yellow_packet = new THREE.Mesh(lower_yellow_packetGeom, yellowPlasticMat);
  lower_yellow_packet.name = "lower_yellow_packet";
  lower_yellow_packet.position.set(-0.31, 0.375, 0.18);
  lower_yellow_packet.rotation.y = -0.10;
  stationery_group.add(lower_yellow_packet);

  const lower_red_packetGeom = new THREE.BoxGeometry(0.18, 0.018, 0.14);
  const lower_red_packet = new THREE.Mesh(lower_red_packetGeom, redPlasticMat);
  lower_red_packet.name = "lower_red_packet";
  lower_red_packet.position.set(-0.23, 0.386, 0.20);
  lower_red_packet.rotation.y = 0.08;
  stationery_group.add(lower_red_packet);

  const lower_white_packetGeom = new THREE.BoxGeometry(0.20, 0.016, 0.15);
  const lower_white_packet = new THREE.Mesh(lower_white_packetGeom, whitePlasticMat);
  lower_white_packet.name = "lower_white_packet";
  lower_white_packet.position.set(-0.05, 0.377, 0.24);
  lower_white_packet.rotation.y = -0.05;
  stationery_group.add(lower_white_packet);

  const lower_blue_stapler = new THREE.Group();
  lower_blue_stapler.name = "lower_blue_stapler";
  lower_blue_stapler.position.set(0.06, 0.405, 0.04);
  lower_blue_stapler.rotation.y = -0.10;

  const lower_blue_stapler_baseGeom = new THREE.BoxGeometry(0.38, 0.035, 0.105);
  const lower_blue_stapler_base = new THREE.Mesh(lower_blue_stapler_baseGeom, bluePlasticMat);
  lower_blue_stapler_base.name = "lower_blue_stapler_base";
  lower_blue_stapler.add(lower_blue_stapler_base);

  const lower_blue_stapler_hingeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.11, 12);
  const lower_blue_stapler_hinge = new THREE.Mesh(lower_blue_stapler_hingeGeom, darkMetalMat);
  lower_blue_stapler_hinge.name = "lower_blue_stapler_hinge";
  lower_blue_stapler_hinge.rotation.x = Math.PI / 2;
  lower_blue_stapler_hinge.position.set(0.15, 0.035, 0);
  lower_blue_stapler.add(lower_blue_stapler_hinge);

  const lower_blue_stapler_handleGeom = new THREE.BoxGeometry(0.29, 0.035, 0.09);
  const lower_blue_stapler_handle = new THREE.Mesh(lower_blue_stapler_handleGeom, bluePlasticMat);
  lower_blue_stapler_handle.name = "lower_blue_stapler_handle";
  lower_blue_stapler_handle.position.set(-0.015, 0.07, 0);
  lower_blue_stapler_handle.rotation.z = 0.12;
  lower_blue_stapler.add(lower_blue_stapler_handle);
  stationery_group.add(lower_blue_stapler);

  const lower_red_stapler = new THREE.Group();
  lower_red_stapler.name = "lower_red_stapler";
  lower_red_stapler.position.set(0.25, 0.405, -0.055);
  lower_red_stapler.rotation.y = -0.18;

  const lower_red_stapler_baseGeom = new THREE.BoxGeometry(0.36, 0.035, 0.11);
  const lower_red_stapler_base = new THREE.Mesh(lower_red_stapler_baseGeom, redPlasticMat);
  lower_red_stapler_base.name = "lower_red_stapler_base";
  lower_red_stapler.add(lower_red_stapler_base);

  const lower_red_stapler_hingeGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.115, 12);
  const lower_red_stapler_hinge = new THREE.Mesh(lower_red_stapler_hingeGeom, darkMetalMat);
  lower_red_stapler_hinge.name = "lower_red_stapler_hinge";
  lower_red_stapler_hinge.rotation.x = Math.PI / 2;
  lower_red_stapler_hinge.position.set(0.14, 0.036, 0);
  lower_red_stapler.add(lower_red_stapler_hinge);

  const lower_red_stapler_handleGeom = new THREE.BoxGeometry(0.28, 0.038, 0.095);
  const lower_red_stapler_handle = new THREE.Mesh(lower_red_stapler_handleGeom, redPlasticMat);
  lower_red_stapler_handle.name = "lower_red_stapler_handle";
  lower_red_stapler_handle.position.set(-0.01, 0.072, 0);
  lower_red_stapler_handle.rotation.z = 0.13;
  lower_red_stapler.add(lower_red_stapler_handle);
  stationery_group.add(lower_red_stapler);

  const lower_green_marker = new THREE.Group();
  lower_green_marker.name = "lower_green_marker";
  lower_green_marker.position.set(0.20, 0.425, 0.22);
  lower_green_marker.rotation.y = 0.18;
  const lower_green_marker_bodyGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.30, 12);
  const lower_green_marker_body = new THREE.Mesh(lower_green_marker_bodyGeom, greenPlasticMat);
  lower_green_marker_body.name = "lower_green_marker_body";
  lower_green_marker_body.rotation.z = Math.PI / 2;
  lower_green_marker.add(lower_green_marker_body);
  const lower_green_marker_capGeom = new THREE.CylinderGeometry(0.030, 0.030, 0.07, 12);
  const lower_green_marker_cap = new THREE.Mesh(lower_green_marker_capGeom, greenPlasticMat);
  lower_green_marker_cap.name = "lower_green_marker_cap";
  lower_green_marker_cap.rotation.z = Math.PI / 2;
  lower_green_marker_cap.position.x = 0.17;
  lower_green_marker.add(lower_green_marker_cap);
  stationery_group.add(lower_green_marker);

  const lower_blue_marker = new THREE.Group();
  lower_blue_marker.name = "lower_blue_marker";
  lower_blue_marker.position.set(0.06, 0.425, 0.27);
  lower_blue_marker.rotation.y = -0.18;
  const lower_blue_marker_bodyGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.28, 12);
  const lower_blue_marker_body = new THREE.Mesh(lower_blue_marker_bodyGeom, bluePlasticMat);
  lower_blue_marker_body.name = "lower_blue_marker_body";
  lower_blue_marker_body.rotation.z = Math.PI / 2;
  lower_blue_marker.add(lower_blue_marker_body);
  const lower_blue_marker_capGeom = new THREE.CylinderGeometry(0.029, 0.029, 0.065, 12);
  const lower_blue_marker_cap = new THREE.Mesh(lower_blue_marker_capGeom, bluePlasticMat);
  lower_blue_marker_cap.name = "lower_blue_marker_cap";
  lower_blue_marker_cap.rotation.z = Math.PI / 2;
  lower_blue_marker_cap.position.x = -0.16;
  lower_blue_marker.add(lower_blue_marker_cap);
  stationery_group.add(lower_blue_marker);

  const lower_red_marker = new THREE.Group();
  lower_red_marker.name = "lower_red_marker";
  lower_red_marker.position.set(0.18, 0.43, 0.14);
  lower_red_marker.rotation.y = 0.32;
  const lower_red_marker_bodyGeom = new THREE.CylinderGeometry(0.023, 0.023, 0.27, 12);
  const lower_red_marker_body = new THREE.Mesh(lower_red_marker_bodyGeom, redPlasticMat);
  lower_red_marker_body.name = "lower_red_marker_body";
  lower_red_marker_body.rotation.z = Math.PI / 2;
  lower_red_marker.add(lower_red_marker_body);
  const lower_red_marker_capGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.065, 12);
  const lower_red_marker_cap = new THREE.Mesh(lower_red_marker_capGeom, redPlasticMat);
  lower_red_marker_cap.name = "lower_red_marker_cap";
  lower_red_marker_cap.rotation.z = Math.PI / 2;
  lower_red_marker_cap.position.x = 0.155;
  lower_red_marker.add(lower_red_marker_cap);
  stationery_group.add(lower_red_marker);

  const lower_pen_one = new THREE.Group();
  lower_pen_one.name = "lower_pen_one";
  lower_pen_one.position.set(-0.12, 0.43, 0.18);
  lower_pen_one.rotation.y = 0.16;
  const lower_pen_one_bodyGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.34, 10);
  const lower_pen_one_body = new THREE.Mesh(lower_pen_one_bodyGeom, brushedMat);
  lower_pen_one_body.name = "lower_pen_one_body";
  lower_pen_one_body.rotation.z = Math.PI / 2;
  lower_pen_one.add(lower_pen_one_body);
  const lower_pen_one_capGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.07, 10);
  const lower_pen_one_cap = new THREE.Mesh(lower_pen_one_capGeom, bluePlasticMat);
  lower_pen_one_cap.name = "lower_pen_one_cap";
  lower_pen_one_cap.rotation.z = Math.PI / 2;
  lower_pen_one_cap.position.x = 0.18;
  lower_pen_one.add(lower_pen_one_cap);
  stationery_group.add(lower_pen_one);

  const lower_pen_two = new THREE.Group();
  lower_pen_two.name = "lower_pen_two";
  lower_pen_two.position.set(-0.08, 0.445, 0.12);
  lower_pen_two.rotation.y = -0.10;
  const lower_pen_two_bodyGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.33, 10);
  const lower_pen_two_body = new THREE.Mesh(lower_pen_two_bodyGeom, polishedMat);
  lower_pen_two_body.name = "lower_pen_two_body";
  lower_pen_two_body.rotation.z = Math.PI / 2;
  lower_pen_two.add(lower_pen_two_body);
  const lower_pen_two_capGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.065, 10);
  const lower_pen_two_cap = new THREE.Mesh(lower_pen_two_capGeom, blackMat);
  lower_pen_two_cap.name = "lower_pen_two_cap";
  lower_pen_two_cap.rotation.z = Math.PI / 2;
  lower_pen_two_cap.position.x = -0.18;
  lower_pen_two.add(lower_pen_two_cap);
  stationery_group.add(lower_pen_two);

  const lower_pen_three = new THREE.Group();
  lower_pen_three.name = "lower_pen_three";
  lower_pen_three.position.set(-0.02, 0.45, 0.07);
  lower_pen_three.rotation.y = 0.06;
  const lower_pen_three_bodyGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.31, 10);
  const lower_pen_three_body = new THREE.Mesh(lower_pen_three_bodyGeom, darkMetalMat);
  lower_pen_three_body.name = "lower_pen_three_body";
  lower_pen_three_body.rotation.z = Math.PI / 2;
  lower_pen_three.add(lower_pen_three_body);
  const lower_pen_three_capGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.065, 10);
  const lower_pen_three_cap = new THREE.Mesh(lower_pen_three_capGeom, redPlasticMat);
  lower_pen_three_cap.name = "lower_pen_three_cap";
  lower_pen_three_cap.rotation.z = Math.PI / 2;
  lower_pen_three_cap.position.x = 0.175;
  lower_pen_three.add(lower_pen_three_cap);
  stationery_group.add(lower_pen_three);

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