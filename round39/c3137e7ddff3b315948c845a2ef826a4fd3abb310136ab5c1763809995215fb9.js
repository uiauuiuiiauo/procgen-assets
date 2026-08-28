export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "camera";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x181a1b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const gripMat = new THREE.MeshStandardMaterial({
    color: 0x101213,
    metalness: 0.0,
    roughness: 0.8,
  });
  const darkPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x111212,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xe7e7e4,
    metalness: 0.0,
    roughness: 0.7,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x71898d,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde3e3,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
  });
  const flashReflectorMat = new THREE.MeshStandardMaterial({
    color: 0xe7e7e4,
    metalness: 0.0,
    roughness: 0.4,
  });
  const redLedMat = new THREE.MeshStandardMaterial({
    color: 0xd52b32,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xd52b32,
    emissiveIntensity: 1.0,
  });
  const greenReflectionMat = new THREE.MeshBasicMaterial({
    color: 0x527a54,
    transparent: true,
    opacity: 0.45,
  });
  const purpleReflectionMat = new THREE.MeshBasicMaterial({
    color: 0x563a5f,
    transparent: true,
    opacity: 0.35,
  });

  function roundedRectGeometry(width, height, depth, radius, bevel) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelSegments: 2,
      bevelSize: bevel,
      bevelThickness: bevel,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const main_bodyGeom = roundedRectGeometry(3.4, 2.35, 0.82, 0.25, 0.055);
  const main_body = new THREE.Mesh(main_bodyGeom, bodyMat);
  main_body.name = "main_body";
  main_body.position.set(0, -0.02, 0);
  root.add(main_body);

  const top_shoulderShape = new THREE.Shape();
  top_shoulderShape.moveTo(-1.7, 0.58);
  top_shoulderShape.lineTo(1.7, 0.58);
  top_shoulderShape.lineTo(1.57, 1.08);
  top_shoulderShape.lineTo(1.28, 1.27);
  top_shoulderShape.lineTo(0.68, 1.36);
  top_shoulderShape.lineTo(-0.72, 1.36);
  top_shoulderShape.lineTo(-1.22, 1.24);
  top_shoulderShape.lineTo(-1.58, 1.02);
  top_shoulderShape.closePath();
  const top_shoulderGeom = new THREE.ExtrudeGeometry(top_shoulderShape, {
    depth: 0.88,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.045,
    bevelThickness: 0.045,
  });
  top_shoulderGeom.translate(0, 0, -0.44);
  const top_shoulder = new THREE.Mesh(top_shoulderGeom, bodyMat);
  top_shoulder.name = "top_shoulder";
  root.add(top_shoulder);

  const bottom_edgeGeom = roundedRectGeometry(3.18, 0.22, 0.72, 0.1, 0.025);
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, darkPlasticMat);
  bottom_edge.name = "bottom_edge";
  bottom_edge.position.set(0, -1.13, 0.01);
  root.add(bottom_edge);

  const grip_bulgeGeom = new THREE.SphereGeometry(1, 32, 20);
  const grip_bulge = new THREE.Mesh(grip_bulgeGeom, gripMat);
  grip_bulge.name = "grip_bulge";
  grip_bulge.position.set(-1.28, -0.28, 0.34);
  grip_bulge.scale.set(0.68, 1.0, 0.28);
  root.add(grip_bulge);

  const grip_front_panelGeom = roundedRectGeometry(0.98, 1.72, 0.055, 0.18, 0.018);
  const grip_front_panel = new THREE.Mesh(grip_front_panelGeom, gripMat);
  grip_front_panel.name = "grip_front_panel";
  grip_front_panel.position.set(-1.25, -0.29, 0.61);
  root.add(grip_front_panel);

  const grip_seamGeom = new THREE.BoxGeometry(0.018, 1.48, 0.018);
  const grip_seam = new THREE.Mesh(grip_seamGeom, darkPlasticMat);
  grip_seam.name = "grip_seam";
  grip_seam.position.set(-1.72, -0.3, 0.655);
  root.add(grip_seam);

  const grip_textureGeom = new THREE.SphereGeometry(0.028, 6, 4);
  const grip_texture = new THREE.InstancedMesh(grip_textureGeom, gripMat, 42);
  grip_texture.name = "grip_texture";
  const grip_textureDummy = new THREE.Object3D();
  let grip_textureIndex = 0;
  for (let row = 0; row < 7; row++) {
    for (let column = 0; column < 6; column++) {
      const offset = row % 2 === 0 ? 0 : 0.045;
      grip_textureDummy.position.set(
        -1.59 + column * 0.135 + offset,
        -0.88 + row * 0.2,
        0.65
      );
      grip_textureDummy.rotation.set(0, 0, (row + column) * 0.17);
      grip_textureDummy.scale.set(1.0, 0.58, 0.28);
      grip_textureDummy.updateMatrix();
      grip_texture.setMatrixAt(grip_textureIndex++, grip_textureDummy.matrix);
    }
  }
  grip_texture.instanceMatrix.needsUpdate = true;
  root.add(grip_texture);

  const viewfinder_housingShape = new THREE.Shape();
  viewfinder_housingShape.moveTo(-0.67, 0.72);
  viewfinder_housingShape.lineTo(0.67, 0.72);
  viewfinder_housingShape.lineTo(0.59, 1.36);
  viewfinder_housingShape.lineTo(0.43, 1.55);
  viewfinder_housingShape.lineTo(-0.43, 1.55);
  viewfinder_housingShape.lineTo(-0.59, 1.36);
  viewfinder_housingShape.closePath();
  const viewfinder_housingGeom = new THREE.ExtrudeGeometry(viewfinder_housingShape, {
    depth: 0.72,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.045,
    bevelThickness: 0.045,
  });
  viewfinder_housingGeom.translate(0, 0, -0.36);
  const viewfinder_housing = new THREE.Mesh(viewfinder_housingGeom, darkPlasticMat);
  viewfinder_housing.name = "viewfinder_housing";
  viewfinder_housing.position.z = 0.2;
  root.add(viewfinder_housing);

  const viewfinder_bezelGeom = roundedRectGeometry(1.08, 0.59, 0.09, 0.1, 0.02);
  const viewfinder_bezel = new THREE.Mesh(viewfinder_bezelGeom, rubberMat);
  viewfinder_bezel.name = "viewfinder_bezel";
  viewfinder_bezel.position.set(0, 1.13, 0.62);
  root.add(viewfinder_bezel);

  const viewfinder_backingGeom = roundedRectGeometry(0.88, 0.42, 0.025, 0.055, 0.008);
  const viewfinder_backing = new THREE.Mesh(viewfinder_backingGeom, darkPlasticMat);
  viewfinder_backing.name = "viewfinder_backing";
  viewfinder_backing.position.set(0, 1.13, 0.675);
  root.add(viewfinder_backing);

  const viewfinder_glassGeom = roundedRectGeometry(0.84, 0.38, 0.025, 0.045, 0.006);
  const viewfinder_glass = new THREE.Mesh(viewfinder_glassGeom, glassMat);
  viewfinder_glass.name = "viewfinder_glass";
  viewfinder_glass.position.set(0, 1.13, 0.7);
  root.add(viewfinder_glass);

  const viewfinder_reflectionGeom = new THREE.PlaneGeometry(0.24, 0.3);
  const viewfinder_reflection = new THREE.Mesh(viewfinder_reflectionGeom, greenReflectionMat);
  viewfinder_reflection.name = "viewfinder_reflection";
  viewfinder_reflection.position.set(-0.22, 1.14, 0.718);
  viewfinder_reflection.rotation.z = -0.08;
  root.add(viewfinder_reflection);

  const hotshoe_baseGeom = new THREE.BoxGeometry(0.64, 0.075, 0.36);
  const hotshoe_base = new THREE.Mesh(hotshoe_baseGeom, darkPlasticMat);
  hotshoe_base.name = "hotshoe_base";
  hotshoe_base.position.set(0, 1.56, -0.02);
  root.add(hotshoe_base);

  const flash_assembly = new THREE.Group();
  flash_assembly.name = "flash_assembly";
  flash_assembly.position.set(0, 1.96, 0.02);
  root.add(flash_assembly);

  const flash_housingGeom = roundedRectGeometry(1.45, 0.76, 0.48, 0.16, 0.045);
  const flash_housing = new THREE.Mesh(flash_housingGeom, darkPlasticMat);
  flash_housing.name = "flash_housing";
  flash_assembly.add(flash_housing);

  const flash_side_capGeom = new THREE.SphereGeometry(1, 20, 12);
  const flash_side_cap = new THREE.Mesh(flash_side_capGeom, rubberMat);
  flash_side_cap.name = "flash_side_cap";
  flash_side_cap.position.set(-0.7, 0, -0.015);
  flash_side_cap.scale.set(0.14, 0.34, 0.22);
  flash_assembly.add(flash_side_cap);

  const flash_bezelGeom = roundedRectGeometry(1.12, 0.51, 0.065, 0.09, 0.018);
  const flash_bezel = new THREE.Mesh(flash_bezelGeom, rubberMat);
  flash_bezel.name = "flash_bezel";
  flash_bezel.position.z = 0.285;
  flash_assembly.add(flash_bezel);

  const flash_reflectorGeom = roundedRectGeometry(0.94, 0.37, 0.025, 0.05, 0.006);
  const flash_reflector = new THREE.Mesh(flash_reflectorGeom, flashReflectorMat);
  flash_reflector.name = "flash_reflector";
  flash_reflector.position.z = 0.33;
  flash_assembly.add(flash_reflector);

  const flash_glassGeom = roundedRectGeometry(0.91, 0.34, 0.025, 0.045, 0.005);
  const flash_glass = new THREE.Mesh(flash_glassGeom, frostedGlassMat);
  flash_glass.name = "flash_glass";
  flash_glass.position.z = 0.355;
  flash_assembly.add(flash_glass);

  const flash_horizontal_reflectorGeom = new THREE.BoxGeometry(0.78, 0.027, 0.012);
  const flash_horizontal_reflector = new THREE.InstancedMesh(
    flash_horizontal_reflectorGeom,
    silverMat,
    2
  );
  flash_horizontal_reflector.name = "flash_horizontal_reflector";
  const flash_reflectorDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    flash_reflectorDummy.position.set(0, i === 0 ? -0.085 : 0.085, 0.374);
    flash_reflectorDummy.rotation.set(0, 0, 0);
    flash_reflectorDummy.scale.set(1, 1, 1);
    flash_reflectorDummy.updateMatrix();
    flash_horizontal_reflector.setMatrixAt(i, flash_reflectorDummy.matrix);
  }
  flash_horizontal_reflector.instanceMatrix.needsUpdate = true;
  flash_assembly.add(flash_horizontal_reflector);

  const flash_vertical_reflectorGeom = new THREE.BoxGeometry(0.025, 0.28, 0.012);
  const flash_vertical_reflector = new THREE.Mesh(
    flash_vertical_reflectorGeom,
    silverMat
  );
  flash_vertical_reflector.name = "flash_vertical_reflector";
  flash_vertical_reflector.position.set(0.37, 0, 0.374);
  flash_assembly.add(flash_vertical_reflector);

  const left_control_dialGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.13, 32);
  const left_control_dial = new THREE.Mesh(left_control_dialGeom, rubberMat);
  left_control_dial.name = "left_control_dial";
  left_control_dial.position.set(-1.18, 1.39, 0.02);
  root.add(left_control_dial);

  const center_control_dialGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.13, 32);
  const center_control_dial = new THREE.Mesh(center_control_dialGeom, rubberMat);
  center_control_dial.name = "center_control_dial";
  center_control_dial.position.set(-0.61, 1.43, 0.01);
  root.add(center_control_dial);

  const right_control_dialGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.14, 36);
  const right_control_dial = new THREE.Mesh(right_control_dialGeom, rubberMat);
  right_control_dial.name = "right_control_dial";
  right_control_dial.position.set(1.23, 1.32, -0.03);
  root.add(right_control_dial);

  const control_dial_knurlGeom = new THREE.BoxGeometry(0.055, 0.105, 0.035);
  const control_dial_knurl = new THREE.InstancedMesh(
    control_dial_knurlGeom,
    darkPlasticMat,
    54
  );
  control_dial_knurl.name = "control_dial_knurl";
  const dial_knurlDummy = new THREE.Object3D();
  const dial_centers = [
    { x: -1.18, y: 1.39, z: 0.02, r: 0.295 },
    { x: -0.61, y: 1.43, z: 0.01, r: 0.275 },
    { x: 1.23, y: 1.32, z: -0.03, r: 0.345 },
  ];
  let dial_knurlIndex = 0;
  for (const dial of dial_centers) {
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      dial_knurlDummy.position.set(
        dial.x + Math.cos(angle) * dial.r,
        dial.y,
        dial.z + Math.sin(angle) * dial.r
      );
      dial_knurlDummy.rotation.set(0, -angle, 0);
      dial_knurlDummy.scale.set(1, 1, 1);
      dial_knurlDummy.updateMatrix();
      control_dial_knurl.setMatrixAt(dial_knurlIndex++, dial_knurlDummy.matrix);
    }
  }
  control_dial_knurl.instanceMatrix.needsUpdate = true;
  root.add(control_dial_knurl);

  const shutter_button_rimGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 28);
  const shutter_button_rim = new THREE.Mesh(shutter_button_rimGeom, darkPlasticMat);
  shutter_button_rim.name = "shutter_button_rim";
  shutter_button_rim.position.set(-0.99, 1.24, 0.5);
  root.add(shutter_button_rim);

  const shutter_buttonGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.085, 24);
  const shutter_button = new THREE.Mesh(shutter_buttonGeom, rubberMat);
  shutter_button.name = "shutter_button";
  shutter_button.position.set(-0.99, 1.3, 0.5);
  root.add(shutter_button);

  const function_buttonGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.055, 24);
  const function_button = new THREE.Mesh(function_buttonGeom, rubberMat);
  function_button.name = "function_button";
  function_button.rotation.x = Math.PI / 2;
  function_button.position.set(-0.48, 0.82, 0.59);
  root.add(function_button);

  const mode_buttonGeom = new THREE.CylinderGeometry(0.115, 0.115, 0.05, 24);
  const mode_button = new THREE.Mesh(mode_buttonGeom, darkPlasticMat);
  mode_button.name = "mode_button";
  mode_button.rotation.x = Math.PI / 2;
  mode_button.position.set(-1.48, 1.02, 0.55);
  root.add(mode_button);

  const top_labelGeom = new THREE.BoxGeometry(0.07, 0.012, 0.025);
  const top_label = new THREE.InstancedMesh(top_labelGeom, markingMat, 5);
  top_label.name = "top_label";
  const top_labelDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    top_labelDummy.position.set(-0.91 + i * 0.12, 1.31, 0.535);
    top_labelDummy.rotation.set(0, 0, i % 2 === 0 ? 0 : 0.12);
    top_labelDummy.scale.set(1, 1, 1);
    top_labelDummy.updateMatrix();
    top_label.setMatrixAt(i, top_labelDummy.matrix);
  }
  top_label.instanceMatrix.needsUpdate = true;
  root.add(top_label);

  const lens_assembly = new THREE.Group();
  lens_assembly.name = "lens_assembly";
  lens_assembly.position.set(0.43, -0.27, 0);
  root.add(lens_assembly);

  const lens_mountGeom = new THREE.CylinderGeometry(1.04, 1.04, 0.18, 64);
  const lens_mount = new THREE.Mesh(lens_mountGeom, darkPlasticMat);
  lens_mount.name = "lens_mount";
  lens_mount.rotation.x = Math.PI / 2;
  lens_mount.position.z = 0.54;
  lens_assembly.add(lens_mount);

  const lens_mount_ringGeom = new THREE.TorusGeometry(0.98, 0.026, 10, 64);
  const lens_mount_ring = new THREE.Mesh(lens_mount_ringGeom, silverMat);
  lens_mount_ring.name = "lens_mount_ring";
  lens_mount_ring.position.z = 0.65;
  lens_assembly.add(lens_mount_ring);

  const rear_lens_barrelGeom = new THREE.CylinderGeometry(0.92, 0.92, 0.35, 64);
  const rear_lens_barrel = new THREE.Mesh(rear_lens_barrelGeom, rubberMat);
  rear_lens_barrel.name = "rear_lens_barrel";
  rear_lens_barrel.rotation.x = Math.PI / 2;
  rear_lens_barrel.position.z = 0.79;
  lens_assembly.add(rear_lens_barrel);

  const focus_ringGeom = new THREE.CylinderGeometry(0.98, 0.98, 0.29, 64);
  const focus_ring = new THREE.Mesh(focus_ringGeom, rubberMat);
  focus_ring.name = "focus_ring";
  focus_ring.rotation.x = Math.PI / 2;
  focus_ring.position.z = 1.02;
  lens_assembly.add(focus_ring);

  const lens_knurlGeom = new THREE.BoxGeometry(0.055, 0.135, 0.05);
  const lens_knurl = new THREE.InstancedMesh(lens_knurlGeom, darkPlasticMat, 56);
  lens_knurl.name = "lens_knurl";
  const lens_knurlDummy = new THREE.Object3D();
  for (let i = 0; i < 56; i++) {
    const angle = (i / 56) * Math.PI * 2;
    lens_knurlDummy.position.set(
      Math.cos(angle) * 0.985,
      Math.sin(angle) * 0.985,
      1.105
    );
    lens_knurlDummy.rotation.set(0, 0, angle);
    lens_knurlDummy.scale.set(1, 1, 1);
    lens_knurlDummy.updateMatrix();
    lens_knurl.setMatrixAt(i, lens_knurlDummy.matrix);
  }
  lens_knurl.instanceMatrix.needsUpdate = true;
  lens_assembly.add(lens_knurl);

  const front_lens_bezelGeom = new THREE.CylinderGeometry(0.88, 0.88, 0.24, 64);
  const front_lens_bezel = new THREE.Mesh(front_lens_bezelGeom, darkPlasticMat);
  front_lens_bezel.name = "front_lens_bezel";
  front_lens_bezel.rotation.x = Math.PI / 2;
  front_lens_bezel.position.z = 1.23;
  lens_assembly.add(front_lens_bezel);

  const front_lens_rimGeom = new THREE.TorusGeometry(0.78, 0.055, 12, 64);
  const front_lens_rim = new THREE.Mesh(front_lens_rimGeom, rubberMat);
  front_lens_rim.name = "front_lens_rim";
  front_lens_rim.position.z = 1.365;
  lens_assembly.add(front_lens_rim);

  const lens_faceGeom = new THREE.CylinderGeometry(0.66, 0.66, 0.045, 64);
  const lens_face = new THREE.Mesh(lens_faceGeom, darkPlasticMat);
  lens_face.name = "lens_face";
  lens_face.rotation.x = Math.PI / 2;
  lens_face.position.z = 1.37;
  lens_assembly.add(lens_face);

  const lens_inner_ringGeom = new THREE.TorusGeometry(0.59, 0.025, 10, 64);
  const lens_inner_ring = new THREE.Mesh(lens_inner_ringGeom, rubberMat);
  lens_inner_ring.name = "lens_inner_ring";
  lens_inner_ring.position.z = 1.402;
  lens_assembly.add(lens_inner_ring);

  const lens_glassGeom = new THREE.CylinderGeometry(0.555, 0.555, 0.025, 64);
  const lens_glass = new THREE.Mesh(lens_glassGeom, glassMat);
  lens_glass.name = "lens_glass";
  lens_glass.rotation.x = Math.PI / 2;
  lens_glass.position.z = 1.415;
  lens_assembly.add(lens_glass);

  const lens_green_reflectionGeom = new THREE.CircleGeometry(0.2, 32);
  const lens_green_reflection = new THREE.Mesh(
    lens_green_reflectionGeom,
    greenReflectionMat
  );
  lens_green_reflection.name = "lens_green_reflection";
  lens_green_reflection.position.set(-0.19, 0.2, 1.432);
  lens_green_reflection.scale.set(1.25, 0.48, 1);
  lens_assembly.add(lens_green_reflection);

  const lens_purple_reflectionGeom = new THREE.CircleGeometry(0.16, 32);
  const lens_purple_reflection = new THREE.Mesh(
    lens_purple_reflectionGeom,
    purpleReflectionMat
  );
  lens_purple_reflection.name = "lens_purple_reflection";
  lens_purple_reflection.position.set(0.12, -0.17, 1.434);
  lens_purple_reflection.scale.set(1.4, 0.42, 1);
  lens_assembly.add(lens_purple_reflection);

  const lens_markingGeom = new THREE.BoxGeometry(0.075, 0.018, 0.012);
  const lens_markings = new THREE.InstancedMesh(lens_markingGeom, markingMat, 18);
  lens_markings.name = "lens_markings";
  const lens_markingDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + 0.08;
    lens_markingDummy.position.set(
      Math.cos(angle) * 0.78,
      Math.sin(angle) * 0.78,
      1.397
    );
    lens_markingDummy.rotation.set(0, 0, angle + Math.PI / 2);
    lens_markingDummy.scale.set(i % 3 === 0 ? 1.35 : 0.75, 1, 1);
    lens_markingDummy.updateMatrix();
    lens_markings.setMatrixAt(i, lens_markingDummy.matrix);
  }
  lens_markings.instanceMatrix.needsUpdate = true;
  lens_assembly.add(lens_markings);

  const lens_alignment_dotGeom = new THREE.SphereGeometry(0.035, 12, 8);
  const lens_alignment_dot = new THREE.Mesh(lens_alignment_dotGeom, redLedMat);
  lens_alignment_dot.name = "lens_alignment_dot";
  lens_alignment_dot.position.set(-0.63, 0.63, 1.405);
  lens_assembly.add(lens_alignment_dot);

  const aperture_buttonGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.045, 20);
  const aperture_button = new THREE.Mesh(aperture_buttonGeom, silverMat);
  aperture_button.name = "aperture_button";
  aperture_button.rotation.x = Math.PI / 2;
  aperture_button.position.set(1.34, 0.64, 0.57);
  root.add(aperture_button);

  const sensor_dotGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16);
  const sensor_dot = new THREE.Mesh(sensor_dotGeom, glassMat);
  sensor_dot.name = "sensor_dot";
  sensor_dot.rotation.x = Math.PI / 2;
  sensor_dot.position.set(1.6, 0.66, 0.57);
  root.add(sensor_dot);

  const af_lampGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.035, 16);
  const af_lamp = new THREE.Mesh(af_lampGeom, redLedMat);
  af_lamp.name = "af_lamp";
  af_lamp.rotation.x = Math.PI / 2;
  af_lamp.position.set(-0.48, 0.55, 0.57);
  root.add(af_lamp);

  const strap_bracketGeom = new THREE.BoxGeometry(0.16, 0.22, 0.24);
  const strap_bracket = new THREE.Mesh(strap_bracketGeom, darkPlasticMat);
  strap_bracket.name = "strap_bracket";
  strap_bracket.position.set(1.75, 0.72, 0.02);
  root.add(strap_bracket);

  const strap_lugGeom = new THREE.TorusGeometry(0.105, 0.032, 10, 28);
  const strap_lug = new THREE.Mesh(strap_lugGeom, silverMat);
  strap_lug.name = "strap_lug";
  strap_lug.position.set(1.88, 0.76, 0.05);
  root.add(strap_lug);

  const left_lid_seamGeom = new THREE.BoxGeometry(0.43, 0.025, 0.035);
  const left_lid_seam = new THREE.Mesh(left_lid_seamGeom, darkPlasticMat);
  left_lid_seam.name = "left_lid_seam";
  left_lid_seam.position.set(-1.48, -0.92, 0.59);
  root.add(left_lid_seam);

  const battery_latchGeom = new THREE.BoxGeometry(0.12, 0.22, 0.045);
  const battery_latch = new THREE.Mesh(battery_latchGeom, rubberMat);
  battery_latch.name = "battery_latch";
  battery_latch.position.set(-1.7, -0.35, 0.56);
  root.add(battery_latch);

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