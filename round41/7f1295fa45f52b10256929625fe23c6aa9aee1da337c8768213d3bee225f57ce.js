export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hydrangea_vase";

  const vase_group = new THREE.Group();
  vase_group.name = "vase_group";
  root.add(vase_group);

  const bouquet_group = new THREE.Group();
  bouquet_group.name = "bouquet_group";
  root.add(bouquet_group);

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x557daf,
    metalness: 0.0,
    roughness: 0.4,
  });
  const vase_openingMat = new THREE.MeshStandardMaterial({
    color: 0x173a63,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const vase_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xd8e8f4,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
  });
  const stem_clusterMat = new THREE.MeshStandardMaterial({
    color: 0x315b2d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const leaf_bladesMat = new THREE.MeshStandardMaterial({
    color: 0x47733b,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const leaf_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x294d27,
    metalness: 0.0,
    roughness: 0.8,
  });

  const vase_profile = [
    new THREE.Vector2(0.00, -1.26),
    new THREE.Vector2(0.42, -1.26),
    new THREE.Vector2(0.48, -1.22),
    new THREE.Vector2(0.50, -1.14),
    new THREE.Vector2(0.47, -1.05),
    new THREE.Vector2(0.43, -0.98),
    new THREE.Vector2(0.53, -0.87),
    new THREE.Vector2(0.63, -0.68),
    new THREE.Vector2(0.70, -0.40),
    new THREE.Vector2(0.73, -0.10),
    new THREE.Vector2(0.71, 0.20),
    new THREE.Vector2(0.65, 0.46),
    new THREE.Vector2(0.56, 0.66),
    new THREE.Vector2(0.46, 0.79),
    new THREE.Vector2(0.39, 0.84),
    new THREE.Vector2(0.37, 0.90),
    new THREE.Vector2(0.40, 0.96),
    new THREE.Vector2(0.42, 0.98),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_profile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  vase_group.add(vase_body);

  const vase_foot_ringGeom = new THREE.TorusGeometry(0.44, 0.055, 14, 64);
  const vase_foot_ring = new THREE.Mesh(vase_foot_ringGeom, vase_bodyMat);
  vase_foot_ring.name = "vase_foot_ring";
  vase_foot_ring.rotation.x = Math.PI / 2;
  vase_foot_ring.position.y = -1.19;
  vase_group.add(vase_foot_ring);

  const vase_rimGeom = new THREE.TorusGeometry(0.385, 0.035, 14, 64);
  const vase_rim = new THREE.Mesh(vase_rimGeom, vase_bodyMat);
  vase_rim.name = "vase_rim";
  vase_rim.rotation.x = Math.PI / 2;
  vase_rim.position.y = 0.965;
  vase_group.add(vase_rim);

  const vase_openingGeom = new THREE.CircleGeometry(0.37, 48);
  const vase_opening = new THREE.Mesh(vase_openingGeom, vase_openingMat);
  vase_opening.name = "vase_opening";
  vase_opening.rotation.x = -Math.PI / 2;
  vase_opening.position.y = 0.972;
  vase_group.add(vase_opening);

  const vase_highlightShape = new THREE.Shape();
  vase_highlightShape.moveTo(-0.045, -0.28);
  vase_highlightShape.bezierCurveTo(-0.075, -0.12, -0.065, 0.15, -0.025, 0.29);
  vase_highlightShape.bezierCurveTo(0.015, 0.33, 0.055, 0.25, 0.045, 0.14);
  vase_highlightShape.lineTo(0.025, -0.20);
  vase_highlightShape.bezierCurveTo(0.018, -0.28, -0.010, -0.31, -0.045, -0.28);
  vase_highlightShape.closePath();
  const vase_highlightGeom = new THREE.ShapeGeometry(vase_highlightShape, 12);

  function placeVaseHighlight(mesh, angle, radius, y) {
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    mesh.position.set(normal.x * radius, y, normal.z * radius);
    vase_group.add(mesh);
  }

  const left_vase_highlight = new THREE.Mesh(vase_highlightGeom, vase_highlightMat);
  left_vase_highlight.name = "left_vase_highlight";
  placeVaseHighlight(left_vase_highlight, 1.96, 0.735, -0.16);

  const right_vase_highlight = new THREE.Mesh(vase_highlightGeom, vase_highlightMat);
  right_vase_highlight.name = "right_vase_highlight";
  placeVaseHighlight(right_vase_highlight, 1.16, 0.725, -0.08);
  right_vase_highlight.scale.set(0.82, 0.88, 1);

  const bouquet_center = new THREE.Vector3(0, 1.47, 0);
  const bouquet_rx = 1.03;
  const bouquet_ry = 0.78;
  const bouquet_rz = 0.78;

  const stem_clusterGeom = new THREE.CylinderGeometry(0.17, 0.22, 0.42, 16);
  const stem_cluster = new THREE.Mesh(stem_clusterGeom, stem_clusterMat);
  stem_cluster.name = "stem_cluster";
  stem_cluster.position.set(0, 1.08, 0);
  bouquet_group.add(stem_cluster);

  const bouquet_coreGeom = new THREE.SphereGeometry(1, 28, 18);
  const bouquet_core = new THREE.Mesh(bouquet_coreGeom, stem_clusterMat);
  bouquet_core.name = "bouquet_core";
  bouquet_core.position.copy(bouquet_center);
  bouquet_core.scale.set(0.53, 0.47, 0.47);
  bouquet_group.add(bouquet_core);

  const leaf_bladesShape = new THREE.Shape();
  leaf_bladesShape.moveTo(0, 0);
  leaf_bladesShape.bezierCurveTo(-0.08, 0.035, -0.13, 0.15, -0.025, 0.27);
  leaf_bladesShape.lineTo(0, 0.30);
  leaf_bladesShape.lineTo(0.025, 0.27);
  leaf_bladesShape.bezierCurveTo(0.13, 0.15, 0.08, 0.035, 0, 0);
  leaf_bladesShape.closePath();

  const leaf_bladesGeom = new THREE.ShapeGeometry(leaf_bladesShape, 10);
  const leaf_veinsGeom = new THREE.CylinderGeometry(0.004, 0.006, 0.22, 6);
  const leaf_count = 24;
  const leaf_blades = new THREE.InstancedMesh(
    leaf_bladesGeom,
    leaf_bladesMat,
    leaf_count
  );
  leaf_blades.name = "leaf_blades";
  leaf_blades.frustumCulled = false;

  const leaf_veins = new THREE.InstancedMesh(
    leaf_veinsGeom,
    leaf_veinsMat,
    leaf_count
  );
  leaf_veins.name = "leaf_veins";
  leaf_veins.frustumCulled = false;

  const leaf_matrix = new THREE.Matrix4();
  const leaf_quaternion = new THREE.Quaternion();
  const leaf_position = new THREE.Vector3();
  const leaf_scale = new THREE.Vector3();
  const leaf_direction = new THREE.Vector3();
  const leaf_normal = new THREE.Vector3();
  const leaf_x_axis = new THREE.Vector3();
  const leaf_basis = new THREE.Matrix4();

  for (let i = 0; i < leaf_count; i++) {
    const angle = i * 2.3999632297;
    const level = ((i * 7) % leaf_count) / (leaf_count - 1);
    const edge = 0.58 + level * 0.38;
    leaf_direction.set(
      Math.cos(angle) * edge,
      -0.20 + level * 0.38,
      Math.sin(angle) * edge
    ).normalize();

    leaf_normal.set(Math.cos(angle + 0.45), 0.12, Math.sin(angle + 0.45)).normalize();
    leaf_x_axis.crossVectors(leaf_direction, leaf_normal).normalize();
    leaf_normal.crossVectors(leaf_x_axis, leaf_direction).normalize();
    leaf_basis.makeBasis(leaf_x_axis, leaf_direction, leaf_normal);
    leaf_quaternion.setFromRotationMatrix(leaf_basis);

    const size = 0.78 + 0.24 * (0.5 + 0.5 * Math.sin(i * 1.73));
    leaf_position
      .copy(bouquet_center)
      .addScaledVector(leaf_direction, bouquet_ry * 0.82);

    leaf_scale.set(size, size, size);
    leaf_matrix.compose(leaf_position, leaf_quaternion, leaf_scale);
    leaf_blades.setMatrixAt(i, leaf_matrix);

    const vein_position = leaf_position.clone().addScaledVector(leaf_direction, 0.11 * size);
    leaf_matrix.compose(vein_position, leaf_quaternion, leaf_scale);
    leaf_veins.setMatrixAt(i, leaf_matrix);
  }
  leaf_blades.instanceMatrix.needsUpdate = true;
  leaf_veins.instanceMatrix.needsUpdate = true;
  bouquet_group.add(leaf_blades, leaf_veins);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, -0.012);
  petalShape.bezierCurveTo(-0.050, 0.000, -0.105, 0.060, -0.105, 0.145);
  petalShape.bezierCurveTo(-0.105, 0.220, -0.055, 0.278, 0, 0.288);
  petalShape.bezierCurveTo(0.055, 0.278, 0.105, 0.220, 0.105, 0.145);
  petalShape.bezierCurveTo(0.105, 0.060, 0.050, 0.000, 0, -0.012);
  petalShape.closePath();

  const petalGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
    curveSegments: 10,
  });
  petalGeom.translate(0, 0, -0.004);

  const blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x729be3,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const pale_blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xa9c8ee,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const ivory_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xe8eee4,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const lavender_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x849dd5,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const petal_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x5678aa,
    metalness: 0.0,
    roughness: 0.8,
  });
  const flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0x82aa91,
    metalness: 0.0,
    roughness: 0.8,
  });
  const stamensMat = new THREE.MeshStandardMaterial({
    color: 0xc6d5b7,
    metalness: 0.0,
    roughness: 0.8,
  });

  const flower_specs = [];
  const flower_direction = new THREE.Vector3();
  const flower_normal = new THREE.Vector3();
  const flower_position = new THREE.Vector3();
  const flower_quaternion = new THREE.Quaternion();
  const flower_twist = new THREE.Quaternion();
  const local_z_axis = new THREE.Vector3(0, 0, 1);

  function addFlowerSpec(nx, ny, nz, size, color, twist) {
    flower_direction.set(nx, ny, nz).normalize();
    flower_normal.set(
      flower_direction.x,
      flower_direction.y * 0.35,
      flower_direction.z
    ).normalize();
    flower_position
      .copy(bouquet_center)
      .addScaledVector(flower_direction, bouquet_ry);
    flower_position.x += flower_direction.z * 0.035 * ny;
    flower_position.y -= 0.045 * (1 - flower_direction.y) * 0.5;

    flower_quaternion.setFromUnitVectors(local_z_axis, flower_normal);
    flower_twist.setFromAxisAngle(local_z_axis, twist);
    flower_quaternion.multiply(flower_twist);
    flower_specs.push({
      position: flower_position.clone(),
      normal: flower_normal.clone(),
      quaternion: flower_quaternion.clone(),
      size,
      color,
      twist,
    });
  }

  const ring_counts = [12, 16, 18, 18, 14, 8];
  const ring_radii = [0.78, 0.92, 1.00, 1.00, 0.90, 0.72];
  const ring_heights = [-0.62, -0.37, -0.12, 0.15, 0.42, 0.68];
  const color_cycle = [0, 2, 1, 0, 3, 2, 1, 0, 2, 0, 3, 1];

  for (let ring = 0; ring < ring_counts.length; ring++) {
    const count = ring_counts[ring];
    const radius = ring_radii[ring];
    const ny = ring_heights[ring];
    const horizontal = Math.sqrt(Math.max(0, 1 - ny * ny));

    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2 + ring * 0.53;
      const nx = Math.cos(angle) * horizontal;
      const nz = Math.sin(angle) * horizontal;
      const size = 0.88 + 0.15 * (
        0.5 + 0.5 * Math.sin(i * 1.91 + ring * 0.77)
      );
      const color = color_cycle[(i * 5 + ring * 3) % color_cycle.length];
      const twist = angle * 0.23 + ring * 0.41 + Math.sin(i * 1.37) * 0.35;
      addFlowerSpec(nx, ny, nz, size, color, twist);
    }
  }

  addFlowerSpec(0.02, 0.98, 0.18, 0.94, 0, -0.18);
  addFlowerSpec(-0.08, 0.94, -0.10, 0.88, 2, 0.42);
  addFlowerSpec(0.12, 0.91, -0.24, 0.91, 1, -0.55);

  const petal_matrices = [[], [], [], []];
  const all_petal_matrices = [];
  const petal_matrix = new THREE.Matrix4();
  const petal_quaternion = new THREE.Quaternion();
  const petal_twist_quaternion = new THREE.Quaternion();
  const petal_scale = new THREE.Vector3();
  const petal_position = new THREE.Vector3();
  const radial_offset = new THREE.Vector3();

  for (let i = 0; i < flower_specs.length; i++) {
    const flower = flower_specs[i];

    for (let petal_index = 0; petal_index < 4; petal_index++) {
      const angle =
        petal_index * Math.PI / 2 +
        flower.twist +
        Math.sin((i + 1) * (petal_index + 2) * 0.61) * 0.035;

      petal_quaternion.setFromAxisAngle(local_z_axis, angle);
      petal_position
        .copy(flower.position)
        .addScaledVector(flower.normal, 0.002 * petal_index);

      radial_offset.set(0, 0, 0).applyQuaternion(petal_quaternion);

      petal_twist_quaternion.setFromAxisAngle(
        radial_offset,
        Math.sin(i * 0.83 + petal_index * 1.7) * 0.10
      );
      petal_quaternion.multiply(petal_twist_quaternion);

      const width_scale =
        flower.size * (0.94 + 0.08 * Math.sin(i + petal_index * 2.1));
      const length_scale =
        flower.size * (0.96 + 0.07 * Math.cos(i * 0.7 + petal_index));
      petal_scale.set(width_scale, length_scale, flower.size);

      petal_matrix.compose(petal_position, petal_quaternion, petal_scale);
      petal_matrices[flower.color].push(petal_matrix.clone());
      all_petal_matrices.push(petal_matrix.clone());
    }
  }

  function createPetalInstances(name, matrices, material) {
    const mesh = new THREE.InstancedMesh(petalGeom, material, matrices.length);
    mesh.name = name;
    mesh.frustumCulled = false;
    for (let i = 0; i < matrices.length; i++) {
      mesh.setMatrixAt(i, matrices[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    bouquet_group.add(mesh);
    return mesh;
  }

  const blue_petals = createPetalInstances(
    "blue_petals",
    petal_matrices[0],
    blue_petalsMat
  );
  const pale_blue_petals = createPetalInstances(
    "pale_blue_petals",
    petal_matrices[1],
    pale_blue_petalsMat
  );
  const ivory_petals = createPetalInstances(
    "ivory_petals",
    petal_matrices[2],
    ivory_petalsMat
  );
  const lavender_petals = createPetalInstances(
    "lavender_petals",
    petal_matrices[3],
    lavender_petalsMat
  );

  const petal_veinsGeom = new THREE.CylinderGeometry(0.003, 0.0045, 0.17, 6);
  const petal_veins = new THREE.InstancedMesh(
    petal_veinsGeom,
    petal_veinsMat,
    all_petal_matrices.length
  );
  petal_veins.name = "petal_veins";
  petal_veins.frustumCulled = false;

  const vein_local_matrix = new THREE.Matrix4().makeTranslation(0, 0.105, 0.012);
  const vein_world_matrix = new THREE.Matrix4();
  for (let i = 0; i < all_petal_matrices.length; i++) {
    vein_world_matrix.multiplyMatrices(all_petal_matrices[i], vein_local_matrix);
    petal_veins.setMatrixAt(i, vein_world_matrix);
  }
  petal_veins.instanceMatrix.needsUpdate = true;
  bouquet_group.add(petal_veins);

  const flower_centersGeom = new THREE.SphereGeometry(0.027, 12, 8);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flower_centersMat,
    flower_specs.length
  );
  flower_centers.name = "flower_centers";
  flower_centers.frustumCulled = false;

  const stamensGeom = new THREE.SphereGeometry(0.010, 8, 6);
  const stamens = new THREE.InstancedMesh(
    stamensGeom,
    stamensMat,
    flower_specs.length * 5
  );
  stamens.name = "stamens";
  stamens.frustumCulled = false;

  const center_matrix = new THREE.Matrix4();
  const center_quaternion = new THREE.Quaternion();
  const center_scale = new THREE.Vector3();
  const center_position = new THREE.Vector3();
  const stamen_position = new THREE.Vector3();
  const stamen_offset = new THREE.Vector3();
  const stamen_scale = new THREE.Vector3(1, 1, 1);
  let stamen_index = 0;

  for (let i = 0; i < flower_specs.length; i++) {
    const flower = flower_specs[i];
    center_position.copy(flower.position).addScaledVector(flower.normal, 0.022);
    center_scale.setScalar(flower.size);
    center_matrix.compose(center_position, center_quaternion, center_scale);
    flower_centers.setMatrixAt(i, center_matrix);

    for (let j = 0; j < 5; j++) {
      const angle = j / 5 * Math.PI * 2 + flower.twist;
      stamen_offset
        .set(Math.cos(angle) * 0.034, Math.sin(angle) * 0.034, 0)
        .applyQuaternion(flower.quaternion);
      stamen_position
        .copy(flower.position)
        .addScaledVector(flower.normal, 0.043)
        .add(stamen_offset);
      center_matrix.compose(stamen_position, center_quaternion, stamen_scale);
      stamens.setMatrixAt(stamen_index++, center_matrix);
    }
  }

  flower_centers.instanceMatrix.needsUpdate = true;
  stamens.instanceMatrix.needsUpdate = true;
  bouquet_group.add(flower_centers, stamens);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}