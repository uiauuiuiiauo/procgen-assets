export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vertical_uv_lamp";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const column_assembly = new THREE.Group();
  column_assembly.name = "column_assembly";
  root.add(column_assembly);

  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  root.add(top_assembly);

  const cable_assembly = new THREE.Group();
  cable_assembly.name = "cable_assembly";
  root.add(cable_assembly);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x6688ad,
    metalness: 0.6,
    roughness: 0.5
  });
  const dark_blue_metalMat = new THREE.MeshStandardMaterial({
    color: 0x355575,
    metalness: 0.6,
    roughness: 0.5
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x101820,
    metalness: 0.0,
    roughness: 0.8
  });
  const dark_recessMat = new THREE.MeshStandardMaterial({
    color: 0x182028,
    metalness: 0.0,
    roughness: 0.8
  });
  const uv_tubeMat = new THREE.MeshStandardMaterial({
    color: 0x8effff,
    emissive: 0x8effff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3
  });
  const uv_coreMat = new THREE.MeshStandardMaterial({
    color: 0xeaffff,
    emissive: 0xeaffff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3
  });

  const up_axis = new THREE.Vector3(0, 1, 0);

  function placeCylinder(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(up_axis, direction.normalize());
    mesh.scale.set(1, length, 1);
  }

  const base_footGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.026, 48);
  const base_foot = new THREE.Mesh(base_footGeom, dark_blue_metalMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.013;
  base_assembly.add(base_foot);

  const base_trim_ringGeom = new THREE.TorusGeometry(0.177, 0.007, 8, 40);
  const base_trim_ring = new THREE.Mesh(base_trim_ringGeom, silverMat);
  base_trim_ring.name = "base_trim_ring";
  base_trim_ring.rotation.x = Math.PI / 2;
  base_trim_ring.position.y = 0.029;
  base_assembly.add(base_trim_ring);

  const base_housingGeom = new THREE.CylinderGeometry(0.158, 0.166, 0.30, 40);
  const base_housing = new THREE.Mesh(base_housingGeom, bodyMat);
  base_housing.name = "base_housing";
  base_housing.position.y = 0.178;
  base_assembly.add(base_housing);

  const base_top_collarGeom = new THREE.CylinderGeometry(0.151, 0.158, 0.055, 40);
  const base_top_collar = new THREE.Mesh(base_top_collarGeom, dark_blue_metalMat);
  base_top_collar.name = "base_top_collar";
  base_top_collar.position.y = 0.342;
  base_assembly.add(base_top_collar);

  const main_columnGeom = new THREE.CylinderGeometry(0.098, 0.106, 1.91, 40);
  const main_column = new THREE.Mesh(main_columnGeom, bodyMat);
  main_column.name = "main_column";
  main_column.position.y = 1.295;
  column_assembly.add(main_column);

  const column_bottom_seamGeom = new THREE.TorusGeometry(0.104, 0.005, 8, 36);
  const column_bottom_seam = new THREE.Mesh(column_bottom_seamGeom, dark_blue_metalMat);
  column_bottom_seam.name = "column_bottom_seam";
  column_bottom_seam.rotation.x = Math.PI / 2;
  column_bottom_seam.position.y = 0.354;
  column_assembly.add(column_bottom_seam);

  const upper_body_bandGeom = new THREE.CylinderGeometry(0.108, 0.101, 0.075, 36);
  const upper_body_band = new THREE.Mesh(upper_body_bandGeom, dark_blue_metalMat);
  upper_body_band.name = "upper_body_band";
  upper_body_band.position.y = 2.225;
  column_assembly.add(upper_body_band);

  const lower_lamp_socketGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.075, 28);
  const lower_lamp_socket = new THREE.Mesh(lower_lamp_socketGeom, dark_blue_metalMat);
  lower_lamp_socket.name = "lower_lamp_socket";
  lower_lamp_socket.rotation.x = Math.PI / 2;
  lower_lamp_socket.position.set(0.14, 0.39, 0.105);
  column_assembly.add(lower_lamp_socket);

  const upper_lamp_socketGeom = new THREE.CylinderGeometry(0.048, 0.048, 0.085, 28);
  const upper_lamp_socket = new THREE.Mesh(upper_lamp_socketGeom, dark_blue_metalMat);
  upper_lamp_socket.name = "upper_lamp_socket";
  upper_lamp_socket.rotation.x = Math.PI / 2;
  upper_lamp_socket.position.set(0.14, 2.39, 0.105);
  top_assembly.add(upper_lamp_socket);

  const lamp_glow_shellGeom = new THREE.CapsuleGeometry(0.055, 1.94, 8, 20);
  const lamp_glow_shell = new THREE.Mesh(lamp_glow_shellGeom, uv_tubeMat);
  lamp_glow_shell.name = "lamp_glow_shell";
  lamp_glow_shell.position.set(0.14, 1.39, 0.14);
  column_assembly.add(lamp_glow_shell);

  const lamp_coreGeom = new THREE.CapsuleGeometry(0.031, 1.984, 8, 18);
  const lamp_core = new THREE.Mesh(lamp_coreGeom, uv_coreMat);
  lamp_core.name = "lamp_core";
  lamp_core.position.set(0.14, 1.39, 0.169);
  column_assembly.add(lamp_core);

  const top_housingGeom = new THREE.CylinderGeometry(0.126, 0.132, 0.31, 40);
  const top_housing = new THREE.Mesh(top_housingGeom, bodyMat);
  top_housing.name = "top_housing";
  top_housing.position.set(0, 2.425, 0);
  top_assembly.add(top_housing);

  const top_housing_capGeom = new THREE.CylinderGeometry(0.126, 0.126, 0.025, 40);
  const top_housing_cap = new THREE.Mesh(top_housing_capGeom, dark_blue_metalMat);
  top_housing_cap.name = "top_housing_cap";
  top_housing_cap.position.y = 2.5825;
  top_assembly.add(top_housing_cap);

  const top_side_tabGeom = new THREE.CylinderGeometry(0.029, 0.029, 0.055, 20);
  const top_side_tab = new THREE.Mesh(top_side_tabGeom, dark_blue_metalMat);
  top_side_tab.name = "top_side_tab";
  top_side_tab.rotation.z = Math.PI / 2;
  top_side_tab.position.set(-0.145, 2.43, 0);
  top_assembly.add(top_side_tab);

  const top_front_screwGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.009, 16);
  const top_front_screw = new THREE.Mesh(top_front_screwGeom, silverMat);
  top_front_screw.name = "top_front_screw";
  top_front_screw.rotation.x = Math.PI / 2;
  top_front_screw.position.set(0.035, 2.445, 0.13);
  top_assembly.add(top_front_screw);

  const top_screw_centerGeom = new THREE.CircleGeometry(0.0035, 12);
  const top_screw_center = new THREE.Mesh(top_screw_centerGeom, dark_recessMat);
  top_screw_center.name = "top_screw_center";
  top_screw_center.position.set(0.035, 2.445, 0.136);
  top_assembly.add(top_screw_center);

  const column_screw_outerGeom = new THREE.CylinderGeometry(0.021, 0.021, 0.012, 20);
  const column_screw_outer = new THREE.Mesh(column_screw_outerGeom, silverMat);
  column_screw_outer.name = "column_screw_outer";
  column_screw_outer.rotation.x = Math.PI / 2;
  column_screw_outer.position.set(0.018, 1.02, 0.105);
  column_assembly.add(column_screw_outer);

  const column_screw_centerGeom = new THREE.CircleGeometry(0.006, 14);
  const column_screw_center = new THREE.Mesh(column_screw_centerGeom, dark_recessMat);
  column_screw_center.name = "column_screw_center";
  column_screw_center.position.set(0.018, 1.02, 0.113);
  column_assembly.add(column_screw_center);

  const column_screw_slotGeom = new THREE.BoxGeometry(0.011, 0.0025, 0.003);
  const column_screw_slot = new THREE.Mesh(column_screw_slotGeom, silverMat);
  column_screw_slot.name = "column_screw_slot";
  column_screw_slot.position.set(0.018, 1.02, 0.116);
  column_assembly.add(column_screw_slot);

  const carry_handle_points = [
    new THREE.Vector3(-0.075, 2.585, -0.025),
    new THREE.Vector3(-0.087, 2.68, -0.025),
    new THREE.Vector3(-0.055, 2.755, -0.025),
    new THREE.Vector3(0, 2.785, -0.025),
    new THREE.Vector3(0.055, 2.755, -0.025),
    new THREE.Vector3(0.087, 2.68, -0.025),
    new THREE.Vector3(0.075, 2.585, -0.025)
  ];
  const carry_handleCurve = new THREE.CatmullRomCurve3(
    carry_handle_points,
    false,
    "centripetal"
  );
  const carry_handleGeom = new THREE.TubeGeometry(
    carry_handleCurve,
    36,
    0.012,
    8,
    false
  );
  const carry_handle = new THREE.Mesh(carry_handleGeom, rubberMat);
  carry_handle.name = "carry_handle";
  top_assembly.add(carry_handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.018, 16, 10);
  const left_handle_mount = new THREE.Mesh(handle_mountGeom, rubberMat);
  left_handle_mount.name = "left_handle_mount";
  left_handle_mount.position.set(-0.075, 2.585, -0.025);
  top_assembly.add(left_handle_mount);

  const right_handle_mount = new THREE.Mesh(handle_mountGeom, rubberMat);
  right_handle_mount.name = "right_handle_mount";
  right_handle_mount.position.set(0.075, 2.585, -0.025);
  top_assembly.add(right_handle_mount);

  const power_cable_points = [
    new THREE.Vector3(-0.025, 2.27, 0.125),
    new THREE.Vector3(-0.045, 2.12, 0.13),
    new THREE.Vector3(-0.083, 1.88, 0.13),
    new THREE.Vector3(-0.071, 1.62, 0.13),
    new THREE.Vector3(-0.105, 1.30, 0.13),
    new THREE.Vector3(-0.075, 0.96, 0.13),
    new THREE.Vector3(-0.105, 0.66, 0.13),
    new THREE.Vector3(-0.09, 0.39, 0.13)
  ];
  const power_cableCurve = new THREE.CatmullRomCurve3(
    power_cable_points,
    false,
    "centripetal"
  );
  const power_cableGeom = new THREE.TubeGeometry(
    power_cableCurve,
    56,
    0.009,
    8,
    false
  );
  const power_cable = new THREE.Mesh(power_cableGeom, rubberMat);
  power_cable.name = "power_cable";
  cable_assembly.add(power_cable);

  const cable_clampGeom = new THREE.CylinderGeometry(0.017, 0.017, 1, 14);
  const cable_clamp = new THREE.Mesh(cable_clampGeom, silverMat);
  cable_clamp.name = "cable_clamp";
  placeCylinder(
    cable_clamp,
    new THREE.Vector3(-0.087, 1.755, 0.119),
    new THREE.Vector3(-0.087, 1.785, 0.119)
  );
  cable_assembly.add(cable_clamp);

  const cable_strain_reliefGeom = new THREE.CylinderGeometry(0.018, 0.021, 1, 16);
  const cable_strain_relief = new THREE.Mesh(cable_strain_reliefGeom, rubberMat);
  cable_strain_relief.name = "cable_strain_relief";
  placeCylinder(
    cable_strain_relief,
    new THREE.Vector3(-0.045, 0.365, 0.125),
    new THREE.Vector3(-0.015, 0.335, 0.16)
  );
  cable_assembly.add(cable_strain_relief);

  const power_plugGeom = new THREE.BoxGeometry(0.075, 0.07, 0.065);
  const power_plug = new THREE.Mesh(power_plugGeom, rubberMat);
  power_plug.name = "power_plug";
  power_plug.position.set(0.18, 0.30, 0.075);
  base_assembly.add(power_plug);

  const power_cord_points = [
    new THREE.Vector3(0.205, 0.30, 0.075),
    new THREE.Vector3(0.275, 0.275, 0.07),
    new THREE.Vector3(0.36, 0.17, 0.065),
    new THREE.Vector3(0.49, 0.065, 0.06),
    new THREE.Vector3(0.70, 0.032, 0.055),
    new THREE.Vector3(0.96, 0.027, 0.07),
    new THREE.Vector3(1.25, 0.026, 0.105),
    new THREE.Vector3(1.55, 0.026, 0.145)
  ];
  const power_cordCurve = new THREE.CatmullRomCurve3(
    power_cord_points,
    false,
    "centripetal"
  );
  const power_cordGeom = new THREE.TubeGeometry(
    power_cordCurve,
    64,
    0.012,
    8,
    false
  );
  const power_cord = new THREE.Mesh(power_cordGeom, rubberMat);
  power_cord.name = "power_cord";
  cable_assembly.add(power_cord);

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