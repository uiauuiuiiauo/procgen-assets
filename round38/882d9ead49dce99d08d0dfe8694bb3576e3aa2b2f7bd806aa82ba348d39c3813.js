export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "connector";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5d6342,
    metalness: 0.0,
    roughness: 0.8,
  });
  const raised_detailMat = new THREE.MeshStandardMaterial({
    color: 0x666c49,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dark_detailMat = new THREE.MeshStandardMaterial({
    color: 0x464b32,
    metalness: 0.0,
    roughness: 0.8,
  });
  const inner_boreMat = new THREE.MeshStandardMaterial({
    color: 0x171a12,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.00, -1.10),
    new THREE.Vector2(0.39, -1.10),
    new THREE.Vector2(0.43, -1.02),
    new THREE.Vector2(0.46, -0.88),
    new THREE.Vector2(0.46, 0.98),
    new THREE.Vector2(0.45, 1.10),
    new THREE.Vector2(0.42, 1.18),
    new THREE.Vector2(0.39, 1.22),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 48);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.rotation.x = Math.PI / 2;
  root.add(main_body);

  const rear_collarGeom = new THREE.TorusGeometry(0.475, 0.045, 12, 48);
  const rear_collar = new THREE.Mesh(rear_collarGeom, bodyMat);
  rear_collar.name = "rear_collar";
  rear_collar.position.z = -1.075;
  root.add(rear_collar);

  const rear_capProfile = [
    new THREE.Vector2(0.00, -0.32),
    new THREE.Vector2(0.32, -0.32),
    new THREE.Vector2(0.39, -0.29),
    new THREE.Vector2(0.44, -0.21),
    new THREE.Vector2(0.46, -0.10),
    new THREE.Vector2(0.46, 0.18),
    new THREE.Vector2(0.44, 0.26),
    new THREE.Vector2(0.40, 0.30),
    new THREE.Vector2(0.00, 0.30),
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 48);
  const rear_cap = new THREE.Mesh(rear_capGeom, bodyMat);
  rear_cap.name = "rear_cap";
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -1.38;
  root.add(rear_cap);

  const rear_cap_seamGeom = new THREE.TorusGeometry(0.425, 0.012, 8, 40);
  const rear_cap_seam = new THREE.Mesh(rear_cap_seamGeom, dark_detailMat);
  rear_cap_seam.name = "rear_cap_seam";
  rear_cap_seam.position.z = -1.105;
  root.add(rear_cap_seam);

  const front_end_bandGeom = new THREE.TorusGeometry(0.425, 0.025, 10, 48);
  const front_end_band = new THREE.Mesh(front_end_bandGeom, bodyMat);
  front_end_band.name = "front_end_band";
  front_end_band.position.z = 1.105;
  root.add(front_end_band);

  const front_end_ringGeom = new THREE.RingGeometry(0.275, 0.425, 48);
  const front_end_ring = new THREE.Mesh(front_end_ringGeom, bodyMat);
  front_end_ring.name = "front_end_ring";
  front_end_ring.position.z = 1.224;
  root.add(front_end_ring);

  const front_lipGeom = new THREE.TorusGeometry(0.35, 0.075, 16, 48);
  const front_lip = new THREE.Mesh(front_lipGeom, bodyMat);
  front_lip.name = "front_lip";
  front_lip.position.z = 1.235;
  root.add(front_lip);

  const inner_boreGeom = new THREE.CylinderGeometry(
    0.274,
    0.274,
    0.34,
    40,
    1,
    true
  );
  const inner_bore = new THREE.Mesh(inner_boreGeom, inner_boreMat);
  inner_bore.name = "inner_bore";
  inner_bore.rotation.x = Math.PI / 2;
  inner_bore.position.z = 1.055;
  root.add(inner_bore);

  const bore_backGeom = new THREE.CircleGeometry(0.272, 40);
  const bore_back = new THREE.Mesh(bore_backGeom, inner_boreMat);
  bore_back.name = "bore_back";
  bore_back.position.z = 0.882;
  root.add(bore_back);

  const inner_thread_ridgesGeom = new THREE.TorusGeometry(
    0.247,
    0.014,
    8,
    36
  );
  const inner_thread_ridges = new THREE.InstancedMesh(
    inner_thread_ridgesGeom,
    dark_detailMat,
    3
  );
  inner_thread_ridges.name = "inner_thread_ridges";
  const thread_matrix = new THREE.Matrix4();
  for (let i = 0; i < 3; i++) {
    thread_matrix.makeTranslation(0, 0, 1.178 + i * 0.025);
    inner_thread_ridges.setMatrixAt(i, thread_matrix);
  }
  inner_thread_ridges.instanceMatrix.needsUpdate = true;
  root.add(inner_thread_ridges);

  const longitudinal_ribsGeom = new THREE.CapsuleGeometry(
    0.018,
    1.84,
    4,
    8
  );
  const longitudinal_ribs = new THREE.InstancedMesh(
    longitudinal_ribsGeom,
    raised_detailMat,
    4
  );
  longitudinal_ribs.name = "longitudinal_ribs";
  const rib_angles = [
    Math.PI * 0.25,
    Math.PI * 0.75,
    Math.PI * 1.25,
    Math.PI * 1.75,
  ];
  const rib_quaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const rib_scale = new THREE.Vector3(1, 1, 1);
  const rib_matrix = new THREE.Matrix4();
  for (let i = 0; i < rib_angles.length; i++) {
    const angle = rib_angles[i];
    const rib_position = new THREE.Vector3(
      Math.cos(angle) * 0.457,
      Math.sin(angle) * 0.457,
      0.02
    );
    rib_matrix.compose(rib_position, rib_quaternion, rib_scale);
    longitudinal_ribs.setMatrixAt(i, rib_matrix);
  }
  longitudinal_ribs.instanceMatrix.needsUpdate = true;
  root.add(longitudinal_ribs);

  const label_panelShape = new THREE.Shape();
  const panel_w = 0.34;
  const panel_d = 0.76;
  const panel_r = 0.045;
  label_panelShape.moveTo(-panel_w / 2 + panel_r, -panel_d / 2);
  label_panelShape.lineTo(panel_w / 2 - panel_r, -panel_d / 2);
  label_panelShape.quadraticCurveTo(
    panel_w / 2,
    -panel_d / 2,
    panel_w / 2,
    -panel_d / 2 + panel_r
  );
  label_panelShape.lineTo(panel_w / 2, panel_d / 2 - panel_r);
  label_panelShape.quadraticCurveTo(
    panel_w / 2,
    panel_d / 2,
    panel_w / 2 - panel_r,
    panel_d / 2
  );
  label_panelShape.lineTo(-panel_w / 2 + panel_r, panel_d / 2);
  label_panelShape.quadraticCurveTo(
    -panel_w / 2,
    panel_d / 2,
    -panel_w / 2,
    panel_d / 2 - panel_r
  );
  label_panelShape.lineTo(-panel_w / 2, -panel_d / 2 + panel_r);
  label_panelShape.quadraticCurveTo(
    -panel_w / 2,
    -panel_d / 2,
    -panel_w / 2 + panel_r,
    -panel_d / 2
  );

  const label_panelGeom = new THREE.ExtrudeGeometry(label_panelShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const label_panel = new THREE.Mesh(label_panelGeom, raised_detailMat);
  label_panel.name = "label_panel";
  label_panel.rotation.x = -Math.PI / 2;
  label_panel.position.set(0, 0.452, -0.50);
  root.add(label_panel);

  const label_border = new THREE.Group();
  label_border.name = "label_border";
  const border_y = 0.482;
  const border_xGeom = new THREE.BoxGeometry(0.014, 0.012, 0.65);
  for (const side of [-1, 1]) {
    const border_x = new THREE.Mesh(border_xGeom, dark_detailMat);
    border_x.position.set(side * 0.145, border_y, -0.50);
    label_border.add(border_x);
  }
  const border_zGeom = new THREE.BoxGeometry(0.29, 0.012, 0.014);
  for (const end of [-1, 1]) {
    const border_z = new THREE.Mesh(border_zGeom, dark_detailMat);
    border_z.position.set(0, border_y, -0.50 + end * 0.325);
    label_border.add(border_z);
  }
  root.add(label_border);

  const identification_marks = new THREE.Group();
  identification_marks.name = "identification_marks";

  const identification_circleGeom = new THREE.TorusGeometry(
    0.055,
    0.011,
    8,
    24
  );
  const identification_circle = new THREE.Mesh(
    identification_circleGeom,
    dark_detailMat
  );
  identification_circle.name = "identification_circle";
  identification_circle.rotation.x = Math.PI / 2;
  identification_circle.position.set(0.065, 0.493, -0.665);
  identification_marks.add(identification_circle);

  const identification_cross_verticalGeom = new THREE.BoxGeometry(
    0.016,
    0.012,
    0.105
  );
  const identification_cross_vertical = new THREE.Mesh(
    identification_cross_verticalGeom,
    dark_detailMat
  );
  identification_cross_vertical.name = "identification_cross_vertical";
  identification_cross_vertical.position.set(-0.055, 0.493, -0.405);
  identification_marks.add(identification_cross_vertical);

  const identification_cross_horizontalGeom = new THREE.BoxGeometry(
    0.105,
    0.012,
    0.016
  );
  const identification_cross_horizontal = new THREE.Mesh(
    identification_cross_horizontalGeom,
    dark_detailMat
  );
  identification_cross_horizontal.name = "identification_cross_horizontal";
  identification_cross_horizontal.position.set(-0.055, 0.493, -0.405);
  identification_marks.add(identification_cross_horizontal);

  const identification_text_barsGeom = new THREE.BoxGeometry(
    0.10,
    0.011,
    0.012
  );
  const identification_text_bars = new THREE.InstancedMesh(
    identification_text_barsGeom,
    dark_detailMat,
    4
  );
  identification_text_bars.name = "identification_text_bars";
  const text_matrix = new THREE.Matrix4();
  for (let i = 0; i < 4; i++) {
    text_matrix.makeTranslation(0.055, 0.493, -0.31 + i * 0.038);
    identification_text_bars.setMatrixAt(i, text_matrix);
  }
  identification_text_bars.instanceMatrix.needsUpdate = true;
  identification_marks.add(identification_text_bars);
  root.add(identification_marks);

  const polarity_symbol = new THREE.Group();
  polarity_symbol.name = "polarity_symbol";

  const polarity_ringGeom = new THREE.TorusGeometry(0.145, 0.017, 8, 32);
  const polarity_ring = new THREE.Mesh(polarity_ringGeom, raised_detailMat);
  polarity_ring.name = "polarity_ring";
  polarity_ring.rotation.x = Math.PI / 2;
  polarity_ring.position.set(0, 0.477, 0.25);
  polarity_symbol.add(polarity_ring);

  const polarity_stemGeom = new THREE.BoxGeometry(0.032, 0.018, 0.17);
  const polarity_stem = new THREE.Mesh(polarity_stemGeom, raised_detailMat);
  polarity_stem.name = "polarity_stem";
  polarity_stem.position.set(-0.13, 0.478, 0.39);
  polarity_stem.rotation.y = -0.18;
  polarity_symbol.add(polarity_stem);

  const polarity_crossbarGeom = new THREE.BoxGeometry(
    0.115,
    0.018,
    0.032
  );
  const polarity_crossbar = new THREE.Mesh(
    polarity_crossbarGeom,
    raised_detailMat
  );
  polarity_crossbar.name = "polarity_crossbar";
  polarity_crossbar.position.set(-0.185, 0.478, 0.455);
  polarity_crossbar.rotation.y = -0.18;
  polarity_symbol.add(polarity_crossbar);

  const polarity_arrowheadGeom = new THREE.ConeGeometry(0.048, 0.020, 3);
  const polarity_arrowhead = new THREE.Mesh(
    polarity_arrowheadGeom,
    raised_detailMat
  );
  polarity_arrowhead.name = "polarity_arrowhead";
  polarity_arrowhead.position.set(-0.235, 0.479, 0.49);
  polarity_arrowhead.rotation.y = -0.18;
  polarity_symbol.add(polarity_arrowhead);

  root.add(polarity_symbol);

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