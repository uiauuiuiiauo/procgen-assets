export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "oak_glass_display_cabinet";

  const oakMat = new THREE.MeshStandardMaterial({
    color: 0xc9aa80,
    metalness: 0.0,
    roughness: 0.6,
  });
  const oakEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xb58d63,
    metalness: 0.0,
    roughness: 0.6,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x806044,
    metalness: 0.0,
    roughness: 0.6,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x4d3828,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08d35,
    metalness: 0.6,
    roughness: 0.2,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde3dc,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });

  const cabinetW = 1.0;
  const cabinetD = 0.56;
  const postX = 0.445;
  const postW = 0.09;
  const postD = 0.50;
  const postZ = -0.015;
  const frontZ = 0.235;

  const left_side_panelGeom = new THREE.BoxGeometry(0.035, 1.78, 0.46);
  const left_side_panel = new THREE.Mesh(left_side_panelGeom, oakEdgeMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.462, 1.08, -0.01);
  root.add(left_side_panel);

  const right_side_panelGeom = left_side_panelGeom;
  const right_side_panel = new THREE.Mesh(right_side_panelGeom, oakMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.462, 1.08, -0.01);
  root.add(right_side_panel);

  const back_panelGeom = new THREE.BoxGeometry(0.88, 1.78, 0.03);
  const back_panel = new THREE.Mesh(back_panelGeom, interiorMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, 1.08, -0.275);
  root.add(back_panel);

  const front_left_stileGeom = new THREE.BoxGeometry(postW, 1.90, postD);
  const front_left_stile = new THREE.Mesh(front_left_stileGeom, oakMat);
  front_left_stile.name = "front_left_stile";
  front_left_stile.position.set(-postX, 1.11, postZ);
  root.add(front_left_stile);

  const front_right_stileGeom = front_left_stileGeom;
  const front_right_stile = new THREE.Mesh(front_right_stileGeom, oakMat);
  front_right_stile.name = "front_right_stile";
  front_right_stile.position.set(postX, 1.11, postZ);
  root.add(front_right_stile);

  const rear_left_stileGeom = new THREE.BoxGeometry(postW, 1.90, 0.07);
  const rear_left_stile = new THREE.Mesh(rear_left_stileGeom, oakEdgeMat);
  rear_left_stile.name = "rear_left_stile";
  rear_left_stile.position.set(-postX, 1.11, -0.255);
  root.add(rear_left_stile);

  const rear_right_stileGeom = rear_left_stileGeom;
  const rear_right_stile = new THREE.Mesh(rear_right_stileGeom, oakEdgeMat);
  rear_right_stile.name = "rear_right_stile";
  rear_right_stile.position.set(postX, 1.11, -0.255);
  root.add(rear_right_stile);

  const top_headerGeom = new THREE.BoxGeometry(0.80, 0.15, 0.085);
  const top_header = new THREE.Mesh(top_headerGeom, oakMat);
  top_header.name = "top_header";
  top_header.position.set(0, 1.965, frontZ);
  root.add(top_header);

  const top_inner_railGeom = new THREE.BoxGeometry(0.80, 0.035, 0.06);
  const top_inner_rail = new THREE.Mesh(top_inner_railGeom, oakEdgeMat);
  top_inner_rail.name = "top_inner_rail";
  top_inner_rail.position.set(0, 1.883, 0.225);
  root.add(top_inner_rail);

  const top_crownGeom = new THREE.BoxGeometry(1.06, 0.07, 0.61);
  const top_crown = new THREE.Mesh(top_crownGeom, oakMat);
  top_crown.name = "top_crown";
  top_crown.position.set(0, 2.075, 0);
  root.add(top_crown);

  const top_capGeom = new THREE.BoxGeometry(1.10, 0.045, 0.66);
  const top_cap = new THREE.Mesh(top_capGeom, oakMat);
  top_cap.name = "top_cap";
  top_cap.position.set(0, 2.1325, 0.005);
  root.add(top_cap);

  const top_front_moldingGeom = new THREE.BoxGeometry(1.12, 0.055, 0.065);
  const top_front_molding = new THREE.Mesh(top_front_moldingGeom, oakEdgeMat);
  top_front_molding.name = "top_front_molding";
  top_front_molding.position.set(0, 2.075, 0.315);
  root.add(top_front_molding);

  const upper_shelfGeom = new THREE.BoxGeometry(0.80, 0.045, 0.49);
  const upper_shelf = new THREE.Mesh(upper_shelfGeom, oakMat);
  upper_shelf.name = "upper_shelf";
  upper_shelf.position.set(0, 1.49, 0);
  root.add(upper_shelf);

  const upper_shelf_nosingGeom = new THREE.BoxGeometry(0.80, 0.055, 0.045);
  const upper_shelf_nosing = new THREE.Mesh(upper_shelf_nosingGeom, oakEdgeMat);
  upper_shelf_nosing.name = "upper_shelf_nosing";
  upper_shelf_nosing.position.set(0, 1.485, 0.245);
  root.add(upper_shelf_nosing);

  const middle_shelfGeom = new THREE.BoxGeometry(0.80, 0.045, 0.49);
  const middle_shelf = new THREE.Mesh(middle_shelfGeom, oakMat);
  middle_shelf.name = "middle_shelf";
  middle_shelf.position.set(0, 1.04, 0);
  root.add(middle_shelf);

  const middle_shelf_nosingGeom = upper_shelf_nosingGeom;
  const middle_shelf_nosing = new THREE.Mesh(middle_shelf_nosingGeom, oakEdgeMat);
  middle_shelf_nosing.name = "middle_shelf_nosing";
  middle_shelf_nosing.position.set(0, 1.035, 0.245);
  root.add(middle_shelf_nosing);

  const open_compartment_floorGeom = new THREE.BoxGeometry(0.80, 0.05, 0.49);
  const open_compartment_floor = new THREE.Mesh(open_compartment_floorGeom, oakMat);
  open_compartment_floor.name = "open_compartment_floor";
  open_compartment_floor.position.set(0, 0.575, 0);
  root.add(open_compartment_floor);

  const open_compartment_floor_nosingGeom = new THREE.BoxGeometry(0.80, 0.055, 0.045);
  const open_compartment_floor_nosing = new THREE.Mesh(open_compartment_floor_nosingGeom, oakEdgeMat);
  open_compartment_floor_nosing.name = "open_compartment_floor_nosing";
  open_compartment_floor_nosing.position.set(0, 0.57, 0.245);
  root.add(open_compartment_floor_nosing);

  const lower_cabinet_floorGeom = new THREE.BoxGeometry(0.80, 0.045, 0.46);
  const lower_cabinet_floor = new THREE.Mesh(lower_cabinet_floorGeom, interiorMat);
  lower_cabinet_floor.name = "lower_cabinet_floor";
  lower_cabinet_floor.position.set(0, 0.155, -0.005);
  root.add(lower_cabinet_floor);

  const lower_dividerGeom = new THREE.BoxGeometry(0.025, 0.39, 0.065);
  const lower_divider = new THREE.Mesh(lower_dividerGeom, oakEdgeMat);
  lower_divider.name = "lower_divider";
  lower_divider.position.set(0, 0.365, 0.235);
  root.add(lower_divider);

  const lower_door_stileGeom = new THREE.BoxGeometry(0.055, 0.40, 0.045);
  const lower_left_door_stile = new THREE.Mesh(lower_door_stileGeom, oakMat);
  lower_left_door_stile.name = "lower_left_door_stile";
  lower_left_door_stile.position.set(-0.3625, 0.365, 0.258);
  root.add(lower_left_door_stile);

  const lower_right_door_stile = new THREE.Mesh(lower_door_stileGeom, oakMat);
  lower_right_door_stile.name = "lower_right_door_stile";
  lower_right_door_stile.position.set(0.3625, 0.365, 0.258);
  root.add(lower_right_door_stile);

  const lower_door_railGeom = new THREE.BoxGeometry(0.34, 0.065, 0.045);
  const lower_left_door_top_rail = new THREE.Mesh(lower_door_railGeom, oakMat);
  lower_left_door_top_rail.name = "lower_left_door_top_rail";
  lower_left_door_top_rail.position.set(-0.18, 0.535, 0.258);
  root.add(lower_left_door_top_rail);

  const lower_left_door_bottom_rail = new THREE.Mesh(lower_door_railGeom, oakMat);
  lower_left_door_bottom_rail.name = "lower_left_door_bottom_rail";
  lower_left_door_bottom_rail.position.set(-0.18, 0.195, 0.258);
  root.add(lower_left_door_bottom_rail);

  const lower_right_door_top_rail = new THREE.Mesh(lower_door_railGeom, oakMat);
  lower_right_door_top_rail.name = "lower_right_door_top_rail";
  lower_right_door_top_rail.position.set(0.18, 0.535, 0.258);
  root.add(lower_right_door_top_rail);

  const lower_right_door_bottom_rail = new THREE.Mesh(lower_door_railGeom, oakMat);
  lower_right_door_bottom_rail.name = "lower_right_door_bottom_rail";
  lower_right_door_bottom_rail.position.set(0.18, 0.195, 0.258);
  root.add(lower_right_door_bottom_rail);

  const lower_left_glassGeom = new THREE.BoxGeometry(0.255, 0.275, 0.008);
  const lower_left_glass = new THREE.Mesh(lower_left_glassGeom, glassMat);
  lower_left_glass.name = "lower_left_glass";
  lower_left_glass.position.set(-0.18, 0.365, 0.282);
  root.add(lower_left_glass);

  const lower_right_glassGeom = lower_left_glassGeom;
  const lower_right_glass = new THREE.Mesh(lower_right_glassGeom, glassMat);
  lower_right_glass.name = "lower_right_glass";
  lower_right_glass.position.set(0.18, 0.365, 0.282);
  root.add(lower_right_glass);

  const base_front_apronGeom = new THREE.BoxGeometry(0.82, 0.12, 0.08);
  const base_front_apron = new THREE.Mesh(base_front_apronGeom, oakMat);
  base_front_apron.name = "base_front_apron";
  base_front_apron.position.set(0, 0.105, 0.245);
  root.add(base_front_apron);

  const base_side_railGeom = new THREE.BoxGeometry(0.09, 0.12, cabinetD);
  const base_left_rail = new THREE.Mesh(base_side_railGeom, oakEdgeMat);
  base_left_rail.name = "base_left_rail";
  base_left_rail.position.set(-postX, 0.105, 0);
  root.add(base_left_rail);

  const base_right_rail = new THREE.Mesh(base_side_railGeom, oakEdgeMat);
  base_right_rail.name = "base_right_rail";
  base_right_rail.position.set(postX, 0.105, 0);
  root.add(base_right_rail);

  const cabinet_feetGeom = new THREE.BoxGeometry(0.11, 0.18, 0.11);
  const cabinet_feet = new THREE.InstancedMesh(cabinet_feetGeom, oakMat, 4);
  cabinet_feet.name = "cabinet_feet";
  const feetDummy = new THREE.Object3D();
  const feetPositions = [
    [-postX, 0.09, 0.225],
    [postX, 0.09, 0.225],
    [-postX, 0.09, -0.225],
    [postX, 0.09, -0.225],
  ];
  for (let i = 0; i < feetPositions.length; i++) {
    feetDummy.position.set(feetPositions[i][0], feetPositions[i][1], feetPositions[i][2]);
    feetDummy.updateMatrix();
    cabinet_feet.setMatrixAt(i, feetDummy.matrix);
  }
  cabinet_feet.instanceMatrix.needsUpdate = true;
  root.add(cabinet_feet);

  const right_side_inset_panelGeom = new THREE.BoxGeometry(0.012, 1.55, 0.34);
  const right_side_inset_panel = new THREE.Mesh(right_side_inset_panelGeom, oakMat);
  right_side_inset_panel.name = "right_side_inset_panel";
  right_side_inset_panel.position.set(0.486, 1.12, -0.01);
  root.add(right_side_inset_panel);

  const right_side_vertical_trimGeom = new THREE.BoxGeometry(0.018, 1.65, 0.035);
  const right_side_front_trim = new THREE.Mesh(right_side_vertical_trimGeom, oakEdgeMat);
  right_side_front_trim.name = "right_side_front_trim";
  right_side_front_trim.position.set(0.492, 1.12, 0.17);
  root.add(right_side_front_trim);

  const right_side_rear_trim = new THREE.Mesh(right_side_vertical_trimGeom, oakEdgeMat);
  right_side_rear_trim.name = "right_side_rear_trim";
  right_side_rear_trim.position.set(0.492, 1.12, -0.19);
  root.add(right_side_rear_trim);

  const right_side_horizontal_trimGeom = new THREE.BoxGeometry(0.018, 0.045, 0.37);
  const right_side_top_trim = new THREE.Mesh(right_side_horizontal_trimGeom, oakEdgeMat);
  right_side_top_trim.name = "right_side_top_trim";
  right_side_top_trim.position.set(0.492, 1.93, -0.01);
  root.add(right_side_top_trim);

  const right_side_bottom_trim = new THREE.Mesh(right_side_horizontal_trimGeom, oakEdgeMat);
  right_side_bottom_trim.name = "right_side_bottom_trim";
  right_side_bottom_trim.position.set(0.492, 0.31, -0.01);
  root.add(right_side_bottom_trim);

  const shelf_pin_holesGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.005, 8);
  const holeRows = 11;
  const shelf_pin_holes = new THREE.InstancedMesh(
    shelf_pin_holesGeom,
    seamMat,
    holeRows * 2
  );
  shelf_pin_holes.name = "shelf_pin_holes";
  const holeDummy = new THREE.Object3D();
  let holeIndex = 0;
  for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
    const side = sideIndex === 0 ? -1 : 1;
    for (let i = 0; i < holeRows; i++) {
      holeDummy.position.set(side * 0.391, 0.67 + i * 0.112, -0.254);
      holeDummy.rotation.set(Math.PI / 2, 0, 0);
      holeDummy.updateMatrix();
      shelf_pin_holes.setMatrixAt(holeIndex++, holeDummy.matrix);
    }
  }
  shelf_pin_holes.instanceMatrix.needsUpdate = true;
  root.add(shelf_pin_holes);

  const upper_handle_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.105, 0),
      new THREE.Vector3(0.018, 0.085, 0.025),
      new THREE.Vector3(0.030, 0, 0.040),
      new THREE.Vector3(0.018, -0.085, 0.025),
      new THREE.Vector3(0, -0.105, 0),
    ],
    false,
    "centripetal"
  );
  const upper_handleGeom = new THREE.TubeGeometry(
    upper_handle_curve,
    28,
    0.009,
    8,
    false
  );

  const upper_left_handle = new THREE.Mesh(upper_handleGeom, brassMat);
  upper_left_handle.name = "upper_left_handle";
  upper_left_handle.position.set(-0.425, 1.22, 0.267);
  upper_left_handle.scale.x = -1;
  root.add(upper_left_handle);

  const upper_right_handle = new THREE.Mesh(upper_handleGeom, brassMat);
  upper_right_handle.name = "upper_right_handle";
  upper_right_handle.position.set(0.425, 1.22, 0.267);
  root.add(upper_right_handle);

  const upper_handle_mountsGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.014, 16);
  const upper_handle_mounts = new THREE.InstancedMesh(
    upper_handle_mountsGeom,
    brassMat,
    4
  );
  upper_handle_mounts.name = "upper_handle_mounts";
  const upperMountDummy = new THREE.Object3D();
  const upperMountPositions = [
    [-0.425, 1.325, 0.267],
    [-0.425, 1.115, 0.267],
    [0.425, 1.325, 0.267],
    [0.425, 1.115, 0.267],
  ];
  for (let i = 0; i < upperMountPositions.length; i++) {
    upperMountDummy.position.set(
      upperMountPositions[i][0],
      upperMountPositions[i][1],
      upperMountPositions[i][2]
    );
    upperMountDummy.rotation.set(Math.PI / 2, 0, 0);
    upperMountDummy.updateMatrix();
    upper_handle_mounts.setMatrixAt(i, upperMountDummy.matrix);
  }
  upper_handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(upper_handle_mounts);

  const lower_door_knobsGeom = new THREE.SphereGeometry(0.025, 16, 10);
  const lower_door_knobs = new THREE.InstancedMesh(lower_door_knobsGeom, brassMat, 2);
  lower_door_knobs.name = "lower_door_knobs";
  const knobDummy = new THREE.Object3D();
  const knobPositions = [
    [-0.045, 0.525, 0.303],
    [0.045, 0.525, 0.303],
  ];
  for (let i = 0; i < knobPositions.length; i++) {
    knobDummy.position.set(knobPositions[i][0], knobPositions[i][1], knobPositions[i][2]);
    knobDummy.updateMatrix();
    lower_door_knobs.setMatrixAt(i, knobDummy.matrix);
  }
  lower_door_knobs.instanceMatrix.needsUpdate = true;
  root.add(lower_door_knobs);

  const lower_door_knob_stemsGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.035, 12);
  const lower_door_knob_stems = new THREE.InstancedMesh(
    lower_door_knob_stemsGeom,
    brassMat,
    2
  );
  lower_door_knob_stems.name = "lower_door_knob_stems";
  const stemDummy = new THREE.Object3D();
  for (let i = 0; i < knobPositions.length; i++) {
    stemDummy.position.set(knobPositions[i][0], knobPositions[i][1], 0.284);
    stemDummy.rotation.set(Math.PI / 2, 0, 0);
    stemDummy.updateMatrix();
    lower_door_knob_stems.setMatrixAt(i, stemDummy.matrix);
  }
  lower_door_knob_stems.instanceMatrix.needsUpdate = true;
  root.add(lower_door_knob_stems);

  const lower_pull_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.075, 0),
      new THREE.Vector3(0.012, 0.055, 0.018),
      new THREE.Vector3(-0.008, 0.025, 0.025),
      new THREE.Vector3(0.012, -0.005, 0.025),
      new THREE.Vector3(-0.008, -0.035, 0.025),
      new THREE.Vector3(0.008, -0.060, 0.018),
      new THREE.Vector3(0, -0.078, 0),
    ],
    false,
    "centripetal"
  );
  const lower_door_pullGeom = new THREE.TubeGeometry(
    lower_pull_curve,
    30,
    0.006,
    7,
    false
  );
  const lower_door_pull = new THREE.Mesh(lower_door_pullGeom, brassMat);
  lower_door_pull.name = "lower_door_pull";
  lower_door_pull.position.set(0.018, 0.35, 0.294);
  root.add(lower_door_pull);

  const lower_pull_mountsGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12);
  const lower_pull_mounts = new THREE.InstancedMesh(lower_pull_mountsGeom, brassMat, 2);
  lower_pull_mounts.name = "lower_pull_mounts";
  const lowerMountDummy = new THREE.Object3D();
  const lowerMountPositions = [
    [0.018, 0.428, 0.294],
    [0.018, 0.272, 0.294],
  ];
  for (let i = 0; i < lowerMountPositions.length; i++) {
    lowerMountDummy.position.set(
      lowerMountPositions[i][0],
      lowerMountPositions[i][1],
      lowerMountPositions[i][2]
    );
    lowerMountDummy.rotation.set(Math.PI / 2, 0, 0);
    lowerMountDummy.updateMatrix();
    lower_pull_mounts.setMatrixAt(i, lowerMountDummy.matrix);
  }
  lower_pull_mounts.instanceMatrix.needsUpdate = true;
  root.add(lower_pull_mounts);

  const lower_door_hingesGeom = new THREE.BoxGeometry(0.016, 0.055, 0.012);
  const lower_door_hinges = new THREE.InstancedMesh(lower_door_hingesGeom, brassMat, 4);
  lower_door_hinges.name = "lower_door_hinges";
  const hingeDummy = new THREE.Object3D();
  const hingePositions = [
    [-0.393, 0.235, 0.286],
    [-0.393, 0.475, 0.286],
    [0.393, 0.235, 0.286],
    [0.393, 0.475, 0.286],
  ];
  for (let i = 0; i < hingePositions.length; i++) {
    hingeDummy.position.set(hingePositions[i][0], hingePositions[i][1], hingePositions[i][2]);
    hingeDummy.updateMatrix();
    lower_door_hinges.setMatrixAt(i, hingeDummy.matrix);
  }
  lower_door_hinges.instanceMatrix.needsUpdate = true;
  root.add(lower_door_hinges);

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