export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "shagfur_ottoman";

  const cushion_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x281526,
    metalness: 0.0,
    roughness: 0.95,
  });
  const brown_fur_swatchesMat = new THREE.MeshStandardMaterial({
    color: 0x684033,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const russet_fur_swatchesMat = new THREE.MeshStandardMaterial({
    color: 0x4a1c24,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const purple_fur_swatchesMat = new THREE.MeshStandardMaterial({
    color: 0x422441,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const indigo_fur_swatchesMat = new THREE.MeshStandardMaterial({
    color: 0x25203d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const mauve_fur_swatchesMat = new THREE.MeshStandardMaterial({
    color: 0x5b394c,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const brown_fur_tuftsMat = new THREE.MeshStandardMaterial({
    color: 0x754735,
    metalness: 0.0,
    roughness: 0.95,
  });
  const russet_fur_tuftsMat = new THREE.MeshStandardMaterial({
    color: 0x572329,
    metalness: 0.0,
    roughness: 0.95,
  });
  const purple_fur_tuftsMat = new THREE.MeshStandardMaterial({
    color: 0x51304d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const indigo_fur_tuftsMat = new THREE.MeshStandardMaterial({
    color: 0x302945,
    metalness: 0.0,
    roughness: 0.95,
  });
  const mauve_fur_tuftsMat = new THREE.MeshStandardMaterial({
    color: 0x674354,
    metalness: 0.0,
    roughness: 0.95,
  });

  const cushion_bodyShape = new THREE.Shape();
  const bodyHalf = 0.41;
  const cornerRadius = 0.09;
  cushion_bodyShape.moveTo(-bodyHalf + cornerRadius, -bodyHalf);
  cushion_bodyShape.lineTo(bodyHalf - cornerRadius, -bodyHalf);
  cushion_bodyShape.quadraticCurveTo(
    bodyHalf,
    -bodyHalf,
    bodyHalf,
    -bodyHalf + cornerRadius
  );
  cushion_bodyShape.lineTo(bodyHalf, bodyHalf - cornerRadius);
  cushion_bodyShape.quadraticCurveTo(
    bodyHalf,
    bodyHalf,
    bodyHalf - cornerRadius,
    bodyHalf
  );
  cushion_bodyShape.lineTo(-bodyHalf + cornerRadius, bodyHalf);
  cushion_bodyShape.quadraticCurveTo(
    -bodyHalf,
    bodyHalf,
    -bodyHalf,
    bodyHalf - cornerRadius
  );
  cushion_bodyShape.lineTo(-bodyHalf, -bodyHalf + cornerRadius);
  cushion_bodyShape.quadraticCurveTo(
    -bodyHalf,
    -bodyHalf,
    -bodyHalf + cornerRadius,
    -bodyHalf
  );

  const cushion_bodyGeom = new THREE.ExtrudeGeometry(cushion_bodyShape, {
    depth: 0.78,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 4,
    curveSegments: 8,
  });
  cushion_bodyGeom.translate(0, 0, -0.39);

  const cushion_body = new THREE.Mesh(cushion_bodyGeom, cushion_bodyMat);
  cushion_body.name = "cushion_body";
  root.add(cushion_body);

  const topSurface = 0.467;
  const sideSurface = 0.467;

  function createPatchGeometry(face, centerU, centerV, halfW, halfH, rotation) {
    const segments = 20;
    const rings = 3;
    const positions = [];
    const indices = [];
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);

    function addPoint(u, v, lift) {
      const du = u - centerU;
      const dv = v - centerV;
      const ru = du * cosR - dv * sinR;
      const rv = du * sinR + dv * cosR;
      const nx = Math.min(1, Math.abs(ru / halfW));
      const ny = Math.min(1, Math.abs(rv / halfH));
      const radial = Math.max(nx, ny);
      const rounded =
        1 - Math.pow(radial, 4) * (1 - Math.pow(radial, 4));
      const liftAtPoint = lift * (0.28 + 0.72 * rounded);
      const wave =
        0.0014 * Math.sin((u + centerU) * 29 + (v - centerV) * 23);

      if (face === "top") {
        positions.push(u, topSurface + liftAtPoint + wave, v);
      } else if (face === "front") {
        positions.push(u, v, sideSurface + liftAtPoint + wave);
      } else if (face === "back") {
        positions.push(u, v, -sideSurface - liftAtPoint - wave);
      } else if (face === "right") {
        positions.push(sideSurface + liftAtPoint + wave, v, u);
      } else {
        positions.push(-sideSurface - liftAtPoint - wave, v, u);
      }
    }

    addPoint(centerU, centerV, 0.012);

    for (let ring = 1; ring <= rings; ring++) {
      const t = ring / rings;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const cx = Math.cos(angle);
        const sx = Math.sin(angle);
        const exponent = 0.56 + 0.12 * t;
        const edgeVariation =
          1 +
          0.055 * Math.sin(angle * 3 + 0.7) +
          0.035 * Math.sin(angle * 7 - 0.4);
        const x =
          halfW *
          (cx < 0 ? -1 : 1) *
          Math.pow(Math.abs(cx), exponent) *
          t *
          edgeVariation;
        const y =
          halfH *
          (sx < 0 ? -1 : 1) *
          Math.pow(Math.abs(sx), exponent) *
          t *
          (1 + 0.04 * Math.sin(angle * 5 + 1.2));
        addPoint(centerU + x, centerV + y, 0.012);
      }
    }

    for (let i = 0; i < segments; i++) {
      indices.push(0, 1 + i, 1 + ((i + 1) % segments));
    }

    for (let ring = 1; ring < rings; ring++) {
      const innerStart = 1 + (ring - 1) * segments;
      const outerStart = 1 + ring * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = innerStart + i;
        const b = innerStart + next;
        const c = outerStart + i;
        const d = outerStart + next;
        indices.push(a, c, d, a, d, b);
      }
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

  function createPatch(
    name,
    face,
    centerU,
    centerV,
    halfW,
    halfH,
    rotation,
    material
  ) {
    const geometry = createPatchGeometry(
      face,
      centerU,
      centerV,
      halfW,
      halfH,
      rotation
    );
    const patch = new THREE.Mesh(geometry, material);
    patch.name = name;
    return patch;
  }

  const top_fur_patches = new THREE.Group();
  top_fur_patches.name = "top_fur_patches";

  const top_center_russet_patch = createPatch(
    "top_center_russet_patch",
    "top",
    0.0,
    0.0,
    0.19,
    0.16,
    0.08,
    russet_fur_swatchesMat
  );
  const top_front_indigo_patch = createPatch(
    "top_front_indigo_patch",
    "top",
    -0.22,
    0.25,
    0.18,
    0.16,
    -0.18,
    indigo_fur_swatchesMat
  );
  const top_right_brown_patch = createPatch(
    "top_right_brown_patch",
    "top",
    0.24,
    0.24,
    0.17,
    0.16,
    0.22,
    brown_fur_swatchesMat
  );
  const top_back_mauve_patch = createPatch(
    "top_back_mauve_patch",
    "top",
    0.02,
    -0.27,
    0.20,
    0.15,
    -0.08,
    mauve_fur_swatchesMat
  );
  const top_left_purple_patch = createPatch(
    "top_left_purple_patch",
    "top",
    -0.27,
    -0.16,
    0.15,
    0.18,
    0.26,
    purple_fur_swatchesMat
  );
  const top_right_indigo_patch = createPatch(
    "top_right_indigo_patch",
    "top",
    0.29,
    -0.12,
    0.14,
    0.18,
    -0.22,
    indigo_fur_swatchesMat
  );

  top_fur_patches.add(
    top_center_russet_patch,
    top_front_indigo_patch,
    top_right_brown_patch,
    top_back_mauve_patch,
    top_left_purple_patch,
    top_right_indigo_patch
  );
  root.add(top_fur_patches);

  const front_fur_patches = new THREE.Group();
  front_fur_patches.name = "front_fur_patches";

  const front_center_russet_patch = createPatch(
    "front_center_russet_patch",
    "front",
    0.0,
    0.02,
    0.18,
    0.21,
    -0.08,
    russet_fur_swatchesMat
  );
  const front_upper_left_purple_patch = createPatch(
    "front_upper_left_purple_patch",
    "front",
    -0.23,
    0.22,
    0.18,
    0.16,
    0.18,
    purple_fur_swatchesMat
  );
  const front_upper_right_brown_patch = createPatch(
    "front_upper_right_brown_patch",
    "front",
    0.24,
    0.22,
    0.17,
    0.16,
    -0.18,
    brown_fur_swatchesMat
  );
  const front_left_indigo_patch = createPatch(
    "front_left_indigo_patch",
    "front",
    -0.27,
    -0.08,
    0.14,
    0.20,
    -0.14,
    indigo_fur_swatchesMat
  );
  const front_right_mauve_patch = createPatch(
    "front_right_mauve_patch",
    "front",
    0.28,
    -0.06,
    0.14,
    0.20,
    0.14,
    mauve_fur_swatchesMat
  );
  const front_lower_left_brown_patch = createPatch(
    "front_lower_left_brown_patch",
    "front",
    -0.23,
    -0.28,
    0.18,
    0.14,
    0.12,
    brown_fur_swatchesMat
  );
  const front_lower_right_indigo_patch = createPatch(
    "front_lower_right_indigo_patch",
    "front",
    0.24,
    -0.28,
    0.18,
    0.14,
    -0.12,
    indigo_fur_swatchesMat
  );

  front_fur_patches.add(
    front_center_russet_patch,
    front_upper_left_purple_patch,
    front_upper_right_brown_patch,
    front_left_indigo_patch,
    front_right_mauve_patch,
    front_lower_left_brown_patch,
    front_lower_right_indigo_patch
  );
  root.add(front_fur_patches);

  const back_fur_patches = new THREE.Group();
  back_fur_patches.name = "back_fur_patches";

  const back_center_brown_patch = createPatch(
    "back_center_brown_patch",
    "back",
    0.0,
    0.02,
    0.18,
    0.21,
    0.06,
    brown_fur_swatchesMat
  );
  const back_upper_left_indigo_patch = createPatch(
    "back_upper_left_indigo_patch",
    "back",
    -0.24,
    0.22,
    0.17,
    0.16,
    -0.16,
    indigo_fur_swatchesMat
  );
  const back_upper_right_purple_patch = createPatch(
    "back_upper_right_purple_patch",
    "back",
    0.24,
    0.22,
    0.17,
    0.16,
    0.18,
    purple_fur_swatchesMat
  );
  const back_left_russet_patch = createPatch(
    "back_left_russet_patch",
    "back",
    -0.27,
    -0.10,
    0.14,
    0.20,
    0.12,
    russet_fur_swatchesMat
  );
  const back_right_indigo_patch = createPatch(
    "back_right_indigo_patch",
    "back",
    0.28,
    -0.08,
    0.14,
    0.20,
    -0.12,
    indigo_fur_swatchesMat
  );
  const back_lower_left_mauve_patch = createPatch(
    "back_lower_left_mauve_patch",
    "back",
    -0.23,
    -0.28,
    0.18,
    0.14,
    -0.10,
    mauve_fur_swatchesMat
  );
  const back_lower_right_brown_patch = createPatch(
    "back_lower_right_brown_patch",
    "back",
    0.24,
    -0.28,
    0.18,
    0.14,
    0.10,
    brown_fur_swatchesMat
  );

  back_fur_patches.add(
    back_center_brown_patch,
    back_upper_left_indigo_patch,
    back_upper_right_purple_patch,
    back_left_russet_patch,
    back_right_indigo_patch,
    back_lower_left_mauve_patch,
    back_lower_right_brown_patch
  );
  root.add(back_fur_patches);

  const right_fur_patches = new THREE.Group();
  right_fur_patches.name = "right_fur_patches";

  const right_center_purple_patch = createPatch(
    "right_center_purple_patch",
    "right",
    0.0,
    0.02,
    0.18,
    0.21,
    0.08,
    purple_fur_swatchesMat
  );
  const right_upper_front_brown_patch = createPatch(
    "right_upper_front_brown_patch",
    "right",
    -0.23,
    0.22,
    0.18,
    0.16,
    -0.16,
    brown_fur_swatchesMat
  );
  const right_upper_back_russet_patch = createPatch(
    "right_upper_back_russet_patch",
    "right",
    0.24,
    0.22,
    0.17,
    0.16,
    0.18,
    russet_fur_swatchesMat
  );
  const right_front_indigo_patch = createPatch(
    "right_front_indigo_patch",
    "right",
    -0.27,
    -0.09,
    0.14,
    0.20,
    0.12,
    indigo_fur_swatchesMat
  );
  const right_back_mauve_patch = createPatch(
    "right_back_mauve_patch",
    "right",
    0.28,
    -0.07,
    0.14,
    0.20,
    -0.13,
    mauve_fur_swatchesMat
  );
  const right_lower_front_indigo_patch = createPatch(
    "right_lower_front_indigo_patch",
    "right",
    -0.23,
    -0.28,
    0.18,
    0.14,
    -0.10,
    indigo_fur_swatchesMat
  );
  const right_lower_back_brown_patch = createPatch(
    "right_lower_back_brown_patch",
    "right",
    0.24,
    -0.28,
    0.18,
    0.14,
    0.10,
    brown_fur_swatchesMat
  );

  right_fur_patches.add(
    right_center_purple_patch,
    right_upper_front_brown_patch,
    right_upper_back_russet_patch,
    right_front_indigo_patch,
    right_back_mauve_patch,
    right_lower_front_indigo_patch,
    right_lower_back_brown_patch
  );
  root.add(right_fur_patches);

  const left_fur_patches = new THREE.Group();
  left_fur_patches.name = "left_fur_patches";

  const left_center_mauve_patch = createPatch(
    "left_center_mauve_patch",
    "left",
    0.0,
    0.02,
    0.18,
    0.21,
    -0.08,
    mauve_fur_swatchesMat
  );
  const left_upper_front_purple_patch = createPatch(
    "left_upper_front_purple_patch",
    "left",
    -0.23,
    0.22,
    0.18,
    0.16,
    0.16,
    purple_fur_swatchesMat
  );
  const left_upper_back_brown_patch = createPatch(
    "left_upper_back_brown_patch",
    "left",
    0.24,
    0.22,
    0.17,
    0.16,
    -0.18,
    brown_fur_swatchesMat
  );
  const left_front_russet_patch = createPatch(
    "left_front_russet_patch",
    "left",
    -0.27,
    -0.09,
    0.14,
    0.20,
    -0.12,
    russet_fur_swatchesMat
  );
  const left_back_indigo_patch = createPatch(
    "left_back_indigo_patch",
    "left",
    0.28,
    -0.07,
    0.14,
    0.20,
    0.13,
    indigo_fur_swatchesMat
  );
  const left_lower_front_brown_patch = createPatch(
    "left_lower_front_brown_patch",
    "left",
    -0.23,
    -0.28,
    0.18,
    0.14,
    0.10,
    brown_fur_swatchesMat
  );
  const left_lower_back_purple_patch = createPatch(
    "left_lower_back_purple_patch",
    "left",
    0.24,
    -0.28,
    0.18,
    0.14,
    -0.10,
    purple_fur_swatchesMat
  );

  left_fur_patches.add(
    left_center_mauve_patch,
    left_upper_front_purple_patch,
    left_upper_back_brown_patch,
    left_front_russet_patch,
    left_back_indigo_patch,
    left_lower_front_brown_patch,
    left_lower_back_purple_patch
  );
  root.add(left_fur_patches);

  const tuftData = [[], [], [], [], []];

  function pushTuft(colorIndex, base, direction, length, width, code) {
    tuftData[colorIndex].push({
      base: base.clone(),
      direction: direction.clone(),
      length,
      width,
      code,
    });
  }

  function queuePatchTufts(
    face,
    centerU,
    centerV,
    halfW,
    halfH,
    rotation,
    colorIndex,
    phase
  ) {
    const rows = 12;
    const columns = 12;
    const cosR = Math.cos(rotation);
    const sinR = Math.sin(rotation);
    const normal =
      face === "top"
        ? new THREE.Vector3(0, 1, 0)
        : face === "front"
          ? new THREE.Vector3(0, 0, 1)
          : face === "back"
            ? new THREE.Vector3(0, 0, -1)
            : face === "right"
              ? new THREE.Vector3(1, 0, 0)
              : new THREE.Vector3(-1, 0, 0);
    const tangentU =
      face === "right" || face === "left"
        ? new THREE.Vector3(0, 0, 1)
        : new THREE.Vector3(1, 0, 0);
    const tangentV =
      face === "top"
        ? new THREE.Vector3(0, 0, 1)
        : new THREE.Vector3(0, 1, 0);

    for (let iy = 0; iy < rows; iy++) {
      for (let ix = 0; ix < columns; ix++) {
        const jitterU = 0.18 * Math.sin((ix + 1) * 1.71 + (iy + 1) * 2.13 + phase);
        const jitterV = 0.18 * Math.sin((ix + 1) * 2.37 - (iy + 1) * 1.29 + phase);
        const u = centerU + (-0.94 + 1.88 * (ix / (columns - 1))) * halfW + jitterU * halfW;
        const v = centerV + (-0.94 + 1.88 * (iy / (rows - 1))) * halfH + jitterV * halfH;
        const du = u - centerU;
        const dv = v - centerV;
        const ru = du * cosR - dv * sinR;
        const rv = du * sinR + dv * cosR;
        const nx = Math.min(1, Math.abs(ru / halfW));
        const ny = Math.min(1, Math.abs(rv / halfH));
        const radial = Math.max(nx, ny);
        if (radial > 1.03) continue;

        const edge = Math.max(0, (radial - 0.68) / 0.35);
        const base = normal
          .clone()
          .multiplyScalar(topSurface + 0.012)
          .add(tangentU.clone().multiplyScalar(u))
          .add(tangentV.clone().multiplyScalar(v));

        const flowU =
          (ru / halfW) * 0.62 +
          0.22 * Math.sin((v - centerV) * 18 + phase);
        const flowV =
          (rv / halfH) * 0.62 +
          0.22 * Math.sin((u - centerU) * 17 - phase);
        const direction = normal
          .clone()
          .multiplyScalar(0.90)
          .add(tangentU.clone().multiplyScalar(flowU))
          .add(tangentV.clone().multiplyScalar(flowV))
          .normalize();

        const code = (ix * 7 + iy * 11 + colorIndex + phase) % 17;
        const length =
          0.052 +
          0.026 * (1 - edge) +
          0.003 * ((ix * 5 + iy * 3 + phase) % 6);
        const width = 0.88 + 0.08 * ((ix + iy + phase) % 4);
        pushTuft(colorIndex, base, direction, length, width, code);
      }
    }
  }

  queuePatchTufts("top", 0.00, 0.00, 0.19, 0.16, 0.08, 1, 1);
  queuePatchTufts("top", -0.22, 0.25, 0.18, 0.16, -0.18, 3, 2);
  queuePatchTufts("top", 0.24, 0.24, 0.17, 0.16, 0.22, 0, 3);
  queuePatchTufts("top", 0.02, -0.27, 0.20, 0.15, -0.08, 4, 4);
  queuePatchTufts("top", -0.27, -0.16, 0.15, 0.18, 0.26, 2, 5);
  queuePatchTufts("top", 0.29, -0.12, 0.14, 0.18, -0.22, 3, 6);

  queuePatchTufts("front", 0.00, 0.02, 0.18, 0.21, -0.08, 1, 7);
  queuePatchTufts("front", -0.23, 0.22, 0.18, 0.16, 0.18, 2, 8);
  queuePatchTufts("front", 0.24, 0.22, 0.17, 0.16, -0.18, 0, 9);
  queuePatchTufts("front", -0.27, -0.08, 0.14, 0.20, -0.14, 3, 10);
  queuePatchTufts("front", 0.28, -0.06, 0.14, 0.20, 0.14, 4, 11);
  queuePatchTufts("front", -0.23, -0.28, 0.18, 0.14, 0.12, 0, 12);
  queuePatchTufts("front", 0.24, -0.28, 0.18, 0.14, -0.12, 3, 13);

  queuePatchTufts("back", 0.00, 0.02, 0.18, 0.21, 0.06, 0, 14);
  queuePatchTufts("back", -0.24, 0.22, 0.17, 0.16, -0.16, 3, 15);
  queuePatchTufts("back", 0.24, 0.22, 0.17, 0.16, 0.18, 2, 16);
  queuePatchTufts("back", -0.27, -0.10, 0.14, 0.20, 0.12, 1, 17);
  queuePatchTufts("back", 0.28, -0.08, 0.14, 0.20, -0.12, 3, 18);
  queuePatchTufts("back", -0.23, -0.28, 0.18, 0.14, -0.10, 4, 19);
  queuePatchTufts("back", 0.24, -0.28, 0.18, 0.14, 0.10, 0, 20);

  queuePatchTufts("right", 0.00, 0.02, 0.18, 0.21, 0.08, 2, 21);
  queuePatchTufts("right", -0.23, 0.22, 0.18, 0.16, -0.16, 0, 22);
  queuePatchTufts("right", 0.24, 0.22, 0.17, 0.16, 0.18, 1, 23);
  queuePatchTufts("right", -0.27, -0.09, 0.14, 0.20, 0.12, 3, 24);
  queuePatchTufts("right", 0.28, -0.07, 0.14, 0.20, -0.13, 4, 25);
  queuePatchTufts("right", -0.23, -0.28, 0.18, 0.14, -0.10, 3, 26);
  queuePatchTufts("right", 0.24, -0.28, 0.18, 0.14, 0.10, 0, 27);

  queuePatchTufts("left", 0.00, 0.02, 0.18, 0.21, -0.08, 4, 28);
  queuePatchTufts("left", -0.23, 0.22, 0.18, 0.16, 0.16, 2, 29);
  queuePatchTufts("left", 0.24, 0.22, 0.17, 0.16, -0.18, 0, 30);
  queuePatchTufts("left", -0.27, -0.09, 0.14, 0.20, -0.12, 1, 31);
  queuePatchTufts("left", 0.28, -0.07, 0.14, 0.20, 0.13, 3, 32);
  queuePatchTufts("left", -0.23, -0.28, 0.18, 0.14, 0.10, 0, 33);
  queuePatchTufts("left", 0.24, -0.28, 0.18, 0.14, -0.10, 2, 34);

  const baseFurMatrices = [];

  function queueBaseFur(base, direction, code) {
    const length = 0.038 + 0.0025 * (code % 7);
    const width = 0.86 + 0.07 * ((code * 3) % 5);
    baseFurMatrices.push({
      base: base.clone(),
      direction: direction.clone(),
      length,
      width,
      code,
    });
  }

  for (let i = 0; i < 48; i++) {
    const t = -0.95 + (1.9 * i) / 47;

    queueBaseFur(
      new THREE.Vector3(t, topSurface + 0.004, 0.445),
      new THREE.Vector3(0.12 * Math.sin(i * 1.7), 0.38, 0.92).normalize(),
      i
    );
    queueBaseFur(
      new THREE.Vector3(t, topSurface + 0.004, -0.445),
      new THREE.Vector3(-0.12 * Math.sin(i * 1.3), 0.38, -0.92).normalize(),
      i + 1
    );
    queueBaseFur(
      new THREE.Vector3(0.445, topSurface + 0.004, t),
      new THREE.Vector3(0.92, 0.38, 0.12 * Math.sin(i * 1.5)).normalize(),
      i + 2
    );
    queueBaseFur(
      new THREE.Vector3(-0.445, topSurface + 0.004, t),
      new THREE.Vector3(-0.92, 0.38, -0.12 * Math.sin(i * 1.9)).normalize(),
      i + 3
    );

    const sideDirection = new THREE.Vector3(
      0.10 * Math.sin(i * 1.4),
      -0.94,
      0.12 * Math.cos(i * 1.2)
    ).normalize();
    queueBaseFur(
      new THREE.Vector3(t, -0.455, 0.445),
      sideDirection.clone(),
      i + 4
    );
    queueBaseFur(
      new THREE.Vector3(t, -0.455, -0.445),
      sideDirection.clone(),
      i + 5
    );
    queueBaseFur(
      new THREE.Vector3(0.445, -0.455, t),
      sideDirection.clone(),
      i + 6
    );
    queueBaseFur(
      new THREE.Vector3(-0.445, -0.455, t),
      sideDirection.clone(),
      i + 7
    );
  }

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      for (let i = 0; i < 22; i++) {
        const t = -0.92 + (1.84 * i) / 21;
        queueBaseFur(
          new THREE.Vector3(
            sx * 0.445,
            t,
            sz * 0.445
          ),
          new THREE.Vector3(
            sx * 0.92,
            0.12 * Math.sin(i * 1.6),
            sz * 0.34
          ).normalize(),
          i + (sx > 0 ? 2 : 0) + (sz > 0 ? 1 : 0)
        );
      }
    }
  }

  for (const faceSign of [-1, 1]) {
    for (let iy = 0; iy < 12; iy++) {
      for (let ix = 0; ix < 12; ix++) {
        const jitterX = 0.16 * Math.sin((ix + 1) * 2.17 + (iy + 1) * 1.31);
        const jitterY = 0.16 * Math.sin((ix + 1) * 1.43 - (iy + 1) * 2.29);
        const u = -0.39 + (0.78 * ix) / 11 + jitterX * 0.025;
        const v = -0.39 + (0.78 * iy) / 11 + jitterY * 0.025;
        const flow =
          0.18 * Math.sin(u * 18 + v * 13 + faceSign * 0.8) +
          0.07 * Math.sin(u * 31 - v * 17);
        const code = ix * 5 + iy * 7 + (faceSign > 0 ? 1 : 3);

        if (faceSign > 0) {
          queueBaseFur(
            new THREE.Vector3(u, v, 0.465),
            new THREE.Vector3(flow, -0.12, 0.99).normalize(),
            code
          );
        } else {
          queueBaseFur(
            new THREE.Vector3(u, v, -0.465),
            new THREE.Vector3(-flow, -0.12, -0.99).normalize(),
            code
          );
        }
      }
    }
  }

  for (const faceSign of [-1, 1]) {
    for (let iy = 0; iy < 12; iy++) {
      for (let ix = 0; ix < 12; ix++) {
        const jitterU = 0.16 * Math.sin((ix + 1) * 1.83 + (iy + 1) * 2.41);
        const jitterY = 0.16 * Math.sin((ix + 1) * 2.09 - (iy + 1) * 1.37);
        const u = -0.39 + (0.78 * ix) / 11 + jitterU * 0.025;
        const v = -0.39 + (0.78 * iy) / 11 + jitterY * 0.025;
        const flow =
          0.18 * Math.sin(u * 17 - v * 15 + faceSign) +
          0.07 * Math.sin(u * 27 + v * 19);
        const code = ix * 7 + iy * 3 + (faceSign > 0 ? 2 : 4);

        if (faceSign > 0) {
          queueBaseFur(
            new THREE.Vector3(0.465, v, u),
            new THREE.Vector3(0.99, -0.12, flow).normalize(),
            code
          );
        } else {
          queueBaseFur(
            new THREE.Vector3(-0.465, v, u),
            new THREE.Vector3(-0.99, -0.12, -flow).normalize(),
            code
          );
        }
      }
    }
  }

  for (let iz = 0; iz < 17; iz++) {
    for (let ix = 0; ix < 17; ix++) {
      const jitterX = 0.15 * Math.sin((ix + 1) * 1.73 + (iz + 1) * 2.11);
      const jitterZ = 0.15 * Math.sin((ix + 1) * 2.31 - (iz + 1) * 1.47);
      const u = -0.39 + (0.78 * ix) / 16 + jitterX * 0.024;
      const v = -0.39 + (0.78 * iz) / 16 + jitterZ * 0.024;
      const du = u;
      const dv = v;
      const radial = Math.sqrt(du * du + dv * dv);
      if (radial > 0.405) continue;

      const angle = Math.atan2(dv, du);
      const radialFlow = 0.15 * Math.sin(angle * 7) + dv * 0.18;
      const direction = new THREE.Vector3(
        du * 0.72 - dv * radialFlow,
        0.98,
        dv * 0.72 + du * radialFlow
      ).normalize();
      const code = ix * 11 + iz * 7;
      const length = 0.043 + 0.014 * (1 - radial / 0.42);

      if (iz < 8) {
        pushTuft(3, new THREE.Vector3(u, topSurface + 0.009, v), direction, length, 0.96, code);
      } else if (iz < 11) {
        pushTuft(0, new THREE.Vector3(u, topSurface + 0.009, v), direction, length, 0.96, code);
      } else if (iz < 14) {
        pushTuft(2, new THREE.Vector3(u, topSurface + 0.009, v), direction, length, 0.96, code);
      } else {
        pushTuft(1, new THREE.Vector3(u, topSurface + 0.009, v), direction, length, 0.96, code);
      }
    }
  }

  for (let iy = 0; iy < 11; iy++) {
    for (let ix = 0; ix < 11; ix++) {
      const jitterX = 0.15 * Math.sin((ix + 1) * 1.57 + (iy + 1) * 2.03);
      const jitterY = 0.15 * Math.sin((ix + 1) * 2.27 - (iy + 1) * 1.49);
      const u = -0.37 + (0.74 * ix) / 10 + jitterX * 0.026;
      const v = -0.36 + (0.72 * iy) / 10 + jitterY * 0.026;
      const du = u;
      const dv = v - 0.02;
      const radial = Math.sqrt(du * du + dv * dv);
      if (radial > 0.39) continue;

      const angle = Math.atan2(dv, du);
      const flow = 0.16 * Math.sin(angle * 6 + 0.5) + dv * 0.13;
      const direction = new THREE.Vector3(
        du * 0.65 - dv * flow,
        dv * 0.65 + du * flow,
        0.98
      ).normalize();
      const code = ix * 13 + iy * 7;
      const length = 0.047 + 0.015 * (1 - radial / 0.40);

      if (ix < 3) {
        pushTuft(3, new THREE.Vector3(u, v, sideSurface + 0.009), direction, length, 0.96, code);
      } else if (ix < 6) {
        pushTuft(2, new THREE.Vector3(u, v, sideSurface + 0.009), direction, length, 0.96, code);
      } else if (ix < 9) {
        pushTuft(1, new THREE.Vector3(u, v, sideSurface + 0.009), direction, length, 0.96, code);
      } else {
        pushTuft(0, new THREE.Vector3(u, v, sideSurface + 0.009), direction, length, 0.96, code);
      }
    }
  }

  const fur_tuftGeom = new THREE.CylinderGeometry(
    0.001,
    0.0035,
    1,
    4,
    1,
    false
  );

  function createTuftInstances(name, data, material) {
    const instances = new THREE.InstancedMesh(
      fur_tuftGeom,
      material,
      data.length
    );
    instances.name = name;

    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const center = new THREE.Vector3();
    const scale = new THREE.Vector3();

    for (let i = 0; i < data.length; i++) {
      const tuft = data[i];
      quaternion.setFromUnitVectors(up, tuft.direction);
      center
        .copy(tuft.base)
        .addScaledVector(tuft.direction, tuft.length * 0.5);
      scale.set(tuft.width, tuft.length, tuft.width);
      matrix.compose(center, quaternion, scale);
      instances.setMatrixAt(i, matrix);
    }

    instances.instanceMatrix.needsUpdate = true;
    instances.frustumCulled = false;
    return instances;
  }

  const brown_fur_tufts = createTuftInstances(
    "brown_fur_tufts",
    tuftData[0],
    brown_fur_tuftsMat
  );
  const russet_fur_tufts = createTuftInstances(
    "russet_fur_tufts",
    tuftData[1],
    russet_fur_tuftsMat
  );
  const purple_fur_tufts = createTuftInstances(
    "purple_fur_tufts",
    tuftData[2],
    purple_fur_tuftsMat
  );
  const indigo_fur_tufts = createTuftInstances(
    "indigo_fur_tufts",
    tuftData[3],
    indigo_fur_tuftsMat
  );
  const mauve_fur_tufts = createTuftInstances(
    "mauve_fur_tufts",
    tuftData[4],
    mauve_fur_tuftsMat
  );
  const base_fur_tufts = createTuftInstances(
    "base_fur_tufts",
    baseFurMatrices,
    cushion_bodyMat
  );

  root.add(
    brown_fur_tufts,
    russet_fur_tufts,
    purple_fur_tufts,
    indigo_fur_tufts,
    mauve_fur_tufts,
    base_fur_tufts
  );

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