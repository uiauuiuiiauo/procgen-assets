export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "oak_display_cabinet";

  const oakMat = new THREE.MeshStandardMaterial({
    color: 0xc9ad87,
    metalness: 0.0,
    roughness: 0.6,
  });
  const oakEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xb99670,
    metalness: 0.0,
    roughness: 0.6,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x76583f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x302219,
    metalness: 0.0,
    roughness: 0.7,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc7a54b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const lower_glass_panelsMat = new THREE.MeshPhysicalMaterial({
    color: 0xa99b8b,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
  });

  const cabinetW = 1.0;
  const cabinetD = 0.56;
  const postX = 0.455;
  const postW = 0.09;
  const postD = 0.52;
  const postBottom = 0.18;
  const postTop = 1.98;
  const postH = postTop - postBottom;
  const frontZ = 0.255;

  const side_panelGeom = new THREE.BoxGeometry(0.035, 1.68, 0.45);

  const left_side_panel = new THREE.Mesh(side_panelGeom, oakMat);
  left_side_panel.position.set(-0.4275, 1.10, -0.01);
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, oakMat);
  right_side_panel.position.set(0.4275, 1.10, -0.01);
  root.add(right_side_panel);

  const back_panelGeom = new THREE.BoxGeometry(0.83, 1.68, 0.028);
  const back_panel = new THREE.Mesh(back_panelGeom, interiorMat);
  back_panel.position.set(0, 1.10, -0.266);
  root.add(back_panel);

  const front_postsGeom = new THREE.BoxGeometry(postW, postH, postD);

  const left_front_post = new THREE.Mesh(front_postsGeom, oakMat);
  left_front_post.position.set(-postX, postBottom + postH / 2, 0);
  root.add(left_front_post);

  const right_front_post = new THREE.Mesh(front_postsGeom, oakMat);
  right_front_post.position.set(postX, postBottom + postH / 2, 0);
  root.add(right_front_post);

  const upper_headerGeom = new THREE.BoxGeometry(0.82, 0.14, 0.08);
  const upper_header = new THREE.Mesh(upper_headerGeom, oakMat);
  upper_header.position.set(0, 1.91, frontZ);
  root.add(upper_header);

  const top_crownGeom = new THREE.BoxGeometry(1.08, 0.07, 0.62);
  const top_crown = new THREE.Mesh(top_crownGeom, oakMat);
  top_crown.position.set(0, 2.035, 0);
  root.add(top_crown);

  const top_front_lipGeom = new THREE.BoxGeometry(1.12, 0.055, 0.055);
  const top_front_lip = new THREE.Mesh(top_front_lipGeom, oakEdgeMat);
  top_front_lip.position.set(0, 1.995, 0.3125);
  root.add(top_front_lip);

  const top_side_lipsGeom = new THREE.BoxGeometry(0.045, 0.055, 0.56);

  const left_top_side_lip = new THREE.Mesh(top_side_lipsGeom, oakEdgeMat);
  left_top_side_lip.position.set(-0.5375, 1.995, 0);
  root.add(left_top_side_lip);

  const right_top_side_lip = new THREE.Mesh(top_side_lipsGeom, oakEdgeMat);
  right_top_side_lip.position.set(0.5375, 1.995, 0);
  root.add(right_top_side_lip);

  const upper_interior_railGeom = new THREE.BoxGeometry(0.81, 0.025, 0.045);
  const upper_interior_rail = new THREE.Mesh(
    upper_interior_railGeom,
    oakEdgeMat
  );
  upper_interior_rail.position.set(0, 1.835, 0.2525);
  root.add(upper_interior_rail);

  const upper_shelvesGeom = new THREE.BoxGeometry(0.81, 0.035, 0.50);

  const upper_shelf = new THREE.Mesh(upper_shelvesGeom, oakMat);
  upper_shelf.position.set(0, 1.49, 0.01);
  root.add(upper_shelf);

  const middle_shelf = new THREE.Mesh(upper_shelvesGeom, oakMat);
  middle_shelf.position.set(0, 1.03, 0.01);
  root.add(middle_shelf);

  const upper_shelf_nosesGeom = new THREE.BoxGeometry(0.81, 0.045, 0.035);

  const upper_shelf_nose = new THREE.Mesh(
    upper_shelf_nosesGeom,
    oakEdgeMat
  );
  upper_shelf_nose.position.set(0, 1.485, 0.2675);
  root.add(upper_shelf_nose);

  const middle_shelf_nose = new THREE.Mesh(
    upper_shelf_nosesGeom,
    oakEdgeMat
  );
  middle_shelf_nose.position.set(0, 1.025, 0.2675);
  root.add(middle_shelf_nose);

  const upper_shelf_supportsGeom = new THREE.BoxGeometry(
    0.025,
    0.022,
    0.05
  );
  const upper_shelf_supports = new THREE.InstancedMesh(
    upper_shelf_supportsGeom,
    oakEdgeMat,
    8
  );
  const support_dummy = new THREE.Object3D();
  const support_positions = [
    [-0.37, 1.466, 0.20],
    [0.37, 1.466, 0.20],
    [-0.37, 1.466, -0.18],
    [0.37, 1.466, -0.18],
    [-0.37, 1.006, 0.20],
    [0.37, 1.006, 0.20],
    [-0.37, 1.006, -0.18],
    [0.37, 1.006, -0.18],
  ];
  for (let i = 0; i < support_positions.length; i++) {
    const position = support_positions[i];
    support_dummy.position.set(position[0], position[1], position[2]);
    support_dummy.rotation.set(0, 0, 0);
    support_dummy.updateMatrix();
    upper_shelf_supports.setMatrixAt(i, support_dummy.matrix);
  }
  upper_shelf_supports.instanceMatrix.needsUpdate = true;
  root.add(upper_shelf_supports);

  const shelf_pin_holesGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    0.004,
    8
  );
  const shelf_pin_holes = new THREE.InstancedMesh(
    shelf_pin_holesGeom,
    seamMat,
    30
  );
  const hole_dummy = new THREE.Object3D();
  let hole_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 15; i++) {
      hole_dummy.position.set(side * 0.404, 0.72 + i * 0.075, -0.19);
      hole_dummy.rotation.set(0, 0, Math.PI / 2);
      hole_dummy.updateMatrix();
      shelf_pin_holes.setMatrixAt(hole_index, hole_dummy.matrix);
      hole_index++;
    }
  }
  shelf_pin_holes.instanceMatrix.needsUpdate = true;
  root.add(shelf_pin_holes);

  const lower_divider_shelfGeom = new THREE.BoxGeometry(
    0.81,
    0.045,
    0.50
  );
  const lower_divider_shelf = new THREE.Mesh(
    lower_divider_shelfGeom,
    oakMat
  );
  lower_divider_shelf.position.set(0, 0.69, 0.01);
  root.add(lower_divider_shelf);

  const lower_divider_fasciaGeom = new THREE.BoxGeometry(
    0.81,
    0.055,
    0.04
  );
  const lower_divider_fascia = new THREE.Mesh(
    lower_divider_fasciaGeom,
    oakEdgeMat
  );
  lower_divider_fascia.position.set(0, 0.685, 0.265);
  root.add(lower_divider_fascia);

  const lower_cabinet_backGeom = new THREE.BoxGeometry(
    0.375,
    0.39,
    0.025
  );

  const lower_left_cabinet_back = new THREE.Mesh(
    lower_cabinet_backGeom,
    interiorMat
  );
  lower_left_cabinet_back.position.set(-0.2025, 0.45, -0.264);
  root.add(lower_left_cabinet_back);

  const lower_right_cabinet_back = new THREE.Mesh(
    lower_cabinet_backGeom,
    interiorMat
  );
  lower_right_cabinet_back.position.set(0.2025, 0.45, -0.264);
  root.add(lower_right_cabinet_back);

  const lower_door_framesGeom = new THREE.BoxGeometry(0.39, 0.48, 0.04);

  const lower_left_door_frame = new THREE.Mesh(
    lower_door_framesGeom,
    oakMat
  );
  lower_left_door_frame.position.set(-0.205, 0.45, 0.275);
  root.add(lower_left_door_frame);

  const lower_right_door_frame = new THREE.Mesh(
    lower_door_framesGeom,
    oakMat
  );
  lower_right_door_frame.position.set(0.205, 0.45, 0.275);
  root.add(lower_right_door_frame);

  const lower_glass_panelsGeom = new THREE.BoxGeometry(
    0.30,
    0.31,
    0.008
  );
  const lower_glass_panels = new THREE.InstancedMesh(
    lower_glass_panelsGeom,
    lower_glass_panelsMat,
    2
  );
  const glass_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    glass_dummy.position.set(i === 0 ? -0.205 : 0.205, 0.45, 0.301);
    glass_dummy.rotation.set(0, 0, 0);
    glass_dummy.updateMatrix();
    lower_glass_panels.setMatrixAt(i, glass_dummy.matrix);
  }
  lower_glass_panels.instanceMatrix.needsUpdate = true;
  root.add(lower_glass_panels);

  const lower_door_center_seamGeom = new THREE.BoxGeometry(
    0.008,
    0.47,
    0.008
  );
  const lower_door_center_seam = new THREE.Mesh(
    lower_door_center_seamGeom,
    seamMat
  );
  lower_door_center_seam.position.set(0, 0.45, 0.307);
  root.add(lower_door_center_seam);

  const lower_door_top_seamGeom = new THREE.BoxGeometry(
    0.80,
    0.007,
    0.008
  );
  const lower_door_top_seam = new THREE.Mesh(
    lower_door_top_seamGeom,
    seamMat
  );
  lower_door_top_seam.position.set(0, 0.692, 0.299);
  root.add(lower_door_top_seam);

  const lower_door_bottom_seam = new THREE.Mesh(
    lower_door_top_seamGeom,
    seamMat
  );
  lower_door_bottom_seam.position.set(0, 0.208, 0.299);
  root.add(lower_door_bottom_seam);

  const bottom_shelfGeom = new THREE.BoxGeometry(0.37, 0.035, 0.45);

  const lower_left_bottom_shelf = new THREE.Mesh(bottom_shelfGeom, oakMat);
  lower_left_bottom_shelf.position.set(-0.205, 0.225, 0.005);
  root.add(lower_left_bottom_shelf);

  const lower_right_bottom_shelf = new THREE.Mesh(bottom_shelfGeom, oakMat);
  lower_right_bottom_shelf.position.set(0.205, 0.225, 0.005);
  root.add(lower_right_bottom_shelf);

  const base_plinthGeom = new THREE.BoxGeometry(0.92, 0.14, 0.52);
  const base_plinth = new THREE.Mesh(base_plinthGeom, oakMat);
  base_plinth.position.set(0, 0.15, 0);
  root.add(base_plinth);

  const base_front_railGeom = new THREE.BoxGeometry(0.92, 0.13, 0.055);
  const base_front_rail = new THREE.Mesh(base_front_railGeom, oakEdgeMat);
  base_front_rail.position.set(0, 0.145, 0.2775);
  root.add(base_front_rail);

  const cabinet_feetGeom = new THREE.BoxGeometry(0.13, 0.22, 0.13);
  const cabinet_feet = new THREE.InstancedMesh(
    cabinet_feetGeom,
    oakMat,
    4
  );
  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-0.435, 0.11, 0.225],
    [0.435, 0.11, 0.225],
    [-0.435, 0.11, -0.225],
    [0.435, 0.11, -0.225],
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    const position = foot_positions[i];
    foot_dummy.position.set(position[0], position[1], position[2]);
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.updateMatrix();
    cabinet_feet.setMatrixAt(i, foot_dummy.matrix);
  }
  cabinet_feet.instanceMatrix.needsUpdate = true;
  root.add(cabinet_feet);

  const right_side_inset_verticalsGeom = new THREE.BoxGeometry(
    0.012,
    1.55,
    0.025
  );
  const right_side_inset_verticals = new THREE.InstancedMesh(
    right_side_inset_verticalsGeom,
    oakEdgeMat,
    2
  );
  const side_vertical_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    side_vertical_dummy.position.set(
      0.449,
      1.10,
      i === 0 ? -0.205 : 0.185
    );
    side_vertical_dummy.rotation.set(0, 0, 0);
    side_vertical_dummy.updateMatrix();
    right_side_inset_verticals.setMatrixAt(i, side_vertical_dummy.matrix);
  }
  right_side_inset_verticals.instanceMatrix.needsUpdate = true;
  root.add(right_side_inset_verticals);

  const right_side_inset_horizontalsGeom = new THREE.BoxGeometry(
    0.012,
    0.025,
    0.415
  );
  const right_side_inset_horizontals = new THREE.InstancedMesh(
    right_side_inset_horizontalsGeom,
    oakEdgeMat,
    2
  );
  const side_horizontal_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    side_horizontal_dummy.position.set(
      0.449,
      i === 0 ? 0.32 : 1.88,
      -0.01
    );
    side_horizontal_dummy.rotation.set(0, 0, 0);
    side_horizontal_dummy.updateMatrix();
    right_side_inset_horizontals.setMatrixAt(
      i,
      side_horizontal_dummy.matrix
    );
  }
  right_side_inset_horizontals.instanceMatrix.needsUpdate = true;
  root.add(right_side_inset_horizontals);

  const upper_handle_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.105, 0),
      new THREE.Vector3(0.030, 0.075, 0),
      new THREE.Vector3(0.040, 0, 0),
      new THREE.Vector3(0.030, -0.075, 0),
      new THREE.Vector3(0, -0.105, 0),
    ],
    false,
    "centripetal"
  );
  const upper_door_handlesGeom = new THREE.TubeGeometry(
    upper_handle_curve,
    24,
    0.009,
    8,
    false
  );
  const upper_door_handles = new THREE.InstancedMesh(
    upper_door_handlesGeom,
    brassMat,
    2
  );
  const upper_handle_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    upper_handle_dummy.position.set(
      i === 0 ? -0.405 : 0.405,
      1.16,
      0.31
    );
    upper_handle_dummy.rotation.set(0, 0, 0);
    upper_handle_dummy.updateMatrix();
    upper_door_handles.setMatrixAt(i, upper_handle_dummy.matrix);
  }
  upper_door_handles.instanceMatrix.needsUpdate = true;
  root.add(upper_door_handles);

  const upper_handle_mountsGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.012,
    16
  );
  const upper_handle_mounts = new THREE.InstancedMesh(
    upper_handle_mountsGeom,
    brassMat,
    4
  );
  const upper_mount_dummy = new THREE.Object3D();
  const upper_mount_positions = [
    [-0.405, 1.265, 0.302],
    [-0.405, 1.055, 0.302],
    [0.405, 1.265, 0.302],
    [0.405, 1.055, 0.302],
  ];
  for (let i = 0; i < upper_mount_positions.length; i++) {
    const position = upper_mount_positions[i];
    upper_mount_dummy.position.set(position[0], position[1], position[2]);
    upper_mount_dummy.rotation.set(Math.PI / 2, 0, 0);
    upper_mount_dummy.updateMatrix();
    upper_handle_mounts.setMatrixAt(i, upper_mount_dummy.matrix);
  }
  upper_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(upper_handle_mounts);

  const lower_door_knobsGeom = new THREE.SphereGeometry(0.022, 16, 10);
  const lower_door_knobs = new THREE.InstancedMesh(
    lower_door_knobsGeom,
    brassMat,
    2
  );
  const knob_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    knob_dummy.position.set(i === 0 ? -0.045 : 0.045, 0.585, 0.326);
    knob_dummy.rotation.set(0, 0, 0);
    knob_dummy.updateMatrix();
    lower_door_knobs.setMatrixAt(i, knob_dummy.matrix);
  }
  lower_door_knobs.instanceMatrix.needsUpdate = true;
  root.add(lower_door_knobs);

  const lower_door_knob_stemsGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.025,
    12
  );
  const lower_door_knob_stems = new THREE.InstancedMesh(
    lower_door_knob_stemsGeom,
    brassMat,
    2
  );
  const knob_stem_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    knob_stem_dummy.position.set(
      i === 0 ? -0.045 : 0.045,
      0.585,
      0.312
    );
    knob_stem_dummy.rotation.set(Math.PI / 2, 0, 0);
    knob_stem_dummy.updateMatrix();
    lower_door_knob_stems.setMatrixAt(i, knob_stem_dummy.matrix);
  }
  lower_door_knob_stems.instanceMatrix.needsUpdate = true;
  root.add(lower_door_knob_stems);

  const lower_pull_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.085, 0),
      new THREE.Vector3(0.018, 0.055, 0.008),
      new THREE.Vector3(-0.012, 0.015, 0.012),
      new THREE.Vector3(0.018, -0.035, 0.008),
      new THREE.Vector3(-0.008, -0.085, 0),
    ],
    false,
    "centripetal"
  );
  const lower_door_pullGeom = new THREE.TubeGeometry(
    lower_pull_curve,
    24,
    0.007,
    8,
    false
  );
  const lower_door_pull = new THREE.Mesh(lower_door_pullGeom, brassMat);
  lower_door_pull.position.set(0.035, 0.405, 0.332);
  root.add(lower_door_pull);

  const lower_pull_mountsGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.012,
    14
  );
  const lower_pull_mounts = new THREE.InstancedMesh(
    lower_pull_mountsGeom,
    brassMat,
    2
  );
  const lower_mount_dummy = new THREE.Object3D();
  const lower_mount_positions = [
    [0.035, 0.49, 0.321],
    [0.027, 0.32, 0.321],
  ];
  for (let i = 0; i < lower_mount_positions.length; i++) {
    const position = lower_mount_positions[i];
    lower_mount_dummy.position.set(position[0], position[1], position[2]);
    lower_mount_dummy.rotation.set(Math.PI / 2, 0, 0);
    lower_mount_dummy.updateMatrix();
    lower_pull_mounts.setMatrixAt(i, lower_mount_dummy.matrix);
  }
  lower_pull_mounts.instanceMatrix.needsUpdate = true;
  root.add(lower_pull_mounts);

  const lower_door_hingesGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.045,
    12
  );
  const lower_door_hinges = new THREE.InstancedMesh(
    lower_door_hingesGeom,
    brassMat,
    4
  );
  const hinge_dummy = new THREE.Object3D();
  const hinge_positions = [
    [-0.397, 0.32, 0.309],
    [-0.397, 0.58, 0.309],
    [0.397, 0.32, 0.309],
    [0.397, 0.58, 0.309],
  ];
  for (let i = 0; i < hinge_positions.length; i++) {
    const position = hinge_positions[i];
    hinge_dummy.position.set(position[0], position[1], position[2]);
    hinge_dummy.rotation.set(0, 0, 0);
    hinge_dummy.updateMatrix();
    lower_door_hinges.setMatrixAt(i, hinge_dummy.matrix);
  }
  lower_door_hinges.instanceMatrix.needsUpdate = true;
  root.add(lower_door_hinges);

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