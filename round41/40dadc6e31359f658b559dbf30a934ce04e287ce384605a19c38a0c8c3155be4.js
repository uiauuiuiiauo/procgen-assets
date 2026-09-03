export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "geometric_folding_book";

  const coverW = 1.18;
  const coverH = 1.62;
  const coverDepth = 0.045;
  const coverBevel = 0.006;
  const pageW = 1.10;
  const pageH = 1.50;
  const pageDepth = 0.12;
  const pageX = 0.005;
  const pageY = 0.035;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0x08aee8,
    metalness: 0.0,
    roughness: 0.7
  });
  const back_coverMat = front_coverMat;
  const spineMat = front_coverMat;

  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xf7f5ed,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_lineMat = new THREE.MeshStandardMaterial({
    color: 0xd8d6cf,
    metalness: 0.0,
    roughness: 0.9
  });

  const pattern_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffdf18,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pattern_pinkMat = new THREE.MeshStandardMaterial({
    color: 0xff2e93,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pattern_greenMat = new THREE.MeshStandardMaterial({
    color: 0x69ef55,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pattern_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff7417,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pattern_purpleMat = new THREE.MeshStandardMaterial({
    color: 0x7268ff,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const pattern_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x12314b,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const pattern_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x13b9e9,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  function createRoundedCoverShape(width, height, radius) {
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
    return shape;
  }

  const front_coverShape = createRoundedCoverShape(coverW, coverH, 0.035);
  const front_coverGeom = new THREE.ExtrudeGeometry(front_coverShape, {
    depth: coverDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: coverBevel,
    bevelSize: coverBevel,
    bevelSegments: 2,
    curveSegments: 8
  });
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.name = "front_cover";
  front_cover.position.z = 0.073;
  root.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.name = "back_cover";
  back_cover.position.set(-0.004, 0.012, -0.124);
  root.add(back_cover);

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageDepth);
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.position.set(pageX, pageY, 0);
  root.add(page_block);

  const spineGeom = new THREE.CylinderGeometry(0.09, 0.09, coverH - 0.025, 28);
  const spine = new THREE.Mesh(spineGeom, spineMat);
  spine.name = "spine";
  spine.position.set(-coverW / 2 + 0.018, 0.005, -0.002);
  spine.scale.x = 0.52;
  root.add(spine);

  const page_top_edgeGeom = new THREE.BoxGeometry(pageW, 0.007, pageDepth + 0.006);
  const page_top_edge = new THREE.Mesh(page_top_edgeGeom, page_blockMat);
  page_top_edge.name = "page_top_edge";
  page_top_edge.position.set(pageX, pageY + pageH / 2 + 0.003, 0);
  root.add(page_top_edge);

  const page_fore_edgeGeom = new THREE.BoxGeometry(0.007, pageH, pageDepth + 0.006);
  const page_fore_edge = new THREE.Mesh(page_fore_edgeGeom, page_blockMat);
  page_fore_edge.name = "page_fore_edge";
  page_fore_edge.position.set(pageX + pageW / 2 + 0.003, pageY, 0);
  root.add(page_fore_edge);

  const page_bottom_edgeGeom = page_top_edgeGeom;
  const page_bottom_edge = new THREE.Mesh(page_bottom_edgeGeom, page_blockMat);
  page_bottom_edge.name = "page_bottom_edge";
  page_bottom_edge.position.set(pageX, pageY - pageH / 2 - 0.003, 0);
  root.add(page_bottom_edge);

  const page_linesGeom = new THREE.BoxGeometry(0.006, 0.003, pageDepth + 0.012);
  const page_lines = new THREE.InstancedMesh(page_linesGeom, page_lineMat, 13);
  page_lines.name = "page_lines";
  const pageLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 13; i++) {
    const y = pageY - pageH * 0.43 + i * pageH * 0.0725;
    pageLineMatrix.makeTranslation(pageX + pageW / 2 + 0.007, y, 0);
    page_lines.setMatrixAt(i, pageLineMatrix);
  }
  page_lines.instanceMatrix.needsUpdate = true;
  root.add(page_lines);

  const top_page_linesGeom = new THREE.BoxGeometry(pageW * 0.96, 0.0025, 0.003);
  const top_page_lines = new THREE.InstancedMesh(top_page_linesGeom, page_lineMat, 7);
  top_page_lines.name = "top_page_lines";
  const topLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 7; i++) {
    const z = -pageDepth * 0.42 + i * pageDepth * 0.14;
    topLineMatrix.makeTranslation(
      pageX,
      pageY + pageH / 2 + 0.007,
      z
    );
    top_page_lines.setMatrixAt(i, topLineMatrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  root.add(top_page_lines);

  const pattern = new THREE.Group();
  pattern.name = "surface_pattern";
  pattern.position.z = coverDepth + coverBevel + 0.002;
  front_cover.add(pattern);

  function createRibbonGeometry(points, width) {
    const half = width / 2;
    const left = [];
    const right = [];

    for (let i = 0; i < points.length; i++) {
      let tx;
      let ty;

      if (i === 0) {
        tx = points[1].x - points[0].x;
        ty = points[1].y - points[0].y;
      } else if (i === points.length - 1) {
        tx = points[i].x - points[i - 1].x;
        ty = points[i].y - points[i - 1].y;
      } else {
        tx = points[i + 1].x - points[i - 1].x;
        ty = points[i + 1].y - points[i - 1].y;
      }

      const length = Math.sqrt(tx * tx + ty * ty) || 1;
      const nx = -ty / length * half;
      const ny = tx / length * half;

      left.push(new THREE.Vector2(
        points[i].x + nx,
        points[i].y + ny
      ));
      right.push(new THREE.Vector2(
        points[i].x - nx,
        points[i].y - ny
      ));
    }

    const shape = new THREE.Shape();
    shape.moveTo(left[0].x, left[0].y);
    for (let i = 1; i < left.length; i++) {
      shape.lineTo(left[i].x, left[i].y);
    }
    for (let i = right.length - 1; i >= 0; i--) {
      shape.lineTo(right[i].x, right[i].y);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function createRibbonPart(name, points, material, width, z) {
    const part = new THREE.Group();
    part.name = name;

    const outlineGeom = createRibbonGeometry(points, width + 0.034);
    const outline = new THREE.Mesh(outlineGeom, pattern_outlineMat);
    outline.name = name + "_outline";
    outline.position.z = z;
    part.add(outline);

    const fillGeom = createRibbonGeometry(points, width);
    const fill = new THREE.Mesh(fillGeom, material);
    fill.name = name + "_fill";
    fill.position.z = z + 0.0012;
    part.add(fill);

    pattern.add(part);
    return part;
  }

  function createSegment(name, x1, y1, x2, y2, material, width, z) {
    const segment = new THREE.Group();
    segment.name = name;

    const outlineGeom = new THREE.PlaneGeometry(
      Math.hypot(x2 - x1, y2 - y1) + 0.025,
      width + 0.018
    );
    const outline = new THREE.Mesh(outlineGeom, pattern_outlineMat);
    outline.name = name + "_outline";
    outline.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    outline.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    segment.add(outline);

    const fillGeom = new THREE.PlaneGeometry(
      Math.hypot(x2 - x1, y2 - y1),
      width
    );
    const fill = new THREE.Mesh(fillGeom, material);
    fill.name = name + "_fill";
    fill.position.set((x1 + x2) / 2, (y1 + y2) / 2, z + 0.0012);
    fill.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    segment.add(fill);

    pattern.add(segment);
    return segment;
  }

  const yellow_zigzag_top = createRibbonPart(
    "yellow_zigzag_top",
    [
      new THREE.Vector2(-0.34, 0.78),
      new THREE.Vector2(-0.18, 0.56),
      new THREE.Vector2(-0.03, 0.73),
      new THREE.Vector2(0.10, 0.49),
      new THREE.Vector2(0.25, 0.67),
      new THREE.Vector2(0.42, 0.40)
    ],
    pattern_yellowMat,
    0.105,
    0.000
  );

  const pink_zigzag_upper_left = createRibbonPart(
    "pink_zigzag_upper_left",
    [
      new THREE.Vector2(-0.56, 0.43),
      new THREE.Vector2(-0.43, 0.61),
      new THREE.Vector2(-0.31, 0.43),
      new THREE.Vector2(-0.17, 0.61),
      new THREE.Vector2(-0.04, 0.35)
    ],
    pattern_pinkMat,
    0.096,
    0.0005
  );

  const green_zigzag_left = createRibbonPart(
    "green_zigzag_left",
    [
      new THREE.Vector2(-0.57, 0.66),
      new THREE.Vector2(-0.47, 0.51),
      new THREE.Vector2(-0.53, 0.34),
      new THREE.Vector2(-0.37, 0.15),
      new THREE.Vector2(-0.47, -0.03),
      new THREE.Vector2(-0.29, -0.20)
    ],
    pattern_greenMat,
    0.092,
    0.001
  );

  const cyan_zigzag_center = createRibbonPart(
    "cyan_zigzag_center",
    [
      new THREE.Vector2(-0.10, 0.39),
      new THREE.Vector2(0.05, 0.20),
      new THREE.Vector2(0.18, 0.36),
      new THREE.Vector2(0.34, 0.14),
      new THREE.Vector2(0.25, -0.04),
      new THREE.Vector2(0.45, -0.23)
    ],
    pattern_cyanMat,
    0.108,
    0.0015
  );

  const yellow_zigzag_middle = createRibbonPart(
    "yellow_zigzag_middle",
    [
      new THREE.Vector2(-0.08, 0.15),
      new THREE.Vector2(0.08, -0.05),
      new THREE.Vector2(-0.02, -0.23),
      new THREE.Vector2(0.18, -0.42),
      new THREE.Vector2(0.34, -0.22),
      new THREE.Vector2(0.49, -0.40)
    ],
    pattern_yellowMat,
    0.108,
    0.002
  );

  const pink_zigzag_right = createRibbonPart(
    "pink_zigzag_right",
    [
      new THREE.Vector2(0.49, 0.58),
      new THREE.Vector2(0.37, 0.39),
      new THREE.Vector2(0.47, 0.20),
      new THREE.Vector2(0.33, 0.02),
      new THREE.Vector2(0.46, -0.14),
      new THREE.Vector2(0.55, -0.29)
    ],
    pattern_pinkMat,
    0.096,
    0.0025
  );

  const orange_zigzag_lower_right = createRibbonPart(
    "orange_zigzag_lower_right",
    [
      new THREE.Vector2(0.22, -0.31),
      new THREE.Vector2(0.39, -0.49),
      new THREE.Vector2(0.30, -0.66),
      new THREE.Vector2(0.49, -0.50),
      new THREE.Vector2(0.56, -0.62)
    ],
    pattern_orangeMat,
    0.088,
    0.003
  );

  const green_zigzag_bottom = createRibbonPart(
    "green_zigzag_bottom",
    [
      new THREE.Vector2(-0.19, -0.39),
      new THREE.Vector2(-0.05, -0.57),
      new THREE.Vector2(0.10, -0.40),
      new THREE.Vector2(0.25, -0.60),
      new THREE.Vector2(0.40, -0.43),
      new THREE.Vector2(0.54, -0.62)
    ],
    pattern_greenMat,
    0.100,
    0.0035
  );

  const pink_zigzag_bottom = createRibbonPart(
    "pink_zigzag_bottom",
    [
      new THREE.Vector2(-0.56, -0.52),
      new THREE.Vector2(-0.42, -0.68),
      new THREE.Vector2(-0.29, -0.51),
      new THREE.Vector2(-0.14, -0.70),
      new THREE.Vector2(0.02, -0.54),
      new THREE.Vector2(0.18, -0.72)
    ],
    pattern_pinkMat,
    0.096,
    0.004
  );

  const yellow_zigzag_lower_left = createRibbonPart(
    "yellow_zigzag_lower_left",
    [
      new THREE.Vector2(-0.54, -0.18),
      new THREE.Vector2(-0.40, -0.35),
      new THREE.Vector2(-0.29, -0.18),
      new THREE.Vector2(-0.15, -0.37),
      new THREE.Vector2(-0.02, -0.20)
    ],
    pattern_yellowMat,
    0.092,
    0.0045
  );

  const purple_zigzag_upper_right = createRibbonPart(
    "purple_zigzag_upper_right",
    [
      new THREE.Vector2(0.34, 0.73),
      new THREE.Vector2(0.47, 0.56),
      new THREE.Vector2(0.39, 0.39),
      new THREE.Vector2(0.54, 0.22)
    ],
    pattern_purpleMat,
    0.082,
    0.005
  );

  const orange_zigzag_left = createRibbonPart(
    "orange_zigzag_left",
    [
      new THREE.Vector2(-0.57, -0.36),
      new THREE.Vector2(-0.47, -0.50),
      new THREE.Vector2(-0.38, -0.36),
      new THREE.Vector2(-0.27, -0.52)
    ],
    pattern_orangeMat,
    0.078,
    0.0055
  );

  const yellow_corner_flash = createRibbonPart(
    "yellow_corner_flash",
    [
      new THREE.Vector2(-0.48, 0.75),
      new THREE.Vector2(-0.39, 0.62),
      new THREE.Vector2(-0.31, 0.76)
    ],
    pattern_yellowMat,
    0.072,
    0.006
  );

  const pink_corner_flash = createRibbonPart(
    "pink_corner_flash",
    [
      new THREE.Vector2(0.04, 0.77),
      new THREE.Vector2(0.15, 0.62),
      new THREE.Vector2(0.25, 0.76)
    ],
    pattern_pinkMat,
    0.070,
    0.0065
  );

  const green_bottom_flash = createRibbonPart(
    "green_bottom_flash",
    [
      new THREE.Vector2(-0.50, -0.73),
      new THREE.Vector2(-0.39, -0.58),
      new THREE.Vector2(-0.30, -0.73)
    ],
    pattern_greenMat,
    0.070,
    0.007
  );

  const yellow_bottom_flash = createRibbonPart(
    "yellow_bottom_flash",
    [
      new THREE.Vector2(0.16, -0.75),
      new THREE.Vector2(0.28, -0.58),
      new THREE.Vector2(0.39, -0.74)
    ],
    pattern_yellowMat,
    0.074,
    0.0075
  );

  const black_accent_upper_left = createSegment(
    "black_accent_upper_left",
    -0.49, 0.76, -0.37, 0.56,
    pattern_outlineMat, 0.018, 0.010
  );
  const black_accent_upper_center = createSegment(
    "black_accent_upper_center",
    -0.03, 0.73, 0.09, 0.50,
    pattern_outlineMat, 0.016, 0.0105
  );
  const black_accent_top_right = createSegment(
    "black_accent_top_right",
    0.25, 0.67, 0.36, 0.48,
    pattern_outlineMat, 0.017, 0.011
  );
  const black_accent_middle_left = createSegment(
    "black_accent_middle_left",
    -0.47, 0.10, -0.31, -0.09,
    pattern_outlineMat, 0.017, 0.0115
  );
  const black_accent_center = createSegment(
    "black_accent_center",
    0.08, 0.16, 0.22, -0.03,
    pattern_outlineMat, 0.016, 0.012
  );
  const black_accent_middle_right = createSegment(
    "black_accent_middle_right",
    0.39, 0.39, 0.49, 0.18,
    pattern_outlineMat, 0.017, 0.0125
  );
  const black_accent_lower_left = createSegment(
    "black_accent_lower_left",
    -0.42, -0.34, -0.29, -0.52,
    pattern_outlineMat, 0.016, 0.013
  );
  const black_accent_lower_center = createSegment(
    "black_accent_lower_center",
    -0.05, -0.39, 0.10, -0.57,
    pattern_outlineMat, 0.017, 0.0135
  );
  const black_accent_lower_right = createSegment(
    "black_accent_lower_right",
    0.29, -0.48, 0.42, -0.66,
    pattern_outlineMat, 0.016, 0.014
  );

  const top_edge_pattern = new THREE.Group();
  top_edge_pattern.name = "top_edge_pattern";
  front_cover.add(top_edge_pattern);

  function createTopEdgePatch(name, x, width, material) {
    const patchGeom = new THREE.BoxGeometry(width, 0.014, 0.052);
    const patch = new THREE.Mesh(patchGeom, material);
    patch.name = name;
    patch.position.set(x, coverH / 2 + 0.004, 0.022);
    top_edge_pattern.add(patch);
    return patch;
  }

  const top_edge_pink_left = createTopEdgePatch(
    "top_edge_pink_left", -0.505, 0.075, pattern_pinkMat
  );
  const top_edge_green_left = createTopEdgePatch(
    "top_edge_green_left", -0.390, 0.055, pattern_greenMat
  );
  const top_edge_yellow_left = createTopEdgePatch(
    "top_edge_yellow_left", -0.285, 0.070, pattern_yellowMat
  );
  const top_edge_orange_center = createTopEdgePatch(
    "top_edge_orange_center", -0.170, 0.050, pattern_orangeMat
  );
  const top_edge_pink_center = createTopEdgePatch(
    "top_edge_pink_center", -0.055, 0.080, pattern_pinkMat
  );
  const top_edge_green_center = createTopEdgePatch(
    "top_edge_green_center", 0.075, 0.060, pattern_greenMat
  );
  const top_edge_purple_center = createTopEdgePatch(
    "top_edge_purple_center", 0.205, 0.070, pattern_purpleMat
  );
  const top_edge_orange_right = createTopEdgePatch(
    "top_edge_orange_right", 0.335, 0.060, pattern_orangeMat
  );
  const top_edge_pink_right = createTopEdgePatch(
    "top_edge_pink_right", 0.455, 0.080, pattern_pinkMat
  );

  const right_edge_pattern = new THREE.Group();
  right_edge_pattern.name = "right_edge_pattern";
  front_cover.add(right_edge_pattern);

  function createRightEdgePatch(name, y, width, material) {
    const patchGeom = new THREE.BoxGeometry(0.014, width, 0.052);
    const patch = new THREE.Mesh(patchGeom, material);
    patch.name = name;
    patch.position.set(coverW / 2 + 0.004, y, 0.022);
    right_edge_pattern.add(patch);
    return patch;
  }

  const right_edge_pink_top = createRightEdgePatch(
    "right_edge_pink_top", 0.65, 0.13, pattern_pinkMat
  );
  const right_edge_yellow_upper = createRightEdgePatch(
    "right_edge_yellow_upper", 0.39, 0.14, pattern_yellowMat
  );
  const right_edge_green_center = createRightEdgePatch(
    "right_edge_green_center", 0.10, 0.15, pattern_greenMat
  );
  const right_edge_pink_lower = createRightEdgePatch(
    "right_edge_pink_lower", -0.20, 0.14, pattern_pinkMat
  );
  const right_edge_orange_lower = createRightEdgePatch(
    "right_edge_orange_lower", -0.48, 0.13, pattern_orangeMat
  );
  const right_edge_yellow_bottom = createRightEdgePatch(
    "right_edge_yellow_bottom", -0.70, 0.12, pattern_yellowMat
  );

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