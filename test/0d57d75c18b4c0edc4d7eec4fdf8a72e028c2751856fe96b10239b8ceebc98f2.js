export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_camera";

  const camera = new THREE.Group();
  camera.name = "camera";
  root.add(camera);

  const bodyW = 1.28;
  const bodyH = 0.88;
  const bodyD = 0.28;
  const bodyY = -0.08;
  const lensX = 0.25;
  const lensY = -0.10;

  const brushed_silverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x2b211c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leather_textureMat = new THREE.MeshStandardMaterial({
    color: 0x3b2921,
    metalness: 0.0,
    roughness: 0.7,
  });
  const strap_leatherMat = new THREE.MeshStandardMaterial({
    color: 0x9a5428,
    metalness: 0.0,
    roughness: 0.7,
  });
  const strap_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x4b291b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const black_glossMat = new THREE.MeshStandardMaterial({
    color: 0x10110f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const viewfinder_glassMat = new THREE.MeshStandardMaterial({
    color: 0x211d18,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lens_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x718779,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0xd8d1b9,
    metalness: 0.0,
    roughness: 0.7,
  });
  const red_markMat = new THREE.MeshStandardMaterial({
    color: 0x9b3227,
    metalness: 0.0,
    roughness: 0.7,
  });
  const reflection_greenMat = new THREE.MeshBasicMaterial({
    color: 0x9db8a2,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
  });
  const reflection_warmMat = new THREE.MeshBasicMaterial({
    color: 0xd2b49f,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function roundedExtrude(w, h, d, r, bevel) {
    return new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth: d,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8,
    });
  }

  const camera_bodyGeom = roundedExtrude(bodyW, bodyH, bodyD, 0.065, 0.012);
  const camera_body = new THREE.Mesh(camera_bodyGeom, leatherMat);
  camera_body.name = "camera_body";
  camera_body.position.set(0, bodyY, -bodyD / 2);
  camera.add(camera_body);

  const silver_topShape = new THREE.Shape();
  silver_topShape.moveTo(-0.61, 0.12);
  silver_topShape.lineTo(0.61, 0.12);
  silver_topShape.lineTo(0.625, 0.25);
  silver_topShape.quadraticCurveTo(0.625, 0.33, 0.545, 0.34);
  silver_topShape.lineTo(-0.545, 0.34);
  silver_topShape.quadraticCurveTo(-0.625, 0.33, -0.625, 0.25);
  silver_topShape.closePath();

  const silver_top_housingGeom = new THREE.ExtrudeGeometry(silver_topShape, {
    depth: 0.3,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const silver_top_housing = new THREE.Mesh(
    silver_top_housingGeom,
    brushed_silverMat
  );
  silver_top_housing.name = "silver_top_housing";
  silver_top_housing.position.z = -0.15;
  camera.add(silver_top_housing);

  const leather_seamGeom = new THREE.BoxGeometry(1.18, 0.012, 0.012);
  const leather_seam = new THREE.Mesh(leather_seamGeom, dark_metalMat);
  leather_seam.name = "leather_seam";
  leather_seam.position.set(0, 0.123, 0.169);
  camera.add(leather_seam);

  const bottom_trimGeom = roundedExtrude(1.18, 0.075, 0.025, 0.025, 0.006);
  const bottom_trim = new THREE.Mesh(bottom_trimGeom, brushed_silverMat);
  bottom_trim.name = "bottom_trim";
  bottom_trim.position.set(0, -0.493, 0.145);
  camera.add(bottom_trim);

  const leather_textureGeom = new THREE.SphereGeometry(0.014, 6, 4);
  const leather_texture = new THREE.InstancedMesh(
    leather_textureGeom,
    leather_textureMat,
    72
  );
  leather_texture.name = "leather_texture";
  const leather_dummy = new THREE.Object3D();
  let leather_index = 0;
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 12; col++) {
      const x = -0.55 + col * 0.1 + (row % 2) * 0.016;
      const y = -0.415 + row * 0.076;
      const dx = x - lensX;
      const dy = y - lensY;
      if (dx * dx + dy * dy < 0.14) continue;
      leather_dummy.position.set(x, y, 0.162);
      leather_dummy.rotation.set(0, 0, ((row + col) % 3 - 1) * 0.22);
      leather_dummy.scale.set(1.0, 0.55, 0.22);
      leather_dummy.updateMatrix();
      leather_texture.setMatrixAt(leather_index++, leather_dummy.matrix);
    }
  }
  leather_texture.instanceMatrix.needsUpdate = true;
  camera.add(leather_texture);

  const prismShape = new THREE.Shape();
  prismShape.moveTo(-0.19, 0.335);
  prismShape.lineTo(0.31, 0.335);
  prismShape.lineTo(0.245, 0.455);
  prismShape.lineTo(0.055, 0.555);
  prismShape.lineTo(-0.13, 0.525);
  prismShape.closePath();

  const prism_housingGeom = new THREE.ExtrudeGeometry(prismShape, {
    depth: 0.23,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.009,
    bevelSegments: 2,
  });
  const prism_housing = new THREE.Mesh(prism_housingGeom, silverMat);
  prism_housing.name = "prism_housing";
  prism_housing.position.z = -0.115;
  camera.add(prism_housing);

  const viewfinder_frameGeom = roundedExtrude(0.235, 0.15, 0.025, 0.018, 0.005);
  const viewfinder_frame = new THREE.Mesh(viewfinder_frameGeom, silverMat);
  viewfinder_frame.name = "viewfinder_frame";
  viewfinder_frame.position.set(0.19, 0.235, 0.158);
  camera.add(viewfinder_frame);

  const viewfinder_glassGeom = new THREE.BoxGeometry(0.18, 0.105, 0.012);
  const viewfinder_glass = new THREE.Mesh(
    viewfinder_glassGeom,
    viewfinder_glassMat
  );
  viewfinder_glass.name = "viewfinder_glass";
  viewfinder_glass.position.set(0.19, 0.235, 0.194);
  camera.add(viewfinder_glass);

  const rangefinder_frameGeom = roundedExtrude(0.185, 0.145, 0.025, 0.016, 0.005);
  const rangefinder_frame = new THREE.Mesh(rangefinder_frameGeom, silverMat);
  rangefinder_frame.name = "rangefinder_frame";
  rangefinder_frame.position.set(0.475, 0.235, 0.158);
  camera.add(rangefinder_frame);

  const rangefinder_glassGeom = new THREE.BoxGeometry(0.135, 0.102, 0.012);
  const rangefinder_glass = new THREE.Mesh(
    rangefinder_glassGeom,
    viewfinder_glassMat
  );
  rangefinder_glass.name = "rangefinder_glass";
  rangefinder_glass.position.set(0.475, 0.235, 0.194);
  camera.add(rangefinder_glass);

  const viewfinder_reflectionGeom = new THREE.CircleGeometry(0.025, 16);
  const viewfinder_reflection = new THREE.Mesh(
    viewfinder_reflectionGeom,
    reflection_warmMat
  );
  viewfinder_reflection.name = "viewfinder_reflection";
  viewfinder_reflection.scale.set(0.7, 1.25, 1);
  viewfinder_reflection.position.set(0.145, 0.258, 0.202);
  camera.add(viewfinder_reflection);

  const rangefinder_reflectionGeom = new THREE.CircleGeometry(0.018, 14);
  const rangefinder_reflection = new THREE.Mesh(
    rangefinder_reflectionGeom,
    reflection_greenMat
  );
  rangefinder_reflection.name = "rangefinder_reflection";
  rangefinder_reflection.scale.set(0.65, 1.3, 1);
  rangefinder_reflection.position.set(0.447, 0.255, 0.202);
  camera.add(rangefinder_reflection);

  const front_screw_rimGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.014, 24);
  const front_screw_rim = new THREE.Mesh(front_screw_rimGeom, dark_metalMat);
  front_screw_rim.name = "front_screw_rim";
  front_screw_rim.rotation.x = Math.PI / 2;
  front_screw_rim.position.set(-0.17, 0.235, 0.176);
  camera.add(front_screw_rim);

  const front_screwGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.018, 24);
  const front_screw = new THREE.Mesh(front_screwGeom, silverMat);
  front_screw.name = "front_screw";
  front_screw.rotation.x = Math.PI / 2;
  front_screw.position.set(-0.17, 0.235, 0.185);
  camera.add(front_screw);

  const body_rivetGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.014, 20);
  const body_rivet = new THREE.Mesh(body_rivetGeom, silverMat);
  body_rivet.name = "body_rivet";
  body_rivet.rotation.x = Math.PI / 2;
  body_rivet.position.set(-0.16, -0.065, 0.178);
  camera.add(body_rivet);

  const rewind_knobGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.05, 32);
  const rewind_knob = new THREE.Mesh(rewind_knobGeom, silverMat);
  rewind_knob.name = "rewind_knob";
  rewind_knob.position.set(-0.48, 0.39, 0.015);
  camera.add(rewind_knob);

  const rewind_knob_capGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.012, 32);
  const rewind_knob_cap = new THREE.Mesh(rewind_knob_capGeom, chromeMat);
  rewind_knob_cap.name = "rewind_knob_cap";
  rewind_knob_cap.position.set(-0.48, 0.421, 0.015);
  camera.add(rewind_knob_cap);

  const rewind_knob_ridgeGeom = new THREE.BoxGeometry(0.012, 0.043, 0.022);
  const rewind_knob_ridges = new THREE.InstancedMesh(
    rewind_knob_ridgeGeom,
    dark_metalMat,
    18
  );
  rewind_knob_ridges.name = "rewind_knob_ridges";
  const rewind_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    rewind_dummy.position.set(
      -0.48 + Math.cos(a) * 0.081,
      0.39,
      0.015 + Math.sin(a) * 0.081
    );
    rewind_dummy.rotation.set(0, -a, 0);
    rewind_dummy.scale.set(1, 1, 1);
    rewind_dummy.updateMatrix();
    rewind_knob_ridges.setMatrixAt(i, rewind_dummy.matrix);
  }
  rewind_knob_ridges.instanceMatrix.needsUpdate = true;
  camera.add(rewind_knob_ridges);

  const shutter_speed_dialGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.058, 36);
  const shutter_speed_dial = new THREE.Mesh(
    shutter_speed_dialGeom,
    dark_metalMat
  );
  shutter_speed_dial.name = "shutter_speed_dial";
  shutter_speed_dial.position.set(-0.25, 0.402, -0.025);
  camera.add(shutter_speed_dial);

  const shutter_speed_capGeom = new THREE.CylinderGeometry(0.087, 0.087, 0.012, 36);
  const shutter_speed_cap = new THREE.Mesh(shutter_speed_capGeom, silverMat);
  shutter_speed_cap.name = "shutter_speed_cap";
  shutter_speed_cap.position.set(-0.25, 0.438, -0.025);
  camera.add(shutter_speed_cap);

  const shutter_dial_ridgeGeom = new THREE.BoxGeometry(0.014, 0.05, 0.024);
  const shutter_dial_ridges = new THREE.InstancedMesh(
    shutter_dial_ridgeGeom,
    silverMat,
    22
  );
  shutter_dial_ridges.name = "shutter_dial_ridges";
  const shutter_dummy = new THREE.Object3D();
  for (let i = 0; i < 22; i++) {
    const a = (i / 22) * Math.PI * 2;
    shutter_dummy.position.set(
      -0.25 + Math.cos(a) * 0.103,
      0.402,
      -0.025 + Math.sin(a) * 0.103
    );
    shutter_dummy.rotation.set(0, -a, 0);
    shutter_dummy.scale.set(1, 1, 1);
    shutter_dummy.updateMatrix();
    shutter_dial_ridges.setMatrixAt(i, shutter_dummy.matrix);
  }
  shutter_dial_ridges.instanceMatrix.needsUpdate = true;
  camera.add(shutter_dial_ridges);

  const shutter_button_baseGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.025, 24);
  const shutter_button_base = new THREE.Mesh(
    shutter_button_baseGeom,
    dark_metalMat
  );
  shutter_button_base.name = "shutter_button_base";
  shutter_button_base.position.set(0.5, 0.365, 0.01);
  camera.add(shutter_button_base);

  const shutter_buttonGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.025, 24);
  const shutter_button = new THREE.Mesh(shutter_buttonGeom, chromeMat);
  shutter_button.name = "shutter_button";
  shutter_button.position.set(0.5, 0.391, 0.01);
  camera.add(shutter_button);

  const hot_shoe_baseGeom = new THREE.BoxGeometry(0.18, 0.018, 0.11);
  const hot_shoe_base = new THREE.Mesh(hot_shoe_baseGeom, dark_metalMat);
  hot_shoe_base.name = "hot_shoe_base";
  hot_shoe_base.position.set(0.02, 0.548, -0.025);
  camera.add(hot_shoe_base);

  const hot_shoe_railGeom = new THREE.BoxGeometry(0.025, 0.018, 0.11);
  const hot_shoe_rails = new THREE.InstancedMesh(
    hot_shoe_railGeom,
    silverMat,
    2
  );
  hot_shoe_rails.name = "hot_shoe_rails";
  const rail_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    rail_dummy.position.set(i === 0 ? -0.055 : 0.095, 0.565, -0.025);
    rail_dummy.rotation.set(0, 0, 0);
    rail_dummy.scale.set(1, 1, 1);
    rail_dummy.updateMatrix();
    hot_shoe_rails.setMatrixAt(i, rail_dummy.matrix);
  }
  hot_shoe_rails.instanceMatrix.needsUpdate = true;
  camera.add(hot_shoe_rails);

  const lens_mountGeom = new THREE.CylinderGeometry(0.305, 0.305, 0.07, 48);
  const lens_mount = new THREE.Mesh(lens_mountGeom, dark_metalMat);
  lens_mount.name = "lens_mount";
  lens_mount.rotation.x = Math.PI / 2;
  lens_mount.position.set(lensX, lensY, 0.195);
  camera.add(lens_mount);

  const lens_mount_ringGeom = new THREE.TorusGeometry(0.278, 0.016, 10, 48);
  const lens_mount_ring = new THREE.Mesh(lens_mount_ringGeom, silverMat);
  lens_mount_ring.name = "lens_mount_ring";
  lens_mount_ring.position.set(lensX, lensY, 0.232);
  camera.add(lens_mount_ring);

  const lens_barrelGeom = new THREE.CylinderGeometry(0.265, 0.278, 0.105, 48);
  const lens_barrel = new THREE.Mesh(lens_barrelGeom, black_glossMat);
  lens_barrel.name = "lens_barrel";
  lens_barrel.rotation.x = Math.PI / 2;
  lens_barrel.position.set(lensX, lensY, 0.275);
  camera.add(lens_barrel);

  const focus_ringGeom = new THREE.TorusGeometry(0.245, 0.027, 12, 48);
  const focus_ring = new THREE.Mesh(focus_ringGeom, dark_metalMat);
  focus_ring.name = "focus_ring";
  focus_ring.position.set(lensX, lensY, 0.329);
  camera.add(focus_ring);

  const focus_gripGeom = new THREE.BoxGeometry(0.018, 0.047, 0.026);
  const focus_grip_ridges = new THREE.InstancedMesh(
    focus_gripGeom,
    black_glossMat,
    28
  );
  focus_grip_ridges.name = "focus_grip_ridges";
  const focus_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    focus_dummy.position.set(
      lensX + Math.cos(a) * 0.274,
      lensY + Math.sin(a) * 0.274,
      0.334
    );
    focus_dummy.rotation.set(0, 0, a - Math.PI / 2);
    focus_dummy.scale.set(1, 1, 1);
    focus_dummy.updateMatrix();
    focus_grip_ridges.setMatrixAt(i, focus_dummy.matrix);
  }
  focus_grip_ridges.instanceMatrix.needsUpdate = true;
  camera.add(focus_grip_ridges);

  const lens_front_rimGeom = new THREE.CylinderGeometry(0.222, 0.222, 0.05, 48);
  const lens_front_rim = new THREE.Mesh(lens_front_rimGeom, black_glossMat);
  lens_front_rim.name = "lens_front_rim";
  lens_front_rim.rotation.x = Math.PI / 2;
  lens_front_rim.position.set(lensX, lensY, 0.342);
  camera.add(lens_front_rim);

  const aperture_scale_ringGeom = new THREE.TorusGeometry(0.178, 0.012, 10, 48);
  const aperture_scale_ring = new THREE.Mesh(
    aperture_scale_ringGeom,
    dark_metalMat
  );
  aperture_scale_ring.name = "aperture_scale_ring";
  aperture_scale_ring.position.set(lensX, lensY, 0.37);
  camera.add(aperture_scale_ring);

  const aperture_markGeom = new THREE.BoxGeometry(0.009, 0.027, 0.006);
  const aperture_markings = new THREE.InstancedMesh(
    aperture_markGeom,
    markingMat,
    18
  );
  aperture_markings.name = "aperture_markings";
  const mark_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    mark_dummy.position.set(
      lensX + Math.cos(a) * 0.183,
      lensY + Math.sin(a) * 0.183,
      0.374
    );
    mark_dummy.rotation.set(0, 0, a - Math.PI / 2);
    mark_dummy.scale.set(1, i % 3 === 0 ? 1.3 : 0.78, 1);
    mark_dummy.updateMatrix();
    aperture_markings.setMatrixAt(i, mark_dummy.matrix);
  }
  aperture_markings.instanceMatrix.needsUpdate = true;
  camera.add(aperture_markings);

  const lens_glass_backGeom = new THREE.CircleGeometry(0.145, 48);
  const lens_glass_back = new THREE.Mesh(lens_glass_backGeom, viewfinder_glassMat);
  lens_glass_back.name = "lens_glass_back";
  lens_glass_back.position.set(lensX, lensY, 0.376);
  camera.add(lens_glass_back);

  const lens_glassGeom = new THREE.CircleGeometry(0.14, 48);
  const lens_glass = new THREE.Mesh(lens_glassGeom, lens_glassMat);
  lens_glass.name = "lens_glass";
  lens_glass.position.set(lensX, lensY, 0.382);
  camera.add(lens_glass);

  const lens_reflection_greenGeom = new THREE.CircleGeometry(0.052, 24);
  const lens_reflection_green = new THREE.Mesh(
    lens_reflection_greenGeom,
    reflection_greenMat
  );
  lens_reflection_green.name = "lens_reflection_green";
  lens_reflection_green.scale.set(1.45, 0.48, 1);
  lens_reflection_green.rotation.z = 0.32;
  lens_reflection_green.position.set(lensX + 0.025, lensY + 0.055, 0.386);
  camera.add(lens_reflection_green);

  const lens_reflection_warmGeom = new THREE.CircleGeometry(0.045, 24);
  const lens_reflection_warm = new THREE.Mesh(
    lens_reflection_warmGeom,
    reflection_warmMat
  );
  lens_reflection_warm.name = "lens_reflection_warm";
  lens_reflection_warm.scale.set(1.25, 0.38, 1);
  lens_reflection_warm.rotation.z = -0.2;
  lens_reflection_warm.position.set(lensX - 0.02, lensY - 0.045, 0.387);
  camera.add(lens_reflection_warm);

  const red_index_dotGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const red_index_dot = new THREE.Mesh(red_index_dotGeom, red_markMat);
  red_index_dot.name = "red_index_dot";
  red_index_dot.position.set(lensX - 0.19, lensY + 0.19, 0.355);
  camera.add(red_index_dot);

  const exposure_discGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.025, 28);
  const exposure_disc = new THREE.Mesh(exposure_discGeom, dark_metalMat);
  exposure_disc.name = "exposure_disc";
  exposure_disc.rotation.x = Math.PI / 2;
  exposure_disc.position.set(-0.105, -0.185, 0.184);
  camera.add(exposure_disc);

  const exposure_disc_centerGeom = new THREE.CylinderGeometry(0.038, 0.038, 0.018, 28);
  const exposure_disc_center = new THREE.Mesh(
    exposure_disc_centerGeom,
    silverMat
  );
  exposure_disc_center.name = "exposure_disc_center";
  exposure_disc_center.rotation.x = Math.PI / 2;
  exposure_disc_center.position.set(-0.105, -0.185, 0.202);
  camera.add(exposure_disc_center);

  const strap_anchorGeom = new THREE.BoxGeometry(0.075, 0.18, 0.22);
  const strap_anchors = new THREE.InstancedMesh(
    strap_anchorGeom,
    strap_leatherMat,
    2
  );
  strap_anchors.name = "strap_anchors";
  const anchor_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    anchor_dummy.position.set(i === 0 ? -0.66 : 0.66, 0.07, 0);
    anchor_dummy.rotation.set(0, 0, 0);
    anchor_dummy.scale.set(1, 1, 1);
    anchor_dummy.updateMatrix();
    strap_anchors.setMatrixAt(i, anchor_dummy.matrix);
  }
  strap_anchors.instanceMatrix.needsUpdate = true;
  camera.add(strap_anchors);

  const strap_tabGeom = roundedExtrude(0.09, 0.19, 0.025, 0.025, 0.004);
  const strap_tabs = new THREE.InstancedMesh(
    strap_tabGeom,
    strap_leatherMat,
    2
  );
  strap_tabs.name = "strap_tabs";
  const tab_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    tab_dummy.position.set(i === 0 ? -0.675 : 0.675, 0.065, 0.15);
    tab_dummy.rotation.set(0, 0, i === 0 ? -0.08 : 0.08);
    tab_dummy.scale.set(1, 1, 1);
    tab_dummy.updateMatrix();
    strap_tabs.setMatrixAt(i, tab_dummy.matrix);
  }
  strap_tabs.instanceMatrix.needsUpdate = true;
  camera.add(strap_tabs);

  const strap_lugGeom = new THREE.TorusGeometry(0.052, 0.012, 10, 28);
  const strap_lugs = new THREE.InstancedMesh(strap_lugGeom, chromeMat, 2);
  strap_lugs.name = "strap_lugs";
  const lug_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    lug_dummy.position.set(i === 0 ? -0.69 : 0.69, 0.08, 0.188);
    lug_dummy.rotation.set(0, 0, 0);
    lug_dummy.scale.set(0.78, 1.18, 1);
    lug_dummy.updateMatrix();
    strap_lugs.setMatrixAt(i, lug_dummy.matrix);
  }
  strap_lugs.instanceMatrix.needsUpdate = true;
  camera.add(strap_lugs);

  const left_strapPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.68, 0.08, 0.18),
    new THREE.Vector3(-0.76, 0.12, 0.19),
    new THREE.Vector3(-0.84, 0.045, 0.18),
    new THREE.Vector3(-0.84, -0.12, 0.15),
    new THREE.Vector3(-0.76, -0.22, 0.12),
  ]);
  const left_strapGeom = new THREE.TubeGeometry(
    left_strapPath,
    32,
    0.025,
    8,
    false
  );
  const left_strap = new THREE.Mesh(left_strapGeom, chromeMat);
  left_strap.name = "left_strap";
  camera.add(left_strap);

  const right_strapPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.68, 0.08, 0.18),
    new THREE.Vector3(0.76, 0.12, 0.19),
    new THREE.Vector3(0.84, 0.045, 0.18),
    new THREE.Vector3(0.84, -0.12, 0.15),
    new THREE.Vector3(0.76, -0.22, 0.12),
  ]);
  const right_strapGeom = new THREE.TubeGeometry(
    right_strapPath,
    32,
    0.025,
    8,
    false
  );
  const right_strap = new THREE.Mesh(right_strapGeom, chromeMat);
  right_strap.name = "right_strap";
  camera.add(right_strap);

  const left_leather_connectorPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.66, 0.08, 0.16),
    new THREE.Vector3(-0.72, 0.07, 0.17),
    new THREE.Vector3(-0.78, 0.025, 0.16),
  ]);
  const left_leather_connectorGeom = new THREE.TubeGeometry(
    left_leather_connectorPath,
    12,
    0.045,
    8,
    false
  );
  const left_leather_connector = new THREE.Mesh(
    left_leather_connectorGeom,
    strap_leatherMat
  );
  left_leather_connector.name = "left_leather_connector";
  camera.add(left_leather_connector);

  const right_leather_connectorPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.66, 0.08, 0.16),
    new THREE.Vector3(0.72, 0.07, 0.17),
    new THREE.Vector3(0.78, 0.025, 0.16),
  ]);
  const right_leather_connectorGeom = new THREE.TubeGeometry(
    right_leather_connectorPath,
    12,
    0.045,
    8,
    false
  );
  const right_leather_connector = new THREE.Mesh(
    right_leather_connectorGeom,
    strap_leatherMat
  );
  right_leather_connector.name = "right_leather_connector";
  camera.add(right_leather_connector);

  const strap_gripGeom = roundedExtrude(0.18, 0.3, 0.06, 0.045, 0.008);

  const left_strap_grip = new THREE.Mesh(strap_gripGeom, strap_edgeMat);
  left_strap_grip.name = "left_strap_grip";
  left_strap_grip.position.set(-0.84, -0.22, 0.105);
  left_strap_grip.rotation.z = -0.08;
  camera.add(left_strap_grip);

  const right_strap_grip = new THREE.Mesh(strap_gripGeom, strap_edgeMat);
  right_strap_grip.name = "right_strap_grip";
  right_strap_grip.position.set(0.84, -0.22, 0.105);
  right_strap_grip.rotation.z = 0.08;
  camera.add(right_strap_grip);

  const left_strap_grip_inset = new THREE.Mesh(
    strap_gripGeom,
    strap_leatherMat
  );
  left_strap_grip_inset.name = "left_strap_grip_inset";
  left_strap_grip_inset.scale.set(0.78, 0.86, 0.72);
  left_strap_grip_inset.position.set(-0.84, -0.22, 0.13);
  left_strap_grip_inset.rotation.z = -0.08;
  camera.add(left_strap_grip_inset);

  const right_strap_grip_inset = new THREE.Mesh(
    strap_gripGeom,
    strap_leatherMat
  );
  right_strap_grip_inset.name = "right_strap_grip_inset";
  right_strap_grip_inset.scale.set(0.78, 0.86, 0.72);
  right_strap_grip_inset.position.set(0.84, -0.22, 0.13);
  right_strap_grip_inset.rotation.z = 0.08;
  camera.add(right_strap_grip_inset);

  const strap_fringeGeom = new THREE.ConeGeometry(0.009, 0.075, 5);
  const strap_fringe = new THREE.InstancedMesh(
    strap_fringeGeom,
    strap_leatherMat,
    20
  );
  strap_fringe.name = "strap_fringe";
  const fringe_dummy = new THREE.Object3D();
  let fringe_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 10; i++) {
      fringe_dummy.position.set(
        side * 0.84 + ((i % 3) - 1) * 0.038,
        -0.39 + ((i % 2) * 0.006),
        0.135 + ((i % 4) - 1.5) * 0.006
      );
      fringe_dummy.rotation.set(
        0,
        0,
        side * (-0.28 + (i % 5) * 0.13)
      );
      fringe_dummy.scale.set(
        0.8 + (i % 3) * 0.12,
        0.8 + (i % 4) * 0.08,
        0.8
      );
      fringe_dummy.updateMatrix();
      strap_fringe.setMatrixAt(fringe_index++, fringe_dummy.matrix);
    }
  }
  strap_fringe.instanceMatrix.needsUpdate = true;
  camera.add(strap_fringe);

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