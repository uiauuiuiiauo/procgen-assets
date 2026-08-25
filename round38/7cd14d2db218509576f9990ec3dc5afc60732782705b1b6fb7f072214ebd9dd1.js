export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "countertop_blender";

  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glossy_blackMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.3,
  });
  const control_panelMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const frosted_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eeee,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
  });
  const juiceMat = new THREE.MeshStandardMaterial({
    color: 0xf5c515,
    metalness: 0.0,
    roughness: 0.7,
  });
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xffdb55,
    metalness: 0.0,
    roughness: 0.7,
  });
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffe78a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x3b3b3b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectPoints(width, depth, radius, cornerSegments) {
    const points = [];
    const halfWidth = width * 0.5;
    const halfDepth = depth * 0.5;
    const corners = [
      [halfWidth - radius, halfDepth - radius, 0],
      [-halfWidth + radius, halfDepth - radius, Math.PI * 0.5],
      [-halfWidth + radius, -halfDepth + radius, Math.PI],
      [halfWidth - radius, -halfDepth + radius, Math.PI * 1.5],
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (
        let segmentIndex = 0;
        segmentIndex <= cornerSegments;
        segmentIndex++
      ) {
        const angle =
          corner[2] +
          (segmentIndex / cornerSegments) * Math.PI * 0.5;
        points.push([
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
        ]);
      }
    }
    return points;
  }

  function createRoundedFrustumGeometry(
    bottomWidth,
    bottomDepth,
    topWidth,
    topDepth,
    height,
    bottomRadius,
    topRadius
  ) {
    const bottomPoints = roundedRectPoints(
      bottomWidth,
      bottomDepth,
      bottomRadius,
      5
    );
    const topPoints = roundedRectPoints(
      topWidth,
      topDepth,
      topRadius,
      5
    );
    const count = bottomPoints.length;
    const positions = [];
    const indices = [];

    for (let i = 0; i < count; i++) {
      positions.push(bottomPoints[i][0], 0, bottomPoints[i][1]);
    }
    for (let i = 0; i < count; i++) {
      positions.push(topPoints[i][0], height, topPoints[i][1]);
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, 0, 0);
    const topCenter = positions.length / 3;
    positions.push(0, height, 0);

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      indices.push(i, next, count + next);
      indices.push(i, count + next, count + i);
      indices.push(bottomCenter, next, i);
      indices.push(topCenter, count + i, count + next);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const bottom_plinthGeom = createRoundedFrustumGeometry(
    2.58,
    2.18,
    2.58,
    2.18,
    0.24,
    0.2,
    0.2
  );
  const bottom_plinth = new THREE.Mesh(bottom_plinthGeom, black_plasticMat);
  bottom_plinth.name = "bottom_plinth";
  root.add(bottom_plinth);

  const upper_plinthGeom = createRoundedFrustumGeometry(
    2.5,
    2.1,
    2.36,
    1.98,
    0.16,
    0.2,
    0.18,
  );
  const upper_plinth = new THREE.Mesh(upper_plinthGeom, black_plasticMat);
  upper_plinth.name = "upper_plinth";
  upper_plinth.position.y = 0.2;
  root.add(upper_plinth);

  const main_housingGeom = createRoundedFrustumGeometry(
    2.34,
    1.94,
    1.86,
    1.58,
    1.94,
    0.18,
    0.22,
  );
  const main_housing = new THREE.Mesh(main_housingGeom, black_plasticMat);
  main_housing.name = "main_housing";
  main_housing.position.y = 0.34;
  root.add(main_housing);

  const housing_topGeom = createRoundedFrustumGeometry(
    1.88,
    1.6,
    1.72,
    1.48,
    0.14,
    0.22,
    0.2,
  );
  const housing_top = new THREE.Mesh(housing_topGeom, black_plasticMat);
  housing_top.name = "housing_top";
  housing_top.position.y = 2.2;
  root.add(housing_top);

  const feetGeom = new THREE.CylinderGeometry(0.16, 0.17, 0.12, 20);
  const feet = new THREE.InstancedMesh(feetGeom, rubberMat, 4);
  feet.name = "feet";
  const feet_dummy = new THREE.Object3D();
  const feet_positions = [
    [-0.96, 0.02, 0.77],
    [0.96, 0.02, 0.77],
    [-0.96, 0.02, -0.77],
    [0.96, 0.02, -0.77],
  ];
  for (let i = 0; i < feet_positions.length; i++) {
    feet_dummy.position.set(
      feet_positions[i][0],
      feet_positions[i][1],
      feet_positions[i][2]
    );
    feet_dummy.updateMatrix();
    feet.setMatrixAt(i, feet_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const control_panel_group = new THREE.Group();
  control_panel_group.name = "control_panel_group";
  control_panel_group.position.set(0, 1.05, 0.88);
  control_panel_group.rotation.x = -0.12;
  root.add(control_panel_group);

  const control_panelShape = new THREE.Shape();
  control_panelShape.moveTo(-0.63, -0.58);
  control_panelShape.lineTo(0.63, -0.58);
  control_panelShape.lineTo(0.52, 0.45);
  control_panelShape.quadraticCurveTo(0.5, 0.58, 0.38, 0.58);
  control_panelShape.lineTo(-0.38, 0.58);
  control_panelShape.quadraticCurveTo(-0.5, 0.58, -0.52, 0.45);
  control_panelShape.closePath();

  const control_panelGeom = new THREE.ExtrudeGeometry(control_panelShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  const control_panel = new THREE.Mesh(control_panelGeom, control_panelMat);
  control_panel.name = "control_panel";
  control_panel_group.add(control_panel);

  const brand_badgeGeom = new THREE.BoxGeometry(0.42, 0.13, 0.018);
  const brand_badge = new THREE.Mesh(brand_badgeGeom, glossy_blackMat);
  brand_badge.name = "brand_badge";
  brand_badge.position.set(0.02, 0.39, 0.075);
  control_panel_group.add(brand_badge);

  const brand_marksGeom = new THREE.BoxGeometry(0.035, 0.065, 0.012);
  const brand_marks = new THREE.InstancedMesh(
    brand_marksGeom,
    indicatorMat,
    5
  );
  brand_marks.name = "brand_marks";
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    brand_dummy.position.set(-0.1 + i * 0.055, 0.39, 0.088);
    brand_dummy.scale.set(1, i === 2 ? 0.7 : 1, 1);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, brand_dummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  control_panel_group.add(brand_marks);

  const speed_dial_ringGeom = new THREE.TorusGeometry(0.205, 0.035, 10, 28);
  const speed_dial_ring = new THREE.Mesh(
    speed_dial_ringGeom,
    glossy_blackMat
  );
  speed_dial_ring.name = "speed_dial_ring";
  speed_dial_ring.position.set(0.25, -0.16, 0.095);
  control_panel_group.add(speed_dial_ring);

  const speed_dialGeom = new THREE.CylinderGeometry(
    0.145,
    0.165,
    0.13,
    24
  );
  const speed_dial = new THREE.Mesh(speed_dialGeom, glossy_blackMat);
  speed_dial.name = "speed_dial";
  speed_dial.rotation.x = Math.PI * 0.5;
  speed_dial.position.set(0.25, -0.16, 0.145);
  control_panel_group.add(speed_dial);

  const speed_dial_faceGeom = new THREE.CylinderGeometry(
    0.105,
    0.105,
    0.018,
    24
  );
  const speed_dial_face = new THREE.Mesh(
    speed_dial_faceGeom,
    black_plasticMat
  );
  speed_dial_face.name = "speed_dial_face";
  speed_dial_face.rotation.x = Math.PI * 0.5;
  speed_dial_face.position.set(0.25, -0.16, 0.218);
  control_panel_group.add(speed_dial_face);

  const dial_ticksGeom = new THREE.BoxGeometry(0.018, 0.045, 0.012);
  const dial_ticks = new THREE.InstancedMesh(
    dial_ticksGeom,
    indicatorMat,
    7
  );
  dial_ticks.name = "dial_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    const angle = Math.PI * 0.15 + (i / 6) * Math.PI * 0.7;
    tick_dummy.position.set(
      0.25 + Math.cos(angle) * 0.29,
      -0.16 + Math.sin(angle) * 0.29,
      0.105
    );
    tick_dummy.rotation.set(0, 0, angle - Math.PI * 0.5);
    tick_dummy.updateMatrix();
    dial_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  control_panel_group.add(dial_ticks);

  const pulse_button_ringGeom = new THREE.TorusGeometry(
    0.18,
    0.03,
    10,
    28
  );
  const pulse_button_ring = new THREE.Mesh(
    pulse_button_ringGeom,
    glossy_blackMat
  );
  pulse_button_ring.name = "pulse_button_ring";
  pulse_button_ring.position.set(-0.38, -0.29, 0.095);
  control_panel_group.add(pulse_button_ring);

  const pulse_buttonGeom = new THREE.CylinderGeometry(
    0.115,
    0.135,
    0.1,
    24
  );
  const pulse_button = new THREE.Mesh(pulse_buttonGeom, glossy_blackMat);
  pulse_button.name = "pulse_button";
  pulse_button.rotation.x = Math.PI * 0.5;
  pulse_button.position.set(-0.38, -0.29, 0.14);
  control_panel_group.add(pulse_button);

  const pulse_button_faceGeom = new THREE.SphereGeometry(1, 20, 12);
  const pulse_button_face = new THREE.Mesh(
    pulse_button_faceGeom,
    glossy_blackMat
  );
  pulse_button_face.name = "pulse_button_face";
  pulse_button_face.scale.set(0.105, 0.105, 0.045);
  pulse_button_face.position.set(-0.38, -0.29, 0.2);
  control_panel_group.add(pulse_button_face);

  const motor_collarGeom = new THREE.CylinderGeometry(
    0.76,
    0.87,
    0.72,
    40
  );
  const motor_collar = new THREE.Mesh(motor_collarGeom, black_plasticMat);
  motor_collar.name = "motor_collar";
  motor_collar.position.y = 2.62;
  root.add(motor_collar);

  const collar_lower_ringGeom = new THREE.TorusGeometry(
    0.82,
    0.055,
    10,
    40
  );
  const collar_lower_ring = new THREE.Mesh(
    collar_lower_ringGeom,
    glossy_blackMat
  );
  collar_lower_ring.name = "collar_lower_ring";
  collar_lower_ring.rotation.x = Math.PI * 0.5;
  collar_lower_ring.position.y = 2.28;
  root.add(collar_lower_ring);

  const collar_upper_ringGeom = new THREE.TorusGeometry(
    0.75,
    0.06,
    10,
    40
  );
  const collar_upper_ring = new THREE.Mesh(
    collar_upper_ringGeom,
    glossy_blackMat
  );
  collar_upper_ring.name = "collar_upper_ring";
  collar_upper_ring.rotation.x = Math.PI * 0.5;
  collar_upper_ring.position.y = 2.98;
  root.add(collar_upper_ring);

  const jar_bottomGeom = new THREE.CylinderGeometry(
    0.78,
    0.75,
    0.1,
    16
  );
  const jar_bottom = new THREE.Mesh(jar_bottomGeom, glassMat);
  jar_bottom.name = "jar_bottom";
  jar_bottom.position.y = 3.04;
  root.add(jar_bottom);

  const jar_wallGeom = new THREE.CylinderGeometry(
    0.95,
    0.76,
    1.65,
    16,
    1,
    true
  );
  const jar_walls = new THREE.Mesh(jar_wallGeom, glassMat);
  jar_walls.name = "jar_walls";
  jar_walls.position.y = 3.845;
  root.add(jar_walls);

  const jar_corner_ribsGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    1,
    8
  );
  const jar_corner_ribs = new THREE.InstancedMesh(
    jar_corner_ribsGeom,
    frosted_glassMat,
    4
  );
  jar_corner_ribs.name = "jar_corner_ribs";
  const rib_dummy = new THREE.Object3D();
  const y_axis = new THREE.Vector3(0, 1, 0);
  const rib_angles = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75,
  ];
  for (let i = 0; i < rib_angles.length; i++) {
    const angle = rib_angles[i];
    const bottom = new THREE.Vector3(
      Math.cos(angle) * 0.75,
      3.05,
      Math.sin(angle) * 0.75
    );
    const top = new THREE.Vector3(
      Math.cos(angle) * 0.94,
      4.64,
      Math.sin(angle) * 0.94
    );
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const length = direction.length();
    rib_dummy.position.copy(bottom).add(top).multiplyScalar(0.5);
    rib_dummy.quaternion.setFromUnitVectors(
      y_axis,
      direction.clone().normalize()
    );
    rib_dummy.scale.set(1, length, 1);
    rib_dummy.updateMatrix();
    jar_corner_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  jar_corner_ribs.instanceMatrix.needsUpdate = true;
  root.add(jar_corner_ribs);

  const jar_top_rimGeom = new THREE.TorusGeometry(0.94, 0.035, 10, 48);
  const jar_top_rim = new THREE.Mesh(jar_top_rimGeom, glassMat);
  jar_top_rim.name = "jar_top_rim";
  jar_top_rim.rotation.x = Math.PI * 0.5;
  jar_top_rim.position.y = 4.67;
  root.add(jar_top_rim);

  const pour_spoutShape = new THREE.Shape();
  pour_spoutShape.moveTo(-0.02, -0.06);
  pour_spoutShape.lineTo(-0.3, -0.025);
  pour_spoutShape.quadraticCurveTo(-0.4, -0.01, -0.42, 0.05);
  pour_spoutShape.quadraticCurveTo(-0.34, 0.1, -0.15, 0.09);
  pour_spoutShape.lineTo(0.02, 0.055);
  pour_spoutShape.closePath();

  const pour_spoutGeom = new THREE.ExtrudeGeometry(pour_spoutShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  pour_spoutGeom.translate(0, 0, -0.08);
  const pour_spout = new THREE.Mesh(pour_spoutGeom, glassMat);
  pour_spout.name = "pour_spout";
  pour_spout.position.set(-0.9, 4.64, 0);
  root.add(pour_spout);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.88, 4.56, 0),
      new THREE.Vector3(1.18, 4.56, 0),
      new THREE.Vector3(1.39, 4.45, 0),
      new THREE.Vector3(1.48, 4.2, 0),
      new THREE.Vector3(1.48, 3.55, 0),
      new THREE.Vector3(1.39, 3.28, 0),
      new THREE.Vector3(1.08, 3.08, 0),
      new THREE.Vector3(0.78, 2.99, 0),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handlePath,
    48,
    0.105,
    12,
    false
  );
  const handle = new THREE.Mesh(handleGeom, glassMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(1, 20, 12);
  const handle_upper_mount = new THREE.Mesh(handle_mountGeom, glassMat);
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.scale.set(0.2, 0.11, 0.15);
  handle_upper_mount.position.set(0.91, 4.55, 0);
  root.add(handle_upper_mount);

  const handle_lower_mount = new THREE.Mesh(handle_mountGeom, glassMat);
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.scale.set(0.22, 0.12, 0.16);
  handle_lower_mount.position.set(0.78, 3.0, 0);
  root.add(handle_lower_mount);

  const juiceGeom = new THREE.CylinderGeometry(
    0.87,
    0.7,
    1.2,
    16,
    1,
    false
  );
  const juice = new THREE.Mesh(juiceGeom, juiceMat);
  juice.name = "juice";
  juice.position.y = 3.5;
  root.add(juice);

  const juice_surfaceGeom = new THREE.CylinderGeometry(
    0.865,
    0.865,
    0.025,
    32
  );
  const juice_surface = new THREE.Mesh(juice_surfaceGeom, foamMat);
  juice_surface.name = "juice_surface";
  juice_surface.position.y = 4.105;
  root.add(juice_surface);

  const foam_ringGeom = new THREE.TorusGeometry(0.78, 0.035, 8, 40);
  const foam_ring = new THREE.Mesh(foam_ringGeom, foamMat);
  foam_ring.name = "foam_ring";
  foam_ring.rotation.x = Math.PI * 0.5;
  foam_ring.position.y = 4.125;
  root.add(foam_ring);

  const surface_bubblesGeom = new THREE.SphereGeometry(1, 10, 6);
  const surface_bubbles = new THREE.InstancedMesh(
    surface_bubblesGeom,
    bubbleMat,
    12
  );
  surface_bubbles.name = "surface_bubbles";
  const bubble_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 0.16 + (i % 4) * 0.13;
    const size = 0.012 + (i % 3) * 0.006;
    bubble_dummy.position.set(
      Math.cos(angle) * radius,
      4.13,
      Math.sin(angle) * radius
    );
    bubble_dummy.scale.set(size, size * 0.55, size);
    bubble_dummy.updateMatrix();
    surface_bubbles.setMatrixAt(i, bubble_dummy.matrix);
  }
  surface_bubbles.instanceMatrix.needsUpdate = true;
  root.add(surface_bubbles);

  const drive_shaftGeom = new THREE.CylinderGeometry(
    0.105,
    0.105,
    1.12,
    20
  );
  const drive_shaft = new THREE.Mesh(drive_shaftGeom, glossy_blackMat);
  drive_shaft.name = "drive_shaft";
  drive_shaft.position.y = 4.02;
  root.add(drive_shaft);

  const blade_hubGeom = new THREE.CylinderGeometry(
    0.13,
    0.13,
    0.12,
    20
  );
  const blade_hub = new THREE.Mesh(blade_hubGeom, silverMat);
  blade_hub.name = "blade_hub";
  blade_hub.position.y = 3.16;
  root.add(blade_hub);

  const bladeGeom = new THREE.BoxGeometry(0.5, 0.025, 0.075);
  const blade_left = new THREE.Mesh(bladeGeom, silverMat);
  blade_left.name = "blade_left";
  blade_left.position.y = 3.18;
  blade_left.rotation.y = 0.25;
  root.add(blade_left);

  const blade_right = new THREE.Mesh(bladeGeom, silverMat);
  blade_right.name = "blade_right";
  blade_right.position.y = 3.19;
  blade_right.rotation.y = Math.PI + 0.25;
  root.add(blade_right);

  const measurement_ticksGeom = new THREE.BoxGeometry(
    0.18,
    0.014,
    0.012
  );
  const measurement_ticks = new THREE.InstancedMesh(
    measurement_ticksGeom,
    markingMat,
    6
  );
  measurement_ticks.name = "measurement_ticks";
  const measurement_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    measurement_dummy.position.set(
      -0.38,
      3.28 + i * 0.2,
      0.77 + i * 0.018
    );
    measurement_dummy.scale.set(i % 2 === 0 ? 1 : 0.65, 1, 1);
    measurement_dummy.updateMatrix();
    measurement_ticks.setMatrixAt(i, measurement_dummy.matrix);
  }
  measurement_ticks.instanceMatrix.needsUpdate = true;
  root.add(measurement_ticks);

  const jar_lidProfile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.91, 0),
    new THREE.Vector2(0.98, 0.035),
    new THREE.Vector2(0.96, 0.075),
    new THREE.Vector2(0.82, 0.14),
    new THREE.Vector2(0.58, 0.21),
    new THREE.Vector2(0.3, 0.25),
    new THREE.Vector2(0, 0.26),
  ];
  const jar_lidGeom = new THREE.LatheGeometry(jar_lidProfile, 40);
  const jar_lid = new THREE.Mesh(jar_lidGeom, glassMat);
  jar_lid.name = "jar_lid";
  jar_lid.position.y = 4.64;
  root.add(jar_lid);

  const lid_rimGeom = new THREE.TorusGeometry(0.95, 0.03, 10, 48);
  const lid_rim = new THREE.Mesh(lid_rimGeom, frosted_glassMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI * 0.5;
  lid_rim.position.y = 4.68;
  root.add(lid_rim);

  const tower_bodyGeom = new THREE.CylinderGeometry(
    0.37,
    0.41,
    1.28,
    32
  );
  const tower_body = new THREE.Mesh(tower_bodyGeom, glossy_blackMat);
  tower_body.name = "tower_body";
  tower_body.position.y = 5.39;
  root.add(tower_body);

  const tower_base_ringGeom = new THREE.TorusGeometry(
    0.4,
    0.045,
    10,
    36
  );
  const tower_base_ring = new THREE.Mesh(
    tower_base_ringGeom,
    glossy_blackMat
  );
  tower_base_ring.name = "tower_base_ring";
  tower_base_ring.rotation.x = Math.PI * 0.5;
  tower_base_ring.position.y = 4.78;
  root.add(tower_base_ring);

  const tower_upper_collarGeom = new THREE.CylinderGeometry(
    0.45,
    0.45,
    0.25,
    32
  );
  const tower_upper_collar = new THREE.Mesh(
    tower_upper_collarGeom,
    glossy_blackMat
  );
  tower_upper_collar.name = "tower_upper_collar";
  tower_upper_collar.position.y = 6.02;
  root.add(tower_upper_collar);

  const tower_lower_bandGeom = new THREE.TorusGeometry(
    0.41,
    0.035,
    10,
    36
  );
  const tower_lower_band = new THREE.Mesh(
    tower_lower_bandGeom,
    black_plasticMat
  );
  tower_lower_band.name = "tower_lower_band";
  tower_lower_band.rotation.x = Math.PI * 0.5;
  tower_lower_band.position.y = 5.91;
  root.add(tower_lower_band);

  const tower_top_bandGeom = new THREE.TorusGeometry(
    0.43,
    0.035,
    10,
    36
  );
  const tower_top_band = new THREE.Mesh(
    tower_top_bandGeom,
    black_plasticMat
  );
  tower_top_band.name = "tower_top_band";
  tower_top_band.rotation.x = Math.PI * 0.5;
  tower_top_band.position.y = 6.13;
  root.add(tower_top_band);

  const tower_capProfile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.48, 0),
    new THREE.Vector2(0.52, 0.035),
    new THREE.Vector2(0.5, 0.12),
    new THREE.Vector2(0.43, 0.18),
    new THREE.Vector2(0.31, 0.25),
    new THREE.Vector2(0.16, 0.29),
    new THREE.Vector2(0, 0.3),
  ];
  const tower_capGeom = new THREE.LatheGeometry(tower_capProfile, 40);
  const tower_cap = new THREE.Mesh(tower_capGeom, glossy_blackMat);
  tower_cap.name = "tower_cap";
  tower_cap.position.y = 6.12;
  root.add(tower_cap);

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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

  fitToUnitCube(THREE, root);
  return root;
}