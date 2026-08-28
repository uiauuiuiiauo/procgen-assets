export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compass_pendant";

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const jewel_group = new THREE.Group();
  jewel_group.name = "jewel_group";
  root.add(jewel_group);

  const suspension_group = new THREE.Group();
  suspension_group.name = "suspension_group";
  root.add(suspension_group);

  const polished_goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2
  });
  const light_goldMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf72,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_goldMat = new THREE.MeshStandardMaterial({
    color: 0x8f6618,
    metalness: 0.5,
    roughness: 0.25
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xf1f0e9,
    metalness: 0.0,
    roughness: 0.4
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x263c55,
    metalness: 0.0,
    roughness: 0.7
  });
  const gold_inkMat = new THREE.MeshStandardMaterial({
    color: 0xa8873f,
    metalness: 0.0,
    roughness: 0.7
  });
  const clear_gemsMat = new THREE.MeshStandardMaterial({
    color: 0xf4f8ff,
    metalness: 0.0,
    roughness: 0.2
  });
  const blue_gemsMat = new THREE.MeshStandardMaterial({
    color: 0x078bd6,
    metalness: 0.0,
    roughness: 0.2
  });
  const pink_gemsMat = new THREE.MeshStandardMaterial({
    color: 0xd99091,
    metalness: 0.0,
    roughness: 0.2
  });
  const central_gem_baseMat = new THREE.MeshStandardMaterial({
    color: 0x06365e,
    metalness: 0.0,
    roughness: 0.3
  });
  const central_gemMat = new THREE.MeshStandardMaterial({
    color: 0x126fd1,
    metalness: 0.0,
    roughness: 0.18,
    flatShading: true
  });
  const central_gem_facetsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.16,
    vertexColors: true,
    side: THREE.DoubleSide
  });
  const glass_coverMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf6ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
  });

  const case_bodyGeom = new THREE.CylinderGeometry(1.5, 1.5, 0.34, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, polished_goldMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  case_body.position.z = -0.04;
  case_group.add(case_body);

  const rear_case_capGeom = new THREE.CylinderGeometry(1.45, 1.45, 0.1, 64);
  const rear_case_cap = new THREE.Mesh(rear_case_capGeom, dark_goldMat);
  rear_case_cap.name = "rear_case_cap";
  rear_case_cap.rotation.x = Math.PI / 2;
  rear_case_cap.position.z = -0.23;
  case_group.add(rear_case_cap);

  const rear_edgeGeom = new THREE.TorusGeometry(1.4, 0.105, 12, 64);
  const rear_edge = new THREE.Mesh(rear_edgeGeom, polished_goldMat);
  rear_edge.name = "rear_edge";
  rear_edge.position.z = -0.17;
  case_group.add(rear_edge);

  const side_grooveGeom = new THREE.TorusGeometry(1.485, 0.018, 8, 64);
  const side_groove = new THREE.Mesh(side_grooveGeom, dark_goldMat);
  side_groove.name = "side_groove";
  side_groove.position.z = -0.09;
  case_group.add(side_groove);

  const front_bezelGeom = new THREE.CylinderGeometry(1.47, 1.47, 0.12, 64);
  const front_bezel = new THREE.Mesh(front_bezelGeom, polished_goldMat);
  front_bezel.name = "front_bezel";
  front_bezel.rotation.x = Math.PI / 2;
  front_bezel.position.z = 0.12;
  case_group.add(front_bezel);

  const outer_rimGeom = new THREE.TorusGeometry(1.46, 0.06, 12, 64);
  const outer_rim = new THREE.Mesh(outer_rimGeom, light_goldMat);
  outer_rim.name = "outer_rim";
  outer_rim.position.z = 0.205;
  case_group.add(outer_rim);

  const gem_channelGeom = new THREE.RingGeometry(1.19, 1.43, 64);
  const gem_channel = new THREE.Mesh(gem_channelGeom, dark_goldMat);
  gem_channel.name = "gem_channel";
  gem_channel.position.z = 0.19;
  case_group.add(gem_channel);

  const gem_channel_outer_railGeom = new THREE.TorusGeometry(1.425, 0.025, 8, 64);
  const gem_channel_outer_rail = new THREE.Mesh(gem_channel_outer_railGeom, light_goldMat);
  gem_channel_outer_rail.name = "gem_channel_outer_rail";
  gem_channel_outer_rail.position.z = 0.225;
  case_group.add(gem_channel_outer_rail);

  const gem_channel_inner_railGeom = new THREE.TorusGeometry(1.19, 0.025, 8, 64);
  const gem_channel_inner_rail = new THREE.Mesh(gem_channel_inner_railGeom, light_goldMat);
  gem_channel_inner_rail.name = "gem_channel_inner_rail";
  gem_channel_inner_rail.position.z = 0.225;
  case_group.add(gem_channel_inner_rail);

  const dial_faceGeom = new THREE.CircleGeometry(1.16, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.z = 0.19;
  dial_group.add(dial_face);

  const dial_outer_lineGeom = new THREE.TorusGeometry(1.08, 0.009, 6, 64);
  const dial_outer_line = new THREE.Mesh(dial_outer_lineGeom, markingMat);
  dial_outer_line.name = "dial_outer_line";
  dial_outer_line.position.z = 0.207;
  dial_group.add(dial_outer_line);

  const dial_inner_lineGeom = new THREE.TorusGeometry(0.79, 0.006, 6, 64);
  const dial_inner_line = new THREE.Mesh(dial_inner_lineGeom, gold_inkMat);
  dial_inner_line.name = "dial_inner_line";
  dial_inner_line.position.z = 0.207;
  dial_group.add(dial_inner_line);

  const dial_ticksGeom = new THREE.BoxGeometry(0.018, 0.075, 0.008);
  const dial_ticks = new THREE.InstancedMesh(dial_ticksGeom, markingMat, 24);
  dial_ticks.name = "dial_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    const scale_y = i % 6 === 0 ? 1.65 : (i % 3 === 0 ? 1.25 : 0.8);
    tick_dummy.position.set(Math.sin(angle) * 1.015, Math.cos(angle) * 1.015, 0.211);
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, scale_y, 1);
    tick_dummy.updateMatrix();
    dial_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_ticks);

  const letter_strokes = [];
  function addLetterStroke(x, y, length, width, rotation) {
    letter_strokes.push([x, y, length, width, rotation]);
  }

  addLetterStroke(0.025, 0.865, 0.12, 0.018, 0);
  addLetterStroke(-0.025, 0.865, 0.12, 0.018, 0);
  addLetterStroke(0, 0.865, 0.13, 0.018, -0.43);

  addLetterStroke(0.865, 0.035, 0.12, 0.018, -Math.PI / 2);
  addLetterStroke(0.865, -0.035, 0.12, 0.018, -Math.PI / 2);
  addLetterStroke(0.865, 0, 0.13, 0.018, 0.72);

  addLetterStroke(0.025, -0.865, 0.12, 0.018, 0);
  addLetterStroke(-0.025, -0.865, 0.12, 0.018, 0);
  addLetterStroke(0, -0.865, 0.13, 0.018, 0.43);
  addLetterStroke(0, -0.865, 0.13, 0.018, -0.43);

  addLetterStroke(-0.055, 0.03, 0.11, 0.018, -Math.PI / 2);
  addLetterStroke(-0.81, 0, 0.12, 0.018, -Math.PI / 2);
  addLetterStroke(-0.055, -0.03, 0.11, 0.018, -Math.PI / 2);
  addLetterStroke(-0.0675, 0, 0.065, 0.018, 0);
  addLetterStroke(-0.0425, 0, 0.065, 0.018, 0);

  const cardinal_lettersGeom = new THREE.BoxGeometry(1, 1, 0.008);
  const cardinal_letters = new THREE.InstancedMesh(
    cardinal_lettersGeom,
    markingMat,
    letter_strokes.length
  );
  cardinal_letters.name = "cardinal_letters";
  const letter_dummy = new THREE.Object3D();
  for (let i = 0; i < letter_strokes.length; i++) {
    const stroke = letter_strokes[i];
    letter_dummy.position.set(stroke[0], stroke[1], 0.216);
    letter_dummy.rotation.set(0, 0, stroke[4]);
    letter_dummy.scale.set(stroke[2], stroke[3], 1);
    letter_dummy.updateMatrix();
    cardinal_letters.setMatrixAt(i, letter_dummy.matrix);
  }
  cardinal_letters.instanceMatrix.needsUpdate = true;
  dial_group.add(cardinal_letters);

  const dark_blade_shape = new THREE.Shape();
  dark_blade_shape.moveTo(-0.085, 0.13);
  dark_blade_shape.lineTo(0.085, 0.13);
  dark_blade_shape.lineTo(0, 0.98);
  dark_blade_shape.closePath();

  const dark_compass_bladesGeom = new THREE.ShapeGeometry(dark_blade_shape);
  const dark_compass_blades = new THREE.InstancedMesh(
    dark_compass_bladesGeom,
    markingMat,
    16
  );
  dark_compass_blades.name = "dark_compass_blades";
  const blade_dummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const alternate = i % 2 === 0;
    blade_dummy.position.set(0, 0, 0.218);
    blade_dummy.rotation.set(0, 0, alternate ? -angle : -(angle + Math.PI / 16));
    blade_dummy.scale.set(
      alternate ? 1 : 0.82,
      alternate ? 1 : 0.78,
      1
    );
    blade_dummy.updateMatrix();
    dark_compass_blades.setMatrixAt(i, blade_dummy.matrix);
  }
  dark_compass_blades.instanceMatrix.needsUpdate = true;
  dial_group.add(dark_compass_blades);

  const gold_blade_shape = new THREE.Shape();
  gold_blade_shape.moveTo(-0.11, 0.12);
  gold_blade_shape.lineTo(0.11, 0.12);
  gold_blade_shape.lineTo(0, 1.08);
  gold_blade_shape.closePath();

  const gold_compass_bladesGeom = new THREE.ShapeGeometry(gold_blade_shape);
  const gold_compass_blades = new THREE.InstancedMesh(
    gold_compass_bladesGeom,
    dark_goldMat,
    8
  );
  gold_compass_blades.name = "gold_compass_blades";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const major = i % 2 === 0;
    blade_dummy.position.set(0, 0, 0.222);
    blade_dummy.rotation.set(0, 0, -angle);
    blade_dummy.scale.set(major ? 1 : 0.78, major ? 1 : 0.82, 1);
    blade_dummy.updateMatrix();
    gold_compass_blades.setMatrixAt(i, blade_dummy.matrix);
  }
  gold_compass_blades.instanceMatrix.needsUpdate = true;
  dial_group.add(gold_compass_blades);

  const gold_blade_highlight_shape = new THREE.Shape();
  gold_blade_highlight_shape.moveTo(0, 0.14);
  gold_blade_highlight_shape.lineTo(0.105, 0.14);
  gold_blade_highlight_shape.lineTo(0, 1.065);
  gold_blade_highlight_shape.closePath();

  const gold_blade_highlightsGeom = new THREE.ShapeGeometry(gold_blade_highlight_shape);
  const gold_blade_highlights = new THREE.InstancedMesh(
    gold_blade_highlightsGeom,
    light_goldMat,
    8
  );
  gold_blade_highlights.name = "gold_blade_highlights";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const major = i % 2 === 0;
    blade_dummy.position.set(0, 0, 0.226);
    blade_dummy.rotation.set(0, 0, -angle);
    blade_dummy.scale.set(major ? 1 : 0.78, major ? 1 : 0.82, 1);
    blade_dummy.updateMatrix();
    gold_blade_highlights.setMatrixAt(i, blade_dummy.matrix);
  }
  gold_blade_highlights.instanceMatrix.needsUpdate = true;
  dial_group.add(gold_blade_highlights);

  const gold_blade_shadow_shape = new THREE.Shape();
  gold_blade_shadow_shape.moveTo(-0.105, 0.14);
  gold_blade_shadow_shape.lineTo(0, 0.14);
  gold_blade_shadow_shape.lineTo(0, 1.065);
  gold_blade_shadow_shape.closePath();

  const gold_blade_shadowsGeom = new THREE.ShapeGeometry(gold_blade_shadow_shape);
  const gold_blade_shadows = new THREE.InstancedMesh(
    gold_blade_shadowsGeom,
    polished_goldMat,
    8
  );
  gold_blade_shadows.name = "gold_blade_shadows";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const major = i % 2 === 0;
    blade_dummy.position.set(0, 0, 0.225);
    blade_dummy.rotation.set(0, 0, -angle);
    blade_dummy.scale.set(major ? 1 : 0.78, major ? 1 : 0.82, 1);
    blade_dummy.updateMatrix();
    gold_blade_shadows.setMatrixAt(i, blade_dummy.matrix);
  }
  gold_blade_shadows.instanceMatrix.needsUpdate = true;
  dial_group.add(gold_blade_shadows);

  const inner_bezelGeom = new THREE.TorusGeometry(1.16, 0.045, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, light_goldMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.24;
  case_group.add(inner_bezel);

  const glass_coverGeom = new THREE.CircleGeometry(1.12, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glass_coverMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.245;
  dial_group.add(glass_cover);

  const clear_gem_positions = [];
  const blue_gem_positions = [];
  const pink_gem_positions = [];

  for (let i = 0; i < 32; i++) {
    if (i === 4 || i === 12 || i === 20 || i === 28) {
      blue_gem_positions.push(i);
    } else if (i === 8 || i === 16 || i === 24) {
      pink_gem_positions.push(i);
    } else {
      clear_gem_positions.push(i);
    }
  }

  const gem_socketGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.026, 16);
  const gem_socketMat = polished_goldMat;

  function makeGemSocketInstances(positions, name) {
    const mesh = new THREE.InstancedMesh(gem_socketGeom, gem_socketMat, positions.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < positions.length; i++) {
      const index = positions[i];
      const angle = Math.PI / 2 + index / 32 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * 1.31,
        Math.sin(angle) * 1.31,
        0.225
      );
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const clear_gem_sockets = makeGemSocketInstances(clear_gem_positions, "clear_gem_sockets");
  const blue_gem_sockets = makeGemSocketInstances(blue_gem_positions, "blue_gem_sockets");
  const pink_gem_sockets = makeGemSocketInstances(pink_gem_positions, "pink_gem_sockets");
  jewel_group.add(clear_gem_sockets, blue_gem_sockets, pink_gem_sockets);

  const perimeter_gemsGeom = new THREE.CylinderGeometry(0.055, 0.09, 0.065, 10);

  function makeGemInstances(positions, material, name) {
    const mesh = new THREE.InstancedMesh(perimeter_gemsGeom, material, positions.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < positions.length; i++) {
      const index = positions[i];
      const angle = Math.PI / 2 + index / 32 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * 1.31,
        Math.sin(angle) * 1.31,
        0.265
      );
      dummy.rotation.set(Math.PI / 2, 0, angle);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const clear_gems = makeGemInstances(clear_gem_positions, clear_gemsMat, "clear_gems");
  const blue_gems = makeGemInstances(blue_gem_positions, blue_gemsMat, "blue_gems");
  const pink_gems = makeGemInstances(pink_gem_positions, pink_gemsMat, "pink_gems");
  jewel_group.add(clear_gems, blue_gems, pink_gems);

  const central_hubGeom = new THREE.CylinderGeometry(0.31, 0.31, 0.09, 48);
  const central_hub = new THREE.Mesh(central_hubGeom, polished_goldMat);
  central_hub.name = "central_hub";
  central_hub.rotation.x = Math.PI / 2;
  central_hub.position.z = 0.275;
  dial_group.add(central_hub);

  const central_hub_shadowGeom = new THREE.TorusGeometry(0.275, 0.035, 10, 48);
  const central_hub_shadow = new THREE.Mesh(central_hub_shadowGeom, dark_goldMat);
  central_hub_shadow.name = "central_hub_shadow";
  central_hub_shadow.position.z = 0.31;
  dial_group.add(central_hub_shadow);

  const central_hub_highlightGeom = new THREE.TorusGeometry(0.235, 0.025, 10, 48);
  const central_hub_highlight = new THREE.Mesh(central_hub_highlightGeom, light_goldMat);
  central_hub_highlight.name = "central_hub_highlight";
  central_hub_highlight.position.z = 0.322;
  dial_group.add(central_hub_highlight);

  const central_gem_baseGeom = new THREE.CylinderGeometry(0.225, 0.225, 0.055, 32);
  const central_gem_base = new THREE.Mesh(central_gem_baseGeom, central_gem_baseMat);
  central_gem_base.name = "central_gem_base";
  central_gem_base.rotation.x = Math.PI / 2;
  central_gem_base.position.z = 0.325;
  dial_group.add(central_gem_base);

  const central_gemGeom = new THREE.CylinderGeometry(0.17, 0.205, 0.085, 12);
  const central_gem = new THREE.Mesh(central_gemGeom, central_gemMat);
  central_gem.name = "central_gem";
  central_gem.rotation.x = Math.PI / 2;
  central_gem.position.z = 0.35;
  dial_group.add(central_gem);

  const central_gem_facetsGeom = new THREE.BufferGeometry();
  const facet_positions = [];
  const facet_colors = [];
  const facet_pallet = [
    0x0b4d9b,
    0x147fd5,
    0x50c8ff,
    0x063778,
    0x238de2,
    0x8adfff,
    0x0b61b7,
    0x36b9f4
  ];
  const facet_count = 12;
  for (let i = 0; i < facet_count; i++) {
    const angle0 = i / facet_count * Math.PI * 2;
    const angle1 = (i + 1) / facet_count * Math.PI * 2;
    facet_positions.push(
      0, 0, 0,
      Math.cos(angle0) * 0.168, Math.sin(angle0) * 0.168, 0,
      Math.cos(angle1) * 0.168, Math.sin(angle1) * 0.168, 0
    );
    const color = new THREE.Color(facet_pallet[i]);
    for (let j = 0; j < 3; j++) {
      facet_colors.push(color.r, color.g, color.b);
    }
  }
  central_gem_facetsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facet_positions, 3)
  );
  central_gem_facetsGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(facet_colors, 3)
  );
  central_gem_facetsGeom.computeVertexNormals();

  const central_gem_facets = new THREE.Mesh(
    central_gem_facetsGeom,
    central_gem_facetsMat
  );
  central_gem_facets.name = "central_gem_facets";
  central_gem_facets.position.z = 0.395;
  dial_group.add(central_gem_facets);

  const central_gem_glintGeom = new THREE.CircleGeometry(0.038, 3);
  const central_gem_glintMat = new THREE.MeshBasicMaterial({
    color: 0xa8efff,
    side: THREE.DoubleSide
  });
  const central_gem_glint = new THREE.Mesh(central_gem_glintGeom, central_gem_glintMat);
  central_gem_glint.name = "central_gem_glint";
  central_gem_glint.position.set(-0.055, 0.055, 0.398);
  central_gem_glint.rotation.z = 0.45;
  dial_group.add(central_gem_glint);

  const loop_mountGeom = new THREE.SphereGeometry(0.25, 24, 16);
  const loop_mount = new THREE.Mesh(loop_mountGeom, polished_goldMat);
  loop_mount.name = "loop_mount";
  loop_mount.position.set(0, 1.57, -0.035);
  loop_mount.scale.set(1, 0.78, 0.55);
  suspension_group.add(loop_mount);

  const suspension_loopGeom = new THREE.TorusGeometry(0.49, 0.075, 14, 48);
  const suspension_loop = new THREE.Mesh(suspension_loopGeom, polished_goldMat);
  suspension_loop.name = "suspension_loop";
  suspension_loop.position.set(0, 1.94, -0.055);
  suspension_loop.scale.set(1, 0.82, 1);
  suspension_group.add(suspension_loop);

  const suspension_loop_highlightGeom = new THREE.TorusGeometry(0.49, 0.022, 8, 48);
  const suspension_loop_highlight = new THREE.Mesh(
    suspension_loop_highlightGeom,
    light_goldMat
  );
  suspension_loop_highlight.name = "suspension_loop_highlight";
  suspension_loop_highlight.position.set(-0.012, 1.952, 0.022);
  suspension_loop_highlight.scale.set(1, 0.82, 1);
  suspension_group.add(suspension_loop_highlight);

  const loop_connectorGeom = new THREE.CylinderGeometry(0.09, 0.11, 0.28, 24);
  const loop_connector = new THREE.Mesh(loop_connectorGeom, polished_goldMat);
  loop_connector.name = "loop_connector";
  loop_connector.position.set(0, 1.52, -0.015);
  suspension_group.add(loop_connector);

  const loop_connector_collarGeom = new THREE.TorusGeometry(0.11, 0.025, 8, 24);
  const loop_connector_collar = new THREE.Mesh(
    loop_connector_collarGeom,
    light_goldMat
  );
  loop_connector_collar.name = "loop_connector_collar";
  loop_connector_collar.rotation.x = Math.PI / 2;
  loop_connector_collar.position.set(0, 1.43, -0.005);
  suspension_group.add(loop_connector_collar);

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