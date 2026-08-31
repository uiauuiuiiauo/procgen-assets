export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "red_horse_figurine";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc91624,
    metalness: 0.0,
    roughness: 0.4,
  });
  const inner_earMat = new THREE.MeshStandardMaterial({
    color: 0x780b14,
    metalness: 0.0,
    roughness: 0.4,
  });
  const maneMat = new THREE.MeshStandardMaterial({
    color: 0x171719,
    metalness: 0.0,
    roughness: 0.4,
  });
  const facial_detailMat = new THREE.MeshStandardMaterial({
    color: 0x242429,
    metalness: 0.0,
    roughness: 0.4,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const hoofMat = new THREE.MeshStandardMaterial({
    color: 0x202024,
    metalness: 0.0,
    roughness: 0.4,
  });

  const bodyGeom = new THREE.SphereGeometry(1, 40, 24);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.position.set(0, 1.10, -0.12);
  body.scale.set(0.52, 0.48, 1.02);
  root.add(body);

  const chestGeom = bodyGeom;
  const chestMat = bodyMat;
  const chest = new THREE.Mesh(chestGeom, chestMat);
  chest.name = "chest";
  chest.position.set(0, 1.10, 0.53);
  chest.scale.set(0.44, 0.50, 0.47);
  root.add(chest);

  const rumpGeom = bodyGeom;
  const rumpMat = bodyMat;
  const rump = new THREE.Mesh(rumpGeom, rumpMat);
  rump.name = "rump";
  rump.position.set(0, 1.11, -0.72);
  rump.scale.set(0.48, 0.50, 0.49);
  root.add(rump);

  const bellyGeom = bodyGeom;
  const bellyMat = bodyMat;
  const belly = new THREE.Mesh(bellyGeom, bellyMat);
  belly.name = "belly";
  belly.position.set(0, 0.91, -0.08);
  belly.scale.set(0.45, 0.29, 0.77);
  root.add(belly);

  const neckGeom = new THREE.CylinderGeometry(0.22, 0.36, 1.0, 32);
  const neckMat = bodyMat;
  const neck = new THREE.Mesh(neckGeom, neckMat);
  neck.name = "neck";
  neck.position.set(0, 1.52, 0.58);
  neck.rotation.x = 0.36;
  root.add(neck);

  const neck_baseGeom = bodyGeom;
  const neck_baseMat = bodyMat;
  const neck_base = new THREE.Mesh(neck_baseGeom, neck_baseMat);
  neck_base.name = "neck_base";
  neck_base.position.set(0, 1.19, 0.50);
  neck_base.scale.set(0.40, 0.48, 0.42);
  root.add(neck_base);

  const headGeom = bodyGeom;
  const headMat = bodyMat;
  const head = new THREE.Mesh(headGeom, headMat);
  head.name = "head";
  head.position.set(0, 1.98, 0.88);
  head.rotation.x = 0.34;
  head.scale.set(0.30, 0.34, 0.44);
  root.add(head);

  const muzzleGeom = bodyGeom;
  const muzzleMat = bodyMat;
  const muzzle = new THREE.Mesh(muzzleGeom, muzzleMat);
  muzzle.name = "muzzle";
  muzzle.position.set(0, 1.80, 1.28);
  muzzle.rotation.x = 0.20;
  muzzle.scale.set(0.25, 0.18, 0.36);
  root.add(muzzle);

  const noseGeom = bodyGeom;
  const noseMat = bodyMat;
  const nose = new THREE.Mesh(noseGeom, noseMat);
  nose.name = "nose";
  nose.position.set(0, 1.76, 1.50);
  nose.rotation.x = 0.12;
  nose.scale.set(0.23, 0.15, 0.22);
  root.add(nose);

  const lower_jawGeom = bodyGeom;
  const lower_jawMat = bodyMat;
  const lower_jaw = new THREE.Mesh(lower_jawGeom, lower_jawMat);
  lower_jaw.name = "lower_jaw";
  lower_jaw.position.set(0, 1.68, 1.29);
  lower_jaw.rotation.x = 0.17;
  lower_jaw.scale.set(0.22, 0.12, 0.31);
  root.add(lower_jaw);

  const legGeom = new THREE.CylinderGeometry(0.11, 0.075, 0.78, 20);
  const legMat = bodyMat;
  const leg_dummy = new THREE.Object3D();
  const leg_data = [
    [-0.28, 0.54, 0.61, 0.05, -0.06],
    [0.28, 0.54, 0.61, 0.05, 0.06],
    [-0.29, 0.54, -0.72, -0.04, -0.05],
    [0.29, 0.54, -0.72, -0.04, 0.05],
  ];
  const legs = new THREE.InstancedMesh(legGeom, legMat, leg_data.length);
  legs.name = "legs";
  for (let i = 0; i < leg_data.length; i++) {
    const data = leg_data[i];
    leg_dummy.position.set(data[0], data[1], data[2]);
    leg_dummy.rotation.set(data[3], 0, data[4]);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    legs.setMatrixAt(i, leg_dummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const leg_shouldersGeom = new THREE.SphereGeometry(1, 24, 16);
  const leg_shouldersMat = bodyMat;
  const leg_shoulders = new THREE.InstancedMesh(
    leg_shouldersGeom,
    leg_shouldersMat,
    leg_data.length
  );
  leg_shoulders.name = "leg_shoulders";
  for (let i = 0; i < leg_data.length; i++) {
    const data = leg_data[i];
    leg_dummy.position.set(data[0], 0.91, data[2]);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(0.17, 0.30, 0.18);
    leg_dummy.updateMatrix();
    leg_shoulders.setMatrixAt(i, leg_dummy.matrix);
  }
  leg_shoulders.instanceMatrix.needsUpdate = true;
  root.add(leg_shoulders);

  const silver_lower_legsGeom = new THREE.CylinderGeometry(
    0.078,
    0.105,
    0.29,
    20
  );
  const silver_lower_legsMat = chromeMat;
  const silver_lower_legs = new THREE.InstancedMesh(
    silver_lower_legsGeom,
    silver_lower_legsMat,
    leg_data.length
  );
  silver_lower_legs.name = "silver_lower_legs";
  for (let i = 0; i < leg_data.length; i++) {
    const data = leg_data[i];
    leg_dummy.position.set(data[0], 0.16, data[2]);
    leg_dummy.rotation.set(data[3] * 0.4, 0, data[4] * 0.4);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    silver_lower_legs.setMatrixAt(i, leg_dummy.matrix);
  }
  silver_lower_legs.instanceMatrix.needsUpdate = true;
  root.add(silver_lower_legs);

  const silver_fetlocksGeom = new THREE.SphereGeometry(1, 20, 12);
  const silver_fetlocksMat = chromeMat;
  const silver_fetlocks = new THREE.InstancedMesh(
    silver_fetlocksGeom,
    silver_fetlocksMat,
    leg_data.length
  );
  silver_fetlocks.name = "silver_fetlocks";
  for (let i = 0; i < leg_data.length; i++) {
    const data = leg_data[i];
    leg_dummy.position.set(data[0], 0.25, data[2]);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(0.105, 0.12, 0.105);
    leg_dummy.updateMatrix();
    silver_fetlocks.setMatrixAt(i, leg_dummy.matrix);
  }
  silver_fetlocks.instanceMatrix.needsUpdate = true;
  root.add(silver_fetlocks);

  const hoof_capsGeom = new THREE.CylinderGeometry(0.105, 0.145, 0.14, 24);
  const hoof_capsMat = chromeMat;
  const hoof_caps = new THREE.InstancedMesh(
    hoof_capsGeom,
    hoof_capsMat,
    leg_data.length
  );
  hoof_caps.name = "hoof_caps";
  for (let i = 0; i < leg_data.length; i++) {
    const data = leg_data[i];
    leg_dummy.position.set(data[0], 0.07, data[2] + 0.012);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1.18);
    leg_dummy.updateMatrix();
    hoof_caps.setMatrixAt(i, leg_dummy.matrix);
  }
  hoof_caps.instanceMatrix.needsUpdate = true;
  root.add(hoof_caps);

  const hoof_solesGeom = new THREE.CylinderGeometry(0.137, 0.137, 0.025, 24);
  const hoof_solesMat = hoofMat;
  const hoof_soles = new THREE.InstancedMesh(
    hoof_solesGeom,
    hoof_solesMat,
    leg_data.length
  );
  hoof_soles.name = "hoof_soles";
  for (let i = 0; i < leg_data.length; i++) {
    const data = leg_data[i];
    leg_dummy.position.set(data[0], 0.006, data[2] + 0.012);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1.18);
    leg_dummy.updateMatrix();
    hoof_soles.setMatrixAt(i, leg_dummy.matrix);
  }
  hoof_soles.instanceMatrix.needsUpdate = true;
  root.add(hoof_soles);

  const earGeom = new THREE.ConeGeometry(0.11, 0.40, 16);
  const earMat = bodyMat;
  const left_ear = new THREE.Mesh(earGeom, earMat);
  left_ear.name = "left_ear";
  left_ear.position.set(-0.15, 2.28, 0.76);
  left_ear.rotation.set(0.12, 0, 0.16);
  left_ear.scale.set(0.82, 1, 0.58);
  root.add(left_ear);

  const right_ear = new THREE.Mesh(earGeom, earMat);
  right_ear.name = "right_ear";
  right_ear.position.set(0.15, 2.28, 0.76);
  right_ear.rotation.set(0.12, 0, -0.16);
  right_ear.scale.set(0.82, 1, 0.58);
  root.add(right_ear);

  const inner_earGeom = new THREE.ConeGeometry(0.065, 0.27, 14);
  const left_inner_ear = new THREE.Mesh(inner_earGeom, inner_earMat);
  left_inner_ear.name = "left_inner_ear";
  left_inner_ear.position.set(-0.15, 2.27, 0.815);
  left_inner_ear.rotation.set(0.12, 0, 0.16);
  left_inner_ear.scale.set(0.70, 1, 0.28);
  root.add(left_inner_ear);

  const right_inner_ear = new THREE.Mesh(inner_earGeom, inner_earMat);
  right_inner_ear.name = "right_inner_ear";
  right_inner_ear.position.set(0.15, 2.27, 0.815);
  right_inner_ear.rotation.set(0.12, 0, -0.16);
  right_inner_ear.scale.set(0.70, 1, 0.28);
  root.add(right_inner_ear);

  const eyeGeom = new THREE.SphereGeometry(1, 20, 12);
  const eyeMat = facial_detailMat;
  const left_eye = new THREE.Mesh(eyeGeom, eyeMat);
  left_eye.name = "left_eye";
  left_eye.position.set(-0.286, 2.02, 1.04);
  left_eye.scale.set(0.026, 0.055, 0.075);
  root.add(left_eye);

  const right_eye = new THREE.Mesh(eyeGeom, eyeMat);
  right_eye.name = "right_eye";
  right_eye.position.set(0.286, 2.02, 1.04);
  right_eye.scale.set(0.026, 0.055, 0.075);
  root.add(right_eye);

  const browGeom = new THREE.SphereGeometry(1, 20, 12);
  const browMat = bodyMat;
  const left_brow = new THREE.Mesh(browGeom, browMat);
  left_brow.name = "left_brow";
  left_brow.position.set(-0.278, 2.095, 1.035);
  left_brow.rotation.x = -0.22;
  left_brow.scale.set(0.045, 0.038, 0.105);
  root.add(left_brow);

  const right_brow = new THREE.Mesh(browGeom, browMat);
  right_brow.name = "right_brow";
  right_brow.position.set(0.278, 2.095, 1.035);
  right_brow.rotation.x = -0.22;
  right_brow.scale.set(0.045, 0.038, 0.105);
  root.add(right_brow);

  const nostrilGeom = new THREE.SphereGeometry(1, 18, 10);
  const nostrilMat = facial_detailMat;
  const left_nostril = new THREE.Mesh(nostrilGeom, nostrilMat);
  left_nostril.name = "left_nostril";
  left_nostril.position.set(-0.14, 1.79, 1.655);
  left_nostril.scale.set(0.052, 0.036, 0.018);
  root.add(left_nostril);

  const right_nostril = new THREE.Mesh(nostrilGeom, nostrilMat);
  right_nostril.name = "right_nostril";
  right_nostril.position.set(0.14, 1.79, 1.655);
  right_nostril.scale.set(0.052, 0.036, 0.018);
  root.add(right_nostril);

  const mouthGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.25, 10);
  const mouthMat = facial_detailMat;
  const mouth = new THREE.Mesh(mouthGeom, mouthMat);
  mouth.name = "mouth";
  mouth.position.set(0, 1.665, 1.59);
  mouth.rotation.z = Math.PI / 2;
  root.add(mouth);

  const mane_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 2.25, 0.70),
    new THREE.Vector3(0, 2.18, 0.57),
    new THREE.Vector3(0, 2.04, 0.43),
    new THREE.Vector3(0, 1.87, 0.29),
    new THREE.Vector3(0, 1.68, 0.14),
    new THREE.Vector3(0, 1.49, -0.02),
    new THREE.Vector3(0, 1.34, -0.20),
  ]);
  const maneGeom = new THREE.TubeGeometry(mane_path, 40, 0.085, 10, false);
  const mane = new THREE.Mesh(maneGeom, maneMat);
  mane.name = "mane";
  mane.scale.x = 1.15;
  root.add(mane);

  const mane_locksGeom = new THREE.ConeGeometry(0.11, 0.34, 10);
  const mane_locksMat = maneMat;
  const mane_lock_data = [
    [2.24, 0.69, 0.62],
    [2.16, 0.57, 0.72],
    [2.04, 0.43, 0.82],
    [1.90, 0.29, 0.91],
    [1.75, 0.16, 1.00],
    [1.59, 0.02, 1.08],
    [1.43, -0.12, 1.15],
    [1.32, -0.23, 1.20],
  ];
  const mane_locks = new THREE.InstancedMesh(
    mane_locksGeom,
    mane_locksMat,
    mane_lock_data.length
  );
  mane_locks.name = "mane_locks";
  for (let i = 0; i < mane_lock_data.length; i++) {
    const data = mane_lock_data[i];
    leg_dummy.position.set(0, data[0], data[1]);
    leg_dummy.rotation.set(Math.PI / 2, 0, 0);
    leg_dummy.scale.set(1.05 * data[2], data[2], 0.72);
    leg_dummy.updateMatrix();
    mane_locks.setMatrixAt(i, leg_dummy.matrix);
  }
  mane_locks.instanceMatrix.needsUpdate = true;
  root.add(mane_locks);

  const forelockGeom = bodyGeom;
  const forelockMat = maneMat;
  const forelock = new THREE.Mesh(forelockGeom, forelockMat);
  forelock.name = "forelock";
  forelock.position.set(0, 2.18, 0.88);
  forelock.rotation.x = 0.48;
  forelock.scale.set(0.19, 0.075, 0.25);
  root.add(forelock);

  const tail_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.29, -1.00),
    new THREE.Vector3(0.02, 1.20, -1.12),
    new THREE.Vector3(0.04, 1.02, -1.23),
    new THREE.Vector3(0.05, 0.80, -1.30),
    new THREE.Vector3(0.04, 0.61, -1.39),
    new THREE.Vector3(0.01, 0.54, -1.28),
  ]);
  const tailGeom = new THREE.TubeGeometry(tail_path, 44, 0.105, 12, false);
  const tailMat = maneMat;
  const tail = new THREE.Mesh(tailGeom, tailMat);
  tail.name = "tail";
  tail.scale.x = 1.15;
  root.add(tail);

  const tail_tuftGeom = bodyGeom;
  const tail_tuftMat = maneMat;
  const tail_tuft = new THREE.Mesh(tail_tuftGeom, tail_tuftMat);
  tail_tuft.name = "tail_tuft";
  tail_tuft.position.set(0.01, 0.54, -1.27);
  tail_tuft.rotation.x = -0.35;
  tail_tuft.scale.set(0.16, 0.14, 0.25);
  root.add(tail_tuft);

  const nosebandGeom = new THREE.TorusGeometry(0.205, 0.018, 10, 40);
  const nosebandMat = chromeMat;
  const noseband = new THREE.Mesh(nosebandGeom, nosebandMat);
  noseband.name = "noseband";
  noseband.position.set(0, 1.79, 1.38);
  noseband.rotation.x = 0.20;
  noseband.scale.y = 0.78;
  root.add(noseband);

  const bridle_cheek_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.225, 1.79, 1.38),
    new THREE.Vector3(0.265, 1.88, 1.22),
    new THREE.Vector3(0.285, 2.00, 1.02),
    new THREE.Vector3(0.235, 2.13, 0.82),
  ]);
  const bridle_cheek_strapGeom = new THREE.TubeGeometry(
    bridle_cheek_path,
    24,
    0.014,
    8,
    false
  );
  const bridle_cheek_strapMat = chromeMat;
  const bridle_cheek_straps = new THREE.Group();
  bridle_cheek_straps.name = "bridle_cheek_straps";

  const right_bridle_cheek_strap = new THREE.Mesh(
    bridle_cheek_strapGeom,
    bridle_cheek_strapMat
  );
  right_bridle_cheek_strap.name = "right_bridle_cheek_strap";
  bridle_cheek_straps.add(right_bridle_cheek_strap);

  const left_bridle_cheek_strap = new THREE.Mesh(
    bridle_cheek_strapGeom,
    bridle_cheek_strapMat
  );
  left_bridle_cheek_strap.name = "left_bridle_cheek_strap";
  left_bridle_cheek_strap.scale.x = -1;
  bridle_cheek_straps.add(left_bridle_cheek_strap);
  root.add(bridle_cheek_straps);

  const crown_strap_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.22, 2.13, 0.84),
    new THREE.Vector3(0, 2.20, 0.80),
    new THREE.Vector3(0.22, 2.13, 0.84),
  ]);
  const crown_strapGeom = new THREE.TubeGeometry(
    crown_strap_path,
    20,
    0.014,
    8,
    false
  );
  const crown_strapMat = chromeMat;
  const crown_strap = new THREE.Mesh(crown_strapGeom, crown_strapMat);
  crown_strap.name = "crown_strap";
  root.add(crown_strap);

  const collar_path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.38, 1.28, 0.56),
      new THREE.Vector3(-0.42, 1.08, 0.66),
      new THREE.Vector3(-0.32, 0.89, 0.74),
      new THREE.Vector3(0, 0.80, 0.78),
      new THREE.Vector3(0.32, 0.89, 0.74),
      new THREE.Vector3(0.42, 1.08, 0.66),
      new THREE.Vector3(0.38, 1.28, 0.56),
    ],
    false,
    "centripetal"
  );
  const collarGeom = new THREE.TubeGeometry(collar_path, 48, 0.025, 10, false);
  const collarMat = chromeMat;
  const collar = new THREE.Mesh(collarGeom, collarMat);
  collar.name = "collar";
  root.add(collar);

  const collar_medallionGeom = new THREE.CylinderGeometry(
    0.085,
    0.085,
    0.035,
    24
  );
  const collar_medallionMat = chromeMat;
  const collar_medallion = new THREE.Mesh(
    collar_medallionGeom,
    collar_medallionMat
  );
  collar_medallion.name = "collar_medallion";
  collar_medallion.position.set(0, 0.80, 0.805);
  collar_medallion.rotation.x = Math.PI / 2;
  root.add(collar_medallion);

  const medallion_insetGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.012,
    24
  );
  const medallion_insetMat = bodyMat;
  const medallion_inset = new THREE.Mesh(
    medallion_insetGeom,
    medallion_insetMat
  );
  medallion_inset.name = "medallion_inset";
  medallion_inset.position.set(0, 0.80, 0.828);
  medallion_inset.rotation.x = Math.PI / 2;
  root.add(medallion_inset);

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

  fitToUnitCube(THREE, root);
  return root;
}