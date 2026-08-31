export default function generate(THREE) {
  const root = new THREE.Group();

  const aged_brassMat = new THREE.MeshStandardMaterial({
    color: 0xa98235,
    metalness: 0.5,
    roughness: 0.55,
  });
  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc5a14b,
    metalness: 0.6,
    roughness: 0.25,
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x66502a,
    metalness: 0.45,
    roughness: 0.65,
  });
  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0xd8c47a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const dial_markingMat = new THREE.MeshStandardMaterial({
    color: 0x252824,
    metalness: 0.0,
    roughness: 0.8,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x705832,
    metalness: 0.0,
    roughness: 0.9,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const tarnished_silverMat = new THREE.MeshStandardMaterial({
    color: 0x92928d,
    metalness: 0.45,
    roughness: 0.5,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe7eee9,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const case_bodyProfile = [
    new THREE.Vector2(0.0, -0.14),
    new THREE.Vector2(0.82, -0.14),
    new THREE.Vector2(0.94, -0.125),
    new THREE.Vector2(1.015, -0.07),
    new THREE.Vector2(1.04, 0.015),
    new THREE.Vector2(1.018, 0.085),
    new THREE.Vector2(0.965, 0.135),
    new THREE.Vector2(0.82, 0.145),
    new THREE.Vector2(0.0, 0.145),
  ];
  const case_bodyGeom = new THREE.LatheGeometry(case_bodyProfile, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, aged_brassMat);
  case_body.rotation.x = Math.PI / 2;
  root.add(case_body);

  const case_side_bandGeom = new THREE.CylinderGeometry(
    1.043,
    1.043,
    0.13,
    64,
    1,
    true
  );
  const case_side_band = new THREE.Mesh(case_side_bandGeom, dark_brassMat);
  case_side_band.rotation.x = Math.PI / 2;
  case_side_band.position.z = -0.005;
  root.add(case_side_band);

  const bottom_trimGeom = new THREE.TorusGeometry(0.945, 0.025, 10, 64);
  const bottom_trim = new THREE.Mesh(bottom_trimGeom, dark_brassMat);
  bottom_trim.position.z = -0.12;
  root.add(bottom_trim);

  const outer_bezelGeom = new THREE.TorusGeometry(0.91, 0.105, 18, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polished_brassMat);
  outer_bezel.position.z = 0.155;
  root.add(outer_bezel);

  const outer_bezel_crownGeom = new THREE.TorusGeometry(0.91, 0.038, 12, 72);
  const outer_bezel_crown = new THREE.Mesh(
    outer_bezel_crownGeom,
    polished_brassMat
  );
  outer_bezel_crown.position.z = 0.239;
  root.add(outer_bezel_crown);

  const inner_bezelGeom = new THREE.TorusGeometry(0.79, 0.026, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polished_brassMat);
  inner_bezel.position.z = 0.222;
  root.add(inner_bezel);

  const dial_recessGeom = new THREE.CylinderGeometry(0.79, 0.79, 0.03, 64);
  const dial_recess = new THREE.Mesh(dial_recessGeom, dark_brassMat);
  dial_recess.rotation.x = Math.PI / 2;
  dial_recess.position.z = 0.16;
  root.add(dial_recess);

  const dial_faceGeom = new THREE.CylinderGeometry(0.755, 0.755, 0.014, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.181;
  root.add(dial_face);

  const dial_retaining_ringGeom = new THREE.TorusGeometry(
    0.755,
    0.012,
    8,
    64
  );
  const dial_retaining_ring = new THREE.Mesh(
    dial_retaining_ringGeom,
    dark_brassMat
  );
  dial_retaining_ring.position.z = 0.196;
  root.add(dial_retaining_ring);

  const minor_ticksGeom = new THREE.BoxGeometry(0.009, 0.055, 0.005);
  const minor_ticks = new THREE.InstancedMesh(
    minor_ticksGeom,
    dial_markingMat,
    48
  );
  const minor_tick_dummy = new THREE.Object3D();
  let minor_index = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue;
    const angle = (i / 60) * Math.PI * 2;
    minor_tick_dummy.position.set(
      Math.sin(angle) * 0.695,
      Math.cos(angle) * 0.695,
      0.194
    );
    minor_tick_dummy.rotation.set(0, 0, -angle);
    minor_tick_dummy.scale.set(1, 1, 1);
    minor_tick_dummy.updateMatrix();
    minor_ticks.setMatrixAt(minor_index, minor_tick_dummy.matrix);
    minor_index++;
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  root.add(minor_ticks);

  const major_ticksGeom = new THREE.BoxGeometry(0.018, 0.105, 0.006);
  const major_ticks = new THREE.InstancedMesh(
    major_ticksGeom,
    dial_markingMat,
    12
  );
  const major_tick_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    major_tick_dummy.position.set(
      Math.sin(angle) * 0.675,
      Math.cos(angle) * 0.675,
      0.195
    );
    major_tick_dummy.rotation.set(0, 0, -angle);
    major_tick_dummy.updateMatrix();
    major_ticks.setMatrixAt(i, major_tick_dummy.matrix);
  }
  major_ticks.instanceMatrix.needsUpdate = true;
  root.add(major_ticks);

  const rose_spokesShape = new THREE.Shape();
  rose_spokesShape.moveTo(-0.024, 0.025);
  rose_spokesShape.lineTo(0.024, 0.025);
  rose_spokesShape.lineTo(0.006, 0.43);
  rose_spokesShape.lineTo(0.0, 0.57);
  rose_spokesShape.lineTo(-0.006, 0.43);
  rose_spokesShape.closePath();

  const rose_spokesGeom = new THREE.ShapeGeometry(rose_spokesShape);
  const rose_spokes = new THREE.InstancedMesh(
    rose_spokesGeom,
    dial_markingMat,
    8
  );
  const rose_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const length_scale = i % 2 === 0 ? 1.0 : 0.78;
    rose_dummy.position.set(0, 0, 0.192);
    rose_dummy.rotation.set(0, 0, -angle);
    rose_dummy.scale.set(i % 2 === 0 ? 1.0 : 1.35, length_scale, 1);
    rose_dummy.updateMatrix();
    rose_spokes.setMatrixAt(i, rose_dummy.matrix);
  }
  rose_spokes.instanceMatrix.needsUpdate = true;
  root.add(rose_spokes);

  const numeral_markersGeom = new THREE.BoxGeometry(0.055, 0.012, 0.005);
  const numeral_markers = new THREE.InstancedMesh(
    numeral_markersGeom,
    dial_markingMat,
    12
  );
  const numeral_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    numeral_dummy.position.set(
      Math.sin(angle) * 0.56,
      Math.cos(angle) * 0.56,
      0.196
    );
    numeral_dummy.rotation.set(0, 0, -angle);
    numeral_dummy.updateMatrix();
    numeral_markers.setMatrixAt(i, numeral_dummy.matrix);
  }
  numeral_markers.instanceMatrix.needsUpdate = true;
  root.add(numeral_markers);

  const dial_screwsGeom = new THREE.CylinderGeometry(
    0.027,
    0.027,
    0.012,
    16
  );
  const dial_screws = new THREE.InstancedMesh(
    dial_screwsGeom,
    silverMat,
    2
  );
  const screw_dummy = new THREE.Object3D();
  const screw_positions = [
    [0.43, 0.43],
    [-0.48, -0.35],
  ];
  for (let i = 0; i < screw_positions.length; i++) {
    screw_dummy.position.set(
      screw_positions[i][0],
      screw_positions[i][1],
      0.201
    );
    screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    screw_dummy.updateMatrix();
    dial_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  dial_screws.instanceMatrix.needsUpdate = true;
  root.add(dial_screws);

  const dial_screw_slotsGeom = new THREE.BoxGeometry(0.038, 0.006, 0.004);
  const dial_screw_slots = new THREE.InstancedMesh(
    dial_screw_slotsGeom,
    dial_markingMat,
    2
  );
  const slot_dummy = new THREE.Object3D();
  for (let i = 0; i < screw_positions.length; i++) {
    slot_dummy.position.set(
      screw_positions[i][0],
      screw_positions[i][1],
      0.209
    );
    slot_dummy.rotation.set(0, 0, i === 0 ? 0.4 : -0.7);
    slot_dummy.updateMatrix();
    dial_screw_slots.setMatrixAt(i, slot_dummy.matrix);
  }
  dial_screw_slots.instanceMatrix.needsUpdate = true;
  root.add(dial_screw_slots);

  const dial_patinaGeom = new THREE.CircleGeometry(0.012, 10);
  const dial_patina = new THREE.InstancedMesh(
    dial_patinaGeom,
    patinaMat,
    14
  );
  const patina_dummy = new THREE.Object3D();
  for (let i = 0; i < 14; i++) {
    const angle = i * 2.17;
    const radius = 0.12 + (((i * 7) % 13) / 13) * 0.52;
    const spot_scale = 0.45 + ((i * 5) % 9) * 0.1;
    patina_dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.199
    );
    patina_dummy.rotation.set(0, 0, angle * 0.31);
    patina_dummy.scale.set(spot_scale, spot_scale * 0.65, 1);
    patina_dummy.updateMatrix();
    dial_patina.setMatrixAt(i, patina_dummy.matrix);
  }
  dial_patina.instanceMatrix.needsUpdate = true;
  root.add(dial_patina);

  const needle_bladeShape = new THREE.Shape();
  needle_bladeShape.moveTo(-0.115, -0.045);
  needle_bladeShape.lineTo(0.64, 0);
  needle_bladeShape.lineTo(0.115, 0.045);
  needle_bladeShape.closePath();

  const needle_bladeGeom = new THREE.ExtrudeGeometry(needle_bladeShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });

  const needle_tailShape = new THREE.Shape();
  needle_tailShape.moveTo(-0.045, -0.115);
  needle_tailShape.lineTo(0, -0.64);
  needle_tailShape.lineTo(0.045, -0.115);
  needle_tailShape.closePath();

  const needle_tailGeom = new THREE.ExtrudeGeometry(needle_tailShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });

  const needle_angle = 0.32;

  const needle_tail = new THREE.Mesh(needle_tailGeom, silverMat);
  needle_tail.position.z = 0.213;
  needle_tail.rotation.z = -needle_angle;
  root.add(needle_tail);

  const needle_blade = new THREE.Mesh(needle_bladeGeom, silverMat);
  needle_blade.position.z = 0.213;
  needle_blade.rotation.z = -needle_angle;
  root.add(needle_blade);

  const needle_tarnishGeom = new THREE.CircleGeometry(0.012, 10);
  const needle_tarnish = new THREE.InstancedMesh(
    needle_tarnishGeom,
    tarnished_silverMat,
    12
  );
  const tarnish_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const distance = 0.15 + (((i * 7) % 11) / 11) * 0.43;
    const local_y = side * (0.006 + ((i * 3) % 5) * 0.004);
    const world_x =
      distance * Math.cos(needle_angle) -
      local_y * Math.sin(needle_angle);
    const world_y =
      distance * Math.sin(needle_angle) +
      local_y * Math.cos(needle_angle);
    const spot_scale = 0.5 + ((i * 5) % 8) * 0.12;
    tarnish_dummy.position.set(world_x, world_y, 0.239);
    tarnish_dummy.rotation.set(0, 0, needle_angle + i * 0.37);
    tarnish_dummy.scale.set(spot_scale, spot_scale * 0.55, 1);
    tarnish_dummy.updateMatrix();
    needle_tarnish.setMatrixAt(i, tarnish_dummy.matrix);
  }
  needle_tarnish.instanceMatrix.needsUpdate = true;
  root.add(needle_tarnish);

  const hub_baseGeom = new THREE.CylinderGeometry(0.15, 0.17, 0.038, 32);
  const hub_base = new THREE.Mesh(hub_baseGeom, tarnished_silverMat);
  hub_base.rotation.x = Math.PI / 2;
  hub_base.position.z = 0.221;
  root.add(hub_base);

  const hub_stepGeom = new THREE.CylinderGeometry(0.105, 0.125, 0.035, 32);
  const hub_step = new THREE.Mesh(hub_stepGeom, silverMat);
  hub_step.rotation.x = Math.PI / 2;
  hub_step.position.z = 0.245;
  root.add(hub_step);

  const hub_collarGeom = new THREE.CylinderGeometry(0.078, 0.088, 0.032, 32);
  const hub_collar = new THREE.Mesh(hub_collarGeom, polished_brassMat);
  hub_collar.rotation.x = Math.PI / 2;
  hub_collar.position.z = 0.265;
  root.add(hub_collar);

  const hub_capGeom = new THREE.CylinderGeometry(0.055, 0.068, 0.034, 32);
  const hub_cap = new THREE.Mesh(hub_capGeom, silverMat);
  hub_cap.rotation.x = Math.PI / 2;
  hub_cap.position.z = 0.286;
  root.add(hub_cap);

  const hub_buttonGeom = new THREE.SphereGeometry(0.038, 20, 10);
  const hub_button = new THREE.Mesh(hub_buttonGeom, silverMat);
  hub_button.scale.set(1, 1, 0.48);
  hub_button.position.z = 0.31;
  root.add(hub_button);

  const glass_coverGeom = new THREE.CircleGeometry(0.748, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.position.z = 0.322;
  root.add(glass_cover);

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