export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "white_barn_with_red_roof";

  const white_woodMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0eb,
    metalness: 0.0,
    roughness: 0.9,
  });
  const white_trimMat = new THREE.MeshStandardMaterial({
    color: 0xf8f8f3,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wall_seamMat = new THREE.MeshStandardMaterial({
    color: 0xb8b9b4,
    metalness: 0.0,
    roughness: 0.9,
  });
  const red_roofMat = new THREE.MeshStandardMaterial({
    color: 0xc93438,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xe04a4d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_trimMat = new THREE.MeshStandardMaterial({
    color: 0xa92329,
    metalness: 0.0,
    roughness: 0.3,
  });
  const window_glassMat = new THREE.MeshStandardMaterial({
    color: 0x151918,
    metalness: 0.0,
    roughness: 0.3,
  });
  const foundationMat = new THREE.MeshStandardMaterial({
    color: 0xb89b72,
    metalness: 0.0,
    roughness: 0.9,
  });
  const door_knobMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const wallW = 1.0;
  const wallL = 1.45;
  const wallH = 0.72;
  const gableH = 0.58;
  const roofRun = 0.59;
  const roofRise = 0.60;
  const roofDepth = 1.68;
  const roofLen = Math.sqrt(roofRun * roofRun + roofRise * roofRise);
  const roofAngle = Math.atan2(roofRise, roofRun);

  const front_wallGeom = new THREE.BoxGeometry(wallW, wallH, 0.035);
  const front_wall = new THREE.Mesh(front_wallGeom, white_woodMat);
  front_wall.name = "front_wall";
  front_wall.position.set(0, wallH / 2, wallL / 2);
  root.add(front_wall);

  const rear_wallGeom = front_wallGeom;
  const rear_wall = new THREE.Mesh(rear_wallGeom, white_woodMat);
  rear_wall.name = "rear_wall";
  rear_wall.position.set(0, wallH / 2, -wallL / 2);
  root.add(rear_wall);

  const left_wallGeom = new THREE.BoxGeometry(0.035, wallH, wallL);
  const left_wall = new THREE.Mesh(left_wallGeom, white_woodMat);
  left_wall.name = "left_wall";
  left_wall.position.set(-wallW / 2, wallH / 2, 0);
  root.add(left_wall);

  const right_wallGeom = left_wallGeom;
  const right_wall = new THREE.Mesh(right_wallGeom, white_woodMat);
  right_wall.name = "right_wall";
  right_wall.position.set(wallW / 2, wallH / 2, 0);
  root.add(right_wall);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-wallW / 2, 0);
  gableShape.lineTo(wallW / 2, 0);
  gableShape.lineTo(0, gableH);
  gableShape.lineTo(-wallW / 2, 0);

  const front_gableGeom = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: false,
  });
  const front_gable = new THREE.Mesh(front_gableGeom, white_woodMat);
  front_gable.name = "front_gable";
  front_gable.position.set(0, wallH, wallL / 2);
  root.add(front_gable);

  const rear_gableGeom = front_gableGeom;
  const rear_gable = new THREE.Mesh(rear_gableGeom, white_woodMat);
  rear_gable.name = "rear_gable";
  rear_gable.position.set(0, wallH, -wallL / 2 - 0.035);
  root.add(rear_gable);

  const front_siding_seamsGeom = new THREE.BoxGeometry(0.006, 1, 0.008);
  const front_siding_seams = new THREE.InstancedMesh(
    front_siding_seamsGeom,
    wall_seamMat,
    13
  );
  front_siding_seams.name = "front_siding_seams";
  const frontSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    frontSeamDummy.position.set(
      -wallW / 2 + (i + 1) * wallW / 14,
      wallH / 2,
      wallL / 2 + 0.021
    );
    frontSeamDummy.scale.set(1, wallH - 0.02, 1);
    frontSeamDummy.updateMatrix();
    front_siding_seams.setMatrixAt(i, frontSeamDummy.matrix);
  }
  front_siding_seams.instanceMatrix.needsUpdate = true;
  root.add(front_siding_seams);

  const rear_siding_seamsGeom = front_siding_seamsGeom;
  const rear_siding_seams = new THREE.InstancedMesh(
    rear_siding_seamsGeom,
    wall_seamMat,
    13
  );
  rear_siding_seams.name = "rear_siding_seams";
  const rearSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    rearSeamDummy.position.set(
      -wallW / 2 + (i + 1) * wallW / 14,
      wallH / 2,
      -wallL / 2 - 0.021
    );
    rearSeamDummy.scale.set(1, wallH - 0.02, 1);
    rearSeamDummy.updateMatrix();
    rear_siding_seams.setMatrixAt(i, rearSeamDummy.matrix);
  }
  rear_siding_seams.instanceMatrix.needsUpdate = true;
  root.add(rear_siding_seams);

  const side_siding_seamsGeom = new THREE.BoxGeometry(0.008, 1, 0.006);
  const side_siding_seams = new THREE.InstancedMesh(
    side_siding_seamsGeom,
    wall_seamMat,
    32
  );
  side_siding_seams.name = "side_siding_seams";
  const sideSeamDummy = new THREE.Object3D();
  let sideSeamIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 16; i++) {
      sideSeamDummy.position.set(
        side * (wallW / 2 + 0.021),
        wallH / 2,
        -wallL / 2 + (i + 1) * wallL / 16
      );
      sideSeamDummy.scale.set(1, wallH - 0.02, 1);
      sideSeamDummy.updateMatrix();
      side_siding_seams.setMatrixAt(sideSeamIndex++, sideSeamDummy.matrix);
    }
  }
  side_siding_seams.instanceMatrix.needsUpdate = true;
  root.add(side_siding_seams);

  const front_gable_seamsGeom = new THREE.BoxGeometry(0.006, 1, 0.008);
  const front_gable_seams = new THREE.InstancedMesh(
    front_gable_seamsGeom,
    wall_seamMat,
    13
  );
  front_gable_seams.name = "front_gable_seams";
  const gableSeamDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    const x = -wallW / 2 + (i + 1) * wallW / 14;
    const seamH = gableH * (1 - Math.abs(x) / (wallW / 2));
    gableSeamDummy.position.set(
      x,
      wallH + seamH / 2,
      wallL / 2 + 0.039
    );
    gableSeamDummy.scale.set(1, seamH * 0.92, 1);
    gableSeamDummy.updateMatrix();
    front_gable_seams.setMatrixAt(i, gableSeamDummy.matrix);
  }
  front_gable_seams.instanceMatrix.needsUpdate = true;
  root.add(front_gable_seams);

  const front_gable_crossbeamGeom = new THREE.BoxGeometry(
    wallW + 0.025,
    0.035,
    0.025
  );
  const front_gable_crossbeam = new THREE.Mesh(
    front_gable_crossbeamGeom,
    white_trimMat
  );
  front_gable_crossbeam.name = "front_gable_crossbeam";
  front_gable_crossbeam.position.set(0, wallH, wallL / 2 + 0.045);
  root.add(front_gable_crossbeam);

  const front_eave_beamGeom = new THREE.BoxGeometry(
    wallW + 0.035,
    0.04,
    0.045
  );
  const front_eave_beam = new THREE.Mesh(front_eave_beamGeom, white_trimMat);
  front_eave_beam.name = "front_eave_beam";
  front_eave_beam.position.set(0, wallH - 0.025, wallL / 2 + 0.025);
  root.add(front_eave_beam);

  const rear_eave_beamGeom = front_eave_beamGeom;
  const rear_eave_beam = new THREE.Mesh(rear_eave_beamGeom, white_trimMat);
  rear_eave_beam.name = "rear_eave_beam";
  rear_eave_beam.position.set(0, wallH - 0.025, -wallL / 2 - 0.025);
  root.add(rear_eave_beam);

  const front_base_trimGeom = new THREE.BoxGeometry(
    wallW + 0.06,
    0.035,
    0.045
  );
  const front_base_trim = new THREE.Mesh(front_base_trimGeom, foundationMat);
  front_base_trim.name = "front_base_trim";
  front_base_trim.position.set(0, 0.018, wallL / 2 + 0.022);
  root.add(front_base_trim);

  const rear_base_trimGeom = front_base_trimGeom;
  const rear_base_trim = new THREE.Mesh(rear_base_trimGeom, foundationMat);
  rear_base_trim.name = "rear_base_trim";
  rear_base_trim.position.set(0, 0.018, -wallL / 2 - 0.022);
  root.add(rear_base_trim);

  const left_base_trimGeom = new THREE.BoxGeometry(0.045, 0.035, wallL);
  const left_base_trim = new THREE.Mesh(left_base_trimGeom, foundationMat);
  left_base_trim.name = "left_base_trim";
  left_base_trim.position.set(-wallW / 2 - 0.022, 0.018, 0);
  root.add(left_base_trim);

  const right_base_trimGeom = left_base_trimGeom;
  const right_base_trim = new THREE.Mesh(right_base_trimGeom, foundationMat);
  right_base_trim.name = "right_base_trim";
  right_base_trim.position.set(wallW / 2 + 0.022, 0.018, 0);
  root.add(right_base_trim);

  const roof_panelGeom = new THREE.BoxGeometry(
    roofLen,
    0.035,
    roofDepth
  );

  const left_roof_panel = new THREE.Mesh(roof_panelGeom, red_roofMat);
  left_roof_panel.name = "left_roof_panel";
  left_roof_panel.position.set(
    -roofRun / 2,
    wallH + roofRise / 2,
    0
  );
  left_roof_panel.rotation.z = roofAngle;
  root.add(left_roof_panel);

  const right_roof_panel = new THREE.Mesh(roof_panelGeom, red_roofMat);
  right_roof_panel.name = "right_roof_panel";
  right_roof_panel.position.set(
    roofRun / 2,
    wallH + roofRise / 2,
    0
  );
  right_roof_panel.rotation.z = -roofAngle;
  root.add(right_roof_panel);

  const roof_ribsGeom = new THREE.BoxGeometry(
    roofLen * 0.985,
    0.012,
    0.014
  );
  const roof_ribs = new THREE.InstancedMesh(
    roof_ribsGeom,
    red_highlightMat,
    36
  );
  roof_ribs.name = "roof_ribs";
  const ribDummy = new THREE.Object3D();
  const normalOffset = 0.024;
  let ribIndex = 0;
  for (const side of [-1, 1]) {
    const rotZ = side > 0 ? -roofAngle : roofAngle;
    const cosR = Math.cos(rotZ);
    const sinR = Math.sin(rotZ);
    const centerX = side * roofRun / 2;
    const centerY = wallH + roofRise / 2;
    const normalX = side * sinR;
    const normalY = cosR;
    for (let i = 0; i < 18; i++) {
      const z = -roofDepth / 2 + (i + 0.5) * roofDepth / 18;
      ribDummy.position.set(
        centerX + normalX * normalOffset,
        centerY + normalY * normalOffset,
        z
      );
      ribDummy.rotation.set(0, 0, rotZ);
      ribDummy.scale.set(1, 1, 1);
      ribDummy.updateMatrix();
      roof_ribs.setMatrixAt(ribIndex++, ribDummy.matrix);
    }
  }
  roof_ribs.instanceMatrix.needsUpdate = true;
  root.add(roof_ribs);

  const roof_ridge_capGeom = new THREE.BoxGeometry(
    0.07,
    0.055,
    roofDepth + 0.035
  );
  const roof_ridge_cap = new THREE.Mesh(roof_ridge_capGeom, red_trimMat);
  roof_ridge_cap.name = "roof_ridge_cap";
  roof_ridge_cap.position.set(0, wallH + roofRise + 0.018, 0);
  root.add(roof_ridge_cap);

  const eave_fasciaGeom = new THREE.BoxGeometry(
    0.055,
    0.055,
    roofDepth + 0.01
  );
  const left_eave_fascia = new THREE.Mesh(eave_fasciaGeom, red_trimMat);
  left_eave_fascia.name = "left_eave_fascia";
  left_eave_fascia.position.set(-roofRun, wallH, 0);
  root.add(left_eave_fascia);

  const right_eave_fascia = new THREE.Mesh(eave_fasciaGeom, red_trimMat);
  right_eave_fascia.name = "right_eave_fascia";
  right_eave_fascia.position.set(roofRun, wallH, 0);
  root.add(right_eave_fascia);

  const rakeGeom = new THREE.BoxGeometry(roofLen + 0.025, 0.05, 0.05);
  const frontRoofZ = roofDepth / 2 + 0.008;
  const rearRoofZ = -roofDepth / 2 - 0.008;

  const front_left_rake = new THREE.Mesh(rakeGeom, red_trimMat);
  front_left_rake.name = "front_left_rake";
  front_left_rake.position.set(
    -roofRun / 2,
    wallH + roofRise / 2,
    frontRoofZ
  );
  front_left_rake.rotation.z = roofAngle;
  root.add(front_left_rake);

  const front_right_rake = new THREE.Mesh(rakeGeom, red_trimMat);
  front_right_rake.name = "front_right_rake";
  front_right_rake.position.set(
    roofRun / 2,
    wallH + roofRise / 2,
    frontRoofZ
  );
  front_right_rake.rotation.z = -roofAngle;
  root.add(front_right_rake);

  const rear_left_rake = new THREE.Mesh(rakeGeom, red_trimMat);
  rear_left_rake.name = "rear_left_rake";
  rear_left_rake.position.set(
    -roofRun / 2,
    wallH + roofRise / 2,
    rearRoofZ
  );
  rear_left_rake.rotation.z = roofAngle;
  root.add(rear_left_rake);

  const rear_right_rake = new THREE.Mesh(rakeGeom, red_trimMat);
  rear_right_rake.name = "rear_right_rake";
  rear_right_rake.position.set(
    roofRun / 2,
    wallH + roofRise / 2,
    rearRoofZ
  );
  rear_right_rake.rotation.z = -roofAngle;
  root.add(rear_right_rake);

  const front_doorGeom = new THREE.BoxGeometry(0.31, 0.58, 0.025);
  const front_door = new THREE.Mesh(front_doorGeom, white_woodMat);
  front_door.name = "front_door";
  front_door.position.set(-0.16, 0.31, wallL / 2 + 0.047);
  root.add(front_door);

  const front_door_left_frameGeom = new THREE.BoxGeometry(
    0.035,
    0.64,
    0.035
  );
  const front_door_left_frame = new THREE.Mesh(
    front_door_left_frameGeom,
    white_trimMat
  );
  front_door_left_frame.name = "front_door_left_frame";
  front_door_left_frame.position.set(
    -0.327,
    0.32,
    wallL / 2 + 0.069
  );
  root.add(front_door_left_frame);

  const front_door_right_frameGeom = front_door_left_frameGeom;
  const front_door_right_frame = new THREE.Mesh(
    front_door_right_frameGeom,
    white_trimMat
  );
  front_door_right_frame.name = "front_door_right_frame";
  front_door_right_frame.position.set(
    0.007,
    0.32,
    wallL / 2 + 0.069
  );
  root.add(front_door_right_frame);

  const front_door_top_frameGeom = new THREE.BoxGeometry(
    0.37,
    0.04,
    0.035
  );
  const front_door_top_frame = new THREE.Mesh(
    front_door_top_frameGeom,
    white_trimMat
  );
  front_door_top_frame.name = "front_door_top_frame";
  front_door_top_frame.position.set(
    -0.16,
    0.635,
    wallL / 2 + 0.069
  );
  root.add(front_door_top_frame);

  const front_door_thresholdGeom = new THREE.BoxGeometry(
    0.34,
    0.025,
    0.04
  );
  const front_door_threshold = new THREE.Mesh(
    front_door_thresholdGeom,
    foundationMat
  );
  front_door_threshold.name = "front_door_threshold";
  front_door_threshold.position.set(
    -0.16,
    0.018,
    wallL / 2 + 0.066
  );
  root.add(front_door_threshold);

  const front_door_braceGeom = new THREE.BoxGeometry(
    0.026,
    0.48,
    0.022
  );
  const front_door_brace_left = new THREE.Mesh(
    front_door_braceGeom,
    white_trimMat
  );
  front_door_brace_left.name = "front_door_brace_left";
  front_door_brace_left.position.set(
    -0.16,
    0.31,
    wallL / 2 + 0.073
  );
  front_door_brace_left.rotation.z = 0.54;
  root.add(front_door_brace_left);

  const front_door_brace_right = new THREE.Mesh(
    front_door_braceGeom,
    white_trimMat
  );
  front_door_brace_right.name = "front_door_brace_right";
  front_door_brace_right.position.set(
    -0.16,
    0.31,
    wallL / 2 + 0.074
  );
  front_door_brace_right.rotation.z = -0.54;
  root.add(front_door_brace_right);

  const front_door_knobGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.018,
    16
  );
  const front_door_knob = new THREE.Mesh(
    front_door_knobGeom,
    door_knobMat
  );
  front_door_knob.name = "front_door_knob";
  front_door_knob.rotation.x = Math.PI / 2;
  front_door_knob.position.set(
    -0.035,
    0.30,
    wallL / 2 + 0.087
  );
  root.add(front_door_knob);

  const sideDoorX = wallW / 2 + 0.047;
  const sideDoorZ = 0.20;
  const sideDoorY = 0.32;

  const side_doorGeom = new THREE.BoxGeometry(0.025, 0.58, 0.30);
  const side_door = new THREE.Mesh(side_doorGeom, white_woodMat);
  side_door.name = "side_door";
  side_door.position.set(sideDoorX, sideDoorY, sideDoorZ);
  root.add(side_door);

  const side_door_front_frameGeom = new THREE.BoxGeometry(
    0.035,
    0.64,
    0.035
  );
  const side_door_front_frame = new THREE.Mesh(
    side_door_front_frameGeom,
    white_trimMat
  );
  side_door_front_frame.name = "side_door_front_frame";
  side_door_front_frame.position.set(
    sideDoorX + 0.018,
    0.32,
    sideDoorZ + 0.168
  );
  root.add(side_door_front_frame);

  const side_door_rear_frameGeom = side_door_front_frameGeom;
  const side_door_rear_frame = new THREE.Mesh(
    side_door_rear_frameGeom,
    white_trimMat
  );
  side_door_rear_frame.name = "side_door_rear_frame";
  side_door_rear_frame.position.set(
    sideDoorX + 0.018,
    0.32,
    sideDoorZ - 0.168
  );
  root.add(side_door_rear_frame);

  const side_door_top_frameGeom = new THREE.BoxGeometry(
    0.035,
    0.04,
    0.37
  );
  const side_door_top_frame = new THREE.Mesh(
    side_door_top_frameGeom,
    white_trimMat
  );
  side_door_top_frame.name = "side_door_top_frame";
  side_door_top_frame.position.set(
    sideDoorX + 0.018,
    0.635,
    sideDoorZ
  );
  root.add(side_door_top_frame);

  const side_door_thresholdGeom = new THREE.BoxGeometry(
    0.04,
    0.025,
    0.34
  );
  const side_door_threshold = new THREE.Mesh(
    side_door_thresholdGeom,
    foundationMat
  );
  side_door_threshold.name = "side_door_threshold";
  side_door_threshold.position.set(
    sideDoorX + 0.015,
    0.018,
    sideDoorZ
  );
  root.add(side_door_threshold);

  const side_door_windowGeom = new THREE.BoxGeometry(
    0.014,
    0.075,
    0.075
  );
  const side_door_window = new THREE.Mesh(
    side_door_windowGeom,
    window_glassMat
  );
  side_door_window.name = "side_door_window";
  side_door_window.position.set(
    sideDoorX + 0.032,
    0.515,
    sideDoorZ + 0.075
  );
  root.add(side_door_window);

  const side_door_window_vertical_frameGeom = new THREE.BoxGeometry(
    0.018,
    0.11,
    0.018
  );
  const side_door_window_front_frame = new THREE.Mesh(
    side_door_window_vertical_frameGeom,
    white_trimMat
  );
  side_door_window_front_frame.name = "side_door_window_front_frame";
  side_door_window_front_frame.position.set(
    sideDoorX + 0.041,
    0.515,
    sideDoorZ + 0.126
  );
  root.add(side_door_window_front_frame);

  const side_door_window_rear_frame = new THREE.Mesh(
    side_door_window_vertical_frameGeom,
    white_trimMat
  );
  side_door_window_rear_frame.name = "side_door_window_rear_frame";
  side_door_window_rear_frame.position.set(
    sideDoorX + 0.041,
    0.515,
    sideDoorZ + 0.024
  );
  root.add(side_door_window_rear_frame);

  const side_door_window_horizontal_frameGeom = new THREE.BoxGeometry(
    0.018,
    0.018,
    0.12
  );
  const side_door_window_top_frame = new THREE.Mesh(
    side_door_window_horizontal_frameGeom,
    white_trimMat
  );
  side_door_window_top_frame.name = "side_door_window_top_frame";
  side_door_window_top_frame.position.set(
    sideDoorX + 0.041,
    0.565,
    sideDoorZ + 0.075
  );
  root.add(side_door_window_top_frame);

  const side_door_window_bottom_frame = new THREE.Mesh(
    side_door_window_horizontal_frameGeom,
    white_trimMat
  );
  side_door_window_bottom_frame.name = "side_door_window_bottom_frame";
  side_door_window_bottom_frame.position.set(
    sideDoorX + 0.041,
    0.465,
    sideDoorZ + 0.075
  );
  root.add(side_door_window_bottom_frame);

  const side_door_knobGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.018,
    16
  );
  const side_door_knob = new THREE.Mesh(side_door_knobGeom, door_knobMat);
  side_door_knob.name = "side_door_knob";
  side_door_knob.rotation.z = -Math.PI / 2;
  side_door_knob.position.set(
    sideDoorX + 0.052,
    0.31,
    sideDoorZ - 0.115
  );
  root.add(side_door_knob);

  const frontWindowX = 0.255;
  const frontWindowY = 0.43;
  const frontWindowZ = wallL / 2 + 0.047;

  const front_window_glassGeom = new THREE.BoxGeometry(
    0.19,
    0.25,
    0.014
  );
  const front_window_glass = new THREE.Mesh(
    front_window_glassGeom,
    window_glassMat
  );
  front_window_glass.name = "front_window_glass";
  front_window_glass.position.set(
    frontWindowX,
    frontWindowY,
    frontWindowZ
  );
  root.add(front_window_glass);

  const front_window_vertical_frameGeom = new THREE.BoxGeometry(
    0.032,
    0.31,
    0.028
  );
  const front_window_left_frame = new THREE.Mesh(
    front_window_vertical_frameGeom,
    white_trimMat
  );
  front_window_left_frame.name = "front_window_left_frame";
  front_window_left_frame.position.set(
    frontWindowX - 0.115,
    frontWindowY,
    frontWindowZ + 0.015
  );
  root.add(front_window_left_frame);

  const front_window_right_frame = new THREE.Mesh(
    front_window_vertical_frameGeom,
    white_trimMat
  );
  front_window_right_frame.name = "front_window_right_frame";
  front_window_right_frame.position.set(
    frontWindowX + 0.115,
    frontWindowY,
    frontWindowZ + 0.015
  );
  root.add(front_window_right_frame);

  const front_window_horizontal_frameGeom = new THREE.BoxGeometry(
    0.26,
    0.032,
    0.028
  );
  const front_window_top_frame = new THREE.Mesh(
    front_window_horizontal_frameGeom,
    white_trimMat
  );
  front_window_top_frame.name = "front_window_top_frame";
  front_window_top_frame.position.set(
    frontWindowX,
    frontWindowY + 0.155,
    frontWindowZ + 0.015
  );
  root.add(front_window_top_frame);

  const front_window_bottom_frame = new THREE.Mesh(
    front_window_horizontal_frameGeom,
    white_trimMat
  );
  front_window_bottom_frame.name = "front_window_bottom_frame";
  front_window_bottom_frame.position.set(
    frontWindowX,
    frontWindowY - 0.155,
    frontWindowZ + 0.015
  );
  root.add(front_window_bottom_frame);

  const front_window_vertical_mullionGeom = new THREE.BoxGeometry(
    0.022,
    0.25,
    0.025
  );
  const front_window_vertical_mullion = new THREE.Mesh(
    front_window_vertical_mullionGeom,
    white_trimMat
  );
  front_window_vertical_mullion.name = "front_window_vertical_mullion";
  front_window_vertical_mullion.position.set(
    frontWindowX,
    frontWindowY,
    frontWindowZ + 0.022
  );
  root.add(front_window_vertical_mullion);

  const front_window_horizontal_mullionGeom = new THREE.BoxGeometry(
    0.19,
    0.022,
    0.025
  );
  const front_window_horizontal_mullion = new THREE.Mesh(
    front_window_horizontal_mullionGeom,
    white_trimMat
  );
  front_window_horizontal_mullion.name = "front_window_horizontal_mullion";
  front_window_horizontal_mullion.position.set(
    frontWindowX,
    frontWindowY,
    frontWindowZ + 0.023
  );
  root.add(front_window_horizontal_mullion);

  const sideWindowX = wallW / 2 + 0.047;
  const sideWindowY = 0.43;
  const sideWindowZ = -0.34;

  const side_window_glassGeom = new THREE.BoxGeometry(
    0.014,
    0.25,
    0.19
  );
  const side_window_glass = new THREE.Mesh(
    side_window_glassGeom,
    window_glassMat
  );
  side_window_glass.name = "side_window_glass";
  side_window_glass.position.set(
    sideWindowX,
    sideWindowY,
    sideWindowZ
  );
  root.add(side_window_glass);

  const side_window_vertical_frameGeom = new THREE.BoxGeometry(
    0.028,
    0.31,
    0.032
  );
  const side_window_front_frame = new THREE.Mesh(
    side_window_vertical_frameGeom,
    white_trimMat
  );
  side_window_front_frame.name = "side_window_front_frame";
  side_window_front_frame.position.set(
    sideWindowX + 0.015,
    sideWindowY,
    sideWindowZ + 0.115
  );
  root.add(side_window_front_frame);

  const side_window_rear_frame = new THREE.Mesh(
    side_window_vertical_frameGeom,
    white_trimMat
  );
  side_window_rear_frame.name = "side_window_rear_frame";
  side_window_rear_frame.position.set(
    sideWindowX + 0.015,
    sideWindowY,
    sideWindowZ - 0.115
  );
  root.add(side_window_rear_frame);

  const side_window_horizontal_frameGeom = new THREE.BoxGeometry(
    0.028,
    0.032,
    0.26
  );
  const side_window_top_frame = new THREE.Mesh(
    side_window_horizontal_frameGeom,
    white_trimMat
  );
  side_window_top_frame.name = "side_window_top_frame";
  side_window_top_frame.position.set(
    sideWindowX + 0.015,
    sideWindowY + 0.155,
    sideWindowZ
  );
  root.add(side_window_top_frame);

  const side_window_bottom_frame = new THREE.Mesh(
    side_window_horizontal_frameGeom,
    white_trimMat
  );
  side_window_bottom_frame.name = "side_window_bottom_frame";
  side_window_bottom_frame.position.set(
    sideWindowX + 0.015,
    sideWindowY - 0.155,
    sideWindowZ
  );
  root.add(side_window_bottom_frame);

  const side_window_vertical_mullionGeom = new THREE.BoxGeometry(
    0.025,
    0.25,
    0.022
  );
  const side_window_vertical_mullion = new THREE.Mesh(
    side_window_vertical_mullionGeom,
    white_trimMat
  );
  side_window_vertical_mullion.name = "side_window_vertical_mullion";
  side_window_vertical_mullion.position.set(
    sideWindowX + 0.023,
    sideWindowY,
    sideWindowZ
  );
  root.add(side_window_vertical_mullion);

  const side_window_horizontal_mullionGeom = new THREE.BoxGeometry(
    0.025,
    0.022,
    0.19
  );
  const side_window_horizontal_mullion = new THREE.Mesh(
    side_window_horizontal_mullionGeom,
    white_trimMat
  );
  side_window_horizontal_mullion.name = "side_window_horizontal_mullion";
  side_window_horizontal_mullion.position.set(
    sideWindowX + 0.023,
    sideWindowY,
    sideWindowZ
  );
  root.add(side_window_horizontal_mullion);

  const loftWindowY = 1.075;
  const loftWindowZ = 0.10;

  const loft_window_glassGeom = new THREE.BoxGeometry(
    0.14,
    0.18,
    0.014
  );
  const loft_window_glass = new THREE.Mesh(
    loft_window_glassGeom,
    window_glassMat
  );
  loft_window_glass.name = "loft_window_glass";
  loft_window_glass.position.set(
    0,
    loftWindowY,
    wallL / 2 + 0.057
  );
  root.add(loft_window_glass);

  const loft_window_vertical_frameGeom = new THREE.BoxGeometry(
    0.028,
    0.235,
    0.027
  );
  const loft_window_left_frame = new THREE.Mesh(
    loft_window_vertical_frameGeom,
    white_trimMat
  );
  loft_window_left_frame.name = "loft_window_left_frame";
  loft_window_left_frame.position.set(
    -0.088,
    loftWindowY,
    wallL / 2 + 0.071
  );
  root.add(loft_window_left_frame);

  const loft_window_right_frame = new THREE.Mesh(
    loft_window_vertical_frameGeom,
    white_trimMat
  );
  loft_window_right_frame.name = "loft_window_right_frame";
  loft_window_right_frame.position.set(
    0.088,
    loftWindowY,
    wallL / 2 + 0.071
  );
  root.add(loft_window_right_frame);

  const loft_window_horizontal_frameGeom = new THREE.BoxGeometry(
    0.205,
    0.028,
    0.027
  );
  const loft_window_top_frame = new THREE.Mesh(
    loft_window_horizontal_frameGeom,
    white_trimMat
  );
  loft_window_top_frame.name = "loft_window_top_frame";
  loft_window_top_frame.position.set(
    0,
    loftWindowY + 0.112,
    wallL / 2 + 0.071
  );
  root.add(loft_window_top_frame);

  const loft_window_bottom_frame = new THREE.Mesh(
    loft_window_horizontal_frameGeom,
    white_trimMat
  );
  loft_window_bottom_frame.name = "loft_window_bottom_frame";
  loft_window_bottom_frame.position.set(
    0,
    loftWindowY - 0.112,
    wallL / 2 + 0.071
  );
  root.add(loft_window_bottom_frame);

  const loft_window_vertical_mullionGeom = new THREE.BoxGeometry(
    0.018,
    0.18,
    0.024
  );
  const loft_window_vertical_mullion = new THREE.Mesh(
    loft_window_vertical_mullionGeom,
    white_trimMat
  );
  loft_window_vertical_mullion.name = "loft_window_vertical_mullion";
  loft_window_vertical_mullion.position.set(
    0,
    loftWindowY,
    wallL / 2 + 0.078
  );
  root.add(loft_window_vertical_mullion);

  const loft_window_horizontal_mullionGeom = new THREE.BoxGeometry(
    0.14,
    0.018,
    0.024
  );
  const loft_window_horizontal_mullion = new THREE.Mesh(
    loft_window_horizontal_mullionGeom,
    white_trimMat
  );
  loft_window_horizontal_mullion.name = "loft_window_horizontal_mullion";
  loft_window_horizontal_mullion.position.set(
    0,
    loftWindowY,
    wallL / 2 + 0.079
  );
  root.add(loft_window_horizontal_mullion);

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