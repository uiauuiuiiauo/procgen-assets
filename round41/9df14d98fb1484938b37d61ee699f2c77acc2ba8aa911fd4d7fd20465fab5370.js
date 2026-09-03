export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wristwatch";

  const polished_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silver_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const leather_mat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leather_panel_mat = new THREE.MeshStandardMaterial({
    color: 0x202023,
    metalness: 0.0,
    roughness: 0.7,
  });
  const stitch_mat = new THREE.MeshStandardMaterial({
    color: 0x6b493b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const dial_mat = new THREE.MeshStandardMaterial({
    color: 0xd8c48e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const subdial_mat = new THREE.MeshStandardMaterial({
    color: 0xe8ddbd,
    metalness: 0.0,
    roughness: 0.6,
  });
  const marking_mat = new THREE.MeshStandardMaterial({
    color: 0x25282b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const hand_mat = new THREE.MeshStandardMaterial({
    color: 0x202a34,
    metalness: 0.5,
    roughness: 0.25,
  });
  const red_mat = new THREE.MeshStandardMaterial({
    color: 0x8e1735,
    metalness: 0.0,
    roughness: 0.3,
  });
  const ruby_mat = new THREE.MeshStandardMaterial({
    color: 0x9e1744,
    metalness: 0.0,
    roughness: 0.3,
  });
  const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });

  const top_strap_shape = new THREE.Shape();
  top_strap_shape.moveTo(-0.62, 0.72);
  top_strap_shape.lineTo(0.62, 0.72);
  top_strap_shape.lineTo(0.58, 2.10);
  top_strap_shape.bezierCurveTo(0.58, 2.28, 0.45, 2.38, 0.28, 2.40);
  top_strap_shape.lineTo(-0.28, 2.40);
  top_strap_shape.bezierCurveTo(-0.45, 2.38, -0.58, 2.28, -0.58, 2.10);
  top_strap_shape.closePath();

  const top_strap_geom = new THREE.ExtrudeGeometry(top_strap_shape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  const top_strap = new THREE.Mesh(top_strap_geom, leather_mat);
  top_strap.name = "top_strap";
  top_strap.position.z = -0.30;
  root.add(top_strap);

  const bottom_strap_shape = new THREE.Shape();
  bottom_strap_shape.moveTo(-0.62, -0.72);
  bottom_strap_shape.lineTo(-0.58, -2.10);
  bottom_strap_shape.bezierCurveTo(-0.58, -2.28, -0.45, -2.38, -0.28, -2.40);
  bottom_strap_shape.lineTo(0.28, -2.40);
  bottom_strap_shape.bezierCurveTo(0.45, -2.38, 0.58, -2.28, 0.58, -2.10);
  bottom_strap_shape.lineTo(0.62, -0.72);
  bottom_strap_shape.closePath();

  const bottom_strap_geom = new THREE.ExtrudeGeometry(bottom_strap_shape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  const bottom_strap = new THREE.Mesh(bottom_strap_geom, leather_mat);
  bottom_strap.name = "bottom_strap";
  bottom_strap.position.z = -0.30;
  root.add(bottom_strap);

  const top_strap_panel_shape = new THREE.Shape();
  top_strap_panel_shape.moveTo(-0.39, 0.91);
  top_strap_panel_shape.lineTo(0.39, 0.91);
  top_strap_panel_shape.lineTo(0.37, 2.10);
  top_strap_panel_shape.bezierCurveTo(0.37, 2.22, 0.29, 2.29, 0.20, 2.31);
  top_strap_panel_shape.lineTo(-0.20, 2.31);
  top_strap_panel_shape.bezierCurveTo(-0.29, 2.29, -0.37, 2.22, -0.37, 2.10);
  top_strap_panel_shape.closePath();

  const top_strap_panel_geom = new THREE.ExtrudeGeometry(top_strap_panel_shape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  const top_strap_panel = new THREE.Mesh(top_strap_panel_geom, leather_panel_mat);
  top_strap_panel.name = "top_strap_panel";
  top_strap_panel.position.z = -0.095;
  root.add(top_strap_panel);

  const bottom_strap_panel_shape = new THREE.Shape();
  bottom_strap_panel_shape.moveTo(-0.39, -0.91);
  bottom_strap_panel_shape.lineTo(-0.37, -2.10);
  bottom_strap_panel_shape.bezierCurveTo(-0.37, -2.22, -0.29, -2.29, -0.20, -2.31);
  bottom_strap_panel_shape.lineTo(0.20, -2.31);
  bottom_strap_panel_shape.bezierCurveTo(0.29, -2.29, 0.37, -2.22, 0.37, -2.10);
  bottom_strap_panel_shape.lineTo(0.39, -0.91);
  bottom_strap_panel_shape.closePath();

  const bottom_strap_panel_geom = new THREE.ExtrudeGeometry(bottom_strap_panel_shape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  const bottom_strap_panel = new THREE.Mesh(bottom_strap_panel_geom, leather_panel_mat);
  bottom_strap_panel.name = "bottom_strap_panel";
  bottom_strap_panel.position.z = -0.095;
  root.add(bottom_strap_panel);

  const strap_stitches_geom = new THREE.BoxGeometry(0.035, 0.105, 0.018);
  const strap_stitches = new THREE.InstancedMesh(strap_stitches_geom, stitch_mat, 24);
  strap_stitches.name = "strap_stitches";
  const stitch_dummy = new THREE.Object3D();
  let stitch_index = 0;
  for (let i = 0; i < 12; i++) {
    const y = 1.08 + i * 0.095;
    const x = 0.47 - i * 0.003;
    for (const side of [-1, 1]) {
      stitch_dummy.position.set(side * x, y, -0.055);
      stitch_dummy.rotation.set(0, 0, side * 0.02);
      stitch_dummy.scale.set(1, 1, 1);
      stitch_dummy.updateMatrix();
      strap_stitches.setMatrixAt(stitch_index++, stitch_dummy.matrix);
    }
  }
  strap_stitches.instanceMatrix.needsUpdate = true;
  root.add(strap_stitches);

  const bottom_strap_stitches = new THREE.InstancedMesh(strap_stitches_geom, stitch_mat, 24);
  bottom_strap_stitches.name = "bottom_strap_stitches";
  stitch_index = 0;
  for (let i = 0; i < 12; i++) {
    const y = -1.08 - i * 0.095;
    const x = 0.47 - i * 0.003;
    for (const side of [-1, 1]) {
      stitch_dummy.position.set(side * x, y, -0.055);
      stitch_dummy.rotation.set(0, 0, -side * 0.02);
      stitch_dummy.scale.set(1, 1, 1);
      stitch_dummy.updateMatrix();
      bottom_strap_stitches.setMatrixAt(stitch_index++, stitch_dummy.matrix);
    }
  }
  bottom_strap_stitches.instanceMatrix.needsUpdate = true;
  root.add(bottom_strap_stitches);

  const strap_center_creases_geom = new THREE.BoxGeometry(0.66, 0.018, 0.018);
  const strap_center_creases = new THREE.InstancedMesh(
    strap_center_creases_geom,
    leather_mat,
    8
  );
  strap_center_creases.name = "strap_center_creases";
  const crease_positions = [1.02, 1.42, 1.88, 2.20, -1.02, -1.42, -1.88, -2.20];
  for (let i = 0; i < crease_positions.length; i++) {
    stitch_dummy.position.set(0, crease_positions[i], -0.052);
    stitch_dummy.rotation.set(0, 0, 0);
    stitch_dummy.scale.set(1, 1, 1);
    stitch_dummy.updateMatrix();
    strap_center_creases.setMatrixAt(i, stitch_dummy.matrix);
  }
  strap_center_creases.instanceMatrix.needsUpdate = true;
  root.add(strap_center_creases);

  const top_right_lug_shape = new THREE.Shape();
  top_right_lug_shape.moveTo(0.66, 0.70);
  top_right_lug_shape.lineTo(1.02, 0.70);
  top_right_lug_shape.lineTo(0.88, 1.28);
  top_right_lug_shape.lineTo(0.57, 1.35);
  top_right_lug_shape.lineTo(0.48, 1.08);
  top_right_lug_shape.closePath();

  const top_right_lug_geom = new THREE.ExtrudeGeometry(top_right_lug_shape, {
    depth: 0.30,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const top_right_lug = new THREE.Mesh(top_right_lug_geom, polished_metal_mat);
  top_right_lug.name = "top_right_lug";
  top_right_lug.position.z = -0.18;
  root.add(top_right_lug);

  const top_left_lug = new THREE.Mesh(top_right_lug_geom, polished_metal_mat);
  top_left_lug.name = "top_left_lug";
  top_left_lug.scale.x = -1;
  top_left_lug.position.z = -0.18;
  root.add(top_left_lug);

  const bottom_right_lug = new THREE.Mesh(top_right_lug_geom, polished_metal_mat);
  bottom_right_lug.name = "bottom_right_lug";
  bottom_right_lug.scale.y = -1;
  bottom_right_lug.position.z = -0.18;
  root.add(bottom_right_lug);

  const bottom_left_lug = new THREE.Mesh(top_right_lug_geom, polished_metal_mat);
  bottom_left_lug.name = "bottom_left_lug";
  bottom_left_lug.scale.set(-1, -1, 1);
  bottom_left_lug.position.z = -0.18;
  root.add(bottom_left_lug);

  const case_body_geom = new THREE.CylinderGeometry(1.44, 1.44, 0.34, 64);
  const case_body = new THREE.Mesh(case_body_geom, polished_metal_mat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  case_body.position.z = -0.02;
  root.add(case_body);

  const case_back_geom = new THREE.CylinderGeometry(1.36, 1.36, 0.10, 64);
  const case_back = new THREE.Mesh(case_back_geom, silver_metal_mat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.22;
  root.add(case_back);

  const bezel_plate_geom = new THREE.RingGeometry(1.17, 1.43, 64);
  const bezel_plate = new THREE.Mesh(bezel_plate_geom, polished_metal_mat);
  bezel_plate.name = "bezel_plate";
  bezel_plate.position.z = 0.17;
  root.add(bezel_plate);

  const outer_bezel_geom = new THREE.TorusGeometry(1.34, 0.09, 12, 64);
  const outer_bezel = new THREE.Mesh(outer_bezel_geom, polished_metal_mat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.20;
  root.add(outer_bezel);

  const inner_bezel_geom = new THREE.TorusGeometry(1.19, 0.035, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezel_geom, silver_metal_mat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.225;
  root.add(inner_bezel);

  const dial_geom = new THREE.CircleGeometry(1.18, 64);
  const dial = new THREE.Mesh(dial_geom, dial_mat);
  dial.name = "dial";
  dial.position.z = 0.185;
  root.add(dial);

  const dial_border_geom = new THREE.RingGeometry(1.125, 1.175, 64);
  const dial_border = new THREE.Mesh(dial_border_geom, subdial_mat);
  dial_border.name = "dial_border";
  dial_border.position.z = 0.205;
  root.add(dial_border);

  const chapter_ring_geom = new THREE.RingGeometry(1.025, 1.145, 64);
  const chapter_ring = new THREE.Mesh(chapter_ring_geom, subdial_mat);
  chapter_ring.name = "chapter_ring";
  chapter_ring.position.z = 0.215;
  root.add(chapter_ring);

  const minute_ticks_geom = new THREE.BoxGeometry(0.012, 0.065, 0.012);
  const minute_ticks = new THREE.InstancedMesh(minute_ticks_geom, marking_mat, 60);
  minute_ticks.name = "minute_ticks";
  const dial_dummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const major = i % 5 === 0;
    dial_dummy.position.set(Math.sin(angle) * 1.085, Math.cos(angle) * 1.085, 0.235);
    dial_dummy.rotation.set(0, 0, -angle);
    dial_dummy.scale.set(major ? 1.8 : 1, major ? 1.45 : 0.72, 1);
    dial_dummy.updateMatrix();
    minute_ticks.setMatrixAt(i, dial_dummy.matrix);
  }
  minute_ticks.instanceMatrix.needsUpdate = true;
  root.add(minute_ticks);

  const hour_markers_geom = new THREE.BoxGeometry(0.055, 0.17, 0.018);
  const hour_markers = new THREE.InstancedMesh(hour_markers_geom, marking_mat, 12);
  hour_markers.name = "hour_markers";
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    dial_dummy.position.set(Math.sin(angle) * 0.955, Math.cos(angle) * 0.955, 0.242);
    dial_dummy.rotation.set(0, 0, -angle);
    dial_dummy.scale.set(i % 3 === 0 ? 1.35 : 1, i === 0 ? 1.25 : 1, 1);
    dial_dummy.updateMatrix();
    hour_markers.setMatrixAt(i, dial_dummy.matrix);
  }
  hour_markers.instanceMatrix.needsUpdate = true;
  root.add(hour_markers);

  const upper_subdial_geom = new THREE.CircleGeometry(0.47, 48);
  const upper_subdial = new THREE.Mesh(upper_subdial_geom, subdial_mat);
  upper_subdial.name = "upper_subdial";
  upper_subdial.position.set(0, 0.55, 0.225);
  root.add(upper_subdial);

  const left_subdial_geom = new THREE.CircleGeometry(0.35, 48);
  const left_subdial = new THREE.Mesh(left_subdial_geom, subdial_mat);
  left_subdial.name = "left_subdial";
  left_subdial.position.set(-0.53, -0.20, 0.225);
  root.add(left_subdial);

  const right_subdial = new THREE.Mesh(left_subdial_geom, subdial_mat);
  right_subdial.name = "right_subdial";
  right_subdial.position.set(0.53, -0.20, 0.225);
  root.add(right_subdial);

  const upper_subdial_ring_geom = new THREE.RingGeometry(0.435, 0.47, 48);
  const upper_subdial_ring = new THREE.Mesh(upper_subdial_ring_geom, marking_mat);
  upper_subdial_ring.name = "upper_subdial_ring";
  upper_subdial_ring.position.set(0, 0.55, 0.239);
  root.add(upper_subdial_ring);

  const lower_subdial_ring_geom = new THREE.RingGeometry(0.32, 0.35, 48);
  const left_subdial_ring = new THREE.Mesh(lower_subdial_ring_geom, marking_mat);
  left_subdial_ring.name = "left_subdial_ring";
  left_subdial_ring.position.set(-0.53, -0.20, 0.239);
  root.add(left_subdial_ring);

  const right_subdial_ring = new THREE.Mesh(lower_subdial_ring_geom, marking_mat);
  right_subdial_ring.name = "right_subdial_ring";
  right_subdial_ring.position.set(0.53, -0.20, 0.239);
  root.add(right_subdial_ring);

  const upper_subdial_ticks_geom = new THREE.BoxGeometry(0.012, 0.055, 0.01);
  const upper_subdial_ticks = new THREE.InstancedMesh(
    upper_subdial_ticks_geom,
    marking_mat,
    30
  );
  upper_subdial_ticks.name = "upper_subdial_ticks";
  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2;
    dial_dummy.position.set(
      Math.sin(angle) * 0.395,
      0.55 + Math.cos(angle) * 0.395,
      0.247
    );
    dial_dummy.rotation.set(0, 0, -angle);
    dial_dummy.scale.set(i % 5 === 0 ? 1.5 : 1, i % 5 === 0 ? 1.25 : 0.75, 1);
    dial_dummy.updateMatrix();
    upper_subdial_ticks.setMatrixAt(i, dial_dummy.matrix);
  }
  upper_subdial_ticks.instanceMatrix.needsUpdate = true;
  root.add(upper_subdial_ticks);

  const lower_subdial_ticks_geom = new THREE.BoxGeometry(0.010, 0.045, 0.01);
  const lower_subdial_ticks = new THREE.InstancedMesh(
    lower_subdial_ticks_geom,
    marking_mat,
    40
  );
  lower_subdial_ticks.name = "lower_subdial_ticks";
  let lower_tick_index = 0;
  for (const center_x of [-0.53, 0.53]) {
    for (let i = 0; i < 20; i++) {
      const angle = i / 20 * Math.PI * 2;
      dial_dummy.position.set(
        center_x + Math.sin(angle) * 0.287,
        -0.20 + Math.cos(angle) * 0.287,
        0.247
      );
      dial_dummy.rotation.set(0, 0, -angle);
      dial_dummy.scale.set(i % 4 === 0 ? 1.5 : 1, i % 4 === 0 ? 1.2 : 0.75, 1);
      dial_dummy.updateMatrix();
      lower_subdial_ticks.setMatrixAt(lower_tick_index++, dial_dummy.matrix);
    }
  }
  lower_subdial_ticks.instanceMatrix.needsUpdate = true;
  root.add(lower_subdial_ticks);

  const upper_subdial_hand_geom = new THREE.BoxGeometry(0.025, 0.36, 0.014);
  const upper_subdial_hand = new THREE.Mesh(upper_subdial_hand_geom, hand_mat);
  upper_subdial_hand.name = "upper_subdial_hand";
  upper_subdial_hand.position.set(0, 0.55, 0.263);
  upper_subdial_hand.rotation.z = -0.38;
  root.add(upper_subdial_hand);

  const left_subdial_hand_geom = new THREE.BoxGeometry(0.022, 0.27, 0.014);
  const left_subdial_hand = new THREE.Mesh(left_subdial_hand_geom, hand_mat);
  left_subdial_hand.name = "left_subdial_hand";
  left_subdial_hand.position.set(-0.53, -0.20, 0.263);
  left_subdial_hand.rotation.z = 0.78;
  root.add(left_subdial_hand);

  const right_subdial_hand = new THREE.Mesh(left_subdial_hand_geom, hand_mat);
  right_subdial_hand.name = "right_subdial_hand";
  right_subdial_hand.position.set(0.53, -0.20, 0.263);
  right_subdial_hand.rotation.z = -0.08;
  root.add(right_subdial_hand);

  const subdial_pins_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 20);
  const subdial_pins = new THREE.InstancedMesh(subdial_pins_geom, dark_metal_mat, 5);
  subdial_pins.name = "subdial_pins";
  const subdial_pin_positions = [
    [-0.25, 0.47],
    [0.25, 0.47],
    [-0.53, -0.20],
    [0.53, -0.20],
    [0, 0.78],
  ];
  for (let i = 0; i < subdial_pin_positions.length; i++) {
    dial_dummy.position.set(
      subdial_pin_positions[i][0],
      subdial_pin_positions[i][1],
      0.272
    );
    dial_dummy.rotation.set(Math.PI / 2, 0, 0);
    dial_dummy.scale.set(1, 1, 1);
    dial_dummy.updateMatrix();
    subdial_pins.setMatrixAt(i, dial_dummy.matrix);
  }
  subdial_pins.instanceMatrix.needsUpdate = true;
  root.add(subdial_pins);

  const aperture_geom = new THREE.CircleGeometry(0.39, 48);
  const tourbillon_aperture = new THREE.Mesh(aperture_geom, marking_mat);
  tourbillon_aperture.name = "tourbillon_aperture";
  tourbillon_aperture.position.set(0, -0.69, 0.225);
  root.add(tourbillon_aperture);

  const tourbillon_inner_geom = new THREE.CircleGeometry(0.345, 48);
  const tourbillon_inner = new THREE.Mesh(tourbillon_inner_geom, dark_metal_mat);
  tourbillon_inner.name = "tourbillon_inner";
  tourbillon_inner.position.set(0, -0.69, 0.238);
  root.add(tourbillon_inner);

  const tourbillon_ring_geom = new THREE.RingGeometry(0.315, 0.365, 48);
  const tourbillon_ring = new THREE.Mesh(tourbillon_ring_geom, silver_metal_mat);
  tourbillon_ring.name = "tourbillon_ring";
  tourbillon_ring.position.set(0, -0.69, 0.252);
  root.add(tourbillon_ring);

  const mechanism_gears_geom = new THREE.TorusGeometry(0.075, 0.014, 8, 24);
  const mechanism_gears = new THREE.InstancedMesh(
    mechanism_gears_geom,
    brushed_metal_mat,
    3
  );
  mechanism_gears.name = "mechanism_gears";
  const gear_positions = [
    [-0.19, -0.73, 1.0],
    [0.18, -0.61, 0.82],
    [0.13, -0.84, 0.72],
  ];
  for (let i = 0; i < gear_positions.length; i++) {
    dial_dummy.position.set(gear_positions[i][0], gear_positions[i][1], 0.264);
    dial_dummy.rotation.set(0, 0, i * 0.45);
    dial_dummy.scale.setScalar(gear_positions[i][2]);
    dial_dummy.updateMatrix();
    mechanism_gears.setMatrixAt(i, dial_dummy.matrix);
  }
  mechanism_gears.instanceMatrix.needsUpdate = true;
  root.add(mechanism_gears);

  const tourbillon_spokes_geom = new THREE.BoxGeometry(0.035, 0.26, 0.018);
  const tourbillon_spokes = new THREE.InstancedMesh(
    tourbillon_spokes_geom,
    silver_metal_mat,
    6
  );
  tourbillon_spokes.name = "tourbillon_spokes";
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    dial_dummy.position.set(
      Math.sin(angle) * 0.13,
      -0.69 + Math.cos(angle) * 0.13,
      0.274
    );
    dial_dummy.rotation.set(0, 0, -angle);
    dial_dummy.scale.set(1, 1, 1);
    dial_dummy.updateMatrix();
    tourbillon_spokes.setMatrixAt(i, dial_dummy.matrix);
  }
  tourbillon_spokes.instanceMatrix.needsUpdate = true;
  root.add(tourbillon_spokes);

  const tourbillon_center_geom = new THREE.CylinderGeometry(0.115, 0.115, 0.035, 24);
  const tourbillon_center = new THREE.Mesh(tourbillon_center_geom, polished_metal_mat);
  tourbillon_center.name = "tourbillon_center";
  tourbillon_center.rotation.x = Math.PI / 2;
  tourbillon_center.position.set(0, -0.69, 0.286);
  root.add(tourbillon_center);

  const tourbillon_jewel_geom = new THREE.CylinderGeometry(0.048, 0.048, 0.04, 20);
  const tourbillon_jewel = new THREE.Mesh(tourbillon_jewel_geom, ruby_mat);
  tourbillon_jewel.name = "tourbillon_jewel";
  tourbillon_jewel.rotation.x = Math.PI / 2;
  tourbillon_jewel.position.set(0, -0.69, 0.308);
  root.add(tourbillon_jewel);

  const upper_jewel_geom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 20);
  const upper_jewel = new THREE.Mesh(upper_jewel_geom, ruby_mat);
  upper_jewel.name = "upper_jewel";
  upper_jewel.rotation.x = Math.PI / 2;
  upper_jewel.position.set(0, -0.40, 0.275);
  root.add(upper_jewel);

  const mechanism_screws_geom = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16);
  const mechanism_screws = new THREE.InstancedMesh(
    mechanism_screws_geom,
    silver_metal_mat,
    4
  );
  mechanism_screws.name = "mechanism_screws";
  const screw_positions = [
    [-0.25, -0.84],
    [0.25, -0.84],
    [-0.27, -0.57],
    [0.27, -0.57],
  ];
  for (let i = 0; i < screw_positions.length; i++) {
    dial_dummy.position.set(screw_positions[i][0], screw_positions[i][1], 0.282);
    dial_dummy.rotation.set(Math.PI / 2, 0, 0);
    dial_dummy.scale.set(1, 1, 1);
    dial_dummy.updateMatrix();
    mechanism_screws.setMatrixAt(i, dial_dummy.matrix);
  }
  mechanism_screws.instanceMatrix.needsUpdate = true;
  root.add(mechanism_screws);

  const brand_glyphs = {
    B: ["110", "101", "110", "101", "110"],
    R: ["110", "101", "110", "101", "101"],
    A: ["010", "101", "111", "101", "101"],
    N: ["101", "111", "111", "111", "101"],
    C: ["111", "100", "100", "100", "111"],
    U: ["101", "101", "101", "101", "111"],
    I: ["111", "010", "010", "010", "111"],
    E: ["111", "100", "110", "100", "111"],
    L: ["100", "100", "100", "100", "111"],
    T: ["111", "010", "010", "010", "010"],
  };
  const brand_lines = [
    { text: "BRANCUER", y: 0.18 },
    { text: "EIELLET", y: -0.01 },
  ];
  const brand_cells = [];
  for (const line of brand_lines) {
    const cell = 0.022;
    const width = (line.text.length * 4 - 1) * cell;
    for (let letter_index = 0; letter_index < line.text.length; letter_index++) {
      const glyph = brand_glyphs[line.text[letter_index]];
      for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 3; column++) {
          if (glyph[row][column] === "1") {
            brand_cells.push({
              x: -width / 2 + (letter_index * 4 + column + 0.5) * cell,
              y: line.y + (2 - row) * cell,
            });
          }
        }
      }
    }
  }

  const brand_wordmark_geom = new THREE.BoxGeometry(0.017, 0.017, 0.009);
  const brand_wordmark = new THREE.InstancedMesh(
    brand_wordmark_geom,
    marking_mat,
    brand_cells.length
  );
  brand_wordmark.name = "brand_wordmark";
  for (let i = 0; i < brand_cells.length; i++) {
    dial_dummy.position.set(brand_cells[i].x, brand_cells[i].y, 0.258);
    dial_dummy.rotation.set(0, 0, 0);
    dial_dummy.scale.set(1, 1, 1);
    dial_dummy.updateMatrix();
    brand_wordmark.setMatrixAt(i, dial_dummy.matrix);
  }
  brand_wordmark.instanceMatrix.needsUpdate = true;
  root.add(brand_wordmark);

  const hour_hand_shape = new THREE.Shape();
  hour_hand_shape.moveTo(-0.055, -0.12);
  hour_hand_shape.lineTo(-0.075, 0.13);
  hour_hand_shape.lineTo(-0.040, 0.58);
  hour_hand_shape.lineTo(0, 0.72);
  hour_hand_shape.lineTo(0.040, 0.58);
  hour_hand_shape.lineTo(0.075, 0.13);
  hour_hand_shape.lineTo(0.055, -0.12);
  hour_hand_shape.closePath();

  const hour_hand_geom = new THREE.ExtrudeGeometry(hour_hand_shape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const hour_hand = new THREE.Mesh(hour_hand_geom, hand_mat);
  hour_hand.name = "hour_hand";
  hour_hand.position.z = 0.286;
  hour_hand.rotation.z = 0.88;
  root.add(hour_hand);

  const minute_hand_shape = new THREE.Shape();
  minute_hand_shape.moveTo(-0.040, -0.13);
  minute_hand_shape.lineTo(-0.052, 0.15);
  minute_hand_shape.lineTo(-0.025, 0.82);
  minute_hand_shape.lineTo(0, 0.98);
  minute_hand_shape.lineTo(0.025, 0.82);
  minute_hand_shape.lineTo(0.052, 0.15);
  minute_hand_shape.lineTo(0.040, -0.13);
  minute_hand_shape.closePath();

  const minute_hand_geom = new THREE.ExtrudeGeometry(minute_hand_shape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const minute_hand = new THREE.Mesh(minute_hand_geom, hand_mat);
  minute_hand.name = "minute_hand";
  minute_hand.position.z = 0.300;
  minute_hand.rotation.z = -0.82;
  root.add(minute_hand);

  const second_hand_geom = new THREE.BoxGeometry(0.014, 1.16, 0.012);
  const second_hand = new THREE.Mesh(second_hand_geom, red_mat);
  second_hand.name = "second_hand";
  second_hand.position.set(0, 0.44, 0.326);
  second_hand.rotation.z = -0.015;
  root.add(second_hand);

  const second_hand_counterweight_geom = new THREE.CircleGeometry(0.055, 20);
  const second_hand_counterweight = new THREE.Mesh(
    second_hand_counterweight_geom,
    red_mat
  );
  second_hand_counterweight.name = "second_hand_counterweight";
  second_hand_counterweight.position.set(0.010, -0.13, 0.329);
  root.add(second_hand_counterweight);

  const center_pin_geom = new THREE.CylinderGeometry(0.095, 0.095, 0.035, 24);
  const center_pin = new THREE.Mesh(center_pin_geom, dark_metal_mat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.z = 0.335;
  root.add(center_pin);

  const center_cap_geom = new THREE.CylinderGeometry(0.037, 0.037, 0.04, 20);
  const center_cap = new THREE.Mesh(center_cap_geom, ruby_mat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.354;
  root.add(center_cap);

  const crown_stem_geom = new THREE.CylinderGeometry(0.085, 0.085, 0.20, 24);
  const crown_stem = new THREE.Mesh(crown_stem_geom, dark_metal_mat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(1.47, 0, -0.02);
  root.add(crown_stem);

  const crown_geom = new THREE.CylinderGeometry(0.18, 0.18, 0.25, 32);
  const crown = new THREE.Mesh(crown_geom, polished_metal_mat);
  crown.name = "crown";
  crown.rotation.z = Math.PI / 2;
  crown.position.set(1.65, 0, -0.02);
  root.add(crown);

  const crown_ridges_geom = new THREE.BoxGeometry(0.25, 0.018, 0.035);
  const crown_ridges = new THREE.InstancedMesh(
    crown_ridges_geom,
    silver_metal_mat,
    20
  );
  crown_ridges.name = "crown_ridges";
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    dial_dummy.position.set(
      1.65,
      Math.cos(angle) * 0.18,
      -0.02 + Math.sin(angle) * 0.18
    );
    dial_dummy.rotation.set(angle, 0, 0);
    dial_dummy.scale.set(1, 1, 1);
    dial_dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, dial_dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  root.add(crown_ridges);

  const crown_cap_geom = new THREE.CylinderGeometry(0.145, 0.145, 0.035, 32);
  const crown_cap = new THREE.Mesh(crown_cap_geom, silver_metal_mat);
  crown_cap.name = "crown_cap";
  crown_cap.rotation.z = Math.PI / 2;
  crown_cap.position.set(1.79, 0, -0.02);
  root.add(crown_cap);

  const pusher_stem_geom = new THREE.CylinderGeometry(0.075, 0.075, 0.20, 20);
  const pusher_geom = new THREE.CylinderGeometry(0.135, 0.135, 0.23, 28);
  const pusher_cap_geom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 24);

  const upper_pusher_stem = new THREE.Mesh(pusher_stem_geom, dark_metal_mat);
  upper_pusher_stem.name = "upper_pusher_stem";
  upper_pusher_stem.rotation.z = Math.PI / 2;
  upper_pusher_stem.position.set(1.47, 0.62, -0.02);
  root.add(upper_pusher_stem);

  const upper_pusher = new THREE.Mesh(pusher_geom, polished_metal_mat);
  upper_pusher.name = "upper_pusher";
  upper_pusher.rotation.z = Math.PI / 2;
  upper_pusher.position.set(1.62, 0.62, -0.02);
  root.add(upper_pusher);

  const upper_pusher_cap = new THREE.Mesh(pusher_cap_geom, silver_metal_mat);
  upper_pusher_cap.name = "upper_pusher_cap";
  upper_pusher_cap.rotation.z = Math.PI / 2;
  upper_pusher_cap.position.set(1.75, 0.62, -0.02);
  root.add(upper_pusher_cap);

  const lower_pusher_stem = new THREE.Mesh(pusher_stem_geom, dark_metal_mat);
  lower_pusher_stem.name = "lower_pusher_stem";
  lower_pusher_stem.rotation.z = Math.PI / 2;
  lower_pusher_stem.position.set(1.47, -0.67, -0.02);
  root.add(lower_pusher_stem);

  const lower_pusher = new THREE.Mesh(pusher_geom, polished_metal_mat);
  lower_pusher.name = "lower_pusher";
  lower_pusher.rotation.z = Math.PI / 2;
  lower_pusher.position.set(1.62, -0.67, -0.02);
  root.add(lower_pusher);

  const lower_pusher_cap = new THREE.Mesh(pusher_cap_geom, silver_metal_mat);
  lower_pusher_cap.name = "lower_pusher_cap";
  lower_pusher_cap.rotation.z = Math.PI / 2;
  lower_pusher_cap.position.set(1.75, -0.67, -0.02);
  root.add(lower_pusher_cap);

  const crystal_geom = new THREE.CircleGeometry(1.18, 64);
  const crystal = new THREE.Mesh(crystal_geom, glass_mat);
  crystal.name = "crystal";
  crystal.position.z = 0.375;
  root.add(crystal);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}