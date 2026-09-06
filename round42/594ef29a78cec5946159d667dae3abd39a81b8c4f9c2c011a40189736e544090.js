export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_table_radio";

  const cabinetW = 1.56;
  const cabinetH = 0.94;
  const cabinetD = 0.52;
  const cabinetY = 0.59;
  const cabinetFrontZ = 0.275;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x986036,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x56331f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8,
  });
  const redLedMat = new THREE.MeshStandardMaterial({
    color: 0xff1838,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff1838,
    emissiveIntensity: 1.0,
  });
  const grainLineMat = new THREE.LineBasicMaterial({
    color: 0x4c2c1b,
    transparent: true,
    opacity: 0.34,
  });
  const brushLineMat = new THREE.LineBasicMaterial({
    color: 0x6f7371,
    transparent: true,
    opacity: 0.16,
  });

  function makeRoundedRectShape(width, height, radius) {
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
    shape.closePath();
    return shape;
  }

  function makeRoundedRectGeom(width, height, radius, depth, bevel) {
    const geom = new THREE.ExtrudeGeometry(
      makeRoundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function makeKnob(name, radius, depth, ridgeCount) {
    const knob = new THREE.Group();
    knob.name = name;

    const collarGeom = new THREE.CylinderGeometry(
      radius * 1.04,
      radius * 1.04,
      0.014,
      32
    );
    const collar = new THREE.Mesh(collarGeom, darkMat);
    collar.name = name + "_collar";
    collar.rotation.x = Math.PI / 2;
    collar.position.z = 0.007;
    knob.add(collar);

    const bodyGeom = new THREE.CylinderGeometry(
      radius * 0.91,
      radius,
      depth,
      32
    );
    const body = new THREE.Mesh(bodyGeom, silverMat);
    body.name = name + "_body";
    body.rotation.x = Math.PI / 2;
    body.position.z = 0.014 + depth / 2;
    knob.add(body);

    const faceGeom = new THREE.CylinderGeometry(
      radius * 0.82,
      radius * 0.84,
      0.009,
      32
    );
    const face = new THREE.Mesh(faceGeom, polishedMetalMat);
    face.name = name + "_face";
    face.rotation.x = Math.PI / 2;
    face.position.z = 0.018 + depth;
    knob.add(face);

    const ridgeGeom = new THREE.BoxGeometry(
      radius * 0.13,
      radius * 0.10,
      depth * 0.78
    );
    const ridges = new THREE.InstancedMesh(
      ridgeGeom,
      brushedMetalMat,
      ridgeCount
    );
    ridges.name = name + "_ridges";
    const ridgeDummy = new THREE.Object3D();

    for (let i = 0; i < ridgeCount; i++) {
      const angle = (i / ridgeCount) * Math.PI * 2;
      ridgeDummy.position.set(
        Math.cos(angle) * radius * 0.96,
        Math.sin(angle) * radius * 0.96,
        0.016 + depth * 0.5
      );
      ridgeDummy.rotation.set(0, 0, angle);
      ridgeDummy.updateMatrix();
      ridges.setMatrixAt(i, ridgeDummy.matrix);
    }
    ridges.instanceMatrix.needsUpdate = true;
    knob.add(ridges);

    return knob;
  }

  const cabinet_bodyGeom = makeRoundedRectGeom(
    cabinetW,
    cabinetH,
    0.075,
    cabinetD,
    0.018
  );
  const cabinet_body = new THREE.Mesh(cabinet_bodyGeom, woodMat);
  cabinet_body.name = "cabinet_body";
  cabinet_body.position.set(0, cabinetY, 0);
  root.add(cabinet_body);

  const cabinet_baseGeom = makeRoundedRectGeom(
    1.68,
    0.13,
    0.045,
    0.59,
    0.012
  );
  const cabinet_base = new THREE.Mesh(cabinet_baseGeom, woodMat);
  cabinet_base.name = "cabinet_base";
  cabinet_base.position.set(0, 0.075, 0.015);
  root.add(cabinet_base);

  const base_front_railGeom = makeRoundedRectGeom(
    1.64,
    0.095,
    0.03,
    0.065,
    0.007
  );
  const base_front_rail = new THREE.Mesh(base_front_railGeom, woodMat);
  base_front_rail.name = "base_front_rail";
  base_front_rail.position.set(0, 0.105, 0.315);
  root.add(base_front_rail);

  const base_bottom_stripGeom = new THREE.BoxGeometry(1.54, 0.018, 0.025);
  const base_bottom_strip = new THREE.Mesh(base_bottom_stripGeom, darkWoodMat);
  base_bottom_strip.name = "base_bottom_strip";
  base_bottom_strip.position.set(0, 0.035, 0.337);
  root.add(base_bottom_strip);

  const cabinet_feetGeom = new THREE.BoxGeometry(0.12, 0.025, 0.10);
  const cabinet_feet = new THREE.InstancedMesh(
    cabinet_feetGeom,
    rubberMat,
    4
  );
  cabinet_feet.name = "cabinet_feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-0.62, -0.002, 0.19],
    [0.62, -0.002, 0.19],
    [-0.62, -0.002, -0.19],
    [0.62, -0.002, -0.19],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    footDummy.rotation.set(0, 0, 0);
    footDummy.updateMatrix();
    cabinet_feet.setMatrixAt(i, footDummy.matrix);
  }
  cabinet_feet.instanceMatrix.needsUpdate = true;
  root.add(cabinet_feet);

  const front_wood_top_trimGeom = new THREE.BoxGeometry(1.43, 0.055, 0.055);
  const front_wood_top_trim = new THREE.Mesh(
    front_wood_top_trimGeom,
    woodMat
  );
  front_wood_top_trim.name = "front_wood_top_trim";
  front_wood_top_trim.position.set(0, 1.025, 0.295);
  root.add(front_wood_top_trim);

  const front_wood_bottom_trimGeom = new THREE.BoxGeometry(
    1.43,
    0.07,
    0.055
  );
  const front_wood_bottom_trim = new THREE.Mesh(
    front_wood_bottom_trimGeom,
    woodMat
  );
  front_wood_bottom_trim.name = "front_wood_bottom_trim";
  front_wood_bottom_trim.position.set(0, 0.155, 0.295);
  root.add(front_wood_bottom_trim);

  const front_wood_side_trimGeom = new THREE.BoxGeometry(
    0.075,
    0.82,
    0.055
  );
  const front_wood_left_trim = new THREE.Mesh(
    front_wood_side_trimGeom,
    woodMat
  );
  front_wood_left_trim.name = "front_wood_left_trim";
  front_wood_left_trim.position.set(-0.72, 0.59, 0.295);
  root.add(front_wood_left_trim);

  const front_wood_right_trim = new THREE.Mesh(
    front_wood_side_trimGeom,
    woodMat
  );
  front_wood_right_trim.name = "front_wood_right_trim";
  front_wood_right_trim.position.set(0.72, 0.59, 0.295);
  root.add(front_wood_right_trim);

  const front_panel_gasketGeom = makeRoundedRectGeom(
    1.405,
    0.825,
    0.065,
    0.018,
    0.003
  );
  const front_panel_gasket = new THREE.Mesh(front_panel_gasketGeom, darkMat);
  front_panel_gasket.name = "front_panel_gasket";
  front_panel_gasket.position.set(0, 0.59, 0.314);
  root.add(front_panel_gasket);

  const front_chrome_frameGeom = makeRoundedRectGeom(
    1.375,
    0.795,
    0.06,
    0.016,
    0.004
  );
  const front_chrome_frame = new THREE.Mesh(
    front_chrome_frameGeom,
    polishedMetalMat
  );
  front_chrome_frame.name = "front_chrome_frame";
  front_chrome_frame.position.set(0, 0.59, 0.326);
  root.add(front_chrome_frame);

  const front_panelGeom = makeRoundedRectGeom(
    1.31,
    0.725,
    0.045,
    0.012,
    0.002
  );
  const front_panel = new THREE.Mesh(front_panelGeom, silverMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, 0.59, 0.338);
  root.add(front_panel);

  const lower_control_panelGeom = makeRoundedRectGeom(
    1.275,
    0.325,
    0.018,
    0.008,
    0.0015
  );
  const lower_control_panel = new THREE.Mesh(
    lower_control_panelGeom,
    brushedMetalMat
  );
  lower_control_panel.name = "lower_control_panel";
  lower_control_panel.position.set(0, 0.375, 0.348);
  root.add(lower_control_panel);

  const panel_dividerGeom = new THREE.BoxGeometry(1.265, 0.006, 0.005);
  const panel_divider = new THREE.Mesh(panel_dividerGeom, darkMat);
  panel_divider.name = "panel_divider";
  panel_divider.position.set(0, 0.542, 0.355);
  root.add(panel_divider);

  const speaker_recessGeom = makeRoundedRectGeom(
    0.61,
    0.335,
    0.012,
    0.007,
    0.001
  );
  const speaker_recess = new THREE.Mesh(speaker_recessGeom, darkMat);
  speaker_recess.name = "speaker_recess";
  speaker_recess.position.set(0.35, 0.748, 0.351);
  root.add(speaker_recess);

  const speaker_horizontal_slatsGeom = new THREE.BoxGeometry(
    0.575,
    0.015,
    0.008
  );
  const speaker_horizontal_slats = new THREE.InstancedMesh(
    speaker_horizontal_slatsGeom,
    brushedMetalMat,
    10
  );
  speaker_horizontal_slats.name = "speaker_horizontal_slats";
  const horizontalDummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    horizontalDummy.position.set(0.35, 0.602 + i * 0.032, 0.358);
    horizontalDummy.rotation.set(0, 0, 0);
    horizontalDummy.updateMatrix();
    speaker_horizontal_slats.setMatrixAt(i, horizontalDummy.matrix);
  }
  speaker_horizontal_slats.instanceMatrix.needsUpdate = true;
  root.add(speaker_horizontal_slats);

  const speaker_vertical_dividersGeom = new THREE.BoxGeometry(
    0.018,
    0.318,
    0.009
  );
  const speaker_vertical_dividers = new THREE.InstancedMesh(
    speaker_vertical_dividersGeom,
    brushedMetalMat,
    3
  );
  speaker_vertical_dividers.name = "speaker_vertical_dividers";
  const verticalDummy = new THREE.Object3D();
  const dividerXs = [0.065, 0.35, 0.635];
  for (let i = 0; i < dividerXs.length; i++) {
    verticalDummy.position.set(dividerXs[i], 0.748, 0.359);
    verticalDummy.rotation.set(0, 0, 0);
    verticalDummy.updateMatrix();
    speaker_vertical_dividers.setMatrixAt(i, verticalDummy.matrix);
  }
  speaker_vertical_dividers.instanceMatrix.needsUpdate = true;
  root.add(speaker_vertical_dividers);

  const indicator_bezelGeom = makeRoundedRectGeom(
    0.086,
    0.043,
    0.009,
    0.01,
    0.002
  );
  const indicator_bezel = new THREE.Mesh(indicator_bezelGeom, darkMat);
  indicator_bezel.name = "indicator_bezel";
  indicator_bezel.position.set(0.105, 0.846, 0.359);
  root.add(indicator_bezel);

  const indicator_lensGeom = makeRoundedRectGeom(
    0.055,
    0.025,
    0.006,
    0.008,
    0.001
  );
  const indicator_lens = new THREE.Mesh(indicator_lensGeom, redLedMat);
  indicator_lens.name = "indicator_lens";
  indicator_lens.position.set(0.105, 0.846, 0.367);
  root.add(indicator_lens);

  const brand_badge = new THREE.Group();
  brand_badge.name = "brand_badge";
  brand_badge.position.set(-0.075, 0.842, 0.357);
  const brandBarGeom = new THREE.BoxGeometry(0.007, 0.034, 0.005);
  const brandBars = [
    [-0.038, 0, 1.0, 0],
    [-0.024, 0, 0.7, 0],
    [-0.010, 0, 1.0, 0],
    [0.004, 0, 1.0, 0],
    [0.018, 0, 0.7, 0],
    [0.032, 0, 1.0, 0],
  ];
  for (let i = 0; i < brandBars.length; i++) {
    const spec = brandBars[i];
    const bar = new THREE.Mesh(brandBarGeom, darkMat);
    bar.position.set(spec[0], spec[1], 0);
    bar.scale.y = spec[2];
    bar.rotation.z = spec[3];
    brand_badge.add(bar);
  }
  root.add(brand_badge);

  const tuning_scale_backGeom = makeRoundedRectGeom(
    0.61,
    0.027,
    0.006,
    0.006,
    0.001
  );
  const tuning_scale_back = new THREE.Mesh(tuning_scale_backGeom, darkMat);
  tuning_scale_back.name = "tuning_scale_back";
  tuning_scale_back.position.set(0.285, 0.505, 0.356);
  root.add(tuning_scale_back);

  const tuning_scale_ticksGeom = new THREE.BoxGeometry(
    0.003,
    0.014,
    0.004
  );
  const tuning_scale_ticks = new THREE.InstancedMesh(
    tuning_scale_ticksGeom,
    silverMat,
    13
  );
  tuning_scale_ticks.name = "tuning_scale_ticks";
  const tuningTickDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    tuningTickDummy.position.set(-0.005 + i * 0.046, 0.505, 0.361);
    tuningTickDummy.rotation.set(0, 0, 0);
    tuningTickDummy.updateMatrix();
    tuning_scale_ticks.setMatrixAt(i, tuningTickDummy.matrix);
  }
  tuning_scale_ticks.instanceMatrix.needsUpdate = true;
  root.add(tuning_scale_ticks);

  const left_knob = makeKnob("left_knob", 0.105, 0.055, 28);
  left_knob.position.set(-0.31, 0.315, 0.354);
  root.add(left_knob);

  const left_knob_markerGeom = new THREE.BoxGeometry(
    0.007,
    0.035,
    0.005
  );
  const left_knob_marker = new THREE.Mesh(left_knob_markerGeom, darkMat);
  left_knob_marker.name = "left_knob_marker";
  left_knob_marker.position.set(0, 0.047, 0.078);
  left_knob.add(left_knob_marker);

  const left_dial_ticksGeom = new THREE.BoxGeometry(
    0.004,
    0.018,
    0.004
  );
  const left_dial_ticks = new THREE.InstancedMesh(
    left_dial_ticksGeom,
    darkMat,
    11
  );
  left_dial_ticks.name = "left_dial_ticks";
  const leftTickDummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    const angle = Math.PI * 1.25 - (i / 10) * Math.PI * 1.5;
    leftTickDummy.position.set(
      -0.31 + Math.cos(angle) * 0.142,
      0.315 + Math.sin(angle) * 0.142,
      0.357
    );
    leftTickDummy.rotation.set(0, 0, angle - Math.PI / 2);
    leftTickDummy.updateMatrix();
    left_dial_ticks.setMatrixAt(i, leftTickDummy.matrix);
  }
  left_dial_ticks.instanceMatrix.needsUpdate = true;
  root.add(left_dial_ticks);

  const center_knob = makeKnob("center_knob", 0.075, 0.045, 22);
  center_knob.position.set(0.10, 0.335, 0.354);
  root.add(center_knob);

  const center_knob_markerGeom = new THREE.BoxGeometry(
    0.006,
    0.027,
    0.005
  );
  const center_knob_marker = new THREE.Mesh(
    center_knob_markerGeom,
    darkMat
  );
  center_knob_marker.name = "center_knob_marker";
  center_knob_marker.position.set(0, 0.034, 0.067);
  center_knob.add(center_knob_marker);

  const center_dial_ticksGeom = new THREE.BoxGeometry(
    0.003,
    0.013,
    0.004
  );
  const center_dial_ticks = new THREE.InstancedMesh(
    center_dial_ticksGeom,
    darkMat,
    7
  );
  center_dial_ticks.name = "center_dial_ticks";
  const centerTickDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    const angle = Math.PI * 1.25 - (i / 6) * Math.PI * 0.75;
    centerTickDummy.position.set(
      0.10 + Math.cos(angle) * 0.102,
      0.335 + Math.sin(angle) * 0.102,
      0.357
    );
    centerTickDummy.rotation.set(0, 0, angle - Math.PI / 2);
    centerTickDummy.updateMatrix();
    center_dial_ticks.setMatrixAt(i, centerTickDummy.matrix);
  }
  center_dial_ticks.instanceMatrix.needsUpdate = true;
  root.add(center_dial_ticks);

  const right_knob = makeKnob("right_knob", 0.098, 0.058, 28);
  right_knob.position.set(0.51, 0.36, 0.354);
  root.add(right_knob);

  const right_knob_markerGeom = new THREE.BoxGeometry(
    0.007,
    0.032,
    0.005
  );
  const right_knob_marker = new THREE.Mesh(
    right_knob_markerGeom,
    darkMat
  );
  right_knob_marker.name = "right_knob_marker";
  right_knob_marker.position.set(0, 0.044, 0.081);
  right_knob.add(right_knob_marker);

  const right_dial_ticksGeom = new THREE.BoxGeometry(
    0.0035,
    0.016,
    0.004
  );
  const right_dial_ticks = new THREE.InstancedMesh(
    right_dial_ticksGeom,
    darkMat,
    10
  );
  right_dial_ticks.name = "right_dial_ticks";
  const rightTickDummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI * 1.25 - (i / 9) * Math.PI * 1.15;
    rightTickDummy.position.set(
      0.51 + Math.cos(angle) * 0.132,
      0.36 + Math.sin(angle) * 0.132,
      0.357
    );
    rightTickDummy.rotation.set(0, 0, angle - Math.PI / 2);
    rightTickDummy.updateMatrix();
    right_dial_ticks.setMatrixAt(i, rightTickDummy.matrix);
  }
  right_dial_ticks.instanceMatrix.needsUpdate = true;
  root.add(right_dial_ticks);

  const power_switchGeom = makeRoundedRectGeom(
    0.09,
    0.09,
    0.012,
    0.028,
    0.004
  );
  const power_switch = new THREE.Mesh(power_switchGeom, darkMat);
  power_switch.name = "power_switch";
  power_switch.position.set(0.32, 0.32, 0.372);
  root.add(power_switch);

  const power_symbol_ringGeom = new THREE.TorusGeometry(
    0.018,
    0.003,
    8,
    24,
    Math.PI * 1.65
  );
  const power_symbol_ring = new THREE.Mesh(
    power_symbol_ringGeom,
    silverMat
  );
  power_symbol_ring.name = "power_symbol_ring";
  power_symbol_ring.position.z = 0.022;
  power_symbol_ring.rotation.z = Math.PI * 0.675;
  power_switch.add(power_symbol_ring);

  const power_symbol_barGeom = new THREE.BoxGeometry(
    0.005,
    0.022,
    0.004
  );
  const power_symbol_bar = new THREE.Mesh(
    power_symbol_barGeom,
    silverMat
  );
  power_symbol_bar.name = "power_symbol_bar";
  power_symbol_bar.position.set(0, 0.012, 0.023);
  power_switch.add(power_symbol_bar);

  const small_control_buttonGeom = new THREE.CylinderGeometry(
    0.028,
    0.028,
    0.025,
    20
  );
  const small_control_button = new THREE.Mesh(
    small_control_buttonGeom,
    silverMat
  );
  small_control_button.name = "small_control_button";
  small_control_button.rotation.x = Math.PI / 2;
  small_control_button.position.set(-0.57, 0.325, 0.367);
  root.add(small_control_button);

  const small_control_button_faceGeom = new THREE.CylinderGeometry(
    0.019,
    0.021,
    0.008,
    20
  );
  const small_control_button_face = new THREE.Mesh(
    small_control_button_faceGeom,
    polishedMetalMat
  );
  small_control_button_face.name = "small_control_button_face";
  small_control_button_face.rotation.x = Math.PI / 2;
  small_control_button_face.position.set(-0.57, 0.325, 0.383);
  root.add(small_control_button_face);

  const accessory_socketGeom = makeRoundedRectGeom(
    0.075,
    0.046,
    0.008,
    0.012,
    0.002
  );
  const accessory_socket = new THREE.Mesh(accessory_socketGeom, darkMat);
  accessory_socket.name = "accessory_socket";
  accessory_socket.position.set(-0.57, 0.245, 0.361);
  root.add(accessory_socket);

  const accessory_socket_innerGeom = new THREE.BoxGeometry(
    0.052,
    0.019,
    0.006
  );
  const accessory_socket_inner = new THREE.Mesh(
    accessory_socket_innerGeom,
    rubberMat
  );
  accessory_socket_inner.name = "accessory_socket_inner";
  accessory_socket_inner.position.set(-0.57, 0.245, 0.369);
  root.add(accessory_socket_inner);

  const lower_label_ticksGeom = new THREE.BoxGeometry(
    0.012,
    0.004,
    0.004
  );
  const lower_label_ticks = new THREE.InstancedMesh(
    lower_label_ticksGeom,
    darkMat,
    18
  );
  lower_label_ticks.name = "lower_label_ticks";
  const labelDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 9);
    const column = i % 9;
    labelDummy.position.set(
      0.245 + column * 0.028,
      0.205 - row * 0.018,
      0.357
    );
    labelDummy.rotation.set(0, 0, 0);
    labelDummy.updateMatrix();
    lower_label_ticks.setMatrixAt(i, labelDummy.matrix);
  }
  lower_label_ticks.instanceMatrix.needsUpdate = true;
  root.add(lower_label_ticks);

  const frontBrushPositions = [];
  for (let i = 0; i < 24; i++) {
    const y = 0.245 + i * 0.028;
    const inset = (i % 3) * 0.006;
    frontBrushPositions.push(
      -0.63 + inset,
      y,
      0.346,
      0.63 - inset,
      y,
      0.346
    );
  }
  const front_brush_linesGeom = new THREE.BufferGeometry();
  front_brush_linesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(frontBrushPositions, 3)
  );
  const front_brush_lines = new THREE.LineSegments(
    front_brush_linesGeom,
    brushLineMat
  );
  front_brush_lines.name = "front_brush_lines";
  root.add(front_brush_lines);

  const sideGrainPositions = [];
  for (let i = 0; i < 13; i++) {
    const baseX = -0.205 + i * 0.034;
    for (let j = 0; j < 7; j++) {
      const y0 = 0.18 + j * 0.105;
      const y1 = y0 + 0.095;
      const x0 = baseX + Math.sin(i * 1.7 + j * 0.8) * 0.009;
      const x1 = baseX + Math.sin(i * 1.7 + j * 0.8 + 0.7) * 0.009;
      sideGrainPositions.push(x0, y0, 0.279, x1, y1, 0.279);
    }
  }
  const wood_grain_sideGeom = new THREE.BufferGeometry();
  wood_grain_sideGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(sideGrainPositions, 3)
  );
  const wood_grain_side = new THREE.LineSegments(
    wood_grain_sideGeom,
    grainLineMat
  );
  wood_grain_side.name = "wood_grain_side";
  root.add(wood_grain_side);

  const baseGrainPositions = [];
  for (let i = 0; i < 5; i++) {
    const y = 0.068 + i * 0.017;
    for (let j = 0; j < 5; j++) {
      const x0 = -0.78 + j * 0.31;
      const x1 = x0 + 0.24;
      baseGrainPositions.push(
        x0,
        y,
        0.351,
        x1,
        y + Math.sin(i + j) * 0.003,
        0.351
      );
    }
  }
  const wood_grain_baseGeom = new THREE.BufferGeometry();
  wood_grain_baseGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(baseGrainPositions, 3)
  );
  const wood_grain_base = new THREE.LineSegments(
    wood_grain_baseGeom,
    grainLineMat
  );
  wood_grain_base.name = "wood_grain_base";
  root.add(wood_grain_base);

  const topGrainPositions = [];
  for (let i = 0; i < 9; i++) {
    const z = -0.215 + i * 0.05;
    for (let j = 0; j < 4; j++) {
      const x0 = -0.69 + j * 0.35;
      const x1 = x0 + 0.28;
      topGrainPositions.push(
        x0,
        1.073,
        z,
        x1,
        1.073,
        z + Math.sin(i * 0.8 + j) * 0.008
      );
    }
  }
  const wood_grain_topGeom = new THREE.BufferGeometry();
  wood_grain_topGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(topGrainPositions, 3)
  );
  const wood_grain_top = new THREE.LineSegments(
    wood_grain_topGeom,
    grainLineMat
  );
  wood_grain_top.name = "wood_grain_top";
  root.add(wood_grain_top);

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

  fitToUnitCube(THREE, root);
  return root;
}