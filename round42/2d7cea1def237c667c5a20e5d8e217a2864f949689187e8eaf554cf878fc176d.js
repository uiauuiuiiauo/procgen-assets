export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "walk_behind_lawn_mower";

  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x0876ce,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const darkBlueMat = new THREE.MeshStandardMaterial({
    color: 0x07549b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x191a1c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x202225,
    metalness: 0.0,
    roughness: 0.8,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x303337,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xe8ece8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb72d2d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x4f9b57,
    metalness: 0.0,
    roughness: 0.3,
  });

  function makeRod(start, end, radius, material, segments = 12) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, segments),
      material
    );
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return rod;
  }

  const chassis = new THREE.Group();
  chassis.name = "chassis";
  root.add(chassis);

  const mower_deckShape = new THREE.Shape();
  mower_deckShape.moveTo(-0.60, -1.02);
  mower_deckShape.lineTo(0.60, -1.02);
  mower_deckShape.bezierCurveTo(0.72, -0.96, 0.79, -0.78, 0.82, -0.55);
  mower_deckShape.bezierCurveTo(0.91, -0.05, 0.87, 0.57, 0.67, 0.91);
  mower_deckShape.bezierCurveTo(0.59, 1.04, 0.45, 1.09, 0.32, 1.10);
  mower_deckShape.lineTo(-0.32, 1.10);
  mower_deckShape.bezierCurveTo(-0.45, 1.09, -0.59, 1.04, -0.67, 0.91);
  mower_deckShape.bezierCurveTo(-0.87, 0.57, -0.91, -0.05, -0.82, -0.55);
  mower_deckShape.bezierCurveTo(-0.79, -0.78, -0.72, -0.96, -0.60, -1.02);
  mower_deckShape.closePath();

  const mower_deckGeom = new THREE.ExtrudeGeometry(mower_deckShape, {
    depth: 0.20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.045,
    bevelSegments: 3,
  });
  const mower_deck = new THREE.Mesh(mower_deckGeom, blueMat);
  mower_deck.name = "mower_deck";
  mower_deck.rotation.x = Math.PI / 2;
  mower_deck.position.y = 0.56;
  chassis.add(mower_deck);

  const front_hoodGeom = new THREE.SphereGeometry(1, 28, 14);
  const front_hood = new THREE.Mesh(front_hoodGeom, blueMat);
  front_hood.name = "front_hood";
  front_hood.position.set(0, 0.62, 0.43);
  front_hood.scale.set(0.72, 0.20, 0.66);
  chassis.add(front_hood);

  const rear_bodyGeom = new THREE.SphereGeometry(1, 28, 14);
  const rear_body = new THREE.Mesh(rear_bodyGeom, blueMat);
  rear_body.name = "rear_body";
  rear_body.position.set(0, 0.65, -0.48);
  rear_body.scale.set(0.73, 0.29, 0.57);
  chassis.add(rear_body);

  const side_panelShape = new THREE.Shape();
  side_panelShape.moveTo(-0.62, 0.43);
  side_panelShape.lineTo(0.73, 0.43);
  side_panelShape.bezierCurveTo(0.68, 0.67, 0.54, 0.86, 0.34, 0.91);
  side_panelShape.lineTo(-0.15, 0.92);
  side_panelShape.bezierCurveTo(-0.35, 0.88, -0.50, 0.75, -0.58, 0.57);
  side_panelShape.closePath();
  const side_panelGeom = new THREE.ShapeGeometry(side_panelShape, 20);

  const left_side_panel = new THREE.Mesh(side_panelGeom, blueMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.rotation.y = -Math.PI / 2;
  left_side_panel.position.x = -0.79;
  chassis.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, blueMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.rotation.y = -Math.PI / 2;
  right_side_panel.position.x = 0.79;
  chassis.add(right_side_panel);

  const deck_edge_trim = new THREE.Group();
  deck_edge_trim.name = "deck_edge_trim";
  const left_deck_edge = makeRod(
    new THREE.Vector3(-0.72, 0.40, -0.72),
    new THREE.Vector3(-0.72, 0.40, 0.82),
    0.018,
    darkBlueMat
  );
  const right_deck_edge = makeRod(
    new THREE.Vector3(0.72, 0.40, -0.72),
    new THREE.Vector3(0.72, 0.40, 0.82),
    0.018,
    darkBlueMat
  );
  deck_edge_trim.add(left_deck_edge, right_deck_edge);
  chassis.add(deck_edge_trim);

  const deck_boltGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.018, 12);
  const deck_bolts = new THREE.InstancedMesh(deck_boltGeom, silverMat, 8);
  deck_bolts.name = "deck_bolts";
  const deckBoltPositions = [
    [-0.73, 0.47, -0.60],
    [-0.76, 0.47, 0.02],
    [-0.68, 0.47, 0.68],
    [0.73, 0.47, -0.60],
    [0.76, 0.47, 0.02],
    [0.68, 0.47, 0.68],
    [-0.38, 0.57, 0.96],
    [0.38, 0.57, 0.96],
  ];
  for (let i = 0; i < deckBoltPositions.length; i++) {
    const p = deckBoltPositions[i];
    const matrix = new THREE.Matrix4().makeTranslation(p[0], p[1], p[2]);
    deck_bolts.setMatrixAt(i, matrix);
  }
  deck_bolts.instanceMatrix.needsUpdate = true;
  chassis.add(deck_bolts);

  const engine = new THREE.Group();
  engine.name = "engine";
  root.add(engine);

  const engine_mountGeom = new THREE.BoxGeometry(1.18, 0.13, 0.82);
  const engine_mount = new THREE.Mesh(engine_mountGeom, blackMat);
  engine_mount.name = "engine_mount";
  engine_mount.position.set(0, 0.66, 0.30);
  engine.add(engine_mount);

  const engine_blockGeom = new THREE.BoxGeometry(0.72, 0.42, 0.58);
  const engine_block = new THREE.Mesh(engine_blockGeom, brushedMat);
  engine_block.name = "engine_block";
  engine_block.position.set(0, 0.91, 0.32);
  engine.add(engine_block);

  const engine_lower_caseGeom = new THREE.BoxGeometry(0.88, 0.18, 0.56);
  const engine_lower_case = new THREE.Mesh(engine_lower_caseGeom, blackMat);
  engine_lower_case.name = "engine_lower_case";
  engine_lower_case.position.set(0, 0.75, 0.34);
  engine.add(engine_lower_case);

  const cylinder_headGeom = new THREE.BoxGeometry(0.68, 0.31, 0.20);
  const cylinder_head = new THREE.Mesh(cylinder_headGeom, blackMat);
  cylinder_head.name = "cylinder_head";
  cylinder_head.position.set(0, 0.92, 0.67);
  engine.add(cylinder_head);

  const cooling_finGeom = new THREE.BoxGeometry(0.64, 0.022, 0.045);
  const cooling_fins = new THREE.InstancedMesh(cooling_finGeom, brushedMat, 7);
  cooling_fins.name = "cooling_fins";
  for (let i = 0; i < 7; i++) {
    const matrix = new THREE.Matrix4().makeTranslation(
      0,
      0.79 + i * 0.045,
      0.79
    );
    cooling_fins.setMatrixAt(i, matrix);
  }
  cooling_fins.instanceMatrix.needsUpdate = true;
  engine.add(cooling_fins);

  const engine_guard_barGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.62, 8);
  const engine_guard_bars = new THREE.InstancedMesh(
    engine_guard_barGeom,
    silverMat,
    4
  );
  engine_guard_bars.name = "engine_guard_bars";
  for (let i = 0; i < 4; i++) {
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      Math.PI / 2
    );
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(0, 0.82 + i * 0.075, 0.835),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    engine_guard_bars.setMatrixAt(i, matrix);
  }
  engine_guard_bars.instanceMatrix.needsUpdate = true;
  engine.add(engine_guard_bars);

  const engine_guard_left = makeRod(
    new THREE.Vector3(-0.31, 0.78, 0.835),
    new THREE.Vector3(-0.31, 1.10, 0.835),
    0.014,
    silverMat
  );
  engine_guard_left.name = "engine_guard_left";
  engine.add(engine_guard_left);

  const engine_guard_right = makeRod(
    new THREE.Vector3(0.31, 0.78, 0.835),
    new THREE.Vector3(0.31, 1.10, 0.835),
    0.014,
    silverMat
  );
  engine_guard_right.name = "engine_guard_right";
  engine.add(engine_guard_right);

  const air_filterGeom = new THREE.BoxGeometry(0.23, 0.43, 0.42);
  const left_air_filter = new THREE.Mesh(air_filterGeom, blackMat);
  left_air_filter.name = "left_air_filter";
  left_air_filter.position.set(-0.49, 0.91, 0.43);
  engine.add(left_air_filter);

  const right_air_filter = new THREE.Mesh(air_filterGeom, blackMat);
  right_air_filter.name = "right_air_filter";
  right_air_filter.position.set(0.49, 0.91, 0.43);
  engine.add(right_air_filter);

  const air_filter_ribGeom = new THREE.BoxGeometry(0.018, 0.30, 0.025);
  const air_filter_ribs = new THREE.InstancedMesh(
    air_filter_ribGeom,
    frameMat,
    4
  );
  air_filter_ribs.name = "air_filter_ribs";
  const ribPositions = [
    [-0.612, 0.91, 0.34],
    [-0.612, 0.91, 0.52],
    [0.612, 0.91, 0.34],
    [0.612, 0.91, 0.52],
  ];
  for (let i = 0; i < ribPositions.length; i++) {
    const p = ribPositions[i];
    air_filter_ribs.setMatrixAt(
      i,
      new THREE.Matrix4().makeTranslation(p[0], p[1], p[2])
    );
  }
  air_filter_ribs.instanceMatrix.needsUpdate = true;
  engine.add(air_filter_ribs);

  const recoil_housingGeom = new THREE.CylinderGeometry(0.285, 0.285, 0.14, 32);
  const recoil_housing = new THREE.Mesh(recoil_housingGeom, blackMat);
  recoil_housing.name = "recoil_housing";
  recoil_housing.rotation.z = Math.PI / 2;
  recoil_housing.position.set(0.49, 0.91, 0.25);
  engine.add(recoil_housing);

  const recoil_coverGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.025, 32);
  const recoil_cover = new THREE.Mesh(recoil_coverGeom, silverMat);
  recoil_cover.name = "recoil_cover";
  recoil_cover.rotation.z = Math.PI / 2;
  recoil_cover.position.set(0.57, 0.91, 0.25);
  engine.add(recoil_cover);

  const recoil_ringGeom = new THREE.TorusGeometry(0.245, 0.018, 10, 32);
  const recoil_ring = new THREE.Mesh(recoil_ringGeom, brushedMat);
  recoil_ring.name = "recoil_ring";
  recoil_ring.rotation.y = Math.PI / 2;
  recoil_ring.position.set(0.586, 0.91, 0.25);
  engine.add(recoil_ring);

  const engine_labelGeom = new THREE.BoxGeometry(0.29, 0.13, 0.012);
  const engine_label = new THREE.Mesh(engine_labelGeom, labelMat);
  engine_label.name = "engine_label";
  engine_label.position.set(-0.08, 0.80, 0.855);
  engine.add(engine_label);

  const engine_label_lineGeom = new THREE.BoxGeometry(0.21, 0.012, 0.008);
  const engine_label_line = new THREE.Mesh(engine_label_lineGeom, blackMat);
  engine_label_line.name = "engine_label_line";
  engine_label_line.position.set(-0.08, 0.80, 0.864);
  engine.add(engine_label_line);

  const fuel_tankShape = new THREE.Shape();
  fuel_tankShape.moveTo(-0.47, 0.00);
  fuel_tankShape.lineTo(0.47, 0.00);
  fuel_tankShape.lineTo(0.36, 0.46);
  fuel_tankShape.lineTo(-0.36, 0.46);
  fuel_tankShape.closePath();

  const fuel_tankGeom = new THREE.ExtrudeGeometry(fuel_tankShape, {
    depth: 0.88,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const fuel_tank = new THREE.Mesh(fuel_tankGeom, blueMat);
  fuel_tank.name = "fuel_tank";
  fuel_tank.rotation.y = Math.PI / 2;
  fuel_tank.position.set(-0.44, 1.08, 0.29);
  engine.add(fuel_tank);

  const fuel_tank_topGeom = new THREE.BoxGeometry(0.76, 0.035, 0.57);
  const fuel_tank_top = new THREE.Mesh(fuel_tank_topGeom, blueMat);
  fuel_tank_top.name = "fuel_tank_top";
  fuel_tank_top.position.set(0, 1.555, 0.29);
  engine.add(fuel_tank_top);

  const fuel_tank_lipGeom = new THREE.BoxGeometry(1.00, 0.055, 1.02);
  const fuel_tank_lip = new THREE.Mesh(fuel_tank_lipGeom, blueMat);
  fuel_tank_lip.name = "fuel_tank_lip";
  fuel_tank_lip.position.set(0, 1.085, 0.29);
  engine.add(fuel_tank_lip);

  const fuel_cap_baseGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.045, 28);
  const fuel_cap_base = new THREE.Mesh(fuel_cap_baseGeom, darkBlueMat);
  fuel_cap_base.name = "fuel_cap_base";
  fuel_cap_base.position.set(0, 1.585, 0.31);
  engine.add(fuel_cap_base);

  const fuel_capGeom = new THREE.CylinderGeometry(0.215, 0.235, 0.105, 28);
  const fuel_cap = new THREE.Mesh(fuel_capGeom, blackMat);
  fuel_cap.name = "fuel_cap";
  fuel_cap.position.set(0, 1.645, 0.31);
  engine.add(fuel_cap);

  const fuel_cap_ridgeGeom = new THREE.BoxGeometry(0.045, 0.085, 0.075);
  const fuel_cap_ridges = new THREE.InstancedMesh(
    fuel_cap_ridgeGeom,
    blackMat,
    16
  );
  fuel_cap_ridges.name = "fuel_cap_ridges";
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    );
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(
        Math.sin(angle) * 0.218,
        1.645,
        0.31 + Math.cos(angle) * 0.218
      ),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    fuel_cap_ridges.setMatrixAt(i, matrix);
  }
  fuel_cap_ridges.instanceMatrix.needsUpdate = true;
  engine.add(fuel_cap_ridges);

  const seat = new THREE.Group();
  seat.name = "seat";
  root.add(seat);

  const seat_pedestalGeom = new THREE.CylinderGeometry(0.20, 0.25, 0.35, 20);
  const seat_pedestal = new THREE.Mesh(seat_pedestalGeom, blackMat);
  seat_pedestal.name = "seat_pedestal";
  seat_pedestal.position.set(0, 0.83, -0.54);
  seat.add(seat_pedestal);

  const seat_cushionGeom = new THREE.SphereGeometry(1, 32, 16);
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, seatMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, 1.08, -0.49);
  seat_cushion.scale.set(0.48, 0.13, 0.43);
  seat.add(seat_cushion);

  const seat_front_pipingGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.82, 10);
  const seat_front_piping = new THREE.Mesh(seat_front_pipingGeom, seamMat);
  seat_front_piping.name = "seat_front_piping";
  seat_front_piping.rotation.z = Math.PI / 2;
  seat_front_piping.position.set(0, 1.09, -0.075);
  seat.add(seat_front_piping);

  const seat_backShape = new THREE.Shape();
  seat_backShape.moveTo(-0.30, -0.38);
  seat_backShape.lineTo(0.30, -0.38);
  seat_backShape.bezierCurveTo(0.38, -0.38, 0.43, -0.31, 0.44, -0.22);
  seat_backShape.lineTo(0.48, 0.25);
  seat_backShape.bezierCurveTo(0.49, 0.36, 0.42, 0.43, 0.33, 0.44);
  seat_backShape.lineTo(-0.33, 0.44);
  seat_backShape.bezierCurveTo(-0.42, 0.43, -0.49, 0.36, -0.48, 0.25);
  seat_backShape.lineTo(-0.44, -0.22);
  seat_backShape.bezierCurveTo(-0.43, -0.31, -0.38, -0.38, -0.30, -0.38);
  seat_backShape.closePath();

  const seat_backGeom = new THREE.ExtrudeGeometry(seat_backShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  const seat_back = new THREE.Mesh(seat_backGeom, seatMat);
  seat_back.name = "seat_back";
  seat_back.position.set(0, 1.43, -0.82);
  seat_back.rotation.x = -0.18;
  seat.add(seat_back);

  const seat_back_piping = new THREE.Group();
  seat_back_piping.name = "seat_back_piping";
  const seat_back_top_pipe = makeRod(
    new THREE.Vector3(-0.34, 1.84, -0.89),
    new THREE.Vector3(0.34, 1.84, -0.89),
    0.012,
    seamMat
  );
  const seat_back_left_pipe = makeRod(
    new THREE.Vector3(-0.43, 1.16, -0.76),
    new THREE.Vector3(-0.46, 1.78, -0.88),
    0.012,
    seamMat
  );
  const seat_back_right_pipe = makeRod(
    new THREE.Vector3(0.43, 1.16, -0.76),
    new THREE.Vector3(0.46, 1.78, -0.88),
    0.012,
    seamMat
  );
  seat_back_piping.add(
    seat_back_top_pipe,
    seat_back_left_pipe,
    seat_back_right_pipe
  );
  seat.add(seat_back_piping);

  const seat_labelGeom = new THREE.BoxGeometry(0.23, 0.12, 0.008);
  const seat_label = new THREE.Mesh(seat_labelGeom, labelMat);
  seat_label.name = "seat_label";
  seat_label.position.set(0, 1.67, -0.655);
  seat_label.rotation.x = -0.18;
  seat.add(seat_label);

  const seat_label_redGeom = new THREE.BoxGeometry(0.10, 0.025, 0.006);
  const seat_label_red = new THREE.Mesh(seat_label_redGeom, redMat);
  seat_label_red.name = "seat_label_red";
  seat_label_red.position.set(0.045, 1.695, -0.649);
  seat_label_red.rotation.x = -0.18;
  seat.add(seat_label_red);

  const seat_label_greenGeom = new THREE.BoxGeometry(0.07, 0.025, 0.006);
  const seat_label_green = new THREE.Mesh(seat_label_greenGeom, greenMat);
  seat_label_green.name = "seat_label_green";
  seat_label_green.position.set(-0.055, 1.645, -0.643);
  seat_label_green.rotation.x = -0.18;
  seat.add(seat_label_green);

  const handle = new THREE.Group();
  handle.name = "handle";
  root.add(handle);

  const left_handle_railPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.56, 0.68, -0.72),
    new THREE.Vector3(-0.60, 1.12, -0.92),
    new THREE.Vector3(-0.66, 1.75, -1.24),
    new THREE.Vector3(-0.70, 2.34, -1.53),
  ]);
  const left_handle_railGeom = new THREE.TubeGeometry(
    left_handle_railPath,
    36,
    0.055,
    12,
    false
  );
  const left_handle_rail = new THREE.Mesh(left_handle_railGeom, frameMat);
  left_handle_rail.name = "left_handle_rail";
  handle.add(left_handle_rail);

  const right_handle_railPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.56, 0.68, -0.72),
    new THREE.Vector3(0.60, 1.12, -0.92),
    new THREE.Vector3(0.66, 1.75, -1.24),
    new THREE.Vector3(0.70, 2.34, -1.53),
  ]);
  const right_handle_railGeom = new THREE.TubeGeometry(
    right_handle_railPath,
    36,
    0.055,
    12,
    false
  );
  const right_handle_rail = new THREE.Mesh(right_handle_railGeom, frameMat);
  right_handle_rail.name = "right_handle_rail";
  handle.add(right_handle_rail);

  const handle_gripPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.70, 2.34, -1.53),
    new THREE.Vector3(-0.72, 2.48, -1.63),
    new THREE.Vector3(-0.58, 2.58, -1.70),
    new THREE.Vector3(0.00, 2.60, -1.72),
    new THREE.Vector3(0.58, 2.58, -1.70),
    new THREE.Vector3(0.72, 2.48, -1.63),
    new THREE.Vector3(0.70, 2.34, -1.53),
  ]);
  const handle_gripGeom = new THREE.TubeGeometry(
    handle_gripPath,
    64,
    0.075,
    14,
    false
  );
  const handle_grip = new THREE.Mesh(handle_gripGeom, frameMat);
  handle_grip.name = "handle_grip";
  handle.add(handle_grip);

  const control_bailPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.58, 1.91, -1.31),
    new THREE.Vector3(-0.60, 2.10, -1.43),
    new THREE.Vector3(-0.48, 2.20, -1.50),
    new THREE.Vector3(0.00, 2.22, -1.52),
    new THREE.Vector3(0.48, 2.20, -1.50),
    new THREE.Vector3(0.60, 2.10, -1.43),
    new THREE.Vector3(0.58, 1.91, -1.31),
  ]);
  const control_bailGeom = new THREE.TubeGeometry(
    control_bailPath,
    48,
    0.018,
    8,
    false
  );
  const control_bail = new THREE.Mesh(control_bailGeom, frameMat);
  control_bail.name = "control_bail";
  handle.add(control_bail);

  const control_cablePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.58, 0.82, -0.74),
    new THREE.Vector3(0.62, 1.28, -0.98),
    new THREE.Vector3(0.66, 1.78, -1.26),
    new THREE.Vector3(0.62, 2.04, -1.42),
  ]);
  const control_cableGeom = new THREE.TubeGeometry(
    control_cablePath,
    30,
    0.012,
    7,
    false
  );
  const control_cable = new THREE.Mesh(control_cableGeom, blackMat);
  control_cable.name = "control_cable";
  handle.add(control_cable);

  const handle_pivotGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.035, 18);
  const handle_pivots = new THREE.InstancedMesh(handle_pivotGeom, frameMat, 2);
  handle_pivots.name = "handle_pivots";
  const pivotQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    Math.PI / 2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(side * 0.785, 0.72, -0.70),
      pivotQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    handle_pivots.setMatrixAt(i, matrix);
  }
  handle_pivots.instanceMatrix.needsUpdate = true;
  handle.add(handle_pivots);

  const handle_pivot_boltGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.045, 12);
  const handle_pivot_bolts = new THREE.InstancedMesh(
    handle_pivot_boltGeom,
    silverMat,
    2
  );
  handle_pivot_bolts.name = "handle_pivot_bolts";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(side * 0.807, 0.72, -0.70),
      pivotQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    handle_pivot_bolts.setMatrixAt(i, matrix);
  }
  handle_pivot_bolts.instanceMatrix.needsUpdate = true;
  handle.add(handle_pivot_bolts);

  const control_lever = makeRod(
    new THREE.Vector3(0.61, 1.91, -1.39),
    new THREE.Vector3(0.66, 2.08, -1.49),
    0.025,
    blackMat
  );
  control_lever.name = "control_lever";
  handle.add(control_lever);

  const control_lever_tipGeom = new THREE.SphereGeometry(0.045, 14, 8);
  const control_lever_tip = new THREE.Mesh(control_lever_tipGeom, blackMat);
  control_lever_tip.name = "control_lever_tip";
  control_lever_tip.position.set(0.66, 2.08, -1.49);
  handle.add(control_lever_tip);

  const wheels = new THREE.Group();
  wheels.name = "wheels";
  root.add(wheels);

  const wheelSpecs = [
    { x: -0.88, y: 0.45, z: 0.76, r: 0.43 },
    { x: 0.88, y: 0.45, z: 0.76, r: 0.43 },
    { x: -0.88, y: 0.57, z: -0.74, r: 0.56 },
    { x: 0.88, y: 0.57, z: -0.74, r: 0.56 },
  ];

  const wheel_tireGeom = new THREE.TorusGeometry(0.72, 0.28, 12, 32);
  const wheel_tires = new THREE.InstancedMesh(wheel_tireGeom, rubberMat, 4);
  wheel_tires.name = "wheel_tires";
  const tireQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2
  );
  for (let i = 0; i < wheelSpecs.length; i++) {
    const w = wheelSpecs[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(w.x, w.y, w.z),
      tireQuaternion,
      new THREE.Vector3(w.r, w.r, w.r)
    );
    wheel_tires.setMatrixAt(i, matrix);
  }
  wheel_tires.instanceMatrix.needsUpdate = true;
  wheels.add(wheel_tires);

  const treadCount = 18;
  const wheel_treadGeom = new THREE.BoxGeometry(0.18, 0.12, 0.24);
  const wheel_treads = new THREE.InstancedMesh(
    wheel_treadGeom,
    rubberMat,
    wheelSpecs.length * treadCount
  );
  wheel_treads.name = "wheel_treads";
  let treadIndex = 0;
  for (let wi = 0; wi < wheelSpecs.length; wi++) {
    const w = wheelSpecs[wi];
    for (let ti = 0; ti < treadCount; ti++) {
      const angle = ti / treadCount * Math.PI * 2;
      const radialQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        angle
      );
      const staggerQuaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        (ti % 2 === 0 ? -1 : 1) * 0.28
      );
      radialQuaternion.multiply(staggerQuaternion);
      const radius = w.r * 0.96;
      const matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(
          w.x,
          w.y + Math.cos(angle) * radius,
          w.z + Math.sin(angle) * radius
        ),
        radialQuaternion,
        new THREE.Vector3(w.r, w.r, w.r)
      );
      wheel_treads.setMatrixAt(treadIndex++, matrix);
    }
  }
  wheel_treads.instanceMatrix.needsUpdate = true;
  wheels.add(wheel_treads);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.50, 0.50, 0.18, 28);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, silverMat, 4);
  wheel_hubs.name = "wheel_hubs";
  const hubQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    Math.PI / 2
  );
  for (let i = 0; i < wheelSpecs.length; i++) {
    const w = wheelSpecs[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(w.x, w.y, w.z),
      hubQuaternion,
      new THREE.Vector3(w.r, w.r, w.r)
    );
    wheel_hubs.setMatrixAt(i, matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheels.add(wheel_hubs);

  const wheel_spokeGeom = new THREE.BoxGeometry(0.055, 0.42, 0.085);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokeGeom, silverMat, 20);
  wheel_spokes.name = "wheel_spokes";
  let spokeIndex = 0;
  for (let wi = 0; wi < wheelSpecs.length; wi++) {
    const w = wheelSpecs[wi];
    for (let si = 0; si < 5; si++) {
      const angle = si / 5 * Math.PI * 2;
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        angle
      );
      const radius = w.r * 0.25;
      const matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(
          w.x,
          w.y + Math.cos(angle) * radius,
          w.z + Math.sin(angle) * radius
        ),
        quaternion,
        new THREE.Vector3(w.r, w.r, w.r)
      );
      wheel_spokes.setMatrixAt(spokeIndex++, matrix);
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  wheels.add(wheel_spokes);

  const wheel_center_capGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.22, 18);
  const wheel_center_caps = new THREE.InstancedMesh(
    wheel_center_capGeom,
    brushedMat,
    4
  );
  wheel_center_caps.name = "wheel_center_caps";
  for (let i = 0; i < wheelSpecs.length; i++) {
    const w = wheelSpecs[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(w.x, w.y, w.z),
      hubQuaternion,
      new THREE.Vector3(w.r, w.r, w.r)
    );
    wheel_center_caps.setMatrixAt(i, matrix);
  }
  wheel_center_caps.instanceMatrix.needsUpdate = true;
  wheels.add(wheel_center_caps);

  const wheel_axles = new THREE.Group();
  wheel_axles.name = "wheel_axles";
  const front_axle = makeRod(
    new THREE.Vector3(-0.88, 0.45, 0.76),
    new THREE.Vector3(0.88, 0.45, 0.76),
    0.045,
    frameMat
  );
  front_axle.name = "front_axle";
  wheel_axles.add(front_axle);

  const rear_axle = makeRod(
    new THREE.Vector3(-0.88, 0.57, -0.74),
    new THREE.Vector3(0.88, 0.57, -0.74),
    0.055,
    frameMat
  );
  rear_axle.name = "rear_axle";
  wheel_axles.add(rear_axle);
  wheels.add(wheel_axles);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}