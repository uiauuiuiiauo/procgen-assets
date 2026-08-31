export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hydrangea_vase";

  const vase_group = new THREE.Group();
  vase_group.name = "vase_group";
  root.add(vase_group);

  const bouquet_group = new THREE.Group();
  bouquet_group.name = "bouquet_group";
  bouquet_group.scale.set(1.24, 1.0, 1.24);
  root.add(bouquet_group);

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5878aa,
    metalness: 0.0,
    roughness: 0.4,
  });
  const vase_openingMat = new THREE.MeshStandardMaterial({
    color: 0x172a25,
    metalness: 0.0,
    roughness: 0.7,
  });
  const vase_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xd8e4f2,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });

  const vase_profile = [
    new THREE.Vector2(0.00, -1.25),
    new THREE.Vector2(0.44, -1.25),
    new THREE.Vector2(0.54, -1.23),
    new THREE.Vector2(0.62, -1.17),
    new THREE.Vector2(0.64, -1.10),
    new THREE.Vector2(0.60, -1.03),
    new THREE.Vector2(0.50, -0.98),
    new THREE.Vector2(0.46, -0.91),
    new THREE.Vector2(0.50, -0.84),
    new THREE.Vector2(0.63, -0.73),
    new THREE.Vector2(0.73, -0.55),
    new THREE.Vector2(0.79, -0.32),
    new THREE.Vector2(0.81, -0.08),
    new THREE.Vector2(0.79, 0.15),
    new THREE.Vector2(0.73, 0.35),
    new THREE.Vector2(0.64, 0.49),
    new THREE.Vector2(0.52, 0.59),
    new THREE.Vector2(0.41, 0.64),
    new THREE.Vector2(0.37, 0.69),
    new THREE.Vector2(0.38, 0.74),
    new THREE.Vector2(0.43, 0.78),
    new THREE.Vector2(0.00, 0.78),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_profile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  vase_group.add(vase_body);

  const vase_foot_ringGeom = new THREE.TorusGeometry(0.565, 0.035, 12, 48);
  const vase_foot_ring = new THREE.Mesh(vase_foot_ringGeom, vase_bodyMat);
  vase_foot_ring.name = "vase_foot_ring";
  vase_foot_ring.rotation.x = Math.PI / 2;
  vase_foot_ring.position.y = -1.18;
  vase_group.add(vase_foot_ring);

  const vase_rimGeom = new THREE.TorusGeometry(0.405, 0.035, 12, 48);
  const vase_rim = new THREE.Mesh(vase_rimGeom, vase_bodyMat);
  vase_rim.name = "vase_rim";
  vase_rim.rotation.x = Math.PI / 2;
  vase_rim.position.y = 0.775;
  vase_group.add(vase_rim);

  const vase_openingGeom = new THREE.CircleGeometry(0.37, 48);
  const vase_opening = new THREE.Mesh(vase_openingGeom, vase_openingMat);
  vase_opening.name = "vase_opening";
  vase_opening.rotation.x = -Math.PI / 2;
  vase_opening.position.y = 0.787;
  vase_group.add(vase_opening);

  function vaseRadiusAt(y) {
    if (y < -0.72) return 0.58;
    if (y < -0.45) return 0.70;
    if (y < 0.10) return 0.79;
    if (y < 0.35) return 0.73;
    return 0.64;
  }

  function makeHighlightPath(angle, y0, y1) {
    const points = [];
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      const y = y0 + (y1 - y0) * t;
      const a = angle + Math.sin(t * Math.PI) * 0.035;
      const r = vaseRadiusAt(y) + 0.008;
      points.push(new THREE.Vector3(
        Math.cos(a) * r,
        y,
        Math.sin(a) * r
      ));
    }
    return new THREE.CatmullRomCurve3(points);
  }

  const left_vase_highlightGeom = new THREE.TubeGeometry(
    makeHighlightPath(2.02, -0.58, 0.34),
    28,
    0.055,
    8,
    false
  );
  const left_vase_highlight = new THREE.Mesh(
    left_vase_highlightGeom,
    vase_highlightMat
  );
  left_vase_highlight.name = "left_vase_highlight";
  vase_group.add(left_vase_highlight);

  const right_vase_highlightGeom = new THREE.TubeGeometry(
    makeHighlightPath(1.12, -0.50, 0.30),
    28,
    0.045,
    8,
    false
  );
  const right_vase_highlight = new THREE.Mesh(
    right_vase_highlightGeom,
    vase_highlightMat
  );
  right_vase_highlight.name = "right_vase_highlight";
  vase_group.add(right_vase_highlight);

  const bouquet_coreMat = new THREE.MeshStandardMaterial({
    color: 0x183a28,
    metalness: 0.0,
    roughness: 0.7,
  });
  const bouquet_coreGeom = new THREE.SphereGeometry(1, 28, 18);
  const bouquet_core = new THREE.Mesh(bouquet_coreGeom, bouquet_coreMat);
  bouquet_core.name = "bouquet_core";
  bouquet_core.position.set(0, 1.08, -0.04);
  bouquet_core.scale.set(0.48, 0.60, 0.36);
  bouquet_group.add(bouquet_core);

  const bouquet_stemsMat = new THREE.MeshStandardMaterial({
    color: 0x315b36,
    metalness: 0.0,
    roughness: 0.7,
  });
  const bouquet_stemsGeom = new THREE.CylinderGeometry(0.014, 0.018, 1, 8);
  const bouquet_stems = new THREE.InstancedMesh(
    bouquet_stemsGeom,
    bouquet_stemsMat,
    12
  );
  bouquet_stems.name = "bouquet_stems";

  const stem_dummy = new THREE.Object3D();
  const stem_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2 + 0.18;
    const stem_start = new THREE.Vector3(
      Math.cos(angle) * 0.13,
      0.75,
      Math.sin(angle) * 0.13
    );
    const stem_end = new THREE.Vector3(
      Math.cos(angle) * 0.66,
      1.20 + Math.sin(angle * 2) * 0.12,
      Math.sin(angle) * 0.50 - 0.04
    );
    const stem_direction = stem_end.clone().sub(stem_start);
    const stem_length = stem_direction.length();

    stem_dummy.position.copy(stem_start).add(stem_end).multiplyScalar(0.5);
    stem_dummy.quaternion.setFromUnitVectors(
      stem_up,
      stem_direction.clone().normalize()
    );
    stem_dummy.scale.set(1, stem_length, 1);
    stem_dummy.updateMatrix();
    bouquet_stems.setMatrixAt(i, stem_dummy.matrix);
  }
  bouquet_stems.instanceMatrix.needsUpdate = true;
  bouquet_group.add(bouquet_stems);

  const leaf_clustersMat = new THREE.MeshStandardMaterial({
    color: 0x285333,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0, 0);
  leaf_shape.bezierCurveTo(-0.28, 0.18, -0.42, 0.62, 0, 1);
  leaf_shape.bezierCurveTo(0.42, 0.62, 0.28, 0.18, 0, 0);

  const leaf_clustersGeom = new THREE.ShapeGeometry(leaf_shape, 8);
  const leaf_clusters = new THREE.InstancedMesh(
    leaf_clustersGeom,
    leaf_clustersMat,
    24
  );
  leaf_clusters.name = "leaf_clusters";

  const leaf_dummy = new THREE.Object3D();
  const leaf_forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2 + 0.12;
    const leaf_normal = new THREE.Vector3(
      Math.cos(angle),
      0.10 + 0.10 * Math.sin(angle * 2),
      Math.sin(angle)
    ).normalize();

    leaf_dummy.position.set(
      Math.cos(angle) * 0.58,
      0.91 + 0.11 * Math.sin(angle * 3),
      Math.sin(angle) * 0.43
    );
    leaf_dummy.quaternion.setFromUnitVectors(leaf_forward, leaf_normal);
    leaf_dummy.rotateZ(angle * 0.45 + Math.sin(angle * 2));
    const leaf_scale = 0.18 + 0.035 * (1 + Math.sin(angle * 5));
    leaf_dummy.scale.set(leaf_scale, leaf_scale, leaf_scale);
    leaf_dummy.updateMatrix();
    leaf_clusters.setMatrixAt(i, leaf_dummy.matrix);
  }
  leaf_clusters.instanceMatrix.needsUpdate = true;
  bouquet_group.add(leaf_clusters);

  const flower_petal_shape = new THREE.Shape();
  flower_petal_shape.moveTo(0, 0);
  flower_petal_shape.bezierCurveTo(-0.18, 0.05, -0.48, 0.28, -0.46, 0.62);
  flower_petal_shape.bezierCurveTo(-0.45, 0.90, -0.24, 1.04, 0, 1.0);
  flower_petal_shape.bezierCurveTo(0.24, 1.04, 0.45, 0.90, 0.46, 0.62);
  flower_petal_shape.bezierCurveTo(0.48, 0.28, 0.18, 0.05, 0, 0);

  const flower_petalGeom = new THREE.ExtrudeGeometry(flower_petal_shape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.009,
    bevelSegments: 2,
  });
  flower_petalGeom.translate(0, 0, -0.009);

  const pale_blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xa8c1ed,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const ivory_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xe7f0e8,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const periwinkle_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x829bdc,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const petal_veinsMat = new THREE.MeshStandardMaterial({
    color: 0x7188b5,
    metalness: 0.0,
    roughness: 0.7,
  });
  const flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0x7895a5,
    metalness: 0.0,
    roughness: 0.7,
  });
  const flower_center_dotsMat = new THREE.MeshStandardMaterial({
    color: 0xb7c7b5,
    metalness: 0.0,
    roughness: 0.7,
  });

  const pale_blue_records = [];
  const ivory_records = [];
  const periwinkle_records = [];
  const all_petal_records = [];
  const center_records = [];
  const center_dot_records = [];
  const flower_records = [];

  const bouquet_center_y = 1.25;
  const bouquet_radius_x = 0.82;
  const bouquet_radius_y = 0.78;
  const bouquet_radius_z = 0.62;

  function addPetalRecord(
    records,
    flower,
    petal_index,
    direction,
    length,
    width,
    tilt,
    normal
  ) {
    const record = {
      base: flower.base.clone(),
      direction: direction.clone().normalize(),
      length: length,
      width: width,
      tilt: tilt,
      normal: normal.clone().normalize(),
    };
    records.push(record);
    all_petal_records.push(record);
    flower.petals.push(record);
  }

  function addFlower(base, normal, size, flower_index) {
    const flower_normal = normal.clone().normalize();
    const reference = Math.abs(flower_normal.y) < 0.88
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
    const tangent_u = new THREE.Vector3()
      .crossVectors(reference, flower_normal)
      .normalize();
    const tangent_v = new THREE.Vector3()
      .crossVectors(flower_normal, tangent_u)
      .normalize();

    let petal_color = (flower_index * 7 + 2) % 3;
    if (base.y > 1.62 && flower_index % 3 !== 0) petal_color = 1;

    let records = pale_blue_records;
    if (petal_color === 1) records = ivory_records;
    if (petal_color === 2) records = periwinkle_records;

    const flower_phase = (flower_index % 7) * 0.075;
    const flower_tilt = 0.055 * Math.sin(flower_index * 1.73);
    const petal_length = size * (
      0.94 + 0.045 * Math.sin(flower_index * 2.11)
    );

    for (let petal_index = 0; petal_index < 4; petal_index++) {
      const petal_angle =
        petal_index / 4 * Math.PI * 2 +
        flower_phase;
      const horizontal = tangent_u.clone()
        .multiplyScalar(Math.cos(petal_angle))
        .add(tangent_v.clone().multiplyScalar(Math.sin(petal_angle)))
        .normalize();

      const petal_direction = horizontal
        .multiplyScalar(0.96)
        .add(flower_normal.clone().multiplyScalar(
          0.12 + flower_tilt * Math.cos(petal_angle * 2)
        ))
        .normalize();

      const petal_tilt =
        flower_tilt +
        0.035 * Math.sin(flower_index * 1.31 + petal_index * 2.17);
      const petal_length_variation =
        0.96 +
        0.045 * Math.sin(flower_index * 2.43 + petal_index * 1.71);
      const petal_width_variation =
        0.97 +
        0.04 * Math.cos(flower_index * 1.89 + petal_index * 2.03);

      addPetalRecord(
        records,
        { base: base, petals: [] },
        petal_index,
        petal_direction,
        petal_length * petal_length_variation,
        petal_length * 0.82 * petal_width_variation,
        petal_tilt,
        flower_normal
      );
    }

    center_records.push({
      base: base.clone(),
      normal: flower_normal.clone(),
      size: size,
    });

    const center_dot = {
      base: base.clone()
        .add(flower_normal.clone().multiplyScalar(size * 0.034))
        .add(new THREE.Vector3(0, size * 0.008, 0)),
      normal: flower_normal.clone(),
      size: size,
    };
    center_dot_records.push(center_dot);
    flower_records.push({
      base: base.clone(),
      normal: flower_normal.clone(),
      petals: [],
    });
  }

  let flower_index = 0;

  for (let row = 0; row < 6; row++) {
    const theta = (1.45 - row * 0.29) / 1.45 * Math.PI / 2;
    const ring_count = row === 5 ? 6 : row % 2 === 0 ? 14 : 13;
    const ring_phase = row * 0.31 + (row % 2) * Math.PI / ring_count;

    for (let j = 0; j < ring_count; j++) {
      const angle = j / ring_count * Math.PI * 2 + ring_phase;
      const shell_x = Math.sin(theta) * Math.cos(angle);
      const shell_y = Math.cos(theta);
      const shell_z = Math.sin(theta) * Math.sin(angle);

      const base = new THREE.Vector3(
        bouquet_radius_x * shell_x,
        bouquet_center_y + bouquet_radius_y * shell_y,
        -0.02 + bouquet_radius_z * shell_z
      );
      const normal = new THREE.Vector3(
        shell_x / bouquet_radius_x,
        shell_y / bouquet_radius_y,
        shell_z / bouquet_radius_z
      ).normalize();
      const size = 0.205 + 0.012 * (
        0.5 + 0.5 * Math.sin(flower_index * 2.17 + row)
      );

      addFlower(base, normal, size, flower_index);
      flower_index++;
    }
  }

  for (let i = 0; i < 7; i++) {
    const angle = i / 7 * Math.PI * 2 + 0.22;
    const radius = i === 0 ? 0 : 0.18;
    const base = new THREE.Vector3(
      Math.cos(angle) * radius,
      1.96 + 0.025 * Math.sin(angle * 2),
      -0.01 + Math.sin(angle) * radius * 0.72
    );
    const normal = new THREE.Vector3(
      Math.cos(angle) * radius * 0.8,
      1,
      Math.sin(angle) * radius * 0.6
    ).normalize();
    const size = 0.205 + 0.010 * (
      0.5 + 0.5 * Math.sin(i * 2.31)
    );

    addFlower(base, normal, size, flower_index);
    flower_index++;
  }

  function createPetalInstances(records, material, name) {
    const mesh = new THREE.InstancedMesh(
      flower_petalGeom,
      material,
      records.length
    );
    mesh.name = name;
    mesh.frustumCulled = false;

    const dummy = new THREE.Object3D();
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      dummy.position.copy(record.base);
      dummy.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        record.direction
      );
      dummy.rotateY(
        0.10 * Math.sin(i * 1.79) +
        record.tilt * 0.35
      );
      dummy.rotateX(record.tilt);
      dummy.scale.set(
        record.width / 0.82,
        record.length,
        0.82
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const pale_blue_petals = createPetalInstances(
    pale_blue_records,
    pale_blue_petalsMat,
    "pale_blue_petals"
  );
  bouquet_group.add(pale_blue_petals);

  const ivory_petals = createPetalInstances(
    ivory_records,
    ivory_petalsMat,
    "ivory_petals"
  );
  bouquet_group.add(ivory_petals);

  const periwinkle_petals = createPetalInstances(
    periwinkle_records,
    periwinkle_petalsMat,
    "periwinkle_petals"
  );
  bouquet_group.add(periwinkle_petals);

  const petal_veinsGeom = new THREE.CylinderGeometry(
    0.0022,
    0.0014,
    1,
    5
  );
  const petal_veins = new THREE.InstancedMesh(
    petal_veinsGeom,
    petal_veinsMat,
    all_petal_records.length
  );
  petal_veins.name = "petal_veins";
  petal_veins.frustumCulled = false;

  const vein_dummy = new THREE.Object3D();
  for (let i = 0; i < all_petal_records.length; i++) {
    const record = all_petal_records[i];
    const vein_quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      record.direction
    );
    const vein_offset = new THREE.Vector3(
      0,
      record.length * 0.43,
      0.018
    ).applyQuaternion(vein_quaternion);

    vein_dummy.position.copy(record.base).add(vein_offset);
    vein_dummy.quaternion.copy(vein_quaternion);
    vein_dummy.scale.set(1, record.length * 0.58, 1);
    vein_dummy.updateMatrix();
    petal_veins.setMatrixAt(i, vein_dummy.matrix);
  }
  petal_veins.instanceMatrix.needsUpdate = true;
  bouquet_group.add(petal_veins);

  const flower_centersGeom = new THREE.SphereGeometry(1, 12, 8);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flower_centersMat,
    center_records.length
  );
  flower_centers.name = "flower_centers";
  flower_centers.frustumCulled = false;

  const center_dummy = new THREE.Object3D();
  for (let i = 0; i < center_records.length; i++) {
    const record = center_records[i];
    center_dummy.position.copy(record.base)
      .add(record.normal.clone().multiplyScalar(record.size * 0.025))
      .add(new THREE.Vector3(0, record.size * 0.006, 0));
    center_dummy.quaternion.identity();
    center_dummy.scale.set(
      record.size * 0.065,
      record.size * 0.065,
      record.size * 0.040
    );
    center_dummy.updateMatrix();
    flower_centers.setMatrixAt(i, center_dummy.matrix);
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  bouquet_group.add(flower_centers);

  const flower_center_dotsGeom = new THREE.SphereGeometry(1, 8, 6);
  const flower_center_dots = new THREE.InstancedMesh(
    flower_center_dotsGeom,
    flower_center_dotsMat,
    center_dot_records.length * 5
  );
  flower_center_dots.name = "flower_center_dots";
  flower_center_dots.frustumCulled = false;

  const dot_dummy = new THREE.Object3D();
  let dot_index = 0;
  for (let i = 0; i < center_dot_records.length; i++) {
    const record = center_dot_records[i];

    dot_dummy.position.copy(record.base);
    dot_dummy.quaternion.identity();
    const dot_scale = record.size * 0.014;
    dot_dummy.scale.set(dot_scale, dot_scale, dot_scale);
    dot_dummy.updateMatrix();
    flower_center_dots.setMatrixAt(dot_index++, dot_dummy.matrix);

    const reference = Math.abs(record.normal.y) < 0.9
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(1, 0, 0);
    const tangent_u = new THREE.Vector3()
      .crossVectors(reference, record.normal)
      .normalize();
    const tangent_v = new THREE.Vector3()
      .crossVectors(record.normal, tangent_u)
      .normalize();

    for (let j = 0; j < 5; j++) {
      const angle = j / 5 * Math.PI * 2 + i * 0.13;
      const tangent = tangent_u.clone()
        .multiplyScalar(Math.cos(angle))
        .add(tangent_v.clone().multiplyScalar(Math.sin(angle)));

      dot_dummy.position.copy(record.base)
        .add(tangent.multiplyScalar(record.size * 0.034))
        .add(record.normal.clone().multiplyScalar(record.size * 0.004));
      dot_dummy.quaternion.identity();
      dot_dummy.scale.set(dot_scale, dot_scale, dot_scale);
      dot_dummy.updateMatrix();
      flower_center_dots.setMatrixAt(dot_index++, dot_dummy.matrix);
    }
  }
  flower_center_dots.instanceMatrix.needsUpdate = true;
  bouquet_group.add(flower_center_dots);

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
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}