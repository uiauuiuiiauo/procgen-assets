export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_suv";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const cabin_group = new THREE.Group();
  cabin_group.name = "cabin_group";
  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  const front_group = new THREE.Group();
  front_group.name = "front_group";
  const rear_group = new THREE.Group();
  rear_group.name = "rear_group";
  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  root.add(body_group, cabin_group, wheel_group, front_group, rear_group, detail_group);

  const length = 4.35;
  const width = 1.80;
  const bodyBottom = 0.42;
  const wheelR = 0.48;
  const wheelY = 0.50;
  const wheelX = 0.88;
  const frontAxleZ = 1.30;
  const rearAxleZ = -1.35;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x687177,
    metalness: 0.25,
    roughness: 0.45
  });
  const bodyEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x4b5359,
    metalness: 0.2,
    roughness: 0.55
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aabad,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const sideGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x30383d,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.35,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const redLensMat = new THREE.MeshStandardMaterial({
    color: 0xc91d2e,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x5c0810,
    emissiveIntensity: 0.35
  });
  const amberLensMat = new THREE.MeshStandardMaterial({
    color: 0xe89b28,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x6a3708,
    emissiveIntensity: 0.25
  });
  const badgeBlueMat = new THREE.MeshStandardMaterial({
    color: 0x356886,
    metalness: 0.0,
    roughness: 0.3
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x292d30,
    metalness: 0.0,
    roughness: 0.8
  });

  function createProfileGeometry(points, depth, bevelSize, bevelThickness) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness
    });
  }

  function createSidePanelGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(-points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(-points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function createFrontPanelGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function createTubeBetween(start, end, radius, material) {
    const path = new THREE.LineCurve3(start, end);
    return new THREE.Mesh(
      new THREE.TubeGeometry(path, 4, radius, 8, false),
      material
    );
  }

  const lower_bodyGeom = createProfileGeometry([
    [-2.05, bodyBottom + 0.05],
    [2.08, bodyBottom + 0.05],
    [2.16, 0.76],
    [2.02, 1.08],
    [1.70, 1.25],
    [0.92, 1.37],
    [-0.55, 1.34],
    [-1.55, 1.29],
    [-2.00, 1.12]
  ], width, 0.055, 0.055);
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.name = "lower_body";
  lower_body.rotation.y = -Math.PI / 2;
  lower_body.position.x = width / 2;
  body_group.add(lower_body);

  const cabin_shellGeom = createProfileGeometry([
    [-1.82, 1.16],
    [1.18, 1.26],
    [0.72, 1.90],
    [0.38, 2.03],
    [-0.82, 2.06],
    [-1.42, 1.88],
    [-1.78, 1.55]
  ], 1.62, 0.05, 0.05);
  const cabin_shell = new THREE.Mesh(cabin_shellGeom, bodyMat);
  cabin_shell.name = "cabin_shell";
  cabin_shell.rotation.y = -Math.PI / 2;
  cabin_shell.position.x = 0.81;
  cabin_group.add(cabin_shell);

  const hoodGeom = new THREE.BoxGeometry(1.61, 0.075, 1.16);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.name = "hood";
  hood.position.set(0, 1.315, 1.43);
  hood.rotation.x = 0.085;
  body_group.add(hood);

  const roofGeom = new THREE.SphereGeometry(1, 32, 16);
  const roof = new THREE.Mesh(roofGeom, bodyMat);
  roof.name = "roof";
  roof.position.set(0, 1.985, -0.30);
  roof.scale.set(0.82, 0.105, 1.20);
  cabin_group.add(roof);

  const rear_spoilerGeom = new THREE.BoxGeometry(1.48, 0.075, 0.28);
  const rear_spoiler = new THREE.Mesh(rear_spoilerGeom, bodyMat);
  rear_spoiler.name = "rear_spoiler";
  rear_spoiler.position.set(0, 2.015, -1.43);
  rear_spoiler.rotation.x = -0.08;
  cabin_group.add(rear_spoiler);

  const roof_antennaGeom = new THREE.ConeGeometry(0.065, 0.16, 12);
  const roof_antenna = new THREE.Mesh(roof_antennaGeom, blackMat);
  roof_antenna.name = "roof_antenna";
  roof_antenna.position.set(0, 2.145, -0.72);
  roof_antenna.scale.set(0.72, 1, 1.45);
  cabin_group.add(roof_antenna);

  const front_windshield_trimGeom = new THREE.PlaneGeometry(1.58, 0.80);
  const front_windshield_trim = new THREE.Mesh(front_windshield_trimGeom, blackMat);
  front_windshield_trim.name = "front_windshield_trim";
  front_windshield_trim.position.set(0, 1.605, 0.925);
  front_windshield_trim.rotation.x = -0.62;
  cabin_group.add(front_windshield_trim);

  const front_windshieldGeom = new THREE.PlaneGeometry(1.45, 0.69);
  const front_windshield = new THREE.Mesh(front_windshieldGeom, glassMat);
  front_windshield.name = "front_windshield";
  front_windshield.position.set(0, 1.612, 0.936);
  front_windshield.rotation.x = -0.62;
  cabin_group.add(front_windshield);

  const rear_windshield_trimGeom = new THREE.PlaneGeometry(1.47, 0.65);
  const rear_windshield_trim = new THREE.Mesh(rear_windshield_trimGeom, blackMat);
  rear_windshield_trim.name = "rear_windshield_trim";
  rear_windshield_trim.position.set(0, 1.61, -1.57);
  rear_windshield_trim.rotation.x = 0.62;
  cabin_group.add(rear_windshield_trim);

  const rear_windshieldGeom = new THREE.PlaneGeometry(1.34, 0.53);
  const rear_windshield = new THREE.Mesh(rear_windshieldGeom, sideGlassMat);
  rear_windshield.name = "rear_windshield";
  rear_windshield.position.set(0, 1.615, -1.582);
  rear_windshield.rotation.x = 0.62;
  cabin_group.add(rear_windshield);

  const front_side_window_trimGeom = createSidePanelGeometry([
    [1.00, 1.31],
    [0.43, 1.92],
    [-0.20, 1.94],
    [-0.28, 1.31]
  ]);
  const front_side_window_glassGeom = createSidePanelGeometry([
    [0.91, 1.37],
    [0.47, 1.85],
    [-0.13, 1.87],
    [-0.20, 1.37]
  ]);
  const rear_side_window_trimGeom = createSidePanelGeometry([
    [-0.24, 1.31],
    [-0.17, 1.94],
    [-1.15, 1.90],
    [-1.57, 1.66],
    [-1.48, 1.31]
  ]);
  const rear_side_window_glassGeom = createSidePanelGeometry([
    [-0.31, 1.37],
    [-0.24, 1.87],
    [-1.10, 1.83],
    [-1.48, 1.62],
    [-1.40, 1.37]
  ]);

  const right_front_window_trim = new THREE.Mesh(front_side_window_trimGeom, chromeMat);
  right_front_window_trim.name = "right_front_window_trim";
  right_front_window_trim.rotation.y = Math.PI / 2;
  right_front_window_trim.position.x = 0.866;
  cabin_group.add(right_front_window_trim);

  const left_front_window_trim = new THREE.Mesh(front_side_window_trimGeom, chromeMat);
  left_front_window_trim.name = "left_front_window_trim";
  left_front_window_trim.rotation.y = Math.PI / 2;
  left_front_window_trim.position.x = -0.866;
  cabin_group.add(left_front_window_trim);

  const right_front_side_window = new THREE.Mesh(front_side_window_glassGeom, sideGlassMat);
  right_front_side_window.name = "right_front_side_window";
  right_front_side_window.rotation.y = Math.PI / 2;
  right_front_side_window.position.x = 0.874;
  cabin_group.add(right_front_side_window);

  const left_front_side_window = new THREE.Mesh(front_side_window_glassGeom, sideGlassMat);
  left_front_side_window.name = "left_front_side_window";
  left_front_side_window.rotation.y = Math.PI / 2;
  left_front_side_window.position.x = -0.874;
  cabin_group.add(left_front_side_window);

  const right_rear_window_trim = new THREE.Mesh(rear_side_window_trimGeom, chromeMat);
  right_rear_window_trim.name = "right_rear_window_trim";
  right_rear_window_trim.rotation.y = Math.PI / 2;
  right_rear_window_trim.position.x = 0.866;
  cabin_group.add(right_rear_window_trim);

  const left_rear_window_trim = new THREE.Mesh(rear_side_window_trimGeom, chromeMat);
  left_rear_window_trim.name = "left_rear_window_trim";
  left_rear_window_trim.rotation.y = Math.PI / 2;
  left_rear_window_trim.position.x = -0.866;
  cabin_group.add(left_rear_window_trim);

  const right_rear_side_window = new THREE.Mesh(rear_side_window_glassGeom, sideGlassMat);
  right_rear_side_window.name = "right_rear_side_window";
  right_rear_side_window.rotation.y = Math.PI / 2;
  right_rear_side_window.position.x = 0.874;
  cabin_group.add(right_rear_side_window);

  const left_rear_side_window = new THREE.Mesh(rear_side_window_glassGeom, sideGlassMat);
  left_rear_side_window.name = "left_rear_side_window";
  left_rear_side_window.rotation.y = Math.PI / 2;
  left_rear_side_window.position.x = -0.874;
  cabin_group.add(left_rear_side_window);

  const dashboardGeom = new THREE.BoxGeometry(1.34, 0.16, 0.40);
  const dashboard = new THREE.Mesh(dashboardGeom, interiorMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.29, 0.72);
  dashboard.rotation.x = -0.08;
  cabin_group.add(dashboard);

  const front_seatsGeom = new THREE.BoxGeometry(0.43, 0.55, 0.38);
  const front_seats = new THREE.InstancedMesh(front_seatsGeom, interiorMat, 2);
  front_seats.name = "front_seats";
  const seatMatrix = new THREE.Matrix4();
  seatMatrix.makeTranslation(-0.38, 1.30, 0.02);
  front_seats.setMatrixAt(0, seatMatrix);
  seatMatrix.makeTranslation(0.38, 1.30, 0.02);
  front_seats.setMatrixAt(1, seatMatrix);
  front_seats.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_seats);

  const front_headrestsGeom = new THREE.SphereGeometry(1, 16, 10);
  const front_headrests = new THREE.InstancedMesh(front_headrestsGeom, interiorMat, 2);
  front_headrests.name = "front_headrests";
  const headrestMatrix = new THREE.Matrix4();
  const headrestQuat = new THREE.Quaternion();
  headrestMatrix.compose(
    new THREE.Vector3(-0.38, 1.67, -0.02),
    headrestQuat,
    new THREE.Vector3(0.17, 0.16, 0.13)
  );
  front_headrests.setMatrixAt(0, headrestMatrix);
  headrestMatrix.compose(
    new THREE.Vector3(0.38, 1.67, -0.02),
    headrestQuat,
    new THREE.Vector3(0.17, 0.16, 0.13)
  );
  front_headrests.setMatrixAt(1, headrestMatrix);
  front_headrests.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_headrests);

  const steering_wheelGeom = new THREE.TorusGeometry(0.14, 0.025, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, interiorMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.38, 1.47, 0.62);
  steering_wheel.rotation.x = -0.18;
  cabin_group.add(steering_wheel);

  const left_wiper = createTubeBetween(
    new THREE.Vector3(-0.62, 1.355, 1.155),
    new THREE.Vector3(-0.06, 1.445, 1.075),
    0.014,
    blackMat
  );
  left_wiper.name = "left_wiper";
  cabin_group.add(left_wiper);

  const right_wiper = createTubeBetween(
    new THREE.Vector3(0.58, 1.355, 1.155),
    new THREE.Vector3(0.03, 1.445, 1.075),
    0.014,
    blackMat
  );
  right_wiper.name = "right_wiper";
  cabin_group.add(right_wiper);

  const left_mirror_stem = createTubeBetween(
    new THREE.Vector3(-0.80, 1.42, 0.77),
    new THREE.Vector3(-0.98, 1.46, 0.78),
    0.035,
    blackMat
  );
  left_mirror_stem.name = "left_mirror_stem";
  cabin_group.add(left_mirror_stem);

  const right_mirror_stem = createTubeBetween(
    new THREE.Vector3(0.80, 1.42, 0.77),
    new THREE.Vector3(0.98, 1.46, 0.78),
    0.035,
    blackMat
  );
  right_mirror_stem.name = "right_mirror_stem";
  cabin_group.add(right_mirror_stem);

  const mirror_housingGeom = new THREE.SphereGeometry(1, 20, 12);
  const left_mirror = new THREE.Mesh(mirror_housingGeom, bodyMat);
  left_mirror.name = "left_mirror";
  left_mirror.position.set(-1.04, 1.48, 0.79);
  left_mirror.scale.set(0.18, 0.105, 0.14);
  cabin_group.add(left_mirror);

  const right_mirror = new THREE.Mesh(mirror_housingGeom, bodyMat);
  right_mirror.name = "right_mirror";
  right_mirror.position.set(1.04, 1.48, 0.79);
  right_mirror.scale.set(0.18, 0.105, 0.14);
  cabin_group.add(right_mirror);

  const mirror_glassGeom = new THREE.CircleGeometry(1, 20);
  const left_mirror_glass = new THREE.Mesh(mirror_glassGeom, sideGlassMat);
  left_mirror_glass.name = "left_mirror_glass";
  left_mirror_glass.position.set(-1.205, 1.48, 0.79);
  left_mirror_glass.rotation.y = -Math.PI / 2;
  left_mirror_glass.scale.set(0.105, 0.07, 1);
  cabin_group.add(left_mirror_glass);

  const right_mirror_glass = new THREE.Mesh(mirror_glassGeom, sideGlassMat);
  right_mirror_glass.name = "right_mirror_glass";
  right_mirror_glass.position.set(1.205, 1.48, 0.79);
  right_mirror_glass.rotation.y = Math.PI / 2;
  right_mirror_glass.scale.set(0.105, 0.07, 1);
  cabin_group.add(right_mirror_glass);

  const left_front_door_seam = createTubeBetween(
    new THREE.Vector3(-0.958, 0.58, 0.88),
    new THREE.Vector3(-0.958, 1.30, 0.92),
    0.009,
    blackMat
  );
  left_front_door_seam.name = "left_front_door_seam";
  detail_group.add(left_front_door_seam);

  const right_front_door_seam = createTubeBetween(
    new THREE.Vector3(0.958, 0.58, 0.88),
    new THREE.Vector3(0.958, 1.30, 0.92),
    0.009,
    blackMat
  );
  right_front_door_seam.name = "right_front_door_seam";
  detail_group.add(right_front_door_seam);

  const left_center_door_seam = createTubeBetween(
    new THREE.Vector3(-0.958, 0.55, -0.25),
    new THREE.Vector3(-0.958, 1.32, -0.25),
    0.009,
    blackMat
  );
  left_center_door_seam.name = "left_center_door_seam";
  detail_group.add(left_center_door_seam);

  const right_center_door_seam = createTubeBetween(
    new THREE.Vector3(0.958, 0.55, -0.25),
    new THREE.Vector3(0.958, 1.32, -0.25),
    0.009,
    blackMat
  );
  right_center_door_seam.name = "right_center_door_seam";
  detail_group.add(right_center_door_seam);

  const left_rear_door_seam = createTubeBetween(
    new THREE.Vector3(-0.952, 0.60, -1.22),
    new THREE.Vector3(-0.952, 1.28, -1.43),
    0.009,
    blackMat
  );
  left_rear_door_seam.name = "left_rear_door_seam";
  detail_group.add(left_rear_door_seam);

  const right_rear_door_seam = createTubeBetween(
    new THREE.Vector3(0.952, 0.60, -1.22),
    new THREE.Vector3(0.952, 1.28, -1.43),
    0.009,
    blackMat
  );
  right_rear_door_seam.name = "right_rear_door_seam";
  detail_group.add(right_rear_door_seam);

  const door_handlesGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.18, 12);
  const door_handles = new THREE.InstancedMesh(door_handlesGeom, bodyEdgeMat, 4);
  door_handles.name = "door_handles";
  const handleQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const handleMatrix = new THREE.Matrix4();
  const handlePositions = [
    new THREE.Vector3(-0.975, 1.23, 0.24),
    new THREE.Vector3(0.975, 1.23, 0.24),
    new THREE.Vector3(-0.975, 1.23, -0.84),
    new THREE.Vector3(0.975, 1.23, -0.84)
  ];
  for (let i = 0; i < handlePositions.length; i++) {
    handleMatrix.compose(handlePositions[i], handleQuat, new THREE.Vector3(1, 1, 1));
    door_handles.setMatrixAt(i, handleMatrix);
  }
  door_handles.instanceMatrix.needsUpdate = true;
  detail_group.add(door_handles);

  const side_skirtGeom = new THREE.BoxGeometry(0.10, 0.12, 2.42);
  const left_side_skirt = new THREE.Mesh(side_skirtGeom, blackMat);
  left_side_skirt.name = "left_side_skirt";
  left_side_skirt.position.set(-0.94, 0.48, -0.03);
  detail_group.add(left_side_skirt);

  const right_side_skirt = new THREE.Mesh(side_skirtGeom, blackMat);
  right_side_skirt.name = "right_side_skirt";
  right_side_skirt.position.set(0.94, 0.48, -0.03);
  detail_group.add(right_side_skirt);

  const running_boardGeom = new THREE.BoxGeometry(0.16, 0.07, 2.18);
  const left_running_board = new THREE.Mesh(running_boardGeom, blackMat);
  left_running_board.name = "left_running_board";
  left_running_board.position.set(-1.00, 0.54, -0.02);
  detail_group.add(left_running_board);

  const right_running_board = new THREE.Mesh(running_boardGeom, blackMat);
  right_running_board.name = "right_running_board";
  right_running_board.position.set(1.00, 0.54, -0.02);
  detail_group.add(right_running_board);

  const running_board_ribGeom = new THREE.BoxGeometry(0.13, 0.018, 0.045);
  const running_board_ribs = new THREE.InstancedMesh(running_board_ribGeom, brushedMat, 16);
  running_board_ribs.name = "running_board_ribs";
  const ribMatrix = new THREE.Matrix4();
  let ribIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      ribMatrix.makeTranslation(side * 1.01, 0.582, -0.78 + i * 0.22);
      running_board_ribs.setMatrixAt(ribIndex++, ribMatrix);
    }
  }
  running_board_ribs.instanceMatrix.needsUpdate = true;
  detail_group.add(running_board_ribs);

  const fuel_doorGeom = new THREE.CircleGeometry(0.135, 24);
  const fuel_door = new THREE.Mesh(fuel_doorGeom, bodyEdgeMat);
  fuel_door.name = "fuel_door";
  fuel_door.position.set(0.962, 1.10, -1.55);
  fuel_door.rotation.y = Math.PI / 2;
  detail_group.add(fuel_door);

  const wheelPositions = [
    { side: -1, z: frontAxleZ },
    { side: 1, z: frontAxleZ },
    { side: -1, z: rearAxleZ },
    { side: 1, z: rearAxleZ }
  ];

  const wheel_wellGeom = new THREE.CircleGeometry(0.535, 32);
  const wheel_wells = new THREE.InstancedMesh(wheel_wellGeom, blackMat, 4);
  wheel_wells.name = "wheel_wells";
  const wheelWellMatrix = new THREE.Matrix4();
  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    const quat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, wheel.side * Math.PI / 2, 0)
    );
    wheelWellMatrix.compose(
      new THREE.Vector3(wheel.side * 0.957, wheelY, wheel.z),
      quat,
      new THREE.Vector3(1, 1, 1)
    );
    wheel_wells.setMatrixAt(i, wheelWellMatrix);
  }
  wheel_wells.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_wells);

  const fender_archGeom = new THREE.TorusGeometry(0.535, 0.055, 8, 32, Math.PI);
  const fender_arches = new THREE.InstancedMesh(fender_archGeom, bodyMat, 4);
  fender_arches.name = "fender_arches";
  const fenderMatrix = new THREE.Matrix4();
  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    const quat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, wheel.side * Math.PI / 2, 0)
    );
    fenderMatrix.compose(
      new THREE.Vector3(wheel.side * 0.972, wheelY, wheel.z),
      quat,
      new THREE.Vector3(1, 1, 1)
    );
    fender_arches.setMatrixAt(i, fenderMatrix);
  }
  fender_arches.instanceMatrix.needsUpdate = true;
  wheel_group.add(fender_arches);

  const tireGeom = new THREE.TorusGeometry(0.34, 0.13, 14, 36);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  tires.name = "tires";
  const tireMatrix = new THREE.Matrix4();
  const tireQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    tireMatrix.compose(
      new THREE.Vector3(wheel.side * wheelX, wheelY, wheel.z),
      tireQuat,
      new THREE.Vector3(1, 1, 1)
    );
    tires.setMatrixAt(i, tireMatrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  wheel_group.add(tires);

  const treadGeom = new THREE.BoxGeometry(0.27, 0.055, 0.105);
  const tire_treads = new THREE.InstancedMesh(treadGeom, tireMat, 48);
  tire_treads.name = "tire_treads";
  const treadMatrix = new THREE.Matrix4();
  let treadIndex = 0;
  for (const wheel of wheelPositions) {
    for (let i = 0; i < 12; i++) {
      const angle = i / 12 * Math.PI * 2;
      const quat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(angle, 0, 0)
      );
      treadMatrix.compose(
        new THREE.Vector3(
          wheel.side * wheelX,
          wheelY + Math.cos(angle) * 0.465,
          wheel.z + Math.sin(angle) * 0.465
        ),
        quat,
        new THREE.Vector3(1, 1, 1)
      );
      tire_treads.setMatrixAt(treadIndex++, treadMatrix);
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  wheel_group.add(tire_treads);

  const brake_discGeom = new THREE.CylinderGeometry(0.245, 0.245, 0.055, 24);
  const brake_discs = new THREE.InstancedMesh(brake_discGeom, brushedMat, 4);
  brake_discs.name = "brake_discs";
  const discMatrix = new THREE.Matrix4();
  const discQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    discMatrix.compose(
      new THREE.Vector3(wheel.side * 0.995, wheelY, wheel.z),
      discQuat,
      new THREE.Vector3(1, 1, 1)
    );
    brake_discs.setMatrixAt(i, discMatrix);
  }
  brake_discs.instanceMatrix.needsUpdate = true;
  wheel_group.add(brake_discs);

  const wheel_rimGeom = new THREE.TorusGeometry(0.235, 0.045, 10, 28);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimGeom, silverMat, 4);
  wheel_rims.name = "wheel_rims";
  const rimMatrix = new THREE.Matrix4();
  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    rimMatrix.compose(
      new THREE.Vector3(wheel.side * 1.025, wheelY, wheel.z),
      tireQuat,
      new THREE.Vector3(1, 1, 1)
    );
    wheel_rims.setMatrixAt(i, rimMatrix);
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_rims);

  const wheel_spokeGeom = new THREE.BoxGeometry(0.045, 0.22, 0.075);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokeGeom, silverMat, 20);
  wheel_spokes.name = "wheel_spokes";
  const spokeMatrix = new THREE.Matrix4();
  let spokeIndex = 0;
  for (const wheel of wheelPositions) {
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      const quat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(angle, 0, 0)
      );
      spokeMatrix.compose(
        new THREE.Vector3(
          wheel.side * 1.035,
          wheelY + Math.cos(angle) * 0.13,
          wheel.z + Math.sin(angle) * 0.13
        ),
        quat,
        new THREE.Vector3(1, 1, 1)
      );
      wheel_spokes.setMatrixAt(spokeIndex++, spokeMatrix);
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_spokes);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.075, 16);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, chromeMat, 4);
  wheel_hubs.name = "wheel_hubs";
  const hubMatrix = new THREE.Matrix4();
  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    hubMatrix.compose(
      new THREE.Vector3(wheel.side * 1.045, wheelY, wheel.z),
      discQuat,
      new THREE.Vector3(1, 1, 1)
    );
    wheel_hubs.setMatrixAt(i, hubMatrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_hubs);

  const front_bumperGeom = new THREE.BoxGeometry(1.78, 0.22, 0.18);
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyEdgeMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.66, 2.12);
  front_group.add(front_bumper);

  const front_lower_intakeGeom = new THREE.BoxGeometry(1.08, 0.16, 0.045);
  const front_lower_intake = new THREE.Mesh(front_lower_intakeGeom, blackMat);
  front_lower_intake.name = "front_lower_intake";
  front_lower_intake.position.set(0, 0.60, 2.225);
  front_group.add(front_lower_intake);

  const front_license_plateGeom = new THREE.BoxGeometry(0.88, 0.20, 0.045);
  const front_license_plate = new THREE.Mesh(front_license_plateGeom, silverMat);
  front_license_plate.name = "front_license_plate";
  front_license_plate.position.set(0, 0.72, 2.245);
  front_group.add(front_license_plate);

  const grilleOuterPoints = [
    [-0.58, 0.20],
    [0.58, 0.20],
    [0.49, -0.27],
    [-0.49, -0.27]
  ];
  const grilleInnerPoints = [
    [-0.50, 0.14],
    [0.50, 0.14],
    [0.42, -0.21],
    [-0.42, -0.21]
  ];
  const grille_surroundGeom = createFrontPanelGeometry(grilleOuterPoints);
  const grille_surround = new THREE.Mesh(grille_surroundGeom, chromeMat);
  grille_surround.name = "grille_surround";
  grille_surround.position.set(0, 1.02, 2.205);
  front_group.add(grille_surround);

  const front_grilleGeom = createFrontPanelGeometry(grilleInnerPoints);
  const front_grille = new THREE.Mesh(front_grilleGeom, blackMat);
  front_grille.name = "front_grille";
  front_grille.position.set(0, 1.02, 2.216);
  front_group.add(front_grille);

  const grille_slatGeom = new THREE.BoxGeometry(1, 0.025, 0.025);
  const grille_slats = new THREE.InstancedMesh(grille_slatGeom, chromeMat, 5);
  grille_slats.name = "grille_slats";
  const slatMatrix = new THREE.Matrix4();
  for (let i = 0; i < 5; i++) {
    const y = 0.84 + i * 0.075;
    const widthScale = 0.80 + i * 0.055;
    slatMatrix.compose(
      new THREE.Vector3(0, y, 2.232),
      new THREE.Quaternion(),
      new THREE.Vector3(widthScale, 1, 1)
    );
    grille_slats.setMatrixAt(i, slatMatrix);
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  front_group.add(grille_slats);

  const grille_badge_rimGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.028, 24);
  const grille_badge_rim = new THREE.Mesh(grille_badge_rimGeom, chromeMat);
  grille_badge_rim.name = "grille_badge_rim";
  grille_badge_rim.position.set(0, 1.015, 2.245);
  grille_badge_rim.rotation.x = Math.PI / 2;
  front_group.add(grille_badge_rim);

  const grille_badgeGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.032, 24);
  const grille_badge = new THREE.Mesh(grille_badgeGeom, badgeBlueMat);
  grille_badge.name = "grille_badge";
  grille_badge.position.set(0, 1.015, 2.258);
  grille_badge.rotation.x = Math.PI / 2;
  front_group.add(grille_badge);

  const grille_badge_barGeom = new THREE.BoxGeometry(0.13, 0.022, 0.018);
  const grille_badge_bar = new THREE.Mesh(grille_badge_barGeom, chromeMat);
  grille_badge_bar.name = "grille_badge_bar";
  grille_badge_bar.position.set(0, 1.015, 2.278);
  front_group.add(grille_badge_bar);

  const headlightOutlinePoints = [
    [-0.31, 0.10],
    [0.20, 0.14],
    [0.34, 0.02],
    [0.18, -0.14],
    [-0.27, -0.10]
  ];
  const headlightLensPoints = [
    [-0.26, 0.065],
    [0.16, 0.10],
    [0.28, 0.015],
    [0.14, -0.095],
    [-0.22, -0.07]
  ];
  const headlight_outlineGeom = createFrontPanelGeometry(headlightOutlinePoints);
  const headlight_lensGeom = createFrontPanelGeometry(headlightLensPoints);

  const left_headlight_outline = new THREE.Mesh(headlight_outlineGeom, chromeMat);
  left_headlight_outline.name = "left_headlight_outline";
  left_headlight_outline.position.set(-0.68, 1.18, 2.208);
  left_headlight_outline.scale.x = -1;
  front_group.add(left_headlight_outline);

  const right_headlight_outline = new THREE.Mesh(headlight_outlineGeom, chromeMat);
  right_headlight_outline.name = "right_headlight_outline";
  right_headlight_outline.position.set(0.68, 1.18, 2.208);
  front_group.add(right_headlight_outline);

  const left_headlight = new THREE.Mesh(headlight_lensGeom, headlightMat);
  left_headlight.name = "left_headlight";
  left_headlight.position.set(-0.68, 1.18, 2.222);
  left_headlight.scale.x = -1;
  front_group.add(left_headlight);

  const right_headlight = new THREE.Mesh(headlight_lensGeom, headlightMat);
  right_headlight.name = "right_headlight";
  right_headlight.position.set(0.68, 1.18, 2.222);
  front_group.add(right_headlight);

  const headlight_bulbGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 20);
  const left_headlight_bulb = new THREE.Mesh(headlight_bulbGeom, brushedMat);
  left_headlight_bulb.name = "left_headlight_bulb";
  left_headlight_bulb.position.set(-0.72, 1.18, 2.242);
  left_headlight_bulb.rotation.x = Math.PI / 2;
  front_group.add(left_headlight_bulb);

  const right_headlight_bulb = new THREE.Mesh(headlight_bulbGeom, brushedMat);
  right_headlight_bulb.name = "right_headlight_bulb";
  right_headlight_bulb.position.set(0.72, 1.18, 2.242);
  right_headlight_bulb.rotation.x = Math.PI / 2;
  front_group.add(right_headlight_bulb);

  const headlight_markerGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.02, 16);
  const left_headlight_marker = new THREE.Mesh(headlight_markerGeom, amberLensMat);
  left_headlight_marker.name = "left_headlight_marker";
  left_headlight_marker.position.set(-0.88, 1.17, 2.238);
  left_headlight_marker.rotation.x = Math.PI / 2;
  front_group.add(left_headlight_marker);

  const right_headlight_marker = new THREE.Mesh(headlight_markerGeom, amberLensMat);
  right_headlight_marker.name = "right_headlight_marker";
  right_headlight_marker.position.set(0.88, 1.17, 2.238);
  right_headlight_marker.rotation.x = Math.PI / 2;
  front_group.add(right_headlight_marker);

  const fog_light_rimGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 20);
  const left_fog_light_rim = new THREE.Mesh(fog_light_rimGeom, blackMat);
  left_fog_light_rim.name = "left_fog_light_rim";
  left_fog_light_rim.position.set(-0.67, 0.70, 2.235);
  left_fog_light_rim.rotation.x = Math.PI / 2;
  front_group.add(left_fog_light_rim);

  const right_fog_light_rim = new THREE.Mesh(fog_light_rimGeom, blackMat);
  right_fog_light_rim.name = "right_fog_light_rim";
  right_fog_light_rim.position.set(0.67, 0.70, 2.235);
  right_fog_light_rim.rotation.x = Math.PI / 2;
  front_group.add(right_fog_light_rim);

  const fog_lightGeom = new THREE.CylinderGeometry(0.062, 0.062, 0.04, 20);
  const left_fog_light = new THREE.Mesh(fog_lightGeom, headlightMat);
  left_fog_light.name = "left_fog_light";
  left_fog_light.position.set(-0.67, 0.70, 2.255);
  left_fog_light.rotation.x = Math.PI / 2;
  front_group.add(left_fog_light);

  const right_fog_light = new THREE.Mesh(fog_lightGeom, headlightMat);
  right_fog_light.name = "right_fog_light";
  right_fog_light.position.set(0.67, 0.70, 2.255);
  right_fog_light.rotation.x = Math.PI / 2;
  front_group.add(right_fog_light);

  const front_bumper_guardGeom = new THREE.BoxGeometry(0.18, 0.34, 0.18);
  const left_front_bumper_guard = new THREE.Mesh(front_bumper_guardGeom, bodyEdgeMat);
  left_front_bumper_guard.name = "left_front_bumper_guard";
  left_front_bumper_guard.position.set(-0.66, 0.59, 2.25);
  left_front_bumper_guard.rotation.z = -0.10;
  front_group.add(left_front_bumper_guard);

  const right_front_bumper_guard = new THREE.Mesh(front_bumper_guardGeom, bodyEdgeMat);
  right_front_bumper_guard.name = "right_front_bumper_guard";
  right_front_bumper_guard.position.set(0.66, 0.59, 2.25);
  right_front_bumper_guard.rotation.z = 0.10;
  front_group.add(right_front_bumper_guard);

  const hood_badgeGeom = new THREE.CircleGeometry(0.045, 20);
  const hood_badge = new THREE.Mesh(hood_badgeGeom, badgeBlueMat);
  hood_badge.name = "hood_badge";
  hood_badge.position.set(0, 1.365, 1.68);
  hood_badge.rotation.x = -Math.PI / 2;
  hood_badge.scale.set(1.35, 0.7, 1);
  detail_group.add(hood_badge);

  const rear_bumperGeom = new THREE.BoxGeometry(1.72, 0.20, 0.16);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, bodyEdgeMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.64, -2.08);
  rear_group.add(rear_bumper);

  const tail_lightGeom = new THREE.SphereGeometry(1, 20, 12);
  const left_tail_light = new THREE.Mesh(tail_lightGeom, redLensMat);
  left_tail_light.name = "left_tail_light";
  left_tail_light.position.set(-0.72, 1.24, -2.035);
  left_tail_light.scale.set(0.17, 0.20, 0.075);
  rear_group.add(left_tail_light);

  const right_tail_light = new THREE.Mesh(tail_lightGeom, redLensMat);
  right_tail_light.name = "right_tail_light";
  right_tail_light.position.set(0.72, 1.24, -2.035);
  right_tail_light.scale.set(0.17, 0.20, 0.075);
  rear_group.add(right_tail_light);

  const rear_license_plateGeom = new THREE.BoxGeometry(0.72, 0.18, 0.035);
  const rear_license_plate = new THREE.Mesh(rear_license_plateGeom, silverMat);
  rear_license_plate.name = "rear_license_plate";
  rear_license_plate.position.set(0, 0.88, -2.175);
  rear_group.add(rear_license_plate);

  const rear_hatch_handleGeom = new THREE.BoxGeometry(0.34, 0.055, 0.045);
  const rear_hatch_handle = new THREE.Mesh(rear_hatch_handleGeom, blackMat);
  rear_hatch_handle.name = "rear_hatch_handle";
  rear_hatch_handle.position.set(0, 1.18, -2.095);
  rear_group.add(rear_hatch_handle);

  const exhaust_tipGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.22, 16);
  const exhaust_tip = new THREE.Mesh(exhaust_tipGeom, chromeMat);
  exhaust_tip.name = "exhaust_tip";
  exhaust_tip.position.set(0.58, 0.43, -2.12);
  exhaust_tip.rotation.x = Math.PI / 2;
  rear_group.add(exhaust_tip);

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