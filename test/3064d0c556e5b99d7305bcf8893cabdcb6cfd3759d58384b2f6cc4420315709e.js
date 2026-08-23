export default function generate(THREE) {
  const root = new THREE.Group();

  const metal_baseMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const polished_rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const inner_candle_cupMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const wax_candleMat = new THREE.MeshStandardMaterial({
    color: 0xf5f3e8,
    metalness: 0.0,
    roughness: 0.8,
  });

  const wickMat = new THREE.MeshStandardMaterial({
    color: 0xb9a982,
    metalness: 0.0,
    roughness: 0.9,
  });

  const glass_domeMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f7f5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const metal_baseOuterCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.490, 0.018),
    new THREE.Vector2(0.505, 0.050),
    new THREE.Vector2(0.485, 0.125),
    new THREE.Vector2(0.445, 0.225),
    new THREE.Vector2(0.395, 0.335),
    new THREE.Vector2(0.355, 0.445),
    new THREE.Vector2(0.333, 0.545),
    new THREE.Vector2(0.338, 0.620),
    new THREE.Vector2(0.365, 0.690),
    new THREE.Vector2(0.405, 0.738),
  ]);
  const metal_baseProfile = [
    new THREE.Vector2(0.000, 0.018),
    new THREE.Vector2(0.465, 0.018),
    ...metal_baseOuterCurve.getSpacedPoints(40),
  ];
  const metal_baseGeom = new THREE.LatheGeometry(metal_baseProfile, 64);
  const metal_base = new THREE.Mesh(metal_baseGeom, metal_baseMat);
  root.add(metal_base);

  const bottom_rolled_rimGeom = new THREE.TorusGeometry(0.487, 0.014, 10, 64);
  const bottom_rolled_rim = new THREE.Mesh(bottom_rolled_rimGeom, polished_rimMat);
  bottom_rolled_rim.rotation.x = Math.PI / 2;
  bottom_rolled_rim.position.y = 0.027;
  root.add(bottom_rolled_rim);

  const inner_candle_cupGeom = new THREE.CylinderGeometry(
    0.354,
    0.342,
    0.060,
    64
  );
  const inner_candle_cup = new THREE.Mesh(
    inner_candle_cupGeom,
    inner_candle_cupMat
  );
  inner_candle_cup.position.y = 0.724;
  root.add(inner_candle_cup);

  const wax_candleGeom = new THREE.CylinderGeometry(
    0.329,
    0.326,
    0.030,
    64
  );
  const wax_candle = new THREE.Mesh(wax_candleGeom, wax_candleMat);
  wax_candle.position.y = 0.747;
  root.add(wax_candle);

  const top_rolled_rimGeom = new THREE.TorusGeometry(0.405, 0.027, 14, 72);
  const top_rolled_rim = new THREE.Mesh(top_rolled_rimGeom, polished_rimMat);
  top_rolled_rim.rotation.x = Math.PI / 2;
  top_rolled_rim.position.y = 0.742;
  root.add(top_rolled_rim);

  const wickPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.000, 0.760, 0.000),
    new THREE.Vector3(0.002, 0.800, 0.000),
    new THREE.Vector3(-0.002, 0.842, 0.001),
    new THREE.Vector3(0.001, 0.878, 0.002),
  ]);
  const wickGeom = new THREE.TubeGeometry(wickPath, 12, 0.007, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const wick_tipGeom = new THREE.SphereGeometry(0.008, 12, 8);
  const wick_tip = new THREE.Mesh(wick_tipGeom, wickMat);
  wick_tip.position.set(0.001, 0.879, 0.002);
  wick_tip.scale.set(0.8, 1.25, 0.8);
  root.add(wick_tip);

  const glass_domeFlatGeom = new THREE.CylinderGeometry(
    0.372,
    0.372,
    0.014,
    64
  );
  const glass_dome_flat = new THREE.Mesh(glass_domeFlatGeom, glass_domeMat);
  glass_dome_flat.position.y = 0.772;
  glass_dome_flat.renderOrder = 2;
  root.add(glass_dome_flat);

  const glass_domeCurve = new THREE.CubicBezierCurve(
    new THREE.Vector2(0.372, 0.774),
    new THREE.Vector2(0.382, 1.020),
    new THREE.Vector2(0.205, 1.290),
    new THREE.Vector2(0.000, 1.300)
  );
  const glass_domeProfile = glass_domeCurve.getSpacedPoints(48);
  const glass_domeGeom = new THREE.LatheGeometry(glass_domeProfile, 72);
  const glass_dome = new THREE.Mesh(glass_domeGeom, glass_domeMat);
  glass_dome.renderOrder = 2;
  root.add(glass_dome);

  const glass_dome_lower_edgeGeom = new THREE.TorusGeometry(
    0.369,
    0.008,
    10,
    64
  );
  const glass_dome_lower_edge = new THREE.Mesh(
    glass_dome_lower_edgeGeom,
    glass_domeMat
  );
  glass_dome_lower_edge.rotation.x = Math.PI / 2;
  glass_dome_lower_edge.position.y = 0.778;
  glass_dome_lower_edge.renderOrder = 2;
  root.add(glass_dome_lower_edge);

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