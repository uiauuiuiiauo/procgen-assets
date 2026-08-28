export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "honey_jar_with_straw";

  const jar_group = new THREE.Group();
  jar_group.name = "jar_group";
  root.add(jar_group);

  const glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eeee,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const honey_mat = new THREE.MeshStandardMaterial({
    color: 0x8b3a12,
    metalness: 0.0,
    roughness: 0.3
  });

  const honey_dark_mat = new THREE.MeshStandardMaterial({
    color: 0x54200b,
    metalness: 0.0,
    roughness: 0.35
  });

  const label_mat = new THREE.MeshStandardMaterial({
    color: 0xf2eee3,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const ink_mat = new THREE.MeshStandardMaterial({
    color: 0x292622,
    metalness: 0.0,
    roughness: 0.8
  });

  const green_ink_mat = new THREE.MeshStandardMaterial({
    color: 0x596448,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide
  });

  const tan_ink_mat = new THREE.MeshStandardMaterial({
    color: 0xb08b62,
    metalness: 0.0,
    roughness: 0.85,
    side: THREE.DoubleSide
  });

  const chrome_mat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const highlight_mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28
  });

  const jar_body_profile = [
    new THREE.Vector2(0.00, 0.02),
    new THREE.Vector2(0.42, 0.02),
    new THREE.Vector2(0.50, 0.04),
    new THREE.Vector2(0.56, 0.10),
    new THREE.Vector2(0.59, 0.20),
    new THREE.Vector2(0.60, 0.36),
    new THREE.Vector2(0.60, 1.38),
    new THREE.Vector2(0.59, 1.49),
    new THREE.Vector2(0.56, 1.60),
    new THREE.Vector2(0.51, 1.70),
    new THREE.Vector2(0.50, 1.84),
    new THREE.Vector2(0.54, 1.88),
    new THREE.Vector2(0.54, 1.96),
    new THREE.Vector2(0.47, 1.96),
    new THREE.Vector2(0.46, 1.88),
    new THREE.Vector2(0.46, 1.76),
    new THREE.Vector2(0.49, 1.67),
    new THREE.Vector2(0.54, 1.57),
    new THREE.Vector2(0.56, 1.45),
    new THREE.Vector2(0.56, 0.25),
    new THREE.Vector2(0.54, 0.15),
    new THREE.Vector2(0.48, 0.10),
    new THREE.Vector2(0.00, 0.10)
  ];
  const jar_body_geom = new THREE.LatheGeometry(jar_body_profile, 64);
  const jar_body = new THREE.Mesh(jar_body_geom, glass_mat);
  jar_body.name = "jar_body";
  jar_group.add(jar_body);

  const honey_contents_profile = [
    new THREE.Vector2(0.00, 0.11),
    new THREE.Vector2(0.43, 0.11),
    new THREE.Vector2(0.50, 0.13),
    new THREE.Vector2(0.54, 0.18),
    new THREE.Vector2(0.56, 0.28),
    new THREE.Vector2(0.56, 1.38),
    new THREE.Vector2(0.55, 1.49),
    new THREE.Vector2(0.52, 1.59),
    new THREE.Vector2(0.48, 1.68),
    new THREE.Vector2(0.00, 1.68)
  ];
  const honey_contents_geom = new THREE.LatheGeometry(honey_contents_profile, 64);
  const honey_contents = new THREE.Mesh(honey_contents_geom, honey_mat);
  honey_contents.name = "honey_contents";
  jar_group.add(honey_contents);

  const honey_meniscus_geom = new THREE.CylinderGeometry(0.48, 0.48, 0.012, 64);
  const honey_meniscus = new THREE.Mesh(honey_meniscus_geom, honey_dark_mat);
  honey_meniscus.name = "honey_meniscus";
  honey_meniscus.position.y = 1.682;
  jar_group.add(honey_meniscus);

  const jar_base_geom = new THREE.CylinderGeometry(0.50, 0.50, 0.035, 64);
  const jar_base = new THREE.Mesh(jar_base_geom, glass_mat);
  jar_base.name = "jar_base";
  jar_base.position.y = 0.055;
  jar_group.add(jar_base);

  const jar_base_ring_geom = new THREE.TorusGeometry(0.49, 0.026, 12, 64);
  const jar_base_ring = new THREE.Mesh(jar_base_ring_geom, glass_mat);
  jar_base_ring.name = "jar_base_ring";
  jar_base_ring.rotation.x = Math.PI / 2;
  jar_base_ring.position.y = 0.065;
  jar_group.add(jar_base_ring);

  const jar_bottom_band_geom = new THREE.TorusGeometry(0.485, 0.014, 10, 64);
  const jar_bottom_band = new THREE.Mesh(jar_bottom_band_geom, honey_dark_mat);
  jar_bottom_band.name = "jar_bottom_band";
  jar_bottom_band.rotation.x = Math.PI / 2;
  jar_bottom_band.position.y = 0.045;
  jar_group.add(jar_bottom_band);

  const jar_neck_geom = new THREE.CylinderGeometry(0.515, 0.505, 0.25, 64, 1, true);
  const jar_neck = new THREE.Mesh(jar_neck_geom, glass_mat);
  jar_neck.name = "jar_neck";
  jar_neck.position.y = 1.82;
  jar_group.add(jar_neck);

  const jar_thread_lower_geom = new THREE.TorusGeometry(0.515, 0.030, 12, 64);
  const jar_thread_lower = new THREE.Mesh(jar_thread_lower_geom, glass_mat);
  jar_thread_lower.name = "jar_thread_lower";
  jar_thread_lower.rotation.x = Math.PI / 2;
  jar_thread_lower.position.y = 1.72;
  jar_group.add(jar_thread_lower);

  const jar_thread_middle_geom = new THREE.TorusGeometry(0.525, 0.026, 12, 64);
  const jar_thread_middle = new THREE.Mesh(jar_thread_middle_geom, glass_mat);
  jar_thread_middle.name = "jar_thread_middle";
  jar_thread_middle.rotation.x = Math.PI / 2;
  jar_thread_middle.position.y = 1.82;
  jar_group.add(jar_thread_middle);

  const jar_thread_upper_geom = new THREE.TorusGeometry(0.520, 0.022, 12, 64);
  const jar_thread_upper = new THREE.Mesh(jar_thread_upper_geom, glass_mat);
  jar_thread_upper.name = "jar_thread_upper";
  jar_thread_upper.rotation.x = Math.PI / 2;
  jar_thread_upper.position.y = 1.90;
  jar_group.add(jar_thread_upper);

  const jar_mouth_rim_geom = new THREE.TorusGeometry(0.505, 0.035, 14, 64);
  const jar_mouth_rim = new THREE.Mesh(jar_mouth_rim_geom, glass_mat);
  jar_mouth_rim.name = "jar_mouth_rim";
  jar_mouth_rim.rotation.x = Math.PI / 2;
  jar_mouth_rim.position.y = 1.965;
  jar_group.add(jar_mouth_rim);

  const jar_mouth_inner_geom = new THREE.TorusGeometry(0.455, 0.014, 10, 64);
  const jar_mouth_inner = new THREE.Mesh(jar_mouth_inner_geom, glass_mat);
  jar_mouth_inner.name = "jar_mouth_inner";
  jar_mouth_inner.rotation.x = Math.PI / 2;
  jar_mouth_inner.position.y = 1.958;
  jar_group.add(jar_mouth_inner);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  jar_group.add(label_group);

  const label_radius = 0.608;
  const label_half_angle = 0.98;
  const label_height = 0.92;
  const front_label_geom = new THREE.CylinderGeometry(
    label_radius,
    label_radius,
    label_height,
    48,
    1,
    true,
    -label_half_angle,
    label_half_angle * 2
  );
  const front_label = new THREE.Mesh(front_label_geom, label_mat);
  front_label.name = "front_label";
  front_label.position.y = 0.91;
  label_group.add(front_label);

  const label_arc_points = [];
  for (let i = 0; i <= 16; i++) {
    const angle = -0.94 + 1.88 * i / 16;
    label_arc_points.push(new THREE.Vector3(
      Math.sin(angle) * 0.614,
      0,
      Math.cos(angle) * 0.614
    ));
  }
  const label_arc_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(label_arc_points),
    32,
    0.004,
    6,
    false
  );

  const label_top_border = new THREE.Mesh(label_arc_geom, tan_ink_mat);
  label_top_border.name = "label_top_border";
  label_top_border.position.y = 1.365;
  label_group.add(label_top_border);

  const label_bottom_border = new THREE.Mesh(label_arc_geom, tan_ink_mat);
  label_bottom_border.name = "label_bottom_border";
  label_bottom_border.position.y = 0.455;
  label_group.add(label_bottom_border);

  const label_side_geom = new THREE.CylinderGeometry(0.004, 0.004, 0.90, 8);
  const label_left_border = new THREE.Mesh(label_side_geom, tan_ink_mat);
  label_left_border.name = "label_left_border";
  const left_border_angle = -0.94;
  label_left_border.position.set(
    Math.sin(left_border_angle) * 0.614,
    0.91,
    Math.cos(left_border_angle) * 0.614
  );
  label_group.add(label_left_border);

  const label_right_border = new THREE.Mesh(label_side_geom, tan_ink_mat);
  label_right_border.name = "label_right_border";
  const right_border_angle = 0.94;
  label_right_border.position.set(
    Math.sin(right_border_angle) * 0.614,
    0.91,
    Math.cos(right_border_angle) * 0.614
  );
  label_group.add(label_right_border);

  const glyph_paths = {
    A: [[0, 0, 0.5, 1], [0.5, 1, 1, 0], [0.22, 0.43, 0.78, 0.43]],
    B: [[0, 0, 0, 1], [0, 1, 0.68, 1], [0.68, 1, 0.88, 0.78], [0.88, 0.78, 0.68, 0.53], [0.68, 0.53, 0, 0.53], [0.68, 0.53, 0.9, 0.27], [0.9, 0.27, 0.68, 0], [0.68, 0, 0, 0]],
    D: [[0, 0, 0, 1], [0, 1, 0.62, 1], [0.62, 1, 0.9, 0.72], [0.9, 0.72, 0.9, 0.28], [0.9, 0.28, 0.62, 0], [0.62, 0, 0, 0]],
    E: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.52, 0.78, 0.52], [0, 0, 1, 0]],
    H: [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0.5, 1, 0.5]],
    M: [[0, 0, 0, 1], [0, 1, 0.5, 0.48], [0.5, 0.48, 1, 1], [1, 1, 1, 0]],
    N: [[0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]],
    O: [[0.18, 0, 0.82, 0], [0.82, 0, 1, 0.22], [1, 0.22, 1, 0.78], [1, 0.78, 0.82, 1], [0.82, 1, 0.18, 1], [0.18, 1, 0, 0.78], [0, 0.78, 0, 0.22], [0, 0.22, 0.18, 0]],
    P: [[0, 0, 0, 1], [0, 1, 0.7, 1], [0.7, 1, 0.92, 0.76], [0.92, 0.76, 0.7, 0.52], [0.7, 0.52, 0, 0.52]],
    R: [[0, 0, 0, 1], [0, 1, 0.7, 1], [0.7, 1, 0.92, 0.76], [0.92, 0.76, 0.7, 0.52], [0.7, 0.52, 0, 0.52], [0.48, 0.52, 1, 0]],
    S: [[0.92, 0.88, 0.72, 1], [0.72, 1, 0.2, 1], [0.2, 1, 0, 0.78], [0, 0.78, 0.2, 0.55], [0.2, 0.55, 0.78, 0.45], [0.78, 0.45, 1, 0.22], [1, 0.22, 0.78, 0], [0.78, 0, 0.18, 0], [0.18, 0, 0, 0.12]],
    T: [[0, 1, 1, 1], [0.5, 1, 0.5, 0]],
    U: [[0, 1, 0, 0.22], [0, 0.22, 0.22, 0], [0.22, 0, 0.78, 0], [0.78, 0, 1, 0.22], [1, 0.22, 1, 1]]
  };

  function build_surface_text(text, center_y, char_height, total_width, thickness, material, radial_distance) {
    const chars = text.split("");
    const weights = {};
    let total_weight = 0;
    let segment_count = 0;

    for (const character of chars) {
      const weight = character === " " ? 0.55 : (glyph_weights[character] || 0.85);
      weights[character] = weight;
      total_weight += weight;
      if (glyph_paths[character]) segment_count += glyph_paths[character].length;
    }

    const positions = [];
    const indices = [];
    const cell_width = total_width / total_weight;
    let cursor = -total_width / 2;

    function append_glyph(character, x_offset) {
      const paths = glyph_paths[character];
      if (!paths) return;
      const glyph_width = cell_width * weights[character] * 0.74;

      for (const path of paths) {
        const x1 = x_offset + path[0] * glyph_width;
        const y1 = center_y + (path[1] - 0.5) * char_height;
        const x2 = x_offset + path[2] * glyph_width;
        const y2 = center_y + (path[3] - 0.5) * char_height;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;
        const px = -dy / length * thickness * 0.5;
        const py = dx / length * thickness * 0.5;
        const corners = [
          [x1 + px, y1 + py],
          [x1 - px, y1 - py],
          [x2 - px, y2 - py],
          [x2 + px, y2 + py]
        ];
        const base = positions.length / 3;

        for (const corner of corners) {
          const angle = corner[0] / label_radius;
          positions.push(
            Math.sin(angle) * radial_distance,
            corner[1],
            Math.cos(angle) * radial_distance
          );
        }

        indices.push(
          base, base + 1, base + 2,
          base, base + 2, base + 3
        );
      }
    }

    for (const character of chars) {
      append_glyph(character, cursor + cell_width * weights[character] * 0.5);
      cursor += cell_width * weights[character];
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return new THREE.Mesh(geometry, material);
  }

  const glyph_weights = {
    K: 0.95,
    O: 0.90,
    M: 1.05,
    N: 0.95,
    I: 0.42,
    P: 0.90,
    A: 0.92,
    T: 0.82,
    H: 0.95
  };

  const label_brand_text = build_surface_text(
    "KONNIPATTHA",
    1.075,
    0.17,
    0.84,
    0.007,
    ink_mat,
    0.619
  );
  label_brand_text.name = "label_brand_text";
  label_group.add(label_brand_text);

  const label_subtitle_text = build_surface_text(
    "NOMEAEEE",
    0.815,
    0.065,
    0.38,
    0.004,
    ink_mat,
    0.619
  );
  label_subtitle_text.name = "label_subtitle_text";
  label_group.add(label_subtitle_text);

  const label_product_type_text = build_surface_text(
    "NCTHA",
    0.705,
    0.068,
    0.29,
    0.004,
    ink_mat,
    0.619
  );
  label_product_type_text.name = "label_product_type_text";
  label_group.add(label_product_type_text);

  const label_origin_text = build_surface_text(
    "PURE",
    0.600,
    0.068,
    0.20,
    0.004,
    ink_mat,
    0.619
  );
  label_origin_text.name = "label_origin_text";
  label_group.add(label_origin_text);

  const label_footer_text = build_surface_text(
    "BROEHERS",
    0.495,
    0.062,
    0.42,
    0.004,
    ink_mat,
    0.619
  );
  label_footer_text.name = "label_footer_text";
  label_group.add(label_footer_text);

  function surface_point(angle, y, radial_distance) {
    return new THREE.Vector3(
      Math.sin(angle) * radial_distance,
      y,
      Math.cos(angle) * radial_distance
    );
  }

  function create_surface_tube(local_points, radius, material, radial_distance) {
    const points = [];
    for (const point of local_points) {
      points.push(surface_point(point[0] / label_radius, point[1], radial_distance));
    }
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(6, (points.length - 1) * 8),
      radius,
      6,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  const label_brand_flourish = create_surface_tube([
    [-0.43, 1.015],
    [-0.35, 0.995],
    [-0.25, 1.010],
    [-0.14, 0.995],
    [-0.03, 1.005]
  ], 0.004, ink_mat, 0.620);
  label_brand_flourish.name = "label_brand_flourish";
  label_group.add(label_brand_flourish);

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(-0.055, 0);
  leaf_shape.bezierCurveTo(-0.025, 0.028, 0.028, 0.028, 0.055, 0);
  leaf_shape.bezierCurveTo(0.028, -0.028, -0.025, -0.028, -0.055, 0);
  const leaf_geom = new THREE.ShapeGeometry(leaf_shape);

  function place_flat_mesh(mesh, angle, y, radial_distance, rotation) {
    mesh.position.copy(surface_point(angle, y, radial_distance));
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    mesh.rotateZ(rotation);
  }

  const label_center_leaf_left = new THREE.Mesh(leaf_geom, green_ink_mat);
  label_center_leaf_left.name = "label_center_leaf_left";
  place_flat_mesh(label_center_leaf_left, -0.045, 0.925, 0.621, 0.45);
  label_group.add(label_center_leaf_left);

  const label_center_leaf_right = new THREE.Mesh(leaf_geom, ink_mat);
  label_center_leaf_right.name = "label_center_leaf_right";
  label_center_leaf_right.scale.set(0.85, 0.85, 1);
  place_flat_mesh(label_center_leaf_right, 0.050, 0.925, 0.621, -0.45);
  label_group.add(label_center_leaf_right);

  const label_botanical_stem = create_surface_tube([
    [-0.085, 1.205],
    [-0.060, 1.275],
    [-0.020, 1.350]
  ], 0.003, ink_mat, 0.620);
  label_botanical_stem.name = "label_botanical_stem";
  label_group.add(label_botanical_stem);

  const label_botanical_leaves = new THREE.InstancedMesh(leaf_geom, ink_mat, 5);
  label_botanical_leaves.name = "label_botanical_leaves";
  const botanical_leaf_data = [
    [-0.068, 1.235, 0.72],
    [-0.035, 1.255, -0.72],
    [-0.052, 1.292, 0.82],
    [-0.010, 1.315, -0.72],
    [-0.020, 1.345, 0.20]
  ];
  const botanical_dummy = new THREE.Object3D();
  for (let i = 0; i < botanical_leaf_data.length; i++) {
    const data = botanical_leaf_data[i];
    const angle = data[0] / label_radius;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
    botanical_dummy.position.copy(surface_point(data[0], data[1], 0.621));
    botanical_dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    botanical_dummy.rotateZ(data[2]);
    botanical_dummy.scale.set(0.58, 0.58, 1);
    botanical_dummy.updateMatrix();
    label_botanical_leaves.setMatrixAt(i, botanical_dummy.matrix);
  }
  label_botanical_leaves.instanceMatrix.needsUpdate = true;
  label_group.add(label_botanical_leaves);

  const label_left_grass_stem = create_surface_tube([
    [-0.485, 0.475],
    [-0.475, 0.570],
    [-0.450, 0.680]
  ], 0.003, green_ink_mat, 0.620);
  label_left_grass_stem.name = "label_left_grass_stem";
  label_group.add(label_left_grass_stem);

  const label_left_grass_stem_two = create_surface_tube([
    [-0.455, 0.475],
    [-0.425, 0.565],
    [-0.405, 0.640]
  ], 0.0025, green_ink_mat, 0.620);
  label_left_grass_stem_two.name = "label_left_grass_stem_two";
  label_group.add(label_left_grass_stem_two);

  const label_right_grass_stem = create_surface_tube([
    [0.485, 0.475],
    [0.472, 0.585],
    [0.445, 0.710]
  ], 0.003, green_ink_mat, 0.620);
  label_right_grass_stem.name = "label_right_grass_stem";
  label_group.add(label_right_grass_stem);

  const label_right_grass_stem_two = create_surface_tube([
    [0.455, 0.475],
    [0.430, 0.560],
    [0.405, 0.650]
  ], 0.0025, green_ink_mat, 0.620);
  label_right_grass_stem_two.name = "label_right_grass_stem_two";
  label_group.add(label_right_grass_stem_two);

  const label_grass_leaves = new THREE.InstancedMesh(leaf_geom, green_ink_mat, 10);
  label_grass_leaves.name = "label_grass_leaves";
  const grass_leaf_data = [
    [-0.478, 0.515, 0.85],
    [-0.455, 0.545, -0.75],
    [-0.445, 0.585, 0.80],
    [-0.420, 0.610, -0.70],
    [-0.470, 0.635, 0.55],
    [0.478, 0.520, -0.85],
    [0.455, 0.555, 0.75],
    [0.445, 0.595, -0.80],
    [0.420, 0.625, 0.70],
    [0.468, 0.660, -0.55]
  ];
  const grass_dummy = new THREE.Object3D();
  for (let i = 0; i < grass_leaf_data.length; i++) {
    const data = grass_leaf_data[i];
    const angle = data[0] / label_radius;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
    grass_dummy.position.copy(surface_point(data[0], data[1], 0.621));
    grass_dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    grass_dummy.rotateZ(data[2]);
    grass_dummy.scale.set(0.48, 0.48, 1);
    grass_dummy.updateMatrix();
    label_grass_leaves.setMatrixAt(i, grass_dummy.matrix);
  }
  label_grass_leaves.instanceMatrix.needsUpdate = true;
  label_group.add(label_grass_leaves);

  const flower_geom = new THREE.CircleGeometry(0.012, 12);
  const label_flower_marks = new THREE.InstancedMesh(flower_geom, tan_ink_mat, 8);
  label_flower_marks.name = "label_flower_marks";
  const flower_data = [
    [-0.445, 0.685],
    [-0.425, 0.655],
    [-0.408, 0.635],
    [-0.465, 0.610],
    [0.445, 0.710],
    [0.425, 0.680],
    [0.408, 0.650],
    [0.465, 0.635]
  ];
  const flower_dummy = new THREE.Object3D();
  for (let i = 0; i < flower_data.length; i++) {
    const angle = flower_data[i][0] / label_radius;
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).normalize();
    flower_dummy.position.copy(surface_point(
      flower_data[i][0],
      flower_data[i][1],
      0.622
    ));
    flower_dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    flower_dummy.scale.set(0.75, 1.1, 1);
    flower_dummy.updateMatrix();
    label_flower_marks.setMatrixAt(i, flower_dummy.matrix);
  }
  label_flower_marks.instanceMatrix.needsUpdate = true;
  label_group.add(label_flower_marks);

  const glass_highlight_points = [
    new THREE.Vector3(-0.31, 0.18, 0.51),
    new THREE.Vector3(-0.35, 0.42, 0.49),
    new THREE.Vector3(-0.35, 1.20, 0.49),
    new THREE.Vector3(-0.32, 1.48, 0.48),
    new THREE.Vector3(-0.26, 1.68, 0.43)
  ];
  const glass_highlight_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(glass_highlight_points),
    32,
    0.009,
    6,
    false
  );
  const glass_highlight = new THREE.Mesh(glass_highlight_geom, highlight_mat);
  glass_highlight.name = "glass_highlight";
  jar_group.add(glass_highlight);

  const straw_start = new THREE.Vector3(0.10, 1.52, 0.05);
  const straw_joint = new THREE.Vector3(0.52, 2.35, 0.02);
  const straw_end = new THREE.Vector3(1.18, 3.40, -0.02);
  const straw_axis = new THREE.Vector3(0, 1, 0);

  function orient_between(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(straw_axis, direction.normalize());
  }

  const straw_lower_length = straw_start.distanceTo(straw_joint);
  const straw_lower_geom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    straw_lower_length,
    24
  );
  const straw_lower = new THREE.Mesh(straw_lower_geom, chrome_mat);
  straw_lower.name = "straw_lower";
  orient_between(straw_lower, straw_start, straw_joint);
  root.add(straw_lower);

  const straw_upper_length = straw_joint.distanceTo(straw_end);
  const straw_upper_geom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    straw_upper_length,
    24
  );
  const straw_upper = new THREE.Mesh(straw_upper_geom, chrome_mat);
  straw_upper.name = "straw_upper";
  orient_between(straw_upper, straw_joint, straw_end);
  root.add(straw_upper);

  const straw_direction = new THREE.Vector3()
    .subVectors(straw_end, straw_start)
    .normalize();
  const straw_ring_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    straw_direction
  );

  const straw_coupler_rings_geom = new THREE.TorusGeometry(0.052, 0.006, 8, 32);
  const straw_coupler_rings = new THREE.InstancedMesh(
    straw_coupler_rings_geom,
    brushed_metal_mat,
    2
  );
  straw_coupler_rings.name = "straw_coupler_rings";
  const coupler_dummy = new THREE.Object3D();
  const coupler_offsets = [-0.045, 0.045];
  for (let i = 0; i < coupler_offsets.length; i++) {
    coupler_dummy.position.copy(straw_joint).add(
      straw_direction.clone().multiplyScalar(coupler_offsets[i])
    );
    coupler_dummy.quaternion.copy(straw_ring_quaternion);
    coupler_dummy.scale.set(1, 1, 1);
    coupler_dummy.updateMatrix();
    straw_coupler_rings.setMatrixAt(i, coupler_dummy.matrix);
  }
  straw_coupler_rings.instanceMatrix.needsUpdate = true;
  root.add(straw_coupler_rings);

  const straw_top_cap_geom = new THREE.CylinderGeometry(0.054, 0.054, 0.014, 24);
  const straw_top_cap = new THREE.Mesh(straw_top_cap_geom, chrome_mat);
  straw_top_cap.name = "straw_top_cap";
  straw_top_cap.position.copy(straw_end).add(straw_direction.clone().multiplyScalar(0.006));
  straw_top_cap.quaternion.setFromUnitVectors(straw_axis, straw_direction);
  root.add(straw_top_cap);

  const straw_highlight_start = straw_start.clone().add(new THREE.Vector3(-0.014, 0, 0.038));
  const straw_highlight_joint = straw_joint.clone().add(new THREE.Vector3(-0.014, 0, 0.038));
  const straw_highlight_end = straw_end.clone().add(new THREE.Vector3(-0.014, 0, 0.038));
  const straw_highlight_lower_length = straw_highlight_start.distanceTo(straw_highlight_joint);
  const straw_highlight_lower_geom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    straw_highlight_lower_length,
    8
  );
  const straw_highlight_lower = new THREE.Mesh(straw_highlight_lower_geom, highlight_mat);
  straw_highlight_lower.name = "straw_highlight_lower";
  orient_between(straw_highlight_lower, straw_highlight_start, straw_highlight_joint);
  root.add(straw_highlight_lower);

  const straw_highlight_upper_length = straw_highlight_joint.distanceTo(straw_highlight_end);
  const straw_highlight_upper_geom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    straw_highlight_upper_length,
    8
  );
  const straw_highlight_upper = new THREE.Mesh(straw_highlight_upper_geom, highlight_mat);
  straw_highlight_upper.name = "straw_highlight_upper";
  orient_between(straw_highlight_upper, straw_highlight_joint, straw_highlight_end);
  root.add(straw_highlight_upper);

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