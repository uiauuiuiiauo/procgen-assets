export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "glass_flower_globe";

  const glass_globeMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f2f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });
  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8e9e9,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    depthWrite: false
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x376f2d,
    metalness: 0.0,
    roughness: 0.8
  });
  const monstera_leafMat = new THREE.MeshStandardMaterial({
    color: 0x285d27,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const palm_leafletMat = new THREE.MeshStandardMaterial({
    color: 0x3d7c32,
    metalness: 0.0,
    roughness: 0.75,
    side: THREE.DoubleSide
  });
  const leaf_veinMat = new THREE.MeshStandardMaterial({
    color: 0x78984c,
    metalness: 0.0,
    roughness: 0.8
  });
  const budMat = new THREE.MeshStandardMaterial({
    color: 0xc98b35,
    metalness: 0.0,
    roughness: 0.75
  });

  const pink_petalMat = new THREE.MeshStandardMaterial({
    color: 0xe7448c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pale_pink_petalMat = new THREE.MeshStandardMaterial({
    color: 0xf477ad,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const deep_pink_petalMat = new THREE.MeshStandardMaterial({
    color: 0xb51e63,
    metalness: 0.0,
    roughness: 0.72,
    side: THREE.DoubleSide
  });
  const orange_petalMat = new THREE.MeshStandardMaterial({
    color: 0xf27622,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const yellow_petalMat = new THREE.MeshStandardMaterial({
    color: 0xffd52f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const yellow_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffef72,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const blue_petalMat = new THREE.MeshStandardMaterial({
    color: 0x476fd1,
    metalness: 0.0,
    roughness: 0.75,
    side: THREE.DoubleSide
  });
  const flower_centerMat = new THREE.MeshStandardMaterial({
    color: 0x5b102d,
    metalness: 0.0,
    roughness: 0.8
  });
  const pollenMat = new THREE.MeshStandardMaterial({
    color: 0xf4c84c,
    metalness: 0.0,
    roughness: 0.7
  });

  const bouquet = new THREE.Group();
  bouquet.name = "flower_bouquet";
  root.add(bouquet);

  function createTube(points, radius, material, tubularSegments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubularSegments, radius, 7, false),
      material
    );
  }

  const flower_stems = new THREE.Group();
  flower_stems.name = "flower_stems";
  bouquet.add(flower_stems);

  const central_pink_stem = createTube([
    new THREE.Vector3(-0.04, -0.62, -0.06),
    new THREE.Vector3(0.01, -0.18, -0.02),
    new THREE.Vector3(0.06, 0.12, 0.18)
  ], 0.012, stemMat, 22);
  flower_stems.add(central_pink_stem);

  const orange_hibiscus_stem = createTube([
    new THREE.Vector3(0.02, -0.62, -0.08),
    new THREE.Vector3(0.18, -0.20, -0.02),
    new THREE.Vector3(0.29, 0.03, 0.16)
  ], 0.012, stemMat, 22);
  flower_stems.add(orange_hibiscus_stem);

  const front_yellow_stem = createTube([
    new THREE.Vector3(-0.08, -0.66, -0.03),
    new THREE.Vector3(-0.18, -0.31, 0.04),
    new THREE.Vector3(-0.28, -0.18, 0.27)
  ], 0.013, stemMat, 22);
  flower_stems.add(front_yellow_stem);

  const upper_left_yellow_stem = createTube([
    new THREE.Vector3(-0.12, -0.55, -0.12),
    new THREE.Vector3(-0.28, 0.08, -0.04),
    new THREE.Vector3(-0.43, 0.43, 0.08)
  ], 0.011, stemMat, 24);
  flower_stems.add(upper_left_yellow_stem);

  const upper_right_yellow_stem = createTube([
    new THREE.Vector3(0.06, -0.55, -0.12),
    new THREE.Vector3(0.24, 0.08, -0.04),
    new THREE.Vector3(0.40, 0.43, 0.07)
  ], 0.011, stemMat, 24);
  flower_stems.add(upper_right_yellow_stem);

  const left_pink_stem = createTube([
    new THREE.Vector3(-0.12, -0.58, -0.08),
    new THREE.Vector3(-0.31, -0.08, -0.01),
    new THREE.Vector3(-0.50, 0.12, 0.12)
  ], 0.012, stemMat, 22);
  flower_stems.add(left_pink_stem);

  const small_pink_stem = createTube([
    new THREE.Vector3(-0.03, -0.62, -0.01),
    new THREE.Vector3(-0.08, -0.24, 0.08),
    new THREE.Vector3(-0.12, -0.08, 0.28)
  ], 0.010, stemMat, 20);
  flower_stems.add(small_pink_stem);

  const blue_flower_stems = new THREE.Group();
  blue_flower_stems.name = "blue_flower_stems";
  flower_stems.add(blue_flower_stems);

  const left_blue_stem = createTube([
    new THREE.Vector3(-0.10, -0.61, -0.04),
    new THREE.Vector3(-0.25, -0.24, 0.02),
    new THREE.Vector3(-0.36, -0.03, 0.20)
  ], 0.009, stemMat, 20);
  blue_flower_stems.add(left_blue_stem);

  const right_blue_stem = createTube([
    new THREE.Vector3(0.10, -0.61, -0.04),
    new THREE.Vector3(0.27, -0.25, 0.02),
    new THREE.Vector3(0.38, -0.22, 0.20)
  ], 0.009, stemMat, 20);
  blue_flower_stems.add(right_blue_stem);

  const right_pink_stem = createTube([
    new THREE.Vector3(0.08, -0.58, -0.07),
    new THREE.Vector3(0.31, -0.22, 0.00),
    new THREE.Vector3(0.49, -0.15, 0.12)
  ], 0.010, stemMat, 22);
  flower_stems.add(right_pink_stem);

  const right_orange_stem = createTube([
    new THREE.Vector3(0.12, -0.55, -0.12),
    new THREE.Vector3(0.36, -0.04, -0.03),
    new THREE.Vector3(0.56, 0.12, 0.02)
  ], 0.010, stemMat, 22);
  flower_stems.add(right_orange_stem);

  const foliage = new THREE.Group();
  foliage.name = "foliage";
  bouquet.add(foliage);

  const monstera_shape = new THREE.Shape();
  monstera_shape.moveTo(0, -0.52);
  monstera_shape.lineTo(-0.12, -0.43);
  monstera_shape.lineTo(-0.34, -0.42);
  monstera_shape.lineTo(-0.20, -0.29);
  monstera_shape.lineTo(-0.48, -0.25);
  monstera_shape.lineTo(-0.23, -0.11);
  monstera_shape.lineTo(-0.52, -0.02);
  monstera_shape.lineTo(-0.24, 0.08);
  monstera_shape.lineTo(-0.46, 0.22);
  monstera_shape.lineTo(-0.18, 0.22);
  monstera_shape.lineTo(-0.34, 0.39);
  monstera_shape.lineTo(-0.09, 0.31);
  monstera_shape.lineTo(0, 0.55);
  monstera_shape.lineTo(0.09, 0.31);
  monstera_shape.lineTo(0.34, 0.39);
  monstera_shape.lineTo(0.18, 0.22);
  monstera_shape.lineTo(0.46, 0.22);
  monstera_shape.lineTo(0.24, 0.08);
  monstera_shape.lineTo(0.52, -0.02);
  monstera_shape.lineTo(0.23, -0.11);
  monstera_shape.lineTo(0.48, -0.25);
  monstera_shape.lineTo(0.20, -0.29);
  monstera_shape.lineTo(0.34, -0.42);
  monstera_shape.lineTo(0.12, -0.43);
  monstera_shape.closePath();

  const monstera_leafGeom = new THREE.ExtrudeGeometry(monstera_shape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: false
  });
  const monstera_leafData = [
    [-0.20, 0.04, 0.05, 0.42, 0.50, -0.85],
    [0.17, 0.03, 0.02, 0.40, 0.48, 0.72],
    [-0.27, -0.28, 0.17, 0.43, 0.46, -1.12],
    [0.20, -0.31, 0.20, 0.48, 0.52, 0.82],
    [-0.04, 0.25, -0.04, 0.35, 0.43, -0.28],
    [0.04, -0.45, -0.04, 0.40, 0.43, 0.08]
  ];
  const monstera_leaves = new THREE.InstancedMesh(
    monstera_leafGeom,
    monstera_leafMat,
    monstera_leafData.length
  );
  monstera_leaves.name = "monstera_leaves";

  const monstera_veinGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.76, 7);
  const monstera_veins = new THREE.InstancedMesh(
    monstera_veinGeom,
    leaf_veinMat,
    monstera_leafData.length
  );
  monstera_veins.name = "monstera_leaf_veins";

  const foliage_dummy = new THREE.Object3D();
  for (let i = 0; i < monstera_leafData.length; i++) {
    const data = monstera_leafData[i];
    foliage_dummy.position.set(data[0], data[1], data[2]);
    foliage_dummy.rotation.set(0, 0, data[5]);
    foliage_dummy.scale.set(data[3], data[4], 1);
    foliage_dummy.updateMatrix();
    monstera_leaves.setMatrixAt(i, foliage_dummy.matrix);

    foliage_dummy.position.set(data[0], data[1], data[2] + 0.018);
    foliage_dummy.rotation.set(0, 0, data[5]);
    foliage_dummy.scale.set(1, data[4], 1);
    foliage_dummy.updateMatrix();
    monstera_veins.setMatrixAt(i, foliage_dummy.matrix);
  }
  monstera_leaves.instanceMatrix.needsUpdate = true;
  monstera_veins.instanceMatrix.needsUpdate = true;
  foliage.add(monstera_leaves, monstera_veins);

  const palm_leaflet_shape = new THREE.Shape();
  palm_leaflet_shape.moveTo(0, -0.5);
  palm_leaflet_shape.bezierCurveTo(-0.055, -0.28, -0.055, 0.24, 0, 0.5);
  palm_leaflet_shape.bezierCurveTo(0.055, 0.24, 0.055, -0.28, 0, -0.5);
  palm_leaflet_shape.closePath();
  const palm_leafletGeom = new THREE.ExtrudeGeometry(palm_leaflet_shape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: false
  });

  const palm_fronds = new THREE.Group();
  palm_fronds.name = "palm_fronds";
  foliage.add(palm_fronds);

  const palm_leafletData = [];
  function addPalmFrond(name, x0, y0, z0, x1, y1, z1, count, curveAmount) {
    const frond = new THREE.Group();
    frond.name = name;

    const frond_stem = createTube([
      new THREE.Vector3(x0, y0, z0),
      new THREE.Vector3(
        (x0 + x1) * 0.5 + curveAmount,
        (y0 + y1) * 0.5,
        (z0 + z1) * 0.5
      ),
      new THREE.Vector3(x1, y1, z1)
    ], 0.009, stemMat, 22);
    frond.add(frond_stem);

    const dx = x1 - x0;
    const dy = y1 - y0;
    const stemAngle = Math.atan2(-dx, dy);
    for (let i = 0; i < count; i++) {
      const t = (i + 1) / (count + 1);
      const px = x0 + dx * t + Math.sin(t * Math.PI) * curveAmount;
      const py = y0 + dy * t;
      const pz = z0 + (z1 - z0) * t;
      for (const side of [-1, 1]) {
        palm_leafletData.push([
          px + side * 0.018,
          py,
          pz,
          0.30 + 0.04 * (i % 3),
          0.28 + 0.025 * ((i + 1) % 3),
          stemAngle - side * (0.72 + 0.05 * (i % 2))
        ]);
      }
    }
    palm_fronds.add(frond);
    return frond;
  }

  const left_upper_palm_frond = addPalmFrond(
    "left_upper_palm_frond", -0.08, -0.50, -0.10,
    -0.39, 0.48, -0.01, 6, -0.06
  );
  const right_upper_palm_frond = addPalmFrond(
    "right_upper_palm_frond", 0.05, -0.50, -0.10,
    0.40, 0.48, -0.01, 6, 0.06
  );
  const left_middle_palm_frond = addPalmFrond(
    "left_middle_palm_frond", -0.02, -0.55, -0.08,
    -0.54, 0.22, 0.00, 5, -0.05
  );
  const right_middle_palm_frond = addPalmFrond(
    "right_middle_palm_frond", 0.02, -0.55, -0.08,
    0.54, 0.25, 0.00, 5, 0.05
  );
  const left_lower_palm_frond = addPalmFrond(
    "left_lower_palm_frond", -0.02, -0.58, -0.05,
    -0.46, -0.18, 0.04, 4, -0.04
  );
  const right_lower_palm_frond = addPalmFrond(
    "right_lower_palm_frond", 0.02, -0.58, -0.05,
    0.47, -0.16, 0.04, 4, 0.04
  );

  const palm_leaflets = new THREE.InstancedMesh(
    palm_leafletGeom,
    palm_leafletMat,
    palm_leafletData.length
  );
  palm_leaflets.name = "palm_leaflets";
  for (let i = 0; i < palm_leafletData.length; i++) {
    const data = palm_leafletData[i];
    foliage_dummy.position.set(data[0], data[1], data[2]);
    foliage_dummy.rotation.set(0, 0, data[5]);
    foliage_dummy.scale.set(data[3], data[4], 1);
    foliage_dummy.updateMatrix();
    palm_leaflets.setMatrixAt(i, foliage_dummy.matrix);
  }
  palm_leaflets.instanceMatrix.needsUpdate = true;
  foliage.add(palm_leaflets);

  const closed_bud_profile = [
    new THREE.Vector2(0.00, -0.22),
    new THREE.Vector2(0.055, -0.20),
    new THREE.Vector2(0.085, -0.05),
    new THREE.Vector2(0.070, 0.12),
    new THREE.Vector2(0.025, 0.22),
    new THREE.Vector2(0.00, 0.25)
  ];
  const closed_budGeom = new THREE.LatheGeometry(closed_bud_profile, 20);

  const central_orange_bud = new THREE.Mesh(closed_budGeom, orange_petalMat);
  central_orange_bud.name = "central_orange_bud";
  central_orange_bud.position.set(0.03, 0.34, -0.03);
  central_orange_bud.rotation.z = -0.12;
  central_orange_bud.scale.set(0.82, 0.92, 0.82);
  bouquet.add(central_orange_bud);

  const left_yellow_bud = new THREE.Mesh(closed_budGeom, yellow_petalMat);
  left_yellow_bud.name = "left_yellow_bud";
  left_yellow_bud.position.set(-0.09, 0.32, -0.07);
  left_yellow_bud.rotation.z = 0.18;
  left_yellow_bud.scale.set(0.70, 0.86, 0.70);
  bouquet.add(left_yellow_bud);

  const lower_diagonal_bud = new THREE.Mesh(closed_budGeom, budMat);
  lower_diagonal_bud.name = "lower_diagonal_bud";
  lower_diagonal_bud.position.set(0.03, -0.40, 0.08);
  lower_diagonal_bud.rotation.z = -0.72;
  lower_diagonal_bud.scale.set(0.72, 0.92, 0.72);
  bouquet.add(lower_diagonal_bud);

  const petal_shape = new THREE.Shape();
  petal_shape.moveTo(0, -0.018);
  petal_shape.bezierCurveTo(-0.045, 0.015, -0.115, 0.085, -0.105, 0.175);
  petal_shape.bezierCurveTo(-0.095, 0.255, -0.040, 0.305, 0, 0.320);
  petal_shape.bezierCurveTo(0.040, 0.305, 0.095, 0.255, 0.105, 0.175);
  petal_shape.bezierCurveTo(0.115, 0.085, 0.045, 0.015, 0, -0.018);
  petal_shape.closePath();

  const petalGeom = new THREE.ExtrudeGeometry(petal_shape, {
    depth: 0.010,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 1
  });
  const flower_centerGeom = new THREE.SphereGeometry(0.045, 18, 10);
  const stamenGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.23, 8);
  const antherGeom = new THREE.SphereGeometry(0.014, 12, 8);

  function createHibiscus(name, petalMaterial, accentMaterial, size, x, y, z, rotation) {
    const flower = new THREE.Group();
    flower.name = name;

    const petals = new THREE.InstancedMesh(petalGeom, petalMaterial, 5);
    petals.name = name + "_petals";
    const petal_dummy = new THREE.Object3D();
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      petal_dummy.position.set(0, 0, i * 0.0015);
      petal_dummy.rotation.set(0, 0, angle);
      petal_dummy.scale.set(
        0.94 + 0.04 * (i % 2),
        0.96 + 0.025 * ((i + 1) % 2),
        1
      );
      petal_dummy.updateMatrix();
      petals.setMatrixAt(i, petal_dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    if (accentMaterial) {
      const accents = new THREE.InstancedMesh(petalGeom, accentMaterial, 5);
      accents.name = name + "_petal_accents";
      for (let i = 0; i < 5; i++) {
        const angle = i / 5 * Math.PI * 2;
        petal_dummy.position.set(
          -Math.sin(angle) * 0.025,
          Math.cos(angle) * 0.025,
          0.018
        );
        petal_dummy.rotation.set(0, 0, angle);
        petal_dummy.scale.set(0.34, 0.58, 0.7);
        petal_dummy.updateMatrix();
        accents.setMatrixAt(i, petal_dummy.matrix);
      }
      accents.instanceMatrix.needsUpdate = true;
      flower.add(accents);
    }

    const center = new THREE.Mesh(flower_centerGeom, flower_centerMat);
    center.name = name + "_center";
    center.position.z = 0.032;
    center.scale.set(1, 1, 0.55);
    flower.add(center);

    const stamen = new THREE.Mesh(stamenGeom, pollenMat);
    stamen.name = name + "_stamen";
    stamen.position.set(0.012, 0.085, 0.055);
    stamen.rotation.z = -0.10;
    flower.add(stamen);

    const anther = new THREE.Mesh(antherGeom, pollenMat);
    anther.name = name + "_anther";
    anther.position.set(0.024, 0.202, 0.055);
    flower.add(anther);

    flower.position.set(x, y, z);
    flower.rotation.z = rotation;
    flower.scale.setScalar(size);
    bouquet.add(flower);
    return flower;
  }

  const central_pink_hibiscus = createHibiscus(
    "central_pink_hibiscus",
    pink_petalMat,
    deep_pink_petalMat,
    0.96,
    0.06, 0.12, 0.31,
    0.08
  );
  const orange_hibiscus = createHibiscus(
    "orange_hibiscus",
    orange_petalMat,
    yellow_petalMat,
    0.84,
    0.29, -0.05, 0.30,
    -0.18
  );
  const front_yellow_hibiscus = createHibiscus(
    "front_yellow_hibiscus",
    yellow_petalMat,
    orange_petalMat,
    0.84,
    -0.28, -0.22, 0.36,
    -0.16
  );
  const upper_left_yellow_hibiscus = createHibiscus(
    "upper_left_yellow_hibiscus",
    yellow_petalMat,
    orange_petalMat,
    0.62,
    -0.43, 0.43, 0.13,
    -0.25
  );
  const upper_right_yellow_hibiscus = createHibiscus(
    "upper_right_yellow_hibiscus",
    yellow_petalMat,
    orange_petalMat,
    0.60,
    0.40, 0.43, 0.12,
    0.18
  );
  const left_pink_hibiscus = createHibiscus(
    "left_pink_hibiscus",
    deep_pink_petalMat,
    pale_pink_petalMat,
    0.68,
    -0.50, 0.12, 0.16,
    -0.34
  );
  const small_pink_hibiscus = createHibiscus(
    "small_pink_hibiscus",
    pale_pink_petalMat,
    deep_pink_petalMat,
    0.50,
    -0.12, -0.08, 0.34,
    0.12
  );
  const right_pink_hibiscus = createHibiscus(
    "right_pink_hibiscus",
    pale_pink_petalMat,
    deep_pink_petalMat,
    0.50,
    0.49, -0.16, 0.16,
    0.28
  );
  const right_orange_hibiscus = createHibiscus(
    "right_orange_hibiscus",
    orange_petalMat,
    yellow_petalMat,
    0.52,
    0.56, 0.12, 0.06,
    -0.12
  );

  const petal_shape_small = new THREE.Shape();
  petal_shape_small.moveTo(0, -0.012);
  petal_shape_small.bezierCurveTo(-0.035, 0.015, -0.075, 0.085, -0.068, 0.145);
  petal_shape_small.bezierCurveTo(-0.058, 0.205, -0.022, 0.245, 0, 0.255);
  petal_shape_small.bezierCurveTo(0.022, 0.245, 0.058, 0.205, 0.068, 0.145);
  petal_shape_small.bezierCurveTo(0.075, 0.085, 0.035, 0.015, 0, -0.012);
  petal_shape_small.closePath();
  const small_petalGeom = new THREE.ExtrudeGeometry(petal_shape_small, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.002,
    bevelSegments: 1
  });
  const small_centerGeom = new THREE.SphereGeometry(0.027, 14, 8);

  function createRoundFlower(name, petalMaterial, count, size, x, y, z, rotation) {
    const flower = new THREE.Group();
    flower.name = name;

    const petals = new THREE.InstancedMesh(small_petalGeom, petalMaterial, count);
    petals.name = name + "_petals";
    const petal_dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      petal_dummy.position.set(0, 0, i * 0.001);
      petal_dummy.rotation.set(0, 0, angle);
      petal_dummy.scale.set(
        0.92 + 0.05 * (i % 2),
        0.94 + 0.035 * ((i + 1) % 2),
        1
      );
      petal_dummy.updateMatrix();
      petals.setMatrixAt(i, petal_dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    const center = new THREE.Mesh(small_centerGeom, flower_centerMat);
    center.name = name + "_center";
    center.position.z = 0.025;
    center.scale.set(1, 1, 0.55);
    flower.add(center);

    flower.position.set(x, y, z);
    flower.rotation.z = rotation;
    flower.scale.setScalar(size);
    bouquet.add(flower);
    return flower;
  }

  const left_blue_daisy = createRoundFlower(
    "left_blue_daisy",
    blue_petalMat,
    10,
    0.56,
    -0.36, -0.03, 0.25,
    0.10
  );
  const right_blue_daisy = createRoundFlower(
    "right_blue_daisy",
    blue_petalMat,
    10,
    0.48,
    0.38, -0.23, 0.25,
    -0.12
  );
  const lower_pink_daisy = createRoundFlower(
    "lower_pink_daisy",
    pale_pink_petalMat,
    11,
    0.43,
    -0.40, -0.28, 0.23,
    0.18
  );

  const glass_globeGeom = new THREE.SphereGeometry(0.75, 64, 36);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glass_globeMat);
  glass_globe.name = "glass_globe";
  glass_globe.renderOrder = 20;
  root.add(glass_globe);

  const glass_outlineGeom = new THREE.TorusGeometry(0.742, 0.009, 10, 96);
  const glass_outline = new THREE.Mesh(glass_outlineGeom, glass_edgeMat);
  glass_outline.name = "glass_outline";
  glass_outline.position.z = 0.008;
  glass_outline.renderOrder = 21;
  root.add(glass_outline);

  const glass_base_ringGeom = new THREE.TorusGeometry(0.235, 0.012, 10, 64);
  const glass_base_ring = new THREE.Mesh(glass_base_ringGeom, glass_edgeMat);
  glass_base_ring.name = "glass_base_ring";
  glass_base_ring.rotation.x = Math.PI / 2;
  glass_base_ring.position.y = -0.692;
  glass_base_ring.renderOrder = 21;
  root.add(glass_base_ring);

  const top_rim_outerGeom = new THREE.TorusGeometry(0.180, 0.017, 12, 64);
  const top_rim_outer = new THREE.Mesh(top_rim_outerGeom, glass_edgeMat);
  top_rim_outer.name = "top_rim_outer";
  top_rim_outer.rotation.x = Math.PI / 2;
  top_rim_outer.position.y = 0.716;
  top_rim_outer.renderOrder = 22;
  root.add(top_rim_outer);

  const top_rim_innerGeom = new THREE.TorusGeometry(0.112, 0.010, 10, 56);
  const top_rim_inner = new THREE.Mesh(top_rim_innerGeom, glass_edgeMat);
  top_rim_inner.name = "top_rim_inner";
  top_rim_inner.rotation.x = Math.PI / 2;
  top_rim_inner.position.y = 0.722;
  top_rim_inner.renderOrder = 22;
  root.add(top_rim_inner);

  const top_glass_discGeom = new THREE.RingGeometry(0.105, 0.188, 64);
  const top_glass_disc = new THREE.Mesh(top_glass_discGeom, glass_globeMat);
  top_glass_disc.name = "top_glass_disc";
  top_glass_disc.rotation.x = -Math.PI / 2;
  top_glass_disc.position.y = 0.714;
  top_glass_disc.renderOrder = 21;
  root.add(top_glass_disc);

  const left_glass_highlight = createTube([
    new THREE.Vector3(-0.60, -0.28, 0.27),
    new THREE.Vector3(-0.67, 0.02, 0.25),
    new THREE.Vector3(-0.59, 0.36, 0.24),
    new THREE.Vector3(-0.43, 0.56, 0.22)
  ], 0.007, glass_highlightMat, 28);
  left_glass_highlight.name = "left_glass_highlight";
  left_glass_highlight.renderOrder = 23;
  root.add(left_glass_highlight);

  const upper_glass_highlight = createTube([
    new THREE.Vector3(0.28, 0.62, 0.24),
    new THREE.Vector3(0.43, 0.54, 0.27),
    new THREE.Vector3(0.53, 0.40, 0.27)
  ], 0.005, glass_highlightMat, 18);
  upper_glass_highlight.name = "upper_glass_highlight";
  upper_glass_highlight.renderOrder = 23;
  root.add(upper_glass_highlight);

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