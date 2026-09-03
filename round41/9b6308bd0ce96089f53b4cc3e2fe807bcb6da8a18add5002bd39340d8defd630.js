export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "upholstered_wood_armchair";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const upholstery_group = new THREE.Group();
  upholstery_group.name = "upholstery_group";
  root.add(upholstery_group);

  const seatW = 1.08;
  const seatD = 0.94;
  const seatH = 0.96;
  const cushionH = 0.20;
  const backH = 1.02;
  const armW = 0;
  const armH = 0;
  const legH = 0.88;
  const moduleCount = 1;
  const frameW = 1.20;
  const frameD = 1.04;
  const backCushionW = 1.08;
  const backCushionD = 0.19;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd8b98c,
    metalness: 0.0,
    roughness: 0.6
  });

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x9b8e7d,
    metalness: 0.0,
    roughness: 0.95
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x74695d,
    metalness: 0.0,
    roughness: 0.95
  });

  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x24211e,
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
    shape.closePath();
    return shape;
  }

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -depth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedLoopXZ(width, depth, y, radius) {
    const hw = width / 2;
    const hd = depth / 2;
    return [
      new THREE.Vector3(-hw + radius, y, hd),
      new THREE.Vector3(hw - radius, y, hd),
      new THREE.Vector3(hw, y, hd - radius),
      new THREE.Vector3(hw, y, -hd + radius),
      new THREE.Vector3(hw - radius, y, -hd),
      new THREE.Vector3(-hw + radius, y, -hd),
      new THREE.Vector3(-hw, y, -hd + radius),
      new THREE.Vector3(-hw, y, hd - radius)
    ];
  }

  function roundedLoopXY(width, height, z, radius) {
    const hw = width / 2;
    const hh = height / 2;
    return [
      new THREE.Vector3(-hw + radius, -hh, z),
      new THREE.Vector3(hw - radius, -hh, z),
      new THREE.Vector3(hw, -hh + radius, z),
      new THREE.Vector3(hw, hh - radius, z),
      new THREE.Vector3(hw - radius, hh, z),
      new THREE.Vector3(-hw + radius, hh, z),
      new THREE.Vector3(-hw, hh - radius, z),
      new THREE.Vector3(-hw, -hh + radius, z)
    ];
  }

  const front_legGeom = roundedBoxGeometry(0.13, legH, 0.13, 0.025, 0.008);

  const front_left_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-0.59, legH / 2 + 0.01, 0.49);
  frame_group.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(0.59, legH / 2 + 0.01, 0.49);
  frame_group.add(front_right_leg);

  const rear_postH = 2.03;
  const rear_postGeom = roundedBoxGeometry(0.13, rear_postH, 0.14, 0.035, 0.008);

  const rear_left_post = new THREE.Mesh(rear_postGeom, woodMat);
  rear_left_post.name = "rear_left_post";
  rear_left_post.position.set(-0.59, rear_postH / 2, -0.47);
  rear_left_post.rotation.x = -0.07;
  frame_group.add(rear_left_post);

  const rear_right_post = new THREE.Mesh(rear_postGeom, woodMat);
  rear_right_post.name = "rear_right_post";
  rear_right_post.position.set(0.59, rear_postH / 2, -0.47);
  rear_right_post.rotation.x = -0.07;
  frame_group.add(rear_right_post);

  const front_apronGeom = roundedBoxGeometry(frameW - 0.08, 0.20, 0.10, 0.025, 0.008);
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.78, frameD / 2 - 0.05);
  frame_group.add(front_apron);

  const side_railGeom = roundedBoxGeometry(0.10, 0.19, frameD - 0.12, 0.022, 0.008);

  const left_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-0.55, 0.78, 0);
  frame_group.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, woodMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(0.55, 0.78, 0);
  frame_group.add(right_side_rail);

  const rear_railGeom = roundedBoxGeometry(frameW - 0.12, 0.17, 0.10, 0.022, 0.008);
  const rear_rail = new THREE.Mesh(rear_railGeom, woodMat);
  rear_rail.name = "rear_rail";
  rear_rail.position.set(0, 0.79, -0.47);
  frame_group.add(rear_rail);

  const back_support_railGeom = roundedBoxGeometry(1.04, 0.12, 0.08, 0.02, 0.006);
  const back_support_rail = new THREE.Mesh(back_support_railGeom, woodMat);
  back_support_rail.name = "back_support_rail";
  back_support_rail.position.set(0, 1.34, -0.50);
  back_support_rail.rotation.x = -0.07;
  frame_group.add(back_support_rail);

  const seat_supportGeom = roundedBoxGeometry(seatW - 0.04, 0.055, seatD - 0.08, 0.018, 0.005);
  const seat_support = new THREE.Mesh(seat_supportGeom, woodMat);
  seat_support.name = "seat_support";
  seat_support.position.set(0, seatH - 0.025, 0.02);
  frame_group.add(seat_support);

  const footGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 16);

  const front_left_foot = new THREE.Mesh(footGeom, rubberMat);
  front_left_foot.name = "front_left_foot";
  front_left_foot.position.set(-0.59, 0.009, 0.49);
  frame_group.add(front_left_foot);

  const front_right_foot = new THREE.Mesh(footGeom, rubberMat);
  front_right_foot.name = "front_right_foot";
  front_right_foot.position.set(0.59, 0.009, 0.49);
  frame_group.add(front_right_foot);

  const rear_left_foot = new THREE.Mesh(footGeom, rubberMat);
  rear_left_foot.name = "rear_left_foot";
  rear_left_foot.position.set(-0.59, 0.009, -0.50);
  frame_group.add(rear_left_foot);

  const rear_right_foot = new THREE.Mesh(footGeom, rubberMat);
  rear_right_foot.name = "rear_right_foot";
  rear_right_foot.position.set(0.59, 0.009, -0.50);
  frame_group.add(rear_right_foot);

  const seat_cushionGeom = roundedBoxGeometry(
    seatW - 0.04,
    cushionH - 0.04,
    seatD - 0.04,
    0.055,
    0.022
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, seatH + cushionH / 2, 0.04);
  upholstery_group.add(seat_cushion);

  const seat_pipingCurve = new THREE.CatmullRomCurve3(
    roundedLoopXZ(seatW - 0.06, seatD - 0.06, 0.096, 0.075),
    true,
    "centripetal"
  );
  const seat_pipingGeom = new THREE.TubeGeometry(
    seat_pipingCurve,
    64,
    0.007,
    6,
    true
  );
  const seat_piping = new THREE.Mesh(seat_pipingGeom, seamMat);
  seat_piping.name = "seat_piping";
  seat_cushion.add(seat_piping);

  const back_cushion_group = new THREE.Group();
  back_cushion_group.name = "back_cushion_group";
  back_cushion_group.position.set(0, 1.55, -0.37);
  back_cushion_group.rotation.x = -0.09;
  upholstery_group.add(back_cushion_group);

  const back_cushionGeom = roundedBoxGeometry(
    backCushionW - 0.04,
    backH - 0.04,
    backCushionD - 0.04,
    0.075,
    0.025
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion.name = "back_cushion";
  back_cushion_group.add(back_cushion);

  const back_pipingCurve = new THREE.CatmullRomCurve3(
    roundedLoopXY(backCushionW - 0.07, backH - 0.07, 0.098, 0.085),
    true,
    "centripetal"
  );
  const back_pipingGeom = new THREE.TubeGeometry(
    back_pipingCurve,
    72,
    0.007,
    6,
    true
  );
  const back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  back_piping.name = "back_piping";
  back_cushion.add(back_piping);

  const back_wrinkle_leftCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.30, 0.45, 0.101),
    new THREE.Vector3(-0.28, 0.35, 0.103),
    new THREE.Vector3(-0.24, 0.23, 0.102)
  ]);
  const back_wrinkle_leftGeom = new THREE.TubeGeometry(
    back_wrinkle_leftCurve,
    12,
    0.0035,
    5,
    false
  );
  const back_wrinkle_left = new THREE.Mesh(back_wrinkle_leftGeom, seamMat);
  back_wrinkle_left.name = "back_wrinkle_left";
  back_cushion.add(back_wrinkle_left);

  const back_wrinkle_centerCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.05, 0.47, 0.101),
    new THREE.Vector3(-0.02, 0.35, 0.104),
    new THREE.Vector3(0.03, 0.20, 0.102)
  ]);
  const back_wrinkle_centerGeom = new THREE.TubeGeometry(
    back_wrinkle_centerCurve,
    14,
    0.0035,
    5,
    false
  );
  const back_wrinkle_center = new THREE.Mesh(back_wrinkle_centerGeom, seamMat);
  back_wrinkle_center.name = "back_wrinkle_center";
  back_cushion.add(back_wrinkle_center);

  const back_wrinkle_rightCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.31, 0.43, 0.101),
    new THREE.Vector3(0.27, 0.32, 0.103),
    new THREE.Vector3(0.23, 0.21, 0.102)
  ]);
  const back_wrinkle_rightGeom = new THREE.TubeGeometry(
    back_wrinkle_rightCurve,
    12,
    0.0035,
    5,
    false
  );
  const back_wrinkle_right = new THREE.Mesh(back_wrinkle_rightGeom, seamMat);
  back_wrinkle_right.name = "back_wrinkle_right";
  back_cushion.add(back_wrinkle_right);

  fitToUnitCube(THREE, root);
  return root;

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
}