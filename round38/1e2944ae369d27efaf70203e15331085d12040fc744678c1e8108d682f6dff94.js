export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 1.18;
  const bodyH = 0.68;
  const bodyD = 0.98;
  const cornerR = 0.09;
  const bevelSize = 0.035;
  const bevelThickness = 0.035;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc99a63,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x7d4b2d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x24231e,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a36,
    metalness: 0.5,
    roughness: 0.3,
  });
  const brassDarkMat = new THREE.MeshStandardMaterial({
    color: 0x765a24,
    metalness: 0.5,
    roughness: 0.42,
  });
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0x716044,
    metalness: 0.0,
    roughness: 0.95,
  });
  const cordHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xa9956e,
    metalness: 0.0,
    roughness: 0.95,
  });

  const bodyShape = new THREE.Shape();
  const x0 = -bodyW / 2;
  const x1 = bodyW / 2;
  const y0 = -bodyH / 2;
  const y1 = bodyH / 2;
  bodyShape.moveTo(x0 + cornerR, y0);
  bodyShape.lineTo(x1 - cornerR, y0);
  bodyShape.quadraticCurveTo(x1, y0, x1, y0 + cornerR);
  bodyShape.lineTo(x1, y1 - cornerR);
  bodyShape.quadraticCurveTo(x1, y1, x1 - cornerR, y1);
  bodyShape.lineTo(x0 + cornerR, y1);
  bodyShape.quadraticCurveTo(x0, y1, x0, y1 - cornerR);
  bodyShape.lineTo(x0, y0 + cornerR);
  bodyShape.quadraticCurveTo(x0, y0, x0 + cornerR, y0);
  bodyShape.closePath();

  const bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: bodyD,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelSegments: 4,
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.position.z = -bodyD / 2;
  root.add(body);

  const grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const grainDummy = new THREE.Object3D();

  const topGrainCount = 34;
  const top_grain = new THREE.InstancedMesh(grainGeom, grainMat, topGrainCount);
  for (let i = 0; i < topGrainCount; i++) {
    const length = 0.07 + ((i * 19) % 13) * 0.022;
    const x = -0.42 + (((i * 37) % 97) / 96) * 0.84;
    const z = -0.37 + (((i * 53) % 89) / 88) * 0.74;
    const angle = (((i * 11) % 9) - 4) * 0.018;
    grainDummy.position.set(x, bodyH / 2 + bevelSize + 0.002, z);
    grainDummy.rotation.set(0, angle, 0);
    grainDummy.scale.set(length, 0.0025, 0.005);
    grainDummy.updateMatrix();
    top_grain.setMatrixAt(i, grainDummy.matrix);
  }
  top_grain.instanceMatrix.needsUpdate = true;
  root.add(top_grain);

  const frontGrainCount = 32;
  const front_grain = new THREE.InstancedMesh(grainGeom, grainMat, frontGrainCount);
  for (let i = 0; i < frontGrainCount; i++) {
    const length = 0.06 + ((i * 17) % 11) * 0.025;
    const x = -0.43 + (((i * 43) % 101) / 100) * 0.86;
    const y = -0.245 + (((i * 29) % 83) / 82) * 0.49;
    const angle = (((i * 7) % 11) - 5) * 0.022;
    grainDummy.position.set(x, y, bodyD / 2 + bevelThickness + 0.003);
    grainDummy.rotation.set(0, 0, angle);
    grainDummy.scale.set(length, 0.004, 0.0025);
    grainDummy.updateMatrix();
    front_grain.setMatrixAt(i, grainDummy.matrix);
  }
  front_grain.instanceMatrix.needsUpdate = true;
  root.add(front_grain);

  const sideGrainCount = 44;
  const side_grain = new THREE.InstancedMesh(grainGeom, grainMat, sideGrainCount);
  for (let i = 0; i < sideGrainCount; i++) {
    const j = i % (sideGrainCount / 2);
    const side = i < sideGrainCount / 2 ? 1 : -1;
    const length = 0.06 + ((j * 23) % 12) * 0.021;
    const z = -0.35 + (((j * 41) % 79) / 78) * 0.70;
    const y = -0.245 + (((j * 31) % 73) / 72) * 0.49;
    const angle = (((j * 13) % 9) - 4) * 0.025;
    grainDummy.position.set(
      side * (bodyW / 2 + bevelSize + 0.002),
      y,
      z
    );
    grainDummy.rotation.set(angle, 0, 0);
    grainDummy.scale.set(0.0025, 0.004, length);
    grainDummy.updateMatrix();
    side_grain.setMatrixAt(i, grainDummy.matrix);
  }
  side_grain.instanceMatrix.needsUpdate = true;
  root.add(side_grain);

  const dialX = -0.19;
  const dialY = -0.075;
  const faceZ = bodyD / 2 + bevelThickness + 0.006;
  const dial_group = new THREE.Group();
  dial_group.position.set(dialX, dialY, faceZ);

  const dial_scaleGeom = new THREE.TorusGeometry(0.205, 0.0045, 6, 64);
  const dial_scale = new THREE.Mesh(dial_scaleGeom, inkMat);
  dial_scale.position.z = 0.002;
  dial_group.add(dial_scale);

  const dialTickGeom = new THREE.BoxGeometry(0.009, 0.032, 0.004);
  const dial_ticks = new THREE.InstancedMesh(dialTickGeom, inkMat, 12);
  const dialDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    dialDummy.position.set(
      Math.sin(angle) * 0.181,
      Math.cos(angle) * 0.181,
      0.007
    );
    dialDummy.rotation.set(0, 0, -angle);
    const major = i % 3 === 0 ? 1.35 : 0.78;
    dialDummy.scale.set(1, major, 1);
    dialDummy.updateMatrix();
    dial_ticks.setMatrixAt(i, dialDummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_ticks);

  const dial_hubGeom = new THREE.CylinderGeometry(0.041, 0.046, 0.027, 20);
  const dial_hub = new THREE.Mesh(dial_hubGeom, brassDarkMat);
  dial_hub.rotation.x = Math.PI / 2;
  dial_hub.position.z = 0.014;
  dial_group.add(dial_hub);

  const dial_hub_capGeom = new THREE.SphereGeometry(0.043, 20, 12);
  const dial_hub_cap = new THREE.Mesh(dial_hub_capGeom, brassMat);
  dial_hub_cap.scale.set(1, 1, 0.38);
  dial_hub_cap.position.z = 0.031;
  dial_group.add(dial_hub_cap);

  const dialIndexGeom = new THREE.BoxGeometry(0.012, 0.04, 0.004);
  const dial_index_mark = new THREE.Mesh(dialIndexGeom, inkMat);
  dial_index_mark.position.set(0, -0.158, 0.008);
  dial_group.add(dial_index_mark);

  const dialLabelGeom = new THREE.BoxGeometry(0.007, 0.019, 0.003);
  const dial_label_marks = new THREE.InstancedMesh(dialLabelGeom, inkMat, 5);
  const labelData = [
    [-0.041, -0.178, 0],
    [-0.027, -0.178, 0.45],
    [-0.011, -0.178, -0.4],
    [0.008, -0.178, 0],
    [0.027, -0.178, 0.45],
  ];
  for (let i = 0; i < labelData.length; i++) {
    const data = labelData[i];
    dialDummy.position.set(data[0], data[1], 0.008);
    dialDummy.rotation.set(0, 0, data[2]);
    dialDummy.scale.set(1, 1, 1);
    dialDummy.updateMatrix();
    dial_label_marks.setMatrixAt(i, dialDummy.matrix);
  }
  dial_label_marks.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_label_marks);
  root.add(dial_group);

  const sideButtonX = bodyW / 2 + bevelSize + 0.006;
  const sideButtonY = 0.015;
  const sideButtonZ = 0.10;

  const side_button_baseGeom = new THREE.CylinderGeometry(0.046, 0.046, 0.018, 20);
  const side_button_base = new THREE.Mesh(side_button_baseGeom, brassDarkMat);
  side_button_base.rotation.z = Math.PI / 2;
  side_button_base.position.set(sideButtonX, sideButtonY, sideButtonZ);
  root.add(side_button_base);

  const side_buttonGeom = new THREE.SphereGeometry(0.047, 20, 12);
  const side_button = new THREE.Mesh(side_buttonGeom, brassMat);
  side_button.scale.set(0.42, 1, 1);
  side_button.position.set(sideButtonX + 0.018, sideButtonY, sideButtonZ);
  root.add(side_button);

  const sideLabelGeom = new THREE.BoxGeometry(0.006, 1, 1);
  const sideLabelSegments = [
    [0.000, 0.032, 0.008, 0.050, 0],
    [-0.025, -0.018, 0.008, 0.090, 0],
    [-0.018, -0.058, 0.008, 0.040, -0.55],
    [-0.004, -0.058, 0.008, 0.040, 0.55],
    [0.020, -0.043, 0.008, 0.070, 0],
    [0.046, -0.043, 0.008, 0.070, 0],
    [0.033, -0.078, 0.008, 0.065, 0],
    [0.069, -0.057, 0.008, 0.050, 0],
    [0.086, -0.043, 0.008, 0.070, 0],
    [0.106, -0.043, 0.008, 0.070, 0],
    [0.096, -0.078, 0.008, 0.055, 0],
  ];
  const side_label = new THREE.InstancedMesh(
    sideLabelGeom,
    inkMat,
    sideLabelSegments.length
  );
  for (let i = 0; i < sideLabelSegments.length; i++) {
    const segment = sideLabelSegments[i];
    grainDummy.position.set(
      sideButtonX + 0.012,
      segment[1],
      segment[0] + 0.05
    );
    grainDummy.rotation.set(segment[4], 0, 0);
    grainDummy.scale.set(1, segment[3], segment[2]);
    grainDummy.updateMatrix();
    side_label.setMatrixAt(i, grainDummy.matrix);
  }
  side_label.instanceMatrix.needsUpdate = true;
  root.add(side_label);

  const spindleX = 0.08;
  const spindleZ = -0.07;

  const spindle_base_shadowGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.012, 24);
  const spindle_base_shadow = new THREE.Mesh(spindle_base_shadowGeom, brassDarkMat);
  spindle_base_shadow.position.set(spindleX, 0.381, spindleZ);
  root.add(spindle_base_shadow);

  const spindle_baseGeom = new THREE.CylinderGeometry(0.069, 0.075, 0.031, 24);
  const spindle_base = new THREE.Mesh(spindle_baseGeom, brassMat);
  spindle_base.position.set(spindleX, 0.397, spindleZ);
  root.add(spindle_base);

  const spindle_base_rimGeom = new THREE.TorusGeometry(0.061, 0.009, 8, 32);
  const spindle_base_rim = new THREE.Mesh(spindle_base_rimGeom, brassMat);
  spindle_base_rim.rotation.x = Math.PI / 2;
  spindle_base_rim.position.set(spindleX, 0.413, spindleZ);
  root.add(spindle_base_rim);

  const postBottom = 0.412;
  const postTop = 1.19;
  const postH = postTop - postBottom;
  const postRBottom = 0.038;
  const postRTop = 0.029;

  const upright_postGeom = new THREE.CylinderGeometry(
    postRTop,
    postRBottom,
    postH,
    24
  );
  const upright_post = new THREE.Mesh(upright_postGeom, brassMat);
  upright_post.position.set(spindleX, postBottom + postH / 2, spindleZ);
  root.add(upright_post);

  const post_capGeom = new THREE.SphereGeometry(0.032, 20, 12);
  const post_cap = new THREE.Mesh(post_capGeom, brassMat);
  post_cap.scale.set(1, 0.48, 1);
  post_cap.position.set(spindleX, postTop, spindleZ);
  root.add(post_cap);

  const post_cap_insetGeom = new THREE.CylinderGeometry(0.013, 0.013, 0.004, 16);
  const post_cap_inset = new THREE.Mesh(post_cap_insetGeom, brassDarkMat);
  post_cap_inset.position.set(spindleX, postTop + 0.015, spindleZ);
  root.add(post_cap_inset);

  const topEyeletGeom = new THREE.TorusGeometry(0.039, 0.009, 8, 32);
  const top_eyelet = new THREE.Mesh(topEyeletGeom, brassMat);
  top_eyelet.position.set(spindleX - 0.026, 1.178, spindleZ + 0.004);
  root.add(top_eyelet);

  const eyeletPinGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.025, 16);
  const eyelet_pin = new THREE.Mesh(eyeletPinGeom, brassDarkMat);
  eyelet_pin.rotation.x = Math.PI / 2;
  eyelet_pin.position.set(spindleX - 0.026, 1.178, spindleZ + 0.004);
  root.add(eyelet_pin);

  const cordPath = [
    new THREE.Vector3(spindleX - 0.061, 1.174, spindleZ + 0.012),
    new THREE.Vector3(spindleX - 0.095, 1.112, spindleZ + 0.016),
    new THREE.Vector3(spindleX - 0.137, 1.035, spindleZ + 0.020),
    new THREE.Vector3(spindleX - 0.181, 0.954, spindleZ + 0.025),
    new THREE.Vector3(spindleX - 0.226, 0.870, spindleZ + 0.030),
    new THREE.Vector3(spindleX - 0.273, 0.784, spindleZ + 0.035),
  ];
  const windingCordCurve = new THREE.CatmullRomCurve3(cordPath);
  const winding_cordGeom = new THREE.TubeGeometry(
    windingCordCurve,
    48,
    0.006,
    6,
    false
  );
  const winding_cord = new THREE.Mesh(winding_cordGeom, cordMat);
  root.add(winding_cord);

  const cordHighlightPath = [
    new THREE.Vector3(spindleX - 0.058, 1.174, spindleZ + 0.018),
    new THREE.Vector3(spindleX - 0.091, 1.112, spindleZ + 0.022),
    new THREE.Vector3(spindleX - 0.133, 1.035, spindleZ + 0.026),
    new THREE.Vector3(spindleX - 0.177, 0.954, spindleZ + 0.031),
    new THREE.Vector3(spindleX - 0.222, 0.870, spindleZ + 0.036),
    new THREE.Vector3(spindleX - 0.269, 0.784, spindleZ + 0.041),
  ];
  const cordHighlightCurve = new THREE.CatmullRomCurve3(cordHighlightPath);
  const cord_highlightGeom = new THREE.TubeGeometry(
    cordHighlightCurve,
    48,
    0.0015,
    5,
    false
  );
  const cord_highlight = new THREE.Mesh(cord_highlightGeom, cordHighlightMat);
  root.add(cord_highlight);

  const cord_knotGeom = new THREE.SphereGeometry(0.012, 12, 8);
  const cord_knot = new THREE.Mesh(cord_knotGeom, cordMat);
  cord_knot.position.copy(cordPath[0]);
  root.add(cord_knot);

  const cordEnd = cordPath[cordPath.length - 1];
  const cordPrev = cordPath[cordPath.length - 2];
  const cordDirection = cordEnd.clone().sub(cordPrev).normalize();
  const cord_tipGeom = new THREE.CylinderGeometry(0.009, 0.011, 0.035, 10);
  const cord_tip = new THREE.Mesh(cord_tipGeom, cordMat);
  cord_tip.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    cordDirection
  );
  cord_tip.position.copy(cordEnd).add(cordDirection.clone().multiplyScalar(0.012));
  root.add(cord_tip);

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