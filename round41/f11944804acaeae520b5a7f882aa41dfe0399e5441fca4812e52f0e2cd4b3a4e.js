export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_rocking_armchair";

  const seatW = 1.18;
  const seatD = 0.88;
  const seatH = 0.82;
  const cushionH = 0.22;
  const backH = 1.25;
  const armW = 0.19;
  const armH = 1.31;
  const legH = 1.18;
  const module_count = 1;
  const cushionW = seatW / module_count - 0.02;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9b6b3f,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x765034,
    metalness: 0.0,
    roughness: 0.6
  });
  const velvetMat = new THREE.MeshStandardMaterial({
    color: 0x29251d,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x17140f,
    metalness: 0.0,
    roughness: 0.95
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  function roundedExtrudeGeometry(w, h, depth, radius, bevel) {
    const geom = new THREE.ExtrudeGeometry(
      roundedRectShape(w, h, radius),
      {
        depth: depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3
      }
    );
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function createBeam(p1, p2, width, depth, mat) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const geom = new THREE.BoxGeometry(width, length, depth);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(p1).add(p2).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  function roundedLoopXZ(w, d, y, radius) {
    const x = w / 2;
    const z = d / 2;
    return [
      new THREE.Vector3(-x + radius, y, -z),
      new THREE.Vector3(x - radius, y, -z),
      new THREE.Vector3(x, y, -z + radius),
      new THREE.Vector3(x, y, z - radius),
      new THREE.Vector3(x - radius, y, z),
      new THREE.Vector3(-x + radius, y, z),
      new THREE.Vector3(-x, y, z - radius),
      new THREE.Vector3(-x, y, -z + radius)
    ];
  }

  function roundedLoopXY(w, h, z, radius) {
    const x = w / 2;
    const y = h / 2;
    return [
      new THREE.Vector3(-x + radius, -y, z),
      new THREE.Vector3(x - radius, -y, z),
      new THREE.Vector3(x, -y + radius, z),
      new THREE.Vector3(x, y - radius, z),
      new THREE.Vector3(x - radius, y, z),
      new THREE.Vector3(-x + radius, y, z),
      new THREE.Vector3(-x, y - radius, z),
      new THREE.Vector3(-x, -y + radius, z)
    ];
  }

  const rockerShape = new THREE.Shape();
  rockerShape.moveTo(-0.98, 0.18);
  rockerShape.bezierCurveTo(-0.72, 0.02, -0.36, -0.05, 0.00, -0.05);
  rockerShape.bezierCurveTo(0.38, -0.05, 0.76, 0.03, 1.00, 0.20);
  rockerShape.lineTo(0.94, 0.29);
  rockerShape.bezierCurveTo(0.68, 0.13, 0.34, 0.06, 0.00, 0.06);
  rockerShape.bezierCurveTo(-0.34, 0.06, -0.69, 0.13, -0.91, 0.27);
  rockerShape.closePath();

  const rockerGeom = new THREE.ExtrudeGeometry(rockerShape, {
    depth: 0.11,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3
  });
  rockerGeom.translate(0, 0, -0.055);

  const left_rocker = new THREE.Mesh(rockerGeom, darkWoodMat);
  left_rocker.name = "left_rocker";
  left_rocker.rotation.y = Math.PI / 2;
  left_rocker.position.x = -0.68;
  root.add(left_rocker);

  const right_rocker = new THREE.Mesh(rockerGeom, darkWoodMat);
  right_rocker.name = "right_rocker";
  right_rocker.rotation.y = Math.PI / 2;
  right_rocker.position.x = 0.68;
  root.add(right_rocker);

  const front_leg_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.17, 0.55),
    new THREE.Vector3(0, 0.48, 0.50),
    new THREE.Vector3(0, 0.82, 0.47),
    new THREE.Vector3(0, 1.10, 0.43),
    new THREE.Vector3(0, armH, 0.42)
  ], false, "centripetal");

  const front_legGeom = new THREE.TubeGeometry(
    front_leg_curve, 28, 0.075, 10, false
  );

  const front_left_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.scale.x = 0.88;
  front_left_leg.position.x = -0.66;
  root.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(front_legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.scale.x = 0.88;
  front_right_leg.position.x = 0.66;
  root.add(front_right_leg);

  const back_post_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.16, -0.48),
    new THREE.Vector3(0, 0.62, -0.47),
    new THREE.Vector3(0, 1.18, -0.53),
    new THREE.Vector3(0, 1.88, -0.65),
    new THREE.Vector3(0, 2.52, -0.76)
  ], false, "centripetal");

  const back_postGeom = new THREE.TubeGeometry(
    back_post_curve, 40, 0.078, 10, false
  );

  const back_left_post = new THREE.Mesh(back_postGeom, woodMat);
  back_left_post.name = "back_left_post";
  back_left_post.scale.x = 0.88;
  back_left_post.position.x = -0.66;
  root.add(back_left_post);

  const back_right_post = new THREE.Mesh(back_postGeom, woodMat);
  back_right_post.name = "back_right_post";
  back_right_post.scale.x = 0.88;
  back_right_post.position.x = 0.66;
  root.add(back_right_post);

  const back_post_capGeom = new THREE.SphereGeometry(0.082, 16, 10);

  const back_left_post_cap = new THREE.Mesh(back_post_capGeom, woodMat);
  back_left_post_cap.name = "back_left_post_cap";
  back_left_post_cap.position.set(-0.66, 2.52, -0.76);
  back_left_post_cap.scale.set(0.86, 1.0, 0.86);
  root.add(back_left_post_cap);

  const back_right_post_cap = new THREE.Mesh(back_post_capGeom, woodMat);
  back_right_post_cap.name = "back_right_post_cap";
  back_right_post_cap.position.set(0.66, 2.52, -0.76);
  back_right_post_cap.scale.set(0.86, 1.0, 0.86);
  root.add(back_right_post_cap);

  const seat_front_railGeom = new THREE.BoxGeometry(1.25, 0.23, 0.11);
  const seat_front_rail = new THREE.Mesh(seat_front_railGeom, woodMat);
  seat_front_rail.name = "seat_front_rail";
  seat_front_rail.position.set(0, 0.70, 0.47);
  root.add(seat_front_rail);

  const seat_rear_railGeom = new THREE.BoxGeometry(1.22, 0.19, 0.10);
  const seat_rear_rail = new THREE.Mesh(seat_rear_railGeom, woodMat);
  seat_rear_rail.name = "seat_rear_rail";
  seat_rear_rail.position.set(0, 0.70, -0.40);
  root.add(seat_rear_rail);

  const seat_side_railGeom = new THREE.BoxGeometry(0.11, 0.20, 0.84);

  const seat_left_rail = new THREE.Mesh(seat_side_railGeom, woodMat);
  seat_left_rail.name = "seat_left_rail";
  seat_left_rail.position.set(-0.61, 0.70, 0.035);
  root.add(seat_left_rail);

  const seat_right_rail = new THREE.Mesh(seat_side_railGeom, woodMat);
  seat_right_rail.name = "seat_right_rail";
  seat_right_rail.position.set(0.61, 0.70, 0.035);
  root.add(seat_right_rail);

  const seat_deckGeom = new THREE.BoxGeometry(1.10, 0.07, 0.77);
  const seat_deck = new THREE.Mesh(seat_deckGeom, darkWoodMat);
  seat_deck.name = "seat_deck";
  seat_deck.position.set(0, 0.80, 0.02);
  root.add(seat_deck);

  const front_stretcher_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.58, 0.43, 0.49),
    new THREE.Vector3(0, 0.40, 0.45),
    new THREE.Vector3(0.58, 0.43, 0.49)
  ], false, "centripetal");
  const front_stretcherGeom = new THREE.TubeGeometry(
    front_stretcher_curve, 20, 0.035, 8, false
  );
  const front_stretcher = new THREE.Mesh(front_stretcherGeom, woodMat);
  front_stretcher.name = "front_stretcher";
  root.add(front_stretcher);

  const rear_stretcher_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.57, 0.40, -0.43),
    new THREE.Vector3(0, 0.37, -0.47),
    new THREE.Vector3(0.57, 0.40, -0.43)
  ], false, "centripetal");
  const rear_stretcherGeom = new THREE.TubeGeometry(
    rear_stretcher_curve, 20, 0.032, 8, false
  );
  const rear_stretcher = new THREE.Mesh(rear_stretcherGeom, darkWoodMat);
  rear_stretcher.name = "rear_stretcher";
  root.add(rear_stretcher);

  const left_side_stretcher = createBeam(
    new THREE.Vector3(-0.60, 0.43, 0.47),
    new THREE.Vector3(-0.60, 0.40, -0.43),
    0.055, 0.055, woodMat
  );
  left_side_stretcher.name = "left_side_stretcher";
  root.add(left_side_stretcher);

  const right_side_stretcher = createBeam(
    new THREE.Vector3(0.60, 0.43, 0.47),
    new THREE.Vector3(0.60, 0.40, -0.43),
    0.055, 0.055, woodMat
  );
  right_side_stretcher.name = "right_side_stretcher";
  root.add(right_side_stretcher);

  const back_lower_railGeom = new THREE.BoxGeometry(1.15, 0.11, 0.09);
  const back_lower_rail = new THREE.Mesh(back_lower_railGeom, darkWoodMat);
  back_lower_rail.name = "back_lower_rail";
  back_lower_rail.position.set(0, 1.08, -0.53);
  root.add(back_lower_rail);

  const crest_railShape = new THREE.Shape();
  crest_railShape.moveTo(-0.57, -0.13);
  crest_railShape.lineTo(0.57, -0.13);
  crest_railShape.lineTo(0.57, 0.11);
  crest_railShape.bezierCurveTo(0.34, 0.10, 0.20, 0.17, 0.00, 0.16);
  crest_railShape.bezierCurveTo(-0.20, 0.17, -0.34, 0.10, -0.57, 0.11);
  crest_railShape.closePath();

  const crest_railGeom = new THREE.ExtrudeGeometry(crest_railShape, {
    depth: 0.10,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  crest_railGeom.translate(0, 0, -0.05);

  const crest_rail = new THREE.Mesh(crest_railGeom, woodMat);
  crest_rail.name = "crest_rail";
  crest_rail.position.set(0, 2.30, -0.72);
  root.add(crest_rail);

  const armrestGeom = roundedExtrudeGeometry(
    armW, 0.78, 0.105, 0.075, 0.018
  );

  const left_armrest = new THREE.Mesh(armrestGeom, woodMat);
  left_armrest.name = "left_armrest";
  left_armrest.rotation.x = Math.PI / 2;
  left_armrest.position.set(-0.68, armH, 0.055);
  root.add(left_armrest);

  const right_armrest = new THREE.Mesh(armrestGeom, woodMat);
  right_armrest.name = "right_armrest";
  right_armrest.rotation.x = Math.PI / 2;
  right_armrest.position.set(0.68, armH, 0.055);
  root.add(right_armrest);

  const seat_cushionGeom = roundedExtrudeGeometry(
    cushionW, 0.82, 0.16, 0.09, 0.028
  );
  const seat_cushion = new THREE.Mesh(seat_cushionGeom, velvetMat);
  seat_cushion.name = "seat_cushion";
  seat_cushion.rotation.x = Math.PI / 2;
  seat_cushion.position.set(0, seatH + cushionH / 2, 0.055);
  root.add(seat_cushion);

  const seat_top_piping_curve = new THREE.CatmullRomCurve3(
    roundedLoopXZ(cushionW - 0.04, 0.78, 1.055, 0.075),
    true, "centripetal"
  );
  const seat_top_pipingGeom = new THREE.TubeGeometry(
    seat_top_piping_curve, 48, 0.012, 7, true
  );
  const seat_top_piping = new THREE.Mesh(seat_top_pipingGeom, seamMat);
  seat_top_piping.name = "seat_top_piping";
  seat_top_piping.position.z = 0.055;
  root.add(seat_top_piping);

  const seat_lower_piping_curve = new THREE.CatmullRomCurve3(
    roundedLoopXZ(cushionW - 0.035, 0.77, 0.845, 0.075),
    true, "centripetal"
  );
  const seat_lower_pipingGeom = new THREE.TubeGeometry(
    seat_lower_piping_curve, 48, 0.010, 7, true
  );
  const seat_lower_piping = new THREE.Mesh(seat_lower_pipingGeom, seamMat);
  seat_lower_piping.name = "seat_lower_piping";
  seat_lower_piping.position.z = 0.055;
  root.add(seat_lower_piping);

  const back_cushion_group = new THREE.Group();
  back_cushion_group.name = "back_cushion_group";
  back_cushion_group.position.set(0, 1.57, -0.40);
  back_cushion_group.rotation.x = -0.15;
  root.add(back_cushion_group);

  const back_cushionGeom = roundedExtrudeGeometry(
    1.05, backH, 0.15, 0.095, 0.027
  );
  const back_cushion = new THREE.Mesh(back_cushionGeom, velvetMat);
  back_cushion.name = "back_cushion";
  back_cushion_group.add(back_cushion);

  const back_piping_curve = new THREE.CatmullRomCurve3(
    roundedLoopXY(1.01, backH - 0.04, 0.108, 0.085),
    true, "centripetal"
  );
  const back_pipingGeom = new THREE.TubeGeometry(
    back_piping_curve, 56, 0.012, 7, true
  );
  const back_piping = new THREE.Mesh(back_pipingGeom, seamMat);
  back_piping.name = "back_piping";
  back_cushion_group.add(back_piping);

  const back_wrinkles = new THREE.Group();
  back_wrinkles.name = "back_wrinkles";
  back_cushion_group.add(back_wrinkles);

  const wrinkle_paths = [
    [
      new THREE.Vector3(-0.39, 0.56, 0.111),
      new THREE.Vector3(-0.35, 0.40, 0.113),
      new THREE.Vector3(-0.31, 0.22, 0.111)
    ],
    [
      new THREE.Vector3(-0.14, 0.59, 0.111),
      new THREE.Vector3(-0.11, 0.38, 0.114),
      new THREE.Vector3(-0.08, 0.16, 0.111)
    ],
    [
      new THREE.Vector3(0.16, 0.57, 0.111),
      new THREE.Vector3(0.12, 0.37, 0.114),
      new THREE.Vector3(0.10, 0.14, 0.111)
    ],
    [
      new THREE.Vector3(0.40, 0.51, 0.111),
      new THREE.Vector3(0.34, 0.32, 0.114),
      new THREE.Vector3(0.29, 0.12, 0.111)
    ],
    [
      new THREE.Vector3(-0.30, -0.49, 0.111),
      new THREE.Vector3(-0.14, -0.43, 0.114),
      new THREE.Vector3(0.02, -0.47, 0.111)
    ],
    [
      new THREE.Vector3(0.08, -0.48, 0.111),
      new THREE.Vector3(0.22, -0.42, 0.114),
      new THREE.Vector3(0.35, -0.48, 0.111)
    ]
  ];

  for (let i = 0; i < wrinkle_paths.length; i++) {
    const wrinkle_curve = new THREE.CatmullRomCurve3(
      wrinkle_paths[i], false, "centripetal"
    );
    const wrinkleGeom = new THREE.TubeGeometry(
      wrinkle_curve, 12, 0.006, 6, false
    );
    const wrinkle = new THREE.Mesh(wrinkleGeom, seamMat);
    wrinkle.name = "back_wrinkle_" + i;
    back_wrinkles.add(wrinkle);
  }

  const hardware_positions = [
    [-0.685, 0.70, 0.525],
    [0.685, 0.70, 0.525],
    [-0.744, 0.55, 0.505],
    [0.744, 0.55, 0.505],
    [-0.744, 1.31, 0.425],
    [0.744, 1.31, 0.425],
    [-0.744, 0.19, 0.67],
    [0.744, 0.19, 0.67],
    [-0.744, 0.19, -0.67],
    [0.744, 0.19, -0.67]
  ];
  const hardwareGeom = new THREE.CylinderGeometry(0.023, 0.023, 0.012, 14);
  const hardware = new THREE.InstancedMesh(
    hardwareGeom, hardwareMat, hardware_positions.length
  );
  hardware.name = "hardware";
  const hardware_dummy = new THREE.Object3D();
  for (let i = 0; i < hardware_positions.length; i++) {
    const p = hardware_positions[i];
    hardware_dummy.position.set(p[0], p[1], p[2]);
    hardware_dummy.rotation.set(0, 0, Math.PI / 2);
    hardware_dummy.scale.set(1, 1, 1);
    hardware_dummy.updateMatrix();
    hardware.setMatrixAt(i, hardware_dummy.matrix);
  }
  hardware.instanceMatrix.needsUpdate = true;
  root.add(hardware);

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