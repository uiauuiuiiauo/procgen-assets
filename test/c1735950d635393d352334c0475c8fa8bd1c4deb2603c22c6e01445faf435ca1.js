export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rustic_wood_table";

  const tableW = 1.62;
  const tableD = 0.92;
  const topT = 0.12;
  const topCenterY = 0.94;
  const topSurfaceY = topCenterY + topT / 2 + 0.007;
  const legW = 0.16;
  const legD = 0.15;
  const legH = 0.87;
  const legX = 0.65;
  const legZ = 0.32;
  const apronH = 0.22;
  const apronT = 0.075;
  const apronY = 0.79;
  const apronTopY = apronY + apronH / 2;

  const top_front_leftMat = new THREE.MeshStandardMaterial({
    color: 0x8b7c67,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_front_centerMat = new THREE.MeshStandardMaterial({
    color: 0x756a5c,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_front_rightMat = new THREE.MeshStandardMaterial({
    color: 0x92826d,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_back_leftMat = new THREE.MeshStandardMaterial({
    color: 0x7d705f,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_back_centerMat = new THREE.MeshStandardMaterial({
    color: 0x887964,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_back_rightMat = new THREE.MeshStandardMaterial({
    color: 0x71675a,
    metalness: 0.0,
    roughness: 0.9
  });
  const legsMat = new THREE.MeshStandardMaterial({
    color: 0x51463b,
    metalness: 0.0,
    roughness: 0.9
  });
  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x594b3e,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_grainMat = new THREE.MeshStandardMaterial({
    color: 0x302923,
    metalness: 0.0,
    roughness: 0.9
  });
  const light_grainMat = new THREE.MeshStandardMaterial({
    color: 0xa18e74,
    metalness: 0.0,
    roughness: 0.9
  });
  const nail_headsMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
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
      curveSegments: 3,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const tabletop = new THREE.Group();
  tabletop.name = "tabletop";
  root.add(tabletop);

  const plankD = 0.91;
  const plankGap = 0.008;
  const plankW = (tableW - plankGap * 5) / 6;
  const plankStep = plankW + plankGap;
  const top_plankGeom = roundedBoxGeometry(plankW, topT, plankD, 0.018, 0.006);

  const top_front_left = new THREE.Mesh(top_plankGeom, top_front_leftMat);
  top_front_left.name = "top_front_left";
  top_front_left.position.set(-2.5 * plankStep, topCenterY, 0);
  tabletop.add(top_front_left);

  const top_front_center_left = new THREE.Mesh(top_plankGeom, top_front_centerMat);
  top_front_center_left.name = "top_front_center_left";
  top_front_center_left.position.set(-1.5 * plankStep, topCenterY, 0);
  tabletop.add(top_front_center_left);

  const top_front_center_right = new THREE.Mesh(top_plankGeom, top_front_rightMat);
  top_front_center_right.name = "top_front_center_right";
  top_front_center_right.position.set(-0.5 * plankStep, topCenterY, 0);
  tabletop.add(top_front_center_right);

  const top_back_left = new THREE.Mesh(top_plankGeom, top_back_leftMat);
  top_back_left.name = "top_back_left";
  top_back_left.position.set(0.5 * plankStep, topCenterY, 0);
  tabletop.add(top_back_left);

  const top_back_center = new THREE.Mesh(top_plankGeom, top_back_centerMat);
  top_back_center.name = "top_back_center";
  top_back_center.position.set(1.5 * plankStep, topCenterY, 0);
  tabletop.add(top_back_center);

  const top_back_right = new THREE.Mesh(top_plankGeom, top_back_rightMat);
  top_back_right.name = "top_back_right";
  top_back_right.position.set(2.5 * plankStep, topCenterY, 0);
  tabletop.add(top_back_right);

  const top_seamsGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_seams = new THREE.InstancedMesh(top_seamsGeom, dark_grainMat, 5);
  top_seams.name = "top_seams";
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * plankStep;
    setInstance(
      top_seams,
      i,
      x,
      topCenterY,
      -0.004,
      0,
      0,
      0,
      0.004,
      topT * 0.72,
      tableD - 0.045
    );
  }
  top_seams.instanceMatrix.needsUpdate = true;
  tabletop.add(top_seams);

  const top_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_grain_lines = new THREE.InstancedMesh(top_grainGeom, dark_grainMat, 36);
  top_grain_lines.name = "top_grain_lines";
  for (let i = 0; i < 36; i++) {
    const board = Math.floor(i / 6);
    const line = i % 6;
    const boardX = (board - 2.5) * plankStep;
    const x = boardX + ((line + 1) / 7 - 0.5) * plankW * 0.78;
    const z = -0.33 + (((i * 7) % 19) / 18) * 0.66;
    const length = 0.09 + ((i * 5) % 8) * 0.025;
    const angle = ((i % 5) - 2) * 0.006;
    setInstance(
      top_grain_lines,
      i,
      x,
      topSurfaceY,
      z,
      0,
      angle,
      0,
      0.0022,
      0.0015,
      length
    );
  }
  top_grain_lines.instanceMatrix.needsUpdate = true;
  tabletop.add(top_grain_lines);

  const top_wear_lines = new THREE.InstancedMesh(top_grainGeom, light_grainMat, 18);
  top_wear_lines.name = "top_wear_lines";
  for (let i = 0; i < 18; i++) {
    const board = Math.floor(i / 3);
    const line = i % 3;
    const boardX = (board - 2.5) * plankStep;
    const x = boardX + (line - 1) * plankW * 0.22;
    const z = -0.29 + (((i * 11) % 17) / 16) * 0.58;
    const length = 0.07 + ((i * 3) % 6) * 0.026;
    setInstance(
      top_wear_lines,
      i,
      x,
      topSurfaceY + 0.0005,
      z,
      0,
      ((i % 4) - 1.5) * 0.005,
      0,
      0.0015,
      0.0012,
      length
    );
  }
  top_wear_lines.instanceMatrix.needsUpdate = true;
  tabletop.add(top_wear_lines);

  const top_knots_data = [
    [-0.63, 0.16, 0.025, 0.012],
    [-0.39, -0.25, 0.018, 0.009],
    [-0.13, 0.31, 0.015, 0.008],
    [0.18, -0.08, 0.022, 0.011],
    [0.46, 0.24, 0.018, 0.009],
    [0.68, -0.29, 0.026, 0.012]
  ];

  const top_knotsGeom = new THREE.CylinderGeometry(1, 1, 1, 16);
  const top_knots = new THREE.InstancedMesh(
    top_knotsGeom,
    dark_grainMat,
    top_knots_data.length
  );
  top_knots.name = "top_knots";
  for (let i = 0; i < top_knots_data.length; i++) {
    const knot = top_knots_data[i];
    setInstance(
      top_knots,
      i,
      knot[0],
      topSurfaceY + 0.001,
      knot[1],
      0,
      i * 0.37,
      0,
      knot[2],
      0.0018,
      knot[3]
    );
  }
  top_knots.instanceMatrix.needsUpdate = true;
  tabletop.add(top_knots);

  const top_knot_ringsGeom = new THREE.TorusGeometry(1, 0.11, 6, 20);
  const top_knot_rings = new THREE.InstancedMesh(
    top_knot_ringsGeom,
    dark_grainMat,
    top_knots_data.length
  );
  top_knot_rings.name = "top_knot_rings";
  for (let i = 0; i < top_knots_data.length; i++) {
    const knot = top_knots_data[i];
    setInstance(
      top_knot_rings,
      i,
      knot[0],
      topSurfaceY + 0.0014,
      knot[1],
      Math.PI / 2,
      0,
      i * 0.29,
      knot[2] * 1.55,
      knot[3] * 1.55,
      0.0015
    );
  }
  top_knot_rings.instanceMatrix.needsUpdate = true;
  tabletop.add(top_knot_rings);

  const top_nails_data = [
    [-0.72, 0.37],
    [-0.53, -0.36],
    [-0.30, 0.08],
    [-0.08, -0.34],
    [0.10, 0.36],
    [0.31, -0.10],
    [0.52, 0.34],
    [0.70, -0.35]
  ];
  const top_nailsGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const top_nails = new THREE.InstancedMesh(
    top_nailsGeom,
    nail_headsMat,
    top_nails_data.length
  );
  top_nails.name = "top_nails";
  for (let i = 0; i < top_nails_data.length; i++) {
    const nail = top_nails_data[i];
    setInstance(
      top_nails,
      i,
      nail[0],
      topSurfaceY + 0.001,
      nail[1],
      0,
      0,
      0,
      0.0045,
      0.0018,
      0.0045
    );
  }
  top_nails.instanceMatrix.needsUpdate = true;
  tabletop.add(top_nails);

  const top_edge_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_front_edge_grain = new THREE.InstancedMesh(
    top_edge_grainGeom,
    dark_grainMat,
    10
  );
  top_front_edge_grain.name = "top_front_edge_grain";
  for (let i = 0; i < 10; i++) {
    const x = -0.71 + (((i * 7) % 13) / 12) * 1.42;
    const y = topCenterY - 0.043 + (i % 5) * 0.019;
    const length = 0.10 + ((i * 5) % 7) * 0.035;
    setInstance(
      top_front_edge_grain,
      i,
      x,
      y,
      tableD / 2 + 0.007,
      0,
      0,
      ((i % 3) - 1) * 0.01,
      length,
      0.0022,
      0.0018
    );
  }
  top_front_edge_grain.instanceMatrix.needsUpdate = true;
  tabletop.add(top_front_edge_grain);

  const top_end_grain = new THREE.InstancedMesh(
    top_edge_grainGeom,
    dark_grainMat,
    12
  );
  top_end_grain.name = "top_end_grain";
  for (let i = 0; i < 12; i++) {
    const side = i < 6 ? -1 : 1;
    const row = i % 6;
    setInstance(
      top_end_grain,
      i,
      side * (tableW / 2 + 0.007),
      topCenterY - 0.04 + (row % 5) * 0.019,
      -0.35 + Math.floor(row / 5) * 0.48 + (((row * 3) % 5) / 4) * 0.14,
      0,
      0,
      0,
      0.0018,
      0.002,
      0.11 + (row % 3) * 0.035
    );
  }
  top_end_grain.instanceMatrix.needsUpdate = true;
  tabletop.add(top_end_grain);

  const base = new THREE.Group();
  base.name = "base";
  root.add(base);

  const leg_positions = [
    [-legX, legZ],
    [legX, legZ],
    [-legX, -legZ],
    [legX, -legZ]
  ];

  const legsGeom = roundedBoxGeometry(legW, legH, legD, 0.012, 0.004);
  const legs = new THREE.InstancedMesh(legsGeom, legsMat, leg_positions.length);
  legs.name = "legs";
  for (let i = 0; i < leg_positions.length; i++) {
    const leg = leg_positions[i];
    setInstance(legs, i, leg[0], legH / 2, leg[1], 0, 0, 0, 1, 1, 1);
  }
  legs.instanceMatrix.needsUpdate = true;
  base.add(legs);

  const longApronW = legX * 2 - legW + 0.02;
  const sideApronD = legZ * 2 - legD + 0.02;

  const front_apronGeom = roundedBoxGeometry(
    longApronW,
    apronH,
    apronT,
    0.009,
    0.004
  );
  const front_apron = new THREE.Mesh(front_apronGeom, apronMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, apronY, legZ);
  base.add(front_apron);

  const back_apron = new THREE.Mesh(front_apronGeom, apronMat);
  back_apron.name = "back_apron";
  back_apron.position.set(0, apronY, -legZ);
  base.add(back_apron);

  const side_apronGeom = roundedBoxGeometry(
    apronT,
    apronH,
    sideApronD,
    0.009,
    0.004
  );
  const left_apron = new THREE.Mesh(side_apronGeom, apronMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-legX, apronY, 0);
  base.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, apronMat);
  right_apron.name = "right_apron";
  right_apron.position.set(legX, apronY, 0);
  base.add(right_apron);

  const apronSurfaceZ = legZ + apronT / 2 + 0.006;
  const apronSurfaceX = legX + apronT / 2 + 0.006;
  const apron_grainGeom = new THREE.BoxGeometry(1, 1, 1);

  const front_apron_grain = new THREE.InstancedMesh(
    apron_grainGeom,
    dark_grainMat,
    14
  );
  front_apron_grain.name = "front_apron_grain";
  for (let i = 0; i < 14; i++) {
    const x = -0.43 + (((i * 7) % 13) / 12) * 0.86;
    const y = apronY - 0.085 + (i % 6) * 0.029;
    const length = 0.12 + ((i * 5) % 8) * 0.035;
    setInstance(
      front_apron_grain,
      i,
      x,
      y,
      apronSurfaceZ,
      0,
      0,
      ((i % 4) - 1.5) * 0.008,
      length,
      0.002,
      0.0018
    );
  }
  front_apron_grain.instanceMatrix.needsUpdate = true;
  base.add(front_apron_grain);

  const side_apron_grain = new THREE.InstancedMesh(
    apron_grainGeom,
    dark_grainMat,
    16
  );
  side_apron_grain.name = "side_apron_grain";
  for (let i = 0; i < 16; i++) {
    const side = i < 8 ? -1 : 1;
    const row = i % 8;
    const z = -0.20 + (((row * 5) % 9) / 8) * 0.40;
    const y = apronY - 0.08 + (row % 6) * 0.028;
    const length = 0.09 + ((row * 3) % 6) * 0.025;
    setInstance(
      side_apron_grain,
      i,
      side * apronSurfaceX,
      y,
      z,
      0,
      0,
      0,
      0.0018,
      0.002,
      length
    );
  }
  side_apron_grain.instanceMatrix.needsUpdate = true;
  base.add(side_apron_grain);

  const leg_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const leg_front_grain = new THREE.InstancedMesh(
    leg_grainGeom,
    dark_grainMat,
    28
  );
  leg_front_grain.name = "leg_front_grain";
  let legFrontIndex = 0;
  for (let legIndex = 0; legIndex < leg_positions.length; legIndex++) {
    const leg = leg_positions[legIndex];
    const outward = leg[1] > 0 ? 1 : -1;
    for (let line = 0; line < 7; line++) {
      const x = leg[0] - 0.054 + (((line + 1) / 8) * 0.108);
      const y = 0.10 + (((line * 5 + legIndex * 3) % 11) / 10) * 0.62;
      const length = 0.08 + ((line * 4 + legIndex * 3) % 7) * 0.03;
      setInstance(
        leg_front_grain,
        legFrontIndex,
        x,
        y,
        leg[1] + outward * (legD / 2 + 0.006),
        0,
        0,
        ((line % 3) - 1) * 0.006,
        0.002,
        length,
        0.0018
      );
      legFrontIndex++;
    }
  }
  leg_front_grain.instanceMatrix.needsUpdate = true;
  base.add(leg_front_grain);

  const leg_side_grain = new THREE.InstancedMesh(
    leg_grainGeom,
    dark_grainMat,
    24
  );
  leg_side_grain.name = "leg_side_grain";
  let legSideIndex = 0;
  for (let legIndex = 0; legIndex < leg_positions.length; legIndex++) {
    const leg = leg_positions[legIndex];
    const outward = leg[0] > 0 ? 1 : -1;
    for (let line = 0; line < 6; line++) {
      const z = leg[1] - 0.052 + (((line + 1) / 7) * 0.104);
      const y = 0.12 + (((line * 7 + legIndex * 2) % 10) / 9) * 0.59;
      const length = 0.09 + ((line * 3 + legIndex * 4) % 7) * 0.028;
      setInstance(
        leg_side_grain,
        legSideIndex,
        leg[0] + outward * (legW / 2 + 0.006),
        y,
        z,
        0,
        0,
        0,
        0.0018,
        length,
        0.002
      );
      legSideIndex++;
    }
  }
  leg_side_grain.instanceMatrix.needsUpdate = true;
  base.add(leg_side_grain);

  const leg_knots_data = [
    [-legX, 0.63, legZ + legD / 2 + 0.007, 0, 1, 0.018, 0.011],
    [-legX, 0.24, legZ + legD / 2 + 0.007, 0, 1, 0.013, 0.009],
    [legX, 0.50, legZ + legD / 2 + 0.007, 0, 1, 0.020, 0.012],
    [legX, 0.17, legZ + legD / 2 + 0.007, 0, 1, 0.014, 0.009],
    [-legX - legW / 2 - 0.007, 0.42, -legZ, 1, 0, 0.017, 0.010],
    [legX + legW / 2 + 0.007, 0.69, -legZ, 1, 0, 0.019, 0.011]
  ];
  const leg_knotsGeom = new THREE.CylinderGeometry(1, 1, 1, 14);
  const leg_knots = new THREE.InstancedMesh(
    leg_knotsGeom,
    dark_grainMat,
    leg_knots_data.length
  );
  leg_knots.name = "leg_knots";
  for (let i = 0; i < leg_knots_data.length; i++) {
    const knot = leg_knots_data[i];
    if (knot[4] === 1) {
      setInstance(
        leg_knots,
        i,
        knot[0],
        knot[1],
        knot[2],
        Math.PI / 2,
        0,
        0,
        knot[5],
        0.0018,
        knot[6]
      );
    } else {
      setInstance(
        leg_knots,
        i,
        knot[0],
        knot[1],
        knot[2],
        0,
        0,
        Math.PI / 2,
        knot[5],
        0.0018,
        knot[6]
      );
    }
  }
  leg_knots.instanceMatrix.needsUpdate = true;
  base.add(leg_knots);

  const front_leg_nails_data = [
    [-legX - 0.025, 0.78],
    [-legX + 0.026, 0.55],
    [-legX - 0.022, 0.18],
    [legX - 0.026, 0.77],
    [legX + 0.025, 0.48],
    [legX + 0.020, 0.16]
  ];
  const front_leg_nailsGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const front_leg_nails = new THREE.InstancedMesh(
    front_leg_nailsGeom,
    nail_headsMat,
    front_leg_nails_data.length
  );
  front_leg_nails.name = "front_leg_nails";
  for (let i = 0; i < front_leg_nails_data.length; i++) {
    const nail = front_leg_nails_data[i];
    setInstance(
      front_leg_nails,
      i,
      nail[0],
      nail[1],
      legZ + legD / 2 + 0.008,
      Math.PI / 2,
      0,
      0,
      0.005,
      0.002,
      0.005
    );
  }
  front_leg_nails.instanceMatrix.needsUpdate = true;
  base.add(front_leg_nails);

  const apron_nails_data = [
    [-0.48, apronTopY - 0.035],
    [-0.25, apronTopY - 0.045],
    [0.24, apronTopY - 0.04],
    [0.49, apronTopY - 0.03]
  ];
  const apron_nailsGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const apron_nails = new THREE.InstancedMesh(
    apron_nailsGeom,
    nail_headsMat,
    apron_nails_data.length
  );
  apron_nails.name = "apron_nails";
  for (let i = 0; i < apron_nails_data.length; i++) {
    const nail = apron_nails_data[i];
    setInstance(
      apron_nails,
      i,
      nail[0],
      nail[1],
      apronSurfaceZ + 0.001,
      Math.PI / 2,
      0,
      0,
      0.005,
      0.002,
      0.005
    );
  }
  apron_nails.instanceMatrix.needsUpdate = true;
  base.add(apron_nails);

  const apron_front_edgeGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    longApronW - 0.025,
    8
  );
  const apron_front_edge = new THREE.Mesh(apron_front_edgeGeom, apronMat);
  apron_front_edge.name = "apron_front_edge";
  apron_front_edge.rotation.z = Math.PI / 2;
  apron_front_edge.position.set(0, apronTopY - 0.006, apronSurfaceZ - 0.002);
  base.add(apron_front_edge);

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