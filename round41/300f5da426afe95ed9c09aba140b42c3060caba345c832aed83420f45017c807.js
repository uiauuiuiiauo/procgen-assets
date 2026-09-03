export default function generate(THREE) {
  const root = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xe3a071,
    metalness: 0.0,
    roughness: 0.7,
  });
  const innerEarMat = new THREE.MeshStandardMaterial({
    color: 0xb96550,
    metalness: 0.0,
    roughness: 0.7,
  });
  const cheekMat = new THREE.MeshStandardMaterial({
    color: 0xf18476,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.62,
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x55514b,
    metalness: 0.0,
    roughness: 0.9,
  });
  const eyebrowMat = new THREE.MeshStandardMaterial({
    color: 0x302d2a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xf5f2e8,
    metalness: 0.0,
    roughness: 0.4,
  });
  const pupilMat = new THREE.MeshStandardMaterial({
    color: 0x171718,
    metalness: 0.0,
    roughness: 0.3,
  });
  const irisMat = new THREE.MeshStandardMaterial({
    color: 0x65513d,
    metalness: 0.0,
    roughness: 0.4,
  });
  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0xb52e2e,
    metalness: 0.0,
    roughness: 0.65,
  });
  const teethMat = new THREE.MeshStandardMaterial({
    color: 0xfff4df,
    metalness: 0.0,
    roughness: 0.4,
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xd9363e,
    metalness: 0.0,
    roughness: 0.95,
  });
  const whitePlaidMat = new THREE.MeshStandardMaterial({
    color: 0xf6eee7,
    metalness: 0.0,
    roughness: 0.95,
  });
  const darkPlaidMat = new THREE.MeshStandardMaterial({
    color: 0x9f2731,
    metalness: 0.0,
    roughness: 0.95,
  });
  const pantsMat = new THREE.MeshStandardMaterial({
    color: 0x174f98,
    metalness: 0.0,
    roughness: 0.95,
  });
  const pantsSeamMat = new THREE.MeshStandardMaterial({
    color: 0x103768,
    metalness: 0.0,
    roughness: 0.95,
  });
  const bootMat = new THREE.MeshStandardMaterial({
    color: 0x242122,
    metalness: 0.0,
    roughness: 0.7,
  });
  const soleMat = new THREE.MeshStandardMaterial({
    color: 0x111011,
    metalness: 0.0,
    roughness: 0.8,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const hatMat = new THREE.MeshStandardMaterial({
    color: 0x1674cf,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const hatEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x0d559c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x659d20,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mossDarkMat = new THREE.MeshStandardMaterial({
    color: 0x376f16,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mossLightMat = new THREE.MeshStandardMaterial({
    color: 0x91bb37,
    metalness: 0.0,
    roughness: 0.9,
  });

  function addTube(points, radius, material, tubularSegments = 16) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubularSegments, radius, 6, false),
      material
    );
  }

  const unitSphereGeom = new THREE.SphereGeometry(1, 28, 18);

  // Head and ears.
  const headGeom = new THREE.SphereGeometry(1, 36, 24);
  const head = new THREE.Mesh(headGeom, skinMat);
  head.position.set(0, 1.72, 0.04);
  head.scale.set(0.56, 0.65, 0.50);
  root.add(head);

  const hair_backGeom = new THREE.SphereGeometry(1, 28, 18);
  const hair_back = new THREE.Mesh(hair_backGeom, hairMat);
  hair_back.position.set(0, 1.76, -0.34);
  hair_back.scale.set(0.47, 0.47, 0.18);
  root.add(hair_back);

  const left_ear = new THREE.Mesh(unitSphereGeom, skinMat);
  left_ear.position.set(-0.57, 1.68, 0.01);
  left_ear.scale.set(0.22, 0.27, 0.14);
  root.add(left_ear);

  const right_ear = new THREE.Mesh(unitSphereGeom, skinMat);
  right_ear.position.set(0.57, 1.68, 0.01);
  right_ear.scale.set(0.22, 0.27, 0.14);
  root.add(right_ear);

  const left_inner_ear = new THREE.Mesh(unitSphereGeom, innerEarMat);
  left_inner_ear.position.set(-0.655, 1.68, 0.075);
  left_inner_ear.scale.set(0.095, 0.145, 0.065);
  root.add(left_inner_ear);

  const right_inner_ear = new THREE.Mesh(unitSphereGeom, innerEarMat);
  right_inner_ear.position.set(0.655, 1.68, 0.075);
  right_inner_ear.scale.set(0.095, 0.145, 0.065);
  root.add(right_inner_ear);

  const left_sideburn = new THREE.Mesh(unitSphereGeom, hairMat);
  left_sideburn.position.set(-0.47, 1.67, 0.20);
  left_sideburn.scale.set(0.105, 0.25, 0.075);
  root.add(left_sideburn);

  const right_sideburn = new THREE.Mesh(unitSphereGeom, hairMat);
  right_sideburn.position.set(0.47, 1.67, 0.20);
  right_sideburn.scale.set(0.105, 0.25, 0.075);
  root.add(right_sideburn);

  // Eyes.
  const left_eye_white = new THREE.Mesh(unitSphereGeom, eyeWhiteMat);
  left_eye_white.position.set(-0.205, 1.82, 0.485);
  left_eye_white.scale.set(0.13, 0.16, 0.065);
  root.add(left_eye_white);

  const right_eye_white = new THREE.Mesh(unitSphereGeom, eyeWhiteMat);
  right_eye_white.position.set(0.205, 1.82, 0.485);
  right_eye_white.scale.set(0.13, 0.16, 0.065);
  root.add(right_eye_white);

  const left_iris = new THREE.Mesh(unitSphereGeom, irisMat);
  left_iris.position.set(-0.19, 1.815, 0.548);
  left_iris.scale.set(0.066, 0.09, 0.025);
  root.add(left_iris);

  const right_iris = new THREE.Mesh(unitSphereGeom, irisMat);
  right_iris.position.set(0.22, 1.815, 0.548);
  right_iris.scale.set(0.066, 0.09, 0.025);
  root.add(right_iris);

  const left_pupil = new THREE.Mesh(unitSphereGeom, pupilMat);
  left_pupil.position.set(-0.183, 1.812, 0.574);
  left_pupil.scale.set(0.035, 0.055, 0.018);
  root.add(left_pupil);

  const right_pupil = new THREE.Mesh(unitSphereGeom, pupilMat);
  right_pupil.position.set(0.228, 1.812, 0.574);
  right_pupil.scale.set(0.035, 0.055, 0.018);
  root.add(right_pupil);

  const left_eye_highlight = new THREE.Mesh(unitSphereGeom, eyeWhiteMat);
  left_eye_highlight.position.set(-0.17, 1.845, 0.591);
  left_eye_highlight.scale.setScalar(0.013);
  root.add(left_eye_highlight);

  const right_eye_highlight = new THREE.Mesh(unitSphereGeom, eyeWhiteMat);
  right_eye_highlight.position.set(0.24, 1.845, 0.591);
  right_eye_highlight.scale.setScalar(0.013);
  root.add(right_eye_highlight);

  const left_eyebrow = addTube([
    new THREE.Vector3(-0.34, 1.99, 0.46),
    new THREE.Vector3(-0.22, 2.045, 0.50),
    new THREE.Vector3(-0.09, 2.00, 0.50),
  ], 0.025, eyebrowMat, 14);
  root.add(left_eyebrow);

  const right_eyebrow = addTube([
    new THREE.Vector3(0.09, 2.00, 0.50),
    new THREE.Vector3(0.22, 2.045, 0.50),
    new THREE.Vector3(0.34, 1.99, 0.46),
  ], 0.025, eyebrowMat, 14);
  root.add(right_eyebrow);

  const forehead_crease_upper = addTube([
    new THREE.Vector3(-0.23, 2.105, 0.39),
    new THREE.Vector3(0, 2.13, 0.41),
    new THREE.Vector3(0.23, 2.105, 0.39),
  ], 0.008, innerEarMat, 14);
  root.add(forehead_crease_upper);

  const forehead_crease_lower = addTube([
    new THREE.Vector3(-0.20, 2.055, 0.43),
    new THREE.Vector3(0, 2.075, 0.45),
    new THREE.Vector3(0.20, 2.055, 0.43),
  ], 0.007, innerEarMat, 14);
  root.add(forehead_crease_lower);

  // Cheeks, nose, and mouth.
  const left_cheek = new THREE.Mesh(unitSphereGeom, cheekMat);
  left_cheek.position.set(-0.31, 1.56, 0.425);
  left_cheek.scale.set(0.20, 0.145, 0.025);
  root.add(left_cheek);

  const right_cheek = new THREE.Mesh(unitSphereGeom, cheekMat);
  right_cheek.position.set(0.31, 1.56, 0.425);
  right_cheek.scale.set(0.20, 0.145, 0.025);
  root.add(right_cheek);

  const nose = new THREE.Mesh(unitSphereGeom, skinMat);
  nose.position.set(0.035, 1.66, 0.57);
  nose.scale.set(0.23, 0.18, 0.27);
  root.add(nose);

  const left_nostril = new THREE.Mesh(unitSphereGeom, innerEarMat);
  left_nostril.position.set(-0.025, 1.575, 0.795);
  left_nostril.scale.set(0.025, 0.018, 0.012);
  root.add(left_nostril);

  const right_nostril = new THREE.Mesh(unitSphereGeom, innerEarMat);
  right_nostril.position.set(0.095, 1.575, 0.795);
  right_nostril.scale.set(0.025, 0.018, 0.012);
  root.add(right_nostril);

  const mouth_opening = new THREE.Mesh(unitSphereGeom, mouthMat);
  mouth_opening.position.set(0.04, 1.405, 0.475);
  mouth_opening.scale.set(0.18, 0.068, 0.025);
  root.add(mouth_opening);

  const teeth = new THREE.Mesh(unitSphereGeom, teethMat);
  teeth.position.set(0.04, 1.435, 0.502);
  teeth.scale.set(0.105, 0.025, 0.012);
  root.add(teeth);

  const lower_lip = addTube([
    new THREE.Vector3(-0.11, 1.39, 0.497),
    new THREE.Vector3(0.04, 1.355, 0.515),
    new THREE.Vector3(0.19, 1.39, 0.497),
  ], 0.014, mouthMat, 16);
  root.add(lower_lip);

  const left_smile_crease = addTube([
    new THREE.Vector3(-0.13, 1.46, 0.465),
    new THREE.Vector3(-0.16, 1.42, 0.475),
    new THREE.Vector3(-0.13, 1.38, 0.475),
  ], 0.007, innerEarMat, 10);
  root.add(left_smile_crease);

  const right_smile_crease = addTube([
    new THREE.Vector3(0.21, 1.46, 0.465),
    new THREE.Vector3(0.24, 1.42, 0.475),
    new THREE.Vector3(0.21, 1.38, 0.475),
  ], 0.007, innerEarMat, 10);
  root.add(right_smile_crease);

  // Gingham shirt torso.
  const torsoShape = new THREE.Shape();
  torsoShape.moveTo(-0.38, -0.46);
  torsoShape.lineTo(0.38, -0.46);
  torsoShape.lineTo(0.47, 0.38);
  torsoShape.lineTo(-0.47, 0.38);
  torsoShape.closePath();

  const torsoGeom = new THREE.ExtrudeGeometry(torsoShape, {
    depth: 0.58,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
  });
  const torso = new THREE.Mesh(torsoGeom, shirtMat);
  torso.position.set(0, 0.84, -0.29);
  root.add(torso);

  const torso_vertical_stripesGeom = new THREE.BoxGeometry(0.072, 0.75, 0.012);
  const torso_vertical_stripes = new THREE.InstancedMesh(
    torso_vertical_stripesGeom,
    whitePlaidMat,
    5
  );
  const torsoStripeDummy = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    torsoStripeDummy.position.set(-0.32 + i * 0.16, 0.84, 0.337);
    torsoStripeDummy.updateMatrix();
    torso_vertical_stripes.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  torso_vertical_stripes.instanceMatrix.needsUpdate = true;
  root.add(torso_vertical_stripes);

  const torso_horizontal_stripesGeom = new THREE.BoxGeometry(0.78, 0.064, 0.012);
  const torso_horizontal_stripes = new THREE.InstancedMesh(
    torso_horizontal_stripesGeom,
    whitePlaidMat,
    6
  );
  for (let i = 0; i < 6; i++) {
    torsoStripeDummy.position.set(0, 0.54 + i * 0.12, 0.339);
    torsoStripeDummy.updateMatrix();
    torso_horizontal_stripes.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  torso_horizontal_stripes.instanceMatrix.needsUpdate = true;
  root.add(torso_horizontal_stripes);

  const torso_dark_verticalGeom = new THREE.BoxGeometry(0.018, 0.75, 0.014);
  const torso_dark_vertical = new THREE.InstancedMesh(
    torso_dark_verticalGeom,
    darkPlaidMat,
    4
  );
  for (let i = 0; i < 4; i++) {
    torsoStripeDummy.position.set(-0.24 + i * 0.16, 0.84, 0.346);
    torsoStripeDummy.updateMatrix();
    torso_dark_vertical.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  torso_dark_vertical.instanceMatrix.needsUpdate = true;
  root.add(torso_dark_vertical);

  const torso_dark_horizontalGeom = new THREE.BoxGeometry(0.78, 0.016, 0.014);
  const torso_dark_horizontal = new THREE.InstancedMesh(
    torso_dark_horizontalGeom,
    darkPlaidMat,
    5
  );
  for (let i = 0; i < 5; i++) {
    torsoStripeDummy.position.set(0, 0.60 + i * 0.12, 0.347);
    torsoStripeDummy.updateMatrix();
    torso_dark_horizontal.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  torso_dark_horizontal.instanceMatrix.needsUpdate = true;
  root.add(torso_dark_horizontal);

  const shirt_placketGeom = new THREE.BoxGeometry(0.055, 0.67, 0.025);
  const shirt_placket = new THREE.Mesh(shirt_placketGeom, shirtMat);
  shirt_placket.position.set(0.075, 0.82, 0.36);
  root.add(shirt_placket);

  const left_collarShape = new THREE.Shape();
  left_collarShape.moveTo(-0.37, 1.18);
  left_collarShape.lineTo(-0.05, 1.12);
  left_collarShape.lineTo(-0.13, 0.93);
  left_collarShape.lineTo(-0.38, 1.04);
  left_collarShape.closePath();
  const left_collarGeom = new THREE.ExtrudeGeometry(left_collarShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const left_collar = new THREE.Mesh(left_collarGeom, shirtMat);
  left_collar.position.z = 0.35;
  root.add(left_collar);

  const right_collarShape = new THREE.Shape();
  right_collarShape.moveTo(0.37, 1.18);
  right_collarShape.lineTo(0.05, 1.12);
  right_collarShape.lineTo(0.13, 0.93);
  right_collarShape.lineTo(0.38, 1.04);
  right_collarShape.closePath();
  const right_collarGeom = new THREE.ExtrudeGeometry(right_collarShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const right_collar = new THREE.Mesh(right_collarGeom, shirtMat);
  right_collar.position.z = 0.35;
  root.add(right_collar);

  const collar_checkGeom = new THREE.BoxGeometry(0.065, 0.055, 0.012);
  const collar_check = new THREE.InstancedMesh(collar_checkGeom, whitePlaidMat, 8);
  const collarCheckPositions = [
    [-0.29, 1.10], [-0.19, 1.08], [-0.11, 1.02], [-0.32, 1.04],
    [0.29, 1.10], [0.19, 1.08], [0.11, 1.02], [0.32, 1.04],
  ];
  for (let i = 0; i < collarCheckPositions.length; i++) {
    torsoStripeDummy.position.set(
      collarCheckPositions[i][0],
      collarCheckPositions[i][1],
      0.392
    );
    torsoStripeDummy.rotation.set(0, 0, 0);
    torsoStripeDummy.updateMatrix();
    collar_check.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  collar_check.instanceMatrix.needsUpdate = true;
  root.add(collar_check);

  const collar_knot = new THREE.Mesh(unitSphereGeom, shirtMat);
  collar_knot.position.set(0.035, 1.105, 0.405);
  collar_knot.scale.set(0.10, 0.085, 0.055);
  root.add(collar_knot);

  const shirt_buttonsGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 16);
  const shirt_buttons = new THREE.InstancedMesh(shirt_buttonsGeom, buttonMat, 3);
  const buttonDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    buttonDummy.position.set(0.075, 0.66 + i * 0.21, 0.39);
    buttonDummy.rotation.set(Math.PI / 2, 0, 0);
    buttonDummy.updateMatrix();
    shirt_buttons.setMatrixAt(i, buttonDummy.matrix);
  }
  shirt_buttons.instanceMatrix.needsUpdate = true;
  root.add(shirt_buttons);

  // Sleeves and hands.
  const left_sleeve = new THREE.Mesh(unitSphereGeom, shirtMat);
  left_sleeve.position.set(-0.52, 0.86, -0.01);
  left_sleeve.scale.set(0.27, 0.38, 0.25);
  root.add(left_sleeve);

  const right_sleeve = new THREE.Mesh(unitSphereGeom, shirtMat);
  right_sleeve.position.set(0.52, 0.86, -0.01);
  right_sleeve.scale.set(0.27, 0.38, 0.25);
  root.add(right_sleeve);

  const sleeve_vertical_stripesGeom = new THREE.BoxGeometry(0.055, 0.48, 0.012);
  const sleeve_vertical_stripes = new THREE.InstancedMesh(
    sleeve_vertical_stripesGeom,
    whitePlaidMat,
    4
  );
  for (let i = 0; i < 4; i++) {
    const side = i < 2 ? -1 : 1;
    torsoStripeDummy.position.set(
      side * 0.52 + (i % 2 === 0 ? -0.065 : 0.065),
      0.86,
      0.247
    );
    torsoStripeDummy.rotation.set(0, 0, 0);
    torsoStripeDummy.updateMatrix();
    sleeve_vertical_stripes.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  sleeve_vertical_stripes.instanceMatrix.needsUpdate = true;
  root.add(sleeve_vertical_stripes);

  const sleeve_horizontal_stripesGeom = new THREE.BoxGeometry(0.34, 0.055, 0.012);
  const sleeve_horizontal_stripes = new THREE.InstancedMesh(
    sleeve_horizontal_stripesGeom,
    whitePlaidMat,
    6
  );
  for (let i = 0; i < 6; i++) {
    const side = i < 3 ? -1 : 1;
    torsoStripeDummy.position.set(
      side * 0.52,
      0.70 + (i % 3) * 0.16,
      0.252
    );
    torsoStripeDummy.rotation.set(0, 0, 0);
    torsoStripeDummy.updateMatrix();
    sleeve_horizontal_stripes.setMatrixAt(i, torsoStripeDummy.matrix);
  }
  sleeve_horizontal_stripes.instanceMatrix.needsUpdate = true;
  root.add(sleeve_horizontal_stripes);

  const left_cuff = new THREE.Mesh(unitSphereGeom, shirtMat);
  left_cuff.position.set(-0.55, 0.58, 0.01);
  left_cuff.scale.set(0.20, 0.105, 0.19);
  root.add(left_cuff);

  const right_cuff = new THREE.Mesh(unitSphereGeom, shirtMat);
  right_cuff.position.set(0.55, 0.58, 0.01);
  right_cuff.scale.set(0.20, 0.105, 0.19);
  root.add(right_cuff);

  const left_hand = new THREE.Mesh(unitSphereGeom, skinMat);
  left_hand.position.set(-0.57, 0.45, 0.07);
  left_hand.scale.set(0.18, 0.17, 0.16);
  root.add(left_hand);

  const right_hand = new THREE.Mesh(unitSphereGeom, skinMat);
  right_hand.position.set(0.57, 0.45, 0.07);
  right_hand.scale.set(0.18, 0.17, 0.16);
  root.add(right_hand);

  const left_thumb = new THREE.Mesh(unitSphereGeom, skinMat);
  left_thumb.position.set(-0.47, 0.48, 0.16);
  left_thumb.scale.set(0.085, 0.10, 0.08);
  root.add(left_thumb);

  const right_thumb = new THREE.Mesh(unitSphereGeom, skinMat);
  right_thumb.position.set(0.47, 0.48, 0.16);
  right_thumb.scale.set(0.085, 0.10, 0.08);
  root.add(right_thumb);

  // Pants, seams, boots, and soles.
  const left_pants_leg = new THREE.Mesh(unitSphereGeom, pantsMat);
  left_pants_leg.position.set(-0.25, 0.28, -0.02);
  left_pants_leg.scale.set(0.30, 0.32, 0.29);
  root.add(left_pants_leg);

  const right_pants_leg = new THREE.Mesh(unitSphereGeom, pantsMat);
  right_pants_leg.position.set(0.25, 0.28, -0.02);
  right_pants_leg.scale.set(0.30, 0.32, 0.29);
  root.add(right_pants_leg);

  const pants_center_seam = addTube([
    new THREE.Vector3(0, 0.43, 0.255),
    new THREE.Vector3(0, 0.20, 0.275),
    new THREE.Vector3(0, -0.02, 0.25),
  ], 0.009, pantsSeamMat, 12);
  root.add(pants_center_seam);

  const left_boot = new THREE.Mesh(unitSphereGeom, bootMat);
  left_boot.position.set(-0.27, -0.27, 0.18);
  left_boot.scale.set(0.29, 0.18, 0.38);
  root.add(left_boot);

  const right_boot = new THREE.Mesh(unitSphereGeom, bootMat);
  right_boot.position.set(0.27, -0.27, 0.18);
  right_boot.scale.set(0.29, 0.18, 0.38);
  root.add(right_boot);

  const left_sole = new THREE.Mesh(unitSphereGeom, soleMat);
  left_sole.position.set(-0.27, -0.405, 0.17);
  left_sole.scale.set(0.31, 0.065, 0.40);
  root.add(left_sole);

  const right_sole = new THREE.Mesh(unitSphereGeom, soleMat);
  right_sole.position.set(0.27, -0.405, 0.17);
  right_sole.scale.set(0.31, 0.065, 0.40);
  root.add(right_sole);

  // Blue pointed hat.
  const hatBrimProfile = [
    new THREE.Vector2(0.00, 2.17),
    new THREE.Vector2(0.48, 2.17),
    new THREE.Vector2(0.72, 2.145),
    new THREE.Vector2(0.87, 2.10),
    new THREE.Vector2(0.91, 2.045),
    new THREE.Vector2(0.88, 1.995),
    new THREE.Vector2(0.70, 2.00),
    new THREE.Vector2(0.45, 2.045),
    new THREE.Vector2(0.00, 2.045),
  ];
  const hat_brimGeom = new THREE.LatheGeometry(hatBrimProfile, 48);
  const hat_brim = new THREE.Mesh(hat_brimGeom, hatMat);
  hat_brim.scale.set(1.08, 1, 0.86);
  root.add(hat_brim);

  const hat_brim_edgeGeom = new THREE.TorusGeometry(0.875, 0.025, 10, 48);
  const hat_brim_edge = new THREE.Mesh(hat_brim_edgeGeom, hatEdgeMat);
  hat_brim_edge.position.y = 2.045;
  hat_brim_edge.rotation.x = Math.PI / 2;
  hat_brim_edge.scale.set(1.08, 0.86, 1);
  root.add(hat_brim_edge);

  const hatCrownProfile = [
    new THREE.Vector2(0.00, 2.14),
    new THREE.Vector2(0.52, 2.14),
    new THREE.Vector2(0.52, 2.22),
    new THREE.Vector2(0.48, 2.36),
    new THREE.Vector2(0.42, 2.52),
    new THREE.Vector2(0.35, 2.68),
    new THREE.Vector2(0.28, 2.83),
    new THREE.Vector2(0.20, 2.96),
    new THREE.Vector2(0.12, 3.07),
    new THREE.Vector2(0.055, 3.13),
    new THREE.Vector2(0.00, 3.14),
  ];
  const hat_crownGeom = new THREE.LatheGeometry(hatCrownProfile, 48);
  const hat_crown = new THREE.Mesh(hat_crownGeom, hatMat);
  hat_crown.position.z = -0.04;
  hat_crown.rotation.z = 0.09;
  hat_crown.scale.set(1.04, 1, 0.92);
  root.add(hat_crown);

  const hat_crown_bandGeom = new THREE.TorusGeometry(0.505, 0.024, 10, 48);
  const hat_crown_band = new THREE.Mesh(hat_crown_bandGeom, hatEdgeMat);
  hat_crown_band.position.set(0, 2.18, -0.04);
  hat_crown_band.rotation.x = Math.PI / 2;
  hat_crown_band.scale.set(1.04, 0.92, 1);
  root.add(hat_crown_band);

  // Moss patch on the hat.
  const mossPatchShape = new THREE.Shape();
  mossPatchShape.moveTo(-0.46, 2.20);
  mossPatchShape.lineTo(0.48, 2.20);
  mossPatchShape.lineTo(0.43, 2.31);
  mossPatchShape.lineTo(0.31, 2.40);
  mossPatchShape.lineTo(0.17, 2.47);
  mossPatchShape.lineTo(0.01, 2.54);
  mossPatchShape.lineTo(-0.16, 2.48);
  mossPatchShape.lineTo(-0.31, 2.38);
  mossPatchShape.lineTo(-0.44, 2.29);
  mossPatchShape.closePath();
  const moss_patchGeom = new THREE.ExtrudeGeometry(mossPatchShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: false,
  });
  const moss_patch = new THREE.Mesh(moss_patchGeom, mossDarkMat);
  moss_patch.position.z = 0.35;
  root.add(moss_patch);

  const moss_sprigsGeom = new THREE.CylinderGeometry(0.009, 0.012, 1, 6);
  const moss_sprigs = new THREE.InstancedMesh(moss_sprigsGeom, mossMat, 42);
  const mossDummy = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 42; i++) {
    const column = i % 7;
    const row = Math.floor(i / 7);
    const x = -0.38 + column * 0.125 + Math.sin(i * 1.7) * 0.018;
    const baseY = 2.22 + row * 0.025;
    const surfaceZ = 0.385 - Math.abs(x) * 0.10;
    const direction = new THREE.Vector3(
      Math.sin(i * 1.31) * 0.48,
      0.72 + (i % 4) * 0.08,
      Math.cos(i * 0.91) * 0.28
    ).normalize();
    const length = 0.11 + (i % 5) * 0.018;
    const start = new THREE.Vector3(x, baseY, surfaceZ);
    const midpoint = start.clone().addScaledVector(direction, length * 0.5);
    mossDummy.position.copy(midpoint);
    mossDummy.quaternion.setFromUnitVectors(up, direction);
    mossDummy.scale.set(1, length, 1);
    mossDummy.updateMatrix();
    moss_sprigs.setMatrixAt(i, mossDummy.matrix);
  }
  moss_sprigs.instanceMatrix.needsUpdate = true;
  root.add(moss_sprigs);

  const moss_branches = new THREE.InstancedMesh(moss_sprigsGeom, mossLightMat, 24);
  for (let i = 0; i < 24; i++) {
    const column = i % 6;
    const row = Math.floor(i / 6);
    const x = -0.34 + column * 0.135 + Math.cos(i * 1.4) * 0.015;
    const y = 2.25 + row * 0.045;
    const z = 0.405 - Math.abs(x) * 0.08;
    const angle = i * 2.17;
    const direction = new THREE.Vector3(
      Math.cos(angle),
      0.20 + (i % 3) * 0.12,
      Math.sin(angle) * 0.75
    ).normalize();
    const length = 0.075 + (i % 4) * 0.015;
    const start = new THREE.Vector3(x, y, z);
    mossDummy.position.copy(start).addScaledVector(direction, length * 0.5);
    mossDummy.quaternion.setFromUnitVectors(up, direction);
    mossDummy.scale.set(0.8, length, 0.8);
    mossDummy.updateMatrix();
    moss_branches.setMatrixAt(i, mossDummy.matrix);
  }
  moss_branches.instanceMatrix.needsUpdate = true;
  root.add(moss_branches);

  const moss_tipsGeom = new THREE.SphereGeometry(0.022, 8, 6);
  const moss_tips = new THREE.InstancedMesh(moss_tipsGeom, mossLightMat, 30);
  for (let i = 0; i < 30; i++) {
    const column = i % 6;
    const row = Math.floor(i / 6);
    mossDummy.position.set(
      -0.35 + column * 0.14 + Math.sin(i * 1.8) * 0.025,
      2.25 + row * 0.055 + Math.cos(i * 1.2) * 0.018,
      0.42 + Math.sin(i * 0.75) * 0.025
    );
    mossDummy.quaternion.identity();
    mossDummy.scale.setScalar(0.75 + (i % 4) * 0.1);
    mossDummy.updateMatrix();
    moss_tips.setMatrixAt(i, mossDummy.matrix);
  }
  moss_tips.instanceMatrix.needsUpdate = true;
  root.add(moss_tips);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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