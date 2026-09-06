export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_book";

  const book = new THREE.Group();
  book.name = "book";
  root.add(book);

  const coverW = 1.0;
  const coverH = 1.38;
  const coverD = 0.055;
  const coverX = 0.045;
  const pageW = 0.91;
  const pageH = 1.27;
  const pageD = 0.25;
  const pageX = 0.055;
  const spineX = -0.48;
  const frontFaceZ = 0.201;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0x3b211a,
    metalness: 0.0,
    roughness: 0.7
  });
  const front_panelMat = new THREE.MeshStandardMaterial({
    color: 0x211719,
    metalness: 0.0,
    roughness: 0.7
  });
  const spineMat = new THREE.MeshStandardMaterial({
    color: 0x4a2a20,
    metalness: 0.0,
    roughness: 0.7
  });
  const raised_leatherMat = new THREE.MeshStandardMaterial({
    color: 0x5a3426,
    metalness: 0.0,
    roughness: 0.7
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xb89b70,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0x775d43,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd2aa4f,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const worn_leatherMat = new THREE.MeshStandardMaterial({
    color: 0x865137,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const scuffMat = new THREE.MeshStandardMaterial({
    color: 0xa06b48,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_scuffMat = new THREE.MeshStandardMaterial({
    color: 0x100d0e,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0x59191d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
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

  function roundedExtrudeGeometry(w, h, r, depth, bevel) {
    const geom = new THREE.ExtrudeGeometry(
      roundedRectShape(w, h, r),
      {
        depth: depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2
      }
    );
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function makeFrame(name, w, h, thickness, mat, x, y, z) {
    const frame = new THREE.Group();
    frame.name = name;

    const horizontalGeom = new THREE.BoxGeometry(w, thickness, 0.007);
    const verticalGeom = new THREE.BoxGeometry(thickness, h, 0.007);

    const top = new THREE.Mesh(horizontalGeom, mat);
    top.name = name + "_top";
    top.position.y = h / 2;
    frame.add(top);

    const bottom = new THREE.Mesh(horizontalGeom, mat);
    bottom.name = name + "_bottom";
    bottom.position.y = -h / 2;
    frame.add(bottom);

    const left = new THREE.Mesh(verticalGeom, mat);
    left.name = name + "_left";
    left.position.x = -w / 2;
    frame.add(left);

    const right = new THREE.Mesh(verticalGeom, mat);
    right.name = name + "_right";
    right.position.x = w / 2;
    frame.add(right);

    frame.position.set(x, y, z);
    return frame;
  }

  function makeStarGeometry(outerRadius, innerRadius, pointCount) {
    const shape = new THREE.Shape();
    for (let i = 0; i < pointCount * 2; i++) {
      const angle = Math.PI / 2 + i * Math.PI / pointCount;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const page_blockGeom = roundedExtrudeGeometry(
    pageW,
    pageH,
    0.035,
    pageD,
    0.008
  );
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.position.x = pageX;
  book.add(page_block);

  const fore_edge_linesGeom = new THREE.BoxGeometry(
    0.006,
    0.003,
    pageD * 0.94
  );
  const fore_edge_lines = new THREE.InstancedMesh(
    fore_edge_linesGeom,
    page_lineMat,
    14
  );
  fore_edge_lines.name = "fore_edge_lines";
  for (let i = 0; i < 14; i++) {
    const y = -pageH * 0.43 + i * pageH * 0.86 / 13;
    const matrix = new THREE.Matrix4().makeTranslation(
      pageX + pageW / 2 + 0.004,
      y,
      0
    );
    fore_edge_lines.setMatrixAt(i, matrix);
  }
  fore_edge_lines.instanceMatrix.needsUpdate = true;
  book.add(fore_edge_lines);

  const bottom_page_linesGeom = new THREE.BoxGeometry(
    pageW * 0.92,
    0.003,
    0.006
  );
  const bottom_page_lines = new THREE.InstancedMesh(
    bottom_page_linesGeom,
    page_lineMat,
    8
  );
  bottom_page_lines.name = "bottom_page_lines";
  for (let i = 0; i < 8; i++) {
    const z = -pageD * 0.39 + i * pageD * 0.78 / 7;
    const matrix = new THREE.Matrix4().makeTranslation(
      pageX,
      -pageH / 2 - 0.003,
      z
    );
    bottom_page_lines.setMatrixAt(i, matrix);
  }
  bottom_page_lines.instanceMatrix.needsUpdate = true;
  book.add(bottom_page_lines);

  const front_coverGeom = roundedExtrudeGeometry(
    coverW,
    coverH,
    0.065,
    coverD,
    0.012
  );
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.name = "front_cover";
  front_cover.position.set(coverX, 0, pageD / 2 + coverD / 2);
  book.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, front_coverMat);
  back_cover.name = "back_cover";
  back_cover.position.set(coverX, 0, -pageD / 2 - coverD / 2);
  book.add(back_cover);

  const front_panelGeom = roundedExtrudeGeometry(
    0.92,
    1.27,
    0.045,
    0.012,
    0.004
  );
  const front_panel = new THREE.Mesh(front_panelGeom, front_panelMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0.06, 0, 0.184);
  book.add(front_panel);

  const front_hingeGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    1.29,
    16
  );
  const front_hinge = new THREE.Mesh(front_hingeGeom, raised_leatherMat);
  front_hinge.name = "front_hinge";
  front_hinge.position.set(-0.405, 0, 0.19);
  book.add(front_hinge);

  const back_hingeGeom = front_hingeGeom;
  const back_hinge = new THREE.Mesh(back_hingeGeom, raised_leatherMat);
  back_hinge.name = "back_hinge";
  back_hinge.position.set(-0.405, 0, -0.19);
  book.add(back_hinge);

  const front_cover_edge = makeFrame(
    "front_cover_edge",
    0.95,
    1.32,
    0.027,
    raised_leatherMat,
    coverX,
    0,
    0.194
  );
  book.add(front_cover_edge);

  const front_gold_border = makeFrame(
    "front_gold_border",
    0.86,
    1.19,
    0.014,
    goldMat,
    0.07,
    0,
    frontFaceZ
  );
  book.add(front_gold_border);

  const front_gold_inner_border = makeFrame(
    "front_gold_inner_border",
    0.82,
    1.15,
    0.006,
    goldMat,
    0.07,
    0,
    frontFaceZ + 0.002
  );
  book.add(front_gold_inner_border);

  const corner_leafGeom = new THREE.CircleGeometry(0.026, 14);
  const front_corner_ornaments = new THREE.InstancedMesh(
    corner_leafGeom,
    goldMat,
    24
  );
  front_corner_ornaments.name = "front_corner_ornaments";

  const cornerCenters = [
    [-0.34, 0.555],
    [0.48, 0.555],
    [-0.34, -0.555],
    [0.48, -0.555]
  ];
  let cornerIndex = 0;
  for (let c = 0; c < cornerCenters.length; c++) {
    const cx = cornerCenters[c][0];
    const cy = cornerCenters[c][1];
    const inwardX = cx < 0.07 ? 1 : -1;
    const inwardY = cy < 0 ? 1 : -1;

    for (let j = 0; j < 6; j++) {
      const t = j / 5;
      const along = 0.025 + t * 0.11;
      const across = 0.012 + t * 0.052;
      const x = cx + inwardX * along + inwardY * across;
      const y = cy + inwardY * along - inwardX * across;
      const angle = Math.atan2(inwardY, inwardX) +
        (j % 2 === 0 ? -0.42 : 0.42);
      const position = new THREE.Vector3(x, y, frontFaceZ + 0.004);
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        angle
      );
      const scale = new THREE.Vector3(
        1.2 - t * 0.35,
        0.42 + t * 0.08,
        1
      );
      const matrix = new THREE.Matrix4().compose(
        position,
        quaternion,
        scale
      );
      front_corner_ornaments.setMatrixAt(cornerIndex, matrix);
      cornerIndex++;
    }
  }
  front_corner_ornaments.instanceMatrix.needsUpdate = true;
  book.add(front_corner_ornaments);

  const corner_scrollwork = new THREE.Group();
  corner_scrollwork.name = "corner_scrollwork";
  for (let c = 0; c < cornerCenters.length; c++) {
    const cx = cornerCenters[c][0];
    const cy = cornerCenters[c][1];
    const inwardX = cx < 0.07 ? 1 : -1;
    const inwardY = cy < 0 ? 1 : -1;

    const mainPoints = [
      new THREE.Vector3(
        cx + inwardX * 0.012,
        cy + inwardY * 0.012,
        frontFaceZ + 0.005
      ),
      new THREE.Vector3(
        cx + inwardX * 0.045,
        cy + inwardY * 0.035,
        frontFaceZ + 0.005
      ),
      new THREE.Vector3(
        cx + inwardX * 0.085,
        cy + inwardY * 0.09,
        frontFaceZ + 0.005
      ),
      new THREE.Vector3(
        cx + inwardX * 0.16,
        cy + inwardY * 0.13,
        frontFaceZ + 0.005
      )
    ];
    const mainScroll = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(mainPoints),
        18,
        0.0045,
        6,
        false
      ),
      goldMat
    );
    mainScroll.name = "corner_main_scroll";
    corner_scrollwork.add(mainScroll);

    const side = inwardX * inwardY;
    const branchPoints = [
      new THREE.Vector3(
        cx + inwardX * 0.045,
        cy + inwardY * 0.035,
        frontFaceZ + 0.005
      ),
      new THREE.Vector3(
        cx + inwardX * 0.075 + inwardY * 0.025 * side,
        cy + inwardY * 0.055 + inwardX * 0.025,
        frontFaceZ + 0.005
      ),
      new THREE.Vector3(
        cx + inwardX * 0.11 + inwardY * 0.06 * side,
        cy + inwardY * 0.075 + inwardX * 0.04,
        frontFaceZ + 0.005
      )
    ];
    const branchScroll = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(branchPoints),
        12,
        0.0035,
        6,
        false
      ),
      goldMat
    );
    branchScroll.name = "corner_branch_scroll";
    corner_scrollwork.add(branchScroll);
  }
  book.add(corner_scrollwork);

  const cover_scuffsGeom = new THREE.CircleGeometry(0.03, 14);
  const cover_scuffs = new THREE.InstancedMesh(
    cover_scuffsGeom,
    worn_leatherMat,
    18
  );
  cover_scuffs.name = "cover_scuffs";
  for (let i = 0; i < 18; i++) {
    const x = -0.35 + ((i * 17) % 31) / 30 * 0.82;
    const y = -0.55 + ((i * 13) % 29) / 28 * 1.1;
    const position = new THREE.Vector3(x, y, frontFaceZ + 0.001);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      i * 0.73
    );
    const scale = new THREE.Vector3(
      0.35 + (i % 5) * 0.19,
      0.12 + (i % 4) * 0.08,
      1
    );
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      scale
    );
    cover_scuffs.setMatrixAt(i, matrix);
  }
  cover_scuffs.instanceMatrix.needsUpdate = true;
  book.add(cover_scuffs);

  const cover_dark_spotsGeom = new THREE.CircleGeometry(0.018, 12);
  const cover_dark_spots = new THREE.InstancedMesh(
    cover_dark_spotsGeom,
    dark_scuffMat,
    9
  );
  cover_dark_spots.name = "cover_dark_spots";
  for (let i = 0; i < 9; i++) {
    const x = -0.28 + ((i * 11 + 3) % 19) / 18 * 0.68;
    const y = -0.48 + ((i * 7 + 2) % 17) / 16 * 0.96;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, frontFaceZ + 0.002),
      new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        i * 0.51
      ),
      new THREE.Vector3(
        0.55 + (i % 3) * 0.45,
        0.45 + (i % 4) * 0.25,
        1
      )
    );
    cover_dark_spots.setMatrixAt(i, matrix);
  }
  cover_dark_spots.instanceMatrix.needsUpdate = true;
  book.add(cover_dark_spots);

  const cover_scratches = new THREE.Group();
  cover_scratches.name = "cover_scratches";
  const scratchSegments = [
    [-0.12, 0.34, 0.04, 0.43],
    [0.18, 0.18, 0.31, 0.26],
    [0.27, -0.18, 0.39, -0.08],
    [-0.22, -0.22, -0.08, -0.27],
    [0.02, -0.39, 0.13, -0.31],
    [0.34, 0.39, 0.42, 0.48]
  ];
  for (let i = 0; i < scratchSegments.length; i++) {
    const segment = scratchSegments[i];
    const points = [
      new THREE.Vector3(
        segment[0],
        segment[1],
        frontFaceZ + 0.004
      ),
      new THREE.Vector3(
        (segment[0] + segment[2]) / 2,
        (segment[1] + segment[3]) / 2 + 0.008,
        frontFaceZ + 0.004
      ),
      new THREE.Vector3(
        segment[2],
        segment[3],
        frontFaceZ + 0.004
      )
    ];
    const scratch = new THREE.Mesh(
      new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        8,
        0.0022,
        5,
        false
      ),
      scuffMat
    );
    scratch.name = "cover_scratch";
    cover_scratches.add(scratch);
  }
  book.add(cover_scratches);

  const spineGeom = new THREE.CylinderGeometry(
    0.19,
    0.19,
    1.32,
    32
  );
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.name = "spine";
  spine.position.set(spineX, 0, 0);
  spine.scale.set(0.58, 1, 1);
  book.add(spine);

  const spine_raised_bandsGeom = new THREE.TorusGeometry(
    0.17,
    0.022,
    8,
    28
  );
  const spine_raised_bands = new THREE.InstancedMesh(
    spine_raised_bandsGeom,
    raised_leatherMat,
    4
  );
  spine_raised_bands.name = "spine_raised_bands";
  const bandLevels = [0.55, 0.18, -0.18, -0.55];
  const bandQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  for (let i = 0; i < bandLevels.length; i++) {
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(spineX, bandLevels[i], 0),
      bandQuaternion,
      new THREE.Vector3(0.62, 1, 1)
    );
    spine_raised_bands.setMatrixAt(i, matrix);
  }
  spine_raised_bands.instanceMatrix.needsUpdate = true;
  book.add(spine_raised_bands);

  const spine_gold_rulesGeom = new THREE.TorusGeometry(
    0.176,
    0.004,
    6,
    28
  );
  const spine_gold_rules = new THREE.InstancedMesh(
    spine_gold_rulesGeom,
    goldMat,
    8
  );
  spine_gold_rules.name = "spine_gold_rules";
  let ruleIndex = 0;
  for (let i = 0; i < bandLevels.length; i++) {
    for (const offset of [-0.027, 0.027]) {
      const matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(spineX, bandLevels[i] + offset, 0),
        bandQuaternion,
        new THREE.Vector3(0.62, 1, 1)
      );
      spine_gold_rules.setMatrixAt(ruleIndex, matrix);
      ruleIndex++;
    }
  }
  spine_gold_rules.instanceMatrix.needsUpdate = true;
  book.add(spine_gold_rules);

  const spinePanelData = [
    [0.365, 0.31],
    [0, 0.27],
    [-0.365, 0.27]
  ];

  const spine_panelsGeom = new THREE.BoxGeometry(0.12, 1, 0.008);
  const spine_panels = new THREE.InstancedMesh(
    spine_panelsGeom,
    front_panelMat,
    spinePanelData.length
  );
  spine_panels.name = "spine_panels";
  for (let i = 0; i < spinePanelData.length; i++) {
    const data = spinePanelData[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(spineX, data[0], 0.193),
      new THREE.Quaternion(),
      new THREE.Vector3(1, data[1], 1)
    );
    spine_panels.setMatrixAt(i, matrix);
  }
  spine_panels.instanceMatrix.needsUpdate = true;
  book.add(spine_panels);

  const spine_panel_borders = new THREE.Group();
  spine_panel_borders.name = "spine_panel_borders";
  for (let i = 0; i < spinePanelData.length; i++) {
    const data = spinePanelData[i];
    const border = makeFrame(
      "spine_panel_border",
      0.112,
      data[1],
      0.008,
      goldMat,
      spineX,
      data[0],
      0.199
    );
    spine_panel_borders.add(border);
  }
  book.add(spine_panel_borders);

  const spine_emblemsGeom = makeStarGeometry(0.046, 0.021, 8);
  const spine_emblems = new THREE.InstancedMesh(
    spine_emblemsGeom,
    goldMat,
    spinePanelData.length
  );
  spine_emblems.name = "spine_emblems";
  for (let i = 0; i < spinePanelData.length; i++) {
    const data = spinePanelData[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(spineX, data[0], 0.204),
      new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        i * 0.22
      ),
      new THREE.Vector3(
        i === 0 ? 1 : 0.82,
        i === 0 ? 1 : 0.82,
        1
      )
    );
    spine_emblems.setMatrixAt(i, matrix);
  }
  spine_emblems.instanceMatrix.needsUpdate = true;
  book.add(spine_emblems);

  const spine_flourishesGeom = new THREE.CircleGeometry(0.017, 12);
  const spine_flourishes = new THREE.InstancedMesh(
    spine_flourishesGeom,
    goldMat,
    spinePanelData.length * 4
  );
  spine_flourishes.name = "spine_flourishes";
  let flourishIndex = 0;
  for (let i = 0; i < spinePanelData.length; i++) {
    const cy = spinePanelData[i][0];
    for (let j = 0; j < 4; j++) {
      const side = j < 2 ? -1 : 1;
      const level = j % 2 === 0 ? -0.035 : 0.035;
      const position = new THREE.Vector3(
        spineX + side * 0.027,
        cy + level,
        0.205
      );
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 0, 1),
        side * 0.65 + level * 4
      );
      const matrix = new THREE.Matrix4().compose(
        position,
        quaternion,
        new THREE.Vector3(1.15, 0.38, 1)
      );
      spine_flourishes.setMatrixAt(flourishIndex, matrix);
      flourishIndex++;
    }
  }
  spine_flourishes.instanceMatrix.needsUpdate = true;
  book.add(spine_flourishes);

  const bookmark_ribbon_upperGeom = new THREE.BoxGeometry(
    0.052,
    0.11,
    0.012
  );
  const bookmark_ribbon_upper = new THREE.Mesh(
    bookmark_ribbon_upperGeom,
    ribbonMat
  );
  bookmark_ribbon_upper.name = "bookmark_ribbon_upper";
  bookmark_ribbon_upper.position.set(-0.055, -0.69, -0.045);
  bookmark_ribbon_upper.rotation.z = 0.08;
  book.add(bookmark_ribbon_upper);

  const bookmarkShape = new THREE.Shape();
  bookmarkShape.moveTo(-0.026, 0.05);
  bookmarkShape.lineTo(0.026, 0.05);
  bookmarkShape.lineTo(0.026, -0.255);
  bookmarkShape.lineTo(0, -0.30);
  bookmarkShape.lineTo(-0.026, -0.255);
  bookmarkShape.closePath();

  const bookmark_ribbonGeom = new THREE.ExtrudeGeometry(
    bookmarkShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: false
    }
  );
  bookmark_ribbonGeom.translate(0, 0, -0.006);

  const bookmark_ribbon = new THREE.Mesh(
    bookmark_ribbonGeom,
    ribbonMat
  );
  bookmark_ribbon.name = "bookmark_ribbon";
  bookmark_ribbon.position.set(-0.075, -0.735, -0.045);
  bookmark_ribbon.rotation.z = 0.22;
  book.add(bookmark_ribbon);

  const bookmark_foldGeom = new THREE.BoxGeometry(
    0.052,
    0.16,
    0.014
  );
  const bookmark_fold = new THREE.Mesh(bookmark_foldGeom, ribbonMat);
  bookmark_fold.name = "bookmark_fold";
  bookmark_fold.position.set(-0.105, -0.79, -0.038);
  bookmark_fold.rotation.z = -0.52;
  book.add(bookmark_fold);

  book.rotation.set(-0.08, 0.17, 0.1);

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