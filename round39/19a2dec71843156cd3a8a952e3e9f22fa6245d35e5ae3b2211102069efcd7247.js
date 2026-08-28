export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x050608,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x030819,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x030819,
    emissiveIntensity: 1.0,
  });
  const cyanLedMat = new THREE.MeshStandardMaterial({
    color: 0x19e8ef,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x19e8ef,
    emissiveIntensity: 1.0,
  });
  const pinkLedMat = new THREE.MeshStandardMaterial({
    color: 0xff3eb5,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff3eb5,
    emissiveIntensity: 1.0,
  });
  const limeLedMat = new THREE.MeshStandardMaterial({
    color: 0x70f596,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x70f596,
    emissiveIntensity: 1.0,
  });
  const violetLedMat = new THREE.MeshStandardMaterial({
    color: 0xa270ff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xa270ff,
    emissiveIntensity: 1.0,
  });
  const whiteStarMat = new THREE.MeshBasicMaterial({ color: 0xe9fbff });
  const cyanGlowMat = new THREE.MeshBasicMaterial({
    color: 0x26e9ef,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const pinkGlowMat = new THREE.MeshBasicMaterial({
    color: 0xff43b7,
    transparent: true,
    opacity: 0.25,
    depthWrite: false,
  });
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9f5ff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    emissive: 0x45bfff,
    emissiveIntensity: 1.0,
  });
  const crystalCoreMat = new THREE.MeshStandardMaterial({
    color: 0x76dfff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x76dfff,
    emissiveIntensity: 1.0,
  });
  const crystalHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xe9fbff,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });
  const centralPlanetMat = new THREE.MeshStandardMaterial({
    color: 0x168fcf,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x168fcf,
    emissiveIntensity: 1.0,
  });
  const planetLandMat = new THREE.MeshStandardMaterial({
    color: 0x38d0c6,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x38d0c6,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false,
  });

  function makeRoundedRectShape(width, height, radius) {
    const x = -width / 2;
    const y = -height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    return shape;
  }

  function makeBurstGeometry(count, offset, curveAmount) {
    const positions = [];
    const baseAngle = Math.PI * 2 * offset / count;

    function pointAt(angle, radiusY) {
      return new THREE.Vector3(
        Math.cos(angle) * 0.56,
        Math.sin(angle) * radiusY,
        0
      );
    }

    const p0 = pointAt(baseAngle - curveAmount, 0.07);
    const p1 = pointAt(
      baseAngle - curveAmount * 0.38,
      0.28 + curveAmount * 0.25
    );
    const p2 = pointAt(baseAngle + curveAmount * 0.32, 0.58);
    const p3 = pointAt(baseAngle, 0.84);
    const centerAngle = baseAngle + 0.035;
    const c0 = pointAt(centerAngle - curveAmount * 0.7, 0.07);
    const c1 = pointAt(
      centerAngle - curveAmount * 0.28,
      0.28 + curveAmount * 0.25
    );
    const c2 = pointAt(
      centerAngle + curveAmount * 0.28,
      0.58
    );
    const c3 = pointAt(centerAngle, 0.84);

    function appendPolygon(a, b, c, d) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z,
        a.x, a.y, a.z,
        c.x, c.y, c.z,
        d.x, d.y, d.z
      );
    }

    appendPolygon(p0, p1, p2, p3);
    appendPolygon(c0, c3, c2, c1);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  const main_bodyProfile = [
    new THREE.Vector2(0.00, -0.96),
    new THREE.Vector2(0.51, -0.96),
    new THREE.Vector2(0.55, -0.94),
    new THREE.Vector2(0.575, -0.89),
    new THREE.Vector2(0.58, -0.81),
    new THREE.Vector2(0.58, 0.75),
    new THREE.Vector2(0.575, 0.81),
    new THREE.Vector2(0.55, 0.86),
    new THREE.Vector2(0.50, 0.88),
    new THREE.Vector2(0.00, 0.88),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, silverMat);
  root.add(main_body);

  const top_capProfile = [
    new THREE.Vector2(0.00, 0.84),
    new THREE.Vector2(0.50, 0.84),
    new THREE.Vector2(0.56, 0.87),
    new THREE.Vector2(0.59, 0.92),
    new THREE.Vector2(0.59, 0.98),
    new THREE.Vector2(0.56, 1.03),
    new THREE.Vector2(0.49, 1.06),
    new THREE.Vector2(0.00, 1.06),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 64);
  const top_cap = new THREE.Mesh(top_capGeom, polishedMat);
  root.add(top_cap);

  const top_plateGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.014, 64);
  const top_plate = new THREE.Mesh(top_plateGeom, polishedMat);
  top_plate.position.y = 1.058;
  root.add(top_plate);

  const top_seamGeom = new THREE.TorusGeometry(0.578, 0.006, 8, 64);
  const top_seam = new THREE.Mesh(top_seamGeom, seamMat);
  top_seam.rotation.x = Math.PI / 2;
  top_seam.position.y = 0.866;
  root.add(top_seam);

  const upper_body_seamGeom = new THREE.TorusGeometry(0.579, 0.0045, 8, 64);
  const upper_body_seam = new THREE.Mesh(upper_body_seamGeom, brushedMat);
  upper_body_seam.rotation.x = Math.PI / 2;
  upper_body_seam.position.y = 0.755;
  root.add(upper_body_seam);

  const bottom_rimGeom = new THREE.TorusGeometry(0.523, 0.008, 8, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, brushedMat);
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = -0.955;
  root.add(bottom_rim);

  const screen_frameShape = makeRoundedRectShape(1.09, 1.40, 0.105);
  const screen_frameGeom = new THREE.ExtrudeGeometry(screen_frameShape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const screen_frame = new THREE.Mesh(screen_frameGeom, polishedMat);
  screen_frame.position.set(0, -0.01, 0.555);
  root.add(screen_frame);

  const screen_bezelShape = makeRoundedRectShape(1.045, 1.345, 0.092);
  const screen_bezelGeom = new THREE.ExtrudeGeometry(screen_bezelShape, {
    depth: 0.020,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.009,
    bevelSegments: 3,
    curveSegments: 12,
  });
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, bezelMat);
  screen_bezel.position.set(0, -0.01, 0.584);
  root.add(screen_bezel);

  const screen_panelShape = makeRoundedRectShape(0.955, 1.205, 0.067);
  const screen_panelGeom = new THREE.ExtrudeGeometry(screen_panelShape, {
    depth: 0.007,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 12,
  });
  const screen_panel = new THREE.Mesh(screen_panelGeom, screenMat);
  screen_panel.position.set(0, -0.01, 0.607);
  root.add(screen_panel);

  const lower_body_seamGeom = new THREE.TorusGeometry(0.579, 0.005, 8, 64);
  const lower_body_seam = new THREE.Mesh(lower_body_seamGeom, seamMat);
  lower_body_seam.rotation.x = Math.PI / 2;
  lower_body_seam.position.y = -0.714;
  root.add(lower_body_seam);

  const screen_content = new THREE.Group();
  screen_content.position.set(0, -0.01, 0.622);
  root.add(screen_content);

  const burstAngles = [
    0.02, 0.34, 0.66, 0.98, 1.30, 1.62,
    1.94, 2.26, 2.58, 2.90, 3.22, 3.54,
    3.86, 4.18, 4.50, 4.82, 5.14, 5.46,
  ];

  const screen_starsGeom = new THREE.CircleGeometry(1, 8);
  const screen_stars = new THREE.InstancedMesh(
    screen_starsGeom,
    whiteStarMat,
    72
  );
  const starDummy = new THREE.Object3D();
  for (let i = 0; i < 72; i++) {
    const x = Math.sin(i * 2.37 + 0.4) * 0.43;
    const y = Math.sin(i * 5.19 + 1.1) * 0.54;
    const size = 0.003 + (i % 5) * 0.0012;
    starDummy.position.set(x, y, 0.001);
    starDummy.rotation.set(0, 0, 0);
    starDummy.scale.set(size, size, 1);
    starDummy.updateMatrix();
    screen_stars.setMatrixAt(i, starDummy.matrix);
  }
  screen_stars.instanceMatrix.needsUpdate = true;
  screen_stars.frustumCulled = false;
  screen_content.add(screen_stars);

  const screen_burstGeom = makeBurstGeometry(
    burstAngles.length,
    0,
    0.075
  );
  const screen_burst = new THREE.Mesh(screen_burstGeom, cyanGlowMat);
  screen_burst.position.z = 0.002;
  screen_burst.scale.y = 0.59;
  screen_content.add(screen_burst);

  const screen_burst_pinkGeom = makeBurstGeometry(
    burstAngles.length,
    0.48,
    -0.055
  );
  const screen_burst_pink = new THREE.Mesh(
    screen_burst_pinkGeom,
    pinkGlowMat
  );
  screen_burst_pink.position.z = 0.0025;
  screen_burst_pink.scale.y = 0.59;
  screen_content.add(screen_burst_pink);

  const rayGeom = new THREE.CylinderGeometry(0.0023, 0.0023, 1, 6);
  const cyan_rays = new THREE.InstancedMesh(rayGeom, cyanLedMat, 14);
  const pink_rays = new THREE.InstancedMesh(rayGeom, pinkLedMat, 13);
  const lime_rays = new THREE.InstancedMesh(rayGeom, limeLedMat, 12);
  const violet_rays = new THREE.InstancedMesh(rayGeom, violetLedMat, 11);

  function populateRays(mesh, count, offset, curveAmount) {
    const rayDummy = new THREE.Object3D();
    const base = new THREE.Vector3(0, 0, 0);
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i < count; i++) {
      const angle =
        burstAngles[i * 2 + offset] +
        0.045 * Math.sin(i * 1.7 + offset);
      const curve =
        curveAmount * Math.sin(i * 1.31 + offset * 0.8);
      const p0 = new THREE.Vector3(
        Math.cos(angle - curve) * 0.075,
        Math.sin(angle - curve) * 0.075,
        0.006
      );
      const p1 = new THREE.Vector3(
        Math.cos(angle - curve * 0.35) * 0.28,
        Math.sin(angle - curve * 0.35) * 0.35,
        0.006
      );
      const p2 = new THREE.Vector3(
        Math.cos(angle + curve * 0.32) * 0.54,
        Math.sin(angle + curve * 0.32) * 0.58,
        0.006
      );
      const direction = new THREE.Vector3().subVectors(p2, p0);
      const length = direction.length();
      const midpoint = new THREE.Vector3()
        .addVectors(p0, p2)
        .multiplyScalar(0.5);

      rayDummy.position.copy(midpoint);
      rayDummy.quaternion.setFromUnitVectors(
        up,
        direction.clone().normalize()
      );
      rayDummy.scale.set(1, length, 1);
      rayDummy.updateMatrix();
      mesh.setMatrixAt(i, rayDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
  }

  populateRays(cyan_rays, 14, 0, 0.12);
  populateRays(pink_rays, 13, 1, -0.095);
  populateRays(lime_rays, 12, 2, 0.07);
  populateRays(violet_rays, 11, 3, -0.055);
  screen_content.add(cyan_rays);
  screen_content.add(pink_rays);
  screen_content.add(lime_rays);
  screen_content.add(violet_rays);

  const rayTipPositions = [];
  for (let i = 0; i < burstAngles.length; i++) {
    const angle =
      burstAngles[i] + 0.05 * Math.sin(i * 1.41 + 0.3);
    rayTipPositions.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.54,
        Math.sin(angle) * 0.58,
        0.009
      )
    );
  }

  const ray_tipGeom = new THREE.SphereGeometry(0.007, 8, 6);
  const cyan_ray_tips = new THREE.InstancedMesh(
    ray_tipGeom,
    cyanLedMat,
    6
  );
  const pink_ray_tips = new THREE.InstancedMesh(
    ray_tipGeom,
    pinkLedMat,
    6
  );
  const lime_ray_tips = new THREE.InstancedMesh(
    ray_tipGeom,
    limeLedMat,
    6
  );
  const violet_ray_tips = new THREE.InstancedMesh(
    ray_tipGeom,
    violetLedMat,
    6
  );
  const tipMeshes = [
    cyan_ray_tips,
    pink_ray_tips,
    lime_ray_tips,
    violet_ray_tips,
  ];
  const tipCounts = [0, 0, 0, 0];
  const tipDummy = new THREE.Object3D();

  for (let i = 0; i < rayTipPositions.length; i++) {
    const colorIndex = i % 4;
    const localIndex = tipCounts[colorIndex]++;
    tipDummy.position.copy(rayTipPositions[i]);
    tipDummy.rotation.set(0, 0, 0);
    tipDummy.scale.setScalar(0.75 + (i % 4) * 0.12);
    tipDummy.updateMatrix();
    tipMeshes[colorIndex].setMatrixAt(localIndex, tipDummy.matrix);
  }
  for (const tipMesh of tipMeshes) {
    tipMesh.instanceMatrix.needsUpdate = true;
    tipMesh.frustumCulled = false;
    screen_content.add(tipMesh);
  }

  const crystalData = [
    { x: -0.235, y: 0.115, r: -0.42, sx: 0.050, sy: 0.071, core: 0 },
    { x: 0.000, y: 0.205, r: 0.08, sx: 0.051, sy: 0.076, core: 1 },
    { x: 0.238, y: 0.145, r: 0.38, sx: 0.052, sy: 0.068, core: 0 },
    { x: 0.285, y: -0.115, r: 0.62, sx: 0.053, sy: 0.071, core: 1 },
    { x: 0.090, y: -0.225, r: -0.28, sx: 0.048, sy: 0.067, core: 0 },
    { x: -0.180, y: -0.205, r: 0.32, sx: 0.050, sy: 0.073, core: 1 },
    { x: -0.292, y: -0.155, r: -0.55, sx: 0.052, sy: 0.070, core: 0 },
  ];

  const crystal_shardGeom = new THREE.OctahedronGeometry(1, 0);
  const crystal_shards = new THREE.InstancedMesh(
    crystal_shardGeom,
    crystalMat,
    crystalData.length
  );
  const crystal_coreGeom = new THREE.OctahedronGeometry(1, 0);
  const crystal_cores_cyan = new THREE.InstancedMesh(
    crystal_coreGeom,
    cyanLedMat,
    4
  );
  const crystal_cores_pink = new THREE.InstancedMesh(
    crystal_coreGeom,
    pinkLedMat,
    3
  );
  const crystal_highlightGeom = new THREE.CircleGeometry(1, 4);
  const crystal_highlights = new THREE.InstancedMesh(
    crystal_highlightGeom,
    crystalHighlightMat,
    crystalData.length
  );
  const crystalDummy = new THREE.Object3D();
  let cyanCoreIndex = 0;
  let pinkCoreIndex = 0;

  for (let i = 0; i < crystalData.length; i++) {
    const data = crystalData[i];

    crystalDummy.position.set(data.x, data.y, 0.014);
    crystalDummy.rotation.set(0, 0, data.r);
    crystalDummy.scale.set(data.sx, data.sy, 0.012);
    crystalDummy.updateMatrix();
    crystal_shards.setMatrixAt(i, crystalDummy.matrix);

    crystalDummy.position.set(data.x, data.y, 0.015);
    crystalDummy.rotation.set(0, 0, data.r);
    crystalDummy.scale.set(
      data.sx * 0.42,
      data.sy * 0.42,
      0.007
    );
    crystalDummy.updateMatrix();
    if (data.core === 0) {
      crystal_cores_cyan.setMatrixAt(
        cyanCoreIndex++,
        crystalDummy.matrix
      );
    } else {
      crystal_cores_pink.setMatrixAt(
        pinkCoreIndex++,
        crystalDummy.matrix
      );
    }

    crystalDummy.position.set(
      data.x - data.sx * 0.18,
      data.y + data.sy * 0.18,
      0.027
    );
    crystalDummy.rotation.set(0, 0, data.r + Math.PI / 4);
    crystalDummy.scale.set(
      data.sx * 0.28,
      data.sy * 0.20,
      1
    );
    crystalDummy.updateMatrix();
    crystal_highlights.setMatrixAt(i, crystalDummy.matrix);
  }

  crystal_shards.instanceMatrix.needsUpdate = true;
  crystal_cores_cyan.instanceMatrix.needsUpdate = true;
  crystal_cores_pink.instanceMatrix.needsUpdate = true;
  crystal_highlights.instanceMatrix.needsUpdate = true;
  crystal_shards.frustumCulled = false;
  crystal_cores_cyan.frustumCulled = false;
  crystal_cores_pink.frustumCulled = false;
  crystal_highlights.frustumCulled = false;
  screen_content.add(crystal_shards);
  screen_content.add(crystal_cores_cyan);
  screen_content.add(crystal_cores_pink);
  screen_content.add(crystal_highlights);

  const central_planet_haloGeom = new THREE.CircleGeometry(0.108, 32);
  const central_planet_halo = new THREE.Mesh(
    central_planet_haloGeom,
    cyanGlowMat
  );
  central_planet_halo.position.z = 0.009;
  screen_content.add(central_planet_halo);

  const central_planet_rimGeom = new THREE.RingGeometry(
    0.079,
    0.092,
    32
  );
  const central_planet_rim = new THREE.Mesh(
    central_planet_rimGeom,
    cyanLedMat
  );
  central_planet_rim.position.z = 0.019;
  screen_content.add(central_planet_rim);

  const central_planetGeom = new THREE.SphereGeometry(
    0.078,
    24,
    16
  );
  const central_planet = new THREE.Mesh(
    central_planetGeom,
    centralPlanetMat
  );
  central_planet.position.z = 0.022;
  central_planet.scale.z = 0.18;
  screen_content.add(central_planet);

  const planet_patchGeom = new THREE.CircleGeometry(1, 7);
  const planet_patches = new THREE.InstancedMesh(
    planet_patchGeom,
    planetLandMat,
    6
  );
  const patchData = [
    { x: -0.031, y: 0.024, s: 0.017, r: 0.2 },
    { x: 0.022, y: 0.031, s: 0.014, r: -0.4 },
    { x: 0.035, y: -0.018, s: 0.016, r: 0.5 },
    { x: -0.020, y: -0.031, s: 0.013, r: -0.2 },
    { x: -0.043, y: -0.008, s: 0.010, r: 0.7 },
    { x: 0.006, y: 0.002, s: 0.012, r: -0.6 },
  ];
  const patchDummy = new THREE.Object3D();
  for (let i = 0; i < patchData.length; i++) {
    const patch = patchData[i];
    patchDummy.position.set(patch.x, patch.y, 0.038);
    patchDummy.rotation.set(0, 0, patch.r);
    patchDummy.scale.set(patch.s, patch.s * 0.72, 1);
    patchDummy.updateMatrix();
    planet_patches.setMatrixAt(i, patchDummy.matrix);
  }
  planet_patches.instanceMatrix.needsUpdate = true;
  planet_patches.frustumCulled = false;
  screen_content.add(planet_patches);

  const central_planet_highlightGeom = new THREE.CircleGeometry(
    0.012,
    12
  );
  const central_planet_highlight = new THREE.Mesh(
    central_planet_highlightGeom,
    whiteStarMat
  );
  central_planet_highlight.position.set(-0.025, 0.031, 0.040);
  central_planet_highlight.scale.set(1, 0.55, 1);
  screen_content.add(central_planet_highlight);

  const screen_glassShape = makeRoundedRectShape(0.955, 1.205, 0.067);
  const screen_glassGeom = new THREE.ShapeGeometry(
    screen_glassShape,
    12
  );
  const screen_glass = new THREE.Mesh(screen_glassGeom, glassMat);
  screen_glass.position.set(0, -0.01, 0.648);
  root.add(screen_glass);

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