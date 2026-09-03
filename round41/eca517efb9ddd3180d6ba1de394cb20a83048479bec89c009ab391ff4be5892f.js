export default function generate(THREE) {
  const vase = new THREE.Group();
  vase.name = "vase";

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.99,
    ior: 1.5,
    transparent: true,
    opacity: 0.26,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const cutMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.78,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const etchedMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce4e7,
    metalness: 0.0,
    roughness: 0.22,
    transmission: 0.68,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.36),
    new THREE.Vector2(0.45, 0.36),
    new THREE.Vector2(0.56, 0.40),
    new THREE.Vector2(0.64, 0.52),
    new THREE.Vector2(0.70, 0.72),
    new THREE.Vector2(0.73, 0.98),
    new THREE.Vector2(0.73, 1.25),
    new THREE.Vector2(0.69, 1.55),
    new THREE.Vector2(0.61, 1.85),
    new THREE.Vector2(0.50, 2.15),
    new THREE.Vector2(0.39, 2.45),
    new THREE.Vector2(0.34, 2.70),
    new THREE.Vector2(0.33, 2.95),
    new THREE.Vector2(0.33, 3.20),
    new THREE.Vector2(0.36, 3.45),
    new THREE.Vector2(0.43, 3.70),
    new THREE.Vector2(0.52, 3.92),
    new THREE.Vector2(0.63, 4.08),
    new THREE.Vector2(0.69, 4.13),
    new THREE.Vector2(0.68, 4.18),
    new THREE.Vector2(0.58, 4.18),
    new THREE.Vector2(0.55, 4.10),
    new THREE.Vector2(0.48, 3.91),
    new THREE.Vector2(0.39, 3.68),
    new THREE.Vector2(0.32, 3.43),
    new THREE.Vector2(0.29, 3.18),
    new THREE.Vector2(0.29, 2.95),
    new THREE.Vector2(0.30, 2.72),
    new THREE.Vector2(0.35, 2.48),
    new THREE.Vector2(0.46, 2.18),
    new THREE.Vector2(0.57, 1.86),
    new THREE.Vector2(0.65, 1.55),
    new THREE.Vector2(0.69, 1.25),
    new THREE.Vector2(0.69, 0.98),
    new THREE.Vector2(0.66, 0.74),
    new THREE.Vector2(0.60, 0.55),
    new THREE.Vector2(0.52, 0.45),
    new THREE.Vector2(0.43, 0.42),
    new THREE.Vector2(0.00, 0.42),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, glassMat);
  body.name = "body";
  vase.add(body);

  const pedestal_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.58, 0.00),
    new THREE.Vector2(0.65, 0.015),
    new THREE.Vector2(0.68, 0.050),
    new THREE.Vector2(0.67, 0.090),
    new THREE.Vector2(0.62, 0.130),
    new THREE.Vector2(0.54, 0.170),
    new THREE.Vector2(0.48, 0.210),
    new THREE.Vector2(0.45, 0.260),
    new THREE.Vector2(0.44, 0.320),
    new THREE.Vector2(0.45, 0.360),
    new THREE.Vector2(0.00, 0.360),
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 64);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, glassMat);
  pedestal_base.name = "pedestal_base";
  vase.add(pedestal_base);

  const base_bottom_rimGeom = new THREE.TorusGeometry(0.645, 0.024, 12, 64);
  const base_bottom_rim = new THREE.Mesh(base_bottom_rimGeom, cutMat);
  base_bottom_rim.name = "base_bottom_rim";
  base_bottom_rim.rotation.x = Math.PI / 2;
  base_bottom_rim.position.y = 0.055;
  vase.add(base_bottom_rim);

  const base_upper_rimGeom = new THREE.TorusGeometry(0.445, 0.018, 10, 64);
  const base_upper_rim = new THREE.Mesh(base_upper_rimGeom, cutMat);
  base_upper_rim.name = "base_upper_rim";
  base_upper_rim.rotation.x = Math.PI / 2;
  base_upper_rim.position.y = 0.335;
  vase.add(base_upper_rim);

  const body_base_collarGeom = new THREE.TorusGeometry(0.455, 0.015, 10, 64);
  const body_base_collar = new THREE.Mesh(body_base_collarGeom, cutMat);
  body_base_collar.name = "body_base_collar";
  body_base_collar.rotation.x = Math.PI / 2;
  body_base_collar.position.y = 0.395;
  vase.add(body_base_collar);

  const mouth_outer_rimGeom = new THREE.TorusGeometry(0.645, 0.045, 14, 72);
  const mouth_outer_rim = new THREE.Mesh(mouth_outer_rimGeom, glassMat);
  mouth_outer_rim.name = "mouth_outer_rim";
  mouth_outer_rim.rotation.x = Math.PI / 2;
  mouth_outer_rim.position.y = 4.145;
  vase.add(mouth_outer_rim);

  const mouth_inner_rimGeom = new THREE.TorusGeometry(0.575, 0.018, 10, 64);
  const mouth_inner_rim = new THREE.Mesh(mouth_inner_rimGeom, cutMat);
  mouth_inner_rim.name = "mouth_inner_rim";
  mouth_inner_rim.rotation.x = Math.PI / 2;
  mouth_inner_rim.position.y = 4.158;
  vase.add(mouth_inner_rim);

  const radiusStops = [
    [0.40, 0.56],
    [0.52, 0.64],
    [0.72, 0.70],
    [0.98, 0.73],
    [1.25, 0.73],
    [1.55, 0.69],
    [1.85, 0.61],
    [2.15, 0.50],
    [2.45, 0.39],
    [2.70, 0.34],
    [2.95, 0.33],
    [3.20, 0.33],
    [3.45, 0.36],
    [3.70, 0.43],
    [3.92, 0.52],
    [4.08, 0.63],
  ];

  function radiusAt(y) {
    if (y <= radiusStops[0][0]) return radiusStops[0][1];
    for (let i = 1; i < radiusStops.length; i++) {
      const previous = radiusStops[i - 1];
      const current = radiusStops[i];
      if (y <= current[0]) {
        const t = (y - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return radiusStops[radiusStops.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const radius = radiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  const starShape = new THREE.Shape();
  for (let i = 0; i < 16; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 8;
    let radius;
    if (i % 2 === 0) {
      const pointIndex = i / 2;
      radius = pointIndex % 2 === 0 ? 1.0 : 0.70;
    } else {
      radius = 0.17;
    }
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  const starGeom = new THREE.ShapeGeometry(starShape);
  const star_centerGeom = new THREE.CircleGeometry(1, 18);
  const localNormal = new THREE.Vector3(0, 0, 1);
  const dummy = new THREE.Object3D();

  function createSurfaceStar(name, angle, y, size, material) {
    const star_group = new THREE.Group();
    star_group.name = name;

    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    star_group.position.copy(surfacePoint(angle, y, 0.007));
    star_group.quaternion.setFromUnitVectors(localNormal, normal);

    const star_star = new THREE.Mesh(starGeom, material);
    star_star.name = name + "_star";
    star_star.scale.setScalar(size);
    star_group.add(star_star);

    const star_center = new THREE.Mesh(star_centerGeom, material);
    star_center.name = name + "_center";
    star_center.scale.setScalar(size * 0.13);
    star_center.position.z = 0.003;
    star_group.add(star_center);

    return star_group;
  }

  function createStarInstances(name, specs, material) {
    const instances = new THREE.InstancedMesh(
      starGeom,
      material,
      specs.length
    );
    instances.name = name;

    for (let i = 0; i < specs.length; i++) {
      const angle = specs[i][0];
      const y = specs[i][1];
      const size = specs[i][2];
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

      dummy.position.copy(surfacePoint(angle, y, 0.007));
      dummy.quaternion.setFromUnitVectors(localNormal, normal);
      dummy.scale.setScalar(size);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    }
    instances.instanceMatrix.needsUpdate = true;
    return instances;
  }

  const upper_main_star = createSurfaceStar(
    "upper_main_star",
    Math.PI / 2,
    2.72,
    0.36,
    etchedMat
  );
  vase.add(upper_main_star);

  const upper_left_star = createSurfaceStar(
    "upper_left_star",
    2.30,
    2.66,
    0.24,
    etchedMat
  );
  vase.add(upper_left_star);

  const upper_right_star = createSurfaceStar(
    "upper_right_star",
    0.84,
    2.66,
    0.24,
    etchedMat
  );
  vase.add(upper_right_star);

  const lower_left_star = createSurfaceStar(
    "lower_left_star",
    2.08,
    1.22,
    0.36,
    etchedMat
  );
  vase.add(lower_left_star);

  const lower_right_star = createSurfaceStar(
    "lower_right_star",
    1.06,
    1.22,
    0.36,
    etchedMat
  );
  vase.add(lower_right_star);

  const lower_center_star = createSurfaceStar(
    "lower_center_star",
    Math.PI / 2,
    0.72,
    0.34,
    etchedMat
  );
  vase.add(lower_center_star);

  const middle_front_star = createSurfaceStar(
    "middle_front_star",
    Math.PI / 2,
    1.38,
    0.21,
    etchedMat
  );
  vase.add(middle_front_star);

  const upper_rear_star = createSurfaceStar(
    "upper_rear_star",
    -Math.PI / 2,
    2.72,
    0.31,
    etchedMat
  );
  vase.add(upper_rear_star);

  const upper_rear_left_star = createSurfaceStar(
    "upper_rear_left_star",
    -2.30,
    2.66,
    0.22,
    etchedMat
  );
  vase.add(upper_rear_left_star);

  const upper_rear_right_star = createSurfaceStar(
    "upper_rear_right_star",
    -0.84,
    2.66,
    0.22,
    etchedMat
  );
  vase.add(upper_rear_right_star);

  const lower_rear_left_star = createSurfaceStar(
    "lower_rear_left_star",
    -2.08,
    1.22,
    0.33,
    etchedMat
  );
  vase.add(lower_rear_left_star);

  const lower_rear_right_star = createSurfaceStar(
    "lower_rear_right_star",
    -1.06,
    1.22,
    0.33,
    etchedMat
  );
  vase.add(lower_rear_right_star);

  const lower_rear_center_star = createSurfaceStar(
    "lower_rear_center_star",
    -Math.PI / 2,
    0.72,
    0.31,
    etchedMat
  );
  vase.add(lower_rear_center_star);

  const left_side_star = createSurfaceStar(
    "left_side_star",
    3.00,
    1.18,
    0.29,
    etchedMat
  );
  vase.add(left_side_star);

  const right_side_star = createSurfaceStar(
    "right_side_star",
    0.14,
    1.18,
    0.29,
    etchedMat
  );
  vase.add(right_side_star);

  const lower_front_specs = [
    [0.35, 0.92, 0.18],
    [0.78, 1.48, 0.17],
    [1.20, 0.98, 0.19],
    [1.62, 1.55, 0.17],
    [2.05, 0.90, 0.18],
    [2.48, 1.48, 0.17],
    [2.90, 0.98, 0.19],
  ];
  const lower_front_stars = createStarInstances(
    "lower_front_stars",
    lower_front_specs,
    etchedMat
  );
  vase.add(lower_front_stars);

  const upper_front_specs = [
    [0.30, 2.52, 0.15],
    [0.75, 2.88, 0.16],
    [1.20, 2.48, 0.15],
    [1.65, 2.92, 0.16],
    [2.10, 2.48, 0.15],
    [2.55, 2.88, 0.16],
    [3.00, 2.52, 0.15],
  ];
  const upper_front_stars = createStarInstances(
    "upper_front_stars",
    upper_front_specs,
    etchedMat
  );
  vase.add(upper_front_stars);

  const lower_rear_specs = [
    [-0.35, 0.92, 0.18],
    [-0.78, 1.48, 0.17],
    [-1.20, 0.98, 0.19],
    [-1.62, 1.55, 0.17],
    [-2.05, 0.90, 0.18],
    [-2.48, 1.48, 0.17],
    [-2.90, 0.98, 0.19],
  ];
  const lower_rear_stars = createStarInstances(
    "lower_rear_stars",
    lower_rear_specs,
    etchedMat
  );
  vase.add(lower_rear_stars);

  const upper_rear_specs = [
    [-0.30, 2.52, 0.15],
    [-0.75, 2.88, 0.16],
    [-1.20, 2.48, 0.15],
    [-1.65, 2.92, 0.16],
    [-2.10, 2.48, 0.15],
    [-2.55, 2.88, 0.16],
    [-3.00, 2.52, 0.15],
  ];
  const upper_rear_stars = createStarInstances(
    "upper_rear_stars",
    upper_rear_specs,
    etchedMat
  );
  vase.add(upper_rear_stars);

  const cut_leafShape = new THREE.Shape();
  cut_leafShape.moveTo(0, -0.50);
  cut_leafShape.bezierCurveTo(-0.34, -0.28, -0.32, 0.24, 0, 0.50);
  cut_leafShape.bezierCurveTo(0.32, 0.24, 0.34, -0.28, 0, -0.50);
  cut_leafShape.closePath();

  const cut_leafGeom = new THREE.ShapeGeometry(cut_leafShape);

  function createLeafInstances(name, specs, material) {
    const instances = new THREE.InstancedMesh(
      cut_leafGeom,
      material,
      specs.length
    );
    instances.name = name;

    const spin = new THREE.Quaternion();
    for (let i = 0; i < specs.length; i++) {
      const angle = specs[i][0];
      const y = specs[i][1];
      const width = specs[i][2];
      const height = specs[i][3];
      const rotation = specs[i][4];
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

      dummy.position.copy(surfacePoint(angle, y, 0.006));
      dummy.quaternion.setFromUnitVectors(localNormal, normal);
      spin.setFromAxisAngle(localNormal, rotation);
      dummy.quaternion.multiply(spin);
      dummy.scale.set(width, height, 1);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    }
    instances.instanceMatrix.needsUpdate = true;
    return instances;
  }

  const lower_leaf_specs = [
    [0.30, 0.60, 0.18, 0.40, -0.55],
    [0.55, 1.65, 0.17, 0.42, 0.48],
    [0.88, 0.52, 0.18, 0.38, 0.62],
    [1.12, 1.72, 0.16, 0.40, -0.52],
    [1.45, 0.48, 0.18, 0.38, -0.65],
    [1.78, 1.72, 0.16, 0.40, 0.52],
    [2.12, 0.52, 0.18, 0.38, 0.62],
    [2.45, 1.72, 0.16, 0.40, -0.52],
    [2.78, 0.48, 0.18, 0.38, 0.65],
    [3.05, 1.62, 0.17, 0.42, -0.48],
  ];
  const lower_cut_leaves = createLeafInstances(
    "lower_cut_leaves",
    lower_leaf_specs,
    cutMat
  );
  vase.add(lower_cut_leaves);

  const upper_leaf_specs = [
    [0.32, 2.42, 0.13, 0.34, -0.52],
    [0.72, 3.00, 0.12, 0.32, 0.45],
    [1.12, 2.38, 0.13, 0.34, 0.55],
    [1.52, 3.02, 0.12, 0.32, -0.45],
    [1.92, 2.38, 0.13, 0.34, -0.55],
    [2.32, 3.00, 0.12, 0.32, 0.45],
    [2.72, 2.42, 0.13, 0.34, 0.52],
  ];
  const upper_cut_leaves = createLeafInstances(
    "upper_cut_leaves",
    upper_leaf_specs,
    cutMat
  );
  vase.add(upper_cut_leaves);

  const rear_leaf_specs = [];
  for (let i = 0; i < lower_leaf_specs.length; i++) {
    const spec = lower_leaf_specs[i];
    rear_leaf_specs.push([
      -spec[0],
      spec[1],
      spec[2],
      spec[3],
      -spec[4],
    ]);
  }
  const lower_rear_cut_leaves = createLeafInstances(
    "lower_rear_cut_leaves",
    rear_leaf_specs,
    cutMat
  );
  vase.add(lower_rear_cut_leaves);

  const rear_upper_leaf_specs = [];
  for (let i = 0; i < upper_leaf_specs.length; i++) {
    const spec = upper_leaf_specs[i];
    rear_upper_leaf_specs.push([
      -spec[0],
      spec[1],
      spec[2],
      spec[3],
      -spec[4],
    ]);
  }
  const upper_rear_cut_leaves = createLeafInstances(
    "upper_rear_cut_leaves",
    rear_upper_leaf_specs,
    cutMat
  );
  vase.add(upper_rear_cut_leaves);

  function createSurfaceVine(name, angle0, y0, angle1, y1, bend) {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const angle =
        angle0 +
        (angle1 - angle0) * t +
        Math.sin(t * Math.PI) * bend;
      const y = y0 + (y1 - y0) * t;
      points.push(surfacePoint(angle, y, 0.006));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const vineGeom = new THREE.TubeGeometry(curve, 28, 0.0035, 6, false);
    const vine = new THREE.Mesh(vineGeom, etchedMat);
    vine.name = name;
    return vine;
  }

  const lower_left_vine = createSurfaceVine(
    "lower_left_vine",
    2.72,
    0.50,
    2.12,
    1.58,
    0.12
  );
  vase.add(lower_left_vine);

  const lower_right_vine = createSurfaceVine(
    "lower_right_vine",
    0.42,
    0.50,
    1.02,
    1.58,
    -0.12
  );
  vase.add(lower_right_vine);

  const middle_left_vine = createSurfaceVine(
    "middle_left_vine",
    2.82,
    1.02,
    2.30,
    1.92,
    -0.10
  );
  vase.add(middle_left_vine);

  const middle_right_vine = createSurfaceVine(
    "middle_right_vine",
    0.32,
    1.02,
    0.84,
    1.92,
    0.10
  );
  vase.add(middle_right_vine);

  const upper_left_vine = createSurfaceVine(
    "upper_left_vine",
    2.76,
    2.34,
    2.28,
    3.02,
    0.08
  );
  vase.add(upper_left_vine);

  const upper_right_vine = createSurfaceVine(
    "upper_right_vine",
    0.38,
    2.34,
    0.86,
    3.02,
    -0.08
  );
  vase.add(upper_right_vine);

  const rear_lower_left_vine = createSurfaceVine(
    "rear_lower_left_vine",
    -2.72,
    0.50,
    -2.12,
    1.58,
    -0.12
  );
  vase.add(rear_lower_left_vine);

  const rear_lower_right_vine = createSurfaceVine(
    "rear_lower_right_vine",
    -0.42,
    0.50,
    -1.02,
    1.58,
    0.12
  );
  vase.add(rear_lower_right_vine);

  const rear_middle_left_vine = createSurfaceVine(
    "rear_middle_left_vine",
    -2.82,
    1.02,
    -2.30,
    1.92,
    0.10
  );
  vase.add(rear_middle_left_vine);

  const rear_middle_right_vine = createSurfaceVine(
    "rear_middle_right_vine",
    -0.32,
    1.02,
    -0.84,
    1.92,
    -0.10
  );
  vase.add(rear_middle_right_vine);

  const rear_upper_left_vine = createSurfaceVine(
    "rear_upper_left_vine",
    -2.76,
    2.34,
    -2.28,
    3.02,
    -0.08
  );
  vase.add(rear_upper_left_vine);

  const rear_upper_right_vine = createSurfaceVine(
    "rear_upper_right_vine",
    -0.38,
    2.34,
    -0.86,
    3.02,
    0.08
  );
  vase.add(rear_upper_right_vine);

  function fitToUnitCube(root) {
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

  fitToUnitCube(vase);
  return vase;
}