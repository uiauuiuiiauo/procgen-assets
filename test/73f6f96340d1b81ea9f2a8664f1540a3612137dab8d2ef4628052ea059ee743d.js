export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });

  const pedestal_baseProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.380, 0.000),
    new THREE.Vector2(0.415, 0.006),
    new THREE.Vector2(0.442, 0.025),
    new THREE.Vector2(0.450, 0.050),
    new THREE.Vector2(0.447, 0.075),
    new THREE.Vector2(0.430, 0.100),
    new THREE.Vector2(0.395, 0.122),
    new THREE.Vector2(0.350, 0.145),
    new THREE.Vector2(0.300, 0.170),
    new THREE.Vector2(0.255, 0.198),
    new THREE.Vector2(0.220, 0.225),
    new THREE.Vector2(0.195, 0.250),
    new THREE.Vector2(0.181, 0.270),
    new THREE.Vector2(0.176, 0.282),
    new THREE.Vector2(0.000, 0.282),
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, silverMat);
  root.add(pedestal_base);

  const cup_bodyProfile = [
    new THREE.Vector2(0.000, 0.255),
    new THREE.Vector2(0.135, 0.255),
    new THREE.Vector2(0.160, 0.260),
    new THREE.Vector2(0.180, 0.275),
    new THREE.Vector2(0.202, 0.310),
    new THREE.Vector2(0.230, 0.365),
    new THREE.Vector2(0.262, 0.435),
    new THREE.Vector2(0.292, 0.520),
    new THREE.Vector2(0.318, 0.620),
    new THREE.Vector2(0.340, 0.735),
    new THREE.Vector2(0.357, 0.860),
    new THREE.Vector2(0.370, 0.990),
    new THREE.Vector2(0.379, 1.120),
    new THREE.Vector2(0.384, 1.230),
    new THREE.Vector2(0.385, 1.295),
    new THREE.Vector2(0.381, 1.318),
    new THREE.Vector2(0.369, 1.333),
    new THREE.Vector2(0.350, 1.337),
    new THREE.Vector2(0.337, 1.328),
    new THREE.Vector2(0.330, 1.310),
    new THREE.Vector2(0.330, 1.240),
    new THREE.Vector2(0.326, 1.130),
    new THREE.Vector2(0.319, 1.010),
    new THREE.Vector2(0.308, 0.890),
    new THREE.Vector2(0.293, 0.770),
    new THREE.Vector2(0.274, 0.660),
    new THREE.Vector2(0.251, 0.555),
    new THREE.Vector2(0.226, 0.465),
    new THREE.Vector2(0.200, 0.395),
    new THREE.Vector2(0.176, 0.340),
    new THREE.Vector2(0.153, 0.305),
    new THREE.Vector2(0.132, 0.291),
    new THREE.Vector2(0.000, 0.291),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, silverMat);
  root.add(cup_body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.326,
    0.246,
    0.440,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, innerMat);
  inner_wall.position.y = 1.075;
  root.add(inner_wall);

  const inner_floorGeom = new THREE.CircleGeometry(0.130, 48);
  const inner_floor = new THREE.Mesh(inner_floorGeom, innerMat);
  inner_floor.rotation.x = -Math.PI / 2;
  inner_floor.position.y = 0.294;
  root.add(inner_floor);

  const top_rimGeom = new THREE.TorusGeometry(0.357, 0.024, 16, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, silverMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 1.314;
  root.add(top_rim);

  const junction_ringGeom = new THREE.TorusGeometry(0.174, 0.006, 10, 48);
  const junction_ring = new THREE.Mesh(junction_ringGeom, innerMat);
  junction_ring.rotation.x = Math.PI / 2;
  junction_ring.position.y = 0.274;
  root.add(junction_ring);

  const bottom_edgeGeom = new THREE.TorusGeometry(0.438, 0.006, 10, 64);
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, innerMat);
  bottom_edge.rotation.x = Math.PI / 2;
  bottom_edge.position.y = 0.012;
  root.add(bottom_edge);

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