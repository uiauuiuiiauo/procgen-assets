export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wristwatch";

  const bracelet_group = new THREE.Group();
  bracelet_group.name = "bracelet_group";
  root.add(bracelet_group);

  const case_group = new THREE.Group();
  case_group.name = "case_group";
  root.add(case_group);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  case_group.add(dial_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  case_group.add(crown_group);

  const caseMat = new THREE.MeshStandardMaterial({
    color: 0x292b2e,
    metalness: 0.6,
    roughness: 0.2
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x343638,
    metalness: 0.6,
    roughness: 0.2
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x303234,
    metalness: 0.6,
    roughness: 0.5
  });
  const braceletMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.6,
    roughness: 0.2
  });
  const braceletHighlightMat = new THREE.MeshStandardMaterial({
    color: 0x24272a,
    metalness: 0.6,
    roughness: 0.2
  });
  const dialMat = new THREE.MeshStandardMaterial({
    color: 0x08090a,
    metalness: 0.0,
    roughness: 0.3
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const handEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false
  });

  function roundedRectGeometry(width, height, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.025,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const upper_bracelet_shape = new THREE.Shape();
  upper_bracelet_shape.moveTo(-1.34, 1.43);
  upper_bracelet_shape.lineTo(-1.35, 2.58);
  upper_bracelet_shape.lineTo(-1.18, 2.82);
  upper_bracelet_shape.lineTo(1.18, 2.82);
  upper_bracelet_shape.lineTo(1.35, 2.58);
  upper_bracelet_shape.lineTo(1.34, 1.43);
  upper_bracelet_shape.closePath();

  const upper_braceletGeom = new THREE.ExtrudeGeometry(upper_bracelet_shape, {
    depth: 0.24,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  upper_braceletGeom.translate(0, 0, -0.12);
  const upper_bracelet = new THREE.Mesh(upper_braceletGeom, braceletMat);
  upper_bracelet.name = "upper_bracelet";
  upper_bracelet.position.z = -0.13;
  bracelet_group.add(upper_bracelet);

  const lower_bracelet_shape = new THREE.Shape();
  lower_bracelet_shape.moveTo(-1.18, -2.82);
  lower_bracelet_shape.lineTo(1.18, -2.82);
  lower_bracelet_shape.lineTo(1.35, -2.58);
  lower_bracelet_shape.lineTo(1.34, -1.43);
  lower_bracelet_shape.lineTo(-1.34, -1.43);
  lower_bracelet_shape.lineTo(-1.35, -2.58);
  lower_bracelet_shape.closePath();

  const lower_braceletGeom = new THREE.ExtrudeGeometry(lower_bracelet_shape, {
    depth: 0.24,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  lower_braceletGeom.translate(0, 0, -0.12);
  const lower_bracelet = new THREE.Mesh(lower_braceletGeom, braceletMat);
  lower_bracelet.name = "lower_bracelet";
  lower_bracelet.position.z = -0.13;
  bracelet_group.add(lower_bracelet);

  const center_linkGeom = roundedRectGeometry(0.76, 0.44, 0.2, 0.055);
  const center_bracelet_links = new THREE.InstancedMesh(
    center_linkGeom,
    braceletHighlightMat,
    6
  );
  center_bracelet_links.name = "center_bracelet_links";

  const side_linkGeom = roundedRectGeometry(0.5, 0.44, 0.2, 0.055);
  const side_bracelet_links = new THREE.InstancedMesh(
    side_linkGeom,
    braceletMat,
    12
  );
  side_bracelet_links.name = "side_bracelet_links";

  const dummy = new THREE.Object3D();
  let centerIndex = 0;
  let sideIndex = 0;

  for (const sign of [-1, 1]) {
    for (let row = 0; row < 3; row++) {
      const y = sign * (1.72 + row * 0.46);
      const taper = 1 - row * 0.025;

      dummy.position.set(0, y, -0.015);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(taper, 1, 1);
      dummy.updateMatrix();
      center_bracelet_links.setMatrixAt(centerIndex++, dummy.matrix);

      for (const side of [-1, 1]) {
        dummy.position.set(side * 0.68 * taper, y, -0.025);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(taper, 1, 1);
        dummy.updateMatrix();
        side_bracelet_links.setMatrixAt(sideIndex++, dummy.matrix);
      }
    }
  }
  center_bracelet_links.instanceMatrix.needsUpdate = true;
  side_bracelet_links.instanceMatrix.needsUpdate = true;
  bracelet_group.add(center_bracelet_links, side_bracelet_links);

  const lug_shape = new THREE.Shape();
  lug_shape.moveTo(-0.72, 1.25);
  lug_shape.lineTo(0.72, 1.25);
  lug_shape.lineTo(0.62, 1.66);
  lug_shape.lineTo(0.48, 2.18);
  lug_shape.lineTo(0.36, 2.29);
  lug_shape.lineTo(-0.36, 2.29);
  lug_shape.lineTo(-0.48, 2.18);
  lug_shape.lineTo(-0.62, 1.66);
  lug_shape.closePath();

  const lugGeom = new THREE.ExtrudeGeometry(lug_shape, {
    depth: 0.3,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 3
  });
  lugGeom.translate(0, 0, -0.15);

  const upper_left_lug = new THREE.Mesh(lugGeom, caseMat);
  upper_left_lug.name = "upper_left_lug";
  upper_left_lug.position.set(-1.3, 0, -0.03);
  case_group.add(upper_left_lug);

  const upper_right_lug = new THREE.Mesh(lugGeom, caseMat);
  upper_right_lug.name = "upper_right_lug";
  upper_right_lug.position.set(1.3, 0, -0.03);
  upper_right_lug.scale.x = -1;
  case_group.add(upper_right_lug);

  const lower_left_lug = new THREE.Mesh(lugGeom, caseMat);
  lower_left_lug.name = "lower_left_lug";
  lower_left_lug.position.set(-1.3, 0, -0.03);
  lower_left_lug.scale.y = -1;
  case_group.add(lower_left_lug);

  const lower_right_lug = new THREE.Mesh(lugGeom, caseMat);
  lower_right_lug.name = "lower_right_lug";
  lower_right_lug.position.set(1.3, 0, -0.03);
  lower_right_lug.scale.set(-1, -1, 1);
  case_group.add(lower_right_lug);

  const case_backGeom = new THREE.CylinderGeometry(2.08, 2.08, 0.2, 64);
  const case_back = new THREE.Mesh(case_backGeom, brushedMat);
  case_back.name = "case_back";
  case_back.rotation.x = Math.PI / 2;
  case_back.position.z = -0.07;
  case_group.add(case_back);

  const case_middleGeom = new THREE.CylinderGeometry(2.18, 2.12, 0.3, 64);
  const case_middle = new THREE.Mesh(case_middleGeom, caseMat);
  case_middle.name = "case_middle";
  case_middle.rotation.x = Math.PI / 2;
  case_middle.position.z = 0.04;
  case_group.add(case_middle);

  const bezel_baseGeom = new THREE.CylinderGeometry(2.09, 2.16, 0.15, 64);
  const bezel_base = new THREE.Mesh(bezel_baseGeom, bezelMat);
  bezel_base.name = "bezel_base";
  bezel_base.rotation.x = Math.PI / 2;
  bezel_base.position.z = 0.22;
  case_group.add(bezel_base);

  const dialGeom = new THREE.CylinderGeometry(1.85, 1.85, 0.055, 64);
  const dial = new THREE.Mesh(dialGeom, dialMat);
  dial.name = "dial";
  dial.rotation.x = Math.PI / 2;
  dial.position.z = 0.315;
  dial_group.add(dial);

  const bezel_ringGeom = new THREE.TorusGeometry(1.99, 0.12, 16, 72);
  const bezel_ring = new THREE.Mesh(bezel_ringGeom, bezelMat);
  bezel_ring.name = "bezel_ring";
  bezel_ring.position.z = 0.355;
  case_group.add(bezel_ring);

  const inner_bezelGeom = new THREE.TorusGeometry(1.845, 0.035, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, silverMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.375;
  case_group.add(inner_bezel);

  const minute_tickGeom = new THREE.BoxGeometry(0.018, 0.105, 0.024);
  const minute_ticks = new THREE.InstancedMesh(minute_tickGeom, silverMat, 48);
  minute_ticks.name = "minute_ticks";

  const hour_tickGeom = new THREE.BoxGeometry(0.032, 0.17, 0.028);
  const hour_ticks = new THREE.InstancedMesh(hour_tickGeom, silverMat, 12);
  hour_ticks.name = "hour_ticks";

  let minuteIndex = 0;
  for (let i = 0; i < 60; i++) {
    if (i % 5 === 0) continue;
    const angle = i / 60 * Math.PI * 2;
    dummy.position.set(
      Math.sin(angle) * 1.69,
      Math.cos(angle) * 1.69,
      0.365
    );
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    minute_ticks.setMatrixAt(minuteIndex++, dummy.matrix);
  }

  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    dummy.position.set(
      Math.sin(angle) * 1.68,
      Math.cos(angle) * 1.68,
      0.368
    );
    dummy.rotation.set(0, 0, -angle);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    hour_ticks.setMatrixAt(i, dummy.matrix);
  }

  minute_ticks.instanceMatrix.needsUpdate = true;
  hour_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(minute_ticks, hour_ticks);

  const romanStrings = [
    "XII", "I", "II", "III", "IV", "V",
    "VI", "VII", "VIII", "IX", "X", "XI"
  ];
  const romanBars = [];

  function addRomanBar(theta, localX, localY, localRotation, width, length) {
    const radius = 1.29;
    const x = Math.sin(theta) * radius +
      Math.cos(theta) * localX +
      Math.sin(theta) * localY;
    const y = Math.cos(theta) * radius -
      Math.sin(theta) * localX +
      Math.cos(theta) * localY;
    romanBars.push({
      x: x,
      y: y,
      rotation: localRotation - theta,
      width: width,
      length: length
    });
  }

  for (let hour = 0; hour < 12; hour++) {
    const text = romanStrings[hour];
    const theta = hour / 12 * Math.PI * 2;
    const advance = 0.145;

    for (let c = 0; c < text.length; c++) {
      const character = text[c];
      const centerX = (c - (text.length - 1) / 2) * advance;

      if (character === "I") {
        addRomanBar(theta, centerX, 0, 0, 0.038, 0.4);
        addRomanBar(theta, centerX, 0.19, Math.PI / 2, 0.038, 0.115);
        addRomanBar(theta, centerX, -0.19, Math.PI / 2, 0.038, 0.115);
      } else if (character === "V") {
        addRomanBar(theta, centerX - 0.038, 0, 0.22, 0.038, 0.42);
        addRomanBar(theta, centerX + 0.038, 0, -0.22, 0.038, 0.42);
      } else if (character === "X") {
        addRomanBar(theta, centerX, 0, 0.25, 0.038, 0.43);
        addRomanBar(theta, centerX, 0, -0.25, 0.038, 0.43);
      }
    }
  }

  const roman_barGeom = new THREE.BoxGeometry(1, 1, 0.03);
  const roman_numerals = new THREE.InstancedMesh(
    roman_barGeom,
    silverMat,
    romanBars.length
  );
  roman_numerals.name = "roman_numerals";

  for (let i = 0; i < romanBars.length; i++) {
    const bar = romanBars[i];
    dummy.position.set(bar.x, bar.y, 0.37);
    dummy.rotation.set(0, 0, bar.rotation);
    dummy.scale.set(bar.width, bar.length, 1);
    dummy.updateMatrix();
    roman_numerals.setMatrixAt(i, dummy.matrix);
  }
  roman_numerals.instanceMatrix.needsUpdate = true;
  dial_group.add(roman_numerals);

  const brandBars = [];
  const brandText = "RHINLIOD";
  const brandAdvance = 0.125;
  const brandY = 0.66;

  function addBrandBar(x, y, width, height, rotation) {
    brandBars.push({ x: x, y: y, width: width, height: height, rotation: rotation || 0 });
  }

  for (let c = 0; c < brandText.length; c++) {
    const character = brandText[c];
    const x = (c - (brandText.length - 1) / 2) * brandAdvance;

    if (character === "R") {
      addBrandBar(x - 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY + 0.086, 0.07, 0.018, Math.PI / 2);
      addBrandBar(x, brandY + 0.005, 0.07, 0.018, Math.PI / 2);
      addBrandBar(x + 0.035, brandY + 0.048, 0.018, 0.075, 0);
      addBrandBar(x + 0.018, brandY - 0.045, 0.018, 0.11, -0.5);
    } else if (character === "H") {
      addBrandBar(x - 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x + 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY, 0.07, 0.018, Math.PI / 2);
    } else if (character === "I") {
      addBrandBar(x, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY + 0.086, 0.07, 0.018, Math.PI / 2);
      addBrandBar(x, brandY - 0.086, 0.07, 0.018, Math.PI / 2);
    } else if (character === "N") {
      addBrandBar(x - 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x + 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY, 0.018, 0.21, -0.57);
    } else if (character === "L") {
      addBrandBar(x - 0.032, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY - 0.086, 0.075, 0.018, Math.PI / 2);
    } else if (character === "O") {
      addBrandBar(x - 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x + 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY + 0.086, 0.07, 0.018, Math.PI / 2);
      addBrandBar(x, brandY - 0.086, 0.07, 0.018, Math.PI / 2);
    } else if (character === "D") {
      addBrandBar(x - 0.035, brandY, 0.018, 0.19, 0);
      addBrandBar(x, brandY + 0.086, 0.07, 0.018, Math.PI / 2);
      addBrandBar(x, brandY - 0.086, 0.07, 0.018, Math.PI / 2);
      addBrandBar(x + 0.035, brandY, 0.018, 0.19, 0);
    }
  }

  const brand_barGeom = new THREE.BoxGeometry(1, 1, 0.025);
  const brand_lettering = new THREE.InstancedMesh(
    brand_barGeom,
    silverMat,
    brandBars.length
  );
  brand_lettering.name = "brand_lettering";

  for (let i = 0; i < brandBars.length; i++) {
    const bar = brandBars[i];
    dummy.position.set(bar.x, bar.y, 0.375);
    dummy.rotation.set(0, 0, bar.rotation);
    dummy.scale.set(bar.width, bar.height, 1);
    dummy.updateMatrix();
    brand_lettering.setMatrixAt(i, dummy.matrix);
  }
  brand_lettering.instanceMatrix.needsUpdate = true;
  dial_group.add(brand_lettering);

  const hour_hand_shape = new THREE.Shape();
  hour_hand_shape.moveTo(-0.085, -0.16);
  hour_hand_shape.lineTo(-0.13, 0.1);
  hour_hand_shape.lineTo(-0.08, 0.78);
  hour_hand_shape.lineTo(0, 1.04);
  hour_hand_shape.lineTo(0.08, 0.78);
  hour_hand_shape.lineTo(0.13, 0.1);
  hour_hand_shape.lineTo(0.085, -0.16);
  hour_hand_shape.closePath();

  const hour_handGeom = new THREE.ExtrudeGeometry(hour_hand_shape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });
  hour_handGeom.translate(0, 0, -0.013);

  const hour_hand_shadow = new THREE.Mesh(hour_handGeom, handEdgeMat);
  hour_hand_shadow.name = "hour_hand_shadow";
  hour_hand_shadow.position.z = 0.395;
  hour_hand_shadow.rotation.z = 0.82;
  hour_hand_shadow.scale.set(1.14, 1.03, 1);
  dial_group.add(hour_hand_shadow);

  const hour_hand = new THREE.Mesh(hour_handGeom, silverMat);
  hour_hand.name = "hour_hand";
  hour_hand.position.z = 0.416;
  hour_hand.rotation.z = 0.82;
  dial_group.add(hour_hand);

  const minute_hand_shape = new THREE.Shape();
  minute_hand_shape.moveTo(-0.065, -0.17);
  minute_hand_shape.lineTo(-0.1, 0.1);
  minute_hand_shape.lineTo(-0.055, 1.18);
  minute_hand_shape.lineTo(0, 1.48);
  minute_hand_shape.lineTo(0.055, 1.18);
  minute_hand_shape.lineTo(0.1, 0.1);
  minute_hand_shape.lineTo(0.065, -0.17);
  minute_hand_shape.closePath();

  const minute_handGeom = new THREE.ExtrudeGeometry(minute_hand_shape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.007,
    bevelSegments: 2
  });
  minute_handGeom.translate(0, 0, -0.013);

  const minute_hand_shadow = new THREE.Mesh(minute_handGeom, handEdgeMat);
  minute_hand_shadow.name = "minute_hand_shadow";
  minute_hand_shadow.position.z = 0.42;
  minute_hand_shadow.rotation.z = -0.88;
  minute_hand_shadow.scale.set(1.15, 1.025, 1);
  dial_group.add(minute_hand_shadow);

  const minute_hand = new THREE.Mesh(minute_handGeom, silverMat);
  minute_hand.name = "minute_hand";
  minute_hand.position.z = 0.442;
  minute_hand.rotation.z = -0.88;
  dial_group.add(minute_hand);

  const center_pinGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.065, 24);
  const center_pin = new THREE.Mesh(center_pinGeom, silverMat);
  center_pin.name = "center_pin";
  center_pin.rotation.x = Math.PI / 2;
  center_pin.position.z = 0.46;
  dial_group.add(center_pin);

  const center_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.073, 16);
  const center_screw = new THREE.Mesh(center_screwGeom, handEdgeMat);
  center_screw.name = "center_screw";
  center_screw.rotation.x = Math.PI / 2;
  center_screw.position.z = 0.468;
  dial_group.add(center_screw);

  const crystalGeom = new THREE.CylinderGeometry(1.82, 1.82, 0.018, 64);
  const crystal = new THREE.Mesh(crystalGeom, glassMat);
  crystal.name = "crystal";
  crystal.rotation.x = Math.PI / 2;
  crystal.position.z = 0.495;
  crystal.renderOrder = 2;
  case_group.add(crystal);

  const crown_stemGeom = new THREE.CylinderGeometry(0.11, 0.11, 0.24, 20);
  const crown_stem = new THREE.Mesh(crown_stemGeom, brushedMat);
  crown_stem.name = "crown_stem";
  crown_stem.rotation.z = Math.PI / 2;
  crown_stem.position.set(2.22, -0.02, 0);
  crown_group.add(crown_stem);

  const crown_bodyGeom = new THREE.CylinderGeometry(0.23, 0.23, 0.34, 24);
  const crown_body = new THREE.Mesh(crown_bodyGeom, caseMat);
  crown_body.name = "crown_body";
  crown_body.rotation.z = Math.PI / 2;
  crown_body.position.set(2.43, -0.02, 0);
  crown_group.add(crown_body);

  const crown_ridgeGeom = new THREE.BoxGeometry(0.34, 0.032, 0.075);
  const crown_ridges = new THREE.InstancedMesh(crown_ridgeGeom, brushedMat, 16);
  crown_ridges.name = "crown_ridges";

  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    dummy.position.set(
      2.43,
      -0.02 + Math.cos(angle) * 0.235,
      Math.sin(angle) * 0.235
    );
    dummy.rotation.set(angle, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  crown_group.add(crown_ridges);

  const crown_capGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.045, 24);
  const crown_cap = new THREE.Mesh(crown_capGeom, brushedMat);
  crown_cap.name = "crown_cap";
  crown_cap.rotation.z = Math.PI / 2;
  crown_cap.position.set(2.62, -0.02, 0);
  crown_group.add(crown_cap);

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

  fitToUnitCube(root);
  return root;
}