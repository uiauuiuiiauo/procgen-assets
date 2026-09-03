export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "strebe_neon_sign";

  const plaqueW = 6.8;
  const plaqueH = 1.75;
  const plaqueR = 0.68;
  const plaqueDepth = 0.16;
  const plaqueBevel = 0.05;
  const plaqueFrontZ = plaqueDepth / 2 + plaqueBevel;
  const neonZ = 0.235;
  const neonRadius = 0.052;

  const plaqueMat = new THREE.MeshStandardMaterial({
    color: 0x701c78,
    metalness: 0.0,
    roughness: 0.3,
  });
  const backingMat = new THREE.MeshStandardMaterial({
    color: 0x351044,
    metalness: 0.0,
    roughness: 0.8,
  });
  const pink_neonMat = new THREE.MeshStandardMaterial({
    color: 0xff4bd8,
    emissive: 0xff4bd8,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pink_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffeefb,
    emissive: 0xffeefb,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cyan_neonMat = new THREE.MeshStandardMaterial({
    color: 0x28dfff,
    emissive: 0x28dfff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cyan_coreMat = new THREE.MeshStandardMaterial({
    color: 0xe8ffff,
    emissive: 0xe8ffff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pink_glowMat = new THREE.MeshBasicMaterial({
    color: 0xff19c8,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const cyan_glowMat = new THREE.MeshBasicMaterial({
    color: 0x18cfff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const cableMat = new THREE.MeshStandardMaterial({
    color: 0x24152e,
    metalness: 0.0,
    roughness: 0.8,
  });
  const clipMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const halfW = plaqueW / 2;
  const halfH = plaqueH / 2;
  const plaqueShape = new THREE.Shape();
  plaqueShape.moveTo(-halfW + plaqueR, -halfH);
  plaqueShape.lineTo(halfW - plaqueR, -halfH);
  plaqueShape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + plaqueR);
  plaqueShape.lineTo(halfW, halfH - plaqueR);
  plaqueShape.quadraticCurveTo(halfW, halfH, halfW - plaqueR, halfH);
  plaqueShape.lineTo(-halfW + plaqueR, halfH);
  plaqueShape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - plaqueR);
  plaqueShape.lineTo(-halfW, -halfH + plaqueR);
  plaqueShape.quadraticCurveTo(-halfW, -halfH, -halfW + plaqueR, -halfH);

  const plaqueGeom = new THREE.ExtrudeGeometry(plaqueShape, {
    depth: plaqueDepth,
    steps: 1,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: plaqueBevel,
    bevelSize: 0.055,
    bevelSegments: 3,
  });
  const plaque = new THREE.Mesh(plaqueGeom, plaqueMat);
  plaque.name = "plaque";
  plaque.position.z = -plaqueDepth / 2;
  root.add(plaque);

  const rear_backingGeom = new THREE.BoxGeometry(6.15, 1.12, 0.07);
  const rear_backing = new THREE.Mesh(rear_backingGeom, backingMat);
  rear_backing.name = "rear_backing";
  rear_backing.position.z = -0.145;
  root.add(rear_backing);

  const pink_glowGeom = new THREE.CircleGeometry(1.55, 48);
  const pink_glow = new THREE.Mesh(pink_glowGeom, pink_glowMat);
  pink_glow.name = "pink_glow";
  pink_glow.position.set(-2.15, -0.02, plaqueFrontZ + 0.004);
  pink_glow.scale.set(1.0, 0.5, 1);
  root.add(pink_glow);

  const cyan_glowGeom = new THREE.CircleGeometry(1.75, 48);
  const cyan_glow = new THREE.Mesh(cyan_glowGeom, cyan_glowMat);
  cyan_glow.name = "cyan_glow";
  cyan_glow.position.set(1.55, -0.02, plaqueFrontZ + 0.005);
  cyan_glow.scale.set(1.25, 0.48, 1);
  root.add(cyan_glow);

  function makeCurve(coords) {
    const points = coords.map((point) => new THREE.Vector3(point[0], point[1], 0));
    return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
  }

  function addNeonStroke(parent, name, coords, outerMat, coreMat, glowMat) {
    const curve = makeCurve(coords);
    const tubularSegments = Math.max(32, coords.length * 8);

    const stroke = new THREE.Group();
    stroke.name = name;

    const glowGeom = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      0.145,
      10,
      false
    );
    const glow = new THREE.Mesh(glowGeom, glowMat);
    glow.name = name + "_glow";
    glow.position.z = 0.155;
    glow.scale.z = 0.16;
    stroke.add(glow);

    const outerGeom = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      neonRadius,
      12,
      false
    );
    const outer_tube = new THREE.Mesh(outerGeom, outerMat);
    outer_tube.name = name + "_outer_tube";
    outer_tube.position.z = neonZ;
    stroke.add(outer_tube);

    const coreGeom = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      0.019,
      8,
      false
    );
    const bright_core = new THREE.Mesh(coreGeom, coreMat);
    bright_core.name = name + "_bright_core";
    bright_core.position.z = neonZ + 0.044;
    stroke.add(bright_core);

    parent.add(stroke);
    return stroke;
  }

  function addCable(parent, name, coords) {
    const curve = makeCurve(coords);
    const cableGeom = new THREE.TubeGeometry(
      curve,
      Math.max(24, coords.length * 7),
      0.018,
      7,
      false
    );
    const cable = new THREE.Mesh(cableGeom, cableMat);
    cable.name = name;
    cable.position.z = 0.145;
    parent.add(cable);
    return cable;
  }

  const pink_neon_word = new THREE.Group();
  pink_neon_word.name = "pink_neon_word";
  root.add(pink_neon_word);

  const pink_s_neon = addNeonStroke(
    pink_neon_word,
    "pink_s_neon",
    [
      [-1.08, 0.3],
      [-1.35, 0.48],
      [-1.92, 0.53],
      [-2.48, 0.48],
      [-2.86, 0.28],
      [-2.91, 0.06],
      [-2.66, -0.08],
      [-2.12, -0.14],
      [-1.58, -0.2],
      [-1.23, -0.38],
      [-1.16, -0.59],
      [-1.42, -0.76],
      [-2.02, -0.82],
      [-2.58, -0.78],
      [-2.92, -0.62],
      [-3.02, -0.43],
      [-2.9, -0.34],
    ],
    pink_neonMat,
    pink_coreMat,
    pink_glowMat
  );

  const pink_t_neon = addNeonStroke(
    pink_neon_word,
    "pink_t_neon",
    [
      [-1.5, -0.67],
      [-1.39, -0.58],
      [-1.31, -0.25],
      [-1.22, 0.14],
      [-1.13, 0.5],
      [-1.08, 0.25],
      [-1.16, -0.18],
      [-1.22, -0.52],
      [-1.08, -0.66],
      [-0.91, -0.58],
    ],
    pink_neonMat,
    pink_coreMat,
    pink_glowMat
  );

  const pink_crossbar_neon = addNeonStroke(
    pink_neon_word,
    "pink_crossbar_neon",
    [
      [-1.48, 0.04],
      [-1.28, 0.09],
      [-1.05, 0.11],
      [-0.83, 0.13],
    ],
    pink_neonMat,
    pink_coreMat,
    pink_glowMat
  );

  const cyan_neon_word = new THREE.Group();
  cyan_neon_word.name = "cyan_neon_word";
  root.add(cyan_neon_word);

  const cyan_first_letter_neon = addNeonStroke(
    cyan_neon_word,
    "cyan_first_letter_neon",
    [
      [-0.96, -0.57],
      [-0.84, -0.5],
      [-0.78, -0.16],
      [-0.7, 0.16],
      [-0.62, -0.2],
      [-0.55, -0.49],
      [-0.4, -0.57],
      [-0.25, -0.43],
      [-0.2, -0.12],
      [-0.22, -0.43],
      [-0.12, -0.55],
      [0.01, -0.45],
    ],
    cyan_neonMat,
    cyan_coreMat,
    cyan_glowMat
  );

  const cyan_second_letter_neon = addNeonStroke(
    cyan_neon_word,
    "cyan_second_letter_neon",
    [
      [-0.03, -0.45],
      [0.08, -0.38],
      [0.17, -0.08],
      [0.28, 0.22],
      [0.4, 0.43],
      [0.48, 0.38],
      [0.43, 0.16],
      [0.28, -0.22],
      [0.2, -0.48],
      [0.32, -0.56],
      [0.49, -0.39],
      [0.62, -0.15],
    ],
    cyan_neonMat,
    cyan_coreMat,
    cyan_glowMat
  );

  const cyan_middle_neon = addNeonStroke(
    cyan_neon_word,
    "cyan_middle_neon",
    [
      [0.58, -0.18],
      [0.68, -0.1],
      [0.77, 0.18],
      [0.88, 0.43],
      [0.98, 0.36],
      [0.96, 0.12],
      [0.84, -0.38],
      [0.88, -0.52],
      [1.02, -0.48],
      [1.16, -0.22],
    ],
    cyan_neonMat,
    cyan_coreMat,
    cyan_glowMat
  );

  const cyan_b_neon = addNeonStroke(
    cyan_neon_word,
    "cyan_b_neon",
    [
      [1.1, -0.24],
      [1.2, -0.1],
      [1.28, 0.2],
      [1.38, 0.48],
      [1.48, 0.53],
      [1.52, 0.38],
      [1.42, 0.08],
      [1.28, -0.34],
      [1.32, -0.49],
      [1.48, -0.4],
      [1.62, -0.15],
      [1.78, 0.1],
      [1.96, 0.18],
      [2.08, 0.08],
      [2.04, -0.15],
      [1.9, -0.42],
      [1.98, -0.52],
      [2.16, -0.42],
    ],
    cyan_neonMat,
    cyan_coreMat,
    cyan_glowMat
  );

  const cyan_e_neon = addNeonStroke(
    cyan_neon_word,
    "cyan_e_neon",
    [
      [2.1, -0.42],
      [2.22, -0.34],
      [2.38, -0.12],
      [2.62, 0.1],
      [2.82, 0.18],
      [2.9, 0.08],
      [2.82, -0.08],
      [2.58, -0.12],
      [2.38, -0.28],
      [2.4, -0.46],
      [2.62, -0.55],
      [2.9, -0.5],
      [3.08, -0.3],
      [3.12, -0.08],
    ],
    cyan_neonMat,
    cyan_coreMat,
    cyan_glowMat
  );

  const cyan_final_flourish_neon = addNeonStroke(
    cyan_neon_word,
    "cyan_final_flourish_neon",
    [
      [2.62, 0.1],
      [2.76, 0.3],
      [2.96, 0.43],
      [3.12, 0.38],
      [3.16, 0.22],
      [3.08, 0.02],
      [3.03, -0.24],
      [3.08, -0.46],
      [3.2, -0.52],
    ],
    cyan_neonMat,
    cyan_coreMat,
    cyan_glowMat
  );

  const neon_endpoints = [
    [-1.08, 0.3],
    [-2.9, -0.34],
    [-1.5, -0.67],
    [-0.91, -0.58],
    [-1.48, 0.04],
    [-0.83, 0.13],
    [-0.96, -0.57],
    [0.01, -0.45],
    [-0.03, -0.45],
    [0.62, -0.15],
    [0.58, -0.18],
    [1.16, -0.22],
    [1.1, -0.24],
    [2.16, -0.42],
    [2.1, -0.42],
    [3.2, -0.52],
  ];

  const neon_end_glowGeom = new THREE.SphereGeometry(0.14, 12, 8);
  const neon_end_glow = new THREE.InstancedMesh(
    neon_end_glowGeom,
    cyan_glowMat,
    neon_endpoints.length
  );
  neon_end_glow.name = "neon_end_glow";

  const neon_end_outerGeom = new THREE.SphereGeometry(neonRadius, 14, 10);
  const neon_end_outer = new THREE.InstancedMesh(
    neon_end_outerGeom,
    cyan_neonMat,
    neon_endpoints.length
  );
  neon_end_outer.name = "neon_end_outer";

  const neon_end_coreGeom = new THREE.SphereGeometry(0.019, 10, 7);
  const neon_end_core = new THREE.InstancedMesh(
    neon_end_coreGeom,
    cyan_coreMat,
    neon_endpoints.length
  );
  neon_end_core.name = "neon_end_core";

  const endpoint_dummy = new THREE.Object3D();
  for (let i = 0; i < neon_endpoints.length; i++) {
    const point = neon_endpoints[i];

    endpoint_dummy.position.set(point[0], point[1], 0.155);
    endpoint_dummy.quaternion.identity();
    endpoint_dummy.scale.set(1, 1, 0.16);
    endpoint_dummy.updateMatrix();
    neon_end_glow.setMatrixAt(i, endpoint_dummy.matrix);

    endpoint_dummy.position.set(point[0], point[1], neonZ);
    endpoint_dummy.quaternion.identity();
    endpoint_dummy.scale.set(1, 1, 1);
    endpoint_dummy.updateMatrix();
    neon_end_outer.setMatrixAt(i, endpoint_dummy.matrix);

    endpoint_dummy.position.set(point[0], point[1], neonZ + 0.044);
    endpoint_dummy.updateMatrix();
    neon_end_core.setMatrixAt(i, endpoint_dummy.matrix);
  }
  neon_end_glow.instanceMatrix.needsUpdate = true;
  neon_end_outer.instanceMatrix.needsUpdate = true;
  neon_end_core.instanceMatrix.needsUpdate = true;
  root.add(neon_end_glow, neon_end_outer, neon_end_core);

  const pink_endpoint_overrides = [0, 1, 2, 3, 4];
  const pink_end_outerGeom = neon_end_outerGeom;
  const pink_end_outer = new THREE.InstancedMesh(
    pink_end_outerGeom,
    pink_neonMat,
    pink_endpoint_overrides.length
  );
  pink_end_outer.name = "pink_end_outer";

  const pink_end_coreGeom = neon_end_coreGeom;
  const pink_end_core = new THREE.InstancedMesh(
    pink_end_coreGeom,
    pink_coreMat,
    pink_endpoint_overrides.length
  );
  pink_end_core.name = "pink_end_core";

  for (let i = 0; i < pink_endpoint_overrides.length; i++) {
    const point = neon_endpoints[pink_endpoint_overrides[i]];

    endpoint_dummy.position.set(point[0], point[1], neonZ);
    endpoint_dummy.quaternion.identity();
    endpoint_dummy.scale.set(1, 1, 1);
    endpoint_dummy.updateMatrix();
    pink_end_outer.setMatrixAt(i, endpoint_dummy.matrix);

    endpoint_dummy.position.set(point[0], point[1], neonZ + 0.044);
    endpoint_dummy.updateMatrix();
    pink_end_core.setMatrixAt(i, endpoint_dummy.matrix);
  }
  pink_end_outer.instanceMatrix.needsUpdate = true;
  pink_end_core.instanceMatrix.needsUpdate = true;
  root.add(pink_end_outer, pink_end_core);

  const wiring_group = new THREE.Group();
  wiring_group.name = "wiring_group";
  root.add(wiring_group);

  const upper_power_cable = addCable(
    wiring_group,
    "upper_power_cable",
    [
      [0.42, 0.52],
      [0.58, 0.72],
      [0.82, 0.78],
      [1.02, 0.69],
      [1.16, 0.48],
      [1.35, 0.42],
    ]
  );

  const lower_power_cable = addCable(
    wiring_group,
    "lower_power_cable",
    [
      [-1.28, -0.62],
      [-1.12, -0.76],
      [-0.88, -0.78],
      [-0.72, -0.68],
      [-0.62, -0.5],
    ]
  );

  const clip_positions = [
    [-2.55, 0.47],
    [-2.84, -0.58],
    [-1.27, -0.28],
    [-0.7, -0.12],
    [0.25, 0.18],
    [0.9, 0.34],
    [1.42, 0.3],
    [1.96, 0.12],
    [2.72, 0.13],
  ];

  const mounting_clipGeom = new THREE.BoxGeometry(0.18, 0.055, 0.045);
  const mounting_clips = new THREE.InstancedMesh(
    mounting_clipGeom,
    clipMat,
    clip_positions.length
  );
  mounting_clips.name = "mounting_clips";

  const mounting_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.025, 12);
  const mounting_screws = new THREE.InstancedMesh(
    mounting_screwGeom,
    screwMat,
    clip_positions.length
  );
  mounting_screws.name = "mounting_screws";

  const clip_dummy = new THREE.Object3D();
  for (let i = 0; i < clip_positions.length; i++) {
    const point = clip_positions[i];
    const angle = (i % 3 - 1) * 0.28;

    clip_dummy.position.set(point[0], point[1], 0.185);
    clip_dummy.rotation.set(0, 0, angle);
    clip_dummy.scale.set(1, 1, 1);
    clip_dummy.updateMatrix();
    mounting_clips.setMatrixAt(i, clip_dummy.matrix);

    clip_dummy.position.set(point[0], point[1], 0.216);
    clip_dummy.rotation.set(Math.PI / 2, 0, 0);
    clip_dummy.updateMatrix();
    mounting_screws.setMatrixAt(i, clip_dummy.matrix);
  }
  mounting_clips.instanceMatrix.needsUpdate = true;
  mounting_screws.instanceMatrix.needsUpdate = true;
  root.add(mounting_clips, mounting_screws);

  const foot_positions = [
    [-2.75, -0.84],
    [2.75, -0.84],
  ];
  const footGeom = new THREE.CylinderGeometry(0.12, 0.13, 0.12, 16);
  const feet = new THREE.InstancedMesh(footGeom, backingMat, foot_positions.length);
  feet.name = "feet";

  const foot_dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    foot_dummy.position.set(foot_positions[i][0], foot_positions[i][1], -0.1);
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.scale.set(1, 1, 1);
    foot_dummy.updateMatrix();
    feet.setMatrixAt(i, foot_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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

  fitToUnitCube(root);
  return root;
}