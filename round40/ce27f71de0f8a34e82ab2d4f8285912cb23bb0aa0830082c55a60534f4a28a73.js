export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hammer_and_case";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const yellowRubberMat = new THREE.MeshStandardMaterial({
    color: 0xffd400,
    metalness: 0.0,
    roughness: 0.8,
  });
  const blackRubberMat = new THREE.MeshStandardMaterial({
    color: 0x24272b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const caseMat = new THREE.MeshStandardMaterial({
    color: 0x5b4038,
    metalness: 0.0,
    roughness: 0.8,
  });
  const caseDarkMat = new THREE.MeshStandardMaterial({
    color: 0x382722,
    metalness: 0.0,
    roughness: 0.8,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createRoundedRectGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  case_group.position.set(0.43, -0.28, -0.16);
  case_group.rotation.z = 0.72;
  root.add(case_group);

  const case_bodyGeom = createRoundedRectGeometry(0.38, 1.08, 0.22, 0.065, 0.018);
  const case_body = new THREE.Mesh(case_bodyGeom, caseMat);
  case_body.name = "case_body";
  case_group.add(case_body);

  const case_front_panelGeom = createRoundedRectGeometry(0.325, 0.91, 0.018, 0.045, 0.007);
  const case_front_panel = new THREE.Mesh(case_front_panelGeom, caseMat);
  case_front_panel.name = "case_front_panel";
  case_front_panel.position.set(0, -0.025, 0.132);
  case_group.add(case_front_panel);

  const case_molded_ridgeGeom = createRoundedRectGeometry(0.27, 0.73, 0.012, 0.025, 0.004);
  const case_molded_ridge = new THREE.Mesh(case_molded_ridgeGeom, caseMat);
  case_molded_ridge.name = "case_molded_ridge";
  case_molded_ridge.position.set(0, 0.015, 0.151);
  case_group.add(case_molded_ridge);

  const case_top_lipGeom = createRoundedRectGeometry(0.35, 0.12, 0.245, 0.045, 0.014);
  const case_top_lip = new THREE.Mesh(case_top_lipGeom, caseMat);
  case_top_lip.name = "case_top_lip";
  case_top_lip.position.set(0, 0.485, 0.012);
  case_group.add(case_top_lip);

  const case_mouth_shadowGeom = new THREE.BoxGeometry(0.275, 0.026, 0.035);
  const case_mouth_shadow = new THREE.Mesh(case_mouth_shadowGeom, recessMat);
  case_mouth_shadow.name = "case_mouth_shadow";
  case_mouth_shadow.position.set(0, 0.535, 0.145);
  case_group.add(case_mouth_shadow);

  const case_latchGeom = createRoundedRectGeometry(0.16, 0.23, 0.014, 0.018, 0.004);
  const case_latch = new THREE.Mesh(case_latchGeom, caseDarkMat);
  case_latch.name = "case_latch";
  case_latch.position.set(-0.015, 0.285, 0.166);
  case_group.add(case_latch);

  const case_latch_slotGeom = new THREE.BoxGeometry(0.105, 0.025, 0.012);
  const case_latch_slot = new THREE.Mesh(case_latch_slotGeom, recessMat);
  case_latch_slot.name = "case_latch_slot";
  case_latch_slot.position.set(-0.015, 0.36, 0.178);
  case_group.add(case_latch_slot);

  const case_recess_rimGeom = createRoundedRectGeometry(0.225, 0.27, 0.016, 0.045, 0.006);
  const case_recess_rim = new THREE.Mesh(case_recess_rimGeom, caseDarkMat);
  case_recess_rim.name = "case_recess_rim";
  case_recess_rim.position.set(0.012, -0.285, 0.166);
  case_group.add(case_recess_rim);

  const case_recessGeom = createRoundedRectGeometry(0.17, 0.205, 0.012, 0.035, 0.004);
  const case_recess = new THREE.Mesh(case_recessGeom, recessMat);
  case_recess.name = "case_recess";
  case_recess.position.set(0.012, -0.285, 0.179);
  case_group.add(case_recess);

  const case_recess_highlightGeom = new THREE.BoxGeometry(0.105, 0.012, 0.008);
  const case_recess_highlight = new THREE.Mesh(case_recess_highlightGeom, caseDarkMat);
  case_recess_highlight.name = "case_recess_highlight";
  case_recess_highlight.position.set(0.012, -0.235, 0.188);
  case_group.add(case_recess_highlight);

  const case_side_clipGeom = new THREE.BoxGeometry(0.018, 0.09, 0.035);
  const case_side_clip = new THREE.Mesh(case_side_clipGeom, brushedMetalMat);
  case_side_clip.name = "case_side_clip";
  case_side_clip.position.set(0.205, 0.17, -0.01);
  case_group.add(case_side_clip);

  const hammer_group = new THREE.Group();
  hammer_group.name = "hammer_group";
  hammer_group.position.set(-0.03, 0.02, 0.1);
  hammer_group.rotation.z = 0.72;
  root.add(hammer_group);

  const hammer_headShape = new THREE.Shape();
  hammer_headShape.moveTo(-0.5, 0.42);
  hammer_headShape.lineTo(-0.47, 0.59);
  hammer_headShape.lineTo(-0.34, 0.72);
  hammer_headShape.lineTo(-0.18, 0.78);
  hammer_headShape.lineTo(0.1, 0.76);
  hammer_headShape.lineTo(0.27, 0.68);
  hammer_headShape.lineTo(0.39, 0.55);
  hammer_headShape.lineTo(0.4, 0.45);
  hammer_headShape.lineTo(0.34, 0.39);
  hammer_headShape.lineTo(0.27, 0.37);
  hammer_headShape.lineTo(0.22, 0.28);
  hammer_headShape.lineTo(0.13, 0.23);
  hammer_headShape.lineTo(-0.12, 0.23);
  hammer_headShape.lineTo(-0.22, 0.28);
  hammer_headShape.lineTo(-0.28, 0.37);
  hammer_headShape.lineTo(-0.39, 0.4);
  hammer_headShape.closePath();

  const hammer_headGeom = new THREE.ExtrudeGeometry(hammer_headShape, {
    depth: 0.3,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 4,
  });
  hammer_headGeom.translate(0, 0, -0.15);

  const hammer_head = new THREE.Mesh(hammer_headGeom, silverMat);
  hammer_head.name = "hammer_head";
  hammer_group.add(hammer_head);

  const striking_faceGeom = new THREE.CylinderGeometry(0.205, 0.205, 0.14, 32);
  const striking_face = new THREE.Mesh(striking_faceGeom, silverMat);
  striking_face.name = "striking_face";
  striking_face.rotation.z = Math.PI / 2;
  striking_face.position.set(-0.515, 0.505, 0);
  hammer_group.add(striking_face);

  const striking_face_capGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.018, 32);
  const striking_face_cap = new THREE.Mesh(striking_face_capGeom, brushedMetalMat);
  striking_face_cap.name = "striking_face_cap";
  striking_face_cap.rotation.z = Math.PI / 2;
  striking_face_cap.position.set(-0.595, 0.505, 0);
  hammer_group.add(striking_face_cap);

  const striking_face_ringGeom = new THREE.TorusGeometry(0.155, 0.009, 8, 32);
  const striking_face_ring = new THREE.Mesh(striking_face_ringGeom, brushedMetalMat);
  striking_face_ring.name = "striking_face_ring";
  striking_face_ring.rotation.y = Math.PI / 2;
  striking_face_ring.position.set(-0.606, 0.505, 0);
  hammer_group.add(striking_face_ring);

  const hammer_peenShape = new THREE.Shape();
  hammer_peenShape.moveTo(0.25, 0.65);
  hammer_peenShape.lineTo(0.39, 0.56);
  hammer_peenShape.lineTo(0.5, 0.45);
  hammer_peenShape.lineTo(0.48, 0.37);
  hammer_peenShape.lineTo(0.38, 0.34);
  hammer_peenShape.lineTo(0.28, 0.4);
  hammer_peenShape.lineTo(0.23, 0.52);
  hammer_peenShape.closePath();

  const hammer_peenGeom = new THREE.ExtrudeGeometry(hammer_peenShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  hammer_peenGeom.translate(0, 0, -0.065);

  const hammer_peen = new THREE.Mesh(hammer_peenGeom, silverMat);
  hammer_peen.name = "hammer_peen";
  hammer_group.add(hammer_peen);

  const hammer_shankGeom = createRoundedRectGeometry(0.16, 0.52, 0.15, 0.045, 0.012);
  const hammer_shank = new THREE.Mesh(hammer_shankGeom, silverMat);
  hammer_shank.name = "hammer_shank";
  hammer_shank.position.set(0, 0.13, 0);
  hammer_group.add(hammer_shank);

  const handle_collarGeom = createRoundedRectGeometry(0.27, 0.38, 0.22, 0.075, 0.018);
  const handle_collar = new THREE.Mesh(handle_collarGeom, yellowRubberMat);
  handle_collar.name = "handle_collar";
  handle_collar.position.set(0, -0.1, 0);
  hammer_group.add(handle_collar);

  const handle_gripShape = new THREE.Shape();
  handle_gripShape.moveTo(-0.12, -0.22);
  handle_gripShape.lineTo(0.12, -0.22);
  handle_gripShape.bezierCurveTo(0.14, -0.36, 0.17, -0.5, 0.17, -0.66);
  handle_gripShape.bezierCurveTo(0.18, -0.82, 0.17, -0.98, 0.13, -1.08);
  handle_gripShape.quadraticCurveTo(0.08, -1.18, 0, -1.19);
  handle_gripShape.quadraticCurveTo(-0.08, -1.18, -0.13, -1.08);
  handle_gripShape.bezierCurveTo(-0.17, -0.98, -0.18, -0.82, -0.17, -0.66);
  handle_gripShape.bezierCurveTo(-0.17, -0.5, -0.14, -0.36, -0.12, -0.22);
  handle_gripShape.closePath();

  const handle_gripGeom = new THREE.ExtrudeGeometry(handle_gripShape, {
    depth: 0.16,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 10,
  });
  handle_gripGeom.translate(0, 0, -0.08);

  const handle_grip = new THREE.Mesh(handle_gripGeom, yellowRubberMat);
  handle_grip.name = "handle_grip";
  hammer_group.add(handle_grip);

  const handle_end_capGeom = new THREE.SphereGeometry(1, 24, 12);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, yellowRubberMat);
  handle_end_cap.name = "handle_end_cap";
  handle_end_cap.position.set(0, -1.105, 0);
  handle_end_cap.scale.set(0.15, 0.105, 0.105);
  hammer_group.add(handle_end_cap);

  const grip_leftShape = new THREE.Shape();
  grip_leftShape.moveTo(-0.14, -0.31);
  grip_leftShape.bezierCurveTo(-0.08, -0.34, -0.035, -0.43, -0.045, -0.52);
  grip_leftShape.bezierCurveTo(-0.06, -0.68, -0.09, -0.82, -0.135, -0.91);
  grip_leftShape.bezierCurveTo(-0.165, -0.96, -0.19, -0.9, -0.178, -0.82);
  grip_leftShape.bezierCurveTo(-0.15, -0.66, -0.16, -0.47, -0.14, -0.31);
  grip_leftShape.closePath();

  const grip_leftGeom = new THREE.ExtrudeGeometry(grip_leftShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 8,
  });
  grip_leftGeom.translate(0, 0, 0.105);

  const grip_left = new THREE.Mesh(grip_leftGeom, blackRubberMat);
  grip_left.name = "grip_left";
  hammer_group.add(grip_left);

  const grip_rightShape = new THREE.Shape();
  grip_rightShape.moveTo(0.04, -0.42);
  grip_rightShape.bezierCurveTo(0.11, -0.42, 0.16, -0.49, 0.16, -0.58);
  grip_rightShape.bezierCurveTo(0.16, -0.72, 0.13, -0.88, 0.08, -0.98);
  grip_rightShape.bezierCurveTo(0.035, -1.04, -0.02, -0.98, -0.025, -0.89);
  grip_rightShape.bezierCurveTo(-0.03, -0.75, 0, -0.58, 0.04, -0.42);
  grip_rightShape.closePath();

  const grip_rightGeom = new THREE.ExtrudeGeometry(grip_rightShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 8,
  });
  grip_rightGeom.translate(0, 0, 0.105);

  const grip_right = new THREE.Mesh(grip_rightGeom, blackRubberMat);
  grip_right.name = "grip_right";
  hammer_group.add(grip_right);

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