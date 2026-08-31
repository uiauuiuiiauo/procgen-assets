export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "sparkling_fruit_water";

  const glass_group = new THREE.Group();
  glass_group.name = "glass_group";
  const contents_group = new THREE.Group();
  contents_group.name = "contents_group";
  root.add(glass_group, contents_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const waterMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5d9a4,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.9,
    ior: 1.33,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const iceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5fbff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    depthWrite: false
  });
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xf8fbff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.38,
    depthWrite: false
  });
  const foamFilmMat = new THREE.MeshStandardMaterial({
    color: 0xf8fbff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.2,
    transparent: true,
    opacity: 0.76,
    depthWrite: false
  });
  const dropletMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.2,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });

  const strawberryMat = new THREE.MeshStandardMaterial({
    color: 0xd92718,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x3a0704,
    emissiveIntensity: 0.28
  });
  const strawberryFleshMat = new THREE.MeshStandardMaterial({
    color: 0xf15b35,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x3a1008,
    emissiveIntensity: 0.18
  });
  const strawberrySeedMat = new THREE.MeshStandardMaterial({
    color: 0xf5c45a,
    metalness: 0.0,
    roughness: 0.7
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x4f7627,
    metalness: 0.0,
    roughness: 0.8
  });
  const lemonRindMat = new THREE.MeshStandardMaterial({
    color: 0xf2c900,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x3a2d00,
    emissiveIntensity: 0.22
  });
  const lemonFleshMat = new THREE.MeshStandardMaterial({
    color: 0xffe45f,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x4a3902,
    emissiveIntensity: 0.22
  });
  const lemonSegmentMat = new THREE.MeshStandardMaterial({
    color: 0xfff3a6,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x332a05,
    emissiveIntensity: 0.12
  });
  const orangeRindMat = new THREE.MeshStandardMaterial({
    color: 0xf27b16,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x3d1602,
    emissiveIntensity: 0.22
  });
  const orangeFleshMat = new THREE.MeshStandardMaterial({
    color: 0xff9328,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x451703,
    emissiveIntensity: 0.22
  });
  const orangeSegmentMat = new THREE.MeshStandardMaterial({
    color: 0xffb43f,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x421502,
    emissiveIntensity: 0.14
  });
  const limeRindMat = new THREE.MeshStandardMaterial({
    color: 0x70a91e,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x172900,
    emissiveIntensity: 0.2
  });
  const limeFleshMat = new THREE.MeshStandardMaterial({
    color: 0xb8d84d,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x263303,
    emissiveIntensity: 0.2
  });
  const limeSegmentMat = new THREE.MeshStandardMaterial({
    color: 0xe1ed83,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x283005,
    emissiveIntensity: 0.12
  });
  const mangoMat = new THREE.MeshStandardMaterial({
    color: 0xffd21f,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x463400,
    emissiveIntensity: 0.24
  });
  const mangoHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xffef72,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x443604,
    emissiveIntensity: 0.16
  });
  const grapefruitRindMat = new THREE.MeshStandardMaterial({
    color: 0xe34b2f,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x390904,
    emissiveIntensity: 0.2
  });
  const grapefruitFleshMat = new THREE.MeshStandardMaterial({
    color: 0xf57b50,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x421008,
    emissiveIntensity: 0.2
  });
  const grapefruitSegmentMat = new THREE.MeshStandardMaterial({
    color: 0xffa078,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x421008,
    emissiveIntensity: 0.12
  });
  const watermelonRindMat = new THREE.MeshStandardMaterial({
    color: 0x5f922d,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x122303,
    emissiveIntensity: 0.18
  });
  const watermelonFleshMat = new THREE.MeshStandardMaterial({
    color: 0xe64b38,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x3c0805,
    emissiveIntensity: 0.22
  });
  const watermelonSeedMat = new THREE.MeshStandardMaterial({
    color: 0x251b16,
    metalness: 0.0,
    roughness: 0.8
  });
  const kiwiRindMat = new THREE.MeshStandardMaterial({
    color: 0x78902d,
    metalness: 0.0,
    roughness: 0.45,
    emissive: 0x192103,
    emissiveIntensity: 0.18
  });
  const kiwiFleshMat = new THREE.MeshStandardMaterial({
    color: 0x9ebd35,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x263004,
    emissiveIntensity: 0.2
  });
  const kiwiCoreMat = new THREE.MeshStandardMaterial({
    color: 0xe2df82,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x302d08,
    emissiveIntensity: 0.12
  });

  const glassProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.285, 0.000),
    new THREE.Vector2(0.300, 0.025),
    new THREE.Vector2(0.306, 0.080),
    new THREE.Vector2(0.400, 1.280),
    new THREE.Vector2(0.405, 1.315),
    new THREE.Vector2(0.400, 1.345),
    new THREE.Vector2(0.382, 1.355),
    new THREE.Vector2(0.370, 1.338),
    new THREE.Vector2(0.365, 1.300),
    new THREE.Vector2(0.286, 0.105),
    new THREE.Vector2(0.278, 0.080),
    new THREE.Vector2(0.000, 0.080)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glassProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.name = "glass_body";
  glass_body.renderOrder = 10;
  glass_group.add(glass_body);

  const glass_rimGeom = new THREE.TorusGeometry(0.392, 0.012, 12, 64);
  const glass_rim = new THREE.Mesh(glass_rimGeom, glassMat);
  glass_rim.name = "glass_rim";
  glass_rim.rotation.x = Math.PI / 2;
  glass_rim.position.y = 1.342;
  glass_rim.renderOrder = 11;
  glass_group.add(glass_rim);

  const glass_base_ringGeom = new THREE.TorusGeometry(0.291, 0.012, 10, 56);
  const glass_base_ring = new THREE.Mesh(glass_base_ringGeom, glassMat);
  glass_base_ring.name = "glass_base_ring";
  glass_base_ring.rotation.x = Math.PI / 2;
  glass_base_ring.position.y = 0.035;
  glass_base_ring.renderOrder = 11;
  glass_group.add(glass_base_ring);

  const waterProfile = [
    new THREE.Vector2(0.000, 0.090),
    new THREE.Vector2(0.278, 0.090),
    new THREE.Vector2(0.286, 0.120),
    new THREE.Vector2(0.360, 1.080),
    new THREE.Vector2(0.365, 1.120),
    new THREE.Vector2(0.000, 1.120)
  ];
  const sparkling_waterGeom = new THREE.LatheGeometry(waterProfile, 56);
  const sparkling_water = new THREE.Mesh(sparkling_waterGeom, waterMat);
  sparkling_water.name = "sparkling_water";
  sparkling_water.renderOrder = 1;
  contents_group.add(sparkling_water);

  const water_surfaceGeom = new THREE.CircleGeometry(0.364, 64);
  const water_surface = new THREE.Mesh(water_surfaceGeom, waterMat);
  water_surface.name = "water_surface";
  water_surface.rotation.x = -Math.PI / 2;
  water_surface.position.y = 1.121;
  water_surface.renderOrder = 2;
  contents_group.add(water_surface);

  const water_meniscusGeom = new THREE.TorusGeometry(0.357, 0.006, 8, 64);
  const water_meniscus = new THREE.Mesh(water_meniscusGeom, waterMat);
  water_meniscus.name = "water_meniscus";
  water_meniscus.rotation.x = Math.PI / 2;
  water_meniscus.position.y = 1.123;
  water_meniscus.renderOrder = 3;
  contents_group.add(water_meniscus);

  const fruitShape = new THREE.Shape();
  fruitShape.moveTo(0.000, -0.620);
  fruitShape.bezierCurveTo(-0.180, -0.500, -0.420, -0.200, -0.380, 0.100);
  fruitShape.bezierCurveTo(-0.340, 0.350, -0.140, 0.480, 0.000, 0.420);
  fruitShape.bezierCurveTo(0.140, 0.480, 0.340, 0.350, 0.380, 0.100);
  fruitShape.bezierCurveTo(0.420, -0.200, 0.180, -0.500, 0.000, -0.620);
  fruitShape.closePath();
  const fruitGeom = new THREE.ExtrudeGeometry(fruitShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  fruitGeom.translate(0, 0, -0.0225);

  const roundedShape = new THREE.Shape();
  roundedShape.moveTo(-0.36, -0.50);
  roundedShape.bezierCurveTo(-0.42, -0.25, -0.40, 0.20, -0.30, 0.43);
  roundedShape.bezierCurveTo(-0.15, 0.54, 0.15, 0.54, 0.30, 0.43);
  roundedShape.bezierCurveTo(0.40, 0.20, 0.42, -0.25, 0.36, -0.50);
  roundedShape.bezierCurveTo(0.18, -0.57, -0.18, -0.57, -0.36, -0.50);
  roundedShape.closePath();
  const roundedChunkGeom = new THREE.ExtrudeGeometry(roundedShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelSegments: 3
  });
  roundedChunkGeom.translate(0, 0, -0.025);

  const citrusShape = new THREE.Shape();
  citrusShape.moveTo(0.000, -0.500);
  citrusShape.lineTo(-0.360, 0.080);
  citrusShape.bezierCurveTo(-0.300, 0.280, -0.160, 0.400, 0.000, 0.420);
  citrusShape.bezierCurveTo(0.160, 0.400, 0.300, 0.280, 0.360, 0.080);
  citrusShape.lineTo(0.000, -0.500);
  citrusShape.closePath();
  const citrusWedgeGeom = new THREE.ExtrudeGeometry(citrusShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.011,
    bevelSize: 0.011,
    bevelSegments: 3
  });
  citrusWedgeGeom.translate(0, 0, -0.0225);

  const citrusFaceGeom = new THREE.CircleGeometry(0.31, 32);
  const citrusSegmentGeom = new THREE.BoxGeometry(0.008, 0.245, 0.006);
  const citrusCenterGeom = new THREE.CircleGeometry(0.035, 16);

  function createCitrusWedge(rindMat, fleshMat, segmentMat) {
    const group = new THREE.Group();

    const rind = new THREE.Mesh(citrusWedgeGeom, rindMat);
    rind.name = "rind";
    group.add(rind);

    const flesh = new THREE.Mesh(citrusFaceGeom, fleshMat);
    flesh.name = "flesh";
    flesh.scale.set(0.94, 0.94, 1);
    flesh.position.set(0, -0.018, 0.038);
    group.add(flesh);

    const segments = new THREE.InstancedMesh(
      citrusSegmentGeom,
      segmentMat,
      7
    );
    segments.name = "citrus_segments";
    const segmentDummy = new THREE.Object3D();
    for (let i = 0; i < 7; i++) {
      const angle = -1.05 + i * 0.35;
      segmentDummy.position.set(
        Math.sin(angle) * 0.12,
        Math.cos(angle) * 0.12 - 0.015,
        0.044
      );
      segmentDummy.rotation.set(0, 0, -angle);
      segmentDummy.scale.set(1, 1, 1);
      segmentDummy.updateMatrix();
      segments.setMatrixAt(i, segmentDummy.matrix);
    }
    segments.instanceMatrix.needsUpdate = true;
    group.add(segments);

    const center = new THREE.Mesh(citrusCenterGeom, segmentMat);
    center.name = "citrus_center";
    center.position.set(0, -0.045, 0.048);
    group.add(center);

    return group;
  }

  const strawberrySeedGeom = new THREE.SphereGeometry(1, 8, 6);
  const watermelonSeedGeom = new THREE.SphereGeometry(1, 8, 5);
  const kiwiSeedGeom = new THREE.SphereGeometry(1, 8, 5);

  function createStrawberry() {
    const group = new THREE.Group();

    const body = new THREE.Mesh(fruitGeom, strawberryMat);
    body.name = "strawberry_body";
    group.add(body);

    const flesh = new THREE.Mesh(fruitGeom, strawberryFleshMat);
    flesh.name = "strawberry_flesh";
    flesh.scale.set(0.80, 0.84, 0.18);
    flesh.position.set(0, -0.015, 0.034);
    group.add(flesh);

    const seedPositions = [
      [-0.11, -0.31], [0.00, -0.35], [0.11, -0.29],
      [-0.18, -0.14], [-0.06, -0.10], [0.07, -0.08], [0.19, -0.10],
      [-0.20, 0.05], [-0.08, 0.10], [0.05, 0.12], [0.18, 0.08],
      [-0.12, 0.25], [0.00, 0.29], [0.12, 0.24]
    ];
    const seeds = new THREE.InstancedMesh(
      strawberrySeedGeom,
      strawberrySeedMat,
      seedPositions.length
    );
    seeds.name = "strawberry_seeds";
    const seedDummy = new THREE.Object3D();
    for (let i = 0; i < seedPositions.length; i++) {
      const p = seedPositions[i];
      seedDummy.position.set(p[0], p[1], 0.046);
      seedDummy.rotation.set(0, 0, (i % 3 - 1) * 0.28);
      seedDummy.scale.set(0.009, 0.014, 0.004);
      seedDummy.updateMatrix();
      seeds.setMatrixAt(i, seedDummy.matrix);
    }
    seeds.instanceMatrix.needsUpdate = true;
    group.add(seeds);

    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(1, 10, 6),
      leafMat
    );
    leaf.name = "strawberry_leaf";
    leaf.scale.set(0.075, 0.026, 0.018);
    leaf.position.set(0, 0.405, 0.005);
    leaf.rotation.z = -0.15;
    group.add(leaf);

    return group;
  }

  function createWatermelonChunk() {
    const group = new THREE.Group();

    const rind = new THREE.Mesh(roundedChunkGeom, watermelonRindMat);
    rind.name = "watermelon_rind";
    group.add(rind);

    const flesh = new THREE.Mesh(roundedChunkGeom, watermelonFleshMat);
    flesh.name = "watermelon_flesh";
    flesh.scale.set(0.82, 0.84, 0.16);
    flesh.position.set(0, 0.015, 0.034);
    group.add(flesh);

    const seedPositions = [
      [-0.12, 0.12], [0.02, 0.18], [0.14, 0.08],
      [-0.08, -0.04], [0.09, -0.11], [-0.17, -0.20],
      [0.02, -0.27], [0.19, -0.23]
    ];
    const seeds = new THREE.InstancedMesh(
      watermelonSeedGeom,
      watermelonSeedMat,
      seedPositions.length
    );
    seeds.name = "watermelon_seeds";
    const seedDummy = new THREE.Object3D();
    for (let i = 0; i < seedPositions.length; i++) {
      const p = seedPositions[i];
      seedDummy.position.set(p[0], p[1], 0.047);
      seedDummy.rotation.set(0, 0, (i % 2 === 0 ? -1 : 1) * 0.35);
      seedDummy.scale.set(0.012, 0.022, 0.004);
      seedDummy.updateMatrix();
      seeds.setMatrixAt(i, seedDummy.matrix);
    }
    seeds.instanceMatrix.needsUpdate = true;
    group.add(seeds);

    return group;
  }

  function createKiwiChunk() {
    const group = new THREE.Group();

    const rind = new THREE.Mesh(roundedChunkGeom, kiwiRindMat);
    rind.name = "kiwi_rind";
    group.add(rind);

    const flesh = new THREE.Mesh(roundedChunkGeom, kiwiFleshMat);
    flesh.name = "kiwi_flesh";
    flesh.scale.set(0.82, 0.84, 0.16);
    flesh.position.set(0, 0.01, 0.034);
    group.add(flesh);

    const core = new THREE.Mesh(roundedChunkGeom, kiwiCoreMat);
    core.name = "kiwi_core";
    core.scale.set(0.27, 0.55, 0.10);
    core.position.set(0, -0.01, 0.043);
    group.add(core);

    const seedPositions = [
      [-0.18, 0.20], [-0.08, 0.27], [0.05, 0.27], [0.17, 0.19],
      [-0.20, 0.04], [-0.10, 0.09], [0.10, 0.09], [0.20, 0.03],
      [-0.17, -0.13], [-0.07, -0.10], [0.07, -0.11], [0.17, -0.15],
      [-0.10, -0.28], [0.00, -0.31], [0.10, -0.27]
    ];
    const seeds = new THREE.InstancedMesh(
      kiwiSeedGeom,
      watermelonSeedMat,
      seedPositions.length
    );
    seeds.name = "kiwi_seeds";
    const seedDummy = new THREE.Object3D();
    for (let i = 0; i < seedPositions.length; i++) {
      const p = seedPositions[i];
      seedDummy.position.set(p[0], p[1], 0.050);
      seedDummy.rotation.set(0, 0, (i % 3 - 1) * 0.45);
      seedDummy.scale.set(0.008, 0.014, 0.004);
      seedDummy.updateMatrix();
      seeds.setMatrixAt(i, seedDummy.matrix);
    }
    seeds.instanceMatrix.needsUpdate = true;
    group.add(seeds);

    return group;
  }

  function createMangoChunk(highlightMat) {
    const group = new THREE.Group();

    const flesh = new THREE.Mesh(roundedChunkGeom, mangoMat);
    flesh.name = "mango_flesh";
    group.add(flesh);

    const highlight = new THREE.Mesh(roundedChunkGeom, highlightMat);
    highlight.name = "mango_highlight";
    highlight.scale.set(0.62, 0.62, 0.12);
    highlight.position.set(-0.025, 0.025, 0.036);
    group.add(highlight);

    return group;
  }

  const lower_left_strawberry = createStrawberry();
  lower_left_strawberry.name = "lower_left_strawberry";
  lower_left_strawberry.position.set(-0.13, 0.34, 0.15);
  lower_left_strawberry.rotation.set(0.05, -0.18, -0.52);
  lower_left_strawberry.scale.set(0.30, 0.27, 0.72);
  contents_group.add(lower_left_strawberry);

  const center_orange_wedge = createCitrusWedge(
    orangeRindMat,
    orangeFleshMat,
    orangeSegmentMat
  );
  center_orange_wedge.name = "center_orange_wedge";
  center_orange_wedge.position.set(0.11, 0.61, 0.17);
  center_orange_wedge.rotation.set(-0.04, 0.12, 0.22);
  center_orange_wedge.scale.set(0.34, 0.32, 0.76);
  contents_group.add(center_orange_wedge);

  const lower_center_lime = createKiwiChunk();
  lower_center_lime.name = "lower_center_lime";
  lower_center_lime.position.set(0.00, 0.49, 0.045);
  lower_center_lime.rotation.set(0.08, -0.12, -0.62);
  lower_center_lime.scale.set(0.29, 0.38, 0.72);
  contents_group.add(lower_center_lime);

  const lower_right_mango = createMangoChunk(mangoHighlightMat);
  lower_right_mango.name = "lower_right_mango";
  lower_right_mango.position.set(0.16, 0.32, 0.025);
  lower_right_mango.rotation.set(-0.08, 0.18, 0.30);
  lower_right_mango.scale.set(0.28, 0.27, 0.72);
  contents_group.add(lower_right_mango);

  const middle_left_lemon = createCitrusWedge(
    lemonRindMat,
    lemonFleshMat,
    lemonSegmentMat
  );
  middle_left_lemon.name = "middle_left_lemon";
  middle_left_lemon.position.set(-0.16, 0.72, 0.035);
  middle_left_lemon.rotation.set(0.04, -0.16, 0.48);
  middle_left_lemon.scale.set(0.34, 0.34, 0.76);
  contents_group.add(middle_left_lemon);

  const middle_right_grapefruit = createCitrusWedge(
    grapefruitRindMat,
    grapefruitFleshMat,
    grapefruitSegmentMat
  );
  middle_right_grapefruit.name = "middle_right_grapefruit";
  middle_right_grapefruit.position.set(0.16, 0.73, -0.055);
  middle_right_grapefruit.rotation.set(0.06, 0.16, -0.38);
  middle_right_grapefruit.scale.set(0.31, 0.32, 0.72);
  contents_group.add(middle_right_grapefruit);

  const upper_center_strawberry = createStrawberry();
  upper_center_strawberry.name = "upper_center_strawberry";
  upper_center_strawberry.position.set(0.02, 0.91, 0.14);
  upper_center_strawberry.rotation.set(-0.04, 0.10, -0.82);
  upper_center_strawberry.scale.set(0.30, 0.27, 0.74);
  contents_group.add(upper_center_strawberry);

  const upper_right_mango = createMangoChunk(mangoHighlightMat);
  upper_right_mango.name = "upper_right_mango";
  upper_right_mango.position.set(0.17, 0.91, -0.025);
  upper_right_mango.rotation.set(0.05, -0.18, -0.22);
  upper_right_mango.scale.set(0.29, 0.28, 0.72);
  contents_group.add(upper_right_mango);

  const upper_left_watermelon = createWatermelonChunk();
  upper_left_watermelon.name = "upper_left_watermelon";
  upper_left_watermelon.position.set(-0.15, 1.01, 0.015);
  upper_left_watermelon.rotation.set(-0.06, 0.16, 0.55);
  upper_left_watermelon.scale.set(0.29, 0.26, 0.70);
  contents_group.add(upper_left_watermelon);

  const top_center_kiwi = createKiwiChunk();
  top_center_kiwi.name = "top_center_kiwi";
  top_center_kiwi.position.set(0.05, 1.085, 0.075);
  top_center_kiwi.rotation.set(0.04, -0.10, -0.38);
  top_center_kiwi.scale.set(0.27, 0.25, 0.68);
  contents_group.add(top_center_kiwi);

  const iceCubeGeom = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

  function createIceChunk(name, x, y, z, sx, sy, sz, rx, ry, rz) {
    const ice = new THREE.Mesh(iceCubeGeom, iceMat);
    ice.name = name;
    ice.position.set(x, y, z);
    ice.scale.set(sx, sy, sz);
    ice.rotation.set(rx, ry, rz);
    ice.renderOrder = 5;
    return ice;
  }

  const top_left_ice = createIceChunk(
    "top_left_ice", -0.14, 1.105, 0.08,
    0.20, 0.15, 0.17, 0.25, 0.18, -0.18
  );
  const top_center_ice = createIceChunk(
    "top_center_ice", 0.02, 1.135, -0.04,
    0.22, 0.14, 0.18, -0.18, 0.35, 0.12
  );
  const top_right_ice = createIceChunk(
    "top_right_ice", 0.17, 1.095, 0.04,
    0.19, 0.15, 0.17, 0.16, -0.28, 0.30
  );
  const middle_left_ice = createIceChunk(
    "middle_left_ice", -0.18, 0.94, -0.03,
    0.18, 0.16, 0.16, 0.35, 0.12, -0.24
  );
  const middle_right_ice = createIceChunk(
    "middle_right_ice", 0.18, 0.98, -0.08,
    0.19, 0.15, 0.17, -0.20, 0.30, 0.18
  );
  const lower_center_ice = createIceChunk(
    "lower_center_ice", -0.01, 0.82, -0.13,
    0.21, 0.16, 0.18, 0.28, -0.18, 0.32
  );
  const bottom_left_ice = createIceChunk(
    "bottom_left_ice", -0.17, 0.59, -0.08,
    0.18, 0.16, 0.17, -0.26, 0.22, -0.15
  );
  const bottom_right_ice = createIceChunk(
    "bottom_right_ice", 0.17, 0.46, -0.10,
    0.19, 0.17, 0.18, 0.20, -0.30, 0.25
  );
  contents_group.add(
    top_left_ice,
    top_center_ice,
    top_right_ice,
    middle_left_ice,
    middle_right_ice,
    lower_center_ice,
    bottom_left_ice,
    bottom_right_ice
  );

  const foam_bandGeom = new THREE.CylinderGeometry(
    0.365,
    0.358,
    0.15,
    56,
    1,
    true
  );
  const foam_band = new THREE.Mesh(foam_bandGeom, foamFilmMat);
  foam_band.name = "foam_band";
  foam_band.position.y = 1.045;
  foam_band.renderOrder = 6;
  contents_group.add(foam_band);

  const foam_surfaceGeom = new THREE.CircleGeometry(0.362, 56);
  const foam_surface = new THREE.Mesh(foam_surfaceGeom, foamFilmMat);
  foam_surface.name = "foam_surface";
  foam_surface.rotation.x = -Math.PI / 2;
  foam_surface.position.y = 1.124;
  foam_surface.renderOrder = 6;
  contents_group.add(foam_surface);

  const foam_ringGeom = new THREE.TorusGeometry(0.348, 0.009, 8, 64);
  const foam_ring = new THREE.Mesh(foam_ringGeom, foamMat);
  foam_ring.name = "foam_ring";
  foam_ring.rotation.x = Math.PI / 2;
  foam_ring.position.y = 1.126;
  foam_ring.renderOrder = 7;
  contents_group.add(foam_ring);

  const bubbleGeom = new THREE.SphereGeometry(1, 8, 6);
  const bubbleCount = 900;
  const carbonation_bubbles = new THREE.InstancedMesh(
    bubbleGeom,
    bubbleMat,
    bubbleCount
  );
  carbonation_bubbles.name = "carbonation_bubbles";
  carbonation_bubbles.renderOrder = 8;
  const bubbleDummy = new THREE.Object3D();

  for (let i = 0; i < bubbleCount; i++) {
    let x;
    let y;
    let z;
    let size;

    if (i < 720) {
      const angle = i * 2.3999632297;
      const radial = 0.035 + 0.305 * (((i * 67) % 223) / 222);
      x = Math.cos(angle) * radial;
      z = Math.sin(angle) * radial;
      y = 0.13 + 0.95 * (((i * 89) % 719) / 718);
      size = 0.0028 + 0.0042 * (((i * 29) % 31) / 30);
    } else {
      const j = i - 720;
      const angle = j * 2.3999632297 + 0.45;
      const radial = 0.055 + 0.285 * (((j * 17) % 53) / 52);
      x = Math.cos(angle) * radial;
      z = Math.sin(angle) * radial;
      y = 0.975 + 0.14 * (((j * 31) % 151) / 150);
      size = 0.0035 + 0.0055 * (((j * 13) % 29) / 28);
    }

    bubbleDummy.position.set(x, y, z);
    bubbleDummy.rotation.set(0, 0, 0);
    bubbleDummy.scale.setScalar(size);
    bubbleDummy.updateMatrix();
    carbonation_bubbles.setMatrixAt(i, bubbleDummy.matrix);
  }
  carbonation_bubbles.instanceMatrix.needsUpdate = true;
  contents_group.add(carbonation_bubbles);

  const dropletGeom = new THREE.SphereGeometry(1, 8, 6);
  const dropletCount = 220;
  const condensation_droplets = new THREE.InstancedMesh(
    dropletGeom,
    dropletMat,
    dropletCount
  );
  condensation_droplets.name = "condensation_droplets";
  condensation_droplets.renderOrder = 12;
  const dropletDummy = new THREE.Object3D();

  for (let i = 0; i < dropletCount; i++) {
    const angle = i * 2.3999632297 + 0.2;
    const y = 0.11 + 1.15 * (((i * 47) % 219) / 218);
    const radius = 0.306 + 0.094 * ((y - 0.11) / 1.15);
    const size = 0.0025 + 0.0045 * (((i * 19) % 23) / 22);
    const x = Math.cos(angle) * (radius + 0.003);
    const z = Math.sin(angle) * (radius + 0.003);

    dropletDummy.position.set(x, y, z);
    dropletDummy.rotation.set(0, 0, 0);
    dropletDummy.scale.set(
      size,
      size * (0.85 + 0.35 * ((i % 5) / 4)),
      size * 0.55
    );
    dropletDummy.updateMatrix();
    condensation_droplets.setMatrixAt(i, dropletDummy.matrix);
  }
  condensation_droplets.instanceMatrix.needsUpdate = true;
  glass_group.add(condensation_droplets);

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