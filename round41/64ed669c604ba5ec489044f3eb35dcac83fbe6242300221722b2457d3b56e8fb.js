export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_assembly = new THREE.Group();
  root.add(tool_assembly);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const polished_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const dark_recessMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.6,
  });

  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x454545,
    metalness: 0.2,
    roughness: 0.8,
  });

  const flange_bodyGeom = new THREE.CylinderGeometry(0.62, 0.62, 0.18, 64);
  const flange_body = new THREE.Mesh(flange_bodyGeom, brushed_metalMat);
  flange_body.rotation.x = Math.PI / 2;
  flange_body.position.z = -0.31;
  tool_assembly.add(flange_body);

  const flange_front_bevelGeom = new THREE.CylinderGeometry(0.50, 0.62, 0.12, 64);
  const flange_front_bevel = new THREE.Mesh(flange_front_bevelGeom, brushed_metalMat);
  flange_front_bevel.rotation.x = Math.PI / 2;
  flange_front_bevel.position.z = -0.17;
  tool_assembly.add(flange_front_bevel);

  const flange_back_bevelGeom = new THREE.CylinderGeometry(0.62, 0.54, 0.10, 64);
  const flange_back_bevel = new THREE.Mesh(flange_back_bevelGeom, brushed_metalMat);
  flange_back_bevel.rotation.x = Math.PI / 2;
  flange_back_bevel.position.z = -0.45;
  tool_assembly.add(flange_back_bevel);

  const flange_front_rimGeom = new THREE.TorusGeometry(0.50, 0.022, 10, 64);
  const flange_front_rim = new THREE.Mesh(flange_front_rimGeom, polished_edgeMat);
  flange_front_rim.position.z = -0.105;
  tool_assembly.add(flange_front_rim);

  const flange_back_rimGeom = new THREE.TorusGeometry(0.54, 0.018, 10, 64);
  const flange_back_rim = new THREE.Mesh(flange_back_rimGeom, polished_edgeMat);
  flange_back_rim.position.z = -0.50;
  tool_assembly.add(flange_back_rim);

  const flange_grooveGeom = new THREE.TorusGeometry(0.475, 0.009, 8, 64);
  const flange_groove = new THREE.Mesh(flange_grooveGeom, dark_recessMat);
  flange_groove.position.z = -0.096;
  tool_assembly.add(flange_groove);

  const flange_faceGeom = new THREE.RingGeometry(0.27, 0.585, 64);
  const flange_face = new THREE.Mesh(flange_faceGeom, brushed_metalMat);
  flange_face.position.z = -0.092;
  tool_assembly.add(flange_face);

  const conical_tipProfile = [
    new THREE.Vector2(0.000, -0.08),
    new THREE.Vector2(0.300, -0.08),
    new THREE.Vector2(0.340, -0.02),
    new THREE.Vector2(0.355, 0.08),
    new THREE.Vector2(0.350, 0.20),
    new THREE.Vector2(0.330, 0.36),
    new THREE.Vector2(0.300, 0.55),
    new THREE.Vector2(0.260, 0.75),
    new THREE.Vector2(0.215, 0.95),
    new THREE.Vector2(0.165, 1.16),
    new THREE.Vector2(0.112, 1.36),
    new THREE.Vector2(0.060, 1.52),
    new THREE.Vector2(0.022, 1.62),
    new THREE.Vector2(0.000, 1.66),
  ];
  const conical_tipGeom = new THREE.LatheGeometry(conical_tipProfile, 64);
  const conical_tip = new THREE.Mesh(conical_tipGeom, brushed_metalMat);
  conical_tip.rotation.x = Math.PI / 2;
  tool_assembly.add(conical_tip);

  const tip_wear_ringGeom = new THREE.TorusGeometry(0.023, 0.003, 6, 32);
  const tip_wear_ring = new THREE.Mesh(tip_wear_ringGeom, dark_recessMat);
  tip_wear_ring.position.z = 1.615;
  tool_assembly.add(tip_wear_ring);

  const rear_bossProfile = [
    new THREE.Vector2(0.000, 0.00),
    new THREE.Vector2(0.155, 0.00),
    new THREE.Vector2(0.180, 0.045),
    new THREE.Vector2(0.180, 0.16),
    new THREE.Vector2(0.158, 0.25),
    new THREE.Vector2(0.120, 0.31),
    new THREE.Vector2(0.000, 0.34),
  ];
  const rear_bossGeom = new THREE.LatheGeometry(rear_bossProfile, 48);
  const rear_boss = new THREE.Mesh(rear_bossGeom, brushed_metalMat);
  rear_boss.rotation.x = Math.PI / 2;
  rear_boss.position.z = -0.48;
  tool_assembly.add(rear_boss);

  const rear_boss_ringGeom = new THREE.TorusGeometry(0.158, 0.012, 8, 48);
  const rear_boss_ring = new THREE.Mesh(rear_boss_ringGeom, polished_edgeMat);
  rear_boss_ring.position.z = -0.535;
  tool_assembly.add(rear_boss_ring);

  const machining_ringsGeom = new THREE.TorusGeometry(1, 0.012, 6, 64);
  const machining_rings = new THREE.InstancedMesh(
    machining_ringsGeom,
    dark_recessMat,
    3
  );
  const machining_ring_data = [
    [0.337, 0.30],
    [0.296, 0.56],
    [0.207, 0.96],
  ];
  const machining_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < machining_ring_data.length; i++) {
    const radius = machining_ring_data[i][0];
    const z = machining_ring_data[i][1];
    machining_ring_dummy.position.set(0, 0, z);
    machining_ring_dummy.rotation.set(0, 0, 0);
    machining_ring_dummy.scale.set(radius, radius, 0.35);
    machining_ring_dummy.updateMatrix();
    machining_rings.setMatrixAt(i, machining_ring_dummy.matrix);
  }
  machining_rings.instanceMatrix.needsUpdate = true;
  tool_assembly.add(machining_rings);

  function tipRadiusAt(z) {
    if (z <= 0.20) return 0.35;
    if (z <= 0.75) return 0.35 - (z - 0.20) * 0.164;
    if (z <= 1.16) return 0.26 - (z - 0.75) * 0.234;
    return 0.165 - (z - 1.16) * 0.34;
  }

  const surface_scratches = new THREE.Group();
  const scratch_data = [
    [0.25, 0.38, 0.29],
    [1.70, 0.66, 0.31],
    [3.45, 0.91, 0.27],
    [5.10, 0.48, 0.33],
  ];
  for (let i = 0; i < scratch_data.length; i++) {
    const angle = scratch_data[i][0];
    const z0 = scratch_data[i][1];
    const length = scratch_data[i][2];
    const points = [];
    for (let j = 0; j <= 4; j++) {
      const t = j / 4;
      const z = z0 + length * t;
      const a = angle + Math.sin(t * Math.PI) * 0.012;
      const radius = tipRadiusAt(z) + 0.003;
      points.push(new THREE.Vector3(
        Math.cos(a) * radius,
        Math.sin(a) * radius,
        z
      ));
    }
    const surface_scratchGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      10,
      0.0035,
      5,
      false
    );
    const surface_scratch = new THREE.Mesh(surface_scratchGeom, scratchMat);
    surface_scratches.add(surface_scratch);
  }
  tool_assembly.add(surface_scratches);

  tool_assembly.rotation.set(0.32, -0.55, 0);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}