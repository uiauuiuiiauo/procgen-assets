export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyW = 0.72;
  const bodyH = 1.00;
  const bodyD = 0.14;
  const wheelX = 0;
  const wheelY = -0.15;

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff2018,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rear_shellMat = new THREE.MeshStandardMaterial({
    color: 0xff493f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const bezelMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.3,
  });
  const lcdMat = new THREE.MeshStandardMaterial({
    color: 0x9da7a0,
    metalness: 0.0,
    roughness: 0.7,
  });
  const digitMat = new THREE.MeshStandardMaterial({
    color: 0x273039,
    metalness: 0.0,
    roughness: 0.8,
  });
  const clearMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf4ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const frostedMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8f2,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const wheel_darkMat = new THREE.MeshStandardMaterial({
    color: 0x11151b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const wheel_redMat = new THREE.MeshStandardMaterial({
    color: 0xd8171c,
    metalness: 0.0,
    roughness: 0.3,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    const r = Math.min(radius, hw, hh);

    shape.moveTo(-hw + r, -hh);
    shape.lineTo(hw - r, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
    shape.lineTo(hw, hh - r);
    shape.quadraticCurveTo(hw, hh, hw - r, hh);
    shape.lineTo(-hw + r, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
    shape.lineTo(-hw, -hh + r);
    shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 16,
        bevelEnabled: bevel > 0,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 4,
      }
    );
  }

  const rear_shellGeom = roundedExtrudeGeometry(
    bodyW * 0.99,
    bodyH * 0.99,
    0.115,
    0.075,
    0.018
  );
  const rear_shell = new THREE.Mesh(rear_shellGeom, rear_shellMat);
  rear_shell.position.z = -0.13;
  root.add(rear_shell);

  const bodyGeom = roundedExtrudeGeometry(
    bodyW,
    bodyH,
    0.12,
    bodyD,
    0.025
  );
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.position.z = -bodyD / 2;
  root.add(body);

  const screen_bezelGeom = roundedExtrudeGeometry(
    0.54,
    0.25,
    0.038,
    0.012,
    0.006
  );
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, bezelMat);
  screen_bezel.position.set(0, 0.27, 0.096);
  root.add(screen_bezel);

  const lcd_panelGeom = roundedExtrudeGeometry(
    0.455,
    0.17,
    0.012,
    0.004,
    0.002
  );
  const lcd_panel = new THREE.Mesh(lcd_panelGeom, lcdMat);
  lcd_panel.position.set(0, 0.27, 0.111);
  root.add(lcd_panel);

  const digit_segmentGeom = new THREE.BoxGeometry(1, 1, 1);
  const digitMatrices = [];
  const identityQuaternion = new THREE.Quaternion();
  const digitPatterns = {
    0: [0, 1, 2, 3, 4, 5],
    1: [1, 2],
    2: [0, 1, 6, 4, 3],
    3: [0, 1, 2, 3, 6],
    4: [5, 6, 1, 2],
    5: [0, 5, 6, 2, 3],
    6: [0, 5, 6, 4, 2, 3],
    7: [0, 1, 2],
    8: [0, 1, 2, 3, 4, 5, 6],
    9: [0, 1, 2, 3, 5, 6],
  };

  function addDigit(value, centerX, centerY, width, height, thickness) {
    const segments = [
      [0, height / 2, width, thickness],
      [width / 2, height / 4, thickness, height / 2],
      [width / 2, -height / 4, thickness, height / 2],
      [0, -height / 2, width, thickness],
      [-width / 2, -height / 4, thickness, height / 2],
      [-width / 2, height / 4, thickness, height / 2],
      [0, 0, width, thickness],
    ];
    const active = digitPatterns[value];
    for (const segmentIndex of active) {
      const segment = segments[segmentIndex];
      const matrix = new THREE.Matrix4();
      matrix.compose(
        new THREE.Vector3(
          centerX + segment[0],
          centerY + segment[1],
          0.122
        ),
        identityQuaternion,
        new THREE.Vector3(segment[2], segment[3], 0.003)
      );
      digitMatrices.push(matrix);
    }
  }

  addDigit(8, -0.13, 0.25, 0.072, 0.118, 0.012);
  addDigit(0, -0.015, 0.25, 0.072, 0.118, 0.012);
  addDigit(4, 0.17, 0.25, 0.055, 0.105, 0.010);

  const display_digits = new THREE.InstancedMesh(
    digit_segmentGeom,
    digitMat,
    digitMatrices.length
  );
  for (let i = 0; i < digitMatrices.length; i++) {
    display_digits.setMatrixAt(i, digitMatrices[i]);
  }
  display_digits.instanceMatrix.needsUpdate = true;
  root.add(display_digits);

  const statusMatrices = [];
  function addStatusBar(x, y, width, height) {
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(x, y, 0.122),
      identityQuaternion,
      new THREE.Vector3(width, height, 0.0025)
    );
    statusMatrices.push(matrix);
  }

  addStatusBar(-0.020, 0.342, 0.005, 0.026);
  addStatusBar(-0.007, 0.353, 0.024, 0.005);
  addStatusBar(-0.007, 0.331, 0.024, 0.005);
  addStatusBar(0.008, 0.342, 0.005, 0.026);
  addStatusBar(0.030, 0.342, 0.005, 0.028);
  addStatusBar(0.043, 0.342, 0.005, 0.028);
  addStatusBar(0.036, 0.342, 0.026, 0.005);
  addStatusBar(0.066, 0.342, 0.005, 0.028);
  addStatusBar(0.086, 0.342, 0.005, 0.028);
  addStatusBar(0.076, 0.342, 0.027, 0.005);
  addStatusBar(0.076, 0.331, 0.022, 0.005);

  const status_marks = new THREE.InstancedMesh(
    digit_segmentGeom,
    digitMat,
    statusMatrices.length
  );
  for (let i = 0; i < statusMatrices.length; i++) {
    status_marks.setMatrixAt(i, statusMatrices[i]);
  }
  status_marks.instanceMatrix.needsUpdate = true;
  root.add(status_marks);

  const wheel_wellGeom = new THREE.CylinderGeometry(
    0.235,
    0.235,
    0.014,
    64
  );
  const wheel_well = new THREE.Mesh(wheel_wellGeom, wheel_darkMat);
  wheel_well.rotation.x = Math.PI / 2;
  wheel_well.position.set(wheelX, wheelY, 0.101);
  root.add(wheel_well);

  const wheel_red_insertGeom = new THREE.RingGeometry(
    0.176,
    0.222,
    64
  );
  const wheel_red_insert = new THREE.Mesh(
    wheel_red_insertGeom,
    wheel_redMat
  );
  wheel_red_insert.position.set(wheelX, wheelY, 0.109);
  root.add(wheel_red_insert);

  const wheel_centerGeom = new THREE.CircleGeometry(0.174, 64);
  const wheel_center = new THREE.Mesh(wheel_centerGeom, wheel_darkMat);
  wheel_center.position.set(wheelX, wheelY, 0.111);
  root.add(wheel_center);

  const wheel_outer_rimGeom = new THREE.TorusGeometry(
    0.247,
    0.019,
    14,
    72
  );
  const wheel_outer_rim = new THREE.Mesh(wheel_outer_rimGeom, bodyMat);
  wheel_outer_rim.position.set(wheelX, wheelY, 0.111);
  root.add(wheel_outer_rim);

  const wheel_clear_ringGeom = new THREE.TorusGeometry(
    0.224,
    0.014,
    12,
    72
  );
  const wheel_clear_ring = new THREE.Mesh(
    wheel_clear_ringGeom,
    clearMat
  );
  wheel_clear_ring.position.set(wheelX, wheelY, 0.119);
  root.add(wheel_clear_ring);

  const wheel_inner_ringGeom = new THREE.TorusGeometry(
    0.184,
    0.008,
    10,
    64
  );
  const wheel_inner_ring = new THREE.Mesh(
    wheel_inner_ringGeom,
    clearMat
  );
  wheel_inner_ring.position.set(wheelX, wheelY, 0.121);
  root.add(wheel_inner_ring);

  const wheel_inner_trimGeom = new THREE.TorusGeometry(
    0.184,
    0.0035,
    8,
    64
  );
  const wheel_inner_trim = new THREE.Mesh(
    wheel_inner_trimGeom,
    silverMat
  );
  wheel_inner_trim.position.set(wheelX, wheelY, 0.124);
  root.add(wheel_inner_trim);

  const wheel_tickGeom = new THREE.BoxGeometry(0.012, 0.043, 0.008);
  const wheel_ticks = new THREE.InstancedMesh(
    wheel_tickGeom,
    frostedMat,
    3
  );
  const tickAngles = [
    Math.PI / 2,
    0.15,
    Math.PI * 1.5,
  ];
  for (let i = 0; i < tickAngles.length; i++) {
    const angle = tickAngles[i];
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, angle - Math.PI / 2)
    );
    const matrix = new THREE.Matrix4();
    matrix.compose(
      new THREE.Vector3(
        wheelX + Math.cos(angle) * 0.211,
        wheelY + Math.sin(angle) * 0.211,
        0.128
      ),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    wheel_ticks.setMatrixAt(i, matrix);
  }
  wheel_ticks.instanceMatrix.needsUpdate = true;
  root.add(wheel_ticks);

  const wheel_coverGeom = new THREE.SphereGeometry(0.205, 48, 24);
  const wheel_cover = new THREE.Mesh(wheel_coverGeom, clearMat);
  wheel_cover.scale.set(1, 1, 0.075);
  wheel_cover.position.set(wheelX, wheelY, 0.116);
  root.add(wheel_cover);

  const side_button_upperGeom = new THREE.CapsuleGeometry(
    0.018,
    0.055,
    6,
    14
  );
  const side_button_upper = new THREE.Mesh(
    side_button_upperGeom,
    bodyMat
  );
  side_button_upper.scale.set(0.72, 1, 0.8);
  side_button_upper.position.set(0.397, 0.08, 0.005);
  root.add(side_button_upper);

  const side_button_upper_capGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.008,
    18
  );
  const side_button_upper_cap = new THREE.Mesh(
    side_button_upper_capGeom,
    silverMat
  );
  side_button_upper_cap.rotation.z = Math.PI / 2;
  side_button_upper_cap.position.set(0.412, 0.08, 0.005);
  root.add(side_button_upper_cap);

  const side_button_lowerGeom = new THREE.CapsuleGeometry(
    0.014,
    0.032,
    5,
    12
  );
  const side_button_lower = new THREE.Mesh(
    side_button_lowerGeom,
    bodyMat
  );
  side_button_lower.scale.set(0.72, 1, 0.8);
  side_button_lower.position.set(0.399, -0.005, 0.004);
  root.add(side_button_lower);

  const side_button_lower_capGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.007,
    16
  );
  const side_button_lower_cap = new THREE.Mesh(
    side_button_lower_capGeom,
    silverMat
  );
  side_button_lower_cap.rotation.z = Math.PI / 2;
  side_button_lower_cap.position.set(0.411, -0.005, 0.004);
  root.add(side_button_lower_cap);

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