export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "skeleton_wristwatch";

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const dark_gunmetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dial_champagneMat = new THREE.MeshStandardMaterial({
    color: 0xd9c991,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const subdial_creamMat = new THREE.MeshStandardMaterial({
    color: 0xeee4c8,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const dial_darkMat = new THREE.MeshStandardMaterial({
    color: 0x242629,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x151619,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const leather_liningMat = new THREE.MeshStandardMaterial({
    color: 0xb9a584,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x6b3d31,
    metalness: 0.0,
    roughness: 0.95,
  });
  const red_pinMat = new THREE.MeshStandardMaterial({
    color: 0x8d1722,
    metalness: 0.0,
    roughness: 0.4,
  });
  const jewelMat = new THREE.MeshStandardMaterial({
    color: 0xa81945,
    metalness: 0.0,
    roughness: 0.3,
  });
  const clear_crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function makeDiscGeometry(radius, segments = 64) {
    return new THREE.CircleGeometry(radius, segments);
  }

  function makeHandGeometry(length, width, tail, depth = 0.025) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.48, -tail);
    shape.lineTo(width * 0.48, -tail);
    shape.lineTo(width * 0.34, length * 0.76);
    shape.lineTo(0, length);
    shape.lineTo(-width * 0.34, length * 0.76);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    });
  }

  function makeLugGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0.62, 0.82);
    shape.bezierCurveTo(0.67, 1.04, 0.73, 1.31, 0.76, 1.51);
    shape.quadraticCurveTo(0.77, 1.62, 0.87, 1.64);
    shape.quadraticCurveTo(1.02, 1.63, 1.09, 1.52);
    shape.bezierCurveTo(1.12, 1.28, 1.22, 1.01, 1.34, 0.82);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3,
    });
  }

  function makeStrapGeometry(top) {
    const shape = new THREE.Shape();
    if (top) {
      shape.moveTo(-0.5, 1.34);
      shape.bezierCurveTo(-0.55, 1.58, -0.64, 2.02, -0.61, 2.25);
      shape.bezierCurveTo(-0.42, 2.33, 0.42, 2.33, 0.61, 2.25);
      shape.bezierCurveTo(0.64, 2.02, 0.55, 1.58, 0.5, 1.34);
    } else {
      shape.moveTo(-0.5, -1.34);
      shape.bezierCurveTo(-0.55, -1.58, -0.64, -2.02, -0.61, -2.25);
      shape.bezierCurveTo(-0.42, -2.33, 0.42, -2.33, 0.61, -2.25);
      shape.bezierCurveTo(0.64, -2.02, 0.55, -1.58, 0.5, -1.34);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.16,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3,
    });
  }

  function makeStrapPaddingGeometry(top) {
    const shape = new THREE.Shape();
    if (top) {
      shape.moveTo(-0.42, 1.42);
      shape.bezierCurveTo(-0.47, 1.68, -0.54, 2.02, -0.51, 2.18);
      shape.bezierCurveTo(-0.34, 2.24, 0.34, 2.24, 0.51, 2.18);
      shape.bezierCurveTo(0.54, 2.02, 0.47, 1.68, 0.42, 1.42);
    } else {
      shape.moveTo(-0.42, -1.42);
      shape.bezierCurveTo(-0.47, -1.68, -0.54, -2.02, -0.51, -2.18);
      shape.bezierCurveTo(-0.34, -2.24, 0.34, -2.24, 0.51, -2.18);
      shape.bezierCurveTo(0.54, -2.02, 0.47, -1.68, 0.42, -1.42);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.045,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 2,
    });
  }

  function makeApertureGeometry(radius) {
    const shape = new THREE.Shape();
    const openings = [
      [0, 0, radius * 0.7],
      [-radius * 0.53, -radius * 0.22, radius * 0.22],
      [radius * 0.53, -radius * 0.22, radius * 0.22],
      [-radius * 0.43, radius * 0.48, radius * 0.18],
      [radius * 0.43, radius * 0.48, radius * 0.18],
    ];
    shape.moveTo(radius, 0);
    shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
    for (const opening of openings) {
      const hole = new THREE.Path();
      hole.moveTo(opening[0] + opening[2], opening[1]);
      hole.absarc(opening[0], opening[1], opening[2], 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
    return new THREE.ShapeGeometry(shape, 48);
  }

  function addStrapSeam(name, top, y, radius) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.43, top * y, 0.235),
      new THREE.Vector3(0, top * (y + 0.015), 0.255),
      new THREE.Vector3(0.43, top * y, 0.235),
    ]);
    const seam = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 16, radius, 8, false),
      leatherMat
    );
    seam.name = name;
    root.add(seam);
    return seam;
  }

  const top_strap_liningGeom = makeStrapGeometry(true);
  const top_strap_lining = new THREE.Mesh(top_strap_liningGeom, leather_liningMat);
  top_strap_lining.name = "top_strap_lining";
  top_strap_lining.position.z = -0.34;
  root.add(top_strap_lining);

  const bottom_strap_liningGeom = makeStrapGeometry(false);
  const bottom_strap_lining = new THREE.Mesh(bottom_strap_liningGeom, leather_liningMat);
  bottom_strap_lining.name = "bottom_strap_lining";
  bottom_strap_lining.position.z = -0.34;
  root.add(bottom_strap_lining);

  const top_strapGeom = makeStrapGeometry(true);
  const top_strap = new THREE.Mesh(top_strapGeom, leatherMat);
  top_strap.name = "top_strap";
  top_strap.position.z = -0.27;
  root.add(top_strap);

  const bottom_strapGeom = makeStrapGeometry(false);
  const bottom_strap = new THREE.Mesh(bottom_strapGeom, leatherMat);
  bottom_strap.name = "bottom_strap";
  bottom_strap.position.z = -0.27;
  root.add(bottom_strap);

  const top_strap_paddingGeom = makeStrapPaddingGeometry(true);
  const top_strap_padding = new THREE.Mesh(top_strap_paddingGeom, leatherMat);
  top_strap_padding.name = "top_strap_padding";
  top_strap_padding.position.z = 0.075;
  root.add(top_strap_padding);

  const bottom_strap_paddingGeom = makeStrapPaddingGeometry(false);
  const bottom_strap_padding = new THREE.Mesh(bottom_strap_paddingGeom, leatherMat);
  bottom_strap_padding.name = "bottom_strap_padding";
  bottom_strap_padding.position.z = 0.075;
  root.add(bottom_strap_padding);

  const strap_stitchGeom = new THREE.BoxGeometry(0.026, 0.075, 0.018);
  const strap_stitches = new THREE.InstancedMesh(strap_stitchGeom, stitchMat, 24);
  strap_stitches.name = "strap_stitches";
  const stitch_dummy = new THREE.Object3D();
  let stitch_index = 0;
  for (const top of [true, false]) {
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      const y = top * (1.62 + i * 0.115);
      const x = 0.43 + 0.075 * t;
      for (const side of [-1, 1]) {
        stitch_dummy.position.set(side * x, y, 0.15);
        stitch_dummy.rotation.set(0, 0, top ? side * -0.12 : -top * side * -0.12);
        stitch_dummy.scale.set(1, 1, 1);
        stitch_dummy.updateMatrix();
        strap_stitches.setMatrixAt(stitch_index++, stitch_dummy.matrix);
      }
    }
  }
  strap_stitches.instanceMatrix.needsUpdate = true;
  root.add(strap_stitches);

  const top_strap_cross_seam = addStrapSeam(
    "top_strap_cross_seam",
    true,
    1.58,
    0.018
  );
  const bottom_strap_cross_seam = addStrapSeam(
    "bottom_strap_cross_seam",
    false,
    1.58,
    0.018
  );
  const top_strap_center_crease = addStrapSeam(
    "top_strap_center_crease",
    true,
    1.92,
    0.007
  );
  const bottom_strap_center_crease = addStrapSeam(
    "bottom_strap_center_crease",
    false,
    1.92,
    0.007
  );

  const spring_barGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.98, 16);
  const top_spring_bar = new THREE.Mesh(spring_barGeom, dark_gunmetalMat);
  top_spring_bar.name = "top_spring_bar";
  top_spring_bar.rotation.z = Math.PI / 2;
  top_spring_bar.position.set(0, 1.5, 0.03);
  root.add(top_spring_bar);

  const bottom_spring_bar = new THREE.Mesh(spring_barGeom, dark_gunmetalMat);
  bottom_spring_bar.name = "bottom_spring_bar";
  bottom_spring_bar.rotation.z = Math.PI / 2;
  bottom_spring_bar.position.set(0, -1.5, 0.03);
  root.add(bottom_spring_bar);

  const right_top_lugGeom = makeLugGeometry();
  const right_top_lug = new THREE.Mesh(right_top_lugGeom, polished_metalMat);
  right_top_lug.name = "right_top_lug";
  right_top_lug.position.z = -0.16;
  root.add(right_top_lug);

  const left_top_lugGeom = right_top_lugGeom;
  const left_top_lug = new THREE.Mesh(left_top_lugGeom, polished_metalMat);
  left_top_lug.name = "left_top_lug";
  left_top_lug.scale.x = -1;
  left_top_lug.position.z = -0.16;
  root.add(left_top_lug);

  const right_bottom_lugGeom = right_top_lugGeom;
  const right_bottom_lug = new THREE.Mesh(right_bottom_lugGeom, polished_metalMat);
  right_bottom_lug.name = "right_bottom_lug";
  right_bottom_lug.scale.y = -1;
  right_bottom_lug.position.z = -0.16;
  root.add(right_bottom_lug);

  const left_bottom_lugGeom = right_top_lugGeom;
  const left_bottom_lug = new THREE.Mesh(left_bottom_lugGeom, polished_metalMat);
  left_bottom_lug.name = "left_bottom_lug";
  left_bottom_lug.scale.set(-1, -1, 1);
  left_bottom_lug.position.z = -0.16;
  root.add(left_bottom_lug);

  const case_bodyGeom = new THREE.CylinderGeometry(1.47, 1.47, 0.34, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, polished_metalMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  root.add(case_body);

  const case_backGeom = new THREE.CylinderGeometry(1.39, 1.39, 0.08, 64);
  const case_back = new THREE.Mesh(case_backGeom, brushed_metalMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.19;
  root.add(case_back);

  const bezel_outerGeom = new THREE.TorusGeometry(1.36, 0.105, 16, 64);
  const bezel_outer = new THREE.Mesh(bezel_outerGeom, polished_metalMat);
  bezel_outer.name = "bezel_outer";
  bezel_outer.position.z = 0.225;
  root.add(bezel_outer);

  const bezel_innerGeom = new THREE.TorusGeometry(1.245, 0.032, 12, 64);
  const bezel_inner = new THREE.Mesh(bezel_innerGeom, silver_metalMat);
  bezel_inner.name = "bezel_inner";
  bezel_inner.position.z = 0.252;
  root.add(bezel_inner);

  const dial_baseGeom = makeDiscGeometry(1.225);
  const dial_base = new THREE.Mesh(dial_baseGeom, dial_champagneMat);
  dial_base.name = "dial_base";
  dial_base.position.z = 0.205;
  root.add(dial_base);

  const chapter_ringGeom = new THREE.RingGeometry(1.02, 1.205, 64);
  const chapter_ring = new THREE.Mesh(chapter_ringGeom, subdial_creamMat);
  chapter_ring.name = "chapter_ring";
  chapter_ring.position.z = 0.222;
  root.add(chapter_ring);

  const inner_dial_fieldGeom = makeDiscGeometry(1.015);
  const inner_dial_field = new THREE.Mesh(inner_dial_fieldGeom, dial_champagneMat);
  inner_dial_field.name = "inner_dial_field";
  inner_dial_field.position.z = 0.224;
  root.add(inner_dial_field);

  const minute_tickGeom = new THREE.BoxGeometry(0.012, 0.065, 0.014);
  const minute_ticks = new THREE.InstancedMesh(minute_tickGeom, dial_darkMat, 60);
  minute_ticks.name = "minute_ticks";
  const tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 1.145,
      Math.cos(angle) * 1.145,
      0.242
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(i % 5 === 0 ? 1.35 : 1, i % 5 === 0 ? 1.3 : 1, 1);
    tick_dummy.updateMatrix();
    minute_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  minute_ticks.instanceMatrix.needsUpdate = true;
  root.add(minute_ticks);

  const hour_markerGeom = new THREE.BoxGeometry(0.075, 0.19, 0.018);
  const hour_markers = new THREE.InstancedMesh(hour_markerGeom, dial_darkMat, 12);
  hour_markers.name = "hour_markers";
  const marker_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    marker_dummy.position.set(
      Math.sin(angle) * 0.92,
      Math.cos(angle) * 0.92,
      0.247
    );
    marker_dummy.rotation.set(0, 0, -angle);
    marker_dummy.scale.set(i % 3 === 0 ? 1.25 : 1, i % 3 === 0 ? 1.12 : 1, 1);
    marker_dummy.updateMatrix();
    hour_markers.setMatrixAt(i, marker_dummy.matrix);
  }
  hour_markers.instanceMatrix.needsUpdate = true;
  root.add(hour_markers);

  const top_subdialGeom = makeDiscGeometry(0.48);
  const top_subdial = new THREE.Mesh(top_subdialGeom, subdial_creamMat);
  top_subdial.name = "top_subdial";
  top_subdial.position.set(0, 0.58, 0.249);
  root.add(top_subdial);

  const left_subdialGeom = makeDiscGeometry(0.4);
  const left_subdial = new THREE.Mesh(left_subdialGeom, subdial_creamMat);
  left_subdial.name = "left_subdial";
  left_subdial.position.set(-0.56, -0.27, 0.249);
  root.add(left_subdial);

  const right_subdialGeom = makeDiscGeometry(0.4);
  const right_subdial = new THREE.Mesh(right_subdialGeom, subdial_creamMat);
  right_subdial.name = "right_subdial";
  right_subdial.position.set(0.56, -0.27, 0.249);
  root.add(right_subdial);

  const top_subdial_ringGeom = new THREE.RingGeometry(0.435, 0.472, 48);
  const top_subdial_ring = new THREE.Mesh(top_subdial_ringGeom, dial_champagneMat);
  top_subdial_ring.name = "top_subdial_ring";
  top_subdial_ring.position.set(0, 0.58, 0.254);
  root.add(top_subdial_ring);

  const left_subdial_ringGeom = new THREE.RingGeometry(0.36, 0.397, 48);
  const left_subdial_ring = new THREE.Mesh(left_subdial_ringGeom, dial_champagneMat);
  left_subdial_ring.name = "left_subdial_ring";
  left_subdial_ring.position.set(-0.56, -0.27, 0.254);
  root.add(left_subdial_ring);

  const right_subdial_ringGeom = new THREE.RingGeometry(0.36, 0.397, 48);
  const right_subdial_ring = new THREE.Mesh(right_subdial_ringGeom, dial_champagneMat);
  right_subdial_ring.name = "right_subdial_ring";
  right_subdial_ring.position.set(0.56, -0.27, 0.254);
  root.add(right_subdial_ring);

  const subdial_tickGeom = new THREE.BoxGeometry(0.011, 0.052, 0.012);
  const subdial_ticks = new THREE.InstancedMesh(subdial_tickGeom, dial_darkMat, 60);
  subdial_ticks.name = "subdial_ticks";
  const subdial_dummy = new THREE.Object3D();
  const subdial_specs = [
    [0, 0.58, 0.395],
    [-0.56, -0.27, 0.315],
    [0.56, -0.27, 0.315],
  ];
  let subdial_tick_index = 0;
  for (const spec of subdial_specs) {
    for (let i = 0; i < 20; i++) {
      const angle = i / 20 * Math.PI * 2;
      subdial_dummy.position.set(
        spec[0] + Math.sin(angle) * spec[2],
        spec[1] + Math.cos(angle) * spec[2],
        0.266
      );
      subdial_dummy.rotation.set(0, 0, -angle);
      subdial_dummy.scale.set(1, i % 5 === 0 ? 1.35 : 1, 1);
      subdial_dummy.updateMatrix();
      subdial_ticks.setMatrixAt(subdial_tick_index++, subdial_dummy.matrix);
    }
  }
  subdial_ticks.instanceMatrix.needsUpdate = true;
  root.add(subdial_ticks);

  const top_subdial_handGeom = makeHandGeometry(0.34, 0.035, 0.07, 0.014);
  const top_subdial_hand = new THREE.Mesh(top_subdial_handGeom, dark_gunmetalMat);
  top_subdial_hand.name = "top_subdial_hand";
  top_subdial_hand.position.set(0, 0.58, 0.273);
  top_subdial_hand.rotation.z = -0.35;
  root.add(top_subdial_hand);

  const left_subdial_handGeom = makeHandGeometry(0.28, 0.032, 0.06, 0.014);
  const left_subdial_hand = new THREE.Mesh(left_subdial_handGeom, dark_gunmetalMat);
  left_subdial_hand.name = "left_subdial_hand";
  left_subdial_hand.position.set(-0.56, -0.27, 0.273);
  left_subdial_hand.rotation.z = 0.48;
  root.add(left_subdial_hand);

  const right_subdial_handGeom = makeHandGeometry(0.28, 0.032, 0.06, 0.014);
  const right_subdial_hand = new THREE.Mesh(right_subdial_handGeom, dark_gunmetalMat);
  right_subdial_hand.name = "right_subdial_hand";
  right_subdial_hand.position.set(0.56, -0.27, 0.273);
  right_subdial_hand.rotation.z = -2.15;
  root.add(right_subdial_hand);

  const subdial_hubGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.035, 20);
  const top_subdial_hub = new THREE.Mesh(subdial_hubGeom, dark_gunmetalMat);
  top_subdial_hub.name = "top_subdial_hub";
  top_subdial_hub.rotation.x = Math.PI / 2;
  top_subdial_hub.position.set(0, 0.58, 0.292);
  root.add(top_subdial_hub);

  const left_subdial_hub = new THREE.Mesh(subdial_hubGeom, dark_gunmetalMat);
  left_subdial_hub.name = "left_subdial_hub";
  left_subdial_hub.rotation.x = Math.PI / 2;
  left_subdial_hub.position.set(-0.56, -0.27, 0.292);
  root.add(left_subdial_hub);

  const right_subdial_hub = new THREE.Mesh(subdial_hubGeom, dark_gunmetalMat);
  right_subdial_hub.name = "right_subdial_hub";
  right_subdial_hub.rotation.x = Math.PI / 2;
  right_subdial_hub.position.set(0.56, -0.27, 0.292);
  root.add(right_subdial_hub);

  const subdial_hub_capGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.04, 16);
  const top_subdial_hub_cap = new THREE.Mesh(subdial_hub_capGeom, red_pinMat);
  top_subdial_hub_cap.name = "top_subdial_hub_cap";
  top_subdial_hub_cap.rotation.x = Math.PI / 2;
  top_subdial_hub_cap.position.set(0, 0.58, 0.311);
  root.add(top_subdial_hub_cap);

  const top_subdial_pinGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.026, 18);
  const top_subdial_pins = new THREE.InstancedMesh(
    top_subdial_pinGeom,
    dark_gunmetalMat,
    2
  );
  top_subdial_pins.name = "top_subdial_pins";
  const pin_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    pin_dummy.position.set(i === 0 ? -0.2 : 0.2, 0.61, 0.286);
    pin_dummy.rotation.set(Math.PI / 2, 0, 0);
    pin_dummy.scale.set(1, 1, 1);
    pin_dummy.updateMatrix();
    top_subdial_pins.setMatrixAt(i, pin_dummy.matrix);
  }
  top_subdial_pins.instanceMatrix.needsUpdate = true;
  root.add(top_subdial_pins);

  const open_heart_apertureGeom = makeApertureGeometry(0.43);
  const open_heart_aperture = new THREE.Mesh(
    open_heart_apertureGeom,
    dial_darkMat
  );
  open_heart_aperture.name = "open_heart_aperture";
  open_heart_aperture.position.set(0, -0.68, 0.252);
  root.add(open_heart_aperture);

  const open_heart_rimGeom = new THREE.TorusGeometry(0.43, 0.026, 10, 48);
  const open_heart_rim = new THREE.Mesh(open_heart_rimGeom, silver_metalMat);
  open_heart_rim.name = "open_heart_rim";
  open_heart_rim.position.set(0, -0.68, 0.272);
  root.add(open_heart_rim);

  const mechanism_gearGeom = new THREE.TorusGeometry(0.1, 0.025, 8, 20);
  const mechanism_gears = new THREE.InstancedMesh(
    mechanism_gearGeom,
    brushed_metalMat,
    3
  );
  mechanism_gears.name = "mechanism_gears";
  const gear_dummy = new THREE.Object3D();
  const gear_positions = [
    [-0.22, -0.72, 1.0],
    [0.22, -0.68, 0.86],
    [0.02, -0.88, 0.72],
  ];
  for (let i = 0; i < gear_positions.length; i++) {
    gear_dummy.position.set(gear_positions[i][0], gear_positions[i][1], 0.279);
    gear_dummy.rotation.set(0, 0, i * 0.45);
    gear_dummy.scale.setScalar(gear_positions[i][2]);
    gear_dummy.updateMatrix();
    mechanism_gears.setMatrixAt(i, gear_dummy.matrix);
  }
  mechanism_gears.instanceMatrix.needsUpdate = true;
  root.add(mechanism_gears);

  const mechanism_spokeGeom = new THREE.BoxGeometry(0.045, 0.34, 0.018);
  const mechanism_spokes = new THREE.InstancedMesh(
    mechanism_spokeGeom,
    silver_metalMat,
    3
  );
  mechanism_spokes.name = "mechanism_spokes";
  const spoke_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    spoke_dummy.position.set(0, -0.68, 0.283);
    spoke_dummy.rotation.set(0, 0, i / 3 * Math.PI);
    spoke_dummy.scale.set(1, 1, 1);
    spoke_dummy.updateMatrix();
    mechanism_spokes.setMatrixAt(i, spoke_dummy.matrix);
  }
  mechanism_spokes.instanceMatrix.needsUpdate = true;
  root.add(mechanism_spokes);

  const balance_wheelGeom = new THREE.TorusGeometry(0.19, 0.018, 8, 32);
  const balance_wheel = new THREE.Mesh(balance_wheelGeom, silver_metalMat);
  balance_wheel.name = "balance_wheel";
  balance_wheel.position.set(0, -0.68, 0.294);
  root.add(balance_wheel);

  const balance_bridgeGeom = new THREE.BoxGeometry(0.055, 0.31, 0.022);
  const balance_bridge = new THREE.Mesh(balance_bridgeGeom, brushed_metalMat);
  balance_bridge.name = "balance_bridge";
  balance_bridge.position.set(0, -0.68, 0.302);
  balance_bridge.rotation.z = 0.18;
  root.add(balance_bridge);

  const balance_jewelGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.03, 20);
  const balance_jewel = new THREE.Mesh(balance_jewelGeom, jewelMat);
  balance_jewel.name = "balance_jewel";
  balance_jewel.rotation.x = Math.PI / 2;
  balance_jewel.position.set(0, -0.68, 0.316);
  root.add(balance_jewel);

  const mechanism_screwGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.025, 16);
  const mechanism_screws = new THREE.InstancedMesh(
    mechanism_screwGeom,
    silver_metalMat,
    3
  );
  mechanism_screws.name = "mechanism_screws";
  const screw_dummy = new THREE.Object3D();
  const screw_positions = [
    [-0.25, -0.61],
    [0.25, -0.61],
    [0, -0.91],
  ];
  for (let i = 0; i < screw_positions.length; i++) {
    screw_dummy.position.set(screw_positions[i][0], screw_positions[i][1], 0.3);
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.scale.set(1, 1, 1);
    screw_dummy.updateMatrix();
    mechanism_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  mechanism_screws.instanceMatrix.needsUpdate = true;
  root.add(mechanism_screws);

  const screw_slotGeom = new THREE.BoxGeometry(0.065, 0.012, 0.012);
  const screw_slots = new THREE.InstancedMesh(screw_slotGeom, dark_gunmetalMat, 3);
  screw_slots.name = "screw_slots";
  const slot_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_positions.length; i++) {
    slot_dummy.position.set(screw_positions[i][0], screw_positions[i][1], 0.317);
    slot_dummy.rotation.set(0, 0, -0.5 + i * 0.5);
    slot_dummy.scale.set(1, 1, 1);
    slot_dummy.updateMatrix();
    screw_slots.setMatrixAt(i, slot_dummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  root.add(screw_slots);

  const hour_handGeom = makeHandGeometry(0.72, 0.095, 0.17);
  const hour_hand = new THREE.Mesh(hour_handGeom, dark_gunmetalMat);
  hour_hand.name = "hour_hand";
  hour_hand.position.set(0, 0, 0.292);
  hour_hand.rotation.z = 0.82;
  root.add(hour_hand);

  const minute_handGeom = makeHandGeometry(1.0, 0.07, 0.19);
  const minute_hand = new THREE.Mesh(minute_handGeom, dark_gunmetalMat);
  minute_hand.name = "minute_hand";
  minute_hand.position.set(0, 0, 0.304);
  minute_hand.rotation.z = -1.02;
  root.add(minute_hand);

  const central_seconds_handGeom = new THREE.BoxGeometry(0.018, 1.25, 0.018);
  const central_seconds_hand = new THREE.Mesh(
    central_seconds_handGeom,
    red_pinMat
  );
  central_seconds_hand.name = "central_seconds_hand";
  central_seconds_hand.position.set(0, 0.31, 0.326);
  root.add(central_seconds_hand);

  const central_hubGeom = new THREE.CylinderGeometry(0.115, 0.115, 0.055, 24);
  const central_hub = new THREE.Mesh(central_hubGeom, dark_gunmetalMat);
  central_hub.name = "central_hub";
  central_hub.rotation.x = Math.PI / 2;
  central_hub.position.set(0, 0, 0.337);
  root.add(central_hub);

  const central_pinGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.065, 20);
  const central_pin = new THREE.Mesh(central_pinGeom, red_pinMat);
  central_pin.name = "central_pin";
  central_pin.rotation.x = Math.PI / 2;
  central_pin.position.set(0, 0, 0.365);
  root.add(central_pin);

  const crown_stemGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.2, 20);
  const crown_stem = new THREE.Mesh(crown_stemGeom, dark_gunmetalMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(1.47, -0.12, 0);
  root.add(crown_stem);

  const crownGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.27, 32);
  const crown = new THREE.Mesh(crownGeom, silver_metalMat);
  crown.name = "crown";
  crown.rotation.z = Math.PI / 2;
  crown.position.set(1.63, -0.12, 0);
  root.add(crown);

  const crown_ridgeGeom = new THREE.BoxGeometry(0.285, 0.025, 0.045);
  const crown_ridges = new THREE.InstancedMesh(
    crown_ridgeGeom,
    polished_metalMat,
    20
  );
  crown_ridges.name = "crown_ridges";
  const crown_dummy = new THREE.Object3D();
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    crown_dummy.position.set(
      1.63,
      -0.12 + Math.cos(angle) * 0.207,
      Math.sin(angle) * 0.207
    );
    crown_dummy.rotation.set(angle, 0, 0);
    crown_dummy.scale.set(1, 1, 1);
    crown_dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, crown_dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  root.add(crown_ridges);

  const crown_capGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.025, 28);
  const crown_cap = new THREE.Mesh(crown_capGeom, polished_metalMat);
  crown_cap.name = "crown_cap";
  crown_cap.rotation.z = Math.PI / 2;
  crown_cap.position.set(1.78, -0.12, 0);
  root.add(crown_cap);

  const pusher_stemGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.18, 18);
  const upper_pusher_stem = new THREE.Mesh(pusher_stemGeom, dark_gunmetalMat);
  upper_pusher_stem.name = "upper_pusher_stem";
  upper_pusher_stem.rotation.z = Math.PI / 2;
  upper_pusher_stem.position.set(1.46, 0.62, 0);
  root.add(upper_pusher_stem);

  const lower_pusher_stem = new THREE.Mesh(pusher_stemGeom, dark_gunmetalMat);
  lower_pusher_stem.name = "lower_pusher_stem";
  lower_pusher_stem.rotation.z = Math.PI / 2;
  lower_pusher_stem.position.set(1.46, -0.7, 0);
  root.add(lower_pusher_stem);

  const pusherGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.25, 24);
  const upper_pusher = new THREE.Mesh(pusherGeom, silver_metalMat);
  upper_pusher.name = "upper_pusher";
  upper_pusher.rotation.z = Math.PI / 2;
  upper_pusher.position.set(1.59, 0.62, 0);
  root.add(upper_pusher);

  const lower_pusher = new THREE.Mesh(pusherGeom, silver_metalMat);
  lower_pusher.name = "lower_pusher";
  lower_pusher.rotation.z = Math.PI / 2;
  lower_pusher.position.set(1.59, -0.7, 0);
  root.add(lower_pusher);

  const pusher_capGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.025, 24);
  const upper_pusher_cap = new THREE.Mesh(pusher_capGeom, polished_metalMat);
  upper_pusher_cap.name = "upper_pusher_cap";
  upper_pusher_cap.rotation.z = Math.PI / 2;
  upper_pusher_cap.position.set(1.73, 0.62, 0);
  root.add(upper_pusher_cap);

  const lower_pusher_cap = new THREE.Mesh(pusher_capGeom, polished_metalMat);
  lower_pusher_cap.name = "lower_pusher_cap";
  lower_pusher_cap.rotation.z = Math.PI / 2;
  lower_pusher_cap.position.set(1.73, -0.7, 0);
  root.add(lower_pusher_cap);

  const crystalGeom = new THREE.CircleGeometry(1.225, 64);
  const crystal = new THREE.Mesh(crystalGeom, clear_crystalMat);
  crystal.name = "crystal";
  crystal.position.z = 0.39;
  root.add(crystal);

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