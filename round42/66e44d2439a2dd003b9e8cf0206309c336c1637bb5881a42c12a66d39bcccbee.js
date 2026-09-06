export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "two_tone_ceramic_vase";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  root.add(decoration_group);

  const surface_detail_group = new THREE.Group();
  surface_detail_group.name = "surface_detail_group";
  root.add(surface_detail_group);

  const red_ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xa94d3f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const upper_red_glazeMat = new THREE.MeshStandardMaterial({
    color: 0xa52f1f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const inner_red_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x7f2118,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const blue_ceramicMat = new THREE.MeshStandardMaterial({
    color: 0x062d7d,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const dark_blue_glazeMat = new THREE.MeshStandardMaterial({
    color: 0x07183f,
    metalness: 0.0,
    roughness: 0.4
  });
  const rim_accentMat = new THREE.MeshStandardMaterial({
    color: 0x8d321f,
    metalness: 0.0,
    roughness: 0.4
  });
  const footMat = new THREE.MeshStandardMaterial({
    color: 0xb89468,
    metalness: 0.0,
    roughness: 0.9
  });
  const pale_wearMat = new THREE.MeshStandardMaterial({
    color: 0xe2d8d3,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });
  const speckleMat = new THREE.MeshStandardMaterial({
    color: 0x241d1b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const crackleMat = new THREE.MeshStandardMaterial({
    color: 0x3b2925,
    metalness: 0.0,
    roughness: 0.7
  });

  const outer_surface_points = [
    new THREE.Vector2(0.55, 0.00),
    new THREE.Vector2(0.59, 0.04),
    new THREE.Vector2(0.64, 0.12),
    new THREE.Vector2(0.70, 0.28),
    new THREE.Vector2(0.77, 0.52),
    new THREE.Vector2(0.83, 0.82),
    new THREE.Vector2(0.87, 1.12),
    new THREE.Vector2(0.88, 1.34),
    new THREE.Vector2(0.86, 1.52),
    new THREE.Vector2(0.82, 1.72),
    new THREE.Vector2(0.75, 1.92),
    new THREE.Vector2(0.66, 2.08),
    new THREE.Vector2(0.59, 2.20),
    new THREE.Vector2(0.57, 2.34),
    new THREE.Vector2(0.61, 2.45),
    new THREE.Vector2(0.70, 2.54),
    new THREE.Vector2(0.76, 2.58)
  ];

  const outer_surface_curve = new THREE.SplineCurve(outer_surface_points);
  const outer_surface = outer_surface_curve.getSpacedPoints(96);

  function radiusAt(y) {
    if (y <= outer_surface[0].y) return outer_surface[0].x;
    for (let i = 0; i < outer_surface.length - 1; i++) {
      const a = outer_surface[i];
      const b = outer_surface[i + 1];
      if (y <= b.y) {
        const span = b.y - a.y;
        const t = span > 0 ? (y - a.y) / span : 0;
        return a.x + (b.x - a.x) * t;
      }
    }
    return outer_surface[outer_surface.length - 1].x;
  }

  function slopeAt(y) {
    const epsilon = 0.003;
    return (radiusAt(y + epsilon) - radiusAt(y - epsilon)) / (epsilon * 2);
  }

  const red_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    ...outer_surface.map((point) => point.clone())
  ];
  const red_bodyGeom = new THREE.LatheGeometry(red_bodyProfile, 96);
  const red_body = new THREE.Mesh(red_bodyGeom, red_ceramicMat);
  red_body.name = "red_body";
  body_group.add(red_body);

  const inner_bowlProfile = [
    new THREE.Vector2(0.00, 2.16),
    new THREE.Vector2(0.18, 2.18),
    new THREE.Vector2(0.38, 2.24),
    new THREE.Vector2(0.53, 2.34),
    new THREE.Vector2(0.62, 2.45),
    new THREE.Vector2(0.66, 2.53),
    new THREE.Vector2(0.67, 2.56)
  ];
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 96);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, inner_red_glazeMat);
  inner_bowl.name = "inner_bowl";
  body_group.add(inner_bowl);

  const upper_red_glazeProfile = outer_surface
    .filter((point) => point.y >= 1.68)
    .map((point) => new THREE.Vector2(point.x + 0.004, point.y));
  const upper_red_glazeGeom = new THREE.LatheGeometry(upper_red_glazeProfile, 96);
  const upper_red_glaze = new THREE.Mesh(upper_red_glazeGeom, upper_red_glazeMat);
  upper_red_glaze.name = "upper_red_glaze";
  body_group.add(upper_red_glaze);

  const blue_bandProfile = outer_surface
    .filter((point) => point.y >= 1.04 && point.y <= 1.70)
    .map((point) => new THREE.Vector2(point.x + 0.008, point.y));
  const blue_bandGeom = new THREE.LatheGeometry(blue_bandProfile, 96);
  const blue_band = new THREE.Mesh(blue_bandGeom, blue_ceramicMat);
  blue_band.name = "blue_band";
  decoration_group.add(blue_band);

  const upper_black_borderProfile = outer_surface
    .filter((point) => point.y >= 1.66 && point.y <= 1.72)
    .map((point) => new THREE.Vector2(point.x + 0.012, point.y));
  const upper_black_borderGeom = new THREE.LatheGeometry(upper_black_borderProfile, 96);
  const upper_black_border = new THREE.Mesh(upper_black_borderGeom, dark_blue_glazeMat);
  upper_black_border.name = "upper_black_border";
  decoration_group.add(upper_black_border);

  const lower_black_borderProfile = outer_surface
    .filter((point) => point.y >= 1.02 && point.y <= 1.08)
    .map((point) => new THREE.Vector2(point.x + 0.012, point.y));
  const lower_black_borderGeom = new THREE.LatheGeometry(lower_black_borderProfile, 96);
  const lower_black_border = new THREE.Mesh(lower_black_borderGeom, dark_blue_glazeMat);
  lower_black_border.name = "lower_black_border";
  decoration_group.add(lower_black_border);

  const rolled_rimGeom = new THREE.TorusGeometry(0.715, 0.075, 20, 96);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, upper_red_glazeMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 2.58;
  body_group.add(rolled_rim);

  const rim_top_glazeGeom = new THREE.RingGeometry(0.64, 0.785, 96);
  const rim_top_glaze = new THREE.Mesh(rim_top_glazeGeom, upper_red_glazeMat);
  rim_top_glaze.name = "rim_top_glaze";
  rim_top_glaze.rotation.x = -Math.PI / 2;
  rim_top_glaze.position.y = 2.646;
  body_group.add(rim_top_glaze);

  const rim_accentGeom = new THREE.TorusGeometry(0.715, 0.009, 8, 96);
  const rim_accent = new THREE.Mesh(rim_accentGeom, rim_accentMat);
  rim_accent.name = "rim_accent";
  rim_accent.rotation.x = Math.PI / 2;
  rim_accent.position.y = 2.651;
  body_group.add(rim_accent);

  const inner_rim_accentGeom = new THREE.TorusGeometry(0.642, 0.008, 8, 96);
  const inner_rim_accent = new THREE.Mesh(inner_rim_accentGeom, rim_accentMat);
  inner_rim_accent.name = "inner_rim_accent";
  inner_rim_accent.rotation.x = Math.PI / 2;
  inner_rim_accent.position.y = 2.647;
  body_group.add(inner_rim_accent);

  const base_footGeom = new THREE.CylinderGeometry(0.555, 0.565, 0.035, 64);
  const base_foot = new THREE.Mesh(base_footGeom, footMat);
  base_foot.name = "base_foot";
  base_foot.position.y = -0.016;
  body_group.add(base_foot);

  function surfacePoint(angle, y, extra) {
    const radius = radiusAt(y);
    const slope = slopeAt(y);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -slope,
      Math.sin(angle)
    ).normalize();
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ).addScaledVector(normal, extra);
  }

  function surfacePose(angle, y, extra) {
    const radius = radiusAt(y);
    const slope = slopeAt(y);
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

  function makeSurfacePatchGeometry(centerAngle, centerY, angleRadius, yRadius, phase, extra) {
    const positions = [];
    const indices = [];
    const ringCount = 3;
    const segmentCount = 20;

    const center = surfacePoint(centerAngle, centerY, extra);
    positions.push(center.x, center.y, center.z);

    for (let ring = 1; ring <= ringCount; ring++) {
      const radial = ring / ringCount;
      for (let i = 0; i < segmentCount; i++) {
        const theta = i / segmentCount * Math.PI * 2;
        const irregular = 1
          + Math.sin(theta * 3 + phase) * 0.08 * radial
          + Math.cos(theta * 5 - phase) * 0.045 * radial;
        const angle = centerAngle + Math.cos(theta) * angleRadius * radial * irregular;
        const y = centerY + Math.sin(theta) * yRadius * radial * irregular;
        const point = surfacePoint(angle, y, extra);
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let i = 0; i < segmentCount; i++) {
      indices.push(0, 1 + i, 1 + (i + 1) % segmentCount);
    }

    for (let ring = 1; ring < ringCount; ring++) {
      const innerStart = 1 + (ring - 1) * segmentCount;
      const outerStart = 1 + ring * segmentCount;
      for (let i = 0; i < segmentCount; i++) {
        const next = (i + 1) % segmentCount;
        indices.push(
          innerStart + i,
          outerStart + i,
          outerStart + next,
          innerStart + i,
          outerStart + next,
          innerStart + next
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const left_wear_patchGeom = makeSurfacePatchGeometry(
    Math.PI / 2 + 0.32,
    1.43,
    0.19,
    0.22,
    0.4,
    0.016
  );
  const left_wear_patch = new THREE.Mesh(left_wear_patchGeom, pale_wearMat);
  left_wear_patch.name = "left_wear_patch";
  decoration_group.add(left_wear_patch);

  const right_wear_patchGeom = makeSurfacePatchGeometry(
    Math.PI / 2 - 0.35,
    1.45,
    0.17,
    0.21,
    1.7,
    0.016
  );
  const right_wear_patch = new THREE.Mesh(right_wear_patchGeom, pale_wearMat);
  right_wear_patch.name = "right_wear_patch";
  decoration_group.add(right_wear_patch);

  const upper_left_wear_patchGeom = makeSurfacePatchGeometry(
    Math.PI / 2 + 0.27,
    2.08,
    0.12,
    0.055,
    2.2,
    0.015
  );
  const upper_left_wear_patch = new THREE.Mesh(upper_left_wear_patchGeom, pale_wearMat);
  upper_left_wear_patch.name = "upper_left_wear_patch";
  decoration_group.add(upper_left_wear_patch);

  const upper_right_wear_patchGeom = makeSurfacePatchGeometry(
    Math.PI / 2 - 0.38,
    2.04,
    0.10,
    0.045,
    0.9,
    0.015
  );
  const upper_right_wear_patch = new THREE.Mesh(upper_right_wear_patchGeom, pale_wearMat);
  upper_right_wear_patch.name = "upper_right_wear_patch";
  decoration_group.add(upper_right_wear_patch);

  const rim_wear_patchGeom = makeSurfacePatchGeometry(
    Math.PI / 2 + 0.04,
    2.575,
    0.075,
    0.025,
    1.3,
    0.014
  );
  const rim_wear_patch = new THREE.Mesh(rim_wear_patchGeom, pale_wearMat);
  rim_wear_patch.name = "rim_wear_patch";
  decoration_group.add(rim_wear_patch);

  const speckleGeom = new THREE.CircleGeometry(0.008, 8);
  const speckleCount = 36;
  const speckles = new THREE.InstancedMesh(speckleGeom, speckleMat, speckleCount);
  speckles.name = "speckles";
  const speckle_dummy = new THREE.Object3D();

  for (let i = 0; i < speckleCount; i++) {
    const angle = (i * 2.3999632297) % (Math.PI * 2);
    const y = 0.14 + ((i * 37) % 101) / 100 * 2.34;
    const pose = surfacePose(angle, y, 0.014);
    const scale = 0.55 + (i % 5) * 0.18;
    speckle_dummy.position.copy(pose.position);
    speckle_dummy.quaternion.copy(pose.quaternion);
    speckle_dummy.scale.set(scale, scale * (0.75 + (i % 3) * 0.12), 1);
    speckle_dummy.updateMatrix();
    speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  speckles.instanceMatrix.needsUpdate = true;
  surface_detail_group.add(speckles);

  const glaze_fleckGeom = new THREE.CircleGeometry(0.006, 8);
  const glaze_fleckCount = 24;
  const glaze_flecks = new THREE.InstancedMesh(glaze_fleckGeom, pale_wearMat, glaze_fleckCount);
  glaze_flecks.name = "glaze_flecks";
  const fleck_dummy = new THREE.Object3D();

  for (let i = 0; i < glaze_fleckCount; i++) {
    const angle = (0.35 + i * 2.117) % (Math.PI * 2);
    const y = 0.18 + ((i * 29) % 97) / 96 * 2.25;
    const pose = surfacePose(angle, y, 0.015);
    const scale = 0.5 + (i % 4) * 0.2;
    fleck_dummy.position.copy(pose.position);
    fleck_dummy.quaternion.copy(pose.quaternion);
    fleck_dummy.scale.set(scale, scale * (0.65 + (i % 3) * 0.2), 1);
    fleck_dummy.updateMatrix();
    glaze_flecks.setMatrixAt(i, fleck_dummy.matrix);
  }
  glaze_flecks.instanceMatrix.needsUpdate = true;
  surface_detail_group.add(glaze_flecks);

  const crackle_group = new THREE.Group();
  crackle_group.name = "crackle_group";
  surface_detail_group.add(crackle_group);

  function addCrackle(path, radius) {
    const points = path.map((entry) => surfacePoint(entry[0], entry[1], 0.018));
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(10, (points.length - 1) * 7),
      radius,
      5,
      false
    );
    const mesh = new THREE.Mesh(geometry, crackleMat);
    crackle_group.add(mesh);
    return mesh;
  }

  const crackle_01 = addCrackle([
    [1.18, 0.12], [1.24, 0.38], [1.18, 0.66], [1.30, 0.92],
    [1.24, 1.18], [1.34, 1.48], [1.29, 1.78], [1.37, 2.08]
  ], 0.0032);
  crackle_01.name = "crackle_01";

  const crackle_02 = addCrackle([
    [1.23, 0.48], [1.02, 0.62], [0.86, 0.84], [0.72, 1.03]
  ], 0.0028);
  crackle_02.name = "crackle_02";

  const crackle_03 = addCrackle([
    [1.20, 0.72], [1.45, 0.82], [1.62, 1.02], [1.76, 1.20]
  ], 0.0028);
  crackle_03.name = "crackle_03";

  const crackle_04 = addCrackle([
    [1.29, 1.08], [1.08, 1.22], [0.96, 1.43], [0.84, 1.60]
  ], 0.0026);
  crackle_04.name = "crackle_04";

  const crackle_05 = addCrackle([
    [1.31, 1.22], [1.52, 1.36], [1.66, 1.55], [1.78, 1.72]
  ], 0.0026);
  crackle_05.name = "crackle_05";

  const crackle_06 = addCrackle([
    [1.95, 0.16], [1.88, 0.42], [2.00, 0.68], [1.92, 0.94],
    [2.03, 1.18], [1.96, 1.46], [2.08, 1.72]
  ], 0.0030);
  crackle_06.name = "crackle_06";

  const crackle_07 = addCrackle([
    [1.96, 0.42], [2.20, 0.54], [2.38, 0.76], [2.52, 0.92]
  ], 0.0027);
  crackle_07.name = "crackle_07";

  const crackle_08 = addCrackle([
    [1.96, 0.70], [1.76, 0.84], [1.65, 1.06], [1.53, 1.24]
  ], 0.0027);
  crackle_08.name = "crackle_08";

  const crackle_09 = addCrackle([
    [0.48, 0.20], [0.58, 0.48], [0.52, 0.76], [0.64, 1.02],
    [0.57, 1.30], [0.68, 1.58]
  ], 0.0029);
  crackle_09.name = "crackle_09";

  const crackle_10 = addCrackle([
    [0.56, 0.52], [0.33, 0.68], [0.22, 0.90], [0.12, 1.08]
  ], 0.0026);
  crackle_10.name = "crackle_10";

  const crackle_11 = addCrackle([
    [0.57, 0.88], [0.78, 1.02], [0.91, 1.22], [1.02, 1.42]
  ], 0.0026);
  crackle_11.name = "crackle_11";

  const crackle_12 = addCrackle([
    [2.70, 0.22], [2.62, 0.50], [2.72, 0.78], [2.60, 1.06],
    [2.70, 1.34], [2.58, 1.60]
  ], 0.0029);
  crackle_12.name = "crackle_12";

  const crackle_13 = addCrackle([
    [2.66, 0.58], [2.42, 0.72], [2.30, 0.94], [2.18, 1.14]
  ], 0.0026);
  crackle_13.name = "crackle_13";

  const crackle_14 = addCrackle([
    [2.65, 0.94], [2.86, 1.08], [2.96, 1.30], [3.05, 1.50]
  ], 0.0026);
  crackle_14.name = "crackle_14";

  const crackle_15 = addCrackle([
    [1.42, 1.16], [1.34, 1.38], [1.42, 1.58], [1.35, 1.82], [1.42, 2.02]
  ], 0.0024);
  crackle_15.name = "crackle_15";

  function fitToUnitCube(rootObject) {
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    rootObject.scale.setScalar(scale);
    rootObject.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}