export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_book";

  const coverW = 1.18;
  const coverD = 1.46;
  const coverT = 0.055;
  const pageW = 1.01;
  const pageD = 1.31;
  const pageH = 0.35;
  const pageX = 0.035;
  const pageY = 0.22;
  const topCoverY = 0.438;
  const topSurfaceY = 0.478;

  const top_coverMat = new THREE.MeshStandardMaterial({
    color: 0x252622,
    metalness: 0.0,
    roughness: 0.7
  });
  const bottom_coverMat = top_coverMat;
  const spineMat = new THREE.MeshStandardMaterial({
    color: 0x30231d,
    metalness: 0.0,
    roughness: 0.7
  });
  const worn_leatherMat = new THREE.MeshStandardMaterial({
    color: 0x8b542f,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_leatherMat = new THREE.MeshStandardMaterial({
    color: 0x171815,
    metalness: 0.0,
    roughness: 0.7
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xb49362,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xc2a36e,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0x695039,
    metalness: 0.0,
    roughness: 0.95
  });
  const page_fleckMat = new THREE.MeshStandardMaterial({
    color: 0x786047,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const crackMat = new THREE.MeshStandardMaterial({
    color: 0x76442a,
    metalness: 0.0,
    roughness: 0.9
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0xa17a4d,
    metalness: 0.0,
    roughness: 0.9
  });
  const giltMat = new THREE.MeshStandardMaterial({
    color: 0xa97832,
    metalness: 0.15,
    roughness: 0.65
  });

  function createRoundedRectGeometry(width, depth, thickness, radius, bevel) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -thickness / 2);
    return geometry;
  }

  function createRoundedLoopGeometry(width, depth, radius, tubeRadius) {
    const points = [];
    const centers = [
      [width / 2 - radius, depth / 2 - radius],
      [-width / 2 + radius, depth / 2 - radius],
      [-width / 2 + radius, -depth / 2 + radius],
      [width / 2 - radius, -depth / 2 + radius]
    ];

    for (let corner = 0; corner < 4; corner++) {
      for (let step = 0; step <= 4; step++) {
        const angle = corner * Math.PI / 2 + step * Math.PI / 8;
        points.push(new THREE.Vector3(
          centers[corner][0] + Math.cos(angle) * radius,
          0,
          centers[corner][1] + Math.sin(angle) * radius
        ));
      }
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 72, tubeRadius, 6, true);
  }

  function createSurfaceTube(points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 5),
      radius,
      6,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  const page_blockGeom = createRoundedRectGeometry(
    pageW,
    pageD,
    pageH,
    0.045,
    0.012
  );
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.rotation.x = Math.PI / 2;
  page_block.position.set(pageX, pageY, 0);
  root.add(page_block);

  const page_fore_edgeGeom = new THREE.BoxGeometry(pageW - 0.06, 0.32, 0.014);
  const page_fore_edge = new THREE.Mesh(page_fore_edgeGeom, page_edgeMat);
  page_fore_edge.name = "page_fore_edge";
  page_fore_edge.position.set(pageX, pageY, pageD / 2 + 0.006);
  root.add(page_fore_edge);

  const page_side_edgeGeom = new THREE.BoxGeometry(0.014, 0.32, pageD - 0.08);
  const page_side_edge = new THREE.Mesh(page_side_edgeGeom, page_edgeMat);
  page_side_edge.name = "page_side_edge";
  page_side_edge.position.set(pageX + pageW / 2 + 0.006, pageY, 0);
  root.add(page_side_edge);

  const page_layerGeom = new THREE.BoxGeometry(1, 1, 1);
  const pageLayerCount = 28;
  const page_layers = new THREE.InstancedMesh(
    page_layerGeom,
    page_lineMat,
    pageLayerCount * 2
  );
  page_layers.name = "page_layers";
  const pageLayerDummy = new THREE.Object3D();
  let pageLayerIndex = 0;

  for (let i = 0; i < pageLayerCount; i++) {
    const y = pageY - pageH / 2 + 0.012 + i * (pageH - 0.024) / (pageLayerCount - 1);
    const shift = Math.sin(i * 1.73) * 0.004;
    const foreWidth = pageW - 0.075 - (i % 4) * 0.008;

    pageLayerDummy.position.set(
      pageX + shift,
      y,
      pageD / 2 + 0.014
    );
    pageLayerDummy.rotation.set(0, 0, 0);
    pageLayerDummy.scale.set(foreWidth, 0.0022, 0.006);
    pageLayerDummy.updateMatrix();
    page_layers.setMatrixAt(pageLayerIndex++, pageLayerDummy.matrix);

    const sideDepth = pageD - 0.10 - (i % 5) * 0.012;
    pageLayerDummy.position.set(
      pageX + pageW / 2 + 0.014,
      y,
      shift
    );
    pageLayerDummy.scale.set(0.006, 0.0022, sideDepth);
    pageLayerDummy.updateMatrix();
    page_layers.setMatrixAt(pageLayerIndex++, pageLayerDummy.matrix);
  }
  page_layers.instanceMatrix.needsUpdate = true;
  root.add(page_layers);

  const page_fleckGeom = new THREE.CircleGeometry(1, 8);
  const pageFleckCount = 18;
  const page_flecks = new THREE.InstancedMesh(
    page_fleckGeom,
    page_fleckMat,
    pageFleckCount
  );
  page_flecks.name = "page_flecks";
  const pageFleckDummy = new THREE.Object3D();

  for (let i = 0; i < pageFleckCount; i++) {
    if (i < 11) {
      const x = pageX - pageW * 0.42 + (i + 0.5) / 11 * pageW * 0.84;
      const y = pageY - 0.13 + ((i * 7) % 11) / 10 * 0.26;
      pageFleckDummy.position.set(x, y, pageD / 2 + 0.021);
      pageFleckDummy.rotation.set(0, 0, i * 0.37);
      pageFleckDummy.scale.set(
        0.004 + (i % 3) * 0.003,
        0.003 + (i % 2) * 0.004,
        1
      );
    } else {
      const j = i - 11;
      const z = -pageD * 0.4 + (j + 0.5) / 8 * pageD * 0.8;
      const y = pageY - 0.12 + ((j * 5) % 8) / 7 * 0.24;
      pageFleckDummy.position.set(pageX + pageW / 2 + 0.021, y, z);
      pageFleckDummy.rotation.set(0, Math.PI / 2, j * 0.41);
      pageFleckDummy.scale.set(
        0.004 + (j % 3) * 0.003,
        0.003 + (j % 2) * 0.004,
        1
      );
    }
    pageFleckDummy.updateMatrix();
    page_flecks.setMatrixAt(i, pageFleckDummy.matrix);
  }
  page_flecks.instanceMatrix.needsUpdate = true;
  root.add(page_flecks);

  const top_coverGeom = createRoundedRectGeometry(
    coverW,
    coverD,
    coverT,
    0.075,
    0.009
  );
  const top_cover = new THREE.Mesh(top_coverGeom, top_coverMat);
  top_cover.name = "top_cover";
  top_cover.rotation.x = Math.PI / 2;
  top_cover.position.set(0, topCoverY, 0);
  root.add(top_cover);

  const bottom_coverGeom = top_coverGeom;
  const bottom_cover = new THREE.Mesh(bottom_coverGeom, bottom_coverMat);
  bottom_cover.name = "bottom_cover";
  bottom_cover.rotation.x = Math.PI / 2;
  bottom_cover.position.set(0.012, -0.005, 0.012);
  root.add(bottom_cover);

  const spineGeom = new THREE.CylinderGeometry(0.225, 0.225, 1.38, 32, 1, false);
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.name = "spine";
  spine.rotation.x = Math.PI / 2;
  spine.scale.set(0.64, 1, 1.12);
  spine.position.set(-0.55, 0.22, 0);
  root.add(spine);

  const spine_bandGeom = new THREE.TorusGeometry(0.225, 0.017, 8, 28);
  const spine_raised_bands = new THREE.InstancedMesh(
    spine_bandGeom,
    worn_leatherMat,
    4
  );
  spine_raised_bands.name = "spine_raised_bands";
  const spineBandDummy = new THREE.Object3D();
  const spineBandPositions = [-0.55, -0.28, 0.28, 0.55];

  for (let i = 0; i < spineBandPositions.length; i++) {
    spineBandDummy.position.set(-0.55, 0.22, spineBandPositions[i]);
    spineBandDummy.rotation.set(0, 0, 0);
    spineBandDummy.scale.set(0.64, 1.12, 1);
    spineBandDummy.updateMatrix();
    spine_raised_bands.setMatrixAt(i, spineBandDummy.matrix);
  }
  spine_raised_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_raised_bands);

  const spine_end_bands = new THREE.InstancedMesh(
    spine_bandGeom,
    worn_leatherMat,
    2
  );
  spine_end_bands.name = "spine_end_bands";

  for (let i = 0; i < 2; i++) {
    spineBandDummy.position.set(-0.55, 0.22, i === 0 ? -0.685 : 0.685);
    spineBandDummy.rotation.set(0, 0, 0);
    spineBandDummy.scale.set(0.65, 1.13, 1.15);
    spineBandDummy.updateMatrix();
    spine_end_bands.setMatrixAt(i, spineBandDummy.matrix);
  }
  spine_end_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_end_bands);

  const spine_title_panelGeom = new THREE.BoxGeometry(0.008, 0.15, 0.36);
  const spine_title_panel = new THREE.Mesh(spine_title_panelGeom, dark_leatherMat);
  spine_title_panel.name = "spine_title_panel";
  spine_title_panel.position.set(-0.698, 0.22, 0);
  root.add(spine_title_panel);

  const spine_borderGeom = new THREE.BoxGeometry(1, 1, 1);
  const spine_title_border = new THREE.InstancedMesh(
    spine_borderGeom,
    giltMat,
    4
  );
  spine_title_border.name = "spine_title_border";
  const spineBorderDummy = new THREE.Object3D();
  const spineBorderData = [
    [0.135, 0.39],
    [0.305, 0.39],
    [0.22, 0.018],
    [0.22, 0.018]
  ];

  for (let i = 0; i < 4; i++) {
    spineBorderDummy.position.set(-0.704, spineBorderData[i][0], 0);
    spineBorderDummy.rotation.set(0, 0, 0);
    if (i < 2) {
      spineBorderDummy.scale.set(0.008, 0.008, spineBorderData[i][1]);
    } else {
      spineBorderDummy.scale.set(0.008, spineBorderData[i][1], 0.008);
    }
    spineBorderDummy.updateMatrix();
    spine_title_border.setMatrixAt(i, spineBorderDummy.matrix);
  }
  spine_title_border.instanceMatrix.needsUpdate = true;
  root.add(spine_title_border);

  const spine_medallionGeom = new THREE.TorusGeometry(0.055, 0.006, 6, 20);
  const spine_title_medallion = new THREE.Mesh(spine_medallionGeom, giltMat);
  spine_title_medallion.name = "spine_title_medallion";
  spine_title_medallion.rotation.napY = Math.PI / 2;
  spine_title_medallion.scale.set(0.72, 1, 1);
  spine_title_medallion.position.set(-0.707, 0.22, 0);
  root.add(spine_title_medallion);

  const spine_title_marks = new THREE.InstancedMesh(spine_borderGeom, giltMat, 3);
  spine_title_marks.name = "spine_title_marks";
  for (let i = 0; i < 3; i++) {
    spineBorderDummy.position.set(-0.711, 0.19 + i * 0.03, 0);
    spineBorderDummy.scale.set(0.006, 0.008, 0.12 - Math.abs(i - 1) * 0.025);
    spineBorderDummy.updateMatrix();
    spine_title_marks.setMatrixAt(i, spineBorderDummy.matrix);
  }
  spine_title_marks.instanceMatrix.needsUpdate = true;
  root.add(spine_title_marks);

  const top_cover_rimGeom = createRoundedLoopGeometry(
    coverW - 0.025,
    coverD - 0.025,
    0.075,
    0.011
  );
  const top_cover_rim = new THREE.Mesh(top_cover_rimGeom, worn_leatherMat);
  top_cover_rim.name = "top_cover_rim";
  top_cover_rim.position.set(0, topSurfaceY, 0);
  root.add(top_cover_rim);

  const bottom_cover_rimGeom = createRoundedLoopGeometry(
    coverW - 0.025,
    coverD - 0.025,
    0.075,
    0.011
  );
  const bottom_cover_rim = new THREE.Mesh(bottom_cover_rimGeom, worn_leatherMat);
  bottom_cover_rim.name = "bottom_cover_rim";
  bottom_cover_rim.position.set(0.012, 0.034, 0.012);
  root.add(bottom_cover_rim);

  const top_hingeGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.34, 10);
  const top_hinge = new THREE.Mesh(top_hingeGeom, worn_leatherMat);
  top_hinge.name = "top_hinge";
  top_hinge.rotation.x = Math.PI / 2;
  top_hinge.position.set(-0.49, topSurfaceY, 0);
  root.add(top_hinge);

  const bottom_hingeGeom = top_hingeGeom;
  const bottom_hinge = new THREE.Mesh(bottom_hingeGeom, worn_leatherMat);
  bottom_hinge.name = "bottom_hinge";
  bottom_hinge.rotation.x = Math.PI / 2;
  bottom_hinge.position.set(-0.48, 0.034, 0.012);
  root.add(bottom_hinge);

  const top_spine_stripGeom = new THREE.BoxGeometry(0.15, 0.012, coverD - 0.08);
  const top_spine_strip = new THREE.Mesh(top_spine_stripGeom, spineMat);
  top_spine_strip.name = "top_spine_strip";
  top_spine_strip.position.set(-0.515, topSurfaceY, 0);
  root.add(top_spine_strip);

  const top_spine_seamGeom = new THREE.CylinderGeometry(0.008, 0.008, 1.34, 8);
  const top_spine_seam = new THREE.Mesh(top_spine_seamGeom, worn_leatherMat);
  top_spine_seam.name = "top_spine_seam";
  top_spine_seam.rotation.x = Math.PI / 2;
  top_spine_seam.position.set(-0.445, topSurfaceY + 0.004, 0);
  root.add(top_spine_seam);

  const worn_patchShape = new THREE.Shape();
  worn_patchShape.moveTo(-0.52, -0.12);
  worn_patchShape.lineTo(-0.34, -0.28);
  worn_patchShape.lineTo(-0.08, -0.21);
  worn_patchShape.lineTo(0.12, -0.32);
  worn_patchShape.lineTo(0.38, -0.18);
  worn_patchShape.lineTo(0.53, 0.02);
  worn_patchShape.lineTo(0.31, 0.24);
  worn_patchShape.lineTo(0.02, 0.18);
  worn_patchShape.lineTo(-0.24, 0.31);
  worn_patchShape.lineTo(-0.48, 0.14);
  worn_patchShape.closePath();

  const worn_patchGeom = new THREE.ShapeGeometry(worn_patchShape, 4);
  const top_worn_patches = new THREE.InstancedMesh(
    worn_patchGeom,
    worn_leatherMat,
    10
  );
  top_worn_patches.name = "top_worn_patches";
  const patchDummy = new THREE.Object3D();
  const patchData = [
    [-0.48, -0.62, 0.13, 0.055, -0.25],
    [-0.18, -0.65, 0.10, 0.038, 0.20],
    [0.31, -0.64, 0.12, 0.045, -0.10],
    [0.52, -0.42, 0.075, 0.12, 0.25],
    [0.53, 0.18, 0.06, 0.11, -0.15],
    [0.47, 0.61, 0.13, 0.06, 0.20],
    [0.08, 0.65, 0.11, 0.04, -0.20],
    [-0.39, 0.61, 0.10, 0.05, 0.15],
    [-0.53, -0.10, 0.055, 0.13, -0.10],
    [-0.34, 0.28, 0.075, 0.04, 0.35]
  ];

  for (let i = 0; i < patchData.length; i++) {
    const data = patchData[i];
    patchDummy.position.set(data[0], topSurfaceY + 0.003, data[1]);
    patchDummy.rotation.set(-Math.PI / 2, 0, data[4]);
    patchDummy.scale.set(data[2], data[3], 1);
    patchDummy.updateMatrix();
    top_worn_patches.setMatrixAt(i, patchDummy.matrix);
  }
  top_worn_patches.instanceMatrix.needsUpdate = true;
  root.add(top_worn_patches);

  const top_scuffGeom = new THREE.CircleGeometry(1, 14);
  const top_scuffs = new THREE.InstancedMesh(top_scuffGeom, scratchMat, 15);
  top_scuffs.name = "top_scuffs";
  const scuffDummy = new THREE.Object3D();

  for (let i = 0; i < 15; i++) {
    const x = -0.43 + ((i * 37) % 101) / 100 * 0.86;
    const z = -0.57 + ((i * 53 + 17) % 103) / 102 * 1.14;
    const sx = 0.008 + (i % 4) * 0.006;
    const sy = 0.004 + (i % 3) * 0.005;
    scuffDummy.position.set(x, topSurfaceY + 0.004, z);
    scuffDummy.rotation.set(-Math.PI / 2, 0, i * 0.47);
    scuffDummy.scale.set(sx, sy, 1);
    scuffDummy.updateMatrix();
    top_scuffs.setMatrixAt(i, scuffDummy.matrix);
  }
  top_scuffs.instanceMatrix.needsUpdate = true;
  root.add(top_scuffs);

  const top_cracks = new THREE.Group();
  top_cracks.name = "top_cracks";
  const crackY = topSurfaceY + 0.006;
  const crackPaths = [
    [
      new THREE.Vector3(-0.50, crackY, 0.57),
      new THREE.Vector3(-0.38, crackY, 0.45),
      new THREE.Vector3(-0.28, crackY, 0.28),
      new THREE.Vector3(-0.13, crackY, 0.16),
      new THREE.Vector3(-0.03, crackY, -0.02)
    ],
    [
      new THREE.Vector3(-0.28, crackY, 0.28),
      new THREE.Vector3(-0.22, crackY, 0.42),
      new THREE.Vector3(-0.12, crackY, 0.52)
    ],
    [
      new THREE.Vector3(0.52, crackY, -0.56),
      new THREE.Vector3(0.40, crackY, -0.42),
      new THREE.Vector3(0.28, crackY, -0.28),
      new THREE.Vector3(0.17, crackY, -0.08),
      new THREE.Vector3(0.08, crackY, 0.10)
    ],
    [
      new THREE.Vector3(0.28, crackY, -0.28),
      new THREE.Vector3(0.42, crackY, -0.20),
      new THREE.Vector3(0.51, crackY, -0.08)
    ],
    [
      new THREE.Vector3(-0.48, crackY, -0.50),
      new THREE.Vector3(-0.31, crackY, -0.39),
      new THREE.Vector3(-0.19, crackY, -0.20),
      new THREE.Vector3(-0.08, crackY, -0.08)
    ],
    [
      new THREE.Vector3(0.08, crackY, 0.10),
      new THREE.Vector3(0.02, crackY, 0.27),
      new THREE.Vector3(0.11, crackY, 0.43),
      new THREE.Vector3(0.08, crackY, 0.61)
    ],
    [
      new THREE.Vector3(-0.49, crackY, 0.08),
      new THREE.Vector3(-0.31, crackY, 0.03),
      new THREE.Vector3(-0.18, crackY, -0.10),
      new THREE.Vector3(-0.08, crackY, -0.08)
    ],
    [
      new THREE.Vector3(0.48, crackY, 0.57),
      new THREE.Vector3(0.38, crackY, 0.43),
      new THREE.Vector3(0.25, crackY, 0.36),
      new THREE.Vector3(0.16, crackY, 0.20)
    ]
  ];

  for (let i = 0; i < crackPaths.length; i++) {
    const crack = createSurfaceTube(
      crackPaths[i],
      i === 0 || i === 5 ? 0.005 : 0.0035,
      crackMat
    );
    crack.name = "top_crack_" + i;
    top_cracks.add(crack);
  }
  root.add(top_cracks);

  const top_scratches = new THREE.Group();
  top_scratches.name = "top_scratches";
  const scratchPaths = [
    [
      new THREE.Vector3(-0.34, crackY + 0.001, -0.48),
      new THREE.Vector3(-0.20, crackY + 0.001, -0.35),
      new THREE.Vector3(-0.08, crackY + 0.001, -0.18)
    ],
    [
      new THREE.Vector3(0.27, crackY + 0.001, 0.49),
      new THREE.Vector3(0.17, crackY + 0.001, 0.37),
      new THREE.Vector3(0.04, crackY + 0.001, 0.30)
    ],
    [
      new THREE.Vector3(0.39, crackY + 0.001, -0.52),
      new THREE.Vector3(0.43, crackY + 0.001, -0.35),
      new THREE.Vector3(0.49, crackY + 0.001, -0.21)
    ],
    [
      new THREE.Vector3(-0.43, crackY + 0.001, 0.18),
      new THREE.Vector3(-0.29, crackY + 0.001, 0.13),
      new THREE.Vector3(-0.16, crackY + 0.001, 0.15)
    ]
  ];

  for (let i = 0; i < scratchPaths.length; i++) {
    const scratch = createSurfaceTube(scratchPaths[i], 0.0022, scratchMat);
    scratch.name = "top_scratch_" + i;
    top_scratches.add(scratch);
  }
  root.add(top_scratches);

  const frayed_threadGeom = new THREE.CylinderGeometry(0.0022, 0.0015, 1, 5);
  const frayed_threads = new THREE.InstancedMesh(
    frayed_threadGeom,
    worn_leatherMat,
    24
  )
  frayed_threads.name = "frayed_threads";
  const threadDummy = new THREE.Object3D();
  const upVector = new THREE.Vector3(0, 1, 0);
  let threadIndex = 0;

  function setThread(start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    threadDummy.position.copy(start).add(end).multiplyScalar(0.5);
    threadDummy.quaternion.setFromUnitVectors(upVector, direction.normalize());
    threadDummy.scale.set(1, length, 1);
    threadDummy.updateMatrix();
    frayed_threads.setMatrixAt(threadIndex++, threadDummy.matrix);
  }

  for (let i = 0; i < 6; i++) {
    const x = -0.46 + i * 0.185;
    setThread(
      new THREE.Vector3(x, topSurfaceY, coverD / 2 - 0.01),
      new THREE.Vector3(
        x + Math.sin(i * 1.4) * 0.025,
        topSurfaceY - 0.008,
        coverD / 2 + 0.025 + (i % 2) * 0.012
      )
    );
  }

  for (let i = 0; i < 6; i++) {
    const z = -0.58 + i * 0.23;
    setThread(
      new THREE.Vector3(coverW / 2 - 0.01, topSurfaceY, z),
      new THREE.Vector3(
        coverW / 2 + 0.025 + (i % 2) * 0.012,
        topSurfaceY - 0.007,
        z + Math.sin(i * 1.8) * 0.025
      )
    );
  }

  for (let i = 0; i < 6; i++) {
    const x = -0.45 + i * 0.18;
    setThread(
      new THREE.Vector3(x, 0.026, 0.012 - coverD / 2 + 0.01),
      new THREE.Vector3(
        x + Math.sin(i * 1.2) * 0.022,
        0.017,
        0.012 - coverD / 2 - 0.024 - (i % 2) * 0.01
      )
    );
  }

  for (let i = 0; i < 6; i++) {
    const z = -0.57 + i * 0.23;
    setThread(
      new THREE.Vector3(0.012 + coverW / 2 - 0.01, 0.026, z),
      new THREE.Vector3(
        0.012 + coverW / 2 + 0.025 + (i % 2) * 0.01,
        0.016,
        z + Math.sin(i * 1.5) * 0.022
      )
    );
  }

  frayed_threads.instanceMatrix.needsUpdate = true;
  root.add(frayed_threads);

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