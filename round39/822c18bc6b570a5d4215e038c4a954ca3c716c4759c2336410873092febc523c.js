export default function generate(THREE) {
  const root = new THREE.Group();

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const star_frameMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const chain_linksMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const blue_inlayMat = new THREE.MeshPhysicalMaterial({
    color: 0x087de8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 1.0,
    thickness: 0.035,
    attenuationColor: 0x007cff,
    attenuationDistance: 0.25,
    emissive: 0x003d9b,
    emissiveIntensity: 0.65,
  });

  const galaxy_underlayMat = new THREE.MeshStandardMaterial({
    color: 0x06154d,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x001a62,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_navyMat = new THREE.MeshStandardMaterial({
    color: 0x061353,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x00124a,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_blueMat = new THREE.MeshStandardMaterial({
    color: 0x0754c9,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x002b88,
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x00bde8,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x007dab,
    emissiveIntensity: 0.55,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_violetMat = new THREE.MeshStandardMaterial({
    color: 0x342384,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x100b49,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_rayMat = new THREE.MeshStandardMaterial({
    color: 0x8ac9ed,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x174b73,
    emissiveIntensity: 0.25,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_bright_rayMat = new THREE.MeshStandardMaterial({
    color: 0x52eaff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x126f91,
    emissiveIntensity: 0.4,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_hazeMat = new THREE.MeshStandardMaterial({
    color: 0x009ee8,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x005d86,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const galaxy_haze_glowMat = new THREE.MeshStandardMaterial({
    color: 0x00c9f2,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x007896,
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.075,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const cyan_glowMat = new THREE.MeshStandardMaterial({
    color: 0x00dfff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x00dfff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const white_glowMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffffff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const star_shape_points = [
    new THREE.Vector2(0.00, 0.90),
    new THREE.Vector2(-0.25, 0.34),
    new THREE.Vector2(-1.02, 0.34),
    new THREE.Vector2(-0.53, -0.18),
    new THREE.Vector2(-0.78, -0.96),
    new THREE.Vector2(-0.03, -0.55),
    new THREE.Vector2(0.00, -0.66),
    new THREE.Vector2(0.03, -0.55),
    new THREE.Vector2(0.78, -0.96),
    new THREE.Vector2(0.53, -0.18),
    new THREE.Vector2(1.02, 0.34),
    new THREE.Vector2(0.25, 0.34),
  ];

  function createStarShape(scale) {
    const shape = new THREE.Shape();
    shape.moveTo(star_shape_points[0].x * scale, star_shape_points[0].y * scale);
    for (let i = 1; i < star_shape_points.length; i++) {
      shape.lineTo(star_shape_points[i].x * scale, star_shape_points[i].y * scale);
    }
    shape.closePath();
    return shape;
  }

  function createPolygonGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i].x, points[i].y);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function createRayGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    shape.lineTo(points[1].x, points[1].y);
    shape.lineTo(points[2].x, points[2].y);
    shape.lineTo(points[3].x, points[3].y);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const pendant = new THREE.Group();
  pendant.position.set(0, -0.55, 0);
  pendant.scale.set(1.36, 1.0, 1.0);
  root.add(pendant);

  const star_frameGeom = new THREE.ExtrudeGeometry(createStarShape(1.0), {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const star_frame = new THREE.Mesh(star_frameGeom, star_frameMat);
  star_frame.position.z = -0.0375;
  pendant.add(star_frame);

  const blue_inlayGeom = new THREE.ExtrudeGeometry(createStarShape(0.94), {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const blue_inlay = new THREE.Mesh(blue_inlayGeom, blue_inlayMat);
  blue_inlay.position.z = 0.042;
  blue_inlay.renderOrder = 1;
  pendant.add(blue_inlay);

  const galaxy_underlayGeom = new THREE.ShapeGeometry(createStarShape(0.925));
  const galaxy_underlay = new THREE.Mesh(galaxy_underlayGeom, galaxy_underlayMat);
  galaxy_underlay.position.z = 0.059;
  galaxy_underlay.renderOrder = 2;
  pendant.add(galaxy_underlay);

  const galaxy_art = new THREE.Group();
  galaxy_art.position.z = 0.061;
  pendant.add(galaxy_art);

  const upper_left_armGeom = createPolygonGeometry([
    new THREE.Vector2(-0.01, 0.11),
    new THREE.Vector2(-0.24, 0.29),
    new THREE.Vector2(-0.88, 0.30),
    new THREE.Vector2(-0.55, 0.06),
    new THREE.Vector2(-0.28, -0.02),
  ]);
  const upper_left_arm = new THREE.Mesh(upper_left_armGeom, galaxy_navyMat);
  upper_left_arm.renderOrder = 3;
  galaxy_art.add(upper_left_arm);

  const upper_right_armGeom = createPolygonGeometry([
    new THREE.Vector2(0.02, 0.12),
    new THREE.Vector2(0.25, 0.29),
    new THREE.Vector2(0.88, 0.30),
    new THREE.Vector2(0.55, 0.06),
    new THREE.Vector2(0.27, -0.03),
  ]);
  const upper_right_arm = new THREE.Mesh(upper_right_armGeom, galaxy_blueMat);
  upper_right_arm.renderOrder = 3;
  galaxy_art.add(upper_right_arm);

  const left_wingGeom = createPolygonGeometry([
    new THREE.Vector2(-0.29, 0.04),
    new THREE.Vector2(-0.56, -0.17),
    new THREE.Vector2(-0.70, -0.78),
    new THREE.Vector2(-0.06, -0.49),
    new THREE.Vector2(-0.15, -0.16),
  ]);
  const left_wing = new THREE.Mesh(left_wingGeom, galaxy_cyanMat);
  left_wing.renderOrder = 3;
  galaxy_art.add(left_wing);

  const right_wingGeom = createPolygonGeometry([
    new THREE.Vector2(0.28, 0.04),
    new THREE.Vector2(0.56, -0.17),
    new THREE.Vector2(0.70, -0.78),
    new THREE.Vector2(0.06, -0.49),
    new THREE.Vector2(0.15, -0.16),
  ]);
  const right_wing = new THREE.Mesh(right_wingGeom, galaxy_navyMat);
  right_wing.renderOrder = 3;
  galaxy_art.add(right_wing);

  const top_pointGeom = createPolygonGeometry([
    new THREE.Vector2(0.00, 0.79),
    new THREE.Vector2(-0.20, 0.34),
    new THREE.Vector2(0.00, 0.24),
    new THREE.Vector2(0.20, 0.34),
  ]);
  const top_point = new THREE.Mesh(top_pointGeom, galaxy_blueMat);
  top_point.renderOrder = 3;
  galaxy_art.add(top_point);

  const lower_left_pointGeom = createPolygonGeometry([
    new THREE.Vector2(-0.04, -0.51),
    new THREE.Vector2(-0.70, -0.88),
    new THREE.Vector2(-0.50, -0.38),
    new THREE.Vector2(-0.16, -0.16),
  ]);
  const lower_left_point = new THREE.Mesh(lower_left_pointGeom, galaxy_violetMat);
  lower_left_point.renderOrder = 3;
  galaxy_art.add(lower_left_point);

  const lower_right_pointGeom = createPolygonGeometry([
    new THREE.Vector2(0.04, -0.51),
    new THREE.Vector2(0.50, -0.38),
    new THREE.Vector2(0.70, -0.88),
    new THREE.Vector2(0.04, -0.51),
  ]);
  const lower_right_point = new THREE.Mesh(lower_right_pointGeom, galaxy_blueMat);
  lower_right_point.renderOrder = 3;
  galaxy_art.add(lower_right_point);

  const upper_left_facetGeom = createPolygonGeometry([
    new THREE.Vector2(-0.02, 0.13),
    new THREE.Vector2(-0.24, 0.31),
    new THREE.Vector2(-0.68, 0.31),
    new THREE.Vector2(-0.38, 0.08),
  ]);
  const upper_left_facet = new THREE.Mesh(upper_left_facetGeom, galaxy_blueMat);
  upper_left_facet.renderOrder = 4;
  galaxy_art.add(upper_left_facet);

  const upper_right_facetGeom = createPolygonGeometry([
    new THREE.Vector2(0.03, 0.13),
    new THREE.Vector2(0.31, 0.31),
    new THREE.Vector2(0.70, 0.31),
    new THREE.Vector2(0.38, 0.06),
  ]);
  const upper_right_facet = new THREE.Mesh(upper_right_facetGeom, galaxy_violetMat);
  upper_right_facet.renderOrder = 4;
  galaxy_art.add(upper_right_facet);

  const middle_left_facetGeom = createPolygonGeometry([
    new THREE.Vector2(-0.20, 0.08),
    new THREE.Vector2(-0.52, -0.16),
    new THREE.Vector2(-0.43, -0.38),
    new THREE.Vector2(-0.10, -0.16),
  ]);
  const middle_left_facet = new THREE.Mesh(middle_left_facetGeom, galaxy_navyMat);
  middle_left_facet.renderOrder = 4;
  galaxy_art.add(middle_left_facet);

  const middle_right_facetGeom = createPolygonGeometry([
    new THREE.Vector2(0.19, 0.08),
    new THREE.Vector2(0.49, -0.15),
    new THREE.Vector2(0.43, -0.38),
    new THREE.Vector2(0.10, -0.16),
  ]);
  const middle_right_facet = new THREE.Mesh(middle_right_facetGeom, galaxy_cyanMat);
  middle_right_facet.renderOrder = 4;
  galaxy_art.add(middle_right_facet);

  const lower_left_facetGeom = createPolygonGeometry([
    new THREE.Vector2(-0.10, -0.22),
    new THREE.Vector2(-0.43, -0.40),
    new THREE.Vector2(-0.64, -0.80),
    new THREE.Vector2(-0.06, -0.52),
  ]);
  const lower_left_facet = new THREE.Mesh(lower_left_facetGeom, galaxy_blueMat);
  lower_left_facet.renderOrder = 4;
  galaxy_art.add(lower_left_facet);

  const lower_right_facetGeom = createPolygonGeometry([
    new THREE.Vector2(0.10, -0.22),
    new THREE.Vector2(0.06, -0.52),
    new THREE.Vector2(0.64, -0.80),
    new THREE.Vector2(0.43, -0.40),
  ]);
  const lower_right_facet = new THREE.Mesh(lower_right_facetGeom, galaxy_violetMat);
  lower_right_facet.renderOrder = 4;
  galaxy_art.add(lower_right_facet);

  const top_facetGeom = createPolygonGeometry([
    new THREE.Vector2(0.00, 0.73),
    new THREE.Vector2(-0.15, 0.35),
    new THREE.Vector2(0.00, 0.27),
  ]);
  const top_facet = new THREE.Mesh(top_facetGeom, galaxy_cyanMat);
  top_facet.renderOrder = 4;
  galaxy_art.add(top_facet);

  const top_right_facetGeom = createPolygonGeometry([
    new THREE.Vector2(0.00, 0.73),
    new THREE.Vector2(0.00, 0.27),
    new THREE.Vector2(0.15, 0.35),
  ]);
  const top_right_facet = new THREE.Mesh(top_right_facetGeom, galaxy_navyMat);
  top_right_facet.renderOrder = 4;
  galaxy_art.add(top_right_facet);

  const left_arm_highlightGeom = createPolygonGeometry([
    new THREE.Vector2(-0.28, 0.23),
    new THREE.Vector2(-0.78, 0.29),
    new THREE.Vector2(-0.56, 0.16),
    new THREE.Vector2(-0.31, 0.04),
  ]);
  const left_arm_highlight = new THREE.Mesh(left_arm_highlightGeom, galaxy_cyanMat);
  left_arm_highlight.renderOrder = 5;
  galaxy_art.add(left_arm_highlight);

  const right_arm_highlightGeom = createPolygonGeometry([
    new THREE.Vector2(0.28, 0.23),
    new THREE.Vector2(0.56, 0.16),
    new THREE.Vector2(0.78, 0.29),
    new THREE.Vector2(0.34, 0.04),
  ]);
  const right_arm_highlight = new THREE.Mesh(right_arm_highlightGeom, galaxy_blueMat);
  right_arm_highlight.renderOrder = 5;
  galaxy_art.add(right_arm_highlight);

  const lower_left_highlightGeom = createPolygonGeometry([
    new THREE.Vector2(-0.16, -0.28),
    new THREE.Vector2(-0.59, -0.77),
    new THREE.Vector2(-0.39, -0.47),
    new THREE.Vector2(-0.08, -0.35),
  ]);
  const lower_left_highlight = new THREE.Mesh(lower_left_highlightGeom, galaxy_cyanMat);
  lower_left_highlight.renderOrder = 5;
  galaxy_art.add(lower_left_highlight);

  const lower_right_highlightGeom = createPolygonGeometry([
    new THREE.Vector2(0.16, -0.28),
    new THREE.Vector2(0.08, -0.35),
    new THREE.Vector2(0.39, -0.47),
    new THREE.Vector2(0.59, -0.77),
  ]);
  const lower_right_highlight = new THREE.Mesh(lower_right_highlightGeom, galaxy_blueMat);
  lower_right_highlight.renderOrder = 5;
  galaxy_art.add(lower_right_highlight);

  const cyan_cloud_oneGeom = createPolygonGeometry([
    new THREE.Vector2(-0.69, 0.28),
    new THREE.Vector2(-0.34, 0.24),
    new THREE.Vector2(-0.20, 0.10),
    new THREE.Vector2(-0.48, 0.08),
    new THREE.Vector2(-0.74, 0.17),
  ]);
  const cyan_cloud_one = new THREE.Mesh(cyan_cloud_oneGeom, galaxy_cyanMat);
  cyan_cloud_one.renderOrder = 5;
  galaxy_art.add(cyan_cloud_one);

  const violet_cloud_oneGeom = createPolygonGeometry([
    new THREE.Vector2(0.24, 0.25),
    new THREE.Vector2(0.68, 0.29),
    new THREE.Vector2(0.52, 0.08),
    new THREE.Vector2(0.22, 0.06),
  ]);
  const violet_cloud_one = new THREE.Mesh(violet_cloud_oneGeom, galaxy_violetMat);
  violet_cloud_one.renderOrder = 5;
  galaxy_art.add(violet_cloud_one);

  const blue_cloud_oneGeom = createPolygonGeometry([
    new THREE.Vector2(-0.48, -0.15),
    new THREE.Vector2(-0.12, -0.16),
    new THREE.Vector2(-0.05, -0.39),
    new THREE.Vector2(-0.39, -0.49),
    new THREE.Vector2(-0.62, -0.30),
  ]);
  const blue_cloud_one = new THREE.Mesh(blue_cloud_oneGeom, galaxy_blueMat);
  blue_cloud_one.renderOrder = 5;
  galaxy_art.add(blue_cloud_one);

  const navy_cloud_oneGeom = createPolygonGeometry([
    new THREE.Vector2(0.08, -0.16),
    new THREE.Vector2(0.49, -0.14),
    new THREE.Vector2(0.61, -0.31),
    new THREE.Vector2(0.34, -0.49),
    new THREE.Vector2(0.03, -0.38),
  ]);
  const navy_cloud_one = new THREE.Mesh(navy_cloud_oneGeom, galaxy_navyMat);
  navy_cloud_one.renderOrder = 5;
  galaxy_art.add(navy_cloud_one);

  const cyan_cloud_twoGeom = createPolygonGeometry([
    new THREE.Vector2(-0.62, -0.34),
    new THREE.Vector2(-0.34, -0.46),
    new THREE.Vector2(-0.54, -0.76),
    new THREE.Vector2(-0.69, -0.82),
  ]);
  const cyan_cloud_two = new THREE.Mesh(cyan_cloud_twoGeom, galaxy_cyanMat);
  cyan_cloud_two.renderOrder = 5;
  galaxy_art.add(cyan_cloud_two);

  const violet_cloud_twoGeom = createPolygonGeometry([
    new THREE.Vector2(0.25, -0.43),
    new THREE.Vector2(0.55, -0.39),
    new THREE.Vector2(0.67, -0.78),
    new THREE.Vector2(0.39, -0.63),
  ]);
  const violet_cloud_two = new THREE.Mesh(violet_cloud_twoGeom, galaxy_violetMat);
  violet_cloud_two.renderOrder = 5;
  galaxy_art.add(violet_cloud_two);

  const central_hazeGeom = new THREE.CircleGeometry(0.34, 32);
  const central_haze = new THREE.Mesh(central_hazeGeom, galaxy_hazeMat);
  central_haze.position.set(0, -0.08, 0.0002);
  central_haze.scale.set(1.15, 0.85, 1);
  central_haze.renderOrder = 5;
  galaxy_art.add(central_haze);

  const central_haze_glowGeom = new THREE.CircleGeometry(0.46, 32);
  const central_haze_glow = new THREE.Mesh(central_haze_glowGeom, galaxy_haze_glowMat);
  central_haze_glow.position.set(0, -0.08, 0.0001);
  central_haze_glow.scale.set(1.05, 0.9, 1);
  central_haze_glow.renderOrder = 5;
  galaxy_art.add(central_haze_glow);

  const upper_left_rayGeom = createRayGeometry([
    new THREE.Vector2(-0.015, -0.075),
    new THREE.Vector2(-0.20, 0.18),
    new THREE.Vector2(-0.78, 0.30),
    new THREE.Vector2(-0.05, -0.02),
  ]);
  const upper_left_ray = new THREE.Mesh(upper_left_rayGeom, galaxy_rayMat);
  upper_left_ray.renderOrder = 6;
  galaxy_art.add(upper_left_ray);

  const upper_right_rayGeom = createRayGeometry([
    new THREE.Vector2(0.015, -0.075),
    new THREE.Vector2(0.06, -0.02),
    new THREE.Vector2(0.78, 0.30),
    new THREE.Vector2(0.20, 0.18),
  ]);
  const upper_right_ray = new THREE.Mesh(upper_right_rayGeom, galaxy_rayMat);
  upper_right_ray.renderOrder = 6;
  galaxy_art.add(upper_right_ray);

  const left_rayGeom = createRayGeometry([
    new THREE.Vector2(-0.015, -0.08),
    new THREE.Vector2(-0.18, -0.16),
    new THREE.Vector2(-0.58, -0.36),
    new THREE.Vector2(-0.04, -0.10),
  ]);
  const left_ray = new THREE.Mesh(left_rayGeom, galaxy_bright_rayMat);
  left_ray.renderOrder = 6;
  galaxy_art.add(left_ray);

  const right_rayGeom = createRayGeometry([
    new THREE.Vector2(0.015, -0.08),
    new THREE.Vector2(0.04, -0.10),
    new THREE.Vector2(0.58, -0.36),
    new THREE.Vector2(0.18, -0.16),
  ]);
  const right_ray = new THREE.Mesh(right_rayGeom, galaxy_rayMat);
  right_ray.renderOrder = 6;
  galaxy_art.add(right_ray);

  const lower_left_rayGeom = createRayGeometry([
    new THREE.Vector2(-0.012, -0.09),
    new THREE.Vector2(-0.03, -0.20),
    new THREE.Vector2(-0.64, -0.86),
    new THREE.Vector2(-0.12, -0.15),
  ]);
  const lower_left_ray = new THREE.Mesh(lower_left_rayGeom, galaxy_rayMat);
  lower_left_ray.renderOrder = 6;
  galaxy_art.add(lower_left_ray);

  const lower_right_rayGeom = createRayGeometry([
    new THREE.Vector2(0.012, -0.09),
    new THREE.Vector2(0.12, -0.15),
    new THREE.Vector2(0.64, -0.86),
    new THREE.Vector2(0.03, -0.20),
  ]);
  const lower_right_ray = new THREE.Mesh(lower_right_rayGeom, galaxy_bright_rayMat);
  lower_right_ray.renderOrder = 6;
  galaxy_art.add(lower_right_ray);

  const top_rayGeom = createRayGeometry([
    new THREE.Vector2(-0.01, -0.07),
    new THREE.Vector2(0.01, -0.07),
    new THREE.Vector2(0.00, 0.76),
    new THREE.Vector2(0.00, 0.18),
  ]);
  const top_ray = new THREE.Mesh(top_rayGeom, galaxy_bright_rayMat);
  top_ray.renderOrder = 6;
  galaxy_art.add(top_ray);

  const cyan_cloudsGeom = new THREE.CircleGeometry(0.055, 18);
  const cyan_clouds = new THREE.InstancedMesh(cyan_cloudsGeom, galaxy_cyanMat, 32);
  const cyan_cloud_dummy = new THREE.Object3D();
  for (let i = 0; i < 32; i++) {
    const angle = i * 2.3999632297 + 0.28;
    const radius = 0.10 + (i % 8) * 0.066;
    const x = Math.cos(angle) * radius * 1.18;
    const y = -0.08 + Math.sin(angle) * radius * 0.92;
    const sx = 0.65 + (i % 5) * 0.24;
    const sy = 0.34 + ((i * 3) % 5) * 0.12;
    cyan_cloud_dummy.position.set(x, y, 0.0005);
    cyan_cloud_dummy.rotation.set(0, 0, angle * 0.61);
    cyan_cloud_dummy.scale.set(sx, sy, 1);
    cyan_cloud_dummy.updateMatrix();
    cyan_clouds.setMatrixAt(i, cyan_cloud_dummy.matrix);
  }
  cyan_clouds.instanceMatrix.needsUpdate = true;
  cyan_clouds.renderOrder = 7;
  galaxy_art.add(cyan_clouds);

  const violet_cloudsGeom = new THREE.CircleGeometry(0.06, 18);
  const violet_clouds = new THREE.InstancedMesh(violet_cloudsGeom, galaxy_violetMat, 28);
  const violet_cloud_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i * 2.173 + 1.1;
    const radius = 0.12 + (i % 7) * 0.072;
    const x = Math.cos(angle) * radius * 1.2;
    const y = -0.08 + Math.sin(angle) * radius * 0.9;
    const sx = 0.7 + (i % 4) * 0.26;
    const sy = 0.36 + ((i * 2) % 5) * 0.11;
    violet_cloud_dummy.position.set(x, y, 0.0004);
    violet_cloud_dummy.rotation.set(0, 0, -angle * 0.48);
    violet_cloud_dummy.scale.set(sx, sy, 1);
    violet_cloud_dummy.updateMatrix();
    violet_clouds.setMatrixAt(i, violet_cloud_dummy.matrix);
  }
  violet_clouds.instanceMatrix.needsUpdate = true;
  violet_clouds.renderOrder = 7;
  galaxy_art.add(violet_clouds);

  const navy_nebula_patchesGeom = new THREE.CircleGeometry(0.075, 20);
  const navy_nebula_patches = new THREE.InstancedMesh(
    navy_nebula_patchesGeom,
    galaxy_navyMat,
    20
  );
  const navy_patch_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const arm = i % 5;
    const step = Math.floor(i / 5);
    const baseAngle = arm / 5 * Math.PI * 2;
    const radius = 0.2 + step * 0.115 + (i % 2) * 0.025;
    const x = Math.cos(baseAngle) * radius * 1.15;
    const y = -0.08 + Math.sin(baseAngle) * radius * 0.88;
    const sx = 0.72 + (i % 4) * 0.22;
    const sy = 0.34 + ((i * 3) % 4) * 0.13;
    navy_patch_dummy.position.set(x, y, 0.0003);
    navy_patch_dummy.rotation.set(0, 0, baseAngle + 0.35);
    navy_patch_dummy.scale.set(sx, sy, 1);
    navy_patch_dummy.updateMatrix();
    navy_nebula_patches.setMatrixAt(i, navy_patch_dummy.matrix);
  }
  navy_nebula_patches.instanceMatrix.needsUpdate = true;
  navy_nebula_patches.renderOrder = 7;
  galaxy_art.add(navy_nebula_patches);

  const star_dustGeom = new THREE.CircleGeometry(0.009, 10);
  const star_dust = new THREE.InstancedMesh(star_dustGeom, cyan_glowMat, 34);
  const star_dust_dummy = new THREE.Object3D();
  for (let i = 0; i < 34; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.13 + (i % 9) * 0.061;
    const x = Math.cos(angle) * radius * 1.18;
    const y = -0.08 + Math.sin(angle) * radius * 0.9;
    const scale = 0.55 + (i % 4) * 0.25;
    star_dust_dummy.position.set(x, y, 0.001);
    star_dust_dummy.rotation.set(0, 0, angle);
    star_dust_dummy.scale.set(scale, scale, 1);
    star_dust_dummy.updateMatrix();
    star_dust.setMatrixAt(i, star_dust_dummy.matrix);
  }
  star_dust.instanceMatrix.needsUpdate = true;
  star_dust.renderOrder = 8;
  galaxy_art.add(star_dust);

  const central_outer_glowGeom = new THREE.CircleGeometry(0.19, 32);
  const central_outer_glow = new THREE.Mesh(central_outer_glowGeom, cyan_glowMat);
  central_outer_glow.position.set(0, -0.08, 0.0012);
  central_outer_glow.scale.set(1.12, 0.9, 1);
  central_outer_glow.renderOrder = 8;
  galaxy_art.add(central_outer_glow);

  const central_inner_glowGeom = new THREE.CircleGeometry(0.105, 28);
  const central_inner_glow = new THREE.Mesh(central_inner_glowGeom, white_glowMat);
  central_inner_glow.position.set(0, -0.08, 0.0015);
  central_inner_glow.scale.set(1.08, 0.96, 1);
  central_inner_glow.renderOrder = 9;
  galaxy_art.add(central_inner_glow);

  const central_glowGeom = new THREE.CircleGeometry(0.048, 24);
  const central_glow = new THREE.Mesh(central_glowGeom, white_glowMat);
  central_glow.position.set(0, -0.08, 0.0018);
  central_glow.renderOrder = 10;
  galaxy_art.add(central_glow);

  const jump_ringGeom = new THREE.TorusGeometry(0.105, 0.018, 10, 32);
  const jump_ring = new THREE.Mesh(jump_ringGeom, chain_linksMat);
  jump_ring.position.set(0, 0.52, 0.075);
  jump_ring.scale.set(1.0, 1.15, 1.0);
  root.add(jump_ring);

  const bail_shape = new THREE.Shape();
  bail_shape.moveTo(-0.16, 0.24);
  bail_shape.lineTo(0.16, 0.24);
  bail_shape.lineTo(0.125, -0.17);
  bail_shape.lineTo(0.075, -0.25);
  bail_shape.lineTo(-0.075, -0.25);
  bail_shape.lineTo(-0.125, -0.17);
  bail_shape.closePath();

  const bail_hole = new THREE.Path();
  bail_hole.moveTo(-0.075, 0.13);
  bail_hole.lineTo(-0.05, -0.075);
  bail_hole.lineTo(0.05, -0.075);
  bail_hole.lineTo(0.075, 0.13);
  bail_hole.closePath();
  bail_shape.holes.push(bail_hole);

  const bailGeom = new THREE.ExtrudeGeometry(bail_shape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.008,
    bevelSegments: 3,
  });
  const bail = new THREE.Mesh(bailGeom, polished_silverMat);
  bail.position.set(0, 0.78, 0.025);
  root.add(bail);

  const chain_linksGeom = new THREE.TorusGeometry(0.046, 0.01, 8, 24);
  const links_per_side = 15;
  const chain_links = new THREE.InstancedMesh(
    chain_linksGeom,
    chain_linksMat,
    links_per_side * 2
  );
  const chain_dummy = new THREE.Object3D();
  const chain_z_axis = new THREE.Vector3(0, 0, 1);
  const chain_y_axis = new THREE.Vector3(0, 1, 0);
  const chain_orientation = new THREE.Quaternion();
  const chain_tilt = new THREE.Quaternion();
  let chain_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < links_per_side; i++) {
      const t = i / (links_per_side - 1);
      const x = side * (0.12 + 0.66 * t + 0.05 * t * t);
      const y = 1.02 + 1.78 * t;
      const dx = side * (0.66 + 0.10 * t);
      const dy = 1.78;
      const orientation = Math.atan2(-dx, dy);
      const tilt = i % 2 === 0 ? side * 0.18 : side * 1.02;

      chain_orientation.setFromAxisAngle(chain_z_axis, orientation);
      chain_tilt.setFromAxisAngle(chain_y_axis, tilt);

      chain_dummy.position.set(x, y, i % 2 === 0 ? 0.025 : 0.018);
      chain_dummy.quaternion.copy(chain_orientation).multiply(chain_tilt);
      chain_dummy.scale.set(0.86, 1.45, 0.95);
      chain_dummy.updateMatrix();
      chain_links.setMatrixAt(chain_index, chain_dummy.matrix);
      chain_index++;
    }
  }

  chain_links.instanceMatrix.needsUpdate = true;
  root.add(chain_links);

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