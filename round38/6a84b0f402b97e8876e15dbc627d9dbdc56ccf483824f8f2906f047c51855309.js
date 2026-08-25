export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "fireplace_mantel";

  const wood_surround = new THREE.Group();
  wood_surround.name = "wood_surround";
  root.add(wood_surround);

  const stone_insert_group = new THREE.Group();
  stone_insert_group.name = "stone_insert_group";
  root.add(stone_insert_group);

  const firebox_group = new THREE.Group();
  firebox_group.name = "firebox_group";
  root.add(firebox_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a633b,
    metalness: 0.0,
    roughness: 0.6
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xad7447,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x744526,
    metalness: 0.0,
    roughness: 0.6
  });
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x8d8981,
    metalness: 0.0,
    roughness: 0.7
  });
  const stoneHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xa39f96,
    metalness: 0.0,
    roughness: 0.7
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x24272a,
    metalness: 0.5,
    roughness: 0.5
  });
  const ventMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x59636b,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const barkMat = new THREE.MeshStandardMaterial({
    color: 0x3f3730,
    metalness: 0.0,
    roughness: 0.9
  });
  const barkHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x66574a,
    metalness: 0.0,
    roughness: 0.9
  });
  const endGrainMat = new THREE.MeshStandardMaterial({
    color: 0xc5ad7f,
    metalness: 0.0,
    roughness: 0.9
  });
  const coalMat = new THREE.MeshStandardMaterial({
    color: 0x292625,
    metalness: 0.0,
    roughness: 0.9
  });
  const emberMat = new THREE.MeshStandardMaterial({
    color: 0x9b4328,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xd35a25,
    emissiveIntensity: 1.0
  });
  const flameMat = new THREE.MeshStandardMaterial({
    color: 0xd8792f,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xd8792f,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });
  const innerFlameMat = new THREE.MeshStandardMaterial({
    color: 0xe5b846,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xe5b846,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  function addBox(parent, name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addCylinder(parent, name, radius, length, segments, mat, x, y, z, rx, ry, rz) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, segments),
      mat
    );
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    parent.add(mesh);
    return mesh;
  }

  const base_plinth = addBox(
    wood_surround, "base_plinth", 4.36, 0.18, 0.82,
    woodMat, 0, 0.09, 0
  );

  const base_step = addBox(
    wood_surround, "base_step", 4.14, 0.16, 0.70,
    lightWoodMat, 0, 0.25, 0
  );

  const lower_sill = addBox(
    wood_surround, "lower_sill", 3.88, 0.22, 0.58,
    woodMat, 0, 0.43, 0
  );

  const lower_sill_bead = addCylinder(
    wood_surround, "lower_sill_bead", 0.045, 3.94, 16,
    darkWoodMat, 0, 0.52, 0.31, 0, 0, Math.PI / 2
  );

  const left_base_block = addBox(
    wood_surround, "left_base_block", 0.68, 0.46, 0.56,
    woodMat, -1.73, 0.50, 0
  );

  const right_base_block = addBox(
    wood_surround, "right_base_block", 0.68, 0.46, 0.56,
    woodMat, 1.73, 0.50, 0
  );

  const left_base_cap = addBox(
    wood_surround, "left_base_cap", 0.75, 0.12, 0.62,
    lightWoodMat, -1.73, 0.73, 0
  );

  const right_base_cap = addBox(
    wood_surround, "right_base_cap", 0.75, 0.12, 0.62,
    lightWoodMat, 1.73, 0.73, 0
  );

  const left_pilaster = addBox(
    wood_surround, "left_pilaster", 0.58, 2.30, 0.48,
    woodMat, -1.73, 1.79, 0
  );

  const right_pilaster = addBox(
    wood_surround, "right_pilaster", 0.58, 2.30, 0.48,
    woodMat, 1.73, 1.79, 0
  );

  const left_inner_jamb = addBox(
    wood_surround, "left_inner_jamb", 0.18, 1.92, 0.54,
    lightWoodMat, -1.39, 1.66, 0
  );

  const right_inner_jamb = addBox(
    wood_surround, "right_inner_jamb", 0.18, 1.92, 0.54,
    lightWoodMat, 1.39, 1.66, 0
  );

  const left_panel_field = addBox(
    wood_surround, "left_panel_field", 0.34, 1.24, 0.025,
    darkWoodMat, -1.73, 1.50, 0.253
  );

  const right_panel_field = addBox(
    wood_surround, "right_panel_field", 0.34, 1.24, 0.025,
    darkWoodMat, 1.73, 1.50, 0.253
  );

  const left_panel_center = addBox(
    wood_surround, "left_panel_center", 0.23, 1.08, 0.035,
    lightWoodMat, -1.73, 1.50, 0.276
  );

  const right_panel_center = addBox(
    wood_surround, "right_panel_center", 0.23, 1.08, 0.035,
    lightWoodMat, 1.73, 1.50, 0.276
  );

  const panel_horizontal_railsGeom = new THREE.BoxGeometry(0.38, 0.075, 0.045);
  const panel_horizontal_rails = new THREE.InstancedMesh(
    panel_horizontal_railsGeom, woodMat, 4
  );
  panel_horizontal_rails.name = "panel_horizontal_rails";
  const panelRailDummy = new THREE.Object3D();
  const panelRailPositions = [
    [-1.73, 0.86, 0.292],
    [-1.73, 2.14, 0.292],
    [1.73, 0.86, 0.292],
    [1.73, 2.14, 0.292]
  ];
  for (let i = 0; i < panelRailPositions.length; i++) {
    panelRailDummy.position.set(
      panelRailPositions[i][0],
      panelRailPositions[i][1],
      panelRailPositions[i][2]
    );
    panelRailDummy.updateMatrix();
    panel_horizontal_rails.setMatrixAt(i, panelRailDummy.matrix);
  }
  panel_horizontal_rails.instanceMatrix.needsUpdate = true;
  wood_surround.add(panel_horizontal_rails);

  const panel_vertical_railsGeom = new THREE.BoxGeometry(0.075, 1.20, 0.045);
  const panel_vertical_rails = new THREE.InstancedMesh(
    panel_vertical_railsGeom, woodMat, 4
  );
  panel_vertical_rails.name = "panel_vertical_rails";
  const verticalRailPositions = [
    [-1.925, 1.50, 0.292],
    [-1.535, 1.50, 0.292],
    [1.535, 1.50, 0.292],
    [1.925, 1.50, 0.292]
  ];
  for (let i = 0; i < verticalRailPositions.length; i++) {
    panelRailDummy.position.set(
      verticalRailPositions[i][0],
      verticalRailPositions[i][1],
      verticalRailPositions[i][2]
    );
    panelRailDummy.updateMatrix();
    panel_vertical_rails.setMatrixAt(i, panelRailDummy.matrix);
  }
  panel_vertical_rails.instanceMatrix.needsUpdate = true;
  wood_surround.add(panel_vertical_rails);

  const left_upper_block = addBox(
    wood_surround, "left_upper_block", 0.68, 0.50, 0.50,
    lightWoodMat, -1.73, 2.61, 0
  );

  const right_upper_block = addBox(
    wood_surround, "right_upper_block", 0.68, 0.50, 0.50,
    lightWoodMat, 1.73, 2.61, 0
  );

  const left_upper_band = addBox(
    wood_surround, "left_upper_band", 0.76, 0.12, 0.57,
    woodMat, -1.73, 2.35, 0
  );

  const right_upper_band = addBox(
    wood_surround, "right_upper_band", 0.76, 0.12, 0.57,
    woodMat, 1.73, 2.35, 0
  );

  const left_upper_bead = addCylinder(
    wood_surround, "left_upper_bead", 0.035, 0.68, 14,
    darkWoodMat, -1.73, 2.42, 0.30, 0, 0, Math.PI / 2
  );

  const right_upper_bead = addCylinder(
    wood_surround, "right_upper_bead", 0.035, 0.68, 14,
    darkWoodMat, 1.73, 2.42, 0.30, 0, 0, Math.PI / 2
  );

  const header_panel = addBox(
    wood_surround, "header_panel", 3.06, 0.88, 0.46,
    lightWoodMat, 0, 2.61, 0
  );

  const header_lower_trim = addBox(
    wood_surround, "header_lower_trim", 3.18, 0.11, 0.52,
    darkWoodMat, 0, 2.15, 0.01
  );

  const header_lower_bead = addCylinder(
    wood_surround, "header_lower_bead", 0.035, 3.16, 14,
    woodMat, 0, 2.20, 0.285, 0, 0, Math.PI / 2
  );

  const crown_lower = addBox(
    wood_surround, "crown_lower", 4.12, 0.16, 0.56,
    woodMat, 0, 3.08, 0
  );

  const crown_middle = addBox(
    wood_surround, "crown_middle", 4.25, 0.15, 0.63,
    darkWoodMat, 0, 3.20, 0
  );

  const crown_front_bead = addCylinder(
    wood_surround, "crown_front_bead", 0.052, 4.26, 18,
    lightWoodMat, 0, 3.18, 0.33, 0, 0, Math.PI / 2
  );

  const mantel_top = addBox(
    wood_surround, "mantel_top", 4.50, 0.16, 0.78,
    woodMat, 0, 3.36, 0
  );

  const mantel_top_front_lip = addCylinder(
    wood_surround, "mantel_top_front_lip", 0.055, 4.48, 20,
    lightWoodMat, 0, 3.34, 0.405, 0, 0, Math.PI / 2
  );

  const stone_left_surround = addBox(
    stone_insert_group, "stone_left_surround", 0.30, 1.92, 0.12,
    stoneMat, -1.14, 1.56, 0.25
  );

  const stone_right_surround = addBox(
    stone_insert_group, "stone_right_surround", 0.30, 1.92, 0.12,
    stoneMat, 1.14, 1.56, 0.25
  );

  const stone_left_inner_tile = addBox(
    stone_insert_group, "stone_left_inner_tile", 0.26, 1.84, 0.035,
    stoneHighlightMat, -1.14, 1.56, 0.327
  );

  const stone_right_inner_tile = addBox(
    stone_insert_group, "stone_right_inner_tile", 0.26, 1.84, 0.035,
    stoneHighlightMat, 1.14, 1.56, 0.327
  );

  const firebox_casing = addBox(
    firebox_group, "firebox_casing", 2.12, 1.82, 0.16,
    blackMetalMat, 0, 1.53, 0.25
  );

  const firebox_back = addBox(
    firebox_group, "firebox_back", 1.72, 1.08, 0.035,
    ventMat, 0, 1.46, 0.342
  );

  const firebox_glass = addBox(
    firebox_group, "firebox_glass", 1.68, 1.04, 0.018,
    glassMat, 0, 1.46, 0.368
  );

  const firebox_left_rim = addBox(
    firebox_group, "firebox_left_rim", 0.075, 1.18, 0.055,
    blackMetalMat, -0.90, 1.47, 0.385
  );

  const firebox_right_rim = addBox(
    firebox_group, "firebox_right_rim", 0.075, 1.18, 0.055,
    blackMetalMat, 0.90, 1.47, 0.385
  );

  const firebox_top_rim = addBox(
    firebox_group, "firebox_top_rim", 1.86, 0.075, 0.055,
    blackMetalMat, 0, 2.035, 0.385
  );

  const firebox_bottom_rim = addBox(
    firebox_group, "firebox_bottom_rim", 1.86, 0.075, 0.055,
    blackMetalMat, 0, 0.90, 0.385
  );

  const vent_recess = addBox(
    firebox_group, "vent_recess", 1.86, 0.42, 0.045,
    ventMat, 0, 2.28, 0.355
  );

  const vent_slatsGeom = new THREE.BoxGeometry(1.78, 0.035, 0.055);
  const vent_slats = new THREE.InstancedMesh(vent_slatsGeom, blackMetalMat, 6);
  vent_slats.name = "vent_slats";
  const ventDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    ventDummy.position.set(0, 2.105 + i * 0.071, 0.392);
    ventDummy.updateMatrix();
    vent_slats.setMatrixAt(i, ventDummy.matrix);
  }
  vent_slats.instanceMatrix.needsUpdate = true;
  firebox_group.add(vent_slats);

  const vent_dividersGeom = new THREE.BoxGeometry(0.026, 0.38, 0.045);
  const vent_dividers = new THREE.InstancedMesh(
    vent_dividersGeom, blackMetalMat, 3
  );
  vent_dividers.name = "vent_dividers";
  for (let i = 0; i < 3; i++) {
    ventDummy.position.set(-0.52 + i * 0.52, 2.28, 0.405);
    ventDummy.updateMatrix();
    vent_dividers.setMatrixAt(i, ventDummy.matrix);
  }
  vent_dividers.instanceMatrix.needsUpdate = true;
  firebox_group.add(vent_dividers);

  const firebox_ash_panel = addBox(
    firebox_group, "firebox_ash_panel", 1.86, 0.28, 0.055,
    blackMetalMat, 0, 0.75, 0.37
  );

  const ash_panel_seam = addBox(
    firebox_group, "ash_panel_seam", 0.018, 0.25, 0.025,
    ventMat, 0.18, 0.75, 0.407
  );

  const control_knob = addCylinder(
    firebox_group, "control_knob", 0.057, 0.055, 20,
    silverMat, 0.43, 0.75, 0.435, Math.PI / 2, 0, 0
  );

  const control_knob_center = addCylinder(
    firebox_group, "control_knob_center", 0.022, 0.062, 16,
    blackMetalMat, 0.43, 0.75, 0.465, Math.PI / 2, 0, 0
  );

  const control_indicator = addBox(
    firebox_group, "control_indicator", 0.012, 0.035, 0.012,
    silverMat, 0.43, 0.785, 0.493
  );

  const coal_bed = addBox(
    firebox_group, "coal_bed", 1.48, 0.13, 0.16,
    coalMat, 0, 1.01, 0.29
  );

  const coal_piecesGeom = new THREE.IcosahedronGeometry(0.055, 0);
  const coal_pieces = new THREE.InstancedMesh(coal_piecesGeom, coalMat, 18);
  coal_pieces.name = "coal_pieces";
  const coalDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const row = Math.floor(i / 6);
    const col = i % 6;
    const scale = 0.72 + (i % 4) * 0.09;
    coalDummy.position.set(
      -0.62 + col * 0.245 + (row % 2) * 0.045,
      0.985 + row * 0.052,
      0.382 + (i % 2) * 0.012
    );
    coalDummy.rotation.set(i * 0.31, i * 0.19, i * 0.13);
    coalDummy.scale.setScalar(scale);
    coalDummy.updateMatrix();
    coal_pieces.setMatrixAt(i, coalDummy.matrix);
  }
  coal_pieces.instanceMatrix.needsUpdate = true;
  firebox_group.add(coal_pieces);

  const ember_piecesGeom = new THREE.IcosahedronGeometry(0.026, 0);
  const ember_pieces = new THREE.InstancedMesh(
    ember_piecesGeom, emberMat, 8
  );
  ember_pieces.name = "ember_pieces";
  for (let i = 0; i < 8; i++) {
    coalDummy.position.set(
      -0.48 + (i % 4) * 0.31,
      1.00 + Math.floor(i / 4) * 0.055,
      0.414
    );
    coalDummy.rotation.set(i * 0.22, i * 0.37, i * 0.17);
    coalDummy.scale.setScalar(0.8 + (i % 3) * 0.1);
    coalDummy.updateMatrix();
    ember_pieces.setMatrixAt(i, coalDummy.matrix);
  }
  ember_pieces.instanceMatrix.needsUpdate = true;
  firebox_group.add(ember_pieces);

  const flameShape = new THREE.Shape();
  flameShape.moveTo(-0.12, 0);
  flameShape.bezierCurveTo(-0.13, 0.13, -0.04, 0.18, -0.05, 0.30);
  flameShape.bezierCurveTo(-0.02, 0.39, 0.04, 0.43, 0.03, 0.53);
  flameShape.bezierCurveTo(0.13, 0.39, 0.13, 0.22, 0.09, 0.12);
  flameShape.bezierCurveTo(0.15, 0.08, 0.13, 0.02, 0.12, 0);
  flameShape.closePath();

  const flameGeom = new THREE.ShapeGeometry(flameShape, 12);
  const flames = new THREE.InstancedMesh(flameGeom, flameMat, 3);
  flames.name = "flames";
  const flameDummy = new THREE.Object3D();
  const flamePositions = [
    [-0.28, 1.04, 0.405, 0.72],
    [0.00, 1.04, 0.408, 1.00],
    [0.28, 1.04, 0.406, 0.66]
  ];
  for (let i = 0; i < flamePositions.length; i++) {
    flameDummy.position.set(
      flamePositions[i][0],
      flamePositions[i][1],
      flamePositions[i][2]
    );
    flameDummy.rotation.set(0, 0, (i - 1) * 0.08);
    flameDummy.scale.set(
      flamePositions[i][3],
      flamePositions[i][3],
      1
    );
    flameDummy.updateMatrix();
    flames.setMatrixAt(i, flameDummy.matrix);
  }
  flames.instanceMatrix.needsUpdate = true;
  firebox_group.add(flames);

  const inner_flames = new THREE.InstancedMesh(
    flameGeom, innerFlameMat, 2
  );
  inner_flames.name = "inner_flames";
  for (let i = 0; i < 2; i++) {
    flameDummy.position.set(-0.12 + i * 0.24, 1.045, 0.417);
    flameDummy.rotation.set(0, 0, i === 0 ? -0.06 : 0.07);
    flameDummy.scale.set(0.43, 0.58, 1);
    flameDummy.updateMatrix();
    inner_flames.setMatrixAt(i, flameDummy.matrix);
  }
  inner_flames.instanceMatrix.needsUpdate = true;
  firebox_group.add(inner_flames);

  const left_log = addCylinder(
    firebox_group, "left_log", 0.105, 0.72, 12,
    barkMat, -0.24, 1.19, 0.31, 0, 0, 0.28
  );

  const left_log_end = addCylinder(
    firebox_group, "left_log_end", 0.098, 0.018, 16,
    endGrainMat, -0.55, 1.11, 0.31, 0, 0, 0.28
  );

  const right_log = addCylinder(
    firebox_group, "right_log", 0.105, 0.72, 12,
    barkMat, 0.25, 1.20, 0.315, 0, 0, -0.30
  );

  const right_log_end = addCylinder(
    firebox_group, "right_log_end", 0.098, 0.018, 16,
    endGrainMat, 0.56, 1.11, 0.315, 0, 0, -0.30
  );

  const left_log_band = addCylinder(
    firebox_group, "left_log_band", 0.109, 0.025, 12,
    barkHighlightMat, -0.33, 1.167, 0.31, 0, 0, 0.28
  );

  const right_log_band = addCylinder(
    firebox_group, "right_log_band", 0.109, 0.025, 12,
    barkHighlightMat, 0.20, 1.223, 0.315, 0, 0, -0.30
  );

  const wood_grain_group = new THREE.Group();
  wood_grain_group.name = "wood_grain_group";
  root.add(wood_grain_group);

  for (let i = 0; i < 8; i++) {
    const points = [];
    for (let j = 0; j <= 7; j++) {
      const x = -1.43 + j * (2.86 / 7);
      const y = 2.29 + i * 0.085 + Math.sin(i * 0.83 + j * 1.17) * 0.022;
      points.push(new THREE.Vector3(x, y, 0.238));
    }
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      28,
      0.006,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, darkWoodMat);
    grain.name = "header_grain_" + i;
    wood_grain_group.add(grain);
  }

  for (let i = 0; i < 4; i++) {
    const points = [];
    for (let j = 0; j <= 8; j++) {
      const x = -2.05 + j * (4.10 / 8);
      const y = 0.35 + i * 0.045 + Math.sin(i * 1.1 + j * 0.9) * 0.012;
      points.push(new THREE.Vector3(x, y, 0.296));
    }
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      30,
      0.005,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, darkWoodMat);
    grain.name = "base_grain_" + i;
    wood_grain_group.add(grain);
  }

  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const points = [];
      for (let j = 0; j <= 7; j++) {
        const y = 0.84 + j * (1.28 / 7);
        const x = side * 1.73 + (i - 1) * 0.085 +
          Math.sin(j * 1.13 + i) * 0.008;
        points.push(new THREE.Vector3(x, y, 0.318));
      }
      const grainGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        24,
        0.0045,
        5,
        false
      );
      const grain = new THREE.Mesh(grainGeom, darkWoodMat);
      grain.name = (side < 0 ? "left" : "right") + "_panel_grain_" + i;
      wood_grain_group.add(grain);
    }
  }

  const wood_knotsGeom = new THREE.TorusGeometry(0.055, 0.006, 6, 20);
  const wood_knots = new THREE.InstancedMesh(
    wood_knotsGeom, darkWoodMat, 5
  );
  wood_knots.name = "wood_knots";
  const knotDummy = new THREE.Object3D();
  const knotPositions = [
    [-0.54, 2.72, 0.241, 1.35, 0.55],
    [0.62, 2.48, 0.241, 1.00, 0.45],
    [0.12, 2.88, 0.241, 0.80, 0.42],
    [-1.18, 0.43, 0.299, 1.15, 0.48],
    [1.34, 0.43, 0.299, 0.92, 0.42]
  ];
  for (let i = 0; i < knotPositions.length; i++) {
    knotDummy.position.set(
      knotPositions[i][0],
      knotPositions[i][1],
      knotPositions[i][2]
    );
    knotDummy.rotation.set(0, 0, i * 0.31);
    knotDummy.scale.set(knotPositions[i][3], knotPositions[i][4], 1);
    knotDummy.updateMatrix();
    wood_knots.setMatrixAt(i, knotDummy.matrix);
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  root.add(wood_knots);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}