export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blender";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const jar_group = new THREE.Group();
  jar_group.name = "jar_group";
  root.add(jar_group);

  const lid_group = new THREE.Group();
  lid_group.name = "lid_group";
  root.add(lid_group);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(handle_group);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const glossy_blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3
  });
  const matte_blackMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x353535,
    metalness: 0.0,
    roughness: 0.8
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const ribGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    depthWrite: false
  });
  const frosted_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2f0,
    metalness: 0.0,
    roughness: 0.7
  });

  const base_bodyProfile = [
    new THREE.Vector2(0.00, 0.25),
    new THREE.Vector2(0.72, 0.25),
    new THREE.Vector2(0.80, 0.34),
    new THREE.Vector2(0.79, 0.48),
    new THREE.Vector2(0.74, 0.72),
    new THREE.Vector2(0.63, 1.55),
    new THREE.Vector2(0.59, 1.72),
    new THREE.Vector2(0.00, 1.72)
  ];
  const base_bodyGeom = new THREE.LatheGeometry(base_bodyProfile, 64);
  const base_body = new THREE.Mesh(base_bodyGeom, brushed_metalMat);
  base_body.name = "base_body";
  base_group.add(base_body);

  const base_bottom_ringProfile = [
    new THREE.Vector2(0.00, 0.10),
    new THREE.Vector2(0.66, 0.10),
    new THREE.Vector2(0.77, 0.15),
    new THREE.Vector2(0.82, 0.23),
    new THREE.Vector2(0.80, 0.31),
    new THREE.Vector2(0.73, 0.38),
    new THREE.Vector2(0.00, 0.38)
  ];
  const base_bottom_ringGeom = new THREE.LatheGeometry(base_bottom_ringProfile, 48);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, matte_blackMat);
  base_bottom_ring.name = "base_bottom_ring";
  base_group.add(base_bottom_ring);

  const base_top_collarGeom = new THREE.CylinderGeometry(0.59, 0.62, 0.10, 48);
  const base_top_collar = new THREE.Mesh(base_top_collarGeom, glossy_blackMat);
  base_top_collar.name = "base_top_collar";
  base_top_collar.position.y = 1.72;
  base_group.add(base_top_collar);

  const base_top_trimGeom = new THREE.TorusGeometry(0.565, 0.025, 10, 48);
  const base_top_trim = new THREE.Mesh(base_top_trimGeom, polished_metalMat);
  base_top_trim.name = "base_top_trim";
  base_top_trim.rotation.x = Math.PI / 2;
  base_top_trim.position.y = 1.77;
  base_group.add(base_top_trim);

  const base_feetGeom = new THREE.BoxGeometry(0.22, 0.16, 0.24);
  const base_feet = new THREE.InstancedMesh(base_feetGeom, matte_blackMat, 4);
  base_feet.name = "base_feet";
  const foot_positions = [
    [-0.48, 0.06, 0.34],
    [0.48, 0.06, 0.34],
    [-0.48, 0.06, -0.34],
    [0.48, 0.06, -0.34]
  ];
  const foot_dummy = new THREE.Object3D();
  for (let i = 0; i < foot_positions.length; i++) {
    foot_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    foot_dummy.updateMatrix();
    base_feet.setMatrixAt(i, foot_dummy.matrix);
  }
  base_feet.instanceMatrix.needsUpdate = true;
  base_group.add(base_feet);

  const jar_bodyProfile = [
    new THREE.Vector2(0.00, 1.78),
    new THREE.Vector2(0.48, 1.78),
    new THREE.Vector2(0.55, 1.83),
    new THREE.Vector2(0.60, 1.96),
    new THREE.Vector2(0.63, 2.18),
    new THREE.Vector2(0.65, 2.75),
    new THREE.Vector2(0.68, 3.30),
    new THREE.Vector2(0.70, 3.48),
    new THREE.Vector2(0.70, 3.58)
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, glassMat);
  jar_body.name = "jar_body";
  jar_group.add(jar_body);

  const jar_bottom_glassGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.035, 48);
  const jar_bottom_glass = new THREE.Mesh(jar_bottom_glassGeom, glassMat);
  jar_bottom_glass.name = "jar_bottom_glass";
  jar_bottom_glass.position.y = 1.82;
  jar_group.add(jar_bottom_glass);

  const jar_bottom_rimGeom = new THREE.TorusGeometry(0.53, 0.026, 10, 48);
  const jar_bottom_rim = new THREE.Mesh(jar_bottom_rimGeom, glossy_blackMat);
  jar_bottom_rim.name = "jar_bottom_rim";
  jar_bottom_rim.rotation.x = Math.PI / 2;
  jar_bottom_rim.position.y = 1.80;
  jar_group.add(jar_bottom_rim);

  const jar_top_glass_rimGeom = new THREE.TorusGeometry(0.68, 0.024, 10, 48);
  const jar_top_glass_rim = new THREE.Mesh(jar_top_glass_rimGeom, frosted_glassMat);
  jar_top_glass_rim.name = "jar_top_glass_rim";
  jar_top_glass_rim.rotation.x = Math.PI / 2;
  jar_top_glass_rim.position.y = 3.51;
  jar_group.add(jar_top_glass_rim);

  const jar_ribsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.91, 0.56),
    new THREE.Vector3(0, 2.06, 0.61),
    new THREE.Vector3(0, 2.48, 0.64),
    new THREE.Vector3(0, 2.98, 0.67),
    new THREE.Vector3(0, 3.35, 0.69)
  ], false, "centripetal");
  const jar_ribsGeom = new THREE.TubeGeometry(jar_ribsPath, 32, 0.014, 8, false);
  const jar_ribs = new THREE.InstancedMesh(jar_ribsGeom, ribGlassMat, 11);
  jar_ribs.name = "jar_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    const angle = -1.26 + i * 0.252;
    rib_dummy.position.set(0, 0, 0);
    rib_dummy.rotation.set(0, angle, 0);
    rib_dummy.updateMatrix();
    jar_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  jar_ribs.instanceMatrix.needsUpdate = true;
  jar_group.add(jar_ribs);

  const blade_hubGeom = new THREE.CylinderGeometry(0.075, 0.095, 0.15, 20);
  const blade_hub = new THREE.Mesh(blade_hubGeom, matte_blackMat);
  blade_hub.name = "blade_hub";
  blade_hub.position.y = 1.93;
  jar_group.add(blade_hub);

  const blade_shaftGeom = new THREE.CylinderGeometry(0.025, 0.035, 0.42, 16);
  const blade_shaft = new THREE.Mesh(blade_shaftGeom, polished_metalMat);
  blade_shaft.name = "blade_shaft";
  blade_shaft.position.y = 2.12;
  jar_group.add(blade_shaft);

  const blade_setGeom = new THREE.BufferGeometry();
  blade_setGeom.setAttribute("position", new THREE.Float32BufferAttribute([
     0.00, 0.000,  0.025,
    -0.05, 0.000,  0.110,
    -0.220, 0.180,  0.190,
    -0.290, 0.100,  0.110,
    -0.090, 0.045, -0.015,
     0.00, 0.000, -0.025,
     0.05, 0.000, -0.110,
     0.220, -0.180, -0.190,
     0.290, -0.100, -0.110,
     0.090, -0.045,  0.015
  ], 3));
  blade_setGeom.setIndex([
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    5, 7, 6,
    5, 8, 7,
    5, 4, 8
  ]);
  blade_setGeom.computeVertexNormals();
  const blade_set = new THREE.Mesh(blade_setGeom, silverMat);
  blade_set.name = "blade_set";
  blade_set.position.y = 2.04;
  jar_group.add(blade_set);

  const lid_lower_bandGeom = new THREE.CylinderGeometry(0.71, 0.69, 0.18, 64);
  const lid_lower_band = new THREE.Mesh(lid_lower_bandGeom, glossy_blackMat);
  lid_lower_band.name = "lid_lower_band";
  lid_lower_band.position.y = 3.56;
  lid_group.add(lid_lower_band);

  const lid_mainProfile = [
    new THREE.Vector2(0.00, 3.58),
    new THREE.Vector2(0.68, 3.58),
    new THREE.Vector2(0.74, 3.63),
    new THREE.Vector2(0.77, 3.70),
    new THREE.Vector2(0.76, 3.76),
    new THREE.Vector2(0.69, 3.82),
    new THREE.Vector2(0.30, 3.85),
    new THREE.Vector2(0.00, 3.85)
  ];
  const lid_mainGeom = new THREE.LatheGeometry(lid_mainProfile, 64);
  const lid_main = new THREE.Mesh(lid_mainGeom, glossy_blackMat);
  lid_main.name = "lid_main";
  lid_group.add(lid_main);

  const lid_outer_rimGeom = new THREE.TorusGeometry(0.75, 0.026, 10, 64);
  const lid_outer_rim = new THREE.Mesh(lid_outer_rimGeom, glossy_blackMat);
  lid_outer_rim.name = "lid_outer_rim";
  lid_outer_rim.rotation.x = Math.PI / 2;
  lid_outer_rim.position.y = 3.70;
  lid_group.add(lid_outer_rim);

  const pouring_spoutShape = new THREE.Shape();
  pouring_spoutShape.moveTo(0.00, 0.00);
  pouring_spoutShape.lineTo(-0.24, 0.025);
  pouring_spoutShape.lineTo(-0.18, 0.075);
  pouring_spoutShape.lineTo(-0.03, 0.085);
  pouring_spoutShape.lineTo(0.00, 0.00);
  const pouring_spoutGeom = new THREE.ExtrudeGeometry(pouring_spoutShape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  pouring_spoutGeom.translate(0, 0, -0.06);
  const pouring_spout = new THREE.Mesh(pouring_spoutGeom, glossy_blackMat);
  pouring_spout.name = "pouring_spout";
  pouring_spout.position.set(-0.68, 3.68, 0);
  lid_group.add(pouring_spout);

  const lid_cap_baseGeom = new THREE.CylinderGeometry(0.29, 0.27, 0.055, 48);
  const lid_cap_base = new THREE.Mesh(lid_cap_baseGeom, glossy_blackMat);
  lid_cap_base.name = "lid_cap_base";
  lid_cap_base.position.y = 3.87;
  lid_group.add(lid_cap_base);

  const lid_capGeom = new THREE.CylinderGeometry(0.24, 0.25, 0.18, 48);
  const lid_cap = new THREE.Mesh(lid_capGeom, frosted_glassMat);
  lid_cap.name = "lid_cap";
  lid_cap.position.y = 3.98;
  lid_group.add(lid_cap);

  const lid_cap_insertGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.17, 40);
  const lid_cap_insert = new THREE.Mesh(lid_cap_insertGeom, glossy_blackMat);
  lid_cap_insert.name = "lid_cap_insert";
  lid_cap_insert.position.y = 3.98;
  lid_group.add(lid_cap_insert);

  const lid_cap_topGeom = new THREE.CylinderGeometry(0.31, 0.29, 0.055, 48);
  const lid_cap_top = new THREE.Mesh(lid_cap_topGeom, glossy_blackMat);
  lid_cap_top.name = "lid_cap_top";
  lid_cap_top.position.y = 4.095;
  lid_group.add(lid_cap_top);

  const lid_cap_top_rimGeom = new THREE.TorusGeometry(0.285, 0.025, 10, 48);
  const lid_cap_top_rim = new THREE.Mesh(lid_cap_top_rimGeom, glossy_blackMat);
  lid_cap_top_rim.name = "lid_cap_top_rim";
  lid_cap_top_rim.rotation.x = Math.PI / 2;
  lid_cap_top_rim.position.y = 4.10;
  lid_group.add(lid_cap_top_rim);

  const handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.65, 3.43, 0),
    new THREE.Vector3(0.84, 3.40, 0),
    new THREE.Vector3(1.06, 3.25, 0),
    new THREE.Vector3(1.16, 3.02, 0),
    new THREE.Vector3(1.17, 2.28, 0),
    new THREE.Vector3(1.10, 2.06, 0),
    new THREE.Vector3(0.91, 1.91, 0),
    new THREE.Vector3(0.61, 1.72, 0)
  ], false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handlePath, 56, 0.115, 16, false);
  const handle = new THREE.Mesh(handleGeom, glossy_blackMat);
  handle.name = "handle";
  handle.scale.z = 0.72;
  handle_group.add(handle);

  const upper_handle_mountGeom = new THREE.BoxGeometry(0.27, 0.28, 0.30);
  const upper_handle_mount = new THREE.Mesh(upper_handle_mountGeom, glossy_blackMat);
  upper_handle_mount.name = "upper_handle_mount";
  upper_handle_mount.position.set(0.66, 3.38, 0);
  upper_handle_mount.rotation.z = -0.16;
  handle_group.add(upper_handle_mount);

  const lower_handle_mountGeom = new THREE.BoxGeometry(0.27, 0.30, 0.30);
  const lower_handle_mount = new THREE.Mesh(lower_handle_mountGeom, glossy_blackMat);
  lower_handle_mount.name = "lower_handle_mount";
  lower_handle_mount.position.set(0.60, 1.78, 0);
  lower_handle_mount.rotation.z = 0.35;
  handle_group.add(lower_handle_mount);

  const handle_grip_insetPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.82, 3.29, 0),
    new THREE.Vector3(1.01, 3.15, 0),
    new THREE.Vector3(1.08, 2.96, 0),
    new THREE.Vector3(1.08, 2.31, 0),
    new THREE.Vector3(1.01, 2.13, 0),
    new THREE.Vector3(0.86, 2.00, 0),
    new THREE.Vector3(0.70, 1.89, 0)
  ], false, "centripetal");
  const handle_grip_insetGeom = new THREE.TubeGeometry(
    handle_grip_insetPath,
    40,
    0.018,
    8,
    false
  );
  const handle_grip_inset = new THREE.Mesh(handle_grip_insetGeom, matte_blackMat);
  handle_grip_inset.name = "handle_grip_inset";
  handle_grip_inset.position.z = 0.087;
  handle_group.add(handle_grip_inset);

  const brand_badgeShape = new THREE.Shape();
  brand_badgeShape.moveTo(-0.20, -0.075);
  brand_badgeShape.bezierCurveTo(-0.25, -0.02, -0.23, 0.08, -0.16, 0.105);
  brand_badgeShape.lineTo(0.15, 0.105);
  brand_badgeShape.bezierCurveTo(0.22, 0.10, 0.24, 0.04, 0.21, -0.015);
  brand_badgeShape.lineTo(0.18, -0.075);
  brand_badgeShape.bezierCurveTo(0.05, -0.11, -0.08, -0.11, -0.20, -0.075);
  const brand_badgeGeom = new THREE.ExtrudeGeometry(brand_badgeShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  const brand_badge = new THREE.Mesh(brand_badgeGeom, glossy_blackMat);
  brand_badge.name = "brand_badge";
  brand_badge.position.set(0.29, 1.10, 0.655);
  brand_badge.rotation.x = -0.16;
  base_group.add(brand_badge);

  const brand_badge_face = new THREE.Mesh(brand_badgeGeom, labelMat);
  brand_badge_face.name = "brand_badge_face";
  brand_badge_face.position.set(0.29, 1.10, 0.679);
  brand_badge_face.rotation.x = -0.16;
  brand_badge_face.scale.set(0.88, 0.76, 0.35);
  base_group.add(brand_badge_face);

  const brand_markGeom = new THREE.TorusGeometry(0.026, 0.004, 6, 16, Math.PI * 1.65);
  const brand_mark = new THREE.Mesh(brand_markGeom, matte_blackMat);
  brand_mark.name = "brand_mark";
  brand_mark.position.set(0.20, 1.11, 0.696);
  brand_mark.rotation.set(-0.16, 0, 0.75);
  base_group.add(brand_mark);

  const brand_text_linesGeom = new THREE.BoxGeometry(0.055, 0.008, 0.006);
  const brand_text_lines = new THREE.InstancedMesh(brand_text_linesGeom, matte_blackMat, 4);
  brand_text_lines.name = "brand_text_lines";
  const brand_dummy = new THREE.Object3D();
  const brand_line_data = [
    [0.27, 1.13, 0.697, 1.00],
    [0.34, 1.12, 0.695, 0.75],
    [0.29, 1.08, 0.697, 1.15],
    [0.37, 1.07, 0.694, 0.60]
  ];
  for (let i = 0; i < brand_line_data.length; i++) {
    brand_dummy.position.set(
      brand_line_data[i][0],
      brand_line_data[i][1],
      brand_line_data[i][2]
    );
    brand_dummy.rotation.set(-0.16, 0, 0);
    brand_dummy.scale.set(brand_line_data[i][3], 1, 1);
    brand_dummy.updateMatrix();
    brand_text_lines.setMatrixAt(i, brand_dummy.matrix);
  }
  brand_text_lines.instanceMatrix.needsUpdate = true;
  base_group.add(brand_text_lines);

  const control_panelShape = new THREE.Shape();
  control_panelShape.moveTo(-0.16, -0.31);
  control_panelShape.lineTo(0.14, -0.31);
  control_panelShape.bezierCurveTo(0.18, -0.31, 0.19, -0.28, 0.19, -0.24);
  control_panelShape.lineTo(0.19, 0.24);
  control_panelShape.bezierCurveTo(0.19, 0.29, 0.16, 0.31, 0.12, 0.31);
  control_panelShape.lineTo(-0.14, 0.31);
  control_panelShape.bezierCurveTo(-0.19, 0.31, -0.20, 0.27, -0.20, 0.22);
  control_panelShape.lineTo(-0.20, -0.26);
  control_panelShape.bezierCurveTo(-0.20, -0.29, -0.19, -0.31, -0.16, -0.31);
  const control_panelGeom = new THREE.ExtrudeGeometry(control_panelShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3
  });
  const control_panel = new THREE.Mesh(control_panelGeom, glossy_blackMat);
  control_panel.name = "control_panel";
  control_panel.position.set(0.31, 0.64, 0.742);
  control_panel.rotation.x = -0.18;
  base_group.add(control_panel);

  const control_displayGeom = new THREE.BoxGeometry(0.31, 0.17, 0.014);
  const control_display = new THREE.Mesh(control_displayGeom, buttonMat);
  control_display.name = "control_display";
  control_display.position.set(0, 0.18, 0.038);
  control_panel.add(control_display);

  const control_buttonsGeom = new THREE.SphereGeometry(1, 18, 10);
  const control_buttons = new THREE.InstancedMesh(control_buttonsGeom, buttonMat, 6);
  control_buttons.name = "control_buttons";
  const button_dummy = new THREE.Object3D();
  const button_positions = [
    [-0.09, 0.02, 0.043],
    [0.09, 0.02, 0.043],
    [-0.09, -0.12, 0.043],
    [0.09, -0.12, 0.043],
    [-0.09, -0.25, 0.043],
    [0.09, -0.25, 0.043]
  ];
  for (let i = 0; i < button_positions.length; i++) {
    button_dummy.position.set(
      button_positions[i][0],
      button_positions[i][1],
      button_positions[i][2]
    );
    button_dummy.rotation.set(0, 0, 0);
    button_dummy.scale.set(0.075, 0.045, 0.012);
    button_dummy.updateMatrix();
    control_buttons.setMatrixAt(i, button_dummy.matrix);
  }
  control_buttons.instanceMatrix.needsUpdate = true;
  control_panel.add(control_buttons);

  const button_labelsGeom = new THREE.BoxGeometry(0.034, 0.006, 0.005);
  const button_labels = new THREE.InstancedMesh(button_labelsGeom, labelMat, 6);
  button_labels.name = "button_labels";
  const label_dummy = new THREE.Object3D();
  for (let i = 0; i < button_positions.length; i++) {
    label_dummy.position.set(button_positions[i][0], button_positions[i][1], 0.058);
    label_dummy.rotation.set(0, 0, i % 2 === 0 ? -0.12 : 0.08);
    label_dummy.scale.set(i === 5 ? 0.75 : 1, 1, 1);
    label_dummy.updateMatrix();
    button_labels.setMatrixAt(i, label_dummy.matrix);
  }
  button_labels.instanceMatrix.needsUpdate = true;
  control_panel.add(button_labels);

  const indicator_lightGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const indicator_light = new THREE.Mesh(indicator_lightGeom, labelMat);
  indicator_light.name = "indicator_light";
  indicator_light.position.set(0, 0.235, 0.055);
  control_panel.add(indicator_light);

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