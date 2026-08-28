export default function generate(THREE) {
  const root = new THREE.Group();
  const base_assembly = new THREE.Group();
  const bulb_assembly = new THREE.Group();
  const filament_assembly = new THREE.Group();
  root.add(base_assembly, bulb_assembly);
  bulb_assembly.add(filament_assembly);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xd0a45a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const gasketMat = new THREE.MeshStandardMaterial({
    color: 0x171b1b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blue_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0079b9,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8dadd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const cyan_glowMat = new THREE.MeshStandardMaterial({
    color: 0x00f5bd,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x00f5bd,
    emissiveIntensity: 1.0,
  });
  const cyan_coreMat = new THREE.MeshBasicMaterial({
    color: 0xd8ffe8,
  });
  const cyan_haloMat = new THREE.MeshStandardMaterial({
    color: 0x00f5bd,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x00f5bd,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
  });

  const bottom_footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.43, 0.035),
    new THREE.Vector2(0.47, 0.085),
    new THREE.Vector2(0.45, 0.145),
    new THREE.Vector2(0.35, 0.195),
    new THREE.Vector2(0.25, 0.215),
    new THREE.Vector2(0.00, 0.215),
  ];
  const bottom_footGeom = new THREE.LatheGeometry(bottom_footProfile, 48);
  const bottom_foot = new THREE.Mesh(bottom_footGeom, brassMat);
  base_assembly.add(bottom_foot);

  const lower_connectorGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.22, 32);
  const lower_connector = new THREE.Mesh(lower_connectorGeom, polished_brassMat);
  lower_connector.position.y = 0.30;
  base_assembly.add(lower_connector);

  const lower_connector_bandGeom = new THREE.TorusGeometry(0.22, 0.026, 10, 40);
  const lower_connector_band = new THREE.Mesh(lower_connector_bandGeom, dark_metalMat);
  lower_connector_band.rotation.x = Math.PI / 2;
  lower_connector_band.position.y = 0.38;
  base_assembly.add(lower_connector_band);

  const brass_socketProfile = [
    new THREE.Vector2(0.00, 0.34),
    new THREE.Vector2(0.24, 0.34),
    new THREE.Vector2(0.27, 0.40),
    new THREE.Vector2(0.39, 0.43),
    new THREE.Vector2(0.44, 0.49),
    new THREE.Vector2(0.42, 0.56),
    new THREE.Vector2(0.35, 0.62),
    new THREE.Vector2(0.33, 0.70),
    new THREE.Vector2(0.33, 1.15),
    new THREE.Vector2(0.36, 1.23),
    new THREE.Vector2(0.43, 1.30),
    new THREE.Vector2(0.49, 1.35),
    new THREE.Vector2(0.49, 1.39),
    new THREE.Vector2(0.00, 1.39),
  ];
  const brass_socketGeom = new THREE.LatheGeometry(brass_socketProfile, 48);
  const brass_socket = new THREE.Mesh(brass_socketGeom, brassMat);
  base_assembly.add(brass_socket);

  const lower_socket_ringGeom = new THREE.TorusGeometry(0.385, 0.045, 12, 48);
  const lower_socket_ring = new THREE.Mesh(lower_socket_ringGeom, polished_brassMat);
  lower_socket_ring.rotation.x = Math.PI / 2;
  lower_socket_ring.position.y = 0.49;
  base_assembly.add(lower_socket_ring);

  const upper_socket_ringGeom = new THREE.TorusGeometry(0.455, 0.045, 12, 48);
  const upper_socket_ring = new THREE.Mesh(upper_socket_ringGeom, polished_brassMat);
  upper_socket_ring.rotation.x = Math.PI / 2;
  upper_socket_ring.position.y = 1.355;
  base_assembly.add(upper_socket_ring);

  const socket_contactGeom = new THREE.CylinderGeometry(0.39, 0.39, 0.035, 40);
  const socket_contact = new THREE.Mesh(socket_contactGeom, dark_metalMat);
  socket_contact.position.y = 1.405;
  base_assembly.add(socket_contact);

  const bulb_gasketGeom = new THREE.TorusGeometry(0.405, 0.026, 10, 48);
  const bulb_gasket = new THREE.Mesh(bulb_gasketGeom, gasketMat);
  bulb_gasket.rotation.x = Math.PI / 2;
  bulb_gasket.position.y = 1.435;
  base_assembly.add(bulb_gasket);

  const blue_glass_shellProfile = [
    new THREE.Vector2(0.40, 1.40),
    new THREE.Vector2(0.50, 1.44),
    new THREE.Vector2(0.70, 1.55),
    new THREE.Vector2(0.90, 1.75),
    new THREE.Vector2(1.04, 2.02),
    new THREE.Vector2(1.10, 2.32),
    new THREE.Vector2(1.10, 2.55),
    new THREE.Vector2(1.05, 2.85),
    new THREE.Vector2(1.00, 3.20),
    new THREE.Vector2(0.95, 3.55),
    new THREE.Vector2(0.88, 3.88),
    new THREE.Vector2(0.78, 4.14),
    new THREE.Vector2(0.62, 4.35),
    new THREE.Vector2(0.40, 4.49),
    new THREE.Vector2(0.18, 4.56),
    new THREE.Vector2(0.00, 4.59),
  ];
  const blue_glass_shellGeom = new THREE.LatheGeometry(blue_glass_shellProfile, 64);
  const blue_glass_shell = new THREE.Mesh(blue_glass_shellGeom, blue_glassMat);
  blue_glass_shell.renderOrder = 3;
  bulb_assembly.add(blue_glass_shell);

  const top_openingGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.014, 32);
  const top_opening = new THREE.Mesh(top_openingGeom, gasketMat);
  top_opening.position.y = 4.592;
  bulb_assembly.add(top_opening);

  const top_glass_rimGeom = new THREE.TorusGeometry(0.112, 0.018, 10, 40);
  const top_glass_rim = new THREE.Mesh(top_glass_rimGeom, blue_glassMat);
  top_glass_rim.rotation.x = Math.PI / 2;
  top_glass_rim.position.y = 4.596;
  top_glass_rim.renderOrder = 3;
  bulb_assembly.add(top_glass_rim);

  const glass_stemProfile = [
    new THREE.Vector2(0.00, 1.43),
    new THREE.Vector2(0.12, 1.43),
    new THREE.Vector2(0.15, 1.52),
    new THREE.Vector2(0.23, 1.58),
    new THREE.Vector2(0.25, 1.70),
    new THREE.Vector2(0.22, 1.82),
    new THREE.Vector2(0.13, 1.90),
    new THREE.Vector2(0.09, 2.04),
    new THREE.Vector2(0.00, 2.08),
  ];
  const glass_stemGeom = new THREE.LatheGeometry(glass_stemProfile, 32);
  const glass_stem = new THREE.Mesh(glass_stemGeom, clear_glassMat);
  filament_assembly.add(glass_stem);

  const stem_pressGeom = new THREE.SphereGeometry(0.17, 24, 14);
  const stem_press = new THREE.Mesh(stem_pressGeom, clear_glassMat);
  stem_press.position.set(0, 1.72, 0.015);
  stem_press.scale.set(1.15, 0.82, 0.88);
  filament_assembly.add(stem_press);

  const central_glass_coreGeom = new THREE.CylinderGeometry(0.055, 0.07, 1.20, 16);
  const central_glass_core = new THREE.Mesh(central_glass_coreGeom, clear_glassMat);
  central_glass_core.position.y = 2.58;
  filament_assembly.add(central_glass_core);

  const upper_chamberGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.65, 24);
  const upper_chamber = new THREE.Mesh(upper_chamberGeom, clear_glassMat);
  upper_chamber.position.y = 3.30;
  filament_assembly.add(upper_chamber);

  const upper_chamber_lower_collarGeom = new THREE.TorusGeometry(0.145, 0.014, 8, 28);
  const upper_chamber_lower_collar = new THREE.Mesh(upper_chamber_lower_collarGeom, clear_glassMat);
  upper_chamber_lower_collar.rotation.x = Math.PI / 2;
  upper_chamber_lower_collar.position.y = 2.98;
  filament_assembly.add(upper_chamber_lower_collar);

  const upper_chamber_topGeom = new THREE.CylinderGeometry(0.19, 0.14, 0.075, 24);
  const upper_chamber_top = new THREE.Mesh(upper_chamber_topGeom, clear_glassMat);
  upper_chamber_top.position.y = 3.655;
  filament_assembly.add(upper_chamber_top);

  const upper_chamber_rimGeom = new THREE.TorusGeometry(0.18, 0.014, 8, 28);
  const upper_chamber_rim = new THREE.Mesh(upper_chamber_rimGeom, clear_glassMat);
  upper_chamber_rim.rotation.x = Math.PI / 2;
  upper_chamber_rim.position.y = 3.69;
  filament_assembly.add(upper_chamber_rim);

  const top_exhaust_neckGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.11, 16);
  const top_exhaust_neck = new THREE.Mesh(top_exhaust_neckGeom, clear_glassMat);
  top_exhaust_neck.position.y = 3.76;
  filament_assembly.add(top_exhaust_neck);

  const top_exhaust_capGeom = new THREE.SphereGeometry(0.07, 18, 10);
  const top_exhaust_cap = new THREE.Mesh(top_exhaust_capGeom, clear_glassMat);
  top_exhaust_cap.position.y = 3.82;
  top_exhaust_cap.scale.set(1.0, 0.48, 1.0);
  filament_assembly.add(top_exhaust_cap);

  const unitRodGeom = new THREE.CylinderGeometry(1, 1, 1, 8);
  const y_axis = new THREE.Vector3(0, 1, 0);

  function setRodInstance(instancedMesh, index, start, end, radius) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      y_axis,
      direction.clone().normalize()
    );
    const scale = new THREE.Vector3(radius, length, radius);
    const matrix = new THREE.Matrix4().compose(midpoint, quaternion, scale);
    instancedMesh.setMatrixAt(index, matrix);
  }

  const support_rodsData = [
    [
      new THREE.Vector3(-0.16, 1.82, 0.00),
      new THREE.Vector3(-0.23, 2.98, 0.00),
    ],
    [
      new THREE.Vector3(0.16, 1.82, 0.00),
      new THREE.Vector3(0.23, 2.98, 0.00),
    ],
    [
      new THREE.Vector3(-0.08, 1.90, -0.05),
      new THREE.Vector3(-0.12, 3.68, -0.05),
    ],
    [
      new THREE.Vector3(0.08, 1.90, -0.05),
      new THREE.Vector3(0.12, 3.68, -0.05),
    ],
    [
      new THREE.Vector3(-0.23, 2.98, 0.00),
      new THREE.Vector3(-0.12, 3.68, 0.00),
    ],
    [
      new THREE.Vector3(0.23, 2.98, 0.00),
      new THREE.Vector3(0.12, 3.68, 0.00),
    ],
  ];
  const support_rods = new THREE.InstancedMesh(
    unitRodGeom,
    dark_metalMat,
    support_rodsData.length
  );
  for (let i = 0; i < support_rodsData.length; i++) {
    setRodInstance(
      support_rods,
      i,
      support_rodsData[i][0],
      support_rodsData[i][1],
      0.009
    );
  }
  support_rods.instanceMatrix.needsUpdate = true;
  filament_assembly.add(support_rods);

  const filament_wireframeData = [
    [
      new THREE.Vector3(-0.20, 1.72, 0.10),
      new THREE.Vector3(-0.32, 2.05, 0.10),
    ],
    [
      new THREE.Vector3(-0.20, 1.72, 0.10),
      new THREE.Vector3(-0.30, 2.95, 0.10),
    ],
    [
      new THREE.Vector3(0.20, 1.72, 0.10),
      new THREE.Vector3(0.32, 2.05, 0.10),
    ],
    [
      new THREE.Vector3(0.20, 1.72, 0.10),
      new THREE.Vector3(0.30, 2.95, 0.10),
    ],
    [
      new THREE.Vector3(-0.12, 1.82, -0.08),
      new THREE.Vector3(-0.25, 2.72, -0.08),
    ],
    [
      new THREE.Vector3(0.12, 1.82, -0.08),
      new THREE.Vector3(0.25, 2.72, -0.08),
    ],
  ];
  const filament_wireframe = new THREE.InstancedMesh(
    unitRodGeom,
    dark_metalMat,
    filament_wireframeData.length
  );
  for (let i = 0; i < filament_wireframeData.length; i++) {
    setRodInstance(
      filament_wireframe,
      i,
      filament_wireframeData[i][0],
      filament_wireframeData[i][1],
      0.007
    );
  }
  filament_wireframe.instanceMatrix.needsUpdate = true;
  filament_assembly.add(filament_wireframe);

  const glowing_filaments = new THREE.Group();
  const filament_highlights = new THREE.Group();
  filament_assembly.add(glowing_filaments, filament_highlights);

  function addGlowingFilament(points, index) {
    const filamentCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );

    const filamentHaloGeom = new THREE.TubeGeometry(
      filamentCurve,
      36,
      0.045,
      8,
      false
    );
    const filament_halo = new THREE.Mesh(filamentHaloGeom, cyan_haloMat);
    filament_halo.name = "filament_halo_" + index;
    filament_halo.renderOrder = 1;
    glowing_filaments.add(filament_halo);

    const filamentGlowGeom = new THREE.TubeGeometry(
      filamentCurve,
      36,
      0.027,
      8,
      false
    );
    const filament_glow = new THREE.Mesh(filamentGlowGeom, cyan_glowMat);
    filament_glow.name = "filament_glow_" + index;
    glowing_filaments.add(filament_glow);

    const filamentCoreGeom = new THREE.TubeGeometry(
      filamentCurve,
      36,
      0.009,
      7,
      false
    );
    const filament_core = new THREE.Mesh(filamentCoreGeom, cyan_coreMat);
    filament_core.name = "filament_core_" + index;
    filament_highlights.add(filament_core);
  }

  const glowing_filamentsPaths = [
    [
      new THREE.Vector3(-0.28, 2.96, 0.12),
      new THREE.Vector3(-0.34, 2.70, 0.12),
      new THREE.Vector3(-0.20, 2.40, 0.12),
      new THREE.Vector3(-0.02, 2.10, 0.12),
      new THREE.Vector3(0.18, 1.78, 0.12),
    ],
    [
      new THREE.Vector3(-0.14, 2.98, 0.17),
      new THREE.Vector3(-0.18, 2.70, 0.17),
      new THREE.Vector3(-0.02, 2.40, 0.17),
      new THREE.Vector3(0.18, 2.10, 0.17),
      new THREE.Vector3(0.30, 1.82, 0.17),
    ],
    [
      new THREE.Vector3(0.02, 2.98, 0.04),
      new THREE.Vector3(0.08, 2.70, 0.04),
      new THREE.Vector3(0.25, 2.40, 0.04),
      new THREE.Vector3(0.36, 2.10, 0.04),
      new THREE.Vector3(0.25, 1.80, 0.04),
    ],
    [
      new THREE.Vector3(0.24, 2.94, 0.11),
      new THREE.Vector3(0.31, 2.68, 0.11),
      new THREE.Vector3(0.18, 2.38, 0.11),
      new THREE.Vector3(0.02, 2.08, 0.11),
      new THREE.Vector3(-0.15, 1.79, 0.11),
    ],
    [
      new THREE.Vector3(-0.30, 2.88, -0.10),
      new THREE.Vector3(-0.22, 2.60, -0.10),
      new THREE.Vector3(-0.05, 2.30, -0.10),
      new THREE.Vector3(0.15, 2.00, -0.10),
      new THREE.Vector3(0.28, 1.78, -0.10),
    ],
    [
      new THREE.Vector3(0.30, 2.88, -0.08),
      new THREE.Vector3(0.22, 2.60, -0.08),
      new THREE.Vector3(0.05, 2.30, -0.08),
      new THREE.Vector3(-0.15, 2.00, -0.08),
      new THREE.Vector3(-0.28, 1.78, -0.08),
    ],
  ];

  for (let i = 0; i < glowing_filamentsPaths.length; i++) {
    addGlowingFilament(glowing_filamentsPaths[i], i);
  }

  const filament_anchor_beadsGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const filament_anchor_beads = new THREE.InstancedMesh(
    filament_anchor_beadsGeom,
    cyan_glowMat,
    6
  );
  const anchor_positions = [
    new THREE.Vector3(-0.28, 2.96, 0.12),
    new THREE.Vector3(-0.14, 2.98, 0.17),
    new THREE.Vector3(0.02, 2.98, 0.04),
    new THREE.Vector3(0.24, 2.94, 0.11),
    new THREE.Vector3(-0.30, 2.88, -0.10),
    new THREE.Vector3(0.30, 2.88, -0.08),
  ];
  for (let i = 0; i < anchor_positions.length; i++) {
    const anchorMatrix = new THREE.Matrix4().makeTranslation(
      anchor_positions[i].x,
      anchor_positions[i].y,
      anchor_positions[i].z
    );
    filament_anchor_beads.setMatrixAt(i, anchorMatrix);
  }
  filament_anchor_beads.instanceMatrix.needsUpdate = true;
  filament_assembly.add(filament_anchor_beads);

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