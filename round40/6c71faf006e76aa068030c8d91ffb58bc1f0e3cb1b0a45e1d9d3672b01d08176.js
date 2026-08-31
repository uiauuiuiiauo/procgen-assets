export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "vintage_speedometer";

  const outer_caseMat = new THREE.MeshStandardMaterial({
    color: 0x24131a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const outer_rim_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x4b2934,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x151316,
    metalness: 0.0,
    roughness: 0.3,
  });
  const faceMat = new THREE.MeshStandardMaterial({
    color: 0xe8e2c3,
    metalness: 0.0,
    roughness: 0.7,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x252a2a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const needleMat = new THREE.MeshStandardMaterial({
    color: 0xc83236,
    metalness: 0.0,
    roughness: 0.3,
  });
  const hubMat = new THREE.MeshStandardMaterial({
    color: 0xb92f32,
    metalness: 0.0,
    roughness: 0.3,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x70401f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const age_spotMat = new THREE.MeshStandardMaterial({
    color: 0x9b6a31,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.48,
  });
  const scratchMat = new THREE.MeshStandardMaterial({
    color: 0x75694d,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.42,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });

  const rear_caseGeom = new THREE.CylinderGeometry(0.98, 0.98, 0.26, 64);
  const rear_case = new THREE.Mesh(rear_caseGeom, outer_caseMat);
  rear_case.name = "rear_case";
  rear_case.rotation.x = Math.PI / 2;
  rear_case.position.z = -0.07;
  root.add(rear_case);

  const outer_caseGeom = new THREE.TorusGeometry(0.87, 0.13, 20, 96);
  const outer_case = new THREE.Mesh(outer_caseGeom, outer_caseMat);
  outer_case.name = "outer_case";
  outer_case.position.z = 0.035;
  root.add(outer_case);

  const outer_rim_highlightGeom = new THREE.TorusGeometry(0.88, 0.035, 12, 96);
  const outer_rim_highlight = new THREE.Mesh(
    outer_rim_highlightGeom,
    outer_rim_highlightMat
  );
  outer_rim_highlight.name = "outer_rim_highlight";
  outer_rim_highlight.position.z = 0.145;
  root.add(outer_rim_highlight);

  const inner_bezelGeom = new THREE.TorusGeometry(0.755, 0.027, 12, 96);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, bezelMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.15;
  root.add(inner_bezel);

  const dial_faceGeom = new THREE.CylinderGeometry(0.742, 0.742, 0.026, 64);
  const dial_face = new THREE.Mesh(dial_faceGeom, faceMat);
  dial_face.name = "dial_face";
  dial_face.rotation.x = Math.PI / 2;
  dial_face.position.z = 0.063;
  root.add(dial_face);

  const dial_borderGeom = new THREE.TorusGeometry(0.733, 0.008, 8, 96);
  const dial_border = new THREE.Mesh(dial_borderGeom, dark_metalMat);
  dial_border.name = "dial_border";
  dial_border.position.z = 0.083;
  root.add(dial_border);

  const dial_markings = new THREE.Group();
  dial_markings.name = "dial_markings";
  root.add(dial_markings);

  const tick_marksGeom = new THREE.BoxGeometry(1, 1, 1);
  const tick_marks = new THREE.InstancedMesh(tick_marksGeom, inkMat, 48);
  tick_marks.name = "tick_marks";
  const tick_dummy = new THREE.Object3D();

  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    const major = i % 4 === 0;
    const tick_length = major ? 0.115 : 0.072;
    const tick_width = major ? 0.029 : 0.012;
    const tick_radius = 0.704 - tick_length * 0.5;

    tick_dummy.position.set(
      Math.sin(angle) * tick_radius,
      Math.cos(angle) * tick_radius,
      0.086
    );
    tick_dummy.rotation.set(0, 0, -angle);
    tick_dummy.scale.set(tick_width, tick_length, 0.008);
    tick_dummy.updateMatrix();
    tick_marks.setMatrixAt(i, tick_dummy.matrix);
  }
  tick_marks.instanceMatrix.needsUpdate = true;
  dial_markings.add(tick_marks);

  const numeral_patterns = {
    "0": ["a", "b", "c", "d", "e", "f"],
    "1": ["b", "c"],
    "2": ["a", "b", "g", "e", "d"],
    "3": ["a", "b", "c", "d", "g"],
    "4": ["f", "g", "b", "c"],
    "5": ["a", "f", "g", "c", "d"],
    "6": ["a", "f", "g", "e", "c", "d"],
    "7": ["a", "b", "c"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "f", "g"],
  };
  const numeral_layouts = [
    { value: "4", x: 0.00, y: 0.49, w: 0.075, h: 0.145 },
    { value: "8", x: 0.37, y: 0.30, w: 0.090, h: 0.150 },
    { value: "5", x: 0.50, y: 0.00, w: 0.090, h: 0.150 },
    { value: "4", x: 0.37, y: -0.31, w: 0.090, h: 0.150 },
    { value: "0", x: -0.39, y: -0.43, w: 0.095, h: 0.155 },
    { value: "9", x: -0.50, y: 0.00, w: 0.090, h: 0.150 },
    { value: "0", x: -0.37, y: 0.31, w: 0.090, h: 0.150 },
  ];
  const numeral_specs = [];

  function addDigit(value, cx, cy, width, height, thickness) {
    const vertical_length = height * 0.43;
    const segments = {
      a: [0, height * 0.5, width, 0],
      b: [width * 0.5, height * 0.25, vertical_length, Math.PI / 2],
      c: [width * 0.5, -height * 0.25, vertical_length, Math.PI / 2],
      d: [0, -height * 0.5, width, 0],
      e: [-width * 0.5, -height * 0.25, vertical_length, Math.PI / 2],
      f: [-width * 0.5, height * 0.25, vertical_length, Math.PI / 2],
      g: [0, 0, width, 0],
    };
    const active = numeral_patterns[value];
    for (let i = 0; i < active.length; i++) {
      const segment = segments[active[i]];
      numeral_specs.push({
        x: cx + segment[0],
        y: cy + segment[1],
        length: segment[2],
        rotation: segment[3],
        thickness: thickness,
      });
    }
  }

  for (let i = 0; i < numeral_layouts.length; i++) {
    const layout = numeral_layouts[i];
    addDigit(
      layout.value,
      layout.x,
      layout.y,
      layout.w,
      layout.h,
      0.015
    );
  }

  const numeral_barsGeom = new THREE.BoxGeometry(1, 1, 1);
  const numeral_bars = new THREE.InstancedMesh(
    numeral_barsGeom,
    inkMat,
    numeral_specs.length
  );
  numeral_bars.name = "numeral_bars";
  const numeral_dummy = new THREE.Object3D();

  for (let i = 0; i < numeral_specs.length; i++) {
    const spec = numeral_specs[i];
    numeral_dummy.position.set(spec.x, spec.y, 0.088);
    numeral_dummy.rotation.set(0, 0, spec.rotation);
    numeral_dummy.scale.set(spec.length, spec.thickness, 0.008);
    numeral_dummy.updateMatrix();
    numeral_bars.setMatrixAt(i, numeral_dummy.matrix);
  }
  numeral_bars.instanceMatrix.needsUpdate = true;
  dial_markings.add(numeral_bars);

  const lettering_specs = [];

  function addLetterBar(x, y, length, rotation, thickness) {
    lettering_specs.push({
      x: x,
      y: y,
      length: length,
      rotation: rotation,
      thickness: thickness,
    });
  }

  const label_y = 0.09;
  const letter_height = 0.15;
  const letter_width = 0.075;
  const letter_bar = 0.014;

  const m_x = -0.13;
  addLetterBar(m_x - letter_width * 0.5, label_y, letter_height, Math.PI / 2, letter_bar);
  addLetterBar(m_x + letter_width * 0.5, label_y, letter_height, Math.PI / 2, letter_bar);
  const m_diagonal = letter_height / 2;
  const m_diagonal_length = Math.sqrt(
    m_diagonal * m_diagonal + letter_width * letter_width * 0.25
  );
  const m_diagonal_angle = Math.atan2(letter_width * 0.5, m_diagonal);
  addLetterBar(
    m_x - letter_width * 0.25,
    label_y + letter_height * 0.25,
    m_diagonal_length,
    m_diagonal_angle,
    letter_bar
  );
  addLetterBar(
    m_x + letter_width * 0.25,
    label_y + letter_height * 0.25,
    m_diagonal_length,
    -m_diagonal_angle,
    letter_bar
  );

  const p_x = 0;
  addLetterBar(p_x - letter_width * 0.5, label_y, letter_height, Math.PI / 2, letter_bar);
  addLetterBar(p_x, label_y + letter_height * 0.5, letter_width, 0, letter_bar);
  addLetterBar(p_x, label_y, letter_width, 0, letter_bar);
  addLetterBar(
    p_x + letter_width * 0.5,
    label_y + letter_height * 0.25,
    letter_height * 0.5,
    Math.PI / 2,
    letter_bar
  );

  const h_x = 0.13;
  addLetterBar(h_x - letter_width * 0.5, label_y, letter_height, Math.PI / 2, letter_bar);
  addLetterBar(h_x + letter_width * 0.5, label_y, letter_height, Math.PI / 2, letter_bar);
  addLetterBar(h_x, label_y, letter_width, 0, letter_bar);

  const lettering_barsGeom = new THREE.BoxGeometry(1, 1, 1);
  const lettering_bars = new THREE.InstancedMesh(
    lettering_barsGeom,
    inkMat,
    lettering_specs.length
  );
  lettering_bars.name = "lettering_bars";
  const lettering_dummy = new THREE.Object3D();

  for (let i = 0; i < lettering_specs.length; i++) {
    const spec = lettering_specs[i];
    lettering_dummy.position.set(spec.x, spec.y, 0.089);
    lettering_dummy.rotation.set(0, 0, spec.rotation);
    lettering_dummy.scale.set(spec.length, spec.thickness, 0.008);
    lettering_dummy.updateMatrix();
    lettering_bars.setMatrixAt(i, lettering_dummy.matrix);
  }
  lettering_bars.instanceMatrix.needsUpdate = true;
  dial_markings.add(lettering_bars);

  const age_spotsGeom = new THREE.CircleGeometry(1, 12);
  const age_spots = new THREE.InstancedMesh(age_spotsGeom, age_spotMat, 28);
  age_spots.name = "age_spots";
  const spot_dummy = new THREE.Object3D();

  for (let i = 0; i < 28; i++) {
    const angle = i * 2.399963229728653;
    const radial = 0.10 + 0.48 * (((i * 7) % 29) / 29);
    const spot_size = 0.006 + 0.012 * (((i * 5) % 11) / 10);
    spot_dummy.position.set(
      Math.cos(angle) * radial,
      Math.sin(angle) * radial,
      0.082
    );
    spot_dummy.rotation.set(0, 0, i * 0.37);
    spot_dummy.scale.set(
      spot_size,
      spot_size * (0.55 + 0.45 * ((i % 5) / 4)),
      1
    );
    spot_dummy.updateMatrix();
    age_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  age_spots.instanceMatrix.needsUpdate = true;
  dial_markings.add(age_spots);

  const surface_scratchesGeom = new THREE.BoxGeometry(1, 1, 1);
  const surface_scratches = new THREE.InstancedMesh(
    surface_scratchesGeom,
    scratchMat,
    16
  );
  surface_scratches.name = "surface_scratches";
  const scratch_dummy = new THREE.Object3D();

  for (let i = 0; i < 16; i++) {
    const angle = i * 1.731;
    const radial = 0.15 + 0.38 * (((i * 9) % 17) / 17);
    scratch_dummy.position.set(
      Math.cos(angle) * radial,
      Math.sin(angle) * radial,
      0.083
    );
    scratch_dummy.rotation.set(0, 0, i * 0.83);
    scratch_dummy.scale.set(
      0.0012,
      0.025 + 0.035 * ((i % 6) / 5),
      0.0015
    );
    scratch_dummy.updateMatrix();
    surface_scratches.setMatrixAt(i, scratch_dummy.matrix);
  }
  surface_scratches.instanceMatrix.needsUpdate = true;
  dial_markings.add(surface_scratches);

  const bottom_subdial = new THREE.Group();
  bottom_subdial.name = "bottom_subdial";
  bottom_subdial.position.set(0, -0.49, 0.09);
  root.add(bottom_subdial);

  const bottom_subdial_faceGeom = new THREE.CylinderGeometry(
    0.103,
    0.103,
    0.014,
    40
  );
  const bottom_subdial_face = new THREE.Mesh(
    bottom_subdial_faceGeom,
    brushed_metalMat
  );
  bottom_subdial_face.name = "bottom_subdial_face";
  bottom_subdial_face.rotation.x = Math.PI / 2;
  bottom_subdial.add(bottom_subdial_face);

  const bottom_subdial_rimGeom = new THREE.TorusGeometry(
    0.103,
    0.017,
    10,
    48
  );
  const bottom_subdial_rim = new THREE.Mesh(
    bottom_subdial_rimGeom,
    dark_metalMat
  );
  bottom_subdial_rim.name = "bottom_subdial_rim";
  bottom_subdial_rim.position.z = 0.009;
  bottom_subdial.add(bottom_subdial_rim);

  const bottom_subdial_centerGeom = new THREE.CylinderGeometry(
    0.073,
    0.073,
    0.018,
    40
  );
  const bottom_subdial_center = new THREE.Mesh(
    bottom_subdial_centerGeom,
    brushed_metalMat
  );
  bottom_subdial_center.name = "bottom_subdial_center";
  bottom_subdial_center.rotation.x = Math.PI / 2;
  bottom_subdial_center.position.z = 0.012;
  bottom_subdial.add(bottom_subdial_center);

  const bottom_subdial_pinGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.021,
    20
  );
  const bottom_subdial_pin = new THREE.Mesh(
    bottom_subdial_pinGeom,
    dark_metalMat
  );
  bottom_subdial_pin.name = "bottom_subdial_pin";
  bottom_subdial_pin.rotation.x = Math.PI / 2;
  bottom_subdial_pin.position.z = 0.018;
  bottom_subdial.add(bottom_subdial_pin);

  const needleShape = new THREE.Shape();
  needleShape.moveTo(-0.026, -0.085);
  needleShape.lineTo(-0.016, 0.50);
  needleShape.lineTo(-0.006, 0.62);
  needleShape.lineTo(0.0, 0.66);
  needleShape.lineTo(0.010, 0.61);
  needleShape.lineTo(0.025, 0.08);
  needleShape.lineTo(0.026, -0.085);
  needleShape.closePath();

  const needleGeom = new THREE.ExtrudeGeometry(needleShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.0015,
    bevelSegments: 2,
  });
  const needle = new THREE.Mesh(needleGeom, needleMat);
  needle.name = "needle";
  needle.position.z = 0.096;
  needle.rotation.z = -0.72;
  root.add(needle);

  const central_hub_backGeom = new THREE.CylinderGeometry(
    0.091,
    0.091,
    0.018,
    40
  );
  const central_hub_back = new THREE.Mesh(
    central_hub_backGeom,
    dark_metalMat
  );
  central_hub_back.name = "central_hub_back";
  central_hub_back.rotation.x = Math.PI / 2;
  central_hub_back.position.z = 0.108;
  root.add(central_hub_back);

  const central_hubGeom = new THREE.CylinderGeometry(
    0.073,
    0.073,
    0.025,
    40
  );
  const central_hub = new THREE.Mesh(central_hubGeom, hubMat);
  central_hub.name = "central_hub";
  central_hub.rotation.x = Math.PI / 2;
  central_hub.position.z = 0.121;
  root.add(central_hub);

  const central_hub_rimGeom = new THREE.TorusGeometry(
    0.073,
    0.008,
    8,
    40
  );
  const central_hub_rim = new THREE.Mesh(central_hub_rimGeom, hubMat);
  central_hub_rim.name = "central_hub_rim";
  central_hub_rim.position.z = 0.135;
  root.add(central_hub_rim);

  const central_hub_pinGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.029,
    20
  );
  const central_hub_pin = new THREE.Mesh(
    central_hub_pinGeom,
    brushed_metalMat
  );
  central_hub_pin.name = "central_hub_pin";
  central_hub_pin.rotation.x = Math.PI / 2;
  central_hub_pin.position.z = 0.135;
  root.add(central_hub_pin);

  const rim_chipsGeom = new THREE.CircleGeometry(1, 10);
  const rim_chips = new THREE.InstancedMesh(rim_chipsGeom, rustMat, 14);
  rim_chips.name = "rim_chips";
  const chip_dummy = new THREE.Object3D();

  for (let i = 0; i < 14; i++) {
    const angle = i * 2.17 + 0.23;
    const chip_size = 0.004 + 0.006 * (((i * 3) % 7) / 6);
    chip_dummy.position.set(
      Math.sin(angle) * 0.88,
      Math.cos(angle) * 0.88,
      0.181
    );
    chip_dummy.rotation.set(0, 0, angle * 0.7);
    chip_dummy.scale.set(
      chip_size,
      chip_size * (0.55 + 0.35 * (i % 3)),
      1
    );
    chip_dummy.updateMatrix();
    rim_chips.setMatrixAt(i, chip_dummy.matrix);
  }
  rim_chips.instanceMatrix.needsUpdate = true;
  root.add(rim_chips);

  const glass_coverGeom = new THREE.CylinderGeometry(0.724, 0.724, 0.004, 64);
  const glass_cover = new THREE.Mesh(glass_coverGeom, glassMat);
  glass_cover.name = "glass_cover";
  glass_cover.rotation.x = Math.PI / 2;
  glass_cover.position.z = 0.142;
  glass_cover.renderOrder = 4;
  root.add(glass_cover);

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