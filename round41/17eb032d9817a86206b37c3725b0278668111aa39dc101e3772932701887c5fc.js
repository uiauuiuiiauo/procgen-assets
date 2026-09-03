export default function generate(THREE) {
  const root = new THREE.Group();

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd0a24a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const antiqueGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8b6426,
    metalness: 0.5,
    roughness: 0.35,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xb9a794,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
  });
  const featherLightMat = new THREE.MeshStandardMaterial({
    color: 0xd8cfc2,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const featherShadeMat = new THREE.MeshStandardMaterial({
    color: 0x8f7d6c,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  });
  const barbMat = new THREE.LineBasicMaterial({
    color: 0x817263,
    transparent: true,
    opacity: 0.62,
  });
  const downMat = new THREE.LineBasicMaterial({
    color: 0xd7d0c5,
    transparent: true,
    opacity: 0.58,
  });

  const stand_group = new THREE.Group();
  root.add(stand_group);

  const stand_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.40, 0.025),
    new THREE.Vector2(0.42, 0.070),
    new THREE.Vector2(0.41, 0.115),
    new THREE.Vector2(0.36, 0.165),
    new THREE.Vector2(0.30, 0.205),
    new THREE.Vector2(0.255, 0.285),
    new THREE.Vector2(0.205, 0.355),
    new THREE.Vector2(0.155, 0.405),
    new THREE.Vector2(0.140, 0.455),
    new THREE.Vector2(0.140, 0.575),
    new THREE.Vector2(0.170, 0.610),
    new THREE.Vector2(0.205, 0.650),
    new THREE.Vector2(0.195, 0.695),
    new THREE.Vector2(0.145, 0.725),
    new THREE.Vector2(0.00, 0.725),
  ];
  const stand_baseGeom = new THREE.LatheGeometry(stand_baseProfile, 48);
  const stand_base = new THREE.Mesh(stand_baseGeom, goldMat);
  stand_group.add(stand_base);

  const stand_foot_rimGeom = new THREE.TorusGeometry(0.385, 0.025, 10, 48);
  const stand_foot_rim = new THREE.Mesh(stand_foot_rimGeom, goldMat);
  stand_foot_rim.rotation.x = Math.PI / 2;
  stand_foot_rim.position.y = 0.065;
  stand_group.add(stand_foot_rim);

  const stand_bottom_grooveGeom = new THREE.TorusGeometry(0.395, 0.008, 8, 48);
  const stand_bottom_groove = new THREE.Mesh(stand_bottom_grooveGeom, antiqueGoldMat);
  stand_bottom_groove.rotation.x = Math.PI / 2;
  stand_bottom_groove.position.y = 0.115;
  stand_group.add(stand_bottom_groove);

  const stand_shoulder_grooveGeom = new THREE.TorusGeometry(0.285, 0.008, 8, 40);
  const stand_shoulder_groove = new THREE.Mesh(stand_shoulder_grooveGeom, antiqueGoldMat);
  stand_shoulder_groove.rotation.x = Math.PI / 2;
  stand_shoulder_groove.position.y = 0.225;
  stand_group.add(stand_shoulder_groove);

  const stand_neck_bandGeom = new THREE.TorusGeometry(0.145, 0.012, 8, 36);
  const stand_neck_band = new THREE.Mesh(stand_neck_bandGeom, antiqueGoldMat);
  stand_neck_band.rotation.x = Math.PI / 2;
  stand_neck_band.position.y = 0.475;
  stand_group.add(stand_neck_band);

  const stand_top_lipGeom = new THREE.TorusGeometry(0.174, 0.022, 10, 40);
  const stand_top_lip = new THREE.Mesh(stand_top_lipGeom, goldMat);
  stand_top_lip.rotation.x = Math.PI / 2;
  stand_top_lip.position.y = 0.665;
  stand_group.add(stand_top_lip);

  const stand_top_insetGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.012, 36);
  const stand_top_inset = new THREE.Mesh(stand_top_insetGeom, antiqueGoldMat);
  stand_top_inset.position.y = 0.729;
  stand_group.add(stand_top_inset);

  const stand_ornamentPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.105, 0.135, 0.342),
    new THREE.Vector3(-0.080, 0.205, 0.302),
    new THREE.Vector3(-0.025, 0.265, 0.266),
    new THREE.Vector3(0.045, 0.225, 0.291),
    new THREE.Vector3(0.075, 0.155, 0.334),
    new THREE.Vector3(0.030, 0.120, 0.356),
  ], false, "centripetal");
  const stand_ornamentGeom = new THREE.TubeGeometry(
    stand_ornamentPath, 28, 0.011, 7, false
  );
  const stand_ornament = new THREE.Mesh(stand_ornamentGeom, antiqueGoldMat);
  stand_group.add(stand_ornament);

  const stand_ornament_loopPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.020, 0.145, 0.354),
    new THREE.Vector3(0.090, 0.155, 0.342),
    new THREE.Vector3(0.120, 0.195, 0.318),
    new THREE.Vector3(0.085, 0.230, 0.300),
    new THREE.Vector3(0.030, 0.210, 0.313),
  ], true, "centripetal");
  const stand_ornament_loopGeom = new THREE.TubeGeometry(
    stand_ornament_loopPath, 24, 0.008, 6, true
  );
  const stand_ornament_loop = new THREE.Mesh(stand_ornament_loopGeom, antiqueGoldMat);
  stand_group.add(stand_ornament_loop);

  const feather_group = new THREE.Group();
  feather_group.position.set(-0.48, 0.43, 0.08);
  feather_group.rotation.z = -0.58;
  root.add(feather_group);

  const left_vaneShape = new THREE.Shape();
  left_vaneShape.moveTo(-0.025, 0.20);
  left_vaneShape.bezierCurveTo(-0.10, 0.34, -0.29, 0.54, -0.41, 0.82);
  left_vaneShape.bezierCurveTo(-0.58, 1.15, -0.64, 1.56, -0.55, 1.94);
  left_vaneShape.bezierCurveTo(-0.48, 2.28, -0.29, 2.64, 0.00, 2.91);
  left_vaneShape.bezierCurveTo(-0.035, 2.55, -0.045, 2.05, -0.040, 1.55);
  left_vaneShape.bezierCurveTo(-0.035, 1.00, -0.025, 0.55, -0.025, 0.20);
  left_vaneShape.closePath();

  const left_vaneGeom = new THREE.ShapeGeometry(left_vaneShape, 24);
  const left_vane = new THREE.Mesh(left_vaneGeom, featherMat);
  left_vane.position.z = -0.008;
  feather_group.add(left_vane);

  const right_vaneShape = new THREE.Shape();
  right_vaneShape.moveTo(0.020, 0.25);
  right_vaneShape.bezierCurveTo(0.11, 0.39, 0.31, 0.57, 0.45, 0.84);
  right_vaneShape.lineTo(0.70, 1.02);
  right_vaneShape.lineTo(0.47, 1.13);
  right_vaneShape.bezierCurveTo(0.60, 1.26, 0.70, 1.44, 0.75, 1.66);
  right_vaneShape.lineTo(0.85, 1.83);
  right_vaneShape.lineTo(0.57, 1.89);
  right_vaneShape.bezierCurveTo(0.62, 2.13, 0.52, 2.47, 0.28, 2.72);
  right_vaneShape.bezierCurveTo(0.17, 2.84, 0.08, 2.90, 0.00, 2.91);
  right_vaneShape.bezierCurveTo(0.040, 2.45, 0.045, 1.80, 0.040, 1.20);
  right_vaneShape.bezierCurveTo(0.035, 0.72, 0.030, 0.42, 0.020, 0.25);
  right_vaneShape.closePath();

  const right_vaneGeom = new THREE.ShapeGeometry(right_vaneShape, 24);
  const right_vane = new THREE.Mesh(right_vaneGeom, featherLightMat);
  right_vane.position.z = -0.006;
  feather_group.add(right_vane);

  const upper_vane_patchShape = new THREE.Shape();
  upper_vane_patchShape.moveTo(0.015, 2.18);
  upper_vane_patchShape.bezierCurveTo(0.10, 2.30, 0.24, 2.32, 0.38, 2.18);
  upper_vane_patchShape.bezierCurveTo(0.31, 2.50, 0.17, 2.76, 0.01, 2.90);
  upper_vane_patchShape.bezierCurveTo(0.03, 2.67, 0.03, 2.41, 0.015, 2.18);
  upper_vane_patchShape.closePath();
  const upper_vane_patchGeom = new THREE.ShapeGeometry(upper_vane_patchShape, 16);
  const upper_vane_patch = new THREE.Mesh(upper_vane_patchGeom, featherShadeMat);
  upper_vane_patch.position.z = 0.006;
  feather_group.add(upper_vane_patch);

  const middle_vane_patchShape = new THREE.Shape();
  middle_vane_patchShape.moveTo(-0.015, 1.30);
  middle_vane_patchShape.bezierCurveTo(-0.15, 1.34, -0.34, 1.47, -0.49, 1.66);
  middle_vane_patchShape.bezierCurveTo(-0.48, 1.87, -0.31, 2.05, -0.08, 2.13);
  middle_vane_patchShape.bezierCurveTo(-0.04, 1.87, -0.02, 1.57, -0.015, 1.30);
  middle_vane_patchShape.closePath();
  const middle_vane_patchGeom = new THREE.ShapeGeometry(middle_vane_patchShape, 16);
  const middle_vane_patch = new THREE.Mesh(middle_vane_patchGeom, featherShadeMat);
  middle_vane_patch.position.z = 0.007;
  feather_group.add(middle_vane_patch);

  const barbVertices = [];
  function addBarb(x1, y1, x2, y2, z) {
    barbVertices.push(x1, y1, z, x2, y2, z);
  }

  for (let i = 0; i < 42; i++) {
    const y = 0.38 + i * 0.057;
    const t = (y - 0.20) / 2.71;
    const rise = 0.12 + 0.10 * (1 - t);
    const edgeY = Math.min(2.88, y + rise);
    const edgeT = (edgeY - 0.20) / 2.71;
    const fullness = Math.sin(Math.PI * Math.max(0, Math.min(1, edgeT)));
    const leftX = -0.62 * fullness * (0.88 + 0.08 * Math.sin(i * 1.7));
    const rightX = 0.82 * fullness * (0.86 + 0.10 * Math.sin(i * 1.31 + 0.5));
    const shaftX = -0.025 + 0.045 * t;
    addBarb(shaftX, y, leftX, edgeY, 0.018);
    addBarb(shaftX, y, rightX, edgeY, 0.018);
  }

  for (let i = 0; i < 15; i++) {
    const y = 0.32 + i * 0.055;
    const t = i / 14;
    addBarb(-0.020, y, -0.16 - 0.22 * t, 0.48 + 0.16 * t, 0.019);
    addBarb(0.020, y, 0.18 + 0.30 * t, 0.50 + 0.20 * t, 0.019);
  }

  const feather_barbsGeom = new THREE.BufferGeometry();
  feather_barbsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(barbVertices, 3)
  );
  const feather_barbs = new THREE.LineSegments(feather_barbsGeom, barbMat);
  feather_group.add(feather_barbs);

  const downVertices = [];
  for (let i = 0; i < 28; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const startX = side * (0.015 + 0.006 * (i % 3));
    const startY = 0.18 + 0.018 * (i % 4);
    const middleX = side * (0.16 + 0.035 * (i % 6));
    const middleY = 0.24 + 0.035 * ((i * 3) % 7);
    const endX = side * (0.36 + 0.035 * (i % 8));
    const endY = 0.12 + 0.055 * ((i * 5) % 9);
    downVertices.push(
      startX, startY, 0.014,
      middleX, middleY, 0.014,
      middleX, middleY, 0.014,
      endX, endY, 0.014
    );
  }
  const feather_downGeom = new THREE.BufferGeometry();
  feather_downGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(downVertices, 3)
  );
  const feather_down = new THREE.LineSegments(feather_downGeom, downMat);
  feather_group.add(feather_down);

  const rachisGeom = new THREE.CylinderGeometry(0.014, 0.052, 2.94, 16);
  const rachis = new THREE.Mesh(rachisGeom, goldMat);
  rachis.position.set(0, 1.47, 0.045);
  feather_group.add(rachis);

  const quill_sleeveGeom = new THREE.CylinderGeometry(0.048, 0.074, 0.68, 18);
  const quill_sleeve = new THREE.Mesh(quill_sleeveGeom, goldMat);
  quill_sleeve.position.set(0, -0.15, 0.045);
  feather_group.add(quill_sleeve);

  const quill_upper_collarGeom = new THREE.TorusGeometry(0.070, 0.014, 8, 28);
  const quill_upper_collar = new THREE.Mesh(quill_upper_collarGeom, goldMat);
  quill_upper_collar.rotation.x = Math.PI / 2;
  quill_upper_collar.position.set(0, 0.18, 0.045);
  feather_group.add(quill_upper_collar);

  const quill_lower_collarGeom = new THREE.TorusGeometry(0.087, 0.018, 8, 28);
  const quill_lower_collar = new THREE.Mesh(quill_lower_collarGeom, antiqueGoldMat);
  quill_lower_collar.rotation.x = Math.PI / 2;
  quill_lower_collar.position.set(0, -0.47, 0.045);
  feather_group.add(quill_lower_collar);

  const ornate_gripProfile = [
    new THREE.Vector2(0.00, -1.18),
    new THREE.Vector2(0.035, -1.18),
    new THREE.Vector2(0.050, -1.08),
    new THREE.Vector2(0.075, -0.98),
    new THREE.Vector2(0.120, -0.90),
    new THREE.Vector2(0.150, -0.83),
    new THREE.Vector2(0.120, -0.77),
    new THREE.Vector2(0.100, -0.70),
    new THREE.Vector2(0.130, -0.64),
    new THREE.Vector2(0.100, -0.57),
    new THREE.Vector2(0.075, -0.50),
    new THREE.Vector2(0.00, -0.50),
  ];
  const ornate_gripGeom = new THREE.LatheGeometry(ornate_gripProfile, 32);
  const ornate_grip = new THREE.Mesh(ornate_gripGeom, goldMat);
  ornate_grip.position.z = 0.045;
  feather_group.add(ornate_grip);

  const grip_upper_ringGeom = new THREE.TorusGeometry(0.105, 0.016, 8, 28);
  const grip_upper_ring = new THREE.Mesh(grip_upper_ringGeom, antiqueGoldMat);
  grip_upper_ring.rotation.x = Math.PI / 2;
  grip_upper_ring.position.set(0, -0.665, 0.045);
  feather_group.add(grip_upper_ring);

  const grip_lower_ringGeom = new THREE.TorusGeometry(0.112, 0.014, 8, 28);
  const grip_lower_ring = new THREE.Mesh(grip_lower_ringGeom, antiqueGoldMat);
  grip_lower_ring.rotation.x = Math.PI / 2;
  grip_lower_ring.position.set(0, -0.895, 0.045);
  feather_group.add(grip_lower_ring);

  const ornamental_leafShape = new THREE.Shape();
  ornamental_leafShape.moveTo(0, -0.085);
  ornamental_leafShape.bezierCurveTo(-0.045, -0.035, -0.055, 0.045, 0, 0.105);
  ornamental_leafShape.bezierCurveTo(0.055, 0.045, 0.045, -0.035, 0, -0.085);
  ornamental_leafShape.closePath();
  const ornamental_leafGeom = new THREE.ExtrudeGeometry(ornamental_leafShape, {
    depth: 0.016,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });

  const ornamental_leaves = new THREE.InstancedMesh(
    ornamental_leafGeom, goldMat, 6
  );
  const leafDummy = new THREE.Object3D();
  const frontAxis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    leafDummy.position.set(
      Math.cos(angle) * 0.112,
      -0.795,
      0.045 + Math.sin(angle) * 0.112
    );
    leafDummy.quaternion.setFromUnitVectors(frontAxis, normal);
    leafDummy.rotateZ(i % 2 === 0 ? -0.20 : 0.20);
    leafDummy.scale.set(0.82, 0.82, 0.82);
    leafDummy.updateMatrix();
    ornamental_leaves.setMatrixAt(i, leafDummy.matrix);
  }
  ornamental_leaves.instanceMatrix.needsUpdate = true;
  feather_group.add(ornamental_leaves);

  const ornamental_beadGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const ornamental_beads = new THREE.InstancedMesh(
    ornamental_beadGeom, antiqueGoldMat, 8
  );
  const beadDummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    beadDummy.position.set(
      Math.cos(angle) * 0.125,
      -0.835,
      0.045 + Math.sin(angle) * 0.125
    );
    beadDummy.rotation.set(0, 0, 0);
    beadDummy.scale.setScalar(1);
    beadDummy.updateMatrix();
    ornamental_beads.setMatrixAt(i, beadDummy.matrix);
  }
  ornamental_beads.instanceMatrix.needsUpdate = true;
  feather_group.add(ornamental_beads);

  const writing_tipGeom = new THREE.CylinderGeometry(0.047, 0.006, 0.50, 18);
  const writing_tip = new THREE.Mesh(writing_tipGeom, goldMat);
  writing_tip.position.set(0, -1.415, 0.045);
  feather_group.add(writing_tip);

  const writing_tip_capGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const writing_tip_cap = new THREE.Mesh(writing_tip_capGeom, antiqueGoldMat);
  writing_tip_cap.position.set(0, -1.672, 0.045);
  feather_group.add(writing_tip_cap);

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