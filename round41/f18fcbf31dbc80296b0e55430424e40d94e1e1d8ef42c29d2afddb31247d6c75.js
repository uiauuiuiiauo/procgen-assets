export default function generate(THREE) {
  const root = new THREE.Group();

  const length = 4.0;
  const width = 1.72;
  const wheelR = 0.47;
  const wheelY = 0.48;
  const frontAxleZ = 1.22;
  const rearAxleZ = -1.25;
  const bodyBottom = 0.38;
  const beltY = 1.30;
  const roofY = 1.80;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe9eaeb,
    metalness: 0.0,
    roughness: 0.3
  });
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x111212,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x526068,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.45,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide
  });
  const headlightGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffe5,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffffe5,
    emissiveIntensity: 1.0
  });
  const tailLightMat = new THREE.MeshStandardMaterial({
    color: 0xc51f35,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xc51f35,
    emissiveIntensity: 1.0
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.0,
    roughness: 0.95
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function makeTube(points, radius, material, segments) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points);
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments || 12, radius, 6, false),
      material
    );
  }

  const lower_bodyShape = new THREE.Shape();
  lower_bodyShape.moveTo(-1.90, bodyBottom);
  lower_bodyShape.lineTo(1.72, bodyBottom);
  lower_bodyShape.bezierCurveTo(1.91, 0.43, 1.98, 0.70, 1.84, 0.91);
  lower_bodyShape.bezierCurveTo(1.70, 1.10, 1.35, 1.22, 0.82, 1.28);
  lower_bodyShape.bezierCurveTo(0.48, 1.31, 0.20, 1.31, -0.08, 1.30);
  lower_bodyShape.lineTo(-1.34, 1.25);
  lower_bodyShape.bezierCurveTo(-1.68, 1.20, -1.90, 1.00, -1.96, 0.72);
  lower_bodyShape.bezierCurveTo(-1.99, 0.57, -1.96, 0.44, -1.90, bodyBottom);
  lower_bodyShape.closePath();

  const lower_bodyGeom = new THREE.ExtrudeGeometry(lower_bodyShape, {
    depth: width,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 3,
    curveSegments: 16
  });
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.rotation.y = Math.PI / 2;
  lower_body.position.x = -width / 2;
  root.add(lower_body);

  const upper_cabinShape = new THREE.Shape();
  upper_cabinShape.moveTo(-1.47, beltY - 0.03);
  upper_cabinShape.lineTo(1.02, beltY);
  upper_cabinShape.bezierCurveTo(0.94, 1.48, 0.73, 1.69, 0.45, 1.76);
  upper_cabinShape.bezierCurveTo(0.08, 1.83, -0.43, 1.82, -0.73, 1.72);
  upper_cabinShape.bezierCurveTo(-1.04, 1.61, -1.34, 1.42, -1.47, 1.27);
  upper_cabinShape.closePath();

  const upper_cabinGeom = new THREE.ExtrudeGeometry(upper_cabinShape, {
    depth: 1.52,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelSegments: 3,
    curveSegments: 16
  });
  const upper_cabin = new THREE.Mesh(upper_cabinGeom, bodyMat);
  upper_cabin.rotation.y = Math.PI / 2;
  upper_cabin.position.x = -0.76;
  root.add(upper_cabin);

  const roof_panelGeom = new THREE.SphereGeometry(1, 32, 12);
  const roof_panel = new THREE.Mesh(roof_panelGeom, bodyMat);
  roof_panel.position.set(0, 1.72, -0.17);
  roof_panel.scale.set(0.75, 0.105, 1.08);
  root.add(roof_panel);

  const hoodGeom = new THREE.BoxGeometry(1.48, 0.055, 1.08);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.position.set(0, 1.255, 1.25);
  hood.rotation.x = 0.075;
  root.add(hood);

  const front_bumperGeom = new THREE.SphereGeometry(1, 32, 16);
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyMat);
  front_bumper.position.set(0, 0.57, 1.80);
  front_bumper.scale.set(0.91, 0.32, 0.24);
  root.add(front_bumper);

  const rear_bumperGeom = new THREE.SphereGeometry(1, 24, 12);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, bodyMat);
  rear_bumper.position.set(0, 0.55, -1.73);
  rear_bumper.scale.set(0.84, 0.24, 0.18);
  root.add(rear_bumper);

  const side_skirtsGeom = new THREE.BoxGeometry(0.075, 0.13, 2.55);
  const side_skirts = new THREE.InstancedMesh(side_skirtsGeom, bodyMat, 2);
  setInstance(side_skirts, 0, -0.86, 0.43, -0.05, 0, 0, 0);
  setInstance(side_skirts, 1, 0.86, 0.43, -0.05, 0, 0, 0);
  side_skirts.instanceMatrix.needsUpdate = true;
  root.add(side_skirts);

  const front_seat_backsGeom = new THREE.BoxGeometry(0.42, 0.55, 0.17);
  const front_seat_backs = new THREE.InstancedMesh(front_seat_backsGeom, interiorMat, 2);
  setInstance(front_seat_backs, 0, -0.38, 1.34, -0.02, -0.08, 0, 0);
  setInstance(front_seat_backs, 1, 0.38, 1.34, -0.02, -0.08, 0, 0);
  front_seat_backs.instanceMatrix.needsUpdate = true;
  root.add(front_seat_backs);

  const front_headrestsGeom = new THREE.SphereGeometry(1, 16, 10);
  const front_headrests = new THREE.InstancedMesh(front_headrestsGeom, interiorMat, 2);
  setInstance(front_headrests, 0, -0.38, 1.66, -0.06, 0, 0, 0, 0.18, 0.18, 0.12);
  setInstance(front_headrests, 1, 0.38, 1.66, -0.06, 0, 0, 0, 0.18, 0.18, 0.12);
  front_headrests.instanceMatrix.needsUpdate = true;
  root.add(front_headrests);

  const rear_seatGeom = new THREE.BoxGeometry(1.18, 0.42, 0.18);
  const rear_seat = new THREE.Mesh(rear_seatGeom, interiorMat);
  rear_seat.position.set(0, 1.28, -0.93);
  rear_seat.rotation.x = -0.08;
  root.add(rear_seat);

  const dashboardGeom = new THREE.BoxGeometry(1.30, 0.13, 0.34);
  const dashboard = new THREE.Mesh(dashboardGeom, blackPlasticMat);
  dashboard.position.set(0, 1.25, 0.66);
  dashboard.rotation.x = 0.08;
  root.add(dashboard);

  const steering_wheelGeom = new THREE.TorusGeometry(0.16, 0.023, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, blackPlasticMat);
  steering_wheel.position.set(-0.38, 1.42, 0.53);
  steering_wheel.rotation.x = -0.18;
  root.add(steering_wheel);

  const windshield_borderGeom = new THREE.PlaneGeometry(1.50, 0.70);
  const windshield_border = new THREE.Mesh(windshield_borderGeom, blackPlasticMat);
  windshield_border.position.set(0, 1.51, 0.80);
  windshield_border.rotation.x = -0.68;
  root.add(windshield_border);

  const windshieldGeom = new THREE.PlaneGeometry(1.38, 0.60);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.position.set(0, 1.516, 0.813);
  windshield.rotation.x = -0.68;
  root.add(windshield);

  const rear_window_borderGeom = new THREE.PlaneGeometry(1.34, 0.61);
  const rear_window_border = new THREE.Mesh(rear_window_borderGeom, blackPlasticMat);
  rear_window_border.position.set(0, 1.49, -1.29);
  rear_window_border.rotation.x = 0.58;
  root.add(rear_window_border);

  const rear_windowGeom = new THREE.PlaneGeometry(1.23, 0.51);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.position.set(0, 1.49, -1.302);
  rear_window.rotation.x = 0.58;
  root.add(rear_window);

  const front_windowShape = new THREE.Shape();
  front_windowShape.moveTo(-0.18, 1.31);
  front_windowShape.lineTo(0.82, 1.31);
  front_windowShape.lineTo(0.43, 1.70);
  front_windowShape.bezierCurveTo(0.22, 1.76, 0.00, 1.77, -0.18, 1.74);
  front_windowShape.closePath();
  const front_windowsGeom = new THREE.ShapeGeometry(front_windowShape, 16);
  const front_windows = new THREE.InstancedMesh(front_windowsGeom, glassMat, 2);
  setInstance(front_windows, 0, -0.808, 0, 0, 0, Math.PI / 2, 0);
  setInstance(front_windows, 1, 0.808, 0, 0, 0, Math.PI / 2, 0);
  front_windows.instanceMatrix.needsUpdate = true;
  root.add(front_windows);

  const rear_windowShape = new THREE.Shape();
  rear_windowShape.moveTo(-1.34, 1.30);
  rear_windowShape.lineTo(-0.29, 1.31);
  rear_windowShape.lineTo(-0.27, 1.73);
  rear_windowShape.lineTo(-0.70, 1.70);
  rear_windowShape.bezierCurveTo(-0.98, 1.61, -1.22, 1.45, -1.34, 1.30);
  rear_windowShape.closePath();
  const rear_side_windowsGeom = new THREE.ShapeGeometry(rear_windowShape, 16);
  const rear_side_windows = new THREE.InstancedMesh(rear_side_windowsGeom, glassMat, 2);
  setInstance(rear_side_windows, 0, -0.808, 0, 0, 0, Math.PI / 2, 0);
  setInstance(rear_side_windows, 1, 0.808, 0, 0, 0, Math.PI / 2, 0);
  rear_side_windows.instanceMatrix.needsUpdate = true;
  root.add(rear_side_windows);

  const left_front_window_trim = makeTube([
    new THREE.Vector3(-0.817, 1.31, -0.18),
    new THREE.Vector3(-0.817, 1.31, 0.82),
    new THREE.Vector3(-0.817, 1.70, 0.43),
    new THREE.Vector3(-0.817, 1.74, -0.18)
  ], 0.014, blackPlasticMat, 20);
  root.add(left_front_window_trim);

  const right_front_window_trim = makeTube([
    new THREE.Vector3(0.817, 1.31, -0.18),
    new THREE.Vector3(0.817, 1.31, 0.82),
    new THREE.Vector3(0.817, 1.70, 0.43),
    new THREE.Vector3(0.817, 1.74, -0.18)
  ], 0.014, blackPlasticMat, 20);
  root.add(right_front_window_trim);

  const left_rear_window_trim = makeTube([
    new THREE.Vector3(-0.817, 1.30, -1.34),
    new THREE.Vector3(-0.817, 1.31, -0.29),
    new THREE.Vector3(-0.817, 1.73, -0.27),
    new THREE.Vector3(-0.817, 1.70, -0.70),
    new THREE.Vector3(-0.817, 1.30, -1.34)
  ], 0.014, blackPlasticMat, 24);
  root.add(left_rear_window_trim);

  const right_rear_window_trim = makeTube([
    new THREE.Vector3(0.817, 1.30, -1.34),
    new THREE.Vector3(0.817, 1.31, -0.29),
    new THREE.Vector3(0.817, 1.73, -0.27),
    new THREE.Vector3(0.817, 1.70, -0.70),
    new THREE.Vector3(0.817, 1.30, -1.34)
  ], 0.014, blackPlasticMat, 24);
  root.add(right_rear_window_trim);

  const b_pillarsGeom = new THREE.BoxGeometry(0.035, 0.47, 0.075);
  const b_pillars = new THREE.InstancedMesh(b_pillarsGeom, blackPlasticMat, 2);
  setInstance(b_pillars, 0, -0.824, 1.51, -0.235, 0, 0, 0);
  setInstance(b_pillars, 1, 0.824, 1.51, -0.235, 0, 0, 0);
  b_pillars.instanceMatrix.needsUpdate = true;
  root.add(b_pillars);

  const left_wiper = makeTube([
    new THREE.Vector3(-0.60, 1.285, 1.015),
    new THREE.Vector3(-0.08, 1.35, 0.955)
  ], 0.014, blackPlasticMat, 4);
  root.add(left_wiper);

  const right_wiper = makeTube([
    new THREE.Vector3(0.57, 1.285, 1.015),
    new THREE.Vector3(0.04, 1.35, 0.955)
  ], 0.014, blackPlasticMat, 4);
  root.add(right_wiper);

  const upper_grilleGeom = new THREE.SphereGeometry(1, 32, 16);
  const upper_grille = new THREE.Mesh(upper_grilleGeom, chromeMat);
  upper_grille.position.set(0, 0.94, 1.985);
  upper_grille.scale.set(0.67, 0.285, 0.065);
  root.add(upper_grille);

  const upper_grille_insetGeom = new THREE.SphereGeometry(1, 32, 16);
  const upper_grille_inset = new THREE.Mesh(upper_grille_insetGeom, blackPlasticMat);
  upper_grille_inset.position.set(0, 0.94, 2.025);
  upper_grille_inset.scale.set(0.61, 0.235, 0.055);
  root.add(upper_grille_inset);

  const upper_grille_slatsGeom = new THREE.BoxGeometry(1.08, 0.026, 0.025);
  const upper_grille_slats = new THREE.InstancedMesh(upper_grille_slatsGeom, chromeMat, 5);
  for (let i = 0; i < 5; i++) {
    setInstance(upper_grille_slats, i, 0, 0.80 + i * 0.07, 2.086, 0, 0, 0, 1 - Math.abs(i - 2) * 0.04, 1, 1);
  }
  upper_grille_slats.instanceMatrix.needsUpdate = true;
  root.add(upper_grille_slats);

  const grille_badgeGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.045, 24);
  const grille_badge = new THREE.Mesh(grille_badgeGeom, chromeMat);
  grille_badge.position.set(0, 0.94, 2.115);
  grille_badge.rotation.x = Math.PI / 2;
  root.add(grille_badge);

  const grille_badge_insetGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.052, 24);
  const grille_badge_inset = new THREE.Mesh(grille_badge_insetGeom, blackPlasticMat);
  grille_badge_inset.position.set(0, 0.94, 2.139);
  grille_badge_inset.rotation.x = Math.PI / 2;
  root.add(grille_badge_inset);

  const lower_grilleGeom = new THREE.BoxGeometry(1.16, 0.25, 0.045);
  const lower_grille = new THREE.Mesh(lower_grilleGeom, blackPlasticMat);
  lower_grille.position.set(0, 0.47, 2.025);
  root.add(lower_grille);

  const lower_grille_slatsGeom = new THREE.BoxGeometry(1.08, 0.018, 0.024);
  const lower_grille_slats = new THREE.InstancedMesh(lower_grille_slatsGeom, silverMat, 4);
  for (let i = 0; i < 4; i++) {
    setInstance(lower_grille_slats, i, 0, 0.385 + i * 0.055, 2.055, 0, 0, 0);
  }
  lower_grille_slats.instanceMatrix.needsUpdate = true;
  root.add(lower_grille_slats);

  const front_license_plateGeom = new THREE.BoxGeometry(0.56, 0.14, 0.025);
  const front_license_plate = new THREE.Mesh(front_license_plateGeom, silverMat);
  front_license_plate.position.set(0, 0.47, 2.082);
  root.add(front_license_plate);

  const headlightShape = new THREE.Shape();
  headlightShape.moveTo(-0.30, -0.10);
  headlightShape.bezierCurveTo(-0.18, -0.17, 0.15, -0.16, 0.30, -0.035);
  headlightShape.bezierCurveTo(0.25, 0.12, 0.03, 0.18, -0.20, 0.145);
  headlightShape.bezierCurveTo(-0.28, 0.09, -0.32, -0.01, -0.30, -0.10);
  headlightShape.closePath();

  const headlight_housingsGeom = new THREE.ShapeGeometry(headlightShape, 20);
  const headlight_housings = new THREE.InstancedMesh(headlight_housingsGeom, blackPlasticMat, 2);
  setInstance(headlight_housings, 0, -0.64, 1.075, 2.012, 0, 0, -0.12, 1.12, 1.12, 1);
  setInstance(headlight_housings, 1, 0.64, 1.075, 2.012, 0, 0, 0.12, 1.12, 1.12, 1);
  headlight_housings.instanceMatrix.needsUpdate = true;
  root.add(headlight_housings);

  const headlight_lensesGeom = new THREE.ShapeGeometry(headlightShape, 20);
  const headlight_lenses = new THREE.InstancedMesh(headlight_lensesGeom, headlightGlassMat, 2);
  setInstance(headlight_lenses, 0, -0.64, 1.075, 2.038, 0, 0, -0.12, 0.98, 0.98, 1);
  setInstance(headlight_lenses, 1, 0.64, 1.075, 2.038, 0, 0, 0.12, 0.98, 0.98, 1);
  headlight_lenses.instanceMatrix.needsUpdate = true;
  root.add(headlight_lenses);

  const headlight_ringsGeom = new THREE.TorusGeometry(0.105, 0.018, 8, 24);
  const headlight_rings = new THREE.InstancedMesh(headlight_ringsGeom, chromeMat, 2);
  setInstance(headlight_rings, 0, -0.69, 1.075, 2.071, 0, 0, -0.10);
  setInstance(headlight_rings, 1, 0.69, 1.075, 2.071, 0, 0, 0.10);
  headlight_rings.instanceMatrix.needsUpdate = true;
  root.add(headlight_rings);

  const headlight_bulbsGeom = new THREE.CircleGeometry(0.074, 24);
  const headlight_bulbs = new THREE.InstancedMesh(headlight_bulbsGeom, headlightMat, 2);
  setInstance(headlight_bulbs, 0, -0.69, 1.075, 2.078, 0, 0, 0);
  setInstance(headlight_bulbs, 1, 0.69, 1.075, 2.078, 0, 0, 0);
  headlight_bulbs.instanceMatrix.needsUpdate = true;
  root.add(headlight_bulbs);

  const fog_light_housingsGeom = new THREE.SphereGeometry(1, 20, 12);
  const fog_light_housings = new THREE.InstancedMesh(fog_light_housingsGeom, blackPlasticMat, 2);
  setInstance(fog_light_housings, 0, -0.67, 0.53, 2.025, 0, 0, 0, 0.22, 0.13, 0.055);
  setInstance(fog_light_housings, 1, 0.67, 0.53, 2.025, 0, 0, 0, 0.22, 0.13, 0.055);
  fog_light_housings.instanceMatrix.needsUpdate = true;
  root.add(fog_light_housings);

  const fog_light_ringsGeom = new THREE.TorusGeometry(0.075, 0.014, 8, 20);
  const fog_light_rings = new THREE.InstancedMesh(fog_light_ringsGeom, chromeMat, 2);
  setInstance(fog_light_rings, 0, -0.67, 0.53, 2.083, 0, 0, 0);
  setInstance(fog_light_rings, 1, 0.67, 0.53, 2.083, 0, 0, 0);
  fog_light_rings.instanceMatrix.needsUpdate = true;
  root.add(fog_light_rings);

  const fog_light_bulbsGeom = new THREE.CircleGeometry(0.052, 20);
  const fog_light_bulbs = new THREE.InstancedMesh(fog_light_bulbsGeom, headlightMat, 2);
  setInstance(fog_light_bulbs, 0, -0.67, 0.53, 2.092, 0, 0, 0);
  setInstance(fog_light_bulbs, 1, 0.67, 0.53, 2.092, 0, 0, 0);
  fog_light_bulbs.instanceMatrix.needsUpdate = true;
  root.add(fog_light_bulbs);

  const hood_badgeGeom = new THREE.CircleGeometry(0.055, 20);
  const hood_badge = new THREE.Mesh(hood_badgeGeom, chromeMat);
  hood_badge.position.set(0, 1.325, 1.47);
  hood_badge.rotation.x = -Math.PI / 2;
  hood_badge.scale.set(1.25, 0.75, 1);
  root.add(hood_badge);

  const door_handlesGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.22, 14);
  const door_handles = new THREE.InstancedMesh(door_handlesGeom, silverMat, 2);
  setInstance(door_handles, 0, -0.918, 1.13, -0.34, Math.PI / 2, 0, 0);
  setInstance(door_handles, 1, 0.918, 1.13, -0.34, Math.PI / 2, 0, 0);
  door_handles.instanceMatrix.needsUpdate = true;
  root.add(door_handles);

  const left_door_seam = makeTube([
    new THREE.Vector3(-0.914, 0.48, -0.27),
    new THREE.Vector3(-0.914, 1.28, -0.27),
    new THREE.Vector3(-0.914, 1.30, 0.74),
    new THREE.Vector3(-0.914, 0.52, 0.82)
  ], 0.007, blackPlasticMat, 20);
  root.add(left_door_seam);

  const right_door_seam = makeTube([
    new THREE.Vector3(0.914, 0.48, -0.27),
    new THREE.Vector3(0.914, 1.28, -0.27),
    new THREE.Vector3(0.914, 1.30, 0.74),
    new THREE.Vector3(0.914, 0.52, 0.82)
  ], 0.007, blackPlasticMat, 20);
  root.add(right_door_seam);

  const side_indicatorsGeom = new THREE.BoxGeometry(0.025, 0.045, 0.13);
  const side_indicators = new THREE.InstancedMesh(side_indicatorsGeom, chromeMat, 2);
  setInstance(side_indicators, 0, -0.925, 1.12, 0.73, 0, 0, 0);
  setInstance(side_indicators, 1, 0.925, 1.12, 0.73, 0, 0, 0);
  side_indicators.instanceMatrix.needsUpdate = true;
  root.add(side_indicators);

  const mirror_capsGeom = new THREE.SphereGeometry(1, 24, 12);
  const mirror_caps = new THREE.InstancedMesh(mirror_capsGeom, bodyMat, 2);
  setInstance(mirror_caps, 0, -1.00, 1.40, 0.55, 0, 0, 0, 0.22, 0.10, 0.16);
  setInstance(mirror_caps, 1, 1.00, 1.40, 0.55, 0, 0, 0, 0.22, 0.10, 0.16);
  mirror_caps.instanceMatrix.needsUpdate = true;
  root.add(mirror_caps);

  const mirror_basesGeom = new THREE.SphereGeometry(1, 20, 10);
  const mirror_bases = new THREE.InstancedMesh(mirror_basesGeom, blackPlasticMat, 2);
  setInstance(mirror_bases, 0, -0.99, 1.34, 0.54, 0, 0, 0, 0.21, 0.075, 0.17);
  setInstance(mirror_bases, 1, 0.99, 1.34, 0.54, 0, 0, 0, 0.21, 0.075, 0.17);
  mirror_bases.instanceMatrix.needsUpdate = true;
  root.add(mirror_bases);

  const left_mirror_stem = makeTube([
    new THREE.Vector3(-0.79, 1.34, 0.52),
    new THREE.Vector3(-0.96, 1.35, 0.54)
  ], 0.035, blackPlasticMat, 4);
  root.add(left_mirror_stem);

  const right_mirror_stem = makeTube([
    new THREE.Vector3(0.79, 1.34, 0.52),
    new THREE.Vector3(0.96, 1.35, 0.54)
  ], 0.035, blackPlasticMat, 4);
  root.add(right_mirror_stem);

  const mirror_glassGeom = new THREE.CircleGeometry(1, 20);
  const mirror_glass = new THREE.InstancedMesh(mirror_glassGeom, glassMat, 2);
  setInstance(mirror_glass, 0, -1.195, 1.405, 0.55, 0, Math.PI / 2, 0, 0.13, 0.07, 1);
  setInstance(mirror_glass, 1, 1.195, 1.405, 0.55, 0, Math.PI / 2, 0, 0.13, 0.07, 1);
  mirror_glass.instanceMatrix.needsUpdate = true;
  root.add(mirror_glass);

  const wheelPositions = [
    [-0.88, wheelY, frontAxleZ],
    [0.88, wheelY, frontAxleZ],
    [-0.88, wheelY, rearAxleZ],
    [0.88, wheelY, rearAxleZ]
  ];

  const tiresGeom = new THREE.TorusGeometry(0.35, 0.12, 12, 32);
  const tires = new THREE.InstancedMesh(tiresGeom, tireMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    setInstance(tires, i, p[0], p[1], p[2], 0, Math.PI / 2, 0);
  }
  tires.instanceMatrix.needsUpdate = true;
  root.add(tires);

  const wheel_archesGeom = new THREE.TorusGeometry(0.49, 0.055, 8, 28, Math.PI);
  const wheel_arches = new THREE.InstancedMesh(wheel_archesGeom, bodyMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    setInstance(wheel_arches, i, p[0] < 0 ? -0.925 : 0.925, p[1], p[2], 0, Math.PI / 2, 0);
  }
  wheel_arches.instanceMatrix.needsUpdate = true;
  root.add(wheel_arches);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.075, 28);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, blackPlasticMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    setInstance(wheel_hubs, i, side * 0.985, p[1], p[2], 0, 0, Math.PI / 2);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const wheel_rim_ringsGeom = new THREE.TorusGeometry(0.255, 0.025, 8, 28);
  const wheel_rim_rings = new THREE.InstancedMesh(wheel_rim_ringsGeom, silverMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    setInstance(wheel_rim_rings, i, side * 1.025, p[1], p[2], 0, Math.PI / 2, 0);
  }
  wheel_rim_rings.instanceMatrix.needsUpdate = true;
  root.add(wheel_rim_rings);

  const wheel_spokesGeom = new THREE.BoxGeometry(0.025, 0.245, 0.035);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokesGeom, silverMat, 40);
  let spokeIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const p = wheelPositions[w];
    const side = p[0] < 0 ? -1 : 1;
    for (let i = 0; i < 10; i++) {
      const angle = i / 10 * Math.PI * 2;
      setInstance(
        wheel_spokes,
        spokeIndex++,
        side * 1.035,
        p[1] + Math.cos(angle) * 0.145,
        p[2] + Math.sin(angle) * 0.145,
        angle,
        0,
        0
      );
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_center_capsGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 20);
  const wheel_center_caps = new THREE.InstancedMesh(wheel_center_capsGeom, chromeMat, 4);
  for (let i = 0; i < wheelPositions.length; i++) {
    const p = wheelPositions[i];
    const side = p[0] < 0 ? -1 : 1;
    setInstance(wheel_center_caps, i, side * 1.055, p[1], p[2], 0, 0, Math.PI / 2);
  }
  wheel_center_caps.instanceMatrix.needsUpdate = true;
  root.add(wheel_center_caps);

  const tail_lightsGeom = new THREE.SphereGeometry(1, 20, 12);
  const tail_lights = new THREE.InstancedMesh(tail_lightsGeom, tailLightMat, 2);
  setInstance(tail_lights, 0, -0.78, 1.14, -1.80, 0, 0, -0.18, 0.13, 0.27, 0.085);
  setInstance(tail_lights, 1, 0.78, 1.14, -1.80, 0, 0, 0.18, 0.13, 0.27, 0.085);
  tail_lights.instanceMatrix.needsUpdate = true;
  root.add(tail_lights);

  const fuel_doorGeom = new THREE.TorusGeometry(0.105, 0.008, 6, 24);
  const fuel_door = new THREE.Mesh(fuel_doorGeom, blackPlasticMat);
  fuel_door.position.set(0.922, 1.05, -1.34);
  fuel_door.rotation.y = Math.PI / 2;
  root.add(fuel_door);

  const roof_antenna = makeTube([
    new THREE.Vector3(0, roofY + 0.01, -0.56),
    new THREE.Vector3(0, 2.08, -0.73)
  ], 0.015, blackPlasticMat, 4);
  root.add(roof_antenna);

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