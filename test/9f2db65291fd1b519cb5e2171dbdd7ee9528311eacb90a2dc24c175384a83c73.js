export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_lantern";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const enclosure_group = new THREE.Group();
  enclosure_group.name = "enclosure_group";
  const roof_group = new THREE.Group();
  roof_group.name = "roof_group";
  const top_group = new THREE.Group();
  top_group.name = "top_group";
  const light_group = new THREE.Group();
  light_group.name = "light_group";

  root.add(base_group, light_group, enclosure_group, roof_group, top_group);

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x2b2722,
    metalness: 0.5,
    roughness: 0.5
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x252321,
    metalness: 0.45,
    roughness: 0.55
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x171615,
    metalness: 0.5,
    roughness: 0.45
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x80603a,
    metalness: 0.5,
    roughness: 0.45
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8ddd0,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const holeMat = new THREE.MeshBasicMaterial({
    color: 0x030303,
    side: THREE.DoubleSide
  });
  const flameMat = new THREE.MeshStandardMaterial({
    color: 0xffe8a0,
    emissive: 0xffe8a0,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.84,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const flameCoreMat = new THREE.MeshStandardMaterial({
    color: 0xfff9e8,
    emissive: 0xfff9e8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.4
  });
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffc766,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const base_plinthProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.56, 0.00),
    new THREE.Vector2(0.64, 0.018),
    new THREE.Vector2(0.69, 0.055),
    new THREE.Vector2(0.70, 0.090),
    new THREE.Vector2(0.67, 0.125),
    new THREE.Vector2(0.60, 0.155),
    new THREE.Vector2(0.56, 0.185),
    new THREE.Vector2(0.55, 0.225),
    new THREE.Vector2(0.55, 0.315),
    new THREE.Vector2(0.52, 0.365),
    new THREE.Vector2(0.45, 0.400),
    new THREE.Vector2(0.00, 0.400)
  ];
  const base_plinthGeom = new THREE.LatheGeometry(base_plinthProfile, 48);
  const base_plinth = new THREE.Mesh(base_plinthGeom, frameMat);
  base_plinth.name = "base_plinth";
  base_group.add(base_plinth);

  const base_lower_trimGeom = new THREE.TorusGeometry(0.655, 0.018, 10, 48);
  const base_lower_trim = new THREE.Mesh(base_lower_trimGeom, edgeMat);
  base_lower_trim.name = "base_lower_trim";
  base_lower_trim.rotation.x = Math.PI / 2;
  base_lower_trim.position.y = 0.070;
  base_group.add(base_lower_trim);

  const base_upper_trimGeom = new THREE.TorusGeometry(0.525, 0.017, 10, 48);
  const base_upper_trim = new THREE.Mesh(base_upper_trimGeom, edgeMat);
  base_upper_trim.name = "base_upper_trim";
  base_upper_trim.rotation.x = Math.PI / 2;
  base_upper_trim.position.y = 0.345;
  base_group.add(base_upper_trim);

  const lower_collarGeom = new THREE.CylinderGeometry(0.50, 0.52, 0.10, 8);
  const lower_collar = new THREE.Mesh(lower_collarGeom, frameMat);
  lower_collar.name = "lower_collar";
  lower_collar.position.y = 0.43;
  base_group.add(lower_collar);

  const lower_collar_trimGeom = new THREE.TorusGeometry(0.485, 0.016, 8, 32);
  const lower_collar_trim = new THREE.Mesh(lower_collar_trimGeom, edgeMat);
  lower_collar_trim.name = "lower_collar_trim";
  lower_collar_trim.rotation.x = Math.PI / 2;
  lower_collar_trim.position.y = 0.475;
  base_group.add(lower_collar_trim);

  const floor_plateGeom = new THREE.BoxGeometry(0.82, 0.055, 0.70);
  const floor_plate = new THREE.Mesh(floor_plateGeom, frameMat);
  floor_plate.name = "floor_plate";
  floor_plate.position.y = 0.49;
  enclosure_group.add(floor_plate);

  const floor_insetGeom = new THREE.BoxGeometry(0.72, 0.012, 0.60);
  const floor_inset = new THREE.Mesh(floor_insetGeom, brassMat);
  floor_inset.name = "floor_inset";
  floor_inset.position.y = 0.523;
  enclosure_group.add(floor_inset);

  const corner_postsGeom = new THREE.BoxGeometry(0.072, 1.55, 0.072);
  const corner_posts = new THREE.InstancedMesh(corner_postsGeom, frameMat, 4);
  corner_posts.name = "corner_posts";
  const postMatrix = new THREE.Matrix4();
  const postPositions = [
    [-0.40, 1.255, -0.335],
    [0.40, 1.255, -0.335],
    [-0.40, 1.255, 0.335],
    [0.40, 1.255, 0.335]
  ];
  for (let i = 0; i < postPositions.length; i++) {
    const p = postPositions[i];
    postMatrix.makeTranslation(p[0], p[1], p[2]);
    corner_posts.setMatrixAt(i, postMatrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  enclosure_group.add(corner_posts);

  const front_railGeom = new THREE.BoxGeometry(0.87, 0.09, 0.075);
  const side_railGeom = new THREE.BoxGeometry(0.075, 0.09, 0.745);

  const front_bottom_rail = new THREE.Mesh(front_railGeom, frameMat);
  front_bottom_rail.name = "front_bottom_rail";
  front_bottom_rail.position.set(0, 0.525, 0.335);
  enclosure_group.add(front_bottom_rail);

  const rear_bottom_rail = new THREE.Mesh(front_railGeom, frameMat);
  rear_bottom_rail.name = "rear_bottom_rail";
  rear_bottom_rail.position.set(0, 0.525, -0.335);
  enclosure_group.add(rear_bottom_rail);

  const left_bottom_rail = new THREE.Mesh(side_railGeom, frameMat);
  left_bottom_rail.name = "left_bottom_rail";
  left_bottom_rail.position.set(-0.40, 0.525, 0);
  enclosure_group.add(left_bottom_rail);

  const right_bottom_rail = new THREE.Mesh(side_railGeom, frameMat);
  right_bottom_rail.name = "right_bottom_rail";
  right_bottom_rail.position.set(0.40, 0.525, 0);
  enclosure_group.add(right_bottom_rail);

  const front_top_rail = new THREE.Mesh(front_railGeom, frameMat);
  front_top_rail.name = "front_top_rail";
  front_top_rail.position.set(0, 1.985, 0.335);
  enclosure_group.add(front_top_rail);

  const rear_top_rail = new THREE.Mesh(front_railGeom, frameMat);
  rear_top_rail.name = "rear_top_rail";
  rear_top_rail.position.set(0, 1.985, -0.335);
  enclosure_group.add(rear_top_rail);

  const left_top_rail = new THREE.Mesh(side_railGeom, frameMat);
  left_top_rail.name = "left_top_rail";
  left_top_rail.position.set(-0.40, 1.985, 0);
  enclosure_group.add(left_top_rail);

  const right_top_rail = new THREE.Mesh(side_railGeom, frameMat);
  right_top_rail.name = "right_top_rail";
  right_top_rail.position.set(0.40, 1.985, 0);
  enclosure_group.add(right_top_rail);

  const glassBottom = 0.57;
  const glassTop = 1.94;
  const glassHeight = glassTop - glassBottom;
  const glassCenterY = (glassBottom + glassTop) * 0.5;

  const front_glassGeom = new THREE.PlaneGeometry(0.72, glassHeight);
  const front_glass = new THREE.Mesh(front_glassGeom, glassMat);
  front_glass.name = "front_glass";
  front_glass.position.set(0, glassCenterY, 0.341);
  enclosure_group.add(front_glass);

  const rear_glassGeom = new THREE.PlaneGeometry(0.72, glassHeight);
  const rear_glass = new THREE.Mesh(rear_glassGeom, glassMat);
  rear_glass.name = "rear_glass";
  rear_glass.rotation.y = Math.PI;
  rear_glass.position.set(0, glassCenterY, -0.341);
  enclosure_group.add(rear_glass);

  const left_glassGeom = new THREE.PlaneGeometry(0.60, glassHeight);
  const left_glass = new THREE.Mesh(left_glassGeom, glassMat);
  left_glass.name = "left_glass";
  left_glass.rotation.y = -Math.PI / 2;
  left_glass.position.set(-0.406, glassCenterY, 0);
  enclosure_group.add(left_glass);

  const right_glassGeom = new THREE.PlaneGeometry(0.60, glassHeight);
  const right_glass = new THREE.Mesh(right_glassGeom, glassMat);
  right_glass.name = "right_glass";
  right_glass.rotation.y = Math.PI / 2;
  right_glass.position.set(0.406, glassCenterY, 0);
  enclosure_group.add(right_glass);

  const door_hingesGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.13, 12);
  const door_hinges = new THREE.InstancedMesh(door_hingesGeom, edgeMat, 2);
  door_hinges.name = "door_hinges";
  const hingeMatrix = new THREE.Matrix4();
  const hingeHeights = [0.86, 1.65];
  for (let i = 0; i < hingeHeights.length; i++) {
    hingeMatrix.makeTranslation(-0.365, hingeHeights[i], 0.382);
    door_hinges.setMatrixAt(i, hingeMatrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  enclosure_group.add(door_hinges);

  const door_latch_plateGeom = new THREE.BoxGeometry(0.035, 0.115, 0.018);
  const door_latch_plate = new THREE.Mesh(door_latch_plateGeom, edgeMat);
  door_latch_plate.name = "door_latch_plate";
  door_latch_plate.position.set(0.355, 1.25, 0.382);
  enclosure_group.add(door_latch_plate);

  const door_latch_handleGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.075, 10);
  const door_latch_handle = new THREE.Mesh(door_latch_handleGeom, edgeMat);
  door_latch_handle.name = "door_latch_handle";
  door_latch_handle.rotation.x = Math.PI / 2;
  door_latch_handle.position.set(0.355, 1.25, 0.415);
  enclosure_group.add(door_latch_handle);

  const lamp_pedestalGeom = new THREE.CylinderGeometry(0.12, 0.18, 0.18, 24);
  const lamp_pedestal = new THREE.Mesh(lamp_pedestalGeom, frameMat);
  lamp_pedestal.name = "lamp_pedestal";
  lamp_pedestal.position.y = 0.61;
  light_group.add(lamp_pedestal);

  const lamp_socketGeom = new THREE.CylinderGeometry(0.105, 0.12, 0.10, 24);
  const lamp_socket = new THREE.Mesh(lamp_socketGeom, edgeMat);
  lamp_socket.name = "lamp_socket";
  lamp_socket.position.y = 0.715;
  light_group.add(lamp_socket);

  const lamp_socket_rimGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 32);
  const lamp_socket_rim = new THREE.Mesh(lamp_socket_rimGeom, frameMat);
  lamp_socket_rim.name = "lamp_socket_rim";
  lamp_socket_rim.rotation.x = Math.PI / 2;
  lamp_socket_rim.position.y = 0.755;
  light_group.add(lamp_socket_rim);

  const flame_outerProfile = [
    new THREE.Vector2(0.00, 0.735),
    new THREE.Vector2(0.105, 0.735),
    new THREE.Vector2(0.155, 0.775),
    new THREE.Vector2(0.180, 0.865),
    new THREE.Vector2(0.175, 0.965),
    new THREE.Vector2(0.145, 1.070),
    new THREE.Vector2(0.095, 1.170),
    new THREE.Vector2(0.040, 1.245),
    new THREE.Vector2(0.00, 1.295)
  ];
  const flame_outerGeom = new THREE.LatheGeometry(flame_outerProfile, 32);
  const flame_outer = new THREE.Mesh(flame_outerGeom, flameMat);
  flame_outer.name = "flame_outer";
  light_group.add(flame_outer);

  const flame_coreProfile = [
    new THREE.Vector2(0.00, 0.755),
    new THREE.Vector2(0.080, 0.755),
    new THREE.Vector2(0.120, 0.795),
    new THREE.Vector2(0.135, 0.875),
    new THREE.Vector2(0.120, 0.965),
    new THREE.Vector2(0.080, 1.060),
    new THREE.Vector2(0.030, 1.145),
    new THREE.Vector2(0.00, 1.185)
  ];
  const flame_coreGeom = new THREE.LatheGeometry(flame_coreProfile, 28);
  const flame_core = new THREE.Mesh(flame_coreGeom, flameCoreMat);
  flame_core.name = "flame_core";
  light_group.add(flame_core);

  const inner_glowGeom = new THREE.SphereGeometry(0.25, 24, 16);
  const inner_glow = new THREE.Mesh(inner_glowGeom, glowMat);
  inner_glow.name = "inner_glow";
  inner_glow.position.y = 0.96;
  inner_glow.scale.set(1.0, 1.35, 1.0);
  light_group.add(inner_glow);

  const roof_eaveGeom = new THREE.BoxGeometry(1.18, 0.065, 1.02);
  const roof_eave = new THREE.Mesh(roof_eaveGeom, frameMat);
  roof_eave.name = "roof_eave";
  roof_eave.position.y = 2.045;
  roof_group.add(roof_eave);

  const roof_eave_trimGeom = new THREE.BoxGeometry(1.10, 0.035, 0.94);
  const roof_eave_trim = new THREE.Mesh(roof_eave_trimGeom, edgeMat);
  roof_eave_trim.name = "roof_eave_trim";
  roof_eave_trim.position.y = 2.085;
  roof_group.add(roof_eave_trim);

  const roof_domeGeom = new THREE.CylinderGeometry(0.29, 0.72, 0.49, 8, 1, false);
  const roof_dome = new THREE.Mesh(roof_domeGeom, roofMat);
  roof_dome.name = "roof_dome";
  roof_dome.position.y = 2.33;
  roof_group.add(roof_dome);

  const roof_top_plateGeom = new THREE.CylinderGeometry(0.255, 0.29, 0.045, 8);
  const roof_top_plate = new THREE.Mesh(roof_top_plateGeom, edgeMat);
  roof_top_plate.name = "roof_top_plate";
  roof_top_plate.position.y = 2.585;
  roof_group.add(roof_top_plate);

  const vent_bodyGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.32, 32);
  const vent_body = new THREE.Mesh(vent_bodyGeom, roofMat);
  vent_body.name = "vent_body";
  vent_body.position.y = 2.75;
  top_group.add(vent_body);

  const vent_lower_rimGeom = new THREE.TorusGeometry(0.25, 0.012, 8, 40);
  const vent_lower_rim = new THREE.Mesh(vent_lower_rimGeom, edgeMat);
  vent_lower_rim.name = "vent_lower_rim";
  vent_lower_rim.rotation.x = Math.PI / 2;
  vent_lower_rim.position.y = 2.60;
  top_group.add(vent_lower_rim);

  const vent_upper_rimGeom = new THREE.TorusGeometry(0.25, 0.012, 8, 40);
  const vent_upper_rim = new THREE.Mesh(vent_upper_rimGeom, edgeMat);
  vent_upper_rim.name = "vent_upper_rim";
  vent_upper_rim.rotation.x = Math.PI / 2;
  vent_upper_rim.position.y = 2.90;
  top_group.add(vent_upper_rim);

  const vent_holesGeom = new THREE.CircleGeometry(1, 14);
  const vent_holes = new THREE.InstancedMesh(vent_holesGeom, holeMat, 30);
  vent_holes.name = "vent_holes";

  const baseNormal = new THREE.Vector3(0, 0, 1);
  const normal = new THREE.Vector3();
  const ventHolePosition = new THREE.Vector3();
  const ventHoleQuaternion = new THREE.Quaternion();
  const ventHoleScale = new THREE.Vector3();
  const ventHoleMatrix = new THREE.Matrix4();
  let holeIndex = 0;

  for (let row = 0; row < 3; row++) {
    const y = 2.65 + row * 0.09;
    for (let column = 0; column < 10; column++) {
      const angle = column / 10 * Math.PI * 2 + row * 0.19;
      const cx = Math.cos(angle);
      const sz = Math.sin(angle);
      normal.set(cx, 0, sz);
      ventHolePosition.set(cx * 0.253, y, sz * 0.253);
      ventHoleQuaternion.setFromUnitVectors(baseNormal, normal);
      const holeSize = 0.024 + ((row + column) % 3) * 0.005;
      ventHoleScale.set(holeSize, holeSize, 1);
      ventHoleMatrix.compose(ventHolePosition, ventHoleQuaternion, ventHoleScale);
      vent_holes.setMatrixAt(holeIndex, ventHoleMatrix);
      holeIndex++;
    }
  }
  vent_holes.instanceMatrix.needsUpdate = true;
  top_group.add(vent_holes);

  const top_capProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.35, 0.00),
    new THREE.Vector2(0.35, 0.025),
    new THREE.Vector2(0.31, 0.055),
    new THREE.Vector2(0.23, 0.090),
    new THREE.Vector2(0.13, 0.125),
    new THREE.Vector2(0.00, 0.140)
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 40);
  const top_cap = new THREE.Mesh(top_capGeom, roofMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 2.90;
  top_group.add(top_cap);

  const ring_mountGeom = new THREE.SphereGeometry(0.075, 20, 12);
  const ring_mount = new THREE.Mesh(ring_mountGeom, edgeMat);
  ring_mount.name = "ring_mount";
  ring_mount.position.y = 3.045;
  ring_mount.scale.set(1.0, 0.55, 1.0);
  top_group.add(ring_mount);

  const carrying_ringGeom = new THREE.TorusGeometry(0.19, 0.025, 12, 48);
  const carrying_ring = new THREE.Mesh(carrying_ringGeom, edgeMat);
  carrying_ring.name = "carrying_ring";
  carrying_ring.position.y = 3.23;
  top_group.add(carrying_ring);

  function fitToUnitCube(THREE, object) {
    object.updateMatrixWorld(true);
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