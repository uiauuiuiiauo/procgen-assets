export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "journal_book";

  const bookW = 1.22;
  const bookH = 1.42;
  const pageW = 1.12;
  const pageH = 1.33;
  const pageD = 0.19;
  const coverD = 0.035;
  const coverZ = 0.112;
  const spineX = -0.59;
  const spineR = 0.11;

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x4b2926,
    metalness: 0.0,
    roughness: 0.7
  });
  const edgeLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x76503d,
    metalness: 0.0,
    roughness: 0.7
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x241716,
    metalness: 0.0,
    roughness: 0.7
  });
  const paperMat = new THREE.MeshStandardMaterial({
    color: 0xeee5cf,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0xd2c4a8,
    metalness: 0.0,
    roughness: 0.9
  });
  const titleMat = new THREE.MeshStandardMaterial({
    color: 0x292322,
    metalness: 0.0,
    roughness: 0.7
  });
  const scuffMat = new THREE.MeshStandardMaterial({
    color: 0x805846,
    metalness: 0.0,
    roughness: 0.8
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

  function roundedExtrudeGeometry(w, h, r, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(w, h, r),
      {
        depth,
        steps: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize,
        bevelThickness
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedRectPath(w, h, r, z) {
    const points = [];
    const corners = [
      [w / 2 - r, h / 2 - r, 0, Math.PI / 2],
      [-w / 2 + r, h / 2 - r, Math.PI / 2, Math.PI],
      [-w / 2 + r, -h / 2 + r, Math.PI, Math.PI * 1.5],
      [w / 2 - r, -h / 2 + r, Math.PI * 1.5, Math.PI * 2]
    ];

    for (const corner of corners) {
      for (let i = 0; i <= 5; i++) {
        const angle = corner[2] + (corner[3] - corner[2]) * (i / 5);
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          corner[1] + Math.sin(angle) * r,
          z
        ));
      }
    }
    return points;
  }

  const page_blockGeom = roundedExtrudeGeometry(
    pageW,
    pageH,
    0.045,
    pageD,
    0.008,
    0.006
  );
  const page_block = new THREE.Mesh(page_blockGeom, paperMat);
  page_block.name = "page_block";
  page_block.position.set(0.02, 0, 0);
  root.add(page_block);

  const top_page_edgeGeom = new THREE.BoxGeometry(1.04, 0.012, pageD * 0.94);
  const top_page_edge = new THREE.Mesh(top_page_edgeGeom, paperMat);
  top_page_edge.name = "top_page_edge";
  top_page_edge.position.set(0.035, pageH / 2 + 0.006, 0);
  root.add(top_page_edge);

  const fore_page_edgeGeom = new THREE.BoxGeometry(0.012, 1.25, pageD * 0.94);
  const fore_page_edge = new THREE.Mesh(fore_page_edgeGeom, paperMat);
  fore_page_edge.name = "fore_page_edge";
  fore_page_edge.position.set(0.586, -0.005, 0);
  root.add(fore_page_edge);

  const top_page_linesGeom = new THREE.BoxGeometry(1.02, 0.0015, 0.0025);
  const top_page_lines = new THREE.InstancedMesh(
    top_page_linesGeom,
    pageLineMat,
    13
  );
  top_page_lines.name = "top_page_lines";
  const topLineDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    topLineDummy.position.set(
      0.035,
      pageH / 2 + 0.012,
      -pageD * 0.42 + pageD * 0.84 * (i / 12)
    );
    topLineDummy.rotation.set(0, 0, 0);
    topLineDummy.scale.set(1, 1, 1);
    topLineDummy.updateMatrix();
    top_page_lines.setMatrixAt(i, topLineDummy.matrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  root.add(top_page_lines);

  const fore_edge_page_linesGeom = new THREE.BoxGeometry(0.002, 1.22, 0.002);
  const fore_edge_page_lines = new THREE.InstancedMesh(
    fore_edge_page_linesGeom,
    pageLineMat,
    15
  );
  fore_edge_page_lines.name = "fore_edge_page_lines";
  const foreLineDummy = new THREE.Object3D();
  for (let i = 0; i < 15; i++) {
    foreLineDummy.position.set(
      0.593,
      -0.005,
      -pageD * 0.42 + pageD * 0.84 * (i / 14)
    );
    foreLineDummy.rotation.set(0, 0, 0);
    foreLineDummy.scale.set(1, 1, 1);
    foreLineDummy.updateMatrix();
    fore_edge_page_lines.setMatrixAt(i, foreLineDummy.matrix);
  }
  fore_edge_page_lines.instanceMatrix.needsUpdate = true;
  root.add(fore_edge_page_lines);

  const front_coverGeom = roundedExtrudeGeometry(
    bookW,
    bookH,
    0.075,
    coverD,
    0.018,
    0.012
  );
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0.02, 0, coverZ);
  root.add(front_cover);

  const back_coverGeom = front_coverGeom;
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.02, 0, -coverZ);
  root.add(back_cover);

  const spineGeom = new THREE.CylinderGeometry(
    spineR,
    spineR,
    bookH - 0.06,
    28
  );
  const spine = new THREE.Mesh(spineGeom, leatherMat);
  spine.name = "spine";
  spine.position.set(spineX, 0, 0);
  root.add(spine);

  const spine_end_capsGeom = new THREE.SphereGeometry(spineR, 24, 12);
  const spine_end_caps = new THREE.InstancedMesh(
    spine_end_capsGeom,
    leatherMat,
    2
  );
  spine_end_caps.name = "spine_end_caps";
  const capDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    capDummy.position.set(
      spineX,
      (i === 0 ? -1 : 1) * (bookH / 2 - 0.03),
      0
    );
    capDummy.rotation.set(0, 0, 0);
    capDummy.scale.set(1, 0.55, 1);
    capDummy.updateMatrix();
    spine_end_caps.setMatrixAt(i, capDummy.matrix);
  }
  spine_end_caps.instanceMatrix.needsUpdate = true;
  root.add(spine_end_caps);

  const front_hingeGeom = new THREE.CylinderGeometry(0.012, 0.012, 1.28, 12);
  const front_hinge = new THREE.Mesh(front_hingeGeom, edgeLeatherMat);
  front_hinge.name = "front_hinge";
  front_hinge.position.set(-0.535, 0, 0.145);
  root.add(front_hinge);

  const back_hingeGeom = front_hingeGeom;
  const back_hinge = new THREE.Mesh(back_hingeGeom, edgeLeatherMat);
  back_hinge.name = "back_hinge";
  back_hinge.position.set(-0.535, 0, -0.145);
  root.add(back_hinge);

  const spine_creasesGeom = new THREE.CylinderGeometry(0.006, 0.006, 1.29, 8);
  const spine_creases = new THREE.InstancedMesh(
    spine_creasesGeom,
    darkLeatherMat,
    2
  );
  spine_creases.name = "spine_creases";
  const creaseDummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    creaseDummy.position.set(-0.552, 0, i === 0 ? 0.132 : -0.132);
    creaseDummy.rotation.set(0, 0, 0);
    creaseDummy.scale.set(1, 1, 1);
    creaseDummy.updateMatrix();
    spine_creases.setMatrixAt(i, creaseDummy.matrix);
  }
  spine_creases.instanceMatrix.needsUpdate = true;
  root.add(spine_creases);

  const borderPoints = roundedRectPath(
    bookW - 0.045,
    bookH - 0.045,
    0.065,
    0
  );
  const borderCurve = new THREE.CatmullRomCurve3(
    borderPoints,
    true,
    "centripetal"
  );

  const front_borderGeom = new THREE.TubeGeometry(
    borderCurve,
    96,
    0.006,
    6,
    true
  );
  const front_border = new THREE.Mesh(front_borderGeom, edgeLeatherMat);
  front_border.name = "front_border";
  front_border.position.set(0.02, 0, 0.145);
  root.add(front_border);

  const back_borderGeom = front_borderGeom;
  const back_border = new THREE.Mesh(back_borderGeom, edgeLeatherMat);
  back_border.name = "back_border";
  back_border.position.set(0.02, 0, -0.145);
  root.add(back_border);

  const front_stitchingGeom = new THREE.BoxGeometry(0.018, 0.003, 0.003);
  const front_stitching = new THREE.InstancedMesh(
    front_stitchingGeom,
    edgeLeatherMat,
    76
  );
  front_stitching.name = "front_stitching";
  const stitchDummy = new THREE.Object3D();
  let stitchIndex = 0;

  for (let i = 0; i < 22; i++) {
    const x = -0.49 + 0.98 * (i / 21);
    for (const y of [-0.666, 0.666]) {
      stitchDummy.position.set(x + 0.02, y, 0.152);
      stitchDummy.rotation.set(0, 0, 0);
      stitchDummy.scale.set(1, 1, 1);
      stitchDummy.updateMatrix();
      front_stitching.setMatrixAt(stitchIndex++, stitchDummy.matrix);
    }
  }

  for (let i = 0; i < 16; i++) {
    const y = -0.55 + 1.10 * (i / 15);
    for (const x of [-0.555, 0.595]) {
      stitchDummy.position.set(x, y, 0.152);
      stitchDummy.rotation.set(0, 0, Math.PI / 2);
      stitchDummy.scale.set(1, 1, 1);
      stitchDummy.updateMatrix();
      front_stitching.setMatrixAt(stitchIndex++, stitchDummy.matrix);
    }
  }
  front_stitching.instanceMatrix.needsUpdate = true;
  root.add(front_stitching);

  const title = new THREE.Group();
  title.name = "title_journal";
  title.position.set(0.06, 0.18, 0.146);
  root.add(title);

  const title_strokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function addTitleStroke(parent, x1, y1, x2, y2, width) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const stroke = new THREE.Mesh(title_strokeGeom, titleMat);
    stroke.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    stroke.rotation.z = Math.atan2(dy, dx);
    stroke.scale.set(length, width, 0.012);
    parent.add(stroke);
  }

  function addTitleBar(parent, x, y, w, h) {
    const bar = new THREE.Mesh(title_strokeGeom, titleMat);
    bar.position.set(x, y, 0);
    bar.scale.set(w, h, 0.012);
    parent.add(bar);
  }

  function addTitleRing(parent, x, y, rx, ry, tube) {
    const ringGeom = new THREE.TorusGeometry(1, tube, 8, 32);
    const ring = new THREE.Mesh(ringGeom, titleMat);
    ring.position.set(x, y, 0);
    ring.scale.set(rx, ry, 0.06);
    parent.add(ring);
  }

  const title_j = new THREE.Group();
  title_j.name = "title_j";
  title_j.position.x = -0.31;
  addTitleBar(title_j, 0, 0.14, 0.105, 0.022);
  addTitleStroke(title_j, 0.038, 0.13, 0.038, -0.09, 0.025);
  addTitleStroke(title_j, 0.038, -0.09, 0.005, -0.13, 0.025);
  addTitleStroke(title_j, 0.005, -0.13, -0.045, -0.13, 0.025);
  addTitleStroke(title_j, -0.045, -0.13, -0.075, -0.095, 0.025);
  title.add(title_j);

  const title_o = new THREE.Group();
  title_o.name = "title_o";
  title_o.position.x = -0.19;
  addTitleRing(title_o, 0, -0.015, 0.056, 0.095, 0.085);
  title.add(title_o);

  const title_u = new THREE.Group();
  title_u.name = "title_u";
  title_u.position.x = -0.07;
  addTitleStroke(title_u, -0.045, 0.07, -0.045, -0.075, 0.022);
  addTitleStroke(title_u, 0.045, 0.07, 0.045, -0.075, 0.022);
  addTitleStroke(title_u, -0.045, -0.075, -0.02, -0.105, 0.022);
  addTitleStroke(title_u, -0.02, -0.105, 0.02, -0.105, 0.022);
  addTitleStroke(title_u, 0.02, -0.105, 0.045, -0.075, 0.022);
  title.add(title_u);

  const title_r = new THREE.Group();
  title_r.name = "title_r";
  title_r.position.x = 0.05;
  addTitleStroke(title_r, -0.035, -0.105, -0.035, 0.07, 0.022);
  addTitleStroke(title_r, -0.035, 0.025, 0.005, 0.065, 0.022);
  addTitleStroke(title_r, 0.005, 0.065, 0.052, 0.045, 0.022);
  title.add(title_r);

  const title_n = new THREE.Group();
  title_n.name = "title_n";
  title_n.position.x = 0.17;
  addTitleStroke(title_n, -0.045, -0.105, -0.045, 0.07, 0.022);
  addTitleStroke(title_n, -0.045, 0.02, 0.005, 0.065, 0.022);
  addTitleStroke(title_n, 0.005, 0.065, 0.045, 0.035, 0.022);
  addTitleStroke(title_n, 0.045, 0.035, 0.045, -0.105, 0.022);
  title.add(title_n);

  const title_a = new THREE.Group();
  title_a.name = "title_a";
  title_a.position.x = 0.29;
  addTitleRing(title_a, -0.01, -0.02, 0.052, 0.085, 0.085);
  addTitleStroke(title_a, 0.045, -0.105, 0.045, 0.07, 0.022);
  title.add(title_a);

  const title_l = new THREE.Group();
  title_l.name = "title_l";
  title_l.position.x = 0.40;
  addTitleStroke(title_l, 0, -0.105, 0, 0.15, 0.024);
  addTitleBar(title_l, -0.002, 0.15, 0.065, 0.02);
  addTitleStroke(title_l, -0.035, -0.105, 0.04, -0.105, 0.022);
  title.add(title_l);

  const front_scuffs = new THREE.Group();
  front_scuffs.name = "front_scuffs";
  root.add(front_scuffs);

  function addScuff(points) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const scuffGeom = new THREE.TubeGeometry(curve, 18, 0.0014, 5, false);
    const scuff = new THREE.Mesh(scuffGeom, scuffMat);
    front_scuffs.add(scuff);
  }

  addScuff([
    new THREE.Vector3(-0.31, -0.54, 0.148),
    new THREE.Vector3(-0.27, -0.44, 0.148),
    new THREE.Vector3(-0.29, -0.34, 0.148),
    new THREE.Vector3(-0.23, -0.24, 0.148)
  ]);
  addScuff([
    new THREE.Vector3(-0.28, -0.46, 0.148),
    new THREE.Vector3(-0.18, -0.42, 0.148),
    new THREE.Vector3(-0.08, -0.44, 0.148)
  ]);
  addScuff([
    new THREE.Vector3(0.34, -0.34, 0.148),
    new THREE.Vector3(0.42, -0.29, 0.148),
    new THREE.Vector3(0.49, -0.20, 0.148),
    new THREE.Vector3(0.54, -0.12, 0.148)
  ]);
  addScuff([
    new THREE.Vector3(0.42, -0.29, 0.148),
    new THREE.Vector3(0.49, -0.36, 0.148),
    new THREE.Vector3(0.55, -0.39, 0.148)
  ]);
  addScuff([
    new THREE.Vector3(-0.08, 0.50, 0.148),
    new THREE.Vector3(-0.02, 0.43, 0.148),
    new THREE.Vector3(0.05, 0.39, 0.148)
  ]);
  addScuff([
    new THREE.Vector3(0.42, 0.47, 0.148),
    new THREE.Vector3(0.48, 0.40, 0.148),
    new THREE.Vector3(0.53, 0.36, 0.148)
  ]);
  addScuff([
    new THREE.Vector3(-0.43, 0.03, 0.148),
    new THREE.Vector3(-0.35, 0.00, 0.148),
    new THREE.Vector3(-0.27, 0.02, 0.148)
  ]);

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