export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wristwatch";

  const strap_group = new THREE.Group();
  strap_group.name = "strap_group";
  const case_group = new THREE.Group();
  case_group.name = "case_group";
  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";

  root.add(strap_group, case_group);
  case_group.add(dial_group, crown_group);

  const caseR = 1.62;
  const dialR = 1.33;

  const watch_caseMat = new THREE.MeshStandardMaterial({
    color: 0xf5d32f,
    metalness: 0.0,
    roughness: 0.3
  });
  const strapMat = new THREE.MeshStandardMaterial({
    color: 0xf7dc42,
    metalness: 0.0,
    roughness: 0.8
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xf8df58,
    metalness: 0.0,
    roughness: 0.3
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8bd82,
    metalness: 0.6,
    roughness: 0.2
  });
  const dark_goldMat = new THREE.MeshStandardMaterial({
    color: 0x9b7b42,
    metalness: 0.6,
    roughness: 0.2
  });
  const markerMat = new THREE.MeshStandardMaterial({
    color: 0xc7a93e,
    metalness: 0.0,
    roughness: 0.7
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = width / 2;
    const y = height / 2;
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.closePath();
    return shape;
  }

  const upper_strapShape = makeRoundedRectShape(1.82, 2.15, 0.14);
  const upper_strapGeom = new THREE.ExtrudeGeometry(upper_strapShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 3,
    curveSegments: 16
  });
  const upper_strap = new THREE.Mesh(upper_strapGeom, strapMat);
  upper_strap.name = "upper_strap";
  upper_strap.position.set(0, 2.2, -0.18);
  strap_group.add(upper_strap);

  const lower_strapShape = makeRoundedRectShape(1.78, 2.25, 0.14);
  const lower_strapGeom = new THREE.ExtrudeGeometry(lower_strapShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 3,
    curveSegments: 16
  });
  const lower_strap = new THREE.Mesh(lower_strapGeom, strapMat);
  lower_strap.name = "lower_strap";
  lower_strap.position.set(0, -2.25, -0.18);
  strap_group.add(lower_strap);

  const watch_caseShape = new THREE.Shape();
  watch_caseShape.moveTo(-0.78, 1.8);
  watch_caseShape.bezierCurveTo(-1.22, 1.78, -1.57, 1.3, -1.68, 0.65);
  watch_caseShape.bezierCurveTo(-1.78, 0.0, -1.62, -0.82, -1.25, -1.4);
  watch_caseShape.bezierCurveTo(-1.12, -1.6, -1.0, -1.72, -0.86, -1.8);
  watch_caseShape.lineTo(0.86, -1.8);
  watch_caseShape.bezierCurveTo(1.0, -1.72, 1.12, -1.6, 1.25, -1.4);
  watch_caseShape.bezierCurveTo(1.62, -0.82, 1.78, 0.0, 1.68, 0.65);
  watch_caseShape.bezierCurveTo(1.57, 1.3, 1.22, 1.78, 0.78, 1.8);
  watch_caseShape.closePath();

  const watch_caseGeom = new THREE.ExtrudeGeometry(watch_caseShape, {
    depth: 0.28,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.055,
    bevelSegments: 4,
    curveSegments: 28
  });
  const watch_case = new THREE.Mesh(watch_caseGeom, watch_caseMat);
  watch_case.name = "watch_case";
  watch_case.position.z = -0.14;
  case_group.add(watch_case);

  const case_roundGeom = new THREE.CylinderGeometry(caseR, caseR, 0.28, 64);
  const case_round = new THREE.Mesh(case_roundGeom, watch_caseMat);
  case_round.name = "case_round";
  case_round.rotation.x = Math.PI / 2;
  case_group.add(case_round);

  const outer_gold_bezelGeom = new THREE.CylinderGeometry(1.51, 1.51, 0.1, 64);
  const outer_gold_bezel = new THREE.Mesh(outer_gold_bezelGeom, goldMat);
  outer_gold_bezel.name = "outer_gold_bezel";
  outer_gold_bezel.rotation.x = Math.PI / 2;
  outer_gold_bezel.position.z = 0.19;
  dial_group.add(outer_gold_bezel);

  const dialGeom = new THREE.CylinderGeometry(dialR, dialR, 0.035, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.name = "dial";
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.247;
  dial_group.add(dial);

  const bezel_ringGeom = new THREE.TorusGeometry(1.42, 0.09, 16, 64);
  const bezel_ring = new THREE.Mesh(bezel_ringGeom, goldMat);
  bezel_ring.name = "bezel_ring";
  bezel_ring.position.z = 0.28;
  dial_group.add(bezel_ring);

  const inner_bezel_ringGeom = new THREE.TorusGeometry(1.335, 0.025, 12, 64);
  const inner_bezel_ring = new THREE.Mesh(inner_bezel_ringGeom, dark_goldMat);
  inner_bezel_ring.name = "inner_bezel_ring";
  inner_bezel_ring.position.z = 0.298;
  dial_group.add(inner_bezel_ring);

  const hour_markerGeom = new THREE.BoxGeometry(0.035, 0.13, 0.012);
  const hour_markers = new THREE.InstancedMesh(hour_markerGeom, markerMat, 4);
  hour_markers.name = "hour_markers";
  const marker_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = i * Math.PI / 2;
    marker_dummy.position.set(
      Math.sin(angle) * 1.11,
      Math.cos(angle) * 1.11,
      0.274
    );
    marker_dummy.rotation.set(0, 0, -angle);
    marker_dummy.updateMatrix();
    hour_markers.setMatrixAt(i, marker_dummy.matrix);
  }
  hour_markers.instanceMatrix.needsUpdate = true;
  dial_group.add(hour_markers);

  const hour_handShape = new THREE.Shape();
  hour_handShape.moveTo(-0.05, -0.13);
  hour_handShape.lineTo(-0.07, 0.1);
  hour_handShape.lineTo(-0.045, 0.63);
  hour_handShape.lineTo(0, 0.88);
  hour_handShape.lineTo(0.045, 0.63);
  hour_handShape.lineTo(0.07, 0.1);
  hour_handShape.lineTo(0.05, -0.13);
  hour_handShape.closePath();

  const hour_handGeom = new THREE.ExtrudeGeometry(hour_handShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  const hour_hand = new THREE.Mesh(hour_handGeom, dark_goldMat);
  hour_hand.name = "hour_hand";
  hour_hand.position.z = 0.286;
  hour_hand.rotation.z = Math.PI * 0.27;
  dial_group.add(hour_hand);

  const minute_handShape = new THREE.Shape();
  minute_handShape.moveTo(-0.035, -0.15);
  minute_handShape.lineTo(-0.042, 0.12);
  minute_handShape.lineTo(-0.022, 0.82);
  minute_handShape.lineTo(0, 1.08);
  minute_handShape.lineTo(0.022, 0.82);
  minute_handShape.lineTo(0.042, 0.12);
  minute_handShape.lineTo(0.035, -0.15);
  minute_handShape.closePath();

  const minute_handGeom = new THREE.ExtrudeGeometry(minute_handShape, {
    depth: 0.016,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 2
  });
  const minute_hand = new THREE.Mesh(minute_handGeom, goldMat);
  minute_hand.name = "minute_hand";
  minute_hand.position.z = 0.305;
  minute_hand.rotation.z = -Math.PI / 3;
  dial_group.add(minute_hand);

  const second_handGeom = new THREE.BoxGeometry(0.014, 1.58, 0.012);
  second_handGeom.translate(0, 0.54, 0);
  const second_hand = new THREE.Mesh(second_handGeom, goldMat);
  second_hand.name = "second_hand";
  second_hand.position.z = 0.328;
  second_hand.rotation.z = Math.PI * 0.75;
  dial_group.add(second_hand);

  const center_pin_baseGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.045, 32);
  const center_pin_base = new THREE.Mesh(center_pin_baseGeom, dark_goldMat);
  center_pin_base.name = "center_pin_base";
  center_pin_base.rotation.x = Math.PI / 2;
  center_pin_base.position.z = 0.34;
  dial_group.add(center_pin_base);

  const center_pinGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.055, 32);
  const center_pin = new THREE.Mesh(center_pinGeom, goldMat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.z = 0.365;
  dial_group.add(center_pin);

  const center_dotGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.012, 20);
  const center_dot = new THREE.Mesh(center_dotGeom, dark_goldMat);
  center_dot.name = "center_dot";
  center_dot.rotation.x = Math.PI / 2;
  center_dot.position.z = 0.399;
  dial_group.add(center_dot);

  const watch_glassGeom = new THREE.CylinderGeometry(1.305, 1.305, 0.014, 64);
  const watch_glass = new THREE.Mesh(watch_glassGeom, glassMat);
  watch_glass.name = "watch_glass";
  watch_glass.rotation.x = Math.PI / 2;
  watch_glass.position.z = 0.39;
  dial_group.add(watch_glass);

  const crown_stemGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.28, 24);
  const crown_stem = new THREE.Mesh(crown_stemGeom, goldMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(1.69, 0, 0);
  crown_group.add(crown_stem);

  const crown_collarGeom = new THREE.TorusGeometry(0.09, 0.025, 10, 28);
  const crown_collar = new THREE.Mesh(crown_collarGeom, dark_goldMat);
  crown_collar.name = "crown_collar";
  crown_collar.rotation.y = Math.PI / 2;
  crown_collar.position.set(1.72, 0, 0);
  crown_group.add(crown_collar);

  const crown_bodyGeom = new THREE.CylinderGeometry(0.215, 0.215, 0.3, 32);
  const crown_body = new THREE.Mesh(crown_bodyGeom, goldMat);
  crown_body.name = "crown_body";
  crown_body.rotation.z = Math.PI / 2;
  crown_body.position.set(1.94, 0, 0);
  crown_group.add(crown_body);

  const crown_ridgeGeom = new THREE.BoxGeometry(0.31, 0.035, 0.055);
  const crown_ridges = new THREE.InstancedMesh(crown_ridgeGeom, dark_goldMat, 18);
  crown_ridges.name = "crown_ridges";
  const crown_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    crown_dummy.position.set(
      1.94,
      Math.cos(angle) * 0.218,
      Math.sin(angle) * 0.218
    );
    crown_dummy.rotation.set(angle, 0, 0);
    crown_dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, crown_dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_ridges);

  const crown_capGeom = new THREE.CylinderGeometry(0.178, 0.178, 0.04, 32);
  const crown_cap = new THREE.Mesh(crown_capGeom, goldMat);
  crown_cap.name = "crown_cap";
  crown_cap.rotation.z = Math.PI / 2;
  crown_cap.position.set(2.105, 0, 0);
  crown_group.add(crown_cap);

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