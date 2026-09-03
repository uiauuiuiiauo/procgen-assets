export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "umbrella";

  const canopy_group = new THREE.Group();
  canopy_group.name = "canopy_group";
  root.add(canopy_group);

  const shaft_group = new THREE.Group();
  shaft_group.name = "shaft_group";
  root.add(shaft_group);

  const canopy_radius = 2.15;
  const canopy_apex_y = 2.75;
  const canopy_drop = 1.20;
  const panel_count = 8;
  const panel_angle = Math.PI * 2 / panel_count;
  const panel_half_angle = panel_angle / 2;
  const scallop_depth = 0.10;

  const canopy_panelsMat = new THREE.MeshStandardMaterial({
    color: 0x173d3f,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });

  const canopy_seamsMat = new THREE.MeshStandardMaterial({
    color: 0x0d292b,
    metalness: 0.0,
    roughness: 0.95
  });

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171919,
    metalness: 0.0,
    roughness: 0.8
  });

  function edgeRadius(angle) {
    const local_angle = angle - Math.floor(
      angle / panel_angle + 0.5
    ) * panel_angle;
    const u = Math.abs(local_angle) / panel_half_angle;
    return canopy_radius - scallop_depth * Math.cos(u * Math.PI / 2);
  }

  function surfaceY(t, u) {
    return canopy_apex_y
      - canopy_drop * Math.pow(t, 1.45)
      - 0.06 * u * u * Math.pow(t, 1.7);
  }

  function surfacePoint(angle, t, lift) {
    const local_angle = angle - Math.floor(
      angle / panel_angle + 0.5
    ) * panel_angle;
    const u = Math.abs(local_angle) / panel_half_angle;
    const radius = edgeRadius(angle) * t;
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      surfaceY(t, u) + lift,
      Math.cos(angle) * radius
    );
  }

  const radial_steps = 10;
  const angular_steps = 6;
  const canopy_positions = [];
  const canopy_indices = [];

  for (let i = 0; i <= radial_steps; i++) {
    const t = i / radial_steps;
    for (let j = 0; j <= angular_steps; j++) {
      const u = -1 + 2 * j / angular_steps;
      const angle = u * panel_half_angle;
      const radius = edgeRadius(angle) * t;
      canopy_positions.push(
        Math.sin(angle) * radius,
        surfaceY(t, u),
        Math.cos(angle) * radius
      );
    }
  }

  for (let i = 0; i < radial_steps; i++) {
    for (let j = 0; j < angular_steps; j++) {
      const a = i * (angular_steps + 1) + j;
      const b = a + angular_steps + 1;
      canopy_indices.push(a, b, a + 1);
      canopy_indices.push(b, b + 1, a + 1);
    }
  }

  const canopy_panelsGeom = new THREE.BufferGeometry();
  canopy_panelsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(canopy_positions, 3)
  );
  canopy_panelsGeom.setIndex(canopy_indices);
  canopy_panelsGeom.computeVertexNormals();

  const canopy_panels = new THREE.InstancedMesh(
    canopy_panelsGeom,
    canopy_panelsMat,
    panel_count
  );
  canopy_panels.name = "canopy_panels";

  const panel_matrix = new THREE.Matrix4();
  for (let i = 0; i < panel_count; i++) {
    panel_matrix.makeRotationY(i * panel_angle);
    canopy_panels.setMatrixAt(i, panel_matrix);
  }
  canopy_panels.instanceMatrix.needsUpdate = true;
  canopy_group.add(canopy_panels);

  const seam_points = [];
  const rib_points = [];
  for (let i = 0; i <= 8; i++) {
    const t = 0.035 + 0.965 * i / 8;
    seam_points.push(surfacePoint(panel_half_angle, t, 0.012));
    rib_points.push(surfacePoint(panel_half_angle, t, -0.025));
  }

  const canopy_seamsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(seam_points, false, "centripetal"),
    24,
    0.007,
    6,
    false
  );
  const canopy_seams = new THREE.InstancedMesh(
    canopy_seamsGeom,
    canopy_seamsMat,
    panel_count
  );
  canopy_seams.name = "canopy_seams";

  const canopy_ribsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(rib_points, false, "centripetal"),
    24,
    0.014,
    7,
    false
  );
  const canopy_ribs = new THREE.InstancedMesh(
    canopy_ribsGeom,
    frameMat,
    panel_count
  );
  canopy_ribs.name = "canopy_ribs";

  const frame_matrix = new THREE.Matrix4();
  for (let i = 0; i < panel_count; i++) {
    frame_matrix.makeRotationY(i * panel_angle);
    canopy_seams.setMatrixAt(i, frame_matrix);
    canopy_ribs.setMatrixAt(i, frame_matrix);
  }
  canopy_seams.instanceMatrix.needsUpdate = true;
  canopy_ribs.instanceMatrix.needsUpdate = true;
  canopy_group.add(canopy_seams);
  canopy_group.add(canopy_ribs);

  const hem_points = [];
  for (let i = 0; i <= 10; i++) {
    const u = -1 + 2 * i / 10;
    const angle = u * panel_half_angle;
    const radius = edgeRadius(angle);
    hem_points.push(new THREE.Vector3(
      Math.sin(angle) * radius,
      surfaceY(1, u) + 0.002,
      Math.cos(angle) * radius
    ));
  }

  const canopy_hemGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(hem_points, false, "centripetal"),
    20,
    0.012,
    7,
    false
  );
  const canopy_hem = new THREE.InstancedMesh(
    canopy_hemGeom,
    canopy_seamsMat,
    panel_count
  );
  canopy_hem.name = "canopy_hem";

  for (let i = 0; i < panel_count; i++) {
    frame_matrix.makeRotationY(i * panel_angle);
    canopy_hem.setMatrixAt(i, frame_matrix);
  }
  canopy_hem.instanceMatrix.needsUpdate = true;
  canopy_group.add(canopy_hem);

  const stretcher_t = 0.64;
  const support_stretchersGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 1.88, 0),
      surfacePoint(panel_half_angle, stretcher_t, -0.045)
    ),
    1,
    0.012,
    7,
    false
  );
  const support_stretchers = new THREE.InstancedMesh(
    support_stretchersGeom,
    frameMat,
    panel_count
  );
  support_stretchers.name = "support_stretchers";

  for (let i = 0; i < panel_count; i++) {
    frame_matrix.makeRotationY(i * panel_angle);
    support_stretchers.setMatrixAt(i, frame_matrix);
  }
  support_stretchers.instanceMatrix.needsUpdate = true;
  canopy_group.add(support_stretchers);

  const rib_tipsGeom = new THREE.SphereGeometry(0.035, 10, 6);
  const rib_tips = new THREE.InstancedMesh(
    rib_tipsGeom,
    rubberMat,
    panel_count
  );
  rib_tips.name = "rib_tips";

  const identity_quaternion = new THREE.Quaternion();
  const unit_scale = new THREE.Vector3(1, 1, 1);
  const instance_matrix = new THREE.Matrix4();
  const rib_tip_y = surfaceY(1, 0) - 0.018;

  for (let i = 0; i < panel_count; i++) {
    const angle = panel_half_angle + i * panel_angle;
    const position = new THREE.Vector3(
      Math.sin(angle) * (canopy_radius + 0.025),
      rib_tip_y,
      Math.cos(angle) * (canopy_radius + 0.025)
    );
    instance_matrix.compose(position, identity_quaternion, unit_scale);
    rib_tips.setMatrixAt(i, instance_matrix);
  }
  rib_tips.instanceMatrix.needsUpdate = true;
  canopy_group.add(rib_tips);

  const canopy_center_capGeom = new THREE.CylinderGeometry(
    0.14,
    0.18,
    0.09,
    24
  );
  const canopy_center_cap = new THREE.Mesh(
    canopy_center_capGeom,
    canopy_seamsMat
  );
  canopy_center_cap.name = "canopy_center_cap";
  canopy_center_cap.position.y = canopy_apex_y + 0.045;
  canopy_group.add(canopy_center_cap);

  const top_ferruleGeom = new THREE.CylinderGeometry(
    0.025,
    0.055,
    0.36,
    16
  );
  const top_ferrule = new THREE.Mesh(top_ferruleGeom, rubberMat);
  top_ferrule.name = "top_ferrule";
  top_ferrule.position.y = canopy_apex_y + 0.27;
  canopy_group.add(top_ferrule);

  const ferrule_tipGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const ferrule_tip = new THREE.Mesh(ferrule_tipGeom, rubberMat);
  ferrule_tip.name = "ferrule_tip";
  ferrule_tip.scale.set(1, 0.7, 1);
  ferrule_tip.position.y = canopy_apex_y + 0.455;
  canopy_group.add(ferrule_tip);

  const central_shaftGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    3.54,
    14
  );
  const central_shaft = new THREE.Mesh(central_shaftGeom, frameMat);
  central_shaft.name = "central_shaft";
  central_shaft.position.y = 0.98;
  shaft_group.add(central_shaft);

  const canopy_hubGeom = new THREE.CylinderGeometry(
    0.065,
    0.075,
    0.20,
    16
  );
  const canopy_hub = new THREE.Mesh(canopy_hubGeom, rubberMat);
  canopy_hub.name = "canopy_hub";
  canopy_hub.position.y = 1.53;
  shaft_group.add(canopy_hub);

  const sliding_runnerGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.18,
    14
  );
  const sliding_runner = new THREE.Mesh(sliding_runnerGeom, rubberMat);
  sliding_runner.name = "sliding_runner";
  sliding_runner.position.y = 1.88;
  shaft_group.add(sliding_runner);

  const adjustment_clampGeom = new THREE.CylinderGeometry(
    0.067,
    0.067,
    0.27,
    14
  );
  const adjustment_clamp = new THREE.Mesh(
    adjustment_clampGeom,
    rubberMat
  );
  adjustment_clamp.name = "adjustment_clamp";
  adjustment_clamp.position.y = -0.55;
  shaft_group.add(adjustment_clamp);

  const adjustment_pinGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.15,
    10
  );
  const adjustment_pin = new THREE.Mesh(adjustment_pinGeom, frameMat);
  adjustment_pin.name = "adjustment_pin";
  adjustment_pin.rotation.z = Math.PI / 2;
  adjustment_pin.position.set(-0.105, -0.51, 0);
  shaft_group.add(adjustment_pin);

  const adjustment_knobGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.045,
    12
  );
  const adjustment_knob = new THREE.Mesh(
    adjustment_knobGeom,
    rubberMat
  );
  adjustment_knob.name = "adjustment_knob";
  adjustment_knob.rotation.z = Math.PI / 2;
  adjustment_knob.position.set(-0.19, -0.51, 0);
  shaft_group.add(adjustment_knob);

  const handle_socketGeom = new THREE.CylinderGeometry(
    0.075,
    0.09,
    0.18,
    16
  );
  const handle_socket = new THREE.Mesh(handle_socketGeom, rubberMat);
  handle_socket.name = "handle_socket";
  handle_socket.position.y = -0.79;
  shaft_group.add(handle_socket);

  const handle_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.00, -0.78, 0),
    new THREE.Vector3(0.00, -0.98, 0),
    new THREE.Vector3(0.00, -1.20, 0),
    new THREE.Vector3(0.05, -1.36, 0),
    new THREE.Vector3(0.17, -1.43, 0),
    new THREE.Vector3(0.29, -1.39, 0),
    new THREE.Vector3(0.37, -1.28, 0),
    new THREE.Vector3(0.39, -1.13, 0),
    new THREE.Vector3(0.36, -1.02, 0)
  ], false, "centripetal");

  const hook_handleGeom = new THREE.TubeGeometry(
    handle_path,
    40,
    0.085,
    14,
    false
  );
  const hook_handle = new THREE.Mesh(hook_handleGeom, rubberMat);
  hook_handle.name = "hook_handle";
  shaft_group.add(hook_handle);

  const handle_end_capGeom = new THREE.SphereGeometry(0.087, 14, 10);
  const handle_end_cap = new THREE.Mesh(
    handle_end_capGeom,
    rubberMat
  );
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.position.set(0.36, -1.02, 0);
  shaft_group.add(handle_end_cap);

  const handle_loop_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.14, -1.39, 0.025),
    new THREE.Vector3(0.23, -1.46, 0.025),
    new THREE.Vector3(0.34, -1.45, 0.025),
    new THREE.Vector3(0.41, -1.39, 0.025)
  ], false, "centripetal");

  const handle_loopGeom = new THREE.TubeGeometry(
    handle_loop_path,
    16,
    0.012,
    7,
    false
  );
  const handle_loop = new THREE.Mesh(handle_loopGeom, rubberMat);
  handle_loop.name = "handle_loop";
  shaft_group.add(handle_loop);

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