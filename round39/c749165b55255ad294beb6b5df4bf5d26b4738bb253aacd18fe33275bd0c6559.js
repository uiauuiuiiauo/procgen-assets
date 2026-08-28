export default function generate(THREE) {
  const root = new THREE.Group();

  const bookW = 0.86;
  const bookH = 1.50;
  const pageW = 0.78;
  const pageH = 1.40;
  const pageD = 0.14;
  const coverD = 0.032;
  const coverZ = pageD / 2 + coverD / 2;
  const frontSurfaceZ = coverZ + coverD / 2 + 0.006;
  const spineX = -bookW / 2 + 0.015;
  const spineRadius = 0.105;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0x0b558f,
    metalness: 0.0,
    roughness: 0.7
  });
  const back_coverMat = front_coverMat;
  const spineMat = new THREE.MeshStandardMaterial({
    color: 0x0a315f,
    metalness: 0.0,
    roughness: 0.95
  });
  const hingeMat = new THREE.MeshStandardMaterial({
    color: 0x0d477c,
    metalness: 0.0,
    roughness: 0.95
  });
  const hinge_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x061f3d,
    metalness: 0.0,
    roughness: 0.95
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xf2ecd9,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0xc8c0a9,
    metalness: 0.0,
    roughness: 0.9
  });
  const titleMat = new THREE.MeshStandardMaterial({
    color: 0x02152b,
    metalness: 0.0,
    roughness: 0.7
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.5,
    roughness: 0.25
  });

  function createRoundedPanelGeometry(w, h, d, r) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2 + r, -h / 2);
    shape.lineTo(w / 2 - r, -h / 2);
    shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    shape.lineTo(w / 2, h / 2 - r);
    shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -d / 2);
    return geometry;
  }

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageD);
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.position.x = 0.035;
  root.add(page_block);

  const front_coverGeom = createRoundedPanelGeometry(bookW, bookH, coverD, 0.045);
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.position.z = coverZ;
  root.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.position.z = -coverZ;
  root.add(back_cover);

  const spineGeom = new THREE.CapsuleGeometry(
    spineRadius,
    bookH - spineRadius * 2,
    10,
    24
  );
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.scale.x = 0.78;
  spine.position.x = spineX;
  root.add(spine);

  const front_hinge_panelGeom = new THREE.BoxGeometry(0.20, bookH - 0.08, 0.008);
  const front_hinge_panel = new THREE.Mesh(front_hinge_panelGeom, hingeMat);
  front_hinge_panel.position.set(-0.31, 0, frontSurfaceZ + 0.004);
  root.add(front_hinge_panel);

  const hinge_shadowGeom = new THREE.CylinderGeometry(0.005, 0.005, bookH - 0.11, 10);
  const hinge_shadow = new THREE.Mesh(hinge_shadowGeom, hinge_shadowMat);
  hinge_shadow.position.set(-0.205, 0, frontSurfaceZ + 0.011);
  root.add(hinge_shadow);

  const front_hinge_ridgeGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    bookH - 0.10,
    12
  );
  const front_hinge_ridge = new THREE.Mesh(front_hinge_ridgeGeom, hingeMat);
  front_hinge_ridge.position.set(-0.405, 0, frontSurfaceZ + 0.010);
  root.add(front_hinge_ridge);

  const front_hinge_ridge_secondaryGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    bookH - 0.12,
    10
  );
  const front_hinge_ridge_secondary = new THREE.Mesh(
    front_hinge_ridge_secondaryGeom,
    hinge_shadowMat
  );
  front_hinge_ridge_secondary.position.set(-0.365, 0, frontSurfaceZ + 0.010);
  root.add(front_hinge_ridge_secondary);

  const top_page_linesGeom = new THREE.BoxGeometry(pageW - 0.035, 0.002, 0.0025);
  const top_page_lines = new THREE.InstancedMesh(top_page_linesGeom, page_lineMat, 13);
  const top_line_dummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    top_line_dummy.position.set(
      0.035,
      pageH / 2 + 0.002,
      -pageD * 0.42 + i * pageD * 0.84 / 12
    );
    top_line_dummy.rotation.set(0, 0, 0);
    top_line_dummy.scale.set(1, 1, 1);
    top_line_dummy.updateMatrix();
    top_page_lines.setMatrixAt(i, top_line_dummy.matrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  root.add(top_page_lines);

  const side_page_linesGeom = new THREE.BoxGeometry(0.003, 0.0025, pageD - 0.014);
  const side_page_lines = new THREE.InstancedMesh(side_page_linesGeom, page_lineMat, 18);
  const side_line_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    side_line_dummy.position.set(
      0.035 + pageW / 2 + 0.002,
      -0.62 + i * 1.24 / 17,
      0
    );
    side_line_dummy.rotation.set(0, 0, 0);
    side_line_dummy.scale.set(1, 1, 1);
    side_line_dummy.updateMatrix();
    side_page_lines.setMatrixAt(i, side_line_dummy.matrix);
  }
  side_page_lines.instanceMatrix.needsUpdate = true;
  root.add(side_page_lines);

  function createMarbleTexture() {
    const width = 160;
    const height = 192;
    const data = new Uint8Array(width * height * 4);
    const palette = [
      [4, 25, 70],
      [7, 43, 96],
      [9, 68, 128],
      [12, 105, 166],
      [16, 148, 199],
      [38, 188, 220],
      [112, 222, 232]
    ];

    for (let y = 0; y < height; y++) {
      const v = y / (height - 1);
      for (let x = 0; x < width; x++) {
        const u = x / (width - 1);
        const field =
          u * 2.10 +
          v * 0.82 +
          0.66 * Math.sin(
            v * 10.5 +
            1.8 * Math.sin(u * 11.0) -
            u * 2.5
          ) +
          0.31 * Math.sin(u * 27.0 - v * 13.0) +
          0.16 * Math.sin(u * 61.0 + v * 31.0);
        const band = field * 6.4;
        const whole = Math.floor(band);
        const fraction = band - whole;
        const edge = Math.min(1, Math.max(0, (fraction - 0.34) / 0.32));
        const color = palette[((whole % palette.length) + palette.length) % palette.length];

        let red = color[0] + edge * 28;
        let green = color[1] + edge * 46;
        let blue = color[2] + edge * 40;

        if (edge > 0.82) {
          const pale = (edge - 0.82) / 0.18;
          red += pale * (112 - color[0]);
          green += pale * (222 - color[1]);
          blue += pale * (232 - color[2]);
        }

        const fleck =
          0.5 +
          0.5 * Math.sin(u * 173.0 + Math.sin(v * 41.0) * 5.0) *
          Math.sin(v * 151.0 - u * 29.0);
        if (fleck > 0.965) {
          const sparkle = (fleck - 0.965) / 0.035;
          red += sparkle * 60;
          green += sparkle * 70;
          blue += sparkle * 55;
        }

        const index = (y * width + x) * 4;
        data[index] = Math.max(0, Math.min(255, Math.floor(red)));
        data[index + 1] = Math.max(0, Math.min(255, Math.floor(green)));
        data[index + 2] = Math.max(0, Math.min(255, Math.floor(blue)));
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.needsUpdate = true;
    return texture;
  }

  const marbleTexture = createMarbleTexture();
  const marble_printMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: marbleTexture,
    metalness: 0.0,
    roughness: 0.7
  });
  const marble_printGeom = new THREE.PlaneGeometry(0.62, bookH - 0.07);
  const marble_print = new THREE.Mesh(marble_printGeom, marble_printMat);
  marble_print.position.set(0.11, 0, frontSurfaceZ + 0.007);
  root.add(marble_print);

  const marbled_top_edgeMat = marble_printMat;
  const marbled_top_edgeGeom = new THREE.BoxGeometry(0.61, 0.012, 0.046);
  const marbled_top_edge = new THREE.Mesh(marbled_top_edgeGeom, marbled_top_edgeMat);
  marbled_top_edge.position.set(0.11, bookH / 2 - 0.008, 0);
  root.add(marbled_top_edge);

  const marbled_bottom_edgeGeom = marbled_top_edgeGeom;
  const marbled_bottom_edge = new THREE.Mesh(marbled_bottom_edgeGeom, marbled_top_edgeMat);
  marbled_bottom_edge.position.set(0.11, -bookH / 2 + 0.008, 0);
  root.add(marbled_bottom_edge);

  const marbled_right_edgeMat = marble_printMat;
  const marbled_right_edgeGeom = new THREE.BoxGeometry(0.012, bookH - 0.08, 0.046);
  const marbled_right_edge = new THREE.Mesh(marbled_right_edgeGeom, marbled_right_edgeMat);
  marbled_right_edge.position.set(bookW / 2 - 0.008, 0, 0);
  root.add(marbled_right_edge);

  const glyph_segments = {
    A: [[0, 0, 0.5, 1], [0.5, 1, 1, 0], [0.2, 0.43, 0.8, 0.43]],
    C: [[1, 1, 0, 1], [0, 1, 0, 0], [0, 0, 1, 0]],
    D: [[0, 0, 0, 1], [0, 1, 0.72, 1], [0.72, 1, 1, 0.76], [1, 0.76, 1, 0.24], [1, 0.24, 0.72, 0], [0.72, 0, 0, 0]],
    E: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.78, 0.5], [0, 0, 1, 0]],
    F: [[0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.78, 0.5]],
    I: [[0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0]],
    L: [[0, 1, 0, 0], [0, 0, 1, 0]],
    N: [[0, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 1]],
    O: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0], [1, 0, 0, 0]],
    P: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0.5], [1, 0.5, 0, 0.5]],
    R: [[0, 0, 0, 1], [0, 1, 1, 1], [1, 1, 1, 0.5], [1, 0.5, 0, 0.5], [0.46, 0.5, 1, 0]],
    S: [[1, 1, 0, 1], [0, 1, 0, 0.5], [0, 0.5, 1, 0.5], [1, 0.5, 1, 0], [1, 0, 0, 0]],
    U: [[0, 1, 0, 0], [0, 0, 1, 0], [1, 0, 1, 1]],
    V: [[0, 1, 0.5, 0], [0.5, 0, 1, 1]],
    Y: [[0, 1, 0.5, 0.52], [1, 1, 0.5, 0.52], [0.5, 0.52, 0.5, 0]],
    " ": []
  };

  function createFrontText(word, centerY, charW, charH, gap, stroke, z) {
    const segments = [];
    const totalWidth = word.length * charW + (word.length - 1) * gap;
    const startX = -totalWidth / 2;

    for (let i = 0; i < word.length; i++) {
      const glyph = glyph_segments[word[i]] || [];
      const originX = startX + i * (charW + gap);
      for (const segment of glyph) {
        segments.push([
          originX + segment[0] * charW,
          centerY - charH / 2 + segment[1] * charH,
          originX + segment[2] * charW,
          centerY - charH / 2 + segment[3] * charH
        ]);
      }
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const text = new THREE.InstancedMesh(geometry, titleMat, segments.length);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const dx = segment[2] - segment[0];
      const dy = segment[3] - segment[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      dummy.position.set(
        (segment[0] + segment[2]) / 2,
        (segment[1] + segment[3]) / 2,
        z
      );
      dummy.rotation.set(0, 0, Math.atan2(dy, dx));
      dummy.scale.set(length, stroke, 0.0035);
      dummy.updateMatrix();
      text.setMatrixAt(i, dummy.matrix);
    }
    text.instanceMatrix.needsUpdate = true;
    return text;
  }

  const front_title_top = createFrontText(
    "ENCYCLOPEDIE",
    0.245,
    0.042,
    0.095,
    0.006,
    0.0045,
    frontSurfaceZ + 0.015
  );
  root.add(front_title_top);

  const front_title_bottom = createFrontText(
    "ENCYCLOPEDIA",
    0.095,
    0.042,
    0.095,
    0.006,
    0.0045,
    frontSurfaceZ + 0.015
  );
  root.add(front_title_bottom);

  const spine_gold_rulesGeom = new THREE.TorusGeometry(0.104, 0.003, 7, 28);
  const spine_gold_rules = new THREE.InstancedMesh(spine_gold_rulesGeom, goldMat, 4);
  const gold_rule_dummy = new THREE.Object3D();
  const goldRuleYs = [0.445, 0.205, -0.505, -0.665];
  for (let i = 0; i < goldRuleYs.length; i++) {
    gold_rule_dummy.position.set(spineX, goldRuleYs[i], 0);
    gold_rule_dummy.rotation.set(Math.PI / 2, 0, 0);
    gold_rule_dummy.scale.set(0.78, 1, 1);
    gold_rule_dummy.updateMatrix();
    spine_gold_rules.setMatrixAt(i, gold_rule_dummy.matrix);
  }
  spine_gold_rules.instanceMatrix.needsUpdate = true;
  root.add(spine_gold_rules);

  const spine_raised_bandsGeom = new THREE.TorusGeometry(0.104, 0.0055, 8, 28);
  const spine_raised_bands = new THREE.InstancedMesh(
    spine_raised_bandsGeom,
    hingeMat,
    2
  );
  const band_dummy = new THREE.Object3D();
  const bandYs = [0.485, -0.545];
  for (let i = 0; i < bandYs.length; i++) {
    band_dummy.position.set(spineX, bandYs[i], 0);
    band_dummy.rotation.set(Math.PI / 2, 0, 0);
    band_dummy.scale.set(0.78, 1, 1);
    band_dummy.updateMatrix();
    spine_raised_bands.setMatrixAt(i, band_dummy.matrix);
  }
  spine_raised_bands.instanceMatrix.needsUpdate = true;
  root.add(spine_raised_bands);

  function createSpineText(word, centerY, charW, charH, gap, stroke) {
    const segments = [];
    const totalWidth = word.length * charW + (word.length - 1) * gap;
    const startX = -totalWidth / 2;

    for (let i = 0; i < word.length; i++) {
      const glyph = glyph_segments[word[i]] || [];
      const originX = startX + i * (charW + gap);
      for (const segment of glyph) {
        segments.push([
          originX + segment[0] * charW,
          centerY - charH / 2 + segment[1] * charH,
          originX + segment[2] * charW,
          centerY - charH / 2 + segment[3] * charH
        ]);
      }
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const text = new THREE.InstancedMesh(geometry, goldMat, segments.length);
    const dummy = new THREE.Object3D();
    const surfaceX = spineX - spineRadius * 0.78 - 0.005;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const dx = segment[2] - segment[0];
      const dy = segment[3] - segment[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      dummy.position.set(
        surfaceX,
        (segment[1] + segment[3]) / 2,
        (segment[0] + segment[2]) / 2
      );
      dummy.rotation.set(Math.atan2(dy, dx), 0, 0);
      dummy.scale.set(0.0035, stroke, length);
      dummy.updateMatrix();
      text.setMatrixAt(i, dummy.matrix);
    }
    text.instanceMatrix.needsUpdate = true;
    return text;
  }

  const spine_title_upper = createSpineText(
    "REFERENCE",
    0.355,
    0.015,
    0.035,
    0.003,
    0.0028
  );
  root.add(spine_title_upper);

  const spine_title_lower = createSpineText(
    "ENCYCLOPEDIA",
    0.290,
    0.0125,
    0.034,
    0.0025,
    0.0026
  );
  root.add(spine_title_lower);

  const spine_volume = createSpineText(
    "VII",
    -0.705,
    0.022,
    0.052,
    0.007,
    0.0038
  );
  root.add(spine_volume);

  const spine_emblemShape = new THREE.Shape();
  spine_emblemShape.moveTo(0, -0.038);
  spine_emblemShape.lineTo(-0.009, -0.018);
  spine_emblemShape.lineTo(-0.030, -0.026);
  spine_emblemShape.lineTo(-0.021, -0.005);
  spine_emblemShape.lineTo(-0.039, 0.010);
  spine_emblemShape.lineTo(-0.016, 0.015);
  spine_emblemShape.lineTo(-0.024, 0.035);
  spine_emblemShape.lineTo(0, 0.022);
  spine_emblemShape.lineTo(0.024, 0.035);
  spine_emblemShape.lineTo(0.016, 0.015);
  spine_emblemShape.lineTo(0.039, 0.010);
  spine_emblemShape.lineTo(0.021, -0.005);
  spine_emblemShape.lineTo(0.030, -0.026);
  spine_emblemShape.lineTo(0.009, -0.018);
  spine_emblemShape.closePath();

  const spine_emblemGeom = new THREE.ShapeGeometry(spine_emblemShape);
  const spine_emblemMat = goldMat;
  const spine_emblem = new THREE.Mesh(spine_emblemGeom, spine_emblemMat);
  spine_emblem.rotation.y = -Math.PI / 2;
  spine_emblem.position.set(spineX - spineRadius * 0.78 - 0.006, -0.085, 0);
  root.add(spine_emblem);

  function fitToUnitCube(THREE, object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(THREE, root);
  return root;
}