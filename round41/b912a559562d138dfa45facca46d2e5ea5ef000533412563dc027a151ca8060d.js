export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "illuminated_container";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const outer_enclosure = new THREE.Group();
  outer_enclosure.name = "outer_enclosure";
  root.add(outer_enclosure);

  const inner_device = new THREE.Group();
  inner_device.name = "inner_device";
  root.add(inner_device);

  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf2f8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const clear_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce8f5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const blue_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x3268ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const white_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xf2f3f1,
    metalness: 0.0,
    roughness: 0.3
  });

  const pale_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xdfe5eb,
    metalness: 0.0,
    roughness: 0.3
  });

  const blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x2458d6,
    metalness: 0.0,
    roughness: 0.3
  });

  const blue_liquidMat = new THREE.MeshStandardMaterial({
    color: 0x075dff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.86,
    depthWrite: false
  });

  const cyan_chamberMat = new THREE.MeshStandardMaterial({
    color: 0x00d9f2,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.78,
    depthWrite: false
  });

  const cyan_ledMat = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x00ffff,
    emissiveIntensity: 1.0
  });

  const cyan_haloMat = new THREE.MeshStandardMaterial({
    color: 0x00eaff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x00eaff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const base_reservoirProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.53, 0.00),
    new THREE.Vector2(0.63, 0.025),
    new THREE.Vector2(0.70, 0.10),
    new THREE.Vector2(0.735, 0.22),
    new THREE.Vector2(0.74, 0.64),
    new THREE.Vector2(0.71, 0.77),
    new THREE.Vector2(0.64, 0.86),
    new THREE.Vector2(0.00, 0.86)
  ];
  const base_reservoirGeom = new THREE.LatheGeometry(base_reservoirProfile, 64);
  const base_reservoir = new THREE.Mesh(base_reservoirGeom, clear_glassMat);
  base_reservoir.name = "base_reservoir";
  base_reservoir.renderOrder = 2;
  base_assembly.add(base_reservoir);

  const base_floorGeom = new THREE.CylinderGeometry(0.63, 0.66, 0.045, 64);
  const base_floor = new THREE.Mesh(base_floorGeom, clear_edgeMat);
  base_floor.name = "base_floor";
  base_floor.position.y = 0.065;
  base_floor.renderOrder = 3;
  base_assembly.add(base_floor);

  const base_bottom_rimGeom = new THREE.TorusGeometry(0.625, 0.025, 12, 64);
  const base_bottom_rim = new THREE.Mesh(base_bottom_rimGeom, clear_edgeMat);
  base_bottom_rim.name = "base_bottom_rim";
  base_bottom_rim.rotation.x = Math.PI / 2;
  base_bottom_rim.position.y = 0.055;
  base_bottom_rim.renderOrder = 4;
  base_assembly.add(base_bottom_rim);

  const base_upper_rimGeom = new THREE.TorusGeometry(0.675, 0.028, 12, 64);
  const base_upper_rim = new THREE.Mesh(base_upper_rimGeom, clear_edgeMat);
  base_upper_rim.name = "base_upper_rim";
  base_upper_rim.rotation.x = Math.PI / 2;
  base_upper_rim.position.y = 0.805;
  base_upper_rim.renderOrder = 4;
  base_assembly.add(base_upper_rim);

  const base_seam_ringGeom = new THREE.TorusGeometry(0.695, 0.014, 10, 64);
  const base_seam_ring = new THREE.Mesh(base_seam_ringGeom, clear_edgeMat);
  base_seam_ring.name = "base_seam_ring";
  base_seam_ring.rotation.x = Math.PI / 2;
  base_seam_ring.position.y = 0.61;
  base_seam_ring.renderOrder = 4;
  base_assembly.add(base_seam_ring);

  const base_inner_plateGeom = new THREE.CylinderGeometry(0.59, 0.61, 0.045, 64);
  const base_inner_plate = new THREE.Mesh(base_inner_plateGeom, clear_edgeMat);
  base_inner_plate.name = "base_inner_plate";
  base_inner_plate.position.y = 0.83;
  base_inner_plate.renderOrder = 3;
  base_assembly.add(base_inner_plate);

  const outer_chamber_wallGeom = new THREE.CylinderGeometry(
    0.70,
    0.70,
    2.62,
    64,
    1,
    true
  );
  const outer_chamber_wall = new THREE.Mesh(outer_chamber_wallGeom, clear_glassMat);
  outer_chamber_wall.name = "outer_chamber_wall";
  outer_chamber_wall.position.y = 2.105;
  outer_chamber_wall.renderOrder = 2;
  outer_enclosure.add(outer_chamber_wall);

  const outer_lower_flangeGeom = new THREE.TorusGeometry(0.69, 0.036, 12, 64);
  const outer_lower_flange = new THREE.Mesh(outer_lower_flangeGeom, clear_edgeMat);
  outer_lower_flange.name = "outer_lower_flange";
  outer_lower_flange.rotation.x = Math.PI / 2;
  outer_lower_flange.position.y = 0.82;
  outer_lower_flange.renderOrder = 4;
  outer_enclosure.add(outer_lower_flange);

  const outer_lower_shoulderingGeom = new THREE.TorusGeometry(0.655, 0.018, 10, 64);
  const outer_lower_shouldering = new THREE.Mesh(
    outer_lower_shoulderingGeom,
    clear_edgeMat
  );
  outer_lower_shouldering.name = "outer_lower_shouldering";
  outer_lower_shouldering.rotation.x = Math.PI / 2;
  outer_lower_shouldering.position.y = 0.875;
  outer_lower_shouldering.renderOrder = 4;
  outer_enclosure.add(outer_lower_shouldering);

  const outer_upper_flangeGeom = new THREE.TorusGeometry(0.69, 0.038, 12, 64);
  const outer_upper_flange = new THREE.Mesh(outer_upper_flangeGeom, clear_edgeMat);
  outer_upper_flange.name = "outer_upper_flange";
  outer_upper_flange.rotation.x = Math.PI / 2;
  outer_upper_flange.position.y = 3.39;
  outer_upper_flange.renderOrder = 4;
  outer_enclosure.add(outer_upper_flange);

  const outer_upper_shoulderingGeom = new THREE.TorusGeometry(0.65, 0.018, 10, 64);
  const outer_upper_shouldering = new THREE.Mesh(
    outer_upper_shoulderingGeom,
    clear_edgeMat
  );
  outer_upper_shouldering.name = "outer_upper_shouldering";
  outer_upper_shouldering.rotation.x = Math.PI / 2;
  outer_upper_shouldering.position.y = 3.43;
  outer_upper_shouldering.renderOrder = 4;
  outer_enclosure.add(outer_upper_shouldering);

  const outer_side_railsGeom = new THREE.CylinderGeometry(0.012, 0.012, 2.30, 10);
  const outer_side_rails = new THREE.InstancedMesh(
    outer_side_railsGeom,
    clear_edgeMat,
    2
  );
  outer_side_rails.name = "outer_side_rails";
  const outer_rail_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    outer_rail_dummy.position.set(i === 0 ? -0.688 : 0.688, 2.10, 0.015);
    outer_rail_dummy.updateMatrix();
    outer_side_rails.setMatrixAt(i, outer_rail_dummy.matrix);
  }
  outer_side_rails.instanceMatrix.needsUpdate = true;
  outer_side_rails.renderOrder = 4;
  outer_enclosure.add(outer_side_rails);

  const top_capProfile = [
    new THREE.Vector2(0.69, 3.38),
    new THREE.Vector2(0.70, 3.47),
    new THREE.Vector2(0.66, 3.55),
    new THREE.Vector2(0.65, 3.84),
    new THREE.Vector2(0.61, 4.02),
    new THREE.Vector2(0.54, 4.10),
    new THREE.Vector2(0.43, 4.12),
    new THREE.Vector2(0.40, 4.08),
    new THREE.Vector2(0.49, 4.04),
    new THREE.Vector2(0.55, 3.94),
    new THREE.Vector2(0.59, 3.78),
    new THREE.Vector2(0.60, 3.57),
    new THREE.Vector2(0.63, 3.48),
    new THREE.Vector2(0.64, 3.42),
    new THREE.Vector2(0.69, 3.38)
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 64);
  const top_cap = new THREE.Mesh(top_capGeom, clear_glassMat);
  top_cap.name = "top_cap";
  top_cap.renderOrder = 2;
  outer_enclosure.add(top_cap);

  const top_lipGeom = new THREE.TorusGeometry(0.415, 0.026, 12, 64);
  const top_lip = new THREE.Mesh(top_lipGeom, clear_edgeMat);
  top_lip.name = "top_lip";
  top_lip.rotation.x = Math.PI / 2;
  top_lip.position.y = 4.105;
  top_lip.renderOrder = 4;
  outer_enclosure.add(top_lip);

  const top_recessGeom = new THREE.RingGeometry(0.30, 0.405, 64);
  const top_recess = new THREE.Mesh(top_recessGeom, clear_edgeMat);
  top_recess.name = "top_recess";
  top_recess.rotation.x = -Math.PI / 2;
  top_recess.position.y = 4.087;
  top_recess.renderOrder = 4;
  outer_enclosure.add(top_recess);

  const top_center_plugGeom = new THREE.CylinderGeometry(0.09, 0.12, 0.18, 32);
  const top_center_plug = new THREE.Mesh(top_center_plugGeom, clear_edgeMat);
  top_center_plug.name = "top_center_plug";
  top_center_plug.position.y = 3.995;
  top_center_plug.renderOrder = 3;
  outer_enclosure.add(top_center_plug);

  const top_plug_rimGeom = new THREE.TorusGeometry(0.105, 0.014, 10, 40);
  const top_plug_rim = new THREE.Mesh(top_plug_rimGeom, clear_edgeMat);
  top_plug_rim.name = "top_plug_rim";
  top_plug_rim.rotation.x = Math.PI / 2;
  top_plug_rim.position.y = 4.085;
  top_plug_rim.renderOrder = 4;
  outer_enclosure.add(top_plug_rim);

  const base_highlightGeom = new THREE.PlaneGeometry(0.075, 0.46);
  const base_highlight = new THREE.Mesh(base_highlightGeom, highlightMat);
  base_highlight.name = "base_highlight";
  base_highlight.position.set(-0.39, 0.40, 0.625);
  base_highlight.rotation.y = -0.57;
  base_highlight.renderOrder = 5;
  outer_enclosure.add(base_highlight);

  const chamber_highlightGeom = new THREE.PlaneGeometry(0.055, 1.85);
  const chamber_highlight = new THREE.Mesh(chamber_highlightGeom, highlightMat);
  chamber_highlight.name = "chamber_highlight";
  chamber_highlight.position.set(-0.52, 2.18, 0.465);
  chamber_highlight.rotation.y = -0.75;
  chamber_highlight.renderOrder = 5;
  outer_enclosure.add(chamber_highlight);

  const top_cap_highlightGeom = new THREE.PlaneGeometry(0.16, 0.36);
  const top_cap_highlight = new THREE.Mesh(top_cap_highlightGeom, highlightMat);
  top_cap_highlight.name = "top_cap_highlight";
  top_cap_highlight.position.set(-0.29, 3.80, 0.57);
  top_cap_highlight.rotation.y = -0.47;
  top_cap_highlight.renderOrder = 5;
  outer_enclosure.add(top_cap_highlight);

  const base_inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0x168dff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x168dff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.75
  });
  const base_inner_glowGeom = new THREE.TorusGeometry(0.35, 0.012, 8, 48);
  const base_inner_glow = new THREE.Mesh(base_inner_glowGeom, base_inner_glowMat);
  base_inner_glow.name = "base_inner_glow";
  base_inner_glow.rotation.x = Math.PI / 2;
  base_inner_glow.position.y = 0.855;
  inner_device.add(base_inner_glow);

  const lower_supportGeom = new THREE.CylinderGeometry(0.33, 0.35, 0.94, 48);
  const lower_support = new THREE.Mesh(lower_supportGeom, white_plasticMat);
  lower_support.name = "lower_support";
  lower_support.position.y = 1.30;
  inner_device.add(lower_support);

  const support_bottom_ringGeom = new THREE.TorusGeometry(0.325, 0.026, 10, 48);
  const support_bottom_ring = new THREE.Mesh(
    support_bottom_ringGeom,
    pale_plasticMat
  );
  support_bottom_ring.name = "support_bottom_ring";
  support_bottom_ring.rotation.x = Math.PI / 2;
  support_bottom_ring.position.y = 0.85;
  inner_device.add(support_bottom_ring);

  const support_top_collarGeom = new THREE.CylinderGeometry(0.35, 0.34, 0.22, 48);
  const support_top_collar = new THREE.Mesh(
    support_top_collarGeom,
    pale_plasticMat
  );
  support_top_collar.name = "support_top_collar";
  support_top_collar.position.y = 1.84;
  inner_device.add(support_top_collar);

  const support_top_ringGeom = new THREE.TorusGeometry(0.335, 0.026, 10, 48);
  const support_top_ring = new THREE.Mesh(support_top_ringGeom, blue_plasticMat);
  support_top_ring.name = "support_top_ring";
  support_top_ring.rotation.x = Math.PI / 2;
  support_top_ring.position.y = 1.955;
  inner_device.add(support_top_ring);

  const vial_bottom_neckGeom = new THREE.CylinderGeometry(0.245, 0.255, 0.14, 48);
  const vial_bottom_neck = new THREE.Mesh(vial_bottom_neckGeom, clear_edgeMat);
  vial_bottom_neck.name = "vial_bottom_neck";
  vial_bottom_neck.position.y = 2.00;
  vial_bottom_neck.renderOrder = 3;
  inner_device.add(vial_bottom_neck);

  const vial_bottom_ringGeom = new THREE.TorusGeometry(0.25, 0.022, 10, 48);
  const vial_bottom_ring = new THREE.Mesh(vial_bottom_ringGeom, blue_plasticMat);
  vial_bottom_ring.name = "vial_bottom_ring";
  vial_bottom_ring.rotation.x = Math.PI / 2;
  vial_bottom_ring.position.y = 2.035;
  inner_device.add(vial_bottom_ring);

  const blue_vialProfile = [
    new THREE.Vector2(0.00, 1.98),
    new THREE.Vector2(0.22, 1.98),
    new THREE.Vector2(0.29, 2.02),
    new THREE.Vector2(0.335, 2.10),
    new THREE.Vector2(0.35, 2.22),
    new THREE.Vector2(0.35, 3.42),
    new THREE.Vector2(0.34, 3.50),
    new THREE.Vector2(0.00, 3.50)
  ];
  const blue_vialGeom = new THREE.LatheGeometry(blue_vialProfile, 64);
  const blue_vial = new THREE.Mesh(blue_vialGeom, blue_glassMat);
  blue_vial.name = "blue_vial";
  blue_vial.renderOrder = 3;
  inner_device.add(blue_vial);

  const blue_liquidProfile = [
    new THREE.Vector2(0.00, 2.02),
    new THREE.Vector2(0.22, 2.02),
    new THREE.Vector2(0.285, 2.07),
    new THREE.Vector2(0.315, 2.16),
    new THREE.Vector2(0.32, 2.24),
    new THREE.Vector2(0.32, 3.13),
    new THREE.Vector2(0.00, 3.13)
  ];
  const blue_liquidGeom = new THREE.LatheGeometry(blue_liquidProfile, 64);
  const blue_liquid = new THREE.Mesh(blue_liquidGeom, blue_liquidMat);
  blue_liquid.name = "blue_liquid";
  blue_liquid.renderOrder = 1;
  inner_device.add(blue_liquid);

  const liquid_surfaceGeom = new THREE.CylinderGeometry(0.318, 0.318, 0.012, 64);
  const liquid_surface = new THREE.Mesh(liquid_surfaceGeom, blue_liquidMat);
  liquid_surface.name = "liquid_surface";
  liquid_surface.position.y = 3.13;
  liquid_surface.renderOrder = 1;
  inner_device.add(liquid_surface);

  const upper_chamberGeom = new THREE.CylinderGeometry(0.245, 0.255, 0.36, 48);
  const upper_chamber = new THREE.Mesh(upper_chamberGeom, cyan_chamberMat);
  upper_chamber.name = "upper_chamber";
  upper_chamber.position.y = 3.31;
  upper_chamber.renderOrder = 1;
  inner_device.add(upper_chamber);

  const vial_top_flangeGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.085, 64);
  const vial_top_flange = new THREE.Mesh(vial_top_flangeGeom, clear_edgeMat);
  vial_top_flange.name = "vial_top_flange";
  vial_top_flange.position.y = 3.52;
  vial_top_flange.renderOrder = 3;
  inner_device.add(vial_top_flange);

  const vial_top_rimGeom = new THREE.TorusGeometry(0.345, 0.025, 10, 48);
  const vial_top_rim = new THREE.Mesh(vial_top_rimGeom, blue_plasticMat);
  vial_top_rim.name = "vial_top_rim";
  vial_top_rim.rotation.x = Math.PI / 2;
  vial_top_rim.position.y = 3.54;
  inner_device.add(vial_top_rim);

  const vial_upper_neckProfile = [
    new THREE.Vector2(0.27, 3.54),
    new THREE.Vector2(0.25, 3.61),
    new THREE.Vector2(0.19, 3.67),
    new THREE.Vector2(0.17, 3.78),
    new THREE.Vector2(0.17, 3.89),
    new THREE.Vector2(0.205, 3.91),
    new THREE.Vector2(0.205, 3.95),
    new THREE.Vector2(0.15, 3.97),
    new THREE.Vector2(0.00, 3.97)
  ];
  const vial_upper_neckGeom = new THREE.LatheGeometry(vial_upper_neckProfile, 48);
  const vial_upper_neck = new THREE.Mesh(vial_upper_neckGeom, clear_glassMat);
  vial_upper_neck.name = "vial_upper_neck";
  vial_upper_neck.renderOrder = 3;
  inner_device.add(vial_upper_neck);

  const neck_threadsGeom = new THREE.TorusGeometry(0.18, 0.012, 8, 40);
  const neck_threads = new THREE.InstancedMesh(neck_threadsGeom, blue_plasticMat, 3);
  neck_threads.name = "neck_threads";
  const neck_thread_dummy = new THREE.Object3D();
  const neck_thread_heights = [3.80, 3.865, 3.925];
  for (let i = 0; i < neck_thread_heights.length; i++) {
    neck_thread_dummy.position.set(0, neck_thread_heights[i], 0);
    neck_thread_dummy.rotation.set(Math.PI / 2, 0, 0);
    neck_thread_dummy.updateMatrix();
    neck_threads.setMatrixAt(i, neck_thread_dummy.matrix);
  }
  neck_threads.instanceMatrix.needsUpdate = true;
  inner_device.add(neck_threads);

  const vial_highlightGeom = new THREE.PlaneGeometry(0.035, 1.18);
  const vial_highlight = new THREE.Mesh(vial_highlightGeom, highlightMat);
  vial_highlight.name = "vial_highlight";
  vial_highlight.position.set(-0.19, 2.78, 0.30);
  vial_highlight.rotation.y = -0.58;
  vial_highlight.renderOrder = 5;
  inner_device.add(vial_highlight);

  const emitter_socketGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.075, 32);
  const emitter_socket = new THREE.Mesh(emitter_socketGeom, blue_plasticMat);
  emitter_socket.name = "emitter_socket";
  emitter_socket.position.y = 2.10;
  inner_device.add(emitter_socket);

  const light_stemGeom = new THREE.CylinderGeometry(0.018, 0.022, 0.55, 16);
  const light_stem = new THREE.Mesh(light_stemGeom, cyan_ledMat);
  light_stem.name = "light_stem";
  light_stem.position.y = 2.39;
  inner_device.add(light_stem);

  const lower_led_bulbGeom = new THREE.SphereGeometry(0.055, 24, 16);
  const lower_led_bulb = new THREE.Mesh(lower_led_bulbGeom, cyan_ledMat);
  lower_led_bulb.name = "lower_led_bulb";
  lower_led_bulb.position.y = 2.18;
  inner_device.add(lower_led_bulb);

  const lower_led_haloGeom = new THREE.SphereGeometry(0.105, 24, 16);
  const lower_led_halo = new THREE.Mesh(lower_led_haloGeom, cyan_haloMat);
  lower_led_halo.name = "lower_led_halo";
  lower_led_halo.position.y = 2.18;
  lower_led_halo.renderOrder = 1;
  inner_device.add(lower_led_halo);

  const main_led_bulbGeom = new THREE.SphereGeometry(0.09, 32, 20);
  const main_led_bulb = new THREE.Mesh(main_led_bulbGeom, cyan_ledMat);
  main_led_bulb.name = "main_led_bulb";
  main_led_bulb.position.y = 2.66;
  inner_device.add(main_led_bulb);

  const main_led_haloGeom = new THREE.SphereGeometry(0.17, 32, 20);
  const main_led_halo = new THREE.Mesh(main_led_haloGeom, cyan_haloMat);
  main_led_halo.name = "main_led_halo";
  main_led_halo.position.y = 2.66;
  main_led_halo.renderOrder = 1;
  inner_device.add(main_led_halo);

  const power_cablePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.02, 0.09, 0.02),
    new THREE.Vector3(0.15, 0.10, 0.04),
    new THREE.Vector3(0.28, 0.17, 0.03),
    new THREE.Vector3(0.36, 0.30, 0.00),
    new THREE.Vector3(0.34, 0.47, -0.02),
    new THREE.Vector3(0.28, 0.62, -0.01),
    new THREE.Vector3(0.22, 0.79, 0.00)
  ]);
  const power_cableGeom = new THREE.TubeGeometry(
    power_cablePath,
    32,
    0.014,
    8,
    false
  );
  const power_cable = new THREE.Mesh(power_cableGeom, pale_plasticMat);
  power_cable.name = "power_cable";
  base_assembly.add(power_cable);

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