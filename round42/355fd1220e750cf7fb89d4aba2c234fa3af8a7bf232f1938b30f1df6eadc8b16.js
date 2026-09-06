export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_umbrellas";

  const black_glossMat = new THREE.MeshStandardMaterial({
    color: 0x08090b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x555b61,
    metalness: 0.0,
    roughness: 0.3,
  });
  const collarMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const left_canopyMat = new THREE.MeshStandardMaterial({
    color: 0x155487,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const center_canopyMat = new THREE.MeshStandardMaterial({
    color: 0x2f83b7,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const right_canopyMat = new THREE.MeshStandardMaterial({
    color: 0x123f78,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const handle_sleeveMat = new THREE.MeshStandardMaterial({
    color: 0x174c55,
    metalness: 0.0,
    roughness: 0.95,
  });
  const redMat = new THREE.MeshStandardMaterial({
    color: 0xd83a2e,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const coralMat = new THREE.MeshStandardMaterial({
    color: 0xeb684d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf2bd27,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xe78baa,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf3eee2,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x4c9b42,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const dark_leafMat = new THREE.MeshStandardMaterial({
    color: 0x236b37,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x347a39,
    metalness: 0.0,
    roughness: 0.95,
  });
  const flower_centerMat = new THREE.MeshStandardMaterial({
    color: 0x5c3b21,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const petalGeom = new THREE.CircleGeometry(1, 18);
  const flower_centerGeom = new THREE.CircleGeometry(1, 18);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, -1);
  leafShape.bezierCurveTo(0.62, -0.45, 0.62, 0.48, 0, 1);
  leafShape.bezierCurveTo(-0.62, 0.48, -0.62, -0.45, 0, -1);
  const leafGeom = new THREE.ShapeGeometry(leafShape, 10);

  function createFlower(name, size, petal_material, center_material, petal_count) {
    const flower = new THREE.Group();
    flower.name = name;

    const petals = new THREE.InstancedMesh(
      petalGeom,
      petal_material,
      petal_count
    );
    petals.name = name + "_petals";
    const petal_dummy = new THREE.Object3D();

    for (let i = 0; i < petal_count; i++) {
      const angle = (i / petal_count) * Math.PI * 2;
      petal_dummy.position.set(
        Math.cos(angle) * size * 0.48,
        Math.sin(angle) * size * 0.48,
        0
      );
      petal_dummy.rotation.set(0, 0, angle - Math.PI / 2);
      petal_dummy.scale.set(size * 0.34, size * 0.62, 1);
      petal_dummy.updateMatrix();
      petals.setMatrixAt(i, petal_dummy.matrix);
    }
    petals.instanceMatrix.needsUpdate = true;
    flower.add(petals);

    const center = new THREE.Mesh(flower_centerGeom, center_material);
    center.name = name + "_center";
    center.position.z = 0.003;
    center.scale.setScalar(size * 0.22);
    flower.add(center);

    const pollen = new THREE.Mesh(
      flower_centerGeom,
      center_material === flower_centerMat ? yellowMat : center_material
    );
    pollen.name = name + "_pollen";
    pollen.position.z = 0.005;
    pollen.scale.setScalar(size * 0.085);
    flower.add(pollen);

    return flower;
  }

  function createLeaf(name, width, height, rotation, material) {
    const leaf = new THREE.Mesh(leafGeom, material);
    leaf.name = name;
    leaf.scale.set(width, height, 1);
    leaf.rotation.z = rotation;
    return leaf;
  }

  function createFlatStem(name, points, radius, material) {
    const stem_curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const stem_geom = new THREE.TubeGeometry(
      stem_curve,
      18,
      radius,
      6,
      false
    );
    const stem = new THREE.Mesh(stem_geom, material);
    stem.name = name;
    return stem;
  }

  function createPanelGeometry(bottom_width, top_width, height, bulge) {
    const shape = new THREE.Shape();
    shape.moveTo(-bottom_width / 2, 0);
    shape.lineTo(-top_width / 2, height * 0.91);
    shape.lineTo(-top_width * 0.34, height * 0.965);
    shape.lineTo(-top_width * 0.18, height * 0.925);
    shape.lineTo(0, height);
    shape.lineTo(top_width * 0.18, height * 0.93);
    shape.lineTo(top_width * 0.34, height * 0.97);
    shape.lineTo(top_width / 2, height * 0.91);
    shape.lineTo(bottom_width / 2, 0);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.018,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 1,
    });
    geometry.translate(0, 0, -0.009);

    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const t = Math.max(0, Math.min(1, y / height));
      const side = Math.max(
        0,
        1 - Math.abs(x) / Math.max(0.001, top_width / 2)
      );
      position.setZ(
        i,
        position.getZ(i) + bulge * Math.sin(t * Math.PI) * side
      );
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }

  function panelSurfaceZ(x, y, bottom_width, top_width, height, bulge) {
    const t = Math.max(0, Math.min(1, y / height));
    const side = Math.max(
      0,
      1 - Math.abs(x) / Math.max(0.001, top_width / 2)
    );
    return 0.014 + bulge * Math.sin(t * Math.PI) * side;
  }

  const top_handle_points = [
    new THREE.Vector3(0.03, 1.16, -0.11),
    new THREE.Vector3(0.03, 1.52, -0.11),
    new THREE.Vector3(0.11, 1.78, -0.11),
    new THREE.Vector3(0.31, 1.93, -0.11),
    new THREE.Vector3(0.53, 1.9, -0.11),
    new THREE.Vector3(0.68, 1.73, -0.11),
    new THREE.Vector3(0.71, 1.51, -0.11),
    new THREE.Vector3(0.65, 1.34, -0.11),
    new THREE.Vector3(0.55, 1.24, -0.11),
  ];
  const top_handle_curve = new THREE.CatmullRomCurve3(
    top_handle_points,
    false,
    "centripetal"
  );
  const top_handleGeom = new THREE.TubeGeometry(
    top_handle_curve,
    64,
    0.066,
    14,
    false
  );
  const top_handle = new THREE.Mesh(top_handleGeom, black_glossMat);
  top_handle.name = "top_handle";
  root.add(top_handle);

  const top_handle_tipGeom = new THREE.SphereGeometry(0.067, 18, 12);
  const top_handle_tip = new THREE.Mesh(top_handle_tipGeom, black_glossMat);
  top_handle_tip.name = "top_handle_tip";
  top_handle_tip.position.copy(top_handle_points[top_handle_points.length - 1]);
  root.add(top_handle_tip);

  const top_handle_highlight_points = [
    new THREE.Vector3(0.012, 1.22, -0.04),
    new THREE.Vector3(0.012, 1.51, -0.04),
    new THREE.Vector3(0.09, 1.75, -0.04),
    new THREE.Vector3(0.29, 1.88, -0.04),
    new THREE.Vector3(0.49, 1.86, -0.04),
    new THREE.Vector3(0.63, 1.7, -0.04),
    new THREE.Vector3(0.66, 1.51, -0.04),
  ];
  const top_handle_highlight_curve = new THREE.CatmullRomCurve3(
    top_handle_highlight_points,
    false,
    "centripetal"
  );
  const top_handle_highlightGeom = new THREE.TubeGeometry(
    top_handle_highlight_curve,
    44,
    0.008,
    6,
    false
  );
  const top_handle_highlight = new THREE.Mesh(
    top_handle_highlightGeom,
    black_highlightMat
  );
  top_handle_highlight.name = "top_handle_highlight";
  root.add(top_handle_highlight);

  const left_bottom_width = 0.72;
  const left_top_width = 0.4;
  const left_height = 1.0;
  const left_bulge = 0.025;
  const left_umbrella = new THREE.Group();
  left_umbrella.name = "left_umbrella";
  left_umbrella.position.set(-0.04, 0.25, -0.06);
  left_umbrella.rotation.z = 0.47;

  const left_canopyGeom = createPanelGeometry(
    left_bottom_width,
    left_top_width,
    left_height,
    left_bulge
  );
  const left_canopy = new THREE.Mesh(left_canopyGeom, left_canopyMat);
  left_canopy.name = "left_canopy";
  left_umbrella.add(left_canopy);

  const left_canopy_stem = createFlatStem(
    "left_canopy_stem",
    [
      new THREE.Vector3(
        -0.05,
        0.08,
        panelSurfaceZ(-0.05, 0.08, left_bottom_width, left_top_width, left_height, left_bulge)
      ),
      new THREE.Vector3(
        -0.1,
        0.39,
        panelSurfaceZ(-0.1, 0.39, left_bottom_width, left_top_width, left_height, left_bulge)
      ),
      new THREE.Vector3(
        -0.08,
        0.69,
        panelSurfaceZ(-0.08, 0.69, left_bottom_width, left_top_width, left_height, left_bulge)
      ),
    ],
    0.007,
    stemMat
  );
  left_umbrella.add(left_canopy_stem);

  const left_canopy_red_flower = createFlower(
    "left_canopy_red_flower",
    0.145,
    redMat,
    flower_centerMat,
    5
  );
  left_canopy_red_flower.position.set(
    -0.09,
    0.67,
    panelSurfaceZ(-0.09, 0.67, left_bottom_width, left_top_width, left_height, left_bulge) + 0.004
  );
  left_canopy_red_flower.rotation.z = -0.18;
  left_umbrella.add(left_canopy_red_flower);

  const left_canopy_yellow_flower = createFlower(
    "left_canopy_yellow_flower",
    0.105,
    yellowMat,
    flower_centerMat,
    5
  );
  left_canopy_yellow_flower.position.set(
    -0.19,
    0.47,
    panelSurfaceZ(-0.19, 0.47, left_bottom_width, left_top_width, left_height, left_bulge) + 0.004
  );
  left_canopy_yellow_flower.rotation.z = 0.25;
  left_umbrella.add(left_canopy_yellow_flower);

  const left_canopy_leaf = createLeaf(
    "left_canopy_leaf",
    0.055,
    0.13,
    -0.72,
    leafMat
  );
  left_canopy_leaf.position.set(
    0.01,
    0.53,
    panelSurfaceZ(0.01, 0.53, left_bottom_width, left_top_width, left_height, left_bulge) + 0.004
  );
  left_umbrella.add(left_canopy_leaf);

  const left_tipGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.09, 10);
  const left_tip = new THREE.Mesh(left_tipGeom, silverMat);
  left_tip.name = "left_tip";
  left_tip.position.set(0, left_height + 0.035, 0);
  left_umbrella.add(left_tip);
  root.add(left_umbrella);

  const right_bottom_width = 0.68;
  const right_top_width = 0.39;
  const right_height = 0.95;
  const right_bulge = 0.025;
  const right_umbrella = new THREE.Group();
  right_umbrella.name = "right_umbrella";
  right_umbrella.position.set(0.04, 0.25, -0.045);
  right_umbrella.rotation.z = -0.5;

  const right_canopyGeom = createPanelGeometry(
    right_bottom_width,
    right_top_width,
    right_height,
    right_bulge
  );
  const right_canopy = new THREE.Mesh(right_canopyGeom, right_canopyMat);
  right_canopy.name = "right_canopy";
  right_umbrella.add(right_canopy);

  const right_canopy_stem = createFlatStem(
    "right_canopy_stem",
    [
      new THREE.Vector3(
        0.03,
        0.08,
        panelSurfaceZ(0.03, 0.08, right_bottom_width, right_top_width, right_height, right_bulge)
      ),
      new THREE.Vector3(
        0.08,
        0.34,
        panelSurfaceZ(0.08, 0.34, right_bottom_width, right_top_width, right_height, right_bulge)
      ),
      new THREE.Vector3(
        0.11,
        0.64,
        panelSurfaceZ(0.11, 0.64, right_bottom_width, right_top_width, right_height, right_bulge)
      ),
    ],
    0.006,
    stemMat
  );
  right_umbrella.add(right_canopy_stem);

  const right_canopy_white_flower = createFlower(
    "right_canopy_white_flower",
    0.09,
    whiteMat,
    yellowMat,
    6
  );
  right_canopy_white_flower.position.set(
    0.1,
    0.65,
    panelSurfaceZ(0.1, 0.65, right_bottom_width, right_top_width, right_height, right_bulge) + 0.004
  );
  right_canopy_white_flower.rotation.z = -0.15;
  right_umbrella.add(right_canopy_white_flower);

  const right_canopy_red_flower = createFlower(
    "right_canopy_red_flower",
    0.125,
    redMat,
    flower_centerMat,
    5
  );
  right_canopy_red_flower.position.set(
    0.15,
    0.38,
    panelSurfaceZ(0.15, 0.38, right_bottom_width, right_top_width, right_height, right_bulge) + 0.004
  );
  right_canopy_red_flower.rotation.z = 0.3;
  right_umbrella.add(right_canopy_red_flower);

  const right_canopy_leaf = createLeaf(
    "right_canopy_leaf",
    0.05,
    0.13,
    0.65,
    dark_leafMat
  );
  right_canopy_leaf.position.set(
    0.02,
    0.52,
    panelSurfaceZ(0.02, 0.52, right_bottom_width, right_top_width, right_height, right_bulge) + 0.004
  );
  right_umbrella.add(right_canopy_leaf);

  const right_tipGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.09, 10);
  const right_tip = new THREE.Mesh(right_tipGeom, silverMat);
  right_tip.name = "right_tip";
  right_tip.position.set(0, right_height + 0.035, 0);
  right_umbrella.add(right_tip);
  root.add(right_umbrella);

  const center_bottom_width = 0.55;
  const center_top_width = 0.3;
  const center_height = 1.06;
  const center_bulge = 0.032;
  const center_umbrella = new THREE.Group();
  center_umbrella.name = "center_umbrella";
  center_umbrella.position.set(0, 0.25, 0.025);

  const center_canopyGeom = createPanelGeometry(
    center_bottom_width,
    center_top_width,
    center_height,
    center_bulge
  );
  const center_canopy = new THREE.Mesh(center_canopyGeom, center_canopyMat);
  center_canopy.name = "center_canopy";
  center_umbrella.add(center_canopy);

  const center_canopy_main_stem = createFlatStem(
    "center_canopy_main_stem",
    [
      new THREE.Vector3(
        -0.01,
        0.07,
        panelSurfaceZ(-0.01, 0.07, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
      new THREE.Vector3(
        -0.035,
        0.34,
        panelSurfaceZ(-0.035, 0.34, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
      new THREE.Vector3(
        -0.07,
        0.63,
        panelSurfaceZ(-0.07, 0.63, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
      new THREE.Vector3(
        -0.055,
        0.84,
        panelSurfaceZ(-0.055, 0.84, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
    ],
    0.008,
    stemMat
  );
  center_umbrella.add(center_canopy_main_stem);

  const center_canopy_branch_stem = createFlatStem(
    "center_canopy_branch_stem",
    [
      new THREE.Vector3(
        -0.02,
        0.3,
        panelSurfaceZ(-0.02, 0.3, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
      new THREE.Vector3(
        0.06,
        0.43,
        panelSurfaceZ(0.06, 0.43, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
      new THREE.Vector3(
        0.09,
        0.58,
        panelSurfaceZ(0.09, 0.58, center_bottom_width, center_top_width, center_height, center_bulge)
      ),
    ],
    0.006,
    stemMat
  );
  center_umbrella.add(center_canopy_branch_stem);

  const center_canopy_upper_flower = createFlower(
    "center_canopy_upper_flower",
    0.145,
    redMat,
    flower_centerMat,
    5
  );
  center_canopy_upper_flower.position.set(
    -0.06,
    0.79,
    panelSurfaceZ(-0.06, 0.79, center_bottom_width, center_top_width, center_height, center_bulge) + 0.005
  );
  center_canopy_upper_flower.rotation.z = -0.12;
  center_umbrella.add(center_canopy_upper_flower);

  const center_canopy_large_flower = createFlower(
    "center_canopy_large_flower",
    0.16,
    coralMat,
    flower_centerMat,
    5
  );
  center_canopy_large_flower.position.set(
    0.075,
    0.51,
    panelSurfaceZ(0.075, 0.51, center_bottom_width, center_top_width, center_height, center_bulge) + 0.005
  );
  center_canopy_large_flower.rotation.z = 0.2;
  center_umbrella.add(center_canopy_large_flower);

  const center_canopy_small_flower = createFlower(
    "center_canopy_small_flower",
    0.09,
    redMat,
    yellowMat,
    5
  );
  center_canopy_small_flower.position.set(
    -0.13,
    0.38,
    panelSurfaceZ(-0.13, 0.38, center_bottom_width, center_top_width, center_height, center_bulge) + 0.005
  );
  center_canopy_small_flower.rotation.z = -0.35;
  center_umbrella.add(center_canopy_small_flower);

  const center_canopy_left_leaf = createLeaf(
    "center_canopy_left_leaf",
    0.052,
    0.14,
    -0.72,
    leafMat
  );
  center_canopy_left_leaf.position.set(
    -0.14,
    0.68,
    panelSurfaceZ(-0.14, 0.68, center_bottom_width, center_top_width, center_height, center_bulge) + 0.005
  );
  center_umbrella.add(center_canopy_left_leaf);

  const center_canopy_right_leaf = createLeaf(
    "center_canopy_right_leaf",
    0.055,
    0.15,
    0.62,
    dark_leafMat
  );
  center_canopy_right_leaf.position.set(
    0.13,
    0.7,
    panelSurfaceZ(0.13, 0.7, center_bottom_width, center_top_width, center_height, center_bulge) + 0.005
  );
  center_umbrella.add(center_canopy_right_leaf);

  const center_canopy_lower_leaf = createLeaf(
    "center_canopy_lower_leaf",
    0.045,
    0.12,
    -0.45,
    leafMat
  );
  center_canopy_lower_leaf.position.set(
    -0.02,
    0.29,
    panelSurfaceZ(-0.02, 0.29, center_bottom_width, center_top_width, center_height, center_bulge) + 0.005
  );
  center_umbrella.add(center_canopy_lower_leaf);

  const center_tipGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.1, 10);
  const center_tip = new THREE.Mesh(center_tipGeom, silverMat);
  center_tip.name = "center_tip";
  center_tip.position.set(0, center_height + 0.04, 0);
  center_umbrella.add(center_tip);
  root.add(center_umbrella);

  const closure_ribbon_curve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.08, 0.34, 0.09),
      new THREE.Vector3(-0.13, 0.29, 0.1),
      new THREE.Vector3(-0.18, 0.22, 0.105),
      new THREE.Vector3(-0.2, 0.17, 0.105),
    ],
    false,
    "centripetal"
  );
  const closure_ribbonGeom = new THREE.TubeGeometry(
    closure_ribbon_curve,
    16,
    0.012,
    7,
    false
  );
  const closure_ribbon = new THREE.Mesh(closure_ribbonGeom, right_canopyMat);
  closure_ribbon.name = "closure_ribbon";
  root.add(closure_ribbon);

  const collarGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.18, 24);
  const collar = new THREE.Mesh(collarGeom, collarMat);
  collar.name = "collar";
  collar.position.y = 0.2;
  root.add(collar);

  const collar_ribGeom = new THREE.TorusGeometry(0.105, 0.007, 8, 24);
  const collar_ribs = new THREE.InstancedMesh(collar_ribGeom, collarMat, 4);
  collar_ribs.name = "collar_ribs";
  const collar_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    collar_dummy.position.set(0, 0.145 + i * 0.038, 0);
    collar_dummy.rotation.set(Math.PI / 2, 0, 0);
    collar_dummy.scale.set(1, 1, 1);
    collar_dummy.updateMatrix();
    collar_ribs.setMatrixAt(i, collar_dummy.matrix);
  }
  collar_ribs.instanceMatrix.needsUpdate = true;
  root.add(collar_ribs);

  const handle_sleeveGeom = new THREE.CylinderGeometry(
    0.085,
    0.09,
    1.72,
    28
  );
  const handle_sleeve = new THREE.Mesh(handle_sleeveGeom, handle_sleeveMat);
  handle_sleeve.name = "handle_sleeve";
  handle_sleeve.position.y = -0.69;
  root.add(handle_sleeve);

  const handle_floral_decoration = new THREE.Group();
  handle_floral_decoration.name = "handle_floral_decoration";
  root.add(handle_floral_decoration);

  function handleRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y + 1.55) / 1.72));
    return 0.09 + (0.085 - 0.09) * t;
  }

  function handleSurfacePoint(x, y, extra) {
    const radius = handleRadiusAt(y);
    const z = Math.sqrt(Math.max(0, radius * radius - x * x)) + extra;
    return new THREE.Vector3(x, y, z);
  }

  function createHandleStem(name, coordinates, radius) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(handleSurfacePoint(coordinate[0], coordinate[1], 0.006));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(curve, 20, radius, 6, false);
    const stem = new THREE.Mesh(geometry, stemMat);
    stem.name = name;
    return stem;
  }

  function placeOnHandle(object, x, y, extra) {
    const radius = handleRadiusAt(y);
    const z = Math.sqrt(Math.max(0, radius * radius - x * x)) + extra;
    const normal = new THREE.Vector3(x, 0, z).normalize();
    object.position.set(x, y, z);
    object.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }

  const handle_upper_stem = createHandleStem(
    "handle_upper_stem",
    [
      [-0.015, -0.34],
      [-0.025, -0.18],
      [-0.04, -0.02],
      [-0.025, 0.1],
    ],
    0.005
  );
  handle_floral_decoration.add(handle_upper_stem);

  const handle_yellow_stem = createHandleStem(
    "handle_yellow_stem",
    [
      [0.015, -0.72],
      [-0.01, -0.58],
      [-0.035, -0.43],
      [-0.05, -0.31],
    ],
    0.005
  );
  handle_floral_decoration.add(handle_yellow_stem);

  const handle_lower_stem = createHandleStem(
    "handle_lower_stem",
    [
      [0.025, -1.48],
      [0.005, -1.34],
      [-0.02, -1.18],
      [-0.005, -1.02],
    ],
    0.005
  );
  handle_floral_decoration.add(handle_lower_stem);

  const handle_side_stem = createHandleStem(
    "handle_side_stem",
    [
      [0.045, -1.42],
      [0.055, -1.25],
      [0.045, -1.08],
      [0.035, -0.92],
    ],
    0.004
  );
  handle_floral_decoration.add(handle_side_stem);

  const handle_upper_red_flower = createFlower(
    "handle_upper_red_flower",
    0.075,
    redMat,
    flower_centerMat,
    5
  );
  placeOnHandle(handle_upper_red_flower, -0.025, 0.015, 0.008);
  handle_upper_red_flower.rotateZ(-0.15);
  handle_floral_decoration.add(handle_upper_red_flower);

  const handle_yellow_flower = createFlower(
    "handle_yellow_flower",
    0.085,
    yellowMat,
    flower_centerMat,
    5
  );
  placeOnHandle(handle_yellow_flower, -0.035, -0.43, 0.008);
  handle_yellow_flower.rotateZ(0.12);
  handle_floral_decoration.add(handle_yellow_flower);

  const handle_lower_pink_flower = createFlower(
    "handle_lower_pink_flower",
    0.065,
    pinkMat,
    flower_centerMat,
    6
  );
  placeOnHandle(handle_lower_pink_flower, -0.005, -1.05, 0.008);
  handle_lower_pink_flower.rotateZ(-0.1);
  handle_floral_decoration.add(handle_lower_pink_flower);

  const handle_upper_leaf = createLeaf(
    "handle_upper_leaf",
    0.027,
    0.09,
    0.62,
    leafMat
  );
  placeOnHandle(handle_upper_leaf, 0.035, 0.09, 0.008);
  handle_floral_decoration.add(handle_upper_leaf);

  const handle_middle_leaf = createLeaf(
    "handle_middle_leaf",
    0.028,
    0.1,
    -0.58,
    dark_leafMat
  );
  placeOnHandle(handle_middle_leaf, 0.035, -0.28, 0.008);
  handle_floral_decoration.add(handle_middle_leaf);

  const handle_yellow_leaf = createLeaf(
    "handle_yellow_leaf",
    0.027,
    0.1,
    0.72,
    leafMat
  );
  placeOnHandle(handle_yellow_leaf, 0.025, -0.56, 0.008);
  handle_floral_decoration.add(handle_yellow_leaf);

  const handle_lower_leaf = createLeaf(
    "handle_lower_leaf",
    0.026,
    0.11,
    -0.5,
    leafMat
  );
  placeOnHandle(handle_lower_leaf, 0.035, -1.2, 0.008);
  handle_floral_decoration.add(handle_lower_leaf);

  const handle_side_leaf = createLeaf(
    "handle_side_leaf",
    0.025,
    0.095,
    0.58,
    dark_leafMat
  );
  placeOnHandle(handle_side_leaf, -0.04, -1.34, 0.008);
  handle_floral_decoration.add(handle_side_leaf);

  const bottom_capGeom = new THREE.CylinderGeometry(
    0.094,
    0.094,
    0.055,
    24
  );
  const bottom_cap = new THREE.Mesh(bottom_capGeom, collarMat);
  bottom_cap.name = "bottom_cap";
  bottom_cap.position.y = -1.56;
  root.add(bottom_cap);

  const bottom_cap_ringGeom = new THREE.TorusGeometry(
    0.094,
    0.007,
    8,
    24
  );
  const bottom_cap_ring = new THREE.Mesh(bottom_cap_ringGeom, silverMat);
  bottom_cap_ring.name = "bottom_cap_ring";
  bottom_cap_ring.rotation.x = Math.PI / 2;
  bottom_cap_ring.position.y = -1.535;
  root.add(bottom_cap_ring);

  const bottom_handle_points = [
    new THREE.Vector3(0, -1.55, 0),
    new THREE.Vector3(0, -1.78, 0),
    new THREE.Vector3(0.015, -1.98, 0),
    new THREE.Vector3(0.12, -2.09, 0),
    new THREE.Vector3(0.25, -2.1, 0),
    new THREE.Vector3(0.34, -2.02, 0),
    new THREE.Vector3(0.39, -1.91, 0),
  ];
  const bottom_handle_curve = new THREE.CatmullRomCurve3(
    bottom_handle_points,
    false,
    "centripetal"
  );
  const bottom_handleGeom = new THREE.TubeGeometry(
    bottom_handle_curve,
    52,
    0.065,
    14,
    false
  );
  const bottom_handle = new THREE.Mesh(bottom_handleGeom, black_glossMat);
  bottom_handle.name = "bottom_handle";
  root.add(bottom_handle);

  const bottom_handle_tipGeom = new THREE.SphereGeometry(0.066, 18, 12);
  const bottom_handle_tip = new THREE.Mesh(
    bottom_handle_tipGeom,
    black_glossMat
  );
  bottom_handle_tip.name = "bottom_handle_tip";
  bottom_handle_tip.position.copy(
    bottom_handle_points[bottom_handle_points.length - 1]
  );
  root.add(bottom_handle_tip);

  const bottom_handle_highlight_points = [
    new THREE.Vector3(-0.018, -1.61, 0.057),
    new THREE.Vector3(-0.018, -1.82, 0.057),
    new THREE.Vector3(0.01, -1.98, 0.057),
    new THREE.Vector3(0.12, -2.055, 0.057),
    new THREE.Vector3(0.24, -2.06, 0.057),
    new THREE.Vector3(0.32, -2.0, 0.057),
  ];
  const bottom_handle_highlight_curve = new THREE.CatmullRomCurve3(
    bottom_handle_highlight_points,
    false,
    "centripetal"
  );
  const bottom_handle_highlightGeom = new THREE.TubeGeometry(
    bottom_handle_highlight_curve,
    36,
    0.007,
    6,
    false
  );
  const bottom_handle_highlight = new THREE.Mesh(
    bottom_handle_highlightGeom,
    black_highlightMat
  );
  bottom_handle_highlight.name = "bottom_handle_highlight";
  root.add(bottom_handle_highlight);

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