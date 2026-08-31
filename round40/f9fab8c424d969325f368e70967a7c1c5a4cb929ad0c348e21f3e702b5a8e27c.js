export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "glass_tumbler";

  const vessel = new THREE.Group();
  vessel.name = "vessel";
  root.add(vessel);

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.015,
    transmission: 1.0,
    ior: 1.5,
    thickness: 0.01,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const blue_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x1264d5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.55,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const gold_leafMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const gold_veinMat = new THREE.MeshStandardMaterial({
    color: 0xf0ca5c,
    metalness: 0.5,
    roughness: 0.25,
  });

  const glass_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.360, 0.000),
    new THREE.Vector2(0.415, 0.004),
    new THREE.Vector2(0.445, 0.025),
    new THREE.Vector2(0.458, 0.075),
    new THREE.Vector2(0.460, 0.180),
    new THREE.Vector2(0.466, 0.550),
    new THREE.Vector2(0.474, 1.000),
    new THREE.Vector2(0.485, 1.340),
    new THREE.Vector2(0.492, 1.455),
    new THREE.Vector2(0.492, 1.485),
    new THREE.Vector2(0.478, 1.505),
    new THREE.Vector2(0.456, 1.505),
    new THREE.Vector2(0.446, 1.480),
    new THREE.Vector2(0.442, 1.410),
    new THREE.Vector2(0.437, 1.200),
    new THREE.Vector2(0.428, 0.750),
    new THREE.Vector2(0.421, 0.300),
    new THREE.Vector2(0.416, 0.210),
    new THREE.Vector2(0.402, 0.170),
    new THREE.Vector2(0.350, 0.145),
    new THREE.Vector2(0.000, 0.145),
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glass_bodyMat);
  glass_body.name = "glass_body";
  vessel.add(glass_body);

  const blue_rimGeom = new THREE.TorusGeometry(0.474, 0.017, 12, 72);
  const blue_rim = new THREE.Mesh(blue_rimGeom, blue_rimMat);
  blue_rim.name = "blue_rim";
  blue_rim.rotation.x = Math.PI / 2;
  blue_rim.position.y = 1.492;
  vessel.add(blue_rim);

  const blue_inner_rimGeom = new THREE.TorusGeometry(0.453, 0.006, 8, 72);
  const blue_inner_rim = new THREE.Mesh(blue_inner_rimGeom, blue_rimMat);
  blue_inner_rim.name = "blue_inner_rim";
  blue_inner_rim.rotation.x = Math.PI / 2;
  blue_inner_rim.position.y = 1.493;
  vessel.add(blue_inner_rim);

  const base_ringGeom = new THREE.TorusGeometry(0.430, 0.012, 10, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, glass_bodyMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.052;
  vessel.add(base_ring);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.205, 0.008, 8, 48);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, glass_bodyMat);
  inner_base_ring.name = "inner_base_ring";
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.158;
  vessel.add(inner_base_ring);

  const inner_base_outer_ringGeom = new THREE.TorusGeometry(0.285, 0.006, 8, 56);
  const inner_base_outer_ring = new THREE.Mesh(
    inner_base_outer_ringGeom,
    glass_bodyMat
  );
  inner_base_outer_ring.name = "inner_base_outer_ring";
  inner_base_outer_ring.rotation.x = Math.PI / 2;
  inner_base_outer_ring.position.y = 0.164;
  vessel.add(inner_base_outer_ring);

  const gold_leaf_ornament = new THREE.Group();
  gold_leaf_ornament.name = "gold_leaf_ornament";
  vessel.add(gold_leaf_ornament);

  function bodyRadiusAt(y) {
    const t = Math.max(0, Math.min(1, y / 1.48));
    return 0.458 + 0.034 * t;
  }

  function surfacePoint(u, y, extra) {
    const radius = bodyRadiusAt(y);
    const angle = Math.PI / 2 - u / radius;
    const decoratedRadius = radius + extra;
    return new THREE.Vector3(
      Math.cos(angle) * decoratedRadius,
      y,
      Math.sin(angle) * decoratedRadius
    );
  }

  function createSurfaceLeafGeometry(
    baseU,
    baseY,
    tipU,
    tipY,
    width,
    bend,
    extra
  ) {
    const length = Math.hypot(tipU - baseU, tipY - baseY) || 1;
    const dirU = (tipU - baseU) / length;
    const dirY = (tipY - baseY) / length;
    const perpU = -dirY;
    const perpY = dirU;
    const segments = 24;
    const vertices = [];
    const indices = [];

    function pointAt(t, sideWidth) {
      const curve = bend * Math.sin(Math.PI * t);
      const centerU = baseU + (tipU - baseU) * t + perpU * curve;
      const centerY = baseY + (tipY - baseY) * t + perpY * curve;
      const taper = Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.72);
      const side = sideWidth * taper;
      return surfacePoint(
        centerU + perpU * side,
        centerY + perpY * side,
        extra
      );
    }

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const left = pointAt(t, -width * 0.5);
      const right = pointAt(t, width * 0.5);
      vertices.push(
        left.x, left.y, left.z,
        right.x, right.y, right.z
      );
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSurfaceLineGeometry(uvPoints, radius, extra) {
    const pathPoints = [];
    for (const uv of uvPoints) {
      pathPoints.push(surfacePoint(uv[0], uv[1], extra));
    }
    const path = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(path, 20, radius, 6, false);
  }

  const gold_stemGeom = createSurfaceLineGeometry(
    [
      [0.310, 0.605],
      [0.337, 0.700],
      [0.355, 0.825],
      [0.365, 0.955],
      [0.370, 1.085],
    ],
    0.005,
    0.008
  );
  const gold_stem = new THREE.Mesh(gold_stemGeom, gold_leafMat);
  gold_stem.name = "gold_stem";
  gold_leaf_ornament.add(gold_stem);

  const gold_branchGeom = createSurfaceLineGeometry(
    [
      [0.348, 0.805],
      [0.365, 0.817],
      [0.382, 0.800],
    ],
    0.0035,
    0.008
  );
  const gold_branch = new THREE.Mesh(gold_branchGeom, gold_leafMat);
  gold_branch.name = "gold_branch";
  gold_leaf_ornament.add(gold_branch);

  const gold_main_leafGeom = createSurfaceLeafGeometry(
    0.350,
    0.810,
    -0.020,
    0.600,
    0.135,
    0.018,
    0.008
  );
  const gold_main_leaf = new THREE.Mesh(gold_main_leafGeom, gold_leafMat);
  gold_main_leaf.name = "gold_main_leaf";
  gold_leaf_ornament.add(gold_main_leaf);

  const gold_right_leafGeom = createSurfaceLeafGeometry(
    0.370,
    0.800,
    0.360,
    0.450,
    0.082,
    -0.012,
    0.009
  );
  const gold_right_leaf = new THREE.Mesh(gold_right_leafGeom, gold_leafMat);
  gold_right_leaf.name = "gold_right_leaf";
  gold_leaf_ornament.add(gold_right_leaf);

  const gold_upper_leafGeom = createSurfaceLeafGeometry(
    0.370,
    0.820,
    0.390,
    1.075,
    0.052,
    0.008,
    0.009
  );
  const gold_upper_leaf = new THREE.Mesh(gold_upper_leafGeom, gold_leafMat);
  gold_upper_leaf.name = "gold_upper_leaf";
  gold_leaf_ornament.add(gold_upper_leaf);

  const gold_main_leaf_veinGeom = createSurfaceLineGeometry(
    [
      [0.346, 0.802],
      [0.270, 0.755],
      [0.155, 0.695],
      [0.045, 0.642],
      [-0.012, 0.607],
    ],
    0.0024,
    0.012
  );
  const gold_main_leaf_vein = new THREE.Mesh(
    gold_main_leaf_veinGeom,
    gold_veinMat
  );
  gold_main_leaf_vein.name = "gold_main_leaf_vein";
  gold_leaf_ornament.add(gold_main_leaf_vein);

  const gold_right_leaf_veinGeom = createSurfaceLineGeometry(
    [
      [0.369, 0.790],
      [0.368, 0.700],
      [0.365, 0.600],
      [0.361, 0.475],
    ],
    0.002,
    0.012
  );
  const gold_right_leaf_vein = new THREE.Mesh(
    gold_right_leaf_veinGeom,
    gold_veinMat
  );
  gold_right_leaf_vein.name = "gold_right_leaf_vein";
  gold_leaf_ornament.add(gold_right_leaf_vein);

  const gold_upper_leaf_veinGeom = createSurfaceLineGeometry(
    [
      [0.371, 0.825],
      [0.375, 0.900],
      [0.382, 0.985],
      [0.389, 1.062],
    ],
    0.0018,
    0.012
  );
  const gold_upper_leaf_vein = new THREE.Mesh(
    gold_upper_leaf_veinGeom,
    gold_veinMat
  );
  gold_upper_leaf_vein.name = "gold_upper_leaf_vein";
  gold_leaf_ornament.add(gold_upper_leaf_vein);

  const mainVeinTs = [0.28, 0.40, 0.52, 0.64, 0.75];
  for (let i = 0; i < mainVeinTs.length; i++) {
    const t = mainVeinTs[i];
    const centerU = 0.350 + (-0.020 - 0.350) * t;
    const centerY = 0.810 + (0.600 - 0.810) * t;
    const halfWidth = 0.054 * Math.sin(Math.PI * t);

    for (const side of [-1, 1]) {
      const endT = Math.min(0.92, t + 0.085);
      const endCenterU = 0.350 + (-0.020 - 0.350) * endT;
      const endCenterY = 0.810 + (0.600 - 0.810) * endT;
      const endU = endCenterU - (endCenterU - centerU) * side * 0.72;
      const endY = endCenterY - (endCenterY - centerY) * side * 0.72;

      const side_veinGeom = createSurfaceLineGeometry(
        [
          [centerU, centerY],
          [(centerU + endU) * 0.5, (centerY + endY) * 0.5],
          [endU, endY],
        ],
        0.00125,
        0.0125
      );
      const side_vein = new THREE.Mesh(side_veinGeom, gold_veinMat);
      side_vein.name = "gold_main_side_vein_" + i + "_" + side;
      gold_leaf_ornament.add(side_vein);
    }
  }

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