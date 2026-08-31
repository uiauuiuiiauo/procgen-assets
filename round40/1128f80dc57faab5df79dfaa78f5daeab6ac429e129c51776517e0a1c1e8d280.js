export default function generate(THREE) {
  const root = new THREE.Group();

  const brimRadiusX = 1.75;
  const brimRadiusZ = 1.18;
  const brimThickness = 0.045;
  const crownRadius = 0.88;
  const crownScaleY = 1.10;
  const crownScaleZ = 0.92;
  const crownBaseY = 0.09;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x252a33,
    metalness: 0.0,
    roughness: 0.95
  });
  const brownFabricMat = new THREE.MeshStandardMaterial({
    color: 0x60402f,
    metalness: 0.0,
    roughness: 0.95
  });
  const darkBrownFabricMat = new THREE.MeshStandardMaterial({
    color: 0x493024,
    metalness: 0.0,
    roughness: 0.95
  });
  const outlineMat = new THREE.MeshStandardMaterial({
    color: 0x201d1b,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const coralFabricMat = new THREE.MeshStandardMaterial({
    color: 0xf05f55,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const redFabricMat = new THREE.MeshStandardMaterial({
    color: 0xc92f38,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const yellowFabricMat = new THREE.MeshStandardMaterial({
    color: 0xf3ce32,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const orangeFabricMat = new THREE.MeshStandardMaterial({
    color: 0xe87836,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const tealFabricMat = new THREE.MeshStandardMaterial({
    color: 0x4eb9a5,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const blueFabricMat = new THREE.MeshStandardMaterial({
    color: 0x3476c4,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const purpleFabricMat = new THREE.MeshStandardMaterial({
    color: 0x92588f,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const pinkFabricMat = new THREE.MeshStandardMaterial({
    color: 0xd97891,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const limeFabricMat = new THREE.MeshStandardMaterial({
    color: 0xa9c95b,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const creamFabricMat = new THREE.MeshStandardMaterial({
    color: 0xe8d99b,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const whiteFabricMat = new THREE.MeshStandardMaterial({
    color: 0xf2eee2,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });

  function brimSurfaceY(x, z) {
    const nx = x / brimRadiusX;
    const nz = z / brimRadiusZ;
    const r = Math.min(1, Math.sqrt(nx * nx + nz * nz));
    return 0.018 - 0.006 * r - 0.024 * nz * nz;
  }

  function createBrimGeometry() {
    const segments = 72;
    const rings = 5;
    const vertices = [];
    const indices = [];

    vertices.push(0, brimSurfaceY(0, 0), 0);
    for (let ring = 1; ring <= rings; ring++) {
      const r = ring / rings;
      for (let i = 0; i < segments; i++) {
        const a = i / segments * Math.PI * 2;
        const x = Math.cos(a) * brimRadiusX * r;
        const z = Math.sin(a) * brimRadiusZ * r;
        vertices.push(x, brimSurfaceY(x, z), z);
      }
    }

    const bottomCenter = vertices.length / 3;
    vertices.push(0, brimSurfaceY(0, 0) - brimThickness, 0);
    for (let ring = 1; ring <= rings; ring++) {
      const r = ring / rings;
      for (let i = 0; i < segments; i++) {
        const a = i / segments * Math.PI * 2;
        const x = Math.cos(a) * brimRadiusX * r;
        const z = Math.sin(a) * brimRadiusZ * r;
        vertices.push(x, brimSurfaceY(x, z) - brimThickness, z);
      }
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(0, 1 + next, 1 + i);
      indices.push(bottomCenter, bottomCenter + 1 + i, bottomCenter + 1 + next);
    }

    for (let ring = 1; ring < rings; ring++) {
      const innerStart = 1 + (ring - 1) * segments;
      const outerStart = 1 + ring * segments;
      const bottomInnerStart = bottomCenter + 1 + (ring - 1) * segments;
      const bottomOuterStart = bottomCenter + 1 + ring * segments;

      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;

        const a = innerStart + i;
        const b = innerStart + next;
        const c = outerStart + next;
        const d = outerStart + i;
        indices.push(a, b, c, a, c, d);

        const ba = bottomInnerStart + i;
        const bb = bottomInnerStart + next;
        const bc = bottomOuterStart + next;
        const bd = bottomOuterStart + i;
        indices.push(ba, bc, bb, ba, bd, bc);
      }
    }

    const topOuterStart = 1 + (rings - 1) * segments;
    const bottomOuterStart = bottomCenter + 1 + (rings - 1) * segments;
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const topCurrent = topOuterStart + i;
      const topNext = topOuterStart + next;
      const bottomCurrent = bottomOuterStart + i;
      const bottomNext = bottomOuterStart + next;
      indices.push(
        topCurrent, topNext, bottomNext,
        topCurrent, bottomNext, bottomCurrent
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const brimGeom = createBrimGeometry();
  const brim = new THREE.Mesh(brimGeom, fabricMat);
  root.add(brim);

  const brimEdgePoints = [];
  for (let i = 0; i < 72; i++) {
    const a = i / 72 * Math.PI * 2;
    const x = Math.cos(a) * brimRadiusX;
    const z = Math.sin(a) * brimRadiusZ;
    brimEdgePoints.push(
      new THREE.Vector3(x, brimSurfaceY(x, z) - brimThickness * 0.5, z)
    );
  }
  const brimEdgeCurve = new THREE.CatmullRomCurve3(
    brimEdgePoints,
    true,
    "centripetal"
  );
  const brim_edgeGeom = new THREE.TubeGeometry(
    brimEdgeCurve,
    144,
    0.034,
    8,
    true
  );
  const brim_edge = new THREE.Mesh(brim_edgeGeom, brownFabricMat);
  root.add(brim_edge);

  const crownGeom = new THREE.SphereGeometry(
    crownRadius,
    64,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const crown = new THREE.Mesh(crownGeom, fabricMat);
  crown.scale.set(1, crownScaleY, crownScaleZ);
  crown.position.y = crownBaseY;
  root.add(crown);

  const hat_bandGeom = new THREE.CylinderGeometry(
    0.875,
    0.91,
    0.27,
    64,
    1,
    true
  );
  const hat_band = new THREE.Mesh(hat_bandGeom, brownFabricMat);
  hat_band.scale.z = crownScaleZ;
  hat_band.position.y = 0.235;
  root.add(hat_band);

  const bandLowerPoints = [];
  const bandUpperPoints = [];
  for (let i = 0; i < 64; i++) {
    const a = i / 64 * Math.PI * 2;
    bandLowerPoints.push(new THREE.Vector3(
      Math.cos(a) * 0.91,
      0.10,
      Math.sin(a) * 0.91 * crownScaleZ
    ));
    bandUpperPoints.push(new THREE.Vector3(
      Math.cos(a) * 0.875,
      0.37,
      Math.sin(a) * 0.875 * crownScaleZ
    ));
  }

  const band_lower_pipingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(bandLowerPoints, true, "centripetal"),
    128,
    0.018,
    7,
    true
  );
  const band_lower_piping = new THREE.Mesh(
    band_lower_pipingGeom,
    darkBrownFabricMat
  );
  root.add(band_lower_piping);

  const band_upper_pipingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(bandUpperPoints, true, "centripetal"),
    128,
    0.018,
    7,
    true
  );
  const band_upper_piping = new THREE.Mesh(
    band_upper_pipingGeom,
    darkBrownFabricMat
  );
  root.add(band_upper_piping);

  const animalShape = new THREE.Shape();
  animalShape.moveTo(-0.56, -0.04);
  animalShape.bezierCurveTo(-0.54, -0.20, -0.40, -0.25, -0.22, -0.22);
  animalShape.lineTo(-0.16, -0.47);
  animalShape.lineTo(0.02, -0.47);
  animalShape.lineTo(0.08, -0.23);
  animalShape.bezierCurveTo(0.28, -0.20, 0.39, -0.12, 0.42, 0.05);
  animalShape.lineTo(0.54, 0.27);
  animalShape.bezierCurveTo(0.58, 0.36, 0.52, 0.42, 0.42, 0.39);
  animalShape.lineTo(0.31, 0.30);
  animalShape.lineTo(0.33, 0.51);
  animalShape.lineTo(0.20, 0.35);
  animalShape.lineTo(0.12, 0.52);
  animalShape.lineTo(0.08, 0.31);
  animalShape.bezierCurveTo(-0.08, 0.39, -0.28, 0.32, -0.39, 0.20);
  animalShape.lineTo(-0.51, 0.13);
  animalShape.closePath();

  const animalGeom = new THREE.ShapeGeometry(animalShape, 12);
  const animalEyeGeom = new THREE.CircleGeometry(0.035, 14);
  const animalSnoutGeom = new THREE.CircleGeometry(0.055, 16);

  function createAnimalDecal(primaryMat, secondaryMat) {
    const animal = new THREE.Group();

    const animal_outline = new THREE.Mesh(animalGeom, outlineMat);
    animal_outline.scale.set(1.08, 1.08, 1);
    animal_outline.position.z = 0.001;
    animal.add(animal_outline);

    const animal_body = new THREE.Mesh(animalGeom, primaryMat);
    animal_body.position.z = 0.004;
    animal.add(animal_body);

    const animal_snout = new THREE.Mesh(animalSnoutGeom, secondaryMat);
    animal_snout.scale.set(0.72, 0.48, 1);
    animal_snout.position.set(0.43, 0.27, 0.008);
    animal.add(animal_snout);

    const animal_eye = new THREE.Mesh(animalEyeGeom, outlineMat);
    animal_eye.scale.set(0.72, 0.72, 1);
    animal_eye.position.set(0.27, 0.24, 0.010);
    animal.add(animal_eye);

    return animal;
  }

  function createOvalPatchGeom(radiusX, radiusY, phase) {
    const shape = new THREE.Shape();
    const count = 24;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      const variation = 1 + 0.055 * Math.sin(a * 3 + phase);
      const x = Math.cos(a) * radiusX * variation;
      const y = Math.sin(a) * radiusY * variation;
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 12);
  }

  function createCrownPatch(radiusX, radiusY, phase, primaryMat, secondaryMat) {
    const patch = new THREE.Group();

    const patch_outlineGeom = createOvalPatchGeom(
      radiusX * 1.08,
      radiusY * 1.08,
      phase
    );
    const patch_outline = new THREE.Mesh(patch_outlineGeom, outlineMat);
    patch_outline.scale.set(1.08, 1.08, 1);
    patch_outline.position.z = 0.001;
    patch.add(patch_outline);

    const patch_fillGeom = createOvalPatchGeom(radiusX, radiusY, phase);
    const patch_fill = new THREE.Mesh(patch_fillGeom, primaryMat);
    patch_fill.position.z = 0.004;
    patch.add(patch_fill);

    const patch_accentGeom = new THREE.CircleGeometry(1, 24);
    const patch_accent = new THREE.Mesh(patch_accentGeom, secondaryMat);
    patch_accent.scale.set(radiusX * 0.48, radiusY * 0.58, 1);
    patch_accent.position.set(radiusX * 0.22, radiusY * 0.10, 0.008);
    patch.add(patch_accent);

    const patch_eye_left = new THREE.Mesh(animalEyeGeom, outlineMat);
    patch_eye_left.scale.set(0.55, 0.55, 1);
    patch_eye_left.position.set(
      -radiusX * 0.22,
      radiusY * 0.25,
      0.011
    );
    patch.add(patch_eye_left);

    const patch_eye_right = new THREE.Mesh(animalEyeGeom, outlineMat);
    patch_eye_right.scale.set(0.55, 0.55, 1);
    patch_eye_right.position.set(
      radiusX * 0.28,
      -radiusY * 0.18,
      0.011
    );
    patch.add(patch_eye_right);

    return patch;
  }

  function placeCrownDecal(decal, angle, y, scale, spin) {
    const verticalRadius = crownRadius * crownScaleY;
    const yNormalized = Math.max(
      -0.9,
      Math.min(0.94, (y - crownBaseY) / verticalRadius)
    );
    const horizontalRadius = crownRadius *
      Math.sqrt(Math.max(0.001, 1 - yNormalized * yNormalized));

    const x = Math.sin(angle) * horizontalRadius;
    const z = Math.cos(angle) * horizontalRadius * crownScaleZ;
    const normal = new THREE.Vector3(
      x / (crownRadius * crownRadius),
      (y - crownBaseY) / (verticalRadius * verticalRadius),
      z / (
        crownRadius * crownRadius *
        crownScaleZ * crownScaleZ
      )
    ).normalize();

    decal.position.set(x, y, z).addScaledVector(normal, 0.008);
    decal.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    decal.rotateZ(spin);
    decal.scale.setScalar(scale);
    root.add(decal);
  }

  function placeBrimDecal(decal, x, z, scale, spin) {
    const normal = new THREE.Vector3(0, 1, 0);
    decal.position.set(x, brimSurfaceY(x, z) + 0.006, z);
    decal.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    decal.rotateZ(spin);
    decal.scale.setScalar(scale);
    root.add(decal);
  }

  const crown_green_patch = createCrownPatch(
    0.31,
    0.29,
    0.3,
    tealFabricMat,
    creamFabricMat
  );
  placeCrownDecal(crown_green_patch, 0.10, 0.72, 1.0, -0.12);

  const crown_coral_animal = createAnimalDecal(
    coralFabricMat,
    creamFabricMat
  );
  placeCrownDecal(crown_coral_animal, -0.62, 0.50, 0.40, -0.08);

  const crown_red_animal = createAnimalDecal(
    redFabricMat,
    coralFabricMat
  );
  placeCrownDecal(crown_red_animal, 0.62, 0.49, 0.39, 0.12);

  const crown_yellow_animal = createAnimalDecal(
    yellowFabricMat,
    orangeFabricMat
  );
  placeCrownDecal(crown_yellow_animal, -0.32, 0.96, 0.25, -0.18);

  const crown_purple_animal = createAnimalDecal(
    purpleFabricMat,
    pinkFabricMat
  );
  placeCrownDecal(crown_purple_animal, -1.08, 0.46, 0.28, 0.16);

  const crown_lime_animal = createAnimalDecal(
    limeFabricMat,
    tealFabricMat
  );
  placeCrownDecal(crown_lime_animal, 1.02, 0.69, 0.22, -0.10);

  const crown_orange_animal = createAnimalDecal(
    orangeFabricMat,
    yellowFabricMat
  );
  placeCrownDecal(crown_orange_animal, 1.48, 0.38, 0.25, 0.18);

  const crown_back_blue_animal = createAnimalDecal(
    blueFabricMat,
    purpleFabricMat
  );
  placeCrownDecal(crown_back_blue_animal, 2.42, 0.55, 0.27, -0.14);

  const crown_back_coral_animal = createAnimalDecal(
    coralFabricMat,
    whiteFabricMat
  );
  placeCrownDecal(crown_back_coral_animal, -2.34, 0.42, 0.26, 0.12);

  const crown_top_red_animal = createAnimalDecal(
    redFabricMat,
    orangeFabricMat
  );
  placeCrownDecal(crown_top_red_animal, -0.88, 0.94, 0.20, 0.22);

  const crown_top_teal_animal = createAnimalDecal(
    tealFabricMat,
    limeFabricMat
  );
  placeCrownDecal(crown_top_teal_animal, 0.82, 0.93, 0.19, -0.18);

  const brim_front_yellow_animal = createAnimalDecal(
    yellowFabricMat,
    redFabricMat
  );
  placeBrimDecal(
    brim_front_yellow_animal,
    -0.48,
    0.82,
    0.52,
    -0.14
  );

  const brim_front_orange_animal = createAnimalDecal(
    orangeFabricMat,
    yellowFabricMat
  );
  placeBrimDecal(
    brim_front_orange_animal,
    0.62,
    0.82,
    0.50,
    0.18
  );

  const brim_front_blue_animal = createAnimalDecal(
    blueFabricMat,
    purpleFabricMat
  );
  placeBrimDecal(
    brim_front_blue_animal,
    0.02,
    1.00,
    0.32,
    -0.08
  );

  const brim_left_coral_animal = createAnimalDecal(
    coralFabricMat,
    creamFabricMat
  );
  placeBrimDecal(
    brim_left_coral_animal,
    -1.15,
    0.48,
    0.38,
    0.22
  );

  const brim_right_purple_animal = createAnimalDecal(
    purpleFabricMat,
    pinkFabricMat
  );
  placeBrimDecal(
    brim_right_purple_animal,
    1.18,
    0.43,
    0.37,
    -0.18
  );

  const brim_left_teal_animal = createAnimalDecal(
    tealFabricMat,
    limeFabricMat
  );
  placeBrimDecal(
    brim_left_teal_animal,
    -1.28,
    -0.18,
    0.32,
    -0.12
  );

  const brim_right_blue_animal = createAnimalDecal(
    blueFabricMat,
    orangeFabricMat
  );
  placeBrimDecal(
    brim_right_blue_animal,
    1.30,
    -0.12,
    0.31,
    0.16
  );

  const brim_back_green_animal = createAnimalDecal(
    limeFabricMat,
    tealFabricMat
  );
  placeBrimDecal(
    brim_back_green_animal,
    -0.62,
    -0.82,
    0.34,
    0.12
  );

  const brim_back_red_animal = createAnimalDecal(
    redFabricMat,
    coralFabricMat
  );
  placeBrimDecal(
    brim_back_red_animal,
    0.68,
    -0.78,
    0.35,
    -0.16
  );

  const brim_edge_pink_animal = createAnimalDecal(
    pinkFabricMat,
    purpleFabricMat
  );
  placeBrimDecal(
    brim_edge_pink_animal,
    1.48,
    0.55,
    0.24,
    0.20
  );

  const brim_edge_orange_animal = createAnimalDecal(
    orangeFabricMat,
    redFabricMat
  );
  placeBrimDecal(
    brim_edge_orange_animal,
    -1.48,
    0.50,
    0.23,
    -0.18
  );

  const brim_edge_teal_animal = createAnimalDecal(
    tealFabricMat,
    blueFabricMat
  );
  placeBrimDecal(
    brim_edge_teal_animal,
    0.05,
    -1.00,
    0.22,
    0.10
  );

  const brim_confetti = new THREE.Group();
  const confettiGeom = new THREE.CircleGeometry(0.025, 10);
  const confettiMats = [
    coralFabricMat,
    yellowFabricMat,
    tealFabricMat,
    purpleFabricMat,
    whiteFabricMat
  ];
  const confettiPositions = [
    [-0.84, 0.73],
    [-0.15, 0.78],
    [0.32, 0.67],
    [0.92, 0.30],
    [-1.00, 0.08],
    [0.02, 0.25],
    [0.82, -0.22],
    [-0.86, -0.38],
    [0.38, -0.52],
    [-0.12, -0.70]
  ];
  for (let i = 0; i < confettiPositions.length; i++) {
    const position = confettiPositions[i];
    const confetti = new THREE.Mesh(confettiGeom, confettiMats[i % 5]);
    confetti.position.set(
      position[0],
      brimSurfaceY(position[0], position[1]) + 0.012,
      position[1]
    );
    confetti.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 1, 0)
    );
    confetti.rotateZ(i * 0.61);
    confetti.scale.set(1.4, 0.55, 1);
    brim_confetti.add(confetti);
  }
  root.add(brim_confetti);

  const bow_group = new THREE.Group();
  const bowAngle = 0.42;
  const bowRadius = 0.89;
  const bowNormal = new THREE.Vector3(
    Math.sin(bowAngle),
    0,
    Math.cos(bowAngle)
  ).normalize();
  bow_group.position.set(
    Math.sin(bowAngle) * bowRadius,
    0.34,
    Math.cos(bowAngle) * bowRadius * crownScaleZ
  );
  bow_group.position.addScaledVector(bowNormal, 0.018);
  bow_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bowNormal
  );
  root.add(bow_group);

  const bowLeftShape = new THREE.Shape();
  bowLeftShape.moveTo(-0.03, 0.08);
  bowLeftShape.bezierCurveTo(-0.22, 0.20, -0.48, 0.36, -0.67, 0.31);
  bowLeftShape.bezierCurveTo(-0.76, 0.15, -0.72, -0.10, -0.62, -0.29);
  bowLeftShape.bezierCurveTo(-0.42, -0.25, -0.19, -0.15, -0.03, -0.07);
  bowLeftShape.closePath();

  const bowRightShape = new THREE.Shape();
  bowRightShape.moveTo(0.03, 0.09);
  bowRightShape.bezierCurveTo(0.20, 0.23, 0.42, 0.40, 0.59, 0.36);
  bowRightShape.bezierCurveTo(0.69, 0.18, 0.66, -0.08, 0.56, -0.25);
  bowRightShape.bezierCurveTo(0.37, -0.21, 0.18, -0.13, 0.03, -0.06);
  bowRightShape.closePath();

  const bow_left_loopGeom = new THREE.ExtrudeGeometry(bowLeftShape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  const bow_left_loop = new THREE.Mesh(
    bow_left_loopGeom,
    brownFabricMat
  );
  bow_group.add(bow_left_loop);

  const bow_right_loopGeom = new THREE.ExtrudeGeometry(bowRightShape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  const bow_right_loop = new THREE.Mesh(
    bow_right_loopGeom,
    brownFabricMat
  );
  bow_group.add(bow_right_loop);

  const bowTailLeftShape = new THREE.Shape();
  bowTailLeftShape.moveTo(-0.03, -0.04);
  bowTailLeftShape.bezierCurveTo(-0.13, -0.16, -0.26, -0.31, -0.43, -0.43);
  bowTailLeftShape.lineTo(-0.27, -0.47);
  bowTailLeftShape.lineTo(-0.16, -0.36);
  bowTailLeftShape.lineTo(-0.02, -0.13);
  bowTailLeftShape.closePath();

  const bow_tail_leftGeom = new THREE.ExtrudeGeometry(
    bowTailLeftShape,
    {
      depth: 0.055,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2
    }
  );
  const bow_tail_left = new THREE.Mesh(
    bow_tail_leftGeom,
    darkBrownFabricMat
  );
  bow_tail_left.position.z = -0.005;
  bow_group.add(bow_tail_left);

  const bowTailRightShape = new THREE.Shape();
  bowTailRightShape.moveTo(0.03, -0.04);
  bowTailRightShape.bezierCurveTo(0.14, -0.15, 0.28, -0.29, 0.47, -0.38);
  bowTailRightShape.lineTo(0.31, -0.45);
  bowTailRightShape.lineTo(0.17, -0.35);
  bowTailRightShape.lineTo(0.02, -0.13);
  bowTailRightShape.closePath();

  const bow_tail_rightGeom = new THREE.ExtrudeGeometry(
    bowTailRightShape,
    {
      depth: 0.055,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2
    }
  );
  const bow_tail_right = new THREE.Mesh(
    bow_tail_rightGeom,
    darkBrownFabricMat
  );
  bow_tail_right.position.z = -0.005;
  bow_group.add(bow_tail_right);

  const bow_knotGeom = new THREE.SphereGeometry(0.16, 24, 16);
  const bow_knot = new THREE.Mesh(bow_knotGeom, brownFabricMat);
  bow_knot.scale.set(0.72, 1.0, 0.55);
  bow_knot.position.set(0, 0, 0.105);
  bow_group.add(bow_knot);

  const bowLeftFoldCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.05, 0.03, 0.095),
    new THREE.Vector3(-0.28, 0.11, 0.096),
    new THREE.Vector3(-0.57, 0.22, 0.090)
  ]);
  const bow_left_foldGeom = new THREE.TubeGeometry(
    bowLeftFoldCurve,
    16,
    0.014,
    6,
    false
  );
  const bow_left_fold = new THREE.Mesh(
    bow_left_foldGeom,
    darkBrownFabricMat
  );
  bow_group.add(bow_left_fold);

  const bowRightFoldCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.05, 0.04, 0.095),
    new THREE.Vector3(0.25, 0.15, 0.096),
    new THREE.Vector3(0.50, 0.27, 0.090)
  ]);
  const bow_right_foldGeom = new THREE.TubeGeometry(
    bowRightFoldCurve,
    16,
    0.014,
    6,
    false
  );
  const bow_right_fold = new THREE.Mesh(
    bow_right_foldGeom,
    darkBrownFabricMat
  );
  bow_group.add(bow_right_fold);

  fitToUnitCube(THREE, root);
  return root;

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
}