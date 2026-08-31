export default function generate(THREE) {
  const root = new THREE.Group();

  const body_radius = 0.405;
  const body_height = 1.16;
  const inner_radius = 0.355;

  const mug_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const interior_baseMat = new THREE.MeshStandardMaterial({
    color: 0x0d0d0f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const ornamentMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const mug_body_profile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.340, 0.000),
    new THREE.Vector2(0.375, 0.015),
    new THREE.Vector2(0.397, 0.055),
    new THREE.Vector2(body_radius, 0.130),
    new THREE.Vector2(body_radius, 1.060),
    new THREE.Vector2(0.402, 1.115),
    new THREE.Vector2(0.390, 1.145),
    new THREE.Vector2(0.370, body_height),
    new THREE.Vector2(0.345, 1.150),
    new THREE.Vector2(0.360, 1.115),
    new THREE.Vector2(inner_radius, 1.070),
    new THREE.Vector2(inner_radius, 0.150),
    new THREE.Vector2(0.340, 0.110),
    new THREE.Vector2(0.000, 0.110),
  ];
  const mug_bodyGeom = new THREE.LatheGeometry(mug_body_profile, 64);
  const mug_body = new THREE.Mesh(mug_bodyGeom, mug_bodyMat);
  root.add(mug_body);

  const interior_baseGeom = new THREE.CircleGeometry(0.338, 48);
  const interior_base = new THREE.Mesh(interior_baseGeom, interior_baseMat);
  interior_base.rotation.x = -Math.PI / 2;
  interior_base.position.y = 0.112;
  root.add(interior_base);

  const top_rimGeom = new THREE.TorusGeometry(0.3725, 0.025, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, mug_bodyMat);
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 1.147;
  root.add(top_rim);

  const handle_points = [
    new THREE.Vector3(0.365, 0.925, -0.020),
    new THREE.Vector3(0.500, 0.955, -0.020),
    new THREE.Vector3(0.650, 0.900, -0.020),
    new THREE.Vector3(0.735, 0.755, -0.020),
    new THREE.Vector3(0.750, 0.555, -0.020),
    new THREE.Vector3(0.700, 0.365, -0.020),
    new THREE.Vector3(0.555, 0.235, -0.020),
    new THREE.Vector3(0.365, 0.270, -0.020),
  ];
  const handle_curve = new THREE.CatmullRomCurve3(
    handle_points,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handle_curve,
    64,
    0.068,
    14,
    false
  );
  const handle = new THREE.Mesh(handleGeom, mug_bodyMat);
  root.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.085, 24, 14);

  const upper_handle_mount = new THREE.Mesh(handle_mountGeom, mug_bodyMat);
  upper_handle_mount.position.set(0.390, 0.915, -0.018);
  upper_handle_mount.scale.set(1.35, 0.82, 1.05);
  root.add(upper_handle_mount);

  const lower_handle_mount = new THREE.Mesh(handle_mountGeom, mug_bodyMat);
  lower_handle_mount.position.set(0.390, 0.270, -0.018);
  lower_handle_mount.scale.set(1.35, 0.82, 1.05);
  root.add(lower_handle_mount);

  const ornament_group = new THREE.Group();
  root.add(ornament_group);

  function surfacePoint(x, y, extra = 0.006) {
    const angle = Math.PI / 2 - x / body_radius;
    const radius = body_radius + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfaceNormal(x) {
    const angle = Math.PI / 2 - x / body_radius;
    return new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle)).normalize();
  }

  function addSurfaceTube(points, radius, closed = false) {
    const path_points = [];
    for (const point of points) {
      path_points.push(surfacePoint(point[0], point[1], 0.006));
    }
    const curve = new THREE.CatmullRomCurve3(
      path_points,
      closed,
      "centripetal"
    );
    const tubular_segments = closed
      ? Math.max(32, points.length * 3)
      : Math.max(20, (points.length - 1) * 7);
    const geometry = new THREE.TubeGeometry(
      curve,
      tubular_segments,
      radius,
      7,
      closed
    );
    const mesh = new THREE.Mesh(geometry, ornamentMat);
    ornament_group.add(mesh);
    return mesh;
  }

  function addSurfaceLoop(cx, cy, rx, ry, radius) {
    const points = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      points.push([
        cx + Math.cos(angle) * rx,
        cy + Math.sin(angle) * ry,
      ]);
    }
    return addSurfaceTube(points, radius, true);
  }

  const top_left_scroll = addSurfaceTube([
    [0.000, 0.805],
    [-0.070, 0.755],
    [-0.150, 0.690],
    [-0.235, 0.685],
    [-0.310, 0.735],
    [-0.330, 0.805],
    [-0.300, 0.850],
    [-0.260, 0.835],
    [-0.250, 0.790],
    [-0.280, 0.765],
  ], 0.010);

  const top_right_scroll = addSurfaceTube([
    [0.000, 0.805],
    [0.070, 0.755],
    [0.150, 0.690],
    [0.235, 0.685],
    [0.310, 0.735],
    [0.330, 0.805],
    [0.300, 0.850],
    [0.260, 0.835],
    [0.250, 0.790],
    [0.280, 0.765],
  ], 0.010);

  const top_center_stem = addSurfaceTube([
    [0.000, 0.810],
    [-0.012, 0.875],
    [0.012, 0.945],
    [0.000, 1.015],
  ], 0.010);

  const top_left_leaf_vein = addSurfaceTube([
    [-0.010, 0.815],
    [-0.060, 0.865],
    [-0.105, 0.915],
    [-0.125, 0.955],
  ], 0.007);

  const top_right_leaf_vein = addSurfaceTube([
    [0.010, 0.815],
    [0.060, 0.865],
    [0.105, 0.915],
    [0.125, 0.955],
  ], 0.007);

  const top_center_left_loop = addSurfaceLoop(
    -0.075, 0.855, 0.052, 0.070, 0.008
  );
  const top_center_right_loop = addSurfaceLoop(
    0.075, 0.855, 0.052, 0.070, 0.008
  );
  const top_left_outer_loop = addSurfaceLoop(
    -0.235, 0.850, 0.050, 0.070, 0.008
  );
  const top_right_outer_loop = addSurfaceLoop(
    0.235, 0.850, 0.050, 0.070, 0.008
  );

  const top_left_diagonal_stem = addSurfaceTube([
    [-0.285, 0.770],
    [-0.245, 0.835],
    [-0.205, 0.900],
    [-0.175, 0.965],
  ], 0.008);
  const top_right_diagonal_stem = addSurfaceTube([
    [0.285, 0.770],
    [0.245, 0.835],
    [0.205, 0.900],
    [0.175, 0.965],
  ], 0.008);

  const bottom_left_scroll = addSurfaceTube([
    [0.000, 0.355],
    [-0.070, 0.405],
    [-0.150, 0.475],
    [-0.235, 0.480],
    [-0.310, 0.430],
    [-0.330, 0.360],
    [-0.300, 0.315],
    [-0.260, 0.330],
    [-0.250, 0.375],
    [-0.280, 0.400],
  ], 0.010);

  const bottom_right_scroll = addSurfaceTube([
    [0.000, 0.355],
    [0.070, 0.405],
    [0.150, 0.475],
    [0.235, 0.480],
    [0.310, 0.430],
    [0.330, 0.360],
    [0.300, 0.315],
    [0.260, 0.330],
    [0.250, 0.375],
    [0.280, 0.400],
  ], 0.010);

  const bottom_center_stem = addSurfaceTube([
    [0.000, 0.350],
    [-0.012, 0.285],
    [0.012, 0.215],
    [0.000, 0.140],
  ], 0.010);

  const bottom_left_leaf_vein = addSurfaceTube([
    [-0.010, 0.345],
    [-0.060, 0.295],
    [-0.105, 0.245],
    [-0.125, 0.205],
  ], 0.007);

  const bottom_right_leaf_vein = addSurfaceTube([
    [0.010, 0.345],
    [0.060, 0.295],
    [0.105, 0.245],
    [0.125, 0.205],
  ], 0.007);

  const bottom_center_left_loop = addSurfaceLoop(
    -0.075, 0.305, 0.052, 0.068, 0.008
  );
  const bottom_center_right_loop = addSurfaceLoop(
    0.075, 0.305, 0.052, 0.068, 0.008
  );
  const bottom_left_outer_loop = addSurfaceLoop(
    -0.235, 0.310, 0.050, 0.068, 0.008
  );
  const bottom_right_outer_loop = addSurfaceLoop(
    0.235, 0.310, 0.050, 0.068, 0.008
  );

  const bottom_left_diagonal_stem = addSurfaceTube([
    [-0.285, 0.385],
    [-0.245, 0.325],
    [-0.205, 0.260],
    [-0.175, 0.195],
  ], 0.008);
  const bottom_right_diagonal_stem = addSurfaceTube([
    [0.285, 0.385],
    [0.245, 0.325],
    [0.205, 0.260],
    [0.175, 0.195],
  ], 0.008);

  const left_flower_vine = addSurfaceTube([
    [-0.285, 0.390],
    [-0.315, 0.455],
    [-0.290, 0.525],
    [-0.250, 0.585],
  ], 0.007);

  const right_flower_vine = addSurfaceTube([
    [0.285, 0.390],
    [0.315, 0.455],
    [0.290, 0.525],
    [0.250, 0.585],
  ], 0.007);

  const center_flower_left_curl = addSurfaceTube([
    [-0.015, 0.520],
    [-0.070, 0.485],
    [-0.115, 0.500],
    [-0.120, 0.545],
    [-0.095, 0.560],
  ], 0.007);

  const center_flower_right_curl = addSurfaceTube([
    [0.015, 0.520],
    [0.070, 0.485],
    [0.115, 0.500],
    [0.120, 0.545],
    [0.095, 0.560],
  ], 0.007);

  const fleur_de_lis_shape = new THREE.Shape();
  fleur_de_lis_shape.moveTo(0.000, -0.105);
  fleur_de_lis_shape.bezierCurveTo(
    -0.018, -0.072,
    -0.038, -0.035,
    -0.030, -0.005
  );
  fleur_de_lis_shape.bezierCurveTo(
    -0.024, 0.025,
    -0.012, 0.052,
    0.000, 0.070
  );
  fleur_de_lis_shape.bezierCurveTo(
    0.012, 0.052,
    0.024, 0.025,
    0.030, -0.005
  );
  fleur_de_lis_shape.bezierCurveTo(
    0.038, -0.035,
    0.018, -0.072,
    0.000, -0.105
  );
  fleur_de_lis_shape.closePath();

  const fleur_de_lisGeom = new THREE.ShapeGeometry(
    fleur_de_lis_shape,
    12
  );
  const fleur_de_lis_motifs = new THREE.InstancedMesh(
    fleur_de_lisGeom,
    ornamentMat,
    6
  );

  const fleur_de_lis_data = [
    [0.000, 0.950, 0.00, 1.00, 1.00],
    [-0.205, 0.875, 0.55, 0.85, 0.90],
    [0.205, 0.875, -0.55, 0.85, 0.90],
    [0.000, 0.185, Math.PI, 1.00, 1.00],
    [-0.205, 0.270, Math.PI - 0.55, 0.85, 0.90],
    [0.205, 0.270, Math.PI + 0.55, 0.85, 0.90],
  ];

  const decal_dummy = new THREE.Object3D();
  const decal_forward = new THREE.Vector3(0, 0, 1);

  function setSurfaceInstance(mesh, index, x, y, rotation, sx, sy, extra) {
    const normal = surfaceNormal(x);
    decal_dummy.position.copy(surfacePoint(x, y, extra));
    decal_dummy.quaternion.setFromUnitVectors(decal_forward, normal);
    decal_dummy.rotateZ(rotation);
    decal_dummy.scale.set(sx, sy, 1);
    decal_dummy.updateMatrix();
    mesh.setMatrixAt(index, decal_dummy.matrix);
  }

  for (let i = 0; i < fleur_de_lis_data.length; i++) {
    const data = fleur_de_lis_data[i];
    setSurfaceInstance(
      fleur_de_lis_motifs,
      i,
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      0.008
    );
  }
  fleur_de_lis_motifs.instanceMatrix.needsUpdate = true;
  ornament_group.add(fleur_de_lis_motifs);

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0.000, -0.055);
  leaf_shape.bezierCurveTo(
    -0.034, -0.020,
    -0.032, 0.030,
    0.000, 0.065
  );
  leaf_shape.bezierCurveTo(
    0.032, 0.030,
    0.034, -0.020,
    0.000, -0.055
  );
  leaf_shape.closePath();

  const leaf_motifsGeom = new THREE.ShapeGeometry(leaf_shape, 10);
  const leaf_data = [
    [-0.075, 0.900, -0.55, 0.85, 0.95],
    [0.075, 0.900, 0.55, 0.85, 0.95],
    [-0.145, 0.850, -1.00, 0.75, 0.82],
    [0.145, 0.850, 1.00, 0.75, 0.82],
    [-0.285, 0.805, -0.40, 0.72, 0.80],
    [0.285, 0.805, 0.40, 0.72, 0.80],
    [-0.075, 0.270, -2.55, 0.85, 0.95],
    [0.075, 0.270, 2.55, 0.85, 0.95],
    [-0.145, 0.320, -2.10, 0.75, 0.82],
    [0.145, 0.320, 2.10, 0.75, 0.82],
    [-0.285, 0.365, -2.70, 0.72, 0.80],
    [0.285, 0.365, 2.70, 0.72, 0.80],
    [-0.285, 0.500, -0.80, 0.55, 0.65],
    [0.285, 0.500, 0.80, 0.55, 0.65],
    [-0.125, 0.500, -1.05, 0.50, 0.62],
    [0.125, 0.500, 1.05, 0.50, 0.62],
    [-0.330, 0.565, -0.35, 0.48, 0.58],
    [0.330, 0.565, 0.35, 0.48, 0.58],
  ];

  const leaf_motifs = new THREE.InstancedMesh(
    leaf_motifsGeom,
    ornamentMat,
    leaf_data.length
  );
  for (let i = 0; i < leaf_data.length; i++) {
    const data = leaf_data[i];
    setSurfaceInstance(
      leaf_motifs,
      i,
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      0.008
    );
  }
  leaf_motifs.instanceMatrix.needsUpdate = true;
  ornament_group.add(leaf_motifs);

  const flower_centers_data = [
    [0.000, 0.535, 1.00],
    [-0.250, 0.585, 0.92],
    [0.250, 0.585, 0.92],
  ];
  const flower_petalGeom = new THREE.CircleGeometry(0.030, 16);
  const flower_petals = new THREE.InstancedMesh(
    flower_petalGeom,
    ornamentMat,
    flower_centers_data.length * 8
  );

  let petal_index = 0;
  for (const center of flower_centers_data) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      const px = center[0] + Math.cos(angle) * 0.052 * center[2];
      const py = center[1] + Math.sin(angle) * 0.052 * center[2];
      setSurfaceInstance(
        flower_petals,
        petal_index,
        px,
        py,
        angle - Math.PI / 2,
        0.55 * center[2],
        1.45 * center[2],
        0.008
      );
      petal_index++;
    }
  }
  flower_petals.instanceMatrix.needsUpdate = true;
  ornament_group.add(flower_petals);

  const flower_centersGeom = new THREE.CircleGeometry(0.023, 16);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    ornamentMat,
    flower_centers_data.length
  );
  for (let i = 0; i < flower_centers_data.length; i++) {
    const center = flower_centers_data[i];
    setSurfaceInstance(
      flower_centers,
      i,
      center[0],
      center[1],
      0,
      center[2],
      center[2],
      0.009
    );
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  ornament_group.add(flower_centers);

  const diamond_shape = new THREE.Shape();
  diamond_shape.moveTo(0.000, 0.028);
  diamond_shape.lineTo(-0.022, 0.000);
  diamond_shape.lineTo(0.000, -0.028);
  diamond_shape.lineTo(0.022, 0.000);
  diamond_shape.closePath();

  const ornamental_diamondsGeom = new THREE.ShapeGeometry(diamond_shape);
  const ornamental_diamonds = new THREE.InstancedMesh(
    ornamental_diamondsGeom,
    ornamentMat,
    2
  );
  setSurfaceInstance(
    ornamental_diamonds,
    0,
    0.000,
    0.810,
    0,
    1.0,
    1.0,
    0.009
  );
  setSurfaceInstance(
    ornamental_diamonds,
    1,
    0.000,
    0.355,
    0,
    1.0,
    1.0,
    0.009
  );
  ornamental_diamonds.instanceMatrix.needsUpdate = true;
  ornament_group.add(ornamental_diamonds);

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