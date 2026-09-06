export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cordless_rotary_tool";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const controls_group = new THREE.Group();
  controls_group.name = "controls_group";
  root.add(controls_group);

  const cutting_tool_group = new THREE.Group();
  cutting_tool_group.name = "cutting_tool_group";
  root.add(cutting_tool_group);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x25282e,
    metalness: 0.0,
    roughness: 0.8
  });
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x171a1f,
    metalness: 0.0,
    roughness: 0.8
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x151922,
    metalness: 0.0,
    roughness: 0.3
  });
  const ventMat = new THREE.MeshStandardMaterial({
    color: 0x050608,
    metalness: 0.0,
    roughness: 0.8
  });
  const red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xe33b32,
    metalness: 0.0,
    roughness: 0.3
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x79c9ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x79c9ff,
    emissiveIntensity: 1.0
  });
  const display_segmentMat = new THREE.MeshStandardMaterial({
    color: 0x176fc4,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x176fc4,
    emissiveIntensity: 1.0
  });
  const iconMat = new THREE.MeshStandardMaterial({
    color: 0xdce5ee,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
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

  function roundedPanelGeometry(width, height, depth, radius, bevelSize) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: bevelSize,
        bevelSize,
        bevelSegments: 2,
        curveSegments: 8
      }
    );
  }

  const main_handleProfile = [
    new THREE.Vector2(0.00, -1.35),
    new THREE.Vector2(0.34, -1.35),
    new THREE.Vector2(0.40, -1.30),
    new THREE.Vector2(0.44, -1.18),
    new THREE.Vector2(0.45, -1.02),
    new THREE.Vector2(0.45, -0.24),
    new THREE.Vector2(0.44, -0.10),
    new THREE.Vector2(0.42, 0.05),
    new THREE.Vector2(0.00, 0.05)
  ];
  const main_handleGeom = new THREE.LatheGeometry(main_handleProfile, 40);
  const main_handle = new THREE.Mesh(main_handleGeom, bodyMat);
  main_handle.name = "main_handle";
  main_handle.rotation.x = Math.PI / 2;
  body_group.add(main_handle);

  const rear_capProfile = [
    new THREE.Vector2(0.00, -1.72),
    new THREE.Vector2(0.22, -1.72),
    new THREE.Vector2(0.34, -1.68),
    new THREE.Vector2(0.41, -1.58),
    new THREE.Vector2(0.45, -1.43),
    new THREE.Vector2(0.44, -1.31),
    new THREE.Vector2(0.00, -1.31)
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 40);
  const rear_cap = new THREE.Mesh(rear_capGeom, bodyMat);
  rear_cap.name = "rear_cap";
  rear_cap.rotation.x = Math.PI / 2;
  body_group.add(rear_cap);

  const rear_cap_seamGeom = new THREE.TorusGeometry(0.438, 0.012, 8, 40);
  const rear_cap_seam = new THREE.Mesh(rear_cap_seamGeom, ventMat);
  rear_cap_seam.name = "rear_cap_seam";
  rear_cap_seam.position.z = -1.32;
  body_group.add(rear_cap_seam);

  const front_noseProfile = [
    new THREE.Vector2(0.00, -0.02),
    new THREE.Vector2(0.42, -0.02),
    new THREE.Vector2(0.46, 0.10),
    new THREE.Vector2(0.50, 0.25),
    new THREE.Vector2(0.51, 0.42),
    new THREE.Vector2(0.49, 0.62),
    new THREE.Vector2(0.44, 0.84),
    new THREE.Vector2(0.37, 1.02),
    new THREE.Vector2(0.30, 1.10),
    new THREE.Vector2(0.00, 1.10)
  ];
  const front_noseGeom = new THREE.LatheGeometry(front_noseProfile, 40);
  const front_nose = new THREE.Mesh(front_noseGeom, bodyMat);
  front_nose.name = "front_nose";
  front_nose.rotation.x = Math.PI / 2;
  body_group.add(front_nose);

  const body_joint_seamGeom = new THREE.TorusGeometry(0.432, 0.012, 8, 40);
  const body_joint_seam = new THREE.Mesh(body_joint_seamGeom, ventMat);
  body_joint_seam.name = "body_joint_seam";
  body_joint_seam.position.z = 0.02;
  body_group.add(body_joint_seam);

  const front_face_seamGeom = new THREE.TorusGeometry(0.354, 0.011, 8, 36);
  const front_face_seam = new THREE.Mesh(front_face_seamGeom, ventMat);
  front_face_seam.name = "front_face_seam";
  front_face_seam.position.z = 1.04;
  body_group.add(front_face_seam);

  const front_ribsGeom = new THREE.CapsuleGeometry(0.025, 0.34, 4, 8);
  const front_ribs = new THREE.InstancedMesh(front_ribsGeom, gripMat, 6);
  front_ribs.name = "front_ribs";
  const front_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    front_rib_dummy.position.set(
      Math.cos(angle) * 0.475,
      Math.sin(angle) * 0.475,
      0.55
    );
    front_rib_dummy.rotation.set(Math.PI / 2, 0, 0);
    front_rib_dummy.scale.set(0.75, 1, 0.75);
    front_rib_dummy.updateMatrix();
    front_ribs.setMatrixAt(i, front_rib_dummy.matrix);
  }
  front_ribs.instanceMatrix.needsUpdate = true;
  body_group.add(front_ribs);

  const vent_slotsGeom = new THREE.CapsuleGeometry(0.035, 0.14, 4, 8);
  const vent_slots = new THREE.InstancedMesh(vent_slotsGeom, ventMat, 6);
  vent_slots.name = "vent_slots";
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    vent_dummy.position.set(
      Math.cos(angle) * 0.438,
      Math.sin(angle) * 0.438,
      0.07
    );
    vent_dummy.rotation.set(Math.PI / 2, 0, 0);
    vent_dummy.scale.set(0.72, 1, 0.72);
    vent_dummy.updateMatrix();
    vent_slots.setMatrixAt(i, vent_dummy.matrix);
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  body_group.add(vent_slots);

  const rear_vent_slotsGeom = new THREE.CapsuleGeometry(0.026, 0.16, 4, 8);
  const rear_vent_slots = new THREE.InstancedMesh(rear_vent_slotsGeom, ventMat, 6);
  rear_vent_slots.name = "rear_vent_slots";
  const rear_vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    rear_vent_dummy.position.set(
      Math.cos(angle) * 0.448,
      Math.sin(angle) * 0.448,
      -1.08
    );
    rear_vent_dummy.rotation.set(Math.PI / 2, 0, 0);
    rear_vent_dummy.scale.set(0.72, 1, 0.72);
    rear_vent_dummy.updateMatrix();
    rear_vent_slots.setMatrixAt(i, rear_vent_dummy.matrix);
  }
  rear_vent_slots.instanceMatrix.needsUpdate = true;
  body_group.add(rear_vent_slots);

  const control_panelGeom = roundedPanelGeometry(0.62, 1.05, 0.05, 0.09, 0.012);
  const control_panel = new THREE.Mesh(control_panelGeom, panelMat);
  control_panel.name = "control_panel";
  control_panel.rotation.x = -Math.PI / 2;
  control_panel.position.set(0, 0.397, -0.62);
  controls_group.add(control_panel);

  const display_bezelGeom = roundedPanelGeometry(0.46, 0.58, 0.014, 0.045, 0.004);
  const display_bezel = new THREE.Mesh(display_bezelGeom, ventMat);
  display_bezel.name = "display_bezel";
  display_bezel.rotation.x = -Math.PI / 2;
  display_bezel.position.set(0, 0.452, -0.47);
  controls_group.add(display_bezel);

  const display_screenGeom = roundedPanelGeometry(0.39, 0.50, 0.008, 0.025, 0.002);
  const display_screen = new THREE.Mesh(display_screenGeom, screenMat);
  display_screen.name = "display_screen";
  display_screen.rotation.x = -Math.PI / 2;
  display_screen.position.set(0, 0.469, -0.47);
  controls_group.add(display_screen);

  const display_segmentGeom = new THREE.BoxGeometry(1, 1, 1);
  const display_segment_data = [
    [-0.105, -0.64, 0.022, 0.130],
    [-0.105, -0.47, 0.022, 0.130],
    [-0.164, -0.555, 0.105, 0.020],
    [-0.046, -0.555, 0.105, 0.020],
    [-0.164, -0.385, 0.105, 0.020],
    [-0.046, -0.385, 0.105, 0.020],
    [0.105, -0.64, 0.020, 0.130],
    [0.105, -0.47, 0.020, 0.130],
    [0.050, -0.555, 0.110, 0.018],
    [0.160, -0.555, 0.018, 0.145],
    [0.050, -0.385, 0.110, 0.018],
    [0.075, -0.705, 0.070, 0.012],
    [0.075, -0.675, 0.070, 0.012],
    [0.075, -0.325, 0.070, 0.012],
    [0.040, -0.340, 0.012, 0.055],
    [0.110, -0.340, 0.012, 0.055]
  ];
  const display_segments = new THREE.InstancedMesh(
    display_segmentGeom,
    display_segmentMat,
    display_segment_data.length
  );
  display_segments.name = "display_segments";
  const display_dummy = new THREE.Object3D();
  for (let i = 0; i < display_segment_data.length; i++) {
    const data = display_segment_data[i];
    display_dummy.position.set(data[0], 0.482, data[1]);
    display_dummy.rotation.set(0, 0, 0);
    display_dummy.scale.set(data[2], 0.006, data[3]);
    display_dummy.updateMatrix();
    display_segments.setMatrixAt(i, display_dummy.matrix);
  }
  display_segments.instanceMatrix.needsUpdate = true;
  controls_group.add(display_segments);

  const power_buttonGeom = roundedPanelGeometry(0.22, 0.22, 0.035, 0.055, 0.008);
  const power_button = new THREE.Mesh(power_buttonGeom, red_buttonMat);
  power_button.name = "power_button";
  power_button.rotation.x = -Math.PI / 2;
  power_button.position.set(0, 0.454, -1.02);
  controls_group.add(power_button);

  const power_icon_ringGeom = new THREE.RingGeometry(0.032, 0.043, 24);
  const power_icon_ring = new THREE.Mesh(power_icon_ringGeom, iconMat);
  power_icon_ring.name = "power_icon_ring";
  power_icon_ring.rotation.x = -Math.PI / 2;
  power_icon_ring.position.set(0.17, 0.482, -0.72);
  controls_group.add(power_icon_ring);

  const power_icon_barGeom = new THREE.BoxGeometry(0.014, 0.007, 0.052);
  const power_icon_bar = new THREE.Mesh(power_icon_barGeom, iconMat);
  power_icon_bar.name = "power_icon_bar";
  power_icon_bar.position.set(0.17, 0.485, -0.755);
  controls_group.add(power_icon_bar);

  const mode_icon_ringGeom = new THREE.RingGeometry(0.031, 0.042, 24);
  const mode_icon_ring = new THREE.Mesh(mode_icon_ringGeom, iconMat);
  mode_icon_ring.name = "mode_icon_ring";
  mode_icon_ring.rotation.x = -Math.PI / 2;
  mode_icon_ring.position.set(-0.17, 0.482, -0.72);
  controls_group.add(mode_icon_ring);

  const mode_icon_centerGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 16);
  const mode_icon_center = new THREE.Mesh(mode_icon_centerGeom, iconMat);
  mode_icon_center.name = "mode_icon_center";
  mode_icon_center.position.set(-0.17, 0.485, -0.72);
  controls_group.add(mode_icon_center);

  const brand_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_marks = new THREE.InstancedMesh(brand_marksGeom, iconMat, 8);
  brand_marks.name = "brand_marks";
  const brand_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    brand_dummy.position.set(
      -0.145 + i * 0.041,
      0.482,
      -0.105 - (i % 2) * 0.008
    );
    brand_dummy.rotation.set(0, 0, 0);
    brand_dummy.scale.set(0.026 + (i % 3) * 0.004, 0.006, 0.012);
    brand_dummy.updateMatrix();
    brand_marks.setMatrixAt(i, brand_dummy.matrix);
  }
  brand_marks.instanceMatrix.needsUpdate = true;
  controls_group.add(brand_marks);

  const button_labelGeom = new THREE.BoxGeometry(0.055, 0.006, 0.012);
  const button_label = new THREE.Mesh(button_labelGeom, iconMat);
  button_label.name = "button_label";
  button_label.position.set(0.13, 0.482, -1.15);
  controls_group.add(button_label);

  const chuck_recessGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.075, 32);
  const chuck_recess = new THREE.Mesh(chuck_recessGeom, ventMat);
  chuck_recess.name = "chuck_recess";
  chuck_recess.rotation.x = Math.PI / 2;
  chuck_recess.position.z = 1.105;
  cutting_tool_group.add(chuck_recess);

  const chuck_outer_ringGeom = new THREE.TorusGeometry(0.185, 0.035, 10, 36);
  const chuck_outer_ring = new THREE.Mesh(chuck_outer_ringGeom, brushedMat);
  chuck_outer_ring.name = "chuck_outer_ring";
  chuck_outer_ring.position.z = 1.14;
  cutting_tool_group.add(chuck_outer_ring);

  const chuck_collarGeom = new THREE.CylinderGeometry(0.135, 0.175, 0.20, 32);
  const chuck_collar = new THREE.Mesh(chuck_collarGeom, silverMat);
  chuck_collar.name = "chuck_collar";
  chuck_collar.rotation.x = Math.PI / 2;
  chuck_collar.position.z = 1.23;
  cutting_tool_group.add(chuck_collar);

  const chuck_bandGeom = new THREE.TorusGeometry(0.143, 0.018, 8, 32);
  const chuck_band = new THREE.Mesh(chuck_bandGeom, brushedMat);
  chuck_band.name = "chuck_band";
  chuck_band.position.z = 1.31;
  cutting_tool_group.add(chuck_band);

  const tool_shaftGeom = new THREE.CylinderGeometry(0.105, 0.120, 0.72, 32);
  const tool_shaft = new THREE.Mesh(tool_shaftGeom, silverMat);
  tool_shaft.name = "tool_shaft";
  tool_shaft.rotation.x = Math.PI / 2;
  tool_shaft.position.z = 1.65;
  cutting_tool_group.add(tool_shaft);

  const shaft_end_ringGeom = new THREE.TorusGeometry(0.086, 0.018, 8, 28);
  const shaft_end_ring = new THREE.Mesh(shaft_end_ringGeom, brushedMat);
  shaft_end_ring.name = "shaft_end_ring";
  shaft_end_ring.position.z = 2.00;
  cutting_tool_group.add(shaft_end_ring);

  const bit_shankGeom = new THREE.CylinderGeometry(0.064, 0.078, 0.24, 24);
  const bit_shank = new THREE.Mesh(bit_shankGeom, brushedMat);
  bit_shank.name = "bit_shank";
  bit_shank.rotation.x = Math.PI / 2;
  bit_shank.position.z = 2.10;
  cutting_tool_group.add(bit_shank);

  const cutter_coreGeom = new THREE.CylinderGeometry(0.047, 0.052, 0.43, 20);
  const cutter_core = new THREE.Mesh(cutter_coreGeom, brushedMat);
  cutter_core.name = "cutter_core";
  cutter_core.rotation.x = Math.PI / 2;
  cutter_core.position.z = 2.36;
  cutting_tool_group.add(cutter_core);

  function createFluteGeometry(phase) {
    const points = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const angle = phase + t * Math.PI * 4;
      const radius = 0.061 + Math.sin(t * Math.PI) * 0.012;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        2.16 + t * 0.43
      ));
    }
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      48,
      0.022,
      7,
      false
    );
  }

  const cutter_flute_aGeom = createFluteGeometry(0);
  const cutter_flute_a = new THREE.Mesh(cutter_flute_aGeom, silverMat);
  cutter_flute_a.name = "cutter_flute_a";
  cutting_tool_group.add(cutter_flute_a);

  const cutter_flute_bGeom = createFluteGeometry(Math.PI);
  const cutter_flute_b = new THREE.Mesh(cutter_flute_bGeom, silverMat);
  cutter_flute_b.name = "cutter_flute_b";
  cutting_tool_group.add(cutter_flute_b);

  const cutter_teethGeom = new THREE.ConeGeometry(0.055, 0.14, 3);
  const cutter_teeth = new THREE.InstancedMesh(cutter_teethGeom, brushedMat, 2);
  cutter_teeth.name = "cutter_teeth";
  const cutter_tooth_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    cutter_tooth_dummy.position.set(side * 0.045, 0, 2.59);
    cutter_tooth_dummy.rotation.set(Math.PI / 2, 0, side * 0.35);
    cutter_tooth_dummy.scale.set(1, 1, 1);
    cutter_tooth_dummy.updateMatrix();
    cutter_teeth.setMatrixAt(i, cutter_tooth_dummy.matrix);
  }
  cutter_teeth.instanceMatrix.needsUpdate = true;
  cutting_tool_group.add(cutter_teeth);

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