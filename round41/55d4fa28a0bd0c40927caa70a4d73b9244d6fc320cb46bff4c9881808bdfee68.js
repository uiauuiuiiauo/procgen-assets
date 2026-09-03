export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_leather_book";

  const coverW = 0.68;
  const coverH = 1.06;
  const coverT = 0.026;
  const coverR = 0.045;
  const coverCenterX = 0.02;
  const pageW = 0.64;
  const pageH = 0.98;
  const pageD = 0.19;
  const pageCenterX = 0.02;
  const spineX = -0.335;
  const spineR = 0.095;
  const spineScaleX = 0.72;
  const spineScaleZ = 1.22;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x713b29,
    metalness: 0.0,
    roughness: 0.7
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x77402c,
    metalness: 0.0,
    roughness: 0.7
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x3d211d,
    metalness: 0.0,
    roughness: 0.7
  });
  const edgeLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x98603d,
    metalness: 0.0,
    roughness: 0.7
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0xb0784b,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xd2b987,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x9d7e55,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x211716,
    metalness: 0.0,
    roughness: 0.8
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

  function addBox(parent, name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const glyphs = {
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    G: ["01111", "10000", "10000", "10111", "10001", "10001", "01111"],
    H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    J: ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
    K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
    X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
    "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
    "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
    "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
    "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
    "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
    "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
    "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
    "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"]
  };

  function makePixelText(parent, name, text, centerX, centerY, z, cell, mat) {
    let count = 0;
    for (let i = 0; i < text.length; i++) {
      const pattern = glyphs[text[i]];
      if (!pattern) continue;
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col] === "1") count++;
        }
      }
    }

    const geom = new THREE.BoxGeometry(cell * 0.82, cell * 0.82, 0.003);
    const textMesh = new THREE.InstancedMesh(geom, mat, count);
    textMesh.name = name;
    const totalW = Math.max(0, text.length * 6 - 1) * cell;
    const startX = centerX - totalW / 2 + cell / 2;
    const matrix = new THREE.Matrix4();
    let index = 0;

    for (let i = 0; i < text.length; i++) {
      const pattern = glyphs[text[i]];
      if (!pattern) continue;
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col] !== "1") continue;
          matrix.makeTranslation(
            startX + (i * 6 + col) * cell,
            centerY + (3 - row) * cell,
            z
          );
          textMesh.setMatrixAt(index++, matrix);
        }
      }
    }
    textMesh.instanceMatrix.needsUpdate = true;
    parent.add(textMesh);
    return textMesh;
  }

  function addSurfaceTube(parent, name, coords, radius, mat, z) {
    const points = [];
    for (let i = 0; i < coords.length; i++) {
      points.push(new THREE.Vector3(coords[i][0], coords[i][1], z));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(
      curve,
      Math.max(12, coords.length * 4),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageD);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.position.set(pageCenterX, 0, 0);
  root.add(page_block);

  const page_fore_edgeGeom = new THREE.BoxGeometry(0.007, pageH * 0.965, pageD * 0.94);
  const page_fore_edge = new THREE.Mesh(page_fore_edgeGeom, pageMat);
  page_fore_edge.name = "page_fore_edge";
  page_fore_edge.position.set(pageCenterX + pageW / 2 + 0.001, 0, 0);
  root.add(page_fore_edge);

  const page_top_edgeGeom = new THREE.BoxGeometry(pageW * 0.96, 0.007, pageD * 0.94);
  const page_top_edge = new THREE.Mesh(page_top_edgeGeom, pageMat);
  page_top_edge.name = "page_top_edge";
  page_top_edge.position.set(pageCenterX, pageH / 2 + 0.001, 0);
  root.add(page_top_edge);

  const page_bottom_edgeGeom = page_top_edgeGeom;
  const page_bottom_edge = new THREE.Mesh(page_bottom_edgeGeom, pageMat);
  page_bottom_edge.name = "page_bottom_edge";
  page_bottom_edge.position.set(pageCenterX, -pageH / 2 - 0.001, 0);
  root.add(page_bottom_edge);

  const page_linesGeom = new THREE.BoxGeometry(0.004, 0.0015, pageD * 0.9);
  const page_lines = new THREE.InstancedMesh(page_linesGeom, pageLineMat, 18);
  page_lines.name = "page_lines";
  const pageLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 18; i++) {
    const y = -pageH * 0.43 + i * pageH * 0.86 / 17;
    pageLineMatrix.makeTranslation(pageCenterX + pageW / 2 + 0.005, y, 0);
    page_lines.setMatrixAt(i, pageLineMatrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  root.add(page_lines);

  const coverShape = roundedRectShape(coverW, coverH, coverR);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: coverT,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.007,
    bevelSegments: 3
  });

  const back_cover = new THREE.Mesh(coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(coverCenterX, 0, -pageD / 2 - coverT);
  root.add(back_cover);

  const front_cover = new THREE.Mesh(coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.set(coverCenterX, 0, pageD / 2);
  root.add(front_cover);

  const front_panelGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.625, 0.995, 0.035),
    12
  );
  const front_panel = new THREE.Mesh(front_panelGeom, panelMat);
  front_panel.name = "front_panel";
  front_panel.position.set(coverCenterX, 0, 0.139);
  root.add(front_panel);

  const front_hinge_rollGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.015, 18);
  const front_hinge_roll = new THREE.Mesh(front_hinge_rollGeom, edgeLeatherMat);
  front_hinge_roll.name = "front_hinge_roll";
  front_hinge_roll.position.set(-0.292, 0, 0.132);
  root.add(front_hinge_roll);

  const back_hinge_roll = new THREE.Mesh(front_hinge_rollGeom, edgeLeatherMat);
  back_hinge_roll.name = "back_hinge_roll";
  back_hinge_roll.position.set(-0.292, 0, -0.132);
  root.add(back_hinge_roll);

  const front_top_edge = addBox(
    root, "front_top_edge", 0.61, 0.014, 0.008,
    edgeLeatherMat, coverCenterX, 0.518, 0.136
  );
  const front_bottom_edge = addBox(
    root, "front_bottom_edge", 0.61, 0.014, 0.008,
    edgeLeatherMat, coverCenterX, -0.518, 0.136
  );
  const front_right_edge = addBox(
    root, "front_right_edge", 0.014, 0.96, 0.008,
    edgeLeatherMat, coverCenterX + coverW / 2 - 0.007, 0, 0.136
  );
  const front_spine_edge = addBox(
    root, "front_spine_edge", 0.012, 0.98, 0.008,
    darkLeatherMat, coverCenterX - coverW / 2 + 0.006, 0, 0.137
  );

  const front_border_top = addBox(
    root, "front_border_top", 0.56, 0.003, 0.004,
    goldMat, coverCenterX, 0.472, 0.143
  );
  const front_border_bottom = addBox(
    root, "front_border_bottom", 0.56, 0.003, 0.004,
    goldMat, coverCenterX, -0.472, 0.143
  );
  const front_border_left = addBox(
    root, "front_border_left", 0.003, 0.944, 0.004,
    goldMat, coverCenterX - 0.28, 0, 0.143
  );
  const front_border_right = addBox(
    root, "front_border_right", 0.003, 0.944, 0.004,
    goldMat, coverCenterX + 0.28, 0, 0.143
  );

  const front_title = makePixelText(
    root, "front_title", "BENGE BIIILA",
    coverCenterX, 0.205, 0.146, 0.006, goldMat
  );
  const front_subtitle = makePixelText(
    root, "front_subtitle", "SAAN IEAE",
    coverCenterX, 0.105, 0.146, 0.0048, goldMat
  );

  const front_title_rule = addBox(
    root, "front_title_rule", 0.39, 0.0025, 0.003,
    goldMat, coverCenterX, 0.151, 0.146
  );
  const front_title_dotsGeom = new THREE.BoxGeometry(0.0025, 0.007, 0.003);
  const front_title_dots = new THREE.InstancedMesh(front_title_dotsGeom, goldMat, 27);
  front_title_dots.name = "front_title_dots";
  const titleDotMatrix = new THREE.Matrix4();
  for (let i = 0; i < 27; i++) {
    const x = coverCenterX - 0.19 + i * 0.38 / 26;
    const sy = 0.55 + (i % 3) * 0.22;
    titleDotMatrix.makeScale(1, sy, 1);
    titleDotMatrix.setPosition(x, 0.143, 0.146);
    front_title_dots.setMatrixAt(i, titleDotMatrix);
  }
  front_title_dots.instanceMatrix.needsUpdate = true;
  root.add(front_title_dots);

  const front_handwriting = new THREE.Group();
  front_handwriting.name = "front_handwriting";
  root.add(front_handwriting);

  const scriptZ = 0.146;
  addSurfaceTube(front_handwriting, "script_line_1", [
    [-0.19, 0.055], [-0.17, 0.075], [-0.15, 0.035], [-0.13, 0.072],
    [-0.10, 0.045], [-0.075, 0.052], [-0.045, 0.035], [-0.015, 0.065],
    [0.02, 0.04], [0.055, 0.055], [0.09, 0.034], [0.13, 0.06],
    [0.17, 0.045], [0.21, 0.052]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_1_descender", [
    [-0.165, 0.065], [-0.17, 0.025], [-0.162, -0.012],
    [-0.145, 0.005], [-0.137, 0.045]
  ], 0.0016, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_2", [
    [-0.12, 0.005], [-0.10, 0.025], [-0.08, -0.008], [-0.055, 0.022],
    [-0.025, 0.004], [0.005, 0.019], [0.035, -0.005], [0.07, 0.021],
    [0.105, 0.002], [0.14, 0.018], [0.18, 0.005]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_3", [
    [-0.19, -0.055], [-0.165, -0.03], [-0.14, -0.07], [-0.11, -0.035],
    [-0.08, -0.065], [-0.045, -0.04], [-0.01, -0.062], [0.025, -0.035],
    [0.06, -0.058], [0.095, -0.03], [0.13, -0.065], [0.17, -0.04],
    [0.205, -0.055]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_4", [
    [-0.205, -0.11], [-0.18, -0.085], [-0.155, -0.125], [-0.125, -0.09],
    [-0.095, -0.12], [-0.06, -0.095], [-0.025, -0.118], [0.01, -0.088],
    [0.045, -0.115], [0.08, -0.09], [0.115, -0.12], [0.155, -0.095],
    [0.205, -0.11]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_5", [
    [-0.17, -0.165], [-0.145, -0.14], [-0.12, -0.18], [-0.09, -0.145],
    [-0.055, -0.175], [-0.02, -0.15], [0.015, -0.178], [0.05, -0.145],
    [0.085, -0.172], [0.12, -0.145], [0.16, -0.165]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_6", [
    [-0.11, -0.22], [-0.085, -0.195], [-0.06, -0.235], [-0.03, -0.2],
    [0.005, -0.228], [0.04, -0.2], [0.075, -0.225], [0.11, -0.198],
    [0.15, -0.218]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_7", [
    [-0.18, -0.275], [-0.15, -0.25], [-0.125, -0.29], [-0.095, -0.255],
    [-0.06, -0.285], [-0.025, -0.255], [0.01, -0.282], [0.05, -0.25],
    [0.09, -0.278], [0.13, -0.248], [0.18, -0.27]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_8", [
    [-0.12, -0.33], [-0.095, -0.305], [-0.07, -0.345], [-0.04, -0.31],
    [-0.01, -0.338], [0.02, -0.308], [0.055, -0.335], [0.095, -0.305],
    [0.14, -0.325]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_line_9", [
    [-0.07, -0.385], [-0.045, -0.36], [-0.02, -0.4], [0.01, -0.365],
    [0.04, -0.392], [0.075, -0.365], [0.115, -0.385]
  ], 0.0018, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_long_flourish", [
    [0.19, 0.075], [0.225, 0.02], [0.218, -0.05], [0.235, -0.12],
    [0.22, -0.20], [0.238, -0.28]
  ], 0.0016, inkMat, scriptZ);
  addSurfaceTube(front_handwriting, "script_left_flourish", [
    [-0.205, -0.105], [-0.235, -0.145], [-0.22, -0.205],
    [-0.236, -0.255]
  ], 0.0015, inkMat, scriptZ);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(0.006, 0.009, 0.019, 0.008, 0.026, 0);
  leafShape.bezierCurveTo(0.019, -0.008, 0.006, -0.009, 0, 0);
  leafShape.closePath();
  const leafGeom = new THREE.ShapeGeometry(leafShape, 8);

  const front_corner_ornaments = new THREE.Group();
  front_corner_ornaments.name = "front_corner_ornaments";
  root.add(front_corner_ornaments);

  addSurfaceTube(front_corner_ornaments, "top_left_vine", [
    [-0.245, 0.455], [-0.22, 0.42], [-0.19, 0.405],
    [-0.155, 0.42], [-0.12, 0.385], [-0.085, 0.39]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "top_left_vine_two", [
    [-0.225, 0.43], [-0.235, 0.385], [-0.215, 0.35],
    [-0.225, 0.315], [-0.205, 0.28]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "top_left_curl", [
    [-0.19, 0.405], [-0.16, 0.37], [-0.175, 0.34],
    [-0.205, 0.35], [-0.215, 0.38]
  ], 0.0016, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "top_right_vine", [
    [0.285, 0.455], [0.26, 0.42], [0.23, 0.405],
    [0.195, 0.42], [0.16, 0.385], [0.125, 0.39]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "top_right_vine_two", [
    [0.265, 0.43], [0.275, 0.385], [0.255, 0.35],
    [0.265, 0.315], [0.245, 0.28]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "top_right_curl", [
    [0.23, 0.405], [0.20, 0.37], [0.215, 0.34],
    [0.245, 0.35], [0.255, 0.38]
  ], 0.0016, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "bottom_left_vine", [
    [-0.245, -0.455], [-0.22, -0.42], [-0.19, -0.405],
    [-0.155, -0.42], [-0.12, -0.385], [-0.085, -0.39]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "bottom_left_vine_two", [
    [-0.225, -0.43], [-0.235, -0.385], [-0.215, -0.35],
    [-0.225, -0.315], [-0.205, -0.28]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "bottom_left_curl", [
    [-0.19, -0.405], [-0.16, -0.37], [-0.175, -0.34],
    [-0.205, -0.35], [-0.215, -0.38]
  ], 0.0016, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "bottom_right_vine", [
    [0.285, -0.455], [0.26, -0.42], [0.23, -0.405],
    [0.195, -0.42], [0.16, -0.385], [0.125, -0.39]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "bottom_right_vine_two", [
    [0.265, -0.43], [0.275, -0.385], [0.255, -0.35],
    [0.265, -0.315], [0.245, -0.28]
  ], 0.0018, goldMat, 0.146);
  addSurfaceTube(front_corner_ornaments, "bottom_right_curl", [
    [0.23, -0.405], [0.20, -0.37], [0.215, -0.34],
    [0.245, -0.35], [0.255, -0.38]
  ], 0.0016, goldMat, 0.146);

  const frontLeafData = [];
  const cornerSigns = [
    [-1, 1], [1, 1], [-1, -1], [1, -1]
  ];
  for (let c = 0; c < cornerSigns.length; c++) {
    const sx = cornerSigns[c][0];
    const sy = cornerSigns[c][1];
    for (let i = 0; i < 7; i++) {
      frontLeafData.push([
        coverCenterX + sx * (0.235 - i * 0.018),
        sy * (0.435 - i * 0.018),
        sx * sy * (0.55 + i * 0.12),
        0.62 + (i % 3) * 0.1
      ]);
    }
    for (let i = 0; i < 4; i++) {
      frontLeafData.push([
        coverCenterX + sx * (0.16 + i * 0.025),
        sy * (0.39 - i * 0.012),
        sx * sy * 0.8,
        0.55 + i * 0.08
      ]);
    }
  }

  const front_corner_leaves = new THREE.InstancedMesh(
    leafGeom, goldMat, frontLeafData.length
  );
  front_corner_leaves.name = "front_corner_leaves";
  const leafMatrix = new THREE.Matrix4();
  const leafPosition = new THREE.Vector3();
  const leafQuaternion = new THREE.Quaternion();
  const leafScale = new THREE.Vector3();
  const leafEuler = new THREE.Euler();
  for (let i = 0; i < frontLeafData.length; i++) {
    const data = frontLeafData[i];
    leafPosition.set(data[0], data[1], 0.147);
    leafEuler.set(0, 0, data[2]);
    leafQuaternion.setFromEuler(leafEuler);
    leafScale.set(data[3], data[3], 1);
    leafMatrix.compose(leafPosition, leafQuaternion, leafScale);
    front_corner_leaves.setMatrixAt(i, leafMatrix);
  }
  front_corner_leaves.instanceMatrix.needsUpdate = true;
  front_corner_ornaments.add(front_corner_leaves);

  const front_wear_marksGeom = new THREE.BoxGeometry(0.025, 0.002, 0.0015);
  const wearData = [
    [-0.245, 0.497, 0.12, 1.0], [-0.13, 0.505, -0.08, 0.7],
    [0.04, 0.506, 0.04, 0.8], [0.22, 0.495, -0.15, 0.9],
    [-0.24, -0.497, -0.1, 0.8], [-0.08, -0.505, 0.06, 1.1],
    [0.13, -0.503, -0.04, 0.7], [0.27, -0.485, 0.55, 0.8],
    [-0.275, 0.36, 1.35, 0.6], [-0.277, 0.18, 1.48, 0.8],
    [-0.276, -0.12, 1.4, 0.7], [-0.274, -0.35, 1.5, 0.9],
    [0.31, 0.34, 1.45, 0.7], [0.311, 0.08, 1.38, 0.8],
    [0.31, -0.2, 1.5, 0.6], [0.29, -0.42, 1.1, 0.8]
  ];
  const front_wear_marks = new THREE.InstancedMesh(
    front_wear_marksGeom, wearMat, wearData.length
  );
  front_wear_marks.name = "front_wear_marks";
  const wearMatrix = new THREE.Matrix4();
  const wearPosition = new THREE.Vector3();
  const wearQuaternion = new THREE.Quaternion();
  const wearScale = new THREE.Vector3();
  const wearEuler = new THREE.Euler();
  for (let i = 0; i < wearData.length; i++) {
    const data = wearData[i];
    wearPosition.set(data[0], data[1], 0.148);
    wearEuler.set(0, 0, data[2]);
    wearQuaternion.setFromEuler(wearEuler);
    wearScale.set(data[3], 1, 1);
    wearMatrix.compose(wearPosition, wearQuaternion, wearScale);
    front_wear_marks.setMatrixAt(i, wearMatrix);
  }
  front_wear_marks.instanceMatrix.needsUpdate = true;
  root.add(front_wear_marks);

  const spine_group = new THREE.Group();
  spine_group.name = "spine_group";
  spine_group.position.x = spineX;
  root.add(spine_group);

  const spineGeom = new THREE.CylinderGeometry(spineR, spineR, 1.04, 32);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.scale.set(spineScaleX, 1, spineScaleZ);
  spine_group.add(spine);

  const spine_capGeom = new THREE.SphereGeometry(spineR, 24, 12);
  const spine_top_cap = new THREE.Mesh(spine_capGeom, edgeLeatherMat);
  spine_top_cap.name = "spine_top_cap";
  spine_top_cap.position.y = 0.52;
  spine_top_cap.scale.set(spineScaleX, 0.36, spineScaleZ);
  spine_group.add(spine_top_cap);

  const spine_bottom_cap = new THREE.Mesh(spine_capGeom, edgeLeatherMat);
  spine_bottom_cap.name = "spine_bottom_cap";
  spine_bottom_cap.position.y = -0.52;
  spine_bottom_cap.scale.set(spineScaleX, 0.36, spineScaleZ);
  spine_group.add(spine_bottom_cap);

  const spine_bandGeom = new THREE.TorusGeometry(0.09, 0.011, 8, 28);
  const bandY = [0.405, 0.235, 0.07, -0.105, -0.285, -0.455];
  const spine_bands = new THREE.InstancedMesh(
    spine_bandGeom, edgeLeatherMat, bandY.length
  );
  spine_bands.name = "spine_bands";
  const bandMatrix = new THREE.Matrix4();
  const bandPosition = new THREE.Vector3();
  const bandQuaternion = new THREE.Quaternion();
  const bandScale = new THREE.Vector3(spineScaleX, spineScaleZ, 1);
  const bandEuler = new THREE.Euler(Math.PI / 2, 0, 0);
  bandQuaternion.setFromEuler(bandEuler);
  for (let i = 0; i < bandY.length; i++) {
    bandPosition.set(0, bandY[i], 0);
    bandMatrix.compose(bandPosition, bandQuaternion, bandScale);
    spine_bands.setMatrixAt(i, bandMatrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  spine_group.add(spine_bands);

  const spine_gold_bandGeom = new THREE.TorusGeometry(0.091, 0.0022, 6, 28);
  const goldBandY = [0.42, 0.39, 0.25, 0.22, 0.085, 0.055, -0.09, -0.12, -0.27, -0.30, -0.44, -0.47];
  const spine_gold_bands = new THREE.InstancedMesh(
    spine_gold_bandGeom, goldMat, goldBandY.length
  );
  spine_gold_bands.name = "spine_gold_bands";
  for (let i = 0; i < goldBandY.length; i++) {
    bandPosition.set(0, goldBandY[i], 0);
    bandMatrix.compose(bandPosition, bandQuaternion, bandScale);
    spine_gold_bands.setMatrixAt(i, bandMatrix);
  }
  spine_gold_bands.instanceMatrix.needsUpdate = true;
  spine_group.add(spine_gold_bands);

  const spine_upper_label = addBox(
    spine_group, "spine_upper_label", 0.105, 0.125, 0.005,
    darkLeatherMat, 0, 0.315, 0.119
  );
  const spine_middle_label = addBox(
    spine_group, "spine_middle_label", 0.105, 0.125, 0.005,
    darkLeatherMat, 0, 0.145, 0.119
  );
  const spine_lower_label = addBox(
    spine_group, "spine_lower_label", 0.105, 0.125, 0.005,
    darkLeatherMat, 0, -0.018, 0.119
  );
  const spine_year_label = addBox(
    spine_group, "spine_year_label", 0.105, 0.125, 0.005,
    darkLeatherMat, 0, -0.395, 0.119
  );

  const spine_title = makePixelText(
    spine_group, "spine_title", "HISTORIA",
    0, 0.325, 0.125, 0.00175, goldMat
  );
  const spine_middle_text = makePixelText(
    spine_group, "spine_middle_text", "ANNO",
    0, 0.16, 0.125, 0.00235, goldMat
  );
  const spine_lower_text = makePixelText(
    spine_group, "spine_lower_text", "MDCC",
    0, 0.11, 0.125, 0.00215, goldMat
  );
  const spine_year = makePixelText(
    spine_group, "spine_year", "1712",
    0, -0.395, 0.125, 0.00245, goldMat
  );

  const spine_ornaments = new THREE.Group();
  spine_ornaments.name = "spine_ornaments";
  spine_group.add(spine_ornaments);

  addSurfaceTube(spine_ornaments, "upper_spine_vine", [
    [-0.018, 0.46], [-0.006, 0.485], [0.008, 0.46],
    [0.018, 0.485], [0.026, 0.455]
  ], 0.0017, goldMat, 0.126);
  addSurfaceTube(spine_ornaments, "upper_spine_branch", [
    [-0.025, 0.445], [-0.01, 0.46], [0, 0.44],
    [0.012, 0.46], [0.026, 0.44]
  ], 0.0015, goldMat, 0.126);
  addSurfaceTube(spine_ornaments, "middle_spine_vine", [
    [-0.02, -0.19], [-0.008, -0.215], [0.006, -0.195],
    [0.018, -0.225], [0.026, -0.205]
  ], 0.0017, goldMat, 0.126);
  addSurfaceTube(spine_ornaments, "lower_spine_vine", [
    [-0.025, -0.36], [-0.01, -0.385], [0.006, -0.365],
    [0.02, -0.395], [0.028, -0.375]
  ], 0.0017, goldMat, 0.126);
  addSurfaceTube(spine_ornaments, "bottom_spine_vine", [
    [-0.026, -0.49], [-0.012, -0.515], [0.002, -0.495],
    [0.016, -0.52], [0.028, -0.495]
  ], 0.0017, goldMat, 0.126);

  const spineLeafData = [
    [-0.02, 0.47, 0.5, 0.55], [0.018, 0.47, -0.5, 0.55],
    [-0.026, 0.445, 0.8, 0.48], [0.025, 0.445, -0.8, 0.48],
    [-0.018, -0.205, 0.6, 0.5], [0.018, -0.215, -0.6, 0.5],
    [-0.022, -0.375, 0.7, 0.5], [0.02, -0.382, -0.7, 0.5],
    [-0.022, -0.5, 0.75, 0.52], [0.02, -0.505, -0.75, 0.52],
    [0, -0.19, 1.2, 0.45], [0, -0.39, 1.0, 0.45]
  ];
  const spine_corner_leaves = new THREE.InstancedMesh(
    leafGeom, goldMat, spineLeafData.length
  );
  spine_corner_leaves.name = "spine_corner_leaves";
  for (let i = 0; i < spineLeafData.length; i++) {
    const data = spineLeafData[i];
    leafPosition.set(data[0], data[1], 0.127);
    leafEuler.set(0, 0, data[2]);
    leafQuaternion.setFromEuler(leafEuler);
    leafScale.set(data[3], data[3], 1);
    leafMatrix.compose(leafPosition, leafQuaternion, leafScale);
    spine_corner_leaves.setMatrixAt(i, leafMatrix);
  }
  spine_corner_leaves.instanceMatrix.needsUpdate = true;
  spine_ornaments.add(spine_corner_leaves);

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