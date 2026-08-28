export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bamboo_tower";

  const width = 0.68;
  const height = 2.40;
  const depth = 0.50;
  const wallThickness = 0.055;
  const bottomRailHeight = 0.075;
  const topCapHeight = 0.075;
  const splitRailY = 0.78;
  const splitRailHeight = 0.09;
  const frontZ = depth / 2;
  const rearZ = -depth / 2;
  const frontInnerZ = frontZ - wallThickness;
  const rearInnerZ = rearZ + wallThickness;
  const panelBottom = bottomRailHeight;
  const panelTop = height - topCapHeight;
  const panelHeight = panelTop - panelBottom;
  const panelCenterY = (panelTop + panelBottom) / 2;
  const railFrontZ = frontInnerZ + 0.018;
  const railRearZ = rearInnerZ - 0.018;

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xc99a58,
    metalness: 0.0,
    roughness: 0.6
  });
  const lightBambooMat = new THREE.MeshStandardMaterial({
    color: 0xddb879,
    metalness: 0.0,
    roughness: 0.6
  });
  const warmBambooMat = new THREE.MeshStandardMaterial({
    color: 0xbd8646,
    metalness: 0.0,
    roughness: 0.6
  });
  const railMat = new THREE.MeshStandardMaterial({
    color: 0xd3a662,
    metalness: 0.0,
    roughness: 0.6
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x966331,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkGrainMat = new THREE.MeshStandardMaterial({
    color: 0x70451f,
    metalness: 0.0,
    roughness: 0.6
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x4e2d14,
    metalness: 0.0,
    roughness: 0.9
  });

  function makeRoundedPanelGeometry(w, h, d, radius, bevel) {
    const hw = w / 2;
    const hh = h / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 4
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  const front_panelGeom = makeRoundedPanelGeometry(
    width,
    panelHeight,
    wallThickness,
    0.045,
    0.004
  );
  const front_panelMat = bambooMat;
  const front_panel = new THREE.Mesh(front_panelGeom, front_panelMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, panelCenterY, frontZ - wallThickness / 2);
  root.add(front_panel);

  const rear_panelGeom = front_panelGeom;
  const rear_panelMat = warmBambooMat;
  const rear_panel = new THREE.Mesh(rear_panelGeom, rear_panelMat);
  rear_panel.name = "rear_panel";
  rear_panel.position.set(0, panelCenterY, rearZ + wallThickness / 2);
  root.add(rear_panel);

  const left_side_panelGeom = makeRoundedPanelGeometry(
    depth - 0.035,
    panelHeight,
    wallThickness,
    0.035,
    0.004
  );
  const left_side_panelMat = bambooMat;
  const left_side_panel = new THREE.Mesh(left_side_panelGeom, left_side_panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.rotation.y = Math.PI / 2;
  left_side_panel.position.set(-width / 2 + wallThickness / 2, panelCenterY, 0);
  root.add(left_side_panel);

  const right_side_panelGeom = makeRoundedPanelGeometry(
    depth - 0.19,
    panelHeight - 0.01,
    wallThickness,
    0.03,
    0.004
  );
  const right_side_panelMat = bambooMat;
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, right_side_panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.set(
    width / 2 - wallThickness / 2,
    panelCenterY + 0.005,
    0.145
  );
  root.add(right_side_panel);

  const top_capGeom = makeRoundedPanelGeometry(
    width + 0.012,
    depth + 0.012,
    topCapHeight,
    0.055,
    0.005
  );
  const top_capMat = lightBambooMat;
  const top_cap = new THREE.Mesh(top_capGeom, top_capMat);
  top_cap.name = "top_cap";
  top_cap.rotation.x = -Math.PI / 2;
  top_cap.position.y = height - topCapHeight / 2;
  root.add(top_cap);

  const bottom_railGeom = makeRoundedPanelGeometry(
    width + 0.004,
    depth + 0.004,
    bottomRailHeight,
    0.045,
    0.004
  );
  const bottom_railMat = railMat;
  const bottom_rail = new THREE.Mesh(bottom_railGeom, bottom_railMat);
  bottom_rail.name = "bottom_rail";
  bottom_rail.rotation.x = -Math.PI / 2;
  bottom_rail.position.y = bottomRailHeight / 2;
  root.add(bottom_rail);

  const front_split_railGeom = new THREE.BoxGeometry(
    width - 0.075,
    splitRailHeight,
    0.038
  );
  const front_split_railMat = railMat;
  const front_split_rail = new THREE.Mesh(front_split_railGeom, front_split_railMat);
  front_split_rail.name = "front_split_rail";
  front_split_rail.position.set(0, splitRailY, railFrontZ);
  root.add(front_split_rail);

  const rear_split_railGeom = front_split_railGeom;
  const rear_split_railMat = railMat;
  const rear_split_rail = new THREE.Mesh(rear_split_railGeom, rear_split_railMat);
  rear_split_rail.name = "rear_split_rail";
  rear_split_rail.position.set(0, splitRailY, railRearZ);
  root.add(rear_split_rail);

  const left_split_railGeom = new THREE.BoxGeometry(
    0.038,
    splitRailHeight,
    frontInnerZ - railRearZ
  );
  const left_split_railMat = railMat;
  const left_split_rail = new THREE.Mesh(left_split_railGeom, left_split_railMat);
  left_split_rail.name = "left_split_rail";
  left_split_rail.position.set(-width / 2 + 0.038, splitRailY, 0);
  root.add(left_split_rail);

  const right_split_railGeom = new THREE.BoxGeometry(
    0.038,
    splitRailHeight,
    0.30
  );
  const right_split_railMat = railMat;
  const right_split_rail = new THREE.Mesh(right_split_railGeom, right_split_railMat);
  right_split_rail.name = "right_split_rail";
  right_split_rail.position.set(width / 2 - 0.038, splitRailY, 0.13);
  root.add(right_split_rail);

  const interior_shadowGeom = new THREE.BoxGeometry(0.012, 1.49, 0.14);
  const interior_shadowMat = interiorMat;
  const interior_shadow = new THREE.Mesh(interior_shadowGeom, interior_shadowMat);
  interior_shadow.name = "interior_shadow";
  interior_shadow.position.set(width / 2 - 0.061, 1.115, -0.175);
  root.add(interior_shadow);

  const openingFloorY = splitRailY + splitRailHeight / 2 + 0.004;
  const openingCeilingY = height - topCapHeight - 0.006;
  const openingHeight = openingCeilingY - openingFloorY;

  const upper_opening_shadowGeom = new THREE.BoxGeometry(
    0.012,
    openingHeight,
    0.14
  );
  const upper_opening_shadowMat = interiorMat;
  const upper_opening_shadow = new THREE.Mesh(
    upper_opening_shadowGeom,
    upper_opening_shadowMat
  );
  upper_opening_shadow.name = "upper_opening_shadow";
  upper_opening_shadow.position.set(
    width / 2 - 0.061,
    splitRailY + splitRailHeight / 2 + openingHeight / 2,
    -0.175
  );
  root.add(upper_opening_shadow);

  const opening_revealGeom = new THREE.BoxGeometry(
    0.010,
    openingHeight,
    0.018
  );
  const opening_revealMat = darkGrainMat;
  const opening_reveal = new THREE.Mesh(opening_revealGeom, opening_revealMat);
  opening_reveal.name = "opening_reveal";
  opening_reveal.position.set(
    width / 2 - wallThickness - 0.008,
    splitRailY + splitRailHeight / 2 + openingHeight / 2,
    -0.102
  );
  root.add(opening_reveal);

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, sx, sy, sz, rx, ry, rz) {
    dummy.position.set(x, y, z);
    dummy.scale.set(sx, sy, sz);
    dummy.rotation.set(rx, ry, rz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const lightFrontX = [
    -0.292, -0.214, -0.102, -0.018, 0.096,
    0.178, 0.266, 0.307
  ];
  const front_light_stripesGeom = new THREE.BoxGeometry(
    0.043,
    panelHeight - 0.025,
    0.003
  );
  const front_light_stripesMat = lightBambooMat;
  const front_light_stripes = new THREE.InstancedMesh(
    front_light_stripesGeom,
    front_light_stripesMat,
    lightFrontX.length
  );
  front_light_stripes.name = "front_light_stripes";
  for (let i = 0; i < lightFrontX.length; i++) {
    setInstance(
      front_light_stripes,
      i,
      lightFrontX[i],
      panelCenterY,
      frontZ + 0.006,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  front_light_stripes.instanceMatrix.needsUpdate = true;
  root.add(front_light_stripes);

  const darkFrontX = [
    -0.322, -0.252, -0.166, -0.066, 0.034,
    0.128, 0.218, 0.292
  ];
  const front_dark_groovesGeom = new THREE.BoxGeometry(
    0.008,
    panelHeight - 0.018,
    0.003
  );
  const front_dark_groovesMat = grainMat;
  const front_dark_grooves = new THREE.InstancedMesh(
    front_dark_groovesGeom,
    front_dark_groovesMat,
    darkFrontX.length
  );
  front_dark_grooves.name = "front_dark_grooves";
  for (let i = 0; i < darkFrontX.length; i++) {
    setInstance(
      front_dark_grooves,
      i,
      darkFrontX[i],
      panelCenterY,
      frontZ + 0.007,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  front_dark_grooves.instanceMatrix.needsUpdate = true;
  root.add(front_dark_grooves);

  const fineFrontX = [
    -0.274, -0.188, -0.126, -0.042, 0.066,
    0.154, 0.246, 0.326
  ];
  const front_fine_grainGeom = new THREE.BoxGeometry(
    0.003,
    panelHeight - 0.03,
    0.002
  );
  const front_fine_grainMat = warmBambooMat;
  const front_fine_grain = new THREE.InstancedMesh(
    front_fine_grainGeom,
    front_fine_grainMat,
    fineFrontX.length
  );
  front_fine_grain.name = "front_fine_grain";
  for (let i = 0; i < fineFrontX.length; i++) {
    setInstance(
      front_fine_grain,
      i,
      fineFrontX[i],
      panelCenterY,
      frontZ + 0.008,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  front_fine_grain.instanceMatrix.needsUpdate = true;
  root.add(front_fine_grain);

  const bamboo_knots_frontGeom = new THREE.BoxGeometry(0.050, 0.007, 0.003);
  const bamboo_knots_frontMat = darkGrainMat;
  const frontKnotData = [
    [-0.285, 2.12, 0.85], [-0.188, 1.88, 0.70],
    [-0.070, 1.67, 1.00], [0.075, 1.55, 0.72],
    [0.224, 1.43, 0.92], [-0.250, 1.29, 0.78],
    [-0.105, 1.12, 0.95], [0.045, 0.98, 0.68],
    [0.205, 0.87, 1.00], [-0.292, 0.69, 0.82],
    [-0.155, 0.54, 0.72], [0.012, 0.40, 0.92],
    [0.178, 0.27, 0.75], [0.286, 0.16, 0.62]
  ];
  const bamboo_knots_front = new THREE.InstancedMesh(
    bamboo_knots_frontGeom,
    bamboo_knots_frontMat,
    frontKnotData.length
  );
  bamboo_knots_front.name = "bamboo_knots_front";
  for (let i = 0; i < frontKnotData.length; i++) {
    const knot = frontKnotData[i];
    setInstance(
      bamboo_knots_front,
      i,
      knot[0],
      knot[1],
      frontZ + 0.010,
      knot[2],
      1,
      1,
      0,
      0,
      0
    );
  }
  bamboo_knots_front.instanceMatrix.needsUpdate = true;
  root.add(bamboo_knots_front);

  const bamboo_knot_marksGeom = new THREE.CircleGeometry(0.006, 10);
  const bamboo_knot_marksMat = darkGrainMat;
  const knotMarkData = [
    [-0.285, 2.116, 0.8], [-0.279, 2.126, 0.55],
    [-0.070, 1.666, 0.7], [-0.063, 1.677, 0.48],
    [0.224, 1.429, 0.7], [0.231, 1.439, 0.5],
    [-0.105, 1.118, 0.65], [-0.098, 1.129, 0.45],
    [0.205, 0.868, 0.75], [0.212, 0.880, 0.48],
    [-0.155, 0.538, 0.6], [-0.010, 0.397, 0.55],
    [0.178, 0.268, 0.65], [0.286, 0.158, 0.48]
  ];
  const bamboo_knot_marks = new THREE.InstancedMesh(
    bamboo_knot_marksGeom,
    bamboo_knot_marksMat,
    knotMarkData.length
  );
  bamboo_knot_marks.name = "bamboo_knot_marks";
  for (let i = 0; i < knotMarkData.length; i++) {
    const mark = knotMarkData[i];
    setInstance(
      bamboo_knot_marks,
      i,
      mark[0],
      mark[1],
      frontZ + 0.012,
      mark[2],
      mark[2],
      1,
      0,
      0,
      0
    );
  }
  bamboo_knot_marks.instanceMatrix.needsUpdate = true;
  root.add(bamboo_knot_marks);

  const side_laminationsGeom = new THREE.BoxGeometry(
    0.003,
    panelHeight - 0.025,
    0.045
  );
  const side_laminationsMat = lightBambooMat;
  const side_laminations = new THREE.InstancedMesh(
    side_laminationsGeom,
    side_laminationsMat,
    8
  );
  side_laminations.name = "side_laminations";
  const sideLamZ = [-0.185, -0.095, -0.005, 0.085];
  let sideLamIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < sideLamZ.length; i++) {
      setInstance(
        side_laminations,
        sideLamIndex++,
        side * (width / 2 + 0.005),
        panelCenterY,
        sideLamZ[i],
        1,
        1,
        1,
        0,
        0,
        0
      );
    }
  }
  side_laminations.instanceMatrix.needsUpdate = true;
  root.add(side_laminations);

  const side_dark_groovesGeom = new THREE.BoxGeometry(
    0.003,
    panelHeight - 0.025,
    0.009
  );
  const side_dark_groovesMat = grainMat;
  const side_dark_grooves = new THREE.InstancedMesh(
    side_dark_groovesGeom,
    side_dark_groovesMat,
    10
  );
  side_dark_grooves.name = "side_dark_grooves";
  const sideGrooveZ = [-0.218, -0.142, -0.052, 0.038, 0.128];
  let sideGrooveIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < sideGrooveZ.length; i++) {
      setInstance(
        side_dark_grooves,
        sideGrooveIndex++,
        side * (width / 2 + 0.007),
        panelCenterY,
        sideGrooveZ[i],
        1,
        1,
        1,
        0,
        0,
        0
      );
    }
  }
  side_dark_grooves.instanceMatrix.needsUpdate = true;
  root.add(side_dark_grooves);

  const side_knotsGeom = new THREE.BoxGeometry(0.003, 0.007, 0.050);
  const side_knotsMat = darkGrainMat;
  const sideKnotData = [
    [1, 2.04, -0.16, 0.8],
    [1, 1.73, 0.04, 0.9],
    [1, 1.36, -0.05, 0.7],
    [1, 1.02, 0.12, 0.8],
    [1, 0.58, -0.13, 0.7],
    [1, 0.24, 0.04, 0.9],
    [-1, 1.91, -0.08, 0.8],
    [-1, 0.92, 0.10, 0.7]
  ];
  const side_knots = new THREE.InstancedMesh(
    side_knotsGeom,
    side_knotsMat,
    sideKnotData.length
  );
  side_knots.name = "side_knots";
  for (let i = 0; i < sideKnotData.length; i++) {
    const knot = sideKnotData[i];
    setInstance(
      side_knots,
      i,
      knot[0] * (width / 2 + 0.009),
      knot[1],
      knot[2],
      1,
      1,
      knot[3],
      0,
      0,
      0
    );
  }
  side_knots.instanceMatrix.needsUpdate = true;
  root.add(side_knots);

  const rear_grain_linesGeom = new THREE.BoxGeometry(
    0.007,
    panelHeight - 0.03,
    0.003
  );
  const rear_grain_linesMat = grainMat;
  const rear_grain_lines = new THREE.InstancedMesh(
    rear_grain_linesGeom,
    rear_grain_linesMat,
    9
  );
  rear_grain_lines.name = "rear_grain_lines";
  for (let i = 0; i < 9; i++) {
    setInstance(
      rear_grain_lines,
      i,
      -0.288 + i * 0.072,
      panelCenterY,
      rearZ - 0.007,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  rear_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(rear_grain_lines);

  const top_grain_linesGeom = new THREE.BoxGeometry(
    0.010,
    0.003,
    depth - 0.045
  );
  const top_grain_linesMat = grainMat;
  const top_grain_lines = new THREE.InstancedMesh(
    top_grain_linesGeom,
    top_grain_linesMat,
    10
  );
  top_grain_lines.name = "top_grain_lines";
  for (let i = 0; i < 10; i++) {
    setInstance(
      top_grain_lines,
      i,
      -0.297 + i * 0.066,
      height + 0.006,
      0,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  top_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(top_grain_lines);

  const front_rail_grainGeom = new THREE.BoxGeometry(0.48, 0.004, 0.003);
  const front_rail_grainMat = grainMat;
  const front_rail_grain = new THREE.InstancedMesh(
    front_rail_grainGeom,
    front_rail_grainMat,
    3
  );
  front_rail_grain.name = "front_rail_grain";
  const railGrainY = [
    bottomRailHeight * 0.35,
    bottomRailHeight * 0.68,
    splitRailY
  ];
  for (let i = 0; i < railGrainY.length; i++) {
    setInstance(
      front_rail_grain,
      i,
      0,
      railGrainY[i],
      railFrontZ + 0.021,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  front_rail_grain.instanceMatrix.needsUpdate = true;
  root.add(front_rail_grain);

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