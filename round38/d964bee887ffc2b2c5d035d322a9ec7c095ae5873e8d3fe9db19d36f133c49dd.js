export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cream_extended_cab_pickup";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const cabin_group = new THREE.Group();
  cabin_group.name = "cabin_group";
  const bed_group = new THREE.Group();
  bed_group.name = "bed_group";
  const undercarriage_group = new THREE.Group();
  undercarriage_group.name = "undercarriage_group";
  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  const front_group = new THREE.Group();
  front_group.name = "front_group";
  const rear_group = new THREE.Group();
  rear_group.name = "rear_group";
  root.add(body_group, cabin_group, bed_group, undercarriage_group, wheel_group, front_group, rear_group);

  const length = 6.10;
  const bodyW = 1.82;
  const cabW = 1.78;
  const wheelR = 0.50;
  const wheelCY = 0.50;
  const wheelWellR = 0.60;
  const wheelX = 0.91;
  const frontAxleZ = 1.86;
  const rearAxleZ = -1.86;
  const frontZ = 3.05;
  const rearZ = -3.03;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8ce,
    metalness: 0.0,
    roughness: 0.3
  });
  const bodyInsetMat = new THREE.MeshStandardMaterial({
    color: 0xc9c9bf,
    metalness: 0.0,
    roughness: 0.3
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111213,
    metalness: 0.0,
    roughness: 0.8
  });
  const bedLinerMat = new THREE.MeshStandardMaterial({
    color: 0x202324,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x687579,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.45,
    ior: 1.5,
    transparent: true,
    opacity: 0.78
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xf4f0d6,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xf4f0d6,
    emissiveIntensity: 0.35
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xe88918,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe88918,
    emissiveIntensity: 0.45
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb51627,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xb51627,
    emissiveIntensity: 0.45
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xe3e1d7,
    metalness: 0.0,
    roughness: 0.7
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx, ry, rz);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function makeProfileGeometry(points, width, bevelSize) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: width,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelThickness: bevelSize,
      bevelSize: bevelSize,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -width / 2);
    return geometry;
  }

  function makeRoundedRectGeometry(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 12);
  }

  const main_body_profile = [
    [-3.03, 0.42],
    [-2.50, 0.42],
    [-2.46, 0.57],
    [-2.39, 0.82],
    [-2.25, 1.06],
    [-2.05, 1.20],
    [-1.86, 1.25],
    [-1.66, 1.20],
    [-1.46, 1.06],
    [-1.31, 0.82],
    [-1.24, 0.57],
    [-1.20, 0.42],
    [1.24, 0.42],
    [1.29, 0.58],
    [1.36, 0.84],
    [1.48, 1.10],
    [1.68, 1.24],
    [1.86, 1.29],
    [2.07, 1.24],
    [2.28, 1.10],
    [2.42, 0.84],
    [2.50, 0.58],
    [2.55, 0.42],
    [2.96, 0.43],
    [3.05, 0.55],
    [3.05, 1.34],
    [2.84, 1.48],
    [1.56, 1.54],
    [1.34, 1.45],
    [-1.20, 1.43],
    [-3.03, 1.39]
  ];
  const main_bodyGeom = makeProfileGeometry(main_body_profile, bodyW, 0.025);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.rotation.y = -Math.PI / 2;
  body_group.add(main_body);

  const cabin_shell_profile = [
    [-1.18, 1.34],
    [1.52, 1.34],
    [1.50, 1.55],
    [1.38, 1.78],
    [1.18, 2.04],
    [0.92, 2.28],
    [0.62, 2.40],
    [-0.98, 2.40],
    [-1.14, 2.34],
    [-1.20, 2.20]
  ];
  const cabin_shellGeom = makeProfileGeometry(cabin_shell_profile, cabW, 0.025);
  const cabin_shell = new THREE.Mesh(cabin_shellGeom, bodyMat);
  cabin_shell.name = "cabin_shell";
  cabin_shell.rotation.y = -Math.PI / 2;
  cabin_group.add(cabin_shell);

  const hoodGeom = new THREE.BoxGeometry(1.72, 0.075, 1.52);
  const hood = new THREE.Mesh(hoodGeom, bodyMat);
  hood.name = "hood";
  hood.position.set(0, 1.49, 2.20);
  hood.rotation.x = 0.035;
  body_group.add(hood);

  const hood_front_roundingGeom = new THREE.CylinderGeometry(0.055, 0.055, 1.68, 16);
  const hood_front_rounding = new THREE.Mesh(hood_front_roundingGeom, bodyMat);
  hood_front_rounding.name = "hood_front_rounding";
  hood_front_rounding.rotation.z = Math.PI / 2;
  hood_front_rounding.position.set(0, 1.47, 2.96);
  body_group.add(hood_front_rounding);

  const roof_panelGeom = new THREE.BoxGeometry(1.84, 0.09, 2.14);
  const roof_panel = new THREE.Mesh(roof_panelGeom, bodyMat);
  roof_panel.name = "roof_panel";
  roof_panel.position.set(0, 2.43, -0.02);
  cabin_group.add(roof_panel);

  const roof_edge_railsGeom = new THREE.CylinderGeometry(0.052, 0.052, 2.12, 14);
  const roof_edge_rails = new THREE.InstancedMesh(roof_edge_railsGeom, bodyMat, 2);
  roof_edge_rails.name = "roof_edge_rails";
  setInstance(roof_edge_rails, 0, -0.89, 2.41, -0.02, Math.PI / 2, 0, 0, 1, 1, 1);
  setInstance(roof_edge_rails, 1, 0.89, 2.41, -0.02, Math.PI / 2, 0, 0, 1, 1, 1);
  roof_edge_rails.instanceMatrix.needsUpdate = true;
  cabin_group.add(roof_edge_rails);

  const roof_front_roundingGeom = new THREE.CylinderGeometry(0.055, 0.055, 1.80, 16);
  const roof_front_rounding = new THREE.Mesh(roof_front_roundingGeom, bodyMat);
  roof_front_rounding.name = "roof_front_rounding";
  roof_front_rounding.rotation.z = Math.PI / 2;
  roof_front_rounding.position.set(0, 2.40, 1.04);
  cabin_group.add(roof_front_rounding);

  const windshieldAngle = -0.66;
  const windshield_borderGeom = new THREE.BoxGeometry(1.66, 0.91, 0.045);
  const windshield_border = new THREE.Mesh(windshield_borderGeom, trimMat);
  windshield_border.name = "windshield_border";
  windshield_border.position.set(0, 1.94, 1.27);
  windshield_border.rotation.x = windshieldAngle;
  cabin_group.add(windshield_border);

  const windshieldGeom = new THREE.BoxGeometry(1.54, 0.80, 0.025);
  const windshield = new THREE.Mesh(windshieldGeom, glassMat);
  windshield.name = "windshield";
  windshield.position.set(0, 1.953, 1.292);
  windshield.rotation.x = windshieldAngle;
  cabin_group.add(windshield);

  const windshield_wipersGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.56, 8);
  const windshield_wipers = new THREE.InstancedMesh(windshield_wipersGeom, trimMat, 2);
  windshield_wipers.name = "windshield_wipers";
  setInstance(windshield_wipers, 0, -0.34, 1.69, 1.54, windshieldAngle, 0, -0.50, 1, 1, 1);
  setInstance(windshield_wipers, 1, 0.34, 1.69, 1.54, windshieldAngle, 0, 0.50, 1, 1, 1);
  windshield_wipers.instanceMatrix.needsUpdate = true;
  cabin_group.add(windshield_wipers);

  const front_side_window_borderGeom = makeRoundedRectGeometry(0.94, 0.70, 0.11);
  const front_side_window_borders = new THREE.InstancedMesh(front_side_window_borderGeom, trimMat, 2);
  front_side_window_borders.name = "front_side_window_borders";
  setInstance(front_side_window_borders, 0, -0.916, 1.92, 0.48, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(front_side_window_borders, 1, 0.916, 1.92, 0.48, 0, Math.PI / 2, 0, 1, 1, 1);
  front_side_window_borders.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_side_window_borders);

  const front_side_windowGeom = makeRoundedRectGeometry(0.82, 0.58, 0.085);
  const front_side_windows = new THREE.InstancedMesh(front_side_windowGeom, glassMat, 2);
  front_side_windows.name = "front_side_windows";
  setInstance(front_side_windows, 0, -0.922, 1.92, 0.48, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(front_side_windows, 1, 0.922, 1.92, 0.48, 0, Math.PI / 2, 0, 1, 1, 1);
  front_side_windows.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_side_windows);

  const rear_side_window_borderGeom = makeRoundedRectGeometry(0.64, 0.69, 0.11);
  const rear_side_window_borders = new THREE.InstancedMesh(rear_side_window_borderGeom, trimMat, 2);
  rear_side_window_borders.name = "rear_side_window_borders";
  setInstance(rear_side_window_borders, 0, -0.916, 1.92, -0.47, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(rear_side_window_borders, 1, 0.916, 1.92, -0.47, 0, Math.PI / 2, 0, 1, 1, 1);
  rear_side_window_borders.instanceMatrix.needsUpdate = true;
  cabin_group.add(rear_side_window_borders);

  const rear_side_windowGeom = makeRoundedRectGeometry(0.52, 0.57, 0.08);
  const rear_side_windows = new THREE.InstancedMesh(rear_side_windowGeom, glassMat, 2);
  rear_side_windows.name = "rear_side_windows";
  setInstance(rear_side_windows, 0, -0.922, 1.92, -0.47, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(rear_side_windows, 1, 0.922, 1.92, -0.47, 0, Math.PI / 2, 0, 1, 1, 1);
  rear_side_windows.instanceMatrix.needsUpdate = true;
  cabin_group.add(rear_side_windows);

  const rear_cab_window_borderGeom = new THREE.BoxGeometry(1.48, 0.65, 0.035);
  const rear_cab_window_border = new THREE.Mesh(rear_cab_window_borderGeom, trimMat);
  rear_cab_window_border.name = "rear_cab_window_border";
  rear_cab_window_border.position.set(0, 1.93, -1.205);
  cabin_group.add(rear_cab_window_border);

  const rear_cab_windowGeom = new THREE.BoxGeometry(1.36, 0.53, 0.025);
  const rear_cab_window = new THREE.Mesh(rear_cab_windowGeom, glassMat);
  rear_cab_window.name = "rear_cab_window";
  rear_cab_window.position.set(0, 1.93, -1.226);
  cabin_group.add(rear_cab_window);

  const front_doorsGeom = new THREE.BoxGeometry(0.018, 0.80, 1.00);
  const front_doors = new THREE.InstancedMesh(front_doorsGeom, bodyInsetMat, 2);
  front_doors.name = "front_doors";
  setInstance(front_doors, 0, -0.925, 1.04, 0.49, 0, 0, 0, 1, 1, 1);
  setInstance(front_doors, 1, 0.925, 1.04, 0.49, 0, 0, 0, 1, 1, 1);
  front_doors.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_doors);

  const rear_doorsGeom = new THREE.BoxGeometry(0.018, 0.80, 0.68);
  const rear_doors = new THREE.InstancedMesh(rear_doorsGeom, bodyInsetMat, 2);
  rear_doors.name = "rear_doors";
  setInstance(rear_doors, 0, -0.925, 1.04, -0.49, 0, 0, 0, 1, 1, 1);
  setInstance(rear_doors, 1, 0.925, 1.04, -0.49, 0, 0, 0, 1, 1, 1);
  rear_doors.instanceMatrix.needsUpdate = true;
  cabin_group.add(rear_doors);

  const door_seams_verticalGeom = new THREE.BoxGeometry(0.024, 0.84, 0.018);
  const door_seams_vertical = new THREE.InstancedMesh(door_seams_verticalGeom, trimMat, 4);
  door_seams_vertical.name = "door_seams_vertical";
  let instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.84, 0.0]) {
      setInstance(door_seams_vertical, instanceIndex++, side * 0.938, 1.04, z, 0, 0, 0, 1, 1, 1);
    }
  }
  door_seams_vertical.instanceMatrix.needsUpdate = true;
  cabin_group.add(door_seams_vertical);

  const door_seams_bottomGeom = new THREE.BoxGeometry(0.024, 0.018, 1.68);
  const door_seams_bottom = new THREE.InstancedMesh(door_seams_bottomGeom, trimMat, 2);
  door_seams_bottom.name = "door_seams_bottom";
  setInstance(door_seams_bottom, 0, -0.938, 0.63, -0.18, 0, 0, 0, 1, 1, 1);
  setInstance(door_seams_bottom, 1, 0.938, 0.63, -0.18, 0, 0, 0, 1, 1, 1);
  door_seams_bottom.instanceMatrix.needsUpdate = true;
  cabin_group.add(door_seams_bottom);

  const front_door_rear_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.80, 8);
  const front_door_rear_seams = new THREE.InstancedMesh(front_door_rear_seamsGeom, trimMat, 2);
  front_door_rear_seams.name = "front_door_rear_seams";
  setInstance(front_door_rear_seams, 0, -0.944, 1.04, 0.0, 0, 0, 0, 1, 1, 1);
  setInstance(front_door_rear_seams, 1, 0.944, 1.04, 0.0, 0, 0, 0, 1, 1, 1);
  front_door_rear_seams.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_door_rear_seams);

  const front_door_leading_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.80, 8);
  const front_door_leading_seams = new THREE.InstancedMesh(front_door_leading_seamsGeom, trimMat, 2);
  front_door_leading_seams.name = "front_door_leading_seams";
  setInstance(front_door_leading_seams, 0, -0.944, 1.04, 0.99, 0, 0, 0, 1, 1, 1);
  setInstance(front_door_leading_seams, 1, 0.944, 1.04, 0.99, 0, 0, 0, 1, 1, 1);
  front_door_leading_seams.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_door_leading_seams);

  const rear_door_seamsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.80, 8);
  const rear_door_seams = new THREE.InstancedMesh(rear_door_seamsGeom, trimMat, 2);
  rear_door_seams.name = "rear_door_seams";
  setInstance(rear_door_seams, 0, -0.944, 1.04, -0.84, 0, 0, 0, 1, 1, 1);
  setInstance(rear_door_seams, 1, 0.944, 1.04, -0.84, 0, 0, 0, 1, 1, 1);
  rear_door_seams.instanceMatrix.needsUpdate = true;
  cabin_group.add(rear_door_seams);

  const door_handlesGeom = new THREE.BoxGeometry(0.055, 0.045, 0.22);
  const door_handles = new THREE.InstancedMesh(door_handlesGeom, trimMat, 4);
  door_handles.name = "door_handles";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.02, -0.66]) {
      setInstance(door_handles, instanceIndex++, side * 0.966, 1.39, z, 0, 0, 0, 1, 1, 1);
    }
  }
  door_handles.instanceMatrix.needsUpdate = true;
  cabin_group.add(door_handles);

  const door_locksGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.025, 12);
  const door_locks = new THREE.InstancedMesh(door_locksGeom, trimMat, 4);
  door_locks.name = "door_locks";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.10, -0.58]) {
      setInstance(door_locks, instanceIndex++, side * 0.968, 1.24, z, 0, 0, Math.PI / 2, 1, 1, 1);
    }
  }
  door_locks.instanceMatrix.needsUpdate = true;
  cabin_group.add(door_locks);

  const door_hingesGeom = new THREE.BoxGeometry(0.045, 0.12, 0.055);
  const door_hinges = new THREE.InstancedMesh(door_hingesGeom, bodyInsetMat, 8);
  door_hinges.name = "door_hinges";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.98, -0.82]) {
      for (const y of [0.82, 1.27]) {
        setInstance(door_hinges, instanceIndex++, side * 0.958, y, z, 0, 0, 0, 1, 1, 1);
      }
    }
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  cabin_group.add(door_hinges);

  const side_moldingGeom = new THREE.BoxGeometry(0.026, 0.035, 2.65);
  const side_molding = new THREE.InstancedMesh(side_moldingGeom, bodyInsetMat, 2);
  side_molding.name = "side_molding";
  setInstance(side_molding, 0, -0.946, 1.28, 0.16, 0, 0, 0, 1, 1, 1);
  setInstance(side_molding, 1, 0.946, 1.28, 0.16, 0, 0, 0, 1, 1, 1);
  side_molding.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_molding);

  const side_badgesGeom = new THREE.BoxGeometry(0.025, 0.075, 0.30);
  const side_badges = new THREE.InstancedMesh(side_badgesGeom, darkMetalMat, 2);
  side_badges.name = "side_badges";
  setInstance(side_badges, 0, -0.952, 1.35, 1.42, 0, 0, 0, 1, 1, 1);
  setInstance(side_badges, 1, 0.952, 1.35, 1.42, 0, 0, 0, 1, 1, 1);
  side_badges.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_badges);

  const mirror_stemsGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.20, 10);
  const mirror_stems = new THREE.InstancedMesh(mirror_stemsGeom, trimMat, 2);
  mirror_stems.name = "mirror_stems";
  setInstance(mirror_stems, 0, -0.98, 1.66, 1.02, 0, 0, Math.PI / 2, 1, 1, 1);
  setInstance(mirror_stems, 1, 0.98, 1.66, 1.02, 0, 0, Math.PI / 2, 1, 1, 1);
  mirror_stems.instanceMatrix.needsUpdate = true;
  cabin_group.add(mirror_stems);

  const side_mirrorsGeom = new THREE.SphereGeometry(1, 18, 12);
  const side_mirrors = new THREE.InstancedMesh(side_mirrorsGeom, trimMat, 2);
  side_mirrors.name = "side_mirrors";
  setInstance(side_mirrors, 0, -1.09, 1.72, 1.02, 0, 0, 0, 0.11, 0.18, 0.15);
  setInstance(side_mirrors, 1, 1.09, 1.72, 1.02, 0, 0, 0, 0.11, 0.18, 0.15);
  side_mirrors.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_mirrors);

  const mirror_glassGeom = new THREE.CylinderGeometry(0.10, 0.10, 0.012, 18);
  const mirror_glass = new THREE.InstancedMesh(mirror_glassGeom, glassMat, 2);
  mirror_glass.name = "mirror_glass";
  setInstance(mirror_glass, 0, -1.185, 1.72, 1.02, 0, 0, Math.PI / 2, 1, 1.45, 1);
  setInstance(mirror_glass, 1, 1.185, 1.72, 1.02, 0, 0, Math.PI / 2, 1, 1.45, 1);
  mirror_glass.instanceMatrix.needsUpdate = true;
  cabin_group.add(mirror_glass);

  const roof_marker_lightsGeom = new THREE.SphereGeometry(0.07, 14, 8);
  const roof_marker_lights = new THREE.InstancedMesh(roof_marker_lightsGeom, amberMat, 5);
  roof_marker_lights.name = "roof_marker_lights";
  for (let i = 0; i < 5; i++) {
    setInstance(
      roof_marker_lights,
      i,
      -0.52 + i * 0.26,
      2.505,
      0.77,
      0,
      0,
      0,
      0.75,
      0.30,
      0.45
    );
  }
  roof_marker_lights.instanceMatrix.needsUpdate = true;
  cabin_group.add(roof_marker_lights);

  const side_marker_lightsGeom = new THREE.BoxGeometry(0.035, 0.075, 0.13);
  const side_marker_lights = new THREE.InstancedMesh(side_marker_lightsGeom, amberMat, 2);
  side_marker_lights.name = "side_marker_lights";
  setInstance(side_marker_lights, 0, -0.945, 1.47, -1.02, 0, 0, 0, 1, 1, 1);
  setInstance(side_marker_lights, 1, 0.945, 1.47, -1.02, 0, 0, 0, 1, 1, 1);
  side_marker_lights.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_marker_lights);

  const bed_floorGeom = new THREE.BoxGeometry(1.56, 0.055, 1.80);
  const bed_floor = new THREE.Mesh(bed_floorGeom, bedLinerMat);
  bed_floor.name = "bed_floor";
  bed_floor.position.set(0, 1.01, -2.09);
  bed_group.add(bed_floor);

  const bed_side_panelsGeom = new THREE.BoxGeometry(0.10, 0.44, 1.84);
  const bed_side_panels = new THREE.InstancedMesh(bed_side_panelsGeom, bodyMat, 2);
  bed_side_panels.name = "bed_side_panels";
  setInstance(bed_side_panels, 0, -0.86, 1.20, -2.08, 0, 0, 0, 1, 1, 1);
  setInstance(bed_side_panels, 1, 0.86, 1.20, -2.08, 0, 0, 0, 1, 1, 1);
  bed_side_panels.instanceMatrix.needsUpdate = true;
  bed_group.add(bed_side_panels);

  const bed_inner_wallsGeom = new THREE.BoxGeometry(0.025, 0.38, 1.72);
  const bed_inner_walls = new THREE.InstancedMesh(bed_inner_wallsGeom, bedLinerMat, 2);
  bed_inner_walls.name = "bed_inner_walls";
  setInstance(bed_inner_walls, 0, -0.80, 1.22, -2.08, 0, 0, 0, 1, 1, 1);
  setInstance(bed_inner_walls, 1, 0.80, 1.22, -2.08, 0, 0, 0, 1, 1, 1);
  bed_inner_walls.instanceMatrix.needsUpdate = true;
  bed_group.add(bed_inner_walls);

  const bed_front_wallGeom = new THREE.BoxGeometry(1.72, 0.44, 0.07);
  const bed_front_wall = new THREE.Mesh(bed_front_wallGeom, bodyMat);
  bed_front_wall.name = "bed_front_wall";
  bed_front_wall.position.set(0, 1.20, -1.18);
  bed_group.add(bed_front_wall);

  const bed_front_linerGeom = new THREE.BoxGeometry(1.56, 0.36, 0.025);
  const bed_front_liner = new THREE.Mesh(bed_front_linerGeom, bedLinerMat);
  bed_front_liner.name = "bed_front_liner";
  bed_front_liner.position.set(0, 1.22, -1.222);
  bed_group.add(bed_front_liner);

  const bed_railsGeom = new THREE.BoxGeometry(0.13, 0.065, 1.94);
  const bed_rails = new THREE.InstancedMesh(bed_railsGeom, trimMat, 2);
  bed_rails.name = "bed_rails";
  setInstance(bed_rails, 0, -0.87, 1.45, -2.08, 0, 0, 0, 1, 1, 1);
  setInstance(bed_rails, 1, 0.87, 1.45, -2.08, 0, 0, 0, 1, 1, 1);
  bed_rails.instanceMatrix.needsUpdate = true;
  bed_group.add(bed_rails);

  const fuel_door_borderGeom = new THREE.RingGeometry(0.125, 0.142, 28);
  const fuel_door_borders = new THREE.InstancedMesh(fuel_door_borderGeom, trimMat, 2);
  fuel_door_borders.name = "fuel_door_borders";
  setInstance(fuel_door_borders, 0, -0.916, 1.20, -1.48, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(fuel_door_borders, 1, 0.916, 1.20, -1.48, 0, Math.PI / 2, 0, 1, 1, 1);
  fuel_door_borders.instanceMatrix.needsUpdate = true;
  bed_group.add(fuel_door_borders);

  const fuel_doorGeom = new THREE.CircleGeometry(0.122, 28);
  const fuel_doors = new THREE.InstancedMesh(fuel_doorGeom, bodyInsetMat, 2);
  fuel_doors.name = "fuel_doors";
  setInstance(fuel_doors, 0, -0.919, 1.20, -1.48, 0, -Math.PI / 2, 0, 1, 1, 1);
  setInstance(fuel_doors, 1, 0.919, 1.20, -1.48, 0, Math.PI / 2, 0, 1, 1, 1);
  fuel_doors.instanceMatrix.needsUpdate = true;
  bed_group.add(fuel_doors);

  const chassis_railsGeom = new THREE.BoxGeometry(0.11, 0.14, 4.70);
  const chassis_rails = new THREE.InstancedMesh(chassis_railsGeom, darkMetalMat, 2);
  chassis_rails.name = "chassis_rails";
  setInstance(chassis_rails, 0, -0.55, 0.34, -0.02, 0, 0, 0, 1, 1, 1);
  setInstance(chassis_rails, 1, 0.55, 0.34, -0.02, 0, 0, 0, 1, 1, 1);
  chassis_rails.instanceMatrix.needsUpdate = true;
  undercarriage_group.add(chassis_rails);

  const axle_housingsGeom = new THREE.CylinderGeometry(0.07, 0.07, 1.82, 12);
  const axle_housings = new THREE.InstancedMesh(axle_housingsGeom, darkMetalMat, 2);
  axle_housings.name = "axle_housings";
  setInstance(axle_housings, 0, 0, wheelCY, frontAxleZ, 0, 0, Math.PI / 2, 1, 1, 1);
  setInstance(axle_housings, 1, 0, wheelCY, rearAxleZ, 0, 0, Math.PI / 2, 1, 1, 1);
  axle_housings.instanceMatrix.needsUpdate = true;
  undercarriage_group.add(axle_housings);

  const running_boardsGeom = new THREE.BoxGeometry(0.18, 0.07, 2.38);
  const running_boards = new THREE.InstancedMesh(running_boardsGeom, trimMat, 2);
  running_boards.name = "running_boards";
  setInstance(running_boards, 0, -0.99, 0.43, -0.16, 0, 0, 0, 1, 1, 1);
  setInstance(running_boards, 1, 0.99, 0.43, -0.16, 0, 0, 0, 1, 1, 1);
  running_boards.instanceMatrix.needsUpdate = true;
  undercarriage_group.add(running_boards);

  const exhaust_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.48, 0.31, 0.75),
    new THREE.Vector3(0.52, 0.28, -0.20),
    new THREE.Vector3(0.58, 0.27, -1.45),
    new THREE.Vector3(0.68, 0.30, -2.62)
  ]);
  const exhaust_pipeGeom = new THREE.TubeGeometry(exhaust_path, 24, 0.035, 8, false);
  const exhaust_pipe = new THREE.Mesh(exhaust_pipeGeom, darkMetalMat);
  exhaust_pipe.name = "exhaust_pipe";
  undercarriage_group.add(exhaust_pipe);

  const wheel_arch_linersGeom = new THREE.TorusGeometry(wheelWellR, 0.035, 8, 32, Math.PI);
  const wheel_arch_liners = new THREE.InstancedMesh(wheel_arch_linersGeom, trimMat, 4);
  wheel_arch_liners.name = "wheel_arch_liners";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_arch_liners,
        instanceIndex++,
        side * 0.932,
        wheelCY,
        axleZ,
        0,
        Math.PI / 2,
        0,
        1,
        1,
        1
      );
    }
  }
  wheel_arch_liners.instanceMatrix.needsUpdate = true;
  body_group.add(wheel_arch_liners);

  const fender_lipsGeom = new THREE.TorusGeometry(0.615, 0.055, 10, 36, Math.PI);
  const fender_lips = new THREE.InstancedMesh(fender_lipsGeom, bodyMat, 4);
  fender_lips.name = "fender_lips";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        fender_lips,
        instanceIndex++,
        side * 0.948,
        wheelCY,
        axleZ,
        0,
        Math.PI / 2,
        0,
        1,
        1,
        1
      );
    }
  }
  fender_lips.instanceMatrix.needsUpdate = true;
  body_group.add(fender_lips);

  const mud_flapsGeom = new THREE.BoxGeometry(0.30, 0.40, 0.045);
  const mud_flaps = new THREE.InstancedMesh(mud_flapsGeom, rubberMat, 4);
  mud_flaps.name = "mud_flaps";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        mud_flaps,
        instanceIndex++,
        side * 0.88,
        0.29,
        axleZ - 0.58,
        -0.10,
        0,
        0,
        1,
        1,
        1
      );
    }
  }
  mud_flaps.instanceMatrix.needsUpdate = true;
  body_group.add(mud_flaps);

  const wheel_tiresGeom = new THREE.TorusGeometry(0.35, 0.15, 14, 32);
  const wheel_tires = new THREE.InstancedMesh(wheel_tiresGeom, rubberMat, 4);
  wheel_tires.name = "wheel_tires";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_tires,
        instanceIndex++,
        side * wheelX,
        wheelCY,
        axleZ,
        0,
        Math.PI / 2,
        0,
        1,
        1,
        1
      );
    }
  }
  wheel_tires.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_tires);

  const tread_blocksGeom = new THREE.BoxGeometry(0.30, 0.055, 0.105);
  const treadCount = 14;
  const tread_blocks = new THREE.InstancedMesh(tread_blocksGeom, rubberMat, treadCount * 4);
  tread_blocks.name = "tread_blocks";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      for (let i = 0; i < treadCount; i++) {
        const angle = i / treadCount * Math.PI * 2;
        setInstance(
          tread_blocks,
          instanceIndex++,
          side * wheelX,
          wheelCY + Math.cos(angle) * 0.505,
          axleZ + Math.sin(angle) * 0.505,
          angle,
          0,
          0,
          1,
          1,
          1
        );
      }
    }
  }
  tread_blocks.instanceMatrix.needsUpdate = true;
  wheel_group.add(tread_blocks);

  const wheel_rimsGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.075, 24);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimsGeom, silverMat, 4);
  wheel_rims.name = "wheel_rims";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_rims,
        instanceIndex++,
        side * 1.055,
        wheelCY,
        axleZ,
        0,
        0,
        Math.PI / 2,
        1,
        1,
        1
      );
    }
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_rims);

  const wheel_rim_ringsGeom = new THREE.TorusGeometry(0.225, 0.025, 8, 24);
  const wheel_rim_rings = new THREE.InstancedMesh(wheel_rim_ringsGeom, silverMat, 4);
  wheel_rim_rings.name = "wheel_rim_rings";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_rim_rings,
        instanceIndex++,
        side * 1.098,
        wheelCY,
        axleZ,
        0,
        Math.PI / 2,
        0,
        1,
        1,
        1
      );
    }
  }
  wheel_rim_rings.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_rim_rings);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.09, 18);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, darkMetalMat, 4);
  wheel_hubs.name = "wheel_hubs";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_hubs,
        instanceIndex++,
        side * 1.105,
        wheelCY,
        axleZ,
        0,
        0,
        Math.PI / 2,
        1,
        1,
        1
      );
    }
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_hubs);

  const wheel_vent_holesGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.018, 12);
  const wheel_vent_holes = new THREE.InstancedMesh(wheel_vent_holesGeom, trimMat, 32);
  wheel_vent_holes.name = "wheel_vent_holes";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      for (let i = 0; i < 8; i++) {
        const angle = i / 8 * Math.PI * 2;
        setInstance(
          wheel_vent_holes,
          instanceIndex++,
          side * 1.112,
          wheelCY + Math.cos(angle) * 0.185,
          axleZ + Math.sin(angle) * 0.185,
          0,
          0,
          Math.PI / 2,
          1,
          1,
          1
        );
      }
    }
  }
  wheel_vent_holes.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_vent_holes);

  const wheel_lugsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.022, 10);
  const wheel_lugs = new THREE.InstancedMesh(wheel_lugsGeom, silverMat, 20);
  wheel_lugs.name = "wheel_lugs";
  instanceIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      for (let i = 0; i < 5; i++) {
        const angle = i / 5 * Math.PI * 2;
        setInstance(
          wheel_lugs,
          instanceIndex++,
          side * 1.126,
          wheelCY + Math.cos(angle) * 0.070,
          axleZ + Math.sin(angle) * 0.070,
          0,
          0,
          Math.PI / 2,
          1,
          1,
          1
        );
      }
    }
  }
  wheel_lugs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_lugs);

  const front_bumperGeom = new THREE.BoxGeometry(2.02, 0.23, 0.18);
  const front_bumper = new THREE.Mesh(front_bumperGeom, trimMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.52, 3.12);
  front_group.add(front_bumper);

  const front_bumper_centerGeom = new THREE.BoxGeometry(1.48, 0.16, 0.05);
  const front_bumper_center = new THREE.Mesh(front_bumper_centerGeom, silverMat);
  front_bumper_center.name = "front_bumper_center";
  front_bumper_center.position.set(0, 0.54, 3.225);
  front_group.add(front_bumper_center);

  const front_grilleGeom = new THREE.BoxGeometry(0.76, 0.36, 0.055);
  const front_grille = new THREE.Mesh(front_grilleGeom, trimMat);
  front_grille.name = "front_grille";
  front_grille.position.set(0, 1.08, 3.075);
  front_group.add(front_grille);

  const grille_slatsGeom = new THREE.BoxGeometry(0.66, 0.025, 0.025);
  const grille_slats = new THREE.InstancedMesh(grille_slatsGeom, silverMat, 5);
  grille_slats.name = "grille_slats";
  for (let i = 0; i < 5; i++) {
    setInstance(grille_slats, i, 0, 0.94 + i * 0.07, 3.11, 0, 0, 0, 1, 1, 1);
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  front_group.add(grille_slats);

  const headlight_housingsGeom = new THREE.BoxGeometry(0.34, 0.22, 0.06);
  const headlight_housings = new THREE.InstancedMesh(headlight_housingsGeom, trimMat, 2);
  headlight_housings.name = "headlight_housings";
  setInstance(headlight_housings, 0, -0.58, 0.92, 3.075, 0, 0, 0, 1, 1, 1);
  setInstance(headlight_housings, 1, 0.58, 0.92, 3.075, 0, 0, 0, 1, 1, 1);
  headlight_housings.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_housings);

  const headlightsGeom = new THREE.BoxGeometry(0.27, 0.15, 0.035);
  const headlights = new THREE.InstancedMesh(headlightsGeom, headlightMat, 2);
  headlights.name = "headlights";
  setInstance(headlights, 0, -0.58, 0.92, 3.12, 0, 0, 0, 1, 1, 1);
  setInstance(headlights, 1, 0.58, 0.92, 3.12, 0, 0, 0, 1, 1, 1);
  headlights.instanceMatrix.needsUpdate = true;
  front_group.add(headlights);

  const front_turn_signalsGeom = new THREE.BoxGeometry(0.27, 0.14, 0.035);
  const front_turn_signals = new THREE.InstancedMesh(front_turn_signalsGeom, amberMat, 2);
  front_turn_signals.name = "front_turn_signals";
  setInstance(front_turn_signals, 0, -0.69, 1.20, 3.075, 0, 0, 0, 1, 1, 1);
  setInstance(front_turn_signals, 1, 0.69, 1.20, 3.075, 0, 0, 0, 1, 1, 1);
  front_turn_signals.instanceMatrix.needsUpdate = true;
  front_group.add(front_turn_signals);

  const side_headlight_housingsGeom = new THREE.BoxGeometry(0.035, 0.18, 0.29);
  const side_headlight_housings = new THREE.InstancedMesh(side_headlight_housingsGeom, trimMat, 2);
  side_headlight_housings.name = "side_headlight_housings";
  setInstance(side_headlight_housings, 0, -0.925, 0.92, 2.84, 0, 0, 0, 1, 1, 1);
  setInstance(side_headlight_housings, 1, 0.925, 0.92, 2.84, 0, 0, 0, 1, 1, 1);
  side_headlight_housings.instanceMatrix.needsUpdate = true;
  front_group.add(side_headlight_housings);

  const side_headlightsGeom = new THREE.BoxGeometry(0.025, 0.12, 0.21);
  const side_headlights = new THREE.InstancedMesh(side_headlightsGeom, headlightMat, 2);
  side_headlights.name = "side_headlights";
  setInstance(side_headlights, 0, -0.95, 0.92, 2.84, 0, 0, 0, 1, 1, 1);
  setInstance(side_headlights, 1, 0.95, 0.92, 2.84, 0, 0, 0, 1, 1, 1);
  side_headlights.instanceMatrix.needsUpdate = true;
  front_group.add(side_headlights);

  const side_turn_signalsGeom = new THREE.BoxGeometry(0.025, 0.12, 0.22);
  const side_turn_signals = new THREE.InstancedMesh(side_turn_signalsGeom, amberMat, 2);
  side_turn_signals.name = "side_turn_signals";
  setInstance(side_turn_signals, 0, -0.95, 1.20, 2.82, 0, 0, 0, 1, 1, 1);
  setInstance(side_turn_signals, 1, 0.95, 1.20, 2.82, 0, 0, 0, 1, 1, 1);
  side_turn_signals.instanceMatrix.needsUpdate = true;
  front_group.add(side_turn_signals);

  const front_license_plateGeom = new THREE.BoxGeometry(0.46, 0.16, 0.025);
  const front_license_plate = new THREE.Mesh(front_license_plateGeom, plateMat);
  front_license_plate.name = "front_license_plate";
  front_license_plate.position.set(0, 0.54, 3.23);
  front_group.add(front_license_plate);

  const rear_bumperGeom = new THREE.BoxGeometry(2.00, 0.22, 0.18);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, trimMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.52, -3.12);
  rear_group.add(rear_bumper);

  const tailgateGeom = new THREE.BoxGeometry(1.76, 0.66, 0.07);
  const tailgate = new THREE.Mesh(tailgateGeom, bodyMat);
  tailgate.name = "tailgate";
  tailgate.position.set(0, 1.04, -3.075);
  rear_group.add(tailgate);

  const tailgate_top_capGeom = new THREE.BoxGeometry(1.84, 0.065, 0.10);
  const tailgate_top_cap = new THREE.Mesh(tailgate_top_capGeom, trimMat);
  tailgate_top_cap.name = "tailgate_top_cap";
  tailgate_top_cap.position.set(0, 1.44, -3.07);
  rear_group.add(tailgate_top_cap);

  const tailgate_handleGeom = new THREE.BoxGeometry(0.30, 0.055, 0.035);
  const tailgate_handle = new THREE.Mesh(tailgate_handleGeom, trimMat);
  tailgate_handle.name = "tailgate_handle";
  tailgate_handle.position.set(0, 1.27, -3.12);
  rear_group.add(tailgate_handle);

  const rear_taillight_housingsGeom = new THREE.BoxGeometry(0.18, 0.44, 0.065);
  const rear_taillight_housings = new THREE.InstancedMesh(rear_taillight_housingsGeom, trimMat, 2);
  rear_taillight_housings.name = "rear_taillight_housings";
  setInstance(rear_taillight_housings, 0, -0.82, 1.18, -3.12, 0, 0, 0, 1, 1, 1);
  setInstance(rear_taillight_housings, 1, 0.82, 1.18, -3.12, 0, 0, 0, 1, 1, 1);
  rear_taillight_housings.instanceMatrix.needsUpdate = true;
  rear_group.add(rear_taillight_housings);

  const rear_taillightsGeom = new THREE.BoxGeometry(0.13, 0.37, 0.035);
  const rear_taillights = new THREE.InstancedMesh(rear_taillightsGeom, redMat, 2);
  rear_taillights.name = "rear_taillights";
  setInstance(rear_taillights, 0, -0.82, 1.18, -3.165, 0, 0, 0, 1, 1, 1);
  setInstance(rear_taillights, 1, 0.82, 1.18, -3.165, 0, 0, 0, 1, 1, 1);
  rear_taillights.instanceMatrix.needsUpdate = true;
  rear_group.add(rear_taillights);

  const side_taillightsGeom = new THREE.BoxGeometry(0.035, 0.38, 0.15);
  const side_taillights = new THREE.InstancedMesh(side_taillightsGeom, redMat, 2);
  side_taillights.name = "side_taillights";
  setInstance(side_taillights, 0, -0.925, 1.18, -2.94, 0, 0, 0, 1, 1, 1);
  setInstance(side_taillights, 1, 0.925, 1.18, -2.94, 0, 0, 0, 1, 1, 1);
  side_taillights.instanceMatrix.needsUpdate = true;
  rear_group.add(side_taillights);

  const rear_license_plateGeom = new THREE.BoxGeometry(0.48, 0.18, 0.025);
  const rear_license_plate = new THREE.Mesh(rear_license_plateGeom, plateMat);
  rear_license_plate.name = "rear_license_plate";
  rear_license_plate.position.set(0, 0.62, -3.225);
  rear_group.add(rear_license_plate);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}