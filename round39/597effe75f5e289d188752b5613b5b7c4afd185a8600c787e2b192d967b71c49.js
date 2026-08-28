export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "lectric_device";

  const device = new THREE.Group();
  device.name = "device";
  device.rotation.z = -0.105;
  root.add(device);

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x292c2d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const front_panelMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const top_capMat = new THREE.MeshStandardMaterial({
    color: 0x202324,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bottom_capMat = new THREE.MeshStandardMaterial({
    color: 0x151718,
    metalness: 0.0,
    roughness: 0.8,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x070808,
    metalness: 0.0,
    roughness: 0.8,
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x292b2c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const button_rimMat = new THREE.MeshStandardMaterial({
    color: 0x050606,
    metalness: 0.0,
    roughness: 0.8,
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0xd8dadd,
    metalness: 0.0,
    roughness: 0.7,
  });

  function createBodyShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.22, -0.72);
    shape.bezierCurveTo(-0.29, -0.70, -0.33, -0.64, -0.33, -0.55);
    shape.lineTo(-0.33, 0.45);
    shape.bezierCurveTo(-0.33, 0.57, -0.25, 0.67, -0.14, 0.72);
    shape.bezierCurveTo(0.02, 0.79, 0.22, 0.74, 0.29, 0.63);
    shape.bezierCurveTo(0.34, 0.54, 0.33, 0.39, 0.33, 0.23);
    shape.lineTo(0.33, -0.55);
    shape.bezierCurveTo(0.33, -0.65, 0.25, -0.71, 0.14, -0.73);
    shape.bezierCurveTo(0.02, -0.76, -0.12, -0.75, -0.22, -0.72);
    shape.closePath();
    return shape;
  }

  function createFrontPanelShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.20, -0.64);
    shape.bezierCurveTo(-0.26, -0.63, -0.29, -0.58, -0.29, -0.50);
    shape.lineTo(-0.29, 0.46);
    shape.bezierCurveTo(-0.29, 0.52, -0.27, 0.56, -0.23, 0.58);
    shape.bezierCurveTo(-0.08, 0.63, 0.14, 0.56, 0.27, 0.44);
    shape.bezierCurveTo(0.30, 0.41, 0.29, 0.31, 0.29, 0.20);
    shape.lineTo(0.29, -0.50);
    shape.bezierCurveTo(0.29, -0.59, 0.22, -0.64, 0.12, -0.66);
    shape.bezierCurveTo(0.00, -0.68, -0.12, -0.67, -0.20, -0.64);
    shape.closePath();
    return shape;
  }

  function createTopCapShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.29, 0.575);
    shape.bezierCurveTo(-0.18, 0.61, 0.15, 0.54, 0.295, 0.425);
    shape.lineTo(0.295, 0.55);
    shape.bezierCurveTo(0.27, 0.66, 0.18, 0.72, 0.05, 0.75);
    shape.bezierCurveTo(-0.10, 0.77, -0.24, 0.69, -0.29, 0.575);
    shape.closePath();
    return shape;
  }

  function createBottomCapShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.29, -0.58);
    shape.bezierCurveTo(-0.28, -0.66, -0.20, -0.71, -0.10, -0.73);
    shape.bezierCurveTo(0.04, -0.76, 0.20, -0.71, 0.29, -0.60);
    shape.lineTo(0.29, -0.54);
    shape.bezierCurveTo(0.20, -0.63, -0.11, -0.67, -0.29, -0.58);
    shape.closePath();
    return shape;
  }

  function createFrontTrimShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.292, 0.568);
    shape.bezierCurveTo(-0.17, 0.605, 0.16, 0.535, 0.292, 0.420);
    shape.lineTo(0.292, 0.400);
    shape.bezierCurveTo(0.15, 0.505, -0.17, 0.575, -0.292, 0.548);
    shape.closePath();

    const hole = new THREE.Path();
    hole.moveTo(-0.282, 0.558);
    hole.bezierCurveTo(-0.15, 0.590, 0.145, 0.525, 0.282, 0.418);
    hole.lineTo(0.282, 0.410);
    hole.bezierCurveTo(0.14, 0.510, -0.15, 0.570, -0.282, 0.550);
    hole.closePath();
    shape.holes.push(hole);
    return shape;
  }

  function createBottomTrimShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.292, -0.575);
    shape.bezierCurveTo(-0.27, -0.65, -0.19, -0.70, -0.09, -0.72);
    shape.bezierCurveTo(0.05, -0.75, 0.21, -0.70, 0.292, -0.60);
    shape.lineTo(0.292, -0.590);
    shape.bezierCurveTo(0.20, -0.67, 0.04, -0.71, -0.08, -0.70);
    shape.bezierCurveTo(-0.18, -0.68, -0.26, -0.63, -0.292, -0.565);
    shape.closePath();
    return shape;
  }

  function createRoundedRectShape(width, height, radius) {
    const x = width * 0.5;
    const y = height * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.closePath();
    return shape;
  }

  function createLayeredPart(geometry, material, depth, surfaceZ, offset) {
    const part = new THREE.Mesh(geometry, material);
    part.position.z = surfaceZ - depth - offset;
    return part;
  }

  const bodyShape = createBodyShape();
  const main_bodyGeom = new THREE.ExtrudeGeometry(bodyShape, {
    depth: 0.24,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.018,
    bevelSegments: 4,
    curveSegments: 16,
  });
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.name = "main_body";
  main_body.position.z = -0.12;
  device.add(main_body);

  const front_panelGeom = new THREE.ExtrudeGeometry(createFrontPanelShape(), {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const front_panel = createLayeredPart(front_panelGeom, front_panelMat, 0.008, 0.15, 0.004);
  front_panel.name = "front_panel";
  device.add(front_panel);

  const top_capGeom = new THREE.ExtrudeGeometry(createTopCapShape(), {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.007,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const top_cap = createLayeredPart(top_capGeom, top_capMat, 0.008, 0.15, 0.004);
  top_cap.name = "top_cap";
  device.add(top_cap);

  const bottom_capGeom = new THREE.ExtrudeGeometry(createBottomCapShape(), {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.007,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const bottom_cap = createLayeredPart(bottom_capGeom, bottom_capMat, 0.008, 0.15, 0.004);
  bottom_cap.name = "bottom_cap";
  device.add(bottom_cap);

  const front_trimGeom = new THREE.ExtrudeGeometry(createFrontTrimShape(), {
    depth: 0.004,
    steps: 1,
    bevelEnabled: false,
    curveSegments: 16,
  });
  const front_trim = createLayeredPart(front_trimGeom, trimMat, 0.004, 0.163, 0.001);
  front_trim.name = "front_trim";
  device.add(front_trim);

  const bottom_trimGeom = new THREE.ExtrudeGeometry(createBottomTrimShape(), {
    depth: 0.004,
    steps: 1,
    bevelEnabled: false,
    curveSegments: 16,
  });
  const bottom_trim = createLayeredPart(bottom_trimGeom, trimMat, 0.004, 0.163, 0.001);
  bottom_trim.name = "bottom_trim";
  device.add(bottom_trim);

  const right_side_trimPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.292, 0.425, 0.159),
    new THREE.Vector3(0.307, 0.50, 0.135),
    new THREE.Vector3(0.319, 0.57, 0.065),
    new THREE.Vector3(0.322, 0.43, -0.025),
    new THREE.Vector3(0.322, -0.48, -0.020),
    new THREE.Vector3(0.307, -0.59, 0.105),
    new THREE.Vector3(0.292, -0.60, 0.159),
  ], false, "centripetal");
  const right_side_trimGeom = new THREE.TubeGeometry(
    right_side_trimPath,
    48,
    0.007,
    8,
    false
  );
  const right_side_trim = new THREE.Mesh(right_side_trimGeom, trimMat);
  right_side_trim.name = "right_side_trim";
  device.add(right_side_trim);

  const left_side_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.292, 0.555, 0.157),
    new THREE.Vector3(-0.307, 0.49, 0.130),
    new THREE.Vector3(-0.321, 0.35, 0.045),
    new THREE.Vector3(-0.322, -0.49, 0.035),
    new THREE.Vector3(-0.302, -0.61, 0.135),
    new THREE.Vector3(-0.292, -0.575, 0.157),
  ], false, "centripetal");
  const left_side_seamGeom = new THREE.TubeGeometry(
    left_side_seamPath,
    40,
    0.0035,
    7,
    false
  );
  const left_side_seam = new THREE.Mesh(left_side_seamGeom, seamMat);
  left_side_seam.name = "left_side_seam";
  device.add(left_side_seam);

  const right_side_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.292, 0.410, 0.157),
    new THREE.Vector3(0.307, 0.48, 0.125),
    new THREE.Vector3(0.321, 0.39, 0.025),
    new THREE.Vector3(0.321, -0.48, 0.020),
    new THREE.Vector3(0.302, -0.58, 0.125),
    new THREE.Vector3(0.292, -0.590, 0.157),
  ], false, "centripetal");
  const right_side_seamGeom = new THREE.TubeGeometry(
    right_side_seamPath,
    40,
    0.0035,
    7,
    false
  );
  const right_side_seam = new THREE.Mesh(right_side_seamGeom, seamMat);
  right_side_seam.name = "right_side_seam";
  device.add(right_side_seam);

  const top_cap_seamPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.286, 0.566, 0.158),
    new THREE.Vector3(-0.14, 0.594, 0.159),
    new THREE.Vector3(0.08, 0.553, 0.159),
    new THREE.Vector3(0.286, 0.424, 0.158),
  ], false, "centripetal");
  const top_cap_seamGeom = new THREE.TubeGeometry(
    top_cap_seamPath,
    28,
    0.003,
    7,
    false
  );
  const top_cap_seam = new THREE.Mesh(top_cap_seamGeom, seamMat);
  top_cap_seam.name = "top_cap_seam";
  device.add(top_cap_seam);

  const button_wellGeom = new THREE.ShapeGeometry(
    createRoundedRectShape(0.145, 0.070, 0.034),
    16
  );
  const button_well = new THREE.Mesh(button_wellGeom, button_rimMat);
  button_well.name = "button_well";
  button_well.position.set(-0.055, 0.652, 0.164);
  button_well.rotation.z = -0.055;
  device.add(button_well);

  const top_buttonGeom = new THREE.ShapeGeometry(
    createRoundedRectShape(0.108, 0.044, 0.022),
    16
  );
  const top_button = new THREE.Mesh(top_buttonGeom, buttonMat);
  top_button.name = "top_button";
  top_button.position.set(-0.055, 0.653, 0.166);
  top_button.rotation.z = -0.055;
  device.add(top_button);

  const glyphs = {
    A: [
      [0, 0, 0.5, 1], [0.5, 1, 1, 0], [0.22, 0.43, 0.78, 0.43],
    ],
    C: [
      [1, 1, 0, 1], [0, 1, 0, 0], [0, 0, 1, 0],
    ],
    E: [
      [0, 0, 0, 1], [0, 1, 1, 1], [0, 0.5, 0.78, 0.5], [0, 0, 1, 0],
    ],
    I: [
      [0, 1, 1, 1], [0.5, 1, 0.5, 0], [0, 0, 1, 0],
    ],
    L: [
      [0, 1, 0, 0], [0, 0, 1, 0],
    ],
    R: [
      [0, 0, 0, 1], [0, 1, 0.78, 1], [0.78, 1, 0.78, 0.52],
      [0.78, 0.52, 0, 0.52], [0.45, 0.52, 1, 0],
    ],
    T: [
      [0, 1, 1, 1], [0.5, 1, 0.5, 0],
    ],
    V: [
      [0, 1, 0.5, 0], [0.5, 0, 1, 1],
    ],
  };

  function buildStrokeWord(word, height, thickness) {
    const charWidth = height * 0.62;
    const gap = height * 0.18;
    const totalWidth = word.length * charWidth + (word.length - 1) * gap;
    const strokes = [];

    for (let i = 0; i < word.length; i++) {
      const segments = glyphs[word[i]] || [];
      const offsetX = -totalWidth * 0.5 + i * (charWidth + gap);
      for (const segment of segments) {
        strokes.push([
          offsetX + segment[0] * charWidth,
          (segment[1] - 0.5) * height,
          offsetX + segment[2] * charWidth,
          (segment[3] - 0.5) * height,
        ]);
      }
    }
    return { strokes, height, thickness };
  }

  function createStrokeMesh(data, material) {
    const strokeGeom = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.InstancedMesh(strokeGeom, material, data.strokes.length);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const euler = new THREE.Euler();

    for (let i = 0; i < data.strokes.length; i++) {
      const stroke = data.strokes[i];
      const dx = stroke[2] - stroke[0];
      const dy = stroke[3] - stroke[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      position.set(
        (stroke[0] + stroke[2]) * 0.5,
        (stroke[1] + stroke[3]) * 0.5,
        0
      );
      euler.set(0, 0, Math.atan2(dy, dx));
      quaternion.setFromEuler(euler);
      scale.set(length, data.thickness, 0.003);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const logo_textData = buildStrokeWord("LECTRIC", 0.043, 0.0055);
  const logo_text = createStrokeMesh(logo_textData, logoMat);
  logo_text.name = "logo_text";
  logo_text.position.set(-0.105, 0.445, 0.164);
  logo_text.rotation.z = -0.025;
  device.add(logo_text);

  const model_textData = buildStrokeWord("VERVA", 0.029, 0.0038);
  const model_text = createStrokeMesh(model_textData, logoMat);
  model_text.name = "model_text";
  model_text.position.set(-0.105, -0.555, 0.164);
  model_text.rotation.z = -0.025;
  device.add(model_text);

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