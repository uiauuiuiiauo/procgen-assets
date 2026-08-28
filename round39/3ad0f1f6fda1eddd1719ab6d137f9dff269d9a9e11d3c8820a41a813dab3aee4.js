export default function generate(THREE) {
  const root = new THREE.Group();
  const crystal_group = new THREE.Group();
  root.add(crystal_group);

  const crystalRadius = 0.43;
  const lowerEndY = -1.10;
  const lowerShoulderY = -0.82;
  const upperShoulderY = 0.76;
  const upperEndY = 1.12;
  const facetRotation = -Math.PI / 6;

  function makeCrystalMaterial(color, transmission, opacity) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness: 0.05,
      transmission,
      ior: 1.5,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
      flatShading: true
    });
  }

  const crystal_bodyMat = [
    makeCrystalMaterial(0xc9c7ff, 0.72, 0.64),
    makeCrystalMaterial(0x85e8ff, 0.76, 0.61),
    makeCrystalMaterial(0xff83d1, 0.72, 0.63),
    makeCrystalMaterial(0xa6f1bd, 0.78, 0.59),
    makeCrystalMaterial(0xffdf72, 0.72, 0.62),
    makeCrystalMaterial(0x9e91ff, 0.75, 0.62)
  ];

  const inner_coreMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8f5ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const golden_flakesMat = new THREE.MeshStandardMaterial({
    color: 0xd9a62c,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide
  });

  const silver_flakesMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const dark_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x273b37,
    metalness: 0.0,
    roughness: 0.7
  });

  const mineral_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x3aa889,
    metalness: 0.0,
    roughness: 0.4
  });

  const fractureMat = new THREE.MeshStandardMaterial({
    color: 0xe8f5ff,
    metalness: 0.0,
    roughness: 0.4
  });

  const lower_crystal_tipMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9afd9,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const upper_crystal_tipMat = new THREE.MeshPhysicalMaterial({
    color: 0xc5a8d7,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.66,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const rainbow_facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false,
    vertexColors: true
  });

  const cyan_light_planeMat = new THREE.MeshStandardMaterial({
    color: 0x36e9ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x36e9ff,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.20,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const magenta_light_planeMat = new THREE.MeshStandardMaterial({
    color: 0xff35d3,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff35d3,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const green_light_planeMat = new THREE.MeshStandardMaterial({
    color: 0x45ef83,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x45ef83,
    emissiveIntensity: 0.28,
    transparent: true,
    opacity: 0.17,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const yellow_light_planeMat = new THREE.MeshStandardMaterial({
    color: 0xffdf38,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffdf38,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const orange_light_planeMat = new THREE.MeshStandardMaterial({
    color: 0xff7928,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff7928,
    emissiveIntensity: 0.28,
    transparent: true,
    opacity: 0.17,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const violet_light_planeMat = new THREE.MeshStandardMaterial({
    color: 0x8f45e8,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x8f45e8,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function createFacetedCrystalGeometry() {
    const positions = [];
    const groups = [];

    function makeRing(y, radius) {
      const ring = [];
      for (let i = 0; i < 6; i++) {
        const angle = facetRotation + i * Math.PI / 3;
        ring.push(new THREE.Vector3(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius
        ));
      }
      return ring;
    }

    function addTriangle(a, b, c, materialIndex) {
      const start = positions.length / 3;
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      groups.push([start, 3, materialIndex]);
    }

    function addQuad(a, b, c, d, materialIndex) {
      const start = positions.length / 3;
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z,
        a.x, a.y, a.z,
        c.x, c.y, c.z,
        d.x, d.y, d.z
      );
      groups.push([start, 6, materialIndex]);
    }

    const lower_end = makeRing(lowerEndY, 0.24);
    const lower_shoulder = makeRing(lowerShoulderY, crystalRadius);
    const upper_shoulder = makeRing(upperShoulderY, crystalRadius);
    const upper_end = makeRing(upperEndY, 0.23);

    for (let i = 0; i < 6; i++) {
      const j = (i + 1) % 6;
      addQuad(
        lower_end[i],
        lower_shoulder[i],
        lower_shoulder[j],
        lower_end[j],
        (i + 2) % 6
      );
      addQuad(
        lower_shoulder[i],
        upper_shoulder[i],
        upper_shoulder[j],
        lower_shoulder[j],
        i
      );
      addQuad(
        upper_shoulder[i],
        upper_end[i],
        upper_end[j],
        upper_shoulder[j],
        (i + 4) % 6
      );
    }

    const lower_center = new THREE.Vector3(0, lowerEndY, 0);
    const upper_center = new THREE.Vector3(0, upperEndY, 0);

    for (let i = 0; i < 6; i++) {
      const j = (i + 1) % 6;
      addTriangle(lower_center, lower_end[i], lower_end[j], (i + 3) % 6);
      addTriangle(upper_center, upper_end[j], upper_end[i], (i + 1) % 6);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    for (const group of groups) {
      geometry.addGroup(group[0], group[1], group[2]);
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createTipGeometry(top) {
    const y0 = top ? upperShoulderY : lowerShoulderY;
    const y1 = top ? upperEndY : lowerEndY;
    const radius = 0.23;
    const positions = [
      0, y0, 0,
      Math.cos(facetRotation) * radius, y0, Math.sin(facetRotation) * radius,
      radius, y0, 0,
      Math.cos(facetRotation - Math.PI / 3) * radius, y0,
        Math.sin(facetRotation - Math.PI / 3) * radius,
      0, y1, 0
    ];
    const indices = top
      ? [0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1]
      : [0, 2, 1, 0, 3, 2, 0, 4, 3, 0, 1, 4];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRainbowFacetGeometry() {
    const positions = [];
    const colors = [];
    const leftPoints = [];
    const rightPoints = [];
    const segmentCount = 14;
    const facetHalfWidth = crystalRadius * Math.sqrt(3) / 2;
    const minY = lowerShoulderY + 0.035;
    const maxY = upperShoulderY - 0.035;

    for (let i = 0; i <= segmentCount; i++) {
      const t = i / segmentCount;
      const y = minY + (maxY - minY) * t;
      const wave = Math.sin(t * Math.PI * 5 + 0.35) * 0.052;
      const drift = Math.sin(t * Math.PI * 2) * 0.024;
      const leftX = -facetHalfWidth + 0.018 + drift;
      const rightX = facetHalfWidth - 0.018 + wave;
      leftPoints.push(new THREE.Vector3(leftX, y, 0.006));
      rightPoints.push(new THREE.Vector3(rightX, y, 0.006));
    }

    for (let i = 0; i < segmentCount; i++) {
      const t0 = i / segmentCount;
      const t1 = (i + 1) / segmentCount;
      const h0 = ((t0 * 5 + 0.18) % 1) * Math.PI * 2;
      const h1 = ((t1 * 5 + 0.18) % 1) * Math.PI * 2;

      const p00 = leftPoints[i];
      const p10 = rightPoints[i];
      const p11 = rightPoints[i + 1];
      const p01 = leftPoints[i + 1];

      positions.push(
        p00.x, p00.y, p00.z,
        p10.x, p10.y, p10.z,
        p11.x, p11.y, p11.z,
        p00.x, p00.y, p00.z,
        p11.x, p11.y, p11.z,
        p01.x, p01.y, p01.z
      );

      const c0 = new THREE.Color(h0);
      const c1 = new THREE.Color(h1);
      colors.push(
        c0.r, c0.g, c0.b,
        c1.r, c1.g, c1.b,
        c1.r, c1.g, c1.b,
        c0.r, c0.g, c0.b,
        c1.r, c1.g, c1.b,
        c0.r, c0.g, c0.b
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createLightPlaneGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.30, -0.075);
    shape.lineTo(0.23, -0.095);
    shape.lineTo(0.31, 0.025);
    shape.lineTo(0.15, 0.105);
    shape.lineTo(-0.27, 0.070);
    shape.lineTo(-0.30, -0.075);
    return new THREE.ShapeGeometry(shape);
  }

  function createFlatShardGeometry() {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([
        -0.075, -0.012, 0,
         0.080, -0.009, 0,
         0.052,  0.014, 0,
        -0.075, -0.012, 0
      ], 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createFlatCrystalGeometry() {
    const geometry = new THREE.OctahedronGeometry(0.04, 0);
    geometry.scale(1.0, 0.55, 0.28);
    return geometry;
  }

  const inner_coreGeom = new THREE.CylinderGeometry(
    0.31,
    0.31,
    upperShoulderY - lowerShoulderY,
    6,
    1,
    false
  );
  const inner_core = new THREE.Mesh(inner_coreGeom, inner_coreMat);
  inner_core.rotation.y = Math.abs(facetRotation);
  inner_core.renderOrder = 0;
  crystal_group.add(inner_core);

  const crystal_bodyGeom = createFacetedCrystalGeometry();
  const crystal_body = new THREE.Mesh(crystal_bodyGeom, crystal_bodyMat);
  crystal_body.renderOrder = 2;
  crystal_group.add(crystal_body);

  const lower_crystal_tipGeom = createTipGeometry(false);
  const lower_crystal_tip = new THREE.Mesh(
    lower_crystal_tipGeom,
    lower_crystal_tipMat
  );
  lower_crystal_tip.renderOrder = 2;
  crystal_group.add(lower_crystal_tip);

  const upper_crystal_tipGeom = createTipGeometry(true);
  const upper_crystal_tip = new THREE.Mesh(
    upper_crystal_tipGeom,
    upper_crystal_tipMat
  );
  upper_crystal_tip.renderOrder = 2;
  crystal_group.add(upper_crystal_tip);

  const rainbow_front_facetGeom = createRainbowFacetGeometry();
  const rainbow_front_facet = new THREE.Mesh(
    rainbow_front_facetGeom,
    rainbow_facetMat
  );
  rainbow_front_facet.renderOrder = 3;
  crystal_group.add(rainbow_front_facet);

  const cyan_light_planeGeom = createLightPlaneGeometry();
  const cyan_light_plane = new THREE.Mesh(
    cyan_light_planeGeom,
    cyan_light_planeMat
  );
  cyan_light_plane.position.set(-0.015, 0.42, 0.018);
  cyan_light_plane.rotation.z = 0.16;
  cyan_light_plane.scale.set(0.92, 0.78, 1);
  cyan_light_plane.renderOrder = 1;
  crystal_group.add(cyan_light_plane);

  const magenta_light_planeGeom = cyan_light_planeGeom;
  const magenta_light_plane = new THREE.Mesh(
    magenta_light_planeGeom,
    magenta_light_planeMat
  );
  magenta_light_plane.position.set(0.025, 0.08, 0.021);
  magenta_light_plane.rotation.z = -0.22;
  magenta_light_plane.scale.set(1.02, 0.84, 1);
  magenta_light_plane.renderOrder = 1;
  crystal_group.add(magenta_light_plane);

  const green_light_planeGeom = cyan_light_planeGeom;
  const green_light_plane = new THREE.Mesh(
    green_light_planeGeom,
    green_light_planeMat
  );
  green_light_plane.position.set(-0.025, -0.27, 0.019);
  green_light_plane.rotation.z = 0.19;
  green_light_plane.scale.set(0.90, 0.76, 1);
  green_light_plane.renderOrder = 1;
  crystal_group.add(green_light_plane);

  const yellow_light_planeGeom = cyan_light_planeGeom;
  const yellow_light_plane = new THREE.Mesh(
    yellow_light_planeGeom,
    yellow_light_planeMat
  );
  yellow_light_plane.position.set(0.018, -0.58, 0.022);
  yellow_light_plane.rotation.z = -0.13;
  yellow_light_plane.scale.set(0.88, 0.72, 1);
  yellow_light_plane.renderOrder = 1;
  crystal_group.add(yellow_light_plane);

  const orange_light_planeGeom = cyan_light_planeGeom;
  const orange_light_plane = new THREE.Mesh(
    orange_light_planeGeom,
    orange_light_planeMat
  );
  orange_light_plane.position.set(-0.035, -0.69, 0.017);
  orange_light_plane.rotation.z = 0.24;
  orange_light_plane.scale.set(0.72, 0.68, 1);
  orange_light_plane.renderOrder = 1;
  crystal_group.add(orange_light_plane);

  const violet_light_planeGeom = cyan_light_planeGeom;
  const violet_light_plane = new THREE.Mesh(
    violet_light_planeGeom,
    violet_light_planeMat
  );
  violet_light_plane.position.set(0.025, 0.66, 0.02);
  violet_light_plane.rotation.z = -0.27;
  violet_light_plane.scale.set(0.78, 0.72, 1);
  violet_light_plane.renderOrder = 1;
  crystal_group.add(violet_light_plane);

  const golden_flakesGeom = createFlatShardGeometry();
  const golden_flakes = new THREE.InstancedMesh(
    golden_flakesGeom,
    golden_flakesMat,
    28
  );
  const golden_flake_dummy = new THREE.Object3D();

  for (let i = 0; i < 28; i++) {
    const t = ((i * 11) % 29) / 28;
    const y = lowerShoulderY + 0.07 +
      t * (upperShoulderY - lowerShoulderY - 0.14);
    const x = Math.sin(i * 2.17 + 0.4) * 0.255;
    const z = 0.045 + Math.cos(i * 1.37) * 0.075;

    golden_flake_dummy.position.set(x, y, z);
    golden_flake_dummy.rotation.set(
      i * 0.61,
      i * 0.83,
      i * 1.31
    );
    golden_flake_dummy.scale.set(
      0.48 + (i % 5) * 0.13,
      0.55 + (i % 4) * 0.16,
      1
    );
    golden_flake_dummy.updateMatrix();
    golden_flakes.setMatrixAt(i, golden_flake_dummy.matrix);
  }
  golden_flakes.instanceMatrix.needsUpdate = true;
  crystal_group.add(golden_flakes);

  const silver_flakesGeom = golden_flakesGeom;
  const silver_flakes = new THREE.InstancedMesh(
    silver_flakesGeom,
    silver_flakesMat,
    18
  );
  const silver_flake_dummy = new THREE.Object3D();

  for (let i = 0; i < 18; i++) {
    const t = ((i * 7) % 19) / 18;
    const y = -0.72 + t * 1.38;
    const x = Math.sin(i * 1.91 + 1.1) * 0.23;
    const z = 0.07 + Math.cos(i * 1.17) * 0.055;

    silver_flake_dummy.position.set(x, y, z);
    silver_flake_dummy.rotation.set(
      i * 0.73,
      i * 0.49,
      i * 1.57
    );
    silver_flake_dummy.scale.set(
      0.36 + (i % 4) * 0.12,
      0.42 + (i % 3) * 0.18,
      1
    );
    silver_flake_dummy.updateMatrix();
    silver_flakes.setMatrixAt(i, silver_flake_dummy.matrix);
  }
  silver_flakes.instanceMatrix.needsUpdate = true;
  crystal_group.add(silver_flakes);

  const dark_inclusionsGeom = new THREE.SphereGeometry(0.013, 6, 4);
  const dark_inclusions = new THREE.InstancedMesh(
    dark_inclusionsGeom,
    dark_inclusionsMat,
    22
  );
  const dark_inclusion_dummy = new THREE.Object3D();

  for (let i = 0; i < 22; i++) {
    const t = ((i * 13) % 23) / 22;
    const y = -0.74 + t * 1.43;
    const x = Math.sin(i * 2.43) * 0.22;
    const z = 0.035 + Math.cos(i * 1.73) * 0.08;

    dark_inclusion_dummy.position.set(x, y, z);
    dark_inclusion_dummy.rotation.set(
      i * 0.41,
      i * 0.67,
      i * 0.93
    );
    dark_inclusion_dummy.scale.set(
      0.55 + (i % 3) * 0.22,
      1.0 + (i % 5) * 0.38,
      0.55
    );
    dark_inclusion_dummy.updateMatrix();
    dark_inclusions.setMatrixAt(i, dark_inclusion_dummy.matrix);
  }
  dark_inclusions.instanceMatrix.needsUpdate = true;
  crystal_group.add(dark_inclusions);

  const mineral_inclusionsGeom = createFlatCrystalGeometry();
  const mineral_inclusions = new THREE.InstancedMesh(
    mineral_inclusionsGeom,
    mineral_inclusionsMat,
    12
  );
  const mineral_inclusion_dummy = new THREE.Object3D();
  const mineral_colors = [
    0x33a96f,
    0x27c895,
    0x75d55b,
    0x267e70,
    0x9acb4e,
    0x2fc4b4
  ];

  for (let i = 0; i < 12; i++) {
    const t = ((i * 5) % 13) / 12;
    const y = -0.63 + t * 1.16;
    const x = Math.sin(i * 2.08) * 0.20;
    const z = 0.055 + Math.cos(i * 1.51) * 0.06;

    mineral_inclusion_dummy.position.set(x, y, z);
    mineral_inclusion_dummy.rotation.set(
      i * 0.58,
      i * 0.86,
      i * 1.12
    );
    mineral_inclusion_dummy.scale.set(
      0.55 + (i % 4) * 0.14,
      0.45 + (i % 3) * 0.18,
      0.45
    );
    mineral_inclusion_dummy.updateMatrix();
    mineral_inclusions.setMatrixAt(i, mineral_inclusion_dummy.matrix);
    mineral_inclusions.setColorAt(
      i,
      new THREE.Color(mineral_colors[i % mineral_colors.length])
    );
  }
  mineral_inclusions.instanceMatrix.needsUpdate = true;
  if (mineral_inclusions.instanceColor) {
    mineral_inclusions.instanceColor.needsUpdate = true;
  }
  crystal_group.add(mineral_inclusions);

  const central_mineral_clusterGeom = new THREE.DodecahedronGeometry(0.055, 0);
  const central_mineral_cluster = new THREE.InstancedMesh(
    central_mineral_clusterGeom,
    mineral_inclusionsMat,
    5
  );
  const mineral_cluster_dummy = new THREE.Object3D();

  for (let i = 0; i < 5; i++) {
    mineral_cluster_dummy.position.set(
      -0.14 + i * 0.065,
      -0.13 + Math.sin(i * 1.7) * 0.055,
      0.075 + Math.cos(i * 1.2) * 0.025
    );
    mineral_cluster_dummy.rotation.set(
      i * 0.72,
      i * 1.03,
      i * 0.49
    );
    mineral_cluster_dummy.scale.set(
      0.75 + (i % 2) * 0.35,
      0.55 + (i % 3) * 0.18,
      0.38
    );
    mineral_cluster_dummy.updateMatrix();
    central_mineral_cluster.setMatrixAt(i, mineral_cluster_dummy.matrix);
    central_mineral_cluster.setColorAt(
      i,
      new THREE.Color(mineral_colors[(i + 2) % mineral_colors.length])
    );
  }
  central_mineral_cluster.instanceMatrix.needsUpdate = true;
  if (central_mineral_cluster.instanceColor) {
    central_mineral_cluster.instanceColor.needsUpdate = true;
  }
  crystal_group.add(central_mineral_cluster);

  const central_fractureGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.20, -0.19, 0.12),
      new THREE.Vector3(-0.11, -0.11, 0.12),
      new THREE.Vector3(-0.03, -0.16, 0.12),
      new THREE.Vector3(0.06, -0.06, 0.12),
      new THREE.Vector3(0.17, -0.01, 0.12)
    ]),
    24,
    0.006,
    6,
    false
  );
  const central_fracture = new THREE.Mesh(
    central_fractureGeom,
    fractureMat
  );
  crystal_group.add(central_fracture);

  const lower_fractureGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.18, -0.69, 0.105),
      new THREE.Vector3(-0.08, -0.62, 0.11),
      new THREE.Vector3(-0.01, -0.67, 0.11),
      new THREE.Vector3(0.09, -0.55, 0.105),
      new THREE.Vector3(0.18, -0.52, 0.10)
    ]),
    22,
    0.0045,
    6,
    false
  );
  const lower_fracture = new THREE.Mesh(lower_fractureGeom, fractureMat);
  crystal_group.add(lower_fracture);

  const upper_fractureGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.16, 0.51, 0.105),
      new THREE.Vector3(-0.07, 0.58, 0.11),
      new THREE.Vector3(0.01, 0.54, 0.11),
      new THREE.Vector3(0.09, 0.67, 0.105),
      new THREE.Vector3(0.17, 0.70, 0.10)
    ]),
    22,
    0.0045,
    6,
    false
  );
  const upper_fracture = new THREE.Mesh(upper_fractureGeom, fractureMat);
  crystal_group.add(upper_fracture);

  crystal_group.rotation.set(0.08, -0.16, -0.72);

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