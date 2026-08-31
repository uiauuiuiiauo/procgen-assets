export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compass_pendant";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a84f,
    metalness: 0.6,
    roughness: 0.2,
  });
  const lightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf0d27a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8d6424,
    metalness: 0.5,
    roughness: 0.35,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xe7e8e3,
    metalness: 0.0,
    roughness: 0.4,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x315774,
    metalness: 0.0,
    roughness: 0.7,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x29251f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const clearGemMat = new THREE.MeshStandardMaterial({
    color: 0xf4f7ff,
    metalness: 0.0,
    roughness: 0.2,
    flatShading: true,
  });
  const blueGemMat = new THREE.MeshStandardMaterial({
    color: 0x078bd0,
    metalness: 0.0,
    roughness: 0.2,
    flatShading: true,
  });
  const pinkGemMat = new THREE.MeshStandardMaterial({
    color: 0xd79aa8,
    metalness: 0.0,
    roughness: 0.25,
    flatShading: true,
  });
  const centralBlueMat = new THREE.MeshStandardMaterial({
    color: 0x007ac2,
    metalness: 0.0,
    roughness: 0.18,
    flatShading: true,
  });
  const centralDarkBlueMat = new THREE.MeshStandardMaterial({
    color: 0x063b79,
    metalness: 0.0,
    roughness: 0.22,
    flatShading: true,
  });

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const pendant_bodyProfile = [
    new THREE.Vector2(0.00, -0.16),
    new THREE.Vector2(1.16, -0.16),
    new THREE.Vector2(1.27, -0.13),
    new THREE.Vector2(1.34, -0.07),
    new THREE.Vector2(1.38, 0.02),
    new THREE.Vector2(1.36, 0.09),
    new THREE.Vector2(1.30, 0.15),
    new THREE.Vector2(1.23, 0.18),
    new THREE.Vector2(0.00, 0.18),
  ];
  const pendant_bodyGeom = new THREE.LatheGeometry(pendant_bodyProfile, 64);
  const pendant_body = new THREE.Mesh(pendant_bodyGeom, goldMat);
  pendant_body.name = "pendant_body";
  pendant_body.rotation.x = Math.PI / 2;
  case_group.add(pendant_body);

  const rear_case_ridgeGeom = new THREE.TorusGeometry(1.29, 0.035, 12, 64);
  const rear_case_ridge = new THREE.Mesh(rear_case_ridgeGeom, darkGoldMat);
  rear_case_ridge.name = "rear_case_ridge";
  rear_case_ridge.position.z = -0.09;
  case_group.add(rear_case_ridge);

  const outer_side_ridgeGeom = new THREE.TorusGeometry(1.34, 0.035, 12, 64);
  const outer_side_ridge = new THREE.Mesh(outer_side_ridgeGeom, lightGoldMat);
  outer_side_ridge.name = "outer_side_ridge";
  outer_side_ridge.position.z = 0.045;
  case_group.add(outer_side_ridge);

  const front_bezelGeom = new THREE.RingGeometry(1.09, 1.31, 64);
  const front_bezel = new THREE.Mesh(front_bezelGeom, goldMat);
  front_bezel.name = "front_bezel";
  front_bezel.position.z = 0.205;
  case_group.add(front_bezel);

  const outer_bezel_ridgeGeom = new THREE.TorusGeometry(1.30, 0.052, 14, 64);
  const outer_bezel_ridge = new THREE.Mesh(outer_bezel_ridgeGeom, lightGoldMat);
  outer_bezel_ridge.name = "outer_bezel_ridge";
  outer_bezel_ridge.position.z = 0.205;
  case_group.add(outer_bezel_ridge);

  const bezel_outer_grooveGeom = new THREE.TorusGeometry(1.235, 0.018, 10, 64);
  const bezel_outer_groove = new THREE.Mesh(bezel_outer_grooveGeom, darkGoldMat);
  bezel_outer_groove.name = "bezel_outer_groove";
  bezel_outer_groove.position.z = 0.225;
  case_group.add(bezel_outer_groove);

  const inner_bezel_ridgeGeom = new THREE.TorusGeometry(1.105, 0.035, 12, 64);
  const inner_bezel_ridge = new THREE.Mesh(inner_bezel_ridgeGeom, lightGoldMat);
  inner_bezel_ridge.name = "inner_bezel_ridge";
  inner_bezel_ridge.position.z = 0.235;
  case_group.add(inner_bezel_ridge);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const dial_faceGeom = new THREE.CircleGeometry(1.075, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.z = 0.218;
  dial_group.add(dial_face);

  const dial_outer_lineGeom = new THREE.RingGeometry(1.035, 1.047, 64);
  const dial_outer_line = new THREE.Mesh(dial_outer_lineGeom, darkGoldMat);
  dial_outer_line.name = "dial_outer_line";
  dial_outer_line.position.z = 0.226;
  dial_group.add(dial_outer_line);

  const dial_inner_lineGeom = new THREE.RingGeometry(0.995, 1.005, 64);
  const dial_inner_line = new THREE.Mesh(dial_inner_lineGeom, markingMat);
  dial_inner_line.name = "dial_inner_line";
  dial_inner_line.position.z = 0.227;
  dial_group.add(dial_inner_line);

  const minor_ticksGeom = new THREE.BoxGeometry(0.012, 0.052, 0.008);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, markingMat, 32);
  minor_ticks.name = "minor_ticks";
  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * 0.965,
      Math.cos(angle) * 0.965,
      0.231
    );
    instance_dummy.rotation.set(0, 0, -angle);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    minor_ticks.setMatrixAt(i, instance_dummy.matrix);
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks);

  const major_ticksGeom = new THREE.BoxGeometry(0.024, 0.105, 0.01);
  const major_ticks = new THREE.InstancedMesh(major_ticksGeom, markingMat, 8);
  major_ticks.name = "major_ticks";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * 0.925,
      Math.cos(angle) * 0.925,
      0.233
    );
    instance_dummy.rotation.set(0, 0, -angle);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    major_ticks.setMatrixAt(i, instance_dummy.matrix);
  }
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(major_ticks);

  const cardinal_labels = new THREE.Group();
  cardinal_labels.name = "cardinal_labels";
  dial_group.add(cardinal_labels);

  function addLabelStroke(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const strokeGeom = new THREE.BoxGeometry(length, 0.018, 0.009);
    const stroke = new THREE.Mesh(strokeGeom, markingMat);
    stroke.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0.235);
    stroke.rotation.z = Math.atan2(dy, dx);
    cardinal_labels.add(stroke);
  }

  const labelY = 0.80;
  const halfW = 0.035;
  const halfH = 0.060;

  addLabelStroke(-halfW, labelY + halfH, -halfW, labelY - halfH);
  addLabelStroke(halfW, labelY + halfH, halfW, labelY - halfH);
  addLabelStroke(-halfW, labelY - halfH, halfW, labelY + halfH);

  addLabelStroke(0.69, -halfH, 0.69, halfH);
  addLabelStroke(0.69, halfH, 0.79, halfH);
  addLabelStroke(0.69, 0.0, 0.77, 0.0);
  addLabelStroke(0.69, -halfH, 0.79, -halfH);

  addLabelStroke(0.035, -labelY - halfH, 0.035, -labelY + halfH);
  addLabelStroke(-0.035, -labelY - halfH, -0.035, -labelY + halfH);
  addLabelStroke(-0.035, -labelY + halfH, 0.035, -labelY + halfH);
  addLabelStroke(-0.035, -labelY - halfH, 0.035, -labelY - halfH);

  addLabelStroke(-0.84, halfH, -0.80, -halfH);
  addLabelStroke(-0.80, -halfH, -0.76, 0.02);
  addLabelStroke(-0.76, 0.02, -0.72, -halfH);
  addLabelStroke(-0.72, -halfH, -0.68, halfH);

  const compass_rose = new THREE.Group();
  compass_rose.name = "compass_rose";
  dial_group.add(compass_rose);

  function createRayHalf(length, width, left) {
    const shape = new THREE.Shape();
    if (left) {
      shape.moveTo(0, 0.035);
      shape.lineTo(0, length);
      shape.lineTo(-width, 0.16);
    } else {
      shape.moveTo(0, 0.035);
      shape.lineTo(width, 0.16);
      shape.lineTo(0, length);
    }
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 1,
    });
    return new THREE.Mesh(geometry, goldMat);
  }

  function createRay(length, width) {
    const ray = new THREE.Group();
    const left_half = createRayHalf(length, width, true);
    const right_half = createRayHalf(length, width, false);
    ray.add(left_half, right_half);
    return ray;
  }

  const north_ray = createRay(0.88, 0.135);
  north_ray.name = "north_ray";
  north_ray.position.z = 0.238;
  compass_rose.add(north_ray);

  const northeast_ray = createRay(0.68, 0.105);
  northeast_ray.name = "northeast_ray";
  northeast_ray.rotation.z = -Math.PI / 4;
  northeast_ray.position.z = 0.238;
  compass_rose.add(northeast_ray);

  const east_ray = createRay(0.86, 0.13);
  east_ray.name = "east_ray";
  east_ray.rotation.z = -Math.PI / 2;
  east_ray.position.z = 0.238;
  compass_rose.add(east_ray);

  const southeast_ray = createRay(0.68, 0.105);
  southeast_ray.name = "southeast_ray";
  southeast_ray.rotation.z = -Math.PI * 3 / 4;
  southeast_ray.position.z = 0.238;
  compass_rose.add(southeast_ray);

  const south_ray = createRay(0.88, 0.135);
  south_ray.name = "south_ray";
  south_ray.rotation.z = Math.PI;
  south_ray.position.z = 0.238;
  compass_rose.add(south_ray);

  const southwest_ray = createRay(0.68, 0.105);
  southwest_ray.name = "southwest_ray";
  southwest_ray.rotation.z = Math.PI * 3 / 4;
  southwest_ray.position.z = 0.238;
  compass_rose.add(southwest_ray);

  const west_ray = createRay(0.86, 0.13);
  west_ray.name = "west_ray";
  west_ray.rotation.z = Math.PI / 2;
  west_ray.position.z = 0.238;
  compass_rose.add(west_ray);

  const northwest_ray = createRay(0.68, 0.105);
  northwest_ray.name = "northwest_ray";
  northwest_ray.rotation.z = Math.PI / 4;
  northwest_ray.position.z = 0.238;
  compass_rose.add(northwest_ray);

  const secondary_points = new THREE.Group();
  secondary_points.name = "secondary_points";
  dial_group.add(secondary_points);

  const secondaryShape = new THREE.Shape();
  secondaryShape.moveTo(-0.042, 0.07);
  secondaryShape.lineTo(0, 0.63);
  secondaryShape.lineTo(0.042, 0.07);
  secondaryShape.closePath();
  const secondary_pointsGeom = new THREE.ShapeGeometry(secondaryShape);
  const secondary_point_meshes = new THREE.InstancedMesh(
    secondary_pointsGeom,
    markingMat,
    8
  );
  secondary_point_meshes.name = "secondary_point_meshes";
  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 8 + i * Math.PI / 4;
    instance_dummy.position.set(0, 0, 0.236);
    instance_dummy.rotation.set(0, 0, -angle);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    secondary_point_meshes.setMatrixAt(i, instance_dummy.matrix);
  }
  secondary_point_meshes.instanceMatrix.needsUpdate = true;
  secondary_points.add(secondary_point_meshes);

  const glass_coverGeom = new THREE.CircleGeometry(1.065, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.265;
  dial_group.add(glass_cover);

  const central_hub_baseGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.07, 32);
  const central_hub_base = new THREE.Mesh(central_hub_baseGeom, darkGoldMat);
  central_hub_base.name = "central_hub_base";
  central_hub_base.rotation.x = Math.PI / 2;
  central_hub_base.position.z = 0.278;
  dial_group.add(central_hub_base);

  const central_hub_rimGeom = new THREE.TorusGeometry(0.185, 0.038, 12, 40);
  const central_hub_rim = new THREE.Mesh(central_hub_rimGeom, lightGoldMat);
  central_hub_rim.name = "central_hub_rim";
  central_hub_rim.position.z = 0.319;
  dial_group.add(central_hub_rim);

  const central_socketGeom = new THREE.CylinderGeometry(0.152, 0.152, 0.025, 32);
  const central_socket = new THREE.Mesh(central_socketGeom, shadowMat);
  central_socket.name = "central_socket";
  central_socket.rotation.x = Math.PI / 2;
  central_socket.position.z = 0.318;
  dial_group.add(central_socket);

  const central_jewelGeom = new THREE.IcosahedronGeometry(0.145, 1);
  const central_jewel = new THREE.Mesh(central_jewelGeom, centralBlueMat);
  central_jewel.name = "central_jewel";
  central_jewel.scale.set(1, 1, 0.48);
  central_jewel.position.z = 0.337;
  dial_group.add(central_jewel);

  const central_jewel_shadowGeom = new THREE.CircleGeometry(0.065, 6);
  const central_jewel_shadow = new THREE.Mesh(
    central_jewel_shadowGeom,
    centralDarkBlueMat
  );
  central_jewel_shadow.name = "central_jewel_shadow";
  central_jewel_shadow.scale.y = 0.65;
  central_jewel_shadow.rotation.z = 0.25;
  central_jewel_shadow.position.set(-0.025, 0.018, 0.409);
  dial_group.add(central_jewel_shadow);

  const gemstone_group = new THREE.Group();
  gemstone_group.name = "gemstone_group";
  root.add(gemstone_group);

  const gemRadius = 1.18;
  const gemstone_settingGeom = new THREE.CylinderGeometry(0.083, 0.083, 0.026, 12);
  const gemstone_settings = new THREE.InstancedMesh(
    gemstone_settingGeom,
    darkGoldMat,
    32
  );
  gemstone_settings.name = "gemstone_settings";
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * gemRadius,
      Math.cos(angle) * gemRadius,
      0.247
    );
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    gemstone_settings.setMatrixAt(i, instance_dummy.matrix);
  }
  gemstone_settings.instanceMatrix.needsUpdate = true;
  gemstone_group.add(gemstone_settings);

  const clear_gemstonesGeom = new THREE.IcosahedronGeometry(0.071, 1);
  const clear_gemstones = new THREE.InstancedMesh(
    clear_gemstonesGeom,
    clearGemMat,
    28
  );
  clear_gemstones.name = "clear_gemstones";
  let clearIndex = 0;
  for (let i = 0; i < 32; i++) {
    if (i === 0 || i === 8 || i === 16 || i === 24) continue;
    const angle = i / 32 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * gemRadius,
      Math.cos(angle) * gemRadius,
      0.278
    );
    instance_dummy.rotation.set(0, 0, angle * 0.5);
    instance_dummy.scale.set(1, 1, 0.42);
    instance_dummy.updateMatrix();
    clear_gemstones.setMatrixAt(clearIndex, instance_dummy.matrix);
    clearIndex++;
  }
  clear_gemstones.instanceMatrix.needsUpdate = true;
  gemstone_group.add(clear_gemstones);

  const blue_gemstonesGeom = new THREE.IcosahedronGeometry(0.078, 1);
  const blue_gemstones = new THREE.InstancedMesh(
    blue_gemstonesGeom,
    blueGemMat,
    3
  );
  blue_gemstones.name = "blue_gemstones";
  const blueIndices = [8, 16, 24];
  for (let i = 0; i < blueIndices.length; i++) {
    const angle = blueIndices[i] / 32 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * gemRadius,
      Math.cos(angle) * gemRadius,
      0.281
    );
    instance_dummy.rotation.set(0, 0, angle * 0.5);
    instance_dummy.scale.set(1, 1, 0.43);
    instance_dummy.updateMatrix();
    blue_gemstones.setMatrixAt(i, instance_dummy.matrix);
  }
  blue_gemstones.instanceMatrix.needsUpdate = true;
  gemstone_group.add(blue_gemstones);

  const pink_gemstonesGeom = new THREE.IcosahedronGeometry(0.071, 1);
  const pink_gemstones = new THREE.InstancedMesh(
    pink_gemstonesGeom,
    pinkGemMat,
    2
  );
  pink_gemstones.name = "pink_gemstones";
  const pinkIndices = [0, 28];
  for (let i = 0; i < pinkIndices.length; i++) {
    const angle = pinkIndices[i] / 32 * Math.PI * 2;
    instance_dummy.position.set(
      Math.sin(angle) * gemRadius,
      Math.cos(angle) * gemRadius,
      0.278
    );
    instance_dummy.rotation.set(0, 0, angle * 0.5);
    instance_dummy.scale.set(1, 1, 0.42);
    instance_dummy.updateMatrix();
    pink_gemstones.setMatrixAt(i, instance_dummy.matrix);
  }
  pink_gemstones.instanceMatrix.needsUpdate = true;
  gemstone_group.add(pink_gemstones);

  const hanger_group = new THREE.Group();
  hanger_group.name = "hanger_group";
  root.add(hanger_group);

  const loop_mountProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.13, 0.00),
    new THREE.Vector2(0.18, 0.055),
    new THREE.Vector2(0.17, 0.13),
    new THREE.Vector2(0.11, 0.20),
    new THREE.Vector2(0.10, 0.30),
    new THREE.Vector2(0.14, 0.36),
    new THREE.Vector2(0.00, 0.36),
  ];
  const loop_mountGeom = new THREE.LatheGeometry(loop_mountProfile, 32);
  const loop_mount = new THREE.Mesh(loop_mountGeom, goldMat);
  loop_mount.name = "loop_mount";
  loop_mount.position.set(0, 1.25, 0.01);
  hanger_group.add(loop_mount);

  const loop_shadowGeom = new THREE.TorusGeometry(0.38, 0.078, 14, 64);
  const loop_shadow = new THREE.Mesh(loop_shadowGeom, darkGoldMat);
  loop_shadow.name = "loop_shadow";
  loop_shadow.scale.y = 1.12;
  loop_shadow.position.set(0, 1.86, 0.015);
  hanger_group.add(loop_shadow);

  const suspension_loopGeom = new THREE.TorusGeometry(0.38, 0.058, 14, 64);
  const suspension_loop = new THREE.Mesh(suspension_loopGeom, lightGoldMat);
  suspension_loop.name = "suspension_loop";
  suspension_loop.scale.y = 1.12;
  suspension_loop.position.set(0, 1.86, 0.055);
  hanger_group.add(suspension_loop);

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