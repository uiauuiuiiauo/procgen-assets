export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "fireplace_mantel";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x986238,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xad7849,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x6d4226,
    metalness: 0.0,
    roughness: 0.6,
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x89837b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const stoneHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xa39d94,
    metalness: 0.0,
    roughness: 0.7,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x202326,
    metalness: 0.5,
    roughness: 0.5,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x090a0a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x171818,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x394348,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.65,
    ior: 1.5,
    transparent: true,
    opacity: 0.56,
    side: THREE.DoubleSide,
  });
  const barkMat = new THREE.MeshStandardMaterial({
    color: 0x4b4037,
    metalness: 0.0,
    roughness: 0.9,
  });
  const barkEndMat = new THREE.MeshStandardMaterial({
    color: 0xd2b986,
    metalness: 0.0,
    roughness: 0.9,
  });
  const charcoalMat = new THREE.MeshStandardMaterial({
    color: 0x292725,
    metalness: 0.0,
    roughness: 0.9,
  });
  const emberMat = new THREE.MeshStandardMaterial({
    color: 0x8d3f20,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0x8d3f20,
    emissiveIntensity: 1.0,
  });
  const grainMat = new THREE.LineBasicMaterial({
    color: 0x4f2d1b,
    transparent: true,
    opacity: 0.32,
  });
  const stoneVeinMat = new THREE.LineBasicMaterial({
    color: 0x665f58,
    transparent: true,
    opacity: 0.24,
  });

  function addBox(name, w, h, d, mat, x, y, z, parent = root) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function createPanelFrame(name, cx, cy, w, h, rail, depth, z, mat) {
    const frame = new THREE.Group();
    frame.name = name;

    const horizontalGeom = new THREE.BoxGeometry(w, rail, depth);
    const verticalGeom = new THREE.BoxGeometry(rail, h - rail * 2, depth);

    const top = new THREE.Mesh(horizontalGeom, mat);
    top.name = name + "_top";
    top.position.set(cx, cy + h / 2 - rail / 2, z);
    frame.add(top);

    const bottom = new THREE.Mesh(horizontalGeom, mat);
    bottom.name = name + "_bottom";
    bottom.position.set(cx, cy - h / 2 + rail / 2, z);
    frame.add(bottom);

    const left = new THREE.Mesh(verticalGeom, mat);
    left.name = name + "_left";
    left.position.set(cx - w / 2 + rail / 2, cy, z);
    frame.add(left);

    const right = new THREE.Mesh(verticalGeom, mat);
    right.name = name + "_right";
    right.position.set(cx + w / 2 - rail / 2, cy, z);
    frame.add(right);

    root.add(frame);
    return frame;
  }

  function setCylinderInstance(mesh, index, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    mesh.setMatrixAt(index, matrix);
  }

  const base_plinth = addBox(
    "base_plinth",
    4.08,
    0.18,
    0.74,
    woodMat,
    0,
    0.09,
    0.02
  );

  const base_step = addBox(
    "base_step",
    3.82,
    0.18,
    0.62,
    lightWoodMat,
    0,
    0.25,
    0.01
  );

  const hearth_platform = addBox(
    "hearth_platform",
    3.58,
    0.16,
    0.78,
    woodMat,
    0,
    0.42,
    0.07
  );

  const hearth_front_lip = addBox(
    "hearth_front_lip",
    3.72,
    0.11,
    0.16,
    lightWoodMat,
    0,
    0.35,
    0.43
  );

  const left_base_block = addBox(
    "left_base_block",
    0.68,
    0.38,
    0.58,
    woodMat,
    -1.56,
    0.49,
    0.02
  );

  const right_base_block = addBox(
    "right_base_block",
    0.68,
    0.38,
    0.58,
    woodMat,
    1.56,
    0.49,
    0.02
  );

  const left_pilaster = addBox(
    "left_pilaster",
    0.56,
    2.56,
    0.46,
    woodMat,
    -1.56,
    1.94,
    0.02
  );

  const right_pilaster = addBox(
    "right_pilaster",
    0.56,
    2.56,
    0.46,
    woodMat,
    1.56,
    1.94,
    0.02
  );

  const left_inner_jamb = addBox(
    "left_inner_jamb",
    0.24,
    2.32,
    0.5,
    lightWoodMat,
    -1.25,
    1.82,
    0.055
  );

  const right_inner_jamb = addBox(
    "right_inner_jamb",
    0.24,
    2.32,
    0.5,
    lightWoodMat,
    1.25,
    1.82,
    0.055
  );

  const left_base_cap = addBox(
    "left_base_cap",
    0.72,
    0.1,
    0.58,
    darkWoodMat,
    -1.56,
    0.71,
    0.04
  );

  const right_base_cap = addBox(
    "right_base_cap",
    0.72,
    0.1,
    0.58,
    darkWoodMat,
    1.56,
    0.71,
    0.04
  );

  const left_base_bead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.034, 0.7, 12),
    lightWoodMat
  );
  left_base_bead.name = "left_base_bead";
  left_base_bead.rotation.z = Math.PI / 2;
  left_base_bead.position.set(-1.56, 0.77, 0.34);
  root.add(left_base_bead);

  const right_base_bead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.034, 0.034, 0.7, 12),
    lightWoodMat
  );
  right_base_bead.name = "right_base_bead";
  right_base_bead.rotation.z = Math.PI / 2;
  right_base_bead.position.set(1.56, 0.77, 0.34);
  root.add(right_base_bead);

  const left_panel_recess = addBox(
    "left_panel_recess",
    0.39,
    1.5,
    0.025,
    darkWoodMat,
    -1.56,
    1.55,
    0.258
  );

  const right_panel_recess = addBox(
    "right_panel_recess",
    0.39,
    1.5,
    0.025,
    darkWoodMat,
    1.56,
    1.55,
    0.258
  );

  const left_panel_field = addBox(
    "left_panel_field",
    0.29,
    1.34,
    0.026,
    lightWoodMat,
    -1.56,
    1.55,
    0.277
  );

  const right_panel_field = addBox(
    "right_panel_field",
    0.29,
    1.34,
    0.026,
    lightWoodMat,
    1.56,
    1.55,
    0.277
  );

  const left_panel_molding = createPanelFrame(
    "left_panel_molding",
    -1.56,
    1.55,
    0.42,
    1.56,
    0.055,
    0.05,
    0.305,
    woodMat
  );

  const right_panel_molding = createPanelFrame(
    "right_panel_molding",
    1.56,
    1.55,
    0.42,
    1.56,
    0.055,
    0.05,
    0.305,
    woodMat
  );

  const left_upper_panel_recess = addBox(
    "left_upper_panel_recess",
    0.39,
    0.58,
    0.025,
    darkWoodMat,
    -1.56,
    2.78,
    0.259
  );

  const right_upper_panel_recess = addBox(
    "right_upper_panel_recess",
    0.39,
    0.58,
    0.025,
    darkWoodMat,
    1.56,
    2.78,
    0.259
  );

  const left_upper_panel = addBox(
    "left_upper_panel",
    0.3,
    0.48,
    0.026,
    lightWoodMat,
    -1.56,
    2.78,
    0.278
  );

  const right_upper_panel = addBox(
    "right_upper_panel",
    0.3,
    0.48,
    0.026,
    lightWoodMat,
    1.56,
    2.78,
    0.278
  );

  const left_upper_molding = createPanelFrame(
    "left_upper_molding",
    -1.56,
    2.78,
    0.42,
    0.61,
    0.05,
    0.045,
    0.305,
    woodMat
  );

  const right_upper_molding = createPanelFrame(
    "right_upper_molding",
    1.56,
    2.78,
    0.42,
    0.61,
    0.05,
    0.045,
    0.305,
    woodMat
  );

  const left_capital_band = addBox(
    "left_capital_band",
    0.68,
    0.12,
    0.58,
    darkWoodMat,
    -1.56,
    3.17,
    0.03
  );

  const right_capital_band = addBox(
    "right_capital_band",
    0.68,
    0.12,
    0.58,
    darkWoodMat,
    1.56,
    3.17,
    0.03
  );

  const left_capital_bead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.036, 0.036, 0.7, 12),
    lightWoodMat
  );
  left_capital_bead.name = "left_capital_bead";
  left_capital_bead.rotation.z = Math.PI / 2;
  left_capital_bead.position.set(-1.56, 3.2, 0.35);
  root.add(left_capital_bead);

  const right_capital_bead = new THREE.Mesh(
    new THREE.CylinderGeometry(0.036, 0.036, 0.7, 12),
    lightWoodMat
  );
  right_capital_bead.name = "right_capital_bead";
  right_capital_bead.rotation.z = Math.PI / 2;
  right_capital_bead.position.set(1.56, 3.2, 0.35);
  root.add(right_capital_bead);

  const upper_backing = addBox(
    "upper_backing",
    3.34,
    1.18,
    0.38,
    woodMat,
    0,
    2.65,
    -0.01
  );

  const frieze_panel = addBox(
    "frieze_panel",
    2.68,
    0.82,
    0.09,
    lightWoodMat,
    0,
    2.64,
    0.235
  );

  const frieze_top_trim = addBox(
    "frieze_top_trim",
    2.94,
    0.1,
    0.14,
    darkWoodMat,
    0,
    3.08,
    0.245
  );

  const frieze_bottom_trim = addBox(
    "frieze_bottom_trim",
    2.9,
    0.11,
    0.15,
    darkWoodMat,
    0,
    2.19,
    0.25
  );

  const cornice_lower = addBox(
    "cornice_lower",
    3.76,
    0.15,
    0.5,
    woodMat,
    0,
    3.22,
    0
  );

  const cornice_middle = addBox(
    "cornice_middle",
    3.94,
    0.13,
    0.58,
    lightWoodMat,
    0,
    3.34,
    0.01
  );

  const crown_front_round = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, 3.9, 16),
    darkWoodMat
  );
  crown_front_round.name = "crown_front_round";
  crown_front_round.rotation.z = Math.PI / 2;
  crown_front_round.position.set(0, 3.39, 0.325);
  root.add(crown_front_round);

  const mantel_shelf = addBox(
    "mantel_shelf",
    4.16,
    0.16,
    0.76,
    woodMat,
    0,
    3.51,
    0.02
  );

  const shelf_front_lip = addBox(
    "shelf_front_lip",
    4.22,
    0.1,
    0.16,
    lightWoodMat,
    0,
    3.47,
    0.405
  );

  const shelf_top_surface = addBox(
    "shelf_top_surface",
    4.06,
    0.04,
    0.68,
    lightWoodMat,
    0,
    3.605,
    0
  );

  const left_stone_surround = addBox(
    "left_stone_surround",
    0.28,
    1.58,
    0.09,
    stoneMat,
    -1.08,
    1.45,
    0.305
  );

  const right_stone_surround = addBox(
    "right_stone_surround",
    0.28,
    1.58,
    0.09,
    stoneMat,
    1.08,
    1.45,
    0.305
  );

  const left_stone_highlight = addBox(
    "left_stone_highlight",
    0.08,
    1.48,
    0.018,
    stoneHighlightMat,
    -1.13,
    1.45,
    0.359
  );

  const right_stone_highlight = addBox(
    "right_stone_highlight",
    0.08,
    1.48,
    0.018,
    stoneHighlightMat,
    1.03,
    1.45,
    0.359
  );

  const firebox_back = addBox(
    "firebox_back",
    1.82,
    1.54,
    0.08,
    blackMat,
    0,
    1.45,
    0.29
  );

  const firebox_interior = addBox(
    "firebox_interior",
    1.5,
    1.08,
    0.035,
    interiorMat,
    0,
    1.35,
    0.344
  );

  const firebox_left_frame = addBox(
    "firebox_left_frame",
    0.11,
    1.58,
    0.1,
    blackMetalMat,
    -0.96,
    1.45,
    0.385
  );

  const firebox_right_frame = addBox(
    "firebox_right_frame",
    0.11,
    1.58,
    0.1,
    blackMetalMat,
    0.96,
    1.45,
    0.385
  );

  const firebox_top_frame = addBox(
    "firebox_top_frame",
    1.92,
    0.1,
    0.1,
    blackMetalMat,
    0,
    2.21,
    0.385
  );

  const firebox_bottom_frame = addBox(
    "firebox_bottom_frame",
    1.92,
    0.1,
    0.1,
    blackMetalMat,
    0,
    0.69,
    0.385
  );

  const vent_panel = addBox(
    "vent_panel",
    1.68,
    0.42,
    0.035,
    blackMetalMat,
    0,
    1.96,
    0.375
  );

  const vent_slats = new THREE.Group();
  vent_slats.name = "vent_slats";
  const ventSlatGeom = new THREE.BoxGeometry(1.58, 0.035, 0.035);
  for (let i = 0; i < 6; i++) {
    const vent_slat = new THREE.Mesh(ventSlatGeom, blackMat);
    vent_slat.name = "vent_slat_" + i;
    vent_slat.position.set(0, 2.11 - i * 0.065, 0.404);
    vent_slats.add(vent_slat);
  }
  root.add(vent_slats);

  const vent_dividers = new THREE.Group();
  vent_dividers.name = "vent_dividers";
  const ventDividerGeom = new THREE.BoxGeometry(0.026, 0.36, 0.025);
  for (const x of [-0.28, 0.28]) {
    const vent_divider = new THREE.Mesh(ventDividerGeom, blackMat);
    vent_divider.name = x < 0 ? "left_vent_divider" : "right_vent_divider";
    vent_divider.position.set(x, 1.96, 0.407);
    vent_dividers.add(vent_divider);
  }
  root.add(vent_dividers);

  const glass_panel_geom = new THREE.PlaneGeometry(1.57, 1.06);
  const glass_panel = new THREE.Mesh(glass_panel_geom, glassMat);
  glass_panel.name = "glass_panel";
  glass_panel.position.set(0, 1.34, 0.425);
  root.add(glass_panel);

  const glass_side_trim = new THREE.Group();
  glass_side_trim.name = "glass_side_trim";
  const glassSideGeom = new THREE.BoxGeometry(0.035, 1.12, 0.025);
  for (const x of [-0.805, 0.805]) {
    const glass_side = new THREE.Mesh(glassSideGeom, blackMetalMat);
    glass_side.name = x < 0 ? "glass_left_trim" : "glass_right_trim";
    glass_side.position.set(x, 1.34, 0.438);
    glass_side_trim.add(glass_side);
  }
  root.add(glass_side_trim);

  const glass_bottom_trim = addBox(
    "glass_bottom_trim",
    1.64,
    0.035,
    0.025,
    blackMetalMat,
    0,
    0.79,
    0.438
  );

  const control_panel = addBox(
    "control_panel",
    1.68,
    0.25,
    0.055,
    blackMetalMat,
    0,
    0.84,
    0.425
  );

  const control_drawer = addBox(
    "control_drawer",
    0.72,
    0.21,
    0.035,
    blackMat,
    0,
    0.84,
    0.462
  );

  const control_knob_ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.052, 0.012, 10, 24),
    silverMat
  );
  control_knob_ring.name = "control_knob_ring";
  control_knob_ring.position.set(0, 0.84, 0.49);
  root.add(control_knob_ring);

  const control_knob = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.035, 16),
    silverMat
  );
  control_knob.name = "control_knob";
  control_knob.rotation.x = Math.PI / 2;
  control_knob.position.set(0, 0.84, 0.495);
  root.add(control_knob);

  const ember_bed = addBox(
    "ember_bed",
    1.38,
    0.12,
    0.025,
    charcoalMat,
    0,
    0.91,
    0.37
  );

  const emberGeom = new THREE.IcosahedronGeometry(0.045, 0);
  const ember_coals = new THREE.InstancedMesh(emberGeom, emberMat, 12);
  ember_coals.name = "ember_coals";
  const emberDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    emberDummy.position.set(
      -0.55 + col * 0.22 + row * 0.07,
      0.89 + row * 0.065 + (i % 2) * 0.012,
      0.394
    );
    emberDummy.rotation.set(i * 0.31, i * 0.19, i * 0.27);
    emberDummy.scale.set(
      0.8 + (i % 3) * 0.12,
      0.65 + (i % 2) * 0.18,
      0.65
    );
    emberDummy.updateMatrix();
    ember_coals.setMatrixAt(i, emberDummy.matrix);
  }
  ember_coals.instanceMatrix.needsUpdate = true;
  root.add(ember_coals);

  const logGeom = new THREE.CylinderGeometry(0.105, 0.13, 1, 8);
  const bark_logs = new THREE.InstancedMesh(logGeom, barkMat, 3);
  bark_logs.name = "bark_logs";

  const logEndpoints = [
    [
      new THREE.Vector3(-0.61, 1.02, 0.39),
      new THREE.Vector3(0.2, 1.3, 0.365),
    ],
    [
      new THREE.Vector3(-0.22, 1.0, 0.37),
      new THREE.Vector3(0.59, 1.19, 0.385),
    ],
    [
      new THREE.Vector3(-0.48, 1.04, 0.35),
      new THREE.Vector3(0.42, 0.98, 0.37),
    ],
  ];

  for (let i = 0; i < logEndpoints.length; i++) {
    setCylinderInstance(bark_logs, i, logEndpoints[i][0], logEndpoints[i][1]);
  }
  bark_logs.instanceMatrix.needsUpdate = true;
  root.add(bark_logs);

  const logEndGeom = new THREE.CylinderGeometry(0.1, 0.1, 0.028, 8);
  const log_cut_ends = new THREE.InstancedMesh(logEndGeom, barkEndMat, 6);
  log_cut_ends.name = "log_cut_ends";
  let endIndex = 0;
  for (let i = 0; i < logEndpoints.length; i++) {
    const start = logEndpoints[i][0];
    const end = logEndpoints[i][1];
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );

    for (const point of [start, end]) {
      const matrix = new THREE.Matrix4().compose(
        point,
        quaternion,
        new THREE.Vector3(1, 1, 1)
      );
      log_cut_ends.setMatrixAt(endIndex, matrix);
      endIndex++;
    }
  }
  log_cut_ends.instanceMatrix.needsUpdate = true;
  root.add(log_cut_ends);

  const woodGrainPositions = [];

  function addHorizontalGrain(x0, x1, y, z, amplitude, phase, segments = 14) {
    let previousX = x0;
    let previousY = y + Math.sin(phase) * amplitude;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = x0 + (x1 - x0) * t;
      const wave =
        Math.sin(i * 0.83 + phase) * amplitude +
        Math.sin(i * 0.31 + phase * 0.7) * amplitude * 0.45;
      const currentY = y + wave;
      woodGrainPositions.push(previousX, previousY, z, x, currentY, z);
      previousX = x;
      previousY = currentY;
    }
  }

  function addVerticalGrain(x, y0, y1, z, amplitude, phase) {
    let previousX = x + Math.sin(phase) * amplitude;
    let previousY = y0;
    const segments = 16;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const y = y0 + (y1 - y0) * t;
      const wave =
        Math.sin(i * 0.79 + phase) * amplitude +
        Math.sin(i * 0.27 + phase) * amplitude * 0.35;
      const currentX = x + wave;
      woodGrainPositions.push(previousX, previousY, z, currentX, y, z);
      previousX = currentX;
      previousY = y;
    }
  }

  for (let i = 0; i < 11; i++) {
    addHorizontalGrain(
      -1.25,
      1.25,
      2.31 + i * 0.066,
      0.284,
      0.012 + (i % 3) * 0.003,
      i * 0.73
    );
  }

  for (let i = 0; i < 5; i++) {
    addHorizontalGrain(
      -1.85,
      1.85,
      0.22 + i * 0.065,
      0.394,
      0.012,
      i * 0.91
    );
  }

  for (let i = 0; i < 4; i++) {
    addHorizontalGrain(
      -2.0,
      2.0,
      3.46 + i * 0.043,
      0.488,
      0.008,
      i * 0.62
    );
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      addVerticalGrain(
        side * 1.56 + (i - 1.5) * 0.085,
        0.82,
        3.02,
        0.334,
        0.008,
        i * 0.77 + side
      );
    }
  }

  const wood_grain = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    grainMat
  );
  wood_grain.name = "wood_grain";
  wood_grain.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(woodGrainPositions, 3)
  );
  root.add(wood_grain);

  const stoneVeinPositions = [];

  function addStoneVein(x0, y0, x1, y1, bend) {
    let previousX = x0;
    let previousY = y0;
    const segments = 8;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const x = x0 + (x1 - x0) * t;
      const y =
        y0 +
        (y1 - y0) * t +
        Math.sin(t * Math.PI) * bend;
      stoneVeinPositions.push(
        previousX,
        previousY,
        0.362,
        x,
        y,
        0.362
      );
      previousX = x;
      previousY = y;
    }
  }

  addStoneVein(-1.14, 1.02, -1.03, 1.72, 0.035);
  addStoneVein(-1.08, 1.76, -1.16, 2.18, -0.025);
  addStoneVein(-1.16, 0.72, -1.04, 0.94, 0.018);
  addStoneVein(1.14, 0.82, 1.02, 1.42, -0.03);
  addStoneVein(1.04, 1.55, 1.15, 2.15, 0.028);
  addStoneVein(1.16, 2.02, 1.04, 2.23, -0.018);

  const stone_veins = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    stoneVeinMat
  );
  stone_veins.name = "stone_veins";
  stone_veins.geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(stoneVeinPositions, 3)
  );
  root.add(stone_veins);

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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