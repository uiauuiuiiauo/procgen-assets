export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "decorative_spoon";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x6b4610,
    metalness: 0.5,
    roughness: 0.25,
  });

  const silver_handleProfile = [
    new THREE.Vector2(0.000, -1.600),
    new THREE.Vector2(0.034, -1.600),
    new THREE.Vector2(0.050, -1.575),
    new THREE.Vector2(0.058, -1.510),
    new THREE.Vector2(0.060, -1.300),
    new THREE.Vector2(0.064, -0.850),
    new THREE.Vector2(0.068, -0.350),
    new THREE.Vector2(0.071, 0.045),
    new THREE.Vector2(0.000, 0.045),
  ];
  const silver_handleGeom = new THREE.LatheGeometry(silver_handleProfile, 32);
  const silver_handle = new THREE.Mesh(silver_handleGeom, silverMat);
  silver_handle.name = "silver_handle";
  root.add(silver_handle);

  const gold_neckProfile = [
    new THREE.Vector2(0.000, 0.035),
    new THREE.Vector2(0.071, 0.035),
    new THREE.Vector2(0.070, 0.180),
    new THREE.Vector2(0.067, 0.360),
    new THREE.Vector2(0.078, 0.470),
    new THREE.Vector2(0.110, 0.555),
    new THREE.Vector2(0.000, 0.555),
  ];
  const gold_neckGeom = new THREE.LatheGeometry(gold_neckProfile, 32);
  const gold_neck = new THREE.Mesh(gold_neckGeom, goldMat);
  gold_neck.name = "gold_neck";
  root.add(gold_neck);

  const collar_seamGeom = new THREE.TorusGeometry(0.069, 0.0035, 8, 32);
  const collar_seam = new THREE.Mesh(collar_seamGeom, engravingMat);
  collar_seam.name = "collar_seam";
  collar_seam.rotation.x = Math.PI / 2;
  collar_seam.position.y = 0.042;
  root.add(collar_seam);

  const bowl_group = new THREE.Group();
  bowl_group.name = "bowl_group";
  bowl_group.position.set(0, 0.46, 0);
  bowl_group.rotation.z = -0.08;
  root.add(bowl_group);

  const bowl_shellShape = new THREE.Shape();
  bowl_shellShape.moveTo(0.000, 0.000);
  bowl_shellShape.bezierCurveTo(-0.075, 0.025, -0.275, 0.155, -0.365, 0.420);
  bowl_shellShape.bezierCurveTo(-0.475, 0.760, -0.390, 1.175, -0.165, 1.430);
  bowl_shellShape.bezierCurveTo(-0.075, 1.535, 0.055, 1.555, 0.175, 1.455);
  bowl_shellShape.bezierCurveTo(0.395, 1.270, 0.465, 0.885, 0.405, 0.575);
  bowl_shellShape.bezierCurveTo(0.355, 0.305, 0.165, 0.095, 0.000, 0.000);
  bowl_shellShape.closePath();

  const bowl_shellGeom = new THREE.ExtrudeGeometry(bowl_shellShape, {
    depth: 0.045,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const bowl_shell = new THREE.Mesh(bowl_shellGeom, goldMat);
  bowl_shell.name = "bowl_shell";
  bowl_shell.position.z = -0.0225;
  bowl_group.add(bowl_shell);

  const bowl_frontGeom = new THREE.ShapeGeometry(bowl_shellShape, 32);
  const bowl_front = new THREE.Mesh(bowl_frontGeom, goldMat);
  bowl_front.name = "bowl_front";
  bowl_front.scale.set(0.952, 0.966, 1);
  bowl_front.position.set(0, 0.010, 0.038);
  bowl_group.add(bowl_front);

  const bowl_back = new THREE.Mesh(bowl_frontGeom, goldMat);
  bowl_back.name = "bowl_back";
  bowl_back.scale.set(0.952, 0.966, 1);
  bowl_back.position.set(0, 0.010, -0.038);
  bowl_group.add(bowl_back);

  const rimPoints = [
    new THREE.Vector3(0.000, 0.018, 0.043),
    new THREE.Vector3(-0.145, 0.105, 0.043),
    new THREE.Vector3(-0.305, 0.315, 0.043),
    new THREE.Vector3(-0.405, 0.630, 0.043),
    new THREE.Vector3(-0.370, 0.990, 0.043),
    new THREE.Vector3(-0.185, 1.335, 0.043),
    new THREE.Vector3(0.035, 1.515, 0.043),
    new THREE.Vector3(0.245, 1.385, 0.043),
    new THREE.Vector3(0.405, 1.070, 0.043),
    new THREE.Vector3(0.420, 0.705, 0.043),
    new THREE.Vector3(0.315, 0.350, 0.043),
    new THREE.Vector3(0.135, 0.105, 0.043),
  ];
  const bowl_rimCurve = new THREE.CatmullRomCurve3(
    rimPoints,
    true,
    "centripetal"
  );
  const bowl_rimGeom = new THREE.TubeGeometry(
    bowl_rimCurve,
    96,
    0.013,
    8,
    true
  );
  const bowl_rim = new THREE.Mesh(bowl_rimGeom, goldMat);
  bowl_rim.name = "bowl_rim";
  bowl_group.add(bowl_rim);

  const engraving_group = new THREE.Group();
  engraving_group.name = "engraving_group";
  engraving_group.position.set(0.025, 0.650, 0.044);
  bowl_group.add(engraving_group);

  const lotus_center_petalShape = new THREE.Shape();
  lotus_center_petalShape.moveTo(0.000, -0.075);
  lotus_center_petalShape.bezierCurveTo(
    -0.055,
    -0.025,
    -0.050,
    0.075,
    0.000,
    0.125
  );
  lotus_center_petalShape.bezierCurveTo(
    0.050,
    0.075,
    0.055,
    -0.025,
    0.000,
    -0.075
  );
  lotus_center_petalShape.closePath();

  const lotus_center_petalGeom = new THREE.ShapeGeometry(
    lotus_center_petalShape,
    20
  );
  const lotus_center_petal = new THREE.Mesh(
    lotus_center_petalGeom,
    goldMat
  );
  lotus_center_petal.name = "lotus_center_petal";
  lotus_center_petal.position.z = 0.001;
  engraving_group.add(lotus_center_petal);

  const lotus_center_outlinePoints = [
    new THREE.Vector3(0.000, -0.073, 0.004),
    new THREE.Vector3(-0.043, -0.020, 0.004),
    new THREE.Vector3(-0.038, 0.062, 0.004),
    new THREE.Vector3(0.000, 0.123, 0.004),
    new THREE.Vector3(0.038, 0.062, 0.004),
    new THREE.Vector3(0.043, -0.020, 0.004),
  ];
  const lotus_center_outlineCurve = new THREE.CatmullRomCurve3(
    lotus_center_outlinePoints,
    true,
    "centripetal"
  );
  const lotus_center_outlineGeom = new THREE.TubeGeometry(
    lotus_center_outlineCurve,
    32,
    0.004,
    6,
    true
  );
  const lotus_center_outline = new THREE.Mesh(
    lotus_center_outlineGeom,
    engravingMat
  );
  lotus_center_outline.name = "lotus_center_outline";
  engraving_group.add(lotus_center_outline);

  const lotus_left_petalPoints = [
    new THREE.Vector3(-0.005, -0.058, 0.004),
    new THREE.Vector3(-0.060, 0.005, 0.004),
    new THREE.Vector3(-0.105, 0.050, 0.004),
    new THREE.Vector3(-0.175, 0.035, 0.004),
    new THREE.Vector3(-0.125, -0.045, 0.004),
    new THREE.Vector3(-0.055, -0.085, 0.004),
  ];
  const lotus_left_petalCurve = new THREE.CatmullRomCurve3(
    lotus_left_petalPoints,
    true,
    "centripetal"
  );
  const lotus_left_petalGeom = new THREE.TubeGeometry(
    lotus_left_petalCurve,
    30,
    0.004,
    6,
    true
  );
  const lotus_left_petal = new THREE.Mesh(
    lotus_left_petalGeom,
    engravingMat
  );
  lotus_left_petal.name = "lotus_left_petal";
  engraving_group.add(lotus_left_petal);

  const lotus_right_petalPoints = [
    new THREE.Vector3(0.005, -0.058, 0.004),
    new THREE.Vector3(0.060, 0.005, 0.004),
    new THREE.Vector3(0.105, 0.050, 0.004),
    new THREE.Vector3(0.175, 0.035, 0.004),
    new THREE.Vector3(0.125, -0.045, 0.004),
    new THREE.Vector3(0.055, -0.085, 0.004),
  ];
  const lotus_right_petalCurve = new THREE.CatmullRomCurve3(
    lotus_right_petalPoints,
    true,
    "centripetal"
  );
  const lotus_right_petalGeom = new THREE.TubeGeometry(
    lotus_right_petalCurve,
    30,
    0.004,
    6,
    true
  );
  const lotus_right_petal = new THREE.Mesh(
    lotus_right_petalGeom,
    engravingMat
  );
  lotus_right_petal.name = "lotus_right_petal";
  engraving_group.add(lotus_right_petal);

  const lotus_lower_leftPoints = [
    new THREE.Vector3(-0.005, -0.080, 0.004),
    new THREE.Vector3(-0.065, -0.108, 0.004),
    new THREE.Vector3(-0.135, -0.112, 0.004),
    new THREE.Vector3(-0.195, -0.075, 0.004),
    new THREE.Vector3(-0.110, -0.073, 0.004),
    new THREE.Vector3(-0.045, -0.055, 0.004),
  ];
  const lotus_lower_leftCurve = new THREE.CatmullRomCurve3(
    lotus_lower_leftPoints,
    true,
    "centripetal"
  );
  const lotus_lower_leftGeom = new THREE.TubeGeometry(
    lotus_lower_leftCurve,
    28,
    0.004,
    6,
    true
  );
  const lotus_lower_left = new THREE.Mesh(
    lotus_lower_leftGeom,
    engravingMat
  );
  lotus_lower_left.name = "lotus_lower_left";
  engraving_group.add(lotus_lower_left);

  const lotus_lower_rightPoints = [
    new THREE.Vector3(0.005, -0.080, 0.004),
    new THREE.Vector3(0.065, -0.108, 0.004),
    new THREE.Vector3(0.135, -0.112, 0.004),
    new THREE.Vector3(0.195, -0.075, 0.004),
    new THREE.Vector3(0.110, -0.073, 0.004),
    new THREE.Vector3(0.045, -0.055, 0.004),
  ];
  const lotus_lower_rightCurve = new THREE.CatmullRomCurve3(
    lotus_lower_rightPoints,
    true,
    "centripetal"
  );
  const lotus_lower_rightGeom = new THREE.TubeGeometry(
    lotus_lower_rightCurve,
    28,
    0.004,
    6,
    true
  );
  const lotus_lower_right = new THREE.Mesh(
    lotus_lower_rightGeom,
    engravingMat
  );
  lotus_lower_right.name = "lotus_lower_right";
  engraving_group.add(lotus_lower_right);

  const lotus_basePoints = [
    new THREE.Vector3(-0.155, -0.130, 0.004),
    new THREE.Vector3(-0.080, -0.148, 0.004),
    new THREE.Vector3(0.000, -0.154, 0.004),
    new THREE.Vector3(0.080, -0.148, 0.004),
    new THREE.Vector3(0.155, -0.130, 0.004),
  ];
  const lotus_baseCurve = new THREE.CatmullRomCurve3(
    lotus_basePoints,
    false,
    "centripetal"
  );
  const lotus_baseGeom = new THREE.TubeGeometry(
    lotus_baseCurve,
    24,
    0.0045,
    6,
    false
  );
  const lotus_base = new THREE.Mesh(lotus_baseGeom, engravingMat);
  lotus_base.name = "lotus_base";
  engraving_group.add(lotus_base);

  const lotus_base_wavePoints = [
    new THREE.Vector3(-0.135, -0.160, 0.004),
    new THREE.Vector3(-0.070, -0.174, 0.004),
    new THREE.Vector3(0.000, -0.178, 0.004),
    new THREE.Vector3(0.070, -0.174, 0.004),
    new THREE.Vector3(0.135, -0.160, 0.004),
  ];
  const lotus_base_waveCurve = new THREE.CatmullRomCurve3(
    lotus_base_wavePoints,
    false,
    "centripetal"
  );
  const lotus_base_waveGeom = new THREE.TubeGeometry(
    lotus_base_waveCurve,
    24,
    0.0035,
    6,
    false
  );
  const lotus_base_wave = new THREE.Mesh(
    lotus_base_waveGeom,
    engravingMat
  );
  lotus_base_wave.name = "lotus_base_wave";
  engraving_group.add(lotus_base_wave);

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