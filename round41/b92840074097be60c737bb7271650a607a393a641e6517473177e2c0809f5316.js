export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "leather_bound_notebook";

  const book = new THREE.Group();
  book.name = "book";
  root.add(book);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x3b2119,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leatherEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x6b3d27,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x8a5434,
    metalness: 0.0,
    roughness: 0.7,
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfc5,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xcfc4a7,
    metalness: 0.0,
    roughness: 0.9,
  });
  const topPageMat = new THREE.MeshStandardMaterial({
    color: 0xf2e9cf,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageShadowMat = new THREE.MeshStandardMaterial({
    color: 0xb9aa88,
    metalness: 0.0,
    roughness: 0.9,
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0x24130f,
    metalness: 0.0,
    roughness: 0.95,
  });
  const paperLineMat = new THREE.MeshStandardMaterial({
    color: 0x88b5c2,
    metalness: 0.0,
    roughness: 0.7,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x242728,
    metalness: 0.0,
    roughness: 0.7,
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0xb79b6c,
    metalness: 0.0,
    roughness: 0.9,
  });

  function roundedRectShape(width, height, radius) {
    const x = -width / 2;
    const y = -height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
  }

  function roundedRectPath(width, height, radius, centerY, z) {
    const points = [];
    const corners = [
      [width / 2 - radius, centerY + height / 2 - radius, 0],
      [-width / 2 + radius, centerY + height / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, centerY - height / 2 + radius, Math.PI],
      [width / 2 - radius, centerY - height / 2 + radius, Math.PI * 1.5],
    ];
    for (const corner of corners) {
      for (let i = 0; i < 5; i++) {
        const angle = corner[2] + (i / 4) * Math.PI / 2;
        points.push(
          new THREE.Vector3(
            corner[0] + Math.cos(angle) * radius,
            corner[1] + Math.sin(angle) * radius,
            z
          )
        );
      }
    }
    return points;
  }

  const back_coverGeom = roundedExtrudeGeometry(
    1.12,
    1.34,
    0.095,
    0.045,
    0.009
  );
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.035, 0, -0.145);
  book.add(back_cover);

  const back_cover_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      roundedRectPath(1.1, 1.32, 0.09, 0, -0.091),
      true,
      "centripetal"
    ),
    80,
    0.012,
    8,
    true
  );
  const back_cover_edge = new THREE.Mesh(
    back_cover_edgeGeom,
    leatherEdgeMat
  );
  back_cover_edge.name = "back_cover_edge";
  back_cover_edge.position.x = 0.035;
  book.add(back_cover_edge);

  const page_stackGeom = roundedExtrudeGeometry(
    0.96,
    1.2,
    0.065,
    0.12,
    0.004
  );
  const page_stack = new THREE.Mesh(page_stackGeom, pageMat);
  page_stack.name = "page_stack";
  page_stack.position.set(0.04, 0, -0.094);
  book.add(page_stack);

  const page_fore_edgeGeom = new THREE.BoxGeometry(0.018, 1.08, 0.112);
  const page_fore_edge = new THREE.Mesh(page_fore_edgeGeom, pageEdgeMat);
  page_fore_edge.name = "page_fore_edge";
  page_fore_edge.position.set(0.526, 0, -0.034);
  book.add(page_fore_edge);

  const page_bottom_edgeGeom = new THREE.BoxGeometry(0.84, 0.018, 0.112);
  const page_bottom_edge = new THREE.Mesh(
    page_bottom_edgeGeom,
    pageEdgeMat
  );
  page_bottom_edge.name = "page_bottom_edge";
  page_bottom_edge.position.set(0.04, -0.603, -0.034);
  book.add(page_bottom_edge);

  const page_layerGeom = new THREE.BoxGeometry(1, 1, 1);
  const page_layer_lines = new THREE.InstancedMesh(
    page_layerGeom,
    pageEdgeMat,
    12
  );
  page_layer_lines.name = "page_layer_lines";
  const pageLayerDummy = new THREE.Object3D();
  let pageLayerIndex = 0;

  for (let i = 0; i < 6; i++) {
    const z = -0.084 + i * 0.019;

    pageLayerDummy.position.set(0.537, 0, z);
    pageLayerDummy.rotation.set(0, 0, 0);
    pageLayerDummy.scale.set(0.009, 1.075, 0.0025);
    pageLayerDummy.updateMatrix();
    page_layer_lines.setMatrixAt(pageLayerIndex, pageLayerDummy.matrix);
    pageLayerIndex += 1;

    pageLayerDummy.position.set(0.04, -0.613, z);
    pageLayerDummy.rotation.set(0, 0, 0);
    pageLayerDummy.scale.set(0.84, 0.009, 0.0025);
    pageLayerDummy.updateMatrix();
    page_layer_lines.setMatrixAt(pageLayerIndex, pageLayerDummy.matrix);
    pageLayerIndex += 1;
  }
  page_layer_lines.instanceMatrix.needsUpdate = true;
  book.add(page_layer_lines);

  const top_pageGeom = roundedExtrudeGeometry(
    0.96,
    1.19,
    0.065,
    0.008,
    0.002
  );
  const top_page = new THREE.Mesh(top_pageGeom, topPageMat);
  top_page.name = "top_page";
  top_page.position.set(0.04, 0, 0.027);
  book.add(top_page);

  const top_page_shadowGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      roundedRectPath(0.945, 1.175, 0.06, 0, 0.039),
      true,
      "centripetal"
    ),
    72,
    0.004,
    6,
    true
  );
  const top_page_shadow = new THREE.Mesh(
    top_page_shadowGeom,
    pageShadowMat
  );
  top_page_shadow.name = "top_page_shadow";
  top_page_shadow.position.x = 0.04;
  book.add(top_page_shadow);

  const paper_stainGeom = new THREE.CircleGeometry(0.045, 18);
  const paper_stains = new THREE.InstancedMesh(
    paper_stainGeom,
    stainMat,
    6
  );
  paper_stains.name = "paper_stains";
  const stainDummy = new THREE.Object3D();
  const stainData = [
    [-0.35, 0.535, 1.0, 0.55],
    [0.43, 0.52, 0.7, 0.4],
    [-0.34, -0.525, 0.75, 0.45],
    [0.44, -0.51, 1.1, 0.6],
    [0.35, 0.12, 0.45, 0.25],
    [-0.2, -0.18, 0.5, 0.28],
  ];

  for (let i = 0; i < stainData.length; i++) {
    const stain = stainData[i];
    stainDummy.position.set(stain[0], stain[1], 0.0405);
    stainDummy.rotation.set(0, 0, i * 0.37);
    stainDummy.scale.set(stain[2], stain[3], 1);
    stainDummy.updateMatrix();
    paper_stains.setMatrixAt(i, stainDummy.matrix);
  }
  paper_stains.instanceMatrix.needsUpdate = true;
  book.add(paper_stains);

  const ruled_lineGeom = new THREE.BoxGeometry(0.82, 0.003, 0.002);
  const ruled_lines = new THREE.InstancedMesh(
    ruled_lineGeom,
    paperLineMat,
    15
  );
  ruled_lines.name = "ruled_lines";
  const ruledDummy = new THREE.Object3D();

  for (let i = 0; i < 15; i++) {
    ruledDummy.position.set(0.055, 0.45 - i * 0.068, 0.042);
    ruledDummy.rotation.set(0, 0, 0);
    ruledDummy.scale.set(1, 1, 1);
    ruledDummy.updateMatrix();
    ruled_lines.setMatrixAt(i, ruledDummy.matrix);
  }
  ruled_lines.instanceMatrix.needsUpdate = true;
  book.add(ruled_lines);

  const glyphs = {
    a: [
      [0, 0.25, 0.22, 0.62],
      [0.22, 0.62, 0.62, 0.58],
      [0.62, 0.58, 0.72, 0.25],
      [0.72, 0.25, 0.5, 0.02],
      [0.5, 0.02, 0.12, 0.08],
      [0.12, 0.08, 0, 0.25],
      [0.72, 0.58, 0.76, 0],
    ],
    b: [
      [0.08, 0, 0.08, 1],
      [0.08, 0.62, 0.35, 0.72],
      [0.35, 0.72, 0.65, 0.58],
      [0.65, 0.58, 0.65, 0.25],
      [0.65, 0.25, 0.42, 0.04],
      [0.42, 0.04, 0.08, 0.16],
    ],
    c: [
      [0.7, 0.62, 0.45, 0.72],
      [0.45, 0.72, 0.12, 0.55],
      [0.12, 0.55, 0.05, 0.25],
      [0.05, 0.25, 0.25, 0.04],
      [0.25, 0.04, 0.68, 0.16],
    ],
    d: [
      [0.68, 0, 0.68, 1],
      [0.68, 0.62, 0.4, 0.72],
      [0.4, 0.72, 0.1, 0.55],
      [0.1, 0.55, 0.08, 0.24],
      [0.08, 0.24, 0.35, 0.04],
      [0.35, 0.04, 0.68, 0.18],
    ],
    e: [
      [0.08, 0.35, 0.68, 0.38],
      [0.68, 0.38, 0.58, 0.65],
      [0.58, 0.65, 0.25, 0.7],
      [0.25, 0.7, 0.06, 0.45],
      [0.06, 0.45, 0.12, 0.15],
      [0.12, 0.15, 0.45, 0.02],
      [0.45, 0.02, 0.72, 0.18],
    ],
    f: [
      [0.2, -0.2, 0.35, 1],
      [0.02, 0.55, 0.65, 0.58],
      [0.35, 0.1, 0.58, 0.02],
    ],
    g: [
      [0, 0.25, 0.22, 0.62],
      [0.22, 0.62, 0.62, 0.58],
      [0.62, 0.58, 0.7, 0.25],
      [0.7, 0.25, 0.48, 0.03],
      [0.48, 0.03, 0.12, 0.1],
      [0.7, 0.25, 0.65, -0.25],
      [0.65, -0.25, 0.35, -0.35],
    ],
    h: [
      [0.05, 0, 0.05, 1],
      [0.05, 0.45, 0.28, 0.68],
      [0.28, 0.68, 0.62, 0.58],
      [0.62, 0.58, 0.68, 0],
    ],
    i: [
      [0.22, 0, 0.32, 0.72],
      [0.3, 0.92, 0.32, 0.98],
    ],
    j: [
      [0.55, 0.72, 0.45, -0.22],
      [0.45, -0.22, 0.22, -0.32],
      [0.22, -0.32, 0.05, -0.18],
      [0.6, 0.92, 0.62, 0.98],
    ],
    k: [
      [0.05, 0, 0.05, 1],
      [0.05, 0.3, 0.68, 0.72],
      [0.25, 0.45, 0.72, 0],
    ],
    l: [
      [0.18, 1, 0.28, 0.12],
      [0.28, 0.12, 0.5, 0.02],
    ],
    m: [
      [0.02, 0, 0.02, 0.7],
      [0.02, 0.5, 0.25, 0.7],
      [0.25, 0.7, 0.42, 0.48],
      [0.42, 0.48, 0.55, 0.7],
      [0.55, 0.7, 0.78, 0.48],
      [0.78, 0.48, 0.82, 0],
    ],
    n: [
      [0.04, 0, 0.04, 0.7],
      [0.04, 0.5, 0.3, 0.7],
      [0.3, 0.7, 0.65, 0.55],
      [0.65, 0.55, 0.68, 0],
    ],
    o: [
      [0.1, 0.35, 0.05, 0.22],
      [0.05, 0.22, 0.22, 0.03],
      [0.22, 0.03, 0.58, 0.05],
      [0.58, 0.05, 0.72, 0.28],
      [0.72, 0.28, 0.62, 0.62],
      [0.62, 0.62, 0.28, 0.68],
      [0.28, 0.68, 0.1, 0.35],
    ],
    p: [
      [0.06, -0.32, 0.06, 0.7],
      [0.06, 0.55, 0.3, 0.7],
      [0.3, 0.7, 0.65, 0.58],
      [0.65, 0.58, 0.65, 0.25],
      [0.65, 0.25, 0.35, 0.1],
      [0.35, 0.1, 0.06, 0.22],
    ],
    q: [
      [0.05, 0.25, 0.22, 0.62],
      [0.22, 0.62, 0.62, 0.58],
      [0.62, 0.58, 0.7, 0.25],
      [0.7, 0.25, 0.45, 0.03],
      [0.45, 0.03, 0.1, 0.12],
      [0.55, 0.15, 0.78, -0.32],
    ],
    r: [
      [0.05, 0, 0.05, 0.7],
      [0.05, 0.48, 0.28, 0.68],
      [0.28, 0.68, 0.62, 0.58],
    ],
    s: [
      [0.68, 0.62, 0.45, 0.72],
      [0.45, 0.72, 0.12, 0.58],
      [0.12, 0.58, 0.25, 0.35],
      [0.25, 0.35, 0.62, 0.25],
      [0.62, 0.25, 0.68, 0.08],
      [0.68, 0.08, 0.25, 0.02],
      [0.25, 0.02, 0.05, 0.15],
    ],
    t: [
      [0.32, -0.05, 0.45, 1],
      [0.05, 0.58, 0.72, 0.6],
      [0.43, 0.05, 0.62, 0.02],
    ],
    u: [
      [0.05, 0.7, 0.08, 0.2],
      [0.08, 0.2, 0.25, 0.03],
      [0.25, 0.03, 0.58, 0.08],
      [0.58, 0.08, 0.68, 0.7],
      [0.68, 0.7, 0.72, 0],
    ],
    v: [
      [0.02, 0.7, 0.25, 0],
      [0.25, 0, 0.72, 0.7],
    ],
    w: [
      [0.02, 0.7, 0.16, 0],
      [0.16, 0, 0.38, 0.45],
      [0.38, 0.45, 0.55, 0],
      [0.55, 0, 0.82, 0.7],
    ],
    x: [
      [0.02, 0.7, 0.72, 0],
      [0.05, 0, 0.72, 0.7],
    ],
    y: [
      [0.02, 0.7, 0.32, 0.15],
      [0.72, 0.7, 0.32, 0.15],
      [0.32, 0.15, 0.2, -0.32],
      [0.2, -0.32, 0.02, -0.25],
    ],
  };

  const inkStrokes = [];

  function addTextLine(text, baseline, scale, xStart) {
    let cursor = xStart;
    for (let i = 0; i < text.length; i++) {
      const character = text[i];

      if (character === " ") {
        cursor += scale * 0.55;
        continue;
      }

      const glyph = glyphs[character];
      if (!glyph) {
        cursor += scale * 0.75;
        continue;
      }

      for (const segment of glyph) {
        inkStrokes.push([
          cursor + segment[0] * scale,
          baseline + segment[1] * scale,
          cursor + segment[2] * scale,
          baseline + segment[3] * scale,
        ]);
      }
      cursor += scale * 0.84;
    }
  }

  const textLines = [
    "my dear friend",
    "thank you for your kind words",
    "your letter reached me today",
    "the days have been busy",
    "yet i thought of you often",
    "we shall meet again soon",
    "until then keep well",
    "with warm regards",
    "your faithful friend",
  ];

  for (let i = 0; i < textLines.length; i++) {
    addTextLine(
      textLines[i],
      0.392 - i * 0.092,
      0.047,
      -0.3 + (i % 3) * 0.008
    );
  }

  const ink_strokeGeom = new THREE.CylinderGeometry(
    0.0022,
    0.0022,
    1,
    5
  );
  const handwritten_notes = new THREE.InstancedMesh(
    ink_strokeGeom,
    inkMat,
    inkStrokes.length
  );
  handwritten_notes.name = "handwritten_notes";

  const inkDummy = new THREE.Object3D();
  const inkUp = new THREE.Vector3(0, 1, 0);
  const inkDirection = new THREE.Vector3();

  for (let i = 0; i < inkStrokes.length; i++) {
    const stroke = inkStrokes[i];
    const dx = stroke[2] - stroke[0];
    const dy = stroke[3] - stroke[1];
    const length = Math.sqrt(dx * dx + dy * dy);

    inkDirection.set(dx, dy, 0).normalize();
    inkDummy.position.set(
      (stroke[0] + stroke[2]) / 2,
      (stroke[1] + stroke[3]) / 2,
      0.047
    );
    inkDummy.quaternion.setFromUnitVectors(inkUp, inkDirection);
    inkDummy.scale.set(1, length, 1);
    inkDummy.updateMatrix();
    handwritten_notes.setMatrixAt(i, inkDummy.matrix);
  }
  handwritten_notes.instanceMatrix.needsUpdate = true;
  book.add(handwritten_notes);

  const leather_spineGeom = roundedExtrudeGeometry(
    0.36,
    1.3,
    0.13,
    0.17,
    0.012
  );
  const leather_spine = new THREE.Mesh(leather_spineGeom, leatherMat);
  leather_spine.name = "leather_spine";
  leather_spine.position.set(-0.39, 0, -0.075);
  book.add(leather_spine);

  const spine_hingeGeom = new THREE.CylinderGeometry(
    0.013,
    0.013,
    1.12,
    10
  );
  const spine_hinge = new THREE.Mesh(spine_hingeGeom, leatherEdgeMat);
  spine_hinge.name = "spine_hinge";
  spine_hinge.position.set(-0.205, 0, 0.092);
  book.add(spine_hinge);

  const spineEdgePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.132, -0.53, 0.108),
      new THREE.Vector3(-0.132, -0.2, 0.111),
      new THREE.Vector3(-0.136, 0.16, 0.11),
      new THREE.Vector3(-0.145, 0.49, 0.108),
    ],
    false,
    "centripetal"
  );
  const spine_edge_seamGeom = new THREE.TubeGeometry(
    spineEdgePath,
    32,
    0.007,
    7,
    false
  );
  const spine_edge_seam = new THREE.Mesh(
    spine_edge_seamGeom,
    leatherEdgeMat
  );
  spine_edge_seam.name = "spine_edge_seam";
  book.add(spine_edge_seam);

  const spine_stitchGeom = new THREE.BoxGeometry(0.006, 0.026, 0.004);
  const spine_edge_stitches = new THREE.InstancedMesh(
    spine_stitchGeom,
    threadMat,
    24
  );
  spine_edge_stitches.name = "spine_edge_stitches";
  const stitchDummy = new THREE.Object3D();

  for (let i = 0; i < 24; i++) {
    stitchDummy.position.set(
      -0.139 + Math.sin(i * 0.55) * 0.004,
      -0.5 + i * 0.0435,
      0.116
    );
    stitchDummy.rotation.set(
      0,
      0,
      Math.sin(i * 0.8) * 0.08
    );
    stitchDummy.scale.set(1, 1, 1);
    stitchDummy.updateMatrix();
    spine_edge_stitches.setMatrixAt(i, stitchDummy.matrix);
  }
  spine_edge_stitches.instanceMatrix.needsUpdate = true;
  book.add(spine_edge_stitches);

  const leather_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const leather_grain = new THREE.InstancedMesh(
    leather_grainGeom,
    leatherEdgeMat,
    28
  );
  leather_grain.name = "leather_grain";
  const grainDummy = new THREE.Object3D();

  for (let i = 0; i < 28; i++) {
    const x = -0.535 + (((i * 7) % 17) / 17) * 0.255;
    const y = -0.54 + (((i * 11) % 29) / 29) * 1.08;
    const length = 0.018 + (i % 5) * 0.007;

    grainDummy.position.set(x, y, 0.109);
    grainDummy.rotation.set(0, 0, -0.8 + (i % 7) * 0.24);
    grainDummy.scale.set(length, 0.0022, 0.0015);
    grainDummy.updateMatrix();
    leather_grain.setMatrixAt(i, grainDummy.matrix);
  }
  leather_grain.instanceMatrix.needsUpdate = true;
  book.add(leather_grain);

  const leather_scuffGeom = new THREE.CircleGeometry(0.05, 18);
  const leather_scuffs = new THREE.InstancedMesh(
    leather_scuffGeom,
    wornLeatherMat,
    5
  );
  leather_scuffs.name = "leather_scuffs";
  const scuffDummy = new THREE.Object3D();
  const scuffData = [
    [-0.455, 0.42, 1.0, 0.22, -0.3],
    [-0.405, 0.12, 0.65, 0.16, 0.5],
    [-0.49, -0.18, 0.75, 0.18, -0.6],
    [-0.37, -0.42, 1.1, 0.2, 0.2],
    [-0.51, -0.53, 0.6, 0.14, -0.2],
  ];

  for (let i = 0; i < scuffData.length; i++) {
    const scuff = scuffData[i];
    scuffDummy.position.set(scuff[0], scuff[1], 0.111);
    scuffDummy.rotation.set(0, 0, scuff[4]);
    scuffDummy.scale.set(scuff[2], scuff[3], 1);
    scuffDummy.updateMatrix();
    leather_scuffs.setMatrixAt(i, scuffDummy.matrix);
  }
  leather_scuffs.instanceMatrix.needsUpdate = true;
  book.add(leather_scuffs);

  const spineWearPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.31, -0.37, 0.113),
      new THREE.Vector3(-0.34, -0.45, 0.114),
      new THREE.Vector3(-0.39, -0.52, 0.114),
      new THREE.Vector3(-0.46, -0.55, 0.113),
    ],
    false,
    "centripetal"
  );
  const spine_wear_markGeom = new THREE.TubeGeometry(
    spineWearPath,
    18,
    0.004,
    6,
    false
  );
  const spine_wear_mark = new THREE.Mesh(
    spine_wear_markGeom,
    wornLeatherMat
  );
  spine_wear_mark.name = "spine_wear_mark";
  book.add(spine_wear_mark);

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