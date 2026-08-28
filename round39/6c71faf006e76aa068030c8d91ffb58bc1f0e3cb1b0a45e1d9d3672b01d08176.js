export default function generate(THREE) {
  const root = new THREE.Group();
  const casing_group = new THREE.Group();
  const dial_group = new THREE.Group();
  const needle_group = new THREE.Group();
  const lower_register_group = new THREE.Group();
  root.add(casing_group, dial_group, needle_group, lower_register_group);

  const casingMat = new THREE.MeshStandardMaterial({
    color: 0x211216,
    metalness: 0.0,
    roughness: 0.3,
  });
  const casing_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x493039,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x160d10,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0xe5dfbd,
    metalness: 0.0,
    roughness: 0.8,
  });
  const inner_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x4b4938,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dial_markMat = new THREE.MeshStandardMaterial({
    color: 0x292b28,
    metalness: 0.0,
    roughness: 0.8,
  });
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0xc82d31,
    metalness: 0.0,
    roughness: 0.3,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xb8272d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x76502d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const dark_rustMat = new THREE.MeshStandardMaterial({
    color: 0x38291c,
    metalness: 0.0,
    roughness: 0.9,
  });
  const lower_register_rimMat = new THREE.MeshStandardMaterial({
    color: 0x292820,
    metalness: 0.4,
    roughness: 0.55,
  });
  const lower_register_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const lower_register_faceMat = new THREE.MeshStandardMaterial({
    color: 0x666653,
    metalness: 0.5,
    roughness: 0.5,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x755b35,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x75654a,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
  });

  const casing_bodyGeom = new THREE.CylinderGeometry(0.515, 0.515, 0.16, 64);
  const casing_body = new THREE.Mesh(casing_bodyGeom, casingMat);
  casing_body.rotation.x = Math.PI / 2;
  casing_body.position.z = -0.02;
  casing_group.add(casing_body);

  const casing_front_beadGeom = new THREE.TorusGeometry(0.482, 0.047, 16, 72);
  const casing_front_bead = new THREE.Mesh(casing_front_beadGeom, casingMat);
  casing_front_bead.position.z = 0.056;
  casing_group.add(casing_front_bead);

  const casing_highlightGeom = new THREE.TorusGeometry(0.489, 0.012, 10, 72);
  const casing_highlight = new THREE.Mesh(casing_highlightGeom, casing_highlightMat);
  casing_highlight.position.z = 0.091;
  casing_group.add(casing_highlight);

  const casing_rear_edgeGeom = new THREE.TorusGeometry(0.486, 0.026, 12, 64);
  const casing_rear_edge = new THREE.Mesh(casing_rear_edgeGeom, bezelMat);
  casing_rear_edge.position.z = -0.092;
  casing_group.add(casing_rear_edge);

  const dial_faceGeom = new THREE.CylinderGeometry(0.444, 0.444, 0.012, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.064;
  dial_group.add(dial_face);

  const inner_bezelGeom = new THREE.TorusGeometry(0.444, 0.009, 10, 72);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, inner_bezelMat);
  inner_bezel.position.z = 0.075;
  dial_group.add(inner_bezel);

  const face_patinaGeom = new THREE.CircleGeometry(0.035, 18);
  const face_patina = new THREE.InstancedMesh(face_patinaGeom, patinaMat, 9);
  const patinaData = [
    [-0.31, 0.18, 1.15, 0.55, 0.20],
    [0.28, 0.20, 0.72, 1.22, -0.35],
    [-0.33, -0.14, 0.82, 0.50, 0.55],
    [0.29, -0.20, 1.18, 0.72, -0.25],
    [0.05, 0.34, 0.55, 0.85, 0.15],
    [-0.19, -0.28, 0.62, 1.05, -0.50],
    [0.18, 0.04, 0.45, 0.70, 0.30],
    [-0.05, 0.12, 0.38, 0.52, -0.20],
    [0.34, -0.05, 0.42, 0.92, 0.45],
  ];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < patinaData.length; i++) {
    const p = patinaData[i];
    dummy.position.set(p[0], p[1], 0.0715);
    dummy.rotation.set(0, 0, p[4]);
    dummy.scale.set(p[2], p[3], 1);
    dummy.updateMatrix();
    face_patina.setMatrixAt(i, dummy.matrix);
  }
  face_patina.instanceMatrix.needsUpdate = true;
  dial_group.add(face_patina);

  const face_scratchesGeom = new THREE.BoxGeometry(1, 0.0013, 0.001);
  const face_scratches = new THREE.InstancedMesh(face_scratchesGeom, scratchMat, 15);
  const scratchData = [
    [-0.25, 0.25, 0.105, -0.72],
    [-0.13, 0.31, 0.075, 0.24],
    [0.13, 0.29, 0.095, -0.35],
    [0.28, 0.13, 0.072, 0.88],
    [-0.31, 0.04, 0.115, 0.17],
    [-0.27, -0.08, 0.082, -1.02],
    [-0.24, -0.20, 0.125, 0.56],
    [-0.12, -0.29, 0.075, -0.22],
    [0.01, 0.20, 0.055, 1.08],
    [0.09, 0.10, 0.082, -0.48],
    [0.23, 0.24, 0.062, 0.42],
    [0.31, -0.10, 0.105, -0.66],
    [0.24, -0.27, 0.092, 0.28],
    [-0.02, -0.18, 0.064, 0.92],
    [0.16, -0.06, 0.052, -0.15],
  ];
  for (let i = 0; i < scratchData.length; i++) {
    const s = scratchData[i];
    dummy.position.set(s[0], s[1], 0.0725);
    dummy.rotation.set(0, 0, s[3]);
    dummy.scale.set(s[2], 1, 1);
    dummy.updateMatrix();
    face_scratches.setMatrixAt(i, dummy.matrix);
  }
  face_scratches.instanceMatrix.needsUpdate = true;
  dial_group.add(face_scratches);

  const face_spotsGeom = new THREE.CircleGeometry(0.0045, 10);
  const face_spots = new THREE.InstancedMesh(face_spotsGeom, dark_rustMat, 24);
  for (let i = 0; i < 24; i++) {
    const angle = i * 2.399963229728653;
    const radius = 0.085 + ((i * 7) % 17) / 17 * 0.285;
    const spotScale = 0.45 + ((i * 5) % 9) / 9;
    dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.073
    );
    dummy.rotation.set(0, 0, angle * 0.31);
    dummy.scale.set(spotScale, spotScale * (0.7 + (i % 3) * 0.15), 1);
    dummy.updateMatrix();
    face_spots.setMatrixAt(i, dummy.matrix);
  }
  face_spots.instanceMatrix.needsUpdate = true;
  dial_group.add(face_spots);

  const rim_rust_spotsGeom = new THREE.CircleGeometry(0.0038, 9);
  const rim_rust_spots = new THREE.InstancedMesh(rim_rust_spotsGeom, rustMat, 18);
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2 + 0.13;
    const radius = 0.446 + (i % 3) * 0.002;
    const spotScale = 0.55 + ((i * 4) % 8) / 7;
    dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.084
    );
    dummy.rotation.set(0, 0, angle);
    dummy.scale.set(spotScale * 1.3, spotScale * 0.7, 1);
    dummy.updateMatrix();
    rim_rust_spots.setMatrixAt(i, dummy.matrix);
  }
  rim_rust_spots.instanceMatrix.needsUpdate = true;
  dial_group.add(rim_rust_spots);

  const tick_marksGeom = new THREE.BoxGeometry(1, 1, 0.003);
  const tick_marks = new THREE.InstancedMesh(tick_marksGeom, dial_markMat, 48);
  let tickIndex = 0;
  for (let i = 0; i < 40; i++) {
    const angle = -2.22 + i / 39 * 4.44;
    const major = i % 5 === 0;
    const length = major ? 0.066 : 0.035;
    const width = major ? 0.012 : 0.006;
    const radius = 0.407 - length / 2;
    dummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.076
    );
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(width, length, 1);
    dummy.updateMatrix();
    tick_marks.setMatrixAt(tickIndex++, dummy.matrix);
  }
  const minorIndices = [7, 11, 15, 19, 23, 27, 31, 35];
  for (let i = 0; i < minorIndices.length; i++) {
    const angle = -2.22 + minorIndices[i] / 39 * 4.44;
    dummy.position.set(
      Math.sin(angle) * 0.382,
      Math.cos(angle) * 0.382,
      0.0765
    );
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(0.005, 0.027, 1);
    dummy.updateMatrix();
    tick_marks.setMatrixAt(tickIndex++, dummy.matrix);
  }
  tick_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(tick_marks);

  const segmentMap = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "g", "c", "d"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };
  const segmentLayout = {
    a: [0, 0.044, 0.043, 0.009],
    b: [0.023, 0.022, 0.009, 0.038],
    c: [0.023, -0.022, 0.009, 0.038],
    d: [0, -0.044, 0.043, 0.009],
    e: [-0.023, -0.022, 0.009, 0.038],
    f: [-0.023, 0.022, 0.009, 0.038],
    g: [0, 0, 0.043, 0.009],
  };
  const numeralTransforms = [];

  function queueDigit(digit, x, y, scale) {
    const activeSegments = segmentMap[digit];
    for (let i = 0; i < activeSegments.length; i++) {
      const layout = segmentLayout[activeSegments[i]];
      numeralTransforms.push({
        x: x + layout[0] * scale,
        y: y + layout[1] * scale,
        sx: layout[2] * scale,
        sy: layout[3] * scale,
      });
    }
  }

  function queueLabel(text, centerX, centerY, scale) {
    const spacing = 0.061 * scale;
    const startX = centerX - (text.length - 1) * spacing / 2;
    for (let i = 0; i < text.length; i++) {
      queueDigit(text[i], startX + i * spacing, centerY, scale);
    }
  }

  queueLabel("4", 0, 0.302, 0.72);
  queueLabel("8", 0.286, 0.194, 0.82);
  queueLabel("5", 0.304, -0.056, 0.82);
  queueLabel("4", 0.218, -0.246, 0.82);
  queueLabel("0", -0.252, -0.246, 0.82);
  queueLabel("0", -0.292, 0.166, 0.82);

  const numeral_marksGeom = new THREE.BoxGeometry(1, 1, 0.003);
  const numeral_marks = new THREE.InstancedMesh(
    numeral_marksGeom,
    dial_markMat,
    numeralTransforms.length
  );
  for (let i = 0; i < numeralTransforms.length; i++) {
    const t = numeralTransforms[i];
    dummy.position.set(t.x, t.y, 0.079);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(t.sx, t.sy, 1);
    dummy.updateMatrix();
    numeral_marks.setMatrixAt(i, dummy.matrix);
  }
  numeral_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(numeral_marks);

  const glyphs = {
    M: [
      [0, 0, 0, 1],
      [0, 1, 0.5, 0.48],
      [0.5, 0.48, 1, 1],
      [1, 1, 1, 0],
    ],
    P: [
      [0, 0, 0, 1],
      [0, 1, 0.78, 1],
      [0.78, 1, 1, 0.78],
      [1, 0.78, 0.78, 0.55],
      [0.78, 0.55, 0, 0.55],
    ],
    H: [
      [0, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 0.5, 1, 0.5],
    ],
  };
  const mphSegments = [];
  const mphText = "MPH";
  const mphWidth = 0.056;
  const mphHeight = 0.083;
  const mphGap = 0.014;
  const mphTotalWidth = mphText.length * mphWidth + (mphText.length - 1) * mphGap;
  const mphStartX = -mphTotalWidth / 2;
  const mphBaseY = 0.018;

  for (let ci = 0; ci < mphText.length; ci++) {
    const glyph = glyphs[mphText[ci]];
    const glyphX = mphStartX + ci * (mphWidth + mphGap);
    for (let si = 0; si < glyph.length; si++) {
      const s = glyph[si];
      const x1 = glyphX + s[0] * mphWidth;
      const y1 = mphBaseY + s[1] * mphHeight;
      const x2 = glyphX + s[2] * mphWidth;
      const y2 = mphBaseY + s[3] * mphHeight;
      mphSegments.push([x1, y1, x2, y2]);
    }
  }

  const mph_labelGeom = new THREE.BoxGeometry(1, 1, 0.003);
  const mph_label = new THREE.InstancedMesh(mph_labelGeom, dial_markMat, mphSegments.length);
  for (let i = 0; i < mphSegments.length; i++) {
    const s = mphSegments[i];
    const dx = s[2] - s[0];
    const dy = s[3] - s[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    dummy.position.set((s[0] + s[2]) / 2, (s[1] + s[3]) / 2, 0.081);
    dummy.rotation.set(0, 0, Math.atan2(dy, dx));
    dummy.scale.set(length, 0.009, 1);
    dummy.updateMatrix();
    mph_label.setMatrixAt(i, dummy.matrix);
  }
  mph_label.instanceMatrix.needsUpdate = true;
  dial_group.add(mph_label);

  const lower_print_marksGeom = new THREE.BoxGeometry(1, 1, 0.0025);
  const lower_print_marks = new THREE.InstancedMesh(lower_print_marksGeom, dial_markMat, 18);
  for (let i = 0; i < 18; i++) {
    const row = i % 2;
    const column = Math.floor(i / 2);
    dummy.position.set(
      -0.17 + column * 0.026,
      -0.367 - row * 0.012,
      0.078
    );
    dummy.rotation.set(0, 0, (i % 3 - 1) * 0.08);
    dummy.scale.set(0.011 + (i % 4) * 0.0025, 0.0032, 1);
    dummy.updateMatrix();
    lower_print_marks.setMatrixAt(i, dummy.matrix);
  }
  lower_print_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(lower_print_marks);

  const dial_screwGeom = new THREE.CylinderGeometry(0.008, 0.008, 0.006, 16);
  const dial_screw = new THREE.Mesh(dial_screwGeom, inner_bezelMat);
  dial_screw.rotation.x = Math.PI / 2;
  dial_screw.position.set(0.278, -0.344, 0.079);
  dial_group.add(dial_screw);

  const lower_register_rimGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.015, 40);
  const lower_register_rim = new THREE.Mesh(lower_register_rimGeom, lower_register_rimMat);
  lower_register_rim.rotation.x = Math.PI / 2;
  lower_register_rim.position.set(0, -0.292, 0.081);
  lower_register_group.add(lower_register_rim);

  const lower_register_bezelGeom = new THREE.TorusGeometry(0.057, 0.008, 10, 40);
  const lower_register_bezel = new THREE.Mesh(lower_register_bezelGeom, lower_register_metalMat);
  lower_register_bezel.position.set(0, -0.292, 0.091);
  lower_register_group.add(lower_register_bezel);

  const lower_register_faceGeom = new THREE.CylinderGeometry(0.049, 0.049, 0.008, 40);
  const lower_register_face = new THREE.Mesh(lower_register_faceGeom, lower_register_faceMat);
  lower_register_face.rotation.x = Math.PI / 2;
  lower_register_face.position.set(0, -0.292, 0.092);
  lower_register_group.add(lower_register_face);

  const lower_register_centerGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.005, 20);
  const lower_register_center = new THREE.Mesh(lower_register_centerGeom, lower_register_metalMat);
  lower_register_center.rotation.x = Math.PI / 2;
  lower_register_center.position.set(0, -0.292, 0.098);
  lower_register_group.add(lower_register_center);

  const lower_register_slotGeom = new THREE.BoxGeometry(0.004, 0.066, 0.003);
  const lower_register_slot = new THREE.Mesh(lower_register_slotGeom, lower_register_rimMat);
  lower_register_slot.position.set(0, -0.292, 0.102);
  lower_register_slot.rotation.z = -0.18;
  lower_register_group.add(lower_register_slot);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.014, -0.075);
  needleShape.lineTo(0.014, -0.075);
  needleShape.lineTo(0.010, 0.075);
  needleShape.lineTo(0.005, 0.342);
  needleShape.lineTo(0, 0.374);
  needleShape.lineTo(-0.005, 0.342);
  needleShape.lineTo(-0.010, 0.075);
  needleShape.closePath();

  const needleGeom = new THREE.ExtrudeGeometry(needleShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.0015,
    bevelSize: 0.001,
    bevelSegments: 2,
  });
  const needle = new THREE.Mesh(needleGeom, needleMat);
  needle.position.z = 0.084;
  needle.rotation.z = -0.59;
  needle_group.add(needle);

  const needle_counterweightGeom = new THREE.BoxGeometry(0.023, 0.205, 0.009);
  const needle_counterweight = new THREE.Mesh(needle_counterweightGeom, needleMat);
  needle_counterweight.position.set(0, -0.077, 0.004);
  needle.add(needle_counterweight);

  const hub_outerGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.013, 36);
  const hub_outer = new THREE.Mesh(hub_outerGeom, lower_register_rimMat);
  hub_outer.rotation.x = Math.PI / 2;
  hub_outer.position.z = 0.095;
  needle_group.add(hub_outer);

  const hub_ringGeom = new THREE.TorusGeometry(0.043, 0.006, 10, 36);
  const hub_ring = new THREE.Mesh(hub_ringGeom, lower_register_metalMat);
  hub_ring.position.z = 0.102;
  needle_group.add(hub_ring);

  const hub_capGeom = new THREE.CylinderGeometry(0.039, 0.039, 0.012, 36);
  const hub_cap = new THREE.Mesh(hub_capGeom, hubMat);
  hub_cap.rotation.x = Math.PI / 2;
  hub_cap.position.z = 0.103;
  needle_group.add(hub_cap);

  const hub_pinGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.007, 20);
  const hub_pin = new THREE.Mesh(hub_pinGeom, lower_register_metalMat);
  hub_pin.rotation.x = Math.PI / 2;
  hub_pin.position.z = 0.111;
  needle_group.add(hub_pin);

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