export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_double_shackle_locket";

  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc8a657,
    metalness: 0.6,
    roughness: 0.2,
  });
  const light_brassMat = new THREE.MeshStandardMaterial({
    color: 0xddc47a,
    metalness: 0.55,
    roughness: 0.25,
  });
  const brushed_brassMat = new THREE.MeshStandardMaterial({
    color: 0x9b834f,
    metalness: 0.6,
    roughness: 0.5,
  });
  const aged_silverMat = new THREE.MeshStandardMaterial({
    color: 0x81786a,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dark_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x30291f,
    metalness: 0.35,
    roughness: 0.7,
  });

  function roundedRectShape(width, height, radius) {
    const x = width / 2;
    const y = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
        curveSegments: 8,
      }
    );
  }

  function shieldShape(scale) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.56 * scale, 0.25 * scale);
    shape.lineTo(-0.48 * scale, 0.34 * scale);
    shape.lineTo(-0.20 * scale, 0.39 * scale);
    shape.lineTo(0, 0.40 * scale);
    shape.lineTo(0.20 * scale, 0.39 * scale);
    shape.lineTo(0.48 * scale, 0.34 * scale);
    shape.lineTo(0.56 * scale, 0.25 * scale);
    shape.lineTo(0.53 * scale, -0.24 * scale);
    shape.lineTo(0.43 * scale, -0.34 * scale);
    shape.lineTo(0.18 * scale, -0.39 * scale);
    shape.lineTo(0, -0.40 * scale);
    shape.lineTo(-0.18 * scale, -0.39 * scale);
    shape.lineTo(-0.43 * scale, -0.34 * scale);
    shape.lineTo(-0.53 * scale, -0.24 * scale);
    shape.closePath();
    return shape;
  }

  function makeTube(points, radius, material, segments, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 10, closed),
      material
    );
  }

  function makeRod(start, end, radius, material) {
    const curve = new THREE.LineCurve3(start, end);
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 4, radius, 8, false),
      material
    );
  }

  const upper_shackle = new THREE.Group();
  upper_shackle.name = "upper_shackle";
  const upper_shackle_points = [
    new THREE.Vector3(-0.54, 0.02, -0.075),
    new THREE.Vector3(-0.50, 0.43, -0.075),
    new THREE.Vector3(-0.36, 0.82, -0.075),
    new THREE.Vector3(-0.08, 1.00, -0.075),
    new THREE.Vector3(0.23, 0.98, -0.075),
    new THREE.Vector3(0.48, 0.78, -0.075),
    new THREE.Vector3(0.58, 0.45, -0.075),
    new THREE.Vector3(0.55, 0.03, -0.075),
  ];
  const upper_shackle_tube = makeTube(
    upper_shackle_points,
    0.095,
    polished_brassMat,
    64,
    false
  );
  upper_shackle_tube.name = "upper_shackle_tube";
  upper_shackle.add(upper_shackle_tube);

  const upper_shackle_ridge_points = upper_shackle_points.map(
    (point) => new THREE.Vector3(point.x, point.y, 0.018)
  );
  const upper_shackle_ridge = makeTube(
    upper_shackle_ridge_points,
    0.011,
    light_brassMat,
    64,
    false
  );
  upper_shackle_ridge.name = "upper_shackle_ridge";
  upper_shackle.add(upper_shackle_ridge);

  const upper_shackle_collar = makeRod(
    new THREE.Vector3(0.29, 0.945, -0.005),
    new THREE.Vector3(0.43, 0.805, -0.005),
    0.106,
    brushed_brassMat
  );
  upper_shackle_collar.name = "upper_shackle_collar";
  upper_shackle.add(upper_shackle_collar);

  const upper_shackle_seam = makeRod(
    new THREE.Vector3(0.275, 0.958, 0.018),
    new THREE.Vector3(0.31, 0.922, 0.018),
    0.012,
    dark_grooveMat
  );
  upper_shackle_seam.name = "upper_shackle_seam";
  upper_shackle.add(upper_shackle_seam);
  root.add(upper_shackle);

  const lower_shackle = new THREE.Group();
  lower_shackle.name = "lower_shackle";
  const lower_shackle_points = [
    new THREE.Vector3(0.54, -0.04, -0.075),
    new THREE.Vector3(0.50, -0.43, -0.075),
    new THREE.Vector3(0.34, -0.80, -0.075),
    new THREE.Vector3(0.04, -0.98, -0.075),
    new THREE.Vector3(-0.28, -0.94, -0.075),
    new THREE.Vector3(-0.49, -0.72, -0.075),
    new THREE.Vector3(-0.58, -0.42, -0.075),
    new THREE.Vector3(-0.54, -0.03, -0.075),
  ];
  const lower_shackle_tube = makeTube(
    lower_shackle_points,
    0.095,
    polished_brassMat,
    64,
    false
  );
  lower_shackle_tube.name = "lower_shackle_tube";
  lower_shackle.add(lower_shackle_tube);

  const lower_shackle_ridge_points = lower_shackle_points.map(
    (point) => new THREE.Vector3(point.x, point.y, 0.018)
  );
  const lower_shackle_ridge = makeTube(
    lower_shackle_ridge_points,
    0.011,
    light_brassMat,
    64,
    false
  );
  lower_shackle_ridge.name = "lower_shackle_ridge";
  lower_shackle.add(lower_shackle_ridge);

  const lower_shackle_collar = makeRod(
    new THREE.Vector3(-0.37, -0.84, -0.005),
    new THREE.Vector3(-0.49, -0.70, -0.005),
    0.106,
    brushed_brassMat
  );
  lower_shackle_collar.name = "lower_shackle_collar";
  lower_shackle.add(lower_shackle_collar);

  const lower_shackle_seam = makeRod(
    new THREE.Vector3(-0.39, -0.82, 0.018),
    new THREE.Vector3(-0.35, -0.86, 0.018),
    0.012,
    dark_grooveMat
  );
  lower_shackle_seam.name = "lower_shackle_seam";
  lower_shackle.add(lower_shackle_seam);
  root.add(lower_shackle);

  const lock_body = new THREE.Group();
  lock_body.name = "lock_body";
  lock_body.position.y = -0.02;
  lock_body.rotation.z = -0.08;

  const lock_body_baseGeom = roundedExtrudeGeometry(
    1.34,
    0.78,
    0.075,
    0.18,
    0.025
  );
  const lock_body_base = new THREE.Mesh(
    lock_body_baseGeom,
    brushed_brassMat
  );
  lock_body_base.name = "lock_body_base";
  lock_body_base.position.z = -0.09;
  lock_body.add(lock_body_base);

  const front_panelGeom = roundedExtrudeGeometry(
    1.27,
    0.70,
    0.055,
    0.03,
    0.012
  );
  const front_panel = new THREE.Mesh(front_panelGeom, light_brassMat);
  front_panel.name = "front_panel";
  front_panel.position.z = 0.09;
  lock_body.add(front_panel);

  const body_top_railGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    1.18,
    10
  );
  const body_top_rail = new THREE.Mesh(
    body_top_railGeom,
    polished_brassMat
  );
  body_top_rail.name = "body_top_rail";
  body_top_rail.rotation.z = Math.PI / 2;
  body_top_rail.position.set(0, 0.342, 0.137);
  lock_body.add(body_top_rail);

  const body_bottom_rail = new THREE.Mesh(
    body_top_railGeom,
    polished_brassMat
  );
  body_bottom_rail.name = "body_bottom_rail";
  body_bottom_rail.rotation.z = Math.PI / 2;
  body_bottom_rail.position.set(0, -0.342, 0.137);
  lock_body.add(body_bottom_rail);

  const body_side_railGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.62,
    10
  );
  const body_left_rail = new THREE.Mesh(
    body_side_railGeom,
    polished_brassMat
  );
  body_left_rail.name = "body_left_rail";
  body_left_rail.position.set(-0.61, 0, 0.137);
  lock_body.add(body_left_rail);

  const body_right_rail = new THREE.Mesh(
    body_side_railGeom,
    polished_brassMat
  );
  body_right_rail.name = "body_right_rail";
  body_right_rail.position.set(0.61, 0, 0.137);
  lock_body.add(body_right_rail);

  const ornamental_panel = new THREE.Group();
  ornamental_panel.name = "ornamental_panel";

  const panel_outer_shadowGeom = new THREE.ShapeGeometry(
    shieldShape(1.0),
    8
  );
  const panel_outer_shadow = new THREE.Mesh(
    panel_outer_shadowGeom,
    dark_grooveMat
  );
  panel_outer_shadow.name = "panel_outer_shadow";
  panel_outer_shadow.position.z = 0.134;
  ornamental_panel.add(panel_outer_shadow);

  const panel_outer_borderGeom = new THREE.ShapeGeometry(
    shieldShape(0.96),
    8
  );
  const panel_outer_border = new THREE.Mesh(
    panel_outer_borderGeom,
    polished_brassMat
  );
  panel_outer_border.name = "panel_outer_border";
  panel_outer_border.position.z = 0.138;
  ornamental_panel.add(panel_outer_border);

  const panel_insetGeom = new THREE.ShapeGeometry(
    shieldShape(0.84),
    8
  );
  const panel_inset = new THREE.Mesh(panel_insetGeom, aged_silverMat);
  panel_inset.name = "panel_inset";
  panel_inset.position.z = 0.142;
  ornamental_panel.add(panel_inset);

  const medallion_baseGeom = new THREE.CylinderGeometry(
    0.275,
    0.275,
    0.024,
    48
  );
  const medallion_base = new THREE.Mesh(
    medallion_baseGeom,
    polished_brassMat
  );
  medallion_base.name = "medallion_base";
  medallion_base.rotation.x = Math.PI / 2;
  medallion_base.position.z = 0.155;
  ornamental_panel.add(medallion_base);

  const medallion_recessGeom = new THREE.CylinderGeometry(
    0.235,
    0.235,
    0.014,
    48
  );
  const medallion_recess = new THREE.Mesh(
    medallion_recessGeom,
    dark_grooveMat
  );
  medallion_recess.name = "medallion_recess";
  medallion_recess.rotation.x = Math.PI / 2;
  medallion_recess.position.z = 0.169;
  ornamental_panel.add(medallion_recess);

  const medallion_outer_ringGeom = new THREE.TorusGeometry(
    0.242,
    0.014,
    10,
    48
  );
  const medallion_outer_ring = new THREE.Mesh(
    medallion_outer_ringGeom,
    light_brassMat
  );
  medallion_outer_ring.name = "medallion_outer_ring";
  medallion_outer_ring.position.z = 0.177;
  ornamental_panel.add(medallion_outer_ring);

  const medallion_middle_ringGeom = new THREE.TorusGeometry(
    0.202,
    0.011,
    10,
    48
  );
  const medallion_middle_ring = new THREE.Mesh(
    medallion_middle_ringGeom,
    polished_brassMat
  );
  medallion_middle_ring.name = "medallion_middle_ring";
  medallion_middle_ring.position.z = 0.179;
  ornamental_panel.add(medallion_middle_ring);

  const medallion_inner_ringGeom = new THREE.TorusGeometry(
    0.166,
    0.009,
    10,
    48
  );
  const medallion_inner_ring = new THREE.Mesh(
    medallion_inner_ringGeom,
    light_brassMat
  );
  medallion_inner_ring.name = "medallion_inner_ring";
  medallion_inner_ring.position.z = 0.181;
  ornamental_panel.add(medallion_inner_ring);

  const center_discGeom = new THREE.CylinderGeometry(
    0.145,
    0.145,
    0.025,
    48
  );
  const center_disc = new THREE.Mesh(center_discGeom, light_brassMat);
  center_disc.name = "center_disc";
  center_disc.rotation.x = Math.PI / 2;
  center_disc.position.z = 0.184;
  ornamental_panel.add(center_disc);

  const center_disc_borderGeom = new THREE.TorusGeometry(
    0.145,
    0.008,
    8,
    48
  );
  const center_disc_border = new THREE.Mesh(
    center_disc_borderGeom,
    polished_brassMat
  );
  center_disc_border.name = "center_disc_border";
  center_disc_border.position.z = 0.198;
  ornamental_panel.add(center_disc_border);

  const left_vine_points = [
    new THREE.Vector3(-0.12, -0.285, 0.151),
    new THREE.Vector3(-0.24, -0.245, 0.151),
    new THREE.Vector3(-0.34, -0.16, 0.151),
    new THREE.Vector3(-0.39, -0.04, 0.151),
    new THREE.Vector3(-0.36, 0.09, 0.151),
    new THREE.Vector3(-0.29, 0.19, 0.151),
    new THREE.Vector3(-0.18, 0.27, 0.151),
  ];
  const left_vine = makeTube(
    left_vine_points,
    0.008,
    polished_brassMat,
    32,
    false
  );
  left_vine.name = "left_vine";
  ornamental_panel.add(left_vine);

  const right_vine_points = [
    new THREE.Vector3(0.12, -0.285, 0.151),
    new THREE.Vector3(0.24, -0.245, 0.151),
    new THREE.Vector3(0.34, -0.16, 0.151),
    new THREE.Vector3(0.39, -0.04, 0.151),
    new THREE.Vector3(0.36, 0.09, 0.151),
    new THREE.Vector3(0.29, 0.19, 0.151),
    new THREE.Vector3(0.18, 0.27, 0.151),
  ];
  const right_vine = makeTube(
    right_vine_points,
    0.008,
    polished_brassMat,
    32,
    false
  );
  right_vine.name = "right_vine";
  ornamental_panel.add(right_vine);

  const ornament_leafGeom = new THREE.SphereGeometry(1, 12, 8);
  const ornament_leaves = new THREE.InstancedMesh(
    ornament_leafGeom,
    polished_brassMat,
    10
  );
  ornament_leaves.name = "ornament_leaves";
  const leaf_dummy = new THREE.Object3D();
  let leaf_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      const x = side * (0.18 + i * 0.045);
      const y = -0.22 + i * 0.11;
      leaf_dummy.position.set(x, y, 0.157);
      leaf_dummy.rotation.set(0, 0, side * 0.72);
      leaf_dummy.scale.set(0.026, 0.055, 0.008);
      leaf_dummy.updateMatrix();
      ornament_leaves.setMatrixAt(leaf_index, leaf_dummy.matrix);
      leaf_index++;
    }
  }
  ornament_leaves.instanceMatrix.needsUpdate = true;
  ornamental_panel.add(ornament_leaves);

  const ornament_studGeom = new THREE.SphereGeometry(1, 16, 10);
  const ornament_studs = new THREE.InstancedMesh(
    ornament_studGeom,
    light_brassMat,
    6
  );
  ornament_studs.name = "ornament_studs";
  const stud_positions = [
    [-0.40, 0.13],
    [0.40, 0.13],
    [-0.36, -0.18],
    [0.36, -0.18],
    [-0.17, 0.31],
    [0.17, 0.31],
  ];
  const stud_dummy = new THREE.Object3D();
  for (let i = 0; i < stud_positions.length; i++) {
    stud_dummy.position.set(
      stud_positions[i][0],
      stud_positions[i][1],
      0.158
    );
    stud_dummy.rotation.set(0, 0, 0);
    stud_dummy.scale.set(0.031, 0.031, 0.011);
    stud_dummy.updateMatrix();
    ornament_studs.setMatrixAt(i, stud_dummy.matrix);
  }
  ornament_studs.instanceMatrix.needsUpdate = true;
  ornamental_panel.add(ornament_studs);

  lock_body.add(ornamental_panel);

  const side_hingeGeom = roundedExtrudeGeometry(
    0.17,
    0.25,
    0.035,
    0.11,
    0.012
  );
  const side_hinge = new THREE.Mesh(side_hingeGeom, brushed_brassMat);
  side_hinge.name = "side_hinge";
  side_hinge.position.set(0.65, 0.01, 0.09);
  lock_body.add(side_hinge);

  const hinge_barrelGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.14,
    24
  );
  const hinge_barrel = new THREE.Mesh(
    hinge_barrelGeom,
    polished_brassMat
  );
  hinge_barrel.name = "hinge_barrel";
  hinge_barrel.rotation.x = Math.PI / 2;
  hinge_barrel.position.set(0.70, 0.01, 0.225);
  lock_body.add(hinge_barrel);

  const hinge_pin_capGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.012,
    24
  );
  const hinge_pin_cap = new THREE.Mesh(
    hinge_pin_capGeom,
    light_brassMat
  );
  hinge_pin_cap.name = "hinge_pin_cap";
  hinge_pin_cap.rotation.x = Math.PI / 2;
  hinge_pin_cap.position.set(0.70, 0.01, 0.299);
  lock_body.add(hinge_pin_cap);

  root.add(lock_body);

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