export default function generate(THREE) {
  const root = new THREE.Group();

  const vase_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x9bdced,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const edge_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x43a9c7,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const body_profile = new THREE.SplineCurve([
    new THREE.Vector2(0.220, 0.070),
    new THREE.Vector2(0.235, 0.105),
    new THREE.Vector2(0.216, 0.175),
    new THREE.Vector2(0.190, 0.330),
    new THREE.Vector2(0.163, 0.555),
    new THREE.Vector2(0.151, 0.755),
    new THREE.Vector2(0.158, 0.920),
    new THREE.Vector2(0.181, 1.080),
    new THREE.Vector2(0.214, 1.205)
  ]).getSpacedPoints(64);

  const vase_bodyGeom = new THREE.LatheGeometry(body_profile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  root.add(vase_body);

  const inner_wall_profile = new THREE.SplineCurve([
    new THREE.Vector2(0.184, 0.108),
    new THREE.Vector2(0.197, 0.145),
    new THREE.Vector2(0.181, 0.220),
    new THREE.Vector2(0.159, 0.380),
    new THREE.Vector2(0.137, 0.590),
    new THREE.Vector2(0.126, 0.755),
    new THREE.Vector2(0.135, 0.915),
    new THREE.Vector2(0.157, 1.075),
    new THREE.Vector2(0.188, 1.195)
  ]).getSpacedPoints(56);

  const inner_wallGeom = new THREE.LatheGeometry(inner_wall_profile, 64);
  const inner_wall = new THREE.Mesh(inner_wallGeom, vase_bodyMat);
  root.add(inner_wall);

  const thick_base_profile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.188, 0.000),
    new THREE.Vector2(0.224, 0.006),
    new THREE.Vector2(0.244, 0.025),
    new THREE.Vector2(0.246, 0.061),
    new THREE.Vector2(0.237, 0.088),
    new THREE.Vector2(0.220, 0.108),
    new THREE.Vector2(0.000, 0.108)
  ];
  const thick_baseGeom = new THREE.LatheGeometry(thick_base_profile, 64);
  const thick_base = new THREE.Mesh(thick_baseGeom, edge_glassMat);
  root.add(thick_base);

  const base_edge_ringGeom = new THREE.TorusGeometry(0.226, 0.012, 12, 64);
  const base_edge_ring = new THREE.Mesh(base_edge_ringGeom, edge_glassMat);
  base_edge_ring.rotation.x = Math.PI / 2;
  base_edge_ring.position.y = 0.022;
  root.add(base_edge_ring);

  const inner_floorGeom = new THREE.CylinderGeometry(0.184, 0.184, 0.016, 64);
  const inner_floor = new THREE.Mesh(inner_floorGeom, vase_bodyMat);
  inner_floor.position.y = 0.108;
  root.add(inner_floor);

  const base_inner_ringGeom = new THREE.TorusGeometry(0.150, 0.006, 10, 64);
  const base_inner_ring = new THREE.Mesh(base_inner_ringGeom, edge_glassMat);
  base_inner_ring.rotation.x = Math.PI / 2;
  base_inner_ring.position.y = 0.119;
  root.add(base_inner_ring);

  const mouth_assembly = new THREE.Group();
  mouth_assembly.position.set(0, 1.205, 0);
  mouth_assembly.rotation.z = -0.145;
  root.add(mouth_assembly);

  const mouth_lipGeom = new THREE.TorusGeometry(0.201, 0.014, 16, 72);
  const mouth_lip = new THREE.Mesh(mouth_lipGeom, edge_glassMat);
  mouth_lip.rotation.x = Math.PI / 2;
  mouth_assembly.add(mouth_lip);

  const mouth_inner_ringGeom = new THREE.TorusGeometry(0.186, 0.005, 10, 64);
  const mouth_inner_ring = new THREE.Mesh(mouth_inner_ringGeom, edge_glassMat);
  mouth_inner_ring.rotation.x = Math.PI / 2;
  mouth_inner_ring.position.y = -0.004;
  mouth_assembly.add(mouth_inner_ring);

  const mouth_annulusGeom = new THREE.RingGeometry(0.185, 0.214, 64);
  const mouth_annulus = new THREE.Mesh(mouth_annulusGeom, vase_bodyMat);
  mouth_annulus.rotation.x = -Math.PI / 2;
  mouth_annulus.position.y = 0.002;
  mouth_assembly.add(mouth_annulus);

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