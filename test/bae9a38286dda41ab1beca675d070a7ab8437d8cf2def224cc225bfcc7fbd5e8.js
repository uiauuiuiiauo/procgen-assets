export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mushroom";

  const cap_group = new THREE.Group();
  cap_group.name = "cap_group";
  root.add(cap_group);

  const stem_group = new THREE.Group();
  stem_group.name = "stem_group";
  root.add(stem_group);

  const capRadius = 1.15;
  const capEdgeY = 1.18;
  const capRise = 0.82;
  const stemBottom = -0.66;
  const stemTop = 1.18;

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x713719,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const capRimMat = new THREE.MeshStandardMaterial({
    color: 0x402012,
    metalness: 0.0,
    roughness: 0.7
  });
  const capMottleMat = new THREE.MeshStandardMaterial({
    color: 0xa65c2b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const capFleckMat = new THREE.MeshStandardMaterial({
    color: 0xd4aa72,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const capSpeckMat = new THREE.MeshStandardMaterial({
    color: 0x24130c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const undersideMat = new THREE.MeshStandardMaterial({
    color: 0xeee9dd,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const gillMat = new THREE.MeshStandardMaterial({
    color: 0xf5f1e7,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xe8e2d5,
    metalness: 0.0,
    roughness: 0.7
  });
  const stemGrooveMat = new THREE.MeshStandardMaterial({
    color: 0xcfc6b6,
    metalness: 0.0,
    roughness: 0.7
  });
  const dirtMat = new THREE.MeshStandardMaterial({
    color: 0x2b1a10,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x49301d,
    metalness: 0.0,
    roughness: 0.7
  });

  function capTopY(radius) {
    const q = Math.min(1, radius / capRadius);
    return capEdgeY + capRise * Math.pow(
      Math.max(0, 1 - q * q),
      0.42
    );
  }

  function capSurfacePose(radius, angle, offset) {
    const q = Math.max(0.001, radius / capRadius);
    const f = Math.max(0.001, 1 - q * q);
    const dyDr = capRise * 0.42 * Math.pow(f, -0.58) *
      (-2 * radius / (capRadius * capRadius));
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const normal = new THREE.Vector3(
      -dyDr * cosA,
      1,
      -dyDr * sinA
    ).normalize();
    const position = new THREE.Vector3(
      radius * cosA,
      capTopY(radius),
      radius * sinA
    ).addScaledVector(normal, offset);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function stemRadiusAt(y) {
    const t = Math.max(
      0,
      Math.min(1, (y - stemBottom) / (stemTop - stemBottom))
    );
    const lowerBulge = 0.075 *
      Math.exp(-Math.pow((y + 0.38) / 0.18, 2));
    return 0.29 + lowerBulge +
      0.075 * Math.pow(Math.max(0, t), 1.4);
  }

  function stemSurfacePose(y, angle, offset) {
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const normal = new THREE.Vector3(cosA, 0, sinA);
    const radius = stemRadiusAt(y) + offset;
    const position = new THREE.Vector3(
      radius * cosA,
      y,
      radius * sinA
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  const capProfile = [
    new THREE.Vector2(0, capEdgeY - 0.01),
    new THREE.Vector2(capRadius, capEdgeY)
  ];
  for (let i = 1; i <= 40; i++) {
    const radius = capRadius * (1 - i / 40);
    capProfile.push(new THREE.Vector2(radius, capTopY(radius)));
  }

  const capGeom = new THREE.LatheGeometry(capProfile, 96);
  const cap = new THREE.Mesh(capGeom, capMat);
  cap.name = "cap";
  cap_group.add(cap);

  const capRimGeom = new THREE.TorusGeometry(
    capRadius - 0.018,
    0.018,
    8,
    96
  );
  const cap_rim = new THREE.Mesh(capRimGeom, capRimMat);
  cap_rim.name = "cap_rim";
  cap_rim.rotation.x = Math.PI / 2;
  cap_rim.position.y = capEdgeY - 0.002;
  cap_group.add(cap_rim);

  const undersideProfile = [];
  for (let i = 0; i <= 40; i++) {
    const radius = 0.35 + (capRadius - 0.35) * i / 40;
    const q = radius / capRadius;
    const y = 1.105 + 0.065 * Math.pow(q, 1.55);
    undersideProfile.push(new THREE.Vector2(radius, y));
  }
  const undersideGeom = new THREE.LatheGeometry(undersideProfile, 96);
  const underside = new THREE.Mesh(undersideGeom, undersideMat);
  underside.name = "underside";
  cap_group.add(underside);

  const primaryGillPositions = [];
  const primaryGillIndices = [];
  const primaryGillSegments = 14;
  for (let i = 0; i <= primaryGillSegments; i++) {
    const t = i / primaryGillSegments;
    const radius = 0.355 + (capRadius - 0.39) * t;
    const width = 0.009 + 0.044 * Math.pow(t, 0.82);
    const topY = 1.102 + 0.065 * Math.pow(radius / capRadius, 1.55);
    const thickness = 0.006 + 0.004 * t;
    const x = -width * 0.5;
    primaryGillPositions.push(
      x, topY - thickness, radius,
      x, topY, radius,
      width * 0.5, topY - thickness, radius
    );
  }
  for (let i = 0; i < primaryGillSegments; i++) {
    const a = i * 3;
    const b = a + 3;
    primaryGillIndices.push(
      a, b, a + 1,
      a + 1, b, b + 1,
      a + 1, b + 1, a + 2,
      a + 2, b + 1, b + 2
    );
  }
  const primaryGillGeom = new THREE.BufferGeometry();
  primaryGillGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(primaryGillPositions, 3)
  );
  primaryGillGeom.setIndex(primaryGillIndices);
  primaryGillGeom.computeVertexNormals();

  const primaryGillCount = 48;
  const primary_gills = new THREE.InstancedMesh(
    primaryGillGeom,
    gillMat,
    primaryGillCount
  );
  primary_gills.name = "primary_gills";
  const primaryGillDummy = new THREE.Object3D();
  for (let i = 0; i < primaryGillCount; i++) {
    primaryGillDummy.position.set(0, 0, 0);
    primaryGillDummy.rotation.set(
      0,
      i / primaryGillCount * Math.PI * 2,
      0
    );
    primaryGillDummy.scale.set(0.9 + 0.1 * ((i % 4) / 3), 1, 1);
    primaryGillDummy.updateMatrix();
    primary_gills.setMatrixAt(i, primaryGillDummy.matrix);
  }
  primary_gills.instanceMatrix.needsUpdate = true;
  cap_group.add(primary_gills);

  const secondaryGillPositions = [];
  const secondaryGillIndices = [];
  const secondaryGillSegments = 10;
  for (let i = 0; i <= secondaryGillSegments; i++) {
    const t = i / secondaryGillSegments;
    const radius = 0.49 + (capRadius - 0.48) * t;
    const width = 0.005 + 0.025 * Math.pow(t, 0.85);
    const topY = 1.102 + 0.065 * Math.pow(radius / capRadius, 1.55);
    const thickness = 0.003 + 0.002 * t;
    const x = -width * 0.5;
    secondaryGillPositions.push(
      x, topY - thickness, radius,
      x, topY, radius,
      width * 0.5, topY - thickness, radius
    );
  }
  for (let i = 0; i < secondaryGillSegments; i++) {
    const a = i * 3;
    const b = a + 3;
    secondaryGillIndices.push(
      a, b, a + 1,
      a + 1, b, b + 1,
      a + 1, b + 1, a + 2,
      a + 2, b + 1, b + 2
    );
  }
  const secondaryGillGeom = new THREE.BufferGeometry();
  secondaryGillGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(secondaryGillPositions, 3)
  );
  secondaryGillGeom.setIndex(secondaryGillIndices);
  secondaryGillGeom.computeVertexNormals();

  const secondaryGillCount = 48;
  const secondary_gills = new THREE.InstancedMesh(
    secondaryGillGeom,
    gillMat,
    secondaryGillCount
  );
  secondary_gills.name = "secondary_gills";
  const secondaryGillDummy = new THREE.Object3D();
  for (let i = 0; i < secondaryGillCount; i++) {
    secondaryGillDummy.position.set(0, 0, 0);
    secondaryGillDummy.rotation.set(
      0,
      (i + 0.5) / secondaryGillCount * Math.PI * 2,
      0
    );
    secondaryGillDummy.scale.set(0.92 + 0.06 * (i % 3), 1, 1);
    secondaryGillDummy.updateMatrix();
    secondary_gills.setMatrixAt(i, secondaryGillDummy.matrix);
  }
  secondary_gills.instanceMatrix.needsUpdate = true;
  cap_group.add(secondary_gills);

  const capMottleGeom = new THREE.CircleGeometry(1, 14);
  const capMottleCount = 18;
  const cap_mottling = new THREE.InstancedMesh(
    capMottleGeom,
    capMottleMat,
    capMottleCount
  );
  cap_mottling.name = "cap_mottling";
  const capMottleDummy = new THREE.Object3D();
  for (let i = 0; i < capMottleCount; i++) {
    const angle = i * 2.3999632297 + 0.35;
    const radius = 0.18 + 0.78 * ((i * 7) % 19) / 18;
    const pose = capSurfacePose(radius, angle, 0.006);
    capMottleDummy.position.copy(pose.position);
    capMottleDummy.quaternion.copy(pose.quaternion);
    capMottleDummy.rotateZ(i * 0.71);
    capMottleDummy.scale.set(
      0.025 + 0.025 * ((i * 5) % 7) / 6,
      0.012 + 0.022 * ((i * 3) % 5) / 4,
      1
    );
    capMottleDummy.updateMatrix();
    cap_mottling.setMatrixAt(i, capMottleDummy.matrix);
  }
  cap_mottling.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_mottling);

  const capFleckGeom = new THREE.CircleGeometry(1, 10);
  const capFleckCount = 14;
  const cap_flecks = new THREE.InstancedMesh(
    capFleckGeom,
    capFleckMat,
    capFleckCount
  );
  cap_flecks.name = "cap_flecks";
  const capFleckDummy = new THREE.Object3D();
  for (let i = 0; i < capFleckCount; i++) {
    const angle = i * 2.173 + 0.8;
    const radius = 0.2 + 0.76 * ((i * 11) % 17) / 16;
    const pose = capSurfacePose(radius, angle, 0.009);
    capFleckDummy.position.copy(pose.position);
    capFleckDummy.quaternion.copy(pose.quaternion);
    capFleckDummy.rotateZ(i * 0.47);
    capFleckDummy.scale.set(
      0.009 + 0.012 * (i % 4) / 3,
      0.006 + 0.009 * ((i * 3) % 5) / 4,
      1
    );
    capFleckDummy.updateMatrix();
    cap_flecks.setMatrixAt(i, capFleckDummy.matrix);
  }
  cap_flecks.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_flecks);

  const capSpeckGeom = new THREE.CircleGeometry(1, 8);
  const capSpeckCount = 22;
  const cap_specks = new THREE.InstancedMesh(
    capSpeckGeom,
    capSpeckMat,
    capSpeckCount
  );
  cap_specks.name = "cap_specks";
  const capSpeckDummy = new THREE.Object3D();
  for (let i = 0; i < capSpeckCount; i++) {
    const angle = i * 2.731 + 0.18;
    const radius = 0.16 + 0.84 * ((i * 13) % 23) / 22;
    const pose = capSurfacePose(radius, angle, 0.011);
    capSpeckDummy.position.copy(pose.position);
    capSpeckDummy.quaternion.copy(pose.quaternion);
    capSpeckDummy.rotateZ(i * 0.39);
    capSpeckDummy.scale.set(
      0.005 + 0.009 * (i % 5) / 4,
      0.004 + 0.006 * ((i * 2) % 5) / 4,
      1
    );
    capSpeckDummy.updateMatrix();
    cap_specks.setMatrixAt(i, capSpeckDummy.matrix);
  }
  cap_specks.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_specks);

  const stemProfile = [
    new THREE.Vector2(0, stemBottom),
    new THREE.Vector2(0.22, stemBottom)
  ];
  for (let i = 1; i <= 48; i++) {
    const t = i / 48;
    const y = stemBottom + (stemTop - stemBottom) * t;
    stemProfile.push(new THREE.Vector2(stemRadiusAt(y), y));
  }
  stemProfile.push(new THREE.Vector2(0, stemTop));

  const stemGeom = new THREE.LatheGeometry(stemProfile, 64);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.name = "stem";
  stem_group.add(stem);

  const stemGroovePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(stemRadiusAt(-0.54) + 0.003, -0.54, 0),
    new THREE.Vector3(stemRadiusAt(-0.12) + 0.003, -0.12, 0),
    new THREE.Vector3(stemRadiusAt(0.38) + 0.003, 0.38, 0),
    new THREE.Vector3(stemRadiusAt(1.08) + 0.003, 1.08, 0)
  ]);
  const stemGrooveGeom = new THREE.TubeGeometry(
    stemGroovePath,
    24,
    0.0032,
    5,
    false
  );
  const stemGrooveCount = 28;
  const stem_grooves = new THREE.InstancedMesh(
    stemGrooveGeom,
    stemGrooveMat,
    stemGrooveCount
  );
  stem_grooves.name = "stem_grooves";
  const stemGrooveDummy = new THREE.Object3D();
  for (let i = 0; i < stemGrooveCount; i++) {
    stemGrooveDummy.position.set(0, 0, 0);
    stemGrooveDummy.rotation.set(
      0,
      i / stemGrooveCount * Math.PI * 2,
      0
    );
    stemGrooveDummy.scale.set(1, 1, 1);
    stemGrooveDummy.updateMatrix();
    stem_grooves.setMatrixAt(i, stemGrooveDummy.matrix);
  }
  stem_grooves.instanceMatrix.needsUpdate = true;
  stem_group.add(stem_grooves);

  const stemSpotGeom = new THREE.CircleGeometry(1, 9);
  const stemSpotCount = 24;
  const stem_spots = new THREE.InstancedMesh(
    stemSpotGeom,
    dirtMat,
    stemSpotCount
  );
  stem_spots.name = "stem_spots";
  const stemSpotDummy = new THREE.Object3D();
  for (let i = 0; i < stemSpotCount; i++) {
    const y = -0.57 + 1.53 * ((i * 11) % 29) / 28;
    const angle = i * 2.267 + 0.25;
    const pose = stemSurfacePose(y, angle, 0.005);
    stemSpotDummy.position.copy(pose.position);
    stemSpotDummy.quaternion.copy(pose.quaternion);
    stemSpotDummy.rotateZ(i * 0.53);
    stemSpotDummy.scale.set(
      0.006 + 0.015 * ((i * 5) % 8) / 7,
      0.005 + 0.018 * ((i * 3) % 7) / 6,
      1
    );
    stemSpotDummy.updateMatrix();
    stem_spots.setMatrixAt(i, stemSpotDummy.matrix);
  }
  stem_spots.instanceMatrix.needsUpdate = true;
  stem_group.add(stem_spots);

  const stemScuffGeom = new THREE.CircleGeometry(1, 8);
  const stemScuffCount = 12;
  const stem_scuffs = new THREE.InstancedMesh(
    stemScuffGeom,
    dirtMat,
    stemScuffCount
  );
  stem_scuffs.name = "stem_scuffs";
  const stemScuffDummy = new THREE.Object3D();
  for (let i = 0; i < stemScuffCount; i++) {
    const y = -0.52 + 1.18 * ((i * 7) % 13) / 12;
    const angle = i * 2.071 + 0.6;
    const pose = stemSurfacePose(y, angle, 0.006);
    stemScuffDummy.position.copy(pose.position);
    stemScuffDummy.quaternion.copy(pose.quaternion);
    stemScuffDummy.rotateZ(i * 0.74);
    stemScuffDummy.scale.set(
      0.008 + 0.012 * (i % 4) / 3,
      0.025 + 0.035 * ((i * 3) % 5) / 4,
      1
    );
    stemScuffDummy.updateMatrix();
    stem_scuffs.setMatrixAt(i, stemScuffDummy.matrix);
  }
  stem_scuffs.instanceMatrix.needsUpdate = true;
  stem_group.add(stem_scuffs);

  const baseDirtGeom = new THREE.DodecahedronGeometry(1, 0);
  const baseDirtCount = 32;
  const base_dirt = new THREE.InstancedMesh(
    baseDirtGeom,
    dirtMat,
    baseDirtCount
  );
  base_dirt.name = "base_dirt";
  const baseDirtDummy = new THREE.Object3D();
  for (let i = 0; i < baseDirtCount; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.255 + 0.105 * ((i * 7) % 11) / 10;
    const y = -0.635 + 0.245 * ((i * 5) % 13) / 12;
    const size = 0.012 + 0.026 * ((i * 3) % 9) / 8;
    baseDirtDummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    baseDirtDummy.rotation.set(i * 0.41, angle, i * 0.29);
    baseDirtDummy.scale.set(
      size,
      size * (0.55 + 0.55 * (i % 4) / 3),
      size * (0.7 + 0.4 * ((i * 2) % 5) / 4)
    );
    baseDirtDummy.updateMatrix();
    base_dirt.setMatrixAt(i, baseDirtDummy.matrix);
  }
  base_dirt.instanceMatrix.needsUpdate = true;
  stem_group.add(base_dirt);

  const baseCrustGeom = new THREE.TorusGeometry(0.285, 0.028, 7, 48);
  const base_crust = new THREE.Mesh(baseCrustGeom, dirtMat);
  base_crust.name = "base_crust";
  base_crust.rotation.x = Math.PI / 2;
  base_crust.position.y = -0.645;
  stem_group.add(base_crust);

  const rootSoleGeom = new THREE.CylinderGeometry(
    0.31,
    0.34,
    0.045,
    24
  );
  const root_sole = new THREE.Mesh(rootSoleGeom, dirtMat);
  root_sole.name = "root_sole";
  root_sole.position.y = -0.682;
  stem_group.add(root_sole);

  const soilClumpGeom = new THREE.DodecahedronGeometry(1, 0);
  const soilClumpCount = 24;
  const soil_clumps = new THREE.InstancedMesh(
    soilClumpGeom,
    soilMat,
    soilClumpCount
  );
  soil_clumps.name = "soil_clumps";
  const soilClumpDummy = new THREE.Object3D();
  for (let i = 0; i < soilClumpCount; i++) {
    const angle = i * 2.3999632297 + 0.2;
    const radius = 0.24 + 0.13 * ((i * 5) % 13) / 12;
    const size = 0.018 + 0.035 * ((i * 7) % 9) / 8;
    soilClumpDummy.position.set(
      Math.cos(angle) * radius,
      -0.694 + 0.018 * (i % 3),
      Math.sin(angle) * radius
    );
    soilClumpDummy.rotation.set(i * 0.33, angle, i * 0.51);
    soilClumpDummy.scale.set(
      size,
      size * (0.45 + 0.35 * (i % 4) / 3),
      size * (0.7 + 0.3 * ((i * 3) % 5) / 4)
    );
    soilClumpDummy.updateMatrix();
    soil_clumps.setMatrixAt(i, soilClumpDummy.matrix);
  }
  soil_clumps.instanceMatrix.needsUpdate = true;
  stem_group.add(soil_clumps);

  const rootFragmentPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.25, -0.62, 0),
    new THREE.Vector3(0.31, -0.65, 0.015),
    new THREE.Vector3(0.37, -0.69, 0.04),
    new THREE.Vector3(0.43, -0.68, 0.075)
  ]);
  const rootFragmentGeom = new THREE.TubeGeometry(
    rootFragmentPath,
    12,
    0.008,
    5,
    false
  );
  const rootFragmentCount = 9;
  const root_fragments = new THREE.InstancedMesh(
    rootFragmentGeom,
    dirtMat,
    rootFragmentCount
  );
  root_fragments.name = "root_fragments";
  const rootFragmentDummy = new THREE.Object3D();
  for (let i = 0; i < rootFragmentCount; i++) {
    rootFragmentDummy.position.set(0, 0, 0);
    rootFragmentDummy.rotation.set(
      0,
      i / rootFragmentCount * Math.PI * 2 + 0.17,
      0
    );
    rootFragmentDummy.scale.set(
      0.82 + 0.23 * (i % 4) / 3,
      0.8 + 0.18 * ((i * 3) % 5) / 4,
      0.8 + 0.2 * (i % 3)
    );
    rootFragmentDummy.updateMatrix();
    root_fragments.setMatrixAt(i, rootFragmentDummy.matrix);
  }
  root_fragments.instanceMatrix.needsUpdate = true;
  stem_group.add(root_fragments);

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