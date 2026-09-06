export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ancient_coin";

  const coin_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x3b302c,
    metalness: 0.35,
    roughness: 0.82,
  });
  const coin_faceMat = new THREE.MeshStandardMaterial({
    color: 0x625b50,
    metalness: 0.32,
    roughness: 0.76,
  });
  const coin_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x292724,
    metalness: 0.42,
    roughness: 0.74,
  });
  const raised_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x514b44,
    metalness: 0.42,
    roughness: 0.68,
  });
  const portrait_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x484742,
    metalness: 0.38,
    roughness: 0.72,
  });
  const patina_greenMat = new THREE.MeshStandardMaterial({
    color: 0x41624f,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.58,
    depthWrite: false,
  });
  const patina_verdigrisMat = new THREE.MeshStandardMaterial({
    color: 0x6e927c,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  const patina_redMat = new THREE.MeshStandardMaterial({
    color: 0x754b43,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.52,
    depthWrite: false,
  });
  const patina_ochreMat = new THREE.MeshStandardMaterial({
    color: 0x9a7650,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
  });
  const pitMat = new THREE.MeshStandardMaterial({
    color: 0x242520,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.65,
    depthWrite: false,
  });
  const fleckMat = new THREE.MeshStandardMaterial({
    color: 0x91a58d,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
  });

  const coin_bodyGeom = new THREE.CylinderGeometry(0.98, 0.98, 0.12, 96);
  const coin_body = new THREE.Mesh(coin_bodyGeom, coin_bodyMat);
  coin_body.name = "coin_body";
  coin_body.rotation.x = Math.PI / 2;
  root.add(coin_body);

  const coin_faceGeom = new THREE.CylinderGeometry(0.952, 0.952, 0.022, 96);
  const coin_face = new THREE.Mesh(coin_faceGeom, coin_faceMat);
  coin_face.name = "coin_face";
  coin_face.rotation.x = Math.PI / 2;
  coin_face.position.z = 0.056;
  root.add(coin_face);

  const coin_edge_bandGeom = new THREE.TorusGeometry(0.958, 0.018, 10, 96);
  const coin_edge_band = new THREE.Mesh(coin_edge_bandGeom, coin_edgeMat);
  coin_edge_band.name = "coin_edge_band";
  coin_edge_band.position.z = 0.025;
  root.add(coin_edge_band);

  const outer_rimGeom = new THREE.TorusGeometry(0.936, 0.027, 12, 96);
  const outer_rim = new THREE.Mesh(outer_rimGeom, coin_edgeMat);
  outer_rim.name = "outer_rim";
  outer_rim.position.z = 0.077;
  root.add(outer_rim);

  const inner_borderGeom = new THREE.TorusGeometry(0.805, 0.009, 8, 96);
  const inner_border = new THREE.Mesh(inner_borderGeom, raised_bronzeMat);
  inner_border.name = "inner_border";
  inner_border.position.z = 0.073;
  root.add(inner_border);

  const patina_patchShape = new THREE.Shape();
  patina_patchShape.moveTo(1.0, 0.0);
  patina_patchShape.lineTo(0.61, 0.63);
  patina_patchShape.lineTo(0.04, 0.82);
  patina_patchShape.lineTo(-0.67, 0.56);
  patina_patchShape.lineTo(-0.91, -0.08);
  patina_patchShape.lineTo(-0.48, -0.73);
  patina_patchShape.lineTo(0.18, -0.88);
  patina_patchShape.lineTo(0.82, -0.48);
  patina_patchShape.closePath();
  const patina_patchGeom = new THREE.ShapeGeometry(patina_patchShape);

  function makePatchInstances(count, material, baseRadius, z, seed) {
    const mesh = new THREE.InstancedMesh(patina_patchGeom, material, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = i * 2.3999632297 + seed * 0.41;
      const radialStep = ((i * 37 + seed * 17) % count) / Math.max(1, count - 1);
      const radius = baseRadius + radialStep * 0.74;
      const sx = 0.045 + ((i * 13 + seed * 7) % 11) * 0.009;
      const sy = 0.032 + ((i * 19 + seed * 5) % 9) * 0.008;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      );
      dummy.rotation.set(0, 0, angle * 0.37 + i * 0.19);
      dummy.scale.set(sx, sy, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    return mesh;
  }

  const patina_green = makePatchInstances(20, patina_greenMat, 0.08, 0.069, 2);
  patina_green.name = "patina_green";
  root.add(patina_green);

  const patina_red = makePatchInstances(18, patina_redMat, 0.12, 0.0693, 5);
  patina_red.name = "patina_red";
  root.add(patina_red);

  const patina_ochre = makePatchInstances(16, patina_ochreMat, 0.16, 0.0696, 8);
  patina_ochre.name = "patina_ochre";
  root.add(patina_ochre);

  const surface_pitsGeom = new THREE.CircleGeometry(1, 8);
  const surface_pits = new THREE.InstancedMesh(surface_pitsGeom, pitMat, 52);
  surface_pits.name = "surface_pits";
  {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 52; i++) {
      const angle = i * 2.3999632297 + 0.73;
      const radius = 0.12 + (((i * 43 + 9) % 51) / 51) * 0.74;
      const size = 0.005 + ((i * 11 + 3) % 8) * 0.0015;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.0702
      );
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(size * 1.35, size, 1);
      dummy.updateMatrix();
      surface_pits.setMatrixAt(i, dummy.matrix);
    }
    surface_pits.instanceMatrix.needsUpdate = true;
    surface_pits.frustumCulled = false;
  }
  root.add(surface_pits);

  const surface_flecksGeom = new THREE.CircleGeometry(1, 7);
  const surface_flecks = new THREE.InstancedMesh(surface_flecksGeom, fleckMat, 24);
  surface_flecks.name = "surface_flecks";
  {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 24; i++) {
      const angle = i * 2.3999632297 + 1.31;
      const radius = 0.18 + (((i * 29 + 5) % 23) / 23) * 0.66;
      const size = 0.004 + ((i * 7 + 2) % 6) * 0.0014;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.0705
      );
      dummy.rotation.set(0, 0, -angle * 0.5);
      dummy.scale.set(size, size * 0.72, 1);
      dummy.updateMatrix();
      surface_flecks.setMatrixAt(i, dummy.matrix);
    }
    surface_flecks.instanceMatrix.needsUpdate = true;
    surface_flecks.frustumCulled = false;
  }
  root.add(surface_flecks);

  const rim_beadsGeom = new THREE.SphereGeometry(1, 10, 6);
  const rim_beads = new THREE.InstancedMesh(rim_beadsGeom, raised_bronzeMat, 88);
  rim_beads.name = "rim_beads";
  {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 88; i++) {
      const angle = i / 88 * Math.PI * 2;
      const variation = ((i * 7) % 9) / 9;
      const radius = 0.871 + ((i * 13) % 5) * 0.0015;
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.081
      );
      dummy.rotation.set(0, 0, angle - Math.PI / 2);
      dummy.scale.set(
        0.017 + variation * 0.005,
        0.024 + variation * 0.007,
        0.012
      );
      dummy.updateMatrix();
      rim_beads.setMatrixAt(i, dummy.matrix);
    }
    rim_beads.instanceMatrix.needsUpdate = true;
    rim_beads.frustumCulled = false;
  }
  root.add(rim_beads);

  const glyphMap = {
    A: [
      [-0.45, -0.5, 0.0, 0.5],
      [0.0, 0.5, 0.45, -0.5],
      [-0.27, -0.05, 0.27, -0.05],
    ],
    C: [
      [0.4, 0.42, -0.12, 0.5],
      [-0.12, 0.5, -0.42, 0.22],
      [-0.42, 0.22, -0.42, -0.22],
      [-0.42, -0.22, -0.12, -0.5],
      [-0.12, -0.5, 0.4, -0.42],
    ],
    D: [
      [-0.4, -0.5, -0.4, 0.5],
      [-0.4, 0.5, 0.1, 0.46],
      [0.1, 0.46, 0.4, 0.2],
      [0.4, 0.2, 0.4, -0.2],
      [0.4, -0.2, 0.1, -0.46],
      [0.1, -0.46, -0.4, -0.5],
    ],
    E: [
      [-0.4, -0.5, -0.4, 0.5],
      [-0.4, 0.5, 0.42, 0.5],
      [-0.4, 0.0, 0.28, 0.0],
      [-0.4, -0.5, 0.42, -0.5],
    ],
    G: [
      [0.4, 0.4, -0.12, 0.5],
      [-0.12, 0.5, -0.42, 0.2],
      [-0.42, 0.2, -0.42, -0.22],
      [-0.42, -0.22, -0.1, -0.5],
      [-0.1, -0.5, 0.4, -0.38],
      [0.4, -0.38, 0.4, -0.02],
      [0.4, -0.02, 0.05, -0.02],
    ],
    I: [
      [-0.4, 0.5, 0.4, 0.5],
      [0.0, 0.5, 0.0, -0.5],
      [-0.4, -0.5, 0.4, -0.5],
    ],
    M: [
      [-0.43, -0.5, -0.43, 0.5],
      [-0.43, 0.5, 0.0, -0.05],
      [0.0, -0.05, 0.43, 0.5],
      [0.43, 0.5, 0.43, -0.5],
    ],
    N: [
      [-0.42, -0.5, -0.42, 0.5],
      [-0.42, 0.5, 0.42, -0.5],
      [0.42, -0.5, 0.42, 0.5],
    ],
    P: [
      [-0.4, -0.5, -0.4, 0.5],
      [-0.4, 0.5, 0.22, 0.5],
      [0.22, 0.5, 0.42, 0.28],
      [0.42, 0.28, 0.22, 0.02],
      [0.22, 0.02, -0.4, 0.02],
    ],
    R: [
      [-0.4, -0.5, -0.4, 0.5],
      [-0.4, 0.5, 0.22, 0.5],
      [0.22, 0.5, 0.42, 0.28],
      [0.42, 0.28, 0.22, 0.02],
      [0.22, 0.02, -0.4, 0.02],
      [0.05, 0.02, 0.45, -0.5],
    ],
    T: [
      [-0.46, 0.5, 0.46, 0.5],
      [0.0, 0.5, 0.0, -0.5],
    ],
    V: [
      [-0.44, 0.5, 0.0, -0.5],
      [0.0, -0.5, 0.44, 0.5],
    ],
  };

  const inscriptionText = "IMP CAES NERVA TRAIAN";
  const letterStrokes = [];
  const letterRadius = 0.705;
  const glyphWidth = 0.12;
  const glyphHeight = 0.19;

  for (let i = 0; i < inscriptionText.length; i++) {
    const character = inscriptionText[i];
    const strokes = glyphMap[character];
    if (!strokes) continue;

    const angle = (93 - i * (176 / (inscriptionText.length - 1))) * Math.PI / 180;
    const rotation = angle - Math.PI / 2;
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    const centerX = Math.cos(angle) * letterRadius;
    const centerY = Math.sin(angle) * letterRadius;

    for (const stroke of strokes) {
      const x1 = stroke[0] * glyphWidth;
      const y1 = stroke[1] * glyphHeight;
      const x2 = stroke[2] * glyphWidth;
      const y2 = stroke[3] * glyphHeight;
      const localX = (x1 + x2) * 0.5;
      const localY = (y1 + y2) * 0.5;
      const dx = x2 - x1;
      const dy = y2 - y1;
      letterStrokes.push({
        x: centerX + localX * cosRotation - localY * sinRotation,
        y: centerY + localX * sinRotation + localY * cosRotation,
        length: Math.sqrt(dx * dx + dy * dy),
        rotation: rotation + Math.atan2(dy, dx),
      });
    }
  }

  const inscriptionGeom = new THREE.BoxGeometry(1, 1, 1);
  const inscription_shadow = new THREE.InstancedMesh(
    inscriptionGeom,
    coin_edgeMat,
    letterStrokes.length
  );
  inscription_shadow.name = "inscription_shadow";

  const inscription = new THREE.InstancedMesh(
    inscriptionGeom,
    raised_bronzeMat,
    letterStrokes.length
  );
  inscription.name = "inscription";

  {
    const shadowDummy = new THREE.Object3D();
    const letterDummy = new THREE.Object3D();
    for (let i = 0; i < letterStrokes.length; i++) {
      const stroke = letterStrokes[i];

      shadowDummy.position.set(stroke.x, stroke.y, 0.077);
      shadowDummy.rotation.set(0, 0, stroke.rotation);
      shadowDummy.scale.set(stroke.length + 0.018, 0.045, 0.022);
      shadowDummy.updateMatrix();
      inscription_shadow.setMatrixAt(i, shadowDummy.matrix);

      letterDummy.position.set(stroke.x, stroke.y, 0.089);
      letterDummy.rotation.set(0, 0, stroke.rotation);
      letterDummy.scale.set(stroke.length, 0.031, 0.026);
      letterDummy.updateMatrix();
      inscription.setMatrixAt(i, letterDummy.matrix);
    }
    inscription_shadow.instanceMatrix.needsUpdate = true;
    inscription.instanceMatrix.needsUpdate = true;
    inscription_shadow.frustumCulled = false;
    inscription.frustumCulled = false;
  }
  root.add(inscription_shadow);
  root.add(inscription);

  const portrait_relief = new THREE.Group();
  portrait_relief.name = "portrait_relief";
  portrait_relief.scale.set(0.9, 0.9, 1);
  root.add(portrait_relief);

  const portrait_bustShape = new THREE.Shape();
  portrait_bustShape.moveTo(-0.5, -0.57);
  portrait_bustShape.lineTo(-0.43, -0.49);
  portrait_bustShape.bezierCurveTo(-0.34, -0.43, -0.25, -0.39, -0.18, -0.34);
  portrait_bustShape.lineTo(-0.16, -0.18);
  portrait_bustShape.bezierCurveTo(-0.23, -0.08, -0.26, 0.06, -0.25, 0.2);
  portrait_bustShape.bezierCurveTo(-0.24, 0.36, -0.14, 0.46, 0.0, 0.47);
  portrait_bustShape.bezierCurveTo(0.13, 0.47, 0.2, 0.38, 0.2, 0.27);
  portrait_bustShape.lineTo(0.25, 0.2);
  portrait_bustShape.lineTo(0.33, 0.12);
  portrait_bustShape.lineTo(0.31, 0.075);
  portrait_bustShape.lineTo(0.25, 0.055);
  portrait_bustShape.lineTo(0.29, 0.025);
  portrait_bustShape.lineTo(0.25, -0.005);
  portrait_bustShape.lineTo(0.21, -0.02);
  portrait_bustShape.bezierCurveTo(0.23, -0.1, 0.18, -0.17, 0.1, -0.2);
  portrait_bustShape.lineTo(0.12, -0.34);
  portrait_bustShape.bezierCurveTo(0.25, -0.4, 0.4, -0.46, 0.49, -0.55);
  portrait_bustShape.lineTo(0.5, -0.57);
  portrait_bustShape.closePath();

  const portrait_bustGeom = new THREE.ExtrudeGeometry(portrait_bustShape, {
    depth: 0.022,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.007,
    bevelSegments: 2,
  });
  const portrait_bust = new THREE.Mesh(portrait_bustGeom, portrait_bronzeMat);
  portrait_bust.name = "portrait_bust";
  portrait_bust.position.z = 0.071;
  portrait_relief.add(portrait_bust);

  const portrait_hairShape = new THREE.Shape();
  portrait_hairShape.moveTo(-0.22, -0.02);
  portrait_hairShape.bezierCurveTo(-0.28, 0.12, -0.27, 0.31, -0.18, 0.4);
  portrait_hairShape.bezierCurveTo(-0.08, 0.5, 0.12, 0.48, 0.2, 0.36);
  portrait_hairShape.bezierCurveTo(0.16, 0.33, 0.13, 0.29, 0.12, 0.24);
  portrait_hairShape.bezierCurveTo(0.04, 0.29, -0.02, 0.25, -0.08, 0.2);
  portrait_hairShape.bezierCurveTo(-0.12, 0.14, -0.11, 0.06, -0.18, 0.0);
  portrait_hairShape.closePath();

  const portrait_hairGeom = new THREE.ExtrudeGeometry(portrait_hairShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.005,
    bevelSegments: 2,
  });
  const portrait_hair = new THREE.Mesh(portrait_hairGeom, coin_edgeMat);
  portrait_hair.name = "portrait_hair";
  portrait_hair.position.z = 0.094;
  portrait_relief.add(portrait_hair);

  const portrait_face_reliefGeom = new THREE.SphereGeometry(1, 24, 12);
  const portrait_face_relief = new THREE.Mesh(
    portrait_face_reliefGeom,
    portrait_bronzeMat
  );
  portrait_face_relief.name = "portrait_face_relief";
  portrait_face_relief.position.set(0.075, 0.17, 0.101);
  portrait_face_relief.scale.set(0.15, 0.22, 0.019);
  portrait_relief.add(portrait_face_relief);

  const portrait_nose_reliefGeom = new THREE.SphereGeometry(1, 18, 10);
  const portrait_nose_relief = new THREE.Mesh(
    portrait_nose_reliefGeom,
    portrait_bronzeMat
  );
  portrait_nose_relief.name = "portrait_nose_relief";
  portrait_nose_relief.position.set(0.252, 0.105, 0.108);
  portrait_nose_relief.scale.set(0.075, 0.035, 0.018);
  portrait_relief.add(portrait_nose_relief);

  const portrait_beard_reliefGeom = new THREE.SphereGeometry(1, 20, 10);
  const portrait_beard_relief = new THREE.Mesh(
    portrait_beard_reliefGeom,
    portrait_bronzeMat
  );
  portrait_beard_relief.name = "portrait_beard_relief";
  portrait_beard_relief.position.set(0.145, -0.075, 0.105);
  portrait_beard_relief.scale.set(0.105, 0.145, 0.018);
  portrait_relief.add(portrait_beard_relief);

  const portrait_earGeom = new THREE.TorusGeometry(0.038, 0.009, 8, 20);
  const portrait_ear = new THREE.Mesh(portrait_earGeom, coin_edgeMat);
  portrait_ear.name = "portrait_ear";
  portrait_ear.position.set(-0.075, 0.105, 0.119);
  portrait_ear.scale.set(0.72, 1.12, 1);
  portrait_relief.add(portrait_ear);

  function addReliefTube(parent, points, radius, material, name) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(8, points.length * 5),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const hair_locks = new THREE.Group();
  hair_locks.name = "hair_locks";
  portrait_relief.add(hair_locks);

  const hairLockPaths = [
    [
      new THREE.Vector3(-0.2, 0.31, 0.119),
      new THREE.Vector3(-0.13, 0.4, 0.12),
      new THREE.Vector3(-0.02, 0.43, 0.119),
    ],
    [
      new THREE.Vector3(-0.22, 0.25, 0.12),
      new THREE.Vector3(-0.12, 0.34, 0.121),
      new THREE.Vector3(0.02, 0.37, 0.12),
    ],
    [
      new THREE.Vector3(-0.22, 0.18, 0.12),
      new THREE.Vector3(-0.12, 0.27, 0.122),
      new THREE.Vector3(0.08, 0.31, 0.12),
    ],
    [
      new THREE.Vector3(-0.21, 0.11, 0.12),
      new THREE.Vector3(-0.12, 0.18, 0.122),
      new THREE.Vector3(-0.02, 0.23, 0.12),
    ],
    [
      new THREE.Vector3(-0.19, 0.05, 0.119),
      new THREE.Vector3(-0.12, 0.1, 0.121),
      new THREE.Vector3(-0.07, 0.16, 0.12),
    ],
    [
      new THREE.Vector3(-0.16, 0.4, 0.118),
      new THREE.Vector3(-0.06, 0.46, 0.12),
      new THREE.Vector3(0.07, 0.43, 0.119),
    ],
    [
      new THREE.Vector3(-0.08, 0.43, 0.118),
      new THREE.Vector3(0.02, 0.46, 0.12),
      new THREE.Vector3(0.14, 0.38, 0.118),
    ],
    [
      new THREE.Vector3(-0.23, 0.29, 0.118),
      new THREE.Vector3(-0.25, 0.2, 0.12),
      new THREE.Vector3(-0.2, 0.12, 0.119),
    ],
    [
      new THREE.Vector3(-0.24, 0.15, 0.118),
      new THREE.Vector3(-0.27, 0.07, 0.12),
      new THREE.Vector3(-0.2, -0.01, 0.118),
    ],
    [
      new THREE.Vector3(-0.2, 0.08, 0.118),
      new THREE.Vector3(-0.22, 0.0, 0.12),
      new THREE.Vector3(-0.14, -0.06, 0.118),
    ],
  ];
  for (let i = 0; i < hairLockPaths.length; i++) {
    addReliefTube(
      hair_locks,
      hairLockPaths[i],
      0.008,
      raised_bronzeMat,
      "hair_lock_" + i
    );
  }

  const hair_braid = new THREE.Group();
  hair_braid.name = "hair_braid";
  portrait_relief.add(hair_braid);

  const braidPaths = [
    [
      new THREE.Vector3(-0.19, 0.25, 0.122),
      new THREE.Vector3(-0.23, 0.16, 0.123),
      new THREE.Vector3(-0.2, 0.07, 0.122),
      new THREE.Vector3(-0.23, -0.01, 0.122),
      new THREE.Vector3(-0.17, -0.08, 0.121),
    ],
    [
      new THREE.Vector3(-0.14, 0.27, 0.122),
      new THREE.Vector3(-0.18, 0.18, 0.124),
      new THREE.Vector3(-0.14, 0.09, 0.123),
      new THREE.Vector3(-0.18, 0.01, 0.123),
      new THREE.Vector3(-0.12, -0.07, 0.122),
    ],
  ];
  for (let i = 0; i < braidPaths.length; i++) {
    addReliefTube(
      hair_braid,
      braidPaths[i],
      0.011,
      raised_bronzeMat,
      "hair_braid_" + i
    );
  }

  const facial_features = new THREE.Group();
  facial_features.name = "facial_features";
  portrait_relief.add(facial_features);

  addReliefTube(
    facial_features,
    [
      new THREE.Vector3(0.065, 0.205, 0.126),
      new THREE.Vector3(0.12, 0.216, 0.127),
      new THREE.Vector3(0.175, 0.2, 0.126),
    ],
    0.005,
    coin_edgeMat,
    "eyebrow"
  );
  addReliefTube(
    facial_features,
    [
      new THREE.Vector3(0.09, 0.166, 0.128),
      new THREE.Vector3(0.13, 0.157, 0.129),
      new THREE.Vector3(0.168, 0.164, 0.128),
    ],
    0.004,
    coin_edgeMat,
    "eye_line"
  );
  addReliefTube(
    facial_features,
    [
      new THREE.Vector3(0.218, 0.055, 0.126),
      new THREE.Vector3(0.248, 0.045, 0.127),
      new THREE.Vector3(0.268, 0.03, 0.126),
    ],
    0.0045,
    coin_edgeMat,
    "mouth_line"
  );
  addReliefTube(
    facial_features,
    [
      new THREE.Vector3(0.18, 0.245, 0.124),
      new THREE.Vector3(0.225, 0.18, 0.125),
      new THREE.Vector3(0.255, 0.11, 0.124),
    ],
    0.004,
    raised_bronzeMat,
    "nose_crease"
  );

  const portrait_eyeGeom = new THREE.SphereGeometry(1, 12, 8);
  const portrait_eye = new THREE.Mesh(portrait_eyeGeom, coin_edgeMat);
  portrait_eye.name = "portrait_eye";
  portrait_eye.position.set(0.132, 0.164, 0.13);
  portrait_eye.scale.set(0.013, 0.008, 0.006);
  facial_features.add(portrait_eye);

  const beard_details = new THREE.Group();
  beard_details.name = "beard_details";
  portrait_relief.add(beard_details);

  for (let i = 0; i < 6; i++) {
    const x = 0.09 + i * 0.025;
    addReliefTube(
      beard_details,
      [
        new THREE.Vector3(x, 0.015, 0.124),
        new THREE.Vector3(x - 0.012 + i * 0.002, -0.07, 0.126),
        new THREE.Vector3(x + 0.006, -0.16, 0.124),
      ],
      0.0055,
      raised_bronzeMat,
      "beard_strand_" + i
    );
  }

  const portrait_drapery = new THREE.Group();
  portrait_drapery.name = "portrait_drapery";
  portrait_relief.add(portrait_drapery);

  const draperyPaths = [
    [
      new THREE.Vector3(-0.43, -0.48, 0.105),
      new THREE.Vector3(-0.25, -0.42, 0.108),
      new THREE.Vector3(-0.05, -0.46, 0.106),
    ],
    [
      new THREE.Vector3(-0.31, -0.54, 0.105),
      new THREE.Vector3(-0.08, -0.48, 0.109),
      new THREE.Vector3(0.19, -0.5, 0.106),
    ],
    [
      new THREE.Vector3(-0.12, -0.37, 0.108),
      new THREE.Vector3(0.03, -0.42, 0.11),
      new THREE.Vector3(0.22, -0.39, 0.108),
      new THREE.Vector3(0.4, -0.47, 0.105),
    ],
    [
      new THREE.Vector3(0.2, -0.35, 0.107),
      new THREE.Vector3(0.29, -0.41, 0.109),
      new THREE.Vector3(0.43, -0.43, 0.106),
    ],
    [
      new THREE.Vector3(-0.37, -0.51, 0.104),
      new THREE.Vector3(-0.18, -0.55, 0.107),
      new THREE.Vector3(0.04, -0.52, 0.106),
    ],
  ];
  for (let i = 0; i < draperyPaths.length; i++) {
    addReliefTube(
      portrait_drapery,
      draperyPaths[i],
      0.008,
      raised_bronzeMat,
      "drapery_fold_" + i
    );
  }

  const portrait_patinaGeom = new THREE.CircleGeometry(1, 9);
  const portrait_patina = new THREE.InstancedMesh(
    portrait_patinaGeom,
    patina_verdigrisMat,
    18
  );
  portrait_patina.name = "portrait_patina";
  {
    const dummy = new THREE.Object3D();
    const spots = [
      [-0.16, 0.31, 0.018],
      [-0.08, 0.39, 0.013],
      [0.02, 0.36, 0.016],
      [0.12, 0.27, 0.012],
      [-0.17, 0.18, 0.01],
      [0.02, 0.12, 0.014],
      [0.18, 0.1, 0.011],
      [-0.02, 0.02, 0.013],
      [0.13, -0.06, 0.015],
      [0.08, -0.16, 0.012],
      [-0.19, -0.31, 0.014],
      [-0.08, -0.4, 0.018],
      [0.08, -0.43, 0.013],
      [0.25, -0.46, 0.016],
      [-0.31, -0.48, 0.012],
      [0.35, -0.5, 0.01],
      [-0.18, 0.05, 0.009],
      [0.04, 0.24, 0.009],
    ];
    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      dummy.position.set(spot[0], spot[1], 0.132);
      dummy.rotation.set(0, 0, i * 0.61);
      dummy.scale.set(spot[2] * 1.25, spot[2], 1);
      dummy.updateMatrix();
      portrait_patina.setMatrixAt(i, dummy.matrix);
    }
    portrait_patina.instanceMatrix.needsUpdate = true;
    portrait_patina.frustumCulled = false;
  }
  portrait_relief.add(portrait_patina);

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