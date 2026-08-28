export default function generate(THREE) {
  const root = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xf6bd78,
    metalness: 0.0,
    roughness: 0.4,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x078846,
    metalness: 0.0,
    roughness: 0.4,
  });
  const darkGreenMat = new THREE.MeshStandardMaterial({
    color: 0x056536,
    metalness: 0.0,
    roughness: 0.4,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xd91627,
    metalness: 0.0,
    roughness: 0.4,
  });
  const darkRedMat = new THREE.MeshStandardMaterial({
    color: 0x8f101b,
    metalness: 0.0,
    roughness: 0.4,
  });
  const blackGlossMat = new THREE.MeshStandardMaterial({
    color: 0x10171a,
    metalness: 0.0,
    roughness: 0.4,
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xfff8e8,
    metalness: 0.0,
    roughness: 0.4,
  });
  const mouthMat = new THREE.MeshStandardMaterial({
    color: 0x6d1017,
    metalness: 0.0,
    roughness: 0.4,
  });
  const blushMat = new THREE.MeshStandardMaterial({
    color: 0xf04436,
    metalness: 0.0,
    roughness: 0.4,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x20272a,
    metalness: 0.0,
    roughness: 0.4,
  });

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, sx, sy, sz, rx, ry, rz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const softSphereGeom = new THREE.SphereGeometry(1, 32, 20);

  const baseGeom = new THREE.SphereGeometry(1, 32, 16);
  const base = new THREE.Mesh(baseGeom, blackGlossMat);
  base.position.set(0, -0.95, -0.02);
  base.scale.set(0.82, 0.18, 0.60);
  root.add(base);

  const shoesGeom = new THREE.SphereGeometry(1, 28, 16);
  const shoes = new THREE.InstancedMesh(shoesGeom, blackGlossMat, 2);
  setInstance(shoes, 0, -0.34, -0.94, 0.28, 0.39, 0.18, 0.43, 0, -0.08, 0);
  setInstance(shoes, 1, 0.34, -0.94, 0.28, 0.39, 0.18, 0.43, 0, 0.08, 0);
  shoes.instanceMatrix.needsUpdate = true;
  root.add(shoes);

  const pant_legsGeom = new THREE.SphereGeometry(1, 24, 14);
  const pant_legs = new THREE.InstancedMesh(pant_legsGeom, blackGlossMat, 2);
  setInstance(pant_legs, 0, -0.31, -0.72, -0.02, 0.34, 0.30, 0.34);
  setInstance(pant_legs, 1, 0.31, -0.72, -0.02, 0.34, 0.30, 0.34);
  pant_legs.instanceMatrix.needsUpdate = true;
  root.add(pant_legs);

  const pantsGeom = new THREE.SphereGeometry(1, 32, 20);
  const pants = new THREE.Mesh(pantsGeom, blackGlossMat);
  pants.position.set(0, -0.55, -0.02);
  pants.scale.set(0.76, 0.43, 0.52);
  root.add(pants);

  const pants_waistbandGeom = new THREE.TorusGeometry(0.55, 0.035, 10, 40);
  const pants_waistband = new THREE.Mesh(pants_waistbandGeom, blackGlossMat);
  pants_waistband.position.set(0, -0.38, -0.01);
  pants_waistband.rotation.x = Math.PI / 2;
  pants_waistband.scale.set(1.20, 0.84, 1);
  root.add(pants_waistband);

  const shirt_bodyGeom = new THREE.SphereGeometry(1, 32, 20);
  const shirt_body = new THREE.Mesh(shirt_bodyGeom, greenMat);
  shirt_body.position.set(0, -0.03, 0);
  shirt_body.scale.set(0.82, 0.68, 0.55);
  root.add(shirt_body);

  const shouldersGeom = new THREE.SphereGeometry(1, 24, 16);
  const shoulders = new THREE.InstancedMesh(shouldersGeom, greenMat, 2);
  setInstance(shoulders, 0, -0.60, 0.17, 0.01, 0.31, 0.31, 0.31);
  setInstance(shoulders, 1, 0.60, 0.17, 0.01, 0.31, 0.31, 0.31);
  shoulders.instanceMatrix.needsUpdate = true;
  root.add(shoulders);

  const sleeveGeom = new THREE.CapsuleGeometry(0.18, 0.24, 8, 20);
  const left_sleeve = new THREE.Mesh(sleeveGeom, greenMat);
  left_sleeve.position.set(-0.72, -0.04, 0.10);
  left_sleeve.rotation.z = -0.48;
  root.add(left_sleeve);

  const right_sleeve = new THREE.Mesh(sleeveGeom, greenMat);
  right_sleeve.position.set(0.72, -0.04, 0.10);
  right_sleeve.rotation.z = 0.48;
  root.add(right_sleeve);

  const handsGeom = new THREE.SphereGeometry(1, 28, 18);
  const hands = new THREE.InstancedMesh(handsGeom, skinMat, 2);
  setInstance(hands, 0, -0.88, -0.29, 0.22, 0.22, 0.25, 0.22, 0, 0, -0.12);
  setInstance(hands, 1, 0.88, -0.29, 0.22, 0.22, 0.25, 0.22, 0, 0, 0.12);
  hands.instanceMatrix.needsUpdate = true;
  root.add(hands);

  const shirt_hemGeom = new THREE.CapsuleGeometry(0.085, 0.25, 6, 16);
  const left_shirt_hem = new THREE.Mesh(shirt_hemGeom, greenMat);
  left_shirt_hem.position.set(-0.29, -0.43, 0.46);
  left_shirt_hem.rotation.z = 0.13;
  left_shirt_hem.scale.set(1.35, 1, 0.42);
  root.add(left_shirt_hem);

  const right_shirt_hem = new THREE.Mesh(shirt_hemGeom, greenMat);
  right_shirt_hem.position.set(0.29, -0.43, 0.46);
  right_shirt_hem.rotation.z = -0.13;
  right_shirt_hem.scale.set(1.35, 1, 0.42);
  root.add(right_shirt_hem);

  const collarShape = new THREE.Shape();
  collarShape.moveTo(0, 0.06);
  collarShape.lineTo(0.29, -0.02);
  collarShape.lineTo(0.18, -0.23);
  collarShape.lineTo(0.02, -0.10);
  collarShape.closePath();
  const collarGeom = new THREE.ShapeGeometry(collarShape, 16);

  const left_collar = new THREE.Mesh(collarGeom, darkGreenMat);
  left_collar.position.set(0, 0.34, 0.565);
  left_collar.scale.x = -1;
  root.add(left_collar);

  const right_collar = new THREE.Mesh(collarGeom, darkGreenMat);
  right_collar.position.set(0, 0.34, 0.565);
  root.add(right_collar);

  const collarRollGeom = new THREE.CapsuleGeometry(0.025, 0.22, 5, 12);
  const left_collar_roll = new THREE.Mesh(collarRollGeom, darkGreenMat);
  left_collar_roll.position.set(-0.15, 0.325, 0.58);
  left_collar_roll.rotation.z = -1.05;
  root.add(left_collar_roll);

  const right_collar_roll = new THREE.Mesh(collarRollGeom, darkGreenMat);
  right_collar_roll.position.set(0.15, 0.325, 0.58);
  right_collar_roll.rotation.z = 1.05;
  root.add(right_collar_roll);

  const placketShape = new THREE.Shape();
  placketShape.moveTo(-0.11, 0.34);
  placketShape.lineTo(0.11, 0.34);
  placketShape.lineTo(0.09, -0.40);
  placketShape.lineTo(0, -0.49);
  placketShape.lineTo(-0.09, -0.40);
  placketShape.closePath();
  const shirt_placketGeom = new THREE.ShapeGeometry(placketShape, 12);
  const shirt_placket = new THREE.Mesh(shirt_placketGeom, darkGreenMat);
  shirt_placket.position.set(0, 0, 0.575);
  root.add(shirt_placket);

  const shirt_buttonsGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.025, 20);
  const shirt_buttons = new THREE.InstancedMesh(shirt_buttonsGeom, buttonMat, 3);
  setInstance(shirt_buttons, 0, 0, 0.13, 0.603, 1, 1, 1, Math.PI / 2, 0, 0);
  setInstance(shirt_buttons, 1, 0, -0.13, 0.603, 1, 1, 1, Math.PI / 2, 0, 0);
  setInstance(shirt_buttons, 2, 0, -0.37, 0.603, 1, 1, 1, Math.PI / 2, 0, 0);
  shirt_buttons.instanceMatrix.needsUpdate = true;
  root.add(shirt_buttons);

  const headGeom = new THREE.SphereGeometry(1, 40, 24);
  const head = new THREE.Mesh(headGeom, skinMat);
  head.position.set(0, 0.77, 0.08);
  head.scale.set(0.68, 0.65, 0.58);
  root.add(head);

  const chinGeom = new THREE.SphereGeometry(1, 32, 20);
  const chin = new THREE.Mesh(chinGeom, skinMat);
  chin.position.set(0, 0.43, 0.17);
  chin.scale.set(0.51, 0.34, 0.47);
  root.add(chin);

  const earsGeom = new THREE.SphereGeometry(1, 24, 16);
  const ears = new THREE.InstancedMesh(earsGeom, skinMat, 2);
  setInstance(ears, 0, -0.66, 0.74, 0.10, 0.19, 0.24, 0.13);
  setInstance(ears, 1, 0.66, 0.74, 0.10, 0.19, 0.24, 0.13);
  ears.instanceMatrix.needsUpdate = true;
  root.add(ears);

  const inner_earsGeom = new THREE.TorusGeometry(0.075, 0.018, 8, 24);
  const inner_ears = new THREE.InstancedMesh(inner_earsGeom, blushMat, 2);
  setInstance(inner_ears, 0, -0.69, 0.74, 0.225, 0.80, 1.15, 1);
  setInstance(inner_ears, 1, 0.69, 0.74, 0.225, 0.80, 1.15, 1);
  inner_ears.instanceMatrix.needsUpdate = true;
  root.add(inner_ears);

  const side_hairGeom = new THREE.CapsuleGeometry(0.09, 0.17, 6, 16);
  const left_side_hair = new THREE.Mesh(side_hairGeom, whiteMat);
  left_side_hair.position.set(-0.61, 0.91, 0.19);
  left_side_hair.rotation.z = -0.12;
  left_side_hair.scale.z = 0.55;
  root.add(left_side_hair);

  const right_side_hair = new THREE.Mesh(side_hairGeom, whiteMat);
  right_side_hair.position.set(0.61, 0.91, 0.19);
  right_side_hair.rotation.z = 0.12;
  right_side_hair.scale.z = 0.55;
  root.add(right_side_hair);

  const cheeksGeom = new THREE.SphereGeometry(1, 24, 14);
  const cheeks = new THREE.InstancedMesh(cheeksGeom, skinMat, 2);
  setInstance(cheeks, 0, -0.31, 0.61, 0.59, 0.27, 0.22, 0.14);
  setInstance(cheeks, 1, 0.31, 0.61, 0.59, 0.27, 0.22, 0.14);
  cheeks.instanceMatrix.needsUpdate = true;
  root.add(cheeks);

  const blushGeom = new THREE.CircleGeometry(1, 24);
  const blush = new THREE.InstancedMesh(blushGeom, blushMat, 2);
  setInstance(blush, 0, -0.36, 0.64, 0.735, 0.16, 0.105, 1, 0, 0, -0.08);
  setInstance(blush, 1, 0.36, 0.64, 0.735, 0.16, 0.105, 1, 0, 0, 0.08);
  blush.instanceMatrix.needsUpdate = true;
  root.add(blush);

  const eyesGeom = new THREE.SphereGeometry(1, 24, 16);
  const eyes = new THREE.InstancedMesh(eyesGeom, blackGlossMat, 2);
  setInstance(eyes, 0, -0.23, 0.91, 0.651, 0.075, 0.105, 0.045);
  setInstance(eyes, 1, 0.23, 0.91, 0.651, 0.075, 0.105, 0.045);
  eyes.instanceMatrix.needsUpdate = true;
  root.add(eyes);

  const eye_highlightsGeom = new THREE.SphereGeometry(1, 16, 10);
  const eye_highlights = new THREE.InstancedMesh(eye_highlightsGeom, whiteMat, 2);
  setInstance(eye_highlights, 0, -0.252, 0.945, 0.692, 0.021, 0.028, 0.012);
  setInstance(eye_highlights, 1, 0.208, 0.945, 0.692, 0.021, 0.028, 0.012);
  eye_highlights.instanceMatrix.needsUpdate = true;
  root.add(eye_highlights);

  const eyebrowPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.11, -0.015, 0),
    new THREE.Vector3(0, 0.055, 0),
    new THREE.Vector3(0.11, -0.015, 0),
  ]);
  const eyebrowsGeom = new THREE.TubeGeometry(eyebrowPath, 16, 0.025, 8, false);
  const eyebrows = new THREE.InstancedMesh(eyebrowsGeom, blackGlossMat, 2);
  setInstance(eyebrows, 0, -0.23, 1.075, 0.625, 1, 1, 1, 0, 0, -0.04);
  setInstance(eyebrows, 1, 0.23, 1.075, 0.625, 1, 1, 1, 0, 0, 0.04);
  eyebrows.instanceMatrix.needsUpdate = true;
  root.add(eyebrows);

  const noseGeom = new THREE.SphereGeometry(1, 32, 20);
  const nose = new THREE.Mesh(noseGeom, skinMat);
  nose.position.set(0, 0.71, 0.70);
  nose.scale.set(0.22, 0.17, 0.24);
  root.add(nose);

  const mouthShape = new THREE.Shape();
  mouthShape.moveTo(-0.28, 0.08);
  mouthShape.bezierCurveTo(-0.15, 0.015, 0.15, 0.015, 0.28, 0.08);
  mouthShape.bezierCurveTo(0.24, -0.10, 0.13, -0.20, 0, -0.21);
  mouthShape.bezierCurveTo(-0.13, -0.20, -0.24, -0.10, -0.28, 0.08);
  mouthShape.closePath();
  const mouthGeom = new THREE.ShapeGeometry(mouthShape, 20);
  const mouth = new THREE.Mesh(mouthGeom, mouthMat);
  mouth.position.set(0, 0.49, 0.665);
  root.add(mouth);

  const teethShape = new THREE.Shape();
  teethShape.moveTo(-0.205, 0.045);
  teethShape.bezierCurveTo(-0.09, 0.005, 0.09, 0.005, 0.205, 0.045);
  teethShape.lineTo(0.16, -0.035);
  teethShape.bezierCurveTo(0.07, -0.085, -0.07, -0.085, -0.16, -0.035);
  teethShape.closePath();
  const teethGeom = new THREE.ShapeGeometry(teethShape, 16);
  const teeth = new THREE.Mesh(teethGeom, whiteMat);
  teeth.position.set(0, 0.515, 0.674);
  root.add(teeth);

  const lower_lipGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.22, 0.445, 0.686),
      new THREE.Vector3(0, 0.335, 0.692),
      new THREE.Vector3(0.22, 0.445, 0.686),
    ]),
    20,
    0.025,
    8,
    false
  );
  const lower_lip = new THREE.Mesh(lower_lipGeom, redMat);
  root.add(lower_lip);

  const tooth_separatorsGeom = new THREE.CylinderGeometry(0.007, 0.007, 0.065, 8);
  const tooth_separators = new THREE.InstancedMesh(tooth_separatorsGeom, mouthMat, 2);
  setInstance(tooth_separators, 0, -0.068, 0.515, 0.681, 1, 1, 1, 0, 0, -0.04);
  setInstance(tooth_separators, 1, 0.068, 0.515, 0.681, 1, 1, 1, 0, 0, 0.04);
  tooth_separators.instanceMatrix.needsUpdate = true;
  root.add(tooth_separators);

  const nostrilsGeom = new THREE.SphereGeometry(1, 14, 8);
  const nostrils = new THREE.InstancedMesh(nostrilsGeom, blushMat, 2);
  setInstance(nostrils, 0, -0.065, 0.675, 0.923, 0.026, 0.016, 0.010);
  setInstance(nostrils, 1, 0.065, 0.675, 0.923, 0.026, 0.016, 0.010);
  nostrils.instanceMatrix.needsUpdate = true;
  root.add(nostrils);

  const hat_brimGeom = new THREE.CylinderGeometry(0.82, 0.86, 0.12, 48);
  const hat_brim = new THREE.Mesh(hat_brimGeom, redMat);
  hat_brim.position.set(0, 1.29, 0.02);
  hat_brim.scale.z = 0.72;
  root.add(hat_brim);

  const hat_brim_edgeGeom = new THREE.TorusGeometry(0.79, 0.075, 12, 48);
  const hat_brim_edge = new THREE.Mesh(hat_brim_edgeGeom, darkRedMat);
  hat_brim_edge.position.set(0, 1.29, 0.02);
  hat_brim_edge.rotation.x = Math.PI / 2;
  hat_brim_edge.scale.set(1, 0.72, 1);
  root.add(hat_brim_edge);

  const hat_crownGeom = new THREE.SphereGeometry(
    1,
    40,
    20,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const hat_crown = new THREE.Mesh(hat_crownGeom, greenMat);
  hat_crown.position.set(0, 1.32, -0.035);
  hat_crown.scale.set(0.58, 0.60, 0.51);
  root.add(hat_crown);

  const hat_bandGeom = new THREE.CylinderGeometry(0.59, 0.61, 0.115, 40, 1, true);
  const hat_band = new THREE.Mesh(hat_bandGeom, blackGlossMat);
  hat_band.position.set(0, 1.39, -0.035);
  hat_band.scale.z = 0.88;
  root.add(hat_band);

  const hat_pompomGeom = new THREE.SphereGeometry(1, 28, 18);
  const hat_pompom = new THREE.Mesh(hat_pompomGeom, redMat);
  hat_pompom.position.set(0, 1.98, -0.035);
  hat_pompom.scale.set(0.18, 0.17, 0.16);
  root.add(hat_pompom);

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