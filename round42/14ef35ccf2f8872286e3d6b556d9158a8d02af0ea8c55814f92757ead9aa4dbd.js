export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "velvet_loveseat";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  const cushion_group = new THREE.Group();
  cushion_group.name = "cushion_group";
  const leg_group = new THREE.Group();
  leg_group.name = "leg_group";
  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  root.add(frame_group, cushion_group, leg_group, detail_group);

  const seatW = 2.02;
  const seatD = 1.08;
  const seatH = 0.68;
  const cushionH = 0.27;
  const backH = 1.18;
  const armW = 0.38;
  const armH = 1.24;
  const legH = 0.42;
  const moduleCount = 2;
  const cushionGap = 0.04;
  const moduleW = (seatW - cushionGap) / moduleCount;

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x6f5a4b,
    metalness: 0.0,
    roughness: 0.95
  });
  const cushionMat = new THREE.MeshStandardMaterial({
    color: 0x765f4e,
    metalness: 0.0,
    roughness: 0.95
  });
  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0x715948,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x49382f,
    metalness: 0.0,
    roughness: 0.95
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x5a3527,
    metalness: 0.0,
    roughness: 0.6
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const shapeW = Math.max(0.02, width - bevel * 2);
    const shapeH = Math.max(0.02, height - bevel * 2);
    const coreDepth = Math.max(0.02, depth - bevel * 2);
    const r = Math.max(
      0.01,
      Math.min(radius - bevel, shapeW * 0.5 - 0.001, shapeH * 0.5 - 0.001)
    );
    const x0 = -shapeW * 0.5;
    const x1 = shapeW * 0.5;
    const y0 = -shapeH * 0.5;
    const y1 = shapeH * 0.5;

    const shape = new THREE.Shape();
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: coreDepth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -coreDepth * 0.5);
    return geometry;
  }

  function roundedRectXYPoints(width, height, radius, z) {
    const points = [];
    const corners = [
      [width * 0.5 - radius, height * 0.5 - radius, 0],
      [-width * 0.5 + radius, height * 0.5 - radius, Math.PI * 0.5],
      [-width * 0.5 + radius, -height * 0.5 + radius, Math.PI],
      [width * 0.5 - radius, -height * 0.5 + radius, Math.PI * 1.5]
    ];
    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= 5; i++) {
        const angle = corner[2] + i / 5 * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return points;
  }

  function roundedRectXZPoints(width, depth, radius, y) {
    const points = [];
    const corners = [
      [width * 0.5 - radius, depth * 0.5 - radius, 0],
      [-width * 0.5 + radius, depth * 0.5 - radius, Math.PI * 0.5],
      [-width * 0.5 + radius, -depth * 0.5 + radius, Math.PI],
      [width * 0.5 - radius, -depth * 0.5 + radius, Math.PI * 1.5]
    ];
    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= 5; i++) {
        const angle = corner[2] + i / 5 * Math.PI * 0.5;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function pipingGeometry(points, radius, segments) {
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, segments, radius, 6, true);
  }

  function addWrinkle(parent, points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const wrinkle = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 10, radius, 5, false),
      seamMat
    );
    parent.add(wrinkle);
    return wrinkle;
  }

  const front_apronGeom = roundedBoxGeometry(2.18, 0.52, 1.18, 0.10, 0.035);
  const front_apron = new THREE.Mesh(front_apronGeom, velvetMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.46, 0.03);
  frame_group.add(front_apron);

  const seat_deckGeom = roundedBoxGeometry(2.10, 0.14, 1.14, 0.07, 0.025);
  const seat_deck = new THREE.Mesh(seat_deckGeom, velvetMat);
  seat_deck.name = "seat_deck";
  seat_deck.position.set(0, 0.72, 0.02);
  frame_group.add(seat_deck);

  const back_frameGeom = roundedBoxGeometry(2.30, backH, 0.24, 0.13, 0.035);
  const back_frame = new THREE.Mesh(back_frameGeom, velvetMat);
  back_frame.name = "back_frame";
  back_frame.position.set(0, 1.24, -0.56);
  frame_group.add(back_frame);

  const arm_panelGeom = roundedBoxGeometry(armW, 1.02, 1.30, 0.15, 0.045);

  const left_arm_panel = new THREE.Mesh(arm_panelGeom, velvetMat);
  left_arm_panel.name = "left_arm_panel";
  left_arm_panel.position.set(-1.19, 0.84, 0);
  frame_group.add(left_arm_panel);

  const right_arm_panel = new THREE.Mesh(arm_panelGeom, velvetMat);
  right_arm_panel.name = "right_arm_panel";
  right_arm_panel.position.set(1.19, 0.84, 0);
  frame_group.add(right_arm_panel);

  const arm_rollGeom = new THREE.CapsuleGeometry(0.20, 0.92, 8, 18);

  const left_arm_roll = new THREE.Mesh(arm_rollGeom, cushionMat);
  left_arm_roll.name = "left_arm_roll";
  left_arm_roll.rotation.x = Math.PI * 0.5;
  left_arm_roll.position.set(-1.19, 1.20, 0);
  frame_group.add(left_arm_roll);

  const right_arm_roll = new THREE.Mesh(arm_rollGeom, cushionMat);
  right_arm_roll.name = "right_arm_roll";
  right_arm_roll.rotation.x = Math.PI * 0.5;
  right_arm_roll.position.set(1.19, 1.20, 0);
  frame_group.add(right_arm_roll);

  const seat_cushionGeom = roundedBoxGeometry(
    moduleW,
    cushionH,
    seatD,
    0.13,
    0.045
  );
  const seatCenterX = moduleW * 0.5 + cushionGap * 0.5;

  const left_seat_cushion = new THREE.Mesh(seat_cushionGeom, cushionMat);
  left_seat_cushion.name = "left_seat_cushion";
  left_seat_cushion.position.set(-seatCenterX, seatH + cushionH * 0.5, 0.08);
  cushion_group.add(left_seat_cushion);

  const right_seat_cushion = new THREE.Mesh(seat_cushionGeom, cushionMat);
  right_seat_cushion.name = "right_seat_cushion";
  right_seat_cushion.position.set(seatCenterX, seatH + cushionH * 0.5, 0.08);
  cushion_group.add(right_seat_cushion);

  const seat_top_pipingGeom = pipingGeometry(
    roundedRectXZPoints(moduleW - 0.055, seatD - 0.055, 0.11, 0),
    0.012,
    72
  );

  const left_seat_top_piping = new THREE.Mesh(seat_top_pipingGeom, seamMat);
  left_seat_top_piping.name = "left_seat_top_piping";
  left_seat_top_piping.position.set(
    -seatCenterX,
    seatH + cushionH - 0.012,
    0.08
  );
  detail_group.add(left_seat_top_piping);

  const right_seat_top_piping = new THREE.Mesh(seat_top_pipingGeom, seamMat);
  right_seat_top_piping.name = "right_seat_top_piping";
  right_seat_top_piping.position.set(
    seatCenterX,
    seatH + cushionH - 0.012,
    0.08
  );
  detail_group.add(right_seat_top_piping);

  const seat_front_pipingGeom = pipingGeometry(
    roundedRectXYPoints(moduleW - 0.05, cushionH - 0.05, 0.085, 0),
    0.011,
    64
  );

  const left_seat_front_piping = new THREE.Mesh(seat_front_pipingGeom, seamMat);
  left_seat_front_piping.name = "left_seat_front_piping";
  left_seat_front_piping.position.set(
    -seatCenterX,
    seatH + cushionH * 0.5,
    0.08 + seatD * 0.5 + 0.006
  );
  detail_group.add(left_seat_front_piping);

  const right_seat_front_piping = new THREE.Mesh(seat_front_pipingGeom, seamMat);
  right_seat_front_piping.name = "right_seat_front_piping";
  right_seat_front_piping.position.set(
    seatCenterX,
    seatH + cushionH * 0.5,
    0.08 + seatD * 0.5 + 0.006
  );
  detail_group.add(right_seat_front_piping);

  const seat_center_seamGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    seatD - 0.16,
    8
  );
  const seat_center_seam = new THREE.Mesh(seat_center_seamGeom, seamMat);
  seat_center_seam.name = "seat_center_seam";
  seat_center_seam.rotation.x = Math.PI * 0.5;
  seat_center_seam.position.set(
    0,
    seatH + cushionH + 0.002,
    0.05
  );
  detail_group.add(seat_center_seam);

  const back_cushionGeom = roundedBoxGeometry(1.01, 0.94, 0.27, 0.15, 0.05);

  const left_back_cushion = new THREE.Mesh(back_cushionGeom, cushionMat);
  left_back_cushion.name = "left_back_cushion";
  left_back_cushion.position.set(-0.52, 1.31, -0.39);
  left_back_cushion.rotation.set(-0.08, 0, 0.018);
  cushion_group.add(left_back_cushion);

  const right_back_cushion = new THREE.Mesh(back_cushionGeom, cushionMat);
  right_back_cushion.name = "right_back_cushion";
  right_back_cushion.position.set(0.52, 1.31, -0.39);
  right_back_cushion.rotation.set(-0.08, 0, -0.018);
  cushion_group.add(right_back_cushion);

  const back_pipingGeom = pipingGeometry(
    roundedRectXYPoints(0.96, 0.89, 0.12, 0),
    0.010,
    64
  );

  const left_back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  left_back_piping.name = "left_back_piping";
  left_back_piping.position.z = 0.143;
  left_back_cushion.add(left_back_piping);

  const right_back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  right_back_piping.name = "right_back_piping";
  right_back_piping.position.z = 0.143;
  right_back_cushion.add(right_back_piping);

  const back_center_seamGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.72,
    8
  );
  const back_center_seam = new THREE.Mesh(back_center_seamGeom, seamMat);
  back_center_seam.name = "back_center_seam";
  back_center_seam.position.set(0, 1.31, -0.245);
  back_center_seam.rotation.x = -0.08;
  detail_group.add(back_center_seam);

  const throw_pillowGeom = roundedBoxGeometry(0.78, 0.88, 0.25, 0.15, 0.05);
  const pillow_pipingGeom = pipingGeometry(
    roundedRectXYPoints(0.73, 0.83, 0.12, 0),
    0.010,
    64
  );

  const left_throw_pillow = new THREE.Mesh(throw_pillowGeom, pillowMat);
  left_throw_pillow.name = "left_throw_pillow";
  left_throw_pillow.position.set(-0.73, 1.39, -0.13);
  left_throw_pillow.rotation.set(-0.10, -0.04, 0.11);
  cushion_group.add(left_throw_pillow);

  const left_pillow_piping = new THREE.Mesh(pillow_pipingGeom, seamMat);
  left_pillow_piping.name = "left_pillow_piping";
  left_pillow_piping.position.z = 0.132;
  left_throw_pillow.add(left_pillow_piping);

  const left_pillow_wrinkles = new THREE.Group();
  left_pillow_wrinkles.name = "left_pillow_wrinkles";
  left_throw_pillow.add(left_pillow_wrinkles);
  addWrinkle(left_pillow_wrinkles, [
    new THREE.Vector3(-0.31, -0.39, 0.136),
    new THREE.Vector3(-0.25, -0.33, 0.138),
    new THREE.Vector3(-0.16, -0.29, 0.136)
  ], 0.006);
  addWrinkle(left_pillow_wrinkles, [
    new THREE.Vector3(0.31, -0.39, 0.136),
    new THREE.Vector3(0.25, -0.33, 0.138),
    new THREE.Vector3(0.16, -0.29, 0.136)
  ], 0.006);
  addWrinkle(left_pillow_wrinkles, [
    new THREE.Vector3(-0.35, 0.38, 0.136),
    new THREE.Vector3(-0.28, 0.33, 0.138),
    new THREE.Vector3(-0.20, 0.29, 0.136)
  ], 0.005);

  const right_throw_pillow = new THREE.Mesh(throw_pillowGeom, pillowMat);
  right_throw_pillow.name = "right_throw_pillow";
  right_throw_pillow.position.set(0.73, 1.39, -0.11);
  right_throw_pillow.rotation.set(-0.10, 0.04, -0.12);
  cushion_group.add(right_throw_pillow);

  const right_pillow_piping = new THREE.Mesh(pillow_pipingGeom, seamMat);
  right_pillow_piping.name = "right_pillow_piping";
  right_pillow_piping.position.z = 0.132;
  right_throw_pillow.add(right_pillow_piping);

  const right_pillow_wrinkles = new THREE.Group();
  right_pillow_wrinkles.name = "right_pillow_wrinkles";
  right_throw_pillow.add(right_pillow_wrinkles);
  addWrinkle(right_pillow_wrinkles, [
    new THREE.Vector3(-0.31, -0.39, 0.136),
    new THREE.Vector3(-0.25, -0.33, 0.138),
    new THREE.Vector3(-0.16, -0.29, 0.136)
  ], 0.006);
  addWrinkle(right_pillow_wrinkles, [
    new THREE.Vector3(0.31, -0.39, 0.136),
    new THREE.Vector3(0.25, -0.33, 0.138),
    new THREE.Vector3(0.16, -0.29, 0.136)
  ], 0.006);
  addWrinkle(right_pillow_wrinkles, [
    new THREE.Vector3(0.35, 0.38, 0.136),
    new THREE.Vector3(0.28, 0.33, 0.138),
    new THREE.Vector3(0.20, 0.29, 0.136)
  ], 0.005);

  const arm_front_pipingGeom = pipingGeometry(
    roundedRectXYPoints(armW - 0.045, 0.91, 0.11, 0),
    0.011,
    64
  );

  const left_arm_front_piping = new THREE.Mesh(arm_front_pipingGeom, seamMat);
  left_arm_front_piping.name = "left_arm_front_piping";
  left_arm_front_piping.position.set(-1.19, 0.84, 0.656);
  detail_group.add(left_arm_front_piping);

  const right_arm_front_piping = new THREE.Mesh(arm_front_pipingGeom, seamMat);
  right_arm_front_piping.name = "right_arm_front_piping";
  right_arm_front_piping.position.set(1.19, 0.84, 0.656);
  detail_group.add(right_arm_front_piping);

  const arm_top_pipingGeom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    1.03,
    8
  );

  const left_arm_top_piping = new THREE.Mesh(arm_top_pipingGeom, seamMat);
  left_arm_top_piping.name = "left_arm_top_piping";
  left_arm_top_piping.rotation.x = Math.PI * 0.5;
  left_arm_top_piping.position.set(-1.02, 1.30, 0);
  detail_group.add(left_arm_top_piping);

  const right_arm_top_piping = new THREE.Mesh(arm_top_pipingGeom, seamMat);
  right_arm_top_piping.name = "right_arm_top_piping";
  right_arm_top_piping.rotation.x = Math.PI * 0.5;
  right_arm_top_piping.position.set(1.02, 1.30, 0);
  detail_group.add(right_arm_top_piping);

  const front_apron_pipingGeom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    2.04,
    8
  );
  const front_apron_piping = new THREE.Mesh(front_apron_pipingGeom, seamMat);
  front_apron_piping.name = "front_apron_piping";
  front_apron_piping.rotation.z = Math.PI * 0.5;
  front_apron_piping.position.set(0, 0.705, 0.626);
  detail_group.add(front_apron_piping);

  const turned_legsProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.08, 0.00),
    new THREE.Vector2(0.11, 0.03),
    new THREE.Vector2(0.12, 0.08),
    new THREE.Vector2(0.10, 0.13),
    new THREE.Vector2(0.09, 0.16),
    new THREE.Vector2(0.13, 0.20),
    new THREE.Vector2(0.14, 0.25),
    new THREE.Vector2(0.12, 0.30),
    new THREE.Vector2(0.10, 0.33),
    new THREE.Vector2(0.14, 0.36),
    new THREE.Vector2(0.14, 0.39),
    new THREE.Vector2(0.00, 0.40)
  ];
  const turned_legsGeom = new THREE.LatheGeometry(turned_legsProfile, 24);
  const turned_legs = new THREE.InstancedMesh(turned_legsGeom, woodMat, 4);
  turned_legs.name = "turned_legs";

  const leg_positions = [
    [-1.06, 0, 0.49],
    [1.06, 0, 0.49],
    [-1.06, 0, -0.47],
    [1.06, 0, -0.47]
  ];
  const leg_dummy = new THREE.Object3D();
  for (let i = 0; i < leg_positions.length; i++) {
    leg_dummy.position.set(
      leg_positions[i][0],
      leg_positions[i][1],
      leg_positions[i][2]
    );
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    turned_legs.setMatrixAt(i, leg_dummy.matrix);
  }
  turned_legs.instanceMatrix.needsUpdate = true;
  leg_group.add(turned_legs);

  const leg_mountsGeom = new THREE.CylinderGeometry(0.13, 0.12, 0.10, 20);
  const leg_mounts = new THREE.InstancedMesh(leg_mountsGeom, woodMat, 4);
  leg_mounts.name = "leg_mounts";
  for (let i = 0; i < leg_positions.length; i++) {
    leg_dummy.position.set(
      leg_positions[i][0],
      legH - 0.02,
      leg_positions[i][2]
    );
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    leg_mounts.setMatrixAt(i, leg_dummy.matrix);
  }
  leg_mounts.instanceMatrix.needsUpdate = true;
  leg_group.add(leg_mounts);

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

  fitToUnitCube(root);
  return root;
}