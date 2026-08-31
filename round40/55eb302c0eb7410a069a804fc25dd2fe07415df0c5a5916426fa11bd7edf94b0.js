export default function generate(THREE) {
  const root = new THREE.Group();

  const length = 3.6;
  const half_length = length / 2;
  const half_width = 0.68;
  const hull_bottom_y = -0.42;
  const hull_top_y = 0.42;

  const outer_hullMat = new THREE.MeshStandardMaterial({
    color: 0x087a43,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const inner_hullMat = new THREE.MeshStandardMaterial({
    color: 0x045d34,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const gunwale_rimMat = new THREE.MeshStandardMaterial({
    color: 0x078449,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const hull_ribsMat = new THREE.MeshStandardMaterial({
    color: 0x06713d,
    metalness: 0.0,
    roughness: 0.3,
  });

  function hullPoint(t, v, sign, inset = 0, lift = 0) {
    const endpoint_factor = Math.pow(Math.abs(t), 6);
    const width_factor =
      1 - 0.42 * endpoint_factor + 0.04 * t * (1 - endpoint_factor);
    const bottom_y = hull_bottom_y + 0.24 * endpoint_factor + lift;
    const top_y = hull_top_y + 0.025 * endpoint_factor + lift;
    const outer_width = half_width * width_factor;
    const x = t * (half_length - inset * endpoint_factor);
    const y = bottom_y + (top_y - bottom_y) * v;
    const z =
      sign *
      (outer_width * (0.16 + 0.84 * Math.pow(v, 0.72)) - inset);
    return new THREE.Vector3(x, y, z);
  }

  function createHullGeometry(inset, lift) {
    const x_segments = 36;
    const v_segments = 10;
    const positions = [];
    const indices = [];

    for (const sign of [-1, 1]) {
      const base = positions.length / 3;

      for (let i = 0; i <= x_segments; i++) {
        const t = -1 + (2 * i) / x_segments;
        for (let j = 0; j <= v_segments; j++) {
          const v = j / v_segments;
          const p = hullPoint(t, v, sign, inset, lift);
          positions.push(p.x, p.y, p.z);
        }
      }

      for (let i = 0; i < x_segments; i++) {
        for (let j = 0; j < v_segments; j++) {
          const a = base + i * (v_segments + 1) + j;
          const b = base + (i + 1) * (v_segments + 1) + j;
          const c = b + 1;
          const d = a + 1;

          if (sign > 0) {
            indices.push(a, b, c, a, c, d);
          } else {
            indices.push(a, c, b, a, d, c);
          }
        }
      }
    }

    const stern_base = positions.length / 3;
    for (let j = 0; j <= v_segments; j++) {
      const v = j / v_segments;
      const outer = hullPoint(-1, v, 1, inset, lift);
      const inner = hullPoint(-1, v, -1, inset, lift);
      positions.push(outer.x, outer.y, outer.z);
      positions.push(inner.x, inner.y, inner.z);
    }
    for (let j = 0; j < v_segments; j++) {
      const a = stern_base + j * 2;
      indices.push(a, a + 1, a + 3, a, a + 3, a + 2);
    }

    const bow_base = positions.length / 3;
    for (let j = 0; j <= v_segments; j++) {
      const v = j / v_segments;
      const outer = hullPoint(1, v, 1, inset, lift);
      const inner = hullPoint(1, v, -1, inset, lift);
      positions.push(outer.x, outer.y, outer.z);
      positions.push(inner.x, inner.y, inner.z);
    }
    for (let j = 0; j < v_segments; j++) {
      const a = bow_base + j * 2;
      indices.push(a, a + 3, a + 1, a, a + 2, a + 3);
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

  function createRimGeometry() {
    const segments = 48;
    const positions = [];
    const indices = [];
    const outer_points = [];
    const inner_points = [];

    for (let i = 0; i <= segments; i++) {
      const t = -1 + (2 * i) / segments;
      const p = hullPoint(t, 1, 1);
      outer_points.push(p);
      positions.push(p.x, p.y + 0.025, p.z);
    }
    for (let i = 0; i <= segments; i++) {
      const t = -1 + (2 * i) / segments;
      const p = hullPoint(t, 1, -1);
      inner_points.push(p);
      positions.push(p.x, p.y + 0.025, p.z);
    }
    for (let i = 0; i <= segments; i++) {
      const t = -1 + (2 * i) / segments;
      const p = hullPoint(t, 1, 1, 0.115, 0);
      positions.push(p.x, p.y, p.z);
    }
    for (let i = 0; i <= segments; i++) {
      const t = -1 + (2 * i) / segments;
      const p = hullPoint(t, 1, -1, 0.115, 0);
      positions.push(p.x, p.y, p.z);
    }

    const outer_top = positions.length / 3;
    for (const p of outer_points) {
      positions.push(p.x, p.y + 0.055, p.z);
    }
    for (const p of inner_points) {
      positions.push(p.x, p.y + 0.055, p.z);
    }
    for (const p of outer_points) {
      positions.push(p.x, p.y - 0.005, p.z);
    }
    for (const p of inner_points) {
      positions.push(p.x, p.y - 0.005, p.z);
    }

    function quad(a, b, c, d) {
      indices.push(a, b, c, a, c, d);
    }

    for (let i = 0; i < segments; i++) {
      const outer_a = i;
      const outer_b = i + 1;
      const inner_a = segments + 1 + i;
      const inner_b = segments + 2 + i;
      const under_a = segments * 2 + 1 + i;
      const under_b = segments * 2 + 2 + i;
      const top_a = segments * 3 + 1 + i;
      const top_b = segments * 3 + 2 + i;
      const inner_top_a = segments * 4 + 1 + i;
      const inner_top_b = segments * 4 + 2 + i;

      quad(outer_a, outer_b, inner_b, inner_a);
      quad(under_a, under_b, top_b, top_a);
      quad(outer_a, top_a, top_b, outer_b);
      quad(under_b, inner_b, inner_top_b, inner_top_a);
      quad(top_a, inner_top_a, inner_top_b, top_b);
    }

    const stern_outer = 0;
    const stern_inner = segments + 1;
    const stern_under = segments * 2 + 1;
    const stern_top = segments * 3 + 1;
    const stern_inner_top = segments * 4 + 1;
    quad(
      stern_outer,
      stern_under,
      stern_top,
      stern_inner
    );
    quad(
      stern_top,
      stern_under,
      stern_inner_top,
      stern_inner
    );

    const bow_outer = segments;
    const bow_inner = segments * 2;
    const bow_under = segments * 3;
    const bow_top = segments * 4;
    const bow_inner_top = segments * 5;
    quad(
      bow_outer,
      bow_inner,
      bow_top,
      bow_under
    );
    quad(
      bow_inner,
      bow_inner_top,
      bow_top,
      bow_under
    );

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createHullPath(v, sign, inset, lift, y_offset) {
    const points = [];
    const count = 36;
    for (let i = 0; i <= count; i++) {
      const t = -1 + (2 * i) / count;
      const p = hullPoint(t, v, sign, inset, lift);
      p.y += y_offset;
      points.push(p);
    }
    return new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
  }

  const outer_hullGeom = createHullGeometry(0, 0);
  const outer_hull = new THREE.Mesh(outer_hullGeom, outer_hullMat);
  root.add(outer_hull);

  const inner_hullGeom = createHullGeometry(0.115, 0.04);
  const inner_hull = new THREE.Mesh(inner_hullGeom, inner_hullMat);
  root.add(inner_hull);

  const gunwale_rimGeom = createRimGeometry();
  const gunwale_rim = new THREE.Mesh(gunwale_rimGeom, gunwale_rimMat);
  root.add(gunwale_rim);

  const upper_rub_railGeom = new THREE.TubeGeometry(
    createHullPath(0.79, 1, 0, 0, 0.012),
    72,
    0.024,
    8,
    false
  );
  const starboard_upper_rub_rail = new THREE.Mesh(
    upper_rub_railGeom,
    hull_ribsMat
  );
  root.add(starboard_upper_rub_rail);

  const port_upper_rub_rail = new THREE.Mesh(
    upper_rub_railGeom,
    hull_ribsMat
  );
  root.add(port_upper_rub_rail);

  const lower_hull_ridgeGeom = new THREE.TubeGeometry(
    createHullPath(0.29, 1, 0, 0, 0.01),
    72,
    0.017,
    7,
    false
  );
  const starboard_lower_hull_ridge = new THREE.Mesh(
    lower_hull_ridgeGeom,
    hull_ribsMat
  );
  root.add(starboard_lower_hull_ridge);

  const port_lower_hull_ridge = new THREE.Mesh(
    lower_hull_ridgeGeom,
    hull_ribsMat
  );
  root.add(port_lower_hull_ridge);

  const inner_stringerGeom = new THREE.TubeGeometry(
    createHullPath(0.67, -1, 0.115, 0.04, 0.008),
    72,
    0.018,
    7,
    false
  );
  const starboard_inner_stringer = new THREE.Mesh(
    inner_stringerGeom,
    hull_ribsMat
  );
  root.add(starboard_inner_stringer);

  const port_inner_stringer = new THREE.Mesh(
    inner_stringerGeom,
    hull_ribsMat
  );
  root.add(port_inner_stringer);

  const keel_path_points = [];
  for (let i = 0; i <= 32; i++) {
    const t = -0.98 + (1.96 * i) / 32;
    const p = hullPoint(t, 0, 1);
    p.y -= 0.012;
    p.z = 0;
    keel_path_points.push(p);
  }
  const keel_stripGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      keel_path_points,
      false,
      "centripetal"
    ),
    64,
    0.022,
    8,
    false
  );
  const keel_strip = new THREE.Mesh(keel_stripGeom, hull_ribsMat);
  root.add(keel_strip);

  const interior_ribsGeom = new THREE.CylinderGeometry(
    0.027,
    0.027,
    1,
    10
  );
  const rib_positions = [-0.92, -0.32, 0.32, 0.92];
  const interior_ribs = new THREE.InstancedMesh(
    interior_ribsGeom,
    hull_ribsMat,
    rib_positions.length * 2
  );
  const rib_dummy = new THREE.Object3D();
  let rib_index = 0;

  for (const x of rib_positions) {
    const t = x / half_length;
    for (const sign of [-1, 1]) {
      const lower = hullPoint(t, 0.42, sign, 0.115, 0.04);
      const upper = hullPoint(t, 0.94, sign, 0.115, 0.04);
      lower.y += 0.008;
      upper.y += 0.008;

      const direction = new THREE.Vector3().subVectors(upper, lower);
      const rib_length = direction.length();
      const midpoint = new THREE.Vector3()
        .addVectors(lower, upper)
        .multiplyScalar(0.5);

      rib_dummy.position.copy(midpoint);
      rib_dummy.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
      );
      rib_dummy.scale.set(1, rib_length, 1);
      rib_dummy.updateMatrix();
      interior_ribs.setMatrixAt(rib_index, rib_dummy.matrix);
      rib_index++;
    }
  }
  interior_ribs.instanceMatrix.needsUpdate = true;
  root.add(interior_ribs);

  const floor_planksGeom = new THREE.BoxGeometry(2.55, 0.05, 0.23);
  const floor_planks = new THREE.InstancedMesh(
    floor_planksGeom,
    inner_hullMat,
    3
  );
  const floor_dummy = new THREE.Object3D();
  const floor_z_positions = [-0.27, 0, 0.27];

  for (let i = 0; i < floor_z_positions.length; i++) {
    floor_dummy.position.set(
      0,
      hull_bottom_y + 0.055,
      floor_z_positions[i]
    );
    floor_dummy.quaternion.identity();
    floor_dummy.scale.set(1, 1, 1);
    floor_dummy.updateMatrix();
    floor_planks.setMatrixAt(i, floor_dummy.matrix);
  }
  floor_planks.instanceMatrix.needsUpdate = true;
  root.add(floor_planks);

  const bench_seatsGeom = new THREE.BoxGeometry(0.28, 0.075, 1.02);
  const bench_seatsMat = new THREE.MeshStandardMaterial({
    color: 0x087d46,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bench_seats = new THREE.InstancedMesh(
    bench_seatsGeom,
    bench_seatsMat,
    2
  );
  const bench_dummy = new THREE.Object3D();
  const bench_x_positions = [-0.68, 0.68];

  for (let i = 0; i < bench_x_positions.length; i++) {
    bench_dummy.position.set(bench_x_positions[i], 0.285, 0);
    bench_dummy.quaternion.identity();
    bench_dummy.scale.set(1, 1, 1);
    bench_dummy.updateMatrix();
    bench_seats.setMatrixAt(i, bench_dummy.matrix);
  }
  bench_seats.instanceMatrix.needsUpdate = true;
  root.add(bench_seats);

  const bench_supportsGeom = new THREE.BoxGeometry(0.12, 0.16, 0.11);
  const bench_supports = new THREE.InstancedMesh(
    bench_supportsGeom,
    hull_ribsMat,
    4
  );
  const support_dummy = new THREE.Object3D();
  let support_index = 0;

  for (const x of bench_x_positions) {
    for (const z of [-0.31, 0.31]) {
      support_dummy.position.set(x, 0.19, z);
      support_dummy.quaternion.identity();
      support_dummy.scale.set(1, 1, 1);
      support_dummy.updateMatrix();
      bench_supports.setMatrixAt(support_index, support_dummy.matrix);
      support_index++;
    }
  }
  bench_supports.instanceMatrix.needsUpdate = true;
  root.add(bench_supports);

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