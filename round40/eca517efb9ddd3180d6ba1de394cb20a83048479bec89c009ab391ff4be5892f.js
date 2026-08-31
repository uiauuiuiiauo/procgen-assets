export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cut_glass_vase";

  const vase_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.24,
    thickness: 0.06,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const cut_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.285, 0.000),
    new THREE.Vector2(0.315, 0.018),
    new THREE.Vector2(0.330, 0.045),
    new THREE.Vector2(0.325, 0.075),
    new THREE.Vector2(0.295, 0.105),
    new THREE.Vector2(0.250, 0.140),
    new THREE.Vector2(0.235, 0.160),
    new THREE.Vector2(0.255, 0.185),
    new THREE.Vector2(0.300, 0.210),
    new THREE.Vector2(0.335, 0.245),
    new THREE.Vector2(0.370, 0.300),
    new THREE.Vector2(0.405, 0.380),
    new THREE.Vector2(0.438, 0.480),
    new THREE.Vector2(0.458, 0.580),
    new THREE.Vector2(0.462, 0.680),
    new THREE.Vector2(0.450, 0.780),
    new THREE.Vector2(0.420, 0.880),
    new THREE.Vector2(0.378, 0.980),
    new THREE.Vector2(0.330, 1.080),
    new THREE.Vector2(0.285, 1.180),
    new THREE.Vector2(0.250, 1.280),
    new THREE.Vector2(0.228, 1.380),
    new THREE.Vector2(0.218, 1.480),
    new THREE.Vector2(0.220, 1.580),
    new THREE.Vector2(0.232, 1.680),
    new THREE.Vector2(0.255, 1.780),
    new THREE.Vector2(0.290, 1.880),
    new THREE.Vector2(0.335, 1.980),
    new THREE.Vector2(0.385, 2.060),
    new THREE.Vector2(0.420, 2.100),
    new THREE.Vector2(0.405, 2.120),
    new THREE.Vector2(0.365, 2.120),
    new THREE.Vector2(0.345, 2.090),
    new THREE.Vector2(0.310, 2.040),
    new THREE.Vector2(0.265, 1.960),
    new THREE.Vector2(0.225, 1.860),
    new THREE.Vector2(0.195, 1.760),
    new THREE.Vector2(0.178, 1.660),
    new THREE.Vector2(0.175, 1.560),
    new THREE.Vector2(0.178, 1.460),
    new THREE.Vector2(0.188, 1.360),
    new THREE.Vector2(0.205, 1.260),
    new THREE.Vector2(0.230, 1.160),
    new THREE.Vector2(0.270, 1.060),
    new THREE.Vector2(0.315, 0.960),
    new THREE.Vector2(0.355, 0.860),
    new THREE.Vector2(0.385, 0.760),
    new THREE.Vector2(0.397, 0.660),
    new THREE.Vector2(0.393, 0.560),
    new THREE.Vector2(0.373, 0.470),
    new THREE.Vector2(0.340, 0.390),
    new THREE.Vector2(0.305, 0.320),
    new THREE.Vector2(0.270, 0.270),
    new THREE.Vector2(0.235, 0.230),
    new THREE.Vector2(0.205, 0.205),
    new THREE.Vector2(0.000, 0.205)
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  root.add(vase_body);

  const top_rimGeom = new THREE.TorusGeometry(0.415, 0.026, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, vase_bodyMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 2.108;
  root.add(top_rim);

  const inner_lipGeom = new THREE.TorusGeometry(0.365, 0.010, 8, 64);
  const inner_lip = new THREE.Mesh(inner_lipGeom, vase_bodyMat);
  inner_lip.name = "inner_lip";
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = 2.112;
  root.add(inner_lip);

  const inner_mouthGeom = new THREE.CircleGeometry(0.360, 64);
  const inner_mouth = new THREE.Mesh(inner_mouthGeom, vase_bodyMat);
  inner_mouth.name = "inner_mouth";
  inner_mouth.rotation.x = Math.PI / 2;
  inner_mouth.position.y = 2.092;
  root.add(inner_mouth);

  const foot_outer_rimGeom = new THREE.TorusGeometry(0.305, 0.018, 10, 64);
  const foot_outer_rim = new THREE.Mesh(foot_outer_rimGeom, vase_bodyMat);
  foot_outer_rim.name = "foot_outer_rim";
  foot_outer_rim.rotation.x = Math.PI / 2;
  foot_outer_rim.position.y = 0.038;
  root.add(foot_outer_rim);

  const foot_upper_rimGeom = new THREE.TorusGeometry(0.255, 0.012, 8, 64);
  const foot_upper_rim = new THREE.Mesh(foot_upper_rimGeom, vase_bodyMat);
  foot_upper_rim.name = "foot_upper_rim";
  foot_upper_rim.rotation.x = Math.PI / 2;
  foot_upper_rim.position.y = 0.145;
  root.add(foot_upper_rim);

  const lower_body_bandGeom = new THREE.TorusGeometry(0.252, 0.009, 8, 64);
  const lower_body_band = new THREE.Mesh(lower_body_bandGeom, vase_bodyMat);
  lower_body_band.name = "lower_body_band";
  lower_body_band.rotation.x = Math.PI / 2;
  lower_body_band.position.y = 0.190;
  root.add(lower_body_band);

  const radius_samples = [
    [0.18, 0.255],
    [0.24, 0.335],
    [0.30, 0.370],
    [0.38, 0.405],
    [0.48, 0.438],
    [0.58, 0.458],
    [0.68, 0.462],
    [0.78, 0.450],
    [0.88, 0.420],
    [0.98, 0.378],
    [1.08, 0.330],
    [1.18, 0.285],
    [1.28, 0.250],
    [1.38, 0.228],
    [1.48, 0.218],
    [1.58, 0.220],
    [1.68, 0.232],
    [1.78, 0.255],
    [1.88, 0.290],
    [1.98, 0.335],
    [2.06, 0.385],
    [2.10, 0.420]
  ];

  function vaseRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 1; i < radius_samples.length; i++) {
      const a = radius_samples[i - 1];
      const b = radius_samples[i];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function surfacePoint(angle, y, extra) {
    const radius = vaseRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfaceQuaternion(angle) {
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }

  function makeSurfaceMatrix(angle, y, rotation, sx, sy, extra) {
    const position = surfacePoint(angle, y, extra);
    const quaternion = surfaceQuaternion(angle);
    const local_rotation = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      rotation
    );
    quaternion.multiply(local_rotation);
    return new THREE.Matrix4().compose(
      position,
      quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
  }

  function makeOffsetSurfaceMatrix(
    base_angle,
    base_y,
    local_x,
    local_y,
    rotation,
    sx,
    sy,
    extra
  ) {
    const angle = base_angle - local_x / vaseRadiusAt(base_y);
    return makeSurfaceMatrix(
      angle,
      base_y + local_y,
      rotation,
      sx,
      sy,
      extra
    );
  }

  const starburst_shape = new THREE.Shape();
  const starburst_points = 24;
  for (let i = 0; i < starburst_points; i++) {
    const angle = i / starburst_points * Math.PI * 2;
    const radius = i % 2 === 0 ? 1 : 0.27;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) starburst_shape.moveTo(x, y);
    else starburst_shape.lineTo(x, y);
  }
  starburst_shape.closePath();

  const starburst_specs = [];
  const upper_flower_count = 6;
  for (let i = 0; i < upper_flower_count; i++) {
    starburst_specs.push({
      angle: Math.PI / 2 + i / upper_flower_count * Math.PI * 2,
      y: 1.285,
      size: 0.180
    });
  }

  const lower_flower_count = 6;
  for (let i = 0; i < lower_flower_count; i++) {
    starburst_specs.push({
      angle: Math.PI / 2 + i / lower_flower_count * Math.PI * 2,
      y: 0.455,
      size: 0.170
    });
  }

  const middle_flower_count = 6;
  for (let i = 0; i < middle_flower_count; i++) {
    starburst_specs.push({
      angle: Math.PI / 2 + Math.PI / 6 +
        i / middle_flower_count * Math.PI * 2,
      y: 0.680,
      size: 0.110
    });
  }

  const starburst_facetsGeom = new THREE.ShapeGeometry(starburst_shape);
  const starburst_facets = new THREE.InstancedMesh(
    starburst_facetsGeom,
    cut_glassMat,
    starburst_specs.length
  );
  starburst_facets.name = "starburst_facets";

  for (let i = 0; i < starburst_specs.length; i++) {
    const spec = starburst_specs[i];
    starburst_facets.setMatrixAt(
      i,
      makeSurfaceMatrix(
        spec.angle,
        spec.y,
        i * 0.11,
        spec.size,
        spec.size,
        0.007
      )
    );
  }
  starburst_facets.instanceMatrix.needsUpdate = true;
  root.add(starburst_facets);

  const starburst_centersGeom = new THREE.CircleGeometry(1, 16);
  const starburst_centers = new THREE.InstancedMesh(
    starburst_centersGeom,
    cut_glassMat,
    starburst_specs.length
  );
  starburst_centers.name = "starburst_centers";

  for (let i = 0; i < starburst_specs.length; i++) {
    const spec = starburst_specs[i];
    starburst_centers.setMatrixAt(
      i,
      makeSurfaceMatrix(
        spec.angle,
        spec.y,
        0,
        spec.size * 0.145,
        spec.size * 0.145,
        0.009
      )
    );
  }
  starburst_centers.instanceMatrix.needsUpdate = true;
  root.add(starburst_centers);

  const cut_raysGeom = new THREE.BoxGeometry(0.005, 1, 0.002);
  const cut_rays = new THREE.InstancedMesh(
    cut_raysGeom,
    cut_glassMat,
    starburst_specs.length * 16
  );
  cut_rays.name = "cut_rays";

  let ray_index = 0;
  for (let i = 0; i < starburst_specs.length; i++) {
    const spec = starburst_specs[i];
    for (let j = 0; j < 16; j++) {
      const ray_angle = j / 16 * Math.PI * 2;
      const length = spec.size * (j % 2 === 0 ? 0.90 : 0.60);
      const center_distance = length * 0.48;
      const local_x = Math.cos(ray_angle) * center_distance;
      const local_y = Math.sin(ray_angle) * center_distance;
      cut_rays.setMatrixAt(
        ray_index++,
        makeOffsetSurfaceMatrix(
          spec.angle,
          spec.y,
          local_x,
          local_y,
          ray_angle - Math.PI / 2,
          1,
          length,
          0.009
        )
      );
    }
  }
  cut_rays.instanceMatrix.needsUpdate = true;
  root.add(cut_rays);

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(0, -1);
  leaf_shape.bezierCurveTo(0.52, -0.42, 0.48, 0.45, 0, 1);
  leaf_shape.bezierCurveTo(-0.48, 0.45, -0.52, -0.42, 0, -1);
  leaf_shape.closePath();

  const leaf_specs = [];
  for (let i = 0; i < 12; i++) {
    const angle = Math.PI / 2 + i / 12 * Math.PI * 2;
    leaf_specs.push({
      angle: angle - 0.13,
      y: 0.315,
      rotation: -0.58,
      width: 0.025,
      length: 0.090
    });
    leaf_specs.push({
      angle: angle + 0.13,
      y: 0.315,
      rotation: 0.58,
      width: 0.025,
      length: 0.090
    });
  }

  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 2 + i / 8 * Math.PI * 2;
    leaf_specs.push({
      angle: angle - 0.10,
      y: 0.790,
      rotation: -0.48,
      width: 0.022,
      length: 0.075
    });
    leaf_specs.push({
      angle: angle + 0.10,
      y: 0.790,
      rotation: 0.48,
      width: 0.022,
      length: 0.075
    });
  }

  const cut_leavesGeom = new THREE.ShapeGeometry(leaf_shape);
  const cut_leaves = new THREE.InstancedMesh(
    cut_leavesGeom,
    cut_glassMat,
    leaf_specs.length
  );
  cut_leaves.name = "cut_leaves";

  for (let i = 0; i < leaf_specs.length; i++) {
    const leaf = leaf_specs[i];
    cut_leaves.setMatrixAt(
      i,
      makeSurfaceMatrix(
        leaf.angle,
        leaf.y,
        leaf.rotation,
        leaf.width,
        leaf.length,
        0.008
      )
    );
  }
  cut_leaves.instanceMatrix.needsUpdate = true;
  root.add(cut_leaves);

  const vine_points = [];
  const vine_start = Math.PI / 2 - 0.18;
  for (let i = 0; i <= 18; i++) {
    const t = i / 18;
    const angle = vine_start + t * 0.36;
    const y = 0.245 + t * 0.555 + Math.sin(t * Math.PI) * 0.045;
    vine_points.push(surfacePoint(angle, y, 0.008));
  }
  const cut_vineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(vine_points),
    36,
    0.0025,
    6,
    false
  );
  const cut_vine = new THREE.Mesh(cut_vineGeom, cut_glassMat);
  cut_vine.name = "cut_vine";
  root.add(cut_vine);

  const side_vine_points = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const angle = Math.PI / 2 - 0.31 + t * 0.62;
    const y = 0.285 + t * 0.430 + Math.sin(t * Math.PI * 2) * 0.035;
    side_vine_points.push(surfacePoint(angle, y, 0.008));
  }
  const cut_side_vineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(side_vine_points),
    32,
    0.0023,
    6,
    false
  );
  const cut_side_vine = new THREE.Mesh(cut_side_vineGeom, cut_glassMat);
  cut_side_vine.name = "cut_side_vine";
  root.add(cut_side_vine);

  const upper_vine_points = [];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const angle = Math.PI / 2 - 0.24 + t * 0.48;
    const y = 1.185 + t * 0.190 + Math.sin(t * Math.PI) * 0.025;
    upper_vine_points.push(surfacePoint(angle, y, 0.008));
  }
  const upper_cut_vineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(upper_vine_points),
    28,
    0.0022,
    6,
    false
  );
  const upper_cut_vine = new THREE.Mesh(upper_cut_vineGeom, cut_glassMat);
  upper_cut_vine.name = "upper_cut_vine";
  root.add(upper_cut_vine);

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