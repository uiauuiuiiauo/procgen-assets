export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rustic_low_table";

  const tabletop = new THREE.Group();
  tabletop.name = "tabletop";
  root.add(tabletop);

  const underframe = new THREE.Group();
  underframe.name = "underframe";
  root.add(underframe);

  const distress_details = new THREE.Group();
  distress_details.name = "distress_details";
  root.add(distress_details);

  const tabletop_planksMat = new THREE.MeshStandardMaterial({
    color: 0x654a39,
    metalness: 0.0,
    roughness: 0.9
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x3f2a20,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_grainMat = new THREE.MeshStandardMaterial({
    color: 0x2b201a,
    metalness: 0.0,
    roughness: 0.9
  });
  const worn_woodMat = new THREE.MeshStandardMaterial({
    color: 0xb08a62,
    metalness: 0.0,
    roughness: 0.9
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x211813,
    metalness: 0.0,
    roughness: 0.9
  });
  const iron_pegMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function createRoundedSlabGeometry(width, depth, height, radius, bevel) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 5
    });
    geometry.rotateX(Math.PI / 2);
    geometry.translate(0, height / 2, 0);
    return geometry;
  }

  const instance_matrix = new THREE.Matrix4();
  const instance_position = new THREE.Vector3();
  const instance_scale = new THREE.Vector3();
  const identity_quaternion = new THREE.Quaternion();

  function setInstance(mesh, index, x, y, z, quaternion, sx, sy, sz) {
    instance_position.set(x, y, z);
    instance_scale.set(sx, sy, sz);
    instance_matrix.compose(
      instance_position,
      quaternion || identity_quaternion,
      instance_scale
    );
    mesh.setMatrixAt(index, instance_matrix);
  }

  const topW = 3.05;
  const topD = 1.72;
  const topY = 1.22;
  const topH = 0.16;
  const boardCount = 5;
  const boardGap = 0.018;
  const boardD = (topD - boardGap * (boardCount - 1)) / boardCount;

  const tabletop_planksGeom = createRoundedSlabGeometry(
    topW,
    boardD,
    topH,
    0.045,
    0.018
  );
  const tabletop_planks = new THREE.InstancedMesh(
    tabletop_planksGeom,
    tabletop_planksMat,
    boardCount
  );
  tabletop_planks.name = "tabletop_planks";

  const board_centers = [];
  for (let i = 0; i < boardCount; i++) {
    const z = -topD / 2 + boardD / 2 + i * (boardD + boardGap);
    board_centers.push(z);
    setInstance(tabletop_planks, i, 0, topY, z, identity_quaternion, 1, 1, 1);
  }
  tabletop_planks.instanceMatrix.needsUpdate = true;
  tabletop.add(tabletop_planks);

  const tabletop_seamsGeom = new THREE.BoxGeometry(topW - 0.1, 0.006, 0.012);
  const tabletop_seams = new THREE.InstancedMesh(
    tabletop_seamsGeom,
    seamMat,
    boardCount - 1
  );
  tabletop_seams.name = "tabletop_seams";
  for (let i = 0; i < boardCount - 1; i++) {
    const z = (board_centers[i] + board_centers[i + 1]) / 2;
    setInstance(
      tabletop_seams,
      i,
      0,
      topY + topH / 2 + 0.021,
      z,
      identity_quaternion,
      1,
      1,
      1
    );
  }
  tabletop_seams.instanceMatrix.needsUpdate = true;
  tabletop.add(tabletop_seams);

  const tabletop_grainGeom = new THREE.BoxGeometry(1, 0.004, 1);
  const tabletop_grain = new THREE.InstancedMesh(
    tabletop_grainGeom,
    dark_grainMat,
    30
  );
  tabletop_grain.name = "tabletop_grain";
  for (let i = 0; i < 30; i++) {
    const boardIndex = i % boardCount;
    const x = -1.15 + (((i * 7) % 29) / 28) * 2.3;
    const z = board_centers[boardIndex] + (((i * 3) % 5) - 2) * 0.022;
    const length = 0.18 + (i % 6) * 0.075;
    const width = 0.006 + (i % 3) * 0.003;
    const angle = ((i % 7) - 3) * 0.008;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    );
    setInstance(
      tabletop_grain,
      i,
      x,
      topY + topH / 2 + 0.023,
      z,
      quaternion,
      length,
      1,
      width
    );
  }
  tabletop_grain.instanceMatrix.needsUpdate = true;
  distress_details.add(tabletop_grain);

  const top_worn_scratchesGeom = new THREE.BoxGeometry(1, 0.004, 1);
  const top_worn_scratches = new THREE.InstancedMesh(
    top_worn_scratchesGeom,
    worn_woodMat,
    24
  );
  top_worn_scratches.name = "top_worn_scratches";
  for (let i = 0; i < 24; i++) {
    const boardIndex = (i * 3) % boardCount;
    const x = -1.28 + (((i * 11) % 31) / 30) * 2.56;
    const z = board_centers[boardIndex] + (((i * 5) % 7) - 3) * 0.018;
    const length = 0.07 + (i % 7) * 0.045;
    const width = 0.006 + (i % 4) * 0.003;
    const angle = ((i % 9) - 4) * 0.014;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    );
    setInstance(
      top_worn_scratches,
      i,
      x,
      topY + topH / 2 + 0.026,
      z,
      quaternion,
      length,
      1,
      width
    );
  }
  top_worn_scratches.instanceMatrix.needsUpdate = true;
  distress_details.add(top_worn_scratches);

  const top_knotsGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.005, 14);
  const top_knots = new THREE.InstancedMesh(top_knotsGeom, seamMat, 8);
  top_knots.name = "top_knots";
  const knot_positions = [
    [-1.16, board_centers[0] + 0.025],
    [-0.72, board_centers[2] - 0.035],
    [-0.28, board_centers[1] + 0.04],
    [0.18, board_centers[3] - 0.03],
    [0.63, board_centers[2] + 0.025],
    [1.08, board_centers[4] - 0.04],
    [1.31, board_centers[1] - 0.02],
    [-1.34, board_centers[3] + 0.03]
  ];
  for (let i = 0; i < knot_positions.length; i++) {
    const sx = 0.75 + (i % 3) * 0.25;
    const sz = 0.48 + (i % 2) * 0.22;
    setInstance(
      top_knots,
      i,
      knot_positions[i][0],
      topY + topH / 2 + 0.026,
      knot_positions[i][1],
      identity_quaternion,
      sx,
      1,
      sz
    );
  }
  top_knots.instanceMatrix.needsUpdate = true;
  distress_details.add(top_knots);

  const top_edge_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_edge_wear = new THREE.InstancedMesh(
    top_edge_wearGeom,
    worn_woodMat,
    18
  );
  top_edge_wear.name = "top_edge_wear";
  let edgeIndex = 0;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 6; i++) {
      const x = -1.22 + i * 0.49;
      const y = topY - 0.045 + (i % 3) * 0.035;
      const length = 0.12 + (i % 4) * 0.055;
      setInstance(
        top_edge_wear,
        edgeIndex++,
        x,
        y,
        side * (topD / 2 + 0.021),
        identity_quaternion,
        length,
        0.018 + (i % 2) * 0.012,
        0.008
      );
    }
  }
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 3; i++) {
      const z = -0.5 + i * 0.5;
      const y = topY - 0.025 + (i % 2) * 0.04;
      setInstance(
        top_edge_wear,
        edgeIndex++,
        side * (topW / 2 + 0.021),
        y,
        z,
        identity_quaternion,
        0.008,
        0.025 + i * 0.008,
        0.18 + (i % 2) * 0.08
      );
    }
  }
  top_edge_wear.instanceMatrix.needsUpdate = true;
  distress_details.add(top_edge_wear);

  const apronH = 0.42;
  const apronY = 0.91;
  const apronDepth = 0.12;
  const front_apronGeom = new THREE.BoxGeometry(2.52, apronH, apronDepth);
  const front_apron = new THREE.Mesh(front_apronGeom, frameMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, apronY, 0.69);
  underframe.add(front_apron);

  const rear_apronGeom = front_apronGeom;
  const rear_apron = new THREE.Mesh(rear_apronGeom, frameMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, apronY, -0.69);
  underframe.add(rear_apron);

  const side_apronGeom = new THREE.BoxGeometry(0.12, apronH, 1.3);
  const left_apron = new THREE.Mesh(side_apronGeom, frameMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-1.34, apronY, 0);
  underframe.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, frameMat);
  right_apron.name = "right_apron";
  right_apron.position.set(1.34, apronY, 0);
  underframe.add(right_apron);

  const front_upper_trimGeom = new THREE.BoxGeometry(2.62, 0.055, 0.145);
  const front_upper_trim = new THREE.Mesh(front_upper_trimGeom, frameMat);
  front_upper_trim.name = "front_upper_trim";
  front_upper_trim.position.set(0, 1.115, 0.69);
  underframe.add(front_upper_trim);

  const rear_upper_trim = new THREE.Mesh(front_upper_trimGeom, frameMat);
  rear_upper_trim.name = "rear_upper_trim";
  rear_upper_trim.position.set(0, 1.115, -0.69);
  underframe.add(rear_upper_trim);

  const side_upper_trimGeom = new THREE.BoxGeometry(0.145, 0.055, 1.34);
  const left_upper_trim = new THREE.Mesh(side_upper_trimGeom, frameMat);
  left_upper_trim.name = "left_upper_trim";
  left_upper_trim.position.set(-1.34, 1.115, 0);
  underframe.add(left_upper_trim);

  const right_upper_trim = new THREE.Mesh(side_upper_trimGeom, frameMat);
  right_upper_trim.name = "right_upper_trim";
  right_upper_trim.position.set(1.34, 1.115, 0);
  underframe.add(right_upper_trim);

  const front_lower_trimGeom = new THREE.BoxGeometry(2.48, 0.045, 0.14);
  const front_lower_trim = new THREE.Mesh(front_lower_trimGeom, frameMat);
  front_lower_trim.name = "front_lower_trim";
  front_lower_trim.position.set(0, 0.705, 0.69);
  underframe.add(front_lower_trim);

  const rear_lower_trim = new THREE.Mesh(front_lower_trimGeom, frameMat);
  rear_lower_trim.name = "rear_lower_trim";
  rear_lower_trim.position.set(0, 0.705, -0.69);
  underframe.add(rear_lower_trim);

  const side_lower_trimGeom = new THREE.BoxGeometry(0.14, 0.045, 1.26);
  const left_lower_trim = new THREE.Mesh(side_lower_trimGeom, frameMat);
  left_lower_trim.name = "left_lower_trim";
  left_lower_trim.position.set(-1.34, 0.705, 0);
  underframe.add(left_lower_trim);

  const right_lower_trim = new THREE.Mesh(side_lower_trimGeom, frameMat);
  right_lower_trim.name = "right_lower_trim";
  right_lower_trim.position.set(1.34, 0.705, 0);
  underframe.add(right_lower_trim);

  const legShape = new THREE.Shape();
  legShape.moveTo(-0.10, 0.0);
  legShape.quadraticCurveTo(-0.16, 0.02, -0.15, 0.10);
  legShape.bezierCurveTo(-0.12, 0.24, -0.04, 0.40, -0.055, 0.53);
  legShape.bezierCurveTo(-0.07, 0.66, -0.17, 0.76, -0.16, 0.92);
  legShape.lineTo(-0.16, 1.15);
  legShape.lineTo(0.16, 1.15);
  legShape.lineTo(0.16, 0.92);
  legShape.bezierCurveTo(0.17, 0.76, 0.07, 0.66, 0.055, 0.53);
  legShape.bezierCurveTo(0.04, 0.40, -0.04, 0.24, -0.09, 0.10);
  legShape.quadraticCurveTo(-0.10, 0.03, -0.10, 0.0);

  const legGeom = new THREE.ExtrudeGeometry(legShape, {
    depth: 0.22,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 8
  });
  legGeom.translate(0, 0, -0.11);

  const front_left_leg = new THREE.Mesh(legGeom, frameMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-1.28, 0, 0.68);
  underframe.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(legGeom, frameMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(1.28, 0, 0.68);
  underframe.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(legGeom, frameMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-1.28, 0, -0.68);
  underframe.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(legGeom, frameMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(1.28, 0, -0.68);
  underframe.add(rear_right_leg);

  const side_stretcherGeom = new THREE.BoxGeometry(0.13, 0.14, 1.18);
  const left_side_stretcher = new THREE.Mesh(side_stretcherGeom, frameMat);
  left_side_stretcher.name = "left_side_stretcher";
  left_side_stretcher.position.set(-1.28, 0.34, 0);
  underframe.add(left_side_stretcher);

  const right_side_stretcher = new THREE.Mesh(side_stretcherGeom, frameMat);
  right_side_stretcher.name = "right_side_stretcher";
  right_side_stretcher.position.set(1.28, 0.34, 0);
  underframe.add(right_side_stretcher);

  function createBraceGeometry(x0, y0, x1, y1, braceWidth) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const length = Math.sqrt(dx * dx + dy * dy);
    const px = -dy / length * braceWidth / 2;
    const py = dx / length * braceWidth / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + px, y0 + py);
    shape.lineTo(x1 + px, y1 + py);
    shape.lineTo(x1 - px, y1 - py);
    shape.lineTo(x0 - px, y0 - py);
    shape.lineTo(x0 + px, y0 + py);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.045,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.004,
      bevelSegments: 1
    });
    geometry.translate(0, 0, -0.0225);
    return geometry;
  }

  const left_diagonal_braceGeom = createBraceGeometry(
    -1.12, 0.42, -0.43, 0.76, 0.075
  );
  const left_diagonal_brace = new THREE.Mesh(
    left_diagonal_braceGeom,
    frameMat
  );
  left_diagonal_brace.name = "left_diagonal_brace";
  left_diagonal_brace.position.z = 0.665;
  underframe.add(left_diagonal_brace);

  const right_diagonal_braceGeom = createBraceGeometry(
    1.12, 0.42, 0.43, 0.76, 0.075
  );
  const right_diagonal_brace = new THREE.Mesh(
    right_diagonal_braceGeom,
    frameMat
  );
  right_diagonal_brace.name = "right_diagonal_brace";
  right_diagonal_brace.position.z = 0.665;
  underframe.add(right_diagonal_brace);

  const brace_pegGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.018, 16);
  const left_brace_peg = new THREE.Mesh(brace_pegGeom, iron_pegMat);
  left_brace_peg.name = "left_brace_peg";
  left_brace_peg.rotation.x = Math.PI / 2;
  left_brace_peg.position.set(-0.43, 0.76, 0.698);
  underframe.add(left_brace_peg);

  const right_brace_peg = new THREE.Mesh(brace_pegGeom, iron_pegMat);
  right_brace_peg.name = "right_brace_peg";
  right_brace_peg.rotation.x = Math.PI / 2;
  right_brace_peg.position.set(0.43, 0.76, 0.698);
  underframe.add(right_brace_peg);

  const front_apron_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_apron_wear = new THREE.InstancedMesh(
    front_apron_wearGeom,
    worn_woodMat,
    16
  );
  front_apron_wear.name = "front_apron_wear";
  for (let i = 0; i < 16; i++) {
    const x = -1.06 + (((i * 7) % 17) / 16) * 2.12;
    const y = 0.75 + (((i * 5) % 13) / 12) * 0.31;
    const length = 0.08 + (i % 6) * 0.055;
    const height = 0.008 + (i % 3) * 0.006;
    setInstance(
      front_apron_wear,
      i,
      x,
      y,
      0.754,
      identity_quaternion,
      length,
      height,
      0.006
    );
  }
  front_apron_wear.instanceMatrix.needsUpdate = true;
  distress_details.add(front_apron_wear);

  const front_apron_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_apron_grain = new THREE.InstancedMesh(
    front_apron_grainGeom,
    dark_grainMat,
    12
  );
  front_apron_grain.name = "front_apron_grain";
  for (let i = 0; i < 12; i++) {
    const x = -0.9 + (((i * 9) % 13) / 12) * 1.8;
    const y = 0.76 + (((i * 4) % 11) / 10) * 0.29;
    const length = 0.16 + (i % 5) * 0.09;
    setInstance(
      front_apron_grain,
      i,
      x,
      y,
      0.755,
      identity_quaternion,
      length,
      0.006,
      0.005
    );
  }
  front_apron_grain.instanceMatrix.needsUpdate = true;
  distress_details.add(front_apron_grain);

  const front_leg_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_leg_wear = new THREE.InstancedMesh(
    front_leg_wearGeom,
    worn_woodMat,
    12
  );
  front_leg_wear.name = "front_leg_wear";
  let legWearIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const y = 0.12 + i * 0.165;
      const x = side * 1.28 + ((i % 3) - 1) * 0.026;
      const height = 0.065 + (i % 4) * 0.035;
      const width = 0.012 + (i % 3) * 0.008;
      setInstance(
        front_leg_wear,
        legWearIndex++,
        x,
        y,
        0.813,
        identity_quaternion,
        width,
        height,
        0.007
      );
    }
  }
  front_leg_wear.instanceMatrix.needsUpdate = true;
  distress_details.add(front_leg_wear);

  const side_apron_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const side_apron_wear = new THREE.InstancedMesh(
    side_apron_wearGeom,
    worn_woodMat,
    12
  );
  side_apron_wear.name = "side_apron_wear";
  let sideWearIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const z = -0.48 + i * 0.19;
      const y = 0.76 + ((i * 3) % 7) * 0.045;
      const length = 0.08 + (i % 4) * 0.05;
      setInstance(
        side_apron_wear,
        sideWearIndex++,
        side * 1.404,
        y,
        z,
        identity_quaternion,
        0.006,
        0.011 + (i % 2) * 0.008,
        length
      );
    }
  }
  side_apron_wear.instanceMatrix.needsUpdate = true;
  distress_details.add(side_apron_wear);

  const apron_iron_pegGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.014,
    14
  );
  const front_left_apron_peg = new THREE.Mesh(
    apron_iron_pegGeom,
    iron_pegMat
  );
  front_left_apron_peg.name = "front_left_apron_peg";
  front_left_apron_peg.rotation.x = Math.PI / 2;
  front_left_apron_peg.position.set(-1.08, 0.91, 0.759);
  underframe.add(front_left_apron_peg);

  const front_right_apron_peg = new THREE.Mesh(
    apron_iron_pegGeom,
    iron_pegMat
  );
  front_right_apron_peg.name = "front_right_apron_peg";
  front_right_apron_peg.rotation.x = Math.PI / 2;
  front_right_apron_peg.position.set(1.08, 0.91, 0.759);
  underframe.add(front_right_apron_peg);

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