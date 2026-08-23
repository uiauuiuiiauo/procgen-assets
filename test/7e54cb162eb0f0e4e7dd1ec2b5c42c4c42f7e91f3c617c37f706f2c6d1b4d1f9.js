export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_audio_mixer";

  const chassis_group = new THREE.Group();
  chassis_group.name = "chassis_group";
  root.add(chassis_group);

  const controls_group = new THREE.Group();
  controls_group.name = "controls_group";
  root.add(controls_group);

  const print_group = new THREE.Group();
  print_group.name = "print_group";
  root.add(print_group);

  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8
  });
  const top_panelMat = new THREE.MeshStandardMaterial({
    color: 0x202225,
    metalness: 0.0,
    roughness: 0.8
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x101214,
    metalness: 0.0,
    roughness: 0.8
  });
  const knobMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.3
  });
  const knob_capMat = new THREE.MeshStandardMaterial({
    color: 0x292c2f,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8
  });
  const fader_trackMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.8
  });
  const fader_handleMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.3
  });
  const white_printMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e4,
    metalness: 0.0,
    roughness: 0.7
  });
  const gray_printMat = new THREE.MeshStandardMaterial({
    color: 0xaeb1ae,
    metalness: 0.0,
    roughness: 0.7
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xd72632,
    metalness: 0.0,
    roughness: 0.3
  });
  const green_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x28c76f,
    metalness: 0.0,
    roughness: 0.3
  });
  const orange_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xf06a32,
    metalness: 0.0,
    roughness: 0.3
  });
  const yellow_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xe7cf45,
    metalness: 0.0,
    roughness: 0.3
  });
  const green_ledMat = new THREE.MeshStandardMaterial({
    color: 0x21e36e,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x21e36e,
    emissiveIntensity: 1.0
  });
  const red_ledMat = new THREE.MeshStandardMaterial({
    color: 0xff3045,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff3045,
    emissiveIntensity: 1.0
  });
  const orange_ledMat = new THREE.MeshStandardMaterial({
    color: 0xff7934,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff7934,
    emissiveIntensity: 1.0
  });
  const yellow_ledMat = new THREE.MeshStandardMaterial({
    color: 0xffdb4a,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffdb4a,
    emissiveIntensity: 1.0
  });
  const red_socketMat = new THREE.MeshStandardMaterial({
    color: 0x7d1118,
    metalness: 0.0,
    roughness: 0.3
  });

  function roundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;
    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);
    return shape;
  }

  const chassisShape = roundedRectShape(3.40, 1.58, 0.08);
  const chassisGeom = new THREE.ExtrudeGeometry(chassisShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3
  });
  const chassis = new THREE.Mesh(chassisGeom, chassisMat);
  chassis.name = "chassis";
  chassis.rotation.x = -Math.PI / 2;
  chassis.position.y = 0.02;
  chassis_group.add(chassis);

  const top_panelShape = roundedRectShape(3.28, 1.46, 0.055);
  const top_panelGeom = new THREE.ExtrudeGeometry(top_panelShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const top_panel = new THREE.Mesh(top_panelGeom, top_panelMat);
  top_panel.name = "top_panel";
  top_panel.rotation.x = -Math.PI / 2;
  top_panel.position.y = 0.19;
  chassis_group.add(top_panel);

  const front_lipGeom = new THREE.BoxGeometry(3.28, 0.12, 0.075);
  const front_lip = new THREE.Mesh(front_lipGeom, edgeMat);
  front_lip.name = "front_lip";
  front_lip.position.set(0, 0.105, 0.785);
  chassis_group.add(front_lip);

  const side_railGeom = new THREE.BoxGeometry(0.095, 0.12, 1.48);
  const left_side_rail = new THREE.Mesh(side_railGeom, edgeMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-1.68, 0.215, 0);
  chassis_group.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, edgeMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(1.68, 0.215, 0);
  chassis_group.add(right_side_rail);

  const rear_railGeom = new THREE.BoxGeometry(3.25, 0.09, 0.09);
  const rear_rail = new THREE.Mesh(rear_railGeom, edgeMat);
  rear_rail.name = "rear_rail";
  rear_rail.position.set(0, 0.225, -0.75);
  chassis_group.add(rear_rail);

  const front_right_corner_capGeom = new THREE.BoxGeometry(0.11, 0.19, 1.48);
  const front_right_corner_cap = new THREE.Mesh(front_right_corner_capGeom, edgeMat);
  front_right_corner_cap.name = "front_right_corner_cap";
  front_right_corner_cap.position.set(1.69, 0.13, 0);
  chassis_group.add(front_right_corner_cap);

  const right_corner_seamGeom = new THREE.BoxGeometry(0.012, 0.006, 1.43);
  const right_corner_seam = new THREE.Mesh(right_corner_seamGeom, rubberMat);
  right_corner_seam.name = "right_corner_seam";
  right_corner_seam.position.set(1.625, 0.273, 0);
  chassis_group.add(right_corner_seam);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.075, 0.085, 0.08, 16);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const feetPositions = [
    [-1.45, -0.045, -0.62],
    [1.45, -0.045, -0.62],
    [-1.45, -0.045, 0.62],
    [1.45, -0.045, 0.62]
  ];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < feetPositions.length; i++) {
    dummy.position.set(feetPositions[i][0], feetPositions[i][1], feetPositions[i][2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  chassis_group.add(rubber_feet);

  const panelY = 0.225;

  function addPanelLine(name, x0, z0, x1, z1, width, material) {
    const dx = x1 - x0;
    const dz = z1 - z0;
    const length = Math.sqrt(dx * dx + dz * dz);
    const geom = new THREE.BoxGeometry(length, 0.004, width);
    const mesh = new THREE.Mesh(geom, material);
    mesh.name = name;
    mesh.position.set((x0 + x1) / 2, panelY + 0.005, (z0 + z1) / 2);
    mesh.rotation.y = -Math.atan2(dz, dx);
    print_group.add(mesh);
    return mesh;
  }

  const master_scale_arc_left = addPanelLine(
    "master_scale_arc_left",
    -1.31, -0.12, -1.31, 0.18, 0.008, white_printMat
  );
  master_scale_arc_left.rotation.y = 0;

  const master_scale_arcGeom = new THREE.TorusGeometry(0.255, 0.005, 6, 36, Math.PI);
  const master_scale_arc = new THREE.Mesh(master_scale_arcGeom, white_printMat);
  master_scale_arc.name = "master_scale_arc";
  master_scale_arc.rotation.x = Math.PI / 2;
  master_scale_arc.position.set(-1.31, panelY + 0.006, 0.02);
  print_group.add(master_scale_arc);

  const section_divider_left = addPanelLine(
    "section_divider_left", -1.01, -0.69, -1.01, 0.67, 0.008, gray_printMat
  );
  const section_divider_one = addPanelLine(
    "section_divider_one", -0.72, -0.69, -0.72, 0.67, 0.006, gray_printMat
  );
  const section_divider_two = addPanelLine(
    "section_divider_two", -0.43, -0.69, -0.43, 0.67, 0.006, gray_printMat
  );
  const section_divider_three = addPanelLine(
    "section_divider_three", -0.14, -0.69, -0.14, 0.67, 0.006, gray_printMat
  );
  const section_divider_four = addPanelLine(
    "section_divider_four", 0.15, -0.69, 0.15, 0.67, 0.006, gray_printMat
  );
  const section_divider_five = addPanelLine(
    "section_divider_five", 0.44, -0.69, 0.44, 0.67, 0.006, gray_printMat
  );
  const section_divider_right = addPanelLine(
    "section_divider_right", 1.02, -0.69, 1.02, 0.67, 0.008, gray_printMat
  );

  const glyphs = {
    Y: ["101", "101", "010", "010", "010"],
    A: ["010", "101", "111", "101", "101"],
    M: ["101", "111", "111", "101", "101"],
    H: ["101", "101", "111", "101", "101"],
    D: ["110", "101", "101", "101", "110"],
    P: ["110", "101", "110", "100", "100"],
    S: ["111", "100", "111", "001", "111"],
    E: ["111", "100", "110", "100", "111"],
    Q: ["010", "101", "101", "111", "011"],
    U: ["101", "101", "101", "101", "111"],
    I: ["111", "010", "010", "010", "111"],
    " ": ["000", "000", "000", "000", "000"]
  };

  function makePixelLabel(name, text, cell, x, z) {
    const cells = [];
    let column = 0;
    for (let c = 0; c < text.length; c++) {
      const pattern = glyphs[text[c]] || glyphs[" "];
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (pattern[row][col] === "1") {
            cells.push([x + (column + col) * cell, z + row * cell]);
          }
        }
      }
      column += 4;
    }

    const geom = new THREE.BoxGeometry(cell * 0.72, 0.005, cell * 0.72);
    const mesh = new THREE.InstancedMesh(geom, white_printMat, cells.length);
    mesh.name = name;
    for (let i = 0; i < cells.length; i++) {
      dummy.position.set(cells[i][0], panelY + 0.007, cells[i][1]);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    print_group.add(mesh);
    return mesh;
  }

  const brand_label = makePixelLabel(
    "brand_label", "YAMAHA", 0.018, -1.52, -0.69
  );
  const model_label = makePixelLabel(
    "model_label", "YDP", 0.018, -1.08, -0.69
  );
  const mixer_label = makePixelLabel(
    "mixer_label", "AUDIO MIXER", 0.009, -0.05, -0.69
  );

  const channelX = [-0.86, -0.57, -0.28, 0.01, 0.30, 0.59];

  const fader_trackGeom = new THREE.BoxGeometry(0.075, 0.012, 0.56);
  const fader_tracks = new THREE.InstancedMesh(fader_trackGeom, fader_trackMat, channelX.length);
  fader_tracks.name = "fader_tracks";
  for (let i = 0; i < channelX.length; i++) {
    dummy.position.set(channelX[i], panelY + 0.004, 0.405);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fader_tracks.setMatrixAt(i, dummy.matrix);
  }
  fader_tracks.instanceMatrix.needsUpdate = true;
  controls_group.add(fader_tracks);

  const fader_handleGeom = new THREE.BoxGeometry(0.145, 0.06, 0.09);
  const fader_handles = new THREE.InstancedMesh(fader_handleGeom, fader_handleMat, channelX.length);
  fader_handles.name = "fader_handles";
  const faderOffsets = [-0.12, 0.05, 0.15, -0.05, 0.11, -0.16];
  for (let i = 0; i < channelX.length; i++) {
    dummy.position.set(channelX[i], panelY + 0.038, 0.405 + faderOffsets[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fader_handles.setMatrixAt(i, dummy.matrix);
  }
  fader_handles.instanceMatrix.needsUpdate = true;
  controls_group.add(fader_handles);

  const fader_highlightGeom = new THREE.BoxGeometry(0.12, 0.005, 0.012);
  const fader_highlights = new THREE.InstancedMesh(
    fader_highlightGeom,
    white_printMat,
    channelX.length
  );
  fader_highlights.name = "fader_highlights";
  for (let i = 0; i < channelX.length; i++) {
    dummy.position.set(
      channelX[i],
      panelY + 0.071,
      0.405 + faderOffsets[i] - 0.026
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fader_highlights.setMatrixAt(i, dummy.matrix);
  }
  fader_highlights.instanceMatrix.needsUpdate = true;
  controls_group.add(fader_highlights);

  const fader_tickGeom = new THREE.BoxGeometry(0.045, 0.004, 0.008);
  const fader_ticks = new THREE.InstancedMesh(fader_tickGeom, white_printMat, 48);
  fader_ticks.name = "fader_ticks";
  let faderTickIndex = 0;
  for (let i = 0; i < channelX.length; i++) {
    for (let j = 0; j < 8; j++) {
      const z = 0.15 + j * 0.069;
      const lengthScale = j % 3 === 0 ? 1.0 : 0.65;
      for (const side of [-1, 1]) {
        dummy.position.set(
          channelX[i] + side * 0.062,
          panelY + 0.007,
          z
        );
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(lengthScale, 1, 1);
        dummy.updateMatrix();
        fader_ticks.setMatrixAt(faderTickIndex++, dummy.matrix);
      }
    }
  }
  fader_ticks.instanceMatrix.needsUpdate = true;
  print_group.add(fader_ticks);

  const channel_nameGeom = new THREE.BoxGeometry(0.09, 0.004, 0.008);
  const channel_name_marks = new THREE.InstancedMesh(
    channel_nameGeom,
    gray_printMat,
    channelX.length
  );
  channel_name_marks.name = "channel_name_marks";
  for (let i = 0; i < channelX.length; i++) {
    dummy.position.set(channelX[i], panelY + 0.007, 0.715);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    channel_name_marks.setMatrixAt(i, dummy.matrix);
  }
  channel_name_marks.instanceMatrix.needsUpdate = true;
  print_group.add(channel_name_marks);

  const knobBodyH = 0.14;
  const knobBodyR = 0.082;
  const knobBaseR = 0.098;
  const knobCapR = 0.063;
  const knobMarkerLength = 0.052;

  const rotary_knob_baseGeom = new THREE.CylinderGeometry(
    knobBaseR, knobBaseR, 0.018, 20
  );
  const rotary_knob_bodyGeom = new THREE.CylinderGeometry(
    knobCapR, knobBodyR, knobBodyH, 12
  );
  const rotary_knob_capGeom = new THREE.CylinderGeometry(
    knobCapR * 0.96, knobCapR, 0.014, 16
  );
  const rotary_knob_markerGeom = new THREE.BoxGeometry(
    0.012, 0.006, knobMarkerLength
  );

  const rotaryKnobData = [
    [-1.31, 0.02, 1.25, -0.55, 0],
    [-1.05, -0.34, 0.95, -0.75, 1],
    [-0.86, -0.34, 0.92, 0.35, 0],
    [-0.57, -0.34, 0.92, -0.15, 0],
    [-0.28, -0.34, 0.92, 0.65, 0],
    [0.01, -0.34, 0.92, -0.45, 0],
    [0.30, -0.34, 0.92, 0.20, 0],
    [0.59, -0.34, 0.92, -0.70, 0],
    [0.88, -0.34, 0.92, 0.45, 0],
    [1.18, -0.34, 0.92, -0.25, 0],
    [-0.86, -0.07, 0.82, 0.55, 0],
    [-0.57, -0.07, 0.82, -0.35, 0],
    [-0.28, -0.07, 0.82, 0.80, 0],
    [0.01, -0.07, 0.82, -0.10, 0],
    [0.30, -0.07, 0.82, 0.40, 0],
    [0.59, -0.07, 0.82, -0.55, 0],
    [0.88, -0.07, 0.82, 0.70, 0],
    [1.18, -0.07, 0.82, -0.20, 0],
    [1.43, 0.08, 0.82, 0.40, 0]
  ];

  const rotary_knob_bases = new THREE.InstancedMesh(
    rotary_knob_baseGeom, knobMat, rotaryKnobData.length
  );
  rotary_knob_bases.name = "rotary_knob_bases";

  const rotary_knob_bodies = new THREE.InstancedMesh(
    rotary_knob_bodyGeom, knobMat, rotaryKnobData.length
  );
  rotary_knob_bodies.name = "rotary_knob_bodies";

  const rotary_knob_caps = new THREE.InstancedMesh(
    rotary_knob_capGeom, knob_capMat, rotaryKnobData.length
  );
  rotary_knob_caps.name = "rotary_knob_caps";

  const rotary_knob_markers = new THREE.InstancedMesh(
    rotary_knob_markerGeom, white_printMat, rotaryKnobData.length
  );
  rotary_knob_markers.name = "rotary_knob_markers";

  for (let i = 0; i < rotaryKnobData.length; i++) {
    const data = rotaryKnobData[i];
    const x = data[0];
    const z = data[1];
    const scale = data[2];
    const angle = data[3];

    dummy.position.set(x, panelY + 0.009 * scale, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    rotary_knob_bases.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, panelY + 0.018 * scale + knobBodyH * scale / 2, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    rotary_knob_bodies.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, panelY + 0.018 * scale + knobBodyH * scale + 0.004 * scale, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    rotary_knob_caps.setMatrixAt(i, dummy.matrix);

    const markerOffset = knobMarkerLength * scale / 2 + 0.004;
    dummy.position.set(
      x + Math.sin(angle) * markerOffset,
      panelY + 0.019 * scale + knobBodyH * scale + 0.014 * scale,
      z + Math.cos(angle) * markerOffset
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    rotary_knob_markers.setMatrixAt(i, dummy.matrix);
  }

  rotary_knob_bases.instanceMatrix.needsUpdate = true;
  rotary_knob_bodies.instanceMatrix.needsUpdate = true;
  rotary_knob_caps.instanceMatrix.needsUpdate = true;
  rotary_knob_markers.instanceMatrix.needsUpdate = true;
  controls_group.add(
    rotary_knob_bases,
    rotary_knob_bodies,
    rotary_knob_caps,
    rotary_knob_markers
  );

  const master_knob_baseGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.02, 24);
  const master_knob_base = new THREE.Mesh(master_knob_baseGeom, knobMat);
  master_knob_base.name = "master_knob_base";
  master_knob_base.position.set(-1.31, panelY + 0.01, 0.51);
  controls_group.add(master_knob_base);

  const master_level_knobGeom = new THREE.CylinderGeometry(
    0.095, 0.13, 0.12, 16
  );
  const master_level_knob = new THREE.Mesh(master_level_knobGeom, knobMat);
  master_level_knob.name = "master_level_knob";
  master_level_knob.position.set(-1.31, panelY + 0.077, 0.51);
  master_level_knob.rotation.y = -0.65;
  controls_group.add(master_level_knob);

  const master_level_capGeom = new THREE.CylinderGeometry(0.09, 0.095, 0.014, 20);
  const master_level_cap = new THREE.Mesh(master_level_capGeom, knob_capMat);
  master_level_cap.name = "master_level_cap";
  master_level_cap.position.set(-1.31, panelY + 0.142, 0.51);
  controls_group.add(master_level_cap);

  const masterMarkerAngle = -0.65;
  const master_level_markerGeom = new THREE.BoxGeometry(0.015, 0.007, 0.075);
  const master_level_marker = new THREE.Mesh(master_level_markerGeom, white_printMat);
  master_level_marker.name = "master_level_marker";
  master_level_marker.position.set(
    -1.31 + Math.sin(masterMarkerAngle) * 0.038,
    panelY + 0.153,
    0.51 + Math.cos(masterMarkerAngle) * 0.038
  );
  master_level_marker.rotation.y = masterMarkerAngle;
  controls_group.add(master_level_marker);

  const master_scale_tickGeom = new THREE.BoxGeometry(0.012, 0.004, 0.035);
  const master_scale_ticks = new THREE.InstancedMesh(
    master_scale_tickGeom, white_printMat, 13
  );
  master_scale_ticks.name = "master_scale_ticks";
  for (let i = 0; i < 13; i++) {
    const angle = Math.PI * (0.08 + i * 0.074);
    dummy.position.set(
      -1.31 + Math.sin(angle) * 0.185,
      panelY + 0.007,
      0.51 + Math.cos(angle) * 0.185
    );
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(1, 1, i % 3 === 0 ? 1.25 : 0.75);
    dummy.updateMatrix();
    master_scale_ticks.setMatrixAt(i, dummy.matrix);
  }
  master_scale_ticks.instanceMatrix.needsUpdate = true;
  print_group.add(master_scale_ticks);

  const coloredCapData = [
    [-0.57, -0.34, -0.15, 0],
    [-0.28, -0.34, 0.65, 1],
    [0.01, -0.07, -0.10, 2],
    [0.30, -0.34, 0.20, 2],
    [0.88, -0.07, 0.70, 2],
    [1.18, -0.34, -0.25, 3]
  ];
  const colored_knob_capGeom = new THREE.CylinderGeometry(0.058, 0.061, 0.018, 16);

  function createColoredKnobCaps(name, material, indices) {
    const selected = [];
    for (let i = 0; i < indices.length; i++) {
      selected.push(coloredCapData[indices[i]]);
    }
    const mesh = new THREE.InstancedMesh(colored_knob_capGeom, material, selected.length);
    mesh.name = name;
    for (let i = 0; i < selected.length; i++) {
      const data = selected[i];
      dummy.position.set(data[0], panelY + 0.168, data[1]);
      dummy.rotation.set(0, data[2], 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    controls_group.add(mesh);
    return mesh;
  }

  const green_knob_caps = createColoredKnobCaps(
    "green_knob_caps", green_buttonMat, [0, 3, 4]
  );
  const red_knob_caps = createColoredKnobCaps(
    "red_knob_caps", red_buttonMat, [1]
  );
  const orange_knob_caps = createColoredKnobCaps(
    "orange_knob_caps", orange_buttonMat, [2]
  );
  const cyan_knob_caps = createColoredKnobCaps(
    "cyan_knob_caps", green_ledMat, [5]
  );

  const square_buttonGeom = new THREE.BoxGeometry(0.105, 0.055, 0.105);

  function createSquareButtons(name, material, positions) {
    const mesh = new THREE.InstancedMesh(square_buttonGeom, material, positions.length);
    mesh.name = name;
    for (let i = 0; i < positions.length; i++) {
      dummy.position.set(positions[i][0], panelY + 0.035, positions[i][1]);
      dummy.rotation.set(0, positions[i][2] || 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    controls_group.add(mesh);
    return mesh;
  }

  const red_square_buttons = createSquareButtons(
    "red_square_buttons",
    red_buttonMat,
    [
      [-0.57, 0.055, 0.04],
      [0.30, 0.055, -0.05],
      [0.59, 0.055, 0.03]
    ]
  );

  const gray_square_buttons = createSquareButtons(
    "gray_square_buttons",
    gray_printMat,
    [
      [-0.86, 0.055, -0.04],
      [-0.28, 0.055, 0.04],
      [0.88, 0.055, -0.03]
    ]
  );

  const square_button_markGeom = new THREE.BoxGeometry(0.055, 0.005, 0.012);
  const square_button_marks = new THREE.InstancedMesh(
    square_button_markGeom, white_printMat, 6
  );
  square_button_marks.name = "square_button_marks";
  const allButtonPositions = [
    [-0.86, 0.055],
    [-0.57, 0.055],
    [-0.28, 0.055],
    [0.30, 0.055],
    [0.59, 0.055],
    [0.88, 0.055]
  ];
  for (let i = 0; i < allButtonPositions.length; i++) {
    dummy.position.set(
      allButtonPositions[i][0],
      panelY + 0.065,
      allButtonPositions[i][1]
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    square_button_marks.setMatrixAt(i, dummy.matrix);
  }
  square_button_marks.instanceMatrix.needsUpdate = true;
  controls_group.add(square_button_marks);

  const round_buttonGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.035, 16);

  function createRoundButtons(name, material, positions) {
    const mesh = new THREE.InstancedMesh(round_buttonGeom, material, positions.length);
    mesh.name = name;
    for (let i = 0; i < positions.length; i++) {
      dummy.position.set(positions[i][0], panelY + 0.024, positions[i][1]);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    controls_group.add(mesh);
    return mesh;
  }

  const green_round_buttons = createRoundButtons(
    "green_round_buttons",
    green_buttonMat,
    [
      [0.01, -0.07],
      [0.30, -0.34],
      [0.88, -0.07],
      [1.18, -0.34]
    ]
  );

  const red_round_buttons = createRoundButtons(
    "red_round_buttons",
    red_buttonMat,
    [
      [-0.28, -0.07],
      [0.01, -0.34],
      [0.59, -0.07]
    ]
  );

  const orange_round_buttons = createRoundButtons(
    "orange_round_buttons",
    orange_buttonMat,
    [
      [-0.57, -0.07],
      [0.30, -0.34],
      [0.59, -0.34]
    ]
  );

  const indicator_lightGeom = new THREE.BoxGeometry(0.075, 0.018, 0.032);

  function createIndicatorLights(name, material, positions) {
    const mesh = new THREE.InstancedMesh(
      indicator_lightGeom, material, positions.length
    );
    mesh.name = name;
    for (let i = 0; i < positions.length; i++) {
      dummy.position.set(positions[i][0], panelY + 0.015, positions[i][1]);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    controls_group.add(mesh);
    return mesh;
  }

  const green_indicator_lights = createIndicatorLights(
    "green_indicator_lights",
    green_ledMat,
    [
      [0.88, -0.585],
      [1.18, -0.585],
      [1.34, -0.585]
    ]
  );

  const red_indicator_lights = createIndicatorLights(
    "red_indicator_lights",
    red_ledMat,
    [
      [1.03, -0.585],
      [1.47, -0.585]
    ]
  );

  const amber_indicator_lights = createIndicatorLights(
    "amber_indicator_lights",
    orange_ledMat,
    [
      [0.73, -0.585],
      [1.24, -0.585]
    ]
  );

  const status_dotGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.018, 12);

  function createStatusDots(name, material, positions) {
    const mesh = new THREE.InstancedMesh(status_dotGeom, material, positions.length);
    mesh.name = name;
    for (let i = 0; i < positions.length; i++) {
      dummy.position.set(positions[i][0], panelY + 0.014, positions[i][1]);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    controls_group.add(mesh);
    return mesh;
  }

  const yellow_status_dots = createStatusDots(
    "yellow_status_dots",
    yellow_ledMat,
    [
      [-0.72, -0.235],
      [0.76, 0.08]
    ]
  );

  const red_status_dots = createStatusDots(
    "red_status_dots",
    red_ledMat,
    [
      [-0.48, 0.02],
      [1.08, 0.18],
      [1.12, 0.57]
    ]
  );

  const panel_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 16);
  const panel_screws = new THREE.InstancedMesh(panel_screwGeom, dark_metalMat, 4);
  panel_screws.name = "panel_screws";
  const screwPositions = [
    [-1.50, 0.66],
    [1.50, 0.66],
    [-1.50, -0.66],
    [1.50, -0.66]
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    dummy.position.set(screwPositions[i][0], panelY + 0.012, screwPositions[i][1]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    panel_screws.setMatrixAt(i, dummy.matrix);
  }
  panel_screws.instanceMatrix.needsUpdate = true;
  controls_group.add(panel_screws);

  const screw_slotGeom = new THREE.BoxGeometry(0.045, 0.005, 0.008);
  const screw_slots = new THREE.InstancedMesh(screw_slotGeom, rubberMat, 4);
  screw_slots.name = "screw_slots";
  for (let i = 0; i < screwPositions.length; i++) {
    dummy.position.set(screwPositions[i][0], panelY + 0.023, screwPositions[i][1]);
    dummy.rotation.set(0, i % 2 === 0 ? 0.35 : -0.35, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    screw_slots.setMatrixAt(i, dummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  controls_group.add(screw_slots);

  const input_jack_ringGeom = new THREE.TorusGeometry(0.047, 0.012, 8, 20);
  const input_jack_ring = new THREE.Mesh(input_jack_ringGeom, rubberMat);
  input_jack_ring.name = "input_jack_ring";
  input_jack_ring.rotation.x = Math.PI / 2;
  input_jack_ring.position.set(1.49, panelY + 0.013, -0.19);
  controls_group.add(input_jack_ring);

  const input_jack_holeGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.02, 18);
  const input_jack_hole = new THREE.Mesh(input_jack_holeGeom, rubberMat);
  input_jack_hole.name = "input_jack_hole";
  input_jack_hole.position.set(1.49, panelY + 0.014, -0.19);
  controls_group.add(input_jack_hole);

  const output_jack_ringGeom = new THREE.TorusGeometry(0.052, 0.014, 8, 20);
  const output_jack_ring = new THREE.Mesh(output_jack_ringGeom, red_socketMat);
  output_jack_ring.name = "output_jack_ring";
  output_jack_ring.rotation.x = Math.PI / 2;
  output_jack_ring.position.set(1.49, panelY + 0.014, 0.46);
  controls_group.add(output_jack_ring);

  const output_jack_holeGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.022, 18);
  const output_jack_hole = new THREE.Mesh(output_jack_holeGeom, rubberMat);
  output_jack_hole.name = "output_jack_hole";
  output_jack_hole.position.set(1.49, panelY + 0.015, 0.46);
  controls_group.add(output_jack_hole);

  const headphone_jack_ringGeom = new THREE.TorusGeometry(0.038, 0.01, 8, 18);
  const headphone_jack_ring = new THREE.Mesh(headphone_jack_ringGeom, silverMat);
  headphone_jack_ring.name = "headphone_jack_ring";
  headphone_jack_ring.rotation.x = Math.PI / 2;
  headphone_jack_ring.position.set(1.27, panelY + 0.013, 0.53);
  controls_group.add(headphone_jack_ring);

  const headphone_jack_holeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.019, 16);
  const headphone_jack_hole = new THREE.Mesh(headphone_jack_holeGeom, rubberMat);
  headphone_jack_hole.name = "headphone_jack_hole";
  headphone_jack_hole.position.set(1.27, panelY + 0.014, 0.53);
  controls_group.add(headphone_jack_hole);

  const knob_legendGeom = new THREE.BoxGeometry(0.07, 0.004, 0.007);
  const rotary_knob_legends = new THREE.InstancedMesh(
    knob_legendGeom, gray_printMat, rotaryKnobData.length
  );
  rotary_knob_legends.name = "rotary_knob_legends";
  for (let i = 0; i < rotaryKnobData.length; i++) {
    const data = rotaryKnobData[i];
    dummy.position.set(data[0], panelY + 0.007, data[1] + 0.115);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(i % 3 === 0 ? 1.0 : 0.65, 1, 1);
    dummy.updateMatrix();
    rotary_knob_legends.setMatrixAt(i, dummy.matrix);
  }
  rotary_knob_legends.instanceMatrix.needsUpdate = true;
  print_group.add(rotary_knob_legends);

  const knob_tickGeom = new THREE.BoxGeometry(0.008, 0.004, 0.022);
  const rotary_knob_ticks = new THREE.InstancedMesh(
    knob_tickGeom, white_printMat, rotaryKnobData.length * 3
  );
  rotary_knob_ticks.name = "rotary_knob_ticks";
  let knobTickIndex = 0;
  for (let i = 0; i < rotaryKnobData.length; i++) {
    const data = rotaryKnobData[i];
    for (let j = 0; j < 3; j++) {
      const angle = -0.8 + j * 0.8;
      const radius = 0.112 * data[2];
      dummy.position.set(
        data[0] + Math.sin(angle) * radius,
        panelY + 0.007,
        data[1] + Math.cos(angle) * radius
      );
      dummy.rotation.set(0, angle, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      rotary_knob_ticks.setMatrixAt(knobTickIndex++, dummy.matrix);
    }
  }
  rotary_knob_ticks.instanceMatrix.needsUpdate = true;
  print_group.add(rotary_knob_ticks);

  const control_labelGeom = new THREE.BoxGeometry(0.075, 0.004, 0.007);
  const control_labels = new THREE.InstancedMesh(
    control_labelGeom, gray_printMat, 24
  );
  control_labels.name = "control_labels";
  let controlLabelIndex = 0;
  for (let i = 0; i < channelX.length; i++) {
    for (let j = 0; j < 4; j++) {
      dummy.position.set(
        channelX[i],
        panelY + 0.007,
        -0.55 + j * 0.145
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(j % 2 === 0 ? 0.75 : 0.45, 1, 1);
      dummy.updateMatrix();
      control_labels.setMatrixAt(controlLabelIndex++, dummy.matrix);
    }
  }
  control_labels.instanceMatrix.needsUpdate = true;
  print_group.add(control_labels);

  const right_legendGeom = new THREE.BoxGeometry(0.10, 0.004, 0.007);
  const right_section_legends = new THREE.InstancedMesh(
    right_legendGeom, gray_printMat, 8
  );
  right_section_legends.name = "right_section_legends";
  const rightLegendPositions = [
    [0.72, -0.64],
    [0.95, -0.64],
    [1.20, -0.64],
    [1.43, -0.64],
    [0.78, 0.18],
    [1.02, 0.22],
    [1.25, 0.28],
    [1.44, 0.62]
  ];
  for (let i = 0; i < rightLegendPositions.length; i++) {
    dummy.position.set(
      rightLegendPositions[i][0],
      panelY + 0.007,
      rightLegendPositions[i][1]
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(i % 3 === 0 ? 0.8 : 0.55, 1, 1);
    dummy.updateMatrix();
    right_section_legends.setMatrixAt(i, dummy.matrix);
  }
  right_section_legends.instanceMatrix.needsUpdate = true;
  print_group.add(right_section_legends);

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