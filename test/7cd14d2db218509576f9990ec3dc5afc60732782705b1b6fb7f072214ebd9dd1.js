export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "food_processor";

  const housing_mat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panel_mat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glossy_black_mat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubber_mat = new THREE.MeshStandardMaterial({
    color: 0x101112,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xe5efed,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const frosted_glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xdce5e3,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const liquid_mat = new THREE.MeshStandardMaterial({
    color: 0xf2bd08,
    metalness: 0.0,
    roughness: 0.7,
  });
  const foam_mat = new THREE.MeshStandardMaterial({
    color: 0xffdc61,
    metalness: 0.0,
    roughness: 0.7,
  });
  const marking_mat = new THREE.MeshStandardMaterial({
    color: 0x344044,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.55,
  });

  function roundedRectangleShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;
    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectangleShape(width, height, radius);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  const motor_base = new THREE.Group();
  motor_base.name = "motor_base";
  root.add(motor_base);

  const base_plinth_geom = roundedExtrudeGeometry(1.02, 0.80, 0.14, 0.10, 0.025);
  const base_plinth = new THREE.Mesh(base_plinth_geom, housing_mat);
  base_plinth.name = "base_plinth";
  base_plinth.rotation.x = Math.PI / 2;
  base_plinth.position.y = 0.10;
  motor_base.add(base_plinth);

  const base_trim_geom = roundedExtrudeGeometry(0.96, 0.74, 0.045, 0.085, 0.012);
  const base_trim = new THREE.Mesh(base_trim_geom, glossy_black_mat);
  base_trim.name = "base_trim";
  base_trim.rotation.x = Math.PI / 2;
  base_trim.position.y = 0.185;
  motor_base.add(base_trim);

  const lower_housing_shape = new THREE.Shape();
  lower_housing_shape.moveTo(-0.42, -0.34);
  lower_housing_shape.lineTo(0.42, -0.34);
  lower_housing_shape.quadraticCurveTo(0.46, -0.34, 0.45, -0.28);
  lower_housing_shape.lineTo(0.37, 0.30);
  lower_housing_shape.quadraticCurveTo(0.36, 0.34, 0.31, 0.34);
  lower_housing_shape.lineTo(-0.31, 0.34);
  lower_housing_shape.quadraticCurveTo(-0.36, 0.34, -0.37, 0.30);
  lower_housing_shape.lineTo(-0.45, -0.28);
  lower_housing_shape.quadraticCurveTo(-0.46, -0.34, -0.42, -0.34);
  lower_housing_shape.closePath();

  const lower_housing_geom = new THREE.ExtrudeGeometry(lower_housing_shape, {
    depth: 0.64,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  lower_housing_geom.translate(0, 0, -0.32);

  const lower_housing = new THREE.Mesh(lower_housing_geom, housing_mat);
  lower_housing.name = "lower_housing";
  lower_housing.position.y = 0.50;
  motor_base.add(lower_housing);

  const rubber_feet_geom = new THREE.CylinderGeometry(0.055, 0.058, 0.045, 20);
  const rubber_feet = new THREE.InstancedMesh(rubber_feet_geom, rubber_mat, 4);
  rubber_feet.name = "rubber_feet";
  const foot_positions = [
    [-0.39, 0.018, 0.28],
    [0.39, 0.018, 0.28],
    [-0.39, 0.018, -0.28],
    [0.39, 0.018, -0.28],
  ];
  const foot_dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    foot_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    foot_dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, foot_dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  motor_base.add(rubber_feet);

  const control_panel_group = new THREE.Group();
  control_panel_group.name = "control_panel_group";
  control_panel_group.position.set(0.17, 0.49, 0.345);
  control_panel_group.rotation.x = -0.10;
  motor_base.add(control_panel_group);

  const control_panel_shape = new THREE.Shape();
  control_panel_shape.moveTo(-0.17, -0.27);
  control_panel_shape.lineTo(0.17, -0.27);
  control_panel_shape.lineTo(0.14, 0.27);
  control_panel_shape.lineTo(-0.14, 0.27);
  control_panel_shape.closePath();

  const control_panel_geom = new THREE.ExtrudeGeometry(control_panel_shape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  control_panel_geom.translate(0, 0, -0.0125);

  const control_panel = new THREE.Mesh(control_panel_geom, panel_mat);
  control_panel.name = "control_panel";
  control_panel_group.add(control_panel);

  const brand_badge_geom = new THREE.BoxGeometry(0.16, 0.055, 0.012);
  const brand_badge = new THREE.Mesh(brand_badge_geom, glossy_black_mat);
  brand_badge.name = "brand_badge";
  brand_badge.position.set(0, 0.19, 0.025);
  control_panel_group.add(brand_badge);

  const brand_marks_geom = new THREE.BoxGeometry(0.012, 0.027, 0.006);
  const brand_marks = new THREE.InstancedMesh(brand_marks_geom, silver_mat, 5);
  brand_marks.name = "brand_marks";
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    brand_dummy.position.set(-0.052 + i * 0.026, 0.19, 0.034);
    brand_dummy.scale.set(1, i === 0 || i === 4 ? 0.72 : 1, 1);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, brand_dummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  control_panel_group.add(brand_marks);

  const speed_indicator_geom = new THREE.ConeGeometry(0.012, 0.025, 3);
  const speed_indicator = new THREE.Mesh(speed_indicator_geom, silver_mat);
  speed_indicator.name = "speed_indicator";
  speed_indicator.position.set(0.055, 0.095, 0.034);
  control_panel_group.add(speed_indicator);

  const main_dial_ring_geom = new THREE.TorusGeometry(0.078, 0.012, 10, 32);
  const main_dial_ring = new THREE.Mesh(main_dial_ring_geom, glossy_black_mat);
  main_dial_ring.name = "main_dial_ring";
  main_dial_ring.position.set(0.065, -0.075, 0.036);
  control_panel_group.add(main_dial_ring);

  const main_dial_geom = new THREE.CylinderGeometry(0.066, 0.066, 0.042, 28);
  const main_dial = new THREE.Mesh(main_dial_geom, glossy_black_mat);
  main_dial.name = "main_dial";
  main_dial.rotation.x = Math.PI / 2;
  main_dial.position.set(0.065, -0.075, 0.052);
  control_panel_group.add(main_dial);

  const main_dial_cap_geom = new THREE.CylinderGeometry(0.047, 0.047, 0.048, 28);
  const main_dial_cap = new THREE.Mesh(main_dial_cap_geom, housing_mat);
  main_dial_cap.name = "main_dial_cap";
  main_dial_cap.rotation.x = Math.PI / 2;
  main_dial_cap.position.set(0.065, -0.075, 0.077);
  control_panel_group.add(main_dial_cap);

  const secondary_dial_ring_geom = new THREE.TorusGeometry(0.057, 0.009, 10, 28);
  const secondary_dial_ring = new THREE.Mesh(secondary_dial_ring_geom, glossy_black_mat);
  secondary_dial_ring.name = "secondary_dial_ring";
  secondary_dial_ring.position.set(-0.105, -0.11, 0.037);
  control_panel_group.add(secondary_dial_ring);

  const secondary_dial_geom = new THREE.CylinderGeometry(0.049, 0.049, 0.038, 24);
  const secondary_dial = new THREE.Mesh(secondary_dial_geom, glossy_black_mat);
  secondary_dial.name = "secondary_dial";
  secondary_dial.rotation.x = Math.PI / 2;
  secondary_dial.position.set(-0.105, -0.11, 0.054);
  control_panel_group.add(secondary_dial);

  const secondary_dial_cap_geom = new THREE.CylinderGeometry(0.035, 0.035, 0.043, 24);
  const secondary_dial_cap = new THREE.Mesh(secondary_dial_cap_geom, housing_mat);
  secondary_dial_cap.name = "secondary_dial_cap";
  secondary_dial_cap.rotation.x = Math.PI / 2;
  secondary_dial_cap.position.set(-0.105, -0.11, 0.076);
  control_panel_group.add(secondary_dial_cap);

  const bowl_support_geom = new THREE.CylinderGeometry(0.36, 0.41, 0.29, 48);
  const bowl_support = new THREE.Mesh(bowl_support_geom, housing_mat);
  bowl_support.name = "bowl_support";
  bowl_support.position.y = 0.99;
  motor_base.add(bowl_support);

  const support_lower_ring_geom = new THREE.TorusGeometry(0.385, 0.022, 10, 48);
  const support_lower_ring = new THREE.Mesh(support_lower_ring_geom, glossy_black_mat);
  support_lower_ring.name = "support_lower_ring";
  support_lower_ring.rotation.x = Math.PI / 2;
  support_lower_ring.position.y = 0.86;
  motor_base.add(support_lower_ring);

  const bowl_mount_geom = new THREE.CylinderGeometry(0.375, 0.39, 0.075, 48);
  const bowl_mount = new THREE.Mesh(bowl_mount_geom, glossy_black_mat);
  bowl_mount.name = "bowl_mount";
  bowl_mount.position.y = 1.135;
  motor_base.add(bowl_mount);

  const bowl_mount_ring_geom = new THREE.TorusGeometry(0.365, 0.024, 10, 48);
  const bowl_mount_ring = new THREE.Mesh(bowl_mount_ring_geom, glossy_black_mat);
  bowl_mount_ring.name = "bowl_mount_ring";
  bowl_mount_ring.rotation.x = Math.PI / 2;
  bowl_mount_ring.position.y = 1.155;
  motor_base.add(bowl_mount_ring);

  const bowl_assembly = new THREE.Group();
  bowl_assembly.name = "bowl_assembly";
  root.add(bowl_assembly);

  const bowl_floor_geom = new THREE.CylinderGeometry(0.34, 0.325, 0.035, 48);
  const bowl_floor = new THREE.Mesh(bowl_floor_geom, glass_mat);
  bowl_floor.name = "bowl_floor";
  bowl_floor.position.y = 1.17;
  bowl_assembly.add(bowl_floor);

  const bowl_wall_geom = new THREE.CylinderGeometry(0.44, 0.34, 0.55, 48, 1, true);
  const bowl_wall = new THREE.Mesh(bowl_wall_geom, glass_mat);
  bowl_wall.name = "bowl_wall";
  bowl_wall.position.y = 1.425;
  bowl_assembly.add(bowl_wall);

  const bowl_rim_geom = new THREE.TorusGeometry(0.44, 0.014, 10, 56);
  const bowl_rim = new THREE.Mesh(bowl_rim_geom, glass_mat);
  bowl_rim.name = "bowl_rim";
  bowl_rim.rotation.x = Math.PI / 2;
  bowl_rim.position.y = 1.695;
  bowl_assembly.add(bowl_rim);

  const bowl_ribs_geom = new THREE.CylinderGeometry(0.006, 0.006, 0.43, 8);
  const bowl_ribs = new THREE.InstancedMesh(bowl_ribs_geom, frosted_glass_mat, 8);
  bowl_ribs.name = "bowl_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    rib_dummy.position.set(
      Math.sin(angle) * 0.392,
      1.405,
      Math.cos(angle) * 0.392
    );
    rib_dummy.updateMatrix();
    bowl_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  bowl_ribs.instanceMatrix.needsUpdate = true;
  bowl_assembly.add(bowl_ribs);

  const liquid_geom = new THREE.CylinderGeometry(0.405, 0.325, 0.40, 48);
  const liquid = new THREE.Mesh(liquid_geom, liquid_mat);
  liquid.name = "liquid";
  liquid.position.y = 1.36;
  bowl_assembly.add(liquid);

  const liquid_surface_geom = new THREE.CylinderGeometry(0.405, 0.405, 0.014, 48);
  const liquid_surface = new THREE.Mesh(liquid_surface_geom, foam_mat);
  liquid_surface.name = "liquid_surface";
  liquid_surface.position.y = 1.565;
  bowl_assembly.add(liquid_surface);

  const liquid_meniscus_geom = new THREE.TorusGeometry(0.393, 0.011, 8, 48);
  const liquid_meniscus = new THREE.Mesh(liquid_meniscus_geom, foam_mat);
  liquid_meniscus.name = "liquid_meniscus";
  liquid_meniscus.rotation.x = Math.PI / 2;
  liquid_meniscus.position.y = 1.573;
  bowl_assembly.add(liquid_meniscus);

  const measurement_ticks_geom = new THREE.BoxGeometry(0.085, 0.006, 0.005);
  const measurement_ticks = new THREE.InstancedMesh(measurement_ticks_geom, marking_mat, 6);
  measurement_ticks.name = "measurement_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    tick_dummy.position.set(-0.20, 1.235 + i * 0.061, 0.371 + i * 0.008);
    tick_dummy.scale.set(i % 2 === 0 ? 1 : 0.62, 1, 1);
    tick_dummy.updateMatrix();
    measurement_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  measurement_ticks.instanceMatrix.needsUpdate = true;
  bowl_assembly.add(measurement_ticks);

  const pouring_spout_shape = new THREE.Shape();
  pouring_spout_shape.moveTo(-0.65, 0);
  pouring_spout_shape.lineTo(-0.49, -0.045);
  pouring_spout_shape.lineTo(-0.42, -0.025);
  pouring_spout_shape.lineTo(-0.42, 0.025);
  pouring_spout_shape.lineTo(-0.50, 0.045);
  pouring_spout_shape.closePath();

  const pouring_spout_geom = new THREE.ExtrudeGeometry(pouring_spout_shape, {
    depth: 0.105,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  pouring_spout_geom.translate(0, 0, -0.0525);

  const pouring_spout = new THREE.Mesh(pouring_spout_geom, glass_mat);
  pouring_spout.name = "pouring_spout";
  pouring_spout.position.y = 1.69;
  bowl_assembly.add(pouring_spout);

  const handle_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.41, 1.64, 0.0),
    new THREE.Vector3(0.53, 1.64, 0.0),
    new THREE.Vector3(0.64, 1.60, 0.0),
    new THREE.Vector3(0.70, 1.51, 0.0),
    new THREE.Vector3(0.70, 1.31, 0.0),
    new THREE.Vector3(0.67, 1.21, 0.0),
    new THREE.Vector3(0.57, 1.16, 0.0),
    new THREE.Vector3(0.36, 1.17, 0.0),
  ], false, "centripetal");

  const handle_geom = new THREE.TubeGeometry(handle_path, 48, 0.045, 12, false);
  const handle = new THREE.Mesh(handle_geom, glass_mat);
  handle.name = "handle";
  bowl_assembly.add(handle);

  const handle_grip_geom = new THREE.CylinderGeometry(0.052, 0.052, 0.25, 16);
  const handle_grip = new THREE.Mesh(handle_grip_geom, frosted_glass_mat);
  handle_grip.name = "handle_grip";
  handle_grip.position.set(0.70, 1.405, 0);
  bowl_assembly.add(handle_grip);

  const handle_upper_mount_geom = new THREE.CylinderGeometry(0.052, 0.052, 0.15, 16);
  const handle_upper_mount = new THREE.Mesh(handle_upper_mount_geom, glass_mat);
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.rotation.z = Math.PI / 2;
  handle_upper_mount.position.set(0.445, 1.64, 0);
  bowl_assembly.add(handle_upper_mount);

  const handle_lower_mount_geom = new THREE.BoxGeometry(0.19, 0.09, 0.11);
  const handle_lower_mount = new THREE.Mesh(handle_lower_mount_geom, glossy_black_mat);
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.position.set(0.39, 1.17, 0);
  handle_lower_mount.rotation.z = -0.08;
  bowl_assembly.add(handle_lower_mount);

  const blade_shaft_geom = new THREE.CylinderGeometry(0.022, 0.026, 0.47, 16);
  const blade_shaft = new THREE.Mesh(blade_shaft_geom, silver_mat);
  blade_shaft.name = "blade_shaft";
  blade_shaft.position.y = 1.405;
  bowl_assembly.add(blade_shaft);

  const blade_hub_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.065, 20);
  const blade_hub = new THREE.Mesh(blade_hub_geom, glossy_black_mat);
  blade_hub.name = "blade_hub";
  blade_hub.position.y = 1.205;
  bowl_assembly.add(blade_hub);

  const cutting_blades_geom = new THREE.BoxGeometry(0.27, 0.012, 0.045);
  const cutting_blades = new THREE.InstancedMesh(cutting_blades_geom, silver_mat, 2);
  cutting_blades.name = "cutting_blades";
  const blade_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    blade_dummy.position.set(0, 1.22, 0);
    blade_dummy.rotation.set(0, i * Math.PI / 2, i === 0 ? 0.08 : -0.08);
    blade_dummy.updateMatrix();
    cutting_blades.setMatrixAt(i, blade_dummy.matrix);
  }
  cutting_blades.instanceMatrix.needsUpdate = true;
  bowl_assembly.add(cutting_blades);

  const lid_assembly = new THREE.Group();
  lid_assembly.name = "lid_assembly";
  root.add(lid_assembly);

  const lid_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.43, 0.00),
    new THREE.Vector2(0.46, 0.018),
    new THREE.Vector2(0.45, 0.045),
    new THREE.Vector2(0.39, 0.085),
    new THREE.Vector2(0.30, 0.125),
    new THREE.Vector2(0.18, 0.155),
    new THREE.Vector2(0.10, 0.165),
    new THREE.Vector2(0.00, 0.165),
  ];
  const lid_geom = new THREE.LatheGeometry(lid_profile, 48);
  const lid = new THREE.Mesh(lid_geom, glass_mat);
  lid.name = "lid";
  lid.position.y = 1.68;
  lid_assembly.add(lid);

  const lid_rim_geom = new THREE.TorusGeometry(0.45, 0.014, 10, 56);
  const lid_rim = new THREE.Mesh(lid_rim_geom, silver_mat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 1.705;
  lid_assembly.add(lid_rim);

  const feed_tube_geom = new THREE.CylinderGeometry(0.12, 0.12, 0.50, 40);
  const feed_tube = new THREE.Mesh(feed_tube_geom, glossy_black_mat);
  feed_tube.name = "feed_tube";
  feed_tube.position.y = 2.01;
  lid_assembly.add(feed_tube);

  const feed_tube_base_geom = new THREE.CylinderGeometry(0.14, 0.14, 0.065, 40);
  const feed_tube_base = new THREE.Mesh(feed_tube_base_geom, glossy_black_mat);
  feed_tube_base.name = "feed_tube_base";
  feed_tube_base.position.y = 1.81;
  lid_assembly.add(feed_tube_base);

  const feed_tube_lower_collar_geom = new THREE.CylinderGeometry(0.145, 0.145, 0.055, 40);
  const feed_tube_lower_collar = new THREE.Mesh(feed_tube_lower_collar_geom, housing_mat);
  feed_tube_lower_collar.name = "feed_tube_lower_collar";
  feed_tube_lower_collar.position.y = 1.79;
  lid_assembly.add(feed_tube_lower_collar);

  const feed_tube_collar_geom = new THREE.CylinderGeometry(0.15, 0.15, 0.115, 40);
  const feed_tube_collar = new THREE.Mesh(feed_tube_collar_geom, glossy_black_mat);
  feed_tube_collar.name = "feed_tube_collar";
  feed_tube_collar.position.y = 2.245;
  lid_assembly.add(feed_tube_collar);

  const feed_tube_collar_trim_geom = new THREE.TorusGeometry(0.145, 0.012, 8, 40);
  const feed_tube_collar_trim = new THREE.Mesh(feed_tube_collar_trim_geom, housing_mat);
  feed_tube_collar_trim.name = "feed_tube_collar_trim";
  feed_tube_collar_trim.rotation.x = Math.PI / 2;
  feed_tube_collar_trim.position.y = 2.195;
  lid_assembly.add(feed_tube_collar_trim);

  const feed_cap_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.18, 0.00),
    new THREE.Vector2(0.185, 0.025),
    new THREE.Vector2(0.17, 0.065),
    new THREE.Vector2(0.135, 0.105),
    new THREE.Vector2(0.075, 0.132),
    new THREE.Vector2(0.00, 0.142),
  ];
  const feed_cap_geom = new THREE.LatheGeometry(feed_cap_profile, 48);
  const feed_cap = new THREE.Mesh(feed_cap_geom, glossy_black_mat);
  feed_cap.name = "feed_cap";
  feed_cap.position.y = 2.29;
  lid_assembly.add(feed_cap);

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