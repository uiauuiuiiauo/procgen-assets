export default function generate(THREE) {
  const root = new THREE.Group();
  const envelope_group = new THREE.Group();
  root.add(envelope_group);

  const envelopeW = 1.62;
  const envelopeH = 0.92;
  const envelopeD = 0.04;

  const envelope_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf7f7f4,
    metalness: 0.0,
    roughness: 0.9,
  });
  const front_flapMat = new THREE.MeshStandardMaterial({
    color: 0xfdfdfb,
    metalness: 0.0,
    roughness: 0.9,
  });
  const fold_shadowMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d4,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stamp_paperMat = new THREE.MeshStandardMaterial({
    color: 0xeeeade,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stamp_fieldMat = new THREE.MeshStandardMaterial({
    color: 0x9f98aa,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stamp_inkMat = new THREE.MeshStandardMaterial({
    color: 0x292731,
    metalness: 0.0,
    roughness: 0.8,
  });
  const stamp_light_inkMat = new THREE.MeshStandardMaterial({
    color: 0xd4d0c8,
    metalness: 0.0,
    roughness: 0.9,
  });
  const postmark_inkMat = new THREE.MeshStandardMaterial({
    color: 0x25242a,
    metalness: 0.0,
    roughness: 0.8,
  });

  const envelope_bodyShape = new THREE.Shape();
  envelope_bodyShape.moveTo(-envelopeW / 2, -envelopeH / 2);
  envelope_bodyShape.lineTo(envelopeW / 2, -envelopeH / 2);
  envelope_bodyShape.lineTo(envelopeW / 2, envelopeH / 2);
  envelope_bodyShape.lineTo(-envelopeW / 2, envelopeH / 2);
  envelope_bodyShape.closePath();

  const envelope_bodyGeom = new THREE.ExtrudeGeometry(envelope_bodyShape, {
    depth: envelopeD,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  envelope_bodyGeom.translate(0, 0, -envelopeD / 2);
  const envelope_body = new THREE.Mesh(envelope_bodyGeom, envelope_bodyMat);
  envelope_group.add(envelope_body);

  const front_flapShape = new THREE.Shape();
  front_flapShape.moveTo(-envelopeW / 2 + 0.009, -envelopeH / 2 + 0.009);
  front_flapShape.lineTo(envelopeW / 2 - 0.009, -envelopeH / 2 + 0.009);
  front_flapShape.lineTo(envelopeW / 2 - 0.009, envelopeH / 2 - 0.009);
  front_flapShape.lineTo(-envelopeW / 2 + 0.009, envelopeH / 2 - 0.009);
  front_flapShape.closePath();

  const front_flapGeom = new THREE.ShapeGeometry(front_flapShape);
  const front_flap = new THREE.Mesh(front_flapGeom, front_flapMat);
  front_flap.position.z = 0.025;
  envelope_group.add(front_flap);

  const top_fold_shadowGeom = new THREE.BoxGeometry(
    envelopeW - 0.045,
    0.008,
    0.001
  );
  const top_fold_shadow = new THREE.Mesh(
    top_fold_shadowGeom,
    fold_shadowMat
  );
  top_fold_shadow.position.set(0, envelopeH / 2 - 0.018, 0.026);
  envelope_group.add(top_fold_shadow);

  const bottom_fold_edgeGeom = new THREE.BoxGeometry(
    envelopeW - 0.045,
    0.006,
    0.001
  );
  const bottom_fold_edge = new THREE.Mesh(
    bottom_fold_edgeGeom,
    fold_shadowMat
  );
  bottom_fold_edge.position.set(0, -envelopeH / 2 + 0.012, 0.026);
  envelope_group.add(bottom_fold_edge);

  const stamp_group = new THREE.Group();
  stamp_group.position.set(0.48, 0.19, 0.028);
  stamp_group.rotation.z = -0.065;
  envelope_group.add(stamp_group);

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
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
    return shape;
  }

  function makeSerratedStampShape(width, height, teethX, teethY) {
    const shape = new THREE.Shape();
    const halfW = width / 2;
    const halfH = height / 2;
    const tooth = 0.006;

    shape.moveTo(-halfW, -halfH);

    for (let i = 0; i < teethX; i++) {
      const step = width / teethX;
      shape.lineTo(-halfW + (i + 0.5) * step, -halfH + tooth);
      shape.lineTo(-halfW + (i + 1) * step, -halfH);
    }
    for (let i = 0; i < teethY; i++) {
      const step = height / teethY;
      shape.lineTo(halfW - tooth, -halfH + (i + 0.5) * step);
      shape.lineTo(halfW, -halfH + (i + 1) * step);
    }
    for (let i = 0; i < teethX; i++) {
      const step = width / teethX;
      shape.lineTo(halfW - (i + 0.5) * step, halfH - tooth);
      shape.lineTo(halfW - (i + 1) * step, halfH);
    }
    for (let i = 0; i < teethY; i++) {
      const step = height / teethY;
      shape.lineTo(-halfW + tooth, halfH - (i + 0.5) * step);
      shape.lineTo(-halfW, halfH - (i + 1) * step);
    }
    shape.closePath();
    return shape;
  }

  const stamp_paperShape = makeSerratedStampShape(0.42, 0.5, 10, 12);
  const stamp_paperGeom = new THREE.ShapeGeometry(stamp_paperShape);
  const stamp_paper = new THREE.Mesh(stamp_paperGeom, stamp_paperMat);
  stamp_group.add(stamp_paper);

  const stamp_fieldShape = makeRoundedRectShape(0.36, 0.44, 0.009);
  const stamp_fieldGeom = new THREE.ShapeGeometry(stamp_fieldShape);
  const stamp_field = new THREE.Mesh(stamp_fieldGeom, stamp_fieldMat);
  stamp_field.position.z = 0.001;
  stamp_group.add(stamp_field);

  const stamp_inner_fieldGeom = new THREE.BoxGeometry(0.326, 0.406, 0.001);
  const stamp_inner_field = new THREE.Mesh(
    stamp_inner_fieldGeom,
    stamp_light_inkMat
  );
  stamp_inner_field.position.z = 0.0018;
  stamp_group.add(stamp_inner_field);

  const stamp_decalMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.9,
    vertexColors: true,
  });

  const stamp_decal_positions = [];
  const stamp_decal_colors = [];
  const stamp_decal_indices = [];

  function addDecalQuad(x0, y0, x1, y1, angle, colorHex) {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const base = stamp_decal_positions.length / 3;
    const color = new THREE.Color(colorHex);
    const corners = [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ];

    for (const corner of corners) {
      const px = corner[0];
      const py = corner[1];
      stamp_decal_positions.push(
        px * cosine - py * sine,
        px * sine + py * cosine,
        0
      );
      stamp_decal_colors.push(color.r, color.g, color.b);
    }

    stamp_decal_indices.push(
      base,
      base + 1,
      base + 2,
      base,
      base + 2,
      base + 3
    );
  }

  const decal_black = 0x292731;
  const decal_light = 0xd4d0c8;
  const decal_mid = 0x9f98aa;

  addDecalQuad(-0.166, -0.206, 0.166, -0.195, 0, decal_black);
  addDecalQuad(-0.157, -0.187, 0.157, -0.187, 0, decal_light);
  addDecalQuad(-0.148, -0.178, 0.148, -0.178, 0, decal_black);

  for (let i = 0; i < 13; i++) {
    const x = -0.126 + i * 0.021;
    const width = 0.008 + ((i * 3) % 4) * 0.002;
    addDecalQuad(
      x - width / 2,
      -0.192,
      x + width / 2,
      -0.188,
      0,
      i % 4 === 0 ? decal_light : decal_black
    );
  }

  for (let i = 0; i < 12; i++) {
    const angle = Math.PI * (35 + i * 8.5) / 180;
    const x = Math.cos(angle) * 0.151;
    const y = Math.sin(angle) * 0.181;
    addDecalQuad(
      x - 0.005,
      y - 0.003,
      x + 0.005,
      y + 0.003,
      angle,
      decal_black
    );
  }

  for (let i = 0; i < 11; i++) {
    const angle = Math.PI * (38 + i * 9) / 180;
    const outerX = Math.cos(angle) * 0.136;
    const outerY = Math.sin(angle) * 0.164;
    const innerX = Math.cos(angle) * 0.119;
    const innerY = Math.sin(angle) * 0.145;
    addDecalQuad(
      outerX - 0.004,
      outerY - 0.0025,
      innerX + 0.004,
      innerY + 0.0025,
      angle,
      i % 3 === 0 ? decal_light : decal_black
    );
  }

  for (let i = 0; i < 11; i++) {
    const x = -0.105 + i * 0.021;
    const width = 0.008 + ((i * 5) % 3) * 0.002;
    addDecalQuad(
      x - width / 2,
      0.145,
      x + width / 2,
      0.16,
      0,
      i % 5 === 1 ? decal_light : decal_black
    );
  }

  addDecalQuad(-0.112, 0.105, -0.096, 0.139, -0.22, decal_black);
  addDecalQuad(-0.104, 0.111, -0.089, 0.14, -0.22, decal_light);

  addDecalQuad(-0.082, 0.13, -0.022, 0.134, 0, decal_black);
  addDecalQuad(-0.075, 0.136, -0.027, 0.141, 0, decal_light);

  addDecalQuad(-0.072, 0.145, -0.018, 0.153, 0, decal_black);
  addDecalQuad(-0.054, 0.149, -0.012, 0.157, 0, decal_mid);

  addDecalQuad(-0.063, 0.151, -0.05, 0.181, -0.08, decal_black);
  addDecalQuad(-0.058, 0.154, -0.047, 0.178, -0.08, decal_light);

  addDecalQuad(-0.052, 0.174, -0.014, 0.188, 0, decal_black);
  addDecalQuad(-0.046, 0.178, -0.018, 0.187, 0, decal_light);

  addDecalQuad(-0.041, 0.179, -0.018, 0.183, 0, decal_black);
  addDecalQuad(-0.031, 0.163, -0.022, 0.17, -0.15, decal_black);
  addDecalQuad(-0.025, 0.168, -0.015, 0.174, -0.15, decal_light);

  addDecalQuad(-0.048, 0.15, -0.012, 0.155, 0, decal_black);
  addDecalQuad(-0.043, 0.154, -0.017, 0.159, 0, decal_light);

  addDecalQuad(-0.034, 0.148, -0.004, 0.205, -0.25, decal_black);
  addDecalQuad(-0.027, 0.151, 0.001, 0.199, -0.25, decal_light);

  addDecalQuad(-0.022, 0.139, 0.015, 0.146, 0, decal_black);
  addDecalQuad(-0.015, 0.143, 0.011, 0.149, 0, decal_light);

  addDecalQuad(-0.01, 0.128, 0.025, 0.143, -0.35, decal_black);
  addDecalQuad(-0.004, 0.131, 0.019, 0.143, -0.35, decal_light);

  addDecalQuad(-0.012, 0.105, 0.028, 0.132, -0.28, decal_black);
  addDecalQuad(-0.006, 0.108, 0.022, 0.13, -0.28, decal_light);

  addDecalQuad(-0.002, 0.081, 0.038, 0.109, -0.28, decal_black);
  addDecalQuad(0.004, 0.084, 0.032, 0.105, -0.28, decal_mid);

  addDecalQuad(-0.014, 0.058, 0.026, 0.082, -0.18, decal_black);
  addDecalQuad(-0.008, 0.062, 0.02, 0.079, -0.18, decal_light);

  addDecalQuad(-0.018, 0.035, 0.036, 0.061, -0.1, decal_black);
  addDecalQuad(-0.012, 0.04, 0.03, 0.058, -0.1, decal_mid);

  addDecalQuad(-0.024, -0.008, -0.004, 0.044, 0, decal_black);
  addDecalQuad(-0.018, -0.004, 0.002, 0.041, 0, decal_light);

  addDecalQuad(0.028, -0.01, 0.05, 0.044, 0, decal_black);
  addDecalQuad(0.034, -0.005, 0.045, 0.04, 0, decal_mid);

  addDecalQuad(-0.012, 0.018, 0.041, 0.024, 0, decal_black);
  addDecalQuad(-0.006, 0.022, 0.036, 0.026, 0, decal_light);

  addDecalQuad(-0.008, -0.006, 0.048, 0.012, 0.27, decal_black);
  addDecalQuad(-0.002, -0.002, 0.042, 0.01, 0.27, decal_light);

  addDecalQuad(-0.014, -0.028, 0.054, -0.006, 0.28, decal_black);
  addDecalQuad(-0.008, -0.024, 0.048, -0.002, 0.28, decal_mid);

  addDecalQuad(-0.02, -0.05, 0.058, -0.026, 0.25, decal_black);
  addDecalQuad(-0.014, -0.046, 0.052, -0.022, 0.25, decal_light);

  addDecalQuad(-0.025, -0.07, 0.059, -0.045, 0.22, decal_black);
  addDecalQuad(-0.019, -0.066, 0.053, -0.041, 0.22, decal_mid);

  addDecalQuad(-0.028, -0.088, 0.058, -0.064, 0.2, decal_black);
  addDecalQuad(-0.022, -0.084, 0.052, -0.06, 0.2, decal_light);

  addDecalQuad(-0.027, -0.103, 0.055, -0.081, 0.18, decal_black);
  addDecalQuad(-0.02, -0.099, 0.048, -0.078, 0.18, decal_mid);

  addDecalQuad(-0.035, -0.116, 0.045, -0.099, 0.14, decal_black);
  addDecalQuad(-0.029, -0.113, 0.039, -0.097, 0.14, decal_light);

  for (let i = 0; i < 8; i++) {
    addDecalQuad(
      -0.04 + i * 0.014,
      -0.132,
      -0.034 + i * 0.014,
      -0.099,
      0.12,
      i % 3 === 1 ? decal_light : decal_black
    );
  }

  addDecalQuad(-0.055, -0.13, 0.064, -0.116, 0, decal_black);
  addDecalQuad(-0.048, -0.126, 0.057, -0.115, 0, decal_light);

  addDecalQuad(-0.075, -0.112, -0.058, -0.141, -0.55, decal_black);
  addDecalQuad(-0.069, -0.111, -0.055, -0.137, -0.55, decal_light);
  addDecalQuad(0.052, -0.114, 0.075, -0.143, 0.55, decal_black);
  addDecalQuad(0.056, -0.113, 0.069, -0.138, 0.55, decal_light);

  addDecalQuad(-0.11, -0.151, -0.074, -0.143, 0, decal_black);
  addDecalQuad(-0.104, -0.148, -0.077, -0.142, 0, decal_light);
  addDecalQuad(0.072, -0.145, 0.108, -0.153, 0, decal_black);
  addDecalQuad(0.077, -0.143, 0.103, -0.149, 0, decal_light);

  addDecalQuad(-0.112, -0.207, 0.112, -0.207, 0, decal_black);
  addDecalQuad(-0.105, -0.203, 0.105, -0.203, 0, decal_light);

  const stamp_decalGeom = new THREE.BufferGeometry();
  stamp_decalGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(stamp_decal_positions, 3)
  );
  stamp_decalGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(stamp_decal_colors, 3)
  );
  stamp_decalGeom.setIndex(stamp_decal_indices);

  const stamp_decal = new THREE.Mesh(stamp_decalGeom, stamp_decalMat);
  stamp_decal.position.z = 0.003;
  stamp_group.add(stamp_decal);

  const stamp_seal_outerGeom = new THREE.RingGeometry(0.158, 0.164, 64);
  const stamp_seal_outer = new THREE.Mesh(
    stamp_seal_outerGeom,
    stamp_inkMat
  );
  stamp_seal_outer.scale.set(1, 1.18, 1);
  stamp_seal_outer.position.z = 0.0038;
  stamp_group.add(stamp_seal_outer);

  const stamp_seal_innerGeom = new THREE.RingGeometry(0.143, 0.147, 64);
  const stamp_seal_inner = new THREE.Mesh(
    stamp_seal_innerGeom,
    stamp_inkMat
  );
  stamp_seal_inner.scale.set(1, 1.18, 1);
  stamp_seal_inner.position.z = 0.0039;
  stamp_group.add(stamp_seal_inner);

  const stamp_text_marksGeom = new THREE.BoxGeometry(0.011, 0.022, 0.001);
  const stamp_text_marks = new THREE.InstancedMesh(
    stamp_text_marksGeom,
    stamp_inkMat,
    26
  );
  const stamp_text_dummy = new THREE.Object3D();

  for (let i = 0; i < 14; i++) {
    const angle = Math.PI * (36 + i * (144 / 13)) / 180;
    stamp_text_dummy.position.set(
      Math.cos(angle) * 0.132,
      Math.sin(angle) * 0.158,
      0.004
    );
    stamp_text_dummy.rotation.set(0, 0, angle);
    stamp_text_dummy.scale.set(
      0.75 + ((i * 3) % 4) * 0.1,
      i % 4 === 0 ? 1.25 : 1,
      1
    );
    stamp_text_dummy.updateMatrix();
    stamp_text_marks.setMatrixAt(i, stamp_text_dummy.matrix);
  }

  for (let i = 0; i < 12; i++) {
    const index = 14 + i;
    const x = -0.105 + i * (0.21 / 11);
    stamp_text_dummy.position.set(x, 0.151, 0.004);
    stamp_text_dummy.rotation.set(0, 0, 0);
    stamp_text_dummy.scale.set(
      0.7 + ((i * 5) % 4) * 0.1,
      i % 3 === 0 ? 1.2 : 0.85,
      1
    );
    stamp_text_dummy.updateMatrix();
    stamp_text_marks.setMatrixAt(index, stamp_text_dummy.matrix);
  }
  stamp_text_marks.instanceMatrix.needsUpdate = true;
  stamp_group.add(stamp_text_marks);

  const stamp_specklesGeom = new THREE.CircleGeometry(0.0024, 8);
  const stamp_speckles = new THREE.InstancedMesh(
    stamp_specklesGeom,
    stamp_inkMat,
    24
  );
  const stamp_speckle_dummy = new THREE.Object3D();

  for (let i = 0; i < 24; i++) {
    const x = -0.137 + (((i * 37) % 97) / 96) * 0.274;
    const y = -0.172 + (((i * 53) % 89) / 88) * 0.344;
    const scale = 0.65 + ((i * 7) % 5) * 0.12;
    stamp_speckle_dummy.position.set(x, y, 0.0042);
    stamp_speckle_dummy.rotation.set(0, 0, 0);
    stamp_speckle_dummy.scale.setScalar(scale);
    stamp_speckle_dummy.updateMatrix();
    stamp_speckles.setMatrixAt(i, stamp_speckle_dummy.matrix);
  }
  stamp_speckles.instanceMatrix.needsUpdate = true;
  stamp_group.add(stamp_speckles);

  const postmark_cancellation_bars = new THREE.Group();
  stamp_group.add(postmark_cancellation_bars);

  for (let i = 0; i < 5; i++) {
    const y = 0.116 - i * 0.058;
    const bend = i % 2 === 0 ? 0.012 : -0.012;
    const cancellation_barPath = new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0.075, y + 0.01, 0.005),
        new THREE.Vector3(0.135, y + bend, 0.005),
        new THREE.Vector3(0.205, y - bend, 0.005),
        new THREE.Vector3(0.28, y + 0.006, 0.005),
        new THREE.Vector3(0.36, y + 0.018, 0.005),
      ],
      false,
      "centripetal"
    );
    const cancellation_barGeom = new THREE.TubeGeometry(
      cancellation_barPath,
      24,
      0.003,
      6,
      false
    );
    const cancellation_bar = new THREE.Mesh(
      cancellation_barGeom,
      postmark_inkMat
    );
    postmark_cancellation_bars.add(cancellation_bar);
  }

  const postmark_arcPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.074, -0.139, 0.005),
      new THREE.Vector3(0.103, -0.119, 0.005),
      new THREE.Vector3(0.126, -0.083, 0.005),
      new THREE.Vector3(0.132, -0.035, 0.005),
      new THREE.Vector3(0.12, 0.012, 0.005),
      new THREE.Vector3(0.096, 0.047, 0.005),
    ],
    false,
    "centripetal"
  );
  const postmark_arcGeom = new THREE.TubeGeometry(
    postmark_arcPath,
    24,
    0.0028,
    6,
    false
  );
  const postmark_arc = new THREE.Mesh(postmark_arcGeom, postmark_inkMat);
  postmark_cancellation_bars.add(postmark_arc);

  const postmark_inner_arcPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.087, -0.132, 0.005),
      new THREE.Vector3(0.111, -0.106, 0.005),
      new THREE.Vector3(0.129, -0.071, 0.005),
      new THREE.Vector3(0.133, -0.029, 0.005),
      new THREE.Vector3(0.121, 0.008, 0.005),
    ],
    false,
    "centripetal"
  );
  const postmark_inner_arcGeom = new THREE.TubeGeometry(
    postmark_inner_arcPath,
    20,
    0.0021,
    6,
    false
  );
  const postmark_inner_arc = new THREE.Mesh(
    postmark_inner_arcGeom,
    postmark_inkMat
  );
  postmark_cancellation_bars.add(postmark_inner_arc);

  const postmark_centerGeom = new THREE.CircleGeometry(0.014, 16);
  const postmark_center = new THREE.Mesh(
    postmark_centerGeom,
    postmark_inkMat
  );
  postmark_center.position.set(0.119, -0.026, 0.0052);
  postmark_cancellation_bars.add(postmark_center);

  fitToUnitCube(THREE, root);
  return root;

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
}