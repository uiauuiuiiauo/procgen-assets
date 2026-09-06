export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "camper_van";

  const vehicle_length = 4.8;
  const vehicle_width = 1.82;
  const body_bottom = 0.48;
  const wheel_radius = 0.50;
  const wheel_y = 0.50;
  const wheel_x = 0.93;
  const front_axle_z = 1.45;
  const rear_axle_z = -1.45;
  const canvas_width = 1.72;
  const canvas_front_z = 1.25;
  const canvas_rear_z = -1.72;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x075aa9,
    metalness: 0.0,
    roughness: 0.3
  });
  const darkBlueMat = new THREE.MeshStandardMaterial({
    color: 0x063b72,
    metalness: 0.0,
    roughness: 0.3
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x202326,
    metalness: 0.0,
    roughness: 0.8
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x53666d,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.42,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide
  });
  const windshieldMat = new THREE.MeshPhysicalMaterial({
    color: 0xaab5b4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const canvasMat = new THREE.MeshStandardMaterial({
    color: 0xe6b92f,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const canvasTrimMat = new THREE.MeshStandardMaterial({
    color: 0xb98718,
    metalness: 0.0,
    roughness: 0.95
  });
  const canvasSeamMat = new THREE.MeshStandardMaterial({
    color: 0x8b6817,
    metalness: 0.0,
    roughness: 0.95
  });
  const darkFabricMat = new THREE.MeshStandardMaterial({
    color: 0x292d2e,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x25292a,
    metalness: 0.0,
    roughness: 0.95
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff4cf,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xfff4cf,
    emissiveIntensity: 1.0
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xf07b13,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xf07b13,
    emissiveIntensity: 1.0
  });
  const redLightMat = new THREE.MeshStandardMaterial({
    color: 0xc82025,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xc82025,
    emissiveIntensity: 1.0
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.7
  });

  const rodGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);
  const up_axis = new THREE.Vector3(0, 1, 0);

  function addBox(name, width, height, depth, material, x, y, z) {
    const mesh = new THREE.Mesh(unitBoxGeom, material);
    mesh.name = name;
    mesh.scale.set(width, height, depth);
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function addRod(name, start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(rodGeom, material);
    rod.name = name;
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(up_axis, direction.normalize());
    rod.scale.set(radius, length, radius);
    root.add(rod);
    return rod;
  }

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    const transform = new THREE.Object3D();
    transform.position.set(x, y, z);
    transform.rotation.set(rx, ry, rz);
    transform.scale.set(sx, sy, sz);
    transform.updateMatrix();
    mesh.setMatrixAt(index, transform.matrix);
  }

  const body_shellShape = new THREE.Shape();
  body_shellShape.moveTo(-2.38, body_bottom);
  body_shellShape.lineTo(2.12, body_bottom);
  body_shellShape.lineTo(2.42, 0.68);
  body_shellShape.lineTo(2.40, 1.30);
  body_shellShape.lineTo(2.22, 1.53);
  body_shellShape.lineTo(1.78, 1.66);
  body_shellShape.lineTo(1.25, 2.34);
  body_shellShape.lineTo(0.95, 2.48);
  body_shellShape.lineTo(-2.25, 2.48);
  body_shellShape.lineTo(-2.40, 2.30);
  body_shellShape.lineTo(-2.42, 0.65);
  body_shellShape.closePath();

  const body_shellGeom = new THREE.ExtrudeGeometry(body_shellShape, {
    depth: vehicle_width,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const body_shell = new THREE.Mesh(body_shellGeom, bodyMat);
  body_shell.name = "body_shell";
  body_shell.rotation.y = -Math.PI / 2;
  body_shell.position.x = vehicle_width / 2;
  root.add(body_shell);

  const chassis = addBox(
    "chassis",
    1.50,
    0.18,
    3.75,
    trimMat,
    0,
    0.43,
    -0.02
  );

  const hood = addBox(
    "hood",
    1.68,
    0.09,
    0.76,
    bodyMat,
    0,
    1.52,
    1.91
  );
  hood.rotation.x = 0.08;

  const hood_front_roundingGeom = new THREE.CylinderGeometry(0.10, 0.10, 1.62, 20);
  const hood_front_rounding = new THREE.Mesh(hood_front_roundingGeom, bodyMat);
  hood_front_rounding.name = "hood_front_rounding";
  hood_front_rounding.rotation.z = Math.PI / 2;
  hood_front_rounding.position.set(0, 1.47, 2.28);
  root.add(hood_front_rounding);

  const roof_capGeom = new THREE.CapsuleGeometry(0.12, 3.20, 6, 16);
  const roof_cap = new THREE.Mesh(roof_capGeom, bodyMat);
  roof_cap.name = "roof_cap";
  roof_cap.rotation.x = Math.PI / 2;
  roof_cap.scale.set(7.1, 1.0, 0.72);
  roof_cap.position.set(0, 2.46, -0.55);
  root.add(roof_cap);

  const left_roof_gutter = addBox(
    "left_roof_gutter",
    0.055,
    0.055,
    3.55,
    trimMat,
    -0.91,
    2.48,
    -0.46
  );
  const right_roof_gutter = addBox(
    "right_roof_gutter",
    0.055,
    0.055,
    3.55,
    trimMat,
    0.91,
    2.48,
    -0.46
  );

  const roof_rack_railGeom = new THREE.BoxGeometry(0.13, 0.075, 2.72);
  const roof_rack_rails = new THREE.InstancedMesh(roof_rack_railGeom, trimMat, 2);
  roof_rack_rails.name = "roof_rack_rails";
  setInstance(roof_rack_rails, 0, -0.62, 2.57, -0.35, 0, 0, 0, 1, 1, 1);
  setInstance(roof_rack_rails, 1, 0.62, 2.57, -0.35, 0, 0, 0, 1, 1, 1);
  roof_rack_rails.instanceMatrix.needsUpdate = true;
  root.add(roof_rack_rails);

  const roof_rack_supportGeom = new THREE.BoxGeometry(0.10, 0.10, 0.18);
  const roof_rack_supports = new THREE.InstancedMesh(roof_rack_supportGeom, trimMat, 4);
  roof_rack_supports.name = "roof_rack_supports";
  let support_index = 0;
  for (const x of [-0.62, 0.62]) {
    for (const z of [-1.30, 0.65]) {
      setInstance(
        roof_rack_supports,
        support_index,
        x,
        2.50,
        z,
        0,
        0,
        0,
        1,
        1,
        1
      );
      support_index += 1;
    }
  }
  roof_rack_supports.instanceMatrix.needsUpdate = true;
  root.add(roof_rack_supports);

  const windshield_borderGeom = new THREE.BoxGeometry(1.70, 0.84, 0.045);
  const windshield_border = new THREE.Mesh(windshield_borderGeom, trimMat);
  windshield_border.name = "windshield_border";
  windshield_border.rotation.x = -0.68;
  windshield_border.position.set(0, 2.00, 1.50);
  root.add(windshield_border);

  const windshieldGeom = new THREE.BoxGeometry(1.57, 0.72, 0.025);
  const windshield = new THREE.Mesh(windshieldGeom, windshieldMat);
  windshield.name = "windshield";
  windshield.rotation.x = -0.68;
  windshield.position.set(0, 2.015, 1.515);
  root.add(windshield);

  const windshield_center_divider = addRod(
    "windshield_center_divider",
    new THREE.Vector3(0, 1.68, 1.77),
    new THREE.Vector3(0, 2.34, 1.25),
    0.018,
    trimMat
  );

  const left_windshield_wiper = addRod(
    "left_windshield_wiper",
    new THREE.Vector3(-0.66, 1.73, 1.75),
    new THREE.Vector3(-0.10, 1.84, 1.67),
    0.014,
    trimMat
  );
  const right_windshield_wiper = addRod(
    "right_windshield_wiper",
    new THREE.Vector3(0.66, 1.73, 1.75),
    new THREE.Vector3(0.10, 1.84, 1.67),
    0.014,
    trimMat
  );

  const windshield_cabin_viewGeom = new THREE.BoxGeometry(0.58, 0.035, 0.018);
  const windshield_cabin_view = new THREE.Mesh(windshield_cabin_viewGeom, darkFabricMat);
  windshield_cabin_view.name = "windshield_cabin_view";
  windshield_cabin_view.rotation.x = -0.68;
  windshield_cabin_view.position.set(0, 1.79, 1.72);
  root.add(windshield_cabin_view);

  const front_side_window_borderGeom = new THREE.BoxGeometry(0.045, 0.78, 0.78);
  const front_side_window_borders = new THREE.InstancedMesh(
    front_side_window_borderGeom,
    trimMat,
    2
  );
  front_side_window_borders.name = "front_side_window_borders";
  setInstance(front_side_window_borders, 0, -0.922, 2.00, 0.83, 0, 0, 0, 1, 1, 1);
  setInstance(front_side_window_borders, 1, 0.922, 2.00, 0.83, 0, 0, 0, 1, 1, 1);
  front_side_window_borders.instanceMatrix.needsUpdate = true;
  root.add(front_side_window_borders);

  const front_side_windowGeom = new THREE.BoxGeometry(0.025, 0.66, 0.66);
  const front_side_windows = new THREE.InstancedMesh(front_side_windowGeom, glassMat, 2);
  front_side_windows.name = "front_side_windows";
  setInstance(front_side_windows, 0, -0.948, 2.01, 0.83, 0, 0, 0, 1, 1, 1);
  setInstance(front_side_windows, 1, 0.948, 2.01, 0.83, 0, 0, 0, 1, 1, 1);
  front_side_windows.instanceMatrix.needsUpdate = true;
  root.add(front_side_windows);

  const middle_side_window_borderGeom = new THREE.BoxGeometry(0.045, 0.78, 0.98);
  const middle_side_window_borders = new THREE.InstancedMesh(
    middle_side_window_borderGeom,
    trimMat,
    2
  );
  middle_side_window_borders.name = "middle_side_window_borders";
  setInstance(middle_side_window_borders, 0, -0.922, 1.99, -0.25, 0, 0, 0, 1, 1, 1);
  setInstance(middle_side_window_borders, 1, 0.922, 1.99, -0.25, 0, 0, 0, 1, 1, 1);
  middle_side_window_borders.instanceMatrix.needsUpdate = true;
  root.add(middle_side_window_borders);

  const middle_side_windowGeom = new THREE.BoxGeometry(0.025, 0.66, 0.86);
  const middle_side_windows = new THREE.InstancedMesh(middle_side_windowGeom, glassMat, 2);
  middle_side_windows.name = "middle_side_windows";
  setInstance(middle_side_windows, 0, -0.948, 2.00, -0.25, 0, 0, 0, 1, 1, 1);
  setInstance(middle_side_windows, 1, 0.948, 2.00, -0.25, 0, 0, 0, 1, 1, 1);
  middle_side_windows.instanceMatrix.needsUpdate = true;
  root.add(middle_side_windows);

  const rear_side_window_borderGeom = new THREE.BoxGeometry(0.045, 0.78, 1.16);
  const rear_side_window_borders = new THREE.InstancedMesh(
    rear_side_window_borderGeom,
    trimMat,
    2
  );
  rear_side_window_borders.name = "rear_side_window_borders";
  setInstance(rear_side_window_borders, 0, -0.922, 1.98, -1.43, 0, 0, 0, 1, 1, 1);
  setInstance(rear_side_window_borders, 1, 0.922, 1.98, -1.43, 0, 0, 0, 1, 1, 1);
  rear_side_window_borders.instanceMatrix.needsUpdate = true;
  root.add(rear_side_window_borders);

  const rear_side_windowGeom = new THREE.BoxGeometry(0.025, 0.66, 1.04);
  const rear_side_windows = new THREE.InstancedMesh(rear_side_windowGeom, glassMat, 2);
  rear_side_windows.name = "rear_side_windows";
  setInstance(rear_side_windows, 0, -0.948, 1.99, -1.43, 0, 0, 0, 1, 1, 1);
  setInstance(rear_side_windows, 1, 0.948, 1.99, -1.43, 0, 0, 0, 1, 1, 1);
  rear_side_windows.instanceMatrix.needsUpdate = true;
  root.add(rear_side_windows);

  const rear_window_border = addBox(
    "rear_window_border",
    1.48,
    0.76,
    0.045,
    trimMat,
    0,
    1.96,
    -2.425
  );
  const rear_window = addBox(
    "rear_window",
    1.36,
    0.64,
    0.025,
    glassMat,
    0,
    1.97,
    -2.452
  );

  const dashboard = addBox(
    "dashboard",
    1.45,
    0.16,
    0.32,
    trimMat,
    0,
    1.58,
    1.28
  );

  const front_seat_backGeom = new THREE.BoxGeometry(0.42, 0.62, 0.18);
  const front_seat_backs = new THREE.InstancedMesh(front_seat_backGeom, seatMat, 2);
  front_seat_backs.name = "front_seat_backs";
  setInstance(front_seat_backs, 0, -0.38, 1.72, 0.62, -0.08, 0, 0, 1, 1, 1);
  setInstance(front_seat_backs, 1, 0.38, 1.72, 0.62, -0.08, 0, 0, 1, 1, 1);
  front_seat_backs.instanceMatrix.needsUpdate = true;
  root.add(front_seat_backs);

  const front_seat_headrestGeom = new THREE.SphereGeometry(0.16, 16, 10);
  const front_seat_headrests = new THREE.InstancedMesh(
    front_seat_headrestGeom,
    seatMat,
    2
  );
  front_seat_headrests.name = "front_seat_headrests";
  setInstance(front_seat_headrests, 0, -0.38, 2.08, 0.59, 0, 0, 0, 1, 1.25, 0.72);
  setInstance(front_seat_headrests, 1, 0.38, 2.08, 0.59, 0, 0, 0, 1, 1.25, 0.72);
  front_seat_headrests.instanceMatrix.needsUpdate = true;
  root.add(front_seat_headrests);

  const steering_wheelGeom = new THREE.TorusGeometry(0.15, 0.022, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, trimMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.43, 1.82, 1.10);
  steering_wheel.rotation.x = -0.25;
  root.add(steering_wheel);

  const steering_column = addRod(
    "steering_column",
    new THREE.Vector3(-0.43, 1.77, 1.08),
    new THREE.Vector3(-0.43, 1.57, 1.29),
    0.025,
    trimMat
  );

  const side_belt_trimGeom = new THREE.BoxGeometry(0.045, 0.055, 4.15);
  const side_belt_trim = new THREE.InstancedMesh(side_belt_trimGeom, darkBlueMat, 2);
  side_belt_trim.name = "side_belt_trim";
  setInstance(side_belt_trim, 0, -0.943, 1.20, -0.18, 0, 0, 0, 1, 1, 1);
  setInstance(side_belt_trim, 1, 0.943, 1.20, -0.18, 0, 0, 0, 1, 1, 1);
  side_belt_trim.instanceMatrix.needsUpdate = true;
  root.add(side_belt_trim);

  const side_lower_trimGeom = new THREE.BoxGeometry(0.04, 0.045, 3.95);
  const side_lower_trim = new THREE.InstancedMesh(side_lower_trimGeom, darkBlueMat, 2);
  side_lower_trim.name = "side_lower_trim";
  setInstance(side_lower_trim, 0, -0.942, 0.72, -0.18, 0, 0, 0, 1, 1, 1);
  setInstance(side_lower_trim, 1, 0.942, 0.72, -0.18, 0, 0, 0, 1, 1, 1);
  side_lower_trim.instanceMatrix.needsUpdate = true;
  root.add(side_lower_trim);

  const door_seamGeom = new THREE.BoxGeometry(0.025, 1.50, 0.022);
  const door_seams = new THREE.InstancedMesh(door_seamGeom, trimMat, 6);
  door_seams.name = "door_seams";
  let seam_index = 0;
  for (const x of [-0.949, 0.949]) {
    for (const z of [0.30, -0.82, -1.96]) {
      setInstance(door_seams, seam_index, x, 1.34, z, 0, 0, 0, 1, 1, 1);
      seam_index += 1;
    }
  }
  door_seams.instanceMatrix.needsUpdate = true;
  root.add(door_seams);

  const door_handleGeom = new THREE.BoxGeometry(0.065, 0.075, 0.25);
  const door_handles = new THREE.InstancedMesh(door_handleGeom, trimMat, 4);
  door_handles.name = "door_handles";
  let handle_index = 0;
  for (const x of [-0.975, 0.975]) {
    for (const z of [0.43, -0.72]) {
      setInstance(door_handles, handle_index, x, 1.38, z, 0, 0, 0, 1, 1, 1);
      handle_index += 1;
    }
  }
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handles);

  const side_stepGeom = new THREE.BoxGeometry(0.12, 0.08, 1.18);
  const side_steps = new THREE.InstancedMesh(side_stepGeom, trimMat, 2);
  side_steps.name = "side_steps";
  setInstance(side_steps, 0, -0.965, 0.54, -0.12, 0, 0, 0, 1, 1, 1);
  setInstance(side_steps, 1, 0.965, 0.54, -0.12, 0, 0, 0, 1, 1, 1);
  side_steps.instanceMatrix.needsUpdate = true;
  root.add(side_steps);

  const rear_side_ventGeom = new THREE.BoxGeometry(0.035, 0.035, 0.24);
  const rear_side_vents = new THREE.InstancedMesh(rear_side_ventGeom, trimMat, 10);
  rear_side_vents.name = "rear_side_vents";
  let vent_index = 0;
  for (const x of [-0.955, 0.955]) {
    for (let i = 0; i < 5; i++) {
      setInstance(
        rear_side_vents,
        vent_index,
        x,
        1.62 + i * 0.075,
        -2.17,
        0,
        0,
        0,
        1,
        1,
        1
      );
      vent_index += 1;
    }
  }
  rear_side_vents.instanceMatrix.needsUpdate = true;
  root.add(rear_side_vents);

  const mirror_housingGeom = new THREE.SphereGeometry(1, 20, 12);
  const side_mirror_housings = new THREE.InstancedMesh(mirror_housingGeom, trimMat, 2);
  side_mirror_housings.name = "side_mirror_housings";
  setInstance(side_mirror_housings, 0, -1.055, 1.73, 1.18, 0, 0, 0, 0.14, 0.19, 0.11);
  setInstance(side_mirror_housings, 1, 1.055, 1.73, 1.18, 0, 0, 0, 0.14, 0.19, 0.11);
  side_mirror_housings.instanceMatrix.needsUpdate = true;
  root.add(side_mirror_housings);

  const mirror_glassGeom = new THREE.CircleGeometry(0.11, 20);
  const side_mirror_glass = new THREE.InstancedMesh(mirror_glassGeom, glassMat, 2);
  side_mirror_glass.name = "side_mirror_glass";
  setInstance(side_mirror_glass, 0, -1.185, 1.73, 1.18, 0, Math.PI / 2, 0, 0.85, 1.25, 1);
  setInstance(side_mirror_glass, 1, 1.185, 1.73, 1.18, 0, Math.PI / 2, 0, 0.85, 1.25, 1);
  side_mirror_glass.instanceMatrix.needsUpdate = true;
  root.add(side_mirror_glass);

  const left_mirror_stalk = addRod(
    "left_mirror_stalk",
    new THREE.Vector3(-0.86, 1.68, 1.20),
    new THREE.Vector3(-1.02, 1.71, 1.18),
    0.025,
    trimMat
  );
  const right_mirror_stalk = addRod(
    "right_mirror_stalk",
    new THREE.Vector3(0.86, 1.68, 1.20),
    new THREE.Vector3(1.02, 1.71, 1.18),
    0.025,
    trimMat
  );

  const front_bumper = addBox(
    "front_bumper",
    1.96,
    0.25,
    0.22,
    trimMat,
    0,
    0.64,
    2.49
  );
  const rear_bumper = addBox(
    "rear_bumper",
    1.94,
    0.24,
    0.23,
    trimMat,
    0,
    0.64,
    -2.49
  );

  const front_grille = addBox(
    "front_grille",
    1.08,
    0.50,
    0.065,
    trimMat,
    0,
    1.12,
    2.435
  );

  const grille_horizontal_slatGeom = new THREE.BoxGeometry(0.94, 0.027, 0.025);
  const grille_horizontal_slats = new THREE.InstancedMesh(
    grille_horizontal_slatGeom,
    brushedMetalMat,
    6
  );
  grille_horizontal_slats.name = "grille_horizontal_slats";
  for (let i = 0; i < 6; i++) {
    setInstance(
      grille_horizontal_slats,
      i,
      0,
      0.93 + i * 0.075,
      2.475,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  grille_horizontal_slats.instanceMatrix.needsUpdate = true;
  root.add(grille_horizontal_slats);

  const grille_vertical_slatGeom = new THREE.BoxGeometry(0.025, 0.42, 0.028);
  const grille_vertical_slats = new THREE.InstancedMesh(
    grille_vertical_slatGeom,
    brushedMetalMat,
    5
  );
  grille_vertical_slats.name = "grille_vertical_slats";
  for (let i = 0; i < 5; i++) {
    setInstance(
      grille_vertical_slats,
      i,
      -0.38 + i * 0.19,
      1.12,
      2.478,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  grille_vertical_slats.instanceMatrix.needsUpdate = true;
  root.add(grille_vertical_slats);

  const grille_badgeGeom = new THREE.TorusGeometry(0.085, 0.018, 8, 24);
  const grille_badge = new THREE.Mesh(grille_badgeGeom, silverMat);
  grille_badge.name = "grille_badge";
  grille_badge.position.set(0, 1.13, 2.505);
  root.add(grille_badge);

  const grille_badge_bar = addBox(
    "grille_badge_bar",
    0.12,
    0.025,
    0.025,
    silverMat,
    0,
    1.13,
    2.51
  );
  grille_badge_bar.rotation.z = -0.65;

  const headlight_housingGeom = new THREE.BoxGeometry(0.29, 0.50, 0.07);
  const headlight_housings = new THREE.InstancedMesh(
    headlight_housingGeom,
    trimMat,
    2
  );
  headlight_housings.name = "headlight_housings";
  setInstance(headlight_housings, 0, -0.69, 1.13, 2.44, 0, 0, 0, 1, 1, 1);
  setInstance(headlight_housings, 1, 0.69, 1.13, 2.44, 0, 0, 0, 1, 1, 1);
  headlight_housings.instanceMatrix.needsUpdate = true;
  root.add(headlight_housings);

  const headlight_lensGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.035, 20);
  const headlight_lenses = new THREE.InstancedMesh(
    headlight_lensGeom,
    headlightMat,
    4
  );
  headlight_lenses.name = "headlight_lenses";
  let lens_index = 0;
  for (const x of [-0.69, 0.69]) {
    for (const y of [0.99, 1.27]) {
      setInstance(
        headlight_lenses,
        lens_index,
        x,
        y,
        2.49,
        Math.PI / 2,
        0,
        0,
        1,
        1,
        1
      );
      lens_index += 1;
    }
  }
  headlight_lenses.instanceMatrix.needsUpdate = true;
  root.add(headlight_lenses);

  const front_license_plate = addBox(
    "front_license_plate",
    0.48,
    0.20,
    0.025,
    plateMat,
    0,
    0.58,
    2.615
  );
  const front_plate_markGeom = new THREE.BoxGeometry(0.045, 0.09, 0.01);
  const front_plate_marks = new THREE.InstancedMesh(front_plate_markGeom, trimMat, 5);
  front_plate_marks.name = "front_plate_marks";
  for (let i = 0; i < 5; i++) {
    setInstance(
      front_plate_marks,
      i,
      -0.14 + i * 0.07,
      0.58,
      2.632,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  front_plate_marks.instanceMatrix.needsUpdate = true;
  root.add(front_plate_marks);

  const side_markerGeom = new THREE.BoxGeometry(0.035, 0.09, 0.19);
  const side_markers = new THREE.InstancedMesh(side_markerGeom, amberMat, 2);
  side_markers.name = "side_markers";
  setInstance(side_markers, 0, -0.958, 1.30, 1.62, 0, 0, 0, 1, 1, 1);
  setInstance(side_markers, 1, 0.958, 1.30, 1.62, 0, 0, 0, 1, 1, 1);
  side_markers.instanceMatrix.needsUpdate = true;
  root.add(side_markers);

  const hood_ventGeom = new THREE.BoxGeometry(0.28, 0.025, 0.16);
  const hood_vents = new THREE.InstancedMesh(hood_ventGeom, trimMat, 2);
  hood_vents.name = "hood_vents";
  setInstance(hood_vents, 0, -0.42, 1.58, 1.86, 0, 0, 0, 1, 1, 1);
  setInstance(hood_vents, 1, 0.42, 1.58, 1.86, 0, 0, 0, 1, 1, 1);
  hood_vents.instanceMatrix.needsUpdate = true;
  root.add(hood_vents);

  const rear_taillightGeom = new THREE.BoxGeometry(0.13, 0.48, 0.055);
  const rear_taillights = new THREE.InstancedMesh(
    rear_taillightGeom,
    redLightMat,
    2
  );
  rear_taillights.name = "rear_taillights";
  setInstance(rear_taillights, 0, -0.78, 1.14, -2.445, 0, 0, 0, 1, 1, 1);
  setInstance(rear_taillights, 1, 0.78, 1.14, -2.445, 0, 0, 0, 1, 1, 1);
  rear_taillights.instanceMatrix.needsUpdate = true;
  root.add(rear_taillights);

  const wheel_positions = [
    [-wheel_x, wheel_y, front_axle_z],
    [wheel_x, wheel_y, front_axle_z],
    [-wheel_x, wheel_y, rear_axle_z],
    [wheel_x, wheel_y, rear_axle_z]
  ];

  const tireGeom = new THREE.TorusGeometry(0.34, 0.16, 12, 32);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  tires.name = "tires";
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    setInstance(tires, i, p[0], p[1], p[2], 0, Math.PI / 2, 0, 1, 1, 1);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const tire_treadGeom = new THREE.BoxGeometry(0.28, 0.055, 0.12);
  const tire_treads = new THREE.InstancedMesh(tire_treadGeom, tireMat, 56);
  tire_treads.name = "tire_treads";
  let tread_index = 0;
  for (const p of wheel_positions) {
    for (let i = 0; i < 14; i++) {
      const angle = i / 14 * Math.PI * 2;
      setInstance(
        tire_treads,
        tread_index,
        p[0],
        p[1] + Math.cos(angle) * 0.485,
        p[2] + Math.sin(angle) * 0.485,
        angle,
        0,
        0,
        1,
        1,
        1
      );
      tread_index += 1;
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  root.add(tire_treads);

  const wheel_rimGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.12, 24);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimGeom, silverMat, 4);
  wheel_rims.name = "wheel_rims";
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    const side = p[0] < 0 ? -1 : 1;
    setInstance(
      wheel_rims,
      i,
      side * 1.045,
      p[1],
      p[2],
      0,
      0,
      Math.PI / 2,
      1,
      1,
      1
    );
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  root.add(wheel_rims);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 20);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, brushedMetalMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    const side = p[0] < 0 ? -1 : 1;
    setInstance(
      wheel_hubs,
      i,
      side * 1.075,
      p[1],
      p[2],
      0,
      0,
      Math.PI / 2,
      1,
      1,
      1
    );
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const rim_ventGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 10);
  const rim_vents = new THREE.InstancedMesh(rim_ventGeom, trimMat, 24);
  rim_vents.name = "rim_vents";
  let rim_vent_index = 0;
  for (const p of wheel_positions) {
    const side = p[0] < 0 ? -1 : 1;
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      setInstance(
        rim_vents,
        rim_vent_index,
        side * 1.112,
        p[1] + Math.cos(angle) * 0.19,
        p[2] + Math.sin(angle) * 0.19,
        0,
        0,
        Math.PI / 2,
        1,
        1,
        1
      );
      rim_vent_index += 1;
    }
  }
  rim_vents.instanceMatrix.needsUpdate = true;
  root.add(rim_vents);

  const wheel_archGeom = new THREE.TorusGeometry(0.515, 0.055, 8, 32, Math.PI);
  const wheel_arches = new THREE.InstancedMesh(wheel_archGeom, bodyMat, 4);
  wheel_arches.name = "wheel_arches";
  for (let i = 0; i < wheel_positions.length; i++) {
    const p = wheel_positions[i];
    setInstance(
      wheel_arches,
      i,
      p[0] < 0 ? -0.925 : 0.925,
      p[1],
      p[2],
      0,
      Math.PI / 2,
      0,
      1,
      1,
      1
    );
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  root.add(wheel_arches);

  const canvas_base_platform = addBox(
    "canvas_base_platform",
    1.80,
    0.075,
    3.10,
    trimMat,
    0,
    2.625,
    -0.30
  );

  const canvas_sideShape = new THREE.Shape();
  canvas_sideShape.moveTo(-1.72, 2.64);
  canvas_sideShape.lineTo(1.25, 2.64);
  canvas_sideShape.lineTo(1.22, 3.48);
  canvas_sideShape.bezierCurveTo(1.18, 3.63, 1.05, 3.72, 0.88, 3.75);
  canvas_sideShape.lineTo(-1.52, 3.57);
  canvas_sideShape.bezierCurveTo(-1.63, 3.56, -1.70, 3.51, -1.72, 3.44);
  canvas_sideShape.closePath();

  const canvas_sideGeom = new THREE.ShapeGeometry(canvas_sideShape, 20);
  const left_canvas_side = new THREE.Mesh(canvas_sideGeom, canvasMat);
  left_canvas_side.name = "left_canvas_side";
  left_canvas_side.rotation.y = -Math.PI / 2;
  left_canvas_side.position.x = -canvas_width / 2;
  root.add(left_canvas_side);

  const right_canvas_side = new THREE.Mesh(canvas_sideGeom, canvasMat);
  right_canvas_side.name = "right_canvas_side";
  right_canvas_side.rotation.y = -Math.PI / 2;
  right_canvas_side.position.x = canvas_width / 2;
  root.add(right_canvas_side);

  const canvas_frontShape = new THREE.Shape();
  canvas_frontShape.moveTo(-0.86, 2.64);
  canvas_frontShape.lineTo(0.86, 2.64);
  canvas_frontShape.lineTo(0.84, 3.48);
  canvas_frontShape.bezierCurveTo(0.64, 3.68, -0.64, 3.76, -0.84, 3.55);
  canvas_frontShape.closePath();

  const canvas_frontGeom = new THREE.ShapeGeometry(canvas_frontShape, 24);
  const canvas_front = new THREE.Mesh(canvas_frontGeom, canvasMat);
  canvas_front.name = "canvas_front";
  canvas_front.position.z = canvas_front_z;
  root.add(canvas_front);

  const canvas_rearGeom = new THREE.BoxGeometry(canvas_width, 0.84, 0.045);
  const canvas_rear = new THREE.Mesh(canvas_rearGeom, canvasMat);
  canvas_rear.name = "canvas_rear";
  canvas_rear.position.set(0, 3.10, canvas_rear_z);
  root.add(canvas_rear);

  const canvas_roofGeom = new THREE.BufferGeometry();
  const canvas_roof_positions = new Float32Array([
    -0.86, 3.55, 1.25,
    -0.86, 3.43, -1.72,
     0.86, 3.43, -1.72,
     0.86, 3.55, 1.25
  ]);
  const canvas_roof_indices = [0, 1, 2, 0, 2, 3];
  canvas_roofGeom.setAttribute(
    "position",
    new THREE.BufferAttribute(canvas_roof_positions, 3)
  );
  canvas_roofGeom.setIndex(canvas_roof_indices);
  canvas_roofGeom.computeVertexNormals();

  const canvas_roof = new THREE.Mesh(canvas_roofGeom, canvasMat);
  canvas_roof.name = "canvas_roof";
  root.add(canvas_roof);

  const canvas_roof_ridge = addRod(
    "canvas_roof_ridge",
    new THREE.Vector3(0, 3.66, 1.20),
    new THREE.Vector3(0, 3.52, -1.70),
    0.025,
    canvasTrimMat
  );

  const canvas_side_trimGeom = new THREE.BoxGeometry(0.045, 0.055, 3.00);
  const canvas_side_top_trims = new THREE.InstancedMesh(
    canvas_side_trimGeom,
    canvasTrimMat,
    2
  );
  canvas_side_top_trims.name = "canvas_side_top_trims";
  setInstance(canvas_side_top_trims, 0, -0.875, 3.50, -0.25, 0, 0, 0, 1, 1, 1);
  setInstance(canvas_side_top_trims, 1, 0.875, 3.50, -0.25, 0, 0, 0, 1, 1, 1);
  canvas_side_top_trims.instanceMatrix.needsUpdate = true;
  root.add(canvas_side_top_trims);

  const canvas_side_bottom_trimGeom = new THREE.BoxGeometry(0.05, 0.065, 3.00);
  const canvas_side_bottom_trims = new THREE.InstancedMesh(
    canvas_side_bottom_trimGeom,
    canvasTrimMat,
    2
  );
  canvas_side_bottom_trims.name = "canvas_side_bottom_trims";
  setInstance(canvas_side_bottom_trims, 0, -0.878, 2.66, -0.24, 0, 0, 0, 1, 1, 1);
  setInstance(canvas_side_bottom_trims, 1, 0.878, 2.66, -0.24, 0, 0, 0, 1, 1, 1);
  canvas_side_bottom_trims.instanceMatrix.needsUpdate = true;
  root.add(canvas_side_bottom_trims);

  const canvas_front_top_trim = addRod(
    "canvas_front_top_trim",
    new THREE.Vector3(-0.86, 3.55, 1.272),
    new THREE.Vector3(0.86, 3.55, 1.272),
    0.028,
    canvasTrimMat
  );
  const canvas_front_bottom_trim = addRod(
    "canvas_front_bottom_trim",
    new THREE.Vector3(-0.86, 2.65, 1.272),
    new THREE.Vector3(0.86, 2.65, 1.272),
    0.028,
    canvasTrimMat
  );
  const canvas_front_left_trim = addRod(
    "canvas_front_left_trim",
    new THREE.Vector3(-0.86, 2.65, 1.272),
    new THREE.Vector3(-0.84, 3.54, 1.272),
    0.028,
    canvasTrimMat
  );
  const canvas_front_right_trim = addRod(
    "canvas_front_right_trim",
    new THREE.Vector3(0.86, 2.65, 1.272),
    new THREE.Vector3(0.84, 3.54, 1.272),
    0.028,
    canvasTrimMat
  );

  const canvas_rear_top_trim = addRod(
    "canvas_rear_top_trim",
    new THREE.Vector3(-0.86, 3.43, -1.745),
    new THREE.Vector3(0.86, 3.43, -1.745),
    0.028,
    canvasTrimMat
  );
  const canvas_rear_bottom_trim = addRod(
    "canvas_rear_bottom_trim",
    new THREE.Vector3(-0.86, 2.65, -1.745),
    new THREE.Vector3(0.86, 2.65, -1.745),
    0.028,
    canvasTrimMat
  );

  const canvas_front_arch_points = [
    new THREE.Vector3(-0.84, 3.54, 1.285),
    new THREE.Vector3(-0.56, 3.68, 1.285),
    new THREE.Vector3(0, 3.73, 1.285),
    new THREE.Vector3(0.56, 3.68, 1.285),
    new THREE.Vector3(0.84, 3.54, 1.285)
  ];
  const canvas_front_archGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(canvas_front_arch_points),
    28,
    0.025,
    8,
    false
  );
  const canvas_front_arch_trim = new THREE.Mesh(
    canvas_front_archGeom,
    canvasTrimMat
  );
  canvas_front_arch_trim.name = "canvas_front_arch_trim";
  root.add(canvas_front_arch_trim);

  const front_windowShape = new THREE.Shape();
  front_windowShape.moveTo(-0.38, -0.30);
  front_windowShape.lineTo(0.38, -0.30);
  front_windowShape.lineTo(0.35, 0.31);
  front_windowShape.lineTo(-0.34, 0.31);
  front_windowShape.closePath();

  const front_windowGeom = new THREE.ShapeGeometry(front_windowShape);
  const left_front_canvas_window = new THREE.Mesh(front_windowGeom, darkFabricMat);
  left_front_canvas_window.name = "left_front_canvas_window";
  left_front_canvas_window.position.set(-0.29, 3.10, 1.286);
  root.add(left_front_canvas_window);

  const right_front_canvas_window = new THREE.Mesh(front_windowGeom, darkFabricMat);
  right_front_canvas_window.name = "right_front_canvas_window";
  right_front_canvas_window.position.set(0.29, 3.10, 1.286);
  root.add(right_front_canvas_window);

  const front_window_horizontal_trimGeom = new THREE.BoxGeometry(0.79, 0.035, 0.025);
  const front_window_horizontal_trims = new THREE.InstancedMesh(
    front_window_horizontal_trimGeom,
    canvasSeamMat,
    4
  );
  front_window_horizontal_trims.name = "front_window_horizontal_trims";
  let front_window_trim_index = 0;
  for (const x of [-0.29, 0.29]) {
    for (const y of [2.79, 3.41]) {
      setInstance(
        front_window_horizontal_trims,
        front_window_trim_index,
        x,
        y,
        1.298,
        0,
        0,
        0,
        1,
        1,
        1
      );
      front_window_trim_index += 1;
    }
  }
  front_window_horizontal_trims.instanceMatrix.needsUpdate = true;
  root.add(front_window_horizontal_trims);

  const front_window_vertical_trimGeom = new THREE.BoxGeometry(0.035, 0.64, 0.025);
  const front_window_vertical_trims = new THREE.InstancedMesh(
    front_window_vertical_trimGeom,
    canvasSeamMat,
    4
  );
  front_window_vertical_trims.name = "front_window_vertical_trims";
  front_window_trim_index = 0;
  for (const x of [-0.29, 0.29]) {
    for (const offset of [-0.38, 0.38]) {
      setInstance(
        front_window_vertical_trims,
        front_window_trim_index,
        x + offset,
        3.10,
        1.298,
        0,
        0,
        0,
        1,
        1,
        1
      );
      front_window_trim_index += 1;
    }
  }
  front_window_vertical_trims.instanceMatrix.needsUpdate = true;
  root.add(front_window_vertical_trims);

  const canvas_side_vertical_seamGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.78,
    8
  );
  const canvas_side_vertical_seams = new THREE.InstancedMesh(
    canvas_side_vertical_seamGeom,
    canvasSeamMat,
    6
  );
  canvas_side_vertical_seams.name = "canvas_side_vertical_seams";
  let canvas_seam_index = 0;
  for (const x of [-0.882, 0.882]) {
    for (const z of [-1.68, -0.25, 1.20]) {
      setInstance(
        canvas_side_vertical_seams,
        canvas_seam_index,
        x,
        3.10,
        z,
        0,
        0,
        0,
        1,
        1,
        1
      );
      canvas_seam_index += 1;
    }
  }
  canvas_side_vertical_seams.instanceMatrix.needsUpdate = true;
  root.add(canvas_side_vertical_seams);

  const canvas_side_horizontal_seamGeom = new THREE.BoxGeometry(0.025, 0.018, 2.88);
  const canvas_side_horizontal_seams = new THREE.InstancedMesh(
    canvas_side_horizontal_seamGeom,
    canvasSeamMat,
    2
  );
  canvas_side_horizontal_seams.name = "canvas_side_horizontal_seams";
  setInstance(canvas_side_horizontal_seams, 0, -0.883, 2.69, -0.25, 0, 0, 0, 1, 1, 1);
  setInstance(canvas_side_horizontal_seams, 1, 0.883, 2.69, -0.25, 0, 0, 0, 1, 1, 1);
  canvas_side_horizontal_seams.instanceMatrix.needsUpdate = true;
  root.add(canvas_side_horizontal_seams);

  const canvas_guyGeom = new THREE.CylinderGeometry(0.009, 0.009, 1, 8);
  const canvas_guy_lines = new THREE.InstancedMesh(canvas_guyGeom, silverMat, 4);
  canvas_guy_lines.name = "canvas_guy_lines";
  let guy_index = 0;
  for (const side of [-1, 1]) {
    const start = new THREE.Vector3(side * 0.89, 3.43, -1.58);
    const end = new THREE.Vector3(side * 0.89, 2.69, -0.72);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().copy(start).add(end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.normalize()
    );
    const matrix = new THREE.Matrix4();
    matrix.compose(midpoint, quaternion, new THREE.Vector3(1, length, 1));
    canvas_guy_lines.setMatrixAt(guy_index, matrix);
    guy_index += 1;
  }
  for (const side of [-1, 1]) {
    const start = new THREE.Vector3(side * 0.89, 3.42, -1.62);
    const end = new THREE.Vector3(side * 0.89, 2.68, -1.62);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().copy(start).add(end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.normalize()
    );
    const matrix = new THREE.Matrix4();
    matrix.compose(midpoint, quaternion, new THREE.Vector3(1, length, 1));
    canvas_guy_lines.setMatrixAt(guy_index, matrix);
    guy_index += 1;
  }
  canvas_guy_lines.instanceMatrix.needsUpdate = true;
  root.add(canvas_guy_lines);

  const canvas_grommetGeom = new THREE.SphereGeometry(0.025, 10, 6);
  const canvas_grommets = new THREE.InstancedMesh(canvas_grommetGeom, trimMat, 8);
  canvas_grommets.name = "canvas_grommets";
  let grommet_index = 0;
  for (const x of [-0.895, 0.895]) {
    for (const z of [-1.62, -0.72, 0.62, 1.18]) {
      setInstance(
        canvas_grommets,
        grommet_index,
        x,
        2.68,
        z,
        0,
        0,
        0,
        1,
        1,
        1
      );
      grommet_index += 1;
    }
  }
  canvas_grommets.instanceMatrix.needsUpdate = true;
  root.add(canvas_grommets);

  fitToUnitCube(THREE, root);
  return root;

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
}