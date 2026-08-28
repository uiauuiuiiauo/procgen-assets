export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_brass_clasp";

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  hardware_group.rotation.z = 0.13;
  root.add(hardware_group);

  const loop_group = new THREE.Group();
  loop_group.name = "loop_group";
  hardware_group.add(loop_group);

  const plate_group = new THREE.Group();
  plate_group.name = "plate_group";
  hardware_group.add(plate_group);

  const ornament_group = new THREE.Group();
  ornament_group.name = "ornament_group";
  ornament_group.position.z = -0.05;
  hardware_group.add(ornament_group);

  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc6a653,
    metalness: 0.6,
    roughness: 0.2
  });
  const highlight_brassMat = new THREE.MeshStandardMaterial({
    color: 0xe0c671,
    metalness: 0.6,
    roughness: 0.2
  });
  const antique_brassMat = new THREE.MeshStandardMaterial({
    color: 0x8f7134,
    metalness: 0.6,
    roughness: 0.5
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x554421,
    metalness: 0.5,
    roughness: 0.5
  });
  const relief_brassMat = new THREE.MeshStandardMaterial({
    color: 0xb58e42,
    metalness: 0.6,
    roughness: 0.35
  });

  function makeTube(points, radius, material, tubularSegments) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        tubularSegments,
        radius,
        8,
        false
      ),
      material
    );
  }

  function makeRodBetween(start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, 16),
      material
    );
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return rod;
  }

  function makeSeam(x1, y1, x2, y2, z) {
    return makeRodBetween(
      new THREE.Vector3(x1, y1, z),
      new THREE.Vector3(x2, y2, z),
      0.018,
      dark_brassMat
    );
  }

  const main_shackle_points = [
    new THREE.Vector3(-0.82, -0.72, -0.08),
    new THREE.Vector3(-0.97, -0.55, -0.08),
    new THREE.Vector3(-1.00, -0.25, -0.08),
    new THREE.Vector3(-0.98, 0.12, -0.08),
    new THREE.Vector3(-0.94, 0.52, -0.08),
    new THREE.Vector3(-0.82, 0.94, -0.08),
    new THREE.Vector3(-0.62, 1.30, -0.08),
    new THREE.Vector3(-0.31, 1.55, -0.08),
    new THREE.Vector3(0.10, 1.64, -0.08),
    new THREE.Vector3(0.48, 1.56, -0.08),
    new THREE.Vector3(0.76, 1.34, -0.08),
    new THREE.Vector3(0.95, 1.02, -0.08),
    new THREE.Vector3(1.03, 0.65, -0.08),
    new THREE.Vector3(0.98, 0.34, -0.08),
    new THREE.Vector3(0.88, 0.08, -0.08)
  ];
  const main_shackleCurve = new THREE.CatmullRomCurve3(
    main_shackle_points,
    false,
    "centripetal"
  );
  const main_shackleGeom = new THREE.TubeGeometry(
    main_shackleCurve,
    112,
    0.17,
    20,
    false
  );
  const main_shackle = new THREE.Mesh(
    main_shackleGeom,
    polished_brassMat
  );
  main_shackle.name = "main_shackle";
  loop_group.add(main_shackle);

  const lower_return_shackle_points = [
    new THREE.Vector3(0.88, 0.08, -0.08),
    new THREE.Vector3(0.82, -0.22, -0.08),
    new THREE.Vector3(0.76, -0.55, -0.08),
    new THREE.Vector3(0.62, -0.90, -0.08),
    new THREE.Vector3(0.38, -1.20, -0.08),
    new THREE.Vector3(0.05, -1.37, -0.08),
    new THREE.Vector3(-0.32, -1.39, -0.08),
    new THREE.Vector3(-0.63, -1.25, -0.08),
    new THREE.Vector3(-0.82, -1.00, -0.08),
    new THREE.Vector3(-0.91, -0.75, -0.08),
    new THREE.Vector3(-0.82, -0.72, -0.08)
  ];
  const lower_return_shackleCurve = new THREE.CatmullRomCurve3(
    lower_return_shackle_points,
    false,
    "centripetal"
  );
  const lower_return_shackleGeom = new THREE.TubeGeometry(
    lower_return_shackleCurve,
    80,
    0.17,
    20,
    false
  );
  const lower_return_shackle = new THREE.Mesh(
    lower_return_shackleGeom,
    polished_brassMat
  );
  lower_return_shackle.name = "lower_return_shackle";
  loop_group.add(lower_return_shackle);

  const upper_shackle_seam = makeSeam(
    0.76, 1.34,
    0.95, 1.02,
    0.087
  );
  upper_shackle_seam.name = "upper_shackle_seam";
  loop_group.add(upper_shackle_seam);

  const lower_left_shackle_seam = makeSeam(
    -0.82, -0.72,
    -0.91, -0.75,
    0.087
  );
  lower_left_shackle_seam.name = "lower_left_shackle_seam";
  loop_group.add(lower_left_shackle_seam);

  const lower_right_shackle_seam = makeSeam(
    0.88, 0.08,
    0.82, -0.22,
    0.087
  );
  lower_right_shackle_seam.name = "lower_right_shackle_seam";
  loop_group.add(lower_right_shackle_seam);

  const left_hinge_socket = new THREE.Mesh(
    new THREE.SphereGeometry(0.205, 24, 14),
    antique_brassMat
  );
  left_hinge_socket.name = "left_hinge_socket";
  left_hinge_socket.position.set(-0.84, -0.71, -0.055);
  left_hinge_socket.scale.set(1.05, 0.88, 0.9);
  loop_group.add(left_hinge_socket);

  const right_locking_pinGeom = new THREE.CylinderGeometry(
    0.14,
    0.14,
    0.34,
    24
  );
  const right_locking_pin = new THREE.Mesh(
    right_locking_pinGeom,
    polished_brassMat
  );
  right_locking_pin.name = "right_locking_pin";
  right_locking_pin.rotation.z = Math.PI / 2;
  right_locking_pin.position.set(1.08, -0.015, -0.055);
  loop_group.add(right_locking_pin);

  const right_pin_capGeom = new THREE.SphereGeometry(0.142, 24, 14);
  const right_pin_cap = new THREE.Mesh(
    right_pin_capGeom,
    highlight_brassMat
  );
  right_pin_cap.name = "right_pin_cap";
  right_pin_cap.position.set(1.255, -0.015, -0.055);
  right_pin_cap.scale.set(0.72, 1, 1);
  loop_group.add(right_pin_cap);

  const right_pin_collarGeom = new THREE.TorusGeometry(
    0.141,
    0.014,
    8,
    28
  );
  const right_pin_collar = new THREE.Mesh(
    right_pin_collarGeom,
    dark_brassMat
  );
  right_pin_collar.name = "right_pin_collar";
  right_pin_collar.rotation.y = Math.PI / 2;
  right_pin_collar.position.set(1.17, -0.015, -0.055);
  loop_group.add(right_pin_collar);

  const clasp_plateShape = new THREE.Shape();
  clasp_plateShape.moveTo(-1.08, -0.49);
  clasp_plateShape.lineTo(0.82, -0.69);
  clasp_plateShape.lineTo(1.08, -0.48);
  clasp_plateShape.lineTo(1.15, 0.27);
  clasp_plateShape.lineTo(0.98, 0.50);
  clasp_plateShape.lineTo(-0.96, 0.72);
  clasp_plateShape.lineTo(-1.16, 0.49);
  clasp_plateShape.closePath();

  const clasp_plateGeom = new THREE.ExtrudeGeometry(
    clasp_plateShape,
    {
      depth: 0.18,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.04,
      bevelSegments: 3
    }
  );
  const clasp_plate = new THREE.Mesh(
    clasp_plateGeom,
    antique_brassMat
  );
  clasp_plate.name = "clasp_plate";
  clasp_plate.position.z = -0.09;
  plate_group.add(clasp_plate);

  const plate_edge_points = [
    new THREE.Vector3(-1.08, -0.49, 0.135),
    new THREE.Vector3(0.82, -0.69, 0.135),
    new THREE.Vector3(1.08, -0.48, 0.135),
    new THREE.Vector3(1.15, 0.27, 0.135),
    new THREE.Vector3(0.98, 0.50, 0.135),
    new THREE.Vector3(-0.96, 0.72, 0.135),
    new THREE.Vector3(-1.16, 0.49, 0.135)
  ];
  const plate_edgeCurve = new THREE.CatmullRomCurve3(
    plate_edge_points,
    true,
    "centripetal"
  );
  const plate_edgeGeom = new THREE.TubeGeometry(
    plate_edgeCurve,
    84,
    0.027,
    8,
    true
  );
  const plate_edge = new THREE.Mesh(
    plate_edgeGeom,
    highlight_brassMat
  );
  plate_edge.name = "plate_edge";
  plate_group.add(plate_edge);

  const ornamental_panelShape = new THREE.Shape();
  ornamental_panelShape.moveTo(-0.82, -0.38);
  ornamental_panelShape.lineTo(0.66, -0.50);
  ornamental_panelShape.lineTo(0.82, -0.35);
  ornamental_panelShape.lineTo(0.88, 0.23);
  ornamental_panelShape.lineTo(0.73, 0.39);
  ornamental_panelShape.lineTo(-0.72, 0.54);
  ornamental_panelShape.lineTo(-0.88, 0.37);
  ornamental_panelShape.closePath();

  const ornamental_panelGeom = new THREE.ExtrudeGeometry(
    ornamental_panelShape,
    {
      depth: 0.018,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.012,
      bevelSegments: 2
    }
  );
  const ornamental_panel = new THREE.Mesh(
    ornamental_panelGeom,
    dark_brassMat
  );
  ornamental_panel.name = "ornamental_panel";
  ornamental_panel.position.z = 0.13;
  ornament_group.add(ornamental_panel);

  const panel_border_points = [
    new THREE.Vector3(-0.82, -0.38, 0.172),
    new THREE.Vector3(0.66, -0.50, 0.172),
    new THREE.Vector3(0.82, -0.35, 0.172),
    new THREE.Vector3(0.88, 0.23, 0.172),
    new THREE.Vector3(0.73, 0.39, 0.172),
    new THREE.Vector3(-0.72, 0.54, 0.172),
    new THREE.Vector3(-0.88, 0.37, 0.172)
  ];
  const panel_borderCurve = new THREE.CatmullRomCurve3(
    panel_border_points,
    true,
    "centripetal"
  );
  const panel_borderGeom = new THREE.TubeGeometry(
    panel_borderCurve,
    72,
    0.022,
    8,
    true
  );
  const panel_border = new THREE.Mesh(
    panel_borderGeom,
    highlight_brassMat
  );
  panel_border.name = "panel_border";
  ornament_group.add(panel_border);

  const medallionX = -0.06;
  const medallionY = -0.01;

  const central_medallion_baseGeom = new THREE.CylinderGeometry(
    0.43,
    0.43,
    0.04,
    48
  );
  const central_medallion_base = new THREE.Mesh(
    central_medallion_baseGeom,
    relief_brassMat
  );
  central_medallion_base.name = "central_medallion_base";
  central_medallion_base.rotation.x = Math.PI / 2;
  central_medallion_base.position.set(
    medallionX,
    medallionY,
    0.184
  );
  ornament_group.add(central_medallion_base);

  const central_medallion_outer_ringGeom = new THREE.TorusGeometry(
    0.385,
    0.026,
    10,
    48
  );
  const central_medallion_outer_ring = new THREE.Mesh(
    central_medallion_outer_ringGeom,
    dark_brassMat
  );
  central_medallion_outer_ring.name = "central_medallion_outer_ring";
  central_medallion_outer_ring.position.set(
    medallionX,
    medallionY,
    0.208
  );
  ornament_group.add(central_medallion_outer_ring);

  const central_medallion_highlight_ringGeom = new THREE.TorusGeometry(
    0.345,
    0.018,
    10,
    48
  );
  const central_medallion_highlight_ring = new THREE.Mesh(
    central_medallion_highlight_ringGeom,
    highlight_brassMat
  );
  central_medallion_highlight_ring.name =
    "central_medallion_highlight_ring";
  central_medallion_highlight_ring.position.set(
    medallionX,
    medallionY,
    0.216
  );
  ornament_group.add(central_medallion_highlight_ring);

  const central_medallion_inner_ringGeom = new THREE.TorusGeometry(
    0.302,
    0.014,
    8,
    48
  );
  const central_medallion_inner_ring = new THREE.Mesh(
    central_medallion_inner_ringGeom,
    dark_brassMat
  );
  central_medallion_inner_ring.name =
    "central_medallion_inner_ring";
  central_medallion_inner_ring.position.set(
    medallionX,
    medallionY,
    0.221
  );
  ornament_group.add(central_medallion_inner_ring);

  const central_medallion_discGeom = new THREE.CylinderGeometry(
    0.255,
    0.255,
    0.035,
    48
  );
  const central_medallion_disc = new THREE.Mesh(
    central_medallion_discGeom,
    highlight_brassMat
  );
  central_medallion_disc.name = "central_medallion_disc";
  central_medallion_disc.rotation.x = Math.PI / 2;
  central_medallion_disc.position.set(
    medallionX,
    medallionY,
    0.218
  );
  ornament_group.add(central_medallion_disc);

  const central_medallion_grooveGeom = new THREE.TorusGeometry(
    0.205,
    0.007,
    6,
    48
  );
  const central_medallion_groove = new THREE.Mesh(
    central_medallion_grooveGeom,
    antique_brassMat
  );
  central_medallion_groove.name = "central_medallion_groove";
  central_medallion_groove.position.set(
    medallionX,
    medallionY,
    0.24
  );
  ornament_group.add(central_medallion_groove);

  const ornamental_studGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.025,
    18
  );
  const ornamental_studs = new THREE.InstancedMesh(
    ornamental_studGeom,
    relief_brassMat,
    8
  );
  ornamental_studs.name = "ornamental_studs";

  const stud_positions = [
    [-0.66, 0.25],
    [-0.43, 0.42],
    [-0.10, 0.47],
    [0.25, 0.43],
    [0.57, 0.28],
    [0.65, -0.06],
    [0.51, -0.34],
    [-0.64, -0.28]
  ];
  const stud_dummy = new THREE.Object3D();
  for (let i = 0; i < stud_positions.length; i++) {
    stud_dummy.position.set(
      stud_positions[i][0],
      stud_positions[i][1],
      0.205
    );
    stud_dummy.rotation.set(Math.PI / 2, 0, 0);
    stud_dummy.scale.set(1, 1, 1);
    stud_dummy.updateMatrix();
    ornamental_studs.setMatrixAt(i, stud_dummy.matrix);
  }
  ornamental_studs.instanceMatrix.needsUpdate = true;
  ornament_group.add(ornamental_studs);

  const ornamental_leafGeom = new THREE.SphereGeometry(
    0.055,
    12,
    8
  );
  const ornamental_leaves = new THREE.InstancedMesh(
    ornamental_leafGeom,
    relief_brassMat,
    12
  );
  ornamental_leaves.name = "ornamental_leaves";

  const leaf_positions = [
    [-0.57, 0.36, -0.70],
    [-0.36, 0.46, -0.25],
    [-0.16, 0.49, 0.12],
    [0.08, 0.49, 0.30],
    [0.31, 0.44, 0.65],
    [0.51, 0.34, 1.00],
    [0.62, 0.12, 1.35],
    [0.62, -0.18, 1.75],
    [0.47, -0.40, 2.20],
    [-0.57, -0.38, -2.55],
    [-0.72, -0.15, -2.05],
    [-0.75, 0.08, -1.62]
  ];
  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < leaf_positions.length; i++) {
    leaf_dummy.position.set(
      leaf_positions[i][0],
      leaf_positions[i][1],
      0.204
    );
    leaf_dummy.rotation.set(0, 0, leaf_positions[i][2]);
    leaf_dummy.scale.set(0.45, 1.15, 0.18);
    leaf_dummy.updateMatrix();
    ornamental_leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  ornamental_leaves.instanceMatrix.needsUpdate = true;
  ornament_group.add(ornamental_leaves);

  const left_scroll_vine = makeTube(
    [
      new THREE.Vector3(-0.68, -0.27, 0.207),
      new THREE.Vector3(-0.76, -0.13, 0.207),
      new THREE.Vector3(-0.72, 0.04, 0.207),
      new THREE.Vector3(-0.61, 0.13, 0.207),
      new THREE.Vector3(-0.66, 0.27, 0.207),
      new THREE.Vector3(-0.73, 0.19, 0.207)
    ],
    0.014,
    relief_brassMat,
    32
  );
  left_scroll_vine.name = "left_scroll_vine";
  ornament_group.add(left_scroll_vine);

  const right_scroll_vine = makeTube(
    [
      new THREE.Vector3(0.55, -0.35, 0.207),
      new THREE.Vector3(0.69, -0.25, 0.207),
      new THREE.Vector3(0.72, -0.09, 0.207),
      new THREE.Vector3(0.63, 0.02, 0.207),
      new THREE.Vector3(0.69, 0.17, 0.207),
      new THREE.Vector3(0.61, 0.29, 0.207)
    ],
    0.014,
    relief_brassMat,
    32
  );
  right_scroll_vine.name = "right_scroll_vine";
  ornament_group.add(right_scroll_vine);

  const upper_fan_vine = makeTube(
    [
      new THREE.Vector3(-0.52, 0.35, 0.207),
      new THREE.Vector3(-0.33, 0.43, 0.207),
      new THREE.Vector3(-0.09, 0.47, 0.207),
      new THREE.Vector3(0.16, 0.45, 0.207),
      new THREE.Vector3(0.42, 0.36, 0.207)
    ],
    0.012,
    relief_brassMat,
    32
  );
  upper_fan_vine.name = "upper_fan_vine";
  ornament_group.add(upper_fan_vine);

  fitToUnitCube(root);
  return root;

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
}