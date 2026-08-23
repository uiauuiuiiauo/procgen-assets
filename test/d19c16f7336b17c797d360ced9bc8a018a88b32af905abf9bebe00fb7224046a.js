export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "necklace";

  const chain_assembly = new THREE.Group();
  chain_assembly.name = "chain_assembly";
  root.add(chain_assembly);

  const pendant_assembly = new THREE.Group();
  pendant_assembly.name = "pendant_assembly";
  root.add(pendant_assembly);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff0bd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });

  const gemstone_backingMat = new THREE.MeshStandardMaterial({
    color: 0xfff3cc,
    metalness: 0.0,
    roughness: 0.4
  });

  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xfff8e8,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.32,
    depthWrite: false
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffed,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const chain_linkGeom = new THREE.TorusGeometry(0.061, 0.0115, 8, 24);

  function populateChain(instanced, curve, count, phase) {
    const dummy = new THREE.Object3D();
    const local_axis = new THREE.Vector3(0, 1, 0);
    const align = new THREE.Quaternion();
    const twist = new THREE.Quaternion();

    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0;
      const position = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t).normalize();
      align.setFromUnitVectors(local_axis, tangent);

      const alternating = (i + phase) % 2;
      const twist_angle = alternating === 0 ? 0.14 : 1.24;
      twist.setFromAxisAngle(local_axis, twist_angle);

      dummy.position.copy(position);
      dummy.quaternion.copy(align).multiply(twist);
      dummy.scale.set(0.66, 1.08, 1);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }

    instanced.instanceMatrix.needsUpdate = true;
    instanced.frustumCulled = false;
  }

  const main_chainCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.18, 1.53, 0.000),
    new THREE.Vector3(-0.98, 1.25, 0.010),
    new THREE.Vector3(-0.75, 0.94, -0.006),
    new THREE.Vector3(-0.50, 0.61, 0.008),
    new THREE.Vector3(-0.25, 0.28, -0.005),
    new THREE.Vector3(-0.02, -0.03, 0.006),
    new THREE.Vector3(0.20, -0.31, 0.000)
  ], false, "centripetal");
  const main_chainGeom = chain_linkGeom;
  const main_chainMat = silverMat;
  const main_chain = new THREE.InstancedMesh(main_chainGeom, main_chainMat, 19);
  main_chain.name = "main_chain";
  populateChain(main_chain, main_chainCurve, 19, 0);
  chain_assembly.add(main_chain);

  const side_chainCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.10, -0.34, 0.000),
    new THREE.Vector3(-1.36, -0.40, 0.010),
    new THREE.Vector3(-1.61, -0.29, -0.006),
    new THREE.Vector3(-1.79, -0.07, 0.007),
    new THREE.Vector3(-1.84, 0.22, -0.004),
    new THREE.Vector3(-1.73, 0.49, 0.006),
    new THREE.Vector3(-1.52, 0.70, 0.000)
  ], false, "centripetal");
  const side_chainGeom = chain_linkGeom;
  const side_chainMat = silverMat;
  const side_chain = new THREE.InstancedMesh(side_chainGeom, side_chainMat, 16);
  side_chain.name = "side_chain";
  populateChain(side_chain, side_chainCurve, 16, 1);
  chain_assembly.add(side_chain);

  const lower_chainCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.10, -0.34, 0.000),
    new THREE.Vector3(-0.86, -0.40, 0.008),
    new THREE.Vector3(-0.60, -0.43, -0.005),
    new THREE.Vector3(-0.34, -0.40, 0.006),
    new THREE.Vector3(-0.10, -0.35, -0.004),
    new THREE.Vector3(0.13, -0.32, 0.000)
  ], false, "centripetal");
  const lower_chainGeom = chain_linkGeom;
  const lower_chainMat = silverMat;
  const lower_chain = new THREE.InstancedMesh(lower_chainGeom, lower_chainMat, 12);
  lower_chain.name = "lower_chain";
  populateChain(lower_chain, lower_chainCurve, 12, 0);
  chain_assembly.add(lower_chain);

  const clasp_ringGeom = new THREE.TorusGeometry(0.105, 0.018, 10, 32);
  const clasp_ringMat = silverMat;
  const clasp_ring = new THREE.Mesh(clasp_ringGeom, clasp_ringMat);
  clasp_ring.name = "clasp_ring";
  clasp_ring.position.set(-1.22, 1.65, 0);
  clasp_ring.rotation.z = -0.28;
  clasp_ring.scale.set(0.95, 1.08, 1);
  chain_assembly.add(clasp_ring);

  const clasp_connectorGeom = chain_linkGeom;
  const clasp_connectorMat = silverMat;
  const clasp_connector = new THREE.Mesh(clasp_connectorGeom, clasp_connectorMat);
  clasp_connector.name = "clasp_connector";
  clasp_connector.position.set(-1.17, 1.52, 0);
  clasp_connector.rotation.z = 0.64;
  clasp_connector.scale.set(0.66, 1.08, 1);
  chain_assembly.add(clasp_connector);

  const side_end_ringGeom = new THREE.TorusGeometry(0.076, 0.014, 8, 28);
  const side_end_ringMat = silverMat;
  const side_end_ring = new THREE.Mesh(side_end_ringGeom, side_end_ringMat);
  side_end_ring.name = "side_end_ring";
  side_end_ring.position.set(-1.50, 0.72, 0);
  side_end_ring.rotation.z = -0.55;
  side_end_ring.scale.set(0.92, 1.08, 1);
  chain_assembly.add(side_end_ring);

  const junction_ringGeom = new THREE.TorusGeometry(0.071, 0.013, 8, 28);
  const junction_ringMat = silverMat;
  const junction_ring = new THREE.Mesh(junction_ringGeom, junction_ringMat);
  junction_ring.name = "junction_ring";
  junction_ring.position.set(-1.10, -0.34, 0.004);
  junction_ring.rotation.z = 0.18;
  junction_ring.scale.set(0.90, 1.08, 1);
  chain_assembly.add(junction_ring);

  const pendant_jump_ringGeom = new THREE.TorusGeometry(0.130, 0.022, 10, 36);
  const pendant_jump_ringMat = silverMat;
  const pendant_jump_ring = new THREE.Mesh(pendant_jump_ringGeom, pendant_jump_ringMat);
  pendant_jump_ring.name = "pendant_jump_ring";
  pendant_jump_ring.position.set(0.15, -0.41, 0.018);
  pendant_jump_ring.rotation.z = -0.12;
  pendant_jump_ring.scale.set(0.92, 1.06, 1);
  chain_assembly.add(pendant_jump_ring);

  const pendant_bailGeom = new THREE.TorusGeometry(0.078, 0.024, 10, 32);
  const pendant_bailMat = silverMat;
  const pendant_bail = new THREE.Mesh(pendant_bailGeom, pendant_bailMat);
  pendant_bail.name = "pendant_bail";
  pendant_bail.position.set(0.105, -0.57, 0.040);
  pendant_bail.rotation.z = -0.18;
  pendant_bail.scale.set(0.72, 1.25, 1);
  pendant_assembly.add(pendant_bail);

  const pendant_capGeom = new THREE.CylinderGeometry(0.070, 0.098, 0.180, 24);
  const pendant_capMat = silverMat;
  const pendant_cap = new THREE.Mesh(pendant_capGeom, pendant_capMat);
  pendant_cap.name = "pendant_cap";
  pendant_cap.position.set(0.095, -0.695, 0.018);
  pendant_assembly.add(pendant_cap);

  const gemstoneProfile = [
    new THREE.Vector2(0.000, -0.410),
    new THREE.Vector2(0.120, -0.390),
    new THREE.Vector2(0.270, -0.330),
    new THREE.Vector2(0.390, -0.220),
    new THREE.Vector2(0.460, -0.070),
    new THREE.Vector2(0.470, 0.060),
    new THREE.Vector2(0.430, 0.200),
    new THREE.Vector2(0.330, 0.310),
    new THREE.Vector2(0.170, 0.380),
    new THREE.Vector2(0.000, 0.405)
  ];
  const gemstoneGeom = new THREE.LatheGeometry(gemstoneProfile, 48);
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  gemstone.position.set(0.080, -1.150, 0);
  gemstone.scale.set(1, 1, 0.72);
  pendant_assembly.add(gemstone);

  const gemstone_backingGeom = new THREE.CircleGeometry(0.285, 36);
  const gemstone_backing = new THREE.Mesh(gemstone_backingGeom, gemstone_backingMat);
  gemstone_backing.name = "gemstone_backing";
  gemstone_backing.position.set(0.080, -1.355, 0.145);
  gemstone_backing.scale.set(1, 0.55, 1);
  pendant_assembly.add(gemstone_backing);

  const internal_cloudsGeom = new THREE.SphereGeometry(1, 16, 10);
  const internal_clouds = new THREE.InstancedMesh(internal_cloudsGeom, cloudMat, 4);
  internal_clouds.name = "internal_clouds";
  const cloud_dummy = new THREE.Object3D();
  const cloud_data = [
    [-0.100, -1.160, 0.155, 0.140, 0.060, 0.022, 0.20],
    [0.050, -1.240, 0.190, 0.180, 0.055, 0.018, -0.35],
    [0.200, -1.080, 0.165, 0.110, 0.048, 0.020, 0.55],
    [-0.010, -1.340, 0.175, 0.150, 0.042, 0.016, -0.10]
  ];
  for (let i = 0; i < cloud_data.length; i++) {
    const d = cloud_data[i];
    cloud_dummy.position.set(d[0], d[1], d[2]);
    cloud_dummy.rotation.set(0, 0, d[6]);
    cloud_dummy.scale.set(d[3], d[4], d[5]);
    cloud_dummy.updateMatrix();
    internal_clouds.setMatrixAt(i, cloud_dummy.matrix);
  }
  internal_clouds.instanceMatrix.needsUpdate = true;
  internal_clouds.frustumCulled = false;
  pendant_assembly.add(internal_clouds);

  const gemstone_highlight_largeGeom = new THREE.CircleGeometry(0.095, 28);
  const gemstone_highlight_large = new THREE.Mesh(
    gemstone_highlight_largeGeom,
    highlightMat
  );
  gemstone_highlight_large.name = "gemstone_highlight_large";
  gemstone_highlight_large.position.set(0.300, -1.020, 0.315);
  gemstone_highlight_large.rotation.set(-0.12, 0.28, -0.20);
  gemstone_highlight_large.scale.set(0.82, 1.12, 1);
  pendant_assembly.add(gemstone_highlight_large);

  const gemstone_highlight_smallGeom = new THREE.CircleGeometry(0.045, 20);
  const gemstone_highlight_small = new THREE.Mesh(
    gemstone_highlight_smallGeom,
    highlightMat
  );
  gemstone_highlight_small.name = "gemstone_highlight_small";
  gemstone_highlight_small.position.set(-0.095, -1.015, 0.290);
  gemstone_highlight_small.rotation.set(-0.10, -0.25, 0.35);
  gemstone_highlight_small.scale.set(0.75, 1.25, 1);
  pendant_assembly.add(gemstone_highlight_small);

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