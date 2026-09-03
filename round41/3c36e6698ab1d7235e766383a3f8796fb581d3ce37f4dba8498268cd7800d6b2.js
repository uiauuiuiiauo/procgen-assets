export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "nail_polish_bottle";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const polish_group = new THREE.Group();
  polish_group.name = "polish_group";
  bottle_group.add(polish_group);

  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  polish_group.add(decoration_group);

  const cap_group = new THREE.Group();
  cap_group.name = "cap_group";
  root.add(cap_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.18,
    thickness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    depthWrite: false
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f8ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    thickness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    depthWrite: false
  });

  const polishMat = new THREE.MeshPhysicalMaterial({
    color: 0x75d9e8,
    metalness: 0.0,
    roughness: 0.2,
    transmission: 0.42,
    ior: 1.45,
    transparent: true,
    opacity: 0.76,
    thickness: 0.24,
    clearcoat: 0.35,
    clearcoatRoughness: 0.18,
    depthWrite: false
  });

  const polish_coreMat = new THREE.MeshStandardMaterial({
    color: 0x75d9e8,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x15171b,
    metalness: 0.0,
    roughness: 0.8
  });

  const cap_topMat = new THREE.MeshStandardMaterial({
    color: 0x111318,
    metalness: 0.0,
    roughness: 0.8
  });

  const cap_grainMat = new THREE.MeshStandardMaterial({
    color: 0x25282d,
    metalness: 0.0,
    roughness: 0.8
  });

  const purple_hazeMat = new THREE.MeshStandardMaterial({
    color: 0xd89bea,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const green_hazeMat = new THREE.MeshStandardMaterial({
    color: 0x8de8bd,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const labelMat = new THREE.MeshStandardMaterial({
    color: 0x9db9d1,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.82,
    depthWrite: false
  });

  const bottleShape = new THREE.Shape();
  bottleShape.moveTo(-0.36, 0.00);
  bottleShape.bezierCurveTo(-0.43, 0.00, -0.47, 0.055, -0.47, 0.14);
  bottleShape.lineTo(-0.47, 1.14);
  bottleShape.bezierCurveTo(-0.47, 1.24, -0.42, 1.30, -0.34, 1.33);
  bottleShape.bezierCurveTo(-0.25, 1.36, -0.15, 1.36, -0.10, 1.38);
  bottleShape.bezierCurveTo(-0.08, 1.39, -0.07, 1.405, -0.07, 1.42);
  bottleShape.lineTo(0.07, 1.42);
  bottleShape.bezierCurveTo(0.07, 1.405, 0.08, 1.39, 0.10, 1.38);
  bottleShape.bezierCurveTo(0.15, 1.36, 0.25, 1.36, 0.34, 1.33);
  bottleShape.bezierCurveTo(0.42, 1.30, 0.47, 1.24, 0.47, 1.14);
  bottleShape.lineTo(0.47, 0.14);
  bottleShape.bezierCurveTo(0.47, 0.055, 0.43, 0.00, 0.36, 0.00);
  bottleShape.closePath();

  const bottleGeom = new THREE.ExtrudeGeometry(bottleShape, {
    depth: 0.50,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 5
  });
  bottleGeom.translate(0, 0, -0.25);

  const bottle = new THREE.Mesh(bottleGeom, glassMat);
  bottle.name = "bottle";
  bottle.renderOrder = 4;
  bottle_group.add(bottle);

  const polishShape = new THREE.Shape();
  polishShape.moveTo(-0.31, 0.15);
  polishShape.bezierCurveTo(-0.35, 0.15, -0.375, 0.19, -0.375, 0.24);
  polishShape.lineTo(-0.375, 1.13);
  polishShape.bezierCurveTo(-0.375, 1.21, -0.33, 1.25, -0.27, 1.27);
  polishShape.bezierCurveTo(-0.18, 1.30, -0.09, 1.30, -0.055, 1.315);
  polishShape.lineTo(-0.055, 1.37);
  polishShape.lineTo(0.055, 1.37);
  polishShape.lineTo(0.055, 1.315);
  polishShape.bezierCurveTo(0.09, 1.30, 0.18, 1.30, 0.27, 1.27);
  polishShape.bezierCurveTo(0.33, 1.25, 0.375, 1.21, 0.375, 1.13);
  polishShape.lineTo(0.375, 0.24);
  polishShape.bezierCurveTo(0.375, 0.19, 0.35, 0.15, 0.31, 0.15);
  polishShape.closePath();

  const polish_fillGeom = new THREE.ExtrudeGeometry(polishShape, {
    depth: 0.40,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 4
  });
  polish_fillGeom.translate(0, 0, -0.20);

  const polish_fill = new THREE.Mesh(polish_fillGeom, polishMat);
  polish_fill.name = "polish_fill";
  polish_fill.renderOrder = 1;
  polish_group.add(polish_fill);

  const polish_coreGeom = new THREE.ShapeGeometry(polishShape, 14);
  const polish_core = new THREE.Mesh(polish_coreGeom, polish_coreMat);
  polish_core.name = "polish_core";
  polish_core.position.z = 0.08;
  polish_core.renderOrder = 0;
  polish_group.add(polish_core);

  const bottle_neckGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.16, 32);
  const bottle_neck = new THREE.Mesh(bottle_neckGeom, glass_edgeMat);
  bottle_neck.name = "bottle_neck";
  bottle_neck.position.set(0, 1.405, 0);
  bottle_neck.renderOrder = 4;
  bottle_group.add(bottle_neck);

  const neck_polishGeom = new THREE.CylinderGeometry(0.072, 0.072, 0.145, 28);
  const neck_polish = new THREE.Mesh(neck_polishGeom, polishMat);
  neck_polish.name = "neck_polish";
  neck_polish.position.set(0, 1.395, 0);
  neck_polish.renderOrder = 1;
  polish_group.add(neck_polish);

  const bottom_glass_bandGeom = new THREE.BoxGeometry(0.72, 0.065, 0.40);
  const bottom_glass_band = new THREE.Mesh(bottom_glass_bandGeom, glass_edgeMat);
  bottom_glass_band.name = "bottom_glass_band";
  bottom_glass_band.position.set(0, 0.047, 0);
  bottom_glass_band.renderOrder = 4;
  bottle_group.add(bottom_glass_band);

  const polish_base_refractionGeom = new THREE.BoxGeometry(0.60, 0.025, 0.32);
  const polish_base_refraction = new THREE.Mesh(polish_base_refractionGeom, polishMat);
  polish_base_refraction.name = "polish_base_refraction";
  polish_base_refraction.position.set(0, 0.075, 0);
  polish_base_refraction.renderOrder = 2;
  polish_group.add(polish_base_refraction);

  const side_glass_highlightGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.88, 10);
  const left_glass_highlight = new THREE.Mesh(side_glass_highlightGeom, glass_edgeMat);
  left_glass_highlight.name = "left_glass_highlight";
  left_glass_highlight.position.set(-0.425, 0.66, 0.255);
  left_glass_highlight.renderOrder = 5;
  bottle_group.add(left_glass_highlight);

  const right_glass_highlight = new THREE.Mesh(side_glass_highlightGeom, glass_edgeMat);
  right_glass_highlight.name = "right_glass_highlight";
  right_glass_highlight.position.set(0.425, 0.66, 0.255);
  right_glass_highlight.renderOrder = 5;
  bottle_group.add(right_glass_highlight);

  const shoulder_glass_highlightGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.25, 10);
  const left_shoulder_glass_highlight = new THREE.Mesh(shoulder_glass_highlightGeom, glass_edgeMat);
  left_shoulder_glass_highlight.name = "left_shoulder_glass_highlight";
  left_shoulder_glass_highlight.rotation.z = Math.PI / 2;
  left_shoulder_glass_highlight.position.set(-0.27, 1.285, 0.255);
  left_shoulder_glass_highlight.renderOrder = 5;
  bottle_group.add(left_shoulder_glass_highlight);

  const right_shoulder_glass_highlight = new THREE.Mesh(shoulder_glass_highlightGeom, glass_edgeMat);
  right_shoulder_glass_highlight.name = "right_shoulder_glass_highlight";
  right_shoulder_glass_highlight.rotation.z = Math.PI / 2;
  right_shoulder_glass_highlight.position.set(0.27, 1.285, 0.255);
  right_shoulder_glass_highlight.renderOrder = 5;
  bottle_group.add(right_shoulder_glass_highlight);

  const purple_hazeGeom = new THREE.SphereGeometry(1, 24, 12);
  const purple_haze = new THREE.Mesh(purple_hazeGeom, purple_hazeMat);
  purple_haze.name = "purple_haze";
  purple_haze.position.set(0.015, 0.63, 0.19);
  purple_haze.scale.set(0.31, 0.30, 0.012);
  purple_haze.renderOrder = 2;
  decoration_group.add(purple_haze);

  const green_hazeGeom = new THREE.SphereGeometry(1, 24, 12);
  const green_haze = new THREE.Mesh(green_hazeGeom, green_hazeMat);
  green_haze.name = "green_haze";
  green_haze.position.set(-0.025, 0.79, 0.192);
  green_haze.scale.set(0.25, 0.17, 0.01);
  green_haze.renderOrder = 2;
  decoration_group.add(green_haze);

  const glitterGeom = new THREE.CircleGeometry(0.0055, 6);
  const glitter_silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    transparent: true,
    opacity: 0.92,
    depthWrite: false
  });
  const glitter_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x62f5ff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x62f5ff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });
  const glitter_pinkMat = new THREE.MeshStandardMaterial({
    color: 0xff83e1,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff83e1,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });
  const glitter_limeMat = new THREE.MeshStandardMaterial({
    color: 0xb8ff58,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xb8ff58,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });
  const glitter_goldMat = new THREE.MeshStandardMaterial({
    color: 0xffe46d,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffe46d,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });

  const glitterCount = 420;
  const glitter_silver = new THREE.InstancedMesh(glitterGeom, glitter_silverMat, glitterCount);
  glitter_silver.name = "glitter_silver";
  const glitter_cyan = new THREE.InstancedMesh(glitterGeom, glitter_cyanMat, glitterCount);
  glitter_cyan.name = "glitter_cyan";
  const glitter_pink = new THREE.InstancedMesh(glitterGeom, glitter_pinkMat, glitterCount);
  glitter_pink.name = "glitter_pink";
  const glitter_lime = new THREE.InstancedMesh(glitterGeom, glitter_limeMat, glitterCount);
  glitter_lime.name = "glitter_lime";
  const glitter_gold = new THREE.InstancedMesh(glitterGeom, glitter_goldMat, glitterCount);
  glitter_gold.name = "glitter_gold";

  const glitterDummy = new THREE.Object3D();
  const glitterZAxis = new THREE.Vector3(0, 0, 1);
  const glitterNormal = new THREE.Vector3();
  const glitterQuat = new THREE.Quaternion();
  const glitterSpin = new THREE.Quaternion();

  function populateGlitter(mesh, offset) {
    for (let i = 0; i < glitterCount; i++) {
      const u = ((i * 73 + offset * 29 + 11) % 421) / 420;
      const v = ((i * 151 + offset * 43 + 17) % 419) / 418;
      const w = ((i * 107 + offset * 37 + 23) % 431) / 430;
      const y = 0.18 + v * 1.05;
      const shoulder = y > 1.12 ? 1 - (y - 1.12) * 0.72 : 1;
      const x = (u - 0.5) * 0.70 * shoulder;
      const frontSurface = 0.226 + 0.014 * Math.sin((i + offset) * 0.71);

      glitterNormal.set(
        ((i + offset) % 5 - 2) * 0.018,
        (((i * 3 + offset) % 5) - 2) * 0.012,
        1
      ).normalize();
      glitterQuat.setFromUnitVectors(glitterZAxis, glitterNormal);
      glitterSpin.setFromAxisAngle(glitterZAxis, ((i * 19 + offset * 7) % 37) / 37 * Math.PI * 2);
      glitterQuat.multiply(glitterSpin);

      const size = 0.55 + w * 1.25;
      glitterDummy.position.set(x, y, frontSurface);
      glitterDummy.quaternion.copy(glitterQuat);
      glitterDummy.scale.set(size, size * (0.68 + 0.32 * u), 1);
      glitterDummy.updateMatrix();
      mesh.setMatrixAt(i, glitterDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 3;
    decoration_group.add(mesh);
  }

  populateGlitter(glitter_silver, 1);
  populateGlitter(glitter_cyan, 2);
  populateGlitter(glitter_pink, 3);
  populateGlitter(glitter_lime, 4);
  populateGlitter(glitter_gold, 5);

  const large_flakesGeom = new THREE.CircleGeometry(0.018, 7);
  const large_flakesMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });
  const largeFlakeCount = 28;
  const large_flakes = new THREE.InstancedMesh(large_flakesGeom, large_flakesMat, largeFlakeCount);
  large_flakes.name = "large_flakes";

  for (let i = 0; i < largeFlakeCount; i++) {
    const u = ((i * 11 + 3) % 29) / 28;
    const v = ((i * 17 + 5) % 31) / 30;
    const w = ((i * 13 + 7) % 37) / 36;
    const shoulder = v > 0.78 ? 1 - (v - 0.78) * 1.2 : 1;
    glitterNormal.set(((i * 2) % 5 - 2) * 0.025, (((i * 3) % 5) - 2) * 0.018, 1).normalize();
    glitterQuat.setFromUnitVectors(glitterZAxis, glitterNormal);
    glitterSpin.setFromAxisAngle(glitterZAxis, w * Math.PI * 2);
    glitterQuat.multiply(glitterSpin);

    glitterDummy.position.set(
      (u - 0.5) * 0.60 * shoulder,
      0.24 + v * 0.91,
      0.232 + w * 0.006
    );
    glitterDummy.quaternion.copy(glitterQuat);
    glitterDummy.scale.set(0.65 + w, 0.5 + u * 0.65, 1);
    glitterDummy.updateMatrix();
    large_flakes.setMatrixAt(i, glitterDummy.matrix);
  }
  large_flakes.instanceMatrix.needsUpdate = true;
  large_flakes.renderOrder = 3;
  decoration_group.add(large_flakes);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, -0.055);
  petalShape.bezierCurveTo(-0.045, -0.015, -0.05, 0.055, 0, 0.09);
  petalShape.bezierCurveTo(0.05, 0.055, 0.045, -0.015, 0, -0.055);
  petalShape.closePath();

  const petalGeom = new THREE.ShapeGeometry(petalShape, 12);
  const blue_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x38b9df,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.9,
    depthWrite: false
  });
  const violet_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xb681d7,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });
  const mint_petalsMat = new THREE.MeshStandardMaterial({
    color: 0x72d9b2,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.88,
    depthWrite: false
  });

  const flowerCenters = [
    [-0.13, 0.43, 0.238],
    [0.07, 0.39, 0.24],
    [0.18, 0.57, 0.236]
  ];

  const blue_petals = new THREE.InstancedMesh(petalGeom, blue_petalsMat, 5);
  blue_petals.name = "blue_petals";
  const violet_petals = new THREE.InstancedMesh(petalGeom, violet_petalsMat, 5);
  violet_petals.name = "violet_petals";
  const mint_petals = new THREE.InstancedMesh(petalGeom, mint_petalsMat, 5);
  mint_petals.name = "mint_petals";

  function populatePetals(mesh, flowerIndex) {
    const center = flowerCenters[flowerIndex];
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      const radial = 0.052;
      glitterDummy.position.set(
        center[0] + Math.cos(angle) * radial,
        center[1] + Math.sin(angle) * radial,
        center[2] + i * 0.0002
      );
      glitterDummy.rotation.set(0, 0, angle - Math.PI / 2);
      const petalScale = 0.88 + ((i + flowerIndex) % 3) * 0.08;
      glitterDummy.scale.set(petalScale, petalScale, 1);
      glitterDummy.updateMatrix();
      mesh.setMatrixAt(i, glitterDummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 3;
    decoration_group.add(mesh);
  }

  populatePetals(blue_petals, 0);
  populatePetals(violet_petals, 1);
  populatePetals(mint_petals, 2);

  const flower_centersGeom = new THREE.CircleGeometry(0.021, 14);
  const flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0xffe46d,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffe46d,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });
  const flower_centers = new THREE.InstancedMesh(flower_centersGeom, flower_centersMat, 3);
  flower_centers.name = "flower_centers";

  for (let i = 0; i < flowerCenters.length; i++) {
    glitterDummy.position.set(
      flowerCenters[i][0],
      flowerCenters[i][1],
      flowerCenters[i][2] + 0.003
    );
    glitterDummy.rotation.set(0, 0, 0);
    glitterDummy.scale.setScalar(0.85 + i * 0.08);
    glitterDummy.updateMatrix();
    flower_centers.setMatrixAt(i, glitterDummy.matrix);
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  flower_centers.renderOrder = 3;
  decoration_group.add(flower_centers);

  const brand_label = new THREE.Group();
  brand_label.name = "brand_label";
  brand_label.position.z = 0.244;
  brand_label.renderOrder = 3;
  decoration_group.add(brand_label);

  const strokeSpecs = [];
  const dotSpecs = [];
  const letterWidth = 0.058;
  const letterHeight = 0.14;
  const letterSpacing = 0.012;
  const labelStartX = -0.193;
  const labelBaseY = 0.66;

  function addStroke(x1, y1, x2, y2) {
    strokeSpecs.push([x1, y1, x2, y2]);
  }

  function addDot(x, y, scale) {
    dotSpecs.push([x, y, scale]);
  }

  let cx = labelStartX;
  addStroke(cx, labelBaseY, cx, labelBaseY + letterHeight);
  addStroke(cx, labelBaseY + letterHeight * 0.5, cx + letterWidth, labelBaseY + letterHeight);
  addStroke(cx, labelBaseY + letterHeight * 0.5, cx + letterWidth, labelBaseY);

  cx += letterWidth + letterSpacing;
  addStroke(cx, labelBaseY, cx + letterWidth * 0.5, labelBaseY + letterHeight);
  addStroke(cx + letterWidth * 0.5, labelBaseY + letterHeight, cx + letterWidth, labelBaseY);
  addStroke(cx + letterWidth * 0.22, labelBaseY + letterHeight * 0.48, cx + letterWidth * 0.78, labelBaseY + letterHeight * 0.48);

  cx += letterWidth + letterSpacing;
  addStroke(cx, labelBaseY + letterHeight, cx, labelBaseY + 0.022);
  addStroke(cx, labelBaseY + 0.022, cx + letterWidth * 0.42, labelBaseY);
  addStroke(cx + letterWidth * 0.42, labelBaseY, cx + letterWidth, labelBaseY + 0.022);
  addStroke(cx + letterWidth, labelBaseY + 0.022, cx + letterWidth, labelBaseY + letterHeight);

  cx += letterWidth + letterSpacing;
  addStroke(cx + letterWidth, labelBaseY + letterHeight, cx, labelBaseY + letterHeight);
  addStroke(cx, labelBaseY + letterHeight, cx, labelBaseY);
  addStroke(cx, labelBaseY, cx + letterWidth, labelBaseY);

  cx += letterWidth + letterSpacing;
  addStroke(cx, labelBaseY + letterHeight, cx + letterWidth, labelBaseY + letterHeight);
  addStroke(cx + letterWidth * 0.5, labelBaseY + letterHeight, cx + letterWidth * 0.5, labelBaseY);
  addStroke(cx, labelBaseY, cx + letterWidth, labelBaseY);

  cx += letterWidth + letterSpacing;
  addStroke(cx, labelBaseY, cx, labelBaseY + letterHeight);
  addStroke(cx, labelBaseY + letterHeight, cx + letterWidth, labelBaseY);
  addStroke(cx + letterWidth, labelBaseY, cx + letterWidth, labelBaseY + letterHeight);

  cx += letterWidth + letterSpacing;
  addStroke(cx, labelBaseY, cx, labelBaseY + letterHeight);
  addStroke(cx, labelBaseY + letterHeight * 0.52, cx + letterWidth, labelBaseY + letterHeight);
  addStroke(cx, labelBaseY + letterHeight * 0.52, cx + letterWidth, labelBaseY);

  addDot(cx + letterWidth * 0.55, labelBaseY + letterHeight + 0.014, 1);

  const label_strokesGeom = new THREE.BoxGeometry(0.007, 1, 0.004);
  const label_strokes = new THREE.InstancedMesh(label_strokesGeom, labelMat, strokeSpecs.length);
  label_strokes.name = "label_strokes";

  for (let i = 0; i < strokeSpecs.length; i++) {
    const stroke = strokeSpecs[i];
    const dx = stroke[2] - stroke[0];
    const dy = stroke[3] - stroke[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    glitterDummy.position.set(
      (stroke[0] + stroke[2]) * 0.5,
      (stroke[1] + stroke[3]) * 0.5,
      0
    );
    glitterDummy.rotation.set(0, 0, Math.atan2(-dx, dy));
    glitterDummy.scale.set(1, length, 1);
    glitterDummy.updateMatrix();
    label_strokes.setMatrixAt(i, glitterDummy.matrix);
  }
  label_strokes.instanceMatrix.needsUpdate = true;
  label_strokes.renderOrder = 3;
  brand_label.add(label_strokes);

  const label_dotsGeom = new THREE.CircleGeometry(0.008, 12);
  const label_dots = new THREE.InstancedMesh(label_dotsGeom, labelMat, dotSpecs.length);
  label_dots.name = "label_dots";

  for (let i = 0; i < dotSpecs.length; i++) {
    glitterDummy.position.set(dotSpecs[i][0], dotSpecs[i][1], 0.003);
    glitterDummy.rotation.set(0, 0, 0);
    glitterDummy.scale.setScalar(dotSpecs[i][2]);
    glitterDummy.updateMatrix();
    label_dots.setMatrixAt(i, glitterDummy.matrix);
  }
  label_dots.instanceMatrix.needsUpdate = true;
  label_dots.renderOrder = 3;
  brand_label.add(label_dots);

  const capProfile = [
    new THREE.Vector2(0.00, 1.405),
    new THREE.Vector2(0.345, 1.405),
    new THREE.Vector2(0.350, 1.445),
    new THREE.Vector2(0.330, 2.70),
    new THREE.Vector2(0.325, 2.76),
    new THREE.Vector2(0.310, 2.80),
    new THREE.Vector2(0.275, 2.825),
    new THREE.Vector2(0.00, 2.825)
  ];
  const capGeom = new THREE.LatheGeometry(capProfile, 64);
  const cap = new THREE.Mesh(capGeom, capMat);
  cap.name = "cap";
  cap_group.add(cap);

  const cap_topGeom = new THREE.CylinderGeometry(0.267, 0.267, 0.008, 48);
  const cap_top = new THREE.Mesh(cap_topGeom, cap_topMat);
  cap_top.name = "cap_top";
  cap_top.position.y = 2.828;
  cap_group.add(cap_top);

  const cap_base_ringGeom = new THREE.TorusGeometry(0.337, 0.008, 8, 48);
  const cap_base_ring = new THREE.Mesh(cap_base_ringGeom, cap_topMat);
  cap_base_ring.name = "cap_base_ring";
  cap_base_ring.rotation.x = Math.PI / 2;
  cap_base_ring.position.y = 1.414;
  cap_group.add(cap_base_ring);

  const cap_grainGeom = new THREE.SphereGeometry(0.0045, 6, 4);
  const capGrainCount = 120;
  const cap_grain = new THREE.InstancedMesh(cap_grainGeom, cap_grainMat, capGrainCount);
  cap_grain.name = "cap_grain";

  for (let i = 0; i < capGrainCount; i++) {
    const angle = ((i * 47 + 9) % capGrainCount) / capGrainCount * Math.PI * 2;
    const y = 1.47 + (((i * 71 + 5) % 127) / 126) * 1.28;
    const radius = 0.348 - (y - 1.47) / 1.28 * 0.022;
    const scale = 0.65 + ((i * 13) % 11) / 15;
    glitterDummy.position.set(
      Math.cos(angle) * (radius + 0.001),
      y,
      Math.sin(angle) * (radius + 0.001)
    );
    glitterDummy.rotation.set(0, 0, 0);
    glitterDummy.scale.setScalar(scale);
    glitterDummy.updateMatrix();
    cap_grain.setMatrixAt(i, glitterDummy.matrix);
  }
  cap_grain.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_grain);

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