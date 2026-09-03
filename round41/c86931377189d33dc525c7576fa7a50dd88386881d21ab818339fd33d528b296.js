export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_book";

  const cover_group = new THREE.Group();
  cover_group.name = "cover_group";
  const page_group = new THREE.Group();
  page_group.name = "page_group";
  const spine_group = new THREE.Group();
  spine_group.name = "spine_group";
  const front_decoration_group = new THREE.Group();
  front_decoration_group.name = "front_decoration_group";
  root.add(cover_group, page_group, spine_group, front_decoration_group);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x653b2d,
    metalness: 0.0,
    roughness: 0.7
  });
  const darkLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x3f211b,
    metalness: 0.0,
    roughness: 0.7
  });
  const wornLeatherMat = new THREE.MeshStandardMaterial({
    color: 0x8a6247,
    metalness: 0.0,
    roughness: 0.7
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xbca47a,
    metalness: 0.0,
    roughness: 0.9
  });
  const parchmentMat = new THREE.MeshStandardMaterial({
    color: 0xe3d4b2,
    metalness: 0.0,
    roughness: 0.9
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x806b4f,
    metalness: 0.0,
    roughness: 0.9
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x633021,
    metalness: 0.0,
    roughness: 0.8
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc8a33b,
    metalness: 0.5,
    roughness: 0.25
  });
  const redInkMat = new THREE.MeshStandardMaterial({
    color: 0x92382b,
    metalness: 0.0,
    roughness: 0.8
  });
  const foldMat = new THREE.MeshStandardMaterial({
    color: 0xcab994,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0xa77a45,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const darkStainMat = new THREE.MeshStandardMaterial({
    color: 0x76502f,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const wearPatchMat = new THREE.MeshStandardMaterial({
    color: 0x593024,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevelSize, bevelThickness) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize,
        bevelThickness
      }
    );
  }

  function addSurfaceCurve(parent, points, radius, material, segments) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 6, false),
      material
    );
    parent.add(mesh);
    return mesh;
  }

  const back_coverGeom = roundedExtrudeGeometry(1.04, 1.32, 0.045, 0.045, 0.009, 0.007);
  const back_cover = new THREE.Mesh(back_coverGeom, leatherMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0.02, 0, -0.116);
  cover_group.add(back_cover);

  const front_coverGeom = roundedExtrudeGeometry(1.04, 1.32, 0.045, 0.045, 0.009, 0.007);
  const front_cover = new THREE.Mesh(front_coverGeom, leatherMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0.02, 0, 0.069);
  cover_group.add(front_cover);

  const page_blockGeom = roundedExtrudeGeometry(0.91, 1.22, 0.032, 0.15, 0.006, 0.006);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.position.set(0.04, -0.004, -0.075);
  page_group.add(page_block);

  const page_sheetGeom = roundedExtrudeGeometry(0.90, 1.205, 0.028, 0.006, 0.002, 0.001);
  const page_sheets = new THREE.InstancedMesh(page_sheetGeom, pageMat, 6);
  page_sheets.name = "page_sheets";
  const dummy = new THREE.Object3D();
  const sheetData = [
    [0.040, -0.003, 0.079, 1.000, 1.000],
    [0.043, -0.006, 0.085, 0.996, 1.003],
    [0.039, 0.001, 0.091, 1.003, 0.997],
    [0.044, -0.002, 0.097, 0.998, 1.002],
    [0.040, -0.005, 0.103, 1.002, 0.998],
    [0.042, -0.001, 0.109, 0.997, 1.001]
  ];
  for (let i = 0; i < sheetData.length; i++) {
    const data = sheetData[i];
    dummy.position.set(data[0], data[1], data[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(data[3], data[4], 1);
    dummy.updateMatrix();
    page_sheets.setMatrixAt(i, dummy.matrix);
  }
  page_sheets.instanceMatrix.needsUpdate = true;
  page_group.add(page_sheets);

  const page_edge_lineGeom = new THREE.BoxGeometry(1, 1, 1);
  const page_edge_lines = new THREE.InstancedMesh(page_edge_lineGeom, pageLineMat, 18);
  page_edge_lines.name = "page_edge_lines";
  let edgeIndex = 0;
  for (let i = 0; i < 7; i++) {
    const z = -0.062 + i * 0.022;

    dummy.position.set(0.497, -0.004, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.005, 1.14, 0.0025);
    dummy.updateMatrix();
    page_edge_lines.setMatrixAt(edgeIndex++, dummy.matrix);

    dummy.position.set(0.04, 0.606, z);
    dummy.scale.set(0.86, 0.004, 0.0025);
    dummy.updateMatrix();
    page_edge_lines.setMatrixAt(edgeIndex++, dummy.matrix);

    dummy.position.set(0.04, -0.612, z);
    dummy.scale.set(0.88, 0.004, 0.0025);
    dummy.updateMatrix();
    page_edge_lines.setMatrixAt(edgeIndex++, dummy.matrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  page_group.add(page_edge_lines);

  const parchment_faceGeom = roundedExtrudeGeometry(0.88, 1.18, 0.028, 0.006, 0.003, 0.002);
  const parchment_face = new THREE.Mesh(parchment_faceGeom, parchmentMat);
  parchment_face.name = "parchment_face";
  parchment_face.position.set(0.04, -0.003, 0.115);
  page_group.add(parchment_face);

  const top_cover_edgeGeom = new THREE.BoxGeometry(0.94, 0.022, 0.018);
  const top_cover_edge = new THREE.Mesh(top_cover_edgeGeom, darkLeatherMat);
  top_cover_edge.name = "top_cover_edge";
  top_cover_edge.position.set(0.02, 0.651, 0.122);
  cover_group.add(top_cover_edge);

  const bottom_cover_edgeGeom = new THREE.BoxGeometry(0.94, 0.022, 0.018);
  const bottom_cover_edge = new THREE.Mesh(bottom_cover_edgeGeom, darkLeatherMat);
  bottom_cover_edge.name = "bottom_cover_edge";
  bottom_cover_edge.position.set(0.02, -0.651, 0.122);
  cover_group.add(bottom_cover_edge);

  const right_cover_edgeGeom = new THREE.BoxGeometry(0.025, 1.22, 0.018);
  const right_cover_edge = new THREE.Mesh(right_cover_edgeGeom, wornLeatherMat);
  right_cover_edge.name = "right_cover_edge";
  right_cover_edge.position.set(0.527, 0, 0.122);
  cover_group.add(right_cover_edge);

  const page_top_edgeGeom = new THREE.BoxGeometry(0.86, 0.016, 0.012);
  const page_top_edge = new THREE.Mesh(page_top_edgeGeom, pageLineMat);
  page_top_edge.name = "page_top_edge";
  page_top_edge.position.set(0.04, 0.608, 0.128);
  page_group.add(page_top_edge);

  const page_bottom_edgeGeom = new THREE.BoxGeometry(0.88, 0.016, 0.012);
  const page_bottom_edge = new THREE.Mesh(page_bottom_edgeGeom, pageLineMat);
  page_bottom_edge.name = "page_bottom_edge";
  page_bottom_edge.position.set(0.04, -0.614, 0.128);
  page_group.add(page_bottom_edge);

  const page_right_edgeGeom = new THREE.BoxGeometry(0.014, 1.14, 0.012);
  const page_right_edge = new THREE.Mesh(page_right_edgeGeom, pageLineMat);
  page_right_edge.name = "page_right_edge";
  page_right_edge.position.set(0.491, -0.004, 0.128);
  page_group.add(page_right_edge);

  const spineGeom = new THREE.CylinderGeometry(0.11, 0.11, 1.27, 28);
  const spine = new THREE.Mesh(spineGeom, darkLeatherMat);
  spine.name = "spine";
  spine.position.set(-0.485, 0, 0.02);
  spine_group.add(spine);

  const spine_front_panelGeom = roundedExtrudeGeometry(0.16, 1.25, 0.025, 0.026, 0.004, 0.004);
  const spine_front_panel = new THREE.Mesh(spine_front_panelGeom, leatherMat);
  spine_front_panel.name = "spine_front_panel";
  spine_front_panel.position.set(-0.485, 0, 0.108);
  spine_group.add(spine_front_panel);

  const spine_hingeGeom = new THREE.CylinderGeometry(0.011, 0.011, 1.25, 12);
  const spine_hinge = new THREE.Mesh(spine_hingeGeom, darkLeatherMat);
  spine_hinge.name = "spine_hinge";
  spine_hinge.position.set(-0.402, 0, 0.143);
  spine_group.add(spine_hinge);

  const spine_ribGeom = new THREE.TorusGeometry(0.108, 0.011, 8, 28);
  const spine_ribs = new THREE.InstancedMesh(spine_ribGeom, wornLeatherMat, 6);
  spine_ribs.name = "spine_ribs";
  const ribYs = [0.60, 0.34, 0.08, -0.19, -0.45, -0.61];
  for (let i = 0; i < ribYs.length; i++) {
    dummy.position.set(-0.485, ribYs[i], 0.02);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    spine_ribs.setMatrixAt(i, dummy.matrix);
  }
  spine_ribs.instanceMatrix.needsUpdate = true;
  spine_group.add(spine_ribs);

  const spine_gold_bandGeom = new THREE.TorusGeometry(0.119, 0.0026, 6, 28);
  const spine_gold_bands = new THREE.InstancedMesh(spine_gold_bandGeom, goldMat, 12);
  spine_gold_bands.name = "spine_gold_bands";
  let goldBandIndex = 0;
  for (let i = 0; i < ribYs.length; i++) {
    for (const offset of [-0.023, 0.023]) {
      dummy.position.set(-0.485, ribYs[i] + offset, 0.02);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      spine_gold_bands.setMatrixAt(goldBandIndex++, dummy.matrix);
    }
  }
  spine_gold_bands.instanceMatrix.needsUpdate = true;
  spine_group.add(spine_gold_bands);

  const spine_end_bandGeom = new THREE.TorusGeometry(0.112, 0.006, 8, 28);
  const spine_end_bands = new THREE.InstancedMesh(spine_end_bandGeom, wornLeatherMat, 2);
  spine_end_bands.name = "spine_end_bands";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(-0.485, i === 0 ? 0.635 : -0.635, 0.02);
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    spine_end_bands.setMatrixAt(i, dummy.matrix);
  }
  spine_end_bands.instanceMatrix.needsUpdate = true;
  spine_group.add(spine_end_bands);

  const spine_ornaments = new THREE.Group();
  spine_ornaments.name = "spine_ornaments";
  spine_group.add(spine_ornaments);

  function addSpineCurve(coords, radius) {
    const points = [];
    for (let i = 0; i < coords.length; i++) {
      points.push(new THREE.Vector3(coords[i][0], coords[i][1], 0.145));
    }
    return addSurfaceCurve(spine_ornaments, points, radius, goldMat, 18);
  }

  const spine_upper_vine = addSpineCurve([
    [-0.515, 0.54], [-0.532, 0.49], [-0.487, 0.44],
    [-0.510, 0.39], [-0.472, 0.35]
  ], 0.0032);
  spine_upper_vine.name = "spine_upper_vine";

  const spine_upper_branch = addSpineCurve([
    [-0.505, 0.47], [-0.535, 0.445], [-0.542, 0.405]
  ], 0.0025);
  spine_upper_branch.name = "spine_upper_branch";

  const spine_middle_vine = addSpineCurve([
    [-0.520, 0.29], [-0.492, 0.245], [-0.525, 0.195],
    [-0.486, 0.145], [-0.505, 0.105]
  ], 0.003);
  spine_middle_vine.name = "spine_middle_vine";

  const spine_middle_branch_left = addSpineCurve([
    [-0.500, 0.235], [-0.535, 0.205], [-0.540, 0.16]
  ], 0.0024);
  spine_middle_branch_left.name = "spine_middle_branch_left";

  const spine_middle_branch_right = addSpineCurve([
    [-0.505, 0.17], [-0.472, 0.14], [-0.465, 0.095]
  ], 0.0024);
  spine_middle_branch_right.name = "spine_middle_branch_right";

  const spine_lower_flourish = addSpineCurve([
    [-0.520, -0.10], [-0.488, -0.13], [-0.518, -0.17],
    [-0.485, -0.20]
  ], 0.0028);
  spine_lower_flourish.name = "spine_lower_flourish";

  const spine_bottom_flourish = addSpineCurve([
    [-0.515, -0.48], [-0.485, -0.515], [-0.515, -0.55],
    [-0.482, -0.575]
  ], 0.0028);
  spine_bottom_flourish.name = "spine_bottom_flourish";

  const spine_leafGeom = new THREE.CircleGeometry(1, 14);
  const spineLeafData = [
    [-0.528, 0.505, -0.55, 0.012, 0.005],
    [-0.490, 0.462, 0.65, 0.013, 0.005],
    [-0.532, 0.420, -0.25, 0.012, 0.005],
    [-0.485, 0.385, 0.75, 0.013, 0.005],
    [-0.525, 0.265, -0.50, 0.012, 0.005],
    [-0.490, 0.225, 0.65, 0.013, 0.005],
    [-0.530, 0.180, -0.65, 0.012, 0.005],
    [-0.485, 0.135, 0.75, 0.013, 0.005],
    [-0.515, -0.120, -0.55, 0.012, 0.005],
    [-0.490, -0.165, 0.65, 0.012, 0.005],
    [-0.515, -0.500, -0.60, 0.012, 0.005],
    [-0.485, -0.545, 0.65, 0.012, 0.005]
  ];
  const spine_leaves = new THREE.InstancedMesh(spine_leafGeom, goldMat, spineLeafData.length);
  spine_leaves.name = "spine_leaves";
  for (let i = 0; i < spineLeafData.length; i++) {
    const data = spineLeafData[i];
    dummy.position.set(data[0], data[1], 0.148);
    dummy.rotation.set(0, 0, data[2]);
    dummy.scale.set(data[3], data[4], 1);
    dummy.updateMatrix();
    spine_leaves.setMatrixAt(i, dummy.matrix);
  }
  spine_leaves.instanceMatrix.needsUpdate = true;
  spine_ornaments.add(spine_leaves);

  const spine_rosetteGeom = new THREE.CircleGeometry(1, 16);
  const rosetteCenters = [
    [-0.485, -0.055],
    [-0.485, -0.375]
  ];
  const spine_rosettes = new THREE.InstancedMesh(spine_rosetteGeom, goldMat, 16);
  spine_rosettes.name = "spine_rosettes";
  let rosetteIndex = 0;
  for (let r = 0; r < rosetteCenters.length; r++) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      dummy.position.set(
        rosetteCenters[r][0] + Math.cos(angle) * 0.020,
        rosetteCenters[r][1] + Math.sin(angle) * 0.020,
        0.149
      );
      dummy.rotation.set(0, 0, angle);
      dummy.scale.set(0.014, 0.005, 1);
      dummy.updateMatrix();
      spine_rosettes.setMatrixAt(rosetteIndex++, dummy.matrix);
    }
  }
  spine_rosettes.instanceMatrix.needsUpdate = true;
  spine_ornaments.add(spine_rosettes);

  const spine_rosette_centerGeom = new THREE.CircleGeometry(0.008, 16);
  const spine_rosette_centers = new THREE.InstancedMesh(spine_rosette_centerGeom, goldMat, 2);
  spine_rosette_centers.name = "spine_rosette_centers";
  for (let i = 0; i < rosetteCenters.length; i++) {
    dummy.position.set(rosetteCenters[i][0], rosetteCenters[i][1], 0.151);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    spine_rosette_centers.setMatrixAt(i, dummy.matrix);
  }
  spine_rosette_centers.instanceMatrix.needsUpdate = true;
  spine_ornaments.add(spine_rosette_centers);

  const spine_wearGeom = new THREE.CircleGeometry(1, 12);
  const spineWearData = [
    [-0.520, 0.575, 0.025, 0.010, 0.2],
    [-0.452, 0.515, 0.016, 0.007, -0.4],
    [-0.525, 0.300, 0.018, 0.008, 0.5],
    [-0.450, 0.020, 0.015, 0.006, -0.3],
    [-0.525, -0.270, 0.020, 0.008, 0.7],
    [-0.450, -0.520, 0.018, 0.007, -0.6],
    [-0.515, -0.590, 0.025, 0.009, 0.1]
  ];
  const spine_wear_patches = new THREE.InstancedMesh(spine_wearGeom, wearPatchMat, spineWearData.length);
  spine_wear_patches.name = "spine_wear_patches";
  for (let i = 0; i < spineWearData.length; i++) {
    const data = spineWearData[i];
    dummy.position.set(data[0], data[1], 0.146);
    dummy.rotation.set(0, 0, data[4]);
    dummy.scale.set(data[2], data[3], 1);
    dummy.updateMatrix();
    spine_wear_patches.setMatrixAt(i, dummy.matrix);
  }
  spine_wear_patches.instanceMatrix.needsUpdate = true;
  spine_group.add(spine_wear_patches);

  const foldShape = new THREE.Shape();
  foldShape.moveTo(0, 0);
  foldShape.lineTo(-0.13, 0);
  foldShape.lineTo(0, -0.13);
  foldShape.closePath();
  const bottom_right_page_foldGeom = new THREE.ShapeGeometry(foldShape);
  const bottom_right_page_fold = new THREE.Mesh(bottom_right_page_foldGeom, foldMat);
  bottom_right_page_fold.name = "bottom_right_page_fold";
  bottom_right_page_fold.position.set(0.482, -0.588, 0.129);
  page_group.add(bottom_right_page_fold);

  const foldLinePoints = [
    new THREE.Vector3(0.352, -0.588, 0.132),
    new THREE.Vector3(0.415, -0.651, 0.133),
    new THREE.Vector3(0.482, -0.712, 0.134)
  ];
  const bottom_right_fold_line = addSurfaceCurve(
    page_group,
    foldLinePoints,
    0.0025,
    pageLineMat,
    12
  );
  bottom_right_fold_line.name = "bottom_right_fold_line";

  const age_spotsGeom = new THREE.CircleGeometry(1, 18);
  const ageSpotData = [
    [-0.250, 0.500, 0.025, 0.012, 0.2],
    [0.105, 0.515, 0.018, 0.008, -0.5],
    [0.350, 0.450, 0.014, 0.007, 0.4],
    [-0.050, 0.350, 0.020, 0.010, -0.2],
    [0.275, 0.300, 0.030, 0.014, 0.7],
    [0.420, 0.180, 0.018, 0.009, -0.4],
    [-0.180, 0.080, 0.025, 0.012, 0.3],
    [0.090, 0.010, 0.016, 0.007, -0.7],
    [0.325, -0.080, 0.045, 0.025, 0.2],
    [-0.260, -0.200, 0.018, 0.009, 0.5],
    [0.180, -0.270, 0.022, 0.010, -0.3],
    [0.410, -0.310, 0.014, 0.007, 0.8],
    [-0.120, -0.420, 0.050, 0.028, -0.2],
    [0.245, -0.500, 0.025, 0.012, 0.4],
    [0.390, -0.550, 0.020, 0.009, -0.5],
    [-0.285, -0.565, 0.035, 0.018, 0.1],
    [0.050, 0.565, 0.012, 0.006, 0.5],
    [0.235, 0.555, 0.010, 0.005, -0.4]
  ];
  const age_spots = new THREE.InstancedMesh(age_spotsGeom, stainMat, ageSpotData.length);
  age_spots.name = "age_spots";
  for (let i = 0; i < ageSpotData.length; i++) {
    const data = ageSpotData[i];
    dummy.position.set(data[0], data[1], 0.127);
    dummy.rotation.set(0, 0, data[4]);
    dummy.scale.set(data[2], data[3], 1);
    dummy.updateMatrix();
    age_spots.setMatrixAt(i, dummy.matrix);
  }
  age_spots.instanceMatrix.needsUpdate = true;
  front_decoration_group.add(age_spots);

  const dark_age_spotsGeom = new THREE.CircleGeometry(1, 14);
  const darkAgeSpotData = [
    [-0.245, -0.425, 0.018, 0.012, 0.3],
    [0.330, -0.080, 0.012, 0.008, -0.2],
    [0.410, -0.310, 0.008, 0.005, 0.6],
    [0.180, 0.080, 0.007, 0.004, -0.5],
    [-0.050, 0.350, 0.006, 0.004, 0.2],
    [0.275, 0.300, 0.009, 0.005, 0.7],
    [0.390, -0.550, 0.008, 0.004, -0.4],
    [-0.285, -0.565, 0.012, 0.007, 0.1]
  ];
  const dark_age_spots = new THREE.InstancedMesh(
    dark_age_spotsGeom,
    darkStainMat,
    darkAgeSpotData.length
  );
  dark_age_spots.name = "dark_age_spots";
  for (let i = 0; i < darkAgeSpotData.length; i++) {
    const data = darkAgeSpotData[i];
    dummy.position.set(data[0], data[1], 0.128);
    dummy.rotation.set(0, 0, data[4]);
    dummy.scale.set(data[2], data[3], 1);
    dummy.updateMatrix();
    dark_age_spots.setMatrixAt(i, dummy.matrix);
  }
  dark_age_spots.instanceMatrix.needsUpdate = true;
  front_decoration_group.add(dark_age_spots);

  const paper_creases = new THREE.Group();
  paper_creases.name = "paper_creases";
  front_decoration_group.add(paper_creases);

  function addCrease(points, radius) {
    const path = [];
    for (let i = 0; i < points.length; i++) {
      path.push(new THREE.Vector3(points[i][0], points[i][1], 0.129));
    }
    return addSurfaceCurve(paper_creases, path, radius, pageLineMat, 14);
  }

  const upper_right_crease = addCrease([
    [0.315, 0.575], [0.350, 0.520], [0.405, 0.465], [0.455, 0.405]
  ], 0.0012);
  upper_right_crease.name = "upper_right_crease";

  const right_edge_crease = addCrease([
    [0.465, 0.090], [0.430, 0.045], [0.455, -0.005], [0.420, -0.050]
  ], 0.0013);
  right_edge_crease.name = "right_edge_crease";

  const lower_right_crease = addCrease([
    [0.455, -0.410], [0.405, -0.455], [0.365, -0.520], [0.315, -0.565]
  ], 0.0012);
  lower_right_crease.name = "lower_right_crease";

  const lower_left_crease = addCrease([
    [-0.335, -0.500], [-0.285, -0.535], [-0.245, -0.585]
  ], 0.0011);
  lower_left_crease.name = "lower_left_crease";

  const center_crease = addCrease([
    [0.120, 0.190], [0.105, 0.120], [0.135, 0.055], [0.115, -0.010]
  ], 0.0010);
  center_crease.name = "center_crease";

  const glyphs = {
    " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
    "A": ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    "B": ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    "C": ["01111", "10000", "10000", "10000", "10000", "10000", "01111"],
    "D": ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
    "E": ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    "F": ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
    "G": ["01111", "10000", "10000", "10111", "10001", "10001", "01110"],
    "H": ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    "I": ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    "J": ["00111", "00010", "00010", "00010", "10010", "10010", "01100"],
    "K": ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
    "L": ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    "M": ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
    "N": ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
    "O": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    "P": ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    "Q": ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    "R": ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    "S": ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    "T": ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "U": ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    "V": ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
    "W": ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
    "X": ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
    "Y": ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "Z": ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
    ".": ["00000", "00000", "00000", "00000", "00000", "00100", "00100"]
  };

  const textCells = [];
  function collectText(text, startX, topY, cell) {
    let cursor = startX;
    for (let c = 0; c < text.length; c++) {
      const pattern = glyphs[text[c]] || glyphs[" "];
      for (let row = 0; row < 7; row++) {
        for (let column = 0; column < 5; column++) {
          if (pattern[row][column] === "1") {
            textCells.push([
              cursor + column * cell + cell * 0.5,
              topY - row * cell - cell * 0.5,
              cell
            ]);
          }
        }
      }
      cursor += cell * 6;
    }
  }

  collectText("CHE FOPILI METIEMKE", -0.235, 0.500, 0.0065);
  collectText("DCASTHFCFO MIFLINPTHE", -0.245, 0.375, 0.0065);
  collectText("A BOCPNIRIS MINCTHE", -0.225, 0.255, 0.0067);
  collectText("BA BENIM IBOUNNC BIFRONTE", -0.245, 0.130, 0.0060);
  collectText("LIR", -0.175, 0.015, 0.0070);
  collectText("Rr FCRE.", -0.105, -0.170, 0.0074);
  collectText("LN IBE UNEZ.", -0.115, -0.285, 0.0072);
  collectText("SIMP FOMI LAFLE HIIR LE", -0.145, -0.395, 0.0064);
  collectText("APN FGENLHN AIES BON TULFYEM", -0.145, -0.490, 0.0058);
  collectText("TTRPHIM..", -0.075, -0.575, 0.0068);

  const text_pixelGeom = new THREE.BoxGeometry(1, 1, 1);
  const printed_text = new THREE.InstancedMesh(text_pixelGeom, inkMat, textCells.length);
  printed_text.name = "printed_text";
  for (let i = 0; i < textCells.length; i++) {
    const data = textCells[i];
    dummy.position.set(data[0], data[1], 0.132);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(data[2] * 0.78, data[2] * 0.82, 0.003);
    dummy.updateMatrix();
    printed_text.setMatrixAt(i, dummy.matrix);
  }
  printed_text.instanceMatrix.needsUpdate = true;
  front_decoration_group.add(printed_text);

  const title_initial_h = new THREE.Group();
  title_initial_h.name = "title_initial_h";
  front_decoration_group.add(title_initial_h);

  const title_h_verticalGeom = new THREE.BoxGeometry(0.013, 0.145, 0.004);
  const title_h_verticals = new THREE.InstancedMesh(title_h_verticalGeom, goldMat, 2);
  title_h_verticals.name = "title_h_verticals";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(i === 0 ? -0.302 : -0.238, 0.445, 0.134);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    title_h_verticals.setMatrixAt(i, dummy.matrix);
  }
  title_h_verticals.instanceMatrix.needsUpdate = true;
  title_initial_h.add(title_h_verticals);

  const title_h_crossbarGeom = new THREE.BoxGeometry(0.078, 0.013, 0.004);
  const title_h_crossbar = new THREE.Mesh(title_h_crossbarGeom, goldMat);
  title_h_crossbar.name = "title_h_crossbar";
  title_h_crossbar.position.set(-0.270, 0.445, 0.134);
  title_initial_h.add(title_h_crossbar);

  const title_h_serifGeom = new THREE.BoxGeometry(0.036, 0.009, 0.004);
  const title_h_serifs = new THREE.InstancedMesh(title_h_serifGeom, goldMat, 4);
  title_h_serifs.name = "title_h_serifs";
  const serifData = [
    [-0.302, 0.516, -0.12],
    [-0.238, 0.516, 0.12],
    [-0.302, 0.374, 0.12],
    [-0.238, 0.374, -0.12]
  ];
  for (let i = 0; i < serifData.length; i++) {
    dummy.position.set(serifData[i][0], serifData[i][1], 0.134);
    dummy.rotation.set(0, 0, serifData[i][2]);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    title_h_serifs.setMatrixAt(i, dummy.matrix);
  }
  title_h_serifs.instanceMatrix.needsUpdate = true;
  title_initial_h.add(title_h_serifs);

  const title_h_flourishes = new THREE.Group();
  title_h_flourishes.name = "title_h_flourishes";
  title_initial_h.add(title_h_flourishes);

  addSurfaceCurve(title_h_flourishes, [
    new THREE.Vector3(-0.270, 0.380, 0.134),
    new THREE.Vector3(-0.292, 0.345, 0.134),
    new THREE.Vector3(-0.260, 0.315, 0.134),
    new THREE.Vector3(-0.282, 0.280, 0.134),
    new THREE.Vector3(-0.245, 0.252, 0.134)
  ], 0.0034, goldMat, 22);

  addSurfaceCurve(title_h_flourishes, [
    new THREE.Vector3(-0.275, 0.350, 0.134),
    new THREE.Vector3(-0.330, 0.335, 0.134),
    new THREE.Vector3(-0.345, 0.300, 0.134),
    new THREE.Vector3(-0.310, 0.285, 0.134)
  ], 0.0028, goldMat, 18);

  addSurfaceCurve(title_h_flourishes, [
    new THREE.Vector3(-0.267, 0.325, 0.134),
    new THREE.Vector3(-0.225, 0.310, 0.134),
    new THREE.Vector3(-0.215, 0.275, 0.134),
    new THREE.Vector3(-0.245, 0.260, 0.134)
  ], 0.0028, goldMat, 18);

  const title_red_initial = new THREE.Group();
  title_red_initial.name = "title_red_initial";
  front_decoration_group.add(title_red_initial);

  const red_b_verticalGeom = new THREE.BoxGeometry(0.013, 0.145, 0.004);
  const red_b_vertical = new THREE.Mesh(red_b_verticalGeom, redInkMat);
  red_b_vertical.name = "red_b_vertical";
  red_b_vertical.position.set(-0.286, 0.105, 0.134);
  title_red_initial.add(red_b_vertical);

  const red_b_topGeom = new THREE.BoxGeometry(0.065, 0.012, 0.004);
  const red_b_top = new THREE.Mesh(red_b_topGeom, redInkMat);
  red_b_top.name = "red_b_top";
  red_b_top.position.set(-0.258, 0.169, 0.134);
  title_red_initial.add(red_b_top);

  const red_b_middleGeom = new THREE.BoxGeometry(0.060, 0.012, 0.004);
  const red_b_middle = new THREE.Mesh(red_b_middleGeom, redInkMat);
  red_b_middle.name = "red_b_middle";
  red_b_middle.position.set(-0.258, 0.112, 0.134);
  title_red_initial.add(red_b_middle);

  const red_b_bottomGeom = new THREE.BoxGeometry(0.065, 0.012, 0.004);
  const red_b_bottom = new THREE.Mesh(red_b_bottomGeom, redInkMat);
  red_b_bottom.name = "red_b_bottom";
  red_b_bottom.position.set(-0.258, 0.041, 0.134);
  title_red_initial.add(red_b_bottom);

  const red_b_bowlGeom = new THREE.BoxGeometry(0.011, 0.052, 0.004);
  const red_b_bowls = new THREE.InstancedMesh(red_b_bowlGeom, redInkMat, 2);
  red_b_bowls.name = "red_b_bowls";
  for (let i = 0; i < 2; i++) {
    dummy.position.set(-0.232, i === 0 ? 0.140 : 0.078, 0.134);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    red_b_bowls.setMatrixAt(i, dummy.matrix);
  }
  red_b_bowls.instanceMatrix.needsUpdate = true;
  title_red_initial.add(red_b_bowls);

  const red_b_flourish = addSurfaceCurve(front_decoration_group, [
    new THREE.Vector3(-0.286, 0.050, 0.134),
    new THREE.Vector3(-0.275, 0.015, 0.134),
    new THREE.Vector3(-0.245, -0.005, 0.134),
    new THREE.Vector3(-0.225, 0.015, 0.134)
  ], 0.0032, goldMat, 18);
  red_b_flourish.name = "red_b_flourish";

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