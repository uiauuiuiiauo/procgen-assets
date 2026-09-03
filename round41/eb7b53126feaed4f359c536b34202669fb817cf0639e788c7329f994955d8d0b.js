export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "lemon_lime_soda_bottle";

  const bottle_assembly = new THREE.Group();
  bottle_assembly.name = "bottle_assembly";
  root.add(bottle_assembly);

  const label_assembly = new THREE.Group();
  label_assembly.name = "label_assembly";
  root.add(label_assembly);

  const cap_assembly = new THREE.Group();
  cap_assembly.name = "cap_assembly";
  root.add(cap_assembly);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f0ef,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7fbf8,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.9,
    ior: 1.33,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const glassEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x596361,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xfff3a6,
    metalness: 0.0,
    roughness: 0.7
  });
  const labelEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xe8d978,
    metalness: 0.0,
    roughness: 0.7
  });
  const greenInkMat = new THREE.MeshStandardMaterial({
    color: 0x07572d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const darkGreenInkMat = new THREE.MeshStandardMaterial({
    color: 0x173e25,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const lemonMat = new THREE.MeshStandardMaterial({
    color: 0xffd500,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf39a12,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const limeMat = new THREE.MeshStandardMaterial({
    color: 0x82c944,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const limeDarkMat = new THREE.MeshStandardMaterial({
    color: 0x24752d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const labelRadius = 0.588;

  function bottleRadiusAt(y) {
    if (y < 0.2) return 0.56 + y * 0.25;
    if (y < 1.7) return 0.61;
    if (y < 1.95) return 0.61 - (y - 1.7) * 0.08;
    if (y < 2.25) return 0.59 - (y - 1.95) * 0.2333;
    if (y < 2.55) return 0.52 - (y - 2.25) * 0.4;
    if (y < 2.85) return 0.4 - (y - 2.55) * 0.4667;
    if (y < 3.15) return 0.26 - (y - 2.85) * 0.1667;
    return 0.21;
  }

  function surfacePoint(u, y, radius, offset) {
    const angle = u / radius;
    const r = radius + offset;
    return new THREE.Vector3(
      Math.sin(angle) * r,
      y,
      Math.cos(angle) * r
    );
  }

  function labelPoint(u, y, offset = 0.008) {
    return surfacePoint(u, y, labelRadius, offset);
  }

  function createCurvedEllipseGeometry(
    cx,
    cy,
    rx,
    ry,
    rotation,
    radius,
    offset,
    segments = 32,
    rings = 5
  ) {
    const positions = [];
    const indices = [];
    const center = surfacePoint(cx, cy, radius, offset);
    positions.push(center.x, center.y, center.z);

    const cosRot = Math.cos(rotation);
    const sinRot = Math.sin(rotation);

    for (let ring = 1; ring <= rings; ring++) {
      const radialScale = ring / rings;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const ex = Math.cos(angle) * rx * radialScale;
        const ey = Math.sin(angle) * ry * radialScale;
        const u = cx + ex * cosRot - ey * sinRot;
        const y = cy + ex * sinRot + ey * cosRot;
        const point = surfacePoint(u, y, radius, offset);
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + (i + 1) % segments);
    }

    for (let ring = 1; ring < rings; ring++) {
      const innerStart = 1 + (ring - 1) * segments;
      const outerStart = 1 + ring * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = innerStart + i;
        const b = outerStart + i;
        const c = outerStart + next;
        const d = innerStart + next;
        indices.push(a, b, c, a, c, d);
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

  function createSurfaceTube(
    coords,
    tubeRadius,
    material,
    surfaceRadius,
    offset,
    closed = false
  ) {
    const points = [];
    for (const coord of coords) {
      points.push(
        surfacePoint(coord[0], coord[1], surfaceRadius, offset)
      );
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, coords.length * 6),
      tubeRadius,
      6,
      closed
    );
    return new THREE.Mesh(geometry, material);
  }

  function ellipseCoords(cx, cy, rx, ry, count) {
    const coords = [];
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      coords.push([
        cx + Math.cos(angle) * rx,
        cy + Math.sin(angle) * ry
      ]);
    }
    return coords;
  }

  const bottleProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.42, 0.00),
    new THREE.Vector2(0.50, 0.025),
    new THREE.Vector2(0.55, 0.07),
    new THREE.Vector2(0.58, 0.17),
    new THREE.Vector2(0.60, 0.34),
    new THREE.Vector2(0.605, 0.70),
    new THREE.Vector2(0.605, 1.55),
    new THREE.Vector2(0.60, 1.75),
    new THREE.Vector2(0.58, 1.95),
    new THREE.Vector2(0.52, 2.25),
    new THREE.Vector2(0.40, 2.55),
    new THREE.Vector2(0.26, 2.85),
    new THREE.Vector2(0.22, 3.10),
    new THREE.Vector2(0.21, 3.45),
    new THREE.Vector2(0.21, 3.78),
    new THREE.Vector2(0.22, 3.88),
    new THREE.Vector2(0.27, 3.94),
    new THREE.Vector2(0.27, 4.01),
    new THREE.Vector2(0.21, 4.06),
    new THREE.Vector2(0.00, 4.06)
  ];
  const bottle_glassGeom = new THREE.LatheGeometry(bottleProfile, 64);
  const bottle_glass = new THREE.Mesh(bottle_glassGeom, glassMat);
  bottle_glass.name = "bottle_glass";
  bottle_assembly.add(bottle_glass);

  const liquidProfile = [
    new THREE.Vector2(0.00, 0.10),
    new THREE.Vector2(0.42, 0.10),
    new THREE.Vector2(0.50, 0.15),
    new THREE.Vector2(0.54, 0.30),
    new THREE.Vector2(0.55, 1.60),
    new THREE.Vector2(0.53, 1.90),
    new THREE.Vector2(0.47, 2.20),
    new THREE.Vector2(0.36, 2.50),
    new THREE.Vector2(0.23, 2.76),
    new THREE.Vector2(0.00, 2.76)
  ];
  const liquidGeom = new THREE.LatheGeometry(liquidProfile, 48);
  const liquid = new THREE.Mesh(liquidGeom, liquidMat);
  liquid.name = "liquid";
  bottle_assembly.add(liquid);

  const liquid_surfaceGeom = new THREE.CylinderGeometry(
    0.23,
    0.23,
    0.008,
    48
  );
  const liquid_surface = new THREE.Mesh(
    liquid_surfaceGeom,
    glassEdgeMat
  );
  liquid_surface.name = "liquid_surface";
  liquid_surface.position.y = 2.76;
  bottle_assembly.add(liquid_surface);

  const bottle_base_ringGeom = new THREE.TorusGeometry(
    0.50,
    0.022,
    10,
    64
  );
  const bottle_base_ring = new THREE.Mesh(
    bottle_base_ringGeom,
    glassEdgeMat
  );
  bottle_base_ring.name = "bottle_base_ring";
  bottle_base_ring.rotation.x = Math.PI / 2;
  bottle_base_ring.position.y = 0.065;
  bottle_assembly.add(bottle_base_ring);

  const bottle_base_ridgesGeom = new THREE.SphereGeometry(
    0.025,
    8,
    6
  );
  const bottle_base_ridges = new THREE.InstancedMesh(
    bottle_base_ridgesGeom,
    glassEdgeMat,
    28
  );
  bottle_base_ridges.name = "bottle_base_ridges";

  const base_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    base_dummy.position.set(
      Math.sin(angle) * 0.505,
      0.035,
      Math.cos(angle) * 0.505
    );
    base_dummy.rotation.set(0, angle, 0);
    base_dummy.scale.set(0.65, 0.35, 1.0);
    base_dummy.updateMatrix();
    bottle_base_ridges.setMatrixAt(i, base_dummy.matrix);
  }
  bottle_base_ridges.instanceMatrix.needsUpdate = true;
  bottle_assembly.add(bottle_base_ridges);

  const lower_glass_seamGeom = new THREE.TorusGeometry(
    0.585,
    0.008,
    8,
    64
  );
  const lower_glass_seam = new THREE.Mesh(
    lower_glass_seamGeom,
    glassEdgeMat
  );
  lower_glass_seam.name = "lower_glass_seam";
  lower_glass_seam.rotation.x = Math.PI / 2;
  lower_glass_seam.position.y = 0.18;
  bottle_assembly.add(lower_glass_seam);

  const neck_lower_ringGeom = new THREE.TorusGeometry(
    0.214,
    0.010,
    8,
    48
  );
  const neck_lower_ring = new THREE.Mesh(
    neck_lower_ringGeom,
    glassEdgeMat
  );
  neck_lower_ring.name = "neck_lower_ring";
  neck_lower_ring.rotation.x = Math.PI / 2;
  neck_lower_ring.position.y = 3.77;
  bottle_assembly.add(neck_lower_ring);

  const neck_upper_ringGeom = new THREE.TorusGeometry(
    0.225,
    0.012,
    8,
    48
  );
  const neck_upper_ring = new THREE.Mesh(
    neck_upper_ringGeom,
    glassEdgeMat
  );
  neck_upper_ring.name = "neck_upper_ring";
  neck_upper_ring.rotation.x = Math.PI / 2;
  neck_upper_ring.position.y = 3.88;
  bottle_assembly.add(neck_upper_ring);

  const left_glass_edge_points = [
    new THREE.Vector3(-0.55, 0.18, 0.12),
    new THREE.Vector3(-0.60, 0.75, 0.10),
    new THREE.Vector3(-0.59, 1.75, 0.10),
    new THREE.Vector3(-0.52, 2.25, 0.10),
    new THREE.Vector3(-0.36, 2.65, 0.09),
    new THREE.Vector3(-0.21, 3.05, 0.07),
    new THREE.Vector3(-0.205, 3.70, 0.06)
  ];
  const right_glass_edge_points = left_glass_edge_points.map(
    (point) => new THREE.Vector3(-point.x, point.y, point.z)
  );

  const left_glass_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      left_glass_edge_points,
      false,
      "centripetal"
    ),
    48,
    0.012,
    6,
    false
  );
  const left_glass_edge = new THREE.Mesh(
    left_glass_edgeGeom,
    glassEdgeMat
  );
  left_glass_edge.name = "left_glass_edge";
  bottle_assembly.add(left_glass_edge);

  const right_glass_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      right_glass_edge_points,
      false,
      "centripetal"
    ),
    48,
    0.012,
    6,
    false
  );
  const right_glass_edge = new THREE.Mesh(
    right_glass_edgeGeom,
    glassEdgeMat
  );
  right_glass_edge.name = "right_glass_edge";
  bottle_assembly.add(right_glass_edge);

  const body_highlightGeom = createCurvedEllipseGeometry(
    -0.31,
    2.18,
    0.035,
    0.31,
    -0.08,
    bottleRadiusAt(2.18),
    0.010,
    28,
    5
  );
  const body_highlight = new THREE.Mesh(
    body_highlightGeom,
    highlightMat
  );
  body_highlight.name = "body_highlight";
  bottle_assembly.add(body_highlight);

  const neck_highlightGeom = createCurvedEllipseGeometry(
    -0.075,
    3.38,
    0.018,
    0.27,
    -0.03,
    bottleRadiusAt(3.38),
    0.010,
    24,
    5
  );
  const neck_highlight = new THREE.Mesh(
    neck_highlightGeom,
    highlightMat
  );
  neck_highlight.name = "neck_highlight";
  bottle_assembly.add(neck_highlight);

  const labelGeom = new THREE.CylinderGeometry(
    labelRadius,
    labelRadius,
    1.42,
    64,
    1,
    true
  );
  const label = new THREE.Mesh(labelGeom, labelMat);
  label.name = "label";
  label.position.y = 1.15;
  label_assembly.add(label);

  const label_top_edgeGeom = new THREE.TorusGeometry(
    labelRadius - 0.003,
    0.006,
    8,
    64
  );
  const label_top_edge = new THREE.Mesh(
    label_top_edgeGeom,
    labelEdgeMat
  );
  label_top_edge.name = "label_top_edge";
  label_top_edge.rotation.x = Math.PI / 2;
  label_top_edge.position.y = 1.86;
  label_assembly.add(label_top_edge);

  const label_bottom_edgeGeom = new THREE.TorusGeometry(
    labelRadius - 0.003,
    0.006,
    8,
    64
  );
  const label_bottom_edge = new THREE.Mesh(
    label_bottom_edgeGeom,
    labelEdgeMat
  );
  label_bottom_edge.name = "label_bottom_edge";
  label_bottom_edge.rotation.x = Math.PI / 2;
  label_bottom_edge.position.y = 0.44;
  label_assembly.add(label_bottom_edge);

  const lemon_outlineGeom = createCurvedEllipseGeometry(
    -0.02,
    0.86,
    0.31,
    0.28,
    -0.10,
    labelRadius,
    0.011,
    40,
    6
  );
  const lemon_outline = new THREE.Mesh(
    lemon_outlineGeom,
    darkGreenInkMat
  );
  lemon_outline.name = "lemon_outline";
  label_assembly.add(lemon_outline);

  const lemon_fillGeom = createCurvedEllipseGeometry(
    -0.025,
    0.87,
    0.285,
    0.255,
    -0.10,
    labelRadius,
    0.015,
    40,
    6
  );
  const lemon_fill = new THREE.Mesh(lemon_fillGeom, lemonMat);
  lemon_fill.name = "lemon_fill";
  label_assembly.add(lemon_fill);

  const lemon_shadowGeom = createCurvedEllipseGeometry(
    0.09,
    0.75,
    0.17,
    0.085,
    -0.18,
    labelRadius,
    0.019,
    32,
    5
  );
  const lemon_shadow = new THREE.Mesh(lemon_shadowGeom, orangeMat);
  lemon_shadow.name = "lemon_shadow";
  label_assembly.add(lemon_shadow);

  const lemon_highlightGeom = createCurvedEllipseGeometry(
    -0.14,
    0.99,
    0.065,
    0.035,
    -0.45,
    labelRadius,
    0.021,
    24,
    4
  );
  const lemon_highlight = new THREE.Mesh(
    lemon_highlightGeom,
    highlightMat
  );
  lemon_highlight.name = "lemon_highlight";
  label_assembly.add(lemon_highlight);

  const lemon_specklesGeom = new THREE.CircleGeometry(0.011, 10);
  const lemon_speckles = new THREE.InstancedMesh(
    lemon_specklesGeom,
    highlightMat,
    8
  );
  lemon_speckles.name = "lemon_speckles";

  const specklePositions = [
    [-0.22, 0.91],
    [-0.14, 0.96],
    [-0.07, 0.92],
    [0.00, 0.98],
    [0.08, 0.91],
    [-0.18, 0.84],
    [-0.04, 0.82],
    [0.10, 0.86]
  ];
  const speckle_dummy = new THREE.Object3D();
  for (let i = 0; i < specklePositions.length; i++) {
    const u = specklePositions[i][0];
    const y = specklePositions[i][1];
    const angle = u / labelRadius;
    const point = labelPoint(u, y, 0.024);
    speckle_dummy.position.copy(point);
    speckle_dummy.rotation.set(0, angle, 0);
    const scale = 0.65 + (i % 3) * 0.18;
    speckle_dummy.scale.set(scale, scale, scale);
    speckle_dummy.updateMatrix();
    lemon_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  lemon_speckles.instanceMatrix.needsUpdate = true;
  label_assembly.add(lemon_speckles);

  const lime_slice_outlineGeom = createCurvedEllipseGeometry(
    0.34,
    0.78,
    0.145,
    0.205,
    0.08,
    labelRadius,
    0.022,
    36,
    6
  );
  const lime_slice_outline = new THREE.Mesh(
    lime_slice_outlineGeom,
    darkGreenInkMat
  );
  lime_slice_outline.name = "lime_slice_outline";
  label_assembly.add(lime_slice_outline);

  const lime_slice_fillGeom = createCurvedEllipseGeometry(
    0.34,
    0.78,
    0.125,
    0.183,
    0.08,
    labelRadius,
    0.026,
    36,
    6
  );
  const lime_slice_fill = new THREE.Mesh(
    lime_slice_fillGeom,
    limeMat
  );
  lime_slice_fill.name = "lime_slice_fill";
  label_assembly.add(lime_slice_fill);

  const lime_center = labelPoint(0.34, 0.78, 0.034);
  const lime_veins = new THREE.Group();
  lime_veins.name = "lime_veins";
  for (let i = 0; i < 7; i++) {
    const angle = i / 7 * Math.PI * 2 + 0.12;
    const endU = 0.34 + Math.cos(angle) * 0.105;
    const endY = 0.78 + Math.sin(angle) * 0.155;
    const midU = 0.34 + Math.cos(angle) * 0.052;
    const midY = 0.78 + Math.sin(angle) * 0.078;
    const vein = createSurfaceTube(
      [
        [0.34, 0.78],
        [midU, midY],
        [endU, endY]
      ],
      0.004,
      limeDarkMat,
      labelRadius,
      0.034
    );
    lime_veins.add(vein);
  }
  label_assembly.add(lime_veins);

  const lime_top_leaf_outlineGeom = createCurvedEllipseGeometry(
    0.39,
    1.045,
    0.075,
    0.145,
    -0.55,
    labelRadius,
    0.024,
    28,
    5
  );
  const lime_top_leaf_outline = new THREE.Mesh(
    lime_top_leaf_outlineGeom,
    darkGreenInkMat
  );
  lime_top_leaf_outline.name = "lime_top_leaf_outline";
  label_assembly.add(lime_top_leaf_outline);

  const lime_top_leafGeom = createCurvedEllipseGeometry(
    0.39,
    1.045,
    0.062,
    0.128,
    -0.55,
    labelRadius,
    0.028,
    28,
    5
  );
  const lime_top_leaf = new THREE.Mesh(
    lime_top_leafGeom,
    limeDarkMat
  );
  lime_top_leaf.name = "lime_top_leaf";
  label_assembly.add(lime_top_leaf);

  const lime_leaf_vein = createSurfaceTube(
    [
      [0.35, 0.94],
      [0.39, 1.045],
      [0.43, 1.15]
    ],
    0.004,
    darkGreenInkMat,
    labelRadius,
    0.034
  );
  lime_leaf_vein.name = "lime_leaf_vein";
  label_assembly.add(lime_leaf_vein);

  const lemon_stem = createSurfaceTube(
    [
      [0.16, 1.02],
      [0.20, 1.10],
      [0.23, 1.17]
    ],
    0.007,
    darkGreenInkMat,
    labelRadius,
    0.026
  );
  lemon_stem.name = "lemon_stem";
  label_assembly.add(lemon_stem);

  const left_sprig_stem = createSurfaceTube(
    [
      [-0.43, 0.64],
      [-0.40, 0.76],
      [-0.38, 0.91],
      [-0.36, 1.03]
    ],
    0.006,
    darkGreenInkMat,
    labelRadius,
    0.023
  );
  left_sprig_stem.name = "left_sprig_stem";
  label_assembly.add(left_sprig_stem);

  const left_sprig_leaf_a_outlineGeom = createCurvedEllipseGeometry(
    -0.43,
    0.75,
    0.035,
    0.09,
    -0.65,
    labelRadius,
    0.024,
    24,
    4
  );
  const left_sprig_leaf_a_outline = new THREE.Mesh(
    left_sprig_leaf_a_outlineGeom,
    darkGreenInkMat
  );
  left_sprig_leaf_a_outline.name = "left_sprig_leaf_a_outline";
  label_assembly.add(left_sprig_leaf_a_outline);

  const left_sprig_leaf_aGeom = createCurvedEllipseGeometry(
    -0.43,
    0.75,
    0.027,
    0.078,
    -0.65,
    labelRadius,
    0.028,
    24,
    4
  );
  const left_sprig_leaf_a = new THREE.Mesh(
    left_sprig_leaf_aGeom,
    limeDarkMat
  );
  left_sprig_leaf_a.name = "left_sprig_leaf_a";
  label_assembly.add(left_sprig_leaf_a);

  const left_sprig_leaf_b_outlineGeom = createCurvedEllipseGeometry(
    -0.34,
    0.84,
    0.034,
    0.09,
    0.65,
    labelRadius,
    0.024,
    24,
    4
  );
  const left_sprig_leaf_b_outline = new THREE.Mesh(
    left_sprig_leaf_b_outlineGeom,
    darkGreenInkMat
  );
  left_sprig_leaf_b_outline.name = "left_sprig_leaf_b_outline";
  label_assembly.add(left_sprig_leaf_b_outline);

  const left_sprig_leaf_bGeom = createCurvedEllipseGeometry(
    -0.34,
    0.84,
    0.026,
    0.078,
    0.65,
    labelRadius,
    0.028,
    24,
    4
  );
  const left_sprig_leaf_b = new THREE.Mesh(
    left_sprig_leaf_bGeom,
    limeDarkMat
  );
  left_sprig_leaf_b.name = "left_sprig_leaf_b";
  label_assembly.add(left_sprig_leaf_b);

  const glyphs = {
    L: [
      [[0.12, 0.96], [0.10, 0.12], [0.38, 0.04], [0.82, 0.08]]
    ],
    E: [
      [[0.78, 0.94], [0.22, 0.96], [0.12, 0.82], [0.12, 0.16], [0.24, 0.05], [0.80, 0.08]],
      [[0.14, 0.52], [0.65, 0.53]]
    ],
    M: [
      [[0.08, 0.05], [0.10, 0.95]],
      [[0.10, 0.95], [0.43, 0.42], [0.72, 0.94]],
      [[0.72, 0.94], [0.82, 0.05]]
    ],
    O: [
      [[0.43, 0.98], [0.20, 0.90], [0.09, 0.68], [0.11, 0.25], [0.28, 0.06], [0.61, 0.05], [0.80, 0.27], [0.80, 0.70], [0.64, 0.93], [0.43, 0.98]]
    ],
    N: [
      [[0.10, 0.05], [0.10, 0.95]],
      [[0.10, 0.95], [0.80, 0.05]],
      [[0.80, 0.05], [0.80, 0.95]]
    ],
    I: [
      [[0.42, 0.05], [0.42, 0.95]]
    ],
    S: [
      [[0.78, 0.88], [0.62, 0.98], [0.28, 0.94], [0.10, 0.76], [0.18, 0.57], [0.66, 0.48], [0.80, 0.30], [0.68, 0.09], [0.30, 0.04], [0.08, 0.18]]
    ],
    D: [
      [[0.12, 0.05], [0.12, 0.95]],
      [[0.12, 0.95], [0.54, 0.93], [0.79, 0.72], [0.79, 0.29], [0.56, 0.07], [0.12, 0.05]]
    ],
    A: [
      [[0.08, 0.05], [0.42, 0.96], [0.80, 0.05]],
      [[0.22, 0.40], [0.66, 0.40]]
    ],
    "-": [
      [[0.20, 0.48], [0.76, 0.48]]
    ]
  };

  const text_strokeGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    1,
    8
  );

  function createScriptText(text, centerU, baselineY, scale, name) {
    const advance = scale * 0.90;
    const totalWidth = (text.length - 1) * advance + scale * 0.82;
    const startU = centerU - totalWidth / 2;
    const strokes = [];

    for (let i = 0; i < text.length; i++) {
      const paths = glyphs[text[i]] || [];
      for (const path of paths) {
        for (let j = 0; j < path.length - 1; j++) {
          const a = path[j];
          const b = path[j + 1];
          strokes.push([
            startU + i * advance + a[0] * scale,
            baselineY + a[1] * scale,
            startU + i * advance + b[0] * scale,
            baselineY + b[1] * scale
          ]);
        }
      }
    }

    const textMesh = new THREE.InstancedMesh(
      text_strokeGeom,
      greenInkMat,
      strokes.length
    );
    textMesh.name = name;

    const text_dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3();

    for (let i = 0; i < strokes.length; i++) {
      const stroke = strokes[i];
      const p1 = labelPoint(stroke[0], stroke[1], 0.021);
      const p2 = labelPoint(stroke[2], stroke[3], 0.021);
      direction.subVectors(p2, p1);
      const length = direction.length();
      direction.normalize();

      text_dummy.position.copy(p1).add(p2).multiplyScalar(0.5);
      text_dummy.quaternion.setFromUnitVectors(up, direction);
      text_dummy.scale.set(1, length, 1);
      text_dummy.updateMatrix();
      textMesh.setMatrixAt(i, text_dummy.matrix);
    }

    textMesh.instanceMatrix.needsUpdate = true;
    return textMesh;
  }

  const lemon_lime_text = createScriptText(
    "LEMON-LIME",
    0,
    1.45,
    0.16,
    "lemon_lime_text"
  );
  label_assembly.add(lemon_lime_text);

  const soda_text = createScriptText(
    "SODA",
    0,
    1.03,
    0.27,
    "soda_text"
  );
  label_assembly.add(soda_text);

  const cap_tamper_bandGeom = new THREE.CylinderGeometry(
    0.235,
    0.255,
    0.12,
    48,
    1,
    false
  );
  const cap_tamper_band = new THREE.Mesh(
    cap_tamper_bandGeom,
    silverMat
  );
  cap_tamper_band.name = "cap_tamper_band";
  cap_tamper_band.position.y = 3.99;
  cap_assembly.add(cap_tamper_band);

  const cap_skirtGeom = new THREE.CylinderGeometry(
    0.285,
    0.31,
    0.19,
    48,
    1,
    false
  );
  const cap_skirt = new THREE.Mesh(cap_skirtGeom, silverMat);
  cap_skirt.name = "cap_skirt";
  cap_skirt.position.y = 4.13;
  cap_assembly.add(cap_skirt);

  const cap_topGeom = new THREE.CylinderGeometry(
    0.275,
    0.295,
    0.075,
    48,
    1,
    false
  );
  const cap_top = new THREE.Mesh(cap_topGeom, silverMat);
  cap_top.name = "cap_top";
  cap_top.position.y = 4.255;
  cap_assembly.add(cap_top);

  const cap_top_domeGeom = new THREE.SphereGeometry(0.285, 32, 12);
  const cap_top_dome = new THREE.Mesh(
    cap_top_domeGeom,
    silverMat
  );
  cap_top_dome.name = "cap_top_dome";
  cap_top_dome.position.y = 4.285;
  cap_top_dome.scale.set(1, 0.18, 1);
  cap_assembly.add(cap_top_dome);

  const cap_lower_rimGeom = new THREE.TorusGeometry(
    0.247,
    0.014,
    8,
    48
  );
  const cap_lower_rim = new THREE.Mesh(
    cap_lower_rimGeom,
    brushedMetalMat
  );
  cap_lower_rim.name = "cap_lower_rim";
  cap_lower_rim.rotation.x = Math.PI / 2;
  cap_lower_rim.position.y = 3.935;
  cap_assembly.add(cap_lower_rim);

  const cap_crimpsGeom = new THREE.BoxGeometry(
    0.026,
    0.135,
    0.035
  );
  const cap_crimps = new THREE.InstancedMesh(
    cap_crimpsGeom,
    brushedMetalMat,
    24
  );
  cap_crimps.name = "cap_crimps";

  const cap_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    cap_dummy.position.set(
      Math.sin(angle) * 0.302,
      4.115,
      Math.cos(angle) * 0.302
    );
    cap_dummy.rotation.set(0, angle, 0);
    cap_dummy.scale.set(1, 1, 1);
    cap_dummy.updateMatrix();
    cap_crimps.setMatrixAt(i, cap_dummy.matrix);
  }
  cap_crimps.instanceMatrix.needsUpdate = true;
  cap_assembly.add(cap_crimps);

  fitToUnitCube(THREE, root);
  return root;

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
}