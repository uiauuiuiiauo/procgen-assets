export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_keepsake_box";

  const boxW = 1.30;
  const boxD = 1.04;
  const bodyBottom = 0.13;
  const bodyTop = 0.57;
  const bodyH = bodyTop - bodyBottom;
  const bodyY = bodyBottom + bodyH / 2;

  const walnutMat = new THREE.MeshStandardMaterial({
    color: 0x754421,
    metalness: 0.0,
    roughness: 0.6,
  });
  const warmWalnutMat = new THREE.MeshStandardMaterial({
    color: 0x925b31,
    metalness: 0.0,
    roughness: 0.6,
  });
  const edgeWoodMat = new THREE.MeshStandardMaterial({
    color: 0x4d2b18,
    metalness: 0.0,
    roughness: 0.6,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x28160f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x382016,
    metalness: 0.0,
    roughness: 0.6,
  });
  const oakInlayMat = new THREE.MeshStandardMaterial({
    color: 0xd0aa70,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const amberInlayMat = new THREE.MeshStandardMaterial({
    color: 0x9c6336,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const darkInlayMat = new THREE.MeshStandardMaterial({
    color: 0x43271a,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const inlayGrainMat = new THREE.MeshStandardMaterial({
    color: 0x704526,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const base_plinthGeom = new THREE.BoxGeometry(1.36, 0.09, 1.10);
  const base_plinth = new THREE.Mesh(base_plinthGeom, edgeWoodMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.y = 0.045;
  root.add(base_plinth);

  const base_stepGeom = new THREE.BoxGeometry(1.31, 0.055, 1.055);
  const base_step = new THREE.Mesh(base_stepGeom, walnutMat);
  base_step.name = "base_step";
  base_step.position.y = 0.112;
  root.add(base_step);

  const box_bodyGeom = new THREE.BoxGeometry(boxW, bodyH, boxD);
  const box_body = new THREE.Mesh(box_bodyGeom, walnutMat);
  box_body.name = "box_body";
  box_body.position.y = bodyY;
  root.add(box_body);

  const corner_postsGeom = new THREE.BoxGeometry(0.055, bodyH, 0.055);
  const corner_posts = new THREE.InstancedMesh(corner_postsGeom, warmWalnutMat, 4);
  corner_posts.name = "corner_posts";
  const cornerMatrix = new THREE.Matrix4();
  const cornerPositions = [
    [-0.6225, bodyY, -0.4925],
    [0.6225, bodyY, -0.4925],
    [-0.6225, bodyY, 0.4925],
    [0.6225, bodyY, 0.4925],
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    cornerMatrix.makeTranslation(p[0], p[1], p[2]);
    corner_posts.setMatrixAt(i, cornerMatrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  root.add(corner_posts);

  const front_panelGeom = new THREE.BoxGeometry(1.12, 0.34, 0.016);
  const front_panel = new THREE.Mesh(front_panelGeom, panelMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, 0.35, 0.528);
  root.add(front_panel);

  const side_panelGeom = new THREE.BoxGeometry(0.016, 0.34, 0.86);
  const right_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(0.658, 0.35, 0);
  root.add(right_side_panel);

  const left_side_panel = new THREE.Mesh(side_panelGeom, panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-0.658, 0.35, 0);
  root.add(left_side_panel);

  const front_frame_horizontalGeom = new THREE.BoxGeometry(1.20, 0.045, 0.030);
  const front_frame_top = new THREE.Mesh(front_frame_horizontalGeom, warmWalnutMat);
  front_frame_top.name = "front_frame_top";
  front_frame_top.position.set(0, 0.5425, 0.539);
  root.add(front_frame_top);

  const front_frame_bottom = new THREE.Mesh(front_frame_horizontalGeom, edgeWoodMat);
  front_frame_bottom.name = "front_frame_bottom";
  front_frame_bottom.position.set(0, 0.1575, 0.539);
  root.add(front_frame_bottom);

  const front_frame_verticalGeom = new THREE.BoxGeometry(0.045, 0.43, 0.030);
  const front_frame_left = new THREE.Mesh(front_frame_verticalGeom, warmWalnutMat);
  front_frame_left.name = "front_frame_left";
  front_frame_left.position.set(-0.5775, 0.35, 0.539);
  root.add(front_frame_left);

  const front_frame_right = new THREE.Mesh(front_frame_verticalGeom, edgeWoodMat);
  front_frame_right.name = "front_frame_right";
  front_frame_right.position.set(0.5775, 0.35, 0.539);
  root.add(front_frame_right);

  const side_frame_horizontalGeom = new THREE.BoxGeometry(0.030, 0.045, 0.94);
  const right_side_frame_top = new THREE.Mesh(side_frame_horizontalGeom, warmWalnutMat);
  right_side_frame_top.name = "right_side_frame_top";
  right_side_frame_top.position.set(0.669, 0.5425, 0);
  root.add(right_side_frame_top);

  const right_side_frame_bottom = new THREE.Mesh(side_frame_horizontalGeom, edgeWoodMat);
  right_side_frame_bottom.name = "right_side_frame_bottom";
  right_side_frame_bottom.position.set(0.669, 0.1575, 0);
  root.add(right_side_frame_bottom);

  const side_frame_verticalGeom = new THREE.BoxGeometry(0.030, 0.43, 0.045);
  const right_side_frame_front = new THREE.Mesh(side_frame_verticalGeom, warmWalnutMat);
  right_side_frame_front.name = "right_side_frame_front";
  right_side_frame_front.position.set(0.669, 0.35, 0.4575);
  root.add(right_side_frame_front);

  const right_side_frame_rear = new THREE.Mesh(side_frame_verticalGeom, edgeWoodMat);
  right_side_frame_rear.name = "right_side_frame_rear";
  right_side_frame_rear.position.set(0.669, 0.35, -0.4575);
  root.add(right_side_frame_rear);

  const left_side_frame_top = new THREE.Mesh(side_frame_horizontalGeom, warmWalnutMat);
  left_side_frame_top.name = "left_side_frame_top";
  left_side_frame_top.position.set(-0.669, 0.5425, 0);
  root.add(left_side_frame_top);

  const left_side_frame_bottom = new THREE.Mesh(side_frame_horizontalGeom, edgeWoodMat);
  left_side_frame_bottom.name = "left_side_frame_bottom";
  left_side_frame_bottom.position.set(-0.669, 0.1575, 0);
  root.add(left_side_frame_bottom);

  const lid_shadow_gapGeom = new THREE.BoxGeometry(1.33, 0.018, 1.07);
  const lid_shadow_gap = new THREE.Mesh(lid_shadow_gapGeom, panelMat);
  lid_shadow_gap.name = "lid_shadow_gap";
  lid_shadow_gap.position.y = 0.574;
  root.add(lid_shadow_gap);

  const lid_lower_moldingGeom = new THREE.BoxGeometry(1.38, 0.055, 1.12);
  const lid_lower_molding = new THREE.Mesh(lid_lower_moldingGeom, edgeWoodMat);
  lid_lower_molding.name = "lid_lower_molding";
  lid_lower_molding.position.y = 0.602;
  root.add(lid_lower_molding);

  const lid_main_slabGeom = new THREE.BoxGeometry(1.42, 0.075, 1.16);
  const lid_main_slab = new THREE.Mesh(lid_main_slabGeom, walnutMat);
  lid_main_slab.name = "lid_main_slab";
  lid_main_slab.position.y = 0.655;
  root.add(lid_main_slab);

  const lid_top_panelGeom = new THREE.BoxGeometry(1.30, 0.035, 1.04);
  const lid_top_panel = new THREE.Mesh(lid_top_panelGeom, warmWalnutMat);
  lid_top_panel.name = "lid_top_panel";
  lid_top_panel.position.y = 0.710;
  root.add(lid_top_panel);

  const lid_front_back_beadGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.38, 16);
  const lid_front_bead = new THREE.Mesh(lid_front_back_beadGeom, warmWalnutMat);
  lid_front_bead.name = "lid_front_bead";
  lid_front_bead.rotation.z = Math.PI / 2;
  lid_front_bead.position.set(0, 0.681, 0.585);
  root.add(lid_front_bead);

  const lid_back_bead = new THREE.Mesh(lid_front_back_beadGeom, warmWalnutMat);
  lid_back_bead.name = "lid_back_bead";
  lid_back_bead.rotation.z = Math.PI / 2;
  lid_back_bead.position.set(0, 0.681, -0.585);
  root.add(lid_back_bead);

  const lid_side_beadGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.12, 16);
  const lid_right_bead = new THREE.Mesh(lid_side_beadGeom, warmWalnutMat);
  lid_right_bead.name = "lid_right_bead";
  lid_right_bead.rotation.x = Math.PI / 2;
  lid_right_bead.position.set(0.710, 0.681, 0);
  root.add(lid_right_bead);

  const lid_left_bead = new THREE.Mesh(lid_side_beadGeom, warmWalnutMat);
  lid_left_bead.name = "lid_left_bead";
  lid_left_bead.rotation.x = Math.PI / 2;
  lid_left_bead.position.set(-0.710, 0.681, 0);
  root.add(lid_left_bead);

  const base_front_beadGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.32, 12);
  const base_front_bead = new THREE.Mesh(base_front_beadGeom, warmWalnutMat);
  base_front_bead.name = "base_front_bead";
  base_front_bead.rotation.z = Math.PI / 2;
  base_front_bead.position.set(0, 0.137, 0.535);
  root.add(base_front_bead);

  const base_side_beadGeom = new THREE.CylinderGeometry(0.014, 0.014, 1.06, 12);
  const base_right_bead = new THREE.Mesh(base_side_beadGeom, warmWalnutMat);
  base_right_bead.name = "base_right_bead";
  base_right_bead.rotation.x = Math.PI / 2;
  base_right_bead.position.set(0.655, 0.137, 0);
  root.add(base_right_bead);

  const base_left_bead = new THREE.Mesh(base_side_beadGeom, warmWalnutMat);
  base_left_bead.name = "base_left_bead";
  base_left_bead.rotation.x = Math.PI / 2;
  base_left_bead.position.set(-0.655, 0.137, 0);
  root.add(base_left_bead);

  const topGrainData = [
    [-0.10, -0.41, 0.76, 0.018],
    [0.12, -0.29, 0.92, -0.014],
    [-0.08, -0.16, 1.04, 0.012],
    [0.10, -0.03, 0.86, -0.019],
    [-0.13, 0.10, 0.98, 0.014],
    [0.08, 0.23, 1.06, -0.012],
    [-0.06, 0.36, 0.88, 0.017],
  ];
  const top_wood_grainGeom = new THREE.BoxGeometry(1, 0.004, 0.007);
  const top_wood_grain = new THREE.InstancedMesh(top_wood_grainGeom, grainMat, topGrainData.length);
  top_wood_grain.name = "top_wood_grain";
  const grainMatrix = new THREE.Matrix4();
  const grainPosition = new THREE.Vector3();
  const grainQuaternion = new THREE.Quaternion();
  const grainScale = new THREE.Vector3();
  const grainEuler = new THREE.Euler();
  for (let i = 0; i < topGrainData.length; i++) {
    const g = topGrainData[i];
    grainPosition.set(g[0], 0.730, g[1]);
    grainEuler.set(0, g[3], 0);
    grainQuaternion.setFromEuler(grainEuler);
    grainScale.set(g[2], 1, 1);
    grainMatrix.compose(grainPosition, grainQuaternion, grainScale);
    top_wood_grain.setMatrixAt(i, grainMatrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(top_wood_grain);

  const inlayCircleGeom = new THREE.CircleGeometry(1, 24);
  const inlayGrainGeom = new THREE.PlaneGeometry(1, 1);

  const frontInlayData = [
    [-0.47, 0.275, 0.057, 0.082, -0.18, 0],
    [-0.30, 0.305, 0.075, 0.054, 0.28, 1],
    [-0.12, 0.272, 0.052, 0.077, -0.30, 0],
    [0.07, 0.307, 0.078, 0.058, 0.14, 1],
    [0.27, 0.270, 0.055, 0.080, -0.12, 2],
    [0.46, 0.312, 0.069, 0.054, 0.25, 0],
    [-0.40, 0.425, 0.064, 0.052, 0.18, 1],
    [-0.21, 0.430, 0.047, 0.072, -0.22, 2],
    [-0.01, 0.420, 0.073, 0.054, 0.12, 0],
    [0.20, 0.430, 0.051, 0.073, -0.18, 1],
    [0.40, 0.420, 0.068, 0.052, 0.22, 2],
  ];

  const front_wood_inlays = new THREE.Group();
  front_wood_inlays.name = "front_wood_inlays";
  for (let i = 0; i < frontInlayData.length; i++) {
    const d = frontInlayData[i];
    const front_inlay_patch = new THREE.Mesh(
      inlayCircleGeom,
      d[5] === 0 ? oakInlayMat : d[5] === 1 ? amberInlayMat : darkInlayMat
    );
    front_inlay_patch.name = "front_inlay_patch_" + i;
    front_inlay_patch.position.set(d[0], d[1], 0.538);
    front_inlay_patch.rotation.z = d[4];
    front_inlay_patch.scale.set(d[2], d[3], 1);
    front_wood_inlays.add(front_inlay_patch);

    const front_inlay_grain = new THREE.Mesh(inlayGrainGeom, inlayGrainMat);
    front_inlay_grain.name = "front_inlay_grain_" + i;
    front_inlay_grain.position.set(d[0], d[1], 0.540);
    front_inlay_grain.rotation.z = d[4];
    front_inlay_grain.scale.set(d[2] * 1.25, 0.004, 1);
    front_wood_inlays.add(front_inlay_grain);
  }
  root.add(front_wood_inlays);

  const rightInlayData = [
    [-0.34, 0.275, 0.058, 0.080, -0.18, 1],
    [-0.17, 0.310, 0.074, 0.054, 0.20, 0],
    [0.01, 0.272, 0.052, 0.078, -0.24, 2],
    [0.18, 0.307, 0.076, 0.057, 0.16, 1],
    [0.35, 0.275, 0.055, 0.078, -0.12, 0],
    [-0.28, 0.425, 0.065, 0.052, 0.14, 0],
    [-0.09, 0.430, 0.048, 0.071, -0.20, 1],
    [0.10, 0.420, 0.072, 0.054, 0.12, 2],
    [0.29, 0.425, 0.052, 0.072, -0.16, 0],
  ];

  const right_side_wood_inlays = new THREE.Group();
  right_side_wood_inlays.name = "right_side_wood_inlays";
  for (let i = 0; i < rightInlayData.length; i++) {
    const d = rightInlayData[i];
    const right_side_inlay_patch = new THREE.Mesh(
      inlayCircleGeom,
      d[5] === 0 ? oakInlayMat : d[5] === 1 ? amberInlayMat : darkInlayMat
    );
    right_side_inlay_patch.name = "right_side_inlay_patch_" + i;
    right_side_inlay_patch.position.set(0.669, d[1], d[0]);
    right_side_inlay_patch.rotation.y = Math.PI / 2;
    right_side_inlay_patch.rotateZ(d[4]);
    right_side_inlay_patch.scale.set(d[2], d[3], 1);
    right_side_wood_inlays.add(right_side_inlay_patch);

    const right_side_inlay_grain = new THREE.Mesh(inlayGrainGeom, inlayGrainMat);
    right_side_inlay_grain.name = "right_side_inlay_grain_" + i;
    right_side_inlay_grain.position.set(0.671, d[1], d[0]);
    right_side_inlay_grain.rotation.y = Math.PI / 2;
    right_side_inlay_grain.rotateZ(d[4]);
    right_side_inlay_grain.scale.set(d[2] * 1.25, 0.004, 1);
    right_side_wood_inlays.add(right_side_inlay_grain);
  }
  root.add(right_side_wood_inlays);

  const left_side_wood_inlays = new THREE.Group();
  left_side_wood_inlays.name = "left_side_wood_inlays";
  for (let i = 0; i < rightInlayData.length; i++) {
    const d = rightInlayData[i];
    const left_side_inlay_patch = new THREE.Mesh(
      inlayCircleGeom,
      d[5] === 0 ? oakInlayMat : d[5] === 1 ? amberInlayMat : darkInlayMat
    );
    left_side_inlay_patch.name = "left_side_inlay_patch_" + i;
    left_side_inlay_patch.position.set(-0.669, d[1], -d[0]);
    left_side_inlay_patch.rotation.y = -Math.PI / 2;
    left_side_inlay_patch.rotateZ(-d[4]);
    left_side_inlay_patch.scale.set(d[2], d[3], 1);
    left_side_wood_inlays.add(left_side_inlay_patch);

    const left_side_inlay_grain = new THREE.Mesh(inlayGrainGeom, inlayGrainMat);
    left_side_inlay_grain.name = "left_side_inlay_grain_" + i;
    left_side_inlay_grain.position.set(-0.671, d[1], -d[0]);
    left_side_inlay_grain.rotation.y = -Math.PI / 2;
    left_side_inlay_grain.rotateZ(-d[4]);
    left_side_inlay_grain.scale.set(d[2] * 1.25, 0.004, 1);
    left_side_wood_inlays.add(left_side_inlay_grain);
  }
  root.add(left_side_wood_inlays);

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