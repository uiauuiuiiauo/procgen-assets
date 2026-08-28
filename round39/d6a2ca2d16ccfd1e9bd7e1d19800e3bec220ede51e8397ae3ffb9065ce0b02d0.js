export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_fabric_loveseat";

  const upholstery_group = new THREE.Group();
  upholstery_group.name = "upholstery_group";
  root.add(upholstery_group);

  const back_cushions_group = new THREE.Group();
  back_cushions_group.name = "back_cushions_group";
  root.add(back_cushions_group);

  const accent_pillow_group = new THREE.Group();
  accent_pillow_group.name = "accent_pillow_group";
  root.add(accent_pillow_group);

  const legs_group = new THREE.Group();
  legs_group.name = "legs_group";
  root.add(legs_group);

  const seatW = 1.55;
  const seatD = 0.70;
  const seatH = 0.62;
  const cushionH = 0.18;
  const backH = 0.76;
  const armW = 0.27;
  const armH = 0.70;
  const legH = 0.24;
  const moduleCount = 2;
  const cushionGap = 0.025;
  const moduleW = (seatW - cushionGap) / moduleCount;
  const armX = seatW / 2 + armW / 2;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x2f6fa8,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x245b87,
    metalness: 0.0,
    roughness: 0.95
  });
  const legsMat = new THREE.MeshStandardMaterial({
    color: 0x292d30,
    metalness: 0.6,
    roughness: 0.5
  });

  function roundedBoxGeometry(w, h, d, radius, bevel) {
    const hw = w / 2;
    const hh = h / 2;
    const r = Math.min(radius, hw * 0.9, hh * 0.9);
    const shape = new THREE.Shape();

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: bevel,
      bevelThickness: bevel
    });
    geometry.translate(0, 0, -d / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedLoopXZGeometry(w, d, y, radius, tubeRadius) {
    const hw = w / 2;
    const hd = d / 2;
    const r = Math.min(radius, hw * 0.9, hd * 0.9);
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
    return new THREE.TubeGeometry(curve, 48, tubeRadius, 8, true);
  }

  function roundedLoopXYGeometry(w, h, z, radius, tubeRadius) {
    const hw = w / 2;
    const hh = h / 2;
    const r = Math.min(radius, hw * 0.9, hh * 0.9);
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
    return new THREE.TubeGeometry(curve, 48, tubeRadius, 8, true);
  }

  const seat_baseGeom = roundedBoxGeometry(
    seatW + 0.06,
    0.34,
    0.74,
    0.065,
    0.022
  );
  const seat_base = new THREE.Mesh(seat_baseGeom, fabricMat);
  seat_base.name = "seat_base";
  seat_base.position.set(0, legH + 0.17, 0.02);
  upholstery_group.add(seat_base);

  const front_skirtGeom = roundedBoxGeometry(
    seatW + 0.04,
    0.35,
    0.09,
    0.055,
    0.018
  );
  const front_skirt = new THREE.Mesh(front_skirtGeom, fabricMat);
  front_skirt.name = "front_skirt";
  front_skirt.position.set(0, legH + 0.175, 0.405);
  upholstery_group.add(front_skirt);

  const seat_cushionGeom = roundedBoxGeometry(
    moduleW,
    cushionH,
    seatD,
    0.07,
    0.022
  );
  const seat_cushion_pipingGeom = roundedLoopXZGeometry(
    moduleW - 0.035,
    seatD - 0.035,
    cushionH / 2 + 0.014,
    0.06,
    0.006
  );

  const left_seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  left_seat_cushion.name = "left_seat_cushion";
  left_seat_cushion.position.set(
    -(moduleW + cushionGap) / 2,
    seatH - cushionH / 2,
    0.035
  );
  upholstery_group.add(left_seat_cushion);

  const left_seat_piping = new THREE.Mesh(
    seat_cushion_pipingGeom,
    seamMat
  );
  left_seat_piping.name = "left_seat_piping";
  left_seat_cushion.add(left_seat_piping);

  const right_seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  right_seat_cushion.name = "right_seat_cushion";
  right_seat_cushion.position.set(
    (moduleW + cushionGap) / 2,
    seatH - cushionH / 2,
    0.035
  );
  upholstery_group.add(right_seat_cushion);

  const right_seat_piping = new THREE.Mesh(
    seat_cushion_pipingGeom,
    seamMat
  );
  right_seat_piping.name = "right_seat_piping";
  right_seat_cushion.add(right_seat_piping);

  const seat_center_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    seatD - 0.09,
    8
  );
  const seat_center_seam = new THREE.Mesh(
    seat_center_seamGeom,
    seamMat
  );
  seat_center_seam.name = "seat_center_seam";
  seat_center_seam.rotation.x = Math.PI / 2;
  seat_center_seam.position.set(0, seatH + 0.016, 0.035);
  upholstery_group.add(seat_center_seam);

  const front_skirt_top_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    seatW + 0.01,
    8
  );
  const front_skirt_top_seam = new THREE.Mesh(
    front_skirt_top_seamGeom,
    seamMat
  );
  front_skirt_top_seam.name = "front_skirt_top_seam";
  front_skirt_top_seam.rotation.z = Math.PI / 2;
  front_skirt_top_seam.position.set(0, seatH - 0.005, 0.462);
  upholstery_group.add(front_skirt_top_seam);

  const armGeom = roundedBoxGeometry(
    armW,
    armH,
    0.86,
    0.07,
    0.022
  );
  const arm_pipingGeom = roundedLoopXZGeometry(
    armW - 0.025,
    0.82,
    armH / 2 + 0.012,
    0.055,
    0.006
  );

  const left_arm = new THREE.Mesh(armGeom, fabricMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-armX, legH + armH / 2 - 0.01, 0);
  upholstery_group.add(left_arm);

  const left_arm_piping = new THREE.Mesh(arm_pipingGeom, seamMat);
  left_arm_piping.name = "left_arm_piping";
  left_arm.add(left_arm_piping);

  const right_arm = new THREE.Mesh(armGeom, fabricMat);
  right_arm.name = "right_arm";
  right_arm.position.set(armX, legH + armH / 2 - 0.01, 0);
  upholstery_group.add(right_arm);

  const right_arm_piping = new THREE.Mesh(arm_pipingGeom, seamMat);
  right_arm_piping.name = "right_arm_piping";
  right_arm.add(right_arm_piping);

  const back_shellGeom = roundedBoxGeometry(
    seatW + 0.05,
    0.56,
    0.15,
    0.075,
    0.022
  );
  const back_shell = new THREE.Mesh(back_shellGeom, fabricMat);
  back_shell.name = "back_shell";
  back_shell.position.set(0, 0.79, -0.405);
  back_shell.rotation.x = -0.045;
  upholstery_group.add(back_shell);

  const back_cushionGeom = roundedBoxGeometry(
    0.73,
    backH,
    0.19,
    0.095,
    0.024
  );
  const back_cushion_pipingGeom = roundedLoopXYGeometry(
    0.695,
    backH - 0.035,
    0.118,
    0.08,
    0.006
  );

  const left_back_cushion = new THREE.Mesh(
    back_cushionGeom,
    fabricMat
  );
  left_back_cushion.name = "left_back_cushion";
  left_back_cushion.position.set(-0.37, 1.01, -0.305);
  left_back_cushion.rotation.set(-0.10, 0, -0.018);
  back_cushions_group.add(left_back_cushion);

  const left_back_piping = new THREE.Mesh(
    back_cushion_pipingGeom,
    seamMat
  );
  left_back_piping.name = "left_back_piping";
  left_back_cushion.add(left_back_piping);

  const right_back_cushion = new THREE.Mesh(
    back_cushionGeom,
    fabricMat
  );
  right_back_cushion.name = "right_back_cushion";
  right_back_cushion.position.set(0.37, 1.01, -0.305);
  right_back_cushion.rotation.set(-0.10, 0, 0.018);
  back_cushions_group.add(right_back_cushion);

  const right_back_piping = new THREE.Mesh(
    back_cushion_pipingGeom,
    seamMat
  );
  right_back_piping.name = "right_back_piping";
  right_back_cushion.add(right_back_piping);

  const back_center_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.66,
    8
  );
  const back_center_seam = new THREE.Mesh(
    back_center_seamGeom,
    seamMat
  );
  back_center_seam.name = "back_center_seam";
  back_center_seam.position.set(0, 1.01, -0.183);
  back_center_seam.rotation.x = -0.10;
  back_cushions_group.add(back_center_seam);

  const accent_pillowGeom = roundedBoxGeometry(
    0.45,
    0.50,
    0.16,
    0.085,
    0.022
  );
  const accent_pillow_pipingGeom = roundedLoopXYGeometry(
    0.42,
    0.47,
    0.108,
    0.075,
    0.006
  );

  const accent_pillow = new THREE.Mesh(
    accent_pillowGeom,
    fabricMat
  );
  accent_pillow.name = "accent_pillow";
  accent_pillow.position.set(-0.53, 1.00, -0.075);
  accent_pillow.rotation.set(-0.08, 0.04, 0.29);
  accent_pillow_group.add(accent_pillow);

  const accent_pillow_piping = new THREE.Mesh(
    accent_pillow_pipingGeom,
    seamMat
  );
  accent_pillow_piping.name = "accent_pillow_piping";
  accent_pillow.add(accent_pillow_piping);

  const legsGeom = new THREE.CylinderGeometry(
    0.026,
    0.031,
    legH,
    12
  );
  const legs = new THREE.InstancedMesh(legsGeom, legsMat, 4);
  legs.name = "legs";

  const leg_positions = [
    new THREE.Vector3(-0.90, legH / 2, 0.39),
    new THREE.Vector3(0.90, legH / 2, 0.39),
    new THREE.Vector3(-0.90, legH / 2, -0.34),
    new THREE.Vector3(0.90, legH / 2, -0.34)
  ];
  const leg_transform = new THREE.Object3D();
  for (let i = 0; i < leg_positions.length; i++) {
    leg_transform.position.copy(leg_positions[i]);
    leg_transform.updateMatrix();
    legs.setMatrixAt(i, leg_transform.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  legs_group.add(legs);

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