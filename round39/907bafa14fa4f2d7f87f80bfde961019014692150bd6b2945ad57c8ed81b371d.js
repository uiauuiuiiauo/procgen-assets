export default function generate(THREE) {
  const root = new THREE.Group();
  const bottle_group = new THREE.Group();
  const cap_group = new THREE.Group();
  root.add(bottle_group, cap_group);

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x249fd0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.52,
    thickness: 0.035,
    attenuationColor: 0x087bb8,
    attenuationDistance: 1.2,
    specularIntensity: 1.0,
    clearcoat: 0.4,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const bottle_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x0758a8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.76,
    thickness: 0.045,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const cap_gasketMat = new THREE.MeshStandardMaterial({
    color: 0x071820,
    metalness: 0.0,
    roughness: 0.8
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.245, 0.000),
    new THREE.Vector2(0.278, 0.009),
    new THREE.Vector2(0.303, 0.028),
    new THREE.Vector2(0.320, 0.061),
    new THREE.Vector2(0.329, 0.110),
    new THREE.Vector2(0.332, 0.180),
    new THREE.Vector2(0.332, 1.170),
    new THREE.Vector2(0.329, 1.280),
    new THREE.Vector2(0.321, 1.380),
    new THREE.Vector2(0.304, 1.480),
    new THREE.Vector2(0.279, 1.580),
    new THREE.Vector2(0.248, 1.670),
    new THREE.Vector2(0.214, 1.750),
    new THREE.Vector2(0.184, 1.810),
    new THREE.Vector2(0.165, 1.850),
    new THREE.Vector2(0.164, 1.920),
    new THREE.Vector2(0.178, 1.940),
    new THREE.Vector2(0.178, 1.965),
    new THREE.Vector2(0.153, 1.975),
    new THREE.Vector2(0.141, 1.960),
    new THREE.Vector2(0.140, 1.860),
    new THREE.Vector2(0.157, 1.820),
    new THREE.Vector2(0.188, 1.760),
    new THREE.Vector2(0.220, 1.680),
    new THREE.Vector2(0.252, 1.590),
    new THREE.Vector2(0.279, 1.490),
    new THREE.Vector2(0.294, 1.390),
    new THREE.Vector2(0.302, 1.280),
    new THREE.Vector2(0.304, 1.170),
    new THREE.Vector2(0.304, 0.190),
    new THREE.Vector2(0.299, 0.130),
    new THREE.Vector2(0.285, 0.090),
    new THREE.Vector2(0.258, 0.066),
    new THREE.Vector2(0.215, 0.054),
    new THREE.Vector2(0.000, 0.054),
    new THREE.Vector2(0.000, 0.000)
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.renderOrder = 1;
  bottle_group.add(bottle_body);

  const bottle_base_ringGeom = new THREE.TorusGeometry(0.289, 0.013, 12, 64);
  const bottle_base_ring = new THREE.Mesh(bottle_base_ringGeom, bottle_edgeMat);
  bottle_base_ring.rotation.x = Math.PI / 2;
  bottle_base_ring.position.y = 0.027;
  bottle_base_ring.renderOrder = 2;
  bottle_group.add(bottle_base_ring);

  const bottle_base_pushGeom = new THREE.TorusGeometry(0.034, 0.005, 8, 32);
  const bottle_base_push = new THREE.Mesh(bottle_base_pushGeom, bottle_edgeMat);
  bottle_base_push.rotation.x = Math.PI / 2;
  bottle_base_push.position.y = 0.058;
  bottle_base_push.renderOrder = 2;
  bottle_group.add(bottle_base_push);

  const bottle_inner_bottomGeom = new THREE.CylinderGeometry(0.220, 0.242, 0.011, 48);
  const bottle_inner_bottom = new THREE.Mesh(bottle_inner_bottomGeom, bottle_edgeMat);
  bottle_inner_bottom.position.y = 0.054;
  bottle_inner_bottom.renderOrder = 2;
  bottle_group.add(bottle_inner_bottom);

  const bottle_neck_lower_ringGeom = new THREE.TorusGeometry(0.165, 0.010, 10, 48);
  const bottle_neck_lower_ring = new THREE.Mesh(
    bottle_neck_lower_ringGeom,
    bottle_edgeMat
  );
  bottle_neck_lower_ring.rotation.x = Math.PI / 2;
  bottle_neck_lower_ring.position.y = 1.852;
  bottle_neck_lower_ring.renderOrder = 2;
  bottle_group.add(bottle_neck_lower_ring);

  const bottle_neck_upper_ringGeom = new THREE.TorusGeometry(0.168, 0.012, 10, 48);
  const bottle_neck_upper_ring = new THREE.Mesh(
    bottle_neck_upper_ringGeom,
    bottle_edgeMat
  );
  bottle_neck_upper_ring.rotation.x = Math.PI / 2;
  bottle_neck_upper_ring.position.y = 1.925;
  bottle_neck_upper_ring.renderOrder = 2;
  bottle_group.add(bottle_neck_upper_ring);

  const bottle_neck_bandGeom = new THREE.CylinderGeometry(0.178, 0.178, 0.030, 48);
  const bottle_neck_band = new THREE.Mesh(bottle_neck_bandGeom, bottle_edgeMat);
  bottle_neck_band.position.y = 1.950;
  bottle_neck_band.renderOrder = 2;
  bottle_group.add(bottle_neck_band);

  const cap_gasketGeom = new THREE.CylinderGeometry(0.181, 0.181, 0.018, 48);
  const cap_gasket = new THREE.Mesh(cap_gasketGeom, cap_gasketMat);
  cap_gasket.position.y = 1.976;
  cap_group.add(cap_gasket);

  const capProfile = [
    new THREE.Vector2(0.000, 1.984),
    new THREE.Vector2(0.188, 1.984),
    new THREE.Vector2(0.209, 1.990),
    new THREE.Vector2(0.219, 2.004),
    new THREE.Vector2(0.222, 2.024),
    new THREE.Vector2(0.222, 2.190),
    new THREE.Vector2(0.218, 2.214),
    new THREE.Vector2(0.205, 2.232),
    new THREE.Vector2(0.182, 2.241),
    new THREE.Vector2(0.000, 2.241)
  ];
  const capGeom = new THREE.LatheGeometry(capProfile, 64);
  const cap = new THREE.Mesh(capGeom, capMat);
  cap_group.add(cap);

  const cap_lower_rimGeom = new THREE.TorusGeometry(0.207, 0.006, 10, 64);
  const cap_lower_rim = new THREE.Mesh(cap_lower_rimGeom, capMat);
  cap_lower_rim.rotation.x = Math.PI / 2;
  cap_lower_rim.position.y = 1.994;
  cap_group.add(cap_lower_rim);

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