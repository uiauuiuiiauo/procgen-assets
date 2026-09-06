export default function generate(THREE) {
  const root = new THREE.Group();

  const bookH = 1.72;
  const coverW = 1.18;
  const coverX = 0.02;
  const coverDepth = 0.045;
  const spineX = -0.57;
  const spineRadius = 0.17;
  const spineScaleX = 0.72;
  const spineRx = spineRadius * spineScaleX;
  const spineRz = spineRadius;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0x7b3f28,
    metalness: 0.0,
    roughness: 0.7
  });
  const back_coverMat = front_coverMat;
  const spineMat = new THREE.MeshStandardMaterial({
    color: 0x63301f,
    metalness: 0.0,
    roughness: 0.7
  });
  const dark_leatherMat = new THREE.MeshStandardMaterial({
    color: 0x4b251b,
    metalness: 0.0,
    roughness: 0.7
  });
  const worn_leatherMat = new THREE.MeshStandardMaterial({
    color: 0xa66d42,
    metalness: 0.0,
    roughness: 0.7
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xd8c29a,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_edge_linesMat = new THREE.MeshStandardMaterial({
    color: 0x9e7e58,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x211713,
    metalness: 0.0,
    roughness: 0.7
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0xc08a5b,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  const page_blockGeom = new THREE.BoxGeometry(1.08, 1.58, 0.205);
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.position.set(0.035, 0, 0);
  root.add(page_block);

  const front_coverShape = roundedRectShape(coverW, bookH, 0.055);
  const front_coverGeom = new THREE.ExtrudeGeometry(front_coverShape, {
    depth: coverDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.position.set(coverX, 0, 0.105);
  root.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.position.set(coverX, 0, -0.15);
  root.add(back_cover);

  const spineGeom = new THREE.CylinderGeometry(
    spineRadius,
    spineRadius,
    1.70,
    32,
    1,
    false
  );
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.position.set(spineX, 0, 0);
  spine.scale.set(spineScaleX, 1, 1);
  root.add(spine);

  const front_hingeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.64, 12);
  const front_hinge = new THREE.Mesh(front_hingeGeom, worn_leatherMat);
  front_hinge.position.set(-0.525, 0, 0.158);
  root.add(front_hinge);

  const back_hingeGeom = front_hingeGeom;
  const back_hinge = new THREE.Mesh(back_hingeGeom, worn_leatherMat);
  back_hinge.position.set(-0.525, 0, -0.158);
  root.add(back_hinge);

  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);
  const identityQuat = new THREE.Quaternion();
  const instanceMatrix = new THREE.Matrix4();
  const instancePosition = new THREE.Vector3();
  const instanceScale = new THREE.Vector3();

  const page_edge_lines = new THREE.InstancedMesh(
    unitBoxGeom,
    page_edge_linesMat,
    17
  );
  for (let i = 0; i < 17; i++) {
    instancePosition.set(0.578, -0.70 + i * 0.0875, 0);
    instanceScale.set(0.004, 0.0022, 0.195);
    instanceMatrix.compose(instancePosition, identityQuat, instanceScale);
    page_edge_lines.setMatrixAt(i, instanceMatrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  root.add(page_edge_lines);

  const front_inset_panelShape = roundedRectShape(1.01, 1.50, 0.035);
  const front_inset_panelGeom = new THREE.ExtrudeGeometry(
    front_inset_panelShape,
    {
      depth: 0.006,
      steps: 1,
      bevelEnabled: false
    }
  );
  const front_inset_panel = new THREE.Mesh(
    front_inset_panelGeom,
    dark_leatherMat
  );
  front_inset_panel.position.set(0.045, 0, 0.162);
  root.add(front_inset_panel);

  function createRectFrame(width, height, thickness, depth, material) {
    const frame = new THREE.InstancedMesh(unitBoxGeom, material, 4);
    const edgeData = [
      [0, height / 2, width, thickness],
      [0, -height / 2, width, thickness],
      [-width / 2, 0, thickness, height],
      [width / 2, 0, thickness, height]
    ];
    for (let i = 0; i < edgeData.length; i++) {
      const edge = edgeData[i];
      instancePosition.set(edge[0], edge[1], 0);
      instanceScale.set(edge[2], edge[3], depth);
      instanceMatrix.compose(instancePosition, identityQuat, instanceScale);
      frame.setMatrixAt(i, instanceMatrix);
    }
    frame.instanceMatrix.needsUpdate = true;
    return frame;
  }

  const front_outer_border = createRectFrame(
    1.055,
    1.585,
    0.010,
    0.006,
    goldMat
  );
  front_outer_border.position.set(0.045, 0, 0.174);
  root.add(front_outer_border);

  const front_inner_border = createRectFrame(
    0.985,
    1.515,
    0.005,
    0.005,
    goldMat
  );
  front_inner_border.position.set(0.045, 0, 0.175);
  root.add(front_inner_border);

  const spine_bandsGeom = new THREE.TorusGeometry(
    spineRadius,
    0.014,
    8,
    32
  );
  const spineBandY = [0.70, 0.43, 0.14, -0.17, -0.48, -0.72];
  const spine_bands = new THREE.InstancedMesh(
    spine_bandsGeom,
    dark_leatherMat,
    spineBandY.length
  );
  const horizontalQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  for (let i = 0; i < spineBandY.length; i++) {
    instancePosition.set(spineX, spineBandY[i], 0);
    instanceScale.set(spineScaleX, 1, 1);
    instanceMatrix.compose(instancePosition, horizontalQuat, instanceScale);
    spine_bands.setMatrixAt(i, instanceMatrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_bands);

  const spine_gold_bandsGeom = new THREE.TorusGeometry(
    spineRadius * 1.01,
    0.003,
    6,
    32
  );
  const spine_gold_bands = new THREE.InstancedMesh(
    spine_gold_bandsGeom,
    goldMat,
    spineBandY.length * 2
  );
  let goldBandIndex = 0;
  for (let i = 0; i < spineBandY.length; i++) {
    for (const offset of [-0.025, 0.025]) {
      instancePosition.set(spineX, spineBandY[i] + offset, 0);
      instanceScale.set(spineScaleX, 1, 1);
      instanceMatrix.compose(instancePosition, horizontalQuat, instanceScale);
      spine_gold_bands.setMatrixAt(goldBandIndex, instanceMatrix);
      goldBandIndex++;
    }
  }
  spine_gold_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_gold_bands);

  const spine_end_bandsGeom = new THREE.TorusGeometry(
    spineRadius,
    0.009,
    8,
    32
  );
  const spine_end_bands = new THREE.InstancedMesh(
    spine_end_bandsGeom,
    worn_leatherMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    instancePosition.set(spineX, i === 0 ? 0.842 : -0.842, 0);
    instanceScale.set(spineScaleX, 1, 1);
    instanceMatrix.compose(instancePosition, horizontalQuat, instanceScale);
    spine_end_bands.setMatrixAt(i, instanceMatrix);
  }
  spine_end_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_end_bands);

  const spine_end_gold_bandsGeom = new THREE.TorusGeometry(
    spineRadius * 1.01,
    0.0028,
    6,
    32
  );
  const spine_end_gold_bands = new THREE.InstancedMesh(
    spine_end_gold_bandsGeom,
    goldMat,
    4
  );
  const endGoldY = [0.822, 0.805, -0.805, -0.822];
  for (let i = 0; i < endGoldY.length; i++) {
    instancePosition.set(spineX, endGoldY[i], 0);
    instanceScale.set(spineScaleX, 1, 1);
    instanceMatrix.compose(instancePosition, horizontalQuat, instanceScale);
    spine_end_gold_bands.setMatrixAt(i, instanceMatrix);
  }
  spine_end_gold_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_end_gold_bands);

  const spinePanelY = [0.565, 0.285, 0.0, -0.325, -0.635];
  const spine_label_panels = new THREE.InstancedMesh(
    unitBoxGeom,
    dark_leatherMat,
    spinePanelY.length
  );
  for (let i = 0; i < spinePanelY.length; i++) {
    instancePosition.set(-0.697, spinePanelY[i], 0);
    instanceScale.set(0.008, i === 4 ? 0.19 : 0.22, 0.215);
    instanceMatrix.compose(instancePosition, identityQuat, instanceScale);
    spine_label_panels.setMatrixAt(i, instanceMatrix);
  }
  spine_label_panels.instanceMatrix.needsUpdate = true;
  root.add(spine_label_panels);

  function spineSurfacePoint(y, z, extra) {
    const ratio = Math.max(-0.98, Math.min(0.98, z / spineRz));
    const xRel = -spineRx * Math.sqrt(1 - ratio * ratio);
    const normal = new THREE.Vector3(
      xRel / (spineRx * spineRx),
      0,
      z / (spineRz * spineRz)
    ).normalize();
    return new THREE.Vector3(
      spineX + xRel + normal.x * extra,
      y,
      z + normal.z * extra
    );
  }

  function createSpineFrame(yCenter, height, halfWidth, material) {
    const frame = new THREE.Group();

    for (const z of [-halfWidth, halfWidth]) {
      const points = [];
      for (let i = 0; i <= 6; i++) {
        points.push(
          spineSurfacePoint(
            yCenter - height / 2 + height * i / 6,
            z,
            0.006
          )
        );
      }
      const verticalGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        10,
        0.0028,
        6,
        false
      );
      const vertical = new THREE.Mesh(verticalGeom, material);
      frame.add(vertical);
    }

    for (const y of [yCenter - height / 2, yCenter + height / 2]) {
      const points = [];
      for (let i = 0; i <= 8; i++) {
        points.push(
          spineSurfacePoint(
            y,
            -halfWidth + halfWidth * 2 * i / 8,
            0.006
          )
        );
      }
      const horizontalGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        12,
        0.0028,
        6,
        false
      );
      const horizontal = new THREE.Mesh(horizontalGeom, material);
      frame.add(horizontal);
    }
    return frame;
  }

  const spine_upper_border = createSpineFrame(
    0.565,
    0.225,
    0.105,
    goldMat
  );
  root.add(spine_upper_border);

  const spine_middle_border = createSpineFrame(
    0.285,
    0.225,
    0.105,
    goldMat
  );
  root.add(spine_middle_border);

  const spine_lower_border = createSpineFrame(
    0.0,
    0.225,
    0.105,
    goldMat
  );
  root.add(spine_lower_border);

  const spine_detail_group = new THREE.Group();
  root.add(spine_detail_group);

  function addSpineCurve(parent, coordinates, radius, material) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(
        spineSurfacePoint(
          coordinates[i][0],
          coordinates[i][1],
          0.009
        )
      );
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(8, coordinates.length * 3),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    parent.add(mesh);
    return mesh;
  }

  function addSpineDisc(parent, y, z, radius, sx, sy, material) {
    const ratio = Math.max(-0.98, Math.min(0.98, z / spineRz));
    const xRel = -spineRx * Math.sqrt(1 - ratio * ratio);
    const normal = new THREE.Vector3(
      xRel / (spineRx * spineRx),
      0,
      z / (spineRz * spineRz)
    ).normalize();
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 14),
      material
    );
    disc.position.copy(
      spineSurfacePoint(y, z, 0.010)
    );
    disc.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    disc.scale.set(sx, sy, 1);
    parent.add(disc);
    return disc;
  }

  const spine_upper_ornament = new THREE.Group();
  spine_detail_group.add(spine_upper_ornament);
  addSpineCurve(
    spine_upper_ornament,
    [[0.485, 0], [0.535, 0.006], [0.59, -0.005], [0.65, 0]],
    0.003,
    goldMat
  );
  addSpineCurve(
    spine_upper_ornament,
    [[0.555, 0], [0.58, 0.045], [0.62, 0.055]],
    0.0025,
    goldMat
  );
  addSpineCurve(
    spine_upper_ornament,
    [[0.555, 0], [0.58, -0.045], [0.62, -0.055]],
    0.0025,
    goldMat
  );
  addSpineDisc(
    spine_upper_ornament,
    0.59,
    0,
    0.012,
    0.65,
    1.25,
    goldMat
  );
  addSpineDisc(
    spine_upper_ornament,
    0.625,
    0.052,
    0.010,
    0.55,
    1.2,
    goldMat
  );
  addSpineDisc(
    spine_upper_ornament,
    0.625,
    -0.052,
    0.010,
    0.55,
    1.2,
    goldMat
  );

  const spine_lower_ornament = new THREE.Group();
  spine_detail_group.add(spine_lower_ornament);
  addSpineCurve(
    spine_lower_ornament,
    [[-0.69, 0], [-0.64, 0.008], [-0.59, -0.005], [-0.54, 0]],
    0.003,
    goldMat
  );
  addSpineCurve(
    spine_lower_ornament,
    [[-0.625, 0], [-0.65, 0.05], [-0.70, 0.06]],
    0.0025,
    goldMat
  );
  addSpineCurve(
    spine_lower_ornament,
    [[-0.625, 0], [-0.65, -0.05], [-0.70, -0.06]],
    0.0025,
    goldMat
  );
  addSpineDisc(
    spine_lower_ornament,
    -0.59,
    0,
    0.012,
    0.65,
    1.25,
    goldMat
  );
  addSpineDisc(
    spine_lower_ornament,
    -0.655,
    0.055,
    0.010,
    0.55,
    1.2,
    goldMat
  );
  addSpineDisc(
    spine_lower_ornament,
    -0.655,
    -0.055,
    0.010,
    0.55,
    1.2,
    goldMat
  );

  const spine_title_marks = new THREE.Group();
  spine_detail_group.add(spine_title_marks);
  for (let i = 0; i < 8; i++) {
    const z = -0.075 + i * 0.0215;
    addSpineCurve(
      spine_title_marks,
      [
        [0.505, z],
        [0.535, z + 0.004],
        [0.565, z - 0.003],
        [0.592, z]
      ],
      0.0018,
      goldMat
    );
  }

  const spine_small_marks = new THREE.Group();
  spine_detail_group.add(spine_small_marks);
  for (let i = 0; i < 5; i++) {
    const z = -0.05 + i * 0.025;
    addSpineCurve(
      spine_small_marks,
      [
        [0.255, z],
        [0.28, z + 0.005],
        [0.305, z]
      ],
      0.0017,
      goldMat
    );
    addSpineCurve(
      spine_small_marks,
      [
        [0.035, z],
        [0.06, z - 0.004],
        [0.09, z]
      ],
      0.0017,
      goldMat
    );
  }

  const glyphs = {
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    C: ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    G: ["01111", "10000", "10000", "10111", "10001", "10001", "01110"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"]
  };

  function createBitmapText(text, cell, material) {
    let count = 0;
    for (let c = 0; c < text.length; c++) {
      const pattern = glyphs[text[c]];
      if (!pattern) continue;
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col] === "1") count++;
        }
      }
    }

    const textMesh = new THREE.InstancedMesh(unitBoxGeom, material, count);
    const totalWidth = Math.max(0, text.length * 6 - 1) * cell;
    let index = 0;

    for (let c = 0; c < text.length; c++) {
      const pattern = glyphs[text[c]];
      if (!pattern) continue;
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (pattern[row][col] !== "1") continue;
          instancePosition.set(
            c * cell * 6 + col * cell - totalWidth / 2,
            (3 - row) * cell,
            0
          );
          instanceScale.set(cell * 0.78, cell * 0.82, 0.004);
          instanceMatrix.compose(
            instancePosition,
            identityQuat,
            instanceScale
          );
          textMesh.setMatrixAt(index, instanceMatrix);
          index++;
        }
      }
    }
    textMesh.instanceMatrix.needsUpdate = true;
    return textMesh;
  }

  const front_title = createBitmapText("BENGE BIILA", 0.0135, goldMat);
  front_title.position.set(0.045, 0.315, 0.181);
  root.add(front_title);

  const front_subtitle = createBitmapText(
    "SAAN TIAE",
    0.0105,
    goldMat
  );
  front_subtitle.position.set(0.045, 0.125, 0.181);
  root.add(front_subtitle);

  const front_title_rule = new THREE.Mesh(unitBoxGeom, goldMat);
  front_title_rule.scale.set(0.53, 0.004, 0.004);
  front_title_rule.position.set(0.045, 0.205, 0.181);
  root.add(front_title_rule);

  const front_title_flourishes = new THREE.InstancedMesh(
    unitBoxGeom,
    goldMat,
    17
  );
  for (let i = 0; i < 17; i++) {
    const x = -0.205 + i * 0.03125;
    const h = i % 4 === 0 ? 0.014 : 0.009;
    instancePosition.set(x, 0.193, 0.182);
    instanceScale.set(0.0022, h, 0.003);
    instanceMatrix.compose(
      instancePosition,
      identityQuat,
      instanceScale
    );
    front_title_flourishes.setMatrixAt(i, instanceMatrix);
  }
  front_title_flourishes.instanceMatrix.needsUpdate = true;
  root.add(front_title_flourishes);

  function createFrontCurve(parent, coordinates, radius, material) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      points.push(
        new THREE.Vector3(
          coordinates[i][0],
          coordinates[i][1],
          coordinates[i][2]
        )
      );
    }
    const geometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      Math.max(8, coordinates.length * 3),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    parent.add(mesh);
    return mesh;
  }

  function createFrontDisc(
    parent,
    x,
    y,
    z,
    radius,
    sx,
    sy,
    material
  ) {
    const disc = new THREE.Mesh(
      new THREE.CircleGeometry(radius, 14),
      material
    );
    disc.position.set(x, y, z);
    disc.scale.set(sx, sy, 1);
    parent.add(disc);
    return disc;
  }

  const front_corner_ornaments = new THREE.Group();
  root.add(front_corner_ornaments);

  function addFrontCorner(parent, sx, sy) {
    const x0 = 0.045 + sx * 0.49;
    const y0 = sy * 0.72;
    createFrontCurve(
      parent,
      [
        [x0, y0, 0.181],
        [x0 - sx * 0.055, y0 - sy * 0.015, 0.181],
        [x0 - sx * 0.11, y0 - sy * 0.065, 0.181],
        [x0 - sx * 0.15, y0 - sy * 0.13, 0.181]
      ],
      0.003,
      goldMat
    );
    createFrontCurve(
      parent,
      [
        [x0 - sx * 0.02, y0 - sy * 0.035, 0.181],
        [x0 - sx * 0.035, y0 - sy * 0.10, 0.181],
        [x0 - sx * 0.08, y0 - sy * 0.17, 0.181]
      ],
      0.0025,
      goldMat
    );
    createFrontCurve(
      parent,
      [
        [x0 - sx * 0.065, y0 - sy * 0.04, 0.181],
        [x0 - sx * 0.12, y0 - sy * 0.025, 0.181],
        [x0 - sx * 0.18, y0 - sy * 0.055, 0.181]
      ],
      0.0025,
      goldMat
    );
    createFrontDisc(
      parent,
      x0 - sx * 0.052,
      y0 - sy * 0.072,
      0.182,
      0.013,
      0.55,
      1.3,
      goldMat
    );
    createFrontDisc(
      parent,
      x0 - sx * 0.10,
      y0 - sy * 0.035,
      0.182,
      0.012,
      0.55,
      1.25,
      goldMat
    );
    createFrontDisc(
      parent,
      x0 - sx * 0.075,
      y0 - sy * 0.145,
      0.182,
      0.011,
      0.5,
      1.2,
      goldMat
    );
  }

  addFrontCorner(front_corner_ornaments, -1, 1);
  addFrontCorner(front_corner_ornaments, 1, 1);
  addFrontCorner(front_corner_ornaments, -1, -1);
  addFrontCorner(front_corner_ornaments, 1, -1);

  const front_handwriting = new THREE.Group();
  root.add(front_handwriting);

  for (let i = 0; i < 10; i++) {
    const y = 0.005 - i * 0.071;
    const x0 = -0.275 + (i % 3) * 0.025;
    const length = 0.50 + (i % 4) * 0.045;
    const points = [];

    for (let j = 0; j <= 12; j++) {
      const t = j / 12;
      points.push(
        new THREE.Vector3(
          x0 + length * t,
          y +
            Math.sin(t * Math.PI * 4 + i * 0.63) * 0.010 +
            Math.sin(t * Math.PI * 9 + i * 0.37) * 0.004,
          0.181
        )
      );
    }

    const handwritingGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      30,
      0.0021,
      5,
      false
    );
    const handwriting = new THREE.Mesh(handwritingGeom, inkMat);
    front_handwriting.add(handwriting);
  }

  const front_ink_dotsGeom = new THREE.CircleGeometry(0.0045, 8);
  const front_ink_dots = new THREE.InstancedMesh(
    front_ink_dotsGeom,
    inkMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    instancePosition.set(
      -0.19 + col * 0.075 + row * 0.012,
      -0.025 - row * 0.145 + Math.sin(i * 1.7) * 0.012,
      0.183
    );
    instanceScale.set(1, 0.75, 1);
    instanceMatrix.compose(
      instancePosition,
      identityQuat,
      instanceScale
    );
    front_ink_dots.setMatrixAt(i, instanceMatrix);
  }
  front_ink_dots.instanceMatrix.needsUpdate = true;
  root.add(front_ink_dots);

  const front_signature = new THREE.Group();
  root.add(front_signature);
  createFrontCurve(
    front_signature,
    [
      [-0.08, -0.665, 0.182],
      [-0.02, -0.645, 0.182],
      [0.04, -0.68, 0.182],
      [0.11, -0.65, 0.182],
      [0.18, -0.675, 0.182],
      [0.25, -0.65, 0.182]
    ],
    0.003,
    inkMat
  );
  createFrontCurve(
    front_signature,
    [
      [0.02, -0.68, 0.182],
      [0.08, -0.71, 0.182],
      [0.15, -0.69, 0.182],
      [0.22, -0.72, 0.182]
    ],
    0.002,
    inkMat
  );

  const front_wear_marksGeom = new THREE.CircleGeometry(0.008, 8);
  const front_wear_marks = new THREE.InstancedMesh(
    front_wear_marksGeom,
    wearMat,
    20
  );
  for (let i = 0; i < 20; i++) {
    const x = -0.43 + ((i * 7) % 19) / 18 * 0.91;
    const y = -0.72 + ((i * 11) % 23) / 22 * 1.44;
    const s = 0.35 + (i % 5) * 0.13;
    instancePosition.set(x, y, 0.184);
    instanceScale.set(s * 1.5, s * 0.45, 1);
    instanceMatrix.compose(
      instancePosition,
      identityQuat,
      instanceScale
    );
    front_wear_marks.setMatrixAt(i, instanceMatrix);
  }
  front_wear_marks.instanceMatrix.needsUpdate = true;
  root.add(front_wear_marks);

  const front_corner_wearGeom = new THREE.CircleGeometry(0.035, 10);
  const front_corner_wear = new THREE.InstancedMesh(
    front_corner_wearGeom,
    wearMat,
    4
  );
  const cornerWear = [
    [-0.48, 0.79, 1.0, 0.45],
    [0.54, 0.79, 1.0, 0.45],
    [-0.48, -0.79, 1.0, 0.45],
    [0.54, -0.79, 1.0, 0.45]
  ];
  for (let i = 0; i < cornerWear.length; i++) {
    instancePosition.set(
      cornerWear[i][0],
      cornerWear[i][1],
      0.184
    );
    instanceScale.set(
      cornerWear[i][2],
      cornerWear[i][3],
      1
    );
    instanceMatrix.compose(
      instancePosition,
      identityQuat,
      instanceScale
    );
    front_corner_wear.setMatrixAt(i, instanceMatrix);
  }
  front_corner_wear.instanceMatrix.needsUpdate = true;
  root.add(front_corner_wear);

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