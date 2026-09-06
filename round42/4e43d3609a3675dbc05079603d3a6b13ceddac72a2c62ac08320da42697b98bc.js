export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cupcake";

  const liner_group = new THREE.Group();
  liner_group.name = "liner_group";
  root.add(liner_group);

  const cake_group = new THREE.Group();
  cake_group.name = "cake_group";
  root.add(cake_group);

  const frosting_group = new THREE.Group();
  frosting_group.name = "frosting_group";
  root.add(frosting_group);

  const topping_group = new THREE.Group();
  topping_group.name = "topping_group";
  root.add(topping_group);

  const cake_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x3d1712,
    metalness: 0.0,
    roughness: 0.9
  });
  const cake_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0x57241b,
    metalness: 0.0,
    roughness: 0.9
  });
  const cake_poresMat = new THREE.MeshStandardMaterial({
    color: 0x1d0807,
    metalness: 0.0,
    roughness: 0.95
  });
  const liner_pleatsMat = new THREE.MeshStandardMaterial({
    color: 0x6a3d49,
    metalness: 0.0,
    roughness: 0.95
  });
  const liner_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0x9a6573,
    metalness: 0.0,
    roughness: 0.95
  });
  const liner_highlightsMat = new THREE.MeshStandardMaterial({
    color: 0xf0d9df,
    metalness: 0.0,
    roughness: 0.95
  });
  const frostingMat = new THREE.MeshStandardMaterial({
    color: 0xd94f63,
    metalness: 0.0,
    roughness: 0.7
  });
  const frosting_poresMat = new THREE.MeshStandardMaterial({
    color: 0x8c2739,
    metalness: 0.0,
    roughness: 0.85
  });
  const white_chocolateMat = new THREE.MeshStandardMaterial({
    color: 0xfff0c9,
    metalness: 0.0,
    roughness: 0.7
  });

  const cake_bodyGeom = new THREE.CylinderGeometry(0.46, 0.40, 0.62, 64);
  const cake_body = new THREE.Mesh(cake_bodyGeom, cake_bodyMat);
  cake_body.name = "cake_body";
  cake_body.position.y = 0.31;
  cake_group.add(cake_body);

  const cake_crownProfile = [
    new THREE.Vector2(0.00, 0.56),
    new THREE.Vector2(0.39, 0.56),
    new THREE.Vector2(0.45, 0.59),
    new THREE.Vector2(0.49, 0.64),
    new THREE.Vector2(0.515, 0.70),
    new THREE.Vector2(0.50, 0.76),
    new THREE.Vector2(0.45, 0.81),
    new THREE.Vector2(0.30, 0.84),
    new THREE.Vector2(0.00, 0.85)
  ];
  const cake_crownGeom = new THREE.LatheGeometry(cake_crownProfile, 64);
  const cake_crown = new THREE.Mesh(cake_crownGeom, cake_bodyMat);
  cake_crown.name = "cake_crown";
  cake_group.add(cake_crown);

  function crownRadiusAt(y) {
    if (y < 0.68) return 0.45 + (y - 0.59) * 0.67;
    if (y < 0.75) return 0.51;
    return Math.max(0.30, 0.51 - (y - 0.75) * 1.55);
  }

  const cake_crumbsGeom = new THREE.DodecahedronGeometry(0.021, 0);
  const cake_crumbs = new THREE.InstancedMesh(cake_crumbsGeom, cake_crumbsMat, 48);
  cake_crumbs.name = "cake_crumbs";
  const crumb_dummy = new THREE.Object3D();
  for (let i = 0; i < 48; i++) {
    const angle = i * 2.399963;
    const y = 0.615 + (i % 8) * 0.022;
    const radius = crownRadiusAt(y) + 0.004;
    const scale = 0.55 + (i % 5) * 0.11;
    crumb_dummy.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    crumb_dummy.rotation.set(i * 0.41, i * 0.73, i * 0.29);
    crumb_dummy.scale.set(scale, scale * 0.72, scale);
    crumb_dummy.updateMatrix();
    cake_crumbs.setMatrixAt(i, crumb_dummy.matrix);
  }
  cake_crumbs.instanceMatrix.needsUpdate = true;
  cake_group.add(cake_crumbs);

  const cake_poresGeom = new THREE.SphereGeometry(0.013, 8, 6);
  const cake_pores = new THREE.InstancedMesh(cake_poresGeom, cake_poresMat, 38);
  cake_pores.name = "cake_pores";
  const pore_dummy = new THREE.Object3D();
  const local_z = new THREE.Vector3(0, 0, 1);
  const radial_normal = new THREE.Vector3();
  for (let i = 0; i < 38; i++) {
    const angle = i * 2.399963 + 0.37;
    const y = 0.625 + (i % 7) * 0.024;
    const radius = crownRadiusAt(y) + 0.002;
    radial_normal.set(Math.cos(angle), 0, Math.sin(angle));
    pore_dummy.position.set(
      radial_normal.x * radius,
      y,
      radial_normal.z * radius
    );
    pore_dummy.quaternion.setFromUnitVectors(local_z, radial_normal);
    pore_dummy.scale.set(
      0.65 + (i % 4) * 0.12,
      0.55 + (i % 3) * 0.13,
      0.22
    );
    pore_dummy.updateMatrix();
    cake_pores.setMatrixAt(i, pore_dummy.matrix);
  }
  cake_pores.instanceMatrix.needsUpdate = true;
  cake_group.add(cake_pores);

  const liner_pleatsGeom = new THREE.CylinderGeometry(0.035, 0.025, 0.56, 4);
  const liner_pleats = new THREE.InstancedMesh(liner_pleatsGeom, liner_pleatsMat, 28);
  liner_pleats.name = "liner_pleats";
  const liner_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    liner_dummy.position.set(
      Math.cos(angle) * 0.445,
      0.315,
      Math.sin(angle) * 0.445
    );
    liner_dummy.rotation.set(0, Math.PI / 4 - angle, 0);
    liner_dummy.scale.set(1, 1, 1);
    liner_dummy.updateMatrix();
    liner_pleats.setMatrixAt(i, liner_dummy.matrix);
  }
  liner_pleats.instanceMatrix.needsUpdate = true;
  liner_group.add(liner_pleats);

  const liner_ridgesGeom = new THREE.CylinderGeometry(0.008, 0.006, 0.55, 5);
  const liner_ridges = new THREE.InstancedMesh(liner_ridgesGeom, liner_ridgesMat, 28);
  liner_ridges.name = "liner_ridges";
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    ridge_dummy.position.set(
      Math.cos(angle) * 0.474,
      0.315,
      Math.sin(angle) * 0.474
    );
    ridge_dummy.rotation.set(0, angle, 0);
    ridge_dummy.scale.set(1, 1, 1);
    ridge_dummy.updateMatrix();
    liner_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  liner_ridges.instanceMatrix.needsUpdate = true;
  liner_group.add(liner_ridges);

  const liner_highlightsShape = new THREE.Shape();
  liner_highlightsShape.moveTo(-0.030, 0.105);
  liner_highlightsShape.lineTo(0.030, 0.105);
  liner_highlightsShape.lineTo(0.000, -0.125);
  liner_highlightsShape.closePath();

  const liner_highlightsGeom = new THREE.ShapeGeometry(liner_highlightsShape);
  const liner_highlights = new THREE.InstancedMesh(
    liner_highlightsGeom,
    liner_highlightsMat,
    14
  );
  liner_highlights.name = "liner_highlights";
  const highlight_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i / 14 * Math.PI * 2;
    highlight_dummy.position.set(
      Math.cos(angle) * 0.482,
      0.555,
      Math.sin(angle) * 0.482
    );
    highlight_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    highlight_dummy.scale.set(0.88 + (i % 3) * 0.06, 1, 1);
    highlight_dummy.updateMatrix();
    liner_highlights.setMatrixAt(i, highlight_dummy.matrix);
  }
  liner_highlights.instanceMatrix.needsUpdate = true;
  liner_group.add(liner_highlights);

  const liner_top_edgeGeom = new THREE.TorusGeometry(0.466, 0.008, 8, 64);
  const liner_top_edge = new THREE.Mesh(liner_top_edgeGeom, liner_highlightsMat);
  liner_top_edge.name = "liner_top_edge";
  liner_top_edge.rotation.x = Math.PI / 2;
  liner_top_edge.position.y = 0.625;
  liner_group.add(liner_top_edge);

  const liner_bottom_edgeGeom = new THREE.TorusGeometry(0.402, 0.007, 8, 64);
  const liner_bottom_edge = new THREE.Mesh(liner_bottom_edgeGeom, liner_pleatsMat);
  liner_bottom_edge.name = "liner_bottom_edge";
  liner_bottom_edge.rotation.x = Math.PI / 2;
  liner_bottom_edge.position.y = 0.027;
  liner_group.add(liner_bottom_edge);

  const frostingProfile = [
    new THREE.Vector2(0.00, 0.74),
    new THREE.Vector2(0.36, 0.74),
    new THREE.Vector2(0.46, 0.75),
    new THREE.Vector2(0.52, 0.79),
    new THREE.Vector2(0.56, 0.84),
    new THREE.Vector2(0.57, 0.89),
    new THREE.Vector2(0.55, 0.94),
    new THREE.Vector2(0.49, 0.98),
    new THREE.Vector2(0.45, 1.01),
    new THREE.Vector2(0.47, 1.04),
    new THREE.Vector2(0.44, 1.08),
    new THREE.Vector2(0.38, 1.11),
    new THREE.Vector2(0.34, 1.12),
    new THREE.Vector2(0.36, 1.15),
    new THREE.Vector2(0.31, 1.19),
    new THREE.Vector2(0.25, 1.21),
    new THREE.Vector2(0.21, 1.22),
    new THREE.Vector2(0.23, 1.25),
    new THREE.Vector2(0.17, 1.29),
    new THREE.Vector2(0.09, 1.31),
    new THREE.Vector2(0.00, 1.32)
  ];
  const frostingGeom = new THREE.LatheGeometry(frostingProfile, 72);
  const frosting = new THREE.Mesh(frostingGeom, frostingMat);
  frosting.name = "frosting";
  frosting_group.add(frosting);

  function frostingRadiusAt(y) {
    if (y < 0.84) return 0.46 + (y - 0.75) * 1.10;
    if (y < 0.94) return 0.56;
    if (y < 1.01) return 0.56 - (y - 0.94) * 1.55;
    if (y < 1.08) return 0.45;
    if (y < 1.15) return 0.45 - (y - 1.08) * 1.55;
    if (y < 1.22) return 0.34 - (y - 1.15) * 1.82;
    return Math.max(0.08, 0.21 - (y - 1.22) * 1.55);
  }

  const frosting_poresGeom = new THREE.SphereGeometry(0.012, 8, 6);
  const frosting_pores = new THREE.InstancedMesh(
    frosting_poresGeom,
    frosting_poresMat,
    22
  );
  frosting_pores.name = "frosting_pores";
  const frosting_pore_dummy = new THREE.Object3D();
  for (let i = 0; i < 22; i++) {
    const angle = i * 2.399963 + 0.18;
    const y = 0.82 + (i % 7) * 0.043;
    const radius = frostingRadiusAt(y) + 0.002;
    radial_normal.set(Math.cos(angle), 0, Math.sin(angle));
    frosting_pore_dummy.position.set(
      radial_normal.x * radius,
      y,
      radial_normal.z * radius
    );
    frosting_pore_dummy.quaternion.setFromUnitVectors(local_z, radial_normal);
    frosting_pore_dummy.scale.set(
      0.65 + (i % 4) * 0.10,
      0.55 + (i % 3) * 0.12,
      0.18
    );
    frosting_pore_dummy.updateMatrix();
    frosting_pores.setMatrixAt(i, frosting_pore_dummy.matrix);
  }
  frosting_pores.instanceMatrix.needsUpdate = true;
  frosting_group.add(frosting_pores);

  const white_chocolate_shavingsShape = new THREE.Shape();
  white_chocolate_shavingsShape.moveTo(-0.095, -0.025);
  white_chocolate_shavingsShape.lineTo(-0.052, -0.040);
  white_chocolate_shavingsShape.lineTo(0.096, -0.018);
  white_chocolate_shavingsShape.lineTo(0.071, 0.034);
  white_chocolate_shavingsShape.lineTo(-0.078, 0.027);
  white_chocolate_shavingsShape.closePath();

  const white_chocolate_shavingsGeom = new THREE.ExtrudeGeometry(
    white_chocolate_shavingsShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 2
    }
  );
  white_chocolate_shavingsGeom.center();

  const shaving_data = [
    [-0.10, 1.345, 0.02, 0.15, -0.45, 0.10, 1.15, 0.90],
    [0.10, 1.330, 0.05, 0.12, 0.55, -0.08, 1.00, 0.85],
    [-0.22, 1.295, 0.08, 0.20, -0.10, 0.18, 0.85, 0.80],
    [0.20, 1.285, -0.08, 0.16, 0.90, -0.15, 0.90, 0.75],
    [0.00, 1.275, 0.18, -0.12, 0.20, 0.08, 1.20, 0.80],
    [-0.30, 1.215, -0.05, 0.35, 0.40, 0.12, 0.75, 0.70],
    [0.30, 1.205, 0.08, 0.28, -0.50, -0.12, 0.72, 0.65],
    [-0.12, 1.225, -0.20, 0.22, 1.10, 0.10, 0.80, 0.70],
    [0.12, 1.245, 0.22, -0.18, -0.80, -0.08, 0.75, 0.65],
    [-0.36, 1.135, 0.18, 0.45, 0.20, 0.15, 0.62, 0.65],
    [0.36, 1.125, -0.12, 0.40, -0.30, -0.14, 0.65, 0.60],
    [-0.25, 1.165, 0.25, 0.32, 0.80, 0.12, 0.62, 0.55],
    [0.25, 1.175, 0.24, 0.25, -1.00, -0.10, 0.60, 0.55],
    [-0.05, 1.355, -0.08, 0.08, 0.20, 0.05, 0.75, 0.55],
    [0.08, 1.315, -0.16, 0.18, -0.40, 0.08, 0.65, 0.50],
    [-0.18, 1.255, 0.00, 0.12, 0.60, 0.10, 0.55, 0.50],
    [0.18, 1.235, 0.02, -0.15, -0.70, -0.08, 0.55, 0.48],
    [0.02, 1.185, -0.30, 0.38, 0.10, 0.12, 0.55, 0.50]
  ];

  const white_chocolate_shavings = new THREE.InstancedMesh(
    white_chocolate_shavingsGeom,
    white_chocolateMat,
    shaving_data.length
  );
  white_chocolate_shavings.name = "white_chocolate_shavings";
  const shaving_dummy = new THREE.Object3D();
  for (let i = 0; i < shaving_data.length; i++) {
    const d = shaving_data[i];
    shaving_dummy.position.set(d[0], d[1], d[2]);
    shaving_dummy.rotation.set(d[3], d[4], d[5]);
    shaving_dummy.scale.set(d[6], d[7], 1);
    shaving_dummy.updateMatrix();
    white_chocolate_shavings.setMatrixAt(i, shaving_dummy.matrix);
  }
  white_chocolate_shavings.instanceMatrix.needsUpdate = true;
  topping_group.add(white_chocolate_shavings);

  const white_chocolate_curl_leftGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.30, 1.16, 0.02),
      new THREE.Vector3(-0.25, 1.23, 0.06),
      new THREE.Vector3(-0.17, 1.27, 0.04),
      new THREE.Vector3(-0.10, 1.24, 0.00)
    ]),
    18,
    0.012,
    7,
    false
  );
  const white_chocolate_curl_left = new THREE.Mesh(
    white_chocolate_curl_leftGeom,
    white_chocolateMat
  );
  white_chocolate_curl_left.name = "white_chocolate_curl_left";
  topping_group.add(white_chocolate_curl_left);

  const white_chocolate_curl_rightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.05, 1.30, -0.02),
      new THREE.Vector3(0.14, 1.31, 0.02),
      new THREE.Vector3(0.22, 1.27, 0.08),
      new THREE.Vector3(0.29, 1.22, 0.10)
    ]),
    18,
    0.011,
    7,
    false
  );
  const white_chocolate_curl_right = new THREE.Mesh(
    white_chocolate_curl_rightGeom,
    white_chocolateMat
  );
  white_chocolate_curl_right.name = "white_chocolate_curl_right";
  topping_group.add(white_chocolate_curl_right);

  const white_chocolate_curl_frontGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.08, 1.20, 0.20),
      new THREE.Vector3(0.00, 1.23, 0.25),
      new THREE.Vector3(0.10, 1.20, 0.27),
      new THREE.Vector3(0.16, 1.16, 0.24)
    ]),
    18,
    0.010,
    7,
    false
  );
  const white_chocolate_curl_front = new THREE.Mesh(
    white_chocolate_curl_frontGeom,
    white_chocolateMat
  );
  white_chocolate_curl_front.name = "white_chocolate_curl_front";
  topping_group.add(white_chocolate_curl_front);

  const white_chocolate_curl_backGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.14, 1.25, -0.14),
      new THREE.Vector3(-0.07, 1.31, -0.17),
      new THREE.Vector3(0.02, 1.32, -0.15),
      new THREE.Vector3(0.10, 1.28, -0.11)
    ]),
    18,
    0.010,
    7,
    false
  );
  const white_chocolate_curl_back = new THREE.Mesh(
    white_chocolate_curl_backGeom,
    white_chocolateMat
  );
  white_chocolate_curl_back.name = "white_chocolate_curl_back";
  topping_group.add(white_chocolate_curl_back);

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