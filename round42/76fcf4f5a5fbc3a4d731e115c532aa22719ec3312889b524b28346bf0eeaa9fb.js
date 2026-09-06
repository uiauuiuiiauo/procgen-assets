export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.4,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x010101,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.450, 0.000),
    new THREE.Vector2(0.500, 0.010),
    new THREE.Vector2(0.535, 0.035),
    new THREE.Vector2(0.557, 0.080),
    new THREE.Vector2(0.568, 0.150),
    new THREE.Vector2(0.573, 0.280),
    new THREE.Vector2(0.575, 1.480),
    new THREE.Vector2(0.572, 1.570),
    new THREE.Vector2(0.565, 1.620),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.515,
    0.500,
    1.400,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, interiorMat);
  inner_wall.position.y = 0.920;
  root.add(inner_wall);

  const inner_floorGeom = new THREE.CircleGeometry(0.500, 64);
  const inner_floor = new THREE.Mesh(inner_floorGeom, interiorMat);
  inner_floor.rotation.x = -Math.PI / 2;
  inner_floor.position.y = 0.220;
  root.add(inner_floor);

  const rimGeom = new THREE.TorusGeometry(0.565, 0.055, 18, 72);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.655;
  root.add(rim);

  const rim_bandGeom = new THREE.TorusGeometry(0.565, 0.018, 12, 64);
  const rim_band = new THREE.Mesh(rim_bandGeom, bodyMat);
  rim_band.rotation.x = Math.PI / 2;
  rim_band.position.y = 1.585;
  root.add(rim_band);

  const handlePath = [
    new THREE.Vector3(0.550, 1.555, 0.000),
    new THREE.Vector3(0.640, 1.580, 0.000),
    new THREE.Vector3(0.760, 1.580, 0.000),
    new THREE.Vector3(0.860, 1.530, 0.000),
    new THREE.Vector3(0.930, 1.430, 0.000),
    new THREE.Vector3(0.980, 1.310, 0.000),
    new THREE.Vector3(0.990, 1.240, 0.000),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePath,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    40,
    0.052,
    14,
    false
  );
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  handle.scale.z = 0.82;
  root.add(handle);

  const handle_tipGeom = new THREE.SphereGeometry(0.052, 20, 12);
  const handle_tip = new THREE.Mesh(handle_tipGeom, bodyMat);
  handle_tip.position.copy(handlePath[handlePath.length - 1]);
  handle_tip.scale.set(1.0, 1.08, 0.82);
  root.add(handle_tip);

  const handle_mountGeom = new THREE.SphereGeometry(0.072, 20, 12);
  const handle_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  handle_mount.position.set(0.565, 1.545, 0);
  handle_mount.scale.set(0.90, 1.10, 0.82);
  root.add(handle_mount);

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

  fitToUnitCube(root);
  return root;
}