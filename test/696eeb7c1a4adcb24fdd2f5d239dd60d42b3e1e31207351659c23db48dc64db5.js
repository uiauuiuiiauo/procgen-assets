export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_led_flashlight";

  const housing_group = new THREE.Group();
  housing_group.name = "housing_group";
  root.add(housing_group);

  const optics_group = new THREE.Group();
  optics_group.name = "optics_group";
  root.add(optics_group);

  const main_housingMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const reflectorMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubber_gasketMat = new THREE.MeshStandardMaterial({
    color: 0x161616,
    metalness: 0.0,
    roughness: 0.8
  });
  const front_lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });
  const led_emitterMat = new THREE.MeshStandardMaterial({
    color: 0xffd86b,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffd86b,
    emissiveIntensity: 1.0
  });

  const housing_profile_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, -0.62, 0),
    new THREE.Vector3(0.25, -0.60, 0),
    new THREE.Vector3(0.43, -0.52, 0),
    new THREE.Vector3(0.53, -0.35, 0),
    new THREE.Vector3(0.56, -0.08, 0),
    new THREE.Vector3(0.55, 0.18, 0),
    new THREE.Vector3(0.50, 0.38, 0),
    new THREE.Vector3(0.40, 0.52, 0),
    new THREE.Vector3(0.32, 0.58, 0)
  ], false, "centripetal");

  const main_housingProfile = housing_profile_curve
    .getSpacedPoints(48)
    .map((point) => new THREE.Vector2(Math.max(0, point.x), point.y));

  const main_housingGeom = new THREE.LatheGeometry(main_housingProfile, 64);
  const main_housing = new THREE.Mesh(main_housingGeom, main_housingMat);
  main_housing.name = "main_housing";
  main_housing.rotation.x = Math.PI / 2;
  housing_group.add(main_housing);

  const rear_cap_seamGeom = new THREE.TorusGeometry(0.455, 0.007, 8, 64);
  const rear_cap_seam = new THREE.Mesh(rear_cap_seamGeom, seamMat);
  rear_cap_seam.name = "rear_cap_seam";
  rear_cap_seam.position.z = -0.46;
  housing_group.add(rear_cap_seam);

  const front_shell_seamGeom = new THREE.TorusGeometry(0.515, 0.006, 8, 64);
  const front_shell_seam = new THREE.Mesh(front_shell_seamGeom, seamMat);
  front_shell_seam.name = "front_shell_seam";
  front_shell_seam.position.z = 0.34;
  housing_group.add(front_shell_seam);

  const front_bezelGeom = new THREE.TorusGeometry(0.365, 0.06, 18, 64);
  const front_bezel = new THREE.Mesh(front_bezelGeom, main_housingMat);
  front_bezel.name = "front_bezel";
  front_bezel.position.z = 0.58;
  housing_group.add(front_bezel);

  const reflectorProfile = [
    new THREE.Vector2(0.045, -0.085),
    new THREE.Vector2(0.075, -0.071),
    new THREE.Vector2(0.135, -0.043),
    new THREE.Vector2(0.205, -0.006),
    new THREE.Vector2(0.275, 0.031),
    new THREE.Vector2(0.318, 0.050)
  ];
  const reflectorGeom = new THREE.LatheGeometry(reflectorProfile, 64);
  const reflector = new THREE.Mesh(reflectorGeom, reflectorMat);
  reflector.name = "reflector";
  reflector.rotation.x = Math.PI / 2;
  reflector.position.z = 0.57;
  optics_group.add(reflector);

  const reflector_ribsGeom = new THREE.BoxGeometry(0.011, 0.19, 0.006);
  const reflector_ribs = new THREE.InstancedMesh(
    reflector_ribsGeom,
    reflectorMat,
    12
  );
  reflector_ribs.name = "reflector_ribs";
  const reflector_rib_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    reflector_rib_transform.position.set(
      Math.cos(angle) * 0.195,
      Math.sin(angle) * 0.195,
      0.603
    );
    reflector_rib_transform.rotation.set(0, 0, angle - Math.PI / 2);
    reflector_rib_transform.updateMatrix();
    reflector_ribs.setMatrixAt(i, reflector_rib_transform.matrix);
  }
  reflector_ribs.instanceMatrix.needsUpdate = true;
  optics_group.add(reflector_ribs);

  const led_mountGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.018, 32);
  const led_mount = new THREE.Mesh(led_mountGeom, reflectorMat);
  led_mount.name = "led_mount";
  led_mount.rotation.x = Math.PI / 2;
  led_mount.position.z = 0.594;
  optics_group.add(led_mount);

  const led_opticGeom = new THREE.CylinderGeometry(0.041, 0.041, 0.012, 32);
  const led_optic = new THREE.Mesh(led_opticGeom, front_lensMat);
  led_optic.name = "led_optic";
  led_optic.rotation.x = Math.PI / 2;
  led_optic.position.z = 0.615;
  optics_group.add(led_optic);

  const led_emitterGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.014, 24);
  const led_emitter = new THREE.Mesh(led_emitterGeom, led_emitterMat);
  led_emitter.name = "led_emitter";
  led_emitter.rotation.x = Math.PI / 2;
  led_emitter.position.z = 0.628;
  optics_group.add(led_emitter);

  const rubber_gasketGeom = new THREE.TorusGeometry(0.315, 0.017, 12, 64);
  const rubber_gasket = new THREE.Mesh(rubber_gasketGeom, rubber_gasketMat);
  rubber_gasket.name = "rubber_gasket";
  rubber_gasket.position.z = 0.612;
  optics_group.add(rubber_gasket);

  const front_lensGeom = new THREE.CylinderGeometry(0.296, 0.296, 0.018, 64);
  const front_lens = new THREE.Mesh(front_lensGeom, front_lensMat);
  front_lens.name = "front_lens";
  front_lens.rotation.x = Math.PI / 2;
  front_lens.position.z = 0.627;
  optics_group.add(front_lens);

  const lens_retaining_ringGeom = new THREE.TorusGeometry(0.298, 0.008, 10, 64);
  const lens_retaining_ring = new THREE.Mesh(
    lens_retaining_ringGeom,
    reflectorMat
  );
  lens_retaining_ring.name = "lens_retaining_ring";
  lens_retaining_ring.position.z = 0.638;
  optics_group.add(lens_retaining_ring);

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