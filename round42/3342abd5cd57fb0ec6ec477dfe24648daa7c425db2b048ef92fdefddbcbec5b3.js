export default function generate(THREE) {
  const wheel = new THREE.Group();
  wheel.name = "bicycle_wheel";

  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const spokeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8,
  });

  const tireGeom = new THREE.TorusGeometry(1.54, 0.11, 20, 128);
  const tire = new THREE.Mesh(tireGeom, tireMat);
  tire.name = "tire";
  wheel.add(tire);

  const rim_bandGeom = new THREE.TorusGeometry(1.405, 0.055, 14, 128);
  const rim_band = new THREE.Mesh(rim_bandGeom, rimMat);
  rim_band.name = "rim_band";
  wheel.add(rim_band);

  const rim_surfaceGeom = new THREE.RingGeometry(1.34, 1.47, 128);
  const front_rim_surface = new THREE.Mesh(rim_surfaceGeom, rimMat);
  front_rim_surface.name = "front_rim_surface";
  front_rim_surface.position.z = 0.058;
  wheel.add(front_rim_surface);

  const rear_rim_surface = new THREE.Mesh(rim_surfaceGeom, rimMat);
  rear_rim_surface.name = "rear_rim_surface";
  rear_rim_surface.position.z = -0.058;
  wheel.add(rear_rim_surface);

  const outer_rim_lipGeom = new THREE.TorusGeometry(1.46, 0.018, 10, 128);
  const outer_rim_lip = new THREE.Mesh(outer_rim_lipGeom, hubMat);
  outer_rim_lip.name = "outer_rim_lip";
  outer_rim_lip.position.z = 0.056;
  wheel.add(outer_rim_lip);

  const inner_rim_lipGeom = new THREE.TorusGeometry(1.345, 0.017, 10, 128);
  const inner_rim_lip = new THREE.Mesh(inner_rim_lipGeom, hubMat);
  inner_rim_lip.name = "inner_rim_lip";
  inner_rim_lip.position.z = 0.057;
  wheel.add(inner_rim_lip);

  const hub_profile = [
    new THREE.Vector2(0.00, -0.24),
    new THREE.Vector2(0.07, -0.24),
    new THREE.Vector2(0.105, -0.205),
    new THREE.Vector2(0.12, -0.14),
    new THREE.Vector2(0.12, -0.08),
    new THREE.Vector2(0.19, -0.045),
    new THREE.Vector2(0.20, 0.00),
    new THREE.Vector2(0.19, 0.045),
    new THREE.Vector2(0.12, 0.08),
    new THREE.Vector2(0.12, 0.14),
    new THREE.Vector2(0.105, 0.205),
    new THREE.Vector2(0.07, 0.24),
    new THREE.Vector2(0.00, 0.24),
  ];
  const hub_shellGeom = new THREE.LatheGeometry(hub_profile, 48);
  const hub_shell = new THREE.Mesh(hub_shellGeom, hubMat);
  hub_shell.name = "hub_shell";
  hub_shell.rotation.x = Math.PI / 2;
  wheel.add(hub_shell);

  const hub_flangeGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.052, 40);
  const front_hub_flange = new THREE.Mesh(hub_flangeGeom, hubMat);
  front_hub_flange.name = "front_hub_flange";
  front_hub_flange.rotation.x = Math.PI / 2;
  front_hub_flange.position.z = 0.095;
  wheel.add(front_hub_flange);

  const rear_hub_flange = new THREE.Mesh(hub_flangeGeom, hubMat);
  rear_hub_flange.name = "rear_hub_flange";
  rear_hub_flange.rotation.x = Math.PI / 2;
  rear_hub_flange.position.z = -0.095;
  wheel.add(rear_hub_flange);

  const axleGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.66, 24);
  const axle = new THREE.Mesh(axleGeom, hardwareMat);
  axle.name = "axle";
  axle.rotation.x = Math.PI / 2;
  wheel.add(axle);

  const axle_sleeveGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.15, 24);
  const axle_sleeve = new THREE.Mesh(axle_sleeveGeom, hubMat);
  axle_sleeve.name = "axle_sleeve";
  axle_sleeve.rotation.x = Math.PI / 2;
  axle_sleeve.position.z = 0.22;
  wheel.add(axle_sleeve);

  const front_bearingGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.045, 32);
  const front_bearing = new THREE.Mesh(front_bearingGeom, hubMat);
  front_bearing.name = "front_bearing";
  front_bearing.rotation.x = Math.PI / 2;
  front_bearing.position.z = 0.295;
  wheel.add(front_bearing);

  const front_axle_endGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.085, 24);
  const front_axle_end = new THREE.Mesh(front_axle_endGeom, hardwareMat);
  front_axle_end.name = "front_axle_end";
  front_axle_end.rotation.x = Math.PI / 2;
  front_axle_end.position.z = 0.345;
  wheel.add(front_axle_end);

  const front_axle_openingGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.009, 20);
  const front_axle_opening = new THREE.Mesh(front_axle_openingGeom, darkMat);
  front_axle_opening.name = "front_axle_opening";
  front_axle_opening.rotation.x = Math.PI / 2;
  front_axle_opening.position.z = 0.391;
  wheel.add(front_axle_opening);

  const rear_bearingGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.04, 28);
  const rear_bearing = new THREE.Mesh(rear_bearingGeom, hubMat);
  rear_bearing.name = "rear_bearing";
  rear_bearing.rotation.x = Math.PI / 2;
  rear_bearing.position.z = -0.255;
  wheel.add(rear_bearing);

  const rear_axle_endGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.07, 20);
  const rear_axle_end = new THREE.Mesh(rear_axle_endGeom, hardwareMat);
  rear_axle_end.name = "rear_axle_end";
  rear_axle_end.rotation.x = Math.PI / 2;
  rear_axle_end.position.z = -0.3;
  wheel.add(rear_axle_end);

  const hub_lockringGeom = new THREE.TorusGeometry(0.076, 0.012, 8, 32);
  const hub_lockring = new THREE.Mesh(hub_lockringGeom, hardwareMat);
  hub_lockring.name = "hub_lockring";
  hub_lockring.position.z = 0.316;
  wheel.add(hub_lockring);

  const spoke_count = 32;
  const spokeGeom = new THREE.CylinderGeometry(1, 1, 1, 6, 1, false);
  const spokes = new THREE.InstancedMesh(spokeGeom, spokeMat, spoke_count);
  spokes.name = "spokes";
  spokes.frustumCulled = false;

  const spoke_nippleGeom = new THREE.CylinderGeometry(1, 1, 1, 8, 1, false);
  const spoke_nipples = new THREE.InstancedMesh(
    spoke_nippleGeom,
    hardwareMat,
    spoke_count
  );
  spoke_nipples.name = "spoke_nipples";
  spoke_nipples.frustumCulled = false;

  const spoke_headGeom = new THREE.CylinderGeometry(1, 1, 1, 8, 1, false);
  const spoke_heads = new THREE.InstancedMesh(
    spoke_headGeom,
    hardwareMat,
    spoke_count
  );
  spoke_heads.name = "spoke_heads";
  spoke_heads.frustumCulled = false;

  const y_axis = new THREE.Vector3(0, 1, 0);
  const spoke_matrix = new THREE.Matrix4();
  const nipple_matrix = new THREE.Matrix4();
  const head_matrix = new THREE.Matrix4();

  function set_cylinder_instance(matrix, start, end, radius) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      y_axis,
      direction.normalize()
    );
    matrix.compose(
      midpoint,
      quaternion,
      new THREE.Vector3(radius, length, radius)
    );
  }

  for (let i = 0; i < spoke_count; i++) {
    const rim_angle = (i / spoke_count) * Math.PI * 2;
    const side = i % 2 === 0 ? 1 : -1;
    const lacing_sign = Math.floor(i / 2) % 2 === 0 ? 1 : -1;
    const flange_angle = rim_angle + lacing_sign * 0.58;

    const spoke_start = new THREE.Vector3(
      Math.cos(flange_angle) * 0.18,
      Math.sin(flange_angle) * 0.18,
      side * 0.122
    );
    const spoke_end = new THREE.Vector3(
      Math.cos(rim_angle) * 1.322,
      Math.sin(rim_angle) * 1.322,
      side * 0.068
    );
    set_cylinder_instance(spoke_matrix, spoke_start, spoke_end, 0.008);
    spokes.setMatrixAt(i, spoke_matrix);

    const nipple_start = new THREE.Vector3(
      Math.cos(rim_angle) * 1.285,
      Math.sin(rim_angle) * 1.285,
      side * 0.066
    );
    const nipple_end = new THREE.Vector3(
      Math.cos(rim_angle) * 1.355,
      Math.sin(rim_angle) * 1.355,
      side * 0.064
    );
    set_cylinder_instance(nipple_matrix, nipple_start, nipple_end, 0.017);
    spoke_nipples.setMatrixAt(i, nipple_matrix);

    const head_start = new THREE.Vector3(
      Math.cos(flange_angle) * 0.145,
      Math.sin(flange_angle) * 0.145,
      side * 0.132
    );
    const head_end = new THREE.Vector3(
      Math.cos(flange_angle) * 0.205,
      Math.sin(flange_angle) * 0.205,
      side * 0.132
    );
    set_cylinder_instance(head_matrix, head_start, head_end, 0.014);
    spoke_heads.setMatrixAt(i, head_matrix);
  }

  spokes.instanceMatrix.needsUpdate = true;
  spoke_nipples.instanceMatrix.needsUpdate = true;
  spoke_heads.instanceMatrix.needsUpdate = true;
  wheel.add(spokes, spoke_nipples, spoke_heads);

  const valve_angle = Math.PI * 0.86;
  const valve_direction = new THREE.Vector3(
    -Math.sin(valve_angle),
    Math.cos(valve_angle),
    0.025
  ).normalize();

  const valve_base_position = new THREE.Vector3(
    Math.cos(valve_angle) * 1.36,
    Math.sin(valve_angle) * 1.36,
    0.075
  );
  const valve_baseGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.055, 12);
  const valve_base = new THREE.Mesh(valve_baseGeom, hardwareMat);
  valve_base.name = "valve_base";
  valve_base.position.copy(valve_base_position);
  valve_base.quaternion.setFromUnitVectors(y_axis, valve_direction);
  wheel.add(valve_base);

  const valve_cap_position = valve_base_position
    .clone()
    .add(valve_direction.clone().multiplyScalar(0.075));
  const valve_capGeom = new THREE.CylinderGeometry(0.034, 0.03, 0.045, 12);
  const valve_cap = new THREE.Mesh(valve_capGeom, darkMat);
  valve_cap.name = "valve_cap";
  valve_cap.position.copy(valve_cap_position);
  valve_cap.quaternion.setFromUnitVectors(y_axis, valve_direction);
  wheel.add(valve_cap);

  fitToUnitCube(wheel);
  return wheel;

  function fitToUnitCube(root) {
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
}