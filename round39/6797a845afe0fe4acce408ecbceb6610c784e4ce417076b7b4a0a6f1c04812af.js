export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "knife";

  const knife_assembly = new THREE.Group();
  knife_assembly.name = "knife_assembly";
  knife_assembly.rotation.z = -0.68;
  root.add(knife_assembly);

  const blade_group = new THREE.Group();
  blade_group.name = "blade_group";
  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  knife_assembly.add(blade_group, handle_group);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xe7e9e9,
    metalness: 0.35,
    roughness: 0.2
  });
  const cutting_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xf2f3f3,
    metalness: 0.3,
    roughness: 0.16,
    side: THREE.DoubleSide
  });
  const blade_spine_facetMat = new THREE.MeshStandardMaterial({
    color: 0xc8cccd,
    metalness: 0.35,
    roughness: 0.28,
    side: THREE.DoubleSide
  });
  const blade_fullerMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide
  });
  const blade_fuller_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide
  });
  const handle_tangMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const wood_scaleMat = new THREE.MeshStandardMaterial({
    color: 0x633522,
    metalness: 0.0,
    roughness: 0.6
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x28150f,
    metalness: 0.0,
    roughness: 0.9
  });
  const wood_knotMat = new THREE.MeshStandardMaterial({
    color: 0x1f1512,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa58c50,
    metalness: 0.5,
    roughness: 0.45
  });
  const brass_darkMat = new THREE.MeshStandardMaterial({
    color: 0x5c4d2d,
    metalness: 0.3,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8
  });
  const maker_markMat = new THREE.MeshStandardMaterial({
    color: 0x4b4b4b,
    metalness: 0.2,
    roughness: 0.7
  });

  function makeExtrudeGeometry(shape, depth, bevelThickness, bevelSize, bevelSegments) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevelThickness > 0,
      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelSegments: bevelSegments
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function addSurfaceTube(parent, name, points, radius, material, closed) {
    const curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 6),
      radius,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.58, 0.03);
  bladeShape.lineTo(-0.58, -2.28);
  bladeShape.bezierCurveTo(-0.56, -3.10, -0.32, -4.12, 0.02, -4.55);
  bladeShape.bezierCurveTo(0.34, -4.18, 0.62, -3.35, 0.68, -2.60);
  bladeShape.bezierCurveTo(0.73, -1.75, 0.69, -0.78, 0.62, 0.03);
  bladeShape.closePath();

  const bladeGeom = makeExtrudeGeometry(bladeShape, 0.12, 0.025, 0.025, 3);
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.name = "blade";
  blade_group.add(blade);

  const cutting_edgeShape = new THREE.Shape();
  cutting_edgeShape.moveTo(0.02, -4.55);
  cutting_edgeShape.bezierCurveTo(0.34, -4.18, 0.62, -3.35, 0.68, -2.60);
  cutting_edgeShape.bezierCurveTo(0.73, -1.75, 0.69, -0.78, 0.62, 0.03);
  cutting_edgeShape.lineTo(0.47, 0.00);
  cutting_edgeShape.bezierCurveTo(0.53, -0.90, 0.55, -1.80, 0.52, -2.55);
  cutting_edgeShape.bezierCurveTo(0.47, -3.25, 0.25, -4.10, 0.02, -4.55);
  cutting_edgeShape.closePath();

  const cutting_edgeGeom = new THREE.ShapeGeometry(cutting_edgeShape, 16);
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, cutting_edgeMat);
  cutting_edge.name = "cutting_edge";
  cutting_edge.position.z = 0.091;
  blade_group.add(cutting_edge);

  const blade_spine_facetShape = new THREE.Shape();
  blade_spine_facetShape.moveTo(-0.58, -0.02);
  blade_spine_facetShape.lineTo(-0.58, -2.28);
  blade_spine_facetShape.bezierCurveTo(-0.56, -2.95, -0.39, -3.78, -0.12, -4.25);
  blade_spine_facetShape.lineTo(-0.02, -4.05);
  blade_spine_facetShape.bezierCurveTo(-0.27, -3.55, -0.43, -2.85, -0.44, -2.20);
  blade_spine_facetShape.lineTo(-0.44, -0.05);
  blade_spine_facetShape.closePath();

  const blade_spine_facetGeom = new THREE.ShapeGeometry(blade_spine_facetShape, 12);
  const blade_spine_facet = new THREE.Mesh(blade_spine_facetGeom, blade_spine_facetMat);
  blade_spine_facet.name = "blade_spine_facet";
  blade_spine_facet.position.z = 0.092;
  blade_group.add(blade_spine_facet);

  const blade_fullerShape = new THREE.Shape();
  blade_fullerShape.moveTo(-0.12, -3.95);
  blade_fullerShape.bezierCurveTo(-0.30, -3.65, -0.39, -3.00, -0.34, -2.30);
  blade_fullerShape.bezierCurveTo(-0.32, -2.12, -0.27, -2.02, -0.21, -2.02);
  blade_fullerShape.bezierCurveTo(-0.14, -2.30, -0.10, -3.15, -0.04, -3.78);
  blade_fullerShape.bezierCurveTo(-0.05, -3.87, -0.08, -3.93, -0.12, -3.95);
  blade_fullerShape.closePath();

  const blade_fullerGeom = new THREE.ShapeGeometry(blade_fullerShape, 16);
  const blade_fuller = new THREE.Mesh(blade_fullerGeom, blade_fullerMat);
  blade_fuller.name = "blade_fuller";
  blade_fuller.position.z = 0.094;
  blade_group.add(blade_fuller);

  const blade_fuller_highlightShape = new THREE.Shape();
  blade_fuller_highlightShape.moveTo(-0.23, -3.70);
  blade_fuller_highlightShape.bezierCurveTo(-0.29, -3.25, -0.30, -2.60, -0.26, -2.18);
  blade_fuller_highlightShape.lineTo(-0.21, -2.10);
  blade_fuller_highlightShape.bezierCurveTo(-0.17, -2.60, -0.14, -3.20, -0.11, -3.66);
  blade_fuller_highlightShape.closePath();

  const blade_fuller_highlightGeom = new THREE.ShapeGeometry(blade_fuller_highlightShape, 12);
  const blade_fuller_highlight = new THREE.Mesh(
    blade_fuller_highlightGeom,
    blade_fuller_highlightMat
  );
  blade_fuller_highlight.name = "blade_fuller_highlight";
  blade_fuller_highlight.position.z = 0.096;
  blade_group.add(blade_fuller_highlight);

  const maker_mark = new THREE.Group();
  maker_mark.name = "maker_mark";
  blade_group.add(maker_mark);

  const maker_emblemGeom = new THREE.BoxGeometry(0.15, 0.15, 0.008);
  const maker_emblem = new THREE.Mesh(maker_emblemGeom, maker_markMat);
  maker_emblem.name = "maker_emblem";
  maker_emblem.position.set(-0.18, -0.38, 0.096);
  maker_emblem.rotation.z = Math.PI / 4;
  maker_mark.add(maker_emblem);

  const maker_emblem_insetGeom = new THREE.BoxGeometry(0.09, 0.09, 0.009);
  const maker_emblem_inset = new THREE.Mesh(maker_emblem_insetGeom, bladeMat);
  maker_emblem_inset.name = "maker_emblem_inset";
  maker_emblem_inset.position.set(-0.18, -0.38, 0.101);
  maker_emblem_inset.rotation.z = Math.PI / 4;
  maker_mark.add(maker_emblem_inset);

  const maker_wordmarkGeom = new THREE.BoxGeometry(0.025, 0.055, 0.007);
  const maker_wordmark = new THREE.InstancedMesh(maker_wordmarkGeom, maker_markMat, 6);
  maker_wordmark.name = "maker_wordmark";
  const wordmark_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    wordmark_dummy.position.set(-0.05 + i * 0.045, -0.55, 0.097);
    wordmark_dummy.rotation.set(0, 0, i % 2 === 0 ? -0.12 : 0.12);
    wordmark_dummy.scale.set(1, 0.72 + (i % 3) * 0.14, 1);
    wordmark_dummy.updateMatrix();
    maker_wordmark.setMatrixAt(i, wordmark_dummy.matrix);
  }
  maker_wordmark.instanceMatrix.needsUpdate = true;
  maker_mark.add(maker_wordmark);

  const handle_tangShape = new THREE.Shape();
  handle_tangShape.moveTo(-0.62, -0.06);
  handle_tangShape.bezierCurveTo(-0.68, 0.65, -0.70, 1.55, -0.62, 2.30);
  handle_tangShape.bezierCurveTo(-0.58, 2.76, -0.36, 3.12, 0.06, 3.25);
  handle_tangShape.bezierCurveTo(0.46, 3.30, 0.75, 3.03, 0.74, 2.68);
  handle_tangShape.bezierCurveTo(0.73, 2.34, 0.61, 2.08, 0.57, 1.72);
  handle_tangShape.bezierCurveTo(0.52, 1.10, 0.56, 0.48, 0.58, -0.06);
  handle_tangShape.closePath();

  const handle_tangGeom = makeExtrudeGeometry(handle_tangShape, 0.24, 0.025, 0.025, 3);
  const handle_tang = new THREE.Mesh(handle_tangGeom, handle_tangMat);
  handle_tang.name = "handle_tang";
  handle_group.add(handle_tang);

  const wood_scaleShape = new THREE.Shape();
  wood_scaleShape.moveTo(-0.53, 0.58);
  wood_scaleShape.bezierCurveTo(-0.59, 1.15, -0.61, 1.90, -0.53, 2.43);
  wood_scaleShape.bezierCurveTo(-0.49, 2.70, -0.31, 2.91, 0.04, 3.00);
  wood_scaleShape.bezierCurveTo(0.34, 3.03, 0.59, 2.84, 0.63, 2.57);
  wood_scaleShape.bezierCurveTo(0.64, 2.28, 0.53, 2.04, 0.49, 1.70);
  wood_scaleShape.bezierCurveTo(0.45, 1.18, 0.49, 0.77, 0.50, 0.58);
  wood_scaleShape.closePath();

  const wood_scaleGeom = makeExtrudeGeometry(wood_scaleShape, 0.07, 0.018, 0.025, 3);

  const front_wood_scale = new THREE.Mesh(wood_scaleGeom, wood_scaleMat);
  front_wood_scale.name = "front_wood_scale";
  front_wood_scale.position.z = 0.145;
  handle_group.add(front_wood_scale);

  const rear_wood_scale = new THREE.Mesh(wood_scaleGeom, wood_scaleMat);
  rear_wood_scale.name = "rear_wood_scale";
  rear_wood_scale.position.z = -0.145;
  handle_group.add(rear_wood_scale);

  const bolsterShape = new THREE.Shape();
  bolsterShape.moveTo(-0.62, -0.07);
  bolsterShape.lineTo(-0.60, 0.68);
  bolsterShape.bezierCurveTo(-0.31, 0.73, 0.25, 0.74, 0.58, 0.68);
  bolsterShape.lineTo(0.58, -0.07);
  bolsterShape.closePath();

  const bolsterGeom = makeExtrudeGeometry(bolsterShape, 0.34, 0.03, 0.025, 3);
  const bolster = new THREE.Mesh(bolsterGeom, brassMat);
  bolster.name = "bolster";
  handle_group.add(bolster);

  const pommel_capShape = new THREE.Shape();
  pommel_capShape.moveTo(-0.60, 2.43);
  pommel_capShape.bezierCurveTo(-0.57, 2.76, -0.35, 3.10, 0.06, 3.23);
  pommel_capShape.bezierCurveTo(0.45, 3.27, 0.72, 3.02, 0.70, 2.69);
  pommel_capShape.bezierCurveTo(0.69, 2.48, 0.61, 2.34, 0.47, 2.27);
  pommel_capShape.bezierCurveTo(0.20, 2.43, -0.22, 2.53, -0.60, 2.43);
  pommel_capShape.closePath();

  const pommel_capGeom = makeExtrudeGeometry(pommel_capShape, 0.34, 0.03, 0.025, 3);
  const pommel_cap = new THREE.Mesh(pommel_capGeom, brassMat);
  pommel_cap.name = "pommel_cap";
  handle_group.add(pommel_cap);

  const tang_seam = addSurfaceTube(
    handle_group,
    "tang_seam",
    [
      new THREE.Vector3(0.59, 0.02, 0.223),
      new THREE.Vector3(0.56, 0.78, 0.223),
      new THREE.Vector3(0.53, 1.54, 0.223),
      new THREE.Vector3(0.60, 2.17, 0.223),
      new THREE.Vector3(0.68, 2.62, 0.223)
    ],
    0.012,
    holeMat,
    false
  );

  const wood_grain = new THREE.Group();
  wood_grain.name = "wood_grain";
  handle_group.add(wood_grain);

  for (let i = 0; i < 9; i++) {
    const x = -0.42 + i * 0.105;
    const y0 = 0.78 + (i % 3) * 0.06;
    const y1 = 2.30 + (i % 4) * 0.045;
    const grain = addSurfaceTube(
      wood_grain,
      "wood_grain_" + i,
      [
        new THREE.Vector3(x, y0, 0.208),
        new THREE.Vector3(x + Math.sin(i * 1.3) * 0.045, y0 + (y1 - y0) * 0.32, 0.208),
        new THREE.Vector3(x - Math.sin(i * 0.9) * 0.035, y0 + (y1 - y0) * 0.67, 0.208),
        new THREE.Vector3(x + Math.sin(i * 1.7) * 0.025, y1, 0.208)
      ],
      0.006,
      wood_grainMat,
      false
    );
    grain.rotation.z = (i % 2 === 0 ? 1 : -1) * 0.008;
  }

  const wood_knotGeom = new THREE.CircleGeometry(0.13, 24);
  const wood_knot = new THREE.Mesh(wood_knotGeom, wood_knotMat);
  wood_knot.name = "wood_knot";
  wood_knot.position.set(0.08, 2.10, 0.211);
  wood_knot.scale.set(0.82, 1.28, 1);
  handle_group.add(wood_knot);

  const wood_knot_ringGeom = new THREE.TorusGeometry(0.135, 0.008, 6, 28);
  const wood_knot_ring = new THREE.Mesh(wood_knot_ringGeom, wood_grainMat);
  wood_knot_ring.name = "wood_knot_ring";
  wood_knot_ring.position.set(0.08, 2.10, 0.213);
  wood_knot_ring.scale.set(0.82, 1.28, 1);
  handle_group.add(wood_knot_ring);

  const handle_rivetsGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.026, 24);
  const handle_rivets = new THREE.InstancedMesh(handle_rivetsGeom, brassMat, 6);
  handle_rivets.name = "handle_rivets";
  const rivet_dummy = new THREE.Object3D();
  const rivet_rows = [
    { y: 0.98, x: 0.03 },
    { y: 1.82, x: 0.08 },
    { y: 2.55, x: 0.12 }
  ];
  let rivet_index = 0;
  for (const side of [-1, 1]) {
    for (const row of rivet_rows) {
      rivet_dummy.position.set(row.x, row.y, side * 0.220);
      rivet_dummy.rotation.set(Math.PI / 2, 0, 0);
      rivet_dummy.scale.set(1, 1, 1);
      rivet_dummy.updateMatrix();
      handle_rivets.setMatrixAt(rivet_index++, rivet_dummy.matrix);
    }
  }
  handle_rivets.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_rivets);

  const lanyard_holeGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.43, 28);
  const lanyard_hole = new THREE.Mesh(lanyard_holeGeom, holeMat);
  lanyard_hole.name = "lanyard_hole";
  lanyard_hole.rotation.x = Math.PI / 2;
  lanyard_hole.position.set(-0.28, 2.84, 0);
  handle_group.add(lanyard_hole);

  const lanyard_hole_rimGeom = new THREE.TorusGeometry(0.108, 0.012, 8, 30);
  const lanyard_hole_rim_front = new THREE.Mesh(lanyard_hole_rimGeom, brass_darkMat);
  lanyard_hole_rim_front.name = "lanyard_hole_rim_front";
  lanyard_hole_rim_front.position.set(-0.28, 2.84, 0.217);
  handle_group.add(lanyard_hole_rim_front);

  const lanyard_hole_rim_rear = new THREE.Mesh(lanyard_hole_rimGeom, brass_darkMat);
  lanyard_hole_rim_rear.name = "lanyard_hole_rim_rear";
  lanyard_hole_rim_rear.position.set(-0.28, 2.84, -0.217);
  handle_group.add(lanyard_hole_rim_rear);

  const patina_spotsGeom = new THREE.CircleGeometry(0.025, 12);
  const patina_spots = new THREE.InstancedMesh(patina_spotsGeom, brass_darkMat, 12);
  patina_spots.name = "patina_spots";
  const patina_dummy = new THREE.Object3D();
  const patina_positions = [
    [-0.40, 0.18],
    [-0.18, 0.42],
    [0.10, 0.22],
    [0.37, 0.50],
    [-0.45, 2.62],
    [-0.18, 2.98],
    [0.12, 3.08],
    [0.37, 2.88],
    [0.52, 2.60],
    [-0.04, 2.70],
    [-0.34, 2.88],
    [0.28, 2.54]
  ];
  for (let i = 0; i < patina_positions.length; i++) {
    const p = patina_positions[i];
    patina_dummy.position.set(p[0], p[1], 0.211);
    patina_dummy.rotation.set(0, 0, i * 0.47);
    patina_dummy.scale.set(0.55 + (i % 3) * 0.28, 0.45 + (i % 4) * 0.18, 1);
    patina_dummy.updateMatrix();
    patina_spots.setMatrixAt(i, patina_dummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  handle_group.add(patina_spots);

  fitToUnitCube(THREE, root);
  return root;

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
}