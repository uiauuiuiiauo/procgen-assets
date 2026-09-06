export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_coupe";

  const body_group = new THREE.Group();
  const cabin_group = new THREE.Group();
  const interior_group = new THREE.Group();
  const wheel_group = new THREE.Group();
  const front_details_group = new THREE.Group();
  const side_details_group = new THREE.Group();
  const rear_details_group = new THREE.Group();

  root.add(
    body_group,
    cabin_group,
    interior_group,
    wheel_group,
    front_details_group,
    side_details_group,
    rear_details_group
  );

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xeeeada,
    metalness: 0.0,
    roughness: 0.3
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
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x343434,
    metalness: 0.0,
    roughness: 0.7
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aa5a8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x704b35,
    metalness: 0.0,
    roughness: 0.7
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xf1eee0,
    metalness: 0.0,
    roughness: 0.4
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xc99a45,
    metalness: 0.0,
    roughness: 0.4
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xa91f24,
    metalness: 0.0,
    roughness: 0.4
  });

  const bodyW = 1.52;
  const cabinW = 1.34;
  const wheelR = 0.43;
  const wheelY = 0.45;
  const frontAxleZ = 1.25;
  const rearAxleZ = -1.28;

  function createShapeGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function createTube(points, radius, material, closed) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(6, points.length * 8),
      radius,
      8,
      closed
    );
    return new THREE.Mesh(geometry, material);
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-2.08, 0.42);
  bodyShape.bezierCurveTo(-2.23, 0.54, -2.22, 0.91, -1.98, 1.08);
  bodyShape.bezierCurveTo(-1.72, 1.25, -1.39, 1.29, -1.06, 1.22);
  bodyShape.bezierCurveTo(-0.52, 1.14, 0.14, 1.14, 0.63, 1.20);
  bodyShape.bezierCurveTo(1.13, 1.27, 1.67, 1.19, 1.98, 1.00);
  bodyShape.bezierCurveTo(2.18, 0.87, 2.20, 0.57, 2.01, 0.42);
  bodyShape.lineTo(1.73, 0.40);
  bodyShape.bezierCurveTo(1.67, 0.76, 1.51, 1.00, 1.24, 1.01);
  bodyShape.bezierCurveTo(0.98, 1.00, 0.82, 0.76, 0.77, 0.40);
  bodyShape.lineTo(-0.78, 0.40);
  bodyShape.bezierCurveTo(-0.83, 0.76, -0.99, 1.00, -1.25, 1.01);
  bodyShape.bezierCurveTo(-1.51, 1.00, -1.67, 0.76, -1.72, 0.40);
  bodyShape.lineTo(-2.08, 0.42);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: bodyW,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 3,
    curveSegments: 12
  });
  bodyGeom.translate(0, 0, -bodyW / 2);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.rotation.y = -Math.PI / 2;
  body_group.add(body);

  const hoodGeom = new THREE.SphereGeometry(1, 40, 20);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.name = "hood";
  hood.position.set(0, 1.13, 1.10);
  hood.scale.set(0.76, 0.19, 1.02);
  body_group.add(hood);

  const rear_deckGeom = new THREE.SphereGeometry(1, 32, 16);
  const rear_deck = new THREE.Mesh(rear_deckGeom, bodyMat);
  rear_deck.name = "rear_deck";
  rear_deck.position.set(0, 1.08, -1.60);
  rear_deck.scale.set(0.76, 0.18, 0.64);
  body_group.add(rear_deck);

  const fenderGeom = new THREE.SphereGeometry(1, 28, 16);

  const front_left_fender = new THREE.Mesh(fenderGeom, bodyMat);
  front_left_fender.name = "front_left_fender";
  front_left_fender.position.set(-0.72, 0.82, 1.18);
  front_left_fender.scale.set(0.20, 0.58, 0.96);
  body_group.add(front_left_fender);

  const front_right_fender = new THREE.Mesh(fenderGeom, bodyMat);
  front_right_fender.name = "front_right_fender";
  front_right_fender.position.set(0.72, 0.82, 1.18);
  front_right_fender.scale.set(0.20, 0.58, 0.96);
  body_group.add(front_right_fender);

  const rear_left_fender = new THREE.Mesh(fenderGeom, bodyMat);
  rear_left_fender.name = "rear_left_fender";
  rear_left_fender.position.set(-0.72, 0.78, -1.27);
  rear_left_fender.scale.set(0.20, 0.52, 0.78);
  body_group.add(rear_left_fender);

  const rear_right_fender = new THREE.Mesh(fenderGeom, bodyMat);
  rear_right_fender.name = "rear_right_fender";
  rear_right_fender.position.set(0.72, 0.78, -1.27);
  rear_right_fender.scale.set(0.20, 0.52, 0.78);
  body_group.add(rear_right_fender);

  const roofGeom = new THREE.SphereGeometry(1, 40, 20);
  const roof = new THREE.Mesh(roofGeom, bodyMat);
  roof.name = "roof";
  roof.position.set(0, 1.68, -0.48);
  roof.scale.set(0.72, 0.27, 1.13);
  cabin_group.add(roof);

  const windshieldGeom = createShapeGeometry([
    [-0.64, -0.34],
    [0.64, -0.34],
    [0.54, 0.34],
    [-0.54, 0.34]
  ]);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.name = "windshield";
  windshield.position.set(0, 1.45, 0.49);
  windshield.rotation.x = -0.46;
  cabin_group.add(windshield);

  const rear_windshieldGeom = createShapeGeometry([
    [-0.56, -0.28],
    [0.56, -0.28],
    [0.48, 0.28],
    [-0.48, 0.28]
  ]);
  const rear_windshield = new THREE.Mesh(rear_windshieldGeom, glassMat);
  rear_windshield.name = "rear_windshield";
  rear_windshield.position.set(0, 1.45, -1.42);
  rear_windshield.rotation.x = 0.52;
  cabin_group.add(rear_windshield);

  const front_side_windowGeom = createShapeGeometry([
    [-0.48, 1.16],
    [0.42, 1.16],
    [0.27, 1.70],
    [-0.16, 1.76]
  ]);
  const rear_side_windowGeom = createShapeGeometry([
    [0.48, 1.16],
    [1.30, 1.16],
    [1.20, 1.42],
    [0.78, 1.69],
    [0.48, 1.70]
  ]);

  const front_left_window = new THREE.Mesh(front_side_windowGeom, glassMat);
  front_left_window.name = "front_left_window";
  front_left_window.position.x = -cabinW / 2 - 0.012;
  front_left_window.rotation.y = -Math.PI / 2;
  cabin_group.add(front_left_window);

  const front_right_window = new THREE.Mesh(front_side_windowGeom, glassMat);
  front_right_window.name = "front_right_window";
  front_right_window.position.x = cabinW / 2 + 0.012;
  front_right_window.rotation.y = -Math.PI / 2;
  cabin_group.add(front_right_window);

  const rear_left_window = new THREE.Mesh(rear_side_windowGeom, glassMat);
  rear_left_window.name = "rear_left_window";
  rear_left_window.position.x = -cabinW / 2 - 0.012;
  rear_left_window.rotation.y = -Math.PI / 2;
  cabin_group.add(rear_left_window);

  const rear_right_window = new THREE.Mesh(rear_side_windowGeom, glassMat);
  rear_right_window.name = "rear_right_window";
  rear_right_window.position.x = cabinW / 2 + 0.012;
  rear_right_window.rotation.y = -Math.PI / 2;
  cabin_group.add(rear_right_window);

  const windshield_border = createTube([
    new THREE.Vector3(-0.64, 1.16, 0.65),
    new THREE.Vector3(0.64, 1.16, 0.65),
    new THREE.Vector3(0.54, 1.74, 0.33),
    new THREE.Vector3(-0.54, 1.74, 0.33)
  ], 0.025, chromeMat, true);
  windshield_border.name = "windshield_border";
  cabin_group.add(windshield_border);

  const rear_windshield_border = createTube([
    new THREE.Vector3(-0.56, 1.22, -1.56),
    new THREE.Vector3(0.56, 1.22, -1.56),
    new THREE.Vector3(0.48, 1.68, -1.29),
    new THREE.Vector3(-0.48, 1.68, -1.29)
  ], 0.022, chromeMat, true);
  rear_windshield_border.name = "rear_windshield_border";
  cabin_group.add(rear_windshield_border);

  function sideWindowBorder(side) {
    const x = side * (cabinW / 2 + 0.022);
    return createTube([
      new THREE.Vector3(x, 1.15, 0.49),
      new THREE.Vector3(x, 1.70, 0.28),
      new THREE.Vector3(x, 1.77, -0.16),
      new THREE.Vector3(x, 1.70, -0.78),
      new THREE.Vector3(x, 1.42, -1.22),
      new THREE.Vector3(x, 1.15, -1.32),
      new THREE.Vector3(x, 1.15, 0.49)
    ], 0.022, chromeMat, false);
  }

  const left_window_border = sideWindowBorder(-1);
  left_window_border.name = "left_window_border";
  cabin_group.add(left_window_border);

  const right_window_border = sideWindowBorder(1);
  right_window_border.name = "right_window_border";
  cabin_group.add(right_window_border);

  const pillarGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.59, 10);
  const window_pillars = new THREE.InstancedMesh(pillarGeom, bodyMat, 4);
  window_pillars.name = "window_pillars";
  const pillarDummy = new THREE.Object3D();
  let pillarIndex = 0;
  for (const side of [-1, 1]) {
    pillarDummy.position.set(side * 0.69, 1.45, 0.42);
    pillarDummy.rotation.set(-0.24, 0, 0);
    pillarDummy.scale.set(1, 1, 1);
    pillarDummy.updateMatrix();
    window_pillars.setMatrixAt(pillarIndex++, pillarDummy.matrix);

    pillarDummy.position.set(side * 0.69, 1.45, -1.25);
    pillarDummy.rotation.set(0.30, 0, 0);
    pillarDummy.scale.set(1, 1, 1);
    pillarDummy.updateMatrix();
    window_pillars.setMatrixAt(pillarIndex++, pillarDummy.matrix);
  }
  window_pillars.instanceMatrix.needsUpdate = true;
  cabin_group.add(window_pillars);

  const center_pillarGeom = new THREE.BoxGeometry(0.045, 0.56, 0.055);
  const center_window_pillars = new THREE.InstancedMesh(center_pillarGeom, seamMat, 2);
  center_window_pillars.name = "center_window_pillars";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    pillarDummy.position.set(side * 0.695, 1.45, -0.45);
    pillarDummy.rotation.set(0, 0, 0);
    pillarDummy.scale.set(1, 1, 1);
    pillarDummy.updateMatrix();
    center_window_pillars.setMatrixAt(i, pillarDummy.matrix);
  }
  center_window_pillars.instanceMatrix.needsUpdate = true;
  cabin_group.add(center_window_pillars);

  const dashboardGeom = new THREE.BoxGeometry(1.16, 0.12, 0.28);
  const dashboard = new THREE.Mesh(dashboardGeom, leatherMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.12, 0.34);
  interior_group.add(dashboard);

  const seatGeom = new THREE.SphereGeometry(1, 24, 14);

  const driver_seat_bottom = new THREE.Mesh(seatGeom, leatherMat);
  driver_seat_bottom.name = "driver_seat_bottom";
  driver_seat_bottom.position.set(-0.31, 0.99, -0.25);
  driver_seat_bottom.scale.set(0.27, 0.12, 0.34);
  interior_group.add(driver_seat_bottom);

  const passenger_seat_bottom = new THREE.Mesh(seatGeom, leatherMat);
  passenger_seat_bottom.name = "passenger_seat_bottom";
  passenger_seat_bottom.position.set(0.31, 0.99, -0.25);
  passenger_seat_bottom.scale.set(0.27, 0.12, 0.34);
  interior_group.add(passenger_seat_bottom);

  const driver_seat_back = new THREE.Mesh(seatGeom, leatherMat);
  driver_seat_back.name = "driver_seat_back";
  driver_seat_back.position.set(-0.31, 1.31, -0.43);
  driver_seat_back.scale.set(0.28, 0.38, 0.12);
  driver_seat_back.rotation.x = -0.12;
  interior_group.add(driver_seat_back);

  const passenger_seat_back = new THREE.Mesh(seatGeom, leatherMat);
  passenger_seat_back.name = "passenger_seat_back";
  passenger_seat_back.position.set(0.31, 1.31, -0.43);
  passenger_seat_back.scale.set(0.28, 0.38, 0.12);
  passenger_seat_back.rotation.x = -0.12;
  interior_group.add(passenger_seat_back);

  const rear_seatGeom = new THREE.BoxGeometry(1.05, 0.22, 0.42);
  const rear_seat = new THREE.Mesh(rear_seatGeom, leatherMat);
  rear_seat.name = "rear_seat";
  rear_seat.position.set(0, 1.00, -1.02);
  interior_group.add(rear_seat);

  const steering_wheelGeom = new THREE.TorusGeometry(0.16, 0.018, 8, 28);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, leatherMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.32, 1.31, 0.20);
  steering_wheel.rotation.x = -0.18;
  interior_group.add(steering_wheel);

  const steering_hubGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16);
  const steering_hub = new THREE.Mesh(steering_hubGeom, chromeMat);
  steering_hub.name = "steering_hub";
  steering_hub.position.set(-0.32, 1.31, 0.20);
  steering_hub.rotation.x = Math.PI / 2 - 0.18;
  interior_group.add(steering_hub);

  const steering_column = createTube([
    new THREE.Vector3(-0.32, 1.31, 0.19),
    new THREE.Vector3(-0.32, 1.10, 0.38)
  ], 0.022, seamMat, false);
  steering_column.name = "steering_column";
  interior_group.add(steering_column);

  const windshield_wiper_left = createTube([
    new THREE.Vector3(-0.50, 1.18, 0.66),
    new THREE.Vector3(-0.16, 1.31, 0.59)
  ], 0.012, silverMat, false);
  windshield_wiper_left.name = "windshield_wiper_left";
  cabin_group.add(windshield_wiper_left);

  const windshield_wiper_right = createTube([
    new THREE.Vector3(0.48, 1.18, 0.66),
    new THREE.Vector3(0.14, 1.31, 0.59)
  ], 0.012, silverMat, false);
  windshield_wiper_right.name = "windshield_wiper_right";
  cabin_group.add(windshield_wiper_right);

  const tireGeom = new THREE.TorusGeometry(0.31, 0.12, 14, 36);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  tires.name = "tires";

  const wheelRimGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.15, 32);
  const wheel_rims = new THREE.InstancedMesh(wheelRimGeom, chromeMat, 4);
  wheel_rims.name = "wheel_rims";

  const hubcapGeom = new THREE.SphereGeometry(1, 28, 14);
  const hubcaps = new THREE.InstancedMesh(hubcapGeom, chromeMat, 4);
  hubcaps.name = "hubcaps";

  const wheelCenters = [
    [-0.82, wheelY, frontAxleZ],
    [0.82, wheelY, frontAxleZ],
    [-0.82, wheelY, rearAxleZ],
    [0.82, wheelY, rearAxleZ]
  ];
  const wheelDummy = new THREE.Object3D();

  for (let i = 0; i < wheelCenters.length; i++) {
    const center = wheelCenters[i];
    const side = center[0] < 0 ? -1 : 1;

    wheelDummy.position.set(center[0], center[1], center[2]);
    wheelDummy.rotation.set(0, Math.PI / 2, 0);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    tires.setMatrixAt(i, wheelDummy.matrix);

    wheelDummy.position.set(center[0], center[1], center[2]);
    wheelDummy.rotation.set(0, 0, Math.PI / 2);
    wheelDummy.scale.set(1, 1, 1);
    wheelDummy.updateMatrix();
    wheel_rims.setMatrixAt(i, wheelDummy.matrix);

    wheelDummy.position.set(side * 0.905, center[1], center[2]);
    wheelDummy.rotation.set(0, 0, 0);
    wheelDummy.scale.set(0.055, 0.225, 0.225);
    wheelDummy.updateMatrix();
    hubcaps.setMatrixAt(i, wheelDummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  wheel_rims.instanceMatrix.needsUpdate = true;
  hubcaps.instanceMatrix.needsUpdate = true;
  wheel_group.add(tires, wheel_rims, hubcaps);

  const grille_surroundGeom = new THREE.TorusGeometry(0.34, 0.045, 10, 40);
  const grille_surround = new THREE.Mesh(grille_surroundGeom, chromeMat);
  grille_surround.name = "grille_surround";
  grille_surround.position.set(0, 0.72, 2.205);
  grille_surround.scale.set(1.65, 0.82, 1);
  front_details_group.add(grille_surround);

  const grille_insertGeom = new THREE.CircleGeometry(0.34, 40);
  const grille_insert = new THREE.Mesh(grille_insertGeom, grilleMat);
  grille_insert.name = "grille_insert";
  grille_insert.position.set(0, 0.72, 2.198);
  grille_insert.scale.set(1.55, 0.73, 1);
  front_details_group.add(grille_insert);

  const grille_barGeom = new THREE.BoxGeometry(1, 1, 1);
  const grille_bars = new THREE.InstancedMesh(grille_barGeom, silverMat, 14);
  grille_bars.name = "grille_bars";
  const grilleDummy = new THREE.Object3D();
  let grilleIndex = 0;

  for (let i = 0; i < 10; i++) {
    const x = -0.43 + i * (0.86 / 9);
    const edge = Math.abs(x) / 0.43;
    grilleDummy.position.set(x, 0.72, 2.225);
    grilleDummy.rotation.set(0, 0, 0);
    grilleDummy.scale.set(0.018, 0.39 * (1 - edge * 0.20), 0.025);
    grilleDummy.updateMatrix();
    grille_bars.setMatrixAt(grilleIndex++, grilleDummy.matrix);
  }
  for (let i = 0; i < 4; i++) {
    grilleDummy.position.set(0, 0.58 + i * 0.095, 2.228);
    grilleDummy.rotation.set(0, 0, 0);
    grilleDummy.scale.set(0.96, 0.018, 0.025);
    grilleDummy.updateMatrix();
    grille_bars.setMatrixAt(grilleIndex++, grilleDummy.matrix);
  }
  grille_bars.instanceMatrix.needsUpdate = true;
  front_details_group.add(grille_bars);

  const headlightHousingGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.11, 32);
  const headlightLensGeom = new THREE.CylinderGeometry(0.165, 0.165, 0.025, 32);
  const headlightRimGeom = new THREE.TorusGeometry(0.18, 0.025, 10, 32);

  const left_headlight_housing = new THREE.Mesh(headlightHousingGeom, chromeMat);
  left_headlight_housing.name = "left_headlight_housing";
  left_headlight_housing.position.set(-0.67, 0.98, 2.08);
  left_headlight_housing.rotation.x = Math.PI / 2;
  front_details_group.add(left_headlight_housing);

  const right_headlight_housing = new THREE.Mesh(headlightHousingGeom, chromeMat);
  right_headlight_housing.name = "right_headlight_housing";
  right_headlight_housing.position.set(0.67, 0.98, 2.08);
  right_headlight_housing.rotation.x = Math.PI / 2;
  front_details_group.add(right_headlight_housing);

  const left_headlight_lens = new THREE.Mesh(headlightLensGeom, headlightMat);
  left_headlight_lens.name = "left_headlight_lens";
  left_headlight_lens.position.set(-0.67, 0.98, 2.145);
  left_headlight_lens.rotation.x = Math.PI / 2;
  front_details_group.add(left_headlight_lens);

  const right_headlight_lens = new THREE.Mesh(headlightLensGeom, headlightMat);
  right_headlight_lens.name = "right_headlight_lens";
  right_headlight_lens.position.set(0.67, 0.98, 2.145);
  right_headlight_lens.rotation.x = Math.PI / 2;
  front_details_group.add(right_headlight_lens);

  const left_headlight_rim = new THREE.Mesh(headlightRimGeom, chromeMat);
  left_headlight_rim.name = "left_headlight_rim";
  left_headlight_rim.position.set(-0.67, 0.98, 2.165);
  front_details_group.add(left_headlight_rim);

  const right_headlight_rim = new THREE.Mesh(headlightRimGeom, chromeMat);
  right_headlight_rim.name = "right_headlight_rim";
  right_headlight_rim.position.set(0.67, 0.98, 2.165);
  front_details_group.add(right_headlight_rim);

  const indicatorGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.035, 20);

  const left_front_indicator = new THREE.Mesh(indicatorGeom, amberMat);
  left_front_indicator.name = "left_front_indicator";
  left_front_indicator.position.set(-0.68, 0.58, 2.175);
  left_front_indicator.rotation.x = Math.PI / 2;
  front_details_group.add(left_front_indicator);

  const right_front_indicator = new THREE.Mesh(indicatorGeom, amberMat);
  right_front_indicator.name = "right_front_indicator";
  right_front_indicator.position.set(0.68, 0.58, 2.175);
  right_front_indicator.rotation.x = Math.PI / 2;
  front_details_group.add(right_front_indicator);

  const front_bumper = createTube([
    new THREE.Vector3(-0.91, 0.39, 2.13),
    new THREE.Vector3(-0.74, 0.35, 2.28),
    new THREE.Vector3(0, 0.32, 2.36),
    new THREE.Vector3(0.74, 0.35, 2.28),
    new THREE.Vector3(0.91, 0.39, 2.13)
  ], 0.065, chromeMat, false);
  front_bumper.name = "front_bumper";
  front_details_group.add(front_bumper);

  const bumperGuardGeom = new THREE.CylinderGeometry(0.075, 0.085, 0.29, 16);

  const left_bumper_guard = new THREE.Mesh(bumperGuardGeom, chromeMat);
  left_bumper_guard.name = "left_bumper_guard";
  left_bumper_guard.position.set(-0.47, 0.43, 2.35);
  left_bumper_guard.rotation.x = -0.18;
  front_details_group.add(left_bumper_guard);

  const right_bumper_guard = new THREE.Mesh(bumperGuardGeom, chromeMat);
  right_bumper_guard.name = "right_bumper_guard";
  right_bumper_guard.position.set(0.47, 0.43, 2.35);
  right_bumper_guard.rotation.x = -0.18;
  front_details_group.add(right_bumper_guard);

  const hood_center_trim = createTube([
    new THREE.Vector3(0, 1.29, 0.54),
    new THREE.Vector3(0, 1.27, 1.20),
    new THREE.Vector3(0, 1.19, 1.87)
  ], 0.014, chromeMat, false);
  hood_center_trim.name = "hood_center_trim";
  front_details_group.add(hood_center_trim);

  const hood_left_trim = createTube([
    new THREE.Vector3(-0.03, 1.28, 0.57),
    new THREE.Vector3(-0.18, 1.25, 1.20),
    new THREE.Vector3(-0.39, 1.17, 1.82)
  ], 0.012, chromeMat, false);
  hood_left_trim.name = "hood_left_trim";
  front_details_group.add(hood_left_trim);

  const hood_right_trim = createTube([
    new THREE.Vector3(0.03, 1.28, 0.57),
    new THREE.Vector3(0.18, 1.25, 1.20),
    new THREE.Vector3(0.39, 1.17, 1.82)
  ], 0.012, chromeMat, false);
  hood_right_trim.name = "hood_right_trim";
  front_details_group.add(hood_right_trim);

  const hood_emblemGeom = createShapeGeometry([
    [-0.13, 0.00],
    [-0.03, 0.045],
    [0.13, 0.00],
    [0.03, -0.045]
  ]);
  const hood_emblem = new THREE.Mesh(hood_emblemGeom, chromeMat);
  hood_emblem.name = "hood_emblem";
  hood_emblem.position.set(0, 1.17, 1.82);
  hood_emblem.rotation.x = -1.25;
  front_details_group.add(hood_emblem);

  const left_door_seam = createTube([
    new THREE.Vector3(-0.821, 1.10, 0.43),
    new THREE.Vector3(-0.821, 0.48, 0.58),
    new THREE.Vector3(-0.821, 0.45, -0.70),
    new THREE.Vector3(-0.821, 1.10, -0.72)
  ], 0.008, seamMat, false);
  left_door_seam.name = "left_door_seam";
  side_details_group.add(left_door_seam);

  const right_door_seam = createTube([
    new THREE.Vector3(0.821, 1.10, 0.43),
    new THREE.Vector3(0.821, 0.48, 0.58),
    new THREE.Vector3(0.821, 0.45, -0.70),
    new THREE.Vector3(0.821, 1.10, -0.72)
  ], 0.008, seamMat, false);
  right_door_seam.name = "right_door_seam";
  side_details_group.add(right_door_seam);

  const left_side_trim = createTube([
    new THREE.Vector3(-0.835, 0.91, 1.83),
    new THREE.Vector3(-0.835, 0.86, 0.65),
    new THREE.Vector3(-0.835, 0.77, -0.65),
    new THREE.Vector3(-0.835, 0.70, -1.78)
  ], 0.018, chromeMat, false);
  left_side_trim.name = "left_side_trim";
  side_details_group.add(left_side_trim);

  const right_side_trim = createTube([
    new THREE.Vector3(0.835, 0.91, 1.83),
    new THREE.Vector3(0.835, 0.86, 0.65),
    new THREE.Vector3(0.835, 0.77, -0.65),
    new THREE.Vector3(0.835, 0.70, -1.78)
  ], 0.018, chromeMat, false);
  right_side_trim.name = "right_side_trim";
  side_details_group.add(right_side_trim);

  const rockerGeom = new THREE.BoxGeometry(0.045, 0.055, 1.35);

  const left_rocker_trim = new THREE.Mesh(rockerGeom, chromeMat);
  left_rocker_trim.name = "left_rocker_trim";
  left_rocker_trim.position.set(-0.835, 0.43, -0.08);
  side_details_group.add(left_rocker_trim);

  const right_rocker_trim = new THREE.Mesh(rockerGeom, chromeMat);
  right_rocker_trim.name = "right_rocker_trim";
  right_rocker_trim.position.set(0.835, 0.43, -0.08);
  side_details_group.add(right_rocker_trim);

  const doorHandleGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.18, 12);

  const left_door_handle = new THREE.Mesh(doorHandleGeom, chromeMat);
  left_door_handle.name = "left_door_handle";
  left_door_handle.position.set(-0.845, 1.08, -0.52);
  left_door_handle.rotation.x = Math.PI / 2;
  side_details_group.add(left_door_handle);

  const right_door_handle = new THREE.Mesh(doorHandleGeom, chromeMat);
  right_door_handle.name = "right_door_handle";
  right_door_handle.position.set(0.845, 1.08, -0.52);
  right_door_handle.rotation.x = Math.PI / 2;
  side_details_group.add(right_door_handle);

  const mirrorHousingGeom = new THREE.SphereGeometry(1, 24, 12);
  const mirrorGlassGeom = new THREE.CircleGeometry(0.075, 24);

  const left_side_mirror = new THREE.Mesh(mirrorHousingGeom, chromeMat);
  left_side_mirror.name = "left_side_mirror";
  left_side_mirror.position.set(-0.88, 1.25, 0.43);
  left_side_mirror.scale.set(0.055, 0.09, 0.115);
  side_details_group.add(left_side_mirror);

  const right_side_mirror = new THREE.Mesh(mirrorHousingGeom, chromeMat);
  right_side_mirror.name = "right_side_mirror";
  right_side_mirror.position.set(0.88, 1.25, 0.43);
  right_side_mirror.scale.set(0.055, 0.09, 0.115);
  side_details_group.add(right_side_mirror);

  const left_mirror_glass = new THREE.Mesh(mirrorGlassGeom, glassMat);
  left_mirror_glass.name = "left_mirror_glass";
  left_mirror_glass.position.set(-0.937, 1.25, 0.43);
  left_mirror_glass.rotation.y = -Math.PI / 2;
  side_details_group.add(left_mirror_glass);

  const right_mirror_glass = new THREE.Mesh(mirrorGlassGeom, glassMat);
  right_mirror_glass.name = "right_mirror_glass";
  right_mirror_glass.position.set(0.937, 1.25, 0.43);
  right_mirror_glass.rotation.y = Math.PI / 2;
  side_details_group.add(right_mirror_glass);

  const left_mirror_stalk = createTube([
    new THREE.Vector3(-0.69, 1.16, 0.40),
    new THREE.Vector3(-0.86, 1.23, 0.43)
  ], 0.018, chromeMat, false);
  left_mirror_stalk.name = "left_mirror_stalk";
  side_details_group.add(left_mirror_stalk);

  const right_mirror_stalk = createTube([
    new THREE.Vector3(0.69, 1.16, 0.40),
    new THREE.Vector3(0.86, 1.23, 0.43)
  ], 0.018, chromeMat, false);
  right_mirror_stalk.name = "right_mirror_stalk";
  side_details_group.add(right_mirror_stalk);

  const rear_bumper = createTube([
    new THREE.Vector3(-0.80, 0.43, -2.10),
    new THREE.Vector3(-0.62, 0.38, -2.22),
    new THREE.Vector3(0, 0.36, -2.27),
    new THREE.Vector3(0.62, 0.38, -2.22),
    new THREE.Vector3(0.80, 0.43, -2.10)
  ], 0.055, chromeMat, false);
  rear_bumper.name = "rear_bumper";
  rear_details_group.add(rear_bumper);

  const taillightGeom = new THREE.SphereGeometry(1, 20, 12);

  const left_taillight = new THREE.Mesh(taillightGeom, redMat);
  left_taillight.name = "left_taillight";
  left_taillight.position.set(-0.70, 0.88, -2.04);
  left_taillight.scale.set(0.09, 0.13, 0.045);
  rear_details_group.add(left_taillight);

  const right_taillight = new THREE.Mesh(taillightGeom, redMat);
  right_taillight.name = "right_taillight";
  right_taillight.position.set(0.70, 0.88, -2.04);
  right_taillight.scale.set(0.09, 0.13, 0.045);
  rear_details_group.add(right_taillight);

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