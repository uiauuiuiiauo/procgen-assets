export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_teapot";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf1efe5,
    metalness: 0.0,
    roughness: 0.4,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const chromeHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkInteriorMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const baseTrimMat = new THREE.MeshStandardMaterial({
    color: 0x9b7444,
    metalness: 0.0,
    roughness: 0.4,
  });

  function glazeMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });
  }

  const pinkMat = glazeMaterial(0xd83d70);
  const lightPinkMat = glazeMaterial(0xf18aaa);
  const darkPinkMat = glazeMaterial(0x9d1748);
  const yellowMat = glazeMaterial(0xf2c636);
  const orangeMat = glazeMaterial(0xd9791c);
  const goldCenterMat = glazeMaterial(0xd6a21b);
  const blueMat = glazeMaterial(0x4e77c9);
  const purpleMat = glazeMaterial(0x8465bd);
  const lavenderMat = glazeMaterial(0x9da9df);
  const darkGreenMat = glazeMaterial(0x28683b);
  const greenMat = glazeMaterial(0x4c914e);
  const lightGreenMat = glazeMaterial(0x79ad58);
  const stemMat = glazeMaterial(0x416d35);

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.12),
    new THREE.Vector2(0.42, 0.12),
    new THREE.Vector2(0.50, 0.16),
    new THREE.Vector2(0.59, 0.23),
    new THREE.Vector2(0.68, 0.34),
    new THREE.Vector2(0.74, 0.48),
    new THREE.Vector2(0.77, 0.64),
    new THREE.Vector2(0.76, 0.78),
    new THREE.Vector2(0.72, 0.93),
    new THREE.Vector2(0.65, 1.05),
    new THREE.Vector2(0.56, 1.13),
    new THREE.Vector2(0.48, 1.16),
    new THREE.Vector2(0.00, 1.16),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const footProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.46, 0.00),
    new THREE.Vector2(0.50, 0.025),
    new THREE.Vector2(0.51, 0.075),
    new THREE.Vector2(0.49, 0.13),
    new THREE.Vector2(0.43, 0.17),
    new THREE.Vector2(0.00, 0.17),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 64);
  const foot = new THREE.Mesh(footGeom, bodyMat);
  foot.name = "foot";
  root.add(foot);

  const base_trimGeom = new THREE.TorusGeometry(0.49, 0.007, 8, 64);
  const base_trim = new THREE.Mesh(base_trimGeom, baseTrimMat);
  base_trim.name = "base_trim";
  base_trim.rotation.x = Math.PI / 2;
  base_trim.position.y = 0.012;
  root.add(base_trim);

  const lidProfile = [
    new THREE.Vector2(0.00, 1.14),
    new THREE.Vector2(0.48, 1.14),
    new THREE.Vector2(0.53, 1.17),
    new THREE.Vector2(0.50, 1.21),
    new THREE.Vector2(0.47, 1.28),
    new THREE.Vector2(0.40, 1.36),
    new THREE.Vector2(0.30, 1.43),
    new THREE.Vector2(0.15, 1.48),
    new THREE.Vector2(0.00, 1.50),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, bodyMat);
  lid.name = "lid";
  root.add(lid);

  const lid_rimGeom = new THREE.TorusGeometry(0.515, 0.032, 12, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, chromeMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 1.165;
  root.add(lid_rim);

  const lid_rim_highlightGeom = new THREE.TorusGeometry(0.515, 0.009, 8, 64);
  const lid_rim_highlight = new THREE.Mesh(lid_rim_highlightGeom, chromeHighlightMat);
  lid_rim_highlight.name = "lid_rim_highlight";
  lid_rim_highlight.rotation.x = Math.PI / 2;
  lid_rim_highlight.position.y = 1.192;
  root.add(lid_rim_highlight);

  const lid_trimGeom = new THREE.TorusGeometry(0.493, 0.007, 8, 64);
  const lid_trim = new THREE.Mesh(lid_trimGeom, baseTrimMat);
  lid_trim.name = "lid_trim";
  lid_trim.rotation.x = Math.PI / 2;
  lid_trim.position.y = 1.128;
  root.add(lid_trim);

  const knob_baseGeom = new THREE.CylinderGeometry(0.095, 0.115, 0.055, 32);
  const knob_base = new THREE.Mesh(knob_baseGeom, chromeMat);
  knob_base.name = "knob_base";
  knob_base.position.y = 1.515;
  root.add(knob_base);

  const knob_ringGeom = new THREE.TorusGeometry(0.09, 0.012, 8, 32);
  const knob_ring = new THREE.Mesh(knob_ringGeom, chromeHighlightMat);
  knob_ring.name = "knob_ring";
  knob_ring.rotation.x = Math.PI / 2;
  knob_ring.position.y = 1.542;
  root.add(knob_ring);

  const knob_stemGeom = new THREE.CylinderGeometry(0.052, 0.062, 0.075, 24);
  const knob_stem = new THREE.Mesh(knob_stemGeom, silverMat);
  knob_stem.name = "knob_stem";
  knob_stem.position.y = 1.575;
  root.add(knob_stem);

  const knobGeom = new THREE.SphereGeometry(0.125, 32, 20);
  const knob = new THREE.Mesh(knobGeom, chromeMat);
  knob.name = "knob";
  knob.scale.set(1.0, 0.82, 1.0);
  knob.position.y = 1.68;
  root.add(knob);

  const handlePoints = [
    new THREE.Vector3(0.62, 0.36, -0.08),
    new THREE.Vector3(0.88, 0.48, -0.08),
    new THREE.Vector3(1.12, 0.70, -0.08),
    new THREE.Vector3(1.28, 0.98, -0.08),
    new THREE.Vector3(1.23, 1.24, -0.08),
    new THREE.Vector3(1.05, 1.44, -0.08),
    new THREE.Vector3(0.82, 1.49, -0.08),
    new THREE.Vector3(0.65, 1.38, -0.08),
    new THREE.Vector3(0.56, 1.10, -0.08),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(handleCurve, 72, 0.075, 14, false);
  const handle = new THREE.Mesh(handleGeom, chromeMat);
  handle.name = "handle";
  root.add(handle);

  const handleHighlightPoints = handlePoints.map(
    (point) => new THREE.Vector3(point.x - 0.008, point.y, point.z + 0.068)
  );
  const handleHighlightCurve = new THREE.CatmullRomCurve3(
    handleHighlightPoints,
    false,
    "centripetal"
  );
  const handle_highlightGeom = new THREE.TubeGeometry(
    handleHighlightCurve,
    72,
    0.012,
    8,
    false
  );
  const handle_highlight = new THREE.Mesh(handle_highlightGeom, chromeHighlightMat);
  handle_highlight.name = "handle_highlight";
  root.add(handle_highlight);

  const handleSocketGeom = new THREE.SphereGeometry(0.12, 24, 14);
  const handle_upper_socket = new THREE.Mesh(handleSocketGeom, chromeMat);
  handle_upper_socket.name = "handle_upper_socket";
  handle_upper_socket.scale.set(1.05, 0.72, 0.78);
  handle_upper_socket.position.set(0.57, 1.10, -0.075);
  root.add(handle_upper_socket);

  const handle_lower_socket = new THREE.Mesh(handleSocketGeom, chromeMat);
  handle_lower_socket.name = "handle_lower_socket";
  handle_lower_socket.scale.set(1.15, 0.78, 0.82);
  handle_lower_socket.position.set(0.63, 0.38, -0.07);
  root.add(handle_lower_socket);

  function createTaperedTubeGeometry(
    curve,
    startRadius,
    endRadius,
    tubularSegments,
    radialSegments
  ) {
    const positions = [];
    const indices = [];
    const frames = curve.computeFrenetFrames(tubularSegments, false);
    const point = new THREE.Vector3();
    const offset = new THREE.Vector3();

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const radius =
        startRadius +
        (endRadius - startRadius) * (0.25 * t + 0.75 * t * t);
      curve.getPointAt(t, point);

      for (let j = 0; j < radialSegments; j++) {
        const angle = (j / radialSegments) * Math.PI * 2;
        offset
          .copy(frames.normals[i])
          .multiplyScalar(Math.cos(angle) * radius);
        offset.addScaledVector(
          frames.binormals[i],
          Math.sin(angle) * radius
        );
        positions.push(
          point.x + offset.x,
          point.y + offset.y,
          point.z + offset.z
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + nextJ;
        const d = i * radialSegments + nextJ;
        indices.push(a, d, b, d, c, b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const spoutPoints = [
    new THREE.Vector3(-0.56, 0.55, -0.02),
    new THREE.Vector3(-0.74, 0.42, -0.015),
    new THREE.Vector3(-0.91, 0.39, -0.005),
    new THREE.Vector3(-1.04, 0.52, 0.01),
    new THREE.Vector3(-1.11, 0.76, 0.03),
    new THREE.Vector3(-1.15, 1.00, 0.06),
    new THREE.Vector3(-1.26, 1.16, 0.13),
    new THREE.Vector3(-1.39, 1.22, 0.22),
  ];
  const spoutCurve = new THREE.CatmullRomCurve3(
    spoutPoints,
    false,
    "centripetal"
  );
  const spoutGeom = createTaperedTubeGeometry(
    spoutCurve,
    0.205,
    0.085,
    64,
    18
  );
  const spout = new THREE.Mesh(spoutGeom, chromeMat);
  spout.name = "spout";
  root.add(spout);

  const spoutHighlightPoints = spoutPoints.map(
    (point, index) => {
      const t = index / (spoutPoints.length - 1);
      return new THREE.Vector3(
        point.x + 0.005,
        point.y + 0.025,
        point.z + 0.12 - 0.05 * t
      );
    }
  );
  const spoutHighlightCurve = new THREE.CatmullRomCurve3(
    spoutHighlightPoints,
    false,
    "centripetal"
  );
  const spout_highlightGeom = new THREE.TubeGeometry(
    spoutHighlightCurve,
    64,
    0.012,
    8,
    false
  );
  const spout_highlight = new THREE.Mesh(
    spout_highlightGeom,
    chromeHighlightMat
  );
  spout_highlight.name = "spout_highlight";
  root.add(spout_highlight);

  const spoutTip = spoutCurve.getPointAt(1);
  const spoutTangent = spoutCurve.getTangentAt(1).normalize();
  const spoutTipQuat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutTangent
  );

  const spout_rimGeom = new THREE.TorusGeometry(0.085, 0.014, 10, 40);
  const spout_rim = new THREE.Mesh(spout_rimGeom, chromeMat);
  spout_rim.name = "spout_rim";
  spout_rim.position.copy(spoutTip);
  spout_rim.quaternion.copy(spoutTipQuat);
  root.add(spout_rim);

  const spout_openingGeom = new THREE.CircleGeometry(0.073, 40);
  const spout_opening = new THREE.Mesh(spout_openingGeom, darkInteriorMat);
  spout_opening.name = "spout_opening";
  spout_opening.position
    .copy(spoutTip)
    .addScaledVector(spoutTangent, -0.012);
  spout_opening.quaternion.copy(spoutTipQuat);
  root.add(spout_opening);

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  root.add(floral_decoration);

  const bodyRadiusSamples = [
    [0.12, 0.42],
    [0.16, 0.50],
    [0.23, 0.59],
    [0.34, 0.68],
    [0.48, 0.74],
    [0.64, 0.77],
    [0.78, 0.76],
    [0.93, 0.72],
    [1.05, 0.65],
    [1.13, 0.56],
    [1.16, 0.48],
  ];
  const lidRadiusSamples = [
    [1.14, 0.48],
    [1.17, 0.53],
    [1.21, 0.50],
    [1.28, 0.47],
    [1.36, 0.40],
    [1.43, 0.30],
    [1.48, 0.15],
    [1.50, 0.00],
  ];

  function radiusFromSamples(samples, y) {
    if (y <= samples[0][0]) return samples[0][1];
    for (let i = 0; i < samples.length - 1; i++) {
      const a = samples[i];
      const b = samples[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return samples[samples.length - 1][1];
  }

  function bodyRadiusAt(y) {
    return radiusFromSamples(bodyRadiusSamples, y);
  }

  function lidRadiusAt(y) {
    return radiusFromSamples(lidRadiusSamples, y);
  }

  function surfacePose(radiusFunction, angle, y, extra) {
    const radius = radiusFunction(y);
    const epsilon = 0.006;
    const slope =
      (radiusFunction(y + epsilon) - radiusFunction(y - epsilon)) /
      (epsilon * 2);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -slope,
      Math.sin(angle)
    ).normalize();
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ).addScaledVector(normal, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function bodySurfacePose(angle, y, extra = 0.009) {
    return surfacePose(bodyRadiusAt, angle, y, extra);
  }

  function lidSurfacePose(angle, y, extra = 0.009) {
    return surfacePose(lidRadiusAt, angle, y, extra);
  }

  function makeSurfaceMatrix(
    radiusFunction,
    angle,
    y,
    rotation,
    sx,
    sy,
    extra
  ) {
    const pose = surfacePose(radiusFunction, angle, y, extra);
    const localRotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rotation
    );
    const quaternion = pose.quaternion.clone().multiply(localRotation);
    return new THREE.Matrix4().compose(
      pose.position,
      quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
  }

  function placeSurfaceMesh(
    mesh,
    radiusFunction,
    angle,
    y,
    rotation,
    sx,
    sy,
    extra
  ) {
    const pose = surfacePose(radiusFunction, angle, y, extra);
    mesh.position.copy(pose.position);
    mesh.quaternion.copy(pose.quaternion);
    mesh.rotateZ(rotation);
    mesh.scale.set(sx, sy, 1);
  }

  function addSurfaceVine(
    parent,
    radiusFunction,
    name,
    angle0,
    y0,
    angle1,
    y1,
    bend,
    radius
  ) {
    const points = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const angle = angle0 + (angle1 - angle0) * t;
      const y =
        y0 +
        (y1 - y0) * t +
        Math.sin(t * Math.PI) * bend;
      points.push(bodySurfacePose(angle, y, 0.009).position);
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const vineGeom = new THREE.TubeGeometry(curve, 24, radius, 6, false);
    const vine = new THREE.Mesh(vineGeom, stemMat);
    vine.name = name;
    parent.add(vine);
    return vine;
  }

  const petalGeom = new THREE.CircleGeometry(1, 20);

  function createFlowerPetals(
    name,
    count,
    angle,
    y,
    spread,
    petalLength,
    petalWidth,
    radiusFunction,
    material,
    phase
  ) {
    const petals = new THREE.InstancedMesh(petalGeom, material, count);
    petals.name = name;

    const baseRadius = radiusFunction(y);
    for (let i = 0; i < count; i++) {
      const rotation = phase + (i / count) * Math.PI * 2;
      const localX = Math.cos(rotation) * spread;
      const localY = Math.sin(rotation) * spread;
      const petalAngle = angle - localX / baseRadius;
      const petalY = y + localY;
      petals.setMatrixAt(
        i,
        makeSurfaceMatrix(
          radiusFunction,
          petalAngle,
          petalY,
          rotation,
          petalLength,
          petalWidth,
          0.012
        )
      );
    }
    petals.instanceMatrix.needsUpdate = true;
    return petals;
  }

  function createLeafInstances(name, entries, radiusFunction, material) {
    const leaves = new THREE.InstancedMesh(
      petalGeom,
      material,
      entries.length
    );
    leaves.name = name;
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      leaves.setMatrixAt(
        i,
        makeSurfaceMatrix(
          radiusFunction,
          entry[0],
          entry[1],
          entry[2],
          entry[3],
          entry[4],
          0.012
        )
      );
    }
    leaves.instanceMatrix.needsUpdate = true;
    return leaves;
  }

  const main_vines = new THREE.Group();
  main_vines.name = "main_vines";
  floral_decoration.add(main_vines);

  const central_vine = addSurfaceVine(
    main_vines,
    bodyRadiusAt,
    "central_vine",
    1.55,
    0.27,
    1.50,
    0.62,
    0.035,
    0.006
  );
  const left_vine = addSurfaceVine(
    main_vines,
    bodyRadiusAt,
    "left_vine",
    1.58,
    0.32,
    2.30,
    0.66,
    0.075,
    0.005
  );
  const blue_vine = addSurfaceVine(
    main_vines,
    bodyRadiusAt,
    "blue_vine",
    1.72,
    0.31,
    2.42,
    0.50,
    0.045,
    0.005
  );
  const right_vine = addSurfaceVine(
    main_vines,
    bodyRadiusAt,
    "right_vine",
    1.42,
    0.28,
    0.82,
    0.88,
    0.075,
    0.006
  );
  const upper_right_vine = addSurfaceVine(
    main_vines,
    bodyRadiusAt,
    "upper_right_vine",
    1.25,
    0.42,
    0.92,
    0.96,
    0.045,
    0.005
  );
  const upper_left_vine = addSurfaceVine(
    main_vines,
    bodyRadiusAt,
    "upper_left_vine",
    1.52,
    0.47,
    1.96,
    0.88,
    0.045,
    0.005
  );

  const dark_green_leaves = createLeafInstances(
    "dark_green_leaves",
    [
      [1.55, 0.31, -0.55, 0.095, 0.040],
      [1.50, 0.40, 0.85, 0.090, 0.038],
      [1.35, 0.54, -0.75, 0.085, 0.036],
      [1.25, 0.68, 0.75, 0.080, 0.034],
      [1.05, 0.42, -0.85, 0.095, 0.040],
      [0.95, 0.55, 0.75, 0.090, 0.038],
      [0.84, 0.70, -0.55, 0.080, 0.034],
      [2.12, 0.40, 0.75, 0.090, 0.038],
      [2.25, 0.54, -0.70, 0.080, 0.034],
      [1.85, 0.76, 0.90, 0.085, 0.036],
      [1.72, 0.86, -0.75, 0.075, 0.032],
    ],
    bodyRadiusAt,
    darkGreenMat
  );
  floral_decoration.add(dark_green_leaves);

  const light_green_leaves = createLeafInstances(
    "light_green_leaves",
    [
      [1.42, 0.35, 0.40, 0.075, 0.032],
      [1.32, 0.75, -0.35, 0.075, 0.032],
      [1.12, 0.62, 0.95, 0.080, 0.034],
      [0.88, 0.45, -0.90, 0.075, 0.032],
      [2.00, 0.35, 0.80, 0.075, 0.032],
      [2.30, 0.58, -0.75, 0.070, 0.030],
      [1.95, 0.84, 0.70, 0.070, 0.030],
    ],
    bodyRadiusAt,
    lightGreenMat
  );
  floral_decoration.add(light_green_leaves);

  const central_flower_petals = createFlowerPetals(
    "central_flower_petals",
    5,
    1.50,
    0.61,
    0.105,
    0.130,
    0.065,
    bodyRadiusAt,
    pinkMat,
    0.18
  );
  floral_decoration.add(central_flower_petals);

  const central_flower_inner_petals = createFlowerPetals(
    "central_flower_inner_petals",
    5,
    1.50,
    0.61,
    0.060,
    0.075,
    0.032,
    bodyRadiusAt,
    lightPinkMat,
    0.18
  );
  floral_decoration.add(central_flower_inner_petals);

  const central_flower_centerGeom = new THREE.CircleGeometry(1, 24);
  const central_flower_center = new THREE.Mesh(
    central_flower_centerGeom,
    goldCenterMat
  );
  central_flower_center.name = "central_flower_center";
  placeSurfaceMesh(
    central_flower_center,
    bodyRadiusAt,
    1.50,
    0.61,
    0,
    0.055,
    0.055,
    0.016
  );
  floral_decoration.add(central_flower_center);

  const central_flower_stamens = createLeafInstances(
    "central_flower_stamens",
    [
      [1.44, 0.61, 0.0, 0.010, 0.010],
      [1.48, 0.65, 0.0, 0.009, 0.009],
      [1.53, 0.64, 0.0, 0.009, 0.009],
      [1.57, 0.60, 0.0, 0.009, 0.009],
      [1.52, 0.56, 0.0, 0.009, 0.009],
      [1.46, 0.57, 0.0, 0.008, 0.008],
    ],
    bodyRadiusAt,
    darkPinkMat
  );
  floral_decoration.add(central_flower_stamens);

  const upper_pink_flower_petals = createFlowerPetals(
    "upper_pink_flower_petals",
    5,
    1.96,
    0.87,
    0.070,
    0.090,
    0.043,
    bodyRadiusAt,
    pinkMat,
    0.35
  );
  floral_decoration.add(upper_pink_flower_petals);

  const upper_pink_flower_centerGeom = new THREE.CircleGeometry(1, 20);
  const upper_pink_flower_center = new THREE.Mesh(
    upper_pink_flower_centerGeom,
    goldCenterMat
  );
  upper_pink_flower_center.name = "upper_pink_flower_center";
  placeSurfaceMesh(
    upper_pink_flower_center,
    bodyRadiusAt,
    1.96,
    0.87,
    0,
    0.030,
    0.030,
    0.016
  );
  floral_decoration.add(upper_pink_flower_center);

  const right_pink_flower_petals = createFlowerPetals(
    "right_pink_flower_petals",
    6,
    0.82,
    0.72,
    0.075,
    0.095,
    0.043,
    bodyRadiusAt,
    pinkMat,
    0.10
  );
  floral_decoration.add(right_pink_flower_petals);

  const right_pink_flower_centerGeom = new THREE.CircleGeometry(1, 20);
  const right_pink_flower_center = new THREE.Mesh(
    right_pink_flower_centerGeom,
    goldCenterMat
  );
  right_pink_flower_center.name = "right_pink_flower_center";
  placeSurfaceMesh(
    right_pink_flower_center,
    bodyRadiusAt,
    0.82,
    0.72,
    0,
    0.032,
    0.032,
    0.016
  );
  floral_decoration.add(right_pink_flower_center);

  const yellow_flower_petals = createFlowerPetals(
    "yellow_flower_petals",
    7,
    1.10,
    0.79,
    0.073,
    0.095,
    0.040,
    bodyRadiusAt,
    yellowMat,
    0.10
  );
  floral_decoration.add(yellow_flower_petals);

  const yellow_flower_centerGeom = new THREE.CircleGeometry(1, 20);
  const yellow_flower_center = new THREE.Mesh(
    yellow_flower_centerGeom,
    orangeMat
  );
  yellow_flower_center.name = "yellow_flower_center";
  placeSurfaceMesh(
    yellow_flower_center,
    bodyRadiusAt,
    1.10,
    0.79,
    0,
    0.037,
    0.037,
    0.016
  );
  floral_decoration.add(yellow_flower_center);

  const small_yellow_flower_petals = createFlowerPetals(
    "small_yellow_flower_petals",
    6,
    0.92,
    0.48,
    0.050,
    0.065,
    0.030,
    bodyRadiusAt,
    yellowMat,
    0.25
  );
  floral_decoration.add(small_yellow_flower_petals);

  const small_yellow_flower_centerGeom = new THREE.CircleGeometry(1, 18);
  const small_yellow_flower_center = new THREE.Mesh(
    small_yellow_flower_centerGeom,
    orangeMat
  );
  small_yellow_flower_center.name = "small_yellow_flower_center";
  placeSurfaceMesh(
    small_yellow_flower_center,
    bodyRadiusAt,
    0.92,
    0.48,
    0,
    0.025,
    0.025,
    0.016
  );
  floral_decoration.add(small_yellow_flower_center);

  const tiny_yellow_flower_petals = createFlowerPetals(
    "tiny_yellow_flower_petals",
    5,
    0.90,
    0.96,
    0.030,
    0.043,
    0.020,
    bodyRadiusAt,
    yellowMat,
    0.20
  );
  floral_decoration.add(tiny_yellow_flower_petals);

  const tiny_yellow_flower_centerGeom = new THREE.CircleGeometry(1, 16);
  const tiny_yellow_flower_center = new THREE.Mesh(
    tiny_yellow_flower_centerGeom,
    orangeMat
  );
  tiny_yellow_flower_center.name = "tiny_yellow_flower_center";
  placeSurfaceMesh(
    tiny_yellow_flower_center,
    bodyRadiusAt,
    0.90,
    0.96,
    0,
    0.016,
    0.016,
    0.016
  );
  floral_decoration.add(tiny_yellow_flower_center);

  const blue_flower_petals = createFlowerPetals(
    "blue_flower_petals",
    5,
    2.31,
    0.51,
    0.052,
    0.068,
    0.030,
    bodyRadiusAt,
    blueMat,
    0.30
  );
  floral_decoration.add(blue_flower_petals);

  const blue_flower_centerGeom = new THREE.CircleGeometry(1, 18);
  const blue_flower_center = new THREE.Mesh(
    blue_flower_centerGeom,
    goldCenterMat
  );
  blue_flower_center.name = "blue_flower_center";
  placeSurfaceMesh(
    blue_flower_center,
    bodyRadiusAt,
    2.31,
    0.51,
    0,
    0.021,
    0.021,
    0.016
  );
  floral_decoration.add(blue_flower_center);

  const purple_flower_petals = createFlowerPetals(
    "purple_flower_petals",
    5,
    2.02,
    0.37,
    0.060,
    0.075,
    0.034,
    bodyRadiusAt,
    purpleMat,
    0.12
  );
  floral_decoration.add(purple_flower_petals);

  const purple_flower_centerGeom = new THREE.CircleGeometry(1, 18);
  const purple_flower_center = new THREE.Mesh(
    purple_flower_centerGeom,
    goldCenterMat
  );
  purple_flower_center.name = "purple_flower_center";
  placeSurfaceMesh(
    purple_flower_center,
    bodyRadiusAt,
    2.02,
    0.37,
    0,
    0.024,
    0.024,
    0.016
  );
  floral_decoration.add(purple_flower_center);

  const lavender_flower_petals = createFlowerPetals(
    "lavender_flower_petals",
    5,
    2.18,
    0.45,
    0.040,
    0.055,
    0.026,
    bodyRadiusAt,
    lavenderMat,
    0.40
  );
  floral_decoration.add(lavender_flower_petals);

  const lid_vines = new THREE.Group();
  lid_vines.name = "lid_vines";
  floral_decoration.add(lid_vines);

  const lid_left_vine = addSurfaceVine(
    lid_vines,
    lidRadiusAt,
    "lid_left_vine",
    2.18,
    1.22,
    1.72,
    1.37,
    0.025,
    0.0035
  );
  const lid_right_vine = addSurfaceVine(
    lid_vines,
    lidRadiusAt,
    "lid_right_vine",
    1.23,
    1.24,
    1.05,
    1.34,
    0.018,
    0.0035
  );

  const lid_dark_leaves = createLeafInstances(
    "lid_dark_leaves",
    [
      [2.05, 1.25, 0.75, 0.045, 0.020],
      [1.92, 1.31, -0.75, 0.050, 0.021],
      [1.76, 1.27, 0.85, 0.045, 0.020],
      [1.13, 1.29, -0.70, 0.040, 0.018],
    ],
    lidRadiusAt,
    darkGreenMat
  );
  floral_decoration.add(lid_dark_leaves);

  const lid_light_leaves = createLeafInstances(
    "lid_light_leaves",
    [
      [2.18, 1.29, -0.70, 0.040, 0.018],
      [1.82, 1.36, 0.55, 0.040, 0.018],
      [1.22, 1.23, 0.80, 0.038, 0.017],
    ],
    lidRadiusAt,
    lightGreenMat
  );
  floral_decoration.add(lid_light_leaves);

  const lid_pink_petals = createFlowerPetals(
    "lid_pink_petals",
    5,
    1.82,
    1.36,
    0.025,
    0.034,
    0.016,
    lidRadiusAt,
    pinkMat,
    0.25
  );
  floral_decoration.add(lid_pink_petals);

  const lid_pink_centerGeom = new THREE.CircleGeometry(1, 14);
  const lid_pink_center = new THREE.Mesh(
    lid_pink_centerGeom,
    goldCenterMat
  );
  lid_pink_center.name = "lid_pink_center";
  placeSurfaceMesh(
    lid_pink_center,
    lidRadiusAt,
    1.82,
    1.36,
    0,
    0.012,
    0.012,
    0.015
  );
  floral_decoration.add(lid_pink_center);

  const lid_orange_petals = createFlowerPetals(
    "lid_orange_petals",
    5,
    1.08,
    1.31,
    0.022,
    0.030,
    0.014,
    lidRadiusAt,
    orangeMat,
    0.15
  );
  floral_decoration.add(lid_orange_petals);

  const lid_orange_centerGeom = new THREE.CircleGeometry(1, 14);
  const lid_orange_center = new THREE.Mesh(
    lid_orange_centerGeom,
    goldCenterMat
  );
  lid_orange_center.name = "lid_orange_center";
  placeSurfaceMesh(
    lid_orange_center,
    lidRadiusAt,
    1.08,
    1.31,
    0,
    0.011,
    0.011,
    0.015
  );
  floral_decoration.add(lid_orange_center);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
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