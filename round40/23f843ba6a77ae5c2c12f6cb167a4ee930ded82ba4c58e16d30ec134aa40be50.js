export default function generate(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb99b55,
    metalness: 0.55,
    roughness: 0.38,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0xc8b476,
    metalness: 0.45,
    roughness: 0.5,
  });
  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xd4b866,
    metalness: 0.6,
    roughness: 0.25,
  });
  const aged_brassMat = new THREE.MeshStandardMaterial({
    color: 0x80672f,
    metalness: 0.45,
    roughness: 0.6,
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x302719,
    metalness: 0.15,
    roughness: 0.8,
  });

  function roundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
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

  function roundedExtrudeGeometry(width, height, depth, radius, bevel) {
    const geom = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
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
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function makeTube(points, radius, material, tubularSegments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        tubularSegments || 24,
        radius,
        8,
        false
      ),
      material
    );
  }

  const cabinet_bodyGeom = new THREE.BoxGeometry(1.02, 1.16, 0.68);
  const cabinet_body = new THREE.Mesh(cabinet_bodyGeom, brassMat);
  cabinet_body.position.set(0, 0.85, 0);
  root.add(cabinet_body);

  const right_side_panelGeom = new THREE.BoxGeometry(0.026, 1.08, 0.59);
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, panelMat);
  right_side_panel.position.set(0.523, 0.85, -0.005);
  root.add(right_side_panel);

  const left_side_panel = new THREE.Mesh(right_side_panelGeom, panelMat);
  left_side_panel.position.set(-0.523, 0.85, -0.005);
  root.add(left_side_panel);

  const front_corner_postsGeom = roundedExtrudeGeometry(
    0.075,
    1.13,
    0.075,
    0.018,
    0.006
  );
  const front_corner_posts = new THREE.InstancedMesh(
    front_corner_postsGeom,
    polished_brassMat,
    2
  );
  const post_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(i === 0 ? -0.485 : 0.485, 0.85, 0.36);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    front_corner_posts.setMatrixAt(i, post_dummy.matrix);
  }
  front_corner_posts.instanceMatrix.needsUpdate = true;
  root.add(front_corner_posts);

  const rear_corner_posts = new THREE.InstancedMesh(
    front_corner_postsGeom,
    brassMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(i === 0 ? -0.485 : 0.485, 0.85, -0.345);
    post_dummy.updateMatrix();
    rear_corner_posts.setMatrixAt(i, post_dummy.matrix);
  }
  rear_corner_posts.instanceMatrix.needsUpdate = true;
  root.add(rear_corner_posts);

  const front_recessGeom = new THREE.BoxGeometry(0.91, 1.1, 0.025);
  const front_recess = new THREE.Mesh(front_recessGeom, shadowMat);
  front_recess.position.set(0, 0.85, 0.354);
  root.add(front_recess);

  const door_backplateGeom = roundedExtrudeGeometry(
    0.84,
    1.04,
    0.035,
    0.025,
    0.007
  );
  const door_backplate = new THREE.Mesh(door_backplateGeom, aged_brassMat);
  door_backplate.position.set(-0.015, 0.85, 0.37);
  root.add(door_backplate);

  const door_panelGeom = roundedExtrudeGeometry(
    0.7,
    0.88,
    0.035,
    0.026,
    0.009
  );
  const door_panel = new THREE.Mesh(door_panelGeom, panelMat);
  door_panel.position.set(-0.015, 0.85, 0.397);
  root.add(door_panel);

  const door_stileGeom = roundedExtrudeGeometry(
    0.055,
    1.0,
    0.04,
    0.014,
    0.006
  );
  const door_left_stile = new THREE.Mesh(
    door_stileGeom,
    polished_brassMat
  );
  door_left_stile.position.set(-0.407, 0.85, 0.402);
  root.add(door_left_stile);

  const door_right_stile = new THREE.Mesh(
    door_stileGeom,
    polished_brassMat
  );
  door_right_stile.position.set(0.377, 0.85, 0.402);
  root.add(door_right_stile);

  const door_railGeom = roundedExtrudeGeometry(
    0.79,
    0.06,
    0.04,
    0.015,
    0.006
  );
  const door_top_rail = new THREE.Mesh(door_railGeom, polished_brassMat);
  door_top_rail.position.set(-0.015, 1.335, 0.402);
  root.add(door_top_rail);

  const door_bottom_rail = new THREE.Mesh(
    door_railGeom,
    polished_brassMat
  );
  door_bottom_rail.position.set(-0.015, 0.365, 0.402);
  root.add(door_bottom_rail);

  const door_inner_trim = new THREE.Group();
  const vertical_trimGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.86,
    10
  );
  const horizontal_trimGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.68,
    10
  );
  const trim_left = new THREE.Mesh(vertical_trimGeom, aged_brassMat);
  trim_left.position.set(-0.365, 0.85, 0.424);
  door_inner_trim.add(trim_left);
  const trim_right = new THREE.Mesh(vertical_trimGeom, aged_brassMat);
  trim_right.position.set(0.335, 0.85, 0.424);
  door_inner_trim.add(trim_right);
  const trim_top = new THREE.Mesh(horizontal_trimGeom, aged_brassMat);
  trim_top.rotation.z = Math.PI / 2;
  trim_top.position.set(-0.015, 1.285, 0.424);
  door_inner_trim.add(trim_top);
  const trim_bottom = new THREE.Mesh(horizontal_trimGeom, aged_brassMat);
  trim_bottom.rotation.z = Math.PI / 2;
  trim_bottom.position.set(-0.015, 0.415, 0.424);
  door_inner_trim.add(trim_bottom);
  root.add(door_inner_trim);

  const front_top_railGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.96,
    16
  );
  const front_top_rail = new THREE.Mesh(
    front_top_railGeom,
    polished_brassMat
  );
  front_top_rail.rotation.z = Math.PI / 2;
  front_top_rail.position.set(0, 1.414, 0.37);
  root.add(front_top_rail);

  const front_bottom_railGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.98,
    16
  );
  const front_bottom_rail = new THREE.Mesh(
    front_bottom_railGeom,
    polished_brassMat
  );
  front_bottom_rail.rotation.z = Math.PI / 2;
  front_bottom_rail.position.set(0, 0.286, 0.37);
  root.add(front_bottom_rail);

  const top_mainGeom = roundedExtrudeGeometry(
    1.18,
    0.82,
    0.075,
    0.065,
    0.014
  );
  const top_main = new THREE.Mesh(top_mainGeom, brassMat);
  top_main.rotation.x = Math.PI / 2;
  top_main.position.set(0, 1.49, 0);
  root.add(top_main);

  const top_surfaceGeom = roundedExtrudeGeometry(
    1.08,
    0.72,
    0.025,
    0.055,
    0.008
  );
  const top_surface = new THREE.Mesh(top_surfaceGeom, panelMat);
  top_surface.rotation.x = Math.PI / 2;
  top_surface.position.set(0, 1.545, -0.005);
  root.add(top_surface);

  const top_long_moldingGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    1.16,
    18
  );
  const top_front_molding = new THREE.Mesh(
    top_long_moldingGeom,
    polished_brassMat
  );
  top_front_molding.rotation.z = Math.PI / 2;
  top_front_molding.position.set(0, 1.49, 0.414);
  root.add(top_front_molding);

  const top_back_molding = new THREE.Mesh(
    top_long_moldingGeom,
    polished_brassMat
  );
  top_back_molding.rotation.z = Math.PI / 2;
  top_back_molding.position.set(0, 1.49, -0.414);
  root.add(top_back_molding);

  const top_side_moldingGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.79,
    18
  );
  const top_left_molding = new THREE.Mesh(
    top_side_moldingGeom,
    polished_brassMat
  );
  top_left_molding.rotation.x = Math.PI / 2;
  top_left_molding.position.set(-0.59, 1.49, 0);
  root.add(top_left_molding);

  const top_right_molding = new THREE.Mesh(
    top_side_moldingGeom,
    polished_brassMat
  );
  top_right_molding.rotation.x = Math.PI / 2;
  top_right_molding.position.set(0.59, 1.49, 0);
  root.add(top_right_molding);

  const top_corner_capsGeom = new THREE.SphereGeometry(0.038, 14, 10);
  const top_corner_caps = new THREE.InstancedMesh(
    top_corner_capsGeom,
    polished_brassMat,
    4
  );
  const top_corner_positions = [
    [-0.59, 1.49, 0.414],
    [0.59, 1.49, 0.414],
    [-0.59, 1.49, -0.414],
    [0.59, 1.49, -0.414],
  ];
  for (let i = 0; i < top_corner_positions.length; i++) {
    const p = top_corner_positions[i];
    post_dummy.position.set(p[0], p[1], p[2]);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    top_corner_caps.setMatrixAt(i, post_dummy.matrix);
  }
  top_corner_caps.instanceMatrix.needsUpdate = true;
  root.add(top_corner_caps);

  const base_mainGeom = roundedExtrudeGeometry(
    1.14,
    0.78,
    0.075,
    0.055,
    0.012
  );
  const base_main = new THREE.Mesh(base_mainGeom, brassMat);
  base_main.rotation.x = Math.PI / 2;
  base_main.position.set(0, 0.225, 0);
  root.add(base_main);

  const base_long_moldingGeom = new THREE.CylinderGeometry(
    0.029,
    0.029,
    1.12,
    16
  );
  const base_front_molding = new THREE.Mesh(
    base_long_moldingGeom,
    polished_brassMat
  );
  base_front_molding.rotation.z = Math.PI / 2;
  base_front_molding.position.set(0, 0.27, 0.405);
  root.add(base_front_molding);

  const base_back_molding = new THREE.Mesh(
    base_long_moldingGeom,
    polished_brassMat
  );
  base_back_molding.rotation.z = Math.PI / 2;
  base_back_molding.position.set(0, 0.27, -0.405);
  root.add(base_back_molding);

  const base_side_moldingGeom = new THREE.CylinderGeometry(
    0.029,
    0.029,
    0.75,
    16
  );
  const base_left_molding = new THREE.Mesh(
    base_side_moldingGeom,
    polished_brassMat
  );
  base_left_molding.rotation.x = Math.PI / 2;
  base_left_molding.position.set(-0.57, 0.27, 0);
  root.add(base_left_molding);

  const base_right_molding = new THREE.Mesh(
    base_side_moldingGeom,
    polished_brassMat
  );
  base_right_molding.rotation.x = Math.PI / 2;
  base_right_molding.position.set(0.57, 0.27, 0);
  root.add(base_right_molding);

  const base_front_apronShape = new THREE.Shape();
  base_front_apronShape.moveTo(-0.56, 0.04);
  base_front_apronShape.bezierCurveTo(-0.42, 0.04, -0.3, 0.075, -0.16, 0.08);
  base_front_apronShape.bezierCurveTo(-0.06, 0.084, 0.06, 0.084, 0.16, 0.08);
  base_front_apronShape.bezierCurveTo(0.3, 0.075, 0.42, 0.04, 0.56, 0.04);
  base_front_apronShape.lineTo(0.56, 0.25);
  base_front_apronShape.lineTo(-0.56, 0.25);
  base_front_apronShape.closePath();

  const base_front_apronGeom = new THREE.ExtrudeGeometry(
    base_front_apronShape,
    {
      depth: 0.06,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    }
  );
  base_front_apronGeom.translate(0, 0, -0.03);
  const base_front_apron = new THREE.Mesh(
    base_front_apronGeom,
    brassMat
  );
  base_front_apron.position.z = 0.405;
  root.add(base_front_apron);

  const base_front_upper_molding = makeTube(
    [
      new THREE.Vector3(-0.55, 0.255, 0.455),
      new THREE.Vector3(-0.28, 0.247, 0.455),
      new THREE.Vector3(0, 0.242, 0.455),
      new THREE.Vector3(0.28, 0.247, 0.455),
      new THREE.Vector3(0.55, 0.255, 0.455),
    ],
    0.018,
    polished_brassMat,
    28
  );
  root.add(base_front_upper_molding);

  const base_front_lower_molding = makeTube(
    [
      new THREE.Vector3(-0.52, 0.07, 0.456),
      new THREE.Vector3(-0.3, 0.09, 0.456),
      new THREE.Vector3(0, 0.075, 0.456),
      new THREE.Vector3(0.3, 0.09, 0.456),
      new THREE.Vector3(0.52, 0.07, 0.456),
    ],
    0.014,
    polished_brassMat,
    28
  );
  root.add(base_front_lower_molding);

  const base_side_apronsGeom = new THREE.BoxGeometry(0.07, 0.18, 0.68);
  const base_side_aprons = new THREE.InstancedMesh(
    base_side_apronsGeom,
    brassMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(i === 0 ? -0.535 : 0.535, 0.15, 0);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    base_side_aprons.setMatrixAt(i, post_dummy.matrix);
  }
  base_side_aprons.instanceMatrix.needsUpdate = true;
  root.add(base_side_aprons);

  const feetGeom = new THREE.SphereGeometry(1, 18, 12);
  const feet = new THREE.InstancedMesh(feetGeom, brassMat, 4);
  const foot_positions = [
    [-0.5, 0.09, 0.34],
    [0.5, 0.09, 0.34],
    [-0.5, 0.09, -0.34],
    [0.5, 0.09, -0.34],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const p = foot_positions[i];
    post_dummy.position.set(p[0], p[1], p[2]);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(0.085, 0.11, 0.085);
    post_dummy.updateMatrix();
    feet.setMatrixAt(i, post_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const front_foot_escutcheons = new THREE.InstancedMesh(
    feetGeom,
    polished_brassMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(i === 0 ? -0.5 : 0.5, 0.105, 0.414);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(0.062, 0.09, 0.025);
    post_dummy.updateMatrix();
    front_foot_escutcheons.setMatrixAt(i, post_dummy.matrix);
  }
  front_foot_escutcheons.instanceMatrix.needsUpdate = true;
  root.add(front_foot_escutcheons);

  const front_foot_scrollsGeom = new THREE.TorusGeometry(
    0.038,
    0.011,
    8,
    22,
    Math.PI * 1.65
  );
  const front_foot_scrolls = new THREE.InstancedMesh(
    front_foot_scrollsGeom,
    polished_brassMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(i === 0 ? -0.5 : 0.5, 0.12, 0.443);
    post_dummy.rotation.set(0, 0, i === 0 ? -0.35 : 0.35);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    front_foot_scrolls.setMatrixAt(i, post_dummy.matrix);
  }
  front_foot_scrolls.instanceMatrix.needsUpdate = true;
  root.add(front_foot_scrolls);

  const foot_scroll_centersGeom = new THREE.CylinderGeometry(
    0.016,
    0.016,
    0.014,
    12
  );
  const foot_scroll_centers = new THREE.InstancedMesh(
    foot_scroll_centersGeom,
    aged_brassMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    post_dummy.position.set(i === 0 ? -0.5 : 0.5, 0.12, 0.448);
    post_dummy.rotation.set(Math.PI / 2, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    foot_scroll_centers.setMatrixAt(i, post_dummy.matrix);
  }
  foot_scroll_centers.instanceMatrix.needsUpdate = true;
  root.add(foot_scroll_centers);

  const front_left_pilaster_ornament = makeTube(
    [
      new THREE.Vector3(-0.485, 1.31, 0.405),
      new THREE.Vector3(-0.505, 1.23, 0.405),
      new THREE.Vector3(-0.478, 1.14, 0.405),
      new THREE.Vector3(-0.49, 1.02, 0.405),
    ],
    0.007,
    aged_brassMat,
    20
  );
  root.add(front_left_pilaster_ornament);

  const front_right_pilaster_ornament = makeTube(
    [
      new THREE.Vector3(0.485, 1.31, 0.405),
      new THREE.Vector3(0.505, 1.23, 0.405),
      new THREE.Vector3(0.478, 1.14, 0.405),
      new THREE.Vector3(0.49, 1.02, 0.405),
    ],
    0.007,
    aged_brassMat,
    20
  );
  root.add(front_right_pilaster_ornament);

  const hinge_barrelsGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.2,
    14
  );
  const hinge_barrels = new THREE.InstancedMesh(
    hinge_barrelsGeom,
    aged_brassMat,
    2
  );
  const hinge_y_positions = [0.48, 1.17];
  for (let i = 0; i < hinge_y_positions.length; i++) {
    post_dummy.position.set(0.425, hinge_y_positions[i], 0.435);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    hinge_barrels.setMatrixAt(i, post_dummy.matrix);
  }
  hinge_barrels.instanceMatrix.needsUpdate = true;
  root.add(hinge_barrels);

  const hinge_leavesGeom = new THREE.BoxGeometry(0.065, 0.13, 0.014);
  const hinge_leaves = new THREE.InstancedMesh(
    hinge_leavesGeom,
    aged_brassMat,
    2
  );
  for (let i = 0; i < hinge_y_positions.length; i++) {
    post_dummy.position.set(0.388, hinge_y_positions[i], 0.428);
    post_dummy.rotation.set(0, 0, 0);
    post_dummy.scale.set(1, 1, 1);
    post_dummy.updateMatrix();
    hinge_leaves.setMatrixAt(i, post_dummy.matrix);
  }
  hinge_leaves.instanceMatrix.needsUpdate = true;
  root.add(hinge_leaves);

  const hinge_ringsGeom = new THREE.TorusGeometry(
    0.019,
    0.003,
    6,
    14
  );
  const hinge_rings = new THREE.InstancedMesh(
    hinge_ringsGeom,
    polished_brassMat,
    6
  );
  let hinge_ring_index = 0;
  for (let h = 0; h < hinge_y_positions.length; h++) {
    for (let j = -1; j <= 1; j++) {
      post_dummy.position.set(
        0.425,
        hinge_y_positions[h] + j * 0.055,
        0.435
      );
      post_dummy.rotation.set(Math.PI / 2, 0, 0);
      post_dummy.scale.set(1, 1, 1);
      post_dummy.updateMatrix();
      hinge_rings.setMatrixAt(hinge_ring_index, post_dummy.matrix);
      hinge_ring_index++;
    }
  }
  hinge_rings.instanceMatrix.needsUpdate = true;
  root.add(hinge_rings);

  const knob_backplateShape = new THREE.Shape();
  const knob_backplate_points = 16;
  for (let i = 0; i < knob_backplate_points; i++) {
    const angle = (i / knob_backplate_points) * Math.PI * 2;
    const radius = i % 2 === 0 ? 0.075 : 0.052;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      knob_backplateShape.moveTo(x, y);
    } else {
      knob_backplateShape.lineTo(x, y);
    }
  }
  knob_backplateShape.closePath();

  const knob_backplateGeom = new THREE.ExtrudeGeometry(
    knob_backplateShape,
    {
      depth: 0.014,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
    }
  );
  knob_backplateGeom.translate(0, 0, -0.007);
  const knob_backplate = new THREE.Mesh(knob_backplateGeom, aged_brassMat);
  knob_backplate.position.set(-0.33, 0.79, 0.435);
  root.add(knob_backplate);

  const knob_rosetteGeom = new THREE.TorusGeometry(
    0.035,
    0.009,
    8,
    20
  );
  const knob_rosette = new THREE.Mesh(
    knob_rosetteGeom,
    polished_brassMat
  );
  knob_rosette.position.set(-0.33, 0.79, 0.455);
  root.add(knob_rosette);

  const knob_collarGeom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.035,
    16
  );
  const knob_collar = new THREE.Mesh(knob_collarGeom, aged_brassMat);
  knob_collar.rotation.x = Math.PI / 2;
  knob_collar.position.set(-0.33, 0.79, 0.472);
  root.add(knob_collar);

  const knob_stemGeom = new THREE.CylinderGeometry(
    0.021,
    0.025,
    0.08,
    16
  );
  const knob_stem = new THREE.Mesh(knob_stemGeom, polished_brassMat);
  knob_stem.rotation.x = Math.PI / 2;
  knob_stem.position.set(-0.33, 0.79, 0.515);
  root.add(knob_stem);

  const knobGeom = new THREE.SphereGeometry(0.068, 20, 14);
  const knob = new THREE.Mesh(knobGeom, polished_brassMat);
  knob.scale.set(1, 1, 0.9);
  knob.position.set(-0.33, 0.79, 0.58);
  root.add(knob);

  const right_side_front_ornament = makeTube(
    [
      new THREE.Vector3(0.544, 0.34, 0.235),
      new THREE.Vector3(0.544, 0.43, 0.265),
      new THREE.Vector3(0.544, 0.52, 0.22),
      new THREE.Vector3(0.544, 0.61, 0.255),
      new THREE.Vector3(0.544, 0.7, 0.22),
    ],
    0.007,
    aged_brassMat,
    24
  );
  root.add(right_side_front_ornament);

  const right_side_rear_ornament = makeTube(
    [
      new THREE.Vector3(0.544, 0.34, -0.245),
      new THREE.Vector3(0.544, 0.43, -0.215),
      new THREE.Vector3(0.544, 0.52, -0.26),
      new THREE.Vector3(0.544, 0.61, -0.225),
      new THREE.Vector3(0.544, 0.7, -0.26),
    ],
    0.007,
    aged_brassMat,
    24
  );
  root.add(right_side_rear_ornament);

  const right_side_upper_ornament = makeTube(
    [
      new THREE.Vector3(0.544, 1.08, 0.24),
      new THREE.Vector3(0.544, 1.17, 0.21),
      new THREE.Vector3(0.544, 1.27, 0.255),
      new THREE.Vector3(0.544, 1.35, 0.22),
    ],
    0.007,
    aged_brassMat,
    20
  );
  root.add(right_side_upper_ornament);

  const right_side_lower_scroll = makeTube(
    [
      new THREE.Vector3(0.548, 0.5, 0.22),
      new THREE.Vector3(0.548, 0.56, 0.17),
      new THREE.Vector3(0.548, 0.63, 0.21),
      new THREE.Vector3(0.548, 0.6, 0.27),
      new THREE.Vector3(0.548, 0.54, 0.28),
    ],
    0.009,
    aged_brassMat,
    24
  );
  root.add(right_side_lower_scroll);

  const right_side_lower_scroll_tip = makeTube(
    [
      new THREE.Vector3(0.548, 0.54, 0.28),
      new THREE.Vector3(0.548, 0.57, 0.31),
      new THREE.Vector3(0.548, 0.62, 0.3),
      new THREE.Vector3(0.548, 0.64, 0.265),
    ],
    0.006,
    polished_brassMat,
    18
  );
  root.add(right_side_lower_scroll_tip);

  const right_side_upper_scroll = makeTube(
    [
      new THREE.Vector3(0.548, 1.12, 0.235),
      new THREE.Vector3(0.548, 1.18, 0.19),
      new THREE.Vector3(0.548, 1.24, 0.225),
      new THREE.Vector3(0.548, 1.22, 0.275),
      new THREE.Vector3(0.548, 1.17, 0.275),
    ],
    0.007,
    aged_brassMat,
    22
  );
  root.add(right_side_upper_scroll);

  const right_side_leaf_reliefsGeom = new THREE.SphereGeometry(
    1,
    14,
    8
  );
  const right_side_leaf_reliefs = new THREE.InstancedMesh(
    right_side_leaf_reliefsGeom,
    aged_brassMat,
    6
  );
  const side_leaf_data = [
    [0.55, 0.58, 0.19, 0.012, 0.055, 0.024, -0.55],
    [0.55, 0.64, 0.255, 0.012, 0.05, 0.022, 0.65],
    [0.55, 0.49, 0.275, 0.011, 0.043, 0.02, 0.9],
    [0.55, 1.17, 0.205, 0.011, 0.047, 0.021, -0.65],
    [0.55, 1.24, 0.255, 0.011, 0.045, 0.02, 0.7],
    [0.55, 1.1, 0.26, 0.011, 0.04, 0.018, 1.0],
  ];
  for (let i = 0; i < side_leaf_data.length; i++) {
    const d = side_leaf_data[i];
    post_dummy.position.set(d[0], d[1], d[2]);
    post_dummy.rotation.set(d[6], 0, 0);
    post_dummy.scale.set(d[3], d[4], d[5]);
    post_dummy.updateMatrix();
    right_side_leaf_reliefs.setMatrixAt(i, post_dummy.matrix);
  }
  right_side_leaf_reliefs.instanceMatrix.needsUpdate = true;
  root.add(right_side_leaf_reliefs);

  fitToUnitCube(THREE, root);
  return root;

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
}