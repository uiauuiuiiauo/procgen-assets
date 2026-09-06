export default function generate(THREE) {
  const root = new THREE.Group();

  const jar_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xd99a08,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
  });
  const contentsMat = new THREE.MeshStandardMaterial({
    color: 0xe6a30a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const label_wrapMat = new THREE.MeshStandardMaterial({
    color: 0xffd51a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lid_top_insetMat = new THREE.MeshStandardMaterial({
    color: 0xffd867,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bear_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x4b281f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const bear_brownMat = new THREE.MeshStandardMaterial({
    color: 0x865044,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const bear_creamMat = new THREE.MeshStandardMaterial({
    color: 0xf2e2b5,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const bear_darkMat = new THREE.MeshStandardMaterial({
    color: 0x3b201c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const jar_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(1.20, 0.00),
    new THREE.Vector2(1.38, 0.03),
    new THREE.Vector2(1.48, 0.12),
    new THREE.Vector2(1.52, 0.30),
    new THREE.Vector2(1.52, 1.86),
    new THREE.Vector2(1.50, 2.02),
    new THREE.Vector2(1.45, 2.14),
    new THREE.Vector2(1.35, 2.25),
    new THREE.Vector2(0.00, 2.25),
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, jar_bodyMat);
  root.add(jar_body);

  const contentsGeom = new THREE.CylinderGeometry(1.36, 1.36, 2.08, 64);
  const contents = new THREE.Mesh(contentsGeom, contentsMat);
  contents.position.y = 1.10;
  root.add(contents);

  const bottom_glass_rimGeom = new THREE.TorusGeometry(1.39, 0.075, 12, 64);
  const bottom_glass_rim = new THREE.Mesh(bottom_glass_rimGeom, jar_bodyMat);
  bottom_glass_rim.rotation.x = Math.PI / 2;
  bottom_glass_rim.position.y = 0.13;
  root.add(bottom_glass_rim);

  const neck_glassGeom = new THREE.CylinderGeometry(1.38, 1.43, 0.27, 64);
  const neck_glass = new THREE.Mesh(neck_glassGeom, jar_bodyMat);
  neck_glass.position.y = 2.18;
  root.add(neck_glass);

  const shoulder_glass_ringGeom = new THREE.TorusGeometry(1.40, 0.075, 12, 64);
  const shoulder_glass_ring = new THREE.Mesh(shoulder_glass_ringGeom, jar_bodyMat);
  shoulder_glass_ring.rotation.x = Math.PI / 2;
  shoulder_glass_ring.position.y = 2.18;
  root.add(shoulder_glass_ring);

  const label_wrapGeom = new THREE.CylinderGeometry(
    1.528,
    1.528,
    1.66,
    64,
    1,
    true
  );
  const label_wrap = new THREE.Mesh(label_wrapGeom, label_wrapMat);
  label_wrap.position.y = 1.16;
  root.add(label_wrap);

  const lidProfile = [
    new THREE.Vector2(0.00, 2.29),
    new THREE.Vector2(1.34, 2.29),
    new THREE.Vector2(1.48, 2.32),
    new THREE.Vector2(1.58, 2.40),
    new THREE.Vector2(1.62, 2.52),
    new THREE.Vector2(1.62, 2.96),
    new THREE.Vector2(1.58, 3.10),
    new THREE.Vector2(1.48, 3.19),
    new THREE.Vector2(1.30, 3.23),
    new THREE.Vector2(0.00, 3.23),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, lidMat);
  root.add(lid);

  const lid_lower_lipGeom = new THREE.TorusGeometry(1.50, 0.065, 12, 64);
  const lid_lower_lip = new THREE.Mesh(lid_lower_lipGeom, lidMat);
  lid_lower_lip.rotation.x = Math.PI / 2;
  lid_lower_lip.position.y = 2.42;
  root.add(lid_lower_lip);

  const lid_top_insetGeom = new THREE.CylinderGeometry(1.30, 1.30, 0.026, 64);
  const lid_top_inset = new THREE.Mesh(lid_top_insetGeom, lid_top_insetMat);
  lid_top_inset.position.y = 3.242;
  root.add(lid_top_inset);

  const lid_top_rimGeom = new THREE.TorusGeometry(1.38, 0.055, 12, 64);
  const lid_top_rim = new THREE.Mesh(lid_top_rimGeom, lidMat);
  lid_top_rim.rotation.x = Math.PI / 2;
  lid_top_rim.position.y = 3.235;
  root.add(lid_top_rim);

  const bear_circleGeom = new THREE.CircleGeometry(1, 28);
  const bear_unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);

  function addEllipse(parent, x, y, rx, ry, material, z, rotation) {
    const mesh = new THREE.Mesh(bear_circleGeom, material);
    mesh.position.set(x, y, z);
    mesh.rotation.z = rotation || 0;
    mesh.scale.set(rx, ry, 1);
    parent.add(mesh);
    return mesh;
  }

  function addSegment(parent, x1, y1, x2, y2, width, material, z) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const mesh = new THREE.Mesh(bear_unitBoxGeom, material);
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    mesh.rotation.z = Math.atan2(dy, dx);
    mesh.scale.set(length, width, 0.006);
    parent.add(mesh);
    return mesh;
  }

  function createBearGraphique() {
    const bear = new THREE.Group();

    addEllipse(bear, -0.31, 0.43, 0.22, 0.23, bear_outlineMat, 0.000, 0);
    addEllipse(bear, 0.31, 0.43, 0.22, 0.23, bear_outlineMat, 0.000, 0);
    addEllipse(bear, -0.31, 0.43, 0.15, 0.16, bear_brownMat, 0.001, 0);
    addEllipse(bear, 0.31, 0.43, 0.15, 0.16, bear_brownMat, 0.001, 0);

    addEllipse(bear, -0.39, -0.20, 0.23, 0.34, bear_outlineMat, 0.002, -0.72);
    addEllipse(bear, 0.39, -0.20, 0.23, 0.34, bear_outlineMat, 0.002, 0.72);
    addEllipse(bear, -0.39, -0.20, 0.17, 0.28, bear_brownMat, 0.003, -0.72);
    addEllipse(bear, 0.39, -0.20, 0.17, 0.28, bear_brownMat, 0.003, 0.72);

    addEllipse(bear, 0, -0.23, 0.43, 0.48, bear_outlineMat, 0.004, 0);
    addEllipse(bear, 0, -0.23, 0.38, 0.43, bear_brownMat, 0.005, 0);

    addEllipse(bear, -0.29, -0.58, 0.25, 0.29, bear_outlineMat, 0.006, -0.18);
    addEllipse(bear, 0.29, -0.58, 0.25, 0.29, bear_outlineMat, 0.006, 0.18);
    addEllipse(bear, -0.29, -0.58, 0.20, 0.24, bear_brownMat, 0.007, -0.18);
    addEllipse(bear, 0.29, -0.58, 0.20, 0.24, bear_brownMat, 0.007, 0.18);

    addEllipse(bear, -0.28, -0.67, 0.14, 0.17, bear_creamMat, 0.009, -0.18);
    addEllipse(bear, 0.28, -0.67, 0.14, 0.17, bear_creamMat, 0.009, 0.18);

    addEllipse(bear, 0, 0.27, 0.48, 0.49, bear_outlineMat, 0.010, 0);
    addEllipse(bear, 0, 0.27, 0.43, 0.44, bear_brownMat, 0.011, 0);

    addSegment(bear, -0.18, -0.02, -0.37, -0.28, 0.025, bear_darkMat, 0.012);
    addSegment(bear, 0.18, -0.02, 0.37, -0.28, 0.025, bear_darkMat, 0.012);

    addEllipse(bear, 0, 0.00, 0.24, 0.21, bear_creamMat, 0.013, 0);
    addEllipse(bear, -0.13, 0.28, 0.055, 0.075, bear_darkMat, 0.014, -0.10);
    addEllipse(bear, 0.13, 0.28, 0.055, 0.075, bear_darkMat, 0.014, 0.10);
    addEllipse(bear, 0, 0.065, 0.10, 0.075, bear_darkMat, 0.015, 0);

    addSegment(bear, 0, 0.025, 0, -0.075, 0.022, bear_darkMat, 0.016);
    addSegment(bear, -0.005, -0.070, -0.070, -0.120, 0.020, bear_darkMat, 0.016);
    addSegment(bear, 0.005, -0.070, 0.070, -0.120, 0.020, bear_darkMat, 0.016);

    return bear;
  }

  function placeOnCylinder(object, angle, y, radius) {
    const normal = new THREE.Vector3(
      Math.sin(angle),
      0,
      Math.cos(angle)
    ).normalize();
    object.position.set(normal.x * radius, y, normal.z * radius);
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    root.add(object);
  }

  const left_bear_graphic = createBearGraphique();
  placeOnCylinder(left_bear_graphic, -0.43, 1.13, 1.536);

  const right_bear_graphic = createBearGraphique();
  placeOnCylinder(right_bear_graphic, 0.43, 1.13, 1.536);

  const label_text_lines = new THREE.Group();
  const label_text_lineGeom = new THREE.BoxGeometry(0.16, 0.018, 0.004);
  const label_text_line_data = [
    [-0.05, 0.17, 1.00],
    [-0.03, 0.12, 0.72],
    [-0.04, 0.07, 0.88],
    [-0.02, -0.08, 0.78],
    [-0.04, -0.13, 0.96],
    [-0.01, -0.18, 0.62],
    [-0.04, -0.33, 0.84],
    [-0.02, -0.38, 0.70],
  ];
  for (let i = 0; i < label_text_line_data.length; i++) {
    const data = label_text_line_data[i];
    const label_text_line = new THREE.Mesh(label_text_lineGeom, bear_darkMat);
    label_text_line.position.set(data[0], data[1], 0);
    label_text_line.scale.x = data[2];
    label_text_lines.add(label_text_line);
  }
  placeOnCylinder(label_text_lines, -1.05, 1.25, 1.538);

  const right_label_marks = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const right_label_mark = new THREE.Mesh(label_text_lineGeom, bear_outlineMat);
    right_label_mark.position.set(0, 0.12 - i * 0.075, 0);
    right_label_mark.scale.x = 0.55 + (i % 2) * 0.18;
    right_label_marks.add(right_label_mark);
  }
  placeOnCylinder(right_label_marks, 1.05, 1.24, 1.538);

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