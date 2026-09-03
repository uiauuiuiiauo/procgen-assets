export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_writing_desk";

  const deskW = 3.8;
  const deskD = 2.1;
  const topY = 2.45;
  const topH = 0.16;
  const legX = 1.68;
  const legZ = 0.84;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x70462c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0x956039,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x492b1d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const insetWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5c3825,
    metalness: 0.0,
    roughness: 0.6,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xe8dcae,
    metalness: 0.0,
    roughness: 0.9,
  });
  const paperEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xc9b783,
    metalness: 0.0,
    roughness: 0.9,
  });
  const yellowPaperMat = new THREE.MeshStandardMaterial({
    color: 0xe7c85c,
    metalness: 0.0,
    roughness: 0.9,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x38362f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x3f291d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9b8150,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3328,
    metalness: 0.5,
    roughness: 0.5,
  });

  function addBox(parent, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  const instance_dummy = new THREE.Object3D();
  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    instance_dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const tabletop_coreGeom = new THREE.BoxGeometry(deskW, topH, deskD);
  const tabletop_core = new THREE.Mesh(tabletop_coreGeom, woodMat);
  tabletop_core.name = "tabletop_core";
  tabletop_core.position.set(0, topY, 0);
  root.add(tabletop_core);

  const top_front_edgeGeom = new THREE.BoxGeometry(deskW + 0.08, 0.11, 0.11);
  const top_front_edge = new THREE.Mesh(top_front_edgeGeom, lightWoodMat);
  top_front_edge.name = "top_front_edge";
  top_front_edge.position.set(0, topY - 0.005, deskD * 0.5 + 0.015);
  root.add(top_front_edge);

  const top_side_edgeGeom = new THREE.BoxGeometry(0.11, 0.11, deskD);
  const top_left_edge = new THREE.Mesh(top_side_edgeGeom, lightWoodMat);
  top_left_edge.name = "top_left_edge";
  top_left_edge.position.set(-deskW * 0.5 + 0.025, topY - 0.005, 0);
  root.add(top_left_edge);

  const top_right_edge = new THREE.Mesh(top_side_edgeGeom, lightWoodMat);
  top_right_edge.name = "top_right_edge";
  top_right_edge.position.set(deskW * 0.5 - 0.025, topY - 0.005, 0);
  root.add(top_right_edge);

  const top_back_edgeGeom = new THREE.BoxGeometry(deskW, 0.1, 0.1);
  const top_back_edge = new THREE.Mesh(top_back_edgeGeom, darkWoodMat);
  top_back_edge.name = "top_back_edge";
  top_back_edge.position.set(0, topY - 0.005, -deskD * 0.5 + 0.025);
  root.add(top_back_edge);

  const top_front_beadGeom = new THREE.CylinderGeometry(0.035, 0.035, deskW + 0.03, 12);
  const top_front_bead = new THREE.Mesh(top_front_beadGeom, lightWoodMat);
  top_front_bead.name = "top_front_bead";
  top_front_bead.rotation.z = Math.PI / 2;
  top_front_bead.position.set(0, topY - 0.035, deskD * 0.5 + 0.075);
  root.add(top_front_bead);

  const top_side_beadGeom = new THREE.CylinderGeometry(0.035, 0.035, deskD, 12);
  const top_left_bead = new THREE.Mesh(top_side_beadGeom, lightWoodMat);
  top_left_bead.name = "top_left_bead";
  top_left_bead.rotation.x = Math.PI / 2;
  top_left_bead.position.set(-deskW * 0.5 + 0.065, topY - 0.035, 0);
  root.add(top_left_bead);

  const top_right_bead = new THREE.Mesh(top_side_beadGeom, lightWoodMat);
  top_right_bead.name = "top_right_bead";
  top_right_bead.rotation.x = Math.PI / 2;
  top_right_bead.position.set(deskW * 0.5 - 0.065, topY - 0.035, 0);
  root.add(top_right_bead);

  const top_plank_seamsGeom = new THREE.BoxGeometry(0.012, 0.007, deskD - 0.12);
  const top_plank_seams = new THREE.InstancedMesh(top_plank_seamsGeom, grainMat, 5);
  top_plank_seams.name = "top_plank_seams";
  for (let i = 0; i < 5; i++) {
    setInstance(top_plank_seams, i, -1.27 + i * 0.635, topY + topH * 0.5 + 0.004, 0, 0, 0, 0);
  }
  top_plank_seams.instanceMatrix.needsUpdate = true;
  root.add(top_plank_seams);

  const top_grain_marksGeom = new THREE.BoxGeometry(0.3, 0.006, 0.012);
  const top_grain_marks = new THREE.InstancedMesh(top_grain_marksGeom, grainMat, 24);
  top_grain_marks.name = "top_grain_marks";
  for (let i = 0; i < 24; i++) {
    const gx = -1.62 + ((i * 7) % 23) / 22 * 3.24;
    const gz = -0.88 + ((i * 11) % 25) / 24 * 1.76;
    const gr = ((i % 5) - 2) * 0.035;
    const gs = 0.45 + (i % 4) * 0.18;
    setInstance(top_grain_marks, i, gx, topY + topH * 0.5 + 0.007, gz, 0, gr, 0, gs, 1, 1);
  }
  top_grain_marks.instanceMatrix.needsUpdate = true;
  root.add(top_grain_marks);

  const top_nailsGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.009, 10);
  const top_nails = new THREE.InstancedMesh(top_nailsGeom, darkMetalMat, 8);
  top_nails.name = "top_nails";
  const nail_positions = [
    [-1.72, -0.88], [1.72, -0.88], [-1.72, 0.88], [1.72, 0.88],
    [-0.72, -0.88], [0.72, -0.88], [-0.72, 0.88], [0.72, 0.88],
  ];
  for (let i = 0; i < nail_positions.length; i++) {
    setInstance(
      top_nails,
      i,
      nail_positions[i][0],
      topY + topH * 0.5 + 0.004,
      nail_positions[i][1],
      0,
      0,
      0
    );
  }
  top_nails.instanceMatrix.needsUpdate = true;
  root.add(top_nails);

  const back_raised_railGeom = new THREE.BoxGeometry(deskW + 0.08, 0.16, 0.16);
  const back_raised_rail = new THREE.Mesh(back_raised_railGeom, woodMat);
  back_raised_rail.name = "back_raised_rail";
  back_raised_rail.position.set(0, topY + 0.14, -deskD * 0.5 + 0.02);
  root.add(back_raised_rail);

  const back_rail_beadGeom = new THREE.CylinderGeometry(0.038, 0.038, deskW, 12);
  const back_rail_bead = new THREE.Mesh(back_rail_beadGeom, lightWoodMat);
  back_rail_bead.name = "back_rail_bead";
  back_rail_bead.rotation.z = Math.PI / 2;
  back_rail_bead.position.set(0, topY + 0.09, -deskD * 0.5 + 0.105);
  root.add(back_rail_bead);

  const back_rail_endGeom = new THREE.SphereGeometry(0.09, 14, 8);
  const back_rail_end_left = new THREE.Mesh(back_rail_endGeom, woodMat);
  back_rail_end_left.name = "back_rail_end_left";
  back_rail_end_left.scale.set(0.75, 0.7, 1.0);
  back_rail_end_left.position.set(-deskW * 0.5 - 0.02, topY + 0.14, -deskD * 0.5 + 0.02);
  root.add(back_rail_end_left);

  const back_rail_end_right = new THREE.Mesh(back_rail_endGeom, woodMat);
  back_rail_end_right.name = "back_rail_end_right";
  back_rail_end_right.scale.set(0.75, 0.7, 1.0);
  back_rail_end_right.position.set(deskW * 0.5 + 0.02, topY + 0.14, -deskD * 0.5 + 0.02);
  root.add(back_rail_end_right);

  const front_apronGeom = new THREE.BoxGeometry(3.42, 0.64, 0.16);
  const front_apron = new THREE.Mesh(front_apronGeom, darkWoodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 2.06, 0.96);
  root.add(front_apron);

  const drawer_frontGeom = new THREE.BoxGeometry(3.18, 0.43, 0.09);
  const drawer_front = new THREE.Mesh(drawer_frontGeom, lightWoodMat);
  drawer_front.name = "drawer_front";
  drawer_front.position.set(0, 2.11, 1.075);
  root.add(drawer_front);

  const drawer_top_gap = addBox(root, 3.28, 0.025, 0.025, darkWoodMat, 0, 2.345, 1.125);
  drawer_top_gap.name = "drawer_top_gap";
  const drawer_bottom_gap = addBox(root, 3.28, 0.025, 0.025, darkWoodMat, 0, 1.875, 1.125);
  drawer_bottom_gap.name = "drawer_bottom_gap";
  const drawer_left_gap = addBox(root, 0.025, 0.46, 0.025, darkWoodMat, -1.61, 2.11, 1.125);
  drawer_left_gap.name = "drawer_left_gap";
  const drawer_right_gap = addBox(root, 0.025, 0.46, 0.025, darkWoodMat, 1.61, 2.11, 1.125);
  drawer_right_gap.name = "drawer_right_gap";

  const drawer_lower_moldingGeom = new THREE.BoxGeometry(3.48, 0.09, 0.12);
  const drawer_lower_molding = new THREE.Mesh(drawer_lower_moldingGeom, woodMat);
  drawer_lower_molding.name = "drawer_lower_molding";
  drawer_lower_molding.position.set(0, 1.76, 0.99);
  root.add(drawer_lower_molding);

  const drawer_grain_marksGeom = new THREE.BoxGeometry(0.32, 0.009, 0.008);
  const drawer_grain_marks = new THREE.InstancedMesh(drawer_grain_marksGeom, grainMat, 14);
  drawer_grain_marks.name = "drawer_grain_marks";
  for (let i = 0; i < 14; i++) {
    const dx = -1.42 + ((i * 5) % 13) / 12 * 2.84;
    const dy = 1.94 + ((i * 7) % 11) / 10 * 0.32;
    const dr = ((i % 5) - 2) * 0.04;
    const ds = 0.45 + (i % 4) * 0.18;
    setInstance(drawer_grain_marks, i, dx, dy, 1.126, 0, 0, dr, ds, 1, 1);
  }
  drawer_grain_marks.instanceMatrix.needsUpdate = true;
  root.add(drawer_grain_marks);

  const drawer_handle_mountGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.035, 18);
  const left_drawer_handle_mounts = new THREE.InstancedMesh(drawer_handle_mountGeom, brassMat, 2);
  left_drawer_handle_mounts.name = "left_drawer_handle_mounts";
  setInstance(left_drawer_handle_mounts, 0, -1.25, 2.12, 1.145, Math.PI / 2, 0, 0);
  setInstance(left_drawer_handle_mounts, 1, -0.75, 2.12, 1.145, Math.PI / 2, 0, 0);
  left_drawer_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(left_drawer_handle_mounts);

  const right_drawer_handle_mounts = new THREE.InstancedMesh(drawer_handle_mountGeom, brassMat, 2);
  right_drawer_handle_mounts.name = "right_drawer_handle_mounts";
  setInstance(right_drawer_handle_mounts, 0, 0.75, 2.04, 1.145, Math.PI / 2, 0, 0);
  setInstance(right_drawer_handle_mounts, 1, 1.25, 2.04, 1.145, Math.PI / 2, 0, 0);
  right_drawer_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(right_drawer_handle_mounts);

  const handle_points = [
    new THREE.Vector3(-0.25, 0, 0),
    new THREE.Vector3(-0.22, -0.08, 0.035),
    new THREE.Vector3(-0.12, -0.16, 0.055),
    new THREE.Vector3(0, -0.18, 0.06),
    new THREE.Vector3(0.12, -0.16, 0.055),
    new THREE.Vector3(0.22, -0.08, 0.035),
    new THREE.Vector3(0.25, 0, 0),
  ];
  const drawer_handle_curve = new THREE.CatmullRomCurve3(handle_points);
  const drawer_handleGeom = new THREE.TubeGeometry(drawer_handle_curve, 28, 0.025, 8, false);

  const left_drawer_handle = new THREE.Mesh(drawer_handleGeom, brassMat);
  left_drawer_handle.name = "left_drawer_handle";
  left_drawer_handle.position.set(-1.0, 2.12, 1.17);
  root.add(left_drawer_handle);

  const right_drawer_handle = new THREE.Mesh(drawer_handleGeom, brassMat);
  right_drawer_handle.name = "right_drawer_handle";
  right_drawer_handle.position.set(1.0, 2.04, 1.17);
  root.add(right_drawer_handle);

  const center_drawer_pull_mountGeom = new THREE.CylinderGeometry(0.09, 0.105, 0.035, 16);
  const center_drawer_pull_mount = new THREE.Mesh(center_drawer_pull_mountGeom, brassMat);
  center_drawer_pull_mount.name = "center_drawer_pull_mount";
  center_drawer_pull_mount.rotation.x = Math.PI / 2;
  center_drawer_pull_mount.position.set(0, 2.12, 1.145);
  root.add(center_drawer_pull_mount);

  const center_drawer_pull_ringGeom = new THREE.TorusGeometry(0.075, 0.016, 8, 20);
  const center_drawer_pull_ring = new THREE.Mesh(center_drawer_pull_ringGeom, darkMetalMat);
  center_drawer_pull_ring.name = "center_drawer_pull_ring";
  center_drawer_pull_ring.scale.set(0.72, 1.0, 1.0);
  center_drawer_pull_ring.position.set(0, 2.035, 1.18);
  root.add(center_drawer_pull_ring);

  const center_drawer_pull_link = addBox(
    root,
    0.028,
    0.08,
    0.025,
    darkMetalMat,
    0,
    2.105,
    1.18
  );
  center_drawer_pull_link.name = "center_drawer_pull_link";

  const side_panelGeom = new THREE.BoxGeometry(0.12, 1.5, 1.34);
  const left_side_panel = new THREE.Mesh(side_panelGeom, insetWoodMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-legX, 1.36, -0.02);
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, insetWoodMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(legX, 1.36, -0.02);
  root.add(right_side_panel);

  const side_upper_railGeom = new THREE.BoxGeometry(0.2, 0.22, 1.72);
  const left_side_upper_rail = new THREE.Mesh(side_upper_railGeom, woodMat);
  left_side_upper_rail.name = "left_side_upper_rail";
  left_side_upper_rail.position.set(-legX, 2.18, 0);
  root.add(left_side_upper_rail);

  const right_side_upper_rail = new THREE.Mesh(side_upper_railGeom, woodMat);
  right_side_upper_rail.name = "right_side_upper_rail";
  right_side_upper_rail.position.set(legX, 2.18, 0);
  root.add(right_side_upper_rail);

  const side_bottom_railGeom = new THREE.BoxGeometry(0.2, 0.18, 1.72);
  const left_side_bottom_rail = new THREE.Mesh(side_bottom_railGeom, woodMat);
  left_side_bottom_rail.name = "left_side_bottom_rail";
  left_side_bottom_rail.position.set(-legX, 0.58, 0);
  root.add(left_side_bottom_rail);

  const right_side_bottom_rail = new THREE.Mesh(side_bottom_railGeom, woodMat);
  right_side_bottom_rail.name = "right_side_bottom_rail";
  right_side_bottom_rail.position.set(legX, 0.58, 0);
  root.add(right_side_bottom_rail);

  const side_panel_trimGeom = new THREE.BoxGeometry(0.025, 1.34, 0.045);
  const side_panel_trim = new THREE.InstancedMesh(side_panel_trimGeom, darkWoodMat, 4);
  side_panel_trim.name = "side_panel_trim";
  setInstance(side_panel_trim, 0, -legX - 0.071, 1.36, -0.67, 0, 0, 0);
  setInstance(side_panel_trim, 1, -legX - 0.071, 1.36, 0.63, 0, 0, 0);
  setInstance(side_panel_trim, 2, legX + 0.071, 1.36, -0.67, 0, 0, 0);
  setInstance(side_panel_trim, 3, legX + 0.071, 1.36, 0.63, 0, 0, 0);
  side_panel_trim.instanceMatrix.needsUpdate = true;
  root.add(side_panel_trim);

  const leg_postGeom = new THREE.BoxGeometry(0.36, 1.9, 0.36);
  const front_left_leg = new THREE.Mesh(leg_postGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-legX, 1.45, legZ);
  root.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(leg_postGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(legX, 1.45, legZ);
  root.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(leg_postGeom, woodMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-legX, 1.45, -legZ);
  root.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(leg_postGeom, woodMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(legX, 1.45, -legZ);
  root.add(rear_right_leg);

  const front_post_groovesGeom = new THREE.BoxGeometry(0.022, 1.48, 0.009);
  const front_post_grooves = new THREE.InstancedMesh(front_post_groovesGeom, darkWoodMat, 4);
  front_post_grooves.name = "front_post_grooves";
  setInstance(front_post_grooves, 0, -legX - 0.065, 1.43, legZ + 0.185, 0, 0, 0);
  setInstance(front_post_grooves, 1, -legX + 0.065, 1.43, legZ + 0.185, 0, 0, 0);
  setInstance(front_post_grooves, 2, legX - 0.065, 1.43, legZ + 0.185, 0, 0, 0);
  setInstance(front_post_grooves, 3, legX + 0.065, 1.43, legZ + 0.185, 0, 0, 0);
  front_post_grooves.instanceMatrix.needsUpdate = true;
  root.add(front_post_grooves);

  const side_post_groovesGeom = new THREE.BoxGeometry(0.009, 1.42, 0.022);
  const side_post_grooves = new THREE.InstancedMesh(side_post_groovesGeom, darkWoodMat, 8);
  side_post_grooves.name = "side_post_grooves";
  let groove_index = 0;
  for (const side of [-1, 1]) {
    for (const zc of [-legZ, legZ]) {
      for (const zoff of [-0.06, 0.06]) {
        setInstance(
          side_post_grooves,
          groove_index++,
          side * (legX + 0.185),
          1.43,
          zc + zoff,
          0,
          0,
          0
        );
      }
    }
  }
  side_post_grooves.instanceMatrix.needsUpdate = true;
  root.add(side_post_grooves);

  const footShape = new THREE.Shape();
  footShape.moveTo(-0.26, 0.44);
  footShape.lineTo(0.26, 0.44);
  footShape.lineTo(0.25, 0.34);
  footShape.bezierCurveTo(0.22, 0.27, 0.17, 0.22, 0.18, 0.15);
  footShape.bezierCurveTo(0.2, 0.09, 0.27, 0.06, 0.27, 0);
  footShape.lineTo(-0.27, 0);
  footShape.bezierCurveTo(-0.27, 0.06, -0.2, 0.09, -0.18, 0.15);
  footShape.bezierCurveTo(-0.17, 0.22, -0.22, 0.27, -0.25, 0.34);
  footShape.closePath();

  const footGeom = new THREE.ExtrudeGeometry(footShape, {
    depth: 0.42,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.018,
    bevelSegments: 2,
  });
  footGeom.translate(0, 0, -0.21);

  const front_left_foot = new THREE.Mesh(footGeom, woodMat);
  front_left_foot.name = "front_left_foot";
  front_left_foot.position.set(-legX, 0, legZ);
  root.add(front_left_foot);

  const front_right_foot = new THREE.Mesh(footGeom, woodMat);
  front_right_foot.name = "front_right_foot";
  front_right_foot.position.set(legX, 0, legZ);
  root.add(front_right_foot);

  const rear_left_foot = new THREE.Mesh(footGeom, woodMat);
  rear_left_foot.name = "rear_left_foot";
  rear_left_foot.position.set(-legX, 0, -legZ);
  root.add(rear_left_foot);

  const rear_right_foot = new THREE.Mesh(footGeom, woodMat);
  rear_right_foot.name = "rear_right_foot";
  rear_right_foot.position.set(legX, 0, -legZ);
  root.add(rear_right_foot);

  const foot_collarGeom = new THREE.BoxGeometry(0.46, 0.1, 0.46);
  const foot_collars = new THREE.InstancedMesh(foot_collarGeom, lightWoodMat, 4);
  foot_collars.name = "foot_collars";
  setInstance(foot_collars, 0, -legX, 0.46, legZ, 0, 0, 0);
  setInstance(foot_collars, 1, legX, 0.46, legZ, 0, 0, 0);
  setInstance(foot_collars, 2, -legX, 0.46, -legZ, 0, 0, 0);
  setInstance(foot_collars, 3, legX, 0.46, -legZ, 0, 0, 0);
  foot_collars.instanceMatrix.needsUpdate = true;
  root.add(foot_collars);

  const side_lower_moldingGeom = new THREE.BoxGeometry(0.22, 0.1, 1.62);
  const left_side_lower_molding = new THREE.Mesh(side_lower_moldingGeom, lightWoodMat);
  left_side_lower_molding.name = "left_side_lower_molding";
  left_side_lower_molding.position.set(-legX, 0.49, 0);
  root.add(left_side_lower_molding);

  const right_side_lower_molding = new THREE.Mesh(side_lower_moldingGeom, lightWoodMat);
  right_side_lower_molding.name = "right_side_lower_molding";
  right_side_lower_molding.position.set(legX, 0.49, 0);
  root.add(right_side_lower_molding);

  const side_panel_grainGeom = new THREE.BoxGeometry(0.008, 0.34, 0.014);
  const side_panel_grain = new THREE.InstancedMesh(side_panel_grainGeom, grainMat, 24);
  side_panel_grain.name = "side_panel_grain";
  let side_grain_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 12; i++) {
      const gy = 0.76 + ((i * 5) % 11) / 10 * 1.18;
      const gz = -0.55 + ((i * 7) % 12) / 11 * 1.1;
      const gr = ((i % 5) - 2) * 0.08;
      const gs = 0.55 + (i % 4) * 0.18;
      setInstance(
        side_panel_grain,
        side_grain_index++,
        side * (legX + 0.066),
        gy,
        gz,
        gr,
        0,
        0,
        1,
        gs,
        1
      );
    }
  }
  side_panel_grain.instanceMatrix.needsUpdate = true;
  root.add(side_panel_grain);

  const knee_shape = new THREE.Shape();
  knee_shape.moveTo(0, 0);
  knee_shape.lineTo(0.46, 0);
  knee_shape.bezierCurveTo(0.39, 0.08, 0.25, 0.18, 0.2, 0.38);
  knee_shape.lineTo(0, 0.38);
  knee_shape.closePath();

  const knee_bracketGeom = new THREE.ExtrudeGeometry(knee_shape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  knee_bracketGeom.translate(0, 0, -0.065);

  const left_knee_bracket = new THREE.Mesh(knee_bracketGeom, woodMat);
  left_knee_bracket.name = "left_knee_bracket";
  left_knee_bracket.position.set(-1.5, 1.4, 0.91);
  root.add(left_knee_bracket);

  const right_knee_bracket = new THREE.Mesh(knee_bracketGeom, woodMat);
  right_knee_bracket.name = "right_knee_bracket";
  right_knee_bracket.scale.x = -1;
  right_knee_bracket.position.set(1.5, 1.4, 0.91);
  root.add(right_knee_bracket);

  const left_rear_support = new THREE.Group();
  left_rear_support.name = "left_rear_support";
  root.add(left_rear_support);

  const left_support_panel = addBox(
    left_rear_support,
    0.2,
    1.28,
    0.72,
    darkWoodMat,
    -1.2,
    1.15,
    -0.15
  );
  left_support_panel.name = "left_support_panel";

  const left_support_front_rail = addBox(
    left_rear_support,
    0.27,
    1.42,
    0.11,
    woodMat,
    -1.2,
    1.18,
    0.23
  );
  left_support_front_rail.name = "left_support_front_rail";

  const left_support_rear_rail = addBox(
    left_rear_support,
    0.27,
    1.42,
    0.11,
    woodMat,
    -1.2,
    1.18,
    -0.53
  );
  left_support_rear_rail.name = "left_support_rear_rail";

  const left_support_bottom_rail = addBox(
    left_rear_support,
    0.27,
    0.13,
    0.82,
    woodMat,
    -1.2,
    0.51,
    -0.15
  );
  left_support_bottom_rail.name = "left_support_bottom_rail";

  const left_support_top_rail = addBox(
    left_rear_support,
    0.27,
    0.13,
    0.82,
    woodMat,
    -1.2,
    1.82,
    -0.15
  );
  left_support_top_rail.name = "left_support_top_rail";

  const left_support_foot = addBox(
    left_rear_support,
    0.34,
    0.34,
    0.34,
    woodMat,
    -1.2,
    0.22,
    -0.15
  );
  left_support_foot.name = "left_support_foot";

  const paper_unitGeom = new THREE.BoxGeometry(1, 1, 1);

  function createPaperStack(name, w, d, layers, x, y, z, ry, material) {
    const stack = new THREE.Group();
    stack.name = name;
    stack.position.set(x, y, z);
    stack.rotation.y = ry;

    const pages = new THREE.InstancedMesh(paper_unitGeom, material, layers);
    pages.name = name + "_pages";
    for (let i = 0; i < layers; i++) {
      const px = ((i * 3) % 5 - 2) * 0.006;
      const pz = ((i * 7) % 5 - 2) * 0.005;
      const pr = ((i * 5) % 7 - 3) * 0.006;
      setInstance(
        pages,
        i,
        px,
        i * 0.012,
        pz,
        0,
        pr,
        0,
        w * (1 - (i % 3) * 0.004),
        0.008,
        d * (1 - (i % 2) * 0.006)
      );
    }
    pages.instanceMatrix.needsUpdate = true;
    stack.add(pages);
    return stack;
  }

  const large_left_stack = createPaperStack(
    "large_left_stack",
    1.02,
    0.7,
    9,
    -0.92,
    topY + 0.105,
    0.2,
    -0.18,
    paperMat
  );
  root.add(large_left_stack);

  const back_yellow_stack = createPaperStack(
    "back_yellow_stack",
    0.72,
    0.5,
    5,
    -0.36,
    topY + 0.1,
    -0.56,
    0.08,
    yellowPaperMat
  );
  root.add(back_yellow_stack);

  const back_cream_stack = createPaperStack(
    "back_cream_stack",
    0.72,
    0.48,
    5,
    0.18,
    topY + 0.1,
    -0.57,
    -0.05,
    paperMat
  );
  root.add(back_cream_stack);

  const green_packet = new THREE.Group();
  green_packet.name = "green_packet";
  green_packet.position.set(0.72, topY + 0.1, -0.57);
  green_packet.rotation.y = 0.06;
  root.add(green_packet);

  const green_packet_lower = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.012, 0.48), paperEdgeMat);
  green_packet_lower.name = "green_packet_lower";
  green_packet_lower.position.y = 0.006;
  green_packet.add(green_packet_lower);

  const green_packet_paper = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.01, 0.44), paperMat);
  green_packet_paper.name = "green_packet_paper";
  green_packet_paper.position.y = 0.018;
  green_packet.add(green_packet_paper);

  const green_packet_bandGeom = new THREE.BoxGeometry(0.075, 0.035, 0.52);
  const green_packet_band_left = new THREE.Mesh(green_packet_bandGeom, darkWoodMat);
  green_packet_band_left.name = "green_packet_band_left";
  green_packet_band_left.position.set(-0.3, 0.025, 0);
  green_packet.add(green_packet_band_left);

  const green_packet_band_right = new THREE.Mesh(green_packet_bandGeom, darkWoodMat);
  green_packet_band_right.name = "green_packet_band_right";
  green_packet_band_right.position.set(0.3, 0.025, 0);
  green_packet.add(green_packet_band_right);

  const right_cream_stack = createPaperStack(
    "right_cream_stack",
    0.82,
    0.54,
    6,
    1.18,
    topY + 0.1,
    -0.32,
    -0.12,
    paperMat
  );
  root.add(right_cream_stack);

  const far_right_stack = createPaperStack(
    "far_right_stack",
    0.68,
    0.48,
    5,
    1.48,
    topY + 0.1,
    0.34,
    0.04,
    paperMat
  );
  root.add(far_right_stack);

  const far_right_yellow_note = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.012, 0.3), yellowPaperMat);
  far_right_yellow_note.name = "far_right_yellow_note";
  far_right_yellow_note.position.set(1.47, topY + 0.185, 0.32);
  far_right_yellow_note.rotation.y = -0.03;
  root.add(far_right_yellow_note);

  const central_loose_page_group = new THREE.Group();
  central_loose_page_group.name = "central_loose_page_group";
  central_loose_page_group.position.set(0.2, topY + 0.105, 0.34);
  central_loose_page_group.rotation.y = -0.1;
  root.add(central_loose_page_group);

  const loose_page_shape = new THREE.Shape();
  loose_page_shape.moveTo(-0.5, -0.34);
  loose_page_shape.lineTo(-0.18, -0.35);
  loose_page_shape.lineTo(0.12, -0.34);
  loose_page_shape.lineTo(0.5, -0.32);
  loose_page_shape.lineTo(0.49, 0.04);
  loose_page_shape.lineTo(0.48, 0.34);
  loose_page_shape.lineTo(0.15, 0.35);
  loose_page_shape.lineTo(-0.15, 0.34);
  loose_page_shape.lineTo(-0.5, 0.32);
  loose_page_shape.lineTo(-0.49, 0);
  loose_page_shape.closePath();

  const central_loose_pageGeom = new THREE.ExtrudeGeometry(loose_page_shape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: false,
  });
  const central_loose_page = new THREE.Mesh(central_loose_pageGeom, paperMat);
  central_loose_page.name = "central_loose_page";
  central_loose_page.rotation.x = -Math.PI / 2;
  central_loose_page_group.add(central_loose_page);

  const central_page_textGeom = new THREE.BoxGeometry(0.32, 0.005, 0.011);
  const central_page_text = new THREE.InstancedMesh(central_page_textGeom, inkMat, 15);
  central_page_text.name = "central_page_text";
  for (let i = 0; i < 15; i++) {
    const tx = -0.29 + ((i * 5) % 7) * 0.09;
    const tz = -0.17 + i * 0.025;
    const tl = 0.35 + ((i * 3) % 6) * 0.1;
    const tr = ((i % 3) - 1) * 0.018;
    setInstance(central_page_text, i, tx, 0.013, tz, 0, tr, 0, tl, 1, 1);
  }
  central_page_text.instanceMatrix.needsUpdate = true;
  central_loose_page_group.add(central_page_text);

  const central_page_headingGeom = new THREE.BoxGeometry(0.38, 0.006, 0.018);
  const central_page_heading = new THREE.Mesh(central_page_headingGeom, inkMat);
  central_page_heading.name = "central_page_heading";
  central_page_heading.position.set(0, 0.014, -0.235);
  central_loose_page_group.add(central_page_heading);

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
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }
}