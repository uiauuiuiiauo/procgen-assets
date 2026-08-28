export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rice_and_fried_egg_bowl";

  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0xf4f5f2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const rice_darkMat = new THREE.MeshStandardMaterial({
    color: 0x76584a,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rice_mediumMat = new THREE.MeshStandardMaterial({
    color: 0x987360,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rice_lightMat = new THREE.MeshStandardMaterial({
    color: 0xb98f75,
    metalness: 0.0,
    roughness: 0.7,
  });
  const onion_caramelMat = new THREE.MeshStandardMaterial({
    color: 0xa65b27,
    metalness: 0.0,
    roughness: 0.7,
  });
  const onion_goldMat = new THREE.MeshStandardMaterial({
    color: 0xd58a2e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const onion_paleMat = new THREE.MeshStandardMaterial({
    color: 0xe0ad58,
    metalness: 0.0,
    roughness: 0.7,
  });
  const herbMat = new THREE.MeshStandardMaterial({
    color: 0x506b25,
    metalness: 0.0,
    roughness: 0.8,
  });
  const egg_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1df,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const egg_crispMat = new THREE.MeshStandardMaterial({
    color: 0xb97835,
    metalness: 0.0,
    roughness: 0.75,
  });
  const egg_darkMat = new THREE.MeshStandardMaterial({
    color: 0x75401f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const yolkMat = new THREE.MeshStandardMaterial({
    color: 0xf28a00,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yolk_rimMat = new THREE.MeshStandardMaterial({
    color: 0xe86e08,
    metalness: 0.0,
    roughness: 0.35,
  });
  const yolk_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffcf72,
    metalness: 0.0,
    roughness: 0.3,
  });
  const white_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.4,
  });

  const bowlProfile = [
    new THREE.Vector2(0.00, -0.08),
    new THREE.Vector2(0.58, -0.08),
    new THREE.Vector2(0.88, -0.01),
    new THREE.Vector2(1.08, 0.12),
    new THREE.Vector2(1.22, 0.30),
    new THREE.Vector2(1.27, 0.43),
    new THREE.Vector2(1.25, 0.48),
    new THREE.Vector2(1.18, 0.50),
    new THREE.Vector2(1.08, 0.42),
    new THREE.Vector2(0.90, 0.28),
    new THREE.Vector2(0.66, 0.18),
    new THREE.Vector2(0.35, 0.14),
    new THREE.Vector2(0.00, 0.13),
  ];
  const bowlGeom = new THREE.LatheGeometry(bowlProfile, 64);
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.name = "bowl";
  root.add(bowl);

  const bowl_rimGeom = new THREE.TorusGeometry(1.215, 0.045, 12, 64);
  const bowl_rim = new THREE.Mesh(bowl_rimGeom, bowlMat);
  bowl_rim.name = "bowl_rim";
  bowl_rim.rotation.x = Math.PI / 2;
  bowl_rim.position.y = 0.465;
  root.add(bowl_rim);

  const inner_rimGeom = new THREE.TorusGeometry(1.105, 0.018, 8, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, bowlMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 0.405;
  root.add(inner_rim);

  const rice_group = new THREE.Group();
  rice_group.name = "rice_group";
  root.add(rice_group);

  const rice_moundGeom = new THREE.SphereGeometry(1, 32, 18);
  const rice_mound = new THREE.Mesh(rice_moundGeom, rice_darkMat);
  rice_mound.name = "rice_mound";
  rice_mound.position.set(-0.08, 0.38, -0.02);
  rice_mound.scale.set(0.82, 0.30, 0.68);
  rice_group.add(rice_mound);

  const rice_left_moundGeom = new THREE.SphereGeometry(1, 24, 14);
  const rice_left_mound = new THREE.Mesh(rice_left_moundGeom, rice_mediumMat);
  rice_left_mound.name = "rice_left_mound";
  rice_left_mound.position.set(-0.40, 0.43, -0.02);
  rice_left_mound.scale.set(0.52, 0.24, 0.50);
  rice_group.add(rice_left_mound);

  const rice_rear_moundGeom = new THREE.SphereGeometry(1, 24, 14);
  const rice_rear_mound = new THREE.Mesh(rice_rear_moundGeom, rice_darkMat);
  rice_rear_mound.name = "rice_rear_mound";
  rice_rear_mound.position.set(-0.04, 0.43, -0.34);
  rice_rear_mound.scale.set(0.60, 0.23, 0.40);
  rice_group.add(rice_rear_mound);

  const rice_front_moundGeom = new THREE.SphereGeometry(1, 24, 14);
  const rice_front_mound = new THREE.Mesh(rice_front_moundGeom, rice_mediumMat);
  rice_front_mound.name = "rice_front_mound";
  rice_front_mound.position.set(-0.12, 0.42, 0.31);
  rice_front_mound.scale.set(0.58, 0.22, 0.40);
  rice_group.add(rice_front_mound);

  const rice_grainProfile = [
    new THREE.Vector2(0.000, -0.075),
    new THREE.Vector2(0.018, -0.068),
    new THREE.Vector2(0.024, -0.030),
    new THREE.Vector2(0.024, 0.025),
    new THREE.Vector2(0.016, 0.062),
    new THREE.Vector2(0.000, 0.075),
  ];
  const rice_grainGeom = new THREE.LatheGeometry(rice_grainProfile, 8);

  function createRiceGrains(material, colorIndex, name) {
    const perColor = 120;
    const grains = new THREE.InstancedMesh(rice_grainGeom, material, perColor);
    grains.name = name;
    const grain_dummy = new THREE.Object3D();
    const grain_axis = new THREE.Vector3(0, 1, 0);
    const grain_direction = new THREE.Vector3();

    for (let j = 0; j < perColor; j++) {
      const i = j * 3 + colorIndex;
      const radial = Math.sqrt((i + 0.5) / 360) * 0.985;
      const angle = i * 2.399963229728653;
      const x = -0.08 + Math.cos(angle) * radial * 0.90;
      const z = -0.02 + Math.sin(angle) * radial * 0.76;
      const dx = (x + 0.08) / 0.90;
      const dz = (z + 0.02) / 0.76;
      const dome = Math.sqrt(Math.max(0.035, 1 - dx * dx - dz * dz));
      const y = 0.40 + 0.31 * dome + 0.012 * Math.sin(i * 1.37);

      grain_dummy.position.set(x, y, z);
      grain_direction.set(
        Math.cos(i * 1.61803398875),
        0.08 * Math.sin(i * 0.91),
        Math.sin(i * 1.61803398875)
      ).normalize();
      grain_dummy.quaternion.setFromUnitVectors(grain_axis, grain_direction);

      const lengthScale = 0.82 + 0.34 * (0.5 + 0.5 * Math.sin(i * 1.31));
      const widthScale = 0.82 + 0.18 * (0.5 + 0.5 * Math.cos(i * 1.77));
      grain_dummy.scale.set(widthScale, lengthScale, widthScale);
      grain_dummy.updateMatrix();
      grains.setMatrixAt(j, grain_dummy.matrix);
    }
    grains.instanceMatrix.needsUpdate = true;
    return grains;
  }

  const rice_grains_dark = createRiceGrains(rice_darkMat, 0, "rice_grains_dark");
  const rice_grains_medium = createRiceGrains(rice_mediumMat, 1, "rice_grains_medium");
  const rice_grains_light = createRiceGrains(rice_lightMat, 2, "rice_grains_light");
  rice_group.add(rice_grains_dark, rice_grains_medium, rice_grains_light);

  const herb_stripGeom = new THREE.BoxGeometry(0.13, 0.012, 0.025);
  const herb_strips = new THREE.InstancedMesh(herb_stripGeom, herbMat, 8);
  herb_strips.name = "herb_strips";
  const herb_dummy = new THREE.Object3D();
  const herbPositions = [
    [-0.78, 0.61, 0.18, 0.35],
    [-0.55, 0.67, -0.25, -0.55],
    [-0.20, 0.71, 0.36, 0.80],
    [0.18, 0.64, 0.43, -0.20],
    [-0.83, 0.56, -0.18, 0.65],
    [-0.38, 0.67, 0.05, -0.85],
    [0.02, 0.67, -0.43, 0.45],
    [-0.62, 0.62, 0.40, 0.10],
  ];
  for (let i = 0; i < herbPositions.length; i++) {
    const p = herbPositions[i];
    herb_dummy.position.set(p[0], p[1], p[2]);
    herb_dummy.rotation.set(0.08 * Math.sin(i), p[3], 0.08 * Math.cos(i));
    herb_dummy.scale.set(0.75 + 0.2 * (i % 3), 1, 1);
    herb_dummy.updateMatrix();
    herb_strips.setMatrixAt(i, herb_dummy.matrix);
  }
  herb_strips.instanceMatrix.needsUpdate = true;
  rice_group.add(herb_strips);

  const onion_strip_group = new THREE.Group();
  onion_strip_group.name = "onion_strip_group";
  rice_group.add(onion_strip_group);

  function createOnionStrip(points, material, radius, name) {
    const path = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
    const geometry = new THREE.TubeGeometry(path, 28, radius, 7, false);
    const strip = new THREE.Mesh(geometry, material);
    strip.name = name;
    onion_strip_group.add(strip);
    return strip;
  }

  const onion_strip_01 = createOnionStrip([
    new THREE.Vector3(-0.76, 0.64, 0.10),
    new THREE.Vector3(-0.66, 0.73, 0.02),
    new THREE.Vector3(-0.52, 0.80, 0.08),
    new THREE.Vector3(-0.36, 0.73, 0.18),
    new THREE.Vector3(-0.18, 0.66, 0.30),
  ], onion_goldMat, 0.018, "onion_strip_01");

  const onion_strip_02 = createOnionStrip([
    new THREE.Vector3(-0.72, 0.66, 0.28),
    new THREE.Vector3(-0.58, 0.72, 0.18),
    new THREE.Vector3(-0.44, 0.83, 0.06),
    new THREE.Vector3(-0.27, 0.78, -0.08),
    new THREE.Vector3(-0.08, 0.68, -0.20),
  ], onion_paleMat, 0.016, "onion_strip_02");

  const onion_strip_03 = createOnionStrip([
    new THREE.Vector3(-0.64, 0.69, -0.25),
    new THREE.Vector3(-0.54, 0.78, -0.34),
    new THREE.Vector3(-0.38, 0.84, -0.31),
    new THREE.Vector3(-0.22, 0.76, -0.20),
    new THREE.Vector3(-0.05, 0.66, -0.08),
  ], onion_caramelMat, 0.019, "onion_strip_03");

  const onion_strip_04 = createOnionStrip([
    new THREE.Vector3(-0.80, 0.62, -0.05),
    new THREE.Vector3(-0.68, 0.69, -0.12),
    new THREE.Vector3(-0.55, 0.76, -0.04),
    new THREE.Vector3(-0.43, 0.70, 0.08),
    new THREE.Vector3(-0.30, 0.63, 0.18),
  ], onion_goldMat, 0.015, "onion_strip_04");

  const onion_strip_05 = createOnionStrip([
    new THREE.Vector3(-0.55, 0.73, 0.34),
    new THREE.Vector3(-0.43, 0.81, 0.25),
    new THREE.Vector3(-0.31, 0.85, 0.14),
    new THREE.Vector3(-0.18, 0.77, 0.04),
    new THREE.Vector3(-0.03, 0.67, -0.02),
  ], onion_caramelMat, 0.018, "onion_strip_05");

  const onion_strip_06 = createOnionStrip([
    new THREE.Vector3(-0.76, 0.62, 0.42),
    new THREE.Vector3(-0.65, 0.68, 0.34),
    new THREE.Vector3(-0.54, 0.72, 0.38),
    new THREE.Vector3(-0.42, 0.69, 0.45),
    new THREE.Vector3(-0.28, 0.63, 0.43),
  ], onion_paleMat, 0.017, "onion_strip_06");

  const onion_strip_07 = createOnionStrip([
    new THREE.Vector3(-0.45, 0.76, -0.40),
    new THREE.Vector3(-0.31, 0.84, -0.35),
    new THREE.Vector3(-0.16, 0.82, -0.27),
    new THREE.Vector3(-0.02, 0.74, -0.18),
    new THREE.Vector3(0.10, 0.66, -0.08),
  ], onion_goldMat, 0.016, "onion_strip_07");

  const onion_strip_08 = createOnionStrip([
    new THREE.Vector3(-0.68, 0.67, 0.18),
    new THREE.Vector3(-0.56, 0.74, 0.28),
    new THREE.Vector3(-0.42, 0.77, 0.24),
    new THREE.Vector3(-0.30, 0.71, 0.14),
    new THREE.Vector3(-0.18, 0.65, 0.04),
  ], onion_caramelMat, 0.017, "onion_strip_08");

  const onion_strip_09 = createOnionStrip([
    new THREE.Vector3(-0.72, 0.64, -0.38),
    new THREE.Vector3(-0.60, 0.72, -0.28),
    new THREE.Vector3(-0.48, 0.78, -0.18),
    new THREE.Vector3(-0.34, 0.73, -0.10),
    new THREE.Vector3(-0.20, 0.65, -0.02),
  ], onion_paleMat, 0.015, "onion_strip_09");

  const onion_strip_10 = createOnionStrip([
    new THREE.Vector3(-0.40, 0.75, 0.02),
    new THREE.Vector3(-0.30, 0.83, 0.00),
    new THREE.Vector3(-0.18, 0.84, 0.05),
    new THREE.Vector3(-0.08, 0.77, 0.10),
    new THREE.Vector3(0.02, 0.68, 0.14),
  ], onion_caramelMat, 0.019, "onion_strip_10");

  const onion_strip_11 = createOnionStrip([
    new THREE.Vector3(-0.82, 0.60, 0.02),
    new THREE.Vector3(-0.72, 0.66, 0.00),
    new THREE.Vector3(-0.62, 0.70, 0.05),
    new THREE.Vector3(-0.52, 0.67, 0.12),
    new THREE.Vector3(-0.42, 0.62, 0.16),
  ], onion_goldMat, 0.014, "onion_strip_11");

  const onion_strip_12 = createOnionStrip([
    new THREE.Vector3(-0.25, 0.72, 0.40),
    new THREE.Vector3(-0.15, 0.78, 0.34),
    new THREE.Vector3(-0.04, 0.79, 0.27),
    new THREE.Vector3(0.04, 0.72, 0.18),
    new THREE.Vector3(0.10, 0.65, 0.10),
  ], onion_paleMat, 0.016, "onion_strip_12");

  const onion_strip_13 = createOnionStrip([
    new THREE.Vector3(-0.38, 0.77, -0.12),
    new THREE.Vector3(-0.28, 0.82, -0.04),
    new THREE.Vector3(-0.16, 0.81, 0.02),
    new THREE.Vector3(-0.05, 0.75, 0.08),
    new THREE.Vector3(0.06, 0.67, 0.13),
  ], onion_goldMat, 0.015, "onion_strip_13");

  const fried_egg = new THREE.Group();
  fried_egg.name = "fried_egg";
  fried_egg.position.set(0.46, 0.69, 0.08);
  fried_egg.rotation.set(-0.12, -0.08, -0.07);
  root.add(fried_egg);

  const egg_whiteShape = new THREE.Shape();
  const eggPointCount = 48;
  for (let i = 0; i <= eggPointCount; i++) {
    const angle = i / eggPointCount * Math.PI * 2;
    const variation =
      1 +
      0.035 * Math.sin(angle * 5) +
      0.025 * Math.sin(angle * 9 + 0.7) +
      0.018 * Math.cos(angle * 13);
    const x = Math.cos(angle) * 0.54 * variation;
    const y = Math.sin(angle) * 0.69 * variation;
    if (i === 0) egg_whiteShape.moveTo(x, y);
    else egg_whiteShape.lineTo(x, y);
  }
  egg_whiteShape.closePath();

  const egg_whiteGeom = new THREE.ExtrudeGeometry(egg_whiteShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
  });
  const egg_white = new THREE.Mesh(egg_whiteGeom, egg_whiteMat);
  egg_white.name = "egg_white";
  egg_white.rotation.x = -Math.PI / 2;
  fried_egg.add(egg_white);

  const egg_crisp_edgePoints = [];
  for (let i = 0; i < eggPointCount; i++) {
    const angle = i / eggPointCount * Math.PI * 2;
    const variation =
      1 +
      0.04 * Math.sin(angle * 5) +
      0.028 * Math.sin(angle * 9 + 0.7);
    egg_crisp_edgePoints.push(new THREE.Vector3(
      Math.cos(angle) * 0.545 * variation,
      0.018,
      -Math.sin(angle) * 0.695 * variation
    ));
  }
  const egg_crisp_edgeCurve = new THREE.CatmullRomCurve3(
    egg_crisp_edgePoints,
    true,
    "centripetal",
    0.5
  );
  const egg_crisp_edgeGeom = new THREE.TubeGeometry(
    egg_crisp_edgeCurve,
    96,
    0.018,
    7,
    true
  );
  const egg_crisp_edge = new THREE.Mesh(egg_crisp_edgeGeom, egg_crispMat);
  egg_crisp_edge.name = "egg_crisp_edge";
  fried_egg.add(egg_crisp_edge);

  const egg_bubbleGeom = new THREE.SphereGeometry(1, 10, 6);
  const egg_bubbles = new THREE.InstancedMesh(egg_bubbleGeom, egg_whiteMat, 18);
  egg_bubbles.name = "egg_bubbles";
  const bubble_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2 + 0.12 * Math.sin(i * 1.7);
    const radial = 0.80 + 0.08 * Math.sin(i * 2.1);
    bubble_dummy.position.set(
      Math.cos(angle) * 0.54 * radial,
      0.047 + 0.004 * Math.sin(i),
      Math.sin(angle) * 0.69 * radial
    );
    const size = 0.014 + 0.009 * (0.5 + 0.5 * Math.sin(i * 2.37));
    bubble_dummy.scale.set(size * 1.25, 0.010, size);
    bubble_dummy.rotation.set(0, angle, 0);
    bubble_dummy.updateMatrix();
    egg_bubbles.setMatrixAt(i, bubble_dummy.matrix);
  }
  egg_bubbles.instanceMatrix.needsUpdate = true;
  fried_egg.add(egg_bubbles);

  const egg_crisp_spotGeom = new THREE.SphereGeometry(1, 8, 5);
  const egg_crisp_spots = new THREE.InstancedMesh(
    egg_crisp_spotGeom,
    egg_darkMat,
    15
  );
  egg_crisp_spots.name = "egg_crisp_spots";
  const spot_dummy = new THREE.Object3D();
  for (let i = 0; i < 15; i++) {
    const angle = (i + 0.35) / 15 * Math.PI * 2;
    spot_dummy.position.set(
      Math.cos(angle) * 0.548,
      0.043,
      -Math.sin(angle) * 0.698
    );
    const size = 0.008 + 0.006 * (0.5 + 0.5 * Math.cos(i * 2.6));
    spot_dummy.scale.set(size, 0.006, size * 0.75);
    spot_dummy.rotation.set(0, angle, 0);
    spot_dummy.updateMatrix();
    egg_crisp_spots.setMatrixAt(i, spot_dummy.matrix);
  }
  egg_crisp_spots.instanceMatrix.needsUpdate = true;
  fried_egg.add(egg_crisp_spots);

  const yolk_x = 0.08;
  const yolk_z = 0.08;

  const yolk_haloGeom = new THREE.TorusGeometry(0.255, 0.018, 8, 40);
  const yolk_halo = new THREE.Mesh(yolk_haloGeom, egg_crispMat);
  yolk_halo.name = "yolk_halo";
  yolk_halo.rotation.x = Math.PI / 2;
  yolk_halo.position.set(yolk_x, 0.051, yolk_z);
  fried_egg.add(yolk_halo);

  const yolkGeom = new THREE.SphereGeometry(1, 32, 18);
  const yolk = new THREE.Mesh(yolkGeom, yolkMat);
  yolk.name = "yolk";
  yolk.position.set(yolk_x, 0.095, yolk_z);
  yolk.scale.set(0.255, 0.125, 0.245);
  fried_egg.add(yolk);

  const yolk_rimGeom = new THREE.TorusGeometry(0.232, 0.012, 8, 40);
  const yolk_rim = new THREE.Mesh(yolk_rimGeom, yolk_rimMat);
  yolk_rim.name = "yolk_rim";
  yolk_rim.rotation.x = Math.PI / 2;
  yolk_rim.position.set(yolk_x, 0.103, yolk_z);
  fried_egg.add(yolk_rim);

  const yolk_highlightGeom = new THREE.SphereGeometry(1, 16, 8);
  const yolk_highlight = new THREE.Mesh(yolk_highlightGeom, yolk_highlightMat);
  yolk_highlight.name = "yolk_highlight";
  yolk_highlight.position.set(yolk_x - 0.09, 0.195, yolk_z + 0.035);
  yolk_highlight.rotation.y = -0.45;
  yolk_highlight.scale.set(0.050, 0.008, 0.025);
  fried_egg.add(yolk_highlight);

  const egg_white_highlight_01Geom = new THREE.SphereGeometry(1, 16, 8);
  const egg_white_highlight_01 = new THREE.Mesh(
    egg_white_highlight_01Geom,
    white_highlightMat
  );
  egg_white_highlight_01.name = "egg_white_highlight_01";
  egg_white_highlight_01.position.set(-0.25, 0.058, 0.25);
  egg_white_highlight_01.rotation.y = -0.5;
  egg_white_highlight_01.scale.set(0.075, 0.008, 0.020);
  fried_egg.add(egg_white_highlight_01);

  const egg_white_highlight_02Geom = new THREE.SphereGeometry(1, 16, 8);
  const egg_white_highlight_02 = new THREE.Mesh(
    egg_white_highlight_02Geom,
    white_highlightMat
  );
  egg_white_highlight_02.name = "egg_white_highlight_02";
  egg_white_highlight_02.position.set(-0.31, 0.055, -0.18);
  egg_white_highlight_02.rotation.y = 0.35;
  egg_white_highlight_02.scale.set(0.050, 0.007, 0.016);
  fried_egg.add(egg_white_highlight_02);

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