export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "pump_root";

  const pump_assembly = new THREE.Group();
  pump_assembly.name = "pump_assembly";
  pump_assembly.rotation.y = 0.28;
  pump_assembly.rotation.z = 0.04;
  root.add(pump_assembly);

  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff5a0a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const darkOrangeMat = new THREE.MeshStandardMaterial({
    color: 0xd94305,
    metalness: 0.0,
    roughness: 0.3,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x9a260c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.8,
  });
  const labelInkMat = new THREE.MeshStandardMaterial({
    color: 0x202020,
    metalness: 0.0,
    roughness: 0.8,
  });
  const labelGrayMat = new THREE.MeshStandardMaterial({
    color: 0x969696,
    metalness: 0.0,
    roughness: 0.8,
  });

  const pump_body = new THREE.Group();
  pump_body.name = "pump_body";
  pump_assembly.add(pump_body);

  const main_housingGeom = new THREE.CylinderGeometry(0.42, 0.42, 1.76, 48);
  const main_housing = new THREE.Mesh(main_housingGeom, orangeMat);
  main_housing.name = "main_housing";
  main_housing.rotation.z = Math.PI / 2;
  main_housing.position.x = 0.04;
  pump_body.add(main_housing);

  const left_end_capProfile = [
    new THREE.Vector2(0.00, -0.25),
    new THREE.Vector2(0.30, -0.25),
    new THREE.Vector2(0.39, -0.23),
    new THREE.Vector2(0.45, -0.16),
    new THREE.Vector2(0.47, -0.04),
    new THREE.Vector2(0.47, 0.08),
    new THREE.Vector2(0.44, 0.18),
    new THREE.Vector2(0.39, 0.24),
    new THREE.Vector2(0.34, 0.25),
    new THREE.Vector2(0.00, 0.25),
  ];
  const left_end_capGeom = new THREE.LatheGeometry(left_end_capProfile, 48);
  const left_end_cap = new THREE.Mesh(left_end_capGeom, orangeMat);
  left_end_cap.name = "left_end_cap";
  left_end_cap.rotation.z = -Math.PI / 2;
  left_end_cap.position.x = -1.02;
  pump_body.add(left_end_cap);

  const left_seam_ringGeom = new THREE.TorusGeometry(0.426, 0.018, 10, 48);
  const left_seam_ring = new THREE.Mesh(left_seam_ringGeom, darkOrangeMat);
  left_seam_ring.name = "left_seam_ring";
  left_seam_ring.rotation.y = Math.PI / 2;
  left_seam_ring.position.x = -0.81;
  pump_body.add(left_seam_ring);

  const right_end_capProfile = [
    new THREE.Vector2(0.00, -0.30),
    new THREE.Vector2(0.37, -0.30),
    new THREE.Vector2(0.43, -0.27),
    new THREE.Vector2(0.48, -0.18),
    new THREE.Vector2(0.50, -0.03),
    new THREE.Vector2(0.50, 0.08),
    new THREE.Vector2(0.47, 0.18),
    new THREE.Vector2(0.42, 0.27),
    new THREE.Vector2(0.34, 0.30),
    new THREE.Vector2(0.00, 0.30),
  ];
  const right_end_capGeom = new THREE.LatheGeometry(right_end_capProfile, 48);
  const right_end_cap = new THREE.Mesh(right_end_capGeom, orangeMat);
  right_end_cap.name = "right_end_cap";
  right_end_cap.rotation.z = -Math.PI / 2;
  right_end_cap.position.x = 1.06;
  pump_body.add(right_end_cap);

  const right_seam_ringGeom = new THREE.TorusGeometry(0.432, 0.022, 10, 48);
  const right_seam_ring = new THREE.Mesh(right_seam_ringGeom, darkOrangeMat);
  right_seam_ring.name = "right_seam_ring";
  right_seam_ring.rotation.y = Math.PI / 2;
  right_seam_ring.position.x = 0.84;
  pump_body.add(right_seam_ring);

  const right_support_footGeom = new THREE.SphereGeometry(0.16, 24, 12);
  const right_support_foot = new THREE.Mesh(right_support_footGeom, orangeMat);
  right_support_foot.name = "right_support_foot";
  right_support_foot.scale.set(1.45, 0.55, 0.85);
  right_support_foot.position.set(0.98, -0.45, 0.02);
  pump_body.add(right_support_foot);

  const front_panelShape = new THREE.Shape();
  const panelW = 1.24;
  const panelH = 0.22;
  const panelR = 0.055;
  front_panelShape.moveTo(-panelW / 2 + panelR, -panelH / 2);
  front_panelShape.lineTo(panelW / 2 - panelR, -panelH / 2);
  front_panelShape.quadraticCurveTo(
    panelW / 2,
    -panelH / 2,
    panelW / 2,
    -panelH / 2 + panelR
  );
  front_panelShape.lineTo(panelW / 2, panelH / 2 - panelR);
  front_panelShape.quadraticCurveTo(
    panelW / 2,
    panelH / 2,
    panelW / 2 - panelR,
    panelH / 2
  );
  front_panelShape.lineTo(-panelW / 2 + panelR, panelH / 2);
  front_panelShape.quadraticCurveTo(
    -panelW / 2,
    panelH / 2,
    -panelW / 2,
    panelH / 2 - panelR
  );
  front_panelShape.lineTo(-panelW / 2, -panelH / 2 + panelR);
  front_panelShape.quadraticCurveTo(
    -panelW / 2,
    -panelH / 2,
    -panelW / 2 + panelR,
    -panelH / 2
  );

  const front_panelGeom = new THREE.ExtrudeGeometry(front_panelShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const front_panel = new THREE.Mesh(front_panelGeom, orangeMat);
  front_panel.name = "front_panel";
  front_panel.position.set(-0.08, -0.045, 0.405);
  pump_body.add(front_panel);

  const front_panel_recessGeom = new THREE.BoxGeometry(1.03, 0.025, 0.008);
  const front_panel_recess = new THREE.Mesh(front_panel_recessGeom, darkOrangeMat);
  front_panel_recess.name = "front_panel_recess";
  front_panel_recess.position.set(-0.08, -0.125, 0.477);
  pump_body.add(front_panel_recess);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  pump_body.add(label_group);

  const labelRadius = 0.42;
  const labelX = 0.49;
  const labelTheta = -0.18;
  const labelNormal = new THREE.Vector3(
    0,
    Math.sin(labelTheta),
    Math.cos(labelTheta)
  );
  const labelTangent = new THREE.Vector3(
    0,
    Math.cos(labelTheta),
    -Math.sin(labelTheta)
  );

  label_group.position.set(
    labelX,
    labelNormal.y * (labelRadius + 0.006),
    labelNormal.z * (labelRadius + 0.006)
  );
  label_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    labelNormal
  );

  const product_labelGeom = new THREE.PlaneGeometry(0.58, 0.18);
  const product_label = new THREE.Mesh(product_labelGeom, labelMat);
  product_label.name = "product_label";
  label_group.add(product_label);

  const label_barcodeGeom = new THREE.PlaneGeometry(0.008, 0.082);
  const label_barcode = new THREE.InstancedMesh(
    label_barcodeGeom,
    labelInkMat,
    11
  );
  label_barcode.name = "label_barcode";
  const barcodeDummy = new THREE.Object3D();
  for (let i = 0; i < 11; i++) {
    barcodeDummy.position.set(-0.245 + i * 0.014, 0.008, 0.003);
    barcodeDummy.scale.set(
      i % 3 === 0 ? 1.45 : 0.75,
      i % 4 === 0 ? 0.78 : 1.0,
      1
    );
    barcodeDummy.rotation.set(0, 0, 0);
    barcodeDummy.updateMatrix();
    label_barcode.setMatrixAt(i, barcodeDummy.matrix);
  }
  label_barcode.instanceMatrix.needsUpdate = true;
  label_group.add(label_barcode);

  const label_text_linesGeom = new THREE.PlaneGeometry(0.15, 0.008);
  const label_text_lines = new THREE.InstancedMesh(
    label_text_linesGeom,
    labelInkMat,
    5
  );
  label_text_lines.name = "label_text_lines";
  const textDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    textDummy.position.set(0.015, 0.052 - i * 0.022, 0.003);
    textDummy.scale.set(1.0 - i * 0.075, 1, 1);
    textDummy.rotation.set(0, 0, 0);
    textDummy.updateMatrix();
    label_text_lines.setMatrixAt(i, textDummy.matrix);
  }
  label_text_lines.instanceMatrix.needsUpdate = true;
  label_group.add(label_text_lines);

  const label_headerGeom = new THREE.PlaneGeometry(0.12, 0.025);
  const label_header = new THREE.Mesh(label_headerGeom, labelInkMat);
  label_header.name = "label_header";
  label_header.position.set(0.145, -0.058, 0.003);
  label_group.add(label_header);

  const label_iconGeom = new THREE.RingGeometry(0.014, 0.022, 16);
  const label_icon = new THREE.Mesh(label_iconGeom, labelGrayMat);
  label_icon.name = "label_icon";
  label_icon.position.set(0.245, 0.045, 0.004);
  label_group.add(label_icon);

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
    return shape;
  }

  const front_face_details = new THREE.Group();
  front_face_details.name = "front_face_details";
  pump_body.add(front_face_details);

  const front_recess_rimShape = roundedRectShape(0.19, 0.29, 0.065);
  const front_recess_rimGeom = new THREE.ShapeGeometry(front_recess_rimShape);
  const front_recess_rim = new THREE.Mesh(front_recess_rimGeom, darkOrangeMat);
  front_recess_rim.name = "front_recess_rim";
  front_recess_rim.rotation.y = -Math.PI / 2;
  front_recess_rim.position.set(-1.276, 0.075, 0.018);
  front_face_details.add(front_recess_rim);

  const front_recessShape = roundedRectShape(0.125, 0.225, 0.045);
  const front_recessGeom = new THREE.ShapeGeometry(front_recessShape);
  const front_recess = new THREE.Mesh(front_recessGeom, recessMat);
  front_recess.name = "front_recess";
  front_recess.rotation.y = -Math.PI / 2;
  front_recess.position.set(-1.281, 0.075, 0.018);
  front_face_details.add(front_recess);

  const lower_face_slot_rimShape = roundedRectShape(0.145, 0.225, 0.045);
  const lower_face_slot_rimGeom = new THREE.ShapeGeometry(
    lower_face_slot_rimShape
  );
  const lower_face_slot_rim = new THREE.Mesh(
    lower_face_slot_rimGeom,
    darkOrangeMat
  );
  lower_face_slot_rim.name = "lower_face_slot_rim";
  lower_face_slot_rim.rotation.y = -Math.PI / 2;
  lower_face_slot_rim.position.set(-1.276, -0.225, 0.105);
  front_face_details.add(lower_face_slot_rim);

  const lower_face_slotShape = roundedRectShape(0.082, 0.16, 0.028);
  const lower_face_slotGeom = new THREE.ShapeGeometry(lower_face_slotShape);
  const lower_face_slot = new THREE.Mesh(lower_face_slotGeom, recessMat);
  lower_face_slot.name = "lower_face_slot";
  lower_face_slot.rotation.y = -Math.PI / 2;
  lower_face_slot.position.set(-1.281, -0.225, 0.105);
  front_face_details.add(lower_face_slot);

  const outlet_group = new THREE.Group();
  outlet_group.name = "outlet_group";
  pump_body.add(outlet_group);

  const nozzle_mountGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.18, 32);
  const nozzle_mount = new THREE.Mesh(nozzle_mountGeom, orangeMat);
  nozzle_mount.name = "nozzle_mount";
  nozzle_mount.rotation.z = Math.PI / 2;
  nozzle_mount.position.x = -1.31;
  outlet_group.add(nozzle_mount);

  const nozzle_gasketGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.06, 32);
  const nozzle_gasket = new THREE.Mesh(nozzle_gasketGeom, darkOrangeMat);
  nozzle_gasket.name = "nozzle_gasket";
  nozzle_gasket.rotation.z = Math.PI / 2;
  nozzle_gasket.position.x = -1.405;
  outlet_group.add(nozzle_gasket);

  const nozzle_stemGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.22, 24);
  const nozzle_stem = new THREE.Mesh(nozzle_stemGeom, orangeMat);
  nozzle_stem.name = "nozzle_stem";
  nozzle_stem.rotation.z = Math.PI / 2;
  nozzle_stem.position.x = -1.50;
  outlet_group.add(nozzle_stem);

  const threaded_nozzle_coreGeom = new THREE.CylinderGeometry(
    0.086,
    0.086,
    0.30,
    24
  );
  const threaded_nozzle_core = new THREE.Mesh(
    threaded_nozzle_coreGeom,
    silverMat
  );
  threaded_nozzle_core.name = "threaded_nozzle_core";
  threaded_nozzle_core.rotation.z = Math.PI / 2;
  threaded_nozzle_core.position.x = -1.72;
  outlet_group.add(threaded_nozzle_core);

  const nozzle_thread_ridgesGeom = new THREE.TorusGeometry(
    0.086,
    0.008,
    8,
    24
  );
  const nozzle_thread_ridges = new THREE.InstancedMesh(
    nozzle_thread_ridgesGeom,
    silverMat,
    10
  );
  nozzle_thread_ridges.name = "nozzle_thread_ridges";
  const threadDummy = new THREE.Object3D();
  for (let i = 0; i < 10; i++) {
    threadDummy.position.set(-1.845 + i * 0.0275, 0, 0);
    threadDummy.rotation.set(0, Math.PI / 2, 0);
    threadDummy.scale.set(1, 1, 1);
    threadDummy.updateMatrix();
    nozzle_thread_ridges.setMatrixAt(i, threadDummy.matrix);
  }
  nozzle_thread_ridges.instanceMatrix.needsUpdate = true;
  outlet_group.add(nozzle_thread_ridges);

  const nozzle_tipGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.045, 24);
  const nozzle_tip = new THREE.Mesh(nozzle_tipGeom, silverMat);
  nozzle_tip.name = "nozzle_tip";
  nozzle_tip.rotation.z = Math.PI / 2;
  nozzle_tip.position.x = -1.895;
  outlet_group.add(nozzle_tip);

  const nozzle_openingGeom = new THREE.CylinderGeometry(
    0.038,
    0.038,
    0.008,
    20
  );
  const nozzle_opening = new THREE.Mesh(nozzle_openingGeom, darkMetalMat);
  nozzle_opening.name = "nozzle_opening";
  nozzle_opening.rotation.z = Math.PI / 2;
  nozzle_opening.position.x = -1.921;
  outlet_group.add(nozzle_opening);

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

  fitToUnitCube(root);
  return root;
}