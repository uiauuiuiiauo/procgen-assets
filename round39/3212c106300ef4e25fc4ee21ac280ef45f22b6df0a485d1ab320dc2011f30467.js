export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "terracotta_pot";

  const pot_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc9654a,
    metalness: 0.0,
    roughness: 0.4,
  });
  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x64291e,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const crackMat = new THREE.MeshStandardMaterial({
    color: 0x28120e,
    metalness: 0.0,
    roughness: 0.8,
  });
  const surface_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x704039,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const pot_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.280, 0.000),
    new THREE.Vector2(0.320, 0.008),
    new THREE.Vector2(0.350, 0.035),
    new THREE.Vector2(0.375, 0.085),
    new THREE.Vector2(0.405, 0.155),
    new THREE.Vector2(0.440, 0.245),
    new THREE.Vector2(0.475, 0.345),
    new THREE.Vector2(0.505, 0.455),
    new THREE.Vector2(0.525, 0.575),
    new THREE.Vector2(0.532, 0.690),
    new THREE.Vector2(0.525, 0.790),
    new THREE.Vector2(0.505, 0.875),
    new THREE.Vector2(0.475, 0.945),
    new THREE.Vector2(0.435, 1.005),
    new THREE.Vector2(0.395, 1.050),
    new THREE.Vector2(0.370, 1.085),
    new THREE.Vector2(0.365, 1.115),
    new THREE.Vector2(0.375, 1.140),
    new THREE.Vector2(0.390, 1.158),
  ];
  const pot_bodyGeom = new THREE.LatheGeometry(pot_bodyProfile, 64);
  const pot_body = new THREE.Mesh(pot_bodyGeom, pot_bodyMat);
  pot_body.name = "pot_body";
  root.add(pot_body);

  const rolled_rimGeom = new THREE.TorusGeometry(0.390, 0.055, 18, 72);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, pot_bodyMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 1.170;
  root.add(rolled_rim);

  const inner_cavityProfile = [
    new THREE.Vector2(0.000, 0.865),
    new THREE.Vector2(0.080, 0.875),
    new THREE.Vector2(0.160, 0.905),
    new THREE.Vector2(0.230, 0.965),
    new THREE.Vector2(0.285, 1.045),
    new THREE.Vector2(0.325, 1.115),
    new THREE.Vector2(0.338, 1.165),
    new THREE.Vector2(0.338, 1.190),
  ];
  const inner_cavityGeom = new THREE.LatheGeometry(inner_cavityProfile, 64);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  inner_cavity.name = "inner_cavity";
  root.add(inner_cavity);

  const inner_lipGeom = new THREE.TorusGeometry(0.337, 0.011, 10, 64);
  const inner_lip = new THREE.Mesh(inner_lipGeom, inner_cavityMat);
  inner_lip.name = "inner_lip";
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 1.190;
  root.add(inner_lip);

  const crack_group = new THREE.Group();
  crack_group.name = "crack_group";
  root.add(crack_group);

  function rimSurfacePoint(angle, radialOffset) {
    const sectionRadius = 0.390 + radialOffset;
    const rise = Math.sqrt(
      Math.max(0, 0.055 * 0.055 - radialOffset * radialOffset)
    );
    return new THREE.Vector3(
      Math.sin(angle) * sectionRadius,
      1.170 + rise + 0.003,
      Math.cos(angle) * sectionRadius
    );
  }

  function addRimCrack(samples, radius) {
    const points = [];
    for (const sample of samples) {
      points.push(rimSurfacePoint(sample[0], sample[1]));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 4),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, crackMat);
    crack_group.add(mesh);
    return mesh;
  }

  const front_center_crack = addRimCrack([
    [0.000, 0.050],
    [-0.025, 0.032],
    [-0.018, 0.010],
    [-0.050, -0.014],
    [-0.035, -0.036],
    [-0.075, -0.052],
  ], 0.0042);
  front_center_crack.name = "front_center_crack";

  const front_center_crack_branch = addRimCrack([
    [-0.038, -0.012],
    [-0.010, -0.026],
    [0.020, -0.048],
  ], 0.0028);
  front_center_crack_branch.name = "front_center_crack_branch";

  const front_right_crack = addRimCrack([
    [0.300, 0.050],
    [0.275, 0.032],
    [0.315, 0.010],
    [0.285, -0.014],
    [0.345, -0.036],
    [0.325, -0.052],
  ], 0.0036);
  front_right_crack.name = "front_right_crack";

  const right_side_crack = addRimCrack([
    [0.835, 0.048],
    [0.800, 0.030],
    [0.842, 0.008],
    [0.810, -0.018],
    [0.875, -0.038],
    [0.860, -0.052],
  ], 0.0040);
  right_side_crack.name = "right_side_crack";

  const right_side_crack_branch = addRimCrack([
    [0.825, -0.012],
    [0.785, -0.028],
    [0.770, -0.048],
  ], 0.0025);
  right_side_crack_branch.name = "right_side_crack_branch";

  const left_side_crack = addRimCrack([
    [-0.850, 0.050],
    [-0.820, 0.032],
    [-0.870, 0.012],
    [-0.835, -0.010],
    [-0.900, -0.032],
    [-0.880, -0.050],
  ], 0.0038);
  left_side_crack.name = "left_side_crack";

  const rear_left_crack = addRimCrack([
    [-1.720, 0.048],
    [-1.755, 0.030],
    [-1.725, 0.008],
    [-1.780, -0.014],
    [-1.760, -0.038],
    [-1.815, -0.052],
  ], 0.0032);
  rear_left_crack.name = "rear_left_crack";

  const rear_crack = addRimCrack([
    [2.900, 0.047],
    [2.870, 0.028],
    [2.915, 0.006],
    [2.885, -0.016],
    [2.940, -0.038],
  ], 0.0028);
  rear_crack.name = "rear_crack";

  function bodyRadiusAt(y) {
    if (y < 0.10) return 0.32 + y * 0.55;
    if (y < 0.45) return 0.375 + (y - 0.10) * 0.37;
    if (y < 0.70) return 0.505 + (y - 0.45) * 0.10;
    if (y < 0.85) return 0.530 - (y - 0.70) * 0.16;
    if (y < 1.02) return 0.506 - (y - 0.85) * 0.55;
    return 0.412 - (y - 1.02) * 0.48;
  }

  function addBodyCrevice(angle, yTop, yBottom, wiggle, radius) {
    const points = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const y = yTop + (yBottom - yTop) * t;
      const localAngle = angle + Math.sin(t * Math.PI * 3) * wiggle;
      const r = bodyRadiusAt(y) + 0.004;
      points.push(new THREE.Vector3(
        Math.sin(localAngle) * r,
        y,
        Math.cos(localAngle) * r
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      24,
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, crackMat);
    crack_group.add(mesh);
    return mesh;
  }

  const front_center_crevice = addBodyCrevice(
    -0.045,
    1.116,
    1.015,
    0.018,
    0.0032
  );
  front_center_crevice.name = "front_center_crevice";

  const right_rim_crevice = addBodyCrevice(
    0.885,
    1.120,
    1.060,
    0.014,
    0.0026
  );
  right_rim_crevice.name = "right_rim_crevice";

  const surface_specklesData = [
    [-0.62, 0.30, 0.0030],
    [-0.35, 0.52, 0.0022],
    [-0.15, 0.76, 0.0028],
    [0.10, 0.39, 0.0020],
    [0.25, 0.67, 0.0024],
    [0.42, 0.88, 0.0021],
    [0.58, 0.55, 0.0027],
    [0.72, 0.34, 0.0019],
    [-0.78, 0.63, 0.0023],
    [-0.48, 0.91, 0.0018],
    [0.02, 0.22, 0.0022],
    [0.34, 0.27, 0.0018],
  ];
  const surface_specklesGeom = new THREE.CircleGeometry(1, 10);
  const surface_speckles = new THREE.InstancedMesh(
    surface_specklesGeom,
    surface_specklesMat,
    surface_specklesData.length
  );
  surface_speckles.name = "surface_speckles";

  const speckle_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < surface_specklesData.length; i++) {
    const angle = surface_specklesData[i][0];
    const y = surface_specklesData[i][1];
    const size = surface_specklesData[i][2];
    const normal = new THREE.Vector3(
      Math.sin(angle),
      0,
      Math.cos(angle)
    ).normalize();
    const radius = bodyRadiusAt(y) + 0.004;

    speckle_dummy.position.set(
      normal.x * radius,
      y,
      normal.z * radius
    );
    speckle_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    speckle_dummy.scale.set(size, size * 0.72, 1);
    speckle_dummy.updateMatrix();
    surface_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  surface_speckles.instanceMatrix.needsUpdate = true;
  root.add(surface_speckles);

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