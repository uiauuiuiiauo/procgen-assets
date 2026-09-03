export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rustic_low_table";

  const tabletop = new THREE.Group();
  tabletop.name = "tabletop";
  const frame = new THREE.Group();
  frame.name = "frame";
  const underframe = new THREE.Group();
  underframe.name = "underframe";
  const surface_wear = new THREE.Group();
  surface_wear.name = "surface_wear";
  root.add(tabletop, frame, underframe, surface_wear);

  const top_planksMat = new THREE.MeshStandardMaterial({
    color: 0x594033,
    metalness: 0.0,
    roughness: 0.9
  });
  const frame_woodMat = new THREE.MeshStandardMaterial({
    color: 0x3f2a21,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x2d1d18,
    metalness: 0.0,
    roughness: 0.9
  });
  const worn_woodMat = new THREE.MeshStandardMaterial({
    color: 0xa87c50,
    metalness: 0.0,
    roughness: 0.9
  });
  const faded_woodMat = new THREE.MeshStandardMaterial({
    color: 0x806047,
    metalness: 0.0,
    roughness: 0.9
  });
  const iron_pegMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function createRoundedBoxGeometry(w, h, d, radius, bevel) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
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

  function createApronGeometry(w, h, d) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, h / 2);
    shape.lineTo(w / 2, h / 2);
    shape.lineTo(w / 2 - 0.012, -h / 2 + 0.055);
    shape.quadraticCurveTo(w / 2 - 0.035, -h / 2, w / 2 - 0.09, -h / 2);
    shape.lineTo(-w / 2 + 0.09, -h / 2);
    shape.quadraticCurveTo(-w / 2 + 0.035, -h / 2, -w / 2 + 0.012, -h / 2 + 0.055);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  function createFrontLegGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.075, 0.025);
    shape.quadraticCurveTo(-0.105, 0.05, -0.095, 0.14);
    shape.bezierCurveTo(-0.075, 0.27, -0.075, 0.39, -0.105, 0.49);
    shape.quadraticCurveTo(-0.145, 0.59, -0.105, 0.67);
    shape.lineTo(0.105, 0.67);
    shape.quadraticCurveTo(0.145, 0.59, 0.105, 0.49);
    shape.bezierCurveTo(0.075, 0.39, 0.075, 0.27, 0.095, 0.14);
    shape.quadraticCurveTo(0.105, 0.05, 0.075, 0.025);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.17,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -0.085);
    return geometry;
  }

  function createCurvedBraceGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.13, 0.015, 0.24, 0.13, 0.36, 0.27);
    shape.lineTo(0.29, 0.30);
    shape.bezierCurveTo(0.19, 0.18, 0.09, 0.09, 0, 0.07);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.055,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -0.0275);
    return geometry;
  }

  const top_planksGeom = createRoundedBoxGeometry(1.96, 0.105, 0.235, 0.018, 0.012);
  const top_planks = new THREE.InstancedMesh(top_planksGeom, top_planksMat, 5);
  top_planks.name = "top_planks";
  const instance_dummy = new THREE.Object3D();
  const plank_centers = [-0.492, -0.246, 0, 0.246, 0.492];
  const plank_depth_scales = [1.0, 0.985, 1.01, 0.99, 1.0];
  const plank_height_scales = [1.0, 0.98, 1.015, 0.995, 1.0];

  for (let i = 0; i < 5; i++) {
    instance_dummy.position.set(0, 0.746, plank_centers[i]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, plank_height_scales[i], plank_depth_scales[i]);
    instance_dummy.updateMatrix();
    top_planks.setMatrixAt(i, instance_dummy.matrix);
  }
  top_planks.instanceMatrix.needsUpdate = true;
  tabletop.add(top_planks);

  const top_seamsGeom = new THREE.BoxGeometry(1.87, 0.004, 0.012);
  const top_seams = new THREE.InstancedMesh(top_seamsGeom, dark_woodMat, 4);
  top_seams.name = "top_seams";
  const seam_positions = [-0.369, -0.123, 0.123, 0.369];

  for (let i = 0; i < 4; i++) {
    instance_dummy.position.set(0, 0.806, seam_positions[i]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    top_seams.setMatrixAt(i, instance_dummy.matrix);
  }
  top_seams.instanceMatrix.needsUpdate = true;
  tabletop.add(top_seams);

  const top_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_grain = new THREE.InstancedMesh(top_grainGeom, dark_woodMat, 30);
  top_grain.name = "top_grain";

  for (let i = 0; i < 30; i++) {
    const board = i % 5;
    const band = Math.floor(i / 5);
    const boardZ = plank_centers[board];
    const length = 0.18 + ((i * 13) % 17) / 17 * 0.46;
    const xSpan = 1.72 - length;
    const x = -0.86 + length / 2 + ((i * 29) % 101) / 100 * xSpan;
    const z = boardZ + (band - 2) * 0.026 + ((i % 3) - 1) * 0.009;
    const width = 0.004 + (i % 3) * 0.002;

    instance_dummy.position.set(x, 0.809, z);
    instance_dummy.rotation.set(0, ((i % 5) - 2) * 0.006, 0);
    instance_dummy.scale.set(length, 0.0025, width);
    instance_dummy.updateMatrix();
    top_grain.setMatrixAt(i, instance_dummy.matrix);
  }
  top_grain.instanceMatrix.needsUpdate = true;
  tabletop.add(top_grain);

  const top_worn_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_worn_marks = new THREE.InstancedMesh(top_worn_marksGeom, worn_woodMat, 36);
  top_worn_marks.name = "top_worn_marks";

  for (let i = 0; i < 36; i++) {
    const length = 0.07 + ((i * 17) % 23) / 23 * 0.34;
    const xSpan = 1.78 - length;
    const x = -0.89 + length / 2 + ((i * 31) % 97) / 96 * xSpan;
    const z = -0.55 + ((i * 43) % 101) / 100 * 1.10;
    const width = 0.008 + (i % 4) * 0.004;
    const angle = ((i % 7) - 3) * 0.008;

    instance_dummy.position.set(x, 0.811, z);
    instance_dummy.rotation.set(0, angle, 0);
    instance_dummy.scale.set(length, 0.003, width);
    instance_dummy.updateMatrix();
    top_worn_marks.setMatrixAt(i, instance_dummy.matrix);
  }
  top_worn_marks.instanceMatrix.needsUpdate = true;
  tabletop.add(top_worn_marks);

  const top_knotsGeom = new THREE.CircleGeometry(0.025, 16);
  const top_knots = new THREE.InstancedMesh(top_knotsGeom, dark_woodMat, 7);
  top_knots.name = "top_knots";
  const knot_data = [
    [-0.63, -0.31, 1.25, 0.55],
    [0.46, -0.43, 0.85, 0.48],
    [-0.18, 0.18, 1.05, 0.42],
    [0.72, 0.27, 0.72, 0.50],
    [-0.74, 0.42, 0.82, 0.38],
    [0.12, -0.08, 0.60, 0.36],
    [0.58, 0.05, 0.75, 0.45]
  ];

  for (let i = 0; i < knot_data.length; i++) {
    const knot = knot_data[i];
    instance_dummy.position.set(knot[0], 0.813, knot[1]);
    instance_dummy.rotation.set(-Math.PI / 2, 0, 0);
    instance_dummy.scale.set(knot[2], knot[3], 1);
    instance_dummy.updateMatrix();
    top_knots.setMatrixAt(i, instance_dummy.matrix);
  }
  top_knots.instanceMatrix.needsUpdate = true;
  tabletop.add(top_knots);

  const front_apronGeom = createApronGeometry(1.68, 0.29, 0.085);
  const front_apron = new THREE.Mesh(front_apronGeom, frame_woodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.525, 0.49);
  frame.add(front_apron);

  const rear_apron = new THREE.Mesh(front_apronGeom, frame_woodMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 0.525, -0.49);
  frame.add(rear_apron);

  const side_apronsGeom = createApronGeometry(0.86, 0.27, 0.075);
  const side_aprons = new THREE.InstancedMesh(side_apronsGeom, frame_woodMat, 2);
  side_aprons.name = "side_aprons";

  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.82 : 0.82, 0.53, 0);
    instance_dummy.rotation.set(0, Math.PI / 2, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    side_aprons.setMatrixAt(i, instance_dummy.matrix);
  }
  side_aprons.instanceMatrix.needsUpdate = true;
  frame.add(side_aprons);

  const front_apron_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_apron_wear = new THREE.InstancedMesh(front_apron_wearGeom, worn_woodMat, 14);
  front_apron_wear.name = "front_apron_wear";

  for (let i = 0; i < 14; i++) {
    const length = 0.08 + ((i * 11) % 19) / 19 * 0.31;
    const x = -0.72 + ((i * 37) % 91) / 90 * 1.44;
    const y = 0.415 + ((i * 23) % 83) / 82 * 0.205;

    instance_dummy.position.set(x, y, 0.548);
    instance_dummy.rotation.set(0, 0, ((i % 5) - 2) * 0.01);
    instance_dummy.scale.set(length, 0.007 + (i % 3) * 0.004, 0.003);
    instance_dummy.updateMatrix();
    front_apron_wear.setMatrixAt(i, instance_dummy.matrix);
  }
  front_apron_wear.instanceMatrix.needsUpdate = true;
  surface_wear.add(front_apron_wear);

  const side_apron_wear = new THREE.InstancedMesh(front_apron_wearGeom, faded_woodMat, 10);
  side_apron_wear.name = "side_apron_wear";

  for (let i = 0; i < 10; i++) {
    const side = i < 5 ? -1 : 1;
    const j = i % 5;
    const length = 0.10 + j * 0.035;
    const z = -0.28 + ((j * 7) % 9) * 0.07;
    const y = 0.44 + ((j * 5) % 7) * 0.028;

    instance_dummy.position.set(side * 0.868, y, z);
    instance_dummy.rotation.set(0, Math.PI / 2, 0);
    instance_dummy.scale.set(length, 0.009, 0.003);
    instance_dummy.updateMatrix();
    side_apron_wear.setMatrixAt(i, instance_dummy.matrix);
  }
  side_apron_wear.instanceMatrix.needsUpdate = true;
  surface_wear.add(side_apron_wear);

  const front_legsGeom = createFrontLegGeometry();
  const front_legs = new THREE.InstancedMesh(front_legsGeom, frame_woodMat, 2);
  front_legs.name = "front_legs";

  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.82 : 0.82, 0, 0.43);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    front_legs.setMatrixAt(i, instance_dummy.matrix);
  }
  front_legs.instanceMatrix.needsUpdate = true;
  frame.add(front_legs);

  const rear_legs = new THREE.InstancedMesh(front_legsGeom, frame_woodMat, 2);
  rear_legs.name = "rear_legs";

  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.82 : 0.82, 0, -0.43);
    instance_dummy.rotation.set(0, Math.PI, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    rear_legs.setMatrixAt(i, instance_dummy.matrix);
  }
  rear_legs.instanceMatrix.needsUpdate = true;
  frame.add(rear_legs);

  const front_leg_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_leg_wear = new THREE.InstancedMesh(front_leg_wearGeom, worn_woodMat, 12);
  front_leg_wear.name = "front_leg_wear";

  for (let i = 0; i < 12; i++) {
    const side = i < 6 ? -1 : 1;
    const j = i % 6;
    const y = 0.07 + j * 0.095;
    const x = side * 0.82 + (((j * 3) % 5) - 2) * 0.018;
    const h = 0.045 + (j % 3) * 0.025;

    instance_dummy.position.set(x, y, 0.532);
    instance_dummy.rotation.set(0, 0, ((j % 3) - 1) * 0.025);
    instance_dummy.scale.set(0.012 + (j % 2) * 0.007, h, 0.003);
    instance_dummy.updateMatrix();
    front_leg_wear.setMatrixAt(i, instance_dummy.matrix);
  }
  front_leg_wear.instanceMatrix.needsUpdate = true;
  surface_wear.add(front_leg_wear);

  const side_stretchersGeom = new THREE.BoxGeometry(0.105, 0.085, 0.72);
  const side_stretchers = new THREE.InstancedMesh(side_stretchersGeom, frame_woodMat, 2);
  side_stretchers.name = "side_stretchers";

  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.82 : 0.82, 0.16, 0);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    side_stretchers.setMatrixAt(i, instance_dummy.matrix);
  }
  side_stretchers.instanceMatrix.needsUpdate = true;
  underframe.add(side_stretchers);

  const side_stretcher_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const side_stretcher_wear = new THREE.InstancedMesh(side_stretcher_wearGeom, faded_woodMat, 8);
  side_stretcher_wear.name = "side_stretcher_wear";

  for (let i = 0; i < 8; i++) {
    const side = i < 4 ? -1 : 1;
    const j = i % 4;
    instance_dummy.position.set(side * 0.82, 0.207, -0.24 + j * 0.16);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(0.055 + j * 0.012, 0.003, 0.010);
    instance_dummy.updateMatrix();
    side_stretcher_wear.setMatrixAt(i, instance_dummy.matrix);
  }
  side_stretcher_wear.instanceMatrix.needsUpdate = true;
  surface_wear.add(side_stretcher_wear);

  const diagonal_bracesGeom = createCurvedBraceGeometry();
  const diagonal_braces = new THREE.InstancedMesh(diagonal_bracesGeom, frame_woodMat, 2);
  diagonal_braces.name = "diagonal_braces";

  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.72 : 0.72, 0.205, 0.538);
    instance_dummy.rotation.set(0, i === 0 ? 0 : Math.PI, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    diagonal_braces.setMatrixAt(i, instance_dummy.matrix);
  }
  diagonal_braces.instanceMatrix.needsUpdate = true;
  underframe.add(diagonal_braces);

  const iron_pegsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12);
  const iron_pegs = new THREE.InstancedMesh(iron_pegsGeom, iron_pegMat, 6);
  iron_pegs.name = "iron_pegs";
  const peg_positions = [
    [-0.66, 0.57],
    [0.66, 0.57],
    [-0.58, 0.43],
    [0.58, 0.43],
    [-0.18, 0.49],
    [0.22, 0.55]
  ];

  for (let i = 0; i < peg_positions.length; i++) {
    instance_dummy.position.set(peg_positions[i][0], peg_positions[i][1], 0.553);
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    iron_pegs.setMatrixAt(i, instance_dummy.matrix);
  }
  iron_pegs.instanceMatrix.needsUpdate = true;
  surface_wear.add(iron_pegs);

  const front_edge_wearGeom = new THREE.BoxGeometry(1, 1, 1);
  const front_edge_wear = new THREE.InstancedMesh(front_edge_wearGeom, worn_woodMat, 18);
  front_edge_wear.name = "front_edge_wear";

  for (let i = 0; i < 18; i++) {
    const length = 0.07 + ((i * 7) % 13) / 13 * 0.19;
    const x = -0.86 + ((i * 41) % 97) / 96 * 1.72;
    const y = 0.705 + (i % 4) * 0.018;

    instance_dummy.position.set(x, y, 0.624);
    instance_dummy.rotation.set(0, 0, ((i % 5) - 2) * 0.012);
    instance_dummy.scale.set(length, 0.008 + (i % 3) * 0.005, 0.004);
    instance_dummy.updateMatrix();
    front_edge_wear.setMatrixAt(i, instance_dummy.matrix);
  }
  front_edge_wear.instanceMatrix.needsUpdate = true;
  surface_wear.add(front_edge_wear);

  const side_edge_wear = new THREE.InstancedMesh(front_edge_wearGeom, worn_woodMat, 10);
  side_edge_wear.name = "side_edge_wear";

  for (let i = 0; i < 10; i++) {
    const side = i < 5 ? -1 : 1;
    const j = i % 5;
    const length = 0.09 + j * 0.035;
    const z = -0.38 + j * 0.19;

    instance_dummy.position.set(side * 0.997, 0.718 + (j % 3) * 0.018, z);
    instance_dummy.rotation.set(0, Math.PI / 2, 0);
    instance_dummy.scale.set(length, 0.010 + (j % 2) * 0.006, 0.004);
    instance_dummy.updateMatrix();
    side_edge_wear.setMatrixAt(i, instance_dummy.matrix);
  }
  side_edge_wear.instanceMatrix.needsUpdate = true;
  surface_wear.add(side_edge_wear);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(THREE, root);
  return root;
}