export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "camera";

  const camera_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x1b1b1b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glossy_blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x0d0d0d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x686d75,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_ledMat = new THREE.MeshStandardMaterial({
    color: 0xd83232,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xd83232,
    emissiveIntensity: 1.0,
  });
  const markingMat = new THREE.MeshBasicMaterial({
    color: 0xe2e2e2,
  });
  const viewfinder_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x91a0aa,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const flash_reflectorMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function roundedRectShape(width, height, radius) {
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
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
        curveSegments: 12,
      }
    );
  }

  const camera_bodyShape = new THREE.Shape();
  camera_bodyShape.moveTo(-1.38, -0.82);
  camera_bodyShape.bezierCurveTo(-1.58, -0.82, -1.68, -0.68, -1.68, -0.46);
  camera_bodyShape.lineTo(-1.68, 0.47);
  camera_bodyShape.bezierCurveTo(-1.68, 0.68, -1.53, 0.79, -1.31, 0.82);
  camera_bodyShape.lineTo(1.36, 0.82);
  camera_bodyShape.bezierCurveTo(1.58, 0.82, 1.68, 0.68, 1.68, 0.47);
  camera_bodyShape.lineTo(1.68, -0.58);
  camera_bodyShape.bezierCurveTo(1.68, -0.75, 1.54, -0.83, 1.33, -0.84);
  camera_bodyShape.lineTo(-1.38, -0.82);

  const camera_bodyGeom = new THREE.ExtrudeGeometry(camera_bodyShape, {
    depth: 0.68,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 4,
    curveSegments: 16,
  });
  const camera_body = new THREE.Mesh(camera_bodyGeom, camera_bodyMat);
  camera_body.name = "camera_body";
  camera_body.position.z = -0.34;
  root.add(camera_body);

  const gripGeom = new THREE.CapsuleGeometry(0.34, 0.95, 8, 20);
  const grip = new THREE.Mesh(gripGeom, gripMat);
  grip.name = "grip";
  grip.position.set(-1.36, -0.05, 0.39);
  grip.scale.set(1.08, 1.0, 0.36);
  root.add(grip);

  const grip_palm_bulgeGeom = new THREE.SphereGeometry(0.3, 24, 14);
  const grip_palm_bulge = new THREE.Mesh(grip_palm_bulgeGeom, gripMat);
  grip_palm_bulge.name = "grip_palm_bulge";
  grip_palm_bulge.position.set(-1.34, -0.12, 0.47);
  grip_palm_bulge.scale.set(1.15, 1.65, 0.28);
  root.add(grip_palm_bulge);

  const grip_seamGeom = new THREE.BoxGeometry(0.018, 1.38, 0.014);
  const grip_seam = new THREE.Mesh(grip_seamGeom, rubberMat);
  grip_seam.name = "grip_seam";
  grip_seam.position.set(-1.02, -0.04, 0.435);
  root.add(grip_seam);

  const bottom_trimGeom = new THREE.BoxGeometry(2.95, 0.075, 0.54);
  const bottom_trim = new THREE.Mesh(bottom_trimGeom, rubberMat);
  bottom_trim.name = "bottom_trim";
  bottom_trim.position.set(0, -0.82, -0.02);
  root.add(bottom_trim);

  const screen_outer_bezelGeom = roundedExtrudeGeometry(1.82, 1.43, 0.13, 0.05, 0.014);
  const screen_outer_bezel = new THREE.Mesh(screen_outer_bezelGeom, glossy_blackMat);
  screen_outer_bezel.name = "screen_outer_bezel";
  screen_outer_bezel.position.set(0.27, -0.13, 0.405);
  root.add(screen_outer_bezel);

  const screen_inner_bezelGeom = roundedExtrudeGeometry(1.62, 1.25, 0.09, 0.024, 0.006);
  const screen_inner_bezel = new THREE.Mesh(screen_inner_bezelGeom, rubberMat);
  screen_inner_bezel.name = "screen_inner_bezel";
  screen_inner_bezel.position.set(0.27, -0.13, 0.463);
  root.add(screen_inner_bezel);

  const screen_displayGeom = new THREE.PlaneGeometry(1.43, 1.07);
  const screen_display = new THREE.Mesh(screen_displayGeom, screenMat);
  screen_display.name = "screen_display";
  screen_display.position.set(0.27, -0.13, 0.496);
  root.add(screen_display);

  const screen_top_highlightGeom = new THREE.PlaneGeometry(1.35, 0.025);
  const screen_top_highlight = new THREE.Mesh(screen_top_highlightGeom, dark_metalMat);
  screen_top_highlight.name = "screen_top_highlight";
  screen_top_highlight.position.set(0.27, 0.375, 0.498);
  root.add(screen_top_highlight);

  const viewfinder_housingShape = new THREE.Shape();
  viewfinder_housingShape.moveTo(-0.56, -0.29);
  viewfinder_housingShape.lineTo(-0.48, 0.22);
  viewfinder_housingShape.quadraticCurveTo(-0.44, 0.31, -0.32, 0.32);
  viewfinder_housingShape.lineTo(0.39, 0.32);
  viewfinder_housingShape.quadraticCurveTo(0.51, 0.31, 0.56, 0.21);
  viewfinder_housingShape.lineTo(0.58, -0.19);
  viewfinder_housingShape.quadraticCurveTo(0.57, -0.29, 0.46, -0.30);
  viewfinder_housingShape.lineTo(-0.44, -0.30);
  viewfinder_housingShape.quadraticCurveTo(-0.53, -0.30, -0.56, -0.22);

  const viewfinder_housingGeom = new THREE.ExtrudeGeometry(viewfinder_housingShape, {
    depth: 0.28,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const viewfinder_housing = new THREE.Mesh(viewfinder_housingGeom, camera_bodyMat);
  viewfinder_housing.name = "viewfinder_housing";
  viewfinder_housing.position.set(0.04, 0.84, 0.17);
  root.add(viewfinder_housing);

  const viewfinder_eyecupGeom = roundedExtrudeGeometry(0.66, 0.31, 0.075, 0.045, 0.008);
  const viewfinder_eyecup = new THREE.Mesh(viewfinder_eyecupGeom, rubberMat);
  viewfinder_eyecup.name = "viewfinder_eyecup";
  viewfinder_eyecup.position.set(0.20, 0.79, 0.475);
  root.add(viewfinder_eyecup);

  const viewfinder_windowGeom = roundedExtrudeGeometry(0.49, 0.19, 0.045, 0.018, 0.004);
  const viewfinder_window = new THREE.Mesh(viewfinder_windowGeom, glossy_blackMat);
  viewfinder_window.name = "viewfinder_window";
  viewfinder_window.position.set(0.20, 0.79, 0.525);
  root.add(viewfinder_window);

  const viewfinder_reflectorGeom = new THREE.CircleGeometry(0.052, 20);
  const viewfinder_reflector = new THREE.Mesh(viewfinder_reflectorGeom, flash_reflectorMat);
  viewfinder_reflector.name = "viewfinder_reflector";
  viewfinder_reflector.position.set(0.08, 0.80, 0.548);
  root.add(viewfinder_reflector);

  const viewfinder_glassGeom = new THREE.PlaneGeometry(0.43, 0.15);
  const viewfinder_glass = new THREE.Mesh(viewfinder_glassGeom, viewfinder_glassMat);
  viewfinder_glass.name = "viewfinder_glass";
  viewfinder_glass.position.set(0.20, 0.79, 0.553);
  root.add(viewfinder_glass);

  const hotshoe_baseGeom = new THREE.BoxGeometry(0.54, 0.045, 0.35);
  const hotshoe_base = new THREE.Mesh(hotshoe_baseGeom, dark_metalMat);
  hotshoe_base.name = "hotshoe_base";
  hotshoe_base.position.set(-0.38, 1.075, -0.12);
  root.add(hotshoe_base);

  const hotshoe_railGeom = new THREE.BoxGeometry(0.055, 0.035, 0.31);
  const hotshoe_left_rail = new THREE.Mesh(hotshoe_railGeom, silverMat);
  hotshoe_left_rail.name = "hotshoe_left_rail";
  hotshoe_left_rail.position.set(-0.58, 1.11, -0.12);
  root.add(hotshoe_left_rail);

  const hotshoe_right_rail = new THREE.Mesh(hotshoe_railGeom, silverMat);
  hotshoe_right_rail.name = "hotshoe_right_rail";
  hotshoe_right_rail.position.set(-0.18, 1.11, -0.12);
  root.add(hotshoe_right_rail);

  const mode_dialGeom = new THREE.CylinderGeometry(0.30, 0.30, 0.14, 48);
  const mode_dial = new THREE.Mesh(mode_dialGeom, dark_metalMat);
  mode_dial.name = "mode_dial";
  mode_dial.position.set(-1.00, 0.91, 0.02);
  root.add(mode_dial);

  const mode_dial_topGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.018, 48);
  const mode_dial_top = new THREE.Mesh(mode_dial_topGeom, camera_bodyMat);
  mode_dial_top.name = "mode_dial_top";
  mode_dial_top.position.set(-1.00, 0.987, 0.02);
  root.add(mode_dial_top);

  const mode_dial_teethGeom = new THREE.BoxGeometry(0.038, 0.105, 0.058);
  const mode_dial_teeth = new THREE.InstancedMesh(
    mode_dial_teethGeom,
    rubberMat,
    30
  );
  mode_dial_teeth.name = "mode_dial_teeth";
  const mode_tooth_transform = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2;
    mode_tooth_transform.position.set(
      -1.00 + Math.cos(angle) * 0.302,
      0.91,
      0.02 + Math.sin(angle) * 0.302
    );
    mode_tooth_transform.rotation.set(0, Math.PI / 2 - angle, 0);
    mode_tooth_transform.updateMatrix();
    mode_dial_teeth.setMatrixAt(i, mode_tooth_transform.matrix);
  }
  mode_dial_teeth.instanceMatrix.needsUpdate = true;
  root.add(mode_dial_teeth);

  const mode_dial_markersGeom = new THREE.BoxGeometry(0.018, 0.008, 0.055);
  const mode_dial_markers = new THREE.InstancedMesh(
    mode_dial_markersGeom,
    markingMat,
    12
  );
  mode_dial_markers.name = "mode_dial_markers";
  const mode_marker_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    mode_marker_transform.position.set(
      -1.00 + Math.cos(angle) * 0.225,
      0.999,
      0.02 + Math.sin(angle) * 0.225
    );
    mode_marker_transform.rotation.set(0, Math.PI / 2 - angle, 0);
    mode_marker_transform.updateMatrix();
    mode_dial_markers.setMatrixAt(i, mode_marker_transform.matrix);
  }
  mode_dial_markers.instanceMatrix.needsUpdate = true;
  root.add(mode_dial_markers);

  const mode_index_dotGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.009, 16);
  const mode_index_dot = new THREE.Mesh(mode_index_dotGeom, red_ledMat);
  mode_index_dot.name = "mode_index_dot";
  mode_index_dot.position.set(-1.00, 1.002, 0.205);
  root.add(mode_index_dot);

  const control_dialGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.14, 48);
  const control_dial = new THREE.Mesh(control_dialGeom, dark_metalMat);
  control_dial.name = "control_dial";
  control_dial.position.set(0.93, 0.92, -0.03);
  root.add(control_dial);

  const control_dial_teethGeom = new THREE.BoxGeometry(0.04, 0.105, 0.062);
  const control_dial_teeth = new THREE.InstancedMesh(
    control_dial_teethGeom,
    rubberMat,
    32
  );
  control_dial_teeth.name = "control_dial_teeth";
  const control_tooth_transform = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    control_tooth_transform.position.set(
      0.93 + Math.cos(angle) * 0.322,
      0.92,
      -0.03 + Math.sin(angle) * 0.322
    );
    control_tooth_transform.rotation.set(0, Math.PI / 2 - angle, 0);
    control_tooth_transform.updateMatrix();
    control_dial_teeth.setMatrixAt(i, control_tooth_transform.matrix);
  }
  control_dial_teeth.instanceMatrix.needsUpdate = true;
  root.add(control_dial_teeth);

  const control_dial_topGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.025, 48);
  const control_dial_top = new THREE.Mesh(control_dial_topGeom, glossy_blackMat);
  control_dial_top.name = "control_dial_top";
  control_dial_top.position.set(0.93, 1.001, -0.03);
  root.add(control_dial_top);

  const control_dial_markersGeom = new THREE.BoxGeometry(0.018, 0.009, 0.052);
  const control_dial_markers = new THREE.InstancedMesh(
    control_dial_markersGeom,
    markingMat,
    16
  );
  control_dial_markers.name = "control_dial_markers";
  const control_marker_transform = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    control_marker_transform.position.set(
      0.93 + Math.cos(angle) * 0.225,
      1.017,
      -0.03 + Math.sin(angle) * 0.225
    );
    control_marker_transform.rotation.set(0, Math.PI / 2 - angle, 0);
    control_marker_transform.updateMatrix();
    control_dial_markers.setMatrixAt(i, control_marker_transform.matrix);
  }
  control_dial_markers.instanceMatrix.needsUpdate = true;
  root.add(control_dial_markers);

  const control_index_barGeom = new THREE.BoxGeometry(0.025, 0.012, 0.09);
  const control_index_bar = new THREE.Mesh(control_index_barGeom, markingMat);
  control_index_bar.name = "control_index_bar";
  control_index_bar.position.set(0.93, 1.019, 0.14);
  root.add(control_index_bar);

  const small_control_dialGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 36);
  const small_control_dial = new THREE.Mesh(small_control_dialGeom, dark_metalMat);
  small_control_dial.name = "small_control_dial";
  small_control_dial.position.set(-0.66, 0.89, 0.22);
  root.add(small_control_dial);

  const small_control_teethGeom = new THREE.BoxGeometry(0.027, 0.09, 0.045);
  const small_control_teeth = new THREE.InstancedMesh(
    small_control_teethGeom,
    rubberMat,
    24
  );
  small_control_teeth.name = "small_control_teeth";
  const small_tooth_transform = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    small_tooth_transform.position.set(
      -0.66 + Math.cos(angle) * 0.181,
      0.89,
      0.22 + Math.sin(angle) * 0.181
    );
    small_tooth_transform.rotation.set(0, Math.PI / 2 - angle, 0);
    small_tooth_transform.updateMatrix();
    small_control_teeth.setMatrixAt(i, small_tooth_transform.matrix);
  }
  small_control_teeth.instanceMatrix.needsUpdate = true;
  root.add(small_control_teeth);

  const shutter_buttonGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.055, 28);
  const shutter_button = new THREE.Mesh(shutter_buttonGeom, silverMat);
  shutter_button.name = "shutter_button";
  shutter_button.position.set(-0.42, 0.925, 0.34);
  root.add(shutter_button);

  const shutter_capGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.012, 28);
  const shutter_cap = new THREE.Mesh(shutter_capGeom, dark_metalMat);
  shutter_cap.name = "shutter_cap";
  shutter_cap.position.set(-0.42, 0.959, 0.34);
  root.add(shutter_cap);

  const top_function_buttonGeom = roundedExtrudeGeometry(0.23, 0.13, 0.04, 0.035, 0.006);
  const top_function_button = new THREE.Mesh(top_function_buttonGeom, dark_metalMat);
  top_function_button.name = "top_function_button";
  top_function_button.rotation.x = -Math.PI / 2;
  top_function_button.position.set(-0.08, 0.875, 0.31);
  root.add(top_function_button);

  const top_label_oneGeom = new THREE.BoxGeometry(0.08, 0.008, 0.018);
  const top_label_one = new THREE.Mesh(top_label_oneGeom, markingMat);
  top_label_one.name = "top_label_one";
  top_label_one.position.set(-0.08, 0.916, 0.27);
  root.add(top_label_one);

  const top_label_twoGeom = new THREE.BoxGeometry(0.055, 0.008, 0.018);
  const top_label_two = new THREE.Mesh(top_label_twoGeom, markingMat);
  top_label_two.name = "top_label_two";
  top_label_two.position.set(-0.08, 0.916, 0.33);
  root.add(top_label_two);

  const right_control_panelGeom = roundedExtrudeGeometry(0.47, 1.28, 0.18, 0.04, 0.008);
  const right_control_panel = new THREE.Mesh(right_control_panelGeom, glossy_blackMat);
  right_control_panel.name = "right_control_panel";
  right_control_panel.position.set(1.39, -0.02, 0.405);
  root.add(right_control_panel);

  const upper_function_buttonGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.055, 28);
  const upper_function_button = new THREE.Mesh(upper_function_buttonGeom, dark_metalMat);
  upper_function_button.name = "upper_function_button";
  upper_function_button.rotation.x = Math.PI / 2;
  upper_function_button.position.set(1.38, 0.43, 0.48);
  root.add(upper_function_button);

  const upper_function_iconGeom = new THREE.TorusGeometry(0.045, 0.011, 8, 24);
  const upper_function_icon = new THREE.Mesh(upper_function_iconGeom, red_ledMat);
  upper_function_icon.name = "upper_function_icon";
  upper_function_icon.position.set(1.38, 0.43, 0.512);
  root.add(upper_function_icon);

  const middle_function_buttonGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.055, 28);
  const middle_function_button = new THREE.Mesh(middle_function_buttonGeom, dark_metalMat);
  middle_function_button.name = "middle_function_button";
  middle_function_button.rotation.x = Math.PI / 2;
  middle_function_button.position.set(1.38, 0.02, 0.48);
  root.add(middle_function_button);

  const middle_function_iconGeom = new THREE.BoxGeometry(0.07, 0.07, 0.018);
  const middle_function_icon = new THREE.Mesh(middle_function_iconGeom, red_ledMat);
  middle_function_icon.name = "middle_function_icon";
  middle_function_icon.position.set(1.38, 0.02, 0.515);
  root.add(middle_function_icon);

  const middle_function_icon_innerGeom = new THREE.BoxGeometry(0.035, 0.035, 0.021);
  const middle_function_icon_inner = new THREE.Mesh(middle_function_icon_innerGeom, glossy_blackMat);
  middle_function_icon_inner.name = "middle_function_icon_inner";
  middle_function_icon_inner.position.set(1.38, 0.02, 0.527);
  root.add(middle_function_icon_inner);

  const directional_padGeom = new THREE.TorusGeometry(0.175, 0.055, 12, 36);
  const directional_pad = new THREE.Mesh(directional_padGeom, rubberMat);
  directional_pad.name = "directional_pad";
  directional_pad.position.set(1.38, -0.40, 0.485);
  root.add(directional_pad);

  const directional_centerGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.06, 32);
  const directional_center = new THREE.Mesh(directional_centerGeom, dark_metalMat);
  directional_center.name = "directional_center";
  directional_center.rotation.x = Math.PI / 2;
  directional_center.position.set(1.38, -0.40, 0.49);
  root.add(directional_center);

  const directional_icon_leftGeom = new THREE.BoxGeometry(0.025, 0.075, 0.012);
  const directional_icon_left = new THREE.Mesh(directional_icon_leftGeom, markingMat);
  directional_icon_left.name = "directional_icon_left";
  directional_icon_left.position.set(1.345, -0.40, 0.525);
  directional_icon_left.rotation.z = -0.45;
  root.add(directional_icon_left);

  const directional_icon_rightGeom = new THREE.BoxGeometry(0.025, 0.075, 0.012);
  const directional_icon_right = new THREE.Mesh(directional_icon_rightGeom, markingMat);
  directional_icon_right.name = "directional_icon_right";
  directional_icon_right.position.set(1.415, -0.40, 0.525);
  directional_icon_right.rotation.z = 0.45;
  root.add(directional_icon_right);

  const lower_left_buttonGeom = roundedExtrudeGeometry(0.16, 0.16, 0.055, 0.045, 0.008);
  const lower_left_button = new THREE.Mesh(lower_left_buttonGeom, dark_metalMat);
  lower_left_button.name = "lower_left_button";
  lower_left_button.position.set(1.27, -0.72, 0.46);
  root.add(lower_left_button);

  const lower_right_buttonGeom = roundedExtrudeGeometry(0.16, 0.16, 0.055, 0.045, 0.008);
  const lower_right_button = new THREE.Mesh(lower_right_buttonGeom, dark_metalMat);
  lower_right_button.name = "lower_right_button";
  lower_right_button.position.set(1.51, -0.72, 0.46);
  root.add(lower_right_button);

  const lower_left_iconGeom = new THREE.BoxGeometry(0.025, 0.075, 0.012);
  const lower_left_icon = new THREE.Mesh(lower_left_iconGeom, markingMat);
  lower_left_icon.name = "lower_left_icon";
  lower_left_icon.position.set(1.27, -0.72, 0.518);
  root.add(lower_left_icon);

  const lower_right_iconGeom = new THREE.TorusGeometry(0.035, 0.009, 8, 20);
  const lower_right_icon = new THREE.Mesh(lower_right_iconGeom, markingMat);
  lower_right_icon.name = "lower_right_icon";
  lower_right_icon.position.set(1.51, -0.72, 0.518);
  root.add(lower_right_icon);

  const side_port_doorGeom = new THREE.BoxGeometry(0.25, 0.76, 0.035);
  const side_port_door = new THREE.Mesh(side_port_doorGeom, gripMat);
  side_port_door.name = "side_port_door";
  side_port_door.position.set(-1.69, -0.25, -0.02);
  root.add(side_port_door);

  const side_port_upperGeom = new THREE.BoxGeometry(0.035, 0.19, 0.17);
  const side_port_upper = new THREE.Mesh(side_port_upperGeom, rubberMat);
  side_port_upper.name = "side_port_upper";
  side_port_upper.position.set(-1.715, 0.10, 0.01);
  root.add(side_port_upper);

  const side_port_lowerGeom = new THREE.BoxGeometry(0.035, 0.34, 0.15);
  const side_port_lower = new THREE.Mesh(side_port_lowerGeom, rubberMat);
  side_port_lower.name = "side_port_lower";
  side_port_lower.position.set(-1.715, -0.30, 0.01);
  root.add(side_port_lower);

  const side_port_insertGeom = new THREE.BoxGeometry(0.04, 0.25, 0.075);
  const side_port_insert = new THREE.Mesh(side_port_insertGeom, glossy_blackMat);
  side_port_insert.name = "side_port_insert";
  side_port_insert.position.set(-1.737, -0.30, 0.01);
  root.add(side_port_insert);

  const strap_bracketGeom = new THREE.BoxGeometry(0.17, 0.18, 0.16);
  const strap_bracket = new THREE.Mesh(strap_bracketGeom, dark_metalMat);
  strap_bracket.name = "strap_bracket";
  strap_bracket.position.set(-1.69, 0.55, -0.02);
  root.add(strap_bracket);

  const strap_lugGeom = new THREE.TorusGeometry(0.105, 0.027, 10, 28);
  const strap_lug = new THREE.Mesh(strap_lugGeom, dark_metalMat);
  strap_lug.name = "strap_lug";
  strap_lug.position.set(-1.82, 0.56, -0.01);
  strap_lug.scale.set(1.25, 0.72, 1);
  root.add(strap_lug);

  const right_strap_bracketGeom = new THREE.BoxGeometry(0.12, 0.17, 0.14);
  const right_strap_bracket = new THREE.Mesh(right_strap_bracketGeom, dark_metalMat);
  right_strap_bracket.name = "right_strap_bracket";
  right_strap_bracket.position.set(1.69, 0.55, -0.02);
  root.add(right_strap_bracket);

  const right_strap_lugGeom = new THREE.TorusGeometry(0.085, 0.023, 10, 24);
  const right_strap_lug = new THREE.Mesh(right_strap_lugGeom, dark_metalMat);
  right_strap_lug.name = "right_strap_lug";
  right_strap_lug.position.set(1.77, 0.56, -0.01);
  right_strap_lug.scale.set(0.85, 1.0, 1);
  root.add(right_strap_lug);

  fitToUnitCube(root);
  return root;

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
}