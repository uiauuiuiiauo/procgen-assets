export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "patterned_wide_brim_hat";

  const brim_group = new THREE.Group();
  brim_group.name = "brim_group";
  root.add(brim_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const bow_group = new THREE.Group();
  bow_group.name = "bow_group";
  root.add(bow_group);

  const brimMat = new THREE.MeshStandardMaterial({
    color: 0x252b31,
    metalness: 0.0,
    roughness: 0.95
  });
  const crownMat = brimMat;
  const bindingMat = new THREE.MeshStandardMaterial({
    color: 0x594337,
    metalness: 0.0,
    roughness: 0.95
  });
  const hat_bandMat = bindingMat;
  const bowMat = bindingMat;
  const bow_darkMat = new THREE.MeshStandardMaterial({
    color: 0x3d2b24,
    metalness: 0.0,
    roughness: 0.95
  });

  function makePrintMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.95,
      side: THREE.DoubleSide
    });
  }

  const red_printMat = makePrintMaterial(0xd94848);
  const coral_printMat = makePrintMaterial(0xf26762);
  const orange_printMat = makePrintMaterial(0xe97838);
  const yellow_printMat = makePrintMaterial(0xf2cf59);
  const teal_printMat = makePrintMaterial(0x49aa91);
  const mint_printMat = makePrintMaterial(0xa6d3a4);
  const blue_printMat = makePrintMaterial(0x3970b8);
  const pink_printMat = makePrintMaterial(0xd77b9e);
  const purple_printMat = makePrintMaterial(0x7762a8);
  const cream_printMat = makePrintMaterial(0xe5d99d);
  const dark_printMat = makePrintMaterial(0x202328);

  const brimA = 1.75;
  const brimB = 1.08;
  const brimThickness = 0.065;

  function brimTopAt(x, z) {
    const nx = x / brimA;
    const nz = z / brimB;
    const r = Math.min(1, Math.sqrt(nx * nx + nz * nz));
    const angle = Math.atan2(nz, nx);
    return 0.02 - 0.035 * r * r +
      0.012 * Math.cos(3 * angle) * r * r * r;
  }

  function makeBrimGeometry() {
    const segments = 72;
    const rings = 10;
    const positions = [];
    const indices = [];

    positions.push(0, brimTopAt(0, 0), 0);
    for (let ring = 1; ring <= rings; ring++) {
      const r = ring / rings;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const x = Math.cos(angle) * brimA * r;
        const z = Math.sin(angle) * brimB * r;
        positions.push(x, brimTopAt(x, z), z);
      }
    }

    const bottomCenter = 1 + rings * segments;
    positions.push(0, brimTopAt(0, 0) - brimThickness, 0);
    for (let ring = 1; ring <= rings; ring++) {
      const r = ring / rings;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const x = Math.cos(angle) * brimA * r;
        const z = Math.sin(angle) * brimB * r;
        positions.push(x, brimTopAt(x, z) - brimThickness, z);
      }
    }

    function topIndex(ring, i) {
      return 1 + (ring - 1) * segments + (i % segments);
    }

    function bottomIndex(ring, i) {
      return bottomCenter + 1 + (ring - 1) * segments + (i % segments);
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(0, topIndex(1, next), topIndex(1, i));
      indices.push(bottomCenter, bottomIndex(1, i), bottomIndex(1, next));
    }

    for (let ring = 1; ring < rings; ring++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = topIndex(ring, i);
        const b = topIndex(ring + 1, i);
        const c = topIndex(ring + 1, next);
        const d = topIndex(ring, next);
        indices.push(a, d, c, a, c, b);

        const ba = bottomIndex(ring, i);
        const bb = bottomIndex(ring + 1, i);
        const bc = bottomIndex(ring + 1, next);
        const bd = bottomIndex(ring, next);
        indices.push(ba, bb, bc, ba, bc, bd);
      }
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const top = topIndex(rings, i);
      const topNext = topIndex(rings, next);
      const bottom = bottomIndex(rings, i);
      const bottomNext = bottomIndex(rings, next);
      indices.push(top, bottomNext, bottom);
      indices.push(top, topNext, bottomNext);
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

  const brimGeom = makeBrimGeometry();
  const brim = new THREE.Mesh(brimGeom, brimMat);
  brim.name = "brim";
  brim_group.add(brim);

  const outerBindingPoints = [];
  const innerBindingPoints = [];
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    const outerX = Math.cos(angle) * brimA;
    const outerZ = Math.sin(angle) * brimB;
    outerBindingPoints.push(new THREE.Vector3(
      outerX,
      brimTopAt(outerX, outerZ) - brimThickness * 0.42,
      outerZ
    ));

    const innerX = Math.cos(angle) * brimA * 0.925;
    const innerZ = Math.sin(angle) * brimB * 0.925;
    innerBindingPoints.push(new THREE.Vector3(
      innerX,
      brimTopAt(innerX, innerZ) + 0.008,
      innerZ
    ));
  }

  const brim_outer_bindingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(outerBindingPoints, true, "centripetal"),
    108,
    0.047,
    8,
    true
  );
  const brim_outer_bindingMat = bindingMat;
  const brim_outer_binding = new THREE.Mesh(
    brim_outer_bindingGeom,
    brim_outer_bindingMat
  );
  brim_outer_binding.name = "brim_outer_binding";
  brim_group.add(brim_outer_binding);

  const brim_inner_bindingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(innerBindingPoints, true, "centripetal"),
    108,
    0.018,
    6,
    true
  );
  const brim_inner_bindingMat = bindingMat;
  const brim_inner_binding = new THREE.Mesh(
    brim_inner_bindingGeom,
    brim_inner_bindingMat
  );
  brim_inner_binding.name = "brim_inner_binding";
  brim_group.add(brim_inner_binding);

  const crownBaseY = 0.02;
  const crownProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.82, 0.00),
    new THREE.Vector2(0.84, 0.08),
    new THREE.Vector2(0.83, 0.28),
    new THREE.Vector2(0.79, 0.52),
    new THREE.Vector2(0.70, 0.76),
    new THREE.Vector2(0.56, 0.96),
    new THREE.Vector2(0.35, 1.10),
    new THREE.Vector2(0.14, 1.17),
    new THREE.Vector2(0.00, 1.18)
  ];
  const crownGeom = new THREE.LatheGeometry(crownProfile, 64);
  const crown = new THREE.Mesh(crownGeom, crownMat);
  crown.name = "crown";
  crown.position.y = crownBaseY;
  crown.scale.z = 0.84;
  crown_group.add(crown);

  const hat_bandGeom = new THREE.CylinderGeometry(
    0.81,
    0.85,
    0.30,
    64,
    1,
    true
  );
  const hat_band = new THREE.Mesh(hat_bandGeom, hat_bandMat);
  hat_band.name = "hat_band";
  hat_band.position.y = 0.19;
  hat_band.scale.z = 0.84;
  crown_group.add(hat_band);

  function makeEllipseCurve(radiusX, radiusZ, y, pointCount) {
    const points = [];
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radiusX,
        y,
        Math.sin(angle) * radiusZ
      ));
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const hat_band_top_edgeGeom = new THREE.TubeGeometry(
    makeEllipseCurve(0.81, 0.68, 0.34, 56),
    72,
    0.012,
    6,
    true
  );
  const hat_band_top_edgeMat = bindingMat;
  const hat_band_top_edge = new THREE.Mesh(
    hat_band_top_edgeGeom,
    hat_band_top_edgeMat
  );
  hat_band_top_edge.name = "hat_band_top_edge";
  crown_group.add(hat_band_top_edge);

  const hat_band_bottom_edgeGeom = new THREE.TubeGeometry(
    makeEllipseCurve(0.85, 0.705, 0.04, 56),
    72,
    0.012,
    6,
    true
  );
  const hat_band_bottom_edgeMat = bindingMat;
  const hat_band_bottom_edge = new THREE.Mesh(
    hat_band_bottom_edgeGeom,
    hat_band_bottom_edgeMat
  );
  hat_band_bottom_edge.name = "hat_band_bottom_edge";
  crown_group.add(hat_band_bottom_edge);

  const circleGeom = new THREE.CircleGeometry(1, 28);

  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(-0.5, -0.45);
  triangleShape.lineTo(0.5, 0);
  triangleShape.lineTo(-0.5, 0.45);
  triangleShape.closePath();
  const triangleGeom = new THREE.ShapeGeometry(triangleShape);

  const brim_print_group = new THREE.Group();
  brim_print_group.name = "brim_print_group";
  brim_group.add(brim_print_group);

  function addBrimDecal(
    name,
    geometry,
    material,
    x,
    z,
    scaleX,
    scaleZ,
    rotation,
    layer
  ) {
    const normal = new THREE.Vector3(
      0.07 * x / (brimA * brimA),
      1,
      0.07 * z / (brimB * brimB)
    ).normalize();

    const decal = new THREE.Mesh(geometry, material);
    decal.name = name;
    decal.position.set(x, brimTopAt(x, z) + 0.008 + layer, z);
    decal.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    decal.rotateZ(rotation);
    decal.scale.set(scaleX, scaleZ, 1);
    brim_print_group.add(decal);
    return decal;
  }

  const brim_mint_patch = addBrimDecal(
    "brim_mint_patch", circleGeom, mint_printMat,
    -1.12, -0.32, 0.27, 0.17, 0.25, 0
  );
  const brim_purple_patch = addBrimDecal(
    "brim_purple_patch", circleGeom, purple_printMat,
    -0.88, -0.24, 0.19, 0.14, -0.2, 0.002
  );
  const brim_blue_edge_patch = addBrimDecal(
    "brim_blue_edge_patch", circleGeom, blue_printMat,
    -1.52, 0.08, 0.075, 0.18, -0.1, 0.003
  );
  const brim_red_patch = addBrimDecal(
    "brim_red_patch", circleGeom, red_printMat,
    -0.48, 0.66, 0.31, 0.22, -0.15, 0
  );
  const brim_yellow_face = addBrimDecal(
    "brim_yellow_face", circleGeom, yellow_printMat,
    -0.20, 0.55, 0.25, 0.17, 0.15, 0.002
  );
  const brim_yellow_left_eye = addBrimDecal(
    "brim_yellow_left_eye", circleGeom, dark_printMat,
    -0.27, 0.51, 0.022, 0.028, 0, 0.014
  );
  const brim_yellow_right_eye = addBrimDecal(
    "brim_yellow_right_eye", circleGeom, dark_printMat,
    -0.12, 0.51, 0.022, 0.028, 0, 0.014
  );
  const brim_yellow_smile = addBrimDecal(
    "brim_yellow_smile", circleGeom, dark_printMat,
    -0.19, 0.62, 0.065, 0.012, 0.1, 0.015
  );

  const brim_blue_animal_head = addBrimDecal(
    "brim_blue_animal_head", circleGeom, blue_printMat,
    0.20, 0.72, 0.18, 0.13, -0.1, 0
  );
  const brim_blue_animal_body = addBrimDecal(
    "brim_blue_animal_body", circleGeom, blue_printMat,
    0.40, 0.78, 0.19, 0.10, 0.2, 0
  );
  const brim_blue_left_ear = addBrimDecal(
    "brim_blue_left_ear", triangleGeom, blue_printMat,
    0.08, 0.62, 0.12, 0.12, -0.25, 0.001
  );
  const brim_blue_right_ear = addBrimDecal(
    "brim_blue_right_ear", triangleGeom, blue_printMat,
    0.31, 0.63, 0.12, 0.12, 0.35, 0.001
  );
  const brim_blue_eye = addBrimDecal(
    "brim_blue_eye", circleGeom, dark_printMat,
    0.16, 0.70, 0.025, 0.03, 0, 0.014
  );

  const brim_orange_animal_head = addBrimDecal(
    "brim_orange_animal_head", circleGeom, orange_printMat,
    0.82, 0.62, 0.23, 0.17, -0.2, 0
  );
  const brim_orange_animal_body = addBrimDecal(
    "brim_orange_animal_body", circleGeom, orange_printMat,
    1.08, 0.69, 0.31, 0.19, 0.1, 0
  );
  const brim_orange_left_ear = addBrimDecal(
    "brim_orange_left_ear", triangleGeom, orange_printMat,
    0.71, 0.51, 0.14, 0.14, -0.35, 0.001
  );
  const brim_orange_right_ear = addBrimDecal(
    "brim_orange_right_ear", triangleGeom, orange_printMat,
    0.93, 0.49, 0.14, 0.14, 0.35, 0.001
  );
  const brim_orange_eye = addBrimDecal(
    "brim_orange_eye", circleGeom, dark_printMat,
    0.78, 0.60, 0.028, 0.035, 0, 0.014
  );
  const brim_orange_muzzle = addBrimDecal(
    "brim_orange_muzzle", circleGeom, cream_printMat,
    0.87, 0.67, 0.075, 0.055, 0, 0.013
  );

  const brim_red_character_body = addBrimDecal(
    "brim_red_character_body", circleGeom, red_printMat,
    -1.03, 0.48, 0.29, 0.15, 0.15, 0
  );
  const brim_red_character_head = addBrimDecal(
    "brim_red_character_head", circleGeom, red_printMat,
    -1.27, 0.42, 0.14, 0.12, 0, 0.001
  );
  const brim_red_character_arm = addBrimDecal(
    "brim_red_character_arm", circleGeom, red_printMat,
    -0.87, 0.37, 0.18, 0.045, -0.45, 0
  );
  const brim_red_character_eye = addBrimDecal(
    "brim_red_character_eye", circleGeom, dark_printMat,
    -1.30, 0.44, 0.022, 0.026, 0, 0.014
  );
  const brim_red_character_button_one = addBrimDecal(
    "brim_red_character_button_one", circleGeom, cream_printMat,
    -1.08, 0.47, 0.018, 0.018, 0, 0.014
  );
  const brim_red_character_button_two = addBrimDecal(
    "brim_red_character_button_two", circleGeom, cream_printMat,
    -0.98, 0.51, 0.018, 0.018, 0, 0.014
  );

  const brim_pink_patch = addBrimDecal(
    "brim_pink_patch", circleGeom, pink_printMat,
    1.30, 0.20, 0.26, 0.13, 0.2, 0
  );
  const brim_pink_spot = addBrimDecal(
    "brim_pink_spot", circleGeom, dark_printMat,
    1.24, 0.18, 0.022, 0.025, 0, 0.014
  );
  const brim_green_patch = addBrimDecal(
    "brim_green_patch", circleGeom, teal_printMat,
    1.45, 0.40, 0.20, 0.09, -0.15, 0
  );
  const brim_orange_edge_patch = addBrimDecal(
    "brim_orange_edge_patch", circleGeom, orange_printMat,
    1.48, -0.10, 0.18, 0.10, 0.3, 0
  );
  const brim_blue_small_patch = addBrimDecal(
    "brim_blue_small_patch", circleGeom, blue_printMat,
    1.34, 0.58, 0.09, 0.07, 0, 0.002
  );

  const brim_teal_front_patch = addBrimDecal(
    "brim_teal_front_patch", circleGeom, teal_printMat,
    0.02, 0.98, 0.24, 0.08, 0.05, 0
  );
  const brim_mint_sprig = addBrimDecal(
    "brim_mint_sprig", circleGeom, mint_printMat,
    0.48, 0.90, 0.07, 0.025, 0.75, 0.002
  );

  const crown_print_group = new THREE.Group();
  crown_print_group.name = "crown_print_group";
  crown_group.add(crown_print_group);

  function crownRadiusAt(y) {
    const localY = y - crownBaseY;
    if (localY <= 0.28) return 0.83;
    if (localY <= 0.52) return 0.83 - (localY - 0.28) / 0.24 * 0.04;
    if (localY <= 0.76) return 0.79 - (localY - 0.52) / 0.24 * 0.09;
    if (localY <= 0.96) return 0.70 - (localY - 0.76) / 0.20 * 0.14;
    if (localY <= 1.10) return 0.56 - (localY - 0.96) / 0.14 * 0.21;
    return Math.max(0.10, 0.35 - (localY - 1.10) / 0.08 * 0.25);
  }

  function addCrownDecal(
    name,
    geometry,
    material,
    angle,
    y,
    scaleX,
    scaleY,
    rotation,
    extra
  ) {
    const radius = crownRadiusAt(y);
    const radiusZ = radius * 0.84;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const normal = new THREE.Vector3(
      cosAngle / radius,
      0,
      sinAngle / radiusZ
    ).normalize();

    const decal = new THREE.Mesh(geometry, material);
    decal.name = name;
    decal.position.set(
      cosAngle * radius + normal.x * extra,
      y,
      sinAngle * radiusZ + normal.z * extra
    );
    decal.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    decal.rotateZ(rotation);
    decal.scale.set(scaleX, scaleY, 1);
    crown_print_group.add(decal);
    return decal;
  }

  const crown_teal_patch = addCrownDecal(
    "crown_teal_patch", circleGeom, teal_printMat,
    1.36, 0.72, 0.25, 0.23, -0.15, 0.008
  );
  const crown_teal_top_panel = addCrownDecal(
    "crown_teal_top_panel", circleGeom, cream_printMat,
    1.36, 0.83, 0.15, 0.085, -0.1, 0.014
  );
  const crown_teal_left_leaf = addCrownDecal(
    "crown_teal_left_leaf", circleGeom, mint_printMat,
    1.57, 0.72, 0.075, 0.035, 0.75, 0.014
  );
  const crown_teal_right_leaf = addCrownDecal(
    "crown_teal_right_leaf", circleGeom, mint_printMat,
    1.16, 0.68, 0.075, 0.035, -0.75, 0.014
  );
  const crown_teal_eye = addCrownDecal(
    "crown_teal_eye", circleGeom, dark_printMat,
    1.28, 0.77, 0.021, 0.026, 0, 0.022
  );
  const crown_teal_small_eye = addCrownDecal(
    "crown_teal_small_eye", circleGeom, dark_printMat,
    1.48, 0.83, 0.016, 0.020, 0, 0.022
  );

  const crown_coral_patch = addCrownDecal(
    "crown_coral_patch", circleGeom, coral_printMat,
    2.18, 0.79, 0.14, 0.27, -0.15, 0.008
  );
  const crown_coral_spot_one = addCrownDecal(
    "crown_coral_spot_one", circleGeom, cream_printMat,
    2.18, 0.84, 0.025, 0.045, 0.2, 0.017
  );
  const crown_coral_spot_two = addCrownDecal(
    "crown_coral_spot_two", circleGeom, cream_printMat,
    2.23, 0.72, 0.018, 0.030, -0.2, 0.017
  );

  const crown_yellow_patch = addCrownDecal(
    "crown_yellow_patch", circleGeom, yellow_printMat,
    1.91, 0.99, 0.14, 0.085, 0.25, 0.008
  );
  const crown_yellow_eye_large = addCrownDecal(
    "crown_yellow_eye_large", circleGeom, dark_printMat,
    1.96, 1.00, 0.025, 0.030, 0, 0.018
  );
  const crown_yellow_eye_small = addCrownDecal(
    "crown_yellow_eye_small", circleGeom, dark_printMat,
    1.84, 0.98, 0.014, 0.017, 0, 0.018
  );

  const crown_red_snake_body = addCrownDecal(
    "crown_red_snake_body", circleGeom, red_printMat,
    0.72, 0.55, 0.065, 0.20, -0.25, 0.008
  );
  const crown_red_snake_head = addCrownDecal(
    "crown_red_snake_head", circleGeom, red_printMat,
    0.78, 0.77, 0.11, 0.10, 0, 0.009
  );
  const crown_red_snake_pupil = addCrownDecal(
    "crown_red_snake_pupil", circleGeom, dark_printMat,
    0.78, 0.78, 0.025, 0.030, 0, 0.020
  );
  const crown_red_snake_tail = addCrownDecal(
    "crown_red_snake_tail", circleGeom, orange_printMat,
    0.82, 0.34, 0.045, 0.09, -0.45, 0.009
  );

  const crown_mint_leaf_one = addCrownDecal(
    "crown_mint_leaf_one", circleGeom, mint_printMat,
    0.47, 0.78, 0.045, 0.09, -0.55, 0.008
  );
  const crown_mint_leaf_two = addCrownDecal(
    "crown_mint_leaf_two", circleGeom, mint_printMat,
    0.39, 0.70, 0.035, 0.07, 0.55, 0.008
  );
  const crown_orange_top_patch = addCrownDecal(
    "crown_orange_top_patch", circleGeom, orange_printMat,
    0.88, 1.04, 0.12, 0.045, 0.25, 0.008
  );
  const crown_blue_top_patch = addCrownDecal(
    "crown_blue_top_patch", circleGeom, blue_printMat,
    2.48, 1.02, 0.09, 0.035, -0.2, 0.008
  );

  const bowLoopShape = new THREE.Shape();
  bowLoopShape.moveTo(0.02, 0.02);
  bowLoopShape.bezierCurveTo(0.16, 0.15, 0.35, 0.35, 0.61, 0.31);
  bowLoopShape.bezierCurveTo(0.72, 0.18, 0.69, -0.16, 0.55, -0.30);
  bowLoopShape.bezierCurveTo(0.36, -0.31, 0.16, -0.13, 0.02, 0.02);
  bowLoopShape.closePath();

  const bow_left_loopGeom = new THREE.ExtrudeGeometry(bowLoopShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  const bow_left_loopMat = bowMat;
  const bow_left_loop = new THREE.Mesh(
    bow_left_loopGeom,
    bow_left_loopMat
  );
  bow_left_loop.name = "bow_left_loop";
  bow_left_loop.rotation.z = -0.035;
  bow_left_loop.scale.x = -1;
  bow_left_loop.position.set(0, 0.22, 0.70);
  bow_group.add(bow_left_loop);

  const bow_right_loopGeom = bow_left_loopGeom;
  const bow_right_loopMat = bowMat;
  const bow_right_loop = new THREE.Mesh(
    bow_right_loopGeom,
    bow_right_loopMat
  );
  bow_right_loop.name = "bow_right_loop";
  bow_right_loop.rotation.z = 0.045;
  bow_right_loop.position.set(0, 0.22, 0.70);
  bow_group.add(bow_right_loop);

  const bowTailShape = new THREE.Shape();
  bowTailShape.moveTo(0.02, -0.02);
  bowTailShape.bezierCurveTo(0.13, -0.04, 0.30, -0.18, 0.47, -0.31);
  bowTailShape.lineTo(0.29, -0.34);
  bowTailShape.lineTo(0.20, -0.25);
  bowTailShape.lineTo(0.02, -0.06);
  bowTailShape.closePath();

  const bow_left_tailGeom = new THREE.ExtrudeGeometry(bowTailShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  const bow_left_tailMat = bowMat;
  const bow_left_tail = new THREE.Mesh(
    bow_left_tailGeom,
    bow_left_tailMat
  );
  bow_left_tail.name = "bow_left_tail";
  bow_left_tail.scale.x = -1;
  bow_left_tail.position.set(0, 0.21, 0.675);
  bow_group.add(bow_left_tail);

  const bow_right_tailGeom = bow_left_tailGeom;
  const bow_right_tailMat = bowMat;
  const bow_right_tail = new THREE.Mesh(
    bow_right_tailGeom,
    bow_right_tailMat
  );
  bow_right_tail.name = "bow_right_tail";
  bow_right_tail.position.set(0, 0.21, 0.675);
  bow_group.add(bow_right_tail);

  const bow_knotGeom = new THREE.SphereGeometry(1, 24, 16);
  const bow_knotMat = bowMat;
  const bow_knot = new THREE.Mesh(bow_knotGeom, bow_knotMat);
  bow_knot.name = "bow_knot";
  bow_knot.position.set(0, 0.22, 0.82);
  bow_knot.scale.set(0.16, 0.18, 0.115);
  bow_group.add(bow_knot);

  function addBowCrease(name, points) {
    const creaseGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      16,
      0.010,
      6,
      false
    );
    const crease = new THREE.Mesh(creaseGeom, bow_darkMat);
    crease.name = name;
    bow_group.add(crease);
    return crease;
  }

  const bow_left_upper_crease = addBowCrease(
    "bow_left_upper_crease",
    [
      new THREE.Vector3(-0.08, 0.27, 0.825),
      new THREE.Vector3(-0.28, 0.38, 0.823),
      new THREE.Vector3(-0.53, 0.45, 0.817)
    ]
  );
  const bow_left_lower_crease = addBowCrease(
    "bow_left_lower_crease",
    [
      new THREE.Vector3(-0.08, 0.17, 0.825),
      new THREE.Vector3(-0.28, 0.05, 0.823),
      new THREE.Vector3(-0.52, -0.04, 0.817)
    ]
  );
  const bow_right_upper_crease = addBowCrease(
    "bow_right_upper_crease",
    [
      new THREE.Vector3(0.08, 0.28, 0.825),
      new THREE.Vector3(0.29, 0.40, 0.823),
      new THREE.Vector3(0.55, 0.47, 0.817)
    ]
  );
  const bow_right_lower_crease = addBowCrease(
    "bow_right_lower_crease",
    [
      new THREE.Vector3(0.08, 0.17, 0.825),
      new THREE.Vector3(0.29, 0.07, 0.823),
      new THREE.Vector3(0.53, -0.01, 0.817)
    ]
  );

  function fitToUnitCube(rootObject) {
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    rootObject.scale.setScalar(scale);
    rootObject.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}