export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_grimoire";

  const book = new THREE.Group();
  book.name = "book";
  root.add(book);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x3b211d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const panelLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x432620,
    metalness: 0.0,
    roughness: 0.7,
  });
  const edgeLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x704329,
    metalness: 0.0,
    roughness: 0.7,
  });
  const darkSeamMat = new THREE.MeshStandardMaterial({
    color: 0x24130f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x9b6336,
    metalness: 0.0,
    roughness: 0.9,
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xead9b3,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xc4a777,
    metalness: 0.0,
    roughness: 0.9,
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad45,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa8873f,
    metalness: 0.5,
    roughness: 0.35,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x745827,
    metalness: 0.5,
    roughness: 0.4,
  });
  const wearMat = new THREE.MeshStandardMaterial({
    color: 0x98603a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  function roundedRectCurve(width, height, radius, centerX, centerY, z) {
    const points = [];
    const corners = [
      [centerX + width / 2 - radius, centerY + height / 2 - radius, 0, Math.PI / 2],
      [centerX - width / 2 + radius, centerY + height / 2 - radius, Math.PI / 2, Math.PI],
      [centerX - width / 2 + radius, centerY - height / 2 + radius, Math.PI, Math.PI * 1.5],
      [centerX + width / 2 - radius, centerY - height / 2 + radius, Math.PI * 1.5, Math.PI * 2],
    ];

    for (const corner of corners) {
      for (let i = 0; i < 6; i++) {
        const angle = corner[2] + (corner[3] - corner[2]) * (i / 5);
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const coverW = 0.68;
  const coverH = 1.06;
  const coverD = 0.03;
  const coverX = 0.02;
  const pageW = 0.60;
  const pageH = 0.98;
  const pageD = 0.23;
  const pageX = 0.015;
  const frontCoverZ = pageD / 2 + coverD / 2;
  const backCoverZ = -frontCoverZ;

  const coverGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(coverW, coverH, 0.055),
    {
      depth: coverD,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 3,
      curveSegments: 12,
    }
  );

  const back_cover = new THREE.Mesh(coverGeom, edgeLeatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(coverX, 0, -frontCoverZ - coverD);
  book.add(back_cover);

  const page_blockGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(pageW, pageH, 0.035),
    {
      depth: pageD,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 10,
    }
  );
  const page_block = new THREE.Mesh(page_blockGeom, paperMat);
  page_block.name = "page_block";
  page_block.position.set(pageX, 0, -pageD / 2);
  book.add(page_block);

  const spineGeom = new THREE.CylinderGeometry(0.15, 0.15, 1.02, 32);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.position.set(-0.32, 0, 0);
  spine.scale.set(0.48, 1, 1);
  book.add(spine);

  const spineBandGeom = new THREE.TorusGeometry(0.147, 0.011, 8, 32);
  const spine_bands = new THREE.InstancedMesh(spineBandGeom, edgeLeatherMat, 4);
  spine_bands.name = "spine_bands";
  const dummy = new THREE.Object3D();
  const bandHeights = [-0.39, -0.14, 0.13, 0.38];
  for (let i = 0; i < bandHeights.length; i++) {
    dummy.position.set(-0.32, bandHeights[i], 0);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(0.48, 1, 1);
    dummy.updateMatrix();
    spine_bands.setMatrixAt(i, dummy.matrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  book.add(spine_bands);

  const topPageLineGeom = new THREE.BoxGeometry(pageW * 0.94, 0.0015, 0.0025);
  const top_page_lines = new THREE.InstancedMesh(topPageLineGeom, pageLineMat, 12);
  top_page_lines.name = "top_page_lines";
  for (let i = 0; i < 12; i++) {
    dummy.position.set(pageX, pageH / 2 + 0.003, -pageD * 0.43 + i * pageD * 0.078);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    top_page_lines.setMatrixAt(i, dummy.matrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  book.add(top_page_lines);

  const forePageLineGeom = new THREE.BoxGeometry(0.002, pageH * 0.91, 0.0025);
  const fore_page_lines = new THREE.InstancedMesh(forePageLineGeom, pageLineMat, 12);
  fore_page_lines.name = "fore_page_lines";
  for (let i = 0; i < 12; i++) {
    dummy.position.set(pageX + pageW / 2 + 0.003, 0, -pageD * 0.43 + i * pageD * 0.078);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fore_page_lines.setMatrixAt(i, dummy.matrix);
  }
  fore_page_lines.instanceMatrix.needsUpdate = true;
  book.add(fore_page_lines);

  const front_cover = new THREE.Mesh(coverGeom, edgeLeatherMat);
  front_cover.name = "front_cover";
  front_cover.position.set(coverX, 0, frontCoverZ - coverD / 2);
  book.add(front_cover);

  const front_panelGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(0.60, 0.94, 0.04),
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 2,
      curveSegments: 10,
    }
  );
  const front_panel = new THREE.Mesh(front_panelGeom, panelLeatherMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0.02, 0, 0.164);
  book.add(front_panel);

  const coverPipingCurve = roundedRectCurve(0.62, 0.99, 0.045, coverX, 0, 0.175);
  const cover_pipingGeom = new THREE.TubeGeometry(
    coverPipingCurve,
    96,
    0.008,
    8,
    true
  );
  const cover_piping = new THREE.Mesh(cover_pipingGeom, edgeLeatherMat);
  cover_piping.name = "cover_piping";
  book.add(cover_piping);

  const panelSeamCurve = roundedRectCurve(0.565, 0.905, 0.032, 0.02, 0, 0.178);
  const panel_seamGeom = new THREE.TubeGeometry(
    panelSeamCurve,
    96,
    0.003,
    6,
    true
  );
  const panel_seam = new THREE.Mesh(panel_seamGeom, darkSeamMat);
  panel_seam.name = "panel_seam";
  book.add(panel_seam);

  const horizontalStitchGeom = new THREE.BoxGeometry(0.021, 0.004, 0.004);
  const horizontal_stitches = new THREE.InstancedMesh(horizontalStitchGeom, stitchMat, 40);
  horizontal_stitches.name = "horizontal_stitches";
  let stitchIndex = 0;
  for (const y of [-0.456, 0.456]) {
    for (let i = 0; i < 20; i++) {
      dummy.position.set(-0.245 + i * 0.0285, y, 0.183);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      horizontal_stitches.setMatrixAt(stitchIndex++, dummy.matrix);
    }
  }
  horizontal_stitches.instanceMatrix.needsUpdate = true;
  book.add(horizontal_stitches);

  const verticalStitchGeom = new THREE.BoxGeometry(0.004, 0.021, 0.004);
  const vertical_stitches = new THREE.InstancedMesh(verticalStitchGeom, stitchMat, 52);
  vertical_stitches.name = "vertical_stitches";
  stitchIndex = 0;
  for (const x of [-0.266, 0.306]) {
    for (let i = 0; i < 26; i++) {
      dummy.position.set(x, -0.405 + i * 0.032, 0.183);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      vertical_stitches.setMatrixAt(stitchIndex++, dummy.matrix);
    }
  }
  vertical_stitches.instanceMatrix.needsUpdate = true;
  book.add(vertical_stitches);

  const sideReinforcementGeom = new THREE.BoxGeometry(0.025, 0.90, 0.012);
  const side_reinforcements = new THREE.InstancedMesh(
    sideReinforcementGeom,
    edgeLeatherMat,
    2
  );
  side_reinforcements.name = "side_reinforcements";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.282 : 0.322, 0, 0.174);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_reinforcements.setMatrixAt(i, dummy.matrix);
  }
  side_reinforcements.instanceMatrix.needsUpdate = true;
  book.add(side_reinforcements);

  const front_decoration = new THREE.Group();
  front_decoration.name = "front_decoration";
  book.add(front_decoration);

  const runePatterns = {
    A: [
      [-0.42, -0.5, 0, 0.5],
      [0, 0.5, 0.42, -0.5],
      [-0.25, -0.05, 0.25, -0.05],
    ],
    C: [
      [0.35, 0.5, -0.3, 0.5],
      [-0.3, 0.5, -0.42, 0],
      [-0.42, 0, -0.3, -0.5],
      [-0.3, -0.5, 0.35, -0.5],
    ],
    E: [
      [-0.38, -0.5, -0.38, 0.5],
      [-0.38, 0.5, 0.38, 0.5],
      [-0.38, 0, 0.25, 0],
      [-0.38, -0.5, 0.38, -0.5],
    ],
    F: [
      [-0.38, -0.5, -0.38, 0.5],
      [-0.38, 0.5, 0.38, 0.5],
      [-0.38, 0, 0.25, 0],
    ],
    G: [
      [0.35, 0.5, -0.3, 0.5],
      [-0.3, 0.5, -0.42, 0],
      [-0.42, 0, -0.3, -0.5],
      [-0.3, -0.5, 0.35, -0.5],
      [0.35, -0.5, 0.35, 0],
      [0.35, 0, 0.02, 0],
    ],
    I: [
      [-0.35, 0.5, 0.35, 0.5],
      [0, 0.5, 0, -0.5],
      [-0.35, -0.5, 0.35, -0.5],
    ],
    K: [
      [-0.38, -0.5, -0.38, 0.5],
      [-0.38, 0, 0.38, 0.5],
      [-0.38, 0, 0.38, -0.5],
    ],
    M: [
      [-0.42, -0.5, -0.42, 0.5],
      [-0.42, 0.5, 0, -0.05],
      [0, -0.05, 0.42, 0.5],
      [0.42, 0.5, 0.42, -0.5],
    ],
    N: [
      [-0.4, -0.5, -0.4, 0.5],
      [-0.4, 0.5, 0.4, -0.5],
      [0.4, -0.5, 0.4, 0.5],
    ],
    O: [
      [-0.3, 0.5, 0.3, 0.5],
      [0.3, 0.5, 0.42, 0],
      [0.42, 0, 0.3, -0.5],
      [0.3, -0.5, -0.3, -0.5],
      [-0.3, -0.5, -0.42, 0],
      [-0.42, 0, -0.3, 0.5],
    ],
    P: [
      [-0.38, -0.5, -0.38, 0.5],
      [-0.38, 0.5, 0.28, 0.5],
      [0.28, 0.5, 0.4, 0],
      [0.4, 0, 0.28, -0.12],
      [0.28, -0.12, -0.38, -0.12],
    ],
    Q: [
      [-0.3, 0.5, 0.3, 0.5],
      [0.3, 0.5, 0.42, 0],
      [0.42, 0, 0.3, -0.5],
      [0.3, -0.5, -0.3, -0.5],
      [-0.3, -0.5, -0.42, 0],
      [-0.42, 0, -0.3, 0.5],
      [0.05, -0.2, 0.45, -0.58],
    ],
    R: [
      [-0.38, -0.5, -0.38, 0.5],
      [-0.38, 0.5, 0.28, 0.5],
      [0.28, 0.5, 0.4, 0],
      [0.4, 0, 0.28, -0.12],
      [0.28, -0.12, -0.38, -0.12],
      [0.02, -0.12, 0.42, -0.5],
    ],
    T: [
      [-0.42, 0.5, 0.42, 0.5],
      [0, 0.5, 0, -0.5],
    ],
    U: [
      [-0.4, 0.5, -0.4, -0.35],
      [-0.4, -0.35, -0.25, -0.5],
      [-0.25, -0.5, 0.25, -0.5],
      [0.25, -0.5, 0.4, -0.35],
      [0.4, -0.35, 0.4, 0.5],
    ],
    V: [
      [-0.42, 0.5, 0, -0.5],
      [0, -0.5, 0.42, 0.5],
    ],
    X: [
      [-0.4, 0.5, 0.4, -0.5],
      [0.4, 0.5, -0.4, -0.5],
    ],
    Y: [
      [-0.42, 0.5, 0, 0],
      [0.42, 0.5, 0, 0],
      [0, 0, 0, -0.5],
    ],
  };

  const runeStrokes = [];

  function queueRune(character, centerX, centerY, size, rotation, z) {
    const pattern = runePatterns[character];
    if (!pattern) return;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    for (const segment of pattern) {
      const x1 = segment[0] * size;
      const y1 = segment[1] * size;
      const x2 = segment[2] * size;
      const y2 = segment[3] * size;
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      const dx = x2 - x1;
      const dy = y2 - y1;

      runeStrokes.push({
        x: centerX + mx * cos - my * sin,
        y: centerY + mx * sin + my * cos,
        z,
        length: Math.sqrt(dx * dx + dy * dy),
        angle: Math.atan2(dy, dx) + rotation,
        width: size * 0.075,
        depth: 0.004,
      });
    }
  }

  function queueText(text, centerX, centerY, size, spacing, z) {
    const width = (text.length - 1) * spacing + size * 0.84;
    for (let i = 0; i < text.length; i++) {
      queueRune(
        text[i],
        centerX - width / 2 + i * spacing + size * 0.42,
        centerY,
        size,
        0,
        z
      );
    }
  }

  queueText("I O U M I E", 0.02, 0.36, 0.068, 0.075, 0.185);
  queueText("C F X", 0.05, 0.245, 0.060, 0.078, 0.185);
  queueText("L C H", 0.04, 0.125, 0.058, 0.080, 0.185);
  queueText("K Y R", 0.02, 0.005, 0.058, 0.080, 0.185);
  queueText("N C", 0.02, -0.175, 0.064, 0.090, 0.185);
  queueText("X L", 0.09, -0.285, 0.055, 0.085, 0.185);
  queueText("F T B R I V O", 0.02, -0.395, 0.049, 0.055, 0.185);

  queueRune("A", -0.13, 0.255, 0.045, -0.28, 0.185);
  queueRune("V", -0.12, -0.285, 0.045, 0.32, 0.185);
  queueRune("E", -0.20, -0.075, 0.040, -0.22, 0.185);
  queueRune("Q", 0.18, 0.205, 0.042, 0.20, 0.185);

  const runeStrokeGeom = new THREE.BoxGeometry(1, 1, 1);
  const rune_inscriptions = new THREE.InstancedMesh(
    runeStrokeGeom,
    goldMat,
    runeStrokes.length
  );
  rune_inscriptions.name = "rune_inscriptions";
  for (let i = 0; i < runeStrokes.length; i++) {
    const stroke = runeStrokes[i];
    dummy.position.set(stroke.x, stroke.y, stroke.z);
    dummy.rotation.set(0, 0, stroke.angle);
    dummy.scale.set(stroke.length, stroke.width, stroke.depth);
    dummy.updateMatrix();
    rune_inscriptions.setMatrixAt(i, dummy.matrix);
  }
  rune_inscriptions.instanceMatrix.needsUpdate = true;
  front_decoration.add(rune_inscriptions);

  const sideStrokes = [];

  function queueSideRune(character, y, z, size, rotation) {
    const pattern = runePatterns[character];
    if (!pattern) return;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    for (const segment of pattern) {
      const u1 = segment[0] * size;
      const v1 = segment[1] * size;
      const u2 = segment[2] * size;
      const v2 = segment[3] * size;
      const u = (u1 + u2) / 2;
      const v = (v1 + v2) / 2;
      const du = u2 - u1;
      const dv = v2 - v1;

      sideStrokes.push({
        x: -0.395,
        y: y + v * cos - u * sin,
        z: z + u * cos + v * sin,
        length: Math.sqrt(du * du + dv * dv),
        angle: Math.atan2(dv, du) + rotation,
        width: size * 0.075,
      });
    }
  }

  const sideGlyphs = [
    ["A", 0.31, 0.045, 0.050, -0.15],
    ["L", 0.22, -0.035, 0.045, 0.12],
    ["Y", 0.12, 0.050, 0.048, -0.20],
    ["T", 0.02, -0.040, 0.046, 0.16],
    ["K", -0.09, 0.045, 0.050, -0.10],
    ["C", -0.20, -0.035, 0.046, 0.18],
    ["N", -0.31, 0.045, 0.048, -0.12],
    ["V", -0.39, -0.035, 0.040, 0.15],
  ];
  for (const glyph of sideGlyphs) {
    queueSideRune(glyph[0], glyph[1], glyph[2], glyph[3], glyph[4]);
  }

  const side_inscriptions = new THREE.InstancedMesh(
    runeStrokeGeom,
    goldMat,
    sideStrokes.length
  );
  side_inscriptions.name = "side_inscriptions";
  for (let i = 0; i < sideStrokes.length; i++) {
    const stroke = sideStrokes[i];
    dummy.position.set(stroke.x, stroke.y, stroke.z);
    dummy.rotation.set(stroke.angle, 0, 0);
    dummy.scale.set(stroke.depth, stroke.width, stroke.length);
    dummy.updateMatrix();
    side_inscriptions.setMatrixAt(i, dummy.matrix);
  }
  side_inscriptions.instanceMatrix.needsUpdate = true;
  front_decoration.add(side_inscriptions);

  const scratchData = [
    [-0.20, 0.31, 0.055, 0.25],
    [-0.16, 0.19, 0.038, -0.45],
    [0.24, 0.28, 0.045, 0.12],
    [0.25, 0.08, 0.060, -0.30],
    [-0.18, -0.02, 0.042, 0.40],
    [-0.13, -0.22, 0.055, -0.20],
    [0.23, -0.22, 0.040, 0.65],
    [-0.22, -0.36, 0.035, -0.50],
    [0.27, -0.38, 0.050, 0.18],
    [0.13, 0.16, 0.032, -0.75],
  ];
  const scratchGeom = new THREE.BoxGeometry(1, 1, 1);
  const leather_scratches = new THREE.InstancedMesh(
    scratchGeom,
    wearMat,
    scratchData.length
  );
  leather_scratches.name = "leather_scratches";
  for (let i = 0; i < scratchData.length; i++) {
    const scratch = scratchData[i];
    dummy.position.set(scratch[0], scratch[1], 0.181);
    dummy.rotation.set(0, 0, scratch[3]);
    dummy.scale.set(scratch[2], 0.0018, 0.002);
    dummy.updateMatrix();
    leather_scratches.setMatrixAt(i, dummy.matrix);
  }
  leather_scratches.instanceMatrix.needsUpdate = true;
  front_decoration.add(leather_scratches);

  const wearSpotGeom = new THREE.CircleGeometry(1, 16);
  const wearSpots = [
    [-0.245, 0.432, 0.024, 0.010],
    [0.282, 0.430, 0.026, 0.011],
    [-0.245, -0.432, 0.030, 0.012],
    [0.282, -0.432, 0.027, 0.010],
    [-0.270, 0.08, 0.014, 0.025],
    [0.294, -0.10, 0.013, 0.022],
    [-0.10, -0.32, 0.012, 0.008],
    [0.16, 0.30, 0.010, 0.006],
  ];
  const leather_wear_spots = new THREE.InstancedMesh(
    wearSpotGeom,
    wearMat,
    wearSpots.length
  );
  leather_wear_spots.name = "leather_wear_spots";
  for (let i = 0; i < wearSpots.length; i++) {
    const spot = wearSpots[i];
    dummy.position.set(spot[0], spot[1], 0.181);
    dummy.rotation.set(0, 0, i * 0.37);
    dummy.scale.set(spot[2], spot[3], 1);
    dummy.updateMatrix();
    leather_wear_spots.setMatrixAt(i, dummy.matrix);
  }
  leather_wear_spots.instanceMatrix.needsUpdate = true;
  front_decoration.add(leather_wear_spots);

  const sideEmblemStrokeGeom = new THREE.BoxGeometry(1, 1, 1);
  const side_emblem = new THREE.InstancedMesh(sideEmblemStrokeGeom, goldMat, 6);
  side_emblem.name = "side_emblem";
  const emblemSegments = [
    [-0.396, -0.435, 0.012, 0.085, 0],
    [-0.396, -0.435, 0.080, 0.012, 0],
    [-0.396, -0.475, 0.012, 0.085, 0],
    [-0.396, -0.475, 0.080, 0.012, 0],
    [-0.397, -0.455, 0.060, 0.010, 0.72],
    [-0.397, -0.455, 0.060, 0.010, -0.72],
  ];
  for (let i = 0; i < emblemSegments.length; i++) {
    const segment = emblemSegments[i];
    dummy.position.set(segment[0], segment[1], segment[2]);
    dummy.rotation.set(segment[4], 0, 0);
    dummy.scale.set(0.003, segment[3], 0.005);
    dummy.updateMatrix();
    side_emblem.setMatrixAt(i, dummy.matrix);
  }
  side_emblem.instanceMatrix.needsUpdate = true;
  front_decoration.add(side_emblem);

  const clasp = new THREE.Group();
  clasp.name = "clasp";
  book.add(clasp);

  const claspStrapGeom = new THREE.ExtrudeGeometry(
    roundedRectShape(0.25, 0.115, 0.025),
    {
      depth: 0.018,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 3,
      curveSegments: 10,
    }
  );
  const clasp_strap = new THREE.Mesh(claspStrapGeom, leatherMat);
  clasp_strap.name = "clasp_strap";
  clasp_strap.position.set(0.405, 0.04, 0.180);
  clasp.add(clasp_strap);

  const claspEdgeCurve = roundedRectCurve(0.235, 0.10, 0.021, 0.405, 0.04, 0.204);
  const clasp_edgeGeom = new THREE.TubeGeometry(
    claspEdgeCurve,
    48,
    0.003,
    6,
    true
  );
  const clasp_edge = new THREE.Mesh(clasp_edgeGeom, edgeLeatherMat);
  clasp_edge.name = "clasp_edge";
  clasp.add(clasp_edge);

  const medallionBackingGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.012, 32);
  const medallion_backing = new THREE.Mesh(medallionBackingGeom, darkBrassMat);
  medallion_backing.name = "medallion_backing";
  medallion_backing.rotation.x = Math.PI / 2;
  medallion_backing.position.set(0.325, 0.04, 0.202);
  clasp.add(medallion_backing);

  const medallionGeom = new THREE.CylinderGeometry(0.060, 0.060, 0.014, 32);
  const medallion = new THREE.Mesh(medallionGeom, brassMat);
  medallion.name = "medallion";
  medallion.rotation.x = Math.PI / 2;
  medallion.position.set(0.325, 0.04, 0.211);
  clasp.add(medallion);

  const medallionRingGeom = new THREE.TorusGeometry(0.052, 0.005, 8, 32);
  const medallion_ring = new THREE.Mesh(medallionRingGeom, darkBrassMat);
  medallion_ring.name = "medallion_ring";
  medallion_ring.position.set(0.325, 0.04, 0.220);
  clasp.add(medallion_ring);

  const snapButtonGeom = new THREE.SphereGeometry(0.031, 24, 12);
  const snap_button = new THREE.Mesh(snapButtonGeom, goldMat);
  snap_button.name = "snap_button";
  snap_button.position.set(0.405, 0.04, 0.225);
  snap_button.scale.set(1, 1, 0.62);
  clasp.add(snap_button);

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