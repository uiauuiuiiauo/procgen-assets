export default function generate(THREE) {
  const root = new THREE.Group();

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7f0ec,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x006838,
    metalness: 0.0,
    roughness: 0.3
  });

  const capTopMat = new THREE.MeshStandardMaterial({
    color: 0x087b49,
    metalness: 0.0,
    roughness: 0.3
  });

  const capDarkMat = new THREE.MeshStandardMaterial({
    color: 0x004c29,
    metalness: 0.0,
    roughness: 0.3
  });

  const bottleProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.290, 0.000),
    new THREE.Vector2(0.340, 0.015),
    new THREE.Vector2(0.375, 0.040),
    new THREE.Vector2(0.392, 0.080),
    new THREE.Vector2(0.400, 0.160),
    new THREE.Vector2(0.400, 0.680),
    new THREE.Vector2(0.395, 0.760),
    new THREE.Vector2(0.380, 0.840),
    new THREE.Vector2(0.350, 0.920),
    new THREE.Vector2(0.310, 0.990),
    new THREE.Vector2(0.255, 1.055),
    new THREE.Vector2(0.195, 1.105),
    new THREE.Vector2(0.155, 1.145),
    new THREE.Vector2(0.140, 1.195),
    new THREE.Vector2(0.137, 1.500),
    new THREE.Vector2(0.145, 1.535),
    new THREE.Vector2(0.145, 1.565),
    new THREE.Vector2(0.115, 1.565),
    new THREE.Vector2(0.114, 1.500),
    new THREE.Vector2(0.114, 1.205),
    new THREE.Vector2(0.125, 1.165),
    new THREE.Vector2(0.165, 1.125),
    new THREE.Vector2(0.225, 1.075),
    new THREE.Vector2(0.285, 1.015),
    new THREE.Vector2(0.335, 0.940),
    new THREE.Vector2(0.365, 0.855),
    new THREE.Vector2(0.378, 0.760),
    new THREE.Vector2(0.380, 0.180),
    new THREE.Vector2(0.372, 0.105),
    new THREE.Vector2(0.345, 0.070),
    new THREE.Vector2(0.300, 0.052),
    new THREE.Vector2(0.000, 0.052)
  ];
  const bottleGeom = new THREE.LatheGeometry(bottleProfile, 64);
  const bottle = new THREE.Mesh(bottleGeom, glassMat);
  root.add(bottle);

  const base_ringGeom = new THREE.TorusGeometry(0.355, 0.014, 10, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, glassMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.055;
  root.add(base_ring);

  const neck_lipGeom = new THREE.TorusGeometry(0.150, 0.023, 12, 64);
  const neck_lip = new THREE.Mesh(neck_lipGeom, glassMat);
  neck_lip.rotation.x = Math.PI / 2;
  neck_lip.position.y = 1.490;
  root.add(neck_lip);

  const closure = new THREE.Group();
  root.add(closure);

  const neck_wrapGeom = new THREE.CylinderGeometry(0.148, 0.142, 0.105, 48);
  const neck_wrap = new THREE.Mesh(neck_wrapGeom, capMat);
  neck_wrap.position.y = 1.485;
  closure.add(neck_wrap);

  const neck_wrap_bandGeom = new THREE.TorusGeometry(0.138, 0.010, 8, 48);
  const neck_wrap_band = new THREE.Mesh(neck_wrap_bandGeom, capDarkMat);
  neck_wrap_band.rotation.x = Math.PI / 2;
  neck_wrap_band.position.y = 1.438;
  closure.add(neck_wrap_band);

  const tamper_ringGeom = new THREE.CylinderGeometry(0.181, 0.181, 0.052, 64);
  const tamper_ring = new THREE.Mesh(tamper_ringGeom, capMat);
  tamper_ring.position.y = 1.565;
  closure.add(tamper_ring);

  const tamper_ring_lower_edgeGeom = new THREE.TorusGeometry(0.166, 0.014, 10, 64);
  const tamper_ring_lower_edge = new THREE.Mesh(tamper_ring_lower_edgeGeom, capDarkMat);
  tamper_ring_lower_edge.rotation.x = Math.PI / 2;
  tamper_ring_lower_edge.position.y = 1.542;
  closure.add(tamper_ring_lower_edge);

  const tamper_ring_upper_edgeGeom = new THREE.TorusGeometry(0.166, 0.014, 10, 64);
  const tamper_ring_upper_edge = new THREE.Mesh(tamper_ring_upper_edgeGeom, capMat);
  tamper_ring_upper_edge.rotation.x = Math.PI / 2;
  tamper_ring_upper_edge.position.y = 1.588;
  closure.add(tamper_ring_upper_edge);

  const cap_skirtProfile = [
    new THREE.Vector2(0.000, 1.585),
    new THREE.Vector2(0.150, 1.585),
    new THREE.Vector2(0.158, 1.600),
    new THREE.Vector2(0.154, 1.615),
    new THREE.Vector2(0.164, 1.630),
    new THREE.Vector2(0.162, 1.650),
    new THREE.Vector2(0.171, 1.670),
    new THREE.Vector2(0.172, 1.690),
    new THREE.Vector2(0.000, 1.690)
  ];
  const cap_skirtGeom = new THREE.LatheGeometry(cap_skirtProfile, 64);
  const cap_skirt = new THREE.Mesh(cap_skirtGeom, capMat);
  closure.add(cap_skirt);

  const cap_lower_bandGeom = new THREE.TorusGeometry(0.154, 0.010, 8, 48);
  const cap_lower_band = new THREE.Mesh(cap_lower_bandGeom, capDarkMat);
  cap_lower_band.rotation.x = Math.PI / 2;
  cap_lower_band.position.y = 1.607;
  closure.add(cap_lower_band);

  const cap_middle_bandGeom = new THREE.TorusGeometry(0.160, 0.010, 8, 48);
  const cap_middle_band = new THREE.Mesh(cap_middle_bandGeom, capDarkMat);
  cap_middle_band.rotation.x = Math.PI / 2;
  cap_middle_band.position.y = 1.642;
  closure.add(cap_middle_band);

  const cap_upper_bandGeom = new THREE.TorusGeometry(0.168, 0.011, 8, 48);
  const cap_upper_band = new THREE.Mesh(cap_upper_bandGeom, capDarkMat);
  cap_upper_band.rotation.x = Math.PI / 2;
  cap_upper_band.position.y = 1.677;
  closure.add(cap_upper_band);

  const cap_crownProfile = [
    new THREE.Vector2(0.000, 1.680),
    new THREE.Vector2(0.168, 1.680),
    new THREE.Vector2(0.190, 1.695),
    new THREE.Vector2(0.205, 1.720),
    new THREE.Vector2(0.207, 1.805),
    new THREE.Vector2(0.203, 1.835),
    new THREE.Vector2(0.190, 1.855),
    new THREE.Vector2(0.160, 1.865),
    new THREE.Vector2(0.000, 1.865)
  ];
  const cap_crownGeom = new THREE.LatheGeometry(cap_crownProfile, 64);
  const cap_crown = new THREE.Mesh(cap_crownGeom, capMat);
  closure.add(cap_crown);

  const cap_ribGeom = new THREE.BoxGeometry(0.010, 0.105, 0.015);
  const cap_ribs = new THREE.InstancedMesh(cap_ribGeom, capDarkMat, 40);
  const cap_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 40; i++) {
    const angle = i / 40 * Math.PI * 2;
    cap_rib_dummy.position.set(
      Math.cos(angle) * 0.207,
      1.777,
      Math.sin(angle) * 0.207
    );
    cap_rib_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    cap_rib_dummy.updateMatrix();
    cap_ribs.setMatrixAt(i, cap_rib_dummy.matrix);
  }
  cap_ribs.instanceMatrix.needsUpdate = true;
  closure.add(cap_ribs);

  const cap_topGeom = new THREE.CylinderGeometry(0.158, 0.164, 0.008, 64);
  const cap_top = new THREE.Mesh(cap_topGeom, capTopMat);
  cap_top.position.y = 1.866;
  closure.add(cap_top);

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