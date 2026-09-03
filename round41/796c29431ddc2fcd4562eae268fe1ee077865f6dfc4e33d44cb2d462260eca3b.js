export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const strawMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f5f4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const corkMat = new THREE.MeshStandardMaterial({
    color: 0xb97842,
    metalness: 0.0,
    roughness: 0.9,
  });

  const cork_poreMat = new THREE.MeshStandardMaterial({
    color: 0x754522,
    metalness: 0.0,
    roughness: 0.9,
  });

  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f5,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const openingMat = new THREE.MeshStandardMaterial({
    color: 0xb8c3bf,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const bottle_profile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.300, 0.000),
    new THREE.Vector2(0.350, 0.018),
    new THREE.Vector2(0.382, 0.050),
    new THREE.Vector2(0.397, 0.110),
    new THREE.Vector2(0.405, 0.220),
    new THREE.Vector2(0.405, 1.080),
    new THREE.Vector2(0.402, 1.220),
    new THREE.Vector2(0.390, 1.340),
    new THREE.Vector2(0.360, 1.450),
    new THREE.Vector2(0.315, 1.560),
    new THREE.Vector2(0.265, 1.650),
    new THREE.Vector2(0.220, 1.720),
    new THREE.Vector2(0.188, 1.790),
    new THREE.Vector2(0.170, 1.870),
    new THREE.Vector2(0.165, 2.080),
    new THREE.Vector2(0.170, 2.120),
    new THREE.Vector2(0.145, 2.120),
    new THREE.Vector2(0.143, 2.080),
    new THREE.Vector2(0.145, 1.880),
    new THREE.Vector2(0.158, 1.810),
    new THREE.Vector2(0.185, 1.740),
    new THREE.Vector2(0.230, 1.670),
    new THREE.Vector2(0.280, 1.580),
    new THREE.Vector2(0.325, 1.470),
    new THREE.Vector2(0.355, 1.350),
    new THREE.Vector2(0.370, 1.220),
    new THREE.Vector2(0.370, 0.220),
    new THREE.Vector2(0.360, 0.150),
    new THREE.Vector2(0.330, 0.110),
    new THREE.Vector2(0.280, 0.090),
    new THREE.Vector2(0.000, 0.090),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_profile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, glassMat);
  root.add(bottle_body);

  const bottle_base_ringGeom = new THREE.TorusGeometry(0.365, 0.018, 10, 64);
  const bottle_base_ring = new THREE.Mesh(bottle_base_ringGeom, glassMat);
  bottle_base_ring.rotation.x = Math.PI / 2;
  bottle_base_ring.position.y = 0.055;
  root.add(bottle_base_ring);

  const bottle_punt_ringGeom = new THREE.TorusGeometry(0.135, 0.010, 8, 48);
  const bottle_punt_ring = new THREE.Mesh(bottle_punt_ringGeom, glassMat);
  bottle_punt_ring.rotation.x = Math.PI / 2;
  bottle_punt_ring.position.y = 0.096;
  root.add(bottle_punt_ring);

  const bottle_lipGeom = new THREE.TorusGeometry(0.180, 0.040, 16, 64);
  const bottle_lip = new THREE.Mesh(bottle_lipGeom, glassMat);
  bottle_lip.rotation.x = Math.PI / 2;
  bottle_lip.position.y = 2.105;
  root.add(bottle_lip);

  const bottle_lip_annulusGeom = new THREE.RingGeometry(0.143, 0.218, 64);
  const bottle_lip_annulus = new THREE.Mesh(bottle_lip_annulusGeom, glassMat);
  bottle_lip_annulus.rotation.x = Math.PI / 2;
  bottle_lip_annulus.position.y = 2.143;
  root.add(bottle_lip_annulus);

  const bottle_mouth_openingGeom = new THREE.CircleGeometry(0.142, 48);
  const bottle_mouth_opening = new THREE.Mesh(
    bottle_mouth_openingGeom,
    openingMat
  );
  bottle_mouth_opening.rotation.x = Math.PI / 2;
  bottle_mouth_opening.position.y = 2.132;
  root.add(bottle_mouth_opening);

  const labelBottomY = 0.300;
  const labelTopY = 1.100;
  const labelBottomR = 0.408;
  const labelTopR = 0.407;
  const labelHeight = labelTopY - labelBottomY;
  const labelSegmentCount = 32;
  const labelVertices = [];
  const labelIndices = [];

  function labelRadiusAt(y) {
    const t = (y - labelBottomY) / labelHeight;
    return labelBottomR + (labelTopR - labelBottomR) * t;
  }

  for (let i = 0; i <= labelSegmentCount; i++) {
    const angle = -Math.PI + (i / labelSegmentCount) * Math.PI * 2;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const bottomY = i === 0 || i === labelSegmentCount
      ? 0.335
      : labelBottomY;
    const topY = i === 0 || i === labelSegmentCount
      ? 1.065
      : labelTopY;
    const bottomR = labelRadiusAt(bottomY) + 0.004;
    const topR = labelRadiusAt(topY) + 0.004;

    labelVertices.push(
      cosine * bottomR, bottomY, sine * bottomR,
      cosine * topR, topY, sine * topR
    );
  }

  for (let i = 0; i < labelSegmentCount; i++) {
    const bottomIndex = i * 2;
    const topIndex = bottomIndex + 1;
    const nextBottomIndex = bottomIndex + 2;
    const nextTopIndex = bottomIndex + 3;
    labelIndices.push(
      bottomIndex, topIndex, nextBottomIndex,
      topIndex, nextTopIndex, nextBottomIndex
    );
  }

  const labelGeom = new THREE.BufferGeometry();
  labelGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(labelVertices, 3)
  );
  labelGeom.setIndex(labelIndices);
  labelGeom.computeVertexNormals();

  const label = new THREE.Mesh(labelGeom, labelMat);
  root.add(label);

  const corkBottomY = 2.035;
  const corkTopY = 2.420;
  const corkHeight = corkTopY - corkBottomY;
  const corkBottomR = 0.145;
  const corkTopR = 0.180;

  const corkGeom = new THREE.CylinderGeometry(
    corkTopR,
    corkBottomR,
    corkHeight,
    48,
    4,
    false
  );
  const cork = new THREE.Mesh(corkGeom, corkMat);
  cork.position.y = (corkBottomY + corkTopY) / 2;
  root.add(cork);

  const cork_poreGeom = new THREE.SphereGeometry(1, 7, 4);
  const corkPoreCount = 96;
  const cork_pores = new THREE.InstancedMesh(
    cork_poreGeom,
    cork_poreMat,
    corkPoreCount
  );
  const cork_pore_dummy = new THREE.Object3D();
  const radialAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 72; i++) {
    const t = (((i * 29) % 72) + 0.5) / 72;
    const angle = i * 2.399963229728653;
    const y = corkBottomY + t * corkHeight;
    const radius =
      corkBottomR +
      (corkTopR - corkBottomR) * ((y - corkBottomY) / corkHeight);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );

    cork_pore_dummy.position.set(
      normal.x * (radius + 0.001),
      y,
      normal.z * (radius + 0.001)
    );
    cork_pore_dummy.quaternion.setFromUnitVectors(radialAxis, normal);
    cork_pore_dummy.scale.set(
      0.009 + (i % 5) * 0.0022,
      0.005 + ((i * 3) % 5) * 0.0016,
      0.0022
    );
    cork_pore_dummy.updateMatrix();
    cork_pores.setMatrixAt(i, cork_pore_dummy.matrix);
  }

  const topNormal = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 24; i++) {
    const index = 72 + i;
    const angle = i * 2.399963229728653;
    const radius = 0.025 + (((i * 7) % 24) / 24) * 0.137;

    cork_pore_dummy.position.set(
      Math.cos(angle) * radius,
      corkTopY + 0.001,
      Math.sin(angle) * radius
    );
    cork_pore_dummy.quaternion.setFromUnitVectors(radialAxis, topNormal);
    cork_pore_dummy.scale.set(
      0.008 + (i % 4) * 0.0025,
      0.005 + ((i * 3) % 4) * 0.002,
      0.002
    );
    cork_pore_dummy.updateMatrix();
    cork_pores.setMatrixAt(index, cork_pore_dummy.matrix);
  }

  cork_pores.instanceMatrix.needsUpdate = true;
  root.add(cork_pores);

  const strawStart = new THREE.Vector3(0.035, 1.895, 0.015);
  const strawEnd = new THREE.Vector3(0.430, 2.920, 0.015);
  const strawDirection = new THREE.Vector3()
    .subVectors(strawEnd, strawStart)
    .normalize();
  const strawLength = strawStart.distanceTo(strawEnd);

  const strawGeom = new THREE.CylinderGeometry(
    0.036,
    0.036,
    strawLength,
    32,
    1,
    true
  );
  const straw = new THREE.Mesh(strawGeom, strawMat);
  straw.position.copy(strawStart).add(strawEnd).multiplyScalar(0.5);
  straw.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    strawDirection
  );
  root.add(straw);

  const straw_rimGeom = new THREE.TorusGeometry(0.031, 0.005, 8, 32);
  const straw_rim = new THREE.Mesh(straw_rimGeom, strawMat);
  straw_rim.position.copy(strawEnd);
  straw_rim.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    strawDirection
  );
  root.add(straw_rim);

  const straw_openingGeom = new THREE.CircleGeometry(0.027, 32);
  const straw_opening = new THREE.Mesh(straw_openingGeom, openingMat);
  straw_opening.position
    .copy(strawEnd)
    .addScaledVector(strawDirection, 0.001);
  straw_opening.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    strawDirection
  );
  root.add(straw_opening);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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