export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "skeleton_wristwatch";

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xb08d57,
    metalness: 0.5,
    roughness: 0.3,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xd8c79f,
    metalness: 0.35,
    roughness: 0.45,
  });
  const subdialMat = new THREE.MeshStandardMaterial({
    color: 0xe5d7b5,
    metalness: 0.25,
    roughness: 0.5,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.0,
    roughness: 0.7,
  });
  const leather_panelMat = new THREE.MeshStandardMaterial({
    color: 0x242428,
    metalness: 0.0,
    roughness: 0.7,
  });
  const liningMat = new THREE.MeshStandardMaterial({
    color: 0xb9a47e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x654b43,
    metalness: 0.0,
    roughness: 0.95,
  });
  const dial_printMat = new THREE.MeshStandardMaterial({
    color: 0x25282b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const handMat = new THREE.MeshStandardMaterial({
    color: 0x252a30,
    metalness: 0.5,
    roughness: 0.25,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0x8f1735,
    metalness: 0.0,
    roughness: 0.4,
  });
  const jewelMat = new THREE.MeshStandardMaterial({
    color: 0x9d1746,
    metalness: 0.0,
    roughness: 0.3,
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
    side: THREE.DoubleSide,
  });

  function makeCenteredExtrude(shape, depth, bevelSize, bevelThickness) {
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelSize,
      bevelThickness,
      bevelSegments: bevelSize > 0 ? 3 : 1,
    });
    geom.translate(0, 0, -depth / 2);
    return geom;
  }

  function makeUpperStrapShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.48, 0.72);
    shape.lineTo(0.48, 0.72);
    shape.lineTo(0.43, 1.54);
    shape.bezierCurveTo(0.43, 1.66, 0.35, 1.73, 0.22, 1.74);
    shape.lineTo(-0.22, 1.74);
    shape.bezierCurveTo(-0.35, 1.73, -0.43, 1.66, -0.43, 1.54);
    shape.closePath();
    return shape;
  }

  function makeLowerStrapShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.43, -1.54);
    shape.bezierCurveTo(-0.43, -1.66, -0.35, -1.73, -0.22, -1.74);
    shape.lineTo(0.22, -1.74);
    shape.bezierCurveTo(0.35, -1.73, 0.43, -1.66, 0.43, -1.54);
    shape.lineTo(0.48, -0.72);
    shape.lineTo(-0.48, -0.72);
    shape.closePath();
    return shape;
  }

  function makeUpperPanelShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.30, 0.86);
    shape.lineTo(0.30, 0.86);
    shape.lineTo(0.27, 1.53);
    shape.bezierCurveTo(0.27, 1.60, 0.22, 1.64, 0.15, 1.64);
    shape.lineTo(-0.15, 1.64);
    shape.bezierCurveTo(-0.22, 1.64, -0.27, 1.60, -0.27, 1.53);
    shape.closePath();
    return shape;
  }

  function makeLowerPanelShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.27, -1.53);
    shape.bezierCurveTo(-0.27, -1.60, -0.22, -1.64, -0.15, -1.64);
    shape.lineTo(0.15, -1.64);
    shape.bezierCurveTo(0.22, -1.64, 0.27, -1.60, 0.27, -1.53);
    shape.lineTo(0.30, -0.86);
    shape.lineTo(-0.30, -0.86);
    shape.closePath();
    return shape;
  }

  function makeLugGeometry(sx, sy) {
    const shape = new THREE.Shape();
    shape.moveTo(sx * 0.43, sy * 0.70);
    shape.lineTo(sx * 0.68, sy * 0.70);
    shape.lineTo(sx * 0.58, sy * 1.02);
    shape.lineTo(sx * 0.42, sy * 1.02);
    shape.closePath();
    return makeCenteredExtrude(shape, 0.14, 0.018, 0.012);
  }

  function makeHandGeometry(length, width) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.55, -0.08);
    shape.lineTo(width * 0.55, -0.08);
    shape.lineTo(width * 0.38, length * 0.80);
    shape.lineTo(0, length);
    shape.lineTo(-width * 0.38, length * 0.80);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const dummy = new THREE.Object3D();

  const upper_strapGeom = makeCenteredExtrude(makeUpperStrapShape(), 0.12, 0.035, 0.025);
  const upper_strap = new THREE.Mesh(upper_strapGeom, leatherMat);
  upper_strap.name = "upper_strap";
  upper_strap.position.z = -0.16;
  root.add(upper_strap);

  const lower_strapGeom = makeCenteredExtrude(makeLowerStrapShape(), 0.12, 0.035, 0.025);
  const lower_strap = new THREE.Mesh(lower_strapGeom, leatherMat);
  lower_strap.name = "lower_strap";
  lower_strap.position.z = -0.16;
  root.add(lower_strap);

  const upper_strap_panelGeom = makeCenteredExtrude(makeUpperPanelShape(), 0.018, 0.012, 0.008);
  const upper_strap_panel = new THREE.Mesh(upper_strap_panelGeom, leather_panelMat);
  upper_strap_panel.name = "upper_strap_panel";
  upper_strap_panel.position.z = -0.072;
  root.add(upper_strap_panel);

  const lower_strap_panelGeom = makeCenteredExtrude(makeLowerPanelShape(), 0.018, 0.012, 0.008);
  const lower_strap_panel = new THREE.Mesh(lower_strap_panelGeom, leather_panelMat);
  lower_strap_panel.name = "lower_strap_panel";
  lower_strap_panel.position.z = -0.072;
  root.add(lower_strap_panel);

  const lower_strap_liningGeom = makeCenteredExtrude(makeLowerPanelShape(), 0.014, 0.01, 0.006);
  const lower_strap_lining = new THREE.Mesh(lower_strap_liningGeom, liningMat);
  lower_strap_lining.name = "lower_strap_lining";
  lower_strap_lining.position.z = -0.245;
  root.add(lower_strap_lining);

  const strap_stitchesGeom = new THREE.BoxGeometry(0.026, 0.055, 0.012);
  const strap_stitches = new THREE.InstancedMesh(strap_stitchesGeom, stitchMat, 24);
  strap_stitches.name = "strap_stitches";
  let stitchIndex = 0;
  for (const direction of [-1, 1]) {
    for (const side of [-1, 1]) {
      for (let i = 0; i < 6; i++) {
        const y = direction * (1.00 + i * 0.105);
        dummy.position.set(side * 0.345, y, -0.045);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        strap_stitches.setMatrixAt(stitchIndex++, dummy.matrix);
      }
    }
  }
  strap_stitches.instanceMatrix.needsUpdate = true;
  root.add(strap_stitches);

  const top_right_lugGeom = makeLugGeometry(1, 1);
  const top_right_lug = new THREE.Mesh(top_right_lugGeom, polished_metalMat);
  top_right_lug.name = "top_right_lug";
  root.add(top_right_lug);

  const top_left_lugGeom = makeLugGeometry(-1, 1);
  const top_left_lug = new THREE.Mesh(top_left_lugGeom, polished_metalMat);
  top_left_lug.name = "top_left_lug";
  root.add(top_left_lug);

  const bottom_right_lugGeom = makeLugGeometry(1, -1);
  const bottom_right_lug = new THREE.Mesh(bottom_right_lugGeom, polished_metalMat);
  bottom_right_lug.name = "bottom_right_lug";
  root.add(bottom_right_lug);

  const bottom_left_lugGeom = makeLugGeometry(-1, -1);
  const bottom_left_lug = new THREE.Mesh(bottom_left_lugGeom, polished_metalMat);
  bottom_left_lug.name = "bottom_left_lug";
  root.add(bottom_left_lug);

  const spring_barGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.86, 16);
  const top_spring_bar = new THREE.Mesh(spring_barGeom, polished_metalMat);
  top_spring_bar.name = "top_spring_bar";
  top_spring_bar.rotation.z = Math.PI / 2;
  top_spring_bar.position.set(0, 0.91, 0.015);
  root.add(top_spring_bar);

  const bottom_spring_bar = new THREE.Mesh(spring_barGeom, polished_metalMat);
  bottom_spring_bar.name = "bottom_spring_bar";
  bottom_spring_bar.rotation.z = Math.PI / 2;
  bottom_spring_bar.position.set(0, -0.91, 0.015);
  root.add(bottom_spring_bar);

  const case_backGeom = new THREE.CylinderGeometry(0.91, 0.91, 0.07, 64);
  const case_back = new THREE.Mesh(case_backGeom, brushed_metalMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.105;
  root.add(case_back);

  const case_bodyGeom = new THREE.CylinderGeometry(0.98, 0.98, 0.18, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, polished_metalMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  case_body.position.z = -0.005;
  root.add(case_body);

  const bezel_outerGeom = new THREE.TorusGeometry(0.89, 0.075, 16, 64);
  const bezel_outer = new THREE.Mesh(bezel_outerGeom, polished_metalMat);
  bezel_outer.name = "bezel_outer";
  bezel_outer.position.z = 0.105;
  root.add(bezel_outer);

  const bezel_innerGeom = new THREE.TorusGeometry(0.82, 0.024, 12, 64);
  const bezel_inner = new THREE.Mesh(bezel_innerGeom, silverMat);
  bezel_inner.name = "bezel_inner";
  bezel_inner.position.z = 0.132;
  root.add(bezel_inner);

  const dialGeom = new THREE.CylinderGeometry(0.82, 0.82, 0.026, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.name = "dial";
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.105;
  root.add(dial);

  const chapter_ringGeom = new THREE.RingGeometry(0.68, 0.805, 64);
  const chapter_ring = new THREE.Mesh(chapter_ringGeom, subdialMat);
  chapter_ring.name = "chapter_ring";
  chapter_ring.position.z = 0.126;
  root.add(chapter_ring);

  const inner_dial_ringGeom = new THREE.TorusGeometry(0.675, 0.009, 8, 64);
  const inner_dial_ring = new THREE.Mesh(inner_dial_ringGeom, goldMat);
  inner_dial_ring.name = "inner_dial_ring";
  inner_dial_ring.position.z = 0.139;
  root.add(inner_dial_ring);

  const minute_ticksGeom = new THREE.BoxGeometry(0.008, 0.046, 0.008);
  const minute_ticks = new THREE.InstancedMesh(minute_ticksGeom, dial_printMat, 60);
  minute_ticks.name = "minute_ticks";
  for (let i = 0; i < 60; i++) {
    const a = i / 60 * Math.PI * 2;
    const major = i % 5 === 0;
    dummy.position.set(Math.sin(a) * 0.752, Math.cos(a) * 0.752, 0.145);
    dummy.rotation.set(0, 0, -a);
    dummy.scale.set(major ? 1.8 : 1, major ? 1.25 : 1, 1);
    dummy.updateMatrix();
    minute_ticks.setMatrixAt(i, dummy.matrix);
  }
  minute_ticks.instanceMatrix.needsUpdate = true;
  root.add(minute_ticks);

  const hour_markersGeom = new THREE.BoxGeometry(0.038, 0.115, 0.012);
  const hour_markers = new THREE.InstancedMesh(hour_markersGeom, dial_printMat, 12);
  hour_markers.name = "hour_markers";
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * Math.PI * 2;
    dummy.position.set(Math.sin(a) * 0.685, Math.cos(a) * 0.685, 0.151);
    dummy.rotation.set(0, 0, -a);
    dummy.scale.set(i % 3 === 0 ? 1.45 : 1, i % 3 === 0 ? 1.12 : 1, 1);
    dummy.updateMatrix();
    hour_markers.setMatrixAt(i, dummy.matrix);
  }
  hour_markers.instanceMatrix.needsUpdate = true;
  root.add(hour_markers);

  const upper_subdialGeom = new THREE.CircleGeometry(0.305, 64);
  const upper_subdial = new THREE.Mesh(upper_subdialGeom, subdialMat);
  upper_subdial.name = "upper_subdial";
  upper_subdial.position.set(0, 0.39, 0.146);
  root.add(upper_subdial);

  const upper_subdial_ringGeom = new THREE.TorusGeometry(0.298, 0.008, 8, 48);
  const upper_subdial_ring = new THREE.Mesh(upper_subdial_ringGeom, dial_printMat);
  upper_subdial_ring.name = "upper_subdial_ring";
  upper_subdial_ring.position.set(0, 0.39, 0.154);
  root.add(upper_subdial_ring);

  const left_subdialGeom = new THREE.CircleGeometry(0.225, 48);
  const left_subdial = new THREE.Mesh(left_subdialGeom, subdialMat);
  left_subdial.name = "left_subdial";
  left_subdial.position.set(-0.39, -0.14, 0.146);
  root.add(left_subdial);

  const left_subdial_ringGeom = new THREE.TorusGeometry(0.218, 0.008, 8, 48);
  const left_subdial_ring = new THREE.Mesh(left_subdial_ringGeom, dial_printMat);
  left_subdial_ring.name = "left_subdial_ring";
  left_subdial_ring.position.set(-0.39, -0.14, 0.154);
  root.add(left_subdial_ring);

  const right_subdialGeom = new THREE.CircleGeometry(0.225, 48);
  const right_subdial = new THREE.Mesh(right_subdialGeom, subdialMat);
  right_subdial.name = "right_subdial";
  right_subdial.position.set(0.39, -0.14, 0.146);
  root.add(right_subdial);

  const right_subdial_ringGeom = new THREE.TorusGeometry(0.218, 0.008, 8, 48);
  const right_subdial_ring = new THREE.Mesh(right_subdial_ringGeom, dial_printMat);
  right_subdial_ring.name = "right_subdial_ring";
  right_subdial_ring.position.set(0.39, -0.14, 0.154);
  root.add(right_subdial_ring);

  const subdial_ticksGeom = new THREE.BoxGeometry(0.006, 0.032, 0.007);
  const subdial_ticks = new THREE.InstancedMesh(subdial_ticksGeom, dial_printMat, 90);
  subdial_ticks.name = "subdial_ticks";
  const subdialSpecs = [
    [0, 0.39, 0.273, 30],
    [-0.39, -0.14, 0.198, 30],
    [0.39, -0.14, 0.198, 30],
  ];
  let subdialTickIndex = 0;
  for (const spec of subdialSpecs) {
    const cx = spec[0];
    const cy = spec[1];
    const radius = spec[2];
    const count = spec[3];
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      dummy.position.set(cx + Math.sin(a) * radius, cy + Math.cos(a) * radius, 0.158);
      dummy.rotation.set(0, 0, -a);
      dummy.scale.set(i % 5 === 0 ? 1.5 : 1, i % 5 === 0 ? 1.25 : 1, 1);
      dummy.updateMatrix();
      subdial_ticks.setMatrixAt(subdialTickIndex++, dummy.matrix);
    }
  }
  subdial_ticks.instanceMatrix.needsUpdate = true;
  root.add(subdial_ticks);

  const upper_subdial_handGeom = makeHandGeometry(0.225, 0.026);
  const upper_subdial_hand = new THREE.Mesh(upper_subdial_handGeom, handMat);
  upper_subdial_hand.name = "upper_subdial_hand";
  upper_subdial_hand.position.set(0, 0.39, 0.174);
  upper_subdial_hand.rotation.z = Math.PI / 6;
  root.add(upper_subdial_hand);

  const left_subdial_handGeom = makeHandGeometry(0.165, 0.024);
  const left_subdial_hand = new THREE.Mesh(left_subdial_handGeom, handMat);
  left_subdial_hand.name = "left_subdial_hand";
  left_subdial_hand.position.set(-0.39, -0.14, 0.174);
  left_subdial_hand.rotation.z = -Math.PI / 3;
  root.add(left_subdial_hand);

  const right_subdial_handGeom = makeHandGeometry(0.165, 0.024);
  const right_subdial_hand = new THREE.Mesh(right_subdial_handGeom, handMat);
  right_subdial_hand.name = "right_subdial_hand";
  right_subdial_hand.position.set(0.39, -0.14, 0.174);
  right_subdial_hand.rotation.z = Math.PI / 2;
  root.add(right_subdial_hand);

  const subdial_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.014, 20);
  const upper_subdial_screw = new THREE.Mesh(subdial_screwGeom, handMat);
  upper_subdial_screw.name = "upper_subdial_screw";
  upper_subdial_screw.rotation.x = Math.PI / 2;
  upper_subdial_screw.position.set(0, 0.39, 0.181);
  root.add(upper_subdial_screw);

  const left_subdial_screw = new THREE.Mesh(subdial_screwGeom, handMat);
  left_subdial_screw.name = "left_subdial_screw";
  left_subdial_screw.rotation.x = Math.PI / 2;
  left_subdial_screw.position.set(-0.39, -0.14, 0.181);
  root.add(left_subdial_screw);

  const right_subdial_screw = new THREE.Mesh(subdial_screwGeom, handMat);
  right_subdial_screw.name = "right_subdial_screw";
  right_subdial_screw.rotation.x = Math.PI / 2;
  right_subdial_screw.position.set(0.39, -0.14, 0.181);
  root.add(right_subdial_screw);

  const upper_subdial_jewelGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.012, 16);
  const upper_subdial_jewel = new THREE.Mesh(upper_subdial_jewelGeom, jewelMat);
  upper_subdial_jewel.name = "upper_subdial_jewel";
  upper_subdial_jewel.rotation.x = Math.PI / 2;
  upper_subdial_jewel.position.set(0, 0.56, 0.181);
  root.add(upper_subdial_jewel);

  const apertureShape = new THREE.Shape();
  const apertureSegments = 48;
  for (let i = 0; i <= apertureSegments; i++) {
    const a = i / apertureSegments * Math.PI * 2;
    const x = Math.cos(a) * 0.255;
    const y = -0.43 + Math.sin(a) * 0.275;
    if (i === 0) apertureShape.moveTo(x, y);
    else apertureShape.lineTo(x, y);
  }
  apertureShape.closePath();

  const tourbillon_apertureGeom = new THREE.ShapeGeometry(apertureShape);
  const tourbillon_aperture = new THREE.Mesh(tourbillon_apertureGeom, dial_printMat);
  tourbillon_aperture.name = "tourbillon_aperture";
  tourbillon_aperture.position.z = 0.149;
  root.add(tourbillon_aperture);

  const tourbillon_ringGeom = new THREE.TorusGeometry(0.245, 0.012, 8, 48);
  const tourbillon_ring = new THREE.Mesh(tourbillon_ringGeom, goldMat);
  tourbillon_ring.name = "tourbillon_ring";
  tourbillon_ring.scale.y = 1.08;
  tourbillon_ring.position.set(0, -0.43, 0.169);
  root.add(tourbillon_ring);

  const tourbillon_gearGeom = new THREE.TorusGeometry(0.125, 0.018, 8, 32);
  const tourbillon_gear = new THREE.Mesh(tourbillon_gearGeom, brushed_metalMat);
  tourbillon_gear.name = "tourbillon_gear";
  tourbillon_gear.position.set(0, -0.43, 0.176);
  root.add(tourbillon_gear);

  const tourbillon_teethGeom = new THREE.BoxGeometry(0.022, 0.045, 0.012);
  const tourbillon_teeth = new THREE.InstancedMesh(tourbillon_teethGeom, brushed_metalMat, 16);
  tourbillon_teeth.name = "tourbillon_teeth";
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * Math.PI * 2;
    dummy.position.set(Math.sin(a) * 0.143, -0.43 + Math.cos(a) * 0.143, 0.178);
    dummy.rotation.set(0, 0, -a);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tourbillon_teeth.setMatrixAt(i, dummy.matrix);
  }
  tourbillon_teeth.instanceMatrix.needsUpdate = true;
  root.add(tourbillon_teeth);

  const tourbillon_spokesGeom = new THREE.BoxGeometry(0.026, 0.22, 0.012);
  const tourbillon_spokes = new THREE.InstancedMesh(tourbillon_spokesGeom, silverMat, 6);
  tourbillon_spokes.name = "tourbillon_spokes";
  for (let i = 0; i < 6; i++) {
    const a = i / 6 * Math.PI * 2;
    dummy.position.set(0, -0.43, 0.181);
    dummy.rotation.set(0, 0, a);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tourbillon_spokes.setMatrixAt(i, dummy.matrix);
  }
  tourbillon_spokes.instanceMatrix.needsUpdate = true;
  root.add(tourbillon_spokes);

  const tourbillon_balanceGeom = new THREE.TorusGeometry(0.075, 0.014, 8, 32);
  const tourbillon_balance = new THREE.Mesh(tourbillon_balanceGeom, goldMat);
  tourbillon_balance.name = "tourbillon_balance";
  tourbillon_balance.position.set(0, -0.43, 0.188);
  root.add(tourbillon_balance);

  const tourbillon_jewelGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 20);
  const tourbillon_jewel = new THREE.Mesh(tourbillon_jewelGeom, jewelMat);
  tourbillon_jewel.name = "tourbillon_jewel";
  tourbillon_jewel.rotation.x = Math.PI / 2;
  tourbillon_jewel.position.set(0, -0.43, 0.195);
  root.add(tourbillon_jewel);

  const mechanism_gearsGeom = new THREE.TorusGeometry(0.052, 0.011, 8, 24);
  const mechanism_gears = new THREE.InstancedMesh(mechanism_gearsGeom, goldMat, 3);
  mechanism_gears.name = "mechanism_gears";
  const mechanismGearPositions = [
    [-0.14, -0.50],
    [0.14, -0.50],
    [0.00, -0.58],
  ];
  for (let i = 0; i < mechanismGearPositions.length; i++) {
    dummy.position.set(mechanismGearPositions[i][0], mechanismGearPositions[i][1], 0.184);
    dummy.rotation.set(0, 0, i * 0.4);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    mechanism_gears.setMatrixAt(i, dummy.matrix);
  }
  mechanism_gears.instanceMatrix.needsUpdate = true;
  root.add(mechanism_gears);

  const mechanism_screwsGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.012, 16);
  const mechanism_screws = new THREE.InstancedMesh(mechanism_screwsGeom, silverMat, 4);
  mechanism_screws.name = "mechanism_screws";
  const mechanismScrewPositions = [
    [-0.18, -0.42],
    [0.18, -0.42],
    [-0.16, -0.58],
    [0.16, -0.58],
  ];
  for (let i = 0; i < mechanismScrewPositions.length; i++) {
    dummy.position.set(mechanismScrewPositions[i][0], mechanismScrewPositions[i][1], 0.188);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    mechanism_screws.setMatrixAt(i, dummy.matrix);
  }
  mechanism_screws.instanceMatrix.needsUpdate = true;
  root.add(mechanism_screws);

  const brand_glyphsGeom = new THREE.BoxGeometry(0.028, 0.052, 0.007);
  const brand_glyphs = new THREE.InstancedMesh(brand_glyphsGeom, dial_printMat, 9);
  brand_glyphs.name = "brand_glyphs";
  for (let i = 0; i < 9; i++) {
    dummy.position.set(-0.18 + i * 0.045, 0.075, 0.158);
    dummy.rotation.set(0, 0, i % 2 === 0 ? 0.08 : -0.08);
    dummy.scale.set(0.75 + (i % 3) * 0.15, 0.8 + (i % 4) * 0.08, 1);
    dummy.updateMatrix();
    brand_glyphs.setMatrixAt(i, dummy.matrix);
  }
  brand_glyphs.instanceMatrix.needsUpdate = true;
  root.add(brand_glyphs);

  const brand_underlineGeom = new THREE.BoxGeometry(0.32, 0.008, 0.007);
  const brand_underline = new THREE.Mesh(brand_underlineGeom, dial_printMat);
  brand_underline.name = "brand_underline";
  brand_underline.position.set(0, 0.025, 0.158);
  root.add(brand_underline);

  const hour_handGeom = makeHandGeometry(0.43, 0.075);
  const hour_hand = new THREE.Mesh(hour_handGeom, handMat);
  hour_hand.name = "hour_hand";
  hour_hand.position.z = 0.202;
  hour_hand.rotation.z = Math.PI / 3;
  root.add(hour_hand);

  const minute_handGeom = makeHandGeometry(0.61, 0.052);
  const minute_hand = new THREE.Mesh(minute_handGeom, handMat);
  minute_hand.name = "minute_hand";
  minute_hand.position.z = 0.207;
  minute_hand.rotation.z = -Math.PI / 3;
  root.add(minute_hand);

  const seconds_handGeom = new THREE.BoxGeometry(0.012, 0.72, 0.008);
  const seconds_hand = new THREE.Mesh(seconds_handGeom, redMat);
  seconds_hand.name = "seconds_hand";
  seconds_hand.position.set(0.036, 0.29, 0.213);
  seconds_hand.rotation.z = -0.10;
  root.add(seconds_hand);

  const seconds_counterweightGeom = new THREE.CircleGeometry(0.045, 20);
  const seconds_counterweight = new THREE.Mesh(seconds_counterweightGeom, redMat);
  seconds_counterweight.name = "seconds_counterweight";
  seconds_counterweight.position.set(0.007, -0.085, 0.214);
  root.add(seconds_counterweight);

  const center_hubGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.025, 24);
  const center_hub = new THREE.Mesh(center_hubGeom, handMat);
  center_hub.name = "center_hub";
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.221;
  root.add(center_hub);

  const center_capGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.029, 20);
  const center_cap = new THREE.Mesh(center_capGeom, jewelMat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.226;
  root.add(center_cap);

  const crown_stemGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.14, 20);
  const crown_stem = new THREE.Mesh(crown_stemGeom, polished_metalMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(1.00, 0, 0);
  root.add(crown_stem);

  const crown_bodyGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.17, 32);
  const crown_body = new THREE.Mesh(crown_bodyGeom, silverMat);
  crown_body.name = "crown_body";
  crown_body.rotation.z = Math.PI / 2;
  crown_body.position.set(1.10, 0, 0);
  root.add(crown_body);

  const crown_ridgesGeom = new THREE.BoxGeometry(0.17, 0.025, 0.044);
  const crown_ridges = new THREE.InstancedMesh(crown_ridgesGeom, silverMat, 20);
  crown_ridges.name = "crown_ridges";
  for (let i = 0; i < 20; i++) {
    const a = i / 20 * Math.PI * 2;
    dummy.position.set(1.10, Math.cos(a) * 0.135, Math.sin(a) * 0.135);
    dummy.rotation.set(a, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  root.add(crown_ridges);

  const crown_capGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.018, 28);
  const crown_cap = new THREE.Mesh(crown_capGeom, polished_metalMat);
  crown_cap.name = "crown_cap";
  crown_cap.rotation.z = Math.PI / 2;
  crown_cap.position.set(1.195, 0, 0);
  root.add(crown_cap);

  const upper_pusher_stemGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.13, 18);
  const upper_pusher_stem = new THREE.Mesh(upper_pusher_stemGeom, polished_metalMat);
  upper_pusher_stem.name = "upper_pusher_stem";
  upper_pusher_stem.rotation.z = Math.PI / 2;
  upper_pusher_stem.position.set(1.00, 0.45, 0);
  root.add(upper_pusher_stem);

  const upper_pusherGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.15, 24);
  const upper_pusher = new THREE.Mesh(upper_pusherGeom, silverMat);
  upper_pusher.name = "upper_pusher";
  upper_pusher.rotation.z = Math.PI / 2;
  upper_pusher.position.set(1.09, 0.45, 0);
  root.add(upper_pusher);

  const upper_pusher_capGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24);
  const upper_pusher_cap = new THREE.Mesh(upper_pusher_capGeom, polished_metalMat);
  upper_pusher_cap.name = "upper_pusher_cap";
  upper_pusher_cap.rotation.z = Math.PI / 2;
  upper_pusher_cap.position.set(1.175, 0.45, 0);
  root.add(upper_pusher_cap);

  const lower_pusher_stemGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.13, 18);
  const lower_pusher_stem = new THREE.Mesh(lower_pusher_stemGeom, polished_metalMat);
  lower_pusher_stem.name = "lower_pusher_stem";
  lower_pusher_stem.rotation.z = Math.PI / 2;
  lower_pusher_stem.position.set(1.00, -0.45, 0);
  root.add(lower_pusher_stem);

  const lower_pusherGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.15, 24);
  const lower_pusher = new THREE.Mesh(lower_pusherGeom, silverMat);
  lower_pusher.name = "lower_pusher";
  lower_pusher.rotation.z = Math.PI / 2;
  lower_pusher.position.set(1.09, -0.45, 0);
  root.add(lower_pusher);

  const lower_pusher_capGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24);
  const lower_pusher_cap = new THREE.Mesh(lower_pusher_capGeom, polished_metalMat);
  lower_pusher_cap.name = "lower_pusher_cap";
  lower_pusher_cap.rotation.z = Math.PI / 2;
  lower_pusher_cap.position.set(1.175, -0.45, 0);
  root.add(lower_pusher_cap);

  const crystalGeom = new THREE.CircleGeometry(0.82, 64);
  const crystal = new THREE.Mesh(crystalGeom, glassMat);
  crystal.name = "crystal";
  crystal.position.z = 0.242;
  root.add(crystal);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}