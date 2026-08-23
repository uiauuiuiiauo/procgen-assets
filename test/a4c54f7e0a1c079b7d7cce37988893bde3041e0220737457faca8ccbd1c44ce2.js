export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "green_glass_bottle";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const stopper_group = new THREE.Group();
  stopper_group.name = "stopper_group";
  root.add(stopper_group);

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x009b52,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const dark_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x075536,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const cork_stoppperMat = new THREE.MeshStandardMaterial({
    color: 0xb97848,
    metalness: 0.0,
    roughness: 0.9
  });

  const cork_topMat = new THREE.MeshStandardMaterial({
    color: 0xc98d58,
    metalness: 0.0,
    roughness: 0.9
  });

  const cork_fleckMat = new THREE.MeshStandardMaterial({
    color: 0x56351f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.47, 0.00),
    new THREE.Vector2(0.56, 0.015),
    new THREE.Vector2(0.61, 0.045),
    new THREE.Vector2(0.64, 0.10),
    new THREE.Vector2(0.65, 0.18),
    new THREE.Vector2(0.65, 0.86),
    new THREE.Vector2(0.645, 0.96),
    new THREE.Vector2(0.63, 1.06),
    new THREE.Vector2(0.59, 1.17),
    new THREE.Vector2(0.54, 1.28),
    new THREE.Vector2(0.47, 1.39),
    new THREE.Vector2(0.39, 1.49),
    new THREE.Vector2(0.32, 1.57),
    new THREE.Vector2(0.28, 1.64),
    new THREE.Vector2(0.26, 1.72),
    new THREE.Vector2(0.26, 2.13),
    new THREE.Vector2(0.26, 2.20)
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.name = "bottle_body";
  bottle_group.add(bottle_body);

  const bottom_glassGeom = new THREE.CylinderGeometry(0.56, 0.56, 0.028, 64);
  const bottom_glass = new THREE.Mesh(bottom_glassGeom, dark_glassMat);
  bottom_glass.name = "bottom_glass";
  bottom_glass.position.y = 0.025;
  bottle_group.add(bottom_glass);

  const base_ringGeom = new THREE.TorusGeometry(0.59, 0.045, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, dark_glassMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.055;
  bottle_group.add(base_ring);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.43, 0.018, 8, 48);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, dark_glassMat);
  inner_base_ring.name = "inner_base_ring";
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.065;
  bottle_group.add(inner_base_ring);

  const neck_glassGeom = new THREE.CylinderGeometry(
    0.26,
    0.26,
    0.57,
    64,
    1,
    true
  );
  const neck_glass = new THREE.Mesh(neck_glassGeom, bottle_bodyMat);
  neck_glass.name = "neck_glass";
  neck_glass.position.y = 1.915;
  bottle_group.add(neck_glass);

  const neck_base_ringGeom = new THREE.TorusGeometry(0.255, 0.014, 8, 48);
  const neck_base_ring = new THREE.Mesh(neck_base_ringGeom, dark_glassMat);
  neck_base_ring.name = "neck_base_ring";
  neck_base_ring.rotation.x = Math.PI / 2;
  neck_base_ring.position.y = 1.65;
  bottle_group.add(neck_base_ring);

  const mouth_rimGeom = new THREE.TorusGeometry(0.315, 0.075, 18, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, dark_glassMat);
  mouth_rim.name = "mouth_rim";
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 2.20;
  bottle_group.add(mouth_rim);

  const inner_mouth_ringGeom = new THREE.TorusGeometry(0.245, 0.018, 10, 48);
  const inner_mouth_ring = new THREE.Mesh(inner_mouth_ringGeom, dark_glassMat);
  inner_mouth_ring.name = "inner_mouth_ring";
  inner_mouth_ring.rotation.x = Math.PI / 2;
  inner_mouth_ring.position.y = 2.205;
  bottle_group.add(inner_mouth_ring);

  const corkBottomY = 2.07;
  const corkTopY = 2.68;
  const corkHeight = corkTopY - corkBottomY;
  const corkBottomR = 0.245;
  const corkTopR = 0.30;

  const cork_stoppperGeom = new THREE.CylinderGeometry(
    corkTopR,
    corkBottomR,
    corkHeight,
    48,
    4,
    false
  );
  const cork_stoppper = new THREE.Mesh(cork_stoppperGeom, cork_stoppperMat);
  cork_stoppper.name = "cork_stoppper";
  cork_stoppper.position.y = (corkBottomY + corkTopY) / 2;
  stopper_group.add(cork_stoppper);

  const cork_topGeom = new THREE.CylinderGeometry(0.298, 0.30, 0.014, 48);
  const cork_top = new THREE.Mesh(cork_topGeom, cork_topMat);
  cork_top.name = "cork_top";
  cork_top.position.y = corkTopY + 0.005;
  stopper_group.add(cork_top);

  function corkRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y - corkBottomY) / corkHeight));
    return corkBottomR + (corkTopR - corkBottomR) * t;
  }

  const sideFleckCount = 58;
  const cork_side_flecksGeom = new THREE.CircleGeometry(1, 8);
  const cork_side_flecks = new THREE.InstancedMesh(
    cork_side_flecksGeom,
    cork_fleckMat,
    sideFleckCount
  );
  cork_side_flecks.name = "cork_side_flecks";

  const fleckMatrix = new THREE.Matrix4();
  const fleckPosition = new THREE.Vector3();
  const fleckQuaternion = new THREE.Quaternion();
  const fleckScale = new THREE.Vector3();
  const radialNormal = new THREE.Vector3();
  const circleNormal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < sideFleckCount; i++) {
    const angle = i * 2.399963229728653;
    const sequence = (i * 17) % sideFleckCount;
    const t = (sequence + 0.5) / sideFleckCount;
    const y = corkBottomY + 0.018 + t * (corkHeight - 0.042);
    const radius = corkRadiusAt(y) + 0.0025;

    radialNormal.set(Math.cos(angle), 0, Math.sin(angle));
    fleckPosition.set(
      radialNormal.x * radius,
      y,
      radialNormal.z * radius
    );
    fleckQuaternion.setFromUnitVectors(circleNormal, radialNormal);
    fleckScale.set(
      0.012 + ((i * 7) % 9) * 0.0023,
      0.006 + ((i * 5) % 7) * 0.0018,
      1
    );
    fleckMatrix.compose(fleckPosition, fleckQuaternion, fleckScale);
    cork_side_flecks.setMatrixAt(i, fleckMatrix);
  }
  cork_side_flecks.instanceMatrix.needsUpdate = true;
  stopper_group.add(cork_side_flecks);

  const side_cracks = new THREE.Group();
  side_cracks.name = "side_cracks";
  for (let i = 0; i < 10; i++) {
    const points = [];
    const baseAngle = 0.35 + i * 0.57;
    const startY = 2.12 + (i % 4) * 0.105;
    for (let j = 0; j < 5; j++) {
      const y = Math.min(corkTopY - 0.035, startY + j * 0.027);
      const angle = baseAngle + Math.sin((i + 2) * (j + 1)) * 0.022;
      const radius = corkRadiusAt(y) + 0.003;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    const crackGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      12,
      0.0032,
      5,
      false
    );
    const crack = new THREE.Mesh(crackGeom, cork_fleckMat);
    side_cracks.add(crack);
  }
  stopper_group.add(side_cracks);

  const topFleckCount = 22;
  const cork_top_flecksGeom = new THREE.CircleGeometry(1, 8);
  const cork_top_flecks = new THREE.InstancedMesh(
    cork_top_flecksGeom,
    cork_fleckMat,
    topFleckCount
  );
  cork_top_flecks.name = "cork_top_flecks";

  const topQuaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );

  for (let i = 0; i < topFleckCount; i++) {
    const angle = i * 2.399963229728653;
    const radialFraction = ((i * 11) % 23) / 23;
    const radius = 0.025 + radialFraction * 0.235;
    fleckPosition.set(
      Math.cos(angle) * radius,
      corkTopY + 0.0125,
      Math.sin(angle) * radius
    );
    fleckScale.set(
      0.010 + ((i * 3) % 8) * 0.0025,
      0.006 + ((i * 5) % 6) * 0.002,
      1
    );
    fleckMatrix.compose(fleckPosition, topQuaternion, fleckScale);
    cork_top_flecks.setMatrixAt(i, fleckMatrix);
  }
  cork_top_flecks.instanceMatrix.needsUpdate = true;
  stopper_group.add(cork_top_flecks);

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