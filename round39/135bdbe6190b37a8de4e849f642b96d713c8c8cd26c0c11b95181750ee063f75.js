export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_square_table";

  const tableW = 3.6;
  const tableD = 3.6;
  const topBaseY = 2.0;
  const topSurfaceY = 2.198;
  const legH = 1.72;

  const dark_woodMat = new THREE.MeshStandardMaterial({
    color: 0x35140f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const walnut_woodMat = new THREE.MeshStandardMaterial({
    color: 0x6b2c1b,
    metalness: 0.0,
    roughness: 0.6,
  });
  const mahogany_woodMat = new THREE.MeshStandardMaterial({
    color: 0x7b341f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x210d0a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const carvingMat = new THREE.MeshStandardMaterial({
    color: 0x4b2118,
    metalness: 0.0,
    roughness: 0.6,
  });
  const burl_woodMat = new THREE.MeshStandardMaterial({
    color: 0x7f3219,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const burl_darkMat = new THREE.MeshStandardMaterial({
    color: 0x3c160f,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const cream_inlayMat = new THREE.MeshStandardMaterial({
    color: 0xeadfc8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const gold_inlayMat = new THREE.MeshStandardMaterial({
    color: 0xb87a32,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const shell_inlayMat = new THREE.MeshStandardMaterial({
    color: 0xf1f3ee,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const shell_pearlMat = new THREE.MeshStandardMaterial({
    color: 0xd9e6e8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const shell_warmMat = new THREE.MeshStandardMaterial({
    color: 0xead8bd,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const shell_ribMat = new THREE.MeshStandardMaterial({
    color: 0xb9c8ca,
    metalness: 0.0,
    roughness: 0.4,
  });

  function addBox(name, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    root.add(mesh);
    return mesh;
  }

  function makeHorizontal(geometry, material, y) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    return mesh;
  }

  const tabletop_coreGeom = new THREE.BoxGeometry(tableW, 0.18, tableD);
  const tabletop_core = new THREE.Mesh(tabletop_coreGeom, dark_woodMat);
  tabletop_core.name = "tabletop_core";
  tabletop_core.position.y = topBaseY + 0.09;
  root.add(tabletop_core);

  const tabletop_underplateGeom = new THREE.BoxGeometry(3.46, 0.08, 3.46);
  const tabletop_underplate = new THREE.Mesh(tabletop_underplateGeom, mahogany_woodMat);
  tabletop_underplate.name = "tabletop_underplate";
  tabletop_underplate.position.y = 1.99;
  root.add(tabletop_underplate);

  const top_front_frame = addBox(
    "top_front_frame", 3.52, 0.09, 0.38,
    walnut_woodMat, 0, 2.155, 1.61
  );
  const top_back_frame = addBox(
    "top_back_frame", 3.52, 0.09, 0.38,
    walnut_woodMat, 0, 2.155, -1.61
  );
  const top_left_frame = addBox(
    "top_left_frame", 0.38, 0.09, 2.84,
    walnut_woodMat, -1.61, 2.155, 0
  );
  const top_right_frame = addBox(
    "top_right_frame", 0.38, 0.09, 2.84,
    walnut_woodMat, 1.61, 2.155, 0
  );

  const top_front_lip = addBox(
    "top_front_lip", 3.68, 0.05, 0.08,
    dark_woodMat, 0, 2.18, 1.82
  );
  const top_back_lip = addBox(
    "top_back_lip", 3.68, 0.05, 0.08,
    dark_woodMat, 0, 2.18, -1.82
  );
  const top_left_lip = addBox(
    "top_left_lip", 0.08, 0.05, 3.56,
    dark_woodMat, -1.82, 2.18, 0
  );
  const top_right_lip = addBox(
    "top_right_lip", 0.08, 0.05, 3.56,
    dark_woodMat, 1.82, 2.18, 0
  );

  const inset_panelGeom = new THREE.BoxGeometry(2.86, 0.04, 2.86);
  const inset_panel = new THREE.Mesh(inset_panelGeom, burl_woodMat);
  inset_panel.name = "inset_panel";
  inset_panel.position.y = 2.178;
  root.add(inset_panel);

  const inner_front_border = addBox(
    "inner_front_border", 2.9, 0.018, 0.045,
    cream_inlayMat, 0, 2.202, 1.43
  );
  const inner_back_border = addBox(
    "inner_back_border", 2.9, 0.018, 0.045,
    cream_inlayMat, 0, 2.202, -1.43
  );
  const inner_left_border = addBox(
    "inner_left_border", 0.045, 0.018, 2.82,
    cream_inlayMat, -1.43, 2.202, 0
  );
  const inner_right_border = addBox(
    "inner_right_border", 0.045, 0.018, 2.82,
    cream_inlayMat, 1.43, 2.202, 0
  );

  const gold_front_border = addBox(
    "gold_front_border", 2.74, 0.012, 0.025,
    gold_inlayMat, 0, 2.211, 1.375
  );
  const gold_back_border = addBox(
    "gold_back_border", 2.74, 0.012, 0.025,
    gold_inlayMat, 0, 2.211, -1.375
  );
  const gold_left_border = addBox(
    "gold_left_border", 0.025, 0.012, 2.67,
    gold_inlayMat, -1.375, 2.211, 0
  );
  const gold_right_border = addBox(
    "gold_right_border", 0.025, 0.012, 2.67,
    gold_inlayMat, 1.375, 2.211, 0
  );

  const burl_patchGeom = new THREE.CircleGeometry(1, 24);
  const burlPatchData = [
    [-1.08, -1.08, 0.23, 0.10, 0.20],
    [-0.62, -1.18, 0.18, 0.08, -0.45],
    [0.62, -1.18, 0.20, 0.09, 0.38],
    [1.08, -1.08, 0.22, 0.10, -0.18],
    [-1.18, -0.52, 0.16, 0.08, 0.72],
    [1.18, -0.52, 0.17, 0.08, -0.72],
    [-1.17, 0.58, 0.21, 0.09, 0.48],
    [1.17, 0.58, 0.20, 0.09, -0.48],
    [-0.72, 1.16, 0.20, 0.08, -0.25],
    [0.72, 1.16, 0.20, 0.08, 0.25],
    [-0.95, 0.88, 0.16, 0.07, 0.15],
    [0.95, 0.88, 0.16, 0.07, -0.15],
  ];
  const burl_patches = new THREE.InstancedMesh(
    burl_patchGeom, burl_darkMat, burlPatchData.length
  );
  burl_patches.name = "burl_patches";
  const burl_dummy = new THREE.Object3D();
  for (let i = 0; i < burlPatchData.length; i++) {
    const data = burlPatchData[i];
    burl_dummy.position.set(data[0], topSurfaceY + 0.002, data[1]);
    burl_dummy.rotation.set(-Math.PI / 2, 0, data[4]);
    burl_dummy.scale.set(data[2], data[3], 1);
    burl_dummy.updateMatrix();
    burl_patches.setMatrixAt(i, burl_dummy.matrix);
  }
  burl_patches.instanceMatrix.needsUpdate = true;
  root.add(burl_patches);

  const burl_veins = new THREE.Group();
  burl_veins.name = "burl_veins";
  const veinPaths = [
    [[-1.25, -1.12], [-1.02, -1.02], [-0.82, -1.12], [-0.58, -1.02]],
    [[0.58, -1.02], [0.82, -1.12], [1.02, -1.02], [1.25, -1.12]],
    [[-1.22, 0.62], [-1.04, 0.76], [-0.88, 0.68], [-0.68, 0.82]],
    [[0.68, 0.82], [0.88, 0.68], [1.04, 0.76], [1.22, 0.62]],
    [[-1.08, 1.17], [-0.86, 1.08], [-0.66, 1.18], [-0.46, 1.10]],
    [[0.46, 1.10], [0.66, 1.18], [0.86, 1.08], [1.08, 1.17]],
  ];
  for (let i = 0; i < veinPaths.length; i++) {
    const points = [];
    for (let j = 0; j < veinPaths[i].length; j++) {
      points.push(new THREE.Vector3(
        veinPaths[i][j][0],
        topSurfaceY + 0.005,
        veinPaths[i][j][1]
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const veinGeom = new THREE.TubeGeometry(curve, 18, 0.008, 6, false);
    const vein = new THREE.Mesh(veinGeom, gold_inlayMat);
    vein.name = "burl_vein_" + i;
    burl_veins.add(vein);
  }
  root.add(burl_veins);

  const corner_accentShape = new THREE.Shape();
  corner_accentShape.moveTo(0, 0.11);
  corner_accentShape.bezierCurveTo(0.035, 0.045, 0.095, 0.035, 0.14, 0);
  corner_accentShape.bezierCurveTo(0.095, -0.035, 0.035, -0.045, 0, -0.11);
  corner_accentShape.bezierCurveTo(-0.035, -0.045, -0.095, -0.035, -0.14, 0);
  corner_accentShape.bezierCurveTo(-0.095, 0.035, -0.035, 0.045, 0, 0.11);
  const corner_accentGeom = new THREE.ShapeGeometry(corner_accentShape);
  const corner_accents = new THREE.InstancedMesh(
    corner_accentGeom, gold_inlayMat, 4
  );
  corner_accents.name = "corner_accents";
  const corner_dummy = new THREE.Object3D();
  const cornerPositions = [
    [-1.25, -1.25, 0],
    [1.25, -1.25, Math.PI / 2],
    [1.25, 1.25, Math.PI],
    [-1.25, 1.25, -Math.PI / 2],
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    corner_dummy.position.set(
      cornerPositions[i][0],
      topSurfaceY + 0.007,
      cornerPositions[i][1]
    );
    corner_dummy.rotation.set(-Math.PI / 2, 0, cornerPositions[i][2]);
    corner_dummy.scale.set(1, 1, 1);
    corner_dummy.updateMatrix();
    corner_accents.setMatrixAt(i, corner_dummy.matrix);
  }
  corner_accents.instanceMatrix.needsUpdate = true;
  root.add(corner_accents);

  const shell_petalShape = new THREE.Shape();
  shell_petalShape.moveTo(0, 0.035);
  shell_petalShape.bezierCurveTo(0.11, 0.12, 0.22, 0.38, 0.19, 0.58);
  shell_petalShape.bezierCurveTo(0.16, 0.75, 0.07, 0.86, 0, 0.9);
  shell_petalShape.bezierCurveTo(-0.07, 0.86, -0.16, 0.75, -0.19, 0.58);
  shell_petalShape.bezierCurveTo(-0.22, 0.38, -0.11, 0.12, 0, 0.035);
  const shell_petalGeom = new THREE.ShapeGeometry(shell_petalShape);

  const central_flower_petals = new THREE.InstancedMesh(
    shell_petalGeom, shell_inlayMat, 8
  );
  central_flower_petals.name = "central_flower_petals";
  const petal_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const lengthScale = i % 2 === 0 ? 1.0 : 0.94;
    const widthScale = 1.08 + (i % 3) * 0.035;
    petal_dummy.position.set(0, topSurfaceY + 0.009, 0);
    petal_dummy.rotation.set(-Math.PI / 2, 0, angle);
    petal_dummy.scale.set(widthScale, lengthScale, 1);
    petal_dummy.updateMatrix();
    central_flower_petals.setMatrixAt(i, petal_dummy.matrix);
  }
  central_flower_petals.instanceMatrix.needsUpdate = true;
  root.add(central_flower_petals);

  const outer_flower_petals = new THREE.InstancedMesh(
    shell_petalGeom, shell_inlayMat, 8
  );
  outer_flower_petals.name = "outer_flower_petals";
  for (let i = 0; i < 8; i++) {
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    const lengthScale = i % 2 === 0 ? 0.72 : 0.68;
    const widthScale = 0.84 + (i % 2) * 0.06;
    petal_dummy.position.set(0, topSurfaceY + 0.006, 0);
    petal_dummy.rotation.set(-Math.PI / 2, 0, angle);
    petal_dummy.scale.set(widthScale, lengthScale, 1);
    petal_dummy.updateMatrix();
    outer_flower_petals.setMatrixAt(i, petal_dummy.matrix);
  }
  outer_flower_petals.instanceMatrix.needsUpdate = true;
  root.add(outer_flower_petals);

  const shell_patchGeom = new THREE.CircleGeometry(1, 20);
  const pearlPatchData = [
    [0, 0.49, 0.055, 0.13, 0],
    [Math.PI, 0.51, 0.05, 0.12, 0],
    [Math.PI * 2, 0.56, 0.045, 0.11, 0],
    [Math.PI * 3, 0.48, 0.052, 0.12, 0],
    [Math.PI * 0.5, 0.53, 0.05, 0.12, 0],
    [Math.PI * 1.5, 0.55, 0.048, 0.11, 0],
  ];
  const warmPatchData = [
    [Math.PI * 0.25, 0.58, 0.045, 0.1, 0],
    [Math.PI * 0.75, 0.48, 0.04, 0.11, 0],
    [Math.PI * 1.25, 0.61, 0.047, 0.1, 0],
    [Math.PI * 1.75, 0.52, 0.042, 0.1, 0],
  ];

  const central_pearl_patches = new THREE.InstancedMesh(
    shell_patchGeom, shell_pearlMat, pearlPatchData.length
  );
  central_pearl_patches.name = "central_pearl_patches";
  const patch_dummy = new THREE.Object3D();
  for (let i = 0; i < pearlPatchData.length; i++) {
    const data = pearlPatchData[i];
    patch_dummy.position.set(
      Math.sin(data[0]) * data[1],
      topSurfaceY + 0.012,
      Math.cos(data[0]) * data[1]
    );
    patch_dummy.rotation.set(-Math.PI / 2, 0, data[0]);
    patch_dummy.scale.set(data[2], data[3], 1);
    patch_dummy.updateMatrix();
    central_pearl_patches.setMatrixAt(i, patch_dummy.matrix);
  }
  central_pearl_patches.instanceMatrix.needsUpdate = true;
  root.add(central_pearl_patches);

  const central_warm_patches = new THREE.InstancedMesh(
    shell_patchGeom, shell_warmMat, warmPatchData.length
  );
  central_warm_patches.name = "central_warm_patches";
  for (let i = 0; i < warmPatchData.length; i++) {
    const data = warmPatchData[i];
    patch_dummy.position.set(
      Math.sin(data[0]) * data[1],
      topSurfaceY + 0.013,
      Math.cos(data[0]) * data[1]
    );
    patch_dummy.rotation.set(-Math.PI / 2, 0, data[0]);
    patch_dummy.scale.set(data[2], data[3], 1);
    patch_dummy.updateMatrix();
    central_warm_patches.setMatrixAt(i, patch_dummy.matrix);
  }
  central_warm_patches.instanceMatrix.needsUpdate = true;
  root.add(central_warm_patches);

  const central_ribGeom = new THREE.BoxGeometry(0.012, 0.006, 0.5);
  const central_petal_ribs = new THREE.InstancedMesh(
    central_ribGeom, shell_ribMat, 8
  );
  central_petal_ribs.name = "central_petal_ribs";
  const rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const lengthScale = i % 2 === 0 ? 1.0 : 0.94;
    rib_dummy.position.set(
      Math.sin(angle) * 0.43 * lengthScale,
      topSurfaceY + 0.016,
      Math.cos(angle) * 0.43 * lengthScale
    );
    rib_dummy.rotation.set(0, angle, 0);
    rib_dummy.scale.set(1, 1, lengthScale);
    rib_dummy.updateMatrix();
    central_petal_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  central_petal_ribs.instanceMatrix.needsUpdate = true;
  root.add(central_petal_ribs);

  const secondary_ribGeom = new THREE.BoxGeometry(0.008, 0.005, 0.34);
  const central_secondary_ribs = new THREE.InstancedMesh(
    secondary_ribGeom, shell_ribMat, 16
  );
  central_secondary_ribs.name = "central_secondary_ribs";
  let secondaryIndex = 0;
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const lengthScale = i % 2 === 0 ? 1.0 : 0.94;
    for (const side of [-1, 1]) {
      const sideAngle = angle + side * 0.16;
      rib_dummy.position.set(
        Math.sin(sideAngle) * 0.43 * lengthScale,
        topSurfaceY + 0.015,
        Math.cos(sideAngle) * 0.43 * lengthScale
      );
      rib_dummy.rotation.set(0, sideAngle, 0);
      rib_dummy.scale.set(1, 1, lengthScale);
      rib_dummy.updateMatrix();
      central_secondary_ribs.setMatrixAt(secondaryIndex, rib_dummy.matrix);
      secondaryIndex++;
    }
  }
  central_secondary_ribs.instanceMatrix.needsUpdate = true;
  root.add(central_secondary_ribs);

  const outer_shell_inlays = new THREE.InstancedMesh(
    shell_petalGeom, shell_inlayMat, 8
  );
  outer_shell_inlays.name = "outer_shell_inlays";
  const outer_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const radius = i % 2 === 0 ? 1.02 : 0.97;
    outer_dummy.position.set(
      Math.sin(angle) * radius,
      topSurfaceY + 0.006,
      Math.cos(angle) * radius
    );
    outer_dummy.rotation.set(-Math.PI / 2, 0, angle);
    outer_dummy.scale.set(0.58, 0.47, 1);
    outer_dummy.updateMatrix();
    outer_shell_inlays.setMatrixAt(i, outer_dummy.matrix);
  }
  outer_shell_inlays.instanceMatrix.needsUpdate = true;
  root.add(outer_shell_inlays);

  const outer_ribGeom = new THREE.BoxGeometry(0.009, 0.005, 0.22);
  const outer_petal_ribs = new THREE.InstancedMesh(
    outer_ribGeom, shell_ribMat, 8
  );
  outer_petal_ribs.name = "outer_petal_ribs";
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    const radius = i % 2 === 0 ? 1.02 : 0.97;
    rib_dummy.position.set(
      Math.sin(angle) * radius,
      topSurfaceY + 0.011,
      Math.cos(angle) * radius
    );
    rib_dummy.rotation.set(0, angle, 0);
    rib_dummy.scale.set(1, 1, 1);
    rib_dummy.updateMatrix();
    outer_petal_ribs.setMatrixAt(i, rib_dummy.matrix);
  }
  outer_petal_ribs.instanceMatrix.needsUpdate = true;
  root.add(outer_petal_ribs);

  const corner_shell_inlays = new THREE.InstancedMesh(
    shell_petalGeom, shell_inlayMat, 4
  );
  corner_shell_inlays.name = "corner_shell_inlays";
  const cornerShellData = [
    [-1.03, -1.03, Math.PI * 0.75],
    [1.03, -1.03, Math.PI * 0.25],
    [1.03, 1.03, Math.PI * 0.75],
    [-1.03, 1.03, Math.PI * 1.25],
  ];
  for (let i = 0; i < cornerShellData.length; i++) {
    const data = cornerShellData[i];
    outer_dummy.position.set(data[0], topSurfaceY + 0.006, data[1]);
    outer_dummy.rotation.set(-Math.PI / 2, 0, data[2]);
    outer_dummy.scale.set(0.48, 0.42, 1);
    outer_dummy.updateMatrix();
    corner_shell_inlays.setMatrixAt(i, outer_dummy.matrix);
  }
  corner_shell_inlays.instanceMatrix.needsUpdate = true;
  root.add(corner_shell_inlays);

  const central_flower_centerGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.018, 24);
  const central_flower_center = new THREE.Mesh(
    central_flower_centerGeom, shell_pearlMat
  );
  central_flower_center.name = "central_flower_center";
  central_flower_center.position.y = topSurfaceY + 0.018;
  root.add(central_flower_center);

  const central_gold_ringGeom = new THREE.TorusGeometry(0.115, 0.012, 8, 28);
  const central_gold_ring = makeHorizontal(
    central_gold_ringGeom, gold_inlayMat, topSurfaceY + 0.02
  );
  central_gold_ring.name = "central_gold_ring";
  root.add(central_gold_ring);

  const central_dark_pinGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.022, 16);
  const central_dark_pin = new THREE.Mesh(central_dark_pinGeom, recessMat);
  central_dark_pin.name = "central_dark_pin";
  central_dark_pin.position.y = topSurfaceY + 0.025;
  root.add(central_dark_pin);

  const apronY = 1.76;
  const apronH = 0.42;
  const apronFrontZ = 1.5;
  const apronSideX = 1.5;

  const front_apron = addBox(
    "front_apron", 2.82, apronH, 0.14,
    dark_woodMat, 0, apronY, apronFrontZ
  );
  const back_apron = addBox(
    "back_apron", 2.82, apronH, 0.14,
    dark_woodMat, 0, apronY, -apronFrontZ
  );
  const left_apron = addBox(
    "left_apron", 0.14, apronH, 2.82,
    dark_woodMat, -apronSideX, apronY, 0
  );
  const right_apron = addBox(
    "right_apron", 0.14, apronH, 2.82,
    dark_woodMat, apronSideX, apronY, 0
  );

  const front_apron_panel = addBox(
    "front_apron_panel", 2.62, 0.25, 0.025,
    mahogany_woodMat, 0, apronY, apronFrontZ + 0.078
  );
  const back_apron_panel = addBox(
    "back_apron_panel", 2.62, 0.25, 0.025,
    mahogany_woodMat, 0, apronY, -apronFrontZ - 0.078
  );
  const left_apron_panel = addBox(
    "left_apron_panel", 0.025, 0.25, 2.62,
    mahogany_woodMat, -apronSideX - 0.078, apronY, 0
  );
  const right_apron_panel = addBox(
    "right_apron_panel", 0.025, 0.25, 2.62,
    mahogany_woodMat, apronSideX + 0.078, apronY, 0
  );

  const front_upper_rail = addBox(
    "front_upper_rail", 3.25, 0.07, 0.11,
    walnut_woodMat, 0, 1.985, 1.69
  );
  const back_upper_rail = addBox(
    "back_upper_rail", 3.25, 0.07, 0.11,
    walnut_woodMat, 0, 1.985, -1.69
  );
  const left_upper_rail = addBox(
    "left_upper_rail", 0.11, 0.07, 3.25,
    walnut_woodMat, -1.69, 1.985, 0
  );
  const right_upper_rail = addBox(
    "right_upper_rail", 0.11, 0.07, 3.25,
    walnut_woodMat, 1.69, 1.985, 0
  );

  const front_lower_rail = addBox(
    "front_lower_rail", 3.08, 0.075, 0.1,
    walnut_woodMat, 0, 1.525, 1.61
  );
  const back_lower_rail = addBox(
    "back_lower_rail", 3.08, 0.075, 0.1,
    walnut_woodMat, 0, 1.525, -1.61
  );
  const left_lower_rail = addBox(
    "left_lower_rail", 0.1, 0.075, 3.08,
    walnut_woodMat, -1.61, 1.525, 0
  );
  const right_lower_rail = addBox(
    "right_lower_rail", 0.1, 0.075, 3.08,
    walnut_woodMat, 1.61, 1.525, 0
  );

  const legPositions = [
    [-1.45, 1.45],
    [1.45, 1.45],
    [-1.45, -1.45],
    [1.45, -1.45],
  ];

  const leg_mountGeom = new THREE.BoxGeometry(0.5, 0.16, 0.5);
  const leg_mounts = new THREE.InstancedMesh(
    leg_mountGeom, walnut_woodMat, legPositions.length
  );
  leg_mounts.name = "leg_mounts";
  const leg_dummy = new THREE.Object3D();
  for (let i = 0; i < legPositions.length; i++) {
    leg_dummy.position.set(legPositions[i][0], 1.88, legPositions[i][1]);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    leg_mounts.setMatrixAt(i, leg_dummy.matrix);
  }
  leg_mounts.instanceMatrix.needsUpdate = true;
  root.add(leg_mounts);

  const leg_shaftGeom = new THREE.CylinderGeometry(
    0.31, 0.22, legH, 4, 1, false
  );
  const leg_shafts = new THREE.InstancedMesh(
    leg_shaftGeom, dark_woodMat, legPositions.length
  );
  leg_shafts.name = "leg_shafts";
  for (let i = 0; i < legPositions.length; i++) {
    leg_dummy.position.set(legPositions[i][0], 0.9, legPositions[i][1]);
    leg_dummy.rotation.set(0, Math.PI / 4, 0);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    leg_shafts.setMatrixAt(i, leg_dummy.matrix);
  }
  leg_shafts.instanceMatrix.needsUpdate = true;
  root.add(leg_shafts);

  const leg_recessGeom = new THREE.BoxGeometry(0.115, 1.16, 0.012);
  const leg_recesses = new THREE.InstancedMesh(
    leg_recessGeom, recessMat, legPositions.length * 4
  );
  leg_recesses.name = "leg_recesses";
  let legFaceIndex = 0;
  for (let i = 0; i < legPositions.length; i++) {
    const x = legPositions[i][0];
    const z = legPositions[i][1];
    for (const faceSign of [-1, 1]) {
      leg_dummy.position.set(x, 0.88, z + faceSign * 0.205);
      leg_dummy.rotation.set(0, faceSign > 0 ? 0 : Math.PI, 0);
      leg_dummy.scale.set(1, 1, 1);
      leg_dummy.updateMatrix();
      leg_recesses.setMatrixAt(legFaceIndex++, leg_dummy.matrix);

      leg_dummy.position.set(x + faceSign * 0.205, 0.88, z);
      leg_dummy.rotation.set(0, faceSign > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
      leg_dummy.scale.set(1, 1, 1);
      leg_dummy.updateMatrix();
      leg_recesses.setMatrixAt(legFaceIndex++, leg_dummy.matrix);
    }
  }
  leg_recesses.instanceMatrix.needsUpdate = true;
  root.add(leg_recesses);

  const leg_grooveGeom = new THREE.BoxGeometry(0.018, 1.08, 0.016);
  const leg_grooves = new THREE.InstancedMesh(
    leg_grooveGeom, mahogany_woodMat, legPositions.length * 8
  );
  leg_grooves.name = "leg_grooves";
  let grooveIndex = 0;
  for (let i = 0; i < legPositions.length; i++) {
    const x = legPositions[i][0];
    const z = legPositions[i][1];
    for (const faceSign of [-1, 1]) {
      for (const offset of [-0.085, 0.085]) {
        leg_dummy.position.set(x + offset, 0.88, z + faceSign * 0.213);
        leg_dummy.rotation.set(0, faceSign > 0 ? 0 : Math.PI, 0);
        leg_dummy.scale.set(1, 1, 1);
        leg_dummy.updateMatrix();
        leg_grooves.setMatrixAt(grooveIndex++, leg_dummy.matrix);

        leg_dummy.position.set(x + faceSign * 0.213, 0.88, z + offset);
        leg_dummy.rotation.set(0, faceSign > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
        leg_dummy.scale.set(1, 1, 1);
        leg_dummy.updateMatrix();
        leg_grooves.setMatrixAt(grooveIndex++, leg_dummy.matrix);
      }
    }
  }
  leg_grooves.instanceMatrix.needsUpdate = true;
  root.add(leg_grooves);

  const leg_footGeom = new THREE.BoxGeometry(0.34, 0.1, 0.34);
  const leg_feet = new THREE.InstancedMesh(
    leg_footGeom, dark_woodMat, legPositions.length
  );
  leg_feet.name = "leg_feet";
  for (let i = 0; i < legPositions.length; i++) {
    leg_dummy.position.set(legPositions[i][0], 0.05, legPositions[i][1]);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    leg_feet.setMatrixAt(i, leg_dummy.matrix);
  }
  leg_feet.instanceMatrix.needsUpdate = true;
  root.add(leg_feet);

  const blockPositions = [
    [0, 1.48, apronFrontZ, 0],
    [0, 1.48, -apronFrontZ, 0],
    [apronSideX, 1.48, 0, Math.PI / 2],
    [-apronSideX, 1.48, 0, Math.PI / 2],
  ];

  const block_mountGeom = new THREE.BoxGeometry(0.56, 0.52, 0.56);
  const block_mounts = new THREE.InstancedMesh(
    block_mountGeom, dark_woodMat, blockPositions.length
  );
  block_mounts.name = "block_mounts";
  const block_dummy = new THREE.Object3D();
  for (let i = 0; i < blockPositions.length; i++) {
    block_dummy.position.set(
      blockPositions[i][0],
      blockPositions[i][1],
      blockPositions[i][2]
    );
    block_dummy.rotation.set(0, blockPositions[i][3], 0);
    block_dummy.scale.set(1, 1, 1);
    block_dummy.updateMatrix();
    block_mounts.setMatrixAt(i, block_dummy.matrix);
  }
  block_mounts.instanceMatrix.needsUpdate = true;
  root.add(block_mounts);

  const block_faceGeom = new THREE.BoxGeometry(0.46, 0.42, 0.024);
  const block_faces = new THREE.InstancedMesh(
    block_faceGeom, recessMat, blockPositions.length
  );
  block_faces.name = "block_faces";
  for (let i = 0; i < blockPositions.length; i++) {
    const rotationY = blockPositions[i][3];
    const nx = Math.sin(rotationY) * 0.292;
    const nz = Math.cos(rotationY) * 0.292;
    block_dummy.position.set(
      blockPositions[i][0] + nx,
      blockPositions[i][1],
      blockPositions[i][2] + nz
    );
    block_dummy.rotation.set(0, rotationY, 0);
    block_dummy.scale.set(1, 1, 1);
    block_dummy.updateMatrix();
    block_faces.setMatrixAt(i, block_dummy.matrix);
  }
  block_faces.instanceMatrix.needsUpdate = true;
  root.add(block_faces);

  const block_petalGeom = new THREE.SphereGeometry(1, 12, 8);
  const carved_block_petals = new THREE.InstancedMesh(
    block_petalGeom, carvingMat, blockPositions.length * 6
  );
  carved_block_petals.name = "carved_block_petals";
  let blockPetalIndex = 0;
  const local_z_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < blockPositions.length; i++) {
    const rotationY = blockPositions[i][3];
    const centerX = blockPositions[i][0];
    const centerY = blockPositions[i][1];
    const centerZ = blockPositions[i][2];
    const nx = Math.sin(rotationY) * 0.306;
    const nz = Math.cos(rotationY) * 0.306;
    const normal = new THREE.Vector3(Math.sin(rotationY), 0, Math.cos(rotationY));
    const baseQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0), rotationY
    );
    for (let p = 0; p < 6; p++) {
      const angle = p / 6 * Math.PI * 2;
      const tangentOffset = new THREE.Vector3(
        Math.cos(angle) * 0.12,
        Math.sin(angle) * 0.12,
        0
      ).applyQuaternion(baseQuaternion);
      const localRotation = new THREE.Quaternion().setFromAxisAngle(
        local_z_axis, angle - Math.PI / 2
      );
      block_dummy.position.set(
        centerX + nx + tangentOffset.x,
        centerY + tangentOffset.y,
        centerZ + nz + tangentOffset.z
      );
      block_dummy.quaternion.copy(baseQuaternion).multiply(localRotation);
      block_dummy.scale.set(0.036, 0.09, 0.018);
      block_dummy.updateMatrix();
      carved_block_petals.setMatrixAt(blockPetalIndex++, block_dummy.matrix);
    }
  }
  carved_block_petals.instanceMatrix.needsUpdate = true;
  root.add(carved_block_petals);

  const carved_block_centerGeom = new THREE.SphereGeometry(1, 12, 8);
  const carved_block_centers = new THREE.InstancedMesh(
    carved_block_centerGeom, carvingMat, blockPositions.length
  );
  carved_block_centers.name = "carved_block_centers";
  for (let i = 0; i < blockPositions.length; i++) {
    const rotationY = blockPositions[i][3];
    const nx = Math.sin(rotationY) * 0.31;
    const nz = Math.cos(rotationY) * 0.31;
    block_dummy.position.set(
      blockPositions[i][0] + nx,
      blockPositions[i][1],
      blockPositions[i][2] + nz
    );
    block_dummy.rotation.set(0, rotationY, 0);
    block_dummy.scale.set(0.055, 0.055, 0.022);
    block_dummy.updateMatrix();
    carved_block_centers.setMatrixAt(i, block_dummy.matrix);
  }
  carved_block_centers.instanceMatrix.needsUpdate = true;
  root.add(carved_block_centers);

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