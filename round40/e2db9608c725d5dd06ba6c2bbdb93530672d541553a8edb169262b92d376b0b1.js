export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_pitcher";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xded8c5,
    metalness: 0.0,
    roughness: 0.4,
  });
  const clayMat = new THREE.MeshStandardMaterial({
    color: 0x9b714d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x827967,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xd8aaa7,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const petalOutlineMat = new THREE.MeshStandardMaterial({
    color: 0x875d5b,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const flowerCenterMat = new THREE.MeshStandardMaterial({
    color: 0xb77d78,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x587d73,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const leafOutlineMat = new THREE.MeshStandardMaterial({
    color: 0x355b55,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x496f65,
    metalness: 0.0,
    roughness: 0.4,
  });
  const crackMat = new THREE.MeshStandardMaterial({
    color: 0x39281d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const repairMat = new THREE.MeshStandardMaterial({
    color: 0xb9a084,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const speckleMat = new THREE.MeshStandardMaterial({
    color: 0x79583f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.40, 0.00),
    new THREE.Vector2(0.47, 0.025),
    new THREE.Vector2(0.49, 0.075),
    new THREE.Vector2(0.46, 0.14),
    new THREE.Vector2(0.40, 0.20),
    new THREE.Vector2(0.43, 0.28),
    new THREE.Vector2(0.55, 0.40),
    new THREE.Vector2(0.66, 0.62),
    new THREE.Vector2(0.73, 0.92),
    new THREE.Vector2(0.76, 1.25),
    new THREE.Vector2(0.73, 1.55),
    new THREE.Vector2(0.65, 1.82),
    new THREE.Vector2(0.53, 2.02),
    new THREE.Vector2(0.41, 2.15),
    new THREE.Vector2(0.37, 2.30),
    new THREE.Vector2(0.37, 2.50),
    new THREE.Vector2(0.40, 2.62),
    new THREE.Vector2(0.49, 2.68),
    new THREE.Vector2(0.52, 2.73),
    new THREE.Vector2(0.49, 2.78),
    new THREE.Vector2(0.40, 2.80),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const base_bandGeom = new THREE.CylinderGeometry(0.475, 0.465, 0.075, 64);
  const base_band = new THREE.Mesh(base_bandGeom, clayMat);
  base_band.name = "base_band";
  base_band.position.y = 0.0375;
  root.add(base_band);

  const base_footGeom = new THREE.TorusGeometry(0.445, 0.035, 12, 64);
  const base_foot = new THREE.Mesh(base_footGeom, bodyMat);
  base_foot.name = "base_foot";
  base_foot.rotation.x = Math.PI / 2;
  base_foot.position.y = 0.105;
  root.add(base_foot);

  const top_lipGeom = new THREE.TorusGeometry(0.455, 0.055, 16, 64);
  const top_lip = new THREE.Mesh(top_lipGeom, bodyMat);
  top_lip.name = "top_lip";
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 2.745;
  root.add(top_lip);

  const lip_stainGeom = new THREE.TorusGeometry(0.455, 0.009, 8, 64);
  const lip_stain = new THREE.Mesh(lip_stainGeom, clayMat);
  lip_stain.name = "lip_stain";
  lip_stain.rotation.x = Math.PI / 2;
  lip_stain.position.y = 2.786;
  root.add(lip_stain);

  const inner_wallGeom = new THREE.CylinderGeometry(0.395, 0.35, 0.10, 48, 1, true);
  const inner_wall = new THREE.Mesh(inner_wallGeom, interiorMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 2.70;
  root.add(inner_wall);

  const inner_openingGeom = new THREE.CircleGeometry(0.35, 48);
  const inner_opening = new THREE.Mesh(inner_openingGeom, interiorMat);
  inner_opening.name = "inner_opening";
  inner_opening.rotation.x = -Math.PI / 2;
  inner_opening.position.y = 2.655;
  root.add(inner_opening);

  const handlePath = [
    new THREE.Vector3(0.34, 2.49, -0.05),
    new THREE.Vector3(0.55, 2.62, -0.05),
    new THREE.Vector3(0.84, 2.57, -0.05),
    new THREE.Vector3(1.04, 2.36, -0.05),
    new THREE.Vector3(1.10, 2.08, -0.05),
    new THREE.Vector3(1.02, 1.80, -0.05),
    new THREE.Vector3(0.84, 1.56, -0.05),
    new THREE.Vector3(0.65, 1.49, -0.05),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(handlePath, false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handleCurve, 72, 0.105, 14, false);
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 16);
  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.39, 2.48, -0.035);
  upper_handle_mount.scale.set(0.18, 0.14, 0.14);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.65, 1.50, -0.035);
  lower_handle_mount.scale.set(0.18, 0.16, 0.15);
  root.add(lower_handle_mount);

  const radiusSamples = [
    [0.00, 0.40],
    [0.08, 0.48],
    [0.16, 0.44],
    [0.28, 0.43],
    [0.42, 0.56],
    [0.65, 0.67],
    [0.95, 0.74],
    [1.25, 0.76],
    [1.55, 0.73],
    [1.82, 0.65],
    [2.02, 0.53],
    [2.15, 0.41],
    [2.30, 0.37],
    [2.50, 0.37],
    [2.62, 0.40],
    [2.75, 0.50],
    [2.80, 0.40],
  ];

  function bodyRadiusAt(y) {
    if (y <= radiusSamples[0][0]) return radiusSamples[0][1];
    for (let i = 1; i < radiusSamples.length; i++) {
      if (y <= radiusSamples[i][0]) {
        const y0 = radiusSamples[i - 1][0];
        const r0 = radiusSamples[i - 1][1];
        const y1 = radiusSamples[i][0];
        const r1 = radiusSamples[i][1];
        const t = (y - y0) / (y1 - y0);
        return r0 + (r1 - r0) * t;
      }
    }
    return radiusSamples[radiusSamples.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  const localNormal = new THREE.Vector3(0, 0, 1);

  function surfacePose(angle, y, extra) {
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const position = surfacePoint(angle, y, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(localNormal, normal);
    return { position, quaternion };
  }

  function makeSurfaceVine(angle0, y0, angle1, y1, bend) {
    const points = [];
    for (let i = 0; i <= 18; i++) {
      const t = i / 18;
      const angle = angle0 + (angle1 - angle0) * t +
        Math.sin(t * Math.PI) * bend;
      const y = y0 + (y1 - y0) * t;
      points.push(surfacePoint(angle, y, 0.012));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, 40, 0.008, 6, false);
    return new THREE.Mesh(geometry, stemMat);
  }

  const main_vine = makeSurfaceVine(1.48, 0.38, 1.36, 1.52, 0.12);
  main_vine.name = "main_vine";
  root.add(main_vine);

  const right_vine = makeSurfaceVine(1.30, 0.52, 0.72, 1.72, -0.12);
  right_vine.name = "right_vine";
  root.add(right_vine);

  const left_vine = makeSurfaceVine(2.25, 0.66, 2.18, 1.72, 0.10);
  left_vine.name = "left_vine";
  root.add(left_vine);

  const lower_vine = makeSurfaceVine(1.52, 0.42, 0.86, 0.79, -0.08);
  lower_vine.name = "lower_vine";
  root.add(lower_vine);

  const upper_vine = makeSurfaceVine(1.48, 1.43, 1.96, 1.96, 0.08);
  upper_vine.name = "upper_vine";
  root.add(upper_vine);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, 0);
  petalShape.bezierCurveTo(-0.42, 0.16, -0.48, 0.62, -0.24, 0.90);
  petalShape.bezierCurveTo(-0.12, 1.04, 0.12, 1.04, 0.24, 0.90);
  petalShape.bezierCurveTo(0.48, 0.62, 0.42, 0.16, 0, 0);
  const petalGeom = new THREE.ShapeGeometry(petalShape, 10);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(-0.38, 0.20, -0.42, 0.72, 0, 1);
  leafShape.bezierCurveTo(0.42, 0.72, 0.38, 0.20, 0, 0);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 10);

  const flowerSpecs = [
    [1.35, 1.48, 0.18],
    [1.58, 1.76, 0.14],
    [0.92, 1.73, 0.14],
    [0.84, 0.78, 0.18],
    [1.48, 0.91, 0.16],
    [2.12, 1.20, 0.15],
    [2.20, 1.65, 0.14],
    [2.32, 0.68, 0.13],
    [0.70, 1.30, 0.12],
  ];

  const petalCount = flowerSpecs.length * 5;
  const floral_petal_outlines = new THREE.InstancedMesh(
    petalGeom,
    petalOutlineMat,
    petalCount
  );
  floral_petal_outlines.name = "floral_petal_outlines";

  const floral_petals = new THREE.InstancedMesh(
    petalGeom,
    petalMat,
    petalCount
  );
  floral_petals.name = "floral_petals";

  const flower_centersGeom = new THREE.CircleGeometry(1, 18);
  const flower_center_outlines = new THREE.InstancedMesh(
    flower_centersGeom,
    petalOutlineMat,
    flowerSpecs.length
  );
  flower_center_outlines.name = "flower_center_outlines";

  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flowerCenterMat,
    flowerSpecs.length
  );
  flower_centers.name = "flower_centers";

  const matrix = new THREE.Matrix4();
  let petalIndex = 0;

  for (let f = 0; f < flowerSpecs.length; f++) {
    const angle = flowerSpecs[f][0];
    const y = flowerSpecs[f][1];
    const size = flowerSpecs[f][2];

    for (let i = 0; i < 5; i++) {
      const rotation = i / 5 * Math.PI * 2;
      const outlinePose = surfacePose(angle, y, 0.014);
      const outlineQuaternion = outlinePose.quaternion.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(localNormal, rotation)
      );
      matrix.compose(
        outlinePose.position,
        outlineQuaternion,
        new THREE.Vector3(size * 1.08, size * 1.08, 1)
      );
      floral_petal_outlines.setMatrixAt(petalIndex, matrix);

      const fillPose = surfacePose(angle, y, 0.018);
      const fillQuaternion = fillPose.quaternion.clone().multiply(
        new THREE.Quaternion().setFromAxisAngle(localNormal, rotation)
      );
      matrix.compose(
        fillPose.position,
        fillQuaternion,
        new THREE.Vector3(size * 0.96, size * 0.96, 1)
      );
      floral_petals.setMatrixAt(petalIndex, matrix);
      petalIndex++;
    }

    const centerOutlinePose = surfacePose(angle, y, 0.020);
    matrix.compose(
      centerOutlinePose.position,
      centerOutlinePose.quaternion,
      new THREE.Vector3(size * 0.27, size * 0.27, 1)
    );
    flower_center_outlines.setMatrixAt(f, matrix);

    const centerPose = surfacePose(angle, y, 0.023);
    matrix.compose(
      centerPose.position,
      centerPose.quaternion,
      new THREE.Vector3(size * 0.18, size * 0.18, 1)
    );
    flower_centers.setMatrixAt(f, matrix);
  }

  floral_petal_outlines.instanceMatrix.needsUpdate = true;
  floral_petals.instanceMatrix.needsUpdate = true;
  flower_center_outlines.instanceMatrix.needsUpdate = true;
  flower_centers.instanceMatrix.needsUpdate = true;
  root.add(
    floral_petal_outlines,
    floral_petals,
    flower_center_outlines,
    flower_centers
  );

  const leafSpecs = [
    [1.42, 0.52, 0.14, -0.85],
    [1.45, 0.68, 0.15, 0.82],
    [1.38, 0.82, 0.13, -0.72],
    [1.34, 1.05, 0.15, 0.86],
    [1.32, 1.22, 0.14, -0.82],
    [1.43, 1.58, 0.13, 0.78],
    [1.58, 1.84, 0.12, -0.72],
    [1.82, 1.88, 0.13, 0.82],
    [2.02, 1.76, 0.14, -0.80],
    [2.15, 1.50, 0.14, 0.72],
    [2.18, 1.10, 0.15, -0.82],
    [2.24, 0.88, 0.13, 0.78],
    [2.29, 0.72, 0.12, -0.70],
    [0.98, 1.50, 0.14, -0.80],
    [0.84, 1.34, 0.13, 0.82],
    [0.76, 1.10, 0.14, -0.76],
    [0.77, 0.88, 0.13, 0.76],
    [1.22, 0.60, 0.14, -0.82],
    [1.02, 0.70, 0.13, 0.72],
    [0.86, 0.83, 0.12, -0.72],
    [1.66, 0.45, 0.13, 0.84],
    [1.84, 0.55, 0.12, -0.78],
  ];

  const leaf_outlines = new THREE.InstancedMesh(
    leafGeom,
    leafOutlineMat,
    leafSpecs.length
  );
  leaf_outlines.name = "leaf_outlines";

  const painted_leaves = new THREE.InstancedMesh(
    leafGeom,
    leafMat,
    leafSpecs.length
  );
  painted_leaves.name = "painted_leaves";

  for (let i = 0; i < leafSpecs.length; i++) {
    const angle = leafSpecs[i][0];
    const y = leafSpecs[i][1];
    const size = leafSpecs[i][2];
    const rotation = leafSpecs[i][3];

    const outlinePose = surfacePose(angle, y, 0.013);
    const outlineQuaternion = outlinePose.quaternion.clone().multiply(
      new THREE.Quaternion().setFromAxisAngle(localNormal, rotation)
    );
    matrix.compose(
      outlinePose.position,
      outlineQuaternion,
      new THREE.Vector3(size * 1.08, size * 1.08, 1)
    );
    leaf_outlines.setMatrixAt(i, matrix);

    const leafPose = surfacePose(angle, y, 0.017);
    const leafQuaternion = leafPose.quaternion.clone().multiply(
      new THREE.Quaternion().setFromAxisAngle(localNormal, rotation)
    );
    matrix.compose(
      leafPose.position,
      leafQuaternion,
      new THREE.Vector3(size * 0.96, size * 0.96, 1)
    );
    painted_leaves.setMatrixAt(i, matrix);
  }

  leaf_outlines.instanceMatrix.needsUpdate = true;
  painted_leaves.instanceMatrix.needsUpdate = true;
  root.add(leaf_outlines, painted_leaves);

  const speckleSpecs = [
    [1.55, 2.57, 0.008],
    [1.20, 2.42, 0.006],
    [1.82, 2.20, 0.007],
    [1.05, 2.02, 0.006],
    [2.25, 1.92, 0.008],
    [0.82, 1.58, 0.006],
    [2.42, 1.34, 0.007],
    [1.10, 1.18, 0.005],
    [1.78, 1.08, 0.006],
    [2.05, 0.92, 0.008],
    [0.92, 0.58, 0.006],
    [1.42, 0.36, 0.007],
    [2.30, 0.28, 0.005],
    [1.68, 0.16, 0.006],
  ];
  const glaze_specklesGeom = new THREE.CircleGeometry(1, 10);
  const glaze_speckles = new THREE.InstancedMesh(
    glaze_specklesGeom,
    speckleMat,
    speckleSpecs.length
  );
  glaze_speckles.name = "glaze_speckles";

  for (let i = 0; i < speckleSpecs.length; i++) {
    const angle = speckleSpecs[i][0];
    const y = speckleSpecs[i][1];
    const size = speckleSpecs[i][2];
    const pose = surfacePose(angle, y, 0.010);
    matrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(size, size, 1)
    );
    glaze_speckles.setMatrixAt(i, matrix);
  }
  glaze_speckles.instanceMatrix.needsUpdate = true;
  root.add(glaze_speckles);

  function makeCrack(points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 3),
      radius,
      5,
      false
    );
    return new THREE.Mesh(geometry, crackMat);
  }

  function makeRepairPatch(angle, y, width, height, rotation) {
    const pose = surfacePose(angle, y, 0.010);
    const patch = new THREE.Mesh(petalGeom, repairMat);
    patch.position.copy(pose.position);
    patch.quaternion.copy(pose.quaternion);
    patch.rotateZ(rotation);
    patch.scale.set(width, height, 1);
    return patch;
  }

  const mainCrackPoints = [
    surfacePoint(1.57, 2.73, 0.022),
    surfacePoint(1.52, 2.61, 0.022),
    surfacePoint(1.60, 2.48, 0.022),
    surfacePoint(1.52, 2.34, 0.022),
    surfacePoint(1.48, 2.18, 0.022),
    surfacePoint(1.55, 2.03, 0.022),
    surfacePoint(1.43, 1.88, 0.022),
    surfacePoint(1.50, 1.72, 0.022),
    surfacePoint(1.38, 1.58, 0.022),
    surfacePoint(1.47, 1.43, 0.022),
    surfacePoint(1.42, 1.28, 0.022),
    surfacePoint(1.55, 1.14, 0.022),
    surfacePoint(1.50, 0.98, 0.022),
    surfacePoint(1.62, 0.82, 0.022),
    surfacePoint(1.58, 0.66, 0.022),
    surfacePoint(1.70, 0.48, 0.022),
    surfacePoint(1.64, 0.30, 0.022),
    surfacePoint(1.72, 0.12, 0.022),
    surfacePoint(1.68, 0.015, 0.022),
  ];
  const main_crack = makeCrack(mainCrackPoints, 0.009);
  main_crack.name = "main_crack";
  root.add(main_crack);

  const upper_right_crack = makeCrack([
    surfacePoint(1.48, 2.18, 0.023),
    surfacePoint(1.28, 2.12, 0.023),
    surfacePoint(1.12, 2.02, 0.023),
    surfacePoint(0.98, 1.90, 0.023),
    surfacePoint(0.84, 1.78, 0.023),
  ], 0.006);
  upper_right_crack.name = "upper_right_crack";
  root.add(upper_right_crack);

  const middle_right_crack = makeCrack([
    surfacePoint(1.43, 1.58, 0.023),
    surfacePoint(1.20, 1.54, 0.023),
    surfacePoint(0.98, 1.47, 0.023),
    surfacePoint(0.76, 1.36, 0.023),
    surfacePoint(0.58, 1.20, 0.023),
  ], 0.007);
  middle_right_crack.name = "middle_right_crack";
  root.add(middle_right_crack);

  const middle_left_crack = makeCrack([
    surfacePoint(1.47, 1.43, 0.023),
    surfacePoint(1.72, 1.38, 0.023),
    surfacePoint(1.94, 1.27, 0.023),
    surfacePoint(2.16, 1.16, 0.023),
    surfacePoint(2.38, 1.08, 0.023),
  ], 0.007);
  middle_left_crack.name = "middle_left_crack";
  root.add(middle_left_crack);

  const lower_left_crack = makeCrack([
    surfacePoint(1.55, 1.14, 0.023),
    surfacePoint(1.82, 1.05, 0.023),
    surfacePoint(2.06, 0.92, 0.023),
    surfacePoint(2.30, 0.82, 0.023),
    surfacePoint(2.52, 0.76, 0.023),
  ], 0.006);
  lower_left_crack.name = "lower_left_crack";
  root.add(lower_left_crack);

  const lower_right_crack = makeCrack([
    surfacePoint(1.62, 0.82, 0.023),
    surfacePoint(1.38, 0.76, 0.023),
    surfacePoint(1.14, 0.66, 0.023),
    surfacePoint(0.92, 0.55, 0.023),
    surfacePoint(0.72, 0.47, 0.023),
  ], 0.005);
  lower_right_crack.name = "lower_right_crack";
  root.add(lower_right_crack);

  const base_crack = makeCrack([
    surfacePoint(1.72, 0.12, 0.023),
    surfacePoint(1.60, 0.075, 0.023),
    surfacePoint(1.54, 0.025, 0.023),
  ], 0.007);
  base_crack.name = "base_crack";
  root.add(base_crack);

  const lower_repair_patch = makeRepairPatch(
    1.66,
    0.43,
    0.12,
    0.18,
    -0.22
  );
  lower_repair_patch.name = "lower_repair_patch";
  root.add(lower_repair_patch);

  const middle_repair_patch = makeRepairPatch(
    1.43,
    1.16,
    0.085,
    0.12,
    0.35
  );
  middle_repair_patch.name = "middle_repair_patch";
  root.add(middle_repair_patch);

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