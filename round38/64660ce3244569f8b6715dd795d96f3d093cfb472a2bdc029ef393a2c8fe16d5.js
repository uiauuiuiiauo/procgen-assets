export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vegetable_custard_tart";

  const pastry_shell = new THREE.Group();
  pastry_shell.name = "pastry_shell";
  root.add(pastry_shell);

  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  root.add(filling_group);

  const toppings_group = new THREE.Group();
  toppings_group.name = "toppings_group";
  root.add(toppings_group);

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xd8a15b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const crustHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xe7b96f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const crustShadeMat = new THREE.MeshStandardMaterial({
    color: 0xb97838,
    metalness: 0.0,
    roughness: 0.7,
  });
  const custardMat = new THREE.MeshStandardMaterial({
    color: 0xfff1bd,
    metalness: 0.0,
    roughness: 0.3,
  });
  const custardHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff8d6,
    metalness: 0.0,
    roughness: 0.3,
  });
  const redPepperMat = new THREE.MeshStandardMaterial({
    color: 0xd9472f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const orangePepperMat = new THREE.MeshStandardMaterial({
    color: 0xf28b24,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellowPepperMat = new THREE.MeshStandardMaterial({
    color: 0xf2cf35,
    metalness: 0.0,
    roughness: 0.3,
  });
  const purpleOnionMat = new THREE.MeshStandardMaterial({
    color: 0x67213f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenLeafMat = new THREE.MeshStandardMaterial({
    color: 0x2f7f35,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenVeinMat = new THREE.MeshStandardMaterial({
    color: 0x87b84c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const paleHerbMat = new THREE.MeshStandardMaterial({
    color: 0x79a85c,
    metalness: 0.0,
    roughness: 0.3,
  });

  const fluteCount = 20;
  const fluteStep = Math.PI * 2 / fluteCount;

  function createFlutedSideGeometry() {
    const radialSegments = 120;
    const levels = [
      { y: -0.32, r: 0.92, amp: 0.018 },
      { y: -0.27, r: 0.98, amp: 0.026 },
      { y: -0.12, r: 1.08, amp: 0.040 },
      { y: 0.04, r: 1.17, amp: 0.050 },
      { y: 0.15, r: 1.21, amp: 0.055 },
    ];
    const stride = radialSegments + 1;
    const positions = [];
    const indices = [];

    for (let levelIndex = 0; levelIndex < levels.length; levelIndex++) {
      const level = levels[levelIndex];
      for (let i = 0; i <= radialSegments; i++) {
        const angle = i / radialSegments * Math.PI * 2;
        const radius = level.r + level.amp * Math.cos(fluteCount * angle);
        positions.push(
          Math.cos(angle) * radius,
          level.y,
          Math.sin(angle) * radius
        );
      }
    }

    for (let levelIndex = 0; levelIndex < levels.length - 1; levelIndex++) {
      for (let i = 0; i < radialSegments; i++) {
        const a = levelIndex * stride + i;
        const b = a + 1;
        const d = (levelIndex + 1) * stride + i;
        const c = d + 1;
        indices.push(a, d, b, b, d, c);
      }
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

  function createWavyTorusGeometry(baseRadius, wave, tubeRadius) {
    const points = [];
    const pointCount = 120;
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      const radius = baseRadius + wave * Math.cos(fluteCount * angle);
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0.17 + wave * 0.55 * Math.sin(fluteCount * angle),
        Math.sin(angle) * radius
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(curve, 180, tubeRadius, 10, true);
  }

  function createIrregularAnnulusGeometry(
    innerRadius,
    outerRadius,
    outerWave,
    innerWave,
    topY
  ) {
    const segments = 120;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const inner = innerRadius + innerWave * Math.cos(fluteCount * angle);
      const outer = outerRadius + outerWave * Math.cos(fluteCount * angle);
      const innerY = topY - innerWave * 0.55 * Math.sin(fluteCount * angle);
      const outerY = topY + outerWave * 0.55 * Math.sin(fluteCount * angle);

      positions.push(cosine * inner, innerY, sine * inner);
      positions.push(cosine * outer, outerY, sine * outer);
      positions.push(cosine * inner, innerY - 0.055, sine * inner);
      positions.push(cosine * outer, outerY - 0.055, sine * outer);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 4;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      const e = a + 4;
      const f = a + 5;
      const g = a + 6;
      const h = a + 7;

      indices.push(a, b, e, b, f, e);
      indices.push(c, g, d, d, g, h);
      indices.push(c, a, g, a, e, g);
      indices.push(d, h, b, b, h, f);
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

  const tart_baseGeom = new THREE.CylinderGeometry(0.94, 0.94, 0.05, 96);
  const tart_base = new THREE.Mesh(tart_baseGeom, crustMat);
  tart_base.name = "tart_base";
  tart_base.position.y = -0.325;
  pastry_shell.add(tart_base);

  const bottom_edgeGeom = new THREE.TorusGeometry(0.92, 0.028, 8, 96);
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, crustShadeMat);
  bottom_edge.name = "bottom_edge";
  bottom_edge.rotation.x = Math.PI / 2;
  bottom_edge.position.y = -0.34;
  pastry_shell.add(bottom_edge);

  const fluted_shell_sideGeom = createFlutedSideGeometry();
  const fluted_shell_side = new THREE.Mesh(fluted_shell_sideGeom, crustMat);
  fluted_shell_side.name = "fluted_shell_side";
  pastry_shell.add(fluted_shell_side);

  const crust_inner_liningGeom = createIrregularAnnulusGeometry(
    0.995,
    1.18,
    0.045,
    0.018,
    0.16
  );
  const crust_inner_lining = new THREE.Mesh(
    crust_inner_liningGeom,
    crustHighlightMat
  );
  crust_inner_lining.name = "crust_inner_lining";
  pastry_shell.add(crust_inner_lining);

  const crust_flutesGeom = new THREE.SphereGeometry(1, 12, 8);
  const crust_flutes = new THREE.InstancedMesh(
    crust_flutesGeom,
    crustHighlightMat,
    fluteCount
  );
  crust_flutes.name = "crust_flutes";
  const flute_dummy = new THREE.Object3D();
  for (let i = 0; i < fluteCount; i++) {
    const angle = i / fluteCount * Math.PI * 2;
    const radius = 1.105;
    flute_dummy.position.set(
      Math.cos(angle) * radius,
      -0.065,
      Math.sin(angle) * radius
    );
    flute_dummy.rotation.set(0, -angle, 0);
    flute_dummy.scale.set(0.018, 0.145, 0.048);
    flute_dummy.updateMatrix();
    crust_flutes.setMatrixAt(i, flute_dummy.matrix);
  }
  crust_flutes.instanceMatrix.needsUpdate = true;
  pastry_shell.add(crust_flutes);

  const crust_rimGeom = createWavyTorusGeometry(1.18, 0.052, 0.105);
  const crust_rim = new THREE.Mesh(crust_rimGeom, crustHighlightMat);
  crust_rim.name = "crust_rim";
  pastry_shell.add(crust_rim);

  const crust_inner_edgeGeom = createWavyTorusGeometry(1.025, 0.022, 0.043);
  const crust_inner_edge = new THREE.Mesh(crust_inner_edgeGeom, crustShadeMat);
  crust_inner_edge.name = "crust_inner_edge";
  crust_inner_edge.position.y = 0.004;
  pastry_shell.add(crust_inner_edge);

  const rim_crimpsGeom = new THREE.SphereGeometry(1, 12, 8);
  const rim_crimps = new THREE.InstancedMesh(
    rim_crimpsGeom,
    crustHighlightMat,
    fluteCount
  );
  rim_crimps.name = "rim_crimps";
  const crimp_dummy = new THREE.Object3D();
  for (let i = 0; i < fluteCount; i++) {
    const angle = i / fluteCount * Math.PI * 2;
    const radius = 1.18 + 0.052 * Math.cos(fluteCount * angle);
    const y = 0.17 + 0.0287 * Math.sin(fluteCount * angle);
    crimp_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    crimp_dummy.rotation.set(0, -angle, 0);
    crimp_dummy.scale.set(0.09, 0.04, 0.06);
    crimp_dummy.updateMatrix();
    rim_crimps.setMatrixAt(i, crimp_dummy.matrix);
  }
  rim_crimps.instanceMatrix.needsUpdate = true;
  pastry_shell.add(rim_crimps);

  const crust_browned_spotsGeom = new THREE.SphereGeometry(1, 8, 5);
  const crust_browned_spots = new THREE.InstancedMesh(
    crust_browned_spotsGeom,
    crustShadeMat,
    30
  );
  crust_browned_spots.name = "crust_browned_spots";
  const browned_dummy = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2 + 0.035 * Math.sin(i * 2.1);
    const radius = 1.18 + 0.04 * Math.cos(fluteCount * angle);
    const y = 0.215 + 0.021 * Math.sin(fluteCount * angle)
      + 0.004 * Math.sin(i * 1.7);
    browned_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    browned_dummy.rotation.set(0, -angle, 0);
    browned_dummy.scale.set(
      0.026 + 0.006 * (i % 3),
      0.006,
      0.014 + 0.004 * (i % 2)
    );
    browned_dummy.updateMatrix();
    crust_browned_spots.setMatrixAt(i, browned_dummy.matrix);
  }
  crust_browned_spots.instanceMatrix.needsUpdate = true;
  pastry_shell.add(crust_browned_spots);

  const custard_fillingGeom = new THREE.CylinderGeometry(
    1.025,
    1.025,
    0.13,
    96
  );
  const custard_filling = new THREE.Mesh(custard_fillingGeom, custardMat);
  custard_filling.name = "custard_filling";
  custard_filling.position.y = 0.045;
  filling_group.add(custard_filling);

  const custard_surfaceGeom = new THREE.SphereGeometry(1, 48, 16);
  const custard_surface = new THREE.Mesh(custard_surfaceGeom, custardMat);
  custard_surface.name = "custard_surface";
  custard_surface.position.y = 0.105;
  custard_surface.scale.set(1.02, 0.028, 1.02);
  filling_group.add(custard_surface);

  const custard_moundsGeom = new THREE.SphereGeometry(1, 16, 8);
  const custard_mounds = new THREE.InstancedMesh(
    custard_moundsGeom,
    custardHighlightMat,
    10
  );
  custard_mounds.name = "custard_mounds";
  const mound_data = [
    [-0.68, -0.20, 0.18, 0.10],
    [-0.42, 0.31, 0.14, 0.09],
    [-0.10, -0.47, 0.17, 0.08],
    [0.25, -0.23, 0.13, 0.10],
    [0.60, 0.18, 0.16, 0.09],
    [0.53, -0.52, 0.14, 0.08],
    [-0.62, 0.57, 0.13, 0.08],
    [0.10, 0.62, 0.17, 0.09],
    [0.73, 0.35, 0.12, 0.07],
    [-0.05, 0.15, 0.15, 0.08],
  ];
  const mound_dummy = new THREE.Object3D();
  for (let i = 0; i < mound_data.length; i++) {
    const data = mound_data[i];
    mound_dummy.position.set(data[0], 0.127, data[1]);
    mound_dummy.rotation.set(0, i * 0.47, 0);
    mound_dummy.scale.set(data[2], 0.012, data[3]);
    mound_dummy.updateMatrix();
    custard_mounds.setMatrixAt(i, mound_dummy.matrix);
  }
  custard_mounds.instanceMatrix.needsUpdate = true;
  filling_group.add(custard_mounds);

  const pepper_pieceGeom = new THREE.SphereGeometry(1, 14, 8);

  function createPepperInstances(name, material, data) {
    const instances = new THREE.InstancedMesh(
      pepper_pieceGeom,
      material,
      data.length
    );
    instances.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      dummy.position.set(item[0], 0.126, item[1]);
      dummy.rotation.set(0, item[4], 0);
      dummy.scale.set(item[2], 0.024, item[3]);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    }
    instances.instanceMatrix.needsUpdate = true;
    return instances;
  }

  const red_pepper_data = [
    [-0.68, 0.43, 0.18, 0.075, -0.45],
    [0.66, 0.48, 0.17, 0.070, 0.25],
    [0.43, -0.54, 0.16, 0.070, -0.70],
    [-0.25, 0.12, 0.13, 0.055, 0.80],
    [0.18, 0.69, 0.15, 0.060, 0.15],
  ];
  const red_pepper_pieces = createPepperInstances(
    "red_pepper_pieces",
    redPepperMat,
    red_pepper_data
  );
  toppings_group.add(red_pepper_pieces);

  const orange_pepper_data = [
    [-0.64, -0.47, 0.17, 0.075, 0.40],
    [0.48, 0.34, 0.16, 0.065, -0.30],
    [0.70, -0.30, 0.17, 0.070, 0.70],
    [-0.12, 0.72, 0.14, 0.060, -0.60],
  ];
  const orange_pepper_pieces = createPepperInstances(
    "orange_pepper_pieces",
    orangePepperMat,
    orange_pepper_data
  );
  toppings_group.add(orange_pepper_pieces);

  const yellow_pepper_data = [
    [0.76, 0.05, 0.14, 0.070, 0.30],
    [0.39, -0.66, 0.13, 0.060, -0.40],
    [-0.75, -0.16, 0.14, 0.060, 0.80],
    [0.10, -0.28, 0.11, 0.050, -0.20],
  ];
  const yellow_pepper_pieces = createPepperInstances(
    "yellow_pepper_pieces",
    yellowPepperMat,
    yellow_pepper_data
  );
  toppings_group.add(yellow_pepper_pieces);

  const purple_onion_data = [
    [-0.22, -0.08, 0.11, 0.055, 0.50],
    [0.43, 0.02, 0.10, 0.050, -0.40],
    [-0.48, 0.05, 0.10, 0.045, 0.20],
    [0.12, 0.48, 0.11, 0.050, 0.80],
    [-0.05, -0.70, 0.11, 0.050, -0.60],
    [0.64, -0.02, 0.09, 0.045, 0.10],
  ];
  const purple_onion_pieces = createPepperInstances(
    "purple_onion_pieces",
    purpleOnionMat,
    purple_onion_data
  );
  toppings_group.add(purple_onion_pieces);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(-0.16, 0);
  leafShape.bezierCurveTo(-0.09, 0.09, 0.08, 0.09, 0.16, 0);
  leafShape.bezierCurveTo(0.08, -0.09, -0.09, -0.09, -0.16, 0);

  const green_leafGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  green_leafGeom.rotateX(-Math.PI / 2);

  const green_leaf_data = [
    [-0.43, 0.24, 1.00, 0.85, 0.30],
    [0.56, 0.12, 0.90, 0.75, -0.50],
    [0.13, -0.68, 1.05, 0.80, 0.70],
    [-0.56, -0.34, 0.85, 0.70, -0.20],
    [0.22, 0.28, 0.80, 0.70, 0.40],
    [-0.18, 0.61, 0.85, 0.75, -0.80],
    [0.74, -0.45, 0.80, 0.70, 0.20],
  ];

  const green_leaves = new THREE.InstancedMesh(
    green_leafGeom,
    greenLeafMat,
    green_leaf_data.length
  );
  green_leaves.name = "green_leaves";
  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < green_leaf_data.length; i++) {
    const item = green_leaf_data[i];
    leaf_dummy.position.set(item[0], 0.113, item[1]);
    leaf_dummy.rotation.set(0, item[4], 0);
    leaf_dummy.scale.set(item[2], 0.8, item[3]);
    leaf_dummy.updateMatrix();
    green_leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  green_leaves.instanceMatrix.needsUpdate = true;
  toppings_group.add(green_leaves);

  const green_leaf_veinsGeom = new THREE.BoxGeometry(0.22, 0.008, 0.012);
  const green_leaf_veins = new THREE.InstancedMesh(
    green_leaf_veinsGeom,
    greenVeinMat,
    green_leaf_data.length
  );
  green_leaf_veins.name = "green_leaf_veins";
  const vein_dummy = new THREE.Object3D();
  for (let i = 0; i < green_leaf_data.length; i++) {
    const item = green_leaf_data[i];
    vein_dummy.position.set(item[0], 0.145, item[1]);
    vein_dummy.rotation.set(0, item[4], 0);
    vein_dummy.scale.set(item[2], 1, item[3]);
    vein_dummy.updateMatrix();
    green_leaf_veins.setMatrixAt(i, vein_dummy.matrix);
  }
  green_leaf_veins.instanceMatrix.needsUpdate = true;
  toppings_group.add(green_leaf_veins);

  const pale_herb_flecksGeom = new THREE.SphereGeometry(1, 8, 5);
  const pale_herb_flecks = new THREE.InstancedMesh(
    pale_herb_flecksGeom,
    paleHerbMat,
    18
  );
  pale_herb_flecks.name = "pale_herb_flecks";
  const fleck_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.16 + 0.68 * (((i * 7) % 17) / 17);
    fleck_dummy.position.set(
      Math.cos(angle) * radius,
      0.137,
      Math.sin(angle) * radius
    );
    fleck_dummy.rotation.set(0, angle * 0.7, 0);
    fleck_dummy.scale.set(
      0.025 + 0.006 * (i % 3),
      0.006,
      0.012 + 0.004 * (i % 2)
    );
    fleck_dummy.updateMatrix();
    pale_herb_flecks.setMatrixAt(i, fleck_dummy.matrix);
  }
  pale_herb_flecks.instanceMatrix.needsUpdate = true;
  toppings_group.add(pale_herb_flecks);

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