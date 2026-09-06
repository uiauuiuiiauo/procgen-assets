export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "embroidered_wooden_chest";

  const wood_frame = new THREE.Group();
  wood_frame.name = "wood_frame";
  const textile_panels = new THREE.Group();
  textile_panels.name = "textile_panels";
  const textile_patterns = new THREE.Group();
  textile_patterns.name = "textile_patterns";
  const hardware = new THREE.Group();
  hardware.name = "hardware";
  const wood_details = new THREE.Group();
  wood_details.name = "wood_details";
  root.add(textile_panels, textile_patterns, wood_frame, hardware, wood_details);

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x765139,
    metalness: 0.0,
    roughness: 0.9
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3f2a20,
    metalness: 0.0,
    roughness: 0.9
  });
  const wornWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9a704c,
    metalness: 0.0,
    roughness: 0.9
  });
  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x174d5d,
    metalness: 0.0,
    roughness: 0.95
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xb83249,
    metalness: 0.0,
    roughness: 0.95
  });
  const tealMat = new THREE.MeshStandardMaterial({
    color: 0x2b9b91,
    metalness: 0.0,
    roughness: 0.95
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xe0b44b,
    metalness: 0.0,
    roughness: 0.95
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x65a66f,
    metalness: 0.0,
    roughness: 0.95
  });
  const creamMat = new THREE.MeshStandardMaterial({
    color: 0xeadbb5,
    metalness: 0.0,
    roughness: 0.95
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x927849,
    metalness: 0.5,
    roughness: 0.5
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x403b32,
    metalness: 0.5,
    roughness: 0.5
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  function makeBox(name, width, height, depth, material, x, y, z, parent) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material
    );
    mesh.name = name;
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function makeInstances(name, geometry, material, transforms, parent) {
    const mesh = new THREE.InstancedMesh(geometry, material, transforms.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < transforms.length; i++) {
      const t = transforms[i];
      dummy.position.set(t[0], t[1], t[2]);
      dummy.rotation.set(t[3], t[4], t[5]);
      dummy.scale.set(t[6], t[7], t[8]);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    parent.add(mesh);
    return mesh;
  }

  function makeDiamondGeometry(width, height, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(0, height * 0.5);
    shape.lineTo(width * 0.5, 0);
    shape.lineTo(0, -height * 0.5);
    shape.lineTo(-width * 0.5, 0);
    shape.lineTo(0, height * 0.5);
    return new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: false
    });
  }

  const postX = 0.68;
  const postZ = 0.49;
  const postSize = 0.16;
  const postHeight = 1.06;
  const postY = 0.58;

  const corner_postsGeom = new THREE.BoxGeometry(
    postSize,
    postHeight,
    postSize
  );
  const corner_posts = makeInstances(
    "corner_posts",
    corner_postsGeom,
    woodMat,
    [
      [-postX, postY, postZ, 0, 0, 0, 1, 1, 1],
      [postX, postY, postZ, 0, 0, 0, 1, 1, 1],
      [-postX, postY, -postZ, 0, 0, 0, 1, 1, 1],
      [postX, postY, -postZ, 0, 0, 0, 1, 1, 1]
    ],
    wood_frame
  );

  const front_panel = makeBox(
    "front_panel", 1.19, 0.74, 0.03, fabricMat,
    0, 0.59, 0.505, textile_panels
  );
  const back_panel = makeBox(
    "back_panel", 1.19, 0.74, 0.03, fabricMat,
    0, 0.59, -0.505, textile_panels
  );
  const left_side_panel = makeBox(
    "left_side_panel", 0.03, 0.74, 0.82, fabricMat,
    -0.665, 0.59, 0, textile_panels
  );
  const right_side_panel = makeBox(
    "right_side_panel", 0.03, 0.74, 0.82, fabricMat,
    0.665, 0.59, 0, textile_panels
  );

  const front_top_band = makeBox(
    "front_top_band", 1.20, 0.17, 0.035, fabricMat,
    0, 1.00, 0.522, textile_panels
  );
  const back_top_band = makeBox(
    "back_top_band", 1.20, 0.17, 0.035, fabricMat,
    0, 1.00, -0.522, textile_panels
  );
  const left_top_band = makeBox(
    "left_top_band", 0.035, 0.17, 0.84, fabricMat,
    -0.682, 1.00, 0, textile_panels
  );
  const right_top_band = makeBox(
    "right_top_band", 0.035, 0.17, 0.84, fabricMat,
    0.682, 1.00, 0, textile_panels
  );

  const top_textile_panel = makeBox(
    "top_textile_panel", 1.19, 0.035, 0.82, fabricMat,
    0, 1.16, 0, textile_panels
  );

  const front_bottom_wood_rail = makeBox(
    "front_bottom_wood_rail", 1.22, 0.17, 0.10, woodMat,
    0, 0.105, 0.535, wood_frame
  );
  const back_bottom_wood_rail = makeBox(
    "back_bottom_wood_rail", 1.22, 0.17, 0.10, woodMat,
    0, 0.105, -0.535, wood_frame
  );
  const left_bottom_wood_rail = makeBox(
    "left_bottom_wood_rail", 0.10, 0.17, 0.84, woodMat,
    -0.695, 0.105, 0, wood_frame
  );
  const right_bottom_wood_rail = makeBox(
    "right_bottom_wood_rail", 0.10, 0.17, 0.84, woodMat,
    0.695, 0.105, 0, wood_frame
  );

  const front_upper_wood_rail = makeBox(
    "front_upper_wood_rail", 1.22, 0.13, 0.10, woodMat,
    0, 0.91, 0.54, wood_frame
  );
  const back_upper_wood_rail = makeBox(
    "back_upper_wood_rail", 1.22, 0.13, 0.10, woodMat,
    0, 0.91, -0.54, wood_frame
  );
  const left_upper_wood_rail = makeBox(
    "left_upper_wood_rail", 0.10, 0.13, 0.84, woodMat,
    -0.70, 0.91, 0, wood_frame
  );
  const right_upper_wood_rail = makeBox(
    "right_upper_wood_rail", 0.10, 0.13, 0.84, woodMat,
    0.70, 0.91, 0, wood_frame
  );

  const lid_front_rail = makeBox(
    "lid_front_rail", 1.44, 0.16, 0.14, woodMat,
    0, 1.145, 0.51, wood_frame
  );
  const lid_back_rail = makeBox(
    "lid_back_rail", 1.44, 0.16, 0.14, woodMat,
    0, 1.145, -0.51, wood_frame
  );
  const lid_left_rail = makeBox(
    "lid_left_rail", 0.14, 0.16, 0.90, woodMat,
    -0.65, 1.145, 0, wood_frame
  );
  const lid_right_rail = makeBox(
    "lid_right_rail", 0.14, 0.16, 0.90, woodMat,
    0.65, 1.145, 0, wood_frame
  );

  const lid_corner_capsGeom = new THREE.BoxGeometry(0.19, 0.18, 0.19);
  const lid_corner_caps = makeInstances(
    "lid_corner_caps",
    lid_corner_capsGeom,
    woodMat,
    [
      [-0.65, 1.145, 0.51, 0, 0, 0, 1, 1, 1],
      [0.65, 1.145, 0.51, 0, 0, 0, 1, 1, 1],
      [-0.65, 1.145, -0.51, 0, 0, 0, 1, 1, 1],
      [0.65, 1.145, -0.51, 0, 0, 0, 1, 1, 1]
    ],
    wood_frame
  );

  const front_panel_seam = makeBox(
    "front_panel_seam", 0.014, 0.67, 0.008, darkWoodMat,
    0, 0.59, 0.526, wood_frame
  );

  const front_upper_band_seam = makeBox(
    "front_upper_band_seam", 1.18, 0.012, 0.008, darkWoodMat,
    0, 0.935, 0.548, wood_frame
  );
  const back_upper_band_seam = makeBox(
    "back_upper_band_seam", 1.18, 0.012, 0.008, darkWoodMat,
    0, 0.935, -0.548, wood_frame
  );

  const front_band_outerGeom = makeDiamondGeometry(0.18, 0.125, 0.006);
  const front_band_outer_transforms = [];
  const front_band_inner_transforms = [];
  for (let i = 0; i < 6; i++) {
    const x = -0.49 + i * 0.196;
    front_band_outer_transforms.push([x, 1.00, 0.542, 0, 0, 0, 1, 1, 1]);
    front_band_inner_transforms.push([x, 1.00, 0.549, 0, 0, 0, 0.52, 0.52, 1]);
  }
  const front_band_outer_diamonds = makeInstances(
    "front_band_outer_diamonds",
    front_band_outerGeom,
    yellowMat,
    front_band_outer_transforms,
    textile_patterns
  );
  const front_band_inner_diamonds = makeInstances(
    "front_band_inner_diamonds",
    front_band_outerGeom,
    redMat,
    front_band_inner_transforms,
    textile_patterns
  );

  const front_red_zigzag = makeBox(
    "front_red_zigzag", 1.16, 0.025, 0.007, redMat,
    0, 1.058, 0.551, textile_patterns
  );
  const front_teal_zigzag = makeBox(
    "front_teal_zigzag", 1.16, 0.025, 0.007, tealMat,
    0, 0.945, 0.551, textile_patterns
  );

  const front_panel_outerGeom = makeDiamondGeometry(0.42, 0.50, 0.006);
  const front_panel_innerGeom = makeDiamondGeometry(0.31, 0.38, 0.006);
  const front_panel_coreGeom = makeDiamondGeometry(0.17, 0.22, 0.006);
  const front_outer_transforms = [
    [-0.30, 0.59, 0.526, 0, 0, 0, 1, 1, 1],
    [0.30, 0.59, 0.526, 0, 0, 0, 1, 1, 1]
  ];
  const front_inner_transforms = [
    [-0.30, 0.59, 0.533, 0, 0, 0, 1, 1, 1],
    [0.30, 0.59, 0.533, 0, 0, 0, 1, 1, 1]
  ];
  const front_core_transforms = [
    [-0.30, 0.59, 0.540, 0, 0, 0, 1, 1, 1],
    [0.30, 0.59, 0.540, 0, 0, 0, 1, 1, 1]
  ];
  const front_panel_outer_diamonds = makeInstances(
    "front_panel_outer_diamonds",
    front_panel_outerGeom,
    tealMat,
    front_outer_transforms,
    textile_patterns
  );
  const front_panel_inner_diamonds = makeInstances(
    "front_panel_inner_diamonds",
    front_panel_innerGeom,
    redMat,
    front_inner_transforms,
    textile_patterns
  );
  const front_panel_core_diamonds = makeInstances(
    "front_panel_core_diamonds",
    front_panel_coreGeom,
    yellowMat,
    front_core_transforms,
    textile_patterns
  );

  const front_cross_braceGeom = new THREE.BoxGeometry(0.075, 0.72, 0.018);
  const front_cross_brace_left = new THREE.Mesh(front_cross_braceGeom, woodMat);
  front_cross_brace_left.name = "front_cross_brace_left";
  front_cross_brace_left.position.set(0, 0.59, 0.548);
  front_cross_brace_left.rotation.z = -0.69;
  wood_frame.add(front_cross_brace_left);

  const front_cross_brace_right = new THREE.Mesh(front_cross_braceGeom, woodMat);
  front_cross_brace_right.name = "front_cross_brace_right";
  front_cross_brace_right.position.set(0, 0.59, 0.548);
  front_cross_brace_right.rotation.z = 0.69;
  wood_frame.add(front_cross_brace_right);

  const front_brace_inlayGeom = new THREE.BoxGeometry(0.022, 0.68, 0.008);
  const front_brace_inlay_left = new THREE.Mesh(front_brace_inlayGeom, wornWoodMat);
  front_brace_inlay_left.name = "front_brace_inlay_left";
  front_brace_inlay_left.position.set(0, 0.59, 0.559);
  front_brace_inlay_left.rotation.z = -0.69;
  wood_frame.add(front_brace_inlay_left);

  const front_brace_inlay_right = new THREE.Mesh(front_brace_inlayGeom, wornWoodMat);
  front_brace_inlay_right.name = "front_brace_inlay_right";
  front_brace_inlay_right.position.set(0, 0.59, 0.559);
  front_brace_inlay_right.rotation.z = 0.69;
  wood_frame.add(front_brace_inlay_right);

  const side_outerGeom = makeDiamondGeometry(0.25, 0.52, 0.006);
  const side_innerGeom = makeDiamondGeometry(0.16, 0.35, 0.006);
  const side_coreGeom = makeDiamondGeometry(0.075, 0.17, 0.006);
  const side_centers = [-0.23, 0.23];
  const side_outer_transforms = [];
  const side_inner_transforms = [];
  const side_core_transforms = [];
  for (const side of [-1, 1]) {
    for (const z of side_centers) {
      side_outer_transforms.push([
        side * 0.684, 0.59, z, 0, side * Math.PI / 2, 0, 1, 1, 1
      ]);
      side_inner_transforms.push([
        side * 0.691, 0.59, z, 0, side * Math.PI / 2, 0, 1, 1, 1
      ]);
      side_core_transforms.push([
        side * 0.698, 0.59, z, 0, side * Math.PI / 2, 0, 1, 1, 1
      ]);
    }
  }
  const side_panel_outer_diamonds = makeInstances(
    "side_panel_outer_diamonds",
    side_outerGeom,
    tealMat,
    side_outer_transforms,
    textile_patterns
  );
  const side_panel_inner_diamonds = makeInstances(
    "side_panel_inner_diamonds",
    side_innerGeom,
    redMat,
    side_inner_transforms,
    textile_patterns
  );
  const side_panel_core_diamonds = makeInstances(
    "side_panel_core_diamonds",
    side_coreGeom,
    yellowMat,
    side_core_transforms,
    textile_patterns
  );

  const side_band_outerGeom = makeDiamondGeometry(0.18, 0.125, 0.006);
  const side_band_innerGeom = makeDiamondGeometry(0.10, 0.075, 0.006);
  const side_band_outer_transforms = [];
  const side_band_inner_transforms = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = -0.30 + i * 0.20;
      side_band_outer_transforms.push([
        side * 0.704, 1.00, z, 0, side * Math.PI / 2, 0, 1, 1, 1
      ]);
      side_band_inner_transforms.push([
        side * 0.711, 1.00, z, 0, side * Math.PI / 2, 0, 1, 1, 1
      ]);
    }
  }
  const side_band_outer_diamonds = makeInstances(
    "side_band_outer_diamonds",
    side_band_outerGeom,
    yellowMat,
    side_band_outer_transforms,
    textile_patterns
  );
  const side_band_inner_diamonds = makeInstances(
    "side_band_inner_diamonds",
    side_band_innerGeom,
    redMat,
    side_band_inner_transforms,
    textile_patterns
  );

  const right_side_cross_braceGeom = new THREE.BoxGeometry(0.018, 0.68, 0.07);
  const right_side_cross_brace_forward = new THREE.Mesh(
    right_side_cross_braceGeom,
    darkWoodMat
  );
  right_side_cross_brace_forward.name = "right_side_cross_brace_forward";
  right_side_cross_brace_forward.position.set(0.708, 0.59, 0);
  right_side_cross_brace_forward.rotation.x = -0.62;
  wood_frame.add(right_side_cross_brace_forward);

  const right_side_cross_brace_backward = new THREE.Mesh(
    right_side_cross_braceGeom,
    darkWoodMat
  );
  right_side_cross_brace_backward.name = "right_side_cross_brace_backward";
  right_side_cross_brace_backward.position.set(0.708, 0.59, 0);
  right_side_cross_brace_backward.rotation.x = 0.62;
  wood_frame.add(right_side_cross_brace_backward);

  const top_outerGeom = makeDiamondGeometry(0.34, 0.25, 0.006);
  const top_innerGeom = makeDiamondGeometry(0.23, 0.16, 0.006);
  const top_coreGeom = makeDiamondGeometry(0.11, 0.08, 0.006);
  const top_outer_transforms = [];
  const top_inner_transforms = [];
  const top_core_transforms = [];
  for (const z of [-0.22, 0.22]) {
    for (const x of [-0.38, 0, 0.38]) {
      top_outer_transforms.push([
        x, 1.181, z, -Math.PI / 2, 0, 0, 1, 1, 1
      ]);
      top_inner_transforms.push([
        x, 1.188, z, -Math.PI / 2, 0, 0, 1, 1, 1
      ]);
      top_core_transforms.push([
        x, 1.195, z, -Math.PI / 2, 0, 0, 1, 1, 1
      ]);
    }
  }
  const top_outer_diamonds = makeInstances(
    "top_outer_diamonds",
    top_outerGeom,
    redMat,
    top_outer_transforms,
    textile_patterns
  );
  const top_inner_diamonds = makeInstances(
    "top_inner_diamonds",
    top_innerGeom,
    tealMat,
    top_inner_transforms,
    textile_patterns
  );
  const top_core_diamonds = makeInstances(
    "top_core_diamonds",
    top_coreGeom,
    yellowMat,
    top_core_transforms,
    textile_patterns
  );

  const top_crosswise_braceGeom = new THREE.BoxGeometry(1.12, 0.022, 0.07);
  const top_crosswise_brace = new THREE.Mesh(
    top_crosswise_braceGeom,
    wornWoodMat
  );
  top_crosswise_brace.name = "top_crosswise_brace";
  top_crosswise_brace.position.set(0, 1.205, 0);
  top_crosswise_brace.rotation.y = 0.34;
  wood_frame.add(top_crosswise_brace);

  const top_lengthwise_braceGeom = new THREE.BoxGeometry(0.07, 0.022, 0.76);
  const top_lengthwise_brace = new THREE.Mesh(
    top_lengthwise_braceGeom,
    woodMat
  );
  top_lengthwise_brace.name = "top_lengthwise_brace";
  top_lengthwise_brace.position.set(0, 1.207, 0);
  top_lengthwise_brace.rotation.y = -0.34;
  wood_frame.add(top_lengthwise_brace);

  const flower_centers = [
    [-0.44, 0.43], [-0.22, 0.72], [-0.44, 0.78],
    [0.22, 0.43], [0.44, 0.70], [0.22, 0.78]
  ];
  const petalGeom = new THREE.CircleGeometry(0.025, 12);
  const centerGeom = new THREE.CircleGeometry(0.018, 12);
  const leafGeom = new THREE.CircleGeometry(0.025, 12);
  const red_petal_transforms = [];
  const cream_petal_transforms = [];
  const yellow_center_transforms = [];
  const leaf_transforms = [];

  for (let f = 0; f < flower_centers.length; f++) {
    const cx = flower_centers[f][0];
    const cy = flower_centers[f][1];
    for (let i = 0; i < 5; i++) {
      const angle = i / 5 * Math.PI * 2;
      const px = cx + Math.cos(angle) * 0.038;
      const py = cy + Math.sin(angle) * 0.038;
      const transform = [
        px, py, 0.555, 0, 0, angle - Math.PI / 2, 0.62, 1.2, 1
      ];
      if ((f + i) % 2 === 0) {
        red_petal_transforms.push(transform);
      } else {
        cream_petal_transforms.push(transform);
      }
    }
    yellow_center_transforms.push([
      cx, cy, 0.558, 0, 0, 0, 1, 1, 1
    ]);
    leaf_transforms.push([
      cx + 0.065, cy - 0.045, 0.553, 0, 0, -0.65, 0.48, 1.25, 1
    ]);
    leaf_transforms.push([
      cx - 0.060, cy + 0.040, 0.553, 0, 0, 0.75, 0.48, 1.25, 1
    ]);
  }

  const front_red_flower_petals = makeInstances(
    "front_red_flower_petals",
    petalGeom,
    redMat,
    red_petal_transforms,
    textile_patterns
  );
  const front_cream_flower_petals = makeInstances(
    "front_cream_flower_petals",
    petalGeom,
    creamMat,
    cream_petal_transforms,
    textile_patterns
  );
  const front_yellow_flower_centers = makeInstances(
    "front_yellow_flower_centers",
    centerGeom,
    yellowMat,
    yellow_center_transforms,
    textile_patterns
  );
  const front_green_leaves = makeInstances(
    "front_green_leaves",
    leafGeom,
    greenMat,
    leaf_transforms,
    textile_patterns
  );

  const side_leaf_transforms = [];
  for (const side of [-1, 1]) {
    for (const z of side_centers) {
      side_leaf_transforms.push([
        side * 0.705, 0.48, z - 0.065, 0, side * Math.PI / 2, -0.5,
        0.48, 1.25, 1
      ]);
      side_leaf_transforms.push([
        side * 0.705, 0.70, z + 0.065, 0, side * Math.PI / 2, 0.5,
        0.48, 1.25, 1
      ]);
    }
  }
  const side_green_leaves = makeInstances(
    "side_green_leaves",
    leafGeom,
    greenMat,
    side_leaf_transforms,
    textile_patterns
  );

  const front_corner_strapsGeom = new THREE.BoxGeometry(0.17, 0.075, 0.018);
  const front_corner_straps = makeInstances(
    "front_corner_straps",
    front_corner_strapsGeom,
    darkMetalMat,
    [
      [-postX, 0.91, 0.596, 0, 0, 0, 1, 1, 1],
      [postX, 0.91, 0.596, 0, 0, 0, 1, 1, 1],
      [-postX, 0.105, 0.596, 0, 0, 0, 1, 1, 1],
      [postX, 0.105, 0.596, 0, 0, 0, 1, 1, 1]
    ],
    hardware
  );

  const side_corner_strapsGeom = new THREE.BoxGeometry(0.018, 0.075, 0.17);
  const side_corner_straps = makeInstances(
    "side_corner_straps",
    side_corner_strapsGeom,
    darkMetalMat,
    [
      [-0.768, 0.91, postZ, 0, 0, 0, 1, 1, 1],
      [-0.768, 0.105, postZ, 0, 0, 0, 1, 1, 1],
      [0.768, 0.91, postZ, 0, 0, 0, 1, 1, 1],
      [0.768, 0.105, postZ, 0, 0, 0, 1, 1, 1],
      [-0.768, 0.91, -postZ, 0, 0, 0, 1, 1, 1],
      [-0.768, 0.105, -postZ, 0, 0, 0, 1, 1, 1],
      [0.768, 0.91, -postZ, 0, 0, 0, 1, 1, 1],
      [0.768, 0.105, -postZ, 0, 0, 0, 1, 1, 1]
    ],
    hardware
  );

  const latch_upper_plateGeom = new THREE.CylinderGeometry(
    0.085, 0.085, 0.024, 20
  );
  const latch_upper_plate = new THREE.Mesh(latch_upper_plateGeom, brassMat);
  latch_upper_plate.name = "latch_upper_plate";
  latch_upper_plate.rotation.x = Math.PI / 2;
  latch_upper_plate.scale.set(1.2, 1, 0.8);
  latch_upper_plate.position.set(0, 1.005, 0.608);
  hardware.add(latch_upper_plate);

  const latch_lower_plateGeom = new THREE.CylinderGeometry(
    0.072, 0.072, 0.024, 20
  );
  const latch_lower_plate = new THREE.Mesh(latch_lower_plateGeom, brassMat);
  latch_lower_plate.name = "latch_lower_plate";
  latch_lower_plate.rotation.x = Math.PI / 2;
  latch_lower_plate.scale.set(1.15, 1, 0.8);
  latch_lower_plate.position.set(0, 0.865, 0.608);
  hardware.add(latch_lower_plate);

  const latch_haspShape = new THREE.Shape();
  latch_haspShape.moveTo(-0.036, 0.13);
  latch_haspShape.lineTo(0.036, 0.13);
  latch_haspShape.lineTo(0.040, 0.025);
  latch_haspShape.lineTo(0.056, -0.015);
  latch_haspShape.lineTo(0.052, -0.145);
  latch_haspShape.bezierCurveTo(0.050, -0.195, 0.025, -0.225, 0, -0.235);
  latch_haspShape.bezierCurveTo(-0.025, -0.225, -0.050, -0.195, -0.052, -0.145);
  latch_haspShape.lineTo(-0.056, -0.015);
  latch_haspShape.lineTo(-0.040, 0.025);
  latch_haspShape.lineTo(-0.036, 0.13);
  const latch_haspGeom = new THREE.ExtrudeGeometry(latch_haspShape, {
    depth: 0.022,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.003,
    bevelSegments: 2
  });
  const latch_hasp = new THREE.Mesh(latch_haspGeom, brassMat);
  latch_hasp.name = "latch_hasp";
  latch_hasp.position.set(0, 0.82, 0.618);
  hardware.add(latch_hasp);

  const latch_hinge_barrelGeom = new THREE.CylinderGeometry(
    0.025, 0.025, 0.15, 14
  );
  const latch_hinge_barrel = new THREE.Mesh(
    latch_hinge_barrelGeom,
    brassMat
  );
  latch_hinge_barrel.name = "latch_hinge_barrel";
  latch_hinge_barrel.rotation.z = Math.PI / 2;
  latch_hinge_barrel.position.set(0, 0.915, 0.626);
  hardware.add(latch_hinge_barrel);

  const latch_keyhole = makeBox(
    "latch_keyhole", 0.014, 0.040, 0.008, darkMetalMat,
    0, 0.685, 0.646, hardware
  );

  const ring_mountGeom = new THREE.CylinderGeometry(
    0.025, 0.025, 0.018, 14
  );
  const ring_mount = new THREE.Mesh(ring_mountGeom, brassMat);
  ring_mount.name = "ring_mount";
  ring_mount.rotation.x = Math.PI / 2;
  ring_mount.position.set(0.065, 0.765, 0.638);
  hardware.add(ring_mount);

  const latch_ringGeom = new THREE.TorusGeometry(0.043, 0.008, 8, 20);
  const latch_ring = new THREE.Mesh(latch_ringGeom, brassMat);
  latch_ring.name = "latch_ring";
  latch_ring.scale.set(0.75, 1.15, 1);
  latch_ring.position.set(0.075, 0.725, 0.650);
  hardware.add(latch_ring);

  const rivetGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.012, 12);
  const front_rivet_transforms = [];
  for (const x of [-0.68, 0.68]) {
    for (const y of [0.105, 0.30, 0.58, 0.84, 1.02]) {
      front_rivet_transforms.push([
        x, y, 0.612, Math.PI / 2, 0, 0, 1, 1, 1
      ]);
    }
  }
  for (const x of [-0.50, -0.25, 0, 0.25, 0.50]) {
    front_rivet_transforms.push([
      x, 0.105, 0.594, Math.PI / 2, 0, 0, 1, 1, 1
    ]);
    front_rivet_transforms.push([
      x, 0.91, 0.594, Math.PI / 2, 0, 0, 1, 1, 1
    ]);
  }
  for (const x of [-0.055, 0.055]) {
    front_rivet_transforms.push([
      x, 1.005, 0.628, Math.PI / 2, 0, 0, 1, 1, 1
    ]);
    front_rivet_transforms.push([
      x, 0.865, 0.628, Math.PI / 2, 0, 0, 1, 1, 1
    ]);
  }
  front_rivet_transforms.push([0, 0.755, 0.650, Math.PI / 2, 0, 0, 1, 1, 1]);

  const front_rivets = makeInstances(
    "front_rivets",
    rivetGeom,
    ironMat,
    front_rivet_transforms,
    hardware
  );

  const side_rivet_transforms = [];
  for (const side of [-1, 1]) {
    for (const z of [-0.49, 0.49]) {
      for (const y of [0.105, 0.48, 0.91]) {
        side_rivet_transforms.push([
          side * 0.778, y, z, 0, 0, Math.PI / 2, 1, 1, 1
        ]);
      }
    }
  }
  const side_rivets = makeInstances(
    "side_rivets",
    rivetGeom,
    ironMat,
    side_rivet_transforms,
    hardware
  );

  const lid_rivet_transforms = [];
  for (const x of [-0.50, -0.25, 0, 0.25, 0.50]) {
    lid_rivet_transforms.push([
      x, 1.231, 0.51, 0, 0, 0, 1, 1, 1
    ]);
    lid_rivet_transforms.push([
      x, 1.231, -0.51, 0, 0, 0, 1, 1, 1
    ]);
  }
  for (const z of [-0.25, 0, 0.25]) {
    lid_rivet_transforms.push([
      -0.65, 1.231, z, 0, 0, 0, 1, 1, 1
    ]);
    lid_rivet_transforms.push([
      0.65, 1.231, z, 0, 0, 0, 1, 1, 1
    ]);
  }
  const lid_rivets = makeInstances(
    "lid_rivets",
    rivetGeom,
    ironMat,
    lid_rivet_transforms,
    hardware
  );

  const knotGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.006, 12);
  const knot_transforms = [
    [-0.53, 0.105, 0.589, Math.PI / 2, 0, 0, 1.4, 0.65, 1],
    [0.38, 0.105, 0.589, Math.PI / 2, 0, 0, 0.8, 0.55, 1],
    [-0.48, 0.91, 0.589, Math.PI / 2, 0, 0, 0.75, 0.55, 1],
    [0.43, 0.91, 0.589, Math.PI / 2, 0, 0, 1.1, 0.65, 1],
    [-0.68, 0.45, 0.613, Math.PI / 2, 0, 0, 0.75, 1.25, 1],
    [0.68, 0.35, 0.613, Math.PI / 2, 0, 0, 0.65, 1.1, 1],
    [0.68, 0.72, 0.613, Math.PI / 2, 0, 0, 0.8, 1.35, 1]
  ];
  const wood_knots = makeInstances(
    "wood_knots",
    knotGeom,
    darkWoodMat,
    knot_transforms,
    wood_details
  );

  const grainGeom = new THREE.BoxGeometry(0.22, 0.007, 0.005);
  const grain_transforms = [
    [-0.42, 0.075, 0.588, 0, 0, 0.04, 1, 1, 1],
    [-0.10, 0.135, 0.588, 0, 0, -0.03, 0.8, 1, 1],
    [0.25, 0.070, 0.588, 0, 0, 0.02, 1.15, 1, 1],
    [0.48, 0.135, 0.588, 0, 0, -0.05, 0.65, 1, 1],
    [-0.42, 0.885, 0.588, 0, 0, -0.03, 0.9, 1, 1],
    [-0.05, 0.935, 0.588, 0, 0, 0.02, 1.1, 1, 1],
    [0.35, 0.890, 0.588, 0, 0, -0.02, 0.8, 1, 1],
    [-0.68, 0.28, 0.612, 0, 0, Math.PI / 2, 0.75, 1, 1],
    [-0.68, 0.67, 0.612, 0, 0, Math.PI / 2, 0.9, 1, 1],
    [0.68, 0.23, 0.612, 0, 0, Math.PI / 2, 0.65, 1, 1],
    [0.68, 0.55, 0.612, 0, 0, Math.PI / 2, 0.85, 1, 1],
    [0.68, 0.82, 0.612, 0, 0, Math.PI / 2, 0.6, 1, 1]
  ];
  const wood_grain_marks = makeInstances(
    "wood_grain_marks",
    grainGeom,
    darkWoodMat,
    grain_transforms,
    wood_details
  );

  const lid_top_grain_transforms = [
    [-0.42, 1.228, 0.49, 0, 0.04, 0, 0.8, 1, 1],
    [-0.12, 1.228, 0.53, 0, -0.03, 0, 1.0, 1, 1],
    [0.22, 1.228, 0.49, 0, 0.02, 0, 0.75, 1, 1],
    [0.46, 1.228, 0.53, 0, -0.04, 0, 0.65, 1, 1],
    [-0.63, 1.228, -0.18, 0, Math.PI / 2, 0.03, 0.7, 1, 1],
    [-0.63, 1.228, 0.18, 0, Math.PI / 2, -0.03, 0.8, 1, 1],
    [0.63, 1.228, -0.15, 0, Math.PI / 2, -0.02, 0.75, 1, 1],
    [0.63, 1.228, 0.20, 0, Math.PI / 2, 0.04, 0.65, 1, 1]
  ];
  const lid_top_grain = makeInstances(
    "lid_top_grain",
    grainGeom,
    darkWoodMat,
    lid_top_grain_transforms,
    wood_details
  );

  fitToUnitCube(root);
  return root;

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
}