export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "compass";

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const needle_group = new THREE.Group();
  needle_group.name = "needle_group";
  root.add(needle_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const faceMat = new THREE.MeshStandardMaterial({
    color: 0xf3f3f0,
    metalness: 0.0,
    roughness: 0.7
  });

  const markingMat = new THREE.MeshStandardMaterial({
    color: 0x4b4d4f,
    metalness: 0.0,
    roughness: 0.7
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });

  const case_bodyProfile = [
    new THREE.Vector2(0.00, -0.130),
    new THREE.Vector2(0.76, -0.130),
    new THREE.Vector2(0.88, -0.105),
    new THREE.Vector2(0.96, -0.055),
    new THREE.Vector2(1.00, 0.010),
    new THREE.Vector2(0.99, 0.065),
    new THREE.Vector2(0.95, 0.115),
    new THREE.Vector2(0.87, 0.155),
    new THREE.Vector2(0.00, 0.165)
  ];
  const case_bodyGeom = new THREE.LatheGeometry(case_bodyProfile, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, chromeMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  case_group.add(case_body);

  const case_side_bandGeom = new THREE.CylinderGeometry(0.993, 0.993, 0.105, 64);
  const case_side_band = new THREE.Mesh(case_side_bandGeom, brushedMat);
  case_side_band.name = "case_side_band";
  case_side_band.rotation.x = Math.PI / 2;
  case_side_band.position.z = -0.025;
  case_group.add(case_side_band);

  const rear_case_ringGeom = new THREE.TorusGeometry(0.875, 0.022, 12, 64);
  const rear_case_ring = new THREE.Mesh(rear_case_ringGeom, silverMat);
  rear_case_ring.name = "rear_case_ring";
  rear_case_ring.position.z = -0.105;
  case_group.add(rear_case_ring);

  const outer_bezelGeom = new THREE.TorusGeometry(0.895, 0.070, 20, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, chromeMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.150;
  case_group.add(outer_bezel);

  const bezel_highlightGeom = new THREE.TorusGeometry(0.897, 0.020, 12, 72);
  const bezel_highlight = new THREE.Mesh(bezel_highlightGeom, silverMat);
  bezel_highlight.name = "bezel_highlight";
  bezel_highlight.position.z = 0.207;
  case_group.add(bezel_highlight);

  const inner_bezelGeom = new THREE.TorusGeometry(0.821, 0.023, 16, 72);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, chromeMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.190;
  case_group.add(inner_bezel);

  const dial_gasketGeom = new THREE.TorusGeometry(0.798, 0.009, 10, 72);
  const dial_gasket = new THREE.Mesh(dial_gasketGeom, darkMetalMat);
  dial_gasket.name = "dial_gasket";
  dial_gasket.position.z = 0.181;
  case_group.add(dial_gasket);

  const dial_faceGeom = new THREE.CylinderGeometry(0.790, 0.790, 0.018, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.169;
  dial_group.add(dial_face);

  const dial_inner_ringGeom = new THREE.TorusGeometry(0.779, 0.0045, 8, 72);
  const dial_inner_ring = new THREE.Mesh(dial_inner_ringGeom, brushedMat);
  dial_inner_ring.name = "dial_inner_ring";
  dial_inner_ring.position.z = 0.183;
  dial_group.add(dial_inner_ring);

  const minor_ticksGeom = new THREE.BoxGeometry(0.012, 0.075, 0.006);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, markingMat, 8);
  minor_ticks.name = "minor_ticks";
  const tick_dummy = new THREE.Object3D();
  let tick_index = 0;
  for (let i = 0; i < 12; i++) {
    if (i % 3 === 0) continue;
    const angle = i / 12 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.700,
      Math.cos(angle) * 0.700,
      0.184
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    minor_ticks.setMatrixAt(tick_index, tick_dummy.matrix);
    tick_index++;
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks);

  const letter_strokeGeom = new THREE.BoxGeometry(1, 1, 1);

  function addLetterStroke(parent, x1, y1, x2, y2, width) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy);
    const stroke = new THREE.Mesh(letter_strokeGeom, markingMat);
    stroke.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    stroke.rotation.z = Math.atan2(dy, dx);
    stroke.scale.set(length, width, 0.006);
    parent.add(stroke);
    return stroke;
  }

  const letterW = 0.110;
  const letterH = 0.145;
  const letterStrokeW = 0.016;

  const north_letter = new THREE.Group();
  north_letter.name = "north_letter";
  north_letter.position.set(0, 0.625, 0.185);
  addLetterStroke(north_letter, -letterW / 2, -letterH / 2, -letterW / 2, letterH / 2, letterStrokeW);
  addLetterStroke(north_letter, letterW / 2, -letterH / 2, letterW / 2, letterH / 2, letterStrokeW);
  addLetterStroke(north_letter, -letterW / 2, letterH / 2, letterW / 2, -letterH / 2, letterStrokeW);
  dial_group.add(north_letter);

  const east_letter = new THREE.Group();
  east_letter.name = "east_letter";
  east_letter.position.set(0.625, 0, 0.185);
  east_letter.rotation.z = -Math.PI / 2;
  addLetterStroke(east_letter, -letterW / 2, -letterH / 2, -letterW / 2, letterH / 2, letterStrokeW);
  addLetterStroke(east_letter, -letterW / 2, letterH / 2, letterW / 2, letterH / 2, letterStrokeW);
  addLetterStroke(east_letter, -letterW / 2, 0, letterW * 0.35, 0, letterStrokeW);
  addLetterStroke(east_letter, -letterW / 2, -letterH / 2, letterW / 2, -letterH / 2, letterStrokeW);
  dial_group.add(east_letter);

  const south_letter = new THREE.Group();
  south_letter.name = "south_letter";
  south_letter.position.set(0, -0.625, 0.185);
  south_letter.rotation.z = Math.PI;
  addLetterStroke(south_letter, -letterW / 2, letterH / 2, letterW / 2, letterH / 2, letterStrokeW);
  addLetterStroke(south_letter, -letterW / 2, letterH / 2, -letterW / 2, 0, letterStrokeW);
  addLetterStroke(south_letter, -letterW / 2, 0, letterW / 2, 0, letterStrokeW);
  addLetterStroke(south_letter, letterW / 2, 0, letterW / 2, -letterH / 2, letterStrokeW);
  addLetterStroke(south_letter, -letterW / 2, -letterH / 2, letterW / 2, -letterH / 2, letterStrokeW);
  dial_group.add(south_letter);

  const west_letter = new THREE.Group();
  west_letter.name = "west_letter";
  west_letter.position.set(-0.625, 0, 0.185);
  west_letter.rotation.z = Math.PI / 2;
  addLetterStroke(west_letter, -letterW / 2, letterH / 2, -letterW / 4, -letterH / 2, letterStrokeW);
  addLetterStroke(west_letter, -letterW / 4, -letterH / 2, 0, letterH * 0.10, letterStrokeW);
  addLetterStroke(west_letter, 0, letterH * 0.10, letterW / 4, -letterH / 2, letterStrokeW);
  addLetterStroke(west_letter, letterW / 4, -letterH / 2, letterW / 2, letterH / 2, letterStrokeW);
  dial_group.add(west_letter);

  function createHalfNeedleGeom(length, width, leftSide) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.035);
    if (leftSide) {
      shape.lineTo(-width, 0.075);
      shape.lineTo(0, length);
      shape.lineTo(0, 0.075);
    } else {
      shape.lineTo(0, 0.075);
      shape.lineTo(0, length);
      shape.lineTo(width, 0.075);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.008,
      steps: 1,
      bevelEnabled: false
    });
  }

  function setNeedleInstances(mesh, angles, z) {
    const needle_dummy = new THREE.Object3D();
    for (let i = 0; i < angles.length; i++) {
      needle_dummy.position.set(0, 0, 0);
      needle_dummy.rotation.set(0, 0, -angles[i]);
      needle_dummy.scale.set(1, 1, 1);
      needle_dummy.updateMatrix();
      mesh.setMatrixAt(i, needle_dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.position.z = z;
  }

  const cardinal_angles = [
    0,
    Math.PI / 2,
    Math.PI,
    Math.PI * 1.5
  ];
  const diagonal_angles = [
    Math.PI / 4,
    Math.PI * 3 / 4,
    Math.PI * 5 / 4,
    Math.PI * 7 / 4
  ];

  const cardinal_light_needlesGeom = createHalfNeedleGeom(0.565, 0.058, false);
  const cardinal_light_needles = new THREE.InstancedMesh(
    cardinal_light_needlesGeom,
    silverMat,
    4
  );
  cardinal_light_needles.name = "cardinal_light_needles";
  setNeedleInstances(cardinal_light_needles, cardinal_angles, 0.186);
  needle_group.add(cardinal_light_needles);

  const cardinal_dark_needlesGeom = createHalfNeedleGeom(0.565, 0.058, true);
  const cardinal_dark_needles = new THREE.InstancedMesh(
    cardinal_dark_needlesGeom,
    darkMetalMat,
    4
  );
  cardinal_dark_needles.name = "cardinal_dark_needles";
  setNeedleInstances(cardinal_dark_needles, cardinal_angles, 0.186);
  needle_group.add(cardinal_dark_needles);

  const diagonal_dark_needlesGeom = createHalfNeedleGeom(0.610, 0.044, true);
  const diagonal_dark_needles = new THREE.InstancedMesh(
    diagonal_dark_needlesGeom,
    darkMetalMat,
    4
  );
  diagonal_dark_needles.name = "diagonal_dark_needles";
  setNeedleInstances(diagonal_dark_needles, diagonal_angles, 0.186);
  needle_group.add(diagonal_dark_needles);

  const diagonal_light_needlesGeom = createHalfNeedleGeom(0.610, 0.044, false);
  const diagonal_light_needles = new THREE.InstancedMesh(
    diagonal_light_needlesGeom,
    brushedMat,
    4
  );
  diagonal_light_needles.name = "diagonal_light_needles";
  setNeedleInstances(diagonal_light_needles, diagonal_angles, 0.186);
  needle_group.add(diagonal_light_needles);

  const center_washerGeom = new THREE.CylinderGeometry(0.094, 0.094, 0.018, 32);
  const center_washer = new THREE.Mesh(center_washerGeom, darkMetalMat);
  center_washer.name = "center_washer";
  center_washer.rotation.x = Math.PI / 2;
  center_washer.position.z = 0.198;
  needle_group.add(center_washer);

  const center_hubGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.034, 32);
  const center_hub = new THREE.Mesh(center_hubGeom, chromeMat);
  center_hub.name = "center_hub";
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.210;
  needle_group.add(center_hub);

  const center_hub_ringGeom = new THREE.TorusGeometry(0.061, 0.009, 10, 32);
  const center_hub_ring = new THREE.Mesh(center_hub_ringGeom, silverMat);
  center_hub_ring.name = "center_hub_ring";
  center_hub_ring.position.z = 0.229;
  needle_group.add(center_hub_ring);

  const center_capGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 32);
  const center_cap = new THREE.Mesh(center_capGeom, chromeMat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.229;
  needle_group.add(center_cap);

  const center_screwGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.008, 24);
  const center_screw = new THREE.Mesh(center_screwGeom, brushedMat);
  center_screw.name = "center_screw";
  center_screw.rotation.x = Math.PI / 2;
  center_screw.position.z = 0.243;
  needle_group.add(center_screw);

  const center_screw_slotGeom = new THREE.BoxGeometry(0.027, 0.005, 0.004);
  const center_screw_slot = new THREE.Mesh(center_screw_slotGeom, darkMetalMat);
  center_screw_slot.name = "center_screw_slot";
  center_screw_slot.position.z = 0.249;
  needle_group.add(center_screw_slot);

  const glass_coverGeom = new THREE.CylinderGeometry(0.795, 0.795, 0.006, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.rotation.x = Math.PI / 2;
  glass_cover.position.z = 0.253;
  case_group.add(glass_cover);

  const crown_stemGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.105, 24);
  const crown_stem = new THREE.Mesh(crown_stemGeom, brushedMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(1.010, 0.018, 0.018);
  crown_group.add(crown_stem);

  const crown_collarGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.050, 32);
  const crown_collar = new THREE.Mesh(crown_collarGeom, chromeMat);
  crown_collar.name = "crown_collar";
  crown_collar.rotation.z = Math.PI / 2;
  crown_collar.position.set(1.045, 0.018, 0.018);
  crown_group.add(crown_collar);

  const crown_knobGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.105, 32);
  const crown_knob = new THREE.Mesh(crown_knobGeom, chromeMat);
  crown_knob.name = "crown_knob";
  crown_knob.rotation.z = Math.PI / 2;
  crown_knob.position.set(1.105, 0.018, 0.018);
  crown_group.add(crown_knob);

  const crown_end_capGeom = new THREE.SphereGeometry(0.075, 24, 16);
  const crown_end_cap = new THREE.Mesh(crown_end_capGeom, chromeMat);
  crown_end_cap.name = "crown_end_cap";
  crown_end_cap.position.set(1.158, 0.018, 0.018);
  crown_end_cap.scale.set(0.48, 1, 1);
  crown_group.add(crown_end_cap);

  const crown_ridgesGeom = new THREE.TorusGeometry(0.066, 0.006, 8, 24);
  const crown_ridges = new THREE.InstancedMesh(crown_ridgesGeom, silverMat, 3);
  crown_ridges.name = "crown_ridges";
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    ridge_dummy.position.set(1.078 + i * 0.027, 0.018, 0.018);
    ridge_dummy.rotation.set(0, Math.PI / 2, 0);
    ridge_dummy.scale.set(1, 1, 1);
    ridge_dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_ridges);

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