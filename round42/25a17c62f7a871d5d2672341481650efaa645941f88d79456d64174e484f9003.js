export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "burning_candle";

  const waxMat = new THREE.MeshStandardMaterial({
    color: 0xf2f0e5,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wax_detailMat = new THREE.MeshStandardMaterial({
    color: 0xf8f6eb,
    metalness: 0.0,
    roughness: 0.7,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x21191a,
    metalness: 0.0,
    roughness: 0.95,
  });
  const emberMat = new THREE.MeshStandardMaterial({
    color: 0x7a3218,
    metalness: 0.0,
    roughness: 0.8,
    emissive: 0xff541c,
    emissiveIntensity: 1.0,
  });
  const outer_flameMat = new THREE.MeshStandardMaterial({
    color: 0xffb35c,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xff8a32,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const inner_flameMat = new THREE.MeshStandardMaterial({
    color: 0xfff8d8,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffe8a0,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const flame_coreMat = new THREE.MeshStandardMaterial({
    color: 0xff7b2c,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xff5c18,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const candle_baseProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.145, 0.000),
    new THREE.Vector2(0.168, 0.012),
    new THREE.Vector2(0.178, 0.035),
    new THREE.Vector2(0.178, 0.135),
    new THREE.Vector2(0.170, 0.160),
    new THREE.Vector2(0.148, 0.180),
    new THREE.Vector2(0.132, 0.188),
    new THREE.Vector2(0.000, 0.188),
  ];
  const candle_baseGeom = new THREE.LatheGeometry(candle_baseProfile, 48);
  const candle_base = new THREE.Mesh(candle_baseGeom, waxMat);
  candle_base.name = "candle_base";
  root.add(candle_base);

  const candle_bodyProfile = [
    new THREE.Vector2(0.000, 0.145),
    new THREE.Vector2(0.124, 0.145),
    new THREE.Vector2(0.132, 0.175),
    new THREE.Vector2(0.132, 0.330),
    new THREE.Vector2(0.128, 0.355),
    new THREE.Vector2(0.122, 0.385),
    new THREE.Vector2(0.124, 0.520),
    new THREE.Vector2(0.120, 0.555),
    new THREE.Vector2(0.121, 0.720),
    new THREE.Vector2(0.118, 0.760),
    new THREE.Vector2(0.119, 0.930),
    new THREE.Vector2(0.116, 0.970),
    new THREE.Vector2(0.117, 1.150),
    new THREE.Vector2(0.114, 1.190),
    new THREE.Vector2(0.115, 1.390),
    new THREE.Vector2(0.112, 1.430),
    new THREE.Vector2(0.113, 1.620),
    new THREE.Vector2(0.110, 1.670),
    new THREE.Vector2(0.111, 1.840),
    new THREE.Vector2(0.108, 1.885),
    new THREE.Vector2(0.108, 1.955),
    new THREE.Vector2(0.096, 1.978),
    new THREE.Vector2(0.072, 1.986),
    new THREE.Vector2(0.040, 1.980),
    new THREE.Vector2(0.000, 1.974),
  ];
  const candle_bodyGeom = new THREE.LatheGeometry(candle_bodyProfile, 48);
  const candle_body = new THREE.Mesh(candle_bodyGeom, waxMat);
  candle_body.name = "candle_body";
  root.add(candle_body);

  const melted_wax_collarGeom = new THREE.TorusGeometry(0.124, 0.007, 8, 40);
  const melted_wax_collar = new THREE.Mesh(
    melted_wax_collarGeom,
    wax_detailMat
  );
  melted_wax_collar.name = "melted_wax_collar";
  melted_wax_collar.rotation.x = Math.PI / 2;
  melted_wax_collar.position.y = 0.355;
  root.add(melted_wax_collar);

  const melted_wax_rimGeom = new THREE.TorusGeometry(0.087, 0.005, 8, 36);
  const melted_wax_rim = new THREE.Mesh(melted_wax_rimGeom, wax_detailMat);
  melted_wax_rim.name = "melted_wax_rim";
  melted_wax_rim.rotation.x = Math.PI / 2;
  melted_wax_rim.position.y = 1.979;
  root.add(melted_wax_rim);

  const wax_drip_leftCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.070, 1.982, 0.094),
      new THREE.Vector3(-0.094, 1.930, 0.088),
      new THREE.Vector3(-0.103, 1.820, 0.076),
      new THREE.Vector3(-0.106, 1.680, 0.067),
      new THREE.Vector3(-0.105, 1.555, 0.066),
    ],
    false,
    "centripetal"
  );
  const wax_drip_leftGeom = new THREE.TubeGeometry(
    wax_drip_leftCurve,
    28,
    0.009,
    8,
    false
  );
  const wax_drip_left = new THREE.Mesh(wax_drip_leftGeom, wax_detailMat);
  wax_drip_left.name = "wax_drip_left";
  root.add(wax_drip_left);

  const wax_drip_left_tipGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const wax_drip_left_tip = new THREE.Mesh(
    wax_drip_left_tipGeom,
    wax_detailMat
  );
  wax_drip_left_tip.name = "wax_drip_left_tip";
  wax_drip_left_tip.position.set(-0.105, 1.553, 0.066);
  wax_drip_left_tip.scale.set(0.75, 1.45, 0.75);
  root.add(wax_drip_left_tip);

  const wax_drip_rightCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.072, 1.984, 0.094),
      new THREE.Vector3(0.096, 1.943, 0.085),
      new THREE.Vector3(0.103, 1.865, 0.073),
      new THREE.Vector3(0.105, 1.790, 0.066),
    ],
    false,
    "centripetal"
  );
  const wax_drip_rightGeom = new THREE.TubeGeometry(
    wax_drip_rightCurve,
    18,
    0.008,
    8,
    false
  );
  const wax_drip_right = new THREE.Mesh(wax_drip_rightGeom, wax_detailMat);
  wax_drip_right.name = "wax_drip_right";
  root.add(wax_drip_right);

  const wax_drip_right_tipGeom = new THREE.SphereGeometry(0.010, 12, 8);
  const wax_drip_right_tip = new THREE.Mesh(
    wax_drip_right_tipGeom,
    wax_detailMat
  );
  wax_drip_right_tip.name = "wax_drip_right_tip";
  wax_drip_right_tip.position.set(0.105, 1.788, 0.066);
  wax_drip_right_tip.scale.set(0.72, 1.35, 0.72);
  root.add(wax_drip_right_tip);

  const wax_drip_lowerCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.038, 0.363, 0.123),
      new THREE.Vector3(-0.052, 0.320, 0.121),
      new THREE.Vector3(-0.057, 0.245, 0.119),
      new THREE.Vector3(-0.055, 0.175, 0.118),
    ],
    false,
    "centripetal"
  );
  const wax_drip_lowerGeom = new THREE.TubeGeometry(
    wax_drip_lowerCurve,
    18,
    0.007,
    8,
    false
  );
  const wax_drip_lower = new THREE.Mesh(wax_drip_lowerGeom, wax_detailMat);
  wax_drip_lower.name = "wax_drip_lower";
  root.add(wax_drip_lower);

  const wax_drip_longCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.060, 0.355, 0.112),
      new THREE.Vector3(0.077, 0.300, 0.108),
      new THREE.Vector3(0.084, 0.210, 0.101),
      new THREE.Vector3(0.081, 0.115, 0.096),
      new THREE.Vector3(0.070, 0.055, 0.090),
    ],
    false,
    "centripetal"
  );
  const wax_drip_longGeom = new THREE.TubeGeometry(
    wax_drip_longCurve,
    28,
    0.006,
    8,
    false
  );
  const wax_drip_long = new THREE.Mesh(wax_drip_longGeom, wax_detailMat);
  wax_drip_long.name = "wax_drip_long";
  root.add(wax_drip_long);

  const wax_drip_long_tipGeom = new THREE.SphereGeometry(0.009, 12, 8);
  const wax_drip_long_tip = new THREE.Mesh(
    wax_drip_long_tipGeom,
    wax_detailMat
  );
  wax_drip_long_tip.name = "wax_drip_long_tip";
  wax_drip_long_tip.position.set(0.070, 0.053, 0.090);
  wax_drip_long_tip.scale.set(0.7, 1.4, 0.7);
  root.add(wax_drip_long_tip);

  const wickCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.000, 1.972, 0.006),
      new THREE.Vector3(0.002, 2.025, 0.008),
      new THREE.Vector3(0.010, 2.080, 0.010),
      new THREE.Vector3(-0.004, 2.135, 0.012),
      new THREE.Vector3(-0.035, 2.172, 0.014),
    ],
    false,
    "centripetal"
  );
  const wickGeom = new THREE.TubeGeometry(wickCurve, 24, 0.010, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  wick.name = "wick";
  root.add(wick);

  const wick_emberCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.004, 2.132, 0.012),
      new THREE.Vector3(-0.018, 2.154, 0.013),
      new THREE.Vector3(-0.035, 2.172, 0.014),
    ],
    false,
    "centripetal"
  );
  const wick_emberGeom = new THREE.TubeGeometry(
    wick_emberCurve,
    10,
    0.0115,
    8,
    false
  );
  const wick_ember = new THREE.Mesh(wick_emberGeom, emberMat);
  wick_ember.name = "wick_ember";
  root.add(wick_ember);

  const outer_flameProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.028, 0.018),
    new THREE.Vector2(0.063, 0.070),
    new THREE.Vector2(0.078, 0.155),
    new THREE.Vector2(0.075, 0.245),
    new THREE.Vector2(0.063, 0.345),
    new THREE.Vector2(0.047, 0.445),
    new THREE.Vector2(0.028, 0.535),
    new THREE.Vector2(0.012, 0.590),
    new THREE.Vector2(0.000, 0.620),
  ];
  const outer_flameGeom = new THREE.LatheGeometry(outer_flameProfile, 32);
  const outer_flame = new THREE.Mesh(outer_flameGeom, outer_flameMat);
  outer_flame.name = "outer_flame";
  outer_flame.position.set(-0.026, 2.105, 0);
  outer_flame.renderOrder = 2;
  root.add(outer_flame);

  const inner_flameProfile = [
    new THREE.Vector2(0.000, 0.010),
    new THREE.Vector2(0.022, 0.022),
    new THREE.Vector2(0.049, 0.072),
    new THREE.Vector2(0.054, 0.145),
    new THREE.Vector2(0.047, 0.225),
    new THREE.Vector2(0.034, 0.305),
    new THREE.Vector2(0.018, 0.375),
    new THREE.Vector2(0.000, 0.425),
  ];
  const inner_flameGeom = new THREE.LatheGeometry(inner_flameProfile, 32);
  const inner_flame = new THREE.Mesh(inner_flameGeom, inner_flameMat);
  inner_flame.name = "inner_flame";
  inner_flame.position.set(-0.024, 2.115, 0);
  inner_flame.renderOrder = 3;
  root.add(inner_flame);

  const flame_coreProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.018, 0.015),
    new THREE.Vector2(0.025, 0.045),
    new THREE.Vector2(0.019, 0.085),
    new THREE.Vector2(0.000, 0.125),
  ];
  const flame_coreGeom = new THREE.LatheGeometry(flame_coreProfile, 24);
  const flame_core = new THREE.Mesh(flame_coreGeom, flame_coreMat);
  flame_core.name = "flame_core";
  flame_core.position.set(-0.020, 2.108, 0);
  flame_core.renderOrder = 4;
  root.add(flame_core);

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

  fitToUnitCube(THREE, root);
  return root;
}