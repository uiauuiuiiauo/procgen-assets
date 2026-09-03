export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "engraved_wine_glass";

  const bowlMat = new THREE.MeshPhysicalMaterial({
    color: 0xc994c8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const stemMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8e9eb,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const footMat = stemMat;

  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x986196,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x4b294c,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const bowlProfile = [
    new THREE.Vector2(0.000, 1.460),
    new THREE.Vector2(0.090, 1.468),
    new THREE.Vector2(0.180, 1.500),
    new THREE.Vector2(0.290, 1.570),
    new THREE.Vector2(0.400, 1.680),
    new THREE.Vector2(0.500, 1.840),
    new THREE.Vector2(0.580, 2.040),
    new THREE.Vector2(0.630, 2.270),
    new THREE.Vector2(0.650, 2.500),
    new THREE.Vector2(0.650, 2.700),
    new THREE.Vector2(0.630, 2.910),
    new THREE.Vector2(0.590, 3.100),
    new THREE.Vector2(0.555, 3.250),
    new THREE.Vector2(0.535, 3.220),
    new THREE.Vector2(0.570, 3.080),
    new THREE.Vector2(0.610, 2.890),
    new THREE.Vector2(0.630, 2.690),
    new THREE.Vector2(0.630, 2.510),
    new THREE.Vector2(0.610, 2.290),
    new THREE.Vector2(0.560, 2.070),
    new THREE.Vector2(0.470, 1.870),
    new THREE.Vector2(0.370, 1.710),
    new THREE.Vector2(0.260, 1.600),
    new THREE.Vector2(0.150, 1.530),
    new THREE.Vector2(0.060, 1.500),
    new THREE.Vector2(0.000, 1.495),
  ];
  const bowlGeom = new THREE.LatheGeometry(bowlProfile, 64);
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.name = "bowl";
  root.add(bowl);

  const rimGeom = new THREE.TorusGeometry(0.545, 0.011, 10, 64);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 3.235;
  root.add(rim);

  const stemProfile = [
    new THREE.Vector2(0.000, 0.170),
    new THREE.Vector2(0.100, 0.170),
    new THREE.Vector2(0.110, 0.220),
    new THREE.Vector2(0.085, 0.300),
    new THREE.Vector2(0.065, 0.400),
    new THREE.Vector2(0.055, 0.600),
    new THREE.Vector2(0.052, 1.100),
    new THREE.Vector2(0.058, 1.280),
    new THREE.Vector2(0.075, 1.390),
    new THREE.Vector2(0.120, 1.470),
    new THREE.Vector2(0.130, 1.500),
    new THREE.Vector2(0.000, 1.515),
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 48);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.name = "stem";
  root.add(stem);

  const footProfile = [
    new THREE.Vector2(0.000, 0.035),
    new THREE.Vector2(0.180, 0.035),
    new THREE.Vector2(0.400, 0.040),
    new THREE.Vector2(0.550, 0.055),
    new THREE.Vector2(0.610, 0.085),
    new THREE.Vector2(0.590, 0.115),
    new THREE.Vector2(0.480, 0.140),
    new THREE.Vector2(0.300, 0.160),
    new THREE.Vector2(0.180, 0.190),
    new THREE.Vector2(0.110, 0.230),
    new THREE.Vector2(0.000, 0.240),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, footMat);
  foot.name = "foot";
  root.add(foot);

  const foot_rimGeom = new THREE.TorusGeometry(0.592, 0.012, 10, 64);
  const foot_rim = new THREE.Mesh(foot_rimGeom, rimMat);
  foot_rim.name = "foot_rim";
  foot_rim.rotation.x = Math.PI / 2;
  foot_rim.position.y = 0.084;
  root.add(foot_rim);

  const foot_center_ringGeom = new THREE.TorusGeometry(0.125, 0.009, 8, 40);
  const foot_center_ring = new THREE.Mesh(foot_center_ringGeom, rimMat);
  foot_center_ring.name = "foot_center_ring";
  foot_center_ring.rotation.x = Math.PI / 2;
  foot_center_ring.position.y = 0.205;
  root.add(foot_center_ring);

  const bowl_base_ringGeom = new THREE.TorusGeometry(0.092, 0.009, 8, 40);
  const bowl_base_ring = new THREE.Mesh(bowl_base_ringGeom, rimMat);
  bowl_base_ring.name = "bowl_base_ring";
  bowl_base_ring.rotation.x = Math.PI / 2;
  bowl_base_ring.position.y = 1.505;
  root.add(bowl_base_ring);

  const engraving_group = new THREE.Group();
  engraving_group.name = "engraving_group";
  root.add(engraving_group);

  const bowlRadiusSamples = [
    [1.46, 0.00],
    [1.50, 0.18],
    [1.57, 0.29],
    [1.68, 0.40],
    [1.84, 0.50],
    [2.04, 0.58],
    [2.27, 0.63],
    [2.50, 0.65],
    [2.70, 0.65],
    [2.91, 0.63],
    [3.10, 0.59],
    [3.25, 0.555],
  ];

  function bowlRadiusAt(y) {
    if (y <= bowlRadiusSamples[0][0]) return bowlRadiusSamples[0][1];
    for (let i = 1; i < bowlRadiusSamples.length; i++) {
      const lower = bowlRadiusSamples[i - 1];
      const upper = bowlRadiusSamples[i];
      if (y <= upper[0]) {
        const t = (y - lower[0]) / (upper[0] - lower[0]);
        return lower[1] + (upper[1] - lower[1]) * t;
      }
    }
    return bowlRadiusSamples[bowlRadiusSamples.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const radius = bowlRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addSurfaceStroke(name, pairs, closed, radius) {
    const points = [];
    for (let i = 0; i < pairs.length; i++) {
      points.push(surfacePoint(pairs[i][0], pairs[i][1], 0.009));
    }

    let curve;
    if (points.length === 2) {
      curve = new THREE.LineCurve3(points[0], points[1]);
    } else {
      curve = new THREE.CatmullRomCurve3(
        points,
        closed,
        "centripetal"
      );
    }

    const strokeGeom = new THREE.TubeGeometry(
      curve,
      Math.max(8, pairs.length * 4),
      radius,
      5,
      closed
    );
    const stroke = new THREE.Mesh(strokeGeom, engravingMat);
    stroke.name = name;
    engraving_group.add(stroke);
    return stroke;
  }

  function leafBoundary(length, width, teeth) {
    const boundary = [[0.00, 0.00]];
    const sides = [-1, 1];

    for (let sideIndex = 0; sideIndex < sides.length; sideIndex++) {
      const side = sides[sideIndex];
      for (let i = 1; i <= teeth; i++) {
        const t = i / (teeth + 1);
        const serration = i % 2 === 0 ? 0.72 : 1.0;
        boundary.push([
          length * t,
          side * width * Math.sin(Math.PI * t) * serration,
        ]);
      }
    }

    boundary.push([length, 0.00]);
    for (let i = teeth - 1; i >= 1; i--) {
      const t = i / (teeth + 1);
      const serration = i % 2 === 0 ? 0.72 : 1.0;
      boundary.push([
        length * t,
        -width * Math.sin(Math.PI * t) * serration,
      ]);
    }
    return boundary;
  }

  function addLeaf(name, angle, y, length, width, rotation) {
    const leaf_group = new THREE.Group();
    leaf_group.name = name;
    engraving_group.add(leaf_group);

    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);

    function mapLeafPoint(point, localOffset) {
      const u = point[0] + (localOffset ? localOffset[0] : 0);
      const v = point[1] + (localOffset ? localOffset[1] : 0);
      const tangentU = u * cosRotation - v * sinRotation;
      const verticalV = u * sinRotation + v * cosRotation;
      const leafY = y + verticalV;
      const radius = Math.max(0.12, bowlRadiusAt(leafY));
      const leafAngle = angle - tangentU / radius;
      return surfacePoint(leafAngle, leafY, 0.011);
    }

    const boundary = leafBoundary(length, width, 8);
    const outlinePoints = [];
    for (let i = 0; i < boundary.length; i++) {
      outlinePoints.push(mapLeafPoint(boundary[i]));
    }
    const outlineCurve = new THREE.CatmullRomCurve3(
      outlinePoints,
      true,
      "centripetal"
    );
    const leaf_outlineGeom = new THREE.TubeGeometry(
      outlineCurve,
      boundary.length * 3,
      0.0042,
      5,
      true
    );
    const leaf_outline = new THREE.Mesh(leaf_outlineGeom, engravingMat);
    leaf_outline.name = name + "_outline";
    leaf_group.add(leaf_outline);

    function addLeafStroke(suffix, localPoints, closed) {
      const mapped = [];
      for (let i = 0; i < localPoints.length; i++) {
        mapped.push(mapLeafPoint(localPoints[i]));
      }
      const curve = mapped.length === 2
        ? new THREE.LineCurve3(mapped[0], mapped[1])
        : new THREE.CatmullRomCurve3(mapped, closed, "centripetal");
      const leaf_strokeGeom = new THREE.TubeGeometry(
        curve,
        Math.max(6, localPoints.length * 4),
        0.0028,
        5,
        closed
      );
      const leaf_stroke = new THREE.Mesh(leaf_strokeGeom, engravingMat);
      leaf_stroke.name = name + "_" + suffix;
      leaf_group.add(leaf_stroke);
    }

    addLeafStroke("central_vein", [[0.00, 0.00], [length * 0.91, 0.00]], false);
    addLeafStroke("upper_vein", [[length * 0.24, 0.00], [length * 0.48, width * 0.50]], false);
    addLeafStroke("lower_vein", [[length * 0.24, 0.00], [length * 0.48, -width * 0.50]], false);
    addLeafStroke("upper_fork", [[length * 0.47, 0.00], [length * 0.70, width * 0.42]], false);
    addLeafStroke("lower_fork", [[length * 0.47, 0.00], [length * 0.70, -width * 0.42]], false);
    addLeafStroke("leaf_base", [[length * 0.02, 0.00], [length * 0.20, width * 0.18], [length * 0.20, -width * 0.18]], false);

    return leaf_group;
  }

  const main_vine = addSurfaceStroke("main_vine", [
    [1.30, 1.64],
    [1.42, 1.78],
    [1.55, 1.94],
    [1.69, 2.12],
    [1.84, 2.31],
    [1.98, 2.50],
  ], false, 0.0048);

  const left_branch = addSurfaceStroke("left_branch", [
    [1.55, 1.94],
    [1.75, 2.06],
    [1.96, 2.18],
    [2.18, 2.27],
  ], false, 0.0042);

  const lower_left_branch = addSurfaceStroke("lower_left_branch", [
    [1.42, 1.78],
    [1.70, 1.75],
    [1.98, 1.76],
    [2.25, 1.82],
  ], false, 0.004);

  const right_vine = addSurfaceStroke("right_vine", [
    [0.70, 1.68],
    [0.78, 1.88],
    [0.84, 2.08],
    [0.88, 2.28],
    [0.91, 2.48],
  ], false, 0.0044);

  const right_branch = addSurfaceStroke("right_branch", [
    [0.82, 2.02],
    [0.68, 2.16],
    [0.57, 2.30],
    [0.50, 2.42],
  ], false, 0.0038);

  const left_vine = addSurfaceStroke("left_vine", [
    [2.45, 1.72],
    [2.40, 1.92],
    [2.36, 2.12],
    [2.34, 2.34],
    [2.36, 2.58],
  ], false, 0.0042);

  const upper_left_branch = addSurfaceStroke("upper_left_branch", [
    [2.36, 2.18],
    [2.48, 2.31],
    [2.55, 2.45],
    [2.58, 2.60],
  ], false, 0.0038);

  const upper_leaf = addLeaf("upper_leaf", 1.98, 2.50, 0.36, 0.13, 1.02);
  const middle_leaf = addLeaf("middle_leaf", 1.69, 2.12, 0.31, 0.12, 2.55);
  const lower_leaf = addLeaf("lower_leaf", 1.42, 1.78, 0.27, 0.105, -2.42);
  const left_leaf = addLeaf("left_leaf", 2.18, 2.27, 0.31, 0.12, 2.88);
  const small_left_leaf = addLeaf("small_left_leaf", 2.25, 1.82, 0.22, 0.085, -2.48);
  const right_leaf = addLeaf("right_leaf", 0.91, 2.48, 0.31, 0.11, 1.20);
  const lower_right_leaf = addLeaf("lower_right_leaf", 0.78, 1.88, 0.28, 0.105, -0.55);
  const far_right_leaf = addLeaf("far_right_leaf", 0.50, 2.42, 0.25, 0.09, 1.02);
  const far_left_leaf = addLeaf("far_left_leaf", 2.36, 2.58, 0.27, 0.10, 1.28);

  fitToUnitCube(THREE, root);
  return root;

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
}