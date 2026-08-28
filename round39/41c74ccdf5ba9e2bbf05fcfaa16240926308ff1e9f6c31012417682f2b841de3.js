export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x765235,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3b291d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const redPaintMat = new THREE.MeshStandardMaterial({
    color: 0xb6403f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkRedMat = new THREE.MeshStandardMaterial({
    color: 0x642b2b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const exposedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const knobMetalMat = new THREE.MeshStandardMaterial({
    color: 0x666a6b,
    metalness: 0.6,
    roughness: 0.5,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa98752,
    metalness: 0.5,
    roughness: 0.35,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xb7b19a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const yellowPaperMat = new THREE.MeshStandardMaterial({
    color: 0xc4a94d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x393835,
    metalness: 0.0,
    roughness: 0.8,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x55534d,
    metalness: 0.0,
    roughness: 0.8,
  });

  const dummy = new THREE.Object3D();

  const body_coreGeom = new THREE.BoxGeometry(1.18, 0.84, 0.98);
  const body_core = new THREE.Mesh(body_coreGeom, darkWoodMat);
  body_core.position.set(0, 0.57, 0);
  root.add(body_core);

  const corner_postsGeom = new THREE.BoxGeometry(0.105, 0.86, 0.105);
  const corner_posts = new THREE.InstancedMesh(corner_postsGeom, woodMat, 4);
  const cornerPositions = [
    [-0.575, 0.57, 0.48],
    [0.575, 0.57, 0.48],
    [-0.575, 0.57, -0.48],
    [0.575, 0.57, -0.48],
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    corner_posts.setMatrixAt(i, dummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const corner_post_roundingGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.82, 12);
  const corner_post_rounding = new THREE.InstancedMesh(
    corner_post_roundingGeom,
    woodMat,
    4
  );
  const roundingPositions = [
    [-0.615, 0.57, 0.52],
    [0.615, 0.57, 0.52],
    [-0.615, 0.57, -0.52],
    [0.615, 0.57, -0.52],
  ];
  for (let i = 0; i < roundingPositions.length; i++) {
    const p = roundingPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    corner_post_rounding.setMatrixAt(i, dummy.matrix);
  }
  corner_post_rounding.instanceMatrix.needsUpdate = true;
  root.add(corner_post_rounding);

  const front_back_horizontal_railsGeom = new THREE.BoxGeometry(1.18, 0.1, 0.1);
  const front_back_horizontal_rails = new THREE.InstancedMesh(
    front_back_horizontal_railsGeom,
    woodMat,
    4
  );
  const frontBackRailPositions = [
    [0, 0.14, 0.525],
    [0, 1.0, 0.525],
    [0, 0.14, -0.525],
    [0, 1.0, -0.525],
  ];
  for (let i = 0; i < frontBackRailPositions.length; i++) {
    const p = frontBackRailPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_back_horizontal_rails.setMatrixAt(i, dummy.matrix);
  }
  front_back_horizontal_rails.instanceMatrix.needsUpdate = true;
  root.add(front_back_horizontal_rails);

  const side_horizontal_railsGeom = new THREE.BoxGeometry(0.1, 0.1, 0.95);
  const side_horizontal_rails = new THREE.InstancedMesh(
    side_horizontal_railsGeom,
    woodMat,
    4
  );
  const sideRailPositions = [
    [-0.625, 0.14, 0],
    [-0.625, 1.0, 0],
    [0.625, 0.14, 0],
    [0.625, 1.0, 0],
  ];
  for (let i = 0; i < sideRailPositions.length; i++) {
    const p = sideRailPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_horizontal_rails.setMatrixAt(i, dummy.matrix);
  }
  side_horizontal_rails.instanceMatrix.needsUpdate = true;
  root.add(side_horizontal_rails);

  const rail_edge_trimGeom = new THREE.BoxGeometry(1.18, 0.014, 0.014);
  const rail_edge_trim = new THREE.InstancedMesh(rail_edge_trimGeom, darkWoodMat, 6);
  const railTrimPositions = [
    [0, 0.105, 0.58],
    [0, 0.175, 0.58],
    [0, 0.965, 0.58],
    [0, 1.035, 0.58],
    [0, 0.105, -0.58],
    [0, 0.175, -0.58],
  ];
  for (let i = 0; i < railTrimPositions.length; i++) {
    const p = railTrimPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rail_edge_trim.setMatrixAt(i, dummy.matrix);
  }
  rail_edge_trim.instanceMatrix.needsUpdate = true;
  root.add(rail_edge_trim);

  const front_upper_panelGeom = new THREE.BoxGeometry(1.04, 0.58, 0.025);
  const front_upper_panel = new THREE.Mesh(front_upper_panelGeom, redPaintMat);
  front_upper_panel.position.set(0, 0.665, 0.522);
  root.add(front_upper_panel);

  const front_control_panelGeom = new THREE.BoxGeometry(1.04, 0.245, 0.025);
  const front_control_panel = new THREE.Mesh(front_control_panelGeom, redPaintMat);
  front_control_panel.position.set(0, 0.2925, 0.522);
  root.add(front_control_panel);

  const front_panel_seamGeom = new THREE.BoxGeometry(1.035, 0.012, 0.012);
  const front_panel_seam = new THREE.Mesh(front_panel_seamGeom, darkRedMat);
  front_panel_seam.position.set(0, 0.42, 0.541);
  root.add(front_panel_seam);

  const side_panelsGeom = new THREE.BoxGeometry(0.025, 0.76, 0.85);
  const side_panels = new THREE.InstancedMesh(side_panelsGeom, redPaintMat, 2);
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.602 : 0.602, 0.57, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_panels.setMatrixAt(i, dummy.matrix);
  }
  side_panels.instanceMatrix.needsUpdate = true;
  root.add(side_panels);

  const back_panelGeom = new THREE.BoxGeometry(1.04, 0.76, 0.025);
  const back_panel = new THREE.Mesh(back_panelGeom, redPaintMat);
  back_panel.position.set(0, 0.57, -0.522);
  root.add(back_panel);

  const top_panelGeom = new THREE.BoxGeometry(1.08, 0.025, 0.9);
  const top_panel = new THREE.Mesh(top_panelGeom, redPaintMat);
  top_panel.position.set(0, 1.055, 0);
  root.add(top_panel);

  const feetGeom = new THREE.CylinderGeometry(0.085, 0.095, 0.14, 20);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  const footPositions = [
    [-0.49, 0.02, 0.4],
    [0.49, 0.02, 0.4],
    [-0.49, 0.02, -0.4],
    [0.49, 0.02, -0.4],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    feet.setMatrixAt(i, dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const front_wood_grainGeom = new THREE.BoxGeometry(0.24, 0.006, 0.004);
  const front_wood_grain = new THREE.InstancedMesh(
    front_wood_grainGeom,
    darkWoodMat,
    16
  );
  for (let i = 0; i < 16; i++) {
    const railRow = i < 8 ? 0.14 : 1.0;
    const col = i % 8;
    dummy.position.set(
      -0.47 + col * 0.134,
      railRow + ((i * 3) % 5 - 2) * 0.012,
      0.579
    );
    dummy.rotation.set(0, 0, ((i % 5) - 2) * 0.018);
    dummy.scale.set(0.55 + ((i * 5) % 7) * 0.08, 1, 1);
    dummy.updateMatrix();
    front_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(front_wood_grain);

  const post_wood_grainGeom = new THREE.BoxGeometry(0.006, 0.18, 0.004);
  const post_wood_grain = new THREE.InstancedMesh(
    post_wood_grainGeom,
    darkWoodMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const side = i < 6 ? -1 : 1;
    const localIndex = i % 6;
    dummy.position.set(
      side * 0.575 + ((localIndex % 3) - 1) * 0.025,
      0.25 + localIndex * 0.13,
      0.541
    );
    dummy.rotation.set(0, 0, ((i % 5) - 2) * 0.025);
    dummy.scale.set(1, 0.55 + ((i * 3) % 5) * 0.11, 1);
    dummy.updateMatrix();
    post_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  post_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(post_wood_grain);

  const top_wood_grainGeom = new THREE.BoxGeometry(0.25, 0.004, 0.008);
  const top_wood_grain = new THREE.InstancedMesh(top_wood_grainGeom, darkWoodMat, 16);
  for (let i = 0; i < 16; i++) {
    const zSide = i < 8 ? -0.475 : 0.475;
    const col = i % 8;
    dummy.position.set(-0.47 + col * 0.134, 1.071, zSide);
    dummy.rotation.set(0, ((i % 5) - 2) * 0.025, 0);
    dummy.scale.set(0.55 + ((i * 4) % 7) * 0.08, 1, 1);
    dummy.updateMatrix();
    top_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(top_wood_grain);

  const side_wood_grainGeom = new THREE.BoxGeometry(0.004, 0.18, 0.008);
  const side_wood_grain = new THREE.InstancedMesh(
    side_wood_grainGeom,
    darkWoodMat,
    16
  );
  for (let i = 0; i < 16; i++) {
    const side = i < 8 ? -1 : 1;
    const col = i % 8;
    dummy.position.set(
      side * 0.634,
      0.22 + ((col * 5) % 8) * 0.095,
      -0.4 + col * 0.114
    );
    dummy.rotation.set(((col % 5) - 2) * 0.025, 0, 0);
    dummy.scale.set(1, 0.55 + ((col * 3) % 6) * 0.1, 1);
    dummy.updateMatrix();
    side_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  side_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(side_wood_grain);

  const frontScratchData = [
    [-0.42, 0.84, 0.75, 0.15],
    [-0.3, 0.72, 0.42, -0.7],
    [-0.18, 0.91, 0.55, 0.05],
    [0.02, 0.79, 0.8, -0.35],
    [0.2, 0.88, 0.45, 0.8],
    [0.36, 0.68, 0.62, -0.2],
    [0.43, 0.51, 0.36, 0.45],
    [-0.39, 0.49, 0.5, -0.55],
    [-0.21, 0.57, 0.32, 0.25],
    [0.08, 0.54, 0.65, -0.1],
    [0.29, 0.96, 0.38, 0.65],
    [-0.46, 0.62, 0.28, -0.25],
    [0.15, 0.36, 0.5, 0.15],
    [0.34, 0.31, 0.35, -0.55],
    [-0.42, 0.25, 0.42, 0.4],
    [-0.12, 0.33, 0.3, -0.2],
    [0.02, 0.22, 0.55, 0.7],
    [0.43, 0.2, 0.32, -0.3],
  ];
  const front_scratchesGeom = new THREE.BoxGeometry(0.08, 0.006, 0.004);
  const front_scratches = new THREE.InstancedMesh(
    front_scratchesGeom,
    scratchMat,
    frontScratchData.length
  );
  for (let i = 0; i < frontScratchData.length; i++) {
    const p = frontScratchData[i];
    dummy.position.set(p[0], p[1], 0.538);
    dummy.rotation.set(0, 0, p[3]);
    dummy.scale.set(p[2], 1, 1);
    dummy.updateMatrix();
    front_scratches.setMatrixAt(i, dummy.matrix);
  }
  front_scratches.instanceMatrix.needsUpdate = true;
  root.add(front_scratches);

  const front_paint_chipsShape = new THREE.Shape();
  front_paint_chipsShape.moveTo(-0.5, -0.1);
  front_paint_chipsShape.lineTo(-0.28, -0.46);
  front_paint_chipsShape.lineTo(0.12, -0.38);
  front_paint_chipsShape.lineTo(0.48, -0.12);
  front_paint_chipsShape.lineTo(0.37, 0.3);
  front_paint_chipsShape.lineTo(-0.05, 0.5);
  front_paint_chipsShape.lineTo(-0.42, 0.26);
  front_paint_chipsShape.closePath();

  const front_paint_chipsGeom = new THREE.ShapeGeometry(front_paint_chipsShape);
  const front_paint_chips = new THREE.InstancedMesh(
    front_paint_chipsGeom,
    exposedMetalMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const p = frontScratchData[(i * 5) % frontScratchData.length];
    const size = 0.012 + ((i * 7) % 6) * 0.004;
    dummy.position.set(p[0] + 0.008, p[1] - 0.006, 0.541);
    dummy.rotation.set(0, 0, ((i * 3) % 9) * 0.31);
    dummy.scale.set(size * (0.8 + (i % 3) * 0.35), size * (0.55 + (i % 4) * 0.18), 1);
    dummy.updateMatrix();
    front_paint_chips.setMatrixAt(i, dummy.matrix);
  }
  front_paint_chips.instanceMatrix.needsUpdate = true;
  root.add(front_paint_chips);

  const topScratchData = [
    [-0.4, 0.27, 0.65, 0.2],
    [-0.29, -0.12, 0.42, -0.4],
    [-0.12, 0.34, 0.3, 0.55],
    [0.02, 0.18, 0.75, -0.15],
    [0.17, -0.28, 0.48, 0.7],
    [0.31, 0.29, 0.38, -0.5],
    [0.42, -0.08, 0.58, 0.1],
    [-0.44, -0.3, 0.32, -0.25],
    [0.08, -0.02, 0.25, 0.8],
    [0.37, 0.08, 0.28, -0.7],
  ];
  const top_scratchesGeom = new THREE.BoxGeometry(0.08, 0.004, 0.007);
  const top_scratches = new THREE.InstancedMesh(
    top_scratchesGeom,
    scratchMat,
    topScratchData.length
  );
  for (let i = 0; i < topScratchData.length; i++) {
    const p = topScratchData[i];
    dummy.position.set(p[0], 1.071, p[1]);
    dummy.rotation.set(0, p[3], 0);
    dummy.scale.set(p[2], 1, 1);
    dummy.updateMatrix();
    top_scratches.setMatrixAt(i, dummy.matrix);
  }
  top_scratches.instanceMatrix.needsUpdate = true;
  root.add(top_scratches);

  const top_paint_chips = new THREE.InstancedMesh(
    front_paint_chipsGeom,
    exposedMetalMat,
    10
  );
  for (let i = 0; i < 10; i++) {
    const p = topScratchData[(i * 3) % topScratchData.length];
    const size = 0.011 + ((i * 5) % 6) * 0.004;
    dummy.position.set(p[0], 1.074, p[1]);
    dummy.rotation.set(-Math.PI / 2, 0, ((i * 4) % 9) * 0.28);
    dummy.scale.set(size * (0.8 + (i % 4) * 0.25), size * (0.55 + (i % 3) * 0.2), 1);
    dummy.updateMatrix();
    top_paint_chips.setMatrixAt(i, dummy.matrix);
  }
  top_paint_chips.instanceMatrix.needsUpdate = true;
  root.add(top_paint_chips);

  const sideScratchData = [
    [0.31, 0.83, 0.55, 0.2],
    [0.18, 0.69, 0.35, -0.5],
    [0.02, 0.88, 0.7, 0.4],
    [-0.12, 0.62, 0.45, -0.2],
    [-0.28, 0.78, 0.32, 0.7],
    [-0.34, 0.43, 0.55, -0.45],
    [0.25, 0.35, 0.38, 0.1],
    [0.04, 0.28, 0.6, -0.3],
    [-0.2, 0.96, 0.28, 0.55],
    [0.34, 0.55, 0.3, -0.1],
  ];
  const side_scratchesGeom = new THREE.BoxGeometry(0.004, 0.006, 0.08);
  const side_scratches = new THREE.InstancedMesh(
    side_scratchesGeom,
    scratchMat,
    sideScratchData.length * 2
  );
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const side = sideIndex === 0 ? -1 : 1;
    for (let i = 0; i < sideScratchData.length; i++) {
      const p = sideScratchData[i];
      dummy.position.set(side * 0.618, p[1], p[0]);
      dummy.rotation.set(((i % 5) - 2) * 0.035, 0, 0);
      dummy.scale.set(1, 1, p[2]);
      dummy.updateMatrix();
      side_scratches.setMatrixAt(sideIndex * sideScratchData.length + i, dummy.matrix);
    }
  }
  side_scratches.instanceMatrix.needsUpdate = true;
  root.add(side_scratches);

  const side_paint_chips = new THREE.InstancedMesh(
    front_paint_chipsGeom,
    exposedMetalMat,
    20
  );
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const side = sideIndex === 0 ? -1 : 1;
    for (let i = 0; i < 10; i++) {
      const p = sideScratchData[(i * 3 + sideIndex) % sideScratchData.length];
      const size = 0.012 + ((i * 5 + sideIndex) % 6) * 0.004;
      dummy.position.set(side * 0.621, p[1], p[0]);
      dummy.rotation.set(0, side * Math.PI / 2, ((i * 4) % 8) * 0.3);
      dummy.scale.set(size * (0.75 + (i % 4) * 0.25), size * (0.6 + (i % 3) * 0.2), 1);
      dummy.updateMatrix();
      side_paint_chips.setMatrixAt(sideIndex * 10 + i, dummy.matrix);
    }
  }
  side_paint_chips.instanceMatrix.needsUpdate = true;
  root.add(side_paint_chips);

  const top_labelGeom = new THREE.BoxGeometry(0.36, 0.004, 0.13);
  const top_label = new THREE.Mesh(top_labelGeom, paperMat);
  top_label.position.set(-0.16, 1.074, -0.08);
  top_label.rotation.y = -0.08;
  root.add(top_label);

  const top_label_yellow_stripeGeom = new THREE.BoxGeometry(0.075, 0.003, 0.124);
  const top_label_yellow_stripe = new THREE.Mesh(
    top_label_yellow_stripeGeom,
    yellowPaperMat
  );
  top_label_yellow_stripe.position.set(-0.285, 1.077, -0.08);
  top_label_yellow_stripe.rotation.y = -0.08;
  root.add(top_label_yellow_stripe);

  const top_label_text_linesGeom = new THREE.BoxGeometry(0.18, 0.003, 0.006);
  const top_label_text_lines = new THREE.InstancedMesh(
    top_label_text_linesGeom,
    inkMat,
    4
  );
  for (let i = 0; i < 4; i++) {
    dummy.position.set(-0.12, 1.078, -0.115 + i * 0.022);
    dummy.rotation.set(0, -0.08, 0);
    dummy.scale.set(0.72 + i * 0.08, 1, 1);
    dummy.updateMatrix();
    top_label_text_lines.setMatrixAt(i, dummy.matrix);
  }
  top_label_text_lines.instanceMatrix.needsUpdate = true;
  root.add(top_label_text_lines);

  const top_mounting_washersGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.006, 16);
  const top_mounting_washers = new THREE.InstancedMesh(
    top_mounting_washersGeom,
    darkMetalMat,
    4
  );
  const top_mounting_screwsGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.012, 12);
  const top_mounting_screws = new THREE.InstancedMesh(
    top_mounting_screwsGeom,
    exposedMetalMat,
    4
  );
  const topScrewPositions = [
    [-0.43, -0.36],
    [0.43, -0.36],
    [-0.43, 0.36],
    [0.43, 0.36],
  ];
  for (let i = 0; i < topScrewPositions.length; i++) {
    const p = topScrewPositions[i];
    dummy.position.set(p[0], 1.073, p[1]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    top_mounting_washers.setMatrixAt(i, dummy.matrix);

    dummy.position.set(p[0], 1.079, p[1]);
    dummy.updateMatrix();
    top_mounting_screws.setMatrixAt(i, dummy.matrix);
  }
  top_mounting_washers.instanceMatrix.needsUpdate = true;
  top_mounting_screws.instanceMatrix.needsUpdate = true;
  root.add(top_mounting_washers, top_mounting_screws);

  const frontScrewPositions = [
    [-0.49, 0.88],
    [0.49, 0.88],
    [-0.49, 0.58],
    [0.49, 0.58],
    [-0.49, 0.36],
    [0.49, 0.36],
    [-0.49, 0.2],
    [0.49, 0.2],
  ];
  const front_panel_screwsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12);
  const front_panel_screws = new THREE.InstancedMesh(
    front_panel_screwsGeom,
    darkMetalMat,
    frontScrewPositions.length
  );
  const front_screw_slotsGeom = new THREE.BoxGeometry(0.018, 0.003, 0.003);
  const front_screw_slots = new THREE.InstancedMesh(
    front_screw_slotsGeom,
    scratchMat,
    frontScrewPositions.length
  );
  for (let i = 0; i < frontScrewPositions.length; i++) {
    const p = frontScrewPositions[i];
    dummy.position.set(p[0], p[1], 0.542);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_panel_screws.setMatrixAt(i, dummy.matrix);

    dummy.position.set(p[0], p[1], 0.549);
    dummy.rotation.set(0, 0, ((i % 4) - 1.5) * 0.25);
    dummy.updateMatrix();
    front_screw_slots.setMatrixAt(i, dummy.matrix);
  }
  front_panel_screws.instanceMatrix.needsUpdate = true;
  front_screw_slots.instanceMatrix.needsUpdate = true;
  root.add(front_panel_screws, front_screw_slots);

  const sideScrewPositions = [
    [0.39, 0.88],
    [-0.39, 0.88],
    [0.39, 0.58],
    [-0.39, 0.58],
    [0.39, 0.25],
    [-0.39, 0.25],
  ];
  const side_panel_screws = new THREE.InstancedMesh(
    front_panel_screwsGeom,
    darkMetalMat,
    sideScrewPositions.length * 2
  );
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const side = sideIndex === 0 ? -1 : 1;
    for (let i = 0; i < sideScrewPositions.length; i++) {
      const p = sideScrewPositions[i];
      dummy.position.set(side * 0.621, p[1], p[0]);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_panel_screws.setMatrixAt(sideIndex * sideScrewPositions.length + i, dummy.matrix);
    }
  }
  side_panel_screws.instanceMatrix.needsUpdate = true;
  root.add(side_panel_screws);

  const frameFastenerPositions = [
    [-0.575, 0.78],
    [-0.575, 0.42],
    [0.575, 0.78],
    [0.575, 0.42],
    [-0.38, 0.14],
    [0.38, 0.14],
    [-0.38, 1.0],
    [0.38, 1.0],
  ];
  const front_frame_fastenersGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.01, 10);
  const front_frame_fasteners = new THREE.InstancedMesh(
    front_frame_fastenersGeom,
    darkMetalMat,
    frameFastenerPositions.length
  );
  for (let i = 0; i < frameFastenerPositions.length; i++) {
    const p = frameFastenerPositions[i];
    dummy.position.set(p[0], p[1], 0.582);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_frame_fasteners.setMatrixAt(i, dummy.matrix);
  }
  front_frame_fasteners.instanceMatrix.needsUpdate = true;
  root.add(front_frame_fasteners);

  const front_left_knob_flangeGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.03, 24);
  const front_left_knob_flange = new THREE.Mesh(
    front_left_knob_flangeGeom,
    darkMetalMat
  );
  front_left_knob_flange.rotation.x = Math.PI / 2;
  front_left_knob_flange.position.set(-0.29, 0.285, 0.552);
  root.add(front_left_knob_flange);

  const front_left_knob_shaftGeom = new THREE.CylinderGeometry(0.061, 0.061, 0.08, 20);
  const front_left_knob_shaft = new THREE.Mesh(front_left_knob_shaftGeom, darkMetalMat);
  front_left_knob_shaft.rotation.x = Math.PI / 2;
  front_left_knob_shaft.position.set(-0.29, 0.285, 0.594);
  root.add(front_left_knob_shaft);

  const front_left_knob_capGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.02, 24);
  const front_left_knob_cap = new THREE.Mesh(front_left_knob_capGeom, brassMat);
  front_left_knob_cap.rotation.x = Math.PI / 2;
  front_left_knob_cap.position.set(-0.29, 0.285, 0.642);
  root.add(front_left_knob_cap);

  const front_right_knob_flangeGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.03, 24);
  const front_right_knob_flange = new THREE.Mesh(
    front_right_knob_flangeGeom,
    darkMetalMat
  );
  front_right_knob_flange.rotation.x = Math.PI / 2;
  front_right_knob_flange.position.set(0.35, 0.34, 0.552);
  root.add(front_right_knob_flange);

  const front_right_knob_shaftGeom = new THREE.CylinderGeometry(0.066, 0.066, 0.09, 20);
  const front_right_knob_shaft = new THREE.Mesh(
    front_right_knob_shaftGeom,
    darkMetalMat
  );
  front_right_knob_shaft.rotation.x = Math.PI / 2;
  front_right_knob_shaft.position.set(0.35, 0.34, 0.598);
  root.add(front_right_knob_shaft);

  const front_right_knob_capGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.022, 24);
  const front_right_knob_cap = new THREE.Mesh(
    front_right_knob_capGeom,
    knobMetalMat
  );
  front_right_knob_cap.rotation.x = Math.PI / 2;
  front_right_knob_cap.position.set(0.35, 0.34, 0.65);
  root.add(front_right_knob_cap);

  const front_indicator_bezelsGeom = new THREE.TorusGeometry(0.027, 0.006, 8, 18);
  const front_indicator_bezels = new THREE.InstancedMesh(
    front_indicator_bezelsGeom,
    darkMetalMat,
    2
  );
  const indicatorPositions = [
    [-0.02, 0.27],
    [0.16, 0.29],
  ];
  for (let i = 0; i < indicatorPositions.length; i++) {
    const p = indicatorPositions[i];
    dummy.position.set(p[0], p[1], 0.548);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_indicator_bezels.setMatrixAt(i, dummy.matrix);
  }
  front_indicator_bezels.instanceMatrix.needsUpdate = true;
  root.add(front_indicator_bezels);

  const front_indicator_buttonsGeom = new THREE.CylinderGeometry(0.021, 0.021, 0.018, 16);
  const front_indicator_buttons = new THREE.InstancedMesh(
    front_indicator_buttonsGeom,
    knobMetalMat,
    2
  );
  for (let i = 0; i < indicatorPositions.length; i++) {
    const p = indicatorPositions[i];
    dummy.position.set(p[0], p[1], 0.554);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_indicator_buttons.setMatrixAt(i, dummy.matrix);
  }
  front_indicator_buttons.instanceMatrix.needsUpdate = true;
  root.add(front_indicator_buttons);

  const control_label_marksGeom = new THREE.BoxGeometry(0.026, 0.005, 0.004);
  const control_label_marks = new THREE.InstancedMesh(
    control_label_marksGeom,
    darkMetalMat,
    6
  );
  const controlLabelPositions = [
    [-0.02, 0.33],
    [-0.02, 0.35],
    [0.16, 0.35],
    [0.16, 0.37],
    [0.35, 0.435],
    [0.35, 0.455],
  ];
  for (let i = 0; i < controlLabelPositions.length; i++) {
    const p = controlLabelPositions[i];
    dummy.position.set(p[0], p[1], 0.542);
    dummy.rotation.set(0, 0, i % 2 === 0 ? -0.12 : 0.08);
    dummy.scale.set(i % 2 === 0 ? 1 : 0.65, 1, 1);
    dummy.updateMatrix();
    control_label_marks.setMatrixAt(i, dummy.matrix);
  }
  control_label_marks.instanceMatrix.needsUpdate = true;
  root.add(control_label_marks);

  const side_badgesGeom = new THREE.BoxGeometry(0.004, 0.055, 0.16);
  const side_badges = new THREE.InstancedMesh(side_badgesGeom, exposedMetalMat, 2);
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.621 : 0.621, 0.235, 0.18);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_badges.setMatrixAt(i, dummy.matrix);
  }
  side_badges.instanceMatrix.needsUpdate = true;
  root.add(side_badges);

  const side_badge_marksGeom = new THREE.BoxGeometry(0.004, 0.006, 0.11);
  const side_badge_marks = new THREE.InstancedMesh(side_badge_marksGeom, inkMat, 6);
  let badgeIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      dummy.position.set(side * 0.624, 0.219 + i * 0.015, 0.18);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 0.72 + i * 0.12);
      dummy.updateMatrix();
      side_badge_marks.setMatrixAt(badgeIndex, dummy.matrix);
      badgeIndex++;
    }
  }
  side_badge_marks.instanceMatrix.needsUpdate = true;
  root.add(side_badge_marks);

  const side_access_coverGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.012, 24);
  const side_access_cover = new THREE.Mesh(side_access_coverGeom, darkMetalMat);
  side_access_cover.rotation.z = Math.PI / 2;
  side_access_cover.position.set(0.622, 0.225, 0.3);
  root.add(side_access_cover);

  const side_access_cover_rimGeom = new THREE.TorusGeometry(0.066, 0.007, 8, 20);
  const side_access_cover_rim = new THREE.Mesh(
    side_access_cover_rimGeom,
    exposedMetalMat
  );
  side_access_cover_rim.rotation.y = Math.PI / 2;
  side_access_cover_rim.position.set(0.63, 0.225, 0.3);
  root.add(side_access_cover_rim);

  const side_hinge_platesGeom = new THREE.BoxGeometry(0.012, 0.085, 0.055);
  const side_hinge_plates = new THREE.InstancedMesh(
    side_hinge_platesGeom,
    darkMetalMat,
    4
  );
  const hingePositions = [
    [-0.623, 0.78, -0.395],
    [-0.623, 0.43, -0.395],
    [0.623, 0.78, -0.395],
    [0.623, 0.43, -0.395],
  ];
  for (let i = 0; i < hingePositions.length; i++) {
    const p = hingePositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_hinge_plates.setMatrixAt(i, dummy.matrix);
  }
  side_hinge_plates.instanceMatrix.needsUpdate = true;
  root.add(side_hinge_plates);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}