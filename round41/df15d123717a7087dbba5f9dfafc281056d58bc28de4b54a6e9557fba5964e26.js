export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "royal_cake";

  const cake_boardMat = new THREE.MeshStandardMaterial({
    color: 0x0750b8,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cake_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0864d3,
    metalness: 0.0,
    roughness: 0.55,
  });
  const gold_leafMat = new THREE.MeshStandardMaterial({
    color: 0xd9a936,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const antique_gold_leafMat = new THREE.MeshStandardMaterial({
    color: 0xb98227,
    metalness: 0.45,
    roughness: 0.38,
    side: THREE.DoubleSide,
  });
  const leaf_veinMat = new THREE.MeshStandardMaterial({
    color: 0x8f641d,
    metalness: 0.4,
    roughness: 0.4,
  });
  const polished_goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const dark_goldMat = new THREE.MeshStandardMaterial({
    color: 0x9b6d18,
    metalness: 0.55,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const pearlMat = new THREE.MeshStandardMaterial({
    color: 0xe8e5d8,
    metalness: 0.0,
    roughness: 0.4,
  });
  const turquoiseMat = new THREE.MeshStandardMaterial({
    color: 0x69c9b3,
    metalness: 0.0,
    roughness: 0.4,
  });
  const rubyMat = new THREE.MeshStandardMaterial({
    color: 0xb84332,
    metalness: 0.0,
    roughness: 0.4,
  });

  const cake_boardGeom = new THREE.CylinderGeometry(1.68, 1.68, 0.16, 64);
  const cake_board = new THREE.Mesh(cake_boardGeom, cake_boardMat);
  cake_board.name = "cake_board";
  cake_board.position.y = 0.08;
  root.add(cake_board);

  const cake_board_topGeom = new THREE.CylinderGeometry(1.62, 1.66, 0.045, 64);
  const cake_board_top = new THREE.Mesh(cake_board_topGeom, cake_boardMat);
  cake_board_top.name = "cake_board_top";
  cake_board_top.position.y = 0.17;
  root.add(cake_board_top);

  const cake_board_rimGeom = new THREE.TorusGeometry(1.62, 0.045, 12, 64);
  const cake_board_rim = new THREE.Mesh(cake_board_rimGeom, cake_boardMat);
  cake_board_rim.name = "cake_board_rim";
  cake_board_rim.rotation.x = Math.PI / 2;
  cake_board_rim.position.y = 0.17;
  root.add(cake_board_rim);

  const cake_bodyProfile = [
    new THREE.Vector2(0.00, 0.18),
    new THREE.Vector2(1.38, 0.18),
    new THREE.Vector2(1.46, 0.20),
    new THREE.Vector2(1.50, 0.27),
    new THREE.Vector2(1.51, 0.38),
    new THREE.Vector2(1.51, 1.34),
    new THREE.Vector2(1.49, 1.44),
    new THREE.Vector2(1.44, 1.51),
    new THREE.Vector2(1.34, 1.55),
    new THREE.Vector2(0.00, 1.55),
  ];
  const cake_bodyGeom = new THREE.LatheGeometry(cake_bodyProfile, 64);
  const cake_body = new THREE.Mesh(cake_bodyGeom, cake_bodyMat);
  cake_body.name = "cake_body";
  root.add(cake_body);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0.00, -0.50);
  leafShape.lineTo(-0.06, -0.28);
  leafShape.lineTo(-0.20, -0.38);
  leafShape.lineTo(-0.18, -0.18);
  leafShape.lineTo(-0.40, -0.22);
  leafShape.lineTo(-0.29, -0.03);
  leafShape.lineTo(-0.50, 0.02);
  leafShape.lineTo(-0.30, 0.13);
  leafShape.lineTo(-0.42, 0.31);
  leafShape.lineTo(-0.17, 0.27);
  leafShape.lineTo(-0.13, 0.47);
  leafShape.lineTo(0.00, 0.36);
  leafShape.lineTo(0.13, 0.47);
  leafShape.lineTo(0.17, 0.27);
  leafShape.lineTo(0.42, 0.31);
  leafShape.lineTo(0.30, 0.13);
  leafShape.lineTo(0.50, 0.02);
  leafShape.lineTo(0.29, -0.03);
  leafShape.lineTo(0.40, -0.22);
  leafShape.lineTo(0.18, -0.18);
  leafShape.lineTo(0.20, -0.38);
  leafShape.lineTo(0.06, -0.28);
  leafShape.closePath();

  const leafGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.004,
    bevelSegments: 1,
  });
  leafGeom.translate(0, 0, -0.006);

  const leaf_stemGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
  leaf_stemGeom.rotateZ(-0.28);
  leaf_stemGeom.translate(0.055, -0.62, 0.008);

  const leaf_midribGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.78, 7);
  leaf_midribGeom.translate(0, -0.03, 0.014);

  const leaf_veinGeom = new THREE.CylinderGeometry(0.005, 0.005, 0.27, 6);

  function createLeaf(name, material, scale, rotationZ, includeStem) {
    const leaf_group = new THREE.Group();
    leaf_group.name = name;

    const leaf_blade = new THREE.Mesh(leafGeom, material);
    leaf_blade.name = name + "_blade";
    leaf_group.add(leaf_blade);

    const leaf_midrib = new THREE.Mesh(leaf_midribGeom, leaf_veinMat);
    leaf_midrib.name = name + "_midrib";
    leaf_group.add(leaf_midrib);

    const veinData = [
      [-0.16, 0.10, 0.96],
      [0.16, 0.10, -0.96],
      [-0.13, 0.27, 0.72],
      [0.13, 0.27, -0.72],
    ];
    for (let i = 0; i < veinData.length; i++) {
      const data = veinData[i];
      const leaf_vein = new THREE.Mesh(leaf_veinGeom, leaf_veinMat);
      leaf_vein.name = name + "_vein_" + i;
      leaf_vein.position.set(data[0], data[1], 0.014);
      leaf_vein.rotation.z = data[2];
      leaf_group.add(leaf_vein);
    }

    if (includeStem) {
      const leaf_stem = new THREE.Mesh(leaf_stemGeom, leaf_veinMat);
      leaf_stem.name = name + "_stem";
      leaf_group.add(leaf_stem);
    }

    leaf_group.scale.setScalar(scale);
    leaf_group.rotation.z = rotationZ;
    return leaf_group;
  }

  const side_leaf_garland = new THREE.Group();
  side_leaf_garland.name = "side_leaf_garland";
  root.add(side_leaf_garland);

  const sideLeafData = [
    { angle: 2.82, y: 0.55, scale: 0.43, rotation: -0.34, stem: true, mat: antique_gold_leafMat },
    { angle: 2.58, y: 0.76, scale: 0.52, rotation: -0.18, stem: false, mat: gold_leafMat },
    { angle: 2.34, y: 0.62, scale: 0.47, rotation: 0.34, stem: true, mat: gold_leafMat },
    { angle: 2.10, y: 0.70, scale: 0.50, rotation: -0.50, stem: false, mat: gold_leafMat },
    { angle: 1.84, y: 0.49, scale: 0.43, rotation: 0.38, stem: true, mat: antique_gold_leafMat },
    { angle: 1.57, y: 0.50, scale: 0.48, rotation: -0.12, stem: true, mat: gold_leafMat },
    { angle: 1.28, y: 0.72, scale: 0.58, rotation: -0.48, stem: true, mat: gold_leafMat },
    { angle: 1.01, y: 0.53, scale: 0.45, rotation: 0.25, stem: false, mat: antique_gold_leafMat },
    { angle: 0.76, y: 0.69, scale: 0.44, rotation: -0.24, stem: true, mat: gold_leafMat },
    { angle: 0.52, y: 0.52, scale: 0.46, rotation: 0.42, stem: false, mat: antique_gold_leafMat },
    { angle: 0.30, y: 0.82, scale: 0.39, rotation: 0.12, stem: false, mat: gold_leafMat },
  ];

  const localForward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < sideLeafData.length; i++) {
    const data = sideLeafData[i];
    const normal = new THREE.Vector3(Math.cos(data.angle), 0, Math.sin(data.angle));
    const side_leaf = createLeaf(
      "side_leaf_" + i,
      data.mat,
      data.scale,
      data.rotation,
      data.stem
    );
    side_leaf.position.set(normal.x * 1.515, data.y, normal.z * 1.515);
    side_leaf.quaternion.setFromUnitVectors(localForward, normal);
    side_leaf_garland.add(side_leaf);
  }

  const top_leaf_scatter = new THREE.Group();
  top_leaf_scatter.name = "top_leaf_scatter";
  root.add(top_leaf_scatter);

  const topLeafData = [
    { x: -0.82, z: -0.82, scale: 0.38, rotation: 0.20, stem: false, mat: gold_leafMat },
    { x: -1.02, z: -0.42, scale: 0.37, rotation: -0.35, stem: false, mat: gold_leafMat },
    { x: -0.88, z: 0.02, scale: 0.42, rotation: 0.15, stem: false, mat: gold_leafMat },
    { x: -0.58, z: 0.45, scale: 0.31, rotation: -0.15, stem: false, mat: antique_gold_leafMat },
    { x: 0.12, z: 0.55, scale: 0.39, rotation: 0.10, stem: false, mat: gold_leafMat },
    { x: 0.93, z: 0.25, scale: 0.40, rotation: -0.30, stem: false, mat: gold_leafMat },
    { x: 1.03, z: -0.36, scale: 0.38, rotation: 0.25, stem: false, mat: gold_leafMat },
    { x: 0.82, z: -0.78, scale: 0.34, rotation: -0.10, stem: false, mat: gold_leafMat },
    { x: 0.25, z: -0.95, scale: 0.32, rotation: 0.40, stem: false, mat: gold_leafMat },
  ];

  const topAlign = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );

  for (let i = 0; i < topLeafData.length; i++) {
    const data = topLeafData[i];
    const top_leaf = createLeaf(
      "top_leaf_" + i,
      data.mat,
      data.scale,
      data.rotation,
      data.stem
    );
    top_leaf.position.set(data.x, 1.565, data.z);
    top_leaf.quaternion.copy(topAlign);
    top_leaf_scatter.add(top_leaf);
  }

  const crown = new THREE.Group();
  crown.name = "crown";
  crown.position.y = 1.55;
  root.add(crown);

  const crown_base_bandGeom = new THREE.CylinderGeometry(0.59, 0.60, 0.20, 48);
  const crown_base_band = new THREE.Mesh(crown_base_bandGeom, polished_goldMat);
  crown_base_band.name = "crown_base_band";
  crown_base_band.position.y = 0.10;
  crown.add(crown_base_band);

  const crown_inner_bandGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.18, 48);
  const crown_inner_band = new THREE.Mesh(crown_inner_bandGeom, dark_goldMat);
  crown_inner_band.name = "crown_inner_band";
  crown_inner_band.position.y = 0.10;
  crown.add(crown_inner_band);

  const crown_lower_rimGeom = new THREE.TorusGeometry(0.565, 0.035, 10, 48);
  const crown_lower_rim = new THREE.Mesh(crown_lower_rimGeom, polished_goldMat);
  crown_lower_rim.name = "crown_lower_rim";
  crown_lower_rim.rotation.x = Math.PI / 2;
  crown_lower_rim.position.y = 0.025;
  crown.add(crown_lower_rim);

  const crown_middle_rimGeom = new THREE.TorusGeometry(0.565, 0.018, 8, 48);
  const crown_middle_rim = new THREE.Mesh(crown_middle_rimGeom, dark_goldMat);
  crown_middle_rim.name = "crown_middle_rim";
  crown_middle_rim.rotation.x = Math.PI / 2;
  crown_middle_rim.position.y = 0.18;
  crown.add(crown_middle_rim);

  const crown_upper_rimGeom = new THREE.TorusGeometry(0.55, 0.032, 10, 48);
  const crown_upper_rim = new THREE.Mesh(crown_upper_rimGeom, polished_goldMat);
  crown_upper_rim.name = "crown_upper_rim";
  crown_upper_rim.rotation.x = Math.PI / 2;
  crown_upper_rim.position.y = 0.235;
  crown.add(crown_upper_rim);

  const crownPointShape = new THREE.Shape();
  crownPointShape.moveTo(-0.39, 0.00);
  crownPointShape.lineTo(-0.34, 0.16);
  crownPointShape.lineTo(-0.24, 0.52);
  crownPointShape.lineTo(-0.11, 0.84);
  crownPointShape.lineTo(0.00, 1.00);
  crownPointShape.lineTo(0.11, 0.84);
  crownPointShape.lineTo(0.24, 0.52);
  crownPointShape.lineTo(0.34, 0.16);
  crownPointShape.lineTo(0.39, 0.00);
  crownPointShape.closePath();

  const crown_pointGeom = new THREE.ExtrudeGeometry(crownPointShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  crown_pointGeom.translate(0, 0, -0.025);

  const pointCount = 8;
  const crown_points = new THREE.InstancedMesh(
    crown_pointGeom,
    polished_goldMat,
    pointCount
  );
  crown_points.name = "crown_points";

  const instanceMatrix = new THREE.Matrix4();
  const instancePosition = new THREE.Vector3();
  const instanceQuaternion = new THREE.Quaternion();
  const instanceScale = new THREE.Vector3();

  for (let i = 0; i < pointCount; i++) {
    const angle = i / pointCount * Math.PI * 2;
    instancePosition.set(Math.cos(angle) * 0.50, 0.18, Math.sin(angle) * 0.50);
    instanceQuaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2 - angle, 0));
    instanceScale.set(1, 1, 1);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    crown_points.setMatrixAt(i, instanceMatrix);
  }
  crown_points.instanceMatrix.needsUpdate = true;
  crown.add(crown_points);

  function createCrownTrim(name, radius, tubeRadius, y, material) {
    const trim_points = [];
    for (let i = 0; i < pointCount; i++) {
      const boundaryAngle = (i + 0.5) / pointCount * Math.PI * 2;
      trim_points.push(
        new THREE.Vector3(
          Math.cos(boundaryAngle) * radius,
          y,
          Math.sin(boundaryAngle) * radius
        )
      );
    }
    for (let i = 0; i < pointCount; i++) {
      const peakAngle = i / pointCount * Math.PI * 2;
      trim_points.push(
        new THREE.Vector3(
          Math.cos(peakAngle) * radius,
          1.18,
          Math.sin(peakAngle) * radius
        )
      );
    }
    const trim_curve = new THREE.CatmullRomCurve3(
      trim_points,
      true,
      "centripetal"
    );
    const trimGeom = new THREE.TubeGeometry(
      trim_curve,
      128,
      tubeRadius,
      8,
      true
    );
    const trim = new THREE.Mesh(trimGeom, material);
    trim.name = name;
    return trim;
  }

  const crown_outer_trim = createCrownTrim(
    "crown_outer_trim",
    0.535,
    0.018,
    0.22,
    dark_goldMat
  );
  crown.add(crown_outer_trim);

  const crown_inner_trim = createCrownTrim(
    "crown_inner_trim",
    0.495,
    0.012,
    0.22,
    polished_goldMat
  );
  crown.add(crown_inner_trim);

  const crown_tip_beadGeom = new THREE.SphereGeometry(0.085, 20, 12);
  const crown_tip_beads = new THREE.InstancedMesh(
    crown_tip_beadGeom,
    polished_goldMat,
    pointCount
  );
  crown_tip_beads.name = "crown_tip_beads";

  for (let i = 0; i < pointCount; i++) {
    const angle = i / pointCount * Math.PI * 2;
    instancePosition.set(
      Math.cos(angle) * 0.54,
      1.22,
      Math.sin(angle) * 0.54
    );
    instanceQuaternion.identity();
    instanceScale.set(1, 1, 1);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    crown_tip_beads.setMatrixAt(i, instanceMatrix);
  }
  crown_tip_beads.instanceMatrix.needsUpdate = true;
  crown.add(crown_tip_beads);

  const crown_beadGeom = new THREE.SphereGeometry(0.022, 10, 8);
  const crown_edge_beads = new THREE.InstancedMesh(
    crown_beadGeom,
    polished_goldMat,
    48
  );
  crown_edge_beads.name = "crown_edge_beads";

  let crownBeadIndex = 0;
  for (let i = 0; i < pointCount; i++) {
    const peakAngle = i / pointCount * Math.PI * 2;
    for (const side of [-1, 1]) {
      const edgeAngle = peakAngle + side * 0.17;
      for (let j = 0; j < 3; j++) {
        instancePosition.set(
          Math.cos(edgeAngle) * 0.548,
          0.36 + j * 0.25,
          Math.sin(edgeAngle) * 0.548
        );
        instanceQuaternion.identity();
        instanceScale.set(1, 1, 1);
        instanceMatrix.compose(
          instancePosition,
          instanceQuaternion,
          instanceScale
        );
        crown_edge_beads.setMatrixAt(crownBeadIndex, instanceMatrix);
        crownBeadIndex++;
      }
    }
  }
  crown_edge_beads.instanceMatrix.needsUpdate = true;
  crown.add(crown_edge_beads);

  const base_studGeom = new THREE.SphereGeometry(0.045, 14, 10);
  const crown_base_studs = new THREE.InstancedMesh(
    base_studGeom,
    polished_goldMat,
    16
  );
  crown_base_studs.name = "crown_base_studs";

  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    instancePosition.set(
      Math.cos(angle) * 0.595,
      0.105,
      Math.sin(angle) * 0.595
    );
    instanceQuaternion.identity();
    instanceScale.set(1, 1, 1);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    crown_base_studs.setMatrixAt(i, instanceMatrix);
  }
  crown_base_studs.instanceMatrix.needsUpdate = true;
  crown.add(crown_base_studs);

  const base_jewel_socketGeom = new THREE.CylinderGeometry(
    0.060,
    0.060,
    0.025,
    16
  );
  const base_jewel_stoneGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.032,
    16
  );
  const base_jewel_sockets = new THREE.InstancedMesh(
    base_jewel_socketGeom,
    dark_goldMat,
    8
  );
  base_jewel_sockets.name = "base_jewel_sockets";
  const base_jewel_stones = new THREE.InstancedMesh(
    base_jewel_stoneGeom,
    silverMat,
    8
  );
  base_jewel_stones.name = "base_jewel_stones";

  const localUp = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const radialQuaternion = new THREE.Quaternion().setFromUnitVectors(
      localUp,
      normal
    );

    instancePosition.set(normal.x * 0.603, 0.105, normal.z * 0.603);
    instanceScale.set(1, 1, 1);
    instanceMatrix.compose(instancePosition, radialQuaternion, instanceScale);
    base_jewel_sockets.setMatrixAt(i, instanceMatrix);

    instancePosition.set(normal.x * 0.620, 0.105, normal.z * 0.620);
    instanceMatrix.compose(instancePosition, radialQuaternion, instanceScale);
    base_jewel_stones.setMatrixAt(i, instanceMatrix);
  }
  base_jewel_sockets.instanceMatrix.needsUpdate = true;
  base_jewel_stones.instanceMatrix.needsUpdate = true;
  crown.add(base_jewel_sockets);
  crown.add(base_jewel_stones);

  const crown_panel_beadGeom = new THREE.SphereGeometry(0.031, 12, 8);
  const crown_panel_beads = new THREE.InstancedMesh(
    crown_panel_beadGeom,
    polished_goldMat,
    16
  );
  crown_panel_beads.name = "crown_panel_beads";

  let panelBeadIndex = 0;
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    for (const y of [0.39, 0.61]) {
      instancePosition.set(normal.x * 0.548, y, normal.z * 0.548);
      instanceQuaternion.identity();
      instanceScale.set(1, 1, 1);
      instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
      crown_panel_beads.setMatrixAt(panelBeadIndex, instanceMatrix);
      panelBeadIndex++;
    }
  }
  crown_panel_beads.instanceMatrix.needsUpdate = true;
  crown.add(crown_panel_beads);

  const central_medallion = new THREE.Group();
  central_medallion.name = "central_medallion";
  central_medallion.position.set(0, 0.46, 0.555);
  crown.add(central_medallion);

  const central_medallion_socketGeom = new THREE.CylinderGeometry(
    0.105,
    0.105,
    0.028,
    20
  );
  const central_medallion_socket = new THREE.Mesh(
    central_medallion_socketGeom,
    dark_goldMat
  );
  central_medallion_socket.name = "central_medallion_socket";
  central_medallion_socket.rotation.x = Math.PI / 2;
  central_medallion.add(central_medallion_socket);

  const central_medallion_pearlGeom = new THREE.SphereGeometry(0.078, 20, 14);
  const central_medallion_pearl = new THREE.Mesh(
    central_medallion_pearlGeom,
    pearlMat
  );
  central_medallion_pearl.name = "central_medallion_pearl";
  central_medallion_pearl.position.z = 0.035;
  central_medallion.add(central_medallion_pearl);

  const central_flourishGeom = new THREE.TorusGeometry(0.13, 0.014, 8, 28);
  const central_flourish = new THREE.Mesh(
    central_flourishGeom,
    polished_goldMat
  );
  central_flourish.name = "central_flourish";
  central_flourish.position.set(0, -0.015, 0.018);
  central_flourish.scale.set(1.15, 0.78, 1);
  central_medallion.add(central_flourish);

  const central_flourish_beadGeom = new THREE.SphereGeometry(0.025, 10, 8);
  const central_flourish_beads = new THREE.InstancedMesh(
    central_flourish_beadGeom,
    polished_goldMat,
    8
  );
  central_flourish_beads.name = "central_flourish_beads";

  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    instancePosition.set(
      Math.cos(angle) * 0.145,
      Math.sin(angle) * 0.095 - 0.015,
      0.028
    );
    instanceQuaternion.identity();
    instanceScale.set(1, 1, 1);
    instanceMatrix.compose(instancePosition, instanceQuaternion, instanceScale);
    central_flourish_beads.setMatrixAt(i, instanceMatrix);
  }
  central_flourish_beads.instanceMatrix.needsUpdate = true;
  central_medallion.add(central_flourish_beads);

  const upper_jewel_socketGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.025,
    16
  );
  const upper_jewel_socket = new THREE.Mesh(
    upper_jewel_socketGeom,
    dark_goldMat
  );
  upper_jewel_socket.name = "upper_jewel_socket";
  upper_jewel_socket.rotation.x = Math.PI / 2;
  upper_jewel_socket.position.set(0, 0.73, 0.558);
  crown.add(upper_jewel_socket);

  const upper_jewelGeom = new THREE.SphereGeometry(0.043, 16, 10);
  const upper_jewel = new THREE.Mesh(upper_jewelGeom, turquoiseMat);
  upper_jewel.name = "upper_jewel";
  upper_jewel.position.set(0, 0.73, 0.585);
  crown.add(upper_jewel);

  const side_jewel_sockets = new THREE.InstancedMesh(
    upper_jewel_socketGeom,
    dark_goldMat,
    2
  );
  side_jewel_sockets.name = "side_jewel_sockets";
  const side_jewels = new THREE.InstancedMesh(
    upper_jewelGeom,
    pearlMat,
    2
  );
  side_jewels.name = "side_jewels";

  for (let i = 0; i < 2; i++) {
    const angle = i === 0 ? Math.PI / 3 : Math.PI * 2 / 3;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const faceQuaternion = new THREE.Quaternion().setFromUnitVectors(
      localUp,
      normal
    );

    instancePosition.set(normal.x * 0.558, 0.57, normal.z * 0.558);
    instanceScale.set(1, 1, 1);
    instanceMatrix.compose(instancePosition, faceQuaternion, instanceScale);
    side_jewel_sockets.setMatrixAt(i, instanceMatrix);

    instancePosition.set(normal.x * 0.585, 0.57, normal.z * 0.585);
    instanceMatrix.compose(instancePosition, new THREE.Quaternion(), instanceScale);
    side_jewels.setMatrixAt(i, instanceMatrix);
  }
  side_jewel_sockets.instanceMatrix.needsUpdate = true;
  side_jewels.instanceMatrix.needsUpdate = true;
  crown.add(side_jewel_sockets);
  crown.add(side_jewels);

  const ruby_accentGeom = new THREE.SphereGeometry(0.032, 14, 10);
  const ruby_accent = new THREE.Mesh(ruby_accentGeom, rubyMat);
  ruby_accent.name = "ruby_accent";
  ruby_accent.position.set(0, 0.59, 0.582);
  crown.add(ruby_accent);

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