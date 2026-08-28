export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blender";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const pitcher_group = new THREE.Group();
  pitcher_group.name = "pitcher_group";
  root.add(pitcher_group);

  const red_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xd40018,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f2f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glass_ribMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf4f4,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    depthWrite: false,
  });
  const juiceMat = new THREE.MeshStandardMaterial({
    color: 0xf5a000,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.94,
  });
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xffc24a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xffe6a3,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.72,
  });

  const base_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.73, 0.00),
    new THREE.Vector2(0.81, 0.03),
    new THREE.Vector2(0.86, 0.10),
    new THREE.Vector2(0.87, 0.18),
    new THREE.Vector2(0.84, 0.29),
    new THREE.Vector2(0.78, 0.43),
    new THREE.Vector2(0.73, 0.64),
    new THREE.Vector2(0.68, 0.91),
    new THREE.Vector2(0.64, 1.20),
    new THREE.Vector2(0.61, 1.50),
    new THREE.Vector2(0.60, 1.72),
    new THREE.Vector2(0.59, 1.79),
    new THREE.Vector2(0.00, 1.79),
  ];
  const base_bodyGeom = new THREE.LatheGeometry(base_bodyProfile, 64);
  const base_body = new THREE.Mesh(base_bodyGeom, red_plasticMat);
  base_body.name = "base_body";
  base_group.add(base_body);

  const base_bottom_trimGeom = new THREE.CylinderGeometry(0.85, 0.80, 0.10, 64);
  const base_bottom_trim = new THREE.Mesh(base_bottom_trimGeom, black_plasticMat);
  base_bottom_trim.name = "base_bottom_trim";
  base_bottom_trim.position.y = -0.025;
  base_group.add(base_bottom_trim);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.075, 0.065, 0.075, 18);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const foot_transform = new THREE.Object3D();
  const foot_positions = [
    [-0.57, -0.085, 0.48],
    [0.57, -0.085, 0.48],
    [-0.57, -0.085, -0.48],
    [0.57, -0.085, -0.48],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    foot_transform.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    foot_transform.updateMatrix();
    rubber_feet.setMatrixAt(i, foot_transform.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  base_group.add(rubber_feet);

  const motor_collarGeom = new THREE.CylinderGeometry(0.625, 0.625, 0.13, 64);
  const motor_collar = new THREE.Mesh(motor_collarGeom, black_plasticMat);
  motor_collar.name = "motor_collar";
  motor_collar.position.y = 1.835;
  base_group.add(motor_collar);

  const motor_collar_ringGeom = new THREE.CylinderGeometry(0.635, 0.635, 0.025, 64);
  const motor_collar_ring = new THREE.Mesh(motor_collar_ringGeom, chromeMat);
  motor_collar_ring.name = "motor_collar_ring";
  motor_collar_ring.position.y = 1.885;
  base_group.add(motor_collar_ring);

  const drive_plateGeom = new THREE.CylinderGeometry(0.535, 0.535, 0.055, 48);
  const drive_plate = new THREE.Mesh(drive_plateGeom, black_plasticMat);
  drive_plate.name = "drive_plate";
  drive_plate.position.y = 1.925;
  base_group.add(drive_plate);

  const pitcher_bottomGeom = new THREE.CylinderGeometry(0.49, 0.46, 0.075, 8);
  const pitcher_bottom = new THREE.Mesh(pitcher_bottomGeom, glassMat);
  pitcher_bottom.name = "pitcher_bottom";
  pitcher_bottom.position.y = 1.985;
  pitcher_bottom.rotation.y = Math.PI / 8;
  pitcher_group.add(pitcher_bottom);

  const pitcher_wallGeom = new THREE.CylinderGeometry(0.69, 0.48, 1.34, 8, 1, true);
  const pitcher_walls = new THREE.Mesh(pitcher_wallGeom, glassMat);
  pitcher_walls.name = "pitcher_walls";
  pitcher_walls.position.y = 2.625;
  pitcher_walls.rotation.y = Math.PI / 8;
  pitcher_group.add(pitcher_walls);

  const pitcher_ribGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  const pitcher_ribs = new THREE.InstancedMesh(pitcher_ribGeom, glass_ribMat, 8);
  pitcher_ribs.name = "pitcher_ribs";
  const rib_transform = new THREE.Object3D();
  const rib_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 8 + i * Math.PI / 4;
    const lower = new THREE.Vector3(
      Math.cos(angle) * 0.485,
      2.00,
      Math.sin(angle) * 0.485
    );
    const upper = new THREE.Vector3(
      Math.cos(angle) * 0.685,
      3.22,
      Math.sin(angle) * 0.685
    );
    const direction = upper.clone().sub(lower);
    const length = direction.length();
    rib_transform.position.copy(lower).add(upper).multiplyScalar(0.5);
    rib_transform.quaternion.setFromUnitVectors(rib_up, direction.normalize());
    rib_transform.scale.set(1, length, 1);
    rib_transform.updateMatrix();
    pitcher_ribs.setMatrixAt(i, rib_transform.matrix);
  }
  pitcher_ribs.instanceMatrix.needsUpdate = true;
  pitcher_group.add(pitcher_ribs);

  const pitcher_top_rimGeom = new THREE.TorusGeometry(0.685, 0.019, 10, 64);
  const pitcher_top_rim = new THREE.Mesh(pitcher_top_rimGeom, chromeMat);
  pitcher_top_rim.name = "pitcher_top_rim";
  pitcher_top_rim.rotation.x = Math.PI / 2;
  pitcher_top_rim.position.y = 3.295;
  pitcher_group.add(pitcher_top_rim);

  const pitcher_inner_rimGeom = new THREE.TorusGeometry(0.655, 0.010, 8, 64);
  const pitcher_inner_rim = new THREE.Mesh(pitcher_inner_rimGeom, black_plasticMat);
  pitcher_inner_rim.name = "pitcher_inner_rim";
  pitcher_inner_rim.rotation.x = Math.PI / 2;
  pitcher_inner_rim.position.y = 3.275;
  pitcher_group.add(pitcher_inner_rim);

  const pouring_spoutShape = new THREE.Shape();
  pouring_spoutShape.moveTo(0.00, -0.055);
  pouring_spoutShape.lineTo(-0.25, -0.025);
  pouring_spoutShape.lineTo(-0.39, 0.055);
  pouring_spoutShape.lineTo(-0.31, 0.105);
  pouring_spoutShape.lineTo(-0.08, 0.085);
  pouring_spoutShape.lineTo(0.00, 0.025);
  pouring_spoutShape.closePath();
  const pouring_spoutGeom = new THREE.ExtrudeGeometry(pouring_spoutShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const pouring_spout = new THREE.Mesh(pouring_spoutGeom, glassMat);
  pouring_spout.name = "pouring_spout";
  pouring_spout.position.set(-0.65, 3.24, -0.07);
  pitcher_group.add(pouring_spout);

  const spout_trimPath = [
    new THREE.Vector3(-0.65, 3.325, 0.075),
    new THREE.Vector3(-0.87, 3.345, 0.075),
    new THREE.Vector3(-1.04, 3.395, 0.075),
    new THREE.Vector3(-0.91, 3.355, -0.075),
    new THREE.Vector3(-0.68, 3.315, -0.075),
  ];
  const spout_trimGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(spout_trimPath, false, "centripetal"),
    28,
    0.009,
    8,
    false
  );
  const spout_trim = new THREE.Mesh(spout_trimGeom, chromeMat);
  spout_trim.name = "spout_trim";
  pitcher_group.add(spout_trim);

  const juice_bodyGeom = new THREE.CylinderGeometry(0.61, 0.43, 0.86, 8);
  const juice_body = new THREE.Mesh(juice_bodyGeom, juiceMat);
  juice_body.name = "juice_body";
  juice_body.position.y = 2.45;
  juice_body.rotation.y = Math.PI / 8;
  pitcher_group.add(juice_body);

  const juice_surfaceGeom = new THREE.CylinderGeometry(0.61, 0.61, 0.018, 48);
  const juice_surface = new THREE.Mesh(juice_surfaceGeom, foamMat);
  juice_surface.name = "juice_surface";
  juice_surface.position.y = 2.885;
  pitcher_group.add(juice_surface);

  const foam_ringGeom = new THREE.TorusGeometry(0.575, 0.012, 8, 48);
  const foam_ring = new THREE.Mesh(foam_ringGeom, foamMat);
  foam_ring.name = "foam_ring";
  foam_ring.rotation.x = Math.PI / 2;
  foam_ring.position.y = 2.899;
  pitcher_group.add(foam_ring);

  const surface_bubbleGeom = new THREE.SphereGeometry(0.014, 10, 6);
  const surface_bubbles = new THREE.InstancedMesh(surface_bubbleGeom, bubbleMat, 18);
  surface_bubbles.name = "surface_bubbles";
  const bubble_transform = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.08 + 0.46 * (((i * 7) % 19) / 19);
    const scale = 0.65 + ((i * 5) % 7) * 0.08;
    bubble_transform.position.set(
      Math.cos(angle) * radius,
      2.905 + (i % 3) * 0.003,
      Math.sin(angle) * radius
    );
    bubble_transform.scale.setScalar(scale);
    bubble_transform.updateMatrix();
    surface_bubbles.setMatrixAt(i, bubble_transform.matrix);
  }
  surface_bubbles.instanceMatrix.needsUpdate = true;
  pitcher_group.add(surface_bubbles);

  const suspended_bubbleGeom = new THREE.SphereGeometry(0.009, 8, 5);
  const suspended_bubbles = new THREE.InstancedMesh(suspended_bubbleGeom, bubbleMat, 28);
  suspended_bubbles.name = "suspended_bubbles";
  for (let i = 0; i < 28; i++) {
    const angle = -0.72 + (i % 7) * 0.24;
    const radius = 0.10 + 0.28 * (((i * 3) % 11) / 11);
    const y = 2.08 + 0.70 * (((i * 9) % 29) / 29);
    const scale = 0.55 + (i % 5) * 0.13;
    bubble_transform.position.set(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
    bubble_transform.scale.setScalar(scale);
    bubble_transform.updateMatrix();
    suspended_bubbles.setMatrixAt(i, bubble_transform.matrix);
  }
  suspended_bubbles.instanceMatrix.needsUpdate = true;
  pitcher_group.add(suspended_bubbles);

  const handle_mountGeom = new THREE.BoxGeometry(0.18, 0.11, 0.16);
  const handle_mounts = new THREE.InstancedMesh(handle_mountGeom, red_plasticMat, 2);
  handle_mounts.name = "handle_mounts";
  const mount_transform = new THREE.Object3D();
  const mount_positions = [
    [0.64, 1.68, 0],
    [0.76, 0.61, 0],
  ];
  for (let i = 0; i < mount_positions.length; i++) {
    mount_transform.position.set(
      mount_positions[i][0],
      mount_positions[i][1],
      mount_positions[i][2]
    );
    mount_transform.updateMatrix();
    handle_mounts.setMatrixAt(i, mount_transform.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  base_group.add(handle_mounts);

  const handle_gripPath = [
    new THREE.Vector3(0.64, 1.69, 0),
    new THREE.Vector3(0.80, 1.69, 0),
    new THREE.Vector3(1.02, 1.69, 0),
    new THREE.Vector3(1.10, 1.62, 0),
    new THREE.Vector3(1.12, 1.51, 0),
    new THREE.Vector3(1.07, 1.15, 0),
    new THREE.Vector3(1.01, 0.84, 0),
    new THREE.Vector3(0.91, 0.68, 0),
    new THREE.Vector3(0.76, 0.61, 0),
  ];
  const handle_gripGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(handle_gripPath, false, "centripetal"),
    48,
    0.043,
    10,
    false
  );
  const handle_grip = new THREE.Mesh(handle_gripGeom, glassMat);
  handle_grip.name = "handle_grip";
  base_group.add(handle_grip);

  const handle_chrome_outlinePath = [
    new THREE.Vector3(0.64, 1.735, 0.025),
    new THREE.Vector3(0.88, 1.735, 0.025),
    new THREE.Vector3(1.08, 1.68, 0.025),
    new THREE.Vector3(1.16, 1.55, 0.025),
    new THREE.Vector3(1.11, 1.08, 0.025),
    new THREE.Vector3(1.02, 0.77, 0.025),
    new THREE.Vector3(0.88, 0.59, 0.025),
    new THREE.Vector3(0.75, 0.56, 0.025),
  ];
  const handle_chrome_outlineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(handle_chrome_outlinePath, false, "centripetal"),
    52,
    0.012,
    8,
    false
  );
  const handle_chrome_outline = new THREE.Mesh(handle_chrome_outlineGeom, chromeMat);
  handle_chrome_outline.name = "handle_chrome_outline";
  base_group.add(handle_chrome_outline);

  const control_dial_group = new THREE.Group();
  control_dial_group.name = "control_dial_group";
  const dial_angle = 0.42;
  const dial_normal = new THREE.Vector3(
    Math.sin(dial_angle),
    0,
    Math.cos(dial_angle)
  ).normalize();
  control_dial_group.position.set(
    dial_normal.x * 0.715,
    0.66,
    dial_normal.z * 0.715
  );
  control_dial_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dial_normal
  );
  base_group.add(control_dial_group);

  const dial_mountGeom = new THREE.CylinderGeometry(0.245, 0.245, 0.10, 40);
  const dial_mount = new THREE.Mesh(dial_mountGeom, red_plasticMat);
  dial_mount.name = "dial_mount";
  dial_mount.position.y = 0.025;
  control_dial_group.add(dial_mount);

  const dial_bezelGeom = new THREE.TorusGeometry(0.205, 0.018, 10, 40);
  const dial_bezel = new THREE.Mesh(dial_bezelGeom, black_plasticMat);
  dial_bezel.name = "dial_bezel";
  dial_bezel.rotation.x = Math.PI / 2;
  dial_bezel.position.y = 0.085;
  control_dial_group.add(dial_bezel);

  const dial_knobGeom = new THREE.CylinderGeometry(0.185, 0.185, 0.15, 40);
  const dial_knob = new THREE.Mesh(dial_knobGeom, red_plasticMat);
  dial_knob.name = "dial_knob";
  dial_knob.position.y = 0.15;
  control_dial_group.add(dial_knob);

  const dial_faceGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.018, 40);
  const dial_face = new THREE.Mesh(dial_faceGeom, black_plasticMat);
  dial_face.name = "dial_face";
  dial_face.position.y = 0.235;
  control_dial_group.add(dial_face);

  const dial_indicatorGeom = new THREE.BoxGeometry(0.012, 0.009, 0.075);
  const dial_indicator = new THREE.Mesh(dial_indicatorGeom, chromeMat);
  dial_indicator.name = "dial_indicator";
  dial_indicator.position.set(0, 0.249, 0.045);
  control_dial_group.add(dial_indicator);

  const dial_tickGeom = new THREE.BoxGeometry(0.012, 0.008, 0.035);
  const dial_ticks = new THREE.InstancedMesh(dial_tickGeom, chromeMat, 5);
  dial_ticks.name = "dial_ticks";
  const tick_transform = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    const angle = -0.95 + i * 0.475;
    tick_transform.position.set(
      Math.sin(angle) * 0.225,
      0.085,
      Math.cos(angle) * 0.225
    );
    tick_transform.rotation.set(0, angle, 0);
    tick_transform.scale.set(1, 1, 1);
    tick_transform.updateMatrix();
    dial_ticks.setMatrixAt(i, tick_transform.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  control_dial_group.add(dial_ticks);

  fitToUnitCube(THREE, root);
  return root;

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
}