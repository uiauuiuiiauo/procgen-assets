export default function generate(THREE) {
  const root = new THREE.Group();
  const glass_container = new THREE.Group();
  root.add(glass_container);

  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe4eef0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const frosted_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde7e9,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const seam_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8d9dc,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const lower_bowlProfile = [
    new THREE.Vector2(0.000, -0.455),
    new THREE.Vector2(0.120, -0.455),
    new THREE.Vector2(0.175, -0.447),
    new THREE.Vector2(0.235, -0.425),
    new THREE.Vector2(0.300, -0.385),
    new THREE.Vector2(0.365, -0.330),
    new THREE.Vector2(0.425, -0.260),
    new THREE.Vector2(0.475, -0.180),
    new THREE.Vector2(0.515, -0.090),
    new THREE.Vector2(0.542,  0.010),
    new THREE.Vector2(0.556,  0.105),
    new THREE.Vector2(0.558,  0.160),
    new THREE.Vector2(0.548,  0.160),
    new THREE.Vector2(0.546,  0.105),
    new THREE.Vector2(0.532,  0.015),
    new THREE.Vector2(0.505, -0.080),
    new THREE.Vector2(0.466, -0.165),
    new THREE.Vector2(0.416, -0.245),
    new THREE.Vector2(0.356, -0.315),
    new THREE.Vector2(0.292, -0.370),
    new THREE.Vector2(0.228, -0.408),
    new THREE.Vector2(0.170, -0.428),
    new THREE.Vector2(0.115, -0.435),
    new THREE.Vector2(0.000, -0.435)
  ];
  const lower_bowlGeom = new THREE.LatheGeometry(lower_bowlProfile, 64);
  const lower_bowl = new THREE.Mesh(lower_bowlGeom, clear_glassMat);
  lower_bowl.renderOrder = 1;
  glass_container.add(lower_bowl);

  const upper_domeProfile = [
    new THREE.Vector2(0.558, 0.160),
    new THREE.Vector2(0.555, 0.205),
    new THREE.Vector2(0.542, 0.260),
    new THREE.Vector2(0.520, 0.315),
    new THREE.Vector2(0.490, 0.370),
    new THREE.Vector2(0.452, 0.425),
    new THREE.Vector2(0.405, 0.475),
    new THREE.Vector2(0.350, 0.520),
    new THREE.Vector2(0.288, 0.558),
    new THREE.Vector2(0.220, 0.587),
    new THREE.Vector2(0.145, 0.607),
    new THREE.Vector2(0.070, 0.618),
    new THREE.Vector2(0.000, 0.622),
    new THREE.Vector2(0.000, 0.604),
    new THREE.Vector2(0.070, 0.599),
    new THREE.Vector2(0.140, 0.588),
    new THREE.Vector2(0.212, 0.568),
    new THREE.Vector2(0.278, 0.540),
    new THREE.Vector2(0.338, 0.504),
    new THREE.Vector2(0.392, 0.462),
    new THREE.Vector2(0.438, 0.414),
    new THREE.Vector2(0.475, 0.362),
    new THREE.Vector2(0.503, 0.310),
    new THREE.Vector2(0.523, 0.257),
    new THREE.Vector2(0.536, 0.204),
    new THREE.Vector2(0.540, 0.160)
  ];
  const upper_domeGeom = new THREE.LatheGeometry(upper_domeProfile, 64);
  const upper_dome = new THREE.Mesh(upper_domeGeom, frosted_glassMat);
  upper_dome.renderOrder = 2;
  glass_container.add(upper_dome);

  const equatorial_bandGeom = new THREE.CylinderGeometry(
    0.559,
    0.559,
    0.018,
    64,
    1,
    true
  );
  const equatorial_band = new THREE.Mesh(equatorial_bandGeom, seam_glassMat);
  equatorial_band.position.y = 0.160;
  equatorial_band.renderOrder = 3;
  glass_container.add(equatorial_band);

  const upper_seamGeom = new THREE.TorusGeometry(0.551, 0.006, 10, 64);
  const upper_seam = new THREE.Mesh(upper_seamGeom, seam_glassMat);
  upper_seam.rotation.x = Math.PI / 2;
  upper_seam.position.y = 0.169;
  upper_seam.renderOrder = 4;
  glass_container.add(upper_seam);

  const lower_seamGeom = new THREE.TorusGeometry(0.552, 0.004, 8, 64);
  const lower_seam = new THREE.Mesh(lower_seamGeom, seam_glassMat);
  lower_seam.rotation.x = Math.PI / 2;
  lower_seam.position.y = 0.151;
  lower_seam.renderOrder = 4;
  glass_container.add(lower_seam);

  const base_footProfile = [
    new THREE.Vector2(0.000, -0.505),
    new THREE.Vector2(0.195, -0.505),
    new THREE.Vector2(0.225, -0.500),
    new THREE.Vector2(0.246, -0.486),
    new THREE.Vector2(0.252, -0.470),
    new THREE.Vector2(0.242, -0.452),
    new THREE.Vector2(0.205, -0.440),
    new THREE.Vector2(0.000, -0.438),
    new THREE.Vector2(0.000, -0.505)
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 64);
  const base_foot = new THREE.Mesh(base_footGeom, clear_glassMat);
  base_foot.renderOrder = 1;
  glass_container.add(base_foot);

  const base_ringGeom = new THREE.TorusGeometry(0.225, 0.008, 10, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, seam_glassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -0.493;
  base_ring.renderOrder = 4;
  glass_container.add(base_ring);

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