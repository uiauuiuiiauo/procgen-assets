export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cake_slice";

  const cake = new THREE.Group();
  cake.name = "cake";
  root.add(cake);

  const cakeW = 2.4;
  const cakeH = 1.4;
  const cakeD = 0.8;
  const frontZ = cakeD / 2 + 0.032;

  const cake_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xfff2c9,
    metalness: 0.0,
    roughness: 0.9
  });
  const top_crustMat = new THREE.MeshStandardMaterial({
    color: 0xf1c36b,
    metalness: 0.0,
    roughness: 0.9
  });
  const bottom_crustMat = new THREE.MeshStandardMaterial({
    color: 0xd99a3e,
    metalness: 0.0,
    roughness: 0.9
  });
  const side_crustMat = new THREE.MeshStandardMaterial({
    color: 0xdca24b,
    metalness: 0.0,
    roughness: 0.9
  });
  const crumb_holesMat = new THREE.MeshStandardMaterial({
    color: 0xd8c27b,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const surface_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0xfff7d8,
    metalness: 0.0,
    roughness: 0.95
  });
  const jam_fillingMat = new THREE.MeshStandardMaterial({
    color: 0xa40035,
    metalness: 0.0,
    roughness: 0.3
  });
  const jam_ribbonMat = new THREE.MeshStandardMaterial({
    color: 0xc20b48,
    metalness: 0.0,
    roughness: 0.3
  });
  const jam_dark_pocketsMat = new THREE.MeshStandardMaterial({
    color: 0x510019,
    metalness: 0.0,
    roughness: 0.3
  });
  const jam_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffc4d4,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const cake_bodyShape = new THREE.Shape();
  cake_bodyShape.moveTo(-1.12, -0.69);
  cake_bodyShape.bezierCurveTo(-1.22, -0.69, -1.25, -0.61, -1.2, -0.51);
  cake_bodyShape.lineTo(-1.22, -0.28);
  cake_bodyShape.lineTo(-1.17, -0.05);
  cake_bodyShape.lineTo(-1.21, 0.24);
  cake_bodyShape.bezierCurveTo(-1.21, 0.48, -1.16, 0.61, -1.03, 0.67);
  cake_bodyShape.bezierCurveTo(-0.55, 0.72, 0.48, 0.72, 1.04, 0.67);
  cake_bodyShape.bezierCurveTo(1.17, 0.65, 1.22, 0.55, 1.22, 0.39);
  cake_bodyShape.lineTo(1.23, -0.45);
  cake_bodyShape.bezierCurveTo(1.23, -0.59, 1.17, -0.67, 1.07, -0.69);
  cake_bodyShape.bezierCurveTo(0.5, -0.72, -0.55, -0.72, -1.12, -0.69);
  cake_bodyShape.closePath();

  const cake_bodyGeom = new THREE.ExtrudeGeometry(cake_bodyShape, {
    depth: cakeD,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3
  });
  const cake_body = new THREE.Mesh(cake_bodyGeom, cake_bodyMat);
  cake_body.name = "cake_body";
  cake_body.position.z = -cakeD / 2;
  cake.add(cake_body);

  const top_crustShape = new THREE.Shape();
  top_crustShape.moveTo(-1.16, 0.5);
  top_crustShape.bezierCurveTo(-0.7, 0.52, 0.55, 0.52, 1.16, 0.48);
  top_crustShape.bezierCurveTo(1.2, 0.56, 1.17, 0.65, 1.06, 0.69);
  top_crustShape.bezierCurveTo(0.48, 0.74, -0.55, 0.74, -1.04, 0.69);
  top_crustShape.bezierCurveTo(-1.15, 0.66, -1.2, 0.58, -1.16, 0.5);
  top_crustShape.closePath();

  const top_crustGeom = new THREE.ExtrudeGeometry(top_crustShape, {
    depth: cakeD + 0.02,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  const top_crust = new THREE.Mesh(top_crustGeom, top_crustMat);
  top_crust.name = "top_crust";
  top_crust.position.z = -(cakeD + 0.02) / 2;
  cake.add(top_crust);

  const bottom_crustShape = new THREE.Shape();
  bottom_crustShape.moveTo(-1.1, -0.7);
  bottom_crustShape.bezierCurveTo(-0.45, -0.72, 0.55, -0.72, 1.08, -0.69);
  bottom_crustShape.bezierCurveTo(1.16, -0.67, 1.18, -0.6, 1.12, -0.56);
  bottom_crustShape.bezierCurveTo(0.55, -0.59, -0.5, -0.59, -1.08, -0.57);
  bottom_crustShape.bezierCurveTo(-1.14, -0.6, -1.15, -0.67, -1.1, -0.7);
  bottom_crustShape.closePath();

  const bottom_crustGeom = new THREE.ExtrudeGeometry(bottom_crustShape, {
    depth: cakeD + 0.015,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  const bottom_crust = new THREE.Mesh(bottom_crustGeom, bottom_crustMat);
  bottom_crust.name = "bottom_crust";
  bottom_crust.position.z = -(cakeD + 0.015) / 2;
  cake.add(bottom_crust);

  const left_crust_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.17, 0.58, frontZ - 0.006),
      new THREE.Vector3(-1.21, 0.28, frontZ - 0.006),
      new THREE.Vector3(-1.18, -0.08, frontZ - 0.006),
      new THREE.Vector3(-1.2, -0.48, frontZ - 0.006),
      new THREE.Vector3(-1.1, -0.66, frontZ - 0.006)
    ], false, "centripetal"),
    28,
    0.025,
    7,
    false
  );
  const left_crust_edge = new THREE.Mesh(left_crust_edgeGeom, side_crustMat);
  left_crust_edge.name = "left_crust_edge";
  cake.add(left_crust_edge);

  const right_crust_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.1, 0.65, frontZ - 0.006),
      new THREE.Vector3(1.19, 0.48, frontZ - 0.006),
      new THREE.Vector3(1.21, 0.12, frontZ - 0.006),
      new THREE.Vector3(1.22, -0.34, frontZ - 0.006),
      new THREE.Vector3(1.1, -0.65, frontZ - 0.006)
    ], false, "centripetal"),
    28,
    0.032,
    7,
    false
  );
  const right_crust_edge = new THREE.Mesh(right_crust_edgeGeom, side_crustMat);
  right_crust_edge.name = "right_crust_edge";
  cake.add(right_crust_edge);

  const crumb_holesGeom = new THREE.CircleGeometry(1, 9);
  const crumb_holes = new THREE.InstancedMesh(crumb_holesGeom, crumb_holesMat, 170);
  crumb_holes.name = "crumb_holes";
  const crumb_dummy = new THREE.Object3D();
  let crumb_index = 0;

  for (let i = 0; i < 120; i++) {
    const u = ((i * 37 + 11) % 127) / 126;
    const v = ((i * 53 + 7) % 131) / 130;
    const x = -1.08 + 2.16 * u;
    const y = -0.54 + 1.12 * v;
    const size = 0.008 + 0.025 * (((i * 17 + 3) % 19) / 18);
    const aspect = 0.45 + 0.55 * (((i * 13 + 5) % 17) / 16);
    crumb_dummy.position.set(x, y, frontZ + 0.001);
    crumb_dummy.rotation.set(0, 0, i * 0.73);
    crumb_dummy.scale.set(size, size * aspect, 1);
    crumb_dummy.updateMatrix();
    crumb_holes.setMatrixAt(crumb_index++, crumb_dummy.matrix);
  }

  for (let i = 0; i < 30; i++) {
    const u = ((i * 19 + 3) % 31) / 30;
    const v = ((i * 23 + 2) % 37) / 36;
    const x = -1.05 + 2.1 * u;
    const y = 0.535 + 0.145 * v;
    const size = 0.007 + 0.014 * (((i * 7) % 11) / 10);
    crumb_dummy.position.set(x, y, frontZ + 0.015);
    crumb_dummy.rotation.set(0, 0, i * 0.91);
    crumb_dummy.scale.set(size, size * 0.65, 1);
    crumb_dummy.updateMatrix();
    crumb_holes.setMatrixAt(crumb_index++, crumb_dummy.matrix);
  }

  for (let i = 0; i < 20; i++) {
    const u = ((i * 13 + 4) % 23) / 22;
    const v = ((i * 17 + 1) % 29) / 28;
    const x = -1.03 + 2.06 * u;
    const y = -0.675 + 0.085 * v;
    const size = 0.007 + 0.012 * (((i * 5) % 9) / 8);
    crumb_dummy.position.set(x, y, frontZ + 0.012);
    crumb_dummy.rotation.set(0, 0, i * 1.13);
    crumb_dummy.scale.set(size, size * 0.7, 1);
    crumb_dummy.updateMatrix();
    crumb_holes.setMatrixAt(crumb_index++, crumb_dummy.matrix);
  }
  crumb_holes.instanceMatrix.needsUpdate = true;
  cake.add(crumb_holes);

  const surface_crumbsGeom = new THREE.IcosahedronGeometry(1, 0);
  const surface_crumbs = new THREE.InstancedMesh(
    surface_crumbsGeom,
    surface_crumbsMat,
    180
  );
  surface_crumbs.name = "surface_crumbs";
  const surface_dummy = new THREE.Object3D();
  let surface_index = 0;

  for (let i = 0; i < 110; i++) {
    const u = ((i * 41 + 5) % 113) / 112;
    const v = ((i * 67 + 9) % 127) / 126;
    const x = -1.1 + 2.2 * u;
    const y = -0.56 + 1.16 * v;
    const z = -0.36 + 0.72 * v;
    const size = 0.006 + 0.014 * (((i * 11 + 2) % 13) / 12);
    surface_dummy.position.set(x, y, z);
    surface_dummy.rotation.set(i * 0.37, i * 0.59, i * 0.83);
    surface_dummy.scale.set(size, size * 0.7, size * 0.9);
    surface_dummy.updateMatrix();
    surface_crumbs.setMatrixAt(surface_index++, surface_dummy.matrix);
  }

  for (let i = 0; i < 30; i++) {
    const u = ((i * 17 + 2) % 31) / 30;
    const v = ((i * 19 + 4) % 37) / 36;
    const x = -1.08 + 2.16 * u;
    const z = -0.36 + 0.72 * v;
    const size = 0.007 + 0.013 * (((i * 7) % 11) / 10);
    surface_dummy.position.set(x, 0.715 - 0.025 * Math.abs(u * 2 - 1), z);
    surface_dummy.rotation.set(i * 0.51, i * 0.73, i * 0.29);
    surface_dummy.scale.set(size, size * 0.55, size * 0.85);
    surface_dummy.updateMatrix();
    surface_crumbs.setMatrixAt(surface_index++, surface_dummy.matrix);
  }

  for (let i = 0; i < 20; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const u = ((i * 13 + 3) % 23) / 22;
    const v = ((i * 11 + 1) % 29) / 28;
    const y = -0.53 + 1.08 * u;
    const z = -0.34 + 0.68 * v;
    const size = 0.008 + 0.014 * (((i * 5) % 9) / 8);
    surface_dummy.position.set(side * (1.205 + size * 0.3), y, z);
    surface_dummy.rotation.set(i * 0.43, i * 0.67, i * 0.91);
    surface_dummy.scale.set(size * 0.65, size, size * 0.85);
    surface_dummy.updateMatrix();
    surface_crumbs.setMatrixAt(surface_index++, surface_dummy.matrix);
  }

  for (let i = 0; i < 20; i++) {
    const u = ((i * 7 + 1) % 23) / 22;
    const v = ((i * 9 + 3) % 29) / 28;
    const x = -1.04 + 2.08 * u;
    const z = -0.34 + 0.68 * v;
    const size = 0.007 + 0.012 * (((i * 3) % 11) / 10);
    surface_dummy.position.set(x, -0.705, z);
    surface_dummy.rotation.set(i * 0.61, i * 0.34, i * 0.77);
    surface_dummy.scale.set(size, size * 0.55, size * 0.8);
    surface_dummy.updateMatrix();
    surface_crumbs.setMatrixAt(surface_index++, surface_dummy.matrix);
  }
  surface_crumbs.instanceMatrix.needsUpdate = true;
  cake.add(surface_crumbs);

  const jam_fillingShape = new THREE.Shape();
  jam_fillingShape.moveTo(-1.17, -0.13);
  jam_fillingShape.bezierCurveTo(-1.02, -0.02, -0.89, -0.08, -0.75, -0.03);
  jam_fillingShape.bezierCurveTo(-0.61, 0.03, -0.48, -0.05, -0.34, 0);
  jam_fillingShape.bezierCurveTo(-0.2, 0.07, -0.08, -0.02, 0.07, 0.04);
  jam_fillingShape.bezierCurveTo(0.22, 0.1, 0.35, 0, 0.49, 0.07);
  jam_fillingShape.bezierCurveTo(0.64, 0.14, 0.78, 0.08, 0.91, 0.13);
  jam_fillingShape.bezierCurveTo(1.04, 0.19, 1.14, 0.16, 1.18, 0.09);
  jam_fillingShape.lineTo(1.17, -0.18);
  jam_fillingShape.bezierCurveTo(0.98, -0.24, 0.82, -0.16, 0.66, -0.23);
  jam_fillingShape.bezierCurveTo(0.49, -0.29, 0.34, -0.18, 0.17, -0.24);
  jam_fillingShape.bezierCurveTo(-0.02, -0.3, -0.17, -0.18, -0.34, -0.24);
  jam_fillingShape.bezierCurveTo(-0.52, -0.3, -0.67, -0.18, -0.82, -0.25);
  jam_fillingShape.bezierCurveTo(-0.98, -0.31, -1.11, -0.26, -1.18, -0.2);
  jam_fillingShape.closePath();

  const jam_fillingGeom = new THREE.ExtrudeGeometry(jam_fillingShape, {
    depth: 0.026,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  const jam_filling = new THREE.Mesh(jam_fillingGeom, jam_fillingMat);
  jam_filling.name = "jam_filling";
  jam_filling.position.z = frontZ + 0.002;
  cake.add(jam_filling);

  const jam_ribbonGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.14, -0.18, frontZ + 0.038),
      new THREE.Vector3(-0.93, -0.2, frontZ + 0.038),
      new THREE.Vector3(-0.7, -0.17, frontZ + 0.038),
      new THREE.Vector3(-0.46, -0.21, frontZ + 0.038),
      new THREE.Vector3(-0.2, -0.18, frontZ + 0.038),
      new THREE.Vector3(0.05, -0.21, frontZ + 0.038),
      new THREE.Vector3(0.31, -0.18, frontZ + 0.038),
      new THREE.Vector3(0.57, -0.21, frontZ + 0.038),
      new THREE.Vector3(0.82, -0.18, frontZ + 0.038),
      new THREE.Vector3(1.12, -0.16, frontZ + 0.038)
    ], false, "centripetal"),
    48,
    0.026,
    8,
    false
  );
  const jam_ribbon = new THREE.Mesh(jam_ribbonGeom, jam_ribbonMat);
  jam_ribbon.name = "jam_ribbon";
  cake.add(jam_ribbon);

  const jam_bulgesGeom = new THREE.SphereGeometry(1, 24, 14);
  const jam_bulgesMat = jam_fillingMat;
  const jam_bulges = new THREE.InstancedMesh(jam_bulgesGeom, jam_bulgesMat, 4);
  jam_bulges.name = "jam_bulges";
  const jam_dummy = new THREE.Object3D();
  const jam_bulge_data = [
    [-0.88, -0.11, 0.25, 0.15, -0.18],
    [-0.39, -0.09, 0.26, 0.16, 0.12],
    [0.1, -0.08, 0.27, 0.17, -0.1],
    [0.69, -0.045, 0.3, 0.19, 0.15]
  ];

  for (let i = 0; i < jam_bulge_data.length; i++) {
    const data = jam_bulge_data[i];
    jam_dummy.position.set(data[0], data[1], frontZ + 0.04);
    jam_dummy.rotation.set(0, 0, data[4]);
    jam_dummy.scale.set(data[2], data[3], 0.045);
    jam_dummy.updateMatrix();
    jam_bulges.setMatrixAt(i, jam_dummy.matrix);
  }
  jam_bulges.instanceMatrix.needsUpdate = true;
  cake.add(jam_bulges);

  const jam_dark_pocketsGeom = new THREE.SphereGeometry(1, 18, 10);
  const jam_dark_pockets = new THREE.InstancedMesh(
    jam_dark_pocketsGeom,
    jam_dark_pocketsMat,
    4
  );
  jam_dark_pockets.name = "jam_dark_pockets";
  const pocket_dummy = new THREE.Object3D();
  const pocket_data = [
    [-0.89, -0.1, 0.12, 0.072],
    [-0.39, -0.075, 0.11, 0.064],
    [0.1, -0.07, 0.12, 0.07],
    [0.69, -0.035, 0.14, 0.08]
  ];

  for (let i = 0; i < pocket_data.length; i++) {
    const data = pocket_data[i];
    pocket_dummy.position.set(data[0], data[1], frontZ + 0.082);
    pocket_dummy.rotation.set(0, 0, i * 0.47 - 0.3);
    pocket_dummy.scale.set(data[2], data[3], 0.012);
    pocket_dummy.updateMatrix();
    jam_dark_pockets.setMatrixAt(i, pocket_dummy.matrix);
  }
  jam_dark_pockets.instanceMatrix.needsUpdate = true;
  cake.add(jam_dark_pockets);

  const jam_dripsGeom = new THREE.SphereGeometry(1, 16, 10);
  const jam_dripsMat = jam_ribbonMat;
  const jam_drips = new THREE.InstancedMesh(jam_dripsGeom, jam_dripsMat, 3);
  jam_drips.name = "jam_drips";
  const drip_dummy = new THREE.Object3D();
  const drip_data = [
    [-0.57, -0.285, 0.025, 0.065],
    [0.31, -0.3, 0.022, 0.085],
    [0.86, -0.27, 0.024, 0.055]
  ];

  for (let i = 0; i < drip_data.length; i++) {
    const data = drip_data[i];
    drip_dummy.position.set(data[0], data[1], frontZ + 0.04);
    drip_dummy.rotation.set(0, 0, 0);
    drip_dummy.scale.set(data[2], data[3], 0.018);
    drip_dummy.updateMatrix();
    jam_drips.setMatrixAt(i, drip_dummy.matrix);
  }
  jam_drips.instanceMatrix.needsUpdate = true;
  cake.add(jam_drips);

  const jam_highlightsGeom = new THREE.CircleGeometry(1, 12);
  const jam_highlights = new THREE.InstancedMesh(
    jam_highlightsGeom,
    jam_highlightMat,
    8
  );
  jam_highlights.name = "jam_highlights";
  const highlight_dummy = new THREE.Object3D();
  const highlight_data = [
    [-0.98, -0.045, 0.035, 0.013, -0.3],
    [-0.76, -0.07, 0.025, 0.01, 0.2],
    [-0.47, -0.025, 0.032, 0.012, -0.2],
    [-0.29, -0.11, 0.022, 0.009, 0.4],
    [0.01, -0.015, 0.035, 0.013, -0.1],
    [0.2, -0.1, 0.023, 0.009, 0.3],
    [0.6, 0.02, 0.038, 0.014, -0.2],
    [0.82, -0.035, 0.026, 0.01, 0.25]
  ];

  for (let i = 0; i < highlight_data.length; i++) {
    const data = highlight_data[i];
    highlight_dummy.position.set(data[0], data[1], frontZ + 0.097);
    highlight_dummy.rotation.set(0, 0, data[4]);
    highlight_dummy.scale.set(data[2], data[3], 1);
    highlight_dummy.updateMatrix();
    jam_highlights.setMatrixAt(i, highlight_dummy.matrix);
  }
  jam_highlights.instanceMatrix.needsUpdate = true;
  cake.add(jam_highlights);

  const jam_stainsGeom = new THREE.CircleGeometry(1, 12);
  const jam_stainsMat = jam_ribbonMat;
  const jam_stains = new THREE.InstancedMesh(jam_stainsGeom, jam_stainsMat, 7);
  jam_stains.name = "jam_stains";
  const stain_dummy = new THREE.Object3D();
  const stain_data = [
    [-1.02, -0.29, 0.035, 0.018],
    [-0.76, -0.3, 0.025, 0.014],
    [-0.43, -0.31, 0.03, 0.015],
    [-0.12, -0.29, 0.024, 0.013],
    [0.2, -0.32, 0.028, 0.015],
    [0.52, -0.3, 0.023, 0.012],
    [0.94, -0.29, 0.032, 0.014]
  ];

  for (let i = 0; i < stain_data.length; i++) {
    const data = stain_data[i];
    stain_dummy.position.set(data[0], data[1], frontZ + 0.025);
    stain_dummy.rotation.set(0, 0, i * 0.61);
    stain_dummy.scale.set(data[2], data[3], 1);
    stain_dummy.updateMatrix();
    jam_stains.setMatrixAt(i, stain_dummy.matrix);
  }
  jam_stains.instanceMatrix.needsUpdate = true;
  cake.add(jam_stains);

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