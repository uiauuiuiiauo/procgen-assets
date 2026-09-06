export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "celestial_map";

  const panel_group = new THREE.Group();
  panel_group.name = "panel_group";
  root.add(panel_group);

  const panelW = 1.20;
  const panelD = 1.20;
  const panelThickness = 0.018;
  const surfaceLift = 0.020;
  const lineY = surfaceLift + 0.005;
  const fineY = surfaceLift + 0.004;
  const decalY = surfaceLift + 0.006;

  const celestial_panelMat = new THREE.MeshStandardMaterial({
    color: 0x07548b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x087fc2,
    metalness: 0.0,
    roughness: 0.7,
  });
  const chart_lineMat = new THREE.MeshStandardMaterial({
    color: 0xd9f6ff,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const chart_lineDimMat = new THREE.MeshStandardMaterial({
    color: 0x8bd8ef,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const constellation_lineMat = new THREE.MeshStandardMaterial({
    color: 0xf0fdff,
    metalness: 0.0,
    roughness: 0.7,
  });
  const constellation_nodeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const bright_starMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xdff8ff,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide,
  });
  const nebula_darkMat = new THREE.MeshStandardMaterial({
    color: 0x062d68,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const nebula_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x27b9e8,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const nebula_indigoMat = new THREE.MeshStandardMaterial({
    color: 0x17458e,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const nebula_speckleMat = new THREE.MeshStandardMaterial({
    color: 0x62c9ed,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.48,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const celestial_panelShape = new THREE.Shape();
  const cornerRadius = 0.032;
  const halfW = panelW * 0.5;
  const halfD = panelD * 0.5;
  celestial_panelShape.moveTo(-halfW + cornerRadius, -halfD);
  celestial_panelShape.lineTo(halfW - cornerRadius, -halfD);
  celestial_panelShape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + cornerRadius);
  celestial_panelShape.lineTo(halfW, halfD - cornerRadius);
  celestial_panelShape.quadraticCurveTo(halfW, halfD, halfW - cornerRadius, halfD);
  celestial_panelShape.lineTo(-halfW + cornerRadius, halfD);
  celestial_panelShape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - cornerRadius);
  celestial_panelShape.lineTo(-halfW, -halfD + cornerRadius);
  celestial_panelShape.quadraticCurveTo(-halfW, -halfD, -halfW + cornerRadius, -halfD);
  celestial_panelShape.closePath();

  const celestial_panelGeom = new THREE.ExtrudeGeometry(celestial_panelShape, {
    depth: panelThickness,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  const celestial_panel = new THREE.Mesh(celestial_panelGeom, celestial_panelMat);
  celestial_panel.name = "celestial_panel";
  celestial_panel.rotation.x = -Math.PI / 2;
  panel_group.add(celestial_panel);

  const top_surfaceGeom = new THREE.ShapeGeometry(celestial_panelShape, 24);
  const top_surface = new THREE.Mesh(top_surfaceGeom, top_surfaceMat);
  top_surface.name = "top_surface";
  top_surface.rotation.x = -Math.PI / 2;
  top_surface.position.y = surfaceLift;
  panel_group.add(top_surface);

  const celestial_decoration = new THREE.Group();
  celestial_decoration.name = "celestial_decoration";
  panel_group.add(celestial_decoration);

  const nebula_patchGeom = new THREE.CircleGeometry(1, 28);
  const patchAxis = new THREE.Vector3(0, 1, 0);

  function createPatchField(name, data, material) {
    const field = new THREE.InstancedMesh(nebula_patchGeom, material, data.length);
    field.name = name;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < data.length; i++) {
      const patch = data[i];
      dummy.position.set(patch[0], surfaceLift + 0.0015 + i * 0.000002, patch[1]);
      dummy.quaternion.setFromAxisAngle(patchAxis, patch[4]);
      dummy.scale.set(patch[2], patch[3], 1);
      dummy.updateMatrix();
      field.setMatrixAt(i, dummy.matrix);
    }
    field.instanceMatrix.needsUpdate = true;
    field.renderOrder = 2;
    return field;
  }

  const darkNebulaData = [
    [-0.39, -0.31, 0.18, 0.075, -0.35],
    [-0.27, -0.20, 0.15, 0.060, 0.42],
    [-0.10, -0.36, 0.19, 0.055, -0.18],
    [0.10, -0.29, 0.16, 0.070, 0.55],
    [0.34, -0.18, 0.18, 0.060, -0.42],
    [0.40, 0.08, 0.13, 0.080, 0.18],
    [0.23, 0.27, 0.20, 0.075, -0.28],
    [0.02, 0.39, 0.17, 0.060, 0.36],
    [-0.25, 0.34, 0.18, 0.070, -0.55],
    [-0.43, 0.12, 0.14, 0.090, 0.20],
    [-0.06, 0.08, 0.13, 0.050, -0.12],
    [0.20, 0.02, 0.11, 0.045, 0.62],
  ];
  const cyanNebulaData = [
    [-0.48, -0.18, 0.10, 0.025, 0.35],
    [-0.31, -0.37, 0.12, 0.030, -0.42],
    [-0.18, -0.12, 0.10, 0.025, 0.70],
    [0.04, -0.42, 0.11, 0.026, -0.20],
    [0.22, -0.20, 0.13, 0.030, 0.44],
    [0.45, -0.02, 0.10, 0.026, -0.55],
    [0.30, 0.19, 0.12, 0.028, 0.20],
    [0.07, 0.32, 0.13, 0.026, -0.36],
    [-0.18, 0.43, 0.11, 0.028, 0.48],
    [-0.40, 0.27, 0.12, 0.025, -0.18],
    [-0.05, 0.19, 0.09, 0.022, 0.82],
    [0.17, 0.05, 0.08, 0.020, -0.62],
  ];
  const indigoNebulaData = [
    [-0.34, -0.05, 0.16, 0.050, -0.62],
    [-0.18, -0.31, 0.13, 0.045, 0.25],
    [0.08, -0.17, 0.18, 0.050, -0.30],
    [0.36, -0.33, 0.12, 0.045, 0.48],
    [0.39, 0.17, 0.15, 0.050, -0.18],
    [0.13, 0.39, 0.16, 0.045, 0.52],
    [-0.18, 0.29, 0.15, 0.045, -0.40],
    [-0.43, 0.38, 0.11, 0.040, 0.20],
  ];

  const nebula_dark_patches = createPatchField(
    "nebula_dark_patches",
    darkNebulaData,
    nebula_darkMat
  );
  const nebula_cyan_patches = createPatchField(
    "nebula_cyan_patches",
    cyanNebulaData,
    nebula_cyanMat
  );
  const nebula_indigo_patches = createPatchField(
    "nebula_indigo_patches",
    indigoNebulaData,
    nebula_indigoMat
  );
  celestial_decoration.add(
    nebula_dark_patches,
    nebula_cyan_patches,
    nebula_indigo_patches
  );

  const nebula_speckleGeom = new THREE.CircleGeometry(1, 8);
  const nebula_speckles = new THREE.InstancedMesh(
    nebula_speckleGeom,
    nebula_speckleMat,
    90
  );
  nebula_speckles.name = "nebula_speckles";
  const speckleDummy = new THREE.Object3D();
  for (let i = 0; i < 90; i++) {
    const u = ((i * 37 + 11) % 101) / 100;
    const v = ((i * 53 + 7) % 103) / 102;
    const size = 0.0018 + (i % 5) * 0.00075;
    speckleDummy.position.set(
      (u - 0.5) * 1.10,
      surfaceLift + 0.0022,
      (v - 0.5) * 1.10
    );
    speckleDummy.quaternion.setFromAxisAngle(patchAxis, i * 0.41);
    speckleDummy.scale.set(size * (1 + (i % 3) * 0.35), size, 1);
    speckleDummy.updateMatrix();
    nebula_speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  nebula_speckles.instanceMatrix.needsUpdate = true;
  nebula_speckles.renderOrder = 2;
  celestial_decoration.add(nebula_speckles);

  const outer_border_longGeom = new THREE.BoxGeometry(1.13, 0.003, 0.006);
  const outer_border_shortGeom = new THREE.BoxGeometry(0.006, 0.003, 1.13);

  const outer_border_front = new THREE.Mesh(outer_border_longGeom, chart_lineMat);
  outer_border_front.name = "outer_border_front";
  outer_border_front.position.set(0, lineY, 0.565);

  const outer_border_back = new THREE.Mesh(outer_border_longGeom, chart_lineMat);
  outer_border_back.name = "outer_border_back";
  outer_border_back.position.set(0, lineY, -0.565);

  const outer_border_left = new THREE.Mesh(outer_border_shortGeom, chart_lineMat);
  outer_border_left.name = "outer_border_left";
  outer_border_left.position.set(-0.565, lineY, 0);

  const outer_border_right = new THREE.Mesh(outer_border_shortGeom, chart_lineMat);
  outer_border_right.name = "outer_border_right";
  outer_border_right.position.set(0.565, lineY, 0);

  celestial_decoration.add(
    outer_border_front,
    outer_border_back,
    outer_border_left,
    outer_border_right
  );

  const inner_border_longGeom = new THREE.BoxGeometry(1.08, 0.002, 0.003);
  const inner_border_shortGeom = new THREE.BoxGeometry(0.003, 0.002, 1.08);

  const inner_border_front = new THREE.Mesh(inner_border_longGeom, chart_lineDimMat);
  inner_border_front.name = "inner_border_front";
  inner_border_front.position.set(0, lineY, 0.535);

  const inner_border_back = new THREE.Mesh(inner_border_longGeom, chart_lineDimMat);
  inner_border_back.name = "inner_border_back";
  inner_border_back.position.set(0, lineY, -0.535);

  const inner_border_left = new THREE.Mesh(inner_border_shortGeom, chart_lineDimMat);
  inner_border_left.name = "inner_border_left";
  inner_border_left.position.set(-0.535, lineY, 0);

  const inner_border_right = new THREE.Mesh(inner_border_shortGeom, chart_lineDimMat);
  inner_border_right.name = "inner_border_right";
  inner_border_right.position.set(0.535, lineY, 0);

  celestial_decoration.add(
    inner_border_front,
    inner_border_back,
    inner_border_left,
    inner_border_right
  );

  const axis_lineGeom = new THREE.BoxGeometry(1.07, 0.0025, 0.004);

  const north_south_axis = new THREE.Mesh(axis_lineGeom, chart_lineMat);
  north_south_axis.name = "north_south_axis";
  north_south_axis.position.set(0, lineY + 0.001, 0);

  const east_west_axis = new THREE.Mesh(axis_lineGeom, chart_lineMat);
  east_west_axis.name = "east_west_axis";
  east_west_axis.rotation.y = Math.PI / 2;
  east_west_axis.position.set(0, lineY + 0.001, 0);

  celestial_decoration.add(north_south_axis, east_west_axis);

  function addChartCurve(name, radius, startAngle, endAngle, material) {
    const geometry = new THREE.TorusGeometry(radius, 0.0022, 5, 96, endAngle - startAngle);
    const curve = new THREE.Mesh(geometry, material);
    curve.name = name;
    curve.rotation.x = Math.PI / 2;
    curve.rotation.z = startAngle;
    curve.position.y = fineY;
    celestial_decoration.add(curve);
    return curve;
  }

  const inner_chart_circle = addChartCurve(
    "inner_chart_circle",
    0.18,
    0,
    Math.PI * 2,
    chart_lineDimMat
  );
  const middle_chart_circle = addChartCurve(
    "middle_chart_circle",
    0.30,
    -Math.PI * 0.12,
    Math.PI * 1.34,
    chart_lineDimMat
  );
  const outer_chart_circle = addChartCurve(
    "outer_chart_circle",
    0.43,
    Math.PI * 0.22,
    Math.PI * 1.55,
    chart_lineMat
  );
  const rising_chart_arc = addChartCurve(
    "rising_chart_arc",
    0.36,
    -Math.PI * 0.48,
    Math.PI * 0.72,
    chart_lineDimMat
  );
  const falling_chart_arc = addChartCurve(
    "falling_chart_arc",
    0.38,
    Math.PI * 0.48,
    Math.PI * 1.62,
    chart_lineDimMat
  );

  const chart_spokeGeom = new THREE.BoxGeometry(0.0026, 0.002, 0.42);
  const chart_spokes = new THREE.InstancedMesh(chart_spokeGeom, chart_lineDimMat, 12);
  chart_spokes.name = "chart_spokes";
  const spokeDummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    spokeDummy.position.set(Math.sin(angle) * 0.21, fineY, Math.cos(angle) * 0.21);
    spokeDummy.rotation.set(0, angle, 0);
    spokeDummy.scale.set(1, 1, 1);
    spokeDummy.updateMatrix();
    chart_spokes.setMatrixAt(i, spokeDummy.matrix);
  }
  chart_spokes.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(chart_spokes);

  const constellation_segmentGeom = new THREE.CylinderGeometry(0.0024, 0.0024, 1, 6);
  const segmentUp = new THREE.Vector3(0, 1, 0);

  function createSegmentInstances(name, segments, material) {
    const mesh = new THREE.InstancedMesh(
      constellation_segmentGeom,
      material,
      segments.length
    );
    mesh.name = name;
    const dummy = new THREE.Object3D();
    const start = new THREE.Vector3();
    const end = new THREE.Vector3();
    const direction = new THREE.Vector3();
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      start.set(segment[0], fineY + 0.001, segment[1]);
      end.set(segment[2], fineY + 0.001, segment[3]);
      direction.subVectors(end, start);
      const length = direction.length();
      dummy.position.copy(start).add(end).multiplyScalar(0.5);
      dummy.quaternion.setFromUnitVectors(segmentUp, direction.normalize());
      dummy.scale.set(1, length, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const radialSegments = [];
  for (let i = 0; i < 18; i++) {
    const angle = i / 18 * Math.PI * 2 + (i % 3) * 0.035;
    const innerRadius = 0.018 + (i % 4) * 0.008;
    const outerRadius = 0.17 + (i % 5) * 0.045;
    radialSegments.push([
      Math.cos(angle) * innerRadius,
      Math.sin(angle) * innerRadius,
      Math.cos(angle) * outerRadius,
      Math.sin(angle) * outerRadius,
    ]);
  }
  radialSegments.push(
    [-0.02, -0.01, -0.50, -0.31],
    [-0.02, -0.01, -0.47, 0.29],
    [0.02, -0.02, 0.49, -0.32],
    [0.02, -0.02, 0.48, 0.31],
    [-0.01, 0.02, -0.29, 0.49],
    [0.01, 0.02, 0.29, 0.49],
    [-0.03, -0.02, -0.35, -0.48],
    [0.03, -0.02, 0.36, -0.48]
  );
  const radial_constellation_lines = createSegmentInstances(
    "radial_constellation_lines",
    radialSegments,
    chart_lineMat
  );
  celestial_decoration.add(radial_constellation_lines);

  const constellationPaths = [
    [[-0.48, 0.22], [-0.38, 0.16], [-0.29, 0.20], [-0.20, 0.10], [-0.10, 0.13], [-0.02, 0.03]],
    [[0.03, 0.02], [0.14, 0.10], [0.24, 0.04], [0.34, 0.12], [0.46, 0.06]],
    [[-0.02, -0.03], [-0.13, -0.13], [-0.18, -0.25], [-0.29, -0.34], [-0.39, -0.40]],
    [[0.02, -0.03], [0.14, -0.15], [0.25, -0.20], [0.34, -0.31], [0.47, -0.27]],
    [[-0.02, 0.01], [-0.08, 0.15], [-0.12, 0.28], [-0.20, 0.40], [-0.28, 0.48]],
    [[0.02, 0.01], [0.10, 0.17], [0.18, 0.28], [0.24, 0.42], [0.35, 0.48]],
    [[-0.49, -0.10], [-0.39, -0.16], [-0.34, -0.28], [-0.24, -0.34]],
    [[0.30, 0.30], [0.39, 0.25], [0.48, 0.31]],
    [[-0.42, 0.39], [-0.34, 0.34], [-0.27, 0.42]],
    [[0.34, -0.43], [0.41, -0.36], [0.49, -0.40]],
  ];
  const constellationSegments = [];
  const constellationNodes = [];
  for (let p = 0; p < constellationPaths.length; p++) {
    const path = constellationPaths[p];
    for (let i = 0; i < path.length - 1; i++) {
      constellationSegments.push([
        path[i][0], path[i][1],
        path[i + 1][0], path[i + 1][1],
      ]);
    }
    for (let i = 0; i < path.length; i++) {
      constellationNodes.push([path[i][0], path[i][1], 0.72 + ((p + i) % 4) * 0.18]);
    }
  }

  const constellation_lines = createSegmentInstances(
    "constellation_lines",
    constellationSegments,
    constellation_lineMat
  );
  celestial_decoration.add(constellation_lines);

  const constellation_nodeGeom = new THREE.CircleGeometry(0.006, 12);
  const constellation_nodes = new THREE.InstancedMesh(
    constellation_nodeGeom,
    constellation_nodeMat,
    constellationNodes.length
  );
  constellation_nodes.name = "constellation_nodes";
  const nodeDummy = new THREE.Object3D();
  for (let i = 0; i < constellationNodes.length; i++) {
    const node = constellationNodes[i];
    nodeDummy.position.set(node[0], decalY, node[1]);
    nodeDummy.quaternion.setFromAxisAngle(patchAxis, -Math.PI / 2);
    nodeDummy.scale.set(node[2], node[2], 1);
    nodeDummy.updateMatrix();
    constellation_nodes.setMatrixAt(i, nodeDummy.matrix);
  }
  constellation_nodes.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(constellation_nodes);

  const starShape = new THREE.Shape();
  for (let i = 0; i < 16; i++) {
    const angle = Math.PI / 2 + i / 16 * Math.PI * 2;
    const radius = i % 2 === 0 ? 1 : 0.18;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) starShape.moveTo(x, y);
    else starShape.lineTo(x, y);
  }
  starShape.closePath();

  const bright_starsGeom = new THREE.ShapeGeometry(starShape);
  const brightStarData = [
    [-0.47, 0.22, 0.038, 0.10],
    [-0.30, 0.39, 0.022, 0.32],
    [-0.18, 0.24, 0.016, 0.12],
    [-0.09, 0.40, 0.014, 0.48],
    [0.11, 0.34, 0.040, 0.20],
    [0.31, 0.27, 0.022, 0.42],
    [0.47, 0.14, 0.034, 0.10],
    [0.40, -0.05, 0.017, 0.36],
    [0.48, -0.22, 0.029, 0.18],
    [0.30, -0.38, 0.025, 0.46],
    [0.08, -0.45, 0.017, 0.12],
    [-0.09, -0.34, 0.034, 0.30],
    [-0.29, -0.28, 0.017, 0.05],
    [-0.43, -0.17, 0.026, 0.40],
    [-0.36, 0.03, 0.014, 0.22],
    [0.18, 0.08, 0.015, 0.12],
    [0.25, -0.18, 0.020, 0.38],
    [-0.20, -0.08, 0.014, 0.18],
    [0.02, 0.20, 0.013, 0.28],
    [0.03, -0.22, 0.014, 0.08],
  ];

  const bright_stars = new THREE.InstancedMesh(
    bright_starsGeom,
    bright_starMat,
    brightStarData.length
  );
  bright_stars.name = "bright_stars";
  const starDummy = new THREE.Object3D();
  for (let i = 0; i < brightStarData.length; i++) {
    const star = brightStarData[i];
    starDummy.position.set(star[0], decalY + 0.001, star[1]);
    starDummy.quaternion.setFromAxisAngle(patchAxis, -Math.PI / 2 + star[3]);
    starDummy.scale.set(star[2], star[2], 1);
    starDummy.updateMatrix();
    bright_stars.setMatrixAt(i, starDummy.matrix);
  }
  bright_stars.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(bright_stars);

  const small_starGeom = new THREE.CircleGeometry(1, 10);
  const small_stars = new THREE.InstancedMesh(small_starGeom, bright_starMat, 58);
  small_stars.name = "small_stars";
  const smallStarDummy = new THREE.Object3D();
  for (let i = 0; i < 58; i++) {
    const u = ((i * 37 + 11) % 101) / 100;
    const v = ((i * 53 + 7) % 103) / 102;
    const size = 0.0032 + (i % 5) * 0.00115;
    smallStarDummy.position.set(
      (u - 0.5) * 1.07,
      decalY + 0.0015,
      (v - 0.5) * 1.07
    );
    smallStarDummy.quaternion.setFromAxisAngle(patchAxis, -Math.PI / 2);
    smallStarDummy.scale.set(size, size, 1);
    smallStarDummy.updateMatrix();
    small_stars.setMatrixAt(i, smallStarDummy.matrix);
  }
  small_stars.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(small_stars);

  const central_starburstGeom = new THREE.BoxGeometry(0.003, 0.0025, 0.105);
  const central_starburst = new THREE.InstancedMesh(
    central_starburstGeom,
    bright_starMat,
    16
  );
  central_starburst.name = "central_starburst";
  const burstDummy = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const lengthScale = i % 4 === 0 ? 1.0 : (i % 2 === 0 ? 0.68 : 0.42);
    burstDummy.position.set(
      Math.sin(angle) * 0.0525,
      decalY + 0.002,
      Math.cos(angle) * 0.0525
    );
    burstDummy.rotation.set(0, angle, 0);
    burstDummy.scale.set(1, 1, lengthScale);
    burstDummy.updateMatrix();
    central_starburst.setMatrixAt(i, burstDummy.matrix);
  }
  central_starburst.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(central_starburst);

  const central_starGeom = new THREE.ShapeGeometry(starShape);
  const central_star = new THREE.Mesh(central_starGeom, bright_starMat);
  central_star.name = "central_star";
  central_star.rotation.x = -Math.PI / 2;
  central_star.position.set(0, decalY + 0.003, 0);
  central_star.scale.set(0.032, 0.032, 1);
  celestial_decoration.add(central_star);

  const label_markGeom = new THREE.BoxGeometry(0.016, 0.002, 0.003);
  const labelData = [
    [-0.47, -0.44, 0.15, 0.80], [-0.43, -0.44, 0.15, 0.55],
    [-0.39, -0.44, 0.15, 0.90], [-0.34, -0.44, 0.15, 0.65],
    [0.34, -0.45, -0.12, 0.85], [0.39, -0.45, -0.12, 0.55],
    [0.44, -0.45, -0.12, 0.90], [0.48, -0.45, -0.12, 0.60],
    [-0.49, 0.34, 1.02, 0.75], [-0.49, 0.39, 1.02, 0.50],
    [-0.49, 0.44, 1.02, 0.88], [0.45, 0.39, -0.82, 0.75],
    [0.45, 0.44, -0.82, 0.52], [0.45, 0.48, -0.82, 0.86],
    [-0.22, 0.49, 0.08, 0.70], [-0.17, 0.49, 0.08, 0.48],
    [-0.13, 0.49, 0.08, 0.82], [0.14, 0.49, -0.08, 0.72],
    [0.19, 0.49, -0.08, 0.50], [0.24, 0.49, -0.08, 0.84],
  ];
  const label_marks = new THREE.InstancedMesh(
    label_markGeom,
    chart_lineMat,
    labelData.length
  );
  label_marks.name = "label_marks";
  const labelDummy = new THREE.Object3D();
  for (let i = 0; i < labelData.length; i++) {
    const mark = labelData[i];
    labelDummy.position.set(mark[0], lineY + 0.003, mark[1]);
    labelDummy.rotation.set(0, mark[2], 0);
    labelDummy.scale.set(mark[3], 1, 1);
    labelDummy.updateMatrix();
    label_marks.setMatrixAt(i, labelDummy.matrix);
  }
  label_marks.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(label_marks);

  const zodiac_crescentsGeom = new THREE.TorusGeometry(
    0.013,
    0.002,
    5,
    18,
    Math.PI * 1.45
  );
  const zodiac_crescents = new THREE.InstancedMesh(
    zodiac_crescentsGeom,
    chart_lineMat,
    8
  );
  zodiac_crescents.name = "zodiac_crescents";
  const crescentPositions = [
    [-0.46, -0.26], [-0.36, -0.42], [-0.20, -0.47], [0.19, -0.47],
    [0.39, -0.38], [0.47, -0.12], [0.42, 0.34], [-0.38, 0.36],
  ];
  const crescentDummy = new THREE.Object3D();
  for (let i = 0; i < crescentPositions.length; i++) {
    crescentDummy.position.set(
      crescentPositions[i][0],
      lineY + 0.003,
      crescentPositions[i][1]
    );
    crescentDummy.rotation.set(Math.PI / 2, 0, i * 0.73);
    crescentDummy.scale.set(1, 1, 1);
    crescentDummy.updateMatrix();
    zodiac_crescents.setMatrixAt(i, crescentDummy.matrix);
  }
  zodiac_crescents.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(zodiac_crescents);

  const planet_ringGeom = new THREE.TorusGeometry(0.012, 0.0018, 5, 24);
  const planet_coreGeom = new THREE.CircleGeometry(0.004, 12);
  const planetData = [
    [-0.37, 0.28, 0.35],
    [0.38, 0.20, -0.45],
    [0.32, -0.28, 0.72],
    [-0.26, -0.39, -0.20],
  ];
  const planet_rings = new THREE.InstancedMesh(
    planet_ringGeom,
    chart_lineMat,
    planetData.length
  );
  planet_rings.name = "planet_rings";
  const planet_cores = new THREE.InstancedMesh(
    planet_coreGeom,
    bright_starMat,
    planetData.length
  );
  planet_cores.name = "planet_cores";
  const planetDummy = new THREE.Object3D();
  const coreDummy = new THREE.Object3D();
  for (let i = 0; i < planetData.length; i++) {
    const planet = planetData[i];
    planetDummy.position.set(planet[0], lineY + 0.003, planet[1]);
    planetDummy.rotation.set(Math.PI / 2, 0, planet[2]);
    planetDummy.scale.set(1, 0.55, 1);
    planetDummy.updateMatrix();
    planet_rings.setMatrixAt(i, planetDummy.matrix);

    coreDummy.position.set(planet[0], decalY + 0.002, planet[1]);
    coreDummy.rotation.set(-Math.PI / 2, 0, 0);
    coreDummy.scale.set(1, 1, 1);
    coreDummy.updateMatrix();
    planet_cores.setMatrixAt(i, coreDummy.matrix);
  }
  planet_rings.instanceMatrix.needsUpdate = true;
  planet_cores.instanceMatrix.needsUpdate = true;
  celestial_decoration.add(planet_rings, planet_cores);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}