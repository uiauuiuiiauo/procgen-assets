export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "unicorn_teacup";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf3f1e8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc49a4a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const outlineMat = new THREE.MeshStandardMaterial({
    color: 0x54375e,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb9a8d7,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lavenderMat = new THREE.MeshStandardMaterial({
    color: 0x938bc2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const paleHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xe8d9ed,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xd968a1,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lightPinkMat = new THREE.MeshStandardMaterial({
    color: 0xf0b2c9,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xe7cb65,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const tealMat = new THREE.MeshStandardMaterial({
    color: 0x55aeb1,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x82b99b,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const hornMat = new THREE.MeshStandardMaterial({
    color: 0xf0c68d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const hoofMat = new THREE.MeshStandardMaterial({
    color: 0x302b35,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const eyeMat = new THREE.MeshStandardMaterial({
    color: 0x17151d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const cup_bodyProfile = [
    new THREE.Vector2(0.00, 0.11),
    new THREE.Vector2(0.27, 0.11),
    new THREE.Vector2(0.31, 0.14),
    new THREE.Vector2(0.35, 0.22),
    new THREE.Vector2(0.39, 0.34),
    new THREE.Vector2(0.43, 0.50),
    new THREE.Vector2(0.46, 0.66),
    new THREE.Vector2(0.47, 0.72),
    new THREE.Vector2(0.46, 0.745),
    new THREE.Vector2(0.435, 0.755),
    new THREE.Vector2(0.416, 0.715),
    new THREE.Vector2(0.400, 0.60),
    new THREE.Vector2(0.370, 0.44),
    new THREE.Vector2(0.330, 0.29),
    new THREE.Vector2(0.275, 0.19),
    new THREE.Vector2(0.18, 0.15),
    new THREE.Vector2(0.00, 0.15),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, ceramicMat);
  cup_body.name = "cup_body";
  root.add(cup_body);

  const pedestal_footProfile = [
    new THREE.Vector2(0.00, 0.015),
    new THREE.Vector2(0.295, 0.015),
    new THREE.Vector2(0.330, 0.030),
    new THREE.Vector2(0.345, 0.052),
    new THREE.Vector2(0.338, 0.075),
    new THREE.Vector2(0.310, 0.100),
    new THREE.Vector2(0.285, 0.118),
    new THREE.Vector2(0.00, 0.118),
  ];
  const pedestal_footGeom = new THREE.LatheGeometry(pedestal_footProfile, 64);
  const pedestal_foot = new THREE.Mesh(pedestal_footGeom, ceramicMat);
  pedestal_foot.name = "pedestal_foot";
  root.add(pedestal_foot);

  const top_rimGeom = new THREE.TorusGeometry(0.447, 0.014, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, ceramicMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 0.738;
  root.add(top_rim);

  const upper_gold_bandGeom = new THREE.TorusGeometry(0.302, 0.006, 8, 64);
  const upper_gold_band = new THREE.Mesh(upper_gold_bandGeom, goldMat);
  upper_gold_band.name = "upper_gold_band";
  upper_gold_band.rotation.x = Math.PI / 2;
  upper_gold_band.position.y = 0.113;
  root.add(upper_gold_band);

  const lower_gold_bandGeom = new THREE.TorusGeometry(0.329, 0.006, 8, 64);
  const lower_gold_band = new THREE.Mesh(lower_gold_bandGeom, goldMat);
  lower_gold_band.name = "lower_gold_band";
  lower_gold_band.rotation.x = Math.PI / 2;
  lower_gold_band.position.y = 0.038;
  root.add(lower_gold_band);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.425, 0.605, -0.015),
    new THREE.Vector3(0.505, 0.655, -0.018),
    new THREE.Vector3(0.620, 0.665, -0.020),
    new THREE.Vector3(0.710, 0.600, -0.020),
    new THREE.Vector3(0.742, 0.490, -0.020),
    new THREE.Vector3(0.700, 0.365, -0.020),
    new THREE.Vector3(0.600, 0.265, -0.018),
    new THREE.Vector3(0.475, 0.205, -0.015),
    new THREE.Vector3(0.370, 0.225, -0.012),
  ], false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handlePath, 56, 0.047, 14, false);
  const handle = new THREE.Mesh(handleGeom, ceramicMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 12);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.426, 0.605, -0.012);
  upper_handle_mount.scale.set(0.060, 0.075, 0.052);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, ceramicMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.365, 0.225, -0.012);
  lower_handle_mount.scale.set(0.060, 0.065, 0.052);
  root.add(lower_handle_mount);

  const decal_group = new THREE.Group();
  decal_group.name = "unicorn_decal";
  root.add(decal_group);

  function cupRadiusAt(y) {
    if (y <= 0.14) return 0.31;
    if (y <= 0.22) return 0.31 + (y - 0.14) / 0.08 * 0.04;
    if (y <= 0.34) return 0.35 + (y - 0.22) / 0.12 * 0.04;
    if (y <= 0.50) return 0.39 + (y - 0.34) / 0.16 * 0.04;
    if (y <= 0.66) return 0.43 + (y - 0.50) / 0.16 * 0.03;
    return 0.46 + Math.min((y - 0.66) / 0.06, 1) * 0.01;
  }

  function surfacePose(x, y, extra) {
    const radius = cupRadiusAt(y);
    const safeX = Math.max(-radius * 0.96, Math.min(radius * 0.96, x));
    const z = Math.sqrt(Math.max(0.0001, radius * radius - safeX * safeX));
    const normal = new THREE.Vector3(safeX / radius, 0, z / radius).normalize();
    const position = new THREE.Vector3(safeX, y, z).addScaledVector(normal, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function placeDecal(mesh, x, y, sx, sy, rotation, extra) {
    const pose = surfacePose(x, y, extra);
    mesh.position.copy(pose.position);
    mesh.quaternion.copy(pose.quaternion);
    mesh.rotateZ(rotation);
    mesh.scale.set(sx, sy, 1);
    decal_group.add(mesh);
  }

  function addSurfaceTube(name, coordinates, radius, material, extra) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(surfacePose(coordinate[0], coordinate[1], extra).position);
    }
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(6, (points.length - 1) * 8),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    decal_group.add(mesh);
    return mesh;
  }

  const decal_discGeom = new THREE.CircleGeometry(1, 32);

  const unicorn_body_outline = new THREE.Mesh(decal_discGeom, outlineMat);
  unicorn_body_outline.name = "unicorn_body_outline";
  placeDecal(unicorn_body_outline, 0.065, 0.365, 0.205, 0.116, -0.03, 0.004);

  const unicorn_body = new THREE.Mesh(decal_discGeom, bodyMat);
  unicorn_body.name = "unicorn_body";
  placeDecal(unicorn_body, 0.065, 0.365, 0.194, 0.106, -0.03, 0.006);

  const unicorn_body_shadow = new THREE.Mesh(decal_discGeom, lavenderMat);
  unicorn_body_shadow.name = "unicorn_body_shadow";
  placeDecal(unicorn_body_shadow, 0.045, 0.326, 0.155, 0.060, -0.02, 0.007);

  const unicorn_body_highlight = new THREE.Mesh(decal_discGeom, paleHighlightMat);
  unicorn_body_highlight.name = "unicorn_body_highlight";
  placeDecal(unicorn_body_highlight, 0.025, 0.405, 0.105, 0.046, 0.02, 0.008);

  const unicorn_neck_outline = new THREE.Mesh(decal_discGeom, outlineMat);
  unicorn_neck_outline.name = "unicorn_neck_outline";
  placeDecal(unicorn_neck_outline, -0.105, 0.430, 0.083, 0.164, 0.29, 0.0045);

  const unicorn_neck = new THREE.Mesh(decal_discGeom, bodyMat);
  unicorn_neck.name = "unicorn_neck";
  placeDecal(unicorn_neck, -0.105, 0.430, 0.074, 0.154, 0.29, 0.0065);

  const unicorn_neck_highlight = new THREE.Mesh(decal_discGeom, paleHighlightMat);
  unicorn_neck_highlight.name = "unicorn_neck_highlight";
  placeDecal(unicorn_neck_highlight, -0.125, 0.445, 0.033, 0.103, 0.29, 0.008);

  const unicorn_head_outline = new THREE.Mesh(decal_discGeom, outlineMat);
  unicorn_head_outline.name = "unicorn_head_outline";
  placeDecal(unicorn_head_outline, -0.218, 0.475, 0.111, 0.070, 0.30, 0.005);

  const unicorn_head = new THREE.Mesh(decal_discGeom, bodyMat);
  unicorn_head.name = "unicorn_head";
  placeDecal(unicorn_head, -0.218, 0.475, 0.102, 0.061, 0.30, 0.007);

  const unicorn_muzzle_outline = new THREE.Mesh(decal_discGeom, outlineMat);
  unicorn_muzzle_outline.name = "unicorn_muzzle_outline";
  placeDecal(unicorn_muzzle_outline, -0.292, 0.421, 0.067, 0.043, 0.16, 0.0055);

  const unicorn_muzzle = new THREE.Mesh(decal_discGeom, paleHighlightMat);
  unicorn_muzzle.name = "unicorn_muzzle";
  placeDecal(unicorn_muzzle, -0.292, 0.421, 0.059, 0.035, 0.16, 0.0075);

  const rear_far_leg = addSurfaceTube(
    "rear_far_leg",
    [[0.145, 0.335], [0.175, 0.270], [0.158, 0.207]],
    0.013,
    lavenderMat,
    0.005
  );
  const rear_near_leg = addSurfaceTube(
    "rear_near_leg",
    [[0.225, 0.340], [0.205, 0.265], [0.170, 0.195]],
    0.014,
    bodyMat,
    0.006
  );
  const front_far_leg = addSurfaceTube(
    "front_far_leg",
    [[-0.075, 0.340], [-0.045, 0.285], [-0.080, 0.235], [-0.035, 0.205]],
    0.012,
    lavenderMat,
    0.005
  );
  const front_near_leg = addSurfaceTube(
    "front_near_leg",
    [[-0.125, 0.350], [-0.105, 0.290], [-0.145, 0.245], [-0.125, 0.205]],
    0.014,
    bodyMat,
    0.006
  );

  const front_near_hoof = new THREE.Mesh(decal_discGeom, hoofMat);
  front_near_hoof.name = "front_near_hoof";
  placeDecal(front_near_hoof, -0.137, 0.198, 0.027, 0.017, -0.18, 0.008);

  const front_far_hoof = new THREE.Mesh(decal_discGeom, hoofMat);
  front_far_hoof.name = "front_far_hoof";
  placeDecal(front_far_hoof, -0.034, 0.199, 0.025, 0.016, 0.12, 0.007);

  const rear_near_hoof = new THREE.Mesh(decal_discGeom, hoofMat);
  rear_near_hoof.name = "rear_near_hoof";
  placeDecal(rear_near_hoof, 0.165, 0.188, 0.028, 0.017, -0.10, 0.008);

  const rear_far_hoof = new THREE.Mesh(decal_discGeom, hoofMat);
  rear_far_hoof.name = "rear_far_hoof";
  placeDecal(rear_far_hoof, 0.155, 0.202, 0.025, 0.016, 0.15, 0.007);

  const tail_base_outline = new THREE.Mesh(decal_discGeom, outlineMat);
  tail_base_outline.name = "tail_base_outline";
  placeDecal(tail_base_outline, 0.264, 0.393, 0.052, 0.062, -0.28, 0.0045);

  const tail_base = new THREE.Mesh(decal_discGeom, pinkMat);
  tail_base.name = "tail_base";
  placeDecal(tail_base, 0.264, 0.393, 0.044, 0.054, -0.28, 0.0065);

  const tail_pink = addSurfaceTube(
    "tail_pink",
    [[0.260, 0.405], [0.330, 0.430], [0.373, 0.392], [0.370, 0.330], [0.337, 0.282], [0.360, 0.252]],
    0.012,
    pinkMat,
    0.007
  );
  const tail_yellow = addSurfaceTube(
    "tail_yellow",
    [[0.262, 0.398], [0.322, 0.412], [0.355, 0.374], [0.352, 0.320], [0.322, 0.278], [0.342, 0.260]],
    0.008,
    yellowMat,
    0.008
  );
  const tail_light_pink = addSurfaceTube(
    "tail_light_pink",
    [[0.260, 0.389], [0.310, 0.398], [0.338, 0.360], [0.330, 0.315], [0.302, 0.282]],
    0.006,
    lightPinkMat,
    0.009
  );

  const mane_teal = addSurfaceTube(
    "mane_teal",
    [[-0.145, 0.535], [-0.090, 0.585], [-0.020, 0.590], [0.060, 0.555], [0.125, 0.520]],
    0.012,
    tealMat,
    0.006
  );
  const mane_green = addSurfaceTube(
    "mane_green",
    [[-0.135, 0.525], [-0.075, 0.565], [-0.010, 0.555], [0.060, 0.510], [0.120, 0.475]],
    0.011,
    greenMat,
    0.007
  );
  const mane_pink = addSurfaceTube(
    "mane_pink",
    [[-0.130, 0.515], [-0.075, 0.545], [-0.025, 0.515], [0.025, 0.465], [0.092, 0.445]],
    0.013,
    pinkMat,
    0.008
  );
  const mane_yellow = addSurfaceTube(
    "mane_yellow",
    [[-0.128, 0.505], [-0.080, 0.520], [-0.045, 0.480], [-0.040, 0.425], [0.010, 0.397]],
    0.010,
    yellowMat,
    0.009
  );
  const mane_light_pink = addSurfaceTube(
    "mane_light_pink",
    [[-0.125, 0.495], [-0.090, 0.500], [-0.070, 0.458], [-0.078, 0.410], [-0.045, 0.385]],
    0.008,
    lightPinkMat,
    0.010
  );
  const mane_lavender = addSurfaceTube(
    "mane_lavender",
    [[-0.120, 0.485], [-0.098, 0.460], [-0.100, 0.420], [-0.080, 0.385]],
    0.007,
    lavenderMat,
    0.010
  );

  const left_ear_outlineShape = new THREE.Shape();
  left_ear_outlineShape.moveTo(-0.028, -0.034);
  left_ear_outlineShape.lineTo(0, 0.052);
  left_ear_outlineShape.lineTo(0.030, -0.030);
  left_ear_outlineShape.closePath();
  const left_ear_outlineGeom = new THREE.ShapeGeometry(left_ear_outlineShape);
  const left_ear_outline = new THREE.Mesh(left_ear_outlineGeom, outlineMat);
  left_ear_outline.name = "left_ear_outline";
  placeDecal(left_ear_outline, -0.184, 0.555, 1, 1, -0.13, 0.005);

  const left_earShape = new THREE.Shape();
  left_earShape.moveTo(-0.020, -0.027);
  left_earShape.lineTo(0, 0.038);
  left_earShape.lineTo(0.021, -0.024);
  left_earShape.closePath();
  const left_earGeom = new THREE.ShapeGeometry(left_earShape);
  const left_ear = new THREE.Mesh(left_earGeom, bodyMat);
  left_ear.name = "left_ear";
  placeDecal(left_ear, -0.184, 0.555, 1, 1, -0.13, 0.007);

  const left_inner_earShape = new THREE.Shape();
  left_inner_earShape.moveTo(-0.010, -0.016);
  left_inner_earShape.lineTo(0, 0.022);
  left_inner_earShape.lineTo(0.011, -0.014);
  left_inner_earShape.closePath();
  const left_inner_earGeom = new THREE.ShapeGeometry(left_inner_earShape);
  const left_inner_ear = new THREE.Mesh(left_inner_earGeom, pinkMat);
  left_inner_ear.name = "left_inner_ear";
  placeDecal(left_inner_ear, -0.184, 0.554, 1, 1, -0.13, 0.008);

  const right_ear_outlineShape = new THREE.Shape();
  right_ear_outlineShape.moveTo(-0.026, -0.032);
  right_ear_outlineShape.lineTo(0, 0.048);
  right_ear_outlineShape.lineTo(0.028, -0.029);
  right_ear_outlineShape.closePath();
  const right_ear_outlineGeom = new THREE.ShapeGeometry(right_ear_outlineShape);
  const right_ear_outline = new THREE.Mesh(right_ear_outlineGeom, outlineMat);
  right_ear_outline.name = "right_ear_outline";
  placeDecal(right_ear_outline, -0.105, 0.550, 1, 1, 0.16, 0.005);

  const right_earShape = new THREE.Shape();
  right_earShape.moveTo(-0.018, -0.025);
  right_earShape.lineTo(0, 0.035);
  right_earShape.lineTo(0.019, -0.022);
  right_earShape.closePath();
  const right_earGeom = new THREE.ShapeGeometry(right_earShape);
  const right_ear = new THREE.Mesh(right_earGeom, bodyMat);
  right_ear.name = "right_ear";
  placeDecal(right_ear, -0.105, 0.550, 1, 1, 0.16, 0.007);

  const unicorn_hornShape = new THREE.Shape();
  unicorn_hornShape.moveTo(-0.018, -0.018);
  unicorn_hornShape.lineTo(0, 0.118);
  unicorn_hornShape.lineTo(0.018, -0.018);
  unicorn_hornShape.closePath();
  const unicorn_hornGeom = new THREE.ShapeGeometry(unicorn_hornShape);
  const unicorn_horn = new THREE.Mesh(unicorn_hornGeom, hornMat);
  unicorn_horn.name = "unicorn_horn";
  placeDecal(unicorn_horn, -0.274, 0.574, 1, 1, 0.47, 0.007);

  const horn_stripe_lower = addSurfaceTube(
    "horn_stripe_lower",
    [[-0.263, 0.558], [-0.251, 0.563]],
    0.003,
    pinkMat,
    0.009
  );
  const horn_stripe_middle = addSurfaceTube(
    "horn_stripe_middle",
    [[-0.282, 0.590], [-0.270, 0.595]],
    0.003,
    pinkMat,
    0.009
  );
  const horn_stripe_upper = addSurfaceTube(
    "horn_stripe_upper",
    [[-0.300, 0.621], [-0.288, 0.626]],
    0.0028,
    pinkMat,
    0.009
  );

  const forelock_outline = addSurfaceTube(
    "forelock_outline",
    [[-0.225, 0.545], [-0.245, 0.525], [-0.235, 0.495]],
    0.010,
    outlineMat,
    0.006
  );
  const forelock = addSurfaceTube(
    "forelock",
    [[-0.225, 0.545], [-0.245, 0.525], [-0.235, 0.495]],
    0.006,
    yellowMat,
    0.008
  );
  const forelock_pink = addSurfaceTube(
    "forelock_pink",
    [[-0.205, 0.546], [-0.220, 0.525], [-0.210, 0.500]],
    0.006,
    pinkMat,
    0.009
  );

  const unicorn_eye_white = new THREE.Mesh(decal_discGeom, eyeWhiteMat);
  unicorn_eye_white.name = "unicorn_eye_white";
  placeDecal(unicorn_eye_white, -0.231, 0.493, 0.014, 0.010, -0.08, 0.009);

  const unicorn_eye = new THREE.Mesh(decal_discGeom, eyeMat);
  unicorn_eye.name = "unicorn_eye";
  placeDecal(unicorn_eye, -0.234, 0.493, 0.008, 0.009, 0, 0.010);

  const unicorn_eye_glint = new THREE.Mesh(decal_discGeom, eyeWhiteMat);
  unicorn_eye_glint.name = "unicorn_eye_glint";
  placeDecal(unicorn_eye_glint, -0.237, 0.497, 0.0025, 0.0025, 0, 0.011);

  const unicorn_nostril = new THREE.Mesh(decal_discGeom, eyeMat);
  unicorn_nostril.name = "unicorn_nostril";
  placeDecal(unicorn_nostril, -0.326, 0.427, 0.006, 0.0045, -0.15, 0.009);

  const mouth_line = addSurfaceTube(
    "mouth_line",
    [[-0.320, 0.407], [-0.292, 0.398], [-0.263, 0.405]],
    0.0025,
    outlineMat,
    0.009
  );
  const neck_detail_line = addSurfaceTube(
    "neck_detail_line",
    [[-0.105, 0.385], [-0.075, 0.350], [-0.050, 0.325]],
    0.0025,
    outlineMat,
    0.009
  );
  const belly_detail_line = addSurfaceTube(
    "belly_detail_line",
    [[-0.020, 0.305], [0.060, 0.296], [0.145, 0.307]],
    0.0025,
    outlineMat,
    0.009
  );

  const body_sparkle_left = new THREE.Mesh(decal_discGeom, lightPinkMat);
  body_sparkle_left.name = "body_sparkle_left";
  placeDecal(body_sparkle_left, 0.105, 0.405, 0.008, 0.013, -0.25, 0.010);

  const body_sparkle_right = new THREE.Mesh(decal_discGeom, yellowMat);
  body_sparkle_right.name = "body_sparkle_right";
  placeDecal(body_sparkle_right, 0.192, 0.365, 0.007, 0.011, 0.30, 0.010);

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