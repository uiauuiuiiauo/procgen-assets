export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blueberry_bottle";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const contents_group = new THREE.Group();
  contents_group.name = "contents_group";
  root.add(contents_group);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  root.add(label_group);

  const cap_group = new THREE.Group();
  cap_group.name = "cap_group";
  root.add(cap_group);

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfefff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const blue_liquidMat = new THREE.MeshStandardMaterial({
    color: 0x082b88,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.84
  });

  const blueberryMat = new THREE.MeshStandardMaterial({
    color: 0x173f9d,
    metalness: 0.0,
    roughness: 0.7
  });

  const blueberry_crownMat = new THREE.MeshStandardMaterial({
    color: 0x07183f,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x65a84f,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const label_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf5f3ed,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const label_blueMat = new THREE.MeshStandardMaterial({
    color: 0x78cfe7,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const label_textMat = new THREE.MeshStandardMaterial({
    color: 0x17233d,
    metalness: 0.0,
    roughness: 0.7
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x0867d9,
    metalness: 0.5,
    roughness: 0.25
  });

  const cap_ridgeMat = new THREE.MeshStandardMaterial({
    color: 0x034dae,
    metalness: 0.5,
    roughness: 0.25
  });

  const neck_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x075071,
    metalness: 0.0,
    roughness: 0.45,
    transparent: true,
    opacity: 0.72
  });

  const base_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x238b83,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.55
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.330, 0.000),
    new THREE.Vector2(0.390, 0.025),
    new THREE.Vector2(0.420, 0.080),
    new THREE.Vector2(0.430, 0.180),
    new THREE.Vector2(0.430, 1.280),
    new THREE.Vector2(0.425, 1.400),
    new THREE.Vector2(0.400, 1.550),
    new THREE.Vector2(0.350, 1.700),
    new THREE.Vector2(0.280, 1.840),
    new THREE.Vector2(0.225, 1.960),
    new THREE.Vector2(0.200, 2.100),
    new THREE.Vector2(0.190, 2.340),
    new THREE.Vector2(0.205, 2.430),
    new THREE.Vector2(0.225, 2.480),
    new THREE.Vector2(0.205, 2.530)
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 48);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.name = "bottle_body";
  bottle_body.renderOrder = 3;
  bottle_group.add(bottle_body);

  const blue_liquidProfile = [
    new THREE.Vector2(0.000, 0.080),
    new THREE.Vector2(0.330, 0.080),
    new THREE.Vector2(0.380, 0.120),
    new THREE.Vector2(0.390, 0.200),
    new THREE.Vector2(0.390, 1.280),
    new THREE.Vector2(0.380, 1.400),
    new THREE.Vector2(0.350, 1.550),
    new THREE.Vector2(0.300, 1.700),
    new THREE.Vector2(0.250, 1.840),
    new THREE.Vector2(0.215, 1.980),
    new THREE.Vector2(0.000, 1.980)
  ];
  const blue_liquidGeom = new THREE.LatheGeometry(blue_liquidProfile, 40);
  const blue_liquid = new THREE.Mesh(blue_liquidGeom, blue_liquidMat);
  blue_liquid.name = "blue_liquid";
  blue_liquid.renderOrder = 1;
  contents_group.add(blue_liquid);

  const liquid_surfaceGeom = new THREE.CylinderGeometry(0.215, 0.215, 0.012, 40);
  const liquid_surface = new THREE.Mesh(liquid_surfaceGeom, blue_liquidMat);
  liquid_surface.name = "liquid_surface";
  liquid_surface.position.y = 1.982;
  contents_group.add(liquid_surface);

  const liquid_meniscusGeom = new THREE.TorusGeometry(0.205, 0.008, 8, 40);
  const liquid_meniscus = new THREE.Mesh(liquid_meniscusGeom, neck_shadowMat);
  liquid_meniscus.name = "liquid_meniscus";
  liquid_meniscus.rotation.x = Math.PI / 2;
  liquid_meniscus.position.y = 1.988;
  contents_group.add(liquid_meniscus);

  const blueberryGeom = new THREE.SphereGeometry(0.15, 20, 14);
  const blueberryData = [
    [-0.16, 0.28,  0.10, 1.05, 0.95, 1.00],
    [ 0.16, 0.30, -0.08, 0.95, 1.05, 1.02],
    [-0.02, 0.55,  0.18, 1.10, 1.00, 0.95],
    [ 0.15, 0.78,  0.08, 0.98, 1.08, 1.00],
    [-0.16, 0.82, -0.08, 1.05, 0.96, 1.00],
    [ 0.00, 1.03,  0.18, 1.08, 1.00, 0.96],
    [ 0.14, 1.25, -0.05, 0.95, 1.05, 1.00],
    [-0.14, 1.28,  0.08, 1.05, 1.00, 0.95],
    [ 0.02, 1.48,  0.16, 1.00, 1.06, 1.00],
    [ 0.12, 1.66, -0.03, 0.90, 1.00, 0.95],
    [-0.10, 1.68,  0.08, 0.95, 1.02, 1.00],
    [ 0.00, 1.84,  0.06, 0.82, 0.90, 0.85]
  ];

  const blueberry_cluster = new THREE.InstancedMesh(
    blueberryGeom,
    blueberryMat,
    blueberryData.length
  );
  blueberry_cluster.name = "blueberry_cluster";

  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < blueberryData.length; i++) {
    const berry = blueberryData[i];
    instance_dummy.position.set(berry[0], berry[1], berry[2]);
    instance_dummy.rotation.set(0, i * 0.43, i * 0.17);
    instance_dummy.scale.set(berry[3], berry[4], berry[5]);
    instance_dummy.updateMatrix();
    blueberry_cluster.setMatrixAt(i, instance_dummy.matrix);
  }
  blueberry_cluster.instanceMatrix.needsUpdate = true;
  contents_group.add(blueberry_cluster);

  const blueberry_crownShape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 === 0 ? 0.043 : 0.017;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) blueberry_crownShape.moveTo(x, y);
    else blueberry_crownShape.lineTo(x, y);
  }
  blueberry_crownShape.closePath();

  const blueberry_crownGeom = new THREE.ShapeGeometry(blueberry_crownShape);
  const crownData = [
    [-0.16, 0.28, 0.252, 1.00],
    [ 0.00, 0.55, 0.332, 1.05],
    [-0.16, 0.82, 0.070, 0.95],
    [ 0.00, 1.03, 0.332, 1.05],
    [ 0.12, 1.66, 0.120, 0.90],
    [-0.10, 1.68, 0.170, 0.92],
    [ 0.00, 1.84, 0.150, 0.82]
  ];

  const blueberry_crowns = new THREE.InstancedMesh(
    blueberry_crownGeom,
    blueberry_crownMat,
    crownData.length
  );
  blueberry_crowns.name = "blueberry_crowns";

  for (let i = 0; i < crownData.length; i++) {
    const crown = crownData[i];
    instance_dummy.position.set(crown[0], crown[1], crown[2]);
    instance_dummy.rotation.set(0, 0, i * 0.31);
    instance_dummy.scale.setScalar(crown[3]);
    instance_dummy.updateMatrix();
    blueberry_crowns.setMatrixAt(i, instance_dummy.matrix);
  }
  blueberry_crowns.instanceMatrix.needsUpdate = true;
  contents_group.add(blueberry_crowns);

  const bottle_base_ringGeom = new THREE.TorusGeometry(0.370, 0.027, 10, 48);
  const bottle_base_ring = new THREE.Mesh(bottle_base_ringGeom, base_glassMat);
  bottle_base_ring.name = "bottle_base_ring";
  bottle_base_ring.rotation.x = Math.PI / 2;
  bottle_base_ring.position.y = 0.045;
  bottle_group.add(bottle_base_ring);

  const neck_lipGeom = new THREE.CylinderGeometry(0.218, 0.205, 0.085, 40);
  const neck_lip = new THREE.Mesh(neck_lipGeom, bottle_bodyMat);
  neck_lip.name = "neck_lip";
  neck_lip.position.y = 2.485;
  bottle_group.add(neck_lip);

  const neck_lower_ringGeom = new THREE.TorusGeometry(0.205, 0.016, 10, 40);
  const neck_lower_ring = new THREE.Mesh(neck_lower_ringGeom, neck_shadowMat);
  neck_lower_ring.name = "neck_lower_ring";
  neck_lower_ring.rotation.x = Math.PI / 2;
  neck_lower_ring.position.y = 2.445;
  bottle_group.add(neck_lower_ring);

  const neck_upper_ringGeom = new THREE.TorusGeometry(0.213, 0.018, 10, 40);
  const neck_upper_ring = new THREE.Mesh(neck_upper_ringGeom, neck_shadowMat);
  neck_upper_ring.name = "neck_upper_ring";
  neck_upper_ring.rotation.x = Math.PI / 2;
  neck_upper_ring.position.y = 2.515;
  bottle_group.add(neck_upper_ring);

  function bottleRadiusAt(y) {
    if (y <= 1.35) return 0.43;
    if (y <= 1.55) return 0.43 - (y - 1.35) / 0.20 * 0.03;
    if (y <= 1.84) return 0.40 - (y - 1.55) / 0.29 * 0.12;
    if (y <= 2.10) return 0.28 - (y - 1.84) / 0.26 * 0.08;
    return 0.20;
  }

  function makeBottleHighlight(angle, y0, y1, radius) {
    const points = [];
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      const y = y0 + (y1 - y0) * t;
      const a = angle + Math.sin(t * Math.PI) * 0.035;
      const r = bottleRadiusAt(y) + 0.008;
      points.push(new THREE.Vector3(
        Math.sin(a) * r,
        y,
        Math.cos(a) * r
      ));
    }
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        28,
        radius,
        6,
        false
      ),
      highlightMat
    );
  }

  const bottle_highlight_left = makeBottleHighlight(-0.56, 1.31, 2.37, 0.014);
  bottle_highlight_left.name = "bottle_highlight_left";
  bottle_group.add(bottle_highlight_left);

  const bottle_highlight_right = makeBottleHighlight(0.48, 1.42, 2.30, 0.008);
  bottle_highlight_right.name = "bottle_highlight_right";
  bottle_group.add(bottle_highlight_right);

  function createCurvedPanelGeometry(
    radius,
    angleStart,
    angleEnd,
    segments,
    bottomAt,
    topAt
  ) {
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = angleStart + (angleEnd - angleStart) * t;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      positions.push(x, bottomAt(t), z);
      positions.push(x, topAt(t), z);
    }

    for (let i = 0; i < segments; i++) {
      const bottom0 = i * 2;
      const top0 = bottom0 + 1;
      const bottom1 = bottom0 + 2;
      const top1 = bottom0 + 3;
      indices.push(bottom0, bottom1, top0);
      indices.push(bottom1, top1, top0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function makeCurvedShape(points, radius, material, name) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();

    const geometry = new THREE.ShapeGeometry(shape);
    const position = geometry.getAttribute("position");
    for (let i = 0; i < position.count; i++) {
      const tangentX = position.getX(i);
      const y = position.getY(i);
      const angle = tangentX / radius;
      position.setXYZ(
        i,
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius
      );
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();

    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }

  const labelRadius = 0.438;
  const labelAngleStart = -1.12;
  const labelAngleEnd = 1.12;

  function mainLabelBottom(t) {
    return 0.50 + 0.10 * t - 0.035 * Math.sin(t * Math.PI);
  }

  function mainLabelTop(t) {
    return 1.31 - 0.25 * t - 0.035 * Math.sin(t * Math.PI);
  }

  const main_label_borderGeom = createCurvedPanelGeometry(
    labelRadius,
    labelAngleStart,
    labelAngleEnd,
    28,
    mainLabelBottom,
    mainLabelTop
  );
  const main_label_border = new THREE.Mesh(main_label_borderGeom, label_whiteMat);
  main_label_border.name = "main_label_border";
  label_group.add(main_label_border);

  const innerAngleStart = -1.075;
  const innerAngleEnd = 1.075;
  const main_label_blueGeom = createCurvedPanelGeometry(
    labelRadius + 0.004,
    innerAngleStart,
    innerAngleEnd,
    28,
    function (t) {
      return mainLabelBottom(t) + 0.025;
    },
    function (t) {
      return mainLabelTop(t) - 0.025;
    }
  );
  const main_label_blue = new THREE.Mesh(main_label_blueGeom, label_blueMat);
  main_label_blue.name = "main_label_blue";
  label_group.add(main_label_blue);

  const textAngleStart = -1.065;
  const textAngleEnd = -0.255;
  const main_label_text_panelGeom = createCurvedPanelGeometry(
    labelRadius + 0.008,
    textAngleStart,
    textAngleEnd,
    14,
    function (t) {
      return 0.69 + 0.08 * t;
    },
    function (t) {
      return 1.25 - 0.08 * t;
    }
  );
  const main_label_text_panel = new THREE.Mesh(
    main_label_text_panelGeom,
    label_whiteMat
  );
  main_label_text_panel.name = "main_label_text_panel";
  label_group.add(main_label_text_panel);

  const textRows = [
    [-0.78, 1.125, 0.075, 0.018],
    [-0.73, 1.055, 0.105, 0.018],
    [-0.77, 0.985, 0.068, 0.018],
    [-0.72, 0.915, 0.110, 0.018],
    [-0.79, 0.820, 0.055, 0.014]
  ];
  const main_label_text_barGeom = new THREE.BoxGeometry(1, 1, 1);
  const main_label_text_bars = new THREE.InstancedMesh(
    main_label_text_barGeom,
    label_textMat,
    textRows.length
  );
  main_label_text_bars.name = "main_label_text_bars";

  for (let i = 0; i < textRows.length; i++) {
    const row = textRows[i];
    const angle = row[0];
    const r = labelRadius + 0.014;
    instance_dummy.position.set(
      Math.sin(angle) * r,
      row[1],
      Math.cos(angle) * r
    );
    instance_dummy.rotation.set(0, angle, 0);
    instance_dummy.scale.set(row[2], row[3], 0.006);
    instance_dummy.updateMatrix();
    main_label_text_bars.setMatrixAt(i, instance_dummy.matrix);
  }
  main_label_text_bars.instanceMatrix.needsUpdate = true;
  label_group.add(main_label_text_bars);

  const berry_printGeom = new THREE.CircleGeometry(0.10, 24);
  const berry_print = new THREE.Mesh(berry_printGeom, blueberryMat);
  berry_print.name = "berry_print";
  const berryPrintAngle = -0.05;
  const berryPrintRadius = labelRadius + 0.014;
  berry_print.position.set(
    Math.sin(berryPrintAngle) * berryPrintRadius,
    0.755,
    Math.cos(berryPrintAngle) * berryPrintRadius
  );
  berry_print.rotation.y = berryPrintAngle;
  berry_print.scale.set(1.25, 1.05, 1);
  label_group.add(berry_print);

  const berry_print_smallGeom = new THREE.CircleGeometry(0.055, 20);
  const berry_print_small = new THREE.Mesh(berry_print_smallGeom, blueberryMat);
  berry_print_small.name = "berry_print_small";
  const smallBerryAngle = 0.245;
  berry_print_small.position.set(
    Math.sin(smallBerryAngle) * (labelRadius + 0.015),
    0.965,
    Math.cos(smallBerryAngle) * (labelRadius + 0.015)
  );
  berry_print_small.rotation.y = smallBerryAngle;
  berry_print_small.scale.set(1.0, 0.9, 1);
  label_group.add(berry_print_small);

  const berry_print_crown = new THREE.Mesh(
    blueberry_crownGeom,
    blueberry_crownMat
  );
  berry_print_crown.name = "berry_print_crown";
  berry_print_crown.position.set(
    Math.sin(berryPrintAngle) * (labelRadius + 0.018),
    0.755,
    Math.cos(berryPrintAngle) * (labelRadius + 0.018)
  );
  berry_print_crown.rotation.y = berryPrintAngle;
  berry_print_crown.scale.setScalar(0.75);
  label_group.add(berry_print_crown);

  const label_leafGeom = new THREE.CircleGeometry(0.055, 20);
  const label_leaf = new THREE.Mesh(label_leafGeom, leafMat);
  label_leaf.name = "label_leaf";
  const leafAngle = 0.095;
  label_leaf.position.set(
    Math.sin(leafAngle) * (labelRadius + 0.018),
    0.925,
    Math.cos(leafAngle) * (labelRadius + 0.018)
  );
  label_leaf.rotation.set(0, leafAngle, -0.62);
  label_leaf.scale.set(1.45, 0.52, 1);
  label_group.add(label_leaf);

  const label_stem = makeCurvedShape([
    [-0.005, 0.785],
    [0.015, 0.830],
    [0.070, 0.885],
    [0.125, 0.935],
    [0.132, 0.945],
    [0.108, 0.925],
    [0.055, 0.875],
    [0.008, 0.815]
  ], labelRadius + 0.019, leafMat, "label_stem");
  label_group.add(label_stem);

  const sideAngleStart = 0.93;
  const sideAngleEnd = 1.43;
  const side_label_borderGeom = createCurvedPanelGeometry(
    labelRadius,
    sideAngleStart,
    sideAngleEnd,
    12,
    function (t) {
      return 0.42 + 0.04 * t;
    },
    function (t) {
      return 1.20 - 0.06 * t;
    }
  );
  const side_label_border = new THREE.Mesh(
    side_label_borderGeom,
    label_whiteMat
  );
  side_label_border.name = "side_label_border";
  label_group.add(side_label_border);

  const side_label_pinkGeom = createCurvedPanelGeometry(
    labelRadius + 0.005,
    0.975,
    1.385,
    12,
    function (t) {
      return 0.47 + 0.03 * t;
    },
    function (t) {
      return 1.145 - 0.05 * t;
    }
  );
  const side_label_pink = new THREE.Mesh(
    side_label_pinkGeom,
    label_blueMat
  );
  side_label_pink.name = "side_label_pink";
  label_group.add(side_label_pink);

  const cap_bodyProfile = [
    new THREE.Vector2(0.000, 2.535),
    new THREE.Vector2(0.220, 2.535),
    new THREE.Vector2(0.238, 2.565),
    new THREE.Vector2(0.240, 2.610),
    new THREE.Vector2(0.225, 2.645),
    new THREE.Vector2(0.244, 2.680),
    new THREE.Vector2(0.247, 2.755),
    new THREE.Vector2(0.238, 2.815),
    new THREE.Vector2(0.215, 2.845),
    new THREE.Vector2(0.000, 2.845)
  ];
  const cap_bodyGeom = new THREE.LatheGeometry(cap_bodyProfile, 48);
  const cap_body = new THREE.Mesh(cap_bodyGeom, capMat);
  cap_body.name = "cap_body";
  cap_group.add(cap_body);

  const cap_lower_bandGeom = new THREE.CylinderGeometry(
    0.238,
    0.232,
    0.060,
    40
  );
  const cap_lower_band = new THREE.Mesh(cap_lower_bandGeom, capMat);
  cap_lower_band.name = "cap_lower_band";
  cap_lower_band.position.y = 2.580;
  cap_group.add(cap_lower_band);

  const cap_thread_ringGeom = new THREE.TorusGeometry(0.226, 0.016, 10, 40);
  const cap_thread_ring = new THREE.Mesh(cap_thread_ringGeom, cap_ridgeMat);
  cap_thread_ring.name = "cap_thread_ring";
  cap_thread_ring.rotation.x = Math.PI / 2;
  cap_thread_ring.position.y = 2.635;
  cap_group.add(cap_thread_ring);

  const cap_ridgeGeom = new THREE.BoxGeometry(0.018, 0.125, 0.014);
  const capRidgeCount = 24;
  const cap_ridges = new THREE.InstancedMesh(
    cap_ridgeGeom,
    cap_ridgeMat,
    capRidgeCount
  );
  cap_ridges.name = "cap_ridges";

  for (let i = 0; i < capRidgeCount; i++) {
    const angle = i / capRidgeCount * Math.PI * 2;
    const radius = 0.247;
    instance_dummy.position.set(
      Math.sin(angle) * radius,
      2.748,
      Math.cos(angle) * radius
    );
    instance_dummy.rotation.set(0, angle, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    cap_ridges.setMatrixAt(i, instance_dummy.matrix);
  }
  cap_ridges.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_ridges);

  const cap_top_ringGeom = new THREE.TorusGeometry(0.218, 0.018, 10, 48);
  const cap_top_ring = new THREE.Mesh(cap_top_ringGeom, capMat);
  cap_top_ring.name = "cap_top_ring";
  cap_top_ring.rotation.x = Math.PI / 2;
  cap_top_ring.position.y = 2.825;
  cap_group.add(cap_top_ring);

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