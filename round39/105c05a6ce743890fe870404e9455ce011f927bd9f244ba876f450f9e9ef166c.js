export default function generate(THREE) {
  const cabinet = new THREE.Group();

  const cabinet_width = 0.72;
  const cabinet_depth = 0.50;
  const body_bottom = 0.16;
  const body_top = 1.08;
  const body_height = body_top - body_bottom;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x7b451f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x925326,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4b2815,
    metalness: 0.0,
    roughness: 0.6,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x292725,
    metalness: 0.0,
    roughness: 0.7,
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb4b7b5,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const glassHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xf4f2df,
    transparent: true,
    opacity: 0.13,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const side_panelGeom = new THREE.BoxGeometry(0.06, body_height, 0.48);

  const left_side_panel = new THREE.Mesh(side_panelGeom, woodMat);
  left_side_panel.position.set(-0.33, 0.62, 0);
  cabinet.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, woodMat);
  right_side_panel.position.set(0.33, 0.62, 0);
  cabinet.add(right_side_panel);

  const back_panelGeom = new THREE.BoxGeometry(0.66, body_height, 0.035);
  const back_panel = new THREE.Mesh(back_panelGeom, woodMat);
  back_panel.position.set(0, 0.62, -0.232);
  cabinet.add(back_panel);

  const interior_shadowGeom = new THREE.BoxGeometry(0.57, 0.75, 0.012);
  const interior_shadow = new THREE.Mesh(interior_shadowGeom, interiorMat);
  interior_shadow.position.set(0, 0.61, -0.208);
  cabinet.add(interior_shadow);

  const interior_shelfGeom = new THREE.BoxGeometry(0.56, 0.025, 0.39);

  const lower_shelf = new THREE.Mesh(interior_shelfGeom, woodMat);
  lower_shelf.position.set(0, 0.31, -0.01);
  cabinet.add(lower_shelf);

  const upper_shelf = new THREE.Mesh(interior_shelfGeom, woodMat);
  upper_shelf.position.set(0, 0.72, -0.01);
  cabinet.add(upper_shelf);

  const cabinet_floorGeom = new THREE.BoxGeometry(0.64, 0.05, 0.44);
  const cabinet_floor = new THREE.Mesh(cabinet_floorGeom, woodMat);
  cabinet_floor.position.set(0, 0.185, -0.005);
  cabinet.add(cabinet_floor);

  const cabinet_ceilingGeom = new THREE.BoxGeometry(0.64, 0.045, 0.44);
  const cabinet_ceiling = new THREE.Mesh(cabinet_ceilingGeom, woodMat);
  cabinet_ceiling.position.set(0, 1.045, -0.005);
  cabinet.add(cabinet_ceiling);

  const front_postGeom = new THREE.BoxGeometry(0.055, body_height, 0.055);

  const left_front_post = new THREE.Mesh(front_postGeom, frameMat);
  left_front_post.position.set(-0.327, 0.62, 0.242);
  cabinet.add(left_front_post);

  const right_front_post = new THREE.Mesh(front_postGeom, frameMat);
  right_front_post.position.set(0.327, 0.62, 0.242);
  cabinet.add(right_front_post);

  const base_lower_plinthGeom = new THREE.BoxGeometry(0.80, 0.07, 0.57);
  const base_lower_plinth = new THREE.Mesh(base_lower_plinthGeom, woodMat);
  base_lower_plinth.position.set(0, 0.105, 0);
  cabinet.add(base_lower_plinth);

  const base_upper_plinthGeom = new THREE.BoxGeometry(0.76, 0.07, 0.53);
  const base_upper_plinth = new THREE.Mesh(base_upper_plinthGeom, frameMat);
  base_upper_plinth.position.set(0, 0.155, 0);
  cabinet.add(base_upper_plinth);

  const base_front_moldingGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.78,
    16
  );
  const base_front_molding = new THREE.Mesh(
    base_front_moldingGeom,
    frameMat
  );
  base_front_molding.rotation.z = Math.PI / 2;
  base_front_molding.position.set(0, 0.178, 0.286);
  cabinet.add(base_front_molding);

  const base_side_moldingGeom = new THREE.CylinderGeometry(
    0.016,
    0.016,
    0.54,
    16
  );

  const base_left_molding = new THREE.Mesh(
    base_side_moldingGeom,
    frameMat
  );
  base_left_molding.rotation.x = Math.PI / 2;
  base_left_molding.position.set(-0.386, 0.174, 0);
  cabinet.add(base_left_molding);

  const base_right_molding = new THREE.Mesh(
    base_side_moldingGeom,
    frameMat
  );
  base_right_molding.rotation.x = Math.PI / 2;
  base_right_molding.position.set(0.386, 0.174, 0);
  cabinet.add(base_right_molding);

  const base_front_grooveGeom = new THREE.BoxGeometry(0.73, 0.009, 0.008);
  const base_front_groove = new THREE.Mesh(
    base_front_grooveGeom,
    darkWoodMat
  );
  base_front_groove.position.set(0, 0.112, 0.289);
  cabinet.add(base_front_groove);

  const feetShape = new THREE.Shape();
  feetShape.moveTo(-0.085, 0.075);
  feetShape.lineTo(0.085, 0.075);
  feetShape.lineTo(0.074, 0.035);
  feetShape.bezierCurveTo(0.064, 0.006, 0.043, -0.018, 0.018, -0.037);
  feetShape.lineTo(-0.018, -0.037);
  feetShape.bezierCurveTo(-0.043, -0.018, -0.064, 0.006, -0.074, 0.035);
  feetShape.closePath();

  const feetGeom = new THREE.ExtrudeGeometry(feetShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.007,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  feetGeom.translate(0, 0, -0.065);

  const feet = new THREE.InstancedMesh(feetGeom, woodMat, 4);
  const feet_positions = [
    [-0.285, 0.045, 0.19],
    [0.285, 0.045, 0.19],
    [-0.285, 0.045, -0.19],
    [0.285, 0.045, -0.19],
  ];
  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < feet_positions.length; i++) {
    const position = feet_positions[i];
    instance_dummy.position.set(position[0], position[1], position[2]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    feet.setMatrixAt(i, instance_dummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  cabinet.add(feet);

  const top_lower_crownGeom = new THREE.BoxGeometry(0.76, 0.045, 0.54);
  const top_lower_crown = new THREE.Mesh(top_lower_crownGeom, woodMat);
  top_lower_crown.position.set(0, 1.083, 0);
  cabinet.add(top_lower_crown);

  const top_upper_crownGeom = new THREE.BoxGeometry(0.81, 0.06, 0.58);
  const top_upper_crown = new THREE.Mesh(top_upper_crownGeom, frameMat);
  top_upper_crown.position.set(0, 1.118, 0);
  cabinet.add(top_upper_crown);

  const top_surfaceGeom = new THREE.BoxGeometry(0.76, 0.035, 0.54);
  const top_surface = new THREE.Mesh(top_surfaceGeom, woodMat);
  top_surface.position.set(0, 1.158, -0.005);
  cabinet.add(top_surface);

  const top_front_beadGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.81,
    20
  );
  const top_front_bead = new THREE.Mesh(top_front_beadGeom, frameMat);
  top_front_bead.rotation.z = Math.PI / 2;
  top_front_bead.position.set(0, 1.126, 0.296);
  cabinet.add(top_front_bead);

  const top_side_beadGeom = new THREE.CylinderGeometry(
    0.021,
    0.021,
    0.56,
    20
  );

  const top_left_bead = new THREE.Mesh(top_side_beadGeom, frameMat);
  top_left_bead.rotation.x = Math.PI / 2;
  top_left_bead.position.set(-0.397, 1.126, 0);
  cabinet.add(top_left_bead);

  const top_right_bead = new THREE.Mesh(top_side_beadGeom, frameMat);
  top_right_bead.rotation.x = Math.PI / 2;
  top_right_bead.position.set(0.397, 1.126, 0);
  cabinet.add(top_right_bead);

  const top_front_grooveGeom = new THREE.BoxGeometry(0.73, 0.009, 0.008);
  const top_front_groove = new THREE.Mesh(
    top_front_grooveGeom,
    darkWoodMat
  );
  top_front_groove.position.set(0, 1.087, 0.274);
  cabinet.add(top_front_groove);

  const top_side_grooveGeom = new THREE.BoxGeometry(0.008, 0.009, 0.49);

  const top_left_groove = new THREE.Mesh(top_side_grooveGeom, darkWoodMat);
  top_left_groove.position.set(-0.374, 1.087, 0);
  cabinet.add(top_left_groove);

  const top_right_groove = new THREE.Mesh(top_side_grooveGeom, darkWoodMat);
  top_right_groove.position.set(0.374, 1.087, 0);
  cabinet.add(top_right_groove);

  const door_recessGeom = new THREE.BoxGeometry(0.61, 0.84, 0.012);
  const door_recess = new THREE.Mesh(door_recessGeom, darkWoodMat);
  door_recess.position.set(0, 0.61, 0.267);
  cabinet.add(door_recess);

  const door_glassGeom = new THREE.BoxGeometry(0.46, 0.67, 0.012);
  const door_glass = new THREE.Mesh(door_glassGeom, frostedGlassMat);
  door_glass.position.set(0, 0.61, 0.294);
  cabinet.add(door_glass);

  const door_stileGeom = new THREE.BoxGeometry(0.07, 0.84, 0.055);

  const door_left_stile = new THREE.Mesh(door_stileGeom, frameMat);
  door_left_stile.position.set(-0.265, 0.61, 0.294);
  cabinet.add(door_left_stile);

  const door_right_stile = new THREE.Mesh(door_stileGeom, frameMat);
  door_right_stile.position.set(0.265, 0.61, 0.294);
  cabinet.add(door_right_stile);

  const door_top_railGeom = new THREE.BoxGeometry(0.60, 0.09, 0.055);
  const door_top_rail = new THREE.Mesh(door_top_railGeom, frameMat);
  door_top_rail.position.set(0, 0.975, 0.294);
  cabinet.add(door_top_rail);

  const door_bottom_railGeom = new THREE.BoxGeometry(0.60, 0.09, 0.055);
  const door_bottom_rail = new THREE.Mesh(door_bottom_railGeom, frameMat);
  door_bottom_rail.position.set(0, 0.245, 0.294);
  cabinet.add(door_bottom_rail);

  const glass_bevel_verticalGeom = new THREE.BoxGeometry(
    0.014,
    0.67,
    0.016
  );

  const glass_left_bevel = new THREE.Mesh(
    glass_bevel_verticalGeom,
    darkWoodMat
  );
  glass_left_bevel.position.set(-0.233, 0.61, 0.326);
  cabinet.add(glass_left_bevel);

  const glass_right_bevel = new THREE.Mesh(
    glass_bevel_verticalGeom,
    darkWoodMat
  );
  glass_right_bevel.position.set(0.233, 0.61, 0.326);
  cabinet.add(glass_right_bevel);

  const glass_bevel_horizontalGeom = new THREE.BoxGeometry(
    0.46,
    0.014,
    0.016
  );

  const glass_top_bevel = new THREE.Mesh(
    glass_bevel_horizontalGeom,
    darkWoodMat
  );
  glass_top_bevel.position.set(0, 0.946, 0.326);
  cabinet.add(glass_top_bevel);

  const glass_bottom_bevel = new THREE.Mesh(
    glass_bevel_horizontalGeom,
    darkWoodMat
  );
  glass_bottom_bevel.position.set(0, 0.274, 0.326);
  cabinet.add(glass_bottom_bevel);

  const door_top_shadowGeom = new THREE.BoxGeometry(0.58, 0.012, 0.012);
  const door_top_shadow = new THREE.Mesh(door_top_shadowGeom, darkWoodMat);
  door_top_shadow.position.set(0, 1.026, 0.327);
  cabinet.add(door_top_shadow);

  const door_bottom_shadow = new THREE.Mesh(
    door_top_shadowGeom,
    darkWoodMat
  );
  door_bottom_shadow.position.set(0, 0.194, 0.327);
  cabinet.add(door_bottom_shadow);

  const door_side_shadowGeom = new THREE.BoxGeometry(0.012, 0.81, 0.012);

  const door_left_shadow = new THREE.Mesh(
    door_side_shadowGeom,
    darkWoodMat
  );
  door_left_shadow.position.set(-0.304, 0.61, 0.327);
  cabinet.add(door_left_shadow);

  const door_right_shadow = new THREE.Mesh(
    door_side_shadowGeom,
    darkWoodMat
  );
  door_right_shadow.position.set(0.304, 0.61, 0.327);
  cabinet.add(door_right_shadow);

  const hinge_barrelsGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.075,
    14
  );
  const hinge_barrels = new THREE.InstancedMesh(
    hinge_barrelsGeom,
    hardwareMat,
    2
  );
  const hinge_positions = [
    [-0.314, 0.79, 0.344],
    [-0.314, 0.40, 0.344],
  ];
  for (let i = 0; i < hinge_positions.length; i++) {
    const position = hinge_positions[i];
    instance_dummy.position.set(position[0], position[1], position[2]);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    hinge_barrels.setMatrixAt(i, instance_dummy.matrix);
  }
  hinge_barrels.instanceMatrix.needsUpdate = true;
  cabinet.add(hinge_barrels);

  const hinge_leavesGeom = new THREE.BoxGeometry(0.026, 0.058, 0.01);
  const hinge_leaves = new THREE.InstancedMesh(
    hinge_leavesGeom,
    hardwareMat,
    2
  );
  for (let i = 0; i < hinge_positions.length; i++) {
    const position = hinge_positions[i];
    instance_dummy.position.set(-0.294, position[1], 0.337);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(1, 1, 1);
    instance_dummy.updateMatrix();
    hinge_leaves.setMatrixAt(i, instance_dummy.matrix);
  }
  hinge_leaves.instanceMatrix.needsUpdate = true;
  cabinet.add(hinge_leaves);

  const knob_rosetteGeom = new THREE.TorusGeometry(0.018, 0.004, 8, 20);
  const knob_rosette = new THREE.Mesh(knob_rosetteGeom, hardwareMat);
  knob_rosette.position.set(0.278, 0.59, 0.337);
  cabinet.add(knob_rosette);

  const knob_stemGeom = new THREE.CylinderGeometry(
    0.008,
    0.011,
    0.035,
    14
  );
  const knob_stem = new THREE.Mesh(knob_stemGeom, hardwareMat);
  knob_stem.rotation.x = Math.PI / 2;
  knob_stem.position.set(0.278, 0.59, 0.353);
  cabinet.add(knob_stem);

  const knobGeom = new THREE.SphereGeometry(0.024, 20, 12);
  const knob = new THREE.Mesh(knobGeom, hardwareMat);
  knob.scale.set(1, 1, 0.82);
  knob.position.set(0.278, 0.59, 0.379);
  cabinet.add(knob);

  const glass_highlightsGeom = new THREE.CircleGeometry(1, 24);
  const glass_highlights = new THREE.InstancedMesh(
    glass_highlightsGeom,
    glassHighlightMat,
    3
  );
  const highlight_transforms = [
    [-0.12, 0.78, 0.055, 0.072],
    [-0.105, 0.57, 0.048, 0.063],
    [0.13, 0.70, 0.025, 0.035],
  ];
  for (let i = 0; i < highlight_transforms.length; i++) {
    const transform = highlight_transforms[i];
    instance_dummy.position.set(transform[0], transform[1], 0.311);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.set(transform[2], transform[3], 1);
    instance_dummy.updateMatrix();
    glass_highlights.setMatrixAt(i, instance_dummy.matrix);
  }
  glass_highlights.instanceMatrix.needsUpdate = true;
  cabinet.add(glass_highlights);

  fitToUnitCube(THREE, cabinet);
  return cabinet;

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
}