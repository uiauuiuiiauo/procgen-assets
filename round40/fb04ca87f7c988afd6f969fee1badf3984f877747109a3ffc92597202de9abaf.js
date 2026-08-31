export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 1.00;
  const bodyH = 0.92;
  const bodyD = 0.82;
  const bodyY = -0.02;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa94f40,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brickMat = new THREE.MeshStandardMaterial({
    color: 0xb65a49,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mortarMat = new THREE.MeshStandardMaterial({
    color: 0x78352d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0xb85e4c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const doorHandleMat = new THREE.MeshStandardMaterial({
    color: 0xc77965,
    metalness: 0.0,
    roughness: 0.8,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x95663f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x56351f,
    metalness: 0.0,
    roughness: 0.95,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a35,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xc5a24a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const gaugeFaceMat = new THREE.MeshStandardMaterial({
    color: 0xe8e5d7,
    metalness: 0.0,
    roughness: 0.7,
  });
  const gaugeMarkMat = new THREE.MeshStandardMaterial({
    color: 0x303438,
    metalness: 0.0,
    roughness: 0.8,
  });
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0x9d241e,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedBoxGeometry(w, h, d, r, bevel) {
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

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geom.translate(0, 0, -d / 2);
    return geom;
  }

  const oven_coreGeom = roundedBoxGeometry(bodyW, bodyH, bodyD, 0.065, 0.012);
  const oven_core = new THREE.Mesh(oven_coreGeom, mortarMat);
  oven_core.position.y = bodyY;
  root.add(oven_core);

  const brick_face_unitGeom = new THREE.BoxGeometry(1, 1, 1);

  const front_brickGeom = roundedBoxGeometry(0.224, 0.214, 0.026, 0.018, 0.004);
  const front_bricks = new THREE.InstancedMesh(front_brickGeom, brickMat, 16);
  const front_brick_dummy = new THREE.Object3D();
  let front_brick_index = 0;

  for (let row = 0; row < 4; row++) {
    const y = -0.3675 + row * 0.225;
    const offset = row % 2 === 0 ? -0.004 : 0.004;
    for (let col = 0; col < 4; col++) {
      front_brick_dummy.position.set(-0.345 + col * 0.23 + offset, y, 0.426);
      front_brick_dummy.rotation.set(0, 0, 0);
      front_brick_dummy.scale.set(1, 1, 1);
      front_brick_dummy.updateMatrix();
      front_bricks.setMatrixAt(front_brick_index++, front_brick_dummy.matrix);
    }
  }
  front_bricks.instanceMatrix.needsUpdate = true;
  root.add(front_bricks);

  const side_brickGeom = roundedBoxGeometry(0.224, 0.214, 0.026, 0.018, 0.004);
  const right_side_bricks = new THREE.InstancedMesh(side_brickGeom, brickMat, 12);
  const left_side_bricks = new THREE.InstancedMesh(side_brickGeom, brickMat, 12);
  const side_brick_dummy = new THREE.Object3D();
  let side_brick_index = 0;

  for (let row = 0; row < 4; row++) {
    const y = -0.3675 + row * 0.225;
    const offset = row % 2 === 0 ? 0.004 : -0.004;
    for (let col = 0; col < 3; col++) {
      const z = -0.27 + col * 0.23 + offset;

      side_brick_dummy.position.set(0.513, y, z);
      side_brick_dummy.rotation.set(0, Math.PI / 2, 0);
      side_brick_dummy.scale.set(1, 1, 1);
      side_brick_dummy.updateMatrix();
      right_side_bricks.setMatrixAt(side_brick_index, side_brick_dummy.matrix);

      side_brick_dummy.position.set(-0.513, y, -z);
      side_brick_dummy.rotation.set(0, -Math.PI / 2, 0);
      side_brick_dummy.updateMatrix();
      left_side_bricks.setMatrixAt(side_brick_index, side_brick_dummy.matrix);
      side_brick_index++;
    }
  }
  right_side_bricks.instanceMatrix.needsUpdate = true;
  left_side_bricks.instanceMatrix.needsUpdate = true;
  root.add(right_side_bricks, left_side_bricks);

  const back_brickGeom = roundedBoxGeometry(0.224, 0.214, 0.026, 0.018, 0.004);
  const back_bricks = new THREE.InstancedMesh(back_brickGeom, brickMat, 16);
  const back_brick_dummy = new THREE.Object3D();
  let back_brick_index = 0;

  for (let row = 0; row < 4; row++) {
    const y = -0.3675 + row * 0.225;
    const offset = row % 2 === 0 ? 0.004 : -0.004;
    for (let col = 0; col < 4; col++) {
      back_brick_dummy.position.set(-0.345 + col * 0.23 + offset, y, -0.426);
      back_brick_dummy.rotation.set(0, Math.PI, 0);
      back_brick_dummy.scale.set(1, 1, 1);
      back_brick_dummy.updateMatrix();
      back_bricks.setMatrixAt(back_brick_index++, back_brick_dummy.matrix);
    }
  }
  back_bricks.instanceMatrix.needsUpdate = true;
  root.add(back_bricks);

  const top_brickGeom = roundedBoxGeometry(0.224, 0.224, 0.026, 0.018, 0.004);
  const top_bricks = new THREE.InstancedMesh(top_brickGeom, brickMat, 16);
  const top_brick_dummy = new THREE.Object3D();
  let top_brick_index = 0;

  for (let row = 0; row < 4; row++) {
    const z = -0.345 + row * 0.23;
    const offset = row % 2 === 0 ? -0.004 : 0.004;
    for (let col = 0; col < 4; col++) {
      top_brick_dummy.position.set(-0.345 + col * 0.23 + offset, 0.463, z);
      top_brick_dummy.rotation.set(-Math.PI / 2, 0, 0);
      top_brick_dummy.scale.set(1, 1, 1);
      top_brick_dummy.updateMatrix();
      top_bricks.setMatrixAt(top_brick_index++, top_brick_dummy.matrix);
    }
  }
  top_bricks.instanceMatrix.needsUpdate = true;
  root.add(top_bricks);

  const corner_mortar_seamGeom = new THREE.BoxGeometry(0.012, 0.82, 0.012);
  const corner_mortar_seams = new THREE.InstancedMesh(
    corner_mortar_seamGeom,
    mortarMat,
    4
  );
  const corner_dummy = new THREE.Object3D();
  const corner_positions = [
    [-0.505, -0.02, -0.415],
    [0.505, -0.02, -0.415],
    [-0.505, -0.02, 0.415],
    [0.505, -0.02, 0.415],
  ];
  for (let i = 0; i < corner_positions.length; i++) {
    corner_dummy.position.set(
      corner_positions[i][0],
      corner_positions[i][1],
      corner_positions[i][2]
    );
    corner_dummy.updateMatrix();
    corner_mortar_seams.setMatrixAt(i, corner_dummy.matrix);
  }
  corner_mortar_seams.instanceMatrix.needsUpdate = true;
  root.add(corner_mortar_seams);

  const top_front_lipGeom = roundedBoxGeometry(0.98, 0.04, 0.05, 0.015, 0.004);
  const top_front_lip = new THREE.Mesh(top_front_lipGeom, brickMat);
  top_front_lip.position.set(0, 0.432, 0.424);
  root.add(top_front_lip);

  const door_gasketGeom = roundedBoxGeometry(0.79, 0.75, 0.025, 0.065, 0.005);
  const door_gasket = new THREE.Mesh(door_gasketGeom, mortarMat);
  door_gasket.position.set(-0.08, -0.07, 0.445);
  root.add(door_gasket);

  const doorGeom = roundedBoxGeometry(0.75, 0.71, 0.045, 0.06, 0.008);
  const door = new THREE.Mesh(doorGeom, doorMat);
  door.position.set(-0.08, -0.07, 0.475);
  root.add(door);

  const hinge_barrelGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.105, 14);
  const upper_hinge_barrel = new THREE.Mesh(hinge_barrelGeom, doorHandleMat);
  upper_hinge_barrel.position.set(-0.462, 0.11, 0.52);
  root.add(upper_hinge_barrel);

  const lower_hinge_barrel = new THREE.Mesh(hinge_barrelGeom, doorHandleMat);
  lower_hinge_barrel.position.set(-0.462, -0.25, 0.52);
  root.add(lower_hinge_barrel);

  const hinge_leafGeom = new THREE.BoxGeometry(0.065, 0.072, 0.018);
  const upper_hinge_leaf = new THREE.Mesh(hinge_leafGeom, doorMat);
  upper_hinge_leaf.position.set(-0.425, 0.11, 0.512);
  root.add(upper_hinge_leaf);

  const lower_hinge_leaf = new THREE.Mesh(hinge_leafGeom, doorMat);
  lower_hinge_leaf.position.set(-0.425, -0.25, 0.512);
  root.add(lower_hinge_leaf);

  const hinge_collarGeom = new THREE.TorusGeometry(0.019, 0.004, 6, 16);
  const hinge_collars = new THREE.InstancedMesh(hinge_collarGeom, doorHandleMat, 4);
  const hinge_collar_dummy = new THREE.Object3D();
  const hinge_collar_y = [0.067, 0.153, -0.293, -0.207];
  for (let i = 0; i < hinge_collar_y.length; i++) {
    hinge_collar_dummy.position.set(-0.462, hinge_collar_y[i], 0.52);
    hinge_collar_dummy.rotation.set(Math.PI / 2, 0, 0);
    hinge_collar_dummy.updateMatrix();
    hinge_collars.setMatrixAt(i, hinge_collar_dummy.matrix);
  }
  hinge_collars.instanceMatrix.needsUpdate = true;
  root.add(hinge_collars);

  const door_handle_mountGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.022, 16);
  const door_handle_left_mount = new THREE.Mesh(door_handle_mountGeom, doorHandleMat);
  door_handle_left_mount.rotation.x = Math.PI / 2;
  door_handle_left_mount.position.set(-0.33, 0.075, 0.52);
  root.add(door_handle_left_mount);

  const door_handle_right_mount = new THREE.Mesh(door_handle_mountGeom, doorHandleMat);
  door_handle_right_mount.rotation.x = Math.PI / 2;
  door_handle_right_mount.position.set(0.17, 0.045, 0.52);
  root.add(door_handle_right_mount);

  const door_handle_path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.33, 0.075, 0.53),
      new THREE.Vector3(-0.31, 0.055, 0.565),
      new THREE.Vector3(-0.18, 0.025, 0.585),
      new THREE.Vector3(0.04, 0.025, 0.585),
      new THREE.Vector3(0.17, 0.045, 0.555),
    ],
    false,
    "centripetal"
  );
  const door_handleGeom = new THREE.TubeGeometry(
    door_handle_path,
    28,
    0.022,
    10,
    false
  );
  const door_handle = new THREE.Mesh(door_handleGeom, doorHandleMat);
  root.add(door_handle);

  const wood_panel_backingGeom = roundedBoxGeometry(0.35, 0.65, 0.03, 0.025, 0.004);
  const wood_panel_backing = new THREE.Mesh(wood_panel_backingGeom, woodGrainMat);
  wood_panel_backing.rotation.y = Math.PI / 2;
  wood_panel_backing.position.set(0.526, -0.06, 0.08);
  root.add(wood_panel_backing);

  const wood_panelGeom = roundedBoxGeometry(0.33, 0.63, 0.045, 0.022, 0.006);
  const wood_panel = new THREE.Mesh(wood_panelGeom, woodMat);
  wood_panel.rotation.y = Math.PI / 2;
  wood_panel.position.set(0.55, -0.06, 0.08);
  root.add(wood_panel);

  const wood_grainGeom = new THREE.BoxGeometry(0.004, 1, 0.006);
  const wood_grain = new THREE.InstancedMesh(wood_grainGeom, woodGrainMat, 12);
  const wood_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 12; i++) {
    const z = -0.075 + i * 0.028;
    const y = -0.06 + (((i * 5) % 7) - 3) * 0.018;
    const length = 0.28 + (i % 4) * 0.055;
    const widthScale = 0.65 + (i % 3) * 0.25;
    wood_grain_dummy.position.set(0.582, y, z);
    wood_grain_dummy.rotation.set(0, 0, 0);
    wood_grain_dummy.scale.set(1, length, widthScale);
    wood_grain_dummy.updateMatrix();
    wood_grain.setMatrixAt(i, wood_grain_dummy.matrix);
  }
  wood_grain.instanceMatrix.needsUpdate = true;
  root.add(wood_grain);

  const wood_knotGeom = new THREE.TorusGeometry(0.018, 0.003, 6, 18);
  const upper_wood_knot = new THREE.Mesh(wood_knotGeom, woodGrainMat);
  upper_wood_knot.rotation.y = Math.PI / 2;
  upper_wood_knot.scale.set(0.75, 1.35, 1);
  upper_wood_knot.position.set(0.585, 0.105, -0.005);
  root.add(upper_wood_knot);

  const lower_wood_knot = new THREE.Mesh(wood_knotGeom, woodGrainMat);
  lower_wood_knot.rotation.y = Math.PI / 2;
  lower_wood_knot.scale.set(0.6, 1.1, 1);
  lower_wood_knot.position.set(0.585, -0.28, 0.145);
  root.add(lower_wood_knot);

  const thermometer_backplateGeom = roundedBoxGeometry(
    0.085,
    0.205,
    0.012,
    0.038,
    0.002
  );
  const thermometer_backplate = new THREE.Mesh(
    thermometer_backplateGeom,
    brassMat
  );
  thermometer_backplate.rotation.y = Math.PI / 2;
  thermometer_backplate.position.set(0.589, 0.09, 0.08);
  root.add(thermometer_backplate);

  const thermometer_faceGeom = roundedBoxGeometry(
    0.055,
    0.17,
    0.007,
    0.026,
    0.001
  );
  const thermometer_face = new THREE.Mesh(thermometer_faceGeom, gaugeFaceMat);
  thermometer_face.rotation.y = Math.PI / 2;
  thermometer_face.position.set(0.598, 0.105, 0.08);
  root.add(thermometer_face);

  const thermometer_scale_lineGeom = new THREE.BoxGeometry(0.004, 0.13, 0.004);
  const thermometer_scale_line = new THREE.Mesh(
    thermometer_scale_lineGeom,
    gaugeMarkMat
  );
  thermometer_scale_line.position.set(0.604, 0.105, 0.087);
  root.add(thermometer_scale_line);

  const thermometer_tickGeom = new THREE.BoxGeometry(0.004, 0.004, 0.026);
  const thermometer_ticks = new THREE.InstancedMesh(
    thermometer_tickGeom,
    gaugeMarkMat,
    9
  );
  const thermometer_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    thermometer_tick_dummy.position.set(0.606, 0.025 + i * 0.02, 0.087);
    thermometer_tick_dummy.rotation.set(0, 0, 0);
    thermometer_tick_dummy.scale.set(i % 2 === 0 ? 1 : 0.8, 1, i % 2 === 0 ? 1 : 0.7);
    thermometer_tick_dummy.updateMatrix();
    thermometer_ticks.setMatrixAt(i, thermometer_tick_dummy.matrix);
  }
  thermometer_ticks.instanceMatrix.needsUpdate = true;
  root.add(thermometer_ticks);

  const thermometer_needleGeom = new THREE.BoxGeometry(0.005, 0.105, 0.004);
  const thermometer_needle = new THREE.Mesh(thermometer_needleGeom, needleMat);
  thermometer_needle.position.set(0.609, 0.095, 0.08);
  root.add(thermometer_needle);

  const thermometer_pivotGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.009,
    14
  );
  const thermometer_pivot = new THREE.Mesh(thermometer_pivotGeom, needleMat);
  thermometer_pivot.rotation.z = -Math.PI / 2;
  thermometer_pivot.position.set(0.612, 0.045, 0.08);
  root.add(thermometer_pivot);

  const control_mountGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.026, 24);
  const control_mount = new THREE.Mesh(control_mountGeom, brassMat);
  control_mount.rotation.z = -Math.PI / 2;
  control_mount.position.set(0.605, -0.07, 0.08);
  root.add(control_mount);

  const control_collarGeom = new THREE.CylinderGeometry(0.049, 0.049, 0.04, 24);
  const control_collar = new THREE.Mesh(control_collarGeom, polishedBrassMat);
  control_collar.rotation.z = -Math.PI / 2;
  control_collar.position.set(0.628, -0.07, 0.08);
  root.add(control_collar);

  const control_shaftGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.19, 16);
  const control_shaft = new THREE.Mesh(control_shaftGeom, brassMat);
  control_shaft.rotation.z = -Math.PI / 2;
  control_shaft.position.set(0.705, -0.07, 0.08);
  root.add(control_shaft);

  const control_grip_ringGeom = new THREE.TorusGeometry(0.024, 0.004, 7, 18);
  const control_grip_rings = new THREE.InstancedMesh(
    control_grip_ringGeom,
    polishedBrassMat,
    3
  );
  const control_ring_dummy = new THREE.Object3D();
  const control_ring_x = [0.675, 0.72, 0.765];
  for (let i = 0; i < control_ring_x.length; i++) {
    control_ring_dummy.position.set(control_ring_x[i], -0.07, 0.08);
    control_ring_dummy.rotation.set(0, Math.PI / 2, 0);
    control_ring_dummy.updateMatrix();
    control_grip_rings.setMatrixAt(i, control_ring_dummy.matrix);
  }
  control_grip_rings.instanceMatrix.needsUpdate = true;
  root.add(control_grip_rings);

  const control_knob_endGeom = new THREE.CylinderGeometry(
    0.029,
    0.029,
    0.035,
    16
  );
  const control_knob_end = new THREE.Mesh(control_knob_endGeom, polishedBrassMat);
  control_knob_end.rotation.z = -Math.PI / 2;
  control_knob_end.position.set(0.81, -0.07, 0.08);
  root.add(control_knob_end);

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