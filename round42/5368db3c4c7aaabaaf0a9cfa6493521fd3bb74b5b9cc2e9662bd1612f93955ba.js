export default function generate(THREE) {
  const root = new THREE.Group();
  const glass_group = new THREE.Group();
  const liquid_group = new THREE.Group();
  root.add(glass_group, liquid_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.99,
    ior: 1.5,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const wineMat = new THREE.MeshPhysicalMaterial({
    color: 0xd5aa32,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.65,
    ior: 1.33,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const wine_surfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xe2b83f,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.45,
    ior: 1.33,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const wine_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x8f620c,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });

  const bowl_shellProfile = [
    new THREE.Vector2(0.075, 0.94),
    new THREE.Vector2(0.120, 1.00),
    new THREE.Vector2(0.260, 1.10),
    new THREE.Vector2(0.450, 1.28),
    new THREE.Vector2(0.620, 1.55),
    new THREE.Vector2(0.730, 1.85),
    new THREE.Vector2(0.720, 2.15),
    new THREE.Vector2(0.670, 2.50),
    new THREE.Vector2(0.600, 2.85),
    new THREE.Vector2(0.550, 3.18),
    new THREE.Vector2(0.510, 3.42),
    new THREE.Vector2(0.500, 3.47),
    new THREE.Vector2(0.475, 3.47),
    new THREE.Vector2(0.485, 3.40),
    new THREE.Vector2(0.525, 3.17),
    new THREE.Vector2(0.575, 2.84),
    new THREE.Vector2(0.645, 2.49),
    new THREE.Vector2(0.695, 2.14),
    new THREE.Vector2(0.705, 1.86),
    new THREE.Vector2(0.595, 1.57),
    new THREE.Vector2(0.425, 1.31),
    new THREE.Vector2(0.235, 1.13),
    new THREE.Vector2(0.095, 1.03),
    new THREE.Vector2(0.055, 0.97),
  ];
  const bowl_shellGeom = new THREE.LatheGeometry(bowl_shellProfile, 64);
  const bowl_shell = new THREE.Mesh(bowl_shellGeom, glassMat);
  bowl_shell.renderOrder = 3;
  glass_group.add(bowl_shell);

  const stemProfile = [
    new THREE.Vector2(0.000, 0.14),
    new THREE.Vector2(0.105, 0.14),
    new THREE.Vector2(0.105, 0.19),
    new THREE.Vector2(0.078, 0.28),
    new THREE.Vector2(0.055, 0.40),
    new THREE.Vector2(0.047, 0.58),
    new THREE.Vector2(0.047, 0.72),
    new THREE.Vector2(0.052, 0.86),
    new THREE.Vector2(0.070, 0.96),
    new THREE.Vector2(0.110, 1.03),
    new THREE.Vector2(0.000, 1.03),
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 48);
  const stem = new THREE.Mesh(stemGeom, glassMat);
  stem.renderOrder = 3;
  glass_group.add(stem);

  const footProfile = [
    new THREE.Vector2(0.000, 0.025),
    new THREE.Vector2(0.300, 0.025),
    new THREE.Vector2(0.520, 0.035),
    new THREE.Vector2(0.620, 0.065),
    new THREE.Vector2(0.650, 0.095),
    new THREE.Vector2(0.640, 0.120),
    new THREE.Vector2(0.580, 0.140),
    new THREE.Vector2(0.380, 0.155),
    new THREE.Vector2(0.240, 0.175),
    new THREE.Vector2(0.160, 0.215),
    new THREE.Vector2(0.105, 0.245),
    new THREE.Vector2(0.000, 0.245),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, glassMat);
  foot.renderOrder = 3;
  glass_group.add(foot);

  const rimGeom = new THREE.TorusGeometry(0.487, 0.014, 10, 64);
  const rim = new THREE.Mesh(rimGeom, glassMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 3.47;
  rim.renderOrder = 4;
  glass_group.add(rim);

  const foot_rimGeom = new THREE.TorusGeometry(0.620, 0.018, 10, 64);
  const foot_rim = new THREE.Mesh(foot_rimGeom, glassMat);
  foot_rim.rotation.x = Math.PI / 2;
  foot_rim.position.y = 0.087;
  foot_rim.renderOrder = 4;
  glass_group.add(foot_rim);

  const foot_center_ringGeom = new THREE.TorusGeometry(0.145, 0.012, 8, 40);
  const foot_center_ring = new THREE.Mesh(foot_center_ringGeom, glassMat);
  foot_center_ring.rotation.x = Math.PI / 2;
  foot_center_ring.position.y = 0.205;
  foot_center_ring.renderOrder = 4;
  glass_group.add(foot_center_ring);

  const stem_base_ringGeom = new THREE.TorusGeometry(0.092, 0.010, 8, 36);
  const stem_base_ring = new THREE.Mesh(stem_base_ringGeom, glassMat);
  stem_base_ring.rotation.x = Math.PI / 2;
  stem_base_ring.position.y = 0.205;
  stem_base_ring.renderOrder = 4;
  glass_group.add(stem_base_ring);

  const bowl_bottom_ringGeom = new THREE.TorusGeometry(0.078, 0.009, 8, 36);
  const bowl_bottom_ring = new THREE.Mesh(bowl_bottom_ringGeom, glassMat);
  bowl_bottom_ring.rotation.x = Math.PI / 2;
  bowl_bottom_ring.position.y = 0.975;
  bowl_bottom_ring.renderOrder = 4;
  glass_group.add(bowl_bottom_ring);

  const wine_volumeProfile = [
    new THREE.Vector2(0.000, 0.985),
    new THREE.Vector2(0.050, 0.990),
    new THREE.Vector2(0.120, 1.030),
    new THREE.Vector2(0.230, 1.120),
    new THREE.Vector2(0.400, 1.290),
    new THREE.Vector2(0.560, 1.520),
    new THREE.Vector2(0.660, 1.750),
    new THREE.Vector2(0.690, 1.950),
    new THREE.Vector2(0.000, 1.950),
  ];
  const wine_volumeGeom = new THREE.LatheGeometry(wine_volumeProfile, 64);
  const wine_volume = new THREE.Mesh(wine_volumeGeom, wineMat);
  wine_volume.renderOrder = 1;
  liquid_group.add(wine_volume);

  const wine_surfaceGeom = new THREE.CircleGeometry(0.687, 64);
  const wine_surface = new THREE.Mesh(wine_surfaceGeom, wine_surfaceMat);
  wine_surface.rotation.x = -Math.PI / 2;
  wine_surface.position.y = 1.956;
  wine_surface.renderOrder = 2;
  liquid_group.add(wine_surface);

  const meniscusGeom = new THREE.TorusGeometry(0.681, 0.012, 8, 64);
  const meniscus = new THREE.Mesh(meniscusGeom, wine_edgeMat);
  meniscus.rotation.x = Math.PI / 2;
  meniscus.position.y = 1.962;
  meniscus.renderOrder = 2;
  liquid_group.add(meniscus);

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