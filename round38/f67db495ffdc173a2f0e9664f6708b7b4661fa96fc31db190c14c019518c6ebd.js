export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "leather_notebook";

  const coverW = 0.72;
  const coverH = 0.92;
  const coverR = 0.055;
  const coverDepth = 0.028;
  const pageW = 0.66;
  const pageH = 0.84;
  const pageDepth = 0.075;
  const frontSurfaceZ = 0.076;

  const front_coverMat = new THREE.MeshStandardMaterial({
    color: 0xd8bea0,
    metalness: 0.0,
    roughness: 0.7
  });
  const back_coverMat = new THREE.MeshStandardMaterial({
    color: 0xc9a984,
    metalness: 0.0,
    roughness: 0.7
  });
  const page_blockMat = new THREE.MeshStandardMaterial({
    color: 0xeee7d8,
    metalness: 0.0,
    roughness: 0.9
  });
  const page_layersMat = new THREE.MeshStandardMaterial({
    color: 0xcfc4b1,
    metalness: 0.0,
    roughness: 0.9
  });
  const stitch_holesMat = new THREE.MeshStandardMaterial({
    color: 0x80634c,
    metalness: 0.0,
    roughness: 0.8
  });
  const gold_claspMat = new THREE.MeshStandardMaterial({
    color: 0xc9a64b,
    metalness: 0.6,
    roughness: 0.2
  });
  const clasp_seamMat = new THREE.MeshStandardMaterial({
    color: 0x765720,
    metalness: 0.5,
    roughness: 0.25
  });
  const bookmark_ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xb8795d,
    metalness: 0.0,
    roughness: 0.95
  });
  const bookmark_weaveMat = new THREE.MeshStandardMaterial({
    color: 0xd4a080,
    metalness: 0.0,
    roughness: 0.95
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    shape.closePath();
    return shape;
  }

  function roundedRectGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth: depth,
        steps: 1,
        bevelEnabled: true,
        bevelSegments: 3,
        bevelSize: bevel,
        bevelThickness: bevel,
        curveSegments: 12
      }
    );
  }

  function roundedRectCurve(width, height, radius, z) {
    const points = [];
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);
    const corners = [
      [hw - r, hh - r, 0, Math.PI / 2],
      [-hw + r, hh - r, Math.PI / 2, Math.PI],
      [-hw + r, -hh + r, Math.PI, Math.PI * 1.5],
      [hw - r, -hh + r, Math.PI * 1.5, Math.PI * 2]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= 7; i++) {
        const t = i / 7;
        const angle = corner[2] + (corner[3] - corner[2]) * t;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          corner[1] + Math.sin(angle) * r,
          z
        ));
      }
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const bookmark_ribbonGeom = new THREE.BoxGeometry(0.058, 0.22, 0.006);
  const bookmark_ribbon = new THREE.Mesh(bookmark_ribbonGeom, bookmark_ribbonMat);
  bookmark_ribbon.name = "bookmark_ribbon";
  bookmark_ribbon.position.set(-0.215, -0.515, -0.026);
  bookmark_ribbon.rotation.z = -0.61;
  root.add(bookmark_ribbon);

  const bookmark_weaveGeom = new THREE.BoxGeometry(0.048, 0.0025, 0.0015);
  const bookmark_weave = new THREE.InstancedMesh(
    bookmark_weaveGeom,
    bookmark_weaveMat,
    7
  );
  bookmark_weave.name = "bookmark_weave";
  const bookmarkDummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    bookmarkDummy.position.set(0, -0.076 + i * 0.025, 0.0038);
    bookmarkDummy.rotation.set(0, 0, 0);
    bookmarkDummy.scale.set(1, 1, 1);
    bookmarkDummy.updateMatrix();
    bookmark_weave.setMatrixAt(i, bookmarkDummy.matrix);
  }
  bookmark_weave.instanceMatrix.needsUpdate = true;
  bookmark_ribbon.add(bookmark_weave);

  const page_assembly = new THREE.Group();
  page_assembly.name = "page_assembly";
  page_assembly.position.set(0.008, 0, 0);
  root.add(page_assembly);

  const page_blockGeom = roundedRectGeometry(
    pageW,
    pageH,
    0.038,
    pageDepth,
    0.004
  );
  const page_block = new THREE.Mesh(page_blockGeom, page_blockMat);
  page_block.name = "page_block";
  page_block.position.z = -0.055;
  page_assembly.add(page_block);

  const page_layersGeom = new THREE.BoxGeometry(0.004, 0.0025, 0.064);
  const page_layers = new THREE.InstancedMesh(
    page_layersGeom,
    page_layersMat,
    13
  );
  page_layers.name = "page_layers";
  const pageDummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    pageDummy.position.set(pageW / 2 + 0.004, -0.34 + i * 0.056, -0.017);
    pageDummy.rotation.set(0, 0, 0);
    pageDummy.scale.set(1, 1, 1);
    pageDummy.updateMatrix();
    page_layers.setMatrixAt(i, pageDummy.matrix);
  }
  page_layers.instanceMatrix.needsUpdate = true;
  page_assembly.add(page_layers);

  const back_coverGeom = roundedRectGeometry(
    coverW,
    coverH,
    coverR,
    coverDepth,
    0.006
  );
  const back_cover = new THREE.Mesh(back_coverGeom, back_coverMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.014, 0.008, -0.066);
  root.add(back_cover);

  const back_edge_pipingPath = roundedRectCurve(
    coverW - 0.024,
    coverH - 0.024,
    0.047,
    0.011
  );
  const back_edge_pipingGeom = new THREE.TubeGeometry(
    back_edge_pipingPath,
    128,
    0.005,
    8,
    true
  );
  const back_edge_piping = new THREE.Mesh(
    back_edge_pipingGeom,
    back_coverMat
  );
  back_edge_piping.name = "back_edge_piping";
  back_cover.add(back_edge_piping);

  const front_coverGeom = roundedRectGeometry(
    coverW,
    coverH,
    coverR,
    coverDepth,
    0.006
  );
  const front_cover = new THREE.Mesh(front_coverGeom, front_coverMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0, 0, 0.032);
  root.add(front_cover);

  const edge_pipingPath = roundedRectCurve(
    coverW - 0.024,
    coverH - 0.024,
    0.047,
    coverDepth + 0.009
  );
  const edge_pipingGeom = new THREE.TubeGeometry(
    edge_pipingPath,
    128,
    0.005,
    8,
    true
  );
  const edge_piping = new THREE.Mesh(edge_pipingGeom, front_coverMat);
  edge_piping.name = "edge_piping";
  front_cover.add(edge_piping);

  const stitch_holesPath = roundedRectCurve(
    coverW - 0.066,
    coverH - 0.064,
    0.038,
    coverDepth + 0.012
  );
  const stitch_holesGeom = new THREE.BoxGeometry(0.011, 0.0026, 0.0024);
  const stitchCount = 84;
  const stitch_holes = new THREE.InstancedMesh(
    stitch_holesGeom,
    stitch_holesMat,
    stitchCount
  );
  stitch_holes.name = "stitch_holes";
  const stitchDummy = new THREE.Object3D();
  for (let i = 0; i < stitchCount; i++) {
    const t = i / stitchCount;
    const point = stitch_holesPath.getPointAt(t);
    const tangent = stitch_holesPath.getTangentAt(t);
    stitchDummy.position.copy(point);
    stitchDummy.rotation.set(
      0,
      0,
      Math.atan2(tangent.y, tangent.x)
    );
    stitchDummy.scale.set(1, 1, 1);
    stitchDummy.updateMatrix();
    stitch_holes.setMatrixAt(i, stitchDummy.matrix);
  }
  stitch_holes.instanceMatrix.needsUpdate = true;
  front_cover.add(stitch_holes);

  const top_left_corner_foldShape = new THREE.Shape();
  top_left_corner_foldShape.moveTo(0, 0);
  top_left_corner_foldShape.lineTo(0.06, 0);
  top_left_corner_foldShape.lineTo(0, -0.06);
  top_left_corner_foldShape.closePath();
  const top_left_corner_foldGeom = new THREE.ExtrudeGeometry(
    top_left_corner_foldShape,
    {
      depth: 0.004,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.002,
      bevelThickness: 0.002
    }
  );
  const top_left_corner_fold = new THREE.Mesh(
    top_left_corner_foldGeom,
    back_coverMat
  );
  top_left_corner_fold.name = "top_left_corner_fold";
  top_left_corner_fold.position.set(
    -coverW / 2,
    coverH / 2,
    frontSurfaceZ - 0.002
  );
  root.add(top_left_corner_fold);

  const bottom_left_corner_foldShape = new THREE.Shape();
  bottom_left_corner_foldShape.moveTo(0, 0);
  bottom_left_corner_foldShape.lineTo(0.06, 0);
  bottom_left_corner_foldShape.lineTo(0, 0.06);
  bottom_left_corner_foldShape.closePath();
  const bottom_left_corner_foldGeom = new THREE.ExtrudeGeometry(
    bottom_left_corner_foldShape,
    {
      depth: 0.004,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.002,
      bevelThickness: 0.002
    }
  );
  const bottom_left_corner_fold = new THREE.Mesh(
    bottom_left_corner_foldGeom,
    back_coverMat
  );
  bottom_left_corner_fold.name = "bottom_left_corner_fold";
  bottom_left_corner_fold.position.set(
    -coverW / 2,
    -coverH / 2,
    frontSurfaceZ - 0.002
  );
  root.add(bottom_left_corner_fold);

  const claspY = 0.075;

  const clasp_backingGeom = roundedRectGeometry(
    0.285,
    0.112,
    0.035,
    0.012,
    0.004
  );
  const clasp_backing = new THREE.Mesh(clasp_backingGeom, clasp_seamMat);
  clasp_backing.name = "clasp_backing";
  clasp_backing.position.set(0.252, claspY, frontSurfaceZ + 0.001);
  root.add(clasp_backing);

  const clasp_bandGeom = roundedRectGeometry(
    0.17,
    0.108,
    0.028,
    0.014,
    0.004
  );
  const clasp_band = new THREE.Mesh(clasp_bandGeom, gold_claspMat);
  clasp_band.name = "clasp_band";
  clasp_band.position.set(0.318, claspY, frontSurfaceZ + 0.004);
  root.add(clasp_band);

  const clasp_wrapGeom = new THREE.BoxGeometry(0.026, 0.104, 0.132);
  const clasp_wrap = new THREE.Mesh(clasp_wrapGeom, gold_claspMat);
  clasp_wrap.name = "clasp_wrap";
  clasp_wrap.position.set(
    coverW / 2 + 0.013,
    claspY,
    0.012
  );
  root.add(clasp_wrap);

  const clasp_medallionGeom = new THREE.SphereGeometry(1, 32, 16);
  const clasp_medallion = new THREE.Mesh(
    clasp_medallionGeom,
    gold_claspMat
  );
  clasp_medallion.name = "clasp_medallion";
  clasp_medallion.position.set(
    0.188,
    claspY,
    frontSurfaceZ + 0.018
  );
  clasp_medallion.scale.set(0.075, 0.058, 0.016);
  root.add(clasp_medallion);

  const clasp_seamGeom = new THREE.BoxGeometry(0.004, 0.101, 0.004);
  const clasp_seam = new THREE.Mesh(clasp_seamGeom, clasp_seamMat);
  clasp_seam.name = "clasp_seam";
  clasp_seam.position.set(
    0.249,
    claspY,
    frontSurfaceZ + 0.029
  );
  clasp_seam.rotation.z = -0.025;
  root.add(clasp_seam);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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