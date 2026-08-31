export default function generate(THREE) {
  const root = new THREE.Group();
  const stem_group = new THREE.Group();
  const flower_group = new THREE.Group();
  root.add(stem_group, flower_group);

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x4f782f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const stemHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x78975a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const receptacleMat = new THREE.MeshStandardMaterial({
    color: 0x718d38,
    metalness: 0.0,
    roughness: 0.8,
  });
  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xf2f0df,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const petalVeinMat = new THREE.MeshStandardMaterial({
    color: 0xe1dfc8,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const petalBaseMat = new THREE.MeshStandardMaterial({
    color: 0xf0e7a2,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
  });
  const trumpetMat = new THREE.MeshStandardMaterial({
    color: 0xf2dfa0,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const trumpetInnerMat = new THREE.MeshStandardMaterial({
    color: 0xe3cd72,
    metalness: 0.0,
    roughness: 0.75,
    side: THREE.DoubleSide,
  });
  const trumpetRimMat = new THREE.MeshStandardMaterial({
    color: 0xf7e7ad,
    metalness: 0.0,
    roughness: 0.7,
  });
  const throatMat = new THREE.MeshStandardMaterial({
    color: 0xd8c15d,
    metalness: 0.0,
    roughness: 0.75,
    side: THREE.DoubleSide,
  });
  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xeadb9c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const antherMat = new THREE.MeshStandardMaterial({
    color: 0xc9a75d,
    metalness: 0.0,
    roughness: 0.75,
  });
  const pistilMat = new THREE.MeshStandardMaterial({
    color: 0xb7c66c,
    metalness: 0.0,
    roughness: 0.8,
  });

  function petalPoint(t, s, offset) {
    const sine = Math.sin(Math.PI * t);
    const halfWidth =
      0.018 +
      0.205 * Math.pow(Math.max(0, sine), 0.72) * (1 - 0.18 * t);
    const x = s * halfWidth;
    const y = 0.75 * t - 0.018 * Math.pow(Math.abs(s), 3) * sine;
    const z =
      0.030 * sine * (1 - 0.82 * s * s) -
      0.045 * t * t +
      offset;
    return new THREE.Vector3(x, y, z);
  }

  function createPetalGeometry() {
    const lengthSegments = 18;
    const widthSegments = 8;
    const vertices = [];
    const indices = [];

    for (let i = 0; i <= lengthSegments; i++) {
      const t = i / lengthSegments;
      for (let j = 0; j <= widthSegments; j++) {
        const s = -1 + (2 * j) / widthSegments;
        const p = petalPoint(t, s, 0);
        vertices.push(p.x, p.y, p.z);
      }
    }

    for (let i = 0; i < lengthSegments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * (widthSegments + 1) + j;
        const b = a + 1;
        const c = a + widthSegments + 1;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPetalVeinGeometry() {
    const segments = 14;
    const vertices = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = 0.10 + (0.80 * i) / segments;
      const ridgeWidth = 0.0045 + 0.002 * Math.sin(Math.PI * t);
      const left = petalPoint(t, -ridgeWidth / 0.205, 0.004);
      const right = petalPoint(t, ridgeWidth / 0.205, 0.004);
      vertices.push(left.x, left.y, left.z, right.x, right.y, right.z);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPetalBaseGeometry() {
    const segments = 8;
    const vertices = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = 0.025 + (0.34 * i) / segments;
      const fade = Math.sin((Math.PI * i) / segments);
      const halfWidth = 0.010 + 0.050 * fade;
      const left = petalPoint(t, -halfWidth / 0.205, 0.006);
      const right = petalPoint(t, halfWidth / 0.205, 0.006);
      vertices.push(left.x, left.y, left.z, right.x, right.y, right.z);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const stemPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.015, -1.12, -0.16),
      new THREE.Vector3(-0.035, -0.72, -0.15),
      new THREE.Vector3(-0.065, -0.28, -0.13),
      new THREE.Vector3(-0.045, 0.10, -0.11),
      new THREE.Vector3(0.0, 0.43, -0.09),
    ],
    false,
    "centripetal"
  );
  const stemGeom = new THREE.TubeGeometry(stemPath, 40, 0.048, 10, false);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem_group.add(stem);

  const stemHighlightPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.004, -1.11, -0.116),
      new THREE.Vector3(-0.046, -0.71, -0.106),
      new THREE.Vector3(-0.076, -0.27, -0.086),
      new THREE.Vector3(-0.056, 0.10, -0.066),
      new THREE.Vector3(-0.010, 0.41, -0.046),
    ],
    false,
    "centripetal"
  );
  const stemHighlightGeom = new THREE.TubeGeometry(
    stemHighlightPath,
    36,
    0.006,
    6,
    false
  );
  const stem_highlight = new THREE.Mesh(
    stemHighlightGeom,
    stemHighlightMat
  );
  stem_group.add(stem_highlight);

  const flower_neckGeom = new THREE.SphereGeometry(0.075, 16, 10);
  const flower_neck = new THREE.Mesh(flower_neckGeom, receptacleMat);
  flower_neck.scale.set(0.72, 1.0, 0.72);
  flower_neck.position.set(0, 0.425, -0.09);
  stem_group.add(flower_neck);

  flower_group.position.set(0, 0.45, 0);
  flower_group.rotation.set(-0.10, 0.03, -0.18);

  const receptacleGeom = new THREE.SphereGeometry(0.16, 20, 12);
  const receptacle = new THREE.Mesh(receptacleGeom, receptacleMat);
  receptacle.scale.set(1.0, 0.9, 0.65);
  receptacle.position.set(0, 0, -0.075);
  flower_group.add(receptacle);

  const petalGeom = createPetalGeometry();
  const petals = new THREE.InstancedMesh(petalGeom, petalMat, 6);
  const petal_dummy = new THREE.Object3D();
  const petalAngles = [0.04, 1.00, 2.04, 3.12, 4.18, 5.25];
  const petalWidths = [1.00, 1.05, 0.98, 1.02, 1.08, 0.97];
  const petalLengths = [1.06, 1.00, 1.03, 0.98, 1.02, 0.97];
  const petalTilts = [0.04, -0.08, 0.06, -0.05, 0.08, -0.06];
  const petalDepths = [-0.025, -0.045, -0.018, -0.035, -0.050, -0.020];

  for (let i = 0; i < 6; i++) {
    petal_dummy.position.set(0, 0, petalDepths[i]);
    petal_dummy.rotation.set(0, 0, petalAngles[i]);
    petal_dummy.rotateX(petalTilts[i]);
    petal_dummy.scale.set(petalWidths[i], petalLengths[i], 1);
    petal_dummy.updateMatrix();
    petals.setMatrixAt(i, petal_dummy.matrix);
  }
  petals.instanceMatrix.needsUpdate = true;
  flower_group.add(petals);

  const petalVeinGeom = createPetalVeinGeometry();
  const petal_veins = new THREE.InstancedMesh(
    petalVeinGeom,
    petalVeinMat,
    6
  );
  for (let i = 0; i < 6; i++) {
    petal_dummy.position.set(0, 0, petalDepths[i] + 0.001);
    petal_dummy.rotation.set(0, 0, petalAngles[i]);
    petal_dummy.rotateX(petalTilts[i]);
    petal_dummy.scale.set(petalWidths[i], petalLengths[i], 1);
    petal_dummy.updateMatrix();
    petal_veins.setMatrixAt(i, petal_dummy.matrix);
  }
  petal_veins.instanceMatrix.needsUpdate = true;
  flower_group.add(petal_veins);

  const petalBaseGeom = createPetalBaseGeometry();
  const petal_base_tints = new THREE.InstancedMesh(
    petalBaseGeom,
    petalBaseMat,
    6
  );
  for (let i = 0; i < 6; i++) {
    petal_dummy.position.set(0, 0, petalDepths[i] + 0.002);
    petal_dummy.rotation.set(0, 0, petalAngles[i]);
    petal_dummy.rotateX(petalTilts[i]);
    petal_dummy.scale.set(petalWidths[i], petalLengths[i], 1);
    petal_dummy.updateMatrix();
    petal_base_tints.setMatrixAt(i, petal_dummy.matrix);
  }
  petal_base_tints.instanceMatrix.needsUpdate = true;
  flower_group.add(petal_base_tints);

  const trumpet_group = new THREE.Group();
  trumpet_group.position.set(-0.018, -0.018, 0.075);
  trumpet_group.rotation.set(-0.035, 0.025, -0.045);
  flower_group.add(trumpet_group);

  const trumpetProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.105, 0.000),
    new THREE.Vector2(0.112, 0.055),
    new THREE.Vector2(0.142, 0.135),
    new THREE.Vector2(0.195, 0.245),
    new THREE.Vector2(0.270, 0.340),
    new THREE.Vector2(0.326, 0.405),
  ]).getSpacedPoints(32);
  const trumpetGeom = new THREE.LatheGeometry(trumpetProfile, 48);
  const trumpet = new THREE.Mesh(trumpetGeom, trumpetMat);
  trumpet.rotation.x = Math.PI / 2;
  trumpet_group.add(trumpet);

  const trumpetInnerProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.073, 0.035),
    new THREE.Vector2(0.086, 0.090),
    new THREE.Vector2(0.120, 0.165),
    new THREE.Vector2(0.174, 0.255),
    new THREE.Vector2(0.238, 0.340),
    new THREE.Vector2(0.292, 0.397),
  ]).getSpacedPoints(28);
  const trumpetInnerGeom = new THREE.LatheGeometry(
    trumpetInnerProfile,
    48
  );
  const trumpet_inner = new THREE.Mesh(
    trumpetInnerGeom,
    trumpetInnerMat
  );
  trumpet_inner.rotation.x = Math.PI / 2;
  trumpet_group.add(trumpet_inner);

  const trumpet_throatGeom = new THREE.CircleGeometry(0.078, 32);
  const trumpet_throat = new THREE.Mesh(trumpet_throatGeom, throatMat);
  trumpet_throat.position.z = 0.045;
  trumpet_group.add(trumpet_throat);

  const trumpetLobeGeom = new THREE.SphereGeometry(1, 14, 8);
  const trumpet_lobes = new THREE.InstancedMesh(
    trumpetLobeGeom,
    trumpetMat,
    12
  );
  const lobe_dummy = new THREE.Object3D();

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 0.316 + 0.006 * Math.sin(angle * 6);
    lobe_dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.407 + 0.006 * Math.cos(angle * 12)
    );
    lobe_dummy.rotation.set(0, 0, angle);
    lobe_dummy.scale.set(0.064, 0.031, 0.015);
    lobe_dummy.updateMatrix();
    trumpet_lobes.setMatrixAt(i, lobe_dummy.matrix);
  }
  trumpet_lobes.instanceMatrix.needsUpdate = true;
  trumpet_group.add(trumpet_lobes);

  const trumpetRimPoints = [];
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2;
    const radius =
      0.326 +
      0.014 * Math.sin(angle * 12) +
      0.005 * Math.sin(angle * 6);
    trumpetRimPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.414 + 0.010 * Math.cos(angle * 12)
      )
    );
  }
  const trumpetRimCurve = new THREE.CatmullRomCurve3(
    trumpetRimPoints,
    true,
    "centripetal"
  );
  const trumpetRimGeom = new THREE.TubeGeometry(
    trumpetRimCurve,
    96,
    0.012,
    7,
    true
  );
  const trumpet_rim = new THREE.Mesh(trumpetRimGeom, trumpetRimMat);
  trumpet_group.add(trumpet_rim);

  const stamenFilamentCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.010, 0.000, 0.060),
      new THREE.Vector3(0.018, 0.004, 0.145),
      new THREE.Vector3(0.045, 0.010, 0.235),
      new THREE.Vector3(0.075, 0.015, 0.315),
    ],
    false,
    "centripetal"
  );
  const stamenFilamentGeom = new THREE.TubeGeometry(
    stamenFilamentCurve,
    14,
    0.006,
    6,
    false
  );
  const stamen_filaments = new THREE.InstancedMesh(
    stamenFilamentGeom,
    filamentMat,
    6
  );
  const stamen_dummy = new THREE.Object3D();

  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + 0.18;
    stamen_dummy.position.set(0, 0, 0);
    stamen_dummy.rotation.set(0, 0, angle);
    stamen_dummy.scale.set(1, 1, 1);
    stamen_dummy.updateMatrix();
    stamen_filaments.setMatrixAt(i, stamen_dummy.matrix);
  }
  stamen_filaments.instanceMatrix.needsUpdate = true;
  trumpet_group.add(stamen_filaments);

  const anthersGeom = new THREE.SphereGeometry(1, 12, 8);
  const anthers = new THREE.InstancedMesh(anthersGeom, antherMat, 6);
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 + 0.18;
    const radius = 0.078 + 0.006 * Math.sin(i * 2.1);
    stamen_dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.322 + 0.008 * Math.cos(i * 1.7)
    );
    stamen_dummy.rotation.set(0, 0, angle + 0.42);
    stamen_dummy.scale.set(0.034, 0.012, 0.013);
    stamen_dummy.updateMatrix();
    anthers.setMatrixAt(i, stamen_dummy.matrix);
  }
  anthers.instanceMatrix.needsUpdate = true;
  trumpet_group.add(anthers);

  const pistilGeom = new THREE.CylinderGeometry(
    0.009,
    0.012,
    0.285,
    8
  );
  const pistil = new THREE.Mesh(pistilGeom, pistilMat);
  pistil.rotation.x = Math.PI / 2;
  pistil.position.set(0.004, -0.004, 0.195);
  trumpet_group.add(pistil);

  const stigmaGeom = new THREE.SphereGeometry(0.022, 12, 8);
  const stigma = new THREE.Mesh(stigmaGeom, filamentMat);
  stigma.scale.set(1.15, 1.15, 0.75);
  stigma.position.set(0.004, -0.004, 0.342);
  trumpet_group.add(stigma);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}