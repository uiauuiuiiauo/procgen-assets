export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_round_gauge";

  const housing_group = new THREE.Group();
  housing_group.name = "housing_group";
  root.add(housing_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const leatherMat = new THREE.MeshStandardMaterial({
    color: 0x7a3f28,
    metalness: 0.0,
    roughness: 0.7
  });
  const leather_darkMat = new THREE.MeshStandardMaterial({
    color: 0x4b2418,
    metalness: 0.0,
    roughness: 0.7
  });
  const leather_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xa3633e,
    metalness: 0.0,
    roughness: 0.7
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb99a4f,
    metalness: 0.6,
    roughness: 0.5
  });
  const brass_lightMat = new THREE.MeshStandardMaterial({
    color: 0xd4b85e,
    metalness: 0.6,
    roughness: 0.2
  });
  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0xd2bd75,
    metalness: 0.0,
    roughness: 0.7
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x30322d,
    metalness: 0.0,
    roughness: 0.8
  });
  const screwMat = new THREE.MeshStandardMaterial({
    color: 0x642f31,
    metalness: 0.5,
    roughness: 0.25
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const red_paintMat = new THREE.MeshStandardMaterial({
    color: 0xa83d36,
    metalness: 0.0,
    roughness: 0.7
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eee7,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const housing_bodyGeom = new THREE.CylinderGeometry(1.0, 1.0, 0.28, 64);
  const housing_body = new THREE.Mesh(housing_bodyGeom, leatherMat);
  housing_body.name = "housing_body";
  housing_body.rotation.x = Math.PI / 2;
  housing_body.position.z = -0.06;
  housing_group.add(housing_body);

  const housing_backGeom = new THREE.CylinderGeometry(0.96, 0.98, 0.06, 64);
  const housing_back = new THREE.Mesh(housing_backGeom, leather_darkMat);
  housing_back.name = "housing_back";
  housing_back.rotation.x = Math.PI / 2;
  housing_back.position.z = -0.21;
  housing_group.add(housing_back);

  const leather_rimGeom = new THREE.TorusGeometry(0.86, 0.16, 20, 72);
  const leather_rim = new THREE.Mesh(leather_rimGeom, leatherMat);
  leather_rim.name = "leather_rim";
  leather_rim.position.z = 0.11;
  housing_group.add(leather_rim);

  const leather_inner_seamGeom = new THREE.TorusGeometry(0.708, 0.012, 8, 64);
  const leather_inner_seam = new THREE.Mesh(leather_inner_seamGeom, leather_darkMat);
  leather_inner_seam.name = "leather_inner_seam";
  leather_inner_seam.position.z = 0.194;
  housing_group.add(leather_inner_seam);

  const leather_grainGeom = new THREE.BoxGeometry(0.07, 0.004, 0.003);
  const leather_grain = new THREE.InstancedMesh(leather_grainGeom, leather_highlightMat, 36);
  leather_grain.name = "leather_grain";
  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 36; i++) {
    const angle = i / 36 * Math.PI * 2;
    const radius = 0.86 + 0.035 * Math.sin(i * 1.73);
    const surfaceZ = 0.11 + Math.sqrt(0.16 * 0.16 - (radius - 0.86) * (radius - 0.86)) + 0.003;
    grain_dummy.position.set(Math.sin(angle) * radius, Math.cos(angle) * radius, surfaceZ);
    grain_dummy.rotation.set(0, 0, angle + 0.42 * Math.sin(i * 2.1));
    grain_dummy.scale.set(0.55 + 0.35 * (1 + Math.sin(i * 1.37)), 1, 1);
    grain_dummy.updateMatrix();
    leather_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  leather_grain.instanceMatrix.needsUpdate = true;
  housing_group.add(leather_grain);

  const bezel_backGeom = new THREE.CylinderGeometry(0.72, 0.72, 0.07, 64);
  const bezel_back = new THREE.Mesh(bezel_backGeom, brassMat);
  bezel_back.name = "bezel_back";
  bezel_back.rotation.x = Math.PI / 2;
  bezel_back.position.z = 0.18;
  housing_group.add(bezel_back);

  const dial_faceGeom = new THREE.CylinderGeometry(0.615, 0.615, 0.014, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.218;
  dial_group.add(dial_face);

  const outer_bezelGeom = new THREE.TorusGeometry(0.665, 0.055, 16, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.225;
  dial_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.606, 0.014, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, brass_lightMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.238;
  dial_group.add(inner_bezel);

  const dial_outer_ruleGeom = new THREE.TorusGeometry(0.584, 0.003, 6, 64);
  const dial_outer_rule = new THREE.Mesh(dial_outer_ruleGeom, inkMat);
  dial_outer_rule.name = "dial_outer_rule";
  dial_outer_rule.position.z = 0.232;
  dial_group.add(dial_outer_rule);

  const dial_inner_ruleGeom = new THREE.TorusGeometry(0.515, 0.0025, 6, 64);
  const dial_inner_rule = new THREE.Mesh(dial_inner_ruleGeom, inkMat);
  dial_inner_rule.name = "dial_inner_rule";
  dial_inner_rule.position.z = 0.232;
  dial_group.add(dial_inner_rule);

  const minor_ticksGeom = new THREE.BoxGeometry(0.007, 0.052, 0.006);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, inkMat, 60);
  minor_ticks.name = "minor_ticks";
  const minor_dummy = new THREE.Object3D();
  let minor_index = 0;
  for (let i = 0; i < 72; i++) {
    if (i % 6 === 0) continue;
    const angle = i / 72 * Math.PI * 2;
    minor_dummy.position.set(Math.sin(angle) * 0.551, Math.cos(angle) * 0.551, 0.235);
    minor_dummy.rotation.set(0, 0, -angle);
    minor_dummy.scale.set(1, 1, 1);
    minor_dummy.updateMatrix();
    minor_ticks.setMatrixAt(minor_index++, minor_dummy.matrix);
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks);

  const major_ticksGeom = new THREE.BoxGeometry(0.019, 0.105, 0.007);
  const major_ticks = new THREE.InstancedMesh(major_ticksGeom, inkMat, 12);
  major_ticks.name = "major_ticks";
  const major_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    major_dummy.position.set(Math.sin(angle) * 0.532, Math.cos(angle) * 0.532, 0.236);
    major_dummy.rotation.set(0, 0, -angle);
    major_dummy.scale.set(1, 1, 1);
    major_dummy.updateMatrix();
    major_ticks.setMatrixAt(i, major_dummy.matrix);
  }
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(major_ticks);

  const numeral_markersGeom = new THREE.BoxGeometry(0.055, 0.014, 0.006);
  const numeral_markers = new THREE.InstancedMesh(numeral_markersGeom, inkMat, 12);
  numeral_markers.name = "numeral_markers";
  const numeral_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i + 0.5) / 12 * Math.PI * 2;
    numeral_dummy.position.set(Math.sin(angle) * 0.425, Math.cos(angle) * 0.425, 0.235);
    numeral_dummy.rotation.set(0, 0, -angle);
    numeral_dummy.scale.set(i % 3 === 0 ? 1.15 : 0.75, 1, 1);
    numeral_dummy.updateMatrix();
    numeral_markers.setMatrixAt(i, numeral_dummy.matrix);
  }
  numeral_markers.instanceMatrix.needsUpdate = true;
  dial_group.add(numeral_markers);

  const screw_angles = [Math.PI / 4, Math.PI * 3 / 4];

  const screw_washersGeom = new THREE.CylinderGeometry(0.041, 0.041, 0.009, 24);
  const screw_washers = new THREE.InstancedMesh(screw_washersGeom, brass_lightMat, 2);
  screw_washers.name = "screw_washers";
  const washer_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const angle = screw_angles[i];
    washer_dummy.position.set(Math.sin(angle) * 0.36, Math.cos(angle) * 0.36, 0.236);
    washer_dummy.rotation.set(Math.PI / 2, 0, 0);
    washer_dummy.scale.set(1, 1, 1);
    washer_dummy.updateMatrix();
    screw_washers.setMatrixAt(i, washer_dummy.matrix);
  }
  screw_washers.instanceMatrix.needsUpdate = true;
  dial_group.add(screw_washers);

  const face_screwsGeom = new THREE.CylinderGeometry(0.029, 0.029, 0.014, 24);
  const face_screws = new THREE.InstancedMesh(face_screwsGeom, screwMat, 2);
  face_screws.name = "face_screws";
  const screw_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const angle = screw_angles[i];
    screw_dummy.position.set(Math.sin(angle) * 0.36, Math.cos(angle) * 0.36, 0.243);
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.scale.set(1, 1, 1);
    screw_dummy.updateMatrix();
    face_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  face_screws.instanceMatrix.needsUpdate = true;
  dial_group.add(face_screws);

  const screw_slotsGeom = new THREE.BoxGeometry(0.038, 0.006, 0.004);
  const screw_slots = new THREE.InstancedMesh(screw_slotsGeom, silverMat, 2);
  screw_slots.name = "screw_slots";
  const slot_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const angle = screw_angles[i];
    slot_dummy.position.set(Math.sin(angle) * 0.36, Math.cos(angle) * 0.36, 0.252);
    slot_dummy.rotation.set(0, 0, -angle + 0.35);
    slot_dummy.scale.set(1, 1, 1);
    slot_dummy.updateMatrix();
    screw_slots.setMatrixAt(i, slot_dummy.matrix);
  }
  screw_slots.instanceMatrix.needsUpdate = true;
  dial_group.add(screw_slots);

  const center_discGeom = new THREE.CylinderGeometry(0.235, 0.235, 0.012, 64);
  const center_disc = new THREE.Mesh(center_discGeom, brassMat);
  center_disc.name = "center_disc";
  center_disc.rotation.x = Math.PI / 2;
  center_disc.position.z = 0.239;
  dial_group.add(center_disc);

  const center_disc_rimGeom = new THREE.TorusGeometry(0.232, 0.004, 6, 48);
  const center_disc_rim = new THREE.Mesh(center_disc_rimGeom, brass_lightMat);
  center_disc_rim.name = "center_disc_rim";
  center_disc_rim.position.z = 0.247;
  dial_group.add(center_disc_rim);

  const center_groovesGeom = new THREE.BoxGeometry(0.0025, 0.17, 0.002);
  const center_grooves = new THREE.InstancedMesh(center_groovesGeom, brass_lightMat, 28);
  center_grooves.name = "center_grooves";
  const groove_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    groove_dummy.position.set(Math.sin(angle) * 0.105, Math.cos(angle) * 0.105, 0.247);
    groove_dummy.rotation.set(0, 0, -angle);
    groove_dummy.scale.set(1, 1, 1);
    groove_dummy.updateMatrix();
    center_grooves.setMatrixAt(i, groove_dummy.matrix);
  }
  center_grooves.instanceMatrix.needsUpdate = true;
  dial_group.add(center_grooves);

  const primary_pointerShape = new THREE.Shape();
  primary_pointerShape.moveTo(-0.024, -0.075);
  primary_pointerShape.lineTo(-0.017, 0.39);
  primary_pointerShape.lineTo(0, 0.555);
  primary_pointerShape.lineTo(0.017, 0.39);
  primary_pointerShape.lineTo(0.024, -0.075);
  primary_pointerShape.closePath();

  const primary_pointerGeom = new THREE.ExtrudeGeometry(primary_pointerShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.0015,
    bevelSegments: 2
  });
  const primary_pointer = new THREE.Mesh(primary_pointerGeom, silverMat);
  primary_pointer.name = "primary_pointer";
  primary_pointer.position.z = 0.249;
  primary_pointer.rotation.z = Math.PI / 4;
  dial_group.add(primary_pointer);

  const primary_pointer_tipShape = new THREE.Shape();
  primary_pointer_tipShape.moveTo(-0.014, 0.39);
  primary_pointer_tipShape.lineTo(0, 0.555);
  primary_pointer_tipShape.lineTo(0.014, 0.39);
  primary_pointer_tipShape.closePath();

  const primary_pointer_tipGeom = new THREE.ExtrudeGeometry(primary_pointer_tipShape, {
    depth: 0.009,
    steps: 1,
    bevelEnabled: false
  });
  const primary_pointer_tip = new THREE.Mesh(primary_pointer_tipGeom, red_paintMat);
  primary_pointer_tip.name = "primary_pointer_tip";
  primary_pointer_tip.position.z = 0.252;
  primary_pointer_tip.rotation.z = Math.PI / 4;
  dial_group.add(primary_pointer_tip);

  const secondary_pointerShape = new THREE.Shape();
  secondary_pointerShape.moveTo(-0.012, -0.055);
  secondary_pointerShape.lineTo(-0.008, -0.41);
  secondary_pointerShape.lineTo(0, -0.555);
  secondary_pointerShape.lineTo(0.008, -0.41);
  secondary_pointerShape.lineTo(0.012, -0.055);
  secondary_pointerShape.closePath();

  const secondary_pointerGeom = new THREE.ExtrudeGeometry(secondary_pointerShape, {
    depth: 0.007,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.0015,
    bevelSize: 0.001,
    bevelSegments: 2
  });
  const secondary_pointer = new THREE.Mesh(secondary_pointerGeom, silverMat);
  secondary_pointer.name = "secondary_pointer";
  secondary_pointer.position.z = 0.251;
  secondary_pointer.rotation.z = -Math.PI / 4;
  dial_group.add(secondary_pointer);

  const secondary_pointer_tipShape = new THREE.Shape();
  secondary_pointer_tipShape.moveTo(-0.008, -0.41);
  secondary_pointer_tipShape.lineTo(0, -0.555);
  secondary_pointer_tipShape.lineTo(0.008, -0.41);
  secondary_pointer_tipShape.closePath();

  const secondary_pointer_tipGeom = new THREE.ExtrudeGeometry(secondary_pointer_tipShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: false
  });
  const secondary_pointer_tip = new THREE.Mesh(secondary_pointer_tipGeom, red_paintMat);
  secondary_pointer_tip.name = "secondary_pointer_tip";
  secondary_pointer_tip.position.z = 0.254;
  secondary_pointer_tip.rotation.z = -Math.PI / 4;
  dial_group.add(secondary_pointer_tip);

  const center_hubGeom = new THREE.CylinderGeometry(0.076, 0.076, 0.03, 32);
  const center_hub = new THREE.Mesh(center_hubGeom, brass_lightMat);
  center_hub.name = "center_hub";
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.266;
  dial_group.add(center_hub);

  const center_hub_capGeom = new THREE.SphereGeometry(0.068, 24, 12);
  const center_hub_cap = new THREE.Mesh(center_hub_capGeom, brass_lightMat);
  center_hub_cap.name = "center_hub_cap";
  center_hub_cap.scale.set(1, 1, 0.35);
  center_hub_cap.position.z = 0.286;
  dial_group.add(center_hub_cap);

  const center_pinGeom = new THREE.SphereGeometry(0.012, 16, 8);
  const center_pin = new THREE.Mesh(center_pinGeom, silverMat);
  center_pin.name = "center_pin";
  center_pin.scale.set(1, 1, 0.55);
  center_pin.position.z = 0.303;
  dial_group.add(center_pin);

  const glass_coverGeom = new THREE.CircleGeometry(0.595, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.307;
  glass_cover.renderOrder = 2;
  dial_group.add(glass_cover);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}