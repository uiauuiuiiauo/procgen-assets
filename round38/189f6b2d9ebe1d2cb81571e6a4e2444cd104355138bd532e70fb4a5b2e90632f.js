export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_gold_ring";

  const ring_assembly = new THREE.Group();
  ring_assembly.name = "ring_assembly";
  root.add(ring_assembly);

  const outerR = 1.22;
  const innerR = 0.80;
  const bandDepth = 0.36;
  const bevelThickness = 0.07;
  const frontSurfaceZ = bandDepth * 0.5 + bevelThickness + 0.004;
  const ornamentZ = frontSurfaceZ + 0.002;

  const ring_bandMat = new THREE.MeshStandardMaterial({
    color: 0xd5aa68,
    metalness: 0.6,
    roughness: 0.2,
  });
  const ring_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xe2bd7d,
    metalness: 0.6,
    roughness: 0.2,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x4a2d18,
    metalness: 0.0,
    roughness: 0.7,
  });
  const engraving_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xb87b38,
    metalness: 0.5,
    roughness: 0.25,
  });

  const ring_shape = new THREE.Shape();
  ring_shape.absarc(0, 0, outerR, 0, Math.PI * 2, false);
  const ring_hole = new THREE.Path();
  ring_hole.absarc(0, 0, innerR, 0, Math.PI * 2, true);
  ring_shape.holes.push(ring_hole);

  const ring_bandGeom = new THREE.ExtrudeGeometry(ring_shape, {
    depth: bandDepth,
    steps: 1,
    curveSegments: 96,
    bevelEnabled: true,
    bevelThickness,
    bevelSize: 0.055,
    bevelSegments: 5,
  });
  ring_bandGeom.translate(0, 0, -bandDepth * 0.5);

  const ring_band = new THREE.Mesh(ring_bandGeom, ring_bandMat);
  ring_band.name = "ring_band";
  ring_assembly.add(ring_band);

  const outer_front_rimGeom = new THREE.TorusGeometry(
    outerR - 0.035,
    0.022,
    10,
    128
  );
  const outer_front_rim = new THREE.Mesh(outer_front_rimGeom, ring_edgeMat);
  outer_front_rim.name = "outer_front_rim";
  outer_front_rim.position.z = frontSurfaceZ - 0.006;
  ring_assembly.add(outer_front_rim);

  const inner_front_rimGeom = new THREE.TorusGeometry(
    innerR + 0.035,
    0.022,
    10,
    128
  );
  const inner_front_rim = new THREE.Mesh(inner_front_rimGeom, ring_edgeMat);
  inner_front_rim.name = "inner_front_rim";
  inner_front_rim.position.z = frontSurfaceZ - 0.006;
  ring_assembly.add(inner_front_rim);

  const outer_back_rimGeom = new THREE.TorusGeometry(
    outerR - 0.035,
    0.018,
    8,
    128
  );
  const outer_back_rim = new THREE.Mesh(outer_back_rimGeom, ring_edgeMat);
  outer_back_rim.name = "outer_back_rim";
  outer_back_rim.position.z = -frontSurfaceZ + 0.006;
  ring_assembly.add(outer_back_rim);

  const inner_back_rimGeom = new THREE.TorusGeometry(
    innerR + 0.035,
    0.018,
    8,
    128
  );
  const inner_back_rim = new THREE.Mesh(inner_back_rimGeom, ring_edgeMat);
  inner_back_rim.name = "inner_back_rim";
  inner_back_rim.position.z = -frontSurfaceZ + 0.006;
  ring_assembly.add(inner_back_rim);

  const ornament_group = new THREE.Group();
  ornament_group.name = "ornament_group";
  ring_assembly.add(ornament_group);

  const outer_engraved_borderGeom = new THREE.TorusGeometry(
    1.145,
    0.010,
    7,
    160
  );
  const outer_engraved_border = new THREE.Mesh(
    outer_engraved_borderGeom,
    engravingMat
  );
  outer_engraved_border.name = "outer_engraved_border";
  outer_engraved_border.position.z = ornamentZ;
  ornament_group.add(outer_engraved_border);

  const inner_engraved_borderGeom = new THREE.TorusGeometry(
    0.925,
    0.010,
    7,
    160
  );
  const inner_engraved_border = new THREE.Mesh(
    inner_engraved_borderGeom,
    engravingMat
  );
  inner_engraved_border.name = "inner_engraved_border";
  inner_engraved_border.position.z = ornamentZ;
  ornament_group.add(inner_engraved_border);

  const ornament_outer_edgeGeom = new THREE.TorusGeometry(
    1.128,
    0.004,
    6,
    160
  );
  const ornament_outer_edge = new THREE.Mesh(
    ornament_outer_edgeGeom,
    engraving_edgeMat
  );
  ornament_outer_edge.name = "ornament_outer_edge";
  ornament_outer_edge.position.z = ornamentZ + 0.006;
  ornament_group.add(ornament_outer_edge);

  const ornament_inner_edgeGeom = new THREE.TorusGeometry(
    0.942,
    0.004,
    6,
    160
  );
  const ornament_inner_edge = new THREE.Mesh(
    ornament_inner_edgeGeom,
    engraving_edgeMat
  );
  ornament_inner_edge.name = "ornament_inner_edge";
  ornament_inner_edge.position.z = ornamentZ + 0.006;
  ornament_group.add(ornament_inner_edge);

  function addEngravedCurve(name, points, closed, width) {
    const engraved_part = new THREE.Group();
    engraved_part.name = name;

    const dark_path_points = points.map(
      (point) => new THREE.Vector3(point.x, point.y, ornamentZ + 0.003)
    );
    const dark_curve = new THREE.CatmullRomCurve3(
      dark_path_points,
      closed,
      "centripetal"
    );
    const dark_width = width * 1.75;
    const dark_geom = new THREE.TubeGeometry(
      dark_curve,
      Math.max(18, points.length * 5),
      dark_width,
      7,
      closed
    );
    const dark_channel = new THREE.Mesh(dark_geom, engravingMat);
    dark_channel.name = name + "_dark_channel";
    engraved_part.add(dark_channel);

    const gold_path_points = points.map(
      (point) => new THREE.Vector3(point.x, point.y, ornamentZ + 0.010)
    );
    const gold_curve = new THREE.CatmullRomCurve3(
      gold_path_points,
      closed,
      "centripetal"
    );
    const gold_width = Math.max(0.002, dark_width * 0.32);
    const gold_geom = new THREE.TubeGeometry(
      gold_curve,
      Math.max(18, points.length * 5),
      gold_width,
      6,
      closed
    );
    const gold_highlight = new THREE.Mesh(gold_geom, engraving_edgeMat);
    gold_highlight.name = name + "_gold_highlight";
    engraved_part.add(gold_highlight);

    ornament_group.add(engraved_part);
    return engraved_part;
  }

  function makeCirclePoints(cx, cy, radius, count) {
    const points = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      points.push(
        new THREE.Vector2(
          cx + Math.cos(angle) * radius,
          cy + Math.sin(angle) * radius
        )
      );
    }
    return points;
  }

  function addSpiral(name, cx, cy, radius, turns, startAngle, direction, width) {
    const points = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const angle = startAngle + direction * turns * Math.PI * 2 * t;
      const currentRadius = radius * (1 - 0.82 * t);
      points.push(
        new THREE.Vector2(
          cx + Math.cos(angle) * currentRadius,
          cy + Math.sin(angle) * currentRadius
        )
      );
    }
    return addEngravedCurve(name, points, false, width);
  }

  const upper_scroll = addSpiral(
    "upper_scroll",
    -0.18,
    1.015,
    0.125,
    1.18,
    0.2,
    1,
    0.010
  );

  const lower_scroll = addSpiral(
    "lower_scroll",
    -0.22,
    -0.985,
    0.135,
    1.20,
    2.6,
    -1,
    0.010
  );

  const left_scroll = addSpiral(
    "left_scroll",
    -1.015,
    -0.10,
    0.105,
    1.10,
    1.4,
    1,
    0.009
  );

  const upper_vine = addEngravedCurve(
    "upper_vine",
    [
      new THREE.Vector2(-0.80, 0.80),
      new THREE.Vector2(-0.67, 0.91),
      new THREE.Vector2(-0.51, 1.01),
      new THREE.Vector2(-0.34, 1.075),
      new THREE.Vector2(-0.18, 1.04),
    ],
    false,
    0.009
  );

  const upper_branch = addEngravedCurve(
    "upper_branch",
    [
      new THREE.Vector2(-0.66, 0.91),
      new THREE.Vector2(-0.62, 1.02),
      new THREE.Vector2(-0.55, 1.10),
      new THREE.Vector2(-0.48, 1.13),
    ],
    false,
    0.008
  );

  const left_vine = addEngravedCurve(
    "left_vine",
    [
      new THREE.Vector2(-1.02, 0.55),
      new THREE.Vector2(-1.075, 0.31),
      new THREE.Vector2(-1.055, 0.06),
      new THREE.Vector2(-1.085, -0.19),
      new THREE.Vector2(-1.00, -0.45),
    ],
    false,
    0.009
  );

  const lower_vine = addEngravedCurve(
    "lower_vine",
    [
      new THREE.Vector2(-0.99, -0.43),
      new THREE.Vector2(-0.87, -0.66),
      new THREE.Vector2(-0.70, -0.84),
      new THREE.Vector2(-0.49, -1.00),
      new THREE.Vector2(-0.25, -1.075),
    ],
    false,
    0.009
  );

  const lower_branch = addEngravedCurve(
    "lower_branch",
    [
      new THREE.Vector2(-0.76, -0.76),
      new THREE.Vector2(-0.65, -0.88),
      new THREE.Vector2(-0.54, -0.98),
      new THREE.Vector2(-0.43, -1.06),
    ],
    false,
    0.008
  );

  const central_sweep = addEngravedCurve(
    "central_sweep",
    [
      new THREE.Vector2(-0.89, 0.70),
      new THREE.Vector2(-0.97, 0.48),
      new THREE.Vector2(-0.96, 0.25),
      new THREE.Vector2(-0.88, 0.02),
      new THREE.Vector2(-0.91, -0.22),
      new THREE.Vector2(-0.82, -0.47),
    ],
    false,
    0.010
  );

  const central_sweep_inner = addEngravedCurve(
    "central_sweep_inner",
    [
      new THREE.Vector2(-0.82, 0.60),
      new THREE.Vector2(-0.89, 0.39),
      new THREE.Vector2(-0.88, 0.17),
      new THREE.Vector2(-0.80, -0.04),
      new THREE.Vector2(-0.83, -0.25),
      new THREE.Vector2(-0.74, -0.43),
    ],
    false,
    0.006
  );

  const upper_leaf = addEngravedCurve(
    "upper_leaf",
    [
      new THREE.Vector2(-0.70, 0.88),
      new THREE.Vector2(-0.58, 0.99),
      new THREE.Vector2(-0.60, 0.85),
    ],
    true,
    0.007
  );

  const left_leaf = addEngravedCurve(
    "left_leaf",
    [
      new THREE.Vector2(-1.03, 0.20),
      new THREE.Vector2(-0.94, 0.10),
      new THREE.Vector2(-1.02, -0.01),
    ],
    true,
    0.007
  );

  const lower_leaf = addEngravedCurve(
    "lower_leaf",
    [
      new THREE.Vector2(-0.84, -0.60),
      new THREE.Vector2(-0.70, -0.68),
      new THREE.Vector2(-0.76, -0.80),
    ],
    true,
    0.007
  );

  const bottom_leaf = addEngravedCurve(
    "bottom_leaf",
    [
      new THREE.Vector2(-0.55, -0.94),
      new THREE.Vector2(-0.42, -1.02),
      new THREE.Vector2(-0.50, -1.10),
    ],
    true,
    0.007
  );

  const upper_panel_divider = addEngravedCurve(
    "upper_panel_divider",
    [
      new THREE.Vector2(-0.58, 1.12),
      new THREE.Vector2(-0.51, 1.02),
      new THREE.Vector2(-0.48, 0.91),
      new THREE.Vector2(-0.42, 0.82),
    ],
    false,
    0.008
  );

  const lower_panel_divider = addEngravedCurve(
    "lower_panel_divider",
    [
      new THREE.Vector2(-0.92, -0.34),
      new THREE.Vector2(-0.82, -0.48),
      new THREE.Vector2(-0.75, -0.63),
      new THREE.Vector2(-0.66, -0.77),
    ],
    false,
    0.008
  );

  const engraved_dot_positions = [
    new THREE.Vector2(-0.43, 1.055),
    new THREE.Vector2(-0.93, 0.61),
    new THREE.Vector2(-1.075, -0.28),
    new THREE.Vector2(-0.62, -0.91),
    new THREE.Vector2(-0.37, -1.085),
    new THREE.Vector2(-0.79, 0.27),
  ];
  const engraved_dotsGeom = new THREE.CircleGeometry(0.015, 14);
  const engraved_dots = new THREE.InstancedMesh(
    engraved_dotsGeom,
    engravingMat,
    engraved_dot_positions.length
  );
  engraved_dots.name = "engraved_dots";
  const engraved_dot_transform = new THREE.Object3D();
  for (let i = 0; i < engraved_dot_positions.length; i++) {
    const point = engraved_dot_positions[i];
    engraved_dot_transform.position.set(point.x, point.y, ornamentZ + 0.011);
    engraved_dot_transform.rotation.set(0, 0, 0);
    engraved_dot_transform.scale.setScalar(1);
    engraved_dot_transform.updateMatrix();
    engraved_dots.setMatrixAt(i, engraved_dot_transform.matrix);
  }
  engraved_dots.instanceMatrix.needsUpdate = true;
  ornament_group.add(engraved_dots);

  const engraved_triangle_shape = new THREE.Shape();
  engraved_triangle_shape.moveTo(0, 0.055);
  engraved_triangle_shape.lineTo(-0.047, -0.043);
  engraved_triangle_shape.lineTo(0.047, -0.043);
  engraved_triangle_shape.closePath();

  const engraved_trianglesGeom = new THREE.ShapeGeometry(
    engraved_triangle_shape
  );
  const engraved_triangle_data = [
    { x: -0.96, y: 0.48, rotation: 0.55, scale: 0.82 },
    { x: -0.72, y: 0.76, rotation: -0.65, scale: 0.72 },
    { x: -0.96, y: -0.38, rotation: 1.15, scale: 0.78 },
    { x: -0.51, y: -0.96, rotation: 2.25, scale: 0.70 },
  ];
  const engraved_triangles = new THREE.InstancedMesh(
    engraved_trianglesGeom,
    engravingMat,
    engraved_triangle_data.length
  );
  engraved_triangles.name = "engraved_triangles";
  const engraved_triangle_transform = new THREE.Object3D();
  for (let i = 0; i < engraved_triangle_data.length; i++) {
    const item = engraved_triangle_data[i];
    engraved_triangle_transform.position.set(
      item.x,
      item.y,
      ornamentZ + 0.010
    );
    engraved_triangle_transform.rotation.set(0, 0, item.rotation);
    engraved_triangle_transform.scale.setScalar(item.scale);
    engraved_triangle_transform.updateMatrix();
    engraved_triangles.setMatrixAt(i, engraved_triangle_transform.matrix);
  }
  engraved_triangles.instanceMatrix.needsUpdate = true;
  ornament_group.add(engraved_triangles);

  const engraved_diamond_shape = new THREE.Shape();
  engraved_diamond_shape.moveTo(0, 0.062);
  engraved_diamond_shape.lineTo(-0.042, 0);
  engraved_diamond_shape.lineTo(0, -0.062);
  engraved_diamond_shape.lineTo(0.042, 0);
  engraved_diamond_shape.closePath();

  const engraved_diamondsGeom = new THREE.ShapeGeometry(
    engraved_diamond_shape
  );
  const engraved_diamond_data = [
    { x: -1.045, y: 0.02, rotation: 0.15, scale: 0.72 },
    { x: -0.81, y: -0.57, rotation: 0.65, scale: 0.68 },
    { x: -0.43, y: -1.02, rotation: -0.55, scale: 0.62 },
  ];
  const engraved_diamonds = new THREE.InstancedMesh(
    engraved_diamondsGeom,
    engravingMat,
    engraved_diamond_data.length
  );
  engraved_diamonds.name = "engraved_diamonds";
  const engraved_diamond_transform = new THREE.Object3D();
  for (let i = 0; i < engraved_diamond_data.length; i++) {
    const item = engraved_diamond_data[i];
    engraved_diamond_transform.position.set(
      item.x,
      item.y,
      ornamentZ + 0.010
    );
    engraved_diamond_transform.rotation.set(0, 0, item.rotation);
    engraved_diamond_transform.scale.setScalar(item.scale);
    engraved_diamond_transform.updateMatrix();
    engraved_diamonds.setMatrixAt(i, engraved_diamond_transform.matrix);
  }
  engraved_diamonds.instanceMatrix.needsUpdate = true;
  ornament_group.add(engraved_diamonds);

  const engraved_notch_shape = new THREE.Shape();
  engraved_notch_shape.moveTo(-0.040, 0.035);
  engraved_notch_shape.lineTo(0.040, 0.035);
  engraved_notch_shape.lineTo(0.014, -0.040);
  engraved_notch_shape.lineTo(-0.014, -0.040);
  engraved_notch_shape.closePath();

  const engraved_notchesGeom = new THREE.ShapeGeometry(engraved_notch_shape);
  const engraved_notch_data = [
    { x: -0.58, y: 1.015, rotation: -0.55, scale: 0.72 },
    { x: -1.02, y: 0.31, rotation: 1.10, scale: 0.68 },
    { x: -0.68, y: -0.82, rotation: 2.30, scale: 0.70 },
  ];
  const engraved_notches = new THREE.InstancedMesh(
    engraved_notchesGeom,
    engravingMat,
    engraved_notch_data.length
  );
  engraved_notches.name = "engraved_notches";
  const engraved_notch_transform = new THREE.Object3D();
  for (let i = 0; i < engraved_notch_data.length; i++) {
    const item = engraved_notch_data[i];
    engraved_notch_transform.position.set(
      item.x,
      item.y,
      ornamentZ + 0.010
    );
    engraved_notch_transform.rotation.set(0, 0, item.rotation);
    engraved_notch_transform.scale.setScalar(item.scale);
    engraved_notch_transform.updateMatrix();
    engraved_notches.setMatrixAt(i, engraved_notch_transform.matrix);
  }
  engraved_notches.instanceMatrix.needsUpdate = true;
  ornament_group.add(engraved_notches);

  const seamAngle = -1.16;
  const band_seamGeom = new THREE.BoxGeometry(0.018, 0.405, 0.012);
  const band_seam = new THREE.Mesh(band_seamGeom, engravingMat);
  band_seam.name = "band_seam";
  band_seam.rotation.z = seamAngle;
  band_seam.position.set(
    Math.sin(seamAngle) * 1.01,
    Math.cos(seamAngle) * 1.01,
    ornamentZ + 0.012
  );
  ornament_group.add(band_seam);

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