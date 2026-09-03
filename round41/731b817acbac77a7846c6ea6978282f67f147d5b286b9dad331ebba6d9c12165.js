export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "modern_coach_bus";

  const length = 6.4;
  const width = 2.08;
  const wheelR = 0.49;
  const wheelY = 0.50;
  const frontAxleZ = 1.82;
  const rearAxleZ = -1.82;
  const sideX = width / 2 + 0.045;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x202326,
    metalness: 0.0,
    roughness: 0.8
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x536168,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.55,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide
  });
  const roofGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c7c8,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.82
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x292d30,
    metalness: 0.0,
    roughness: 0.95
  });
  const interiorDarkMat = new THREE.MeshStandardMaterial({
    color: 0x171a1c,
    metalness: 0.0,
    roughness: 0.8
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffe3,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffffe3,
    emissiveIntensity: 1.0
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xff8a18,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff8a18,
    emissiveIntensity: 1.0
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xd52b24,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xd52b24,
    emissiveIntensity: 1.0
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xe7e8e4,
    metalness: 0.0,
    roughness: 0.7
  });

  function roundedRectGeometry(w, h, r, depth) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: false
    });
  }

  function addTubeBetween(a, b, radius, material, radialSegments = 8) {
    const curve = new THREE.LineCurve3(a, b);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 1, radius, radialSegments, false),
      material
    );
    root.add(mesh);
    return mesh;
  }

  const lower_bodyGeom = new THREE.BoxGeometry(width, 0.94, length - 0.16);
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.position.set(0, 0.69, 0);
  root.add(lower_body);

  const front_noseGeom = new THREE.SphereGeometry(1, 32, 16);
  const front_nose = new THREE.Mesh(front_noseGeom, bodyMat);
  front_nose.scale.set(1.04, 0.58, 0.38);
  front_nose.position.set(0, 0.83, 3.05);
  root.add(front_nose);

  const front_fasciaGeom = roundedRectGeometry(1.98, 1.02, 0.16, 0.13);
  const front_fascia = new THREE.Mesh(front_fasciaGeom, bodyMat);
  front_fascia.position.set(0, 0.86, 3.27);
  root.add(front_fascia);

  const rear_lower_panelGeom = new THREE.BoxGeometry(2.02, 0.92, 0.18);
  const rear_lower_panel = new THREE.Mesh(rear_lower_panelGeom, bodyMat);
  rear_lower_panel.position.set(0, 0.69, -3.12);
  root.add(rear_lower_panel);

  const front_roof_capGeom = new THREE.BoxGeometry(2.02, 0.22, 0.48);
  const front_roof_cap = new THREE.Mesh(front_roof_capGeom, bodyMat);
  front_roof_cap.position.set(0, 2.43, 2.91);
  root.add(front_roof_cap);

  const rear_roof_capGeom = new THREE.BoxGeometry(2.02, 0.22, 0.42);
  const rear_roof_cap = new THREE.Mesh(rear_roof_capGeom, bodyMat);
  rear_roof_cap.position.set(0, 2.43, -2.96);
  root.add(rear_roof_cap);

  const roof_railGeom = new THREE.BoxGeometry(0.13, 0.17, 5.42);
  const left_roof_rail = new THREE.Mesh(roof_railGeom, bodyMat);
  left_roof_rail.position.set(-0.97, 2.43, 0);
  root.add(left_roof_rail);

  const right_roof_rail = new THREE.Mesh(roof_railGeom, bodyMat);
  right_roof_rail.position.set(0.97, 2.43, 0);
  root.add(right_roof_rail);

  const window_headerGeom = new THREE.BoxGeometry(0.12, 0.13, 5.36);
  const left_window_header = new THREE.Mesh(window_headerGeom, bodyMat);
  left_window_header.position.set(-0.99, 2.31, -0.02);
  root.add(left_window_header);

  const right_window_header = new THREE.Mesh(window_headerGeom, bodyMat);
  right_window_header.position.set(0.99, 2.31, -0.02);
  root.add(right_window_header);

  const window_sillGeom = new THREE.BoxGeometry(0.13, 0.13, 5.42);
  const left_window_sill = new THREE.Mesh(window_sillGeom, trimMat);
  left_window_sill.position.set(-sideX, 1.28, -0.02);
  root.add(left_window_sill);

  const right_window_sill = new THREE.Mesh(window_sillGeom, trimMat);
  right_window_sill.position.set(sideX, 1.28, -0.02);
  root.add(right_window_sill);

  const interior_floorGeom = new THREE.BoxGeometry(1.82, 0.08, 5.25);
  const interior_floor = new THREE.Mesh(interior_floorGeom, interiorDarkMat);
  interior_floor.position.set(0, 1.13, -0.05);
  root.add(interior_floor);

  const passenger_seat_backGeom = new THREE.BoxGeometry(0.48, 0.66, 0.14);
  const passenger_seat_backs = new THREE.InstancedMesh(
    passenger_seat_backGeom,
    interiorMat,
    10
  );
  const passenger_seat_cushionGeom = new THREE.BoxGeometry(0.48, 0.12, 0.48);
  const passenger_seat_cushions = new THREE.InstancedMesh(
    passenger_seat_cushionGeom,
    interiorMat,
    10
  );
  const passenger_headrestGeom = new THREE.SphereGeometry(0.17, 16, 10);
  const passenger_headrests = new THREE.InstancedMesh(
    passenger_headrestGeom,
    interiorMat,
    10
  );
  const seatRows = [1.20, 0.55, -0.10, -0.75, -1.40];
  const seatDummy = new THREE.Object3D();
  let seatIndex = 0;
  for (let row = 0; row < seatRows.length; row++) {
    for (const side of [-1, 1]) {
      const x = side * 0.55;
      const z = seatRows[row];

      seatDummy.position.set(x, 1.59, z);
      seatDummy.rotation.set(-0.08, 0, 0);
      seatDummy.scale.set(1, 1, 1);
      seatDummy.updateMatrix();
      passenger_seat_backs.setMatrixAt(seatIndex, seatDummy.matrix);

      seatDummy.position.set(x, 1.25, z + 0.18);
      seatDummy.rotation.set(0, 0, 0);
      seatDummy.scale.set(1, 1, 1);
      seatDummy.updateMatrix();
      passenger_seat_cushions.setMatrixAt(seatIndex, seatDummy.matrix);

      seatDummy.position.set(x, 1.99, z - 0.01);
      seatDummy.rotation.set(0, 0, 0);
      seatDummy.scale.set(0.95, 1.0, 0.55);
      seatDummy.updateMatrix();
      passenger_headrests.setMatrixAt(seatIndex, seatDummy.matrix);

      seatIndex++;
    }
  }
  passenger_seat_backs.instanceMatrix.needsUpdate = true;
  passenger_seat_cushions.instanceMatrix.needsUpdate = true;
  passenger_headrests.instanceMatrix.needsUpdate = true;
  root.add(passenger_seat_backs);
  root.add(passenger_seat_cushions);
  root.add(passenger_headrests);

  const driver_seatGeom = new THREE.BoxGeometry(0.48, 0.68, 0.16);
  const driver_seat = new THREE.Mesh(driver_seatGeom, interiorMat);
  driver_seat.position.set(-0.57, 1.57, 2.28);
  driver_seat.rotation.x = -0.08;
  root.add(driver_seat);

  const dashboardGeom = new THREE.BoxGeometry(1.72, 0.20, 0.34);
  const dashboard = new THREE.Mesh(dashboardGeom, interiorDarkMat);
  dashboard.position.set(0, 1.31, 2.72);
  dashboard.rotation.x = -0.12;
  root.add(dashboard);

  const steering_wheelGeom = new THREE.TorusGeometry(0.17, 0.025, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, interiorDarkMat);
  steering_wheel.position.set(-0.58, 1.49, 2.54);
  steering_wheel.rotation.x = -0.24;
  root.add(steering_wheel);

  const steering_column = addTubeBetween(
    new THREE.Vector3(-0.58, 1.31, 2.67),
    new THREE.Vector3(-0.58, 1.47, 2.54),
    0.025,
    interiorDarkMat,
    8
  );
  steering_column.name = "steering_column";

  const side_windowGeom = new THREE.BoxGeometry(0.025, 1.02, 0.96);
  const side_windows = new THREE.InstancedMesh(side_windowGeom, glassMat, 10);
  const windowDummy = new THREE.Object3D();
  const windowCenters = [2.10, 1.05, 0.00, -1.05, -2.10];
  let windowIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < windowCenters.length; i++) {
      windowDummy.position.set(side * sideX, 1.82, windowCenters[i]);
      windowDummy.rotation.set(0, 0, 0);
      windowDummy.scale.set(1, 1, 1);
      windowDummy.updateMatrix();
      side_windows.setMatrixAt(windowIndex++, windowDummy.matrix);
    }
  }
  side_windows.instanceMatrix.needsUpdate = true;
  root.add(side_windows);

  const side_pillarGeom = new THREE.BoxGeometry(0.065, 1.12, 0.075);
  const side_pillars = new THREE.InstancedMesh(side_pillarGeom, trimMat, 12);
  const pillarDummy = new THREE.Object3D();
  const pillarPositions = [2.62, 1.575, 0.525, -0.525, -1.575, -2.62];
  let pillarIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < pillarPositions.length; i++) {
      pillarDummy.position.set(side * (sideX + 0.012), 1.82, pillarPositions[i]);
      pillarDummy.rotation.set(0, 0, 0);
      pillarDummy.scale.set(1, 1, 1);
      pillarDummy.updateMatrix();
      side_pillars.setMatrixAt(pillarIndex++, pillarDummy.matrix);
    }
  }
  side_pillars.instanceMatrix.needsUpdate = true;
  root.add(side_pillars);

  const front_corner_postGeom = new THREE.BoxGeometry(0.15, 1.18, 0.22);
  const front_corner_posts = new THREE.InstancedMesh(front_corner_postGeom, bodyMat, 2);
  const cornerDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    cornerDummy.position.set(side * 0.96, 1.82, 2.92);
    cornerDummy.rotation.set(-0.05, 0, 0);
    cornerDummy.scale.set(1, 1, 1);
    cornerDummy.updateMatrix();
    front_corner_posts.setMatrixAt(i, cornerDummy.matrix);
  }
  front_corner_posts.instanceMatrix.needsUpdate = true;
  root.add(front_corner_posts);

  const windshieldShape = new THREE.Shape();
  windshieldShape.moveTo(-0.86, -0.51);
  windshieldShape.lineTo(0.86, -0.51);
  windshieldShape.lineTo(0.82, 0.51);
  windshieldShape.lineTo(-0.82, 0.51);
  windshieldShape.closePath();
  const windshieldGeom = new THREE.ShapeGeometry(windshieldShape, 1);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.position.set(0, 1.82, 3.16);
  windshield.rotation.x = -0.09;
  root.add(windshield);

  const windshield_center_pillarGeom = new THREE.BoxGeometry(0.055, 1.02, 0.025);
  const windshield_center_pillar = new THREE.Mesh(windshield_center_pillarGeom, trimMat);
  windshield_center_pillar.position.set(0, 1.82, 3.18);
  windshield_center_pillar.rotation.x = -0.09;
  root.add(windshield_center_pillar);

  const windshield_lower_trimGeom = new THREE.BoxGeometry(1.82, 0.075, 0.045);
  const windshield_lower_trim = new THREE.Mesh(windshield_lower_trimGeom, trimMat);
  windshield_lower_trim.position.set(0, 1.31, 3.205);
  windshield_lower_trim.rotation.x = -0.09;
  root.add(windshield_lower_trim);

  const windshield_upper_trimGeom = new THREE.BoxGeometry(1.72, 0.07, 0.045);
  const windshield_upper_trim = new THREE.Mesh(windshield_upper_trimGeom, trimMat);
  windshield_upper_trim.position.set(0, 2.32, 3.115);
  windshield_upper_trim.rotation.x = -0.09;
  root.add(windshield_upper_trim);

  const left_windshield_wiper = addTubeBetween(
    new THREE.Vector3(-0.73, 1.36, 3.235),
    new THREE.Vector3(-0.10, 1.54, 3.215),
    0.018,
    trimMat,
    8
  );
  left_windshield_wiper.name = "left_windshield_wiper";

  const right_windshield_wiper = addTubeBetween(
    new THREE.Vector3(0.73, 1.36, 3.235),
    new THREE.Vector3(0.10, 1.54, 3.215),
    0.018,
    trimMat,
    8
  );
  right_windshield_wiper.name = "right_windshield_wiper";

  const rear_windowGeom = new THREE.BoxGeometry(1.78, 1.00, 0.025);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.position.set(0, 1.82, -3.225);
  root.add(rear_window);

  const rear_window_pillarGeom = new THREE.BoxGeometry(0.06, 1.02, 0.035);
  const rear_window_pillar = new THREE.Mesh(rear_window_pillarGeom, trimMat);
  rear_window_pillar.position.set(0, 1.82, -3.245);
  root.add(rear_window_pillar);

  const roofGlassShape = new THREE.Shape();
  roofGlassShape.moveTo(-0.92, 0);
  roofGlassShape.lineTo(0.92, 0);
  roofGlassShape.bezierCurveTo(0.80, 0.27, 0.42, 0.39, 0, 0.40);
  roofGlassShape.bezierCurveTo(-0.42, 0.39, -0.80, 0.27, -0.92, 0);
  roofGlassShape.closePath();
  const roof_glassGeom = new THREE.ExtrudeGeometry(roofGlassShape, {
    depth: 5.10,
    steps: 1,
    bevelEnabled: false
  });
  const roof_glass = new THREE.Mesh(roof_glassGeom, roofGlassMat);
  roof_glass.position.set(0, 2.43, -2.55);
  root.add(roof_glass);

  const roof_rib_points = [
    new THREE.Vector3(-0.91, 0.02, 0),
    new THREE.Vector3(-0.72, 0.25, 0),
    new THREE.Vector3(-0.38, 0.37, 0),
    new THREE.Vector3(0, 0.41, 0),
    new THREE.Vector3(0.38, 0.37, 0),
    new THREE.Vector3(0.72, 0.25, 0),
    new THREE.Vector3(0.91, 0.02, 0)
  ];
  const roof_rib_curve = new THREE.CatmullRomCurve3(
    roof_rib_points,
    false,
    "centripetal"
  );
  const roof_ribGeom = new THREE.TubeGeometry(roof_rib_curve, 24, 0.027, 8, false);
  const roof_ribs = new THREE.InstancedMesh(roof_ribGeom, trimMat, 5);
  const ribDummy = new THREE.Object3D();
  const ribPositions = [2.30, 1.15, 0.00, -1.15, -2.30];
  for (let i = 0; i < ribPositions.length; i++) {
    ribDummy.position.set(0, 2.43, ribPositions[i]);
    ribDummy.rotation.set(0, 0, 0);
    ribDummy.scale.set(1, 1, 1);
    ribDummy.updateMatrix();
    roof_ribs.setMatrixAt(i, ribDummy.matrix);
  }
  roof_ribs.instanceMatrix.needsUpdate = true;
  root.add(roof_ribs);

  const roof_left_edge = addTubeBetween(
    new THREE.Vector3(-0.92, 2.45, -2.55),
    new THREE.Vector3(-0.92, 2.45, 2.55),
    0.028,
    trimMat,
    8
  );
  roof_left_edge.name = "roof_left_edge";

  const roof_right_edge = addTubeBetween(
    new THREE.Vector3(0.92, 2.45, -2.55),
    new THREE.Vector3(0.92, 2.45, 2.55),
    0.028,
    trimMat,
    8
  );
  roof_right_edge.name = "roof_right_edge";

  const luggage_panel_seamGeom = new THREE.BoxGeometry(0.025, 0.72, 0.018);
  const luggage_panel_seams = new THREE.InstancedMesh(
    luggage_panel_seamGeom,
    trimMat,
    8
  );
  const seamDummy = new THREE.Object3D();
  const seamPositions = [1.20, 0.25, -0.70, -2.35];
  let seamIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < seamPositions.length; i++) {
      seamDummy.position.set(side * (sideX + 0.025), 0.72, seamPositions[i]);
      seamDummy.rotation.set(0, 0, 0);
      seamDummy.scale.set(1, 1, 1);
      seamDummy.updateMatrix();
      luggage_panel_seams.setMatrixAt(seamIndex++, seamDummy.matrix);
    }
  }
  luggage_panel_seams.instanceMatrix.needsUpdate = true;
  root.add(luggage_panel_seams);

  const engine_vent_slatsGeom = new THREE.BoxGeometry(0.025, 0.025, 0.62);
  const engine_vent_slats = new THREE.InstancedMesh(
    engine_vent_slatsGeom,
    trimMat,
    14
  );
  const ventDummy = new THREE.Object3D();
  let ventIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      ventDummy.position.set(
        side * (sideX + 0.035),
        0.49 + i * 0.065,
        -2.72
      );
      ventDummy.rotation.set(0, 0, 0);
      ventDummy.scale.set(1, 1, 1);
      ventDummy.updateMatrix();
      engine_vent_slats.setMatrixAt(ventIndex++, ventDummy.matrix);
    }
  }
  engine_vent_slats.instanceMatrix.needsUpdate = true;
  root.add(engine_vent_slats);

  const side_markerGeom = new THREE.BoxGeometry(0.035, 0.095, 0.17);
  const side_marker_lights = new THREE.InstancedMesh(side_markerGeom, amberMat, 8);
  const markerDummy = new THREE.Object3D();
  const markerPositions = [2.45, 0.82, -0.72, -2.62];
  let markerIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < markerPositions.length; i++) {
      markerDummy.position.set(
        side * (sideX + 0.045),
        i < 2 ? 1.02 : 0.73,
        markerPositions[i]
      );
      markerDummy.rotation.set(0, 0, 0);
      markerDummy.scale.set(1, 1, 1);
      markerDummy.updateMatrix();
      side_marker_lights.setMatrixAt(markerIndex++, markerDummy.matrix);
    }
  }
  side_marker_lights.instanceMatrix.needsUpdate = true;
  root.add(side_marker_lights);

  const wheelPositions = [
    [-1, frontAxleZ],
    [1, frontAxleZ],
    [-1, rearAxleZ],
    [1, rearAxleZ]
  ];

  const wheel_wellGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.035, 32);
  const wheel_wells = new THREE.InstancedMesh(wheel_wellGeom, interiorDarkMat, 4);
  const wheelDummy = new THREE.Object3D();
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    wheelDummy.position.set(side * (width / 2 + 0.018), wheelY, z);
    wheelDummy.rotation.set(0, 0, Math.PI / 2);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    wheel_wells.setMatrixAt(i, wheelDummy.matrix);
  }
  wheel_wells.instanceMatrix.needsUpdate = true;
  root.add(wheel_wells);

  const tireGeom = new THREE.TorusGeometry(0.35, 0.14, 12, 32);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    wheelDummy.position.set(side * (width / 2 + 0.04), wheelY, z);
    wheelDummy.rotation.set(0, Math.PI / 2, 0);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    tires.setMatrixAt(i, wheelDummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.10, 24);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, chromeMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    wheelDummy.position.set(side * (width / 2 + 0.10), wheelY, z);
    wheelDummy.rotation.set(0, 0, Math.PI / 2);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, wheelDummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const wheel_hub_capGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.12, 20);
  const wheel_hub_caps = new THREE.InstancedMesh(
    wheel_hub_capGeom,
    chromeMat,
    4
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    wheelDummy.position.set(side * (width / 2 + 0.145), wheelY, z);
    wheelDummy.rotation.set(0, 0, Math.PI / 2);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    wheel_hub_caps.setMatrixAt(i, wheelDummy.matrix);
  }
  wheel_hub_caps.instanceMatrix.needsUpdate = true;
  root.add(wheel_hub_caps);

  const wheel_lug_holeGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.018, 12);
  const wheel_lug_holes = new THREE.InstancedMesh(
    wheel_lug_holeGeom,
    interiorDarkMat,
    32
  );
  const lugDummy = new THREE.Object3D();
  let lugIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const side = wheelPositions[w][0];
    const z = wheelPositions[w][1];
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      lugDummy.position.set(
        side * (width / 2 + 0.158),
        wheelY + Math.cos(angle) * 0.17,
        z + Math.sin(angle) * 0.17
      );
      lugDummy.rotation.set(0, 0, Math.PI / 2);
      lugDummy.scale.set(1, 1, 1);
      lugDummy.updateMatrix();
      wheel_lug_holes.setMatrixAt(lugIndex++, lugDummy.matrix);
    }
  }
  wheel_lug_holes.instanceMatrix.needsUpdate = true;
  root.add(wheel_lug_holes);

  const mud_flapGeom = new THREE.BoxGeometry(0.07, 0.34, 0.18);
  const mud_flaps = new THREE.InstancedMesh(mud_flapGeom, tireMat, 4);
  const flapDummy = new THREE.Object3D();
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    flapDummy.position.set(side * sideX, 0.32, z - 0.46);
    flapDummy.rotation.set(0, 0, 0);
    flapDummy.scale.set(1, 1, 1);
    flapDummy.updateMatrix();
    mud_flaps.setMatrixAt(i, flapDummy.matrix);
  }
  mud_flaps.instanceMatrix.needsUpdate = true;
  root.add(mud_flaps);

  const headlight_housingGeom = new THREE.SphereGeometry(1, 20, 12);
  const headlight_housings = new THREE.InstancedMesh(
    headlight_housingGeom,
    chromeMat,
    2
  );
  const lightDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    lightDummy.position.set(side * 0.68, 0.88, 3.405);
    lightDummy.rotation.set(0, 0, 0);
    lightDummy.scale.set(0.34, 0.13, 0.045);
    lightDummy.updateMatrix();
    headlight_housings.setMatrixAt(i, lightDummy.matrix);
  }
  headlight_housings.instanceMatrix.needsUpdate = true;
  root.add(headlight_housings);

  const headlight_lensGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 16);
  const headlight_lenses = new THREE.InstancedMesh(
    headlight_lensGeom,
    headlightMat,
    4
  );
  let lensIndex = 0;
  for (const side of [-1, 1]) {
    for (const offset of [-0.07, 0.07]) {
      lightDummy.position.set(side * 0.68 + offset, 0.88, 3.455);
      lightDummy.rotation.set(Math.PI / 2, 0, 0);
      lightDummy.scale.set(1, 1, 1);
      lightDummy.updateMatrix();
      headlight_lenses.setMatrixAt(lensIndex++, lightDummy.matrix);
    }
  }
  headlight_lenses.instanceMatrix.needsUpdate = true;
  root.add(headlight_lenses);

  const front_indicatorGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.038, 16);
  const front_indicators = new THREE.InstancedMesh(front_indicatorGeom, amberMat, 2);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    lightDummy.position.set(side * 0.91, 0.88, 3.445);
    lightDummy.rotation.set(Math.PI / 2, 0, 0);
    lightDummy.scale.set(1, 1, 1);
    lightDummy.updateMatrix();
    front_indicators.setMatrixAt(i, lightDummy.matrix);
  }
  front_indicators.instanceMatrix.needsUpdate = true;
  root.add(front_indicators);

  const fog_lightGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.035, 18);
  const fog_lights = new THREE.InstancedMesh(fog_lightGeom, headlightMat, 2);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    lightDummy.position.set(side * 0.66, 0.48, 3.405);
    lightDummy.rotation.set(Math.PI / 2, 0, 0);
    lightDummy.scale.set(1, 1, 1);
    lightDummy.updateMatrix();
    fog_lights.setMatrixAt(i, lightDummy.matrix);
  }
  fog_lights.instanceMatrix.needsUpdate = true;
  root.add(fog_lights);

  const front_bumperGeom = new THREE.BoxGeometry(2.08, 0.20, 0.18);
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyMat);
  front_bumper.position.set(0, 0.35, 3.27);
  root.add(front_bumper);

  const front_bumper_stripGeom = new THREE.BoxGeometry(1.92, 0.07, 0.05);
  const front_bumper_strip = new THREE.Mesh(front_bumper_stripGeom, trimMat);
  front_bumper_strip.position.set(0, 0.35, 3.385);
  root.add(front_bumper_strip);

  const license_plateGeom = new THREE.BoxGeometry(0.48, 0.18, 0.025);
  const license_plate = new THREE.Mesh(license_plateGeom, plateMat);
  license_plate.position.set(0, 0.43, 3.405);
  root.add(license_plate);

  const license_plate_markGeom = new THREE.BoxGeometry(0.035, 0.09, 0.01);
  const license_plate_marks = new THREE.InstancedMesh(
    license_plate_markGeom,
    trimMat,
    5
  );
  const plateDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    plateDummy.position.set(-0.12 + i * 0.06, 0.43, 3.425);
    plateDummy.rotation.set(0, 0, i % 2 === 0 ? 0.08 : -0.08);
    plateDummy.scale.set(1, 1, 1);
    plateDummy.updateMatrix();
    license_plate_marks.setMatrixAt(i, plateDummy.matrix);
  }
  license_plate_marks.instanceMatrix.needsUpdate = true;
  root.add(license_plate_marks);

  const front_logoGeom = new THREE.TorusGeometry(0.085, 0.012, 8, 24);
  const front_logo = new THREE.Mesh(front_logoGeom, chromeMat);
  front_logo.position.set(0, 1.08, 3.425);
  root.add(front_logo);

  const front_logo_barGeom = new THREE.BoxGeometry(0.018, 0.13, 0.018);
  const front_logo_bar = new THREE.Mesh(front_logo_barGeom, chromeMat);
  front_logo_bar.position.set(0, 1.08, 3.438);
  root.add(front_logo_bar);

  const rear_bumperGeom = new THREE.BoxGeometry(2.14, 0.20, 0.18);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, trimMat);
  rear_bumper.position.set(0, 0.34, -3.22);
  root.add(rear_bumper);

  const rear_taillightGeom = new THREE.BoxGeometry(0.13, 0.42, 0.045);
  const rear_taillights = new THREE.InstancedMesh(rear_taillightGeom, redMat, 2);
  const rearLightDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    rearLightDummy.position.set(side * 0.92, 0.90, -3.235);
    rearLightDummy.rotation.set(0, 0, 0);
    rearLightDummy.scale.set(1, 1, 1);
    rearLightDummy.updateMatrix();
    rear_taillights.setMatrixAt(i, rearLightDummy.matrix);
  }
  rear_taillights.instanceMatrix.needsUpdate = true;
  root.add(rear_taillights);

  const side_taillightGeom = new THREE.BoxGeometry(0.035, 0.36, 0.12);
  const side_taillights = new THREE.InstancedMesh(side_taillightGeom, redMat, 2);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    rearLightDummy.position.set(side * (sideX + 0.04), 0.90, -3.08);
    rearLightDummy.rotation.set(0, 0, 0);
    rearLightDummy.scale.set(1, 1, 1);
    rearLightDummy.updateMatrix();
    side_taillights.setMatrixAt(i, rearLightDummy.matrix);
  }
  side_taillights.instanceMatrix.needsUpdate = true;
  root.add(side_taillights);

  const roof_markerGeom = new THREE.SphereGeometry(0.045, 12, 8);
  const roof_marker_lights = new THREE.InstancedMesh(roof_markerGeom, amberMat, 4);
  const roofLightDummy = new THREE.Object3D();
  const roofLightPositions = [
    [-0.72, 2.51, 3.03],
    [0.72, 2.51, 3.03],
    [-0.72, 2.51, -3.04],
    [0.72, 2.51, -3.04]
  ];
  for (let i = 0; i < roofLightPositions.length; i++) {
    const p = roofLightPositions[i];
    roofLightDummy.position.set(p[0], p[1], p[2]);
    roofLightDummy.rotation.set(0, 0, 0);
    roofLightDummy.scale.set(1, 0.65, 1);
    roofLightDummy.updateMatrix();
    roof_marker_lights.setMatrixAt(i, roofLightDummy.matrix);
  }
  roof_marker_lights.instanceMatrix.needsUpdate = true;
  root.add(roof_marker_lights);

  const left_mirror_arm = addTubeBetween(
    new THREE.Vector3(-0.98, 2.02, 2.86),
    new THREE.Vector3(-1.31, 1.96, 2.94),
    0.025,
    trimMat,
    8
  );
  left_mirror_arm.name = "left_mirror_arm";

  const right_mirror_arm = addTubeBetween(
    new THREE.Vector3(0.98, 2.02, 2.86),
    new THREE.Vector3(1.31, 1.96, 2.94),
    0.025,
    trimMat,
    8
  );
  right_mirror_arm.name = "right_mirror_arm";

  const mirror_podGeom = new THREE.SphereGeometry(1, 20, 12);
  const left_mirror_pod = new THREE.Mesh(mirror_podGeom, trimMat);
  left_mirror_pod.scale.set(0.11, 0.25, 0.15);
  left_mirror_pod.position.set(-1.34, 1.83, 2.95);
  root.add(left_mirror_pod);

  const right_mirror_pod = new THREE.Mesh(mirror_podGeom, trimMat);
  right_mirror_pod.scale.set(0.11, 0.25, 0.15);
  right_mirror_pod.position.set(1.34, 1.83, 2.95);
  root.add(right_mirror_pod);

  const mirror_glassGeom = new THREE.CircleGeometry(0.12, 20);
  const left_mirror_glass = new THREE.Mesh(mirror_glassGeom, chromeMat);
  left_mirror_glass.scale.set(0.62, 1.35, 1);
  left_mirror_glass.position.set(-1.34, 1.83, 2.80);
  root.add(left_mirror_glass);

  const right_mirror_glass = new THREE.Mesh(mirror_glassGeom, chromeMat);
  right_mirror_glass.scale.set(0.62, 1.35, 1);
  right_mirror_glass.position.set(1.34, 1.83, 2.80);
  root.add(right_mirror_glass);

  fitToUnitCube(root);
  return root;

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
}