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
    color: 0x7a3523,
    metalness: 0.0,
    roughness: 0.7
  });
  const leather_darkMat = new THREE.MeshStandardMaterial({
    color: 0x4d2118,
    metalness: 0.0,
    roughness: 0.7
  });
  const leather_scuffMat = new THREE.MeshStandardMaterial({
    color: 0xb46a42,
    metalness: 0.0,
    roughness: 0.9
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb89b4f,
    metalness: 0.6,
    roughness: 0.5
  });
  const brass_darkMat = new THREE.MeshStandardMaterial({
    color: 0x75612f,
    metalness: 0.5,
    roughness: 0.55
  });
  const brass_lightMat = new THREE.MeshStandardMaterial({
    color: 0xd1ba6a,
    metalness: 0.5,
    roughness: 0.35
  });
  const dial_faceMat = new THREE.MeshStandardMaterial({
    color: 0xd2bf78,
    metalness: 0.2,
    roughness: 0.6
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x29302f,
    metalness: 0.0,
    roughness: 0.8
  });
  const red_needleMat = new THREE.MeshStandardMaterial({
    color: 0xa9433d,
    metalness: 0.0,
    roughness: 0.55
  });
  const fastenerMat = new THREE.MeshStandardMaterial({
    color: 0x663a35,
    metalness: 0.4,
    roughness: 0.45
  });
  const glass_coverMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eee7,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.2,
    depthWrite: false
  });
  const glass_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    depthWrite: false
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x765c2d,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const outer_leather_bodyGeom = new THREE.CylinderGeometry(1.0, 0.98, 0.28, 64);
  const outer_leather_body = new THREE.Mesh(outer_leather_bodyGeom, leatherMat);
  outer_leather_body.name = "outer_leather_body";
  outer_leather_body.rotation.x = Math.PI / 2;
  outer_leather_body.position.z = -0.02;
  housing_group.add(outer_leather_body);

  const leather_top_ringGeom = new THREE.TorusGeometry(0.89, 0.13, 18, 72);
  const leather_top_ring = new THREE.Mesh(leather_top_ringGeom, leatherMat);
  leather_top_ring.name = "leather_top_ring";
  leather_top_ring.position.z = 0.13;
  housing_group.add(leather_top_ring);

  const leather_inner_seamGeom = new THREE.TorusGeometry(0.765, 0.012, 10, 64);
  const leather_inner_seam = new THREE.Mesh(leather_inner_seamGeom, leather_darkMat);
  leather_inner_seam.name = "leather_inner_seam";
  leather_inner_seam.position.z = 0.178;
  housing_group.add(leather_inner_seam);

  const leather_scuffsGeom = new THREE.BoxGeometry(0.055, 0.006, 0.002);
  const leather_scuffs = new THREE.InstancedMesh(leather_scuffsGeom, leather_scuffMat, 34);
  leather_scuffs.name = "leather_scuffs";
  const scuff_dummy = new THREE.Object3D();
  for (let i = 0; i < 34; i++) {
    const angle = i / 34 * Math.PI * 2 + (i % 3) * 0.021;
    const radius = 0.89 + (((i * 5) % 7) - 3) * 0.009;
    const radialOffset = radius - 0.89;
    const surfaceZ = 0.13 + Math.sqrt(Math.max(0, 0.13 * 0.13 - radialOffset * radialOffset)) + 0.003;
    scuff_dummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      surfaceZ
    );
    scuff_dummy.rotation.set(0, 0, -angle + ((i % 5) - 2) * 0.24);
    scuff_dummy.scale.set(0.45 + (i % 6) * 0.12, 1, 1);
    scuff_dummy.updateMatrix();
    leather_scuffs.setMatrixAt(i, scuff_dummy.matrix);
  }
  leather_scuffs.instanceMatrix.needsUpdate = true;
  housing_group.add(leather_scuffs);

  const bezel_backingGeom = new THREE.CylinderGeometry(0.79, 0.79, 0.08, 64);
  const bezel_backing = new THREE.Mesh(bezel_backingGeom, brass_darkMat);
  bezel_backing.name = "bezel_backing";
  bezel_backing.rotation.x = Math.PI / 2;
  bezel_backing.position.z = 0.155;
  housing_group.add(bezel_backing);

  const dial_faceGeom = new THREE.CylinderGeometry(0.64, 0.64, 0.016, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, dial_faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.202;
  dial_group.add(dial_face);

  const outer_bezelGeom = new THREE.TorusGeometry(0.72, 0.065, 18, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, brassMat);
  outer_bezel.name = "outer_bezel";
  outer_bezel.position.z = 0.205;
  housing_group.add(outer_bezel);

  const inner_bezelGeom = new THREE.TorusGeometry(0.646, 0.014, 12, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, brass_darkMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.217;
  housing_group.add(inner_bezel);

  const bezel_highlightGeom = new THREE.TorusGeometry(0.72, 0.012, 10, 64);
  const bezel_highlight = new THREE.Mesh(bezel_highlightGeom, brass_lightMat);
  bezel_highlight.name = "bezel_highlight";
  bezel_highlight.position.z = 0.261;
  housing_group.add(bezel_highlight);

  const dial_patinaGeom = new THREE.CircleGeometry(0.012, 10);
  const dial_patina = new THREE.InstancedMesh(dial_patinaGeom, patinaMat, 18);
  dial_patina.name = "dial_patina";
  const patina_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399963;
    const radius = 0.12 + ((i * 7) % 13) / 13 * 0.43;
    const spotScale = 0.35 + (i % 5) * 0.18;
    patina_dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      0.212
    );
    patina_dummy.rotation.set(0, 0, angle * 0.37);
    patina_dummy.scale.set(spotScale, spotScale * (0.55 + (i % 3) * 0.2), 1);
    patina_dummy.updateMatrix();
    dial_patina.setMatrixAt(i, patina_dummy.matrix);
  }
  dial_patina.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_patina);

  const dial_outer_ruleGeom = new THREE.TorusGeometry(0.602, 0.003, 6, 64);
  const dial_outer_rule = new THREE.Mesh(dial_outer_ruleGeom, inkMat);
  dial_outer_rule.name = "dial_outer_rule";
  dial_outer_rule.position.z = 0.216;
  dial_group.add(dial_outer_rule);

  const dial_inner_ruleGeom = new THREE.TorusGeometry(0.482, 0.0025, 6, 64);
  const dial_inner_rule = new THREE.Mesh(dial_inner_ruleGeom, inkMat);
  dial_inner_rule.name = "dial_inner_rule";
  dial_inner_rule.position.z = 0.216;
  dial_group.add(dial_inner_rule);

  const minor_ticksGeom = new THREE.BoxGeometry(0.008, 0.048, 0.006);
  const minor_ticks = new THREE.InstancedMesh(minor_ticksGeom, inkMat, 48);
  minor_ticks.name = "minor_ticks";

  const medium_ticksGeom = new THREE.BoxGeometry(0.01, 0.075, 0.006);
  const medium_ticks = new THREE.InstancedMesh(medium_ticksGeom, inkMat, 12);
  medium_ticks.name = "medium_ticks";

  const major_ticksGeom = new THREE.BoxGeometry(0.016, 0.125, 0.007);
  const major_ticks = new THREE.InstancedMesh(major_ticksGeom, inkMat, 12);
  major_ticks.name = "major_ticks";

  const tick_dummy = new THREE.Object3D();
  let minorIndex = 0;
  let mediumIndex = 0;
  let majorIndex = 0;
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    let mesh;
    let index;
    let length;
    if (i % 6 === 0) {
      mesh = major_ticks;
      index = majorIndex++;
      length = 0.125;
    } else if (i % 3 === 0) {
      mesh = medium_ticks;
      index = mediumIndex++;
      length = 0.075;
    } else {
      mesh = minor_ticks;
      index = minorIndex++;
      length = 0.048;
    }
    const radius = 0.585 - length / 2;
    tick_dummy.position.set(
      Math.sin(angle) * radius,
      Math.cos(angle) * radius,
      0.218
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(1, 1, 1);
    tick_dummy.updateMatrix();
    mesh.setMatrixAt(index, tick_dummy.matrix);
  }
  minor_ticks.instanceMatrix.needsUpdate = true;
  medium_ticks.instanceMatrix.needsUpdate = true;
  major_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minor_ticks, medium_ticks, major_ticks);

  const numeral_segmentGeom = new THREE.BoxGeometry(0.055, 0.011, 0.006);
  const segmentPositions = {
    a: [0, 0.052, 0],
    b: [0.03, 0.027, Math.PI / 2],
    c: [0.03, -0.027, Math.PI / 2],
    d: [0, -0.052, 0],
    e: [-0.03, -0.027, Math.PI / 2],
    f: [-0.03, 0.027, Math.PI / 2],
    g: [0, 0, 0]
  };
  const digitSegments = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "2": ["a", "b", "g", "e", "d"],
    "4": ["f", "g", "b", "c"],
    "6": ["a", "f", "g", "e", "d", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"]
  };
  const dial_labels = new THREE.Group();
  dial_labels.name = "dial_labels";
  const labelSpecs = [
    [-0.37, -0.25, "0"],
    [-0.29, -0.39, "2"],
    [0.37, -0.25, "8"],
    [0.31, -0.39, "6"],
    [0.0, 0.43, "0"]
  ];
  for (let i = 0; i < labelSpecs.length; i++) {
    const spec = labelSpecs[i];
    const digit = spec[2];
    const segments = digitSegments[digit];
    for (let j = 0; j < segments.length; j++) {
      const segmentName = segments[j];
      const segmentData = segmentPositions[segmentName];
      const numeral_segment = new THREE.Mesh(numeral_segmentGeom, inkMat);
      numeral_segment.name = "dial_label_" + i + "_" + j;
      numeral_segment.position.set(
        spec[0] + segmentData[0],
        spec[1] + segmentData[1],
        0.221
      );
      numeral_segment.rotation.z = segmentData[2];
      dial_labels.add(numeral_segment);
    }
  }
  dial_group.add(dial_labels);

  const fastenerGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.018, 20);
  const left_fastener = new THREE.Mesh(fastenerGeom, fastenerMat);
  left_fastener.name = "left_fastener";
  left_fastener.rotation.x = Math.PI / 2;
  left_fastener.position.set(-0.255, 0.29, 0.226);
  dial_group.add(left_fastener);

  const right_fastener = new THREE.Mesh(fastenerGeom, fastenerMat);
  right_fastener.name = "right_fastener";
  right_fastener.rotation.x = Math.PI / 2;
  right_fastener.position.set(0.285, 0.28, 0.226);
  dial_group.add(right_fastener);

  const center_shadowGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.012, 48);
  const center_shadow = new THREE.Mesh(center_shadowGeom, brass_darkMat);
  center_shadow.name = "center_shadow";
  center_shadow.rotation.x = Math.PI / 2;
  center_shadow.position.z = 0.222;
  dial_group.add(center_shadow);

  const center_discGeom = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 48);
  const center_disc = new THREE.Mesh(center_discGeom, brassMat);
  center_disc.name = "center_disc";
  center_disc.rotation.x = Math.PI / 2;
  center_disc.position.z = 0.232;
  dial_group.add(center_disc);

  const center_grooves = new THREE.Group();
  center_grooves.name = "center_grooves";
  const grooveRadii = [0.08, 0.135, 0.19, 0.232];
  for (let i = 0; i < grooveRadii.length; i++) {
    const center_grooveGeom = new THREE.TorusGeometry(grooveRadii[i], 0.0018, 5, 48);
    const center_groove = new THREE.Mesh(center_grooveGeom, brass_darkMat);
    center_groove.name = "center_groove_" + i;
    center_groove.position.z = 0.244;
    center_grooves.add(center_groove);
  }
  dial_group.add(center_grooves);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.025, -0.065);
  needleShape.lineTo(0.025, -0.065);
  needleShape.lineTo(0.014, 0.47);
  needleShape.lineTo(0, 0.58);
  needleShape.lineTo(-0.014, 0.47);
  needleShape.closePath();

  const needleGeom = new THREE.ExtrudeGeometry(needleShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 2
  });

  const needleAngle = 0.76;

  const needle_shadow = new THREE.Mesh(needleGeom, inkMat);
  needle_shadow.name = "needle_shadow";
  needle_shadow.position.z = 0.245;
  needle_shadow.rotation.z = needleAngle;
  needle_shadow.scale.set(1.18, 1.01, 1);
  dial_group.add(needle_shadow);

  const needle = new THREE.Mesh(needleGeom, brass_lightMat);
  needle.name = "needle";
  needle.position.z = 0.252;
  needle.rotation.z = needleAngle;
  dial_group.add(needle);

  const red_counterangle = -2.38;
  const red_counterweight = new THREE.Group();
  red_counterweight.name = "red_counterweight";
  red_counterweight.position.z = 0.263;
  red_counterweight.rotation.z = red_counterangle;

  const red_counterweight_barGeom = new THREE.BoxGeometry(0.018, 0.34, 0.008);
  const red_counterweight_bar = new THREE.Mesh(red_counterweight_barGeom, red_needleMat);
  red_counterweight_bar.name = "red_counterweight_bar";
  red_counterweight_bar.position.y = -0.285;
  red_counterweight.add(red_counterweight_bar);

  const red_counterweight_tipShape = new THREE.Shape();
  red_counterweight_tipShape.moveTo(-0.028, -0.43);
  red_counterweight_tipShape.lineTo(0.028, -0.43);
  red_counterweight_tipShape.lineTo(0, -0.53);
  red_counterweight_tipShape.closePath();
  const red_counterweight_tipGeom = new THREE.ExtrudeGeometry(red_counterweight_tipShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: false
  });
  const red_counterweight_tip = new THREE.Mesh(red_counterweight_tipGeom, red_needleMat);
  red_counterweight_tip.name = "red_counterweight_tip";
  red_counterweight.add(red_counterweight_tip);
  dial_group.add(red_counterweight);

  const hub_baseGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.032, 32);
  const hub_base = new THREE.Mesh(hub_baseGeom, brass_darkMat);
  hub_base.name = "hub_base";
  hub_base.rotation.x = Math.PI / 2;
  hub_base.position.z = 0.269;
  dial_group.add(hub_base);

  const hub_capGeom = new THREE.SphereGeometry(0.083, 28, 14);
  const hub_cap = new THREE.Mesh(hub_capGeom, brass_lightMat);
  hub_cap.name = "hub_cap";
  hub_cap.position.z = 0.292;
  hub_cap.scale.set(1, 1, 0.48);
  dial_group.add(hub_cap);

  const hub_pinGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.009, 16);
  const hub_pin = new THREE.Mesh(hub_pinGeom, brass_darkMat);
  hub_pin.name = "hub_pin";
  hub_pin.rotation.x = Math.PI / 2;
  hub_pin.position.z = 0.334;
  dial_group.add(hub_pin);

  const glass_coverGeom = new THREE.CylinderGeometry(0.635, 0.635, 0.006, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glass_coverMat);
  glass_cover.name = "glass_cover";
  glass_cover.rotation.x = Math.PI / 2;
  glass_cover.position.z = 0.329;
  glass_cover.renderOrder = 2;
  dial_group.add(glass_cover);

  const glass_reflectionGeom = new THREE.TorusGeometry(0.515, 0.006, 6, 32, 0.76);
  const glass_reflection = new THREE.Mesh(glass_reflectionGeom, glass_reflectionMat);
  glass_reflection.name = "glass_reflection";
  glass_reflection.position.z = 0.335;
  glass_reflection.rotation.z = 0.62;
  glass_reflection.renderOrder = 3;
  dial_group.add(glass_reflection);

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