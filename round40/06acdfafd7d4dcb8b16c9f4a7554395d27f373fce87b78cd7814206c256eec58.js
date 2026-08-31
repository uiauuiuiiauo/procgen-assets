export default function generate(THREE) {
  const root = new THREE.Group();
  const bowl_group = new THREE.Group();
  root.add(bowl_group);

  const bowl_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa9d5e8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x173b92,
    metalness: 0.0,
    roughness: 0.4,
  });
  const rim_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x4f82c7,
    metalness: 0.0,
    roughness: 0.4,
  });
  const foot_baseMat = new THREE.MeshStandardMaterial({
    color: 0xd8e5df,
    metalness: 0.0,
    roughness: 0.4,
  });
  const foot_blue_bandMat = new THREE.MeshStandardMaterial({
    color: 0x173b92,
    metalness: 0.0,
    roughness: 0.4,
  });
  const flower_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x78a9d2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const flower_petal_outlinesMat = new THREE.MeshStandardMaterial({
    color: 0x17377f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0x102c70,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const painted_leavesMat = new THREE.MeshStandardMaterial({
    color: 0x315f9f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const painted_stemsMat = new THREE.MeshStandardMaterial({
    color: 0x17377f,
    metalness: 0.0,
    roughness: 0.4,
  });

  const bowl_body_profile = [
    new THREE.Vector2(0.000, 0.120),
    new THREE.Vector2(0.200, 0.120),
    new THREE.Vector2(0.290, 0.150),
    new THREE.Vector2(0.380, 0.220),
    new THREE.Vector2(0.480, 0.340),
    new THREE.Vector2(0.560, 0.490),
    new THREE.Vector2(0.620, 0.650),
    new THREE.Vector2(0.660, 0.780),
    new THREE.Vector2(0.675, 0.815),
    new THREE.Vector2(0.660, 0.835),
    new THREE.Vector2(0.625, 0.820),
    new THREE.Vector2(0.600, 0.760),
    new THREE.Vector2(0.550, 0.620),
    new THREE.Vector2(0.480, 0.480),
    new THREE.Vector2(0.390, 0.350),
    new THREE.Vector2(0.290, 0.270),
    new THREE.Vector2(0.180, 0.230),
    new THREE.Vector2(0.000, 0.220),
  ];
  const bowl_bodyGeom = new THREE.LatheGeometry(bowl_body_profile, 64);
  const bowl_body = new THREE.Mesh(bowl_bodyGeom, bowl_bodyMat);
  bowl_group.add(bowl_body);

  const rimGeom = new THREE.TorusGeometry(0.651, 0.027, 14, 72);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.817;
  bowl_group.add(rim);

  const rim_highlightGeom = new THREE.TorusGeometry(0.651, 0.006, 8, 72);
  const rim_highlight = new THREE.Mesh(rim_highlightGeom, rim_highlightMat);
  rim_highlight.rotation.x = Math.PI / 2;
  rim_highlight.position.y = 0.836;
  bowl_group.add(rim_highlight);

  const inner_rim_bandGeom = new THREE.TorusGeometry(0.612, 0.007, 8, 64);
  const inner_rim_band = new THREE.Mesh(inner_rim_bandGeom, foot_blue_bandMat);
  inner_rim_band.rotation.x = Math.PI / 2;
  inner_rim_band.position.y = 0.785;
  bowl_group.add(inner_rim_band);

  const foot_base_profile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.270, 0.000),
    new THREE.Vector2(0.320, 0.015),
    new THREE.Vector2(0.340, 0.040),
    new THREE.Vector2(0.330, 0.070),
    new THREE.Vector2(0.300, 0.100),
    new THREE.Vector2(0.250, 0.130),
    new THREE.Vector2(0.000, 0.130),
  ];
  const foot_baseGeom = new THREE.LatheGeometry(foot_base_profile, 56);
  const foot_base = new THREE.Mesh(foot_baseGeom, foot_baseMat);
  bowl_group.add(foot_base);

  const foot_blue_bandGeom = new THREE.TorusGeometry(0.302, 0.022, 12, 64);
  const foot_blue_band = new THREE.Mesh(foot_blue_bandGeom, foot_blue_bandMat);
  foot_blue_band.rotation.x = Math.PI / 2;
  foot_blue_band.position.y = 0.047;
  bowl_group.add(foot_blue_band);

  const foot_upper_lineGeom = new THREE.TorusGeometry(0.263, 0.010, 8, 56);
  const foot_upper_line = new THREE.Mesh(foot_upper_lineGeom, foot_blue_bandMat);
  foot_upper_line.rotation.x = Math.PI / 2;
  foot_upper_line.position.y = 0.116;
  bowl_group.add(foot_upper_line);

  const foot_lower_lineGeom = new THREE.TorusGeometry(0.316, 0.009, 8, 64);
  const foot_lower_line = new THREE.Mesh(foot_lower_lineGeom, rim_highlightMat);
  foot_lower_line.rotation.x = Math.PI / 2;
  foot_lower_line.position.y = 0.022;
  bowl_group.add(foot_lower_line);

  const petal_shape = new THREE.Shape();
  petal_shape.moveTo(0, -0.08);
  petal_shape.bezierCurveTo(-0.42, -0.18, -0.70, 0.28, -0.46, 0.70);
  petal_shape.bezierCurveTo(-0.28, 0.96, -0.08, 1.00, 0, 0.82);
  petal_shape.bezierCurveTo(0.08, 1.00, 0.28, 0.96, 0.46, 0.70);
  petal_shape.bezierCurveTo(0.70, 0.28, 0.42, -0.18, 0, -0.08);
  petal_shape.closePath();

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0, 0);
  leaf_shape.bezierCurveTo(-0.48, 0.20, -0.42, 0.76, 0, 1.00);
  leaf_shape.bezierCurveTo(0.42, 0.76, 0.48, 0.20, 0, 0);
  leaf_shape.closePath();

  const flower_petalsGeom = new THREE.ShapeGeometry(petal_shape, 12);
  const flower_petal_outlinesGeom = flower_petalsGeom;
  const flower_centersGeom = new THREE.CircleGeometry(1, 18);
  const flower_stamensGeom = new THREE.CircleGeometry(1, 10);
  const painted_leavesGeom = new THREE.ShapeGeometry(leaf_shape, 10);
  const painted_budsGeom = flower_petalsGeom;

  const outer_radius_samples = [
    { y: 0.120, r: 0.200 },
    { y: 0.150, r: 0.290 },
    { y: 0.220, r: 0.380 },
    { y: 0.340, r: 0.480 },
    { y: 0.490, r: 0.560 },
    { y: 0.650, r: 0.620 },
    { y: 0.780, r: 0.660 },
    { y: 0.820, r: 0.670 },
  ];
  const inner_radius_samples = [
    { y: 0.220, r: 0.000 },
    { y: 0.230, r: 0.180 },
    { y: 0.270, r: 0.290 },
    { y: 0.350, r: 0.390 },
    { y: 0.480, r: 0.480 },
    { y: 0.620, r: 0.550 },
    { y: 0.760, r: 0.600 },
    { y: 0.820, r: 0.625 },
  ];

  function interpolateRadius(samples, y) {
    if (y <= samples[0].y) return samples[0].r;
    for (let i = 1; i < samples.length; i++) {
      if (y <= samples[i].y) {
        const a = samples[i - 1];
        const b = samples[i];
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return samples[samples.length - 1].r;
  }

  function outerRadiusAt(y) {
    return interpolateRadius(outer_radius_samples, y);
  }

  function innerRadiusAt(y) {
    return interpolateRadius(inner_radius_samples, y);
  }

  function surfacePose(type, angle, y, extra) {
    const inner = type === "inner";
    const radius = inner ? innerRadiusAt(y) : outerRadiusAt(y);
    const epsilon = 0.002;
    const slope =
      (inner ? innerRadiusAt(y + epsilon) - innerRadiusAt(y - epsilon) :
        outerRadiusAt(y + epsilon) - outerRadiusAt(y - epsilon)) /
      (epsilon * 2);

    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const normal = inner
      ? new THREE.Vector3(-cosine, slope, -sine).normalize()
      : new THREE.Vector3(cosine, -slope, sine).normalize();

    const position = new THREE.Vector3(
      cosine * radius,
      y,
      sine * radius
    ).addScaledVector(normal, extra);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, quaternion };
  }

  const petal_outline_matrices = [];
  const petal_fill_matrices = [];
  const center_matrices = [];
  const stamen_matrices = [];
  const leaf_matrices = [];
  const bud_outline_matrices = [];
  const bud_fill_matrices = [];

  function addPetalMatrix(angle, y, rotation, width, length, inner) {
    const type = inner ? "inner" : "outer";
    const outline_pose = surfacePose(type, angle, y, 0.004);
    const fill_pose = surfacePose(type, angle, y, 0.006);
    const local_rotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rotation
    );
    const outline_quaternion = outline_pose.quaternion.clone().multiply(local_rotation);
    const fill_quaternion = fill_pose.quaternion.clone().multiply(local_rotation);

    petal_outline_matrices.push(
      new THREE.Matrix4().compose(
        outline_pose.position,
        outline_quaternion,
        new THREE.Vector3(width * 1.10, length * 1.08, 1)
      )
    );
    petal_fill_matrices.push(
      new THREE.Matrix4().compose(
        fill_pose.position,
        fill_quaternion,
        new THREE.Vector3(width, length, 1)
      )
    );
  }

  function addFlower(angle, y, size, inner) {
    const radius = inner ? innerRadiusAt(y) : outerRadiusAt(y);
    const petal_width = size * 0.46;
    const petal_length = size * 0.72;

    for (let i = 0; i < 5; i++) {
      const direction = i / 5 * Math.PI * 2;
      const local_x = Math.cos(direction) * petal_length * 0.34;
      const local_y = Math.sin(direction) * petal_length * 0.34;
      const petal_angle = angle - local_x / Math.max(radius, 0.1);
      addPetalMatrix(
        petal_angle,
        y + local_y,
        direction - Math.PI / 2,
        petal_width,
        petal_length,
        inner
      );
    }

    const center_pose = surfacePose(inner ? "inner" : "outer", angle, y, 0.008);
    center_matrices.push(
      new THREE.Matrix4().compose(
        center_pose.position,
        center_pose.quaternion,
        new THREE.Vector3(size * 0.19, size * 0.19, 1)
      )
    );

    for (let i = 0; i < 5; i++) {
      const direction = i / 5 * Math.PI * 2;
      const local_x = Math.cos(direction) * size * 0.13;
      const local_y = Math.sin(direction) * size * 0.13;
      const dot_angle = angle - local_x / Math.max(radius, 0.1);
      const dot_pose = surfacePose(inner ? "inner" : "outer", dot_angle, y + local_y, 0.009);
      stamen_matrices.push(
        new THREE.Matrix4().compose(
          dot_pose.position,
          dot_pose.quaternion,
          new THREE.Vector3(size * 0.045, size * 0.045, 1)
        )
      );
    }
  }

  function addLeaf(angle, y, rotation, width, length, inner) {
    const pose = surfacePose(inner ? "inner" : "outer", angle, y, 0.006);
    const local_rotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rotation
    );
    const quaternion = pose.quaternion.clone().multiply(local_rotation);
    leaf_matrices.push(
      new THREE.Matrix4().compose(
        pose.position,
        quaternion,
        new THREE.Vector3(width, length, 1)
      )
    );
  }

  function addBud(angle, y, rotation, width, length, inner) {
    const type = inner ? "inner" : "outer";
    const outline_pose = surfacePose(type, angle, y, 0.004);
    const fill_pose = surfacePose(type, angle, y, 0.006);
    const local_rotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rotation
    );
    bud_outline_matrices.push(
      new THREE.Matrix4().compose(
        outline_pose.position,
        outline_pose.quaternion.clone().multiply(local_rotation),
        new THREE.Vector3(width * 1.12, length * 1.08, 1)
      )
    );
    bud_fill_matrices.push(
      new THREE.Matrix4().compose(
        fill_pose.position,
        fill_pose.quaternion.clone().multiply(local_rotation),
        new THREE.Vector3(width, length, 1)
      )
    );
  }

  function addSurfaceVine(control_points, inner) {
    const points = [];
    for (let i = 0; i < control_points.length - 1; i++) {
      const start = control_points[i];
      const end = control_points[i + 1];
      for (let j = 0; j < 4; j++) {
        const t = j / 4;
        const angle = start[0] + (end[0] - start[0]) * t;
        const y = start[1] + (end[1] - start[1]) * t;
        points.push(surfacePose(inner ? "inner" : "outer", angle, y, 0.005).position);
      }
    }
    const last = control_points[control_points.length - 1];
    points.push(surfacePose(inner ? "inner" : "outer", last[0], last[1], 0.005).position);
    return points;
  }

  const outer_main_vine_points = addSurfaceVine([
    [2.30, 0.270],
    [2.08, 0.340],
    [1.82, 0.410],
    [1.55, 0.340],
    [1.25, 0.310],
    [0.95, 0.350],
    [0.72, 0.470],
  ], false);
  const outer_main_vineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(outer_main_vine_points, false, "centripetal"),
    48,
    0.0045,
    7,
    false
  );
  const outer_main_vine = new THREE.Mesh(outer_main_vineGeom, painted_stemsMat);
  bowl_group.add(outer_main_vine);

  const outer_left_branch_points = addSurfaceVine([
    [1.82, 0.405],
    [1.98, 0.485],
    [2.10, 0.565],
    [2.18, 0.645],
  ], false);
  const outer_left_branchGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(outer_left_branch_points, false, "centripetal"),
    24,
    0.004,
    7,
    false
  );
  const outer_left_branch = new THREE.Mesh(outer_left_branchGeom, painted_stemsMat);
  bowl_group.add(outer_left_branch);

  const outer_center_branch_points = addSurfaceVine([
    [1.55, 0.340],
    [1.48, 0.420],
    [1.40, 0.505],
    [1.34, 0.585],
  ], false);
  const outer_center_branchGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(outer_center_branch_points, false, "centripetal"),
    24,
    0.004,
    7,
    false
  );
  const outer_center_branch = new THREE.Mesh(outer_center_branchGeom, painted_stemsMat);
  bowl_group.add(outer_center_branch);

  const outer_right_branch_points = addSurfaceVine([
    [1.00, 0.345],
    [0.88, 0.430],
    [0.78, 0.520],
    [0.70, 0.620],
  ], false);
  const outer_right_branchGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(outer_right_branch_points, false, "centripetal"),
    24,
    0.004,
    7,
    false
  );
  const outer_right_branch = new THREE.Mesh(outer_right_branchGeom, painted_stemsMat);
  bowl_group.add(outer_right_branch);

  const inner_vine_points = addSurfaceVine([
    [-2.30, 0.310],
    [-2.08, 0.360],
    [-1.84, 0.410],
    [-1.58, 0.450],
    [-1.34, 0.510],
    [-1.12, 0.580],
  ], true);
  const inner_vineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(inner_vine_points, false, "centripetal"),
    40,
    0.004,
    7,
    false
  );
  const inner_vine = new THREE.Mesh(inner_vineGeom, painted_stemsMat);
  bowl_group.add(inner_vine);

  const inner_branch_points = addSurfaceVine([
    [-1.58, 0.445],
    [-1.50, 0.510],
    [-1.42, 0.575],
    [-1.36, 0.650],
  ], true);
  const inner_branchGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(inner_branch_points, false, "centripetal"),
    20,
    0.0038,
    7,
    false
  );
  const inner_branch = new THREE.Mesh(inner_branchGeom, painted_stemsMat);
  bowl_group.add(inner_branch);

  addFlower(1.98, 0.485, 0.145, false);
  addFlower(1.43, 0.390, 0.150, false);
  addFlower(0.88, 0.470, 0.132, false);
  addFlower(1.15, 0.325, 0.095, false);
  addFlower(2.27, 0.385, 0.100, false);
  addFlower(1.72, 0.570, 0.086, false);
  addFlower(-1.57, 0.455, 0.145, true);
  addFlower(-1.16, 0.585, 0.092, true);

  addLeaf(2.18, 0.315, -1.05, 0.070, 0.145, false);
  addLeaf(2.03, 0.575, 0.72, 0.060, 0.130, false);
  addLeaf(1.82, 0.345, -1.10, 0.075, 0.155, false);
  addLeaf(1.61, 0.455, 0.82, 0.068, 0.145, false);
  addLeaf(1.34, 0.300, -1.12, 0.078, 0.160, false);
  addLeaf(1.23, 0.405, 0.78, 0.065, 0.140, false);
  addLeaf(1.00, 0.315, -1.18, 0.072, 0.150, false);
  addLeaf(0.80, 0.555, 0.70, 0.060, 0.132, false);
  addLeaf(0.70, 0.610, -0.72, 0.052, 0.118, false);
  addLeaf(2.28, 0.520, -0.78, 0.055, 0.120, false);
  addLeaf(1.48, 0.520, -0.82, 0.058, 0.128, false);
  addLeaf(1.30, 0.575, 0.70, 0.052, 0.115, false);

  addLeaf(-2.10, 0.350, -1.00, 0.060, 0.125, true);
  addLeaf(-1.88, 0.420, 0.82, 0.058, 0.128, true);
  addLeaf(-1.38, 0.520, -0.82, 0.055, 0.122, true);
  addLeaf(-1.24, 0.620, 0.72, 0.050, 0.110, true);
  addLeaf(-1.05, 0.535, -0.72, 0.048, 0.105, true);

  addBud(2.19, 0.650, -0.18, 0.045, 0.105, false);
  addBud(1.33, 0.590, 0.20, 0.042, 0.098, false);
  addBud(0.69, 0.625, -0.22, 0.044, 0.105, false);
  addBud(0.78, 0.535, 0.65, 0.036, 0.086, false);
  addBud(-1.36, 0.655, -0.18, 0.040, 0.095, true);

  function createInstancedPart(geometry, material, matrices) {
    const part = new THREE.InstancedMesh(geometry, material, matrices.length);
    for (let i = 0; i < matrices.length; i++) {
      part.setMatrixAt(i, matrices[i]);
    }
    part.instanceMatrix.needsUpdate = true;
    return part;
  }

  const flower_petal_outlines = createInstancedPart(
    flower_petal_outlinesGeom,
    flower_petal_outlinesMat,
    petal_outline_matrices
  );
  bowl_group.add(flower_petal_outlines);

  const flower_petals = createInstancedPart(
    flower_petalsGeom,
    flower_petalsMat,
    petal_fill_matrices
  );
  bowl_group.add(flower_petals);

  const flower_centers = createInstancedPart(
    flower_centersGeom,
    flower_centersMat,
    center_matrices
  );
  bowl_group.add(flower_centers);

  const flower_stamens = createInstancedPart(
    flower_stamensGeom,
    flower_petalsMat,
    stamen_matrices
  );
  bowl_group.add(flower_stamens);

  const painted_leaves = createInstancedPart(
    painted_leavesGeom,
    painted_leavesMat,
    leaf_matrices
  );
  bowl_group.add(painted_leaves);

  const painted_bud_outlines = createInstancedPart(
    painted_budsGeom,
    flower_petal_outlinesMat,
    bud_outline_matrices
  );
  bowl_group.add(painted_bud_outlines);

  const painted_buds = createInstancedPart(
    painted_budsGeom,
    flower_petalsMat,
    bud_fill_matrices
  );
  bowl_group.add(painted_buds);

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