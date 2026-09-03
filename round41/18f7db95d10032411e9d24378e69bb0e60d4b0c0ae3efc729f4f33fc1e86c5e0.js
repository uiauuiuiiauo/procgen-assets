export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_hatchback";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf2cf35,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bodyEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xd5a918,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x090b0c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151617,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x657078,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.45,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const headlightGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde4e6,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.0,
    roughness: 0.95,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xd86618,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xd86618,
    emissiveIntensity: 1.0,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb92120,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xb92120,
    emissiveIntensity: 1.0,
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2e9,
    metalness: 0.0,
    roughness: 0.3,
  });

  function makeShapeGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function makeSideExtrudeGeometry(points, width, bevelSize) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: width,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevelSize,
      bevelSize,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -width / 2);
    return geometry;
  }

  function makeTube(points, radius, material, closed) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, !!closed, "centripetal");
    const segments = points.length === 2 ? 1 : Math.max(8, points.length * 4);
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, !!closed),
      material
    );
  }

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const main_bodyGeom = makeSideExtrudeGeometry([
    [-1.48, 0.34],
    [1.46, 0.34],
    [1.54, 0.58],
    [1.47, 0.91],
    [1.15, 1.08],
    [0.55, 1.18],
    [-0.88, 1.18],
    [-1.30, 1.03],
    [-1.50, 0.72],
  ], 1.48, 0.055);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.rotation.y = -Math.PI / 2;
  body_group.add(main_body);

  const cabin_shellGeom = makeSideExtrudeGeometry([
    [-1.08, 1.08],
    [0.70, 1.08],
    [0.49, 1.49],
    [0.20, 1.70],
    [-0.72, 1.70],
    [-1.00, 1.58],
    [-1.18, 1.25],
  ], 1.32, 0.045);
  const cabin_shell = new THREE.Mesh(cabin_shellGeom, bodyMat);
  cabin_shell.name = "cabin_shell";
  cabin_shell.rotation.y = -Math.PI / 2;
  body_group.add(cabin_shell);

  const hood_panelGeom = new THREE.BoxGeometry(1.32, 0.055, 0.86);
  const hood_panel = new THREE.Mesh(hood_panelGeom, bodyMat);
  hood_panel.name = "hood_panel";
  hood_panel.position.set(0, 1.105, 0.98);
  hood_panel.rotation.x = 0.105;
  body_group.add(hood_panel);

  const roof_panelGeom = new THREE.SphereGeometry(1, 32, 12);
  const roof_panel = new THREE.Mesh(roof_panelGeom, bodyMat);
  roof_panel.name = "roof_panel";
  roof_panel.position.set(0, 1.69, -0.31);
  roof_panel.scale.set(0.69, 0.075, 0.72);
  body_group.add(roof_panel);

  const front_bumperGeom = new THREE.BoxGeometry(1.62, 0.23, 0.18);
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.52, 1.55);
  body_group.add(front_bumper);

  const front_bumper_cornerGeom = new THREE.SphereGeometry(1, 20, 12);
  const front_bumper_corners = new THREE.InstancedMesh(
    front_bumper_cornerGeom,
    bodyMat,
    2
  );
  front_bumper_corners.name = "front_bumper_corners";
  setInstance(front_bumper_corners, 0, -0.75, 0.53, 1.51, 0, 0, 0, 0.18, 0.14, 0.22);
  setInstance(front_bumper_corners, 1, 0.75, 0.53, 1.51, 0, 0, 0, 0.18, 0.14, 0.22);
  front_bumper_corners.instanceMatrix.needsUpdate = true;
  body_group.add(front_bumper_corners);

  const rear_bumperGeom = new THREE.BoxGeometry(1.48, 0.18, 0.16);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, bodyMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.52, -1.48);
  body_group.add(rear_bumper);

  const side_skirtGeom = new THREE.BoxGeometry(0.10, 0.14, 2.08);
  const side_skirts = new THREE.InstancedMesh(side_skirtGeom, bodyMat, 2);
  side_skirts.name = "side_skirts";
  setInstance(side_skirts, 0, -0.76, 0.42, -0.12, 0, 0, 0, 1, 1, 1);
  setInstance(side_skirts, 1, 0.76, 0.42, -0.12, 0, 0, 0, 1, 1, 1);
  side_skirts.instanceMatrix.needsUpdate = true;
  body_group.add(side_skirts);

  const wheel_archGeom = new THREE.TorusGeometry(0.39, 0.055, 8, 28, Math.PI);
  const wheel_arches = new THREE.InstancedMesh(wheel_archGeom, bodyMat, 4);
  wheel_arches.name = "wheel_arches";
  const archPositions = [
    [-0.75, 0.43, 0.98],
    [0.75, 0.43, 0.98],
    [-0.75, 0.43, -0.98],
    [0.75, 0.43, -0.98],
  ];
  for (let i = 0; i < archPositions.length; i++) {
    const p = archPositions[i];
    setInstance(wheel_arches, i, p[0], p[1], p[2], 0, Math.PI / 2, 0, 1, 1, 1);
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  body_group.add(wheel_arches);

  const windows_group = new THREE.Group();
  windows_group.name = "windows_group";
  root.add(windows_group);

  const windshield_frameGeom = makeShapeGeometry([
    [-0.68, -0.38],
    [0.68, -0.38],
    [0.57, 0.38],
    [-0.57, 0.38],
  ]);
  const windshield_frame = new THREE.Mesh(windshield_frameGeom, blackPlasticMat);
  windshield_frame.name = "windshield_frame";
  windshield_frame.position.set(0, 1.40, 0.59);
  windshield_frame.rotation.x = -0.72;
  windows_group.add(windshield_frame);

  const windshieldGeom = makeShapeGeometry([
    [-0.62, -0.33],
    [0.62, -0.33],
    [0.52, 0.33],
    [-0.52, 0.33],
  ]);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.name = "windshield";
  windshield.position.set(0, 1.40, 0.603);
  windshield.rotation.x = -0.72;
  windows_group.add(windshield);

  const rear_window_frameGeom = makeShapeGeometry([
    [-0.58, -0.29],
    [0.58, -0.29],
    [0.50, 0.29],
    [-0.50, 0.29],
  ]);
  const rear_window_frame = new THREE.Mesh(rear_window_frameGeom, blackPlasticMat);
  rear_window_frame.name = "rear_window_frame";
  rear_window_frame.position.set(0, 1.40, -1.085);
  rear_window_frame.rotation.x = 0.45;
  windows_group.add(rear_window_frame);

  const rear_windowGeom = makeShapeGeometry([
    [-0.52, -0.25],
    [0.52, -0.25],
    [0.45, 0.25],
    [-0.45, 0.25],
  ]);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.name = "rear_window";
  rear_window.position.set(0, 1.40, -1.096);
  rear_window.rotation.x = 0.45;
  windows_group.add(rear_window);

  const front_side_window_frameGeom = makeShapeGeometry([
    [-0.58, 1.13],
    [0.50, 1.13],
    [0.18, 1.66],
    [-0.54, 1.66],
  ]);
  const front_side_window_frames = new THREE.InstancedMesh(
    front_side_window_frameGeom,
    blackPlasticMat,
    2
  );
  front_side_window_frames.name = "front_side_window_frames";
  setInstance(front_side_window_frames, 0, -0.704, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(front_side_window_frames, 1, 0.704, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  front_side_window_frames.instanceMatrix.needsUpdate = true;
  windows_group.add(front_side_window_frames);

  const front_side_windowGeom = makeShapeGeometry([
    [-0.52, 1.18],
    [0.43, 1.18],
    [0.15, 1.60],
    [-0.49, 1.60],
  ]);
  const front_side_windows = new THREE.InstancedMesh(
    front_side_windowGeom,
    glassMat,
    2
  );
  front_side_windows.name = "front_side_windows";
  setInstance(front_side_windows, 0, -0.713, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(front_side_windows, 1, 0.713, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  front_side_windows.instanceMatrix.needsUpdate = true;
  windows_group.add(front_side_windows);

  const rear_side_window_frameGeom = makeShapeGeometry([
    [-1.10, 1.14],
    [-0.59, 1.14],
    [-0.60, 1.65],
    [-0.84, 1.62],
    [-1.04, 1.35],
  ]);
  const rear_side_window_frames = new THREE.InstancedMesh(
    rear_side_window_frameGeom,
    blackPlasticMat,
    2
  );
  rear_side_window_frames.name = "rear_side_window_frames";
  setInstance(rear_side_window_frames, 0, -0.704, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(rear_side_window_frames, 1, 0.704, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  rear_side_window_frames.instanceMatrix.needsUpdate = true;
  windows_group.add(rear_side_window_frames);

  const rear_side_windowGeom = makeShapeGeometry([
    [-1.04, 1.19],
    [-0.65, 1.19],
    [-0.66, 1.59],
    [-0.83, 1.57],
    [-1.00, 1.34],
  ]);
  const rear_side_windows = new THREE.InstancedMesh(
    rear_side_windowGeom,
    glassMat,
    2
  );
  rear_side_windows.name = "rear_side_windows";
  setInstance(rear_side_windows, 0, -0.713, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(rear_side_windows, 1, 0.713, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1);
  rear_side_windows.instanceMatrix.needsUpdate = true;
  windows_group.add(rear_side_windows);

  const windshield_wiper_left = makeTube([
    new THREE.Vector3(-0.53, 1.18, 0.84),
    new THREE.Vector3(-0.05, 1.23, 0.78),
  ], 0.014, blackPlasticMat, false);
  windshield_wiper_left.name = "windshield_wiper_left";
  windows_group.add(windshield_wiper_left);

  const windshield_wiper_right = makeTube([
    new THREE.Vector3(0.48, 1.18, 0.84),
    new THREE.Vector3(0.02, 1.25, 0.76),
  ], 0.014, blackPlasticMat, false);
  windshield_wiper_right.name = "windshield_wiper_right";
  windows_group.add(windshield_wiper_right);

  const interior_group = new THREE.Group();
  interior_group.name = "interior_group";
  root.add(interior_group);

  const dashboardGeom = new THREE.BoxGeometry(1.12, 0.13, 0.34);
  const dashboard = new THREE.Mesh(dashboardGeom, interiorMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.12, 0.46);
  interior_group.add(dashboard);

  const front_seat_backGeom = new THREE.BoxGeometry(0.34, 0.52, 0.16);
  const front_seat_backs = new THREE.InstancedMesh(
    front_seat_backGeom,
    interiorMat,
    2
  );
  front_seat_backs.name = "front_seat_backs";
  setInstance(front_seat_backs, 0, -0.31, 1.27, -0.10, -0.10, 0, 0, 1, 1, 1);
  setInstance(front_seat_backs, 1, 0.31, 1.27, -0.10, -0.10, 0, 0, 1, 1, 1);
  front_seat_backs.instanceMatrix.needsUpdate = true;
  interior_group.add(front_seat_backs);

  const headrestGeom = new THREE.SphereGeometry(1, 16, 10);
  const front_headrests = new THREE.InstancedMesh(headrestGeom, interiorMat, 2);
  front_headrests.name = "front_headrests";
  setInstance(front_headrests, 0, -0.31, 1.57, -0.13, 0, 0, 0, 0.16, 0.13, 0.10);
  setInstance(front_headrests, 1, 0.31, 1.57, -0.13, 0, 0, 0, 0.16, 0.13, 0.10);
  front_headrests.instanceMatrix.needsUpdate = true;
  interior_group.add(front_headrests);

  const steering_wheelGeom = new THREE.TorusGeometry(0.15, 0.022, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, blackPlasticMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.32, 1.28, 0.38);
  steering_wheel.rotation.x = -0.18;
  interior_group.add(steering_wheel);

  const steering_column = makeTube([
    new THREE.Vector3(-0.32, 1.24, 0.35),
    new THREE.Vector3(-0.32, 1.13, 0.22),
  ], 0.018, blackPlasticMat, false);
  steering_column.name = "steering_column";
  interior_group.add(steering_column);

  const rearview_mirrorGeom = new THREE.BoxGeometry(0.24, 0.08, 0.045);
  const rearview_mirror = new THREE.Mesh(rearview_mirrorGeom, blackPlasticMat);
  rearview_mirror.name = "rearview_mirror";
  rearview_mirror.position.set(0, 1.54, 0.48);
  interior_group.add(rearview_mirror);

  const trim_group = new THREE.Group();
  trim_group.name = "trim_group";
  root.add(trim_group);

  const left_door_seam = makeTube([
    new THREE.Vector3(-0.748, 1.10, 0.57),
    new THREE.Vector3(-0.748, 0.46, 0.51),
    new THREE.Vector3(-0.748, 0.44, -0.62),
    new THREE.Vector3(-0.748, 1.10, -0.62),
  ], 0.009, blackPlasticMat, false);
  left_door_seam.name = "left_door_seam";
  trim_group.add(left_door_seam);

  const right_door_seam = makeTube([
    new THREE.Vector3(0.748, 1.10, 0.57),
    new THREE.Vector3(0.748, 0.46, 0.51),
    new THREE.Vector3(0.748, 0.44, -0.62),
    new THREE.Vector3(0.748, 1.10, -0.62),
  ], 0.009, blackPlasticMat, false);
  right_door_seam.name = "right_door_seam";
  trim_group.add(right_door_seam);

  const left_window_trim = makeTube([
    new THREE.Vector3(-0.724, 1.13, 0.58),
    new THREE.Vector3(-0.724, 1.66, 0.18),
    new THREE.Vector3(-0.724, 1.65, -0.84),
    new THREE.Vector3(-0.724, 1.14, -1.10),
  ], 0.012, blackPlasticMat, false);
  left_window_trim.name = "left_window_trim";
  trim_group.add(left_window_trim);

  const right_window_trim = makeTube([
    new THREE.Vector3(0.724, 1.13, 0.58),
    new THREE.Vector3(0.724, 1.66, 0.18),
    new THREE.Vector3(0.724, 1.65, -0.84),
    new THREE.Vector3(0.724, 1.14, -1.10),
  ], 0.012, blackPlasticMat, false);
  right_window_trim.name = "right_window_trim";
  trim_group.add(right_window_trim);

  const left_body_crease = makeTube([
    new THREE.Vector3(-0.752, 0.67, 1.20),
    new THREE.Vector3(-0.752, 0.67, -1.18),
  ], 0.011, bodyEdgeMat, false);
  left_body_crease.name = "left_body_crease";
  trim_group.add(left_body_crease);

  const right_body_crease = makeTube([
    new THREE.Vector3(0.752, 0.67, 1.20),
    new THREE.Vector3(0.752, 0.67, -1.18),
  ], 0.011, bodyEdgeMat, false);
  right_body_crease.name = "right_body_crease";
  trim_group.add(right_body_crease);

  const door_handleGeom = new THREE.BoxGeometry(0.045, 0.075, 0.20);
  const door_handles = new THREE.InstancedMesh(
    door_handleGeom,
    blackPlasticMat,
    2
  );
  door_handles.name = "door_handles";
  setInstance(door_handles, 0, -0.775, 1.00, -0.40, 0, 0, 0, 1, 1, 1);
  setInstance(door_handles, 1, 0.775, 1.00, -0.40, 0, 0, 0, 1, 1, 1);
  door_handles.instanceMatrix.needsUpdate = true;
  trim_group.add(door_handles);

  const mirror_stem_left = makeTube([
    new THREE.Vector3(-0.68, 1.15, 0.48),
    new THREE.Vector3(-0.82, 1.18, 0.52),
  ], 0.035, blackPlasticMat, false);
  mirror_stem_left.name = "mirror_stem_left";
  trim_group.add(mirror_stem_left);

  const mirror_stem_right = makeTube([
    new THREE.Vector3(0.68, 1.15, 0.48),
    new THREE.Vector3(0.82, 1.18, 0.52),
  ], 0.035, blackPlasticMat, false);
  mirror_stem_right.name = "mirror_stem_right";
  trim_group.add(mirror_stem_right);

  const mirror_housingGeom = new THREE.SphereGeometry(1, 20, 12);
  const mirror_housings = new THREE.InstancedMesh(
    mirror_housingGeom,
    blackPlasticMat,
    2
  );
  mirror_housings.name = "mirror_housings";
  setInstance(mirror_housings, 0, -0.88, 1.23, 0.54, 0, 0, 0, 0.15, 0.10, 0.13);
  setInstance(mirror_housings, 1, 0.88, 1.23, 0.54, 0, 0, 0, 0.15, 0.10, 0.13);
  mirror_housings.instanceMatrix.needsUpdate = true;
  trim_group.add(mirror_housings);

  const mirror_glassGeom = new THREE.CircleGeometry(1, 20);
  const mirror_glass = new THREE.InstancedMesh(mirror_glassGeom, glassMat, 2);
  mirror_glass.name = "mirror_glass";
  setInstance(mirror_glass, 0, -0.985, 1.23, 0.54, 0, -Math.PI / 2, 0, 0.10, 0.07, 1);
  setInstance(mirror_glass, 1, 0.985, 1.23, 0.54, 0, Math.PI / 2, 0, 0.10, 0.07, 1);
  mirror_glass.instanceMatrix.needsUpdate = true;
  trim_group.add(mirror_glass);

  const side_indicatorGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16);
  const side_indicators = new THREE.InstancedMesh(
    side_indicatorGeom,
    amberMat,
    2
  );
  side_indicators.name = "side_indicators";
  setInstance(side_indicators, 0, -0.785, 0.91, 0.80, 0, 0, Math.PI / 2, 1, 1, 1);
  setInstance(side_indicators, 1, 0.785, 0.91, 0.80, 0, 0, Math.PI / 2, 1, 1, 1);
  side_indicators.instanceMatrix.needsUpdate = true;
  trim_group.add(side_indicators);

  const fuel_doorGeom = new THREE.TorusGeometry(0.085, 0.008, 6, 24);
  const fuel_door = new THREE.Mesh(fuel_doorGeom, bodyEdgeMat);
  fuel_door.name = "fuel_door";
  fuel_door.position.set(0.758, 0.91, -1.04);
  fuel_door.rotation.y = Math.PI / 2;
  trim_group.add(fuel_door);

  const roof_antenna = makeTube([
    new THREE.Vector3(0.16, 1.73, -0.56),
    new THREE.Vector3(0.24, 1.96, -0.66),
  ], 0.012, blackPlasticMat, false);
  roof_antenna.name = "roof_antenna";
  trim_group.add(roof_antenna);

  const front_group = new THREE.Group();
  front_group.name = "front_group";
  root.add(front_group);

  const grille_frameGeom = makeShapeGeometry([
    [-0.56, 0.14],
    [0.56, 0.14],
    [0.49, -0.16],
    [-0.49, -0.16],
  ]);
  const grille_frame = new THREE.Mesh(grille_frameGeom, silverMat);
  grille_frame.name = "grille_frame";
  grille_frame.position.set(0, 0.91, 1.575);
  front_group.add(grille_frame);

  const grilleGeom = makeShapeGeometry([
    [-0.51, 0.105],
    [0.51, 0.105],
    [0.45, -0.125],
    [-0.45, -0.125],
  ]);
  const grille = new THREE.Mesh(grilleGeom, grilleMat);
  grille.name = "grille";
  grille.position.set(0, 0.91, 1.588);
  front_group.add(grille);

  const grille_horizontal_slatsGeom = new THREE.BoxGeometry(0.88, 0.012, 0.012);
  const grille_horizontal_slats = new THREE.InstancedMesh(
    grille_horizontal_slatsGeom,
    blackPlasticMat,
    5
  );
  grille_horizontal_slats.name = "grille_horizontal_slats";
  for (let i = 0; i < 5; i++) {
    setInstance(grille_horizontal_slats, i, 0, 0.83 + i * 0.04, 1.600, 0, 0, 0, 1, 1, 1);
  }
  grille_horizontal_slats.instanceMatrix.needsUpdate = true;
  front_group.add(grille_horizontal_slats);

  const grille_vertical_slatsGeom = new THREE.BoxGeometry(0.012, 0.22, 0.012);
  const grille_vertical_slats = new THREE.InstancedMesh(
    grille_vertical_slatsGeom,
    blackPlasticMat,
    9
  );
  grille_vertical_slats.name = "grille_vertical_slats";
  for (let i = 0; i < 9; i++) {
    setInstance(grille_vertical_slats, i, -0.36 + i * 0.09, 0.91, 1.602, 0, 0, 0, 1, 1, 1);
  }
  grille_vertical_slats.instanceMatrix.needsUpdate = true;
  front_group.add(grille_vertical_slats);

  const grille_badge_stemGeom = new THREE.BoxGeometry(0.035, 0.15, 0.025);
  const grille_badge_stem = new THREE.Mesh(grille_badge_stemGeom, silverMat);
  grille_badge_stem.name = "grille_badge_stem";
  grille_badge_stem.position.set(0, 0.90, 1.625);
  front_group.add(grille_badge_stem);

  const grille_badge_left = makeTube([
    new THREE.Vector3(-0.07, 0.97, 1.628),
    new THREE.Vector3(0, 0.84, 1.628),
  ], 0.014, silverMat, false);
  grille_badge_left.name = "grille_badge_left";
  front_group.add(grille_badge_left);

  const grille_badge_right = makeTube([
    new THREE.Vector3(0.07, 0.97, 1.628),
    new THREE.Vector3(0, 0.84, 1.628),
  ], 0.014, silverMat, false);
  grille_badge_right.name = "grille_badge_right";
  front_group.add(grille_badge_right);

  const headlight_housingGeom = makeShapeGeometry([
    [-0.22, -0.14],
    [0.20, -0.14],
    [0.23, 0.12],
    [-0.18, 0.16],
  ]);
  const headlight_housings = new THREE.InstancedMesh(
    headlight_housingGeom,
    blackPlasticMat,
    2
  );
  headlight_housings.name = "headlight_housings";
  setInstance(headlight_housings, 0, -0.61, 0.92, 1.578, 0, 0, 0, -1, 1, 1);
  setInstance(headlight_housings, 1, 0.61, 0.92, 1.578, 0, 0, 0, 1, 1, 1);
  headlight_housings.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_housings);

  const headlight_lensGeom = new THREE.CircleGeometry(0.16, 24);
  const headlight_lenses = new THREE.InstancedMesh(
    headlight_lensGeom,
    headlightGlassMat,
    2
  );
  headlight_lenses.name = "headlight_lenses";
  setInstance(headlight_lenses, 0, -0.61, 0.93, 1.602, 0, 0, 0, 1, 0.88, 1);
  setInstance(headlight_lenses, 1, 0.61, 0.93, 1.602, 0, 0, 0, 1, 0.88, 1);
  headlight_lenses.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_lenses);

  const headlight_reflectorGeom = new THREE.TorusGeometry(0.105, 0.018, 8, 24);
  const headlight_reflectors = new THREE.InstancedMesh(
    headlight_reflectorGeom,
    silverMat,
    2
  );
  headlight_reflectors.name = "headlight_reflectors";
  setInstance(headlight_reflectors, 0, -0.61, 0.93, 1.612, 0, 0, 0, 1, 0.88, 1);
  setInstance(headlight_reflectors, 1, 0.61, 0.93, 1.612, 0, 0, 0, 1, 0.88, 1);
  headlight_reflectors.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_reflectors);

  const headlight_bulbGeom = new THREE.CircleGeometry(0.045, 18);
  const headlight_bulbs = new THREE.InstancedMesh(
    headlight_bulbGeom,
    whiteMat,
    2
  );
  headlight_bulbs.name = "headlight_bulbs";
  setInstance(headlight_bulbs, 0, -0.61, 0.93, 1.617, 0, 0, 0, 1, 1, 1);
  setInstance(headlight_bulbs, 1, 0.61, 0.93, 1.617, 0, 0, 0, 1, 1, 1);
  headlight_bulbs.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_bulbs);

  const front_indicatorsGeom = new THREE.BoxGeometry(0.075, 0.22, 0.018);
  const front_indicators = new THREE.InstancedMesh(
    front_indicatorsGeom,
    amberMat,
    2
  );
  front_indicators.name = "front_indicators";
  setInstance(front_indicators, 0, -0.79, 0.92, 1.610, 0, 0, 0, 1, 1, 1);
  setInstance(front_indicators, 1, 0.79, 0.92, 1.610, 0, 0, 0, 1, 1, 1);
  front_indicators.instanceMatrix.needsUpdate = true;
  front_group.add(front_indicators);

  const lower_grilleGeom = makeShapeGeometry([
    [-0.58, -0.11],
    [0.58, -0.11],
    [0.52, 0.11],
    [-0.52, 0.11],
  ]);
  const lower_grille = new THREE.Mesh(lower_grilleGeom, grilleMat);
  lower_grille.name = "lower_grille";
  lower_grille.position.set(0, 0.47, 1.653);
  front_group.add(lower_grille);

  const lower_grille_slatsGeom = new THREE.BoxGeometry(0.018, 0.22, 0.012);
  const lower_grille_slats = new THREE.InstancedMesh(
    lower_grille_slatsGeom,
    bodyEdgeMat,
    7
  );
  lower_grille_slats.name = "lower_grille_slats";
  for (let i = 0; i < 7; i++) {
    setInstance(
      lower_grille_slats,
      i,
      -0.42 + i * 0.14,
      0.47,
      1.664,
      0,
      0,
      i % 2 === 0 ? 0.45 : -0.45,
      1,
      1,
      1
    );
  }
  lower_grille_slats.instanceMatrix.needsUpdate = true;
  front_group.add(lower_grille_slats);

  const lower_grille_crossbarsGeom = new THREE.BoxGeometry(1.04, 0.014, 0.012);
  const lower_grille_crossbars = new THREE.InstancedMesh(
    lower_grille_crossbarsGeom,
    bodyEdgeMat,
    3
  );
  lower_grille_crossbars.name = "lower_grille_crossbars";
  for (let i = 0; i < 3; i++) {
    setInstance(lower_grille_crossbars, i, 0, 0.40 + i * 0.07, 1.666, 0, 0, 0, 1, 1, 1);
  }
  lower_grille_crossbars.instanceMatrix.needsUpdate = true;
  front_group.add(lower_grille_crossbars);

  const bumper_ventGeom = new THREE.BoxGeometry(0.25, 0.10, 0.025);
  const bumper_vents = new THREE.InstancedMesh(
    bumper_ventGeom,
    grilleMat,
    3
  );
  bumper_vents.name = "bumper_vents";
  setInstance(bumper_vents, 0, -0.31, 0.68, 1.654, 0, 0, 0, 1, 1, 1);
  setInstance(bumper_vents, 1, 0, 0.68, 1.654, 0, 0, 0, 1, 1, 1);
  setInstance(bumper_vents, 2, 0.31, 0.68, 1.654, 0, 0, 0, 1, 1, 1);
  bumper_vents.instanceMatrix.needsUpdate = true;
  front_group.add(bumper_vents);

  const fog_light_rimGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 20);
  const fog_light_rims = new THREE.InstancedMesh(
    fog_light_rimGeom,
    silverMat,
    2
  );
  fog_light_rims.name = "fog_light_rims";
  setInstance(fog_light_rims, 0, -0.61, 0.49, 1.657, Math.PI / 2, 0, 0, 1, 1, 1);
  setInstance(fog_light_rims, 1, 0.61, 0.49, 1.657, Math.PI / 2, 0, 0, 1, 1, 1);
  fog_light_rims.instanceMatrix.needsUpdate = true;
  front_group.add(fog_light_rims);

  const fog_light_lensGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.042, 20);
  const fog_light_lenses = new THREE.InstancedMesh(
    fog_light_lensGeom,
    headlightGlassMat,
    2
  );
  fog_light_lenses.name = "fog_light_lenses";
  setInstance(fog_light_lenses, 0, -0.61, 0.49, 1.677, Math.PI / 2, 0, 0, 1, 1, 1);
  setInstance(fog_light_lenses, 1, 0.61, 0.49, 1.677, Math.PI / 2, 0, 0, 1, 1, 1);
  fog_light_lenses.instanceMatrix.needsUpdate = true;
  front_group.add(fog_light_lenses);

  const rear_group = new THREE.Group();
  rear_group.name = "rear_group";
  root.add(rear_group);

  const tail_lightGeom = new THREE.BoxGeometry(0.17, 0.34, 0.045);
  const tail_lights = new THREE.InstancedMesh(tail_lightGeom, redMat, 2);
  tail_lights.name = "tail_lights";
  setInstance(tail_lights, 0, -0.65, 0.91, -1.505, 0, 0, 0, 1, 1, 1);
  setInstance(tail_lights, 1, 0.65, 0.91, -1.505, 0, 0, 0, 1, 1, 1);
  tail_lights.instanceMatrix.needsUpdate = true;
  rear_group.add(tail_lights);

  const rear_indicatorGeom = new THREE.BoxGeometry(0.14, 0.08, 0.052);
  const rear_indicators = new THREE.InstancedMesh(
    rear_indicatorGeom,
    amberMat,
    2
  );
  rear_indicators.name = "rear_indicators";
  setInstance(rear_indicators, 0, -0.65, 0.84, -1.532, 0, 0, 0, 1, 1, 1);
  setInstance(rear_indicators, 1, 0.65, 0.84, -1.532, 0, 0, 0, 1, 1, 1);
  rear_indicators.instanceMatrix.needsUpdate = true;
  rear_group.add(rear_indicators);

  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  root.add(wheel_group);

  const wheelY = 0.43;
  const wheelX = 0.78;
  const frontAxleZ = 0.98;
  const rearAxleZ = -0.98;
  const wheelPositions = [
    [-wheelX, wheelY, frontAxleZ],
    [wheelX, wheelY, frontAxleZ],
    [-wheelX, wheelY, rearAxleZ],
    [wheelX, wheelY, rearAxleZ],
  ];

  const tireGeom = new THREE.TorusGeometry(0.285, 0.095, 12, 32);
  const tires = new THREE.InstancedMesh(tireGeom, rubberMat, 4);
  tires.name = "tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    setInstance(tires, i, p[0], p[1], p[2], 0, Math.PI / 2, 0, 1, 1, 1);
  }
  tires.instanceMatrix.needsUpdate = true;
  wheel_group.add(tires);

  const tire_treadGeom = new THREE.BoxGeometry(0.19, 0.028, 0.068);
  const tire_treads = new THREE.InstancedMesh(tire_treadGeom, rubberMat, 64);
  tire_treads.name = "tire_treads";
  let treadIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    for (let i = 0; i < 16; i++) {
      const angle = i / 16 * Math.PI * 2;
      setInstance(
        tire_treads,
        treadIndex++,
        p[0],
        p[1] + Math.cos(angle) * 0.374,
        p[2] + Math.sin(angle) * 0.374,
        angle,
        0,
        0,
        1,
        1,
        1
      );
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  wheel_group.add(tire_treads);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.16, 24);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, silverMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    setInstance(wheel_hubs, i, p[0], p[1], p[2], 0, 0, Math.PI / 2, 1, 1, 1);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_hubs);

  const wheel_spokeGeom = new THREE.BoxGeometry(0.025, 0.22, 0.052);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokeGeom, silverMat, 20);
  wheel_spokes.name = "wheel_spokes";
  let spokeIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    const side = p[0] < 0 ? -1 : 1;
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      setInstance(
        wheel_spokes,
        spokeIndex++,
        side * 0.875,
        p[1] + Math.cos(angle) * 0.115,
        p[2] + Math.sin(angle) * 0.115,
        angle,
        0,
        0,
        1,
        1,
        1
      );
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_spokes);

  const wheel_center_capGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 18);
  const wheel_center_caps = new THREE.InstancedMesh(
    wheel_center_capGeom,
    silverMat,
    4
  );
  wheel_center_caps.name = "wheel_center_caps";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    setInstance(
      wheel_center_caps,
      i,
      side * 0.895,
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
  wheel_center_caps.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_center_caps);

  fitToUnitCube(THREE, root);
  return root;

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
}