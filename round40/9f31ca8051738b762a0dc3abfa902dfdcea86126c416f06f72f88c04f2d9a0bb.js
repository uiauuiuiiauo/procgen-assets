export default function generate(THREE) {
  const root = new THREE.Group();

  const seatW = 0.94;
  const seatD = 0.72;
  const seatH = 0.55;
  const cushionH = 0.22;
  const backH = 0.76;
  const armW = 0.16;
  const armH = 0.91;
  const legH = 0.92;
  const moduleCount = 1;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0xeee9df,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xd4ccc0,
    metalness: 0.0,
    roughness: 0.95
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9b6a43,
    metalness: 0.0,
    roughness: 0.6
  });
  const fastenerMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.25
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function sidePanelGeometry(depth, height, thickness, topSlant) {
    const shape = new THREE.Shape();
    shape.moveTo(-depth / 2, 0);
    shape.lineTo(depth / 2, 0);
    shape.lineTo(depth / 2, height - topSlant);
    shape.quadraticCurveTo(
      depth / 2 - 0.025,
      height - topSlant * 0.72,
      depth / 2 - 0.08,
      height - topSlant * 0.58
    );
    shape.bezierCurveTo(
      0.12,
      height - topSlant * 0.25,
      -0.12,
      height,
      -depth / 2 + 0.08,
      height
    );
    shape.quadraticCurveTo(
      -depth / 2,
      height,
      -depth / 2,
      height - 0.07
    );
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -thickness / 2);
    return geometry;
  }

  const seat_deckGeom = new THREE.BoxGeometry(0.98, 0.08, 0.72);
  const seat_deck = new THREE.Mesh(seat_deckGeom, woodMat);
  seat_deck.position.set(0, 0.49, 0.035);
  root.add(seat_deck);

  const front_apronGeom = new THREE.BoxGeometry(0.98, 0.16, 0.08);
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.position.set(0, 0.43, 0.39);
  root.add(front_apron);

  const side_lower_railGeom = new THREE.BoxGeometry(0.085, 0.13, 0.74);
  const left_side_lower_rail = new THREE.Mesh(side_lower_railGeom, woodMat);
  left_side_lower_rail.position.set(-0.51, 0.43, 0.02);
  root.add(left_side_lower_rail);

  const right_side_lower_rail = new THREE.Mesh(side_lower_railGeom, woodMat);
  right_side_lower_rail.position.set(0.51, 0.43, 0.02);
  root.add(right_side_lower_rail);

  const rear_lower_railGeom = new THREE.BoxGeometry(0.98, 0.13, 0.08);
  const rear_lower_rail = new THREE.Mesh(rear_lower_railGeom, woodMat);
  rear_lower_rail.position.set(0, 0.43, -0.35);
  root.add(rear_lower_rail);

  const rear_legGeom = new THREE.CylinderGeometry(0.064, 0.082, 0.63, 4);
  const left_rear_leg = new THREE.Mesh(rear_legGeom, woodMat);
  left_rear_leg.position.set(-0.49, 0.315, -0.37);
  left_rear_leg.rotation.set(-0.18, Math.PI / 4, 0);
  root.add(left_rear_leg);

  const right_rear_leg = new THREE.Mesh(rear_legGeom, woodMat);
  right_rear_leg.position.set(0.49, 0.315, -0.37);
  right_rear_leg.rotation.set(-0.18, Math.PI / 4, 0);
  root.add(right_rear_leg);

  const front_postShape = new THREE.Shape();
  front_postShape.moveTo(-0.043, 0);
  front_postShape.lineTo(0.043, 0);
  front_postShape.lineTo(0.058, 0.055);
  front_postShape.lineTo(0.058, legH - 0.07);
  front_postShape.quadraticCurveTo(0.058, legH, 0.018, legH);
  front_postShape.lineTo(-0.018, legH);
  front_postShape.quadraticCurveTo(-0.058, legH, -0.058, legH - 0.07);
  front_postShape.lineTo(-0.058, 0.055);
  front_postShape.closePath();

  const front_postGeom = new THREE.ExtrudeGeometry(front_postShape, {
    depth: 0.115,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  front_postGeom.translate(0, 0, -0.0575);

  const front_left_post = new THREE.Mesh(front_postGeom, woodMat);
  front_left_post.position.set(-0.53, 0.01, 0.39);
  root.add(front_left_post);

  const front_right_post = new THREE.Mesh(front_postGeom, woodMat);
  front_right_post.position.set(0.53, 0.01, 0.39);
  root.add(front_right_post);

  const arm_railPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.85, 0.39),
    new THREE.Vector3(0, 0.87, 0.24),
    new THREE.Vector3(0, 0.91, -0.04),
    new THREE.Vector3(0, 0.98, -0.34)
  ], false, "centripetal");
  const arm_railGeom = new THREE.TubeGeometry(arm_railPath, 28, 0.045, 10, false);

  const left_arm_rail = new THREE.Mesh(arm_railGeom, woodMat);
  left_arm_rail.position.x = -0.53;
  root.add(left_arm_rail);

  const right_arm_rail = new THREE.Mesh(arm_railGeom, woodMat);
  right_arm_rail.position.x = 0.53;
  root.add(right_arm_rail);

  const arm_padPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, armH, 0.39),
    new THREE.Vector3(0, armH + 0.015, 0.23),
    new THREE.Vector3(0, armH + 0.06, -0.05),
    new THREE.Vector3(0, armH + 0.13, -0.34)
  ], false, "centripetal");
  const arm_padGeom = new THREE.TubeGeometry(arm_padPath, 32, 0.078, 14, false);

  const left_arm_pad = new THREE.Mesh(arm_padGeom, fabricMat);
  left_arm_pad.position.x = -0.53;
  left_arm_pad.scale.x = armW / 0.156;
  root.add(left_arm_pad);

  const right_arm_pad = new THREE.Mesh(arm_padGeom, fabricMat);
  right_arm_pad.position.x = 0.53;
  right_arm_pad.scale.x = armW / 0.156;
  root.add(right_arm_pad);

  const arm_front_capGeom = new THREE.SphereGeometry(1, 20, 12);
  const left_arm_front_cap = new THREE.Mesh(arm_front_capGeom, fabricMat);
  left_arm_front_cap.position.set(-0.53, armH, 0.39);
  left_arm_front_cap.scale.set(armW / 2, 0.078, 0.078);
  root.add(left_arm_front_cap);

  const right_arm_front_cap = new THREE.Mesh(arm_front_capGeom, fabricMat);
  right_arm_front_cap.position.set(0.53, armH, 0.39);
  right_arm_front_cap.scale.set(armW / 2, 0.078, 0.078);
  root.add(right_arm_front_cap);

  const arm_front_wood_capGeom = new THREE.SphereGeometry(1, 16, 10);
  const left_arm_front_wood_cap = new THREE.Mesh(arm_front_wood_capGeom, woodMat);
  left_arm_front_wood_cap.position.set(-0.53, 0.85, 0.39);
  left_arm_front_wood_cap.scale.set(0.061, 0.045, 0.045);
  root.add(left_arm_front_wood_cap);

  const right_arm_front_wood_cap = new THREE.Mesh(arm_front_wood_capGeom, woodMat);
  right_arm_front_wood_cap.position.set(0.53, 0.85, 0.39);
  right_arm_front_wood_cap.scale.set(0.061, 0.045, 0.045);
  root.add(right_arm_front_wood_cap);

  const arm_pipingPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, armH + 0.058, 0.39),
    new THREE.Vector3(0, armH + 0.07, 0.23),
    new THREE.Vector3(0, armH + 0.115, -0.05),
    new THREE.Vector3(0, armH + 0.185, -0.34)
  ], false, "centripetal");
  const arm_pipingGeom = new THREE.TubeGeometry(arm_pipingPath, 28, 0.009, 8, false);

  const left_arm_piping = new THREE.Mesh(arm_pipingGeom, seamMat);
  left_arm_piping.position.x = -0.445;
  root.add(left_arm_piping);

  const right_arm_piping = new THREE.Mesh(arm_pipingGeom, seamMat);
  right_arm_piping.position.x = 0.445;
  root.add(right_arm_piping);

  const side_panelGeom = sidePanelGeometry(0.74, 0.68, 0.11, 0.14);
  const left_side_panel = new THREE.Mesh(side_panelGeom, fabricMat);
  left_side_panel.position.set(-0.50, 0.47, 0);
  left_side_panel.rotation.y = Math.PI / 2;
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, fabricMat);
  right_side_panel.position.set(0.50, 0.47, 0);
  right_side_panel.rotation.y = Math.PI / 2;
  root.add(right_side_panel);

  const back_supportGeom = new THREE.BoxGeometry(0.94, 0.68, 0.09);
  const back_support = new THREE.Mesh(back_supportGeom, fabricMat);
  back_support.position.set(0, 1.08, -0.38);
  back_support.rotation.x = -0.10;
  root.add(back_support);

  const seat_cushionGeom = roundedExtrudeGeometry(
    seatW,
    seatD,
    cushionH,
    0.10,
    0.025
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, fabricMat);
  seat_cushion.position.set(0, seatH + cushionH / 2, 0.055);
  seat_cushion.rotation.x = Math.PI / 2;
  root.add(seat_cushion);

  const seat_cushion_topGeom = new THREE.SphereGeometry(1, 32, 16);
  const seat_cushion_top = new THREE.Mesh(seat_cushion_topGeom, fabricMat);
  seat_cushion_top.position.set(0, 0.79, 0.055);
  seat_cushion_top.scale.set(0.45, 0.055, 0.33);
  root.add(seat_cushion_top);

  const seat_pipingPoints = [
    new THREE.Vector3(-0.37, 0.795, 0.425),
    new THREE.Vector3(0.37, 0.795, 0.425),
    new THREE.Vector3(0.46, 0.795, 0.34),
    new THREE.Vector3(0.46, 0.795, -0.23),
    new THREE.Vector3(0.37, 0.795, -0.31),
    new THREE.Vector3(-0.37, 0.795, -0.31),
    new THREE.Vector3(-0.46, 0.795, -0.23),
    new THREE.Vector3(-0.46, 0.795, 0.34)
  ];
  const seat_pipingCurve = new THREE.CatmullRomCurve3(
    seat_pipingPoints,
    true,
    "centripetal"
  );
  const seat_pipingGeom = new THREE.TubeGeometry(
    seat_pipingCurve,
    64,
    0.009,
    8,
    true
  );
  const seat_piping = new THREE.Mesh(seat_pipingGeom, seamMat);
  root.add(seat_piping);

  const back_cushion_group = new THREE.Group();
  back_cushion_group.position.set(0, 1.08, -0.32);
  back_cushion_group.rotation.x = -0.10;
  root.add(back_cushion_group);

  const back_cushionGeom = roundedExtrudeGeometry(
    0.90,
    backH,
    0.15,
    0.105,
    0.025
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, fabricMat);
  back_cushion_group.add(back_cushion);

  const back_cushion_bulgeGeom = new THREE.SphereGeometry(1, 32, 20);
  const back_cushion_bulge = new THREE.Mesh(back_cushion_bulgeGeom, fabricMat);
  back_cushion_bulge.position.set(0, 0, 0.082);
  back_cushion_bulge.scale.set(0.43, 0.355, 0.045);
  back_cushion_group.add(back_cushion_bulge);

  const back_pipingPoints = [
    new THREE.Vector3(-0.35, -0.375, 0.108),
    new THREE.Vector3(0.35, -0.375, 0.108),
    new THREE.Vector3(0.44, -0.29, 0.108),
    new THREE.Vector3(0.44, 0.29, 0.108),
    new THREE.Vector3(0.35, 0.375, 0.108),
    new THREE.Vector3(-0.35, 0.375, 0.108),
    new THREE.Vector3(-0.44, 0.29, 0.108),
    new THREE.Vector3(-0.44, -0.29, 0.108)
  ];
  const back_pipingCurve = new THREE.CatmullRomCurve3(
    back_pipingPoints,
    true,
    "centripetal"
  );
  const back_pipingGeom = new THREE.TubeGeometry(
    back_pipingCurve,
    64,
    0.008,
    8,
    true
  );
  const back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  back_cushion_group.add(back_piping);

  const front_fastenerGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.009, 12);
  const front_left_fastener = new THREE.Mesh(front_fastenerGeom, fastenerMat);
  front_left_fastener.position.set(-0.53, 0.25, 0.454);
  front_left_fastener.rotation.x = Math.PI / 2;
  root.add(front_left_fastener);

  const front_right_fastener = new THREE.Mesh(front_fastenerGeom, fastenerMat);
  front_right_fastener.position.set(0.53, 0.25, 0.454);
  front_right_fastener.rotation.x = Math.PI / 2;
  root.add(front_right_fastener);

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