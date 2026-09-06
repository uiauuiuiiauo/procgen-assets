export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_metallophone";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const keyboard_group = new THREE.Group();
  keyboard_group.name = "keyboard_group";
  root.add(keyboard_group);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(handle_group);

  const bodyW = 1.18;
  const bodyL = 1.52;
  const bodyH = 0.25;
  const bodyY = -0.04;
  const bodyTop = 0.09;

  const body_coreMat = new THREE.MeshStandardMaterial({
    color: 0xd83d55,
    metalness: 0.0,
    roughness: 0.6
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x43c968,
    metalness: 0.0,
    roughness: 0.6
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: 0xc83d91,
    metalness: 0.0,
    roughness: 0.6
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x159ed7,
    metalness: 0.0,
    roughness: 0.6
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf1cf28,
    metalness: 0.0,
    roughness: 0.6
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff7341,
    metalness: 0.0,
    roughness: 0.6
  });
  const limeMat = new THREE.MeshStandardMaterial({
    color: 0x91dc35,
    metalness: 0.0,
    roughness: 0.6
  });
  const dark_greenMat = new THREE.MeshStandardMaterial({
    color: 0x26884a,
    metalness: 0.0,
    roughness: 0.7
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.0,
    roughness: 0.8
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb88959,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x5b3925,
    metalness: 0.0,
    roughness: 0.9
  });

  function roundedRectShape(width, height, radius) {
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
    return shape;
  }

  function roundedHorizontalGeometry(width, depth, thickness, radius) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, depth, radius),
      {
        depth: thickness,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: Math.min(0.006, thickness * 0.25),
        bevelSize: Math.min(0.008, radius * 0.3),
        bevelSegments: 2,
        curveSegments: 6
      }
    );
    geometry.translate(0, 0, -thickness / 2);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  const body_coreGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(bodyW, bodyL, 0.075),
    {
      depth: bodyH,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
      curveSegments: 8
    }
  );
  body_coreGeom.translate(0, 0, -bodyH / 2);
  body_coreGeom.rotateX(Math.PI / 2);
  const body_core = new THREE.Mesh(body_coreGeom, body_coreMat);
  body_core.name = "body_core";
  body_core.position.y = bodyY;
  body_group.add(body_core);

  const top_green_panelGeom = new THREE.BoxGeometry(0.34, 0.014, 1.4);
  const top_green_panel = new THREE.Mesh(top_green_panelGeom, greenMat);
  top_green_panel.name = "top_green_panel";
  top_green_panel.position.set(-0.42, bodyTop + 0.007, 0);
  body_group.add(top_green_panel);

  const top_magenta_panelGeom = new THREE.BoxGeometry(0.28, 0.014, 1.4);
  const top_magenta_panel = new THREE.Mesh(top_magenta_panelGeom, magentaMat);
  top_magenta_panel.name = "top_magenta_panel";
  top_magenta_panel.position.set(-0.14, bodyTop + 0.007, 0);
  body_group.add(top_magenta_panel);

  const top_blue_panelGeom = new THREE.BoxGeometry(0.24, 0.014, 1.4);
  const top_blue_panel = new THREE.Mesh(top_blue_panelGeom, blueMat);
  top_blue_panel.name = "top_blue_panel";
  top_blue_panel.position.set(0.11, bodyTop + 0.007, 0);
  body_group.add(top_blue_panel);

  const top_yellow_panelGeom = new THREE.BoxGeometry(0.22, 0.014, 1.4);
  const top_yellow_panel = new THREE.Mesh(top_yellow_panelGeom, yellowMat);
  top_yellow_panel.name = "top_yellow_panel";
  top_yellow_panel.position.set(0.35, bodyTop + 0.007, 0);
  body_group.add(top_yellow_panel);

  const top_orange_panelGeom = new THREE.BoxGeometry(0.1, 0.014, 1.4);
  const top_orange_panel = new THREE.Mesh(top_orange_panelGeom, orangeMat);
  top_orange_panel.name = "top_orange_panel";
  top_orange_panel.position.set(0.53, bodyTop + 0.007, 0);
  body_group.add(top_orange_panel);

  const top_lime_stripeGeom = new THREE.BoxGeometry(0.035, 0.009, 1.36);
  const top_lime_stripe = new THREE.Mesh(top_lime_stripeGeom, limeMat);
  top_lime_stripe.name = "top_lime_stripe";
  top_lime_stripe.position.set(-0.28, bodyTop + 0.018, 0);
  body_group.add(top_lime_stripe);

  const top_dark_green_stripeGeom = new THREE.BoxGeometry(0.035, 0.009, 1.36);
  const top_dark_green_stripe = new THREE.Mesh(top_dark_green_stripeGeom, dark_greenMat);
  top_dark_green_stripe.name = "top_dark_green_stripe";
  top_dark_green_stripe.position.set(0.23, bodyTop + 0.018, 0);
  body_group.add(top_dark_green_stripe);

  const front_magenta_panelGeom = new THREE.BoxGeometry(0.34, 0.205, 0.014);
  const front_magenta_panel = new THREE.Mesh(front_magenta_panelGeom, magentaMat);
  front_magenta_panel.name = "front_magenta_panel";
  front_magenta_panel.position.set(-0.42, -0.045, bodyL / 2 + 0.008);
  body_group.add(front_magenta_panel);

  const front_blue_panelGeom = new THREE.BoxGeometry(0.28, 0.205, 0.014);
  const front_blue_panel = new THREE.Mesh(front_blue_panelGeom, blueMat);
  front_blue_panel.name = "front_blue_panel";
  front_blue_panel.position.set(-0.14, -0.045, bodyL / 2 + 0.008);
  body_group.add(front_blue_panel);

  const front_yellow_panelGeom = new THREE.BoxGeometry(0.24, 0.205, 0.014);
  const front_yellow_panel = new THREE.Mesh(front_yellow_panelGeom, yellowMat);
  front_yellow_panel.name = "front_yellow_panel";
  front_yellow_panel.position.set(0.11, -0.045, bodyL / 2 + 0.008);
  body_group.add(front_yellow_panel);

  const front_orange_panelGeom = new THREE.BoxGeometry(0.22, 0.205, 0.014);
  const front_orange_panel = new THREE.Mesh(front_orange_panelGeom, orangeMat);
  front_orange_panel.name = "front_orange_panel";
  front_orange_panel.position.set(0.35, -0.045, bodyL / 2 + 0.008);
  body_group.add(front_orange_panel);

  const front_red_panelGeom = new THREE.BoxGeometry(0.1, 0.205, 0.014);
  const front_red_panel = new THREE.Mesh(front_red_panelGeom, body_coreMat);
  front_red_panel.name = "front_red_panel";
  front_red_panel.position.set(0.53, -0.045, bodyL / 2 + 0.008);
  body_group.add(front_red_panel);

  const right_orange_sideGeom = new THREE.BoxGeometry(0.014, 0.205, 1.34);
  const right_orange_side = new THREE.Mesh(right_orange_sideGeom, orangeMat);
  right_orange_side.name = "right_orange_side";
  right_orange_side.position.set(bodyW / 2 + 0.008, -0.045, 0);
  body_group.add(right_orange_side);

  const left_magenta_sideGeom = new THREE.BoxGeometry(0.014, 0.205, 1.34);
  const left_magenta_side = new THREE.Mesh(left_magenta_sideGeom, magentaMat);
  left_magenta_side.name = "left_magenta_side";
  left_magenta_side.position.set(-bodyW / 2 - 0.008, -0.045, 0);
  body_group.add(left_magenta_side);

  const right_side_screwGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.014, 20);
  const right_side_screw = new THREE.Mesh(right_side_screwGeom, polishedMat);
  right_side_screw.name = "right_side_screw";
  right_side_screw.rotation.z = Math.PI / 2;
  right_side_screw.position.set(bodyW / 2 + 0.019, -0.035, -0.28);
  body_group.add(right_side_screw);

  const right_side_screw_slotGeom = new THREE.BoxGeometry(0.007, 0.009, 0.055);
  const right_side_screw_slot = new THREE.Mesh(right_side_screw_slotGeom, darkMat);
  right_side_screw_slot.name = "right_side_screw_slot";
  right_side_screw_slot.position.set(bodyW / 2 + 0.028, -0.035, -0.28);
  right_side_screw_slot.rotation.x = 0.35;
  body_group.add(right_side_screw_slot);

  const front_side_screwGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.014, 18);
  const front_side_screw = new THREE.Mesh(front_side_screwGeom, polishedMat);
  front_side_screw.name = "front_side_screw";
  front_side_screw.rotation.x = Math.PI / 2;
  front_side_screw.position.set(0.42, -0.1, bodyL / 2 + 0.02);
  body_group.add(front_side_screw);

  const front_side_screw_slotGeom = new THREE.BoxGeometry(0.045, 0.008, 0.007);
  const front_side_screw_slot = new THREE.Mesh(front_side_screw_slotGeom, darkMat);
  front_side_screw_slot.name = "front_side_screw_slot";
  front_side_screw_slot.position.set(0.42, -0.1, bodyL / 2 + 0.029);
  front_side_screw_slot.rotation.z = -0.35;
  body_group.add(front_side_screw_slot);

  const front_sound_holeGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.014, 20);
  const front_sound_hole = new THREE.Mesh(front_sound_holeGeom, darkMat);
  front_sound_hole.name = "front_sound_hole";
  front_sound_hole.rotation.x = Math.PI / 2;
  front_sound_hole.position.set(-0.22, -0.105, bodyL / 2 + 0.02);
  body_group.add(front_sound_hole);

  const front_sound_hole_rimGeom = new THREE.TorusGeometry(0.052, 0.008, 8, 24);
  const front_sound_hole_rim = new THREE.Mesh(front_sound_hole_rimGeom, body_coreMat);
  front_sound_hole_rim.name = "front_sound_hole_rim";
  front_sound_hole_rim.position.set(-0.22, -0.105, bodyL / 2 + 0.029);
  body_group.add(front_sound_hole_rim);

  const front_slotGeom = new THREE.BoxGeometry(0.06, 0.014, 0.012);
  const front_slot = new THREE.Mesh(front_slotGeom, darkMat);
  front_slot.name = "front_slot";
  front_slot.position.set(-0.47, -0.04, bodyL / 2 + 0.022);
  front_slot.rotation.z = -0.25;
  body_group.add(front_slot);

  const long_tineGeom = roundedHorizontalGeometry(0.18, 1.02, 0.045, 0.04);
  const short_tineGeom = roundedHorizontalGeometry(0.18, 0.7, 0.045, 0.04);

  const left_long_tine = new THREE.Mesh(long_tineGeom, silverMat);
  left_long_tine.name = "left_long_tine";
  left_long_tine.position.set(-0.4, 0.15, 0.16);
  keyboard_group.add(left_long_tine);

  const left_short_tine = new THREE.Mesh(short_tineGeom, silverMat);
  left_short_tine.name = "left_short_tine";
  left_short_tine.position.set(-0.13, 0.15, -0.01);
  keyboard_group.add(left_short_tine);

  const right_short_tine = new THREE.Mesh(short_tineGeom, silverMat);
  right_short_tine.name = "right_short_tine";
  right_short_tine.position.set(0.14, 0.15, -0.01);
  keyboard_group.add(right_short_tine);

  const right_long_tine = new THREE.Mesh(long_tineGeom, silverMat);
  right_long_tine.name = "right_long_tine";
  right_long_tine.position.set(0.41, 0.15, 0.16);
  keyboard_group.add(right_long_tine);

  const rear_tineGeom = roundedHorizontalGeometry(0.17, 0.46, 0.045, 0.038);

  const rear_left_tine = new THREE.Mesh(rear_tineGeom, silverMat);
  rear_left_tine.name = "rear_left_tine";
  rear_left_tine.position.set(-0.3, 0.15, -0.54);
  keyboard_group.add(rear_left_tine);

  const rear_center_tine = new THREE.Mesh(rear_tineGeom, silverMat);
  rear_center_tine.name = "rear_center_tine";
  rear_center_tine.position.set(0, 0.15, -0.54);
  keyboard_group.add(rear_center_tine);

  const rear_right_tine = new THREE.Mesh(rear_tineGeom, silverMat);
  rear_right_tine.name = "rear_right_tine";
  rear_right_tine.position.set(0.3, 0.15, -0.54);
  keyboard_group.add(rear_right_tine);

  const cross_bracketGeom = roundedHorizontalGeometry(1.02, 0.18, 0.05, 0.035);
  const cross_bracket = new THREE.Mesh(cross_bracketGeom, brushedMat);
  cross_bracket.name = "cross_bracket";
  cross_bracket.position.set(0, 0.202, -0.28);
  keyboard_group.add(cross_bracket);

  const bracket_rivetGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.018, 20);
  const bracket_rivets = new THREE.InstancedMesh(bracket_rivetGeom, polishedMat, 2);
  bracket_rivets.name = "bracket_rivets";
  const rivet_matrix = new THREE.Matrix4();
  rivet_matrix.makeTranslation(-0.42, 0.239, -0.28);
  bracket_rivets.setMatrixAt(0, rivet_matrix);
  rivet_matrix.makeTranslation(0.42, 0.239, -0.28);
  bracket_rivets.setMatrixAt(1, rivet_matrix);
  bracket_rivets.instanceMatrix.needsUpdate = true;
  keyboard_group.add(bracket_rivets);

  const handle_mountGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.2, 24);
  const handle_mount = new THREE.Mesh(handle_mountGeom, darkMat);
  handle_mount.name = "handle_mount";
  handle_mount.rotation.z = Math.PI / 2;
  handle_mount.position.set(0.65, -0.035, 0.3);
  handle_group.add(handle_mount);

  const wooden_handleProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.115, 0.0),
    new THREE.Vector2(0.13, 0.04),
    new THREE.Vector2(0.132, 0.12),
    new THREE.Vector2(0.145, 0.22),
    new THREE.Vector2(0.162, 0.34),
    new THREE.Vector2(0.18, 0.46),
    new THREE.Vector2(0.185, 0.53),
    new THREE.Vector2(0.17, 0.59),
    new THREE.Vector2(0.13, 0.64),
    new THREE.Vector2(0.0, 0.66)
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 32);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, woodMat);
  wooden_handle.name = "wooden_handle";
  wooden_handle.rotation.z = -Math.PI / 2;
  wooden_handle.position.set(0.64, -0.035, 0.3);
  handle_group.add(wooden_handle);

  const handle_grooveGeom = new THREE.TorusGeometry(0.16, 0.011, 8, 28);
  const handle_grooves = new THREE.InstancedMesh(handle_grooveGeom, wood_grainMat, 3);
  handle_grooves.name = "handle_grooves";
  const groove_positions = [
    [0.96, 0.169],
    [1.035, 0.176],
    [1.11, 0.181]
  ];
  const groove_quaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2
  );
  const groove_scale = new THREE.Vector3();
  const groove_position = new THREE.Vector3();
  const groove_matrix = new THREE.Matrix4();
  for (let i = 0; i < groove_positions.length; i++) {
    const radius = groove_positions[i][1];
    groove_position.set(groove_positions[i][0], -0.035, 0.3);
    groove_scale.set(radius / 0.16, radius / 0.16, radius / 0.16);
    groove_matrix.compose(groove_position, groove_quaternion, groove_scale);
    handle_grooves.setMatrixAt(i, groove_matrix);
  }
  handle_grooves.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_grooves);

  const handle_grainGeom = new THREE.CylinderGeometry(0.0035, 0.0035, 0.25, 6);
  const handle_grain = new THREE.InstancedMesh(handle_grainGeom, wood_grainMat, 6);
  handle_grain.name = "handle_grain";
  const grain_quaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    -Math.PI / 2
  );
  const grain_position = new THREE.Vector3();
  const grain_scale = new THREE.Vector3(1, 1, 1);
  const grain_matrix = new THREE.Matrix4();
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    grain_position.set(
      0.91,
      -0.035 + Math.cos(angle) * 0.151,
      0.3 + Math.sin(angle) * 0.151
    );
    grain_matrix.compose(grain_position, grain_quaternion, grain_scale);
    handle_grain.setMatrixAt(i, grain_matrix);
  }
  handle_grain.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_grain);

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