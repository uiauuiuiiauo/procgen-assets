export default function generate(THREE) {
  const root = new THREE.Group();
  const fruit_group = new THREE.Group();
  root.add(fruit_group);

  const halfLength = 1.18;
  const maxRadius = 0.76;
  const profilePower = 0.72;

  const lemon_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffe900,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rind_poresMat = new THREE.MeshStandardMaterial({
    color: 0xe3cd00,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const rind_highlightsMat = new THREE.MeshStandardMaterial({
    color: 0xfff46b,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x58752b,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stem_tipMat = new THREE.MeshStandardMaterial({
    color: 0x65502d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const calyx_sepalsMat = new THREE.MeshStandardMaterial({
    color: 0x496b25,
    metalness: 0.0,
    roughness: 0.9,
  });
  const calyx_coreMat = new THREE.MeshStandardMaterial({
    color: 0x756044,
    metalness: 0.0,
    roughness: 0.9,
  });
  const calyx_nubMat = new THREE.MeshStandardMaterial({
    color: 0x8b7657,
    metalness: 0.0,
    roughness: 0.9,
  });
  const blossom_scarMat = new THREE.MeshStandardMaterial({
    color: 0x786342,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function lemonRadiusAt(y) {
    const t = Math.max(-1, Math.min(1, y / halfLength));
    const base = Math.max(0, 1 - t * t);
    return maxRadius * Math.pow(base, profilePower) * (1 + 0.025 * t);
  }

  const lemon_profile = [];
  for (let i = 0; i <= 64; i++) {
    const t = -1 + (2 * i) / 64;
    const y = t * halfLength;
    lemon_profile.push(new THREE.Vector2(lemonRadiusAt(y), y));
  }

  const lemon_bodyGeom = new THREE.LatheGeometry(lemon_profile, 64);
  const lemon_body = new THREE.Mesh(lemon_bodyGeom, lemon_bodyMat);
  fruit_group.add(lemon_body);

  const z_axis = new THREE.Vector3(0, 0, 1);
  const y_axis = new THREE.Vector3(0, 1, 0);
  const instance_dummy = new THREE.Object3D();

  const poreCount = 180;
  const rind_poresGeom = new THREE.CircleGeometry(0.014, 8);
  const rind_pores = new THREE.InstancedMesh(
    rind_poresGeom,
    rind_poresMat,
    poreCount
  );

  for (let i = 0; i < poreCount; i++) {
    const u = (i + 0.5) / poreCount;
    const y =
      (-0.92 + 1.84 * u) *
      halfLength *
      (0.985 + 0.015 * Math.sin(i * 1.71));
    const angle = i * 2.399963229728653;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const radius = lemonRadiusAt(y);
    const derivative =
      (lemonRadiusAt(y + 0.003) - lemonRadiusAt(y - 0.003)) / 0.006;
    const normal = new THREE.Vector3(cosAngle, -derivative, sinAngle).normalize();

    instance_dummy.position
      .set(cosAngle * radius, y, sinAngle * radius)
      .addScaledVector(normal, 0.003);
    instance_dummy.quaternion.setFromUnitVectors(z_axis, normal);
    instance_dummy.rotateZ(i * 0.73);

    const poreScale = 0.62 + 0.34 * (0.5 + 0.5 * Math.sin(i * 2.13));
    instance_dummy.scale.set(
      poreScale * (0.72 + 0.22 * (0.5 + 0.5 * Math.sin(i * 1.37))),
      poreScale,
      1
    );
    instance_dummy.updateMatrix();
    rind_pores.setMatrixAt(i, instance_dummy.matrix);
  }
  rind_pores.instanceMatrix.needsUpdate = true;
  fruit_group.add(rind_pores);

  const highlightCount = 84;
  const rind_highlightsGeom = new THREE.CircleGeometry(0.018, 10);
  const rind_highlights = new THREE.InstancedMesh(
    rind_highlightsGeom,
    rind_highlightsMat,
    highlightCount
  );

  for (let i = 0; i < highlightCount; i++) {
    const u = (i + 0.5) / highlightCount;
    const y =
      (-0.86 + 1.72 * u) *
      halfLength *
      (0.98 + 0.02 * Math.sin(i * 1.43));
    const angle = i * 2.399963229728653 + 0.83;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const radius = lemonRadiusAt(y);
    const derivative =
      (lemonRadiusAt(y + 0.003) - lemonRadiusAt(y - 0.003)) / 0.006;
    const normal = new THREE.Vector3(cosAngle, -derivative, sinAngle).normalize();

    instance_dummy.position
      .set(cosAngle * radius, y, sinAngle * radius)
      .addScaledVector(normal, 0.005);
    instance_dummy.quaternion.setFromUnitVectors(z_axis, normal);
    instance_dummy.rotateZ(0.45 + i * 0.61);

    const markScale = 0.65 + 0.45 * (0.5 + 0.5 * Math.sin(i * 2.27));
    instance_dummy.scale.set(
      markScale * (1.15 + 0.55 * (0.5 + 0.5 * Math.sin(i * 1.19))),
      markScale * 0.42,
      1
    );
    instance_dummy.updateMatrix();
    rind_highlights.setMatrixAt(i, instance_dummy.matrix);
  }
  rind_highlights.instanceMatrix.needsUpdate = true;
  fruit_group.add(rind_highlights);

  const calyx_coreGeom = new THREE.CylinderGeometry(0.067, 0.082, 0.065, 10);
  const calyx_core = new THREE.Mesh(calyx_coreGeom, calyx_coreMat);
  calyx_core.position.y = -1.19;
  fruit_group.add(calyx_core);

  const calyx_nubGeom = new THREE.CylinderGeometry(0.038, 0.052, 0.055, 8);
  const calyx_nub = new THREE.Mesh(calyx_nubGeom, calyx_nubMat);
  calyx_nub.position.y = -1.247;
  fruit_group.add(calyx_nub);

  const calyx_sepalsGeom = new THREE.ConeGeometry(0.045, 0.18, 5);
  const calyx_sepals = new THREE.InstancedMesh(
    calyx_sepalsGeom,
    calyx_sepalsMat,
    5
  );

  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const direction = new THREE.Vector3(
      cosAngle * 0.5,
      -0.86,
      sinAngle * 0.5
    ).normalize();

    instance_dummy.position
      .set(cosAngle * 0.055, -1.185, sinAngle * 0.055)
      .addScaledVector(direction, 0.09);
    instance_dummy.quaternion.setFromUnitVectors(y_axis, direction);
    instance_dummy.scale.set(
      0.88 + 0.12 * Math.sin(i * 1.8),
      0.92 + 0.08 * Math.cos(i * 2.1),
      0.66
    );
    instance_dummy.updateMatrix();
    calyx_sepals.setMatrixAt(i, instance_dummy.matrix);
  }
  calyx_sepals.instanceMatrix.needsUpdate = true;
  fruit_group.add(calyx_sepals);

  const stem_collarGeom = new THREE.CylinderGeometry(0.045, 0.085, 0.15, 12);
  const stem_collar = new THREE.Mesh(stem_collarGeom, stemMat);
  stem_collar.position.y = 1.205;
  fruit_group.add(stem_collar);

  const stemPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.22, 0),
    new THREE.Vector3(0.018, 1.29, -0.004),
    new THREE.Vector3(0.052, 1.37, -0.012),
  ]);
  const stemGeom = new THREE.TubeGeometry(stemPath, 14, 0.034, 8, false);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  fruit_group.add(stem);

  const stem_tipGeom = new THREE.SphereGeometry(0.035, 10, 6);
  const stem_tip = new THREE.Mesh(stem_tipGeom, stem_tipMat);
  stem_tip.position.set(0.052, 1.37, -0.012);
  stem_tip.scale.set(0.8, 1.15, 0.8);
  fruit_group.add(stem_tip);

  const blossom_scarGeom = new THREE.CircleGeometry(0.025, 12);
  const blossom_scar = new THREE.Mesh(blossom_scarGeom, blossom_scarMat);
  const scarY = -0.28;
  const scarAngle = 1.27;
  const scarRadius = lemonRadiusAt(scarY);
  const scarDerivative =
    (lemonRadiusAt(scarY + 0.003) - lemonRadiusAt(scarY - 0.003)) / 0.006;
  const scarNormal = new THREE.Vector3(
    Math.cos(scarAngle),
    -scarDerivative,
    Math.sin(scarAngle)
  ).normalize();
  blossom_scar.position
    .set(
      Math.cos(scarAngle) * scarRadius,
      scarY,
      Math.sin(scarAngle) * scarRadius
    )
    .addScaledVector(scarNormal, 0.006);
  blossom_scar.quaternion.setFromUnitVectors(z_axis, scarNormal);
  fruit_group.add(blossom_scar);

  fruit_group.rotation.set(0.12, -0.06, -1.02);

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