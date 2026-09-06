export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "leather_journal";
  const journal_group = new THREE.Group(); journal_group.name = "journal_group";
  journal_group.rotation.set(-0.035, -0.12, -0.045);
  root.add(journal_group);

  const coverW = 1.05;
  const coverH = 1.55;
  const pageW = 0.95;
  const pageH = 1.42;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x4b2a20,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leatherEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x2f1914,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leatherWearMat = new THREE.MeshStandardMaterial({
    color: 0x8a5638,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfc4,
    metalness: 0.0,
    roughness: 0.9,
  });
  const paperEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xb9a77f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const paperStainMat = new THREE.MeshStandardMaterial({
    color: 0xb99459,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0x8b5a38,
    metalness: 0.0,
    roughness: 0.95,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.0,
    roughness: 0.7,
  });
  const page_lineMat = new THREE.LineBasicMaterial({
    color: 0x789bb2,
    transparent: true,
    opacity: 0.62,
  });
  const leather_creaseMat = new THREE.LineBasicMaterial({
    color: 0x291612,
    transparent: true,
    opacity: 0.55,
  });
  const leather_wearMat = new THREE.LineBasicMaterial({
    color: 0x9b6744,
    transparent: true,
    opacity: 0.62,
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
    return shape;
  }

  function roundedExtrudeGeometry(w, h, r, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedRectPath(w, h, r, z) {
    const points = [];
    const corners = [
      [w / 2 - r, h / 2 - r, 0, Math.PI / 2],
      [-w / 2 + r, h / 2 - r, Math.PI / 2, Math.PI],
      [-w / 2 + r, -h / 2 + r, Math.PI, Math.PI * 1.5],
      [w / 2 - r, -h / 2 + r, Math.PI * 1.5, Math.PI * 2],
    ];
    for (const corner of corners) {
      for (let i = 0; i <= 5; i++) {
        const angle = corner[2] + (corner[3] - corner[2]) * (i / 5);
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          corner[1] + Math.sin(angle) * r,
          z
        ));
      }
    }
    return points;
  }

  const back_coverGeom = roundedExtrudeGeometry(
    coverW, coverH, 0.105, 0.06, 0.012, 0.012
  );
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.015, 0, -0.075);
  journal_group.add(back_cover);

  const cover_edge_pipingPoints = roundedRectPath(
    coverW - 0.025, coverH - 0.025, 0.095, 0
  );
  const cover_edge_pipingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(cover_edge_pipingPoints, true, "centripetal"),
    96,
    0.009,
    7,
    true
  );
  const cover_edge_piping = new THREE.Mesh(
    cover_edge_pipingGeom,
    leatherEdgeMat
  );
  cover_edge_piping.name = "cover_edge_piping";
  cover_edge_piping.position.set(0.015, 0, -0.029);
  journal_group.add(cover_edge_piping);

  const page_blockGeom = roundedExtrudeGeometry(
    pageW, pageH, 0.07, 0.075, 0.005, 0.004
  );
  const page_block = new THREE.Mesh(page_blockGeom, paperEdgeMat);
  page_block.name = "page_block";
  page_block.position.set(0.04, -0.005, -0.005);
  journal_group.add(page_block);

  const pageLayerCount = 9;
  const page_layersGeom = new THREE.BoxGeometry(0.012, 0.005, 0.072);
  const page_layers = new THREE.InstancedMesh(
    page_layersGeom,
    paperEdgeMat,
    pageLayerCount * 2
  );
  page_layers.name = "page_layers";
  const page_layer_dummy = new THREE.Object3D();
  let pageLayerIndex = 0;
  for (let i = 0; i < pageLayerCount; i++) {
    const z = -0.038 + i * (0.072 / (pageLayerCount - 1));

    page_layer_dummy.position.set(0.518, -0.61 + i * 0.0012, z);
    page_layer_dummy.rotation.set(0, 0, 0);
    page_layer_dummy.scale.set(1, 1, 1);
    page_layer_dummy.updateMatrix();
    page_layers.setMatrixAt(pageLayerIndex++, page_layer_dummy.matrix);

    page_layer_dummy.position.set(0.04, -0.713 - i * 0.0011, z);
    page_layer_dummy.updateMatrix();
    page_layers.setMatrixAt(pageLayerIndex++, page_layer_dummy.matrix);
  }
  page_layers.instanceMatrix.needsUpdate = true;
  journal_group.add(page_layers);

  const top_pageGeom = roundedExtrudeGeometry(
    pageW - 0.018, pageH - 0.018, 0.064, 0.006, 0.002, 0.0015
  );
  const top_page = new THREE.Mesh(top_pageGeom, paperMat);
  top_page.name = "top_page";
  top_page.position.set(0.04, -0.005, 0.041);
  journal_group.add(top_page);

  const page_stainsGeom = new THREE.CircleGeometry(1, 20);
  const page_stains = new THREE.InstancedMesh(
    page_stainsGeom,
    paperStainMat,
    6
  );
  page_stains.name = "page_stains";
  const stainData = [
    [0.455, 0.625, 0.038, 0.022],
    [0.472, -0.595, 0.045, 0.027],
    [-0.355, -0.645, 0.032, 0.018],
    [0.425, 0.355, 0.022, 0.013],
    [-0.315, 0.615, 0.025, 0.014],
    [0.405, -0.285, 0.018, 0.011],
  ];
  const stain_dummy = new THREE.Object3D();
  for (let i = 0; i < stainData.length; i++) {
    const stain = stainData[i];
    stain_dummy.position.set(stain[0], stain[1], 0.047);
    stain_dummy.rotation.set(0, 0, i * 0.37);
    stain_dummy.scale.set(stain[2], stain[3], 1);
    stain_dummy.updateMatrix();
    page_stains.setMatrixAt(i, stain_dummy.matrix);
  }
  page_stains.instanceMatrix.needsUpdate = true;
  journal_group.add(page_stains);

  const lineCount = 16;
  const page_lineGeom = new THREE.BoxGeometry(0.80, 0.003, 0.002);
  const page_lines = new THREE.InstancedMesh(
    page_lineGeom,
    paperEdgeMat,
    lineCount
  );
  page_lines.name = "page_lines";
  const page_line_dummy = new THREE.Object3D();
  for (let i = 0; i < lineCount; i++) {
    page_line_dummy.position.set(0.055, 0.585 - i * 0.081, 0.048);
    page_line_dummy.rotation.set(0, 0, 0);
    page_line_dummy.scale.set(1, 1, 1);
    page_line_dummy.updateMatrix();
    page_lines.setMatrixAt(i, page_line_dummy.matrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  journal_group.add(page_lines);

  const pageLinePositions = [];
  for (let i = 0; i < lineCount; i++) {
    const y = 0.585 - i * 0.081;
    pageLinePositions.push(-0.345, y, 0.0505, 0.455, y, 0.0505);
  }
  const page_rule_linesGeom = new THREE.BufferGeometry();
  page_rule_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(pageLinePositions, 3)
  );
  const page_rule_lines = new THREE.LineSegments(
    page_rule_linesGeom,
    page_lineMat
  );
  page_rule_lines.name = "page_rule_lines";
  journal_group.add(page_rule_lines);

  const glyphPatterns = {
    a: [[0,0],[0.08,0.62],[0.34,0.88],[0.62,0.58],[0.58,0.04],[0.25,0.02],[0.08,0.62],[0.58,0.04],[0.78,0.18]],
    b: [[0.05,0],[0.05,1.42],[0.08,0.62],[0.35,0.88],[0.65,0.62],[0.58,0.08],[0.25,0.02],[0.05,0.62],[0.68,0.08]],
    c: [[0.72,0.72],[0.52,0.9],[0.18,0.78],[0.04,0.42],[0.18,0.06],[0.68,0.08]],
    d: [[0.68,0],[0.68,1.45],[0.64,0.62],[0.36,0.88],[0.08,0.58],[0.12,0.1],[0.38,0.02],[0.68,0.62],[0.78,0.18]],
    e: [[0.05,0.05],[0.05,0.55],[0.18,0.85],[0.55,0.82],[0.68,0.58],[0.1,0.48],[0.65,0.48],[0.68,0.12],[0.42,0.02]],
    f: [[0.22,-0.25],[0.22,1.35],[0.22,1.05],[0.52,1.18],[0.68,1.02],[-0.02,0.72],[0.58,0.72],[0.5,0.12],[0.38,-0.08]],
    g: [[0.62,0.65],[0.45,0.88],[0.12,0.72],[0.05,0.28],[0.25,0.04],[0.62,0.18],[0.65,-0.35],[0.45,-0.55],[0.12,-0.42]],
    h: [[0.05,0],[0.05,1.42],[0.08,0.58],[0.32,0.85],[0.6,0.62],[0.6,0],[0.75,0.12]],
    i: [[0.18,0],[0.22,0.82],[0.2,1.18],[0.24,0.02],[0.42,0.12],[0.25,1.38]],
    j: [[0.35,0.82],[0.35,-0.35],[0.22,-0.52],[0.02,-0.38],[0.38,0.88],[0.38,1.3]],
    k: [[0.05,0],[0.05,1.42],[0.08,0.42],[0.65,0.9],[0.2,0.5],[0.7,0],[0.78,0.15]],
    l: [[0.12,1.42],[0.12,0.12],[0.2,0.02],[0.48,0.12]],
    m: [[0.02,0],[0.02,0.85],[0.25,0.82],[0.35,0.55],[0.48,0.82],[0.68,0.58],[0.75,0],[0.88,0.12]],
    n: [[0.02,0],[0.02,0.85],[0.28,0.82],[0.58,0.6],[0.58,0],[0.75,0.12]],
    o: [[0.12,0.45],[0.2,0.82],[0.5,0.88],[0.68,0.58],[0.58,0.12],[0.28,0.02],[0.1,0.28],[0.12,0.45],[0.75,0.12]],
    p: [[0.05,-0.48],[0.05,0.85],[0.08,0.6],[0.35,0.85],[0.65,0.62],[0.58,0.18],[0.3,0.08],[0.05,0.6],[0.72,0.12]],
    q: [[0.62,-0.48],[0.62,0.85],[0.6,0.6],[0.32,0.85],[0.08,0.58],[0.12,0.15],[0.38,0.05],[0.62,0.6],[0.75,0.12]],
    r: [[0.05,0],[0.05,0.85],[0.08,0.58],[0.3,0.82],[0.58,0.72],[0.7,0.82]],
    s: [[0.68,0.75],[0.5,0.9],[0.18,0.78],[0.22,0.5],[0.6,0.38],[0.68,0.15],[0.45,0.02],[0.12,0.15]],
    t: [[0.25,-0.05],[0.25,1.25],[0.25,0.82],[0.65,0.82],[0.2,0.82],[0.45,0.08],[0.65,0.12]],
    u: [[0.05,0.85],[0.05,0.2],[0.18,0.03],[0.45,0.08],[0.65,0.82],[0.65,0],[0.78,0.12]],
    v: [[0.02,0.85],[0.25,0.02],[0.5,0.82],[0.5,0.02],[0.7,0.12]],
    w: [[0.02,0.85],[0.18,0.02],[0.35,0.65],[0.48,0.02],[0.68,0.82],[0.7,0.02],[0.88,0.12]],
    x: [[0.05,0.85],[0.65,0],[0.65,0.85],[0.05,0],[0.78,0.12]],
    y: [[0.02,0.85],[0.28,0.12],[0.62,0.85],[0.58,0.05],[0.45,-0.42],[0.2,-0.52]],
    z: [[0.05,0.82],[0.65,0.82],[0.05,0.02],[0.68,0.02],[0.75,0.15]],
  };

  const inkPositions = [];
  const inkIndices = [];
  const inkZ = 0.053;

  function addInkSegment(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy) || 1;
    const halfWidth = 0.0022;
    const nx = -dy / length * halfWidth;
    const ny = dx / length * halfWidth;
    const base = inkPositions.length / 3;

    inkPositions.push(
      x1 + nx, y1 + ny, inkZ,
      x1 - nx, y1 - ny, inkZ,
      x2 - nx, y2 - ny, inkZ,
      x2 + nx, y2 + ny, inkZ
    );
    inkIndices.push(
      base, base + 1, base + 2,
      base, base + 2, base + 3
    );
  }

  function addInkPolyline(points) {
    for (let i = 0; i < points.length - 1; i++) {
      addInkSegment(
        points[i][0], points[i][1],
        points[i + 1][0], points[i + 1][1]
      );
    }
  }

  function addHandGlyph(character, x, baseline, scale, index, row) {
    const pattern = glyphPatterns[character];
    if (!pattern) return;
    const points = [];
    for (const segment of pattern) {
      points.push([
        x + segment[0] * scale + Math.sin((index + segment[1]) * 1.71) * 0.0015,
        baseline + segment[1] * scale,
      ]);
    }
    addInkPolyline(points);

    if ((index + row * 3) % 7 === 0) {
      addInkSegment(
        x + 0.42 * scale, baseline + 0.88 * scale,
        x + 0.46 * scale, baseline + 1.02 * scale
      );
    }
  }

  function addHandwritingLine(text, baseline, xStart, scale) {
    let cursor = xStart;
    for (let i = 0; i < text.length; i++) {
      const character = text[i];
      if (character === " ") {
        cursor += scale * 0.52;
        continue;
      }
      addHandGlyph(character, cursor, baseline, scale, i, i);
      cursor += scale * (0.78 + (i % 3) * 0.035);
      if (i < text.length - 1) {
        addInkSegment(
          cursor - scale * 0.12, baseline + scale * 0.08,
          cursor + scale * 0.08, baseline + scale * 0.06
        );
      }
    }
  }

  const writingRows = [
    [0.548, -0.205, 0.031, "18 nott new fid"],
    [0.467, -0.285, 0.030, "shnn bnl dnr lnn"],
    [0.386, -0.255, 0.031, "goun tine in shnd"],
    [0.305, -0.285, 0.030, "grnre bol oh nn"],
    [0.224, -0.275, 0.031, "nne ne k nt thren"],
    [0.143, -0.265, 0.032, "blnnce a le dnn"],
    [0.062, -0.245, 0.033, "nn nd trch nd tof"],
    [-0.019, -0.285, 0.030, "fin de ne nn hncs"],
    [-0.100, -0.275, 0.030, "nrit eth fe acte tle"],
    [-0.181, -0.255, 0.031, "nn de ofr thin b nd"],
    [-0.262, -0.145, 0.033, "trncd spe mltt"],
    [-0.424, -0.105, 0.032, "rnn nt brgf it"],
    [-0.505, -0.165, 0.031, "bnnncne a plnd"],
    [-0.586, -0.185, 0.030, "b ndy dl pf ndt"],
  ];

  for (let row = 0; row < writingRows.length; row++) {
    const data = writingRows[row];
    addHandwritingLine(data[3], data[0], data[1], data[2]);
  }

  const handwritingGeom = new THREE.BufferGeometry();
  handwritingGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(inkPositions, 3)
  );
  handwritingGeom.setIndex(inkIndices);
  handwritingGeom.computeVertexNormals();
  const handwriting = new THREE.Mesh(handwritingGeom, inkMat);
  handwriting.name = "handwriting";
  journal_group.add(handwriting);

  const ink_dotGeom = new THREE.CircleGeometry(0.0042, 10);
  const ink_dot = new THREE.Mesh(ink_dotGeom, inkMat);
  ink_dot.name = "ink_dot";
  ink_dot.position.set(-0.196, 0.625, 0.054);
  journal_group.add(ink_dot);

  const spineGeom = new THREE.CylinderGeometry(0.105, 0.105, 1.34, 28);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.position.set(-0.475, 0, 0.005);
  spine.scale.set(1, 1, 0.78);
  journal_group.add(spine);

  const spine_end_capsGeom = new THREE.SphereGeometry(0.105, 20, 12);
  const spine_end_caps = new THREE.InstancedMesh(
    spine_end_capsGeom,
    leatherMat,
    2
  );
  spine_end_caps.name = "spine_end_caps";
  const spine_cap_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    spine_cap_dummy.position.set(-0.475, i === 0 ? 0.67 : -0.67, 0.005);
    spine_cap_dummy.rotation.set(0, 0, 0);
    spine_cap_dummy.scale.set(1, 0.72, 0.78);
    spine_cap_dummy.updateMatrix();
    spine_end_caps.setMatrixAt(i, spine_cap_dummy.matrix);
  }
  spine_end_caps.instanceMatrix.needsUpdate = true;
  journal_group.add(spine_end_caps);

  const spine_bandGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 28);
  const spine_bands = new THREE.InstancedMesh(
    spine_bandGeom,
    leatherEdgeMat,
    2
  );
  spine_bands.name = "spine_bands";
  const spine_band_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    spine_band_dummy.position.set(-0.475, i === 0 ? 0.61 : -0.61, 0.005);
    spine_band_dummy.rotation.set(Math.PI / 2, 0, 0);
    spine_band_dummy.scale.set(1, 0.78, 1);
    spine_band_dummy.updateMatrix();
    spine_bands.setMatrixAt(i, spine_band_dummy.matrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  journal_group.add(spine_bands);

  const front_cover_group = new THREE.Group();
  front_cover_group.name = "front_cover_group";
  front_cover_group.position.set(-0.475, 0, 0.085);
  front_cover_group.rotation.y = -0.38;
  journal_group.add(front_cover_group);

  const front_coverGeom = roundedExtrudeGeometry(
    0.50, 1.50, 0.095, 0.055, 0.012, 0.011
  );
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0.25, 0, 0);
  front_cover_group.add(front_cover);

  const front_cover_edge_pipingPoints = roundedRectPath(
    0.475, 1.475, 0.086, 0.044
  );
  const front_cover_edge_pipingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      front_cover_edge_pipingPoints,
      true,
      "centripetal"
    ),
    88,
    0.007,
    7,
    true
  );
  const front_cover_edge_piping = new THREE.Mesh(
    front_cover_edge_pipingGeom,
    leatherEdgeMat
  );
  front_cover_edge_piping.name = "front_cover_edge_piping";
  front_cover_edge_piping.position.x = 0.25;
  front_cover_group.add(front_cover_edge_piping);

  const stitchCount = 38;
  const front_cover_stitchesGeom = new THREE.BoxGeometry(
    0.007, 0.022, 0.004
  );
  const front_cover_stitches = new THREE.InstancedMesh(
    front_cover_stitchesGeom,
    threadMat,
    stitchCount
  );
  front_cover_stitches.name = "front_cover_stitches";
  const stitch_dummy = new THREE.Object3D();
  let stitchIndex = 0;

  for (let i = 0; i < 28; i++) {
    stitch_dummy.position.set(0.474, -0.625 + i * (1.25 / 27), 0.049);
    stitch_dummy.rotation.set(0, 0, 0);
    stitch_dummy.scale.set(1, 1, 1);
    stitch_dummy.updateMatrix();
    front_cover_stitches.setMatrixAt(stitchIndex++, stitch_dummy.matrix);
  }
  for (let i = 0; i < 5; i++) {
    stitch_dummy.position.set(0.085 + i * 0.073, 0.718, 0.049);
    stitch_dummy.rotation.set(0, 0, Math.PI / 2);
    stitch_dummy.updateMatrix();
    front_cover_stitches.setMatrixAt(stitchIndex++, stitch_dummy.matrix);
  }
  for (let i = 0; i < 5; i++) {
    stitch_dummy.position.set(0.085 + i * 0.073, -0.718, 0.049);
    stitch_dummy.rotation.set(0, 0, Math.PI / 2);
    stitch_dummy.updateMatrix();
    front_cover_stitches.setMatrixAt(stitchIndex++, stitch_dummy.matrix);
  }
  front_cover_stitches.instanceMatrix.needsUpdate = true;
  front_cover_group.add(front_cover_stitches);

  const front_cover_creasesGeom = new THREE.BufferGeometry();
  front_cover_creasesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      0.08,0.58,0.050, 0.18,0.38,0.050,
      0.18,0.38,0.050, 0.14,0.16,0.050,
      0.14,0.16,0.050, 0.28,-0.08,0.050,
      0.28,-0.08,0.050, 0.21,-0.34,0.050,
      0.21,-0.34,0.050, 0.36,-0.57,0.050,
      0.36,-0.57,0.050, 0.43,-0.36,0.050,
      0.10,0.25,0.050, 0.34,0.18,0.050,
      0.34,0.18,0.050, 0.43,0.02,0.050,
      0.12,-0.18,0.050, 0.31,-0.28,0.050,
      0.31,-0.28,0.050, 0.42,-0.46,0.050,
    ], 3)
  );
  const front_cover_creases = new THREE.LineSegments(
    front_cover_creasesGeom,
    leather_creaseMat
  );
  front_cover_creases.name = "front_cover_creases";
  front_cover_group.add(front_cover_creases);

  const front_cover_wearGeom = new THREE.BufferGeometry();
  front_cover_wearGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      0.07,0.62,0.052, 0.13,0.51,0.052,
      0.13,0.51,0.052, 0.10,0.42,0.052,
      0.20,0.35,0.052, 0.27,0.22,0.052,
      0.27,0.22,0.052, 0.24,0.10,0.052,
      0.17,-0.16,0.052, 0.29,-0.25,0.052,
      0.29,-0.25,0.052, 0.34,-0.39,0.052,
      0.34,-0.39,0.052, 0.42,-0.48,0.052,
      0.09,-0.52,0.052, 0.18,-0.61,0.052,
      0.34,0.56,0.052, 0.42,0.45,0.052,
      0.42,0.45,0.052, 0.45,0.32,0.052,
    ], 3)
  );
  const front_cover_wear = new THREE.LineSegments(
    front_cover_wearGeom,
    leather_wearMat
  );
  front_cover_wear.name = "front_cover_wear";
  front_cover_group.add(front_cover_wear);

  const leather_scuffsGeom = new THREE.CircleGeometry(1, 16);
  const leather_scuffs = new THREE.InstancedMesh(
    leather_scuffsGeom,
    leatherWearMat,
    4
  );
  leather_scuffs.name = "leather_scuffs";
  const scuffData = [
    [0.14, 0.42, 0.025, 0.010, 0.3],
    [0.31, 0.18, 0.032, 0.012, -0.5],
    [0.20, -0.31, 0.028, 0.010, 0.7],
    [0.39, -0.53, 0.022, 0.008, -0.2],
  ];
  const scuff_dummy = new THREE.Object3D();
  for (let i = 0; i < scuffData.length; i++) {
    const scuff = scuffData[i];
    scuff_dummy.position.set(scuff[0], scuff[1], 0.051);
    scuff_dummy.rotation.set(0, 0, scuff[4]);
    scuff_dummy.scale.set(scuff[2], scuff[3], 1);
    scuff_dummy.updateMatrix();
    leather_scuffs.setMatrixAt(i, scuff_dummy.matrix);
  }
  leather_scuffs.instanceMatrix.needsUpdate = true;
  front_cover_group.add(leather_scuffs);

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