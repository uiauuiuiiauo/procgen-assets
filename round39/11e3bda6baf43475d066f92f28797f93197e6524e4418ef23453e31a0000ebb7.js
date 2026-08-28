export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_bus";

  const body_group = new THREE.Group();
  const cabin_group = new THREE.Group();
  const interior_group = new THREE.Group();
  const running_gear_group = new THREE.Group();
  const front_group = new THREE.Group();
  const rear_group = new THREE.Group();
  root.add(body_group, cabin_group, interior_group, running_gear_group, front_group, rear_group);

  const length = 4.6;
  const width = 1.62;
  const bodyBottom = 0.72;
  const lowerBodyTop = 1.67;
  const windowTop = 2.56;
  const wheelR = 0.58;
  const wheelY = 0.60;
  const wheelX = 0.88;
  const frontAxleZ = 1.52;
  const rearAxleZ = -1.55;
  const frontZ = 2.34;
  const rearZ = -2.24;

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xb89020,
    metalness: 0.6,
    roughness: 0.2
  });
  const blackPaintMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.35,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8
  });
  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.5,
    roughness: 0.5
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x3b1712,
    metalness: 0.0,
    roughness: 0.7
  });
  const leatherSeamMat = new THREE.MeshStandardMaterial({
    color: 0x210c09,
    metalness: 0.0,
    roughness: 0.7
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const brassDarkMat = new THREE.MeshStandardMaterial({
    color: 0x5b4615,
    metalness: 0.5,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xfff1b0,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffe3a0,
    emissiveIntensity: 1.0
  });
  const tailLightMat = new THREE.MeshStandardMaterial({
    color: 0xb81812,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xb81812,
    emissiveIntensity: 1.0
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

  function addTube(parent, name, p1, p2, radius, material) {
    const tubeGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(p1, p2),
      1,
      radius,
      8,
      false
    );
    const tube = new THREE.Mesh(tubeGeom, material);
    tube.name = name;
    parent.add(tube);
    return tube;
  }

  const lower_bodyGeom = new THREE.BoxGeometry(
    width,
    lowerBodyTop - bodyBottom,
    length - 0.22
  );
  const lower_body = new THREE.Mesh(lower_bodyGeom, goldMat);
  lower_body.name = "lower_body";
  lower_body.position.set(0, (bodyBottom + lowerBodyTop) * 0.5, -0.02);
  body_group.add(lower_body);

  const lower_skirtGeom = new THREE.BoxGeometry(width + 0.04, 0.18, length - 0.35);
  const lower_skirt = new THREE.Mesh(lower_skirtGeom, blackPaintMat);
  lower_skirt.name = "lower_skirt";
  lower_skirt.position.set(0, bodyBottom + 0.02, -0.04);
  body_group.add(lower_skirt);

  const upper_body_shellGeom = new THREE.BoxGeometry(width, 0.18, 4.28);
  const upper_body_shell = new THREE.Mesh(upper_body_shellGeom, goldMat);
  upper_body_shell.name = "upper_body_shell";
  upper_body_shell.position.set(0, windowTop - 0.06, -0.03);
  body_group.add(upper_body_shell);

  const side_belt_railsGeom = new THREE.BoxGeometry(0.055, 0.12, 4.30);
  const side_belt_rails = new THREE.InstancedMesh(side_belt_railsGeom, goldTrimMat, 2);
  side_belt_rails.name = "side_belt_rails";
  setInstance(side_belt_rails, 0, -0.81, 1.66, -0.02, 0, 0, 0);
  setInstance(side_belt_rails, 1, 0.81, 1.66, -0.02, 0, 0, 0);
  side_belt_rails.instanceMatrix.needsUpdate = true;
  body_group.add(side_belt_rails);

  const side_lower_railsGeom = new THREE.BoxGeometry(0.045, 0.045, 4.12);
  const side_lower_rails = new THREE.InstancedMesh(side_lower_railsGeom, goldTrimMat, 2);
  side_lower_rails.name = "side_lower_rails";
  setInstance(side_lower_rails, 0, -0.825, 0.79, -0.02, 0, 0, 0);
  setInstance(side_lower_rails, 1, 0.825, 0.79, -0.02, 0, 0, 0);
  side_lower_rails.instanceMatrix.needsUpdate = true;
  body_group.add(side_lower_rails);

  const side_panel_insetsGeom = new THREE.BoxGeometry(0.025, 0.72, 1.02);
  const side_panel_insets = new THREE.InstancedMesh(side_panel_insetsGeom, goldMat, 4);
  side_panel_insets.name = "side_panel_insets";
  let panelIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.57, 0.57]) {
      setInstance(side_panel_insets, panelIndex++, side * 0.824, 1.22, z, 0, 0, 0);
    }
  }
  side_panel_insets.instanceMatrix.needsUpdate = true;
  body_group.add(side_panel_insets);

  const side_panel_horizontal_trimGeom = new THREE.BoxGeometry(0.035, 0.025, 1.08);
  const side_panel_horizontal_trim = new THREE.InstancedMesh(
    side_panel_horizontal_trimGeom,
    goldTrimMat,
    8
  );
  side_panel_horizontal_trim.name = "side_panel_horizontal_trim";
  panelIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.57, 0.57]) {
      for (const y of [0.84, 1.60]) {
        setInstance(
          side_panel_horizontal_trim,
          panelIndex++,
          side * 0.842,
          y,
          z,
          0,
          0,
          0
        );
      }
    }
  }
  side_panel_horizontal_trim.instanceMatrix.needsUpdate = true;
  body_group.add(side_panel_horizontal_trim);

  const side_panel_vertical_trimGeom = new THREE.BoxGeometry(0.035, 0.78, 0.025);
  const side_panel_vertical_trim = new THREE.InstancedMesh(
    side_panel_vertical_trimGeom,
    goldTrimMat,
    8
  );
  side_panel_vertical_trim.name = "side_panel_vertical_trim";
  panelIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.57, 0.57]) {
      for (const dz of [-0.54, 0.54]) {
        setInstance(
          side_panel_vertical_trim,
          panelIndex++,
          side * 0.843,
          1.22,
          z + dz,
          0,
          0,
          0
        );
      }
    }
  }
  side_panel_vertical_trim.instanceMatrix.needsUpdate = true;
  body_group.add(side_panel_vertical_trim);

  const door_handlesGeom = new THREE.SphereGeometry(0.055, 14, 8);
  const door_handles = new THREE.InstancedMesh(door_handlesGeom, goldTrimMat, 4);
  door_handles.name = "door_handles";
  let detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.12, 1.02]) {
      setInstance(door_handles, detailIndex++, side * 0.875, 1.45, z, 0, 0, 0);
    }
  }
  door_handles.instanceMatrix.needsUpdate = true;
  body_group.add(door_handles);

  const side_hingesGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.14, 8);
  const side_hinges = new THREE.InstancedMesh(side_hingesGeom, goldTrimMat, 8);
  side_hinges.name = "side_hinges";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-1.10, 0.02, 1.12]) {
      for (const y of [1.12, 1.48]) {
        setInstance(side_hinges, detailIndex++, side * 0.858, y, z, 0, 0, 0);
      }
    }
  }
  side_hinges.instanceMatrix.needsUpdate = true;
  body_group.add(side_hinges);

  const side_windowsGeom = new THREE.BoxGeometry(0.018, 0.76, 1.02);
  const side_windows = new THREE.InstancedMesh(side_windowsGeom, glassMat, 4);
  side_windows.name = "side_windows";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.57, 0.57]) {
      setInstance(side_windows, detailIndex++, side * 0.817, 2.10, z, 0, 0, 0);
    }
  }
  side_windows.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_windows);

  const side_window_pillarsGeom = new THREE.BoxGeometry(0.075, 0.94, 0.085);
  const pillarPositions = [-1.12, 0.02, 1.12];
  const side_window_pillars = new THREE.InstancedMesh(
    side_window_pillarsGeom,
    goldTrimMat,
    pillarPositions.length * 2
  );
  side_window_pillars.name = "side_window_pillars";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of pillarPositions) {
      setInstance(side_window_pillars, detailIndex++, side * 0.835, 2.08, z, 0, 0, 0);
    }
  }
  side_window_pillars.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_window_pillars);

  const side_window_horizontal_railsGeom = new THREE.BoxGeometry(0.07, 0.065, 1.11);
  const side_window_horizontal_rails = new THREE.InstancedMesh(
    side_window_horizontal_railsGeom,
    goldTrimMat,
    8
  );
  side_window_horizontal_rails.name = "side_window_horizontal_rails";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.57, 0.57]) {
      setInstance(
        side_window_horizontal_rails,
        detailIndex++,
        side * 0.838,
        1.65,
        z,
        0,
        0,
        0
      );
      setInstance(
        side_window_horizontal_rails,
        detailIndex++,
        side * 0.838,
        2.47,
        z,
        0,
        0,
        0
      );
    }
  }
  side_window_horizontal_rails.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_window_horizontal_rails);

  const side_window_corner_postsGeom = new THREE.BoxGeometry(0.09, 0.96, 0.09);
  const side_window_corner_posts = new THREE.InstancedMesh(
    side_window_corner_postsGeom,
    goldTrimMat,
    4
  );
  side_window_corner_posts.name = "side_window_corner_posts";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-2.16, 2.08]) {
      setInstance(
        side_window_corner_posts,
        detailIndex++,
        side * 0.80,
        2.08,
        z,
        0,
        0,
        0
      );
    }
  }
  side_window_corner_posts.instanceMatrix.needsUpdate = true;
  cabin_group.add(side_window_corner_posts);

  const front_windshieldsGeom = new THREE.BoxGeometry(0.68, 0.76, 0.018);
  const front_windshields = new THREE.InstancedMesh(front_windshieldsGeom, glassMat, 2);
  front_windshields.name = "front_windshields";
  setInstance(front_windshields, 0, -0.37, 2.10, 2.178, 0, 0, 0);
  setInstance(front_windshields, 1, 0.37, 2.10, 2.178, 0, 0, 0);
  front_windshields.instanceMatrix.needsUpdate = true;
  cabin_group.add(front_windshields);

  const windshield_horizontal_frameGeom = new THREE.BoxGeometry(1.52, 0.07, 0.065);
  const windshield_horizontal_frame = new THREE.InstancedMesh(
    windshield_horizontal_frameGeom,
    goldTrimMat,
    2
  );
  windshield_horizontal_frame.name = "windshield_horizontal_frame";
  setInstance(windshield_horizontal_frame, 0, 0, 1.66, 2.19, 0, 0, 0);
  setInstance(windshield_horizontal_frame, 1, 0, 2.47, 2.19, 0, 0, 0);
  windshield_horizontal_frame.instanceMatrix.needsUpdate = true;
  cabin_group.add(windshield_horizontal_frame);

  const windshield_vertical_frameGeom = new THREE.BoxGeometry(0.075, 0.88, 0.065);
  const windshield_vertical_frame = new THREE.InstancedMesh(
    windshield_vertical_frameGeom,
    goldTrimMat,
    3
  );
  windshield_vertical_frame.name = "windshield_vertical_frame";
  setInstance(windshield_vertical_frame, 0, -0.74, 2.08, 2.19, 0, 0, 0);
  setInstance(windshield_vertical_frame, 1, 0, 2.08, 2.19, 0, 0, 0);
  setInstance(windshield_vertical_frame, 2, 0.74, 2.08, 2.19, 0, 0, 0);
  windshield_vertical_frame.instanceMatrix.needsUpdate = true;
  cabin_group.add(windshield_vertical_frame);

  const rear_windowGeom = new THREE.BoxGeometry(1.42, 0.76, 0.018);
  const rear_window = new THREE.Mesh(rear_windowGeom, glassMat);
  rear_window.name = "rear_window";
  rear_window.position.set(0, 2.10, -2.18);
  cabin_group.add(rear_window);

  const rear_window_frame_horizontalGeom = new THREE.BoxGeometry(1.54, 0.07, 0.065);
  const rear_window_frame_horizontal = new THREE.InstancedMesh(
    rear_window_frame_horizontalGeom,
    goldTrimMat,
    2
  );
  rear_window_frame_horizontal.name = "rear_window_frame_horizontal";
  setInstance(rear_window_frame_horizontal, 0, 0, 1.66, -2.19, 0, 0, 0);
  setInstance(rear_window_frame_horizontal, 1, 0, 2.47, -2.19, 0, 0, 0);
  rear_window_frame_horizontal.instanceMatrix.needsUpdate = true;
  cabin_group.add(rear_window_frame_horizontal);

  const rear_window_frame_verticalGeom = new THREE.BoxGeometry(0.075, 0.88, 0.065);
  const rear_window_frame_vertical = new THREE.InstancedMesh(
    rear_window_frame_verticalGeom,
    goldTrimMat,
    2
  );
  rear_window_frame_vertical.name = "rear_window_frame_vertical";
  setInstance(rear_window_frame_vertical, 0, -0.74, 2.08, -2.19, 0, 0, 0);
  setInstance(rear_window_frame_vertical, 1, 0.74, 2.08, -2.19, 0, 0, 0);
  rear_window_frame_vertical.instanceMatrix.needsUpdate = true;
  cabin_group.add(rear_window_frame_vertical);

  const roofShape = new THREE.Shape();
  roofShape.moveTo(-1.04, 0);
  roofShape.bezierCurveTo(-1.02, 0.16, -0.72, 0.29, -0.36, 0.33);
  roofShape.bezierCurveTo(-0.14, 0.355, 0.14, 0.355, 0.36, 0.33);
  roofShape.bezierCurveTo(0.72, 0.29, 1.02, 0.16, 1.04, 0);
  roofShape.lineTo(-1.04, 0);

  const roofGeom = new THREE.ExtrudeGeometry(roofShape, {
    depth: 4.76,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const roof = new THREE.Mesh(roofGeom, goldMat);
  roof.name = "roof";
  roof.position.set(0, windowTop + 0.01, -2.38);
  cabin_group.add(roof);

  const roof_edge_railsGeom = new THREE.CylinderGeometry(0.035, 0.035, 4.78, 10);
  const roof_edge_rails = new THREE.InstancedMesh(roof_edge_railsGeom, blackPaintMat, 2);
  roof_edge_rails.name = "roof_edge_rails";
  setInstance(roof_edge_rails, 0, -1.035, 2.61, 0, Math.PI / 2, 0, 0);
  setInstance(roof_edge_rails, 1, 1.035, 2.61, 0, Math.PI / 2, 0, 0);
  roof_edge_rails.instanceMatrix.needsUpdate = true;
  cabin_group.add(roof_edge_rails);

  const roof_seams = new THREE.Group();
  roof_seams.name = "roof_seams";
  for (const z of [-1.15, 0, 1.15]) {
    const seamPoints = [
      new THREE.Vector3(-1.01, 2.65, z),
      new THREE.Vector3(-0.72, 2.80, z),
      new THREE.Vector3(0, 2.91, z),
      new THREE.Vector3(0.72, 2.80, z),
      new THREE.Vector3(1.01, 2.65, z)
    ];
    const seamGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(seamPoints),
      20,
      0.009,
      6,
      false
    );
    const seam = new THREE.Mesh(seamGeom, goldTrimMat);
    roof_seams.add(seam);
  }
  cabin_group.add(roof_seams);

  const roof_guttersGeom = new THREE.CylinderGeometry(0.022, 0.022, 4.82, 8);
  const roof_gutters = new THREE.InstancedMesh(roof_guttersGeom, goldTrimMat, 2);
  roof_gutters.name = "roof_gutters";
  setInstance(roof_gutters, 0, -1.065, 2.58, 0, Math.PI / 2, 0, 0);
  setInstance(roof_gutters, 1, 1.065, 2.58, 0, Math.PI / 2, 0, 0);
  roof_gutters.instanceMatrix.needsUpdate = true;
  cabin_group.add(roof_gutters);

  const front_canopyGeom = new THREE.BoxGeometry(1.78, 0.055, 0.34);
  const front_canopy = new THREE.Mesh(front_canopyGeom, goldMat);
  front_canopy.name = "front_canopy";
  front_canopy.position.set(0, 2.60, 2.36);
  front_canopy.rotation.x = -0.10;
  cabin_group.add(front_canopy);

  const front_canopy_trimGeom = new THREE.CylinderGeometry(0.035, 0.035, 1.78, 10);
  const front_canopy_trim = new THREE.Mesh(front_canopy_trimGeom, blackPaintMat);
  front_canopy_trim.name = "front_canopy_trim";
  front_canopy_trim.rotation.z = Math.PI / 2;
  front_canopy_trim.position.set(0, 2.57, 2.52);
  cabin_group.add(front_canopy_trim);

  const floorGeom = new THREE.BoxGeometry(1.43, 0.10, 3.92);
  const floor = new THREE.Mesh(floorGeom, blackPaintMat);
  floor.name = "floor";
  floor.position.set(0, 1.03, -0.02);
  interior_group.add(floor);

  const interior_ceilingGeom = new THREE.BoxGeometry(1.43, 0.06, 4.02);
  const interior_ceiling = new THREE.Mesh(interior_ceilingGeom, leatherSeamMat);
  interior_ceiling.name = "interior_ceiling";
  interior_ceiling.position.set(0, 2.48, -0.02);
  interior_group.add(interior_ceiling);

  const seatRows = [-1.42, -0.47, 0.48];

  const seat_bottomsGeom = new THREE.BoxGeometry(1.34, 0.16, 0.54);
  const seat_bottoms = new THREE.InstancedMesh(seat_bottomsGeom, leatherMat, seatRows.length);
  seat_bottoms.name = "seat_bottoms";
  for (let i = 0; i < seatRows.length; i++) {
    setInstance(seat_bottoms, i, 0, 1.33, seatRows[i], 0, 0, 0);
  }
  seat_bottoms.instanceMatrix.needsUpdate = true;
  interior_group.add(seat_bottoms);

  const seat_backsGeom = new THREE.BoxGeometry(1.34, 0.56, 0.14);
  const seat_backs = new THREE.InstancedMesh(seat_backsGeom, leatherMat, seatRows.length);
  seat_backs.name = "seat_backs";
  for (let i = 0; i < seatRows.length; i++) {
    setInstance(seat_backs, i, 0, 1.68, seatRows[i] - 0.27, -0.10, 0, 0);
  }
  seat_backs.instanceMatrix.needsUpdate = true;
  interior_group.add(seat_backs);

  const seat_back_topsGeom = new THREE.CylinderGeometry(0.075, 0.075, 1.34, 14);
  const seat_back_tops = new THREE.InstancedMesh(
    seat_back_topsGeom,
    leatherMat,
    seatRows.length
  );
  seat_back_tops.name = "seat_back_tops";
  for (let i = 0; i < seatRows.length; i++) {
    setInstance(
      seat_back_tops,
      i,
      0,
      1.98,
      seatRows[i] - 0.30,
      0,
      0,
      Math.PI / 2
    );
  }
  seat_back_tops.instanceMatrix.needsUpdate = true;
  interior_group.add(seat_back_tops);

  const seat_channelsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.43, 7);
  const seat_channels = new THREE.InstancedMesh(
    seat_channelsGeom,
    leatherSeamMat,
    seatRows.length * 7
  );
  seat_channels.name = "seat_channels";
  detailIndex = 0;
  for (const rowZ of seatRows) {
    for (const x of [-0.50, -0.30, -0.10, 0.10, 0.30, 0.50]) {
      setInstance(
        seat_channels,
        detailIndex++,
        x,
        1.68,
        rowZ - 0.19,
        -0.10,
        0,
        0
      );
    }
  }
  seat_channels.instanceMatrix.needsUpdate = true;
  interior_group.add(seat_channels);

  const seat_front_pipingGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.30, 8);
  const seat_front_piping = new THREE.InstancedMesh(
    seat_front_pipingGeom,
    leatherSeamMat,
    seatRows.length
  );
  seat_front_piping.name = "seat_front_piping";
  for (let i = 0; i < seatRows.length; i++) {
    setInstance(
      seat_front_piping,
      i,
      0,
      1.42,
      seatRows[i] + 0.275,
      0,
      0,
      Math.PI / 2
    );
  }
  seat_front_piping.instanceMatrix.needsUpdate = true;
  interior_group.add(seat_front_piping);

  const dashboardGeom = new THREE.BoxGeometry(1.38, 0.25, 0.20);
  const dashboard = new THREE.Mesh(dashboardGeom, leatherMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.55, 1.96);
  interior_group.add(dashboard);

  const steering_wheelGeom = new THREE.TorusGeometry(0.18, 0.022, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, blackPaintMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(-0.40, 1.72, 1.68);
  steering_wheel.rotation.x = -0.34;
  interior_group.add(steering_wheel);

  const steering_hubGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.055, 12);
  const steering_hub = new THREE.Mesh(steering_hubGeom, wheelMat);
  steering_hub.name = "steering_hub";
  steering_hub.rotation.x = Math.PI / 2 - 0.34;
  steering_hub.position.set(-0.40, 1.72, 1.68);
  interior_group.add(steering_hub);

  const steering_column = addTube(
    interior_group,
    "steering_column",
    new THREE.Vector3(-0.40, 1.70, 1.69),
    new THREE.Vector3(-0.40, 1.48, 1.93),
    0.018,
    wheelMat
  );

  const chassis_railsGeom = new THREE.BoxGeometry(0.10, 0.13, 4.12);
  const chassis_rails = new THREE.InstancedMesh(chassis_railsGeom, blackPaintMat, 2);
  chassis_rails.name = "chassis_rails";
  setInstance(chassis_rails, 0, -0.55, 0.67, -0.02, 0, 0, 0);
  setInstance(chassis_rails, 1, 0.55, 0.67, -0.02, 0, 0, 0);
  chassis_rails.instanceMatrix.needsUpdate = true;
  running_gear_group.add(chassis_rails);

  const axlesGeom = new THREE.CylinderGeometry(0.055, 0.055, 1.82, 12);
  const axles = new THREE.InstancedMesh(axlesGeom, wheelMat, 2);
  axles.name = "axles";
  setInstance(axles, 0, 0, wheelY, frontAxleZ, 0, 0, Math.PI / 2);
  setInstance(axles, 1, 0, wheelY, rearAxleZ, 0, 0, Math.PI / 2);
  axles.instanceMatrix.needsUpdate = true;
  running_gear_group.add(axles);

  const running_boardsGeom = new THREE.BoxGeometry(0.25, 0.09, 1.62);
  const running_boards = new THREE.InstancedMesh(running_boardsGeom, blackPaintMat, 2);
  running_boards.name = "running_boards";
  setInstance(running_boards, 0, -0.96, 0.66, -0.03, 0, 0, 0);
  setInstance(running_boards, 1, 0.96, 0.66, -0.03, 0, 0, 0);
  running_boards.instanceMatrix.needsUpdate = true;
  running_gear_group.add(running_boards);

  const running_board_ridgesGeom = new THREE.BoxGeometry(0.018, 0.014, 1.52);
  const running_board_ridges = new THREE.InstancedMesh(
    running_board_ridgesGeom,
    wheelMat,
    12
  );
  running_board_ridges.name = "running_board_ridges";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const x of [0.87, 0.91, 0.95, 0.99, 1.03, 1.07]) {
      setInstance(
        running_board_ridges,
        detailIndex++,
        x,
        0.715,
        -0.03,
        0,
        0,
        0
      );
    }
  }
  running_board_ridges.instanceMatrix.needsUpdate = true;
  running_gear_group.add(running_board_ridges);

  const step_hinges = new THREE.Group();
  step_hinges.name = "step_hinges";
  for (const side of [-1, 1]) {
    addTube(
      step_hinges,
      "step_hinge",
      new THREE.Vector3(side * 0.79, 0.77, -0.72),
      new THREE.Vector3(side * 1.02, 0.68, -0.72),
      0.025,
      wheelMat
    );
    addTube(
      step_hinges,
      "step_hinge",
      new THREE.Vector3(side * 0.79, 0.77, 0.66),
      new THREE.Vector3(side * 1.02, 0.68, 0.66),
      0.025,
      wheelMat
    );
  }
  running_gear_group.add(step_hinges);

  const tireGeom = new THREE.TorusGeometry(0.43, 0.145, 12, 32);
  const tires = new THREE.InstancedMesh(tireGeom, rubberMat, 4);
  tires.name = "tires";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [frontAxleZ, rearAxleZ]) {
      setInstance(tires, detailIndex++, side * wheelX, wheelY, z, 0, Math.PI / 2, 0);
    }
  }
  tires.instanceMatrix.needsUpdate = true;
  running_gear_group.add(tires);

  const wheel_rimsGeom = new THREE.TorusGeometry(0.355, 0.035, 8, 28);
  const wheel_rims = new THREE.InstancedMesh(wheel_rimsGeom, wheelMat, 4);
  wheel_rims.name = "wheel_rims";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_rims,
        detailIndex++,
        side * (wheelX + 0.135),
        wheelY,
        z,
        0,
        Math.PI / 2,
        0
      );
    }
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  running_gear_group.add(wheel_rims);

  const wheel_spokesGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.29, 7);
  const wheel_spokes = new THREE.InstancedMesh(wheel_spokesGeom, wheelMat, 48);
  wheel_spokes.name = "wheel_spokes";
  const up = new THREE.Vector3(0, 1, 0);
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const axleZ of [frontAxleZ, rearAxleZ]) {
      for (let i = 0; i < 12; i++) {
        const angle = i / 12 * Math.PI * 2;
        const direction = new THREE.Vector3(0, Math.cos(angle), Math.sin(angle));
        dummy.position.set(
          side * (wheelX + 0.14),
          wheelY + direction.y * 0.225,
          axleZ + direction.z * 0.225
        );
        dummy.scale.set(1, 1, 1);
        dummy.quaternion.setFromUnitVectors(up, direction);
        dummy.updateMatrix();
        wheel_spokes.setMatrixAt(detailIndex++, dummy.matrix);
      }
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  running_gear_group.add(wheel_spokes);

  const wheel_hubsGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.18, 16);
  const wheel_hubs = new THREE.InstancedMesh(wheel_hubsGeom, wheelMat, 4);
  wheel_hubs.name = "wheel_hubs";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_hubs,
        detailIndex++,
        side * (wheelX + 0.12),
        wheelY,
        z,
        0,
        0,
        Math.PI / 2
      );
    }
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  running_gear_group.add(wheel_hubs);

  const wheel_hub_capsGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.035, 14);
  const wheel_hub_caps = new THREE.InstancedMesh(wheel_hub_capsGeom, goldTrimMat, 4);
  wheel_hub_caps.name = "wheel_hub_caps";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_hub_caps,
        detailIndex++,
        side * (wheelX + 0.225),
        wheelY,
        z,
        0,
        0,
        Math.PI / 2
      );
    }
  }
  wheel_hub_caps.instanceMatrix.needsUpdate = true;
  running_gear_group.add(wheel_hub_caps);

  const fenderShape = new THREE.Shape();
  const outerFenderR = 0.75;
  const innerFenderR = 0.64;
  const fenderStart = Math.PI * 0.05;
  const fenderEnd = Math.PI * 0.95;
  const fenderSegments = 24;

  for (let i = 0; i <= fenderSegments; i++) {
    const angle = fenderStart + (fenderEnd - fenderStart) * i / fenderSegments;
    const x = Math.cos(angle) * outerFenderR;
    const y = Math.sin(angle) * outerFenderR;
    if (i === 0) {
      fenderShape.moveTo(x, y);
    } else {
      fenderShape.lineTo(x, y);
    }
  }
  for (let i = fenderSegments; i >= 0; i--) {
    const angle = fenderStart + (fenderEnd - fenderStart) * i / fenderSegments;
    fenderShape.lineTo(
      Math.cos(angle) * innerFenderR,
      Math.sin(angle) * innerFenderR
    );
  }
  fenderShape.closePath();

  const fenderDepth = 0.17;
  const wheel_fendersGeom = new THREE.ExtrudeGeometry(fenderShape, {
    depth: fenderDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  wheel_fendersGeom.translate(0, 0, -fenderDepth * 0.5);

  const wheel_fenders = new THREE.InstancedMesh(wheel_fendersGeom, blackPaintMat, 4);
  wheel_fenders.name = "wheel_fenders";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [frontAxleZ, rearAxleZ]) {
      setInstance(
        wheel_fenders,
        detailIndex++,
        side * 0.845,
        wheelY,
        z,
        0,
        Math.PI / 2,
        0
      );
    }
  }
  wheel_fenders.instanceMatrix.needsUpdate = true;
  running_gear_group.add(wheel_fenders);

  const front_fender_extensionsGeom = new THREE.SphereGeometry(1, 22, 12);
  const front_fender_extensions = new THREE.InstancedMesh(
    front_fender_extensionsGeom,
    goldMat,
    2
  );
  front_fender_extensions.name = "front_fender_extensions";
  setInstance(
    front_fender_extensions,
    0,
    -0.845,
    0.76,
    frontAxleZ,
    0,
    0,
    0,
    0.10,
    0.20,
    0.78
  );
  setInstance(
    front_fender_extensions,
    1,
    0.845,
    0.76,
    frontAxleZ,
    0,
    0,
    0,
    0.10,
    0.20,
    0.78
  );
  front_fender_extensions.instanceMatrix.needsUpdate = true;
  running_gear_group.add(front_fender_extensions);

  const front_bumperGeom = new THREE.BoxGeometry(1.92, 0.16, 0.16);
  const front_bumper = new THREE.Mesh(front_bumperGeom, blackPaintMat);
  front_bumper.name = "front_bumper";
  front_bumper.position.set(0, 0.56, frontZ + 0.12);
  front_group.add(front_bumper);

  const front_bumper_guardsGeom = new THREE.BoxGeometry(0.12, 0.34, 0.12);
  const front_bumper_guards = new THREE.InstancedMesh(
    front_bumper_guardsGeom,
    blackPaintMat,
    2
  );
  front_bumper_guards.name = "front_bumper_guards";
  setInstance(front_bumper_guards, 0, -0.70, 0.68, frontZ + 0.14, 0, 0, 0);
  setInstance(front_bumper_guards, 1, 0.70, 0.68, frontZ + 0.14, 0, 0, 0);
  front_bumper_guards.instanceMatrix.needsUpdate = true;
  front_group.add(front_bumper_guards);

  const front_grille_insetGeom = new THREE.CircleGeometry(0.29, 32);
  const front_grille_inset = new THREE.Mesh(front_grille_insetGeom, brassDarkMat);
  front_grille_inset.name = "front_grille_inset";
  front_grille_inset.position.set(0, 1.28, frontZ + 0.012);
  front_group.add(front_grille_inset);

  const front_grille_ringGeom = new THREE.TorusGeometry(0.31, 0.045, 10, 32);
  const front_grille_ring = new THREE.Mesh(front_grille_ringGeom, goldTrimMat);
  front_grille_ring.name = "front_grille_ring";
  front_grille_ring.position.set(0, 1.28, frontZ + 0.035);
  front_group.add(front_grille_ring);

  const grille_slatsGeom = new THREE.BoxGeometry(0.025, 1, 0.025);
  const grille_slats = new THREE.InstancedMesh(grille_slatsGeom, goldTrimMat, 9);
  grille_slats.name = "grille_slats";
  for (let i = 0; i < 9; i++) {
    const x = (i - 4) * 0.06;
    const halfHeight = Math.sqrt(Math.max(0, 0.255 * 0.255 - x * x));
    setInstance(
      grille_slats,
      i,
      x,
      1.28,
      frontZ + 0.055,
      0,
      0,
      0,
      1,
      halfHeight * 1.82,
      1
    );
  }
  grille_slats.instanceMatrix.needsUpdate = true;
  front_group.add(grille_slats);

  const engine_cowl_ribsGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.48, 7);
  const engine_cowl_ribs = new THREE.InstancedMesh(engine_cowl_ribsGeom, goldTrimMat, 24);
  engine_cowl_ribs.name = "engine_cowl_ribs";
  detailIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      setInstance(
        engine_cowl_ribs,
        detailIndex++,
        side * 0.835,
        1.28,
        1.80 + i * 0.043,
        0,
        0,
        0
      );
    }
  }
  engine_cowl_ribs.instanceMatrix.needsUpdate = true;
  front_group.add(engine_cowl_ribs);

  const headlight_housingsGeom = new THREE.CylinderGeometry(0.18, 0.16, 0.16, 20);
  const headlight_housings = new THREE.InstancedMesh(
    headlight_housingsGeom,
    goldMat,
    2
  );
  headlight_housings.name = "headlight_housings";
  setInstance(headlight_housings, 0, -0.59, 1.26, 2.39, Math.PI / 2, 0, 0);
  setInstance(headlight_housings, 1, 0.59, 1.26, 2.39, Math.PI / 2, 0, 0);
  headlight_housings.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_housings);

  const headlight_lensesGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.025, 20);
  const headlight_lenses = new THREE.InstancedMesh(
    headlight_lensesGeom,
    headlightMat,
    2
  );
  headlight_lenses.name = "headlight_lenses";
  setInstance(headlight_lenses, 0, -0.59, 1.26, 2.485, Math.PI / 2, 0, 0);
  setInstance(headlight_lenses, 1, 0.59, 1.26, 2.485, Math.PI / 2, 0, 0);
  headlight_lenses.instanceMatrix.needsUpdate = true;
  front_group.add(headlight_lenses);

  const headlight_brackets = new THREE.Group();
  headlight_brackets.name = "headlight_brackets";
  addTube(
    headlight_brackets,
    "left_headlight_bracket",
    new THREE.Vector3(-0.59, 1.12, 2.28),
    new THREE.Vector3(-0.59, 1.23, 2.38),
    0.025,
    goldTrimMat
  );
  addTube(
    headlight_brackets,
    "right_headlight_bracket",
    new THREE.Vector3(0.59, 1.12, 2.28),
    new THREE.Vector3(0.59, 1.23, 2.38),
    0.025,
    goldTrimMat
  );
  front_group.add(headlight_brackets);

  const steam_domeProfile = [
    new THREE.Vector2(0.15, 0),
    new THREE.Vector2(0.18, 0.08),
    new THREE.Vector2(0.12, 0.16),
    new THREE.Vector2(0.10, 0.34),
    new THREE.Vector2(0.16, 0.43),
    new THREE.Vector2(0.14, 0.51),
    new THREE.Vector2(0.06, 0.58),
    new THREE.Vector2(0.04, 0.66),
    new THREE.Vector2(0, 0.69)
  ];
  const steam_domeGeom = new THREE.LatheGeometry(steam_domeProfile, 24);
  const steam_dome = new THREE.Mesh(steam_domeGeom, goldMat);
  steam_dome.name = "steam_dome";
  steam_dome.position.set(0, 1.53, 2.08);
  front_group.add(steam_dome);

  const steam_dome_baseGeom = new THREE.TorusGeometry(0.15, 0.025, 8, 24);
  const steam_dome_base = new THREE.Mesh(steam_dome_baseGeom, goldTrimMat);
  steam_dome_base.name = "steam_dome_base";
  steam_dome_base.rotation.x = Math.PI / 2;
  steam_dome_base.position.set(0, 1.57, 2.08);
  front_group.add(steam_dome_base);

  const front_latchesGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.18, 8);
  const front_latches = new THREE.InstancedMesh(front_latchesGeom, goldTrimMat, 2);
  front_latches.name = "front_latches";
  setInstance(front_latches, 0, -0.56, 1.54, frontZ + 0.01, 0, 0, 0);
  setInstance(front_latches, 1, 0.56, 1.54, frontZ + 0.01, 0, 0, 0);
  front_latches.instanceMatrix.needsUpdate = true;
  front_group.add(front_latches);

  const rear_bumperGeom = new THREE.BoxGeometry(1.88, 0.16, 0.17);
  const rear_bumper = new THREE.Mesh(rear_bumperGeom, blackPaintMat);
  rear_bumper.name = "rear_bumper";
  rear_bumper.position.set(0, 0.58, rearZ - 0.12);
  rear_group.add(rear_bumper);

  const rear_lamp_mountGeom = new THREE.BoxGeometry(0.42, 0.34, 0.18);
  const rear_lamp_mount = new THREE.Mesh(rear_lamp_mountGeom, blackPaintMat);
  rear_lamp_mount.name = "rear_lamp_mount";
  rear_lamp_mount.position.set(0.62, 0.84, rearZ - 0.10);
  rear_group.add(rear_lamp_mount);

  const rear_lamp_housingGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16);
  const rear_lamp_housing = new THREE.Mesh(rear_lamp_housingGeom, blackPaintMat);
  rear_lamp_housing.name = "rear_lamp_housing";
  rear_lamp_housing.rotation.x = Math.PI / 2;
  rear_lamp_housing.position.set(0.62, 1.00, rearZ - 0.22);
  rear_group.add(rear_lamp_housing);

  const rear_lamp_lensGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.02, 16);
  const rear_lamp_lens = new THREE.Mesh(rear_lamp_lensGeom, tailLightMat);
  rear_lamp_lens.name = "rear_lamp_lens";
  rear_lamp_lens.rotation.x = Math.PI / 2;
  rear_lamp_lens.position.set(0.62, 1.00, rearZ - 0.29);
  rear_group.add(rear_lamp_lens);

  const rear_supports = new THREE.Group();
  rear_supports.name = "rear_supports";
  addTube(
    rear_supports,
    "rear_left_support",
    new THREE.Vector3(-0.68, 0.58, rearZ - 0.08),
    new THREE.Vector3(-0.68, 1.12, rearZ - 0.08),
    0.025,
    blackPaintMat
  );
  addTube(
    rear_supports,
    "rear_right_support",
    new THREE.Vector3(0.68, 0.58, rearZ - 0.08),
    new THREE.Vector3(0.68, 1.12, rearZ - 0.08),
    0.025,
    blackPaintMat
  );
  rear_group.add(rear_supports);

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