export default function generate(THREE) {
  const root = new THREE.Group();

  const blockW = 1.00;
  const blockH = 0.82;
  const blockD = 0.94;
  const cornerR = 0.065;
  const bevelSize = 0.045;
  const bevelThickness = 0.045;

  const cheese_blockMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7b766,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.32,
    ior: 1.45,
    transparent: true,
    opacity: 0.96,
    thickness: 0.45,
    attenuationColor: 0xffc778,
    attenuationDistance: 1.4,
    clearcoat: 0.08,
    clearcoatRoughness: 0.5,
  });

  const surface_specksMat = new THREE.MeshStandardMaterial({
    color: 0xffedc2,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
  });

  const surface_poresMat = new THREE.MeshStandardMaterial({
    color: 0xb87928,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
  });

  const halfW = blockW / 2;
  const halfH = blockH / 2;
  const k = 0.55228475;
  const curveOffset = cornerR * k;

  const cheese_blockShape = new THREE.Shape();
  cheese_blockShape.moveTo(-halfW + cornerR, -halfH);
  cheese_blockShape.lineTo(halfW - cornerR, -halfH);
  cheese_blockShape.bezierCurveTo(
    halfW - cornerR + curveOffset, -halfH,
    halfW, -halfH + cornerR - curveOffset,
    halfW, -halfH + cornerR
  );
  cheese_blockShape.lineTo(halfW, halfH - cornerR);
  cheese_blockShape.bezierCurveTo(
    halfW, halfH - cornerR + curveOffset,
    halfW - cornerR + curveOffset, halfH,
    halfW - cornerR, halfH
  );
  cheese_blockShape.lineTo(-halfW + cornerR, halfH);
  cheese_blockShape.bezierCurveTo(
    -halfW + cornerR - curveOffset, halfH,
    -halfW, halfH - cornerR + curveOffset,
    -halfW, halfH - cornerR
  );
  cheese_blockShape.lineTo(-halfW, -halfH + cornerR);
  cheese_blockShape.bezierCurveTo(
    -halfW, -halfH + cornerR - curveOffset,
    -halfW + cornerR - curveOffset, -halfH,
    -halfW + cornerR, -halfH
  );
  cheese_blockShape.closePath();

  const cheese_blockGeom = new THREE.ExtrudeGeometry(cheese_blockShape, {
    depth: blockD,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelOffset: 0,
    bevelSegments: 6,
  });
  cheese_blockGeom.translate(0, 0, -blockD / 2);
  cheese_blockGeom.computeVertexNormals();

  const cheese_block = new THREE.Mesh(cheese_blockGeom, cheese_blockMat);
  root.add(cheese_block);

  const frontZ = blockD / 2 + bevelThickness + 0.002;
  const sideX = halfW + bevelSize + 0.002;
  const topY = halfH + bevelSize + 0.002;

  const surface_specksGeom = new THREE.CircleGeometry(0.006, 10);
  const surface_specks = new THREE.InstancedMesh(
    surface_specksGeom,
    surface_specksMat,
    20
  );
  const speck_transform = new THREE.Object3D();
  let speckIndex = 0;

  for (let i = 0; i < 8; i++) {
    speck_transform.position.set(
      -0.34 + i * 0.095,
      -0.27 + ((i * 3) % 7) * 0.085,
      frontZ
    );
    speck_transform.rotation.set(0, 0, (i % 4) * 0.31);
    speck_transform.scale.set(
      0.55 + (i % 3) * 0.25,
      0.38 + ((i + 1) % 3) * 0.22,
      1
    );
    speck_transform.updateMatrix();
    surface_specks.setMatrixAt(speckIndex++, speck_transform.matrix);
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      speck_transform.position.set(
        side * sideX,
        -0.25 + ((i * 2) % 6) * 0.095,
        -0.31 + i * 0.125
      );
      speck_transform.rotation.set(
        0,
        side > 0 ? Math.PI / 2 : -Math.PI / 2,
        (i % 3) * 0.38
      );
      speck_transform.scale.set(
        0.5 + (i % 2) * 0.35,
        0.42 + ((i + 1) % 3) * 0.2,
        1
      );
      speck_transform.updateMatrix();
      surface_specks.setMatrixAt(speckIndex++, speck_transform.matrix);
    }
  }

  for (let i = 0; i < 6; i++) {
    speck_transform.position.set(
      -0.32 + i * 0.128,
      topY,
      -0.27 + ((i * 2) % 5) * 0.135
    );
    speck_transform.rotation.set(
      -Math.PI / 2,
      0,
      (i % 4) * 0.27
    );
    speck_transform.scale.set(
      0.48 + (i % 3) * 0.22,
      0.4 + ((i + 2) % 3) * 0.18,
      1
    );
    speck_transform.updateMatrix();
    surface_specks.setMatrixAt(speckIndex++, speck_transform.matrix);
  }

  surface_specks.instanceMatrix.needsUpdate = true;
  root.add(surface_specks);

  const surface_poresGeom = new THREE.CircleGeometry(0.009, 12);
  const surface_pores = new THREE.InstancedMesh(
    surface_poresGeom,
    surface_poresMat,
    6
  );
  const pore_transform = new THREE.Object3D();
  let poreIndex = 0;

  for (let i = 0; i < 3; i++) {
    pore_transform.position.set(
      -0.18 + i * 0.18,
      -0.12 + i * 0.11,
      frontZ + 0.0005
    );
    pore_transform.rotation.set(0, 0, i * 0.47);
    pore_transform.scale.set(0.55 + i * 0.16, 0.34 + i * 0.12, 1);
    pore_transform.updateMatrix();
    surface_pores.setMatrixAt(poreIndex++, pore_transform.matrix);
  }

  for (const side of [-1, 1]) {
    pore_transform.position.set(
      side * (sideX + 0.0005),
      0.04 + side * 0.07,
      0.08 - side * 0.12
    );
    pore_transform.rotation.set(
      0,
      side > 0 ? Math.PI / 2 : -Math.PI / 2,
      side * 0.35
    );
    pore_transform.scale.set(0.62, 0.38, 1);
    pore_transform.updateMatrix();
    surface_pores.setMatrixAt(poreIndex++, pore_transform.matrix);
  }

  pore_transform.position.set(0.12, topY + 0.0005, -0.08);
  pore_transform.rotation.set(-Math.PI / 2, 0, 0.3);
  pore_transform.scale.set(0.5, 0.32, 1);
  pore_transform.updateMatrix();
  surface_pores.setMatrixAt(poreIndex++, pore_transform.matrix);

  surface_pores.instanceMatrix.needsUpdate = true;
  root.add(surface_pores);

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