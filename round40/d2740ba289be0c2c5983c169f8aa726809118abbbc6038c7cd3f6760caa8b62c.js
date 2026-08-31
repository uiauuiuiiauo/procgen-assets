export default function generate(THREE) {
  const root = new THREE.Group();
  const contents_group = new THREE.Group();
  const jar_group = new THREE.Group();
  const lid_group = new THREE.Group();
  root.add(contents_group, jar_group, lid_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const brineMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9ad68,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.82,
    ior: 1.33,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const brine_surfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xc5b76e,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.88,
    ior: 1.33,
    transparent: true,
    opacity: 0.34,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const cabbageMat = new THREE.MeshStandardMaterial({
    color: 0xeee9c8,
    metalness: 0.0,
    roughness: 0.78,
    side: THREE.DoubleSide
  });
  const pale_cabbageMat = new THREE.MeshStandardMaterial({
    color: 0xf5f0d1,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const green_leafMat = new THREE.MeshStandardMaterial({
    color: 0x91b646,
    metalness: 0.0,
    roughness: 0.82,
    side: THREE.DoubleSide
  });
  const dark_leafMat = new THREE.MeshStandardMaterial({
    color: 0x477b2d,
    metalness: 0.0,
    roughness: 0.86,
    side: THREE.DoubleSide
  });
  const onionMat = new THREE.MeshStandardMaterial({
    color: 0xe8e3c3,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const carrotMat = new THREE.MeshStandardMaterial({
    color: 0xd98a36,
    metalness: 0.0,
    roughness: 0.82
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xb9cf58,
    metalness: 0.0,
    roughness: 0.82
  });
  const rootMat = new THREE.MeshStandardMaterial({
    color: 0xc9a86c,
    metalness: 0.0,
    roughness: 0.88
  });
  const mushroomMat = new THREE.MeshStandardMaterial({
    color: 0x987b58,
    metalness: 0.0,
    roughness: 0.9
  });
  const spiceMat = new THREE.MeshStandardMaterial({
    color: 0x342819,
    metalness: 0.0,
    roughness: 0.9
  });
  const lidMat = new THREE.MeshStandardMaterial({
    color: 0xa6b89a,
    metalness: 0.6,
    roughness: 0.5
  });
  const lid_topMat = new THREE.MeshStandardMaterial({
    color: 0xb9c8ad,
    metalness: 0.6,
    roughness: 0.5
  });
  const lid_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x71836a,
    metalness: 0.6,
    roughness: 0.5
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.16,
    depthWrite: false
  });

  const glass_bodyProfile = [
    new THREE.Vector2(0.405, 0.025),
    new THREE.Vector2(0.425, 0.045),
    new THREE.Vector2(0.445, 0.105),
    new THREE.Vector2(0.455, 0.22),
    new THREE.Vector2(0.455, 0.84),
    new THREE.Vector2(0.447, 0.98),
    new THREE.Vector2(0.425, 1.08),
    new THREE.Vector2(0.392, 1.155),
    new THREE.Vector2(0.382, 1.205),
    new THREE.Vector2(0.398, 1.225),
    new THREE.Vector2(0.398, 1.255),
    new THREE.Vector2(0.365, 1.255),
    new THREE.Vector2(0.362, 1.205),
    new THREE.Vector2(0.374, 1.16),
    new THREE.Vector2(0.402, 1.095),
    new THREE.Vector2(0.423, 1.0),
    new THREE.Vector2(0.425, 0.2),
    new THREE.Vector2(0.41, 0.1),
    new THREE.Vector2(0.39, 0.055),
    new THREE.Vector2(0.405, 0.025)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.renderOrder = 2;
  jar_group.add(glass_body);

  const glass_baseGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.026, 64);
  const glass_base = new THREE.Mesh(glass_baseGeom, glassMat);
  glass_base.position.y = 0.038;
  glass_base.renderOrder = 2;
  jar_group.add(glass_base);

  const bottom_rimGeom = new THREE.TorusGeometry(0.405, 0.012, 10, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, glassMat);
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.047;
  bottom_rim.renderOrder = 2;
  jar_group.add(bottom_rim);

  const neck_ringGeom = new THREE.TorusGeometry(0.386, 0.012, 10, 64);
  const neck_ring = new THREE.Mesh(neck_ringGeom, glassMat);
  neck_ring.rotation.x = Math.PI / 2;
  neck_ring.position.y = 1.188;
  neck_ring.renderOrder = 2;
  jar_group.add(neck_ring);

  const mouth_rimGeom = new THREE.TorusGeometry(0.382, 0.016, 12, 64);
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, glassMat);
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 1.238;
  mouth_rim.renderOrder = 2;
  jar_group.add(mouth_rim);

  const brineProfile = [
    new THREE.Vector2(0.0, 0.055),
    new THREE.Vector2(0.37, 0.055),
    new THREE.Vector2(0.402, 0.11),
    new THREE.Vector2(0.408, 0.24),
    new THREE.Vector2(0.408, 0.88),
    new THREE.Vector2(0.398, 1.0),
    new THREE.Vector2(0.365, 1.1),
    new THREE.Vector2(0.0, 1.1)
  ];
  const brineGeom = new THREE.LatheGeometry(brineProfile, 48);
  const brine = new THREE.Mesh(brineGeom, brineMat);
  brine.renderOrder = 1;
  contents_group.add(brine);

  const brine_surfaceGeom = new THREE.CircleGeometry(0.36, 48);
  const brine_surface = new THREE.Mesh(brine_surfaceGeom, brine_surfaceMat);
  brine_surface.rotation.x = -Math.PI / 2;
  brine_surface.position.y = 1.102;
  brine_surface.renderOrder = 1;
  contents_group.add(brine_surface);

  const dummy = new THREE.Object3D();

  const cabbage_ribbonsShape = new THREE.Shape();
  cabbage_ribbonsShape.moveTo(-0.14, -0.028);
  cabbage_ribbonsShape.bezierCurveTo(-0.09, -0.055, -0.035, -0.045, 0.015, -0.025);
  cabbage_ribbonsShape.bezierCurveTo(0.065, -0.008, 0.11, -0.035, 0.145, 0.005);
  cabbage_ribbonsShape.lineTo(0.125, 0.04);
  cabbage_ribbonsShape.bezierCurveTo(0.075, 0.02, 0.035, 0.055, -0.015, 0.04);
  cabbage_ribbonsShape.bezierCurveTo(-0.07, 0.025, -0.11, 0.055, -0.14, 0.018);
  cabbage_ribbonsShape.closePath();
  const cabbage_ribbonsGeom = new THREE.ExtrudeGeometry(cabbage_ribbonsShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 1
  });
  cabbage_ribbonsGeom.translate(0, 0, -0.006);

  const cabbage_ribbons = new THREE.InstancedMesh(
    cabbage_ribbonsGeom,
    cabbageMat,
    132
  );
  for (let i = 0; i < 132; i++) {
    const layer = Math.floor(i / 11);
    const slot = i % 11;
    const angle = i * 2.399963 + layer * 0.27;
    const radial = 0.035 + 0.285 * ((i * 17) % 31) / 30;
    const y = 0.105 + layer * 0.09 + (slot - 5) * 0.004;
    dummy.position.set(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.75 + ((i * 5) % 13) / 12 * 1.5,
      -angle + ((i * 3) % 7) * 0.12,
      -1.15 + ((i * 7) % 17) / 16 * 2.3
    );
    dummy.scale.set(
      0.72 + ((i * 7) % 11) * 0.045,
      0.72 + ((i * 5) % 9) * 0.055,
      0.8 + ((i * 3) % 5) * 0.08
    );
    dummy.updateMatrix();
    cabbage_ribbons.setMatrixAt(i, dummy.matrix);
  }
  cabbage_ribbons.instanceMatrix.needsUpdate = true;
  contents_group.add(cabbage_ribbons);

  const pale_cabbage_chunksShape = new THREE.Shape();
  pale_cabbage_chunksShape.moveTo(-0.085, -0.05);
  pale_cabbage_chunksShape.lineTo(0.045, -0.062);
  pale_cabbage_chunksShape.lineTo(0.09, -0.012);
  pale_cabbage_chunksShape.lineTo(0.055, 0.06);
  pale_cabbage_chunksShape.lineTo(-0.04, 0.072);
  pale_cabbage_chunksShape.lineTo(-0.09, 0.015);
  pale_cabbage_chunksShape.closePath();
  const pale_cabbage_chunksGeom = new THREE.ExtrudeGeometry(
    pale_cabbage_chunksShape,
    {
      depth: 0.025,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.005,
      bevelSegments: 2
    }
  );
  pale_cabbage_chunksGeom.translate(0, 0, -0.0125);

  const pale_cabbage_chunks = new THREE.InstancedMesh(
    pale_cabbage_chunksGeom,
    pale_cabbageMat,
    66
  );
  for (let i = 0; i < 66; i++) {
    const layer = Math.floor(i / 9);
    const slot = i % 9;
    const angle = i * 2.146755 + 0.8;
    const radial = 0.04 + 0.275 * ((i * 13) % 29) / 28;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.11 + layer * 0.138 + (slot - 4) * 0.006,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.9 + ((i * 3) % 11) / 10 * 1.8,
      angle + ((i * 5) % 7) * 0.16,
      -1.0 + ((i * 7) % 13) / 12 * 2.0
    );
    dummy.scale.set(
      0.72 + ((i * 5) % 8) * 0.07,
      0.68 + ((i * 7) % 9) * 0.065,
      0.8 + ((i * 2) % 5) * 0.08
    );
    dummy.updateMatrix();
    pale_cabbage_chunks.setMatrixAt(i, dummy.matrix);
  }
  pale_cabbage_chunks.instanceMatrix.needsUpdate = true;
  contents_group.add(pale_cabbage_chunks);

  const green_leaf_piecesShape = new THREE.Shape();
  green_leaf_piecesShape.moveTo(-0.105, 0);
  green_leaf_piecesShape.bezierCurveTo(-0.055, -0.052, 0.05, -0.05, 0.11, 0);
  green_leaf_piecesShape.bezierCurveTo(0.045, 0.048, -0.055, 0.055, -0.105, 0);
  green_leaf_piecesShape.closePath();
  const green_leaf_piecesGeom = new THREE.ExtrudeGeometry(
    green_leaf_piecesShape,
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.002,
      bevelSize: 0.002,
      bevelSegments: 1
    }
  );
  green_leaf_piecesGeom.translate(0, 0, -0.004);

  const green_leaf_pieces = new THREE.InstancedMesh(
    green_leaf_piecesGeom,
    green_leafMat,
    36
  );
  for (let i = 0; i < 36; i++) {
    const layer = Math.floor(i / 6);
    const slot = i % 6;
    const angle = i * 2.633 + 0.35;
    const radial = 0.055 + 0.27 * ((i * 11) % 23) / 22;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.12 + layer * 0.17 + (slot - 2.5) * 0.012,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.8 + ((i * 5) % 9) / 8 * 1.6,
      -angle + ((i * 3) % 5) * 0.2,
      -1.2 + ((i * 7) % 11) / 10 * 2.4
    );
    dummy.scale.set(
      0.72 + ((i * 3) % 7) * 0.08,
      0.65 + ((i * 5) % 6) * 0.08,
      1
    );
    dummy.updateMatrix();
    green_leaf_pieces.setMatrixAt(i, dummy.matrix);
  }
  green_leaf_pieces.instanceMatrix.needsUpdate = true;
  contents_group.add(green_leaf_pieces);

  const dark_leaf_pieces = new THREE.InstancedMesh(
    green_leaf_piecesGeom,
    dark_leafMat,
    18
  );
  for (let i = 0; i < 18; i++) {
    const layer = Math.floor(i / 3);
    const slot = i % 3;
    const angle = i * 2.81 + 1.1;
    const radial = 0.08 + 0.24 * ((i * 7) % 17) / 16;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.18 + layer * 0.145 + (slot - 1) * 0.025,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.65 + ((i * 3) % 7) / 6 * 1.3,
      angle + ((i * 5) % 4) * 0.25,
      -1.0 + ((i * 7) % 9) / 8 * 2.0
    );
    dummy.scale.set(0.55 + i * 0.018, 0.5 + (i % 4) * 0.08, 1);
    dummy.updateMatrix();
    dark_leaf_pieces.setMatrixAt(i, dummy.matrix);
  }
  dark_leaf_pieces.instanceMatrix.needsUpdate = true;
  contents_group.add(dark_leaf_pieces);

  const onion_crescentsShape = new THREE.Shape();
  onion_crescentsShape.moveTo(-0.12, -0.018);
  onion_crescentsShape.bezierCurveTo(-0.06, 0.025, 0.045, 0.035, 0.12, -0.012);
  onion_crescentsShape.lineTo(0.105, 0.035);
  onion_crescentsShape.bezierCurveTo(0.035, 0.078, -0.07, 0.068, -0.105, 0.02);
  onion_crescentsShape.closePath();
  const onion_crescentsGeom = new THREE.ExtrudeGeometry(
    onion_crescentsShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 1
    }
  );
  onion_crescentsGeom.translate(0, 0, -0.006);

  const onion_crescents = new THREE.InstancedMesh(
    onion_crescentsGeom,
    onionMat,
    32
  );
  for (let i = 0; i < 32; i++) {
    const layer = Math.floor(i / 4);
    const slot = i % 4;
    const angle = i * 2.22 + 0.4;
    const radial = 0.07 + 0.255 * ((i * 9) % 19) / 18;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.14 + layer * 0.12 + (slot - 1.5) * 0.018,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.75 + ((i * 5) % 8) * 0.19,
      -angle,
      -1.1 + ((i * 7) % 10) * 0.23
    );
    dummy.scale.set(
      0.72 + (i % 5) * 0.09,
      0.7 + ((i * 3) % 4) * 0.12,
      1
    );
    dummy.updateMatrix();
    onion_crescents.setMatrixAt(i, dummy.matrix);
  }
  onion_crescents.instanceMatrix.needsUpdate = true;
  contents_group.add(onion_crescents);

  const green_stripsGeom = new THREE.BoxGeometry(0.25, 0.026, 0.012);
  const green_strips = new THREE.InstancedMesh(green_stripsGeom, stemMat, 28);
  for (let i = 0; i < 28; i++) {
    const layer = Math.floor(i / 4);
    const slot = i % 4;
    const angle = i * 2.47 + 0.7;
    const radial = 0.06 + 0.26 * ((i * 13) % 21) / 20;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.13 + layer * 0.14 + (slot - 1.5) * 0.018,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.8 + ((i * 3) % 7) * 0.24,
      angle + ((i * 5) % 6) * 0.2,
      -1.25 + ((i * 7) % 9) * 0.29
    );
    dummy.scale.set(
      0.72 + (i % 6) * 0.08,
      0.8 + (i % 3) * 0.12,
      1
    );
    dummy.updateMatrix();
    green_strips.setMatrixAt(i, dummy.matrix);
  }
  green_strips.instanceMatrix.needsUpdate = true;
  contents_group.add(green_strips);

  const curved_stemsPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.13, -0.015, 0),
    new THREE.Vector3(-0.055, 0.025, 0.012),
    new THREE.Vector3(0.035, 0.018, -0.008),
    new THREE.Vector3(0.13, 0.055, 0)
  ]);
  const curved_stemsGeom = new THREE.TubeGeometry(
    curved_stemsPath,
    18,
    0.009,
    6,
    false
  );
  const curved_stems = new THREE.InstancedMesh(curved_stemsGeom, stemMat, 24);
  for (let i = 0; i < 24; i++) {
    const layer = Math.floor(i / 3);
    const slot = i % 3;
    const angle = i * 2.52 + 1.4;
    const radial = 0.07 + 0.25 * ((i * 11) % 19) / 18;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.16 + layer * 0.125 + (slot - 1) * 0.025,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.7 + ((i * 3) % 7) * 0.22,
      -angle,
      -0.9 + ((i * 5) % 8) * 0.25
    );
    dummy.scale.set(
      0.72 + (i % 5) * 0.09,
      0.8 + (i % 3) * 0.1,
      0.8 + (i % 4) * 0.06
    );
    dummy.updateMatrix();
    curved_stems.setMatrixAt(i, dummy.matrix);
  }
  curved_stems.instanceMatrix.needsUpdate = true;
  contents_group.add(curved_stems);

  const carrot_stripsGeom = new THREE.BoxGeometry(0.17, 0.032, 0.016);
  const carrot_strips = new THREE.InstancedMesh(
    carrot_stripsGeom,
    carrotMat,
    20
  );
  for (let i = 0; i < 20; i++) {
    const layer = Math.floor(i / 4);
    const slot = i % 4;
    const angle = i * 2.71 + 0.2;
    const radial = 0.08 + 0.245 * ((i * 7) % 17) / 16;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.12 + layer * 0.23 + (slot - 1.5) * 0.025,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.7 + ((i * 3) % 6) * 0.27,
      angle + ((i * 5) % 4) * 0.3,
      -1.0 + ((i * 7) % 9) * 0.25
    );
    dummy.scale.set(
      0.72 + (i % 5) * 0.08,
      0.85 + (i % 3) * 0.1,
      1
    );
    dummy.updateMatrix();
    carrot_strips.setMatrixAt(i, dummy.matrix);
  }
  carrot_strips.instanceMatrix.needsUpdate = true;
  contents_group.add(carrot_strips);

  const scallion_ringsGeom = new THREE.TorusGeometry(0.034, 0.008, 6, 18);
  const scallion_rings = new THREE.InstancedMesh(
    scallion_ringsGeom,
    green_leafMat,
    16
  );
  for (let i = 0; i < 16; i++) {
    const layer = Math.floor(i / 4);
    const slot = i % 4;
    const angle = i * 2.36 + 0.9;
    const radial = 0.1 + 0.22 * ((i * 5) % 13) / 12;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.2 + layer * 0.25 + (slot - 1.5) * 0.035,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      Math.PI / 2 + ((i * 3) % 5) * 0.16,
      angle,
      ((i * 7) % 6) * 0.2
    );
    dummy.scale.setScalar(0.8 + (i % 4) * 0.12);
    dummy.updateMatrix();
    scallion_rings.setMatrixAt(i, dummy.matrix);
  }
  scallion_rings.instanceMatrix.needsUpdate = true;
  contents_group.add(scallion_rings);

  const mushroom_capsGeom = new THREE.SphereGeometry(0.065, 12, 8);
  const mushroom_caps = new THREE.InstancedMesh(
    mushroom_capsGeom,
    mushroomMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const layer = Math.floor(i / 3);
    const slot = i % 3;
    const angle = i * 2.45 + 1.7;
    const radial = 0.12 + 0.2 * ((i * 7) % 11) / 10;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.1 + layer * 0.29 + (slot - 1) * 0.035,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      -0.35 + (i % 4) * 0.2,
      angle,
      ((i * 3) % 5) * 0.25
    );
    dummy.scale.set(
      0.8 + (i % 3) * 0.12,
      0.42 + (i % 2) * 0.08,
      0.72 + ((i * 3) % 4) * 0.08
    );
    dummy.updateMatrix();
    mushroom_caps.setMatrixAt(i, dummy.matrix);
  }
  mushroom_caps.instanceMatrix.needsUpdate = true;
  contents_group.add(mushroom_caps);

  const mushroom_stemsGeom = new THREE.CylinderGeometry(
    0.014,
    0.021,
    0.11,
    8
  );
  const mushroom_stems = new THREE.InstancedMesh(
    mushroom_stemsGeom,
    rootMat,
    12
  );
  for (let i = 0; i < 12; i++) {
    const layer = Math.floor(i / 3);
    const slot = i % 3;
    const angle = i * 2.45 + 1.7;
    const radial = 0.12 + 0.2 * ((i * 7) % 11) / 10;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.1 + layer * 0.29 - 0.045 + (slot - 1) * 0.035,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(
      0.15 + (i % 3) * 0.12,
      angle,
      0.2 + (i % 4) * 0.13
    );
    dummy.scale.set(0.9, 0.8 + (i % 3) * 0.12, 0.9);
    dummy.updateMatrix();
    mushroom_stems.setMatrixAt(i, dummy.matrix);
  }
  mushroom_stems.instanceMatrix.needsUpdate = true;
  contents_group.add(mushroom_stems);

  const spice_specksGeom = new THREE.SphereGeometry(0.006, 6, 4);
  const spice_specks = new THREE.InstancedMesh(
    spice_specksGeom,
    spiceMat,
    48
  );
  for (let i = 0; i < 48; i++) {
    const layer = Math.floor(i / 8);
    const slot = i % 8;
    const angle = i * 2.29 + 0.25;
    const radial = 0.08 + 0.27 * ((i * 13) % 31) / 30;
    dummy.position.set(
      Math.cos(angle) * radial,
      0.09 + layer * 0.16 + (slot - 3.5) * 0.008,
      Math.sin(angle) * radial
    );
    dummy.rotation.set(0, angle, 0);
    const scale = 0.65 + (i % 4) * 0.18;
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    spice_specks.setMatrixAt(i, dummy.matrix);
  }
  spice_specks.instanceMatrix.needsUpdate = true;
  contents_group.add(spice_specks);

  const glass_highlightsGeom = new THREE.BoxGeometry(0.012, 0.72, 0.004);
  const glass_highlights = new THREE.InstancedMesh(
    glass_highlightsGeom,
    highlightMat,
    2
  );
  const highlight_x = -0.31;
  const highlight_z = Math.sqrt(0.445 * 0.445 - highlight_x * highlight_x) + 0.004;
  dummy.position.set(highlight_x, 0.62, highlight_z);
  dummy.rotation.set(0, Math.atan2(highlight_x, highlight_z), 0);
  dummy.scale.set(1, 1, 1);
  dummy.updateMatrix();
  glass_highlights.setMatrixAt(0, dummy.matrix);
  dummy.position.set(-0.37, 0.68, Math.sqrt(0.445 * 0.445 - 0.37 * 0.37) + 0.004);
  dummy.rotation.set(0, Math.atan2(-0.37, 0.32), 0);
  dummy.scale.set(0.65, 0.72, 1);
  dummy.updateMatrix();
  glass_highlights.setMatrixAt(1, dummy.matrix);
  glass_highlights.instanceMatrix.needsUpdate = true;
  glass_highlights.renderOrder = 3;
  jar_group.add(glass_highlights);

  const lid_bandGeom = new THREE.CylinderGeometry(0.438, 0.438, 0.13, 64);
  const lid_band = new THREE.Mesh(lid_bandGeom, lidMat);
  lid_band.position.y = 1.335;
  lid_group.add(lid_band);

  const lid_topGeom = new THREE.CylinderGeometry(0.39, 0.39, 0.012, 64);
  const lid_top = new THREE.Mesh(lid_topGeom, lid_topMat);
  lid_top.position.y = 1.407;
  lid_group.add(lid_top);

  const lid_lower_rollGeom = new THREE.TorusGeometry(0.421, 0.018, 10, 64);
  const lid_lower_roll = new THREE.Mesh(lid_lower_rollGeom, lidMat);
  lid_lower_roll.rotation.x = Math.PI / 2;
  lid_lower_roll.position.y = 1.273;
  lid_group.add(lid_lower_roll);

  const lid_upper_rollGeom = new THREE.TorusGeometry(0.418, 0.019, 10, 64);
  const lid_upper_roll = new THREE.Mesh(lid_upper_rollGeom, lid_topMat);
  lid_upper_roll.rotation.x = Math.PI / 2;
  lid_upper_roll.position.y = 1.394;
  lid_group.add(lid_upper_roll);

  const lid_top_grooveGeom = new THREE.TorusGeometry(0.345, 0.006, 8, 64);
  const lid_top_groove = new THREE.Mesh(lid_top_grooveGeom, lid_grooveMat);
  lid_top_groove.rotation.x = Math.PI / 2;
  lid_top_groove.position.y = 1.416;
  lid_group.add(lid_top_groove);

  const lid_ridgesGeom = new THREE.BoxGeometry(0.007, 0.075, 0.012);
  const lid_ridges = new THREE.InstancedMesh(lid_ridgesGeom, lidMat, 48);
  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    dummy.position.set(
      Math.cos(angle) * 0.439,
      1.335,
      Math.sin(angle) * 0.439
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    lid_ridges.setMatrixAt(i, dummy.matrix);
  }
  lid_ridges.instanceMatrix.needsUpdate = true;
  lid_group.add(lid_ridges);

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