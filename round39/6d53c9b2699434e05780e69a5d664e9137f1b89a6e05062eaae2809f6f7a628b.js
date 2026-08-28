export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "dandelion";

  const stem_group = new THREE.Group();
  stem_group.name = "stem_group";
  root.add(stem_group);

  const foliage_group = new THREE.Group();
  foliage_group.name = "foliage_group";
  root.add(foliage_group);

  const flower_head = new THREE.Group();
  flower_head.name = "flower_head";
  flower_head.position.y = 2.02;
  root.add(flower_head);

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x8faa62,
    metalness: 0.0,
    roughness: 0.9
  });
  const stem_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0x78914f,
    metalness: 0.0,
    roughness: 0.9
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x4f702f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const leaf_veinMat = new THREE.MeshStandardMaterial({
    color: 0x78914c,
    metalness: 0.0,
    roughness: 0.9
  });
  const receptacleMat = new THREE.MeshStandardMaterial({
    color: 0x66863b,
    metalness: 0.0,
    roughness: 0.9
  });
  const outer_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xf2cf00,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const middle_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xffdc19,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const inner_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xffd21c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const center_diskMat = new THREE.MeshStandardMaterial({
    color: 0xe6a900,
    metalness: 0.0,
    roughness: 0.75
  });
  const center_floretsMat = new THREE.MeshStandardMaterial({
    color: 0xffc300,
    metalness: 0.0,
    roughness: 0.75
  });
  const pollen_tipsMat = new THREE.MeshStandardMaterial({
    color: 0xb87800,
    metalness: 0.0,
    roughness: 0.8
  });

  const stemH = 1.96;
  const stemBottomR = 0.034;
  const stemTopR = 0.026;
  const stemGeom = new THREE.CylinderGeometry(
    stemTopR,
    stemBottomR,
    stemH,
    20,
    1
  );
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.name = "stem";
  stem.position.y = stemH / 2;
  stem_group.add(stem);

  const stem_ridgesGeom = new THREE.CylinderGeometry(0.0012, 0.0015, 1.88, 5);
  const stem_ridges = new THREE.InstancedMesh(
    stem_ridgesGeom,
    stem_ridgesMat,
    9
  );
  stem_ridges.name = "stem_ridges";
  const ridgeMatrix = new THREE.Matrix4();
  const ridgePosition = new THREE.Vector3();
  const identityQuaternion = new THREE.Quaternion();
  const unitScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < 9; i++) {
    const angle = i / 9 * Math.PI * 2;
    ridgePosition.set(
      Math.cos(angle) * 0.0285,
      0.97,
      Math.sin(angle) * 0.0285
    );
    ridgeMatrix.compose(ridgePosition, identityQuaternion, unitScale);
    stem_ridges.setMatrixAt(i, ridgeMatrix);
  }
  stem_ridges.instanceMatrix.needsUpdate = true;
  stem_group.add(stem_ridges);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(0.12, 0.07, 0.36, 0.34, 0, 1);
  leafShape.bezierCurveTo(-0.36, 0.34, -0.12, 0.07, 0, 0);

  const leafGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.0025,
    bevelSize: 0.003,
    bevelSegments: 2
  });
  leafGeom.translate(0, 0, -0.006);

  const leaf_veinCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.015, 0.011),
    new THREE.Vector3(0.004, 0.32, 0.011),
    new THREE.Vector3(-0.003, 0.66, 0.011),
    new THREE.Vector3(0, 0.94, 0.011)
  ], false, "centripetal");
  const leaf_veinGeom = new THREE.TubeGeometry(
    leaf_veinCurve,
    16,
    0.006,
    6,
    false
  );

  const right_leaf = new THREE.Mesh(leafGeom, leafMat);
  right_leaf.name = "right_leaf";
  right_leaf.position.set(0.012, 0.99, 0.018);
  right_leaf.rotation.z = -0.62;
  right_leaf.scale.set(0.27, 0.38, 1);
  foliage_group.add(right_leaf);

  const right_leaf_vein = new THREE.Mesh(leaf_veinGeom, leaf_veinMat);
  right_leaf_vein.name = "right_leaf_vein";
  right_leaf.add(right_leaf_vein);

  const left_leaf = new THREE.Mesh(leafGeom, leafMat);
  left_leaf.name = "left_leaf";
  left_leaf.position.set(-0.012, 0.87, 0.02);
  left_leaf.rotation.z = 0.72;
  left_leaf.scale.set(0.21, 0.25, 1);
  foliage_group.add(left_leaf);

  const left_leaf_vein = new THREE.Mesh(leaf_veinGeom, leaf_veinMat);
  left_leaf_vein.name = "left_leaf_vein";
  left_leaf.add(left_leaf_vein);

  const head_neckGeom = new THREE.CylinderGeometry(0.068, 0.027, 0.16, 16);
  const head_neck = new THREE.Mesh(head_neckGeom, receptacleMat);
  head_neck.name = "head_neck";
  head_neck.position.y = -0.08;
  flower_head.add(head_neck);

  const receptacleGeom = new THREE.SphereGeometry(0.105, 20, 12);
  const receptacle = new THREE.Mesh(receptacleGeom, receptacleMat);
  receptacle.name = "receptacle";
  receptacle.position.y = -0.005;
  receptacle.scale.set(1, 0.48, 1);
  flower_head.add(receptacle);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.bezierCurveTo(0.08, 0.12, 0.28, 0.48, 0.24, 0.78);
  petalShape.bezierCurveTo(0.20, 0.91, 0.10, 0.98, 0, 1);
  petalShape.bezierCurveTo(-0.10, 0.98, -0.20, 0.91, -0.24, 0.78);
  petalShape.bezierCurveTo(-0.28, 0.48, -0.08, 0.12, 0, 0);

  const petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.004,
    bevelSegments: 2
  });
  petalGeom.translate(0, 0, -0.006);

  function createPetalRing(
    count,
    length,
    width,
    baseY,
    rise,
    baseRadius,
    phase,
    material
  ) {
    const mesh = new THREE.InstancedMesh(petalGeom, material, count);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    const radialQuaternion = new THREE.Quaternion();
    const tiltQuaternion = new THREE.Quaternion();
    const zAxis = new THREE.Vector3(0, 0, 1);
    const xAxis = new THREE.Vector3(1, 0, 0);

    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2 + phase;
      const lengthFactor = 0.93 + 0.07 * Math.sin(i * 2.37 + phase * 3);
      const widthFactor = 0.94 + 0.06 * Math.cos(i * 1.73 + phase);
      const riseFactor = 0.94 + 0.06 * Math.sin(i * 1.31 + 0.7);
      const tilt = rise * riseFactor;

      position.set(
        Math.sin(angle) * baseRadius,
        baseY,
        Math.cos(angle) * baseRadius
      );

      radialQuaternion.setFromAxisAngle(zAxis, angle);
      tiltQuaternion.setFromAxisAngle(xAxis, tilt);
      radialQuaternion.multiply(tiltQuaternion);

      scale.set(
        width * widthFactor,
        length * lengthFactor,
        0.9 + 0.1 * Math.cos(i * 1.19)
      );
      matrix.compose(position, radialQuaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const outer_petals = createPetalRing(
    32,
    0.44,
    0.112,
    0.005,
    -0.08,
    0.018,
    0,
    outer_petalsMat
  );
  outer_petals.name = "outer_petals";
  flower_head.add(outer_petals);

  const middle_petals = createPetalRing(
    30,
    0.365,
    0.108,
    0.025,
    0.55,
    0.022,
    Math.PI / 30,
    middle_petalsMat
  );
  middle_petals.name = "middle_petals";
  flower_head.add(middle_petals);

  const inner_petals = createPetalRing(
    26,
    0.285,
    0.096,
    0.045,
    1.0,
    0.026,
    Math.PI / 26,
    inner_petalsMat
  );
  inner_petals.name = "inner_petals";
  flower_head.add(inner_petals);

  const upright_petals = createPetalRing(
    20,
    0.225,
    0.078,
    0.06,
    1.3,
    0.03,
    Math.PI / 20,
    middle_petalsMat
  );
  upright_petals.name = "upright_petals";
  flower_head.add(upright_petals);

  const center_diskGeom = new THREE.SphereGeometry(0.095, 24, 12);
  const center_disk = new THREE.Mesh(center_diskGeom, center_diskMat);
  center_disk.name = "center_disk";
  center_disk.position.y = 0.105;
  center_disk.scale.set(1, 0.38, 1);
  flower_head.add(center_disk);

  const center_floretsGeom = new THREE.CylinderGeometry(
    0.005,
    0.008,
    0.1,
    6
  );
  const center_florets = new THREE.InstancedMesh(
    center_floretsGeom,
    center_floretsMat,
    36
  );
  center_florets.name = "center_florets";

  const pollen_tipsGeom = new THREE.SphereGeometry(0.008, 8, 6);
  const pollen_tips = new THREE.InstancedMesh(
    pollen_tipsGeom,
    pollen_tipsMat,
    36
  );
  pollen_tips.name = "pollen_tips";

  const floretMatrix = new THREE.Matrix4();
  const tipMatrix = new THREE.Matrix4();
  const floretPosition = new THREE.Vector3();
  const tipPosition = new THREE.Vector3();
  const floretDirection = new THREE.Vector3();
  const floretQuaternion = new THREE.Quaternion();
  const floretScale = new THREE.Vector3();
  const tipScale = new THREE.Vector3();
  const upAxis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < 36; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.012 + 0.074 * Math.sqrt((i + 0.5) / 36);
    const height = 0.19 + 0.025 * (1 - radius / 0.09);

    floretPosition.set(
      Math.cos(angle) * radius,
      height / 2,
      Math.sin(angle) * radius
    );
    floretDirection.set(
      Math.cos(angle) * 0.14,
      1,
      Math.sin(angle) * 0.14
    ).normalize();
    floretQuaternion.setFromUnitVectors(upAxis, floretDirection);
    floretScale.set(1, height / 0.1, 1);
    floretMatrix.compose(floretPosition, floretQuaternion, floretScale);
    center_florets.setMatrixAt(i, floretMatrix);

    tipPosition.set(
      Math.cos(angle) * radius + floretDirection.x * height,
      height + floretDirection.y * height,
      Math.sin(angle) * radius + floretDirection.z * height
    );
    const tipSize = 0.82 + 0.18 * Math.sin(i * 1.83);
    tipScale.setScalar(tipSize);
    tipMatrix.compose(tipPosition, identityQuaternion, tipScale);
    pollen_tips.setMatrixAt(i, tipMatrix);
  }

  center_florets.instanceMatrix.needsUpdate = true;
  pollen_tips.instanceMatrix.needsUpdate = true;
  flower_head.add(center_florets);
  flower_head.add(pollen_tips);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}