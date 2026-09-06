export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_fire_lantern";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  const burner_group = new THREE.Group();
  burner_group.name = "burner_group";
  const glass_group = new THREE.Group();
  glass_group.name = "glass_group";
  const chimney_group = new THREE.Group();
  chimney_group.name = "chimney_group";
  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";

  root.add(
    base_group,
    frame_group,
    burner_group,
    glass_group,
    chimney_group,
    handle_group
  );

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x70472c,
    metalness: 0.0,
    roughness: 0.9
  });
  const woodLightMat = new THREE.MeshStandardMaterial({
    color: 0x8b5c38,
    metalness: 0.0,
    roughness: 0.9
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x4c2f20,
    metalness: 0.0,
    roughness: 0.9
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x35231a,
    metalness: 0.0,
    roughness: 0.9
  });
  const bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x6f4b32,
    metalness: 0.6,
    roughness: 0.5
  });
  const bronzeDarkMat = new THREE.MeshStandardMaterial({
    color: 0x3f2c22,
    metalness: 0.6,
    roughness: 0.5
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.6,
    roughness: 0.5
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const holeMat = new THREE.MeshBasicMaterial({
    color: 0x050403,
    side: THREE.DoubleSide
  });
  const flameOrangeMat = new THREE.MeshStandardMaterial({
    color: 0xff6a16,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff6a16,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });
  const flameYellowMat = new THREE.MeshStandardMaterial({
    color: 0xffd45b,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xffd45b,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });
  const flameCoreMat = new THREE.MeshStandardMaterial({
    color: 0xfff1a8,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xfff1a8,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function makeRoundedBoxGeometry(width, height, depth, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeFrustumBoxGeometry(bottomWidth, topWidth, height, depth) {
    const y0 = -height / 2;
    const y1 = height / 2;
    const bx = bottomWidth / 2;
    const tx = topWidth / 2;
    const bz = depth / 2;
    const positions = [
      -bx, y0, -bz, bx, y0, -bz, bx, y0, bz, -bx, y0, bz,
      -tx, y1, -bz, tx, y1, -bz, tx, y1, bz, -tx, y1, bz
    ];
    const indices = [
      0, 1, 2, 0, 2, 3,
      4, 6, 5, 4, 7, 6,
      0, 4, 5, 0, 5, 1,
      1, 5, 6, 1, 6, 2,
      2, 6, 7, 2, 7, 3,
      3, 7, 4, 3, 4, 0
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const bottom_plinthGeom = makeRoundedBoxGeometry(
    1.16,
    0.14,
    0.80,
    0.035,
    0.012
  );
  const bottom_plinth = new THREE.Mesh(bottom_plinthGeom, woodDarkMat);
  bottom_plinth.name = "bottom_plinth";
  bottom_plinth.position.y = 0.07;
  base_group.add(bottom_plinth);

  const base_front_stepGeom = makeRoundedBoxGeometry(
    1.08,
    0.075,
    0.72,
    0.025,
    0.009
  );
  const base_front_step = new THREE.Mesh(base_front_stepGeom, woodMat);
  base_front_step.name = "base_front_step";
  base_front_step.position.y = 0.165;
  base_group.add(base_front_step);

  const base_pedestalGeom = makeFrustumBoxGeometry(
    1.04,
    0.84,
    0.35,
    0.66
  );
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, woodMat);
  base_pedestal.name = "base_pedestal";
  base_pedestal.position.y = 0.335;
  base_group.add(base_pedestal);

  const floor_platformGeom = makeRoundedBoxGeometry(
    0.84,
    0.075,
    0.58,
    0.025,
    0.008
  );
  const floor_platform = new THREE.Mesh(floor_platformGeom, woodLightMat);
  floor_platform.name = "floor_platform";
  floor_platform.position.y = 0.515;
  base_group.add(floor_platform);

  const brand_positions = [];
  const brand_z = 0.339;
  const letter_w = 0.064;
  const letter_h = 0.105;
  const letter_gap = 0.018;
  const brand_start = -0.172;
  const brand_base = 0.255;

  function addBrandStroke(x1, y1, x2, y2) {
    brand_positions.push(x1, y1, brand_z, x2, y2, brand_z);
  }

  function addBrandLetter(kind, x, y, w, h) {
    const xm = x + w / 2;
    const xr = x + w;
    const ym = y + h / 2;
    const yt = y + h;

    if (kind === "A") {
      addBrandStroke(x, y, xm, yt);
      addBrandStroke(xm, yt, xr, y);
      addBrandStroke(x + w * 0.22, ym, x + w * 0.78, ym);
    } else if (kind === "L") {
      addBrandStroke(x, yt, x, y);
      addBrandStroke(x, y, xr, y);
    } else if (kind === "O") {
      addBrandStroke(x, y, x, yt);
      addBrandStroke(x, yt, xr, yt);
      addBrandStroke(xr, yt, xr, y);
      addBrandStroke(xr, y, x, y);
    } else if (kind === "R") {
      addBrandStroke(x, y, x, yt);
      addBrandStroke(x, yt, xr, yt);
      addBrandStroke(xr, yt, xr, ym);
      addBrandStroke(xr, ym, x, ym);
      addBrandStroke(xm, ym, xr, y);
    } else if (kind === "T") {
      addBrandStroke(x, yt, xr, yt);
      addBrandStroke(xm, yt, xm, y);
    }
  }

  const brand_letters = ["A", "L", "O", "R", "T"];
  for (let i = 0; i < brand_letters.length; i++) {
    addBrandLetter(
      brand_letters[i],
      brand_start + i * (letter_w + letter_gap),
      brand_base,
      letter_w,
      letter_h
    );
  }

  const brand_markGeom = new THREE.BufferGeometry();
  brand_markGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(brand_positions, 3)
  );
  const brand_markMat = new THREE.LineBasicMaterial({
    color: 0x211b18
  });
  const brand_mark = new THREE.LineSegments(
    brand_markGeom,
    brand_markMat
  );
  brand_mark.name = "brand_mark";
  base_group.add(brand_mark);

  const base_grain_data = [
    [-0.28, 0.045, 0.576, 0.34, 0.006, 0.008],
    [0.25, 0.050, 0.576, 0.28, 0.005, 0.008],
    [-0.12, 0.105, 0.576, 0.42, 0.005, 0.008],
    [0.31, 0.120, 0.576, 0.22, 0.004, 0.008],
    [-0.32, 0.205, 0.329, 0.22, 0.004, 0.007],
    [0.20, 0.220, 0.332, 0.30, 0.005, 0.007],
    [-0.12, 0.285, 0.336, 0.37, 0.004, 0.007],
    [0.28, 0.315, 0.338, 0.18, 0.004, 0.007],
    [-0.25, 0.370, 0.341, 0.25, 0.005, 0.007],
    [0.08, 0.405, 0.343, 0.34, 0.004, 0.007]
  ];
  const base_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const base_wood_grain = new THREE.InstancedMesh(
    base_wood_grainGeom,
    grainMat,
    base_grain_data.length
  );
  base_wood_grain.name = "base_wood_grain";
  const base_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < base_grain_data.length; i++) {
    const item = base_grain_data[i];
    base_grain_dummy.position.set(item[0], item[1], item[2]);
    base_grain_dummy.rotation.set(0, 0, 0);
    base_grain_dummy.scale.set(item[3], item[4], item[5]);
    base_grain_dummy.updateMatrix();
    base_wood_grain.setMatrixAt(i, base_grain_dummy.matrix);
  }
  base_wood_grain.instanceMatrix.needsUpdate = true;
  base_group.add(base_wood_grain);

  const side_postsGeom = makeRoundedBoxGeometry(
    0.145,
    1.30,
    0.15,
    0.055,
    0.009
  );
  const side_posts = new THREE.InstancedMesh(
    side_postsGeom,
    woodLightMat,
    2
  );
  side_posts.name = "side_posts";
  const side_post_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    side_post_dummy.position.set(side * 0.43, 1.18, 0.19);
    side_post_dummy.rotation.set(0, 0, side * 0.075);
    side_post_dummy.scale.set(1, 1, 1);
    side_post_dummy.updateMatrix();
    side_posts.setMatrixAt(i, side_post_dummy.matrix);
  }
  side_posts.instanceMatrix.needsUpdate = true;
  frame_group.add(side_posts);

  const post_grain_data = [
    [-0.465, 0.72, 0.274, 0.006, 0.28, 0.006, -0.075],
    [-0.435, 1.05, 0.274, 0.005, 0.34, 0.006, -0.075],
    [-0.410, 1.42, 0.274, 0.006, 0.24, 0.006, -0.075],
    [-0.455, 1.63, 0.274, 0.004, 0.18, 0.006, -0.075],
    [0.465, 0.72, 0.274, 0.006, 0.28, 0.006, 0.075],
    [0.435, 1.05, 0.274, 0.005, 0.34, 0.006, 0.075],
    [0.410, 1.42, 0.274, 0.006, 0.24, 0.006, 0.075],
    [0.455, 1.63, 0.274, 0.004, 0.18, 0.006, 0.075]
  ];
  const post_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const post_wood_grain = new THREE.InstancedMesh(
    post_wood_grainGeom,
    grainMat,
    post_grain_data.length
  );
  post_wood_grain.name = "post_wood_grain";
  const post_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < post_grain_data.length; i++) {
    const item = post_grain_data[i];
    post_grain_dummy.position.set(item[0], item[1], item[2]);
    post_grain_dummy.rotation.set(0, 0, item[6]);
    post_grain_dummy.scale.set(item[3], item[4], item[5]);
    post_grain_dummy.updateMatrix();
    post_wood_grain.setMatrixAt(i, post_grain_dummy.matrix);
  }
  post_wood_grain.instanceMatrix.needsUpdate = true;
  frame_group.add(post_wood_grain);

  const top_headerGeom = makeRoundedBoxGeometry(
    0.82,
    0.16,
    0.18,
    0.025,
    0.008
  );
  const top_header = new THREE.Mesh(top_headerGeom, woodDarkMat);
  top_header.name = "top_header";
  top_header.position.set(0, 1.72, 0.18);
  frame_group.add(top_header);

  const top_capGeom = makeRoundedBoxGeometry(
    1.18,
    0.15,
    0.78,
    0.045,
    0.014
  );
  const top_cap = new THREE.Mesh(top_capGeom, woodLightMat);
  top_cap.name = "top_cap";
  top_cap.position.set(0, 1.855, 0.02);
  frame_group.add(top_cap);

  const top_grain_data = [
    [-0.32, 1.825, 0.426, 0.28, 0.005, 0.006],
    [0.20, 1.835, 0.426, 0.36, 0.004, 0.006],
    [-0.08, 1.880, 0.426, 0.45, 0.005, 0.006],
    [0.35, 1.895, 0.426, 0.18, 0.004, 0.006],
    [-0.34, 1.943, -0.20, 0.28, 0.005, 0.006],
    [0.17, 1.943, 0.08, 0.40, 0.004, 0.006],
    [-0.10, 1.943, 0.27, 0.32, 0.005, 0.006]
  ];
  const top_wood_grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_wood_grain = new THREE.InstancedMesh(
    top_wood_grainGeom,
    grainMat,
    top_grain_data.length
  );
  top_wood_grain.name = "top_wood_grain";
  const top_grain_dummy = new THREE.Object3D();
  for (let i = 0; i < top_grain_data.length; i++) {
    const item = top_grain_data[i];
    top_grain_dummy.position.set(item[0], item[1], item[2]);
    top_grain_dummy.rotation.set(0, 0, 0);
    top_grain_dummy.scale.set(item[3], item[4], item[5]);
    top_grain_dummy.updateMatrix();
    top_wood_grain.setMatrixAt(i, top_grain_dummy.matrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  frame_group.add(top_wood_grain);

  const burner_baseGeom = new THREE.CylinderGeometry(
    0.225,
    0.225,
    0.075,
    32
  );
  const burner_base = new THREE.Mesh(burner_baseGeom, bronzeDarkMat);
  burner_base.name = "burner_base";
  burner_base.position.y = 0.57;
  burner_group.add(burner_base);

  const fuel_reservoirGeom = new THREE.CylinderGeometry(
    0.19,
    0.205,
    0.29,
    32
  );
  const fuel_reservoir = new THREE.Mesh(
    fuel_reservoirGeom,
    bronzeMat
  );
  fuel_reservoir.name = "fuel_reservoir";
  fuel_reservoir.position.y = 0.72;
  burner_group.add(fuel_reservoir);

  const burner_bowlGeom = new THREE.CylinderGeometry(
    0.225,
    0.19,
    0.065,
    32
  );
  const burner_bowl = new THREE.Mesh(
    burner_bowlGeom,
    bronzeDarkMat
  );
  burner_bowl.name = "burner_bowl";
  burner_bowl.position.y = 0.875;
  burner_group.add(burner_bowl);

  const burner_rimGeom = new THREE.TorusGeometry(
    0.215,
    0.018,
    10,
    40
  );
  const burner_rim = new THREE.Mesh(burner_rimGeom, bronzeMat);
  burner_rim.name = "burner_rim";
  burner_rim.rotation.x = Math.PI / 2;
  burner_rim.position.y = 0.905;
  burner_group.add(burner_rim);

  const wick_holderGeom = new THREE.CylinderGeometry(
    0.105,
    0.12,
    0.035,
    24
  );
  const wick_holder = new THREE.Mesh(
    wick_holderGeom,
    bronzeDarkMat
  );
  wick_holder.name = "wick_holder";
  wick_holder.position.y = 0.925;
  burner_group.add(wick_holder);

  const burner_screwsGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.012,
    12
  );
  const burner_screws = new THREE.InstancedMesh(
    burner_screwsGeom,
    silverMat,
    2
  );
  burner_screws.name = "burner_screws";
  const burner_screw_dummy = new THREE.Object3D();
  const burner_screw_x = [-0.09, 0.09];
  for (let i = 0; i < 2; i++) {
    burner_screw_dummy.position.set(
      burner_screw_x[i],
      0.69,
      0.202
    );
    burner_screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    burner_screw_dummy.scale.set(1, 1, 1);
    burner_screw_dummy.updateMatrix();
    burner_screws.setMatrixAt(i, burner_screw_dummy.matrix);
  }
  burner_screws.instanceMatrix.needsUpdate = true;
  burner_group.add(burner_screws);

  const burner_control_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.18, 0.76, 0.035),
      new THREE.Vector3(0.28, 0.76, 0.045),
      new THREE.Vector3(0.34, 0.81, 0.05),
      new THREE.Vector3(0.35, 0.90, 0.05),
      new THREE.Vector3(0.39, 0.92, 0.05)
    ],
    false,
    "centripetal"
  );
  const burner_control_pipeGeom = new THREE.TubeGeometry(
    burner_control_curve,
    28,
    0.014,
    8,
    false
  );
  const burner_control_pipe = new THREE.Mesh(
    burner_control_pipeGeom,
    bronzeDarkMat
  );
  burner_control_pipe.name = "burner_control_pipe";
  burner_group.add(burner_control_pipe);

  const burner_control_knobGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.075,
    16
  );
  const burner_control_knob = new THREE.Mesh(
    burner_control_knobGeom,
    bronzeDarkMat
  );
  burner_control_knob.name = "burner_control_knob";
  burner_control_knob.rotation.z = Math.PI / 2;
  burner_control_knob.position.set(0.415, 0.92, 0.05);
  burner_group.add(burner_control_knob);

  const outer_glass_profile = new THREE.SplineCurve([
    new THREE.Vector2(0.19, 0.89),
    new THREE.Vector2(0.255, 0.91),
    new THREE.Vector2(0.295, 0.97),
    new THREE.Vector2(0.31, 1.08),
    new THREE.Vector2(0.305, 1.27),
    new THREE.Vector2(0.29, 1.48),
    new THREE.Vector2(0.265, 1.68)
  ]).getSpacedPoints(48);
  const outer_glassGeom = new THREE.LatheGeometry(
    outer_glass_profile,
    48
  );
  const outer_glass = new THREE.Mesh(outer_glassGeom, glassMat);
  outer_glass.name = "outer_glass";
  glass_group.add(outer_glass);

  const glass_lower_rimGeom = new THREE.TorusGeometry(
    0.205,
    0.012,
    8,
    40
  );
  const glass_lower_rim = new THREE.Mesh(
    glass_lower_rimGeom,
    glassMat
  );
  glass_lower_rim.name = "glass_lower_rim";
  glass_lower_rim.rotation.x = Math.PI / 2;
  glass_lower_rim.position.y = 0.90;
  glass_group.add(glass_lower_rim);

  const glass_upper_rimGeom = new THREE.TorusGeometry(
    0.265,
    0.011,
    8,
    40
  );
  const glass_upper_rim = new THREE.Mesh(
    glass_upper_rimGeom,
    glassMat
  );
  glass_upper_rim.name = "glass_upper_rim";
  glass_upper_rim.rotation.x = Math.PI / 2;
  glass_upper_rim.position.y = 1.68;
  glass_group.add(glass_upper_rim);

  const glass_seam_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.92, 0.245),
      new THREE.Vector3(0, 1.10, 0.295),
      new THREE.Vector3(0, 1.35, 0.300),
      new THREE.Vector3(0, 1.64, 0.270)
    ],
    false,
    "centripetal"
  );
  const glass_seamGeom = new THREE.TubeGeometry(
    glass_seam_curve,
    24,
    0.0025,
    6,
    false
  );
  const glass_seam = new THREE.Mesh(
    glass_seamGeom,
    bronzeDarkMat
  );
  glass_seam.name = "glass_seam";
  glass_group.add(glass_seam);

  const glass_highlightGeom = new THREE.CircleGeometry(0.05, 20);

  const glass_highlight_left = new THREE.Mesh(
    glass_highlightGeom,
    highlightMat
  );
  glass_highlight_left.name = "glass_highlight_left";
  glass_highlight_left.position.set(-0.13, 1.37, 0.282);
  glass_highlight_left.rotation.y = -0.43;
  glass_highlight_left.scale.set(0.42, 2.55, 1);
  glass_group.add(glass_highlight_left);

  const glass_highlight_right = new THREE.Mesh(
    glass_highlightGeom,
    highlightMat
  );
  glass_highlight_right.name = "glass_highlight_right";
  glass_highlight_right.position.set(0.16, 1.25, 0.274);
  glass_highlight_right.rotation.y = 0.52;
  glass_highlight_right.scale.set(0.28, 1.85, 1);
  glass_group.add(glass_highlight_right);

  const flame_outer_shape = new THREE.Shape();
  flame_outer_shape.moveTo(0, 0);
  flame_outer_shape.bezierCurveTo(
    -0.13,
    0.06,
    -0.16,
    0.18,
    -0.08,
    0.28
  );
  flame_outer_shape.bezierCurveTo(
    -0.18,
    0.40,
    -0.06,
    0.52,
    -0.035,
    0.68
  );
  flame_outer_shape.bezierCurveTo(
    0.08,
    0.56,
    0.14,
    0.45,
    0.08,
    0.34
  );
  flame_outer_shape.bezierCurveTo(
    0.20,
    0.23,
    0.14,
    0.08,
    0,
    0
  );

  const flame_outerGeom = new THREE.ShapeGeometry(
    flame_outer_shape,
    20
  );
  const flame_outer = new THREE.Mesh(
    flame_outerGeom,
    flameOrangeMat
  );
  flame_outer.name = "flame_outer";
  flame_outer.position.set(0, 0.93, 0.035);
  glass_group.add(flame_outer);

  const flame_side = new THREE.Mesh(
    flame_outerGeom,
    flameOrangeMat
  );
  flame_side.name = "flame_side";
  flame_side.position.set(0, 0.93, 0.035);
  flame_side.rotation.y = Math.PI / 2;
  flame_side.scale.set(0.82, 0.92, 0.82);
  glass_group.add(flame_side);

  const flame_middle_shape = new THREE.Shape();
  flame_middle_shape.moveTo(0, 0.01);
  flame_middle_shape.bezierCurveTo(
    -0.085,
    0.09,
    -0.09,
    0.19,
    -0.035,
    0.28
  );
  flame_middle_shape.bezierCurveTo(
    -0.08,
    0.38,
    0.02,
    0.47,
    0.015,
    0.56
  );
  flame_middle_shape.bezierCurveTo(
    0.10,
    0.43,
    0.09,
    0.31,
    0.055,
    0.22
  );
  flame_middle_shape.bezierCurveTo(
    0.10,
    0.13,
    0.07,
    0.05,
    0,
    0.01
  );

  const flame_middleGeom = new THREE.ShapeGeometry(
    flame_middle_shape,
    18
  );
  const flame_middle = new THREE.Mesh(
    flame_middleGeom,
    flameYellowMat
  );
  flame_middle.name = "flame_middle";
  flame_middle.position.set(0.005, 0.93, 0.045);
  glass_group.add(flame_middle);

  const flame_core_shape = new THREE.Shape();
  flame_core_shape.moveTo(0, 0.02);
  flame_core_shape.bezierCurveTo(
    -0.045,
    0.09,
    -0.04,
    0.16,
    -0.012,
    0.22
  );
  flame_core_shape.bezierCurveTo(
    -0.02,
    0.28,
    0.035,
    0.32,
    0.025,
    0.39
  );
  flame_core_shape.bezierCurveTo(
    0.075,
    0.29,
    0.06,
    0.18,
    0.04,
    0.11
  );
  flame_core_shape.bezierCurveTo(
    0.06,
    0.07,
    0.035,
    0.03,
    0,
    0.02
  );

  const flame_coreGeom = new THREE.ShapeGeometry(
    flame_core_shape,
    16
  );
  const flame_core = new THREE.Mesh(
    flame_coreGeom,
    flameCoreMat
  );
  flame_core.name = "flame_core";
  flame_core.position.set(0.006, 0.93, 0.052);
  glass_group.add(flame_core);

  const chimney_lower_collarGeom = new THREE.CylinderGeometry(
    0.285,
    0.285,
    0.055,
    40
  );
  const chimney_lower_collar = new THREE.Mesh(
    chimney_lower_collarGeom,
    bronzeDarkMat
  );
  chimney_lower_collar.name = "chimney_lower_collar";
  chimney_lower_collar.position.y = 1.705;
  chimney_group.add(chimney_lower_collar);

  const chimney_bodyGeom = new THREE.CylinderGeometry(
    0.26,
    0.26,
    0.43,
    40
  );
  const chimney_body = new THREE.Mesh(
    chimney_bodyGeom,
    bronzeMat
  );
  chimney_body.name = "chimney_body";
  chimney_body.position.y = 2.015;
  chimney_group.add(chimney_body);

  const vent_holesGeom = new THREE.CircleGeometry(0.043, 18);
  const vent_holes = new THREE.InstancedMesh(
    vent_holesGeom,
    holeMat,
    12
  );
  vent_holes.name = "vent_holes";
  const vent_dummy = new THREE.Object3D();
  const vent_forward = new THREE.Vector3(0, 0, 1);
  const vent_normal = new THREE.Vector3();
  const vent_rows = [2.09, 1.94];
  let vent_index = 0;
  for (let row = 0; row < vent_rows.length; row++) {
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2 + row * Math.PI / 6;
      vent_normal.set(
        Math.sin(angle),
        0,
        Math.cos(angle)
      ).normalize();
      vent_dummy.position.set(
        vent_normal.x * 0.264,
        vent_rows[row],
        vent_normal.z * 0.264
      );
      vent_dummy.quaternion.setFromUnitVectors(
        vent_forward,
        vent_normal
      );
      vent_dummy.scale.set(1, 1, 1);
      vent_dummy.updateMatrix();
      vent_holes.setMatrixAt(vent_index, vent_dummy.matrix);
      vent_index++;
    }
  }
  vent_holes.instanceMatrix.needsUpdate = true;
  chimney_group.add(vent_holes);

  const chimney_cap_profile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.27, 0.00),
    new THREE.Vector2(0.315, 0.018),
    new THREE.Vector2(0.285, 0.040),
    new THREE.Vector2(0.18, 0.070),
    new THREE.Vector2(0.00, 0.085)
  ];
  const chimney_capGeom = new THREE.LatheGeometry(
    chimney_cap_profile,
    40
  );
  const chimney_cap = new THREE.Mesh(
    chimney_capGeom,
    bronzeMat
  );
  chimney_cap.name = "chimney_cap";
  chimney_cap.position.y = 2.22;
  chimney_group.add(chimney_cap);

  const chimney_cap_knobGeom = new THREE.SphereGeometry(
    0.055,
    20,
    10
  );
  const chimney_cap_knob = new THREE.Mesh(
    chimney_cap_knobGeom,
    blackMetalMat
  );
  chimney_cap_knob.name = "chimney_cap_knob";
  chimney_cap_knob.position.y = 2.325;
  chimney_cap_knob.scale.set(1, 0.35, 1);
  chimney_group.add(chimney_cap_knob);

  const carrying_handle_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.29, 1.88, -0.13),
      new THREE.Vector3(-0.43, 2.02, -0.15),
      new THREE.Vector3(-0.47, 2.29, -0.16),
      new THREE.Vector3(-0.39, 2.54, -0.16),
      new THREE.Vector3(-0.20, 2.72, -0.16),
      new THREE.Vector3(0.00, 2.78, -0.16),
      new THREE.Vector3(0.20, 2.72, -0.16),
      new THREE.Vector3(0.39, 2.54, -0.16),
      new THREE.Vector3(0.47, 2.29, -0.16),
      new THREE.Vector3(0.43, 2.02, -0.15),
      new THREE.Vector3(0.29, 1.88, -0.13)
    ],
    false,
    "centripetal"
  );
  const carrying_handleGeom = new THREE.TubeGeometry(
    carrying_handle_curve,
    72,
    0.018,
    10,
    false
  );
  const carrying_handle = new THREE.Mesh(
    carrying_handleGeom,
    blackMetalMat
  );
  carrying_handle.name = "carrying_handle";
  handle_group.add(carrying_handle);

  const handle_pivotsGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.065,
    16
  );
  const handle_pivots = new THREE.InstancedMesh(
    handle_pivotsGeom,
    blackMetalMat,
    2
  );
  handle_pivots.name = "handle_pivots";
  const handle_pivot_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    handle_pivot_dummy.position.set(
      side * 0.305,
      1.89,
      -0.125
    );
    handle_pivot_dummy.rotation.set(
      0,
      0,
      Math.PI / 2
    );
    handle_pivot_dummy.scale.set(1, 1, 1);
    handle_pivot_dummy.updateMatrix();
    handle_pivots.setMatrixAt(i, handle_pivot_dummy.matrix);
  }
  handle_pivots.instanceMatrix.needsUpdate = true;
  handle_group.add(handle_pivots);

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