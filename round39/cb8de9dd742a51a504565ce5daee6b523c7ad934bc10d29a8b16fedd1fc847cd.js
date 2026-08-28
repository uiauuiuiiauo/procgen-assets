export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "illuminated_book_pendant";

  const book_group = new THREE.Group();
  book_group.name = "book_group";
  root.add(book_group);

  const bookW = 1.0;
  const bookH = 1.42;
  const bookD = 0.12;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x171923,
    metalness: 0.0,
    roughness: 0.7
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xd8c99f,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x9e8b63,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4a62e,
    metalness: 0.6,
    roughness: 0.2
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x95691f,
    metalness: 0.5,
    roughness: 0.25
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xa92e28,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x15549c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const turquoiseMat = new THREE.MeshStandardMaterial({
    color: 0x2796a3,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x3f793d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const paleGreenMat = new THREE.MeshStandardMaterial({
    color: 0x9bb75a,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xc64b62,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd5a06f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const brownMat = new THREE.MeshStandardMaterial({
    color: 0x704129,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const darkInkMat = new THREE.MeshStandardMaterial({
    color: 0x34251d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const ivoryMat = new THREE.MeshStandardMaterial({
    color: 0xe8d7a2,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const gemRedMat = new THREE.MeshStandardMaterial({
    color: 0xc83b3b,
    metalness: 0.0,
    roughness: 0.3
  });
  const gemBlueMat = new THREE.MeshStandardMaterial({
    color: 0x318ac0,
    metalness: 0.0,
    roughness: 0.3
  });
  const gemGreenMat = new THREE.MeshStandardMaterial({
    color: 0x46a56e,
    metalness: 0.0,
    roughness: 0.3
  });

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    shape.closePath();
    return shape;
  }

  function addFlatRect(parent, w, h, d, mat, x, y, z, rotationZ) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.z = rotationZ || 0;
    parent.add(mesh);
    return mesh;
  }

  function addFlatStroke(parent, x1, y1, x2, y2, width, depth, mat, z) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(length, width, depth),
      mat
    );
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    mesh.rotation.z = Math.atan2(dy, dx);
    parent.add(mesh);
    return mesh;
  }

  function addSurfaceTube(parent, points, radius, mat, segments) {
    const path = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(path, segments || 20, radius, 6, false),
      mat
    );
    parent.add(mesh);
    return mesh;
  }

  function addEllipse(parent, geom, mat, x, y, z, sx, sy, rotationZ) {
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, 1);
    mesh.rotation.z = rotationZ || 0;
    parent.add(mesh);
    return mesh;
  }

  const coverShape = roundedRectShape(bookW, bookH, 0.045);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });

  const front_cover = new THREE.Mesh(coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.z = 0.035;
  book_group.add(front_cover);

  const back_cover = new THREE.Mesh(coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.z = -0.095;
  book_group.add(back_cover);

  const page_blockGeom = new THREE.BoxGeometry(0.92, 1.31, 0.09);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.position.set(0.015, 0, 0);
  book_group.add(page_block);

  const spineGeom = new THREE.CylinderGeometry(0.07, 0.07, 1.36, 20);
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.position.set(-0.49, 0, 0);
  spine.scale.set(1, 1, 0.82);
  book_group.add(spine);

  const page_edge_lineGeom = new THREE.BoxGeometry(0.007, 0.006, 0.078);
  const page_edge_lines = new THREE.InstancedMesh(
    page_edge_lineGeom,
    pageLineMat,
    13
  );
  page_edge_lines.name = "page_edge_lines";
  const pageLineDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    pageLineDummy.position.set(0.474, -0.57 + i * 0.095, 0);
    pageLineDummy.rotation.set(0, 0, 0);
    pageLineDummy.scale.set(1, 1, 1);
    pageLineDummy.updateMatrix();
    page_edge_lines.setMatrixAt(i, pageLineDummy.matrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  book_group.add(page_edge_lines);

  const top_page_lineGeom = new THREE.BoxGeometry(0.87, 0.005, 0.006);
  const top_page_lines = new THREE.InstancedMesh(
    top_page_lineGeom,
    pageLineMat,
    5
  );
  top_page_lines.name = "top_page_lines";
  const topLineDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    topLineDummy.position.set(0.015, 0.657, -0.032 + i * 0.016);
    topLineDummy.rotation.set(0, 0, 0);
    topLineDummy.scale.set(1, 1, 1);
    topLineDummy.updateMatrix();
    top_page_lines.setMatrixAt(i, topLineDummy.matrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  book_group.add(top_page_lines);

  const front_art = new THREE.Group();
  front_art.name = "front_art";
  front_art.position.z = 0.087;
  book_group.add(front_art);

  const front_inset_panelGeom = new THREE.BoxGeometry(0.88, 1.27, 0.006);
  const front_inset_panel = new THREE.Mesh(front_inset_panelGeom, darkGoldMat);
  front_inset_panel.name = "front_inset_panel";
  front_inset_panel.position.z = 0.003;
  front_art.add(front_inset_panel);

  const outer_gold_frame = new THREE.Group();
  outer_gold_frame.name = "outer_gold_frame";
  addFlatRect(outer_gold_frame, 0.84, 0.014, 0.006, goldMat, 0, 0.61, 0.009, 0);
  addFlatRect(outer_gold_frame, 0.84, 0.014, 0.006, goldMat, 0, -0.61, 0.009, 0);
  addFlatRect(outer_gold_frame, 0.014, 1.22, 0.006, goldMat, -0.42, 0, 0.009, 0);
  addFlatRect(outer_gold_frame, 0.014, 1.22, 0.006, goldMat, 0.42, 0, 0.009, 0);
  front_art.add(outer_gold_frame);

  const middle_gold_frame = new THREE.Group();
  middle_gold_frame.name = "middle_gold_frame";
  addFlatRect(middle_gold_frame, 0.79, 0.011, 0.006, goldMat, 0, 0.575, 0.01, 0);
  addFlatRect(middle_gold_frame, 0.79, 0.011, 0.006, goldMat, 0, -0.575, 0.01, 0);
  addFlatRect(middle_gold_frame, 0.011, 1.15, 0.006, goldMat, -0.395, 0, 0.01, 0);
  addFlatRect(middle_gold_frame, 0.011, 1.15, 0.006, goldMat, 0.395, 0, 0.01, 0);
  front_art.add(middle_gold_frame);

  const inner_gold_frame = new THREE.Group();
  inner_gold_frame.name = "inner_gold_frame";
  addFlatRect(inner_gold_frame, 0.70, 0.012, 0.007, goldMat, 0, 0.445, 0.012, 0);
  addFlatRect(inner_gold_frame, 0.70, 0.012, 0.007, goldMat, 0, -0.455, 0.012, 0);
  addFlatRect(inner_gold_frame, 0.012, 0.902, 0.007, goldMat, -0.35, -0.005, 0.012, 0);
  addFlatRect(inner_gold_frame, 0.012, 0.902, 0.007, goldMat, 0.35, -0.005, 0.012, 0);
  front_art.add(inner_gold_frame);

  const border_filigree = new THREE.Group();
  border_filigree.name = "border_filigree";
  for (let i = 0; i < 12; i++) {
    const x = -0.33 + i * 0.06;
    addFlatStroke(border_filigree, x - 0.019, 0.535, x, 0.565, 0.006, 0.005, goldMat, 0.014);
    addFlatStroke(border_filigree, x, 0.565, x + 0.019, 0.535, 0.006, 0.005, goldMat, 0.014);
    addFlatStroke(border_filigree, x - 0.019, -0.535, x, -0.565, 0.006, 0.005, goldMat, 0.014);
    addFlatStroke(border_filigree, x, -0.565, x + 0.019, -0.535, 0.006, 0.005, goldMat, 0.014);
  }
  for (let i = 0; i < 8; i++) {
    const y = -0.39 + i * 0.11;
    addFlatStroke(border_filigree, -0.375, y - 0.02, -0.395, y, 0.006, 0.005, goldMat, 0.014);
    addFlatStroke(border_filigree, -0.395, y, -0.375, y + 0.02, 0.006, 0.005, goldMat, 0.014);
    addFlatStroke(border_filigree, 0.375, y - 0.02, 0.395, y, 0.006, 0.005, goldMat, 0.014);
    addFlatStroke(border_filigree, 0.395, y, 0.375, y + 0.02, 0.006, 0.005, goldMat, 0.014);
  }
  front_art.add(border_filigree);

  const gemstoneGeom = new THREE.OctahedronGeometry(0.018, 0);
  const gemstone_frames = new THREE.InstancedMesh(gemstoneGeom, goldMat, 28);
  gemstone_frames.name = "gemstone_frames";
  const gemstone_red = new THREE.InstancedMesh(gemstoneGeom, gemRedMat, 7);
  gemstone_red.name = "gemstone_red";
  const gemstone_blue = new THREE.InstancedMesh(gemstoneGeom, gemBlueMat, 7);
  gemstone_blue.name = "gemstone_blue";
  const gemstone_green = new THREE.InstancedMesh(gemstoneGeom, gemGreenMat, 7);
  gemstone_green.name = "gemstone_green";
  gemstone_red.renderOrder = 3;
  gemstone_blue.renderOrder = 3;
  gemstone_green.renderOrder = 3;

  const gemDummy = new THREE.Object3D();
  let redIndex = 0;
  let blueIndex = 0;
  let greenIndex = 0;
  for (let i = 0; i < 28; i++) {
    let gx = 0;
    let gy = 0;
    if (i < 8) {
      gx = -0.315 + i * 0.09;
      gy = 0.548;
    } else if (i < 16) {
      gx = -0.315 + (i - 8) * 0.09;
      gy = -0.548;
    } else if (i < 24) {
      gx = i % 2 === 0 ? -0.378 : 0.378;
      gy = -0.36 + (i - 16) * 0.103;
    } else {
      gx = i % 2 === 0 ? -0.295 : 0.295;
      gy = i < 27 ? 0.405 : -0.405;
    }

    gemDummy.position.set(gx, gy, 0.018);
    gemDummy.rotation.set(0, 0, Math.PI / 4);
    gemDummy.scale.set(0.72, 0.72, 0.22);
    gemDummy.updateMatrix();
    gemstone_frames.setMatrixAt(i, gemDummy.matrix);

    gemDummy.position.z = 0.024;
    gemDummy.scale.set(0.39, 0.39, 0.18);
    gemDummy.updateMatrix();
    const type = i % 3;
    if (type === 0) {
      gemstone_red.setMatrixAt(redIndex++, gemDummy.matrix);
    } else if (type === 1) {
      gemstone_blue.setMatrixAt(blueIndex++, gemDummy.matrix);
    } else {
      gemstone_green.setMatrixAt(greenIndex++, gemDummy.matrix);
    }
  }
  gemstone_frames.instanceMatrix.needsUpdate = true;
  gemstone_red.instanceMatrix.needsUpdate = true;
  gemstone_blue.instanceMatrix.needsUpdate = true;
  gemstone_green.instanceMatrix.needsUpdate = true;
  front_art.add(gemstone_frames);
  front_art.add(gemstone_red);
  front_art.add(gemstone_blue);
  front_art.add(gemstone_green);

  const central_blue_fieldGeom = new THREE.CircleGeometry(0.36, 64);
  const central_blue_field = new THREE.Mesh(central_blue_fieldGeom, turquoiseMat);
  central_blue_field.name = "central_blue_field";
  central_blue_field.position.set(0, -0.02, 0.011);
  central_blue_field.scale.set(1, 1.25, 1);
  front_art.add(central_blue_field);

  const central_gold_fieldGeom = new THREE.CircleGeometry(0.29, 56);
  const central_gold_field = new THREE.Mesh(central_gold_fieldGeom, goldMat);
  central_gold_field.name = "central_gold_field";
  central_gold_field.position.set(0, -0.11, 0.014);
  central_gold_field.scale.set(1, 1.1, 1);
  front_art.add(central_gold_field);

  const central_gold_ringGeom = new THREE.TorusGeometry(0.36, 0.008, 8, 64);
  const central_gold_ring = new THREE.Mesh(central_gold_ringGeom, goldMat);
  central_gold_ring.name = "central_gold_ring";
  central_gold_ring.position.set(0, -0.02, 0.018);
  central_gold_ring.scale.set(1, 1.25, 1);
  front_art.add(central_gold_ring);

  const central_inner_ringGeom = new THREE.TorusGeometry(0.292, 0.005, 8, 56);
  const central_inner_ring = new THREE.Mesh(central_inner_ringGeom, darkGoldMat);
  central_inner_ring.name = "central_inner_ring";
  central_inner_ring.position.set(0, -0.02, 0.019);
  central_inner_ring.scale.set(1, 1.25, 1);
  front_art.add(central_inner_ring);

  const title_banner = new THREE.Group();
  title_banner.name = "title_banner";
  addFlatRect(title_banner, 0.62, 0.105, 0.008, blueMat, 0, 0.365, 0.018, 0);
  addFlatRect(title_banner, 0.64, 0.011, 0.009, goldMat, 0, 0.422, 0.023, 0);
  addFlatRect(title_banner, 0.64, 0.011, 0.009, goldMat, 0, 0.308, 0.023, 0);
  addFlatRect(title_banner, 0.011, 0.115, 0.009, goldMat, -0.32, 0.365, 0.023, 0);
  addFlatRect(title_banner, 0.011, 0.115, 0.009, goldMat, 0.32, 0.365, 0.023, 0);
  front_art.add(title_banner);

  const title_glyphGeom = new THREE.BoxGeometry(0.008, 0.052, 0.005);
  const title_glyphs = new THREE.InstancedMesh(title_glyphGeom, goldMat, 18);
  title_glyphs.name = "title_glyphs";
  const glyphDummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    glyphDummy.position.set(-0.255 + i * 0.03, 0.365, 0.025);
    glyphDummy.rotation.set(0, 0, i % 3 === 0 ? -0.18 : i % 3 === 1 ? 0.12 : 0);
    glyphDummy.scale.set(1, i % 4 === 0 ? 0.72 : 1, 1);
    glyphDummy.updateMatrix();
    title_glyphs.setMatrixAt(i, glyphDummy.matrix);
  }
  title_glyphs.instanceMatrix.needsUpdate = true;
  front_art.add(title_glyphs);

  const title_crossbarGeom = new THREE.BoxGeometry(0.019, 0.006, 0.005);
  const title_crossbars = new THREE.InstancedMesh(title_crossbarGeom, goldMat, 12);
  title_crossbars.name = "title_crossbars";
  for (let i = 0; i < 12; i++) {
    glyphDummy.position.set(-0.255 + i * 0.047, 0.378 - (i % 2) * 0.022, 0.028);
    glyphDummy.rotation.set(0, 0, i % 2 === 0 ? 0.08 : -0.08);
    glyphDummy.scale.set(1, 1, 1);
    glyphDummy.updateMatrix();
    title_crossbars.setMatrixAt(i, glyphDummy.matrix);
  }
  title_crossbars.instanceMatrix.needsUpdate = true;
  front_art.add(title_crossbars);

  const title_ribbonGeom = new THREE.BoxGeometry(0.09, 0.034, 0.007);
  const title_left_ribbon = new THREE.Mesh(title_ribbonGeom, redMat);
  title_left_ribbon.name = "title_left_ribbon";
  title_left_ribbon.position.set(-0.35, 0.345, 0.021);
  title_left_ribbon.rotation.z = -0.28;
  front_art.add(title_left_ribbon);

  const title_right_ribbon = new THREE.Mesh(title_ribbonGeom, redMat);
  title_right_ribbon.name = "title_right_ribbon";
  title_right_ribbon.position.set(0.35, 0.345, 0.021);
  title_right_ribbon.rotation.z = 0.28;
  front_art.add(title_right_ribbon);

  const bottom_caption = new THREE.Group();
  bottom_caption.name = "bottom_caption";
  addFlatRect(bottom_caption, 0.55, 0.075, 0.007, blueMat, 0.03, -0.49, 0.021, 0);
  addFlatRect(bottom_caption, 0.57, 0.009, 0.008, goldMat, 0.03, -0.45, 0.025, 0);
  addFlatRect(bottom_caption, 0.57, 0.009, 0.008, goldMat, 0.03, -0.53, 0.025, 0);
  addFlatRect(bottom_caption, 0.009, 0.08, 0.008, goldMat, -0.255, -0.49, 0.025, 0);
  addFlatRect(bottom_caption, 0.009, 0.08, 0.008, goldMat, 0.315, -0.49, 0.025, 0);
  front_art.add(bottom_caption);

  const bottom_glyphs = new THREE.InstancedMesh(title_glyphGeom, goldMat, 13);
  bottom_glyphs.name = "bottom_glyphs";
  for (let i = 0; i < 13; i++) {
    glyphDummy.position.set(-0.18 + i * 0.035, -0.49, 0.027);
    glyphDummy.rotation.set(0, 0, i % 2 === 0 ? 0.12 : -0.12);
    glyphDummy.scale.set(0.75, 0.5, 1);
    glyphDummy.updateMatrix();
    bottom_glyphs.setMatrixAt(i, glyphDummy.matrix);
  }
  bottom_glyphs.instanceMatrix.needsUpdate = true;
  front_art.add(bottom_glyphs);

  const central_title_panelGeom = new THREE.CircleGeometry(0.19, 48);
  const central_title_panel = new THREE.Mesh(central_title_panelGeom, ivoryMat);
  central_title_panel.name = "central_title_panel";
  central_title_panel.position.set(0, -0.075, 0.021);
  central_title_panel.scale.set(1.12, 0.57, 1);
  front_art.add(central_title_panel);

  const central_title_outlineGeom = new THREE.TorusGeometry(0.19, 0.005, 8, 48);
  const central_title_outline = new THREE.Mesh(central_title_outlineGeom, darkGoldMat);
  central_title_outline.name = "central_title_outline";
  central_title_outline.position.set(0, -0.075, 0.024);
  central_title_outline.scale.set(1.12, 0.57, 1);
  front_art.add(central_title_outline);

  const central_title_strokeGeom = new THREE.BoxGeometry(0.008, 0.045, 0.005);
  const central_title_strokes = new THREE.InstancedMesh(
    central_title_strokeGeom,
    darkInkMat,
    15
  );
  central_title_strokes.name = "central_title_strokes";
  for (let i = 0; i < 15; i++) {
    glyphDummy.position.set(-0.13 + i * 0.019, -0.075, 0.027);
    glyphDummy.rotation.set(0, 0, i % 3 === 0 ? -0.2 : i % 3 === 1 ? 0.16 : 0);
    glyphDummy.scale.set(1, i % 4 === 0 ? 0.7 : 1, 1);
    glyphDummy.updateMatrix();
    central_title_strokes.setMatrixAt(i, glyphDummy.matrix);
  }
  central_title_strokes.instanceMatrix.needsUpdate = true;
  front_art.add(central_title_strokes);

  const central_title_crossbarGeom = new THREE.BoxGeometry(0.018, 0.005, 0.005);
  const central_title_crossbars = new THREE.InstancedMesh(
    central_title_crossbarGeom,
    darkInkMat,
    10
  );
  central_title_crossbars.name = "central_title_crossbars";
  for (let i = 0; i < 10; i++) {
    glyphDummy.position.set(-0.117 + i * 0.026, -0.063 - (i % 2) * 0.018, 0.03);
    glyphDummy.rotation.set(0, 0, i % 2 === 0 ? 0.1 : -0.1);
    glyphDummy.scale.set(1, 1, 1);
    gemDummy.updateMatrix();
    central_title_crossbars.setMatrixAt(i, glyphDummy.matrix);
  }
  central_title_crossbars.instanceMatrix.needsUpdate = true;
  front_art.add(central_title_crossbars);

  const medallionCenters = [
    [-0.275, 0.19],
    [0.275, 0.27],
    [-0.285, -0.31],
    [0.285, -0.35],
    [0, -0.405]
  ];
  const corner_medallionGeom = new THREE.CircleGeometry(0.052, 32);
  const corner_medallions = new THREE.InstancedMesh(
    corner_medallionGeom,
    ivoryMat,
    medallionCenters.length
  );
  corner_medallions.name = "corner_medallions";
  const medallionDummy = new THREE.Object3D();
  for (let i = 0; i < medallionCenters.length; i++) {
    medallionDummy.position.set(medallionCenters[i][0], medallionCenters[i][1], 0.022);
    medallionDummy.rotation.set(0, 0, 0);
    medallionDummy.scale.set(1, 1, 1);
    medallionDummy.updateMatrix();
    corner_medallions.setMatrixAt(i, medallionDummy.matrix);
  }
  corner_medallions.instanceMatrix.needsUpdate = true;
  front_art.add(corner_medallions);

  const corner_medallion_ringGeom = new THREE.TorusGeometry(0.058, 0.006, 8, 32);
  const corner_medallion_rings = new THREE.InstancedMesh(
    corner_medallion_ringGeom,
    goldMat,
    medallionCenters.length
  );
  corner_medallion_rings.name = "corner_medallion_rings";
  for (let i = 0; i < medallionCenters.length; i++) {
    medallionDummy.position.set(medallionCenters[i][0], medallionCenters[i][1], 0.025);
    medallionDummy.rotation.set(0, 0, 0);
    medallionDummy.scale.set(1, 1, 1);
    medallionDummy.updateMatrix();
    corner_medallion_rings.setMatrixAt(i, medallionDummy.matrix);
  }
  corner_medallion_rings.instanceMatrix.needsUpdate = true;
  front_art.add(corner_medallion_rings);

  const petalGeom = new THREE.CircleGeometry(1, 16);
  const corner_flower_petals = new THREE.InstancedMesh(petalGeom, pinkMat, 20);
  corner_flower_petals.name = "corner_flower_petals";
  const petalDummy = new THREE.Object3D();
  let petalIndex = 0;
  for (let c = 0; c < medallionCenters.length; c++) {
    for (let i = 0; i < 4; i++) {
      const a = i / 4 * Math.PI * 2;
      petalDummy.position.set(
        medallionCenters[c][0] + Math.cos(a) * 0.021,
        medallionCenters[c][1] + Math.sin(a) * 0.021,
        0.028
      );
      petalDummy.rotation.set(0, 0, a);
      petalDummy.scale.set(0.014, 0.008, 1);
      petalDummy.updateMatrix();
      corner_flower_petals.setMatrixAt(petalIndex++, petalDummy.matrix);
    }
  }
  corner_flower_petals.instanceMatrix.needsUpdate = true;
  front_art.add(corner_flower_petals);

  const corner_flower_centerGeom = new THREE.CircleGeometry(0.011, 14);
  const corner_flower_centers = new THREE.InstancedMesh(
    corner_flower_centerGeom,
    gemGreenMat,
    medallionCenters.length
  );
  corner_flower_centers.name = "corner_flower_centers";
  for (let i = 0; i < medallionCenters.length; i++) {
    medallionDummy.position.set(medallionCenters[i][0], medallionCenters[i][1], 0.03);
    medallionDummy.rotation.set(0, 0, 0);
    medallionDummy.scale.set(1, 1, 1);
    medallionDummy.updateMatrix();
    corner_flower_centers.setMatrixAt(i, medallionDummy.matrix);
  }
  corner_flower_centers.instanceMatrix.needsUpdate = true;
  front_art.add(corner_flower_centers);

  const corner_figures = new THREE.Group();
  corner_figures.name = "corner_figures";
  front_art.add(corner_figures);

  const corner_figure_headGeom = new THREE.CircleGeometry(0.012, 16);
  const corner_figure_heads = new THREE.InstancedMesh(
    corner_figure_headGeom,
    skinMat,
    medallionCenters.length
  );
  corner_figure_heads.name = "corner_figure_heads";
  for (let i = 0; i < medallionCenters.length; i++) {
    medallionDummy.position.set(
      medallionCenters[i][0],
      medallionCenters[i][1] + 0.017,
      0.032
    );
    medallionDummy.rotation.set(0, 0, 0);
    medallionDummy.scale.set(1, 1, 1);
    medallionDummy.updateMatrix();
    corner_figure_heads.setMatrixAt(i, medallionDummy.matrix);
  }
  corner_figure_heads.instanceMatrix.needsUpdate = true;
  corner_figures.add(corner_figure_heads);

  const corner_figure_bodyGeom = new THREE.BoxGeometry(0.027, 0.035, 0.004);
  const corner_figure_bodies = new THREE.InstancedMesh(
    corner_figure_bodyGeom,
    redMat,
    medallionCenters.length
  );
  corner_figure_bodies.name = "corner_figure_bodies";
  for (let i = 0; i < medallionCenters.length; i++) {
    medallionDummy.position.set(
      medallionCenters[i][0],
      medallionCenters[i][1] - 0.012,
      0.031
    );
    medallionDummy.rotation.set(0, 0, i % 2 === 0 ? -0.12 : 0.12);
    medallionDummy.scale.set(1, 1, 1);
    medallionDummy.updateMatrix();
    corner_figure_bodies.setMatrixAt(i, medallionDummy.matrix);
  }
  corner_figure_bodies.instanceMatrix.needsUpdate = true;
  corner_figures.add(corner_figure_bodies);

  const illustration_scene = new THREE.Group();
  illustration_scene.name = "illustration_scene";
  front_art.add(illustration_scene);

  const scene_arch = addSurfaceTube(
    illustration_scene,
    [
      new THREE.Vector3(-0.235, 0.17, 0.027),
      new THREE.Vector3(-0.12, 0.285, 0.027),
      new THREE.Vector3(0, 0.33, 0.027),
      new THREE.Vector3(0.12, 0.285, 0.027),
      new THREE.Vector3(0.235, 0.17, 0.027)
    ],
    0.007,
    goldMat,
    28
  );
  scene_arch.name = "scene_arch";

  const scene_column_left = addFlatStroke(
    illustration_scene, -0.205, 0.12, -0.17, 0.265, 0.014, 0.006, goldMat, 0.027
  );
  scene_column_left.name = "scene_column_left";
  const scene_column_right = addFlatStroke(
    illustration_scene, 0.205, 0.12, 0.17, 0.265, 0.014, 0.006, goldMat, 0.027
  );
  scene_column_right.name = "scene_column_right";

  const scene_stepGeom = new THREE.BoxGeometry(0.18, 0.025, 0.006);
  const scene_step_top = new THREE.Mesh(scene_stepGeom, greenMat);
  scene_step_top.name = "scene_step_top";
  scene_step_top.position.set(0, 0.19, 0.029);
  illustration_scene.add(scene_step_top);

  const scene_step_middle = new THREE.Mesh(scene_stepGeom, paleGreenMat);
  scene_step_middle.name = "scene_step_middle";
  scene_step_middle.position.set(0, 0.16, 0.029);
  illustration_scene.add(scene_step_middle);

  const scene_step_bottom = new THREE.Mesh(scene_stepGeom, redMat);
  scene_step_bottom.name = "scene_step_bottom";
  scene_step_bottom.position.set(0, 0.13, 0.029);
  illustration_scene.add(scene_step_bottom);

  const flatDiscGeom = new THREE.CircleGeometry(1, 18);
  const flatRodGeom = new THREE.BoxGeometry(1, 1, 0.004);

  function addDiscParent(parent, x, y, z, sx, sy, mat) {
    const disc = new THREE.Mesh(flatDiscGeom, mat);
    disc.position.set(x, y, z);
    disc.scale.set(sx, sy, 1);
    parent.add(disc);
    return disc;
  }

  function addRodParent(parent, x1, y1, x2, y2, width, mat, z) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const rod = new THREE.Mesh(flatRodGeom, mat);
    rod.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    rod.rotation.z = Math.atan2(dy, dx);
    rod.scale.set(length, width, 1);
    parent.add(rod);
    return rod;
  }

  function addSeatedFigure(parent, x, y, scale, robeMat, accentMat, direction) {
    const robeShape = new THREE.Shape();
    robeShape.moveTo(x - 0.064 * scale, y - 0.035 * scale);
    robeShape.lineTo(x + 0.064 * scale, y - 0.035 * scale);
    robeShape.lineTo(x + 0.025 * scale, y + 0.055 * scale);
    robeShape.lineTo(x - 0.027 * scale, y + 0.055 * scale);
    robeShape.closePath();
    const robe = new THREE.Mesh(new THREE.ShapeGeometry(robeShape), robeMat);
    robe.position.z = 0.031;
    parent.add(robe);

    addRodParent(
      parent,
      x - 0.018 * scale,
      y + 0.04 * scale,
      x - 0.07 * scale,
      y + 0.005 * scale,
      0.014 * scale,
      robeMat,
      0.033
    );
    addRodParent(
      parent,
      x + 0.018 * scale,
      y + 0.04 * scale,
      x + 0.075 * scale,
      y + 0.075 * scale,
      0.014 * scale,
      robeMat,
      0.033
    );
    addDiscParent(
      parent,
      x,
      y + 0.077 * scale,
      0.034,
      0.022 * scale,
      0.025 * scale,
      skinMat
    );
    addDiscParent(
      parent,
      x - direction * 0.003 * scale,
      y + 0.098 * scale,
      0.035,
      0.026 * scale,
      0.018 * scale,
      accentMat
    );
    addRodParent(
      parent,
      x - 0.025 * scale,
      y - 0.01 * scale,
      x + 0.03 * scale,
      y - 0.01 * scale,
      0.008 * scale,
      accentMat,
      0.035
    );
  }

  function addStandingFigure(parent, x, y, scale, robeMat, accentMat, direction) {
    const robeShape = new THREE.Shape();
    robeShape.moveTo(x - 0.026 * scale);
    robeShape.lineTo(x - 0.055 * scale);
    robeShape.lineTo(x + 0.055 * scale);
    robeShape.lineTo(x + 0.026 * scale);
    robeShape.closePath();
    const robe = new THREE.Mesh(new THREE.ShapeGeometry(robeShape), robeMat);
    robe.position.set(0, 0, 0.032);
    robe.scale.set(scale, scale, 1);
    robe.position.set(x, y, 0.032);
    parent.add(robe);

    addRodParent(
      parent,
      x - 0.016 * scale,
      y + 0.02 * scale,
      x + direction * 0.045 * scale,
      y + 0.055 * scale,
      0.013 * scale,
      robeMat,
      0.034
    );
    addDiscParent(
      parent,
      x,
      y + 0.052 * scale,
      0.035,
      0.021 * scale,
      0.024 * scale,
      skinMat
    );
    addDiscParent(
      parent,
      x + direction * 0.003 * scale,
      y + 0.073 * scale,
      0.036,
      0.025 * scale,
      0.018 * scale,
      accentMat
    );
    addRodParent(
      parent,
      x - 0.018 * scale,
      y,
      x - 0.025 * scale,
      y - 0.07 * scale,
      0.011 * scale,
      accentMat,
      0.034
    );
    addRodParent(
      parent,
      x + 0.018 * scale,
      y,
      x + 0.03 * scale,
      y - 0.07 * scale,
      0.011 * scale,
      accentMat,
      0.034
    );
  }

  const upper_left_figure = new THREE.Group();
  upper_left_figure.name = "upper_left_figure";
  addStandingFigure(upper_left_figure, -0.145, 0.13, 0.88, redMat, greenMat, 1);
  illustration_scene.add(upper_left_figure);

  const upper_center_figure = new THREE.Group();
  upper_center_figure.name = "upper_center_figure";
  addStandingFigure(upper_center_figure, 0, 0.135, 0.82, pinkMat, goldMat, -1);
  illustration_scene.add(upper_center_figure);

  const upper_right_figure = new THREE.Group();
  upper_right_figure.name = "upper_right_figure";
  addStandingFigure(upper_right_figure, 0.145, 0.13, 0.88, brownMat, redMat, -1);
  illustration_scene.add(upper_right_figure);

  const lower_left_figure = new THREE.Group();
  lower_left_figure.name = "lower_left_figure";
  addSeatedFigure(lower_left_figure, -0.17, -0.285, 1.05, turquoiseMat, greenMat, 1);
  illustration_scene.add(lower_left_figure);

  const lower_center_figure = new THREE.Group();
  lower_center_figure.name = "lower_center_figure";
  addSeatedFigure(lower_center_figure, 0, -0.295, 1.08, redMat, pinkMat, -1);
  illustration_scene.add(lower_center_figure);

  const lower_right_figure = new THREE.Group();
  lower_right_figure.name = "lower_right_figure";
  addSeatedFigure(lower_right_figure, 0.17, -0.285, 1.05, blueMat, greenMat, 1);
  illustration_scene.add(lower_right_figure);

  const lower_cloth_green = addEllipse(
    illustration_scene,
    flatDiscGeom,
    greenMat,
    0.18,
    -0.345,
    0.036,
    0.09,
    0.045,
    -0.25
  );
  lower_cloth_green.name = "lower_cloth_green";

  const lower_cloth_blue = addEllipse(
    illustration_scene,
    flatDiscGeom,
    blueMat,
    0.08,
    -0.35,
    0.037,
    0.09,
    0.045,
    0.3
  );
  lower_cloth_blue.name = "lower_cloth_blue";

  const clock_group = new THREE.Group();
  clock_group.name = "clock_group";
  clock_group.position.set(-0.245, -0.12, 0);
  illustration_scene.add(clock_group);

  const clock_faceGeom = new THREE.CircleGeometry(0.043, 28);
  const clock_face = new THREE.Mesh(clock_faceGeom, ivoryMat);
  clock_face.name = "clock_face";
  clock_face.position.z = 0.034;
  clock_group.add(clock_face);

  const clock_rimGeom = new THREE.TorusGeometry(0.048, 0.006, 8, 32);
  const clock_rim = new THREE.Mesh(clock_rimGeom, goldMat);
  clock_rim.name = "clock_rim";
  clock_rim.position.z = 0.037;
  clock_group.add(clock_rim);

  const clock_hour_hand = addFlatStroke(
    clock_group, 0, 0, -0.014, 0.016, 0.005, 0.004, darkInkMat, 0.04
  );
  clock_hour_hand.name = "clock_hour_hand";
  const clock_minute_hand = addFlatStroke(
    clock_group, 0, 0, 0.006, -0.026, 0.004, 0.004, darkInkMat, 0.04
  );
  clock_minute_hand.name = "clock_minute_hand";
  const clock_pedestal = addFlatStroke(
    clock_group, 0, -0.048, 0, -0.09, 0.014, 0.005, goldMat, 0.034
  );
  clock_pedestal.name = "clock_pedestal";

  const staff = addFlatStroke(
    illustration_scene, 0.075, -0.25, 0.055, -0.08, 0.007, 0.004, brownMat, 0.037
  );
  staff.name = "staff";

  const staff_orbGeom = new THREE.CircleGeometry(0.014, 16);
  const staff_orb = new THREE.Mesh(staff_orbGeom, gemBlueMat);
  staff_orb.name = "staff_orb";
  staff_orb.position.set(0.055, -0.066, 0.04);
  illustration_scene.add(staff_orb);

  const decorative_vines = new THREE.Group();
  decorative_vines.name = "decorative_vines";
  front_art.add(decorative_vines);

  const left_vine = addSurfaceTube(
    decorative_vines,
    [
      new THREE.Vector3(-0.31, -0.38, 0.025),
      new THREE.Vector3(-0.33, -0.27, 0.025),
      new THREE.Vector3(-0.30, -0.16, 0.025),
      new THREE.Vector3(-0.32, -0.04, 0.025)
    ],
    0.004,
    greenMat,
    20
  );
  left_vine.name = "left_vine";

  const right_vine = addSurfaceTube(
    decorative_vines,
    [
      new THREE.Vector3(0.31, -0.38, 0.025),
      new THREE.Vector3(0.33, -0.27, 0.025),
      new THREE.Vector3(0.30, -0.16, 0.025),
      new THREE.Vector3(0.32, -0.04, 0.025)
    ],
    0.004,
    greenMat,
    20
  );
  right_vine.name = "right_vine";

  const upper_left_vine = addSurfaceTube(
    decorative_vines,
    [
      new THREE.Vector3(-0.30, 0.05, 0.025),
      new THREE.Vector3(-0.33, 0.12, 0.025),
      new THREE.Vector3(-0.30, 0.21, 0.025),
      new THREE.Vector3(-0.32, 0.29, 0.025)
    ],
    0.004,
    greenMat,
    20
  );
  upper_left_vine.name = "upper_left_vine";

  const upper_right_vine = addSurfaceTube(
    decorative_vines,
    [
      new THREE.Vector3(0.30, 0.05, 0.025),
      new THREE.Vector3(0.33, 0.12, 0.025),
      new THREE.Vector3(0.30, 0.21, 0.025),
      new THREE.Vector3(0.32, 0.29, 0.025)
    ],
    0.004,
    greenMat,
    20
  );
  upper_right_vine.name = "upper_right_vine";

  const vineLeafData = [
    [-0.322, -0.34, -0.7],
    [-0.31, -0.25, 0.75],
    [-0.32, -0.17, -0.75],
    [-0.305, -0.08, 0.75],
    [0.322, -0.34, 0.7],
    [0.31, -0.25, -0.75],
    [0.32, -0.17, 0.75],
    [0.305, -0.08, -0.75],
    [-0.315, 0.09, -0.7],
    [-0.305, 0.17, 0.75],
    [-0.318, 0.24, -0.75],
    [0.315, 0.09, 0.7],
    [0.305, 0.17, -0.75],
    [0.318, 0.24, 0.75]
  ];
  const vine_leaves = new THREE.InstancedMesh(
    petalGeom,
    paleGreenMat,
    vineLeafData.length
  );
  vine_leaves.name = "vine_leaves";
  for (let i = 0; i < vineLeafData.length; i++) {
    petalDummy.position.set(vineLeafData[i][0], vineLeafData[i][1], 0.029);
    petalDummy.rotation.set(0, 0, vineLeafData[i][2]);
    petalDummy.scale.set(0.022, 0.009, 1);
    petalDummy.updateMatrix();
    vine_leaves.setMatrixAt(i, petalDummy.matrix);
  }
  vine_leaves.instanceMatrix.needsUpdate = true;
  decorative_vines.add(vine_leaves);

  const spine_title_panel = new THREE.Group();
  spine_title_panel.name = "spine_title_panel";
  addFlatRect(spine_title_panel, 0.008, 0.72, 0.052, darkGoldMat, -0.56, -0.05, 0, 0);
  addFlatRect(spine_title_panel, 0.006, 0.70, 0.043, leatherMat, -0.566, -0.05, 0, 0);
  book_group.add(spine_title_panel);

  const spine_letter_markGeom = new THREE.BoxGeometry(0.007, 0.052, 0.011);
  const spine_letter_marks = new THREE.InstancedMesh(
    spine_letter_markGeom,
    goldMat,
    10
  );
  spine_letter_marks.name = "spine_letter_marks";
  const spineMarkDummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    spineMarkDummy.position.set(-0.571, -0.32 + i * 0.068, 0);
    spineMarkDummy.rotation.set(i % 2 === 0 ? 0.18 : -0.18, 0, 0);
    spineMarkDummy.scale.set(1, i % 3 === 0 ? 0.72 : 1, 1);
    spineMarkDummy.updateMatrix();
    spine_letter_marks.setMatrixAt(i, spineMarkDummy.matrix);
  }
  spine_letter_marks.instanceMatrix.needsUpdate = true;
  book_group.add(spine_letter_marks);

  const spine_ornamentGeom = new THREE.BoxGeometry(0.007, 0.04, 0.012);
  const spine_ornaments = new THREE.InstancedMesh(spine_ornamentGeom, goldMat, 6);
  spine_ornaments.name = "spine_ornaments";
  const ornamentY = [-0.55, 0.48, 0.55];
  let ornamentIndex = 0;
  for (let i = 0; i < ornamentY.length; i++) {
    for (const z of [-0.018, 0.018]) {
      spineMarkDummy.position.set(-0.571, ornamentY[i], z);
      spineMarkDummy.rotation.set(0.75, 0, 0);
      spineMarkDummy.scale.set(1, 1, 1);
      spineMarkDummy.updateMatrix();
      spine_ornaments.setMatrixAt(ornamentIndex++, spineMarkDummy.matrix);
    }
  }
  spine_ornaments.instanceMatrix.needsUpdate = true;
  book_group.add(spine_ornaments);

  const attachment_holeGeom = new THREE.CircleGeometry(0.024, 24);
  const attachment_hole = new THREE.Mesh(attachment_holeGeom, darkInkMat);
  attachment_hole.name = "attachment_hole";
  attachment_hole.position.set(0, 0.695, 0.091);
  book_group.add(attachment_hole);

  const attachment_eyeletGeom = new THREE.TorusGeometry(0.033, 0.007, 8, 28);
  const attachment_eyelet = new THREE.Mesh(attachment_eyeletGeom, silverMat);
  attachment_eyelet.name = "attachment_eyelet";
  attachment_eyelet.position.set(0, 0.695, 0.096);
  book_group.add(attachment_eyelet);

  const chain_group = new THREE.Group();
  chain_group.name = "chain_group";
  root.add(chain_group);

  const jump_ringGeom = new THREE.TorusGeometry(0.052, 0.009, 8, 32);
  const jump_ring = new THREE.Mesh(jump_ringGeom, silverMat);
  jump_ring.name = "jump_ring";
  jump_ring.position.set(0, 0.755, 0.102);
  jump_ring.scale.set(0.72, 1.15, 1);
  jump_ring.rotation.y = 0.28;
  chain_group.add(jump_ring);

  const chain_linkGeom = new THREE.TorusGeometry(0.034, 0.007, 8, 24);
  const chain_links = new THREE.InstancedMesh(chain_linkGeom, silverMat, 18);
  chain_links.name = "chain_links";
  const chainDummy = new THREE.Object3D();
  let chainIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 9; i++) {
      chainDummy.position.set(
        side * 0.05,
        0.82 + i * 0.08,
        0.09 + (i % 2) * 0.006
      );
      chainDummy.rotation.set(
        0,
        i % 2 === 0 ? 0.18 : 0.95,
        i % 2 === 0 ? side * 0.08 : -side * 0.05
      );
      chainDummy.scale.set(0.72, 1.2, 1);
      chainDummy.updateMatrix();
      chain_links.setMatrixAt(chainIndex++, chainDummy.matrix);
    }
  }
  chain_links.instanceMatrix.needsUpdate = true;
  chain_group.add(chain_links);

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