export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "walnut_dining_set";

  const tableW = 2.4;
  const tableD = 1.45;
  const tableTopY = 1.25;
  const tableTopThickness = 0.12;

  const seatW = 0.58;
  const seatD = 0.5;
  const seatH = 0.72;
  const cushionH = 0.075;
  const backH = 0.78;
  const armW = 0;
  const armH = 0;
  const legH = 0.65;
  const moduleCount = 6;

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x8b4b27,
    metalness: 0.0,
    roughness: 0.6
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x6f351b,
    metalness: 0.0,
    roughness: 0.6
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x7d3c1b,
    metalness: 0.0,
    roughness: 0.6
  });
  const seat_cushionMat = new THREE.MeshStandardMaterial({
    color: 0x542716,
    metalness: 0.0,
    roughness: 0.7
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x32160d,
    metalness: 0.0,
    roughness: 0.7
  });
  const grainMat = new THREE.LineBasicMaterial({
    color: 0x4b2112,
    transparent: true,
    opacity: 0.34
  });

  function createRoundedShape(width, height, radius) {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const r = Math.min(radius, halfW, halfH);
    const shape = new THREE.Shape();
    shape.moveTo(-halfW + r, -halfH);
    shape.lineTo(halfW - r, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + r);
    shape.lineTo(halfW, halfH - r);
    shape.quadraticCurveTo(halfW, halfH, halfW - r, halfH);
    shape.lineTo(-halfW + r, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - r);
    shape.lineTo(-halfW, -halfH + r);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + r, -halfH);
    shape.closePath();
    return shape;
  }

  function createRoundedHorizontalGeometry(width, depth, thickness, radius, bevel) {
    const shape = createRoundedShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8
    });
    geometry.center();
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function createRoundedVerticalGeometry(width, height, depth, radius, bevel) {
    const shape = createRoundedShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8
    });
    geometry.center();
    return geometry;
  }

  function createCurvedRailGeometry(width, height, depth, arch, bevel) {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(-halfW, -halfH);
    shape.bezierCurveTo(
      -width * 0.2,
      -halfH + arch,
      width * 0.2,
      -halfH + arch,
      halfW,
      -halfH
    );
    shape.lineTo(halfW, halfH);
    shape.bezierCurveTo(
      width * 0.2,
      halfH + arch,
      -width * 0.2,
      halfH + arch,
      -halfW,
      halfH
    );
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 12
    });
    geometry.center();
    return geometry;
  }

  function createCurvedTubeGeometry(width, height, depth, arch, radius) {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-halfW, -halfH, depth),
      new THREE.Vector3(-width * 0.25, -halfH + arch * 0.8, depth),
      new THREE.Vector3(0, -halfH + arch, depth),
      new THREE.Vector3(width * 0.25, -halfH + arch * 0.8, depth),
      new THREE.Vector3(halfW, -halfH, depth)
    ]);
    return new THREE.TubeGeometry(path, 24, radius, 8, false);
  }

  function createTaperedPostGeometry(topWidth, bottomWidth, height, depth) {
    const halfH = height * 0.5;
    const topHalf = topWidth * 0.5;
    const bottomHalf = bottomWidth * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(-bottomHalf, -halfH);
    shape.lineTo(bottomHalf, -halfH);
    shape.lineTo(topHalf, halfH);
    shape.lineTo(-topHalf, halfH);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2
    });
    geometry.center();
    return geometry;
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

  const table = new THREE.Group();
  table.name = "table";
  root.add(table);

  const tabletopGeom = createRoundedHorizontalGeometry(
    tableW,
    tableD,
    tableTopThickness,
    0.085,
    0.015
  );
  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.position.y = tableTopY;
  table.add(tabletop);

  const tabletop_front_edgeGeom = new THREE.BoxGeometry(
    tableW - 0.08,
    0.065,
    0.035
  );
  const tabletop_front_edge = new THREE.Mesh(
    tabletop_front_edgeGeom,
    edgeMat
  );
  tabletop_front_edge.name = "tabletop_front_edge";
  tabletop_front_edge.position.set(
    0,
    tableTopY - 0.025,
    tableD * 0.5 - 0.012
  );
  table.add(tabletop_front_edge);

  const tabletop_back_edge = new THREE.Mesh(
    tabletop_front_edgeGeom,
    edgeMat
  );
  tabletop_back_edge.name = "tabletop_back_edge";
  tabletop_back_edge.position.set(
    0,
    tableTopY - 0.025,
    -tableD * 0.5 + 0.012
  );
  table.add(tabletop_back_edge);

  const tabletop_side_edgeGeom = new THREE.BoxGeometry(
    0.035,
    0.065,
    tableD - 0.08
  );
  const tabletop_left_edge = new THREE.Mesh(
    tabletop_side_edgeGeom,
    edgeMat
  );
  tabletop_left_edge.name = "tabletop_left_edge";
  tabletop_left_edge.position.set(
    -tableW * 0.5 + 0.012,
    tableTopY - 0.025,
    0
  );
  table.add(tabletop_left_edge);

  const tabletop_right_edge = new THREE.Mesh(
    tabletop_side_edgeGeom,
    edgeMat
  );
  tabletop_right_edge.name = "tabletop_right_edge";
  tabletop_right_edge.position.set(
    tableW * 0.5 - 0.012,
    tableTopY - 0.025,
    0
  );
  table.add(tabletop_right_edge);

  const table_legGeom = new THREE.CylinderGeometry(
    0.115,
    0.135,
    1.1,
    4
  );
  const table_legs = new THREE.InstancedMesh(
    table_legGeom,
    frameMat,
    4
  );
  table_legs.name = "table_legs";
  const tableLegPositions = [
    [-0.98, 0.57, -0.55],
    [0.98, 0.57, -0.55],
    [-0.98, 0.57, 0.55],
    [0.98, 0.57, 0.55]
  ];
  for (let i = 0; i < tableLegPositions.length; i++) {
    const position = tableLegPositions[i];
    setInstance(
      table_legs,
      i,
      position[0],
      position[1],
      position[2],
      0,
      Math.PI / 4,
      0
    );
  }
  table_legs.instanceMatrix.needsUpdate = true;
  table.add(table_legs);

  const table_long_apronGeom = new THREE.BoxGeometry(
    2.08,
    0.18,
    0.065
  );
  const table_front_apron = new THREE.Mesh(
    table_long_apronGeom,
    frameMat
  );
  table_front_apron.name = "table_front_apron";
  table_front_apron.position.set(0, 1.09, 0.625);
  table.add(table_front_apron);

  const table_back_apron = new THREE.Mesh(
    table_long_apronGeom,
    frameMat
  );
  table_back_apron.name = "table_back_apron";
  table_back_apron.position.set(0, 1.09, -0.625);
  table.add(table_back_apron);

  const table_side_apronGeom = new THREE.BoxGeometry(
    0.065,
    0.18,
    1.13
  );
  const table_left_apron = new THREE.Mesh(
    table_side_apronGeom,
    frameMat
  );
  table_left_apron.name = "table_left_apron";
  table_left_apron.position.set(-1.035, 1.09, 0);
  table.add(table_left_apron);

  const table_right_apron = new THREE.Mesh(
    table_side_apronGeom,
    frameMat
  );
  table_right_apron.name = "table_right_apron";
  table_right_apron.position.set(1.035, 1.09, 0);
  table.add(table_right_apron);

  const tabletop_grain_points = [];
  const grainRows = 18;
  const grainSegments = 11;
  for (let row = 0; row < grainRows; row++) {
    const baseZ =
      -tableD * 0.5 +
      0.09 +
      row * (tableD - 0.18) / (grainRows - 1);
    for (let segment = 0; segment < grainSegments; segment++) {
      const x0 =
        -tableW * 0.5 +
        0.09 +
        segment * (tableW - 0.18) / grainSegments;
      const x1 =
        -tableW * 0.5 +
        0.09 +
        (segment + 1) * (tableW - 0.18) / grainSegments;
      const z0 =
        baseZ + Math.sin(row * 1.71 + segment * 0.83) * 0.008;
      const z1 =
        baseZ +
        Math.sin(row * 1.71 + (segment + 1) * 0.83) * 0.008;
      tabletop_grain_points.push(
        new THREE.Vector3(x0, tableTopY + 0.078, z0),
        new THREE.Vector3(x1, tableTopY + 0.078, z1)
      );
    }
  }
  const tabletop_grainGeom = new THREE.BufferGeometry().setFromPoints(
    tabletop_grain_points
  );
  const tabletop_grain = new THREE.LineSegments(
    tabletop_grainGeom,
    grainMat
  );
  tabletop_grain.name = "tabletop_grain";
  table.add(tabletop_grain);

  const chair_front_legGeom = createTaperedPostGeometry(
    0.066,
    0.047,
    legH,
    0.058
  );
  const chair_back_postGeom = createTaperedPostGeometry(
    0.086,
    0.062,
    seatH + backH,
    0.072
  );
  const chair_back_slatGeom = createRoundedVerticalGeometry(
    0.044,
    0.47,
    0.032,
    0.012,
    0.003
  );
  const chair_seat_baseGeom = new THREE.BoxGeometry(
    seatW - 0.02,
    0.075,
    seatD - 0.02
  );
  const chair_seat_cushionGeom = createRoundedHorizontalGeometry(
    seatW - 0.05,
    seatD - 0.05,
    cushionH,
    0.065,
    0.012
  );
  const chair_front_railGeom = new THREE.BoxGeometry(
    seatW - 0.05,
    0.12,
    0.06
  );
  const chair_side_railGeom = new THREE.BoxGeometry(
    0.06,
    0.12,
    seatD - 0.1
  );
  const chair_lower_back_railGeom = createCurvedRailGeometry(
    seatW - 0.09,
    0.09,
    0.05,
    0.025,
    0.006
  );
  const chair_top_railGeom = createCurvedRailGeometry(
    seatW - 0.02,
    0.17,
    0.065,
    0.035,
    0.008
  );
  const chair_top_rail_roundGeom = createCurvedTubeGeometry(
    seatW - 0.02,
    0.17,
    0.039,
    0.035,
    0.012
  );
  const chair_lower_rail_roundGeom = createCurvedTubeGeometry(
    seatW - 0.09,
    0.09,
    0.031,
    0.025,
    0.008
  );
  const chair_pipingGeom = createCurvedTubeGeometry(
    seatW - 0.1,
    seatD - 0.1,
    0,
    0.095,
    0.006
  );
  chair_pipingGeom.rotateX(Math.PI / 2);

  function createChair(id) {
    const chair = new THREE.Group();
    chair.name = id;

    const seat_base = new THREE.Mesh(
      chair_seat_baseGeom,
      frameMat
    );
    seat_base.name = id + "_seat_base";
    seat_base.position.set(0, seatH - 0.0375, 0.01);
    chair.add(seat_base);

    const seat_cushion = new THREE.Mesh(
      chair_seat_cushionGeom,
      seat_cushionMat
    );
    seat_cushion.name = id + "_seat_cushion";
    seat_cushion.position.set(0, seatH + cushionH * 0.5, 0.015);
    chair.add(seat_cushion);

    const seat_piping = new THREE.Mesh(
      chair_pipingGeom,
      seamMat
    );
    seat_piping.name = id + "_seat_piping";
    seat_piping.position.set(0, seatH + cushionH + 0.014, 0.015);
    chair.add(seat_piping);

    const front_seat_rail = new THREE.Mesh(
      chair_front_railGeom,
      frameMat
    );
    front_seat_rail.name = id + "_front_seat_rail";
    front_seat_rail.position.set(
      0,
      seatH - 0.075,
      seatD * 0.5 - 0.025
    );
    chair.add(front_seat_rail);

    const rear_seat_rail = new THREE.Mesh(
      chair_front_railGeom,
      frameMat
    );
    rear_seat_rail.name = id + "_rear_seat_rail";
    rear_seat_rail.position.set(
      0,
      seatH - 0.075,
      -seatD * 0.5 + 0.025
    );
    chair.add(rear_seat_rail);

    const side_seat_rails = new THREE.InstancedMesh(
      chair_side_railGeom,
      frameMat,
      2
    );
    side_seat_rails.name = id + "_side_seat_rails";
    setInstance(
      side_seat_rails,
      0,
      -seatW * 0.5 + 0.03,
      seatH - 0.075,
      0
    );
    setInstance(
      side_seat_rails,
      1,
      seatW * 0.5 - 0.03,
      seatH - 0.075,
      0
    );
    side_seat_rails.instanceMatrix.needsUpdate = true;
    chair.add(side_seat_rails);

    const front_legs = new THREE.InstancedMesh(
      chair_front_legGeom,
      frameMat,
      2
    );
    front_legs.name = id + "_front_legs";
    setInstance(
      front_legs,
      0,
      -seatW * 0.4,
      legH * 0.5,
      seatD * 0.39,
      -0.045,
      0,
      -0.04
    );
    setInstance(
      front_legs,
      1,
      seatW * 0.4,
      legH * 0.5,
      seatD * 0.39,
      -0.045,
      0,
      0.04
    );
    front_legs.instanceMatrix.needsUpdate = true;
    chair.add(front_legs);

    const back_posts = new THREE.InstancedMesh(
      chair_back_postGeom,
      frameMat,
      2
    );
    back_posts.name = id + "_back_posts";
    setInstance(
      back_posts,
      0,
      -seatW * 0.43,
      (seatH + backH) * 0.5,
      -seatD * 0.4,
      -0.045,
      0,
      -0.025
    );
    setInstance(
      back_posts,
      1,
      seatW * 0.43,
      (seatH + backH) * 0.5,
      -seatD * 0.4,
      -0.045,
      0,
      0.025
    );
    back_posts.instanceMatrix.needsUpdate = true;
    chair.add(back_posts);

    const back_slats = new THREE.InstancedMesh(
      chair_back_slatGeom,
      frameMat,
      5
    );
    back_slats.name = id + "_back_slats";
    for (let i = 0; i < 5; i++) {
      const x = (i - 2) * 0.09;
      setInstance(
        back_slats,
        i,
        x,
        1.11,
        -seatD * 0.405,
        -0.045,
        0,
        -x * 0.18
      );
    }
    back_slats.instanceMatrix.needsUpdate = true;
    chair.add(back_slats);

    const lower_back_rail = new THREE.Mesh(
      chair_lower_back_railGeom,
      frameMat
    );
    lower_back_rail.name = id + "_lower_back_rail";
    lower_back_rail.position.set(
      0,
      0.91,
      -seatD * 0.405
    );
    chair.add(lower_back_rail);

    const lower_back_rail_round = new THREE.Mesh(
      chair_lower_rail_roundGeom,
      edgeMat
    );
    lower_back_rail_round.name = id + "_lower_back_rail_round";
    lower_back_rail_round.position.set(
      0,
      0.91,
      -seatD * 0.405
    );
    chair.add(lower_back_rail_round);

    const top_back_rail = new THREE.Mesh(
      chair_top_railGeom,
      frameMat
    );
    top_back_rail.name = id + "_top_back_rail";
    top_back_rail.position.set(
      0,
      seatH + backH - 0.09,
      -seatD * 0.405
    );
    chair.add(top_back_rail);

    const top_back_rail_round = new THREE.Mesh(
      chair_top_rail_roundGeom,
      edgeMat
    );
    top_back_rail_round.name = id + "_top_back_rail_round";
    top_back_rail_round.position.set(
      0,
      seatH + backH - 0.09,
      -seatD * 0.405
    );
    chair.add(top_back_rail_round);

    void armW;
    void armH;
    return chair;
  }

  const chair_front_left = createChair("chair_front_left");
  chair_front_left.position.set(-0.64, 0, 1.03);
  chair_front_left.rotation.y = Math.PI;
  root.add(chair_front_left);

  const chair_front_right = createChair("chair_front_right");
  chair_front_right.position.set(0.64, 0, 1.03);
  chair_front_right.rotation.y = Math.PI;
  root.add(chair_front_right);

  const chair_back_left = createChair("chair_back_left");
  chair_back_left.position.set(-0.64, 0, -1.03);
  root.add(chair_back_left);

  const chair_back_right = createChair("chair_back_right");
  chair_back_right.position.set(0.64, 0, -1.03);
  root.add(chair_back_right);

  const chair_left_side = createChair("chair_left_side");
  chair_left_side.position.set(-1.45, 0, 0);
  chair_left_side.rotation.y = Math.PI / 2;
  root.add(chair_left_side);

  const chair_right_side = createChair("chair_right_side");
  chair_right_side.position.set(1.45, 0, 0);
  chair_right_side.rotation.y = -Math.PI / 2;
  root.add(chair_right_side);

  void moduleCount;

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}