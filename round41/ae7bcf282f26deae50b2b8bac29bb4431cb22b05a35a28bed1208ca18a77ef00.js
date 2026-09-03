export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "iridescent_glass_orb";

  const orbRadius = 1.0;
  const glass_shellGeom = new THREE.SphereGeometry(orbRadius, 64, 40);
  const glass_shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8e3ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });
  const glass_shell = new THREE.Mesh(glass_shellGeom, glass_shellMat);
  glass_shell.name = "glass_shell";
  glass_shell.renderOrder = 3;
  root.add(glass_shell);

  const glass_rimGeom = new THREE.TorusGeometry(0.978, 0.018, 12, 96);
  const glass_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8cfee,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });
  const glass_rim = new THREE.Mesh(glass_rimGeom, glass_rimMat);
  glass_rim.name = "glass_rim";
  glass_rim.renderOrder = 3.5;
  root.add(glass_rim);

  const inner_atmosphereGeom = new THREE.SphereGeometry(0.94, 48, 32);
  const inner_atmosphereMat = new THREE.MeshStandardMaterial({
    color: 0x77748f,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.055,
    depthWrite: false
  });
  const inner_atmosphere = new THREE.Mesh(inner_atmosphereGeom, inner_atmosphereMat);
  inner_atmosphere.name = "inner_atmosphere";
  inner_atmosphere.renderOrder = 1;
  root.add(inner_atmosphere);

  const lower_hazeGeom = new THREE.SphereGeometry(0.73, 40, 24);
  const lower_hazeMat = new THREE.MeshStandardMaterial({
    color: 0xb9a8e5,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.12,
    depthWrite: false
  });
  const lower_haze = new THREE.Mesh(lower_hazeGeom, lower_hazeMat);
  lower_haze.name = "lower_haze";
  lower_haze.position.set(0, -0.28, 0.02);
  lower_haze.scale.set(1.12, 0.72, 0.96);
  lower_haze.renderOrder = 1.2;
  root.add(lower_haze);

  const lower_milky_bandGeom = new THREE.SphereGeometry(0.72, 40, 20);
  const lower_milky_bandMat = new THREE.MeshStandardMaterial({
    color: 0xe2d9ff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.13,
    depthWrite: false
  });
  const lower_milky_band = new THREE.Mesh(lower_milky_bandGeom, lower_milky_bandMat);
  lower_milky_band.name = "lower_milky_band";
  lower_milky_band.position.set(0.02, -0.43, 0.08);
  lower_milky_band.scale.set(1.22, 0.31, 1.0);
  lower_milky_band.renderOrder = 1.35;
  root.add(lower_milky_band);

  const central_violet_hazeGeom = new THREE.SphereGeometry(0.55, 36, 20);
  const central_violet_hazeMat = new THREE.MeshStandardMaterial({
    color: 0x75658f,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.16,
    depthWrite: false
  });
  const central_violet_haze = new THREE.Mesh(central_violet_hazeGeom, central_violet_hazeMat);
  central_violet_haze.name = "central_violet_haze";
  central_violet_haze.position.set(0.03, -0.06, 0.08);
  central_violet_haze.scale.set(0.9, 1.18, 0.82);
  central_violet_haze.renderOrder = 1.4;
  root.add(central_violet_haze);

  const nebula_clouds = new THREE.Group();
  nebula_clouds.name = "nebula_clouds";
  root.add(nebula_clouds);

  const cloudGeom = new THREE.SphereGeometry(1, 28, 18);

  function createCloudMaterial(color, opacity) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.7,
      emissive: color,
      emissiveIntensity: 0.55,
      transparent: true,
      opacity,
      depthWrite: false
    });
  }

  function createCloud(name, material, x, y, z, sx, sy, sz, rx, ry, rz) {
    const cloud = new THREE.Mesh(cloudGeom, material);
    cloud.name = name;
    cloud.position.set(x, y, z);
    cloud.scale.set(sx, sy, sz);
    cloud.rotation.set(rx, ry, rz);
    cloud.renderOrder = 2;
    nebula_clouds.add(cloud);
    return cloud;
  }

  const cyan_cloudsMat = createCloudMaterial(0x20ead7, 0.29);
  const green_cloudsMat = createCloudMaterial(0x64f08b, 0.27);
  const magenta_cloudsMat = createCloudMaterial(0xf04bd5, 0.28);
  const violet_cloudsMat = createCloudMaterial(0x845cf2, 0.25);
  const gold_cloudsMat = createCloudMaterial(0xffc84d, 0.27);
  const coral_cloudsMat = createCloudMaterial(0xff765e, 0.25);
  const blue_cloudsMat = createCloudMaterial(0x38aaf5, 0.27);

  const cyanCloudData = [
    [-0.18, 0.38, 0.16, 0.35, 0.16, 0.27, 0.2, 0.5, 0.1],
    [0.35, 0.25, -0.16, 0.31, 0.18, 0.25, -0.4, 0.2, 0.7],
    [0.43, -0.38, 0.22, 0.36, 0.17, 0.29, 0.3, -0.5, -0.2],
    [-0.38, -0.28, -0.12, 0.29, 0.16, 0.25, -0.2, 0.7, 0.4],
    [0.08, -0.57, -0.18, 0.34, 0.13, 0.24, 0.5, 0.1, -0.4],
    [-0.55, 0.12, 0.05, 0.24, 0.12, 0.22, 0.1, 0.8, 0.3],
    [0.57, 0.47, -0.04, 0.25, 0.13, 0.22, -0.3, 0.4, 0.2],
    [0.02, 0.61, 0.08, 0.29, 0.12, 0.2, 0.5, -0.2, 0.6]
  ];

  const greenCloudData = [
    [-0.02, 0.53, 0.18, 0.32, 0.14, 0.25, 0.3, 0.1, -0.5],
    [0.53, 0.02, 0.12, 0.27, 0.16, 0.25, -0.2, 0.6, 0.3],
    [0.27, -0.52, 0.2, 0.34, 0.14, 0.27, 0.5, -0.4, 0.2],
    [-0.48, -0.43, 0.02, 0.28, 0.15, 0.24, -0.3, 0.2, 0.7],
    [-0.57, 0.32, -0.08, 0.25, 0.13, 0.22, 0.2, -0.5, 0.1],
    [0.15, 0.18, -0.22, 0.3, 0.14, 0.24, -0.4, 0.3, 0.5],
    [-0.2, -0.08, 0.25, 0.24, 0.12, 0.2, 0.3, -0.6, -0.2]
  ];

  const magentaCloudData = [
    [-0.2, -0.08, 0.23, 0.34, 0.17, 0.27, 0.2, 0.5, -0.3],
    [0.25, -0.15, -0.15, 0.31, 0.18, 0.25, -0.4, 0.2, 0.6],
    [0.48, 0.37, 0.05, 0.29, 0.15, 0.24, 0.3, -0.6, 0.2],
    [-0.45, 0.48, -0.08, 0.27, 0.13, 0.22, -0.2, 0.4, -0.5],
    [-0.22, -0.58, 0.08, 0.3, 0.13, 0.24, 0.5, 0.2, 0.4],
    [0.58, -0.18, -0.06, 0.23, 0.14, 0.21, -0.3, 0.7, 0.1],
    [0.0, 0.35, 0.16, 0.25, 0.13, 0.2, 0.2, -0.4, 0.5]
  ];

  const violetCloudData = [
    [-0.35, 0.18, -0.16, 0.37, 0.18, 0.28, 0.3, 0.2, 0.5],
    [0.12, 0.42, -0.12, 0.34, 0.16, 0.27, -0.4, 0.6, -0.2],
    [0.38, -0.12, 0.18, 0.31, 0.16, 0.25, 0.2, -0.5, 0.4],
    [-0.12, -0.36, -0.2, 0.36, 0.15, 0.27, -0.3, 0.1, -0.6],
    [-0.55, -0.12, 0.12, 0.25, 0.14, 0.22, 0.5, -0.2, 0.3],
    [0.02, -0.62, 0.02, 0.28, 0.12, 0.22, -0.2, 0.5, 0.1],
    [0.54, 0.55, -0.05, 0.22, 0.11, 0.2, 0.4, -0.3, 0.2]
  ];

  const goldCloudData = [
    [-0.47, 0.38, 0.15, 0.28, 0.12, 0.23, 0.4, 0.2, -0.5],
    [0.48, 0.18, -0.12, 0.25, 0.13, 0.22, -0.3, 0.6, 0.2],
    [0.35, -0.48, 0.12, 0.3, 0.13, 0.24, 0.5, -0.2, 0.4],
    [-0.35, -0.48, -0.15, 0.27, 0.14, 0.23, -0.4, 0.3, -0.5],
    [0.02, 0.25, 0.24, 0.24, 0.12, 0.2, 0.2, -0.5, 0.6],
    [-0.58, -0.28, 0.03, 0.22, 0.12, 0.2, -0.2, 0.4, 0.3],
    [0.57, -0.25, 0.02, 0.23, 0.12, 0.2, 0.3, -0.6, 0.1]
  ];

  const coralCloudData = [
    [-0.55, 0.52, 0.02, 0.25, 0.12, 0.21, 0.3, 0.5, -0.2],
    [0.58, 0.42, -0.04, 0.24, 0.13, 0.21, -0.4, 0.2, 0.5],
    [-0.52, -0.05, -0.16, 0.27, 0.14, 0.23, 0.2, -0.6, -0.3],
    [0.48, -0.25, -0.18, 0.29, 0.14, 0.24, -0.5, 0.3, 0.2],
    [0.12, 0.58, -0.12, 0.25, 0.12, 0.21, 0.4, -0.2, 0.6],
    [-0.12, -0.55, 0.18, 0.24, 0.12, 0.2, -0.3, 0.5, -0.4]
  ];

  const blueCloudData = [
    [-0.42, 0.12, 0.2, 0.31, 0.16, 0.25, 0.3, -0.4, 0.2],
    [0.08, 0.18, -0.2, 0.35, 0.17, 0.27, -0.2, 0.5, -0.3],
    [0.5, 0.52, 0.02, 0.27, 0.13, 0.22, 0.4, 0.1, 0.5],
    [-0.5, -0.35, 0.08, 0.28, 0.14, 0.23, -0.3, 0.6, 0.2],
    [0.25, -0.58, -0.12, 0.31, 0.13, 0.24, 0.2, -0.5, -0.4],
    [0.58, -0.02, 0.16, 0.23, 0.13, 0.2, -0.4, 0.2, 0.6],
    [-0.18, 0.62, -0.02, 0.24, 0.11, 0.2, 0.3, -0.4, 0.2]
  ];

  function applyCloudTransforms(mesh, data) {
    const cloud_dummy = new THREE.Object3D();
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      cloud_dummy.position.set(d[0], d[1], d[2]);
      cloud_dummy.scale.set(d[3], d[4], d[5]);
      cloud_dummy.rotation.set(d[6], d[7], d[8]);
      cloud_dummy.updateMatrix();
      mesh.setMatrixAt(i, cloud_dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const cyan_clouds = new THREE.InstancedMesh(cloudGeom, cyan_cloudsMat, cyanCloudData.length);
  cyan_clouds.name = "cyan_clouds";
  applyCloudTransforms(cyan_clouds, cyanCloudData);
  nebula_clouds.add(cyan_clouds);

  const green_clouds = new THREE.InstancedMesh(cloudGeom, green_cloudsMat, greenCloudData.length);
  green_clouds.name = "green_clouds";
  applyCloudTransforms(green_clouds, greenCloudData);
  nebula_clouds.add(green_clouds);

  const magenta_clouds = new THREE.InstancedMesh(cloudGeom, magenta_cloudsMat, magentaCloudData.length);
  magenta_clouds.name = "magenta_clouds";
  applyCloudTransforms(magenta_clouds, magentaCloudData);
  nebula_clouds.add(magenta_clouds);

  const violet_clouds = new THREE.InstancedMesh(cloudGeom, violet_cloudsMat, violetCloudData.length);
  violet_clouds.name = "violet_clouds";
  applyCloudTransforms(violet_clouds, violetCloudData);
  nebula_clouds.add(violet_clouds);

  const gold_clouds = new THREE.InstancedMesh(cloudGeom, gold_cloudsMat, goldCloudData.length);
  gold_clouds.name = "gold_clouds";
  applyCloudTransforms(gold_clouds, goldCloudData);
  nebula_clouds.add(gold_clouds);

  const coral_clouds = new THREE.InstancedMesh(cloudGeom, coral_cloudsMat, coralCloudData.length);
  coral_clouds.name = "coral_clouds";
  applyCloudTransforms(coral_clouds, coralCloudData);
  nebula_clouds.add(coral_clouds);

  const blue_clouds = new THREE.InstancedMesh(cloudGeom, blue_cloudsMat, blueCloudData.length);
  blue_clouds.name = "blue_clouds";
  applyCloudTransforms(blue_clouds, blueCloudData);
  nebula_clouds.add(blue_clouds);

  function createWisp(name, material, points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, 40, radius, 8, false);
    const wisp = new THREE.Mesh(geometry, material);
    wisp.name = name;
    wisp.renderOrder = 2.1;
    nebula_clouds.add(wisp);
    return wisp;
  }

  const cyan_wisp = createWisp("cyan_wisp", cyan_cloudsMat, [
    new THREE.Vector3(-0.58, -0.28, 0.28),
    new THREE.Vector3(-0.36, -0.5, 0.31),
    new THREE.Vector3(-0.02, -0.56, 0.3),
    new THREE.Vector3(0.34, -0.4, 0.27),
    new THREE.Vector3(0.56, -0.12, 0.2)
  ], 0.014);

  const magenta_wisp = createWisp("magenta_wisp", magenta_cloudsMat, [
    new THREE.Vector3(-0.5, 0.42, 0.16),
    new THREE.Vector3(-0.28, 0.2, 0.28),
    new THREE.Vector3(0.02, 0.02, 0.32),
    new THREE.Vector3(0.25, -0.22, 0.3),
    new THREE.Vector3(0.48, -0.43, 0.18)
  ], 0.012);

  const gold_wisp = createWisp("gold_wisp", gold_cloudsMat, [
    new THREE.Vector3(-0.58, 0.3, 0.1),
    new THREE.Vector3(-0.42, 0.12, 0.24),
    new THREE.Vector3(-0.2, -0.08, 0.3),
    new THREE.Vector3(0.08, -0.18, 0.27),
    new THREE.Vector3(0.38, -0.08, 0.18)
  ], 0.01);

  const green_wisp = createWisp("green_wisp", green_cloudsMat, [
    new THREE.Vector3(-0.35, 0.62, 0.05),
    new THREE.Vector3(-0.18, 0.42, 0.22),
    new THREE.Vector3(0.08, 0.25, 0.31),
    new THREE.Vector3(0.35, 0.08, 0.24),
    new THREE.Vector3(0.55, -0.16, 0.1)
  ], 0.011);

  const violet_wisp = createWisp("violet_wisp", violet_cloudsMat, [
    new THREE.Vector3(-0.55, -0.45, -0.04),
    new THREE.Vector3(-0.3, -0.25, 0.18),
    new THREE.Vector3(-0.05, -0.02, 0.3),
    new THREE.Vector3(0.22, 0.2, 0.25),
    new THREE.Vector3(0.52, 0.42, 0.08)
  ], 0.013);

  const sparklesGeom = new THREE.SphereGeometry(1, 10, 6);

  function createSparkleMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.7,
      emissive: color,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.96,
      depthWrite: false
    });
  }

  function deterministicUnit(value) {
    const wave = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
    return wave - Math.floor(wave);
  }

  function createSparkles(name, material, count, phase, baseSize) {
    const mesh = new THREE.InstancedMesh(sparklesGeom, material, count);
    mesh.name = name;
    const sparkle_dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const index = i + phase * 19;
      const u = deterministicUnit(index + 1.3);
      const v = deterministicUnit(index + 7.9);
      const w = deterministicUnit(index + 15.7);
      const y = (u * 2 - 1) * 0.86;
      const angle = v * Math.PI * 2;
      const radialLimit = Math.sqrt(Math.max(0, 0.84 * 0.84 - y * y));
      const radial = radialLimit * Math.pow(w, 0.58);
      const x = Math.cos(angle) * radial;
      const z = Math.sin(angle) * radial;
      const size = baseSize * (0.68 + deterministicUnit(index + 23.1) * 0.92);

      sparkle_dummy.position.set(x, y, z);
      sparkle_dummy.scale.setScalar(size);
      sparkle_dummy.rotation.set(0, 0, 0);
      sparkle_dummy.updateMatrix();
      mesh.setMatrixAt(i, sparkle_dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 2.5;
    root.add(mesh);
    return mesh;
  }

  const white_sparklesMat = createSparkleMaterial(0xffffff);
  const cyan_sparklesMat = createSparkleMaterial(0x42f4ff);
  const green_sparklesMat = createSparkleMaterial(0x72ff9a);
  const pink_sparklesMat = createSparkleMaterial(0xff62dc);
  const gold_sparklesMat = createSparkleMaterial(0xffd45e);

  const white_sparkles = createSparkles("white_sparkles", white_sparklesMat, 72, 1, 0.011);
  const cyan_sparkles = createSparkles("cyan_sparkles", cyan_sparklesMat, 58, 2, 0.012);
  const green_sparkles = createSparkles("green_sparkles", green_sparklesMat, 52, 3, 0.011);
  const pink_sparkles = createSparkles("pink_sparkles", pink_sparklesMat, 54, 4, 0.012);
  const gold_sparkles = createSparkles("gold_sparkles", gold_sparklesMat, 48, 5, 0.011);

  const glintGeom = new THREE.SphereGeometry(1, 16, 10);
  const cyan_glintsMat = new THREE.MeshStandardMaterial({
    color: 0x76f8ff,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0x76f8ff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });
  const pink_glintsMat = new THREE.MeshStandardMaterial({
    color: 0xff86ed,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xff86ed,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });
  const gold_glintsMat = new THREE.MeshStandardMaterial({
    color: 0xffe08a,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffe08a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });

  function createGlints(name, material, data) {
    const mesh = new THREE.InstancedMesh(glintGeom, material, data.length);
    mesh.name = name;
    const glint_dummy = new THREE.Object3D();

    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      glint_dummy.position.set(d[0], d[1], d[2]);
      glint_dummy.scale.setScalar(d[3]);
      glint_dummy.rotation.set(0, 0, 0);
      glint_dummy.updateMatrix();
      mesh.setMatrixAt(i, glint_dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 2.7;
    root.add(mesh);
    return mesh;
  }

  const cyanGlintData = [
    [-0.48, -0.18, 0.58, 0.035],
    [0.28, 0.18, 0.73, 0.031],
    [0.48, -0.35, 0.43, 0.028],
    [-0.12, 0.52, 0.64, 0.026],
    [0.56, 0.08, 0.34, 0.024]
  ];
  const pinkGlintData = [
    [-0.3, 0.28, 0.72, 0.03],
    [0.12, -0.36, 0.72, 0.033],
    [0.45, 0.35, 0.5, 0.027],
    [-0.5, -0.35, 0.42, 0.025]
  ];
  const goldGlintData = [
    [-0.55, 0.08, 0.48, 0.027],
    [0.5, -0.02, 0.55, 0.032],
    [0.18, 0.48, 0.67, 0.025],
    [-0.18, -0.52, 0.55, 0.028]
  ];

  const cyan_glints = createGlints("cyan_glints", cyan_glintsMat, cyanGlintData);
  const pink_glints = createGlints("pink_glints", pink_glintsMat, pinkGlintData);
  const gold_glints = createGlints("gold_glints", gold_glintsMat, goldGlintData);

  const reflectionGeom = new THREE.SphereGeometry(
    1.008,
    24,
    18,
    Math.PI / 2 - 0.42,
    0.84,
    0.76,
    0.78
  );
  const reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const left_reflection = new THREE.Mesh(reflectionGeom, reflectionMat);
  left_reflection.name = "left_reflection";
  left_reflection.renderOrder = 4;
  root.add(left_reflection);

  const right_reflection = new THREE.Mesh(reflectionGeom, reflectionMat);
  right_reflection.name = "right_reflection";
  right_reflection.scale.set(-1, 1, 1);
  right_reflection.renderOrder = 4;
  root.add(right_reflection);

  const ground_shadowGeom = new THREE.SphereGeometry(1, 40, 16);
  const ground_shadowMat = new THREE.MeshBasicMaterial({
    color: 0x77748f,
    transparent: true,
    opacity: 0.075,
    depthWrite: false
  });
  const ground_shadow = new THREE.Mesh(ground_shadowGeom, ground_shadowMat);
  ground_shadow.name = "ground_shadow";
  ground_shadow.position.set(0, -1.012, 0.02);
  ground_shadow.scale.set(0.68, 0.012, 0.34);
  ground_shadow.renderOrder = -2;
  root.add(ground_shadow);

  const iridescent_caustics = new THREE.Group();
  iridescent_caustics.name = "iridescent_caustics";
  root.add(iridescent_caustics);

  const causticGeom = new THREE.SphereGeometry(1, 32, 14);

  function createCaustic(name, color, x, sx, sy, sz) {
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.11,
      depthWrite: false
    });
    const caustic = new THREE.Mesh(causticGeom, material);
    caustic.name = name;
    caustic.position.set(x, -1.016, 0.035);
    caustic.scale.set(sx, 0.008, sz);
    caustic.renderOrder = -1;
    iridescent_caustics.add(caustic);
    return caustic;
  }

  const cyan_caustic = createCaustic("cyan_caustic", 0x42eaff, -0.34, 0.34, 1, 0.15);
  const pink_caustic = createCaustic("pink_caustic", 0xff5ed7, 0.0, 0.38, 1, 0.16);
  const gold_caustic = createCaustic("gold_caustic", 0xffd44d, 0.34, 0.32, 1, 0.14);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}