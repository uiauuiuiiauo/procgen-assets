export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "layered_fruit_cake";

  const cakeW = 1.36;
  const cakeD = 1.14;
  const baseW = 1.31;
  const baseD = 1.09;

  const crumbMat = new THREE.MeshStandardMaterial({
    color: 0xd2aa72,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crumbLightMat = new THREE.MeshStandardMaterial({
    color: 0xe0bd83,
    metalness: 0.0,
    roughness: 0.9,
  });
  const poreMat = new THREE.MeshStandardMaterial({
    color: 0x9b7043,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xfffbea,
    metalness: 0.0,
    roughness: 0.9,
  });
  const creamPoreMat = new THREE.MeshStandardMaterial({
    color: 0xe8ddbd,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const pinkCreamMat = new THREE.MeshStandardMaterial({
    color: 0xffc3d0,
    metalness: 0.0,
    roughness: 0.82,
  });
  const pinkPoreMat = new THREE.MeshStandardMaterial({
    color: 0xd9899d,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide,
  });
  const redFruitMat = new THREE.MeshPhysicalMaterial({
    color: 0xe32636,
    metalness: 0.0,
    roughness: 0.3,
    transmission: 0.06,
    ior: 1.4,
    transparent: true,
    opacity: 0.98,
  });
  const purpleFruitMat = new THREE.MeshPhysicalMaterial({
    color: 0x642176,
    metalness: 0.0,
    roughness: 0.3,
    transmission: 0.06,
    ior: 1.4,
    transparent: true,
    opacity: 0.98,
  });
  const greenFruitMat = new THREE.MeshPhysicalMaterial({
    color: 0x238b39,
    metalness: 0.0,
    roughness: 0.3,
    transmission: 0.06,
    ior: 1.4,
    transparent: true,
    opacity: 0.98,
  });
  const yellowFruitMat = new THREE.MeshPhysicalMaterial({
    color: 0xffc400,
    metalness: 0.0,
    roughness: 0.3,
    transmission: 0.06,
    ior: 1.4,
    transparent: true,
    opacity: 0.98,
  });
  const limeFruitMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8ee7d,
    metalness: 0.0,
    roughness: 0.3,
    transmission: 0.06,
    ior: 1.4,
    transparent: true,
    opacity: 0.98,
  });
  const redHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xff7277,
    metalness: 0.0,
    roughness: 0.4,
  });
  const purpleHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xad62b0,
    metalness: 0.0,
    roughness: 0.4,
  });
  const greenHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x82cf72,
    metalness: 0.0,
    roughness: 0.4,
  });
  const yellowHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xffe36d,
    metalness: 0.0,
    roughness: 0.4,
  });
  const chocolateMat = new THREE.MeshStandardMaterial({
    color: 0x3b211d,
    metalness: 0.0,
    roughness: 0.55,
  });
  const chocolateLightMat = new THREE.MeshStandardMaterial({
    color: 0x5b3329,
    metalness: 0.0,
    roughness: 0.58,
  });
  const chocolateDarkMat = new THREE.MeshStandardMaterial({
    color: 0x241412,
    metalness: 0.0,
    roughness: 0.65,
    side: THREE.DoubleSide,
  });
  const cookieCrumbMat = new THREE.MeshStandardMaterial({
    color: 0x8a4325,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldenCrumbMat = new THREE.MeshStandardMaterial({
    color: 0xbd6c2b,
    metalness: 0.0,
    roughness: 0.9,
  });

  function roundedSlabGeometry(w, h, d, radius, bevel) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const z0 = -d / 2;
    const z1 = d / 2;

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: h,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 6,
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, -h / 2, 0);
    return geometry;
  }

  function organicFillingGeometry(w, h, d, variant) {
    const shape = new THREE.Shape();

    if (variant === 0) {
      shape.moveTo(-w * 0.50, -h * 0.31);
      shape.bezierCurveTo(
        -w * 0.34,
        -h * 0.49,
        -w * 0.08,
        -h * 0.37,
        w * 0.12,
        -h * 0.46
      );
      shape.bezierCurveTo(
        w * 0.30,
        -h * 0.50,
        w * 0.46,
        -h * 0.34,
        w * 0.50,
        -h * 0.12
      );
      shape.bezierCurveTo(
        w * 0.55,
        h * 0.08,
        w * 0.43,
        h * 0.35,
        w * 0.23,
        h * 0.39
      );
      shape.bezierCurveTo(
        -w * 0.02,
        h * 0.47,
        -w * 0.28,
        h * 0.33,
        -w * 0.39,
        h * 0.23
      );
      shape.bezierCurveTo(
        -w * 0.54,
        h * 0.10,
        -w * 0.43,
        -h * 0.10,
        -w * 0.50,
        -h * 0.31
      );
    } else if (variant === 1) {
      shape.moveTo(-w * 0.46, -h * 0.38);
      shape.bezierCurveTo(
        -w * 0.25,
        -h * 0.48,
        -w * 0.05,
        -h * 0.34,
        w * 0.16,
        -h * 0.43
      );
      shape.bezierCurveTo(
        w * 0.35,
        -h * 0.45,
        w * 0.48,
        -h * 0.24,
        w * 0.46,
        -h * 0.02
      );
      shape.bezierCurveTo(
        w * 0.54,
        h * 0.20,
        w * 0.31,
        h * 0.43,
        w * 0.08,
        h * 0.36
      );
      shape.bezierCurveTo(
        -w * 0.16,
        h * 0.48,
        -w * 0.39,
        h * 0.29,
        -w * 0.35,
        h * 0.08
      );
      shape.bezierCurveTo(
        -w * 0.55,
        -h * 0.05,
        -w * 0.42,
        -h * 0.20,
        -w * 0.46,
        -h * 0.38
      );
    } else {
      shape.moveTo(-w * 0.48, -h * 0.27);
      shape.bezierCurveTo(
        -w * 0.31,
        -h * 0.46,
        -w * 0.07,
        -h * 0.35,
        w * 0.14,
        -h * 0.47
      );
      shape.bezierCurveTo(
        w * 0.34,
        -h * 0.42,
        w * 0.49,
        -h * 0.25,
        w * 0.45,
        -h * 0.03
      );
      shape.bezierCurveTo(
        w * 0.53,
        h * 0.23,
        w * 0.28,
        h * 0.42,
        w * 0.04,
        h * 0.35
      );
      shape.bezierCurveTo(
        -w * 0.20,
        h * 0.47,
        -w * 0.37,
        h * 0.22,
        -w * 0.43,
        h * 0.05
      );
      shape.bezierCurveTo(
        -w * 0.55,
        -h * 0.08,
        -w * 0.41,
        -h * 0.17,
        -w * 0.48,
        -h * 0.27
      );
    }

    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
      curveSegments: 8,
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  function makeBlob(
    name,
    material,
    x,
    y,
    z,
    sx,
    sy,
    sz,
    rx,
    ry,
    rz,
    parent
  ) {
    const blob = new THREE.Mesh(fruitBlobGeom, material);
    blob.name = name;
    blob.position.set(x, y, z);
    blob.scale.set(sx, sy, sz);
    blob.rotation.set(rx, ry, rz);
    parent.add(blob);
    return blob;
  }

  const fruitBlobGeom = new THREE.SphereGeometry(1, 20, 12);

  const cake_baseGeom = roundedSlabGeometry(baseW, 0.22, baseD, 0.055, 0.012);
  const cake_base = new THREE.Mesh(cake_baseGeom, crumbMat);
  cake_base.name = "cake_base";
  cake_base.position.y = 0.12;
  root.add(cake_base);

  const lower_cream_layerGeom = roundedSlabGeometry(
    cakeW * 0.98,
    0.20,
    cakeD * 0.98,
    0.065,
    0.012
  );
  const lower_cream_layer = new THREE.Mesh(lower_cream_layerGeom, creamMat);
  lower_cream_layer.name = "lower_cream_layer";
  lower_cream_layer.position.y = 0.32;
  root.add(lower_cream_layer);

  const fruit_cream_layerGeom = roundedSlabGeometry(
    cakeW,
    0.24,
    cakeD,
    0.07,
    0.012
  );
  const fruit_cream_layer = new THREE.Mesh(
    fruit_cream_layerGeom,
    pinkCreamMat
  );
  fruit_cream_layer.name = "fruit_cream_layer";
  fruit_cream_layer.position.y = 0.52;
  root.add(fruit_cream_layer);

  const upper_cream_layerGeom = roundedSlabGeometry(
    cakeW * 1.01,
    0.30,
    cakeD * 1.01,
    0.075,
    0.013
  );
  const upper_cream_layer = new THREE.Mesh(upper_cream_layerGeom, creamMat);
  upper_cream_layer.name = "upper_cream_layer";
  upper_cream_layer.position.y = 0.76;
  root.add(upper_cream_layer);

  const top_chocolate_layerGeom = roundedSlabGeometry(
    cakeW * 1.025,
    0.085,
    cakeD * 1.025,
    0.065,
    0.012
  );
  const top_chocolate_layer = new THREE.Mesh(
    top_chocolate_layerGeom,
    chocolateMat
  );
  top_chocolate_layer.name = "top_chocolate_layer";
  top_chocolate_layer.position.y = 0.94;
  root.add(top_chocolate_layer);

  const front_fruit = new THREE.Group();
  front_fruit.name = "front_fruit";
  root.add(front_fruit);

  const front_red_fruit_leftGeom = organicFillingGeometry(
    0.44,
    0.27,
    0.034,
    0
  );
  const front_red_fruit_left = new THREE.Mesh(
    front_red_fruit_leftGeom,
    redFruitMat
  );
  front_red_fruit_left.name = "front_red_fruit_left";
  front_red_fruit_left.position.set(-0.45, 0.55, cakeD / 2 + 0.006);
  front_fruit.add(front_red_fruit_left);

  const front_purple_fruitGeom = organicFillingGeometry(
    0.43,
    0.29,
    0.034,
    1
  );
  const front_purple_fruit = new THREE.Mesh(
    front_purple_fruitGeom,
    purpleFruitMat
  );
  front_purple_fruit.name = "front_purple_fruit";
  front_purple_fruit.position.set(-0.14, 0.51, cakeD / 2 + 0.007);
  front_fruit.add(front_purple_fruit);

  const front_green_fruitGeom = organicFillingGeometry(
    0.34,
    0.27,
    0.034,
    2
  );
  const front_green_fruit = new THREE.Mesh(
    front_green_fruitGeom,
    greenFruitMat
  );
  front_green_fruit.name = "front_green_fruit";
  front_green_fruit.position.set(0.18, 0.50, cakeD / 2 + 0.008);
  front_fruit.add(front_green_fruit);

  const front_yellow_fruitGeom = organicFillingGeometry(
    0.35,
    0.27,
    0.034,
    1
  );
  const front_yellow_fruit = new THREE.Mesh(
    front_yellow_fruitGeom,
    yellowFruitMat
  );
  front_yellow_fruit.name = "front_yellow_fruit";
  front_yellow_fruit.position.set(0.43, 0.56, cakeD / 2 + 0.009);
  front_fruit.add(front_yellow_fruit);

  const front_red_fruit_rightGeom = organicFillingGeometry(
    0.25,
    0.23,
    0.034,
    2
  );
  const front_red_fruit_right = new THREE.Mesh(
    front_red_fruit_rightGeom,
    redFruitMat
  );
  front_red_fruit_right.name = "front_red_fruit_right";
  front_red_fruit_right.position.set(0.61, 0.64, cakeD / 2 + 0.010);
  front_fruit.add(front_red_fruit_right);

  const front_lower_lime_fruit = makeBlob(
    "front_lower_lime_fruit",
    limeFruitMat,
    -0.31,
    0.32,
    cakeD / 2 + 0.008,
    0.25,
    0.09,
    0.022,
    0,
    0,
    -0.12,
    front_fruit
  );

  const front_lower_green_fruit = makeBlob(
    "front_lower_green_fruit",
    greenFruitMat,
    0.18,
    0.31,
    cakeD / 2 + 0.009,
    0.20,
    0.075,
    0.021,
    0,
    0,
    0.15,
    front_fruit
  );

  const front_lower_pink_fruit = makeBlob(
    "front_lower_pink_fruit",
    pinkCreamMat,
    0.45,
    0.33,
    cakeD / 2 + 0.010,
    0.18,
    0.075,
    0.020,
    0,
    0,
    -0.18,
    front_fruit
  );

  const front_red_highlight = makeBlob(
    "front_red_highlight",
    redHighlightMat,
    -0.50,
    0.59,
    cakeD / 2 + 0.027,
    0.10,
    0.018,
    0.005,
    0,
    0,
    -0.25,
    front_fruit
  );

  const front_purple_highlight = makeBlob(
    "front_purple_highlight",
    purpleHighlightMat,
    -0.16,
    0.55,
    cakeD / 2 + 0.028,
    0.085,
    0.016,
    0.005,
    0,
    0,
    0.3,
    front_fruit
  );

  const front_green_highlight = makeBlob(
    "front_green_highlight",
    greenHighlightMat,
    0.17,
    0.54,
    cakeD / 2 + 0.029,
    0.075,
    0.015,
    0.005,
    0,
    0,
    -0.2,
    front_fruit
  );

  const front_yellow_highlight = makeBlob(
    "front_yellow_highlight",
    yellowHighlightMat,
    0.42,
    0.60,
    cakeD / 2 + 0.030,
    0.08,
    0.015,
    0.005,
    0,
    0,
    0.2,
    front_fruit
  );

  const right_fruit = new THREE.Group();
  right_fruit.name = "right_fruit";
  root.add(right_fruit);

  const right_red_fruitGeom = organicFillingGeometry(
    0.48,
    0.27,
    0.034,
    1
  );
  const right_red_fruit = new THREE.Mesh(right_red_fruitGeom, redFruitMat);
  right_red_fruit.name = "right_red_fruit";
  right_red_fruit.position.set(cakeW / 2 + 0.006, 0.57, 0.25);
  right_red_fruit.rotation.y = Math.PI / 2;
  right_fruit.add(right_red_fruit);

  const right_yellow_fruitGeom = organicFillingGeometry(
    0.32,
    0.25,
    0.034,
    2
  );
  const right_yellow_fruit = new THREE.Mesh(
    right_yellow_fruitGeom,
    yellowFruitMat
  );
  right_yellow_fruit.name = "right_yellow_fruit";
  right_yellow_fruit.position.set(cakeW / 2 + 0.007, 0.54, -0.19);
  right_yellow_fruit.rotation.y = Math.PI / 2;
  right_fruit.add(right_yellow_fruit);

  const right_lower_lime_fruit = makeBlob(
    "right_lower_lime_fruit",
    limeFruitMat,
    cakeW / 2 + 0.009,
    0.32,
    0.25,
    0.021,
    0.085,
    0.21,
    0,
    0,
    0.12,
    right_fruit
  );

  const right_lower_purple_fruit = makeBlob(
    "right_lower_purple_fruit",
    purpleFruitMat,
    cakeW / 2 + 0.010,
    0.32,
    -0.18,
    0.020,
    0.075,
    0.18,
    0,
    0,
    -0.16,
    right_fruit
  );

  const right_red_highlight = makeBlob(
    "right_red_highlight",
    redHighlightMat,
    cakeW / 2 + 0.029,
    0.62,
    0.28,
    0.005,
    0.017,
    0.09,
    0,
    0,
    0.2,
    right_fruit
  );

  const right_yellow_highlight = makeBlob(
    "right_yellow_highlight",
    yellowHighlightMat,
    cakeW / 2 + 0.030,
    0.58,
    -0.18,
    0.005,
    0.016,
    0.075,
    0,
    0,
    -0.2,
    right_fruit
  );

  const detailSphereGeom = new THREE.SphereGeometry(1, 8, 6);
  const poreCircleGeom = new THREE.CircleGeometry(1, 10);
  const instance_dummy = new THREE.Object3D();

  const base_crumbs = new THREE.InstancedMesh(
    detailSphereGeom,
    crumbLightMat,
    72
  );
  base_crumbs.name = "base_crumbs";

  for (let i = 0; i < 72; i++) {
    if (i < 44) {
      const side = i % 4;
      const u = ((i * 37 + 11) % 101) / 100;
      const v = ((i * 53 + 17) % 97) / 96;
      const size = 0.012 + (((i * 19) % 13) / 12) * 0.016;

      if (side === 0) {
        instance_dummy.position.set(
          -baseW * 0.47 + baseW * 0.94 * u,
          0.025 + 0.17 * v,
          baseD / 2 + 0.004
        );
        instance_dummy.scale.set(size * 1.3, size, size * 0.65);
      } else if (side === 1) {
        instance_dummy.position.set(
          baseW / 2 + 0.004,
          0.025 + 0.17 * v,
          -baseD * 0.46 + baseD * 0.92 * u
        );
        instance_dummy.scale.set(size * 0.65, size, size * 1.3);
      } else if (side === 2) {
        instance_dummy.position.set(
          -baseW * 0.47 + baseW * 0.94 * u,
          0.025 + 0.17 * v,
          -baseD / 2 - 0.004
        );
        instance_dummy.scale.set(size * 1.3, size, size * 0.65);
      } else {
        instance_dummy.position.set(
          -baseW / 2 - 0.004,
          0.025 + 0.17 * v,
          -baseD * 0.46 + baseD * 0.92 * u
        );
        instance_dummy.scale.set(size * 0.65, size, size * 1.3);
      }
    } else {
      const j = i - 44;
      const angle = j * 2.399963;
      const radius = 0.64 + (((j * 29) % 17) / 16) * 0.16;
      const size = 0.014 + (((j * 23) % 11) / 10) * 0.019;

      instance_dummy.position.set(
        Math.cos(angle) * radius * 1.1,
        0.006 + size * 0.4,
        Math.sin(angle) * radius * 0.9
      );
      instance_dummy.scale.set(size * 1.25, size, size);
    }

    instance_dummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    instance_dummy.updateMatrix();
    base_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }

  base_crumbs.instanceMatrix.needsUpdate = true;
  root.add(base_crumbs);

  const base_pores = new THREE.InstancedMesh(poreCircleGeom, poreMat, 30);
  base_pores.name = "base_pores";

  for (let i = 0; i < 30; i++) {
    const front = i < 18;
    const u = ((i * 43 + 9) % 97) / 96;
    const v = ((i * 31 + 21) % 89) / 88;
    const size = 0.006 + (((i * 17) % 9) / 8) * 0.011;

    if (front) {
      instance_dummy.position.set(
        -baseW * 0.45 + baseW * 0.9 * u,
        0.045 + 0.145 * v,
        baseD / 2 + 0.012
      );
      instance_dummy.rotation.set(0, 0, i * 0.37);
    } else {
      instance_dummy.position.set(
        baseW / 2 + 0.012,
        0.045 + 0.145 * v,
        -baseD * 0.43 + baseD * 0.86 * u
      );
      instance_dummy.rotation.set(0, Math.PI / 2, i * 0.37);
    }

    instance_dummy.scale.set(size * 1.35, size, 1);
    instance_dummy.updateMatrix();
    base_pores.setMatrixAt(i, instance_dummy.matrix);
  }

  base_pores.instanceMatrix.needsUpdate = true;
  root.add(base_pores);

  const cream_air_pores = new THREE.InstancedMesh(
    poreCircleGeom,
    creamPoreMat,
    48
  );
  cream_air_pores.name = "cream_air_pores";

  for (let i = 0; i < 48; i++) {
    const face = i % 4;
    const u = ((i * 41 + 7) % 103) / 102;
    const v = ((i * 59 + 13) % 101) / 100;
    const size = 0.005 + (((i * 23) % 11) / 10) * 0.011;
    let scaleX = size;
    let scaleY = size * 0.7;

    if (i % 6 === 0) {
      scaleX *= 1.8;
      scaleY *= 0.65;
    }

    if (face === 0) {
      instance_dummy.position.set(
        -cakeW * 0.45 + cakeW * 0.9 * u,
        0.655 + 0.235 * v,
        cakeD / 2 + 0.017
      );
      instance_dummy.rotation.set(0, 0, i * 0.29);
    } else if (face === 1) {
      instance_dummy.position.set(
        cakeW / 2 + 0.017,
        0.655 + 0.235 * v,
        -cakeD * 0.44 + cakeD * 0.88 * u
      );
      instance_dummy.rotation.set(0, Math.PI / 2, i * 0.29);
    } else if (face === 2) {
      instance_dummy.position.set(
        -cakeW * 0.44 + cakeW * 0.88 * u,
        0.245 + 0.145 * v,
        cakeD / 2 + 0.016
      );
      instance_dummy.rotation.set(0, 0, i * 0.29);
    } else {
      instance_dummy.position.set(
        cakeW / 2 + 0.016,
        0.245 + 0.145 * v,
        -cakeD * 0.43 + cakeD * 0.86 * u
      );
      instance_dummy.rotation.set(0, Math.PI / 2, i * 0.29);
    }

    instance_dummy.scale.set(scaleX, scaleY, 1);
    instance_dummy.updateMatrix();
    cream_air_pores.setMatrixAt(i, instance_dummy.matrix);
  }

  cream_air_pores.instanceMatrix.needsUpdate = true;
  root.add(cream_air_pores);

  const pink_layer_pores = new THREE.InstancedMesh(
    poreCircleGeom,
    pinkPoreMat,
    24
  );
  pink_layer_pores.name = "pink_layer_pores";

  for (let i = 0; i < 24; i++) {
    const front = i < 15;
    const u = ((i * 47 + 5) % 97) / 96;
    const v = ((i * 37 + 19) % 89) / 88;
    const size = 0.004 + (((i * 13) % 8) / 7) * 0.008;

    if (front) {
      instance_dummy.position.set(
        -cakeW * 0.44 + cakeW * 0.88 * u,
        0.43 + 0.17 * v,
        cakeD / 2 + 0.017
      );
      instance_dummy.rotation.set(0, 0, i * 0.41);
    } else {
      instance_dummy.position.set(
        cakeW / 2 + 0.017,
        0.43 + 0.17 * v,
        -cakeD * 0.42 + cakeD * 0.84 * u
      );
      instance_dummy.rotation.set(0, Math.PI / 2, i * 0.41);
    }

    instance_dummy.scale.set(size * 1.25, size, 1);
    instance_dummy.updateMatrix();
    pink_layer_pores.setMatrixAt(i, instance_dummy.matrix);
  }

  pink_layer_pores.instanceMatrix.needsUpdate = true;
  root.add(pink_layer_pores);

  const fruit_highlights = new THREE.InstancedMesh(
    detailSphereGeom,
    creamPoreMat,
    24
  );
  fruit_highlights.name = "fruit_highlights";

  for (let i = 0; i < 24; i++) {
    const front = i < 18;
    const u = ((i * 43 + 17) % 101) / 100;
    const v = ((i * 29 + 11) % 83) / 82;
    const size = 0.004 + (((i * 11) % 7) / 6) * 0.007;

    if (front) {
      instance_dummy.position.set(
        -cakeW * 0.43 + cakeW * 0.86 * u,
        0.46 + 0.20 * v,
        cakeD / 2 + 0.034
      );
      instance_dummy.scale.set(size * 1.4, size, size * 0.35);
    } else {
      instance_dummy.position.set(
        cakeW / 2 + 0.034,
        0.47 + 0.19 * v,
        -cakeD * 0.40 + cakeD * 0.80 * u
      );
      instance_dummy.scale.set(size * 0.35, size, size * 1.4);
    }

    instance_dummy.rotation.set(i * 0.21, i * 0.33, i * 0.17);
    instance_dummy.updateMatrix();
    fruit_highlights.setMatrixAt(i, instance_dummy.matrix);
  }

  fruit_highlights.instanceMatrix.needsUpdate = true;
  root.add(fruit_highlights);

  const chocolate_drips = new THREE.InstancedMesh(
    detailSphereGeom,
    chocolateMat,
    10
  );
  chocolate_drips.name = "chocolate_drips";

  for (let i = 0; i < 10; i++) {
    if (i < 7) {
      const u = ((i * 37 + 13) % 89) / 88;
      instance_dummy.position.set(
        -cakeW * 0.45 + cakeW * 0.9 * u,
        0.895 - (i % 3) * 0.012,
        cakeD / 2 + 0.012
      );
      instance_dummy.scale.set(
        0.018 + (i % 3) * 0.006,
        0.026 + (i % 4) * 0.009,
        0.012
      );
    } else {
      const j = i - 7;
      instance_dummy.position.set(
        cakeW / 2 + 0.012,
        0.895 - (j % 2) * 0.014,
        -cakeD * 0.34 + cakeD * 0.68 * j / 2
      );
      instance_dummy.scale.set(
        0.012,
        0.032 + j * 0.008,
        0.021 + j * 0.004
      );
    }

    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.updateMatrix();
    chocolate_drips.setMatrixAt(i, instance_dummy.matrix);
  }

  chocolate_drips.instanceMatrix.needsUpdate = true;
  root.add(chocolate_drips);

  const chocolate_pores = new THREE.InstancedMesh(
    poreCircleGeom,
    chocolateDarkMat,
    24
  );
  chocolate_pores.name = "chocolate_pores";

  for (let i = 0; i < 24; i++) {
    const front = i < 14;
    const u = ((i * 47 + 3) % 101) / 100;
    const v = ((i * 31 + 27) % 91) / 90;
    const size = 0.004 + (((i * 17) % 8) / 7) * 0.008;

    if (front) {
      instance_dummy.position.set(
        -cakeW * 0.46 + cakeW * 0.92 * u,
        0.908 + 0.055 * v,
        cakeD / 2 + 0.019
      );
      instance_dummy.rotation.set(0, 0, i * 0.43);
    } else {
      instance_dummy.position.set(
        cakeW / 2 + 0.019,
        0.908 + 0.055 * v,
        -cakeD * 0.44 + cakeD * 0.88 * u
      );
      instance_dummy.rotation.set(0, Math.PI / 2, i * 0.43);
    }

    instance_dummy.scale.set(size * 1.35, size, 1);
    instance_dummy.updateMatrix();
    chocolate_pores.setMatrixAt(i, instance_dummy.matrix);
  }

  chocolate_pores.instanceMatrix.needsUpdate = true;
  root.add(chocolate_pores);

  const chocolate_chunksGeom = new THREE.DodecahedronGeometry(1, 0);
  const chocolate_chunks = new THREE.InstancedMesh(
    chocolate_chunksGeom,
    chocolateLightMat,
    38
  );
  chocolate_chunks.name = "chocolate_chunks";

  for (let i = 0; i < 38; i++) {
    const u = ((i * 37 + 11) % 101) / 100;
    const v = ((i * 61 + 7) % 103) / 102;
    const sx = 0.045 + (((i * 19) % 11) / 10) * 0.055;
    const sy = 0.025 + (((i * 17) % 9) / 8) * 0.035;
    const sz = 0.045 + (((i * 29) % 13) / 12) * 0.06;

    instance_dummy.position.set(
      -cakeW * 0.45 + cakeW * 0.9 * u,
      0.995 + sy * 0.82 + (((i * 23) % 7) / 6) * 0.012,
      -cakeD * 0.44 + cakeD * 0.88 * v
    );
    instance_dummy.rotation.set(i * 0.61, i * 0.93, i * 0.47);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.updateMatrix();
    chocolate_chunks.setMatrixAt(i, instance_dummy.matrix);
  }

  chocolate_chunks.instanceMatrix.needsUpdate = true;
  root.add(chocolate_chunks);

  const cookie_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const cookie_crumbs = new THREE.InstancedMesh(
    cookie_crumbsGeom,
    cookieCrumbMat,
    72
  );
  cookie_crumbs.name = "cookie_crumbs";

  for (let i = 0; i < 72; i++) {
    const u = ((i * 43 + 5) % 107) / 106;
    const v = ((i * 67 + 19) % 109) / 108;
    const size = 0.018 + (((i * 31) % 13) / 12) * 0.035;

    instance_dummy.position.set(
      -cakeW * 0.47 + cakeW * 0.94 * u,
      0.993 + size * 0.72 + (((i * 29) % 9) / 8) * 0.012,
      -cakeD * 0.45 + cakeD * 0.9 * v
    );
    instance_dummy.rotation.set(i * 0.73, i * 0.41, i * 1.03);
    instance_dummy.scale.set(
      size * (0.85 + (i % 3) * 0.12),
      size * (0.75 + (i % 4) * 0.08),
      size
    );
    instance_dummy.updateMatrix();
    cookie_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }

  cookie_crumbs.instanceMatrix.needsUpdate = true;
  root.add(cookie_crumbs);

  const golden_crumbs = new THREE.InstancedMesh(
    cookie_crumbsGeom,
    goldenCrumbMat,
    46
  );
  golden_crumbs.name = "golden_crumbs";

  for (let i = 0; i < 46; i++) {
    const u = ((i * 53 + 17) % 103) / 102;
    const v = ((i * 71 + 3) % 107) / 106;
    const size = 0.012 + (((i * 19) % 11) / 10) * 0.025;

    instance_dummy.position.set(
      -cakeW * 0.46 + cakeW * 0.92 * u,
      0.99 + size * 0.65 + (((i * 13) % 7) / 6) * 0.01,
      -cakeD * 0.44 + cakeD * 0.88 * v
    );
    instance_dummy.rotation.set(i * 0.37, i * 0.89, i * 0.57);
    instance_dummy.scale.set(size, size * 0.8, size * 1.15);
    instance_dummy.updateMatrix();
    golden_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }

  golden_crumbs.instanceMatrix.needsUpdate = true;
  root.add(golden_crumbs);

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