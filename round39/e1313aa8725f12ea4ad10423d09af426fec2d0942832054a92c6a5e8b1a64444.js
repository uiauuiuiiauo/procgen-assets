export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_book";

  const coverW = 1.22;
  const coverL = 1.78;
  const coverH = 0.06;
  const pageW = 1.04;
  const pageL = 1.60;
  const pageH = 0.36;
  const pageX = 0.035;
  const pageBottom = 0.07;
  const pageTop = pageBottom + pageH;
  const bottomCoverBase = 0.01;
  const topCoverBase = 0.43;
  const topSurfaceY = 0.506;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x4a241d,
    metalness: 0.0,
    roughness: 0.7
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x2d1715,
    metalness: 0.0,
    roughness: 0.7
  });
  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x8b5430,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xc49a62,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x775033,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageFleckMat = new THREE.MeshStandardMaterial({
    color: 0xd8b77e,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const clothMat = new THREE.MeshStandardMaterial({
    color: 0xc39a61,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0x91683c,
    metalness: 0.0,
    roughness: 0.95
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xb59a5a,
    metalness: 0.5,
    roughness: 0.25
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0x211411,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  function roundedRectShape(w, l, r) {
    const shape = new THREE.Shape();
    const hw = w / 2;
    const hl = l / 2;
    shape.moveTo(-hw + r, -hl);
    shape.lineTo(hw - r, -hl);
    shape.quadraticCurveTo(hw, -hl, hw, -hl + r);
    shape.lineTo(hw, hl - r);
    shape.quadraticCurveTo(hw, hl, hw - r, hl);
    shape.lineTo(-hw + r, hl);
    shape.quadraticCurveTo(-hw, hl, -hw, hl - r);
    shape.lineTo(-hw, -hl + r);
    shape.quadraticCurveTo(-hw, -hl, -hw + r, -hl);
    shape.closePath();
    return shape;
  }

  function makePatchGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const coverShape = roundedRectShape(coverW, coverL, 0.085);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: coverH,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.012,
    bevelSegments: 3
  });

  const bottom_cover = new THREE.Mesh(coverGeom, leatherMat);
  bottom_cover.name = "bottom_cover";
  bottom_cover.rotation.x = -Math.PI / 2;
  bottom_cover.position.y = bottomCoverBase;
  root.add(bottom_cover);

  const pageShape = roundedRectShape(pageW, pageL, 0.055);
  const page_blockGeom = new THREE.ExtrudeGeometry(pageShape, {
    depth: pageH,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.rotation.x = -Math.PI / 2;
  page_block.position.set(pageX, pageBottom, 0);
  root.add(page_block);

  const spineGeom = new THREE.CylinderGeometry(0.18, 0.18, 1.67, 28);
  const spine = new THREE.Mesh(spineGeom, darkLeatherMat);
  spine.name = "spine";
  spine.rotation.x = Math.PI / 2;
  spine.scale.set(0.55, 1, 1);
  spine.position.set(-0.55, 0.25, 0);
  root.add(spine);

  const spineBandGeom = new THREE.TorusGeometry(0.18, 0.012, 8, 24);
  const spine_bands = new THREE.InstancedMesh(spineBandGeom, wornLeatherMat, 5);
  spine_bands.name = "spine_bands";
  const spineBandMatrix = new THREE.Matrix4();
  const spineBandQuaternion = new THREE.Quaternion();
  const spineBandScale = new THREE.Vector3(0.55, 1, 1);
  for (let i = 0; i < 5; i++) {
    const z = -0.64 + i * 0.32;
    spineBandMatrix.compose(
      new THREE.Vector3(-0.55, 0.25, z),
      spineBandQuaternion,
      spineBandScale
    );
    spine_bands.setMatrixAt(i, spineBandMatrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_bands);

  const top_cover = new THREE.Mesh(coverGeom, leatherMat);
  top_cover.name = "top_cover";
  top_cover.rotation.x = -Math.PI / 2;
  top_cover.position.y = topCoverBase;
  root.add(top_cover);

  const topBorderPoints = [
    new THREE.Vector3(-0.52, topSurfaceY, -0.845),
    new THREE.Vector3(0.52, topSurfaceY, -0.845),
    new THREE.Vector3(0.59, topSurfaceY, -0.775),
    new THREE.Vector3(0.59, topSurfaceY, 0.775),
    new THREE.Vector3(0.52, topSurfaceY, 0.845),
    new THREE.Vector3(-0.52, topSurfaceY, 0.845),
    new THREE.Vector3(-0.59, topSurfaceY, 0.775),
    new THREE.Vector3(-0.59, topSurfaceY, -0.775)
  ];
  const top_cover_borderGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(topBorderPoints, true, "centripetal"),
    64,
    0.009,
    6,
    true
  );
  const top_cover_border = new THREE.Mesh(top_cover_borderGeom, wornLeatherMat);
  top_cover_border.name = "top_cover_border";
  root.add(top_cover_border);

  const pageLayerCount = 22;
  const pageLayerRightGeom = new THREE.BoxGeometry(0.008, 0.003, pageL * 0.94);
  const page_layer_lines_right = new THREE.InstancedMesh(
    pageLayerRightGeom,
    pageLineMat,
    pageLayerCount
  );
  page_layer_lines_right.name = "page_layer_lines_right";

  const pageLayerFrontGeom = new THREE.BoxGeometry(pageW * 0.94, 0.003, 0.008);
  const page_layer_lines_front = new THREE.InstancedMesh(
    pageLayerFrontGeom,
    pageLineMat,
    pageLayerCount
  );
  page_layer_lines_front.name = "page_layer_lines_front";

  const layerMatrix = new THREE.Matrix4();
  const identityQuaternion = new THREE.Quaternion();
  for (let i = 0; i < pageLayerCount; i++) {
    const y = pageBottom + 0.012 + i * (pageH - 0.024) / (pageLayerCount - 1);
    const offset = ((i % 3) - 1) * 0.0015;
    layerMatrix.compose(
      new THREE.Vector3(pageX + pageW / 2 + 0.006 + offset, y, 0),
      identityQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    page_layer_lines_right.setMatrixAt(i, layerMatrix);
    layerMatrix.compose(
      new THREE.Vector3(pageX, y, pageL / 2 + 0.006 + offset),
      identityQuaternion,
      new THREE.Vector3(1, 1, 1)
    );
    page_layer_lines_front.setMatrixAt(i, layerMatrix);
  }
  page_layer_lines_right.instanceMatrix.needsUpdate = true;
  page_layer_lines_front.instanceMatrix.needsUpdate = true;
  root.add(page_layer_lines_right, page_layer_lines_front);

  const pageFleckGeom = new THREE.CircleGeometry(0.012, 10);
  const page_edge_flecks = new THREE.InstancedMesh(pageFleckGeom, pageFleckMat, 10);
  page_edge_flecks.name = "page_edge_flecks";
  const fleckMatrix = new THREE.Matrix4();
  const fleckQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  for (let i = 0; i < 10; i++) {
    const y = pageBottom + 0.025 + i * (pageH - 0.05) / 9;
    const z = -0.68 + ((i * 7) % 10) * 0.15;
    fleckMatrix.compose(
      new THREE.Vector3(pageX + pageW / 2 + 0.013, y, z),
      fleckQuaternion,
      new THREE.Vector3(0.45 + (i % 3) * 0.18, 0.2 + (i % 2) * 0.18, 1)
    );
    page_edge_flecks.setMatrixAt(i, fleckMatrix);
  }
  page_edge_flecks.instanceMatrix.needsUpdate = true;
  root.add(page_edge_flecks);

  const top_edge_wear = new THREE.Group();
  top_edge_wear.name = "top_edge_wear";

  const top_right_wearGeom = makePatchGeometry([
    [0.39, 0.842],
    [0.57, 0.79],
    [0.585, 0.61],
    [0.52, 0.66],
    [0.47, 0.76]
  ]);
  const top_right_wear = new THREE.Mesh(top_right_wearGeom, clothMat);
  top_right_wear.rotation.x = -Math.PI / 2;
  top_right_wear.position.y = topSurfaceY + 0.003;
  top_edge_wear.add(top_right_wear);

  const top_left_wearGeom = makePatchGeometry([
    [-0.585, -0.72],
    [-0.51, -0.84],
    [-0.36, -0.845],
    [-0.42, -0.78],
    [-0.53, -0.68]
  ]);
  const top_left_wear = new THREE.Mesh(top_left_wearGeom, clothMat);
  top_left_wear.rotation.x = -Math.PI / 2;
  top_left_wear.position.y = topSurfaceY + 0.003;
  top_edge_wear.add(top_left_wear);

  const top_front_wearGeom = makePatchGeometry([
    [-0.55, 0.73],
    [-0.49, 0.84],
    [-0.27, 0.845],
    [-0.31, 0.79],
    [-0.42, 0.70]
  ]);
  const top_front_wear = new THREE.Mesh(top_front_wearGeom, clothMat);
  top_front_wear.rotation.x = -Math.PI / 2;
  top_front_wear.position.y = topSurfaceY + 0.003;
  top_edge_wear.add(top_front_wear);

  const top_spine_wearGeom = makePatchGeometry([
    [-0.585, 0.28],
    [-0.535, 0.23],
    [-0.515, 0.48],
    [-0.575, 0.56],
    [-0.595, 0.42]
  ]);
  const top_spine_wear = new THREE.Mesh(top_spine_wearGeom, clothMat);
  top_spine_wear.rotation.x = -Math.PI / 2;
  top_spine_wear.position.y = topSurfaceY + 0.003;
  top_edge_wear.add(top_spine_wear);

  root.add(top_edge_wear);

  const darkStainGeom = new THREE.CircleGeometry(0.045, 18);
  const dark_stains = new THREE.InstancedMesh(darkStainGeom, stainMat, 7);
  dark_stains.name = "dark_stains";
  const stainData = [
    [-0.31, -0.42, 1.8, 0.55, 0.2],
    [0.34, -0.31, 0.8, 1.5, -0.4],
    [-0.27, 0.31, 1.4, 0.45, 0.5],
    [0.25, 0.42, 1.9, 0.5, -0.2],
    [-0.43, 0.02, 0.7, 1.2, 0.1],
    [0.42, 0.10, 0.65, 0.45, 0.7],
    [0.08, -0.67, 0.55, 1.4, -0.6]
  ];
  const stainMatrix = new THREE.Matrix4();
  const horizontalQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0)
  );
  for (let i = 0; i < stainData.length; i++) {
    const d = stainData[i];
    const turnQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      d[4]
    );
    const stainQuaternion = turnQuaternion.clone().multiply(horizontalQuaternion);
    stainMatrix.compose(
      new THREE.Vector3(d[0], topSurfaceY + 0.001, d[1]),
      stainQuaternion,
      new THREE.Vector3(d[2], d[3], 1)
    );
    dark_stains.setMatrixAt(i, stainMatrix);
  }
  dark_stains.instanceMatrix.needsUpdate = true;
  root.add(dark_stains);

  const lightFleckGeom = new THREE.CircleGeometry(0.014, 10);
  const light_flecks = new THREE.InstancedMesh(lightFleckGeom, pageFleckMat, 12);
  light_flecks.name = "light_flecks";
  const lightFleckMatrix = new THREE.Matrix4();
  for (let i = 0; i < 12; i++) {
    const x = -0.43 + ((i * 7) % 11) * 0.085;
    const z = -0.65 + ((i * 5) % 13) * 0.105;
    const sx = 0.35 + (i % 4) * 0.16;
    const sz = 0.25 + ((i + 2) % 3) * 0.2;
    lightFleckMatrix.compose(
      new THREE.Vector3(x, topSurfaceY + 0.004, z),
      horizontalQuaternion,
      new THREE.Vector3(sx, sz, 1)
    );
    light_flecks.setMatrixAt(i, lightFleckMatrix);
  }
  light_flecks.instanceMatrix.needsUpdate = true;
  root.add(light_flecks);

  const scratchVertices = [];
  for (let i = 0; i < 38; i++) {
    const x = -0.49 + ((i * 13) % 37) / 36 * 0.98;
    const z = -0.72 + ((i * 17) % 41) / 40 * 1.44;
    const angle = -0.8 + ((i * 5) % 19) / 18 * 1.6;
    const length = 0.025 + (i % 6) * 0.012;
    const x2 = x + Math.cos(angle) * length;
    const z2 = z + Math.sin(angle) * length;
    scratchVertices.push(
      x, topSurfaceY + 0.005, z,
      x2, topSurfaceY + 0.005, z2
    );
  }
  const scratchGeom = new THREE.BufferGeometry();
  scratchGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(scratchVertices, 3)
  );
  const scratchMat = new THREE.LineBasicMaterial({
    color: 0x98613c,
    transparent: true,
    opacity: 0.48
  });
  const cover_scratches = new THREE.LineSegments(scratchGeom, scratchMat);
  cover_scratches.name = "cover_scratches";
  root.add(cover_scratches);

  const glyphs = {
    A: [[0, 0, 0.5, 1], [0.5, 1, 1, 0], [0.22, 0.45, 0.78, 0.45]],
    B: [[0, 0, 0, 1], [0, 1, 0.72, 1], [0, 0.5, 0.72, 0.5], [0, 0, 0.72, 0], [0.72, 1, 0.92, 0.75], [0.92, 0.75, 0.72, 0.5], [0.72, 0.5, 0.92, 0.25], [0.92, 0.25, 0.72, 0]],
    D: [[0, 0, 0, 1], [0, 1, 0.68, 1], [0.68, 1, 1, 0.72], [1, 0.72, 1, 0.28], [1, 0.28, 0.68, 0], [0.68, 0, 0, 0]],
    E: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.78, 0.5], [0, 0, 1, 0]],
    F: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.78, 0.5]],
    G: [[1, 0.78, 0.78, 1], [0.78, 1, 0.2, 1], [0.2, 1, 0, 0.75], [0, 0.75, 0, 0.22], [0, 0.22, 0.22, 0], [0.22, 0, 0.82, 0], [0.82, 0, 1, 0.22], [1, 0.22, 1, 0.5], [1, 0.5, 0.55, 0.5]],
    H: [[0, 0, 0, 1], [1, 0, 1, 1], [0, 0.5, 1, 0.5]],
    I: [[0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0]],
    L: [[0, 1, 0, 0], [0, 0, 1, 0]],
    N: [[0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]],
    O: [[0.2, 0, 0.8, 0], [0.8, 0, 1, 0.22], [1, 0.22, 1, 0.78], [1, 0.78, 0.8, 1], [0.8, 1, 0.2, 1], [0.2, 1, 0, 0.78], [0, 0.78, 0, 0.22], [0, 0.22, 0.2, 0]],
    R: [[0, 0, 0, 1], [0, 1, 0.72, 1], [0.72, 1, 0.94, 0.75], [0.94, 0.75, 0.72, 0.5], [0.72, 0.5, 0, 0.5], [0.5, 0.5, 1, 0]],
    S: [[1, 0.86, 0.78, 1], [0.78, 1, 0.2, 1], [0.2, 1, 0, 0.78], [0, 0.78, 0.2, 0.55], [0.2, 0.55, 0.8, 0.45], [0.8, 0.45, 1, 0.22], [1, 0.22, 0.8, 0], [0.8, 0, 0.18, 0]],
    T: [[0, 1, 1, 1], [0.5, 1, 0.5, 0]],
    Y: [[0, 1, 0.5, 0.52], [1, 1, 0.5, 0.52], [0.5, 0.52, 0.5, 0]]
  };

  const titleStrokes = [];

  function addWord(word, centerZ, height) {
    const letterW = height * 0.56;
    const gap = height * 0.18;
    const totalW = word.length * letterW + (word.length - 1) * gap;
    const startX = -totalW / 2;
    for (let i = 0; i < word.length; i++) {
      const segments = glyphs[word[i]] || [];
      const baseX = startX + i * (letterW + gap);
      for (let j = 0; j < segments.length; j++) {
        const s = segments[j];
        titleStrokes.push([
          baseX + s[0] * letterW,
          centerZ + (0.5 - s[1]) * height,
          baseX + s[2] * letterW,
          centerZ + (0.5 - s[3]) * height
        ]);
      }
    }
  }

  addWord("LOST", -0.43, 0.14);
  addWord("FOLIO", -0.17, 0.17);
  addWord("OF", 0.055, 0.10);
  addWord("SHARESSE", 0.27, 0.14);
  addWord("ENGLISH", 0.47, 0.058);

  const titleStrokeGeom = new THREE.BoxGeometry(1, 0.007, 0.013);
  const title_letters = new THREE.InstancedMesh(
    titleStrokeGeom,
    goldMat,
    titleStrokes.length
  );
  title_letters.name = "title_letters";
  const titleMatrix = new THREE.Matrix4();
  const titleQuaternion = new THREE.Quaternion();
  const titleAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < titleStrokes.length; i++) {
    const s = titleStrokes[i];
    const dx = s[2] - s[0];
    const dz = s[3] - s[1];
    const length = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(-dz, dx);
    titleQuaternion.setFromAxisAngle(titleAxis, angle);
    titleMatrix.compose(
      new THREE.Vector3(
        (s[0] + s[2]) / 2 + pageX,
        topSurfaceY + 0.009,
        (s[1] + s[3]) / 2
      ),
      titleQuaternion,
      new THREE.Vector3(length, 1, 1)
    );
    title_letters.setMatrixAt(i, titleMatrix);
  }
  title_letters.instanceMatrix.needsUpdate = true;
  root.add(title_letters);

  const binding_thread_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.57, 0.485, -0.63),
    new THREE.Vector3(0.67, 0.45, -0.70),
    new THREE.Vector3(0.735, 0.31, -0.72),
    new THREE.Vector3(0.72, 0.13, -0.66),
    new THREE.Vector3(0.65, 0.035, -0.57)
  ]);
  const binding_threadGeom = new THREE.TubeGeometry(
    binding_thread_path,
    28,
    0.012,
    7,
    false
  );
  const binding_thread = new THREE.Mesh(binding_threadGeom, threadMat);
  binding_thread.name = "binding_thread";
  root.add(binding_thread);

  const thread_knotGeom = new THREE.SphereGeometry(0.034, 14, 9);
  const thread_knot = new THREE.Mesh(thread_knotGeom, threadMat);
  thread_knot.name = "thread_knot";
  thread_knot.scale.set(1.15, 0.75, 0.9);
  thread_knot.position.set(0.70, 0.43, -0.69);
  root.add(thread_knot);

  const bottom_edge_wear = new THREE.Group();
  bottom_edge_wear.name = "bottom_edge_wear";

  const front_cover_wearGeom = makePatchGeometry([
    [0.10, 0.012],
    [0.31, 0.012],
    [0.28, 0.075],
    [0.20, 0.062],
    [0.14, 0.082]
  ]);
  const front_cover_wear = new THREE.Mesh(front_cover_wearGeom, clothMat);
  front_cover_wear.position.z = coverL / 2 + 0.006;
  bottom_edge_wear.add(front_cover_wear);

  const right_cover_wearGeom = makePatchGeometry([
    [0.605, 0.012],
    [0.70, 0.012],
    [0.68, 0.075],
    [0.63, 0.062],
    [0.59, 0.085]
  ]);
  const right_cover_wear = new THREE.Mesh(right_cover_wearGeom, clothMat);
  right_cover_wear.rotation.y = Math.PI / 2;
  bottom_edge_wear.add(right_cover_wear);

  root.add(bottom_edge_wear);

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