export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_hatchback";

  const length = 3.84;
  const width = 1.66;
  const wheelR = 0.385;
  const wheelY = 0.39;
  const frontAxleZ = 1.14;
  const rearAxleZ = -1.18;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf0c83e,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x80651d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x090b0c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grilleBarMat = new THREE.MeshStandardMaterial({
    color: 0x303437,
    metalness: 0.0,
    roughness: 0.8,
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111212,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x66767d,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
  });
  const clearLensMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xd87818,
    metalness: 0.0,
    roughness: 0.3,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xa51f1f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x303435,
    metalness: 0.0,
    roughness: 0.95,
  });

  function createRod(start, end, radius, material, segments = 8) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const rodGeom = new THREE.CylinderGeometry(
      radius,
      radius,
      direction.length(),
      segments
    );
    const rod = new THREE.Mesh(rodGeom, material);
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return rod;
  }

  function createSidePanel(points, side, material, xOffset) {
    const panelShape = new THREE.Shape();
    panelShape.moveTo(-side * points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      panelShape.lineTo(-side * points[i][0], points[i][1]);
    }
    panelShape.closePath();
    const panelGeom = new THREE.ShapeGeometry(panelShape, 12);
    const panel = new THREE.Mesh(panelGeom, material);
    panel.rotation.y = side * Math.PI / 2;
    panel.position.x = side * xOffset;
    return panel;
  }

  function createTube(points, radius, material, tubularSegments = 24) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const tubeGeom = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      radius,
      8,
      false
    );
    return new THREE.Mesh(tubeGeom, material);
  }

  function createHeadlightHousing(points) {
    const housingShape = new THREE.Shape();
    housingShape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      housingShape.lineTo(points[i][0], points[i][1]);
    }
    housingShape.closePath();
    return new THREE.Mesh(
      new THREE.ShapeGeometry(housingShape, 8),
      blackMat
    );
  }

  function createHeadlightLens(points) {
    const lensShape = new THREE.Shape();
    lensShape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      lensShape.lineTo(points[i][0], points[i][1]);
    }
    lensShape.closePath();
    return new THREE.Mesh(
      new THREE.ShapeGeometry(lensShape, 8),
      clearLensMat
    );
  }

  function createRoundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
    shape.closePath();
    return shape;
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-1.68, 0.30);
  bodyShape.lineTo(1.54, 0.30);
  bodyShape.lineTo(1.72, 0.43);
  bodyShape.lineTo(1.70, 0.88);
  bodyShape.lineTo(1.55, 1.15);
  bodyShape.lineTo(0.82, 1.30);
  bodyShape.lineTo(0.34, 1.74);
  bodyShape.lineTo(0.06, 1.84);
  bodyShape.lineTo(-1.22, 1.84);
  bodyShape.lineTo(-1.50, 1.70);
  bodyShape.lineTo(-1.68, 1.24);
  bodyShape.lineTo(-1.68, 0.30);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: width,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 3,
  });
  bodyGeom.translate(0, 0, -width / 2);
  const body_shell = new THREE.Mesh(bodyGeom, bodyMat);
  body_shell.name = "body_shell";
  body_shell.rotation.y = -Math.PI / 2;
  root.add(body_shell);

  const underbodyGeom = new THREE.BoxGeometry(1.38, 0.14, 2.75);
  const underbody = new THREE.Mesh(underbodyGeom, blackMat);
  underbody.name = "underbody";
  underbody.position.set(0, 0.29, -0.05);
  root.add(underbody);

  const front_bumperShape = createRoundedRectShape(1.72, 0.31, 0.09);
  const front_bumperGeom = new THREE.ExtrudeGeometry(front_bumperShape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.53, 1.70);
  root.add(front_bumper);

  const rear_bumperGeom = new THREE.BoxGeometry(1.62, 0.20, 0.16);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, bodyMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.48, -1.69);
  root.add(rear_bumper);

  const hood_panelGeom = new THREE.BoxGeometry(1.50, 0.055, 1.02);
  const hood_panel = new THREE.Mesh(hood_panelGeom, bodyMat);
  hood_panel.name = "hood_panel";
  hood_panel.position.set(0, 1.19, 1.16);
  hood_panel.rotation.x = 0.13;
  root.add(hood_panel);

  const roof_panelGeom = new THREE.BoxGeometry(1.48, 0.065, 1.40);
  const roof_panel = new THREE.Mesh(roof_panelGeom, bodyMat);
  roof_panel.name = "roof_panel";
  roof_panel.position.set(0, 1.825, -0.57);
  root.add(roof_panel);

  const windshieldShape = new THREE.Shape();
  windshieldShape.moveTo(-0.70, -0.35);
  windshieldShape.lineTo(0.70, -0.35);
  windshieldShape.lineTo(0.59, 0.35);
  windshieldShape.lineTo(-0.59, 0.35);
  windshieldShape.closePath();
  const windshieldGeom = new THREE.ShapeGeometry(windshieldShape, 16);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.name = "windshield";
  windshield.position.set(0, 1.50, 0.60);
  windshield.rotation.x = -0.68;
  root.add(windshield);

  const windshield_trim = new THREE.Group();
  windshield_trim.name = "windshield_trim";
  const windshieldCorners = [
    new THREE.Vector3(-0.72, 1.18, 0.84),
    new THREE.Vector3(0.72, 1.18, 0.84),
    new THREE.Vector3(0.61, 1.80, 0.36),
    new THREE.Vector3(-0.61, 1.80, 0.36),
  ];
  for (let i = 0; i < 4; i++) {
    windshield_trim.add(
      createRod(
        windshieldCorners[i],
        windshieldCorners[(i + 1) % 4],
        0.026,
        blackMat,
        10
      )
    );
  }
  root.add(windshield_trim);

  const frontWindowPoints = [
    [0.66, 1.21],
    [0.31, 1.74],
    [-0.45, 1.75],
    [-0.51, 1.20],
  ];
  const rearWindowPoints = [
    [-0.60, 1.20],
    [-0.56, 1.75],
    [-1.17, 1.72],
    [-1.48, 1.24],
  ];

  const front_left_window = createSidePanel(
    frontWindowPoints,
    -1,
    glassMat,
    0.883
  );
  front_left_window.name = "front_left_window";
  root.add(front_left_window);

  const front_right_window = createSidePanel(
    frontWindowPoints,
    1,
    glassMat,
    0.883
  );
  front_right_window.name = "front_right_window";
  root.add(front_right_window);

  const rear_left_window = createSidePanel(
    rearWindowPoints,
    -1,
    glassMat,
    0.883
  );
  rear_left_window.name = "rear_left_window";
  root.add(rear_left_window);

  const rear_right_window = createSidePanel(
    rearWindowPoints,
    1,
    glassMat,
    0.883
  );
  rear_right_window.name = "rear_right_window";
  root.add(rear_right_window);

  const side_window_trim = new THREE.Group();
  side_window_trim.name = "side_window_trim";
  for (const side of [-1, 1]) {
    const x = side * 0.895;
    const frontPoints = [
      new THREE.Vector3(x, 1.21, 0.66),
      new THREE.Vector3(x, 1.74, 0.31),
      new THREE.Vector3(x, 1.75, -0.45),
      new THREE.Vector3(x, 1.20, -0.51),
    ];
    const rearPoints = [
      new THREE.Vector3(x, 1.20, -0.60),
      new THREE.Vector3(x, 1.75, -0.56),
      new THREE.Vector3(x, 1.72, -1.17),
      new THREE.Vector3(x, 1.24, -1.48),
    ];
    for (let i = 0; i < 4; i++) {
      side_window_trim.add(
        createRod(
          frontPoints[i],
          frontPoints[(i + 1) % 4],
          0.018,
          blackMat,
          8
        )
      );
      side_window_trim.add(
        createRod(
          rearPoints[i],
          rearPoints[(i + 1) % 4],
          0.018,
          blackMat,
          8
        )
      );
    }
  }
  root.add(side_window_trim);

  const rear_windowShape = new THREE.Shape();
  rear_windowShape.moveTo(-0.65, -0.27);
  rear_windowShape.lineTo(0.65, -0.27);
  rear_windowShape.lineTo(0.57, 0.27);
  rear_windowShape.lineTo(-0.57, 0.27);
  rear_windowShape.closePath();
  const rear_windowGeom = new THREE.ShapeGeometry(rear_windowShape, 12);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.name = "rear_window";
  rear_window.position.set(0, 1.48, -1.62);
  rear_window.rotation.x = 0.35;
  root.add(rear_window);

  const rear_window_trim = new THREE.Group();
  rear_window_trim.name = "rear_window_trim";
  const rearWindowCorners = [
    new THREE.Vector3(-0.67, 1.20, -1.71),
    new THREE.Vector3(0.67, 1.20, -1.71),
    new THREE.Vector3(0.59, 1.75, -1.53),
    new THREE.Vector3(-0.59, 1.75, -1.53),
  ];
  for (let i = 0; i < 4; i++) {
    rear_window_trim.add(
      createRod(
        rearWindowCorners[i],
        rearWindowCorners[(i + 1) % 4],
        0.022,
        blackMat,
        10
      )
    );
  }
  root.add(rear_window_trim);

  const dashboardGeom = new THREE.BoxGeometry(1.28, 0.13, 0.34);
  const dashboard = new THREE.Mesh(dashboardGeom, blackMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.15, 0.55);
  root.add(dashboard);

  const seat_baseGeom = new THREE.BoxGeometry(0.48, 0.15, 0.52);
  const seat_backGeom = new THREE.BoxGeometry(0.45, 0.61, 0.17);
  const headrestGeom = new THREE.SphereGeometry(0.18, 16, 10);

  const driver_seat = new THREE.Group();
  driver_seat.name = "driver_seat";
  const driver_seat_base = new THREE.Mesh(seat_baseGeom, interiorMat);
  driver_seat_base.position.set(-0.34, 0.82, -0.08);
  const driver_seat_back = new THREE.Mesh(seat_backGeom, interiorMat);
  driver_seat_back.position.set(-0.34, 1.13, -0.30);
  driver_seat_back.rotation.x = -0.08;
  const driver_headrest = new THREE.Mesh(headrestGeom, interiorMat);
  driver_headrest.position.set(-0.34, 1.53, -0.34);
  driver_headrest.scale.set(1.0, 1.15, 0.65);
  driver_seat.add(driver_seat_base, driver_seat_back, driver_headrest);
  root.add(driver_seat);

  const passenger_seat = new THREE.Group();
  passenger_seat.name = "passenger_seat";
  const passenger_seat_base = new THREE.Mesh(seat_baseGeom, interiorMat);
  passenger_seat_base.position.set(0.34, 0.82, -0.08);
  const passenger_seat_back = new THREE.Mesh(seat_backGeom, interiorMat);
  passenger_seat_back.position.set(0.34, 1.13, -0.30);
  passenger_seat_back.rotation.x = -0.08;
  const passenger_headrest = new THREE.Mesh(headrestGeom, interiorMat);
  passenger_headrest.position.set(0.34, 1.53, -0.34);
  passenger_headrest.scale.set(1.0, 1.15, 0.65);
  passenger_seat.add(
    passenger_seat_base,
    passenger_seat_back,
    passenger_headrest
  );
  root.add(passenger_seat);

  const rear_seatGeom = new THREE.BoxGeometry(1.15, 0.48, 0.18);
  const rear_seat = new THREE.Mesh(rear_seatGeom, interiorMat);
  rear_seat.name = "rear_seat";
  rear_seat.position.set(0, 1.05, -1.08);
  rear_seat.rotation.x = -0.12;
  root.add(rear_seat);

  const steering_wheelGeom = new THREE.TorusGeometry(0.15, 0.018, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, blackMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.36, 1.34, 0.39);
  steering_wheel.rotation.x = -0.18;
  root.add(steering_wheel);

  const steering_column = createRod(
    new THREE.Vector3(-0.36, 1.29, 0.36),
    new THREE.Vector3(-0.36, 1.17, 0.51),
    0.018,
    blackMat,
    8
  );
  steering_column.name = "steering_column";
  root.add(steering_column);

  const rearview_mirrorGeom = new THREE.BoxGeometry(0.28, 0.09, 0.045);
  const rearview_mirror = new THREE.Mesh(rearview_mirrorGeom, blackMat);
  rearview_mirror.name = "rearview_mirror";
  rearview_mirror.position.set(0, 1.65, 0.48);
  root.add(rearview_mirror);

  const left_wiper = createRod(
    new THREE.Vector3(-0.57, 1.205, 0.846),
    new THREE.Vector3(-0.04, 1.285, 0.785),
    0.014,
    blackMat,
    8
  );
  left_wiper.name = "left_wiper";
  root.add(left_wiper);

  const right_wiper = createRod(
    new THREE.Vector3(0.56, 1.205, 0.846),
    new THREE.Vector3(0.06, 1.285, 0.785),
    0.014,
    blackMat,
    8
  );
  right_wiper.name = "right_wiper";
  root.add(right_wiper);

  const left_hood_seam = createTube(
    [
      new THREE.Vector3(-0.72, 1.255, 0.72),
      new THREE.Vector3(-0.78, 1.205, 1.18),
      new THREE.Vector3(-0.72, 1.13, 1.63),
    ],
    0.009,
    seamMat,
    18
  );
  left_hood_seam.name = "left_hood_seam";
  root.add(left_hood_seam);

  const right_hood_seam = createTube(
    [
      new THREE.Vector3(0.72, 1.255, 0.72),
      new THREE.Vector3(0.78, 1.205, 1.18),
      new THREE.Vector3(0.72, 1.13, 1.63),
    ],
    0.009,
    seamMat,
    18
  );
  right_hood_seam.name = "right_hood_seam";
  root.add(right_hood_seam);

  const door_seams = new THREE.Group();
  door_seams.name = "door_seams";
  for (const side of [-1, 1]) {
    const x = side * 0.892;
    door_seams.add(
      createTube(
        [
          new THREE.Vector3(x, 1.18, 0.65),
          new THREE.Vector3(x, 0.78, 0.61),
          new THREE.Vector3(x, 0.43, 0.57),
        ],
        0.008,
        seamMat,
        14
      )
    );
    door_seams.add(
      createTube(
        [
          new THREE.Vector3(x, 1.18, -0.57),
          new THREE.Vector3(x, 0.78, -0.56),
          new THREE.Vector3(x, 0.43, -0.54),
        ],
        0.008,
        seamMat,
        14
      )
    );
    door_seams.add(
      createRod(
        new THREE.Vector3(x, 0.66, 0.59),
        new THREE.Vector3(x, 0.66, -0.54),
        0.008,
        seamMat,
        8
      )
    );
  }
  root.add(door_seams);

  const dummy = new THREE.Object3D();

  const door_handleGeom = new THREE.BoxGeometry(0.045, 0.065, 0.19);
  const door_handles = new THREE.InstancedMesh(door_handleGeom, blackMat, 2);
  door_handles.name = "door_handles";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.905, 1.04, -0.42);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_handles.setMatrixAt(i, dummy.matrix);
  }
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handles);

  const side_skirtGeom = new THREE.BoxGeometry(0.075, 0.15, 1.72);
  const side_skirts = new THREE.InstancedMesh(side_skirtGeom, bodyMat, 2);
  side_skirts.name = "side_skirts";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.86, 0.42, -0.05);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_skirts.setMatrixAt(i, dummy.matrix);
  }
  side_skirts.instanceMatrix.needsUpdate = true;
  root.add(side_skirts);

  const mirrorGeom = new THREE.SphereGeometry(0.15, 18, 12);
  const side_mirrors = new THREE.InstancedMesh(mirrorGeom, blackMat, 2);
  side_mirrors.name = "side_mirrors";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 1.00, 1.27, 0.55);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1.20, 0.72, 0.82);
    dummy.updateMatrix();
    side_mirrors.setMatrixAt(i, dummy.matrix);
  }
  side_mirrors.instanceMatrix.needsUpdate = true;
  root.add(side_mirrors);

  const mirror_stalks = new THREE.Group();
  mirror_stalks.name = "mirror_stalks";
  for (const side of [-1, 1]) {
    mirror_stalks.add(
      createRod(
        new THREE.Vector3(side * 0.82, 1.20, 0.53),
        new THREE.Vector3(side * 0.96, 1.24, 0.54),
        0.035,
        blackMat,
        10
      )
    );
  }
  root.add(mirror_stalks);

  const mirror_glassGeom = new THREE.CircleGeometry(0.105, 20);
  const left_mirror_glass = new THREE.Mesh(mirror_glassGeom, glassMat);
  left_mirror_glass.name = "left_mirror_glass";
  left_mirror_glass.position.set(-1.105, 1.27, 0.55);
  left_mirror_glass.rotation.y = -Math.PI / 2;
  left_mirror_glass.scale.set(1, 0.68, 1);
  root.add(left_mirror_glass);

  const right_mirror_glass = new THREE.Mesh(mirror_glassGeom, glassMat);
  right_mirror_glass.name = "right_mirror_glass";
  right_mirror_glass.position.set(1.105, 1.27, 0.55);
  right_mirror_glass.rotation.y = Math.PI / 2;
  right_mirror_glass.scale.set(1, 0.68, 1);
  root.add(right_mirror_glass);

  const wheelPositions = [
    [-0.84, wheelY, frontAxleZ],
    [0.84, wheelY, frontAxleZ],
    [-0.84, wheelY, rearAxleZ],
    [0.84, wheelY, rearAxleZ],
  ];

  const tireGeom = new THREE.TorusGeometry(0.28, 0.105, 12, 30);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  tires.name = "tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tires.setMatrixAt(i, dummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const wheel_rimGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.075, 24);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimGeom, silverMat, 4);
  wheel_rims.name = "wheel_rims";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.925, p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_rims.setMatrixAt(i, dummy.matrix);
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  root.add(wheel_rims);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.085, 16);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, silverMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.955, p[1], p[2]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const wheel_spokeGeom = new THREE.BoxGeometry(0.022, 0.045, 0.205);
  const wheel_spokes = new THREE.InstancedMesh(
    wheel_spokeGeom,
    blackMat,
    24
  );
  wheel_spokes.name = "wheel_spokes";
  let spokeIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    const side = p[0] < 0 ? -1 : 1;
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      dummy.position.set(
        side * 0.966,
        p[1] + Math.sin(angle) * 0.115,
        p[2] + Math.cos(angle) * 0.115
      );
      dummy.rotation.set(-angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_spokes.setMatrixAt(spokeIndex, dummy.matrix);
      spokeIndex++;
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_archGeom = new THREE.TorusGeometry(
    wheelR + 0.025,
    0.045,
    8,
    28,
    Math.PI
  );
  const wheel_arches = new THREE.InstancedMesh(wheel_archGeom, bodyMat, 4);
  wheel_arches.name = "wheel_arches";
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    dummy.position.set(side * 0.885, p[1], p[2]);
    dummy.rotation.set(0, side * Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_arches.setMatrixAt(i, dummy.matrix);
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  root.add(wheel_arches);

  const tire_treadGeom = new THREE.BoxGeometry(0.19, 0.035, 0.072);
  const tire_treads = new THREE.InstancedMesh(tire_treadGeom, tireMat, 64);
  tire_treads.name = "tire_treads";
  let treadIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    for (let i = 0; i < 16; i++) {
      const angle = i / 16 * Math.PI * 2;
      dummy.position.set(
        p[0],
        p[1] + Math.cos(angle) * 0.382,
        p[2] + Math.sin(angle) * 0.382
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      tire_treads.setMatrixAt(treadIndex, dummy.matrix);
      treadIndex++;
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  root.add(tire_treads);

  const grilleShape = new THREE.Shape();
  grilleShape.moveTo(-0.53, 0.18);
  grilleShape.lineTo(0.53, 0.18);
  grilleShape.lineTo(0.47, -0.18);
  grilleShape.lineTo(-0.47, -0.18);
  grilleShape.closePath();
  const grille_frameGeom = new THREE.ShapeGeometry(grilleShape, 8);
  const grille_frame = new THREE.Mesh(grille_frameGeom, silverMat);
  grille_frame.name = "grille_frame";
  grille_frame.position.set(0, 0.94, 1.775);
  root.add(grille_frame);

  const grille_insertGeom = new THREE.ShapeGeometry(grilleShape, 8);
  const grille_insert = new THREE.Mesh(grille_insertGeom, grilleMat);
  grille_insert.name = "grille_insert";
  grille_insert.position.set(0, 0.94, 1.786);
  grille_insert.scale.set(0.91, 0.84, 1);
  root.add(grille_insert);

  const grille_vertical_barGeom = new THREE.BoxGeometry(0.012, 0.28, 0.012);
  const grille_vertical_bars = new THREE.InstancedMesh(
    grille_vertical_barGeom,
    grilleBarMat,
    11
  );
  grille_vertical_bars.name = "grille_vertical_bars";
  for (let i = 0; i < 11; i++) {
    dummy.position.set(-0.42 + i * 0.084, 0.94, 1.798);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    grille_vertical_bars.setMatrixAt(i, dummy.matrix);
  }
  grille_vertical_bars.instanceMatrix.needsUpdate = true;
  root.add(grille_vertical_bars);

  const grille_horizontal_barGeom = new THREE.BoxGeometry(0.88, 0.012, 0.012);
  const grille_horizontal_bars = new THREE.InstancedMesh(
    grille_horizontal_barGeom,
    grilleBarMat,
    5
  );
  grille_horizontal_bars.name = "grille_horizontal_bars";
  for (let i = 0; i < 5; i++) {
    dummy.position.set(0, 0.83 + i * 0.055, 1.800);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    grille_horizontal_bars.setMatrixAt(i, dummy.matrix);
  }
  grille_horizontal_bars.instanceMatrix.needsUpdate = true;
  root.add(grille_horizontal_bars);

  const grille_badgeShape = new THREE.Shape();
  grille_badgeShape.moveTo(-0.09, 0.10);
  grille_badgeShape.lineTo(0.09, 0.10);
  grille_badgeShape.lineTo(0.065, -0.045);
  grille_badgeShape.lineTo(0, -0.12);
  grille_badgeShape.lineTo(-0.065, -0.045);
  grille_badgeShape.closePath();
  const grille_badgeGeom = new THREE.ShapeGeometry(grille_badgeShape, 4);
  const grille_badge = new THREE.Mesh(grille_badgeGeom, silverMat);
  grille_badge.name = "grille_badge";
  grille_badge.position.set(0, 0.94, 1.814);
  root.add(grille_badge);

  const grille_badge_insetShape = new THREE.Shape();
  grille_badge_insetShape.moveTo(-0.052, 0.067);
  grille_badge_insetShape.lineTo(0.052, 0.067);
  grille_badge_insetShape.lineTo(0.038, -0.025);
  grille_badge_insetShape.lineTo(0, -0.078);
  grille_badge_insetShape.lineTo(-0.038, -0.025);
  grille_badge_insetShape.closePath();
  const grille_badge_insetGeom = new THREE.ShapeGeometry(
    grille_badge_insetShape,
    4
  );
  const grille_badge_inset = new THREE.Mesh(
    grille_badge_insetGeom,
    grilleMat
  );
  grille_badge_inset.name = "grille_badge_inset";
  grille_badge_inset.position.set(0, 0.94, 1.819);
  root.add(grille_badge_inset);

  const grille_badge_barGeom = new THREE.BoxGeometry(0.018, 0.12, 0.012);
  const grille_badge_left_bar = new THREE.Mesh(
    grille_badge_barGeom,
    silverMat
  );
  grille_badge_left_bar.name = "grille_badge_left_bar";
  grille_badge_left_bar.position.set(-0.022, 0.945, 1.826);
  grille_badge_left_bar.rotation.z = -0.20;
  root.add(grille_badge_left_bar);

  const grille_badge_right_bar = new THREE.Mesh(
    grille_badge_barGeom,
    silverMat
  );
  grille_badge_right_bar.name = "grille_badge_right_bar";
  grille_badge_right_bar.position.set(0.022, 0.945, 1.826);
  grille_badge_right_bar.rotation.z = 0.20;
  root.add(grille_badge_right_bar);

  const leftHeadlightPoints = [
    [-0.84, 0.84],
    [-0.53, 0.84],
    [-0.50, 1.10],
    [-0.76, 1.12],
  ];
  const rightHeadlightPoints = [
    [0.53, 0.84],
    [0.84, 0.84],
    [0.76, 1.12],
    [0.50, 1.10],
  ];

  const left_headlight_housing = createHeadlightHousing(leftHeadlightPoints);
  left_headlight_housing.name = "left_headlight_housing";
  left_headlight_housing.position.z = 1.779;
  root.add(left_headlight_housing);

  const right_headlight_housing = createHeadlightHousing(
    rightHeadlightPoints
  );
  right_headlight_housing.name = "right_headlight_housing";
  right_headlight_housing.position.z = 1.779;
  root.add(right_headlight_housing);

  const left_headlight_lens = createHeadlightLens(leftHeadlightPoints);
  left_headlight_lens.name = "left_headlight_lens";
  left_headlight_lens.position.z = 1.790;
  root.add(left_headlight_lens);

  const right_headlight_lens = createHeadlightLens(rightHeadlightPoints);
  right_headlight_lens.name = "right_headlight_lens";
  right_headlight_lens.position.z = 1.790;
  root.add(right_headlight_lens);

  const headlight_reflectorGeom = new THREE.CircleGeometry(0.105, 24);
  const headlight_reflectors = new THREE.InstancedMesh(
    headlight_reflectorGeom,
    silverMat,
    2
  );
  headlight_reflectors.name = "headlight_reflectors";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.665, 0.98, 1.800);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1.12, 1);
    dummy.updateMatrix();
    headlight_reflectors.setMatrixAt(i, dummy.matrix);
  }
  headlight_reflectors.instanceMatrix.needsUpdate = true;
  root.add(headlight_reflectors);

  const headlight_bulbGeom = new THREE.CircleGeometry(0.043, 18);
  const headlight_bulbs = new THREE.InstancedMesh(
    headlight_bulbGeom,
    clearLensMat,
    2
  );
  headlight_bulbs.name = "headlight_bulbs";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.665, 0.98, 1.807);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    headlight_bulbs.setMatrixAt(i, dummy.matrix);
  }
  headlight_bulbs.instanceMatrix.needsUpdate = true;
  root.add(headlight_bulbs);

  const turn_signalGeom = new THREE.BoxGeometry(0.075, 0.20, 0.018);
  const turn_signals = new THREE.InstancedMesh(turn_signalGeom, amberMat, 2);
  turn_signals.name = "turn_signals";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.805, 0.97, 1.805);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    turn_signals.setMatrixAt(i, dummy.matrix);
  }
  turn_signals.instanceMatrix.needsUpdate = true;
  root.add(turn_signals);

  const lower_grilleShape = new THREE.Shape();
  lower_grilleShape.moveTo(-0.58, -0.13);
  lower_grilleShape.lineTo(0.58, -0.13);
  lower_grilleShape.lineTo(0.52, 0.13);
  lower_grilleShape.lineTo(-0.52, 0.13);
  lower_grilleShape.closePath();
  const lower_grilleGeom = new THREE.ShapeGeometry(lower_grilleShape, 8);
  const lower_grille = new THREE.Mesh(lower_grilleGeom, grilleMat);
  lower_grille.name = "lower_grille";
  lower_grille.position.set(0, 0.42, 1.905);
  root.add(lower_grille);

  const lower_grille_barGeom = new THREE.BoxGeometry(0.018, 0.24, 0.012);
  const lower_grille_bars = new THREE.InstancedMesh(
    lower_grille_barGeom,
    bodyMat,
    5
  );
  lower_grille_bars.name = "lower_grille_bars";
  for (let i = 0; i < 5; i++) {
    dummy.position.set(-0.40 + i * 0.20, 0.42, 1.916);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lower_grille_bars.setMatrixAt(i, dummy.matrix);
  }
  lower_grille_bars.instanceMatrix.needsUpdate = true;
  root.add(lower_grille_bars);

  const fog_light_rimGeom = new THREE.CylinderGeometry(
    0.095,
    0.095,
    0.035,
    20
  );
  const fog_light_rims = new THREE.InstancedMesh(
    fog_light_rimGeom,
    silverMat,
    2
  );
  fog_light_rims.name = "fog_light_rims";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.70, 0.50, 1.915);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fog_light_rims.setMatrixAt(i, dummy.matrix);
  }
  fog_light_rims.instanceMatrix.needsUpdate = true;
  root.add(fog_light_rims);

  const fog_light_lensGeom = new THREE.CylinderGeometry(
    0.073,
    0.073,
    0.041,
    20
  );
  const fog_light_lenses = new THREE.InstancedMesh(
    fog_light_lensGeom,
    clearLensMat,
    2
  );
  fog_light_lenses.name = "fog_light_lenses";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.70, 0.50, 1.932);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fog_light_lenses.setMatrixAt(i, dummy.matrix);
  }
  fog_light_lenses.instanceMatrix.needsUpdate = true;
  root.add(fog_light_lenses);

  const side_indicatorGeom = new THREE.BoxGeometry(0.028, 0.075, 0.12);
  const side_indicators = new THREE.InstancedMesh(
    side_indicatorGeom,
    amberMat,
    2
  );
  side_indicators.name = "side_indicators";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.902, 0.98, 0.72);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_indicators.setMatrixAt(i, dummy.matrix);
  }
  side_indicators.instanceMatrix.needsUpdate = true;
  root.add(side_indicators);

  const taillightGeom = new THREE.BoxGeometry(0.18, 0.30, 0.045);
  const taillights = new THREE.InstancedMesh(taillightGeom, redMat, 2);
  taillights.name = "taillights";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.70, 1.02, -1.675);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    taillights.setMatrixAt(i, dummy.matrix);
  }
  taillights.instanceMatrix.needsUpdate = true;
  root.add(taillights);

  const fuel_doorGeom = new THREE.RingGeometry(0.092, 0.108, 24);
  const fuel_door = new THREE.Mesh(fuel_doorGeom, seamMat);
  fuel_door.name = "fuel_door";
  fuel_door.position.set(0.902, 1.08, -1.36);
  fuel_door.rotation.y = Math.PI / 2;
  root.add(fuel_door);

  const antenna = createRod(
    new THREE.Vector3(0.18, 1.85, -0.72),
    new THREE.Vector3(0.30, 2.17, -0.86),
    0.014,
    blackMat,
    8
  );
  antenna.name = "antenna";
  root.add(antenna);

  const exhaust_pipeGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.32, 12);
  const exhaust_pipe = new THREE.Mesh(exhaust_pipeGeom, blackMat);
  exhaust_pipe.name = "exhaust_pipe";
  exhaust_pipe.position.set(0.54, 0.24, -1.75);
  exhaust_pipe.rotation.x = Math.PI / 2;
  root.add(exhaust_pipe);

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