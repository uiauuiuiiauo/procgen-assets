export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "modern_coach_bus";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const glazing_group = new THREE.Group();
  glazing_group.name = "glazing_group";
  const interior_group = new THREE.Group();
  interior_group.name = "interior_group";
  const wheel_group = new THREE.Group();
  wheel_group.name = "wheel_group";
  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  const detail_group = new THREE.Group();
  detail_group.name = "detail_group";
  root.add(body_group, interior_group, glazing_group, wheel_group, roof_group, detail_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xaeb2b4,
    metalness: 0.0,
    roughness: 0.3
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x171a1c,
    metalness: 0.0,
    roughness: 0.8
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x292d30,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x52616a,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  const roofGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c4c8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
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
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.95
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xe87922,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xe87922,
    emissiveIntensity: 1.0
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb92222,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xb92222,
    emissiveIntensity: 1.0
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffe4,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffffe4,
    emissiveIntensity: 1.0
  });
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xf0f1ed,
    metalness: 0.0,
    roughness: 0.7
  });

  const bodyW = 1.2;
  const wheelR = 0.36;
  const wheelY = 0.38;
  const frontAxleZ = 1.05;
  const rearAxleZ = -1.28;
  const sideX = bodyW * 0.5;

  const lower_bodyShape = new THREE.Shape();
  lower_bodyShape.moveTo(-2.00, 0.22);
  lower_bodyShape.lineTo(1.82, 0.22);
  lower_bodyShape.lineTo(2.02, 0.34);
  lower_bodyShape.lineTo(2.05, 0.73);
  lower_bodyShape.lineTo(1.91, 0.90);
  lower_bodyShape.lineTo(-1.88, 0.90);
  lower_bodyShape.lineTo(-2.04, 0.72);
  lower_bodyShape.closePath();

  const lower_bodyGeom = new THREE.ExtrudeGeometry(lower_bodyShape, {
    depth: bodyW,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const lower_body = new THREE.Mesh(lower_bodyGeom, bodyMat);
  lower_body.name = "lower_body";
  lower_body.rotation.y = -Math.PI / 2;
  lower_body.position.x = bodyW / 2;
  body_group.add(lower_body);

  const front_upper_panelGeom = new THREE.BoxGeometry(1.16, 0.18, 0.15);
  const front_upper_panel = new THREE.Mesh(front_upper_panelGeom, bodyMat);
  front_upper_panel.name = "front_upper_panel";
  front_upper_panel.position.set(0, 1.62, 1.86);
  body_group.add(front_upper_panel);

  const rear_upper_panelGeom = new THREE.BoxGeometry(1.16, 0.76, 0.14);
  const rear_upper_panel = new THREE.Mesh(rear_upper_panelGeom, bodyMat);
  rear_upper_panel.name = "rear_upper_panel";
  rear_upper_panel.position.set(0, 1.27, -1.94);
  body_group.add(rear_upper_panel);

  const roof_shellGeom = new THREE.BoxGeometry(1.16, 0.12, 3.84);
  const roof_shell = new THREE.Mesh(roof_shellGeom, bodyMat);
  roof_shell.name = "roof_shell";
  roof_shell.position.set(0, 1.67, -0.02);
  roof_group.add(roof_shell);

  const roof_edge_railsGeom = new THREE.CylinderGeometry(0.055, 0.055, 3.84, 12);
  const roof_edge_rails = new THREE.InstancedMesh(roof_edge_railsGeom, bodyMat, 2);
  roof_edge_rails.name = "roof_edge_rails";
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.58 : 0.58, 1.68, -0.02);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_edge_rails.setMatrixAt(i, dummy.matrix);
  }
  roof_edge_rails.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_edge_rails);

  const side_belt_railsGeom = new THREE.BoxGeometry(0.055, 0.10, 3.78);
  const side_belt_rails = new THREE.InstancedMesh(side_belt_railsGeom, bodyMat, 2);
  side_belt_rails.name = "side_belt_rails";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.61 : 0.61, 1.61, -0.02);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_belt_rails.setMatrixAt(i, dummy.matrix);
  }
  side_belt_rails.instanceMatrix.needsUpdate = true;
  roof_group.add(side_belt_rails);

  const side_window_glassGeom = new THREE.BoxGeometry(0.018, 0.67, 3.52);
  const side_window_glass = new THREE.InstancedMesh(side_window_glassGeom, glassMat, 2);
  side_window_glass.name = "side_window_glass";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.617 : 0.617, 1.27, -0.08);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_window_glass.setMatrixAt(i, dummy.matrix);
  }
  side_window_glass.instanceMatrix.needsUpdate = true;
  glazing_group.add(side_window_glass);

  const side_window_railsGeom = new THREE.BoxGeometry(0.038, 0.045, 3.64);
  const side_window_rails = new THREE.InstancedMesh(side_window_railsGeom, trimMat, 4);
  side_window_rails.name = "side_window_rails";
  let railIndex = 0;
  for (const side of [-1, 1]) {
    for (const y of [0.91, 1.62]) {
      dummy.position.set(side * 0.628, y, -0.06);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_window_rails.setMatrixAt(railIndex++, dummy.matrix);
    }
  }
  side_window_rails.instanceMatrix.needsUpdate = true;
  glazing_group.add(side_window_rails);

  const mullionPositions = [1.58, 0.90, 0.24, -0.43, -1.10, -1.76];
  const side_window_mullionsGeom = new THREE.BoxGeometry(0.04, 0.72, 0.045);
  const side_window_mullions = new THREE.InstancedMesh(
    side_window_mullionsGeom,
    trimMat,
    mullionPositions.length * 2
  );
  side_window_mullions.name = "side_window_mullions";
  let mullionIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of mullionPositions) {
      dummy.position.set(side * 0.632, 1.265, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_window_mullions.setMatrixAt(mullionIndex++, dummy.matrix);
    }
  }
  side_window_mullions.instanceMatrix.needsUpdate = true;
  glazing_group.add(side_window_mullions);

  const side_window_midrailsGeom = new THREE.BoxGeometry(0.042, 0.035, 2.42);
  const side_window_midrails = new THREE.InstancedMesh(side_window_midrailsGeom, trimMat, 2);
  side_window_midrails.name = "side_window_midrails";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.633 : 0.633, 1.23, -0.56);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_window_midrails.setMatrixAt(i, dummy.matrix);
  }
  side_window_midrails.instanceMatrix.needsUpdate = true;
  glazing_group.add(side_window_midrails);

  const front_windshieldShape = new THREE.Shape();
  front_windshieldShape.moveTo(-0.52, -0.36);
  front_windshieldShape.lineTo(0.52, -0.36);
  front_windshieldShape.lineTo(0.48, 0.36);
  front_windshieldShape.lineTo(-0.48, 0.36);
  front_windshieldShape.closePath();

  const front_windshieldGeom = new THREE.ShapeGeometry(front_windshieldShape);
  const front_windshield = new THREE.Mesh(front_windshieldGeom, glassMat);
  front_windshield.name = "front_windshield";
  front_windshield.position.set(0, 1.28, 1.96);
  front_windshield.rotation.x = -0.10;
  glazing_group.add(front_windshield);

  const windshield_side_pillarsGeom = new THREE.BoxGeometry(0.065, 0.78, 0.075);
  const windshield_side_pillars = new THREE.InstancedMesh(windshield_side_pillarsGeom, trimMat, 2);
  windshield_side_pillars.name = "windshield_side_pillars";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.54 : 0.54, 1.28, 1.955);
    dummy.rotation.set(-0.10, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    windshield_side_pillars.setMatrixAt(i, dummy.matrix);
  }
  windshield_side_pillars.instanceMatrix.needsUpdate = true;
  glazing_group.add(windshield_side_pillars);

  const windshield_top_frameGeom = new THREE.BoxGeometry(1.12, 0.07, 0.075);
  const windshield_top_frame = new THREE.Mesh(windshield_top_frameGeom, trimMat);
  windshield_top_frame.name = "windshield_top_frame";
  windshield_top_frame.position.set(0, 1.64, 1.92);
  windshield_top_frame.rotation.x = -0.10;
  glazing_group.add(windshield_top_frame);

  const windshield_bottom_frameGeom = new THREE.BoxGeometry(1.10, 0.075, 0.085);
  const windshield_bottom_frame = new THREE.Mesh(windshield_bottom_frameGeom, trimMat);
  windshield_bottom_frame.name = "windshield_bottom_frame";
  windshield_bottom_frame.position.set(0, 0.91, 2.00);
  windshield_bottom_frame.rotation.x = -0.10;
  glazing_group.add(windshield_bottom_frame);

  const windshield_center_dividerGeom = new THREE.BoxGeometry(0.035, 0.72, 0.045);
  const windshield_center_divider = new THREE.Mesh(windshield_center_dividerGeom, trimMat);
  windshield_center_divider.name = "windshield_center_divider";
  windshield_center_divider.position.set(0, 1.28, 1.982);
  windshield_center_divider.rotation.x = -0.10;
  glazing_group.add(windshield_center_divider);

  const rear_windowGeom = new THREE.BoxGeometry(1.02, 0.62, 0.018);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.name = "rear_window";
  rear_window.position.set(0, 1.29, -2.016);
  glazing_group.add(rear_window);

  const rear_window_frame_topGeom = new THREE.BoxGeometry(1.08, 0.055, 0.045);
  const rear_window_frame_top = new THREE.Mesh(rear_window_frame_topGeom, trimMat);
  rear_window_frame_top.name = "rear_window_frame_top";
  rear_window_frame_top.position.set(0, 1.62, -2.025);
  glazing_group.add(rear_window_frame_top);

  const rear_window_frame_bottomGeom = new THREE.BoxGeometry(1.08, 0.055, 0.045);
  const rear_window_frame_bottom = new THREE.Mesh(rear_window_frame_bottomGeom, trimMat);
  rear_window_frame_bottom.name = "rear_window_frame_bottom";
  rear_window_frame_bottom.position.set(0, 0.95, -2.025);
  glazing_group.add(rear_window_frame_bottom);

  const rear_window_frame_sidesGeom = new THREE.BoxGeometry(0.055, 0.68, 0.045);
  const rear_window_frame_sides = new THREE.InstancedMesh(rear_window_frame_sidesGeom, trimMat, 2);
  rear_window_frame_sides.name = "rear_window_frame_sides";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.535 : 0.535, 1.285, -2.025);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_window_frame_sides.setMatrixAt(i, dummy.matrix);
  }
  rear_window_frame_sides.instanceMatrix.needsUpdate = true;
  glazing_group.add(rear_window_frame_sides);

  const interior_floorGeom = new THREE.BoxGeometry(1.04, 0.06, 3.55);
  const interior_floor = new THREE.Mesh(interior_floorGeom, darkMat);
  interior_floor.name = "interior_floor";
  interior_floor.position.set(0, 0.86, -0.05);
  interior_group.add(interior_floor);

  const seatRows = [0.72, 0.02, -0.68, -1.38];
  const passenger_seatsGeom = new THREE.BoxGeometry(0.35, 0.48, 0.13);
  const passenger_seats = new THREE.InstancedMesh(passenger_seatsGeom, seatMat, seatRows.length * 2);
  passenger_seats.name = "passenger_seats";
  let seatIndex = 0;
  for (const z of seatRows) {
    for (const x of [-0.30, 0.30]) {
      dummy.position.set(x, 1.10, z);
      dummy.rotation.set(-0.08, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      passenger_seats.setMatrixAt(seatIndex++, dummy.matrix);
    }
  }
  passenger_seats.instanceMatrix.needsUpdate = true;
  interior_group.add(passenger_seats);

  const passenger_headrestsGeom = new THREE.SphereGeometry(1, 16, 10);
  const passenger_headrests = new THREE.InstancedMesh(
    passenger_headrestsGeom,
    seatMat,
    seatRows.length * 2
  );
  passenger_headrests.name = "passenger_headrests";
  let headrestIndex = 0;
  for (const z of seatRows) {
    for (const x of [-0.30, 0.30]) {
      dummy.position.set(x, 1.39, z - 0.015);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.16, 0.14, 0.09);
      dummy.updateMatrix();
      passenger_headrests.setMatrixAt(headrestIndex++, dummy.matrix);
    }
  }
  passenger_headrests.instanceMatrix.needsUpdate = true;
  interior_group.add(passenger_headrests);

  const driver_seatGeom = new THREE.BoxGeometry(0.36, 0.50, 0.14);
  const driver_seat = new THREE.Mesh(driver_seatGeom, seatMat);
  driver_seat.name = "driver_seat";
  driver_seat.position.set(-0.31, 1.09, 1.28);
  driver_seat.rotation.x = -0.08;
  interior_group.add(driver_seat);

  const driver_headrestGeom = new THREE.SphereGeometry(1, 16, 10);
  const driver_headrest = new THREE.Mesh(driver_headrestGeom, seatMat);
  driver_headrest.name = "driver_headrest";
  driver_headrest.position.set(-0.31, 1.39, 1.26);
  driver_headrest.scale.set(0.16, 0.14, 0.09);
  interior_group.add(driver_headrest);

  const dashboardGeom = new THREE.BoxGeometry(0.95, 0.16, 0.28);
  const dashboard = new THREE.Mesh(dashboardGeom, darkMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 0.99, 1.68);
  dashboard.rotation.x = -0.12;
  interior_group.add(dashboard);

  const steering_wheelGeom = new THREE.TorusGeometry(0.13, 0.018, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, trimMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.31, 1.16, 1.54);
  steering_wheel.rotation.x = -0.28;
  interior_group.add(steering_wheel);

  const steering_columnGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.25, 10);
  const steering_column = new THREE.Mesh(steering_columnGeom, trimMat);
  steering_column.name = "steering_column";
  steering_column.position.set(-0.31, 1.06, 1.61);
  steering_column.rotation.x = -0.45;
  interior_group.add(steering_column);

  const wheelPositions = [
    [-1, frontAxleZ],
    [1, frontAxleZ],
    [-1, rearAxleZ],
    [1, rearAxleZ]
  ];

  const wheel_arch_trimsGeom = new THREE.TorusGeometry(0.39, 0.035, 8, 32);
  const wheel_arch_trims = new THREE.InstancedMesh(wheel_arch_trimsGeom, trimMat, 4);
  wheel_arch_trims.name = "wheel_arch_trims";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideX + 0.025), wheelY, z);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_arch_trims.setMatrixAt(i, dummy.matrix);
  }
  wheel_arch_trims.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_arch_trims);

  const tiresGeom = new THREE.TorusGeometry(wheelR - 0.105, 0.105, 12, 32);
  const tires = new THREE.InstancedMesh(tiresGeom, tireMat, 4);
  tires.name = "tires";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideX + 0.045), wheelY, z);
    dummy.rotation.set(0, Math.PI / 2, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tires.setMatrixAt(i, dummy.matrix);
  }
  tires.instanceMatrix.needsUpdate = true;
  wheel_group.add(tires);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.12, 24);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, silverMat, 4);
  wheel_hubs.name = "wheel_hubs";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideX + 0.08), wheelY, z);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_hubs.setMatrixAt(i, dummy.matrix);
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_hubs);

  const wheel_center_capsGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.035, 20);
  const wheel_center_caps = new THREE.InstancedMesh(wheel_center_capsGeom, chromeMat, 4);
  wheel_center_caps.name = "wheel_center_caps";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideX + 0.15), wheelY, z);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    wheel_center_caps.setMatrixAt(i, dummy.matrix);
  }
  wheel_center_caps.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_center_caps);

  const wheel_lug_holesGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.018, 10);
  const wheel_lug_holes = new THREE.InstancedMesh(wheel_lug_holesGeom, darkMat, 32);
  wheel_lug_holes.name = "wheel_lug_holes";
  let lugIndex = 0;
  for (const wheelPosition of wheelPositions) {
    const side = wheelPosition[0];
    const z = wheelPosition[1];
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      dummy.position.set(
        side * (sideX + 0.172),
        wheelY + Math.cos(angle) * 0.125,
        z + Math.sin(angle) * 0.125
      );
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_lug_holes.setMatrixAt(lugIndex++, dummy.matrix);
    }
  }
  wheel_lug_holes.instanceMatrix.needsUpdate = true;
  wheel_group.add(wheel_lug_holes);

  const mud_flapsGeom = new THREE.BoxGeometry(0.055, 0.28, 0.08);
  const mud_flaps = new THREE.InstancedMesh(mud_flapsGeom, tireMat, 4);
  mud_flaps.name = "mud_flaps";
  for (let i = 0; i < wheelPositions.length; i++) {
    const side = wheelPositions[i][0];
    const z = wheelPositions[i][1];
    dummy.position.set(side * (sideX + 0.015), 0.20, z - 0.34);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    mud_flaps.setMatrixAt(i, dummy.matrix);
  }
  mud_flaps.instanceMatrix.needsUpdate = true;
  wheel_group.add(mud_flaps);

  const luggage_seamsGeom = new THREE.BoxGeometry(0.018, 0.50, 0.014);
  const luggage_seams = new THREE.InstancedMesh(luggage_seamsGeom, trimMat, 8);
  luggage_seams.name = "luggage_seams";
  let seamIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.62, -0.05, -0.72, -1.91]) {
      dummy.position.set(side * (sideX + 0.018), 0.58, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      luggage_seams.setMatrixAt(seamIndex++, dummy.matrix);
    }
  }
  luggage_seams.instanceMatrix.needsUpdate = true;
  detail_group.add(luggage_seams);

  const side_marker_lightsGeom = new THREE.BoxGeometry(0.025, 0.065, 0.11);
  const side_marker_lights = new THREE.InstancedMesh(side_marker_lightsGeom, amberMat, 6);
  side_marker_lights.name = "side_marker_lights";
  let markerIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [0.55, -0.55, -1.72]) {
      dummy.position.set(side * (sideX + 0.028), 0.65, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_marker_lights.setMatrixAt(markerIndex++, dummy.matrix);
    }
  }
  side_marker_lights.instanceMatrix.needsUpdate = true;
  detail_group.add(side_marker_lights);

  const engine_vent_panelsGeom = new THREE.BoxGeometry(0.025, 0.38, 0.46);
  const engine_vent_panels = new THREE.InstancedMesh(engine_vent_panelsGeom, trimMat, 2);
  engine_vent_panels.name = "engine_vent_panels";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -(sideX + 0.025) : sideX + 0.025, 0.60, -1.68);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    engine_vent_panels.setMatrixAt(i, dummy.matrix);
  }
  engine_vent_panels.instanceMatrix.needsUpdate = true;
  detail_group.add(engine_vent_panels);

  const engine_vent_slatsGeom = new THREE.BoxGeometry(0.032, 0.018, 0.37);
  const engine_vent_slats = new THREE.InstancedMesh(engine_vent_slatsGeom, silverMat, 14);
  engine_vent_slats.name = "engine_vent_slats";
  let ventIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      dummy.position.set(
        side * (sideX + 0.043),
        0.46 + i * 0.047,
        -1.68
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      engine_vent_slats.setMatrixAt(ventIndex++, dummy.matrix);
    }
  }
  engine_vent_slats.instanceMatrix.needsUpdate = true;
  detail_group.add(engine_vent_slats);

  const front_bumperGeom = new THREE.BoxGeometry(1.22, 0.16, 0.16);
  const front_bumper = new THREE.Mesh(front_bumperGeom, bodyMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.30, 2.03);
  detail_group.add(front_bumper);

  const front_lower_intakeGeom = new THREE.BoxGeometry(0.48, 0.09, 0.025);
  const front_lower_intake = new THREE.Mesh(front_lower_intakeGeom, darkMat);
  front_lower_intake.name = "front_lower_intake";
  front_lower_intake.position.set(0, 0.31, 2.12);
  detail_group.add(front_lower_intake);

  const headlight_housingsGeom = new THREE.BoxGeometry(0.32, 0.13, 0.045);
  const headlight_housings = new THREE.InstancedMesh(headlight_housingsGeom, silverMat, 2);
  headlight_housings.name = "headlight_housings";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.40 : 0.40, 0.54, 2.075);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    headlight_housings.setMatrixAt(i, dummy.matrix);
  }
  headlight_housings.instanceMatrix.needsUpdate = true;
  detail_group.add(headlight_housings);

  const headlight_lensesGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16);
  const headlight_lenses = new THREE.InstancedMesh(headlight_lensesGeom, headlightMat, 4);
  headlight_lenses.name = "headlight_lenses";
  const headlightXs = [-0.49, -0.36, 0.36, 0.49];
  for (let i = 0; i < headlightXs.length; i++) {
    dummy.position.set(headlightXs[i], 0.55, 2.105);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    headlight_lenses.setMatrixAt(i, dummy.matrix);
  }
  headlight_lenses.instanceMatrix.needsUpdate = true;
  detail_group.add(headlight_lenses);

  const front_turn_signalsGeom = new THREE.BoxGeometry(0.075, 0.055, 0.025);
  const front_turn_signals = new THREE.InstancedMesh(front_turn_signalsGeom, amberMat, 2);
  front_turn_signals.name = "front_turn_signals";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.55 : 0.55, 0.55, 2.105);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_turn_signals.setMatrixAt(i, dummy.matrix);
  }
  front_turn_signals.instanceMatrix.needsUpdate = true;
  detail_group.add(front_turn_signals);

  const front_fog_lightsGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16);
  const front_fog_lights = new THREE.InstancedMesh(front_fog_lightsGeom, headlightMat, 2);
  front_fog_lights.name = "front_fog_lights";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.43 : 0.43, 0.29, 2.12);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_fog_lights.setMatrixAt(i, dummy.matrix);
  }
  front_fog_lights.instanceMatrix.needsUpdate = true;
  detail_group.add(front_fog_lights);

  const front_license_plateGeom = new THREE.BoxGeometry(0.30, 0.12, 0.018);
  const front_license_plate = new THREE.Mesh(front_license_plateGeom, plateMat);
  front_license_plate.name = "front_license_plate";
  front_license_plate.position.set(0, 0.31, 2.125);
  detail_group.add(front_license_plate);

  const front_logoGeom = new THREE.TorusGeometry(0.047, 0.008, 8, 20);
  const front_logo = new THREE.Mesh(front_logoGeom, chromeMat);
  front_logo.name = "front_logo";
  front_logo.position.set(0, 0.75, 2.087);
  detail_group.add(front_logo);

  const front_logo_centerGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12);
  const front_logo_center = new THREE.Mesh(front_logo_centerGeom, chromeMat);
  front_logo_center.name = "front_logo_center";
  front_logo_center.position.set(0, 0.75, 2.09);
  front_logo_center.rotation.x = Math.PI / 2;
  detail_group.add(front_logo_center);

  const rear_bumperGeom = new THREE.BoxGeometry(1.22, 0.16, 0.16);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, trimMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.30, -2.04);
  detail_group.add(rear_bumper);

  const rear_taillightsGeom = new THREE.BoxGeometry(0.09, 0.30, 0.025);
  const rear_taillights = new THREE.InstancedMesh(rear_taillightsGeom, redMat, 2);
  rear_taillights.name = "rear_taillights";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.52 : 0.52, 0.72, -2.055);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_taillights.setMatrixAt(i, dummy.matrix);
  }
  rear_taillights.instanceMatrix.needsUpdate = true;
  detail_group.add(rear_taillights);

  const rear_turn_signalsGeom = new THREE.BoxGeometry(0.09, 0.075, 0.028);
  const rear_turn_signals = new THREE.InstancedMesh(rear_turn_signalsGeom, amberMat, 2);
  rear_turn_signals.name = "rear_turn_signals";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.52 : 0.52, 0.90, -2.06);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    rear_turn_signals.setMatrixAt(i, dummy.matrix);
  }
  rear_turn_signals.instanceMatrix.needsUpdate = true;
  detail_group.add(rear_turn_signals);

  const left_windshield_wiperGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.05, 0.94, 2.018),
      new THREE.Vector3(-0.43, 1.10, 2.000)
    ),
    1,
    0.014,
    8,
    false
  );
  const left_windshield_wiper = new THREE.Mesh(left_windshield_wiperGeom, darkMat);
  left_windshield_wiper.name = "left_windshield_wiper";
  detail_group.add(left_windshield_wiper);

  const right_windshield_wiperGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.05, 0.94, 2.018),
      new THREE.Vector3(0.43, 1.10, 2.000)
    ),
    1,
    0.014,
    8,
    false
  );
  const right_windshield_wiper = new THREE.Mesh(right_windshield_wiperGeom, darkMat);
  right_windshield_wiper.name = "right_windshield_wiper";
  detail_group.add(right_windshield_wiper);

  const left_mirror_armGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55, 1.52, 1.79),
      new THREE.Vector3(-0.70, 1.53, 1.84),
      new THREE.Vector3(-0.79, 1.43, 1.85)
    ]),
    12,
    0.018,
    8,
    false
  );
  const left_mirror_arm = new THREE.Mesh(left_mirror_armGeom, trimMat);
  left_mirror_arm.name = "left_mirror_arm";
  detail_group.add(left_mirror_arm);

  const right_mirror_armGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.55, 1.52, 1.79),
      new THREE.Vector3(0.70, 1.53, 1.84),
      new THREE.Vector3(0.79, 1.43, 1.85)
    ]),
    12,
    0.018,
    8,
    false
  );
  const right_mirror_arm = new THREE.Mesh(right_mirror_armGeom, trimMat);
  right_mirror_arm.name = "right_mirror_arm";
  detail_group.add(right_mirror_arm);

  const mirror_housingsGeom = new THREE.SphereGeometry(1, 16, 10);
  const mirror_housings = new THREE.InstancedMesh(mirror_housingsGeom, trimMat, 2);
  mirror_housings.name = "mirror_housings";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.80 : 0.80, 1.37, 1.85);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.075, 0.15, 0.055);
    dummy.updateMatrix();
    mirror_housings.setMatrixAt(i, dummy.matrix);
  }
  mirror_housings.instanceMatrix.needsUpdate = true;
  detail_group.add(mirror_housings);

  const mirror_glassGeom = new THREE.CircleGeometry(0.075, 16);
  const mirror_glass = new THREE.InstancedMesh(mirror_glassGeom, chromeMat, 2);
  mirror_glass.name = "mirror_glass";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.80, 1.37, 1.793);
    dummy.rotation.set(0, Math.PI, 0);
    dummy.scale.set(0.78, 1.45, 1);
    dummy.updateMatrix();
    mirror_glass.setMatrixAt(i, dummy.matrix);
  }
  mirror_glass.instanceMatrix.needsUpdate = true;
  detail_group.add(mirror_glass);

  const roof_windowGeom = new THREE.BoxGeometry(0.88, 0.018, 0.72);
  const roof_windows = new THREE.InstancedMesh(roof_windowGeom, roofGlassMat, 4);
  roof_windows.name = "roof_windows";
  const roofWindowZ = [-1.35, -0.45, 0.45, 1.35];
  for (let i = 0; i < roofWindowZ.length; i++) {
    dummy.position.set(0, 1.805, roofWindowZ[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_windows.setMatrixAt(i, dummy.matrix);
  }
  roof_windows.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_windows);

  const roof_window_archesGeom = new THREE.TorusGeometry(0.45, 0.025, 8, 28, Math.PI);
  const roof_window_arches = new THREE.InstancedMesh(roof_window_archesGeom, trimMat, 4);
  roof_window_arches.name = "roof_window_arches";
  for (let i = 0; i < roofWindowZ.length; i++) {
    dummy.position.set(0, 1.73, roofWindowZ[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 0.38, 1);
    dummy.updateMatrix();
    roof_window_arches.setMatrixAt(i, dummy.matrix);
  }
  roof_window_arches.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_window_arches);

  const roof_window_side_framesGeom = new THREE.BoxGeometry(0.035, 0.09, 0.78);
  const roof_window_side_frames = new THREE.InstancedMesh(roof_window_side_framesGeom, trimMat, 8);
  roof_window_side_frames.name = "roof_window_side_frames";
  let roofFrameIndex = 0;
  for (const z of roofWindowZ) {
    for (const x of [-0.46, 0.46]) {
      dummy.position.set(x, 1.755, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      roof_window_side_frames.setMatrixAt(roofFrameIndex++, dummy.matrix);
    }
  }
  roof_window_side_frames.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_window_side_frames);

  const roof_window_crossbarsGeom = new THREE.BoxGeometry(0.94, 0.035, 0.045);
  const roof_window_crossbars = new THREE.InstancedMesh(roof_window_crossbarsGeom, trimMat, 5);
  roof_window_crossbars.name = "roof_window_crossbars";
  const crossbarZ = [-1.80, -0.90, 0.00, 0.90, 1.80];
  for (let i = 0; i < crossbarZ.length; i++) {
    dummy.position.set(0, 1.76, crossbarZ[i]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_window_crossbars.setMatrixAt(i, dummy.matrix);
  }
  roof_window_crossbars.instanceMatrix.needsUpdate = true;
  roof_group.add(roof_window_crossbars);

  const roof_marker_lightsGeom = new THREE.BoxGeometry(0.075, 0.035, 0.045);
  const roof_marker_lights = new THREE.InstancedMesh(roof_marker_lightsGeom, amberMat, 4);
  roof_marker_lights.name = "roof_marker_lights";
  const roofMarkerPositions = [
    [-0.43, 1.735, 1.84],
    [0.43, 1.735, 1.84],
    [-0.43, 1.735, -1.91],
    [0.43, 1.735, -1.91]
  ];
  for (let i = 0; i < roofMarkerPositions.length; i++) {
    const p = roofMarkerPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_marker_lights.setMatrixAt(i, dummy.matrix);
  }
  roof_marker_lights.instanceMatrix.needsUpdate = true;
  detail_group.add(roof_marker_lights);

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