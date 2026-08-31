export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_trestle_table";

  const tabletop_group = new THREE.Group();
  tabletop_group.name = "tabletop_group";
  root.add(tabletop_group);

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const tabletop_mat = new THREE.MeshStandardMaterial({
    color: 0x8b5338,
    metalness: 0.0,
    roughness: 0.6,
  });
  const frame_mat = new THREE.MeshStandardMaterial({
    color: 0x6e351f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const edge_mat = new THREE.MeshStandardMaterial({
    color: 0x7d4027,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grain_mat = new THREE.MeshStandardMaterial({
    color: 0x4b2418,
    metalness: 0.0,
    roughness: 0.6,
  });
  const metal_bracket_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const instance_dummy = new THREE.Object3D();

  function set_instance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  function make_rounded_rectangle(width, depth, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function make_tapered_leg_geometry(length, top_width, bottom_width, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-bottom_width / 2, -length / 2);
    shape.lineTo(bottom_width / 2, -length / 2);
    shape.lineTo(top_width / 2, length / 2);
    shape.lineTo(-top_width / 2, length / 2);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function make_curved_foot_geometry(length, width, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(-length / 2 + 0.07, -width * 0.46);
    shape.quadraticCurveTo(
      -length / 2,
      -width * 0.48,
      -length / 2,
      -width * 0.08
    );
    shape.quadraticCurveTo(
      -length / 2,
      width * 0.38,
      -length / 2 + 0.065,
      width * 0.47
    );
    shape.lineTo(length / 2, width / 2);
    shape.lineTo(length / 2, -width / 2);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const tabletop_shape = make_rounded_rectangle(2.55, 1.45, 0.075);
  const tabletop_geom = new THREE.ExtrudeGeometry(tabletop_shape, {
    depth: 0.09,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 8,
  });
  tabletop_geom.translate(0, 0, -0.045);

  const tabletop = new THREE.Mesh(tabletop_geom, tabletop_mat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = Math.PI / 2;
  tabletop.position.y = 1.5;
  tabletop_group.add(tabletop);

  const tabletop_front_edge_geom = new THREE.CylinderGeometry(
    0.042,
    0.042,
    2.49,
    20
  );
  const tabletop_front_edge = new THREE.Mesh(
    tabletop_front_edge_geom,
    edge_mat
  );
  tabletop_front_edge.name = "tabletop_front_edge";
  tabletop_front_edge.rotation.z = Math.PI / 2;
  tabletop_front_edge.position.set(0, 1.478, 0.735);
  tabletop_group.add(tabletop_front_edge);

  const tabletop_back_edge = new THREE.Mesh(
    tabletop_front_edge_geom,
    edge_mat
  );
  tabletop_back_edge.name = "tabletop_back_edge";
  tabletop_back_edge.rotation.z = Math.PI / 2;
  tabletop_back_edge.position.set(0, 1.478, -0.735);
  tabletop_group.add(tabletop_back_edge);

  const tabletop_side_edge_geom = new THREE.CylinderGeometry(
    0.042,
    0.042,
    1.39,
    20
  );
  const tabletop_left_edge = new THREE.Mesh(
    tabletop_side_edge_geom,
    edge_mat
  );
  tabletop_left_edge.name = "tabletop_left_edge";
  tabletop_left_edge.rotation.x = Math.PI / 2;
  tabletop_left_edge.position.set(-1.275, 1.478, 0);
  tabletop_group.add(tabletop_left_edge);

  const tabletop_right_edge = new THREE.Mesh(
    tabletop_side_edge_geom,
    edge_mat
  );
  tabletop_right_edge.name = "tabletop_right_edge";
  tabletop_right_edge.rotation.x = Math.PI / 2;
  tabletop_right_edge.position.set(1.275, 1.478, 0);
  tabletop_group.add(tabletop_right_edge);

  const tabletop_grain_geom = new THREE.BoxGeometry(1, 0.004, 0.012);
  const tabletop_grain = new THREE.InstancedMesh(
    tabletop_grain_geom,
    grain_mat,
    18
  );
  tabletop_grain.name = "tabletop_grain";
  for (let i = 0; i < 18; i++) {
    const z = -0.61 + i * 0.071;
    const x = Math.sin(i * 1.73) * 0.27;
    const length = 1.55 + (i % 5) * 0.13;
    const width_scale = 0.55 + (i % 3) * 0.25;
    set_instance(
      tabletop_grain,
      i,
      x,
      1.552,
      z,
      0,
      0,
      0,
      length,
      1,
      width_scale
    );
  }
  tabletop_grain.instanceMatrix.needsUpdate = true;
  tabletop_group.add(tabletop_grain);

  const front_apron_shape = new THREE.Shape();
  front_apron_shape.moveTo(-1.12, -0.1);
  front_apron_shape.lineTo(1.12, -0.1);
  front_apron_shape.lineTo(1.19, 0.1);
  front_apron_shape.lineTo(-1.19, 0.1);
  front_apron_shape.closePath();

  const front_apron_geom = new THREE.ExtrudeGeometry(front_apron_shape, {
    depth: 0.1,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  front_apron_geom.translate(0, 0, -0.05);

  const front_apron = new THREE.Mesh(front_apron_geom, frame_mat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 1.29, 0.58);
  frame_group.add(front_apron);

  const back_apron = new THREE.Mesh(front_apron_geom, frame_mat);
  back_apron.name = "back_apron";
  back_apron.position.set(0, 1.29, -0.58);
  frame_group.add(back_apron);

  const side_apron_geom = new THREE.BoxGeometry(0.12, 0.2, 1.04);
  const left_side_apron = new THREE.Mesh(side_apron_geom, frame_mat);
  left_side_apron.name = "left_side_apron";
  left_side_apron.position.set(-1.08, 1.35, 0);
  frame_group.add(left_side_apron);

  const right_side_apron = new THREE.Mesh(side_apron_geom, frame_mat);
  right_side_apron.name = "right_side_apron";
  right_side_apron.position.set(1.08, 1.35, 0);
  frame_group.add(right_side_apron);

  const upper_crossrail_geom = new THREE.BoxGeometry(0.24, 0.13, 1.08);
  const upper_crossrails = new THREE.InstancedMesh(
    upper_crossrail_geom,
    frame_mat,
    2
  );
  upper_crossrails.name = "upper_crossrails";
  set_instance(upper_crossrails, 0, -0.82, 1.31, 0, 0, 0, 0, 1, 1, 1);
  set_instance(upper_crossrails, 1, 0.82, 1.31, 0, 0, 0, 0, 1, 1, 1);
  upper_crossrails.instanceMatrix.needsUpdate = true;
  frame_group.add(upper_crossrails);

  const trestle_leg_geom = make_tapered_leg_geometry(1.08, 0.16, 0.24, 0.22);
  const trestle_legs = new THREE.InstancedMesh(
    trestle_leg_geom,
    frame_mat,
    4
  );
  trestle_legs.name = "trestle_legs";

  let leg_index = 0;
  for (const x of [-0.82, 0.82]) {
    for (const side of [-1, 1]) {
      set_instance(
        trestle_legs,
        leg_index,
        x,
        0.72,
        side * 0.31,
        -side * 0.23,
        0,
        0,
        1,
        1,
        1
      );
      leg_index++;
    }
  }
  trestle_legs.instanceMatrix.needsUpdate = true;
  frame_group.add(trestle_legs);

  const trestle_foot_geom = make_curved_foot_geometry(1.5, 0.22, 0.26);
  const trestle_feet = new THREE.InstancedMesh(
    trestle_foot_geom,
    frame_mat,
    2
  );
  trestle_feet.name = "trestle_feet";
  set_instance(
    trestle_feet,
    0,
    -0.82,
    0.145,
    0,
    0,
    Math.PI / 2,
    0,
    1,
    1,
    1
  );
  set_instance(
    trestle_feet,
    1,
    0.82,
    0.145,
    0,
    0,
    Math.PI / 2,
    0,
    1,
    1,
    1
  );
  trestle_feet.instanceMatrix.needsUpdate = true;
  frame_group.add(trestle_feet);

  const lower_crossrail_geom = new THREE.BoxGeometry(0.22, 0.16, 1.12);
  const lower_crossrails = new THREE.InstancedMesh(
    lower_crossrail_geom,
    frame_mat,
    2
  );
  lower_crossrails.name = "lower_crossrails";
  set_instance(lower_crossrails, 0, -0.82, 0.36, 0, 0, 0, 0, 1, 1, 1);
  set_instance(lower_crossrails, 1, 0.82, 0.36, 0, 0, 0, 0, 1, 1, 1);
  lower_crossrails.instanceMatrix.needsUpdate = true;
  frame_group.add(lower_crossrails);

  const long_stretcher_geom = new THREE.BoxGeometry(1.72, 0.17, 0.18);
  const long_stretcher = new THREE.Mesh(long_stretcher_geom, frame_mat);
  long_stretcher.name = "long_stretcher";
  long_stretcher.position.set(0, 0.36, 0.16);
  frame_group.add(long_stretcher);

  const metal_bracket_geom = new THREE.BoxGeometry(0.035, 0.22, 0.035);
  const metal_brackets = new THREE.InstancedMesh(
    metal_bracket_geom,
    metal_bracket_mat,
    2
  );
  metal_brackets.name = "metal_brackets";
  set_instance(
    metal_brackets,
    0,
    -0.62,
    1.27,
    0.645,
    0,
    0,
    -0.12,
    1,
    1,
    1
  );
  set_instance(
    metal_brackets,
    1,
    0.62,
    1.27,
    0.645,
    0,
    0,
    0.12,
    1,
    1,
    1
  );
  metal_brackets.instanceMatrix.needsUpdate = true;
  frame_group.add(metal_brackets);

  const apron_grain_geom = new THREE.BoxGeometry(1, 0.007, 0.006);
  const apron_grain = new THREE.InstancedMesh(
    apron_grain_geom,
    grain_mat,
    6
  );
  apron_grain.name = "apron_grain";
  for (let i = 0; i < 6; i++) {
    const length = 1.45 + (i % 3) * 0.22;
    const x = Math.sin(i * 1.4) * 0.18;
    set_instance(
      apron_grain,
      i,
      x,
      1.22 + i * 0.029,
      0.647,
      0,
      0,
      0,
      length,
      1,
      1
    );
  }
  apron_grain.instanceMatrix.needsUpdate = true;
  frame_group.add(apron_grain);

  const apron_knot_geom = new THREE.TorusGeometry(0.038, 0.007, 8, 20);
  const apron_knots = new THREE.InstancedMesh(
    apron_knot_geom,
    grain_mat,
    2
  );
  apron_knots.name = "apron_knots";
  set_instance(
    apron_knots,
    0,
    -0.5,
    1.3,
    0.652,
    0,
    0,
    0,
    1.7,
    0.8,
    1
  );
  set_instance(
    apron_knots,
    1,
    0.43,
    1.32,
    0.652,
    0,
    0,
    0,
    1.9,
    0.85,
    1
  );
  apron_knots.instanceMatrix.needsUpdate = true;
  frame_group.add(apron_knots);

  const apron_knot_center_geom = new THREE.CircleGeometry(0.018, 16);
  const apron_knot_centers = new THREE.InstancedMesh(
    apron_knot_center_geom,
    grain_mat,
    2
  );
  apron_knot_centers.name = "apron_knot_centers";
  set_instance(
    apron_knot_centers,
    0,
    -0.5,
    1.3,
    0.653,
    0,
    0,
    0,
    1.5,
    0.75,
    1
  );
  set_instance(
    apron_knot_centers,
    1,
    0.43,
    1.32,
    0.653,
    0,
    0,
    0,
    1.7,
    0.8,
    1
  );
  apron_knot_centers.instanceMatrix.needsUpdate = true;
  frame_group.add(apron_knot_centers);

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

  fitToUnitCube(root);
  return root;
}