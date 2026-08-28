export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_dispenser";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const body_assembly = new THREE.Group();
  body_assembly.name = "body_assembly";
  root.add(body_assembly);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const trayMat = new THREE.MeshStandardMaterial({
    color: 0x171918,
    metalness: 0.25,
    roughness: 0.72
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });
  const displayMat = new THREE.MeshStandardMaterial({
    color: 0x4d0010,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x330006,
    emissiveIntensity: 0.35
  });
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0xff2438,
    metalness: 0.0,
    roughness: 0.35,
    emissive: 0xff1028,
    emissiveIntensity: 1.0
  });
  const led_glowMat = new THREE.MeshStandardMaterial({
    color: 0xff1832,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff0822,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.38
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xd7d5cc,
    metalness: 0.0,
    roughness: 0.7
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x383a39,
    metalness: 0.0,
    roughness: 0.8
  });
  const grimeMat = new THREE.MeshStandardMaterial({
    color: 0x654d36,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x493f35,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.42
  });

  function roundedBoxGeometry(width, height, depth, radius, bevel) {
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);
    const shape = new THREE.Shape();
    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const base_plateGeom = roundedBoxGeometry(1.0, 0.14, 0.84, 0.075, 0.018);
  const base_plate = new THREE.Mesh(base_plateGeom, brushed_metalMat);
  base_plate.name = "base_plate";
  base_plate.position.set(0, 0.11, 0);
  base_assembly.add(base_plate);

  const base_front_trimGeom = roundedBoxGeometry(0.91, 0.07, 0.035, 0.025, 0.006);
  const base_front_trim = new THREE.Mesh(base_front_trimGeom, silver_metalMat);
  base_front_trim.name = "base_front_trim";
  base_front_trim.position.set(0, 0.105, 0.435);
  base_assembly.add(base_front_trim);

  const drip_trayGeom = roundedBoxGeometry(0.78, 0.025, 0.62, 0.035, 0.006);
  const drip_tray = new THREE.Mesh(drip_trayGeom, trayMat);
  drip_tray.name = "drip_tray";
  drip_tray.position.set(-0.04, 0.195, 0.07);
  base_assembly.add(drip_tray);

  const tray_left_railGeom = new THREE.BoxGeometry(0.045, 0.055, 0.61);
  const tray_left_rail = new THREE.Mesh(tray_left_railGeom, brushed_metalMat);
  tray_left_rail.name = "tray_left_rail";
  tray_left_rail.position.set(-0.425, 0.22, 0.07);
  base_assembly.add(tray_left_rail);

  const tray_right_railGeom = new THREE.BoxGeometry(0.045, 0.055, 0.61);
  const tray_right_rail = new THREE.Mesh(tray_right_railGeom, brushed_metalMat);
  tray_right_rail.name = "tray_right_rail";
  tray_right_rail.position.set(0.345, 0.22, 0.07);
  base_assembly.add(tray_right_rail);

  const tray_front_rimGeom = new THREE.BoxGeometry(0.77, 0.05, 0.045);
  const tray_front_rim = new THREE.Mesh(tray_front_rimGeom, brushed_metalMat);
  tray_front_rim.name = "tray_front_rim";
  tray_front_rim.position.set(-0.04, 0.22, 0.385);
  base_assembly.add(tray_front_rim);

  const feetGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.06, 20);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  feet.name = "feet";
  const feet_positions = [
    [-0.39, 0.015, 0.31],
    [0.39, 0.015, 0.31],
    [-0.39, 0.015, -0.31],
    [0.39, 0.015, -0.31]
  ];
  for (let i = 0; i < feet_positions.length; i++) {
    const p = feet_positions[i];
    const matrix = new THREE.Matrix4().makeTranslation(p[0], p[1], p[2]);
    feet.setMatrixAt(i, matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  base_assembly.add(feet);

  const base_badgeGeom = roundedBoxGeometry(0.12, 0.052, 0.009, 0.014, 0.002);
  const base_badge = new THREE.Mesh(base_badgeGeom, silver_metalMat);
  base_badge.name = "base_badge";
  base_badge.position.set(-0.19, 0.105, 0.462);
  base_assembly.add(base_badge);

  const base_badge_markGeom = new THREE.BoxGeometry(0.055, 0.008, 0.004);
  const base_badge_mark = new THREE.Mesh(base_badge_markGeom, inkMat);
  base_badge_mark.name = "base_badge_mark";
  base_badge_mark.position.set(-0.19, 0.105, 0.470);
  base_assembly.add(base_badge_mark);

  const body_width = 0.82;
  const body_height = 0.83;
  const body_depth = 0.68;
  const body_center_y = 0.61;

  const body_shellGeom = roundedBoxGeometry(
    body_width,
    body_height,
    body_depth,
    0.055,
    0.014
  );
  const body_shell = new THREE.Mesh(body_shellGeom, brushed_metalMat);
  body_shell.name = "body_shell";
  body_shell.position.set(0, body_center_y, -0.02);
  body_assembly.add(body_shell);

  const right_side_panelGeom = new THREE.BoxGeometry(0.024, 0.76, 0.60);
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, brushed_metalMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.429, 0.60, -0.025);
  body_assembly.add(right_side_panel);

  const service_doorGeom = roundedBoxGeometry(0.61, 0.59, 0.026, 0.035, 0.006);
  const service_door = new THREE.Mesh(service_doorGeom, brushed_metalMat);
  service_door.name = "service_door";
  service_door.position.set(-0.095, 0.50, 0.351);
  body_assembly.add(service_door);

  const service_door_top_seamGeom = new THREE.BoxGeometry(0.56, 0.008, 0.006);
  const service_door_top_seam = new THREE.Mesh(service_door_top_seamGeom, dark_metalMat);
  service_door_top_seam.name = "service_door_top_seam";
  service_door_top_seam.position.set(-0.095, 0.792, 0.371);
  body_assembly.add(service_door_top_seam);

  const service_door_right_seamGeom = new THREE.BoxGeometry(0.009, 0.54, 0.006);
  const service_door_right_seam = new THREE.Mesh(service_door_right_seamGeom, dark_metalMat);
  service_door_right_seam.name = "service_door_right_seam";
  service_door_right_seam.position.set(0.218, 0.50, 0.371);
  body_assembly.add(service_door_right_seam);

  const upper_ventGeom = roundedBoxGeometry(0.13, 0.035, 0.014, 0.012, 0.002);
  const upper_vent = new THREE.Mesh(upper_ventGeom, rubberMat);
  upper_vent.name = "upper_vent";
  upper_vent.position.set(-0.34, 0.785, 0.378);
  body_assembly.add(upper_vent);

  const center_ventGeom = roundedBoxGeometry(0.13, 0.045, 0.014, 0.014, 0.002);
  const center_vent = new THREE.Mesh(center_ventGeom, rubberMat);
  center_vent.name = "center_vent";
  center_vent.position.set(-0.095, 0.785, 0.378);
  body_assembly.add(center_vent);

  const service_sensorGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 16);
  const service_sensor = new THREE.Mesh(service_sensorGeom, rubberMat);
  service_sensor.name = "service_sensor";
  service_sensor.rotation.x = Math.PI / 2;
  service_sensor.position.set(0.145, 0.665, 0.381);
  body_assembly.add(service_sensor);

  const lower_slotGeom = roundedBoxGeometry(0.12, 0.04, 0.014, 0.018, 0.002);
  const lower_slot = new THREE.Mesh(lower_slotGeom, rubberMat);
  lower_slot.name = "lower_slot";
  lower_slot.position.set(-0.095, 0.285, 0.378);
  body_assembly.add(lower_slot);

  const brand_labelGeom = roundedBoxGeometry(0.19, 0.065, 0.009, 0.022, 0.002);
  const brand_label = new THREE.Mesh(brand_labelGeom, labelMat);
  brand_label.name = "brand_label";
  brand_label.position.set(-0.095, 0.405, 0.381);
  body_assembly.add(brand_label);

  const brand_glyphsGeom = new THREE.BoxGeometry(0.011, 0.026, 0.004);
  const brand_glyphs = new THREE.InstancedMesh(brand_glyphsGeom, inkMat, 6);
  brand_glyphs.name = "brand_glyphs";
  for (let i = 0; i < 6; i++) {
    const matrix = new THREE.Matrix4().makeTranslation(
      -0.145 + i * 0.020,
      0.405 + (i % 2 === 0 ? 0.002 : -0.002),
      0.390
    );
    brand_glyphs.setMatrixAt(i, matrix);
  }
  brand_glyphs.instanceMatrix.needsUpdate = true;
  body_assembly.add(brand_glyphs);

  const right_side_seamGeom = new THREE.BoxGeometry(0.007, 0.72, 0.012);
  const right_side_seam = new THREE.Mesh(right_side_seamGeom, dark_metalMat);
  right_side_seam.name = "right_side_seam";
  right_side_seam.position.set(0.444, 0.60, 0.275);
  body_assembly.add(right_side_seam);

  const side_fastenersGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 16);
  const side_fasteners = new THREE.InstancedMesh(side_fastenersGeom, silver_metalMat, 4);
  side_fasteners.name = "side_fasteners";
  const side_fastener_quat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, -Math.PI / 2)
  );
  const side_fastener_positions = [
    [0.449, 0.84, 0.22],
    [0.449, 0.57, 0.22],
    [0.449, 0.84, -0.25],
    [0.449, 0.30, -0.25]
  ];
  for (let i = 0; i < side_fastener_positions.length; i++) {
    const p = side_fastener_positions[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(p[0], p[1], p[2]),
      side_fastener_quat,
      new THREE.Vector3(1, 1, 1)
    );
    side_fasteners.setMatrixAt(i, matrix);
  }
  side_fasteners.instanceMatrix.needsUpdate = true;
  body_assembly.add(side_fasteners);

  const side_latch_backingGeom = roundedBoxGeometry(0.18, 0.075, 0.014, 0.012, 0.003);
  const side_latch_backing = new THREE.Mesh(side_latch_backingGeom, dark_metalMat);
  side_latch_backing.name = "side_latch_backing";
  side_latch_backing.rotation.y = Math.PI / 2;
  side_latch_backing.position.set(0.443, 0.91, 0.17);
  body_assembly.add(side_latch_backing);

  const side_latchGeom = roundedBoxGeometry(0.145, 0.045, 0.018, 0.008, 0.003);
  const side_latch = new THREE.Mesh(side_latchGeom, silver_metalMat);
  side_latch.name = "side_latch";
  side_latch.rotation.y = Math.PI / 2;
  side_latch.position.set(0.454, 0.918, 0.17);
  body_assembly.add(side_latch);

  const side_knob_mountGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.035, 20);
  const side_knob_mount = new THREE.Mesh(side_knob_mountGeom, dark_metalMat);
  side_knob_mount.name = "side_knob_mount";
  side_knob_mount.rotation.z = Math.PI / 2;
  side_knob_mount.position.set(0.438, 0.93, -0.27);
  body_assembly.add(side_knob_mount);

  const side_knobGeom = new THREE.CylinderGeometry(0.044, 0.050, 0.065, 20);
  const side_knob = new THREE.Mesh(side_knobGeom, rubberMat);
  side_knob.name = "side_knob";
  side_knob.rotation.z = Math.PI / 2;
  side_knob.position.set(0.474, 0.93, -0.27);
  body_assembly.add(side_knob);

  const display_housingGeom = roundedBoxGeometry(0.84, 0.34, 0.105, 0.055, 0.014);
  const display_housing = new THREE.Mesh(display_housingGeom, brushed_metalMat);
  display_housing.name = "display_housing";
  display_housing.position.set(0, 0.945, 0.365);
  top_assembly.add(display_housing);

  const display_bezelGeom = roundedBoxGeometry(0.69, 0.245, 0.025, 0.038, 0.006);
  const display_bezel = new THREE.Mesh(display_bezelGeom, rubberMat);
  display_bezel.name = "display_bezel";
  display_bezel.position.set(-0.035, 0.95, 0.432);
  top_assembly.add(display_bezel);

  const display_glowGeom = roundedBoxGeometry(0.625, 0.195, 0.008, 0.026, 0.002);
  const display_glow = new THREE.Mesh(display_glowGeom, led_glowMat);
  display_glow.name = "display_glow";
  display_glow.position.set(-0.035, 0.95, 0.450);
  top_assembly.add(display_glow);

  const display_screenGeom = roundedBoxGeometry(0.605, 0.18, 0.009, 0.022, 0.002);
  const display_screen = new THREE.Mesh(display_screenGeom, displayMat);
  display_screen.name = "display_screen";
  display_screen.position.set(-0.035, 0.95, 0.456);
  top_assembly.add(display_screen);

  const horizontal_segmentGeom = roundedBoxGeometry(0.105, 0.021, 0.010, 0.009, 0.002);
  const vertical_segmentGeom = roundedBoxGeometry(0.021, 0.083, 0.010, 0.009, 0.002);

  const display_digit_one = new THREE.Group();
  display_digit_one.name = "display_digit_one";
  display_digit_one.position.set(-0.035, 0.95, 0.470);
  const digit_one_segments = new THREE.InstancedMesh(vertical_segmentGeom, ledMat, 2);
  digit_one_segments.name = "digit_one_segments";
  digit_one_segments.setMatrixAt(
    0,
    new THREE.Matrix4().makeTranslation(0.017, 0.043, 0)
  );
  digit_one_segments.setMatrixAt(
    1,
    new THREE.Matrix4().makeTranslation(0.017, -0.043, 0)
  );
  digit_one_segments.instanceMatrix.needsUpdate = true;
  display_digit_one.add(digit_one_segments);
  top_assembly.add(display_digit_one);

  const display_digit_zero = new THREE.Group();
  display_digit_zero.name = "display_digit_zero";
  display_digit_zero.position.set(0.15, 0.95, 0.470);
  const digit_zero_segments = new THREE.InstancedMesh(vertical_segmentGeom, ledMat, 4);
  digit_zero_segments.name = "digit_zero_segments";
  digit_zero_segments.setMatrixAt(
    0,
    new THREE.Matrix4().makeTranslation(-0.052, 0.043, 0)
  );
  digit_zero_segments.setMatrixAt(
    1,
    new THREE.Matrix4().makeTranslation(-0.052, -0.043, 0)
  );
  digit_zero_segments.setMatrixAt(
    2,
    new THREE.Matrix4().makeTranslation(0.052, 0.043, 0)
  );
  digit_zero_segments.setMatrixAt(
    3,
    new THREE.Matrix4().makeTranslation(0.052, -0.043, 0)
  );
  digit_zero_segments.instanceMatrix.needsUpdate = true;
  display_digit_zero.add(digit_zero_segments);

  const digit_zero_horizontals = new THREE.InstancedMesh(
    horizontal_segmentGeom,
    ledMat,
    2
  );
  digit_zero_horizontals.name = "digit_zero_horizontals";
  digit_zero_horizontals.setMatrixAt(
    0,
    new THREE.Matrix4().makeTranslation(0, 0.091, 0)
  );
  digit_zero_horizontals.setMatrixAt(
    1,
    new THREE.Matrix4().makeTranslation(0, -0.091, 0)
  );
  digit_zero_horizontals.instanceMatrix.needsUpdate = true;
  display_digit_zero.add(digit_zero_horizontals);
  top_assembly.add(display_digit_zero);

  const top_capGeom = roundedBoxGeometry(0.94, 0.17, 0.78, 0.085, 0.025);
  const top_cap = new THREE.Mesh(top_capGeom, silver_metalMat);
  top_cap.name = "top_cap";
  top_cap.position.set(0, 1.155, -0.015);
  top_assembly.add(top_cap);

  const top_front_shadowGeom = new THREE.BoxGeometry(0.82, 0.012, 0.018);
  const top_front_shadow = new THREE.Mesh(top_front_shadowGeom, dark_metalMat);
  top_front_shadow.name = "top_front_shadow";
  top_front_shadow.position.set(0, 1.074, 0.395);
  top_assembly.add(top_front_shadow);

  const top_side_shadowGeom = new THREE.BoxGeometry(0.016, 0.012, 0.62);
  const top_side_shadow = new THREE.Mesh(top_side_shadowGeom, dark_metalMat);
  top_side_shadow.name = "top_side_shadow";
  top_side_shadow.position.set(0.452, 1.074, -0.02);
  top_assembly.add(top_side_shadow);

  const top_access_discGeom = new THREE.CircleGeometry(0.105, 32);
  const top_access_disc = new THREE.Mesh(top_access_discGeom, brushed_metalMat);
  top_access_disc.name = "top_access_disc";
  top_access_disc.rotation.x = -Math.PI / 2;
  top_access_disc.position.set(0.045, 1.269, -0.045);
  top_assembly.add(top_access_disc);

  const top_access_ringGeom = new THREE.RingGeometry(0.105, 0.114, 32);
  const top_access_ring = new THREE.Mesh(top_access_ringGeom, dark_metalMat);
  top_access_ring.name = "top_access_ring";
  top_access_ring.rotation.x = -Math.PI / 2;
  top_access_ring.position.set(0.045, 1.271, -0.045);
  top_assembly.add(top_access_ring);

  const top_wordmarkGeom = new THREE.BoxGeometry(0.13, 0.004, 0.012);
  const top_wordmark = new THREE.InstancedMesh(top_wordmarkGeom, grimeMat, 3);
  top_wordmark.name = "top_wordmark";
  for (let i = 0; i < 3; i++) {
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(-0.22 + i * 0.015, 1.273, 0.10 - i * 0.026),
      new THREE.Quaternion(),
      new THREE.Vector3(1 - i * 0.18, 1, 1)
    );
    top_wordmark.setMatrixAt(i, matrix);
  }
  top_wordmark.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_wordmark);

  const grime_spotGeom = new THREE.CircleGeometry(0.05, 16);

  const front_grime_data = [
    [-0.27, 0.65, 0.373, 0.70, 0.24, 0.20],
    [0.10, 0.39, 0.373, 0.45, 0.82, -0.35],
    [0.17, 0.70, 0.373, 0.30, 0.48, 0.15],
    [-0.31, 0.33, 0.373, 0.36, 0.22, -0.20],
    [0.02, 0.57, 0.373, 0.22, 0.34, 0.00]
  ];
  const front_grime = new THREE.InstancedMesh(
    grime_spotGeom,
    grimeMat,
    front_grime_data.length
  );
  front_grime.name = "front_grime";
  for (let i = 0; i < front_grime_data.length; i++) {
    const d = front_grime_data[i];
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, d[5])
    );
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(d[0], d[1], d[2]),
      quaternion,
      new THREE.Vector3(d[3], d[4], 1)
    );
    front_grime.setMatrixAt(i, matrix);
  }
  front_grime.instanceMatrix.needsUpdate = true;
  body_assembly.add(front_grime);

  const side_grime_data = [
    [0.444, 0.69, 0.08, 0.55, 0.95, 0.25],
    [0.444, 0.48, -0.15, 0.38, 0.55, -0.40],
    [0.444, 0.77, -0.23, 0.30, 0.42, 0.10],
    [0.444, 0.34, 0.12, 0.28, 0.35, 0.00],
    [0.444, 0.58, 0.20, 0.22, 0.28, 0.00]
  ];
  const side_grime = new THREE.InstancedMesh(
    grime_spotGeom,
    grimeMat,
    side_grime_data.length
  );
  side_grime.name = "side_grime";
  const side_grime_quat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  for (let i = 0; i < side_grime_data.length; i++) {
    const d = side_grime_data[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(d[0], d[1], d[2]),
      side_grime_quat,
      new THREE.Vector3(d[3], d[4], 1)
    );
    side_grime.setMatrixAt(i, matrix);
  }
  side_grime.instanceMatrix.needsUpdate = true;
  body_assembly.add(side_grime);

  const top_grime_data = [
    [-0.29, 1.274, 0.16, 0.55, 0.20, -0.15],
    [0.27, 1.274, -0.20, 0.36, 0.18, 0.25],
    [-0.12, 1.274, -0.25, 0.26, 0.14, 0.00],
    [0.31, 1.274, 0.18, 0.22, 0.12, 0.00]
  ];
  const top_grime = new THREE.InstancedMesh(
    grime_spotGeom,
    grimeMat,
    top_grime_data.length
  );
  top_grime.name = "top_grime";
  const top_grime_quat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0)
  );
  for (let i = 0; i < top_grime_data.length; i++) {
    const d = top_grime_data[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(d[0], d[1], d[2]),
      top_grime_quat,
      new THREE.Vector3(d[3], d[4], 1)
    );
    top_grime.setMatrixAt(i, matrix);
  }
  top_grime.instanceMatrix.needsUpdate = true;
  top_assembly.add(top_grime);

  const scratchGeom = new THREE.BoxGeometry(0.10, 0.004, 0.003);
  const scratch_data = [
    [-0.22, 0.56, 0.376, 0.75, -0.65],
    [0.08, 0.36, 0.376, 0.55, 0.85],
    [0.13, 0.72, 0.376, 0.42, -0.25],
    [-0.32, 0.42, 0.376, 0.34, 0.45],
    [0.02, 0.61, 0.376, 0.30, -0.90]
  ];
  const surface_scratches = new THREE.InstancedMesh(
    scratchGeom,
    scratchMat,
    scratch_data.length
  );
  surface_scratches.name = "surface_scratches";
  for (let i = 0; i < scratch_data.length; i++) {
    const d = scratch_data[i];
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(d[0], d[1], d[2]),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, d[4])),
      new THREE.Vector3(d[3], 1, 1)
    );
    surface_scratches.setMatrixAt(i, matrix);
  }
  surface_scratches.instanceMatrix.needsUpdate = true;
  body_assembly.add(surface_scratches);

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