export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compact_pendant";

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const front_assembly = new THREE.Group();
  front_assembly.name = "front_assembly";
  root.add(front_assembly);

  const attachment_group = new THREE.Group();
  attachment_group.name = "attachment_group";
  root.add(attachment_group);

  const controls_group = new THREE.Group();
  controls_group.name = "controls_group";
  root.add(controls_group);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x25292c,
    metalness: 0.0,
    roughness: 0.8
  });

  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x9da3a8,
    metalness: 0.0,
    roughness: 0.3
  });

  function roundedRectShape(width, height, radius) {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const r = Math.min(radius, halfW, halfH);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + r, -halfH);
    shape.lineTo(halfW - r, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + r);
    shape.lineTo(halfW, halfH - r);
    shape.quadraticCurveTo(halfW, halfH, halfW - r, halfH);
    shape.lineTo(-halfW + r, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - r);
    shape.lineTo(-halfW, -halfH + r);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + r, -halfH);

    return shape;
  }

  function roundedRectHole(width, height, radius) {
    const halfW = width * 0.5;
    const halfH = height * 0.5;
    const r = Math.min(radius, halfW, halfH);
    const hole = new THREE.Path();

    hole.moveTo(-halfW + r, -halfH);
    hole.quadraticCurveTo(-halfW, -halfH, -halfW, -halfH + r);
    hole.lineTo(-halfW, halfH - r);
    hole.quadraticCurveTo(-halfW, halfH, -halfW + r, halfH);
    hole.lineTo(halfW - r, halfH);
    hole.quadraticCurveTo(halfW, halfH, halfW, halfH - r);
    hole.lineTo(halfW, -halfH + r);
    hole.quadraticCurveTo(halfW, -halfH, halfW - r, -halfH);
    hole.lineTo(-halfW + r, -halfH);

    return hole;
  }

  function roundedPlateGeometry(width, height, radius, depth, bevelSize, bevelThickness) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 3,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
    geometry.translate(0, 0, -depth * 0.5);
    return geometry;
  }

  function roundedFrameGeometry(
    outerWidth,
    outerHeight,
    outerRadius,
    innerWidth,
    innerHeight,
    innerRadius,
    depth,
    bevelSize,
    bevelThickness
  ) {
    const shape = roundedRectShape(outerWidth, outerHeight, outerRadius);
    shape.holes.push(roundedRectHole(innerWidth, innerHeight, innerRadius));

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 3,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
    geometry.translate(0, 0, -depth * 0.5);
    return geometry;
  }

  const bodyW = 2.4;
  const bodyH = 2.45;
  const bodyD = 0.36;

  const case_bodyGeom = roundedPlateGeometry(
    bodyW,
    bodyH,
    0.23,
    bodyD,
    0.07,
    0.055
  );
  const case_body = new THREE.Mesh(case_bodyGeom, silverMat);
  case_body.name = "case_body";
  case_group.add(case_body);

  const case_seamGeom = roundedPlateGeometry(
    2.415,
    2.465,
    0.235,
    0.026,
    0.008,
    0.006
  );
  const case_seam = new THREE.Mesh(case_seamGeom, darkMat);
  case_seam.name = "case_seam";
  case_seam.position.z = 0.239;
  case_group.add(case_seam);

  const front_coverGeom = roundedFrameGeometry(
    2.36,
    2.41,
    0.215,
    1.56,
    1.69,
    0.075,
    0.075,
    0.035,
    0.025
  );
  const front_cover = new THREE.Mesh(front_coverGeom, polishedMat);
  front_cover.name = "front_cover";
  front_cover.position.z = 0.285;
  front_assembly.add(front_cover);

  const panel_recessGeom = roundedPlateGeometry(
    1.57,
    1.7,
    0.075,
    0.024,
    0.008,
    0.006
  );
  const panel_recess = new THREE.Mesh(panel_recessGeom, darkMat);
  panel_recess.name = "panel_recess";
  panel_recess.position.z = 0.247;
  front_assembly.add(panel_recess);

  const front_panelGeom = roundedPlateGeometry(
    1.47,
    1.6,
    0.055,
    0.026,
    0.014,
    0.009
  );
  const front_panel = new THREE.Mesh(front_panelGeom, panelMat);
  front_panel.name = "front_panel";
  front_panel.position.z = 0.276;
  front_assembly.add(front_panel);

  const inner_bezelGeom = roundedFrameGeometry(
    1.68,
    1.81,
    0.09,
    1.52,
    1.65,
    0.06,
    0.026,
    0.008,
    0.006
  );
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polishedMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.322;
  front_assembly.add(inner_bezel);

  const loop_mountGeom = new THREE.CylinderGeometry(0.105, 0.17, 0.3, 24);
  const loop_mount = new THREE.Mesh(loop_mountGeom, polishedMat);
  loop_mount.name = "loop_mount";
  loop_mount.position.set(0, 1.34, -0.015);
  attachment_group.add(loop_mount);

  const loop_mount_collarGeom = new THREE.TorusGeometry(0.105, 0.025, 10, 28);
  const loop_mount_collar = new THREE.Mesh(loop_mount_collarGeom, silverMat);
  loop_mount_collar.name = "loop_mount_collar";
  loop_mount_collar.rotation.x = Math.PI / 2;
  loop_mount_collar.position.set(0, 1.405, -0.015);
  attachment_group.add(loop_mount_collar);

  const attachment_loopGeom = new THREE.TorusGeometry(0.25, 0.072, 14, 40);
  const attachment_loop = new THREE.Mesh(attachment_loopGeom, polishedMat);
  attachment_loop.name = "attachment_loop";
  attachment_loop.position.set(0, 1.62, -0.02);
  attachment_group.add(attachment_loop);

  const front_latch_baseGeom = new THREE.BoxGeometry(0.62, 0.13, 0.05);
  const front_latch_base = new THREE.Mesh(front_latch_baseGeom, darkMat);
  front_latch_base.name = "front_latch_base";
  front_latch_base.position.set(-0.34, -1.205, 0.278);
  controls_group.add(front_latch_base);

  const front_latch_leverGeom = new THREE.BoxGeometry(0.45, 0.075, 0.055);
  const front_latch_lever = new THREE.Mesh(front_latch_leverGeom, brushedMat);
  front_latch_lever.name = "front_latch_lever";
  front_latch_lever.position.set(-0.37, -1.205, 0.316);
  front_latch_lever.rotation.z = 0.035;
  controls_group.add(front_latch_lever);

  const front_latch_pinGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.17, 16);
  const front_latch_pin = new THREE.Mesh(front_latch_pinGeom, polishedMat);
  front_latch_pin.name = "front_latch_pin";
  front_latch_pin.rotation.x = Math.PI / 2;
  front_latch_pin.position.set(-0.34, -1.205, 0.355);
  controls_group.add(front_latch_pin);

  const front_latch_knobGeom = new THREE.SphereGeometry(0.13, 24, 14);
  const front_latch_knob = new THREE.Mesh(front_latch_knobGeom, polishedMat);
  front_latch_knob.name = "front_latch_knob";
  front_latch_knob.scale.set(1, 1, 0.72);
  front_latch_knob.position.set(-0.34, -1.205, 0.435);
  controls_group.add(front_latch_knob);

  const side_button_collarGeom = new THREE.TorusGeometry(0.074, 0.018, 10, 24);
  const side_button_collar = new THREE.Mesh(side_button_collarGeom, darkMat);
  side_button_collar.name = "side_button_collar";
  side_button_collar.rotation.y = Math.PI / 2;
  side_button_collar.position.set(1.247, -0.62, 0.015);
  controls_group.add(side_button_collar);

  const side_button_stemGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.17, 16);
  const side_button_stem = new THREE.Mesh(side_button_stemGeom, polishedMat);
  side_button_stem.name = "side_button_stem";
  side_button_stem.rotation.z = Math.PI / 2;
  side_button_stem.position.set(1.3, -0.62, 0.015);
  controls_group.add(side_button_stem);

  const side_button_capGeom = new THREE.CylinderGeometry(0.082, 0.082, 0.06, 18);
  const side_button_cap = new THREE.Mesh(side_button_capGeom, silverMat);
  side_button_cap.name = "side_button_cap";
  side_button_cap.rotation.z = Math.PI / 2;
  side_button_cap.position.set(1.395, -0.62, 0.015);
  controls_group.add(side_button_cap);

  const side_button_ridgesGeom = new THREE.TorusGeometry(0.065, 0.011, 8, 20);
  const side_button_ridges = new THREE.InstancedMesh(
    side_button_ridgesGeom,
    polishedMat,
    3
  );
  side_button_ridges.name = "side_button_ridges";

  const ridgeMatrix = new THREE.Matrix4();
  const ridgeQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 1, 0),
    Math.PI / 2
  );
  const ridgeScale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < 3; i++) {
    ridgeMatrix.compose(
      new THREE.Vector3(1.33 + i * 0.043, -0.62, 0.015),
      ridgeQuaternion,
      ridgeScale
    );
    side_button_ridges.setMatrixAt(i, ridgeMatrix);
  }
  side_button_ridges.instanceMatrix.needsUpdate = true;
  controls_group.add(side_button_ridges);

  const side_slotGeom = new THREE.BoxGeometry(0.025, 0.035, 0.25);
  const side_slot = new THREE.Mesh(side_slotGeom, darkMat);
  side_slot.name = "side_slot";
  side_slot.position.set(1.272, -0.82, 0.04);
  controls_group.add(side_slot);

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