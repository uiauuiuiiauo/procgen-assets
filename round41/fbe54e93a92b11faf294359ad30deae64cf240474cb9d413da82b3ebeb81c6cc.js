export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "streusel_apple_cake";

  const cakeW = 1.40;
  const cakeD = 0.92;
  const cakeH = 0.68;
  const cakeTop = cakeH / 2;

  function createRoundedBoxGeometry(width, height, depth, radius, bevel) {
    const halfW = width / 2;
    const halfH = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-halfW + radius, -halfH);
    shape.lineTo(halfW - radius, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + radius);
    shape.lineTo(halfW, halfH - radius);
    shape.quadraticCurveTo(halfW, halfH, halfW - radius, halfH);
    shape.lineTo(-halfW + radius, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - radius);
    shape.lineTo(-halfW, -halfH + radius);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + radius, -halfH);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const bottom_crustMat = new THREE.MeshStandardMaterial({
    color: 0xa95724,
    metalness: 0.0,
    roughness: 0.9,
  });
  const bottom_crustGeom = createRoundedBoxGeometry(
    cakeW * 0.97,
    0.10,
    cakeD * 0.95,
    0.045,
    0.012
  );
  const bottom_crust = new THREE.Mesh(bottom_crustGeom, bottom_crustMat);
  bottom_crust.name = "bottom_crust";
  bottom_crust.position.y = -0.29;
  root.add(bottom_crust);

  const sponge_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf1d895,
    metalness: 0.0,
    roughness: 0.9,
  });
  const sponge_bodyGeom = createRoundedBoxGeometry(
    cakeW * 0.96,
    0.57,
    cakeD * 0.94,
    0.055,
    0.015
  );
  const sponge_body = new THREE.Mesh(sponge_bodyGeom, sponge_bodyMat);
  sponge_body.name = "sponge_body";
  sponge_body.position.y = -0.025;
  root.add(sponge_body);

  const top_crustMat = new THREE.MeshStandardMaterial({
    color: 0xc8732e,
    metalness: 0.0,
    roughness: 0.9,
  });
  const top_crustGeom = createRoundedBoxGeometry(
    cakeW * 0.98,
    0.08,
    cakeD * 0.97,
    0.045,
    0.012
  );
  const top_crust = new THREE.Mesh(top_crustGeom, top_crustMat);
  top_crust.name = "top_crust";
  top_crust.position.y = 0.30;
  root.add(top_crust);

  const top_baked_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xd99343,
    metalness: 0.0,
    roughness: 0.9,
  });
  const top_baked_surfaceGeom = createRoundedBoxGeometry(
    cakeW * 0.95,
    0.025,
    cakeD * 0.92,
    0.035,
    0.006
  );
  const top_baked_surface = new THREE.Mesh(
    top_baked_surfaceGeom,
    top_baked_surfaceMat
  );
  top_baked_surface.name = "top_baked_surface";
  top_baked_surface.position.y = 0.344;
  root.add(top_baked_surface);

  const apple_filling_layerMat = new THREE.MeshStandardMaterial({
    color: 0xd2ad68,
    metalness: 0.0,
    roughness: 0.55,
  });
  const apple_filling_layerGeom = createRoundedBoxGeometry(
    cakeW * 0.90,
    0.25,
    0.026,
    0.035,
    0.006
  );
  const apple_filling_layer = new THREE.Mesh(
    apple_filling_layerGeom,
    apple_filling_layerMat
  );
  apple_filling_layer.name = "apple_filling_layer";
  apple_filling_layer.position.set(0.02, -0.055, cakeD * 0.477);
  root.add(apple_filling_layer);

  const apple_pieceShape = new THREE.Shape();
  apple_pieceShape.moveTo(-0.50, -0.12);
  apple_pieceShape.bezierCurveTo(-0.43, -0.42, -0.08, -0.50, 0.20, -0.34);
  apple_pieceShape.bezierCurveTo(0.48, -0.22, 0.55, 0.08, 0.31, 0.34);
  apple_pieceShape.bezierCurveTo(0.08, 0.52, -0.35, 0.38, -0.50, -0.12);
  const apple_pieceGeom = new THREE.ExtrudeGeometry(apple_pieceShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  apple_pieceGeom.translate(0, 0, -0.007);

  const apple_piece_lightMat = new THREE.MeshStandardMaterial({
    color: 0xe0c486,
    metalness: 0.0,
    roughness: 0.5,
  });
  const apple_piece_lightData = [
    [-0.49, -0.105, 0.23, 0.13, -0.18],
    [-0.13, -0.125, 0.29, 0.15, 0.10],
    [0.27, -0.095, 0.25, 0.13, -0.12],
    [0.52, 0.015, 0.15, 0.10, 0.22],
  ];
  const apple_piece_light = new THREE.InstancedMesh(
    apple_pieceGeom,
    apple_piece_lightMat,
    apple_piece_lightData.length
  );
  apple_piece_light.name = "apple_piece_light";

  const apple_piece_amberMat = new THREE.MeshStandardMaterial({
    color: 0xb97b3e,
    metalness: 0.0,
    roughness: 0.55,
  });
  const apple_piece_amberData = [
    [-0.35, 0.045, 0.18, 0.105, 0.25],
    [0.08, 0.055, 0.19, 0.11, -0.22],
    [0.40, -0.145, 0.17, 0.10, 0.16],
  ];
  const apple_piece_amber = new THREE.InstancedMesh(
    apple_pieceGeom,
    apple_piece_amberMat,
    apple_piece_amberData.length
  );
  apple_piece_amber.name = "apple_piece_amber";

  const instance_dummy = new THREE.Object3D();

  function applyFrontInstances(mesh, data, z) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      instance_dummy.position.set(item[0], item[1], z);
      instance_dummy.rotation.set(0, 0, item[4]);
      instance_dummy.scale.set(item[2], item[3], 1);
      instance_dummy.updateMatrix();
      mesh.setMatrixAt(i, instance_dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  applyFrontInstances(
    apple_piece_light,
    apple_piece_lightData,
    cakeD * 0.495
  );
  applyFrontInstances(
    apple_piece_amber,
    apple_piece_amberData,
    cakeD * 0.497
  );
  root.add(apple_piece_light, apple_piece_amber);

  const sponge_poresMat = new THREE.MeshStandardMaterial({
    color: 0xc9a762,
    metalness: 0.0,
    roughness: 0.9,
  });
  const sponge_poresGeom = new THREE.SphereGeometry(1, 8, 6);
  const sponge_pores = new THREE.InstancedMesh(
    sponge_poresGeom,
    sponge_poresMat,
    42
  );
  sponge_pores.name = "sponge_pores";
  for (let i = 0; i < 42; i++) {
    const x = -0.62 + (((i * 37) % 97) / 96) * 1.24;
    const y = -0.245 + (((i * 53) % 89) / 88) * 0.43;
    const size = 0.006 + (i % 5) * 0.0017;
    instance_dummy.position.set(x, y, cakeD * 0.480);
    instance_dummy.rotation.set(0, 0, (i % 7) * 0.31);
    instance_dummy.scale.set(size * 1.25, size, 0.0025);
    instance_dummy.updateMatrix();
    sponge_pores.setMatrixAt(i, instance_dummy.matrix);
  }
  sponge_pores.instanceMatrix.needsUpdate = true;
  root.add(sponge_pores);

  const side_sponge_pores = new THREE.InstancedMesh(
    sponge_poresGeom,
    sponge_poresMat,
    24
  );
  side_sponge_pores.name = "side_sponge_pores";
  for (let i = 0; i < 24; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const z = -0.36 + (((i * 31) % 79) / 78) * 0.72;
    const y = -0.23 + (((i * 47) % 71) / 70) * 0.40;
    const size = 0.006 + (i % 4) * 0.0018;
    instance_dummy.position.set(side * cakeW * 0.487, y, z);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(0.0025, size, size * 1.3);
    instance_dummy.updateMatrix();
    side_sponge_pores.setMatrixAt(i, instance_dummy.matrix);
  }
  side_sponge_pores.instanceMatrix.needsUpdate = true;
  root.add(side_sponge_pores);

  const crust_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0x8f431c,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crust_crumbsGeom = new THREE.DodecahedronGeometry(1, 0);
  const crust_crumbs = new THREE.InstancedMesh(
    crust_crumbsGeom,
    crust_crumbsMat,
    54
  );
  crust_crumbs.name = "crust_crumbs";
  for (let i = 0; i < 54; i++) {
    let x;
    let y;
    let z;
    if (i < 34) {
      x = -0.68 + (((i * 43) % 101) / 100) * 1.36;
      y = -0.337 + (((i * 19) % 29) / 28) * 0.085;
      z = cakeD * 0.49 + (i % 3) * 0.004;
    } else {
      const j = i - 34;
      const side = j % 2 === 0 ? -1 : 1;
      x = side * (cakeW * 0.49 + (j % 3) * 0.003);
      y = -0.335 + (((j * 23) % 31) / 30) * 0.08;
      z = -0.40 + (((j * 41) % 67) / 66) * 0.80;
    }
    const size = 0.009 + (i % 6) * 0.0025;
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(i * 0.37, i * 0.23, i * 0.41);
    instance_dummy.scale.set(size * 1.2, size, size * 0.8);
    instance_dummy.updateMatrix();
    crust_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }
  crust_crumbs.instanceMatrix.needsUpdate = true;
  root.add(crust_crumbs);

  const crumb_bedMat = new THREE.MeshStandardMaterial({
    color: 0xdca754,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crumb_bedGeom = new THREE.DodecahedronGeometry(1, 0);
  const crumb_bed = new THREE.InstancedMesh(
    crumb_bedGeom,
    crumb_bedMat,
    112
  );
  crumb_bed.name = "crumb_bed";
  for (let i = 0; i < 112; i++) {
    const x = -0.64 + (((i * 37) % 109) / 108) * 1.28;
    const z = -0.39 + (((i * 61) % 107) / 106) * 0.78;
    const size = 0.011 + (i % 7) * 0.002;
    instance_dummy.position.set(
      x,
      cakeTop + 0.018 + (i % 4) * 0.004,
      z
    );
    instance_dummy.rotation.set(i * 0.29, i * 0.43, i * 0.17);
    instance_dummy.scale.set(
      size * (0.9 + (i % 3) * 0.12),
      size * 0.65,
      size
    );
    instance_dummy.updateMatrix();
    crumb_bed.setMatrixAt(i, instance_dummy.matrix);
  }
  crumb_bed.instanceMatrix.needsUpdate = true;
  root.add(crumb_bed);

  const streusel_lightMat = new THREE.MeshStandardMaterial({
    color: 0xf3d98b,
    metalness: 0.0,
    roughness: 0.9,
  });
  const streusel_goldenMat = new THREE.MeshStandardMaterial({
    color: 0xd9943b,
    metalness: 0.0,
    roughness: 0.9,
  });
  const streusel_crumbGeom = new THREE.DodecahedronGeometry(1, 0);
  const lightClusterCount = 24;
  const goldenClusterCount = 20;
  const clusterCount = lightClusterCount + goldenClusterCount;
  const piecesPerCluster = 4;

  const streusel_light = new THREE.InstancedMesh(
    streusel_crumbGeom,
    streusel_lightMat,
    lightClusterCount * piecesPerCluster
  );
  streusel_light.name = "streusel_light";

  const streusel_golden = new THREE.InstancedMesh(
    streusel_crumbGeom,
    streusel_goldenMat,
    goldenClusterCount * piecesPerCluster
  );
  streusel_golden.name = "streusel_golden";

  function populateStreusel(mesh, clusterOffset, clusterTotal, phase) {
    let instanceIndex = 0;
    for (let c = 0; c < clusterTotal; c++) {
      const i = c + clusterOffset;
      const centerX =
        -0.59 +
        ((((i * 43) % clusterCount) + 0.5) / clusterCount) * 1.18;
      const centerZ =
        -0.35 +
        ((((i * 67) % (clusterCount + 3)) + 0.5) / (clusterCount + 3)) *
          0.70;
      const baseY = 0.394 + ((i * 7) % 5) * 0.008;
      const baseSize = 0.044 + ((i * 11) % 7) * 0.003;

      for (let p = 0; p < piecesPerCluster; p++) {
        const angle =
          (p / piecesPerCluster) * Math.PI * 2 + phase * 0.47;
        const spread = p === 0 ? 0 : 0.025 + (p % 2) * 0.008;
        const size =
          baseSize *
          (0.72 + ((i * 5 + p * 3) % 7) * 0.065);
        const x = centerX + Math.cos(angle) * spread;
        const z = centerZ + Math.sin(angle) * spread * 0.78;
        const y =
          baseY +
          size * 0.72 +
          (p % 2) * 0.008 +
          Math.cos(angle * 2) * 0.004;

        instance_dummy.position.set(x, y, z);
        instance_dummy.rotation.set(
          i * 0.31 + p * 0.7,
          i * 0.19 + p * 1.1,
          i * 0.23 - p * 0.5
        );
        instance_dummy.scale.set(
          size * (0.85 + (p % 3) * 0.12),
          size * (0.72 + ((i + p) % 3) * 0.12),
          size * (0.9 + ((i * 2 + p) % 3) * 0.1)
        );
        instance_dummy.updateMatrix();
        mesh.setMatrixAt(instanceIndex++, instance_dummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  populateStreusel(streusel_light, 0, lightClusterCount, 1);
  populateStreusel(streusel_golden, lightClusterCount, goldenClusterCount, 2);
  root.add(streusel_light, streusel_golden);

  const streusel_granulesMat = new THREE.MeshStandardMaterial({
    color: 0xffe8a8,
    metalness: 0.0,
    roughness: 0.9,
  });
  const streusel_granulesGeom = new THREE.OctahedronGeometry(1, 0);
  const streusel_granules = new THREE.InstancedMesh(
    streusel_granulesGeom,
    streusel_granulesMat,
    180
  );
  streusel_granules.name = "streusel_granules";
  for (let i = 0; i < 180; i++) {
    const x = -0.65 + (((i * 47) % 181) / 180) * 1.30;
    const z = -0.40 + (((i * 73) % 179) / 178) * 0.80;
    const size = 0.006 + (i % 6) * 0.0018;
    instance_dummy.position.set(
      x,
      0.365 + (((i * 29) % 37) / 36) * 0.075,
      z
    );
    instance_dummy.rotation.set(i * 0.41, i * 0.27, i * 0.33);
    instance_dummy.scale.set(
      size,
      size * (0.75 + (i % 3) * 0.15),
      size * (0.8 + (i % 4) * 0.08)
    );
    instance_dummy.updateMatrix();
    streusel_granules.setMatrixAt(i, instance_dummy.matrix);
  }
  streusel_granules.instanceMatrix.needsUpdate = true;
  root.add(streusel_granules);

  const sugar_crystalsMat = new THREE.MeshStandardMaterial({
    color: 0xfff2c7,
    metalness: 0.0,
    roughness: 0.7,
  });
  const sugar_crystalsGeom = new THREE.OctahedronGeometry(1, 0);
  const sugar_crystals = new THREE.InstancedMesh(
    sugar_crystalsGeom,
    sugar_crystalsMat,
    108
  );
  sugar_crystals.name = "sugar_crystals";
  for (let i = 0; i < 108; i++) {
    const x = -0.63 + (((i * 41) % 109) / 108) * 1.26;
    const z = -0.38 + (((i * 63) % 107) / 106) * 0.76;
    const size = 0.0045 + (i % 5) * 0.0012;
    instance_dummy.position.set(
      x,
      0.375 + (((i * 17) % 31) / 30) * 0.082,
      z
    );
    instance_dummy.rotation.set(i * 0.53, i * 0.37, i * 0.49);
    instance_dummy.scale.set(size, size * 1.15, size * 0.85);
    instance_dummy.updateMatrix();
    sugar_crystals.setMatrixAt(i, instance_dummy.matrix);
  }
  sugar_crystals.instanceMatrix.needsUpdate = true;
  root.add(sugar_crystals);

  const front_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0xe8bd68,
    metalness: 0.0,
    roughness: 0.9,
  });
  const front_crumbsGeom = new THREE.DodecahedronGeometry(1, 0);
  const front_crumbs = new THREE.InstancedMesh(
    front_crumbsGeom,
    front_crumbsMat,
    46
  );
  front_crumbs.name = "front_crumbs";
  for (let i = 0; i < 46; i++) {
    const x = -0.65 + (((i * 31) % 97) / 96) * 1.30;
    const y = -0.27 + (((i * 59) % 89) / 88) * 0.54;
    const size = 0.007 + (i % 6) * 0.002;
    instance_dummy.position.set(x, y, cakeD * 0.493);
    instance_dummy.rotation.set(i * 0.35, i * 0.21, i * 0.43);
    instance_dummy.scale.set(size * 1.2, size, size * 0.55);
    instance_dummy.updateMatrix();
    front_crumbs.setMatrixAt(i, instance_dummy.matrix);
  }
  front_crumbs.instanceMatrix.needsUpdate = true;
  root.add(front_crumbs);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  root.updateMatrixWorld(true);
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