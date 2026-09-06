export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "oval_ruby_ring";

  const face_group = new THREE.Group();
  face_group.name = "face_group";
  root.add(face_group);

  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  face_group.add(decoration_group);

  const setting_group = new THREE.Group();
  setting_group.name = "setting_group";
  face_group.add(setting_group);

  const ring_shank_group = new THREE.Group();
  ring_shank_group.name = "ring_shank_group";
  root.add(ring_shank_group);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc8a55a,
    metalness: 0.6,
    roughness: 0.2
  });

  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8d692d,
    metalness: 0.5,
    roughness: 0.35
  });

  const enamelMat = new THREE.MeshStandardMaterial({
    color: 0xf3f1e9,
    metalness: 0.0,
    roughness: 0.4
  });

  const redGlazeMat = new THREE.MeshStandardMaterial({
    color: 0xb30b38,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const paleRedGlazeMat = new THREE.MeshStandardMaterial({
    color: 0xd84e68,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide
  });

  const rubyMat = new THREE.MeshStandardMaterial({
    color: 0x8f0038,
    metalness: 0.0,
    roughness: 0.22
  });

  const rubyDarkMat = new THREE.MeshStandardMaterial({
    color: 0x57001f,
    metalness: 0.0,
    roughness: 0.28
  });

  const rubyHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xffb3cd,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  function createOvalShape(rx, ry) {
    const shape = new THREE.Shape();
    shape.moveTo(0, ry);
    shape.bezierCurveTo(
      rx * 0.5523, ry,
      rx, ry * 0.5523,
      rx, 0
    );
    shape.bezierCurveTo(
      rx, -ry * 0.5523,
      rx * 0.5523, -ry,
      0, -ry
    );
    shape.bezierCurveTo(
      -rx * 0.5523, -ry,
      -rx, -ry * 0.5523,
      -rx, 0
    );
    shape.bezierCurveTo(
      -rx, ry * 0.5523,
      -rx * 0.5523, ry,
      0, ry
    );
    shape.closePath();
    return shape;
  }

  function createOvalTubeGeometry(rx, ry, z, radius, radialSegments) {
    const points = [];
    const pointCount = 48;
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * rx,
        Math.sin(angle) * ry,
        z
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 96, radius, radialSegments, true);
  }

  const gold_backplateShape = createOvalShape(0.70, 1.0);
  const gold_backplateGeom = new THREE.ExtrudeGeometry(gold_backplateShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 48
  });
  const gold_backplate = new THREE.Mesh(gold_backplateGeom, goldMat);
  gold_backplate.name = "gold_backplate";
  gold_backplate.position.z = -0.09;
  face_group.add(gold_backplate);

  const enamel_inlayShape = createOvalShape(0.625, 0.91);
  const enamel_inlayGeom = new THREE.ExtrudeGeometry(enamel_inlayShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 4,
    curveSegments: 48
  });
  const enamel_inlay = new THREE.Mesh(enamel_inlayGeom, enamelMat);
  enamel_inlay.name = "enamel_inlay";
  enamel_inlay.position.z = 0.02;
  face_group.add(enamel_inlay);

  const enamel_domeGeom = new THREE.SphereGeometry(1, 48, 24);
  const enamel_dome = new THREE.Mesh(enamel_domeGeom, enamelMat);
  enamel_dome.name = "enamel_dome";
  enamel_dome.scale.set(0.607, 0.885, 0.035);
  enamel_dome.position.z = 0.06;
  face_group.add(enamel_dome);

  const outer_gold_rimGeom = createOvalTubeGeometry(
    0.67, 0.96, 0.072, 0.035, 10
  );
  const outer_gold_rim = new THREE.Mesh(outer_gold_rimGeom, goldMat);
  outer_gold_rim.name = "outer_gold_rim";
  face_group.add(outer_gold_rim);

  const inner_gold_trimGeom = createOvalTubeGeometry(
    0.625, 0.91, 0.083, 0.009, 8
  );
  const inner_gold_trim = new THREE.Mesh(inner_gold_trimGeom, darkGoldMat);
  inner_gold_trim.name = "inner_gold_trim";
  face_group.add(inner_gold_trim);

  const rim_beadingGeom = new THREE.SphereGeometry(0.008, 8, 6);
  const rim_beading = new THREE.InstancedMesh(rim_beadingGeom, goldMat, 56);
  rim_beading.name = "rim_beading";
  const beadDummy = new THREE.Object3D();
  for (let i = 0; i < 56; i++) {
    const angle = i / 56 * Math.PI * 2;
    beadDummy.position.set(
      Math.cos(angle) * 0.67,
      Math.sin(angle) * 0.96,
      0.106
    );
    beadDummy.scale.set(1, 1, 0.7);
    beadDummy.rotation.set(0, 0, angle);
    beadDummy.updateMatrix();
    rim_beading.setMatrixAt(i, beadDummy.matrix);
  }
  rim_beading.instanceMatrix.needsUpdate = true;
  face_group.add(rim_beading);

  function enamelSurfaceZ(x, y) {
    const q = x * x / (0.607 * 0.607) +
      y * y / (0.885 * 0.885);
    return 0.06 + 0.035 * Math.sqrt(Math.max(0, 1 - q)) + 0.004;
  }

  const splatterShape = new THREE.Shape();
  splatterShape.moveTo(-0.055, -0.004);
  splatterShape.lineTo(-0.018, -0.012);
  splatterShape.lineTo(0.006, -0.008);
  splatterShape.lineTo(0.060, 0.004);
  splatterShape.lineTo(0.015, 0.011);
  splatterShape.lineTo(-0.020, 0.008);
  splatterShape.closePath();

  const red_splattersGeom = new THREE.ShapeGeometry(splatterShape);
  const red_splatters = new THREE.InstancedMesh(
    red_splattersGeom,
    redGlazeMat,
    16
  );
  red_splatters.name = "red_splatters";

  const splatterData = [
    [-0.06, 0.72, 0.60, 0.70, 0.85],
    [0.08, 0.56, 0.25, 0.90, 0.75],
    [0.13, 0.39, -0.20, 0.75, 0.65],
    [-0.28, 0.25, 0.80, 0.75, 0.65],
    [-0.39, 0.08, 1.10, 0.55, 0.50],
    [-0.25, 0.05, -0.40, 0.48, 0.45],
    [0.34, 0.10, -0.80, 0.65, 0.55],
    [0.45, -0.02, 0.10, 0.50, 0.45],
    [0.28, -0.18, -0.50, 0.95, 0.80],
    [0.42, -0.30, 0.30, 0.55, 0.50],
    [0.18, -0.48, -0.20, 0.70, 0.60],
    [0.05, -0.72, 0.10, 0.80, 0.90],
    [-0.12, -0.52, 0.50, 1.10, 0.80],
    [-0.28, -0.38, -0.70, 0.80, 0.65],
    [-0.40, -0.25, 0.20, 0.55, 0.45],
    [0.10, -0.25, 1.00, 0.50, 0.45]
  ];

  const splatterDummy = new THREE.Object3D();
  for (let i = 0; i < splatterData.length; i++) {
    const data = splatterData[i];
    splatterDummy.position.set(
      data[0],
      data[1],
      enamelSurfaceZ(data[0], data[1])
    );
    splatterDummy.rotation.set(0, 0, data[2]);
    splatterDummy.scale.set(data[3], data[4], 1);
    splatterDummy.updateMatrix();
    red_splatters.setMatrixAt(i, splatterDummy.matrix);
  }
  red_splatters.instanceMatrix.needsUpdate = true;
  decoration_group.add(red_splatters);

  const red_specklesGeom = new THREE.CircleGeometry(0.012, 10);
  const red_speckles = new THREE.InstancedMesh(
    red_specklesGeom,
    redGlazeMat,
    24
  );
  red_speckles.name = "red_speckles";

  const speckleDummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i * 2.3999632297;
    const radial = 0.22 + 0.68 * ((i % 7) / 6);
    const x = Math.cos(angle) * 0.50 * radial;
    const y = Math.sin(angle) * 0.76 * radial;
    const scale = 0.45 + (i % 5) * 0.18;
    speckleDummy.position.set(x, y, enamelSurfaceZ(x, y) + 0.001);
    speckleDummy.rotation.set(0, 0, angle * 0.3);
    speckleDummy.scale.set(scale, scale * 0.75, 1);
    speckleDummy.updateMatrix();
    red_speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  red_speckles.instanceMatrix.needsUpdate = true;
  decoration_group.add(red_speckles);

  const red_washesGeom = new THREE.CircleGeometry(0.055, 18);
  const red_washes = new THREE.InstancedMesh(
    red_washesGeom,
    paleRedGlazeMat,
    7
  );
  red_washes.name = "red_washes";

  const washData = [
    [-0.25, -0.38, 1.10, 0.55, -0.60],
    [-0.10, -0.50, 0.75, 0.40, 0.30],
    [0.28, -0.18, 0.85, 0.45, -0.40],
    [0.35, 0.10, 0.55, 0.30, 0.20],
    [-0.30, 0.20, 0.50, 0.28, 0.80],
    [0.12, 0.48, 0.45, 0.22, -0.30],
    [-0.05, -0.20, 0.42, 0.25, 0.50]
  ];

  const washDummy = new THREE.Object3D();
  for (let i = 0; i < washData.length; i++) {
    const data = washData[i];
    washDummy.position.set(
      data[0],
      data[1],
      enamelSurfaceZ(data[0], data[1]) + 0.0015
    );
    washDummy.rotation.set(0, 0, data[4]);
    washDummy.scale.set(data[2], data[3], 1);
    washDummy.updateMatrix();
    red_washes.setMatrixAt(i, washDummy.matrix);
  }
  red_washes.instanceMatrix.needsUpdate = true;
  decoration_group.add(red_washes);

  const red_streaks = new THREE.Group();
  red_streaks.name = "red_streaks";
  decoration_group.add(red_streaks);

  function addSurfaceStreak(index, coordinates, radius) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      const x = coordinates[i][0];
      const y = coordinates[i][1];
      points.push(new THREE.Vector3(x, y, enamelSurfaceZ(x, y) + 0.001));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const streakGeom = new THREE.TubeGeometry(curve, 14, radius, 6, false);
    const streak = new THREE.Mesh(streakGeom, redGlazeMat);
    streak.name = "red_streak_" + index;
    red_streaks.add(streak);
  }

  addSurfaceStreak(1, [
    [-0.04, 0.68],
    [-0.01, 0.61],
    [0.02, 0.54],
    [0.04, 0.48]
  ], 0.005);

  addSurfaceStreak(2, [
    [0.07, 0.50],
    [0.10, 0.43],
    [0.13, 0.35]
  ], 0.0045);

  addSurfaceStreak(3, [
    [-0.36, 0.13],
    [-0.31, 0.17],
    [-0.25, 0.19]
  ], 0.004);

  addSurfaceStreak(4, [
    [0.30, 0.04],
    [0.36, 0.08],
    [0.43, 0.10]
  ], 0.0045);

  addSurfaceStreak(5, [
    [0.20, -0.15],
    [0.26, -0.19],
    [0.32, -0.23]
  ], 0.005);

  addSurfaceStreak(6, [
    [-0.34, -0.30],
    [-0.27, -0.35],
    [-0.19, -0.40],
    [-0.12, -0.45]
  ], 0.0055);

  addSurfaceStreak(7, [
    [-0.22, -0.42],
    [-0.16, -0.48],
    [-0.10, -0.54]
  ], 0.004);

  addSurfaceStreak(8, [
    [0.31, -0.35],
    [0.37, -0.38],
    [0.43, -0.40]
  ], 0.004);

  const central_mounting_collarGeom = new THREE.CylinderGeometry(
    0.16, 0.16, 0.07, 32
  );
  const central_mounting_collar = new THREE.Mesh(
    central_mounting_collarGeom,
    darkGoldMat
  );
  central_mounting_collar.name = "central_mounting_collar";
  central_mounting_collar.rotation.x = Math.PI / 2;
  central_mounting_collar.position.z = 0.125;
  setting_group.add(central_mounting_collar);

  const central_gold_bezelGeom = new THREE.TorusGeometry(
    0.126, 0.027, 12, 40
  );
  const central_gold_bezel = new THREE.Mesh(
    central_gold_bezelGeom,
    goldMat
  );
  central_gold_bezel.name = "central_gold_bezel";
  central_gold_bezel.position.z = 0.166;
  setting_group.add(central_gold_bezel);

  const central_rubyGeom = new THREE.SphereGeometry(1, 12, 6);
  const central_ruby = new THREE.Mesh(central_rubyGeom, rubyMat);
  central_ruby.name = "central_ruby";
  central_ruby.scale.set(0.105, 0.105, 0.055);
  central_ruby.position.z = 0.17;
  setting_group.add(central_ruby);

  const ruby_facetsGeom = new THREE.CircleGeometry(0.025, 3);
  const ruby_facets = new THREE.InstancedMesh(
    ruby_facetsGeom,
    rubyDarkMat,
    7
  );
  ruby_facets.name = "ruby_facets";

  const facetDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    const angle = i / 7 * Math.PI * 2;
    const radius = i === 0 ? 0 : 0.043;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const dome = Math.sqrt(Math.max(
      0,
      1 - (x * x + y * y) / (0.105 * 0.105)
    ));
    facetDummy.position.set(x, y, 0.17 + 0.055 * dome + 0.001);
    facetDummy.rotation.set(0, 0, angle + Math.PI / 6);
    facetDummy.scale.set(
      i === 0 ? 1.1 : 0.9,
      i === 0 ? 0.8 : 0.75,
      1
    );
    facetDummy.updateMatrix();
    ruby_facets.setMatrixAt(i, facetDummy.matrix);
  }
  ruby_facets.instanceMatrix.needsUpdate = true;
  setting_group.add(ruby_facets);

  const ruby_highlightGeom = new THREE.CircleGeometry(0.016, 14);
  const ruby_highlight = new THREE.Mesh(
    ruby_highlightGeom,
    rubyHighlightMat
  );
  ruby_highlight.name = "ruby_highlight";
  ruby_highlight.scale.set(0.72, 1.0, 1);
  ruby_highlight.position.set(0.032, 0.035, 0.228);
  setting_group.add(ruby_highlight);

  const ring_shank_points = [
    new THREE.Vector3(0.56, -0.08, -0.09),
    new THREE.Vector3(0.72, -0.09, -0.16),
    new THREE.Vector3(0.84, -0.12, -0.31),
    new THREE.Vector3(0.79, -0.18, -0.52),
    new THREE.Vector3(0.48, -0.24, -0.70),
    new THREE.Vector3(0.00, -0.27, -0.76),
    new THREE.Vector3(-0.48, -0.24, -0.70),
    new THREE.Vector3(-0.79, -0.18, -0.52),
    new THREE.Vector3(-0.84, -0.12, -0.31),
    new THREE.Vector3(-0.72, -0.09, -0.16),
    new THREE.Vector3(-0.56, -0.08, -0.09)
  ];
  const ring_shank_curve = new THREE.CatmullRomCurve3(
    ring_shank_points,
    false,
    "centripetal"
  );
  const ring_shankGeom = new THREE.TubeGeometry(
    ring_shank_curve,
    72,
    0.043,
    10,
    false
  );
  const ring_shank = new THREE.Mesh(ring_shankGeom, goldMat);
  ring_shank.name = "ring_shank";
  ring_shank_group.add(ring_shank);

  const left_shoulderGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.55, -0.08, -0.075),
      new THREE.Vector3(-0.70, -0.09, -0.15)
    ),
    4,
    0.052,
    10,
    false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, goldMat);
  left_shoulder.name = "left_shoulder";
  ring_shank_group.add(left_shoulder);

  const right_shoulderGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.55, -0.08, -0.075),
      new THREE.Vector3(0.70, -0.09, -0.15)
    ),
    4,
    0.052,
    10,
    false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, goldMat);
  right_shoulder.name = "right_shoulder";
  ring_shank_group.add(right_shoulder);

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