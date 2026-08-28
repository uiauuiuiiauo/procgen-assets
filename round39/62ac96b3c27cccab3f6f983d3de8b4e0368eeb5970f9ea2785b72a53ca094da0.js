export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_teapot";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf3f0e5,
    metalness: 0.0,
    roughness: 0.4,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkInteriorMat = new THREE.MeshStandardMaterial({
    color: 0x343434,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xb08d57,
    metalness: 0.5,
    roughness: 0.25,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xd84f7d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lightPinkMat = new THREE.MeshStandardMaterial({
    color: 0xf29bad,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: 0xb52f65,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf2bf3e,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xd98920,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x567fc5,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const purpleMat = new THREE.MeshStandardMaterial({
    color: 0x7665b1,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const darkGreenMat = new THREE.MeshStandardMaterial({
    color: 0x28683c,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lightGreenMat = new THREE.MeshStandardMaterial({
    color: 0x5a984f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.62, 0.00),
    new THREE.Vector2(0.78, 0.05),
    new THREE.Vector2(0.88, 0.14),
    new THREE.Vector2(0.97, 0.30),
    new THREE.Vector2(1.05, 0.55),
    new THREE.Vector2(1.09, 0.80),
    new THREE.Vector2(1.08, 1.00),
    new THREE.Vector2(1.02, 1.20),
    new THREE.Vector2(0.92, 1.38),
    new THREE.Vector2(0.78, 1.48),
    new THREE.Vector2(0.00, 1.48),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, ceramicMat);
  body.name = "body";
  root.add(body);

  const base_footGeom = new THREE.CylinderGeometry(0.78, 0.84, 0.12, 64);
  const base_foot = new THREE.Mesh(base_footGeom, ceramicMat);
  base_foot.name = "base_foot";
  base_foot.position.y = -0.07;
  root.add(base_foot);

  const base_trimGeom = new THREE.TorusGeometry(0.825, 0.012, 8, 64);
  const base_trim = new THREE.Mesh(base_trimGeom, goldTrimMat);
  base_trim.name = "base_trim";
  base_trim.rotation.x = Math.PI / 2;
  base_trim.position.y = -0.13;
  root.add(base_trim);

  const lidProfile = [
    new THREE.Vector2(0.00, 1.48),
    new THREE.Vector2(0.76, 1.48),
    new THREE.Vector2(0.82, 1.53),
    new THREE.Vector2(0.78, 1.62),
    new THREE.Vector2(0.68, 1.76),
    new THREE.Vector2(0.52, 1.90),
    new THREE.Vector2(0.30, 2.00),
    new THREE.Vector2(0.10, 2.03),
    new THREE.Vector2(0.00, 2.03),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, ceramicMat);
  lid.name = "lid";
  root.add(lid);

  const lid_shadowGeom = new THREE.TorusGeometry(0.80, 0.022, 8, 64);
  const lid_shadow = new THREE.Mesh(lid_shadowGeom, darkInteriorMat);
  lid_shadow.name = "lid_shadow";
  lid_shadow.rotation.x = Math.PI / 2;
  lid_shadow.position.y = 1.495;
  root.add(lid_shadow);

  const lid_rimGeom = new THREE.TorusGeometry(0.82, 0.055, 12, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, chromeMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 1.525;
  root.add(lid_rim);

  const lid_rim_highlightGeom = new THREE.TorusGeometry(0.82, 0.014, 8, 64);
  const lid_rim_highlight = new THREE.Mesh(lid_rim_highlightGeom, ceramicMat);
  lid_rim_highlight.name = "lid_rim_highlight";
  lid_rim_highlight.rotation.x = Math.PI / 2;
  lid_rim_highlight.position.y = 1.572;
  root.add(lid_rim_highlight);

  const knob_baseGeom = new THREE.CylinderGeometry(0.17, 0.20, 0.075, 32);
  const knob_base = new THREE.Mesh(knob_baseGeom, chromeMat);
  knob_base.name = "knob_base";
  knob_base.position.y = 2.065;
  root.add(knob_base);

  const knob_collarGeom = new THREE.TorusGeometry(0.17, 0.025, 10, 40);
  const knob_collar = new THREE.Mesh(knob_collarGeom, chromeMat);
  knob_collar.name = "knob_collar";
  knob_collar.rotation.x = Math.PI / 2;
  knob_collar.position.y = 2.105;
  root.add(knob_collar);

  const knob_stemGeom = new THREE.CylinderGeometry(0.09, 0.11, 0.12, 32);
  const knob_stem = new THREE.Mesh(knob_stemGeom, chromeMat);
  knob_stem.name = "knob_stem";
  knob_stem.position.y = 2.15;
  root.add(knob_stem);

  const knobGeom = new THREE.SphereGeometry(0.19, 40, 24);
  const knob = new THREE.Mesh(knobGeom, chromeMat);
  knob.name = "knob";
  knob.position.y = 2.32;
  knob.scale.set(1.0, 1.05, 1.0);
  root.add(knob);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.88, 1.25, -0.03),
    new THREE.Vector3(1.16, 1.58, -0.04),
    new THREE.Vector3(1.48, 1.82, -0.05),
    new THREE.Vector3(1.78, 1.86, -0.05),
    new THREE.Vector3(2.02, 1.68, -0.05),
    new THREE.Vector3(2.12, 1.38, -0.05),
    new THREE.Vector3(2.10, 1.05, -0.05),
    new THREE.Vector3(1.98, 0.72, -0.05),
    new THREE.Vector3(1.75, 0.45, -0.04),
    new THREE.Vector3(1.45, 0.28, -0.03),
    new THREE.Vector3(0.92, 0.42, -0.02),
  ], false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handlePath, 80, 0.105, 16, false);
  const handle = new THREE.Mesh(handleGeom, chromeMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.18, 28, 16);
  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, chromeMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.91, 1.25, -0.025);
  upper_handle_mount.scale.set(1.25, 0.82, 0.92);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, chromeMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.94, 0.43, -0.02);
  lower_handle_mount.scale.set(1.28, 0.88, 0.95);
  root.add(lower_handle_mount);

  function createTaperedTubeGeometry(curve, tubularSegments, radialSegments) {
    const positions = [];
    const indices = [];
    const frames = curve.computeFrenetFrames(tubularSegments, false);
    const point = new THREE.Vector3();
    const offset = new THREE.Vector3();

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      curve.getPointAt(t, point);
      const radius = t < 0.78
        ? 0.285 + (0.125 - 0.285) * (t / 0.78)
        : 0.125 + (0.165 - 0.125) * ((t - 0.78) / 0.22);

      for (let j = 0; j <= radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        offset.copy(frames.normals[i]).multiplyScalar(Math.cos(angle) * radius);
        offset.addScaledVector(frames.binormals[i], Math.sin(angle) * radius);
        positions.push(point.x + offset.x, point.y + offset.y, point.z + offset.z);
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * (radialSegments + 1) + j;
        const b = (i + 1) * (radialSegments + 1) + j;
        const c = b + 1;
        const d = a + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const spoutPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.82, 0.72, 0.00),
    new THREE.Vector3(-1.08, 0.62, 0.00),
    new THREE.Vector3(-1.30, 0.78, 0.00),
    new THREE.Vector3(-1.43, 1.08, 0.00),
    new THREE.Vector3(-1.52, 1.40, 0.01),
    new THREE.Vector3(-1.68, 1.62, 0.03),
    new THREE.Vector3(-1.90, 1.72, 0.12),
  ], false, "centripetal");
  const spoutGeom = createTaperedTubeGeometry(spoutPath, 56, 20);
  const spout = new THREE.Mesh(spoutGeom, chromeMat);
  spout.name = "spout";
  root.add(spout);

  const spout_mountGeom = new THREE.SphereGeometry(0.32, 32, 20);
  const spout_mount = new THREE.Mesh(spout_mountGeom, chromeMat);
  spout_mount.name = "spout_mount";
  spout_mount.position.set(-0.88, 0.73, 0.0);
  spout_mount.scale.set(0.92, 1.22, 1.0);
  root.add(spout_mount);

  const spoutEnd = spoutPath.getPointAt(1);
  const spoutTangent = spoutPath.getTangentAt(1).normalize();
  const spoutOrientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutTangent
  );

  const spout_openingGeom = new THREE.CircleGeometry(0.145, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, darkInteriorMat);
  spout_opening.name = "spout_opening";
  spout_opening.quaternion.copy(spoutOrientation);
  spout_opening.position.copy(spoutEnd).addScaledVector(spoutTangent, 0.008);
  root.add(spout_opening);

  const spout_lipGeom = new THREE.TorusGeometry(0.145, 0.025, 10, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, chromeMat);
  spout_lip.name = "spout_lip";
  spout_lip.quaternion.copy(spoutOrientation);
  spout_lip.position.copy(spoutEnd).addScaledVector(spoutTangent, 0.012);
  root.add(spout_lip);

  const bodyRadiusSamples = [
    [0.00, 0.62],
    [0.14, 0.88],
    [0.30, 0.97],
    [0.55, 1.05],
    [0.80, 1.09],
    [1.00, 1.08],
    [1.20, 1.02],
    [1.38, 0.92],
    [1.48, 0.78],
  ];
  const lidRadiusSamples = [
    [1.48, 0.76],
    [1.53, 0.82],
    [1.62, 0.78],
    [1.76, 0.68],
    [1.90, 0.52],
    [2.00, 0.30],
    [2.03, 0.10],
  ];

  function radiusFromSamples(samples, y) {
    if (y <= samples[0][0]) return samples[0][1];
    for (let i = 1; i < samples.length; i++) {
      if (y <= samples[i][0]) {
        const y0 = samples[i - 1][0];
        const y1 = samples[i][0];
        const r0 = samples[i - 1][1];
        const r1 = samples[i][1];
        const t = (y - y0) / (y1 - y0);
        return r0 + (r1 - r0) * t;
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

  function surfacePose(radiusFunction, x, y, extra) {
    const radius = radiusFunction(y);
    const safeX = Math.max(-radius * 0.985, Math.min(radius * 0.985, x));
    const z = Math.sqrt(Math.max(0.0001, radius * radius - safeX * safeX));
    const normal = new THREE.Vector3(safeX / radius, 0, z / radius).normalize();
    const position = new THREE.Vector3(safeX, y, z).addScaledVector(normal, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function bodySurfacePose(x, y, extra = 0.01) {
    return surfacePose(bodyRadiusAt, x, y, extra);
  }

  function lidSurfacePose(x, y, extra = 0.01) {
    return surfacePose(lidRadiusAt, x, y, extra);
  }

  const petalGeom = new THREE.CircleGeometry(1, 24);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(-1, 0);
  leafShape.bezierCurveTo(-0.45, -0.58, 0.45, -0.58, 1, 0);
  leafShape.bezierCurveTo(0.45, 0.58, -0.45, 0.58, -1, 0);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 12);

  function createSurfaceGroup(poseFunction, x, y, extra = 0.012) {
    const pose = poseFunction(x, y, extra);
    const group = new THREE.Group();
    group.position.copy(pose.position);
    group.quaternion.copy(pose.quaternion);
    return group;
  }

  function addFlower(name, poseFunction, x, y, size, count, petalMaterial, centerMaterial, phase = 0) {
    const flower = createSurfaceGroup(poseFunction, x, y);
    flower.name = name;

    const petals = new THREE.InstancedMesh(petalGeom, petalMaterial, count);
    petals.name = name + "_petals";
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = phase + i / count * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * size * 0.50,
        Math.sin(angle) * size * 0.50,
        0.001
      );
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(size * 0.54, size * 0.29, 1);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    const center = new THREE.Mesh(petalGeom, centerMaterial);
    center.name = name + "_center";
    center.scale.setScalar(size * 0.24);
    center.position.z = 0.004;
    flower.add(center);

    const center_detail = new THREE.Mesh(petalGeom, orangeMat);
    center_detail.name = name + "_center_detail";
    center_detail.scale.setScalar(size * 0.105);
    center_detail.position.z = 0.007;
    flower.add(center_detail);

    return flower;
  }

  function addLeaf(name, poseFunction, x, y, length, width, angle, material) {
    const leaf = createSurfaceGroup(poseFunction, x, y);
    leaf.name = name;
    leaf.rotateZ(angle);

    const leaf_surface = new THREE.Mesh(leafGeom, material);
    leaf_surface.name = name + "_surface";
    leaf_surface.scale.set(length * 0.5, width, 1);
    leaf_surface.position.z = 0.002;
    leaf.add(leaf_surface);
    return leaf;
  }

  function addSurfaceStem(name, poseFunction, coordinates, radius, material) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(poseFunction(coordinate[0], coordinate[1], 0.016).position);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, coordinates.length * 8),
      radius,
      6,
      false
    );
    const stem = new THREE.Mesh(geometry, material);
    stem.name = name;
    return stem;
  }

  const body_decoration = new THREE.Group();
  body_decoration.name = "body_decoration";
  root.add(body_decoration);

  const central_pink_flower = addFlower(
    "central_pink_flower", bodySurfacePose, 0.08, 0.73, 0.29, 5,
    pinkMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(central_pink_flower);

  const upper_left_pink_flower = addFlower(
    "upper_left_pink_flower", bodySurfacePose, -0.30, 1.08, 0.20, 3,
    magentaMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(upper_left_pink_flower);

  const upper_right_yellow_flower = addFlower(
    "upper_right_yellow_flower", bodySurfacePose, 0.49, 0.98, 0.22, 6,
    yellowMat, orangeMat, 0
  );
  body_decoration.add(upper_right_yellow_flower);

  const right_magenta_flower = addFlower(
    "right_magenta_flower", bodySurfacePose, 0.79, 0.79, 0.20, 5,
    magentaMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(right_magenta_flower);

  const lower_right_yellow_flower = addFlower(
    "lower_right_yellow_flower", bodySurfacePose, 0.66, 0.43, 0.16, 6,
    yellowMat, orangeMat, 0
  );
  body_decoration.add(lower_right_yellow_flower);

  const lower_left_blue_flower = addFlower(
    "lower_left_blue_flower", bodySurfacePose, -0.43, 0.43, 0.18, 5,
    blueMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(lower_left_blue_flower);

  const lower_left_purple_flower = addFlower(
    "lower_left_purple_flower", bodySurfacePose, -0.18, 0.34, 0.16, 5,
    purpleMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(lower_left_purple_flower);

  const far_left_blue_flower = addFlower(
    "far_left_blue_flower", bodySurfacePose, -0.72, 0.69, 0.13, 3,
    blueMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(far_left_blue_flower);

  const small_purple_bud = addFlower(
    "small_purple_bud", bodySurfacePose, -0.53, 0.89, 0.10, 3,
    purpleMat, yellowMat, Math.PI / 2
  );
  body_decoration.add(small_purple_bud);

  const tall_yellow_bud = addFlower(
    "tall_yellow_bud", bodySurfacePose, 0.77, 1.22, 0.09, 3,
    yellowMat, orangeMat, Math.PI / 2
  );
  body_decoration.add(tall_yellow_bud);

  const central_lower_leaf = addLeaf(
    "central_lower_leaf", bodySurfacePose, 0.02, 0.34, 0.38, 0.18, -1.25, darkGreenMat
  );
  const central_right_leaf = addLeaf(
    "central_right_leaf", bodySurfacePose, 0.38, 0.52, 0.34, 0.17, -0.25, lightGreenMat
  );
  const central_upper_leaf = addLeaf(
    "central_upper_leaf", bodySurfacePose, 0.29, 1.04, 0.36, 0.17, 0.90, darkGreenMat
  );
  const left_green_leaf_lower = addLeaf(
    "left_green_leaf_lower", bodySurfacePose, -0.55, 0.55, 0.30, 0.14, 0.20, lightGreenMat
  );
  const left_green_leaf_upper = addLeaf(
    "left_green_leaf_upper", bodySurfacePose, -0.48, 0.82, 0.29, 0.14, 2.45, darkGreenMat
  );
  const right_green_leaf_lower = addLeaf(
    "right_green_leaf_lower", bodySurfacePose, 0.64, 0.29, 0.32, 0.15, -1.10, darkGreenMat
  );
  const right_green_leaf_middle = addLeaf(
    "right_green_leaf_middle", bodySurfacePose, 0.72, 0.61, 0.31, 0.15, 0.20, lightGreenMat
  );
  const right_green_leaf_upper = addLeaf(
    "right_green_leaf_upper", bodySurfacePose, 0.62, 1.05, 0.32, 0.15, 2.10, darkGreenMat
  );
  const far_right_leaf = addLeaf(
    "far_right_leaf", bodySurfacePose, 0.88, 0.96, 0.27, 0.12, 1.80, lightGreenMat
  );
  const purple_left_leaf = addLeaf(
    "purple_left_leaf", bodySurfacePose, -0.31, 0.31, 0.25, 0.12, 2.70, darkGreenMat
  );
  const purple_right_leaf = addLeaf(
    "purple_right_leaf", bodySurfacePose, -0.05, 0.25, 0.26, 0.12, -0.75, lightGreenMat
  );
  body_decoration.add(
    central_lower_leaf,
    central_right_leaf,
    central_upper_leaf,
    left_green_leaf_lower,
    left_green_leaf_upper,
    right_green_leaf_lower,
    right_green_leaf_middle,
    right_green_leaf_upper,
    far_right_leaf,
    purple_left_leaf,
    purple_right_leaf
  );

  const main_flower_stem = addSurfaceStem(
    "main_flower_stem", bodySurfacePose,
    [[0.06, 0.34], [0.04, 0.54], [0.08, 0.72]], 0.010, darkGreenMat
  );
  const upper_flower_stem = addSurfaceStem(
    "upper_flower_stem", bodySurfacePose,
    [[0.08, 0.72], [0.25, 0.86], [0.49, 0.98]], 0.010, darkGreenMat
  );
  const right_flower_stem = addSurfaceStem(
    "right_flower_stem", bodySurfacePose,
    [[0.20, 0.38], [0.48, 0.60], [0.79, 0.79]], 0.010, darkGreenMat
  );
  const left_flower_stem = addSurfaceStem(
    "left_flower_stem", bodySurfacePose,
    [[-0.78, 0.54], [-0.52, 0.66], [-0.30, 1.08]], 0.010, darkGreenMat
  );
  const lower_branch_stem = addSurfaceStem(
    "lower_branch_stem", bodySurfacePose,
    [[-0.62, 0.30], [-0.40, 0.42], [-0.18, 0.34]], 0.009, lightGreenMat
  );
  const tall_bud_stem = addSurfaceStem(
    "tall_bud_stem", bodySurfacePose,
    [[0.65, 0.88], [0.72, 1.05], [0.77, 1.22]], 0.008, darkGreenMat
  );
  body_decoration.add(
    main_flower_stem,
    upper_flower_stem,
    right_flower_stem,
    left_flower_stem,
    lower_branch_stem,
    tall_bud_stem
  );

  const lid_decoration = new THREE.Group();
  lid_decoration.name = "lid_decoration";
  root.add(lid_decoration);

  const lid_pink_bud = addFlower(
    "lid_pink_bud", lidSurfacePose, -0.31, 1.82, 0.075, 3,
    lightPinkMat, yellowMat, Math.PI / 2
  );
  const lid_red_flower = addFlower(
    "lid_red_flower", lidSurfacePose, 0.43, 1.79, 0.095, 5,
    magentaMat, yellowMat, Math.PI / 2
  );
  lid_decoration.add(lid_pink_bud, lid_red_flower);

  const lid_left_leaf = addLeaf(
    "lid_left_leaf", lidSurfacePose, -0.49, 1.72, 0.22, 0.09, -0.40, darkGreenMat
  );
  const lid_lower_leaf = addLeaf(
    "lid_lower_leaf", lidSurfacePose, -0.40, 1.66, 0.20, 0.09, -1.00, lightGreenMat
  );
  const lid_right_leaf = addLeaf(
    "lid_right_leaf", lidSurfacePose, -0.17, 1.70, 0.21, 0.09, 0.35, lightGreenMat
  );
  const lid_flower_leaf = addLeaf(
    "lid_flower_leaf", lidSurfacePose, 0.34, 1.70, 0.18, 0.08, -0.65, darkGreenMat
  );
  lid_decoration.add(
    lid_left_leaf,
    lid_lower_leaf,
    lid_right_leaf,
    lid_flower_leaf
  );

  const lid_left_stem = addSurfaceStem(
    "lid_left_stem", lidSurfacePose,
    [[-0.52, 1.64], [-0.40, 1.71], [-0.31, 1.82]], 0.006, darkGreenMat
  );
  const lid_right_stem = addSurfaceStem(
    "lid_right_stem", lidSurfacePose,
    [[0.30, 1.68], [0.37, 1.74], [0.43, 1.79]], 0.006, darkGreenMat
  );
  lid_decoration.add(lid_left_stem, lid_right_stem);

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