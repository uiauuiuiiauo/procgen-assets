export default function generate(THREE) {
  const root = new THREE.Group();
  const notebook = new THREE.Group();
  root.add(notebook);

  const bookW = 0.72;
  const bookH = 0.92;
  const coverDepth = 0.026;
  const pageW = 0.66;
  const pageH = 0.85;
  const pageDepth = 0.07;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0xd8c1a2,
    metalness: 0.0,
    roughness: 0.7
  });
  const back_coverMat = new THREE.MeshStandardMaterial({
    color: 0xc7ad89,
    metalness: 0.0,
    roughness: 0.7
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xe7e0d2,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xcfc4b1,
    metalness: 0.0,
    roughness: 0.9
  });
  const seam_borderMat = new THREE.MeshStandardMaterial({
    color: 0xb8966e,
    metalness: 0.0,
    roughness: 0.8
  });
  const border_stitchesMat = new THREE.MeshStandardMaterial({
    color: 0x9d7754,
    metalness: 0.0,
    roughness: 0.8
  });
  const ribbon_bookmarkMat = new THREE.MeshStandardMaterial({
    color: 0xb87955,
    metalness: 0.0,
    roughness: 0.95
  });
  const ribbon_detailMat = new THREE.MeshStandardMaterial({
    color: 0x8e573d,
    metalness: 0.0,
    roughness: 0.95
  });
  const clasp_tabMat = new THREE.MeshStandardMaterial({
    color: 0xd5ad45,
    metalness: 0.6,
    roughness: 0.2
  });
  const clasp_seamMat = new THREE.MeshStandardMaterial({
    color: 0x947020,
    metalness: 0.5,
    roughness: 0.25
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
    shape.closePath();
    return shape;
  }

  function roundedRectPoints(width, height, radius, z, segmentsPerCorner) {
    const points = [];
    const hw = width / 2;
    const hh = height / 2;
    const corners = [
      [hw - radius, hh - radius, 0],
      [-hw + radius, hh - radius, Math.PI / 2],
      [-hw + radius, -hh + radius, Math.PI],
      [hw - radius, -hh + radius, Math.PI * 1.5]
    ];
    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i < segmentsPerCorner; i++) {
        const angle = corner[2] + (i / segmentsPerCorner) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          corner[1] + Math.sin(angle) * radius,
          z
        ));
      }
    }
    return points;
  }

  const ribbon_bookmarkShape = new THREE.Shape();
  ribbon_bookmarkShape.moveTo(-0.255, -0.425);
  ribbon_bookmarkShape.lineTo(-0.195, -0.425);
  ribbon_bookmarkShape.lineTo(-0.355, -0.615);
  ribbon_bookmarkShape.lineTo(-0.425, -0.605);
  ribbon_bookmarkShape.closePath();

  const ribbon_bookmarkGeom = new THREE.ExtrudeGeometry(ribbon_bookmarkShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.0015,
    bevelSize: 0.0015,
    bevelSegments: 1
  });
  const ribbon_bookmark = new THREE.Mesh(ribbon_bookmarkGeom, ribbon_bookmarkMat);
  ribbon_bookmark.position.z = -0.012;
  notebook.add(ribbon_bookmark);

  const ribbon_center_seamGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.225, -0.432, -0.001),
      new THREE.Vector3(-0.389, -0.610, -0.001)
    ),
    1,
    0.0013,
    6,
    false
  );
  const ribbon_center_seam = new THREE.Mesh(ribbon_center_seamGeom, ribbon_detailMat);
  notebook.add(ribbon_center_seam);

  const back_coverShape = roundedRectShape(0.75, 0.96, 0.055);
  const back_coverGeom = new THREE.ExtrudeGeometry(back_coverShape, {
    depth: 0.024,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 16
  });
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.position.set(0.018, 0.008, -0.066);
  notebook.add(back_cover);

  const back_cover_edgePoints = roundedRectPoints(0.75, 0.96, 0.055, 0, 7);
  const back_cover_edgeCurve = new THREE.CatmullRomCurve3(
    back_cover_edgePoints,
    true,
    "centripetal"
  );
  const back_cover_edgeGeom = new THREE.TubeGeometry(
    back_cover_edgeCurve,
    96,
    0.006,
    8,
    true
  );
  const back_cover_edge = new THREE.Mesh(back_cover_edgeGeom, back_coverMat);
  back_cover_edge.position.set(0.018, 0.008, -0.032);
  notebook.add(back_cover_edge);

  const page_blockShape = roundedRectShape(pageW, pageH, 0.035);
  const page_blockGeom = new THREE.ExtrudeGeometry(page_blockShape, {
    depth: pageDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.003,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 12
  });
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.position.set(0.012, 0.004, -0.039);
  notebook.add(page_block);

  const right_page_layersGeom = new THREE.BoxGeometry(0.004, 0.73, 0.002);
  const right_page_layers = new THREE.InstancedMesh(
    right_page_layersGeom,
    page_edgeMat,
    9
  );
  const page_layer_dummy = new THREE.Object3D();
  for (let i = 0; i < 9; i++) {
    page_layer_dummy.position.set(
      0.345,
      0.004 + ((i % 3) - 1) * 0.002,
      -0.032 + i * 0.007
    );
    page_layer_dummy.scale.set(1, 0.985 + (i % 2) * 0.01, 1);
    page_layer_dummy.rotation.set(0, 0, 0);
    page_layer_dummy.updateMatrix();
    right_page_layers.setMatrixAt(i, page_layer_dummy.matrix);
  }
  right_page_layers.instanceMatrix.needsUpdate = true;
  notebook.add(right_page_layers);

  const top_page_layersGeom = new THREE.BoxGeometry(0.58, 0.003, 0.002);
  const top_page_layers = new THREE.InstancedMesh(
    top_page_layersGeom,
    page_edgeMat,
    7
  );
  for (let i = 0; i < 7; i++) {
    page_layer_dummy.position.set(
      0.012,
      0.431 + (i % 2) * 0.001,
      -0.031 + i * 0.008
    );
    page_layer_dummy.scale.set(0.985 + (i % 3) * 0.005, 1, 1);
    page_layer_dummy.rotation.set(0, 0, 0);
    page_layer_dummy.updateMatrix();
    top_page_layers.setMatrixAt(i, page_layer_dummy.matrix);
  }
  top_page_layers.instanceMatrix.needsUpdate = true;
  notebook.add(top_page_layers);

  const front_coverShape = roundedRectShape(bookW, bookH, 0.052);
  const front_coverGeom = new THREE.ExtrudeGeometry(front_coverShape, {
    depth: coverDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 4,
    curveSegments: 18
  });
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.position.set(0, 0, 0.022);
  notebook.add(front_cover);

  const front_cover_edgePoints = roundedRectPoints(bookW, bookH, 0.052, 0, 8);
  const front_cover_edgeCurve = new THREE.CatmullRomCurve3(
    front_cover_edgePoints,
    true,
    "centripetal"
  );
  const front_cover_edgeGeom = new THREE.TubeGeometry(
    front_cover_edgeCurve,
    104,
    0.0055,
    8,
    true
  );
  const front_cover_edge = new THREE.Mesh(front_cover_edgeGeom, front_coverMat);
  front_cover_edge.position.z = 0.055;
  notebook.add(front_cover_edge);

  const seam_borderPoints = roundedRectPoints(0.67, 0.87, 0.043, 0.057, 8);
  const seam_borderCurve = new THREE.CatmullRomCurve3(
    seam_borderPoints,
    true,
    "centripetal"
  );
  const seam_borderGeom = new THREE.TubeGeometry(
    seam_borderCurve,
    104,
    0.0017,
    6,
    true
  );
  const seam_border = new THREE.Mesh(seam_borderGeom, seam_borderMat);
  notebook.add(seam_border);

  const border_stitchesGeom = new THREE.BoxGeometry(0.014, 0.0028, 0.0025);
  const horizontalStitchCount = 22;
  const verticalStitchCount = 26;
  const totalStitchCount = horizontalStitchCount * 2 + verticalStitchCount * 2;
  const border_stitches = new THREE.InstancedMesh(
    border_stitchesGeom,
    border_stitchesMat,
    totalStitchCount
  );
  const stitch_dummy = new THREE.Object3D();
  let stitchIndex = 0;

  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < horizontalStitchCount; i++) {
      const t = i / (horizontalStitchCount - 1);
      stitch_dummy.position.set(-0.288 + t * 0.576, side * 0.427, 0.0605);
      stitch_dummy.rotation.set(0, 0, 0);
      stitch_dummy.scale.set(1, 1, 1);
      stitch_dummy.updateMatrix();
      border_stitches.setMatrixAt(stitchIndex++, stitch_dummy.matrix);
    }
  }

  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < verticalStitchCount; i++) {
      const t = i / (verticalStitchCount - 1);
      stitch_dummy.position.set(side * 0.326, -0.377 + t * 0.754, 0.0605);
      stitch_dummy.rotation.set(0, 0, Math.PI / 2);
      stitch_dummy.scale.set(1, 1, 1);
      stitch_dummy.updateMatrix();
      border_stitches.setMatrixAt(stitchIndex++, stitch_dummy.matrix);
    }
  }
  border_stitches.instanceMatrix.needsUpdate = true;
  notebook.add(border_stitches);

  const clasp_wrapShape = roundedRectShape(0.105, 0.13, 0.025);
  const clasp_wrapGeom = new THREE.ExtrudeGeometry(clasp_wrapShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 3,
    curveSegments: 12
  });
  const clasp_wrap = new THREE.Mesh(clasp_wrapGeom, clasp_tabMat);
  clasp_wrap.position.set(0.382, 0.025, 0.035);
  notebook.add(clasp_wrap);

  const clasp_bandShape = roundedRectShape(0.245, 0.13, 0.026);
  const clasp_bandGeom = new THREE.ExtrudeGeometry(clasp_bandShape, {
    depth: 0.023,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 4,
    curveSegments: 16
  });
  const clasp_band = new THREE.Mesh(clasp_bandGeom, clasp_tabMat);
  clasp_band.position.set(0.35, 0.025, 0.052);
  notebook.add(clasp_band);

  const clasp_tabShape = new THREE.Shape();
  clasp_tabShape.moveTo(0.025, -0.057);
  clasp_tabShape.lineTo(-0.012, -0.057);
  clasp_tabShape.bezierCurveTo(-0.071, -0.058, -0.108, -0.028, -0.108, 0.008);
  clasp_tabShape.bezierCurveTo(-0.108, 0.045, -0.066, 0.067, -0.015, 0.065);
  clasp_tabShape.lineTo(0.025, 0.060);
  clasp_tabShape.closePath();

  const clasp_tabGeom = new THREE.ExtrudeGeometry(clasp_tabShape, {
    depth: 0.022,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.005,
    bevelSegments: 4,
    curveSegments: 18
  });
  const clasp_tab = new THREE.Mesh(clasp_tabGeom, clasp_tabMat);
  clasp_tab.position.set(0.255, 0.025, 0.053);
  notebook.add(clasp_tab);

  const clasp_seamGeom = new THREE.BoxGeometry(0.004, 0.112, 0.003);
  const clasp_seam = new THREE.Mesh(clasp_seamGeom, clasp_seamMat);
  clasp_seam.position.set(0.281, 0.025, 0.082);
  clasp_seam.rotation.z = -0.035;
  notebook.add(clasp_seam);

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