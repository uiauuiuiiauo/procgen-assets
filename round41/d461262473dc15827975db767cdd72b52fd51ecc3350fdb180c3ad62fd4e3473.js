export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "desktop_stationery_organizer";

  const cabinet = new THREE.Group();
  cabinet.name = "cabinet";
  root.add(cabinet);

  const upper_organizer = new THREE.Group();
  upper_organizer.name = "upper_organizer";
  root.add(upper_organizer);

  const lower_cubby = new THREE.Group();
  lower_cubby.name = "lower_cubby";
  root.add(lower_cubby);

  const bottom_drawer = new THREE.Group();
  bottom_drawer.name = "bottom_drawer";
  root.add(bottom_drawer);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
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
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xf1f0e9,
    metalness: 0.0,
    roughness: 0.8
  });
  const lightGrayPaperMat = new THREE.MeshStandardMaterial({
    color: 0xbfc2c4,
    metalness: 0.0,
    roughness: 0.8
  });
  const bluePaperMat = new THREE.MeshStandardMaterial({
    color: 0x7189a8,
    metalness: 0.0,
    roughness: 0.8
  });
  const kraftMat = new THREE.MeshStandardMaterial({
    color: 0xa98b70,
    metalness: 0.0,
    roughness: 0.9
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xe7d7b8,
    metalness: 0.0,
    roughness: 0.9
  });
  const redPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xd9364d,
    metalness: 0.0,
    roughness: 0.3
  });
  const pinkPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xf05291,
    metalness: 0.0,
    roughness: 0.3
  });
  const bluePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x2368ae,
    metalness: 0.0,
    roughness: 0.3
  });
  const darkBluePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x174d8d,
    metalness: 0.0,
    roughness: 0.3
  });
  const greenPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x25a84a,
    metalness: 0.0,
    roughness: 0.3
  });
  const yellowPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xf2d51d,
    metalness: 0.0,
    roughness: 0.3
  });
  const orangePlasticMat = new THREE.MeshStandardMaterial({
    color: 0xf19b27,
    metalness: 0.0,
    roughness: 0.3
  });
  const purplePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x8051a6,
    metalness: 0.0,
    roughness: 0.3
  });
  const whitePlasticMat = new THREE.MeshStandardMaterial({
    color: 0xe7e7e2,
    metalness: 0.0,
    roughness: 0.3
  });

  function makeBox(name, width, height, depth, material, x, y, z, parent) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material
    );
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    instance_dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const side_panelGeom = new THREE.BoxGeometry(0.055, 1.4, 0.7);

  const left_side_panel = new THREE.Mesh(side_panelGeom, brushedMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.56, 0.72, -0.005);
  cabinet.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, brushedMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.56, 0.72, -0.005);
  cabinet.add(right_side_panel);

  const right_front_post = makeBox(
    "right_front_post",
    0.065,
    1.38,
    0.055,
    brushedMat,
    0.56,
    0.72,
    0.34,
    cabinet
  );

  const right_rear_post = makeBox(
    "right_rear_post",
    0.065,
    1.38,
    0.055,
    brushedMat,
    0.56,
    0.72,
    -0.34,
    cabinet
  );

  const left_front_post = makeBox(
    "left_front_post",
    0.05,
    1.36,
    0.045,
    darkMetalMat,
    -0.555,
    0.72,
    0.33,
    cabinet
  );

  const rear_panel = makeBox(
    "rear_panel",
    1.07,
    1.34,
    0.035,
    darkMetalMat,
    0,
    0.72,
    -0.34,
    cabinet
  );

  const interior_back_liner = makeBox(
    "interior_back_liner",
    1.02,
    0.66,
    0.012,
    blackMat,
    0,
    0.5,
    -0.316,
    cabinet
  );

  const interior_floor = makeBox(
    "interior_floor",
    1.07,
    0.035,
    0.66,
    darkMetalMat,
    0,
    0.145,
    -0.005,
    cabinet
  );

  const middle_shelf = makeBox(
    "middle_shelf",
    1.08,
    0.045,
    0.67,
    brushedMat,
    0,
    0.82,
    0,
    cabinet
  );

  const middle_front_lip = makeBox(
    "middle_front_lip",
    1.12,
    0.075,
    0.045,
    silverMat,
    0,
    0.82,
    0.35,
    cabinet
  );

  const upper_back_wall = makeBox(
    "upper_back_wall",
    1.07,
    0.51,
    0.04,
    brushedMat,
    0,
    1.18,
    -0.335,
    cabinet
  );

  const upper_back_inset = makeBox(
    "upper_back_inset",
    0.76,
    0.31,
    0.012,
    darkMetalMat,
    -0.04,
    1.19,
    -0.309,
    cabinet
  );

  const upper_tray_floor = makeBox(
    "upper_tray_floor",
    1.06,
    0.035,
    0.64,
    brushedMat,
    0,
    0.845,
    -0.005,
    upper_organizer
  );

  const upper_front_rail = makeBox(
    "upper_front_rail",
    1.18,
    0.038,
    0.038,
    silverMat,
    0,
    0.86,
    0.37,
    upper_organizer
  );

  const upper_rear_rail = makeBox(
    "upper_rear_rail",
    1.13,
    0.04,
    0.035,
    silverMat,
    0,
    1.45,
    -0.34,
    upper_organizer
  );

  const upper_side_railsGeom = new THREE.BoxGeometry(0.035, 0.038, 0.7);
  const upper_side_rails = new THREE.InstancedMesh(
    upper_side_railsGeom,
    silverMat,
    2
  );
  upper_side_rails.name = "upper_side_rails";
  setInstance(upper_side_rails, 0, -0.585, 0.86, 0, 0, 0, 0);
  setInstance(upper_side_rails, 1, 0.585, 0.86, 0, 0, 0, 0);
  upper_side_rails.instanceMatrix.needsUpdate = true;
  upper_organizer.add(upper_side_rails);

  const upper_divider_left = makeBox(
    "upper_divider_left",
    0.025,
    0.29,
    0.48,
    brushedMat,
    -0.18,
    1.0,
    -0.06,
    upper_organizer
  );

  const upper_divider_right = makeBox(
    "upper_divider_right",
    0.42,
    0.29,
    0.025,
    brushedMat,
    0.29,
    1.0,
    0.08,
    upper_organizer
  );

  const paper_stackGeom = new THREE.BoxGeometry(0.43, 0.009, 0.31);
  const paper_stack = new THREE.InstancedMesh(paper_stackGeom, paperMat, 9);
  paper_stack.name = "paper_stack";
  for (let i = 0; i < 9; i++) {
    setInstance(
      paper_stack,
      i,
      -0.27 + (i % 3) * 0.004,
      0.87 + i * 0.011,
      0.015 - (i % 2) * 0.005,
      0,
      (i % 3 - 1) * 0.012,
      0
    );
  }
  paper_stack.instanceMatrix.needsUpdate = true;
  upper_organizer.add(paper_stack);

  const blue_top_book = makeBox(
    "blue_top_book",
    0.45,
    0.026,
    0.32,
    bluePaperMat,
    -0.27,
    0.995,
    0.015,
    upper_organizer
  );
  blue_top_book.rotation.y = -0.035;

  const blue_top_book_label = makeBox(
    "blue_top_book_label",
    0.11,
    0.004,
    0.025,
    paperMat,
    -0.18,
    1.011,
    0.04,
    upper_organizer
  );

  const front_document_stackGeom = new THREE.BoxGeometry(
    0.46,
    0.009,
    0.29
  );
  const front_document_stack = new THREE.InstancedMesh(
    front_document_stackGeom,
    paperMat,
    8
  );
  front_document_stack.name = "front_document_stack";
  for (let i = 0; i < 8; i++) {
    setInstance(
      front_document_stack,
      i,
      0.27 + (i % 2) * 0.006,
      0.858 + i * 0.011,
      0.17,
      0,
      (i % 3 - 1) * 0.012,
      0
    );
  }
  front_document_stack.instanceMatrix.needsUpdate = true;
  upper_organizer.add(front_document_stack);

  const document_red_tab = makeBox(
    "document_red_tab",
    0.18,
    0.012,
    0.035,
    redPlasticMat,
    0.36,
    0.94,
    0.31,
    upper_organizer
  );

  const document_yellow_tab = makeBox(
    "document_yellow_tab",
    0.16,
    0.012,
    0.035,
    yellowPlasticMat,
    0.17,
    0.918,
    0.315,
    upper_organizer
  );

  const document_green_tab = makeBox(
    "document_green_tab",
    0.2,
    0.012,
    0.035,
    greenPlasticMat,
    0.29,
    0.897,
    0.315,
    upper_organizer
  );

  const kraft_folder = makeBox(
    "kraft_folder",
    0.36,
    0.31,
    0.025,
    kraftMat,
    0.28,
    1.01,
    0.09,
    upper_organizer
  );
  kraft_folder.rotation.x = -0.035;

  const cream_folder = makeBox(
    "cream_folder",
    0.32,
    0.43,
    0.022,
    creamMat,
    0.39,
    1.235,
    -0.22,
    upper_organizer
  );
  cream_folder.rotation.x = -0.12;
  cream_folder.rotation.z = -0.035;

  const tan_folder = makeBox(
    "tan_folder",
    0.34,
    0.45,
    0.025,
    kraftMat,
    0.46,
    1.22,
    -0.16,
    upper_organizer
  );
  tan_folder.rotation.x = -0.1;
  tan_folder.rotation.z = -0.04;

  const blue_folder_spine = makeBox(
    "blue_folder_spine",
    0.35,
    0.045,
    0.035,
    bluePlasticMat,
    0.43,
    1.36,
    -0.19,
    upper_organizer
  );
  blue_folder_spine.rotation.x = -0.12;
  blue_folder_spine.rotation.z = -0.08;

  const white_folder_spine = makeBox(
    "white_folder_spine",
    0.3,
    0.04,
    0.03,
    whitePlasticMat,
    0.47,
    1.29,
    -0.08,
    upper_organizer
  );
  white_folder_spine.rotation.x = -0.1;
  white_folder_spine.rotation.z = -0.05;

  const yellow_folder_spine = makeBox(
    "yellow_folder_spine",
    0.22,
    0.035,
    0.03,
    yellowPlasticMat,
    0.47,
    1.19,
    0.015,
    upper_organizer
  );
  yellow_folder_spine.rotation.x = -0.08;
  yellow_folder_spine.rotation.z = -0.04;

  const pencil_cup = makeBox(
    "pencil_cup",
    0.22,
    0.3,
    0.15,
    brushedMat,
    0.19,
    1.01,
    -0.015,
    upper_organizer
  );

  const pencil_cup_front = makeBox(
    "pencil_cup_front",
    0.22,
    0.19,
    0.012,
    silverMat,
    0.19,
    0.965,
    0.066,
    upper_organizer
  );

  const cup_holesGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.006, 12);
  const cup_holes = new THREE.InstancedMesh(cup_holesGeom, blackMat, 5);
  cup_holes.name = "cup_holes";
  for (let i = 0; i < 5; i++) {
    setInstance(
      cup_holes,
      i,
      0.13 + i * 0.03,
      1.09,
      0.074,
      Math.PI / 2,
      0,
      0
    );
  }
  cup_holes.instanceMatrix.needsUpdate = true;
  upper_organizer.add(cup_holes);

  const pensGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.42, 10);
  const penMats = [
    bluePlasticMat,
    redPlasticMat,
    greenPlasticMat,
    yellowPlasticMat,
    purplePlasticMat
  ];
  const pens = new THREE.Group();
  pens.name = "pens";
  for (let i = 0; i < 5; i++) {
    const pen = new THREE.Mesh(pensGeom, penMats[i]);
    pen.name = "pen_" + i;
    pen.position.set(0.13 + i * 0.03, 1.18 + (i % 2) * 0.025, 0.015);
    pen.rotation.x = (i - 2) * 0.018;
    pen.rotation.z = (2 - i) * 0.025;
    pens.add(pen);
  }
  upper_organizer.add(pens);

  const pen_capsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.055, 10);
  const pen_caps = new THREE.InstancedMesh(
    pen_capsGeom,
    darkBluePlasticMat,
    5
  );
  pen_caps.name = "pen_caps";
  for (let i = 0; i < 5; i++) {
    setInstance(
      pen_caps,
      i,
      0.13 + i * 0.03,
      1.405 + (i % 2) * 0.025,
      0.015,
      (i - 2) * 0.018,
      0,
      (2 - i) * 0.025
    );
  }
  pen_caps.instanceMatrix.needsUpdate = true;
  upper_organizer.add(pen_caps);

  const red_scissors_handleGeom = new THREE.TorusGeometry(
    0.035,
    0.009,
    8,
    20
  );
  const red_scissors_handle_upper = new THREE.Mesh(
    red_scissors_handleGeom,
    redPlasticMat
  );
  red_scissors_handle_upper.name = "red_scissors_handle_upper";
  red_scissors_handle_upper.position.set(-0.015, 1.25, -0.18);
  red_scissors_handle_upper.rotation.z = -0.25;
  red_scissors_handle_upper.scale.set(0.72, 1.35, 1);
  upper_organizer.add(red_scissors_handle_upper);

  const red_scissors_handle_lower = new THREE.Mesh(
    red_scissors_handleGeom,
    redPlasticMat
  );
  red_scissors_handle_lower.name = "red_scissors_handle_lower";
  red_scissors_handle_lower.position.set(0.035, 1.25, -0.18);
  red_scissors_handle_lower.rotation.z = 0.25;
  red_scissors_handle_lower.scale.set(0.72, 1.35, 1);
  upper_organizer.add(red_scissors_handle_lower);

  const red_scissors_pivot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.012, 14),
    silverMat
  );
  red_scissors_pivot.name = "red_scissors_pivot";
  red_scissors_pivot.rotation.x = Math.PI / 2;
  red_scissors_pivot.position.set(0.01, 1.22, -0.17);
  upper_organizer.add(red_scissors_pivot);

  const red_scissors_arm_left = makeBox(
    "red_scissors_arm_left",
    0.012,
    0.13,
    0.012,
    silverMat,
    0.005,
    1.18,
    -0.18,
    upper_organizer
  );
  red_scissors_arm_left.rotation.z = -0.18;

  const red_scissors_arm_right = makeBox(
    "red_scissors_arm_right",
    0.012,
    0.13,
    0.012,
    silverMat,
    0.02,
    1.18,
    -0.18,
    upper_organizer
  );
  red_scissors_arm_right.rotation.z = 0.18;

  const blue_scissors_handleGeom = new THREE.TorusGeometry(
    0.032,
    0.008,
    8,
    20
  );
  const blue_scissors_handle = new THREE.Mesh(
    blue_scissors_handleGeom,
    bluePlasticMat
  );
  blue_scissors_handle.name = "blue_scissors_handle";
  blue_scissors_handle.position.set(0.095, 1.27, -0.205);
  blue_scissors_handle.rotation.z = 0.16;
  blue_scissors_handle.scale.set(0.72, 1.4, 1);
  upper_organizer.add(blue_scissors_handle);

  const green_scissors_handleGeom = new THREE.TorusGeometry(
    0.04,
    0.01,
    8,
    20
  );
  const green_scissors_handle = new THREE.Mesh(
    green_scissors_handleGeom,
    greenPlasticMat
  );
  green_scissors_handle.name = "green_scissors_handle";
  green_scissors_handle.position.set(0.16, 1.245, -0.16);
  green_scissors_handle.rotation.z = -0.12;
  green_scissors_handle.scale.set(0.72, 1.35, 1);
  upper_organizer.add(green_scissors_handle);

  const green_scissors_pivot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.013, 0.013, 0.012, 14),
    silverMat
  );
  green_scissors_pivot.name = "green_scissors_pivot";
  green_scissors_pivot.rotation.x = Math.PI / 2;
  green_scissors_pivot.position.set(0.15, 1.215, -0.15);
  upper_organizer.add(green_scissors_pivot);

  const pink_marker = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.39, 12),
    pinkPlasticMat
  );
  pink_marker.name = "pink_marker";
  pink_marker.position.set(-0.25, 1.25, -0.22);
  pink_marker.rotation.z = Math.PI / 2;
  upper_organizer.add(pink_marker);

  const yellow_marker = new THREE.Mesh(
    new THREE.CylinderGeometry(0.017, 0.017, 0.4, 12),
    yellowPlasticMat
  );
  yellow_marker.name = "yellow_marker";
  yellow_marker.position.set(-0.27, 1.19, -0.2);
  yellow_marker.rotation.z = Math.PI / 2;
  upper_organizer.add(yellow_marker);

  const blue_marker = new THREE.Mesh(
    new THREE.CylinderGeometry(0.016, 0.016, 0.2, 12),
    bluePlasticMat
  );
  blue_marker.name = "blue_marker";
  blue_marker.position.set(-0.02, 1.2, -0.13);
  blue_marker.rotation.z = Math.PI / 2;
  upper_organizer.add(blue_marker);

  const pink_highlighter = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.34, 12),
    pinkPlasticMat
  );
  pink_highlighter.name = "pink_highlighter";
  pink_highlighter.position.set(0.35, 1.2, -0.02);
  pink_highlighter.rotation.z = -0.08;
  upper_organizer.add(pink_highlighter);

  const pink_highlighter_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.023, 0.023, 0.06, 12),
    pinkPlasticMat
  );
  pink_highlighter_cap.name = "pink_highlighter_cap";
  pink_highlighter_cap.rotation.z = -0.08;
  pink_highlighter_cap.position.set(0.364, 1.385, -0.02);
  upper_organizer.add(pink_highlighter_cap);

  const bottom_drawer_front = makeBox(
    "bottom_drawer_front",
    1.08,
    0.37,
    0.045,
    silverMat,
    0,
    0.25,
    0.43,
    bottom_drawer
  );

  const bottom_drawer_left = makeBox(
    "bottom_drawer_left",
    0.045,
    0.37,
    0.66,
    brushedMat,
    -0.525,
    0.25,
    0.11,
    bottom_drawer
  );

  const bottom_drawer_right = makeBox(
    "bottom_drawer_right",
    0.045,
    0.37,
    0.66,
    brushedMat,
    0.525,
    0.25,
    0.11,
    bottom_drawer
  );

  const bottom_drawer_back = makeBox(
    "bottom_drawer_back",
    1.05,
    0.34,
    0.04,
    brushedMat,
    0,
    0.25,
    -0.21,
    bottom_drawer
  );

  const bottom_drawer_floor = makeBox(
    "bottom_drawer_floor",
    1.04,
    0.035,
    0.64,
    brushedMat,
    0,
    0.075,
    0.1,
    bottom_drawer
  );

  const bottom_drawer_top_rail = makeBox(
    "bottom_drawer_top_rail",
    1.12,
    0.045,
    0.05,
    silverMat,
    0,
    0.45,
    0.43,
    bottom_drawer
  );

  const bottom_drawer_bottom_rail = makeBox(
    "bottom_drawer_bottom_rail",
    1.1,
    0.035,
    0.045,
    silverMat,
    0,
    0.055,
    0.43,
    bottom_drawer
  );

  const drawer_shadow_gap = makeBox(
    "drawer_shadow_gap",
    1.02,
    0.018,
    0.025,
    blackMat,
    0,
    0.468,
    0.405,
    bottom_drawer
  );

  const yellow_notebook = makeBox(
    "yellow_notebook",
    0.29,
    0.025,
    0.22,
    yellowPlasticMat,
    -0.31,
    0.49,
    0.18,
    bottom_drawer
  );
  yellow_notebook.rotation.y = -0.12;

  const yellow_notebook_label = new THREE.Mesh(
    new THREE.CircleGeometry(0.055, 20),
    redPlasticMat
  );
  yellow_notebook_label.name = "yellow_notebook_label";
  yellow_notebook_label.rotation.x = -Math.PI / 2;
  yellow_notebook_label.position.set(-0.31, 0.506, 0.18);
  yellow_notebook_label.scale.set(1.25, 0.75, 1);
  bottom_drawer.add(yellow_notebook_label);

  const white_notepad = makeBox(
    "white_notepad",
    0.27,
    0.022,
    0.19,
    paperMat,
    -0.02,
    0.485,
    0.22,
    bottom_drawer
  );
  white_notepad.rotation.y = 0.08;

  const blue_notepad = makeBox(
    "blue_notepad",
    0.24,
    0.025,
    0.18,
    bluePlasticMat,
    0.28,
    0.485,
    0.22,
    bottom_drawer
  );
  blue_notepad.rotation.y = -0.08;

  const green_pen_barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.024, 0.024, 0.34, 14),
    greenPlasticMat
  );
  green_pen_barrel.name = "green_pen_barrel";
  green_pen_barrel.rotation.z = Math.PI / 2;
  green_pen_barrel.rotation.x = 0.05;
  green_pen_barrel.position.set(0.27, 0.535, 0.25);
  bottom_drawer.add(green_pen_barrel);

  const green_pen_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.029, 0.029, 0.07, 14),
    greenPlasticMat
  );
  green_pen_cap.name = "green_pen_cap";
  green_pen_cap.rotation.z = Math.PI / 2;
  green_pen_cap.position.set(0.47, 0.535, 0.25);
  bottom_drawer.add(green_pen_cap);

  const red_pen_barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.31, 14),
    redPlasticMat
  );
  red_pen_barrel.name = "red_pen_barrel";
  red_pen_barrel.rotation.z = Math.PI / 2;
  red_pen_barrel.position.set(0.22, 0.54, 0.09);
  bottom_drawer.add(red_pen_barrel);

  const red_pen_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.027, 0.027, 0.065, 14),
    redPlasticMat
  );
  red_pen_cap.name = "red_pen_cap";
  red_pen_cap.rotation.z = Math.PI / 2;
  red_pen_cap.position.set(0.39, 0.54, 0.09);
  bottom_drawer.add(red_pen_cap);

  const blue_pen_barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 0.32, 14),
    bluePlasticMat
  );
  blue_pen_barrel.name = "blue_pen_barrel";
  blue_pen_barrel.rotation.z = Math.PI / 2;
  blue_pen_barrel.position.set(0.17, 0.535, -0.015);
  bottom_drawer.add(blue_pen_barrel);

  const blue_pen_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.027, 0.027, 0.065, 14),
    darkBluePlasticMat
  );
  blue_pen_cap.name = "blue_pen_cap";
  blue_pen_cap.rotation.z = Math.PI / 2;
  blue_pen_cap.position.set(0.345, 0.535, -0.015);
  bottom_drawer.add(blue_pen_cap);

  const silver_pen_barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.014, 0.014, 0.4, 12),
    silverMat
  );
  silver_pen_barrel.name = "silver_pen_barrel";
  silver_pen_barrel.rotation.z = Math.PI / 2;
  silver_pen_barrel.position.set(-0.02, 0.535, 0.16);
  bottom_drawer.add(silver_pen_barrel);

  const silver_pen_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.019, 0.019, 0.06, 12),
    blackMat
  );
  silver_pen_cap.name = "silver_pen_cap";
  silver_pen_cap.rotation.z = Math.PI / 2;
  silver_pen_cap.position.set(0.19, 0.535, 0.16);
  bottom_drawer.add(silver_pen_cap);

  const black_pen_barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.013, 0.013, 0.34, 12),
    blackMat
  );
  black_pen_barrel.name = "black_pen_barrel";
  black_pen_barrel.rotation.z = Math.PI / 2;
  black_pen_barrel.position.set(-0.08, 0.525, 0.07);
  bottom_drawer.add(black_pen_barrel);

  const black_pen_cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.018, 0.018, 0.055, 12),
    blackMat
  );
  black_pen_cap.name = "black_pen_cap";
  black_pen_cap.rotation.z = Math.PI / 2;
  black_pen_cap.position.set(0.095, 0.525, 0.07);
  bottom_drawer.add(black_pen_cap);

  const blue_eraser = makeBox(
    "blue_eraser",
    0.15,
    0.055,
    0.075,
    bluePlasticMat,
    -0.15,
    0.52,
    0.28,
    bottom_drawer
  );
  blue_eraser.rotation.y = -0.12;

  const red_eraser = makeBox(
    "red_eraser",
    0.14,
    0.05,
    0.07,
    redPlasticMat,
    0.03,
    0.515,
    0.29,
    bottom_drawer
  );
  red_eraser.rotation.y = 0.1;

  const side_handle_recess = makeBox(
    "side_handle_recess",
    0.012,
    0.065,
    0.15,
    blackMat,
    0.592,
    1.04,
    0.1,
    cabinet
  );

  const side_handle_upper = makeBox(
    "side_handle_upper",
    0.018,
    0.018,
    0.13,
    silverMat,
    0.601,
    1.076,
    0.1,
    cabinet
  );

  const side_handle_lower = makeBox(
    "side_handle_lower",
    0.018,
    0.018,
    0.13,
    silverMat,
    0.601,
    1.004,
    0.1,
    cabinet
  );

  const side_handle_end_left = makeBox(
    "side_handle_end_left",
    0.018,
    0.052,
    0.018,
    silverMat,
    0.601,
    1.04,
    0.035,
    cabinet
  );

  const side_handle_end_right = makeBox(
    "side_handle_end_right",
    0.018,
    0.052,
    0.018,
    silverMat,
    0.601,
    1.04,
    0.165,
    cabinet
  );

  const screw_headsGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.008,
    14
  );
  const screw_heads = new THREE.InstancedMesh(
    screw_headsGeom,
    silverMat,
    10
  );
  screw_heads.name = "screw_heads";
  const screw_positions = [
    [0.595, 1.28, -0.22],
    [0.595, 1.04, 0.28],
    [0.595, 0.78, 0.28],
    [0.595, 0.52, 0.28],
    [0.595, 0.25, 0.28],
    [0.595, 0.78, -0.27],
    [-0.59, 1.35, -0.27],
    [-0.59, 0.76, -0.27],
    [-0.48, 0.13, 0.458],
    [0.48, 0.13, 0.458]
  ];
  for (let i = 0; i < screw_positions.length; i++) {
    const position = screw_positions[i];
    setInstance(
      screw_heads,
      i,
      position[0],
      position[1],
      position[2],
      0,
      0,
      Math.PI / 2
    );
  }
  screw_heads.instanceMatrix.needsUpdate = true;
  cabinet.add(screw_heads);

  const shelf_rollerGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.12,
    14
  );

  const left_shelf_roller = new THREE.Mesh(shelf_rollerGeom, silverMat);
  left_shelf_roller.name = "left_shelf_roller";
  left_shelf_roller.rotation.z = Math.PI / 2;
  left_shelf_roller.position.set(-0.59, 0.86, 0.37);
  upper_organizer.add(left_shelf_roller);

  const right_shelf_roller = new THREE.Mesh(shelf_rollerGeom, silverMat);
  right_shelf_roller.name = "right_shelf_roller";
  right_shelf_roller.rotation.z = Math.PI / 2;
  right_shelf_roller.position.set(0.59, 0.86, 0.37);
  upper_organizer.add(right_shelf_roller);

  const left_drawer_roller = new THREE.Mesh(shelf_rollerGeom, silverMat);
  left_drawer_roller.name = "left_drawer_roller";
  left_drawer_roller.rotation.z = Math.PI / 2;
  left_drawer_roller.position.set(-0.57, 0.45, 0.43);
  bottom_drawer.add(left_drawer_roller);

  const right_drawer_roller = new THREE.Mesh(shelf_rollerGeom, silverMat);
  right_drawer_roller.name = "right_drawer_roller";
  right_drawer_roller.rotation.z = Math.PI / 2;
  right_drawer_roller.position.set(0.57, 0.45, 0.43);
  bottom_drawer.add(right_drawer_roller);

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

  fitToUnitCube(THREE, root);
  return root;
}