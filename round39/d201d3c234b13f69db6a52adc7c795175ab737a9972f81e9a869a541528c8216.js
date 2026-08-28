export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, -0.550),
    new THREE.Vector2(0.270, -0.550),
    new THREE.Vector2(0.335, -0.535),
    new THREE.Vector2(0.385, -0.500),
    new THREE.Vector2(0.415, -0.440),
    new THREE.Vector2(0.430, -0.340),
    new THREE.Vector2(0.432,  0.320),
    new THREE.Vector2(0.430,  0.430),
    new THREE.Vector2(0.418,  0.505),
    new THREE.Vector2(0.402,  0.545),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const base_footGeom = new THREE.CylinderGeometry(0.315, 0.300, 0.035, 48);
  const base_foot = new THREE.Mesh(base_footGeom, bodyMat);
  base_foot.position.y = -0.562;
  root.add(base_foot);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.355,
    0.330,
    0.875,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, interiorMat);
  inner_wall.position.y = 0.102;
  root.add(inner_wall);

  const inner_floorGeom = new THREE.CircleGeometry(0.330, 64);
  const inner_floor = new THREE.Mesh(inner_floorGeom, interiorMat);
  inner_floor.rotation.x = -Math.PI / 2;
  inner_floor.position.y = -0.336;
  root.add(inner_floor);

  const rimGeom = new THREE.TorusGeometry(0.378, 0.027, 16, 64);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.545;
  root.add(rim);

  const handlePoints = [
    new THREE.Vector3(0.395,  0.335, 0),
    new THREE.Vector3(0.485,  0.345, 0),
    new THREE.Vector3(0.590,  0.330, 0),
    new THREE.Vector3(0.680,  0.270, 0),
    new THREE.Vector3(0.730,  0.150, 0),
    new THREE.Vector3(0.750, -0.050, 0),
    new THREE.Vector3(0.730, -0.240, 0),
    new THREE.Vector3(0.670, -0.350, 0),
    new THREE.Vector3(0.570, -0.410, 0),
    new THREE.Vector3(0.460, -0.405, 0),
    new THREE.Vector3(0.395, -0.340, 0),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal",
    0.5
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    72,
    0.057,
    16,
    false
  );

  const right_handle = new THREE.Mesh(handleGeom, bodyMat);
  root.add(right_handle);

  const left_handle = new THREE.Mesh(handleGeom, bodyMat);
  left_handle.rotation.y = Math.PI;
  root.add(left_handle);

  const handle_mountsGeom = new THREE.SphereGeometry(1, 24, 16);
  const handle_mounts = new THREE.InstancedMesh(
    handle_mountsGeom,
    bodyMat,
    4
  );
  const mountTransform = new THREE.Object3D();
  const mountPositions = [
    [ 0.405,  0.330, 0],
    [ 0.405, -0.335, 0],
    [-0.405,  0.330, 0],
    [-0.405, -0.335, 0],
  ];
  for (let i = 0; i < mountPositions.length; i++) {
    const position = mountPositions[i];
    mountTransform.position.set(position[0], position[1], position[2]);
    mountTransform.scale.set(0.078, 0.095, 0.085);
    mountTransform.updateMatrix();
    handle_mounts.setMatrixAt(i, mountTransform.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(handle_mounts);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}