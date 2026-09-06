export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "glass_bottle_with_cork";

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7efed,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const corkMat = new THREE.MeshStandardMaterial({
    color: 0xb9824f,
    metalness: 0.0,
    roughness: 0.9,
  });

  const corkTopMat = new THREE.MeshStandardMaterial({
    color: 0xc9955d,
    metalness: 0.0,
    roughness: 0.9,
  });

  const corkGrainMat = new THREE.MeshStandardMaterial({
    color: 0x68401f,
    metalness: 0.0,
    roughness: 0.9,
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.78, 0.00),
    new THREE.Vector2(0.96, 0.025),
    new THREE.Vector2(1.05, 0.08),
    new THREE.Vector2(1.10, 0.17),
    new THREE.Vector2(1.12, 0.34),
    new THREE.Vector2(1.12, 2.25),
    new THREE.Vector2(1.11, 2.40),
    new THREE.Vector2(1.07, 2.55),
    new THREE.Vector2(0.99, 2.70),
    new THREE.Vector2(0.88, 2.84),
    new THREE.Vector2(0.73, 2.98),
    new THREE.Vector2(0.61, 3.08),
    new THREE.Vector2(0.54, 3.20),
    new THREE.Vector2(0.50, 3.36),
    new THREE.Vector2(0.50, 3.82),
    new THREE.Vector2(0.43, 3.82),
    new THREE.Vector2(0.43, 3.38),
    new THREE.Vector2(0.47, 3.23),
    new THREE.Vector2(0.53, 3.11),
    new THREE.Vector2(0.65, 3.00),
    new THREE.Vector2(0.80, 2.87),
    new THREE.Vector2(0.92, 2.72),
    new THREE.Vector2(1.00, 2.56),
    new THREE.Vector2(1.04, 2.39),
    new THREE.Vector2(1.04, 0.34),
    new THREE.Vector2(1.02, 0.22),
    new THREE.Vector2(0.97, 0.14),
    new THREE.Vector2(0.80, 0.09),
    new THREE.Vector2(0.00, 0.09),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, glassMat);
  bottle_body.name = "bottle_body";
  bottle_body.renderOrder = 2;
  root.add(bottle_body);

  const bottle_lipProfile = [
    new THREE.Vector2(0.49, 3.69),
    new THREE.Vector2(0.58, 3.70),
    new THREE.Vector2(0.64, 3.74),
    new THREE.Vector2(0.67, 3.80),
    new THREE.Vector2(0.66, 3.86),
    new THREE.Vector2(0.61, 3.91),
    new THREE.Vector2(0.50, 3.92),
    new THREE.Vector2(0.45, 3.89),
    new THREE.Vector2(0.43, 3.84),
    new THREE.Vector2(0.44, 3.77),
    new THREE.Vector2(0.47, 3.72),
    new THREE.Vector2(0.49, 3.69),
  ];
  const bottle_lipGeom = new THREE.LatheGeometry(bottle_lipProfile, 64);
  const bottle_lip = new THREE.Mesh(bottle_lipGeom, glassMat);
  bottle_lip.name = "bottle_lip";
  bottle_lip.renderOrder = 3;
  root.add(bottle_lip);

  const bottle_bottom_ringGeom = new THREE.TorusGeometry(0.99, 0.035, 12, 64);
  const bottle_bottom_ring = new THREE.Mesh(bottle_bottom_ringGeom, glassMat);
  bottle_bottom_ring.name = "bottle_bottom_ring";
  bottle_bottom_ring.rotation.x = Math.PI / 2;
  bottle_bottom_ring.position.y = 0.105;
  bottle_bottom_ring.renderOrder = 3;
  root.add(bottle_bottom_ring);

  const bottle_inner_base_ringGeom = new THREE.TorusGeometry(0.73, 0.018, 10, 64);
  const bottle_inner_base_ring = new THREE.Mesh(bottle_inner_base_ringGeom, glassMat);
  bottle_inner_base_ring.name = "bottle_inner_base_ring";
  bottle_inner_base_ring.rotation.x = Math.PI / 2;
  bottle_inner_base_ring.position.y = 0.105;
  bottle_inner_base_ring.renderOrder = 3;
  root.add(bottle_inner_base_ring);

  const corkBottomY = 3.50;
  const corkTopY = 4.38;
  const corkBottomR = 0.46;
  const corkTopR = 0.58;

  const cork_stopperGeom = new THREE.CylinderGeometry(
    corkTopR,
    corkBottomR,
    corkTopY - corkBottomY,
    48,
    4,
    false
  );
  const cork_stopper = new THREE.Mesh(cork_stopperGeom, corkMat);
  cork_stopper.name = "cork_stopper";
  cork_stopper.position.y = (corkBottomY + corkTopY) / 2;
  root.add(cork_stopper);

  const cork_topGeom = new THREE.CylinderGeometry(0.585, 0.575, 0.025, 48, 1, false);
  const cork_top = new THREE.Mesh(cork_topGeom, corkTopMat);
  cork_top.name = "cork_top";
  cork_top.position.y = 4.385;
  root.add(cork_top);

  const cork_side_specklesGeom = new THREE.SphereGeometry(1, 8, 5);
  const cork_side_speckles = new THREE.InstancedMesh(
    cork_side_specklesGeom,
    corkGrainMat,
    72
  );
  cork_side_speckles.name = "cork_side_speckles";

  const speckleDummy = new THREE.Object3D();
  const localNormal = new THREE.Vector3(0, 0, 1);
  const corkSlope = (corkTopR - corkBottomR) / (corkTopY - corkBottomY);

  for (let i = 0; i < 72; i++) {
    const heightFraction = ((i * 29) % 73) / 72;
    const angle = i * 2.399963229728653;
    const y = corkBottomY + 0.025 + heightFraction * (corkTopY - corkBottomY - 0.05);
    const radius = corkBottomR + (corkTopR - corkBottomR) *
      ((y - corkBottomY) / (corkTopY - corkBottomY));
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const normal = new THREE.Vector3(cosAngle, -corkSlope, sinAngle).normalize();

    speckleDummy.position.set(
      cosAngle * radius + normal.x * 0.004,
      y + normal.y * 0.004,
      sinAngle * radius + normal.z * 0.004
    );
    speckleDummy.quaternion.setFromUnitVectors(localNormal, normal);
    speckleDummy.scale.set(
      0.025 + (i % 5) * 0.006,
      0.012 + (i % 4) * 0.004,
      0.006
    );
    speckleDummy.updateMatrix();
    cork_side_speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  cork_side_speckles.instanceMatrix.needsUpdate = true;
  root.add(cork_side_speckles);

  const cork_top_poresGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.004, 7);
  const cork_top_pores = new THREE.InstancedMesh(
    cork_top_poresGeom,
    corkGrainMat,
    36
  );
  cork_top_pores.name = "cork_top_pores";

  const poreDummy = new THREE.Object3D();
  for (let i = 0; i < 36; i++) {
    const angle = i * 2.399963229728653;
    const radialFraction = ((i * 17) % 37) / 36;
    const radius = 0.045 + radialFraction * 0.47;
    poreDummy.position.set(
      Math.cos(angle) * radius,
      4.399,
      Math.sin(angle) * radius
    );
    poreDummy.rotation.set(0, angle, 0);
    poreDummy.scale.set(
      0.65 + (i % 5) * 0.16,
      1,
      0.55 + (i % 3) * 0.18
    );
    poreDummy.updateMatrix();
    cork_top_pores.setMatrixAt(i, poreDummy.matrix);
  }
  cork_top_pores.instanceMatrix.needsUpdate = true;
  root.add(cork_top_pores);

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