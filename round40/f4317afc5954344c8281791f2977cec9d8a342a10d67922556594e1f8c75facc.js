export default function generate(THREE) {
  const root = new THREE.Group();

  const caseMat = new THREE.MeshStandardMaterial({
    color: 0xf2eee2,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xf7f3e7,
    metalness: 0.0,
    roughness: 0.4,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xb59655,
    metalness: 0.5,
    roughness: 0.25,
  });
  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x8d7650,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x30291d,
    metalness: 0.0,
    roughness: 0.8,
  });

  const clockCenterY = 0.12;
  const outerCaseR = 1.0;
  const dialR = 0.72;

  const standShape = new THREE.Shape();
  standShape.moveTo(-0.66, -1.12);
  standShape.lineTo(0.64, -1.12);
  standShape.quadraticCurveTo(0.72, -1.12, 0.71, -1.04);
  standShape.lineTo(0.59, -0.72);
  standShape.quadraticCurveTo(0.56, -0.64, 0.45, -0.62);
  standShape.lineTo(-0.45, -0.62);
  standShape.quadraticCurveTo(-0.56, -0.64, -0.59, -0.72);
  standShape.lineTo(-0.71, -1.04);
  standShape.quadraticCurveTo(-0.72, -1.12, -0.66, -1.12);
  standShape.closePath();

  const standGeom = new THREE.ExtrudeGeometry(standShape, {
    depth: 0.62,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 12,
  });
  const stand = new THREE.Mesh(standGeom, caseMat);
  stand.position.z = -0.47;
  root.add(stand);

  const rear_supportGeom = new THREE.CapsuleGeometry(0.15, 0.42, 6, 16);
  const rear_support = new THREE.Mesh(rear_supportGeom, caseMat);
  rear_support.rotation.z = Math.PI / 2;
  rear_support.position.set(0, -0.79, -0.31);
  root.add(rear_support);

  const adjustment_stemGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.2, 12);
  const adjustment_stem = new THREE.Mesh(adjustment_stemGeom, goldMat);
  adjustment_stem.rotation.z = Math.PI / 2;
  adjustment_stem.position.set(0.67, -0.79, -0.12);
  root.add(adjustment_stem);

  const adjustment_knobGeom = new THREE.TorusGeometry(0.045, 0.012, 8, 20);
  const adjustment_knob = new THREE.Mesh(adjustment_knobGeom, goldMat);
  adjustment_knob.rotation.y = Math.PI / 2;
  adjustment_knob.position.set(0.77, -0.79, -0.12);
  root.add(adjustment_knob);

  const outer_caseGeom = new THREE.SphereGeometry(outerCaseR, 64, 32);
  const outer_case = new THREE.Mesh(outer_caseGeom, caseMat);
  outer_case.scale.set(1, 1, 0.3);
  outer_case.position.set(0, clockCenterY, -0.06);
  root.add(outer_case);

  const front_bezelGeom = new THREE.TorusGeometry(0.845, 0.155, 24, 72);
  const front_bezel = new THREE.Mesh(front_bezelGeom, caseMat);
  front_bezel.position.set(0, clockCenterY, 0.205);
  root.add(front_bezel);

  const dialGeom = new THREE.CylinderGeometry(dialR, dialR, 0.018, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0, clockCenterY, 0.247);
  root.add(dial);

  const dial_shadow_ringGeom = new THREE.TorusGeometry(0.704, 0.012, 10, 64);
  const dial_shadow_ring = new THREE.Mesh(dial_shadow_ringGeom, markingMat);
  dial_shadow_ring.position.set(0, clockCenterY, 0.266);
  root.add(dial_shadow_ring);

  const tickGeom = new THREE.BoxGeometry(1, 1, 1);
  const minor_minute_ticks = new THREE.InstancedMesh(tickGeom, markingMat, 48);
  const major_hour_ticks = new THREE.InstancedMesh(tickGeom, markingMat, 12);
  const tickDummy = new THREE.Object3D();
  let minorIndex = 0;
  let majorIndex = 0;

  for (let i = 0; i < 60; i++) {
    const angle = i / 60 * Math.PI * 2;
    const isMajor = i % 5 === 0;
    const radius = isMajor ? 0.64 : 0.665;
    const width = isMajor ? 0.027 : 0.009;
    const length = isMajor ? 0.085 : 0.045;

    tickDummy.position.set(
      Math.sin(angle) * radius,
      clockCenterY + Math.cos(angle) * radius,
      0.271
    );
    tickDummy.rotation.set(0, 0, -angle);
    tickDummy.scale.set(width, length, 0.009);
    tickDummy.updateMatrix();

    if (isMajor) {
      major_hour_ticks.setMatrixAt(majorIndex++, tickDummy.matrix);
    } else {
      minor_minute_ticks.setMatrixAt(minorIndex++, tickDummy.matrix);
    }
  }
  minor_minute_ticks.instanceMatrix.needsUpdate = true;
  major_hour_ticks.instanceMatrix.needsUpdate = true;
  root.add(minor_minute_ticks, major_hour_ticks);

  const numeralStrokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function addStroke(parent, x1, y1, x2, y2, width) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const stroke = new THREE.Mesh(numeralStrokeGeom, markingMat);
    stroke.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    stroke.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
    stroke.scale.set(width, length, 0.009);
    parent.add(stroke);
    return stroke;
  }

  function createNumeral(text) {
    const numeral = new THREE.Group();
    const advance = 0.095;
    const totalWidth = (text.length - 1) * advance;

    for (let i = 0; i < text.length; i++) {
      const digit = text[i];
      const cx = i * advance - totalWidth / 2;
      const w = 0.057;
      const h = 0.16;
      const t = 0.013;

      if (digit === "1") {
        addStroke(numeral, cx, -h / 2, cx, h / 2, t);
        addStroke(numeral, cx - 0.022, h * 0.28, cx, h / 2, t);
        addStroke(numeral, cx - 0.023, -h / 2, cx + 0.024, -h / 2, t);
      } else if (digit === "2") {
        addStroke(numeral, cx - w / 2, h / 2 - t / 2, cx + w / 2, h / 2 - t / 2, t);
        addStroke(numeral, cx + w / 2, h / 2, cx + w / 2, 0.01, t);
        addStroke(numeral, cx - w / 2, 0, cx + w / 2, 0, t);
        addStroke(numeral, cx - w / 2, -h / 2 + t / 2, cx - w / 2, 0, t);
        addStroke(numeral, cx - w / 2, -h / 2, cx + w / 2, -h / 2, t);
      } else if (digit === "3") {
        addStroke(numeral, cx - w / 2, h / 2, cx + w / 2, h / 2, t);
        addStroke(numeral, cx - w / 2, 0, cx + w / 2, 0, t);
        addStroke(numeral, cx - w / 2, -h / 2, cx + w / 2, -h / 2, t);
        addStroke(numeral, cx + w / 2, 0, cx + w / 2, h / 2, t);
        addStroke(numeral, cx + w / 2, -h / 2, cx + w / 2, 0, t);
      } else if (digit === "6") {
        addStroke(numeral, cx - w / 2, -h / 2, cx - w / 2, h / 2, t);
        addStroke(numeral, cx - w / 2, h / 2, cx + w / 2, h / 2, t);
        addStroke(numeral, cx - w / 2, 0, cx + w / 2, 0, t);
        addStroke(numeral, cx + w / 2, -h / 2, cx + w / 2, 0, t);
        addStroke(numeral, cx - w / 2, -h / 2, cx + w / 2, -h / 2, t);
      } else if (digit === "9") {
        addStroke(numeral, cx - w / 2, 0, cx - w / 2, h / 2, t);
        addStroke(numeral, cx - w / 2, h / 2, cx + w / 2, h / 2, t);
        addStroke(numeral, cx - w / 2, 0, cx + w / 2, 0, t);
        addStroke(numeral, cx + w / 2, 0, cx + w / 2, h / 2, t);
        addStroke(numeral, cx + w / 2, -h / 2, cx + w / 2, 0, t);
        addStroke(numeral, cx - w / 2, -h / 2, cx + w / 2, -h / 2, t);
      }
    }
    return numeral;
  }

  const numeral_12 = createNumeral("12");
  numeral_12.position.set(0, clockCenterY + 0.53, 0.278);
  root.add(numeral_12);

  const numeral_3 = createNumeral("3");
  numeral_3.position.set(0.54, clockCenterY, 0.278);
  root.add(numeral_3);

  const numeral_9 = createNumeral("9");
  numeral_9.position.set(-0.54, clockCenterY, 0.278);
  root.add(numeral_9);

  function createHandGeometry(length, width, tail) {
    const handShape = new THREE.Shape();
    handShape.moveTo(-width * 0.55, -tail);
    handShape.lineTo(width * 0.55, -tail);
    handShape.lineTo(width * 0.38, length * 0.2);
    handShape.lineTo(width, length * 0.56);
    handShape.lineTo(0, length);
    handShape.lineTo(-width, length * 0.56);
    handShape.lineTo(-width * 0.38, length * 0.2);
    handShape.closePath();

    return new THREE.ExtrudeGeometry(handShape, {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 2,
    });
  }

  const hour_handGeom = createHandGeometry(0.42, 0.055, 0.07);
  const hour_hand = new THREE.Mesh(hour_handGeom, goldMat);
  hour_hand.position.set(0, clockCenterY, 0.282);
  hour_hand.rotation.z = Math.PI * 0.31;
  root.add(hour_hand);

  const minute_handGeom = createHandGeometry(0.57, 0.027, 0.075);
  const minute_hand = new THREE.Mesh(minute_handGeom, goldMat);
  minute_hand.position.set(0, clockCenterY, 0.289);
  minute_hand.rotation.z = -Math.PI * 0.27;
  root.add(minute_hand);

  const center_hub_outerGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.022, 32);
  const center_hub_outer = new THREE.Mesh(center_hub_outerGeom, goldMat);
  center_hub_outer.rotation.x = Math.PI / 2;
  center_hub_outer.position.set(0, clockCenterY, 0.302);
  root.add(center_hub_outer);

  const center_hub_ringGeom = new THREE.TorusGeometry(0.059, 0.011, 10, 32);
  const center_hub_ring = new THREE.Mesh(center_hub_ringGeom, goldMat);
  center_hub_ring.position.set(0, clockCenterY, 0.316);
  root.add(center_hub_ring);

  const center_hub_innerGeom = new THREE.CylinderGeometry(0.041, 0.041, 0.026, 24);
  const center_hub_inner = new THREE.Mesh(center_hub_innerGeom, goldMat);
  center_hub_inner.rotation.x = Math.PI / 2;
  center_hub_inner.position.set(0, clockCenterY, 0.319);
  root.add(center_hub_inner);

  const center_pinGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.03, 16);
  const center_pin = new THREE.Mesh(center_pinGeom, darkMat);
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.set(0, clockCenterY, 0.332);
  root.add(center_pin);

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