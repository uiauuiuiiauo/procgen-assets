export default function generate(THREE) {
  const root = new THREE.Group();

  const brown_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x5b4038,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brown_seamMat = new THREE.MeshStandardMaterial({
    color: 0x382722,
    metalness: 0.0,
    roughness: 0.8,
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dark_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const white_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.3,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe4eeee,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const coffeeMat = new THREE.MeshStandardMaterial({
    color: 0x351208,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xe6e6df,
    metalness: 0.0,
    roughness: 0.7,
  });

  function makeRoundedBoxGeometry(width, height, depth, radius, bevel) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const toaster_group = new THREE.Group();
  toaster_group.position.set(-0.82, 0, 0.1);
  root.add(toaster_group);

  const toaster_bodyGeom = makeRoundedBoxGeometry(1.45, 1.25, 0.82, 0.15, 0.035);
  const toaster_body = new THREE.Mesh(toaster_bodyGeom, brown_plasticMat);
  toaster_body.position.set(0, 0.78, 0);
  toaster_group.add(toaster_body);

  const toaster_lower_seamGeom = makeRoundedBoxGeometry(1.39, 0.025, 0.84, 0.012, 0.006);
  const toaster_lower_seam = new THREE.Mesh(toaster_lower_seamGeom, brown_seamMat);
  toaster_lower_seam.position.set(0, 0.17, 0.005);
  toaster_group.add(toaster_lower_seam);

  const toaster_feetGeom = new THREE.CylinderGeometry(0.07, 0.065, 0.11, 16);
  const toaster_feet = new THREE.InstancedMesh(toaster_feetGeom, rubberMat, 4);
  const toaster_foot_positions = [
    [-0.57, 0.055, 0.31],
    [0.57, 0.055, 0.31],
    [-0.57, 0.055, -0.31],
    [0.57, 0.055, -0.31],
  ];
  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < toaster_foot_positions.length; i++) {
    const p = toaster_foot_positions[i];
    instance_dummy.position.set(p[0], p[1], p[2]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    toaster_feet.setMatrixAt(i, instance_dummy.matrix);
  }
  toaster_feet.instanceMatrix.needsUpdate = true;
  toaster_group.add(toaster_feet);

  const toaster_slot_surroundGeom = makeRoundedBoxGeometry(1.08, 0.58, 0.025, 0.09, 0.008);
  const toaster_slot_surround = new THREE.Mesh(toaster_slot_surroundGeom, brown_plasticMat);
  toaster_slot_surround.rotation.x = -Math.PI / 2;
  toaster_slot_surround.position.set(0, 1.425, -0.02);
  toaster_group.add(toaster_slot_surround);

  const toaster_slot_plateGeom = makeRoundedBoxGeometry(0.98, 0.5, 0.025, 0.055, 0.006);
  const toaster_slot_plate = new THREE.Mesh(toaster_slot_plateGeom, silverMat);
  toaster_slot_plate.rotation.x = -Math.PI / 2;
  toaster_slot_plate.position.set(0, 1.445, -0.02);
  toaster_group.add(toaster_slot_plate);

  const toaster_slotsGeom = makeRoundedBoxGeometry(0.36, 0.13, 0.025, 0.045, 0.004);
  const toaster_slots = new THREE.InstancedMesh(toaster_slotsGeom, black_plasticMat, 4);
  const toaster_slot_positions = [
    [-0.23, 1.466, -0.14],
    [0.23, 1.466, -0.14],
    [-0.23, 1.466, 0.11],
    [0.23, 1.466, 0.11],
  ];
  for (let i = 0; i < toaster_slot_positions.length; i++) {
    const p = toaster_slot_positions[i];
    instance_dummy.position.set(p[0], p[1], p[2]);
    instance_dummy.rotation.set(-Math.PI / 2, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    toaster_slots.setMatrixAt(i, instance_dummy.matrix);
  }
  toaster_slots.instanceMatrix.needsUpdate = true;
  toaster_group.add(toaster_slots);

  const toaster_lever_trackGeom = makeRoundedBoxGeometry(0.14, 0.53, 0.025, 0.065, 0.005);
  const toaster_lever_track = new THREE.Mesh(toaster_lever_trackGeom, black_plasticMat);
  toaster_lever_track.position.set(-0.56, 0.87, 0.455);
  toaster_group.add(toaster_lever_track);

  const toaster_lever_stemGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.18, 12);
  const toaster_lever_stem = new THREE.Mesh(toaster_lever_stemGeom, silverMat);
  toaster_lever_stem.rotation.z = Math.PI / 2;
  toaster_lever_stem.position.set(-0.64, 1.12, 0.49);
  toaster_group.add(toaster_lever_stem);

  const toaster_lever_gripGeom = makeRoundedBoxGeometry(0.29, 0.13, 0.18, 0.04, 0.012);
  const toaster_lever_grip = new THREE.Mesh(toaster_lever_gripGeom, black_plasticMat);
  toaster_lever_grip.position.set(-0.72, 1.12, 0.5);
  toaster_group.add(toaster_lever_grip);

  const toaster_small_buttonGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.026, 20);
  const toaster_small_button = new THREE.Mesh(toaster_small_buttonGeom, white_plasticMat);
  toaster_small_button.rotation.x = Math.PI / 2;
  toaster_small_button.position.set(-0.43, 0.29, 0.47);
  toaster_group.add(toaster_small_button);

  const toaster_small_button_rimGeom = new THREE.TorusGeometry(0.057, 0.009, 8, 24);
  const toaster_small_button_rim = new THREE.Mesh(toaster_small_button_rimGeom, black_plasticMat);
  toaster_small_button_rim.position.set(-0.43, 0.29, 0.489);
  toaster_group.add(toaster_small_button_rim);

  const toaster_timer_dialGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.032, 24);
  const toaster_timer_dial = new THREE.Mesh(toaster_timer_dialGeom, silverMat);
  toaster_timer_dial.rotation.x = Math.PI / 2;
  toaster_timer_dial.position.set(0.43, 0.27, 0.475);
  toaster_group.add(toaster_timer_dial);

  const toaster_timer_centerGeom = new THREE.CylinderGeometry(0.061, 0.061, 0.038, 24);
  const toaster_timer_center = new THREE.Mesh(toaster_timer_centerGeom, black_plasticMat);
  toaster_timer_center.rotation.x = Math.PI / 2;
  toaster_timer_center.position.set(0.43, 0.27, 0.492);
  toaster_group.add(toaster_timer_center);

  const toaster_indicatorGeom = new THREE.BoxGeometry(0.035, 0.055, 0.018);
  const toaster_indicator = new THREE.Mesh(toaster_indicatorGeom, black_plasticMat);
  toaster_indicator.position.set(-0.28, 0.27, 0.475);
  toaster_group.add(toaster_indicator);

  const coffee_group = new THREE.Group();
  coffee_group.position.set(0.82, 0, -0.05);
  root.add(coffee_group);

  const coffee_baseGeom = new THREE.CylinderGeometry(0.62, 0.68, 0.22, 48);
  const coffee_base = new THREE.Mesh(coffee_baseGeom, black_plasticMat);
  coffee_base.position.set(0, 0.14, 0);
  coffee_group.add(coffee_base);

  const coffee_base_trimGeom = new THREE.TorusGeometry(0.57, 0.055, 12, 48);
  const coffee_base_trim = new THREE.Mesh(coffee_base_trimGeom, dark_plasticMat);
  coffee_base_trim.rotation.x = Math.PI / 2;
  coffee_base_trim.position.set(0, 0.27, 0);
  coffee_group.add(coffee_base_trim);

  const coffee_feetGeom = new THREE.CylinderGeometry(0.055, 0.06, 0.08, 14);
  const coffee_feet = new THREE.InstancedMesh(coffee_feetGeom, rubberMat, 4);
  const coffee_foot_positions = [
    [-0.43, 0.015, 0.34],
    [0.43, 0.015, 0.34],
    [-0.43, 0.015, -0.34],
    [0.43, 0.015, -0.34],
  ];
  for (let i = 0; i < coffee_foot_positions.length; i++) {
    const p = coffee_foot_positions[i];
    instance_dummy.position.set(p[0], p[1], p[2]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    coffee_feet.setMatrixAt(i, instance_dummy.matrix);
  }
  coffee_feet.instanceMatrix.needsUpdate = true;
  coffee_group.add(coffee_feet);

  const coffee_back_shellGeom = makeRoundedBoxGeometry(1.08, 1.55, 0.42, 0.15, 0.035);
  const coffee_back_shell = new THREE.Mesh(coffee_back_shellGeom, black_plasticMat);
  coffee_back_shell.position.set(0, 1.08, -0.22);
  coffee_group.add(coffee_back_shell);

  const coffee_side_pillarsGeom = makeRoundedBoxGeometry(0.14, 1.3, 0.43, 0.055, 0.018);
  const coffee_side_pillars = new THREE.InstancedMesh(
    coffee_side_pillarsGeom,
    dark_plasticMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.48 : 0.48, 1.12, -0.01);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    coffee_side_pillars.setMatrixAt(i, instance_dummy.matrix);
  }
  coffee_side_pillars.instanceMatrix.needsUpdate = true;
  coffee_group.add(coffee_side_pillars);

  const coffee_brew_recessGeom = makeRoundedBoxGeometry(0.76, 0.78, 0.055, 0.09, 0.012);
  const coffee_brew_recess = new THREE.Mesh(coffee_brew_recessGeom, black_plasticMat);
  coffee_brew_recess.position.set(0, 1.48, 0.025);
  coffee_group.add(coffee_brew_recess);

  const coffee_top_canopyGeom = new THREE.CylinderGeometry(0.58, 0.62, 0.16, 48);
  const coffee_top_canopy = new THREE.Mesh(coffee_top_canopyGeom, dark_plasticMat);
  coffee_top_canopy.position.set(0, 1.87, -0.03);
  coffee_group.add(coffee_top_canopy);

  const coffee_top_rimGeom = new THREE.TorusGeometry(0.54, 0.045, 10, 48);
  const coffee_top_rim = new THREE.Mesh(coffee_top_rimGeom, black_plasticMat);
  coffee_top_rim.rotation.x = Math.PI / 2;
  coffee_top_rim.position.set(0, 1.95, -0.03);
  coffee_group.add(coffee_top_rim);

  const coffee_top_domeGeom = new THREE.SphereGeometry(1, 36, 18);
  const coffee_top_dome = new THREE.Mesh(coffee_top_domeGeom, dark_plasticMat);
  coffee_top_dome.scale.set(0.43, 0.13, 0.35);
  coffee_top_dome.position.set(0, 1.99, 0.08);
  coffee_group.add(coffee_top_dome);

  const coffee_brew_headGeom = new THREE.CylinderGeometry(0.43, 0.38, 0.57, 40);
  const coffee_brew_head = new THREE.Mesh(coffee_brew_headGeom, black_plasticMat);
  coffee_brew_head.position.set(0, 1.5, 0.2);
  coffee_group.add(coffee_brew_head);

  const coffee_head_lidGeom = new THREE.CylinderGeometry(0.45, 0.45, 0.11, 40);
  const coffee_head_lid = new THREE.Mesh(coffee_head_lidGeom, dark_plasticMat);
  coffee_head_lid.position.set(0, 1.82, 0.18);
  coffee_group.add(coffee_head_lid);

  const coffee_head_lid_rimGeom = new THREE.TorusGeometry(0.405, 0.035, 10, 40);
  const coffee_head_lid_rim = new THREE.Mesh(coffee_head_lid_rimGeom, black_plasticMat);
  coffee_head_lid_rim.rotation.x = Math.PI / 2;
  coffee_head_lid_rim.position.set(0, 1.87, 0.18);
  coffee_group.add(coffee_head_lid_rim);

  const coffee_head_indicatorGeom = new THREE.SphereGeometry(0.025, 14, 8);
  const coffee_head_indicator = new THREE.Mesh(coffee_head_indicatorGeom, rubberMat);
  coffee_head_indicator.position.set(0, 1.78, 0.63);
  coffee_group.add(coffee_head_indicator);

  const coffee_nozzleGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.11, 16);
  const coffee_nozzle = new THREE.Mesh(coffee_nozzleGeom, black_plasticMat);
  coffee_nozzle.position.set(0, 1.16, 0.22);
  coffee_group.add(coffee_nozzle);

  const drip_trayGeom = new THREE.CylinderGeometry(0.46, 0.48, 0.075, 40);
  const drip_tray = new THREE.Mesh(drip_trayGeom, black_plasticMat);
  drip_tray.position.set(0, 0.32, 0.1);
  coffee_group.add(drip_tray);

  const drip_tray_ringGeom = new THREE.TorusGeometry(0.37, 0.025, 10, 40);
  const drip_tray_ring = new THREE.Mesh(drip_tray_ringGeom, dark_plasticMat);
  drip_tray_ring.rotation.x = Math.PI / 2;
  drip_tray_ring.position.set(0, 0.365, 0.1);
  coffee_group.add(drip_tray_ring);

  const carafe_group = new THREE.Group();
  carafe_group.position.set(0, 0.34, 0.27);
  coffee_group.add(carafe_group);

  const carafe_profile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.25, 0.0),
    new THREE.Vector2(0.31, 0.035),
    new THREE.Vector2(0.34, 0.12),
    new THREE.Vector2(0.33, 0.27),
    new THREE.Vector2(0.29, 0.42),
    new THREE.Vector2(0.235, 0.55),
    new THREE.Vector2(0.22, 0.62),
    new THREE.Vector2(0.0, 0.62),
  ];
  const carafe_glassGeom = new THREE.LatheGeometry(carafe_profile, 40);
  const carafe_glass = new THREE.Mesh(carafe_glassGeom, glassMat);
  carafe_group.add(carafe_glass);

  const coffee_liquid_profile = [
    new THREE.Vector2(0.0, 0.015),
    new THREE.Vector2(0.235, 0.015),
    new THREE.Vector2(0.295, 0.045),
    new THREE.Vector2(0.315, 0.12),
    new THREE.Vector2(0.305, 0.25),
    new THREE.Vector2(0.285, 0.31),
    new THREE.Vector2(0.0, 0.31),
  ];
  const coffee_liquidGeom = new THREE.LatheGeometry(coffee_liquid_profile, 36);
  const coffee_liquid = new THREE.Mesh(coffee_liquidGeom, coffeeMat);
  carafe_group.add(coffee_liquid);

  const carafe_base_ringGeom = new THREE.TorusGeometry(0.27, 0.026, 10, 36);
  const carafe_base_ring = new THREE.Mesh(carafe_base_ringGeom, black_plasticMat);
  carafe_base_ring.rotation.x = Math.PI / 2;
  carafe_base_ring.position.y = 0.035;
  carafe_group.add(carafe_base_ring);

  const carafe_lidGeom = new THREE.CylinderGeometry(0.25, 0.27, 0.09, 36);
  const carafe_lid = new THREE.Mesh(carafe_lidGeom, black_plasticMat);
  carafe_lid.position.y = 0.62;
  carafe_group.add(carafe_lid);

  const carafe_lid_rimGeom = new THREE.TorusGeometry(0.225, 0.025, 10, 36);
  const carafe_lid_rim = new THREE.Mesh(carafe_lid_rimGeom, dark_plasticMat);
  carafe_lid_rim.rotation.x = Math.PI / 2;
  carafe_lid_rim.position.y = 0.67;
  carafe_group.add(carafe_lid_rim);

  const carafe_spoutGeom = makeRoundedBoxGeometry(0.18, 0.075, 0.11, 0.025, 0.008);
  const carafe_spout = new THREE.Mesh(carafe_spoutGeom, black_plasticMat);
  carafe_spout.position.set(-0.22, 0.65, 0.07);
  carafe_spout.rotation.z = -0.12;
  carafe_group.add(carafe_spout);

  const carafe_handle_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.25, 0.55, 0),
    new THREE.Vector3(0.43, 0.58, 0),
    new THREE.Vector3(0.59, 0.5, 0),
    new THREE.Vector3(0.65, 0.34, 0),
    new THREE.Vector3(0.6, 0.18, 0),
    new THREE.Vector3(0.47, 0.1, 0),
    new THREE.Vector3(0.31, 0.16, 0),
  ]);
  const carafe_handleGeom = new THREE.TubeGeometry(
    carafe_handle_path,
    36,
    0.052,
    12,
    false
  );
  const carafe_handle = new THREE.Mesh(carafe_handleGeom, glassMat);
  carafe_group.add(carafe_handle);

  const carafe_handle_mountsGeom = new THREE.SphereGeometry(1, 16, 10);
  const carafe_handle_mounts = new THREE.InstancedMesh(
    carafe_handle_mountsGeom,
    black_plasticMat,
    2
  );
  const carafe_mount_positions = [
    [0.255, 0.545, 0],
    [0.31, 0.16, 0],
  ];
  for (let i = 0; i < carafe_mount_positions.length; i++) {
    const p = carafe_mount_positions[i];
    instance_dummy.position.set(p[0], p[1], p[2]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(0.07, 0.055, 0.07);
    instance_dummy.updateMatrix();
    carafe_handle_mounts.setMatrixAt(i, instance_dummy.matrix);
  }
  carafe_handle_mounts.instanceMatrix.needsUpdate = true;
  carafe_group.add(carafe_handle_mounts);

  const carafe_measurement_marksGeom = new THREE.BoxGeometry(0.07, 0.012, 0.006);
  const carafe_measurement_marks = new THREE.InstancedMesh(
    carafe_measurement_marksGeom,
    markingMat,
    6
  );
  const mark_data = [
    [-0.12, 0.19, 0.8],
    [-0.12, 0.225, 0.55],
    [-0.12, 0.26, 0.8],
    [0.03, 0.19, 0.55],
    [0.03, 0.225, 0.8],
    [0.03, 0.26, 0.55],
  ];
  for (let i = 0; i < mark_data.length; i++) {
    const p = mark_data[i];
    instance_dummy.position.set(p[0], p[1], 0.326);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(p[2], 1, 1);
    instance_dummy.updateMatrix();
    carafe_measurement_marks.setMatrixAt(i, instance_dummy.matrix);
  }
  carafe_measurement_marks.instanceMatrix.needsUpdate = true;
  carafe_group.add(carafe_measurement_marks);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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