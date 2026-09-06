export default function generate(THREE) {
  const root = new THREE.Group();
  const pouch = new THREE.Group();
  root.add(pouch);

  const pouchW = 1.08;
  const pouchH = 1.42;
  const pouchD = 0.038;

  const pouch_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd8c9a5,
    metalness: 0.0,
    roughness: 0.8,
  });
  const raised_filmMat = new THREE.MeshStandardMaterial({
    color: 0xddd0ae,
    metalness: 0.0,
    roughness: 0.8,
  });
  const sealMat = new THREE.MeshStandardMaterial({
    color: 0xcbbd99,
    metalness: 0.0,
    roughness: 0.8,
  });
  const seal_dotMat = new THREE.MeshStandardMaterial({
    color: 0xb9aa86,
    metalness: 0.0,
    roughness: 0.8,
  });
  const purple_printMat = new THREE.MeshStandardMaterial({
    color: 0x6330ad,
    metalness: 0.0,
    roughness: 0.7,
  });
  const dark_purpleMat = new THREE.MeshStandardMaterial({
    color: 0x4b218c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const white_printMat = new THREE.MeshStandardMaterial({
    color: 0xf4f0e8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const silver_printMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const spoon_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.38,
  });
  const gold_detailMat = new THREE.MeshStandardMaterial({
    color: 0xc8a85a,
    metalness: 0.0,
    roughness: 0.7,
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

  const pouch_bodyShape = new THREE.Shape();
  pouch_bodyShape.moveTo(-pouchW / 2 + 0.018, -pouchH / 2);
  pouch_bodyShape.lineTo(pouchW / 2 - 0.018, -pouchH / 2);
  pouch_bodyShape.lineTo(pouchW / 2, -pouchH / 2 + 0.018);
  pouch_bodyShape.lineTo(pouchW / 2, pouchH / 2 - 0.018);
  pouch_bodyShape.lineTo(pouchW / 2 - 0.018, pouchH / 2);
  pouch_bodyShape.lineTo(-pouchW / 2 + 0.018, pouchH / 2);
  pouch_bodyShape.lineTo(-pouchW / 2, pouchH / 2 - 0.018);
  pouch_bodyShape.lineTo(-pouchW / 2, -pouchH / 2 + 0.018);
  pouch_bodyShape.closePath();

  const pouch_bodyGeom = new THREE.ExtrudeGeometry(pouch_bodyShape, {
    depth: pouchD,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const pouch_body = new THREE.Mesh(pouch_bodyGeom, pouch_bodyMat);
  pouch_body.position.z = -pouchD / 2;
  pouch.add(pouch_body);

  const panel_bulgeGeom = new THREE.PlaneGeometry(1, 1, 20, 24);
  const panel_positions = panel_bulgeGeom.attributes.position;
  for (let i = 0; i < panel_positions.count; i++) {
    const x = panel_positions.getX(i);
    const y = panel_positions.getY(i);
    const nx = Math.abs(x) / 0.5;
    const ny = Math.abs(y) / 0.5;
    const fx = Math.max(0, 1 - Math.pow(nx, 4));
    const fy = Math.max(0, 1 - Math.pow(ny, 4));
    panel_positions.setZ(i, 0.019 * fx * fy);
  }
  panel_positions.needsUpdate = true;
  panel_bulgeGeom.computeVertexNormals();

  const central_pillow = new THREE.Mesh(panel_bulgeGeom, raised_filmMat);
  central_pillow.scale.set(0.91, 1.16, 1);
  central_pillow.position.set(0, -0.015, 0.029);
  pouch.add(central_pillow);

  const top_sealGeom = new THREE.BoxGeometry(1.0, 0.075, 0.018);
  const top_seal = new THREE.Mesh(top_sealGeom, sealMat);
  top_seal.position.set(0, 0.665, 0.03);
  pouch.add(top_seal);

  const bottom_sealGeom = new THREE.BoxGeometry(1.0, 0.075, 0.018);
  const bottom_seal = new THREE.Mesh(bottom_sealGeom, sealMat);
  bottom_seal.position.set(0, -0.665, 0.03);
  pouch.add(bottom_seal);

  const left_sealGeom = new THREE.BoxGeometry(0.065, 1.26, 0.018);
  const left_seal = new THREE.Mesh(left_sealGeom, sealMat);
  left_seal.position.set(-0.505, 0, 0.03);
  pouch.add(left_seal);

  const right_sealGeom = new THREE.BoxGeometry(0.065, 1.26, 0.018);
  const right_seal = new THREE.Mesh(right_sealGeom, sealMat);
  right_seal.position.set(0.505, 0, 0.03);
  pouch.add(right_seal);

  const seal_dot_positions = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 18; col++) {
      const x = -0.455 + col * (0.91 / 17);
      seal_dot_positions.push(new THREE.Vector3(x, 0.637 + row * 0.025, 0.041));
      seal_dot_positions.push(new THREE.Vector3(x, -0.637 - row * 0.025, 0.041));
    }
  }
  for (let row = 0; row < 19; row++) {
    const y = -0.56 + row * (1.12 / 18);
    seal_dot_positions.push(new THREE.Vector3(-0.519, y, 0.041));
    seal_dot_positions.push(new THREE.Vector3(0.519, y, 0.041));
  }

  const seal_dotsGeom = new THREE.CylinderGeometry(0.0042, 0.0042, 0.0025, 6);
  const seal_dots = new THREE.InstancedMesh(
    seal_dotsGeom,
    seal_dotMat,
    seal_dot_positions.length
  );
  const seal_dummy = new THREE.Object3D();
  for (let i = 0; i < seal_dot_positions.length; i++) {
    seal_dummy.position.copy(seal_dot_positions[i]);
    seal_dummy.rotation.set(Math.PI / 2, 0, 0);
    seal_dummy.updateMatrix();
    seal_dots.setMatrixAt(i, seal_dummy.matrix);
  }
  seal_dots.instanceMatrix.needsUpdate = true;
  pouch.add(seal_dots);

  const top_left_notchShape = new THREE.Shape();
  top_left_notchShape.moveTo(-0.54, 0.69);
  top_left_notchShape.lineTo(-0.475, 0.69);
  top_left_notchShape.lineTo(-0.49, 0.655);
  top_left_notchShape.lineTo(-0.525, 0.645);
  top_left_notchShape.closePath();
  const top_left_notchGeom = new THREE.ShapeGeometry(top_left_notchShape);
  const top_left_notch = new THREE.Mesh(top_left_notchGeom, pouch_bodyMat);
  top_left_notch.position.z = 0.042;
  pouch.add(top_left_notch);

  const foil_fold_lines = new THREE.Group();
  const foil_fold_specs = [
    [
      new THREE.Vector3(-0.43, 0.53, 0.052),
      new THREE.Vector3(-0.34, 0.47, 0.057),
      new THREE.Vector3(-0.27, 0.40, 0.058),
    ],
    [
      new THREE.Vector3(0.43, 0.53, 0.052),
      new THREE.Vector3(0.35, 0.47, 0.057),
      new THREE.Vector3(0.29, 0.39, 0.058),
    ],
    [
      new THREE.Vector3(-0.43, -0.53, 0.052),
      new THREE.Vector3(-0.35, -0.47, 0.057),
      new THREE.Vector3(-0.28, -0.41, 0.058),
    ],
    [
      new THREE.Vector3(0.43, -0.53, 0.052),
      new THREE.Vector3(0.35, -0.47, 0.057),
      new THREE.Vector3(0.28, -0.41, 0.058),
    ],
  ];
  for (let i = 0; i < foil_fold_specs.length; i++) {
    const foil_foldGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(foil_fold_specs[i]),
      10,
      0.0022,
      6,
      false
    );
    const foil_fold = new THREE.Mesh(foil_foldGeom, seal_dotMat);
    foil_fold_lines.add(foil_fold);
  }
  pouch.add(foil_fold_lines);

  const purple_spoon_printShape = new THREE.Shape();
  purple_spoon_printShape.moveTo(-0.055, 0.12);
  purple_spoon_printShape.bezierCurveTo(0.02, 0.18, 0.12, 0.18, 0.19, 0.16);
  purple_spoon_printShape.bezierCurveTo(0.31, 0.14, 0.43, 0.06, 0.43, -0.04);
  purple_spoon_printShape.bezierCurveTo(0.43, -0.15, 0.32, -0.22, 0.19, -0.22);
  purple_spoon_printShape.bezierCurveTo(0.11, -0.22, 0.045, -0.18, -0.005, -0.13);
  purple_spoon_printShape.lineTo(-0.065, -0.09);
  purple_spoon_printShape.bezierCurveTo(-0.035, -0.01, -0.03, 0.06, -0.055, 0.12);
  purple_spoon_printShape.closePath();

  const purple_spoon_printGeom = new THREE.ShapeGeometry(purple_spoon_printShape, 24);
  const purple_spoon_outline = new THREE.Mesh(purple_spoon_printGeom, silver_printMat);
  purple_spoon_outline.scale.set(1.035, 1.035, 1);
  purple_spoon_outline.position.set(0.018, 0.07, 0.057);
  pouch.add(purple_spoon_outline);

  const purple_spoon_print = new THREE.Mesh(purple_spoon_printGeom, purple_printMat);
  purple_spoon_print.position.set(0.018, 0.07, 0.059);
  pouch.add(purple_spoon_print);

  const purple_spoon_highlightGeom = new THREE.CircleGeometry(0.06, 24);
  const purple_spoon_highlight = new THREE.Mesh(
    purple_spoon_highlightGeom,
    white_printMat
  );
  purple_spoon_highlight.scale.set(1.5, 0.34, 1);
  purple_spoon_highlight.rotation.z = -0.25;
  purple_spoon_highlight.position.set(0.30, 0.035, 0.061);
  pouch.add(purple_spoon_highlight);

  const purple_spoon_shadowGeom = new THREE.CircleGeometry(0.055, 24);
  const purple_spoon_shadow = new THREE.Mesh(purple_spoon_shadowGeom, dark_purpleMat);
  purple_spoon_shadow.scale.set(1.45, 0.32, 1);
  purple_spoon_shadow.rotation.z = 0.2;
  purple_spoon_shadow.position.set(0.16, -0.09, 0.061);
  pouch.add(purple_spoon_shadow);

  const purple_bannerShape = roundedRectShape(0.78, 0.235, 0.025);
  const purple_bannerGeom = new THREE.ShapeGeometry(purple_bannerShape, 16);
  const purple_banner = new THREE.Mesh(purple_bannerGeom, purple_printMat);
  purple_banner.position.set(-0.03, -0.405, 0.061);
  pouch.add(purple_banner);

  const glyphs = {
    A: ["010", "101", "111", "101", "101"],
    C: ["111", "100", "100", "100", "111"],
    E: ["111", "100", "110", "100", "111"],
    F: ["111", "100", "110", "100", "100"],
    I: ["111", "010", "010", "010", "111"],
    K: ["101", "101", "110", "101", "101"],
    L: ["100", "100", "100", "100", "111"],
    N: ["101", "111", "111", "111", "101"],
    O: ["111", "101", "101", "101", "111"],
    P: ["110", "101", "110", "100", "100"],
    R: ["110", "101", "110", "101", "101"],
    S: ["111", "100", "111", "001", "111"],
    T: ["111", "010", "010", "010", "010"],
    U: ["101", "101", "101", "101", "111"],
    V: ["101", "101", "101", "101", "010"],
  };

  const text_pixels = [];

  function queueText(text, centerX, centerY, cell, z) {
    const totalCols = text.length * 4 - 1;
    const startX = centerX - totalCols * cell / 2;
    const topY = centerY + 2 * cell;
    for (let ci = 0; ci < text.length; ci++) {
      const pattern = glyphs[text[ci]];
      if (!pattern) continue;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (pattern[row][col] === "1") {
            text_pixels.push({
              x: startX + (ci * 4 + col) * cell,
              y: topY - row * cell,
              z,
              size: cell * 0.82,
            });
          }
        }
      }
    }
  }

  queueText("NUTRI", -0.035, -0.35, 0.0105, 0.064);
  queueText("KOLALO", -0.055, -0.455, 0.0145, 0.064);
  queueText("PURE", -0.19, 0.35, 0.009, 0.056);
  queueText("POWDER", -0.19, 0.255, 0.0062, 0.056);

  const package_textGeom = new THREE.BoxGeometry(1, 1, 0.0025);
  const package_text = new THREE.InstancedMesh(
    package_textGeom,
    white_printMat,
    text_pixels.length
  );
  const text_dummy = new THREE.Object3D();
  for (let i = 0; i < text_pixels.length; i++) {
    const pixel = text_pixels[i];
    text_dummy.position.set(pixel.x, pixel.y, pixel.z);
    text_dummy.rotation.set(0, 0, 0);
    text_dummy.scale.set(pixel.size, pixel.size, 1);
    text_dummy.updateMatrix();
    package_text.setMatrixAt(i, text_dummy.matrix);
  }
  package_text.instanceMatrix.needsUpdate = true;
  pouch.add(package_text);

  const purple_heading_pixels = [];

  function queuePurpleText(text, centerX, centerY, cell) {
    const totalCols = text.length * 4 - 1;
    const startX = centerX - totalCols * cell / 2;
    const topY = centerY + 2 * cell;
    for (let ci = 0; ci < text.length; ci++) {
      const pattern = glyphs[text[ci]];
      if (!pattern) continue;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (pattern[row][col] === "1") {
            purple_heading_pixels.push({
              x: startX + (ci * 4 + col) * cell,
              y: topY - row * cell,
              size: cell * 0.82,
            });
          }
        }
      }
    }
  }

  queuePurpleText("NUTRITION", -0.19, 0.43, 0.0074);

  const purple_headingGeom = new THREE.BoxGeometry(1, 1, 0.0025);
  const purple_heading = new THREE.InstancedMesh(
    purple_headingGeom,
    purple_printMat,
    purple_heading_pixels.length
  );
  for (let i = 0; i < purple_heading_pixels.length; i++) {
    const pixel = purple_heading_pixels[i];
    text_dummy.position.set(pixel.x, pixel.y, 0.056);
    text_dummy.rotation.set(0, 0, 0);
    text_dummy.scale.set(pixel.size, pixel.size, 1);
    text_dummy.updateMatrix();
    purple_heading.setMatrixAt(i, text_dummy.matrix);
  }
  purple_heading.instanceMatrix.needsUpdate = true;
  pouch.add(purple_heading);

  const certification_mark = new THREE.Group();
  certification_mark.position.set(-0.31, 0.13, 0.058);

  const certification_ringGeom = new THREE.RingGeometry(0.023, 0.029, 24);
  const certification_ring = new THREE.Mesh(
    certification_ringGeom,
    purple_printMat
  );
  certification_mark.add(certification_ring);

  const certification_check_aGeom = new THREE.BoxGeometry(0.006, 0.025, 0.002);
  const certification_check_a = new THREE.Mesh(
    certification_check_aGeom,
    purple_printMat
  );
  certification_check_a.rotation.z = -0.68;
  certification_check_a.position.set(-0.006, -0.004, 0.002);
  certification_mark.add(certification_check_a);

  const certification_check_bGeom = new THREE.BoxGeometry(0.006, 0.038, 0.002);
  const certification_check_b = new THREE.Mesh(
    certification_check_bGeom,
    purple_printMat
  );
  certification_check_b.rotation.z = 0.58;
  certification_check_b.position.set(0.009, 0.004, 0.002);
  certification_mark.add(certification_check_b);
  pouch.add(certification_mark);

  const barcode_labelShape = roundedRectShape(0.205, 0.075, 0.008);
  const barcode_labelGeom = new THREE.ShapeGeometry(barcode_labelShape, 8);
  const barcode_label = new THREE.Mesh(barcode_labelGeom, white_printMat);
  barcode_label.position.set(0.205, -0.475, 0.064);
  pouch.add(barcode_label);

  const barcode_widths = [
    0.004, 0.008, 0.003, 0.006, 0.004, 0.009, 0.003, 0.006, 0.008, 0.003,
  ];
  const barcode_heights = [
    1.0, 0.82, 0.94, 0.86, 1.0, 0.9, 0.96, 0.84, 1.0, 0.9,
  ];
  const barcode_barsGeom = new THREE.BoxGeometry(1, 1, 0.002);
  const barcode_bars = new THREE.InstancedMesh(
    barcode_barsGeom,
    dark_purpleMat,
    barcode_widths.length
  );
  const barcode_dummy = new THREE.Object3D();
  for (let i = 0; i < barcode_widths.length; i++) {
    barcode_dummy.position.set(0.137 + i * 0.014, -0.475, 0.066);
    barcode_dummy.rotation.set(0, 0, 0);
    barcode_dummy.scale.set(
      barcode_widths[i],
      barcode_heights[i] * 0.052,
      1
    );
    barcode_dummy.updateMatrix();
    barcode_bars.setMatrixAt(i, barcode_dummy.matrix);
  }
  barcode_bars.instanceMatrix.needsUpdate = true;
  pouch.add(barcode_bars);

  const spoon = new THREE.Group();
  spoon.position.set(-0.015, 0.10, 0.073);
  spoon.rotation.z = -0.16;
  pouch.add(spoon);

  const spoon_handleShape = new THREE.Shape();
  spoon_handleShape.moveTo(-0.038, 0.025);
  spoon_handleShape.bezierCurveTo(-0.04, -0.05, -0.065, -0.15, -0.085, -0.23);
  spoon_handleShape.bezierCurveTo(-0.105, -0.31, -0.09, -0.37, -0.045, -0.39);
  spoon_handleShape.bezierCurveTo(-0.015, -0.405, 0.015, -0.405, 0.045, -0.39);
  spoon_handleShape.bezierCurveTo(0.09, -0.37, 0.105, -0.31, 0.085, -0.23);
  spoon_handleShape.bezierCurveTo(0.065, -0.15, 0.04, -0.05, 0.038, 0.025);
  spoon_handleShape.closePath();

  const spoon_handleGeom = new THREE.ExtrudeGeometry(spoon_handleShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.003,
    bevelSegments: 2,
  });
  const spoon_handle = new THREE.Mesh(spoon_handleGeom, polished_metalMat);
  spoon.add(spoon_handle);

  const spoon_handle_insetShape = new THREE.Shape();
  spoon_handle_insetShape.moveTo(-0.018, -0.025);
  spoon_handle_insetShape.bezierCurveTo(-0.025, -0.10, -0.05, -0.19, -0.055, -0.26);
  spoon_handle_insetShape.bezierCurveTo(-0.058, -0.31, -0.035, -0.335, 0, -0.34);
  spoon_handle_insetShape.bezierCurveTo(0.035, -0.335, 0.058, -0.31, 0.055, -0.26);
  spoon_handle_insetShape.bezierCurveTo(0.05, -0.19, 0.025, -0.10, 0.018, -0.025);
  spoon_handle_insetShape.closePath();

  const spoon_handle_insetGeom = new THREE.ShapeGeometry(
    spoon_handle_insetShape,
    16
  );
  const spoon_handle_inset = new THREE.Mesh(
    spoon_handle_insetGeom,
    brushed_metalMat
  );
  spoon_handle_inset.position.z = 0.016;
  spoon.add(spoon_handle_inset);

  const spoon_handle_highlightGeom = new THREE.BoxGeometry(0.012, 0.23, 0.002);
  const spoon_handle_highlight = new THREE.Mesh(
    spoon_handle_highlightGeom,
    polished_metalMat
  );
  spoon_handle_highlight.position.set(-0.018, -0.18, 0.018);
  spoon_handle_highlight.rotation.z = -0.04;
  spoon.add(spoon_handle_highlight);

  const spoon_hanging_holeGeom = new THREE.CircleGeometry(0.022, 24);
  const spoon_hanging_hole = new THREE.Mesh(
    spoon_hanging_holeGeom,
    gold_detailMat
  );
  spoon_hanging_hole.scale.set(1.15, 0.78, 1);
  spoon_hanging_hole.position.set(0, -0.354, 0.019);
  spoon.add(spoon_hanging_hole);

  const spoon_hanging_hole_rimGeom = new THREE.RingGeometry(0.022, 0.029, 24);
  const spoon_hanging_hole_rim = new THREE.Mesh(
    spoon_hanging_hole_rimGeom,
    polished_metalMat
  );
  spoon_hanging_hole_rim.scale.set(1.15, 0.78, 1);
  spoon_hanging_hole_rim.position.set(0, -0.354, 0.021);
  spoon.add(spoon_hanging_hole_rim);

  const spoon_bowlGeom = new THREE.SphereGeometry(0.15, 32, 18);
  const spoon_bowl = new THREE.Mesh(spoon_bowlGeom, polished_metalMat);
  spoon_bowl.scale.set(0.82, 1.15, 0.17);
  spoon_bowl.position.set(0, 0.14, 0.002);
  spoon.add(spoon_bowl);

  const spoon_bowl_insetGeom = new THREE.CircleGeometry(0.13, 32);
  const spoon_bowl_inset = new THREE.Mesh(
    spoon_bowl_insetGeom,
    brushed_metalMat
  );
  spoon_bowl_inset.scale.set(0.82, 1.15, 1);
  spoon_bowl_inset.position.set(0, 0.14, 0.028);
  spoon.add(spoon_bowl_inset);

  const spoon_bowl_rimGeom = new THREE.TorusGeometry(0.13, 0.009, 10, 32);
  const spoon_bowl_rim = new THREE.Mesh(
    spoon_bowl_rimGeom,
    polished_metalMat
  );
  spoon_bowl_rim.scale.set(0.82, 1.15, 1);
  spoon_bowl_rim.position.set(0, 0.14, 0.031);
  spoon.add(spoon_bowl_rim);

  const spoon_bowl_highlightGeom = new THREE.CircleGeometry(0.045, 20);
  const spoon_bowl_highlight = new THREE.Mesh(
    spoon_bowl_highlightGeom,
    spoon_highlightMat
  );
  spoon_bowl_highlight.scale.set(0.55, 1.35, 1);
  spoon_bowl_highlight.rotation.z = -0.45;
  spoon_bowl_highlight.position.set(-0.052, 0.19, 0.033);
  spoon.add(spoon_bowl_highlight);

  const spoon_logo_pixels = [];

  function queueSpoonLogo(text, centerX, centerY, cell) {
    const totalCols = text.length * 4 - 1;
    const startX = centerX - totalCols * cell / 2;
    const topY = centerY + 2 * cell;
    for (let ci = 0; ci < text.length; ci++) {
      const pattern = glyphs[text[ci]];
      if (!pattern) continue;
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 3; col++) {
          if (pattern[row][col] === "1") {
            spoon_logo_pixels.push({
              x: startX + (ci * 4 + col) * cell,
              y: topY - row * cell,
              size: cell * 0.82,
            });
          }
        }
      }
    }
  }

  queueSpoonLogo("PURE", 0, 0.14, 0.0072);

  const spoon_logoGeom = new THREE.BoxGeometry(1, 1, 0.002);
  const spoon_logo = new THREE.InstancedMesh(
    spoon_logoGeom,
    purple_printMat,
    spoon_logo_pixels.length
  );
  const spoon_logo_dummy = new THREE.Object3D();
  for (let i = 0; i < spoon_logo_pixels.length; i++) {
    const pixel = spoon_logo_pixels[i];
    spoon_logo_dummy.position.set(pixel.x, pixel.y, 0.035);
    spoon_logo_dummy.rotation.set(0, 0, 0);
    spoon_logo_dummy.scale.set(pixel.size, pixel.size, 1);
    spoon_logo_dummy.updateMatrix();
    spoon_logo.setMatrixAt(i, spoon_logo_dummy.matrix);
  }
  spoon_logo.instanceMatrix.needsUpdate = true;
  spoon.add(spoon_logo);

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

  fitToUnitCube(THREE, root);
  return root;
}