export default function generate(THREE) {
  const root = new THREE.Group();
  const pod_group = new THREE.Group();
  const pod_surface = new THREE.Group();
  root.add(pod_group);
  pod_group.add(pod_surface);
  pod_group.rotation.y = -0.18;

  const pod_length = 3.8;
  const pod_half_length = pod_length / 2;
  const length_segments = 48;
  const width_segments = 12;

  const pod_innerMat = new THREE.MeshStandardMaterial({
    color: 0xd8a63a,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const pod_outerMat = new THREE.MeshStandardMaterial({
    color: 0xb7772b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const pod_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x70401f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const pod_veinMat = new THREE.MeshStandardMaterial({
    color: 0x985b27,
    metalness: 0.0,
    roughness: 0.7,
  });
  const pod_wearMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf76,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const pod_freckleMat = new THREE.MeshStandardMaterial({
    color: 0x85501f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const seedsMat = new THREE.MeshStandardMaterial({
    color: 0x321817,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seed_scarsMat = new THREE.MeshStandardMaterial({
    color: 0x160d0d,
    metalness: 0.0,
    roughness: 0.8,
  });

  function podWidth(t) {
    const arch = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.64);
    const end_width = 0.055 * (1 - t) + 0.085 * t;
    return arch * (0.62 - 0.08 * t) + end_width;
  }

  function podPoint(t, u) {
    const x = pod_half_length * (1 - 2 * t);
    const side_asymmetry = 1 + 0.035 * Math.sin(t * Math.PI * 2 + 0.45);
    const z = u * podWidth(t) * side_asymmetry;
    const longitudinal_curve = 0.025 * Math.cos((t - 0.5) * Math.PI);
    const bowl_depth =
      0.2 * Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.75);
    const y =
      longitudinal_curve +
      bowl_depth * (u * u - 0.12 * u - 0.35);
    return new THREE.Vector3(x, y, z);
  }

  function podNormal(t, u) {
    const e = 0.002;
    const t0 = Math.max(0, t - e);
    const t1 = Math.min(1, t + e);
    const u0 = Math.max(-1, u - e);
    const u1 = Math.min(1, u + e);
    const tangent_t = podPoint(t1, u).sub(podPoint(t0, u));
    const tangent_u = podPoint(t, u1).sub(podPoint(t, u0));
    return tangent_t.cross(tangent_u).normalize();
  }

  function podSurfaceY(x, z) {
    const t = Math.max(0, Math.min(1, (x + pod_half_length) / pod_length));
    const width = podWidth(t);
    const u = Math.max(-1, Math.min(1, z / width));
    return podPoint(t, u).y;
  }

  const inner_positions = [];
  const inner_indices = [];
  for (let i = 0; i <= length_segments; i++) {
    const t = i / length_segments;
    for (let j = 0; j <= width_segments; j++) {
      const u = -1 + (2 * j) / width_segments;
      const p = podPoint(t, u);
      inner_positions.push(p.x, p.y, p.z);
    }
  }
  for (let i = 0; i < length_segments; i++) {
    for (let j = 0; j < width_segments; j++) {
      const a = i * (width_segments + 1) + j;
      const b = (i + 1) * (width_segments + 1) + j;
      const c = b + 1;
      const d = a + 1;
      inner_indices.push(a, b, c, a, c, d);
    }
  }

  const pod_innerGeom = new THREE.BufferGeometry();
  pod_innerGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(inner_positions, 3)
  );
  pod_innerGeom.setIndex(inner_indices);
  pod_innerGeom.computeVertexNormals();
  const pod_inner = new THREE.Mesh(pod_innerGeom, pod_innerMat);
  pod_surface.add(pod_inner);

  const outer_positions = [];
  const outer_indices = [];
  for (let i = 0; i <= length_segments; i++) {
    const t = i / length_segments;
    for (let j = 0; j <= width_segments; j++) {
      const u = -1 + (2 * j) / width_segments;
      const p = podPoint(t, u);
      const n = podNormal(t, u);
      outer_positions.push(
        p.x - n.x * 0.05,
        p.y - n.y * 0.05,
        p.z - n.z * 0.05
      );
    }
  }
  for (let i = 0; i < length_segments; i++) {
    for (let j = 0; j < width_segments; j++) {
      const a = i * (width_segments + 1) + j;
      const b = (i + 1) * (width_segments + 1) + j;
      const c = b + 1;
      const d = a + 1;
      outer_indices.push(a, c, b, a, d, c);
    }
  }

  const pod_outerGeom = new THREE.BufferGeometry();
  pod_outerGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(outer_positions, 3)
  );
  pod_outerGeom.setIndex(outer_indices);
  pod_outerGeom.computeVertexNormals();
  const pod_outer = new THREE.Mesh(pod_outerGeom, pod_outerMat);
  pod_surface.add(pod_outer);

  function makeSideWallGeometry(side) {
    const positions = [];
    const indices = [];
    for (let i = 0; i <= length_segments; i++) {
      const t = i / length_segments;
      const outer = podPoint(t, side);
      const inner = podPoint(t, side - 0.1);
      positions.push(
        outer.x, outer.y, outer.z,
        inner.x, inner.y, inner.z
      );
    }
    for (let i = 0; i < length_segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      if (side > 0) {
        indices.push(a, c, d, a, d, b);
      } else {
        indices.push(a, d, c, a, b, d);
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

  const pod_front_wallGeom = makeSideWallGeometry(1);
  const pod_front_wall = new THREE.Mesh(pod_front_wallGeom, pod_outerMat);
  pod_surface.add(pod_front_wall);

  const pod_rear_wallGeom = makeSideWallGeometry(-1);
  const pod_rear_wall = new THREE.Mesh(pod_rear_wallGeom, pod_outerMat);
  pod_surface.add(pod_rear_wall);

  function makeSidePath(side, inset, lift) {
    const points = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28;
      const p = podPoint(t, side * (1 - inset));
      p.y += lift;
      points.push(p);
    }
    return new THREE.CatmullRomCurve3(points, false, "centripetal");
  }

  const front_rimGeom = new THREE.TubeGeometry(
    makeSidePath(1, 0, 0.01),
    72,
    0.035,
    8,
    false
  );
  const front_rim = new THREE.Mesh(front_rimGeom, pod_edgeMat);
  pod_surface.add(front_rim);

  const rear_rimGeom = new THREE.TubeGeometry(
    makeSidePath(-1, 0, 0.01),
    72,
    0.035,
    8,
    false
  );
  const rear_rim = new THREE.Mesh(rear_rimGeom, pod_edgeMat);
  pod_surface.add(rear_rim);

  const front_inner_rimGeom = new THREE.TubeGeometry(
    makeSidePath(1, 0.12, 0.014),
    64,
    0.012,
    6,
    false
  );
  const front_inner_rim = new THREE.Mesh(front_inner_rimGeom, pod_veinMat);
  pod_surface.add(front_inner_rim);

  const rear_inner_rimGeom = new THREE.TubeGeometry(
    makeSidePath(-1, 0.12, 0.014),
    64,
    0.012,
    6,
    false
  );
  const rear_inner_rim = new THREE.Mesh(rear_inner_rimGeom, pod_veinMat);
  pod_surface.add(rear_inner_rim);

  function makeEndPath(end) {
    const points = [];
    const t = end > 0 ? 1 : 0;
    for (let i = 0; i <= 8; i++) {
      const u = -0.96 + (1.92 * i) / 8;
      const p = podPoint(t, u);
      p.y += 0.012;
      points.push(p);
    }
    return new THREE.CatmullRomCurve3(points, false, "centripetal");
  }

  const left_end_rimGeom = new THREE.TubeGeometry(
    makeEndPath(-1),
    18,
    0.032,
    8,
    false
  );
  const left_end_rim = new THREE.Mesh(left_end_rimGeom, pod_edgeMat);
  pod_surface.add(left_end_rim);

  const right_end_rimGeom = new THREE.TubeGeometry(
    makeEndPath(1),
    18,
    0.034,
    8,
    false
  );
  const right_end_rim = new THREE.Mesh(right_end_rimGeom, pod_edgeMat);
  pod_surface.add(right_end_rim);

  const central_vein_points = [];
  for (let i = 0; i <= 28; i++) {
    const t = 0.025 + (0.95 * i) / 28;
    const u = 0.025 * Math.sin(t * Math.PI * 3);
    const p = podPoint(t, u);
    p.y += 0.018;
    central_vein_points.push(p);
  }
  const central_veinGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      central_vein_points,
      false,
      "centripetal"
    ),
    64,
    0.014,
    7,
    false
  );
  const central_vein = new THREE.Mesh(central_veinGeom, pod_veinMat);
  pod_surface.add(central_vein);

  const branch_veins = new THREE.Group();
  for (const side of [-1, 1]) {
    for (let branch_index = 0; branch_index < 4; branch_index++) {
      const base_t = 0.22 + branch_index * 0.18;
      const branch_points = [];
      for (let k = 0; k <= 5; k++) {
        const s = k / 5;
        const t = base_t + 0.115 * s;
        const u = side * 0.72 * s;
        const p = podPoint(t, u);
        p.y += 0.012;
        branch_points.push(p);
      }
      const branch_veinGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(
          branch_points,
          false,
          "centripetal"
        ),
        14,
        0.006,
        5,
        false
      );
      const branch_vein = new THREE.Mesh(branch_veinGeom, pod_veinMat);
      branch_veins.add(branch_vein);
    }
  }
  pod_surface.add(branch_veins);

  const left_tip_start = podPoint(0, 0);
  left_tip_start.y -= 0.015;
  const left_tip_end = new THREE.Vector3(
    -pod_half_length - 0.13,
    -0.025,
    0.012
  );
  const left_tipGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      [
        left_tip_start,
        new THREE.Vector3(-1.92, -0.012, 0.004),
        new THREE.Vector3(-2.02, -0.025, 0.008),
        left_tip_end,
      ],
      false,
      "centripetal"
    ),
    14,
    0.035,
    7,
    false
  );
  const left_tip = new THREE.Mesh(left_tipGeom, pod_edgeMat);
  pod_surface.add(left_tip);

  const left_tip_knobGeom = new THREE.DodecahedronGeometry(0.058, 0);
  const left_tip_knob = new THREE.Mesh(left_tip_knobGeom, pod_edgeMat);
  left_tip_knob.position.copy(left_tip_end);
  left_tip_knob.scale.set(1.1, 0.72, 0.82);
  pod_surface.add(left_tip_knob);

  const right_tip_start = podPoint(1, 0);
  const right_tip_end = new THREE.Vector3(
    pod_half_length + 0.11,
    0.018,
    -0.006
  );
  const right_tipGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      [
        right_tip_start,
        new THREE.Vector3(1.91, 0.006, -0.002),
        new THREE.Vector3(2.0, 0.014, -0.005),
        right_tip_end,
      ],
      false,
      "centripetal"
    ),
    14,
    0.034,
    7,
    false
  );
  const right_tip = new THREE.Mesh(right_tipGeom, pod_edgeMat);
  pod_surface.add(right_tip);

  const right_tip_knobGeom = new THREE.DodecahedronGeometry(0.052, 0);
  const right_tip_knob = new THREE.Mesh(right_tip_knobGeom, pod_edgeMat);
  right_tip_knob.position.copy(right_tip_end);
  right_tip_knob.scale.set(1.0, 0.7, 0.78);
  pod_surface.add(right_tip_knob);

  const speckleGeom = new THREE.CircleGeometry(1, 10);
  const decal_axis = new THREE.Vector3(0, 0, 1);
  const dummy = new THREE.Object3D();

  const pale_speckles = new THREE.InstancedMesh(
    speckleGeom,
    pod_wearMat,
    28
  );
  for (let i = 0; i < 28; i++) {
    const t = 0.08 + (((i * 11) % 29) / 28) * 0.84;
    const u = -0.78 + (((i * 7) % 31) / 30) * 1.56;
    const p = podPoint(t, u);
    const n = podNormal(t, u);
    p.addScaledVector(n, 0.008);
    dummy.position.copy(p);
    dummy.quaternion.setFromUnitVectors(decal_axis, n);
    dummy.rotateZ((i % 6) * 0.41);
    dummy.scale.set(
      0.025 + (i % 5) * 0.009,
      0.012 + ((i * 3) % 4) * 0.006,
      1
    );
    dummy.updateMatrix();
    pale_speckles.setMatrixAt(i, dummy.matrix);
  }
  pale_speckles.instanceMatrix.needsUpdate = true;
  pod_surface.add(pale_speckles);

  const dark_freckles = new THREE.InstancedMesh(
    speckleGeom,
    pod_freckleMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const t = 0.1 + (((i * 5) % 19) / 18) * 0.8;
    const u = -0.76 + (((i * 9) % 23) / 22) * 1.52;
    const p = podPoint(t, u);
    const n = podNormal(t, u);
    p.addScaledVector(n, 0.009);
    dummy.position.copy(p);
    dummy.quaternion.setFromUnitVectors(decal_axis, n);
    dummy.rotateZ((i % 5) * 0.53);
    dummy.scale.set(
      0.012 + (i % 4) * 0.006,
      0.008 + ((i * 2) % 3) * 0.005,
      1
    );
    dummy.updateMatrix();
    dark_freckles.setMatrixAt(i, dummy.matrix);
  }
  dark_freckles.instanceMatrix.needsUpdate = true;
  pod_surface.add(dark_freckles);

  const seed_data = [
    [-0.62, 0.18, 1.05, 0.90, 1.00, 0.20],
    [-0.45, -0.18, 0.95, 1.00, 1.08, 0.80],
    [-0.28, 0.34, 1.00, 0.92, 0.95, 1.40],
    [-0.12, -0.34, 1.10, 0.90, 0.90, 0.50],
    [0.08, 0.22, 0.92, 1.05, 1.10, 1.90],
    [0.25, -0.18, 1.05, 0.95, 0.90, 1.10],
    [0.43, 0.30, 0.95, 1.00, 1.00, 0.35],
    [0.60, -0.08, 1.08, 0.90, 0.95, 2.20],
    [0.76, 0.18, 0.90, 1.00, 1.10, 0.95],
    [0.02, 0.00, 1.12, 0.95, 0.90, 1.70],
    [0.18, 0.05, 0.95, 1.08, 1.00, 0.42],
    [0.35, -0.02, 1.00, 0.90, 1.10, 1.25],
    [0.52, 0.05, 0.92, 1.00, 0.95, 2.55],
    [0.82, -0.22, 0.88, 0.96, 1.05, 0.65],
    [-0.15, 0.12, 0.90, 1.00, 0.88, 1.08],
    [-0.02, -0.14, 1.08, 0.92, 1.00, 2.02],
    [0.28, 0.16, 0.90, 1.00, 1.12, 0.18],
    [0.88, 0.02, 0.86, 0.94, 1.02, 1.52],
  ];

  const seedsGeom = new THREE.SphereGeometry(0.12, 18, 12);
  const seeds = new THREE.InstancedMesh(
    seedsGeom,
    seedsMat,
    seed_data.length
  );
  const seed_scarsGeom = new THREE.CylinderGeometry(
    0.025,
    0.022,
    0.009,
    10
  );
  const seed_scars = new THREE.InstancedMesh(
    seed_scarsGeom,
    seed_scarsMat,
    seed_data.length
  );
  const seed_axis = new THREE.Vector3(0, 1, 0);
  const seed_quaternion = new THREE.Quaternion();

  for (let i = 0; i < seed_data.length; i++) {
    const data = seed_data[i];
    const x = data[0];
    const z = data[1];
    const sx = data[2];
    const sy = data[3];
    const sz = data[4];
    const angle = data[5];
    const y = podSurfaceY(x, z) + 0.12 * sy;

    dummy.position.set(x, y, z);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    seeds.setMatrixAt(i, dummy.matrix);

    seed_quaternion.setFromAxisAngle(seed_axis, angle);
    dummy.position.set(
      x + Math.cos(angle) * 0.12 * sx,
      y + 0.004,
      z - Math.sin(angle) * 0.12 * sx
    );
    dummy.quaternion.copy(seed_quaternion);
    dummy.scale.set(0.85, 0.7, 0.85);
    dummy.updateMatrix();
    seed_scars.setMatrixAt(i, dummy.matrix);
  }
  seeds.instanceMatrix.needsUpdate = true;
  seed_scars.instanceMatrix.needsUpdate = true;
  pod_group.add(seeds);
  pod_group.add(seed_scars);

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