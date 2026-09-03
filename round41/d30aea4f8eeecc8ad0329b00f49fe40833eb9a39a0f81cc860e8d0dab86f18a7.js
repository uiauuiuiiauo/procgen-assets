export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x666a6d,
    metalness: 0.5,
    roughness: 0.35,
    side: THREE.DoubleSide,
  });

  const cup_body = new THREE.Group();
  const pedestal = new THREE.Group();
  root.add(cup_body, pedestal);

  const cup_bowlProfile = [
    new THREE.Vector2(0.000, 0.750),
    new THREE.Vector2(0.100, 0.755),
    new THREE.Vector2(0.220, 0.790),
    new THREE.Vector2(0.340, 0.860),
    new THREE.Vector2(0.430, 0.980),
    new THREE.Vector2(0.490, 1.140),
    new THREE.Vector2(0.525, 1.340),
    new THREE.Vector2(0.545, 1.580),
    new THREE.Vector2(0.560, 1.820),
    new THREE.Vector2(0.570, 1.950),
    new THREE.Vector2(0.590, 1.985),
    new THREE.Vector2(0.585, 2.020),
    new THREE.Vector2(0.550, 2.045),
    new THREE.Vector2(0.515, 2.035),
    new THREE.Vector2(0.500, 1.995),
    new THREE.Vector2(0.505, 1.950),
    new THREE.Vector2(0.498, 1.820),
    new THREE.Vector2(0.485, 1.580),
    new THREE.Vector2(0.465, 1.350),
    new THREE.Vector2(0.430, 1.150),
    new THREE.Vector2(0.370, 0.990),
    new THREE.Vector2(0.280, 0.880),
    new THREE.Vector2(0.160, 0.820),
    new THREE.Vector2(0.000, 0.800),
  ];
  const cup_bowlGeom = new THREE.LatheGeometry(cup_bowlProfile, 64);
  const cup_bowl = new THREE.Mesh(cup_bowlGeom, silverMat);
  cup_body.add(cup_bowl);

  const top_rimGeom = new THREE.TorusGeometry(0.552, 0.035, 14, 72);
  const top_rim = new THREE.Mesh(top_rimGeom, silverMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 2.005;
  cup_body.add(top_rim);

  const inner_rim_shadowGeom = new THREE.TorusGeometry(0.505, 0.006, 8, 72);
  const inner_rim_shadow = new THREE.Mesh(inner_rim_shadowGeom, engravingMat);
  inner_rim_shadow.rotation.x = Math.PI / 2;
  inner_rim_shadow.position.y = 1.970;
  cup_body.add(inner_rim_shadow);

  const upper_engraved_bandGeom = new THREE.TorusGeometry(0.566, 0.006, 8, 72);
  const upper_engraved_band = new THREE.Mesh(upper_engraved_bandGeom, engravingMat);
  upper_engraved_band.rotation.x = Math.PI / 2;
  upper_engraved_band.position.y = 1.895;
  cup_body.add(upper_engraved_band);

  const lower_engraved_bandGeom = new THREE.TorusGeometry(0.558, 0.0045, 8, 72);
  const lower_engraved_band = new THREE.Mesh(lower_engraved_bandGeom, engravingMat);
  lower_engraved_band.rotation.x = Math.PI / 2;
  lower_engraved_band.position.y = 1.855;
  cup_body.add(lower_engraved_band);

  const rim_beadingGeom = new THREE.SphereGeometry(0.007, 8, 6);
  const rim_beading = new THREE.InstancedMesh(rim_beadingGeom, engravingMat, 64);
  const beadMatrix = new THREE.Matrix4();
  const beadQuaternion = new THREE.Quaternion();
  const beadScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < 64; i++) {
    const angle = i / 64 * Math.PI * 2;
    const beadPosition = new THREE.Vector3(
      Math.cos(angle) * 0.562,
      1.875,
      Math.sin(angle) * 0.562
    );
    beadMatrix.compose(beadPosition, beadQuaternion, beadScale);
    rim_beading.setMatrixAt(i, beadMatrix);
  }
  rim_beading.instanceMatrix.needsUpdate = true;
  cup_body.add(rim_beading);

  const outerRadiusSamples = [
    [0.75, 0.10],
    [0.82, 0.25],
    [0.98, 0.43],
    [1.14, 0.49],
    [1.34, 0.525],
    [1.58, 0.545],
    [1.82, 0.560],
    [1.95, 0.570],
    [2.02, 0.585],
  ];

  function outerRadiusAt(y) {
    if (y <= outerRadiusSamples[0][0]) return outerRadiusSamples[0][1];
    for (let i = 1; i < outerRadiusSamples.length; i++) {
      const lower = outerRadiusSamples[i - 1];
      const upper = outerRadiusSamples[i];
      if (y <= upper[0]) {
        const t = (y - lower[0]) / (upper[0] - lower[0]);
        return lower[1] + (upper[1] - lower[1]) * t;
      }
    }
    return outerRadiusSamples[outerRadiusSamples.length - 1][1];
  }

  function surfacePoint(localX, y, extra) {
    const radius = outerRadiusAt(y) + extra;
    const angle = Math.PI / 2 - localX / radius;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addSurfaceTube(parent, points, radius, closed) {
    const path = [];
    for (let i = 0; i < points.length; i++) {
      path.push(surfacePoint(points[i][0], points[i][1], 0.009));
    }
    const curve = new THREE.CatmullRomCurve3(path, closed, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, points.length * 4),
      radius,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geometry, engravingMat);
    parent.add(mesh);
    return mesh;
  }

  function mirrorPoints(points) {
    const mirrored = [];
    for (let i = 0; i < points.length; i++) {
      mirrored.push([-points[i][0], points[i][1]]);
    }
    return mirrored;
  }

  const engraved_scrollwork = new THREE.Group();
  cup_body.add(engraved_scrollwork);

  const upperGarlandPoints = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    upperGarlandPoints.push([
      -0.34 + t * 0.68,
      1.835 - Math.sin(t * Math.PI) * 0.115,
    ]);
  }
  const upper_left_garland = addSurfaceTube(
    engraved_scrollwork,
    upperGarlandPoints,
    0.0055,
    false
  );
  const upper_right_garland = addSurfaceTube(
    engraved_scrollwork,
    mirrorPoints(upperGarlandPoints),
    0.0055,
    false
  );

  const leftUpperScrollPoints = [
    [-0.015, 1.705],
    [-0.075, 1.790],
    [-0.165, 1.825],
    [-0.245, 1.790],
    [-0.270, 1.715],
    [-0.225, 1.660],
    [-0.155, 1.675],
    [-0.135, 1.735],
    [-0.180, 1.770],
  ];
  const left_upper_scroll = addSurfaceTube(
    engraved_scrollwork,
    leftUpperScrollPoints,
    0.006,
    false
  );
  const right_upper_scroll = addSurfaceTube(
    engraved_scrollwork,
    mirrorPoints(leftUpperScrollPoints),
    0.006,
    false
  );

  const leftMiddleScrollPoints = [
    [-0.025, 1.505],
    [-0.105, 1.575],
    [-0.205, 1.570],
    [-0.285, 1.505],
    [-0.300, 1.405],
    [-0.245, 1.335],
    [-0.165, 1.360],
    [-0.135, 1.430],
    [-0.180, 1.485],
    [-0.245, 1.455],
  ];
  const left_middle_scroll = addSurfaceTube(
    engraved_scrollwork,
    leftMiddleScrollPoints,
    0.006,
    false
  );
  const right_middle_scroll = addSurfaceTube(
    engraved_scrollwork,
    mirrorPoints(leftMiddleScrollPoints),
    0.006,
    false
  );

  const leftLowerScrollPoints = [
    [-0.015, 1.285],
    [-0.095, 1.220],
    [-0.195, 1.205],
    [-0.285, 1.255],
    [-0.305, 1.330],
    [-0.255, 1.385],
    [-0.185, 1.365],
    [-0.155, 1.315],
    [-0.205, 1.285],
  ];
  const left_lower_scroll = addSurfaceTube(
    engraved_scrollwork,
    leftLowerScrollPoints,
    0.006,
    false
  );
  const right_lower_scroll = addSurfaceTube(
    engraved_scrollwork,
    mirrorPoints(leftLowerScrollPoints),
    0.006,
    false
  );

  const central_shield_outline = addSurfaceTube(
    engraved_scrollwork,
    [
      [0.000, 1.725],
      [0.115, 1.650],
      [0.165, 1.525],
      [0.135, 1.375],
      [0.055, 1.270],
      [0.000, 1.225],
      [-0.055, 1.270],
      [-0.135, 1.375],
      [-0.165, 1.525],
      [-0.115, 1.650],
    ],
    0.0065,
    true
  );

  const central_inner_heart = addSurfaceTube(
    engraved_scrollwork,
    [
      [0.000, 1.555],
      [0.070, 1.495],
      [0.082, 1.415],
      [0.045, 1.350],
      [0.000, 1.320],
      [-0.045, 1.350],
      [-0.082, 1.415],
      [-0.070, 1.495],
    ],
    0.005,
    true
  );

  const central_stem = addSurfaceTube(
    engraved_scrollwork,
    [
      [0.000, 1.245],
      [-0.012, 1.330],
      [0.012, 1.420],
      [-0.008, 1.520],
      [0.000, 1.620],
      [0.000, 1.705],
    ],
    0.005,
    false
  );

  const leftCentralBranchPoints = [
    [-0.005, 1.430],
    [-0.055, 1.475],
    [-0.105, 1.540],
    [-0.125, 1.615],
    [-0.095, 1.665],
  ];
  const left_central_branch = addSurfaceTube(
    engraved_scrollwork,
    leftCentralBranchPoints,
    0.0045,
    false
  );
  const right_central_branch = addSurfaceTube(
    engraved_scrollwork,
    mirrorPoints(leftCentralBranchPoints),
    0.0045,
    false
  );

  const leftBottomCurlPoints = [
    [-0.020, 1.285],
    [-0.075, 1.220],
    [-0.145, 1.215],
    [-0.185, 1.260],
    [-0.165, 1.315],
    [-0.115, 1.325],
    [-0.095, 1.285],
  ];
  const left_bottom_curl = addSurfaceTube(
    engraved_scrollwork,
    leftBottomCurlPoints,
    0.005,
    false
  );
  const right_bottom_curl = addSurfaceTube(
    engraved_scrollwork,
    mirrorPoints(leftBottomCurlPoints),
    0.005,
    false
  );

  const panelCenters = [
    Math.PI / 2,
    0,
    -Math.PI / 2,
    Math.PI,
  ];

  function addPanelScroll(points, radius) {
    for (let p = 0; p < panelCenters.length; p++) {
      const centerAngle = panelCenters[p];
      const shiftedPoints = [];
      for (let i = 0; i < points.length; i++) {
        shiftedPoints.push([
          points[i][0] + (centerAngle - Math.PI / 2) * outerRadiusAt(points[i][1]),
          points[i][1],
        ]);
      }
      addSurfaceTube(engraved_scrollwork, shiftedPoints, radius, false);
    }
  }

  addPanelScroll(leftUpperScrollPoints, 0.0055);
  addPanelScroll(mirrorPoints(leftUpperScrollPoints), 0.0055);
  addPanelScroll(leftMiddleScrollPoints, 0.0055);
  addPanelScroll(mirrorPoints(leftMiddleScrollPoints), 0.0055);
  addPanelScroll(leftLowerScrollPoints, 0.0055);
  addPanelScroll(mirrorPoints(leftLowerScrollPoints), 0.0055);

  const engraved_leafShape = new THREE.Shape();
  engraved_leafShape.moveTo(0, -0.055);
  engraved_leafShape.bezierCurveTo(0.036, -0.025, 0.038, 0.028, 0, 0.060);
  engraved_leafShape.bezierCurveTo(-0.038, 0.028, -0.036, -0.025, 0, -0.055);

  const engraved_leavesGeom = new THREE.ShapeGeometry(engraved_leafShape, 6);
  const leafSpecs = [
    [0.000, 1.665, 0.00, 0.90, 1.00],
    [-0.070, 1.600, 0.65, 0.78, 0.90],
    [0.070, 1.600, -0.65, 0.78, 0.90],
    [-0.105, 1.500, 0.90, 0.72, 0.88],
    [0.105, 1.500, -0.90, 0.72, 0.88],
    [-0.070, 1.365, 0.72, 0.68, 0.82],
    [0.070, 1.365, -0.72, 0.68, 0.82],
    [0.000, 1.255, Math.PI, 0.78, 1.05],
    [-0.235, 1.735, 0.55, 0.55, 0.68],
    [0.235, 1.735, -0.55, 0.55, 0.68],
    [-0.245, 1.405, 1.10, 0.56, 0.72],
    [0.245, 1.405, -1.10, 0.56, 0.72],
    [-0.225, 1.285, 2.20, 0.50, 0.65],
    [0.225, 1.285, -2.20, 0.50, 0.65],
  ];

  const leafCount = leafSpecs.length * panelCenters.length;
  const engraved_leaves = new THREE.InstancedMesh(
    engraved_leavesGeom,
    engravingMat,
    leafCount
  );
  const leafMatrix = new THREE.Matrix4();
  const leafNormalAxis = new THREE.Vector3(0, 0, 1);
  let leafIndex = 0;

  for (let p = 0; p < panelCenters.length; p++) {
    const centerAngle = panelCenters[p];
    for (let i = 0; i < leafSpecs.length; i++) {
      const spec = leafSpecs[i];
      const localX = spec[0] + (centerAngle - Math.PI / 2) * outerRadiusAt(spec[1]);
      const position = surfacePoint(localX, spec[1], 0.011);
      const normal = new THREE.Vector3(position.x, 0, position.z).normalize();
      const surfaceQuaternion = new THREE.Quaternion().setFromUnitVectors(
        leafNormalAxis,
        normal
      );
      const twistQuaternion = new THREE.Quaternion().setFromAxisAngle(
        leafNormalAxis,
        spec[2]
      );
      surfaceQuaternion.multiply(twistQuaternion);
      const scale = new THREE.Vector3(spec[3], spec[4], 1);
      leafMatrix.compose(position, surfaceQuaternion, scale);
      engraved_leaves.setMatrixAt(leafIndex, leafMatrix);
      leafIndex++;
    }
  }
  engraved_leaves.instanceMatrix.needsUpdate = true;
  cup_body.add(engraved_leaves);

  const pedestal_baseProfile = [
    new THREE.Vector2(0.000, 0.020),
    new THREE.Vector2(0.400, 0.020),
    new THREE.Vector2(0.490, 0.035),
    new THREE.Vector2(0.530, 0.070),
    new THREE.Vector2(0.520, 0.105),
    new THREE.Vector2(0.460, 0.145),
    new THREE.Vector2(0.340, 0.195),
    new THREE.Vector2(0.230, 0.235),
    new THREE.Vector2(0.170, 0.280),
    new THREE.Vector2(0.145, 0.320),
    new THREE.Vector2(0.000, 0.320),
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, silverMat);
  pedestal.add(pedestal_base);

  const base_rimGeom = new THREE.TorusGeometry(0.495, 0.022, 12, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, silverMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.060;
  pedestal.add(base_rim);

  const base_shadow_ringGeom = new THREE.TorusGeometry(0.475, 0.006, 8, 64);
  const base_shadow_ring = new THREE.Mesh(base_shadow_ringGeom, engravingMat);
  base_shadow_ring.rotation.x = Math.PI / 2;
  base_shadow_ring.position.y = 0.035;
  pedestal.add(base_shadow_ring);

  const stemProfile = [
    new THREE.Vector2(0.000, 0.245),
    new THREE.Vector2(0.150, 0.245),
    new THREE.Vector2(0.180, 0.285),
    new THREE.Vector2(0.190, 0.335),
    new THREE.Vector2(0.160, 0.390),
    new THREE.Vector2(0.120, 0.445),
    new THREE.Vector2(0.105, 0.500),
    new THREE.Vector2(0.110, 0.555),
    new THREE.Vector2(0.135, 0.600),
    new THREE.Vector2(0.150, 0.635),
    new THREE.Vector2(0.140, 0.675),
    new THREE.Vector2(0.105, 0.710),
    new THREE.Vector2(0.090, 0.750),
    new THREE.Vector2(0.000, 0.750),
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 48);
  const stem = new THREE.Mesh(stemGeom, silverMat);
  pedestal.add(stem);

  const lower_stem_collarGeom = new THREE.TorusGeometry(0.166, 0.016, 10, 48);
  const lower_stem_collar = new THREE.Mesh(lower_stem_collarGeom, silverMat);
  lower_stem_collar.rotation.x = Math.PI / 2;
  lower_stem_collar.position.y = 0.305;
  pedestal.add(lower_stem_collar);

  const upper_stem_collarGeom = new THREE.TorusGeometry(0.132, 0.015, 10, 48);
  const upper_stem_collar = new THREE.Mesh(upper_stem_collarGeom, silverMat);
  upper_stem_collar.rotation.x = Math.PI / 2;
  upper_stem_collar.position.y = 0.665;
  pedestal.add(upper_stem_collar);

  const stem_shadow_ringGeom = new THREE.TorusGeometry(0.112, 0.005, 8, 48);
  const stem_shadow_ring = new THREE.Mesh(stem_shadow_ringGeom, engravingMat);
  stem_shadow_ring.rotation.x = Math.PI / 2;
  stem_shadow_ring.position.y = 0.705;
  pedestal.add(stem_shadow_ring);

  const bowl_connectorGeom = new THREE.SphereGeometry(0.120, 32, 16);
  const bowl_connector = new THREE.Mesh(bowl_connectorGeom, silverMat);
  bowl_connector.scale.set(1, 0.34, 1);
  bowl_connector.position.y = 0.765;
  pedestal.add(bowl_connector);

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