export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_cargo_van";

  const length = 3.62;
  const width = 1.44;
  const height = 2.04;
  const bodyBottom = 0.40;
  const wheelR = 0.43;
  const wheelY = wheelR;
  const frontAxleZ = 1.17;
  const rearAxleZ = -1.14;
  const sideSurface = width / 2 + 0.045;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb5b7b6,
    metalness: 0.0,
    roughness: 0.3
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0xaeb0af,
    metalness: 0.0,
    roughness: 0.3
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xc3c4c2,
    metalness: 0.0,
    roughness: 0.3
  });
  const darkTrimMat = new THREE.MeshStandardMaterial({
    color: 0x242626,
    metalness: 0.0,
    roughness: 0.8
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x4d5050,
    metalness: 0.0,
    roughness: 0.8
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151616,
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
    color: 0x526064,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xe8ece8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe8ece8,
    emissiveIntensity: 1.0
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xe88922,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe88922,
    emissiveIntensity: 1.0
  });
  const redLightMat = new THREE.MeshStandardMaterial({
    color: 0xb7191f,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xb7191f,
    emissiveIntensity: 1.0
  });
  const whiteLightMat = new THREE.MeshStandardMaterial({
    color: 0xe9e6dc,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe9e6dc,
    emissiveIntensity: 1.0
  });

  function makeBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function makeTube(name, p1, p2, radius, mat) {
    const curve = new THREE.LineCurve3(p1, p2);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 1, radius, 8, false),
      mat
    );
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  function makeRoundedRectGeometry(w, h, r) {
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
    return new THREE.ShapeGeometry(shape, 12);
  }

  function makeRoundedRectRingGeometry(w, h, r, inset) {
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

    const iw = w - inset * 2;
    const ih = h - inset * 2;
    const ir = Math.max(0.012, r - inset * 0.45);
    const hw = iw / 2;
    const hh = ih / 2;
    const hole = new THREE.Path();
    hole.moveTo(-hw + ir, -hh);
    hole.quadraticCurveTo(-hw, -hh, -hw, -hh + ir);
    hole.lineTo(-hw, hh - ir);
    hole.quadraticCurveTo(-hw, hh, -hw + ir, hh);
    hole.lineTo(hw - ir, hh);
    hole.quadraticCurveTo(hw, hh, hw, hh - ir);
    hole.lineTo(hw, -hh + ir);
    hole.quadraticCurveTo(hw, -hh, hw - ir, -hh);
    hole.lineTo(-hw + ir, -hh);
    shape.holes.push(hole);
    return new THREE.ShapeGeometry(shape, 12);
  }

  const main_bodyShape = new THREE.Shape();
  main_bodyShape.moveTo(-1.82, bodyBottom + 0.04);
  main_bodyShape.lineTo(-1.67, bodyBottom);
  main_bodyShape.lineTo(1.43, bodyBottom);
  main_bodyShape.lineTo(1.64, 0.49);
  main_bodyShape.lineTo(1.72, 0.72);
  main_bodyShape.lineTo(1.69, 1.08);
  main_bodyShape.lineTo(1.55, 1.29);
  main_bodyShape.lineTo(1.20, 1.45);
  main_bodyShape.lineTo(0.82, 1.87);
  main_bodyShape.lineTo(0.61, 1.99);
  main_bodyShape.lineTo(-1.48, 1.99);
  main_bodyShape.lineTo(-1.68, 1.91);
  main_bodyShape.lineTo(-1.79, 1.67);
  main_bodyShape.lineTo(-1.83, 0.66);
  main_bodyShape.lineTo(-1.82, bodyBottom + 0.04);

  const main_bodyGeom = new THREE.ExtrudeGeometry(main_bodyShape, {
    depth: width,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 2,
    curveSegments: 12
  });
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.rotation.y = -Math.PI / 2;
  main_body.position.x = width / 2;
  root.add(main_body);

  const roof_capGeom = new THREE.CapsuleGeometry(0.18, 2.20, 6, 18);
  const roof_cap = new THREE.Mesh(roof_capGeom, roofMat);
  roof_cap.name = "roof_cap";
  roof_cap.rotation.x = Math.PI / 2;
  roof_cap.scale.set(4.0, 1.0, 0.28);
  roof_cap.position.set(0, 2.0, -0.40);
  root.add(roof_cap);

  const hoodGeom = new THREE.CapsuleGeometry(0.14, 0.43, 5, 16);
  const hood = new THREE.Mesh(hoodGeom, roofMat);
  hood.name = "hood";
  hood.rotation.x = Math.PI / 2 + 0.07;
  hood.scale.set(4.35, 1.0, 0.34);
  hood.position.set(0, 1.36, 1.34);
  root.add(hood);

  const front_bumper = makeBox(
    "front_bumper", 1.54, 0.25, 0.18, bodyMat,
    0, 0.51, 1.78
  );
  const rear_bumper = makeBox(
    "rear_bumper", 1.55, 0.25, 0.19, bodyMat,
    0, 0.51, -1.84
  );

  const bumper_endGeom = new THREE.SphereGeometry(1, 18, 10);
  const bumper_end_caps = new THREE.InstancedMesh(
    bumper_endGeom, bodyMat, 4
  );
  bumper_end_caps.name = "bumper_end_caps";
  const dummy = new THREE.Object3D();
  let instanceIndex = 0;
  for (const z of [1.78, -1.84]) {
    for (const side of [-1, 1]) {
      dummy.position.set(side * 0.72, 0.51, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.13, 0.125, 0.11);
      dummy.updateMatrix();
      bumper_end_caps.setMatrixAt(instanceIndex++, dummy.matrix);
    }
  }
  bumper_end_caps.instanceMatrix.needsUpdate = true;
  root.add(bumper_end_caps);

  const front_lower_valance = makeBox(
    "front_lower_valance", 1.22, 0.12, 0.08, darkTrimMat,
    0, 0.35, 1.875
  );
  const rear_lower_valance = makeBox(
    "rear_lower_valance", 1.18, 0.10, 0.07, darkTrimMat,
    0, 0.36, -1.945
  );

  const cargo_panelGeom = makeRoundedRectGeometry(1.10, 0.70, 0.10);
  const right_cargo_panel = new THREE.Mesh(cargo_panelGeom, panelMat);
  right_cargo_panel.name = "right_cargo_panel";
  right_cargo_panel.rotation.y = Math.PI / 2;
  right_cargo_panel.position.set(sideSurface + 0.006, 1.49, -0.58);
  root.add(right_cargo_panel);

  const left_cargo_panel = new THREE.Mesh(cargo_panelGeom, panelMat);
  left_cargo_panel.name = "left_cargo_panel";
  left_cargo_panel.rotation.y = -Math.PI / 2;
  left_cargo_panel.position.set(-sideSurface - 0.006, 1.49, -0.58);
  root.add(left_cargo_panel);

  const cargo_panel_trimGeom = makeRoundedRectRingGeometry(
    1.13, 0.73, 0.11, 0.035
  );
  const right_cargo_panel_trim = new THREE.Mesh(
    cargo_panel_trimGeom, seamMat
  );
  right_cargo_panel_trim.name = "right_cargo_panel_trim";
  right_cargo_panel_trim.rotation.y = Math.PI / 2;
  right_cargo_panel_trim.position.set(sideSurface + 0.010, 1.49, -0.58);
  root.add(right_cargo_panel_trim);

  const left_cargo_panel_trim = new THREE.Mesh(
    cargo_panel_trimGeom, seamMat
  );
  left_cargo_panel_trim.name = "left_cargo_panel_trim";
  left_cargo_panel_trim.rotation.y = -Math.PI / 2;
  left_cargo_panel_trim.position.set(-sideSurface - 0.010, 1.49, -0.58);
  root.add(left_cargo_panel_trim);

  const driver_window_frameShape = new THREE.Shape();
  driver_window_frameShape.moveTo(0.20, 1.06);
  driver_window_frameShape.lineTo(1.29, 1.06);
  driver_window_frameShape.lineTo(0.82, 1.88);
  driver_window_frameShape.lineTo(0.20, 1.88);
  driver_window_frameShape.lineTo(0.20, 1.06);

  const driver_window_frameGeom = new THREE.ShapeGeometry(
    driver_window_frameShape,
    12
  );
  const right_driver_window_frame = new THREE.Mesh(
    driver_window_frameGeom, darkTrimMat
  );
  right_driver_window_frame.name = "right_driver_window_frame";
  right_driver_window_frame.rotation.y = Math.PI / 2;
  right_driver_window_frame.position.x = sideSurface + 0.006;
  root.add(right_driver_window_frame);

  const left_driver_window_frame = new THREE.Mesh(
    driver_window_frameGeom, darkTrimMat
  );
  left_driver_window_frame.name = "left_driver_window_frame";
  left_driver_window_frame.rotation.y = -Math.PI / 2;
  left_driver_window_frame.position.x = -sideSurface - 0.006;
  root.add(left_driver_window_frame);

  const driver_window_glassShape = new THREE.Shape();
  driver_window_glassShape.moveTo(0.28, 1.13);
  driver_window_glassShape.lineTo(1.18, 1.13);
  driver_window_glassShape.lineTo(0.78, 1.80);
  driver_window_glassShape.lineTo(0.28, 1.80);
  driver_window_glassShape.lineTo(0.28, 1.13);

  const driver_window_glassGeom = new THREE.ShapeGeometry(
    driver_window_glassShape,
    12
  );
  const right_driver_window = new THREE.Mesh(
    driver_window_glassGeom, glassMat
  );
  right_driver_window.name = "right_driver_window";
  right_driver_window.rotation.y = Math.PI / 2;
  right_driver_window.position.x = sideSurface + 0.012;
  root.add(right_driver_window);

  const left_driver_window = new THREE.Mesh(
    driver_window_glassGeom, glassMat
  );
  left_driver_window.name = "left_driver_window";
  left_driver_window.rotation.y = -Math.PI / 2;
  left_driver_window.position.x = -sideSurface - 0.012;
  root.add(left_driver_window);

  const windshield_frameGeom = new THREE.PlaneGeometry(1.32, 0.72);
  const windshield_frame = new THREE.Mesh(
    windshield_frameGeom, darkTrimMat
  );
  windshield_frame.name = "windshield_frame";
  windshield_frame.rotation.x = -0.60;
  windshield_frame.position.set(0, 1.65, 1.035);
  root.add(windshield_frame);

  const windshield_glassGeom = new THREE.PlaneGeometry(1.18, 0.60);
  const windshield_glass = new THREE.Mesh(
    windshield_glassGeom, glassMat
  );
  windshield_glass.name = "windshield_glass";
  windshield_glass.rotation.x = -0.60;
  windshield_glass.position.set(0, 1.658, 1.043);
  root.add(windshield_glass);

  const windshield_wiper_left = makeTube(
    "windshield_wiper_left",
    new THREE.Vector3(-0.46, 1.40, 1.225),
    new THREE.Vector3(-0.10, 1.54, 1.135),
    0.012,
    darkTrimMat
  );
  const windshield_wiper_right = makeTube(
    "windshield_wiper_right",
    new THREE.Vector3(0.12, 1.40, 1.225),
    new THREE.Vector3(0.46, 1.54, 1.135),
    0.012,
    darkTrimMat
  );

  const front_door_rear_seamsGeom = new THREE.BoxGeometry(
    0.018, 1.43, 0.018
  );
  const front_door_rear_seams = new THREE.InstancedMesh(
    front_door_rear_seamsGeom, seamMat, 2
  );
  front_door_rear_seams.name = "front_door_rear_seams";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (sideSurface + 0.018), 1.20, 0.17);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_door_rear_seams.setMatrixAt(i, dummy.matrix);
  }
  front_door_rear_seams.instanceMatrix.needsUpdate = true;
  root.add(front_door_rear_seams);

  const front_door_front_seamsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.48, 1.48),
      new THREE.Vector3(0, 1.05, 1.36),
      new THREE.Vector3(0, 1.30, 1.22)
    ]),
    8,
    0.009,
    6,
    false
  );
  const front_door_front_seams = new THREE.InstancedMesh(
    front_door_front_seamsGeom, seamMat, 2
  );
  front_door_front_seams.name = "front_door_front_seams";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (sideSurface + 0.018), 0, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_door_front_seams.setMatrixAt(i, dummy.matrix);
  }
  front_door_front_seams.instanceMatrix.needsUpdate = true;
  root.add(front_door_front_seams);

  const sliding_door_seamsGeom = new THREE.BoxGeometry(
    0.018, 1.43, 0.018
  );
  const sliding_door_seams = new THREE.InstancedMesh(
    sliding_door_seamsGeom, seamMat, 2
  );
  sliding_door_seams.name = "sliding_door_seams";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (sideSurface + 0.018), 1.20, -1.18);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    sliding_door_seams.setMatrixAt(i, dummy.matrix);
  }
  sliding_door_seams.instanceMatrix.needsUpdate = true;
  root.add(sliding_door_seams);

  const lower_door_seamsGeom = new THREE.BoxGeometry(
    0.018, 0.018, 0.92
  );
  const lower_door_seams = new THREE.InstancedMesh(
    lower_door_seamsGeom, seamMat, 2
  );
  lower_door_seams.name = "lower_door_seams";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (sideSurface + 0.018), 0.49, 0.66);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lower_door_seams.setMatrixAt(i, dummy.matrix);
  }
  lower_door_seams.instanceMatrix.needsUpdate = true;
  root.add(lower_door_seams);

  const door_handleGeom = new THREE.CapsuleGeometry(0.035, 0.14, 4, 10);
  const right_door_handle = new THREE.Mesh(door_handleGeom, darkTrimMat);
  right_door_handle.name = "right_door_handle";
  right_door_handle.rotation.x = Math.PI / 2;
  right_door_handle.position.set(sideSurface + 0.052, 1.02, 0.40);
  root.add(right_door_handle);

  const left_door_handle = new THREE.Mesh(door_handleGeom, darkTrimMat);
  left_door_handle.name = "left_door_handle";
  left_door_handle.rotation.x = Math.PI / 2;
  left_door_handle.position.set(-sideSurface - 0.052, 1.02, 0.40);
  root.add(left_door_handle);

  const sliding_door_trackGeom = new THREE.BoxGeometry(
    0.025, 0.025, 1.10
  );
  const right_sliding_door_track = new THREE.Mesh(
    sliding_door_trackGeom, seamMat
  );
  right_sliding_door_track.name = "right_sliding_door_track";
  right_sliding_door_track.position.set(
    sideSurface + 0.022, 0.94, -0.58
  );
  root.add(right_sliding_door_track);

  const left_sliding_door_track = new THREE.Mesh(
    sliding_door_trackGeom, seamMat
  );
  left_sliding_door_track.name = "left_sliding_door_track";
  left_sliding_door_track.position.set(
    -sideSurface - 0.022, 0.94, -0.58
  );
  root.add(left_sliding_door_track);

  const side_rocker_trimGeom = new THREE.BoxGeometry(
    0.035, 0.065, 2.34
  );
  const right_side_rocker_trim = new THREE.Mesh(
    side_rocker_trimGeom, darkTrimMat
  );
  right_side_rocker_trim.name = "right_side_rocker_trim";
  right_side_rocker_trim.position.set(sideSurface + 0.025, 0.43, -0.02);
  root.add(right_side_rocker_trim);

  const left_side_rocker_trim = new THREE.Mesh(
    side_rocker_trimGeom, darkTrimMat
  );
  left_side_rocker_trim.name = "left_side_rocker_trim";
  left_side_rocker_trim.position.set(-sideSurface - 0.025, 0.43, -0.02);
  root.add(left_side_rocker_trim);

  const side_stepGeom = new THREE.CapsuleGeometry(0.055, 1.72, 4, 10);
  const right_side_step = new THREE.Mesh(side_stepGeom, darkTrimMat);
  right_side_step.name = "right_side_step";
  right_side_step.rotation.x = Math.PI / 2;
  right_side_step.scale.set(1, 1, 0.45);
  right_side_step.position.set(sideSurface + 0.12, 0.31, -0.02);
  root.add(right_side_step);

  const left_side_step = new THREE.Mesh(side_stepGeom, darkTrimMat);
  left_side_step.name = "left_side_step";
  left_side_step.rotation.x = Math.PI / 2;
  left_side_step.scale.set(1, 1, 0.45);
  left_side_step.position.set(-sideSurface - 0.12, 0.31, -0.02);
  root.add(left_side_step);

  const fuel_door_ringGeom = new THREE.RingGeometry(0.105, 0.12, 28);
  const fuel_doorGeom = new THREE.CircleGeometry(0.103, 28);

  const right_fuel_door_ring = new THREE.Mesh(
    fuel_door_ringGeom, seamMat
  );
  right_fuel_door_ring.name = "right_fuel_door_ring";
  right_fuel_door_ring.rotation.y = Math.PI / 2;
  right_fuel_door_ring.position.set(sideSurface + 0.026, 0.91, -0.78);
  root.add(right_fuel_door_ring);

  const right_fuel_door = new THREE.Mesh(fuel_doorGeom, panelMat);
  right_fuel_door.name = "right_fuel_door";
  right_fuel_door.rotation.y = Math.PI / 2;
  right_fuel_door.position.set(sideSurface + 0.027, 0.91, -0.78);
  root.add(right_fuel_door);

  const left_fuel_door_ring = new THREE.Mesh(
    fuel_door_ringGeom, seamMat
  );
  left_fuel_door_ring.name = "left_fuel_door_ring";
  left_fuel_door_ring.rotation.y = -Math.PI / 2;
  left_fuel_door_ring.position.set(-sideSurface - 0.026, 0.91, -0.78);
  root.add(left_fuel_door_ring);

  const left_fuel_door = new THREE.Mesh(fuel_doorGeom, panelMat);
  left_fuel_door.name = "left_fuel_door";
  left_fuel_door.rotation.y = -Math.PI / 2;
  left_fuel_door.position.set(-sideSurface - 0.027, 0.91, -0.78);
  root.add(left_fuel_door);

  const mirror_stem_right = makeTube(
    "mirror_stem_right",
    new THREE.Vector3(sideSurface, 1.25, 1.05),
    new THREE.Vector3(0.84, 1.28, 1.05),
    0.025,
    darkTrimMat
  );
  const mirror_stem_left = makeTube(
    "mirror_stem_left",
    new THREE.Vector3(-sideSurface, 1.25, 1.05),
    new THREE.Vector3(-0.84, 1.28, 1.05),
    0.025,
    darkTrimMat
  );

  const side_mirrorGeom = new THREE.SphereGeometry(1, 20, 12);
  const right_side_mirror = new THREE.Mesh(side_mirrorGeom, bodyMat);
  right_side_mirror.name = "right_side_mirror";
  right_side_mirror.scale.set(0.11, 0.14, 0.15);
  right_side_mirror.position.set(0.88, 1.30, 1.05);
  root.add(right_side_mirror);

  const left_side_mirror = new THREE.Mesh(side_mirrorGeom, bodyMat);
  left_side_mirror.name = "left_side_mirror";
  left_side_mirror.scale.set(0.11, 0.14, 0.15);
  left_side_mirror.position.set(-0.88, 1.30, 1.05);
  root.add(left_side_mirror);

  const mirror_glassGeom = new THREE.CircleGeometry(0.105, 20);
  const right_mirror_glass = new THREE.Mesh(mirror_glassGeom, glassMat);
  right_mirror_glass.name = "right_mirror_glass";
  right_mirror_glass.rotation.y = Math.PI / 2;
  right_mirror_glass.scale.y = 0.78;
  right_mirror_glass.position.set(0.985, 1.30, 1.05);
  root.add(right_mirror_glass);

  const left_mirror_glass = new THREE.Mesh(mirror_glassGeom, glassMat);
  left_mirror_glass.name = "left_mirror_glass";
  left_mirror_glass.rotation.y = -Math.PI / 2;
  left_mirror_glass.scale.y = 0.78;
  left_mirror_glass.position.set(-0.985, 1.30, 1.05);
  root.add(left_mirror_glass);

  const wheelPositions = [
    [-1, frontAxleZ],
    [1, frontAxleZ],
    [-1, rearAxleZ],
    [1, rearAxleZ]
  ];

  const wheel_well_discsGeom = new THREE.CircleGeometry(0.46, 32);
  const wheel_well_discs = new THREE.InstancedMesh(
    wheel_well_discsGeom, darkTrimMat, 4
  );
  wheel_well_discs.name = "wheel_well_discs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideSurface + 0.012), wheelY, z);
    dummy.rotation.set(0, side * Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_well_discs.setMatrixAt(i, dummy.matrix);
  }
  wheel_well_discs.instanceMatrix.needsUpdate = true;
  root.add(wheel_well_discs);

  const fender_archesGeom = new THREE.TorusGeometry(
    0.47, 0.065, 10, 32, Math.PI
  );
  const fender_arches = new THREE.InstancedMesh(
    fender_archesGeom, bodyMat, 4
  );
  fender_arches.name = "fender_arches";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideSurface + 0.025), wheelY, z);
    dummy.rotation.set(0, side * Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fender_arches.setMatrixAt(i, dummy.matrix);
  }
  fender_arches.instanceMatrix.needsUpdate = true;
  root.add(fender_arches);

  const tiresGeom = new THREE.TorusGeometry(0.31, 0.12, 14, 36);
  const tires = new THREE.InstancedMesh(tiresGeom, tireMat, 4);
  tires.name = "tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * 0.75, wheelY, z);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tires.setMatrixAt(i, dummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const wheel_backplatesGeom = new THREE.CylinderGeometry(
    0.275, 0.275, 0.045, 28
  );
  const wheel_backplates = new THREE.InstancedMesh(
    wheel_backplatesGeom, darkTrimMat, 4
  );
  wheel_backplates.name = "wheel_backplates";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * 0.845, wheelY, z);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_backplates.setMatrixAt(i, dummy.matrix);
  }
  wheel_backplates.instanceMatrix.needsUpdate = true;
  root.add(wheel_backplates);

  const wheel_rim_ringsGeom = new THREE.TorusGeometry(
    0.225, 0.026, 10, 28
  );
  const wheel_rim_rings = new THREE.InstancedMesh(
    wheel_rim_ringsGeom, silverMat, 4
  );
  wheel_rim_rings.name = "wheel_rim_rings";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * 0.875, wheelY, z);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_rim_rings.setMatrixAt(i, dummy.matrix);
  }
  wheel_rim_rings.instanceMatrix.needsUpdate = true;
  root.add(wheel_rim_rings);

  const wheel_spokesGeom = new THREE.BoxGeometry(0.045, 0.22, 0.066);
  const wheel_spokes = new THREE.InstancedMesh(
    wheel_spokesGeom, silverMat, 20
  );
  wheel_spokes.name = "wheel_spokes";
  instanceIndex = 0;
  for (const wheelPosition of wheelPositions) {
    const side = wheelPosition[0];
    const z = wheelPosition[1];
    for (let spokeIndex = 0; spokeIndex < 5; spokeIndex++) {
      const angle = spokeIndex / 5 * Math.PI * 2;
      dummy.position.set(
        side * 0.89,
        wheelY + Math.cos(angle) * 0.145,
        z + Math.sin(angle) * 0.145
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_spokes.setMatrixAt(instanceIndex++, dummy.matrix);
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_hubsGeom = new THREE.CylinderGeometry(
    0.09, 0.09, 0.055, 20
  );
  const wheel_hubs = new THREE.InstancedMesh(
    wheel_hubsGeom, silverMat, 4
  );
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * 0.91, wheelY, z);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const wheel_hub_capsGeom = new THREE.CylinderGeometry(
    0.045, 0.045, 0.062, 16
  );
  const wheel_hub_caps = new THREE.InstancedMesh(
    wheel_hub_capsGeom, brushedMetalMat, 4
  );
  wheel_hub_caps.name = "wheel_hub_caps";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * 0.925, wheelY, z);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hub_caps.setMatrixAt(i, dummy.matrix);
  }
  wheel_hub_caps.instanceMatrix.needsUpdate = true;
  root.add(wheel_hub_caps);

  const front_grille = makeBox(
    "front_grille", 0.78, 0.25, 0.035, darkTrimMat,
    0, 0.88, 1.745
  );

  const grille_slatsGeom = new THREE.BoxGeometry(0.66, 0.018, 0.025);
  const grille_slats = new THREE.InstancedMesh(
    grille_slatsGeom, brushedMetalMat, 5
  );
  grille_slats.name = "grille_slats";
  for (let i = 0; i < 5; i++) {
    dummy.position.set(0, 0.79 + i * 0.045, 1.768);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    grille_slats.setMatrixAt(i, dummy.matrix);
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  root.add(grille_slats);

  const headlight_bezelsGeom = new THREE.CapsuleGeometry(
    0.075, 0.16, 4, 12
  );
  const headlight_bezels = new THREE.InstancedMesh(
    headlight_bezelsGeom, silverMat, 2
  );
  headlight_bezels.name = "headlight_bezels";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.56, 1.10, 1.685);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 0.34);
    dummy.updateMatrix();
    headlight_bezels.setMatrixAt(i, dummy.matrix);
  }
  headlight_bezels.instanceMatrix.needsUpdate = true;
  root.add(headlight_bezels);

  const headlightsGeom = new THREE.CapsuleGeometry(0.062, 0.14, 4, 12);
  const headlights = new THREE.InstancedMesh(
    headlightsGeom, headlightMat, 2
  );
  headlights.name = "headlights";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.56, 1.10, 1.713);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 0.28);
    dummy.updateMatrix();
    headlights.setMatrixAt(i, dummy.matrix);
  }
  headlights.instanceMatrix.needsUpdate = true;
  root.add(headlights);

  const front_turn_signalsGeom = new THREE.BoxGeometry(
    0.075, 0.17, 0.025
  );
  const front_turn_signals = new THREE.InstancedMesh(
    front_turn_signalsGeom, amberMat, 2
  );
  front_turn_signals.name = "front_turn_signals";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.68, 1.08, 1.70);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_turn_signals.setMatrixAt(i, dummy.matrix);
  }
  front_turn_signals.instanceMatrix.needsUpdate = true;
  root.add(front_turn_signals);

  const side_marker_lightsGeom = new THREE.BoxGeometry(
    0.025, 0.09, 0.15
  );
  const side_marker_lights = new THREE.InstancedMesh(
    side_marker_lightsGeom, amberMat, 2
  );
  side_marker_lights.name = "side_marker_lights";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (sideSurface + 0.035), 1.13, 1.43);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_marker_lights.setMatrixAt(i, dummy.matrix);
  }
  side_marker_lights.instanceMatrix.needsUpdate = true;
  root.add(side_marker_lights);

  const rear_taillightsGeom = new THREE.BoxGeometry(
    0.13, 0.42, 0.04
  );
  const rear_taillights = new THREE.InstancedMesh(
    rear_taillightsGeom, redLightMat, 2
  );
  rear_taillights.name = "rear_taillights";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.64, 1.02, -1.825);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_taillights.setMatrixAt(i, dummy.matrix);
  }
  rear_taillights.instanceMatrix.needsUpdate = true;
  root.add(rear_taillights);

  const rear_reverse_lightsGeom = new THREE.BoxGeometry(
    0.105, 0.10, 0.045
  );
  const rear_reverse_lights = new THREE.InstancedMesh(
    rear_reverse_lightsGeom, whiteLightMat, 2
  );
  rear_reverse_lights.name = "rear_reverse_lights";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.64, 0.98, -1.852);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_reverse_lights.setMatrixAt(i, dummy.matrix);
  }
  rear_reverse_lights.instanceMatrix.needsUpdate = true;
  root.add(rear_reverse_lights);

  const rear_side_taillightsGeom = new THREE.BoxGeometry(
    0.03, 0.38, 0.11
  );
  const rear_side_taillights = new THREE.InstancedMesh(
    rear_side_taillightsGeom, redLightMat, 2
  );
  rear_side_taillights.name = "rear_side_taillights";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * (sideSurface + 0.035), 1.02, -1.70);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_side_taillights.setMatrixAt(i, dummy.matrix);
  }
  rear_side_taillights.instanceMatrix.needsUpdate = true;
  root.add(rear_side_taillights);

  const rear_door_seam = makeBox(
    "rear_door_seam", 0.018, 1.30, 0.025, seamMat,
    0, 1.22, -1.835
  );

  const rear_license_plate = makeBox(
    "rear_license_plate", 0.42, 0.16, 0.025, whiteLightMat,
    0, 0.70, -1.95
  );
  const front_license_plate = makeBox(
    "front_license_plate", 0.42, 0.16, 0.025, whiteLightMat,
    0, 0.56, 1.89
  );

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