export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stainless_gas_grill";

  const brushed_stainless_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const polished_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silver_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubber_mat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeRodBetween(start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const firebox_body_shape = new THREE.Shape();
  firebox_body_shape.moveTo(-1.18, 1.35);
  firebox_body_shape.lineTo(1.18, 1.35);
  firebox_body_shape.lineTo(0.88, 0.60);
  firebox_body_shape.lineTo(-0.88, 0.60);
  firebox_body_shape.closePath();

  const firebox_body_geom = new THREE.ExtrudeGeometry(firebox_body_shape, {
    depth: 1.48,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  const firebox_body = new THREE.Mesh(
    firebox_body_geom,
    brushed_stainless_mat
  );
  firebox_body.position.z = -0.74;
  firebox_body.name = "firebox_body";
  root.add(firebox_body);

  const front_firebox_panel_shape = new THREE.Shape();
  front_firebox_panel_shape.moveTo(-1.15, 1.32);
  front_firebox_panel_shape.lineTo(1.15, 1.32);
  front_firebox_panel_shape.lineTo(0.86, 0.63);
  front_firebox_panel_shape.lineTo(-0.86, 0.63);
  front_firebox_panel_shape.closePath();

  const front_firebox_panel_geom = new THREE.ShapeGeometry(
    front_firebox_panel_shape
  );
  const front_firebox_panel = new THREE.Mesh(
    front_firebox_panel_geom,
    brushed_stainless_mat
  );
  front_firebox_panel.position.z = 0.785;
  front_firebox_panel.name = "front_firebox_panel";
  root.add(front_firebox_panel);

  const side_shelves_geom = new THREE.BoxGeometry(0.46, 0.13, 1.72);
  const side_shelves = new THREE.InstancedMesh(
    side_shelves_geom,
    brushed_stainless_mat,
    2
  );
  const side_shelf_matrix = new THREE.Matrix4();
  side_shelf_matrix.makeTranslation(-1.51, 1.405, 0);
  side_shelves.setMatrixAt(0, side_shelf_matrix);
  side_shelf_matrix.makeTranslation(1.51, 1.405, 0);
  side_shelves.setMatrixAt(1, side_shelf_matrix);
  side_shelves.instanceMatrix.needsUpdate = true;
  side_shelves.name = "side_shelves";
  root.add(side_shelves);

  const side_shelf_lips_geom = new THREE.BoxGeometry(0.055, 0.055, 1.72);
  const side_shelf_lips = new THREE.InstancedMesh(
    side_shelf_lips_geom,
    polished_metal_mat,
    2
  );
  const side_shelf_lip_matrix = new THREE.Matrix4();
  side_shelf_lip_matrix.makeTranslation(-1.735, 1.39, 0);
  side_shelf_lips.setMatrixAt(0, side_shelf_lip_matrix);
  side_shelf_lip_matrix.makeTranslation(1.735, 1.39, 0);
  side_shelf_lips.setMatrixAt(1, side_shelf_lip_matrix);
  side_shelf_lips.instanceMatrix.needsUpdate = true;
  side_shelf_lips.name = "side_shelf_lips";
  root.add(side_shelf_lips);

  const front_apron_geom = new THREE.BoxGeometry(2.48, 0.22, 0.12);
  const front_apron = new THREE.Mesh(
    front_apron_geom,
    brushed_stainless_mat
  );
  front_apron.position.set(0, 1.25, 0.82);
  front_apron.name = "front_apron";
  root.add(front_apron);

  const rear_apron_geom = new THREE.BoxGeometry(2.42, 0.18, 0.10);
  const rear_apron = new THREE.Mesh(
    rear_apron_geom,
    brushed_stainless_mat
  );
  rear_apron.position.set(0, 1.27, -0.81);
  rear_apron.name = "rear_apron";
  root.add(rear_apron);

  const front_upper_trim_geom = new THREE.BoxGeometry(2.46, 0.045, 0.075);
  const front_upper_trim = new THREE.Mesh(
    front_upper_trim_geom,
    polished_metal_mat
  );
  front_upper_trim.position.set(0, 1.365, 0.88);
  front_upper_trim.name = "front_upper_trim";
  root.add(front_upper_trim);

  const lid_seam_geom = new THREE.BoxGeometry(2.54, 0.035, 0.045);
  const lid_seam = new THREE.Mesh(lid_seam_geom, rubber_mat);
  lid_seam.position.set(0, 1.465, 0.885);
  lid_seam.name = "lid_seam";
  root.add(lid_seam);

  const lid_base_trim_geom = new THREE.BoxGeometry(2.50, 0.055, 0.085);
  const lid_base_trim = new THREE.Mesh(
    lid_base_trim_geom,
    polished_metal_mat
  );
  lid_base_trim.position.set(0, 1.505, 0.86);
  lid_base_trim.name = "lid_base_trim";
  root.add(lid_base_trim);

  const hood_profile = new THREE.Shape();
  hood_profile.moveTo(-0.88, 1.47);
  hood_profile.lineTo(-0.88, 1.78);
  hood_profile.bezierCurveTo(-0.84, 1.91, -0.72, 2.12, -0.58, 2.23);
  hood_profile.bezierCurveTo(-0.40, 2.34, -0.16, 2.37, 0.08, 2.37);
  hood_profile.lineTo(0.58, 2.34);
  hood_profile.bezierCurveTo(0.73, 2.31, 0.83, 2.14, 0.88, 1.93);
  hood_profile.lineTo(0.88, 1.47);
  hood_profile.closePath();

  const hood_shell_geom = new THREE.ExtrudeGeometry(hood_profile, {
    depth: 2.34,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const hood_shell = new THREE.Mesh(
    hood_shell_geom,
    brushed_stainless_mat
  );
  hood_shell.rotation.y = Math.PI / 2;
  hood_shell.position.x = -1.17;
  hood_shell.name = "hood_shell";
  root.add(hood_shell);

  const hood_side_panel_shape = new THREE.Shape();
  hood_side_panel_shape.moveTo(-0.85, 1.50);
  hood_side_panel_shape.lineTo(-0.85, 1.77);
  hood_side_panel_shape.bezierCurveTo(
    -0.81,
    1.90,
    -0.69,
    2.10,
    -0.55,
    2.20
  );
  hood_side_panel_shape.bezierCurveTo(
    -0.37,
    2.30,
    -0.14,
    2.33,
    0.08,
    2.33
  );
  hood_side_panel_shape.lineTo(0.56, 2.30);
  hood_side_panel_shape.bezierCurveTo(
    0.70,
    2.27,
    0.80,
    2.11,
    0.85,
    1.91
  );
  hood_side_panel_shape.lineTo(0.85, 1.50);
  hood_side_panel_shape.closePath();

  const hood_side_panels_geom = new THREE.ShapeGeometry(
    hood_side_panel_shape
  );
  const hood_side_panels = new THREE.InstancedMesh(
    hood_side_panels_geom,
    brushed_stainless_mat,
    2
  );
  const hood_side_panel_matrix = new THREE.Matrix4();
  hood_side_panel_matrix.makeRotationY(Math.PI / 2);
  hood_side_panel_matrix.setPosition(-1.205, 0, 0);
  hood_side_panels.setMatrixAt(0, hood_side_panel_matrix);
  hood_side_panel_matrix.makeRotationY(-Math.PI / 2);
  hood_side_panel_matrix.setPosition(1.205, 0, 0);
  hood_side_panels.setMatrixAt(1, hood_side_panel_matrix);
  hood_side_panels.instanceMatrix.needsUpdate = true;
  hood_side_panels.name = "hood_side_panels";
  root.add(hood_side_panels);

  const hood_rolled_edges_geom = new THREE.CylinderGeometry(
    0.042,
    0.042,
    2.36,
    16
  );
  const hood_rolled_edges = new THREE.InstancedMesh(
    hood_rolled_edges_geom,
    polished_metal_mat,
    2
  );
  const hood_rolled_edge_matrix = new THREE.Matrix4();
  hood_rolled_edge_matrix.makeRotationZ(Math.PI / 2);
  hood_rolled_edge_matrix.setPosition(0, 1.50, 0.88);
  hood_rolled_edges.setMatrixAt(0, hood_rolled_edge_matrix);
  hood_rolled_edge_matrix.makeRotationZ(Math.PI / 2);
  hood_rolled_edge_matrix.setPosition(0, 1.50, -0.88);
  hood_rolled_edges.setMatrixAt(1, hood_rolled_edge_matrix);
  hood_rolled_edges.instanceMatrix.needsUpdate = true;
  hood_rolled_edges.name = "hood_rolled_edges";
  root.add(hood_rolled_edges);

  const lid_latch_geom = new THREE.BoxGeometry(0.34, 0.045, 0.13);
  const lid_latch = new THREE.Mesh(lid_latch_geom, polished_metal_mat);
  lid_latch.position.set(-0.72, 1.515, 0.91);
  lid_latch.name = "lid_latch";
  root.add(lid_latch);

  const lid_hinge_geom = new THREE.BoxGeometry(0.30, 0.055, 0.10);
  const lid_hinge = new THREE.Mesh(lid_hinge_geom, dark_metal_mat);
  lid_hinge.position.set(0.76, 1.515, 0.89);
  lid_hinge.name = "lid_hinge";
  root.add(lid_hinge);

  const thermometer_backplate_geom = new THREE.CylinderGeometry(
    0.155,
    0.155,
    0.050,
    32
  );
  const thermometer_backplate = new THREE.Mesh(
    thermometer_backplate_geom,
    polished_metal_mat
  );
  thermometer_backplate.rotation.x = Math.PI / 2;
  thermometer_backplate.position.set(0.24, 1.94, 0.925);
  thermometer_backplate.name = "thermometer_backplate";
  root.add(thermometer_backplate);

  const thermometer_bezel_geom = new THREE.TorusGeometry(
    0.125,
    0.018,
    10,
    32
  );
  const thermometer_bezel = new THREE.Mesh(
    thermometer_bezel_geom,
    polished_metal_mat
  );
  thermometer_bezel.position.set(0.24, 1.94, 0.962);
  thermometer_bezel.name = "thermometer_bezel";
  root.add(thermometer_bezel);

  const thermometer_face_geom = new THREE.CylinderGeometry(
    0.112,
    0.112,
    0.055,
    32
  );
  const thermometer_face = new THREE.Mesh(
    thermometer_face_geom,
    silver_metal_mat
  );
  thermometer_face.rotation.x = Math.PI / 2;
  thermometer_face.position.set(0.24, 1.94, 0.978);
  thermometer_face.name = "thermometer_face";
  root.add(thermometer_face);

  const thermometer_pointer_geom = new THREE.BoxGeometry(
    0.012,
    0.072,
    0.009
  );
  const thermometer_pointer = new THREE.Mesh(
    thermometer_pointer_geom,
    dark_metal_mat
  );
  thermometer_pointer.position.set(0.24, 1.965, 1.010);
  thermometer_pointer.rotation.z = -0.45;
  thermometer_pointer.name = "thermometer_pointer";
  root.add(thermometer_pointer);

  const front_handle_path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.76, 1.22, 0.85),
      new THREE.Vector3(-0.73, 1.11, 0.98),
      new THREE.Vector3(-0.58, 1.04, 1.04),
      new THREE.Vector3(0.00, 1.00, 1.07),
      new THREE.Vector3(0.58, 1.04, 1.04),
      new THREE.Vector3(0.73, 1.11, 0.98),
      new THREE.Vector3(0.76, 1.22, 0.85),
    ],
    false,
    "centripetal"
  );
  const front_handle_geom = new THREE.TubeGeometry(
    front_handle_path,
    48,
    0.045,
    12,
    false
  );
  const front_handle = new THREE.Mesh(
    front_handle_geom,
    polished_metal_mat
  );
  front_handle.name = "front_handle";
  root.add(front_handle);

  const handle_mounts_geom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.11,
    20
  );
  const handle_mounts = new THREE.InstancedMesh(
    handle_mounts_geom,
    polished_metal_mat,
    2
  );
  const handle_mount_matrix = new THREE.Matrix4();
  handle_mount_matrix.makeRotationX(Math.PI / 2);
  handle_mount_matrix.setPosition(-0.76, 1.22, 0.855);
  handle_mounts.setMatrixAt(0, handle_mount_matrix);
  handle_mount_matrix.makeRotationX(Math.PI / 2);
  handle_mount_matrix.setPosition(0.76, 1.22, 0.855);
  handle_mounts.setMatrixAt(1, handle_mount_matrix);
  handle_mounts.instanceMatrix.needsUpdate = true;
  handle_mounts.name = "handle_mounts";
  root.add(handle_mounts);

  const side_vent_slots_geom = new THREE.CapsuleGeometry(
    0.025,
    0.11,
    5,
    10
  );
  const side_vent_slots = new THREE.InstancedMesh(
    side_vent_slots_geom,
    rubber_mat,
    2
  );
  const side_vent_matrix = new THREE.Matrix4();
  side_vent_matrix.makeTranslation(-1.225, 1.69, 0.30);
  side_vent_slots.setMatrixAt(0, side_vent_matrix);
  side_vent_matrix.makeTranslation(1.225, 1.69, 0.30);
  side_vent_slots.setMatrixAt(1, side_vent_matrix);
  side_vent_slots.instanceMatrix.needsUpdate = true;
  side_vent_slots.name = "side_vent_slots";
  root.add(side_vent_slots);

  const ash_handle_path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-1.225, 1.03, -0.25),
      new THREE.Vector3(-1.31, 0.98, -0.20),
      new THREE.Vector3(-1.34, 0.88, -0.12),
      new THREE.Vector3(-1.34, 0.78, 0.00),
      new THREE.Vector3(-1.31, 0.70, 0.13),
      new THREE.Vector3(-1.225, 0.66, 0.22),
    ],
    false,
    "centripetal"
  );
  const ash_handle_geom = new THREE.TubeGeometry(
    ash_handle_path,
    28,
    0.032,
    10,
    false
  );
  const ash_handle = new THREE.Mesh(
    ash_handle_geom,
    polished_metal_mat
  );
  ash_handle.name = "ash_handle";
  root.add(ash_handle);

  const panel_bolts_geom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.025,
    16
  );
  const panel_bolts = new THREE.InstancedMesh(
    panel_bolts_geom,
    silver_metal_mat,
    6
  );
  const panel_bolt_positions = [
    [-1.00, 1.25, 0.895],
    [1.00, 1.25, 0.895],
    [-0.84, 0.72, 0.805],
    [0.84, 0.72, 0.805],
    [-1.10, 1.52, 0.79],
    [1.10, 1.52, 0.79],
  ];
  const panel_bolt_matrix = new THREE.Matrix4();
  for (let i = 0; i < panel_bolt_positions.length; i++) {
    const position = panel_bolt_positions[i];
    panel_bolt_matrix.makeRotationX(Math.PI / 2);
    panel_bolt_matrix.setPosition(position[0], position[1], position[2]);
    panel_bolts.setMatrixAt(i, panel_bolt_matrix);
  }
  panel_bolts.instanceMatrix.needsUpdate = true;
  panel_bolts.name = "panel_bolts";
  root.add(panel_bolts);

  const leg_endpoints = [
    [
      new THREE.Vector3(-0.94, 0.73, 0.54),
      new THREE.Vector3(-1.24, -0.50, 0.82),
    ],
    [
      new THREE.Vector3(0.94, 0.73, 0.54),
      new THREE.Vector3(1.24, -0.50, 0.82),
    ],
    [
      new THREE.Vector3(-0.94, 0.73, -0.54),
      new THREE.Vector3(-1.24, -0.50, -0.82),
    ],
    [
      new THREE.Vector3(0.94, 0.73, -0.54),
      new THREE.Vector3(1.24, -0.50, -0.82),
    ],
  ];

  const legs_geom = new THREE.CylinderGeometry(0.075, 0.055, 1, 20);
  const legs = new THREE.InstancedMesh(
    legs_geom,
    polished_metal_mat,
    4
  );
  for (let i = 0; i < leg_endpoints.length; i++) {
    const top = leg_endpoints[i][0];
    const bottom = leg_endpoints[i][1];
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const length = direction.length();
    const midpoint = new THREE.Vector3()
      .copy(top)
      .add(bottom)
      .multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    const matrix = new THREE.Matrix4();
    matrix.compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    legs.setMatrixAt(i, matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  legs.name = "legs";
  root.add(legs);

  const leg_mounts_geom = new THREE.CylinderGeometry(
    0.095,
    0.085,
    0.16,
    20
  );
  const leg_mounts = new THREE.InstancedMesh(
    leg_mounts_geom,
    brushed_stainless_mat,
    4
  );
  const leg_mount_matrix = new THREE.Matrix4();
  for (let i = 0; i < leg_endpoints.length; i++) {
    const top = leg_endpoints[i][0];
    leg_mount_matrix.makeTranslation(top.x, top.y - 0.04, top.z);
    leg_mounts.setMatrixAt(i, leg_mount_matrix);
  }
  leg_mounts.instanceMatrix.needsUpdate = true;
  leg_mounts.name = "leg_mounts";
  root.add(leg_mounts);

  const foot_caps_geom = new THREE.CylinderGeometry(
    0.061,
    0.061,
    0.055,
    20
  );
  const foot_caps = new THREE.InstancedMesh(
    foot_caps_geom,
    rubber_mat,
    4
  );
  const foot_cap_matrix = new THREE.Matrix4();
  for (let i = 0; i < leg_endpoints.length; i++) {
    const bottom = leg_endpoints[i][1];
    const direction = new THREE.Vector3()
      .subVectors(leg_endpoints[i][0], bottom)
      .normalize();
    const position = new THREE.Vector3()
      .copy(bottom)
      .addScaledVector(direction, 0.018);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
    foot_cap_matrix.compose(
      position,
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    foot_caps.setMatrixAt(i, foot_cap_matrix);
  }
  foot_caps.instanceMatrix.needsUpdate = true;
  foot_caps.name = "foot_caps";
  root.add(foot_caps);

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