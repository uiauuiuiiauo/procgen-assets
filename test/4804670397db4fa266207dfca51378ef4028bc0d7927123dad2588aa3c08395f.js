export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gray_sedan";

  const length = 4.8;
  const width = 1.82;
  const wheelR = 0.39;
  const wheelY = 0.40;
  const frontAxleZ = 1.43;
  const rearAxleZ = -1.43;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x68717d,
    metalness: 0.25,
    roughness: 0.34
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x171a1c,
    metalness: 0.0,
    roughness: 0.8
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111213,
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
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x66767d,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.45,
    ior: 1.5,
    transparent: true,
    opacity: 0.76,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshPhysicalMaterial({
    color: 0xe5edf0,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.55,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5e8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xf4f5e8,
    emissiveIntensity: 1.0
  });
  const tailMat = new THREE.MeshStandardMaterial({
    color: 0xc9272c,
    metalness: 0.0,
    roughness: 0.35,
    emissive: 0xc9272c,
    emissiveIntensity: 1.0
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xe79a32,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xe79a32,
    emissiveIntensity: 1.0
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e3,
    metalness: 0.0,
    roughness: 0.65
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x2459a8,
    metalness: 0.0,
    roughness: 0.6
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.0,
    roughness: 0.7
  });
  const printMat = new THREE.MeshStandardMaterial({
    color: 0x20252a,
    metalness: 0.0,
    roughness: 0.75
  });

  function addTube(parent, p1, p2, radius, material) {
    const tubeGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(p1, p2),
      1,
      radius,
      8,
      false
    );
    const tube = new THREE.Mesh(tubeGeom, material);
    parent.add(tube);
    return tube;
  }

  function makePanelGeometry(points) {
    const panelShape = new THREE.Shape();
    panelShape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      panelShape.lineTo(points[i][0], points[i][1]);
    }
    panelShape.closePath();
    return new THREE.ShapeGeometry(panelShape);
  }

  function addPanelBorder(parent, points, sideX, material) {
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      addTube(
        parent,
        new THREE.Vector3(sideX, a[1], a[0]),
        new THREE.Vector3(sideX, b[1], b[0]),
        0.009,
        material
      );
    }
  }

  const body_lowerShape = new THREE.Shape();
  body_lowerShape.moveTo(-2.30, 0.30);
  body_lowerShape.lineTo(2.18, 0.30);
  body_lowerShape.lineTo(2.34, 0.48);
  body_lowerShape.lineTo(2.30, 0.76);
  body_lowerShape.lineTo(2.10, 0.96);
  body_lowerShape.lineTo(1.62, 1.08);
  body_lowerShape.lineTo(0.82, 1.16);
  body_lowerShape.lineTo(-0.72, 1.14);
  body_lowerShape.lineTo(-1.55, 1.10);
  body_lowerShape.lineTo(-2.12, 0.98);
  body_lowerShape.lineTo(-2.34, 0.72);
  body_lowerShape.closePath();

  const body_lowerGeom = new THREE.ExtrudeGeometry(body_lowerShape, {
    depth: width,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 2
  });
  const body_lower = new THREE.Mesh(body_lowerGeom, bodyMat);
  body_lower.name = "body_lower";
  body_lower.rotation.y = -Math.PI / 2;
  body_lower.position.x = width / 2;
  root.add(body_lower);

  const undercarriageGeom = new THREE.BoxGeometry(1.58, 0.13, 3.55);
  const undercarriage = new THREE.Mesh(undercarriageGeom, darkMat);
  undercarriage.name = "undercarriage";
  undercarriage.position.set(0, 0.285, -0.03);
  root.add(undercarriage);

  const hoodGeom = new THREE.SphereGeometry(1, 32, 14);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.name = "hood";
  hood.scale.set(0.86, 0.105, 0.83);
  hood.position.set(0, 1.095, 1.39);
  root.add(hood);

  const trunk_lidGeom = new THREE.SphereGeometry(1, 28, 12);
  const trunk_lid = new THREE.Mesh(trunk_lidGeom, bodyMat);
  trunk_lid.name = "trunk_lid";
  trunk_lid.scale.set(0.82, 0.085, 0.54);
  trunk_lid.position.set(0, 1.055, -1.72);
  root.add(trunk_lid);

  const front_bumperGeom = new THREE.SphereGeometry(1, 28, 14);
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyMat);
  front_bumper.name = "front_bumper";
  front_bumper.scale.set(0.94, 0.22, 0.20);
  front_bumper.position.set(0, 0.48, 2.24);
  root.add(front_bumper);

  const rear_bumperGeom = new THREE.SphereGeometry(1, 28, 12);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, bodyMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.scale.set(0.90, 0.18, 0.17);
  rear_bumper.position.set(0, 0.48, -2.24);
  root.add(rear_bumper);

  const cabin_glassShell = new THREE.Shape();
  cabin_glassShell.moveTo(-1.58, 1.08);
  cabin_glassShell.lineTo(1.05, 1.09);
  cabin_glassShell.bezierCurveTo(0.88, 1.28, 0.67, 1.50, 0.43, 1.61);
  cabin_glassShell.bezierCurveTo(0.08, 1.72, -0.63, 1.72, -0.94, 1.61);
  cabin_glassShell.bezierCurveTo(-1.22, 1.50, -1.45, 1.28, -1.58, 1.08);
  cabin_glassShell.closePath();

  const cabin_glassGeom = new THREE.ExtrudeGeometry(cabin_glassShell, {
    depth: 1.52,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const cabin_glass = new THREE.Mesh(cabin_glassGeom, glassMat);
  cabin_glass.name = "cabin_glass";
  cabin_glass.rotation.y = -Math.PI / 2;
  cabin_glass.position.x = 0.76;
  root.add(cabin_glass);

  const roof_panelGeom = new THREE.SphereGeometry(1, 32, 14);
  const roof_panel = new THREE.Mesh(roof_panelGeom, bodyMat);
  roof_panel.name = "roof_panel";
  roof_panel.scale.set(0.79, 0.105, 1.15);
  roof_panel.position.set(0, 1.62, -0.25);
  root.add(roof_panel);

  const windshieldGeom = new THREE.PlaneGeometry(1.53, 0.79);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.name = "windshield";
  windshield.rotation.x = -0.82;
  windshield.position.set(0, 1.35, 0.72);
  root.add(windshield);

  const rear_windshieldGeom = new THREE.PlaneGeometry(1.43, 0.69);
  const rear_windshield = new THREE.Mesh(rear_windshieldGeom, glassMat);
  rear_windshield.name = "rear_windshield";
  rear_windshield.rotation.x = 0.82;
  rear_windshield.position.set(0, 1.36, -1.22);
  root.add(rear_windshield);

  const frontWindowPoints = [
    [0.91, 1.13],
    [0.39, 1.58],
    [-0.22, 1.62],
    [-0.36, 1.13]
  ];
  const rearWindowPoints = [
    [-0.43, 1.13],
    [-0.31, 1.62],
    [-0.91, 1.58],
    [-1.46, 1.16]
  ];

  const front_windowGeom = makePanelGeometry(frontWindowPoints);
  const rear_windowGeom = makePanelGeometry(rearWindowPoints);
  const side_windows = new THREE.Group();
  side_windows.name = "side_windows";

  for (const side of [-1, 1]) {
    const front_window = new THREE.Mesh(front_windowGeom, glassMat);
    front_window.rotation.y = -Math.PI / 2;
    front_window.position.x = side * 0.795;
    side_windows.add(front_window);

    const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
    rear_window.rotation.y = -Math.PI / 2;
    rear_window.position.x = side * 0.795;
    side_windows.add(rear_window);

    addPanelBorder(side_windows, frontWindowPoints, side * 0.802, darkMat);
    addPanelBorder(side_windows, rearWindowPoints, side * 0.802, darkMat);
  }
  root.add(side_windows);

  const window_pillars = new THREE.Group();
  window_pillars.name = "window_pillars";
  for (const side of [-1, 1]) {
    const x = side * 0.79;
    addTube(
      window_pillars,
      new THREE.Vector3(x, 1.10, 0.96),
      new THREE.Vector3(x, 1.60, 0.39),
      0.035,
      bodyMat
    );
    addTube(
      window_pillars,
      new THREE.Vector3(x, 1.11, -0.39),
      new THREE.Vector3(x, 1.63, -0.28),
      0.045,
      darkMat
    );
    addTube(
      window_pillars,
      new THREE.Vector3(x, 1.11, -1.50),
      new THREE.Vector3(x, 1.59, -0.92),
      0.04,
      bodyMat
    );
  }
  root.add(window_pillars);

  const windshield_trim = new THREE.Group();
  windshield_trim.name = "windshield_trim";
  addTube(
    windshield_trim,
    new THREE.Vector3(-0.77, 1.09, 1.02),
    new THREE.Vector3(0.77, 1.09, 1.02),
    0.014,
    darkMat
  );
  addTube(
    windshield_trim,
    new THREE.Vector3(-0.72, 1.61, 0.40),
    new THREE.Vector3(0.72, 1.61, 0.40),
    0.014,
    darkMat
  );
  addTube(
    windshield_trim,
    new THREE.Vector3(-0.77, 1.09, 1.02),
    new THREE.Vector3(-0.72, 1.61, 0.40),
    0.014,
    darkMat
  );
  addTube(
    windshield_trim,
    new THREE.Vector3(0.77, 1.09, 1.02),
    new THREE.Vector3(0.72, 1.61, 0.40),
    0.014,
    darkMat
  );
  root.add(windshield_trim);

  const windshield_wipers = new THREE.Group();
  windshield_wipers.name = "windshield_wipers";
  addTube(
    windshield_wipers,
    new THREE.Vector3(-0.58, 1.115, 1.035),
    new THREE.Vector3(-0.03, 1.20, 0.93),
    0.012,
    darkMat
  );
  addTube(
    windshield_wipers,
    new THREE.Vector3(0.52, 1.115, 1.035),
    new THREE.Vector3(0.02, 1.19, 0.94),
    0.012,
    darkMat
  );
  root.add(windshield_wipers);

  const side_mirrors = new THREE.Group();
  side_mirrors.name = "side_mirrors";
  const mirror_shellGeom = new THREE.SphereGeometry(1, 20, 10);
  const mirror_glassGeom = new THREE.CircleGeometry(0.10, 20);

  for (const side of [-1, 1]) {
    addTube(
      side_mirrors,
      new THREE.Vector3(side * 0.78, 1.16, 0.72),
      new THREE.Vector3(side * 1.00, 1.22, 0.73),
      0.035,
      darkMat
    );

    const mirror_shell = new THREE.Mesh(mirror_shellGeom, bodyMat);
    mirror_shell.scale.set(0.19, 0.09, 0.13);
    mirror_shell.position.set(side * 1.08, 1.25, 0.73);
    side_mirrors.add(mirror_shell);

    const mirror_glass = new THREE.Mesh(mirror_glassGeom, silverMat);
    mirror_glass.rotation.y = Math.PI / 2;
    mirror_glass.scale.set(1.0, 0.58, 1);
    mirror_glass.position.set(side * 1.17, 1.25, 0.73);
    side_mirrors.add(mirror_glass);
  }
  root.add(side_mirrors);

  const roof_antennaGeom = new THREE.ConeGeometry(0.07, 0.15, 4);
  const roof_antenna = new THREE.Mesh(roof_antennaGeom, bodyMat);
  roof_antenna.name = "roof_antenna";
  roof_antenna.scale.z = 1.45;
  roof_antenna.position.set(0, 1.78, -0.86);
  root.add(roof_antenna);

  const dashboardGeom = new THREE.BoxGeometry(1.35, 0.10, 0.42);
  const dashboard = new THREE.Mesh(dashboardGeom, darkMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.08, 0.61);
  root.add(dashboard);

  const interior_seats = new THREE.Group();
  interior_seats.name = "interior_seats";
  const seatBackGeom = new THREE.BoxGeometry(0.42, 0.48, 0.16);
  const headrestGeom = new THREE.SphereGeometry(0.13, 16, 10);
  for (const x of [-0.42, 0.42]) {
    const seat_back = new THREE.Mesh(seatBackGeom, darkMat);
    seat_back.position.set(x, 1.17, -0.02);
    interior_seats.add(seat_back);

    const headrest = new THREE.Mesh(headrestGeom, darkMat);
    headrest.scale.y = 1.2;
    headrest.position.set(x, 1.47, -0.05);
    interior_seats.add(headrest);
  }
  root.add(interior_seats);

  const steering_wheelGeom = new THREE.TorusGeometry(0.14, 0.018, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, darkMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(0.43, 1.23, 0.66);
  root.add(steering_wheel);

  const hood_seams = new THREE.Group();
  hood_seams.name = "hood_seams";
  for (const side of [-1, 1]) {
    addTube(
      hood_seams,
      new THREE.Vector3(side * 0.73, 1.15, 0.93),
      new THREE.Vector3(side * 0.86, 0.98, 2.08),
      0.008,
      darkMat
    );
  }
  root.add(hood_seams);

  const hood_sensorGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.012, 12);
  const hood_sensors = new THREE.InstancedMesh(hood_sensorGeom, darkMat, 2);
  hood_sensors.name = "hood_sensors";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.32 : 0.32, 1.17, 1.24);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    hood_sensors.setMatrixAt(i, dummy.matrix);
  }
  hood_sensors.instanceMatrix.needsUpdate = true;
  root.add(hood_sensors);

  const upper_grilleGeom = new THREE.CircleGeometry(1, 40);
  const upper_grille = new THREE.Mesh(upper_grilleGeom, darkMat);
  upper_grille.name = "upper_grille";
  upper_grille.scale.set(0.70, 0.18, 1);
  upper_grille.position.set(0, 0.83, 2.365);
  root.add(upper_grille);

  const upper_grille_surroundGeom = new THREE.TorusGeometry(1, 0.065, 10, 48);
  const upper_grille_surround = new THREE.Mesh(upper_grille_surroundGeom, chromeMat);
  upper_grille_surround.name = "upper_grille_surround";
  upper_grille_surround.scale.set(0.70, 0.18, 1);
  upper_grille_surround.position.set(0, 0.83, 2.378);
  root.add(upper_grille_surround);

  const grille_slatsGeom = new THREE.BoxGeometry(1.18, 0.018, 0.018);
  const grille_slats = new THREE.InstancedMesh(grille_slatsGeom, chromeMat, 4);
  grille_slats.name = "grille_slats";
  for (let i = 0; i < 4; i++) {
    dummy.position.set(0, 0.77 + i * 0.043, 2.389);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1 - Math.abs(i - 1.5) * 0.04, 1, 1);
    dummy.updateMatrix();
    grille_slats.setMatrixAt(i, dummy.matrix);
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  root.add(grille_slats);

  const front_emblemGeom = new THREE.TorusGeometry(0.105, 0.014, 8, 28);
  const front_emblem = new THREE.Mesh(front_emblemGeom, chromeMat);
  front_emblem.name = "front_emblem";
  front_emblem.scale.set(1, 0.72, 1);
  front_emblem.position.set(0, 0.83, 2.405);
  root.add(front_emblem);

  const front_emblem_barGeom = new THREE.BoxGeometry(0.17, 0.022, 0.018);
  const front_emblem_bar = new THREE.Mesh(front_emblem_barGeom, chromeMat);
  front_emblem_bar.name = "front_emblem_bar";
  front_emblem_bar.rotation.z = -0.18;
  front_emblem_bar.position.set(0, 0.83, 2.408);
  root.add(front_emblem_bar);

  const headlightPoints = [
    [0.54, 0.80],
    [0.68, 0.76],
    [0.94, 0.80],
    [0.91, 0.95],
    [0.65, 0.98]
  ];
  const headlightGeom = makePanelGeometry(headlightPoints);
  const front_headlights = new THREE.Group();
  front_headlights.name = "front_headlights";

  for (const side of [-1, 1]) {
    const headlight_border = new THREE.Mesh(headlightGeom, darkMat);
    headlight_border.name = "headlight_border";
    headlight_border.scale.x = side;
    headlight_border.position.z = 2.355;
    front_headlights.add(headlight_border);

    const headlight_lens = new THREE.Mesh(headlightGeom, headlightMat);
    headlight_lens.name = "headlight_lens";
    headlight_lens.scale.x = side;
    headlight_lens.position.z = 2.369;
    front_headlights.add(headlight_lens);
  }

  const headlight_rimGeom = new THREE.TorusGeometry(0.085, 0.012, 8, 28);
  const headlight_rims = new THREE.InstancedMesh(headlight_rimGeom, chromeMat, 4);
  headlight_rims.name = "headlight_rims";
  let lensIndex = 0;
  for (const side of [-1, 1]) {
    for (const lensX of [0.69, 0.84]) {
      dummy.position.set(side * lensX, 0.87, 2.388);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      headlight_rims.setMatrixAt(lensIndex++, dummy.matrix);
    }
  }
  headlight_rims.instanceMatrix.needsUpdate = true;
  front_headlights.add(headlight_rims);

  const headlight_bulbsGeom = new THREE.CircleGeometry(0.062, 24);
  const headlight_bulbs = new THREE.InstancedMesh(headlight_bulbsGeom, lampMat, 4);
  headlight_bulbs.name = "headlight_bulbs";
  lensIndex = 0;
  for (const side of [-1, 1]) {
    for (const lensX of [0.69, 0.84]) {
      dummy.position.set(side * lensX, 0.87, 2.393);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      headlight_bulbs.setMatrixAt(lensIndex++, dummy.matrix);
    }
  }
  headlight_bulbs.instanceMatrix.needsUpdate = true;
  front_headlights.add(headlight_bulbs);
  root.add(front_headlights);

  const lower_grilleGeom = new THREE.CircleGeometry(1, 36);
  const lower_grille = new THREE.Mesh(lower_grilleGeom, darkMat);
  lower_grille.name = "lower_grille";
  lower_grille.scale.set(0.61, 0.12, 1);
  lower_grille.position.set(0, 0.40, 2.405);
  root.add(lower_grille);

  const lower_grille_slatsGeom = new THREE.BoxGeometry(1.02, 0.012, 0.012);
  const lower_grille_slats = new THREE.InstancedMesh(lower_grille_slatsGeom, bodyMat, 3);
  lower_grille_slats.name = "lower_grille_slats";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(0, 0.36 + i * 0.04, 2.416);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lower_grille_slats.setMatrixAt(i, dummy.matrix);
  }
  lower_grille_slats.instanceMatrix.needsUpdate = true;
  root.add(lower_grille_slats);

  const fog_intakeGeom = new THREE.CircleGeometry(1, 28);
  const fog_intakes = new THREE.Group();
  fog_intakes.name = "fog_intakes";
  for (const side of [-1, 1]) {
    const fog_intake = new THREE.Mesh(fog_intakeGeom, darkMat);
    fog_intake.scale.set(0.24, 0.10, 1);
    fog_intake.position.set(side * 0.70, 0.43, 2.405);
    fog_intakes.add(fog_intake);
  }
  root.add(fog_intakes);

  const fog_lampGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.025, 24);
  const fog_lamps = new THREE.InstancedMesh(fog_lampGeom, lampMat, 2);
  fog_lamps.name = "fog_lamps";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.72 : 0.72, 0.43, 2.425);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fog_lamps.setMatrixAt(i, dummy.matrix);
  }
  fog_lamps.instanceMatrix.needsUpdate = true;
  root.add(fog_lamps);

  const front_plateGeom = new THREE.BoxGeometry(0.82, 0.19, 0.025);
  const front_plate = new THREE.Mesh(front_plateGeom, plateMat);
  front_plate.name = "front_plate";
  front_plate.position.set(0, 0.56, 2.445);
  root.add(front_plate);

  const front_plate_blue_stripGeom = new THREE.BoxGeometry(0.07, 0.17, 0.012);
  const front_plate_blue_strip = new THREE.Mesh(front_plate_blue_stripGeom, blueMat);
  front_plate_blue_strip.name = "front_plate_blue_strip";
  front_plate_blue_strip.position.set(-0.365, 0.56, 2.464);
  root.add(front_plate_blue_strip);

  const plate_markingsGeom = new THREE.BoxGeometry(0.035, 0.11, 0.009);
  const plate_markings = new THREE.InstancedMesh(plate_markingsGeom, printMat, 6);
  plate_markings.name = "plate_markings";
  for (let i = 0; i < 6; i++) {
    dummy.position.set(-0.25 + i * 0.10, 0.56, 2.466);
    dummy.rotation.set(0, 0, i % 2 === 0 ? -0.18 : 0.12);
    dummy.scale.set(i === 4 ? 1.5 : 1, 1, 1);
    dummy.updateMatrix();
    plate_markings.setMatrixAt(i, dummy.matrix);
  }
  plate_markings.instanceMatrix.needsUpdate = true;
  root.add(plate_markings);

  const side_moldingGeom = new THREE.BoxGeometry(0.025, 0.035, 2.42);
  const side_molding = new THREE.InstancedMesh(side_moldingGeom, darkMat, 2);
  side_molding.name = "side_molding";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.945, 0.57, -0.18);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_molding.setMatrixAt(i, dummy.matrix);
  }
  side_molding.instanceMatrix.needsUpdate = true;
  root.add(side_molding);

  const door_seams = new THREE.Group();
  door_seams.name = "door_seams";
  for (const side of [-1, 1]) {
    for (const z of [0.70, -0.39, -1.48]) {
      addTube(
        door_seams,
        new THREE.Vector3(side * 0.947, 0.43, z),
        new THREE.Vector3(side * 0.947, 1.10, z),
        0.008,
        darkMat
      );
    }
  }
  root.add(door_seams);

  const door_handleGeom = new THREE.BoxGeometry(0.035, 0.045, 0.20);
  const door_handles = new THREE.InstancedMesh(door_handleGeom, bodyMat, 4);
  door_handles.name = "door_handles";
  let handleIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.08, -1.02]) {
      dummy.position.set(side * 0.965, 0.96, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      door_handles.setMatrixAt(handleIndex++, dummy.matrix);
    }
  }
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handles);

  const fuel_doorGeom = new THREE.RingGeometry(0.105, 0.118, 28);
  const fuel_door = new THREE.Mesh(fuel_doorGeom, darkMat);
  fuel_door.name = "fuel_door";
  fuel_door.rotation.y = Math.PI / 2;
  fuel_door.position.set(0.956, 0.91, -1.78);
  root.add(fuel_door);

  const side_markerGeom = new THREE.BoxGeometry(0.025, 0.055, 0.12);
  const side_markers = new THREE.InstancedMesh(side_markerGeom, amberMat, 2);
  side_markers.name = "side_markers";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.96, 0.93, 0.91);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_markers.setMatrixAt(i, dummy.matrix);
  }
  side_markers.instanceMatrix.needsUpdate = true;
  root.add(side_markers);

  const advertisement_panels = new THREE.Group();
  advertisement_panels.name = "advertisement_panels";
  const ad_panelGeom = new THREE.BoxGeometry(0.014, 0.38, 0.66);
  const ad_stripeGeom = new THREE.BoxGeometry(0.009, 0.026, 0.52);
  for (const side of [-1, 1]) {
    const ad_panel = new THREE.Mesh(ad_panelGeom, plateMat);
    ad_panel.position.set(side * 0.952, 0.78, 0.12);
    advertisement_panels.add(ad_panel);

    const ad_header = new THREE.Mesh(ad_stripeGeom, printMat);
    ad_header.position.set(side * 0.962, 0.86, 0.12);
    advertisement_panels.add(ad_header);
  }
  root.add(advertisement_panels);

  const rear_adecals = new THREE.Group();
  rear_adecals.name = "rear_adecals";
  const rear_logoGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 24);
  for (const side of [-1, 1]) {
    const rear_logo = new THREE.Mesh(rear_logoGeom, blueMat);
    rear_logo.rotation.y = Math.PI / 2;
    rear_logo.position.set(side * 0.96, 0.82, -0.92);
    rear_adecals.add(rear_logo);

    addTube(
      rear_adecals,
      new THREE.Vector3(side * 0.965, 0.76, -1.10),
      new THREE.Vector3(side * 0.965, 0.88, -1.10),
      0.008,
      blueMat
    );
  }
  root.add(rear_adecals);

  const wheelPositions = [
    [-1, frontAxleZ],
    [1, frontAxleZ],
    [-1, rearAxleZ],
    [1, rearAxleZ]
  ];

  const wheel_wellGeom = new THREE.CircleGeometry(0.43, 32);
  const wheel_wells = new THREE.InstancedMesh(wheel_wellGeom, darkMat, 4);
  wheel_wells.name = "wheel_wells";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    dummy.position.set(side * 0.94, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_wells.setMatrixAt(i, dummy.matrix);
  }
  wheel_wells.instanceMatrix.needsUpdate = true;
  root.add(wheel_wells);

  const tireGeom = new THREE.TorusGeometry(0.29, 0.10, 12, 36);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  tires.name = "tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    dummy.position.set(side * 0.91, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tires.setMatrixAt(i, dummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const wheel_archGeom = new THREE.TorusGeometry(0.405, 0.035, 8, 32, Math.PI);
  const wheel_arches = new THREE.InstancedMesh(wheel_archGeom, bodyMat, 4);
  wheel_arches.name = "wheel_arches";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    dummy.position.set(side * 0.955, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_arches.setMatrixAt(i, dummy.matrix);
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  root.add(wheel_arches);

  const brake_discGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.035, 28);
  const brake_discs = new THREE.InstancedMesh(brake_discGeom, darkMat, 4);
  brake_discs.name = "brake_discs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    dummy.position.set(side * 0.99, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    brake_discs.setMatrixAt(i, dummy.matrix);
  }
  brake_discs.instanceMatrix.needsUpdate = true;
  root.add(brake_discs);

  const wheel_rimGeom = new THREE.TorusGeometry(0.235, 0.025, 8, 32);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimGeom, silverMat, 4);
  wheel_rims.name = "wheel_rims";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    dummy.position.set(side * 1.015, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_rims.setMatrixAt(i, dummy.matrix);
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  root.add(wheel_rims);

  const wheel_spokeGeom = new THREE.BoxGeometry(0.025, 0.20, 0.035);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokeGeom, silverMat, 40);
  wheel_spokes.name = "wheel_spokes";
  let spokeIndex = 0;
  for (const wheelPosition of wheelPositions) {
    const side = wheelPosition[0];
    const wz = wheelPosition[1];
    for (let i = 0; i < 10; i++) {
      const angle = i / 10 * Math.PI * 2;
      dummy.position.set(
        side * 1.022,
        wheelY + Math.cos(angle) * 0.14,
        wz + Math.sin(angle) * 0.14
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_spokes.setMatrixAt(spokeIndex++, dummy.matrix);
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_hubGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.055, 20);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubGeom, chromeMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    dummy.position.set(side * 1.025, wheelY, wheelPositions[i][1]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const taillightGeom = new THREE.SphereGeometry(1, 20, 12);
  const taillights = new THREE.Group();
  taillights.name = "taillights";
  for (const side of [-1, 1]) {
    const taillight = new THREE.Mesh(taillightGeom, tailMat);
    taillight.scale.set(0.11, 0.22, 0.075);
    taillight.position.set(side * 0.80, 0.84, -2.24);
    taillights.add(taillight);
  }
  root.add(taillights);

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