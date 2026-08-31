export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_double_shackle_locket";

  const polished_goldMat = new THREE.MeshStandardMaterial({
    color: 0xc9aa62,
    metalness: 0.6,
    roughness: 0.2,
  });
  const light_goldMat = new THREE.MeshStandardMaterial({
    color: 0xe0c982,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushed_goldMat = new THREE.MeshStandardMaterial({
    color: 0xa58d55,
    metalness: 0.6,
    roughness: 0.5,
  });
  const aged_goldMat = new THREE.MeshStandardMaterial({
    color: 0x806b3e,
    metalness: 0.5,
    roughness: 0.5,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x51472f,
    metalness: 0.35,
    roughness: 0.7,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x241f16,
    metalness: 0.2,
    roughness: 0.8,
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = width / 2;
    const y = height / 2;
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

  function makeRoundedExtrude(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      makeRoundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
  }

  function makePolygonExtrude(points, depth, bevel) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
  }

  function makeReliefTube(points, radius, material, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        closed ? 64 : 32,
        radius,
        8,
        closed
      ),
      material
    );
  }

  const upper_shackle_points = [
    new THREE.Vector3(-0.92, 0.08, 0),
    new THREE.Vector3(-0.79, 0.55, 0),
    new THREE.Vector3(-0.67, 1.04, 0),
    new THREE.Vector3(-0.42, 1.43, 0),
    new THREE.Vector3(0.00, 1.58, 0),
    new THREE.Vector3(0.42, 1.43, 0),
    new THREE.Vector3(0.67, 1.04, 0),
    new THREE.Vector3(0.79, 0.55, 0),
    new THREE.Vector3(0.92, 0.08, 0),
  ];
  const upper_shackleCurve = new THREE.CatmullRomCurve3(
    upper_shackle_points,
    false,
    "centripetal"
  );
  const upper_shackleGeom = new THREE.TubeGeometry(
    upper_shackleCurve,
    72,
    0.14,
    16,
    false
  );
  const upper_shackle = new THREE.Mesh(upper_shackleGeom, polished_goldMat);
  upper_shackle.name = "upper_shackle";
  upper_shackle.position.z = -0.08;
  upper_shackle.scale.z = 0.72;
  root.add(upper_shackle);

  const upper_shackle_ridgeGeom = new THREE.TubeGeometry(
    upper_shackleCurve,
    72,
    0.018,
    8,
    false
  );
  const upper_shackle_ridge = new THREE.Mesh(
    upper_shackle_ridgeGeom,
    light_goldMat
  );
  upper_shackle_ridge.name = "upper_shackle_ridge";
  upper_shackle_ridge.position.z = 0.018;
  root.add(upper_shackle_ridge);

  const lower_shackle_points = [
    new THREE.Vector3(-0.92, -0.18, 0),
    new THREE.Vector3(-0.80, -0.55, 0),
    new THREE.Vector3(-0.70, -0.98, 0),
    new THREE.Vector3(-0.43, -1.34, 0),
    new THREE.Vector3(0.00, -1.48, 0),
    new THREE.Vector3(0.43, -1.34, 0),
    new THREE.Vector3(0.70, -0.98, 0),
    new THREE.Vector3(0.80, -0.55, 0),
    new THREE.Vector3(0.92, -0.18, 0),
  ];
  const lower_shackleCurve = new THREE.CatmullRomCurve3(
    lower_shackle_points,
    false,
    "centripetal"
  );
  const lower_shackleGeom = new THREE.TubeGeometry(
    lower_shackleCurve,
    72,
    0.14,
    16,
    false
  );
  const lower_shackle = new THREE.Mesh(lower_shackleGeom, polished_goldMat);
  lower_shackle.name = "lower_shackle";
  lower_shackle.position.z = -0.08;
  lower_shackle.scale.z = 0.72;
  root.add(lower_shackle);

  const lower_shackle_ridgeGeom = new THREE.TubeGeometry(
    lower_shackleCurve,
    72,
    0.018,
    8,
    false
  );
  const lower_shackle_ridge = new THREE.Mesh(
    lower_shackle_ridgeGeom,
    light_goldMat
  );
  lower_shackle_ridge.name = "lower_shackle_ridge";
  lower_shackle_ridge.position.z = 0.018;
  root.add(lower_shackle_ridge);

  const shackle_collarsGeom = new THREE.CylinderGeometry(
    0.158,
    0.158,
    0.30,
    24
  );
  const shackle_collars = new THREE.InstancedMesh(
    shackle_collarsGeom,
    brushed_goldMat,
    4
  );
  shackle_collars.name = "shackle_collars";

  const collar_data = [
    {
      position: new THREE.Vector3(-0.91, 0.08, -0.08),
      direction: new THREE.Vector3(-0.23, 0.97, 0).normalize(),
    },
    {
      position: new THREE.Vector3(0.91, 0.08, -0.08),
      direction: new THREE.Vector3(0.23, 0.97, 0).normalize(),
    },
    {
      position: new THREE.Vector3(-0.91, -0.18, -0.08),
      direction: new THREE.Vector3(-0.31, 0.95, 0).normalize(),
    },
    {
      position: new THREE.Vector3(0.91, -0.18, -0.08),
      direction: new THREE.Vector3(0.31, 0.95, 0).normalize(),
    },
  ];
  const collar_dummy = new THREE.Object3D();
  const collar_y_axis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < collar_data.length; i++) {
    collar_dummy.position.copy(collar_data[i].position);
    collar_dummy.quaternion.setFromUnitVectors(
      collar_y_axis,
      collar_data[i].direction
    );
    collar_dummy.scale.set(1, 1, 0.74);
    collar_dummy.updateMatrix();
    shackle_collars.setMatrixAt(i, collar_dummy.matrix);
  }
  shackle_collars.instanceMatrix.needsUpdate = true;
  root.add(shackle_collars);

  const collar_seamsGeom = new THREE.TorusGeometry(0.158, 0.014, 8, 28);
  const collar_seams = new THREE.InstancedMesh(
    collar_seamsGeom,
    seamMat,
    4
  );
  collar_seams.name = "collar_seams";
  const collar_z_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < collar_data.length; i++) {
    collar_dummy.position
      .copy(collar_data[i].position)
      .addScaledVector(collar_data[i].direction, 0.145);
    collar_dummy.quaternion.setFromUnitVectors(
      collar_z_axis,
      collar_data[i].direction
    );
    collar_dummy.scale.set(1, 0.74, 1);
    collar_dummy.updateMatrix();
    collar_seams.setMatrixAt(i, collar_dummy.matrix);
  }
  collar_seams.instanceMatrix.needsUpdate = true;
  root.add(collar_seams);

  const body_backplateGeom = makeRoundedExtrude(
    2.14,
    1.24,
    0.12,
    0.24,
    0.045
  );
  const body_backplate = new THREE.Mesh(body_backplateGeom, aged_goldMat);
  body_backplate.name = "body_backplate";
  body_backplate.position.z = -0.14;
  root.add(body_backplate);

  const lock_bodyGeom = makeRoundedExtrude(
    2.06,
    1.17,
    0.105,
    0.24,
    0.04
  );
  const lock_body = new THREE.Mesh(lock_bodyGeom, brushed_goldMat);
  lock_body.name = "lock_body";
  lock_body.position.z = -0.08;
  root.add(lock_body);

  const body_edge_railsGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    1.82,
    12
  );
  const body_edge_rails = new THREE.InstancedMesh(
    body_edge_railsGeom,
    light_goldMat,
    2
  );
  body_edge_rails.name = "body_edge_rails";
  const rail_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    rail_dummy.position.set(0, i === 0 ? 0.555 : -0.555, 0.225);
    rail_dummy.rotation.set(0, 0, Math.PI / 2);
    rail_dummy.scale.set(1, 1, 1);
    rail_dummy.updateMatrix();
    body_edge_rails.setMatrixAt(i, rail_dummy.matrix);
  }
  body_edge_rails.instanceMatrix.needsUpdate = true;
  root.add(body_edge_rails);

  const outer_panel_border_points = [
    [-0.73, -0.43],
    [0.73, -0.43],
    [0.88, -0.27],
    [0.88, 0.27],
    [0.73, 0.43],
    [-0.73, 0.43],
    [-0.88, 0.27],
    [-0.88, -0.27],
  ];
  const outer_panel_borderGeom = makePolygonExtrude(
    outer_panel_border_points,
    0.045,
    0.018
  );
  const outer_panel_border = new THREE.Mesh(
    outer_panel_borderGeom,
    polished_goldMat
  );
  outer_panel_border.name = "outer_panel_border";
  outer_panel_border.position.z = 0.19;
  root.add(outer_panel_border);

  const outer_panel_recess_points = [
    [-0.66, -0.365],
    [0.66, -0.365],
    [0.79, -0.225],
    [0.79, 0.225],
    [0.66, 0.365],
    [-0.66, 0.365],
    [-0.79, 0.225],
    [-0.79, -0.225],
  ];
  const outer_panel_recessGeom = makePolygonExtrude(
    outer_panel_recess_points,
    0.026,
    0.008
  );
  const outer_panel_recess = new THREE.Mesh(
    outer_panel_recessGeom,
    recessMat
  );
  outer_panel_recess.name = "outer_panel_recess";
  outer_panel_recess.position.z = 0.238;
  root.add(outer_panel_recess);

  const inner_panel_plate_points = [
    [-0.59, -0.31],
    [0.59, -0.31],
    [0.71, -0.19],
    [0.71, 0.19],
    [0.59, 0.31],
    [-0.59, 0.31],
    [-0.71, 0.19],
    [-0.71, -0.19],
  ];
  const inner_panel_plateGeom = makePolygonExtrude(
    inner_panel_plate_points,
    0.022,
    0.006
  );
  const inner_panel_plate = new THREE.Mesh(
    inner_panel_plateGeom,
    aged_goldMat
  );
  inner_panel_plate.name = "inner_panel_plate";
  inner_panel_plate.position.z = 0.265;
  root.add(inner_panel_plate);

  const panel_outline_points_2d = [
    [-0.64, -0.345],
    [0.64, -0.345],
    [0.77, -0.21],
    [0.77, 0.21],
    [0.64, 0.345],
    [-0.64, 0.345],
    [-0.77, 0.21],
    [-0.77, -0.21],
  ];
  const panel_outline_points_3d = [];
  for (let i = 0; i < panel_outline_points_2d.length; i++) {
    panel_outline_points_3d.push(
      new THREE.Vector3(
        panel_outline_points_2d[i][0],
        panel_outline_points_2d[i][1],
        0.302
      )
    );
  }
  const panel_outline = makeReliefTube(
    panel_outline_points_3d,
    0.014,
    light_goldMat,
    true
  );
  panel_outline.name = "panel_outline";
  root.add(panel_outline);

  const medallion_baseGeom = new THREE.CylinderGeometry(
    0.43,
    0.43,
    0.045,
    48
  );
  const medallion_base = new THREE.Mesh(
    medallion_baseGeom,
    polished_goldMat
  );
  medallion_base.name = "medallion_base";
  medallion_base.rotation.x = Math.PI / 2;
  medallion_base.position.z = 0.305;
  root.add(medallion_base);

  const medallion_outer_grooveGeom = new THREE.TorusGeometry(
    0.385,
    0.017,
    10,
    48
  );
  const medallion_outer_groove = new THREE.Mesh(
    medallion_outer_grooveGeom,
    recessMat
  );
  medallion_outer_groove.name = "medallion_outer_groove";
  medallion_outer_groove.position.z = 0.334;
  root.add(medallion_outer_groove);

  const medallion_outer_ringGeom = new THREE.TorusGeometry(
    0.345,
    0.027,
    12,
    48
  );
  const medallion_outer_ring = new THREE.Mesh(
    medallion_outer_ringGeom,
    light_goldMat
  );
  medallion_outer_ring.name = "medallion_outer_ring";
  medallion_outer_ring.position.z = 0.34;
  root.add(medallion_outer_ring);

  const medallion_middle_ringGeom = new THREE.TorusGeometry(
    0.292,
    0.018,
    10,
    48
  );
  const medallion_middle_ring = new THREE.Mesh(
    medallion_middle_ringGeom,
    polished_goldMat
  );
  medallion_middle_ring.name = "medallion_middle_ring";
  medallion_middle_ring.position.z = 0.346;
  root.add(medallion_middle_ring);

  const medallion_inner_grooveGeom = new THREE.TorusGeometry(
    0.255,
    0.012,
    8,
    48
  );
  const medallion_inner_groove = new THREE.Mesh(
    medallion_inner_grooveGeom,
    recessMat
  );
  medallion_inner_groove.name = "medallion_inner_groove";
  medallion_inner_groove.position.z = 0.35;
  root.add(medallion_inner_groove);

  const medallion_center_discGeom = new THREE.CylinderGeometry(
    0.225,
    0.225,
    0.035,
    48
  );
  const medallion_center_disc = new THREE.Mesh(
    medallion_center_discGeom,
    light_goldMat
  );
  medallion_center_disc.name = "medallion_center_disc";
  medallion_center_disc.rotation.x = Math.PI / 2;
  medallion_center_disc.position.z = 0.354;
  root.add(medallion_center_disc);

  const medallion_center_ringGeom = new THREE.TorusGeometry(
    0.225,
    0.012,
    8,
    48
  );
  const medallion_center_ring = new THREE.Mesh(
    medallion_center_ringGeom,
    aged_goldMat
  );
  medallion_center_ring.name = "medallion_center_ring";
  medallion_center_ring.position.z = 0.374;
  root.add(medallion_center_ring);

  const ornament_vine_points = [
    new THREE.Vector3(-0.69, -0.05, 0.307),
    new THREE.Vector3(-0.66, -0.22, 0.307),
    new THREE.Vector3(-0.52, -0.29, 0.307),
    new THREE.Vector3(-0.31, -0.31, 0.307),
    new THREE.Vector3(0.00, -0.325, 0.307),
    new THREE.Vector3(0.31, -0.31, 0.307),
    new THREE.Vector3(0.52, -0.29, 0.307),
    new THREE.Vector3(0.66, -0.22, 0.307),
    new THREE.Vector3(0.69, -0.05, 0.307),
  ];
  const ornament_vine = makeReliefTube(
    ornament_vine_points,
    0.012,
    light_goldMat,
    false
  );
  ornament_vine.name = "ornament_vine";
  root.add(ornament_vine);

  const ornament_leafShape = new THREE.Shape();
  ornament_leafShape.moveTo(0, 0);
  ornament_leafShape.bezierCurveTo(-0.035, 0.035, -0.032, 0.09, 0, 0.13);
  ornament_leafShape.bezierCurveTo(0.032, 0.09, 0.035, 0.035, 0, 0);
  ornament_leafShape.closePath();
  const ornament_leavesGeom = new THREE.ExtrudeGeometry(
    ornament_leafShape,
    {
      depth: 0.014,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.003,
      bevelSegments: 2,
    }
  );
  const ornament_leaves = new THREE.InstancedMesh(
    ornament_leavesGeom,
    light_goldMat,
    12
  );
  ornament_leaves.name = "ornament_leaves";
  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    leaf_dummy.position.set(
      Math.cos(angle) * 0.49,
      Math.sin(angle) * 0.335,
      0.302
    );
    leaf_dummy.rotation.set(0, 0, angle - Math.PI / 2);
    leaf_dummy.scale.set(1, 1, 1);
    leaf_dummy.updateMatrix();
    ornament_leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  ornament_leaves.instanceMatrix.needsUpdate = true;
  root.add(ornament_leaves);

  const ornament_studsGeom = new THREE.SphereGeometry(0.052, 16, 10);
  const ornament_studs = new THREE.InstancedMesh(
    ornament_studsGeom,
    polished_goldMat,
    4
  );
  ornament_studs.name = "ornament_studs";
  const stud_positions = [
    [-0.59, 0.19],
    [0.59, 0.19],
    [-0.59, -0.19],
    [0.59, -0.19],
  ];
  const stud_dummy = new THREE.Object3D();
  for (let i = 0; i < stud_positions.length; i++) {
    stud_dummy.position.set(
      stud_positions[i][0],
      stud_positions[i][1],
      0.318
    );
    stud_dummy.rotation.set(0, 0, 0);
    stud_dummy.scale.set(1, 1, 0.38);
    stud_dummy.updateMatrix();
    ornament_studs.setMatrixAt(i, stud_dummy.matrix);
  }
  ornament_studs.instanceMatrix.needsUpdate = true;
  root.add(ornament_studs);

  const ornament_beadsGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const ornament_beads = new THREE.InstancedMesh(
    ornament_beadsGeom,
    aged_goldMat,
    8
  );
  ornament_beads.name = "ornament_beads";
  const bead_positions = [
    [-0.46, 0.29],
    [-0.16, 0.325],
    [0.16, 0.325],
    [0.46, 0.29],
    [-0.46, -0.29],
    [-0.16, -0.325],
    [0.16, -0.325],
    [0.46, -0.29],
  ];
  const bead_dummy = new THREE.Object3D();
  for (let i = 0; i < bead_positions.length; i++) {
    bead_dummy.position.set(
      bead_positions[i][0],
      bead_positions[i][1],
      0.316
    );
    bead_dummy.rotation.set(0, 0, 0);
    bead_dummy.scale.set(1, 1, 0.42);
    bead_dummy.updateMatrix();
    ornament_beads.setMatrixAt(i, bead_dummy.matrix);
  }
  ornament_beads.instanceMatrix.needsUpdate = true;
  root.add(ornament_beads);

  const left_side_scroll_points = [
    new THREE.Vector3(-0.68, -0.13, 0.31),
    new THREE.Vector3(-0.60, -0.08, 0.31),
    new THREE.Vector3(-0.67, 0.01, 0.31),
    new THREE.Vector3(-0.59, 0.08, 0.31),
  ];
  const left_side_scroll = makeReliefTube(
    left_side_scroll_points,
    0.011,
    light_goldMat,
    false
  );
  left_side_scroll.name = "left_side_scroll";
  root.add(left_side_scroll);

  const right_side_scroll_points = [
    new THREE.Vector3(0.68, -0.13, 0.31),
    new THREE.Vector3(0.60, -0.08, 0.31),
    new THREE.Vector3(0.67, 0.01, 0.31),
    new THREE.Vector3(0.59, 0.08, 0.31),
  ];
  const right_side_scroll = makeReliefTube(
    right_side_scroll_points,
    0.011,
    light_goldMat,
    false
  );
  right_side_scroll.name = "right_side_scroll";
  root.add(right_side_scroll);

  const side_hinge_barrelsGeom = new THREE.CylinderGeometry(
    0.135,
    0.135,
    0.27,
    24
  );
  const side_hinge_barrels = new THREE.InstancedMesh(
    side_hinge_barrelsGeom,
    polished_goldMat,
    2
  );
  side_hinge_barrels.name = "side_hinge_barrels";
  const hinge_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    hinge_dummy.position.set(side * 1.055, -0.055, -0.055);
    hinge_dummy.rotation.set(0, 0, Math.PI / 2);
    hinge_dummy.scale.set(1, 1, 0.78);
    hinge_dummy.updateMatrix();
    side_hinge_barrels.setMatrixAt(i, hinge_dummy.matrix);
  }
  side_hinge_barrels.instanceMatrix.needsUpdate = true;
  root.add(side_hinge_barrels);

  const side_hinge_capsGeom = new THREE.SphereGeometry(0.135, 20, 12);
  const side_hinge_caps = new THREE.InstancedMesh(
    side_hinge_capsGeom,
    light_goldMat,
    2
  );
  side_hinge_caps.name = "side_hinge_caps";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    hinge_dummy.position.set(side * 1.19, -0.055, -0.055);
    hinge_dummy.rotation.set(0, 0, 0);
    hinge_dummy.scale.set(0.68, 1, 0.78);
    hinge_dummy.updateMatrix();
    side_hinge_caps.setMatrixAt(i, hinge_dummy.matrix);
  }
  side_hinge_caps.instanceMatrix.needsUpdate = true;
  root.add(side_hinge_caps);

  const side_hinge_seamsGeom = new THREE.TorusGeometry(
    0.135,
    0.012,
    8,
    24
  );
  const side_hinge_seams = new THREE.InstancedMesh(
    side_hinge_seamsGeom,
    seamMat,
    2
  );
  side_hinge_seams.name = "side_hinge_seams";
  const hinge_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    hinge_ring_dummy.position.set(side * 0.965, -0.055, -0.055);
    hinge_ring_dummy.rotation.set(0, Math.PI / 2, 0);
    hinge_ring_dummy.scale.set(0.78, 1, 1);
    hinge_ring_dummy.updateMatrix();
    side_hinge_seams.setMatrixAt(i, hinge_ring_dummy.matrix);
  }
  side_hinge_seams.instanceMatrix.needsUpdate = true;
  root.add(side_hinge_seams);

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