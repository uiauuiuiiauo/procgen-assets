export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x6f4c37,
    metalness: 0.0,
    roughness: 0.9
  });
  const light_woodMat = new THREE.MeshStandardMaterial({
    color: 0x9a7964,
    metalness: 0.0,
    roughness: 0.9
  });
  const roof_woodMat = new THREE.MeshStandardMaterial({
    color: 0x896b5b,
    metalness: 0.0,
    roughness: 0.9
  });
  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x3b2a21,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const vineMat = new THREE.MeshStandardMaterial({
    color: 0x294b27,
    metalness: 0.0,
    roughness: 0.8
  });
  const dark_leafMat = new THREE.MeshStandardMaterial({
    color: 0x244a29,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const light_leafMat = new THREE.MeshStandardMaterial({
    color: 0x3b6439,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const pink_roseMat = new THREE.MeshStandardMaterial({
    color: 0xe5a2b1,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const blush_roseMat = new THREE.MeshStandardMaterial({
    color: 0xf0c2c8,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const ivory_roseMat = new THREE.MeshStandardMaterial({
    color: 0xf2e7d8,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const rose_centerMat = new THREE.MeshStandardMaterial({
    color: 0xc98291,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const post_count = 8;
  const segment_angle = Math.PI * 2 / post_count;
  const post_radius = 2.18;
  const base_radius = 2.48;
  const eave_radius = 2.72;
  const eave_y = 3.62;
  const apex_y = 5.18;
  const up_axis = new THREE.Vector3(0, 1, 0);
  const forward_axis = new THREE.Vector3(0, 0, 1);

  function radialPoint(angle, radius, y) {
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      y,
      Math.cos(angle) * radius
    );
  }

  function placeBetween(mesh, start, end) {
    const direction = end.clone().sub(start);
    const length = direction.length();
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(up_axis, direction.normalize());
    mesh.scale.set(1, length, 1);
  }

  function makeInstanced(geometry, material, matrices) {
    const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
    for (let i = 0; i < matrices.length; i++) mesh.setMatrixAt(i, matrices[i]);
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const base_plinthGeom = new THREE.CylinderGeometry(base_radius, base_radius, 0.22, 32);
  const base_plinth = new THREE.Mesh(base_plinthGeom, woodMat);
  base_plinth.position.y = 0.11;
  root.add(base_plinth);

  const base_edge_bandGeom = new THREE.CylinderGeometry(2.51, 2.51, 0.13, 32, 1, true);
  const base_edge_band = new THREE.Mesh(base_edge_bandGeom, light_woodMat);
  base_edge_band.position.y = 0.17;
  root.add(base_edge_band);

  const deck_underlayerGeom = new THREE.CylinderGeometry(2.36, 2.36, 0.10, 32);
  const deck_underlayer = new THREE.Mesh(deck_underlayerGeom, dark_woodMat);
  deck_underlayer.position.y = 0.25;
  root.add(deck_underlayer);

  const deck_planksGeom = new THREE.BoxGeometry(1, 1, 1);
  const deck_plank_matrices = [];
  const deck_board_count = 13;
  for (let i = 0; i < deck_board_count; i++) {
    const z = -2.10 + i * 0.35;
    const chord = 2 * Math.sqrt(Math.max(0.01, 2.29 * 2.29 - z * z));
    deck_plank_matrices.push(
      new THREE.Matrix4().compose(
        new THREE.Vector3(0, 0.325, z),
        new THREE.Quaternion(),
        new THREE.Vector3(chord, 0.075, 0.315)
      )
    );
  }
  const deck_planks = makeInstanced(deck_planksGeom, light_woodMat, deck_plank_matrices);
  root.add(deck_planks);

  const support_postsGeom = new THREE.BoxGeometry(0.29, 3.28, 0.31);
  const support_post_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle = i * segment_angle;
    const position = radialPoint(angle, post_radius, 1.96);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(up_axis, angle);
    support_post_matrices.push(
      new THREE.Matrix4().compose(position, quaternion, new THREE.Vector3(1, 1, 1))
    );
  }
  const support_posts = makeInstanced(support_postsGeom, woodMat, support_post_matrices);
  root.add(support_posts);

  const railing_top_railsGeom = new THREE.BoxGeometry(1, 1, 1);
  const railing_top_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle1 = i * segment_angle;
    const angle2 = (i + 1) * segment_angle;
    const start = radialPoint(angle1, post_radius, 1.34);
    const end = radialPoint(angle2, post_radius, 1.34);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    railing_top_matrices.push(
      new THREE.Matrix4().compose(
        start.clone().add(end).multiplyScalar(0.5),
        quaternion,
        new THREE.Vector3(0.22, length, 0.18)
      )
    );
  }
  const railing_top_rails = makeInstanced(
    railing_top_railsGeom,
    light_woodMat,
    railing_top_matrices
  );
  root.add(railing_top_rails);

  const railing_bottom_railsGeom = new THREE.BoxGeometry(1, 1, 1);
  const railing_bottom_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle1 = i * segment_angle;
    const angle2 = (i + 1) * segment_angle;
    const start = radialPoint(angle1, post_radius, 0.54);
    const end = radialPoint(angle2, post_radius, 0.54);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    railing_bottom_matrices.push(
      new THREE.Matrix4().compose(
        start.clone().add(end).multiplyScalar(0.5),
        quaternion,
        new THREE.Vector3(0.16, length, 0.14)
      )
    );
  }
  const railing_bottom_rails = makeInstanced(
    railing_bottom_railsGeom,
    woodMat,
    railing_bottom_matrices
  );
  root.add(railing_bottom_rails);

  const railing_balustersGeom = new THREE.BoxGeometry(0.075, 1, 0.075);
  const railing_baluster_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle1 = i * segment_angle;
    const angle2 = (i + 1) * segment_angle;
    for (let j = 1; j <= 4; j++) {
      const t = j / 5;
      const angle = angle1 + (angle2 - angle1) * t;
      railing_baluster_matrices.push(
        new THREE.Matrix4().compose(
          radialPoint(angle, post_radius, 0.91),
          new THREE.Quaternion().setFromAxisAngle(up_axis, angle),
          new THREE.Vector3(1, 0.72, 1)
        )
      );
    }
  }
  const railing_balusters = makeInstanced(
    railing_balustersGeom,
    woodMat,
    railing_baluster_matrices
  );
  root.add(railing_balusters);

  const upper_headersGeom = new THREE.BoxGeometry(1, 1, 1);
  const upper_header_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle1 = i * segment_angle;
    const angle2 = (i + 1) * segment_angle;
    const start = radialPoint(angle1, post_radius, 3.36);
    const end = radialPoint(angle2, post_radius, 3.36);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    upper_header_matrices.push(
      new THREE.Matrix4().compose(
        start.clone().add(end).multiplyScalar(0.5),
        quaternion,
        new THREE.Vector3(0.29, length, 0.30)
      )
    );
  }
  const upper_headers = makeInstanced(
    upper_headersGeom,
    woodMat,
    upper_header_matrices
  );
  root.add(upper_headers);

  const arched_bracesGeom = new THREE.TorusGeometry(
    0.72,
    0.09,
    8,
    24,
    Math.PI
  );
  const arched_brace_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle1 = i * segment_angle;
    const angle2 = (i + 1) * segment_angle;
    const angle = (angle1 + angle2) * 0.5;
    const position = new THREE.Vector3(
      Math.sin(angle) * 1.48,
      2.55,
      Math.cos(angle) * 1.48
    );
    const quaternion = new THREE.Quaternion().setFromAxisAngle(up_axis, angle);
    arched_brace_matrices.push(
      new THREE.Matrix4().compose(position, quaternion, new THREE.Vector3(1, 1, 1))
    );
  }
  const arched_braces = makeInstanced(
    arched_bracesGeom,
    woodMat,
    arched_brace_matrices
  );
  root.add(arched_braces);

  const roof_panelsGeom = new THREE.CylinderGeometry(
    0.15,
    eave_radius,
    apex_y - eave_y,
    8,
    1,
    true
  );
  const roof_panels = new THREE.Mesh(roof_panelsGeom, roof_woodMat);
  roof_panels.position.y = (apex_y + eave_y) * 0.5;
  root.add(roof_panels);

  const roof_plank_stripsGeom = new THREE.BoxGeometry(1, 1, 1);
  const roof_strip_matrices = [];
  const roof_strip_count = 20;
  for (let i = 0; i < roof_strip_count; i++) {
    const angle = i / roof_strip_count * Math.PI * 2;
    const start = radialPoint(angle, 0.18, 5.10);
    const end = radialPoint(angle, 2.68, 3.67);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    roof_strip_matrices.push(
      new THREE.Matrix4().compose(
        start.clone().add(end).multiplyScalar(0.5),
        quaternion,
        new THREE.Vector3(0.145, length, 0.045)
      )
    );
  }
  const roof_plank_strips = makeInstanced(
    roof_plank_stripsGeom,
    light_woodMat,
    roof_strip_matrices
  );
  root.add(roof_plank_strips);

  const roof_ribsGeom = new THREE.BoxGeometry(1, 1, 1);
  const roof_rib_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle = i * segment_angle;
    const start = radialPoint(angle, 0.13, 5.14);
    const end = radialPoint(angle, 2.76, 3.66);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    roof_rib_matrices.push(
      new THREE.Matrix4().compose(
        start.clone().add(end).multiplyScalar(0.5),
        quaternion,
        new THREE.Vector3(0.13, length, 0.12)
      )
    );
  }
  const roof_ribs = makeInstanced(roof_ribsGeom, woodMat, roof_rib_matrices);
  root.add(roof_ribs);

  const eave_fasciaGeom = new THREE.BoxGeometry(1, 1, 1);
  const eave_fascia_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle1 = i * segment_angle;
    const angle2 = (i + 1) * segment_angle;
    const start = radialPoint(angle1, eave_radius, 3.50);
    const end = radialPoint(angle2, eave_radius, 3.50);
    const direction = end.clone().sub(start);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.clone().normalize()
    );
    eave_fascia_matrices.push(
      new THREE.Matrix4().compose(
        start.clone().add(end).multiplyScalar(0.5),
        quaternion,
        new THREE.Vector3(0.20, length, 0.20)
      )
    );
  }
  const eave_fascia = makeInstanced(
    eave_fasciaGeom,
    woodMat,
    eave_fascia_matrices
  );
  root.add(eave_fascia);

  const roof_capGeom = new THREE.ConeGeometry(0.43, 0.25, 8);
  const roof_cap = new THREE.Mesh(roof_capGeom, dark_woodMat);
  roof_cap.position.y = 5.20;
  root.add(roof_cap);

  const roof_finialGeom = new THREE.CylinderGeometry(0.055, 0.075, 0.20, 8);
  const roof_finial = new THREE.Mesh(roof_finialGeom, dark_woodMat);
  roof_finial.position.y = 5.38;
  root.add(roof_finial);

  const wood_knotsGeom = new THREE.CircleGeometry(0.055, 12);
  const wood_knot_matrices = [];
  for (let i = 0; i < post_count; i++) {
    const angle = i * segment_angle;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const quaternion = new THREE.Quaternion().setFromUnitVectors(forward_axis, normal);
    const knot_y = 0.95 + (i % 3) * 0.72;
    wood_knot_matrices.push(
      new THREE.Matrix4().compose(
        radialPoint(angle, post_radius + 0.161, knot_y),
        quaternion,
        new THREE.Vector3(1, 0.65, 1)
      )
    );
  }
  const wood_knots = makeInstanced(wood_knotsGeom, dark_woodMat, wood_knot_matrices);
  root.add(wood_knots);

  const climbing_vines = new THREE.Group();
  for (let i = 0; i < post_count; i++) {
    const base_angle = i * segment_angle;
    const vine_points = [];
    for (let j = 0; j <= 14; j++) {
      const t = j / 14;
      const angle = base_angle + Math.sin(t * Math.PI * 3 + i * 0.4) * 0.075;
      const radius = post_radius + 0.18 + Math.sin(t * Math.PI * 2 + i) * 0.025;
      vine_points.push(radialPoint(angle, radius, 0.38 + t * 3.25));
    }
    const vine_curve = new THREE.CatmullRomCurve3(
      vine_points,
      false,
      "centripetal"
    );
    const vine_strandGeom = new THREE.TubeGeometry(
      vine_curve,
      42,
      0.022,
      6,
      false
    );
    const vine_strand = new THREE.Mesh(vine_strandGeom, vineMat);
    climbing_vines.add(vine_strand);
  }

  const garland_points = [];
  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    const radius = post_radius + 0.18 + Math.sin(i * 1.7) * 0.025;
    const y = 3.22 + Math.sin(i * 1.35) * 0.10;
    garland_points.push(radialPoint(angle, radius, y));
  }
  const garland_curve = new THREE.CatmullRomCurve3(
    garland_points,
    true,
    "centripetal"
  );
  const upper_garlandGeom = new THREE.TubeGeometry(
    garland_curve,
    96,
    0.024,
    6,
    true
  );
  const upper_garland = new THREE.Mesh(upper_garlandGeom, vineMat);
  climbing_vines.add(upper_garland);
  root.add(climbing_vines);

  const rose_petalsShape = new THREE.Shape();
  rose_petalsShape.moveTo(0, 0);
  rose_petalsShape.bezierCurveTo(-0.42, 0.18, -0.48, 0.70, 0, 1);
  rose_petalsShape.bezierCurveTo(0.48, 0.70, 0.42, 0.18, 0, 0);
  const rose_petalsGeom = new THREE.ShapeGeometry(rose_petalsShape, 8);
  const rose_centersGeom = new THREE.CircleGeometry(1, 14);

  const pink_petal_matrices = [];
  const blush_petal_matrices = [];
  const ivory_petal_matrices = [];
  const rose_center_matrices = [];

  function addRose(position, normal, size, color_index, phase) {
    const normal_dir = normal.clone().normalize();
    const base_quaternion = new THREE.Quaternion().setFromUnitVectors(
      forward_axis,
      normal_dir
    );
    const flower_base = position.clone().addScaledVector(normal_dir, 0.012);
    const target = color_index === 0
      ? pink_petal_matrices
      : color_index === 1
        ? blush_petal_matrices
        : ivory_petal_matrices;

    for (let i = 0; i < 6; i++) {
      const angle = phase + i / 6 * Math.PI * 2;
      const spin = new THREE.Quaternion().setFromAxisAngle(forward_axis, angle);
      const quaternion = base_quaternion.clone().multiply(spin);
      target.push(
        new THREE.Matrix4().compose(
          flower_base,
          quaternion,
          new THREE.Vector3(size, size, 1)
        )
      );
    }

    for (let i = 0; i < 5; i++) {
      const angle = phase + 0.45 + i / 5 * Math.PI * 2;
      const spin = new THREE.Quaternion().setFromAxisAngle(forward_axis, angle);
      const quaternion = base_quaternion.clone().multiply(spin);
      const petal_position = flower_base.clone().addScaledVector(normal_dir, 0.004);
      target.push(
        new THREE.Matrix4().compose(
          petal_position,
          quaternion,
          new THREE.Vector3(size * 0.58, size * 0.58, 1)
        )
      );
    }

    rose_center_matrices.push(
      new THREE.Matrix4().compose(
        flower_base.clone().addScaledVector(normal_dir, 0.008),
        base_quaternion,
        new THREE.Vector3(size * 0.18, size * 0.18, 1)
      )
    );
  }

  for (let i = 0; i < post_count; i++) {
    const angle = i * segment_angle;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    for (let j = 0; j < 7; j++) {
      const side = j % 2 === 0 ? -1 : 1;
      const flower_angle = angle + side * (0.035 + (j % 3) * 0.012);
      const flower_normal = new THREE.Vector3(
        Math.sin(flower_angle),
        0,
        Math.cos(flower_angle)
      );
      const position = radialPoint(
        flower_angle,
        post_radius + 0.205,
        0.72 + j * 0.43 + (i % 2) * 0.08
      );
      addRose(
        position,
        flower_normal,
        0.145 + (j % 3) * 0.012,
        (i + j) % 3,
        j * 0.37
      );
    }
  }

  for (let i = 0; i < post_count; i++) {
    const angle = i * segment_angle + segment_angle * 0.18;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const position = radialPoint(
      angle,
      post_radius + 0.215,
      3.25 + (i % 2) * 0.08
    );
    addRose(position, normal, 0.16, i % 3, i * 0.31);
  }

  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2 + 0.12;
    const normal = new THREE.Vector3(
      Math.sin(angle) * 0.55,
      0.835,
      Math.cos(angle) * 0.55
    ).normalize();
    const position = radialPoint(angle, 2.22, 3.97);
    addRose(position, normal, 0.14, i % 3, i * 0.42);
  }

  const pink_rose_petals = makeInstanced(
    rose_petalsGeom,
    pink_roseMat,
    pink_petal_matrices
  );
  const blush_rose_petals = makeInstanced(
    rose_petalsGeom,
    blush_roseMat,
    blush_petal_matrices
  );
  const ivory_rose_petals = makeInstanced(
    rose_petalsGeom,
    ivory_roseMat,
    ivory_petal_matrices
  );
  const rose_centers = makeInstanced(
    rose_centersGeom,
    rose_centerMat,
    rose_center_matrices
  );
  root.add(
    pink_rose_petals,
    blush_rose_petals,
    ivory_rose_petals,
    rose_centers
  );

  const vine_leavesShape = new THREE.Shape();
  vine_leavesShape.moveTo(0, 0);
  vine_leavesShape.bezierCurveTo(-0.52, 0.22, -0.48, 0.72, 0, 1);
  vine_leavesShape.bezierCurveTo(0.48, 0.72, 0.52, 0.22, 0, 0);
  const vine_leavesGeom = new THREE.ShapeGeometry(vine_leavesShape, 6);
  const dark_leaf_matrices = [];
  const light_leaf_matrices = [];

  for (let i = 0; i < post_count; i++) {
    const base_angle = i * segment_angle;
    for (let j = 0; j < 16; j++) {
      const t = j / 15;
      const side = j % 2 === 0 ? -1 : 1;
      const angle =
        base_angle +
        side * (0.055 + (j % 3) * 0.012) +
        Math.sin(t * Math.PI * 3 + i * 0.4) * 0.035;
      const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
      const position = radialPoint(
        angle,
        post_radius + 0.205,
        0.48 + t * 3.08
      );
      const base_quaternion = new THREE.Quaternion().setFromUnitVectors(
        forward_axis,
        normal
      );
      const leaf_spin = new THREE.Quaternion().setFromAxisAngle(
        forward_axis,
        side * (0.72 + (j % 4) * 0.18)
      );
      const quaternion = base_quaternion.multiply(leaf_spin);
      const size = 0.105 + (j % 3) * 0.012;
      const matrix = new THREE.Matrix4().compose(
        position,
        quaternion,
        new THREE.Vector3(size * 0.72, size, 1)
      );
      if ((i + j) % 2 === 0) dark_leaf_matrices.push(matrix);
      else light_leaf_matrices.push(matrix);
    }
  }

  for (let i = 0; i < 32; i++) {
    const angle = i / 32 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    const side = i % 2 === 0 ? -1 : 1;
    const base_quaternion = new THREE.Quaternion().setFromUnitVectors(
      forward_axis,
      normal
    );
    const leaf_spin = new THREE.Quaternion().setFromAxisAngle(
      forward_axis,
      side * 1.05
    );
    const quaternion = base_quaternion.multiply(leaf_spin);
    const matrix = new THREE.Matrix4().compose(
      radialPoint(angle, post_radius + 0.205, 3.18 + Math.sin(i * 1.35) * 0.11),
      quaternion,
      new THREE.Vector3(0.075, 0.12, 1)
    );
    if (i % 2 === 0) dark_leaf_matrices.push(matrix);
    else light_leaf_matrices.push(matrix);
  }

  const dark_vine_leaves = makeInstanced(
    vine_leavesGeom,
    dark_leafMat,
    dark_leaf_matrices
  );
  const light_vine_leaves = makeInstanced(
    vine_leavesGeom,
    light_leafMat,
    light_leaf_matrices
  );
  root.add(dark_vine_leaves, light_vine_leaves);

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