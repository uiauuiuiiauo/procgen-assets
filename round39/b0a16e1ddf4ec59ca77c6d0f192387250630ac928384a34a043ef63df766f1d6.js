export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "speaker_array";

  const cabinetW = 0.72;
  const cabinetH = 1.44;
  const cabinetD = 0.50;
  const cabinetGap = 0.014;
  const centerOffset = (cabinetW + cabinetGap) / 2;
  const faceZ = cabinetD / 2 + 0.015;
  const driverZ = faceZ + 0.012;

  const cabinetMat = new THREE.MeshStandardMaterial({
    color: 0x252728,
    metalness: 0.0,
    roughness: 0.8
  });
  const baffleMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const mountMat = new THREE.MeshStandardMaterial({
    color: 0x202223,
    metalness: 0.0,
    roughness: 0.3
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0d,
    metalness: 0.0,
    roughness: 0.8
  });
  const coneMat = new THREE.MeshStandardMaterial({
    color: 0x303234,
    metalness: 0.0,
    roughness: 0.8
  });
  const dustMat = new THREE.MeshStandardMaterial({
    color: 0x151718,
    metalness: 0.0,
    roughness: 0.3
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const slotMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8
  });
  const badgeMat = new THREE.MeshStandardMaterial({
    color: 0x333638,
    metalness: 0.0,
    roughness: 0.3
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
    return shape;
  }

  const cabinetShape = roundedRectShape(cabinetW, cabinetH, 0.045);
  const cabinetGeom = new THREE.ExtrudeGeometry(cabinetShape, {
    depth: cabinetD,
    steps: 1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3
  });
  cabinetGeom.translate(0, 0, -cabinetD / 2);

  const left_outer_cabinet = new THREE.Mesh(cabinetGeom, cabinetMat);
  left_outer_cabinet.name = "left_outer_cabinet";
  left_outer_cabinet.position.set(-centerOffset * 2, 0, -0.035);
  root.add(left_outer_cabinet);

  const left_inner_cabinet = new THREE.Mesh(cabinetGeom, cabinetMat);
  left_inner_cabinet.name = "left_inner_cabinet";
  left_inner_cabinet.position.set(-centerOffset, 0, 0.025);
  root.add(left_inner_cabinet);

  const right_inner_cabinet = new THREE.Mesh(cabinetGeom, cabinetMat);
  right_inner_cabinet.name = "right_inner_cabinet";
  right_inner_cabinet.position.set(centerOffset, 0, 0.015);
  root.add(right_inner_cabinet);

  const right_outer_cabinet = new THREE.Mesh(cabinetGeom, cabinetMat);
  right_outer_cabinet.name = "right_outer_cabinet";
  right_outer_cabinet.position.set(centerOffset * 2, 0, -0.04);
  root.add(right_outer_cabinet);

  const baffleShape = roundedRectShape(
    cabinetW - 0.025,
    cabinetH - 0.025,
    0.038
  );
  const baffleGeom = new THREE.ShapeGeometry(baffleShape, 5);

  const left_outer_baffle = new THREE.Mesh(baffleGeom, baffleMat);
  left_outer_baffle.name = "left_outer_baffle";
  left_outer_baffle.position.set(-centerOffset * 2, 0, faceZ - 0.035);
  root.add(left_outer_baffle);

  const left_inner_baffle = new THREE.Mesh(baffleGeom, baffleMat);
  left_inner_baffle.name = "left_inner_baffle";
  left_inner_baffle.position.set(-centerOffset, 0, faceZ + 0.025);
  root.add(left_inner_baffle);

  const right_inner_baffle = new THREE.Mesh(baffleGeom, baffleMat);
  right_inner_baffle.name = "right_inner_baffle";
  right_inner_baffle.position.set(centerOffset, 0, faceZ + 0.015);
  root.add(right_inner_baffle);

  const right_outer_baffle = new THREE.Mesh(baffleGeom, baffleMat);
  right_outer_baffle.name = "right_outer_baffle";
  right_outer_baffle.position.set(centerOffset * 2, 0, faceZ - 0.04);
  root.add(right_outer_baffle);

  const cabinetSeamGeom = new THREE.BoxGeometry(
    0.009,
    cabinetH - 0.08,
    cabinetD + 0.012
  );
  const cabinet_seams = new THREE.InstancedMesh(
    cabinetSeamGeom,
    rubberMat,
    3
  );
  cabinet_seams.name = "cabinet_seams";
  const seamDummy = new THREE.Object3D();
  const seamPositions = [
    [-1.5 * centerOffset, -0.005],
    [-0.5 * centerOffset, 0.005],
    [1.5 * centerOffset, -0.005]
  ];
  for (let i = 0; i < seamPositions.length; i++) {
    seamDummy.position.set(seamPositions[i][0], seamPositions[i][1], 0);
    seamDummy.rotation.set(0, 0, 0);
    seamDummy.scale.set(1, 1, 1);
    seamDummy.updateMatrix();
    cabinet_seams.setMatrixAt(i, seamDummy.matrix);
  }
  cabinet_seams.instanceMatrix.needsUpdate = true;
  root.add(cabinet_seams);

  const wooferMountGeom = new THREE.CylinderGeometry(
    0.298,
    0.298,
    0.014,
    48
  );
  const wooferRecessGeom = new THREE.CylinderGeometry(
    0.273,
    0.273,
    0.012,
    48
  );
  const wooferOuterRingGeom = new THREE.TorusGeometry(
    0.268,
    0.011,
    10,
    48
  );
  const wooferSurroundGeom = new THREE.TorusGeometry(
    0.222,
    0.027,
    14,
    48
  );
  const wooferConeGeom = new THREE.CylinderGeometry(
    0.19,
    0.215,
    0.024,
    48,
    1,
    true
  );
  const wooferConeFaceGeom = new THREE.CylinderGeometry(
    0.19,
    0.19,
    0.006,
    48
  );
  const wooferDustGeom = new THREE.SphereGeometry(0.105, 32, 16);
  const wooferScrewGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.008,
    12
  );
  const wooferSlotGeom = new THREE.BoxGeometry(0.014, 0.0025, 0.003);

  function createWoofer(name) {
    const group = new THREE.Group();
    group.name = name;

    const mount_plate = new THREE.Mesh(wooferMountGeom, mountMat);
    mount_plate.name = name + "_mount_plate";
    mount_plate.rotation.x = Math.PI / 2;
    group.add(mount_plate);

    const recess_disc = new THREE.Mesh(wooferRecessGeom, rubberMat);
    recess_disc.name = name + "_recess_disc";
    recess_disc.rotation.x = Math.PI / 2;
    recess_disc.position.z = 0.009;
    group.add(recess_disc);

    const outer_ring = new THREE.Mesh(wooferOuterRingGeom, mountMat);
    outer_ring.name = name + "_outer_ring";
    outer_ring.position.z = 0.016;
    group.add(outer_ring);

    const rubber_surround = new THREE.Mesh(
      wooferSurroundGeom,
      rubberMat
    );
    rubber_surround.name = name + "_rubber_surround";
    rubber_surround.position.z = 0.022;
    group.add(rubber_surround);

    const cone_diaphragm = new THREE.Mesh(wooferConeGeom, coneMat);
    cone_diaphragm.name = name + "_cone_diaphragm";
    cone_diaphragm.rotation.x = Math.PI / 2;
    cone_diaphragm.position.z = 0.013;
    group.add(cone_diaphragm);

    const cone_face = new THREE.Mesh(wooferConeFaceGeom, coneMat);
    cone_face.name = name + "_cone_face";
    cone_face.rotation.x = Math.PI / 2;
    cone_face.position.z = 0.001;
    group.add(cone_face);

    const dust_cap = new THREE.Mesh(wooferDustGeom, dustMat);
    dust_cap.name = name + "_dust_cap";
    dust_cap.scale.set(1, 1, 0.45);
    dust_cap.position.z = 0.025;
    group.add(dust_cap);

    const mounting_screws = new THREE.InstancedMesh(
      wooferScrewGeom,
      screwMat,
      6
    );
    mounting_screws.name = name + "_mounting_screws";

    const screw_slots = new THREE.InstancedMesh(
      wooferSlotGeom,
      slotMat,
      6
    );
    screw_slots.name = name + "_screw_slots";

    const screwDummy = new THREE.Object3D();
    const slotDummy = new THREE.Object3D();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 6 + i / 6 * Math.PI * 2;
      const x = Math.cos(angle) * 0.276;
      const y = Math.sin(angle) * 0.276;

      screwDummy.position.set(x, y, 0.018);
      screwDummy.rotation.set(Math.PI / 2, 0, 0);
      screwDummy.scale.set(1, 1, 1);
      screwDummy.updateMatrix();
      mounting_screws.setMatrixAt(i, screwDummy.matrix);

      slotDummy.position.set(x, y, 0.023);
      slotDummy.rotation.set(0, 0, angle);
      slotDummy.scale.set(1, 1, 1);
      slotDummy.updateMatrix();
      screw_slots.setMatrixAt(i, slotDummy.matrix);
    }
    mounting_screws.instanceMatrix.needsUpdate = true;
    screw_slots.instanceMatrix.needsUpdate = true;
    group.add(mounting_screws, screw_slots);

    return group;
  }

  const tweeterMountGeom = new THREE.CylinderGeometry(
    0.188,
    0.188,
    0.014,
    40
  );
  const tweeterRecessGeom = new THREE.CylinderGeometry(
    0.166,
    0.166,
    0.012,
    40
  );
  const tweeterOuterRingGeom = new THREE.TorusGeometry(
    0.158,
    0.009,
    10,
    40
  );
  const tweeterSurroundGeom = new THREE.TorusGeometry(
    0.112,
    0.018,
    12,
    40
  );
  const tweeterConeGeom = new THREE.CylinderGeometry(
    0.088,
    0.108,
    0.02,
    40,
    1,
    true
  );
  const tweeterConeFaceGeom = new THREE.CylinderGeometry(
    0.088,
    0.088,
    0.005,
    40
  );
  const tweeterDustGeom = new THREE.SphereGeometry(0.071, 28, 14);
  const tweeterScrewGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.007,
    12
  );
  const tweeterSlotGeom = new THREE.BoxGeometry(0.011, 0.002, 0.0025);

  function createTweeter(name) {
    const group = new THREE.Group();
    group.name = name;

    const mount_plate = new THREE.Mesh(tweeterMountGeom, mountMat);
    mount_plate.name = name + "_mount_plate";
    mount_plate.rotation.x = Math.PI / 2;
    group.add(mount_plate);

    const recess_disc = new THREE.Mesh(tweeterRecessGeom, rubberMat);
    recess_disc.name = name + "_recess_disc";
    recess_disc.rotation.x = Math.PI / 2;
    recess_disc.position.z = 0.009;
    group.add(recess_disc);

    const outer_ring = new THREE.Mesh(tweeterOuterRingGeom, mountMat);
    outer_ring.name = name + "_outer_ring";
    outer_ring.position.z = 0.015;
    group.add(outer_ring);

    const rubber_surround = new THREE.Mesh(
      tweeterSurroundGeom,
      rubberMat
    );
    rubber_surround.name = name + "_rubber_surround";
    rubber_surround.position.z = 0.02;
    group.add(rubber_surround);

    const cone_diaphragm = new THREE.Mesh(tweeterConeGeom, coneMat);
    cone_diaphragm.name = name + "_cone_diaphragm";
    cone_diaphragm.rotation.x = Math.PI / 2;
    cone_diaphragm.position.z = 0.012;
    group.add(cone_diaphragm);

    const cone_face = new THREE.Mesh(tweeterConeFaceGeom, coneMat);
    cone_face.name = name + "_cone_face";
    cone_face.rotation.x = Math.PI / 2;
    cone_face.position.z = 0.001;
    group.add(cone_face);

    const dust_cap = new THREE.Mesh(tweeterDustGeom, dustMat);
    dust_cap.name = name + "_dust_cap";
    dust_cap.scale.set(1, 1, 0.46);
    dust_cap.position.z = 0.022;
    group.add(dust_cap);

    const mounting_screws = new THREE.InstancedMesh(
      tweeterScrewGeom,
      screwMat,
      6
    );
    mounting_screws.name = name + "_mounting_screws";

    const screw_slots = new THREE.InstancedMesh(
      tweeterSlotGeom,
      slotMat,
      6
    );
    screw_slots.name = name + "_screw_slots";

    const screwDummy = new THREE.Object3D();
    const slotDummy = new THREE.Object3D();
    for (let i = 0; i < 6; i++) {
      const angle = Math.PI / 6 + i / 6 * Math.PI * 2;
      const x = Math.cos(angle) * 0.166;
      const y = Math.sin(angle) * 0.166;

      screwDummy.position.set(x, y, 0.017);
      screwDummy.rotation.set(Math.PI / 2, 0, 0);
      screwDummy.scale.set(1, 1, 1);
      screwDummy.updateMatrix();
      mounting_screws.setMatrixAt(i, screwDummy.matrix);

      slotDummy.position.set(x, y, 0.022);
      slotDummy.rotation.set(0, 0, angle);
      slotDummy.scale.set(1, 1, 1);
      slotDummy.updateMatrix();
      screw_slots.setMatrixAt(i, slotDummy.matrix);
    }
    mounting_screws.instanceMatrix.needsUpdate = true;
    screw_slots.instanceMatrix.needsUpdate = true;
    group.add(mounting_screws, screw_slots);

    return group;
  }

  const left_outer_tweeter = createTweeter("left_outer_tweeter");
  left_outer_tweeter.position.set(-centerOffset * 2, 0.35, driverZ - 0.035);
  root.add(left_outer_tweeter);

  const left_outer_woofer = createWoofer("left_outer_woofer");
  left_outer_woofer.position.set(-centerOffset * 2, -0.36, driverZ - 0.035);
  root.add(left_outer_woofer);

  const left_inner_tweeter = createTweeter("left_inner_tweeter");
  left_inner_tweeter.position.set(-centerOffset, 0.35, driverZ + 0.025);
  root.add(left_inner_tweeter);

  const left_inner_woofer = createWoofer("left_inner_woofer");
  left_inner_woofer.position.set(-centerOffset, -0.36, driverZ + 0.025);
  root.add(left_inner_woofer);

  const right_inner_tweeter = createTweeter("right_inner_tweeter");
  right_inner_tweeter.position.set(centerOffset, 0.35, driverZ + 0.015);
  right_inner_tweeter.scale.setScalar(0.88);
  root.add(right_inner_tweeter);

  const right_inner_woofer = createWoofer("right_inner_woofer");
  right_inner_woofer.position.set(centerOffset, -0.36, driverZ + 0.015);
  root.add(right_inner_woofer);

  const right_outer_tweeter = createTweeter("right_outer_tweeter");
  right_outer_tweeter.position.set(centerOffset * 2, 0.35, driverZ - 0.04);
  root.add(right_outer_tweeter);

  const right_outer_woofer = createWoofer("right_outer_woofer");
  right_outer_woofer.position.set(centerOffset * 2, -0.36, driverZ - 0.04);
  root.add(right_outer_woofer);

  const brand_badge = new THREE.Group();
  brand_badge.name = "brand_badge";
  brand_badge.position.set(
    -0.035,
    0.605,
    faceZ + 0.029
  );

  const badgeLetterGeom = new THREE.BoxGeometry(0.012, 0.034, 0.006);
  for (let i = 0; i < 6; i++) {
    const badge_letter = new THREE.Mesh(badgeLetterGeom, badgeMat);
    badge_letter.name = "badge_letter_" + i;
    badge_letter.position.x = (i - 2.5) * 0.017;
    badge_letter.rotation.z = i === 0 ? -0.18 : i === 5 ? 0.18 : 0;
    badge_letter.scale.y = i % 2 === 0 ? 1 : 0.82;
    brand_badge.add(badge_letter);
  }
  root.add(brand_badge);

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