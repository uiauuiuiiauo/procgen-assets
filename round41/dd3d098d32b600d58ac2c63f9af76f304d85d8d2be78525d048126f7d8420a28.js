export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "banana_bunch";

  const banana_skin_mat = new THREE.MeshStandardMaterial({
    color: 0xf3e47f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const banana_green_mat = new THREE.MeshStandardMaterial({
    color: 0xb7c957,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const banana_green_core_mat = new THREE.MeshStandardMaterial({
    color: 0xb7c957,
    metalness: 0.0,
    roughness: 0.7,
  });
  const dried_stem_mat = new THREE.MeshStandardMaterial({
    color: 0x8a6041,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const dry_fiber_mat = new THREE.MeshStandardMaterial({
    color: 0xb58b62,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const dark_tip_mat = new THREE.MeshStandardMaterial({
    color: 0x30231e,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const banana_bruise_mat = new THREE.MeshStandardMaterial({
    color: 0x623916,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const banana_speck_mat = new THREE.MeshStandardMaterial({
    color: 0x392719,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function create_banana_geometry(curve, radius_fn, length_segments, radial_segments) {
    const positions = [];
    const indices = [];
    const front = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i <= length_segments; i++) {
      const t = i / length_segments;
      const center = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = new THREE.Vector3().crossVectors(front, tangent);

      if (side.lengthSq() < 0.000001) side.set(1, 0, 0);
      side.normalize();

      const depth = new THREE.Vector3().crossVectors(tangent, side).normalize();
      const radius = radius_fn(t);

      for (let j = 0; j < radial_segments; j++) {
        const angle = j / radial_segments * Math.PI * 2;
        const ridge = 1 + 0.018 * Math.cos(angle * 5 + Math.sin(t * Math.PI) * 0.35);
        const side_radius = radius * ridge;
        const depth_radius = radius * 0.92 * ridge;
        const cos_angle = Math.cos(angle);
        const sin_angle = Math.sin(angle);

        positions.push(
          center.x + side.x * side_radius * cos_angle + depth.x * depth_radius * sin_angle,
          center.y + side.y * side_radius * cos_angle + depth.y * depth_radius * sin_angle,
          center.z + side.z * side_radius * cos_angle + depth.z * depth_radius * sin_angle
        );
      }
    }

    for (let i = 0; i < length_segments; i++) {
      for (let j = 0; j < radial_segments; j++) {
        const next_j = (j + 1) % radial_segments;
        const a = i * radial_segments + j;
        const b = (i + 1) * radial_segments + j;
        const c = (i + 1) * radial_segments + next_j;
        const d = i * radial_segments + next_j;
        indices.push(a, d, b, b, d, c);
      }
    }

    const start_center = curve.getPoint(0);
    const start_center_index = positions.length / 3;
    positions.push(start_center.x, start_center.y, start_center.z);
    for (let j = 0; j < radial_segments; j++) {
      indices.push(start_center_index, (j + 1) % radial_segments, j);
    }

    const end_center = curve.getPoint(1);
    const end_center_index = positions.length / 3;
    positions.push(end_center.x, end_center.y, end_center.z);
    const end_ring = length_segments * radial_segments;
    for (let j = 0; j < radial_segments; j++) {
      indices.push(
        end_center_index,
        end_ring + j,
        end_ring + (j + 1) % radial_segments
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function create_ribbon_geometry(points, widths) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < points.length; i++) {
      const previous = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const tangent = new THREE.Vector3().subVectors(next, previous).normalize();
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0);

      if (normal.lengthSq() < 0.000001) normal.set(0, 1, 0);
      normal.normalize();

      const half_width = widths[i] * 0.5;
      positions.push(
        points[i].x + normal.x * half_width,
        points[i].y + normal.y * half_width,
        points[i].z,
        points[i].x - normal.x * half_width,
        points[i].y - normal.y * half_width,
        points[i].z
      );
    }

    for (let i = 0; i < points.length - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_stem_geometry() {
    const positions = [
      -0.070, -0.035,  0.000,
       0.070, -0.035,  0.000,
      -0.095,  0.008,  0.004,
       0.092,  0.012, -0.004,
      -0.075,  0.065, -0.006,
       0.072,  0.070,  0.006,
       0.010,  0.105,  0.000,
    ];
    const indices = [
      0, 1, 2, 1, 3, 2,
      2, 3, 4, 3, 5, 4,
      4, 5, 6,
      0, 2, 4,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_crown_geometry() {
    const positions = [
      -0.078, -0.040,  0.000,
       0.076, -0.040,  0.000,
      -0.108,  0.005,  0.004,
       0.105,  0.010, -0.003,
      -0.086,  0.060, -0.006,
       0.080,  0.068,  0.007,
      -0.030,  0.108,  0.004,
       0.038,  0.116, -0.004,
       0.004,  0.145,  0.000,
    ];
    const indices = [
      0, 1, 2, 1, 3, 2,
      2, 3, 4, 3, 5, 4,
      4, 5, 6, 5, 7, 6,
      6, 7, 8,
      0, 2, 4,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_bud_geometry() {
    const positions = [
      -0.042, -0.026,  0.000,
       0.042, -0.026,  0.000,
      -0.058,  0.003,  0.003,
       0.056,  0.006, -0.003,
      -0.038,  0.040, -0.003,
       0.035,  0.043,  0.004,
       0.002,  0.060,  0.000,
    ];
    const indices = [
      0, 1, 2, 1, 3, 2,
      2, 3, 4, 3, 5, 4,
      4, 5, 6,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_cap_geometry(radius, height, radial_segments) {
    const positions = [0, height, 0];
    const indices = [];

    for (let i = 0; i < radial_segments; i++) {
      const angle = i / radial_segments * Math.PI * 2;
      const edge_radius = radius * (0.88 + 0.12 * Math.sin(i * 2.17));
      positions.push(
        Math.cos(angle) * edge_radius,
        height * (0.55 + 0.20 * Math.sin(i * 1.73) + 0.12 * Math.cos(i * 2.41)),
        Math.sin(angle) * edge_radius * 0.82
      );
    }

    for (let i = 0; i < radial_segments; i++) {
      const angle = i / radial_segments * Math.PI * 2;
      const edge_radius = radius * (0.92 + 0.08 * Math.cos(i * 1.91));
      positions.push(
        Math.cos(angle) * edge_radius,
        height * 0.22 * Math.sin(i * 2.09),
        Math.sin(angle) * edge_radius * 0.82
      );
    }

    for (let i = 0; i < radial_segments; i++) {
      const next = (i + 1) % radial_segments;
      const top_a = 1 + i;
      const top_b = 1 + next;
      const bottom_a = 1 + radial_segments + i;
      const bottom_b = 1 + radial_segments + next;
      indices.push(0, top_b, top_a);
      indices.push(top_a, top_b, bottom_a);
      indices.push(top_b, bottom_b, bottom_a);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_collar_geometry(radius, height, radial_segments) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < radial_segments; i++) {
      const angle = i / radial_segments * Math.PI * 2;
      const lower_radius = radius * (0.94 + 0.06 * Math.sin(i * 1.83));
      const upper_radius = radius * (0.82 + 0.10 * Math.cos(i * 2.11));
      positions.push(
        Math.cos(angle) * lower_radius,
        0,
        Math.sin(angle) * lower_radius * 0.82
      );
      positions.push(
        Math.cos(angle) * upper_radius,
        height * (0.78 + 0.18 * Math.sin(i * 1.47)),
        Math.sin(angle) * upper_radius * 0.82
      );
    }

    for (let i = 0; i < radial_segments; i++) {
      const next = (i + 1) % radial_segments;
      const lower_a = i * 2;
      const upper_a = lower_a + 1;
      const lower_b = next * 2;
      const upper_b = lower_b + 1;
      indices.push(lower_a, lower_b, upper_a);
      indices.push(lower_b, upper_b, upper_a);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_flap_geometry(width, height, depth) {
    const positions = [
      -width * 0.50, 0,            depth * 0.05,
       width * 0.50, 0,            depth * 0.00,
      -width * 0.36, height * 0.55, depth * 0.55,
       width * 0.34, height * 0.62, depth * 0.48,
      -width * 0.08, height,        depth * 0.18,
       width * 0.12, height * 0.92, depth * 0.12,
      -width * 0.12, height * 0.42, -depth * 0.15,
       width * 0.16, height * 0.46, -depth * 0.12,
    ];
    const indices = [
      0, 1, 2, 1, 3, 2,
      2, 3, 4, 3, 5, 4,
      4, 5, 6, 5, 7, 6,
      0, 2, 6,
      1, 7, 3,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_sheath_geometry(length, radius_start, radius_end) {
    const positions = [];
    const indices = [];
    const ring_count = 5;
    const radial_segments = 9;

    for (let ring = 0; ring < ring_count; ring++) {
      const t = ring / (ring_count - 1);
      const y = t * length;
      const base_radius = radius_start + (radius_end - radius_start) * t;

      for (let i = 0; i < radial_segments; i++) {
        const angle = i / radial_segments * Math.PI * 2;
        const irregularity =
          1 +
          0.13 * Math.sin(i * 2.23 + ring * 1.31) +
          0.06 * Math.cos(i * 3.07 - ring * 0.82);
        const radius = base_radius * irregularity;
        positions.push(
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius * 0.84
        );
      }
    }

    for (let ring = 0; ring < ring_count - 1; ring++) {
      for (let i = 0; i < radial_segments; i++) {
        const next = (i + 1) % radial_segments;
        const a = ring * radial_segments + i;
        const b = ring * radial_segments + next;
        const c = (ring + 1) * radial_segments + next;
        const d = (ring + 1) * radial_segments + i;
        indices.push(a, b, d, b, c, d);
      }
    }

    const bottom_center = positions.length / 3;
    positions.push(0, 0, 0);
    for (let i = 0; i < radial_segments; i++) {
      indices.push(bottom_center, (i + 1) % radial_segments, i);
    }

    const top_center = positions.length / 3;
    positions.push(0, length, 0);
    const top_ring = (ring_count - 1) * radial_segments;
    for (let i = 0; i < radial_segments; i++) {
      indices.push(top_center, top_ring + i, top_ring + (i + 1) % radial_segments);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_sheath_flap_geometry(length, width, depth) {
    const positions = [
      -width * 0.42, 0,            depth * 0.05,
       width * 0.42, 0,            depth * 0.00,
      -width * 0.50, length * 0.42, depth * 0.48,
       width * 0.48, length * 0.46, depth * 0.40,
      -width * 0.20, length,        depth * 0.16,
       width * 0.25, length * 0.94, depth * 0.10,
    ];
    const indices = [
      0, 1, 2, 1, 3, 2,
      2, 3, 4, 3, 5, 4,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_fringe_geometry(width, height) {
    const positions = [
      -width * 0.50, 0, 0,
      -width * 0.18, 0, 0,
      -width * 0.34, height, 0,
      width * 0.02, 0, 0,
      width * 0.34, 0, 0,
      width * 0.20, height * 0.82, 0,
    ];
    const indices = [
      0, 1, 2,
      3, 4, 5,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function create_dried_vein_curve(points, radius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(curve, 8, radius, 5, false);
  }

  function create_dried_stem_detail(cap_radius, height, stem_name) {
    const detail_group = new THREE.Group();
    detail_group.name = stem_name + "_dried_detail";

    const sheath_geom = create_dried_sheath_geometry(
      height * 0.92,
      cap_radius * 0.96,
      cap_radius * 0.76
    );
    const sheath = new THREE.Mesh(sheath_geom, dry_fiber_mat);
    sheath.name = stem_name + "_bark_sheath";
    sheath.position.y = -height * 0.08;
    detail_group.add(sheath);

    const front_flap_geom = create_dried_sheath_flap_geometry(
      height * 0.88,
      cap_radius * 1.55,
      cap_radius * 0.28
    );
    const front_flap = new THREE.Mesh(front_flap_geom, dry_fiber_mat);
    front_flap.name = stem_name + "_front_bark_flap";
    front_flap.position.set(
      -cap_radius * 0.05,
      -height * 0.04,
      cap_radius * 0.72
    );
    front_flap.rotation.z = -0.08;
    detail_group.add(front_flap);

    const side_flap_geom = create_dried_flap_geometry(
      cap_radius * 1.18,
      height * 0.72,
      cap_radius * 0.22
    );
    const side_flap = new THREE.Mesh(side_flap_geom, dry_fiber_mat);
    side_flap.name = stem_name + "_side_bark_flap";
    side_flap.position.set(
      cap_radius * 0.42,
      height * 0.02,
      cap_radius * 0.52
    );
    side_flap.rotation.set(0.18, -0.42, 0.12);
    detail_group.add(side_flap);

    const left_vein_geom = create_dried_vein_curve([
      new THREE.Vector3(-cap_radius * 0.22, 0, cap_radius * 0.88),
      new THREE.Vector3(-cap_radius * 0.18, height * 0.42, cap_radius * 0.82),
      new THREE.Vector3(-cap_radius * 0.10, height * 0.82, cap_radius * 0.62),
    ], cap_radius * 0.025);
    const left_vein = new THREE.Mesh(left_vein_geom, dried_stem_mat);
    left_vein.name = stem_name + "_left_vein";
    detail_group.add(left_vein);

    const center_vein_geom = create_dried_vein_curve([
      new THREE.Vector3(cap_radius * 0.02, 0, cap_radius * 0.90),
      new THREE.Vector3(cap_radius * 0.08, height * 0.38, cap_radius * 0.84),
      new THREE.Vector3(cap_radius * 0.04, height * 0.84, cap_radius * 0.60),
    ], cap_radius * 0.024);
    const center_vein = new THREE.Mesh(center_vein_geom, dried_stem_mat);
    center_vein.name = stem_name + "_center_vein";
    detail_group.add(center_vein);

    const right_vein_geom = create_dried_vein_curve([
      new THREE.Vector3(cap_radius * 0.28, height * 0.02, cap_radius * 0.78),
      new THREE.Vector3(cap_radius * 0.30, height * 0.40, cap_radius * 0.72),
      new THREE.Vector3(cap_radius * 0.18, height * 0.76, cap_radius * 0.58),
    ], cap_radius * 0.022);
    const right_vein = new THREE.Mesh(right_vein_geom, dried_stem_mat);
    right_vein.name = stem_name + "_right_vein";
    detail_group.add(right_vein);

    const fringe_geom = create_dried_fringe_geometry(
      cap_radius * 1.65,
      height * 0.30
    );
    const fringe = new THREE.Mesh(fringe_geom, dark_tip_mat);
    fringe.name = stem_name + "_lower_bark_fringe";
    fringe.position.set(
      cap_radius * 0.04,
      -height * 0.045,
      cap_radius * 0.82
    );
    fringe.rotation.z = -0.04;
    detail_group.add(fringe);

    return detail_group;
  }

  function create_dried_stem_assembly(
    curve,
    radius_fn,
    neck_length,
    cap_radius,
    stem_height,
    stem_name
  ) {
    const stem_group = new THREE.Group();
    stem_group.name = stem_name + "_dried_stem";

    const neck_length_segments = Math.max(
      4,
      Math.ceil(neck_length / 0.035)
    );
    const neck_points = [];
    for (let i = 0; i <= neck_length_segments; i++) {
      neck_points.push(curve.getPoint(i / neck_length_segments));
    }
    const neck_widths = [];
    for (let i = 0; i <= neck_length_segments; i++) {
      const t = i / neck_length_segments;
      neck_widths.push(radius_fn(t) * 1.9);
    }

    const neck_sleeve_geom = create_ribbon_geometry(neck_points, neck_widths);
    const neck_sleeve = new THREE.Mesh(neck_sleeve_geom, banana_green_mat);
    neck_sleeve.name = stem_name + "_green_neck_sleeve";
    stem_group.add(neck_sleeve);

    const neck_core_geom = new THREE.TubeGeometry(
      curve,
      14,
      radius_fn(1) * 0.72,
      12,
      false
    );
    const neck_core = new THREE.Mesh(neck_core_geom, banana_green_core_mat);
    neck_core.name = stem_name + "_neck_core";
    stem_group.add(neck_core);

    const endpoint = curve.getPoint(1);
    const end_tangent = curve.getTangent(1).normalize();
    const stem_quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      end_tangent
    );
    const collar_radius = Math.max(radius_fn(1) * 1.02, cap_radius * 0.68);

    const stem_collar_geom = create_dried_collar_geometry(
      collar_radius,
      stem_height * 0.22,
      11
    );
    const stem_collar = new THREE.Mesh(stem_collar_geom, dried_stem_mat);
    stem_collar.name = stem_name + "_stem_collar";
    stem_collar.position.copy(endpoint);
    stem_collar.quaternion.copy(stem_quaternion);
    stem_group.add(stem_collar);

    const stem_cap_geom = create_dried_cap_geometry(cap_radius, stem_height, 11);
    const stem_cap = new THREE.Mesh(stem_cap_geom, dark_tip_mat);
    stem_cap.name = stem_name + "_stem_cap";
    stem_cap.position.copy(endpoint).addScaledVector(end_tangent, stem_height * 0.06);
    stem_cap.quaternion.copy(stem_quaternion);
    stem_group.add(stem_cap);

    const bark_detail = create_dried_stem_detail(
      cap_radius,
      stem_height,
      stem_name
    );
    bark_detail.position.copy(endpoint);
    bark_detail.quaternion.copy(stem_quaternion);
    stem_group.add(bark_detail);

    return stem_group;
  }

  function create_banana_tip_assembly(
    curve,
    radius_fn,
    cap_radius,
    cap_height,
    tip_name
  ) {
    const tip_group = new THREE.Group();
    tip_group.name = tip_name + "_dried_tip";

    const endpoint = curve.getPoint(0);
    const outward = curve.getTangent(0).normalize().multiplyScalar(-1);
    const tip_quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      outward
    );

    const tip_cap_geom = create_dried_cap_geometry(cap_radius, cap_height, 10);
    const tip_cap = new THREE.Mesh(tip_cap_geom, dark_tip_mat);
    tip_cap.name = tip_name + "_tip_cap";
    tip_cap.position.copy(endpoint).addScaledVector(outward, cap_height * 0.08);
    tip_cap.quaternion.copy(tip_quaternion);
    tip_group.add(tip_cap);

    const tip_fringe_geom = create_dried_fringe_geometry(
      cap_radius * 1.65,
      cap_height * 0.58
    );
    const tip_fringe = new THREE.Mesh(tip_fringe_geom, dark_tip_mat);
    tip_fringe.name = tip_name + "_tip_fringe";
    tip_fringe.position.copy(endpoint).addScaledVector(outward, cap_height * 0.02);
    tip_fringe.quaternion.copy(tip_quaternion);
    tip_group.add(tip_fringe);

    return tip_group;
  }

  function create_surface_marks(curve, radius_fn, mark_data, mark_name) {
    const mark_group = new THREE.Group();
    mark_group.name = mark_name + "_surface_marks";
    const front = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i < mark_data.length; i++) {
      const t = mark_data[i][0];
      const lateral = mark_data[i][1];
      const size = mark_data[i][2];
      const aspect = mark_data[i][3];
      const rotation = mark_data[i][4];

      const center = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = new THREE.Vector3().crossVectors(front, tangent);
      if (side.lengthSq() < 0.000001) side.set(1, 0, 0);
      side.normalize();

      const depth = new THREE.Vector3().crossVectors(tangent, side).normalize();
      const ridge = 1 + 0.018 * Math.cos(lateral * 5);
      const radius = radius_fn(t);
      const lateral_radius = radius * ridge;
      const depth_radius = radius * 0.92 * ridge;
      const depth_ratio = Math.sqrt(Math.max(0, 1 - lateral * lateral));

      const normal = side.clone().multiplyScalar(lateral / lateral_radius)
        .addScaledVector(depth, depth_ratio / depth_radius)
        .normalize();

      const position = center.clone()
        .addScaledVector(side, lateral_radius * lateral)
        .addScaledVector(depth, depth_radius * depth_ratio)
        .addScaledVector(normal, 0.004);

      const mark_geom = new THREE.CircleGeometry(size, 12);
      const mark = new THREE.Mesh(mark_geom, banana_bruise_mat);
      mark.name = mark_name + "_mark_" + (i + 1);
      mark.position.copy(position);
      mark.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal
      );
      mark.rotateZ(rotation);
      mark.scale.set(aspect, 1 / aspect, 1);
      mark_group.add(mark);
    }

    return mark_group;
  }

  const front_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.68, 0.12, 0.13),
    new THREE.Vector3(-0.60, -0.17, 0.13),
    new THREE.Vector3(-0.34, -0.43, 0.13),
    new THREE.Vector3(0.05, -0.52, 0.13),
    new THREE.Vector3(0.42, -0.38, 0.13),
    new THREE.Vector3(0.66, -0.05, 0.13),
    new THREE.Vector3(0.65, 0.34, 0.13),
    new THREE.Vector3(0.48, 0.67, 0.13),
  ], false, "centripetal");
  const front_radius = (t) =>
    0.105 +
    0.130 * Math.sin(Math.PI * Math.pow(t, 0.9)) +
    0.018 * (1 - t);

  const middle_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.43, 0.61, -0.04),
    new THREE.Vector3(-0.39, 0.39, -0.04),
    new THREE.Vector3(-0.25, 0.12, -0.04),
    new THREE.Vector3(-0.02, -0.12, -0.04),
    new THREE.Vector3(0.25, -0.25, -0.04),
    new THREE.Vector3(0.48, -0.14, -0.04),
    new THREE.Vector3(0.54, 0.16, -0.04),
    new THREE.Vector3(0.48, 0.67, -0.04),
  ], false, "centripetal");
  const middle_radius = (t) =>
    0.090 +
    0.105 * Math.sin(Math.PI * Math.pow(t, 0.92)) +
    0.015 * (1 - t);

  const back_curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.72, 0.35, -0.17),
    new THREE.Vector3(-0.68, 0.18, -0.17),
    new THREE.Vector3(-0.55, 0.02, -0.17),
    new THREE.Vector3(-0.34, -0.07, -0.17),
    new THREE.Vector3(-0.10, -0.02, -0.17),
    new THREE.Vector3(0.16, 0.15, -0.17),
    new THREE.Vector3(0.37, 0.40, -0.17),
    new THREE.Vector3(0.48, 0.67, -0.17),
  ], false, "centripetal");
  const back_radius = (t) =>
    0.075 +
    0.085 * Math.sin(Math.PI * Math.pow(t, 0.9)) +
    0.012 * (1 - t);

  const front_banana_geom = create_banana_geometry(
    front_curve,
    front_radius,
    44,
    20
  );
  const front_banana = new THREE.Mesh(front_banana_geom, banana_skin_mat);
  front_banana.name = "front_banana";
  root.add(front_banana);

  const middle_banana_geom = create_banana_geometry(
    middle_curve,
    middle_radius,
    42,
    20
  );
  const middle_banana = new THREE.Mesh(middle_banana_geom, banana_skin_mat);
  middle_banana.name = "middle_banana";
  root.add(middle_banana);

  const back_banana_geom = create_banana_geometry(
    back_curve,
    back_radius,
    42,
    20
  );
  const back_banana = new THREE.Mesh(back_banana_geom, banana_skin_mat);
  back_banana.name = "back_banana";
  root.add(back_banana);

  const front_banana_marks = create_surface_marks(
    front_curve,
    front_radius,
    [
      [0.13, -0.18, 0.007, 0.55, 0.25],
      [0.22, 0.20, 0.006, 0.50, -0.35],
      [0.31, -0.12, 0.009, 0.58, 0.15],
      [0.43, 0.24, 0.005, 0.48, 0.60],
      [0.52, -0.20, 0.007, 0.52, -0.20],
      [0.62, 0.15, 0.006, 0.55, 0.35],
      [0.70, -0.18, 0.010, 0.62, -0.25],
      [0.76, 0.12, 0.007, 0.50, 0.45],
      [0.82, -0.08, 0.005, 0.46, -0.15],
    ],
    "front_banana"
  );
  root.add(front_banana_marks);

  const middle_banana_marks = create_surface_marks(
    middle_curve,
    middle_radius,
    [
      [0.18, 0.16, 0.006, 0.52, 0.20],
      [0.34, -0.22, 0.005, 0.48, -0.40],
      [0.48, 0.18, 0.007, 0.58, 0.30],
      [0.64, -0.15, 0.005, 0.46, 0.10],
      [0.78, 0.20, 0.006, 0.52, -0.25],
    ],
    "middle_banana"
  );
  root.add(middle_banana_marks);

  const back_banana_marks = create_surface_marks(
    back_curve,
    back_radius,
    [
      [0.20, -0.16, 0.005, 0.50, 0.20],
      [0.42, 0.20, 0.004, 0.48, -0.30],
      [0.66, -0.12, 0.006, 0.55, 0.35],
    ],
    "back_banana"
  );
  root.add(back_banana_marks);

  const front_banana_tip = create_banana_tip_assembly(
    front_curve,
    front_radius,
    0.074,
    0.052,
    "front_banana"
  );
  root.add(front_banana_tip);

  const middle_banana_tip = create_banana_tip_assembly(
    middle_curve,
    middle_radius,
    0.064,
    0.047,
    "middle_banana"
  );
  root.add(middle_banana_tip);

  const back_banana_tip = create_banana_tip_assembly(
    back_curve,
    back_radius,
    0.060,
    0.044,
    "back_banana"
  );
  root.add(back_banana_tip);

  const front_banana_stem = create_dried_stem_assembly(
    front_curve,
    front_radius,
    0.16,
    0.092,
    0.105,
    "front_banana"
  );
  root.add(front_banana_stem);

  const middle_banana_stem = create_dried_stem_assembly(
    middle_curve,
    middle_radius,
    0.15,
    0.088,
    0.102,
    "middle_banana"
  );
  root.add(middle_banana_stem);

  const back_banana_stem = create_dried_stem_assembly(
    back_curve,
    back_radius,
    0.14,
    0.084,
    0.098,
    "back_banana"
  );
  root.add(back_banana_stem);

  const shared_stem_crown_geom = create_dried_crown_geometry();
  const shared_stem_crown = new THREE.Mesh(shared_stem_crown_geom, dried_stem_mat);
  shared_stem_crown.name = "shared_stem_crown";
  shared_stem_crown.position.set(0.48, 0.67, 0.02);
  shared_stem_crown.rotation.z = -0.10;
  root.add(shared_stem_crown);

  const shared_crown_flap_geom = create_dried_flap_geometry(0.185, 0.125, 0.028);
  const shared_crown_flap = new THREE.Mesh(shared_crown_flap_geom, dry_fiber_mat);
  shared_crown_flap.name = "shared_crown_flap";
  shared_crown_flap.position.set(0.49, 0.665, 0.112);
  shared_crown_flap.rotation.set(0.10, -0.18, -0.08);
  root.add(shared_crown_flap);

  const shared_crown_fringe_geom = create_dried_fringe_geometry(0.19, 0.052);
  const shared_crown_fringe = new THREE.Mesh(shared_crown_fringe_geom, dark_tip_mat);
  shared_crown_fringe.name = "shared_crown_fringe";
  shared_crown_fringe.position.set(0.485, 0.635, 0.126);
  shared_crown_fringe.rotation.z = -0.08;
  root.add(shared_crown_fringe);

  const shared_crown_vein_left_geom = create_dried_vein_curve([
    new THREE.Vector3(0.430, 0.680, 0.132),
    new THREE.Vector3(0.445, 0.725, 0.136),
    new THREE.Vector3(0.458, 0.770, 0.126),
  ], 0.0045);
  const shared_crown_vein_left = new THREE.Mesh(
    shared_crown_vein_left_geom,
    dried_stem_mat
  );
  shared_crown_vein_left.name = "shared_crown_vein_left";
  root.add(shared_crown_vein_left);

  const shared_crown_vein_center_geom = create_dried_vein_curve([
    new THREE.Vector3(0.480, 0.675, 0.134),
    new THREE.Vector3(0.493, 0.727, 0.138),
    new THREE.Vector3(0.497, 0.782, 0.124),
  ], 0.0048);
  const shared_crown_vein_center = new THREE.Mesh(
    shared_crown_vein_center_geom,
    dried_stem_mat
  );
  shared_crown_vein_center.name = "shared_crown_vein_center";
  root.add(shared_crown_vein_center);

  const shared_crown_vein_right_geom = create_dried_vein_curve([
    new THREE.Vector3(0.525, 0.682, 0.130),
    new THREE.Vector3(0.535, 0.724, 0.132),
    new THREE.Vector3(0.518, 0.766, 0.122),
  ], 0.0042);
  const shared_crown_vein_right = new THREE.Mesh(
    shared_crown_vein_right_geom,
    dried_stem_mat
  );
  shared_crown_vein_right.name = "shared_crown_vein_right";
  root.add(shared_crown_vein_right);

  const crown_speck_geom = new THREE.SphereGeometry(0.006, 7, 5);
  const crown_bark_speckles = new THREE.InstancedMesh(
    crown_speck_geom,
    dark_tip_mat,
    14
  );
  crown_bark_speckles.name = "crown_bark_speckles";
  const crown_speck_transform = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const row = Math.floor(i / 5);
    const column = i % 5;
    crown_speck_transform.position.set(
      0.425 + column * 0.028 + row * 0.006,
      0.688 + row * 0.030 + 0.004 * Math.sin(i * 1.7),
      0.137 + 0.004 * Math.cos(i * 1.3)
    );
    crown_speck_transform.scale.set(
      0.75 + 0.18 * Math.sin(i * 1.1),
      0.55 + 0.12 * Math.cos(i * 1.9),
      0.42
    );
    crown_speck_transform.rotation.set(0, 0, i * 0.47);
    crown_speck_transform.updateMatrix();
    crown_bark_speckles.setMatrixAt(i, crown_speck_transform.matrix);
  }
  crown_bark_speckles.instanceMatrix.needsUpdate = true;
  root.add(crown_bark_speckles);

  const front_tip_speck_geom = new THREE.SphereGeometry(0.0045, 7, 5);
  const front_tip_speckles = new THREE.InstancedMesh(
    front_tip_speck_geom,
    banana_speck_mat,
    7
  );
  front_tip_speckles.name = "front_tip_speckles";
  const front_tip_speck_transform = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    front_tip_speck_transform.position.set(
      -0.704 + 0.012 * Math.sin(i * 1.9),
      0.105 + 0.012 * Math.cos(i * 1.4),
      0.198 + 0.005 * Math.sin(i * 2.2)
    );
    front_tip_speck_transform.scale.setScalar(0.75 + 0.12 * Math.sin(i * 1.3));
    front_tip_speck_transform.updateMatrix();
    front_tip_speckles.setMatrixAt(i, front_tip_speck_transform.matrix);
  }
  front_tip_speckles.instanceMatrix.needsUpdate = true;
  root.add(front_tip_speckles);

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