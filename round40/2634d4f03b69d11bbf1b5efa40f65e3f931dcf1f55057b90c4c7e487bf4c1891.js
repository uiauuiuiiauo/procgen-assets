export default function generate(THREE) {
  const root = new THREE.Group();

  const candle_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0868e8,
    metalness: 0.0,
    roughness: 0.6
  });

  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x17191d,
    metalness: 0.0,
    roughness: 0.95
  });

  const candle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.255, 0.000),
    new THREE.Vector2(0.282, 0.010),
    new THREE.Vector2(0.296, 0.030),
    new THREE.Vector2(0.300, 0.070),
    new THREE.Vector2(0.299, 0.200),
    new THREE.Vector2(0.296, 0.500),
    new THREE.Vector2(0.291, 0.900),
    new THREE.Vector2(0.284, 1.300),
    new THREE.Vector2(0.276, 1.700),
    new THREE.Vector2(0.267, 2.100),
    new THREE.Vector2(0.258, 2.450),
    new THREE.Vector2(0.252, 2.550),
    new THREE.Vector2(0.245, 2.610),
    new THREE.Vector2(0.228, 2.660),
    new THREE.Vector2(0.205, 2.700),
    new THREE.Vector2(0.180, 2.740),
    new THREE.Vector2(0.155, 2.790),
    new THREE.Vector2(0.132, 2.840),
    new THREE.Vector2(0.108, 2.890),
    new THREE.Vector2(0.086, 2.940),
    new THREE.Vector2(0.068, 2.980),
    new THREE.Vector2(0.052, 3.010),
    new THREE.Vector2(0.035, 3.025),
    new THREE.Vector2(0.000, 3.030)
  ];

  const candle_bodyGeom = new THREE.LatheGeometry(candle_bodyProfile, 64);
  const candle_body = new THREE.Mesh(candle_bodyGeom, candle_bodyMat);
  root.add(candle_body);

  const wickPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.000, 2.995, 0.000),
    new THREE.Vector3(0.006, 3.055, 0.002),
    new THREE.Vector3(-0.004, 3.115, -0.003),
    new THREE.Vector3(0.008, 3.175, 0.003),
    new THREE.Vector3(0.003, 3.235, -0.004),
    new THREE.Vector3(0.013, 3.295, 0.002),
    new THREE.Vector3(0.008, 3.350, -0.003)
  ], false, "centripetal");

  const wickGeom = new THREE.TubeGeometry(wickPath, 32, 0.017, 7, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const wick_char_lumpsGeom = new THREE.DodecahedronGeometry(0.026, 0);
  const wick_char_lumps = new THREE.InstancedMesh(
    wick_char_lumpsGeom,
    wickMat,
    6
  );
  const wick_char_lump_data = [
    [0.004, 3.055, 0.002, 1.05, 0.75, 0.90, 0.20],
    [-0.003, 3.115, -0.002, 0.85, 1.10, 0.80, 0.70],
    [0.007, 3.175, 0.003, 1.10, 0.70, 0.85, 1.10],
    [0.003, 3.235, -0.003, 0.80, 1.15, 0.90, 0.40],
    [0.012, 3.292, 0.002, 1.05, 0.80, 0.75, 0.90],
    [0.008, 3.340, -0.002, 0.90, 1.00, 0.85, 1.40]
  ];
  const wick_char_lump_transform = new THREE.Object3D();

  for (let i = 0; i < wick_char_lump_data.length; i++) {
    const data = wick_char_lump_data[i];
    wick_char_lump_transform.position.set(data[0], data[1], data[2]);
    wick_char_lump_transform.scale.set(data[3], data[4], data[5]);
    wick_char_lump_transform.rotation.set(
      data[6] * 0.4,
      data[6],
      data[6] * 0.7
    );
    wick_char_lump_transform.updateMatrix();
    wick_char_lumps.setMatrixAt(i, wick_char_lump_transform.matrix);
  }
  wick_char_lumps.instanceMatrix.needsUpdate = true;
  root.add(wick_char_lumps);

  const wick_tipGeom = new THREE.DodecahedronGeometry(0.023, 0);
  const wick_tip = new THREE.Mesh(wick_tipGeom, wickMat);
  wick_tip.position.set(0.008, 3.354, -0.003);
  wick_tip.scale.set(0.85, 1.15, 0.8);
  wick_tip.rotation.set(0.5, 0.8, 0.3);
  root.add(wick_tip);

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