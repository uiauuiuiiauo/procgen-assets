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
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const gold_trimMat = new THREE.MeshStandardMaterial({
    color: 0xb08d57,
    metalness: 0.45,
    roughness: 0.35,
  });

  function glazeMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });
  }

  const pinkMat = glazeMaterial(0xd83d73);
  const pale_pinkMat = glazeMaterial(0xf28bad);
  const dark_pinkMat = glazeMaterial(0x9e1d50);
  const yellowMat = glazeMaterial(0xf2c63d);
  const orangeMat = glazeMaterial(0xd97924);
  const purpleMat = glazeMaterial(0x7157b7);
  const lavenderMat = glazeMaterial(0x947bd1);
  const blueMat = glazeMaterial(0x4e80c9);
  const dark_blueMat = glazeMaterial(0x28579c);
  const greenMat = glazeMaterial(0x39783b);
  const light_greenMat = glazeMaterial(0x6da354);
  const dark_greenMat = glazeMaterial(0x24582f);
  const stem_greenMat = glazeMaterial(0x526b32);
  const flower_centerMat = glazeMaterial(0xd5a51d);

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.64),
    new THREE.Vector2(0.44, -0.64),
    new THREE.Vector2(0.56, -0.60),
    new THREE.Vector2(0.67, -0.52),
    new THREE.Vector2(0.76, -0.38),
    new THREE.Vector2(0.82, -0.17),
    new THREE.Vector2(0.83, 0.06),
    new THREE.Vector2(0.79, 0.27),
    new THREE.Vector2(0.70, 0.44),
    new THREE.Vector2(0.59, 0.54),
    new THREE.Vector2(0.50, 0.57),
    new THREE.Vector2(0.00, 0.57),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, ceramicMat);
  body.name = "body";
  root.add(body);

  const footProfile = [
    new THREE.Vector2(0.00, -0.79),
    new THREE.Vector2(0.48, -0.79),
    new THREE.Vector2(0.55, -0.76),
    new THREE.Vector2(0.58, -0.70),
    new THREE.Vector2(0.56, -0.64),
    new THREE.Vector2(0.49, -0.60),
    new THREE.Vector2(0.00, -0.60),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 48);
  const foot = new THREE.Mesh(footGeom, ceramicMat);
  foot.name = "foot";
  root.add(foot);

  const foot_trimGeom = new THREE.TorusGeometry(0.535, 0.008, 8, 64);
  const foot_trim = new THREE.Mesh(foot_trimGeom, gold_trimMat);
  foot_trim.name = "foot_trim";
  foot_trim.rotation.x = Math.PI / 2;
  foot_trim.position.y = -0.785;
  root.add(foot_trim);

  const lidProfile = [
    new THREE.Vector2(0.00, 0.565),
    new THREE.Vector2(0.48, 0.565),
    new THREE.Vector2(0.52, 0.595),
    new THREE.Vector2(0.49, 0.650),
    new THREE.Vector2(0.43, 0.720),
    new THREE.Vector2(0.34, 0.800),
    new THREE.Vector2(0.22, 0.870),
    new THREE.Vector2(0.09, 0.915),
    new THREE.Vector2(0.00, 0.925),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, ceramicMat);
  lid.name = "lid";
  root.add(lid);

  const lid_shadowGeom = new THREE.TorusGeometry(0.505, 0.012, 8, 64);
  const lid_shadow = new THREE.Mesh(lid_shadowGeom, dark_greenMat);
  lid_shadow.name = "lid_shadow";
  lid_shadow.rotation.x = Math.PI / 2;
  lid_shadow.position.y = 0.567;
  root.add(lid_shadow);

  const lid_rimGeom = new THREE.TorusGeometry(0.505, 0.028, 12, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, chromeMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 0.592;
  root.add(lid_rim);

  const knob_baseGeom = new THREE.CylinderGeometry(0.105, 0.125, 0.055, 32);
  const knob_base = new THREE.Mesh(knob_baseGeom, chromeMat);
  knob_base.name = "knob_base";
  knob_base.position.y = 0.942;
  root.add(knob_base);

  const knob_stemGeom = new THREE.CylinderGeometry(0.065, 0.075, 0.075, 24);
  const knob_stem = new THREE.Mesh(knob_stemGeom, silverMat);
  knob_stem.name = "knob_stem";
  knob_stem.position.y = 0.995;
  root.add(knob_stem);

  const knobGeom = new THREE.SphereGeometry(0.13, 32, 20);
  const knob = new THREE.Mesh(knobGeom, chromeMat);
  knob.name = "knob";
  knob.scale.set(1.0, 0.95, 1.0);
  knob.position.y = 1.105;
  root.add(knob);

  function createTaperedTubeGeometry(curve, tubularSegments, radialSegments, radiusAt) {
    const positions = [];
    const indices = [];
    const reference = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const center = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const normal = new THREE.Vector3().crossVectors(reference, tangent);

      if (normal.lengthSq() < 0.000001) {
        normal.set(1, 0, 0);
      } else {
        normal.normalize();
      }

      const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();
      const radius = radiusAt(t);

      for (let j = 0; j < radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const radial = normal.clone().multiplyScalar(Math.cos(angle) * radius);
        radial.addScaledVector(binormal, Math.sin(angle) * radius);
        positions.push(
          center.x + radial.x,
          center.y + radial.y,
          center.z + radial.z
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const next = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + next;
        const d = i * radialSegments + next;
        indices.push(a, d, b, b, d, c);
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

  const spoutPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.62, -0.14, 0.02),
    new THREE.Vector3(-0.82, -0.27, 0.03),
    new THREE.Vector3(-1.00, -0.18, 0.05),
    new THREE.Vector3(-1.10, 0.08, 0.08),
    new THREE.Vector3(-1.18, 0.34, 0.12),
    new THREE.Vector3(-1.34, 0.49, 0.20),
    new THREE.Vector3(-1.55, 0.52, 0.32),
  ], false, "centripetal");

  const spoutGeom = createTaperedTubeGeometry(
    spoutPath,
    48,
    24,
    (t) => 0.245 - 0.145 * t + 0.012 * Math.sin(t * Math.PI)
  );
  const spout = new THREE.Mesh(spoutGeom, chromeMat);
  spout.name = "spout";
  root.add(spout);

  const spout_tip = spoutPath.getPoint(1);
  const spout_tangent = spoutPath.getTangent(1).normalize();
  const spout_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spout_tangent
  );

  const spout_openingGeom = new THREE.CircleGeometry(0.102, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, openingMat);
  spout_opening.name = "spout_opening";
  spout_opening.quaternion.copy(spout_quaternion);
  spout_opening.position.copy(spout_tip).addScaledVector(spout_tangent, 0.004);
  root.add(spout_opening);

  const spout_lipGeom = new THREE.TorusGeometry(0.108, 0.014, 10, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, chromeMat);
  spout_lip.name = "spout_lip";
  spout_lip.quaternion.copy(spout_quaternion);
  spout_lip.position.copy(spout_tip).addScaledVector(spout_tangent, 0.006);
  root.add(spout_lip);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.66, 0.34, -0.04),
    new THREE.Vector3(0.84, 0.53, -0.04),
    new THREE.Vector3(1.08, 0.70, -0.04),
    new THREE.Vector3(1.34, 0.72, -0.04),
    new THREE.Vector3(1.54, 0.56, -0.04),
    new THREE.Vector3(1.61, 0.27, -0.04),
    new THREE.Vector3(1.55, -0.06, -0.04),
    new THREE.Vector3(1.35, -0.31, -0.04),
    new THREE.Vector3(1.04, -0.46, -0.04),
    new THREE.Vector3(0.69, -0.30, -0.04),
  ], false, "centripetal");

  const handleGeom = new THREE.TubeGeometry(handlePath, 72, 0.078, 16, false);
  const handle = new THREE.Mesh(handleGeom, chromeMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.13, 24, 16);
  const handle_upper_mount = new THREE.Mesh(handle_mountGeom, chromeMat);
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.scale.set(1.15, 0.85, 1.0);
  handle_upper_mount.position.set(0.70, 0.34, -0.035);
  root.add(handle_upper_mount);

  const handle_lower_mount = new THREE.Mesh(handle_mountGeom, chromeMat);
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.scale.set(1.25, 0.95, 1.0);
  handle_lower_mount.position.set(0.70, -0.30, -0.035);
  root.add(handle_lower_mount);

  const body_radius_profile = [
    { y: -0.64, r: 0.44 },
    { y: -0.52, r: 0.67 },
    { y: -0.38, r: 0.76 },
    { y: -0.17, r: 0.82 },
    { y: 0.06, r: 0.83 },
    { y: 0.27, r: 0.79 },
    { y: 0.44, r: 0.70 },
    { y: 0.54, r: 0.59 },
    { y: 0.57, r: 0.50 },
  ];
  const lid_radius_profile = [
    { y: 0.565, r: 0.48 },
    { y: 0.595, r: 0.52 },
    { y: 0.650, r: 0.49 },
    { y: 0.720, r: 0.43 },
    { y: 0.800, r: 0.34 },
    { y: 0.870, r: 0.22 },
    { y: 0.915, r: 0.09 },
    { y: 0.925, r: 0.00 },
  ];

  function radiusFromProfile(profile, y) {
    if (y <= profile[0].y) return profile[0].r;
    for (let i = 0; i < profile.length - 1; i++) {
      const a = profile[i];
      const b = profile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return profile[profile.length - 1].r;
  }

  function bodyRadiusAt(y) {
    return radiusFromProfile(body_radius_profile, y);
  }

  function lidRadiusAt(y) {
    return radiusFromProfile(lid_radius_profile, y);
  }

  function surfacePose(radiusFunction, x, y, extra) {
    const radius = radiusFunction(y);
    const safeX = Math.max(-radius * 0.96, Math.min(radius * 0.96, x));
    const z = Math.sqrt(Math.max(radius * radius - safeX * safeX, 0.0001));
    const epsilon = 0.004;
    const derivative =
      (radiusFunction(y + epsilon) - radiusFunction(y - epsilon)) /
      (epsilon * 2);
    const normal = new THREE.Vector3(
      safeX,
      -radius * derivative,
      z
    ).normalize();
    const position = new THREE.Vector3(safeX, y, z);
    position.addScaledVector(normal, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function bodySurfacePose(x, y, extra = 0.009) {
    return surfacePose(bodyRadiusAt, x, y, extra);
  }

  function lidSurfacePose(x, y, extra = 0.009) {
    return surfacePose(lidRadiusAt, x, y, extra);
  }

  const body_decoration = new THREE.Group();
  body_decoration.name = "body_decoration";
  root.add(body_decoration);

  const body_stems = new THREE.Group();
  body_stems.name = "body_stems";
  body_decoration.add(body_stems);

  function addBodyStem(points, radius = 0.008) {
    const pathPoints = [];
    for (const point of points) {
      pathPoints.push(bodySurfacePose(point.x, point.y, 0.012).position);
    }
    const curve = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      24,
      radius,
      6,
      false
    );
    const stem = new THREE.Mesh(geometry, stem_greenMat);
    body_stems.add(stem);
    return stem;
  }

  const main_stem = addBodyStem([
    new THREE.Vector2(0.02, -0.50),
    new THREE.Vector2(0.03, -0.31),
    new THREE.Vector2(0.02, -0.13),
  ], 0.009);
  main_stem.name = "main_stem";

  const upper_left_stem = addBodyStem([
    new THREE.Vector2(0.00, -0.18),
    new THREE.Vector2(-0.09, -0.01),
    new THREE.Vector2(-0.15, 0.18),
  ], 0.008);
  upper_left_stem.name = "upper_left_stem";

  const upper_right_stem = addBodyStem([
    new THREE.Vector2(0.04, -0.20),
    new THREE.Vector2(0.18, -0.04),
    new THREE.Vector2(0.34, 0.15),
  ], 0.008);
  upper_right_stem.name = "upper_right_stem";

  const right_stem = addBodyStem([
    new THREE.Vector2(0.10, -0.31),
    new THREE.Vector2(0.39, -0.20),
    new THREE.Vector2(0.62, -0.04),
  ], 0.008);
  right_stem.name = "right_stem";

  const lower_right_stem = addBodyStem([
    new THREE.Vector2(0.12, -0.43),
    new THREE.Vector2(0.37, -0.37),
    new THREE.Vector2(0.55, -0.29),
  ], 0.008);
  lower_right_stem.name = "lower_right_stem";

  const left_stem = addBodyStem([
    new THREE.Vector2(-0.02, -0.34),
    new THREE.Vector2(-0.27, -0.29),
    new THREE.Vector2(-0.50, -0.18),
  ], 0.008);
  left_stem.name = "left_stem";

  const far_left_stem = addBodyStem([
    new THREE.Vector2(-0.25, -0.30),
    new THREE.Vector2(-0.48, -0.23),
    new THREE.Vector2(-0.64, -0.12),
  ], 0.007);
  far_left_stem.name = "far_left_stem";

  const lower_left_stem = addBodyStem([
    new THREE.Vector2(-0.03, -0.40),
    new THREE.Vector2(-0.22, -0.42),
    new THREE.Vector2(-0.39, -0.40),
  ], 0.007);
  lower_left_stem.name = "lower_left_stem";

  const petalGeom = new THREE.CircleGeometry(1, 24);

  function makeBodyFlower(
    name,
    x,
    y,
    size,
    count,
    petalMaterial,
    edgeMaterial,
    centerMaterial,
    stamenMaterial,
    rotationOffset
  ) {
    const flower = new THREE.Group();
    flower.name = name;

    const petals = new THREE.InstancedMesh(petalGeom, petalMaterial, count);
    petals.name = name + "_petals";
    const petal_dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = rotationOffset + i / count * Math.PI * 2;
      const px = x + Math.cos(angle) * size * 0.45;
      const py = y + Math.sin(angle) * size * 0.45;
      const pose = bodySurfacePose(px, py, 0.014);

      petal_dummy.position.copy(pose.position);
      petal_dummy.quaternion.copy(pose.quaternion);
      petal_dummy.rotateZ(angle - Math.PI / 2);
      petal_dummy.scale.set(size * 0.34, size * 0.62, 1);
      petal_dummy.updateMatrix();
      petals.setMatrixAt(i, petal_dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    if (edgeMaterial) {
      const petal_edges = new THREE.InstancedMesh(
        petalGeom,
        edgeMaterial,
        count
      );
      petal_edges.name = name + "_petal_edges";
      const edge_dummy = new THREE.Object3D();

      for (let i = 0; i < count; i++) {
        const angle = rotationOffset + i / count * Math.PI * 2;
        const px = x + Math.cos(angle) * size * 0.43;
        const py = y + Math.sin(angle) * size * 0.43;
        const pose = bodySurfacePose(px, py, 0.018);

        edge_dummy.position.copy(pose.position);
        edge_dummy.quaternion.copy(pose.quaternion);
        edge_dummy.rotateZ(angle - Math.PI / 2);
        edge_dummy.scale.set(size * 0.10, size * 0.48, 1);
        edge_dummy.updateMatrix();
        petal_edges.setMatrixAt(i, edge_dummy.matrix);
      }
      petal_edges.instanceMatrix.needsUpdate = true;
      flower.add(petal_edges);
    }

    const centerPose = bodySurfacePose(x, y, 0.022);
    const flower_center = new THREE.Mesh(petalGeom, centerMaterial);
    flower_center.name = name + "_center";
    flower_center.position.copy(centerPose.position);
    flower_center.quaternion.copy(centerPose.quaternion);
    flower_center.scale.set(size * 0.25, size * 0.25, 1);
    flower.add(flower_center);

    const stamen_count = 8;
    const flower_stamens = new THREE.InstancedMesh(
      petalGeom,
      stamenMaterial,
      stamen_count
    );
    flower_stamens.name = name + "_stamens";
    const stamen_dummy = new THREE.Object3D();

    for (let i = 0; i < stamen_count; i++) {
      const angle = i / stamen_count * Math.PI * 2;
      const px = x + Math.cos(angle) * size * 0.15;
      const py = y + Math.sin(angle) * size * 0.15;
      const pose = bodySurfacePose(px, py, 0.025);

      stamen_dummy.position.copy(pose.position);
      stamen_dummy.quaternion.copy(pose.quaternion);
      stamen_dummy.scale.set(size * 0.035, size * 0.035, 1);
      stamen_dummy.updateMatrix();
      flower_stamens.setMatrixAt(i, stamen_dummy.matrix);
    }
    flower_stamens.instanceMatrix.needsUpdate = true;
    flower.add(flower_stamens);

    return flower;
  }

  const central_pink_flower = makeBodyFlower(
    "central_pink_flower",
    0.02,
    -0.13,
    0.19,
    5,
    pinkMat,
    dark_pinkMat,
    flower_centerMat,
    orangeMat,
    0.12
  );
  body_decoration.add(central_pink_flower);

  const upper_left_pink_flower = makeBodyFlower(
    "upper_left_pink_flower",
    -0.15,
    0.18,
    0.14,
    5,
    pale_pinkMat,
    dark_pinkMat,
    flower_centerMat,
    orangeMat,
    -0.18
  );
  body_decoration.add(upper_left_pink_flower);

  const upper_right_yellow_flower = makeBodyFlower(
    "upper_right_yellow_flower",
    0.34,
    0.15,
    0.145,
    6,
    yellowMat,
    orangeMat,
    flower_centerMat,
    dark_pinkMat,
    0.05
  );
  body_decoration.add(upper_right_yellow_flower);

  const right_pink_flower = makeBodyFlower(
    "right_pink_flower",
    0.62,
    -0.04,
    0.14,
    5,
    pinkMat,
    dark_pinkMat,
    flower_centerMat,
    orangeMat,
    0.18
  );
  body_decoration.add(right_pink_flower);

  const lower_right_yellow_flower = makeBodyFlower(
    "lower_right_yellow_flower",
    0.55,
    -0.29,
    0.105,
    6,
    yellowMat,
    orangeMat,
    flower_centerMat,
    dark_pinkMat,
    0.0
  );
  body_decoration.add(lower_right_yellow_flower);

  const lower_left_purple_flower = makeBodyFlower(
    "lower_left_purple_flower",
    -0.39,
    -0.40,
    0.115,
    5,
    purpleMat,
    lavenderMat,
    flower_centerMat,
    orangeMat,
    0.1
  );
  body_decoration.add(lower_left_purple_flower);

  const left_lavender_flower = makeBodyFlower(
    "left_lavender_flower",
    -0.25,
    -0.29,
    0.085,
    5,
    lavenderMat,
    purpleMat,
    flower_centerMat,
    orangeMat,
    -0.1
  );
  body_decoration.add(left_lavender_flower);

  const left_blue_flower = makeBodyFlower(
    "left_blue_flower",
    -0.64,
    -0.12,
    0.09,
    3,
    blueMat,
    dark_blueMat,
    flower_centerMat,
    orangeMat,
    0.35
  );
  body_decoration.add(left_blue_flower);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -1);
  leafShape.bezierCurveTo(0.62, -0.48, 0.62, 0.48, 0, 1);
  leafShape.bezierCurveTo(-0.62, 0.48, -0.62, -0.48, 0, -1);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 12);

  function makeLeafInstances(name, entries, material, surfacePoseFunction) {
    const leaves = new THREE.InstancedMesh(leafGeom, material, entries.length);
    leaves.name = name;
    const leaf_dummy = new THREE.Object3D();

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const pose = surfacePoseFunction(entry.x, entry.y, 0.014);
      leaf_dummy.position.copy(pose.position);
      leaf_dummy.quaternion.copy(pose.quaternion);
      leaf_dummy.rotateZ(entry.angle);
      leaf_dummy.scale.set(entry.sx, entry.sy, 1);
      leaf_dummy.updateMatrix();
      leaves.setMatrixAt(i, leaf_dummy.matrix);
    }

    leaves.instanceMatrix.needsUpdate = true;
    return leaves;
  }

  const dark_green_leaves = makeLeafInstances(
    "dark_green_leaves",
    [
      { x: -0.08, y: 0.06, angle: -0.65, sx: 0.075, sy: 0.135 },
      { x: 0.18, y: 0.00, angle: 0.75, sx: 0.080, sy: 0.145 },
      { x: 0.28, y: -0.28, angle: -0.55, sx: 0.080, sy: 0.150 },
      { x: 0.45, y: -0.18, angle: 0.75, sx: 0.075, sy: 0.140 },
      { x: 0.49, y: 0.02, angle: -0.72, sx: 0.070, sy: 0.130 },
      { x: -0.23, y: -0.22, angle: 0.72, sx: 0.070, sy: 0.125 },
      { x: -0.51, y: -0.26, angle: -0.72, sx: 0.065, sy: 0.120 },
      { x: -0.18, y: -0.50, angle: 0.35, sx: 0.075, sy: 0.140 },
      { x: 0.15, y: -0.46, angle: -0.20, sx: 0.080, sy: 0.150 },
      { x: 0.65, y: -0.19, angle: 0.65, sx: 0.065, sy: 0.120 },
    ],
    dark_greenMat,
    bodySurfacePose
  );
  body_decoration.add(dark_green_leaves);

  const light_green_leaves = makeLeafInstances(
    "light_green_leaves",
    [
      { x: -0.25, y: 0.07, angle: 0.75, sx: 0.065, sy: 0.120 },
      { x: -0.03, y: 0.31, angle: -0.45, sx: 0.060, sy: 0.115 },
      { x: 0.18, y: 0.30, angle: 0.55, sx: 0.070, sy: 0.130 },
      { x: 0.47, y: 0.27, angle: -0.55, sx: 0.065, sy: 0.120 },
      { x: -0.56, y: -0.39, angle: 0.75, sx: 0.065, sy: 0.115 },
      { x: -0.31, y: -0.52, angle: -0.55, sx: 0.065, sy: 0.120 },
      { x: 0.36, y: -0.47, angle: 0.55, sx: 0.070, sy: 0.130 },
      { x: 0.66, y: 0.10, angle: -0.55, sx: 0.060, sy: 0.110 },
    ],
    light_greenMat,
    bodySurfacePose
  );
  body_decoration.add(light_green_leaves);

  const lid_decoration = new THREE.Group();
  lid_decoration.name = "lid_decoration";
  root.add(lid_decoration);

  const lid_stems = new THREE.Group();
  lid_stems.name = "lid_stems";
  lid_decoration.add(lid_stems);

  function addLidStem(points) {
    const pathPoints = [];
    for (const point of points) {
      pathPoints.push(lidSurfacePose(point.x, point.y, 0.012).position);
    }
    const curve = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(curve, 20, 0.006, 6, false);
    const stem = new THREE.Mesh(geometry, stem_greenMat);
    lid_stems.add(stem);
    return stem;
  }

  const lid_left_stem = addLidStem([
    new THREE.Vector2(-0.29, 0.655),
    new THREE.Vector2(-0.20, 0.705),
    new THREE.Vector2(-0.12, 0.775),
  ]);
  lid_left_stem.name = "lid_left_stem";

  const lid_right_stem = addLidStem([
    new THREE.Vector2(0.18, 0.655),
    new THREE.Vector2(0.23, 0.700),
    new THREE.Vector2(0.27, 0.735),
  ]);
  lid_right_stem.name = "lid_right_stem";

  function makeLidFlower(
    name,
    x,
    y,
    size,
    count,
    petalMaterial,
    edgeMaterial,
    centerMaterial,
    rotationOffset
  ) {
    const flower = new THREE.Group();
    flower.name = name;

    const petals = new THREE.InstancedMesh(petalGeom, petalMaterial, count);
    petals.name = name + "_petals";
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = rotationOffset + i / count * Math.PI * 2;
      const px = x + Math.cos(angle) * size * 0.44;
      const py = y + Math.sin(angle) * size * 0.44;
      const pose = lidSurfacePose(px, py, 0.014);

      dummy.position.copy(pose.position);
      dummy.quaternion.copy(pose.quaternion);
      dummy.rotateZ(angle - Math.PI / 2);
      dummy.scale.set(size * 0.34, size * 0.62, 1);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    if (edgeMaterial) {
      const edges = new THREE.InstancedMesh(petalGeom, edgeMaterial, count);
      edges.name = name + "_edges";
      const edge_dummy = new THREE.Object3D();

      for (let i = 0; i < count; i++) {
        const angle = rotationOffset + i / count * Math.PI * 2;
        const px = x + Math.cos(angle) * size * 0.42;
        const py = y + Math.sin(angle) * size * 0.42;
        const pose = lidSurfacePose(px, py, 0.018);

        edge_dummy.position.copy(pose.position);
        edge_dummy.quaternion.copy(pose.quaternion);
        edge_dummy.rotateZ(angle - Math.PI / 2);
        edge_dummy.scale.set(size * 0.09, size * 0.46, 1);
        edge_dummy.updateMatrix();
        edges.setMatrixAt(i, edge_dummy.matrix);
      }
      edges.instanceMatrix.needsUpdate = true;
      flower.add(edges);
    }

    const centerPose = lidSurfacePose(x, y, 0.021);
    const center = new THREE.Mesh(petalGeom, centerMaterial);
    center.name = name + "_center";
    center.position.copy(centerPose.position);
    center.quaternion.copy(centerPose.quaternion);
    center.scale.set(size * 0.23, size * 0.23, 1);
    flower.add(center);

    return flower;
  }

  const lid_pink_flower = makeLidFlower(
    "lid_pink_flower",
    -0.14,
    0.765,
    0.060,
    5,
    pale_pinkMat,
    dark_pinkMat,
    flower_centerMat,
    0.1
  );
  lid_decoration.add(lid_pink_flower);

  const lid_orange_flower = makeLidFlower(
    "lid_orange_flower",
    0.25,
    0.705,
    0.055,
    5,
    orangeMat,
    dark_pinkMat,
    flower_centerMat,
    -0.1
  );
  lid_decoration.add(lid_orange_flower);

  const lid_green_leaves = makeLeafInstances(
    "lid_green_leaves",
    [
      { x: -0.25, y: 0.685, angle: -0.75, sx: 0.040, sy: 0.080 },
      { x: -0.19, y: 0.720, angle: 0.65, sx: 0.038, sy: 0.075 },
      { x: -0.06, y: 0.700, angle: -0.55, sx: 0.040, sy: 0.080 },
      { x: 0.18, y: 0.675, angle: 0.70, sx: 0.035, sy: 0.070 },
      { x: 0.31, y: 0.720, angle: -0.65, sx: 0.035, sy: 0.070 },
    ],
    greenMat,
    lidSurfacePose
  );
  lid_decoration.add(lid_green_leaves);

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