export default function generate(THREE) {
  const root = new THREE.Group();
  const glass_container = new THREE.Group();
  root.add(glass_container);

  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddebed,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const frosted_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe4eaec,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xc8d8dc,
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
    new THREE.Vector2(0.130, -0.455),
    new THREE.Vector2(0.190, -0.438),
    new THREE.Vector2(0.255, -0.405),
    new THREE.Vector2(0.325, -0.355),
    new THREE.Vector2(0.390, -0.290),
    new THREE.Vector2(0.445, -0.210),
    new THREE.Vector2(0.485, -0.115),
    new THREE.Vector2(0.510, -0.015),
    new THREE.Vector2(0.515,  0.065),
    new THREE.Vector2(0.503,  0.065),
    new THREE.Vector2(0.498,  0.015),
    new THREE.Vector2(0.476, -0.090),
    new THREE.Vector2(0.438, -0.185),
    new THREE.Vector2(0.386, -0.270),
    new THREE.Vector2(0.322, -0.338),
    new THREE.Vector2(0.252, -0.392),
    new THREE.Vector2(0.185, -0.420),
    new THREE.Vector2(0.125, -0.435),
    new THREE.Vector2(0.000, -0.435)
  ];
  const lower_bowlGeom = new THREE.LatheGeometry(lower_bowlProfile, 64);
  const lower_bowl = new THREE.Mesh(lower_bowlGeom, frosted_glassMat);
  glass_container.add(lower_bowl);

  const upper_domeProfile = [
    new THREE.Vector2(0.515, 0.070),
    new THREE.Vector2(0.508, 0.120),
    new THREE.Vector2(0.490, 0.180),
    new THREE.Vector2(0.462, 0.245),
    new THREE.Vector2(0.425, 0.310),
    new THREE.Vector2(0.380, 0.370),
    new THREE.Vector2(0.328, 0.425),
    new THREE.Vector2(0.270, 0.470),
    new THREE.Vector2(0.208, 0.505),
    new THREE.Vector2(0.145, 0.530),
    new THREE.Vector2(0.078, 0.543),
    new THREE.Vector2(0.000, 0.548),
    new THREE.Vector2(0.000, 0.528),
    new THREE.Vector2(0.075, 0.523),
    new THREE.Vector2(0.140, 0.510),
    new THREE.Vector2(0.202, 0.486),
    new THREE.Vector2(0.263, 0.452),
    new THREE.Vector2(0.320, 0.408),
    new THREE.Vector2(0.372, 0.355),
    new THREE.Vector2(0.417, 0.297),
    new THREE.Vector2(0.454, 0.235),
    new THREE.Vector2(0.481, 0.173),
    new THREE.Vector2(0.499, 0.115),
    new THREE.Vector2(0.505, 0.070)
  ];
  const upper_domeGeom = new THREE.LatheGeometry(upper_domeProfile, 64);
  const upper_dome = new THREE.Mesh(upper_domeGeom, clear_glassMat);
  glass_container.add(upper_dome);

  const equatorial_bandGeom = new THREE.CylinderGeometry(
    0.516,
    0.507,
    0.036,
    64,
    1,
    true
  );
  const equatorial_band = new THREE.Mesh(equatorial_bandGeom, glass_edgeMat);
  equatorial_band.position.y = 0.068;
  glass_container.add(equatorial_band);

  const equatorial_rimGeom = new THREE.TorusGeometry(0.510, 0.006, 12, 64);
  const equatorial_rim = new THREE.Mesh(equatorial_rimGeom, glass_edgeMat);
  equatorial_rim.rotation.x = Math.PI / 2;
  equatorial_rim.position.y = 0.070;
  glass_container.add(equatorial_rim);

  const lower_seamGeom = new THREE.TorusGeometry(0.505, 0.0035, 10, 64);
  const lower_seam = new THREE.Mesh(lower_seamGeom, glass_edgeMat);
  lower_seam.rotation.x = Math.PI / 2;
  lower_seam.position.y = 0.047;
  glass_container.add(lower_seam);

  const base_footGeom = new THREE.CylinderGeometry(
    0.190,
    0.215,
    0.034,
    64,
    1,
    false
  );
  const base_foot = new THREE.Mesh(base_footGeom, clear_glassMat);
  base_foot.position.y = -0.458;
  glass_container.add(base_foot);

  const base_ringGeom = new THREE.TorusGeometry(0.202, 0.009, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, glass_edgeMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -0.470;
  glass_container.add(base_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.180, 0.0045, 10, 64);
  const base_upper_ring = new THREE.Mesh(base_upper_ringGeom, glass_edgeMat);
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = -0.444;
  glass_container.add(base_upper_ring);

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