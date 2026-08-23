export default function generate(THREE) {
  const root = new THREE.Group();

  const length = 3.75;
  const width = 1.56;
  const wheelR = 0.40;
  const wheelY = 0.41;
  const frontAxleZ = 1.15;
  const rearAxleZ = -1.18;
  const bodySideX = width * 0.506;
  const wheelX = width * 0.50;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5d666b,
    metalness: 0.0,
    roughness: 0.3
  });
  const bodyAccentMat = new THREE.MeshStandardMaterial({
    color: 0x464e52,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151719,
    metalness: 0.0,
    roughness: 0.8
  });
  const blackTrimMat = new THREE.MeshStandardMaterial({
    color: 0x202427,
    metalness: 0.0,
    roughness: 0.8
  });
  const grilleMat = new THREE.MeshStandardMaterial({
    color: 0x101315,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const windowGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x35434a,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const windshieldMat = new THREE.MeshPhysicalMaterial({
    color: 0x9eb2ba,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const headlightGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce8ed,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xf4f6ed,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xf4f6ed,
    emissiveIntensity: 1.0
  });
  const redLampMat = new THREE.MeshStandardMaterial({
    color: 0xc91d2e,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xc91d2e,
    emissiveIntensity: 1.0
  });
  const amberLampMat = new THREE.MeshStandardMaterial({
    color: 0xe79a32,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe79a32,
    emissiveIntensity: 1.0
  });
  const badgeBlueMat = new THREE.MeshStandardMaterial({
    color: 0x28576d,
    metalness: 0.0,
    roughness: 0.3
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

  function makeSideGeometry(points, side) {
    const mapped = [];
    for (let i = 0; i < points.length; i++) {
      mapped.push([side > 0 ? -points[i][0] : points[i][0], points[i][1]]);
    }
    return makeShapeGeometry(mapped);
  }

  function makeSidePath(points, side) {
    const path = [];
    for (let i = 0; i < points.length; i++) {
      path.push(new THREE.Vector3(
        side * (bodySideX + 0.012),
        points[i][1],
        points[i][0]
      ));
    }
    return path;
  }

  function makeRodBetween(start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const rodGeom = new THREE.CylinderGeometry(
      radius,
      radius,
      direction.length(),
      8
    );
    const rod = new THREE.Mesh(rodGeom, material);
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return rod;
  }

  const lower_bodyShape = new THREE.Shape();
  lower_bodyShape.moveTo(-1.72, 0.34);
  lower_bodyShape.lineTo(1.55, 0.34);
  lower_bodyShape.bezierCurveTo(1.68, 0.38, 1.76, 0.52, 1.73, 0.72);
  lower_bodyShape.bezierCurveTo(1.70, 0.90, 1.57, 1.01, 1.38, 1.08);
  lower_bodyShape.bezierCurveTo(0.92, 1.15, 0.48, 1.18, 0.05, 1.18);
  lower_bodyShape.bezierCurveTo(-0.55, 1.17, -1.12, 1.13, -1.42, 1.08);
  lower_bodyShape.bezierCurveTo(-1.63, 1.02, -1.74, 0.89, -1.76, 0.69);
  lower_bodyShape.lineTo(-1.72, 0.34);
  lower_bodyShape.closePath();

  const lower_bodyGeom = new THREE.ExtrudeGeometry(lower_bodyShape, {
    depth: width * 0.94,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3
  });
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.rotation.y = -Math.PI / 2;
  lower_body.position.x = width * 0.47;
  root.add(lower_body);

  const cabin_shellShape = new THREE.Shape();
  cabin_shellShape.moveTo(-1.52, 1.02);
  cabin_shellShape.lineTo(0.92, 1.06);
  cabin_shellShape.bezierCurveTo(0.84, 1.24, 0.66, 1.48, 0.43, 1.63);
  cabin_shellShape.bezierCurveTo(0.10, 1.78, -0.48, 1.82, -0.94, 1.72);
  cabin_shellShape.bezierCurveTo(-1.25, 1.64, -1.48, 1.38, -1.58, 1.10);
  cabin_shellShape.lineTo(-1.52, 1.02);
  cabin_shellShape.closePath();

  const cabin_shellGeom = new THREE.ExtrudeGeometry(cabin_shellShape, {
    depth: width * 0.84,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 3
  });
  const cabin_shell = new THREE.Mesh(cabin_shellGeom, bodyMat);
  cabin_shell.rotation.y = -Math.PI / 2;
  cabin_shell.position.x = width * 0.42;
  root.add(cabin_shell);

  const hoodGeom = new THREE.SphereGeometry(1, 32, 16);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.scale.set(0.77, 0.15, 0.72);
  hood.position.set(0, 1.045, 1.02);
  root.add(hood);

  const roofGeom = new THREE.SphereGeometry(1, 32, 16);
  const roof = new THREE.Mesh(roofGeom, bodyMat);
  roof.scale.set(0.69, 0.13, 1.08);
  roof.position.set(0, 1.68, -0.28);
  root.add(roof);

  const front_fender_shouldersGeom = new THREE.SphereGeometry(1, 24, 12);
  const front_fender_shoulders = new THREE.InstancedMesh(
    front_fender_shouldersGeom,
    bodyMat,
    2
  );
  const temp = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.63, 0.98, 1.04);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(0.22, 0.22, 0.66);
    temp.updateMatrix();
    front_fender_shoulders.setMatrixAt(i, temp.matrix);
  }
  front_fender_shoulders.instanceMatrix.needsUpdate = true;
  root.add(front_fender_shoulders);

  const windshield_surroundGeom = makeShapeGeometry([
    [-0.72, -0.37],
    [0.72, -0.37],
    [0.59, 0.37],
    [-0.59, 0.37]
  ]);
  const windshield_surround = new THREE.Mesh(
    windshield_surroundGeom,
    blackTrimMat
  );
  windshield_surround.rotation.x = -0.72;
  windshield_surround.position.set(0, 1.36, 0.69);
  root.add(windshield_surround);

  const windshieldGeom = makeShapeGeometry([
    [-0.65, -0.31],
    [0.65, -0.31],
    [0.53, 0.31],
    [-0.53, 0.31]
  ]);
  const windshield = new THREE.Mesh(windshieldGeom, windshieldMat);
  windshield.rotation.x = -0.72;
  windshield.position.set(0, 1.367, 0.699);
  root.add(windshield);

  const rear_windshield_surroundGeom = makeShapeGeometry([
    [-0.61, -0.30],
    [0.61, -0.30],
    [0.50, 0.30],
    [-0.50, 0.30]
  ]);
  const rear_windshield_surround = new THREE.Mesh(
    rear_windshield_surroundGeom,
    blackTrimMat
  );
  rear_windshield_surround.rotation.x = 0.82;
  rear_windshield_surround.position.set(0, 1.39, -1.35);
  root.add(rear_windshield_surround);

  const rear_windshieldGeom = makeShapeGeometry([
    [-0.54, -0.25],
    [0.54, -0.25],
    [0.44, 0.25],
    [-0.44, 0.25]
  ]);
  const rear_windshield = new THREE.Mesh(rear_windshieldGeom, windowGlassMat);
  rear_windshield.rotation.x = 0.82;
  rear_windshield.position.set(0, 1.397, -1.359);
  root.add(rear_windshield);

  const front_window_surroundGeom = makeSideGeometry([
    [0.84, 1.10],
    [0.52, 1.57],
    [-0.10, 1.62],
    [-0.22, 1.10]
  ], 1);
  const front_left_window_surround = new THREE.Mesh(
    front_window_surroundGeom,
    silverMat
  );
  front_left_window_surround.rotation.y = Math.PI / 2;
  front_left_window_surround.position.x = bodySideX;
  root.add(front_left_window_surround);

  const front_right_window_surround = new THREE.Mesh(
    front_window_surroundGeom,
    silverMat
  );
  front_right_window_surround.rotation.y = -Math.PI / 2;
  front_right_window_surround.position.x = -bodySideX;
  root.add(front_right_window_surround);

  const front_window_glassGeom = makeSideGeometry([
    [0.75, 1.16],
    [0.47, 1.51],
    [-0.04, 1.55],
    [-0.14, 1.16]
  ], 1);
  const front_left_window_glass = new THREE.Mesh(
    front_window_glassGeom,
    windowGlassMat
  );
  front_left_window_glass.rotation.y = Math.PI / 2;
  front_left_window_glass.position.x = bodySideX + 0.008;
  root.add(front_left_window_glass);

  const front_right_window_glass = new THREE.Mesh(
    front_window_glassGeom,
    windowGlassMat
  );
  front_right_window_glass.rotation.y = -Math.PI / 2;
  front_right_window_glass.position.x = -bodySideX - 0.008;
  root.add(front_right_window_glass);

  const rear_window_surroundGeom = makeSideGeometry([
    [-0.18, 1.10],
    [-0.10, 1.62],
    [-0.84, 1.55],
    [-1.28, 1.27],
    [-1.36, 1.10]
  ], 1);
  const rear_left_window_surround = new THREE.Mesh(
    rear_window_surroundGeom,
    silverMat
  );
  rear_left_window_surround.rotation.y = Math.PI / 2;
  rear_left_window_surround.position.x = bodySideX;
  root.add(rear_left_window_surround);

  const rear_right_window_surround = new THREE.Mesh(
    rear_window_surroundGeom,
    silverMat
  );
  rear_right_window_surround.rotation.y = -Math.PI / 2;
  rear_right_window_surround.position.x = -bodySideX;
  root.add(rear_right_window_surround);

  const rear_window_glassGeom = makeSideGeometry([
    [-0.25, 1.16],
    [-0.17, 1.55],
    [-0.79, 1.49],
    [-1.20, 1.23],
    [-1.27, 1.16]
  ], 1);
  const rear_left_window_glass = new THREE.Mesh(
    rear_window_glassGeom,
    windowGlassMat
  );
  rear_left_window_glass.rotation.y = Math.PI / 2;
  rear_left_window_glass.position.x = bodySideX + 0.008;
  root.add(rear_left_window_glass);

  const rear_right_window_glass = new THREE.Mesh(
    rear_window_glassGeom,
    windowGlassMat
  );
  rear_right_window_glass.rotation.y = -Math.PI / 2;
  rear_right_window_glass.position.x = -bodySideX - 0.008;
  root.add(rear_right_window_glass);

  const left_window_upper_trimGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(makeSidePath([
      [0.76, 1.54],
      [0.28, 1.65],
      [-0.42, 1.63],
      [-1.18, 1.29]
    ], 1)),
    28,
    0.014,
    7,
    false
  );
  const left_window_upper_trim = new THREE.Mesh(
    left_window_upper_trimGeom,
    silverMat
  );
  root.add(left_window_upper_trim);

  const right_window_upper_trimGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(makeSidePath([
      [0.76, 1.54],
      [0.28, 1.65],
      [-0.42, 1.63],
      [-1.18, 1.29]
    ], -1)),
    28,
    0.014,
    7,
    false
  );
  const right_window_upper_trim = new THREE.Mesh(
    right_window_upper_trimGeom,
    silverMat
  );
  root.add(right_window_upper_trim);

  const left_window_belt_trimGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(bodySideX + 0.014, 1.105, 0.82),
      new THREE.Vector3(bodySideX + 0.014, 1.105, -1.34)
    ),
    1,
    0.013,
    7,
    false
  );
  const left_window_belt_trim = new THREE.Mesh(
    left_window_belt_trimGeom,
    silverMat
  );
  root.add(left_window_belt_trim);

  const right_window_belt_trimGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-bodySideX - 0.014, 1.105, 0.82),
      new THREE.Vector3(-bodySideX - 0.014, 1.105, -1.34)
    ),
    1,
    0.013,
    7,
    false
  );
  const right_window_belt_trim = new THREE.Mesh(
    right_window_belt_trimGeom,
    silverMat
  );
  root.add(right_window_belt_trim);

  const left_front_door_seamGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(bodySideX + 0.012, 1.08, -0.20),
      new THREE.Vector3(bodySideX + 0.012, 0.78, -0.22),
      new THREE.Vector3(bodySideX + 0.012, 0.43, -0.30)
    ]),
    10,
    0.009,
    6,
    false
  );
  const left_front_door_seam = new THREE.Mesh(
    left_front_door_seamGeom,
    blackTrimMat
  );
  root.add(left_front_door_seam);

  const right_front_door_seamGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-bodySideX - 0.012, 1.08, -0.20),
      new THREE.Vector3(-bodySideX - 0.012, 0.78, -0.22),
      new THREE.Vector3(-bodySideX - 0.012, 0.43, -0.30)
    ]),
    10,
    0.009,
    6,
    false
  );
  const right_front_door_seam = new THREE.Mesh(
    right_front_door_seamGeom,
    blackTrimMat
  );
  root.add(right_front_door_seam);

  const left_rear_door_seamGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(bodySideX + 0.012, 1.06, -1.14),
      new THREE.Vector3(bodySideX + 0.012, 0.76, -1.18),
      new THREE.Vector3(bodySideX + 0.012, 0.47, -1.24)
    ]),
    10,
    0.009,
    6,
    false
  );
  const left_rear_door_seam = new THREE.Mesh(
    left_rear_door_seamGeom,
    blackTrimMat
  );
  root.add(left_rear_door_seam);

  const right_rear_door_seamGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-bodySideX - 0.012, 1.06, -1.14),
      new THREE.Vector3(-bodySideX - 0.012, 0.76, -1.18),
      new THREE.Vector3(-bodySideX - 0.012, 0.47, -1.24)
    ]),
    10,
    0.009,
    6,
    false
  );
  const right_rear_door_seam = new THREE.Mesh(
    right_rear_door_seamGeom,
    blackTrimMat
  );
  root.add(right_rear_door_seam);

  const door_handle_recessesGeom = new THREE.SphereGeometry(1, 16, 8);
  const door_handle_recesses = new THREE.InstancedMesh(
    door_handle_recessesGeom,
    blackTrimMat,
    4
  );
  const door_handlesGeom = new THREE.SphereGeometry(1, 16, 8);
  const door_handles = new THREE.InstancedMesh(
    door_handlesGeom,
    bodyAccentMat,
    4
  );
  const handlePositions = [
    [1, 0.18],
    [1, -0.82],
    [-1, 0.18],
    [-1, -0.82]
  ];
  for (let i = 0; i < handlePositions.length; i++) {
    const side = handlePositions[i][0];
    const z = handlePositions[i][1];

    temp.position.set(side * (bodySideX + 0.014), 0.91, z);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(0.024, 0.048, 0.12);
    temp.updateMatrix();
    door_handle_recesses.setMatrixAt(i, temp.matrix);

    temp.position.set(side * (bodySideX + 0.035), 0.925, z);
    temp.scale.set(0.035, 0.032, 0.095);
    temp.updateMatrix();
    door_handles.setMatrixAt(i, temp.matrix);
  }
  door_handle_recesses.instanceMatrix.needsUpdate = true;
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handle_recesses, door_handles);

  const side_mirror_housingsGeom = new THREE.SphereGeometry(1, 20, 10);
  const side_mirror_housings = new THREE.InstancedMesh(
    side_mirror_housingsGeom,
    bodyAccentMat,
    2
  );
  const side_mirror_glassGeom = new THREE.CircleGeometry(0.085, 20);
  const side_mirror_glass = new THREE.InstancedMesh(
    side_mirror_glassGeom,
    windowGlassMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;

    temp.position.set(side * 0.91, 1.16, 0.66);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(0.15, 0.085, 0.12);
    temp.updateMatrix();
    side_mirror_housings.setMatrixAt(i, temp.matrix);

    temp.position.set(side * 1.045, 1.16, 0.66);
    temp.rotation.set(0, side * Math.PI / 2, 0);
    temp.scale.set(1.15, 0.72, 1);
    temp.updateMatrix();
    side_mirror_glass.setMatrixAt(i, temp.matrix);
  }
  side_mirror_housings.instanceMatrix.needsUpdate = true;
  side_mirror_glass.instanceMatrix.needsUpdate = true;
  root.add(side_mirror_housings, side_mirror_glass);

  const left_mirror_stem = makeRodBetween(
    new THREE.Vector3(0.75, 1.13, 0.61),
    new THREE.Vector3(0.90, 1.15, 0.65),
    0.025,
    bodyAccentMat
  );
  const right_mirror_stem = makeRodBetween(
    new THREE.Vector3(-0.75, 1.13, 0.61),
    new THREE.Vector3(-0.90, 1.15, 0.65),
    0.025,
    bodyAccentMat
  );
  root.add(left_mirror_stem, right_mirror_stem);

  const side_sillsGeom = new THREE.BoxGeometry(0.10, 0.11, 1.58);
  const side_sills = new THREE.InstancedMesh(
    side_sillsGeom,
    blackTrimMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.80, 0.36, -0.03);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    side_sills.setMatrixAt(i, temp.matrix);
  }
  side_sills.instanceMatrix.needsUpdate = true;
  root.add(side_sills);

  const running_board_treadsGeom = new THREE.BoxGeometry(0.055, 0.018, 1.28);
  const running_board_treads = new THREE.InstancedMesh(
    running_board_treadsGeom,
    rubberMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.85, 0.415, -0.03);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    running_board_treads.setMatrixAt(i, temp.matrix);
  }
  running_board_treads.instanceMatrix.needsUpdate = true;
  root.add(running_board_treads);

  const fuel_doorGeom = new THREE.CircleGeometry(0.105, 24);
  const fuel_door = new THREE.Mesh(fuel_doorGeom, bodyAccentMat);
  fuel_door.rotation.y = Math.PI / 2;
  fuel_door.position.set(bodySideX + 0.018, 0.91, -1.37);
  root.add(fuel_door);

  const wheelPositions = [
    [-wheelX, wheelY, frontAxleZ],
    [wheelX, wheelY, frontAxleZ],
    [-wheelX, wheelY, rearAxleZ],
    [wheelX, wheelY, rearAxleZ]
  ];

  const wheel_wellsGeom = new THREE.CylinderGeometry(0.43, 0.43, 0.045, 32);
  const wheel_wells = new THREE.InstancedMesh(
    wheel_wellsGeom,
    blackTrimMat,
    4
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    temp.position.set(side * 0.77, p[1], p[2]);
    temp.rotation.set(0, 0, Math.PI / 2);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    wheel_wells.setMatrixAt(i, temp.matrix);
  }
  wheel_wells.instanceMatrix.needsUpdate = true;
  root.add(wheel_wells);

  const wheel_tiresGeom = new THREE.TorusGeometry(0.28, 0.12, 12, 32);
  const wheel_tires = new THREE.InstancedMesh(
    wheel_tiresGeom,
    rubberMat,
    4
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    temp.position.set(p[0], p[1], p[2]);
    temp.rotation.set(0, Math.PI / 2, 0);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    wheel_tires.setMatrixAt(i, temp.matrix);
  }
  wheel_tires.instanceMatrix.needsUpdate = true;
  root.add(wheel_tires);

  const tire_treadsGeom = new THREE.BoxGeometry(0.22, 0.055, 0.095);
  const tire_treads = new THREE.InstancedMesh(
    tire_treadsGeom,
    rubberMat,
    56
  );
  let treadIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    for (let i = 0; i < 14; i++) {
      const angle = i / 14 * Math.PI * 2;
      temp.position.set(
        p[0],
        p[1] + Math.cos(angle) * 0.395,
        p[2] + Math.sin(angle) * 0.395
      );
      temp.rotation.set(angle, 0, 0);
      temp.scale.set(1, 1, 1);
      temp.updateMatrix();
      tire_treads.setMatrixAt(treadIndex, temp.matrix);
      treadIndex++;
    }
  }
  tire_treads.instanceMatrix.needsUpdate = true;
  root.add(tire_treads);

  const wheel_rimsGeom = new THREE.TorusGeometry(0.19, 0.035, 10, 28);
  const wheel_rims = new THREE.InstancedMesh(
    wheel_rimsGeom,
    silverMat,
    4
  );
  const wheel_rim_facesGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.055, 28);
  const wheel_rim_faces = new THREE.InstancedMesh(
    wheel_rim_facesGeom,
    silverMat,
    4
  );
  const wheel_hubsGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.075, 20);
  const wheel_hubs = new THREE.InstancedMesh(
    wheel_hubsGeom,
    brushedMetalMat,
    4
  );
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    const outerX = side * 0.89;

    temp.position.set(outerX, p[1], p[2]);
    temp.rotation.set(0, Math.PI / 2, 0);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    wheel_rims.setMatrixAt(i, temp.matrix);

    temp.position.set(side * 0.875, p[1], p[2]);
    temp.rotation.set(0, 0, Math.PI / 2);
    temp.updateMatrix();
    wheel_rim_faces.setMatrixAt(i, temp.matrix);

    temp.position.set(side * 0.91, p[1], p[2]);
    temp.rotation.set(0, 0, Math.PI / 2);
    temp.updateMatrix();
    wheel_hubs.setMatrixAt(i, temp.matrix);
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  wheel_rim_faces.instanceMatrix.needsUpdate = true;
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_rim_faces, wheel_rims, wheel_hubs);

  const wheel_spokesGeom = new THREE.BoxGeometry(0.04, 0.20, 0.058);
  const wheel_spokes = new THREE.InstancedMesh(
    wheel_spokesGeom,
    silverMat,
    20
  );
  let spokeIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    const side = p[0] < 0 ? -1 : 1;
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      temp.position.set(
        side * 0.915,
        p[1] + Math.cos(angle) * 0.105,
        p[2] + Math.sin(angle) * 0.105
      );
      temp.rotation.set(angle, 0, 0);
      temp.scale.set(1, 1, 1);
      temp.updateMatrix();
      wheel_spokes.setMatrixAt(spokeIndex, temp.matrix);
      spokeIndex++;
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_lug_nutsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.025, 10);
  const wheel_lug_nuts = new THREE.InstancedMesh(
    wheel_lug_nutsGeom,
    brushedMetalMat,
    20
  );
  let lugIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    const side = p[0] < 0 ? -1 : 1;
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      temp.position.set(
        side * 0.945,
        p[1] + Math.cos(angle) * 0.038,
        p[2] + Math.sin(angle) * 0.038
      );
      temp.rotation.set(0, 0, Math.PI / 2);
      temp.scale.set(1, 1, 1);
      temp.updateMatrix();
      wheel_lug_nuts.setMatrixAt(lugIndex, temp.matrix);
      lugIndex++;
    }
  }
  wheel_lug_nuts.instanceMatrix.needsUpdate = true;
  root.add(wheel_lug_nuts);

  const front_grille_surroundGeom = makeShapeGeometry([
    [-0.58, 0.18],
    [0.58, 0.18],
    [0.47, -0.24],
    [-0.47, -0.24]
  ]);
  const front_grille_surround = new THREE.Mesh(
    front_grille_surroundGeom,
    silverMat
  );
  front_grille_surround.position.set(0, 0.73, 1.795);
  root.add(front_grille_surround);

  const front_grilleGeom = makeShapeGeometry([
    [-0.51, 0.13],
    [0.51, 0.13],
    [0.41, -0.19],
    [-0.41, -0.19]
  ]);
  const front_grille = new THREE.Mesh(front_grilleGeom, grilleMat);
  front_grille.position.set(0, 0.73, 1.808);
  root.add(front_grille);

  const grille_slatsGeom = new THREE.BoxGeometry(1, 0.025, 0.025);
  const grille_slats = new THREE.InstancedMesh(
    grille_slatsGeom,
    silverMat,
    5
  );
  const grilleWidths = [0.78, 0.84, 0.88, 0.82, 0.74];
  for (let i = 0; i < 5; i++) {
    temp.position.set(0, 0.59 + i * 0.07, 1.825);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(grilleWidths[i], 1, 1);
    temp.updateMatrix();
    grille_slats.setMatrixAt(i, temp.matrix);
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  root.add(grille_slats);

  const grille_verticalsGeom = new THREE.BoxGeometry(0.018, 0.31, 0.026);
  const grille_verticals = new THREE.InstancedMesh(
    grille_verticalsGeom,
    blackTrimMat,
    3
  );
  for (let i = 0; i < 3; i++) {
    temp.position.set((i - 1) * 0.22, 0.72, 1.828);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    grille_verticals.setMatrixAt(i, temp.matrix);
  }
  grille_verticals.instanceMatrix.needsUpdate = true;
  root.add(grille_verticals);

  const front_badge_ringGeom = new THREE.TorusGeometry(0.074, 0.014, 8, 24);
  const front_badge_ring = new THREE.Mesh(front_badge_ringGeom, silverMat);
  front_badge_ring.scale.set(1.25, 0.78, 1);
  front_badge_ring.position.set(0, 0.73, 1.85);
  root.add(front_badge_ring);

  const front_badgeGeom = new THREE.SphereGeometry(1, 20, 10);
  const front_badge = new THREE.Mesh(front_badgeGeom, badgeBlueMat);
  front_badge.scale.set(0.075, 0.043, 0.018);
  front_badge.position.set(0, 0.73, 1.856);
  root.add(front_badge);

  const front_badge_stripeGeom = new THREE.BoxGeometry(0.12, 0.014, 0.012);
  const front_badge_stripe = new THREE.Mesh(front_badge_stripeGeom, silverMat);
  front_badge_stripe.position.set(0, 0.73, 1.876);
  root.add(front_badge_stripe);

  const left_headlight_housingGeom = makeShapeGeometry([
    [-0.84, 0.87],
    [-0.39, 0.84],
    [-0.46, 1.02],
    [-0.79, 1.05]
  ]);
  const left_headlight_housing = new THREE.Mesh(
    left_headlight_housingGeom,
    silverMat
  );
  left_headlight_housing.position.z = 1.795;
  root.add(left_headlight_housing);

  const right_headlight_housingGeom = makeShapeGeometry([
    [0.39, 0.84],
    [0.84, 0.87],
    [0.79, 1.05],
    [0.46, 1.02]
  ]);
  const right_headlight_housing = new THREE.Mesh(
    right_headlight_housingGeom,
    silverMat
  );
  right_headlight_housing.position.z = 1.795;
  root.add(right_headlight_housing);

  const left_headlight_lensGeom = makeShapeGeometry([
    [-0.79, 0.89],
    [-0.44, 0.87],
    [-0.49, 0.985],
    [-0.76, 1.01]
  ]);
  const left_headlight_lens = new THREE.Mesh(
    left_headlight_lensGeom,
    headlightGlassMat
  );
  left_headlight_lens.position.z = 1.812;
  root.add(left_headlight_lens);

  const right_headlight_lensGeom = makeShapeGeometry([
    [0.44, 0.87],
    [0.79, 0.89],
    [0.76, 1.01],
    [0.49, 0.985]
  ]);
  const right_headlight_lens = new THREE.Mesh(
    right_headlight_lensGeom,
    headlightGlassMat
  );
  right_headlight_lens.position.z = 1.812;
  root.add(right_headlight_lens);

  const headlight_reflectorsGeom = new THREE.CircleGeometry(0.075, 20);
  const headlight_reflectors = new THREE.InstancedMesh(
    headlight_reflectorsGeom,
    silverMat,
    2
  );
  const headlight_bulbsGeom = new THREE.CircleGeometry(0.038, 16);
  const headlight_bulbs = new THREE.InstancedMesh(
    headlight_bulbsGeom,
    lampMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;

    temp.position.set(side * 0.64, 0.945, 1.825);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(1.15, 0.82, 1);
    temp.updateMatrix();
    headlight_reflectors.setMatrixAt(i, temp.matrix);

    temp.position.set(side * 0.64, 0.945, 1.833);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    headlight_bulbs.setMatrixAt(i, temp.matrix);
  }
  headlight_reflectors.instanceMatrix.needsUpdate = true;
  headlight_bulbs.instanceMatrix.needsUpdate = true;
  root.add(headlight_reflectors, headlight_bulbs);

  const headlight_indicatorsGeom = new THREE.CircleGeometry(0.028, 14);
  const headlight_indicators = new THREE.InstancedMesh(
    headlight_indicatorsGeom,
    amberLampMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.77, 0.95, 1.832);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(1.2, 0.7, 1);
    temp.updateMatrix();
    headlight_indicators.setMatrixAt(i, temp.matrix);
  }
  headlight_indicators.instanceMatrix.needsUpdate = true;
  root.add(headlight_indicators);

  const front_bumperGeom = new THREE.BoxGeometry(1.44, 0.18, 0.12);
  const front_bumper = new THREE.Mesh(front_bumperGeom, blackTrimMat);
  front_bumper.position.set(0, 0.40, 1.76);
  root.add(front_bumper);

  const front_bumper_cornersGeom = new THREE.SphereGeometry(1, 18, 10);
  const front_bumper_corners = new THREE.InstancedMesh(
    front_bumper_cornersGeom,
    blackTrimMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.68, 0.43, 1.72);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(0.20, 0.16, 0.15);
    temp.updateMatrix();
    front_bumper_corners.setMatrixAt(i, temp.matrix);
  }
  front_bumper_corners.instanceMatrix.needsUpdate = true;
  root.add(front_bumper_corners);

  const lower_intakeGeom = new THREE.BoxGeometry(0.92, 0.11, 0.035);
  const lower_intake = new THREE.Mesh(lower_intakeGeom, grilleMat);
  lower_intake.position.set(0, 0.37, 1.835);
  root.add(lower_intake);

  const front_license_plateGeom = new THREE.BoxGeometry(0.70, 0.15, 0.035);
  const front_license_plate = new THREE.Mesh(
    front_license_plateGeom,
    silverMat
  );
  front_license_plate.position.set(0, 0.49, 1.855);
  root.add(front_license_plate);

  const fog_light_rimsGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.035, 20);
  const fog_light_rims = new THREE.InstancedMesh(
    fog_light_rimsGeom,
    blackTrimMat,
    2
  );
  const fog_lightsGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.042, 20);
  const fog_lights = new THREE.InstancedMesh(fog_lightsGeom, lampMat, 2);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;

    temp.position.set(side * 0.56, 0.57, 1.84);
    temp.rotation.set(Math.PI / 2, 0, 0);
    temp.scale.set(1, 1, 1);
    temp.updateMatrix();
    fog_light_rims.setMatrixAt(i, temp.matrix);

    temp.position.set(side * 0.56, 0.57, 1.865);
    temp.updateMatrix();
    fog_lights.setMatrixAt(i, temp.matrix);
  }
  fog_light_rims.instanceMatrix.needsUpdate = true;
  fog_lights.instanceMatrix.needsUpdate = true;
  root.add(fog_light_rims, fog_lights);

  const front_left_bumper_guardGeom = new THREE.BoxGeometry(0.14, 0.31, 0.15);
  const front_left_bumper_guard = new THREE.Mesh(
    front_left_bumper_guardGeom,
    bodyAccentMat
  );
  front_left_bumper_guard.position.set(-0.56, 0.43, 1.84);
  front_left_bumper_guard.rotation.x = -0.12;
  root.add(front_left_bumper_guard);

  const front_right_bumper_guard = new THREE.Mesh(
    front_left_bumper_guardGeom,
    bodyAccentMat
  );
  front_right_bumper_guard.position.set(0.56, 0.43, 1.84);
  front_right_bumper_guard.rotation.x = -0.12;
  root.add(front_right_bumper_guard);

  const front_skid_plateGeom = new THREE.BoxGeometry(0.72, 0.065, 0.055);
  const front_skid_plate = new THREE.Mesh(front_skid_plateGeom, silverMat);
  front_skid_plate.position.set(0, 0.315, 1.84);
  root.add(front_skid_plate);

  const left_wiper = makeRodBetween(
    new THREE.Vector3(-0.50, 1.125, 0.925),
    new THREE.Vector3(-0.05, 1.205, 0.855),
    0.014,
    blackTrimMat
  );
  const right_wiper = makeRodBetween(
    new THREE.Vector3(0.48, 1.125, 0.925),
    new THREE.Vector3(0.03, 1.19, 0.865),
    0.014,
    blackTrimMat
  );
  root.add(left_wiper, right_wiper);

  const rear_bumperGeom = new THREE.BoxGeometry(1.38, 0.17, 0.13);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, blackTrimMat);
  rear_bumper.position.set(0, 0.43, -1.69);
  root.add(rear_bumper);

  const taillightsGeom = new THREE.SphereGeometry(1, 20, 10);
  const taillights = new THREE.InstancedMesh(
    taillightsGeom,
    redLampMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.66, 0.94, -1.66);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(0.16, 0.12, 0.075);
    temp.updateMatrix();
    taillights.setMatrixAt(i, temp.matrix);
  }
  taillights.instanceMatrix.needsUpdate = true;
  root.add(taillights);

  const rear_side_markersGeom = new THREE.SphereGeometry(1, 18, 9);
  const rear_side_markers = new THREE.InstancedMesh(
    rear_side_markersGeom,
    redLampMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    temp.position.set(side * 0.78, 0.93, -1.52);
    temp.rotation.set(0, 0, 0);
    temp.scale.set(0.045, 0.10, 0.17);
    temp.updateMatrix();
    rear_side_markers.setMatrixAt(i, temp.matrix);
  }
  rear_side_markers.instanceMatrix.needsUpdate = true;
  root.add(rear_side_markers);

  const rear_license_plateGeom = new THREE.BoxGeometry(0.58, 0.14, 0.025);
  const rear_license_plate = new THREE.Mesh(
    rear_license_plateGeom,
    silverMat
  );
  rear_license_plate.position.set(0, 0.66, -1.745);
  root.add(rear_license_plate);

  const roof_antennaGeom = new THREE.ConeGeometry(0.065, 0.14, 12);
  const roof_antenna = new THREE.Mesh(roof_antennaGeom, bodyAccentMat);
  roof_antenna.scale.set(0.75, 1, 1.35);
  roof_antenna.position.set(0, 1.84, -0.72);
  root.add(roof_antenna);

  const hood_badgeGeom = new THREE.CircleGeometry(0.035, 18);
  const hood_badge = new THREE.Mesh(hood_badgeGeom, badgeBlueMat);
  hood_badge.rotation.x = -Math.PI / 2;
  hood_badge.position.set(0, 1.195, 1.18);
  root.add(hood_badge);

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