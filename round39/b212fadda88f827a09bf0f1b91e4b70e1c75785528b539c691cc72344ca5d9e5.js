export default function generate(THREE) {
  const root = new THREE.Group();
  const barrel_group = new THREE.Group();
  const tip_assembly = new THREE.Group();
  root.add(barrel_group, tip_assembly);

  const brushed_blueMat = new THREE.MeshStandardMaterial({
    color: 0x7898b3,
    metalness: 0.6,
    roughness: 0.5,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x36536a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_socketMat = new THREE.MeshStandardMaterial({
    color: 0x252a2e,
    metalness: 0.0,
    roughness: 0.8,
  });

  const front_barrelProfile = [
    new THREE.Vector2(0.000, -0.740),
    new THREE.Vector2(0.325, -0.740),
    new THREE.Vector2(0.340, -0.700),
    new THREE.Vector2(0.345, -0.620),
    new THREE.Vector2(0.345, 0.620),
    new THREE.Vector2(0.340, 0.680),
    new THREE.Vector2(0.325, 0.720),
    new THREE.Vector2(0.000, 0.740),
  ];
  const front_barrelGeom = new THREE.LatheGeometry(front_barrelProfile, 64);
  const front_barrel = new THREE.Mesh(front_barrelGeom, brushed_blueMat);
  front_barrel.rotation.x = Math.PI / 2;
  front_barrel.position.z = 1.10;
  barrel_group.add(front_barrel);

  const middle_barrelProfile = [
    new THREE.Vector2(0.000, -0.470),
    new THREE.Vector2(0.295, -0.470),
    new THREE.Vector2(0.315, -0.430),
    new THREE.Vector2(0.320, -0.360),
    new THREE.Vector2(0.320, 0.380),
    new THREE.Vector2(0.315, 0.430),
    new THREE.Vector2(0.295, 0.470),
    new THREE.Vector2(0.000, 0.470),
  ];
  const middle_barrelGeom = new THREE.LatheGeometry(middle_barrelProfile, 64);
  const middle_barrel = new THREE.Mesh(middle_barrelGeom, brushed_blueMat);
  middle_barrel.rotation.x = Math.PI / 2;
  middle_barrel.position.z = -0.02;
  barrel_group.add(middle_barrel);

  const rear_barrelProfile = [
    new THREE.Vector2(0.000, -0.700),
    new THREE.Vector2(0.300, -0.700),
    new THREE.Vector2(0.325, -0.660),
    new THREE.Vector2(0.340, -0.590),
    new THREE.Vector2(0.340, 0.590),
    new THREE.Vector2(0.325, 0.660),
    new THREE.Vector2(0.300, 0.700),
    new THREE.Vector2(0.000, 0.700),
  ];
  const rear_barrelGeom = new THREE.LatheGeometry(rear_barrelProfile, 64);
  const rear_barrel = new THREE.Mesh(rear_barrelGeom, brushed_blueMat);
  rear_barrel.rotation.x = Math.PI / 2;
  rear_barrel.position.z = -1.19;
  barrel_group.add(rear_barrel);

  const rear_capProfile = [
    new THREE.Vector2(0.000, -0.340),
    new THREE.Vector2(0.200, -0.340),
    new THREE.Vector2(0.250, -0.320),
    new THREE.Vector2(0.300, -0.280),
    new THREE.Vector2(0.330, -0.200),
    new THREE.Vector2(0.340, -0.100),
    new THREE.Vector2(0.340, 0.250),
    new THREE.Vector2(0.330, 0.300),
    new THREE.Vector2(0.300, 0.340),
    new THREE.Vector2(0.000, 0.340),
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 64);
  const rear_cap = new THREE.Mesh(rear_capGeom, brushed_blueMat);
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -2.17;
  barrel_group.add(rear_cap);

  const barrel_seamGeom = new THREE.TorusGeometry(1, 0.025, 8, 48);

  const front_joint_ring = new THREE.Mesh(barrel_seamGeom, seamMat);
  front_joint_ring.scale.setScalar(0.323);
  front_joint_ring.position.z = 0.36;
  barrel_group.add(front_joint_ring);

  const rear_joint_ring = new THREE.Mesh(barrel_seamGeom, seamMat);
  rear_joint_ring.scale.setScalar(0.323);
  rear_joint_ring.position.z = -0.48;
  barrel_group.add(rear_joint_ring);

  const rear_cap_ring = new THREE.Mesh(barrel_seamGeom, seamMat);
  rear_cap_ring.scale.setScalar(0.337);
  rear_cap_ring.position.z = -1.84;
  barrel_group.add(rear_cap_ring);

  const nose_collarProfile = [
    new THREE.Vector2(0.000, -0.340),
    new THREE.Vector2(0.325, -0.340),
    new THREE.Vector2(0.325, -0.280),
    new THREE.Vector2(0.310, -0.200),
    new THREE.Vector2(0.270, -0.080),
    new THREE.Vector2(0.210, 0.080),
    new THREE.Vector2(0.165, 0.200),
    new THREE.Vector2(0.150, 0.280),
    new THREE.Vector2(0.150, 0.300),
    new THREE.Vector2(0.000, 0.300),
  ];
  const nose_collarGeom = new THREE.LatheGeometry(nose_collarProfile, 64);
  const nose_collar = new THREE.Mesh(nose_collarGeom, polished_metalMat);
  nose_collar.rotation.x = Math.PI / 2;
  nose_collar.position.z = 2.04;
  tip_assembly.add(nose_collar);

  const nose_socketGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.018, 40);
  const nose_socket = new THREE.Mesh(nose_socketGeom, dark_socketMat);
  nose_socket.rotation.x = Math.PI / 2;
  nose_socket.position.z = 2.344;
  tip_assembly.add(nose_socket);

  const shaft_rear_ringGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 40);
  const shaft_rear_ring = new THREE.Mesh(shaft_rear_ringGeom, polished_metalMat);
  shaft_rear_ring.position.z = 2.355;
  tip_assembly.add(shaft_rear_ring);

  const tip_shaftGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.44, 40);
  const tip_shaft = new THREE.Mesh(tip_shaftGeom, polished_metalMat);
  tip_shaft.rotation.x = Math.PI / 2;
  tip_shaft.position.z = 2.56;
  tip_assembly.add(tip_shaft);

  const tip_step_ringGeom = new THREE.TorusGeometry(0.098, 0.014, 8, 40);
  const tip_step_ring = new THREE.Mesh(tip_step_ringGeom, polished_metalMat);
  tip_step_ring.position.z = 2.775;
  tip_assembly.add(tip_step_ring);

  const tip_holderProfile = [
    new THREE.Vector2(0.000, -0.180),
    new THREE.Vector2(0.105, -0.180),
    new THREE.Vector2(0.125, -0.140),
    new THREE.Vector2(0.130, -0.080),
    new THREE.Vector2(0.115, 0.020),
    new THREE.Vector2(0.095, 0.100),
    new THREE.Vector2(0.075, 0.150),
    new THREE.Vector2(0.000, 0.180),
  ];
  const tip_holderGeom = new THREE.LatheGeometry(tip_holderProfile, 48);
  const tip_holder = new THREE.Mesh(tip_holderGeom, polished_metalMat);
  tip_holder.rotation.x = Math.PI / 2;
  tip_holder.position.z = 2.92;
  tip_assembly.add(tip_holder);

  const stylus_tipProfile = [
    new THREE.Vector2(0.000, -0.200),
    new THREE.Vector2(0.075, -0.200),
    new THREE.Vector2(0.090, -0.150),
    new THREE.Vector2(0.080, -0.080),
    new THREE.Vector2(0.060, 0.020),
    new THREE.Vector2(0.035, 0.120),
    new THREE.Vector2(0.000, 0.220),
  ];
  const stylus_tipGeom = new THREE.LatheGeometry(stylus_tipProfile, 48);
  const stylus_tip = new THREE.Mesh(stylus_tipGeom, polished_metalMat);
  stylus_tip.rotation.x = Math.PI / 2;
  stylus_tip.position.z = 3.25;
  tip_assembly.add(stylus_tip);

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