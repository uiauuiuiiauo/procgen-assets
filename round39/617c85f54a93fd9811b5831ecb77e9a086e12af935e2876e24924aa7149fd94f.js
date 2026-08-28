export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "clarinet";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const mouthpiece_group = new THREE.Group();
  mouthpiece_group.name = "mouthpiece_group";
  const keywork_group = new THREE.Group();
  keywork_group.name = "keywork_group";
  root.add(body_group, mouthpiece_group, keywork_group);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x5b2115,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x35100b,
    metalness: 0.0,
    roughness: 0.6
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x101112,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8
  });

  const lower_bodyGeom = new THREE.CylinderGeometry(0.165, 0.18, 3.3, 40);
  const lower_body = new THREE.Mesh(lower_bodyGeom, woodMat);
  lower_body.name = "lower_body";
  lower_body.position.y = 2.95;
  body_group.add(lower_body);

  const upper_bodyGeom = new THREE.CylinderGeometry(0.145, 0.165, 1.72, 40);
  const upper_body = new THREE.Mesh(upper_bodyGeom, woodMat);
  upper_body.name = "upper_body";
  upper_body.position.y = 5.26;
  body_group.add(upper_body);

  const bellOuterCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.54, 0.075),
    new THREE.Vector2(0.48, 0.13),
    new THREE.Vector2(0.37, 0.30),
    new THREE.Vector2(0.28, 0.58),
    new THREE.Vector2(0.225, 0.92),
    new THREE.Vector2(0.195, 1.30),
    new THREE.Vector2(0.18, 1.65)
  ]);
  const bellOuterProfile = bellOuterCurve.getSpacedPoints(36);
  const bellProfile = [
    new THREE.Vector2(0, 0.075),
    ...bellOuterProfile,
    new THREE.Vector2(0, 1.65)
  ];
  const bellGeom = new THREE.LatheGeometry(bellProfile, 48);
  const bell = new THREE.Mesh(bellGeom, woodMat);
  bell.name = "bell";
  body_group.add(bell);

  const bell_interiorGeom = new THREE.CylinderGeometry(0.46, 0.46, 0.018, 40);
  const bell_interior = new THREE.Mesh(bell_interiorGeom, darkWoodMat);
  bell_interior.name = "bell_interior";
  bell_interior.position.y = 0.079;
  body_group.add(bell_interior);

  const bell_rimGeom = new THREE.TorusGeometry(0.525, 0.025, 10, 48);
  const bell_rim = new THREE.Mesh(bell_rimGeom, silverMat);
  bell_rim.name = "bell_rim";
  bell_rim.rotation.x = Math.PI / 2;
  bell_rim.position.y = 0.073;
  body_group.add(bell_rim);

  const lower_joint_bandGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.075, 40);
  const lower_joint_band = new THREE.Mesh(lower_joint_bandGeom, silverMat);
  lower_joint_band.name = "lower_joint_band";
  lower_joint_band.position.y = 1.625;
  body_group.add(lower_joint_band);

  const lower_joint_ringGeom = new THREE.TorusGeometry(0.181, 0.012, 8, 40);
  const lower_joint_ring = new THREE.Mesh(lower_joint_ringGeom, silverMat);
  lower_joint_ring.name = "lower_joint_ring";
  lower_joint_ring.rotation.x = Math.PI / 2;
  lower_joint_ring.position.y = 1.625;
  body_group.add(lower_joint_ring);

  const middle_joint_bandGeom = new THREE.CylinderGeometry(0.172, 0.172, 0.052, 40);
  const middle_joint_band = new THREE.Mesh(middle_joint_bandGeom, silverMat);
  middle_joint_band.name = "middle_joint_band";
  middle_joint_band.position.y = 4.55;
  body_group.add(middle_joint_band);

  const register_bandGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.045, 40);
  const register_band = new THREE.Mesh(register_bandGeom, silverMat);
  register_band.name = "register_band";
  register_band.position.y = 5.88;
  body_group.add(register_band);

  const mouthpieceProfile = [
    new THREE.Vector2(0, 6.17),
    new THREE.Vector2(0.15, 6.17),
    new THREE.Vector2(0.151, 6.29),
    new THREE.Vector2(0.145, 6.48),
    new THREE.Vector2(0.137, 6.76),
    new THREE.Vector2(0.128, 7.06),
    new THREE.Vector2(0.119, 7.30),
    new THREE.Vector2(0.112, 7.40),
    new THREE.Vector2(0.101, 7.45),
    new THREE.Vector2(0.075, 7.485),
    new THREE.Vector2(0.035, 7.505),
    new THREE.Vector2(0, 7.51)
  ];
  const mouthpieceGeom = new THREE.LatheGeometry(mouthpieceProfile, 48);
  const mouthpiece = new THREE.Mesh(mouthpieceGeom, darkWoodMat);
  mouthpiece.name = "mouthpiece";
  mouthpiece_group.add(mouthpiece);

  const mouthpiece_lower_ringGeom = new THREE.CylinderGeometry(0.166, 0.166, 0.025, 40);
  const mouthpiece_lower_ring = new THREE.Mesh(mouthpiece_lower_ringGeom, silverMat);
  mouthpiece_lower_ring.name = "mouthpiece_lower_ring";
  mouthpiece_lower_ring.position.y = 6.195;
  mouthpiece_group.add(mouthpiece_lower_ring);

  const mouthpiece_upper_ringGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.025, 40);
  const mouthpiece_upper_ring = new THREE.Mesh(mouthpiece_upper_ringGeom, silverMat);
  mouthpiece_upper_ring.name = "mouthpiece_upper_ring";
  mouthpiece_upper_ring.position.y = 6.245;
  mouthpiece_group.add(mouthpiece_upper_ring);

  const mouthpiece_bindingGeom = new THREE.CylinderGeometry(0.153, 0.153, 0.035, 40);
  const mouthpiece_binding = new THREE.Mesh(mouthpiece_bindingGeom, rubberMat);
  mouthpiece_binding.name = "mouthpiece_binding";
  mouthpiece_binding.position.y = 6.29;
  mouthpiece_group.add(mouthpiece_binding);

  const embouchureShape = new THREE.Shape();
  embouchureShape.moveTo(-0.075, -0.22);
  embouchureShape.lineTo(0.075, -0.22);
  embouchureShape.lineTo(0.071, 0.115);
  embouchureShape.bezierCurveTo(0.071, 0.18, 0.04, 0.22, 0, 0.22);
  embouchureShape.bezierCurveTo(-0.04, 0.22, -0.071, 0.18, -0.071, 0.115);
  embouchureShape.closePath();
  const embouchure_openingGeom = new THREE.ShapeGeometry(embouchureShape, 16);
  const embouchure_opening = new THREE.Mesh(embouchure_openingGeom, holeMat);
  embouchure_opening.name = "embouchure_opening";
  embouchure_opening.position.set(0, 5.91, 0.153);
  mouthpiece_group.add(embouchure_opening);

  const unitRodGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const y_axis = new THREE.Vector3(0, 1, 0);

  function addRod(parent, name, start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(unitRodGeom, material);
    rod.name = name;
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(y_axis, direction.normalize());
    rod.scale.set(radius, length, radius);
    parent.add(rod);
    return rod;
  }

  const tone_hole_data = [
    [0.00, 4.18, 0.17, 0.082],
    [0.01, 3.68, 0.165, 0.078],
    [0.06, 3.23, 0.16, 0.038],
    [0.04, 2.91, 0.158, 0.072],
    [0.07, 2.49, 0.155, 0.035],
    [0.02, 2.18, 0.155, 0.064],
    [-0.02, 1.82, 0.15, 0.052],
    [-0.08, 1.43, 0.145, 0.09]
  ];

  const tone_hole_centerGeom = new THREE.CylinderGeometry(1, 1, 0.018, 24);
  const tone_hole_centers = new THREE.InstancedMesh(
    tone_hole_centerGeom,
    holeMat,
    tone_hole_data.length
  );
  tone_hole_centers.name = "tone_hole_centers";

  const tone_hole_ringGeom = new THREE.TorusGeometry(1, 0.18, 8, 28);
  const tone_hole_rings = new THREE.InstancedMesh(
    tone_hole_ringGeom,
    silverMat,
    tone_hole_data.length
  );
  tone_hole_rings.name = "tone_hole_rings";

  const dummy = new THREE.Object3D();
  for (let i = 0; i < tone_hole_data.length; i++) {
    const x = tone_hole_data[i][0];
    const y = tone_hole_data[i][1];
    const z = tone_hole_data[i][2];
    const radius = tone_hole_data[i][3];

    dummy.position.set(x, y, z + 0.012);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(radius * 0.79, 1, radius * 0.79);
    dummy.updateMatrix();
    tone_hole_centers.setMatrixAt(i, dummy.matrix);

    dummy.position.set(x, y, z + 0.025);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(radius);
    dummy.updateMatrix();
    tone_hole_rings.setMatrixAt(i, dummy.matrix);
  }
  tone_hole_centers.instanceMatrix.needsUpdate = true;
  tone_hole_rings.instanceMatrix.needsUpdate = true;
  keywork_group.add(tone_hole_centers, tone_hole_rings);

  const upper_register_key = addRod(
    keywork_group,
    "upper_register_key",
    new THREE.Vector3(0.13, 5.15, 0.19),
    new THREE.Vector3(0.13, 5.86, 0.19),
    0.014,
    silverMat
  );

  const upper_register_paddleGeom = new THREE.SphereGeometry(1, 18, 10);
  const upper_register_paddle = new THREE.Mesh(upper_register_paddleGeom, silverMat);
  upper_register_paddle.name = "upper_register_paddle";
  upper_register_paddle.position.set(0.13, 5.23, 0.205);
  upper_register_paddle.scale.set(0.045, 0.13, 0.018);
  keywork_group.add(upper_register_paddle);

  const upper_register_touch = new THREE.Mesh(upper_register_paddleGeom, silverMat);
  upper_register_touch.name = "upper_register_touch";
  upper_register_touch.position.set(0.13, 5.11, 0.208);
  upper_register_touch.scale.set(0.052, 0.075, 0.018);
  keywork_group.add(upper_register_touch);

  const upper_register_cork = new THREE.Mesh(upper_register_paddleGeom, rubberMat);
  upper_register_cork.name = "upper_register_cork";
  upper_register_cork.position.set(0.13, 5.105, 0.164);
  upper_register_cork.scale.set(0.038, 0.055, 0.025);
  keywork_group.add(upper_register_cork);

  const left_main_rod = addRod(
    keywork_group,
    "left_main_rod",
    new THREE.Vector3(-0.235, 1.72, 0.205),
    new THREE.Vector3(-0.235, 4.34, 0.205),
    0.014,
    silverMat
  );

  const right_main_rod = addRod(
    keywork_group,
    "right_main_rod",
    new THREE.Vector3(0.225, 1.82, 0.205),
    new THREE.Vector3(0.225, 4.25, 0.205),
    0.014,
    silverMat
  );

  const lower_left_rail = addRod(
    keywork_group,
    "lower_left_rail",
    new THREE.Vector3(-0.19, 1.25, 0.19),
    new THREE.Vector3(-0.19, 2.35, 0.19),
    0.012,
    silverMat
  );

  const lower_right_rail = addRod(
    keywork_group,
    "lower_right_rail",
    new THREE.Vector3(0.18, 1.35, 0.19),
    new THREE.Vector3(0.18, 2.62, 0.19),
    0.012,
    silverMat
  );

  const upper_left_rail = addRod(
    keywork_group,
    "upper_left_rail",
    new THREE.Vector3(-0.19, 3.72, 0.19),
    new THREE.Vector3(-0.19, 4.43, 0.19),
    0.012,
    silverMat
  );

  const linkage_ys = [
    4.29, 4.04, 3.79, 3.53, 3.28, 3.03,
    2.78, 2.53, 2.28, 2.03, 1.78, 1.55
  ];

  const left_key_cupsGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.024, 18);
  const left_key_cups = new THREE.InstancedMesh(
    left_key_cupsGeom,
    silverMat,
    linkage_ys.length
  );
  left_key_cups.name = "left_key_cups";

  for (let i = 0; i < linkage_ys.length; i++) {
    dummy.position.set(-0.238, linkage_ys[i], 0.213);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    left_key_cups.setMatrixAt(i, dummy.matrix);
  }
  left_key_cups.instanceMatrix.needsUpdate = true;
  keywork_group.add(left_key_cups);

  const left_key_arms = new THREE.Group();
  left_key_arms.name = "left_key_arms";
  keywork_group.add(left_key_arms);

  const right_key_arms = new THREE.Group();
  right_key_arms.name = "right_key_arms";
  keywork_group.add(right_key_arms);

  for (let i = 0; i < linkage_ys.length; i++) {
    const y = linkage_ys[i];
    const hole = tone_hole_data.find((item) => Math.abs(item[1] - y) < 0.16);
    const targetX = hole ? hole[0] : 0;
    const targetZ = hole ? hole[2] + 0.035 : 0.18;

    addRod(
      left_key_arms,
      "left_key_arm_" + i,
      new THREE.Vector3(-0.235, y, 0.205),
      new THREE.Vector3(targetX - 0.045, y, targetZ),
      0.011,
      silverMat
    );

    if (i % 2 === 1 || i === 5 || i === 9) {
      addRod(
        right_key_arms,
        "right_key_arm_" + i,
        new THREE.Vector3(0.225, y + 0.025, 0.205),
        new THREE.Vector3(targetX + 0.045, y, targetZ),
        0.01,
        silverMat
      );
    }
  }

  const large_key_data = [
    [-0.285, 3.13, 0.205, 0.085, 0.115],
    [-0.285, 2.56, 0.205, 0.085, 0.115],
    [-0.275, 2.02, 0.205, 0.082, 0.11],
    [-0.16, 1.23, 0.19, 0.075, 0.105]
  ];

  const large_key_paddleGeom = new THREE.SphereGeometry(1, 20, 12);
  const large_key_paddles = new THREE.InstancedMesh(
    large_key_paddleGeom,
    rubberMat,
    large_key_data.length
  );
  large_key_paddles.name = "large_key_paddles";

  for (let i = 0; i < large_key_data.length; i++) {
    const item = large_key_data[i];
    dummy.position.set(item[0], item[1], item[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(item[3], item[4], 0.025);
    dummy.updateMatrix();
    large_key_paddles.setMatrixAt(i, dummy.matrix);
  }
  large_key_paddles.instanceMatrix.needsUpdate = true;
  keywork_group.add(large_key_paddles);

  const large_key_arms = new THREE.Group();
  large_key_arms.name = "large_key_arms";
  keywork_group.add(large_key_arms);

  for (let i = 0; i < large_key_data.length; i++) {
    const item = large_key_data[i];
    addRod(
      large_key_arms,
      "large_key_arm_" + i,
      new THREE.Vector3(item[0] + 0.045, item[1], item[2] - 0.015),
      new THREE.Vector3(item[0] < -0.2 ? -0.18 : 0.16, item[1], item[2]),
      0.012,
      silverMat
    );
  }

  const lower_jaw_keyGeom = new THREE.SphereGeometry(1, 20, 12);
  const lower_jaw_key = new THREE.Mesh(lower_jaw_keyGeom, silverMat);
  lower_jaw_key.name = "lower_jaw_key";
  lower_jaw_key.position.set(0.025, 1.52, 0.225);
  lower_jaw_key.scale.set(0.13, 0.075, 0.022);
  keywork_group.add(lower_jaw_key);

  const lower_jaw_key_center = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.018, 18),
    holeMat
  );
  lower_jaw_key_center.name = "lower_jaw_key_center";
  lower_jaw_key_center.rotation.x = Math.PI / 2;
  lower_jaw_key_center.position.set(0.025, 1.52, 0.247);
  keywork_group.add(lower_jaw_key_center);

  const lower_jaw_support = addRod(
    keywork_group,
    "lower_jaw_support",
    new THREE.Vector3(-0.19, 1.48, 0.19),
    new THREE.Vector3(0.025, 1.52, 0.215),
    0.012,
    silverMat
  );

  const lower_key_guard_points = [
    new THREE.Vector3(0.105, 1.02, 0.19),
    new THREE.Vector3(0.19, 1.08, 0.205),
    new THREE.Vector3(0.215, 1.25, 0.21),
    new THREE.Vector3(0.19, 1.43, 0.21),
    new THREE.Vector3(0.11, 1.52, 0.205)
  ];
  const lower_key_guardGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(lower_key_guard_points),
    24,
    0.014,
    8,
    false
  );
  const lower_key_guard = new THREE.Mesh(lower_key_guardGeom, silverMat);
  lower_key_guard.name = "lower_key_guard";
  keywork_group.add(lower_key_guard);

  const side_key_rod = addRod(
    keywork_group,
    "side_key_rod",
    new THREE.Vector3(0.265, 3.42, 0.13),
    new THREE.Vector3(0.265, 4.22, 0.13),
    0.012,
    silverMat
  );

  const side_key_cupsGeom = new THREE.SphereGeometry(1, 16, 10);
  const side_key_cups = new THREE.InstancedMesh(side_key_cupsGeom, silverMat, 3);
  side_key_cups.name = "side_key_cups";
  const side_key_ys = [3.55, 3.84, 4.12];

  for (let i = 0; i < side_key_ys.length; i++) {
    dummy.position.set(0.275, side_key_ys[i], 0.15);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.045, 0.06, 0.022);
    dummy.updateMatrix();
    side_key_cups.setMatrixAt(i, dummy.matrix);
  }
  side_key_cups.instanceMatrix.needsUpdate = true;
  keywork_group.add(side_key_cups);

  const post_positions = [];
  for (let i = 0; i < linkage_ys.length; i++) {
    post_positions.push([-0.235, linkage_ys[i]]);
    if (i % 2 === 0) post_positions.push([0.225, linkage_ys[i] + 0.02]);
  }
  post_positions.push(
    [-0.19, 1.35],
    [0.18, 1.48],
    [-0.19, 2.34],
    [0.18, 2.6],
    [-0.19, 3.73],
    [0.18, 4.32]
  );

  const mechanism_posts = new THREE.Group();
  mechanism_posts.name = "mechanism_posts";
  keywork_group.add(mechanism_posts);

  for (let i = 0; i < post_positions.length; i++) {
    const x = post_positions[i][0];
    const y = post_positions[i][1];
    const side = x < 0 ? -1 : 1;
    addRod(
      mechanism_posts,
      "mechanism_post_" + i,
      new THREE.Vector3(x + side * 0.055, y, 0.135),
      new THREE.Vector3(x, y, 0.205),
      0.011,
      silverMat
    );
  }

  const mechanism_screwsGeom = new THREE.SphereGeometry(0.022, 12, 8);
  const mechanism_screws = new THREE.InstancedMesh(
    mechanism_screwsGeom,
    silverMat,
    post_positions.length
  );
  mechanism_screws.name = "mechanism_screws";

  for (let i = 0; i < post_positions.length; i++) {
    dummy.position.set(post_positions[i][0], post_positions[i][1], 0.218);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    mechanism_screws.setMatrixAt(i, dummy.matrix);
  }
  mechanism_screws.instanceMatrix.needsUpdate = true;
  keywork_group.add(mechanism_screws);

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