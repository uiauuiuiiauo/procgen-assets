export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "light_bulb";

  const glass_globeMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf2ef,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const screw_baseMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const brass_wireMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.3
  });

  const filament_rodsMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c7,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xfff0b0,
    emissiveIntensity: 1.0
  });

  const filament_glowMat = new THREE.MeshStandardMaterial({
    color: 0xffd36b,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffc85a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });

  const contact_insulatorMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });

  const glass_globeProfile = [
    new THREE.Vector2(0.50, -0.53),
    new THREE.Vector2(0.66, -0.45),
    new THREE.Vector2(0.86, -0.30),
    new THREE.Vector2(1.06, -0.05),
    new THREE.Vector2(1.18, 0.25),
    new THREE.Vector2(1.20, 0.55),
    new THREE.Vector2(1.12, 0.85),
    new THREE.Vector2(0.94, 1.12),
    new THREE.Vector2(0.68, 1.33),
    new THREE.Vector2(0.38, 1.45),
    new THREE.Vector2(0.12, 1.50),
    new THREE.Vector2(0.00, 1.51)
  ];
  const glass_globeGeom = new THREE.LatheGeometry(glass_globeProfile, 64);
  const glass_globe = new THREE.Mesh(glass_globeGeom, glass_globeMat);
  glass_globe.name = "glass_globe";
  root.add(glass_globe);

  const screw_baseProfile = [
    new THREE.Vector2(0.00, -1.24),
    new THREE.Vector2(0.35, -1.24),
    new THREE.Vector2(0.42, -1.19),
    new THREE.Vector2(0.46, -1.10),
    new THREE.Vector2(0.48, -1.01),
    new THREE.Vector2(0.47, -0.94),
    new THREE.Vector2(0.43, -0.88),
    new THREE.Vector2(0.43, -0.82),
    new THREE.Vector2(0.48, -0.77),
    new THREE.Vector2(0.48, -0.71),
    new THREE.Vector2(0.43, -0.66),
    new THREE.Vector2(0.43, -0.60),
    new THREE.Vector2(0.48, -0.55),
    new THREE.Vector2(0.49, -0.49),
    new THREE.Vector2(0.49, -0.30),
    new THREE.Vector2(0.51, -0.25),
    new THREE.Vector2(0.52, -0.20),
    new THREE.Vector2(0.50, -0.15),
    new THREE.Vector2(0.43, -0.13),
    new THREE.Vector2(0.00, -0.13)
  ];
  const screw_baseGeom = new THREE.LatheGeometry(screw_baseProfile, 48);
  const screw_base = new THREE.Mesh(screw_baseGeom, screw_baseMat);
  screw_base.name = "screw_base";
  root.add(screw_base);

  const screw_threadsGeom = new THREE.TorusGeometry(0.445, 0.034, 10, 48);
  const screw_threads = new THREE.InstancedMesh(
    screw_threadsGeom,
    screw_baseMat,
    3
  );
  screw_threads.name = "screw_threads";
  const thread_transform = new THREE.Object3D();
  const thread_heights = [-1.08, -0.84, -0.61];
  for (let i = 0; i < thread_heights.length; i++) {
    thread_transform.position.set(0, thread_heights[i], 0);
    thread_transform.rotation.set(Math.PI / 2, 0, 0);
    thread_transform.scale.set(1, 1, 1);
    thread_transform.updateMatrix();
    screw_threads.setMatrixAt(i, thread_transform.matrix);
  }
  screw_threads.instanceMatrix.needsUpdate = true;
  root.add(screw_threads);

  const base_top_rimGeom = new THREE.TorusGeometry(0.485, 0.035, 12, 48);
  const base_top_rim = new THREE.Mesh(base_top_rimGeom, screw_baseMat);
  base_top_rim.name = "base_top_rim";
  base_top_rim.rotation.x = Math.PI / 2;
  base_top_rim.position.y = -0.18;
  root.add(base_top_rim);

  const base_inner_plateGeom = new THREE.CylinderGeometry(
    0.445,
    0.445,
    0.025,
    48
  );
  const base_inner_plate = new THREE.Mesh(
    base_inner_plateGeom,
    screw_baseMat
  );
  base_inner_plate.name = "base_inner_plate";
  base_inner_plate.position.y = -0.115;
  root.add(base_inner_plate);

  const contact_insulatorGeom = new THREE.CylinderGeometry(
    0.28,
    0.23,
    0.16,
    32
  );
  const contact_insulator = new THREE.Mesh(
    contact_insulatorGeom,
    contact_insulatorMat
  );
  contact_insulator.name = "contact_insulator";
  contact_insulator.position.y = -1.30;
  root.add(contact_insulator);

  const bottom_contactGeom = new THREE.CylinderGeometry(
    0.15,
    0.13,
    0.045,
    24
  );
  const bottom_contact = new THREE.Mesh(bottom_contactGeom, screw_baseMat);
  bottom_contact.name = "bottom_contact";
  bottom_contact.position.y = -1.39;
  root.add(bottom_contact);

  const side_contactGeom = new THREE.CylinderGeometry(
    0.085,
    0.085,
    0.026,
    24
  );
  const side_contact = new THREE.Mesh(side_contactGeom, screw_baseMat);
  side_contact.name = "side_contact";
  side_contact.position.set(0.29, -0.085, 0.02);
  root.add(side_contact);

  const side_contact_rimGeom = new THREE.TorusGeometry(
    0.072,
    0.011,
    8,
    24
  );
  const side_contact_rim = new THREE.Mesh(
    side_contact_rimGeom,
    brass_wireMat
  );
  side_contact_rim.name = "side_contact_rim";
  side_contact_rim.rotation.x = Math.PI / 2;
  side_contact_rim.position.set(0.29, -0.067, 0.02);
  root.add(side_contact_rim);

  function makeWire(name, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      20,
      radius,
      6,
      false
    );
    const wire = new THREE.Mesh(geometry, material);
    wire.name = name;
    return wire;
  }

  const central_stemGeom = new THREE.CylinderGeometry(
    0.034,
    0.043,
    0.60,
    16
  );
  const central_stem = new THREE.Mesh(
    central_stemGeom,
    glass_globeMat
  );
  central_stem.name = "central_stem";
  central_stem.position.y = 0.18;
  root.add(central_stem);

  const stem_flareGeom = new THREE.CylinderGeometry(
    0.09,
    0.045,
    0.18,
    18
  );
  const stem_flare = new THREE.Mesh(stem_flareGeom, glass_globeMat);
  stem_flare.name = "stem_flare";
  stem_flare.position.y = 0.47;
  root.add(stem_flare);

  const stem_flare_rimGeom = new THREE.TorusGeometry(
    0.083,
    0.010,
    8,
    24
  );
  const stem_flare_rim = new THREE.Mesh(
    stem_flare_rimGeom,
    brass_wireMat
  );
  stem_flare_rim.name = "stem_flare_rim";
  stem_flare_rim.rotation.x = Math.PI / 2;
  stem_flare_rim.position.y = 0.555;
  root.add(stem_flare_rim);

  const central_support_wire = makeWire(
    "central_support_wire",
    [
      new THREE.Vector3(0.00, -0.10, 0.00),
      new THREE.Vector3(0.00, 0.28, 0.00),
      new THREE.Vector3(0.00, 0.55, 0.00),
      new THREE.Vector3(0.00, 1.39, 0.00)
    ],
    0.009,
    brass_wireMat
  );
  root.add(central_support_wire);

  const left_support_wire = makeWire(
    "left_support_wire",
    [
      new THREE.Vector3(-0.16, -0.10, 0.00),
      new THREE.Vector3(-0.18, 0.20, 0.00),
      new THREE.Vector3(-0.29, 0.50, 0.00),
      new THREE.Vector3(-0.27, 0.70, 0.00)
    ],
    0.009,
    brass_wireMat
  );
  root.add(left_support_wire);

  const right_support_wire = makeWire(
    "right_support_wire",
    [
      new THREE.Vector3(0.16, -0.10, 0.00),
      new THREE.Vector3(0.18, 0.20, 0.00),
      new THREE.Vector3(0.29, 0.50, 0.00),
      new THREE.Vector3(0.27, 0.70, 0.00)
    ],
    0.009,
    brass_wireMat
  );
  root.add(right_support_wire);

  const rear_left_support_wire = makeWire(
    "rear_left_support_wire",
    [
      new THREE.Vector3(-0.08, -0.10, -0.12),
      new THREE.Vector3(-0.12, 0.22, -0.13),
      new THREE.Vector3(-0.18, 0.51, -0.14),
      new THREE.Vector3(-0.17, 0.68, -0.14)
    ],
    0.008,
    brass_wireMat
  );
  root.add(rear_left_support_wire);

  const rear_right_support_wire = makeWire(
    "rear_right_support_wire",
    [
      new THREE.Vector3(0.08, -0.10, -0.12),
      new THREE.Vector3(0.12, 0.22, -0.13),
      new THREE.Vector3(0.18, 0.51, -0.14),
      new THREE.Vector3(0.17, 0.68, -0.14)
    ],
    0.008,
    brass_wireMat
  );
  root.add(rear_right_support_wire);

  const lower_support_loop = makeWire(
    "lower_support_loop",
    [
      new THREE.Vector3(-0.29, 0.50, 0.00),
      new THREE.Vector3(-0.15, 0.58, 0.00),
      new THREE.Vector3(0.00, 0.54, 0.00),
      new THREE.Vector3(0.15, 0.58, 0.00),
      new THREE.Vector3(0.29, 0.50, 0.00)
    ],
    0.009,
    brass_wireMat
  );
  root.add(lower_support_loop);

  const upper_crown_loop = makeWire(
    "upper_crown_loop",
    [
      new THREE.Vector3(-0.27, 1.34, 0.00),
      new THREE.Vector3(-0.18, 1.46, 0.00),
      new THREE.Vector3(0.00, 1.49, 0.00),
      new THREE.Vector3(0.18, 1.46, 0.00),
      new THREE.Vector3(0.27, 1.34, 0.00)
    ],
    0.010,
    brass_wireMat
  );
  root.add(upper_crown_loop);

  const upper_left_brace = makeWire(
    "upper_left_brace",
    [
      new THREE.Vector3(-0.27, 0.70, 0.00),
      new THREE.Vector3(-0.28, 1.14, 0.00),
      new THREE.Vector3(-0.27, 1.34, 0.00),
      new THREE.Vector3(-0.16, 1.39, 0.00)
    ],
    0.008,
    brass_wireMat
  );
  root.add(upper_left_brace);

  const upper_right_brace = makeWire(
    "upper_right_brace",
    [
      new THREE.Vector3(0.27, 0.70, 0.00),
      new THREE.Vector3(0.28, 1.14, 0.00),
      new THREE.Vector3(0.27, 1.34, 0.00),
      new THREE.Vector3(0.16, 1.39, 0.00)
    ],
    0.008,
    brass_wireMat
  );
  root.add(upper_right_brace);

  const rear_upper_crossbar = makeWire(
    "rear_upper_crossbar",
    [
      new THREE.Vector3(-0.17, 1.34, -0.14),
      new THREE.Vector3(0.00, 1.38, -0.14),
      new THREE.Vector3(0.17, 1.34, -0.14)
    ],
    0.007,
    brass_wireMat
  );
  root.add(rear_upper_crossbar);

  const rear_lower_crossbar = makeWire(
    "rear_lower_crossbar",
    [
      new THREE.Vector3(-0.18, 0.51, -0.14),
      new THREE.Vector3(0.00, 0.56, -0.14),
      new THREE.Vector3(0.18, 0.51, -0.14)
    ],
    0.007,
    brass_wireMat
  );
  root.add(rear_lower_crossbar);

  const filament_positions = [
    [-0.27, 0.00],
    [0.27, 0.00],
    [0.00, 0.14],
    [0.00, -0.14]
  ];

  const filament_rodsGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.72,
    12
  );
  const filament_rods = new THREE.InstancedMesh(
    filament_rodsGeom,
    filament_rodsMat,
    filament_positions.length
  );
  filament_rods.name = "filament_rods";

  const filament_glowGeom = new THREE.CylinderGeometry(
    0.046,
    0.046,
    0.75,
    12
  );
  const filament_glow = new THREE.InstancedMesh(
    filament_glowGeom,
    filament_glowMat,
    filament_positions.length
  );
  filament_glow.name = "filament_glow";

  const filament_capsGeom = new THREE.SphereGeometry(0.038, 12, 8);
  const filament_caps = new THREE.InstancedMesh(
    filament_capsGeom,
    filament_rodsMat,
    filament_positions.length * 2
  );
  filament_caps.name = "filament_caps";

  const filament_transform = new THREE.Object3D();
  for (let i = 0; i < filament_positions.length; i++) {
    const x = filament_positions[i][0];
    const z = filament_positions[i][1];

    filament_transform.position.set(x, 1.02, z);
    filament_transform.rotation.set(0, 0, 0);
    filament_transform.scale.set(1, 1, 1);
    filament_transform.updateMatrix();
    filament_rods.setMatrixAt(i, filament_transform.matrix);
    filament_glow.setMatrixAt(i, filament_transform.matrix);

    filament_transform.position.set(x, 0.655, z);
    filament_transform.scale.set(1, 0.72, 1);
    filament_transform.updateMatrix();
    filament_caps.setMatrixAt(i * 2, filament_transform.matrix);

    filament_transform.position.set(x, 1.385, z);
    filament_transform.scale.set(1, 0.72, 1);
    filament_transform.updateMatrix();
    filament_caps.setMatrixAt(i * 2 + 1, filament_transform.matrix);
  }
  filament_rods.instanceMatrix.needsUpdate = true;
  filament_glow.instanceMatrix.needsUpdate = true;
  filament_caps.instanceMatrix.needsUpdate = true;
  root.add(filament_glow);
  root.add(filament_rods);
  root.add(filament_caps);

  const lower_filament_connectors = new THREE.Group();
  lower_filament_connectors.name = "lower_filament_connectors";
  for (let i = 0; i < filament_positions.length; i++) {
    const x = filament_positions[i][0];
    const z = filament_positions[i][1];
    const lower_connector = makeWire(
      "lower_filament_connector_" + i,
      [
        new THREE.Vector3(x * 0.42, 0.50, z * 0.42),
        new THREE.Vector3(x * 0.75, 0.57, z * 0.75),
        new THREE.Vector3(x, 0.655, z)
      ],
      0.007,
      brass_wireMat
    );
    lower_filament_connectors.add(lower_connector);
  }
  root.add(lower_filament_connectors);

  const upper_filament_connectors = new THREE.Group();
  upper_filament_connectors.name = "upper_filament_connectors";
  for (let i = 0; i < filament_positions.length; i++) {
    const x = filament_positions[i][0];
    const z = filament_positions[i][1];
    const upper_connector = makeWire(
      "upper_filament_connector_" + i,
      [
        new THREE.Vector3(x, 1.385, z),
        new THREE.Vector3(x * 0.78, 1.43, z * 0.78),
        new THREE.Vector3(x * 0.45, 1.475, z * 0.45)
      ],
      0.007,
      brass_wireMat
    );
    upper_filament_connectors.add(upper_connector);
  }
  root.add(upper_filament_connectors);

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