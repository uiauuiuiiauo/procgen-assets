export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "patterned_hardcover_book";

  const bookW = 0.72;
  const bookH = 1.04;
  const bookD = 0.18;
  const coverT = 0.018;
  const bevelT = 0.003;
  const pageW = 0.675;
  const pageH = 0.995;
  const pageD = 0.145;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0x08aee8,
    metalness: 0.0,
    roughness: 0.3
  });
  const back_coverMat = front_coverMat;
  const spineMat = front_coverMat;
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e8,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0xd3cec1,
    metalness: 0.0,
    roughness: 0.9
  });
  const pattern_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x111522,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const pattern_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffdf00,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const pattern_pinkMat = new THREE.MeshStandardMaterial({
    color: 0xff2e91,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const pattern_limeMat = new THREE.MeshStandardMaterial({
    color: 0x83f34a,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const pattern_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff6a20,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const pattern_purpleMat = new THREE.MeshStandardMaterial({
    color: 0x7774ff,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const pattern_coralMat = new THREE.MeshStandardMaterial({
    color: 0xff4d55,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  function createRoundedCoverGeometry(width, height, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevelT,
      bevelSize: 0.004,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const front_coverGeom = createRoundedCoverGeometry(bookW, bookH, coverT, 0.018);
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.name = "front_cover";
  front_cover.position.z = bookD / 2 - coverT / 2;
  root.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.name = "back_cover";
  back_cover.position.z = -bookD / 2 + coverT / 2;
  root.add(back_cover);

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageD);
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.position.set(0.012, -0.004, 0);
  root.add(page_block);

  const spineGeom = new THREE.CylinderGeometry(0.055, 0.055, 1.01, 24);
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.name = "spine";
  spine.position.set(-0.344, 0, 0);
  spine.scale.set(0.36, 1, 1.55);
  root.add(spine);

  const top_page_edgeGeom = new THREE.BoxGeometry(pageW - 0.012, 0.004, pageD - 0.006);
  const top_page_edge = new THREE.Mesh(top_page_edgeGeom, page_blockMat);
  top_page_edge.name = "top_page_edge";
  top_page_edge.position.set(0.012, 0.494, 0);
  root.add(top_page_edge);

  const fore_page_edgeGeom = new THREE.BoxGeometry(0.004, pageH - 0.012, pageD - 0.006);
  const fore_page_edge = new THREE.Mesh(fore_page_edgeGeom, page_blockMat);
  fore_page_edge.name = "fore_page_edge";
  fore_page_edge.position.set(0.3515, -0.004, 0);
  root.add(fore_page_edge);

  const top_page_linesGeom = new THREE.BoxGeometry(pageW - 0.025, 0.0015, 0.0025);
  const top_page_lines = new THREE.InstancedMesh(top_page_linesGeom, page_lineMat, 9);
  top_page_lines.name = "top_page_lines";
  const topLineDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    topLineDummy.position.set(0.012, 0.4965, -0.057 + i * 0.0142);
    topLineDummy.updateMatrix();
    top_page_lines.setMatrixAt(i, topLineDummy.matrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  root.add(top_page_lines);

  const fore_page_linesGeom = new THREE.BoxGeometry(0.0015, pageH - 0.025, 0.0025);
  const fore_page_lines = new THREE.InstancedMesh(fore_page_linesGeom, page_lineMat, 9);
  fore_page_lines.name = "fore_page_lines";
  const foreLineDummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    foreLineDummy.position.set(0.354, -0.004, -0.057 + i * 0.0142);
    foreLineDummy.updateMatrix();
    fore_page_lines.setMatrixAt(i, foreLineDummy.matrix);
  }
  fore_page_lines.instanceMatrix.needsUpdate = true;
  root.add(fore_page_lines);

  function makePolygonShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function makeRibbonShape(points, width) {
    const half = width / 2;
    const left = [];
    const right = [];

    for (let i = 0; i < points.length; i++) {
      let tx;
      let ty;

      if (i === 0) {
        tx = points[1][0] - points[0][0];
        ty = points[1][1] - points[0][1];
      } else if (i === points.length - 1) {
        tx = points[i][0] - points[i - 1][0];
        ty = points[i][1] - points[i - 1][1];
      } else {
        tx = points[i + 1][0] - points[i - 1][0];
        ty = points[i + 1][1] - points[i - 1][1];
      }

      const length = Math.sqrt(tx * tx + ty * ty) || 1;
      const nx = -ty / length * half;
      const ny = tx / length * half;
      left.push([points[i][0] + nx, points[i][1] + ny]);
      right.push([points[i][0] - nx, points[i][1] - ny]);
    }

    const shape = new THREE.Shape();
    shape.moveTo(left[0][0], left[0][1]);
    for (let i = 1; i < left.length; i++) {
      shape.lineTo(left[i][0], left[i][1]);
    }
    for (let i = right.length - 1; i >= 0; i--) {
      shape.lineTo(right[i][0], right[i][1]);
    }
    shape.closePath();
    return shape;
  }

  const yellowSegments = [
    [[-0.31, 0.49], [-0.22, 0.34], [-0.28, 0.20]],
    [[-0.04, 0.49], [0.05, 0.35], [-0.01, 0.22], [0.10, 0.12]],
    [[0.20, 0.49], [0.12, 0.35], [0.23, 0.23]],
    [[-0.34, 0.15], [-0.25, 0.03], [-0.32, -0.12]],
    [[-0.17, 0.08], [-0.06, -0.04], [-0.13, -0.18], [-0.02, -0.29]],
    [[0.11, 0.13], [0.03, -0.01], [0.14, -0.13], [0.07, -0.27]],
    [[0.34, 0.05], [0.24, -0.07], [0.31, -0.20]],
    [[-0.31, -0.27], [-0.22, -0.39], [-0.29, -0.49]],
    [[-0.08, -0.34], [0.02, -0.47], [0.10, -0.36]],
    [[0.17, -0.29], [0.26, -0.40], [0.19, -0.49]],
    [[0.33, -0.25], [0.25, -0.36], [0.34, -0.46]]
  ];

  const pinkSegments = [
    [[-0.18, 0.49], [-0.10, 0.38], [-0.16, 0.25], [-0.08, 0.14]],
    [[0.08, 0.49], [0.16, 0.39], [0.11, 0.28]],
    [[-0.34, 0.29], [-0.27, 0.18], [-0.32, 0.07]],
    [[0.00, 0.18], [0.09, 0.07], [0.02, -0.04]],
    [[0.34, 0.23], [0.27, 0.11], [0.34, 0.00]],
    [[-0.20, -0.08], [-0.11, -0.19], [-0.18, -0.31]],
    [[0.12, -0.06], [0.21, -0.18], [0.15, -0.29]],
    [[-0.34, -0.40], [-0.25, -0.49]],
    [[0.05, -0.48], [0.14, -0.37], [0.22, -0.48]],
    [[0.30, -0.39], [0.34, -0.46]]
  ];

  const limeSegments = [
    [[-0.34, 0.42], [-0.29, 0.32], [-0.34, 0.22]],
    [[-0.29, 0.13], [-0.20, 0.02], [-0.25, -0.10], [-0.15, -0.21]],
    [[-0.07, 0.22], [0.02, 0.10], [-0.04, -0.02]],
    [[0.19, 0.22], [0.28, 0.09], [0.22, -0.03]],
    [[0.34, 0.15], [0.28, 0.04]],
    [[-0.30, -0.20], [-0.21, -0.31], [-0.27, -0.43]],
    [[-0.04, -0.22], [0.05, -0.34], [0.00, -0.47]],
    [[0.18, -0.40], [0.27, -0.49]],
    [[0.34, -0.32], [0.28, -0.42]]
  ];

  const orangeSegments = [
    [[-0.25, 0.49], [-0.19, 0.39]],
    [[0.30, 0.49], [0.23, 0.38], [0.31, 0.28]],
    [[-0.34, -0.04], [-0.28, -0.14]],
    [[0.27, 0.02], [0.34, -0.09]],
    [[-0.34, -0.31], [-0.27, -0.42], [-0.31, -0.49]],
    [[-0.18, -0.43], [-0.10, -0.49]],
    [[0.27, -0.29], [0.34, -0.20]],
    [[0.11, -0.48], [0.18, -0.40]]
  ];

  const purpleSegments = [
    [[0.29, 0.31], [0.22, 0.20], [0.29, 0.10]],
    [[-0.31, 0.04], [-0.24, -0.06], [-0.30, -0.17]],
    [[0.05, 0.05], [0.13, -0.05]],
    [[-0.27, -0.34], [-0.18, -0.45]],
    [[0.31, -0.16], [0.34, -0.23]],
    [[0.14, -0.43], [0.22, -0.49]]
  ];

  const coralSegments = [
    [[-0.12, 0.49], [-0.05, 0.41]],
    [[0.31, 0.18], [0.34, 0.10]],
    [[-0.34, 0.18], [-0.29, 0.10]],
    [[0.07, -0.02], [0.15, -0.11]],
    [[-0.31, -0.24], [-0.25, -0.34]],
    [[0.22, -0.20], [0.30, -0.29]],
    [[-0.12, -0.46], [-0.05, -0.39]]
  ];

  const patternOutlines = [];
  const patternBuckets = {
    yellow: [],
    pink: [],
    lime: [],
    orange: [],
    purple: [],
    coral: []
  };

  function registerPatternSegment(colorKey, points, width) {
    patternOutlines.push([points, width * 1.24]);
    patternBuckets[colorKey].push([points, width]);
  }

  function registerPatternSegments(colorKey, segments, width) {
    for (let i = 0; i < segments.length; i++) {
      registerPatternSegment(colorKey, segments[i], width);
    }
  }

  registerPatternSegments("yellow", yellowSegments, 0.043);
  registerPatternSegments("pink", pinkSegments, 0.041);
  registerPatternSegments("lime", limeSegments, 0.040);
  registerPatternSegments("orange", orangeSegments, 0.038);
  registerPatternSegments("purple", purpleSegments, 0.037);
  registerPatternSegments("coral", coralSegments, 0.036);

  patternOutlines.push([
    [[-0.31, 0.45], [-0.24, 0.34], [-0.17, 0.43]],
    0.010
  ]);
  patternOutlines.push([
    [[0.02, 0.46], [0.10, 0.35], [0.17, 0.45]],
    0.009
  ]);
  patternOutlines.push([
    [[-0.31, -0.17], [-0.24, -0.27], [-0.17, -0.18]],
    0.010
  ]);
  patternOutlines.push([
    [[0.18, -0.34], [0.25, -0.44], [0.31, -0.36]],
    0.009
  ]);

  function createPatternGeometry(items) {
    const shapes = [];
    for (let i = 0; i < items.length; i++) {
      shapes.push(makeRibbonShape(items[i][0], items[i][1]));
    }
    return new THREE.ShapeGeometry(shapes, 2);
  }

  function createFrontPattern(name, geometry, material, z) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.z = z;
    front_cover.add(mesh);
    return mesh;
  }

  const patternSurfaceZ = coverT / 2 + bevelT;

  const front_pattern_outlinesGeom = createPatternGeometry(patternOutlines);
  const front_pattern_outlines = createFrontPattern(
    "front_pattern_outlines",
    front_pattern_outlinesGeom,
    pattern_outlineMat,
    patternSurfaceZ + 0.0010
  );

  const front_pattern_yellowGeom = createPatternGeometry(patternBuckets.yellow);
  const front_pattern_yellow = createFrontPattern(
    "front_pattern_yellow",
    front_pattern_yellowGeom,
    pattern_yellowMat,
    patternSurfaceZ + 0.0020
  );

  const front_pattern_pinkGeom = createPatternGeometry(patternBuckets.pink);
  const front_pattern_pink = createFrontPattern(
    "front_pattern_pink",
    front_pattern_pinkGeom,
    pattern_pinkMat,
    patternSurfaceZ + 0.0021
  );

  const front_pattern_limeGeom = createPatternGeometry(patternBuckets.lime);
  const front_pattern_lime = createFrontPattern(
    "front_pattern_lime",
    front_pattern_limeGeom,
    pattern_limeMat,
    patternSurfaceZ + 0.0022
  );

  const front_pattern_orangeGeom = createPatternGeometry(patternBuckets.orange);
  const front_pattern_orange = createFrontPattern(
    "front_pattern_orange",
    front_pattern_orangeGeom,
    pattern_orangeMat,
    patternSurfaceZ + 0.0023
  );

  const front_pattern_purpleGeom = createPatternGeometry(patternBuckets.purple);
  const front_pattern_purple = createFrontPattern(
    "front_pattern_purple",
    front_pattern_purpleGeom,
    pattern_purpleMat,
    patternSurfaceZ + 0.0024
  );

  const front_pattern_coralGeom = createPatternGeometry(patternBuckets.coral);
  const front_pattern_coral = createFrontPattern(
    "front_pattern_coral",
    front_pattern_coralGeom,
    pattern_coralMat,
    patternSurfaceZ + 0.0025
  );

  const back_pattern_outlinesGeom = front_pattern_outlinesGeom;
  const back_pattern_outlines = new THREE.Mesh(back_pattern_outlinesGeom, pattern_outlineMat);
  back_pattern_outlines.name = "back_pattern_outlines";
  back_pattern_outlines.rotation.y = Math.PI;
  back_pattern_outlines.position.z = patternSurfaceZ + 0.0010;
  back_cover.add(back_pattern_outlines);

  const back_pattern_yellowGeom = front_pattern_yellowGeom;
  const back_pattern_yellow = new THREE.Mesh(back_pattern_yellowGeom, pattern_yellowMat);
  back_pattern_yellow.name = "back_pattern_yellow";
  back_pattern_yellow.rotation.y = Math.PI;
  back_pattern_yellow.position.z = patternSurfaceZ + 0.0020;
  back_cover.add(back_pattern_yellow);

  const back_pattern_pinkGeom = front_pattern_pinkGeom;
  const back_pattern_pink = new THREE.Mesh(back_pattern_pinkGeom, pattern_pinkMat);
  back_pattern_pink.name = "back_pattern_pink";
  back_pattern_pink.rotation.y = Math.PI;
  back_pattern_pink.position.z = patternSurfaceZ + 0.0021;
  back_cover.add(back_pattern_pink);

  const back_pattern_limeGeom = front_pattern_limeGeom;
  const back_pattern_lime = new THREE.Mesh(back_pattern_limeGeom, pattern_limeMat);
  back_pattern_lime.name = "back_pattern_lime";
  back_pattern_lime.rotation.y = Math.PI;
  back_pattern_lime.position.z = patternSurfaceZ + 0.0022;
  back_cover.add(back_pattern_lime);

  const back_pattern_orangeGeom = front_pattern_orangeGeom;
  const back_pattern_orange = new THREE.Mesh(back_pattern_orangeGeom, pattern_orangeMat);
  back_pattern_orange.name = "back_pattern_orange";
  back_pattern_orange.rotation.y = Math.PI;
  back_pattern_orange.position.z = patternSurfaceZ + 0.0023;
  back_cover.add(back_pattern_orange);

  const back_pattern_purpleGeom = front_pattern_purpleGeom;
  const back_pattern_purple = new THREE.Mesh(back_pattern_purpleGeom, pattern_purpleMat);
  back_pattern_purple.name = "back_pattern_purple";
  back_pattern_purple.rotation.y = Math.PI;
  back_pattern_purple.position.z = patternSurfaceZ + 0.0024;
  back_cover.add(back_pattern_purple);

  const back_pattern_coralGeom = front_pattern_coralGeom;
  const back_pattern_coral = new THREE.Mesh(back_pattern_coralGeom, pattern_coralMat);
  back_pattern_coral.name = "back_pattern_coral";
  back_pattern_coral.rotation.y = Math.PI;
  back_pattern_coral.position.z = patternSurfaceZ + 0.0025;
  back_cover.add(back_pattern_coral);

  const sideOutlines = [];
  const sideYellow = [];
  const sidePink = [];
  const sideLime = [];
  const sideOrange = [];
  const sidePurple = [];
  const sideCoral = [];

  function registerSideSegment(bucket, points, width) {
    sideOutlines.push([points, width * 1.24]);
    bucket.push([points, width]);
  }

  registerSideSegment(sideLime, [[-0.082, 0.48], [-0.025, 0.36], [0.030, 0.45], [0.082, 0.34]], 0.025);
  registerSideSegment(sideYellow, [[-0.082, 0.29], [-0.025, 0.18], [0.035, 0.25], [0.082, 0.13]], 0.027);
  registerSideSegment(sidePink, [[-0.082, 0.08], [-0.020, -0.03], [-0.070, -0.14], [-0.010, -0.25], [0.055, -0.17], [0.082, -0.25]], 0.026);
  registerSideSegment(sideOrange, [[-0.082, -0.31], [-0.025, -0.40], [0.035, -0.32], [0.082, -0.45]], 0.025);
  registerSideSegment(sidePurple, [[-0.055, 0.42], [-0.005, 0.32], [0.050, 0.39]], 0.019);
  registerSideSegment(sideLime, [[-0.050, -0.08], [0.005, -0.18], [0.065, -0.10]], 0.019);
  registerSideSegment(sideCoral, [[-0.060, -0.43], [-0.010, -0.35], [0.050, -0.43]], 0.018);

  const side_pattern_outlinesGeom = createPatternGeometry(sideOutlines);
  const side_pattern_outlines = new THREE.Mesh(side_pattern_outlinesGeom, pattern_outlineMat);
  side_pattern_outlines.name = "side_pattern_outlines";
  side_pattern_outlines.rotation.y = -Math.PI / 2;
  side_pattern_outlines.position.x = -0.365;
  root.add(side_pattern_outlines);

  const side_pattern_yellowGeom = createPatternGeometry(sideYellow);
  const side_pattern_yellow = new THREE.Mesh(side_pattern_yellowGeom, pattern_yellowMat);
  side_pattern_yellow.name = "side_pattern_yellow";
  side_pattern_yellow.rotation.y = -Math.PI / 2;
  side_pattern_yellow.position.x = -0.3660;
  root.add(side_pattern_yellow);

  const side_pattern_pinkGeom = createPatternGeometry(sidePink);
  const side_pattern_pink = new THREE.Mesh(side_pattern_pinkGeom, pattern_pinkMat);
  side_pattern_pink.name = "side_pattern_pink";
  side_pattern_pink.rotation.y = -Math.PI / 2;
  side_pattern_pink.position.x = -0.3661;
  root.add(side_pattern_pink);

  const side_pattern_limeGeom = createPatternGeometry(sideLime);
  const side_pattern_lime = new THREE.Mesh(side_pattern_limeGeom, pattern_limeMat);
  side_pattern_lime.name = "side_pattern_lime";
  side_pattern_lime.rotation.y = -Math.PI / 2;
  side_pattern_lime.position.x = -0.3662;
  root.add(side_pattern_lime);

  const side_pattern_orangeGeom = createPatternGeometry(sideOrange);
  const side_pattern_orange = new THREE.Mesh(side_pattern_orangeGeom, pattern_orangeMat);
  side_pattern_orange.name = "side_pattern_orange";
  side_pattern_orange.rotation.y = -Math.PI / 2;
  side_pattern_orange.position.x = -0.3663;
  root.add(side_pattern_orange);

  const side_pattern_purpleGeom = createPatternGeometry(sidePurple);
  const side_pattern_purple = new THREE.Mesh(side_pattern_purpleGeom, pattern_purpleMat);
  side_pattern_purple.name = "side_pattern_purple";
  side_pattern_purple.rotation.y = -Math.PI / 2;
  side_pattern_purple.position.x = -0.3664;
  root.add(side_pattern_purple);

  const side_pattern_coralGeom = createPatternGeometry(sideCoral);
  const side_pattern_coral = new THREE.Mesh(side_pattern_coralGeom, pattern_coralMat);
  side_pattern_coral.name = "side_pattern_coral";
  side_pattern_coral.rotation.y = -Math.PI / 2;
  side_pattern_coral.position.x = -0.3665;
  root.add(side_pattern_coral);

  const top_edge_outlinesGeom = new THREE.BoxGeometry(0.052, 0.0035, 0.178);
  const top_edge_outlines = new THREE.InstancedMesh(
    top_edge_outlinesGeom,
    pattern_outlineMat,
    7
  );
  top_edge_outlines.name = "top_edge_outlines";

  const top_edge_yellowGeom = new THREE.BoxGeometry(0.041, 0.0025, 0.176);
  const top_edge_yellow = new THREE.InstancedMesh(
    top_edge_yellowGeom,
    pattern_yellowMat,
    7
  );
  top_edge_yellow.name = "top_edge_yellow";

  const topPatchX = [-0.30, -0.20, -0.10, 0.00, 0.10, 0.20, 0.30];
  const topPatchDummy = new THREE.Object3D();
  for (let i = 0; i < topPatchX.length; i++) {
    topPatchDummy.position.set(topPatchX[i], bookH / 2 + 0.004, 0);
    topPatchDummy.updateMatrix();
    top_edge_outlines.setMatrixAt(i, topPatchDummy.matrix);
    top_edge_yellow.setMatrixAt(i, topPatchDummy.matrix);
  }
  top_edge_outlines.instanceMatrix.needsUpdate = true;
  top_edge_yellow.instanceMatrix.needsUpdate = true;
  root.add(top_edge_outlines);
  root.add(top_edge_yellow);

  const top_edge_accent_pinkGeom = new THREE.BoxGeometry(0.030, 0.0028, 0.177);
  const top_edge_accent_pink = new THREE.InstancedMesh(
    top_edge_accent_pinkGeom,
    pattern_pinkMat,
    2
  );
  top_edge_accent_pink.name = "top_edge_accent_pink";
  const topAccentDummy = new THREE.Object3D();
  const topAccentX = [-0.25, 0.15];
  for (let i = 0; i < topAccentX.length; i++) {
    topAccentDummy.position.set(topAccentX[i], bookH / 2 + 0.0054, 0);
    topAccentDummy.updateMatrix();
    top_edge_accent_pink.setMatrixAt(i, topAccentDummy.matrix);
  }
  top_edge_accent_pink.instanceMatrix.needsUpdate = true;
  root.add(top_edge_accent_pink);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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