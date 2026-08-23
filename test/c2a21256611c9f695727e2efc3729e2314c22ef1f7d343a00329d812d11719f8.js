export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "dandelion_clock_cloche";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const cloche_group = new THREE.Group();
  cloche_group.name = "cloche_group";
  const plant_group = new THREE.Group();
  plant_group.name = "plant_group";
  const clock_group = new THREE.Group();
  clock_group.name = "clock_group";
  root.add(base_group, cloche_group, plant_group, clock_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7b3f21,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4a2415,
    metalness: 0.0,
    roughness: 0.6
  });
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x2b2117,
    metalness: 0.0,
    roughness: 0.9
  });
  const pebbleMat = new THREE.MeshStandardMaterial({
    color: 0x6c5739,
    metalness: 0.0,
    roughness: 0.9
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x526b28,
    metalness: 0.0,
    roughness: 0.8
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x405b24,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const sepalMat = new THREE.MeshStandardMaterial({
    color: 0x344b20,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide
  });
  const outerPetalMat = new THREE.MeshStandardMaterial({
    color: 0xf2bd05,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const innerPetalMat = new THREE.MeshStandardMaterial({
    color: 0xffd21a,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const flowerCenterMat = new THREE.MeshStandardMaterial({
    color: 0xe99a00,
    metalness: 0.0,
    roughness: 0.7
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a3e,
    metalness: 0.6,
    roughness: 0.2
  });
  const lightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd1ad59,
    metalness: 0.6,
    roughness: 0.2
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x76531f,
    metalness: 0.6,
    roughness: 0.2
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeed,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    thickness: 0.02,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glassEdgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8d9d6,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    thickness: 0.035,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const wooden_baseProfile = [
    new THREE.Vector2(0.00, 0.000),
    new THREE.Vector2(0.40, 0.000),
    new THREE.Vector2(0.455, 0.010),
    new THREE.Vector2(0.485, 0.035),
    new THREE.Vector2(0.500, 0.075),
    new THREE.Vector2(0.495, 0.105),
    new THREE.Vector2(0.475, 0.135),
    new THREE.Vector2(0.440, 0.155),
    new THREE.Vector2(0.00, 0.155)
  ];
  const wooden_baseGeom = new THREE.LatheGeometry(wooden_baseProfile, 64);
  const wooden_base = new THREE.Mesh(wooden_baseGeom, woodMat);
  wooden_base.name = "wooden_base";
  base_group.add(wooden_base);

  const base_lower_trimGeom = new THREE.TorusGeometry(0.466, 0.007, 8, 64);
  const base_lower_trim = new THREE.Mesh(base_lower_trimGeom, darkWoodMat);
  base_lower_trim.name = "base_lower_trim";
  base_lower_trim.rotation.x = Math.PI / 2;
  base_lower_trim.position.y = 0.014;
  base_group.add(base_lower_trim);

  const base_upper_trimGeom = new THREE.TorusGeometry(0.452, 0.008, 8, 64);
  const base_upper_trim = new THREE.Mesh(base_upper_trimGeom, darkWoodMat);
  base_upper_trim.name = "base_upper_trim";
  base_upper_trim.rotation.x = Math.PI / 2;
  base_upper_trim.position.y = 0.143;
  base_group.add(base_upper_trim);

  const soil_bedGeom = new THREE.CylinderGeometry(0.395, 0.395, 0.026, 64);
  const soil_bed = new THREE.Mesh(soil_bedGeom, soilMat);
  soil_bed.name = "soil_bed";
  soil_bed.position.y = 0.174;
  base_group.add(soil_bed);

  const soil_pebblesGeom = new THREE.DodecahedronGeometry(0.012, 0);
  const soil_pebbles = new THREE.InstancedMesh(soil_pebblesGeom, pebbleMat, 30);
  soil_pebbles.name = "soil_pebbles";
  for (let i = 0; i < 30; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.055 + 0.315 * (((i * 17) % 31) / 31);
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      0.190 + 0.003 * (i % 3),
      Math.sin(angle) * radius
    );
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(i * 0.31, i * 0.47, i * 0.19)
    );
    const scale = new THREE.Vector3(
      0.75 + 0.12 * (i % 4),
      0.35 + 0.08 * (i % 3),
      0.80 + 0.10 * ((i + 1) % 4)
    );
    soil_pebbles.setMatrixAt(
      i,
      new THREE.Matrix4().compose(position, quaternion, scale)
    );
  }
  soil_pebbles.instanceMatrix.needsUpdate = true;
  base_group.add(soil_pebbles);

  const glass_domeProfile = [
    new THREE.Vector2(0.410, 0.160),
    new THREE.Vector2(0.410, 1.055),
    new THREE.Vector2(0.405, 1.105),
    new THREE.Vector2(0.390, 1.160),
    new THREE.Vector2(0.360, 1.220),
    new THREE.Vector2(0.315, 1.280),
    new THREE.Vector2(0.255, 1.330),
    new THREE.Vector2(0.180, 1.370),
    new THREE.Vector2(0.095, 1.397),
    new THREE.Vector2(0.000, 1.405)
  ];
  const glass_domeGeom = new THREE.LatheGeometry(glass_domeProfile, 64);
  const glass_dome = new THREE.Mesh(glass_domeGeom, glassMat);
  glass_dome.name = "glass_dome";
  glass_dome.renderOrder = 4;
  cloche_group.add(glass_dome);

  const glass_bottom_rimGeom = new THREE.TorusGeometry(0.407, 0.010, 10, 64);
  const glass_bottom_rim = new THREE.Mesh(glass_bottom_rimGeom, glassEdgeMat);
  glass_bottom_rim.name = "glass_bottom_rim";
  glass_bottom_rim.rotation.x = Math.PI / 2;
  glass_bottom_rim.position.y = 0.164;
  glass_bottom_rim.renderOrder = 5;
  cloche_group.add(glass_bottom_rim);

  const glass_top_rimGeom = new THREE.TorusGeometry(0.076, 0.006, 8, 48);
  const glass_top_rim = new THREE.Mesh(glass_top_rimGeom, glassEdgeMat);
  glass_top_rim.name = "glass_top_rim";
  glass_top_rim.rotation.x = Math.PI / 2;
  glass_top_rim.position.y = 1.399;
  glass_top_rim.renderOrder = 5;
  cloche_group.add(glass_top_rim);

  const flowerData = [
    { p: new THREE.Vector3(-0.18, 0.98, 0.02), n: new THREE.Vector3(-0.12, 0.35, 0.93), s: 0.105 },
    { p: new THREE.Vector3( 0.02, 1.01, 0.08), n: new THREE.Vector3( 0.00, 0.30, 0.95), s: 0.112 },
    { p: new THREE.Vector3( 0.22, 0.96, 0.03), n: new THREE.Vector3( 0.18, 0.38, 0.91), s: 0.105 },
    { p: new THREE.Vector3(-0.29, 0.86, 0.08), n: new THREE.Vector3(-0.30, 0.28, 0.91), s: 0.090 },
    { p: new THREE.Vector3( 0.29, 0.86, 0.08), n: new THREE.Vector3( 0.30, 0.30, 0.91), s: 0.090 },
    { p: new THREE.Vector3(-0.10, 0.85, 0.18), n: new THREE.Vector3(-0.08, 0.18, 0.98), s: 0.100 },
    { p: new THREE.Vector3( 0.12, 0.82, 0.18), n: new THREE.Vector3( 0.10, 0.20, 0.97), s: 0.095 },
    { p: new THREE.Vector3(-0.27, 0.72, 0.16), n: new THREE.Vector3(-0.24, 0.15, 0.96), s: 0.095 },
    { p: new THREE.Vector3( 0.00, 0.72, 0.22), n: new THREE.Vector3( 0.00, 0.12, 0.99), s: 0.085 },
    { p: new THREE.Vector3( 0.27, 0.70, 0.16), n: new THREE.Vector3( 0.25, 0.16, 0.96), s: 0.095 },
    { p: new THREE.Vector3(-0.18, 0.60, 0.22), n: new THREE.Vector3(-0.12, 0.10, 0.99), s: 0.105 },
    { p: new THREE.Vector3( 0.16, 0.59, 0.21), n: new THREE.Vector3( 0.12, 0.12, 0.99), s: 0.100 },
    { p: new THREE.Vector3(-0.29, 0.52, 0.10), n: new THREE.Vector3(-0.32, 0.10, 0.94), s: 0.080 },
    { p: new THREE.Vector3( 0.29, 0.53, 0.10), n: new THREE.Vector3( 0.32, 0.12, 0.94), s: 0.082 },
    { p: new THREE.Vector3(-0.13, 0.43, 0.20), n: new THREE.Vector3(-0.10, 0.08, 0.99), s: 0.095 },
    { p: new THREE.Vector3( 0.13, 0.42, 0.20), n: new THREE.Vector3( 0.10, 0.08, 0.99), s: 0.100 },
    { p: new THREE.Vector3( 0.00, 0.34, 0.15), n: new THREE.Vector3( 0.00, 0.10, 0.99), s: 0.080 },
    { p: new THREE.Vector3(-0.25, 0.90, -0.14), n: new THREE.Vector3(-0.30, 0.22, -0.92), s: 0.080 },
    { p: new THREE.Vector3( 0.25, 0.88, -0.14), n: new THREE.Vector3( 0.30, 0.24, -0.92), s: 0.080 },
    { p: new THREE.Vector3(-0.22, 0.66, -0.15), n: new THREE.Vector3(-0.30, 0.12, -0.95), s: 0.075 },
    { p: new THREE.Vector3( 0.22, 0.64, -0.15), n: new THREE.Vector3( 0.30, 0.14, -0.95), s: 0.078 }
  ];

  const flower_stems = new THREE.Group();
  flower_stems.name = "flower_stems";
  for (let i = 0; i < flowerData.length; i++) {
    const data = flowerData[i];
    const normal = data.n.clone().normalize();
    const start = new THREE.Vector3(
      -0.27 + 0.54 * (((i * 7) % flowerData.length) / (flowerData.length - 1)),
      0.184,
      -0.12 + 0.28 * (((i * 11) % flowerData.length) / (flowerData.length - 1))
    );
    const end = data.p.clone().addScaledVector(normal, -data.s * 0.18);
    const middle = new THREE.Vector3(
      start.x * 0.52 + data.p.x * 0.48 + (i % 2 === 0 ? -0.018 : 0.018),
      start.y + (end.y - start.y) * 0.54,
      start.z * 0.58 + data.p.z * 0.40
    );
    const stemCurve = new THREE.CatmullRomCurve3([start, middle, end]);
    const stemGeom = new THREE.TubeGeometry(stemCurve, 14, 0.0065, 6, false);
    const stem = new THREE.Mesh(stemGeom, stemMat);
    stem.name = "flower_stem_" + i;
    flower_stems.add(stem);
  }
  plant_group.add(flower_stems);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  const leafSegments = 12;
  for (let i = 1; i <= leafSegments; i++) {
    const t = i / leafSegments;
    const width = 0.085 * Math.sin(Math.PI * t) * (0.80 + 0.18 * t);
    const tooth = i % 2 === 0 ? 1.0 : 0.55;
    leafShape.lineTo(-width * tooth, t);
  }
  for (let i = leafSegments - 1; i >= 0; i--) {
    const t = i / leafSegments;
    const width = 0.085 * Math.sin(Math.PI * t) * (0.80 + 0.18 * t);
    const tooth = i % 2 === 0 ? 1.0 : 0.55;
    leafShape.lineTo(width * tooth, t);
  }
  leafShape.closePath();

  const foliage_leavesGeom = new THREE.ShapeGeometry(leafShape);
  const leafCount = 24;
  const foliage_leaves = new THREE.InstancedMesh(
    foliage_leavesGeom,
    leafMat,
    leafCount
  );
  foliage_leaves.name = "foliage_leaves";
  for (let i = 0; i < leafCount; i++) {
    const angle = 0.35 + i / leafCount * Math.PI * 2;
    const baseRadius = 0.035 + 0.22 * (((i * 7) % 13) / 13);
    const position = new THREE.Vector3(
      Math.cos(angle) * baseRadius,
      0.178 + 0.012 * (i % 3),
      Math.sin(angle) * baseRadius
    );
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        0.08 * Math.sin(i * 1.7),
        Math.PI / 2 - angle,
        -0.24 + 0.10 * (i % 5)
      )
    );
    const scale = new THREE.Vector3(
      0.78 + 0.08 * (i % 4),
      0.28 + 0.035 * ((i * 5) % 7),
      1
    );
    foliage_leaves.setMatrixAt(
      i,
      new THREE.Matrix4().compose(position, quaternion, scale)
    );
  }
  foliage_leaves.instanceMatrix.needsUpdate = true;
  plant_group.add(foliage_leaves);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(-0.018, 0);
  petalShape.lineTo(-0.045, 0.55);
  petalShape.lineTo(-0.035, 0.88);
  petalShape.lineTo(0, 1);
  petalShape.lineTo(0.035, 0.88);
  petalShape.lineTo(0.045, 0.55);
  petalShape.lineTo(0.018, 0);
  petalShape.closePath();

  const petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: false
  });
  petalGeom.translate(0, 0, -0.004);

  const outerPetalsPerFlower = 28;
  const innerPetalsPerFlower = 18;
  const outer_flower_petals = new THREE.InstancedMesh(
    petalGeom,
    outerPetalMat,
    flowerData.length * outerPetalsPerFlower
  );
  outer_flower_petals.name = "outer_flower_petals";
  const inner_flower_petals = new THREE.InstancedMesh(
    petalGeom,
    innerPetalMat,
    flowerData.length * innerPetalsPerFlower
  );
  inner_flower_petals.name = "inner_flower_petals";

  const flower_centersGeom = new THREE.SphereGeometry(1, 16, 10);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flowerCenterMat,
    flowerData.length
  );
  flower_centers.name = "flower_centers";

  const flower_sepals = new THREE.InstancedMesh(
    petalGeom,
    sepalMat,
    flowerData.length * 8
  );
  flower_sepals.name = "flower_sepals";

  const localZ = new THREE.Vector3(0, 0, 1);
  let outerIndex = 0;
  let innerIndex = 0;
  let sepalIndex = 0;

  for (let fi = 0; fi < flowerData.length; fi++) {
    const data = flowerData[fi];
    const normal = data.n.clone().normalize();
    const faceQuaternion = new THREE.Quaternion().setFromUnitVectors(localZ, normal);
    const centerPosition = data.p.clone().addScaledVector(normal, 0.006);

    const centerMatrix = new THREE.Matrix4().compose(
      centerPosition,
      faceQuaternion,
      new THREE.Vector3(data.s * 0.29, data.s * 0.29, data.s * 0.13)
    );
    flower_centers.setMatrixAt(fi, centerMatrix);

    for (let k = 0; k < 8; k++) {
      const angle = k / 8 * Math.PI * 2 + fi * 0.09;
      const spin = new THREE.Quaternion().setFromAxisAngle(localZ, angle);
      const quaternion = faceQuaternion.clone().multiply(spin);
      const position = data.p.clone().addScaledVector(normal, -0.006);
      const scale = new THREE.Vector3(
        data.s * 0.58,
        data.s * (0.40 + 0.025 * (k % 3)),
        0.8
      );
      flower_sepals.setMatrixAt(
        sepalIndex++,
        new THREE.Matrix4().compose(position, quaternion, scale)
      );
    }

    for (let k = 0; k < outerPetalsPerFlower; k++) {
      const angle = k / outerPetalsPerFlower * Math.PI * 2 + fi * 0.071;
      const spin = new THREE.Quaternion().setFromAxisAngle(localZ, angle);
      const quaternion = faceQuaternion.clone().multiply(spin);
      const position = data.p.clone().addScaledVector(normal, 0.001);
      const lengthFactor = 0.82 + 0.025 * ((k * 5 + fi * 3) % 5);
      const scale = new THREE.Vector3(
        data.s * 0.92,
        data.s * lengthFactor,
        0.8
      );
      outer_flower_petals.setMatrixAt(
        outerIndex++,
        new THREE.Matrix4().compose(position, quaternion, scale)
      );
    }

    for (let k = 0; k < innerPetalsPerFlower; k++) {
      const angle = k / innerPetalsPerFlower * Math.PI * 2 + fi * 0.113 + 0.08;
      const spin = new THREE.Quaternion().setFromAxisAngle(localZ, angle);
      const quaternion = faceQuaternion.clone().multiply(spin);
      const position = data.p.clone().addScaledVector(normal, 0.005);
      const lengthFactor = 0.50 + 0.025 * ((k * 3 + fi) % 5);
      const scale = new THREE.Vector3(
        data.s * 0.78,
        data.s * lengthFactor,
        0.75
      );
      inner_flower_petals.setMatrixAt(
        innerIndex++,
        new THREE.Matrix4().compose(position, quaternion, scale)
      );
    }
  }

  outer_flower_petals.instanceMatrix.needsUpdate = true;
  inner_flower_petals.instanceMatrix.needsUpdate = true;
  flower_centers.instanceMatrix.needsUpdate = true;
  flower_sepals.instanceMatrix.needsUpdate = true;
  plant_group.add(flower_sepals, outer_flower_petals, inner_flower_petals, flower_centers);

  const clockX = 0;
  const clockY = 0.72;

  function createHandGeometry(length, width) {
    const handShape = new THREE.Shape();
    handShape.moveTo(-width * 0.55, -0.035);
    handShape.lineTo(-width * 0.48, 0.045);
    handShape.lineTo(-width * 0.20, length * 0.80);
    handShape.lineTo(0, length);
    handShape.lineTo(width * 0.20, length * 0.80);
    handShape.lineTo(width * 0.48, 0.045);
    handShape.lineTo(width * 0.55, -0.035);
    handShape.lineTo(-width * 0.55, -0.035);
    return new THREE.ExtrudeGeometry(handShape, {
      depth: 0.010,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.0015,
      bevelSegments: 2
    });
  }

  const clock_hand_upper_leftGeom = createHandGeometry(0.285, 0.034);
  const clock_hand_upper_left = new THREE.Mesh(clock_hand_upper_leftGeom, brassMat);
  clock_hand_upper_left.name = "clock_hand_upper_left";
  clock_hand_upper_left.position.set(clockX, clockY, 0.300);
  clock_hand_upper_left.rotation.z = 0.76;
  clock_group.add(clock_hand_upper_left);

  const clock_hand_upper_rightGeom = createHandGeometry(0.275, 0.027);
  const clock_hand_upper_right = new THREE.Mesh(clock_hand_upper_rightGeom, lightBrassMat);
  clock_hand_upper_right.name = "clock_hand_upper_right";
  clock_hand_upper_right.position.set(clockX, clockY, 0.304);
  clock_hand_upper_right.rotation.z = -0.88;
  clock_group.add(clock_hand_upper_right);

  const clock_hand_lower_rightGeom = createHandGeometry(0.295, 0.038);
  const clock_hand_lower_right = new THREE.Mesh(clock_hand_lower_rightGeom, brassMat);
  clock_hand_lower_right.name = "clock_hand_lower_right";
  clock_hand_lower_right.position.set(clockX, clockY, 0.308);
  clock_hand_lower_right.rotation.z = -2.39;
  clock_group.add(clock_hand_lower_right);

  const clock_hand_lower_leftGeom = createHandGeometry(0.225, 0.014);
  const clock_hand_lower_left = new THREE.Mesh(clock_hand_lower_leftGeom, lightBrassMat);
  clock_hand_lower_left.name = "clock_hand_lower_left";
  clock_hand_lower_left.position.set(clockX, clockY, 0.312);
  clock_hand_lower_left.rotation.z = 2.47;
  clock_group.add(clock_hand_lower_left);

  const clock_hub_backGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.014, 32);
  const clock_hub_back = new THREE.Mesh(clock_hub_backGeom, darkBrassMat);
  clock_hub_back.name = "clock_hub_back";
  clock_hub_back.rotation.x = Math.PI / 2;
  clock_hub_back.position.set(clockX, clockY, 0.320);
  clock_group.add(clock_hub_back);

  const clock_hub_ringGeom = new THREE.TorusGeometry(0.040, 0.008, 10, 32);
  const clock_hub_ring = new THREE.Mesh(clock_hub_ringGeom, lightBrassMat);
  clock_hub_ring.name = "clock_hub_ring";
  clock_hub_ring.position.set(clockX, clockY, 0.330);
  clock_group.add(clock_hub_ring);

  const clock_hub_innerGeom = new THREE.CylinderGeometry(0.029, 0.029, 0.014, 32);
  const clock_hub_inner = new THREE.Mesh(clock_hub_innerGeom, brassMat);
  clock_hub_inner.name = "clock_hub_inner";
  clock_hub_inner.rotation.x = Math.PI / 2;
  clock_hub_inner.position.set(clockX, clockY, 0.333);
  clock_group.add(clock_hub_inner);

  const clock_hub_capGeom = new THREE.SphereGeometry(0.018, 20, 12);
  const clock_hub_cap = new THREE.Mesh(clock_hub_capGeom, lightBrassMat);
  clock_hub_cap.name = "clock_hub_cap";
  clock_hub_cap.scale.set(1, 1, 0.55);
  clock_hub_cap.position.set(clockX, clockY, 0.345);
  clock_group.add(clock_hub_cap);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}