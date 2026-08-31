export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bass_recorder";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const windway_group = new THREE.Group();
  windway_group.name = "windway_group";
  root.add(windway_group);

  const keywork_group = new THREE.Group();
  keywork_group.name = "keywork_group";
  root.add(keywork_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x5b2419,
    metalness: 0.0,
    roughness: 0.6
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x35120e,
    metalness: 0.0,
    roughness: 0.6
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8
  });
  const dark_holeMat = new THREE.MeshStandardMaterial({
    color: 0x171311,
    metalness: 0.0,
    roughness: 0.8
  });

  function createRod(start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, 10),
      material
    );
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return rod;
  }

  function createCurvedRod(points, radius, material) {
    const path = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(path, 24, radius, 8, false),
      material
    );
  }

  function createCapsuleShape(width, height) {
    const shape = new THREE.Shape();
    const radius = width * 0.5;
    const half_height = height * 0.5;
    shape.moveTo(-radius, half_height - radius);
    shape.absarc(0, half_height - radius, radius, Math.PI, 0, true);
    shape.lineTo(radius, -half_height + radius);
    shape.absarc(0, -half_height + radius, radius, 0, -Math.PI, true);
    shape.closePath();
    return shape;
  }

  function addHoleRing(name, x, y, hole_radius, ring_radius) {
    const geometry = new THREE.TorusGeometry(
      hole_radius + 0.009,
      ring_radius,
      8,
      28
    );
    const mesh = new THREE.Mesh(geometry, silverMat);
    mesh.name = name;
    mesh.position.set(x, y, 0.139);
    keywork_group.add(mesh);
    return mesh;
  }

  const main_body_profile = [
    new THREE.Vector2(0.000, -1.820),
    new THREE.Vector2(0.125, -1.820),
    new THREE.Vector2(0.132, -1.760),
    new THREE.Vector2(0.132, -1.500),
    new THREE.Vector2(0.130, -1.150),
    new THREE.Vector2(0.128, -0.700),
    new THREE.Vector2(0.125, -0.200),
    new THREE.Vector2(0.122, 0.300),
    new THREE.Vector2(0.118, 0.750),
    new THREE.Vector2(0.114, 1.080),
    new THREE.Vector2(0.112, 1.160),
    new THREE.Vector2(0.000, 1.160)
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_body_profile, 48);
  const main_body = new THREE.Mesh(main_bodyGeom, woodMat);
  main_body.name = "main_body";
  body_group.add(main_body);

  const bell_profile = [
    new THREE.Vector2(0.000, -2.620),
    new THREE.Vector2(0.305, -2.620),
    new THREE.Vector2(0.315, -2.590),
    new THREE.Vector2(0.285, -2.530),
    new THREE.Vector2(0.245, -2.430),
    new THREE.Vector2(0.205, -2.290),
    new THREE.Vector2(0.175, -2.130),
    new THREE.Vector2(0.153, -1.950),
    new THREE.Vector2(0.140, -1.820),
    new THREE.Vector2(0.000, -1.820)
  ];
  const bellGeom = new THREE.LatheGeometry(bell_profile, 48);
  const bell = new THREE.Mesh(bellGeom, woodMat);
  bell.name = "bell";
  body_group.add(bell);

  const mouthpiece_profile = [
    new THREE.Vector2(0.000, 1.195),
    new THREE.Vector2(0.116, 1.195),
    new THREE.Vector2(0.114, 1.280),
    new THREE.Vector2(0.109, 1.420),
    new THREE.Vector2(0.102, 1.610),
    new THREE.Vector2(0.093, 1.820),
    new THREE.Vector2(0.086, 1.940),
    new THREE.Vector2(0.078, 1.985),
    new THREE.Vector2(0.052, 2.015),
    new THREE.Vector2(0.000, 2.025)
  ];
  const mouthpieceGeom = new THREE.LatheGeometry(mouthpiece_profile, 40);
  const mouthpiece = new THREE.Mesh(mouthpieceGeom, dark_woodMat);
  mouthpiece.name = "mouthpiece";
  body_group.add(mouthpiece);

  const bell_rimGeom = new THREE.CylinderGeometry(0.322, 0.322, 0.030, 48);
  const bell_rim = new THREE.Mesh(bell_rimGeom, silverMat);
  bell_rim.name = "bell_rim";
  bell_rim.position.y = -2.615;
  body_group.add(bell_rim);

  const bell_rim_lipGeom = new THREE.TorusGeometry(0.302, 0.018, 10, 48);
  const bell_rim_lip = new THREE.Mesh(bell_rim_lipGeom, silverMat);
  bell_rim_lip.name = "bell_rim_lip";
  bell_rim_lip.rotation.x = Math.PI / 2;
  bell_rim_lip.position.y = -2.617;
  body_group.add(bell_rim_lip);

  const bell_joint_bandGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.046, 40);
  const bell_joint_band = new THREE.Mesh(bell_joint_bandGeom, silverMat);
  bell_joint_band.name = "bell_joint_band";
  bell_joint_band.position.y = -1.810;
  body_group.add(bell_joint_band);

  const mouthpiece_lower_bandGeom = new THREE.CylinderGeometry(0.126, 0.126, 0.044, 40);
  const mouthpiece_lower_band = new THREE.Mesh(mouthpiece_lower_bandGeom, silverMat);
  mouthpiece_lower_band.name = "mouthpiece_lower_band";
  mouthpiece_lower_band.position.y = 1.205;
  body_group.add(mouthpiece_lower_band);

  const mouthpiece_upper_bandGeom = new THREE.CylinderGeometry(0.121, 0.121, 0.026, 40);
  const mouthpiece_upper_band = new THREE.Mesh(mouthpiece_upper_bandGeom, silverMat);
  mouthpiece_upper_band.name = "mouthpiece_upper_band";
  mouthpiece_upper_band.position.y = 1.168;
  body_group.add(mouthpiece_upper_band);

  const middle_joint_bandGeom = new THREE.CylinderGeometry(0.128, 0.128, 0.027, 40);
  const middle_joint_band = new THREE.Mesh(middle_joint_bandGeom, silverMat);
  middle_joint_band.name = "middle_joint_band";
  middle_joint_band.position.y = 0.290;
  body_group.add(middle_joint_band);

  const windway_windowShape = createCapsuleShape(0.108, 0.390);
  const windway_windowGeom = new THREE.ExtrudeGeometry(windway_windowShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: false
  });
  const windway_window = new THREE.Mesh(windway_windowGeom, blackMat);
  windway_window.name = "windway_window";
  windway_window.position.set(0, 0.900, 0.112);
  windway_group.add(windway_window);

  const windway_reflectionGeom = new THREE.BoxGeometry(0.018, 0.235, 0.006);
  const windway_reflection = new THREE.Mesh(windway_reflectionGeom, silverMat);
  windway_reflection.name = "windway_reflection";
  windway_reflection.position.set(-0.020, 0.865, 0.130);
  windway_group.add(windway_reflection);

  const windway_crossbarGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.135, 12);
  const windway_crossbar = new THREE.Mesh(windway_crossbarGeom, silverMat);
  windway_crossbar.name = "windway_crossbar";
  windway_crossbar.rotation.z = Math.PI / 2;
  windway_crossbar.position.set(0, 0.690, 0.142);
  windway_group.add(windway_crossbar);

  const windway_side_railGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.245, 10);
  const windway_side_rail = new THREE.Mesh(windway_side_railGeom, silverMat);
  windway_side_rail.name = "windway_side_rail";
  windway_side_rail.position.set(0.061, 0.875, 0.139);
  windway_group.add(windway_side_rail);

  const windway_lower_postGeom = new THREE.CylinderGeometry(0.010, 0.010, 0.145, 10);
  const windway_lower_post = new THREE.Mesh(windway_lower_postGeom, silverMat);
  windway_lower_post.name = "windway_lower_post";
  windway_lower_post.position.set(0.046, 0.590, 0.140);
  windway_group.add(windway_lower_post);

  const windway_round_buttonGeom = new THREE.CylinderGeometry(0.030, 0.030, 0.014, 20);
  const windway_round_button = new THREE.Mesh(windway_round_buttonGeom, silverMat);
  windway_round_button.name = "windway_round_button";
  windway_round_button.rotation.x = Math.PI / 2;
  windway_round_button.position.set(0.045, 0.535, 0.145);
  windway_group.add(windway_round_button);

  const windway_lever = createCurvedRod([
    new THREE.Vector3(0.047, 0.535, 0.150),
    new THREE.Vector3(0.052, 0.470, 0.150),
    new THREE.Vector3(0.048, 0.405, 0.148),
    new THREE.Vector3(0.055, 0.345, 0.145)
  ], 0.008, silverMat);
  windway_lever.name = "windway_lever";
  windway_group.add(windway_lever);

  const windway_lever_tipGeom = new THREE.SphereGeometry(0.014, 12, 8);
  const windway_lever_tip = new THREE.Mesh(windway_lever_tipGeom, silverMat);
  windway_lever_tip.name = "windway_lever_tip";
  windway_lever_tip.position.set(0.055, 0.345, 0.145);
  windway_group.add(windway_lever_tip);

  const upper_holeGeom = new THREE.CircleGeometry(0.052, 24);
  const upper_hole = new THREE.Mesh(upper_holeGeom, dark_holeMat);
  upper_hole.name = "upper_hole";
  upper_hole.position.set(-0.008, 0.210, 0.128);
  keywork_group.add(upper_hole);

  const upper_hole_ring = addHoleRing("upper_hole_ring", -0.008, 0.210, 0.052, 0.009);

  const middle_holeGeom = new THREE.CircleGeometry(0.055, 24);
  const middle_hole = new THREE.Mesh(middle_holeGeom, dark_holeMat);
  middle_hole.name = "middle_hole";
  middle_hole.position.set(0.025, -0.105, 0.128);
  keywork_group.add(middle_hole);

  const middle_hole_ring = addHoleRing("middle_hole_ring", 0.025, -0.105, 0.055, 0.009);

  const center_holeGeom = new THREE.CircleGeometry(0.052, 24);
  const center_hole = new THREE.Mesh(center_holeGeom, dark_holeMat);
  center_hole.name = "center_hole";
  center_hole.position.set(0.020, -0.500, 0.128);
  keywork_group.add(center_hole);

  const center_hole_ring = addHoleRing("center_hole_ring", 0.020, -0.500, 0.052, 0.009);

  const lower_small_holeGeom = new THREE.CircleGeometry(0.031, 20);
  const lower_small_hole = new THREE.Mesh(lower_small_holeGeom, dark_holeMat);
  lower_small_hole.name = "lower_small_hole";
  lower_small_hole.position.set(0.061, -0.785, 0.128);
  keywork_group.add(lower_small_hole);

  const lower_small_hole_ring = addHoleRing(
    "lower_small_hole_ring",
    0.061,
    -0.785,
    0.031,
    0.008
  );

  const lower_large_holeGeom = new THREE.CircleGeometry(0.055, 24);
  const lower_large_hole = new THREE.Mesh(lower_large_holeGeom, dark_holeMat);
  lower_large_hole.name = "lower_large_hole";
  lower_large_hole.position.set(0.025, -0.965, 0.128);
  keywork_group.add(lower_large_hole);

  const lower_large_hole_ring = addHoleRing(
    "lower_large_hole_ring",
    0.025,
    -0.965,
    0.055,
    0.009
  );

  const lower_round_holeGeom = new THREE.CircleGeometry(0.034, 20);
  const lower_round_hole = new THREE.Mesh(lower_round_holeGeom, dark_holeMat);
  lower_round_hole.name = "lower_round_hole";
  lower_round_hole.position.set(0.058, -1.245, 0.128);
  keywork_group.add(lower_round_hole);

  const lower_round_hole_ring = addHoleRing(
    "lower_round_hole_ring",
    0.058,
    -1.245,
    0.034,
    0.008
  );

  const bottom_holeGeom = new THREE.CircleGeometry(0.069, 26);
  const bottom_hole = new THREE.Mesh(bottom_holeGeom, dark_holeMat);
  bottom_hole.name = "bottom_hole";
  bottom_hole.position.set(-0.018, -1.575, 0.128);
  keywork_group.add(bottom_hole);

  const bottom_hole_ring = addHoleRing(
    "bottom_hole_ring",
    -0.018,
    -1.575,
    0.069,
    0.010
  );

  const left_main_rodGeom = new THREE.CylinderGeometry(0.011, 0.011, 1.360, 10);
  const left_main_rod = new THREE.Mesh(left_main_rodGeom, silverMat);
  left_main_rod.name = "left_main_rod";
  left_main_rod.position.set(-0.143, -0.475, 0.143);
  keywork_group.add(left_main_rod);

  const left_upper_rodGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.400, 10);
  const left_upper_rod = new THREE.Mesh(left_upper_rodGeom, silverMat);
  left_upper_rod.name = "left_upper_rod";
  left_upper_rod.position.set(-0.132, 0.205, 0.142);
  keywork_group.add(left_upper_rod);

  const right_main_rodGeom = new THREE.CylinderGeometry(0.010, 0.010, 0.760, 10);
  const right_main_rod = new THREE.Mesh(right_main_rodGeom, silverMat);
  right_main_rod.name = "right_main_rod";
  right_main_rod.position.set(0.132, 0.075, 0.143);
  keywork_group.add(right_main_rod);

  const right_lower_rodGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.580, 10);
  const right_lower_rod = new THREE.Mesh(right_lower_rodGeom, silverMat);
  right_lower_rod.name = "right_lower_rod";
  right_lower_rod.position.set(0.128, -0.760, 0.143);
  keywork_group.add(right_lower_rod);

  const center_spine_rodGeom = new THREE.CylinderGeometry(0.008, 0.008, 1.050, 10);
  const center_spine_rod = new THREE.Mesh(center_spine_rodGeom, silverMat);
  center_spine_rod.name = "center_spine_rod";
  center_spine_rod.position.set(-0.060, -0.865, 0.140);
  keywork_group.add(center_spine_rod);

  const upper_left_link = createRod(
    new THREE.Vector3(-0.132, 0.285, 0.142),
    new THREE.Vector3(-0.055, 0.285, 0.142),
    0.009,
    silverMat
  );
  upper_left_link.name = "upper_left_link";
  keywork_group.add(upper_left_link);

  const upper_right_link = createRod(
    new THREE.Vector3(0.040, 0.105, 0.143),
    new THREE.Vector3(0.132, 0.105, 0.143),
    0.009,
    silverMat
  );
  upper_right_link.name = "upper_right_link";
  keywork_group.add(upper_right_link);

  const middle_left_link = createRod(
    new THREE.Vector3(-0.143, -0.245, 0.143),
    new THREE.Vector3(-0.045, -0.245, 0.143),
    0.009,
    silverMat
  );
  middle_left_link.name = "middle_left_link";
  keywork_group.add(middle_left_link);

  const middle_right_link = createRod(
    new THREE.Vector3(0.075, -0.165, 0.143),
    new THREE.Vector3(0.132, -0.165, 0.143),
    0.009,
    silverMat
  );
  middle_right_link.name = "middle_right_link";
  keywork_group.add(middle_right_link);

  const center_left_link = createRod(
    new THREE.Vector3(-0.143, -0.500, 0.143),
    new THREE.Vector3(-0.035, -0.500, 0.143),
    0.009,
    silverMat
  );
  center_left_link.name = "center_left_link";
  keywork_group.add(center_left_link);

  const center_right_link = createRod(
    new THREE.Vector3(0.070, -0.500, 0.143),
    new THREE.Vector3(0.132, -0.500, 0.143),
    0.009,
    silverMat
  );
  center_right_link.name = "center_right_link";
  keywork_group.add(center_right_link);

  const lower_left_link = createRod(
    new THREE.Vector3(-0.143, -0.825, 0.143),
    new THREE.Vector3(-0.035, -0.825, 0.143),
    0.009,
    silverMat
  );
  lower_left_link.name = "lower_left_link";
  keywork_group.add(lower_left_link);

  const lower_right_link = createRod(
    new THREE.Vector3(0.078, -0.965, 0.143),
    new THREE.Vector3(0.128, -0.965, 0.143),
    0.009,
    silverMat
  );
  lower_right_link.name = "lower_right_link";
  keywork_group.add(lower_right_link);

  const bottom_left_link = createRod(
    new THREE.Vector3(-0.143, -1.335, 0.143),
    new THREE.Vector3(-0.060, -1.335, 0.143),
    0.009,
    silverMat
  );
  bottom_left_link.name = "bottom_left_link";
  keywork_group.add(bottom_left_link);

  const upper_left_cupGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 20);
  const upper_left_cup = new THREE.Mesh(upper_left_cupGeom, silverMat);
  upper_left_cup.name = "upper_left_cup";
  upper_left_cup.rotation.x = Math.PI / 2;
  upper_left_cup.position.set(-0.151, -0.350, 0.151);
  keywork_group.add(upper_left_cup);

  const upper_left_cup_arm = createRod(
    new THREE.Vector3(-0.143, -0.245, 0.143),
    new THREE.Vector3(-0.151, -0.350, 0.149),
    0.008,
    silverMat
  );
  upper_left_cup_arm.name = "upper_left_cup_arm";
  keywork_group.add(upper_left_cup_arm);

  const middle_left_cupGeom = new THREE.CylinderGeometry(0.040, 0.040, 0.018, 20);
  const middle_left_cup = new THREE.Mesh(middle_left_cupGeom, silverMat);
  middle_left_cup.name = "middle_left_cup";
  middle_left_cup.rotation.x = Math.PI / 2;
  middle_left_cup.position.set(-0.151, -0.690, 0.151);
  keywork_group.add(middle_left_cup);

  const middle_left_cup_arm = createRod(
    new THREE.Vector3(-0.143, -0.500, 0.143),
    new THREE.Vector3(-0.151, -0.690, 0.149),
    0.008,
    silverMat
  );
  middle_left_cup_arm.name = "middle_left_cup_arm";
  keywork_group.add(middle_left_cup_arm);

  const lower_left_cupGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 20);
  const lower_left_cup = new THREE.Mesh(lower_left_cupGeom, silverMat);
  lower_left_cup.name = "lower_left_cup";
  lower_left_cup.rotation.x = Math.PI / 2;
  lower_left_cup.position.set(-0.145, -1.050, 0.151);
  keywork_group.add(lower_left_cup);

  const lower_left_cup_arm = createRod(
    new THREE.Vector3(-0.143, -0.825, 0.143),
    new THREE.Vector3(-0.145, -1.050, 0.149),
    0.008,
    silverMat
  );
  lower_left_cup_arm.name = "lower_left_cup_arm";
  keywork_group.add(lower_left_cup_arm);

  const lower_center_padGeom = new THREE.CylinderGeometry(0.050, 0.050, 0.020, 22);
  const lower_center_pad = new THREE.Mesh(lower_center_padGeom, silverMat);
  lower_center_pad.name = "lower_center_pad";
  lower_center_pad.rotation.x = Math.PI / 2;
  lower_center_pad.position.set(-0.050, -1.145, 0.151);
  keywork_group.add(lower_center_pad);

  const lower_center_pad_arm = createRod(
    new THREE.Vector3(-0.060, -0.965, 0.142),
    new THREE.Vector3(-0.050, -1.145, 0.149),
    0.008,
    silverMat
  );
  lower_center_pad_arm.name = "lower_center_pad_arm";
  keywork_group.add(lower_center_pad_arm);

  const bottom_lever = createCurvedRod([
    new THREE.Vector3(0.055, -1.420, 0.145),
    new THREE.Vector3(0.080, -1.500, 0.147),
    new THREE.Vector3(0.078, -1.620, 0.147),
    new THREE.Vector3(0.055, -1.735, 0.145)
  ], 0.008, silverMat);
  bottom_lever.name = "bottom_lever";
  keywork_group.add(bottom_lever);

  const bottom_lever_tipGeom = new THREE.SphereGeometry(0.014, 12, 8);
  const bottom_lever_tip = new THREE.Mesh(bottom_lever_tipGeom, silverMat);
  bottom_lever_tip.name = "bottom_lever_tip";
  bottom_lever_tip.position.set(0.055, -1.735, 0.145);
  keywork_group.add(bottom_lever_tip);

  const key_positions = [
    [-0.132, 0.330],
    [-0.132, 0.180],
    [-0.143, 0.010],
    [-0.143, -0.180],
    [-0.143, -0.390],
    [-0.143, -0.570],
    [-0.143, -0.760],
    [-0.143, -0.930],
    [-0.143, -1.110],
    [-0.143, -1.290],
    [0.132, 0.280],
    [0.132, 0.050],
    [0.132, -0.180],
    [0.132, -0.420],
    [0.128, -0.650],
    [0.128, -0.870],
    [0.128, -1.100],
    [0.128, -1.320]
  ];

  const key_mountsGeom = new THREE.CylinderGeometry(0.017, 0.017, 0.014, 12);
  const key_mounts = new THREE.InstancedMesh(
    key_mountsGeom,
    silverMat,
    key_positions.length
  );
  key_mounts.name = "key_mounts";

  const key_mount_dummy = new THREE.Object3D();
  for (let i = 0; i < key_positions.length; i++) {
    key_mount_dummy.position.set(
      key_positions[i][0],
      key_positions[i][1],
      0.151
    );
    key_mount_dummy.rotation.set(Math.PI / 2, 0, 0);
    key_mount_dummy.updateMatrix();
    key_mounts.setMatrixAt(i, key_mount_dummy.matrix);
  }
  key_mounts.instanceMatrix.needsUpdate = true;
  keywork_group.add(key_mounts);

  const key_touchpiecesGeom = new THREE.BoxGeometry(0.034, 0.047, 0.014);
  const key_touchpieces = new THREE.InstancedMesh(
    key_touchpiecesGeom,
    silverMat,
    key_positions.length
  );
  key_touchpieces.name = "key_touchpieces";

  const key_touch_dummy = new THREE.Object3D();
  for (let i = 0; i < key_positions.length; i++) {
    const side = key_positions[i][0] < 0 ? -1 : 1;
    key_touch_dummy.position.set(
      key_positions[i][0] + side * 0.010,
      key_positions[i][1],
      0.157
    );
    key_touch_dummy.rotation.set(0, 0, side * 0.08);
    key_touch_dummy.updateMatrix();
    key_touchpieces.setMatrixAt(i, key_touch_dummy.matrix);
  }
  key_touchpieces.instanceMatrix.needsUpdate = true;
  keywork_group.add(key_touchpieces);

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