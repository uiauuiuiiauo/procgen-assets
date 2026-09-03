export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_metallophone";

  const bodyW = 1.20;
  const bodyL = 1.55;
  const bodyH = 0.24;
  const bodyTop = bodyH / 2;

  const base_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc83f59,
    metalness: 0.0,
    roughness: 0.6
  });
  const magenta_paintMat = new THREE.MeshStandardMaterial({
    color: 0xc83f91,
    metalness: 0.0,
    roughness: 0.6
  });
  const blue_paintMat = new THREE.MeshStandardMaterial({
    color: 0x159ed3,
    metalness: 0.0,
    roughness: 0.6
  });
  const green_paintMat = new THREE.MeshStandardMaterial({
    color: 0x42bd62,
    metalness: 0.0,
    roughness: 0.6
  });
  const yellow_paintMat = new THREE.MeshStandardMaterial({
    color: 0xf1d51e,
    metalness: 0.0,
    roughness: 0.6
  });
  const orange_paintMat = new THREE.MeshStandardMaterial({
    color: 0xff7042,
    metalness: 0.0,
    roughness: 0.6
  });
  const pink_paintMat = new THREE.MeshStandardMaterial({
    color: 0xf17ca8,
    metalness: 0.0,
    roughness: 0.6
  });
  const lime_paintMat = new THREE.MeshStandardMaterial({
    color: 0xa8d936,
    metalness: 0.0,
    roughness: 0.6
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_rubberMat = new THREE.MeshStandardMaterial({
    color: 0x242321,
    metalness: 0.0,
    roughness: 0.8
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa9784e,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x4d3424,
    metalness: 0.0,
    roughness: 0.9
  });

  function roundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;
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

  function roundedPlateGeometry(width, depth, thickness, radius, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, depth, radius),
      {
        depth: thickness,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2
      }
    );
  }

  const base_bodyGeom = roundedPlateGeometry(bodyW, bodyL, bodyH, 0.055, 0.012);
  const base_body = new THREE.Mesh(base_bodyGeom, base_bodyMat);
  base_body.name = "base_body";
  base_body.rotation.x = -Math.PI / 2;
  base_body.position.y = -bodyH / 2;
  root.add(base_body);

  const top_paint = new THREE.Group();
  top_paint.name = "top_paint";
  root.add(top_paint);

  const topPanelGeom = new THREE.BoxGeometry(0.238, 0.012, 1.47);
  const topPanelXs = [-0.48, -0.24, 0, 0.24, 0.48];
  const topPanelZs = [0.025, -0.005, 0.012, -0.008, 0.018];
  const topPanelScales = [0.96, 1.025, 1.0, 1.03, 0.96];

  function placeTopPanel(mesh, index) {
    mesh.position.set(topPanelXs[index], bodyTop + 0.006, topPanelZs[index]);
    mesh.scale.z = topPanelScales[index];
    top_paint.add(mesh);
  }

  const top_panel_magenta_left = new THREE.Mesh(topPanelGeom, magenta_paintMat);
  top_panel_magenta_left.name = "top_panel_magenta_left";
  placeTopPanel(top_panel_magenta_left, 0);

  const top_panel_blue_left = new THREE.Mesh(topPanelGeom, blue_paintMat);
  top_panel_blue_left.name = "top_panel_blue_left";
  placeTopPanel(top_panel_blue_left, 1);

  const top_panel_green_center = new THREE.Mesh(topPanelGeom, green_paintMat);
  top_panel_green_center.name = "top_panel_green_center";
  placeTopPanel(top_panel_green_center, 2);

  const top_panel_yellow_right = new THREE.Mesh(topPanelGeom, yellow_paintMat);
  top_panel_yellow_right.name = "top_panel_yellow_right";
  placeTopPanel(top_panel_yellow_right, 3);

  const top_panel_orange_right = new THREE.Mesh(topPanelGeom, orange_paintMat);
  top_panel_orange_right.name = "top_panel_orange_right";
  placeTopPanel(top_panel_orange_right, 4);

  const front_paint = new THREE.Group();
  front_paint.name = "front_paint";
  root.add(front_paint);

  const frontPanelGeom = new THREE.BoxGeometry(0.238, 0.205, 0.012);
  const frontPanelY = -0.005;
  const frontPanelZ = bodyL / 2 + 0.018;

  const front_panel_magenta_left = new THREE.Mesh(frontPanelGeom, magenta_paintMat);
  front_panel_magenta_left.name = "front_panel_magenta_left";
  front_panel_magenta_left.position.set(topPanelXs[0], frontPanelY, frontPanelZ);
  front_paint.add(front_panel_magenta_left);

  const front_panel_blue_left = new THREE.Mesh(frontPanelGeom, blue_paintMat);
  front_panel_blue_left.name = "front_panel_blue_left";
  front_panel_blue_left.position.set(topPanelXs[1], frontPanelY, frontPanelZ);
  front_paint.add(front_panel_blue_left);

  const front_panel_green_center = new THREE.Mesh(frontPanelGeom, green_paintMat);
  front_panel_green_center.name = "front_panel_green_center";
  front_panel_green_center.position.set(topPanelXs[2], frontPanelY, frontPanelZ);
  front_paint.add(front_panel_green_center);

  const front_panel_yellow_right = new THREE.Mesh(frontPanelGeom, yellow_paintMat);
  front_panel_yellow_right.name = "front_panel_yellow_right";
  front_panel_yellow_right.position.set(topPanelXs[3], frontPanelY, frontPanelZ);
  front_paint.add(front_panel_yellow_right);

  const front_panel_orange_right = new THREE.Mesh(frontPanelGeom, orange_paintMat);
  front_panel_orange_right.name = "front_panel_orange_right";
  front_panel_orange_right.position.set(topPanelXs[4], frontPanelY, frontPanelZ);
  front_paint.add(front_panel_orange_right);

  const right_side_orangeGeom = new THREE.BoxGeometry(0.012, 0.205, 1.43);
  const right_side_orange = new THREE.Mesh(right_side_orangeGeom, orange_paintMat);
  right_side_orange.name = "right_side_orange";
  right_side_orange.position.set(bodyW / 2 + 0.018, -0.005, 0);
  root.add(right_side_orange);

  const right_side_pink_bandGeom = new THREE.BoxGeometry(0.006, 0.19, 0.54);
  const right_side_pink_band = new THREE.Mesh(right_side_pink_bandGeom, pink_paintMat);
  right_side_pink_band.name = "right_side_pink_band";
  right_side_pink_band.position.set(bodyW / 2 + 0.025, 0.002, -0.43);
  root.add(right_side_pink_band);

  const right_side_lime_bandGeom = new THREE.BoxGeometry(0.006, 0.19, 0.22);
  const right_side_lime_band = new THREE.Mesh(right_side_lime_bandGeom, lime_paintMat);
  right_side_lime_band.name = "right_side_lime_band";
  right_side_lime_band.position.set(bodyW / 2 + 0.026, 0.002, 0.10);
  root.add(right_side_lime_band);

  const rear_orange_bandGeom = new THREE.BoxGeometry(1.10, 0.20, 0.012);
  const rear_orange_band = new THREE.Mesh(rear_orange_bandGeom, orange_paintMat);
  rear_orange_band.name = "rear_orange_band";
  rear_orange_band.position.set(0, -0.005, -bodyL / 2 - 0.018);
  root.add(rear_orange_band);

  const key_support_railsGeom = new THREE.BoxGeometry(0.065, 0.035, 1.22);
  const key_support_rails = new THREE.InstancedMesh(
    key_support_railsGeom,
    dark_rubberMat,
    2
  );
  key_support_rails.name = "key_support_rails";
  const supportDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    supportDummy.position.set(i === 0 ? -0.31 : 0.31, 0.145, 0);
    supportDummy.rotation.set(0, 0, 0);
    supportDummy.scale.set(1, 1, 1);
    supportDummy.updateMatrix();
    key_support_rails.setMatrixAt(i, supportDummy.matrix);
  }
  key_support_rails.instanceMatrix.needsUpdate = true;
  root.add(key_support_rails);

  const long_tone_barsGeom = roundedPlateGeometry(
    0.16,
    1.12,
    0.045,
    0.035,
    0.006
  );
  const long_tone_bars = new THREE.InstancedMesh(
    long_tone_barsGeom,
    brushed_metalMat,
    4
  );
  long_tone_bars.name = "long_tone_bars";

  const longBarXs = [-0.42, -0.14, 0.14, 0.42];
  const longBarZs = [0.11, 0.085, 0.06, 0.035];
  const longBarScales = [1.0, 0.985, 0.97, 0.955];
  const barDummy = new THREE.Object3D();

  for (let i = 0; i < 4; i++) {
    barDummy.position.set(longBarXs[i], 0.16, longBarZs[i]);
    barDummy.rotation.set(-Math.PI / 2, 0, 0);
    barDummy.scale.set(1, longBarScales[i], 1);
    barDummy.updateMatrix();
    long_tone_bars.setMatrixAt(i, barDummy.matrix);
  }
  long_tone_bars.instanceMatrix.needsUpdate = true;
  root.add(long_tone_bars);

  const short_tone_barsGeom = roundedPlateGeometry(
    0.15,
    0.48,
    0.045,
    0.035,
    0.006
  );
  const short_tone_bars = new THREE.InstancedMesh(
    short_tone_barsGeom,
    brushed_metalMat,
    4
  );
  short_tone_bars.name = "short_tone_bars";

  const shortBarZs = [-0.55, -0.535, -0.515, -0.495];
  const shortBarScales = [1.0, 0.985, 0.97, 0.955];

  for (let i = 0; i < 4; i++) {
    barDummy.position.set(longBarXs[i], 0.16, shortBarZs[i]);
    barDummy.rotation.set(-Math.PI / 2, 0, 0);
    barDummy.scale.set(1, shortBarScales[i], 1);
    barDummy.updateMatrix();
    short_tone_bars.setMatrixAt(i, barDummy.matrix);
  }
  short_tone_bars.instanceMatrix.needsUpdate = true;
  root.add(short_tone_bars);

  const bridgeGeom = roundedPlateGeometry(1.08, 0.15, 0.035, 0.025, 0.005);
  const bridge = new THREE.Mesh(bridgeGeom, brushed_metalMat);
  bridge.name = "bridge";
  bridge.rotation.x = -Math.PI / 2;
  bridge.position.set(0, 0.215, -0.27);
  root.add(bridge);

  const bridge_rivet_washersGeom = new THREE.CylinderGeometry(
    0.057,
    0.057,
    0.008,
    24
  );
  const bridge_rivet_washers = new THREE.InstancedMesh(
    bridge_rivet_washersGeom,
    dark_rubberMat,
    2
  );
  bridge_rivet_washers.name = "bridge_rivet_washers";

  const rivetDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    rivetDummy.position.set(i === 0 ? -0.43 : 0.43, 0.258, -0.27);
    rivetDummy.rotation.set(0, 0, 0);
    rivetDummy.scale.set(1, 1, 1);
    rivetDummy.updateMatrix();
    bridge_rivet_washers.setMatrixAt(i, rivetDummy.matrix);
  }
  bridge_rivet_washers.instanceMatrix.needsUpdate = true;
  root.add(bridge_rivet_washers);

  const bridge_rivetsGeom = new THREE.CylinderGeometry(0.047, 0.047, 0.014, 24);
  const bridge_rivets = new THREE.InstancedMesh(
    bridge_rivetsGeom,
    polished_metalMat,
    2
  );
  bridge_rivets.name = "bridge_rivets";

  for (let i = 0; i < 2; i++) {
    rivetDummy.position.set(i === 0 ? -0.43 : 0.43, 0.266, -0.27);
    rivetDummy.rotation.set(0, 0, 0);
    rivetDummy.scale.set(1, 1, 1);
    rivetDummy.updateMatrix();
    bridge_rivets.setMatrixAt(i, rivetDummy.matrix);
  }
  bridge_rivets.instanceMatrix.needsUpdate = true;
  root.add(bridge_rivets);

  const bridge_rivet_domesGeom = new THREE.SphereGeometry(0.043, 18, 10);
  const bridge_rivet_domes = new THREE.InstancedMesh(
    bridge_rivet_domesGeom,
    polished_metalMat,
    2
  );
  bridge_rivet_domes.name = "bridge_rivet_domes";

  for (let i = 0; i < 2; i++) {
    rivetDummy.position.set(i === 0 ? -0.43 : 0.43, 0.274, -0.27);
    rivetDummy.rotation.set(0, 0, 0);
    rivetDummy.scale.set(1, 0.34, 1);
    rivetDummy.updateMatrix();
    bridge_rivet_domes.setMatrixAt(i, rivetDummy.matrix);
  }
  bridge_rivet_domes.instanceMatrix.needsUpdate = true;
  root.add(bridge_rivet_domes);

  const side_screwsGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.012, 20);
  const side_screws = new THREE.InstancedMesh(
    side_screwsGeom,
    polished_metalMat,
    2
  );
  side_screws.name = "side_screws";

  const sideScrewZs = [-0.55, 0.55];
  for (let i = 0; i < 2; i++) {
    rivetDummy.position.set(bodyW / 2 + 0.035, -0.005, sideScrewZs[i]);
    rivetDummy.rotation.set(0, 0, -Math.PI / 2);
    rivetDummy.scale.set(1, 1, 1);
    rivetDummy.updateMatrix();
    side_screws.setMatrixAt(i, rivetDummy.matrix);
  }
  side_screws.instanceMatrix.needsUpdate = true;
  root.add(side_screws);

  const side_screw_slotsGeom = new THREE.BoxGeometry(0.007, 0.008, 0.047);
  const side_screw_slots = new THREE.InstancedMesh(
    side_screw_slotsGeom,
    dark_rubberMat,
    2
  );
  side_screw_slots.name = "side_screw_slots";

  for (let i = 0; i < 2; i++) {
    rivetDummy.position.set(bodyW / 2 + 0.043, -0.005, sideScrewZs[i]);
    rivetDummy.rotation.set(0, 0, 0);
    rivetDummy.scale.set(1, 1, 1);
    rivetDummy.updateMatrix();
    side_screw_slots.setMatrixAt(i, rivetDummy.matrix);
  }
  side_screw_slots.instanceMatrix.needsUpdate = true;
  root.add(side_screw_slots);

  const front_screwGeom = new THREE.CylinderGeometry(0.031, 0.031, 0.012, 20);
  const front_screw = new THREE.Mesh(front_screwGeom, polished_metalMat);
  front_screw.name = "front_screw";
  front_screw.rotation.x = Math.PI / 2;
  front_screw.position.set(0.43, -0.035, bodyL / 2 + 0.034);
  root.add(front_screw);

  const front_screw_slotGeom = new THREE.BoxGeometry(0.043, 0.007, 0.006);
  const front_screw_slot = new THREE.Mesh(front_screw_slotGeom, dark_rubberMat);
  front_screw_slot.name = "front_screw_slot";
  front_screw_slot.position.set(0.43, -0.035, bodyL / 2 + 0.043);
  root.add(front_screw_slot);

  const front_sound_holeGeom = new THREE.CylinderGeometry(
    0.046,
    0.046,
    0.009,
    24
  );
  const front_sound_hole = new THREE.Mesh(front_sound_holeGeom, dark_rubberMat);
  front_sound_hole.name = "front_sound_hole";
  front_sound_hole.rotation.x = Math.PI / 2;
  front_sound_hole.position.set(-0.19, -0.045, bodyL / 2 + 0.034);
  root.add(front_sound_hole);

  const front_sound_hole_rimGeom = new THREE.TorusGeometry(
    0.046,
    0.006,
    8,
    24
  );
  const front_sound_hole_rim = new THREE.Mesh(
    front_sound_hole_rimGeom,
    dark_rubberMat
  );
  front_sound_hole_rim.name = "front_sound_hole_rim";
  front_sound_hole_rim.position.set(-0.19, -0.045, bodyL / 2 + 0.042);
  root.add(front_sound_hole_rim);

  const handle_socketGeom = new THREE.CylinderGeometry(
    0.115,
    0.115,
    0.10,
    24
  );
  const handle_socket = new THREE.Mesh(handle_socketGeom, dark_rubberMat);
  handle_socket.name = "handle_socket";
  handle_socket.rotation.z = -Math.PI / 2;
  handle_socket.position.set(bodyW / 2 + 0.045, -0.015, 0.34);
  root.add(handle_socket);

  const wooden_handleProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.088, 0.000),
    new THREE.Vector2(0.096, 0.025),
    new THREE.Vector2(0.100, 0.110),
    new THREE.Vector2(0.108, 0.220),
    new THREE.Vector2(0.121, 0.320),
    new THREE.Vector2(0.139, 0.410),
    new THREE.Vector2(0.150, 0.475),
    new THREE.Vector2(0.147, 0.520),
    new THREE.Vector2(0.132, 0.560),
    new THREE.Vector2(0.095, 0.590),
    new THREE.Vector2(0.000, 0.605)
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 32);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, woodMat);
  wooden_handle.name = "wooden_handle";
  wooden_handle.rotation.z = -Math.PI / 2;
  wooden_handle.position.set(bodyW / 2 + 0.04, -0.015, 0.34);
  root.add(wooden_handle);

  const handle_grip_bandsGeom = new THREE.TorusGeometry(
    0.11,
    0.009,
    8,
    28
  );
  const handle_grip_bands = new THREE.InstancedMesh(
    handle_grip_bandsGeom,
    wood_grainMat,
    3
  );
  handle_grip_bands.name = "handle_grip_bands";

  const gripBandData = [
    [0.31, 0.116],
    [0.375, 0.126],
    [0.44, 0.137]
  ];
  for (let i = 0; i < 3; i++) {
    rivetDummy.position.set(
      bodyW / 2 + 0.04 + gripBandData[i][0],
      -0.015,
      0.34
    );
    rivetDummy.rotation.set(0, Math.PI / 2, 0);
    rivetDummy.scale.set(gripBandData[i][1] / 0.11, gripBandData[i][1] / 0.11, 1);
    rivetDummy.updateMatrix();
    handle_grip_bands.setMatrixAt(i, rivetDummy.matrix);
  }
  handle_grip_bands.instanceMatrix.needsUpdate = true;
  root.add(handle_grip_bands);

  const handle_grain_lines = new THREE.Group();
  handle_grain_lines.name = "handle_grain_lines";
  root.add(handle_grain_lines);

  const grainOffsets = [-0.043, 0.004, 0.046];
  for (let i = 0; i < 3; i++) {
    const offset = grainOffsets[i];
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(bodyW / 2 + 0.19, -0.015 + offset, 0.34),
      new THREE.Vector3(
        bodyW / 2 + 0.32,
        -0.015 + offset + 0.005,
        0.34 + (i - 1) * 0.004
      ),
      new THREE.Vector3(
        bodyW / 2 + 0.46,
        -0.015 + offset - 0.004,
        0.34 + (1 - i) * 0.005
      ),
      new THREE.Vector3(
        bodyW / 2 + 0.57,
        -0.015 + offset + 0.002,
        0.34
      )
    ]);
    const handle_grain_lineGeom = new THREE.TubeGeometry(
      path,
      18,
      0.0028,
      6,
      false
    );
    const handle_grain_line = new THREE.Mesh(
      handle_grain_lineGeom,
      wood_grainMat
    );
    handle_grain_line.name = "handle_grain_line_" + i;
    handle_grain_lines.add(handle_grain_line);
  }

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}