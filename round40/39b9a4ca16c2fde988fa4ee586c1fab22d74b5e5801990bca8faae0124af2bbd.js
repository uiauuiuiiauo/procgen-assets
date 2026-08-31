export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_high_top_sneaker";

  const sole_group = new THREE.Group();
  sole_group.name = "sole_group";
  const upper_group = new THREE.Group();
  upper_group.name = "upper_group";
  const laces_group = new THREE.Group();
  laces_group.name = "laces_group";
  const strap_group = new THREE.Group();
  strap_group.name = "strap_group";
  const panel_group = new THREE.Group();
  panel_group.name = "panel_group";
  root.add(sole_group, upper_group, laces_group, strap_group, panel_group);

  sole_group.scale.z = 1.22;
  upper_group.scale.z = 1.22;
  laces_group.scale.z = 1.22;
  strap_group.scale.z = 1.22;
  panel_group.scale.z = 1.22;

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc8c9cc,
    metalness: 0.0,
    roughness: 0.45
  });
  const whiteRubberMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f2,
    metalness: 0.0,
    roughness: 0.8
  });
  const whiteFabricMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    metalness: 0.0,
    roughness: 0.95
  });
  const blackLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.7
  });
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.3
  });
  const darkInteriorMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.95
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x777777,
    metalness: 0.0,
    roughness: 0.95
  });
  const soleLineMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d0,
    metalness: 0.0,
    roughness: 0.8
  });

  function makeShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return shape;
  }

  function makeExtrudeGeom(points, depth, bevelSize, bevelThickness) {
    return new THREE.ExtrudeGeometry(makeShape(points), {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness
    });
  }

  function placeExtruded(mesh, depth) {
    mesh.rotation.y = -Math.PI / 2;
    mesh.position.x = depth / 2;
  }

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function makeSideSeam(name, points, radius, material) {
    const pathPoints = [];
    for (let i = 0; i < points.length; i++) {
      pathPoints.push(new THREE.Vector3(0, points[i][1], points[i][0]));
    }
    const curve = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "centripetal"
    );
    const geom = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 8),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geom, material);
    mesh.name = name;
    mesh.position.x = 0.19;
    panel_group.add(mesh);
    return mesh;
  }

  const outsolePoints = [
    [-1.48, 0.02],
    [-0.82, 0.00],
    [0.88, 0.01],
    [1.42, 0.07],
    [1.58, 0.18],
    [1.57, 0.32],
    [1.43, 0.42],
    [-1.38, 0.42],
    [-1.50, 0.31]
  ];
  const outsoleGeom = makeExtrudeGeom(outsolePoints, 0.88, 0.035, 0.025);
  const outsole = new THREE.Mesh(outsoleGeom, whiteRubberMat);
  outsole.name = "outsole";
  placeExtruded(outsole, 0.88);
  sole_group.add(outsole);

  const midsolePoints = [
    [-1.43, 0.38],
    [1.38, 0.38],
    [1.52, 0.43],
    [1.47, 0.53],
    [-1.34, 0.54],
    [-1.45, 0.48]
  ];
  const midsoleGeom = makeExtrudeGeom(midsolePoints, 0.84, 0.025, 0.018);
  const midsole = new THREE.Mesh(midsoleGeom, whiteRubberMat);
  midsole.name = "midsole";
  placeExtruded(midsole, 0.84);
  sole_group.add(midsole);

  const outsoleGroovePoints = [
    [-1.43, 0.10],
    [-0.72, 0.075],
    [0.70, 0.08],
    [1.18, 0.13],
    [1.42, 0.23]
  ];
  const outsole_grooveGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      outsoleGroovePoints.map((p) => new THREE.Vector3(0, p[1], p[0])),
      false,
      "centripetal"
    ),
    36,
    0.012,
    6,
    false
  );
  const outsole_groove = new THREE.Mesh(outsole_grooveGeom, soleLineMat);
  outsole_groove.name = "outsole_groove";
  outsole_groove.position.x = 0.46;
  sole_group.add(outsole_groove);

  const midsoleSidePoints = [
    [-1.40, 0.455],
    [-0.72, 0.49],
    [0.05, 0.505],
    [0.78, 0.50],
    [1.42, 0.455]
  ];
  const midsole_side_lineGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      midsoleSidePoints.map((p) => new THREE.Vector3(0, p[1], p[0])),
      false,
      "centripetal"
    ),
    40,
    0.012,
    6,
    false
  );
  const midsole_side_line = new THREE.Mesh(midsole_side_lineGeom, soleLineMat);
  midsole_side_line.name = "midsole_side_line";
  midsole_side_line.position.x = 0.445;
  sole_group.add(midsole_side_line);

  const sole_stitchingGeom = new THREE.BoxGeometry(0.014, 0.012, 0.065);
  const sole_stitching = new THREE.InstancedMesh(
    sole_stitchingGeom,
    soleLineMat,
    28
  );
  sole_stitching.name = "sole_stitching";
  const soleStitchDummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const t = i / 27;
    soleStitchDummy.position.set(
      0.452,
      0.492 - t * 0.025,
      -1.27 + t * 2.62
    );
    soleStitchDummy.rotation.set(0, 0, 0);
    soleStitchDummy.updateMatrix();
    sole_stitching.setMatrixAt(i, soleStitchDummy.matrix);
  }
  sole_stitching.instanceMatrix.needsUpdate = true;
  sole_group.add(sole_stitching);

  const heel_bumperGeom = new THREE.BoxGeometry(0.84, 0.25, 0.10);
  const heel_bumper = new THREE.Mesh(heel_bumperGeom, whiteRubberMat);
  heel_bumper.name = "heel_bumper";
  heel_bumper.position.set(0, 0.25, -1.46);
  sole_group.add(heel_bumper);

  const heel_labelGeom = new THREE.BoxGeometry(0.014, 0.18, 0.13);
  const heel_label = new THREE.Mesh(heel_labelGeom, whiteFabricMat);
  heel_label.name = "heel_label";
  heel_label.position.set(0.466, 0.25, -1.42);
  sole_group.add(heel_label);

  const main_upperPoints = [
    [-1.31, 0.52],
    [1.24, 0.52],
    [1.39, 0.60],
    [1.34, 0.73],
    [1.13, 0.82],
    [0.78, 0.89],
    [0.45, 1.02],
    [0.18, 1.20],
    [-0.08, 1.40],
    [-0.34, 1.52],
    [-0.58, 1.45],
    [-0.82, 1.22],
    [-1.10, 1.16],
    [-1.28, 1.03],
    [-1.34, 0.72]
  ];
  const main_upperGeom = makeExtrudeGeom(main_upperPoints, 0.62, 0.055, 0.04);
  const main_upper = new THREE.Mesh(main_upperGeom, silverMat);
  main_upper.name = "main_upper";
  placeExtruded(main_upper, 0.62);
  upper_group.add(main_upper);

  const toe_capGeom = new THREE.SphereGeometry(1, 36, 20);
  const toe_cap = new THREE.Mesh(toe_capGeom, silverMat);
  toe_cap.name = "toe_cap";
  toe_cap.position.set(0, 0.69, 1.08);
  toe_cap.scale.set(0.39, 0.17, 0.42);
  upper_group.add(toe_cap);

  const collar_openingGeom = new THREE.CapsuleGeometry(0.18, 0.45, 8, 20);
  const collar_opening = new THREE.Mesh(collar_openingGeom, darkInteriorMat);
  collar_opening.name = "collar_opening";
  collar_opening.rotation.x = Math.PI / 2;
  collar_opening.scale.set(1.62, 1.0, 0.14);
  collar_opening.position.set(0, 1.39, -0.76);
  upper_group.add(collar_opening);

  const collarPoints = [
    [-1.27, 1.06],
    [-1.12, 1.24],
    [-0.72, 1.43],
    [-0.35, 1.57],
    [-0.10, 1.51],
    [0.08, 1.36],
    [-0.05, 1.25],
    [-0.28, 1.34],
    [-0.53, 1.27],
    [-0.79, 1.13],
    [-1.08, 1.00]
  ];
  const collarGeom = makeExtrudeGeom(collarPoints, 0.66, 0.025, 0.018);
  const collar = new THREE.Mesh(collarGeom, silverMat);
  collar.name = "collar";
  placeExtruded(collar, 0.66);
  upper_group.add(collar);

  const tonguePoints = [
    [-0.42, 1.05],
    [0.42, 1.05],
    [0.39, 1.60],
    [0.25, 1.78],
    [0.00, 1.84],
    [-0.25, 1.78],
    [-0.39, 1.60]
  ];
  const tongueGeom = new THREE.ExtrudeGeometry(makeShape(tonguePoints), {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.025,
    bevelThickness: 0.018
  });
  const tongue = new THREE.Mesh(tongueGeom, silverMat);
  tongue.name = "tongue";
  tongue.rotation.x = -0.48;
  tongue.position.set(0, 0.25, 0.12);
  upper_group.add(tongue);

  const tongue_labelGeom = new THREE.BoxGeometry(0.30, 0.25, 0.025);
  const tongue_label = new THREE.Mesh(tongue_labelGeom, blackLeatherMat);
  tongue_label.name = "tongue_label";
  tongue_label.rotation.x = -0.48;
  tongue_label.position.set(0, 1.65, 0.01);
  upper_group.add(tongue_label);

  const tongue_label_markGeom = new THREE.BoxGeometry(0.15, 0.035, 0.009);
  const tongue_label_mark = new THREE.Mesh(tongue_label_markGeom, silverMat);
  tongue_label_mark.name = "tongue_label_mark";
  tongue_label_mark.rotation.x = -0.48;
  tongue_label_mark.position.set(0, 1.66, -0.006);
  upper_group.add(tongue_label_mark);

  const pull_tabGeom = new THREE.TorusGeometry(0.105, 0.025, 8, 24);
  const pull_tab = new THREE.Mesh(pull_tabGeom, whiteFabricMat);
  pull_tab.name = "pull_tab";
  pull_tab.rotation.y = Math.PI / 2;
  pull_tab.scale.set(0.72, 1.35, 1);
  pull_tab.position.set(0, 1.48, -1.34);
  upper_group.add(pull_tab);

  const quarterPanelPoints = [
    [-1.22, 0.56],
    [-0.55, 0.57],
    [-0.18, 0.72],
    [-0.35, 1.00],
    [-0.72, 1.22],
    [-1.16, 1.12]
  ];
  const quarter_panelGeom = makeExtrudeGeom(
    quarterPanelPoints,
    0.018,
    0.006,
    0.004
  );
  const quarter_panel = new THREE.Mesh(quarter_panelGeom, silverMat);
  quarter_panel.name = "quarter_panel";
  placeExtruded(quarter_panel, 0.018);
  quarter_panel.position.x = 0.365;
  panel_group.add(quarter_panel);

  const eyestayPanelPoints = [
    [-0.28, 1.24],
    [0.05, 1.43],
    [0.40, 1.12],
    [0.92, 0.82],
    [0.72, 0.68],
    [0.15, 0.95],
    [-0.18, 1.12]
  ];
  const eyestay_panelGeom = makeExtrudeGeom(
    eyestayPanelPoints,
    0.018,
    0.006,
    0.004
  );
  const eyestay_panel = new THREE.Mesh(eyestay_panelGeom, silverMat);
  eyestay_panel.name = "eyestay_panel";
  placeExtruded(eyestay_panel, 0.018);
  eyestay_panel.position.x = 0.365;
  panel_group.add(eyestay_panel);

  const toeOverlayPoints = [
    [0.55, 0.55],
    [1.26, 0.56],
    [1.20, 0.76],
    [0.82, 0.86],
    [0.52, 0.75]
  ];
  const toe_overlayGeom = makeExtrudeGeom(
    toeOverlayPoints,
    0.018,
    0.006,
    0.004
  );
  const toe_overlay = new THREE.Mesh(toe_overlayGeom, silverMat);
  toe_overlay.name = "toe_overlay";
  placeExtruded(toe_overlay, 0.018);
  toe_overlay.position.x = 0.365;
  panel_group.add(toe_overlay);

  const strapPoints = [
    [-0.75, 0.82],
    [-0.58, 0.72],
    [0.52, 1.35],
    [0.38, 1.50]
  ];
  const strapGeom = makeExtrudeGeom(strapPoints, 0.045, 0.012, 0.008);

  const strap_outer = new THREE.Mesh(strapGeom, blackLeatherMat);
  strap_outer.name = "strap_outer";
  placeExtruded(strap_outer, 0.045);
  strap_outer.position.x = 0.39;
  strap_group.add(strap_outer);

  const strap_inner = new THREE.Mesh(strapGeom, blackLeatherMat);
  strap_inner.name = "strap_inner";
  placeExtruded(strap_inner, 0.045);
  strap_inner.position.x = -0.345;
  strap_group.add(strap_inner);

  const bucklePoints = [
    [-0.73, 0.79],
    [-0.57, 0.69],
    [-0.29, 0.86],
    [-0.43, 1.00]
  ];
  const buckleGeom = makeExtrudeGeom(bucklePoints, 0.065, 0.012, 0.008);
  const buckle = new THREE.Mesh(buckleGeom, blackPlasticMat);
  buckle.name = "buckle";
  placeExtruded(buckle, 0.065);
  buckle.position.x = 0.425;
  strap_group.add(buckle);

  const strap_holesGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.014, 16);
  const strap_holes = new THREE.InstancedMesh(
    strap_holesGeom,
    darkInteriorMat,
    3
  );
  strap_holes.name = "strap_holes";
  const strapHoleDummy = new THREE.Object3D();
  const strapHolePositions = [
    [0.08, 1.27],
    [0.25, 1.38],
    [0.41, 1.48]
  ];
  for (let i = 0; i < strapHolePositions.length; i++) {
    strapHoleDummy.position.set(
      0.414,
      strapHolePositions[i][1],
      strapHolePositions[i][0]
    );
    strapHoleDummy.rotation.set(0, 0, Math.PI / 2);
    strapHoleDummy.updateMatrix();
    strap_holes.setMatrixAt(i, strapHoleDummy.matrix);
  }
  strap_holes.instanceMatrix.needsUpdate = true;
  strap_group.add(strap_holes);

  const strap_rivetGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 20);
  const strap_rivet = new THREE.Mesh(strap_rivetGeom, silverMat);
  strap_rivet.name = "strap_rivet";
  strap_rivet.rotation.z = Math.PI / 2;
  strap_rivet.position.set(0.416, 1.39, -0.47);
  strap_group.add(strap_rivet);

  const laceRows = [
    [-0.12, 1.36],
    [0.15, 1.23],
    [0.42, 1.10],
    [0.68, 0.97],
    [0.90, 0.87]
  ];

  const eyeletsGeom = new THREE.TorusGeometry(0.042, 0.012, 8, 20);
  const eyelets = new THREE.InstancedMesh(eyeletsGeom, silverMat, 10);
  eyelets.name = "eyelets";
  const eyeletDummy = new THREE.Object3D();
  let eyeletIndex = 0;
  for (let i = 0; i < laceRows.length; i++) {
    for (const side of [-1, 1]) {
      eyeletDummy.position.set(side * 0.342, laceRows[i][1], laceRows[i][0]);
      eyeletDummy.rotation.set(0, Math.PI / 2, 0);
      eyeletDummy.updateMatrix();
      eyelets.setMatrixAt(eyeletIndex, eyeletDummy.matrix);
      eyeletIndex++;
    }
  }
  eyelets.instanceMatrix.needsUpdate = true;
  laces_group.add(eyelets);

  const lacesGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.66, 10);
  const laces = new THREE.InstancedMesh(lacesGeom, whiteFabricMat, 5);
  laces.name = "laces";
  const laceDummy = new THREE.Object3D();
  const upAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < laceRows.length; i++) {
    const start = new THREE.Vector3(-0.30, laceRows[i][1] + 0.015, laceRows[i][0]);
    const end = new THREE.Vector3(0.30, laceRows[i][1] + 0.015, laceRows[i][0]);
    const direction = end.clone().sub(start);
    const length = direction.length();
    laceDummy.position.copy(start).add(end).multiplyScalar(0.5);
    laceDummy.quaternion.setFromUnitVectors(upAxis, direction.normalize());
    laceDummy.scale.set(1, length / 0.66, 1);
    laceDummy.updateMatrix();
    laces.setMatrixAt(i, laceDummy.matrix);
  }
  laces.instanceMatrix.needsUpdate = true;
  laces_group.add(laces);

  const lace_knotGeom = new THREE.SphereGeometry(0.055, 16, 10);
  const lace_knot = new THREE.Mesh(lace_knotGeom, whiteFabricMat);
  lace_knot.name = "lace_knot";
  lace_knot.scale.set(1.25, 0.65, 0.85);
  lace_knot.position.set(0, 0.91, 0.91);
  laces_group.add(lace_knot);

  const lace_loop_leftGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.02, 0.92, 0.91),
      new THREE.Vector3(-0.16, 0.99, 0.88),
      new THREE.Vector3(-0.28, 0.94, 0.94),
      new THREE.Vector3(-0.10, 0.90, 0.98)
    ], true, "centripetal"),
    24,
    0.017,
    8,
    true
  );
  const lace_loop_left = new THREE.Mesh(lace_loop_leftGeom, whiteFabricMat);
  lace_loop_left.name = "lace_loop_left";
  laces_group.add(lace_loop_left);

  const lace_loop_rightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.02, 0.92, 0.91),
      new THREE.Vector3(0.16, 0.98, 0.88),
      new THREE.Vector3(0.27, 0.93, 0.95),
      new THREE.Vector3(0.09, 0.90, 0.99)
    ], true, "centripetal"),
    24,
    0.017,
    8,
    true
  );
  const lace_loop_right = new THREE.Mesh(lace_loop_rightGeom, whiteFabricMat);
  lace_loop_right.name = "lace_loop_right";
  laces_group.add(lace_loop_right);

  const collar_seam = makeSideSeam(
    "collar_seam",
    [
      [-1.18, 1.13],
      [-0.92, 1.29],
      [-0.58, 1.42],
      [-0.25, 1.46],
      [0.02, 1.34]
    ],
    0.008,
    seamMat
  );
  collar_seam.name = "collar_seam";

  const quarter_seam = makeSideSeam(
    "quarter_seam",
    [
      [-1.18, 0.62],
      [-0.92, 0.91],
      [-0.58, 1.12],
      [-0.25, 1.04],
      [-0.10, 0.75]
    ],
    0.008,
    seamMat
  );
  quarter_seam.name = "quarter_seam";

  const eyestay_rear_seam = makeSideSeam(
    "eyestay_rear_seam",
    [
      [-0.18, 1.23],
      [0.05, 1.38],
      [0.30, 1.28],
      [0.52, 1.08]
    ],
    0.008,
    seamMat
  );
  eyestay_rear_seam.name = "eyestay_rear_seam";

  const eyestay_front_seam = makeSideSeam(
    "eyestay_front_seam",
    [
      [0.12, 1.00],
      [0.42, 0.90],
      [0.70, 0.78],
      [0.92, 0.72]
    ],
    0.008,
    seamMat
  );
  eyestay_front_seam.name = "eyestay_front_seam";

  const toe_seam = makeSideSeam(
    "toe_seam",
    [
      [0.56, 0.57],
      [0.58, 0.70],
      [0.72, 0.82],
      [0.94, 0.86]
    ],
    0.009,
    seamMat
  );
  toe_seam.name = "toe_seam";

  const ankle_crease = makeSideSeam(
    "ankle_crease",
    [
      [-1.20, 0.92],
      [-1.02, 1.04],
      [-0.82, 1.12],
      [-0.64, 1.15]
    ],
    0.006,
    seamMat
  );
  ankle_crease.name = "ankle_crease";

  const heel_vertical_seam = makeSideSeam(
    "heel_vertical_seam",
    [
      [-1.28, 0.55],
      [-1.29, 0.76],
      [-1.27, 0.96],
      [-1.22, 1.10]
    ],
    0.008,
    seamMat
  );
  heel_vertical_seam.name = "heel_vertical_seam";

  const toe_stitchingGeom = new THREE.BoxGeometry(0.014, 0.010, 0.055);
  const toe_stitching = new THREE.InstancedMesh(
    toe_stitchingGeom,
    seamMat,
    18
  );
  toe_stitching.name = "toe_stitching";
  const toeStitchDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const row = i < 9 ? 0 : 1;
    const j = i % 9;
    const t = j / 8;
    toeStitchDummy.position.set(
      0.392,
      row === 0 ? 0.61 : 0.76 - t * 0.035,
      0.60 + t * 0.61
    );
    toeStitchDummy.rotation.set(0, 0, 0);
    toeStitchDummy.updateMatrix();
    toe_stitching.setMatrixAt(i, toeStitchDummy.matrix);
  }
  toe_stitching.instanceMatrix.needsUpdate = true;
  panel_group.add(toe_stitching);

  const eyestay_stitchingGeom = new THREE.BoxGeometry(0.014, 0.010, 0.052);
  const eyestay_stitching = new THREE.InstancedMesh(
    eyestay_stitchingGeom,
    seamMat,
    18
  );
  eyestay_stitching.name = "eyestay_stitching";
  const eyeStitchDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const row = i < 9 ? 0 : 1;
    const j = i % 9;
    const t = j / 8;
    eyeStitchDummy.position.set(
      0.392,
      row === 0
        ? 1.29 - t * 0.50
        : 1.01 - t * 0.29,
      -0.12 + t * 1.02
    );
    eyeStitchDummy.rotation.set(0, 0, 0);
    eyeStitchDummy.updateMatrix();
    eyestay_stitching.setMatrixAt(i, eyeStitchDummy.matrix);
  }
  eyestay_stitching.instanceMatrix.needsUpdate = true;
  panel_group.add(eyestay_stitching);

  fitToUnitCube(root);
  return root;

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
}