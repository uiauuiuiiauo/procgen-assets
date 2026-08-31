export default function generate(THREE) {
  const root = new THREE.Group();

  const spongeMat = new THREE.MeshStandardMaterial({
    color: 0xfff4d2,
    metalness: 0.0,
    roughness: 0.9,
    emissive: 0xffe8b0,
    emissiveIntensity: 0.18,
  });
  const top_crustMat = new THREE.MeshStandardMaterial({
    color: 0xf2c878,
    metalness: 0.0,
    roughness: 0.9,
  });
  const bottom_crustMat = new THREE.MeshStandardMaterial({
    color: 0xc98235,
    metalness: 0.0,
    roughness: 0.9,
  });
  const right_crustMat = new THREE.MeshStandardMaterial({
    color: 0xd9953e,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crumb_poresMat = new THREE.MeshStandardMaterial({
    color: 0xd8c77f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const jamMat = new THREE.MeshPhysicalMaterial({
    color: 0xa40035,
    metalness: 0.0,
    roughness: 0.14,
    transmission: 0.12,
    ior: 1.4,
    transparent: true,
    opacity: 0.96,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  });
  const jam_darkMat = new THREE.MeshStandardMaterial({
    color: 0x65001f,
    metalness: 0.0,
    roughness: 0.2,
  });
  const jam_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffa8bf,
    metalness: 0.0,
    roughness: 0.18,
  });
  const sugarMat = new THREE.MeshStandardMaterial({
    color: 0xfff9e8,
    metalness: 0.0,
    roughness: 0.9,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  const spongeShape = new THREE.Shape();
  spongeShape.moveTo(-0.91, -0.50);
  spongeShape.lineTo(0.88, -0.50);
  spongeShape.quadraticCurveTo(0.98, -0.50, 0.99, -0.40);
  spongeShape.lineTo(0.99, 0.39);
  spongeShape.quadraticCurveTo(0.98, 0.49, 0.87, 0.51);
  spongeShape.lineTo(-0.84, 0.51);
  spongeShape.quadraticCurveTo(-0.96, 0.50, -0.99, 0.39);
  spongeShape.lineTo(-0.99, -0.39);
  spongeShape.quadraticCurveTo(-0.98, -0.48, -0.91, -0.50);
  spongeShape.closePath();

  const spongeGeom = new THREE.ExtrudeGeometry(spongeShape, {
    depth: 0.66,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const sponge = new THREE.Mesh(spongeGeom, spongeMat);
  sponge.position.z = -0.33;
  root.add(sponge);

  const top_crustShape = new THREE.Shape();
  top_crustShape.moveTo(-0.97, 0.405);
  top_crustShape.lineTo(0.97, 0.405);
  top_crustShape.quadraticCurveTo(0.99, 0.44, 0.91, 0.49);
  top_crustShape.bezierCurveTo(0.72, 0.545, 0.44, 0.55, 0.24, 0.535);
  top_crustShape.bezierCurveTo(0.02, 0.565, -0.20, 0.55, -0.40, 0.535);
  top_crustShape.bezierCurveTo(-0.62, 0.545, -0.82, 0.50, -0.95, 0.455);
  top_crustShape.quadraticCurveTo(-0.99, 0.43, -0.97, 0.405);
  top_crustShape.closePath();

  const top_crustGeom = new THREE.ExtrudeGeometry(top_crustShape, {
    depth: 0.68,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const top_crust = new THREE.Mesh(top_crustGeom, top_crustMat);
  top_crust.position.z = -0.34;
  root.add(top_crust);

  const bottom_crustShape = new THREE.Shape();
  bottom_crustShape.moveTo(-0.89, -0.535);
  bottom_crustShape.lineTo(0.89, -0.535);
  bottom_crustShape.quadraticCurveTo(0.98, -0.53, 0.99, -0.47);
  bottom_crustShape.lineTo(0.98, -0.425);
  bottom_crustShape.bezierCurveTo(0.60, -0.445, 0.25, -0.43, -0.05, -0.445);
  bottom_crustShape.bezierCurveTo(-0.35, -0.43, -0.67, -0.45, -0.98, -0.425);
  bottom_crustShape.lineTo(-0.98, -0.47);
  bottom_crustShape.quadraticCurveTo(-0.97, -0.52, -0.89, -0.535);
  bottom_crustShape.closePath();

  const bottom_crustGeom = new THREE.ExtrudeGeometry(bottom_crustShape, {
    depth: 0.67,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const bottom_crust = new THREE.Mesh(bottom_crustGeom, bottom_crustMat);
  bottom_crust.position.z = -0.335;
  root.add(bottom_crust);

  const right_crustShape = new THREE.Shape();
  right_crustShape.moveTo(0.91, -0.48);
  right_crustShape.lineTo(0.98, -0.46);
  right_crustShape.lineTo(0.99, 0.39);
  right_crustShape.quadraticCurveTo(0.98, 0.47, 0.90, 0.49);
  right_crustShape.lineTo(0.87, 0.43);
  right_crustShape.lineTo(0.88, -0.42);
  right_crustShape.closePath();

  const right_crustGeom = new THREE.ExtrudeGeometry(right_crustShape, {
    depth: 0.67,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const right_crust = new THREE.Mesh(right_crustGeom, right_crustMat);
  right_crust.position.z = -0.335;
  root.add(right_crust);

  const jamShape = new THREE.Shape();
  jamShape.moveTo(-0.97, 0.085);
  jamShape.bezierCurveTo(-0.88, 0.12, -0.82, 0.10, -0.73, 0.115);
  jamShape.bezierCurveTo(-0.61, 0.14, -0.54, 0.105, -0.43, 0.125);
  jamShape.bezierCurveTo(-0.31, 0.15, -0.22, 0.105, -0.10, 0.125);
  jamShape.bezierCurveTo(0.02, 0.15, 0.13, 0.105, 0.24, 0.125);
  jamShape.bezierCurveTo(0.37, 0.15, 0.48, 0.105, 0.60, 0.12);
  jamShape.bezierCurveTo(0.73, 0.145, 0.84, 0.105, 0.95, 0.085);
  jamShape.lineTo(0.95, -0.075);
  jamShape.bezierCurveTo(0.86, -0.11, 0.78, -0.09, 0.68, -0.11);
  jamShape.bezierCurveTo(0.56, -0.13, 0.48, -0.085, 0.36, -0.11);
  jamShape.bezierCurveTo(0.23, -0.135, 0.14, -0.085, 0.02, -0.105);
  jamShape.bezierCurveTo(-0.10, -0.13, -0.20, -0.085, -0.32, -0.11);
  jamShape.bezierCurveTo(-0.44, -0.135, -0.54, -0.085, -0.66, -0.105);
  jamShape.bezierCurveTo(-0.78, -0.125, -0.87, -0.085, -0.97, -0.07);
  jamShape.closePath();

  const jamGeom = new THREE.ExtrudeGeometry(jamShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.009,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const jam = new THREE.Mesh(jamGeom, jamMat);
  jam.position.z = 0.35;
  root.add(jam);

  const fruitData = [
    { x: -0.68, y: -0.005, sx: 0.15, sy: 0.105, rot: -0.20 },
    { x: -0.34, y: 0.015, sx: 0.17, sy: 0.115, rot: 0.16 },
    { x: 0.02, y: 0.020, sx: 0.18, sy: 0.120, rot: -0.08 },
    { x: 0.40, y: 0.025, sx: 0.18, sy: 0.125, rot: 0.18 },
    { x: 0.76, y: 0.030, sx: 0.16, sy: 0.115, rot: -0.15 },
  ];

  const jam_ribbonGeom = new THREE.SphereGeometry(1, 24, 12);
  const jam_ribbon = new THREE.InstancedMesh(
    jam_ribbonGeom,
    jamMat,
    fruitData.length
  );
  const fruitDummy = new THREE.Object3D();
  for (let i = 0; i < fruitData.length; i++) {
    const fruit = fruitData[i];
    fruitDummy.position.set(fruit.x, fruit.y, 0.402);
    fruitDummy.rotation.set(0, 0, fruit.rot);
    fruitDummy.scale.set(fruit.sx, fruit.sy, 0.035);
    fruitDummy.updateMatrix();
    jam_ribbon.setMatrixAt(i, fruitDummy.matrix);
  }
  jam_ribbon.instanceMatrix.needsUpdate = true;
  root.add(jam_ribbon);

  const jam_drupeletsGeom = new THREE.SphereGeometry(1, 28, 16);
  const jam_drupeletsMat = new THREE.MeshPhysicalMaterial({
    color: 0x8e002d,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.1,
    ior: 1.4,
    transparent: true,
    opacity: 0.97,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
  });
  const jam_drupelets = new THREE.InstancedMesh(
    jam_drupeletsGeom,
    jam_drupeletsMat,
    fruitData.length
  );
  for (let i = 0; i < fruitData.length; i++) {
    const fruit = fruitData[i];
    fruitDummy.position.set(fruit.x, fruit.y, 0.426);
    fruitDummy.rotation.set(0, 0, fruit.rot);
    fruitDummy.scale.set(fruit.sx * 0.92, fruit.sy * 0.90, 0.046);
    fruitDummy.updateMatrix();
    jam_drupelets.setMatrixAt(i, fruitDummy.matrix);
  }
  jam_drupelets.instanceMatrix.needsUpdate = true;
  root.add(jam_drupelets);

  const jam_creasesGeom = new THREE.TorusGeometry(
    0.032,
    0.004,
    6,
    18,
    Math.PI * 1.35
  );
  const jam_creases = new THREE.InstancedMesh(
    jam_creasesGeom,
    jam_darkMat,
    fruitData.length * 2
  );
  let creaseIndex = 0;
  for (let i = 0; i < fruitData.length; i++) {
    const fruit = fruitData[i];
    for (let j = 0; j < 2; j++) {
      const side = j === 0 ? -1 : 1;
      fruitDummy.position.set(
        fruit.x + side * fruit.sx * 0.28,
        fruit.y + (j === 0 ? 0.012 : -0.012),
        0.474
      );
      fruitDummy.rotation.set(0, 0, fruit.rot + side * 0.75);
      fruitDummy.scale.set(0.85, 0.52, 0.45);
      fruitDummy.updateMatrix();
      jam_creases.setMatrixAt(creaseIndex++, fruitDummy.matrix);
    }
  }
  jam_creases.instanceMatrix.needsUpdate = true;
  root.add(jam_creases);

  const jam_highlightsGeom = new THREE.SphereGeometry(1, 12, 8);
  const jam_highlights = new THREE.InstancedMesh(
    jam_highlightsGeom,
    jam_highlightMat,
    fruitData.length * 2
  );
  let highlightIndex = 0;
  for (let i = 0; i < fruitData.length; i++) {
    const fruit = fruitData[i];
    const highlightPositions = [
      {
        x: fruit.x - fruit.sx * 0.25,
        y: fruit.y + fruit.sy * 0.30,
        sx: 0.030,
        sy: 0.010,
      },
      {
        x: fruit.x + fruit.sx * 0.22,
        y: fruit.y + fruit.sy * 0.05,
        sx: 0.018,
        sy: 0.007,
      },
    ];
    for (const highlight of highlightPositions) {
      fruitDummy.position.set(highlight.x, highlight.y, 0.477);
      fruitDummy.rotation.set(0, 0, fruit.rot + 0.2);
      fruitDummy.scale.set(highlight.sx, highlight.sy, 0.004);
      fruitDummy.updateMatrix();
      jam_highlights.setMatrixAt(highlightIndex++, fruitDummy.matrix);
    }
  }
  jam_highlights.instanceMatrix.needsUpdate = true;
  root.add(jam_highlights);

  const jam_seedsGeom = new THREE.SphereGeometry(1, 10, 6);
  const jam_seeds = new THREE.InstancedMesh(
    jam_seedsGeom,
    sugarMat,
    fruitData.length * 2
  );
  let seedIndex = 0;
  for (let i = 0; i < fruitData.length; i++) {
    const fruit = fruitData[i];
    for (let j = 0; j < 2; j++) {
      const angle = fruit.rot + (j === 0 ? -0.45 : 0.70);
      fruitDummy.position.set(
        fruit.x + Math.cos(angle) * fruit.sx * 0.34,
        fruit.y + Math.sin(angle) * fruit.sy * 0.28,
        0.480
      );
      fruitDummy.rotation.set(0, 0, angle);
      fruitDummy.scale.set(0.010, 0.004, 0.003);
      fruitDummy.updateMatrix();
      jam_seeds.setMatrixAt(seedIndex++, fruitDummy.matrix);
    }
  }
  jam_seeds.instanceMatrix.needsUpdate = true;
  root.add(jam_seeds);

  const jam_dripsGeom = new THREE.SphereGeometry(1, 12, 8);
  const jam_drips = new THREE.InstancedMesh(jam_dripsGeom, jamMat, 4);
  const dripData = [
    { x: -0.82, y: -0.135, sx: 0.012, sy: 0.050 },
    { x: -0.24, y: -0.125, sx: 0.010, sy: 0.035 },
    { x: 0.29, y: -0.135, sx: 0.012, sy: 0.055 },
    { x: 0.72, y: -0.120, sx: 0.009, sy: 0.032 },
  ];
  for (let i = 0; i < dripData.length; i++) {
    const drip = dripData[i];
    fruitDummy.position.set(drip.x, drip.y, 0.405);
    fruitDummy.rotation.set(0, 0, 0);
    fruitDummy.scale.set(drip.sx, drip.sy, 0.012);
    fruitDummy.updateMatrix();
    jam_drips.setMatrixAt(i, fruitDummy.matrix);
  }
  jam_drips.instanceMatrix.needsUpdate = true;
  root.add(jam_drips);

  const crumb_poresGeom = new THREE.CircleGeometry(1, 10);
  const crumb_pores = new THREE.InstancedMesh(
    crumb_poresGeom,
    crumb_poresMat,
    190
  );
  const poreDummy = new THREE.Object3D();
  let poreIndex = 0;

  for (let i = 0; i < 110; i++) {
    const x = -0.90 + (((i * 37) % 113) / 112) * 1.80;
    const y = 0.15 + (((i * 53) % 109) / 108) * 0.31;
    const size = 0.006 + ((i * 17) % 11) * 0.0015;
    poreDummy.position.set(x, y, 0.351);
    poreDummy.rotation.set(0, 0, ((i * 29) % 17) * 0.19);
    poreDummy.scale.set(
      size * (0.75 + (i % 4) * 0.12),
      size * (0.65 + ((i + 2) % 5) * 0.10),
      1
    );
    poreDummy.updateMatrix();
    crumb_pores.setMatrixAt(poreIndex++, poreDummy.matrix);
  }

  for (let i = 0; i < 80; i++) {
    const x = -0.89 + (((i * 41) % 83) / 82) * 1.78;
    const y = -0.39 + (((i * 31) % 79) / 78) * 0.20;
    const size = 0.006 + ((i * 13) % 10) * 0.0015;
    poreDummy.position.set(x, y, 0.351);
    poreDummy.rotation.set(0, 0, ((i * 23) % 15) * 0.21);
    poreDummy.scale.set(
      size * (0.78 + (i % 3) * 0.14),
      size * (0.68 + ((i + 1) % 4) * 0.11),
      1
    );
    poreDummy.updateMatrix();
    crumb_pores.setMatrixAt(poreIndex++, poreDummy.matrix);
  }

  for (let i = 0; i < 25; i++) {
    const x = -0.86 + (((i * 17) % 29) / 28) * 1.72;
    const y = -0.36 + (((i * 11) % 23) / 22) * 0.70;
    const size = 0.006 + ((i * 7) % 8) * 0.0014;
    poreDummy.position.set(x, y, -0.351);
    poreDummy.rotation.set(0, Math.PI, ((i * 19) % 13) * 0.22);
    poreDummy.scale.set(
      size * (0.8 + (i % 3) * 0.12),
      size * (0.7 + ((i + 1) % 4) * 0.1),
      1
    );
    poreDummy.updateMatrix();
    crumb_pores.setMatrixAt(poreIndex++, poreDummy.matrix);
  }
  crumb_pores.instanceMatrix.needsUpdate = true;
  root.add(crumb_pores);

  const top_sugarGeom = new THREE.SphereGeometry(1, 8, 6);
  const top_sugar = new THREE.InstancedMesh(top_sugarGeom, sugarMat, 46);
  const sugarDummy = new THREE.Object3D();
  for (let i = 0; i < 46; i++) {
    const x = -0.88 + (((i * 23) % 47) / 46) * 1.76;
    const z = -0.29 + (((i * 31) % 53) / 52) * 0.58;
    const size = 0.005 + ((i * 7) % 6) * 0.001;
    const surfaceY =
      0.548 + Math.sin((x + 0.88) * 7.5) * 0.006 - Math.abs(x) * 0.012;
    sugarDummy.position.set(x, surfaceY, z);
    sugarDummy.rotation.set(0, 0, 0);
    sugarDummy.scale.set(size, size * 0.55, size);
    sugarDummy.updateMatrix();
    top_sugar.setMatrixAt(i, sugarDummy.matrix);
  }
  top_sugar.instanceMatrix.needsUpdate = true;
  root.add(top_sugar);

  const loose_crumbsGeom = new THREE.SphereGeometry(1, 8, 6);
  const loose_crumbs = new THREE.InstancedMesh(
    loose_crumbsGeom,
    spongeMat,
    10
  );
  const crumbDummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const x = -0.92 + i * 0.19;
    const y = -0.535 - (i % 3) * 0.008;
    const z = 0.30 + (((i * 7) % 11) / 10) * 0.08;
    const size = 0.006 + (i % 4) * 0.002;
    crumbDummy.position.set(x, y, z);
    crumbDummy.rotation.set(0, 0, i * 0.4);
    crumbDummy.scale.set(size, size * 0.65, size);
    crumbDummy.updateMatrix();
    loose_crumbs.setMatrixAt(i, crumbDummy.matrix);
  }
  loose_crumbs.instanceMatrix.needsUpdate = true;
  root.add(loose_crumbs);

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