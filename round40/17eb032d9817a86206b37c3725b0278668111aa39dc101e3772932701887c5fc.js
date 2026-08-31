export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "quill_pen_and_stand";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc9a35a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const antiqueGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8b642b,
    metalness: 0.6,
    roughness: 0.5,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xb9ad9d,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const featherLightMat = new THREE.MeshStandardMaterial({
    color: 0xd8d0c4,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
  });
  const featherDarkMat = new THREE.MeshStandardMaterial({
    color: 0x94887a,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.66,
    side: THREE.DoubleSide,
  });
  const featherLineMat = new THREE.LineBasicMaterial({
    color: 0x817568,
    transparent: true,
    opacity: 0.58,
  });
  const downMat = new THREE.LineBasicMaterial({
    color: 0xd7d1c7,
    transparent: true,
    opacity: 0.64,
  });
  const downCurveMat = new THREE.MeshStandardMaterial({
    color: 0xe1dbd1,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.42,
  });

  const pedestal = new THREE.Group();
  pedestal.name = "pedestal";
  pedestal.position.set(0.04, 0, 0.03);
  root.add(pedestal);

  const pedestal_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.27, 0.00),
    new THREE.Vector2(0.31, 0.025),
    new THREE.Vector2(0.32, 0.060),
    new THREE.Vector2(0.30, 0.105),
    new THREE.Vector2(0.25, 0.165),
    new THREE.Vector2(0.20, 0.235),
    new THREE.Vector2(0.16, 0.300),
    new THREE.Vector2(0.13, 0.340),
    new THREE.Vector2(0.00, 0.340),
  ];
  const pedestal_baseGeom = new THREE.LatheGeometry(pedestal_baseProfile, 48);
  const pedestal_base = new THREE.Mesh(pedestal_baseGeom, goldMat);
  pedestal_base.name = "pedestal_base";
  pedestal.add(pedestal_base);

  const pedestal_neckProfile = [
    new THREE.Vector2(0.00, 0.300),
    new THREE.Vector2(0.13, 0.300),
    new THREE.Vector2(0.145, 0.345),
    new THREE.Vector2(0.125, 0.395),
    new THREE.Vector2(0.105, 0.430),
    new THREE.Vector2(0.105, 0.500),
    new THREE.Vector2(0.135, 0.535),
    new THREE.Vector2(0.145, 0.575),
    new THREE.Vector2(0.13, 0.610),
    new THREE.Vector2(0.00, 0.610),
  ];
  const pedestal_neckGeom = new THREE.LatheGeometry(pedestal_neckProfile, 48);
  const pedestal_neck = new THREE.Mesh(pedestal_neckGeom, goldMat);
  pedestal_neck.name = "pedestal_neck";
  pedestal.add(pedestal_neck);

  const pedestal_bottom_rimGeom = new THREE.TorusGeometry(0.295, 0.012, 8, 48);
  const pedestal_bottom_rim = new THREE.Mesh(pedestal_bottom_rimGeom, goldMat);
  pedestal_bottom_rim.name = "pedestal_bottom_rim";
  pedestal_bottom_rim.rotation.x = Math.PI / 2;
  pedestal_bottom_rim.position.y = 0.035;
  pedestal.add(pedestal_bottom_rim);

  const pedestal_lower_bandGeom = new THREE.TorusGeometry(0.245, 0.006, 6, 48);
  const pedestal_lower_band = new THREE.Mesh(pedestal_lower_bandGeom, antiqueGoldMat);
  pedestal_lower_band.name = "pedestal_lower_band";
  pedestal_lower_band.rotation.x = Math.PI / 2;
  pedestal_lower_band.position.y = 0.165;
  pedestal.add(pedestal_lower_band);

  const pedestal_shoulder_bandGeom = new THREE.TorusGeometry(0.155, 0.008, 6, 40);
  const pedestal_shoulder_band = new THREE.Mesh(pedestal_shoulder_bandGeom, antiqueGoldMat);
  pedestal_shoulder_band.name = "pedestal_shoulder_band";
  pedestal_shoulder_band.rotation.x = Math.PI / 2;
  pedestal_shoulder_band.position.y = 0.325;
  pedestal.add(pedestal_shoulder_band);

  const pedestal_top_rimGeom = new THREE.TorusGeometry(0.132, 0.011, 8, 40);
  const pedestal_top_rim = new THREE.Mesh(pedestal_top_rimGeom, goldMat);
  pedestal_top_rim.name = "pedestal_top_rim";
  pedestal_top_rim.rotation.x = Math.PI / 2;
  pedestal_top_rim.position.y = 0.592;
  pedestal.add(pedestal_top_rim);

  const pedestal_top_insetGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.008, 40);
  const pedestal_top_inset = new THREE.Mesh(pedestal_top_insetGeom, antiqueGoldMat);
  pedestal_top_inset.name = "pedestal_top_inset";
  pedestal_top_inset.position.y = 0.614;
  pedestal.add(pedestal_top_inset);

  const pedestal_scrollwork = new THREE.Group();
  pedestal_scrollwork.name = "pedestal_scrollwork";
  pedestal.add(pedestal_scrollwork);

  function pedestalRadiusAt(y) {
    if (y < 0.08) return 0.305;
    if (y < 0.17) return 0.305 - (y - 0.08) * 0.55;
    if (y < 0.28) return 0.255 - (y - 0.17) * 0.68;
    return 0.17 - (y - 0.28) * 0.45;
  }

  function pedestalSurfacePoint(x, y, extra) {
    const radius = pedestalRadiusAt(y);
    const z = Math.sqrt(Math.max(radius * radius - x * x, 0)) + extra;
    return new THREE.Vector3(x, y, z);
  }

  function createPedestalScroll(name, points) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 24, 0.006, 6, false);
    const mesh = new THREE.Mesh(geom, antiqueGoldMat);
    mesh.name = name;
    pedestal_scrollwork.add(mesh);
    return mesh;
  }

  const pedestal_scroll_left = createPedestalScroll("pedestal_scroll_left", [
    pedestalSurfacePoint(-0.17, 0.115, 0.008),
    pedestalSurfacePoint(-0.145, 0.180, 0.008),
    pedestalSurfacePoint(-0.095, 0.225, 0.008),
    pedestalSurfacePoint(-0.045, 0.205, 0.008),
    pedestalSurfacePoint(-0.025, 0.155, 0.008),
    pedestalSurfacePoint(-0.060, 0.125, 0.008),
    pedestalSurfacePoint(-0.105, 0.145, 0.008),
  ]);

  const pedestal_scroll_right = createPedestalScroll("pedestal_scroll_right", [
    pedestalSurfacePoint(-0.045, 0.115, 0.009),
    pedestalSurfacePoint(0.005, 0.165, 0.009),
    pedestalSurfacePoint(0.055, 0.220, 0.009),
    pedestalSurfacePoint(0.115, 0.235, 0.009),
    pedestalSurfacePoint(0.155, 0.195, 0.009),
    pedestalSurfacePoint(0.145, 0.145, 0.009),
    pedestalSurfacePoint(0.105, 0.125, 0.009),
  ]);

  const pedestal_scroll_lower = createPedestalScroll("pedestal_scroll_lower", [
    pedestalSurfacePoint(-0.125, 0.095, 0.009),
    pedestalSurfacePoint(-0.065, 0.125, 0.009),
    pedestalSurfacePoint(0.005, 0.105, 0.009),
    pedestalSurfacePoint(0.075, 0.120, 0.009),
    pedestalSurfacePoint(0.145, 0.095, 0.009),
  ]);

  const pedestal_leafGeom = new THREE.SphereGeometry(0.04, 14, 8);
  const pedestal_leaf_left = new THREE.Mesh(pedestal_leafGeom, antiqueGoldMat);
  pedestal_leaf_left.name = "pedestal_leaf_left";
  pedestal_leaf_left.position.copy(pedestalSurfacePoint(-0.145, 0.145, 0.012));
  pedestal_leaf_left.scale.set(0.55, 1.25, 0.18);
  pedestal_leaf_left.rotation.z = -0.65;
  pedestal_scrollwork.add(pedestal_leaf_left);

  const pedestal_leaf_right = new THREE.Mesh(pedestal_leafGeom, antiqueGoldMat);
  pedestal_leaf_right.name = "pedestal_leaf_right";
  pedestal_leaf_right.position.copy(pedestalSurfacePoint(0.105, 0.175, 0.012));
  pedestal_leaf_right.scale.set(0.55, 1.25, 0.18);
  pedestal_leaf_right.rotation.z = 0.72;
  pedestal_scrollwork.add(pedestal_leaf_right);

  const quill = new THREE.Group();
  quill.name = "quill";
  quill.position.set(-0.10, 0.64, 0.02);
  quill.rotation.z = -0.56;
  root.add(quill);

  const feather = new THREE.Group();
  feather.name = "feather";
  quill.add(feather);

  function createVaneGeometry(
    side,
    startY,
    endY,
    maxWidth,
    count,
    gapStart,
    gapEnd,
    gapWidth,
    edgeDrop
  ) {
    const shape = new THREE.Shape();
    shape.moveTo(0, startY);
    shape.lineTo(side * maxWidth * 0.20, startY + (endY - startY) * 0.055);

    for (let i = 1; i <= count; i++) {
      const t = i / count;
      const y = startY + (endY - startY) * t;
      const envelope = Math.pow(Math.sin(Math.PI * t), 0.72);
      const taper = 1 - t * 0.08;
      let width = maxWidth * envelope * taper;
      const notch =
        i % 7 === 3 ||
        i % 11 === 5 ||
        (i >= gapStart && i <= gapEnd);
      if (notch) width *= 0.61;
      if (i === count) width = 0.004;
      shape.lineTo(side * width, y);
    }

    for (let i = count - 1; i >= 0; i--) {
      const t = i / count;
      const y = startY + (endY - startY) * t;
      const envelope = Math.pow(Math.sin(Math.PI * t), 0.72);
      const taper = 1 - t * 0.08;
      let width = maxWidth * envelope * taper;
      width *= 1 - edgeDrop * Math.pow(Math.sin(Math.PI * t), 0.5);
      if (i % 9 === 4) width *= 0.76;
      shape.lineTo(side * width, y);
    }

    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const left_vaneGeom = createVaneGeometry(
    -1, 0.46, 2.90, 0.48, 58, 18, 21, 34, 0.10
  );
  const left_vane = new THREE.Mesh(left_vaneGeom, featherMat);
  left_vane.name = "left_vane";
  left_vane.position.z = -0.004;
  feather.add(left_vane);

  const right_vaneGeom = createVaneGeometry(
    1, 0.46, 2.90, 0.42, 58, 27, 30, 39, 0.13
  );
  const right_vane = new THREE.Mesh(right_vaneGeom, featherMat);
  right_vane.name = "right_vane";
  right_vane.position.z = -0.004;
  feather.add(right_vane);

  const left_lower_vaneGeom = createVaneGeometry(
    -1, 0.49, 1.68, 0.37, 28, 8, 10, 17, 0.18
  );
  const left_lower_vane = new THREE.Mesh(left_lower_vaneGeom, featherLightMat);
  left_lower_vane.name = "left_lower_vane";
  left_lower_vane.position.z = 0.004;
  feather.add(left_lower_vane);

  const right_lower_vaneGeom = createVaneGeometry(
    1, 0.49, 1.82, 0.32, 28, 11, 13, 20, 0.20
  );
  const right_lower_vane = new THREE.Mesh(right_lower_vaneGeom, featherLightMat);
  right_lower_vane.name = "right_lower_vane";
  right_lower_vane.position.z = 0.004;
  feather.add(right_lower_vane);

  const feather_barbPoints = [];
  for (let i = 0; i < 47; i++) {
    const t = (i + 1) / 48;
    const y = 0.53 + t * 2.27;
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.72);
    const baseWidth = envelope * (1 - t * 0.08);
    const leftWidth = 0.48 * baseWidth;
    const rightWidth = 0.42 * baseWidth;
    const leftLift = 0.045 + (1 - t) * 0.075;
    const rightLift = 0.040 + (1 - t) * 0.068;

    feather_barbPoints.push(
      new THREE.Vector3(-0.008, y, 0.018),
      new THREE.Vector3(-leftWidth * 0.94, y + leftLift, 0.018),
      new THREE.Vector3(0.008, y + 0.008, 0.019),
      new THREE.Vector3(rightWidth * 0.94, y + rightLift, 0.019)
    );
  }
  const feather_barbsGeom = new THREE.BufferGeometry().setFromPoints(feather_barbPoints);
  const feather_barbs = new THREE.LineSegments(feather_barbsGeom, featherLineMat);
  feather_barbs.name = "feather_barbs";
  feather.add(feather_barbs);

  const feather_patchShape = new THREE.Shape();
  feather_patchShape.moveTo(-0.055, 2.105);
  feather_patchShape.bezierCurveTo(-0.020, 2.075, 0.075, 2.095, 0.115, 2.145);
  feather_patchShape.bezierCurveTo(0.095, 2.205, 0.020, 2.235, -0.045, 2.205);
  feather_patchShape.bezierCurveTo(-0.070, 2.180, -0.075, 2.135, -0.055, 2.105);
  feather_patchShape.closePath();
  const feather_patchGeom = new THREE.ShapeGeometry(feather_patchShape);
  const feather_patch = new THREE.Mesh(feather_patchGeom, featherDarkMat);
  feather_patch.name = "feather_patch";
  feather_patch.position.z = 0.023;
  feather.add(feather_patch);

  const downy_strandPoints = [];
  for (let i = 0; i < 22; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const startX = side * (0.010 + (i % 3) * 0.006);
    const startY = 0.43 + (i % 5) * 0.018;
    const endX = side * (0.20 + (i % 6) * 0.055);
    const endY = 0.18 + (i % 7) * 0.052;
    const controlX = side * (0.10 + (i % 4) * 0.035);
    const controlY = 0.34 + (i % 5) * 0.035;

    downy_strandPoints.push(
      new THREE.Vector3(startX, startY, 0.025),
      new THREE.Vector3(controlX, controlY, 0.025),
      new THREE.Vector3(controlX * 0.72, controlY + 0.035, 0.025),
      new THREE.Vector3(endX, endY, 0.025)
    );
  }
  const downy_strandsGeom = new THREE.BufferGeometry().setFromPoints(downy_strandPoints);
  const downy_strands = new THREE.LineSegments(downy_strandsGeom, downMat);
  downy_strands.name = "downy_strands";
  feather.add(downy_strands);

  const downy_wisps = new THREE.Group();
  downy_wisps.name = "downy_wisps";
  feather.add(downy_wisps);

  for (let i = 0; i < 8; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const path = [
      new THREE.Vector3(side * 0.012, 0.455 + (i % 3) * 0.012, 0.018),
      new THREE.Vector3(side * (0.065 + i * 0.012), 0.365 + (i % 3) * 0.025, 0.018),
      new THREE.Vector3(side * (0.16 + i * 0.025), 0.27 + (i % 4) * 0.045, 0.018),
      new THREE.Vector3(side * (0.25 + i * 0.035), 0.19 + (i % 5) * 0.055, 0.018),
    ];
    const curve = new THREE.CatmullRomCurve3(path, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 20, 0.0022, 5, false);
    const wisp = new THREE.Mesh(geom, downCurveMat);
    wisp.name = "downy_wisp";
    downy_wisps.add(wisp);
  }

  const rachisGeom = new THREE.CylinderGeometry(0.006, 0.024, 2.50, 16);
  const rachis = new THREE.Mesh(rachisGeom, goldMat);
  rachis.name = "rachis";
  rachis.position.set(0, 1.65, 0.045);
  quill.add(rachis);

  const rachis_tipGeom = new THREE.ConeGeometry(0.007, 0.09, 14);
  const rachis_tip = new THREE.Mesh(rachis_tipGeom, goldMat);
  rachis_tip.name = "rachis_tip";
  rachis_tip.position.set(0, 2.945, 0.045);
  quill.add(rachis_tip);

  const barrelGeom = new THREE.CylinderGeometry(0.027, 0.045, 0.40, 24);
  const barrel = new THREE.Mesh(barrelGeom, goldMat);
  barrel.name = "barrel";
  barrel.position.set(0, 0.22, 0.045);
  quill.add(barrel);

  const barrel_socketGeom = new THREE.CylinderGeometry(0.045, 0.060, 0.24, 24);
  const barrel_socket = new THREE.Mesh(barrel_socketGeom, goldMat);
  barrel_socket.name = "barrel_socket";
  barrel_socket.position.set(0, -0.060, 0.045);
  quill.add(barrel_socket);

  const upper_collarGeom = new THREE.TorusGeometry(0.052, 0.012, 8, 32);
  const upper_collar = new THREE.Mesh(upper_collarGeom, goldMat);
  upper_collar.name = "upper_collar";
  upper_collar.rotation.x = Math.PI / 2;
  upper_collar.position.set(0, 0.045, 0.045);
  quill.add(upper_collar);

  const ornate_collarProfile = [
    new THREE.Vector2(0.00, -0.385),
    new THREE.Vector2(0.050, -0.385),
    new THREE.Vector2(0.070, -0.350),
    new THREE.Vector2(0.078, -0.315),
    new THREE.Vector2(0.105, -0.285),
    new THREE.Vector2(0.082, -0.245),
    new THREE.Vector2(0.108, -0.205),
    new THREE.Vector2(0.078, -0.165),
    new THREE.Vector2(0.065, -0.120),
    new THREE.Vector2(0.00, -0.105),
  ];
  const ornate_collarGeom = new THREE.LatheGeometry(ornate_collarProfile, 32);
  const ornate_collar = new THREE.Mesh(ornate_collarGeom, goldMat);
  ornate_collar.name = "ornate_collar";
  ornate_collar.position.z = 0.045;
  quill.add(ornate_collar);

  const ornate_groove_upperGeom = new THREE.TorusGeometry(0.083, 0.006, 6, 28);
  const ornate_groove_upper = new THREE.Mesh(ornate_groove_upperGeom, antiqueGoldMat);
  ornate_groove_upper.name = "ornate_groove_upper";
  ornate_groove_upper.rotation.x = Math.PI / 2;
  ornate_groove_upper.position.set(0, -0.205, 0.045);
  quill.add(ornate_groove_upper);

  const ornate_groove_lowerGeom = new THREE.TorusGeometry(0.068, 0.006, 6, 28);
  const ornate_groove_lower = new THREE.Mesh(ornate_groove_lowerGeom, antiqueGoldMat);
  ornate_groove_lower.name = "ornate_groove_lower";
  ornate_groove_lower.rotation.x = Math.PI / 2;
  ornate_groove_lower.position.set(0, -0.340, 0.045);
  quill.add(ornate_groove_lower);

  const ornate_leavesGeom = new THREE.SphereGeometry(0.04, 12, 8);
  const ornate_leaves = new THREE.InstancedMesh(ornate_leavesGeom, goldMat, 8);
  ornate_leaves.name = "ornate_leaves";
  const ornate_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    ornate_dummy.position.set(
      Math.cos(angle) * 0.087,
      -0.270,
      0.045 + Math.sin(angle) * 0.087
    );
    ornate_dummy.rotation.set(0, -angle, 0);
    ornate_dummy.scale.set(0.48, 1.18, 0.34);
    ornate_dummy.updateMatrix();
    ornate_leaves.setMatrixAt(i, ornate_dummy.matrix);
  }
  ornate_leaves.instanceMatrix.needsUpdate = true;
  quill.add(ornate_leaves);

  const ornate_beadsGeom = new THREE.SphereGeometry(0.018, 10, 7);
  const ornate_beads = new THREE.InstancedMesh(ornate_beadsGeom, antiqueGoldMat, 8);
  ornate_beads.name = "ornate_beads";
  const bead_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = ((i + 0.5) / 8) * Math.PI * 2;
    bead_dummy.position.set(
      Math.cos(angle) * 0.095,
      -0.335,
      0.045 + Math.sin(angle) * 0.095
    );
    bead_dummy.rotation.set(0, 0, 0);
    bead_dummy.scale.set(1, 1, 1);
    bead_dummy.updateMatrix();
    ornate_beads.setMatrixAt(i, bead_dummy.matrix);
  }
  ornate_beads.instanceMatrix.needsUpdate = true;
  quill.add(ornate_beads);

  const nibProfile = [
    new THREE.Vector2(0.000, -0.845),
    new THREE.Vector2(0.012, -0.820),
    new THREE.Vector2(0.024, -0.770),
    new THREE.Vector2(0.040, -0.680),
    new THREE.Vector2(0.060, -0.565),
    new THREE.Vector2(0.082, -0.455),
    new THREE.Vector2(0.095, -0.405),
    new THREE.Vector2(0.070, -0.360),
    new THREE.Vector2(0.000, -0.345),
  ];
  const nibGeom = new THREE.LatheGeometry(nibProfile, 32);
  const nib = new THREE.Mesh(nibGeom, goldMat);
  nib.name = "nib";
  nib.position.z = 0.045;
  quill.add(nib);

  const nib_slitGeom = new THREE.CylinderGeometry(0.003, 0.003, 0.22, 8);
  const nib_slit = new THREE.Mesh(nib_slitGeom, antiqueGoldMat);
  nib_slit.name = "nib_slit";
  nib_slit.position.set(0, -0.655, 0.112);
  quill.add(nib_slit);

  const nib_breather_holeGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.006, 16);
  const nib_breather_hole = new THREE.Mesh(nib_breather_holeGeom, antiqueGoldMat);
  nib_breather_hole.name = "nib_breather_hole";
  nib_breather_hole.rotation.x = Math.PI / 2;
  nib_breather_hole.position.set(0, -0.515, 0.137);
  quill.add(nib_breather_hole);

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