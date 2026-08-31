export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 1.0;
  const bodyL = 1.65;
  const bodyH = 0.24;

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.3,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lcdMat = new THREE.MeshStandardMaterial({
    color: 0x71806e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const digitMat = new THREE.MeshStandardMaterial({
    color: 0x111815,
    metalness: 0.0,
    roughness: 0.8,
  });
  const printMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8e8,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectShape(w, h, r) {
    const x = -w / 2;
    const y = -h / 2;
    const radius = Math.min(r, w / 2, h / 2);
    const shape = new THREE.Shape();
    shape.moveTo(x + radius, y);
    shape.lineTo(x + w - radius, y);
    shape.quadraticCurveTo(x + w, y, x + w, y + radius);
    shape.lineTo(x + w, y + h - radius);
    shape.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    shape.lineTo(x + radius, y + h);
    shape.quadraticCurveTo(x, y + h, x, y + h - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(w, h, r, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(roundedRectShape(w, h, r), {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevelSize > 0,
      bevelSize,
      bevelThickness,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const outer_shellGeom = roundedExtrudeGeometry(
    bodyW,
    bodyL,
    0.25,
    bodyH,
    0.045,
    0.045
  );
  const outer_shell = new THREE.Mesh(outer_shellGeom, silverMat);
  outer_shell.rotation.x = Math.PI / 2;
  root.add(outer_shell);

  const top_panelGeom = roundedExtrudeGeometry(
    0.88,
    1.46,
    0.21,
    0.03,
    0.018,
    0.018
  );
  const top_panel = new THREE.Mesh(top_panelGeom, blackMat);
  top_panel.rotation.x = Math.PI / 2;
  top_panel.position.y = 0.15;
  root.add(top_panel);

  const screen_bezelGeom = roundedExtrudeGeometry(
    0.78,
    0.78,
    0.045,
    0.014,
    0.006,
    0.006
  );
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, darkMat);
  screen_bezel.rotation.x = Math.PI / 2;
  screen_bezel.position.set(0, 0.176, 0.055);
  root.add(screen_bezel);

  const lcd_screenGeom = roundedExtrudeGeometry(
    0.68,
    0.66,
    0.025,
    0.008,
    0.003,
    0.003
  );
  const lcd_screen = new THREE.Mesh(lcd_screenGeom, lcdMat);
  lcd_screen.rotation.x = Math.PI / 2;
  lcd_screen.position.set(0, 0.19, 0.055);
  root.add(lcd_screen);

  const digit_segmentGeom = new THREE.BoxGeometry(0.15, 0.009, 0.035);
  const digitSegments = [
    ["a", 0, -0.19, 0],
    ["b", 0.08, -0.095, Math.PI / 2],
    ["c", 0.08, 0.095, Math.PI / 2],
    ["d", 0, 0.19, 0],
    ["e", -0.08, 0.095, Math.PI / 2],
    ["f", -0.08, -0.095, Math.PI / 2],
    ["g", 0, 0, 0],
  ];
  const activeDigits = [
    ["b", "c"],
    ["a", "b", "c", "d", "e", "f"],
  ];
  const digitCenters = [-0.15, 0.15];
  const digit_instances = new THREE.InstancedMesh(
    digit_segmentGeom,
    digitMat,
    8
  );
  const digit_dummy = new THREE.Object3D();
  let digitIndex = 0;
  for (let di = 0; di < activeDigits.length; di++) {
    for (let si = 0; si < digitSegments.length; si++) {
      const segment = digitSegments[si];
      if (activeDigits[di].indexOf(segment[0]) === -1) continue;
      digit_dummy.position.set(
        digitCenters[di] + segment[1],
        0.201,
        0.055 + segment[2]
      );
      digit_dummy.rotation.set(0, segment[3], 0);
      digit_dummy.scale.set(1, 1, 1);
      digit_dummy.updateMatrix();
      digit_instances.setMatrixAt(digitIndex++, digit_dummy.matrix);
    }
  }
  digit_instances.instanceMatrix.needsUpdate = true;
  root.add(digit_instances);

  const lcd_decimalGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.009, 14);
  const lcd_decimal = new THREE.Mesh(lcd_decimalGeom, digitMat);
  lcd_decimal.position.set(0.29, 0.202, 0.225);
  root.add(lcd_decimal);

  const power_buttonGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.018, 28);
  const power_button = new THREE.Mesh(power_buttonGeom, darkMat);
  power_button.position.set(-0.2, 0.184, -0.52);
  root.add(power_button);

  const power_button_rimGeom = new THREE.TorusGeometry(0.095, 0.009, 8, 28);
  const power_button_rim = new THREE.Mesh(power_button_rimGeom, blackMat);
  power_button_rim.rotation.x = Math.PI / 2;
  power_button_rim.position.set(-0.2, 0.195, -0.52);
  root.add(power_button_rim);

  const label_barGeom = new THREE.BoxGeometry(1, 0.006, 0.014);
  const labelData = [
    [-0.26, 0.49, 0.055, 0],
    [-0.20, 0.49, 0.055, 0],
    [-0.14, 0.49, 0.055, 0],
    [-0.08, 0.49, 0.055, 0],
    [-0.235, 0.535, 0.08, Math.PI / 2],
    [-0.165, 0.535, 0.08, Math.PI / 2],
    [-0.095, 0.535, 0.08, Math.PI / 2],
    [0.19, 0.52, 0.12, 0],
    [0.27, 0.52, 0.07, 0],
    [0.23, 0.56, 0.065, Math.PI / 2],
    [0.31, 0.56, 0.065, Math.PI / 2],
    [-0.035, -0.51, 0.075, -0.2],
    [0.035, -0.51, 0.075, 0.2],
    [0.105, -0.51, 0.075, -0.2],
  ];
  const brand_label = new THREE.InstancedMesh(
    label_barGeom,
    printMat,
    labelData.length
  );
  const label_dummy = new THREE.Object3D();
  for (let i = 0; i < labelData.length; i++) {
    const item = labelData[i];
    label_dummy.position.set(item[0], 0.184, item[1]);
    label_dummy.rotation.set(0, item[3], 0);
    label_dummy.scale.set(item[2], 1, 1);
    label_dummy.updateMatrix();
    brand_label.setMatrixAt(i, label_dummy.matrix);
  }
  brand_label.instanceMatrix.needsUpdate = true;
  root.add(brand_label);

  const speaker_slotGeom = roundedExtrudeGeometry(
    0.18,
    0.035,
    0.017,
    0.008,
    0.002,
    0.002
  );
  const speaker_slot = new THREE.Mesh(speaker_slotGeom, darkMat);
  speaker_slot.rotation.x = Math.PI / 2;
  speaker_slot.position.set(0.25, 0.181, 0.64);
  root.add(speaker_slot);

  const side_buttonGeom = roundedExtrudeGeometry(
    0.16,
    0.34,
    0.075,
    0.018,
    0.004,
    0.004
  );
  const side_button = new THREE.Mesh(side_buttonGeom, blackMat);
  side_button.rotation.y = Math.PI / 2;
  side_button.position.set(0.535, -0.015, 0.15);
  root.add(side_button);

  const front_portGeom = roundedExtrudeGeometry(
    0.28,
    0.07,
    0.03,
    0.014,
    0.003,
    0.003
  );
  const front_port = new THREE.Mesh(front_portGeom, darkMat);
  front_port.position.set(0, -0.035, 0.86);
  root.add(front_port);

  const connector_baseGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.14, 24);
  const connector_base = new THREE.Mesh(connector_baseGeom, chromeMat);
  connector_base.rotation.x = Math.PI / 2;
  connector_base.position.set(0, 0.015, -0.88);
  root.add(connector_base);

  const knurled_collarGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.16, 28);
  const knurled_collar = new THREE.Mesh(knurled_collarGeom, silverMat);
  knurled_collar.rotation.x = Math.PI / 2;
  knurled_collar.position.set(0, 0.015, -0.99);
  root.add(knurled_collar);

  const knurled_ridgeGeom = new THREE.BoxGeometry(0.018, 0.018, 0.145);
  const knurled_ridges = new THREE.InstancedMesh(
    knurled_ridgeGeom,
    chromeMat,
    18
  );
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2;
    ridge_dummy.position.set(
      Math.cos(angle) * 0.102,
      0.015 + Math.sin(angle) * 0.102,
      -0.99
    );
    ridge_dummy.rotation.set(0, 0, angle);
    ridge_dummy.scale.set(1, 1, 1);
    ridge_dummy.updateMatrix();
    knurled_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  knurled_ridges.instanceMatrix.needsUpdate = true;
  root.add(knurled_ridges);

  const connector_stemGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.12, 20);
  const connector_stem = new THREE.Mesh(connector_stemGeom, chromeMat);
  connector_stem.rotation.x = Math.PI / 2;
  connector_stem.position.set(0, 0.015, -1.105);
  root.add(connector_stem);

  const key_ringGeom = new THREE.TorusGeometry(0.23, 0.035, 12, 48);
  const key_ring = new THREE.Mesh(key_ringGeom, chromeMat);
  key_ring.rotation.x = Math.PI / 2;
  key_ring.position.set(0.055, 0.04, -1.285);
  root.add(key_ring);

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