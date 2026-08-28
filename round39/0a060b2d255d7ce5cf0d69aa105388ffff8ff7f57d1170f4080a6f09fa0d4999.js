export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "beetroot";

  const root_object = new THREE.Group();
  root_object.name = "root_object";
  root_object.rotation.x = 0.10;
  root_object.rotation.z = 0.92;
  root.add(root_object);

  const bulbMat = new THREE.MeshStandardMaterial({
    color: 0x68113f,
    metalness: 0.0,
    roughness: 0.46,
  });
  const rootMat = new THREE.MeshStandardMaterial({
    color: 0x7c174d,
    metalness: 0.0,
    roughness: 0.55,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x9f1757,
    metalness: 0.0,
    roughness: 0.72,
  });
  const stemHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xc03a76,
    metalness: 0.0,
    roughness: 0.72,
  });
  const collarMat = new THREE.MeshStandardMaterial({
    color: 0x493523,
    metalness: 0.0,
    roughness: 0.95,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x78964d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const veinMat = new THREE.MeshStandardMaterial({
    color: 0xa32262,
    metalness: 0.0,
    roughness: 0.8,
  });
  const pinkSpeckleMat = new THREE.MeshStandardMaterial({
    color: 0xd64b78,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const tanSpeckleMat = new THREE.MeshStandardMaterial({
    color: 0xb58b55,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x9b7145,
    metalness: 0.0,
    roughness: 0.9,
  });
  const rootFiberMat = new THREE.MeshStandardMaterial({
    color: 0x80603c,
    metalness: 0.0,
    roughness: 0.95,
  });
  const darkRootMat = new THREE.MeshStandardMaterial({
    color: 0x4d2b20,
    metalness: 0.0,
    roughness: 0.95,
  });

  const bulbProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.025, -0.47),
    new THREE.Vector2(0.075, -0.42),
    new THREE.Vector2(0.18, -0.33),
    new THREE.Vector2(0.31, -0.20),
    new THREE.Vector2(0.405, -0.02),
    new THREE.Vector2(0.42, 0.14),
    new THREE.Vector2(0.37, 0.29),
    new THREE.Vector2(0.27, 0.40),
    new THREE.Vector2(0.14, 0.46),
    new THREE.Vector2(0.025, 0.48),
  ]).getSpacedPoints(48);
  const bulbGeom = new THREE.LatheGeometry(bulbProfile, 48);
  const bulb = new THREE.Mesh(bulbGeom, bulbMat);
  bulb.name = "bulb";
  root_object.add(bulb);

  function bulbRadiusAt(y) {
    if (y <= -0.47) return 0.025;
    if (y >= 0.48) return 0.025;
    for (let i = 0; i < bulbProfile.length - 1; i++) {
      const a = bulbProfile[i];
      const b = bulbProfile[i + 1];
      if (y >= a.y && y <= b.y) {
        const t = (y - a.y) / (b.y - a.y || 1);
        return a.x + (b.x - a.x) * t;
      }
    }
    return 0.025;
  }

  function bulbSurfacePose(angle, y, extra) {
    const radius = bulbRadiusAt(y);
    const epsilon = 0.004;
    const slope =
      (bulbRadiusAt(y + epsilon) - bulbRadiusAt(y - epsilon)) /
      (epsilon * 2);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -slope,
      Math.sin(angle)
    ).normalize();
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ).addScaledVector(normal, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function setSurfaceInstance(mesh, index, angle, y, sx, sy, rotation, extra) {
    const pose = bulbSurfacePose(angle, y, extra);
    const localRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rotation
    );
    pose.quaternion.multiply(localRotation);
    const matrix = new THREE.Matrix4();
    matrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
    mesh.setMatrixAt(index, matrix);
  }

  const speckleGeom = new THREE.CircleGeometry(1, 12);
  const pink_speckles = new THREE.InstancedMesh(
    speckleGeom,
    pinkSpeckleMat,
    24
  );
  pink_speckles.name = "pink_speckles";
  for (let i = 0; i < 24; i++) {
    const y = -0.31 + (((i * 7) % 25) / 24) * 0.64;
    const angle = 0.25 + (((i * 11) % 29) / 28) * 2.62;
    const size = 0.007 + ((i * 5) % 7) * 0.0015;
    setSurfaceInstance(
      pink_speckles,
      i,
      angle,
      y,
      size * (0.75 + (i % 3) * 0.18),
      size,
      (i % 9) * 0.37,
      0.004
    );
  }
  pink_speckles.instanceMatrix.needsUpdate = true;
  root_object.add(pink_speckles);

  const tan_speckles = new THREE.InstancedMesh(
    speckleGeom,
    tanSpeckleMat,
    16
  );
  tan_speckles.name = "tan_speckles";
  for (let i = 0; i < 16; i++) {
    const y = -0.34 + (((i * 9) % 17) / 16) * 0.69;
    const angle = 0.34 + (((i * 13) % 19) / 18) * 2.45;
    const size = 0.006 + ((i * 3) % 6) * 0.0018;
    setSurfaceInstance(
      tan_speckles,
      i,
      angle,
      y,
      size * (0.8 + (i % 4) * 0.2),
      size,
      (i % 7) * 0.48,
      0.0045
    );
  }
  tan_speckles.instanceMatrix.needsUpdate = true;
  root_object.add(tan_speckles);

  const surface_scratches = new THREE.Group();
  surface_scratches.name = "surface_scratches";
  for (let i = 0; i < 6; i++) {
    const points = [];
    const baseAngle = 0.55 + i * 0.38;
    const baseY = -0.23 + i * 0.075;
    for (let j = 0; j < 6; j++) {
      const t = j / 5;
      const angle =
        baseAngle + (t - 0.5) * (0.11 + (i % 2) * 0.05) +
        Math.sin((i + 1) * (j + 1) * 0.7) * 0.012;
      const y =
        baseY + (t - 0.5) * 0.075 +
        Math.sin(t * Math.PI) * 0.012;
      points.push(bulbSurfacePose(angle, y, 0.005).position);
    }
    const scratchGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      14,
      0.0022,
      5,
      false
    );
    const scratch = new THREE.Mesh(scratchGeom, scratchMat);
    scratch.name = "surface_scratch_" + i;
    surface_scratches.add(scratch);
  }
  root_object.add(surface_scratches);

  const taprootProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.072, -0.43),
    new THREE.Vector2(0.064, -0.49),
    new THREE.Vector2(0.052, -0.57),
    new THREE.Vector2(0.040, -0.66),
    new THREE.Vector2(0.028, -0.75),
    new THREE.Vector2(0.015, -0.84),
    new THREE.Vector2(0.006, -0.90),
    new THREE.Vector2(0.001, -0.93),
  ]).getSpacedPoints(32);
  const taprootGeom = new THREE.LatheGeometry(taprootProfile, 24);
  const taproot = new THREE.Mesh(taprootGeom, rootMat);
  taproot.name = "taproot";
  root_object.add(taproot);

  const root_wrinkleGeom = new THREE.TorusGeometry(1, 0.035, 6, 24);
  const taproot_wrinkles = new THREE.InstancedMesh(
    root_wrinkleGeom,
    darkRootMat,
    7
  );
  taproot_wrinkles.name = "taproot_wrinkles";
  for (let i = 0; i < 7; i++) {
    const y = -0.49 - i * 0.064;
    const radius = 0.068 * Math.pow(0.78, i);
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(0, y, 0),
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(Math.PI / 2, 0, 0)
      ),
      new THREE.Vector3(radius, radius, radius)
    );
    taproot_wrinkles.setMatrixAt(i, matrix);
  }
  taproot_wrinkles.instanceMatrix.needsUpdate = true;
  root_object.add(taproot_wrinkles);

  function createRootFiber(name, points, radius, material) {
    const geometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      18,
      radius,
      5,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    root_object.add(mesh);
    return mesh;
  }

  const root_fiber_1 = createRootFiber(
    "root_fiber_1",
    [
      new THREE.Vector3(0, -0.68, 0.018),
      new THREE.Vector3(0.045, -0.70, 0.025),
      new THREE.Vector3(0.082, -0.75, 0.020),
      new THREE.Vector3(0.105, -0.81, 0.012),
      new THREE.Vector3(0.085, -0.86, 0.006),
    ],
    0.0032,
    rootFiberMat
  );

  const root_fiber_2 = createRootFiber(
    "root_fiber_2",
    [
      new THREE.Vector3(0.005, -0.73, -0.012),
      new THREE.Vector3(-0.045, -0.75, -0.018),
      new THREE.Vector3(-0.080, -0.80, -0.012),
      new THREE.Vector3(-0.105, -0.85, -0.004),
    ],
    0.0028,
    rootFiberMat
  );

  const root_fiber_3 = createRootFiber(
    "root_fiber_3",
    [
      new THREE.Vector3(-0.012, -0.55, 0.030),
      new THREE.Vector3(-0.060, -0.58, 0.042),
      new THREE.Vector3(-0.095, -0.63, 0.035),
      new THREE.Vector3(-0.115, -0.69, 0.022),
    ],
    0.003,
    rootFiberMat
  );

  const root_fiber_4 = createRootFiber(
    "root_fiber_4",
    [
      new THREE.Vector3(0.012, -0.80, 0.004),
      new THREE.Vector3(0.040, -0.83, 0.012),
      new THREE.Vector3(0.055, -0.88, 0.008),
      new THREE.Vector3(0.045, -0.92, 0.002),
    ],
    0.0025,
    rootFiberMat
  );

  const root_fiber_5 = createRootFiber(
    "root_fiber_5",
    [
      new THREE.Vector3(0, -0.86, -0.003),
      new THREE.Vector3(-0.022, -0.88, -0.006),
      new THREE.Vector3(-0.035, -0.92, -0.003),
      new THREE.Vector3(-0.028, -0.95, 0),
    ],
    0.0022,
    rootFiberMat
  );

  const root_fiber_6 = createRootFiber(
    "root_fiber_6",
    [
      new THREE.Vector3(0.018, -0.61, -0.025),
      new THREE.Vector3(0.055, -0.64, -0.045),
      new THREE.Vector3(0.085, -0.69, -0.038),
      new THREE.Vector3(0.115, -0.72, -0.018),
    ],
    0.0026,
    darkRootMat
  );

  const root_fiber_7 = createRootFiber(
    "root_fiber_7",
    [
      new THREE.Vector3(-0.018, -0.77, 0.012),
      new THREE.Vector3(-0.055, -0.79, 0.035),
      new THREE.Vector3(-0.090, -0.82, 0.045),
      new THREE.Vector3(-0.120, -0.84, 0.030),
    ],
    0.0024,
    darkRootMat
  );

  const root_fiber_8 = createRootFiber(
    "root_fiber_8",
    [
      new THREE.Vector3(0.005, -0.48, 0.045),
      new THREE.Vector3(0.045, -0.51, 0.072),
      new THREE.Vector3(0.080, -0.56, 0.075),
      new THREE.Vector3(0.105, -0.61, 0.052),
    ],
    0.0028,
    rootFiberMat
  );

  const root_fiber_9 = createRootFiber(
    "root_fiber_9",
    [
      new THREE.Vector3(-0.006, -0.66, 0.032),
      new THREE.Vector3(-0.035, -0.70, 0.070),
      new THREE.Vector3(-0.070, -0.75, 0.082),
      new THREE.Vector3(-0.105, -0.78, 0.060),
    ],
    0.0025,
    rootFiberMat
  );

  const root_fiber_10 = createRootFiber(
    "root_fiber_10",
    [
      new THREE.Vector3(0.008, -0.54, -0.035),
      new THREE.Vector3(0.030, -0.58, -0.072),
      new THREE.Vector3(0.065, -0.63, -0.082),
      new THREE.Vector3(0.095, -0.67, -0.055),
    ],
    0.0023,
    darkRootMat
  );

  const root_fiber_11 = createRootFiber(
    "root_fiber_11",
    [
      new THREE.Vector3(-0.004, -0.82, 0.006),
      new THREE.Vector3(0.020, -0.85, 0.035),
      new THREE.Vector3(0.050, -0.89, 0.045),
      new THREE.Vector3(0.075, -0.92, 0.025),
    ],
    0.0021,
    rootFiberMat
  );

  const root_fiber_12 = createRootFiber(
    "root_fiber_12",
    [
      new THREE.Vector3(0, -0.72, -0.010),
      new THREE.Vector3(-0.020, -0.76, -0.040),
      new THREE.Vector3(-0.045, -0.81, -0.055),
      new THREE.Vector3(-0.070, -0.86, -0.035),
    ],
    0.0020,
    darkRootMat
  );

  const root_tipGeom = new THREE.DodecahedronGeometry(0.024, 0);
  const root_tip = new THREE.Mesh(root_tipGeom, darkRootMat);
  root_tip.name = "root_tip";
  root_tip.position.set(-0.004, -0.936, 0);
  root_tip.scale.set(0.75, 0.45, 0.7);
  root_object.add(root_tip);

  const crown_collarGeom = new THREE.CylinderGeometry(
    0.09,
    0.135,
    0.10,
    16
  );
  const crown_collar = new THREE.Mesh(crown_collarGeom, collarMat);
  crown_collar.name = "crown_collar";
  crown_collar.position.y = 0.48;
  root_object.add(crown_collar);

  const crown_rimGeom = new THREE.TorusGeometry(0.09, 0.016, 8, 24);
  const crown_rim = new THREE.Mesh(crown_rimGeom, collarMat);
  crown_rim.name = "crown_rim";
  crown_rim.rotation.x = Math.PI / 2;
  crown_rim.position.y = 0.53;
  root_object.add(crown_rim);

  const crown_debrisGeom = new THREE.DodecahedronGeometry(1, 0);
  const crown_debris = new THREE.InstancedMesh(
    crown_debrisGeom,
    collarMat,
    12
  );
  crown_debris.name = "crown_debris";
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 0.105 + (i % 3) * 0.012;
    const size = 0.012 + (i % 4) * 0.003;
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0.465 + (i % 3) * 0.022,
        Math.sin(angle) * radius
      ),
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(i * 0.31, angle, i * 0.19)
      ),
      new THREE.Vector3(size, size * 0.75, size * 0.65)
    );
    crown_debris.setMatrixAt(i, matrix);
  }
  crown_debris.instanceMatrix.needsUpdate = true;
  root_object.add(crown_debris);

  function createStem(name, points, radius) {
    const geometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      24,
      radius,
      8,
      false
    );
    const mesh = new THREE.Mesh(geometry, stemMat);
    mesh.name = name;
    root_object.add(mesh);
    return mesh;
  }

  const stem_1 = createStem(
    "stem_1",
    [
      new THREE.Vector3(-0.075, 0.46, -0.015),
      new THREE.Vector3(-0.11, 0.57, -0.01),
      new THREE.Vector3(-0.17, 0.72, 0.005),
      new THREE.Vector3(-0.23, 0.86, 0.015),
      new THREE.Vector3(-0.27, 0.99, 0.02),
    ],
    0.019
  );

  const stem_2 = createStem(
    "stem_2",
    [
      new THREE.Vector3(-0.045, 0.47, 0.035),
      new THREE.Vector3(-0.06, 0.61, 0.05),
      new THREE.Vector3(-0.08, 0.78, 0.065),
      new THREE.Vector3(-0.10, 0.92, 0.07),
    ],
    0.021
  );

  const stem_3 = createStem(
    "stem_3",
    [
      new THREE.Vector3(-0.015, 0.47, -0.045),
      new THREE.Vector3(0.015, 0.61, -0.06),
      new THREE.Vector3(0.06, 0.77, -0.065),
      new THREE.Vector3(0.11, 0.91, -0.055),
      new THREE.Vector3(0.15, 1.00, -0.04),
    ],
    0.020
  );

  const stem_4 = createStem(
    "stem_4",
    [
      new THREE.Vector3(0.02, 0.47, 0.045),
      new THREE.Vector3(0.055, 0.59, 0.065),
      new THREE.Vector3(0.11, 0.72, 0.08),
      new THREE.Vector3(0.17, 0.83, 0.07),
      new THREE.Vector3(0.21, 0.93, 0.05),
    ],
    0.021
  );

  const stem_5 = createStem(
    "stem_5",
    [
      new THREE.Vector3(0.055, 0.46, -0.01),
      new THREE.Vector3(0.10, 0.57, -0.005),
      new THREE.Vector3(0.17, 0.69, 0.01),
      new THREE.Vector3(0.25, 0.80, 0.02),
      new THREE.Vector3(0.32, 0.90, 0.025),
    ],
    0.020
  );

  const stem_6 = createStem(
    "stem_6",
    [
      new THREE.Vector3(0.075, 0.46, 0.025),
      new THREE.Vector3(0.13, 0.55, 0.04),
      new THREE.Vector3(0.20, 0.65, 0.055),
      new THREE.Vector3(0.28, 0.75, 0.05),
      new THREE.Vector3(0.35, 0.84, 0.04),
    ],
    0.019
  );

  const stem_7 = createStem(
    "stem_7",
    [
      new THREE.Vector3(0.015, 0.46, 0.075),
      new THREE.Vector3(0.025, 0.56, 0.11),
      new THREE.Vector3(0.05, 0.68, 0.145),
      new THREE.Vector3(0.08, 0.79, 0.15),
      new THREE.Vector3(0.10, 0.88, 0.14),
    ],
    0.018
  );

  const stem_8 = createStem(
    "stem_8",
    [
      new THREE.Vector3(-0.025, 0.46, -0.07),
      new THREE.Vector3(-0.08, 0.56, -0.10),
      new THREE.Vector3(-0.14, 0.68, -0.13),
      new THREE.Vector3(-0.21, 0.80, -0.13),
      new THREE.Vector3(-0.28, 0.91, -0.11),
    ],
    0.018
  );

  const stem_9 = createStem(
    "stem_9",
    [
      new THREE.Vector3(0.04, 0.46, -0.065),
      new THREE.Vector3(0.09, 0.58, -0.09),
      new THREE.Vector3(0.15, 0.71, -0.11),
      new THREE.Vector3(0.22, 0.84, -0.10),
      new THREE.Vector3(0.30, 0.96, -0.08),
    ],
    0.018
  );

  const stem_10 = createStem(
    "stem_10",
    [
      new THREE.Vector3(-0.06, 0.46, 0.015),
      new THREE.Vector3(-0.14, 0.57, 0.025),
      new THREE.Vector3(-0.23, 0.69, 0.035),
      new THREE.Vector3(-0.32, 0.81, 0.04),
      new THREE.Vector3(-0.39, 0.93, 0.035),
    ],
    0.017
  );

  const stem_11 = createStem(
    "stem_11",
    [
      new THREE.Vector3(0.065, 0.46, 0.01),
      new THREE.Vector3(0.15, 0.56, 0.015),
      new THREE.Vector3(0.25, 0.66, 0.02),
      new THREE.Vector3(0.36, 0.76, 0.015),
      new THREE.Vector3(0.45, 0.86, 0.01),
    ],
    0.017
  );

  const stem_12 = createStem(
    "stem_12",
    [
      new THREE.Vector3(-0.01, 0.46, 0.065),
      new THREE.Vector3(0.01, 0.57, 0.105),
      new THREE.Vector3(0.03, 0.69, 0.145),
      new THREE.Vector3(0.06, 0.81, 0.17),
      new THREE.Vector3(0.09, 0.93, 0.16),
    ],
    0.017
  );

  const stem_13 = createStem(
    "stem_13",
    [
      new THREE.Vector3(-0.035, 0.46, -0.035),
      new THREE.Vector3(-0.02, 0.59, -0.055),
      new THREE.Vector3(0.01, 0.72, -0.075),
      new THREE.Vector3(0.05, 0.85, -0.08),
      new THREE.Vector3(0.08, 0.97, -0.07),
    ],
    0.017
  );

  const stem_14 = createStem(
    "stem_14",
    [
      new THREE.Vector3(0.035, 0.46, 0.055),
      new THREE.Vector3(0.09, 0.57, 0.09),
      new THREE.Vector3(0.15, 0.68, 0.12),
      new THREE.Vector3(0.22, 0.79, 0.13),
      new THREE.Vector3(0.30, 0.89, 0.11),
    ],
    0.016
  );

  const stem_15 = createStem(
    "stem_15",
    [
      new THREE.Vector3(-0.05, 0.46, -0.045),
      new THREE.Vector3(-0.12, 0.55, -0.075),
      new THREE.Vector3(-0.20, 0.65, -0.10),
      new THREE.Vector3(-0.30, 0.75, -0.10),
      new THREE.Vector3(-0.39, 0.84, -0.08),
    ],
    0.016
  );

  const stem_16 = createStem(
    "stem_16",
    [
      new THREE.Vector3(0.05, 0.46, -0.025),
      new THREE.Vector3(0.12, 0.57, -0.035),
      new THREE.Vector3(0.21, 0.68, -0.045),
      new THREE.Vector3(0.31, 0.78, -0.04),
      new THREE.Vector3(0.41, 0.88, -0.025),
    ],
    0.016
  );

  const stem_17 = createStem(
    "stem_17",
    [
      new THREE.Vector3(-0.015, 0.46, 0.045),
      new THREE.Vector3(-0.055, 0.56, 0.075),
      new THREE.Vector3(-0.10, 0.67, 0.105),
      new THREE.Vector3(-0.16, 0.78, 0.12),
      new THREE.Vector3(-0.23, 0.89, 0.11),
    ],
    0.016
  );

  const stem_18 = createStem(
    "stem_18",
    [
      new THREE.Vector3(0.015, 0.46, -0.04),
      new THREE.Vector3(0.04, 0.58, -0.065),
      new THREE.Vector3(0.08, 0.70, -0.09),
      new THREE.Vector3(0.13, 0.82, -0.10),
      new THREE.Vector3(0.20, 0.94, -0.08),
    ],
    0.016
  );

  const stem_19 = createStem(
    "stem_19",
    [
      new THREE.Vector3(-0.045, 0.46, 0.04),
      new THREE.Vector3(-0.10, 0.58, 0.07),
      new THREE.Vector3(-0.17, 0.70, 0.10),
      new THREE.Vector3(-0.25, 0.82, 0.11),
      new THREE.Vector3(-0.34, 0.94, 0.09),
    ],
    0.015
  );

  const stem_20 = createStem(
    "stem_20",
    [
      new THREE.Vector3(0.045, 0.46, 0.035),
      new THREE.Vector3(0.11, 0.57, 0.06),
      new THREE.Vector3(0.19, 0.68, 0.085),
      new THREE.Vector3(0.28, 0.79, 0.09),
      new THREE.Vector3(0.38, 0.90, 0.07),
    ],
    0.015
  );

  const stemPaths = [
    [
      new THREE.Vector3(-0.075, 0.46, -0.015),
      new THREE.Vector3(-0.11, 0.57, -0.01),
      new THREE.Vector3(-0.17, 0.72, 0.005),
      new THREE.Vector3(-0.23, 0.86, 0.015),
      new THREE.Vector3(-0.27, 0.99, 0.02),
    ],
    [
      new THREE.Vector3(-0.045, 0.47, 0.035),
      new THREE.Vector3(-0.06, 0.61, 0.05),
      new THREE.Vector3(-0.08, 0.78, 0.065),
      new THREE.Vector3(-0.10, 0.92, 0.07),
    ],
    [
      new THREE.Vector3(-0.015, 0.47, -0.045),
      new THREE.Vector3(0.015, 0.61, -0.06),
      new THREE.Vector3(0.06, 0.77, -0.065),
      new THREE.Vector3(0.11, 0.91, -0.055),
      new THREE.Vector3(0.15, 1.00, -0.04),
    ],
    [
      new THREE.Vector3(0.02, 0.47, 0.045),
      new THREE.Vector3(0.055, 0.59, 0.065),
      new THREE.Vector3(0.11, 0.72, 0.08),
      new THREE.Vector3(0.17, 0.83, 0.07),
      new THREE.Vector3(0.21, 0.93, 0.05),
    ],
    [
      new THREE.Vector3(0.055, 0.46, -0.01),
      new THREE.Vector3(0.10, 0.57, -0.005),
      new THREE.Vector3(0.17, 0.69, 0.01),
      new THREE.Vector3(0.25, 0.80, 0.02),
      new THREE.Vector3(0.32, 0.90, 0.025),
    ],
    [
      new THREE.Vector3(0.075, 0.46, 0.025),
      new THREE.Vector3(0.13, 0.55, 0.04),
      new THREE.Vector3(0.20, 0.65, 0.055),
      new THREE.Vector3(0.28, 0.75, 0.05),
      new THREE.Vector3(0.35, 0.84, 0.04),
    ],
    [
      new THREE.Vector3(0.015, 0.46, 0.075),
      new THREE.Vector3(0.025, 0.56, 0.11),
      new THREE.Vector3(0.05, 0.68, 0.145),
      new THREE.Vector3(0.08, 0.79, 0.15),
      new THREE.Vector3(0.10, 0.88, 0.14),
    ],
    [
      new THREE.Vector3(-0.025, 0.46, -0.07),
      new THREE.Vector3(-0.08, 0.56, -0.10),
      new THREE.Vector3(-0.14, 0.68, -0.13),
      new THREE.Vector3(-0.21, 0.80, -0.13),
      new THREE.Vector3(-0.28, 0.91, -0.11),
    ],
    [
      new THREE.Vector3(0.04, 0.46, -0.065),
      new THREE.Vector3(0.09, 0.58, -0.09),
      new THREE.Vector3(0.15, 0.71, -0.11),
      new THREE.Vector3(0.22, 0.84, -0.10),
      new THREE.Vector3(0.30, 0.96, -0.08),
    ],
    [
      new THREE.Vector3(-0.06, 0.46, 0.015),
      new THREE.Vector3(-0.14, 0.57, 0.025),
      new THREE.Vector3(-0.23, 0.69, 0.035),
      new THREE.Vector3(-0.32, 0.81, 0.04),
      new THREE.Vector3(-0.39, 0.93, 0.035),
    ],
    [
      new THREE.Vector3(0.065, 0.46, 0.01),
      new THREE.Vector3(0.15, 0.56, 0.015),
      new THREE.Vector3(0.25, 0.66, 0.02),
      new THREE.Vector3(0.36, 0.76, 0.015),
      new THREE.Vector3(0.45, 0.86, 0.01),
    ],
    [
      new THREE.Vector3(-0.01, 0.46, 0.065),
      new THREE.Vector3(0.01, 0.57, 0.105),
      new THREE.Vector3(0.03, 0.69, 0.145),
      new THREE.Vector3(0.06, 0.81, 0.17),
      new THREE.Vector3(0.09, 0.93, 0.16),
    ],
    [
      new THREE.Vector3(-0.035, 0.46, -0.035),
      new THREE.Vector3(-0.02, 0.59, -0.055),
      new THREE.Vector3(0.01, 0.72, -0.075),
      new THREE.Vector3(0.05, 0.85, -0.08),
      new THREE.Vector3(0.08, 0.97, -0.07),
    ],
    [
      new THREE.Vector3(0.035, 0.46, 0.055),
      new THREE.Vector3(0.09, 0.57, 0.09),
      new THREE.Vector3(0.15, 0.68, 0.12),
      new THREE.Vector3(0.22, 0.79, 0.13),
      new THREE.Vector3(0.30, 0.89, 0.11),
    ],
    [
      new THREE.Vector3(-0.05, 0.46, -0.045),
      new THREE.Vector3(-0.12, 0.55, -0.075),
      new THREE.Vector3(-0.20, 0.65, -0.10),
      new THREE.Vector3(-0.30, 0.75, -0.10),
      new THREE.Vector3(-0.39, 0.84, -0.08),
    ],
    [
      new THREE.Vector3(0.05, 0.46, -0.025),
      new THREE.Vector3(0.12, 0.57, -0.035),
      new THREE.Vector3(0.21, 0.68, -0.045),
      new THREE.Vector3(0.31, 0.78, -0.04),
      new THREE.Vector3(0.41, 0.88, -0.025),
    ],
    [
      new THREE.Vector3(-0.015, 0.46, 0.045),
      new THREE.Vector3(-0.055, 0.56, 0.075),
      new THREE.Vector3(-0.10, 0.67, 0.105),
      new THREE.Vector3(-0.16, 0.78, 0.12),
      new THREE.Vector3(-0.23, 0.89, 0.11),
    ],
    [
      new THREE.Vector3(0.015, 0.46, -0.04),
      new THREE.Vector3(0.04, 0.58, -0.065),
      new THREE.Vector3(0.08, 0.70, -0.09),
      new THREE.Vector3(0.13, 0.82, -0.10),
      new THREE.Vector3(0.20, 0.94, -0.08),
    ],
    [
      new THREE.Vector3(-0.045, 0.46, 0.04),
      new THREE.Vector3(-0.10, 0.58, 0.07),
      new THREE.Vector3(-0.17, 0.70, 0.10),
      new THREE.Vector3(-0.25, 0.82, 0.11),
      new THREE.Vector3(-0.34, 0.94, 0.09),
    ],
    [
      new THREE.Vector3(0.045, 0.46, 0.035),
      new THREE.Vector3(0.11, 0.57, 0.06),
      new THREE.Vector3(0.19, 0.68, 0.085),
      new THREE.Vector3(0.28, 0.79, 0.09),
      new THREE.Vector3(0.38, 0.90, 0.07),
    ],
  ];

  const stem_ridges = new THREE.Group();
  stem_ridges.name = "stem_ridges";
  for (let i = 0; i < stemPaths.length; i++) {
    const source = stemPaths[i];
    const points = [];
    for (let j = 0; j < source.length; j++) {
      points.push(
        new THREE.Vector3(
          source[j].x,
          source[j].y,
          source[j].z + 0.017
        )
      );
    }
    const ridgeGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      20,
      0.0022,
      5,
      false
    );
    const ridge = new THREE.Mesh(ridgeGeom, stemHighlightMat);
    ridge.name = "stem_ridge_" + i;
    stem_ridges.add(ridge);
  }
  root_object.add(stem_ridges);

  const leaf_bladeShape = new THREE.Shape();
  leaf_bladeShape.moveTo(-0.024, 0);
  leaf_bladeShape.lineTo(-0.045, 0.045);
  leaf_bladeShape.lineTo(-0.075, 0.085);
  leaf_bladeShape.lineTo(-0.062, 0.12);
  leaf_bladeShape.lineTo(-0.105, 0.16);
  leaf_bladeShape.lineTo(-0.086, 0.195);
  leaf_bladeShape.lineTo(-0.12, 0.235);
  leaf_bladeShape.lineTo(-0.095, 0.27);
  leaf_bladeShape.lineTo(-0.11, 0.32);
  leaf_bladeShape.lineTo(-0.065, 0.305);
  leaf_bladeShape.lineTo(-0.035, 0.34);
  leaf_bladeShape.lineTo(0, 0.365);
  leaf_bladeShape.lineTo(0.035, 0.34);
  leaf_bladeShape.lineTo(0.065, 0.305);
  leaf_bladeShape.lineTo(0.11, 0.32);
  leaf_bladeShape.lineTo(0.095, 0.27);
  leaf_bladeShape.lineTo(0.12, 0.235);
  leaf_bladeShape.lineTo(0.086, 0.195);
  leaf_bladeShape.lineTo(0.105, 0.16);
  leaf_bladeShape.lineTo(0.062, 0.12);
  leaf_bladeShape.lineTo(0.075, 0.085);
  leaf_bladeShape.lineTo(0.045, 0.045);
  leaf_bladeShape.lineTo(0.024, 0);
  leaf_bladeShape.closePath();

  const leaf_bladeGeom = new THREE.ShapeGeometry(leaf_bladeShape, 1);
  const leaf_veinGeom = new THREE.CylinderGeometry(
    0.002,
    0.008,
    1,
    8
  );

  function createLeaf(name, base, direction, length, widthScale, roll) {
    const leaf = new THREE.Group();
    leaf.name = name;

    const axis = direction.clone().normalize();
    const preferredNormal = new THREE.Vector3(0, 0, 1);
    const normal = preferredNormal
      .clone()
      .sub(axis.clone().multiplyScalar(preferredNormal.dot(axis)))
      .normalize();
    const side = new THREE.Vector3()
      .crossVectors(axis, normal)
      .normalize();
    const basis = new THREE.Matrix4().makeBasis(side, axis, normal);
    leaf.quaternion.setFromRotationMatrix(basis);
    leaf.position.copy(base);
    leaf.rotateZ(roll);
    leaf.scale.setScalar(length / 0.365);

    const blade = new THREE.Mesh(leaf_bladeGeom, leafMat);
    blade.name = name + "_blade";
    leaf.add(blade);

    function addVein(x1, y1, x2, y2, radiusScale) {
      const start = new THREE.Vector3(x1, y1, 0.009);
      const end = new THREE.Vector3(x2, y2, 0.009);
      const delta = end.clone().sub(start);
      const vein = new THREE.Mesh(leaf_veinGeom, veinMat);
      vein.position.copy(start).add(end).multiplyScalar(0.5);
      vein.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        delta.clone().normalize()
      );
      vein.scale.set(radiusScale, delta.length(), radiusScale);
      leaf.add(vein);
    }

    addVein(0, 0.012, 0, 0.345, 1.0);
    addVein(0, 0.09, -0.065, 0.15, 0.62);
    addVein(0, 0.09, 0.065, 0.15, 0.62);
    addVein(0, 0.16, -0.09, 0.22, 0.55);
    addVein(0, 0.16, 0.09, 0.22, 0.55);
    addVein(0, 0.23, -0.072, 0.285, 0.48);
    addVein(0, 0.23, 0.072, 0.285, 0.48);
    addVein(0, 0.285, -0.045, 0.32, 0.4);
    addVein(0, 0.285, 0.045, 0.32, 0.4);

    root_object.add(leaf);
    return leaf;
  }

  const leaf_1 = createLeaf(
    "leaf_1",
    new THREE.Vector3(-0.075, 0.47, -0.025),
    new THREE.Vector3(-0.12, 0.99, -0.03),
    0.44,
    0.9,
    -0.15
  );

  const leaf_2 = createLeaf(
    "leaf_2",
    new THREE.Vector3(0.025, 0.47, 0.045),
    new THREE.Vector3(0.12, 0.99, 0.035),
    0.46,
    1.0,
    0.18
  );

  const leaf_3 = createLeaf(
    "leaf_3",
    new THREE.Vector3(0.055, 0.47, -0.035),
    new THREE.Vector3(0.30, 0.95, -0.04),
    0.43,
    0.95,
    0.45
  );

  fitToUnitCube(root);
  return root;

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
}