export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_chalice";

  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x5a5a5a,
    emissiveIntensity: 0.35,
    side: THREE.DoubleSide,
  });
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    emissive: 0x4a4a4a,
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x707070,
    metalness: 0.5,
    roughness: 0.25,
    emissive: 0x303030,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide,
  });

  const footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.43, 0.00),
    new THREE.Vector2(0.52, 0.012),
    new THREE.Vector2(0.58, 0.038),
    new THREE.Vector2(0.59, 0.060),
    new THREE.Vector2(0.56, 0.085),
    new THREE.Vector2(0.46, 0.125),
    new THREE.Vector2(0.30, 0.175),
    new THREE.Vector2(0.18, 0.215),
    new THREE.Vector2(0.00, 0.225),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, polishedMat);
  foot.name = "foot";
  root.add(foot);

  const foot_rimGeom = new THREE.TorusGeometry(0.545, 0.025, 12, 64);
  const foot_rim = new THREE.Mesh(foot_rimGeom, polishedMat);
  foot_rim.name = "foot_rim";
  foot_rim.rotation.x = Math.PI / 2;
  foot_rim.position.y = 0.047;
  root.add(foot_rim);

  const stemProfile = [
    new THREE.Vector2(0.00, 0.165),
    new THREE.Vector2(0.18, 0.180),
    new THREE.Vector2(0.21, 0.220),
    new THREE.Vector2(0.19, 0.275),
    new THREE.Vector2(0.145, 0.345),
    new THREE.Vector2(0.115, 0.430),
    new THREE.Vector2(0.105, 0.525),
    new THREE.Vector2(0.125, 0.610),
    new THREE.Vector2(0.165, 0.660),
    new THREE.Vector2(0.175, 0.695),
    new THREE.Vector2(0.145, 0.730),
    new THREE.Vector2(0.115, 0.765),
    new THREE.Vector2(0.120, 0.805),
    new THREE.Vector2(0.175, 0.845),
    new THREE.Vector2(0.205, 0.875),
    new THREE.Vector2(0.180, 0.910),
    new THREE.Vector2(0.115, 0.940),
    new THREE.Vector2(0.00, 0.950),
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 48);
  const stem = new THREE.Mesh(stemGeom, polishedMat);
  stem.name = "stem";
  root.add(stem);

  const lower_stem_collarGeom = new THREE.TorusGeometry(0.155, 0.024, 10, 48);
  const lower_stem_collar = new THREE.Mesh(lower_stem_collarGeom, polishedMat);
  lower_stem_collar.name = "lower_stem_collar";
  lower_stem_collar.rotation.x = Math.PI / 2;
  lower_stem_collar.position.y = 0.680;
  root.add(lower_stem_collar);

  const upper_stem_collarGeom = new THREE.TorusGeometry(0.172, 0.026, 10, 48);
  const upper_stem_collar = new THREE.Mesh(upper_stem_collarGeom, polishedMat);
  upper_stem_collar.name = "upper_stem_collar";
  upper_stem_collar.rotation.x = Math.PI / 2;
  upper_stem_collar.position.y = 0.865;
  root.add(upper_stem_collar);

  const bowlProfile = [
    new THREE.Vector2(0.00, 0.835),
    new THREE.Vector2(0.13, 0.840),
    new THREE.Vector2(0.27, 0.875),
    new THREE.Vector2(0.43, 0.945),
    new THREE.Vector2(0.57, 1.045),
    new THREE.Vector2(0.65, 1.175),
    new THREE.Vector2(0.695, 1.335),
    new THREE.Vector2(0.725, 1.525),
    new THREE.Vector2(0.742, 1.735),
    new THREE.Vector2(0.750, 1.955),
    new THREE.Vector2(0.758, 2.175),
    new THREE.Vector2(0.775, 2.315),
    new THREE.Vector2(0.805, 2.390),
  ];
  const bowlGeom = new THREE.LatheGeometry(bowlProfile, 64);
  const bowl = new THREE.Mesh(bowlGeom, polishedMat);
  bowl.name = "bowl";
  root.add(bowl);

  const inner_bowlProfile = [
    new THREE.Vector2(0.00, 1.015),
    new THREE.Vector2(0.18, 1.020),
    new THREE.Vector2(0.36, 1.070),
    new THREE.Vector2(0.51, 1.165),
    new THREE.Vector2(0.615, 1.315),
    new THREE.Vector2(0.675, 1.505),
    new THREE.Vector2(0.708, 1.720),
    new THREE.Vector2(0.722, 1.940),
    new THREE.Vector2(0.730, 2.160),
    new THREE.Vector2(0.750, 2.310),
    new THREE.Vector2(0.770, 2.375),
  ];
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 64);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, innerMat);
  inner_bowl.name = "inner_bowl";
  root.add(inner_bowl);

  const rim_bandGeom = new THREE.CylinderGeometry(
    0.782,
    0.765,
    0.072,
    64,
    1,
    true
  );
  const rim_band = new THREE.Mesh(rim_bandGeom, polishedMat);
  rim_band.name = "rim_band";
  rim_band.position.y = 2.350;
  root.add(rim_band);

  const rimGeom = new THREE.TorusGeometry(0.785, 0.043, 14, 72);
  const rim = new THREE.Mesh(rimGeom, polishedMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.395;
  root.add(rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.744, 0.014, 10, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, innerMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 2.370;
  root.add(inner_rim);

  const rim_shadowGeom = new THREE.TorusGeometry(0.770, 0.010, 8, 64);
  const rim_shadow = new THREE.Mesh(rim_shadowGeom, engravingMat);
  rim_shadow.name = "rim_shadow";
  rim_shadow.rotation.x = Math.PI / 2;
  rim_shadow.position.y = 2.310;
  root.add(rim_shadow);

  const engraved_ornament = new THREE.Group();
  engraved_ornament.name = "engraved_ornament";
  root.add(engraved_ornament);

  function bowlRadiusAt(y) {
    if (y <= 0.84) return 0.13;
    if (y < 0.95) return 0.13 + (y - 0.84) / 0.11 * 0.30;
    if (y < 1.18) return 0.43 + (y - 0.95) / 0.23 * 0.22;
    if (y < 1.40) return 0.65 + (y - 1.18) / 0.22 * 0.06;
    if (y < 1.70) return 0.71 + (y - 1.40) / 0.30 * 0.032;
    if (y < 2.18) return 0.742 + (y - 1.70) / 0.48 * 0.016;
    return 0.758 + (y - 2.18) / 0.21 * 0.047;
  }

  function surfacePoint(u, y, offset) {
    const radius = bowlRadiusAt(y) + offset;
    const angle = Math.PI / 2 - u / radius;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addEngravedCurve(name, uvPoints, radius) {
    const points = [];
    for (let i = 0; i < uvPoints.length; i++) {
      points.push(surfacePoint(uvPoints[i][0], uvPoints[i][1], 0.004));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal",
      0.5
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(18, uvPoints.length * 5),
      radius * 0.36,
      5,
      false
    );
    const mesh = new THREE.Mesh(geometry, engravingMat);
    mesh.name = name;
    engraved_ornament.add(mesh);
    return mesh;
  }

  function mirrorUv(points) {
    const mirrored = [];
    for (let i = 0; i < points.length; i++) {
      mirrored.push([-points[i][0], points[i][1]]);
    }
    return mirrored;
  }

  function addMirroredEngraving(name, points, radius) {
    addEngravedCurve(name + "_right", points, radius);
    addEngravedCurve(name + "_left", mirrorUv(points), radius);
  }

  const upper_swag_points = [
    [0.00, 2.075],
    [0.08, 2.025],
    [0.17, 1.990],
    [0.27, 2.000],
    [0.36, 2.055],
    [0.43, 2.125],
    [0.52, 2.155],
    [0.61, 2.125],
    [0.68, 2.055],
    [0.76, 2.025],
    [0.84, 2.050],
  ];
  addMirroredEngraving("upper_swag", upper_swag_points, 0.006);

  const upper_arch_points = [
    [0.00, 2.145],
    [0.08, 2.105],
    [0.16, 2.065],
    [0.25, 2.055],
    [0.33, 2.090],
    [0.39, 2.145],
    [0.46, 2.185],
    [0.54, 2.180],
    [0.62, 2.140],
    [0.69, 2.085],
    [0.77, 2.065],
    [0.84, 2.095],
  ];
  addMirroredEngraving("upper_arch", upper_arch_points, 0.0045);

  const central_stem_points = [
    [0.00, 1.285],
    [-0.018, 1.390],
    [0.020, 1.495],
    [-0.015, 1.610],
    [0.018, 1.720],
    [-0.012, 1.835],
    [0.00, 1.945],
  ];
  addEngravedCurve("central_stem", central_stem_points, 0.006);

  const central_curl_points = [
    [0.015, 1.545],
    [0.075, 1.625],
    [0.145, 1.620],
    [0.185, 1.555],
    [0.165, 1.485],
    [0.105, 1.465],
    [0.070, 1.515],
    [0.105, 1.565],
  ];
  addMirroredEngraving("central_curl", central_curl_points, 0.0055);

  const lower_scroll_points = [
    [0.00, 1.330],
    [0.075, 1.270],
    [0.165, 1.235],
    [0.255, 1.250],
    [0.325, 1.305],
    [0.350, 1.375],
    [0.315, 1.430],
    [0.255, 1.430],
    [0.225, 1.385],
    [0.250, 1.345],
  ];
  addMirroredEngraving("lower_scroll", lower_scroll_points, 0.0055);

  const outer_scroll_points = [
    [0.245, 1.255],
    [0.345, 1.205],
    [0.450, 1.205],
    [0.545, 1.260],
    [0.610, 1.345],
    [0.660, 1.445],
    [0.735, 1.515],
    [0.815, 1.510],
    [0.865, 1.445],
    [0.850, 1.375],
    [0.785, 1.350],
    [0.735, 1.390],
    [0.765, 1.445],
  ];
  addMirroredEngraving("outer_scroll", outer_scroll_points, 0.005);

  const side_rise_points = [
    [0.455, 1.230],
    [0.535, 1.315],
    [0.585, 1.430],
    [0.600, 1.555],
    [0.565, 1.675],
    [0.505, 1.770],
    [0.455, 1.865],
    [0.475, 1.965],
    [0.545, 2.035],
  ];
  addMirroredEngraving("side_rise", side_rise_points, 0.005);

  const side_curl_points = [
    [0.555, 1.705],
    [0.625, 1.790],
    [0.705, 1.805],
    [0.765, 1.755],
    [0.775, 1.675],
    [0.730, 1.625],
    [0.675, 1.645],
    [0.660, 1.700],
    [0.700, 1.735],
  ];
  addMirroredEngraving("side_curl", side_curl_points, 0.0045);

  const top_crown_points = [
    [0.00, 1.930],
    [0.045, 2.015],
    [0.095, 2.075],
    [0.145, 2.095],
    [0.180, 2.055],
    [0.155, 2.005],
    [0.105, 1.990],
  ];
  addMirroredEngraving("top_crown", top_crown_points, 0.0045);

  const lower_fan_points = [
    [0.00, 1.290],
    [0.055, 1.215],
    [0.125, 1.175],
    [0.205, 1.180],
    [0.270, 1.225],
    [0.315, 1.295],
  ];
  addMirroredEngraving("lower_fan", lower_fan_points, 0.0045);

  const lower_inner_curl_points = [
    [0.00, 1.355],
    [0.045, 1.300],
    [0.105, 1.285],
    [0.155, 1.320],
    [0.165, 1.375],
    [0.130, 1.410],
    [0.085, 1.395],
    [0.070, 1.355],
    [0.100, 1.335],
  ];
  addMirroredEngraving("lower_inner_curl", lower_inner_curl_points, 0.004);

  const middle_sweep_points = [
    [0.080, 1.560],
    [0.155, 1.515],
    [0.235, 1.525],
    [0.305, 1.575],
    [0.350, 1.650],
    [0.360, 1.735],
    [0.325, 1.815],
    [0.270, 1.850],
  ];
  addMirroredEngraving("middle_sweep", middle_sweep_points, 0.0045);

  const upper_inner_arch_points = [
    [0.00, 2.120],
    [0.070, 2.080],
    [0.145, 2.070],
    [0.215, 2.100],
    [0.270, 2.145],
    [0.320, 2.165],
    [0.365, 2.145],
  ];
  addMirroredEngraving("upper_inner_arch", upper_inner_arch_points, 0.0038);

  const upper_tendril_points = [
    [0.145, 2.060],
    [0.175, 1.995],
    [0.230, 1.960],
    [0.295, 1.965],
    [0.340, 2.010],
    [0.350, 2.065],
    [0.320, 2.095],
  ];
  addMirroredEngraving("upper_tendril", upper_tendril_points, 0.0038);

  const outer_upper_curl_points = [
    [0.565, 2.025],
    [0.635, 1.990],
    [0.710, 1.995],
    [0.775, 2.035],
    [0.815, 2.095],
    [0.805, 2.155],
    [0.760, 2.175],
    [0.720, 2.140],
    [0.735, 2.095],
  ];
  addMirroredEngraving("outer_upper_curl", outer_upper_curl_points, 0.0038);

  const lower_tendril_points = [
    [0.00, 1.320],
    [0.060, 1.245],
    [0.135, 1.210],
    [0.215, 1.215],
    [0.285, 1.255],
    [0.330, 1.315],
    [0.345, 1.370],
  ];
  addMirroredEngraving("lower_tendril", lower_tendril_points, 0.0038);

  const central_leaf_points = [
    [0.000, 1.470],
    [0.060, 1.525],
    [0.085, 1.610],
    [0.060, 1.700],
    [0.000, 1.770],
    [-0.060, 1.700],
    [-0.085, 1.610],
    [-0.060, 1.525],
  ];
  addEngravedCurve("central_leaf", central_leaf_points, 0.0045);

  const left_acanthus_points = [
    [-0.015, 1.330],
    [-0.090, 1.395],
    [-0.150, 1.490],
    [-0.145, 1.590],
    [-0.090, 1.675],
    [-0.025, 1.720],
  ];
  addMirroredEngraving("left_acanthus", left_acanthus_points, 0.004);

  const lower_leaf_points = [
    [0.000, 1.180],
    [0.045, 1.225],
    [0.055, 1.285],
    [0.000, 1.350],
    [-0.055, 1.285],
    [-0.045, 1.225],
  ];
  addEngravedCurve("lower_leaf", lower_leaf_points, 0.004);

  const engraved_leafShape = new THREE.Shape();
  engraved_leafShape.moveTo(0, -0.052);
  engraved_leafShape.bezierCurveTo(-0.026, -0.026, -0.030, 0.020, 0, 0.058);
  engraved_leafShape.bezierCurveTo(0.030, 0.020, 0.026, -0.026, 0, -0.052);

  const engraved_leavesGeom = new THREE.ShapeGeometry(engraved_leafShape, 10);
  const leafSpecs = [
    [0.000, 1.840, 0.62, 0.72, 0.00],
    [-0.050, 1.755, 0.54, 0.65, 0.55],
    [0.050, 1.755, 0.54, 0.65, -0.55],
    [-0.075, 1.650, 0.50, 0.60, 0.90],
    [0.075, 1.650, 0.50, 0.60, -0.90],
    [-0.055, 1.545, 0.46, 0.56, 1.15],
    [0.055, 1.545, 0.46, 0.56, -1.15],
    [0.000, 1.365, 0.48, 0.62, Math.PI],
    [-0.155, 1.335, 0.45, 0.55, 1.80],
    [0.155, 1.335, 0.45, 0.55, -1.80],
    [-0.285, 1.285, 0.40, 0.50, 2.10],
    [0.285, 1.285, 0.40, 0.50, -2.10],
    [-0.455, 1.300, 0.38, 0.47, 2.35],
    [0.455, 1.300, 0.38, 0.47, -2.35],
    [-0.585, 1.430, 0.36, 0.45, 1.95],
    [0.585, 1.430, 0.36, 0.45, -1.95],
    [-0.555, 1.720, 0.34, 0.43, 1.20],
    [0.555, 1.720, 0.34, 0.43, -1.20],
    [-0.470, 1.940, 0.32, 0.40, 0.75],
    [0.470, 1.940, 0.32, 0.40, -0.75],
    [-0.235, 2.035, 0.28, 0.35, 1.05],
    [0.235, 2.035, 0.28, 0.35, -1.05],
  ];

  const engraved_leaves = new THREE.InstancedMesh(
    engraved_leavesGeom,
    engravingMat,
    leafSpecs.length
  );
  engraved_leaves.name = "engraved_leaves";

  const localNormal = new THREE.Vector3(0, 0, 1);
  const leafMatrix = new THREE.Matrix4();
  const leafRotation = new THREE.Quaternion();
  const leafTwist = new THREE.Quaternion();
  const leafScale = new THREE.Vector3();

  for (let i = 0; i < leafSpecs.length; i++) {
    const spec = leafSpecs[i];
    const position = surfacePoint(spec[0], spec[1], 0.005);
    const normal = new THREE.Vector3(position.x, 0, position.z).normalize();
    leafRotation.setFromUnitVectors(localNormal, normal);
    leafTwist.setFromAxisAngle(localNormal, spec[4]);
    leafRotation.multiply(leafTwist);
    leafScale.set(spec[2], spec[3], 1);
    leafMatrix.compose(position, leafRotation, leafScale);
    engraved_leaves.setMatrixAt(i, leafMatrix);
  }
  engraved_leaves.instanceMatrix.needsUpdate = true;
  engraved_ornament.add(engraved_leaves);

  const beaded_upper_bandGeom = new THREE.TorusGeometry(0.771, 0.005, 7, 72);
  const beaded_upper_band = new THREE.Mesh(beaded_upper_bandGeom, engravingMat);
  beaded_upper_band.name = "beaded_upper_band";
  beaded_upper_band.rotation.x = Math.PI / 2;
  beaded_upper_band.position.y = 2.270;
  root.add(beaded_upper_band);

  const beaded_lower_bandGeom = new THREE.TorusGeometry(0.765, 0.0045, 7, 72);
  const beaded_lower_band = new THREE.Mesh(beaded_lower_bandGeom, engravingMat);
  beaded_lower_band.name = "beaded_lower_band";
  beaded_lower_band.rotation.x = Math.PI / 2;
  beaded_lower_band.position.y = 2.225;
  root.add(beaded_lower_band);

  const beadCount = 56;
  const beaded_ornamentGeom = new THREE.SphereGeometry(0.008, 8, 6);
  const beaded_ornament = new THREE.InstancedMesh(
    beaded_ornamentGeom,
    engravingMat,
    beadCount
  );
  beaded_ornament.name = "beaded_ornament";

  const beadMatrix = new THREE.Matrix4();
  const beadQuaternion = new THREE.Quaternion();
  const beadScale = new THREE.Vector3(0.85, 0.85, 0.35);
  const radialNormal = new THREE.Vector3();

  for (let i = 0; i < beadCount; i++) {
    const angle = i / beadCount * Math.PI * 2;
    const radius = bowlRadiusAt(2.247) + 0.005;
    const beadPosition = new THREE.Vector3(
      Math.cos(angle) * radius,
      2.247,
      Math.sin(angle) * radius
    );
    radialNormal.set(Math.cos(angle), 0, Math.sin(angle));
    beadQuaternion.setFromUnitVectors(localNormal, radialNormal);
    beadMatrix.compose(beadPosition, beadQuaternion, beadScale);
    beaded_ornament.setMatrixAt(i, beadMatrix);
  }
  beaded_ornament.instanceMatrix.needsUpdate = true;
  root.add(beaded_ornament);

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