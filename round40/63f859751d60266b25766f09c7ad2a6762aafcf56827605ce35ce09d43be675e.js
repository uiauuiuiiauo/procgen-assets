export default function generate(THREE) {
  const root = new THREE.Group();
  const bottle_group = new THREE.Group();
  const label_group = new THREE.Group();
  const cap_group = new THREE.Group();
  root.add(bottle_group, label_group, cap_group);

  const bottle_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc91419,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cap_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const cap_knurl_groovesMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const label_baseMat = new THREE.MeshStandardMaterial({
    color: 0xf5a12f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const label_upper_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf28a24,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_golden_bandMat = new THREE.MeshStandardMaterial({
    color: 0xf4b632,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_red_swooshMat = new THREE.MeshStandardMaterial({
    color: 0xd92d28,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_bottom_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xef7434,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_yellow_stripeMat = new THREE.MeshStandardMaterial({
    color: 0xf5b92f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const fruit_punch_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x302a27,
    metalness: 0.0,
    roughness: 0.7,
  });
  const fruit_punch_fillMat = new THREE.MeshStandardMaterial({
    color: 0xf4f1e9,
    metalness: 0.0,
    roughness: 0.7,
  });
  const side_printMat = new THREE.MeshStandardMaterial({
    color: 0xf7f3e9,
    metalness: 0.0,
    roughness: 0.7,
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.36, 0.00),
    new THREE.Vector2(0.43, 0.02),
    new THREE.Vector2(0.48, 0.06),
    new THREE.Vector2(0.515, 0.15),
    new THREE.Vector2(0.532, 0.27),
    new THREE.Vector2(0.535, 0.40),
    new THREE.Vector2(0.525, 0.48),
    new THREE.Vector2(0.515, 0.55),
    new THREE.Vector2(0.515, 1.55),
    new THREE.Vector2(0.510, 1.64),
    new THREE.Vector2(0.490, 1.73),
    new THREE.Vector2(0.455, 1.82),
    new THREE.Vector2(0.405, 1.90),
    new THREE.Vector2(0.350, 1.96),
    new THREE.Vector2(0.325, 2.02),
    new THREE.Vector2(0.325, 2.11),
    new THREE.Vector2(0.365, 2.13),
    new THREE.Vector2(0.370, 2.17),
    new THREE.Vector2(0.00, 2.17),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_group.add(bottle_body);

  const bottle_lower_ridgeGeom = new THREE.TorusGeometry(0.507, 0.012, 10, 64);
  const bottle_lower_ridge = new THREE.Mesh(bottle_lower_ridgeGeom, bottle_bodyMat);
  bottle_lower_ridge.rotation.x = Math.PI / 2;
  bottle_lower_ridge.position.y = 0.49;
  bottle_group.add(bottle_lower_ridge);

  const bottle_neck_ridgeGeom = new THREE.TorusGeometry(0.342, 0.020, 10, 64);
  const bottle_neck_ridge = new THREE.Mesh(bottle_neck_ridgeGeom, bottle_bodyMat);
  bottle_neck_ridge.rotation.x = Math.PI / 2;
  bottle_neck_ridge.position.y = 2.075;
  bottle_group.add(bottle_neck_ridge);

  const label_baseGeom = new THREE.CylinderGeometry(
    0.522,
    0.522,
    1.10,
    64,
    1,
    true
  );
  const label_base = new THREE.Mesh(label_baseGeom, label_baseMat);
  label_base.position.y = 1.01;
  label_group.add(label_base);

  const label_upper_orangeGeom = new THREE.CylinderGeometry(
    0.524,
    0.524,
    0.24,
    64,
    1,
    true
  );
  const label_upper_orange = new THREE.Mesh(
    label_upper_orangeGeom,
    label_upper_orangeMat
  );
  label_upper_orange.position.y = 1.44;
  label_group.add(label_upper_orange);

  function createCylindricalRibbon(
    radius,
    thetaStart,
    thetaEnd,
    segments,
    centerY,
    slope,
    halfHeight
  ) {
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const theta = thetaStart + (thetaEnd - thetaStart) * t;
      const y = centerY + slope * (theta - thetaEnd);
      const x = Math.sin(theta) * radius;
      const z = Math.cos(theta) * radius;
      positions.push(x, y - halfHeight, z, x, y + halfHeight, z);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 2;
      const c = a + 3;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const label_golden_bandGeom = createCylindricalRibbon(
    0.526,
    -1.18,
    1.18,
    40,
    1.335,
    0.10,
    0.065
  );
  const label_golden_band = new THREE.Mesh(
    label_golden_bandGeom,
    label_golden_bandMat
  );
  label_group.add(label_golden_band);

  const label_red_swooshGeom = createCylindricalRibbon(
    0.527,
    -1.18,
    1.18,
    40,
    0.965,
    0.12,
    0.145
  );
  const label_red_swoosh = new THREE.Mesh(
    label_red_swooshGeom,
    label_red_swooshMat
  );
  label_group.add(label_red_swoosh);

  const label_bottom_orangeGeom = createCylindricalRibbon(
    0.526,
    -1.18,
    1.18,
    40,
    0.565,
    0.08,
    0.075
  );
  const label_bottom_orange = new THREE.Mesh(
    label_bottom_orangeGeom,
    label_bottom_orangeMat
  );
  label_group.add(label_bottom_orange);

  const label_yellow_stripeGeom = createCylindricalRibbon(
    0.528,
    -1.18,
    1.18,
    40,
    0.655,
    0.105,
    0.026
  );
  const label_yellow_stripe = new THREE.Mesh(
    label_yellow_stripeGeom,
    label_yellow_stripeMat
  );
  label_group.add(label_yellow_stripe);

  function createGlyphShape(character) {
    const shape = new THREE.Shape();

    if (character === "F") {
      shape.moveTo(-0.50, -0.50);
      shape.lineTo(-0.18, -0.50);
      shape.lineTo(-0.18, -0.08);
      shape.lineTo(0.30, -0.08);
      shape.lineTo(0.30, 0.17);
      shape.lineTo(-0.18, 0.17);
      shape.lineTo(-0.18, 0.31);
      shape.lineTo(0.50, 0.31);
      shape.lineTo(0.50, 0.58);
      shape.lineTo(-0.50, 0.58);
      shape.closePath();
    } else if (character === "R") {
      shape.moveTo(-0.50, -0.50);
      shape.lineTo(-0.18, -0.50);
      shape.lineTo(-0.18, -0.08);
      shape.lineTo(0.02, -0.08);
      shape.lineTo(0.42, -0.50);
      shape.lineTo(0.76, -0.50);
      shape.lineTo(0.27, 0.02);
      shape.bezierCurveTo(0.52, 0.10, 0.58, 0.27, 0.49, 0.43);
      shape.bezierCurveTo(0.40, 0.56, 0.24, 0.59, 0.02, 0.59);
      shape.lineTo(-0.50, 0.59);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(-0.15, 0.18);
      hole.lineTo(-0.15, 0.40);
      hole.lineTo(0.06, 0.40);
      hole.bezierCurveTo(0.22, 0.40, 0.25, 0.34, 0.20, 0.24);
      hole.lineTo(0.06, 0.18);
      hole.closePath();
      shape.holes.push(hole);
    } else if (character === "U") {
      shape.moveTo(-0.50, 0.58);
      shape.lineTo(-0.18, 0.58);
      shape.lineTo(-0.18, -0.22);
      shape.bezierCurveTo(-0.18, -0.40, -0.10, -0.48, 0.00, -0.48);
      shape.bezierCurveTo(0.10, -0.48, 0.18, -0.40, 0.18, -0.22);
      shape.lineTo(0.18, 0.58);
      shape.lineTo(0.50, 0.58);
      shape.lineTo(0.50, -0.22);
      shape.bezierCurveTo(0.50, -0.48, 0.30, -0.61, 0.00, -0.61);
      shape.bezierCurveTo(-0.30, -0.61, -0.50, -0.48, -0.50, -0.22);
      shape.closePath();
    } else if (character === "I") {
      shape.moveTo(-0.50, 0.30);
      shape.lineTo(-0.22, 0.30);
      shape.lineTo(-0.22, -0.31);
      shape.lineTo(-0.50, -0.31);
      shape.lineTo(-0.50, -0.58);
      shape.lineTo(0.50, -0.58);
      shape.lineTo(0.50, -0.31);
      shape.lineTo(0.22, -0.31);
      shape.lineTo(0.22, 0.30);
      shape.lineTo(0.50, 0.30);
      shape.lineTo(0.50, 0.58);
      shape.lineTo(-0.50, 0.58);
      shape.closePath();
    } else if (character === "T") {
      shape.moveTo(-0.55, 0.30);
      shape.lineTo(-0.55, 0.58);
      shape.lineTo(0.55, 0.58);
      shape.lineTo(0.55, 0.30);
      shape.lineTo(0.18, 0.30);
      shape.lineTo(0.18, -0.58);
      shape.lineTo(-0.18, -0.58);
      shape.lineTo(-0.18, 0.30);
      shape.closePath();
    } else if (character === "P") {
      shape.moveTo(-0.50, -0.50);
      shape.lineTo(-0.18, -0.50);
      shape.lineTo(-0.18, -0.08);
      shape.lineTo(0.03, -0.08);
      shape.bezierCurveTo(0.35, -0.08, 0.52, 0.05, 0.52, 0.27);
      shape.bezierCurveTo(0.52, 0.50, 0.34, 0.59, 0.03, 0.59);
      shape.lineTo(-0.50, 0.59);
      shape.closePath();

      const hole = new THREE.Path();
      hole.moveTo(-0.15, 0.18);
      hole.lineTo(-0.15, 0.40);
      hole.lineTo(0.03, 0.40);
      hole.bezierCurveTo(0.18, 0.40, 0.22, 0.35, 0.22, 0.27);
      hole.bezierCurveTo(0.22, 0.18, 0.17, 0.16, 0.03, 0.16);
      hole.lineTo(-0.15, 0.18);
      shape.holes.push(hole);
    } else if (character === "N") {
      shape.moveTo(-0.50, -0.50);
      shape.lineTo(-0.18, -0.50);
      shape.lineTo(-0.18, 0.12);
      shape.lineTo(0.18, -0.28);
      shape.lineTo(0.18, -0.50);
      shape.lineTo(0.50, -0.50);
      shape.lineTo(0.50, 0.58);
      shape.lineTo(0.18, 0.58);
      shape.lineTo(0.18, 0.08);
      shape.lineTo(-0.18, 0.47);
      shape.lineTo(-0.18, 0.58);
      shape.lineTo(-0.50, 0.58);
      shape.closePath();
    } else if (character === "C") {
      shape.moveTo(0.50, 0.38);
      shape.bezierCurveTo(0.30, 0.58, 0.08, 0.62, -0.18, 0.55);
      shape.bezierCurveTo(-0.45, 0.48, -0.55, 0.25, -0.55, 0.00);
      shape.bezierCurveTo(-0.55, -0.27, -0.43, -0.48, -0.16, -0.56);
      shape.bezierCurveTo(0.10, -0.62, 0.34, -0.54, 0.50, -0.35);
      shape.lineTo(0.25, -0.14);
      shape.bezierCurveTo(0.14, -0.28, -0.02, -0.32, -0.14, -0.22);
      shape.bezierCurveTo(-0.23, -0.13, -0.23, 0.13, -0.14, 0.23);
      shape.bezierCurveTo(-0.02, 0.34, 0.14, 0.30, 0.25, 0.16);
      shape.closePath();
    } else {
      shape.moveTo(-0.50, -0.50);
      shape.lineTo(-0.18, -0.50);
      shape.lineTo(-0.18, -0.15);
      shape.lineTo(0.18, -0.15);
      shape.lineTo(0.18, -0.50);
      shape.lineTo(0.50, -0.50);
      shape.lineTo(0.50, 0.50);
      shape.lineTo(0.18, 0.50);
      shape.lineTo(0.18, 0.15);
      shape.lineTo(-0.18, 0.15);
      shape.lineTo(-0.18, 0.50);
      shape.lineTo(-0.50, 0.50);
      shape.closePath();
    }

    return shape;
  }

  const fruit_punch_glyphShapes = {};
  const fruit_punch_characters = "FRUITPUNCH";
  for (let i = 0; i < fruit_punch_characters.length; i++) {
    const character = fruit_punch_characters[i];
    if (!fruit_punch_glyphShapes[character]) {
      fruit_punch_glyphShapes[character] = createGlyphShape(character);
    }
  }

  const fruit_punch_outlineGeom = new THREE.ExtrudeGeometry(
    fruit_punch_glyphShapes.F,
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 8,
    }
  );
  fruit_punch_outlineGeom.translate(0, 0, -0.004);

  const fruit_punch_fillGeom = new THREE.ExtrudeGeometry(
    fruit_punch_glyphShapes.F,
    {
      depth: 0.006,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 8,
    }
  );
  fruit_punch_fillGeom.translate(0, 0, -0.003);

  const fruit_punch_outlineGeoms = {};
  const fruit_punch_fillGeoms = {};
  for (let i = 0; i < fruit_punch_characters.length; i++) {
    const character = fruit_punch_characters[i];
    const sourceGeom = new THREE.ExtrudeGeometry(
      fruit_punch_glyphShapes[character],
      {
        depth: 0.008,
        steps: 1,
        bevelEnabled: false,
        curveSegments: 8,
      }
    );
    sourceGeom.translate(0, 0, -0.004);
    fruit_punch_outlineGeoms[character] = sourceGeom;

    const fillSourceGeom = new THREE.ExtrudeGeometry(
      fruit_punch_glyphShapes[character],
      {
        depth: 0.006,
        steps: 1,
        bevelEnabled: false,
        curveSegments: 8,
      }
    );
    fillSourceGeom.translate(0, 0, -0.003);
    fruit_punch_fillGeoms[character] = fillSourceGeom;
  }

  function createFruitPunchWord(word, width, height, nodeName) {
    const word_group = new THREE.Group();
    word_group.name = nodeName;

    const spacingRatio = 0.06;
    const glyphWidth =
      width / (word.length + (word.length - 1) * spacingRatio);
    const glyphSpacing = glyphWidth * spacingRatio;
    const totalWidth =
      word.length * glyphWidth + (word.length - 1) * glyphSpacing;
    const italicShear = 0.18;

    for (let i = 0; i < word.length; i++) {
      const character = word[i];
      const x =
        -totalWidth / 2 +
        glyphWidth / 2 +
        i * (glyphWidth + glyphSpacing);

      const outline_letter = new THREE.Mesh(
        fruit_punch_outlineGeoms[character],
        fruit_punch_outlineMat
      );
      outline_letter.name = nodeName + "_outline_" + i;
      outline_letter.scale.set(glyphWidth * 1.22, height * 1.12, 1);
      outline_letter.rotation.z = italicShear;
      outline_letter.position.set(x, 0, 0);
      word_group.add(outline_letter);

      const fill_letter = new THREE.Mesh(
        fruit_punch_fillGeoms[character],
        fruit_punch_fillMat
      );
      fill_letter.name = nodeName + "_fill_" + i;
      fill_letter.scale.set(glyphWidth, height, 1);
      fill_letter.rotation.z = italicShear;
      fill_letter.position.set(x, 0, 0.010);
      word_group.add(fill_letter);
    }

    return word_group;
  }

  function placeFruitPunchWord(word_group, centerY, radius) {
    const centerFraction = 0.20;
    const angle = Math.asin(centerFraction);
    const normal = new THREE.Vector3(
      Math.sin(angle),
      0,
      Math.cos(angle)
    ).normalize();
    word_group.position.set(
      normal.x * radius,
      centerY,
      normal.z * radius
    );
    word_group.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }

  const fruit_punch_top = createFruitPunchWord(
    "FRUIT",
    0.92,
    0.32,
    "fruit_punch_top"
  );
  placeFruitPunchWord(fruit_punch_top, 1.18, 0.530);
  label_group.add(fruit_punch_top);

  const fruit_punch_bottom = createFruitPunchWord(
    "PUNCH",
    0.94,
    0.34,
    "fruit_punch_bottom"
  );
  placeFruitPunchWord(fruit_punch_bottom, 0.81, 0.530);
  label_group.add(fruit_punch_bottom);

  const side_printGeom = new THREE.BoxGeometry(0.030, 0.010, 0.006);
  const side_print = new THREE.InstancedMesh(
    side_printGeom,
    side_printMat,
    18
  );
  const side_print_dummy = new THREE.Object3D();
  const side_print_angle = 1.02;
  const side_print_radius = 0.529;

  for (let i = 0; i < 18; i++) {
    const widthScale = 0.55 + ((i * 3) % 5) * 0.12;
    const y = 0.60 + i * 0.048;
    side_print_dummy.position.set(
      Math.sin(side_print_angle) * side_print_radius,
      y,
      Math.cos(side_print_angle) * side_print_radius
    );
    side_print_dummy.rotation.set(0, side_print_angle, 0);
    side_print_dummy.scale.set(widthScale, 1, 1);
    side_print_dummy.updateMatrix();
    side_print.setMatrixAt(i, side_print_dummy.matrix);
  }
  side_print.instanceMatrix.needsUpdate = true;
  label_group.add(side_print);

  const cap_bodyProfile = [
    new THREE.Vector2(0.00, 2.14),
    new THREE.Vector2(0.385, 2.14),
    new THREE.Vector2(0.405, 2.16),
    new THREE.Vector2(0.405, 2.19),
    new THREE.Vector2(0.378, 2.21),
    new THREE.Vector2(0.370, 2.25),
    new THREE.Vector2(0.370, 2.45),
    new THREE.Vector2(0.382, 2.50),
    new THREE.Vector2(0.370, 2.54),
    new THREE.Vector2(0.00, 2.54),
  ];
  const cap_bodyGeom = new THREE.LatheGeometry(cap_bodyProfile, 64);
  const cap_body = new THREE.Mesh(cap_bodyGeom, cap_bodyMat);
  cap_group.add(cap_body);

  const cap_lower_flangeGeom = new THREE.CylinderGeometry(
    0.420,
    0.420,
    0.026,
    64
  );
  const cap_lower_flange = new THREE.Mesh(
    cap_lower_flangeGeom,
    cap_bodyMat
  );
  cap_lower_flange.position.y = 2.16;
  cap_group.add(cap_lower_flange);

  const cap_lower_ringGeom = new THREE.TorusGeometry(0.397, 0.017, 10, 64);
  const cap_lower_ring = new THREE.Mesh(cap_lower_ringGeom, cap_bodyMat);
  cap_lower_ring.rotation.x = Math.PI / 2;
  cap_lower_ring.position.y = 2.185;
  cap_group.add(cap_lower_ring);

  const cap_thread_ringGeom = new THREE.TorusGeometry(0.367, 0.010, 8, 64);
  const cap_thread_ring = new THREE.Mesh(cap_thread_ringGeom, cap_bodyMat);
  cap_thread_ring.rotation.x = Math.PI / 2;
  cap_thread_ring.position.y = 2.235;
  cap_group.add(cap_thread_ring);

  const cap_upper_ringGeom = new THREE.TorusGeometry(0.365, 0.014, 10, 64);
  const cap_upper_ring = new THREE.Mesh(cap_upper_ringGeom, cap_bodyMat);
  cap_upper_ring.rotation.x = Math.PI / 2;
  cap_upper_ring.position.y = 2.505;
  cap_group.add(cap_upper_ring);

  const cap_top_discGeom = new THREE.CylinderGeometry(
    0.355,
    0.355,
    0.018,
    64
  );
  const cap_top_disc = new THREE.Mesh(cap_top_discGeom, cap_bodyMat);
  cap_top_disc.position.y = 2.548;
  cap_group.add(cap_top_disc);

  const cap_knurl_groovesGeom = new THREE.BoxGeometry(
    0.011,
    0.115,
    0.009
  );
  const cap_knurl_grooves = new THREE.InstancedMesh(
    cap_knurl_groovesGeom,
    cap_knurl_groovesMat,
    40
  );
  const cap_knurl_dummy = new THREE.Object3D();

  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2;
    cap_knurl_dummy.position.set(
      Math.sin(angle) * 0.374,
      2.465,
      Math.cos(angle) * 0.374
    );
    cap_knurl_dummy.rotation.set(0, angle, 0);
    cap_knurl_dummy.scale.set(1, 1, 1);
    cap_knurl_dummy.updateMatrix();
    cap_knurl_grooves.setMatrixAt(i, cap_knurl_dummy.matrix);
  }
  cap_knurl_grooves.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_knurl_grooves);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}