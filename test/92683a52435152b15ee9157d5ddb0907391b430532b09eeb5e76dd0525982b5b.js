export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_block_tower";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const tower_group = new THREE.Group();
  tower_group.name = "tower_group";
  root.add(tower_group);

  const top_group = new THREE.Group();
  top_group.name = "top_group";
  root.add(top_group);

  const shared_core_geom = new THREE.BoxGeometry(1, 1, 1);

  const base_mat = new THREE.MeshStandardMaterial({
    color: 0x929895,
    metalness: 0.0,
    roughness: 0.3
  });
  const base_light_mat = new THREE.MeshStandardMaterial({
    color: 0xa4aaA7,
    metalness: 0.0,
    roughness: 0.3
  });
  const seam_mat = new THREE.MeshStandardMaterial({
    color: 0x202725,
    metalness: 0.0,
    roughness: 0.8
  });
  const purple_mat = new THREE.MeshStandardMaterial({
    color: 0x3d3b9e,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyan_mat = new THREE.MeshStandardMaterial({
    color: 0x2d9fc5,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_mat = new THREE.MeshStandardMaterial({
    color: 0x087bd9,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_mat = new THREE.MeshStandardMaterial({
    color: 0xdf302a,
    metalness: 0.0,
    roughness: 0.3
  });
  const orange_mat = new THREE.MeshStandardMaterial({
    color: 0xff922f,
    metalness: 0.0,
    roughness: 0.3
  });
  const green_mat = new THREE.MeshStandardMaterial({
    color: 0x08a66b,
    metalness: 0.0,
    roughness: 0.3
  });
  const dark_green_mat = new THREE.MeshStandardMaterial({
    color: 0x087a50,
    metalness: 0.0,
    roughness: 0.3
  });
  const yellow_mat = new THREE.MeshStandardMaterial({
    color: 0xffdd32,
    metalness: 0.0,
    roughness: 0.3
  });
  const top_green_mat = new THREE.MeshStandardMaterial({
    color: 0x079360,
    metalness: 0.0,
    roughness: 0.3
  });
  const top_dark_green_mat = new THREE.MeshStandardMaterial({
    color: 0x075f43,
    metalness: 0.0,
    roughness: 0.3
  });
  const green_stud_mat = new THREE.MeshStandardMaterial({
    color: 0x078d59,
    metalness: 0.0,
    roughness: 0.3
  });

  const purple_panel_mat = new THREE.MeshStandardMaterial({
    color: 0x30328e,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyan_panel_mat = new THREE.MeshStandardMaterial({
    color: 0x238eb1,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_panel_mat = new THREE.MeshStandardMaterial({
    color: 0x066fc1,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_panel_mat = new THREE.MeshStandardMaterial({
    color: 0xc92824,
    metalness: 0.0,
    roughness: 0.3
  });
  const orange_panel_mat = new THREE.MeshStandardMaterial({
    color: 0xe97825,
    metalness: 0.0,
    roughness: 0.3
  });

  const gray_stud_mat = new THREE.MeshStandardMaterial({
    color: 0x777b79,
    metalness: 0.0,
    roughness: 0.3
  });
  const light_gray_stud_mat = new THREE.MeshStandardMaterial({
    color: 0x969997,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_stud_mat = new THREE.MeshStandardMaterial({
    color: 0x1258c7,
    metalness: 0.0,
    roughness: 0.3
  });
  const purple_stud_mat = new THREE.MeshStandardMaterial({
    color: 0x6253a0,
    metalness: 0.0,
    roughness: 0.3
  });

  function create_core(name, width, height, depth, material, x, y, z, parent) {
    const mesh = new THREE.Mesh(shared_core_geom, material);
    mesh.name = name;
    mesh.scale.set(width, height, depth);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function create_instances(name, geometry, material, placements, parent) {
    const mesh = new THREE.InstancedMesh(geometry, material, placements.length);
    mesh.name = name;
    const transform = new THREE.Object3D();

    for (let i = 0; i < placements.length; i++) {
      const placement = placements[i];
      transform.position.set(placement[0], placement[1], placement[2]);
      transform.scale.set(
        placement[3] === undefined ? 1 : placement[3],
        placement[4] === undefined ? 1 : placement[4],
        placement[5] === undefined ? 1 : placement[5]
      );
      transform.rotation.set(
        placement[6] === undefined ? 0 : placement[6],
        placement[7] === undefined ? 0 : placement[7],
        placement[8] === undefined ? 0 : placement[8]
      );
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    parent.add(mesh);
    return mesh;
  }

  const base_slab_geom = new THREE.BoxGeometry(2.05, 0.18, 1.78);
  const base_slab = new THREE.Mesh(base_slab_geom, base_mat);
  base_slab.name = "base_slab";
  base_slab.position.set(0, 0.09, 0);
  base_group.add(base_slab);

  const base_top_tiles = create_instances(
    "base_top_tiles",
    shared_core_geom,
    base_light_mat,
    [
      [-0.505, 0.185, -0.435, 0.99, 0.014, 0.85],
      [0.505, 0.185, -0.435, 0.99, 0.014, 0.85],
      [-0.505, 0.185, 0.435, 0.99, 0.014, 0.85],
      [0.505, 0.185, 0.435, 0.99, 0.014, 0.85]
    ],
    base_group
  );

  const base_long_edge_rims = create_instances(
    "base_long_edge_rims",
    shared_core_geom,
    base_light_mat,
    [
      [0, 0.2, 0.875, 2.05, 0.045, 0.065],
      [0, 0.2, -0.875, 2.05, 0.045, 0.065]
    ],
    base_group
  );

  const base_short_edge_rims = create_instances(
    "base_short_edge_rims",
    shared_core_geom,
    base_light_mat,
    [
      [-0.992, 0.2, 0, 0.065, 0.045, 1.78],
      [0.992, 0.2, 0, 0.065, 0.045, 1.78]
    ],
    base_group
  );

  const base_stud_geom = new THREE.CylinderGeometry(0.105, 0.105, 0.07, 24);
  const base_stud_dimple_geom = new THREE.CylinderGeometry(0.025, 0.025, 0.006, 16);

  const base_gray_stud_placements = [
    [-0.84, 0.235, 0.7, 1, 0.52, 1, 0, 0.15, 0],
    [-0.35, 0.235, 0.8, 1, 0.52, 1, 0, -0.2, 0],
    [0.68, 0.235, 0.76, 1, 0.52, 1, 0, 0.35, 0],
    [0.9, 0.235, 0.45, 1, 0.52, 1, 0, -0.25, 0],
    [0.87, 0.235, -0.52, 1, 0.52, 1, 0, 0.2, 0],
    [-0.86, 0.235, -0.57, 1, 0.52, 1, 0, -0.35, 0]
  ];
  const base_light_gray_stud_placements = [
    [0.28, 0.235, 0.8, 1, 0.52, 1, 0, 0.1, 0],
    [0.53, 0.235, 0.64, 1, 0.52, 1, 0, -0.3, 0],
    [0.78, 0.235, 0.18, 1, 0.52, 1, 0, 0.25, 0],
    [-0.72, 0.235, 0.61, 1, 0.52, 1, 0, -0.1, 0]
  ];
  const base_blue_stud_placements = [
    [-0.62, 0.235, 0.72, 1, 0.52, 1, 0, 0.2, 0],
    [-0.15, 0.235, 0.75, 1, 0.52, 1, 0, -0.25, 0]
  ];
  const base_purple_stud_placements = [
    [0.38, 0.235, 0.52, 1, 0.52, 1, 0, 0.3, 0]
  ];

  const base_gray_studs = create_instances(
    "base_gray_studs",
    base_stud_geom,
    gray_stud_mat,
    base_gray_stud_placements,
    base_group
  );
  const base_light_gray_studs = create_instances(
    "base_light_gray_studs",
    base_stud_geom,
    light_gray_stud_mat,
    base_light_gray_stud_placements,
    base_group
  );
  const base_blue_studs = create_instances(
    "base_blue_studs",
    base_stud_geom,
    blue_stud_mat,
    base_blue_stud_placements,
    base_group
  );
  const base_purple_studs = create_instances(
    "base_purple_studs",
    base_stud_geom,
    purple_stud_mat,
    base_purple_stud_placements,
    base_group
  );

  const all_base_stud_placements = base_gray_stud_placements
    .concat(base_light_gray_stud_placements)
    .concat(base_blue_stud_placements)
    .concat(base_purple_stud_placements);
  const base_stud_dimples = create_instances(
    "base_stud_dimples",
    base_stud_dimple_geom,
    seam_mat,
    all_base_stud_placements.map((placement) => [
      placement[0],
      0.273,
      placement[2],
      1,
      1,
      1,
      placement[6],
      placement[7],
      placement[8]
    ]),
    base_group
  );

  const purple_base_block = create_core(
    "purple_base_block", 1.4, 0.5, 1.24,
    purple_mat, 0, 0.47, 0, tower_group
  );
  const cyan_lower_block = create_core(
    "cyan_lower_block", 1.4, 0.4, 1.24,
    cyan_mat, 0, 0.89, 0, tower_group
  );
  const blue_lower_block = create_core(
    "blue_lower_block", 1.4, 0.46, 1.24,
    blue_mat, 0, 1.3, 0, tower_group
  );
  const red_lower_block = create_core(
    "red_lower_block", 1.4, 0.44, 1.24,
    red_mat, 0, 1.73, 0, tower_group
  );
  const orange_lower_block = create_core(
    "orange_lower_block", 1.4, 0.38, 1.24,
    orange_mat, 0, 2.11, 0, tower_group
  );
  const green_lower_block = create_core(
    "green_lower_block", 1.4, 0.28, 1.24,
    green_mat, 0, 2.43, 0, tower_group
  );
  const yellow_lower_block = create_core(
    "yellow_lower_block", 1.4, 0.4, 1.24,
    yellow_mat, 0, 2.78, 0, tower_group
  );
  const green_middle_block = create_core(
    "green_middle_block", 1.4, 0.42, 1.24,
    green_mat, 0, 3.18, 0, tower_group
  );
  const red_upper_block = create_core(
    "red_upper_block", 1.4, 0.4, 1.24,
    red_mat, 0, 3.57, 0, tower_group
  );
  const yellow_upper_block = create_core(
    "yellow_upper_block", 1.4, 0.4, 1.24,
    yellow_mat, 0, 3.96, 0, tower_group
  );
  const green_top_block = create_core(
    "green_top_block", 1.4, 0.36, 1.24,
    top_green_mat, 0, 4.33, 0, tower_group
  );

  const front_panel_geom = new THREE.BoxGeometry(1, 1, 1);

  const purple_front_panel = create_instances(
    "purple_front_panel",
    front_panel_geom,
    purple_panel_mat,
    [[0, 0.47, 0.626, 1.36, 0.46, 0.018]],
    tower_group
  );
  const cyan_front_panel = create_instances(
    "cyan_front_panel",
    front_panel_geom,
    cyan_panel_mat,
    [[0, 0.89, 0.626, 1.36, 0.36, 0.018]],
    tower_group
  );
  const blue_front_panel = create_instances(
    "blue_front_panel",
    front_panel_geom,
    blue_panel_mat,
    [[0, 1.3, 0.626, 1.36, 0.42, 0.018]],
    tower_group
  );
  const red_front_panel = create_instances(
    "red_front_panel",
    front_panel_geom,
    red_panel_mat,
    [[0, 1.73, 0.626, 1.36, 0.4, 0.018]],
    tower_group
  );
  const orange_front_panel = create_instances(
    "orange_front_panel",
    front_panel_geom,
    orange_panel_mat,
    [[0, 2.11, 0.626, 1.36, 0.34, 0.018]],
    tower_group
  );
  const green_lower_front_panel = create_instances(
    "green_lower_front_panel",
    front_panel_geom,
    green_mat,
    [[0, 2.43, 0.626, 1.36, 0.24, 0.018]],
    tower_group
  );
  const yellow_front_panel = create_instances(
    "yellow_front_panel",
    front_panel_geom,
    yellow_mat,
    [[0, 2.78, 0.626, 1.36, 0.36, 0.018]],
    tower_group
  );
  const green_middle_front_panel = create_instances(
    "green_middle_front_panel",
    front_panel_geom,
    green_mat,
    [[0, 3.18, 0.626, 1.36, 0.38, 0.018]],
    tower_group
  );
  const red_upper_front_panel = create_instances(
    "red_upper_front_panel",
    front_panel_geom,
    red_panel_mat,
    [[0, 3.57, 0.626, 1.36, 0.36, 0.018]],
    tower_group
  );
  const yellow_upper_front_panel = create_instances(
    "yellow_upper_front_panel",
    front_panel_geom,
    yellow_mat,
    [[0, 3.96, 0.626, 1.36, 0.36, 0.018]],
    tower_group
  );
  const green_top_front_panel = create_instances(
    "green_top_front_panel",
    front_panel_geom,
    top_green_mat,
    [[0, 4.33, 0.626, 1.36, 0.32, 0.018]],
    tower_group
  );

  const panel_seam_placements = [];
  const course_data = [
    [0.47, 0.5],
    [0.89, 0.4],
    [1.3, 0.46],
    [1.73, 0.44],
    [2.11, 0.38],
    [2.43, 0.28],
    [2.78, 0.4],
    [3.18, 0.42],
    [3.57, 0.4],
    [3.96, 0.4],
    [4.33, 0.36]
  ];

  for (let i = 0; i < course_data.length - 1; i++) {
    const lower_top = course_data[i][0] + course_data[i][1] * 0.5;
    const upper_bottom = course_data[i + 1][0] - course_data[i + 1][1] * 0.5;
    panel_seam_placements.push([
      0,
      lower_top + (upper_bottom - lower_top) * 0.5,
      0.64,
      1.38,
      0.012,
      0.014
    ]);
  }

  const panel_seams = create_instances(
    "panel_seams",
    shared_core_geom,
    seam_mat,
    panel_seam_placements,
    tower_group
  );

  const divider_placements = [];
  const vertical_divider_courses = [
    [0.47, 0.5],
    [1.3, 0.46],
    [1.73, 0.44],
    [2.11, 0.38],
    [2.43, 0.28],
    [3.57, 0.4],
    [4.33, 0.36]
  ];

  for (let i = 0; i < vertical_divider_courses.length; i++) {
    const y = vertical_divider_courses[i][0];
    const height = vertical_divider_courses[i][1];
    const offset = i % 2 === 0 ? -0.18 : 0.18;
    divider_placements.push([0.31 + offset, y, 0.642, 0.012, height * 0.9, 0.014]);
    divider_placements.push([-(0.31 + offset), y, -0.642, 0.012, height * 0.9, 0.014]);
    divider_placements.push([0.708, y, -0.2, 0.014, height * 0.9, 0.012]);
    divider_placements.push([-0.708, y, 0.2, 0.014, height * 0.9, 0.012]);
  }

  const vertical_block_dividers = create_instances(
    "vertical_block_dividers",
    shared_core_geom,
    seam_mat,
    divider_placements,
    tower_group
  );

  const top_surface_geom = new THREE.BoxGeometry(1.36, 0.025, 1.2);
  const top_surface = new THREE.Mesh(top_surface_geom, top_green_mat);
  top_surface.name = "top_surface";
  top_surface.position.set(0, 4.518, 0);
  top_group.add(top_surface);

  const top_plate_seams = create_instances(
    "top_plate_seams",
    shared_core_geom,
    seam_mat,
    [
      [0, 4.533, 0, 0.012, 0.006, 1.17],
      [0, 4.533, 0, 1.33, 0.006, 0.012]
    ],
    top_group
  );

  const top_stud_geom = new THREE.CylinderGeometry(0.14, 0.14, 0.1, 28);
  const top_stud_dimple_geom = new THREE.CylinderGeometry(0.026, 0.026, 0.006, 16);
  const top_stud_placements = [];

  for (const x of [-0.45, 0, 0.45]) {
    for (const z of [-0.39, 0.39]) {
      top_stud_placements.push([x, 4.585, z]);
    }
  }

  const top_round_studs = create_instances(
    "top_round_studs",
    top_stud_geom,
    green_stud_mat,
    top_stud_placements,
    top_group
  );

  const top_stud_dimples = create_instances(
    "top_stud_dimples",
    top_stud_dimple_geom,
    top_dark_green_mat,
    top_stud_placements.map((placement) => [
      placement[0],
      4.638,
      placement[2]
    ]),
    top_group
  );

  const central_rotor_base_geom = new THREE.CylinderGeometry(0.27, 0.27, 0.055, 32);
  const central_rotor_base = new THREE.Mesh(central_rotor_base_geom, dark_green_mat);
  central_rotor_base.name = "central_rotor_base";
  central_rotor_base.position.set(0, 4.557, 0);
  top_group.add(central_rotor_base);

  const central_rotor_geom = new THREE.CylinderGeometry(0.19, 0.19, 0.13, 32);
  const central_rotor = new THREE.Mesh(central_rotor_geom, top_dark_green_mat);
  central_rotor.name = "central_rotor";
  central_rotor.position.set(0, 4.635, 0);
  top_group.add(central_rotor);

  const central_rotor_cap_geom = new THREE.SphereGeometry(1, 24, 12);
  const central_rotor_cap = new THREE.Mesh(central_rotor_cap_geom, top_dark_green_mat);
  central_rotor_cap.name = "central_rotor_cap";
  central_rotor_cap.scale.set(0.19, 0.025, 0.19);
  central_rotor_cap.position.set(0, 4.702, 0);
  top_group.add(central_rotor_cap);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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