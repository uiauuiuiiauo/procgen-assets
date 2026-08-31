export default function generate(THREE) {
  const root = new THREE.Group();

  const blockW = 1.18;
  const blockH = 0.62;
  const blockD = 0.92;
  const cornerR = 0.09;
  const bevel = 0.035;

  function createRoundedBlockGeometry(width, height, depth, radius, bevelSize) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;

    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevelSize,
      bevelSize,
      bevelSegments: 5
    });
    geometry.translate(0, 0, -depth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  const cheese_blockGeom = createRoundedBlockGeometry(
    blockW,
    blockH,
    blockD,
    cornerR,
    bevel
  );
  const cheese_blockMat = new THREE.MeshStandardMaterial({
    color: 0xf2d486,
    metalness: 0.0,
    roughness: 0.7
  });
  const cheese_block = new THREE.Mesh(cheese_blockGeom, cheese_blockMat);
  root.add(cheese_block);

  const topY = blockH / 2 + bevel + 0.003;
  const frontZ = blockD / 2 + bevel + 0.003;
  const sideX = blockW / 2 + bevel + 0.003;

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, sx, sy, sz, rx, ry, rz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const top_specklesGeom = new THREE.CircleGeometry(0.008, 7);
  const top_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xb44709,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const topSpeckleCount = 130;
  const top_speckles = new THREE.InstancedMesh(
    top_specklesGeom,
    top_specklesMat,
    topSpeckleCount
  );

  for (let i = 0; i < topSpeckleCount; i++) {
    const u = ((i * 47 + 11) % 131) / 130;
    const v = ((i * i * 17 + i * 29 + 7) % 137) / 136;
    const x = (u - 0.5) * 1.07;
    const z = (v - 0.5) * 0.82;
    const size = 0.38 + ((i * 13) % 17) / 16;
    const stretch = 0.58 + ((i * 19) % 11) / 18;
    const angle = ((i * 23) % 37) / 37 * Math.PI;
    setInstance(
      top_speckles,
      i,
      x,
      topY,
      z,
      size,
      size * stretch,
      1,
      -Math.PI / 2,
      0,
      angle
    );
  }
  top_speckles.instanceMatrix.needsUpdate = true;
  root.add(top_speckles);

  const top_crumbsGeom = new THREE.DodecahedronGeometry(0.014, 0);
  const top_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0x7d2708,
    metalness: 0.0,
    roughness: 0.7
  });
  const topCrumbCount = 34;
  const top_crumbs = new THREE.InstancedMesh(
    top_crumbsGeom,
    top_crumbsMat,
    topCrumbCount
  );

  for (let i = 0; i < topCrumbCount; i++) {
    const u = ((i * 41 + 5) % 97) / 96;
    const v = ((i * i * 13 + i * 31 + 3) % 101) / 100;
    const x = (u - 0.5) * 1.02;
    const z = (v - 0.5) * 0.78;
    const sx = 0.55 + ((i * 7) % 13) / 11;
    const sy = 0.28 + ((i * 11) % 9) / 18;
    const sz = 0.55 + ((i * 5) % 17) / 15;
    const angle = ((i * 17) % 29) / 29 * Math.PI;
    setInstance(
      top_crumbs,
      i,
      x,
      topY + 0.005 * sy,
      z,
      sx,
      sy,
      sz,
      0,
      angle,
      0
    );
  }
  top_crumbs.instanceMatrix.needsUpdate = true;
  root.add(top_crumbs);

  const front_specklesGeom = new THREE.CircleGeometry(0.007, 7);
  const front_specklesMat = top_specklesMat;
  const frontSpeckleCount = 48;
  const front_speckles = new THREE.InstancedMesh(
    front_specklesGeom,
    front_specklesMat,
    frontSpeckleCount
  );

  for (let i = 0; i < frontSpeckleCount; i++) {
    const u = ((i * 37 + 9) % 103) / 102;
    const v = ((i * i * 19 + i * 11 + 4) % 107) / 106;
    const x = (u - 0.5) * 1.03;
    const y = (v - 0.5) * 0.50 - 0.015;
    const size = 0.35 + ((i * 9) % 15) / 14;
    const stretch = 0.55 + ((i * 7) % 12) / 17;
    const angle = ((i * 23) % 31) / 31 * Math.PI;
    setInstance(
      front_speckles,
      i,
      x,
      y,
      frontZ,
      size,
      size * stretch,
      1,
      0,
      0,
      angle
    );
  }
  front_speckles.instanceMatrix.needsUpdate = true;
  root.add(front_speckles);

  const front_crumbsGeom = top_crumbsGeom;
  const front_crumbsMat = top_crumbsMat;
  const frontCrumbCount = 11;
  const front_crumbs = new THREE.InstancedMesh(
    front_crumbsGeom,
    front_crumbsMat,
    frontCrumbCount
  );

  for (let i = 0; i < frontCrumbCount; i++) {
    const u = ((i * 31 + 7) % 43) / 42;
    const v = ((i * i * 7 + i * 9 + 2) % 47) / 46;
    const x = (u - 0.5) * 0.98;
    const y = (v - 0.5) * 0.46 - 0.02;
    const sx = 0.48 + ((i * 5) % 9) / 10;
    const sy = 0.45 + ((i * 7) % 11) / 12;
    const sz = 0.22 + ((i * 3) % 7) / 20;
    setInstance(
      front_crumbs,
      i,
      x,
      y,
      frontZ + 0.002,
      sx,
      sy,
      sz,
      0,
      0,
      i * 0.47
    );
  }
  front_crumbs.instanceMatrix.needsUpdate = true;
  root.add(front_crumbs);

  const right_specklesGeom = front_specklesGeom;
  const right_specklesMat = top_specklesMat;
  const rightSpeckleCount = 42;
  const right_speckles = new THREE.InstancedMesh(
    right_specklesGeom,
    right_specklesMat,
    rightSpeckleCount
  );

  for (let i = 0; i < rightSpeckleCount; i++) {
    const u = ((i * 29 + 3) % 89) / 88;
    const v = ((i * i * 13 + i * 17 + 5) % 97) / 96;
    const z = (u - 0.5) * 0.76;
    const y = (v - 0.5) * 0.50 - 0.01;
    const size = 0.36 + ((i * 11) % 16) / 15;
    const stretch = 0.55 + ((i * 5) % 13) / 18;
    const angle = ((i * 19) % 29) / 29 * Math.PI;
    setInstance(
      right_speckles,
      i,
      sideX,
      y,
      z,
      size,
      size * stretch,
      1,
      0,
      Math.PI / 2,
      angle
    );
  }
  right_speckles.instanceMatrix.needsUpdate = true;
  root.add(right_speckles);

  const right_crumbsGeom = top_crumbsGeom;
  const right_crumbsMat = top_crumbsMat;
  const rightCrumbCount = 10;
  const right_crumbs = new THREE.InstancedMesh(
    right_crumbsGeom,
    right_crumbsMat,
    rightCrumbCount
  );

  for (let i = 0; i < rightCrumbCount; i++) {
    const u = ((i * 23 + 4) % 41) / 40;
    const v = ((i * i * 11 + i * 7 + 1) % 43) / 42;
    const z = (u - 0.5) * 0.72;
    const y = (v - 0.5) * 0.45 - 0.015;
    const sx = 0.24 + ((i * 5) % 8) / 19;
    const sy = 0.45 + ((i * 7) % 10) / 12;
    const sz = 0.50 + ((i * 3) % 11) / 11;
    setInstance(
      right_crumbs,
      i,
      sideX + 0.002,
      y,
      z,
      sx,
      sy,
      sz,
      i * 0.39,
      0,
      0
    );
  }
  right_crumbs.instanceMatrix.needsUpdate = true;
  root.add(right_crumbs);

  const front_pitsGeom = new THREE.CircleGeometry(0.012, 10);
  const front_pitsMat = new THREE.MeshStandardMaterial({
    color: 0xd8b75f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const frontPitData = [
    [-0.43, -0.16, 0.55, 0.42],
    [-0.31, 0.05, 0.35, 0.48],
    [-0.19, -0.23, 0.42, 0.30],
    [-0.04, -0.10, 0.72, 0.55],
    [0.08, -0.13, 0.48, 0.38],
    [0.21, -0.22, 0.38, 0.32],
    [0.34, 0.02, 0.30, 0.42],
    [0.45, -0.12, 0.44, 0.31],
    [-0.48, 0.12, 0.28, 0.35]
  ];
  const front_pits = new THREE.InstancedMesh(
    front_pitsGeom,
    front_pitsMat,
    frontPitData.length
  );

  for (let i = 0; i < frontPitData.length; i++) {
    const pit = frontPitData[i];
    setInstance(
      front_pits,
      i,
      pit[0],
      pit[1],
      frontZ + 0.001,
      pit[2],
      pit[3],
      1,
      0,
      0,
      i * 0.41
    );
  }
  front_pits.instanceMatrix.needsUpdate = true;
  root.add(front_pits);

  const right_pitsGeom = front_pitsGeom;
  const right_pitsMat = front_pitsMat;
  const rightPitData = [
    [-0.29, -0.15, 0.38, 0.30],
    [-0.18, 0.06, 0.30, 0.42],
    [-0.05, -0.21, 0.45, 0.32],
    [0.10, -0.04, 0.32, 0.28],
    [0.23, -0.17, 0.40, 0.35],
    [0.31, 0.08, 0.27, 0.38]
  ];
  const right_pits = new THREE.InstancedMesh(
    right_pitsGeom,
    right_pitsMat,
    rightPitData.length
  );

  for (let i = 0; i < rightPitData.length; i++) {
    const pit = rightPitData[i];
    setInstance(
      right_pits,
      i,
      sideX + 0.001,
      pit[1],
      pit[0],
      pit[2],
      pit[3],
      1,
      0,
      Math.PI / 2,
      i * 0.36
    );
  }
  right_pits.instanceMatrix.needsUpdate = true;
  root.add(right_pits);

  const bottom_crumbsGeom = new THREE.DodecahedronGeometry(0.008, 0);
  const bottom_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0xe5c36f,
    metalness: 0.0,
    roughness: 0.7
  });
  const bottomCrumbCount = 24;
  const bottom_crumbs = new THREE.InstancedMesh(
    bottom_crumbsGeom,
    bottom_crumbsMat,
    bottomCrumbCount
  );

  for (let i = 0; i < bottomCrumbCount; i++) {
    const u = ((i * 31 + 2) % 71) / 70;
    const x = (u - 0.5) * 1.04;
    const z = frontZ - 0.002 - ((i * 7) % 5) * 0.001;
    const y = -blockH / 2 + 0.004 + ((i * 11) % 9) * 0.001;
    const sx = 0.45 + ((i * 5) % 8) / 9;
    const sy = 0.30 + ((i * 7) % 7) / 12;
    const sz = 0.45 + ((i * 3) % 9) / 10;
    setInstance(
      bottom_crumbs,
      i,
      x,
      y,
      z,
      sx,
      sy,
      sz,
      i * 0.27,
      i * 0.43,
      0
    );
  }
  bottom_crumbs.instanceMatrix.needsUpdate = true;
  root.add(bottom_crumbs);

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