export default function generate(THREE) {
  const root = new THREE.Group();

  const case_group = new THREE.Group();
  const dial_group = new THREE.Group();
  const needle_group = new THREE.Group();
  const glass_group = new THREE.Group();
  root.add(case_group, dial_group, needle_group, glass_group);

  const outerR = 1.5;
  const faceR = 1.245;
  const caseH = 0.34;

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb88a35,
    metalness: 0.6,
    roughness: 0.2,
  });
  const bright_brassMat = new THREE.MeshStandardMaterial({
    color: 0xd5ad55,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x8d6727,
    metalness: 0.5,
    roughness: 0.35,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xe8dfbd,
    metalness: 0.0,
    roughness: 0.8,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x29302f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const faded_inkMat = new THREE.MeshStandardMaterial({
    color: 0x555b57,
    metalness: 0.0,
    roughness: 0.85,
  });
  const red_inkMat = new THREE.MeshStandardMaterial({
    color: 0x8f302b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f1ed,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });

  const case_bodyProfile = [
    new THREE.Vector2(0.0, -caseH * 0.5),
    new THREE.Vector2(1.31, -caseH * 0.5),
    new THREE.Vector2(1.41, -0.16),
    new THREE.Vector2(1.48, -0.09),
    new THREE.Vector2(outerR, 0.015),
    new THREE.Vector2(1.47, 0.115),
    new THREE.Vector2(1.405, 0.18),
    new THREE.Vector2(1.33, 0.205),
    new THREE.Vector2(0.0, 0.205),
  ];
  const case_bodyGeom = new THREE.LatheGeometry(case_bodyProfile, 96);
  const case_body = new THREE.Mesh(case_bodyGeom, brassMat);
  case_group.add(case_body);

  const case_side_bandGeom = new THREE.CylinderGeometry(1.493, 1.493, 0.105, 96);
  const case_side_band = new THREE.Mesh(case_side_bandGeom, dark_brassMat);
  case_side_band.position.y = -0.065;
  case_group.add(case_side_band);

  const case_bottom_ringGeom = new THREE.TorusGeometry(1.35, 0.045, 10, 96);
  const case_bottom_ring = new THREE.Mesh(case_bottom_ringGeom, dark_brassMat);
  case_bottom_ring.rotation.x = Math.PI / 2;
  case_bottom_ring.position.y = -0.165;
  case_group.add(case_bottom_ring);

  const bezel_plateGeom = new THREE.RingGeometry(1.255, 1.455, 96);
  const bezel_plate = new THREE.Mesh(bezel_plateGeom, bright_brassMat);
  bezel_plate.rotation.x = -Math.PI / 2;
  bezel_plate.position.y = 0.246;
  case_group.add(bezel_plate);

  const outer_bezelGeom = new THREE.TorusGeometry(1.405, 0.072, 14, 96);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, bright_brassMat);
  outer_bezel.rotation.x = Math.PI / 2;
  outer_bezel.position.y = 0.247;
  case_group.add(outer_bezel);

  const bezel_highlightGeom = new THREE.TorusGeometry(1.43, 0.022, 8, 96);
  const bezel_highlight = new THREE.Mesh(bezel_highlightGeom, bright_brassMat);
  bezel_highlight.rotation.x = Math.PI / 2;
  bezel_highlight.position.y = 0.302;
  case_group.add(bezel_highlight);

  const inner_bezelGeom = new THREE.TorusGeometry(1.278, 0.038, 10, 96);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, brassMat);
  inner_bezel.rotation.x = Math.PI / 2;
  inner_bezel.position.y = 0.267;
  case_group.add(inner_bezel);

  const dial_recessGeom = new THREE.CylinderGeometry(1.31, 1.31, 0.055, 96);
  const dial_recess = new THREE.Mesh(dial_recessGeom, dark_brassMat);
  dial_recess.position.y = 0.225;
  case_group.add(dial_recess);

  const dial_faceGeom = new THREE.CylinderGeometry(faceR, faceR, 0.024, 96);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.position.y = 0.258;
  dial_group.add(dial_face);

  const dial_outer_borderGeom = new THREE.TorusGeometry(1.218, 0.009, 6, 96);
  const dial_outer_border = new THREE.Mesh(dial_outer_borderGeom, inkMat);
  dial_outer_border.rotation.x = Math.PI / 2;
  dial_outer_border.position.y = 0.278;
  dial_group.add(dial_outer_border);

  const dial_inner_borderGeom = new THREE.TorusGeometry(1.155, 0.005, 6, 96);
  const dial_inner_border = new THREE.Mesh(dial_inner_borderGeom, faded_inkMat);
  dial_inner_border.rotation.x = Math.PI / 2;
  dial_inner_border.position.y = 0.278;
  dial_group.add(dial_inner_border);

  const grid_ringGeom = new THREE.TorusGeometry(1, 0.006, 6, 96);

  const grid_ring_1 = new THREE.Mesh(grid_ringGeom, faded_inkMat);
  grid_ring_1.rotation.x = Math.PI / 2;
  grid_ring_1.position.y = 0.274;
  grid_ring_1.scale.set(0.34, 1, 0.34);
  dial_group.add(grid_ring_1);

  const grid_ring_2 = new THREE.Mesh(grid_ringGeom, faded_inkMat);
  grid_ring_2.rotation.x = Math.PI / 2;
  grid_ring_2.position.y = 0.274;
  grid_ring_2.scale.set(0.62, 1, 0.62);
  dial_group.add(grid_ring_2);

  const grid_ring_3 = new THREE.Mesh(grid_ringGeom, faded_inkMat);
  grid_ring_3.rotation.x = Math.PI / 2;
  grid_ring_3.position.y = 0.274;
  grid_ring_3.scale.set(0.88, 1, 0.88);
  dial_group.add(grid_ring_3);

  const latitude_lineGeom = new THREE.BoxGeometry(1, 0.004, 0.007);
  const latitude_lines = new THREE.InstancedMesh(latitude_lineGeom, faded_inkMat, 5);
  const latitude_offsets = [-0.72, -0.36, 0, 0.36, 0.72];
  const latitude_matrix = new THREE.Matrix4();
  const latitude_quaternion = new THREE.Quaternion();
  for (let i = 0; i < latitude_offsets.length; i++) {
    const z = latitude_offsets[i];
    const length = 2 * Math.sqrt(Math.max(0, 1.08 * 1.08 - z * z));
    latitude_matrix.compose(
      new THREE.Vector3(0, 0.273, z),
      latitude_quaternion,
      new THREE.Vector3(length, 1, 1)
    );
    latitude_lines.setMatrixAt(i, latitude_matrix);
  }
  latitude_lines.instanceMatrix.needsUpdate = true;
  dial_group.add(latitude_lines);

  const longitude_lineGeom = new THREE.BoxGeometry(0.007, 0.004, 1);
  const longitude_lines = new THREE.InstancedMesh(longitude_lineGeom, faded_inkMat, 5);
  const longitude_offsets = [-0.72, -0.36, 0, 0.36, 0.72];
  const longitude_matrix = new THREE.Matrix4();
  const longitude_quaternion = new THREE.Quaternion();
  for (let i = 0; i < longitude_offsets.length; i++) {
    const x = longitude_offsets[i];
    const length = 2 * Math.sqrt(Math.max(0, 1.08 * 1.08 - x * x));
    longitude_matrix.compose(
      new THREE.Vector3(x, 0.273, 0),
      longitude_quaternion,
      new THREE.Vector3(1, 1, length)
    );
    longitude_lines.setMatrixAt(i, longitude_matrix);
  }
  longitude_lines.instanceMatrix.needsUpdate = true;
  dial_group.add(longitude_lines);

  const minor_tickGeom = new THREE.BoxGeometry(0.011, 0.006, 0.058);
  const minor_ticks = new THREE.InstancedMesh(minor_tickGeom, inkMat, 60);
  const major_tickGeom = new THREE.BoxGeometry(0.017, 0.007, 0.105);
  const major_ticks = new THREE.InstancedMesh(major_tickGeom, inkMat, 12);
  const tick_matrix = new THREE.Matrix4();
  const tick_quaternion = new THREE.Quaternion();
  const tick_scale = new THREE.Vector3(1, 1, 1);
  let minor_index = 0;
  let major_index = 0;
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    const is_major = i % 6 === 0;
    const radius = is_major ? 1.19 : 1.207;
    tick_quaternion.setFromEuler(new THREE.Euler(0, angle, 0));
    tick_matrix.compose(
      new THREE.Vector3(
        Math.sin(angle) * radius,
        0.281,
        Math.cos(angle) * radius
      ),
      tick_quaternion,
      tick_scale
    );
    if (is_major) {
      major_ticks.setMatrixAt(major_index++, tick_matrix);
    } else {
      minor_ticks.setMatrixAt(minor_index++, tick_matrix);
    }
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks, major_ticks);

  const coastline_paths = [
    [[-0.92, 0.18], [-0.83, 0.36], [-0.65, 0.47], [-0.50, 0.42], [-0.42, 0.28], [-0.27, 0.22], [-0.31, 0.08], [-0.22, -0.02], [-0.34, -0.13], [-0.39, -0.31], [-0.55, -0.43], [-0.70, -0.34], [-0.76, -0.17], [-0.91, -0.05]],
    [[-0.18, 0.31], [-0.02, 0.42], [0.16, 0.36], [0.25, 0.23], [0.18, 0.10], [0.29, 0.00], [0.20, -0.13], [0.05, -0.17], [-0.04, -0.05], [-0.17, 0.04]],
    [[0.38, 0.55], [0.58, 0.52], [0.76, 0.38], [0.89, 0.20], [0.82, 0.05], [0.91, -0.10], [0.77, -0.28], [0.57, -0.34], [0.43, -0.20], [0.48, -0.03], [0.35, 0.13], [0.45, 0.29]],
    [[-0.79, -0.57], [-0.65, -0.51], [-0.53, -0.60], [-0.38, -0.70], [-0.18, -0.66], [-0.08, -0.55], [-0.22, -0.48], [-0.42, -0.52], [-0.58, -0.45], [-0.73, -0.48]],
    [[0.25, -0.48], [0.40, -0.55], [0.56, -0.51], [0.67, -0.40], [0.58, -0.31], [0.43, -0.34], [0.34, -0.40]],
    [[-0.12, 0.68], [0.00, 0.73], [0.13, 0.68], [0.17, 0.58], [0.08, 0.53], [-0.03, 0.58]],
  ];
  const coastline_vertices = [];
  for (const path of coastline_paths) {
    for (let i = 0; i < path.length - 1; i++) {
      coastline_vertices.push(
        path[i][0], 0.282, path[i][1],
        path[i + 1][0], 0.282, path[i + 1][1]
      );
    }
  }
  const coastlineGeom = new THREE.BufferGeometry();
  coastlineGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(coastline_vertices, 3)
  );
  const coastlineMat = new THREE.LineBasicMaterial({ color: 0x303634 });
  const coastlines = new THREE.LineSegments(coastlineGeom, coastlineMat);
  dial_group.add(coastlines);

  const rose_spokeGeom = new THREE.BoxGeometry(0.007, 0.004, 0.82);
  const rose_spokes = new THREE.InstancedMesh(rose_spokeGeom, faded_inkMat, 8);
  const rose_matrix = new THREE.Matrix4();
  const rose_quaternion = new THREE.Quaternion();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    rose_quaternion.setFromEuler(new THREE.Euler(0, angle, 0));
    rose_matrix.compose(
      new THREE.Vector3(Math.sin(angle) * 0.41, 0.276, Math.cos(angle) * 0.41),
      rose_quaternion,
      tick_scale
    );
    rose_spokes.setMatrixAt(i, rose_matrix);
  }
  rose_spokes.instanceMatrix.needsUpdate = true;
  dial_group.add(rose_spokes);

  const map_marker_positions = [
    [-0.69, 0.16], [-0.54, -0.24], [-0.12, 0.28], [0.18, 0.15],
    [0.52, 0.31], [0.68, -0.12], [0.42, -0.47], [-0.31, -0.58],
  ];
  const map_markerGeom = new THREE.TorusGeometry(0.025, 0.004, 6, 20);
  const map_markers = new THREE.InstancedMesh(
    map_markerGeom,
    faded_inkMat,
    map_marker_positions.length
  );
  const marker_matrix = new THREE.Matrix4();
  const marker_quaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  for (let i = 0; i < map_marker_positions.length; i++) {
    marker_matrix.compose(
      new THREE.Vector3(
        map_marker_positions[i][0],
        0.285,
        map_marker_positions[i][1]
      ),
      marker_quaternion,
      tick_scale
    );
    map_markers.setMatrixAt(i, marker_matrix);
  }
  map_markers.instanceMatrix.needsUpdate = true;
  dial_group.add(map_markers);

  const label_strokeGeom = new THREE.BoxGeometry(1, 0.006, 0.014);
  const label_strokes = new THREE.InstancedMesh(label_strokeGeom, inkMat, 24);
  const label_matrix = new THREE.Matrix4();
  const label_quaternion = new THREE.Quaternion();
  let label_index = 0;
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const radius = 0.91;
    const centerX = Math.sin(angle) * radius;
    const centerZ = Math.cos(angle) * radius;
    label_quaternion.setFromEuler(new THREE.Euler(0, angle, 0));

    label_matrix.compose(
      new THREE.Vector3(centerX - 0.038, 0.284, centerZ),
      label_quaternion,
      new THREE.Vector3(0.018, 1, 0.11)
    );
    label_strokes.setMatrixAt(label_index++, label_matrix);

    label_matrix.compose(
      new THREE.Vector3(centerX + 0.038, 0.284, centerZ),
      label_quaternion,
      new THREE.Vector3(0.018, 1, 0.11)
    );
    label_strokes.setMatrixAt(label_index++, label_matrix);

    label_matrix.compose(
      new THREE.Vector3(centerX, 0.284, centerZ),
      label_quaternion,
      new THREE.Vector3(0.09, 1, 0.014)
    );
    label_strokes.setMatrixAt(label_index++, label_matrix);
  }
  label_strokes.instanceMatrix.needsUpdate = true;
  dial_group.add(label_strokes);

  const cardinal_markerGeom = new THREE.CylinderGeometry(0.036, 0.036, 0.007, 18);
  const cardinal_markers = new THREE.InstancedMesh(cardinal_markerGeom, red_inkMat, 4);
  const cardinal_matrix = new THREE.Matrix4();
  const cardinal_quaternion = new THREE.Quaternion();
  for (let i = 0; i < 4; i++) {
    const angle = i / 4 * Math.PI * 2;
    cardinal_matrix.compose(
      new THREE.Vector3(
        Math.sin(angle) * 1.075,
        0.284,
        Math.cos(angle) * 1.075
      ),
      cardinal_quaternion,
      tick_scale
    );
    cardinal_markers.setMatrixAt(i, cardinal_matrix);
  }
  cardinal_markers.instanceMatrix.needsUpdate = true;
  dial_group.add(cardinal_markers);

  const dark_needleShape = new THREE.Shape();
  dark_needleShape.moveTo(0, 1.02);
  dark_needleShape.lineTo(-0.055, 0.18);
  dark_needleShape.lineTo(-0.065, 0);
  dark_needleShape.lineTo(-0.045, -0.82);
  dark_needleShape.lineTo(0, -1.0);
  dark_needleShape.lineTo(0.045, -0.82);
  dark_needleShape.lineTo(0.065, 0);
  dark_needleShape.lineTo(0.055, 0.18);
  dark_needleShape.closePath();

  const dark_needleGeom = new THREE.ExtrudeGeometry(dark_needleShape, {
    depth: 0.016,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const dark_needle = new THREE.Mesh(dark_needleGeom, dark_metalMat);
  dark_needle.rotation.x = Math.PI / 2;
  dark_needle.position.y = 0.316;
  needle_group.add(dark_needle);

  const silver_needleShape = new THREE.Shape();
  silver_needleShape.moveTo(0, 0.96);
  silver_needleShape.lineTo(-0.082, 0.12);
  silver_needleShape.lineTo(-0.07, 0);
  silver_needleShape.lineTo(-0.055, -0.78);
  silver_needleShape.lineTo(0, -0.94);
  silver_needleShape.lineTo(0.055, -0.78);
  silver_needleShape.lineTo(0.07, 0);
  silver_needleShape.lineTo(0.082, 0.12);
  silver_needleShape.closePath();

  const silver_needleGeom = new THREE.ExtrudeGeometry(silver_needleShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const silver_needle = new THREE.Mesh(silver_needleGeom, silverMat);
  silver_needle.rotation.x = Math.PI / 2;
  silver_needle.rotation.y = Math.PI / 2;
  silver_needle.position.y = 0.327;
  needle_group.add(silver_needle);

  const red_needle_tipShape = new THREE.Shape();
  red_needle_tipShape.moveTo(0, 1.02);
  red_needle_tipShape.lineTo(-0.055, 0.78);
  red_needle_tipShape.lineTo(0.055, 0.78);
  red_needle_tipShape.closePath();

  const red_needle_tipGeom = new THREE.ExtrudeGeometry(red_needle_tipShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const red_needle_tip = new THREE.Mesh(red_needle_tipGeom, red_inkMat);
  red_needle_tip.rotation.x = Math.PI / 2;
  red_needle_tip.position.y = 0.334;
  needle_group.add(red_needle_tip);

  const pivot_baseGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.045, 32);
  const pivot_base = new THREE.Mesh(pivot_baseGeom, dark_brassMat);
  pivot_base.position.y = 0.326;
  needle_group.add(pivot_base);

  const pivot_collarGeom = new THREE.CylinderGeometry(0.105, 0.115, 0.055, 32);
  const pivot_collar = new THREE.Mesh(pivot_collarGeom, bright_brassMat);
  pivot_collar.position.y = 0.356;
  needle_group.add(pivot_collar);

  const pivot_ringGeom = new THREE.TorusGeometry(0.086, 0.018, 8, 32);
  const pivot_ring = new THREE.Mesh(pivot_ringGeom, dark_brassMat);
  pivot_ring.rotation.x = Math.PI / 2;
  pivot_ring.position.y = 0.383;
  needle_group.add(pivot_ring);

  const pivot_capGeom = new THREE.CylinderGeometry(0.075, 0.088, 0.05, 32);
  const pivot_cap = new THREE.Mesh(pivot_capGeom, bright_brassMat);
  pivot_cap.position.y = 0.405;
  needle_group.add(pivot_cap);

  const pivot_screwGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.026, 24);
  const pivot_screw = new THREE.Mesh(pivot_screwGeom, silverMat);
  pivot_screw.position.y = 0.444;
  needle_group.add(pivot_screw);

  const pivot_slotGeom = new THREE.BoxGeometry(0.055, 0.006, 0.011);
  const pivot_slot = new THREE.Mesh(pivot_slotGeom, dark_metalMat);
  pivot_slot.position.y = 0.46;
  pivot_slot.rotation.y = 0.35;
  needle_group.add(pivot_slot);

  const glass_coverGeom = new THREE.CylinderGeometry(1.242, 1.242, 0.012, 96);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.position.y = 0.355;
  glass_group.add(glass_cover);

  const glass_edgeGeom = new THREE.TorusGeometry(1.235, 0.012, 8, 96);
  const glass_edge = new THREE.Mesh(glass_edgeGeom, glassMat);
  glass_edge.rotation.x = Math.PI / 2;
  glass_edge.position.y = 0.362;
  glass_group.add(glass_edge);

  const glass_highlightGeom = new THREE.TorusGeometry(
    0.88,
    0.012,
    6,
    40,
    Math.PI * 0.62
  );
  const glass_highlight = new THREE.Mesh(glass_highlightGeom, glass_highlightMat);
  glass_highlight.rotation.x = Math.PI / 2;
  glass_highlight.rotation.y = -0.7;
  glass_highlight.position.y = 0.366;
  glass_group.add(glass_highlight);

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