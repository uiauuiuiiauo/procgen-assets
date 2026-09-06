export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "emerald_velvet_armchair";

  const seatW = 1.16;
  const seatD = 1.02;
  const seatH = 0.72;
  const cushionH = 0.22;
  const backH = 1.02;
  const armW = 0.11;
  const armH = 1.19;
  const legH = 1.20;
  const moduleCount = 1;

  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x075039,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x033326,
    metalness: 0.0,
    roughness: 0.95,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa86628,
    metalness: 0.0,
    roughness: 0.6,
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createRoundedPrismGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);
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
      depth,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function createPaddedBackGeometry(width, height, depth) {
    const hw = width / 2;
    const hh = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(-hw + 0.10, -hh);
    shape.bezierCurveTo(
      -hw * 0.42,
      -hh - 0.025,
      hw * 0.42,
      -hh - 0.025,
      hw - 0.10,
      -hh
    );
    shape.bezierCurveTo(
      hw - 0.035,
      -hh,
      hw,
      -hh + 0.045,
      hw,
      -hh + 0.13
    );
    shape.bezierCurveTo(
      hw + 0.015,
      -hh + 0.34,
      hw + 0.005,
      hh - 0.28,
      hw - 0.035,
      hh - 0.35
    );
    shape.bezierCurveTo(
      hw - 0.075,
      hh - 0.06,
      hw - 0.17,
      hh,
      hw - 0.29,
      hh
    );
    shape.bezierCurveTo(
      hw * 0.36,
      hh + 0.025,
      -hw * 0.36,
      hh + 0.025,
      -hw + 0.29,
      hh
    );
    shape.bezierCurveTo(
      -hw + 0.17,
      hh,
      -hw + 0.075,
      hh - 0.06,
      -hw + 0.035,
      hh - 0.35
    );
    shape.bezierCurveTo(
      -hw - 0.005,
      hh - 0.28,
      -hw - 0.015,
      -hh + 0.34,
      -hw,
      -hh + 0.13
    );
    shape.bezierCurveTo(
      -hw,
      -hh + 0.045,
      -hw + 0.035,
      -hh,
      -hw + 0.10,
      -hh
    );

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 5,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function orientBetween(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    mesh.scale.set(1, length, 1);
  }

  const seat_cushionGeom = createRoundedPrismGeometry(
    seatW,
    cushionH,
    seatD,
    0.095,
    0.032
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, velvetMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(0, seatH - cushionH / 2, 0.02);
  root.add(seat_cushion);

  const seat_cushion_crownGeom = new THREE.SphereGeometry(1, 40, 20);
  const seat_cushion_crown = new THREE.Mesh(
    seat_cushion_crownGeom,
    velvetMat
  );
  seat_cushion_crown.name = "seat_cushion_crown";
  seat_cushion_crown.position.set(0, seatH + 0.005, 0.02);
  seat_cushion_crown.scale.set(
    seatW * 0.46 / moduleCount,
    0.045,
    seatD * 0.44
  );
  root.add(seat_cushion_crown);

  const seat_piping_points = [
    new THREE.Vector3(-0.48, seatH + 0.018, 0.535),
    new THREE.Vector3(0.48, seatH + 0.018, 0.535),
    new THREE.Vector3(0.565, seatH + 0.012, 0.47),
    new THREE.Vector3(0.585, seatH + 0.008, -0.39),
    new THREE.Vector3(0.50, seatH + 0.012, -0.49),
    new THREE.Vector3(-0.50, seatH + 0.012, -0.49),
    new THREE.Vector3(-0.585, seatH + 0.008, -0.39),
    new THREE.Vector3(-0.565, seatH + 0.012, 0.47),
  ];
  const seat_piping_curve = new THREE.CatmullRomCurve3(
    seat_piping_points,
    true,
    "centripetal"
  );
  const seat_pipingGeom = new THREE.TubeGeometry(
    seat_piping_curve,
    72,
    0.009,
    8,
    true
  );
  const seat_piping = new THREE.Mesh(seat_pipingGeom, seamMat);
  seat_piping.name = "seat_piping";
  root.add(seat_piping);

  const seat_front_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    0.15,
    8
  );
  const left_seat_front_seam = new THREE.Mesh(
    seat_front_seamGeom,
    seamMat
  );
  left_seat_front_seam.name = "left_seat_front_seam";
  left_seat_front_seam.position.set(-0.545, 0.625, 0.558);
  root.add(left_seat_front_seam);

  const right_seat_front_seam = new THREE.Mesh(
    seat_front_seamGeom,
    seamMat
  );
  right_seat_front_seam.name = "right_seat_front_seam";
  right_seat_front_seam.position.set(0.545, 0.625, 0.558);
  root.add(right_seat_front_seam);

  const backrest = new THREE.Group();
  backrest.name = "backrest";
  backrest.position.set(0, 1.33, -0.43);
  backrest.rotation.x = -0.11;
  root.add(backrest);

  const back_cushionGeom = createPaddedBackGeometry(
    1.08,
    backH,
    0.17
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, velvetMat);
  back_cushion.name = "back_cushion";
  backrest.add(back_cushion);

  const back_cushion_crownGeom = new THREE.SphereGeometry(1, 40, 24);
  const back_cushion_crown = new THREE.Mesh(
    back_cushion_crownGeom,
    velvetMat
  );
  back_cushion_crown.name = "back_cushion_crown";
  back_cushion_crown.position.set(0, 0, 0.09);
  back_cushion_crown.scale.set(0.48, 0.43, 0.035);
  backrest.add(back_cushion_crown);

  const back_piping_points = [
    new THREE.Vector3(-0.42, -0.485, 0.116),
    new THREE.Vector3(0.42, -0.485, 0.116),
    new THREE.Vector3(0.515, -0.40, 0.116),
    new THREE.Vector3(0.525, 0.31, 0.116),
    new THREE.Vector3(0.45, 0.475, 0.116),
    new THREE.Vector3(0, 0.515, 0.116),
    new THREE.Vector3(-0.45, 0.475, 0.116),
    new THREE.Vector3(-0.525, 0.31, 0.116),
    new THREE.Vector3(-0.515, -0.40, 0.116),
  ];
  const back_piping_curve = new THREE.CatmullRomCurve3(
    back_piping_points,
    true,
    "centripetal"
  );
  const back_pipingGeom = new THREE.TubeGeometry(
    back_piping_curve,
    80,
    0.008,
    8,
    true
  );
  const back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  back_piping.name = "back_piping";
  backrest.add(back_piping);

  const legGeom = new THREE.CylinderGeometry(
    0.064,
    0.041,
    1,
    18,
    1,
    false
  );

  const front_left_leg = new THREE.Mesh(legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  orientBetween(
    front_left_leg,
    new THREE.Vector3(-0.69, 0.02, 0.56),
    new THREE.Vector3(-0.61, legH, 0.43)
  );
  root.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  orientBetween(
    front_right_leg,
    new THREE.Vector3(0.69, 0.02, 0.56),
    new THREE.Vector3(0.61, legH, 0.43)
  );
  root.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(legGeom, woodMat);
  rear_left_leg.name = "rear_left_leg";
  orientBetween(
    rear_left_leg,
    new THREE.Vector3(-0.65, 0.02, -0.54),
    new THREE.Vector3(-0.57, 1.18, -0.43)
  );
  root.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(legGeom, woodMat);
  rear_right_leg.name = "rear_right_leg";
  orientBetween(
    rear_right_leg,
    new THREE.Vector3(0.65, 0.02, -0.54),
    new THREE.Vector3(0.57, 1.18, -0.43)
  );
  root.add(rear_right_leg);

  const footGeom = new THREE.SphereGeometry(1, 16, 10);

  const front_left_foot = new THREE.Mesh(footGeom, woodMat);
  front_left_foot.name = "front_left_foot";
  front_left_foot.position.set(-0.69, 0.025, 0.56);
  front_left_foot.scale.set(0.045, 0.025, 0.045);
  root.add(front_left_foot);

  const front_right_foot = new THREE.Mesh(footGeom, woodMat);
  front_right_foot.name = "front_right_foot";
  front_right_foot.position.set(0.69, 0.025, 0.56);
  front_right_foot.scale.set(0.045, 0.025, 0.045);
  root.add(front_right_foot);

  const rear_left_foot = new THREE.Mesh(footGeom, woodMat);
  rear_left_foot.name = "rear_left_foot";
  rear_left_foot.position.set(-0.65, 0.025, -0.54);
  rear_left_foot.scale.set(0.045, 0.025, 0.045);
  root.add(rear_left_foot);

  const rear_right_foot = new THREE.Mesh(footGeom, woodMat);
  rear_right_foot.name = "rear_right_foot";
  rear_right_foot.position.set(0.65, 0.025, -0.54);
  rear_right_foot.scale.set(0.045, 0.025, 0.045);
  root.add(rear_right_foot);

  const armrestGeom = createRoundedPrismGeometry(
    armW,
    0.07,
    1.10,
    0.028,
    0.012
  );

  const left_armrest = new THREE.Mesh(armrestGeom, woodMat);
  left_armrest.name = "left_armrest";
  left_armrest.position.set(-0.65, armH, 0.02);
  left_armrest.rotation.x = 0.035;
  root.add(left_armrest);

  const right_armrest = new THREE.Mesh(armrestGeom, woodMat);
  right_armrest.name = "right_armrest";
  right_armrest.position.set(0.65, armH, 0.02);
  right_armrest.rotation.x = 0.035;
  root.add(right_armrest);

  const arm_supportGeom = new THREE.CylinderGeometry(
    0.043,
    0.052,
    1,
    16
  );

  const front_left_arm_support = new THREE.Mesh(
    arm_supportGeom,
    woodMat
  );
  front_left_arm_support.name = "front_left_arm_support";
  orientBetween(
    front_left_arm_support,
    new THREE.Vector3(-0.61, 0.68, 0.43),
    new THREE.Vector3(-0.65, 1.155, 0.47)
  );
  root.add(front_left_arm_support);

  const front_right_arm_support = new THREE.Mesh(
    arm_supportGeom,
    woodMat
  );
  front_right_arm_support.name = "front_right_arm_support";
  orientBetween(
    front_right_arm_support,
    new THREE.Vector3(0.61, 0.68, 0.43),
    new THREE.Vector3(0.65, 1.155, 0.47)
  );
  root.add(front_right_arm_support);

  const rear_left_arm_support = new THREE.Mesh(
    arm_supportGeom,
    woodMat
  );
  rear_left_arm_support.name = "rear_left_arm_support";
  orientBetween(
    rear_left_arm_support,
    new THREE.Vector3(-0.57, 0.92, -0.42),
    new THREE.Vector3(-0.65, 1.155, -0.46)
  );
  root.add(rear_left_arm_support);

  const rear_right_arm_support = new THREE.Mesh(
    arm_supportGeom,
    woodMat
  );
  rear_right_arm_support.name = "rear_right_arm_support";
  orientBetween(
    rear_right_arm_support,
    new THREE.Vector3(0.57, 0.92, -0.42),
    new THREE.Vector3(0.65, 1.155, -0.46)
  );
  root.add(rear_right_arm_support);

  const screwGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.012,
    16
  );

  const front_left_screw = new THREE.Mesh(screwGeom, screwMat);
  front_left_screw.name = "front_left_screw";
  front_left_screw.rotation.z = Math.PI / 2;
  front_left_screw.position.set(-0.678, 0.72, 0.455);
  root.add(front_left_screw);

  const front_right_screw = new THREE.Mesh(screwGeom, screwMat);
  front_right_screw.name = "front_right_screw";
  front_right_screw.rotation.z = Math.PI / 2;
  front_right_screw.position.set(0.678, 0.72, 0.455);
  root.add(front_right_screw);

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