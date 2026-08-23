export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hanging_lantern";

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  const light_chamber = new THREE.Group();
  light_chamber.name = "light_chamber";
  const top_assembly = new THREE.Group();
  top_assembly.name = "top_assembly";
  const cage_assembly = new THREE.Group();
  cage_assembly.name = "cage_assembly";
  const chain_assembly = new THREE.Group();
  chain_assembly.name = "chain_assembly";

  root.add(base_assembly, light_chamber, top_assembly, cage_assembly, chain_assembly);

  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x281d18,
    metalness: 0.5,
    roughness: 0.35
  });
  const edge_metalMat = new THREE.MeshStandardMaterial({
    color: 0x1b1512,
    metalness: 0.55,
    roughness: 0.3
  });
  const warm_metalMat = new THREE.MeshStandardMaterial({
    color: 0x8c5a24,
    metalness: 0.5,
    roughness: 0.3
  });
  const knob_metalMat = new THREE.MeshStandardMaterial({
    color: 0x4a3526,
    metalness: 0.5,
    roughness: 0.3
  });
  const glass_chamberMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe2b8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xfff4dc,
    transparent: true,
    opacity: 0.2,
    depthWrite: false
  });
  const bulb_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffdf9a,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const bulb_glowMat = new THREE.MeshStandardMaterial({
    color: 0xfff1b0,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffb13b,
    emissiveIntensity: 1.0
  });
  const bulb_coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffe8
  });
  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xffc04d,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xff8a18,
    emissiveIntensity: 1.0
  });

  function makeTube(points, radius, material, tubularSegments, radialSegments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        tubularSegments || 24,
        radius,
        radialSegments || 7,
        false
      ),
      material
    );
  }

  const base_reservoirProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.78, 0.00),
    new THREE.Vector2(0.94, 0.035),
    new THREE.Vector2(1.02, 0.10),
    new THREE.Vector2(1.03, 0.15),
    new THREE.Vector2(0.96, 0.21),
    new THREE.Vector2(0.84, 0.25),
    new THREE.Vector2(0.80, 0.31),
    new THREE.Vector2(0.80, 0.52),
    new THREE.Vector2(0.75, 0.59),
    new THREE.Vector2(0.00, 0.59)
  ];
  const base_reservoirGeom = new THREE.LatheGeometry(base_reservoirProfile, 48);
  const base_reservoir = new THREE.Mesh(base_reservoirGeom, dark_metalMat);
  base_reservoir.name = "base_reservoir";
  base_assembly.add(base_reservoir);

  const base_lower_rimGeom = new THREE.TorusGeometry(0.96, 0.035, 10, 48);
  const base_lower_rim = new THREE.Mesh(base_lower_rimGeom, edge_metalMat);
  base_lower_rim.name = "base_lower_rim";
  base_lower_rim.rotation.x = Math.PI / 2;
  base_lower_rim.position.y = 0.11;
  base_assembly.add(base_lower_rim);

  const base_upper_lipGeom = new THREE.CylinderGeometry(0.78, 0.82, 0.065, 48);
  const base_upper_lip = new THREE.Mesh(base_upper_lipGeom, dark_metalMat);
  base_upper_lip.name = "base_upper_lip";
  base_upper_lip.position.y = 0.585;
  base_assembly.add(base_upper_lip);

  const burner_platformGeom = new THREE.CylinderGeometry(0.47, 0.49, 0.10, 40);
  const burner_platform = new THREE.Mesh(burner_platformGeom, warm_metalMat);
  burner_platform.name = "burner_platform";
  burner_platform.position.y = 0.65;
  base_assembly.add(burner_platform);

  const burner_collarGeom = new THREE.CylinderGeometry(0.34, 0.37, 0.14, 40);
  const burner_collar = new THREE.Mesh(burner_collarGeom, edge_metalMat);
  burner_collar.name = "burner_collar";
  burner_collar.position.y = 0.75;
  base_assembly.add(burner_collar);

  const burner_glow_ringGeom = new THREE.TorusGeometry(0.36, 0.018, 8, 40);
  const burner_glow_ring = new THREE.Mesh(burner_glow_ringGeom, filamentMat);
  burner_glow_ring.name = "burner_glow_ring";
  burner_glow_ring.rotation.x = Math.PI / 2;
  burner_glow_ring.position.y = 0.71;
  base_assembly.add(burner_glow_ring);

  const wick_holderGeom = new THREE.CylinderGeometry(0.13, 0.16, 0.18, 28);
  const wick_holder = new THREE.Mesh(wick_holderGeom, warm_metalMat);
  wick_holder.name = "wick_holder";
  wick_holder.position.y = 0.84;
  base_assembly.add(wick_holder);

  const control_knob_group = new THREE.Group();
  control_knob_group.name = "control_knob_group";
  const controlAngle = 0.55;
  const controlNormal = new THREE.Vector3(
    Math.sin(controlAngle),
    0,
    Math.cos(controlAngle)
  ).normalize();
  control_knob_group.position.set(
    controlNormal.x * 0.805,
    0.35,
    controlNormal.z * 0.805
  );
  control_knob_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    controlNormal
  );
  base_assembly.add(control_knob_group);

  const control_knobGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.06, 24);
  const control_knob = new THREE.Mesh(control_knobGeom, knob_metalMat);
  control_knob.name = "control_knob";
  control_knob.position.y = 0.035;
  control_knob_group.add(control_knob);

  const control_knob_capGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.025, 24);
  const control_knob_cap = new THREE.Mesh(control_knob_capGeom, edge_metalMat);
  control_knob_cap.name = "control_knob_cap";
  control_knob_cap.position.y = 0.075;
  control_knob_group.add(control_knob_cap);

  const glass_chamberProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.66, 0.61),
    new THREE.Vector2(0.72, 0.72),
    new THREE.Vector2(0.76, 1.05),
    new THREE.Vector2(0.74, 1.55),
    new THREE.Vector2(0.69, 2.08),
    new THREE.Vector2(0.61, 2.43)
  ]).getSpacedPoints(40);
  const glass_chamberGeom = new THREE.LatheGeometry(glass_chamberProfile, 48);
  const glass_chamber = new THREE.Mesh(glass_chamberGeom, glass_chamberMat);
  glass_chamber.name = "glass_chamber";
  light_chamber.add(glass_chamber);

  const glass_lower_edgeGeom = new THREE.TorusGeometry(0.67, 0.012, 7, 48);
  const glass_lower_edge = new THREE.Mesh(glass_lower_edgeGeom, glass_highlightMat);
  glass_lower_edge.name = "glass_lower_edge";
  glass_lower_edge.rotation.x = Math.PI / 2;
  glass_lower_edge.position.y = 0.63;
  light_chamber.add(glass_lower_edge);

  const glass_upper_edgeGeom = new THREE.TorusGeometry(0.62, 0.012, 7, 48);
  const glass_upper_edge = new THREE.Mesh(glass_upper_edgeGeom, glass_highlightMat);
  glass_upper_edge.name = "glass_upper_edge";
  glass_upper_edge.rotation.x = Math.PI / 2;
  glass_upper_edge.position.y = 2.41;
  light_chamber.add(glass_upper_edge);

  function glassRadiusAt(y) {
    if (y < 0.72) return 0.66 + (y - 0.61) * 0.55;
    if (y < 1.05) return 0.72 + (y - 0.72) * 0.12;
    if (y < 1.55) return 0.76 - (y - 1.05) * 0.04;
    if (y < 2.08) return 0.74 - (y - 1.55) * 0.094;
    return 0.69 - (y - 2.08) * 0.229;
  }

  function glassSurfacePoint(angle, y, offset) {
    const radius = glassRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
  }

  const left_glass_highlight = makeTube(
    [
      glassSurfacePoint(-0.58, 0.73, 0.012),
      glassSurfacePoint(-0.58, 1.08, 0.012),
      glassSurfacePoint(-0.58, 1.56, 0.012),
      glassSurfacePoint(-0.58, 2.04, 0.012),
      glassSurfacePoint(-0.58, 2.34, 0.012)
    ],
    0.009,
    glass_highlightMat,
    28,
    6
  );
  left_glass_highlight.name = "left_glass_highlight";
  light_chamber.add(left_glass_highlight);

  const right_glass_highlight = makeTube(
    [
      glassSurfacePoint(0.66, 0.76, 0.012),
      glassSurfacePoint(0.66, 1.12, 0.012),
      glassSurfacePoint(0.66, 1.58, 0.012),
      glassSurfacePoint(0.66, 2.02, 0.012)
    ],
    0.007,
    glass_highlightMat,
    24,
    6
  );
  right_glass_highlight.name = "right_glass_highlight";
  light_chamber.add(right_glass_highlight);

  const bulb_globeProfile = [
    new THREE.Vector2(0.00, 0.76),
    new THREE.Vector2(0.12, 0.780),
    new THREE.Vector2(0.25, 0.93),
    new THREE.Vector2(0.31, 1.18),
    new THREE.Vector2(0.30, 1.48),
    new THREE.Vector2(0.25, 1.72),
    new THREE.Vector2(0.16, 1.91),
    new THREE.Vector2(0.11, 2.02),
    new THREE.Vector2(0.11, 2.17),
    new THREE.Vector2(0.00, 2.19)
  ];
  const bulb_globeGeom = new THREE.LatheGeometry(bulb_globeProfile, 40);
  const bulb_globe = new THREE.Mesh(bulb_globeGeom, bulb_glassMat);
  bulb_globe.name = "bulb_globe";
  light_chamber.add(bulb_globe);

  const bulb_socketGeom = new THREE.CylinderGeometry(0.15, 0.16, 0.20, 28);
  const bulb_socket = new THREE.Mesh(bulb_socketGeom, warm_metalMat);
  bulb_socket.name = "bulb_socket";
  bulb_socket.position.y = 2.16;
  light_chamber.add(bulb_socket);

  const bulb_glowGeom = new THREE.SphereGeometry(0.22, 24, 16);
  const bulb_glow = new THREE.Mesh(bulb_glowGeom, bulb_glowMat);
  bulb_glow.name = "bulb_glow";
  bulb_glow.position.set(0, 1.38, 0);
  bulb_glow.scale.set(0.72, 1.65, 0.72);
  light_chamber.add(bulb_glow);

  const bulb_coreGeom = new THREE.SphereGeometry(0.105, 20, 12);
  const bulb_core = new THREE.Mesh(bulb_coreGeom, bulb_coreMat);
  bulb_core.name = "bulb_core";
  bulb_core.position.set(0, 1.38, 0.015);
  bulb_core.scale.set(0.72, 1.85, 0.72);
  light_chamber.add(bulb_core);

  const filament_supportsGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.42, 6);
  const filament_supports = new THREE.InstancedMesh(
    filament_supportsGeom,
    filamentMat,
    2
  );
  filament_supports.name = "filament_supports";
  const filamentSupportMatrix = new THREE.Matrix4();
  filamentSupportMatrix.makeTranslation(-0.055, 1.08, 0.015);
  filament_supports.setMatrixAt(0, filamentSupportMatrix);
  filamentSupportMatrix.makeTranslation(0.055, 1.08, 0.015);
  filament_supports.setMatrixAt(1, filamentSupportMatrix);
  filament_supports.instanceMatrix.needsUpdate = true;
  light_chamber.add(filament_supports);

  const filament_coil = makeTube(
    [
      new THREE.Vector3(-0.055, 1.22, 0.02),
      new THREE.Vector3(-0.035, 1.29, 0.02),
      new THREE.Vector3(0.035, 1.36, 0.02),
      new THREE.Vector3(-0.035, 1.43, 0.02),
      new THREE.Vector3(0.035, 1.50, 0.02),
      new THREE.Vector3(-0.025, 1.57, 0.02),
      new THREE.Vector3(0.055, 1.64, 0.02)
    ],
    0.012,
    filamentMat,
    24,
    6
  );
  filament_coil.name = "filament_coil";
  light_chamber.add(filament_coil);

  const upper_cage_ringGeom = new THREE.CylinderGeometry(0.75, 0.78, 0.085, 48);
  const upper_cage_ring = new THREE.Mesh(upper_cage_ringGeom, edge_metalMat);
  upper_cage_ring.name = "upper_cage_ring";
  upper_cage_ring.position.y = 2.43;
  cage_assembly.add(upper_cage_ring);

  const lower_cage_ringGeom = new THREE.TorusGeometry(0.72, 0.035, 9, 48);
  const lower_cage_ring = new THREE.Mesh(lower_cage_ringGeom, edge_metalMat);
  lower_cage_ring.name = "lower_cage_ring";
  lower_cage_ring.rotation.x = Math.PI / 2;
  lower_cage_ring.position.y = 0.62;
  cage_assembly.add(lower_cage_ring);

  const front_left_guard = makeTube(
    [
      new THREE.Vector3(-0.72, 2.43, 0.22),
      new THREE.Vector3(-0.76, 1.82, 0.24),
      new THREE.Vector3(-0.83, 0.88, 0.27),
      new THREE.Vector3(-0.78, 0.63, 0.28),
      new THREE.Vector3(-0.61, 0.56, 0.30)
    ],
    0.045,
    dark_metalMat,
    32,
    8
  );
  front_left_guard.name = "front_left_guard";
  cage_assembly.add(front_left_guard);

  const front_right_guard = makeTube(
    [
      new THREE.Vector3(0.72, 2.43, 0.22),
      new THREE.Vector3(0.76, 1.82, 0.24),
      new THREE.Vector3(0.83, 0.88, 0.27),
      new THREE.Vector3(0.78, 0.63, 0.28),
      new THREE.Vector3(0.61, 0.56, 0.30)
    ],
    0.045,
    dark_metalMat,
    32,
    8
  );
  front_right_guard.name = "front_right_guard";
  cage_assembly.add(front_right_guard);

  const rear_left_guard = makeTube(
    [
      new THREE.Vector3(-0.72, 2.43, -0.22),
      new THREE.Vector3(-0.76, 1.82, -0.24),
      new THREE.Vector3(-0.83, 0.88, -0.27),
      new THREE.Vector3(-0.78, 0.63, -0.28),
      new THREE.Vector3(-0.61, 0.56, -0.30)
    ],
    0.041,
    dark_metalMat,
    32,
    8
  );
  rear_left_guard.name = "rear_left_guard";
  cage_assembly.add(rear_left_guard);

  const rear_right_guard = makeTube(
    [
      new THREE.Vector3(0.72, 2.43, -0.22),
      new THREE.Vector3(0.76, 1.82, -0.24),
      new THREE.Vector3(0.83, 0.88, -0.27),
      new THREE.Vector3(0.78, 0.63, -0.28),
      new THREE.Vector3(0.61, 0.56, -0.30)
    ],
    0.041,
    dark_metalMat,
    32,
    8
  );
  rear_right_guard.name = "rear_right_guard";
  cage_assembly.add(rear_right_guard);

  const left_side_rail = makeTube(
    [
      new THREE.Vector3(-1.00, 2.43, 0.00),
      new THREE.Vector3(-1.03, 1.72, 0.00),
      new THREE.Vector3(-1.10, 0.78, 0.01),
      new THREE.Vector3(-1.00, 0.58, 0.02),
      new THREE.Vector3(-0.79, 0.52, 0.03)
    ],
    0.028,
    warm_metalMat,
    30,
    7
  );
  left_side_rail.name = "left_side_rail";
  cage_assembly.add(left_side_rail);

  const right_side_rail = makeTube(
    [
      new THREE.Vector3(1.00, 2.43, 0.00),
      new THREE.Vector3(1.03, 1.72, 0.00),
      new THREE.Vector3(1.10, 0.78, 0.01),
      new THREE.Vector3(1.00, 0.58, 0.02),
      new THREE.Vector3(0.79, 0.52, 0.03)
    ],
    0.028,
    warm_metalMat,
    30,
    7
  );
  right_side_rail.name = "right_side_rail";
  cage_assembly.add(right_side_rail);

  const front_cross_brace_left_to_right = makeTube(
    [
      new THREE.Vector3(-0.77, 0.61, 0.48),
      new THREE.Vector3(-0.50, 0.83, 0.68),
      new THREE.Vector3(-0.17, 1.08, 0.78),
      new THREE.Vector3(0.18, 1.35, 0.77),
      new THREE.Vector3(0.52, 1.63, 0.65),
      new THREE.Vector3(0.82, 1.93, 0.34)
    ],
    0.021,
    warm_metalMat,
    32,
    7
  );
  front_cross_brace_left_to_right.name = "front_cross_brace_left_to_right";
  cage_assembly.add(front_cross_brace_left_to_right);

  const front_cross_brace_right_to_left = makeTube(
    [
      new THREE.Vector3(0.77, 0.61, 0.48),
      new THREE.Vector3(0.50, 0.83, 0.68),
      new THREE.Vector3(0.17, 1.08, 0.78),
      new THREE.Vector3(-0.18, 1.35, 0.77),
      new THREE.Vector3(-0.52, 1.63, 0.65),
      new THREE.Vector3(-0.82, 1.93, 0.34)
    ],
    0.021,
    warm_metalMat,
    32,
    7
  );
  front_cross_brace_right_to_left.name = "front_cross_brace_right_to_left";
  cage_assembly.add(front_cross_brace_right_to_left);

  const left_lower_wire = makeTube(
    [
      new THREE.Vector3(-0.77, 0.62, 0.45),
      new THREE.Vector3(-0.55, 0.54, 0.54),
      new THREE.Vector3(-0.27, 0.57, 0.61),
      new THREE.Vector3(-0.06, 0.68, 0.66)
    ],
    0.018,
    warm_metalMat,
    20,
    6
  );
  left_lower_wire.name = "left_lower_wire";
  cage_assembly.add(left_lower_wire);

  const right_lower_wire = makeTube(
    [
      new THREE.Vector3(0.77, 0.62, 0.45),
      new THREE.Vector3(0.55, 0.54, 0.54),
      new THREE.Vector3(0.27, 0.57, 0.61),
      new THREE.Vector3(0.06, 0.68, 0.66)
    ],
    0.018,
    warm_metalMat,
    20,
    6
  );
  right_lower_wire.name = "right_lower_wire";
  cage_assembly.add(right_lower_wire);

  const right_bail_handle = makeTube(
    [
      new THREE.Vector3(0.98, 1.12, -0.03),
      new THREE.Vector3(1.12, 1.16, -0.01),
      new THREE.Vector3(1.22, 1.27, 0.00),
      new THREE.Vector3(1.16, 1.39, 0.01),
      new THREE.Vector3(1.00, 1.47, 0.02)
    ],
    0.025,
    warm_metalMat,
    24,
    7
  );
  right_bail_handle.name = "right_bail_handle";
  cage_assembly.add(right_bail_handle);

  const hood_domeProfile = [
    new THREE.Vector2(0.00, 2.40),
    new THREE.Vector2(0.91, 2.40),
    new THREE.Vector2(0.99, 2.44),
    new THREE.Vector2(1.00, 2.49),
    new THREE.Vector2(0.92, 2.54),
    new THREE.Vector2(0.82, 2.58),
    new THREE.Vector2(0.77, 2.72),
    new THREE.Vector2(0.68, 2.89),
    new THREE.Vector2(0.55, 3.03),
    new THREE.Vector2(0.40, 3.12),
    new THREE.Vector2(0.33, 3.16),
    new THREE.Vector2(0.00, 3.16)
  ];
  const hood_domeGeom = new THREE.LatheGeometry(hood_domeProfile, 48);
  const hood_dome = new THREE.Mesh(hood_domeGeom, dark_metalMat);
  hood_dome.name = "hood_dome";
  top_assembly.add(hood_dome);

  const hood_brimGeom = new THREE.TorusGeometry(0.965, 0.035, 10, 56);
  const hood_brim = new THREE.Mesh(hood_brimGeom, edge_metalMat);
  hood_brim.name = "hood_brim";
  hood_brim.rotation.x = Math.PI / 2;
  hood_brim.position.y = 2.46;
  top_assembly.add(hood_brim);

  const chimney_neckGeom = new THREE.CylinderGeometry(0.33, 0.34, 0.48, 40);
  const chimney_neck = new THREE.Mesh(chimney_neckGeom, dark_metalMat);
  chimney_neck.name = "chimney_neck";
  chimney_neck.position.y = 3.39;
  top_assembly.add(chimney_neck);

  const chimney_lower_bandGeom = new THREE.TorusGeometry(0.33, 0.025, 8, 40);
  const chimney_lower_band = new THREE.Mesh(chimney_lower_bandGeom, edge_metalMat);
  chimney_lower_band.name = "chimney_lower_band";
  chimney_lower_band.rotation.x = Math.PI / 2;
  chimney_lower_band.position.y = 3.17;
  top_assembly.add(chimney_lower_band);

  const top_capProfile = [
    new THREE.Vector2(0.00, 3.59),
    new THREE.Vector2(0.34, 3.59),
    new THREE.Vector2(0.48, 3.61),
    new THREE.Vector2(0.58, 3.64),
    new THREE.Vector2(0.59, 3.68),
    new THREE.Vector2(0.51, 3.71),
    new THREE.Vector2(0.28, 3.78),
    new THREE.Vector2(0.00, 3.82)
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 48);
  const top_cap = new THREE.Mesh(top_capGeom, dark_metalMat);
  top_cap.name = "top_cap";
  top_assembly.add(top_cap);

  const top_cap_brimGeom = new THREE.TorusGeometry(0.555, 0.027, 9, 48);
  const top_cap_brim = new THREE.Mesh(top_cap_brimGeom, edge_metalMat);
  top_cap_brim.name = "top_cap_brim";
  top_cap_brim.rotation.x = Math.PI / 2;
  top_cap_brim.position.y = 3.65;
  top_assembly.add(top_cap_brim);

  const hanger_mountGeom = new THREE.SphereGeometry(0.13, 24, 14);
  const hanger_mount = new THREE.Mesh(hanger_mountGeom, edge_metalMat);
  hanger_mount.name = "hanger_mount";
  hanger_mount.position.y = 3.82;
  hanger_mount.scale.set(1.0, 0.55, 1.0);
  top_assembly.add(hanger_mount);

  const hanger_ringGeom = new THREE.TorusGeometry(0.28, 0.035, 10, 40);
  const hanger_ring = new THREE.Mesh(hanger_ringGeom, edge_metalMat);
  hanger_ring.name = "hanger_ring";
  hanger_ring.position.y = 4.08;
  hanger_ring.scale.set(0.92, 1.15, 1.0);
  chain_assembly.add(hanger_ring);

  const chain_linksGeom = new THREE.TorusGeometry(0.16, 0.028, 9, 32);
  const chain_links = new THREE.InstancedMesh(chain_linksGeom, edge_metalMat, 5);
  chain_links.name = "chain_links";
  const chainLinkPositions = [4.48, 4.82, 5.16, 5.50, 5.84];
  const chainLinkQuaternions = [];
  for (let i = 0; i < chainLinkPositions.length; i++) {
    chainLinkQuaternions.push(i % 2 === 0 ? 0 : Math.PI / 2);
  }

  const chainLinkScales = [
    new THREE.Vector3(0.92, 1.30, 1.0),
    new THREE.Vector3(0.92, 1.24, 1.0),
    new THREE.Vector3(0.92, 1.28, 1.0),
    new THREE.Vector3(0.92, 1.25, 1.0),
    new THREE.Vector3(0.92, 1.30, 1.0)
  ];
  const chainLinkMatrix = new THREE.Matrix4();
  const chainLinkPosition = new THREE.Vector3();
  const chainLinkQuaternion = new THREE.Quaternion();
  for (let i = 0; i < chainLinkPositions.length; i++) {
    chainLinkPosition.set(0, chainLinkPositions[i], 0);
    chainLinkQuaternion.setFromEuler(
      new THREE.Euler(0, chainLinkQuaternions[i], 0)
    );
    chainLinkMatrix.compose(
      chainLinkPosition,
      chainLinkQuaternion,
      chainLinkScales[i]
    );
    chain_links.setMatrixAt(i, chainLinkMatrix);
  }
  chain_links.instanceMatrix.needsUpdate = true;
  chain_assembly.add(chain_links);

  const chain_top_connectorGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.18, 8);
  const chain_top_connector = new THREE.Mesh(chain_top_connectorGeom, edge_metalMat);
  chain_top_connector.name = "chain_top_connector";
  chain_top_connector.position.y = 6.05;
  chain_assembly.add(chain_top_connector);

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