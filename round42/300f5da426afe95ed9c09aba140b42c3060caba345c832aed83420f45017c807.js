export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "garden_gnome";

  const body_group = new THREE.Group();
  body_group.name = "body_group";
  root.add(body_group);

  const head_group = new THREE.Group();
  head_group.name = "head_group";
  root.add(head_group);

  const hat_group = new THREE.Group();
  hat_group.name = "hat_group";
  root.add(hat_group);

  const moss_group = new THREE.Group();
  moss_group.name = "moss_group";
  hat_group.add(moss_group);

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xd99a68,
    metalness: 0.0,
    roughness: 0.6
  });
  const innerEarMat = new THREE.MeshStandardMaterial({
    color: 0xa95f43,
    metalness: 0.0,
    roughness: 0.7
  });
  const cheekMat = new THREE.MeshStandardMaterial({
    color: 0xe98f79,
    metalness: 0.0,
    roughness: 0.7
  });
  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x555453,
    metalness: 0.0,
    roughness: 0.9
  });
  const eyebrowMat = new THREE.MeshStandardMaterial({
    color: 0x302d2b,
    metalness: 0.0,
    roughness: 0.8
  });
  const eyeWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e7,
    metalness: 0.0,
    roughness: 0.4
  });
  const pupilMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.0,
    roughness: 0.3
  });
  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0x6f1f22,
    metalness: 0.0,
    roughness: 0.7
  });
  const lipMat = new THREE.MeshStandardMaterial({
    color: 0xc94a48,
    metalness: 0.0,
    roughness: 0.6
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0xc92f38,
    metalness: 0.0,
    roughness: 0.95
  });
  const ginghamMat = new THREE.MeshStandardMaterial({
    color: 0xf4eee4,
    metalness: 0.0,
    roughness: 0.95
  });
  const collarSeamMat = new THREE.MeshStandardMaterial({
    color: 0x8d2029,
    metalness: 0.0,
    roughness: 0.95
  });
  const pantsMat = new THREE.MeshStandardMaterial({
    color: 0x1761a4,
    metalness: 0.0,
    roughness: 0.95
  });
  const pantsSeamMat = new THREE.MeshStandardMaterial({
    color: 0x0d3f76,
    metalness: 0.0,
    roughness: 0.95
  });
  const shoeMat = new THREE.MeshStandardMaterial({
    color: 0x292625,
    metalness: 0.0,
    roughness: 0.8
  });
  const soleMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const hatMat = new THREE.MeshStandardMaterial({
    color: 0x0876c9,
    metalness: 0.0,
    roughness: 0.3
  });
  const hatSeamMat = new THREE.MeshStandardMaterial({
    color: 0x075595,
    metalness: 0.0,
    roughness: 0.45
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x65a91f,
    metalness: 0.0,
    roughness: 0.9
  });
  const mossLightMat = new THREE.MeshStandardMaterial({
    color: 0x8bc92b,
    metalness: 0.0,
    roughness: 0.9
  });
  const mossDarkMat = new THREE.MeshStandardMaterial({
    color: 0x397b13,
    metalness: 0.0,
    roughness: 0.9
  });

  const softSphereGeom = new THREE.SphereGeometry(1, 32, 20);

  const pants_waist = new THREE.Mesh(softSphereGeom, pantsMat);
  pants_waist.name = "pants_waist";
  pants_waist.scale.set(0.43, 0.28, 0.34);
  pants_waist.position.set(0, 0.67, -0.01);
  body_group.add(pants_waist);

  const left_pant_leg = new THREE.Mesh(softSphereGeom, pantsMat);
  left_pant_leg.name = "left_pant_leg";
  left_pant_leg.scale.set(0.22, 0.25, 0.23);
  left_pant_leg.position.set(-0.22, 0.48, 0.02);
  body_group.add(left_pant_leg);

  const right_pant_leg = new THREE.Mesh(softSphereGeom, pantsMat);
  right_pant_leg.name = "right_pant_leg";
  right_pant_leg.scale.set(0.22, 0.25, 0.23);
  right_pant_leg.position.set(0.22, 0.48, 0.02);
  body_group.add(right_pant_leg);

  const pants_center_seamGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 0.72, 0.326),
      new THREE.Vector3(0, 0.48, 0.255)
    ),
    1,
    0.009,
    6,
    false
  );
  const pants_center_seam = new THREE.Mesh(pants_center_seamGeom, pantsSeamMat);
  pants_center_seam.name = "pants_center_seam";
  body_group.add(pants_center_seam);

  const shoeGeom = new THREE.SphereGeometry(1, 32, 18);

  const left_shoe = new THREE.Mesh(shoeGeom, shoeMat);
  left_shoe.name = "left_shoe";
  left_shoe.scale.set(0.25, 0.14, 0.34);
  left_shoe.position.set(-0.25, 0.18, 0.18);
  body_group.add(left_shoe);

  const right_shoe = new THREE.Mesh(shoeGeom, shoeMat);
  right_shoe.name = "right_shoe";
  right_shoe.scale.set(0.25, 0.14, 0.34);
  right_shoe.position.set(0.25, 0.18, 0.18);
  body_group.add(right_shoe);

  const left_sole = new THREE.Mesh(shoeGeom, soleMat);
  left_sole.name = "left_sole";
  left_sole.scale.set(0.265, 0.045, 0.35);
  left_sole.position.set(-0.25, 0.075, 0.18);
  body_group.add(left_sole);

  const right_sole = new THREE.Mesh(shoeGeom, soleMat);
  right_sole.name = "right_sole";
  right_sole.scale.set(0.265, 0.045, 0.35);
  right_sole.position.set(0.25, 0.075, 0.18);
  body_group.add(right_sole);

  const shirt_torso = new THREE.Mesh(softSphereGeom, shirtMat);
  shirt_torso.name = "shirt_torso";
  shirt_torso.scale.set(0.47, 0.58, 0.36);
  shirt_torso.position.set(0, 1.17, 0);
  body_group.add(shirt_torso);

  const ginghamGeom = new THREE.BoxGeometry(1, 1, 1);
  const ginghamTransforms = [];
  const torsoRx = 0.47;
  const torsoRy = 0.58;
  const torsoRz = 0.36;
  const torsoCy = 1.17;

  for (let row = 0; row < 9; row++) {
    const y = 0.72 + row * 0.105;
    const dy = (y - torsoCy) / torsoRy;
    const section = Math.sqrt(Math.max(0.025, 1 - dy * dy));
    for (let col = -4; col <= 4; col++) {
      const x = col * 0.095;
      const dx = x / torsoRx;
      const surfaceQ = 1 - dx * dx - dy * dy;
      if (surfaceQ > 0.04) {
        const z = torsoRz * Math.sqrt(surfaceQ);
        ginghamTransforms.push({
          x: x + dx * 0.004,
          y: y + dy * 0.004,
          z: z + 0.007,
          nx: dx / torsoRx,
          ny: dy / torsoRy,
          nz: z / (torsoRz * torsoRz),
          width: 0.086,
          height: 0.094,
          depth: 0.008
        });
      }
    }
  }

  const gingham_torso = new THREE.InstancedMesh(
    ginghamGeom,
    ginghamMat,
    ginghamTransforms.length
  );
  gingham_torso.name = "gingham_torso";
  const ginghamDummy = new THREE.Object3D();
  const surfaceNormal = new THREE.Vector3();
  const localForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < ginghamTransforms.length; i++) {
    const t = ginghamTransforms[i];
    surfaceNormal.set(t.nx, t.ny, t.nz).normalize();
    ginghamDummy.position.set(t.x, t.y, t.z);
    ginghamDummy.quaternion.setFromUnitVectors(localForward, surfaceNormal);
    ginghamDummy.scale.set(t.width, t.height, t.depth);
    ginghamDummy.updateMatrix();
    gingham_torso.setMatrixAt(i, ginghamDummy.matrix);
  }
  gingham_torso.instanceMatrix.needsUpdate = true;
  body_group.add(gingham_torso);

  const sleeveGeom = new THREE.CylinderGeometry(0.15, 0.19, 0.46, 20, 2);
  const sleeveCapGeom = new THREE.SphereGeometry(1, 20, 12);

  const left_sleeve = new THREE.Mesh(sleeveGeom, shirtMat);
  left_sleeve.name = "left_sleeve";
  left_sleeve.position.set(-0.50, 1.22, 0);
  left_sleeve.rotation.z = 0.24;
  body_group.add(left_sleeve);

  const right_sleeve = new THREE.Mesh(sleeveGeom, shirtMat);
  right_sleeve.name = "right_sleeve";
  right_sleeve.position.set(0.50, 1.22, 0);
  right_sleeve.rotation.z = -0.24;
  body_group.add(right_sleeve);

  const left_sleeve_cap = new THREE.Mesh(sleeveCapGeom, shirtMat);
  left_sleeve_cap.name = "left_sleeve_cap";
  left_sleeve_cap.scale.set(0.205, 0.17, 0.205);
  left_sleeve_cap.position.set(-0.45, 1.42, 0);
  body_group.add(left_sleeve_cap);

  const right_sleeve_cap = new THREE.Mesh(sleeveCapGeom, shirtMat);
  right_sleeve_cap.name = "right_sleeve_cap";
  right_sleeve_cap.scale.set(0.205, 0.17, 0.205);
  right_sleeve_cap.position.set(0.45, 1.42, 0);
  body_group.add(right_sleeve_cap);

  const cuffGeom = new THREE.CylinderGeometry(0.17, 0.17, 0.065, 20);

  const left_cuff = new THREE.Mesh(cuffGeom, shirtMat);
  left_cuff.name = "left_cuff";
  left_cuff.position.set(-0.555, 1.015, 0);
  left_cuff.rotation.z = 0.24;
  body_group.add(left_cuff);

  const right_cuff = new THREE.Mesh(cuffGeom, shirtMat);
  right_cuff.name = "right_cuff";
  right_cuff.position.set(0.555, 1.015, 0);
  right_cuff.rotation.z = -0.24;
  body_group.add(right_cuff);

  const sleeveBands = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 5; i++) {
      sleeveBands.push({
        x: side * (0.46 + i * 0.022),
        y: 1.39 - i * 0.085,
        z: 0,
        rotationZ: side < 0 ? 0.24 : -0.24,
        radius: 0.176 - i * 0.006
      });
    }
  }

  const sleeve_check_bandsGeom = new THREE.TorusGeometry(0.16, 0.008, 6, 24);
  const sleeve_check_bands = new THREE.InstancedMesh(
    sleeve_check_bandsGeom,
    ginghamMat,
    sleeveBands.length
  );
  sleeve_check_bands.name = "sleeve_check_bands";
  const sleeveBandDummy = new THREE.Object3D();
  const sleeveBandQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  const sleeveTiltQuat = new THREE.Quaternion();

  for (let i = 0; i < sleeveBands.length; i++) {
    const b = sleeveBands[i];
    sleeveTiltQuat.setFromAxisAngle(new THREE.Vector3(0, 0, 1), b.rotationZ);
    sleeveBandDummy.position.set(b.x, b.y, b.z);
    sleeveBandDummy.quaternion.copy(sleeveTiltQuat).multiply(sleeveBandQuat);
    sleeveBandDummy.scale.setScalar(b.radius / 0.16);
    sleeveBandDummy.updateMatrix();
    sleeve_check_bands.setMatrixAt(i, sleeveBandDummy.matrix);
  }
  sleeve_check_bands.instanceMatrix.needsUpdate = true;
  body_group.add(sleeve_check_bands);

  const sleeve_check_stripsGeom = new THREE.BoxGeometry(1, 1, 1);
  const sleeve_check_strips = new THREE.InstancedMesh(
    sleeve_check_stripsGeom,
    ginghamMat,
    10
  );
  sleeve_check_strips.name = "sleeve_check_strips";
  const sleeveStripDummy = new THREE.Object3D();
  let sleeveStripIndex = 0;

  for (const side of [-1, 1]) {
    const angle = side < 0 ? 0.24 : -0.24;
    const axisX = new THREE.Vector3(-Math.sin(angle), Math.cos(angle), 0);
    const axisY = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
    const center = new THREE.Vector3(side * 0.50, 1.22, 0);
    for (let i = 0; i < 5; i++) {
      const y = 1.39 - i * 0.085;
      const localY = (y - center.y) / Math.cos(angle);
      sleeveStripDummy.position.copy(center).addScaledVector(axisX, localY);
      sleeveStripDummy.position.z = 0.177 - i * 0.005;
      sleeveStripDummy.rotation.set(0, 0, angle);
      sleeveStripDummy.scale.set(0.034, 0.075, 0.008);
      sleeveStripDummy.updateMatrix();
      sleeve_check_strips.setMatrixAt(sleeveStripIndex++, sleeveStripDummy.matrix);
    }
  }
  sleeve_check_strips.instanceMatrix.needsUpdate = true;
  body_group.add(sleeve_check_strips);

  const handGeom = new THREE.SphereGeometry(1, 24, 16);

  const left_hand = new THREE.Mesh(handGeom, skinMat);
  left_hand.name = "left_hand";
  left_hand.scale.set(0.15, 0.13, 0.14);
  left_hand.position.set(-0.59, 0.94, 0.055);
  body_group.add(left_hand);

  const right_hand = new THREE.Mesh(handGeom, skinMat);
  right_hand.name = "right_hand";
  right_hand.scale.set(0.15, 0.13, 0.14);
  right_hand.position.set(0.59, 0.94, 0.055);
  body_group.add(right_hand);

  const thumbGeom = new THREE.SphereGeometry(1, 18, 12);

  const left_thumb = new THREE.Mesh(thumbGeom, skinMat);
  left_thumb.name = "left_thumb";
  left_thumb.scale.set(0.07, 0.075, 0.07);
  left_thumb.position.set(-0.52, 0.98, 0.14);
  body_group.add(left_thumb);

  const right_thumb = new THREE.Mesh(thumbGeom, skinMat);
  right_thumb.name = "right_thumb";
  right_thumb.scale.set(0.07, 0.075, 0.07);
  right_thumb.position.set(0.52, 0.98, 0.14);
  body_group.add(right_thumb);

  const collarShape = new THREE.Shape();
  collarShape.moveTo(0, 0.13);
  collarShape.lineTo(0.29, 0.04);
  collarShape.lineTo(0.15, -0.18);
  collarShape.lineTo(0.01, -0.055);
  collarShape.closePath();

  const collarGeom = new THREE.ExtrudeGeometry(collarShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2
  });

  const left_collar = new THREE.Mesh(collarGeom, shirtMat);
  left_collar.name = "left_collar";
  left_collar.position.set(0, 1.60, 0.345);
  left_collar.scale.x = -1;
  body_group.add(left_collar);

  const right_collar = new THREE.Mesh(collarGeom, shirtMat);
  right_collar.name = "right_collar";
  right_collar.position.set(0, 1.60, 0.345);
  body_group.add(right_collar);

  const collar_check_transforms = [];
  for (const side of [-1, 1]) {
    for (const x of [0.065, 0.13, 0.195]) {
      for (const y of [1.575, 1.515]) {
        const px = side * x;
        const triangleHalf = 0.29 * (1 - x / 0.29);
        if (Math.abs(y - 1.55) < triangleHalf) {
          collar_check_transforms.push({
            x: px,
            y: y,
            rotation: side < 0 ? 0.32 : -0.32
          });
        }
      }
    }
  }

  const collar_checksGeom = new THREE.BoxGeometry(1, 1, 1);
  const collar_checks = new THREE.InstancedMesh(
    collar_checksGeom,
    ginghamMat,
    collar_check_transforms.length
  );
  collar_checks.name = "collar_checks";
  const collarDummy = new THREE.Object3D();

  for (let i = 0; i < collar_check_transforms.length; i++) {
    const t = collar_check_transforms[i];
    collarDummy.position.set(t.x, t.y, 0.384);
    collarDummy.rotation.set(0, 0, t.rotation);
    collarDummy.scale.set(0.052, 0.052, 0.008);
    collarDummy.updateMatrix();
    collar_checks.setMatrixAt(i, collarDummy.matrix);
  }
  collar_checks.instanceMatrix.needsUpdate = true;
  body_group.add(collar_checks);

  const collarSeamGeomLeft = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 1.73, 0.389),
      new THREE.Vector3(-0.15, 1.42, 0.389)
    ),
    1,
    0.008,
    6,
    false
  );
  const left_collar_seam = new THREE.Mesh(collarSeamGeomLeft, collarSeamMat);
  left_collar_seam.name = "left_collar_seam";
  body_group.add(left_collar_seam);

  const collarSeamGeomRight = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0, 1.73, 0.389),
      new THREE.Vector3(0.15, 1.42, 0.389)
    ),
    1,
    0.008,
    6,
    false
  );
  const right_collar_seam = new THREE.Mesh(collarSeamGeomRight, collarSeamMat);
  right_collar_seam.name = "right_collar_seam";
  body_group.add(right_collar_seam);

  const shirt_placketGeom = new THREE.BoxGeometry(0.045, 0.68, 0.018);
  const shirt_placket = new THREE.Mesh(shirt_placketGeom, collarSeamMat);
  shirt_placket.name = "shirt_placket";
  shirt_placket.position.set(0.075, 1.20, 0.365);
  body_group.add(shirt_placket);

  const buttonGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.018, 16);
  const buttonYs = [1.42, 1.18, 0.94];
  const shirt_buttons = new THREE.InstancedMesh(
    buttonGeom,
    buttonMat,
    buttonYs.length
  );
  shirt_buttons.name = "shirt_buttons";
  const buttonDummy = new THREE.Object3D();

  for (let i = 0; i < buttonYs.length; i++) {
    buttonDummy.position.set(0.075, buttonYs[i], 0.385);
    buttonDummy.rotation.set(Math.PI / 2, 0, 0);
    buttonDummy.scale.set(1, 1, 1);
    buttonDummy.updateMatrix();
    shirt_buttons.setMatrixAt(i, buttonDummy.matrix);
  }
  shirt_buttons.instanceMatrix.needsUpdate = true;
  body_group.add(shirt_buttons);

  const headGeom = new THREE.SphereGeometry(1, 40, 28);
  const head = new THREE.Mesh(headGeom, skinMat);
  head.name = "head";
  head.scale.set(0.46, 0.51, 0.42);
  head.position.set(0, 2.06, 0);
  head_group.add(head);

  const jaw = new THREE.Mesh(softSphereGeom, skinMat);
  jaw.name = "jaw";
  jaw.scale.set(0.38, 0.29, 0.35);
  jaw.position.set(0, 1.86, 0.035);
  head_group.add(jaw);

  const hairGeom = new THREE.SphereGeometry(1, 28, 18);

  const left_hair = new THREE.Mesh(hairGeom, hairMat);
  left_hair.name = "left_hair";
  left_hair.scale.set(0.12, 0.29, 0.18);
  left_hair.position.set(-0.405, 2.08, -0.055);
  head_group.add(left_hair);

  const right_hair = new THREE.Mesh(hairGeom, hairMat);
  right_hair.name = "right_hair";
  right_hair.scale.set(0.12, 0.29, 0.18);
  right_hair.position.set(0.405, 2.08, -0.055);
  head_group.add(right_hair);

  const earGeom = new THREE.SphereGeometry(1, 28, 18);

  const left_ear = new THREE.Mesh(earGeom, skinMat);
  left_ear.name = "left_ear";
  left_ear.scale.set(0.17, 0.22, 0.13);
  left_ear.position.set(-0.49, 2.03, 0.01);
  head_group.add(left_ear);

  const right_ear = new THREE.Mesh(earGeom, skinMat);
  right_ear.name = "right_ear";
  right_ear.scale.set(0.17, 0.22, 0.13);
  right_ear.position.set(0.49, 2.03, 0.01);
  head_group.add(right_ear);

  const left_inner_ear = new THREE.Mesh(earGeom, innerEarMat);
  left_inner_ear.name = "left_inner_ear";
  left_inner_ear.scale.set(0.075, 0.12, 0.025);
  left_inner_ear.position.set(-0.515, 2.03, 0.125);
  head_group.add(left_inner_ear);

  const right_inner_ear = new THREE.Mesh(earGeom, innerEarMat);
  right_inner_ear.name = "right_inner_ear";
  right_inner_ear.scale.set(0.075, 0.12, 0.025);
  right_inner_ear.position.set(0.515, 2.03, 0.125);
  head_group.add(right_inner_ear);

  const cheekGeom = new THREE.SphereGeometry(1, 24, 14);

  const left_cheek = new THREE.Mesh(cheekGeom, cheekMat);
  left_cheek.name = "left_cheek";
  left_cheek.scale.set(0.17, 0.12, 0.035);
  left_cheek.position.set(-0.25, 1.96, 0.375);
  head_group.add(left_cheek);

  const right_cheek = new THREE.Mesh(cheekGeom, cheekMat);
  right_cheek.name = "right_cheek";
  right_cheek.scale.set(0.17, 0.12, 0.035);
  right_cheek.position.set(0.25, 1.96, 0.375);
  head_group.add(right_cheek);

  const eyeGeom = new THREE.SphereGeometry(1, 24, 16);

  const left_eye_white = new THREE.Mesh(eyeGeom, eyeWhiteMat);
  left_eye_white.name = "left_eye_white";
  left_eye_white.scale.set(0.095, 0.12, 0.027);
  left_eye_white.position.set(-0.15, 2.17, 0.405);
  head_group.add(left_eye_white);

  const right_eye_white = new THREE.Mesh(eyeGeom, eyeWhiteMat);
  right_eye_white.name = "right_eye_white";
  right_eye_white.scale.set(0.095, 0.12, 0.027);
  right_eye_white.position.set(0.15, 2.17, 0.405);
  head_group.add(right_eye_white);

  const pupilGeom = new THREE.SphereGeometry(1, 20, 14);

  const left_pupil = new THREE.Mesh(pupilGeom, pupilMat);
  left_pupil.name = "left_pupil";
  left_pupil.scale.set(0.043, 0.061, 0.018);
  left_pupil.position.set(-0.132, 2.165, 0.432);
  head_group.add(left_pupil);

  const right_pupil = new THREE.Mesh(pupilGeom, pupilMat);
  right_pupil.name = "right_pupil";
  right_pupil.scale.set(0.043, 0.061, 0.018);
  right_pupil.position.set(0.168, 2.165, 0.432);
  head_group.add(right_pupil);

  const eyeHighlightGeom = new THREE.SphereGeometry(1, 12, 8);

  const left_eye_highlight = new THREE.Mesh(eyeHighlightGeom, eyeWhiteMat);
  left_eye_highlight.name = "left_eye_highlight";
  left_eye_highlight.scale.setScalar(0.012);
  left_eye_highlight.position.set(-0.145, 2.194, 0.451);
  head_group.add(left_eye_highlight);

  const right_eye_highlight = new THREE.Mesh(eyeHighlightGeom, eyeWhiteMat);
  right_eye_highlight.name = "right_eye_highlight";
  right_eye_highlight.scale.setScalar(0.012);
  right_eye_highlight.position.set(0.155, 2.194, 0.451);
  head_group.add(right_eye_highlight);

  const left_eyebrowGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.255, 2.29, 0.365),
      new THREE.Vector3(-0.16, 2.35, 0.395),
      new THREE.Vector3(-0.065, 2.30, 0.39)
    ], false, "centripetal"),
    12,
    0.024,
    8,
    false
  );
  const left_eyebrow = new THREE.Mesh(left_eyebrowGeom, eyebrowMat);
  left_eyebrow.name = "left_eyebrow";
  head_group.add(left_eyebrow);

  const right_eyebrowGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.065, 2.30, 0.39),
      new THREE.Vector3(0.16, 2.35, 0.395),
      new THREE.Vector3(0.255, 2.29, 0.365)
    ], false, "centripetal"),
    12,
    0.024,
    8,
    false
  );
  const right_eyebrow = new THREE.Mesh(right_eyebrowGeom, eyebrowMat);
  right_eyebrow.name = "right_eyebrow";
  head_group.add(right_eyebrow);

  const noseGeom = new THREE.SphereGeometry(1, 32, 20);
  const nose = new THREE.Mesh(noseGeom, skinMat);
  nose.name = "nose";
  nose.scale.set(0.18, 0.16, 0.20);
  nose.position.set(0, 2.02, 0.46);
  head_group.add(nose);

  const mouth_openingGeom = new THREE.SphereGeometry(1, 24, 14);
  const mouth_opening = new THREE.Mesh(mouth_openingGeom, mouthMat);
  mouth_opening.name = "mouth_opening";
  mouth_opening.scale.set(0.14, 0.052, 0.018);
  mouth_opening.position.set(0, 1.81, 0.405);
  head_group.add(mouth_opening);

  const lower_lipGeom = new THREE.SphereGeometry(1, 24, 14);
  const lower_lip = new THREE.Mesh(lower_lipGeom, lipMat);
  lower_lip.name = "lower_lip";
  lower_lip.scale.set(0.12, 0.026, 0.022);
  lower_lip.position.set(0, 1.785, 0.417);
  head_group.add(lower_lip);

  const smileGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.13, 1.84, 0.425),
      new THREE.Vector3(0, 1.79, 0.442),
      new THREE.Vector3(0.13, 1.84, 0.425)
    ], false, "centripetal"),
    16,
    0.011,
    7,
    false
  );
  const smile = new THREE.Mesh(smileGeom, mouthMat);
  smile.name = "smile";
  head_group.add(smile);

  const hatBrimProfile = [
    new THREE.Vector2(0.00, -0.055),
    new THREE.Vector2(0.42, -0.065),
    new THREE.Vector2(0.62, -0.035),
    new THREE.Vector2(0.75, 0.015),
    new THREE.Vector2(0.78, 0.055),
    new THREE.Vector2(0.75, 0.095),
    new THREE.Vector2(0.62, 0.125),
    new THREE.Vector2(0.42, 0.105),
    new THREE.Vector2(0.00, 0.075)
  ];
  const hat_brimGeom = new THREE.LatheGeometry(hatBrimProfile, 48);
  const hat_brim = new THREE.Mesh(hat_brimGeom, hatMat);
  hat_brim.name = "hat_brim";
  hat_brim.position.set(0, 2.40, -0.01);
  hat_group.add(hat_brim);

  const hat_brim_edgeGeom = new THREE.TorusGeometry(0.755, 0.025, 10, 48);
  const hat_brim_edge = new THREE.Mesh(hat_brim_edgeGeom, hatMat);
  hat_brim_edge.name = "hat_brim_edge";
  hat_brim_edge.rotation.x = Math.PI / 2;
  hat_brim_edge.position.set(0, 2.455, -0.01);
  hat_group.add(hat_brim_edge);

  const hatCrownProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.46, 0.00),
    new THREE.Vector2(0.47, 0.06),
    new THREE.Vector2(0.44, 0.17),
    new THREE.Vector2(0.39, 0.34),
    new THREE.Vector2(0.33, 0.53),
    new THREE.Vector2(0.26, 0.73),
    new THREE.Vector2(0.18, 0.91),
    new THREE.Vector2(0.10, 1.04),
    new THREE.Vector2(0.045, 1.11),
    new THREE.Vector2(0.00, 1.13)
  ];
  const hat_crownGeom = new THREE.LatheGeometry(hatCrownProfile, 48);
  const hat_crown = new THREE.Mesh(hat_crownGeom, hatMat);
  hat_crown.name = "hat_crown";
  hat_crown.position.set(0, 2.46, -0.025);
  hat_crown.rotation.z = -0.065;
  hat_group.add(hat_crown);

  const hat_crown_seamGeom = new THREE.TorusGeometry(0.445, 0.018, 8, 40);
  const hat_crown_seam = new THREE.Mesh(hat_crown_seamGeom, hatSeamMat);
  hat_crown_seam.name = "hat_crown_seam";
  hat_crown_seam.rotation.x = Math.PI / 2;
  hat_crown_seam.position.set(0, 2.505, -0.025);
  hat_group.add(hat_crown_seam);

  const moss_mound = new THREE.Mesh(softSphereGeom, mossDarkMat);
  moss_mound.name = "moss_mound";
  moss_mound.scale.set(0.42, 0.055, 0.17);
  moss_mound.position.set(0.25, 2.69, 0.27);
  moss_group.add(moss_mound);

  const moss_clumpsGeom = new THREE.IcosahedronGeometry(1, 1);
  const moss_clumps = new THREE.InstancedMesh(moss_clumpsGeom, mossMat, 30);
  moss_clumps.name = "moss_clumps";
  const mossClumpDummy = new THREE.Object3D();

  for (let i = 0; i < 30; i++) {
    const col = i % 6;
    const row = Math.floor(i / 6);
    const x = -0.03 + col * 0.115 + Math.sin(i * 1.7) * 0.018;
    const y = 2.665 + row * 0.028 + Math.cos(i * 1.3) * 0.018;
    const z = 0.20 + ((i * 7) % 5) * 0.035 + Math.sin(i * 0.9) * 0.012;
    const s = 0.045 + (i % 4) * 0.009;
    mossClumpDummy.position.set(x, y, z);
    mossClumpDummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    mossClumpDummy.scale.set(s * 1.2, s * 0.75, s);
    mossClumpDummy.updateMatrix();
    moss_clumps.setMatrixAt(i, mossClumpDummy.matrix);
  }
  moss_clumps.instanceMatrix.needsUpdate = true;
  moss_group.add(moss_clumps);

  const moss_sprigsGeom = new THREE.CylinderGeometry(0.006, 0.008, 0.11, 5);
  const moss_sprigs = new THREE.InstancedMesh(moss_sprigsGeom, mossLightMat, 48);
  moss_sprigs.name = "moss_sprigs";
  const mossSprigDummy = new THREE.Object3D();
  const mossUp = new THREE.Vector3(0, 1, 0);
  const mossDirection = new THREE.Vector3();

  for (let i = 0; i < 48; i++) {
    const col = i % 8;
    const row = Math.floor(i / 8);
    mossDirection.set(
      Math.sin(i * 1.41),
      0.35 + (i % 4) * 0.12,
      Math.cos(i * 1.13)
    ).normalize();
    mossSprigDummy.position.set(
      -0.055 + col * 0.09 + Math.sin(i * 0.83) * 0.025,
      2.69 + row * 0.022 + Math.cos(i * 1.17) * 0.018,
      0.22 + ((i * 5) % 4) * 0.045
    );
    mossSprigDummy.quaternion.setFromUnitVectors(mossUp, mossDirection);
    mossSprigDummy.scale.set(1, 0.75 + (i % 5) * 0.12, 1);
    mossSprigDummy.updateMatrix();
    moss_sprigs.setMatrixAt(i, mossSprigDummy.matrix);
  }
  moss_sprigs.instanceMatrix.needsUpdate = true;
  moss_group.add(moss_sprigs);

  const moss_curlsGeom = new THREE.TorusGeometry(
    0.035,
    0.005,
    5,
    12,
    Math.PI * 1.5
  );
  const moss_curls = new THREE.InstancedMesh(moss_curlsGeom, mossLightMat, 16);
  moss_curls.name = "moss_curls";
  const mossCurlDummy = new THREE.Object3D();

  for (let i = 0; i < 16; i++) {
    mossCurlDummy.position.set(
      -0.02 + (i % 8) * 0.09,
      2.70 + Math.floor(i / 8) * 0.045 + Math.sin(i * 1.2) * 0.018,
      0.25 + ((i * 3) % 4) * 0.04
    );
    mossCurlDummy.rotation.set(i * 0.41, i * 0.29, i * 0.63);
    mossCurlDummy.scale.setScalar(0.75 + (i % 3) * 0.15);
    mossCurlDummy.updateMatrix();
    moss_curls.setMatrixAt(i, mossCurlDummy.matrix);
  }
  moss_curls.instanceMatrix.needsUpdate = true;
  moss_group.add(moss_curls);

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