export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_measuring_instrument";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a3e,
    metalness: 0.6,
    roughness: 0.32,
  });
  const brightBrassMat = new THREE.MeshStandardMaterial({
    color: 0xd0aa58,
    metalness: 0.6,
    roughness: 0.2,
  });
  const agedBrassMat = new THREE.MeshStandardMaterial({
    color: 0x745522,
    metalness: 0.5,
    roughness: 0.5,
  });
  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x21170d,
    metalness: 0.0,
    roughness: 0.8,
  });

  function alignCylinder(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    mesh.scale.y = length;
    return mesh;
  }

  const curved_tape_points = [
    new THREE.Vector3(-1.46, -0.14, -0.13),
    new THREE.Vector3(-1.24, 0.24, -0.13),
    new THREE.Vector3(-0.79, 0.63, -0.13),
    new THREE.Vector3(-0.22, 0.88, -0.13),
    new THREE.Vector3(0.38, 0.82, -0.13),
    new THREE.Vector3(0.81, 0.51, -0.13),
    new THREE.Vector3(0.98, 0.08, -0.13),
    new THREE.Vector3(0.80, -0.28, -0.13),
    new THREE.Vector3(0.43, -0.43, -0.13),
    new THREE.Vector3(0.14, -0.39, -0.13),
  ];
  const curved_tape_curve = new THREE.CatmullRomCurve3(
    curved_tape_points,
    false,
    "centripetal"
  );
  const curved_tapeGeom = new THREE.TubeGeometry(
    curved_tape_curve,
    96,
    0.018,
    8,
    false
  );
  const curved_tape = new THREE.Mesh(curved_tapeGeom, copperMat);
  curved_tape.name = "curved_tape";
  root.add(curved_tape);

  const curved_tape_ridgesGeom = new THREE.TorusGeometry(
    0.0184,
    0.0024,
    6,
    12
  );
  const curved_tape_ridges = new THREE.InstancedMesh(
    curved_tape_ridgesGeom,
    brightBrassMat,
    38
  );
  curved_tape_ridges.name = "curved_tape_ridges";
  const ridge_dummy = new THREE.Object3D();
  const ridge_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 38; i++) {
    const t = 0.015 + (i / 37) * 0.97;
    const point = curved_tape_curve.getPoint(t);
    const tangent = curved_tape_curve.getTangent(t).normalize();
    ridge_dummy.position.copy(point);
    ridge_dummy.quaternion.setFromUnitVectors(ridge_axis, tangent);
    ridge_dummy.scale.set(1, 1, 1);
    ridge_dummy.updateMatrix();
    curved_tape_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  curved_tape_ridges.instanceMatrix.needsUpdate = true;
  root.add(curved_tape_ridges);

  const measuring_arm_start = new THREE.Vector3(-1.43, -0.17, -0.075);
  const measuring_arm_end = new THREE.Vector3(0.025, -0.025, -0.075);
  const measuring_armGeom = new THREE.BoxGeometry(0.052, 1, 0.034);
  const measuring_arm = new THREE.Mesh(measuring_armGeom, copperMat);
  measuring_arm.name = "measuring_arm";
  alignCylinder(measuring_arm, measuring_arm_start, measuring_arm_end);
  root.add(measuring_arm);

  const measuring_arm_edgeGeom = new THREE.BoxGeometry(0.007, 1, 0.006);
  const measuring_arm_edge = new THREE.Mesh(
    measuring_arm_edgeGeom,
    brightBrassMat
  );
  measuring_arm_edge.name = "measuring_arm_edge";
  alignCylinder(
    measuring_arm_edge,
    new THREE.Vector3(-1.405, -0.169, -0.054),
    new THREE.Vector3(0.005, -0.027, -0.054)
  );
  root.add(measuring_arm_edge);

  const measuring_arm_ticksGeom = new THREE.BoxGeometry(0.013, 0.03, 0.006);
  const measuring_arm_ticks = new THREE.InstancedMesh(
    measuring_arm_ticksGeom,
    darkMat,
    18
  );
  measuring_arm_ticks.name = "measuring_arm_ticks";
  const arm_direction = new THREE.Vector3()
    .subVectors(measuring_arm_end, measuring_arm_start)
    .normalize();
  const arm_perpendicular = new THREE.Vector3(
    -arm_direction.y,
    arm_direction.x,
    0
  );
  const arm_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const t = 0.095 + i * 0.052;
    arm_tick_dummy.position.lerpVectors(
      measuring_arm_start,
      measuring_arm_end,
      t
    );
    arm_tick_dummy.position.addScaledVector(arm_perpendicular, 0.03);
    arm_tick_dummy.position.z = -0.052;
    arm_tick_dummy.rotation.set(
      0,
      0,
      Math.atan2(arm_direction.y, arm_direction.x) - Math.PI / 2
    );
    arm_tick_dummy.updateMatrix();
    measuring_arm_ticks.setMatrixAt(i, arm_tick_dummy.matrix);
  }
  measuring_arm_ticks.instanceMatrix.needsUpdate = true;
  root.add(measuring_arm_ticks);

  const pivot_center = new THREE.Vector3(-1.50, -0.18, -0.008);

  const pivot_outer_rimGeom = new THREE.TorusGeometry(0.083, 0.021, 10, 32);
  const pivot_outer_rim = new THREE.Mesh(pivot_outer_rimGeom, agedBrassMat);
  pivot_outer_rim.name = "pivot_outer_rim";
  pivot_outer_rim.position.copy(pivot_center);
  root.add(pivot_outer_rim);

  const pivot_knurlGeom = new THREE.BoxGeometry(0.021, 0.047, 0.033);
  const pivot_knurl = new THREE.InstancedMesh(
    pivot_knurlGeom,
    brassMat,
    18
  );
  pivot_knurl.name = "pivot_knurl";
  const pivot_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    pivot_dummy.position.set(
      pivot_center.x + Math.cos(angle) * 0.105,
      pivot_center.y + Math.sin(angle) * 0.105,
      -0.008
    );
    pivot_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    pivot_dummy.updateMatrix();
    pivot_knurl.setMatrixAt(i, pivot_dummy.matrix);
  }
  pivot_knurl.instanceMatrix.needsUpdate = true;
  root.add(pivot_knurl);

  const pivot_boreGeom = new THREE.CircleGeometry(0.047, 24);
  const pivot_bore = new THREE.Mesh(pivot_boreGeom, darkMat);
  pivot_bore.name = "pivot_bore";
  pivot_bore.position.set(
    pivot_center.x,
    pivot_center.y,
    pivot_center.z + 0.022
  );
  root.add(pivot_bore);

  const pivot_inner_rimGeom = new THREE.TorusGeometry(0.049, 0.008, 8, 28);
  const pivot_inner_rim = new THREE.Mesh(
    pivot_inner_rimGeom,
    brightBrassMat
  );
  pivot_inner_rim.name = "pivot_inner_rim";
  pivot_inner_rim.position.set(
    pivot_center.x,
    pivot_center.y,
    pivot_center.z + 0.025
  );
  root.add(pivot_inner_rim);

  const diagonal_start = new THREE.Vector3(-1.20, 0.88, -0.045);
  const diagonal_end = new THREE.Vector3(-0.015, 0.03, -0.045);
  const diagonal_direction = new THREE.Vector3()
    .subVectors(diagonal_end, diagonal_start)
    .normalize();
  const diagonal_perpendicular = new THREE.Vector3(
    -diagonal_direction.y,
    diagonal_direction.x,
    0
  );

  const diagonal_handleGeom = new THREE.BoxGeometry(0.088, 1, 0.052);
  const diagonal_handle = new THREE.Mesh(diagonal_handleGeom, brassMat);
  diagonal_handle.name = "diagonal_handle";
  alignCylinder(diagonal_handle, diagonal_start, diagonal_end);
  root.add(diagonal_handle);

  const diagonal_handle_ridgeGeom = new THREE.BoxGeometry(0.011, 1, 0.008);
  const diagonal_handle_ridge = new THREE.Mesh(
    diagonal_handle_ridgeGeom,
    brightBrassMat
  );
  diagonal_handle_ridge.name = "diagonal_handle_ridge";
  alignCylinder(
    diagonal_handle_ridge,
    new THREE.Vector3(
      diagonal_start.x + diagonal_perpendicular.x * 0.022,
      diagonal_start.y + diagonal_perpendicular.y * 0.022,
      -0.015
    ),
    new THREE.Vector3(
      diagonal_end.x + diagonal_perpendicular.x * 0.022,
      diagonal_end.y + diagonal_perpendicular.y * 0.022,
      -0.015
    )
  );
  root.add(diagonal_handle_ridge);

  const handle_grip_bandsGeom = new THREE.BoxGeometry(0.094, 0.01, 0.007);
  const handle_grip_bands = new THREE.InstancedMesh(
    handle_grip_bandsGeom,
    agedBrassMat,
    8
  );
  handle_grip_bands.name = "handle_grip_bands";
  const handle_band_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const t = 0.53 + i * 0.064;
    handle_band_dummy.position.lerpVectors(diagonal_start, diagonal_end, t);
    handle_band_dummy.position.z = -0.013;
    handle_band_dummy.rotation.set(
      0,
      0,
      Math.atan2(diagonal_direction.y, diagonal_direction.x) - Math.PI / 2
    );
    handle_band_dummy.updateMatrix();
    handle_grip_bands.setMatrixAt(i, handle_band_dummy.matrix);
  }
  handle_grip_bands.instanceMatrix.needsUpdate = true;
  root.add(handle_grip_bands);

  const eyelet_neck_start = new THREE.Vector3(-1.20, 0.88, -0.045);
  const eyelet_neck_end = new THREE.Vector3(-1.34, 1.00, -0.045);
  const eyelet_neckGeom = new THREE.CylinderGeometry(0.043, 0.055, 1, 12);
  const eyelet_neck = new THREE.Mesh(eyelet_neckGeom, brassMat);
  eyelet_neck.name = "eyelet_neck";
  alignCylinder(eyelet_neck, eyelet_neck_start, eyelet_neck_end);
  root.add(eyelet_neck);

  const eyelet_knobGeom = new THREE.SphereGeometry(0.055, 18, 10);
  const eyelet_knob = new THREE.Mesh(eyelet_knobGeom, agedBrassMat);
  eyelet_knob.name = "eyelet_knob";
  eyelet_knob.position.set(-1.33, 0.985, -0.045);
  eyelet_knob.scale.set(1.12, 0.72, 0.7);
  root.add(eyelet_knob);

  const eyelet_ringGeom = new THREE.TorusGeometry(0.13, 0.028, 12, 40);
  const eyelet_ring = new THREE.Mesh(eyelet_ringGeom, brightBrassMat);
  eyelet_ring.name = "eyelet_ring";
  eyelet_ring.position.set(-1.47, 1.065, -0.045);
  root.add(eyelet_ring);

  const right_bladeShape = new THREE.Shape();
  right_bladeShape.moveTo(0.055, -0.057);
  right_bladeShape.lineTo(1.18, -0.038);
  right_bladeShape.lineTo(1.72, 0);
  right_bladeShape.lineTo(1.18, 0.038);
  right_bladeShape.lineTo(0.055, 0.057);
  right_bladeShape.closePath();

  const right_bladeGeom = new THREE.ExtrudeGeometry(right_bladeShape, {
    depth: 0.038,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.007,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const right_blade = new THREE.Mesh(right_bladeGeom, brassMat);
  right_blade.name = "right_blade";
  right_blade.position.z = -0.043;
  root.add(right_blade);

  const right_blade_ridgeGeom = new THREE.BoxGeometry(1.12, 0.009, 0.008);
  const right_blade_ridge = new THREE.Mesh(
    right_blade_ridgeGeom,
    brightBrassMat
  );
  right_blade_ridge.name = "right_blade_ridge";
  right_blade_ridge.position.set(0.67, 0.005, -0.001);
  root.add(right_blade_ridge);

  const diagonal_needle_start = new THREE.Vector3(0.018, -0.04, 0.075);
  const diagonal_needle_end = new THREE.Vector3(1.02, -1.17, 0.075);
  const diagonal_needle_base = diagonal_needle_start
    .clone()
    .add(
      new THREE.Vector3()
        .subVectors(diagonal_needle_end, diagonal_needle_start)
        .multiplyScalar(0.72)
    );

  const diagonal_needle_shaftGeom = new THREE.CylinderGeometry(
    0.019,
    0.047,
    1,
    16
  );
  const diagonal_needle_shaft = new THREE.Mesh(
    diagonal_needle_shaftGeom,
    brassMat
  );
  diagonal_needle_shaft.name = "diagonal_needle_shaft";
  alignCylinder(
    diagonal_needle_shaft,
    diagonal_needle_start,
    diagonal_needle_base
  );
  root.add(diagonal_needle_shaft);

  const diagonal_needle_tipGeom = new THREE.ConeGeometry(0.02, 1, 16);
  const diagonal_needle_tip = new THREE.Mesh(
    diagonal_needle_tipGeom,
    brightBrassMat
  );
  diagonal_needle_tip.name = "diagonal_needle_tip";
  alignCylinder(diagonal_needle_tip, diagonal_needle_base, diagonal_needle_end);
  root.add(diagonal_needle_tip);

  const central_hubGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.19, 8);
  const central_hub = new THREE.Mesh(central_hubGeom, brassMat);
  central_hub.name = "central_hub";
  central_hub.rotation.x = Math.PI / 2;
  central_hub.position.z = 0.045;
  root.add(central_hub);

  const hub_front_collarGeom = new THREE.CylinderGeometry(
    0.108,
    0.108,
    0.042,
    24
  );
  const hub_front_collar = new THREE.Mesh(
    hub_front_collarGeom,
    brightBrassMat
  );
  hub_front_collar.name = "hub_front_collar";
  hub_front_collar.rotation.x = Math.PI / 2;
  hub_front_collar.position.z = 0.15;
  root.add(hub_front_collar);

  const hub_rear_collarGeom = new THREE.CylinderGeometry(
    0.112,
    0.112,
    0.045,
    8
  );
  const hub_rear_collar = new THREE.Mesh(
    hub_rear_collarGeom,
    agedBrassMat
  );
  hub_rear_collar.name = "hub_rear_collar";
  hub_rear_collar.rotation.x = Math.PI / 2;
  hub_rear_collar.position.z = -0.07;
  root.add(hub_rear_collar);

  const hub_boreGeom = new THREE.CircleGeometry(0.062, 24);
  const hub_bore = new THREE.Mesh(hub_boreGeom, darkMat);
  hub_bore.name = "hub_bore";
  hub_bore.position.z = 0.175;
  root.add(hub_bore);

  const hub_bore_rimGeom = new THREE.TorusGeometry(0.073, 0.011, 8, 28);
  const hub_bore_rim = new THREE.Mesh(hub_bore_rimGeom, agedBrassMat);
  hub_bore_rim.name = "hub_bore_rim";
  hub_bore_rim.position.z = 0.179;
  root.add(hub_bore_rim);

  const needle_socketGeom = new THREE.TorusGeometry(0.044, 0.009, 8, 24);
  const needle_socket = new THREE.Mesh(needle_socketGeom, agedBrassMat);
  needle_socket.name = "needle_socket";
  needle_socket.position.set(0.024, -0.04, 0.184);
  root.add(needle_socket);

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