export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "teapot";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf3f2eb,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xf3f2eb,
    emissiveIntensity: 0.18,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0xbfc2bd,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const blueGlazeMat = new THREE.MeshStandardMaterial({
    color: 0x315b98,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lightBlueGlazeMat = new THREE.MeshStandardMaterial({
    color: 0x6c8bb5,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const pinkGlazeMat = new THREE.MeshStandardMaterial({
    color: 0xd8a0b2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const darkPinkGlazeMat = new THREE.MeshStandardMaterial({
    color: 0xa8657d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const greenGlazeMat = new THREE.MeshStandardMaterial({
    color: 0x3f7163,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const lightGreenGlazeMat = new THREE.MeshStandardMaterial({
    color: 0x6f9482,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const goldTrimMat = new THREE.MeshStandardMaterial({
    color: 0xd4a84f,
    metalness: 0.6,
    roughness: 0.2,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, -0.39),
    new THREE.Vector2(0.27, -0.39),
    new THREE.Vector2(0.34, -0.37),
    new THREE.Vector2(0.42, -0.32),
    new THREE.Vector2(0.49, -0.23),
    new THREE.Vector2(0.535, -0.10),
    new THREE.Vector2(0.55, 0.04),
    new THREE.Vector2(0.54, 0.17),
    new THREE.Vector2(0.50, 0.29),
    new THREE.Vector2(0.46, 0.36),
    new THREE.Vector2(0.42, 0.39),
    new THREE.Vector2(0.00, 0.39),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const footProfile = [
    new THREE.Vector2(0.00, -0.535),
    new THREE.Vector2(0.27, -0.535),
    new THREE.Vector2(0.31, -0.525),
    new THREE.Vector2(0.34, -0.495),
    new THREE.Vector2(0.35, -0.455),
    new THREE.Vector2(0.33, -0.415),
    new THREE.Vector2(0.29, -0.385),
    new THREE.Vector2(0.00, -0.385),
  ];
  const footGeom = new THREE.LatheGeometry(footProfile, 48);
  const foot = new THREE.Mesh(footGeom, bodyMat);
  foot.name = "foot";
  root.add(foot);

  const foot_ringGeom = new THREE.TorusGeometry(0.30, 0.014, 10, 48);
  const foot_ring = new THREE.Mesh(foot_ringGeom, bodyMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.515;
  root.add(foot_ring);

  const lidProfile = [
    new THREE.Vector2(0.00, 0.395),
    new THREE.Vector2(0.43, 0.395),
    new THREE.Vector2(0.475, 0.415),
    new THREE.Vector2(0.49, 0.445),
    new THREE.Vector2(0.475, 0.475),
    new THREE.Vector2(0.435, 0.515),
    new THREE.Vector2(0.365, 0.565),
    new THREE.Vector2(0.275, 0.605),
    new THREE.Vector2(0.165, 0.635),
    new THREE.Vector2(0.065, 0.650),
    new THREE.Vector2(0.00, 0.652),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, bodyMat);
  lid.name = "lid";
  root.add(lid);

  const lid_rimGeom = new THREE.TorusGeometry(0.458, 0.025, 12, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, bodyMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 0.407;
  root.add(lid_rim);

  const lid_knob_stemGeom = new THREE.CylinderGeometry(0.055, 0.075, 0.075, 24);
  const lid_knob_stem = new THREE.Mesh(lid_knob_stemGeom, bodyMat);
  lid_knob_stem.name = "lid_knob_stem";
  lid_knob_stem.position.y = 0.674;
  root.add(lid_knob_stem);

  const lid_knobGeom = new THREE.SphereGeometry(0.09, 32, 20);
  const lid_knob = new THREE.Mesh(lid_knobGeom, bodyMat);
  lid_knob.name = "lid_knob";
  lid_knob.position.y = 0.755;
  lid_knob.scale.set(1.0, 1.04, 1.0);
  root.add(lid_knob);

  const upper_blue_bandGeom = new THREE.TorusGeometry(0.482, 0.006, 8, 64);
  const upper_blue_band = new THREE.Mesh(upper_blue_bandGeom, blueGlazeMat);
  upper_blue_band.name = "upper_blue_band";
  upper_blue_band.rotation.x = Math.PI / 2;
  upper_blue_band.position.y = 0.342;
  root.add(upper_blue_band);

  const lower_blue_bandGeom = new THREE.TorusGeometry(0.500, 0.006, 8, 64);
  const lower_blue_band = new THREE.Mesh(lower_blue_bandGeom, blueGlazeMat);
  lower_blue_band.name = "lower_blue_band";
  lower_blue_band.rotation.x = Math.PI / 2;
  lower_blue_band.position.y = 0.307;
  root.add(lower_blue_band);

  const gold_trimGeom = new THREE.TorusGeometry(0.478, 0.009, 10, 64);
  const gold_trim = new THREE.Mesh(gold_trimGeom, goldTrimMat);
  gold_trim.name = "gold_trim";
  gold_trim.rotation.x = Math.PI / 2;
  gold_trim.position.y = 0.402;
  root.add(gold_trim);

  function createTaperedTubeGeometry(curve, tubularSegments, radialSegments, startRadius, endRadius) {
    const positions = [];
    const normals = [];
    const indices = [];
    const frames = curve.computeFrenetFrames(tubularSegments, false);

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const point = curve.getPointAt(t);
      const radius = startRadius + (endRadius - startRadius) * t;
      const normalFrame = frames.normals[i];
      const binormalFrame = frames.binormals[i];

      for (let j = 0; j <= radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const radial = normalFrame.clone()
          .multiplyScalar(Math.cos(angle))
          .add(binormalFrame.clone().multiplyScalar(Math.sin(angle)))
          .normalize();

        positions.push(
          point.x + radial.x * radius,
          point.y + radial.y * radius,
          point.z + radial.z * radius
        );
        normals.push(radial.x, radial.y, radial.z);
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * (radialSegments + 1) + j;
        const b = (i + 1) * (radialSegments + 1) + j;
        const c = (i + 1) * (radialSegments + 1) + j + 1;
        const d = i * (radialSegments + 1) + j + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();
    return geometry;
  }

  const spoutPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.40, 0.10, 0.00),
    new THREE.Vector3(-0.50, 0.13, 0.00),
    new THREE.Vector3(-0.60, 0.20, 0.01),
    new THREE.Vector3(-0.69, 0.31, 0.025),
    new THREE.Vector3(-0.77, 0.41, 0.045),
    new THREE.Vector3(-0.84, 0.47, 0.065),
    new THREE.Vector3(-0.90, 0.49, 0.085),
  ], false, "centripetal");

  const spoutGeom = createTaperedTubeGeometry(spoutPath, 40, 24, 0.205, 0.085);
  const spout = new THREE.Mesh(spoutGeom, bodyMat);
  spout.name = "spout";
  root.add(spout);

  const spout_baseGeom = new THREE.SphereGeometry(1, 28, 18);
  const spout_base = new THREE.Mesh(spout_baseGeom, bodyMat);
  spout_base.name = "spout_base";
  spout_base.position.set(-0.43, 0.105, 0.0);
  spout_base.scale.set(0.22, 0.20, 0.19);
  root.add(spout_base);

  const spoutTip = spoutPath.getPointAt(1);
  const spoutTangent = spoutPath.getTangentAt(1).normalize();
  const spoutTipQuat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutTangent
  );

  const spout_lipGeom = new THREE.TorusGeometry(0.078, 0.014, 10, 32);
  const spout_lip = new THREE.Mesh(spout_lipGeom, bodyMat);
  spout_lip.name = "spout_lip";
  spout_lip.position.copy(spoutTip);
  spout_lip.quaternion.copy(spoutTipQuat);
  root.add(spout_lip);

  const spout_openingGeom = new THREE.CircleGeometry(0.067, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, interiorMat);
  spout_opening.name = "spout_opening";
  spout_opening.position.copy(spoutTip).addScaledVector(spoutTangent, 0.006);
  spout_opening.quaternion.copy(spoutTipQuat);
  root.add(spout_opening);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.43, 0.255, -0.025),
    new THREE.Vector3(0.56, 0.315, -0.035),
    new THREE.Vector3(0.66, 0.475, -0.045),
    new THREE.Vector3(0.82, 0.555, -0.050),
    new THREE.Vector3(0.96, 0.485, -0.050),
    new THREE.Vector3(1.015, 0.305, -0.045),
    new THREE.Vector3(0.985, 0.095, -0.040),
    new THREE.Vector3(0.875, -0.105, -0.035),
    new THREE.Vector3(0.690, -0.255, -0.030),
    new THREE.Vector3(0.470, -0.285, -0.025),
  ], false, "centripetal");

  const handleGeom = new THREE.TubeGeometry(handlePath, 64, 0.066, 16, false);
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  handle.name = "handle";
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(1, 24, 16);

  const handle_upper_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.position.set(0.47, 0.255, -0.02);
  handle_upper_mount.scale.set(0.14, 0.115, 0.12);
  root.add(handle_upper_mount);

  const handle_lower_mount = new THREE.Mesh(handle_mountGeom, bodyMat);
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.position.set(0.48, -0.27, -0.02);
  handle_lower_mount.scale.set(0.14, 0.115, 0.12);
  root.add(handle_lower_mount);

  const bodyRadiusProfile = [
    { y: -0.39, r: 0.27 },
    { y: -0.32, r: 0.42 },
    { y: -0.23, r: 0.49 },
    { y: -0.10, r: 0.535 },
    { y: 0.04, r: 0.55 },
    { y: 0.17, r: 0.54 },
    { y: 0.29, r: 0.50 },
    { y: 0.36, r: 0.46 },
    { y: 0.39, r: 0.42 },
  ];
  const lidRadiusProfile = [
    { y: 0.415, r: 0.475 },
    { y: 0.445, r: 0.49 },
    { y: 0.475, r: 0.475 },
    { y: 0.515, r: 0.435 },
    { y: 0.565, r: 0.365 },
    { y: 0.605, r: 0.275 },
    { y: 0.635, r: 0.165 },
    { y: 0.650, r: 0.065 },
  ];

  function radiusAt(profile, y) {
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

  function surfacePose(angle, y, extra, profile) {
    const r = radiusAt(profile, y);
    const delta = 0.004;
    const dr = (radiusAt(profile, y + delta) - radiusAt(profile, y - delta)) / (delta * 2);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -dr,
      Math.sin(angle)
    ).normalize();
    const pos = new THREE.Vector3(
      Math.cos(angle) * r,
      y,
      Math.sin(angle) * r
    ).addScaledVector(normal, extra);
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { pos, quat, normal };
  }

  function bodySurfacePose(angle, y, extra) {
    return surfacePose(angle, y, extra, bodyRadiusProfile);
  }

  function lidSurfacePose(angle, y, extra) {
    return surfacePose(angle, y, extra, lidRadiusProfile);
  }

  const localZAxis = new THREE.Vector3(0, 0, 1);

  function makeSurfaceInstances(geometry, material, placements, poseFunction) {
    const instances = new THREE.InstancedMesh(geometry, material, placements.length);
    const matrix = new THREE.Matrix4();

    for (let i = 0; i < placements.length; i++) {
      const p = placements[i];
      const pose = poseFunction(p.angle, p.y, p.extra === undefined ? 0.008 : p.extra);
      const localRotation = new THREE.Quaternion().setFromAxisAngle(
        localZAxis,
        p.rot || 0
      );
      const quaternion = pose.quat.clone().multiply(localRotation);
      matrix.compose(
        pose.pos,
        quaternion,
        new THREE.Vector3(p.sx, p.sy, 1)
      );
      instances.setMatrixAt(i, matrix);
    }
    instances.instanceMatrix.needsUpdate = true;
    return instances;
  }

  function makeSurfaceDecal(geometry, material, angle, y, sx, sy, rot, extra) {
    const pose = bodySurfacePose(angle, y, extra);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(pose.pos);
    mesh.quaternion.copy(pose.quat);
    mesh.rotateZ(rot);
    mesh.scale.set(sx, sy, 1);
    return mesh;
  }

  function createBodyVine(controlPoints) {
    const points = [];
    for (let i = 0; i < controlPoints.length; i++) {
      points.push(bodySurfacePose(controlPoints[i].x, controlPoints[i].y, 0.009).pos);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 28, 0.0045, 6, false),
      blueGlazeMat
    );
  }

  function createLidVine(controlPoints) {
    const points = [];
    for (let i = 0; i < controlPoints.length; i++) {
      points.push(lidSurfacePose(controlPoints[i].x, controlPoints[i].y, 0.009).pos);
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 32, 0.004, 6, false),
      blueGlazeMat
    );
  }

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  root.add(floral_decoration);

  const main_branch = createBodyVine([
    { x: 2.28, y: -0.055 },
    { x: 2.02, y: -0.080 },
    { x: 1.76, y: -0.075 },
    { x: 1.55, y: -0.045 },
    { x: 1.30, y: -0.065 },
    { x: 1.05, y: -0.095 },
    { x: 0.82, y: -0.105 },
  ]);
  main_branch.name = "main_branch";
  floral_decoration.add(main_branch);

  const upper_branch = createBodyVine([
    { x: 1.78, y: -0.065 },
    { x: 1.82, y: 0.015 },
    { x: 1.74, y: 0.095 },
    { x: 1.65, y: 0.175 },
    { x: 1.54, y: 0.245 },
  ]);
  upper_branch.name = "upper_branch";
  floral_decoration.add(upper_branch);

  const lower_branch = createBodyVine([
    { x: 1.56, y: -0.045 },
    { x: 1.47, y: -0.120 },
    { x: 1.35, y: -0.205 },
    { x: 1.20, y: -0.275 },
  ]);
  lower_branch.name = "lower_branch";
  floral_decoration.add(lower_branch);

  const petalGeom = new THREE.CircleGeometry(1, 20);

  const lightPinkPetalPlacements = [];
  const darkPinkPetalPlacements = [];
  const flowerCenterX = 1.70;
  const flowerCenterY = -0.015;

  for (let i = 0; i < 7; i++) {
    const a = i / 7 * Math.PI * 2;
    lightPinkPetalPlacements.push({
      angle: flowerCenterX - Math.cos(a) * 0.105,
      y: flowerCenterY + Math.sin(a) * 0.080,
      sx: 0.060,
      sy: 0.095,
      rot: a - Math.PI / 2,
      extra: 0.010,
    });
  }
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2 + 0.35;
    darkPinkPetalPlacements.push({
      angle: flowerCenterX - Math.cos(a) * 0.052,
      y: flowerCenterY + Math.sin(a) * 0.042,
      sx: 0.040,
      sy: 0.060,
      rot: a - Math.PI / 2,
      extra: 0.012,
    });
  }

  const light_pink_petals = makeSurfaceInstances(
    petalGeom,
    pinkGlazeMat,
    lightPinkPetalPlacements,
    bodySurfacePose
  );
  light_pink_petals.name = "light_pink_petals";
  floral_decoration.add(light_pink_petals);

  const dark_pink_petals = makeSurfaceInstances(
    petalGeom,
    darkPinkGlazeMat,
    darkPinkPetalPlacements,
    bodySurfacePose
  );
  dark_pink_petals.name = "dark_pink_petals";
  floral_decoration.add(dark_pink_petals);

  const flower_center = makeSurfaceDecal(
    petalGeom,
    darkPinkGlazeMat,
    flowerCenterX,
    flowerCenterY,
    0.034,
    0.030,
    0,
    0.014
  );
  flower_center.name = "flower_center";
  floral_decoration.add(flower_center);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(-1.0, 0);
  leafShape.bezierCurveTo(-0.45, 0.58, 0.45, 0.58, 1.0, 0);
  leafShape.bezierCurveTo(0.45, -0.58, -0.45, -0.58, -1.0, 0);
  const leafGeom = new THREE.ShapeGeometry(leafShape);

  const greenLeafPlacements = [
    { angle: 2.05, y: 0.075, sx: 0.070, sy: 0.060, rot: 0.62, extra: 0.010 },
    { angle: 1.88, y: 0.145, sx: 0.062, sy: 0.054, rot: 0.88, extra: 0.010 },
    { angle: 1.58, y: 0.135, sx: 0.070, sy: 0.060, rot: -0.72, extra: 0.010 },
    { angle: 1.39, y: -0.010, sx: 0.078, sy: 0.064, rot: -0.28, extra: 0.010 },
    { angle: 1.31, y: -0.145, sx: 0.072, sy: 0.060, rot: -0.72, extra: 0.010 },
    { angle: 1.18, y: -0.245, sx: 0.082, sy: 0.066, rot: 0.40, extra: 0.010 },
    { angle: 1.48, y: -0.270, sx: 0.086, sy: 0.068, rot: 2.38, extra: 0.010 },
    { angle: 1.04, y: -0.180, sx: 0.060, sy: 0.052, rot: 0.18, extra: 0.010 },
  ];

  const green_leaves = makeSurfaceInstances(
    leafGeom,
    greenGlazeMat,
    greenLeafPlacements,
    bodySurfacePose
  );
  green_leaves.name = "green_leaves";
  floral_decoration.add(green_leaves);

  const lightGreenLeafPlacements = [
    { angle: 1.98, y: -0.175, sx: 0.068, sy: 0.057, rot: -0.95, extra: 0.011 },
    { angle: 1.76, y: -0.235, sx: 0.076, sy: 0.062, rot: 2.55, extra: 0.011 },
    { angle: 1.27, y: -0.205, sx: 0.066, sy: 0.055, rot: 0.82, extra: 0.011 },
  ];

  const light_green_leaves = makeSurfaceInstances(
    leafGeom,
    lightGreenGlazeMat,
    lightGreenLeafPlacements,
    bodySurfacePose
  );
  light_green_leaves.name = "light_green_leaves";
  floral_decoration.add(light_green_leaves);

  const smallFlowerCenterX = 1.13;
  const smallFlowerCenterY = -0.195;
  const smallFlowerPlacements = [];
  for (let i = 0; i < 5; i++) {
    const a = i / 5 * Math.PI * 2;
    smallFlowerPlacements.push({
      angle: smallFlowerCenterX - Math.cos(a) * 0.034,
      y: smallFlowerCenterY + Math.sin(a) * 0.027,
      sx: 0.024,
      sy: 0.038,
      rot: a - Math.PI / 2,
      extra: 0.012,
    });
  }

  const small_flower_petals = makeSurfaceInstances(
    petalGeom,
    pinkGlazeMat,
    smallFlowerPlacements,
    bodySurfacePose
  );
  small_flower_petals.name = "small_flower_petals";
  floral_decoration.add(small_flower_petals);

  const small_flower_center = makeSurfaceDecal(
    petalGeom,
    darkPinkGlazeMat,
    smallFlowerCenterX,
    smallFlowerCenterY,
    0.018,
    0.016,
    0,
    0.014
  );
  small_flower_center.name = "small_flower_center";
  floral_decoration.add(small_flower_center);

  const budPlacements = [
    { angle: 2.20, y: -0.045, sx: 0.018, sy: 0.024, rot: -0.75, extra: 0.011 },
    { angle: 2.09, y: -0.065, sx: 0.016, sy: 0.022, rot: -0.35, extra: 0.011 },
    { angle: 1.58, y: 0.225, sx: 0.017, sy: 0.024, rot: 0.55, extra: 0.011 },
    { angle: 1.49, y: 0.252, sx: 0.015, sy: 0.021, rot: 0.95, extra: 0.011 },
    { angle: 0.89, y: -0.105, sx: 0.016, sy: 0.022, rot: 0.72, extra: 0.011 },
  ];
  const branch_buds = makeSurfaceInstances(
    petalGeom,
    blueGlazeMat,
    budPlacements,
    bodySurfacePose
  );
  branch_buds.name = "branch_buds";
  floral_decoration.add(branch_buds);

  const lid_decoration = new THREE.Group();
  lid_decoration.name = "lid_decoration";
  root.add(lid_decoration);

  const lid_branch = createLidVine([
    { x: 2.34, y: 0.535 },
    { x: 2.10, y: 0.515 },
    { x: 1.86, y: 0.525 },
    { x: 1.57, y: 0.505 },
    { x: 1.30, y: 0.525 },
    { x: 1.02, y: 0.515 },
    { x: 0.76, y: 0.535 },
  ]);
  lid_branch.name = "lid_branch";
  lid_decoration.add(lid_branch);

  const lidLeafPlacements = [
    { angle: 2.13, y: 0.548, sx: 0.043, sy: 0.040, rot: 0.72, extra: 0.010 },
    { angle: 1.88, y: 0.500, sx: 0.047, sy: 0.043, rot: -0.72, extra: 0.010 },
    { angle: 1.58, y: 0.548, sx: 0.045, sy: 0.041, rot: 0.62, extra: 0.010 },
    { angle: 1.31, y: 0.495, sx: 0.048, sy: 0.043, rot: -0.68, extra: 0.010 },
    { angle: 1.04, y: 0.550, sx: 0.044, sy: 0.040, rot: 0.78, extra: 0.010 },
    { angle: 0.82, y: 0.510, sx: 0.040, sy: 0.037, rot: -0.55, extra: 0.010 },
  ];

  const lid_leaves = makeSurfaceInstances(
    leafGeom,
    lightBlueGlazeMat,
    lidLeafPlacements,
    lidSurfacePose
  );
  lid_leaves.name = "lid_leaves";
  lid_decoration.add(lid_leaves);

  const lidFlowerSpecs = [
    { angle: 2.00, y: 0.530, size: 0.027 },
    { angle: 1.45, y: 0.522, size: 0.025 },
    { angle: 0.91, y: 0.532, size: 0.024 },
  ];
  const lidPetalPlacements = [];
  for (let f = 0; f < lidFlowerSpecs.length; f++) {
    const flower = lidFlowerSpecs[f];
    for (let i = 0; i < 5; i++) {
      const a = i / 5 * Math.PI * 2;
      lidPetalPlacements.push({
        angle: flower.angle - Math.cos(a) * flower.size * 0.9,
        y: flower.y + Math.sin(a) * flower.size * 0.8,
        sx: flower.size * 0.52,
        sy: flower.size,
        rot: a - Math.PI / 2,
        extra: 0.012,
      });
    }
  }

  const lid_flower_petals = makeSurfaceInstances(
    petalGeom,
    blueGlazeMat,
    lidPetalPlacements,
    lidSurfacePose
  );
  lid_flower_petals.name = "lid_flower_petals";
  lid_decoration.add(lid_flower_petals);

  const lidFlowerCenterPlacements = [];
  for (let i = 0; i < lidFlowerSpecs.length; i++) {
    lidFlowerCenterPlacements.push({
      angle: lidFlowerSpecs[i].angle,
      y: lidFlowerSpecs[i].y,
      sx: lidFlowerSpecs[i].size * 0.42,
      sy: lidFlowerSpecs[i].size * 0.42,
      rot: 0,
      extra: 0.014,
    });
  }

  const lid_flower_centers = makeSurfaceInstances(
    petalGeom,
    lightBlueGlazeMat,
    lidFlowerCenterPlacements,
    lidSurfacePose
  );
  lid_flower_centers.name = "lid_flower_centers";
  lid_decoration.add(lid_flower_centers);

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