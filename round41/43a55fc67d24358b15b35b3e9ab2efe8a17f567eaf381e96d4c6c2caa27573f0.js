export default function generate(THREE) {
  const root = new THREE.Group();
  const jewelry_group = new THREE.Group();
  jewelry_group.name = "jewelry_group";
  jewelry_group.rotation.set(-0.08, 0.22, -1.04);
  root.add(jewelry_group);

  const outer_frameMat = new THREE.MeshStandardMaterial({
    color: 0xd6a13a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const inset_panelMat = new THREE.MeshStandardMaterial({
    color: 0xa86418,
    metalness: 0.5,
    roughness: 0.35,
  });
  const gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0xdcecff,
    metalness: 0.0,
    roughness: 0.18,
    emissive: 0x253647,
    emissiveIntensity: 0.12,
  });
  const gemstone_facetMat = new THREE.MeshStandardMaterial({
    color: 0xf4f9ff,
    metalness: 0.0,
    roughness: 0.12,
    emissive: 0x334153,
    emissiveIntensity: 0.16,
  });
  const gemstone_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
  });
  const gemstone_backingMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function makeCapsuleShape(width, length) {
    const shape = new THREE.Shape();
    const radius = width * 0.5;
    const half_length = length * 0.5;

    shape.moveTo(-radius, -half_length + radius);
    shape.quadraticCurveTo(-radius, -half_length, 0, -half_length);
    shape.quadraticCurveTo(radius, -half_length, radius, -half_length + radius);
    shape.lineTo(radius, half_length - radius);
    shape.quadraticCurveTo(radius, half_length, 0, half_length);
    shape.quadraticCurveTo(-radius, half_length, -radius, half_length - radius);
    shape.lineTo(-radius, -half_length + radius);
    shape.closePath();
    return shape;
  }

  function makeCapsuleGeometry(width, length, depth, bevel_size, bevel_thickness) {
    return new THREE.ExtrudeGeometry(makeCapsuleShape(width, length), {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: bevel_size,
      bevelThickness: bevel_thickness,
    });
  }

  const outer_frameGeom = makeCapsuleGeometry(0.72, 4.8, 0.14, 0.035, 0.035);
  const outer_frame = new THREE.Mesh(outer_frameGeom, outer_frameMat);
  outer_frame.name = "outer_frame";
  outer_frame.position.z = -0.07;
  jewelry_group.add(outer_frame);

  const inset_panelGeom = makeCapsuleGeometry(0.53, 4.42, 0.018, 0.012, 0.012);
  const inset_panel = new THREE.Mesh(inset_panelGeom, inset_panelMat);
  inset_panel.name = "inset_panel";
  inset_panel.position.z = 0.105;
  jewelry_group.add(inset_panel);

  const side_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 4.12, 12);
  const left_side_rail = new THREE.Mesh(side_railGeom, outer_frameMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.set(-0.292, 0, 0.145);
  jewelry_group.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, outer_frameMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.set(0.292, 0, 0.145);
  jewelry_group.add(right_side_rail);

  const end_railGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.46, 12);
  const upper_end_rail = new THREE.Mesh(end_railGeom, outer_frameMat);
  upper_end_rail.name = "upper_end_rail";
  upper_end_rail.rotation.z = Math.PI / 2;
  upper_end_rail.position.set(0, 2.08, 0.145);
  jewelry_group.add(upper_end_rail);

  const lower_end_rail = new THREE.Mesh(end_railGeom, outer_frameMat);
  lower_end_rail.name = "lower_end_rail";
  lower_end_rail.rotation.z = Math.PI / 2;
  lower_end_rail.position.set(0, -2.08, 0.145);
  jewelry_group.add(lower_end_rail);

  const lower_claspGeom = makeCapsuleGeometry(0.34, 3.72, 0.075, 0.025, 0.02);
  const lower_clasp = new THREE.Mesh(lower_claspGeom, outer_frameMat);
  lower_clasp.name = "lower_clasp";
  lower_clasp.position.set(0.065, -0.13, -0.235);
  jewelry_group.add(lower_clasp);

  const clasp_tipGeom = new THREE.SphereGeometry(0.13, 20, 12);
  const clasp_tip = new THREE.Mesh(clasp_tipGeom, outer_frameMat);
  clasp_tip.name = "clasp_tip";
  clasp_tip.scale.set(0.9, 1.05, 0.65);
  clasp_tip.position.set(0.065, -1.94, -0.16);
  jewelry_group.add(clasp_tip);

  const hinge_loopGeom = new THREE.TorusGeometry(0.115, 0.032, 10, 24);
  const hinge_loop = new THREE.Mesh(hinge_loopGeom, outer_frameMat);
  hinge_loop.name = "hinge_loop";
  hinge_loop.rotation.y = Math.PI / 2;
  hinge_loop.position.set(0.39, -1.73, -0.11);
  jewelry_group.add(hinge_loop);

  const hinge_pinGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.2, 16);
  const hinge_pin = new THREE.Mesh(hinge_pinGeom, outer_frameMat);
  hinge_pin.name = "hinge_pin";
  hinge_pin.rotation.z = Math.PI / 2;
  hinge_pin.position.set(0.34, -1.73, -0.11);
  jewelry_group.add(hinge_pin);

  const clasp_catchGeom = new THREE.BoxGeometry(0.18, 0.2, 0.1);
  const clasp_catch = new THREE.Mesh(clasp_catchGeom, outer_frameMat);
  clasp_catch.name = "clasp_catch";
  clasp_catch.position.set(0.065, 1.82, -0.13);
  jewelry_group.add(clasp_catch);

  const clasp_spring_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.065, -1.7, -0.14),
    new THREE.Vector3(0.065, -1.05, -0.17),
    new THREE.Vector3(0.065, 0, -0.18),
    new THREE.Vector3(0.065, 1.05, -0.17),
    new THREE.Vector3(0.065, 1.78, -0.13),
  ]);
  const clasp_springGeom = new THREE.TubeGeometry(
    clasp_spring_path,
    40,
    0.025,
    8,
    false
  );
  const clasp_spring = new THREE.Mesh(clasp_springGeom, outer_frameMat);
  clasp_spring.name = "clasp_spring";
  jewelry_group.add(clasp_spring);

  const vine_left_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.17, -2.02, 0.147),
    new THREE.Vector3(0.08, -1.72, 0.147),
    new THREE.Vector3(-0.08, -1.38, 0.147),
    new THREE.Vector3(0.09, -1.02, 0.147),
    new THREE.Vector3(-0.08, -0.65, 0.147),
    new THREE.Vector3(0.08, -0.28, 0.147),
    new THREE.Vector3(-0.08, 0.08, 0.147),
    new THREE.Vector3(0.08, 0.45, 0.147),
    new THREE.Vector3(-0.08, 0.82, 0.147),
    new THREE.Vector3(0.08, 1.18, 0.147),
    new THREE.Vector3(-0.07, 1.52, 0.147),
    new THREE.Vector3(0.12, 2.02, 0.147),
  ]);
  const ornamental_vine_leftGeom = new THREE.TubeGeometry(
    vine_left_path,
    72,
    0.014,
    7,
    false
  );
  const ornamental_vine_left = new THREE.Mesh(
    ornamental_vine_leftGeom,
    outer_frameMat
  );
  ornamental_vine_left.name = "ornamental_vine_left";
  jewelry_group.add(ornamental_vine_left);

  const vine_right_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, -2.0, 0.147),
    new THREE.Vector3(-0.07, -1.68, 0.147),
    new THREE.Vector3(0.08, -1.34, 0.147),
    new THREE.Vector3(-0.09, -0.96, 0.147),
    new THREE.Vector3(0.08, -0.6, 0.147),
    new THREE.Vector3(-0.08, -0.22, 0.147),
    new THREE.Vector3(0.08, 0.16, 0.147),
    new THREE.Vector3(-0.08, 0.54, 0.147),
    new THREE.Vector3(0.08, 0.92, 0.147),
    new THREE.Vector3(-0.08, 1.3, 0.147),
    new THREE.Vector3(0.07, 1.66, 0.147),
    new THREE.Vector3(-0.12, 2.0, 0.147),
  ]);
  const ornamental_vine_rightGeom = new THREE.TubeGeometry(
    vine_right_path,
    72,
    0.014,
    7,
    false
  );
  const ornamental_vine_right = new THREE.Mesh(
    ornamental_vine_rightGeom,
    outer_frameMat
  );
  ornamental_vine_right.name = "ornamental_vine_right";
  jewelry_group.add(ornamental_vine_right);

  const branch_path_a = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.01, -1.55, 0.148),
    new THREE.Vector3(-0.12, -1.48, 0.148),
    new THREE.Vector3(-0.21, -1.37, 0.148),
    new THREE.Vector3(-0.24, -1.25, 0.148),
  ]);
  const ornamental_branch_aGeom = new THREE.TubeGeometry(
    branch_path_a,
    18,
    0.012,
    7,
    false
  );
  const ornamental_branch_a = new THREE.Mesh(
    ornamental_branch_aGeom,
    outer_frameMat
  );
  ornamental_branch_a.name = "ornamental_branch_a";
  jewelry_group.add(ornamental_branch_a);

  const branch_path_b = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.01, -0.55, 0.148),
    new THREE.Vector3(0.12, -0.48, 0.148),
    new THREE.Vector3(0.21, -0.37, 0.148),
    new THREE.Vector3(0.24, -0.25, 0.148),
  ]);
  const ornamental_branch_bGeom = new THREE.TubeGeometry(
    branch_path_b,
    18,
    0.012,
    7,
    false
  );
  const ornamental_branch_b = new THREE.Mesh(
    ornamental_branch_bGeom,
    outer_frameMat
  );
  ornamental_branch_b.name = "ornamental_branch_b";
  jewelry_group.add(ornamental_branch_b);

  const branch_path_c = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.01, 0.45, 0.148),
    new THREE.Vector3(-0.12, 0.52, 0.148),
    new THREE.Vector3(-0.21, 0.63, 0.148),
    new THREE.Vector3(-0.24, 0.75, 0.148),
  ]);
  const ornamental_branch_cGeom = new THREE.TubeGeometry(
    branch_path_c,
    18,
    0.012,
    7,
    false
  );
  const ornamental_branch_c = new THREE.Mesh(
    ornamental_branch_cGeom,
    outer_frameMat
  );
  ornamental_branch_c.name = "ornamental_branch_c";
  jewelry_group.add(ornamental_branch_c);

  const branch_path_d = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.01, 1.45, 0.148),
    new THREE.Vector3(0.12, 1.52, 0.148),
    new THREE.Vector3(0.21, 1.63, 0.148),
    new THREE.Vector3(0.24, 1.75, 0.148),
  ]);
  const ornamental_branch_dGeom = new THREE.TubeGeometry(
    branch_path_d,
    18,
    0.012,
    7,
    false
  );
  const ornamental_branch_d = new THREE.Mesh(
    ornamental_branch_dGeom,
    outer_frameMat
  );
  ornamental_branch_d.name = "ornamental_branch_d";
  jewelry_group.add(ornamental_branch_d);

  const gemstone_layout = [
    [-0.18, -1.96, 0.075],
    [0.02, -2.03, 0.1],
    [0.21, -1.91, 0.072],
    [-0.23, -1.72, 0.07],
    [-0.07, -1.66, 0.105],
    [0.12, -1.76, 0.072],
    [0.23, -1.55, 0.07],
    [-0.21, -1.42, 0.075],
    [-0.02, -1.34, 0.105],
    [0.18, -1.46, 0.075],
    [-0.23, -1.16, 0.07],
    [-0.1, -1.06, 0.095],
    [0.1, -1.18, 0.072],
    [0.23, -0.94, 0.072],
    [-0.21, -0.84, 0.075],
    [-0.01, -0.75, 0.105],
    [0.19, -0.86, 0.075],
    [-0.23, -0.57, 0.07],
    [-0.11, -0.46, 0.095],
    [0.09, -0.58, 0.072],
    [0.23, -0.35, 0.072],
    [-0.21, -0.25, 0.075],
    [-0.01, -0.16, 0.105],
    [0.19, -0.27, 0.075],
    [-0.23, 0.03, 0.07],
    [-0.1, 0.14, 0.095],
    [0.09, 0.02, 0.072],
    [0.23, 0.25, 0.072],
    [-0.21, 0.35, 0.075],
    [-0.01, 0.45, 0.105],
    [0.19, 0.34, 0.075],
    [-0.23, 0.63, 0.07],
    [-0.11, 0.74, 0.095],
    [0.09, 0.62, 0.072],
    [0.23, 0.85, 0.072],
    [-0.21, 0.95, 0.075],
    [-0.01, 1.05, 0.105],
    [0.19, 0.94, 0.075],
    [-0.23, 1.23, 0.07],
    [-0.1, 1.34, 0.095],
    [0.09, 1.22, 0.072],
    [0.23, 1.45, 0.072],
    [-0.2, 1.55, 0.075],
    [-0.01, 1.65, 0.102],
    [0.19, 1.54, 0.075],
    [-0.21, 1.82, 0.07],
    [0, 1.9, 0.098],
    [0.21, 1.8, 0.07],
    [-0.09, 2.04, 0.068],
    [0.1, 2.03, 0.068],
  ];

  const gemstone_settingGeom = new THREE.CylinderGeometry(1, 1, 1, 12);
  const gemstone_settings = new THREE.InstancedMesh(
    gemstone_settingGeom,
    outer_frameMat,
    gemstone_layout.length
  );
  gemstone_settings.name = "gemstone_settings";

  const gemstone_backingGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const gemstone_backings = new THREE.InstancedMesh(
    gemstone_backingGeom,
    gemstone_backingMat,
    gemstone_layout.length
  );
  gemstone_backings.name = "gemstone_backings";

  const gemstoneGeom = new THREE.CylinderGeometry(0.62, 1, 1, 10, 1, false);
  const gemstones = new THREE.InstancedMesh(
    gemstoneGeom,
    gemstoneMat,
    gemstone_layout.length
  );
  gemstones.name = "gemstones";

  const gemstone_crownGeom = new THREE.CylinderGeometry(
    0.4,
    0.62,
    1,
    10,
    1,
    false
  );
  const gemstone_crowns = new THREE.InstancedMesh(
    gemstone_crownGeom,
    gemstone_facetMat,
    gemstone_layout.length
  );
  gemstone_crowns.name = "gemstone_crowns";

  const gemstone_highlightGeom = new THREE.SphereGeometry(1, 8, 6);
  const gemstone_highlights = new THREE.InstancedMesh(
    gemstone_highlightGeom,
    gemstone_highlightMat,
    gemstone_layout.length
  );
  gemstone_highlights.name = "gemstone_highlights";

  const instance_dummy = new THREE.Object3D();

  for (let i = 0; i < gemstone_layout.length; i++) {
    const x = gemstone_layout[i][0];
    const y = gemstone_layout[i][1];
    const radius = gemstone_layout[i][2];

    instance_dummy.position.set(x, y, 0.147);
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(radius * 1.24, 0.018, radius * 1.24);
    instance_dummy.updateMatrix();
    gemstone_settings.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.set(x, y, 0.159);
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(radius * 1.05, 0.012, radius * 1.05);
    instance_dummy.updateMatrix();
    gemstone_backings.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.set(x, y, 0.178);
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(radius, 0.035, radius);
    instance_dummy.updateMatrix();
    gemstones.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.set(x, y, 0.2005);
    instance_dummy.rotation.set(Math.PI / 2, 0, 0);
    instance_dummy.scale.set(radius, 0.019, radius);
    instance_dummy.updateMatrix();
    gemstone_crowns.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.set(
      x - radius * 0.18,
      y + radius * 0.2,
      0.214
    );
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(radius * 0.18, radius * 0.18, 0.004);
    instance_dummy.updateMatrix();
    gemstone_highlights.setMatrixAt(i, instance_dummy.matrix);
  }

  gemstone_settings.instanceMatrix.needsUpdate = true;
  gemstone_backings.instanceMatrix.needsUpdate = true;
  gemstones.instanceMatrix.needsUpdate = true;
  gemstone_crowns.instanceMatrix.needsUpdate = true;
  gemstone_highlights.instanceMatrix.needsUpdate = true;

  jewelry_group.add(
    gemstone_settings,
    gemstone_backings,
    gemstones,
    gemstone_crowns,
    gemstone_highlights
  );

  const gemstone_prongGeom = new THREE.SphereGeometry(1, 8, 6);
  const gemstone_prongs = new THREE.InstancedMesh(
    gemstone_prongGeom,
    outer_frameMat,
    gemstone_layout.length * 4
  );
  gemstone_prongs.name = "gemstone_prongs";

  let prong_index = 0;
  for (let i = 0; i < gemstone_layout.length; i++) {
    const x = gemstone_layout[i][0];
    const y = gemstone_layout[i][1];
    const radius = gemstone_layout[i][2];

    for (let j = 0; j < 4; j++) {
      const angle = Math.PI / 4 + j * Math.PI / 2;
      const prong_radius = Math.max(0.008, radius * 0.13);
      instance_dummy.position.set(
        x + Math.cos(angle) * radius * 0.94,
        y + Math.sin(angle) * radius * 0.94,
        0.192
      );
      instance_dummy.rotation.set(0, 0, 0);
      instance_dummy.scale.setScalar(prong_radius);
      instance_dummy.updateMatrix();
      gemstone_prongs.setMatrixAt(prong_index, instance_dummy.matrix);
      prong_index++;
    }
  }
  gemstone_prongs.instanceMatrix.needsUpdate = true;
  jewelry_group.add(gemstone_prongs);

  const border_beadGeom = new THREE.SphereGeometry(1, 8, 6);
  const border_beads = new THREE.InstancedMesh(
    border_beadGeom,
    outer_frameMat,
    40
  );
  border_beads.name = "border_beads";

  let border_index = 0;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 14; i++) {
      const y = -1.72 + (3.44 * i) / 13;
      instance_dummy.position.set(side * 0.265, y, 0.17);
      instance_dummy.rotation.set(0, 0, 0);
      instance_dummy.scale.setScalar(0.016);
      instance_dummy.updateMatrix();
      border_beads.setMatrixAt(border_index, instance_dummy.matrix);
      border_index++;
    }
  }
  for (let i = 1; i <= 6; i++) {
    const x = -0.24 + (0.48 * i) / 7;
    for (let side = -1; side <= 1; side += 2) {
      instance_dummy.position.set(x, side * 2.105, 0.17);
      instance_dummy.rotation.set(0, 0, 0);
      instance_dummy.scale.setScalar(0.016);
      instance_dummy.updateMatrix();
      border_beads.setMatrixAt(border_index, instance_dummy.matrix);
      border_index++;
    }
  }
  border_beads.instanceMatrix.needsUpdate = true;
  jewelry_group.add(border_beads);

  const leaf_layout = [
    [-0.15, -1.84, -0.65],
    [0.13, -1.82, 0.65],
    [-0.2, -1.55, -0.8],
    [0.2, -1.27, 0.8],
    [-0.19, -1.01, -0.7],
    [0.19, -0.73, 0.7],
    [-0.2, -0.43, -0.8],
    [0.2, -0.12, 0.8],
    [-0.19, 0.18, -0.7],
    [0.19, 0.48, 0.7],
    [-0.2, 0.78, -0.8],
    [0.2, 1.07, 0.8],
    [-0.19, 1.37, -0.7],
    [0.19, 1.67, 0.7],
    [-0.14, 1.9, -0.65],
    [0.14, 2.02, 0.65],
  ];
  const ornamental_leafGeom = new THREE.SphereGeometry(1, 10, 6);
  const ornamental_leaves = new THREE.InstancedMesh(
    ornamental_leafGeom,
    outer_frameMat,
    leaf_layout.length
  );
  ornamental_leaves.name = "ornamental_leaves";

  for (let i = 0; i < leaf_layout.length; i++) {
    instance_dummy.position.set(leaf_layout[i][0], leaf_layout[i][1], 0.154);
    instance_dummy.rotation.set(0, 0, leaf_layout[i][2]);
    instance_dummy.scale.set(0.024, 0.048, 0.012);
    instance_dummy.updateMatrix();
    ornamental_leaves.setMatrixAt(i, instance_dummy.matrix);
  }
  ornamental_leaves.instanceMatrix.needsUpdate = true;
  jewelry_group.add(ornamental_leaves);

  const accent_bead_layout = [
    [-0.11, -1.87],
    [0.12, -1.68],
    [-0.15, -1.24],
    [0.14, -0.91],
    [-0.14, -0.58],
    [0.14, -0.2],
    [-0.15, 0.14],
    [0.14, 0.52],
    [-0.14, 0.88],
    [0.14, 1.2],
    [-0.14, 1.53],
    [0.12, 1.82],
  ];
  const accent_beadGeom = new THREE.SphereGeometry(1, 8, 6);
  const accent_beads = new THREE.InstancedMesh(
    accent_beadGeom,
    outer_frameMat,
    accent_bead_layout.length
  );
  accent_beads.name = "accent_beads";

  for (let i = 0; i < accent_bead_layout.length; i++) {
    instance_dummy.position.set(
      accent_bead_layout[i][0],
      accent_bead_layout[i][1],
      0.165
    );
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.setScalar(0.018);
    instance_dummy.updateMatrix();
    accent_beads.setMatrixAt(i, instance_dummy.matrix);
  }
  accent_beads.instanceMatrix.needsUpdate = true;
  jewelry_group.add(accent_beads);

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