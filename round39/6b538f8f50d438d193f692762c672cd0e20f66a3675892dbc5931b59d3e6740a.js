export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cherry_blossom_vase";

  const vase_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3f4f0,
    metalness: 0.0,
    roughness: 0.2,
    clearcoat: 0.65,
    clearcoatRoughness: 0.15,
    emissive: 0x373835,
    emissiveIntensity: 0.16,
    side: THREE.DoubleSide,
  });
  const vase_interiorMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8ebe6,
    metalness: 0.0,
    roughness: 0.24,
    clearcoat: 0.45,
    clearcoatRoughness: 0.18,
    emissive: 0x252724,
    emissiveIntensity: 0.1,
    side: THREE.DoubleSide,
  });
  const branchMat = new THREE.MeshStandardMaterial({
    color: 0x593638,
    metalness: 0.0,
    roughness: 0.4,
  });
  const branch_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x87575a,
    metalness: 0.0,
    roughness: 0.4,
  });
  const blossom_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xefc3d0,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x3a1d25,
    emissiveIntensity: 0.08,
    side: THREE.DoubleSide,
  });
  const blossom_accentsMat = new THREE.MeshStandardMaterial({
    color: 0xd989a2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const blossom_centersMat = new THREE.MeshStandardMaterial({
    color: 0xa84e53,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const stamen_filamentsMat = new THREE.MeshStandardMaterial({
    color: 0xb8664f,
    metalness: 0.0,
    roughness: 0.4,
  });
  const stamen_anthersMat = new THREE.MeshStandardMaterial({
    color: 0x8f3d3c,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const olive_leavesMat = new THREE.MeshStandardMaterial({
    color: 0x77733b,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const leaf_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x514f2e,
    metalness: 0.0,
    roughness: 0.4,
  });
  const base_ringMat = new THREE.MeshStandardMaterial({
    color: 0xb9aa91,
    metalness: 0.0,
    roughness: 0.4,
  });

  const vase_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.42, 0.00),
    new THREE.Vector2(0.47, 0.018),
    new THREE.Vector2(0.50, 0.07),
    new THREE.Vector2(0.54, 0.18),
    new THREE.Vector2(0.62, 0.42),
    new THREE.Vector2(0.68, 0.66),
    new THREE.Vector2(0.70, 0.86),
    new THREE.Vector2(0.69, 1.02),
    new THREE.Vector2(0.65, 1.18),
    new THREE.Vector2(0.58, 1.35),
    new THREE.Vector2(0.47, 1.48),
    new THREE.Vector2(0.36, 1.59),
    new THREE.Vector2(0.31, 1.72),
    new THREE.Vector2(0.30, 1.88),
    new THREE.Vector2(0.32, 2.05),
    new THREE.Vector2(0.37, 2.22),
    new THREE.Vector2(0.45, 2.37),
    new THREE.Vector2(0.53, 2.47),
    new THREE.Vector2(0.57, 2.50),
    new THREE.Vector2(0.57, 2.52),
    new THREE.Vector2(0.54, 2.55),
    new THREE.Vector2(0.47, 2.55),
    new THREE.Vector2(0.44, 2.52),
    new THREE.Vector2(0.43, 2.47),
    new THREE.Vector2(0.39, 2.38),
    new THREE.Vector2(0.33, 2.22),
    new THREE.Vector2(0.28, 2.04),
    new THREE.Vector2(0.27, 1.88),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_profile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const top_rimGeom = new THREE.TorusGeometry(0.505, 0.065, 16, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, vase_bodyMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 2.515;
  root.add(top_rim);

  const inner_lipGeom = new THREE.TorusGeometry(0.445, 0.012, 10, 64);
  const inner_lip = new THREE.Mesh(inner_lipGeom, vase_interiorMat);
  inner_lip.name = "inner_lip";
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 2.505;
  root.add(inner_lip);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.43,
    0.27,
    0.22,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, vase_interiorMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 2.38;
  root.add(inner_wall);

  const mouth_openingGeom = new THREE.CircleGeometry(0.27, 64);
  const mouth_opening = new THREE.Mesh(mouth_openingGeom, vase_interiorMat);
  mouth_opening.name = "mouth_opening";
  mouth_opening.rotation.x = -Math.PI / 2;
  mouth_opening.position.y = 2.268;
  root.add(mouth_opening);

  const base_ringGeom = new THREE.TorusGeometry(0.445, 0.006, 8, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, base_ringMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.012;
  root.add(base_ring);

  const radius_samples = [
    { y: 0.00, r: 0.44 },
    { y: 0.18, r: 0.54 },
    { y: 0.42, r: 0.62 },
    { y: 0.66, r: 0.68 },
    { y: 0.86, r: 0.70 },
    { y: 1.02, r: 0.69 },
    { y: 1.18, r: 0.65 },
    { y: 1.35, r: 0.58 },
    { y: 1.48, r: 0.47 },
    { y: 1.59, r: 0.36 },
    { y: 1.72, r: 0.31 },
    { y: 1.88, r: 0.30 },
    { y: 2.05, r: 0.32 },
    { y: 2.22, r: 0.37 },
    { y: 2.37, r: 0.45 },
    { y: 2.48, r: 0.54 },
  ];

  function vaseRadiusAt(y) {
    if (y <= radius_samples[0].y) return radius_samples[0].r;
    for (let i = 1; i < radius_samples.length; i++) {
      const lower = radius_samples[i - 1];
      const upper = radius_samples[i];
      if (y <= upper.y) {
        const t = (y - lower.y) / (upper.y - lower.y);
        return lower.r + (upper.r - lower.r) * t;
      }
    }
    return radius_samples[radius_samples.length - 1].r;
  }

  function surfacePoint(angle, y, extra) {
    const radius = vaseRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfacePose(angle, y, extra) {
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
    const position = surfacePoint(angle, y, extra);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  function createSurfaceTube(control_points, radius, material, extra) {
    const path_points = [];
    for (let i = 0; i < control_points.length - 1; i++) {
      const start = control_points[i];
      const end = control_points[i + 1];
      for (let j = 0; j < 5; j++) {
        const t = j / 5;
        const angle = start.angle + (end.angle - start.angle) * t;
        const y = start.y + (end.y - start.y) * t;
        path_points.push(surfacePoint(angle, y, extra));
      }
    }
    const last = control_points[control_points.length - 1];
    path_points.push(surfacePoint(last.angle, last.y, extra));
    const curve = new THREE.CatmullRomCurve3(
      path_points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(16, path_points.length * 2),
      radius,
      8,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  const main_branch = createSurfaceTube([
    { angle: 1.46, y: 0.32 },
    { angle: 1.43, y: 0.53 },
    { angle: 1.49, y: 0.74 },
    { angle: 1.55, y: 0.96 },
    { angle: 1.59, y: 1.18 },
    { angle: 1.65, y: 1.40 },
    { angle: 1.72, y: 1.62 },
    { angle: 1.78, y: 1.84 },
    { angle: 1.72, y: 2.04 },
  ], 0.012, branchMat, 0.003);
  main_branch.name = "main_branch";
  root.add(main_branch);

  const main_branch_highlight = createSurfaceTube([
    { angle: 1.455, y: 0.34 },
    { angle: 1.48, y: 0.72 },
    { angle: 1.55, y: 1.00 },
    { angle: 1.64, y: 1.36 },
    { angle: 1.73, y: 1.66 },
    { angle: 1.77, y: 1.88 },
  ], 0.003, branch_highlightMat, 0.014);
  main_branch_highlight.name = "main_branch_highlight";
  root.add(main_branch_highlight);

  const lower_left_branch = createSurfaceTube([
    { angle: 1.47, y: 0.55 },
    { angle: 1.68, y: 0.61 },
    { angle: 1.90, y: 0.68 },
    { angle: 2.12, y: 0.76 },
    { angle: 2.34, y: 0.92 },
  ], 0.007, branchMat, 0.003);
  lower_left_branch.name = "lower_left_branch";
  root.add(lower_left_branch);

  const lower_right_branch = createSurfaceTube([
    { angle: 1.51, y: 0.70 },
    { angle: 1.34, y: 0.78 },
    { angle: 1.14, y: 0.88 },
    { angle: 0.94, y: 0.98 },
    { angle: 0.78, y: 1.08 },
  ], 0.007, branchMat, 0.003);
  lower_right_branch.name = "lower_right_branch";
  root.add(lower_right_branch);

  const middle_right_branch = createSurfaceTube([
    { angle: 1.56, y: 0.98 },
    { angle: 1.36, y: 1.08 },
    { angle: 1.14, y: 1.18 },
    { angle: 0.91, y: 1.28 },
    { angle: 0.72, y: 1.38 },
  ], 0.008, branchMat, 0.003);
  middle_right_branch.name = "middle_right_branch";
  root.add(middle_right_branch);

  const middle_left_branch = createSurfaceTube([
    { angle: 1.62, y: 1.28 },
    { angle: 1.84, y: 1.35 },
    { angle: 2.08, y: 1.43 },
    { angle: 2.31, y: 1.54 },
    { angle: 2.48, y: 1.66 },
  ], 0.007, branchMat, 0.003);
  middle_left_branch.name = "middle_left_branch";
  root.add(middle_left_branch);

  const upper_right_branch = createSurfaceTube([
    { angle: 1.70, y: 1.58 },
    { angle: 1.48, y: 1.65 },
    { angle: 1.24, y: 1.72 },
    { angle: 0.98, y: 1.82 },
    { angle: 0.76, y: 1.98 },
  ], 0.006, branchMat, 0.003);
  upper_right_branch.name = "upper_right_branch";
  root.add(upper_right_branch);

  const upper_left_twig = createSurfaceTube([
    { angle: 1.77, y: 1.82 },
    { angle: 1.95, y: 1.91 },
    { angle: 2.13, y: 2.04 },
    { angle: 2.25, y: 2.16 },
  ], 0.005, branchMat, 0.003);
  upper_left_twig.name = "upper_left_twig";
  root.add(upper_left_twig);

  const top_twig = createSurfaceTube([
    { angle: 1.72, y: 2.02 },
    { angle: 1.57, y: 2.12 },
    { angle: 1.42, y: 2.20 },
  ], 0.0045, branchMat, 0.003);
  top_twig.name = "top_twig";
  root.add(top_twig);

  const blossom_petal_shape = new THREE.Shape();
  blossom_petal_shape.moveTo(0, 0);
  blossom_petal_shape.bezierCurveTo(-0.026, 0.014, -0.052, 0.052, -0.034, 0.077);
  blossom_petal_shape.bezierCurveTo(-0.021, 0.094, -0.008, 0.087, 0, 0.075);
  blossom_petal_shape.bezierCurveTo(0.008, 0.087, 0.021, 0.094, 0.034, 0.077);
  blossom_petal_shape.bezierCurveTo(0.052, 0.052, 0.026, 0.014, 0, 0);
  const blossom_petalsGeom = new THREE.ShapeGeometry(blossom_petal_shape, 12);

  const flowers = [
    { angle: 1.53, y: 0.48, size: 0.078, rotation: 0.10 },
    { angle: 1.82, y: 0.63, size: 0.084, rotation: 0.36 },
    { angle: 2.13, y: 0.76, size: 0.071, rotation: -0.18 },
    { angle: 1.16, y: 0.87, size: 0.081, rotation: 0.22 },
    { angle: 0.84, y: 1.03, size: 0.067, rotation: -0.28 },
    { angle: 1.57, y: 1.04, size: 0.086, rotation: 0.08 },
    { angle: 1.96, y: 1.38, size: 0.083, rotation: 0.30 },
    { angle: 2.36, y: 1.55, size: 0.069, rotation: -0.12 },
    { angle: 1.20, y: 1.70, size: 0.073, rotation: 0.20 },
    { angle: 0.80, y: 1.91, size: 0.061, rotation: -0.34 },
    { angle: 1.72, y: 1.92, size: 0.077, rotation: 0.12 },
    { angle: 1.43, y: 2.17, size: 0.064, rotation: 0.28 },
    { angle: 2.27, y: 2.08, size: 0.056, rotation: -0.20 },
    { angle: 2.48, y: 1.18, size: 0.061, rotation: 0.18 },
    { angle: 1.38, y: 1.30, size: 0.078, rotation: -0.08 },
    { angle: 2.28, y: 0.94, size: 0.071, rotation: 0.32 },
    { angle: 0.94, y: 0.72, size: 0.066, rotation: -0.24 },
    { angle: 1.98, y: 0.37, size: 0.064, rotation: 0.14 },
  ];

  const petal_count = flowers.length * 5;
  const blossom_petals = new THREE.InstancedMesh(
    blossom_petalsGeom,
    blossom_petalsMat,
    petal_count
  );
  blossom_petals.name = "blossom_petals";

  const blossom_accentsGeom = blossom_petalsGeom;
  const blossom_accents = new THREE.InstancedMesh(
    blossom_accentsGeom,
    blossom_accentsMat,
    petal_count
  );
  blossom_accents.name = "blossom_accents";

  const blossom_centersGeom = new THREE.CircleGeometry(0.014, 16);
  const blossom_centers = new THREE.InstancedMesh(
    blossom_centersGeom,
    blossom_centersMat,
    flowers.length
  );
  blossom_centers.name = "blossom_centers";

  const stamen_count = flowers.length * 5;
  const stamen_filamentsGeom = new THREE.CylinderGeometry(0.0018, 0.0018, 1, 6);
  const stamen_filaments = new THREE.InstancedMesh(
    stamen_filamentsGeom,
    stamen_filamentsMat,
    stamen_count
  );
  stamen_filaments.name = "stamen_filaments";

  const stamen_anthersGeom = new THREE.CircleGeometry(0.004, 10);
  const stamen_anthers = new THREE.InstancedMesh(
    stamen_anthersGeom,
    stamen_anthersMat,
    stamen_count
  );
  stamen_anthers.name = "stamen_anthers";

  const dummy = new THREE.Object3D();
  const local_z_axis = new THREE.Vector3(0, 0, 1);
  let petal_index = 0;
  let stamen_index = 0;

  for (let fi = 0; fi < flowers.length; fi++) {
    const flower = flowers[fi];
    const pose = surfacePose(flower.angle, flower.y, 0.006);

    for (let pi = 0; pi < 5; pi++) {
      const petal_angle = flower.rotation + pi / 5 * Math.PI * 2;
      const width_scale = flower.size / 0.075 * (0.94 + 0.04 * ((fi + pi) % 3));
      const length_scale = flower.size / 0.075 * (0.97 + 0.03 * ((fi + pi * 2) % 3));
      const local_rotation = new THREE.Quaternion().setFromAxisAngle(
        local_z_axis,
        petal_angle
      );
      const petal_quaternion = pose.quaternion.clone().multiply(local_rotation);

      dummy.position.copy(pose.position);
      dummy.quaternion.copy(petal_quaternion);
      dummy.scale.set(width_scale, length_scale, 1);
      dummy.updateMatrix();
      blossom_petals.setMatrixAt(petal_index, dummy.matrix);

      dummy.position.copy(pose.position).addScaledVector(
        new THREE.Vector3(0, 0, 0.001),
        1
      );
      dummy.quaternion.copy(petal_quaternion);
      dummy.scale.set(width_scale * 0.62, length_scale * 0.58, 1);
      dummy.updateMatrix();
      blossom_accents.setMatrixAt(petal_index, dummy.matrix);
      petal_index++;
    }

    dummy.position.copy(pose.position).addScaledVector(
      new THREE.Vector3(0, 0, 0.002),
      1
    );
    dummy.quaternion.copy(pose.quaternion);
    dummy.scale.setScalar(flower.size / 0.075);
    dummy.updateMatrix();
    blossom_centers.setMatrixAt(fi, dummy.matrix);

    for (let si = 0; si < 5; si++) {
      const stamen_angle = flower.rotation + 0.25 +
        si / 5 * Math.PI * 2;
      const stamen_length = flower.size * (0.72 + 0.08 * ((fi + si) % 3));
      const local_stamen_rotation = new THREE.Quaternion().setFromAxisAngle(
        local_z_axis,
        stamen_angle
      );
      const stamen_quaternion = pose.quaternion.clone().multiply(
        local_stamen_rotation
      );
      const direction = new THREE.Vector3(0, 1, 0).applyQuaternion(
        stamen_quaternion
      );

      dummy.position.copy(pose.position).add(
        direction.clone().multiplyScalar(stamen_length * 0.5)
      );
      dummy.position.z += 0.003;
      dummy.quaternion.copy(stamen_quaternion);
      dummy.scale.set(1, stamen_length, 1);
      dummy.updateMatrix();
      stamen_filaments.setMatrixAt(stamen_index, dummy.matrix);

      dummy.position.copy(pose.position).add(
        direction.clone().multiplyScalar(stamen_length)
      );
      dummy.position.z += 0.004;
      dummy.quaternion.copy(stamen_quaternion);
      const anther_scale = flower.size / 0.075 *
        (0.82 + 0.08 * ((fi + si) % 2));
      dummy.scale.setScalar(anther_scale);
      dummy.updateMatrix();
      stamen_anthers.setMatrixAt(stamen_index, dummy.matrix);
      stamen_index++;
    }
  }

  blossom_petals.instanceMatrix.needsUpdate = true;
  blossom_accents.instanceMatrix.needsUpdate = true;
  blossom_centers.instanceMatrix.needsUpdate = true;
  stamen_filaments.instanceMatrix.needsUpdate = true;
  stamen_anthers.instanceMatrix.needsUpdate = true;
  root.add(
    blossom_petals,
    blossom_accents,
    blossom_centers,
    stamen_filaments,
    stamen_anthers
  );

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0, 0);
  leaf_shape.bezierCurveTo(-0.035, 0.018, -0.043, 0.064, 0, 0.096);
  leaf_shape.bezierCurveTo(0.043, 0.064, 0.035, 0.018, 0, 0);
  const olive_leavesGeom = new THREE.ShapeGeometry(leaf_shape, 10);
  const leaf_veinsGeom = new THREE.CylinderGeometry(0.0015, 0.0015, 1, 5);

  const leaves = [
    { angle: 1.49, y: 0.61, size: 0.070, rotation: 2.35 },
    { angle: 1.65, y: 0.82, size: 0.077, rotation: -0.75 },
    { angle: 1.32, y: 1.11, size: 0.082, rotation: 0.82 },
    { angle: 1.94, y: 1.27, size: 0.074, rotation: 2.15 },
    { angle: 1.45, y: 1.48, size: 0.068, rotation: -0.62 },
    { angle: 1.94, y: 1.68, size: 0.064, rotation: 2.48 },
    { angle: 1.24, y: 1.79, size: 0.061, rotation: 0.66 },
    { angle: 2.18, y: 1.49, size: 0.066, rotation: -0.92 },
    { angle: 2.34, y: 0.87, size: 0.063, rotation: 2.28 },
    { angle: 0.98, y: 1.23, size: 0.066, rotation: -0.70 },
    { angle: 1.55, y: 0.39, size: 0.063, rotation: 2.55 },
    { angle: 1.12, y: 0.91, size: 0.061, rotation: 0.74 },
  ];

  const olive_leaves = new THREE.InstancedMesh(
    olive_leavesGeom,
    olive_leavesMat,
    leaves.length
  );
  olive_leaves.name = "olive_leaves";

  const leaf_veins = new THREE.InstancedMesh(
    leaf_veinsGeom,
    leaf_veinsMat,
    leaves.length
  );
  leaf_veins.name = "leaf_veins";

  for (let li = 0; li < leaves.length; li++) {
    const leaf = leaves[li];
    const pose = surfacePose(leaf.angle, leaf.y, 0.006);
    const local_rotation = new THREE.Quaternion().setFromAxisAngle(
      local_z_axis,
      leaf.rotation
    );
    const leaf_quaternion = pose.quaternion.clone().multiply(local_rotation);

    dummy.position.copy(pose.position);
    dummy.quaternion.copy(leaf_quaternion);
    dummy.scale.setScalar(leaf.size / 0.075);
    dummy.updateMatrix();
    olive_leaves.setMatrixAt(li, dummy.matrix);

    const leaf_direction = new THREE.Vector3(0, 1, 0).applyQuaternion(
      leaf_quaternion
    );
    dummy.position.copy(pose.position).add(
      leaf_direction.clone().multiplyScalar(leaf.size * 0.43)
    );
    dummy.position.z += 0.002;
    dummy.quaternion.copy(leaf_quaternion);
    dummy.scale.set(1, leaf.size * 0.72, 1);
    dummy.updateMatrix();
    leaf_veins.setMatrixAt(li, dummy.matrix);
  }

  olive_leaves.instanceMatrix.needsUpdate = true;
  leaf_veins.instanceMatrix.needsUpdate = true;
  root.add(olive_leaves, leaf_veins);

  const bud_profile = [
    { y: -0.060, rx: 0.006 },
    { y: -0.043, rx: 0.022 },
    { y: -0.012, rx: 0.034 },
    { y: 0.018, rx: 0.029 },
    { y: 0.045, rx: 0.014 },
    { y: 0.060, rx: 0.004 },
  ];
  const bud_petalsGeom = new THREE.SphereGeometry(1, 16, 10);
  const bud_calyxesGeom = new THREE.ConeGeometry(0.027, 0.046, 8);

  const buds = [
    { angle: 2.25, y: 2.16, size: 0.043, rotation: -0.52 },
    { angle: 2.13, y: 2.04, size: 0.038, rotation: 0.42 },
    { angle: 1.42, y: 2.20, size: 0.039, rotation: -0.38 },
    { angle: 0.76, y: 1.98, size: 0.041, rotation: 0.56 },
    { angle: 2.48, y: 1.66, size: 0.043, rotation: -0.68 },
    { angle: 2.31, y: 1.54, size: 0.038, rotation: 0.36 },
    { angle: 0.72, y: 1.38, size: 0.043, rotation: -0.52 },
    { angle: 0.78, y: 1.08, size: 0.040, rotation: 0.64 },
    { angle: 2.34, y: 0.92, size: 0.041, rotation: -0.72 },
    { angle: 1.92, y: 0.68, size: 0.039, rotation: 0.48 },
    { angle: 1.43, y: 0.32, size: 0.040, rotation: -0.20 },
    { angle: 1.14, y: 0.88, size: 0.038, rotation: 0.74 },
  ];

  const bud_petals = new THREE.InstancedMesh(
    bud_petalsGeom,
    blossom_petalsMat,
    buds.length
  );
  bud_petals.name = "bud_petals";

  const bud_calyxes = new THREE.InstancedMesh(
    bud_calyxesGeom,
    olive_leavesMat,
    buds.length
  );
  bud_calyxes.name = "bud_calyxes";

  for (let bi = 0; bi < buds.length; bi++) {
    const bud = buds[bi];
    const pose = surfacePose(bud.angle, bud.y, 0.006);
    const local_rotation = new THREE.Quaternion().setFromAxisAngle(
      local_z_axis,
      bud.rotation
    );
    const bud_quaternion = pose.quaternion.clone().multiply(local_rotation);
    const bud_direction = new THREE.Vector3(0, 1, 0).applyQuaternion(
      bud_quaternion
    );
    const scale = bud.size / 0.043;

    dummy.position.copy(pose.position);
    dummy.quaternion.copy(bud_quaternion);
    dummy.scale.set(0.021 * scale, 0.060 * scale, 0.006);
    dummy.updateMatrix();
    bud_petals.setMatrixAt(bi, dummy.matrix);

    dummy.position.copy(pose.position).add(
      bud_direction.clone().multiplyScalar(-0.052 * scale)
    );
    dummy.position.z += 0.001;
    dummy.quaternion.copy(bud_quaternion);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    bud_calyxes.setMatrixAt(bi, dummy.matrix);
  }

  bud_petals.instanceMatrix.needsUpdate = true;
  bud_calyxes.instanceMatrix.needsUpdate = true;
  root.add(bud_calyxes, bud_petals);

  fitToUnitCube(THREE, root);
  return root;

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
}