export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_kalimba";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const keyboard_group = new THREE.Group();
  keyboard_group.name = "keyboard_group";
  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(body_group, keyboard_group, handle_group);

  const bodyW = 1.12;
  const bodyL = 1.46;
  const bodyH = 0.20;
  const bodyTop = 0.13;

  const body_coreMat = new THREE.MeshStandardMaterial({
    color: 0x8f2448,
    metalness: 0.0,
    roughness: 0.6
  });
  const magenta_paintMat = new THREE.MeshStandardMaterial({
    color: 0xc43b78,
    metalness: 0.0,
    roughness: 0.6
  });
  const cyan_paintMat = new THREE.MeshStandardMaterial({
    color: 0x169bd0,
    metalness: 0.0,
    roughness: 0.6
  });
  const green_paintMat = new THREE.MeshStandardMaterial({
    color: 0x35b85d,
    metalness: 0.0,
    roughness: 0.6
  });
  const yellow_paintMat = new THREE.MeshStandardMaterial({
    color: 0xf0d31d,
    metalness: 0.0,
    roughness: 0.6
  });
  const orange_paintMat = new THREE.MeshStandardMaterial({
    color: 0xf47b32,
    metalness: 0.0,
    roughness: 0.6
  });
  const red_paintMat = new THREE.MeshStandardMaterial({
    color: 0xe83d48,
    metalness: 0.0,
    roughness: 0.6
  });
  const pink_paintMat = new THREE.MeshStandardMaterial({
    color: 0xe75a91,
    metalness: 0.0,
    roughness: 0.6
  });
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
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x1b1718,
    metalness: 0.0,
    roughness: 0.8
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb88757,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x5b3823,
    metalness: 0.0,
    roughness: 0.9
  });

  function makeRoundedHorizontalGeometry(width, length, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -length / 2;
    const z1 = length / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);
    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.008,
      bevelSegments: 2,
      curveSegments: 5
    });
  }

  function makeRoundedProngGeometry(width, length, thickness) {
    const w = width / 2;
    const z0 = -length / 2;
    const z1 = length / 2;
    const tipRound = Math.min(w * 0.85, 0.055);
    const shape = new THREE.Shape();
    shape.moveTo(-w, z0 + tipRound);
    shape.quadraticCurveTo(-w, z0, -w + tipRound, z0);
    shape.lineTo(w - tipRound, z0);
    shape.quadraticCurveTo(w, z0, w, z0 + tipRound);
    shape.lineTo(w, z1);
    shape.lineTo(-w, z1);
    shape.lineTo(-w, z0 + tipRound);
    return new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 4
    });
  }

  const body_coreGeom = new THREE.BoxGeometry(bodyW, bodyH, bodyL);
  const body_core = new THREE.Mesh(body_coreGeom, body_coreMat);
  body_core.name = "body_core";
  body_group.add(body_core);

  const topStripW = bodyW / 6;

  const top_magenta_left_panelGeom = new THREE.BoxGeometry(topStripW, 0.018, bodyL);
  const top_magenta_left_panel = new THREE.Mesh(top_magenta_left_panelGeom, magenta_paintMat);
  top_magenta_left_panel.position.set(-bodyW / 2 + topStripW / 2, 0.111, 0);
  body_group.add(top_magenta_left_panel);

  const top_cyan_panelGeom = new THREE.BoxGeometry(topStripW, 0.018, bodyL);
  const top_cyan_panel = new THREE.Mesh(top_cyan_panelGeom, cyan_paintMat);
  top_cyan_panel.position.set(-bodyW / 2 + topStripW * 1.5, 0.111, 0);
  body_group.add(top_cyan_panel);

  const top_green_panelGeom = new THREE.BoxGeometry(topStripW, 0.018, bodyL);
  const top_green_panel = new THREE.Mesh(top_green_panelGeom, green_paintMat);
  top_green_panel.position.set(-bodyW / 2 + topStripW * 2.5, 0.111, 0);
  body_group.add(top_green_panel);

  const top_yellow_panelGeom = new THREE.BoxGeometry(topStripW, 0.018, bodyL);
  const top_yellow_panel = new THREE.Mesh(top_yellow_panelGeom, yellow_paintMat);
  top_yellow_panel.position.set(-bodyW / 2 + topStripW * 3.5, 0.111, 0);
  body_group.add(top_yellow_panel);

  const top_orange_panelGeom = new THREE.BoxGeometry(topStripW, 0.018, bodyL);
  const top_orange_panel = new THREE.Mesh(top_orange_panelGeom, orange_paintMat);
  top_orange_panel.position.set(-bodyW / 2 + topStripW * 4.5, 0.111, 0);
  body_group.add(top_orange_panel);

  const top_red_right_panelGeom = new THREE.BoxGeometry(topStripW, 0.018, bodyL);
  const top_red_right_panel = new THREE.Mesh(top_red_right_panelGeom, red_paintMat);
  top_red_right_panel.position.set(-bodyW / 2 + topStripW * 5.5, 0.111, 0);
  body_group.add(top_red_right_panel);

  const frontZ = bodyL / 2 + 0.002;

  const front_magenta_panelGeom = new THREE.BoxGeometry(topStripW, 0.17, 0.014);
  const front_magenta_panel = new THREE.Mesh(front_magenta_panelGeom, magenta_paintMat);
  front_magenta_panel.position.set(-bodyW / 2 + topStripW / 2, -0.005, frontZ);
  body_group.add(front_magenta_panel);

  const front_cyan_panelGeom = new THREE.BoxGeometry(topStripW, 0.17, 0.014);
  const front_cyan_panel = new THREE.Mesh(front_cyan_panelGeom, cyan_paintMat);
  front_cyan_panel.position.set(-bodyW / 2 + topStripW * 1.5, -0.005, frontZ);
  body_group.add(front_cyan_panel);

  const front_green_panelGeom = new THREE.BoxGeometry(topStripW, 0.17, 0.014);
  const front_green_panel = new THREE.Mesh(front_green_panelGeom, green_paintMat);
  front_green_panel.position.set(-bodyW / 2 + topStripW * 2.5, -0.005, frontZ);
  body_group.add(front_green_panel);

  const front_yellow_panelGeom = new THREE.BoxGeometry(topStripW, 0.17, 0.014);
  const front_yellow_panel = new THREE.Mesh(front_yellow_panelGeom, yellow_paintMat);
  front_yellow_panel.position.set(-bodyW / 2 + topStripW * 3.5, -0.005, frontZ);
  body_group.add(front_yellow_panel);

  const front_orange_panelGeom = new THREE.BoxGeometry(topStripW, 0.17, 0.014);
  const front_orange_panel = new THREE.Mesh(front_orange_panelGeom, orange_paintMat);
  front_orange_panel.position.set(-bodyW / 2 + topStripW * 4.5, -0.005, frontZ);
  body_group.add(front_orange_panel);

  const front_red_panelGeom = new THREE.BoxGeometry(topStripW, 0.17, 0.014);
  const front_red_panel = new THREE.Mesh(front_red_panelGeom, red_paintMat);
  front_red_panel.position.set(-bodyW / 2 + topStripW * 5.5, -0.005, frontZ);
  body_group.add(front_red_panel);

  const right_side_back_panelGeom = new THREE.BoxGeometry(0.014, 0.17, bodyL * 0.44);
  const right_side_back_panel = new THREE.Mesh(right_side_back_panelGeom, pink_paintMat);
  right_side_back_panel.position.set(bodyW / 2 + 0.002, -0.005, -bodyL * 0.27);
  body_group.add(right_side_back_panel);

  const right_side_middle_panelGeom = new THREE.BoxGeometry(0.014, 0.17, bodyL * 0.31);
  const right_side_middle_panel = new THREE.Mesh(right_side_middle_panelGeom, orange_paintMat);
  right_side_middle_panel.position.set(bodyW / 2 + 0.002, -0.005, 0.055);
  body_group.add(right_side_middle_panel);

  const right_side_front_panelGeom = new THREE.BoxGeometry(0.014, 0.17, bodyL * 0.25);
  const right_side_front_panel = new THREE.Mesh(right_side_front_panelGeom, red_paintMat);
  right_side_front_panel.position.set(bodyW / 2 + 0.002, -0.005, bodyL * 0.375);
  body_group.add(right_side_front_panel);

  const left_side_back_panelGeom = new THREE.BoxGeometry(0.014, 0.17, bodyL * 0.44);
  const left_side_back_panel = new THREE.Mesh(left_side_back_panelGeom, green_paintMat);
  left_side_back_panel.position.set(-bodyW / 2 - 0.002, -0.005, -bodyL * 0.27);
  body_group.add(left_side_back_panel);

  const left_side_middle_panelGeom = new THREE.BoxGeometry(0.014, 0.17, bodyL * 0.31);
  const left_side_middle_panel = new THREE.Mesh(left_side_middle_panelGeom, magenta_paintMat);
  left_side_middle_panel.position.set(-bodyW / 2 - 0.002, -0.005, 0.055);
  body_group.add(left_side_middle_panel);

  const left_side_front_panelGeom = new THREE.BoxGeometry(0.014, 0.17, bodyL * 0.25);
  const left_side_front_panel = new THREE.Mesh(left_side_front_panelGeom, cyan_paintMat);
  left_side_front_panel.position.set(-bodyW / 2 - 0.002, -0.005, bodyL * 0.375);
  body_group.add(left_side_front_panel);

  const front_sound_holeGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.008, 18);
  const front_sound_hole = new THREE.Mesh(front_sound_holeGeom, rubberMat);
  front_sound_hole.rotation.x = Math.PI / 2;
  front_sound_hole.position.set(-0.27, -0.018, bodyL / 2 + 0.012);
  body_group.add(front_sound_hole);

  const front_sound_hole_rimGeom = new THREE.TorusGeometry(0.037, 0.005, 7, 18);
  const front_sound_hole_rim = new THREE.Mesh(front_sound_hole_rimGeom, dark_metalMat);
  front_sound_hole_rim.position.set(-0.27, -0.018, bodyL / 2 + 0.017);
  body_group.add(front_sound_hole_rim);

  const side_screwsGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.014, 16);
  const side_screws = new THREE.InstancedMesh(side_screwsGeom, silver_metalMat, 2);
  side_screws.name = "side_screws";
  const side_screw_rotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  const side_screw_scale = new THREE.Vector3(1, 1, 1);
  const side_screw_matrix = new THREE.Matrix4();
  side_screw_matrix.compose(
    new THREE.Vector3(bodyW / 2 + 0.014, -0.005, -0.48),
    side_screw_rotation,
    side_screw_scale
  );
  side_screws.setMatrixAt(0, side_screw_matrix);
  side_screw_matrix.compose(
    new THREE.Vector3(bodyW / 2 + 0.014, -0.005, 0.53),
    side_screw_rotation,
    side_screw_scale
  );
  side_screws.setMatrixAt(1, side_screw_matrix);
  side_screws.instanceMatrix.needsUpdate = true;
  body_group.add(side_screws);

  const front_screwsGeom = new THREE.CylinderGeometry(0.023, 0.023, 0.012, 16);
  const front_screws = new THREE.InstancedMesh(front_screwsGeom, silver_metalMat, 2);
  front_screws.name = "front_screws";
  const front_screw_rotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const front_screw_matrix = new THREE.Matrix4();
  front_screw_matrix.compose(
    new THREE.Vector3(-0.46, -0.012, bodyL / 2 + 0.018),
    front_screw_rotation,
    side_screw_scale
  );
  front_screws.setMatrixAt(0, front_screw_matrix);
  front_screw_matrix.compose(
    new THREE.Vector3(0.46, -0.012, bodyL / 2 + 0.018),
    front_screw_rotation,
    side_screw_scale
  );
  front_screws.setMatrixAt(1, front_screw_matrix);
  front_screws.instanceMatrix.needsUpdate = true;
  body_group.add(front_screws);

  const keyXs = [-0.40, -0.20, 0.00, 0.20, 0.40];
  const keyLengths = [1.12, 1.04, 0.96, 0.88, 0.80];
  const keyAngles = [-0.035, -0.018, 0, 0.018, 0.035];
  const keyFrontZ = 0.58;

  const metal_tonguesGeom = makeRoundedHorizontalGeometry(0.15, 1.0, 0.036, 0.038);
  const metal_tongues = new THREE.InstancedMesh(metal_tonguesGeom, brushed_metalMat, 5);
  metal_tongues.name = "metal_tongues";
  const key_rotation_matrix = new THREE.Matrix4();
  const key_quaternion = new THREE.Quaternion();
  for (let i = 0; i < 5; i++) {
    key_quaternion.setFromEuler(new THREE.Euler(Math.PI / 2, keyAngles[i], 0));
    key_rotation_matrix.compose(
      new THREE.Vector3(keyXs[i], bodyTop + 0.034, keyFrontZ),
      key_quaternion,
      new THREE.Vector3(1, keyLengths[i], 1)
    );
    metal_tongues.setMatrixAt(i, key_rotation_matrix);
  }
  metal_tongues.instanceMatrix.needsUpdate = true;
  keyboard_group.add(metal_tongues);

  const rear_anchor_blocksGeom = new THREE.BoxGeometry(0.11, 0.035, 0.16);
  const rear_anchor_blocks = new THREE.InstancedMesh(rear_anchor_blocksGeom, dark_metalMat, 5);
  rear_anchor_blocks.name = "rear_anchor_blocks";
  const anchor_matrix = new THREE.Matrix4();
  for (let i = 0; i < 5; i++) {
    anchor_matrix.compose(
      new THREE.Vector3(keyXs[i], 0.151, -0.34),
      new THREE.Quaternion(),
      new THREE.Vector3(1, 1, 1)
    );
    rear_anchor_blocks.setMatrixAt(i, anchor_matrix);
  }
  rear_anchor_blocks.instanceMatrix.needsUpdate = true;
  keyboard_group.add(rear_anchor_blocks);

  const support_railGeom = makeRoundedHorizontalGeometry(0.105, 1.24, 0.035, 0.025);
  const support_rail = new THREE.Mesh(support_railGeom, brushed_metalMat);
  support_rail.rotation.x = Math.PI / 2;
  support_rail.position.set(-0.13, 0.185, 0.02);
  keyboard_group.add(support_rail);

  const cross_bridgeGeom = makeRoundedHorizontalGeometry(1.02, 0.16, 0.042, 0.035);
  const cross_bridge = new THREE.Mesh(cross_bridgeGeom, brushed_metalMat);
  cross_bridge.rotation.x = Math.PI / 2;
  cross_bridge.position.set(0, 0.222, -0.22);
  keyboard_group.add(cross_bridge);

  const bridge_rivetsGeom = new THREE.SphereGeometry(0.044, 18, 10);
  const bridge_rivets = new THREE.InstancedMesh(bridge_rivetsGeom, silver_metalMat, 2);
  bridge_rivets.name = "bridge_rivets";
  const rivet_matrix = new THREE.Matrix4();
  const rivet_rotation = new THREE.Quaternion();
  const rivet_scale = new THREE.Vector3(1, 0.34, 1);
  rivet_matrix.compose(
    new THREE.Vector3(-0.39, 0.239, -0.22),
    rivet_rotation,
    rivet_scale
  );
  bridge_rivets.setMatrixAt(0, rivet_matrix);
  rivet_matrix.compose(
    new THREE.Vector3(0.39, 0.239, -0.22),
    rivet_rotation,
    rivet_scale
  );
  bridge_rivets.setMatrixAt(1, rivet_matrix);
  bridge_rivets.instanceMatrix.needsUpdate = true;
  keyboard_group.add(bridge_rivets);

  const bridge_rivet_slotsGeom = new THREE.BoxGeometry(0.035, 0.004, 0.008);
  const bridge_rivet_slots = new THREE.InstancedMesh(bridge_rivet_slotsGeom, dark_metalMat, 2);
  bridge_rivet_slots.name = "bridge_rivet_slots";
  const slot_matrix = new THREE.Matrix4();
  slot_matrix.compose(
    new THREE.Vector3(-0.39, 0.255, -0.22),
    new THREE.Quaternion(),
    new THREE.Vector3(1, 1, 1)
  );
  bridge_rivet_slots.setMatrixAt(0, slot_matrix);
  slot_matrix.compose(
    new THREE.Vector3(0.39, 0.255, -0.22),
    new THREE.Quaternion(),
    new THREE.Vector3(1, 1, 1)
  );
  bridge_rivet_slots.setMatrixAt(1, slot_matrix);
  bridge_rivet_slots.instanceMatrix.needsUpdate = true;
  keyboard_group.add(bridge_rivet_slots);

  const handle_socketGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.13, 24);
  const handle_socket = new THREE.Mesh(handle_socketGeom, rubberMat);
  handle_socket.name = "handle_socket";
  handle_socket.rotation.z = -Math.PI / 2;
  handle_socket.position.set(bodyW / 2 + 0.035, -0.005, 0.20);
  handle_group.add(handle_socket);

  const wooden_handleProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.105, 0.000),
    new THREE.Vector2(0.128, 0.035),
    new THREE.Vector2(0.135, 0.120),
    new THREE.Vector2(0.150, 0.220),
    new THREE.Vector2(0.162, 0.340),
    new THREE.Vector2(0.154, 0.430),
    new THREE.Vector2(0.143, 0.485),
    new THREE.Vector2(0.148, 0.555),
    new THREE.Vector2(0.160, 0.620),
    new THREE.Vector2(0.157, 0.675),
    new THREE.Vector2(0.135, 0.720),
    new THREE.Vector2(0.000, 0.720)
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 32);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, woodMat);
  wooden_handle.name = "wooden_handle";
  wooden_handle.rotation.z = -Math.PI / 2;
  wooden_handle.position.set(bodyW / 2 + 0.035, -0.005, 0.20);
  handle_group.add(wooden_handle);

  const handle_grip_ringsGeom = new THREE.TorusGeometry(0.151, 0.011, 8, 28);
  const handle_grip_rings = new THREE.InstancedMesh(handle_grip_ringsGeom, dark_woodMat, 3);
  handle_grip_rings.name = "handle_grip_rings";
  const ring_rotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  const ring_matrix = new THREE.Matrix4();
  const ring_positions = [0.43, 0.485, 0.54];
  for (let i = 0; i < ring_positions.length; i++) {
    ring_matrix.compose(
      new THREE.Vector3(bodyW / 2 + 0.035 + ring_positions[i], -0.005, 0.20),
      ring_rotation,
      new THREE.Vector3(1, 1, 1)
    );
    handle_grip_rings.setMatrixAt(i, ring_matrix);
  }
  handle_grip_rings.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_grip_rings);

  const handle_end_capGeom = new THREE.CylinderGeometry(0.119, 0.119, 0.008, 24);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, dark_woodMat);
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.rotation.z = -Math.PI / 2;
  handle_end_cap.position.set(bodyW / 2 + 0.758, -0.005, 0.20);
  handle_group.add(handle_end_cap);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  root.updateMatrixWorld(true);
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