export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hydrangea_vase";

  const vase_group = new THREE.Group();
  vase_group.name = "vase_group";
  root.add(vase_group);

  const bouquet_group = new THREE.Group();
  bouquet_group.name = "bouquet_group";
  root.add(bouquet_group);

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x6f9dcc,
    metalness: 0.0,
    roughness: 0.4,
  });
  const vase_openingMat = new THREE.MeshStandardMaterial({
    color: 0x173d50,
    metalness: 0.0,
    roughness: 0.7,
  });
  const vase_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xd8eaff,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });

  const vaseProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.185, 0.000),
    new THREE.Vector2(0.225, 0.006),
    new THREE.Vector2(0.250, 0.025),
    new THREE.Vector2(0.255, 0.050),
    new THREE.Vector2(0.245, 0.075),
    new THREE.Vector2(0.225, 0.095),
    new THREE.Vector2(0.220, 0.110),
    new THREE.Vector2(0.250, 0.140),
    new THREE.Vector2(0.290, 0.190),
    new THREE.Vector2(0.330, 0.270),
    new THREE.Vector2(0.360, 0.360),
    new THREE.Vector2(0.375, 0.460),
    new THREE.Vector2(0.372, 0.540),
    new THREE.Vector2(0.350, 0.620),
    new THREE.Vector2(0.320, 0.680),
    new THREE.Vector2(0.285, 0.730),
    new THREE.Vector2(0.250, 0.770),
    new THREE.Vector2(0.225, 0.800),
    new THREE.Vector2(0.215, 0.820),
    new THREE.Vector2(0.215, 0.835),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vaseProfile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  vase_group.add(vase_body);

  const vase_foot_ringGeom = new THREE.TorusGeometry(0.232, 0.013, 12, 64);
  const vase_foot_ring = new THREE.Mesh(vase_foot_ringGeom, vase_bodyMat);
  vase_foot_ring.name = "vase_foot_ring";
  vase_foot_ring.rotation.x = Math.PI / 2;
  vase_foot_ring.position.y = 0.035;
  vase_group.add(vase_foot_ring);

  const vase_base_beadGeom = new THREE.TorusGeometry(0.224, 0.009, 10, 64);
  const vase_base_bead = new THREE.Mesh(vase_base_beadGeom, vase_bodyMat);
  vase_base_bead.name = "vase_base_bead";
  vase_base_bead.rotation.x = Math.PI / 2;
  vase_base_bead.position.y = 0.108;
  vase_group.add(vase_base_bead);

  const vase_mouth_rimGeom = new THREE.TorusGeometry(0.207, 0.012, 12, 64);
  const vase_mouth_rim = new THREE.Mesh(vase_mouth_rimGeom, vase_bodyMat);
  vase_mouth_rim.name = "vase_mouth_rim";
  vase_mouth_rim.rotation.x = Math.PI / 2;
  vase_mouth_rim.position.y = 0.833;
  vase_group.add(vase_mouth_rim);

  const vase_openingGeom = new THREE.CylinderGeometry(0.202, 0.202, 0.012, 48);
  const vase_opening = new THREE.Mesh(vase_openingGeom, vase_openingMat);
  vase_opening.name = "vase_opening";
  vase_opening.position.y = 0.836;
  vase_group.add(vase_opening);

  function createHighlightGeometry(points, radius) {
    const path = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(path, 24, radius, 8, false);
  }

  const leftHighlightPoints = [
    new THREE.Vector3(-0.135, 0.275, 0.304),
    new THREE.Vector3(-0.145, 0.355, 0.330),
    new THREE.Vector3(-0.148, 0.445, 0.338),
    new THREE.Vector3(-0.143, 0.535, 0.329),
    new THREE.Vector3(-0.130, 0.615, 0.306),
  ];
  const vase_highlight_leftGeom = createHighlightGeometry(leftHighlightPoints, 0.014);
  const vase_highlight_left = new THREE.Mesh(vase_highlight_leftGeom, vase_highlightMat);
  vase_highlight_left.name = "vase_highlight_left";
  vase_group.add(vase_highlight_left);

  const rightHighlightPoints = [
    new THREE.Vector3(0.125, 0.300, 0.316),
    new THREE.Vector3(0.132, 0.370, 0.337),
    new THREE.Vector3(0.135, 0.445, 0.341),
    new THREE.Vector3(0.128, 0.515, 0.331),
    new THREE.Vector3(0.115, 0.575, 0.316),
  ];
  const vase_highlight_rightGeom = createHighlightGeometry(rightHighlightPoints, 0.010);
  const vase_highlight_right = new THREE.Mesh(vase_highlight_rightGeom, vase_highlightMat);
  vase_highlight_right.name = "vase_highlight_right";
  vase_group.add(vase_highlight_right);

  const bouquet_stemsMat = new THREE.MeshStandardMaterial({
    color: 0x315f3d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const bouquet_stemsGeom = new THREE.CylinderGeometry(0.0045, 0.006, 1, 7);
  const bouquet_stems = new THREE.InstancedMesh(
    bouquet_stemsGeom,
    bouquet_stemsMat,
    16
  );
  bouquet_stems.name = "bouquet_stems";

  const stemDummy = new THREE.Object3D();
  const upAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 16; i++) {
    const angle = i * 2.3999632297;
    const start = new THREE.Vector3(
      Math.cos(angle) * 0.035,
      0.828,
      Math.sin(angle) * 0.035
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * 0.145,
      1.025 + Math.sin(i * 1.7) * 0.045,
      Math.sin(angle) * 0.145
    );
    const direction = end.clone().sub(start);
    const length = direction.length();
    stemDummy.position.copy(start).add(end).multiplyScalar(0.5);
    stemDummy.quaternion.setFromUnitVectors(upAxis, direction.normalize());
    stemDummy.scale.set(1, length, 1);
    stemDummy.updateMatrix();
    bouquet_stems.setMatrixAt(i, stemDummy.matrix);
  }
  bouquet_stems.instanceMatrix.needsUpdate = true;
  bouquet_group.add(bouquet_stems);

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x2f6e43,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(-0.018, 0.025, -0.040, 0.090, 0, 0.165);
  leafShape.bezierCurveTo(0.040, 0.090, 0.018, 0.025, 0, 0);
  const green_sepalsGeom = new THREE.ShapeGeometry(leafShape, 12);
  const leafCount = 20;
  const green_sepals = new THREE.InstancedMesh(
    green_sepalsGeom,
    leafMat,
    leafCount
  );
  green_sepals.name = "green_sepals";

  const leafDummy = new THREE.Object3D();
  const localZ = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < leafCount; i++) {
    const angle = i * 2.3999632297 + 0.45;
    const normal = new THREE.Vector3(
      Math.cos(angle) * 0.78,
      Math.sin(i * 1.37) * 0.24,
      Math.sin(angle) * 0.78
    ).normalize();
    const radius = 0.305 + 0.018 * Math.sin(i * 1.9);
    leafDummy.position.set(
      normal.x * radius,
      0.975 + Math.sin(i * 1.61) * 0.045,
      normal.z * radius
    );
    leafDummy.quaternion.setFromUnitVectors(localZ, normal);
    leafDummy.rotateZ(angle + Math.PI / 2);
    const leafScale = 0.78 + 0.12 * (0.5 + 0.5 * Math.sin(i * 2.1));
    leafDummy.scale.set(leafScale, leafScale, leafScale);
    leafDummy.updateMatrix();
    green_sepals.setMatrixAt(i, leafDummy.matrix);
  }
  green_sepals.instanceMatrix.needsUpdate = true;
  bouquet_group.add(green_sepals);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.bezierCurveTo(-0.030, 0.015, -0.067, 0.055, -0.064, 0.102);
  petalShape.bezierCurveTo(-0.061, 0.142, -0.032, 0.169, 0, 0.174);
  petalShape.bezierCurveTo(0.032, 0.169, 0.061, 0.142, 0.064, 0.102);
  petalShape.bezierCurveTo(0.067, 0.055, 0.030, 0.015, 0, 0);

  const petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.006,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.0015,
    bevelSize: 0.002,
    bevelSegments: 2,
  });
  petalGeom.translate(0, 0, -0.003);

  const positionAttribute = petalGeom.getAttribute("position");
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);
    const t = Math.max(0, Math.min(1, y / 0.174));
    const sideCup = 0.30 * (x * x) * t;
    const centerCup = 0.035 * Math.sin(t * Math.PI);
    positionAttribute.setZ(i, z - sideCup - centerCup);
  }
  positionAttribute.needsUpdate = true;
  petalGeom.computeVertexNormals();

  const petal_veinsGeom = new THREE.CylinderGeometry(0.00065, 0.0011, 0.11, 5);
  petal_veinsGeom.translate(0, 0.055, 0);

  const flower_centersGeom = new THREE.SphereGeometry(0.011, 12, 8);

  const blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x91abd9,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const blue_petal_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x647fb5,
    metalness: 0.0,
    roughness: 0.7,
  });
  const blue_flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0x668ba8,
    metalness: 0.0,
    roughness: 0.7,
  });

  const ivory_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xe7f0e9,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const ivory_petal_veinsMat = new THREE.MeshStandardMaterial({
    color: 0xb6cbb8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const ivory_flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0x9eb7a4,
    metalness: 0.0,
    roughness: 0.7,
  });

  const pale_blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xb9d2e8,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const pale_blue_petal_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x83a1c5,
    metalness: 0.0,
    roughness: 0.7,
  });
  const pale_blue_flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0x7898ae,
    metalness: 0.0,
    roughness: 0.7,
  });

  const bluePalette = {
    petals: blue_petalsMat,
    veins: blue_petal_veinsMat,
    centers: blue_flower_centersMat,
  };
  const ivoryPalette = {
    petals: ivory_petalsMat,
    veins: ivory_petal_veinsMat,
    centers: ivory_flower_centersMat,
  };
  const paleBluePalette = {
    petals: pale_blue_petalsMat,
    veins: pale_blue_petal_veinsMat,
    centers: pale_blue_flower_centersMat,
  };

  const bluePetalMatrices = [];
  const ivoryPetalMatrices = [];
  const paleBluePetalMatrices = [];
  const blueVeinMatrices = [];
  const ivoryVeinMatrices = [];
  const paleBlueVeinMatrices = [];
  const blueCenterMatrices = [];
  const ivoryCenterMatrices = [];
  const paleBlueCenterMatrices = [];

  const petalMatrixSets = [
    bluePetalMatrices,
    ivoryPetalMatrices,
    paleBluePetalMatrices,
  ];
  const veinMatrixSets = [
    blueVeinMatrices,
    ivoryVeinMatrices,
    paleBlueVeinMatrices,
  ];
  const centerMatrixSets = [
    blueCenterMatrices,
    ivoryCenterMatrices,
    paleBlueCenterMatrices,
  ];

  const flowerDummy = new THREE.Object3D();
  const petalDummy = new THREE.Object3D();
  const centerDummy = new THREE.Object3D();
  const flowerNormal = new THREE.Vector3();
  const tangentX = new THREE.Vector3();
  const tangentY = new THREE.Vector3();
  const flowerCenter = new THREE.Vector3();
  const petalPosition = new THREE.Vector3();

  const flowerCount = 112;
  for (let i = 0; i < flowerCount; i++) {
    const vertical = 1 - 2 * ((i + 0.5) / flowerCount);
    const horizontal = Math.sqrt(Math.max(0, 1 - vertical * vertical));
    const azimuth = i * 2.3999632297;

    flowerNormal.set(
      Math.cos(azimuth) * horizontal,
      vertical,
      Math.sin(azimuth) * horizontal
    ).normalize();

    const shell = Math.pow(Math.sin((i + 1) * 1.731), 2);
    const radius = 0.10 + 0.30 * shell;
    flowerCenter.set(
      flowerNormal.x * radius,
      1.195 + flowerNormal.y * 0.39 - 0.035 * vertical,
      flowerNormal.z * radius * 0.88
    );

    tangentX.set(-flowerNormal.z, 0, flowerNormal.x);
    if (tangentX.lengthSq() < 0.0001) tangentX.set(1, 0, 0);
    tangentX.normalize();
    tangentY.crossVectors(flowerNormal, tangentX).normalize();

    flowerDummy.position.copy(flowerCenter);
    flowerDummy.quaternion.setFromUnitVectors(localZ, flowerNormal);
    flowerDummy.scale.set(1, 1, 1);
    flowerDummy.updateMatrix();

    const size = 0.90 + 0.22 * (0.5 + 0.5 * Math.sin(i * 2.17));
    const colorIndex =
      i % 7 === 0 ? 1 : i % 7 === 3 ? 2 : 0;
    const phase = Math.sin(i * 1.31) * 0.12;

    for (let p = 0; p < 4; p++) {
      const angle = phase + p * Math.PI / 2;
      const rotation = new THREE.Quaternion().setFromAxisAngle(localZ, angle);
      const cupTilt = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        0.08 + 0.05 * Math.sin(i * 0.73 + p * 1.41)
      );

      petalDummy.position.copy(flowerCenter);
      petalDummy.quaternion.copy(flowerDummy.quaternion);
      petalDummy.quaternion.multiply(rotation);
      petalDummy.quaternion.multiply(cupTilt);
      petalDummy.scale.set(
        size * (0.97 + 0.03 * Math.sin(i + p * 1.7)),
        size * (1.00 + 0.03 * Math.cos(i * 0.61 + p)),
        size
      );
      petalDummy.updateMatrix();
      petalMatrixSets[colorIndex].push(petalDummy.matrix.clone());
      veinMatrixSets[colorIndex].push(petalDummy.matrix.clone());

      const petalDirection = tangentX
        .clone()
        .multiplyScalar(Math.cos(angle))
        .add(tangentY.clone().multiplyScalar(Math.sin(angle)));

      centerDummy.position
        .copy(flowerCenter)
        .addScaledVector(petalDirection, 0.013 * size)
        .addScaledVector(flowerNormal, 0.006);
      centerDummy.quaternion.identity();
      const centerScale = 0.78 + 0.12 * Math.sin(i * 1.9 + p);
      centerDummy.scale.setScalar(centerScale);
      centerDummy.updateMatrix();
      centerMatrixSets[colorIndex].push(centerDummy.matrix.clone());
    }
  }

  function createInstances(name, geometry, material, matrices) {
    const instances = new THREE.InstancedMesh(
      geometry,
      material,
      matrices.length
    );
    instances.name = name;
    for (let i = 0; i < matrices.length; i++) {
      instances.setMatrixAt(i, matrices[i]);
    }
    instances.instanceMatrix.needsUpdate = true;
    return instances;
  }

  const blue_petals = createInstances(
    "blue_petals",
    petalGeom,
    blue_petalsMat,
    bluePetalMatrices
  );
  const ivory_petals = createInstances(
    "ivory_petals",
    petalGeom,
    ivory_petalsMat,
    ivoryPetalMatrices
  );
  const pale_blue_petals = createInstances(
    "pale_blue_petals",
    petalGeom,
    pale_blue_petalsMat,
    paleBluePetalMatrices
  );

  const blue_petal_veins = createInstances(
    "blue_petal_veins",
    petal_veinsGeom,
    blue_petal_veinsMat,
    blueVeinMatrices
  );
  const ivory_petal_veins = createInstances(
    "ivory_petal_veins",
    petal_veinsGeom,
    ivory_petal_veinsMat,
    ivoryVeinMatrices
  );
  const pale_blue_petal_veins = createInstances(
    "pale_blue_petal_veins",
    petal_veinsGeom,
    pale_blue_petal_veinsMat,
    paleBlueVeinMatrices
  );

  const blue_flower_centers = createInstances(
    "blue_flower_centers",
    flower_centersGeom,
    blue_flower_centersMat,
    blueCenterMatrices
  );
  const ivory_flower_centers = createInstances(
    "ivory_flower_centers",
    flower_centersGeom,
    ivory_flower_centersMat,
    ivoryCenterMatrices
  );
  const pale_blue_flower_centers = createInstances(
    "pale_blue_flower_centers",
    flower_centersGeom,
    pale_blue_flower_centersMat,
    paleBlueCenterMatrices
  );

  bouquet_group.add(
    blue_petals,
    ivory_petals,
    pale_blue_petals,
    blue_petal_veins,
    ivory_petal_veins,
    pale_blue_petal_veins,
    blue_flower_centers,
    ivory_flower_centers,
    pale_blue_flower_centers
  );

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