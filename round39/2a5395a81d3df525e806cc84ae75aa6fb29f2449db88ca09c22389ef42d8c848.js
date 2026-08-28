export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_inlay_box";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const body_group = new THREE.Group();
  body_group.name = "body_group";
  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  root.add(base_group, body_group, lid_group);

  const walnutMat = new THREE.MeshStandardMaterial({
    color: 0x6f3b25,
    metalness: 0.0,
    roughness: 0.6
  });
  const warmWalnutMat = new THREE.MeshStandardMaterial({
    color: 0x824827,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3b2118,
    metalness: 0.0,
    roughness: 0.6
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x2b1b17,
    metalness: 0.0,
    roughness: 0.6
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x281713,
    metalness: 0.0,
    roughness: 0.6
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x1d120f,
    metalness: 0.0,
    roughness: 0.8
  });
  const creamShellMat = new THREE.MeshStandardMaterial({
    color: 0xe2c58c,
    metalness: 0.0,
    roughness: 0.4
  });
  const honeyShellMat = new THREE.MeshStandardMaterial({
    color: 0xb77b45,
    metalness: 0.0,
    roughness: 0.4
  });
  const amberShellMat = new THREE.MeshStandardMaterial({
    color: 0x8b5536,
    metalness: 0.0,
    roughness: 0.4
  });
  const darkShellMat = new THREE.MeshStandardMaterial({
    color: 0x4a2b21,
    metalness: 0.0,
    roughness: 0.4
  });
  const shellVeinMat = new THREE.MeshStandardMaterial({
    color: 0x6e432a,
    metalness: 0.0,
    roughness: 0.4
  });

  const bodyW = 1.32;
  const bodyD = 0.90;
  const bodyBottom = 0.18;
  const bodyTop = 0.66;
  const bodyH = bodyTop - bodyBottom;
  const panelY = 0.42;
  const frontSurface = bodyD / 2 + 0.014;
  const sideSurface = bodyW / 2 + 0.014;

  const matrix_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    matrix_dummy.position.set(x, y, z);
    matrix_dummy.rotation.set(rx, ry, rz);
    matrix_dummy.scale.set(sx, sy, sz);
    matrix_dummy.updateMatrix();
    mesh.setMatrixAt(index, matrix_dummy.matrix);
  }

  const footGeom = new THREE.BoxGeometry(0.18, 0.045, 0.15);
  const feet = new THREE.InstancedMesh(footGeom, darkWoodMat, 4);
  feet.name = "feet";
  let footIndex = 0;
  for (const x of [-0.60, 0.60]) {
    for (const z of [-0.40, 0.40]) {
      setInstance(feet, footIndex++, x, 0.0225, z, 0, 0, 0, 1, 1, 1);
    }
  }
  feet.instanceMatrix.needsUpdate = true;
  base_group.add(feet);

  const base_lower_plinthGeom = new THREE.BoxGeometry(1.50, 0.10, 1.06);
  const base_lower_plinth = new THREE.Mesh(base_lower_plinthGeom, walnutMat);
  base_lower_plinth.name = "base_lower_plinth";
  base_lower_plinth.position.set(0, 0.095, 0);
  base_group.add(base_lower_plinth);

  const base_upper_stepGeom = new THREE.BoxGeometry(1.42, 0.075, 0.98);
  const base_upper_step = new THREE.Mesh(base_upper_stepGeom, warmWalnutMat);
  base_upper_step.name = "base_upper_step";
  base_upper_step.position.set(0, 0.1625, 0);
  base_group.add(base_upper_step);

  const base_front_fasciaGeom = new THREE.BoxGeometry(1.47, 0.075, 0.055);
  const base_front_fascia = new THREE.Mesh(base_front_fasciaGeom, warmWalnutMat);
  base_front_fascia.name = "base_front_fascia";
  base_front_fascia.position.set(0, 0.1375, 0.5225);
  base_group.add(base_front_fascia);

  const base_back_fascia = new THREE.Mesh(base_front_fasciaGeom, warmWalnutMat);
  base_back_fascia.name = "base_back_fascia";
  base_back_fascia.position.set(0, 0.1375, -0.5225);
  base_group.add(base_back_fascia);

  const base_side_fasciaGeom = new THREE.BoxGeometry(0.055, 0.075, 1.00);
  const base_left_fascia = new THREE.Mesh(base_side_fasciaGeom, warmWalnutMat);
  base_left_fascia.name = "base_left_fascia";
  base_left_fascia.position.set(-0.7325, 0.1375, 0);
  base_group.add(base_left_fascia);

  const base_right_fascia = new THREE.Mesh(base_side_fasciaGeom, warmWalnutMat);
  base_right_fascia.name = "base_right_fascia";
  base_right_fascia.position.set(0.7325, 0.1375, 0);
  base_group.add(base_right_fascia);

  const base_front_beadGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.46, 14);
  const base_front_bead = new THREE.Mesh(base_front_beadGeom, darkWoodMat);
  base_front_bead.name = "base_front_bead";
  base_front_bead.rotation.z = Math.PI / 2;
  base_front_bead.position.set(0, 0.184, 0.525);
  base_group.add(base_front_bead);

  const base_back_bead = new THREE.Mesh(base_front_beadGeom, darkWoodMat);
  base_back_bead.name = "base_back_bead";
  base_back_bead.rotation.z = Math.PI / 2;
  base_back_bead.position.set(0, 0.184, -0.525);
  base_group.add(base_back_bead);

  const base_side_beadGeom = new THREE.CylinderGeometry(0.018, 0.018, 1.00, 14);
  const base_left_bead = new THREE.Mesh(base_side_beadGeom, darkWoodMat);
  base_left_bead.name = "base_left_bead";
  base_left_bead.rotation.x = Math.PI / 2;
  base_left_bead.position.set(-0.735, 0.184, 0);
  base_group.add(base_left_bead);

  const base_right_bead = new THREE.Mesh(base_side_beadGeom, darkWoodMat);
  base_right_bead.name = "base_right_bead";
  base_right_bead.rotation.x = Math.PI / 2;
  base_right_bead.position.set(0.735, 0.184, 0);
  base_group.add(base_right_bead);

  const front_panel_frameGeom = new THREE.BoxGeometry(1.20, bodyH, 0.030);
  const front_panel_frame = new THREE.Mesh(front_panel_frameGeom, darkWoodMat);
  front_panel_frame.name = "front_panel_frame";
  front_panel_frame.position.set(0, (bodyBottom + bodyTop) / 2, bodyD / 2 + 0.003);
  body_group.add(front_panel_frame);

  const back_panel_frame = new THREE.Mesh(front_panel_frameGeom, darkWoodMat);
  back_panel_frame.name = "back_panel_frame";
  back_panel_frame.position.set(0, (bodyBottom + bodyTop) / 2, -bodyD / 2 - 0.003);
  body_group.add(back_panel_frame);

  const side_panel_frameGeom = new THREE.BoxGeometry(0.030, bodyH, 0.76);
  const left_panel_frame = new THREE.Mesh(side_panel_frameGeom, darkWoodMat);
  left_panel_frame.name = "left_panel_frame";
  left_panel_frame.position.set(-bodyW / 2 - 0.003, (bodyBottom + bodyTop) / 2, 0);
  body_group.add(left_panel_frame);

  const right_panel_frame = new THREE.Mesh(side_panel_frameGeom, darkWoodMat);
  right_panel_frame.name = "right_panel_frame";
  right_panel_frame.position.set(bodyW / 2 + 0.003, (bodyBottom + bodyTop) / 2, 0);
  body_group.add(right_panel_frame);

  const front_inlay_panelGeom = new THREE.BoxGeometry(1.10, 0.40, 0.012);
  const front_inlay_panel = new THREE.Mesh(front_inlay_panelGeom, panelMat);
  front_inlay_panel.name = "front_inlay_panel";
  front_inlay_panel.position.set(0, panelY, bodyD / 2 + 0.014);
  body_group.add(front_inlay_panel);

  const back_inlay_panel = new THREE.Mesh(front_inlay_panelGeom, panelMat);
  back_inlay_panel.name = "back_inlay_panel";
  back_inlay_panel.position.set(0, panelY, -bodyD / 2 - 0.014);
  body_group.add(back_inlay_panel);

  const side_inlay_panelGeom = new THREE.BoxGeometry(0.012, 0.40, 0.64);
  const left_inlay_panel = new THREE.Mesh(side_inlay_panelGeom, panelMat);
  left_inlay_panel.name = "left_inlay_panel";
  left_inlay_panel.position.set(-bodyW / 2 - 0.014, panelY, 0);
  body_group.add(left_inlay_panel);

  const right_inlay_panel = new THREE.Mesh(side_inlay_panelGeom, panelMat);
  right_inlay_panel.name = "right_inlay_panel";
  right_inlay_panel.position.set(bodyW / 2 + 0.014, panelY, 0);
  body_group.add(right_inlay_panel);

  const cornerPostGeom = new THREE.BoxGeometry(0.09, 0.48, 0.09);
  const front_left_corner_post = new THREE.Mesh(cornerPostGeom, walnutMat);
  front_left_corner_post.name = "front_left_corner_post";
  front_left_corner_post.position.set(-0.615, 0.42, 0.405);
  body_group.add(front_left_corner_post);

  const front_right_corner_post = new THREE.Mesh(cornerPostGeom, walnutMat);
  front_right_corner_post.name = "front_right_corner_post";
  front_right_corner_post.position.set(0.615, 0.42, 0.405);
  body_group.add(front_right_corner_post);

  const back_left_corner_post = new THREE.Mesh(cornerPostGeom, walnutMat);
  back_left_corner_post.name = "back_left_corner_post";
  back_left_corner_post.position.set(-0.615, 0.42, -0.405);
  body_group.add(back_left_corner_post);

  const back_right_corner_post = new THREE.Mesh(cornerPostGeom, walnutMat);
  back_right_corner_post.name = "back_right_corner_post";
  back_right_corner_post.position.set(0.615, 0.42, -0.405);
  body_group.add(back_right_corner_post);

  const front_back_upper_railGeom = new THREE.BoxGeometry(1.34, 0.075, 0.055);
  const front_upper_rail = new THREE.Mesh(front_back_upper_railGeom, warmWalnutMat);
  front_upper_rail.name = "front_upper_rail";
  front_upper_rail.position.set(0, 0.6425, 0.4625);
  body_group.add(front_upper_rail);

  const back_upper_rail = new THREE.Mesh(front_back_upper_railGeom, warmWalnutMat);
  back_upper_rail.name = "back_upper_rail";
  back_upper_rail.position.set(0, 0.6425, -0.4625);
  body_group.add(back_upper_rail);

  const side_upper_railGeom = new THREE.BoxGeometry(0.055, 0.075, 0.84);
  const left_upper_rail = new THREE.Mesh(side_upper_railGeom, warmWalnutMat);
  left_upper_rail.name = "left_upper_rail";
  left_upper_rail.position.set(-0.6625, 0.6425, 0);
  body_group.add(left_upper_rail);

  const right_upper_rail = new THREE.Mesh(side_upper_railGeom, warmWalnutMat);
  right_upper_rail.name = "right_upper_rail";
  right_upper_rail.position.set(0.6625, 0.6425, 0);
  body_group.add(right_upper_rail);

  const front_panel_horizontal_trimGeom = new THREE.BoxGeometry(1.12, 0.020, 0.018);
  const front_panel_top_trim = new THREE.Mesh(front_panel_horizontal_trimGeom, darkWoodMat);
  front_panel_top_trim.name = "front_panel_top_trim";
  front_panel_top_trim.position.set(0, 0.622, 0.470);
  body_group.add(front_panel_top_trim);

  const front_panel_bottom_trim = new THREE.Mesh(front_panel_horizontal_trimGeom, darkWoodMat);
  front_panel_bottom_trim.name = "front_panel_bottom_trim";
  front_panel_bottom_trim.position.set(0, 0.218, 0.470);
  body_group.add(front_panel_bottom_trim);

  const front_panel_vertical_trimGeom = new THREE.BoxGeometry(0.020, 0.424, 0.018);
  const front_panel_left_trim = new THREE.Mesh(front_panel_vertical_trimGeom, darkWoodMat);
  front_panel_left_trim.name = "front_panel_left_trim";
  front_panel_left_trim.position.set(-0.560, panelY, 0.470);
  body_group.add(front_panel_left_trim);

  const front_panel_right_trim = new THREE.Mesh(front_panel_vertical_trimGeom, darkWoodMat);
  front_panel_right_trim.name = "front_panel_right_trim";
  front_panel_right_trim.position.set(0.560, panelY, 0.470);
  body_group.add(front_panel_right_trim);

  const side_panel_horizontal_trimGeom = new THREE.BoxGeometry(0.018, 0.020, 0.66);
  const right_panel_top_trim = new THREE.Mesh(side_panel_horizontal_trimGeom, darkWoodMat);
  right_panel_top_trim.name = "right_panel_top_trim";
  right_panel_top_trim.position.set(0.675, 0.622, 0);
  body_group.add(right_panel_top_trim);

  const right_panel_bottom_trim = new THREE.Mesh(side_panel_horizontal_trimGeom, darkWoodMat);
  right_panel_bottom_trim.name = "right_panel_bottom_trim";
  right_panel_bottom_trim.position.set(0.675, 0.218, 0);
  body_group.add(right_panel_bottom_trim);

  const left_panel_top_trim = new THREE.Mesh(side_panel_horizontal_trimGeom, darkWoodMat);
  left_panel_top_trim.name = "left_panel_top_trim";
  left_panel_top_trim.position.set(-0.675, 0.622, 0);
  body_group.add(left_panel_top_trim);

  const left_panel_bottom_trim = new THREE.Mesh(side_panel_horizontal_trimGeom, darkWoodMat);
  left_panel_bottom_trim.name = "left_panel_bottom_trim";
  left_panel_bottom_trim.position.set(-0.675, 0.218, 0);
  body_group.add(left_panel_bottom_trim);

  const side_panel_vertical_trimGeom = new THREE.BoxGeometry(0.018, 0.424, 0.020);
  const right_panel_front_trim = new THREE.Mesh(side_panel_vertical_trimGeom, darkWoodMat);
  right_panel_front_trim.name = "right_panel_front_trim";
  right_panel_front_trim.position.set(0.675, panelY, 0.330);
  body_group.add(right_panel_front_trim);

  const right_panel_back_trim = new THREE.Mesh(side_panel_vertical_trimGeom, darkWoodMat);
  right_panel_back_trim.name = "right_panel_back_trim";
  right_panel_back_trim.position.set(0.675, panelY, -0.330);
  body_group.add(right_panel_back_trim);

  const left_panel_front_trim = new THREE.Mesh(side_panel_vertical_trimGeom, darkWoodMat);
  left_panel_front_trim.name = "left_panel_front_trim";
  left_panel_front_trim.position.set(-0.675, panelY, 0.330);
  body_group.add(left_panel_front_trim);

  const left_panel_back_trim = new THREE.Mesh(side_panel_vertical_trimGeom, darkWoodMat);
  left_panel_back_trim.name = "left_panel_back_trim";
  left_panel_back_trim.position.set(-0.675, panelY, -0.330);
  body_group.add(left_panel_back_trim);

  const upper_front_moldingGeom = new THREE.BoxGeometry(1.42, 0.080, 0.060);
  const upper_front_molding = new THREE.Mesh(upper_front_moldingGeom, walnutMat);
  upper_front_molding.name = "upper_front_molding";
  upper_front_molding.position.set(0, 0.680, 0.470);
  lid_group.add(upper_front_molding);

  const upper_back_molding = new THREE.Mesh(upper_front_moldingGeom, walnutMat);
  upper_back_molding.name = "upper_back_molding";
  upper_back_molding.position.set(0, 0.680, -0.470);
  lid_group.add(upper_back_molding);

  const upper_side_moldingGeom = new THREE.BoxGeometry(0.060, 0.080, 0.92);
  const upper_left_molding = new THREE.Mesh(upper_side_moldingGeom, walnutMat);
  upper_left_molding.name = "upper_left_molding";
  upper_left_molding.position.set(-0.680, 0.680, 0);
  lid_group.add(upper_left_molding);

  const upper_right_molding = new THREE.Mesh(upper_side_moldingGeom, walnutMat);
  upper_right_molding.name = "upper_right_molding";
  upper_right_molding.position.set(0.680, 0.680, 0);
  lid_group.add(upper_right_molding);

  const lid_lower_slabGeom = new THREE.BoxGeometry(1.48, 0.065, 1.02);
  const lid_lower_slab = new THREE.Mesh(lid_lower_slabGeom, darkWoodMat);
  lid_lower_slab.name = "lid_lower_slab";
  lid_lower_slab.position.set(0, 0.7325, 0);
  lid_group.add(lid_lower_slab);

  const lid_top_panelGeom = new THREE.BoxGeometry(1.42, 0.060, 0.96);
  const lid_top_panel = new THREE.Mesh(lid_top_panelGeom, warmWalnutMat);
  lid_top_panel.name = "lid_top_panel";
  lid_top_panel.position.set(0, 0.785, 0);
  lid_group.add(lid_top_panel);

  const lid_front_edgeGeom = new THREE.BoxGeometry(1.50, 0.045, 0.040);
  const lid_front_edge = new THREE.Mesh(lid_front_edgeGeom, walnutMat);
  lid_front_edge.name = "lid_front_edge";
  lid_front_edge.position.set(0, 0.7875, 0.510);
  lid_group.add(lid_front_edge);

  const lid_back_edge = new THREE.Mesh(lid_front_edgeGeom, walnutMat);
  lid_back_edge.name = "lid_back_edge";
  lid_back_edge.position.set(0, 0.7875, -0.510);
  lid_group.add(lid_back_edge);

  const lid_side_edgeGeom = new THREE.BoxGeometry(0.040, 0.045, 1.00);
  const lid_left_edge = new THREE.Mesh(lid_side_edgeGeom, walnutMat);
  lid_left_edge.name = "lid_left_edge";
  lid_left_edge.position.set(-0.730, 0.7875, 0);
  lid_group.add(lid_left_edge);

  const lid_right_edge = new THREE.Mesh(lid_side_edgeGeom, walnutMat);
  lid_right_edge.name = "lid_right_edge";
  lid_right_edge.position.set(0.730, 0.7875, 0);
  lid_group.add(lid_right_edge);

  const lid_front_back_beadGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.49, 16);
  const lid_front_bead = new THREE.Mesh(lid_front_back_beadGeom, warmWalnutMat);
  lid_front_bead.name = "lid_front_bead";
  lid_front_bead.rotation.z = Math.PI / 2;
  lid_front_bead.position.set(0, 0.765, 0.525);
  lid_group.add(lid_front_bead);

  const lid_back_bead = new THREE.Mesh(lid_front_back_beadGeom, warmWalnutMat);
  lid_back_bead.name = "lid_back_bead";
  lid_back_bead.rotation.z = Math.PI / 2;
  lid_back_bead.position.set(0, 0.765, -0.525);
  lid_group.add(lid_back_bead);

  const lid_side_beadGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.00, 16);
  const lid_left_bead = new THREE.Mesh(lid_side_beadGeom, warmWalnutMat);
  lid_left_bead.name = "lid_left_bead";
  lid_left_bead.rotation.x = Math.PI / 2;
  lid_left_bead.position.set(-0.745, 0.765, 0);
  lid_group.add(lid_left_bead);

  const lid_right_bead = new THREE.Mesh(lid_side_beadGeom, warmWalnutMat);
  lid_right_bead.name = "lid_right_bead";
  lid_right_bead.rotation.x = Math.PI / 2;
  lid_right_bead.position.set(0.745, 0.765, 0);
  lid_group.add(lid_right_bead);

  const lid_front_lower_beadGeom = new THREE.CylinderGeometry(0.013, 0.013, 1.43, 12);
  const lid_front_lower_bead = new THREE.Mesh(lid_front_lower_beadGeom, darkWoodMat);
  lid_front_lower_bead.name = "lid_front_lower_bead";
  lid_front_lower_bead.rotation.z = Math.PI / 2;
  lid_front_lower_bead.position.set(0, 0.718, 0.500);
  lid_group.add(lid_front_lower_bead);

  const lid_back_lower_bead = new THREE.Mesh(lid_front_lower_beadGeom, darkWoodMat);
  lid_back_lower_bead.name = "lid_back_lower_bead";
  lid_back_lower_bead.rotation.z = Math.PI / 2;
  lid_back_lower_bead.position.set(0, 0.718, -0.500);
  lid_group.add(lid_back_lower_bead);

  const lid_side_lower_beadGeom = new THREE.CylinderGeometry(0.013, 0.013, 0.96, 12);
  const lid_left_lower_bead = new THREE.Mesh(lid_side_lower_beadGeom, darkWoodMat);
  lid_left_lower_bead.name = "lid_left_lower_bead";
  lid_left_lower_bead.rotation.x = Math.PI / 2;
  lid_left_lower_bead.position.set(-0.720, 0.718, 0);
  lid_group.add(lid_left_lower_bead);

  const lid_right_lower_bead = new THREE.Mesh(lid_side_lower_beadGeom, darkWoodMat);
  lid_right_lower_bead.name = "lid_right_lower_bead";
  lid_right_lower_bead.rotation.x = Math.PI / 2;
  lid_right_lower_bead.position.set(0.720, 0.718, 0);
  lid_group.add(lid_right_lower_bead);

  const top_border_front_backGeom = new THREE.BoxGeometry(1.39, 0.006, 0.014);
  const top_border_front = new THREE.Mesh(top_border_front_backGeom, darkWoodMat);
  top_border_front.name = "top_border_front";
  top_border_front.position.set(0, 0.818, 0.466);
  lid_group.add(top_border_front);

  const top_border_back = new THREE.Mesh(top_border_front_backGeom, darkWoodMat);
  top_border_back.name = "top_border_back";
  top_border_back.position.set(0, 0.818, -0.466);
  lid_group.add(top_border_back);

  const top_border_sideGeom = new THREE.BoxGeometry(0.014, 0.006, 0.92);
  const top_border_left = new THREE.Mesh(top_border_sideGeom, darkWoodMat);
  top_border_left.name = "top_border_left";
  top_border_left.position.set(-0.696, 0.818, 0);
  lid_group.add(top_border_left);

  const top_border_right = new THREE.Mesh(top_border_sideGeom, darkWoodMat);
  top_border_right.name = "top_border_right";
  top_border_right.position.set(0.696, 0.818, 0);
  lid_group.add(top_border_right);

  const top_wood_grain = new THREE.Group();
  top_wood_grain.name = "top_wood_grain";
  for (let i = 0; i < 10; i++) {
    const baseZ = -0.405 + i * 0.09;
    const points = [];
    for (let j = 0; j <= 6; j++) {
      const x = -0.66 + j * 0.22;
      const z = baseZ
        + Math.sin(j * 1.27 + i * 0.73) * 0.012
        + Math.sin(j * 0.48 + i * 1.11) * 0.006;
      points.push(new THREE.Vector3(x, 0.819, z));
    }
    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      24,
      0.0022,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, grainMat);
    grain_line.name = "top_grain_line_" + i;
    top_wood_grain.add(grain_line);
  }
  lid_group.add(top_wood_grain);

  const top_knotGeom = new THREE.TorusGeometry(0.032, 0.0025, 6, 22);
  const top_knots = new THREE.InstancedMesh(top_knotGeom, grainMat, 4);
  top_knots.name = "top_knots";
  const topKnotData = [
    [-0.36, 0.15, 1.75, 0.62],
    [0.23, -0.18, 1.45, 0.55],
    [0.48, 0.28, 1.25, 0.50],
    [-0.10, -0.31, 1.55, 0.58]
  ];
  for (let i = 0; i < topKnotData.length; i++) {
    const data = topKnotData[i];
    setInstance(
      top_knots,
      i,
      data[0],
      0.821,
      data[1],
      Math.PI / 2,
      0,
      0,
      data[2],
      data[3],
      1
    );
  }
  top_knots.instanceMatrix.needsUpdate = true;
  lid_group.add(top_knots);

  const front_wood_grain = new THREE.Group();
  front_wood_grain.name = "front_wood_grain";
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const x = side * (0.592 + i * 0.022);
      const points = [
        new THREE.Vector3(x, 0.225, frontSurface + 0.002),
        new THREE.Vector3(x + side * 0.005, 0.335, frontSurface + 0.002),
        new THREE.Vector3(x - side * 0.004, 0.475, frontSurface + 0.002),
        new THREE.Vector3(x + side * 0.003, 0.605, frontSurface + 0.002)
      ];
      const grain_lineGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        14,
        0.0018,
        5,
        false
      );
      const grain_line = new THREE.Mesh(grain_lineGeom, grainMat);
      grain_line.name = "front_post_grain_" + side + "_" + i;
      front_wood_grain.add(grain_line);
    }
  }
  body_group.add(front_wood_grain);

  const right_wood_grain = new THREE.Group();
  right_wood_grain.name = "right_wood_grain";
  for (const side of [-1, 1]) {
    for (let i = 0; i < 2; i++) {
      const z = side * (0.372 + i * 0.022);
      const points = [
        new THREE.Vector3(sideSurface + 0.002, 0.225, z),
        new THREE.Vector3(sideSurface + 0.002, 0.335, z + side * 0.005),
        new THREE.Vector3(sideSurface + 0.002, 0.475, z - side * 0.004),
        new THREE.Vector3(sideSurface + 0.002, 0.605, z + side * 0.003)
      ];
      const grain_lineGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(points),
        14,
        0.0018,
        5,
        false
      );
      const grain_line = new THREE.Mesh(grain_lineGeom, grainMat);
      grain_line.name = "right_post_grain_" + side + "_" + i;
      right_wood_grain.add(grain_line);
    }
  }
  body_group.add(right_wood_grain);

  const shell_inlayGeom = new THREE.SphereGeometry(1, 18, 10);
  const shell_veinGeom = new THREE.BoxGeometry(1, 1, 1);

  const frontShellData = [
    [-0.49, 0.53, 0.040, 0.060, -0.25, 0],
    [-0.38, 0.47, 0.055, 0.075, 0.35, 1],
    [-0.25, 0.55, 0.050, 0.067, -0.45, 3],
    [-0.10, 0.49, 0.065, 0.075, 0.12, 2],
    [0.06, 0.54, 0.045, 0.060, 0.65, 1],
    [0.21, 0.47, 0.060, 0.080, -0.30, 0],
    [0.38, 0.54, 0.050, 0.068, 0.20, 2],
    [0.49, 0.44, 0.045, 0.065, -0.10, 1],
    [-0.50, 0.35, 0.040, 0.060, 0.20, 2],
    [-0.37, 0.31, 0.060, 0.075, -0.55, 3],
    [-0.22, 0.37, 0.050, 0.070, 0.40, 0],
    [-0.07, 0.31, 0.065, 0.075, -0.15, 1],
    [0.09, 0.36, 0.055, 0.070, 0.75, 3],
    [0.24, 0.31, 0.060, 0.080, 0.25, 0],
    [0.40, 0.36, 0.050, 0.070, -0.35, 2],
    [0.50, 0.28, 0.040, 0.060, 0.15, 1],
    [-0.44, 0.24, 0.050, 0.065, -0.20, 1],
    [-0.29, 0.24, 0.055, 0.075, 0.50, 0],
    [-0.13, 0.23, 0.045, 0.060, -0.45, 2],
    [0.02, 0.24, 0.060, 0.075, 0.20, 3],
    [0.18, 0.23, 0.050, 0.065, -0.20, 1],
    [0.34, 0.24, 0.055, 0.075, 0.45, 0],
    [0.48, 0.23, 0.040, 0.055, -0.30, 2]
  ];

  const sideShellData = [
    [-0.27, 0.52, 0.040, 0.060, -0.20, 1],
    [-0.14, 0.46, 0.055, 0.075, 0.35, 0],
    [0.00, 0.54, 0.050, 0.065, -0.45, 3],
    [0.14, 0.47, 0.060, 0.080, 0.20, 1],
    [0.27, 0.53, 0.040, 0.055, 0.55, 2],
    [-0.27, 0.36, 0.050, 0.070, 0.25, 3],
    [-0.14, 0.31, 0.060, 0.080, -0.30, 0],
    [0.00, 0.37, 0.055, 0.070, 0.60, 1],
    [0.14, 0.31, 0.060, 0.075, -0.15, 2],
    [0.27, 0.37, 0.045, 0.065, 0.25, 0],
    [-0.24, 0.24, 0.050, 0.065, -0.45, 1],
    [-0.08, 0.23, 0.060, 0.075, 0.30, 3],
    [0.09, 0.24, 0.055, 0.070, -0.20, 0],
    [0.25, 0.24, 0.045, 0.060, 0.45, 2]
  ];

  function createShellField(name, data, face, fixedCoordinate) {
    const group = new THREE.Group();
    group.name = name;

    const creamRecords = [];
    const honeyRecords = [];
    const amberRecords = [];
    const darkRecords = [];
    const recordsByType = [creamRecords, honeyRecords, amberRecords, darkRecords];

    for (let i = 0; i < data.length; i++) {
      recordsByType[data[i][5]].push(data[i]);
    }

    const materialList = [creamShellMat, honeyShellMat, amberShellMat, darkShellMat];
    const typeNames = ["cream", "honey", "amber", "dark"];
    const shellMeshes = [];

    for (let type = 0; type < 4; type++) {
      const records = recordsByType[type];
      if (records.length === 0) continue;
      const shell_mesh = new THREE.InstancedMesh(shell_inlayGeom, materialList[type], records.length);
      shell_mesh.name = name + "_" + typeNames[type] + "_tiles";
      shellMeshes.push(shell_mesh);

      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        const u = record[0];
        const y = record[1];
        const sx = record[2];
        const sy = record[3];
        const angle = record[4];

        if (face === "front") {
          setInstance(shell_mesh, i, u, y, fixedCoordinate, 0, 0, angle, sx, sy, 0.005);
        } else {
          setInstance(shell_mesh, i, fixedCoordinate, y, u, angle, 0, 0, 0.005, sy, sx);
        }
      }
      shell_mesh.instanceMatrix.needsUpdate = true;
      group.add(shell_mesh);
    }

    const veinEntries = [];
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      const veinCount = i % 3 === 0 ? 2 : 1;
      for (let k = 0; k < veinCount; k++) {
        veinEntries.push([
          record[0],
          record[1],
          record[2],
          record[3],
          record[4],
          k === 0 ? -0.22 : 0.28
        ]);
      }
    }

    const shell_veins = new THREE.InstancedMesh(
      shell_veinGeom,
      shellVeinMat,
      veinEntries.length
    );
    shell_veins.name = name + "_veins";

    for (let i = 0; i < veinEntries.length; i++) {
      const entry = veinEntries[i];
      const detail = 0.004;
      if (face === "front") {
        setInstance(
          shell_veins,
          i,
          entry[0],
          entry[1],
          fixedCoordinate + 0.007,
          0,
          0,
          entry[4] + entry[5],
          entry[2] * 1.45,
          detail,
          0.002
        );
      } else {
        setInstance(
          shell_veins,
          i,
          fixedCoordinate + 0.007,
          entry[1],
          entry[0],
          entry[4] + entry[5],
          0,
          0,
          0.002,
          detail,
          entry[2] * 1.45
        );
      }
    }
    shell_veins.instanceMatrix.needsUpdate = true;
    group.add(shell_veins);

    return { group, meshes: shellMeshes };
  }

  const frontShellResult = createShellField(
    "front_shell_inlays",
    frontShellData,
    "front",
    frontSurface + 0.004
  );
  const front_shell_inlays = frontShellResult.group;
  const front_cream_shell_inlays = frontShellResult.meshes[0];
  const front_honey_shell_inlays = frontShellResult.meshes[1];
  const front_amber_shell_inlays = frontShellResult.meshes[2];
  const front_dark_shell_inlays = frontShellResult.meshes[3];
  body_group.add(front_shell_inlays);

  const rightShellResult = createShellField(
    "right_shell_inlays",
    sideShellData,
    "side",
    sideSurface + 0.004
  );
  const right_shell_inlays = rightShellResult.group;
  const right_cream_shell_inlays = rightShellResult.meshes[0];
  const right_honey_shell_inlays = rightShellResult.meshes[1];
  const right_amber_shell_inlays = rightShellResult.meshes[2];
  const right_dark_shell_inlays = rightShellResult.meshes[3];
  body_group.add(right_shell_inlays);

  const leftShellResult = createShellField(
    "left_shell_inlays",
    sideShellData,
    "side",
    -sideSurface - 0.004
  );
  const left_shell_inlays = leftShellResult.group;
  const left_cream_shell_inlays = leftShellResult.meshes[0];
  const left_honey_shell_inlays = leftShellResult.meshes[1];
  const left_amber_shell_inlays = leftShellResult.meshes[2];
  const left_dark_shell_inlays = leftShellResult.meshes[3];
  body_group.add(left_shell_inlays);

  const backShellResult = createShellField(
    "back_shell_inlays",
    frontShellData,
    "side",
    -frontSurface - 0.004
  );
  const back_shell_inlays = backShellResult.group;
  const back_cream_shell_inlays = backShellResult.meshes[0];
  const back_honey_shell_inlays = backShellResult.meshes[1];
  const back_amber_shell_inlays = backShellResult.meshes[2];
  const back_dark_shell_inlays = backShellResult.meshes[3];
  body_group.add(back_shell_inlays);

  const corner_inlayGeom = new THREE.SphereGeometry(1, 16, 8);

  const front_corner_inlays = new THREE.InstancedMesh(corner_inlayGeom, honeyShellMat, 2);
  front_corner_inlays.name = "front_corner_inlays";
  setInstance(front_corner_inlays, 0, -0.615, 0.525, frontSurface + 0.004, 0, 0, -0.18, 0.028, 0.048, 0.004);
  setInstance(front_corner_inlays, 1, 0.615, 0.525, frontSurface + 0.004, 0, 0, 0.18, 0.028, 0.048, 0.004);
  front_corner_inlays.instanceMatrix.needsUpdate = true;
  body_group.add(front_corner_inlays);

  const right_corner_inlays = new THREE.InstancedMesh(corner_inlayGeom, creamShellMat, 2);
  right_corner_inlays.name = "right_corner_inlays";
  setInstance(right_corner_inlays, 0, sideSurface + 0.004, 0.525, -0.405, 0.12, 0, 0, 0.004, 0.048, 0.028);
  setInstance(right_corner_inlays, 1, sideSurface + 0.004, 0.525, 0.405, -0.12, 0, 0, 0.004, 0.048, 0.028);
  right_corner_inlays.instanceMatrix.needsUpdate = true;
  body_group.add(right_corner_inlays);

  const left_corner_inlays = new THREE.InstancedMesh(corner_inlayGeom, creamShellMat, 2);
  left_corner_inlays.name = "left_corner_inlays";
  setInstance(left_corner_inlays, 0, -sideSurface - 0.004, 0.525, -0.405, -0.12, 0, 0, 0.004, 0.048, 0.028);
  setInstance(left_corner_inlays, 1, -sideSurface - 0.004, 0.525, 0.405, 0.12, 0, 0, 0.004, 0.048, 0.028);
  left_corner_inlays.instanceMatrix.needsUpdate = true;
  body_group.add(left_corner_inlays);

  const shadow_gapGeom = new THREE.BoxGeometry(1.40, 0.012, 0.012);
  const front_shadow_gap = new THREE.Mesh(shadow_gapGeom, shadowMat);
  front_shadow_gap.name = "front_shadow_gap";
  front_shadow_gap.position.set(0, 0.699, 0.503);
  root.add(front_shadow_gap);

  const back_shadow_gap = new THREE.Mesh(shadow_gapGeom, shadowMat);
  back_shadow_gap.name = "back_shadow_gap";
  back_shadow_gap.position.set(0, 0.699, -0.503);
  root.add(back_shadow_gap);

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