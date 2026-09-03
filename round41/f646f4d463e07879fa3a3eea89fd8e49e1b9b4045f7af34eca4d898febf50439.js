export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "portable_light";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1b1d20,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lowerBodyMat = new THREE.MeshStandardMaterial({
    color: 0x15171a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x292426,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const amberMat = new THREE.MeshStandardMaterial({
    color: 0xffa21a,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffa21a,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
  });
  const amberFrameMat = new THREE.MeshStandardMaterial({
    color: 0xffb52b,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff8a00,
    emissiveIntensity: 1.0,
  });
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0xfff1b0,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffd34f,
    emissiveIntensity: 1.0,
  });
  const ledHaloMat = new THREE.MeshStandardMaterial({
    color: 0xffc13b,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffa000,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const redButtonMat = new THREE.MeshStandardMaterial({
    color: 0xa52b32,
    metalness: 0.0,
    roughness: 0.3,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);

    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    const geom = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 2,
      }
    );
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(-1.92, -0.62);
  bodyShape.lineTo(1.92, -0.62);
  bodyShape.quadraticCurveTo(2.18, -0.58, 2.30, -0.34);
  bodyShape.lineTo(2.30, 0.32);
  bodyShape.quadraticCurveTo(2.27, 0.57, 1.98, 0.69);
  bodyShape.lineTo(-1.98, 0.69);
  bodyShape.quadraticCurveTo(-2.27, 0.57, -2.30, 0.32);
  bodyShape.lineTo(-2.30, -0.34);
  bodyShape.quadraticCurveTo(-2.18, -0.58, -1.92, -0.62);

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 1.54,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 3,
  });
  bodyGeom.translate(0, 0, -0.77);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const lower_front_shellGeom = roundedExtrudeGeometry(4.08, 0.38, 0.12, 0.045, 0.012);
  const lower_front_shell = new THREE.Mesh(lower_front_shellGeom, lowerBodyMat);
  lower_front_shell.name = "lower_front_shell";
  lower_front_shell.position.set(0, -0.405, 0.845);
  root.add(lower_front_shell);

  const front_seamGeom = new THREE.BoxGeometry(4.28, 0.018, 0.022);
  const front_seam = new THREE.Mesh(front_seamGeom, bezelMat);
  front_seam.name = "front_seam";
  front_seam.position.set(0, -0.175, 0.875);
  root.add(front_seam);

  const front_light_frameGeom = roundedExtrudeGeometry(3.70, 0.68, 0.09, 0.035, 0.012);
  const front_light_frame = new THREE.Mesh(front_light_frameGeom, bezelMat);
  front_light_frame.name = "front_light_frame";
  front_light_frame.position.set(0.06, 0.055, 0.855);
  root.add(front_light_frame);

  const front_light_panelGeom = roundedExtrudeGeometry(3.50, 0.52, 0.065, 0.025, 0.008);
  const front_light_panel = new THREE.Mesh(front_light_panelGeom, amberMat);
  front_light_panel.name = "front_light_panel";
  front_light_panel.position.set(0.06, 0.055, 0.885);
  front_light_panel.renderOrder = 2;
  root.add(front_light_panel);

  const ledPositions = [
    [-1.28, 0.025],
    [-0.78, 0.105],
    [-0.27, 0.035],
    [0.25, 0.105],
    [0.76, 0.015],
    [1.24, 0.105],
  ];

  const led_halosGeom = new THREE.SphereGeometry(0.25, 18, 10);
  const led_halos = new THREE.InstancedMesh(
    led_halosGeom,
    ledHaloMat,
    ledPositions.length
  );
  led_halos.name = "led_halos";
  const haloDummy = new THREE.Object3D();
  for (let i = 0; i < ledPositions.length; i++) {
    haloDummy.position.set(ledPositions[i][0], ledPositions[i][1], 0.895);
    haloDummy.scale.set(1.0, 0.72, 0.13);
    haloDummy.updateMatrix();
    led_halos.setMatrixAt(i, haloDummy.matrix);
  }
  led_halos.instanceMatrix.needsUpdate = true;
  led_halos.renderOrder = 3;
  root.add(led_halos);

  const led_emittersGeom = new THREE.SphereGeometry(0.145, 18, 10);
  const led_emitters = new THREE.InstancedMesh(
    led_emittersGeom,
    ledMat,
    ledPositions.length
  );
  led_emitters.name = "led_emitters";
  const ledDummy = new THREE.Object3D();
  for (let i = 0; i < ledPositions.length; i++) {
    ledDummy.position.set(ledPositions[i][0], ledPositions[i][1], 0.902);
    ledDummy.scale.set(0.92, 0.88, 0.18);
    ledDummy.updateMatrix();
    led_emitters.setMatrixAt(i, ledDummy.matrix);
  }
  led_emitters.instanceMatrix.needsUpdate = true;
  root.add(led_emitters);

  const front_light_border = new THREE.Group();
  front_light_border.name = "front_light_border";
  const borderHorizontalGeom = new THREE.BoxGeometry(3.52, 0.025, 0.025);
  const borderTop = new THREE.Mesh(borderHorizontalGeom, amberFrameMat);
  borderTop.name = "border_top";
  borderTop.position.set(0.06, 0.315, 0.912);
  front_light_border.add(borderTop);

  const borderBottom = new THREE.Mesh(borderHorizontalGeom, amberFrameMat);
  borderBottom.name = "border_bottom";
  borderBottom.position.set(0.06, -0.205, 0.912);
  front_light_border.add(borderBottom);

  const borderVerticalGeom = new THREE.BoxGeometry(0.025, 0.50, 0.025);
  const borderLeft = new THREE.Mesh(borderVerticalGeom, amberFrameMat);
  borderLeft.name = "border_left";
  borderLeft.position.set(-1.69, 0.055, 0.912);
  front_light_border.add(borderLeft);

  const borderRight = new THREE.Mesh(borderVerticalGeom, amberFrameMat);
  borderRight.name = "border_right";
  borderRight.position.set(1.81, 0.055, 0.912);
  front_light_border.add(borderRight);
  root.add(front_light_border);

  const top_panel_borderGeom = roundedExtrudeGeometry(4.02, 1.22, 0.17, 0.035, 0.012);
  const top_panel_border = new THREE.Mesh(top_panel_borderGeom, bezelMat);
  top_panel_border.name = "top_panel_border";
  top_panel_border.rotation.x = -Math.PI / 2;
  top_panel_border.position.set(-0.03, 0.775, -0.03);
  root.add(top_panel_border);

  const top_panelGeom = roundedExtrudeGeometry(3.84, 1.06, 0.14, 0.032, 0.01);
  const top_panel = new THREE.Mesh(top_panelGeom, panelMat);
  top_panel.name = "top_panel";
  top_panel.rotation.x = -Math.PI / 2;
  top_panel.position.set(-0.03, 0.801, -0.03);
  root.add(top_panel);

  const top_access_coverGeom = roundedExtrudeGeometry(2.12, 0.88, 0.16, 0.028, 0.01);
  const top_access_cover = new THREE.Mesh(top_access_coverGeom, panelMat);
  top_access_cover.name = "top_access_cover";
  top_access_cover.rotation.x = -Math.PI / 2;
  top_access_cover.position.set(-0.82, 0.827, 0.0);
  root.add(top_access_cover);

  const top_control_panelGeom = roundedExtrudeGeometry(1.28, 0.88, 0.11, 0.028, 0.01);
  const top_control_panel = new THREE.Mesh(top_control_panelGeom, panelMat);
  top_control_panel.name = "top_control_panel";
  top_control_panel.rotation.x = -Math.PI / 2;
  top_control_panel.position.set(0.98, 0.827, -0.01);
  root.add(top_control_panel);

  const top_dividerGeom = new THREE.BoxGeometry(0.026, 0.018, 0.91);
  const top_divider = new THREE.Mesh(top_dividerGeom, bezelMat);
  top_divider.name = "top_divider";
  top_divider.position.set(0.31, 0.852, -0.01);
  root.add(top_divider);

  const top_power_buttonGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.026, 24);
  const top_power_button = new THREE.Mesh(top_power_buttonGeom, bezelMat);
  top_power_button.name = "top_power_button";
  top_power_button.position.set(-0.43, 0.866, 0.0);
  root.add(top_power_button);

  const power_ringGeom = new THREE.TorusGeometry(0.048, 0.008, 8, 24);
  const power_ring = new THREE.Mesh(power_ringGeom, rubberMat);
  power_ring.name = "power_ring";
  power_ring.rotation.x = -Math.PI / 2;
  power_ring.position.set(-0.43, 0.883, 0.0);
  root.add(power_ring);

  const power_stemGeom = new THREE.BoxGeometry(0.014, 0.012, 0.055);
  const power_stem = new THREE.Mesh(power_stemGeom, rubberMat);
  power_stem.name = "power_stem";
  power_stem.position.set(-0.43, 0.889, -0.027);
  root.add(power_stem);

  const top_switch_recessGeom = roundedExtrudeGeometry(0.48, 0.29, 0.05, 0.018, 0.006);
  const top_switch_recess = new THREE.Mesh(top_switch_recessGeom, bezelMat);
  top_switch_recess.name = "top_switch_recess";
  top_switch_recess.rotation.x = -Math.PI / 2;
  top_switch_recess.position.set(1.03, 0.862, -0.05);
  root.add(top_switch_recess);

  const top_switchGeom = roundedExtrudeGeometry(0.34, 0.18, 0.035, 0.018, 0.005);
  const top_switch = new THREE.Mesh(top_switchGeom, panelMat);
  top_switch.name = "top_switch";
  top_switch.rotation.x = -Math.PI / 2;
  top_switch.position.set(1.03, 0.878, -0.05);
  root.add(top_switch);

  const top_switch_markGeom = new THREE.BoxGeometry(0.08, 0.012, 0.018);
  const top_switch_mark = new THREE.Mesh(top_switch_markGeom, silverMat);
  top_switch_mark.name = "top_switch_mark";
  top_switch_mark.position.set(1.03, 0.895, -0.05);
  root.add(top_switch_mark);

  const top_brand_marksGeom = new THREE.BoxGeometry(0.075, 0.012, 0.024);
  const top_brand_marks = new THREE.InstancedMesh(top_brand_marksGeom, silverMat, 7);
  top_brand_marks.name = "top_brand_marks";
  const markDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    markDummy.position.set(0.48 + i * 0.105, 0.875, 0.285);
    markDummy.scale.set(i === 0 || i === 6 ? 0.75 : 1.0, 1, 1);
    markDummy.updateMatrix();
    top_brand_marks.setMatrixAt(i, markDummy.matrix);
  }
  top_brand_marks.instanceMatrix.needsUpdate = true;
  root.add(top_brand_marks);

  const red_button_rimGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.025, 24);
  const red_button_rim = new THREE.Mesh(red_button_rimGeom, bezelMat);
  red_button_rim.name = "red_button_rim";
  red_button_rim.position.set(1.73, 0.785, -0.50);
  root.add(red_button_rim);

  const red_buttonGeom = new THREE.CylinderGeometry(0.083, 0.083, 0.035, 24);
  const red_button = new THREE.Mesh(red_buttonGeom, redButtonMat);
  red_button.name = "red_button";
  red_button.position.set(1.73, 0.812, -0.50);
  root.add(red_button);

  const left_side_port_bezelGeom = roundedExtrudeGeometry(0.46, 0.34, 0.07, 0.035, 0.01);
  const left_side_port_bezel = new THREE.Mesh(left_side_port_bezelGeom, bezelMat);
  left_side_port_bezel.name = "left_side_port_bezel";
  left_side_port_bezel.rotation.y = -Math.PI / 2;
  left_side_port_bezel.position.set(-2.365, -0.015, 0.16);
  root.add(left_side_port_bezel);

  const left_side_port_openingGeom = roundedExtrudeGeometry(0.31, 0.20, 0.045, 0.025, 0.006);
  const left_side_port_opening = new THREE.Mesh(left_side_port_openingGeom, rubberMat);
  left_side_port_opening.name = "left_side_port_opening";
  left_side_port_opening.rotation.y = -Math.PI / 2;
  left_side_port_opening.position.set(-2.395, -0.005, 0.16);
  root.add(left_side_port_opening);

  const left_side_port_contactGeom = roundedExtrudeGeometry(0.22, 0.065, 0.025, 0.018, 0.004);
  const left_side_port_contact = new THREE.Mesh(left_side_port_contactGeom, silverMat);
  left_side_port_contact.name = "left_side_port_contact";
  left_side_port_contact.rotation.y = -Math.PI / 2;
  left_side_port_contact.position.set(-2.414, 0.025, 0.16);
  root.add(left_side_port_contact);

  const left_side_latchGeom = roundedExtrudeGeometry(0.34, 0.13, 0.04, 0.025, 0.006);
  const left_side_latch = new THREE.Mesh(left_side_latchGeom, rubberMat);
  left_side_latch.name = "left_side_latch";
  left_side_latch.rotation.y = -Math.PI / 2;
  left_side_latch.position.set(-2.37, 0.255, 0.25);
  root.add(left_side_latch);

  const left_side_ventGeom = new THREE.BoxGeometry(0.025, 0.035, 0.35);
  const left_side_vent = new THREE.Mesh(left_side_ventGeom, rubberMat);
  left_side_vent.name = "left_side_vent";
  left_side_vent.position.set(-2.39, -0.35, 0.27);
  root.add(left_side_vent);

  const side_screwsGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.022, 16);
  const side_screws = new THREE.InstancedMesh(side_screwsGeom, silverMat, 2);
  side_screws.name = "side_screws";
  const screwDummy = new THREE.Object3D();
  const screwPositions = [
    [-2.405, -0.245, -0.22],
    [-2.405, -0.45, 0.52],
  ];
  for (let i = 0; i < screwPositions.length; i++) {
    screwDummy.position.set(
      screwPositions[i][0],
      screwPositions[i][1],
      screwPositions[i][2]
    );
    screwDummy.rotation.set(0, 0, Math.PI / 2);
    screwDummy.updateMatrix();
    side_screws.setMatrixAt(i, screwDummy.matrix);
  }
  side_screws.instanceMatrix.needsUpdate = true;
  root.add(side_screws);

  const end_lens_bezelGeom = roundedExtrudeGeometry(0.43, 0.34, 0.07, 0.035, 0.01);
  const end_lens_bezel = new THREE.Mesh(end_lens_bezelGeom, bezelMat);
  end_lens_bezel.name = "end_lens_bezel";
  end_lens_bezel.rotation.y = -Math.PI / 2;
  end_lens_bezel.position.set(-2.36, -0.02, -0.43);
  root.add(end_lens_bezel);

  const end_lensGeom = roundedExtrudeGeometry(0.31, 0.22, 0.05, 0.025, 0.006);
  const end_lens = new THREE.Mesh(end_lensGeom, lensMat);
  end_lens.name = "end_lens";
  end_lens.rotation.y = -Math.PI / 2;
  end_lens.position.set(-2.395, -0.02, -0.43);
  root.add(end_lens);

  const rubber_feetGeom = new THREE.CylinderGeometry(0.10, 0.11, 0.055, 16);
  const rubber_feet = new THREE.InstancedMesh(rubber_feetGeom, rubberMat, 4);
  rubber_feet.name = "rubber_feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-1.65, -0.69, -0.48],
    [1.65, -0.69, -0.48],
    [-1.65, -0.69, 0.48],
    [1.65, -0.69, 0.48],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    footDummy.position.set(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    footDummy.rotation.set(0, 0, 0);
    footDummy.updateMatrix();
    rubber_feet.setMatrixAt(i, footDummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  root.add(rubber_feet);

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