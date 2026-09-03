export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "brass_engraved_bar";

  const bodyW = 4.7;
  const bodyH = 1.05;
  const bodyD = 0.42;
  const cornerR = 0.16;
  const bevelSize = 0.07;
  const bevelThickness = 0.07;

  const brass_barMat = new THREE.MeshStandardMaterial({
    color: 0xd2ad55,
    metalness: 0.6,
    roughness: 0.5,
  });

  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x684019,
    metalness: 0.0,
    roughness: 0.7,
  });

  const engraving_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x38200e,
    metalness: 0.0,
    roughness: 0.7,
  });

  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x765022,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.58,
  });

  const brass_barShape = new THREE.Shape();
  const x0 = -bodyW / 2;
  const x1 = bodyW / 2;
  const y0 = -bodyH / 2;
  const y1 = bodyH / 2;

  brass_barShape.moveTo(x0 + cornerR, y0);
  brass_barShape.lineTo(x1 - cornerR, y0);
  brass_barShape.quadraticCurveTo(x1, y0, x1, y0 + cornerR);
  brass_barShape.lineTo(x1, y1 - cornerR);
  brass_barShape.quadraticCurveTo(x1, y1, x1 - cornerR, y1);
  brass_barShape.lineTo(x0 + cornerR, y1);
  brass_barShape.quadraticCurveTo(x0, y1, x0, y1 - cornerR);
  brass_barShape.lineTo(x0, y0 + cornerR);
  brass_barShape.quadraticCurveTo(x0, y0, x0 + cornerR, y0);

  const brass_barGeom = new THREE.ExtrudeGeometry(brass_barShape, {
    depth: bodyD,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 5,
  });
  brass_barGeom.translate(0, 0, -bodyD / 2);

  const brass_bar = new THREE.Mesh(brass_barGeom, brass_barMat);
  brass_bar.name = "brass_bar";
  root.add(brass_bar);

  const frontZ = bodyD / 2 + bevelThickness;
  const engravingStrokeR = 0.027;
  const engravingShadowR = 0.043;

  function createStrokeMesh(
    name,
    points,
    closed,
    material,
    radius,
    z,
    dx,
    dy
  ) {
    const curve =
      points.length === 2
        ? new THREE.LineCurve3(points[0], points[1])
        : new THREE.CatmullRomCurve3(points, closed, "centripetal");

    const segments = Math.max(8, points.length * 5);
    const geometry = new THREE.TubeGeometry(
      curve,
      segments,
      radius,
      8,
      closed
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(dx, dy, z);
    return mesh;
  }

  const engraving_m = new THREE.Group();
  engraving_m.name = "engraving_m";
  engraving_m.position.x = -1.48;

  const engraving_m_left_stroke = createStrokeMesh(
    "engraving_m_left_stroke",
    [
      new THREE.Vector3(-0.27, -0.29, 0),
      new THREE.Vector3(-0.27, 0.29, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_m_left_groove = createStrokeMesh(
    "engraving_m_left_groove",
    [
      new THREE.Vector3(-0.27, -0.29, 0),
      new THREE.Vector3(-0.27, 0.29, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_m_diagonal_left = createStrokeMesh(
    "engraving_m_diagonal_left",
    [
      new THREE.Vector3(-0.27, 0.27, 0),
      new THREE.Vector3(0.0, -0.06, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_m_diagonal_left_groove = createStrokeMesh(
    "engraving_m_diagonal_left_groove",
    [
      new THREE.Vector3(-0.27, 0.27, 0),
      new THREE.Vector3(0.0, -0.06, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_m_diagonal_right = createStrokeMesh(
    "engraving_m_diagonal_right",
    [
      new THREE.Vector3(0.0, -0.06, 0),
      new THREE.Vector3(0.26, 0.28, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_m_diagonal_right_groove = createStrokeMesh(
    "engraving_m_diagonal_right_groove",
    [
      new THREE.Vector3(0.0, -0.06, 0),
      new THREE.Vector3(0.26, 0.28, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_m_right_stroke = createStrokeMesh(
    "engraving_m_right_stroke",
    [
      new THREE.Vector3(0.26, 0.28, 0),
      new THREE.Vector3(0.26, -0.29, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_m_right_groove = createStrokeMesh(
    "engraving_m_right_groove",
    [
      new THREE.Vector3(0.26, 0.28, 0),
      new THREE.Vector3(0.26, -0.29, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_m_bottom_serif = createStrokeMesh(
    "engraving_m_bottom_serif",
    [
      new THREE.Vector3(0.16, -0.29, 0),
      new THREE.Vector3(0.36, -0.29, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_m_bottom_serif_groove = createStrokeMesh(
    "engraving_m_bottom_serif_groove",
    [
      new THREE.Vector3(0.16, -0.29, 0),
      new THREE.Vector3(0.36, -0.29, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  engraving_m.add(
    engraving_m_left_groove,
    engraving_m_diagonal_left_groove,
    engraving_m_diagonal_right_groove,
    engraving_m_right_groove,
    engraving_m_bottom_serif_groove,
    engraving_m_left_stroke,
    engraving_m_diagonal_left,
    engraving_m_diagonal_right,
    engraving_m_right_stroke,
    engraving_m_bottom_serif
  );
  root.add(engraving_m);

  const engraving_9 = new THREE.Group();
  engraving_9.name = "engraving_9";
  engraving_9.position.x = -0.2;

  const engraving_9_loop_points = [];
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2;
    engraving_9_loop_points.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.205,
        0.12 + Math.sin(angle) * 0.22,
        0
      )
    );
  }

  const engraving_9_loop = createStrokeMesh(
    "engraving_9_loop",
    engraving_9_loop_points,
    true,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_9_loop_groove = createStrokeMesh(
    "engraving_9_loop_groove",
    engraving_9_loop_points,
    true,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_9_tail = createStrokeMesh(
    "engraving_9_tail",
    [
      new THREE.Vector3(0.17, 0.06, 0),
      new THREE.Vector3(0.16, -0.1, 0),
      new THREE.Vector3(0.1, -0.24, 0),
      new THREE.Vector3(-0.02, -0.31, 0),
      new THREE.Vector3(-0.16, -0.28, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_9_tail_groove = createStrokeMesh(
    "engraving_9_tail_groove",
    [
      new THREE.Vector3(0.17, 0.06, 0),
      new THREE.Vector3(0.16, -0.1, 0),
      new THREE.Vector3(0.1, -0.24, 0),
      new THREE.Vector3(-0.02, -0.31, 0),
      new THREE.Vector3(-0.16, -0.28, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  engraving_9.add(
    engraving_9_loop_groove,
    engraving_9_tail_groove,
    engraving_9_loop,
    engraving_9_tail
  );
  root.add(engraving_9);

  const engraving_b = new THREE.Group();
  engraving_b.name = "engraving_b";
  engraving_b.position.x = 0.72;

  const engraving_b_stem = createStrokeMesh(
    "engraving_b_stem",
    [
      new THREE.Vector3(-0.17, -0.3, 0),
      new THREE.Vector3(-0.17, 0.3, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_b_stem_groove = createStrokeMesh(
    "engraving_b_stem_groove",
    [
      new THREE.Vector3(-0.17, -0.3, 0),
      new THREE.Vector3(-0.17, 0.3, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_b_top = createStrokeMesh(
    "engraving_b_top",
    [
      new THREE.Vector3(-0.17, 0.29, 0),
      new THREE.Vector3(0.08, 0.29, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_b_top_groove = createStrokeMesh(
    "engraving_b_top_groove",
    [
      new THREE.Vector3(-0.17, 0.29, 0),
      new THREE.Vector3(0.08, 0.29, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  const engraving_b_bowl = createStrokeMesh(
    "engraving_b_bowl",
    [
      new THREE.Vector3(-0.02, 0.29, 0),
      new THREE.Vector3(0.16, 0.27, 0),
      new THREE.Vector3(0.27, 0.18, 0),
      new THREE.Vector3(0.26, 0.08, 0),
      new THREE.Vector3(0.14, 0.0, 0),
      new THREE.Vector3(0.27, -0.07, 0),
      new THREE.Vector3(0.3, -0.18, 0),
      new THREE.Vector3(0.23, -0.28, 0),
      new THREE.Vector3(0.08, -0.31, 0),
      new THREE.Vector3(-0.02, -0.25, 0),
    ],
    false,
    engravingMat,
    engravingStrokeR,
    frontZ + 0.004,
    0,
    0
  );

  const engraving_b_bowl_groove = createStrokeMesh(
    "engraving_b_bowl_groove",
    [
      new THREE.Vector3(-0.02, 0.29, 0),
      new THREE.Vector3(0.16, 0.27, 0),
      new THREE.Vector3(0.27, 0.18, 0),
      new THREE.Vector3(0.26, 0.08, 0),
      new THREE.Vector3(0.14, 0.0, 0),
      new THREE.Vector3(0.27, -0.07, 0),
      new THREE.Vector3(0.3, -0.18, 0),
      new THREE.Vector3(0.23, -0.28, 0),
      new THREE.Vector3(0.08, -0.31, 0),
      new THREE.Vector3(-0.02, -0.25, 0),
    ],
    false,
    engraving_shadowMat,
    engravingShadowR,
    frontZ - 0.014,
    0,
    0
  );

  engraving_b.add(
    engraving_b_stem_groove,
    engraving_b_top_groove,
    engraving_b_bowl_groove,
    engraving_b_stem,
    engraving_b_top,
    engraving_b_bowl
  );
  root.add(engraving_b);

  const surface_scratches = new THREE.Group();
  surface_scratches.name = "surface_scratches";

  const scratch_data = [
    [-1.96, 0.29, -1.88, 0.34],
    [-1.78, -0.39, -1.75, -0.27],
    [-0.87, 0.31, -0.75, 0.29],
    [-0.72, -0.39, -0.61, -0.37],
    [0.23, 0.34, 0.31, 0.3],
    [0.35, -0.39, 0.46, -0.37],
    [1.42, 0.3, 1.54, 0.27],
    [1.61, -0.35, 1.72, -0.31],
    [1.82, 0.08, 1.98, 0.02],
    [1.26, -0.08, 1.36, -0.12],
    [-2.02, -0.08, -1.94, -0.03],
    [0.02, 0.4, 0.06, 0.32],
  ];

  for (let i = 0; i < scratch_data.length; i++) {
    const scratch = scratch_data[i];
    const scratch_mark = createStrokeMesh(
      "scratch_mark_" + i,
      [
        new THREE.Vector3(scratch[0], scratch[1], 0),
        new THREE.Vector3(scratch[2], scratch[3], 0),
      ],
      false,
      scratchMat,
      0.005,
      frontZ + 0.009,
      0,
      0
    );
    surface_scratches.add(scratch_mark);
  }
  root.add(surface_scratches);

  const patina_specksGeom = new THREE.CircleGeometry(0.014, 10);
  const patina_specksMat = new THREE.MeshStandardMaterial({
    color: 0x5d3b18,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
  });

  const speck_data = [
    [-2.08, 0.12, 0.55],
    [-1.91, -0.22, 0.35],
    [-1.17, 0.35, 0.42],
    [-0.91, -0.18, 0.3],
    [-0.55, 0.38, 0.28],
    [-0.48, -0.4, 0.4],
    [0.18, 0.39, 0.32],
    [0.42, -0.2, 0.25],
    [1.12, 0.36, 0.36],
    [1.36, -0.36, 0.42],
    [1.72, 0.16, 0.3],
    [2.04, -0.13, 0.38],
  ];

  const patina_specks = new THREE.InstancedMesh(
    patina_specksGeom,
    patina_specksMat,
    speck_data.length
  );
  patina_specks.name = "patina_specks";

  const speck_transform = new THREE.Object3D();
  for (let i = 0; i < speck_data.length; i++) {
    const speck = speck_data[i];
    speck_transform.position.set(speck[0], speck[1], frontZ + 0.011);
    speck_transform.rotation.set(0, 0, i * 0.47);
    speck_transform.scale.set(speck[2], speck[2] * 0.65, 1);
    speck_transform.updateMatrix();
    patina_specks.setMatrixAt(i, speck_transform.matrix);
  }
  patina_specks.instanceMatrix.needsUpdate = true;
  root.add(patina_specks);

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