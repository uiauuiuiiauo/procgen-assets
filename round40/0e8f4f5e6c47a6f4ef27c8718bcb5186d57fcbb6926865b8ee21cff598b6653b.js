export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "digital_timer_device";

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x100b0d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_windowMat = new THREE.MeshStandardMaterial({
    color: 0x52000e,
    metalness: 0.0,
    roughness: 0.3,
  });
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0xff2838,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff2838,
    emissiveIntensity: 1.0,
  });
  const led_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffc0a8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff654c,
    emissiveIntensity: 1.0,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x70452f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const grimeMat = new THREE.MeshStandardMaterial({
    color: 0x302820,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xd8d5c9,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const baseGeom = roundedExtrudeGeometry(1.12, 0.86, 0.13, 0.075, 0.022);
  const base = new THREE.Mesh(baseGeom, brushed_metalMat);
  base.name = "base";
  base.rotation.x = -Math.PI / 2;
  base.position.y = 0.10;
  base_assembly.add(base);

  const base_top_plateGeom = roundedExtrudeGeometry(0.98, 0.72, 0.025, 0.055, 0.008);
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, rubberMat);
  base_top_plate.name = "base_top_plate";
  base_top_plate.rotation.x = -Math.PI / 2;
  base_top_plate.position.y = 0.19;
  base_assembly.add(base_top_plate);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.065, 0.07, 0.055, 18);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const foot_positions = [
    [-0.45, 0.015, 0.34],
    [0.45, 0.015, 0.34],
    [-0.45, 0.015, -0.34],
    [0.45, 0.015, -0.34],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const p = foot_positions[i];
    setInstance(rubber_feet, i, p[0], p[1], p[2], 0, 0, 0, 1, 1, 1);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  base_assembly.add(rubber_feet);

  const base_front_badgeGeom = roundedExtrudeGeometry(0.15, 0.055, 0.008, 0.018, 0.002);
  const base_front_badge = new THREE.Mesh(base_front_badgeGeom, dark_metalMat);
  base_front_badge.name = "base_front_badge";
  base_front_badge.position.set(-0.20, 0.105, 0.455);
  base_assembly.add(base_front_badge);

  const base_badge_markGeom = new THREE.BoxGeometry(0.075, 0.012, 0.005);
  const base_badge_mark = new THREE.Mesh(base_badge_markGeom, silver_metalMat);
  base_badge_mark.name = "base_badge_mark";
  base_badge_mark.position.set(-0.20, 0.105, 0.462);
  base_assembly.add(base_badge_mark);

  const base_stainsGeom = new THREE.CircleGeometry(1, 14);
  const base_stains = new THREE.InstancedMesh(base_stainsGeom, rustMat, 6);
  base_stains.name = "base_stains";
  const base_stain_data = [
    [-0.31, 0.214, 0.23, 0.050, 0.020],
    [0.18, 0.214, 0.27, 0.035, 0.016],
    [0.36, 0.214, -0.18, 0.026, 0.012],
    [-0.12, 0.214, -0.25, 0.042, 0.015],
    [0.05, 0.214, 0.12, 0.020, 0.010],
    [-0.42, 0.214, -0.04, 0.018, 0.009],
  ];
  for (let i = 0; i < base_stain_data.length; i++) {
    const s = base_stain_data[i];
    setInstance(base_stains, i, s[0], s[1], s[2], -Math.PI / 2, 0, 0, s[3], s[4], 1);
  }
  base_stains.instanceMatrix.needsUpdate = true;
  base_assembly.add(base_stains);

  const lower_assembly = new THREE.Group();
  lower_assembly.name = "lower_assembly";
  root.add(lower_assembly);

  const lower_bodyGeom = roundedExtrudeGeometry(0.82, 0.86, 0.64, 0.065, 0.018);
  const lower_body = new THREE.Mesh(lower_bodyGeom, brushed_metalMat);
  lower_body.name = "lower_body";
  lower_body.position.set(0, 0.65, 0);
  lower_assembly.add(lower_body);

  const lower_front_panelGeom = roundedExtrudeGeometry(0.72, 0.72, 0.018, 0.035, 0.005);
  const lower_front_panel = new THREE.Mesh(lower_front_panelGeom, silver_metalMat);
  lower_front_panel.name = "lower_front_panel";
  lower_front_panel.position.set(0, 0.62, 0.337);
  lower_assembly.add(lower_front_panel);

  const lower_bottom_gapGeom = new THREE.BoxGeometry(0.58, 0.035, 0.012);
  const lower_bottom_gap = new THREE.Mesh(lower_bottom_gapGeom, black_plasticMat);
  lower_bottom_gap.name = "lower_bottom_gap";
  lower_bottom_gap.position.set(0, 0.226, 0.352);
  lower_assembly.add(lower_bottom_gap);

  const lower_ventGeom = roundedExtrudeGeometry(0.13, 0.055, 0.012, 0.025, 0.003);
  const lower_vent = new THREE.Mesh(lower_ventGeom, black_plasticMat);
  lower_vent.name = "lower_vent";
  lower_vent.position.set(0, 0.31, 0.356);
  lower_assembly.add(lower_vent);

  const front_sensor_holeGeom = new THREE.CylinderGeometry(0.023, 0.023, 0.012, 16);
  const front_sensor_hole = new THREE.Mesh(front_sensor_holeGeom, black_plasticMat);
  front_sensor_hole.name = "front_sensor_hole";
  front_sensor_hole.rotation.x = Math.PI / 2;
  front_sensor_hole.position.set(0.245, 0.91, 0.356);
  lower_assembly.add(front_sensor_hole);

  const front_labelGeom = roundedExtrudeGeometry(0.19, 0.07, 0.008, 0.022, 0.002);
  const front_label = new THREE.Mesh(front_labelGeom, labelMat);
  front_label.name = "front_label";
  front_label.position.set(0, 0.48, 0.357);
  lower_assembly.add(front_label);

  const front_label_marksGeom = new THREE.BoxGeometry(0.018, 0.008, 0.004);
  const front_label_marks = new THREE.InstancedMesh(front_label_marksGeom, dark_metalMat, 5);
  front_label_marks.name = "front_label_marks";
  for (let i = 0; i < 5; i++) {
    setInstance(
      front_label_marks,
      i,
      -0.055 + i * 0.027,
      0.48,
      0.365,
      0,
      0,
      i % 2 === 0 ? 0.12 : -0.12,
      1,
      1,
      1
    );
  }
  front_label_marks.instanceMatrix.needsUpdate = true;
  lower_assembly.add(front_label_marks);

  const lower_side_screwGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 16);
  const lower_side_screw = new THREE.Mesh(lower_side_screwGeom, silver_metalMat);
  lower_side_screw.name = "lower_side_screw";
  lower_side_screw.rotation.z = -Math.PI / 2;
  lower_side_screw.position.set(0.426, 0.43, -0.20);
  lower_assembly.add(lower_side_screw);

  const lower_stainsGeom = new THREE.CircleGeometry(1, 14);
  const lower_stains = new THREE.InstancedMesh(lower_stainsGeom, rustMat, 6);
  lower_stains.name = "lower_stains";
  const lower_stain_data = [
    [-0.25, 0.83, 0.352, 0.045, 0.016],
    [0.18, 0.72, 0.352, 0.025, 0.012],
    [-0.12, 0.39, 0.352, 0.020, 0.009],
    [0.27, 0.50, 0.352, 0.030, 0.014],
    [-0.30, 0.59, 0.352, 0.018, 0.008],
    [0.08, 0.91, 0.352, 0.016, 0.007],
  ];
  for (let i = 0; i < lower_stain_data.length; i++) {
    const s = lower_stain_data[i];
    setInstance(lower_stains, i, s[0], s[1], s[2], 0, 0, 0, s[3], s[4], 1);
  }
  lower_stains.instanceMatrix.needsUpdate = true;
  lower_assembly.add(lower_stains);

  const upper_assembly = new THREE.Group();
  upper_assembly.name = "upper_assembly";
  root.add(upper_assembly);

  const upper_bodyGeom = roundedExtrudeGeometry(1.00, 0.57, 0.76, 0.075, 0.022);
  const upper_body = new THREE.Mesh(upper_bodyGeom, brushed_metalMat);
  upper_body.name = "upper_body";
  upper_body.position.set(0, 1.335, 0);
  upper_assembly.add(upper_body);

  const upper_front_panelGeom = roundedExtrudeGeometry(0.96, 0.48, 0.035, 0.055, 0.012);
  const upper_front_panel = new THREE.Mesh(upper_front_panelGeom, silver_metalMat);
  upper_front_panel.name = "upper_front_panel";
  upper_front_panel.position.set(0, 1.34, 0.405);
  upper_assembly.add(upper_front_panel);

  const display_bezelGeom = roundedExtrudeGeometry(0.78, 0.39, 0.025, 0.045, 0.008);
  const display_bezel = new THREE.Mesh(display_bezelGeom, dark_metalMat);
  display_bezel.name = "display_bezel";
  display_bezel.position.set(-0.055, 1.34, 0.438);
  upper_assembly.add(display_bezel);

  const display_windowGeom = roundedExtrudeGeometry(0.68, 0.30, 0.014, 0.035, 0.004);
  const display_window = new THREE.Mesh(display_windowGeom, red_windowMat);
  display_window.name = "display_window";
  display_window.position.set(-0.055, 1.34, 0.458);
  upper_assembly.add(display_window);

  const display_digits = new THREE.Group();
  display_digits.name = "display_digits";
  upper_assembly.add(display_digits);

  const led_segmentGeom = roundedExtrudeGeometry(0.105, 0.024, 0.008, 0.011, 0.002);
  const segment_positions = [
    [0, 0.105, 0],
    [0.061, 0.053, Math.PI / 2],
    [0.061, -0.053, Math.PI / 2],
    [0, -0.105, 0],
    [-0.061, -0.053, Math.PI / 2],
    [-0.061, 0.053, Math.PI / 2],
    [0, 0, 0],
  ];
  const digit_masks = [
    [1, 2],
    [0, 1, 2, 3, 4, 5, 6],
  ];
  const digit_centers = [-0.17, 0.08];
  const led_segments = new THREE.InstancedMesh(led_segmentGeom, ledMat, 9);
  led_segments.name = "led_segments";
  let led_index = 0;
  for (let d = 0; d < digit_masks.length; d++) {
    for (let j = 0; j < digit_masks[d].length; j++) {
      const segment_id = digit_masks[d][j];
      const p = segment_positions[segment_id];
      setInstance(
        led_segments,
        led_index,
        digit_centers[d] + p[0],
        1.34 + p[1],
        0.472,
        0,
        0,
        p[2],
        1,
        1,
        1
      );
      led_index++;
    }
  }
  led_segments.instanceMatrix.needsUpdate = true;
  display_digits.add(led_segments);

  const led_highlightsGeom = new THREE.BoxGeometry(0.068, 0.006, 0.004);
  const led_highlights = new THREE.InstancedMesh(led_highlightsGeom, led_highlightMat, 9);
  led_highlights.name = "led_highlights";
  led_index = 0;
  for (let d = 0; d < digit_masks.length; d++) {
    for (let j = 0; j < digit_masks[d].length; j++) {
      const segment_id = digit_masks[d][j];
      const p = segment_positions[segment_id];
      setInstance(
        led_highlights,
        led_index,
        digit_centers[d] + p[0],
        1.34 + p[1],
        0.479,
        0,
        0,
        p[2],
        1,
        1,
        1
      );
      led_index++;
    }
  }
  led_highlights.instanceMatrix.needsUpdate = true;
  display_digits.add(led_highlights);

  const display_screwsGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.008, 12);
  const display_screws = new THREE.InstancedMesh(display_screwsGeom, dark_metalMat, 4);
  display_screws.name = "display_screws";
  const display_screw_positions = [
    [-0.405, 1.18, 0.462],
    [0.305, 1.18, 0.462],
    [-0.405, 1.50, 0.462],
    [0.305, 1.50, 0.462],
  ];
  for (let i = 0; i < display_screw_positions.length; i++) {
    const p = display_screw_positions[i];
    setInstance(display_screws, i, p[0], p[1], p[2], Math.PI / 2, 0, 0, 1, 1, 1);
  }
  display_screws.instanceMatrix.needsUpdate = true;
  upper_assembly.add(display_screws);

  const underside_connectorGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.055, 18);
  const underside_connector = new THREE.Mesh(underside_connectorGeom, black_plasticMat);
  underside_connector.name = "underside_connector";
  underside_connector.position.set(-0.18, 1.035, 0.25);
  upper_assembly.add(underside_connector);

  const side_doorGeom = roundedExtrudeGeometry(0.60, 1.18, 0.025, 0.025, 0.006);
  const side_door = new THREE.Mesh(side_doorGeom, brushed_metalMat);
  side_door.name = "side_door";
  side_door.rotation.y = Math.PI / 2;
  side_door.position.set(0.526, 0.78, -0.03);
  root.add(side_door);

  const side_door_seams = new THREE.Group();
  side_door_seams.name = "side_door_seams";
  const side_door_vertical_seamGeom = new THREE.BoxGeometry(0.008, 1.12, 0.012);
  for (const z of [-0.335, 0.275]) {
    const seam = new THREE.Mesh(side_door_vertical_seamGeom, dark_metalMat);
    seam.position.set(0.542, 0.78, z);
    side_door_seams.add(seam);
  }
  const side_door_horizontal_seamGeom = new THREE.BoxGeometry(0.008, 0.012, 0.58);
  for (const y of [0.22, 1.34]) {
    const seam = new THREE.Mesh(side_door_horizontal_seamGeom, dark_metalMat);
    seam.position.set(0.542, y, -0.03);
    side_door_seams.add(seam);
  }
  root.add(side_door_seams);

  const side_door_screwsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 16);
  const side_door_screws = new THREE.InstancedMesh(side_door_screwsGeom, silver_metalMat, 4);
  side_door_screws.name = "side_door_screws";
  const side_screw_positions = [
    [0.548, 1.18, 0.22],
    [0.548, 0.78, 0.22],
    [0.548, 0.36, 0.22],
    [0.548, 0.42, -0.27],
  ];
  for (let i = 0; i < side_screw_positions.length; i++) {
    const p = side_screw_positions[i];
    setInstance(side_door_screws, i, p[0], p[1], p[2], 0, 0, -Math.PI / 2, 1, 1, 1);
  }
  side_door_screws.instanceMatrix.needsUpdate = true;
  root.add(side_door_screws);

  const side_door_hingeGeom = roundedExtrudeGeometry(0.24, 0.075, 0.028, 0.015, 0.005);
  const side_door_hinge = new THREE.Mesh(side_door_hingeGeom, dark_metalMat);
  side_door_hinge.name = "side_door_hinge";
  side_door_hinge.rotation.y = Math.PI / 2;
  side_door_hinge.position.set(0.548, 1.43, 0.16);
  root.add(side_door_hinge);

  const side_door_hinge_pinGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.20, 14);
  const side_door_hinge_pin = new THREE.Mesh(side_door_hinge_pinGeom, silver_metalMat);
  side_door_hinge_pin.name = "side_door_hinge_pin";
  side_door_hinge_pin.rotation.x = Math.PI / 2;
  side_door_hinge_pin.position.set(0.568, 1.445, 0.16);
  root.add(side_door_hinge_pin);

  const side_knobGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.085, 20);
  const side_knob = new THREE.Mesh(side_knobGeom, dark_metalMat);
  side_knob.name = "side_knob";
  side_knob.rotation.z = -Math.PI / 2;
  side_knob.position.set(0.555, 1.46, -0.32);
  root.add(side_knob);

  const side_stainsGeom = new THREE.CircleGeometry(1, 14);
  const side_stains = new THREE.InstancedMesh(side_stainsGeom, rustMat, 7);
  side_stains.name = "side_stains";
  const side_stain_data = [
    [0.544, 0.99, 0.05, 0.050, 0.018],
    [0.544, 0.69, -0.10, 0.035, 0.015],
    [0.544, 0.47, 0.10, 0.025, 0.012],
    [0.544, 1.19, -0.18, 0.022, 0.010],
    [0.544, 0.31, -0.08, 0.018, 0.008],
    [0.544, 0.86, -0.25, 0.030, 0.012],
    [0.544, 0.57, -0.20, 0.020, 0.009],
  ];
  for (let i = 0; i < side_stain_data.length; i++) {
    const s = side_stain_data[i];
    setInstance(side_stains, i, s[0], s[1], s[2], 0, Math.PI / 2, 0, s[3], s[4], 1);
  }
  side_stains.instanceMatrix.needsUpdate = true;
  root.add(side_stains);

  const lid_assembly = new THREE.Group();
  lid_assembly.name = "lid_assembly";
  root.add(lid_assembly);

  const lid_lower_shadowGeom = roundedExtrudeGeometry(1.00, 0.77, 0.025, 0.07, 0.006);
  const lid_lower_shadow = new THREE.Mesh(lid_lower_shadowGeom, dark_metalMat);
  lid_lower_shadow.name = "lid_lower_shadow";
  lid_lower_shadow.rotation.x = -Math.PI / 2;
  lid_lower_shadow.position.y = 1.605;
  lid_assembly.add(lid_lower_shadow);

  const top_lidGeom = roundedExtrudeGeometry(1.06, 0.82, 0.105, 0.085, 0.025);
  const top_lid = new THREE.Mesh(top_lidGeom, silver_metalMat);
  top_lid.name = "top_lid";
  top_lid.rotation.x = -Math.PI / 2;
  top_lid.position.y = 1.665;
  lid_assembly.add(top_lid);

  const top_access_discGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.009, 32);
  const top_access_disc = new THREE.Mesh(top_access_discGeom, brushed_metalMat);
  top_access_disc.name = "top_access_disc";
  top_access_disc.position.set(0.04, 1.752, -0.04);
  lid_assembly.add(top_access_disc);

  const top_access_ringGeom = new THREE.TorusGeometry(0.125, 0.006, 8, 32);
  const top_access_ring = new THREE.Mesh(top_access_ringGeom, dark_metalMat);
  top_access_ring.name = "top_access_ring";
  top_access_ring.rotation.x = Math.PI / 2;
  top_access_ring.position.set(0.04, 1.759, -0.04);
  lid_assembly.add(top_access_ring);

  const top_printGeom = new THREE.BoxGeometry(0.045, 0.005, 0.012);
  const top_print = new THREE.InstancedMesh(top_printGeom, rustMat, 5);
  top_print.name = "top_print";
  for (let i = 0; i < 5; i++) {
    setInstance(
      top_print,
      i,
      -0.28 + i * 0.045,
      1.756,
      0.13 + (i % 2) * 0.012,
      0,
      0,
      i % 2 === 0 ? 0.08 : -0.08,
      1,
      1,
      1
    );
  }
  top_print.instanceMatrix.needsUpdate = true;
  lid_assembly.add(top_print);

  const top_stainsGeom = new THREE.CircleGeometry(1, 14);
  const top_stains = new THREE.InstancedMesh(top_stainsGeom, rustMat, 6);
  top_stains.name = "top_stains";
  const top_stain_data = [
    [-0.34, 1.758, -0.12, 0.035, 0.013],
    [0.30, 1.758, 0.17, 0.025, 0.010],
    [-0.12, 1.758, 0.25, 0.018, 0.008],
    [0.35, 1.758, -0.20, 0.020, 0.009],
    [-0.39, 1.758, 0.20, 0.016, 0.007],
    [0.12, 1.758, -0.28, 0.014, 0.006],
  ];
  for (let i = 0; i < top_stain_data.length; i++) {
    const s = top_stain_data[i];
    setInstance(top_stains, i, s[0], s[1], s[2], -Math.PI / 2, 0, 0, s[3], s[4], 1);
  }
  top_stains.instanceMatrix.needsUpdate = true;
  lid_assembly.add(top_stains);

  const upper_side_grimeGeom = new THREE.CircleGeometry(1, 12);
  const upper_side_grime = new THREE.InstancedMesh(upper_side_grimeGeom, grimeMat, 5);
  upper_side_grime.name = "upper_side_grime";
  const upper_side_grime_data = [
    [0.523, 1.26, 0.12, 0.025, 0.010],
    [0.523, 1.48, -0.10, 0.018, 0.008],
    [0.523, 1.16, -0.22, 0.020, 0.009],
    [0.523, 1.36, 0.25, 0.015, 0.007],
    [0.523, 1.53, 0.04, 0.012, 0.006],
  ];
  for (let i = 0; i < upper_side_grime_data.length; i++) {
    const s = upper_side_grime_data[i];
    setInstance(
      upper_side_grime,
      i,
      s[0],
      s[1],
      s[2],
      0,
      Math.PI / 2,
      0,
      s[3],
      s[4],
      1
    );
  }
  upper_side_grime.instanceMatrix.needsUpdate = true;
  root.add(upper_side_grime);

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