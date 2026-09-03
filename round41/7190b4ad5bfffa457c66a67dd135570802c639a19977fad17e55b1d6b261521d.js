export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_pocket_compass";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xc59a4a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_brassMat = new THREE.MeshStandardMaterial({
    color: 0x8f682c,
    metalness: 0.5,
    roughness: 0.35,
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0xf1f0e8,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x292d2f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const gray_inkMat = new THREE.MeshStandardMaterial({
    color: 0x666b6d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0x9d3a2f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0xb68a3c,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const case_bodyGeom = new THREE.CylinderGeometry(0.98, 1.0, 0.18, 64);
  const case_body = new THREE.Mesh(case_bodyGeom, brassMat);
  case_body.name = "case_body";
  case_body.rotation.x = Math.PI / 2;
  case_group.add(case_body);

  const case_backGeom = new THREE.CylinderGeometry(0.91, 0.96, 0.055, 64);
  const case_back = new THREE.Mesh(case_backGeom, dark_brassMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.105;
  case_group.add(case_back);

  const case_side_bandGeom = new THREE.TorusGeometry(0.965, 0.025, 10, 64);
  const case_side_band = new THREE.Mesh(case_side_bandGeom, dark_brassMat);
  case_side_band.name = "case_side_band";
  case_side_band.position.z = -0.025;
  case_group.add(case_side_band);

  const bezel_plateGeom = new THREE.RingGeometry(0.79, 0.98, 64);
  const bezel_plate = new THREE.Mesh(bezel_plateGeom, brassMat);
  bezel_plate.name = "bezel_plate";
  bezel_plate.position.z = 0.108;
  case_group.add(bezel_plate);

  const outer_bezelGeom = new THREE.TorusGeometry(0.91, 0.09, 16, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.13;
  case_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.805, 0.025, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, dark_brassMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.15;
  case_group.add(inner_bezel);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  root.add(dial_group);

  const dial_faceGeom = new THREE.CircleGeometry(0.79, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dialMat);
  dial_face.name = "dial_face";
  dial_face.position.z = 0.122;
  dial_group.add(dial_face);

  const dial_borderGeom = new THREE.RingGeometry(0.766, 0.778, 64);
  const dial_border = new THREE.Mesh(dial_borderGeom, gray_inkMat);
  dial_border.name = "dial_border";
  dial_border.position.z = 0.128;
  dial_group.add(dial_border);

  const outer_scale_ringGeom = new THREE.RingGeometry(0.735, 0.739, 64);
  const outer_scale_ring = new THREE.Mesh(outer_scale_ringGeom, inkMat);
  outer_scale_ring.name = "outer_scale_ring";
  outer_scale_ring.position.z = 0.129;
  dial_group.add(outer_scale_ring);

  const inner_scale_ringGeom = new THREE.RingGeometry(0.674, 0.678, 64);
  const inner_scale_ring = new THREE.Mesh(inner_scale_ringGeom, gray_inkMat);
  inner_scale_ring.name = "inner_scale_ring";
  inner_scale_ring.position.z = 0.129;
  dial_group.add(inner_scale_ring);

  const tickGeom = new THREE.BoxGeometry(0.011, 0.065, 0.006);
  const tick_dummy = new THREE.Object3D();

  const minor_ticks = new THREE.InstancedMesh(tickGeom, gray_inkMat, 48);
  minor_ticks.name = "minor_ticks";
  let minor_index = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue;
    const angle = i / 60 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.713,
      Math.cos(angle) * 0.713,
      0.133
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    minor_ticks.setMatrixAt(minor_index++, tick_dummy.matrix);
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks);

  const major_ticks = new THREE.InstancedMesh(tickGeom, inkMat, 12);
  major_ticks.name = "major_ticks";
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    tick_dummy.position.set(
      Math.sin(angle) * 0.706,
      Math.cos(angle) * 0.706,
      0.135
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1.35, 1.5, 1);
    tick_dummy.updateMatrix();
    major_ticks.setMatrixAt(i, tick_dummy.matrix);
  }
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(major_ticks);

  const rose_group = new THREE.Group();
  rose_group.name = "rose_group";
  dial_group.add(rose_group);

  const dark_rayShape = new THREE.Shape();
  dark_rayShape.moveTo(-0.034, 0.055);
  dark_rayShape.lineTo(0, 0.61);
  dark_rayShape.lineTo(0.034, 0.055);
  dark_rayShape.closePath();
  const dark_rayGeom = new THREE.ShapeGeometry(dark_rayShape);
  const dark_rays = new THREE.InstancedMesh(dark_rayGeom, inkMat, 8);
  dark_rays.name = "dark_rays";
  const ray_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    ray_dummy.position.set(0, 0, 0.131);
    ray_dummy.rotation.set(0, 0, i / 8 * Math.PI * 2);
    ray_dummy.scale.set(1, 1, 1);
    ray_dummy.updateMatrix();
    dark_rays.setMatrixAt(i, ray_dummy.matrix);
  }
  dark_rays.instanceMatrix.needsUpdate = true;
  rose_group.add(dark_rays);

  const light_rayShape = new THREE.Shape();
  light_rayShape.moveTo(-0.018, 0.06);
  light_rayShape.lineTo(0, 0.46);
  light_rayShape.lineTo(0.018, 0.06);
  light_rayShape.closePath();
  const light_rayGeom = new THREE.ShapeGeometry(light_rayShape);
  const light_rays = new THREE.InstancedMesh(light_rayGeom, gray_inkMat, 8);
  light_rays.name = "light_rays";
  for (let i = 0; i < 8; i++) {
    ray_dummy.position.set(0, 0, 0.132);
    ray_dummy.rotation.set(0, 0, Math.PI / 8 + i / 8 * Math.PI * 2);
    ray_dummy.scale.set(1, 1, 1);
    ray_dummy.updateMatrix();
    light_rays.setMatrixAt(i, ray_dummy.matrix);
  }
  light_rays.instanceMatrix.needsUpdate = true;
  rose_group.add(light_rays);

  const guideGeom = new THREE.BoxGeometry(0.006, 0.54, 0.004);
  const rose_guides = new THREE.InstancedMesh(guideGeom, gray_inkMat, 4);
  rose_guides.name = "rose_guides";
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    ray_dummy.position.set(
      Math.sin(angle) * 0.27,
      Math.cos(angle) * 0.27,
      0.13
    );
    ray_dummy.rotation.set(0, 0, -angle);
    ray_dummy.scale.set(1, 1, 1);
    ray_dummy.updateMatrix();
    rose_guides.setMatrixAt(i, ray_dummy.matrix);
  }
  rose_guides.instanceMatrix.needsUpdate = true;
  rose_group.add(rose_guides);

  const glyph_barGeom = new THREE.BoxGeometry(1, 0.018, 0.006);

  function addGlyphBar(parent, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const glyph_bar = new THREE.Mesh(glyph_barGeom, inkMat);
    glyph_bar.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    glyph_bar.rotation.z = Math.atan2(dy, dx);
    glyph_bar.scale.set(length, 1, 1);
    parent.add(glyph_bar);
  }

  function createGlyph(letter) {
    const glyph = new THREE.Group();
    const w = 0.105;
    const h = 0.15;
    const left = -w / 2;
    const right = w / 2;
    const bottom = -h / 2;
    const top = h / 2;

    if (letter === "N") {
      addGlyphBar(glyph, left, bottom, left, top);
      addGlyphBar(glyph, right, bottom, right, top);
      addGlyphBar(glyph, left, bottom, right, top);
    } else if (letter === "E") {
      addGlyphBar(glyph, left, bottom, left, top);
      addGlyphBar(glyph, left, top, right, top);
      addGlyphBar(glyph, left, 0, right * 0.75, 0);
      addGlyphBar(glyph, left, bottom, right, bottom);
    } else if (letter === "S") {
      addGlyphBar(glyph, left, top, right, top);
      addGlyphBar(glyph, left, 0, left, top);
      addGlyphBar(glyph, left, 0, right, 0);
      addGlyphBar(glyph, right, bottom, right, 0);
      addGlyphBar(glyph, left, bottom, right, bottom);
    } else {
      addGlyphBar(glyph, left, bottom, left, top);
      addGlyphBar(glyph, right, bottom, right, top);
      addGlyphBar(glyph, left, top, right, bottom);
    }
    return glyph;
  }

  const north_letter = createGlyph("N");
  north_letter.name = "north_letter";
  north_letter.position.set(0, 0.545, 0.139);
  dial_group.add(north_letter);

  const east_letter = createGlyph("E");
  east_letter.name = "east_letter";
  east_letter.position.set(0.545, 0, 0.139);
  dial_group.add(east_letter);

  const south_letter = createGlyph("S");
  south_letter.name = "south_letter";
  south_letter.position.set(0, -0.545, 0.139);
  dial_group.add(south_letter);

  const west_letter = createGlyph("W");
  west_letter.name = "west_letter";
  west_letter.position.set(-0.545, 0, 0.139);
  dial_group.add(west_letter);

  const north_markerGeom = new THREE.CircleGeometry(0.018, 16);
  const north_marker = new THREE.Mesh(north_markerGeom, redMat);
  north_marker.name = "north_marker";
  north_marker.position.set(0, 0.625, 0.141);
  dial_group.add(north_marker);

  const needle_group = new THREE.Group();
  needle_group.name = "needle_group";
  needle_group.rotation.z = -0.72;
  dial_group.add(needle_group);

  const north_needleShape = new THREE.Shape();
  north_needleShape.moveTo(-0.052, -0.035);
  north_needleShape.lineTo(0, 0.59);
  north_needleShape.lineTo(0.052, -0.035);
  north_needleShape.lineTo(0, 0.035);
  north_needleShape.closePath();
  const north_needleGeom = new THREE.ShapeGeometry(north_needleShape);
  const north_needle = new THREE.Mesh(north_needleGeom, needleMat);
  north_needle.name = "north_needle";
  north_needle.position.z = 0.146;
  needle_group.add(north_needle);

  const south_needleShape = new THREE.Shape();
  south_needleShape.moveTo(-0.045, 0.035);
  south_needleShape.lineTo(0, -0.52);
  south_needleShape.lineTo(0.045, 0.035);
  south_needleShape.lineTo(0, -0.04);
  south_needleShape.closePath();
  const south_needleGeom = new THREE.ShapeGeometry(south_needleShape);
  const south_needle = new THREE.Mesh(south_needleGeom, inkMat);
  south_needle.name = "south_needle";
  south_needle.position.z = 0.145;
  needle_group.add(south_needle);

  const center_washerGeom = new THREE.CylinderGeometry(0.115, 0.115, 0.024, 32);
  const center_washer = new THREE.Mesh(center_washerGeom, dark_brassMat);
  center_washer.name = "center_washer";
  center_washer.rotation.x = Math.PI / 2;
  center_washer.position.z = 0.151;
  dial_group.add(center_washer);

  const center_hubGeom = new THREE.CylinderGeometry(0.095, 0.105, 0.055, 32);
  const center_hub = new THREE.Mesh(center_hubGeom, brassMat);
  center_hub.name = "center_hub";
  center_hub.rotation.x = Math.PI / 2;
  center_hub.position.z = 0.177;
  dial_group.add(center_hub);

  const center_capGeom = new THREE.CylinderGeometry(0.086, 0.09, 0.022, 32);
  const center_cap = new THREE.Mesh(center_capGeom, brassMat);
  center_cap.name = "center_cap";
  center_cap.rotation.x = Math.PI / 2;
  center_cap.position.z = 0.211;
  dial_group.add(center_cap);

  const center_cap_ringGeom = new THREE.TorusGeometry(0.073, 0.008, 8, 32);
  const center_cap_ring = new THREE.Mesh(center_cap_ringGeom, dark_brassMat);
  center_cap_ring.name = "center_cap_ring";
  center_cap_ring.position.z = 0.224;
  dial_group.add(center_cap_ring);

  const glass_coverGeom = new THREE.CircleGeometry(0.785, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.position.z = 0.232;
  glass_cover.renderOrder = 2;
  root.add(glass_cover);

  const pendant_group = new THREE.Group();
  pendant_group.name = "pendant_group";
  pendant_group.rotation.z = -Math.PI / 4;
  root.add(pendant_group);

  const pendant_socketGeom = new THREE.CylinderGeometry(0.13, 0.16, 0.22, 24);
  const pendant_socket = new THREE.Mesh(pendant_socketGeom, brassMat);
  pendant_socket.name = "pendant_socket";
  pendant_socket.position.set(0, 1.06, 0);
  pendant_group.add(pendant_socket);

  const pendant_lower_collarGeom = new THREE.TorusGeometry(0.145, 0.026, 10, 32);
  const pendant_lower_collar = new THREE.Mesh(pendant_lower_collarGeom, dark_brassMat);
  pendant_lower_collar.name = "pendant_lower_collar";
  pendant_lower_collar.rotation.x = Math.PI / 2;
  pendant_lower_collar.position.set(0, 0.975, 0);
  pendant_group.add(pendant_lower_collar);

  const pendant_upper_collarGeom = new THREE.TorusGeometry(0.13, 0.025, 10, 32);
  const pendant_upper_collar = new THREE.Mesh(pendant_upper_collarGeom, dark_brassMat);
  pendant_upper_collar.name = "pendant_upper_collar";
  pendant_upper_collar.rotation.x = Math.PI / 2;
  pendant_upper_collar.position.set(0, 1.17, 0);
  pendant_group.add(pendant_upper_collar);

  const pendant_stemGeom = new THREE.CylinderGeometry(0.11, 0.13, 0.27, 24);
  const pendant_stem = new THREE.Mesh(pendant_stemGeom, brassMat);
  pendant_stem.name = "pendant_stem";
  pendant_stem.position.set(0, 1.29, 0);
  pendant_group.add(pendant_stem);

  const bowGeom = new THREE.TorusGeometry(0.30, 0.055, 14, 64);
  const bow = new THREE.Mesh(bowGeom, brassMat);
  bow.name = "bow";
  bow.position.set(0, 1.61, 0);
  bow.scale.set(1.08, 1, 1);
  pendant_group.add(bow);

  const bow_inner_bandGeom = new THREE.TorusGeometry(0.297, 0.012, 8, 64);
  const bow_inner_band = new THREE.Mesh(bow_inner_bandGeom, dark_brassMat);
  bow_inner_band.name = "bow_inner_band";
  bow_inner_band.position.set(0, 1.61, 0.052);
  bow_inner_band.scale.set(1.08, 1, 1);
  pendant_group.add(bow_inner_band);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}