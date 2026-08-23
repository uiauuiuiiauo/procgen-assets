export default function generate(THREE) {
  const root = new THREE.Group();
  const book = new THREE.Group();
  book.rotation.y = 0.14;
  root.add(book);

  const bookH = 1.0;
  const coverW = 0.72;
  const coverT = 0.026;
  const coverCenterX = 0.04;
  const pageW = 0.69;
  const pageH = 0.94;
  const pageD = 0.108;
  const pageCenterX = 0.035;
  const spineR = 0.071;
  const spineH = 0.98;
  const spineCenterX = -0.35;
  const frontCoverZ = pageD / 2 + 0.006;
  const backCoverZ = -pageD / 2 - coverT - 0.006;
  const frontSurfaceZ = frontCoverZ + coverT + 0.007;

  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x123487,
    metalness: 0.0,
    roughness: 0.3
  });
  const coverEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x092467,
    metalness: 0.0,
    roughness: 0.3
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xd7d1b9,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xa9a28b,
    metalness: 0.0,
    roughness: 0.9
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad36,
    metalness: 0.5,
    roughness: 0.25
  });

  function makeRoundedCoverGeometry(width, height, depth, radius) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 3,
      curveSegments: 8
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageD);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.position.set(pageCenterX, 0, 0);
  book.add(page_block);

  const page_top_edgeGeom = new THREE.BoxGeometry(pageW - 0.018, 0.006, pageD - 0.008);
  const page_top_edge = new THREE.Mesh(page_top_edgeGeom, pageMat);
  page_top_edge.position.set(pageCenterX, pageH / 2, 0);
  book.add(page_top_edge);

  const page_bottom_edge = new THREE.Mesh(page_top_edgeGeom, pageMat);
  page_bottom_edge.position.set(pageCenterX, -pageH / 2, 0);
  book.add(page_bottom_edge);

  const page_edge_linesGeom = new THREE.BoxGeometry(0.003, 0.0022, pageD - 0.012);
  const page_edge_lines = new THREE.InstancedMesh(page_edge_linesGeom, pageLineMat, 18);
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < 18; i++) {
    const y = -pageH * 0.43 + i * pageH * 0.86 / 17;
    instanceMatrix.makeTranslation(pageCenterX + pageW / 2 + 0.001, y, 0);
    page_edge_lines.setMatrixAt(i, instanceMatrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  book.add(page_edge_lines);

  const front_coverGeom = makeRoundedCoverGeometry(coverW, bookH, coverT, 0.026);
  const front_cover = new THREE.Mesh(front_coverGeom, coverMat);
  front_cover.position.set(coverCenterX, 0, frontCoverZ);
  book.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, coverMat);
  back_cover.position.set(coverCenterX, 0, backCoverZ);
  book.add(back_cover);

  const spineGeom = new THREE.CylinderGeometry(spineR, spineR, spineH, 32);
  const spine = new THREE.Mesh(spineGeom, coverMat);
  spine.position.set(spineCenterX, 0, 0);
  spine.scale.set(0.82, 1, 1);
  book.add(spine);

  const spine_capGeom = new THREE.SphereGeometry(1, 24, 12);
  const spine_top_cap = new THREE.Mesh(spine_capGeom, coverMat);
  spine_top_cap.position.set(spineCenterX, spineH / 2, 0);
  spine_top_cap.scale.set(spineR * 0.82, 0.018, spineR);
  book.add(spine_top_cap);

  const spine_bottom_cap = new THREE.Mesh(spine_capGeom, coverMat);
  spine_bottom_cap.position.set(spineCenterX, -spineH / 2, 0);
  spine_bottom_cap.scale.set(spineR * 0.82, 0.018, spineR);
  book.add(spine_bottom_cap);

  const front_hingeGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.94, 12);
  const front_hinge = new THREE.Mesh(front_hingeGeom, coverEdgeMat);
  front_hinge.position.set(-0.309, 0, frontSurfaceZ - 0.002);
  book.add(front_hinge);

  const back_hinge = new THREE.Mesh(front_hingeGeom, coverEdgeMat);
  back_hinge.position.set(-0.309, 0, -frontSurfaceZ + 0.002);
  book.add(back_hinge);

  const spineBandYs = [0.345, 0.135, -0.455];
  const spine_bandsGeom = new THREE.TorusGeometry(spineR - 0.003, 0.006, 8, 32);
  const spine_bands = new THREE.InstancedMesh(spine_bandsGeom, coverEdgeMat, spineBandYs.length);
  const bandQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  const bandScale = new THREE.Vector3(0.82, 1, 1);
  for (let i = 0; i < spineBandYs.length; i++) {
    instanceMatrix.compose(
      new THREE.Vector3(spineCenterX, spineBandYs[i], 0),
      bandQuaternion,
      bandScale
    );
    spine_bands.setMatrixAt(i, instanceMatrix);
  }
  spine_bands.instanceMatrix.needsUpdate = true;
  book.add(spine_bands);

  const goldRuleYs = [
    0.438, 0.420,
    0.286,
    0.176, 0.157,
    -0.414,
    -0.486, -0.505
  ];
  const spine_gold_rulesGeom = new THREE.TorusGeometry(spineR + 0.001, 0.0018, 6, 32);
  const spine_gold_rules = new THREE.InstancedMesh(
    spine_gold_rulesGeom,
    goldMat,
    goldRuleYs.length
  );
  const goldRuleScale = new THREE.Vector3(0.82, 1, 1);
  for (let i = 0; i < goldRuleYs.length; i++) {
    instanceMatrix.compose(
      new THREE.Vector3(spineCenterX, goldRuleYs[i], 0),
      bandQuaternion,
      goldRuleScale
    );
    spine_gold_rules.setMatrixAt(i, instanceMatrix);
  }
  spine_gold_rules.instanceMatrix.needsUpdate = true;
  book.add(spine_gold_rules);

  const glyphs = {
    B: ["110", "101", "110", "101", "110"],
    A: ["010", "101", "111", "101", "101"],
    L: ["100", "100", "100", "100", "111"],
    D: ["110", "101", "101", "101", "110"],
    I: ["111", "010", "010", "010", "111"],
    N: ["101", "111", "111", "111", "101"],
    G: ["111", "100", "101", "101", "111"],
    K: ["101", "110", "100", "110", "101"],
    E: ["111", "100", "110", "100", "111"]
  };

  function addPixelText(cells, text, centerY, pixelW, pixelH) {
    const totalColumns = text.length * 4 - 1;
    const startX = -totalColumns * pixelW / 2;
    for (let letterIndex = 0; letterIndex < text.length; letterIndex++) {
      const pattern = glyphs[text[letterIndex]];
      for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 3; column++) {
          if (pattern[row][column] === "1") {
            cells.push({
              x: startX + (letterIndex * 4 + column) * pixelW,
              y: centerY + (2 - row) * pixelH
            });
          }
        }
      }
    }
  }

  const titleCells = [];
  addPixelText(titleCells, "BALDING", 0.355, 0.0033, 0.0047);
  addPixelText(titleCells, "DANIG", 0.257, 0.0037, 0.0048);
  addPixelText(titleCells, "BILE", -0.452, 0.0033, 0.0045);

  const spine_title_lettersGeom = new THREE.BoxGeometry(0.0027, 0.0037, 0.0025);
  const spine_title_letters = new THREE.InstancedMesh(
    spine_title_lettersGeom,
    goldMat,
    titleCells.length
  );
  const titleAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < titleCells.length; i++) {
    const cell = titleCells[i];
    const ratio = Math.max(-0.92, Math.min(0.92, cell.x / spineR));
    const angle = Math.asin(ratio);
    const normal = new THREE.Vector3(
      Math.sin(angle) / 0.82,
      0,
      Math.cos(angle)
    ).normalize();
    const position = new THREE.Vector3(
      spineCenterX + Math.sin(angle) * spineR * 0.82,
      cell.y,
      Math.cos(angle) * spineR
    );
    position.addScaledVector(normal, spineR + 0.003);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(titleAxis, angle);
    instanceMatrix.compose(position, quaternion, new THREE.Vector3(1, 1, 1));
    spine_title_letters.setMatrixAt(i, instanceMatrix);
  }
  spine_title_letters.instanceMatrix.needsUpdate = true;
  book.add(spine_title_letters);

  const spine_emblemGeom = new THREE.RingGeometry(0.008, 0.014, 18);
  const spine_emblem = new THREE.Mesh(spine_emblemGeom, goldMat);
  spine_emblem.position.set(spineCenterX, -0.035, spineR + 0.004);
  book.add(spine_emblem);

  const spine_emblem_markGeom = new THREE.BoxGeometry(0.003, 0.016, 0.002);
  const spine_emblem_mark = new THREE.Mesh(spine_emblem_markGeom, goldMat);
  spine_emblem_mark.position.set(spineCenterX, -0.035, spineR + 0.006);
  spine_emblem_mark.rotation.z = -0.22;
  book.add(spine_emblem_mark);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}