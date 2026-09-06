export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gaming_keyboard";

  const chassis_group = new THREE.Group();
  chassis_group.name = "chassis_group";
  const keybed_group = new THREE.Group();
  keybed_group.name = "keybed_group";
  const key_group = new THREE.Group();
  key_group.name = "key_group";
  const control_group = new THREE.Group();
  control_group.name = "control_group";
  const branding_group = new THREE.Group();
  branding_group.name = "branding_group";
  root.add(chassis_group, keybed_group, key_group, control_group, branding_group);

  const chassisMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    metalness: 0.0,
    roughness: 0.8
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x3a3d43,
    metalness: 0.6,
    roughness: 0.5
  });
  const switchMat = new THREE.MeshStandardMaterial({
    color: 0x090b0f,
    metalness: 0.0,
    roughness: 0.8
  });
  const dark_keycapMat = new THREE.MeshStandardMaterial({
    color: 0x111317,
    metalness: 0.0,
    roughness: 0.8
  });
  const light_keycapMat = new THREE.MeshStandardMaterial({
    color: 0xe8e9eb,
    metalness: 0.0,
    roughness: 0.8
  });
  const blue_light_keycapMat = new THREE.MeshStandardMaterial({
    color: 0x2449d8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x2449d8,
    emissiveIntensity: 1.0
  });
  const blue_glowMat = new THREE.MeshStandardMaterial({
    color: 0x2458ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x2458ff,
    emissiveIntensity: 1.0
  });
  const dark_legendMat = new THREE.MeshStandardMaterial({
    color: 0x25272b,
    metalness: 0.0,
    roughness: 0.8
  });
  const light_legendMat = new THREE.MeshStandardMaterial({
    color: 0xd6d8dc,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.8
  });

  function makeChamferedPrism(width, depth, height, corner, bevel) {
    const half_width = width * 0.5;
    const half_depth = depth * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(-half_width + corner, -half_depth);
    shape.lineTo(half_width - corner, -half_depth);
    shape.lineTo(half_width, -half_depth + corner);
    shape.lineTo(half_width, half_depth - corner);
    shape.lineTo(half_width - corner, half_depth);
    shape.lineTo(-half_width + corner, half_depth);
    shape.lineTo(-half_width, half_depth - corner);
    shape.lineTo(-half_width, -half_depth + corner);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: bevel > 0 ? 2 : 1
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  const keyboard_baseGeom = makeChamferedPrism(7.28, 2.80, 0.16, 0.15, 0.025);
  const keyboard_base = new THREE.Mesh(keyboard_baseGeom, chassisMat);
  keyboard_base.name = "keyboard_base";
  keyboard_base.position.y = 0.025;
  chassis_group.add(keyboard_base);

  const top_plateGeom = makeChamferedPrism(7.08, 2.60, 0.055, 0.12, 0.012);
  const top_plate = new THREE.Mesh(top_plateGeom, edgeMat);
  top_plate.name = "top_plate";
  top_plate.position.y = 0.185;
  chassis_group.add(top_plate);

  const front_edge_trimGeom = new THREE.BoxGeometry(6.92, 0.045, 0.035);
  const front_edge_trim = new THREE.Mesh(front_edge_trimGeom, edgeMat);
  front_edge_trim.name = "front_edge_trim";
  front_edge_trim.position.set(0, 0.125, 1.405);
  chassis_group.add(front_edge_trim);

  const rear_edge_trimGeom = new THREE.BoxGeometry(6.82, 0.035, 0.025);
  const rear_edge_trim = new THREE.Mesh(rear_edge_trimGeom, edgeMat);
  rear_edge_trim.name = "rear_edge_trim";
  rear_edge_trim.position.set(0, 0.16, -1.39);
  chassis_group.add(rear_edge_trim);

  const rubber_feetGeom = new THREE.BoxGeometry(0.42, 0.07, 0.17);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const foot_positions = [
    [-3.05, -0.035, -1.12],
    [3.05, -0.035, -1.12],
    [-3.05, -0.035, 1.12],
    [3.05, -0.035, 1.12]
  ];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  chassis_group.add(rubber_feet);

  const unit = 0.40;
  const key_gap = 0.055;
  const row_pitch = 0.39;
  const key_base_y = 0.255;
  const main_left = -3.42;
  const nav_start = 0.55;
  const numpad_start = 1.67;

  const key_positions = [];
  const dark_positions = [];
  const light_positions = [];
  const blue_positions = [];
  const dark_legend_positions = [];
  const light_legend_positions = [];

  function addKeyUnit(x, z, width_units, depth_units, tone, legend_tone) {
    const record = {
      x,
      z,
      w: width_units * unit,
      d: depth_units * unit
    };
    key_positions.push(record);
    if (tone === "dark") {
      dark_positions.push(record);
      if (legend_tone !== "none") light_legend_positions.push(record);
    } else if (tone === "light") {
      light_positions.push(record);
      dark_legend_positions.push(record);
    } else {
      blue_positions.push(record);
      light_legend_positions.push(record);
    }
  }

  function addRow(z, entries, row_index) {
    let cursor = main_left;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const width = entry[0];
      const tone = entry[1];
      const legend_tone = entry[2];
      const center_x = cursor + width * unit * 0.5;
      addKeyUnit(
        center_x,
        z,
        width,
        1,
        tone,
        legend_tone === undefined ? tone : legend_tone
      );
      cursor += (width + key_gap) * unit;
    }
  }

  const function_row = [];
  addKeyUnit(main_left + unit * 0.5, -1.15, 1, 1, "dark", "light");
  for (let i = 0; i < 4; i++) {
    function_row.push([1, "dark"]);
  }
  function_row.push([0.6, "dark", "none"]);
  for (let i = 0; i < 4; i++) {
    function_row.push([1, "dark"]);
  }
  function_row.push([0.6, "dark", "none"]);
  for (let i = 0; i < 4; i++) {
    function_row.push([1, "dark"]);
  }
  function_row.push([1, "blue"]);
  addRow(-1.15, function_row, 0);

  const number_widths = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 1
  ];
  const number_tones = [
    "blue", "light", "light", "light", "light", "light", "light",
    "light", "light", "light", "light", "light", "light", "dark", "dark"
  ];
  const number_row = [];
  for (let i = 0; i < number_widths.length; i++) {
    number_row.push([
      number_widths[i],
      number_tones[i],
      number_tones[i] === "light" ? "dark" : "light"
    ]);
  }
  addRow(-0.76, number_row, 1);

  const q_row = [];
  q_row.push([1.5, "dark"]);
  for (let i = 0; i < 12; i++) q_row.push([1, "light"]);
  q_row.push([1.5, "dark"]);
  addRow(-0.37, q_row, 2);

  const a_row = [];
  a_row.push([1.75, "dark"]);
  for (let i = 0; i < 11; i++) a_row.push([1, "light"]);
  a_row.push([2.25, "dark"]);
  addRow(0.02, a_row, 3);

  const z_row = [];
  z_row.push([2.25, "dark"]);
  for (let i = 0; i < 10; i++) z_row.push([1, "light"]);
  z_row.push([2.75, "dark"]);
  addRow(0.41, z_row, 4);

  const bottom_row = [];
  bottom_row.push([1.25, "dark"]);
  bottom_row.push([1.25, "dark"]);
  bottom_row.push([1.25, "dark"]);
  bottom_row.push([6.25, "light"]);
  bottom_row.push([1.25, "dark"]);
  bottom_row.push([1.25, "dark"]);
  bottom_row.push([1.25, "dark"]);
  addRow(0.80, bottom_row, 5);

  const navigation_widths = [1, 1, 1, 1, 1, 1];
  const navigation_tones = [
    "dark", "blue", "blue", "dark", "light", "light"
  ];
  const navigation_row = [];
  for (let i = 0; i < navigation_widths.length; i++) {
    navigation_row.push([
      navigation_widths[i],
      navigation_tones[i],
      navigation_tones[i] === "light" ? "dark" : "light"
    ]);
  }
  addRow(-0.76, navigation_row, 6);

  const arrow_tones = ["light", "blue", "light", "light"];
  const arrow_widths = [1, 1, 1, 1.5];
  const arrow_row = [];
  for (let i = 0; i < arrow_widths.length; i++) {
    arrow_row.push([
      arrow_widths[i],
      arrow_tones[i],
      arrow_tones[i] === "light" ? "dark" : "light"
    ]);
  }
  addRow(0.41, arrow_row, 7);

  const numpad_widths = [1, 1, 1, 1.5];
  const numpad_tones = ["blue", "light", "light", "light"];
  const numpad_top_row = [];
  for (let i = 0; i < numpad_widths.length; i++) {
    numpad_top_row.push([
      numpad_widths[i],
      numpad_tones[i],
      numpad_tones[i] === "light" ? "dark" : "light"
    ]);
  }
  addRow(-0.76, numpad_top_row, 8);

  const numpad_middle_row = [];
  for (let i = 0; i < 4; i++) {
    numpad_middle_row.push([1, "light", "dark"]);
  }
  numpad_middle_row.push([1, "light"]);
  addRow(-0.37, numpad_middle_row, 9);

  const numpad_lower_row = [];
  for (let i = 0; i < 4; i++) {
    numpad_lower_row.push([1, "light", "dark"]);
  }
  numpad_lower_row.push([2, "light"]);
  addRow(0.02, numpad_lower_row, 10);

  const numpad_bottom_row = [];
  for (let i = 0; i < 3; i++) {
    numpad_bottom_row.push([1, "light", "dark"]);
  }
  numpad_bottom_row.push([2.5, "light"]);
  addRow(0.41, numpad_bottom_row, 11);

  const numpad_lower_left = numpad_start + 3 * (unit + key_gap);
  const numpad_lower_right = numpad_start + 5 * (unit + key_gap);
  addKeyUnit(
    numpad_lower_left + unit * 0.5,
    0.80,
    1,
    1,
    "light",
    "dark"
  );
  addKeyUnit(
    numpad_lower_right + unit * 0.5,
    0.80,
    1,
    1,
    "light",
    "dark"
  );

  const switch_backlightGeom = makeChamferedPrism(unit, unit, 0.025, 0.055, 0.004);
  const switch_backlights = new THREE.InstancedMesh(
    switch_backlightGeom,
    blue_glowMat,
    key_positions.length
  );
  switch_backlights.name = "switch_backlights";
  for (let i = 0; i < key_positions.length; i++) {
    const key = key_positions[i];
    dummy.position.set(key.x, 0.245, key.z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(key.w / unit, 1, key.d / unit);
    dummy.updateMatrix();
    switch_backlights.setMatrixAt(i, dummy.matrix);
  }
  switch_backlights.instanceMatrix.needsUpdate = true;
  keybed_group.add(switch_backlights);

  const switch_stemGeom = new THREE.BoxGeometry(0.13, 0.13, 0.13);
  const switch_stems = new THREE.InstancedMesh(
    switch_stemGeom,
    switchMat,
    key_positions.length
  );
  switch_stems.name = "switch_stems";
  for (let i = 0; i < key_positions.length; i++) {
    const key = key_positions[i];
    dummy.position.set(key.x, 0.315, key.z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    switch_stems.setMatrixAt(i, dummy.matrix);
  }
  switch_stems.instanceMatrix.needsUpdate = true;
  keybed_group.add(switch_stems);

  const keycapGeom = makeChamferedPrism(unit, unit, 0.18, 0.065, 0.022);

  function populateKeycaps(mesh, positions) {
    for (let i = 0; i < positions.length; i++) {
      const key = positions[i];
      dummy.position.set(key.x, key_base_y, key.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(
        (key.w - key_gap) / unit,
        1,
        (key.d - key_gap) / unit
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const dark_keycaps = new THREE.InstancedMesh(
    keycapGeom,
    dark_keycapMat,
    dark_positions.length
  );
  dark_keycaps.name = "dark_keycaps";
  populateKeycaps(dark_keycaps, dark_positions);
  key_group.add(dark_keycaps);

  const light_keycaps = new THREE.InstancedMesh(
    keycapGeom,
    light_keycapMat,
    light_positions.length
  );
  light_keycaps.name = "light_keycaps";
  populateKeycaps(light_keycaps, light_positions);
  key_group.add(light_keycaps);

  const blue_light_keycaps = new THREE.InstancedMesh(
    keycapGeom,
    blue_light_keycapMat,
    blue_positions.length
  );
  blue_light_keycaps.name = "blue_light_keycaps";
  populateKeycaps(blue_light_keycaps, blue_positions);
  key_group.add(blue_light_keycaps);

  const key_legendGeom = new THREE.BoxGeometry(0.065, 0.006, 0.018);

  function populateLegends(mesh, positions) {
    for (let i = 0; i < positions.length; i++) {
      const key = positions[i];
      const offset_x = key.w > unit * 1.25 ? -key.w * 0.16 : 0;
      const offset_z = key.d > unit * 1.25 ? -key.d * 0.16 : 0;
      dummy.position.set(key.x + offset_x, 0.462, key.z + offset_z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const dark_key_legends = new THREE.InstancedMesh(
    key_legendGeom,
    dark_legendMat,
    dark_legend_positions.length
  );
  dark_key_legends.name = "dark_key_legends";
  populateLegends(dark_key_legends, dark_legend_positions);
  key_group.add(dark_key_legends);

  const light_key_legends = new THREE.InstancedMesh(
    key_legendGeom,
    light_legendMat,
    light_legend_positions.length
  );
  light_key_legends.name = "light_key_legends";
  populateLegends(light_key_legends, light_legend_positions);
  key_group.add(light_key_legends);

  const spacebar_legendGeom = new THREE.BoxGeometry(0.24, 0.006, 0.018);
  const spacebar_legend = new THREE.Mesh(spacebar_legendGeom, dark_legendMat);
  spacebar_legend.name = "spacebar_legend";
  spacebar_legend.position.set(-0.08, 0.462, 0.80);
  key_group.add(spacebar_legend);

  const media_buttonGeom = makeChamferedPrism(0.17, 0.15, 0.075, 0.025, 0.008);
  const media_buttons = new THREE.InstancedMesh(
    media_buttonGeom,
    dark_keycapMat,
    3
  );
  media_buttons.name = "media_buttons";
  const media_x = [2.08, 2.48, 2.88];
  for (let i = 0; i < media_x.length; i++) {
    dummy.position.set(media_x[i], 0.245, -1.15);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    media_buttons.setMatrixAt(i, dummy.matrix);
  }
  media_buttons.instanceMatrix.needsUpdate = true;
  control_group.add(media_buttons);

  const volume_dialGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.085, 24);
  const volume_dial = new THREE.Mesh(volume_dialGeom, dark_keycapMat);
  volume_dial.name = "volume_dial";
  volume_dial.position.set(3.27, 0.30, -1.15);
  control_group.add(volume_dial);

  const volume_dial_ringGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 24);
  const volume_dial_ring = new THREE.Mesh(volume_dial_ringGeom, blue_glowMat);
  volume_dial_ring.name = "volume_dial_ring";
  volume_dial_ring.rotation.x = Math.PI / 2;
  volume_dial_ring.position.set(3.27, 0.347, -1.15);
  control_group.add(volume_dial_ring);

  const volume_dial_markerGeom = new THREE.BoxGeometry(0.025, 0.008, 0.075);
  const volume_dial_marker = new THREE.Mesh(
    volume_dial_markerGeom,
    light_legendMat
  );
  volume_dial_marker.name = "volume_dial_marker";
  volume_dial_marker.position.set(3.27, 0.351, -1.10);
  control_group.add(volume_dial_marker);

  const status_lightGeom = new THREE.BoxGeometry(0.075, 0.012, 0.025);
  const status_lights = new THREE.InstancedMesh(status_lightGeom, blue_glowMat, 3);
  status_lights.name = "status_lights";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(2.08 + i * 0.23, 0.247, -1.31);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    status_lights.setMatrixAt(i, dummy.matrix);
  }
  status_lights.instanceMatrix.needsUpdate = true;
  control_group.add(status_lights);

  const brand_mark_leftGeom = new THREE.BoxGeometry(0.18, 0.012, 0.035);
  const brand_mark_left = new THREE.Mesh(brand_mark_leftGeom, light_legendMat);
  brand_mark_left.name = "brand_mark_left";
  brand_mark_left.position.set(1.70, 0.258, -1.18);
  brand_mark_left.rotation.y = -0.28;
  branding_group.add(brand_mark_left);

  const brand_mark_rightGeom = new THREE.BoxGeometry(0.18, 0.012, 0.035);
  const brand_mark_right = new THREE.Mesh(brand_mark_rightGeom, light_legendMat);
  brand_mark_right.name = "brand_mark_right";
  brand_mark_right.position.set(1.82, 0.258, -1.18);
  brand_mark_right.rotation.y = 0.28;
  branding_group.add(brand_mark_right);

  const brand_subtitleGeom = new THREE.BoxGeometry(0.30, 0.008, 0.014);
  const brand_subtitle = new THREE.Mesh(brand_subtitleGeom, light_legendMat);
  brand_subtitle.name = "brand_subtitle";
  brand_subtitle.position.set(1.76, 0.258, -1.08);
  branding_group.add(brand_subtitle);

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