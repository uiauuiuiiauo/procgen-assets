export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8a6238,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x49331f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const redPaintMat = new THREE.MeshStandardMaterial({
    color: 0xa53f3d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const fadedRedMat = new THREE.MeshStandardMaterial({
    color: 0xb85d55,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkRedMat = new THREE.MeshStandardMaterial({
    color: 0x71312f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gasketMat = new THREE.MeshStandardMaterial({
    color: 0x211d1a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const exposedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x777b76,
    metalness: 0.5,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x171513,
    metalness: 0.0,
    roughness: 0.8,
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
      depth,
      steps: 1,
      curveSegments: 5,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const cabinet_body = new THREE.Group();
  root.add(cabinet_body);

  const cabinet_coreGeom = new THREE.BoxGeometry(0.98, 1.18, 0.78);
  const cabinet_core = new THREE.Mesh(cabinet_coreGeom, darkWoodMat);
  cabinet_core.position.set(0, 0.65, 0);
  cabinet_body.add(cabinet_core);

  const front_door_backingGeom = roundedBoxGeometry(0.91, 1.11, 0.025, 0.018, 0.003);
  const front_door_backing = new THREE.Mesh(front_door_backingGeom, gasketMat);
  front_door_backing.position.set(0, 0.65, 0.405);
  cabinet_body.add(front_door_backing);

  const front_red_panelGeom = roundedBoxGeometry(0.875, 1.075, 0.026, 0.014, 0.003);
  const front_red_panel = new THREE.Mesh(front_red_panelGeom, redPaintMat);
  front_red_panel.position.set(0, 0.65, 0.421);
  cabinet_body.add(front_red_panel);

  const side_panelGeom = roundedBoxGeometry(0.735, 1.105, 0.026, 0.014, 0.003);

  const left_side_panel = new THREE.Mesh(side_panelGeom, redPaintMat);
  left_side_panel.rotation.y = Math.PI / 2;
  left_side_panel.position.set(-0.505, 0.65, 0);
  cabinet_body.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, redPaintMat);
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.set(0.505, 0.65, 0);
  cabinet_body.add(right_side_panel);

  const rear_red_panelGeom = roundedBoxGeometry(0.88, 1.10, 0.026, 0.014, 0.003);
  const rear_red_panel = new THREE.Mesh(rear_red_panelGeom, redPaintMat);
  rear_red_panel.position.set(0, 0.65, -0.402);
  cabinet_body.add(rear_red_panel);

  const top_insetGeom = roundedBoxGeometry(0.88, 0.70, 0.025, 0.025, 0.004);
  const top_inset = new THREE.Mesh(top_insetGeom, fadedRedMat);
  top_inset.rotation.x = -Math.PI / 2;
  top_inset.position.set(0, 1.255, 0);
  cabinet_body.add(top_inset);

  const bottom_insetGeom = new THREE.BoxGeometry(0.88, 0.025, 0.68);
  const bottom_inset = new THREE.Mesh(bottom_insetGeom, darkRedMat);
  bottom_inset.position.set(0, 0.045, 0);
  cabinet_body.add(bottom_inset);

  const corner_postsGeom = roundedBoxGeometry(0.105, 1.25, 0.105, 0.024, 0.007);
  const corner_posts = new THREE.InstancedMesh(corner_postsGeom, woodMat, 4);
  const cornerPostPositions = [
    [-0.49, 0.65, -0.39],
    [0.49, 0.65, -0.39],
    [-0.49, 0.65, 0.39],
    [0.49, 0.65, 0.39],
  ];
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < cornerPostPositions.length; i++) {
    const p = cornerPostPositions[i];
    instanceMatrix.makeTranslation(p[0], p[1], p[2]);
    corner_posts.setMatrixAt(i, instanceMatrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  cabinet_body.add(corner_posts);

  const horizontal_x_railGeom = roundedBoxGeometry(1.04, 0.11, 0.105, 0.025, 0.007);

  const top_front_rail = new THREE.Mesh(horizontal_x_railGeom, woodMat);
  top_front_rail.position.set(0, 1.245, 0.39);
  cabinet_body.add(top_front_rail);

  const bottom_front_rail = new THREE.Mesh(horizontal_x_railGeom, woodMat);
  bottom_front_rail.position.set(0, 0.055, 0.39);
  cabinet_body.add(bottom_front_rail);

  const top_rear_rail = new THREE.Mesh(horizontal_x_railGeom, woodMat);
  top_rear_rail.position.set(0, 1.245, -0.39);
  cabinet_body.add(top_rear_rail);

  const bottom_rear_rail = new THREE.Mesh(horizontal_x_railGeom, woodMat);
  bottom_rear_rail.position.set(0, 0.055, -0.39);
  cabinet_body.add(bottom_rear_rail);

  const horizontal_z_railGeom = roundedBoxGeometry(0.105, 0.11, 0.78, 0.025, 0.007);

  const top_left_rail = new THREE.Mesh(horizontal_z_railGeom, woodMat);
  top_left_rail.position.set(-0.49, 1.245, 0);
  cabinet_body.add(top_left_rail);

  const top_right_rail = new THREE.Mesh(horizontal_z_railGeom, woodMat);
  top_right_rail.position.set(0.49, 1.245, 0);
  cabinet_body.add(top_right_rail);

  const bottom_left_rail = new THREE.Mesh(horizontal_z_railGeom, woodMat);
  bottom_left_rail.position.set(-0.49, 0.055, 0);
  cabinet_body.add(bottom_left_rail);

  const bottom_right_rail = new THREE.Mesh(horizontal_z_railGeom, woodMat);
  bottom_right_rail.position.set(0.49, 0.055, 0);
  cabinet_body.add(bottom_right_rail);

  const front_door_gasket_verticalGeom = new THREE.BoxGeometry(0.018, 1.075, 0.014);

  const front_door_gasket_left = new THREE.Mesh(front_door_gasket_verticalGeom, gasketMat);
  front_door_gasket_left.position.set(-0.444, 0.65, 0.438);
  cabinet_body.add(front_door_gasket_left);

  const front_door_gasket_right = new THREE.Mesh(front_door_gasket_verticalGeom, gasketMat);
  front_door_gasket_right.position.set(0.444, 0.65, 0.438);
  cabinet_body.add(front_door_gasket_right);

  const front_door_gasket_horizontalGeom = new THREE.BoxGeometry(0.88, 0.018, 0.014);

  const front_door_gasket_top = new THREE.Mesh(front_door_gasket_horizontalGeom, gasketMat);
  front_door_gasket_top.position.set(0, 1.186, 0.438);
  cabinet_body.add(front_door_gasket_top);

  const front_door_gasket_bottom = new THREE.Mesh(front_door_gasket_horizontalGeom, gasketMat);
  front_door_gasket_bottom.position.set(0, 0.114, 0.438);
  cabinet_body.add(front_door_gasket_bottom);

  const side_panel_gasket_verticalGeom = new THREE.BoxGeometry(0.012, 1.075, 0.018);

  const left_side_gasket_front = new THREE.Mesh(side_panel_gasket_verticalGeom, gasketMat);
  left_side_gasket_front.position.set(-0.522, 0.65, 0.374);
  cabinet_body.add(left_side_gasket_front);

  const left_side_gasket_rear = new THREE.Mesh(side_panel_gasket_verticalGeom, gasketMat);
  left_side_gasket_rear.position.set(-0.522, 0.65, -0.374);
  cabinet_body.add(left_side_gasket_rear);

  const right_side_gasket_front = new THREE.Mesh(side_panel_gasket_verticalGeom, gasketMat);
  right_side_gasket_front.position.set(0.522, 0.65, 0.374);
  cabinet_body.add(right_side_gasket_front);

  const right_side_gasket_rear = new THREE.Mesh(side_panel_gasket_verticalGeom, gasketMat);
  right_side_gasket_rear.position.set(0.522, 0.65, -0.374);
  cabinet_body.add(right_side_gasket_rear);

  const side_panel_gasket_horizontalGeom = new THREE.BoxGeometry(0.012, 0.018, 0.735);

  const left_side_gasket_top = new THREE.Mesh(side_panel_gasket_horizontalGeom, gasketMat);
  left_side_gasket_top.position.set(-0.522, 1.186, 0);
  cabinet_body.add(left_side_gasket_top);

  const left_side_gasket_bottom = new THREE.Mesh(side_panel_gasket_horizontalGeom, gasketMat);
  left_side_gasket_bottom.position.set(-0.522, 0.114, 0);
  cabinet_body.add(left_side_gasket_bottom);

  const right_side_gasket_top = new THREE.Mesh(side_panel_gasket_horizontalGeom, gasketMat);
  right_side_gasket_top.position.set(0.522, 1.186, 0);
  cabinet_body.add(right_side_gasket_top);

  const right_side_gasket_bottom = new THREE.Mesh(side_panel_gasket_horizontalGeom, gasketMat);
  right_side_gasket_bottom.position.set(0.522, 0.114, 0);
  cabinet_body.add(right_side_gasket_bottom);

  const front_controls = new THREE.Group();
  root.add(front_controls);

  const front_display_gasketGeom = roundedBoxGeometry(0.75, 0.66, 0.014, 0.012, 0.002);
  const front_display_gasket = new THREE.Mesh(front_display_gasketGeom, gasketMat);
  front_display_gasket.position.set(0, 0.84, 0.443);
  front_controls.add(front_display_gasket);

  const front_display_panelGeom = roundedBoxGeometry(0.715, 0.625, 0.018, 0.009, 0.002);
  const front_display_panel = new THREE.Mesh(front_display_panelGeom, redPaintMat);
  front_display_panel.position.set(0, 0.84, 0.451);
  front_controls.add(front_display_panel);

  const control_panel_dividerGeom = new THREE.BoxGeometry(0.72, 0.025, 0.016);
  const control_panel_divider = new THREE.Mesh(control_panel_dividerGeom, brushedMetalMat);
  control_panel_divider.position.set(0, 0.492, 0.453);
  front_controls.add(control_panel_divider);

  const knobRingGeom = new THREE.TorusGeometry(0.077, 0.016, 10, 28);
  const knobHubGeom = new THREE.CylinderGeometry(0.064, 0.072, 0.065, 24);
  const knobCapGeom = new THREE.CylinderGeometry(0.059, 0.059, 0.018, 24);
  const knobFaceGeom = new THREE.CircleGeometry(0.054, 24);

  const left_knob_mount = new THREE.Mesh(knobRingGeom, darkMetalMat);
  left_knob_mount.position.set(-0.275, 0.31, 0.468);
  front_controls.add(left_knob_mount);

  const left_knob_hub = new THREE.Mesh(knobHubGeom, darkRedMat);
  left_knob_hub.rotation.x = Math.PI / 2;
  left_knob_hub.position.set(-0.275, 0.31, 0.497);
  front_controls.add(left_knob_hub);

  const left_knob_cap = new THREE.Mesh(knobCapGeom, fadedRedMat);
  left_knob_cap.rotation.x = Math.PI / 2;
  left_knob_cap.position.set(-0.275, 0.31, 0.535);
  front_controls.add(left_knob_cap);

  const left_knob_face = new THREE.Mesh(knobFaceGeom, fadedRedMat);
  left_knob_face.position.set(-0.275, 0.31, 0.545);
  front_controls.add(left_knob_face);

  const center_knob_mount = new THREE.Mesh(knobRingGeom, darkMetalMat);
  center_knob_mount.position.set(0, 0.31, 0.468);
  front_controls.add(center_knob_mount);

  const center_knob_hub = new THREE.Mesh(knobHubGeom, darkMetalMat);
  center_knob_hub.rotation.x = Math.PI / 2;
  center_knob_hub.position.set(0, 0.31, 0.497);
  front_controls.add(center_knob_hub);

  const center_knob_cap = new THREE.Mesh(knobCapGeom, brushedMetalMat);
  center_knob_cap.rotation.x = Math.PI / 2;
  center_knob_cap.position.set(0, 0.31, 0.535);
  front_controls.add(center_knob_cap);

  const center_knob_face = new THREE.Mesh(knobFaceGeom, brushedMetalMat);
  center_knob_face.position.set(0, 0.31, 0.545);
  front_controls.add(center_knob_face);

  const right_knob_mount = new THREE.Mesh(knobRingGeom, darkMetalMat);
  right_knob_mount.position.set(0.275, 0.31, 0.468);
  front_controls.add(right_knob_mount);

  const right_knob_hub = new THREE.Mesh(knobHubGeom, darkRedMat);
  right_knob_hub.rotation.x = Math.PI / 2;
  right_knob_hub.position.set(0.275, 0.31, 0.497);
  front_controls.add(right_knob_hub);

  const right_knob_cap = new THREE.Mesh(knobCapGeom, fadedRedMat);
  right_knob_cap.rotation.x = Math.PI / 2;
  right_knob_cap.position.set(0.275, 0.31, 0.535);
  front_controls.add(right_knob_cap);

  const right_knob_face = new THREE.Mesh(knobFaceGeom, fadedRedMat);
  right_knob_face.position.set(0.275, 0.31, 0.545);
  front_controls.add(right_knob_face);

  const knob_markerGeom = new THREE.BoxGeometry(0.008, 0.034, 0.005);

  const left_knob_marker = new THREE.Mesh(knob_markerGeom, darkRedMat);
  left_knob_marker.position.set(-0.275, 0.342, 0.548);
  front_controls.add(left_knob_marker);

  const center_knob_marker = new THREE.Mesh(knob_markerGeom, darkMetalMat);
  center_knob_marker.position.set(0, 0.342, 0.548);
  front_controls.add(center_knob_marker);

  const right_knob_marker = new THREE.Mesh(knob_markerGeom, darkRedMat);
  right_knob_marker.position.set(0.275, 0.342, 0.548);
  front_controls.add(right_knob_marker);

  const hardware = new THREE.Group();
  root.add(hardware);

  const frontScrewPositions = [
    [-0.35, 1.105],
    [0.35, 1.105],
    [-0.35, 0.575],
    [0.35, 0.575],
    [-0.35, 0.515],
    [0.35, 0.515],
    [-0.35, 0.155],
    [0.35, 0.155],
    [-0.08, 0.445],
    [0.08, 0.445],
    [-0.10, 0.185],
    [0.10, 0.185],
  ];

  const front_screwsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 14);
  const front_screws = new THREE.InstancedMesh(
    front_screwsGeom,
    darkMetalMat,
    frontScrewPositions.length
  );
  const frontScrewQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const unitScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < frontScrewPositions.length; i++) {
    const p = frontScrewPositions[i];
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], 0.465),
      frontScrewQuat,
      unitScale
    );
    front_screws.setMatrixAt(i, instanceMatrix);
  }
  front_screws.instanceMatrix.needsUpdate = true;
  hardware.add(front_screws);

  const front_screw_slotsGeom = new THREE.BoxGeometry(0.021, 0.0035, 0.004);
  const front_screw_slots = new THREE.InstancedMesh(
    front_screw_slotsGeom,
    blackMat,
    frontScrewPositions.length
  );
  for (let i = 0; i < frontScrewPositions.length; i++) {
    const p = frontScrewPositions[i];
    const slotQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, ((i % 3) - 1) * 0.32)
    );
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], 0.472),
      slotQuat,
      unitScale
    );
    front_screw_slots.setMatrixAt(i, instanceMatrix);
  }
  front_screw_slots.instanceMatrix.needsUpdate = true;
  hardware.add(front_screw_slots);

  const sideScrewPositions = [
    [1.10, 0.30],
    [1.10, -0.30],
    [0.68, 0.30],
    [0.68, -0.30],
    [0.18, 0.30],
    [0.18, -0.30],
  ];

  const side_screwsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 14);
  const side_screws = new THREE.InstancedMesh(
    side_screwsGeom,
    darkMetalMat,
    sideScrewPositions.length * 2
  );
  let sideScrewIndex = 0;
  for (const side of [-1, 1]) {
    const sideScrewQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, -side * Math.PI / 2)
    );
    for (let i = 0; i < sideScrewPositions.length; i++) {
      const p = sideScrewPositions[i];
      instanceMatrix.compose(
        new THREE.Vector3(side * 0.526, p[0], p[1]),
        sideScrewQuat,
        unitScale
      );
      side_screws.setMatrixAt(sideScrewIndex++, instanceMatrix);
    }
  }
  side_screws.instanceMatrix.needsUpdate = true;
  hardware.add(side_screws);

  const topScrewPositions = [
    [-0.34, -0.27],
    [0.34, -0.27],
    [-0.34, 0.27],
    [0.34, 0.27],
  ];
  const top_screwsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 14);
  const top_screws = new THREE.InstancedMesh(
    top_screwsGeom,
    darkMetalMat,
    topScrewPositions.length
  );
  const identityQuat = new THREE.Quaternion();
  for (let i = 0; i < topScrewPositions.length; i++) {
    const p = topScrewPositions[i];
    instanceMatrix.compose(
      new THREE.Vector3(p[0], 1.274, p[1]),
      identityQuat,
      unitScale
    );
    top_screws.setMatrixAt(i, instanceMatrix);
  }
  top_screws.instanceMatrix.needsUpdate = true;
  hardware.add(top_screws);

  const front_frame_screwsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.01, 12);
  const frontFrameScrewPositions = [
    [-0.49, 1.245],
    [0.49, 1.245],
    [-0.49, 0.055],
    [0.49, 0.055],
    [-0.49, 0.72],
    [0.49, 0.72],
  ];
  const front_frame_screws = new THREE.InstancedMesh(
    front_frame_screwsGeom,
    darkMetalMat,
    frontFrameScrewPositions.length
  );
  for (let i = 0; i < frontFrameScrewPositions.length; i++) {
    const p = frontFrameScrewPositions[i];
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], 0.452),
      frontScrewQuat,
      unitScale
    );
    front_frame_screws.setMatrixAt(i, instanceMatrix);
  }
  front_frame_screws.instanceMatrix.needsUpdate = true;
  hardware.add(front_frame_screws);

  const left_side_access_plateGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.014, 24);
  const left_side_access_plate = new THREE.Mesh(left_side_access_plateGeom, darkMetalMat);
  left_side_access_plate.rotation.z = Math.PI / 2;
  left_side_access_plate.position.set(-0.535, 0.19, 0.255);
  hardware.add(left_side_access_plate);

  const left_side_keyholeGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.006, 14);
  const left_side_keyhole = new THREE.Mesh(left_side_keyholeGeom, blackMat);
  left_side_keyhole.rotation.z = Math.PI / 2;
  left_side_keyhole.position.set(-0.546, 0.19, 0.255);
  hardware.add(left_side_keyhole);

  const left_side_key_slotGeom = new THREE.BoxGeometry(0.006, 0.038, 0.009);
  const left_side_key_slot = new THREE.Mesh(left_side_key_slotGeom, blackMat);
  left_side_key_slot.position.set(-0.548, 0.214, 0.255);
  hardware.add(left_side_key_slot);

  const left_side_hinge_barrelGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.115, 14);
  const left_side_hinge_barrel = new THREE.Mesh(left_side_hinge_barrelGeom, darkMetalMat);
  left_side_hinge_barrel.position.set(-0.548, 0.83, 0.374);
  hardware.add(left_side_hinge_barrel);

  const left_side_hinge_leafGeom = new THREE.BoxGeometry(0.014, 0.075, 0.065);
  const left_side_hinge_leaf = new THREE.Mesh(left_side_hinge_leafGeom, darkMetalMat);
  left_side_hinge_leaf.position.set(-0.535, 0.83, 0.343);
  hardware.add(left_side_hinge_leaf);

  const left_side_hinge_pinGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.13, 10);
  const left_side_hinge_pin = new THREE.Mesh(left_side_hinge_pinGeom, brushedMetalMat);
  left_side_hinge_pin.position.set(-0.548, 0.83, 0.374);
  hardware.add(left_side_hinge_pin);

  const feetGeom = new THREE.CylinderGeometry(0.035, 0.04, 0.035, 12);
  const feet = new THREE.InstancedMesh(feetGeom, blackMat, 4);
  const footPositions = [
    [-0.40, -0.017, -0.30],
    [0.40, -0.017, -0.30],
    [-0.40, -0.017, 0.30],
    [0.40, -0.017, 0.30],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    instanceMatrix.makeTranslation(p[0], p[1], p[2]);
    feet.setMatrixAt(i, instanceMatrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  hardware.add(feet);

  const front_wood_grainGeom = new THREE.BoxGeometry(0.10, 0.005, 0.004);
  const front_wood_grain = new THREE.InstancedMesh(front_wood_grainGeom, darkWoodMat, 16);
  for (let i = 0; i < 16; i++) {
    const row = i < 8 ? 1.245 : 0.055;
    const column = i % 8;
    const x = -0.39 + column * 0.11;
    const y = row + (column % 2 === 0 ? 0.012 : -0.012);
    const grainQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, ((column % 3) - 1) * 0.08)
    );
    instanceMatrix.compose(
      new THREE.Vector3(x, y, 0.451),
      grainQuat,
      new THREE.Vector3(0.55 + (column % 3) * 0.16, 1, 1)
    );
    front_wood_grain.setMatrixAt(i, instanceMatrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(front_wood_grain);

  const vertical_wood_grainGeom = new THREE.BoxGeometry(0.005, 0.10, 0.004);
  const vertical_wood_grain = new THREE.InstancedMesh(vertical_wood_grainGeom, darkWoodMat, 12);
  for (let i = 0; i < 12; i++) {
    const side = i < 6 ? -1 : 1;
    const row = i % 6;
    const x = side * 0.49 + ((row % 2) - 0.5) * 0.018;
    const y = 0.22 + row * 0.19;
    instanceMatrix.makeTranslation(x, y, 0.451);
    vertical_wood_grain.setMatrixAt(i, instanceMatrix);
  }
  vertical_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(vertical_wood_grain);

  const top_wood_grainGeom = new THREE.BoxGeometry(0.11, 0.003, 0.006);
  const top_wood_grain = new THREE.InstancedMesh(top_wood_grainGeom, darkWoodMat, 10);
  for (let i = 0; i < 10; i++) {
    const front = i < 5;
    const column = i % 5;
    const z = front ? 0.39 : -0.39;
    const x = -0.36 + column * 0.18;
    const grainQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, ((column % 3) - 1) * 0.08, 0)
    );
    instanceMatrix.compose(
      new THREE.Vector3(x, 1.307, z),
      grainQuat,
      new THREE.Vector3(0.55 + (column % 2) * 0.3, 1, 1)
    );
    top_wood_grain.setMatrixAt(i, instanceMatrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(top_wood_grain);

  const chipShape = new THREE.Shape();
  chipShape.moveTo(-0.48, -0.10);
  chipShape.lineTo(-0.20, -0.45);
  chipShape.lineTo(0.10, -0.34);
  chipShape.lineTo(0.46, -0.08);
  chipShape.lineTo(0.28, 0.38);
  chipShape.lineTo(-0.12, 0.48);
  chipShape.lineTo(-0.42, 0.20);
  chipShape.lineTo(-0.48, -0.10);

  const front_paint_chipsGeom = new THREE.ShapeGeometry(chipShape);
  const frontChipData = [
    [-0.28, 1.00, 0.018, 0.035, -0.20],
    [0.18, 0.96, 0.014, 0.027, 0.35],
    [-0.08, 0.73, 0.022, 0.050, -0.15],
    [0.29, 0.65, 0.018, 0.045, 0.28],
    [-0.24, 0.57, 0.013, 0.030, -0.42],
    [0.07, 1.12, 0.012, 0.022, 0.10],
    [0.31, 0.84, 0.010, 0.020, -0.25],
    [-0.31, 0.39, 0.016, 0.032, 0.35],
    [0.17, 0.42, 0.012, 0.026, -0.18],
    [-0.17, 0.22, 0.014, 0.030, 0.22],
    [0.32, 0.20, 0.011, 0.022, -0.30],
  ];
  const front_paint_chips = new THREE.InstancedMesh(
    front_paint_chipsGeom,
    exposedMetalMat,
    frontChipData.length
  );
  for (let i = 0; i < frontChipData.length; i++) {
    const p = frontChipData[i];
    const chipQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, p[4]));
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], 0.463),
      chipQuat,
      new THREE.Vector3(p[2], p[3], 1)
    );
    front_paint_chips.setMatrixAt(i, instanceMatrix);
  }
  front_paint_chips.instanceMatrix.needsUpdate = true;
  root.add(front_paint_chips);

  const side_paint_chipsGeom = new THREE.ShapeGeometry(chipShape);
  const sideChipData = [
    [1.02, 0.18, 0.016, 0.032, -0.20],
    [0.91, -0.17, 0.020, 0.045, 0.28],
    [0.72, 0.27, 0.014, 0.026, -0.35],
    [0.59, -0.25, 0.018, 0.040, 0.18],
    [0.43, 0.12, 0.013, 0.025, -0.12],
    [0.30, -0.12, 0.017, 0.035, 0.32],
    [0.17, 0.24, 0.014, 0.027, -0.25],
    [0.82, 0.03, 0.010, 0.020, 0.10],
  ];
  const side_paint_chips = new THREE.InstancedMesh(
    side_paint_chipsGeom,
    exposedMetalMat,
    sideChipData.length
  );
  const sideChipBaseQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, -Math.PI / 2, 0)
  );
  for (let i = 0; i < sideChipData.length; i++) {
    const p = sideChipData[i];
    const spinQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      p[4]
    );
    const chipQuat = sideChipBaseQuat.clone().multiply(spinQuat);
    instanceMatrix.compose(
      new THREE.Vector3(-0.523, p[0], p[1]),
      chipQuat,
      new THREE.Vector3(p[2], p[3], 1)
    );
    side_paint_chips.setMatrixAt(i, instanceMatrix);
  }
  side_paint_chips.instanceMatrix.needsUpdate = true;
  root.add(side_paint_chips);

  const top_paint_chipsGeom = new THREE.ShapeGeometry(chipShape);
  const topChipData = [
    [-0.26, -0.12, 0.018, 0.030, -0.18],
    [0.18, 0.16, 0.014, 0.026, 0.25],
    [-0.05, 0.04, 0.012, 0.022, -0.30],
    [0.30, -0.18, 0.011, 0.020, 0.12],
  ];
  const top_paint_chips = new THREE.InstancedMesh(
    top_paint_chipsGeom,
    exposedMetalMat,
    topChipData.length
  );
  const topChipBaseQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0)
  );
  for (let i = 0; i < topChipData.length; i++) {
    const p = topChipData[i];
    const spinQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      p[4]
    );
    const chipQuat = topChipBaseQuat.clone().multiply(spinQuat);
    instanceMatrix.compose(
      new THREE.Vector3(p[0], 1.272, p[1]),
      chipQuat,
      new THREE.Vector3(p[2], p[3], 1)
    );
    top_paint_chips.setMatrixAt(i, instanceMatrix);
  }
  top_paint_chips.instanceMatrix.needsUpdate = true;
  root.add(top_paint_chips);

  const front_scratchesGeom = new THREE.BoxGeometry(0.005, 0.075, 0.003);
  const frontScratchData = [
    [-0.21, 0.91, 0.65, -0.20],
    [0.12, 0.82, 1.10, 0.25],
    [0.25, 0.72, 0.55, -0.32],
    [-0.04, 0.61, 0.80, 0.12],
    [0.31, 0.98, 0.48, -0.18],
    [-0.29, 0.76, 0.42, 0.30],
    [0.04, 1.05, 0.35, -0.25],
    [0.22, 0.56, 0.52, 0.16],
  ];
  const front_scratches = new THREE.InstancedMesh(
    front_scratchesGeom,
    exposedMetalMat,
    frontScratchData.length
  );
  for (let i = 0; i < frontScratchData.length; i++) {
    const p = frontScratchData[i];
    const scratchQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, p[3])
    );
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], 0.464),
      scratchQuat,
      new THREE.Vector3(1, p[2], 1)
    );
    front_scratches.setMatrixAt(i, instanceMatrix);
  }
  front_scratches.instanceMatrix.needsUpdate = true;
  root.add(front_scratches);

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