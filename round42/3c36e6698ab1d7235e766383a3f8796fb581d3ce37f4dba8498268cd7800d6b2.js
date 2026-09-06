export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "nail_polish_bottle";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  bottle_group.add(decoration_group);

  const cap_group = new THREE.Group();
  cap_group.name = "cap_group";
  root.add(cap_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.98,
    ior: 1.5,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0x54b9d4,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.68,
    ior: 1.45,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const capMat = new THREE.MeshStandardMaterial({
    color: 0x15161a,
    metalness: 0.0,
    roughness: 0.8
  });

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xb7a7cf,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.82
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const edgeHighlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const glitter_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x71f4f1,
    metalness: 0.25,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const glitter_lavenderMat = new THREE.MeshStandardMaterial({
    color: 0xd5a8ff,
    metalness: 0.2,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const glitter_goldMat = new THREE.MeshStandardMaterial({
    color: 0xffe58a,
    metalness: 0.25,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const glitter_mintMat = new THREE.MeshStandardMaterial({
    color: 0x9cffc9,
    metalness: 0.15,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const glitter_pinkMat = new THREE.MeshStandardMaterial({
    color: 0xffa8dc,
    metalness: 0.15,
    roughness: 0.35,
    side: THREE.DoubleSide
  });

  const glitter_silverMat = new THREE.MeshStandardMaterial({
    color: 0xe8eef2,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const blob_blueMat = new THREE.MeshStandardMaterial({
    color: 0x36a9d6,
    metalness: 0.0,
    roughness: 0.45,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide
  });

  const blob_lavenderMat = new THREE.MeshStandardMaterial({
    color: 0xb98bd5,
    metalness: 0.0,
    roughness: 0.45,
    transparent: true,
    opacity: 0.74,
    side: THREE.DoubleSide
  });

  const blob_mintMat = new THREE.MeshStandardMaterial({
    color: 0x76d7bd,
    metalness: 0.0,
    roughness: 0.45,
    transparent: true,
    opacity: 0.74,
    side: THREE.DoubleSide
  });

  const blob_pinkMat = new THREE.MeshStandardMaterial({
    color: 0xd795c9,
    metalness: 0.0,
    roughness: 0.45,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });

  function createRoundedRectShape(width, height, radius, bottom = 0) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const top = bottom + height;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    shape.closePath();
    return shape;
  }

  function createBottleOutlineShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.43, -1.16);
    shape.quadraticCurveTo(-0.54, -1.16, -0.56, -1.04);
    shape.lineTo(-0.56, 0.16);
    shape.quadraticCurveTo(-0.56, 0.29, -0.43, 0.34);
    shape.quadraticCurveTo(0, 0.39, 0.43, 0.34);
    shape.quadraticCurveTo(0.56, 0.29, 0.56, 0.16);
    shape.lineTo(0.56, -1.04);
    shape.quadraticCurveTo(0.54, -1.16, 0.43, -1.16);
    shape.lineTo(-0.43, -1.16);
    shape.closePath();
    return shape;
  }

  const bottle_glassShape = createBottleOutlineShape();
  const bottle_glassGeom = new THREE.ExtrudeGeometry(bottle_glassShape, {
    depth: 0.52,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 5
  });
  const bottle_glass = new THREE.Mesh(bottle_glassGeom, glassMat);
  bottle_glass.name = "bottle_glass";
  bottle_glass.position.z = -0.26;
  bottle_glass.renderOrder = 3;
  bottle_group.add(bottle_glass);

  const blue_liquidShape = createRoundedRectShape(0.90, 1.32, 0.12, -1.02);
  const blue_liquidGeom = new THREE.ExtrudeGeometry(blue_liquidShape, {
    depth: 0.39,
    steps: 1,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 4
  });
  const blue_liquid = new THREE.Mesh(blue_liquidGeom, liquidMat);
  blue_liquid.name = "blue_liquid";
  blue_liquid.position.z = -0.195;
  blue_liquid.renderOrder = 1;
  bottle_group.add(blue_liquid);

  const neck_glassGeom = new THREE.CylinderGeometry(0.205, 0.235, 0.18, 32);
  const neck_glass = new THREE.Mesh(neck_glassGeom, glassMat);
  neck_glass.name = "neck_glass";
  neck_glass.position.set(0, 0.405, 0);
  neck_glass.renderOrder = 3;
  bottle_group.add(neck_glass);

  const neck_liquidGeom = new THREE.CylinderGeometry(0.17, 0.19, 0.145, 32);
  const neck_liquid = new THREE.Mesh(neck_liquidGeom, liquidMat);
  neck_liquid.name = "neck_liquid";
  neck_liquid.position.set(0, 0.397, 0);
  neck_liquid.renderOrder = 1;
  bottle_group.add(neck_liquid);

  const bottom_refractionGeom = new THREE.BoxGeometry(0.84, 0.055, 0.36);
  const bottom_refraction = new THREE.Mesh(bottom_refractionGeom, liquidMat);
  bottom_refraction.name = "bottom_refraction";
  bottom_refraction.position.set(0, -1.105, 0);
  bottom_refraction.renderOrder = 1;
  bottle_group.add(bottom_refraction);

  const front_glass_rimShape = createBottleOutlineShape();
  const front_glass_rimGeom = new THREE.ShapeGeometry(front_glass_rimShape, 18);
  const front_glass_rim = new THREE.Mesh(front_glass_rimGeom, edgeHighlightMat);
  front_glass_rim.name = "front_glass_rim";
  front_glass_rim.position.z = 0.304;
  front_glass_rim.renderOrder = 4;
  bottle_group.add(front_glass_rim);

  const shoulder_highlightGeom = new THREE.SphereGeometry(1, 18, 10);

  const left_shoulder_highlight = new THREE.Mesh(
    shoulder_highlightGeom,
    highlightMat
  );
  left_shoulder_highlight.name = "left_shoulder_highlight";
  left_shoulder_highlight.position.set(-0.35, 0.235, 0.302);
  left_shoulder_highlight.scale.set(0.105, 0.026, 0.008);
  left_shoulder_highlight.renderOrder = 5;
  bottle_group.add(left_shoulder_highlight);

  const right_shoulder_highlight = new THREE.Mesh(
    shoulder_highlightGeom,
    highlightMat
  );
  right_shoulder_highlight.name = "right_shoulder_highlight";
  right_shoulder_highlight.position.set(0.35, 0.235, 0.302);
  right_shoulder_highlight.scale.set(0.105, 0.026, 0.008);
  right_shoulder_highlight.renderOrder = 5;
  bottle_group.add(right_shoulder_highlight);

  const left_glass_edge = new THREE.Mesh(shoulder_highlightGeom, highlightMat);
  left_glass_edge.name = "left_glass_edge";
  left_glass_edge.position.set(-0.515, -0.42, 0.298);
  left_glass_edge.scale.set(0.014, 0.58, 0.006);
  left_glass_edge.renderOrder = 5;
  bottle_group.add(left_glass_edge);

  const right_glass_edge = new THREE.Mesh(shoulder_highlightGeom, highlightMat);
  right_glass_edge.name = "right_glass_edge";
  right_glass_edge.position.set(0.515, -0.42, 0.298);
  right_glass_edge.scale.set(0.014, 0.58, 0.006);
  right_glass_edge.renderOrder = 5;
  bottle_group.add(right_glass_edge);

  const blobGeom = new THREE.CircleGeometry(1, 24);

  function createBlobInstances(name, data, material, z) {
    const mesh = new THREE.InstancedMesh(blobGeom, material, data.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      dummy.position.set(item[0], item[1], z + i * 0.0001);
      dummy.rotation.set(0, 0, item[4]);
      dummy.scale.set(item[2], item[3], 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 2;
    decoration_group.add(mesh);
    return mesh;
  }

  const blue_bubbles = createBlobInstances(
    "blue_bubbles",
    [
      [-0.12, -0.62, 0.105, 0.095, 0.10],
      [0.02, -0.69, 0.090, 0.105, -0.20],
      [0.14, -0.60, 0.085, 0.095, 0.15],
      [0.03, -0.52, 0.070, 0.075, 0.00]
    ],
    blob_blueMat,
    0.226
  );

  const lavender_bubbles = createBlobInstances(
    "lavender_bubbles",
    [
      [-0.25, -0.57, 0.095, 0.085, -0.15],
      [-0.18, -0.49, 0.075, 0.080, 0.20],
      [0.19, -0.51, 0.080, 0.090, -0.10],
      [0.27, -0.60, 0.070, 0.080, 0.15]
    ],
    blob_lavenderMat,
    0.227
  );

  const mint_bubbles = createBlobInstances(
    "mint_bubbles",
    [
      [-0.05, -0.47, 0.080, 0.075, 0.20],
      [0.08, -0.46, 0.075, 0.080, -0.10],
      [0.20, -0.67, 0.065, 0.075, 0.10],
      [-0.29, -0.69, 0.060, 0.065, 0.00]
    ],
    blob_mintMat,
    0.228
  );

  const pink_bubbles = createBlobInstances(
    "pink_bubbles",
    [
      [-0.31, -0.43, 0.065, 0.070, 0.10],
      [0.29, -0.44, 0.060, 0.065, -0.20],
      [0.13, -0.73, 0.060, 0.065, 0.10],
      [-0.08, -0.74, 0.055, 0.060, 0.00]
    ],
    blob_pinkMat,
    0.229
  );

  const glitterGeom = new THREE.CircleGeometry(1, 8);

  function createGlitterInstances(name, count, offset, material) {
    const mesh = new THREE.InstancedMesh(glitterGeom, material, count);
    mesh.name = name;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const px = (((i * 37 + offset * 19) % 101) / 100 - 0.5) * 0.82;
      const py = (((i * 53 + offset * 23) % 103) / 102 - 0.5) * 1.18 - 0.20;
      const size = 0.0045 + ((i * 11 + offset * 3) % 7) * 0.00125;

      dummy.position.set(px, py, 0.232 + offset * 0.0002);
      dummy.rotation.set(0, 0, ((i * 29 + offset) % 17) * 0.12);
      dummy.scale.set(size, size, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.renderOrder = 2;
    decoration_group.add(mesh);
    return mesh;
  }

  const glitter_cyan = createGlitterInstances(
    "glitter_cyan",
    38,
    1,
    glitter_cyanMat
  );

  const glitter_lavender = createGlitterInstances(
    "glitter_lavender",
    34,
    2,
    glitter_lavenderMat
  );

  const glitter_gold = createGlitterInstances(
    "glitter_gold",
    28,
    3,
    glitter_goldMat
  );

  const glitter_mint = createGlitterInstances(
    "glitter_mint",
    30,
    4,
    glitter_mintMat
  );

  const glitter_pink = createGlitterInstances(
    "glitter_pink",
    28,
    5,
    glitter_pinkMat
  );

  const glitter_silver = createGlitterInstances(
    "glitter_silver",
    52,
    6,
    glitter_silverMat
  );

  const large_flakesGeom = new THREE.CircleGeometry(1, 14);
  const large_flakes = new THREE.InstancedMesh(
    large_flakesGeom,
    silverMat,
    22
  );
  large_flakes.name = "large_flakes";

  const flakeDummy = new THREE.Object3D();
  for (let i = 0; i < 22; i++) {
    const fx = (((i * 43 + 7) % 89) / 88 - 0.5) * 0.76;
    const fy = (((i * 31 + 13) % 83) / 82 - 0.5) * 1.10 - 0.22;
    const fsx = 0.014 + ((i * 7) % 5) * 0.004;
    const fsy = 0.020 + ((i * 11) % 6) * 0.005;

    flakeDummy.position.set(fx, fy, 0.235);
    flakeDummy.rotation.set(0, 0, ((i * 13) % 19) * 0.19);
    flakeDummy.scale.set(fsx, fsy, 1);
    flakeDummy.updateMatrix();
    large_flakes.setMatrixAt(i, flakeDummy.matrix);
  }
  large_flakes.instanceMatrix.needsUpdate = true;
  large_flakes.renderOrder = 2;
  decoration_group.add(large_flakes);

  const glyphs = {
    H: [
      [0, 0, 0, 1],
      [1, 0, 1, 1],
      [0, 0.5, 1, 0.5]
    ],
    Y: [
      [0, 1, 0.5, 0.52],
      [1, 1, 0.5, 0.52],
      [0.5, 0.52, 0.5, 0]
    ],
    D: [
      [0, 0, 0, 1],
      [0, 1, 0.72, 1],
      [0.72, 1, 1, 0.76],
      [1, 0.76, 1, 0.24],
      [1, 0.24, 0.72, 0],
      [0.72, 0, 0, 0]
    ],
    R: [
      [0, 0, 0, 1],
      [0, 1, 0.78, 1],
      [0.78, 1, 1, 0.78],
      [1, 0.78, 0.78, 0.53],
      [0.78, 0.53, 0, 0.53],
      [0.55, 0.53, 1, 0]
    ],
    O: [
      [0.15, 0, 0.85, 0],
      [0.85, 0, 1, 0.18],
      [1, 0.18, 1, 0.82],
      [1, 0.82, 0.85, 1],
      [0.85, 1, 0.15, 1],
      [0.15, 1, 0, 0.82],
      [0, 0.82, 0, 0.18],
      [0, 0.18, 0.15, 0]
    ],
    W: [
      [0, 1, 0.20, 0],
      [0.20, 0, 0.50, 0.55],
      [0.50, 0.55, 0.80, 0],
      [0.80, 0, 1, 1]
    ]
  };

  const brandWord = ["H", "Y", "D", "R", "O", "W"];
  const brandStrokes = [];
  const letterWidth = 0.105;
  const letterHeight = 0.20;
  const letterGap = 0.018;
  const wordWidth =
    brandWord.length * letterWidth + (brandWord.length - 1) * letterGap;
  const wordStart = -wordWidth / 2;
  const wordBottom = -0.20;

  for (let i = 0; i < brandWord.length; i++) {
    const segments = glyphs[brandWord[i]];
    const letterX = wordStart + i * (letterWidth + letterGap);

    for (let j = 0; j < segments.length; j++) {
      const segment = segments[j];
      brandStrokes.push([
        letterX + segment[0] * letterWidth,
        wordBottom + segment[1] * letterHeight,
        letterX + segment[2] * letterWidth,
        wordBottom + segment[3] * letterHeight
      ]);
    }
  }

  const brand_labelGeom = new THREE.BoxGeometry(1, 1, 1);
  const brand_label = new THREE.InstancedMesh(
    brand_labelGeom,
    labelMat,
    brandStrokes.length
  );
  brand_label.name = "brand_label";

  const brandDummy = new THREE.Object3D();
  for (let i = 0; i < brandStrokes.length; i++) {
    const stroke = brandStrokes[i];
    const dx = stroke[2] - stroke[0];
    const dy = stroke[3] - stroke[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    brandDummy.position.set(
      (stroke[0] + stroke[2]) / 2,
      (stroke[1] + stroke[3]) / 2,
      0.247
    );
    brandDummy.rotation.set(0, 0, angle);
    brandDummy.scale.set(length, 0.009, 0.006);
    brandDummy.updateMatrix();
    brand_label.setMatrixAt(i, brandDummy.matrix);
  }
  brand_label.instanceMatrix.needsUpdate = true;
  brand_label.renderOrder = 6;
  decoration_group.add(brand_label);

  const cap_bodyProfile = [
    new THREE.Vector2(0.00, 0.405),
    new THREE.Vector2(0.415, 0.405),
    new THREE.Vector2(0.415, 0.445),
    new THREE.Vector2(0.402, 0.72),
    new THREE.Vector2(0.382, 1.16),
    new THREE.Vector2(0.360, 1.62),
    new THREE.Vector2(0.342, 2.08),
    new THREE.Vector2(0.337, 2.155),
    new THREE.Vector2(0.326, 2.195),
    new THREE.Vector2(0.300, 2.218),
    new THREE.Vector2(0.00, 2.225)
  ];
  const cap_bodyGeom = new THREE.LatheGeometry(cap_bodyProfile, 48);
  const cap_body = new THREE.Mesh(cap_bodyGeom, capMat);
  cap_body.name = "cap_body";
  cap_group.add(cap_body);

  const cap_top_rimGeom = new THREE.TorusGeometry(0.292, 0.011, 8, 48);
  const cap_top_rim = new THREE.Mesh(cap_top_rimGeom, capMat);
  cap_top_rim.name = "cap_top_rim";
  cap_top_rim.rotation.x = Math.PI / 2;
  cap_top_rim.position.y = 2.211;
  cap_group.add(cap_top_rim);

  const cap_bottom_rimGeom = new THREE.TorusGeometry(0.405, 0.010, 8, 48);
  const cap_bottom_rim = new THREE.Mesh(cap_bottom_rimGeom, capMat);
  cap_bottom_rim.name = "cap_bottom_rim";
  cap_bottom_rim.rotation.x = Math.PI / 2;
  cap_bottom_rim.position.y = 0.414;
  cap_group.add(cap_bottom_rim);

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