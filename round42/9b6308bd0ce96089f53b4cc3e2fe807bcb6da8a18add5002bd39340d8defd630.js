export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "upholstered_wood_armchair";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const upholstery_group = new THREE.Group();
  upholstery_group.name = "upholstery_group";
  root.add(upholstery_group);

  const seatW = 0.80;
  const seatD = 0.66;
  const seatH = 0.57;
  const cushionH = 0.17;
  const backH = 0.72;
  const backW = 0.76;
  const backD = 0.15;
  const armW = 0;
  const armH = 0;
  const legH = 0.55;
  const module_count = 1;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd8bd95,
    metalness: 0.0,
    roughness: 0.6
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0xbfa17c,
    metalness: 0.0,
    roughness: 0.6
  });

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x9a8d7d,
    metalness: 0.0,
    roughness: 0.95
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x756a5e,
    metalness: 0.0,
    roughness: 0.95
  });

  const creaseMat = new THREE.MeshStandardMaterial({
    color: 0x887c6e,
    metalness: 0.0,
    roughness: 0.95
  });

  const footMat = new THREE.MeshStandardMaterial({
    color: 0x292724,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    return shape;
  }

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: bevel,
      bevelThickness: bevel
    });
    geometry.translate(0, 0, -depth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedLoopXYGeometry(width, height, radius, z, tubeRadius) {
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);
    const points = [
      new THREE.Vector3(-hw + r, -hh, z),
      new THREE.Vector3(hw - r, -hh, z),
      new THREE.Vector3(hw, -hh + r, z),
      new THREE.Vector3(hw, hh - r, z),
      new THREE.Vector3(hw - r, hh, z),
      new THREE.Vector3(-hw + r, hh, z),
      new THREE.Vector3(-hw, hh - r, z),
      new THREE.Vector3(-hw, -hh + r, z)
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 6, true);
  }

  function roundedLoopXZGeometry(width, depth, radius, y, tubeRadius) {
    const hw = width / 2;
    const hd = depth / 2;
    const r = Math.min(radius, hw, hd);
    const points = [
      new THREE.Vector3(-hw + r, y, -hd),
      new THREE.Vector3(hw - r, y, -hd),
      new THREE.Vector3(hw, y, -hd + r),
      new THREE.Vector3(hw, y, hd - r),
      new THREE.Vector3(hw - r, y, hd),
      new THREE.Vector3(-hw + r, y, hd),
      new THREE.Vector3(-hw, y, hd - r),
      new THREE.Vector3(-hw, y, -hd + r)
    ];
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 64, tubeRadius, 6, true);
  }

  function setLegInstance(instancedMesh, index, bottom, top) {
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(bottom, top).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    instancedMesh.setMatrixAt(index, matrix);
  }

  function makeTube(name, points, radius, material, parent) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, 18, radius, 6, false);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const front_legGeom = roundedBoxGeometry(0.085, 1, 0.09, 0.018, 0.006);
  const front_legs = new THREE.InstancedMesh(front_legGeom, woodMat, 2);
  front_legs.name = "front_legs";
  setLegInstance(
    front_legs,
    0,
    new THREE.Vector3(-0.43, 0.018, 0.32),
    new THREE.Vector3(-0.40, legH + 0.02, 0.28)
  );
  setLegInstance(
    front_legs,
    1,
    new THREE.Vector3(0.43, 0.018, 0.32),
    new THREE.Vector3(0.40, legH + 0.02, 0.28)
  );
  front_legs.instanceMatrix.needsUpdate = true;
  frame_group.add(front_legs);

  const rear_legGeom = roundedBoxGeometry(0.085, 1, 0.09, 0.018, 0.006);
  const rear_legs = new THREE.InstancedMesh(rear_legGeom, woodMat, 2);
  rear_legs.name = "rear_legs";
  setLegInstance(
    rear_legs,
    0,
    new THREE.Vector3(-0.43, 0.018, -0.34),
    new THREE.Vector3(-0.40, legH + 0.02, -0.28)
  );
  setLegInstance(
    rear_legs,
    1,
    new THREE.Vector3(0.43, 0.018, -0.34),
    new THREE.Vector3(0.40, legH + 0.02, -0.28)
  );
  rear_legs.instanceMatrix.needsUpdate = true;
  frame_group.add(rear_legs);

  const front_railGeom = roundedBoxGeometry(0.84, 0.13, 0.085, 0.022, 0.008);
  const front_rail = new THREE.Mesh(front_railGeom, woodMat);
  front_rail.name = "front_rail";
  front_rail.position.set(0, 0.50, 0.31);
  frame_group.add(front_rail);

  const rear_railGeom = roundedBoxGeometry(0.84, 0.12, 0.08, 0.02, 0.007);
  const rear_rail = new THREE.Mesh(rear_railGeom, woodMat);
  rear_rail.name = "rear_rail";
  rear_rail.position.set(0, 0.50, -0.29);
  frame_group.add(rear_rail);

  const side_railGeom = roundedBoxGeometry(0.08, 0.12, 0.59, 0.018, 0.007);

  const left_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-0.40, 0.50, 0.005);
  frame_group.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(0.40, 0.50, 0.005);
  frame_group.add(right_side_rail);

  const seat_deckGeom = new THREE.BoxGeometry(0.79, 0.025, 0.58);
  const seat_deck = new THREE.Mesh(seat_deckGeom, woodMat);
  seat_deck.name = "seat_deck";
  seat_deck.position.set(0, seatH - 0.006, 0.015);
  frame_group.add(seat_deck);

  const back_postGeom = roundedBoxGeometry(0.085, 1, 0.09, 0.018, 0.006);
  const back_posts = new THREE.InstancedMesh(back_postGeom, woodMat, 2);
  back_posts.name = "back_posts";
  setLegInstance(
    back_posts,
    0,
    new THREE.Vector3(-0.40, 0.50, -0.28),
    new THREE.Vector3(-0.42, 1.38, -0.405)
  );
  setLegInstance(
    back_posts,
    1,
    new THREE.Vector3(0.40, 0.50, -0.28),
    new THREE.Vector3(0.42, 1.38, -0.405)
  );
  back_posts.instanceMatrix.needsUpdate = true;
  frame_group.add(back_posts);

  const upper_back_railGeom = roundedBoxGeometry(0.82, 0.075, 0.07, 0.018, 0.006);
  const upper_back_rail = new THREE.Mesh(upper_back_railGeom, woodMat);
  upper_back_rail.name = "upper_back_rail";
  upper_back_rail.position.set(0, 1.29, -0.39);
  upper_back_rail.rotation.x = -0.10;
  frame_group.add(upper_back_rail);

  const lower_back_railGeom = roundedBoxGeometry(0.80, 0.065, 0.065, 0.016, 0.005);
  const lower_back_rail = new THREE.Mesh(lower_back_railGeom, woodMat);
  lower_back_rail.name = "lower_back_rail";
  lower_back_rail.position.set(0, 0.81, -0.34);
  lower_back_rail.rotation.x = -0.10;
  frame_group.add(lower_back_rail);

  const foot_padGeom = new THREE.CylinderGeometry(0.032, 0.035, 0.014, 12);
  const foot_pads = new THREE.InstancedMesh(foot_padGeom, footMat, 4);
  foot_pads.name = "foot_pads";
  const foot_positions = [
    new THREE.Vector3(-0.43, 0.008, 0.32),
    new THREE.Vector3(0.43, 0.008, 0.32),
    new THREE.Vector3(-0.43, 0.008, -0.34),
    new THREE.Vector3(0.43, 0.008, -0.34)
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const matrix = new THREE.Matrix4().makeTranslation(
      foot_positions[i].x,
      foot_positions[i].y,
      foot_positions[i].z
    );
    foot_pads.setMatrixAt(i, matrix);
  }
  foot_pads.instanceMatrix.needsUpdate = true;
  frame_group.add(foot_pads);

  const front_rail_grain = new THREE.Group();
  front_rail_grain.name = "front_rail_grain";
  for (let i = 0; i < 4; i++) {
    const y = 0.458 + i * 0.027;
    const points = [];
    for (let j = 0; j < 5; j++) {
      const x = -0.35 + j * 0.175;
      const wave = Math.sin((i + 1) * (j + 2) * 0.8) * 0.0025;
      points.push(new THREE.Vector3(x, y + wave, 0.361));
    }
    makeTube("front_rail_grain_line_" + i, points, 0.0012, wood_grainMat, front_rail_grain);
  }
  frame_group.add(front_rail_grain);

  const seat_cushionGeom = roundedBoxGeometry(
    seatW,
    cushionH,
    seatD,
    0.065,
    0.024
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, seatH + cushionH / 2, 0.035);
  upholstery_group.add(seat_cushion);

  const seat_top_pipingGeom = roundedLoopXZGeometry(
    seatW - 0.035,
    seatD - 0.035,
    0.065,
    cushionH / 2 + 0.029,
    0.0055
  );
  const seat_top_piping = new THREE.Mesh(seat_top_pipingGeom, seamMat);
  seat_top_piping.name = "seat_top_piping";
  seat_cushion.add(seat_top_piping);

  const seat_lower_pipingGeom = roundedLoopXZGeometry(
    seatW - 0.025,
    seatD - 0.025,
    0.06,
    -cushionH / 2 - 0.023,
    0.0045
  );
  const seat_lower_piping = new THREE.Mesh(seat_lower_pipingGeom, seamMat);
  seat_lower_piping.name = "seat_lower_piping";
  seat_cushion.add(seat_lower_piping);

  const seat_front_crease = makeTube(
    "seat_front_crease",
    [
      new THREE.Vector3(-0.025, 0.055, 0.357),
      new THREE.Vector3(0.005, 0.025, 0.360),
      new THREE.Vector3(-0.015, -0.015, 0.360),
      new THREE.Vector3(0.018, -0.055, 0.356)
    ],
    0.0028,
    creaseMat,
    seat_cushion
  );
  seat_front_crease.name = "seat_front_crease";

  const back_cushionGeom = roundedBoxGeometry(
    backW,
    backH,
    backD,
    0.075,
    0.027
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_cushion.position.set(0, 1.04, -0.285);
  back_cushion.rotation.x = -0.10;
  upholstery_group.add(back_cushion);

  const back_pipingGeom = roundedLoopXYGeometry(
    backW - 0.035,
    backH - 0.035,
    0.07,
    backD / 2 + 0.032,
    0.0055
  );
  const back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  back_piping.name = "back_piping";
  back_cushion.add(back_piping);

  const back_crease_left = makeTube(
    "back_crease_left",
    [
      new THREE.Vector3(-0.18, 0.345, 0.108),
      new THREE.Vector3(-0.16, 0.275, 0.111),
      new THREE.Vector3(-0.12, 0.195, 0.112),
      new THREE.Vector3(-0.08, 0.105, 0.109)
    ],
    0.003,
    creaseMat,
    back_cushion
  );

  const back_crease_center = makeTube(
    "back_crease_center",
    [
      new THREE.Vector3(-0.015, 0.345, 0.108),
      new THREE.Vector3(0.015, 0.275, 0.112),
      new THREE.Vector3(-0.005, 0.195, 0.113),
      new THREE.Vector3(0.025, 0.115, 0.109)
    ],
    0.0032,
    creaseMat,
    back_cushion
  );

  const back_crease_right = makeTube(
    "back_crease_right",
    [
      new THREE.Vector3(0.18, 0.335, 0.108),
      new THREE.Vector3(0.15, 0.265, 0.111),
      new THREE.Vector3(0.17, 0.195, 0.111),
      new THREE.Vector3(0.12, 0.125, 0.108)
    ],
    0.0028,
    creaseMat,
    back_cushion
  );

  const back_crease_lower_left = makeTube(
    "back_crease_lower_left",
    [
      new THREE.Vector3(-0.31, -0.305, 0.106),
      new THREE.Vector3(-0.24, -0.275, 0.111),
      new THREE.Vector3(-0.18, -0.225, 0.112),
      new THREE.Vector3(-0.13, -0.155, 0.108)
    ],
    0.0026,
    creaseMat,
    back_cushion
  );

  const back_crease_lower_center = makeTube(
    "back_crease_lower_center",
    [
      new THREE.Vector3(0.01, -0.335, 0.106),
      new THREE.Vector3(-0.015, -0.275, 0.111),
      new THREE.Vector3(0.025, -0.215, 0.112),
      new THREE.Vector3(0.005, -0.145, 0.108)
    ],
    0.0027,
    creaseMat,
    back_cushion
  );

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