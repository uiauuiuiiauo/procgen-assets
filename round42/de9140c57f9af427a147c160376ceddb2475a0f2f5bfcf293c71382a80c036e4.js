export default function generate(THREE) {
  const root = new THREE.Group();
  const box_shell = new THREE.Group();
  const front_assembly = new THREE.Group();
  const top_print = new THREE.Group();
  root.add(box_shell, front_assembly, top_print);

  const boxW = 1.16;
  const boxD = 1.72;
  const boxH = 0.34;
  const wallT = 0.055;
  const lidT = 0.055;
  const baseH = 0.16;
  const baseD = boxD - 0.04;

  const cardboardMat = new THREE.MeshStandardMaterial({
    color: 0x22252b,
    metalness: 0.0,
    roughness: 0.9
  });
  const topMat = new THREE.MeshStandardMaterial({
    color: 0x1c1f24,
    metalness: 0.0,
    roughness: 0.9
  });
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x111318,
    metalness: 0.0,
    roughness: 0.9
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x3b3935,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd2ad58,
    metalness: 0.6,
    roughness: 0.2
  });

  const bottom_panelGeom = new THREE.BoxGeometry(boxW, 0.045, baseD);
  const bottom_panel = new THREE.Mesh(bottom_panelGeom, cardboardMat);
  bottom_panel.position.set(0, 0.0225, 0.01);
  box_shell.add(bottom_panel);

  const inner_bodyGeom = new THREE.BoxGeometry(
    boxW - wallT * 2,
    0.22,
    boxD - 0.10
  );
  const inner_body = new THREE.Mesh(inner_bodyGeom, innerMat);
  inner_body.position.set(0, 0.16, -0.01);
  box_shell.add(inner_body);

  const side_wallGeom = new THREE.BoxGeometry(wallT, boxH, boxD);
  const left_wall = new THREE.Mesh(side_wallGeom, cardboardMat);
  left_wall.position.set(-boxW / 2 + wallT / 2, boxH / 2, 0);
  box_shell.add(left_wall);

  const right_wall = new THREE.Mesh(side_wallGeom, cardboardMat);
  right_wall.position.set(boxW / 2 - wallT / 2, boxH / 2, 0);
  box_shell.add(right_wall);

  const rear_wallGeom = new THREE.BoxGeometry(
    boxW - wallT * 2,
    boxH,
    wallT
  );
  const rear_wall = new THREE.Mesh(rear_wallGeom, cardboardMat);
  rear_wall.position.set(0, boxH / 2, -boxD / 2 + wallT / 2);
  box_shell.add(rear_wall);

  const front_upper_panelGeom = new THREE.BoxGeometry(
    boxW - wallT * 2,
    0.17,
    wallT
  );
  const front_upper_panel = new THREE.Mesh(
    front_upper_panelGeom,
    cardboardMat
  );
  front_upper_panel.position.set(
    0,
    0.245,
    boxD / 2 - wallT / 2
  );
  box_shell.add(front_upper_panel);

  const front_base_panelGeom = new THREE.BoxGeometry(
    boxW - 0.04,
    baseH,
    0.04
  );
  const front_base_panel = new THREE.Mesh(
    front_base_panelGeom,
    cardboardMat
  );
  front_base_panel.position.set(0, 0.10, boxD / 2 + 0.01);
  front_assembly.add(front_base_panel);

  const front_cornerGeom = new THREE.BoxGeometry(0.035, baseH, 0.05);
  const front_left_corner = new THREE.Mesh(front_cornerGeom, edgeMat);
  front_left_corner.position.set(
    -boxW / 2 + 0.0175,
    0.10,
    boxD / 2 + 0.01
  );
  front_assembly.add(front_left_corner);

  const front_right_corner = new THREE.Mesh(front_cornerGeom, edgeMat);
  front_right_corner.position.set(
    boxW / 2 - 0.0175,
    0.10,
    boxD / 2 + 0.01
  );
  front_assembly.add(front_right_corner);

  const front_seamGeom = new THREE.BoxGeometry(
    boxW - wallT * 2,
    0.012,
    0.008
  );
  const front_seam = new THREE.Mesh(front_seamGeom, innerMat);
  front_seam.position.set(0, 0.184, boxD / 2 + 0.034);
  front_assembly.add(front_seam);

  const top_lidGeom = new THREE.BoxGeometry(
    boxW + 0.02,
    lidT,
    boxD + 0.02
  );
  const top_lid = new THREE.Mesh(top_lidGeom, topMat);
  top_lid.position.set(0, boxH + lidT / 2, 0);
  box_shell.add(top_lid);

  const top_front_edgeGeom = new THREE.BoxGeometry(
    boxW + 0.01,
    0.012,
    0.018
  );
  const top_front_edge = new THREE.Mesh(top_front_edgeGeom, edgeMat);
  top_front_edge.position.set(
    0,
    boxH + 0.012,
    boxD / 2 + 0.012
  );
  box_shell.add(top_front_edge);

  const top_back_edge = new THREE.Mesh(top_front_edgeGeom, edgeMat);
  top_back_edge.position.set(
    0,
    boxH + 0.012,
    -boxD / 2 - 0.012
  );
  box_shell.add(top_back_edge);

  const top_side_edgeGeom = new THREE.BoxGeometry(
    0.018,
    0.012,
    boxD + 0.01
  );
  const top_left_edge = new THREE.Mesh(top_side_edgeGeom, edgeMat);
  top_left_edge.position.set(
    -boxW / 2 - 0.006,
    boxH + 0.012,
    0
  );
  box_shell.add(top_left_edge);

  const top_right_edge = new THREE.Mesh(top_side_edgeGeom, edgeMat);
  top_right_edge.position.set(
    boxW / 2 + 0.006,
    boxH + 0.012,
    0
  );
  box_shell.add(top_right_edge);

  const printY = boxH + lidT + 0.004;

  function addStroke(strokes, x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    strokes.push({
      x: (x1 + x2) / 2,
      z: (z1 + z2) / 2,
      length: Math.sqrt(dx * dx + dz * dz),
      angle: -Math.atan2(dz, dx)
    });
  }

  function addGlyph(strokes, type, cx, cz, w, h) {
    const l = cx - w / 2;
    const r = cx + w / 2;
    const b = cz + h / 2;
    const t = cz - h / 2;
    const m = cz;

    if (type === "I") {
      addStroke(strokes, l, b, r, b);
      addStroke(strokes, cx, b, cx, t);
      addStroke(strokes, l, t, r, t);
    } else if (type === "N") {
      addStroke(strokes, l, b, l, t);
      addStroke(strokes, l, t, r, b);
      addStroke(strokes, r, b, r, t);
    } else if (type === "S") {
      addStroke(strokes, l, t, r, t);
      addStroke(strokes, l, t, l, m);
      addStroke(strokes, l, m, r, m);
      addStroke(strokes, r, m, r, b);
      addStroke(strokes, l, b, r, b);
    } else if (type === "W") {
      addStroke(strokes, l, t, cx - w * 0.18, b);
      addStroke(strokes, cx - w * 0.18, b, cx, cz - h * 0.15);
      addStroke(strokes, cx, cz - h * 0.15, cx + w * 0.18, b);
      addStroke(strokes, cx + w * 0.18, b, r, t);
    } else if (type === "E") {
      addStroke(strokes, l, t, l, b);
      addStroke(strokes, l, t, r, t);
      addStroke(strokes, l, m, r * 0.98 + l * 0.02, m);
      addStroke(strokes, l, b, r, b);
    } else if (type === "R") {
      addStroke(strokes, l, b, l, t);
      addStroke(strokes, l, t, r, t);
      addStroke(strokes, r, t, r, m);
      addStroke(strokes, r, m, l, m);
      addStroke(strokes, cx, m, r, b);
    } else if (type === "L") {
      addStroke(strokes, l, t, l, b);
      addStroke(strokes, l, b, r, b);
    }
  }

  const gold_strokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function createStrokeMesh(strokes, width, thickness) {
    const mesh = new THREE.InstancedMesh(
      gold_strokeGeom,
      goldMat,
      strokes.length
    );
    const transform = new THREE.Object3D();

    for (let i = 0; i < strokes.length; i++) {
      const stroke = strokes[i];
      transform.position.set(stroke.x, 0, stroke.z);
      transform.rotation.set(0, stroke.angle, 0);
      transform.scale.set(stroke.length, thickness, width);
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const titleStrokes = [];
  const titleText = "INSWERLE";
  const titleW = 0.062;
  const titleH = 0.105;
  const titleGap = 0.018;
  const titleStart = -(titleText.length * titleW + (titleText.length - 1) * titleGap) / 2;

  for (let i = 0; i < titleText.length; i++) {
    addGlyph(
      titleStrokes,
      titleText[i],
      titleStart + titleW / 2 + i * (titleW + titleGap),
      -0.12,
      titleW,
      titleH
    );
  }

  const title_lettering = createStrokeMesh(titleStrokes, 0.010, 0.005);
  title_lettering.position.y = printY;
  top_print.add(title_lettering);

  const title_ruleGeom = new THREE.BoxGeometry(1, 1, 1);
  const title_rules = new THREE.InstancedMesh(title_ruleGeom, goldMat, 2);
  const ruleTransform = new THREE.Object3D();
  const ruleLengths = [0.66, 0.57];

  for (let i = 0; i < 2; i++) {
    ruleTransform.position.set(0, 0, 0.005 + i * 0.022);
    ruleTransform.rotation.set(0, 0, 0);
    ruleTransform.scale.set(ruleLengths[i], 0.005, 0.009);
    ruleTransform.updateMatrix();
    title_rules.setMatrixAt(i, ruleTransform.matrix);
  }

  title_rules.instanceMatrix.needsUpdate = true;
  title_rules.position.y = printY;
  top_print.add(title_rules);

  const subtitleStrokes = [];
  const subtitleText = "1918";
  const subtitleW = 0.026;
  const subtitleH = 0.043;
  const subtitleGap = 0.012;
  const subtitleStart = -(subtitleText.length * subtitleW + (subtitleText.length - 1) * subtitleGap) / 2;

  for (let i = 0; i < subtitleText.length; i++) {
    const digit = subtitleText[i];
    const cx = subtitleStart + subtitleW / 2 + i * (subtitleW + subtitleGap);
    const cz = 0.125;
    const l = cx - subtitleW / 2;
    const r = cx + subtitleW / 2;
    const b = cz + subtitleH / 2;
    const t = cz - subtitleH / 2;

    if (digit === "1") {
      addStroke(subtitleStrokes, cx, b, cx, t);
      addStroke(subtitleStrokes, cx - subtitleW * 0.22, t, cx, t);
      addStroke(subtitleStrokes, l, b, r, b);
    } else if (digit === "9") {
      addStroke(subtitleStrokes, l, b, l, t);
      addStroke(subtitleStrokes, l, t, r, t);
      addStroke(subtitleStrokes, r, t, r, cz);
      addStroke(subtitleStrokes, l, cz, r, cz);
      addStroke(subtitleStrokes, r, cz, r, b);
    } else if (digit === "8") {
      addStroke(subtitleStrokes, l, b, l, cz);
      addStroke(subtitleStrokes, l, cz, l, t);
      addStroke(subtitleStrokes, r, t, r, cz);
      addStroke(subtitleStrokes, r, cz, r, b);
      addStroke(subtitleStrokes, l, t, r, t);
      addStroke(subtitleStrokes, l, cz, r, cz);
      addStroke(subtitleStrokes, l, b, r, b);
    }
  }

  const subtitle_numeral = createStrokeMesh(
    subtitleStrokes,
    0.005,
    0.004
  );
  subtitle_numeral.position.y = printY;
  top_print.add(subtitle_numeral);

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