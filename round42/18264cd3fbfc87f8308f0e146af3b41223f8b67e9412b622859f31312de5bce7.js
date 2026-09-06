export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "arcade_cabinet";

  const cabinetW = 1.16;
  const playfieldW = 0.96;
  const playfieldD = 1.48;
  const playfieldAngle = 0.14;

  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const burgundyMat = new THREE.MeshStandardMaterial({
    color: 0x6d2030,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkRedMat = new THREE.MeshStandardMaterial({
    color: 0x35141d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const playfieldMat = new THREE.MeshStandardMaterial({
    color: 0x40343d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const redPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xd8293b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pinkPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xff7195,
    metalness: 0.0,
    roughness: 0.3,
  });
  const creamPlasticMat = new THREE.MeshStandardMaterial({
    color: 0xe6d5a5,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x54a85a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bluePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x277da4,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf45,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xe87935,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd58a62,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x07162a,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x07162a,
    emissiveIntensity: 1.0,
  });

  function makeNeonMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.3,
      emissive: color,
      emissiveIntensity: 1.0,
    });
  }

  const redNeonMat = makeNeonMaterial(0xff3045);
  const pinkNeonMat = makeNeonMaterial(0xff4fc8);
  const yellowNeonMat = makeNeonMaterial(0xffef66);
  const cyanNeonMat = makeNeonMaterial(0x47f5ff);
  const greenNeonMat = makeNeonMaterial(0x42ff83);
  const orangeNeonMat = makeNeonMaterial(0xff9b3d);
  const whiteNeonMat = makeNeonMaterial(0xf5e6ff);

  function addBox(name, w, h, d, mat, x, y, z, parent = root) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addTube(name, points, radius, mat, parent = root, closed = false) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const segments = points.length === 2 ? 4 : Math.max(12, points.length * 6);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, closed),
      mat
    );
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function addNeonLetter(name, char, x, y, z, scale, mat, parent) {
    const letter = new THREE.Group();
    letter.name = name;
    letter.position.set(x, y, z);
    letter.scale.setScalar(scale);

    function stroke(points, closed = false) {
      const vectors = points.map((p) => new THREE.Vector3(p[0], p[1], 0));
      const curve = vectors.length === 2
        ? new THREE.LineCurve3(vectors[0], vectors[1])
        : new THREE.CatmullRomCurve3(vectors, closed, "centripetal");
      const strokeMesh = new THREE.Mesh(
        new THREE.TubeGeometry(
          curve,
          Math.max(4, vectors.length * 5),
          0.055,
          7,
          closed
        ),
        mat
      );
      strokeMesh.name = name + "_stroke_" + letter.children.length;
      letter.add(strokeMesh);
    }

    switch (char) {
      case "A":
        stroke([[0, 0], [0.5, 1]]);
        stroke([[0.5, 1], [1, 0]]);
        stroke([[0.22, 0.43], [0.78, 0.43]]);
        break;
      case "D":
        stroke([[0, 0], [0, 1]]);
        stroke([[0, 1], [0.62, 1], [1, 0.72], [1, 0.28], [0.62, 0], [0, 0]], true);
        break;
      case "E":
        stroke([[0, 0], [0, 1]]);
        stroke([[0, 1], [1, 1]]);
        stroke([[0, 0.5], [0.78, 0.5]]);
        stroke([[0, 0], [1, 0]]);
        break;
      case "G":
        stroke([[0.9, 0.82], [0.68, 1], [0.25, 0.94], [0, 0.58], [0.08, 0.18], [0.35, 0], [0.88, 0.12]]);
        stroke([[0.58, 0.48], [1, 0.48], [1, 0]]);
        break;
      case "I":
        stroke([[0, 1], [1, 1]]);
        stroke([[0.5, 1], [0.5, 0]]);
        stroke([[0, 0], [1, 0]]);
        break;
      case "O":
        stroke([[0.5, 1], [0.12, 0.9], [0, 0.5], [0.12, 0.1], [0.5, 0], [0.88, 0.1], [1, 0.5], [0.88, 0.9], [0.5, 1]], true);
        break;
      case "P":
        stroke([[0, 0], [0, 1]]);
        stroke([[0, 1], [0.65, 1], [1, 0.75], [0.65, 0.52], [0, 0.52]]);
        break;
      case "R":
        stroke([[0, 0], [0, 1]]);
        stroke([[0, 1], [0.65, 1], [1, 0.75], [0.65, 0.52], [0, 0.52]]);
        stroke([[0.55, 0.52], [1, 0]]);
        break;
      case "T":
        stroke([[0, 1], [1, 1]]);
        stroke([[0.5, 1], [0.5, 0]]);
        break;
      case "U":
        stroke([[0, 1], [0, 0.22], [0.2, 0], [0.8, 0], [1, 0.22], [1, 1]]);
        break;
      default:
        stroke([[0, 0], [1, 1]]);
        break;
    }

    parent.add(letter);
    return letter;
  }

  const lower_cabinet = new THREE.Group();
  lower_cabinet.name = "lower_cabinet";
  root.add(lower_cabinet);

  const base_plinth = addBox(
    "base_plinth", 1.08, 0.10, 1.72, blackMat,
    0, 0.07, 0.02, lower_cabinet
  );

  const support_legsGeom = new THREE.BoxGeometry(0.18, 0.28, 0.20);
  const support_legs = new THREE.InstancedMesh(support_legsGeom, blackMat, 4);
  support_legs.name = "support_legs";
  const legDummy = new THREE.Object3D();
  const legPositions = [
    [-0.46, 0.14, 0.78],
    [0.46, 0.14, 0.78],
    [-0.46, 0.14, -0.73],
    [0.46, 0.14, -0.73],
  ];
  for (let i = 0; i < legPositions.length; i++) {
    legDummy.position.set(
      legPositions[i][0],
      legPositions[i][1],
      legPositions[i][2]
    );
    legDummy.updateMatrix();
    support_legs.setMatrixAt(i, legDummy.matrix);
  }
  support_legs.instanceMatrix.needsUpdate = true;
  lower_cabinet.add(support_legs);

  const lower_sideGeom = new THREE.BoxGeometry(0.10, 0.60, 1.70);
  const left_lower_side = new THREE.Mesh(lower_sideGeom, blackMat);
  left_lower_side.name = "left_lower_side";
  left_lower_side.position.set(-0.53, 0.43, 0.02);
  lower_cabinet.add(left_lower_side);

  const right_lower_side = new THREE.Mesh(lower_sideGeom, blackMat);
  right_lower_side.name = "right_lower_side";
  right_lower_side.position.set(0.53, 0.43, 0.02);
  lower_cabinet.add(right_lower_side);

  const side_graphicGeom = new THREE.BoxGeometry(0.012, 0.45, 1.45);
  const left_side_graphic = new THREE.Mesh(side_graphicGeom, burgundyMat);
  left_side_graphic.name = "left_side_graphic";
  left_side_graphic.position.set(-0.586, 0.43, 0.02);
  lower_cabinet.add(left_side_graphic);

  const right_side_graphic = new THREE.Mesh(side_graphicGeom, burgundyMat);
  right_side_graphic.name = "right_side_graphic";
  right_side_graphic.position.set(0.586, 0.43, 0.02);
  lower_cabinet.add(right_side_graphic);

  const front_panel = addBox(
    "front_panel", 1.02, 0.58, 0.08, blackMat,
    0, 0.43, 0.88, lower_cabinet
  );
  const front_graphic = addBox(
    "front_graphic", 0.88, 0.45, 0.012, burgundyMat,
    0, 0.43, 0.926, lower_cabinet
  );

  const front_left_trim = addBox(
    "front_left_trim", 0.055, 0.61, 0.095, brushedMetalMat,
    -0.555, 0.43, 0.88, lower_cabinet
  );
  const front_right_trim = addBox(
    "front_right_trim", 0.055, 0.61, 0.095, brushedMetalMat,
    0.555, 0.43, 0.88, lower_cabinet
  );
  const front_top_trim = addBox(
    "front_top_trim", 1.10, 0.055, 0.10, brushedMetalMat,
    0, 0.735, 0.88, lower_cabinet
  );
  const front_bottom_trim = addBox(
    "front_bottom_trim", 1.08, 0.065, 0.10, rubberMat,
    0, 0.12, 0.88, lower_cabinet
  );

  const front_logo_border = new THREE.Group();
  front_logo_border.name = "front_logo_border";
  lower_cabinet.add(front_logo_border);
  const front_logo_top = addBox(
    "front_logo_top", 0.76, 0.025, 0.018, yellowMat,
    0, 0.595, 0.942, front_logo_border
  );
  const front_logo_bottom = addBox(
    "front_logo_bottom", 0.76, 0.025, 0.018, yellowMat,
    0, 0.275, 0.942, front_logo_border
  );
  const front_logo_left = addBox(
    "front_logo_left", 0.025, 0.34, 0.018, yellowMat,
    -0.38, 0.435, 0.942, front_logo_border
  );
  const front_logo_right = addBox(
    "front_logo_right", 0.025, 0.34, 0.018, yellowMat,
    0.38, 0.435, 0.942, front_logo_border
  );

  const front_logo_red = new THREE.Group();
  front_logo_red.name = "front_logo_red";
  lower_cabinet.add(front_logo_red);
  const front_logo_g = addNeonLetter(
    "front_logo_g", "G", -0.33, 0.32, 0.958, 0.22, redNeonMat, front_logo_red
  );
  const front_logo_i = addNeonLetter(
    "front_logo_i", "I", -0.09, 0.32, 0.958, 0.22, redNeonMat, front_logo_red
  );
  const front_logo_r = addNeonLetter(
    "front_logo_r", "R", 0.13, 0.32, 0.958, 0.22, redNeonMat, front_logo_red
  );

  const front_logo_yellow = new THREE.Group();
  front_logo_yellow.name = "front_logo_yellow";
  lower_cabinet.add(front_logo_yellow);
  const front_logo_o = addNeonLetter(
    "front_logo_o", "O", -0.33, 0.32, 0.966, 0.22, yellowNeonMat, front_logo_yellow
  );
  const front_logo_p = addNeonLetter(
    "front_logo_p", "P", -0.09, 0.32, 0.966, 0.22, yellowNeonMat, front_logo_yellow
  );
  const front_logo_e = addNeonLetter(
    "front_logo_e", "E", 0.13, 0.32, 0.966, 0.22, yellowNeonMat, front_logo_yellow
  );

  const front_coin_slot = addBox(
    "front_coin_slot", 0.18, 0.105, 0.025, rubberMat,
    -0.18, 0.35, 0.972, lower_cabinet
  );
  const front_coin_slot_face = addBox(
    "front_coin_slot_face", 0.12, 0.055, 0.012, darkRedMat,
    -0.18, 0.35, 0.990, lower_cabinet
  );

  const front_screwsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 16);
  const front_screws = new THREE.InstancedMesh(front_screwsGeom, silverMat, 4);
  front_screws.name = "front_screws";
  const frontScrewDummy = new THREE.Object3D();
  const frontScrewPositions = [
    [-0.48, 0.25], [0.48, 0.25],
    [-0.48, 0.61], [0.48, 0.61],
  ];
  for (let i = 0; i < frontScrewPositions.length; i++) {
    frontScrewDummy.position.set(
      frontScrewPositions[i][0],
      frontScrewPositions[i][1],
      0.947
    );
    frontScrewDummy.rotation.set(Math.PI / 2, 0, 0);
    frontScrewDummy.updateMatrix();
    front_screws.setMatrixAt(i, frontScrewDummy.matrix);
  }
  front_screws.instanceMatrix.needsUpdate = true;
  lower_cabinet.add(front_screws);

  const side_screwsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.014, 16);
  const side_screws = new THREE.InstancedMesh(side_screwsGeom, silverMat, 6);
  side_screws.name = "side_screws";
  const sideScrewDummy = new THREE.Object3D();
  let sideScrewIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.58, 0.18, 0.68]) {
      sideScrewDummy.position.set(side * 0.594, 0.55, z);
      sideScrewDummy.rotation.set(0, 0, Math.PI / 2);
      sideScrewDummy.updateMatrix();
      side_screws.setMatrixAt(sideScrewIndex++, sideScrewDummy.matrix);
    }
  }
  side_screws.instanceMatrix.needsUpdate = true;
  lower_cabinet.add(side_screws);

  const side_character = new THREE.Group();
  side_character.name = "side_character";
  lower_cabinet.add(side_character);

  const side_character_bodyShape = new THREE.Shape();
  side_character_bodyShape.moveTo(-0.10, 0.16);
  side_character_bodyShape.lineTo(0.10, 0.16);
  side_character_bodyShape.lineTo(0.13, -0.10);
  side_character_bodyShape.lineTo(-0.12, -0.10);
  side_character_bodyShape.closePath();
  const side_character_bodyGeom = new THREE.ShapeGeometry(side_character_bodyShape);
  const side_character_body = new THREE.Mesh(side_character_bodyGeom, bluePlasticMat);
  side_character_body.name = "side_character_body";
  side_character_body.rotation.y = Math.PI / 2;
  side_character_body.position.set(0.598, 0.45, -0.43);
  side_character.add(side_character_body);

  const side_character_headGeom = new THREE.CircleGeometry(0.075, 20);
  const side_character_head = new THREE.Mesh(side_character_headGeom, skinMat);
  side_character_head.name = "side_character_head";
  side_character_head.rotation.y = Math.PI / 2;
  side_character_head.position.set(0.599, 0.61, -0.43);
  side_character.add(side_character_head);

  const side_character_hat = addBox(
    "side_character_hat", 0.012, 0.025, 0.17, redPlasticMat,
    0.603, 0.675, -0.43, side_character
  );
  const side_character_arm = addTube(
    "side_character_arm",
    [
      new THREE.Vector3(0.604, 0.52, -0.35),
      new THREE.Vector3(0.604, 0.43, -0.24),
      new THREE.Vector3(0.604, 0.34, -0.12),
    ],
    0.018,
    skinMat,
    side_character
  );
  const side_character_legs = addTube(
    "side_character_legs",
    [
      new THREE.Vector3(0.604, 0.35, -0.43),
      new THREE.Vector3(0.604, 0.24, -0.34),
      new THREE.Vector3(0.604, 0.20, -0.20),
    ],
    0.018,
    greenPlasticMat,
    side_character
  );

  const playfield_group = new THREE.Group();
  playfield_group.name = "playfield_group";
  playfield_group.position.set(0, 0.76, 0.02);
  playfield_group.rotation.x = playfieldAngle;
  root.add(playfield_group);

  const playfield_base = addBox(
    "playfield_base", 1.04, 0.08, 1.54, blackMat,
    0, -0.025, 0, playfield_group
  );
  const playfield_surface = addBox(
    "playfield_surface", playfieldW, 0.025, playfieldD, playfieldMat,
    0, 0.022, 0, playfield_group
  );

  const playfield_left_wall = addBox(
    "playfield_left_wall", 0.035, 0.10, 1.50, rubberMat,
    -0.505, 0.065, 0, playfield_group
  );
  const playfield_right_wall = addBox(
    "playfield_right_wall", 0.035, 0.10, 1.50, rubberMat,
    0.505, 0.065, 0, playfield_group
  );
  const playfield_front_wall = addBox(
    "playfield_front_wall", 1.01, 0.10, 0.04, rubberMat,
    0, 0.065, 0.755, playfield_group
  );
  const playfield_back_wall = addBox(
    "playfield_back_wall", 1.01, 0.10, 0.04, rubberMat,
    0, 0.065, -0.755, playfield_group
  );

  const playfield_left_rail = addBox(
    "playfield_left_rail", 0.035, 0.035, 1.55, brushedMetalMat,
    -0.525, 0.125, 0, playfield_group
  );
  const playfield_right_rail = addBox(
    "playfield_right_rail", 0.035, 0.035, 1.55, brushedMetalMat,
    0.525, 0.125, 0, playfield_group
  );
  const playfield_front_rail = addBox(
    "playfield_front_rail", 1.09, 0.04, 0.045, brushedMetalMat,
    0, 0.125, 0.78, playfield_group
  );
  const playfield_back_rail = addBox(
    "playfield_back_rail", 1.09, 0.04, 0.045, brushedMetalMat,
    0, 0.125, -0.78, playfield_group
  );

  const playfield_graphics = new THREE.Group();
  playfield_graphics.name = "playfield_graphics";
  playfield_group.add(playfield_graphics);

  const playfield_ringGeom = new THREE.RingGeometry(0.075, 0.088, 28);
  const playfield_ring_left = new THREE.Mesh(playfield_ringGeom, yellowMat);
  playfield_ring_left.name = "playfield_ring_left";
  playfield_ring_left.rotation.x = -Math.PI / 2;
  playfield_ring_left.position.set(-0.19, 0.043, 0.05);
  playfield_graphics.add(playfield_ring_left);

  const playfield_ring_right = new THREE.Mesh(playfield_ringGeom, greenPlasticMat);
  playfield_ring_right.name = "playfield_ring_right";
  playfield_ring_right.rotation.x = -Math.PI / 2;
  playfield_ring_right.position.set(0.18, 0.044, -0.02);
  playfield_graphics.add(playfield_ring_right);

  const playfield_line_left = addTube(
    "playfield_line_left",
    [
      new THREE.Vector3(-0.40, 0.045, 0.55),
      new THREE.Vector3(-0.12, 0.045, 0.18),
      new THREE.Vector3(0.12, 0.045, -0.18),
      new THREE.Vector3(0.38, 0.045, -0.50),
    ],
    0.006,
    yellowMat,
    playfield_graphics
  );
  const playfield_line_right = addTube(
    "playfield_line_right",
    [
      new THREE.Vector3(0.39, 0.046, 0.52),
      new THREE.Vector3(0.12, 0.046, 0.22),
      new THREE.Vector3(-0.14, 0.046, -0.12),
      new THREE.Vector3(-0.38, 0.046, -0.48),
    ],
    0.006,
    greenPlasticMat,
    playfield_graphics
  );
  const playfield_center_loop = addTube(
    "playfield_center_loop",
    [
      new THREE.Vector3(-0.15, 0.047, 0.03),
      new THREE.Vector3(-0.06, 0.047, 0.14),
      new THREE.Vector3(0.08, 0.047, 0.13),
      new THREE.Vector3(0.16, 0.047, 0.02),
      new THREE.Vector3(0.07, 0.047, -0.09),
      new THREE.Vector3(-0.08, 0.047, -0.08),
    ],
    0.006,
    orangeMat,
    playfield_graphics,
    true
  );

  const playfield_laser_red = addTube(
    "playfield_laser_red",
    [
      new THREE.Vector3(-0.42, 0.145, 0.58),
      new THREE.Vector3(-0.10, 0.145, 0.24),
      new THREE.Vector3(0.18, 0.145, -0.10),
      new THREE.Vector3(0.42, 0.145, -0.50),
    ],
    0.008,
    redNeonMat,
    playfield_group
  );
  const playfield_laser_cyan = addTube(
    "playfield_laser_cyan",
    [
      new THREE.Vector3(0.40, 0.158, 0.58),
      new THREE.Vector3(0.12, 0.158, 0.28),
      new THREE.Vector3(-0.16, 0.158, -0.08),
      new THREE.Vector3(-0.40, 0.158, -0.50),
    ],
    0.008,
    cyanNeonMat,
    playfield_group
  );
  const playfield_laser_pink = addTube(
    "playfield_laser_pink",
    [
      new THREE.Vector3(-0.38, 0.171, -0.50),
      new THREE.Vector3(-0.10, 0.171, -0.18),
      new THREE.Vector3(0.15, 0.171, 0.10),
      new THREE.Vector3(0.39, 0.171, 0.44),
    ],
    0.008,
    pinkNeonMat,
    playfield_group
  );
  const playfield_laser_orange = addTube(
    "playfield_laser_orange",
    [
      new THREE.Vector3(-0.39, 0.132, -0.38),
      new THREE.Vector3(-0.08, 0.132, -0.10),
      new THREE.Vector3(0.20, 0.132, 0.18),
      new THREE.Vector3(0.39, 0.132, 0.35),
    ],
    0.007,
    orangeNeonMat,
    playfield_group
  );

  const pegPositions = [
    [-0.36, -0.55], [0.00, -0.58], [0.36, -0.52],
    [-0.42, -0.20], [0.28, -0.25],
    [-0.24, 0.02], [0.06, -0.02], [0.42, 0.02],
    [-0.42, 0.30], [0.22, 0.25],
    [-0.28, 0.55], [0.04, 0.52], [0.38, 0.50],
  ];
  const pinkPegPositions = [
    [0.00, -0.58],
    [0.28, -0.25],
    [0.42, 0.02],
    [0.22, 0.25],
    [0.04, 0.52],
  ];

  const playfield_pegsGeom = new THREE.CylinderGeometry(0.024, 0.034, 0.13, 14);
  const playfield_pegs = new THREE.InstancedMesh(
    playfield_pegsGeom,
    pinkPlasticMat,
    pinkPegPositions.length
  );
  playfield_pegs.name = "playfield_pegs";
  const pinkPegDummy = new THREE.Object3D();
  for (let i = 0; i < pinkPegPositions.length; i++) {
    pinkPegDummy.position.set(
      pinkPegPositions[i][0],
      0.105,
      pinkPegPositions[i][1]
    );
    pinkPegDummy.rotation.set(0, 0, 0);
    pinkPegDummy.updateMatrix();
    playfield_pegs.setMatrixAt(i, pinkPegDummy.matrix);
  }
  playfield_pegs.instanceMatrix.needsUpdate = true;
  playfield_group.add(playfield_pegs);

  const playfield_cream_pegs = new THREE.InstancedMesh(
    playfield_pegsGeom,
    creamPlasticMat,
    8
  );
  playfield_cream_pegs.name = "playfield_cream_pegs";
  const creamPegDummy = new THREE.Object3D();
  let creamPegIndex = 0;
  for (const p of pegPositions) {
    let isPink = false;
    for (const q of pinkPegPositions) {
      if (p[0] === q[0] && p[1] === q[1]) isPink = true;
    }
    if (!isPink) {
      creamPegDummy.position.set(p[0], 0.105, p[1]);
      creamPegDummy.rotation.set(0, 0, 0);
      creamPegDummy.updateMatrix();
      playfield_cream_pegs.setMatrixAt(creamPegIndex++, creamPegDummy.matrix);
    }
  }
  playfield_cream_pegs.instanceMatrix.needsUpdate = true;
  playfield_group.add(playfield_cream_pegs);

  const peg_top_lightsGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const peg_top_lights = new THREE.InstancedMesh(
    peg_top_lightsGeom,
    whiteNeonMat,
    pegPositions.length
  );
  peg_top_lights.name = "peg_top_lights";
  const pegLightDummy = new THREE.Object3D();
  for (let i = 0; i < pegPositions.length; i++) {
    pegLightDummy.position.set(pegPositions[i][0], 0.174, pegPositions[i][1]);
    pegLightDummy.updateMatrix();
    peg_top_lights.setMatrixAt(i, pegLightDummy.matrix);
  }
  peg_top_lights.instanceMatrix.needsUpdate = true;
  playfield_group.add(peg_top_lights);

  const playfield_lightsGeom = new THREE.SphereGeometry(0.022, 12, 8);
  const playfield_red_lights = new THREE.InstancedMesh(
    playfield_lightsGeom, redNeonMat, 4
  );
  playfield_red_lights.name = "playfield_red_lights";
  const playfield_green_lights = new THREE.InstancedMesh(
    playfield_lightsGeom, greenNeonMat, 4
  );
  playfield_green_lights.name = "playfield_green_lights";
  const playfield_cyan_lights = new THREE.InstancedMesh(
    playfield_lightsGeom, cyanNeonMat, 4
  );
  playfield_cyan_lights.name = "playfield_cyan_lights";

  const fieldLightDummy = new THREE.Object3D();
  let redLightIndex = 0;
  let greenLightIndex = 0;
  let cyanLightIndex = 0;
  for (let i = 0; i < 12; i++) {
    const x = -0.34 + (i % 4) * 0.225;
    const z = -0.45 + Math.floor(i / 4) * 0.45;
    fieldLightDummy.position.set(x, 0.062, z);
    fieldLightDummy.updateMatrix();
    if (i % 3 === 0) {
      playfield_red_lights.setMatrixAt(redLightIndex++, fieldLightDummy.matrix);
    } else if (i % 3 === 1) {
      playfield_green_lights.setMatrixAt(greenLightIndex++, fieldLightDummy.matrix);
    } else {
      playfield_cyan_lights.setMatrixAt(cyanLightIndex++, fieldLightDummy.matrix);
    }
  }
  playfield_red_lights.instanceMatrix.needsUpdate = true;
  playfield_green_lights.instanceMatrix.needsUpdate = true;
  playfield_cyan_lights.instanceMatrix.needsUpdate = true;
  playfield_group.add(
    playfield_red_lights,
    playfield_green_lights,
    playfield_cyan_lights
  );

  const joystickBaseGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 18);
  const joystickStemGeom = new THREE.CylinderGeometry(0.012, 0.014, 0.10, 12);
  const joystickBallGeom = new THREE.SphereGeometry(0.042, 16, 10);

  const left_joystick_base = new THREE.Mesh(joystickBaseGeom, rubberMat);
  left_joystick_base.name = "left_joystick_base";
  left_joystick_base.position.set(-0.32, 0.075, 0.62);
  playfield_group.add(left_joystick_base);

  const left_joystick_stem = new THREE.Mesh(joystickStemGeom, silverMat);
  left_joystick_stem.name = "left_joystick_stem";
  left_joystick_stem.position.set(-0.32, 0.13, 0.62);
  playfield_group.add(left_joystick_stem);

  const left_joystick_ball = new THREE.Mesh(joystickBallGeom, redPlasticMat);
  left_joystick_ball.name = "left_joystick_ball";
  left_joystick_ball.position.set(-0.32, 0.19, 0.62);
  playfield_group.add(left_joystick_ball);

  const right_joystick_base = new THREE.Mesh(joystickBaseGeom, rubberMat);
  right_joystick_base.name = "right_joystick_base";
  right_joystick_base.position.set(-0.08, 0.075, 0.63);
  playfield_group.add(right_joystick_base);

  const right_joystick_stem = new THREE.Mesh(joystickStemGeom, silverMat);
  right_joystick_stem.name = "right_joystick_stem";
  right_joystick_stem.position.set(-0.08, 0.13, 0.63);
  playfield_group.add(right_joystick_stem);

  const right_joystick_ball = new THREE.Mesh(joystickBallGeom, rubberMat);
  right_joystick_ball.name = "right_joystick_ball";
  right_joystick_ball.position.set(-0.08, 0.19, 0.63);
  playfield_group.add(right_joystick_ball);

  const left_action_button_base = addBox(
    "left_action_button_base", 0.13, 0.025, 0.085, silverMat,
    0.16, 0.071, 0.64, playfield_group
  );
  const left_action_button = addBox(
    "left_action_button", 0.075, 0.035, 0.055, redPlasticMat,
    0.16, 0.101, 0.64, playfield_group
  );
  const right_action_button_base = addBox(
    "right_action_button_base", 0.13, 0.025, 0.085, silverMat,
    0.34, 0.071, 0.64, playfield_group
  );
  const right_action_button = addBox(
    "right_action_button", 0.075, 0.035, 0.055, greenPlasticMat,
    0.34, 0.101, 0.64, playfield_group
  );

  const playfield_instruction = addBox(
    "playfield_instruction", 0.22, 0.012, 0.11, darkRedMat,
    -0.36, 0.052, 0.48, playfield_group
  );
  const playfield_instruction_line_1 = addBox(
    "playfield_instruction_line_1", 0.16, 0.008, 0.012, yellowMat,
    -0.36, 0.061, 0.455, playfield_group
  );
  const playfield_instruction_line_2 = addBox(
    "playfield_instruction_line_2", 0.13, 0.008, 0.012, creamPlasticMat,
    -0.36, 0.061, 0.482, playfield_group
  );
  const playfield_instruction_line_3 = addBox(
    "playfield_instruction_line_3", 0.10, 0.008, 0.012, yellowMat,
    -0.36, 0.061, 0.509, playfield_group
  );

  const upper_back_group = new THREE.Group();
  upper_back_group.name = "upper_back_group";
  root.add(upper_back_group);

  const upper_back_shellShape = new THREE.Shape();
  upper_back_shellShape.moveTo(-0.60, 0.66);
  upper_back_shellShape.bezierCurveTo(-0.72, 0.84, -0.78, 1.02, -0.70, 1.22);
  upper_back_shellShape.lineTo(-0.66, 1.72);
  upper_back_shellShape.lineTo(0.02, 1.92);
  upper_back_shellShape.lineTo(0.68, 1.72);
  upper_back_shellShape.lineTo(0.67, 0.66);
  upper_back_shellShape.closePath();

  const upper_back_shellGeom = new THREE.ExtrudeGeometry(
    upper_back_shellShape,
    {
      depth: 0.16,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.012,
      bevelSegments: 2,
    }
  );
  const upper_back_shell = new THREE.Mesh(upper_back_shellGeom, blackMat);
  upper_back_shell.name = "upper_back_shell";
  upper_back_shell.position.z = -0.91;
  upper_back_group.add(upper_back_shell);

  const upper_inner_panel = addBox(
    "upper_inner_panel", 0.98, 0.72, 0.025, darkRedMat,
    0, 1.20, -0.715, upper_back_group
  );
  const upper_inner_left_trim = addBox(
    "upper_inner_left_trim", 0.045, 0.78, 0.045, brushedMetalMat,
    -0.505, 1.20, -0.685, upper_back_group
  );
  const upper_inner_right_trim = addBox(
    "upper_inner_right_trim", 0.045, 0.78, 0.045, brushedMetalMat,
    0.505, 1.20, -0.685, upper_back_group
  );

  const upper_shell_sideShape = new THREE.Shape();
  upper_shell_sideShape.moveTo(0.78, 0.67);
  upper_shell_sideShape.lineTo(0.78, 1.69);
  upper_shell_sideShape.lineTo(0.02, 1.90);
  upper_shell_sideShape.lineTo(-0.64, 1.73);
  upper_shell_sideShape.bezierCurveTo(-0.77, 1.48, -0.78, 1.03, -0.60, 0.67);
  upper_shell_sideShape.closePath();

  const upper_shell_sideGeom = new THREE.ShapeGeometry(upper_shell_sideShape);
  const left_upper_shell_panel = new THREE.Mesh(upper_shell_sideGeom, blackMat);
  left_upper_shell_panel.name = "left_upper_shell_panel";
  left_upper_shell_panel.rotation.y = Math.PI / 2;
  left_upper_shell_panel.position.x = -0.685;
  upper_back_group.add(left_upper_shell_panel);

  const right_upper_shell_panel = new THREE.Mesh(upper_shell_sideGeom, blackMat);
  right_upper_shell_panel.name = "right_upper_shell_panel";
  right_upper_shell_panel.rotation.y = Math.PI / 2;
  right_upper_shell_panel.position.x = 0.685;
  upper_back_group.add(right_upper_shell_panel);

  const upper_side_graphicGeom = new THREE.PlaneGeometry(1.36, 0.72);
  const left_upper_side_graphic = new THREE.Mesh(
    upper_side_graphicGeom,
    burgundyMat
  );
  left_upper_side_graphic.name = "left_upper_side_graphic";
  left_upper_side_graphic.rotation.y = Math.PI / 2;
  left_upper_side_graphic.position.set(-0.692, 1.18, -0.04);
  upper_back_group.add(left_upper_side_graphic);

  const right_upper_side_graphic = new THREE.Mesh(
    upper_side_graphicGeom,
    burgundyMat
  );
  right_upper_side_graphic.name = "right_upper_side_graphic";
  right_upper_side_graphic.rotation.y = Math.PI / 2;
  right_upper_side_graphic.position.set(0.692, 1.18, -0.04);
  upper_back_group.add(right_upper_side_graphic);

  const upper_shell_top_trim = addTube(
    "upper_shell_top_trim",
    [
      new THREE.Vector3(-0.67, 1.72, -0.69),
      new THREE.Vector3(0, 1.92, -0.69),
      new THREE.Vector3(0.68, 1.72, -0.69),
    ],
    0.025,
    brushedMetalMat,
    upper_back_group
  );
  const left_upper_shell_edge = addTube(
    "left_upper_shell_edge",
    [
      new THREE.Vector3(-0.69, 0.68, -0.61),
      new THREE.Vector3(-0.69, 0.94, -0.73),
      new THREE.Vector3(-0.69, 1.22, -0.70),
      new THREE.Vector3(-0.69, 1.70, -0.66),
    ],
    0.022,
    brushedMetalMat,
    upper_back_group
  );
  const right_upper_shell_edge = addTube(
    "right_upper_shell_edge",
    [
      new THREE.Vector3(0.69, 0.68, -0.61),
      new THREE.Vector3(0.69, 0.94, -0.73),
      new THREE.Vector3(0.69, 1.22, -0.70),
      new THREE.Vector3(0.69, 1.70, -0.66),
    ],
    0.022,
    brushedMetalMat,
    upper_back_group
  );

  const upper_side_character_bodyShape = new THREE.Shape();
  upper_side_character_bodyShape.moveTo(-0.11, 0.18);
  upper_side_character_bodyShape.lineTo(0.11, 0.18);
  upper_side_character_bodyShape.lineTo(0.14, -0.13);
  upper_side_character_bodyShape.lineTo(-0.13, -0.13);
  upper_side_character_bodyShape.closePath();
  const upper_side_character_bodyGeom = new THREE.ShapeGeometry(
    upper_side_character_bodyShape
  );
  const upper_side_character_body = new THREE.Mesh(
    upper_side_character_bodyGeom,
    bluePlasticMat
  );
  upper_side_character_body.name = "upper_side_character_body";
  upper_side_character_body.rotation.y = Math.PI / 2;
  upper_side_character_body.position.set(0.704, 1.25, -0.16);
  upper_back_group.add(upper_side_character_body);

  const upper_side_character_headGeom = new THREE.CircleGeometry(0.09, 20);
  const upper_side_character_head = new THREE.Mesh(
    upper_side_character_headGeom,
    skinMat
  );
  upper_side_character_head.name = "upper_side_character_head";
  upper_side_character_head.rotation.y = Math.PI / 2;
  upper_side_character_head.position.set(0.706, 1.46, -0.16);
  upper_back_group.add(upper_side_character_head);

  const upper_side_character_hat = addBox(
    "upper_side_character_hat", 0.014, 0.035, 0.20, redPlasticMat,
    0.710, 1.545, -0.16, upper_back_group
  );
  const upper_side_character_arm = addTube(
    "upper_side_character_arm",
    [
      new THREE.Vector3(0.710, 1.34, -0.07),
      new THREE.Vector3(0.710, 1.20, 0.05),
      new THREE.Vector3(0.710, 1.05, 0.16),
    ],
    0.022,
    skinMat,
    upper_back_group
  );
  const upper_side_character_legs = addTube(
    "upper_side_character_legs",
    [
      new THREE.Vector3(0.710, 1.12, -0.16),
      new THREE.Vector3(0.710, 0.94, -0.04),
      new THREE.Vector3(0.710, 0.82, 0.10),
    ],
    0.022,
    greenPlasticMat,
    upper_back_group
  );
  const upper_side_character_staff = addTube(
    "upper_side_character_staff",
    [
      new THREE.Vector3(0.715, 0.82, -0.38),
      new THREE.Vector3(0.715, 1.05, -0.18),
      new THREE.Vector3(0.715, 1.31, 0.03),
    ],
    0.012,
    yellowMat,
    upper_back_group
  );

  const marquee_group = new THREE.Group();
  marquee_group.name = "marquee_group";
  marquee_group.position.set(0, 1.58, -0.60);
  marquee_group.rotation.x = -0.32;
  root.add(marquee_group);

  const marquee_frame = addBox(
    "marquee_frame", 1.12, 0.50, 0.075, rubberMat,
    0, 0, 0, marquee_group
  );
  const marquee_sign = addBox(
    "marquee_sign", 1.00, 0.39, 0.025, darkRedMat,
    0, 0, 0.052, marquee_group
  );

  const marquee_top_border = addBox(
    "marquee_top_border", 1.08, 0.035, 0.035, brushedMetalMat,
    0, 0.235, 0.065, marquee_group
  );
  const marquee_bottom_border = addBox(
    "marquee_bottom_border", 1.08, 0.035, 0.035, brushedMetalMat,
    0, -0.235, 0.065, marquee_group
  );
  const marquee_left_border = addBox(
    "marquee_left_border", 0.035, 0.46, 0.035, brushedMetalMat,
    -0.54, 0, 0.065, marquee_group
  );
  const marquee_right_border = addBox(
    "marquee_right_border", 0.035, 0.46, 0.035, brushedMetalMat,
    0.54, 0, 0.065, marquee_group
  );

  const marquee_neon_top = addBox(
    "marquee_neon_top", 0.92, 0.012, 0.012, pinkNeonMat,
    0, 0.175, 0.082, marquee_group
  );
  const marquee_neon_bottom = addBox(
    "marquee_neon_bottom", 0.92, 0.012, 0.012, cyanNeonMat,
    0, -0.175, 0.082, marquee_group
  );

  const marquee_logo = new THREE.Group();
  marquee_logo.name = "marquee_logo";
  marquee_group.add(marquee_logo);
  const marquee_letters = ["D", "U", "R", "I", "O", "D"];
  for (let i = 0; i < marquee_letters.length; i++) {
    const mat = i % 3 === 0
      ? whiteNeonMat
      : (i % 2 === 0 ? yellowNeonMat : redNeonMat);
    addNeonLetter(
      "marquee_letter_" + i,
      marquee_letters[i],
      -0.37 + i * 0.148,
      -0.105,
      0.092,
      0.19,
      mat,
      marquee_logo
    );
  }

  const marquee_character_headGeom = new THREE.CircleGeometry(0.045, 16);
  const marquee_character_head = new THREE.Mesh(
    marquee_character_headGeom,
    skinMat
  );
  marquee_character_head.name = "marquee_character_head";
  marquee_character_head.position.set(0.43, 0.08, 0.094);
  marquee_group.add(marquee_character_head);

  const marquee_character_body = addBox(
    "marquee_character_body", 0.075, 0.13, 0.012, bluePlasticMat,
    0.43, -0.015, 0.094, marquee_group
  );
  const marquee_character_hat = addBox(
    "marquee_character_hat", 0.11, 0.022, 0.014, redPlasticMat,
    0.43, 0.135, 0.095, marquee_group
  );

  const console_group = new THREE.Group();
  console_group.name = "console_group";
  console_group.position.set(0, 0.94, -0.43);
  console_group.rotation.x = 0.32;
  root.add(console_group);

  const console_deck = addBox(
    "console_deck", 0.98, 0.075, 0.56, blackMat,
    0, 0, 0, console_group
  );
  const console_front_lip = addBox(
    "console_front_lip", 1.00, 0.14, 0.07, darkRedMat,
    0, -0.035, 0.285, console_group
  );
  const console_control_panel = addBox(
    "console_control_panel", 0.78, 0.025, 0.34, darkRedMat,
    0, 0.055, 0.08, console_group
  );

  const console_buttonsGeom = new THREE.BoxGeometry(0.055, 0.022, 0.045);
  const console_red_buttons = new THREE.InstancedMesh(
    console_buttonsGeom, redPlasticMat, 6
  );
  console_red_buttons.name = "console_red_buttons";
  const console_green_buttons = new THREE.InstancedMesh(
    console_buttonsGeom, greenPlasticMat, 6
  );
  console_green_buttons.name = "console_green_buttons";
  const console_blue_buttons = new THREE.InstancedMesh(
    console_buttonsGeom, bluePlasticMat, 6
  );
  console_blue_buttons.name = "console_blue_buttons";

  const consoleButtonDummy = new THREE.Object3D();
  let redButtonIndex = 0;
  let greenButtonIndex = 0;
  let blueButtonIndex = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 6; col++) {
      consoleButtonDummy.position.set(
        -0.31 + col * 0.124,
        0.082,
        -0.015 + row * 0.085
      );
      consoleButtonDummy.rotation.set(0, 0, 0);
      consoleButtonDummy.updateMatrix();
      if ((row + col) % 3 === 0) {
        console_red_buttons.setMatrixAt(redButtonIndex++, consoleButtonDummy.matrix);
      } else if ((row + col) % 3 === 1) {
        console_green_buttons.setMatrixAt(greenButtonIndex++, consoleButtonDummy.matrix);
      } else {
        console_blue_buttons.setMatrixAt(blueButtonIndex++, consoleButtonDummy.matrix);
      }
    }
  }
  console_red_buttons.instanceMatrix.needsUpdate = true;
  console_green_buttons.instanceMatrix.needsUpdate = true;
  console_blue_buttons.instanceMatrix.needsUpdate = true;
  console_group.add(
    console_red_buttons,
    console_green_buttons,
    console_blue_buttons
  );

  const console_left_knob_base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.065, 0.025, 18),
    silverMat
  );
  console_left_knob_base.name = "console_left_knob_base";
  console_left_knob_base.position.set(-0.40, 0.075, -0.12);
  console_group.add(console_left_knob_base);

  const console_left_knob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.040, 0.045, 0.065, 16),
    redPlasticMat
  );
  console_left_knob.name = "console_left_knob";
  console_left_knob.position.set(-0.40, 0.115, -0.12);
  console_group.add(console_left_knob);

  const console_right_knob_base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.065, 0.025, 18),
    silverMat
  );
  console_right_knob_base.name = "console_right_knob_base";
  console_right_knob_base.position.set(0.40, 0.075, -0.12);
  console_group.add(console_right_knob_base);

  const console_right_knob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.040, 0.045, 0.065, 16),
    rubberMat
  );
  console_right_knob.name = "console_right_knob";
  console_right_knob.position.set(0.40, 0.115, -0.12);
  console_group.add(console_right_knob);

  const console_screen_frame = addBox(
    "console_screen_frame", 0.62, 0.055, 0.25, rubberMat,
    0, 0.99, -0.655, root
  );
  const console_screen = addBox(
    "console_screen", 0.54, 0.025, 0.19, screenMat,
    0, 1.025, -0.655, root
  );
  const console_screen_skyline = addBox(
    "console_screen_skyline", 0.48, 0.012, 0.055, bluePlasticMat,
    0, 1.044, -0.625, root
  );
  const console_screen_star = new THREE.Mesh(
    new THREE.SphereGeometry(0.035, 12, 8),
    cyanNeonMat
  );
  console_screen_star.name = "console_screen_star";
  console_screen_star.position.set(-0.12, 1.048, -0.68);
  root.add(console_screen_star);

  const console_screen_lightsGeom = new THREE.BoxGeometry(0.035, 0.012, 0.03);
  const console_screen_lights = new THREE.InstancedMesh(
    console_screen_lightsGeom,
    yellowNeonMat,
    5
  );
  console_screen_lights.name = "console_screen_lights";
  const screenLightDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    screenLightDummy.position.set(0.05 + i * 0.055, 1.053, -0.61);
    screenLightDummy.updateMatrix();
    console_screen_lights.setMatrixAt(i, screenLightDummy.matrix);
  }
  console_screen_lights.instanceMatrix.needsUpdate = true;
  root.add(console_screen_lights);

  const upper_round_emblem = new THREE.Group();
  upper_round_emblem.name = "upper_round_emblem";
  root.add(upper_round_emblem);

  const emblem_outer_disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.16, 0.025, 28),
    rubberMat
  );
  emblem_outer_disc.name = "emblem_outer_disc";
  emblem_outer_disc.rotation.x = Math.PI / 2;
  emblem_outer_disc.position.set(-0.27, 1.10, -0.695);
  upper_round_emblem.add(emblem_outer_disc);

  const emblem_inner_disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.105, 0.105, 0.03, 28),
    darkRedMat
  );
  emblem_inner_disc.name = "emblem_inner_disc";
  emblem_inner_disc.rotation.x = Math.PI / 2;
  emblem_inner_disc.position.set(-0.27, 1.10, -0.680);
  upper_round_emblem.add(emblem_inner_disc);

  const emblem_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.125, 0.012, 10, 30),
    redNeonMat
  );
  emblem_ring.name = "emblem_ring";
  emblem_ring.position.set(-0.27, 1.10, -0.660);
  upper_round_emblem.add(emblem_ring);

  const emblem_center = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.035, 18),
    pinkNeonMat
  );
  emblem_center.name = "emblem_center";
  emblem_center.rotation.x = Math.PI / 2;
  emblem_center.position.set(-0.27, 1.10, -0.655);
  upper_round_emblem.add(emblem_center);

  const upper_status_box = addBox(
    "upper_status_box", 0.18, 0.14, 0.13, redPlasticMat,
    0.28, 0.88, -0.57, root
  );
  const upper_status_box_top = addBox(
    "upper_status_box_top", 0.15, 0.025, 0.10, redNeonMat,
    0.28, 0.96, -0.57, root
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