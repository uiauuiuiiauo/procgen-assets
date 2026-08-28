export default function generate(THREE) {
  const table = new THREE.Group();
  table.name = "table";

  const tableW = 2.50;
  const tableD = 1.50;
  const topBase = 0.72;
  const topDepth = 0.10;
  const topBevel = 0.025;
  const topSurfaceY = topBase + topDepth + topBevel;
  const legH = 0.72;
  const inlayY = topSurfaceY + 0.006;

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x71351f,
    metalness: 0.0,
    roughness: 0.6
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x4b2115,
    metalness: 0.0,
    roughness: 0.6
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x35160f,
    metalness: 0.0,
    roughness: 0.6
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x8a4324,
    metalness: 0.0,
    roughness: 0.6
  });
  const inlayMat = new THREE.MeshStandardMaterial({
    color: 0x202321,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const inlayAmberMat = new THREE.MeshStandardMaterial({
    color: 0xa95727,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  const inlayDarkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x54291d,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  const inlayMidWoodMat = new THREE.MeshStandardMaterial({
    color: 0x7c3b22,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x3f1d14,
    metalness: 0.0,
    roughness: 0.6,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide
  });

  function makeRoundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function makePolygonShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function makeHorizontalPolygon(points, material, y, name) {
    const geometry = new THREE.ShapeGeometry(makePolygonShape(points));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    return mesh;
  }

  function makePerimeterPath(halfW, halfD, corner, y) {
    const points = [
      new THREE.Vector3(-halfW + corner, y, -halfD),
      new THREE.Vector3(halfW - corner, y, -halfD),
      new THREE.Vector3(halfW, y, -halfD + corner),
      new THREE.Vector3(halfW, y, halfD - corner),
      new THREE.Vector3(halfW - corner, y, halfD),
      new THREE.Vector3(-halfW + corner, y, halfD),
      new THREE.Vector3(-halfW, y, halfD - corner),
      new THREE.Vector3(-halfW, y, -halfD + corner)
    ];
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const tabletopShape = makeRoundedRectShape(tableW, tableD, 0.065);
  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: topDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: topBevel,
    bevelSize: topBevel,
    bevelSegments: 3,
    curveSegments: 8
  });
  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = -Math.PI / 2;
  tabletop.position.y = topBase;
  table.add(tabletop);

  const edge_moldingPath = makePerimeterPath(1.27, 0.765, 0.075, topBase + 0.015);
  const edge_moldingGeom = new THREE.TubeGeometry(
    edge_moldingPath,
    96,
    0.032,
    10,
    true
  );
  const edge_molding = new THREE.Mesh(edge_moldingGeom, edgeMat);
  edge_molding.name = "edge_molding";
  table.add(edge_molding);

  const lower_edge_trimPath = makePerimeterPath(1.225, 0.715, 0.065, 0.704);
  const lower_edge_trimGeom = new THREE.TubeGeometry(
    lower_edge_trimPath,
    88,
    0.011,
    8,
    true
  );
  const lower_edge_trim = new THREE.Mesh(lower_edge_trimGeom, trimMat);
  lower_edge_trim.name = "lower_edge_trim";
  table.add(lower_edge_trim);

  const legShape = makeRoundedRectShape(0.23, 0.23, 0.018);
  const legsGeom = new THREE.ExtrudeGeometry(legShape, {
    depth: legH,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 4
  });
  legsGeom.rotateX(-Math.PI / 2);

  const legs = new THREE.InstancedMesh(legsGeom, frameMat, 4);
  legs.name = "legs";
  const legDummy = new THREE.Object3D();
  const legPositions = [
    [-1.08, 0.012, 0.59],
    [1.08, 0.012, 0.59],
    [-1.08, 0.012, -0.59],
    [1.08, 0.012, -0.59]
  ];
  for (let i = 0; i < legPositions.length; i++) {
    const p = legPositions[i];
    legDummy.position.set(p[0], p[1], p[2]);
    legDummy.rotation.set(0, 0, 0);
    legDummy.scale.set(1, 1, 1);
    legDummy.updateMatrix();
    legs.setMatrixAt(i, legDummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  table.add(legs);

  const front_apronGeom = new THREE.BoxGeometry(2.15, 0.30, 0.10);
  const front_apron = new THREE.Mesh(front_apronGeom, frameMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.545, 0.625);
  table.add(front_apron);

  const rear_apronGeom = front_apronGeom;
  const rear_apron = new THREE.Mesh(rear_apronGeom, frameMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 0.545, -0.625);
  table.add(rear_apron);

  const left_apronGeom = new THREE.BoxGeometry(0.10, 0.30, 1.10);
  const left_apron = new THREE.Mesh(left_apronGeom, frameMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-1.125, 0.545, 0);
  table.add(left_apron);

  const right_apronGeom = left_apronGeom;
  const right_apron = new THREE.Mesh(right_apronGeom, frameMat);
  right_apron.name = "right_apron";
  right_apron.position.set(1.125, 0.545, 0);
  table.add(right_apron);

  const front_apron_insetGeom = new THREE.BoxGeometry(1.94, 0.17, 0.012);
  const front_apron_inset = new THREE.Mesh(front_apron_insetGeom, tabletopMat);
  front_apron_inset.name = "front_apron_inset";
  front_apron_inset.position.set(0, 0.545, 0.681);
  table.add(front_apron_inset);

  const rear_apron_insetGeom = front_apron_insetGeom;
  const rear_apron_inset = new THREE.Mesh(rear_apron_insetGeom, tabletopMat);
  rear_apron_inset.name = "rear_apron_inset";
  rear_apron_inset.position.set(0, 0.545, -0.681);
  table.add(rear_apron_inset);

  const left_apron_insetGeom = new THREE.BoxGeometry(0.012, 0.17, 0.90);
  const left_apron_inset = new THREE.Mesh(left_apron_insetGeom, tabletopMat);
  left_apron_inset.name = "left_apron_inset";
  left_apron_inset.position.set(-1.181, 0.545, 0);
  table.add(left_apron_inset);

  const right_apron_insetGeom = left_apron_insetGeom;
  const right_apron_inset = new THREE.Mesh(right_apron_insetGeom, tabletopMat);
  right_apron_inset.name = "right_apron_inset";
  right_apron_inset.position.set(1.181, 0.545, 0);
  table.add(right_apron_inset);

  const front_upper_trimGeom = new THREE.BoxGeometry(2.19, 0.018, 0.018);
  const front_upper_trim = new THREE.Mesh(front_upper_trimGeom, trimMat);
  front_upper_trim.name = "front_upper_trim";
  front_upper_trim.position.set(0, 0.690, 0.686);
  table.add(front_upper_trim);

  const rear_upper_trimGeom = front_upper_trimGeom;
  const rear_upper_trim = new THREE.Mesh(rear_upper_trimGeom, trimMat);
  rear_upper_trim.name = "rear_upper_trim";
  rear_upper_trim.position.set(0, 0.690, -0.686);
  table.add(rear_upper_trim);

  const left_upper_trimGeom = new THREE.BoxGeometry(0.018, 0.018, 1.14);
  const left_upper_trim = new THREE.Mesh(left_upper_trimGeom, trimMat);
  left_upper_trim.name = "left_upper_trim";
  left_upper_trim.position.set(-1.186, 0.690, 0);
  table.add(left_upper_trim);

  const right_upper_trimGeom = left_upper_trimGeom;
  const right_upper_trim = new THREE.Mesh(right_upper_trimGeom, trimMat);
  right_upper_trim.name = "right_upper_trim";
  right_upper_trim.position.set(1.186, 0.690, 0);
  table.add(right_upper_trim);

  const front_lower_trimGeom = new THREE.BoxGeometry(2.12, 0.018, 0.018);
  const front_lower_trim = new THREE.Mesh(front_lower_trimGeom, trimMat);
  front_lower_trim.name = "front_lower_trim";
  front_lower_trim.position.set(0, 0.397, 0.686);
  table.add(front_lower_trim);

  const rear_lower_trimGeom = front_lower_trimGeom;
  const rear_lower_trim = new THREE.Mesh(rear_lower_trimGeom, trimMat);
  rear_lower_trim.name = "rear_lower_trim";
  rear_lower_trim.position.set(0, 0.397, -0.686);
  table.add(rear_lower_trim);

  const left_lower_trimGeom = new THREE.BoxGeometry(0.018, 0.018, 1.07);
  const left_lower_trim = new THREE.Mesh(left_lower_trimGeom, trimMat);
  left_lower_trim.name = "left_lower_trim";
  left_lower_trim.position.set(-1.186, 0.397, 0);
  table.add(left_lower_trim);

  const right_lower_trimGeom = left_lower_trimGeom;
  const right_lower_trim = new THREE.Mesh(right_lower_trimGeom, trimMat);
  right_lower_trim.name = "right_lower_trim";
  right_lower_trim.position.set(1.186, 0.397, 0);
  table.add(right_lower_trim);

  const top_wood_grain = new THREE.Group();
  top_wood_grain.name = "top_wood_grain";
  for (let i = 0; i < 10; i++) {
    const baseZ = -0.63 + i * 0.139;
    const points = [];
    for (let j = 0; j <= 7; j++) {
      const x = -1.16 + j * (2.32 / 7);
      const z = baseZ + Math.sin(i * 0.73 + j * 1.17) * 0.018;
      points.push(new THREE.Vector3(x, topSurfaceY + 0.002, z));
    }
    const grainCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const grainGeom = new THREE.TubeGeometry(grainCurve, 28, 0.0022, 5, false);
    const grain = new THREE.Mesh(grainGeom, grainMat);
    grain.name = "top_grain_line_" + i;
    top_wood_grain.add(grain);
  }
  table.add(top_wood_grain);

  const apron_wood_grain = new THREE.Group();
  apron_wood_grain.name = "apron_wood_grain";
  for (let i = 0; i < 5; i++) {
    const baseY = 0.445 + i * 0.050;
    const points = [];
    for (let j = 0; j <= 6; j++) {
      const x = -0.94 + j * (1.88 / 6);
      const y = baseY + Math.sin(i * 0.91 + j * 1.31) * 0.009;
      points.push(new THREE.Vector3(x, y, 0.689));
    }
    const grainCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const grainGeom = new THREE.TubeGeometry(grainCurve, 24, 0.002, 5, false);
    const grain = new THREE.Mesh(grainGeom, grainMat);
    grain.name = "apron_grain_line_" + i;
    apron_wood_grain.add(grain);
  }
  table.add(apron_wood_grain);

  const leg_wood_grain = new THREE.Group();
  leg_wood_grain.name = "leg_wood_grain";
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const xBase = side * 1.08 + (i === 0 ? -0.045 : 0.045);
      const points = [];
      for (let j = 0; j <= 5; j++) {
        const y = 0.07 + j * 0.122;
        const x = xBase + Math.sin(j * 1.23 + i) * 0.008;
        points.push(new THREE.Vector3(x, y, 0.716));
      }
      const grainCurve = new THREE.CatmullRomCurve3(points, false, "centripetal");
      const grainGeom = new THREE.TubeGeometry(grainCurve, 18, 0.002, 5, false);
      const grain = new THREE.Mesh(grainGeom, grainMat);
      grain.name = "leg_grain_line_" + side + "_" + i;
      leg_wood_grain.add(grain);
    }
  }
  table.add(leg_wood_grain);

  const inlay_outer_border = new THREE.Group();
  inlay_outer_border.name = "inlay_outer_border";
  inlay_outer_border.add(
    makeHorizontalPolygon([
      [-0.98, -0.50],
      [0.98, -0.50],
      [0.98, -0.465],
      [-0.98, -0.465]
    ], inlayMat, inlayY, "outer_border_rear"),
    makeHorizontalPolygon([
      [-0.98, 0.465],
      [0.98, 0.465],
      [0.98, 0.50],
      [-0.98, 0.50]
    ], inlayMat, inlayY, "outer_border_front"),
    makeHorizontalPolygon([
      [-0.98, -0.50],
      [-0.945, -0.465],
      [-0.945, 0.465],
      [-0.98, 0.50]
    ], inlayMat, inlayY, "outer_border_left"),
    makeHorizontalPolygon([
      [0.945, -0.465],
      [0.98, -0.50],
      [0.98, 0.50],
      [0.945, 0.465]
    ], inlayMat, inlayY, "outer_border_right")
  );
  table.add(inlay_outer_border);

  const inlay_inner_border = new THREE.Group();
  inlay_inner_border.name = "inlay_inner_border";
  inlay_inner_border.add(
    makeHorizontalPolygon([
      [-0.91, -0.435],
      [0.91, -0.435],
      [0.91, -0.415],
      [-0.91, -0.415]
    ], inlayAmberMat, inlayY + 0.0005, "inner_border_rear"),
    makeHorizontalPolygon([
      [-0.91, 0.415],
      [0.91, 0.415],
      [0.91, 0.435],
      [-0.91, 0.435]
    ], inlayAmberMat, inlayY + 0.0005, "inner_border_front"),
    makeHorizontalPolygon([
      [-0.91, -0.435],
      [-0.885, -0.415],
      [-0.885, 0.415],
      [-0.91, 0.435]
    ], inlayAmberMat, inlayY + 0.0005, "inner_border_left"),
    makeHorizontalPolygon([
      [0.885, -0.415],
      [0.91, -0.435],
      [0.91, 0.435],
      [0.885, 0.415]
    ], inlayAmberMat, inlayY + 0.0005, "inner_border_right")
  );
  table.add(inlay_inner_border);

  const compassX = -0.08;
  const compassZ = -0.005;
  const rosePoints = [];
  const roseGaps = [];
  const pointCount = 16;

  for (let i = 0; i < pointCount; i++) {
    const angle = i / pointCount * Math.PI * 2;
    let radius = 0.31;
    if (i % 4 === 0) radius = 0.82;
    else if (i % 4 === 2) radius = 0.58;
    else if (i % 2 === 1) radius = 0.43;
    rosePoints.push([
      compassX + Math.cos(angle) * radius,
      compassZ + Math.sin(angle) * radius
    ]);
  }

  for (let i = 0; i < pointCount; i++) {
    const current = rosePoints[i];
    const next = rosePoints[(i + 1) % pointCount];
    const angle = (i + 0.5) / pointCount * Math.PI * 2;
    const outerPoint = [
      compassX + Math.cos(angle) * 0.40,
      compassZ + Math.sin(angle) * 0.40
    ];
    roseGaps.push([
      current,
      outerPoint,
      next
    ]);
  }

  const inlay_compass_outline = new THREE.Group();
  inlay_compass_outline.name = "inlay_compass_outline";
  for (let i = 0; i < rosePoints.length; i++) {
    const current = rosePoints[i];
    const next = rosePoints[(i + 1) % rosePoints.length];
    inlay_compass_outline.add(makeHorizontalPolygon([
      [compassX, compassZ],
      current,
      next
    ], inlayMat, inlayY + 0.001, "compass_outline_segment_" + i));
  }
  table.add(inlay_compass_outline);

  const inlay_compass_amber_facets = new THREE.Group();
  inlay_compass_amber_facets.name = "inlay_compass_amber_facets";
  const inlay_compass_dark_facets = new THREE.Group();
  inlay_compass_dark_facets.name = "inlay_compass_dark_facets";

  for (let i = 0; i < rosePoints.length; i++) {
    const current = rosePoints[i];
    const next = rosePoints[(i + 1) % rosePoints.length];
    const insetCurrent = [
      compassX + (current[0] - compassX) * 0.87,
      compassZ + (current[1] - compassZ) * 0.87
    ];
    const insetNext = [
      compassX + (next[0] - compassX) * 0.87,
      compassZ + (next[1] - compassZ) * 0.87
    ];
    const facet = makeHorizontalPolygon([
      [compassX, compassZ],
      insetCurrent,
      insetNext
    ], i % 4 === 0 || i % 4 === 2 ? inlayMidWoodMat : inlayAmberMat,
    inlayY + 0.002,
    "compass_facet_" + i
  );
    if (i % 2 === 0) {
      inlay_compass_amber_facets.add(facet);
    } else {
      inlay_compass_dark_facets.add(facet);
    }
  }
  table.add(inlay_compass_amber_facets);
  table.add(inlay_compass_dark_facets);

  const inlay_compass_gaps = new THREE.Group();
  inlay_compass_gaps.name = "inlay_compass_gaps";
  for (let i = 0; i < roseGaps.length; i++) {
    const gap = roseGaps[i];
    inlay_compass_gaps.add(makeHorizontalPolygon(
      gap,
      inlayMat,
      inlayY + 0.003,
      "compass_gap_" + i
    ));
  }
  table.add(inlay_compass_gaps);

  const inlay_compass_centerGeom = new THREE.CircleGeometry(0.052, 24);
  const inlay_compass_center = new THREE.Mesh(inlay_compass_centerGeom, inlayMat);
  inlay_compass_center.name = "inlay_compass_center";
  inlay_compass_center.rotation.x = -Math.PI / 2;
  inlay_compass_center.position.set(compassX, inlayY + 0.004, compassZ);
  table.add(inlay_compass_center);

  function fitToUnitCube(root) {
    root.updateMatrixWorld(true);
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

  fitToUnitCube(table);
  return table;
}