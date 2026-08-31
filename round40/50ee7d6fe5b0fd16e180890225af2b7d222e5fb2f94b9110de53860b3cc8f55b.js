export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "marbled_leather_wallet";

  const coverW = 0.72;
  const coverH = 1.0;
  const coverDepth = 0.016;
  const cornerR = 0.055;
  const frontZ = 0.032;

  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x151519,
    metalness: 0.0,
    roughness: 0.7,
  });
  const spineMat = new THREE.MeshStandardMaterial({
    color: 0x101014,
    metalness: 0.0,
    roughness: 0.7,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x08080a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x050506,
    metalness: 0.0,
    roughness: 0.95,
  });
  const marbling_grayMat = new THREE.MeshStandardMaterial({
    color: 0x34343a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const marbling_darkMat = new THREE.MeshStandardMaterial({
    color: 0x202025,
    metalness: 0.0,
    roughness: 0.7,
  });
  const marbling_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a51,
    metalness: 0.0,
    roughness: 0.7,
  });
  const marbling_blackMat = new THREE.MeshStandardMaterial({
    color: 0x0b0b0e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0x76583f,
    metalness: 0.0,
    roughness: 0.9,
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function roundedRectPoints(w, h, r, z, cornerSegments) {
    const points = [];
    const corners = [
      [w / 2 - r, h / 2 - r, 0],
      [-w / 2 + r, h / 2 - r, Math.PI / 2],
      [-w / 2 + r, -h / 2 + r, Math.PI],
      [w / 2 - r, -h / 2 + r, Math.PI * 1.5],
    ];

    for (const corner of corners) {
      for (let i = 0; i <= cornerSegments; i++) {
        const angle = corner[2] + (i / cornerSegments) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          corner[1] + Math.sin(angle) * r,
          z
        ));
      }
    }
    return points;
  }

  function addRibbon(parent, name, coords, width, material, z) {
    const controlPoints = coords.map(
      (point) => new THREE.Vector3(point[0], point[1], 0)
    );
    const curve = new THREE.CatmullRomCurve3(
      controlPoints,
      false,
      "centripetal",
      0.5
    );
    const samples = curve.getSpacedPoints(56);
    const left = [];
    const right = [];

    for (let i = 0; i < samples.length; i++) {
      const previous = samples[Math.max(0, i - 1)];
      const next = samples[Math.min(samples.length - 1, i + 1)];
      const dx = next.x - previous.x;
      const dy = next.y - previous.y;
      const length = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / length;
      const ny = dx / length;
      const t = i / (samples.length - 1);
      const taper = 0.12 + 0.88 * Math.pow(Math.sin(Math.PI * t), 0.45);
      const variation = 0.9 + 0.1 * Math.sin(t * Math.PI * 5);
      const halfWidth = width * taper * variation * 0.5;

      left.push(new THREE.Vector2(
        samples[i].x + nx * halfWidth,
        samples[i].y + ny * halfWidth
      ));
      right.push(new THREE.Vector2(
        samples[i].x - nx * halfWidth,
        samples[i].y - ny * halfWidth
      ));
    }

    const ribbonShape = new THREE.Shape();
    ribbonShape.moveTo(left[0].x, left[0].y);
    for (let i = 1; i < left.length; i++) {
      ribbonShape.lineTo(left[i].x, left[i].y);
    }
    for (let i = right.length - 1; i >= 0; i--) {
      ribbonShape.lineTo(right[i].x, right[i].y);
    }
    ribbonShape.closePath();

    const ribbonGeom = new THREE.ShapeGeometry(ribbonShape, 1);
    const ribbon = new THREE.Mesh(ribbonGeom, material);
    ribbon.name = name;
    ribbon.position.z = z;
    parent.add(ribbon);
    return ribbon;
  }

  const coverShape = roundedRectShape(coverW, coverH, cornerR);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: coverDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 4,
    curveSegments: 16,
  });
  coverGeom.translate(0, 0, -coverDepth / 2);

  const back_cover = new THREE.Mesh(coverGeom, coverMat);
  back_cover.name = "back_cover";
  back_cover.position.z = -0.024;
  root.add(back_cover);

  const front_cover = new THREE.Mesh(coverGeom, coverMat);
  front_cover.name = "front_cover";
  front_cover.position.z = 0.016;
  root.add(front_cover);

  const spineGeom = new THREE.CapsuleGeometry(0.028, 0.90, 8, 18);
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.name = "spine";
  spine.position.set(-0.35, 0, 0.004);
  spine.scale.set(1.0, 1.0, 1.45);
  root.add(spine);

  const spine_creaseGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.318, -0.445, frontZ + 0.003),
      new THREE.Vector3(-0.318, 0.445, frontZ + 0.003)
    ),
    1,
    0.0024,
    6,
    false
  );
  const spine_crease = new THREE.Mesh(spine_creaseGeom, edgeMat);
  spine_crease.name = "spine_crease";
  root.add(spine_crease);

  const edgePoints = roundedRectPoints(
    coverW - 0.018,
    coverH - 0.018,
    cornerR - 0.008,
    frontZ + 0.002,
    7
  );
  const edgeCurve = new THREE.CatmullRomCurve3(
    edgePoints,
    true,
    "centripetal",
    0.5
  );
  const edge_pipingGeom = new THREE.TubeGeometry(
    edgeCurve,
    128,
    0.0032,
    7,
    true
  );
  const edge_piping = new THREE.Mesh(edge_pipingGeom, edgeMat);
  edge_piping.name = "edge_piping";
  root.add(edge_piping);

  const horizontalStitchCount = 20;
  const verticalStitchCount = 24;
  const stitchCount = horizontalStitchCount * 2 + verticalStitchCount * 2;
  const stitchingGeom = new THREE.BoxGeometry(0.021, 0.0028, 0.0025);
  const stitching = new THREE.InstancedMesh(
    stitchingGeom,
    seamMat,
    stitchCount
  );
  stitching.name = "edge_stitching";

  const stitchDummy = new THREE.Object3D();
  let stitchIndex = 0;
  const stitchX = 0.316;
  const stitchY = 0.468;

  for (let i = 0; i < horizontalStitchCount; i++) {
    const x = -0.292 + (i / (horizontalStitchCount - 1)) * 0.584;

    stitchDummy.position.set(x, stitchY, frontZ + 0.006);
    stitchDummy.rotation.set(0, 0, 0);
    stitchDummy.updateMatrix();
    stitching.setMatrixAt(stitchIndex++, stitchDummy.matrix);

    stitchDummy.position.set(x, -stitchY, frontZ + 0.006);
    stitchDummy.updateMatrix();
    stitching.setMatrixAt(stitchIndex++, stitchDummy.matrix);
  }

  for (let i = 0; i < verticalStitchCount; i++) {
    const y = -0.425 + (i / (verticalStitchCount - 1)) * 0.85;

    stitchDummy.position.set(stitchX, y, frontZ + 0.006);
    stitchDummy.rotation.set(0, 0, Math.PI / 2);
    stitchDummy.updateMatrix();
    stitching.setMatrixAt(stitchIndex++, stitchDummy.matrix);

    stitchDummy.position.set(-stitchX, y, frontZ + 0.006);
    stitchDummy.updateMatrix();
    stitching.setMatrixAt(stitchIndex++, stitchDummy.matrix);
  }
  stitching.instanceMatrix.needsUpdate = true;
  root.add(stitching);

  const marbled_ribbons = new THREE.Group();
  marbled_ribbons.name = "marbled_ribbons";
  front_cover.add(marbled_ribbons);

  const upper_left_sweep = addRibbon(
    marbled_ribbons,
    "upper_left_sweep",
    [
      [-0.342, 0.405],
      [-0.292, 0.448],
      [-0.220, 0.435],
      [-0.158, 0.365],
      [-0.118, 0.260],
      [-0.058, 0.170],
      [0.030, 0.112],
      [0.128, 0.128],
      [0.225, 0.192],
      [0.342, 0.240],
    ],
    0.042,
    marbling_grayMat,
    frontZ + 0.0010
  );

  const upper_left_echo = addRibbon(
    marbled_ribbons,
    "upper_left_echo",
    [
      [-0.342, 0.365],
      [-0.286, 0.405],
      [-0.225, 0.388],
      [-0.178, 0.325],
      [-0.148, 0.232],
      [-0.088, 0.142],
      [0.000, 0.086],
      [0.105, 0.092],
      [0.210, 0.150],
      [0.342, 0.190],
    ],
    0.016,
    marbling_darkMat,
    frontZ + 0.0014
  );

  const upper_left_highlight = addRibbon(
    marbled_ribbons,
    "upper_left_highlight",
    [
      [-0.335, 0.420],
      [-0.280, 0.438],
      [-0.225, 0.405],
      [-0.172, 0.335],
      [-0.128, 0.245],
      [-0.070, 0.178],
      [0.020, 0.140],
      [0.120, 0.158],
      [0.225, 0.215],
      [0.335, 0.255],
    ],
    0.007,
    marbling_highlightMat,
    frontZ + 0.0018
  );

  const upper_left_inner_curl = addRibbon(
    marbled_ribbons,
    "upper_left_inner_curl",
    [
      [-0.305, 0.445],
      [-0.252, 0.438],
      [-0.210, 0.390],
      [-0.198, 0.326],
      [-0.225, 0.272],
      [-0.278, 0.248],
      [-0.320, 0.270],
      [-0.330, 0.315],
      [-0.305, 0.352],
      [-0.270, 0.354],
    ],
    0.012,
    marbling_blackMat,
    frontZ + 0.0020
  );

  const upper_left_inner_highlight = addRibbon(
    marbled_ribbons,
    "upper_left_inner_highlight",
    [
      [-0.292, 0.430],
      [-0.250, 0.418],
      [-0.225, 0.377],
      [-0.220, 0.330],
      [-0.245, 0.292],
      [-0.286, 0.280],
      [-0.312, 0.305],
      [-0.306, 0.337],
      [-0.280, 0.348],
    ],
    0.005,
    marbling_highlightMat,
    frontZ + 0.0022
  );

  const top_center_wave = addRibbon(
    marbled_ribbons,
    "top_center_wave",
    [
      [-0.175, 0.462],
      [-0.128, 0.410],
      [-0.092, 0.342],
      [-0.030, 0.300],
      [0.052, 0.306],
      [0.122, 0.348],
      [0.182, 0.350],
      [0.238, 0.310],
      [0.300, 0.280],
      [0.344, 0.292],
    ],
    0.025,
    marbling_grayMat,
    frontZ + 0.0011
  );

  const top_center_echo = addRibbon(
    marbled_ribbons,
    "top_center_echo",
    [
      [-0.158, 0.455],
      [-0.118, 0.392],
      [-0.080, 0.318],
      [-0.012, 0.270],
      [0.066, 0.278],
      [0.130, 0.326],
      [0.190, 0.328],
      [0.250, 0.282],
      [0.342, 0.250],
    ],
    0.008,
    marbling_highlightMat,
    frontZ + 0.0017
  );

  const upper_right_sweep = addRibbon(
    marbled_ribbons,
    "upper_right_sweep",
    [
      [0.030, 0.455],
      [0.108, 0.420],
      [0.170, 0.400],
      [0.224, 0.410],
      [0.278, 0.442],
      [0.342, 0.420],
    ],
    0.018,
    marbling_darkMat,
    frontZ + 0.0013
  );

  const middle_sweep = addRibbon(
    marbled_ribbons,
    "middle_sweep",
    [
      [-0.344, 0.105],
      [-0.275, 0.145],
      [-0.198, 0.160],
      [-0.120, 0.120],
      [-0.062, 0.040],
      [-0.010, -0.020],
      [0.060, -0.030],
      [0.122, 0.020],
      [0.180, 0.100],
      [0.260, 0.150],
      [0.344, 0.130],
    ],
    0.036,
    marbling_darkMat,
    frontZ + 0.0012
  );

  const middle_sweep_highlight = addRibbon(
    marbled_ribbons,
    "middle_sweep_highlight",
    [
      [-0.342, 0.122],
      [-0.268, 0.160],
      [-0.190, 0.170],
      [-0.110, 0.128],
      [-0.050, 0.050],
      [0.010, -0.002],
      [0.070, 0.010],
      [0.130, 0.060],
      [0.190, 0.130],
      [0.268, 0.170],
      [0.342, 0.150],
    ],
    0.007,
    marbling_highlightMat,
    frontZ + 0.0019
  );

  const central_swirl = addRibbon(
    marbled_ribbons,
    "central_swirl",
    [
      [0.230, 0.280],
      [0.160, 0.220],
      [0.080, 0.190],
      [0.010, 0.160],
      [-0.030, 0.100],
      [-0.020, 0.040],
      [0.030, 0.000],
      [0.090, 0.020],
      [0.120, 0.080],
      [0.100, 0.140],
      [0.060, 0.170],
    ],
    0.027,
    marbling_grayMat,
    frontZ + 0.0018
  );

  const central_swirl_inner = addRibbon(
    marbled_ribbons,
    "central_swirl_inner",
    [
      [0.205, 0.258],
      [0.145, 0.205],
      [0.075, 0.175],
      [0.020, 0.135],
      [-0.005, 0.085],
      [0.010, 0.050],
      [0.050, 0.035],
      [0.085, 0.060],
      [0.090, 0.105],
      [0.065, 0.135],
    ],
    0.010,
    marbling_blackMat,
    frontZ + 0.0022
  );

  const lower_left_sweep = addRibbon(
    marbled_ribbons,
    "lower_left_sweep",
    [
      [-0.344, -0.090],
      [-0.280, -0.130],
      [-0.210, -0.120],
      [-0.150, -0.070],
      [-0.100, -0.020],
      [-0.050, -0.040],
      [0.000, -0.110],
      [0.020, -0.200],
      [0.070, -0.280],
      [0.150, -0.340],
      [0.250, -0.370],
      [0.342, -0.350],
    ],
    0.045,
    marbling_grayMat,
    frontZ + 0.0010
  );

  const lower_left_echo = addRibbon(
    marbled_ribbons,
    "lower_left_echo",
    [
      [-0.344, -0.135],
      [-0.275, -0.170],
      [-0.205, -0.150],
      [-0.140, -0.095],
      [-0.085, -0.055],
      [-0.040, -0.080],
      [-0.010, -0.150],
      [0.020, -0.240],
      [0.090, -0.320],
      [0.180, -0.380],
      [0.300, -0.405],
    ],
    0.017,
    marbling_darkMat,
    frontZ + 0.0015
  );

  const lower_left_highlight = addRibbon(
    marbled_ribbons,
    "lower_left_highlight",
    [
      [-0.338, -0.070],
      [-0.270, -0.108],
      [-0.200, -0.100],
      [-0.135, -0.050],
      [-0.085, -0.010],
      [-0.040, -0.030],
      [0.010, -0.095],
      [0.040, -0.180],
      [0.090, -0.255],
      [0.170, -0.310],
      [0.260, -0.335],
      [0.338, -0.320],
    ],
    0.007,
    marbling_highlightMat,
    frontZ + 0.0020
  );

  const lower_right_arch = addRibbon(
    marbled_ribbons,
    "lower_right_arch",
    [
      [-0.030, -0.455],
      [0.020, -0.360],
      [0.080, -0.280],
      [0.150, -0.230],
      [0.230, -0.220],
      [0.300, -0.270],
      [0.342, -0.340],
    ],
    0.032,
    marbling_darkMat,
    frontZ + 0.0014
  );

  const lower_right_arch_inner = addRibbon(
    marbled_ribbons,
    "lower_right_arch_inner",
    [
      [-0.010, -0.445],
      [0.040, -0.350],
      [0.100, -0.290],
      [0.160, -0.260],
      [0.220, -0.255],
      [0.280, -0.290],
      [0.330, -0.350],
    ],
    0.010,
    marbling_highlightMat,
    frontZ + 0.0020
  );

  const bottom_wave = addRibbon(
    marbled_ribbons,
    "bottom_wave",
    [
      [-0.342, -0.350],
      [-0.280, -0.380],
      [-0.210, -0.405],
      [-0.140, -0.445],
      [-0.070, -0.458],
      [0.000, -0.420],
      [0.070, -0.390],
      [0.140, -0.405],
      [0.210, -0.455],
      [0.300, -0.460],
    ],
    0.022,
    marbling_grayMat,
    frontZ + 0.0012
  );

  const right_edge_wave = addRibbon(
    marbled_ribbons,
    "right_edge_wave",
    [
      [0.342, 0.070],
      [0.290, 0.030],
      [0.250, -0.030],
      [0.240, -0.100],
      [0.270, -0.170],
      [0.320, -0.200],
      [0.342, -0.180],
    ],
    0.018,
    marbling_grayMat,
    frontZ + 0.0018
  );

  const left_middle_layer = addRibbon(
    marbled_ribbons,
    "left_middle_layer",
    [
      [-0.344, 0.235],
      [-0.300, 0.205],
      [-0.260, 0.160],
      [-0.235, 0.105],
      [-0.250, 0.050],
      [-0.300, 0.010],
      [-0.344, 0.000],
    ],
    0.015,
    marbling_highlightMat,
    frontZ + 0.0016
  );

  const lower_center_pool = addRibbon(
    marbled_ribbons,
    "lower_center_pool",
    [
      [0.020, -0.120],
      [0.075, -0.155],
      [0.125, -0.215],
      [0.145, -0.285],
      [0.120, -0.345],
      [0.065, -0.365],
      [0.025, -0.335],
      [0.035, -0.285],
      [0.075, -0.250],
    ],
    0.014,
    marbling_blackMat,
    frontZ + 0.0021
  );

  const marblingSpotData = [
    [-0.205, 0.255, 1.5, 0.7, 0.2],
    [-0.075, 0.330, 0.8, 1.4, -0.4],
    [0.160, 0.285, 1.2, 0.6, 0.5],
    [0.275, 0.105, 0.7, 1.5, -0.2],
    [-0.185, 0.020, 1.6, 0.6, 0.1],
    [-0.055, -0.105, 0.8, 1.2, 0.7],
    [0.175, -0.090, 1.3, 0.6, -0.5],
    [0.285, -0.185, 0.7, 1.4, 0.3],
    [-0.245, -0.260, 1.5, 0.7, -0.3],
    [-0.105, -0.365, 0.8, 1.3, 0.4],
    [0.075, -0.405, 1.4, 0.6, -0.6],
    [0.235, -0.335, 0.7, 1.5, 0.2],
  ];
  const marbling_spotsGeom = new THREE.CircleGeometry(0.012, 16);
  const marbling_spots = new THREE.InstancedMesh(
    marbling_spotsGeom,
    marbling_blackMat,
    marblingSpotData.length
  );
  marbling_spots.name = "marbling_spots";

  const spotDummy = new THREE.Object3D();
  for (let i = 0; i < marblingSpotData.length; i++) {
    const spot = marblingSpotData[i];
    spotDummy.position.set(spot[0], spot[1], frontZ + 0.0025);
    spotDummy.rotation.set(0, 0, spot[4]);
    spotDummy.scale.set(spot[2], spot[3], 1);
    spotDummy.updateMatrix();
    marbling_spots.setMatrixAt(i, spotDummy.matrix);
  }
  marbling_spots.instanceMatrix.needsUpdate = true;
  front_cover.add(marbling_spots);

  const wear_marks = new THREE.Group();
  wear_marks.name = "wear_marks";
  root.add(wear_marks);

  const upper_spine_wearGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.371, 0.300, 0.047),
      new THREE.Vector3(-0.357, 0.307, 0.050),
      new THREE.Vector3(-0.342, 0.300, 0.048),
      new THREE.Vector3(-0.329, 0.292, 0.044),
    ], false, "centripetal", 0.5),
    12,
    0.0022,
    6,
    false
  );
  const upper_spine_wear = new THREE.Mesh(upper_spine_wearGeom, wearMat);
  upper_spine_wear.name = "upper_spine_wear";
  wear_marks.add(upper_spine_wear);

  const lower_spine_wearGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.372, -0.310, 0.047),
      new THREE.Vector3(-0.358, -0.302, 0.050),
      new THREE.Vector3(-0.343, -0.309, 0.048),
      new THREE.Vector3(-0.328, -0.315, 0.044),
    ], false, "centripetal", 0.5),
    12,
    0.0024,
    6,
    false
  );
  const lower_spine_wear = new THREE.Mesh(lower_spine_wearGeom, wearMat);
  lower_spine_wear.name = "lower_spine_wear";
  wear_marks.add(lower_spine_wear);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}