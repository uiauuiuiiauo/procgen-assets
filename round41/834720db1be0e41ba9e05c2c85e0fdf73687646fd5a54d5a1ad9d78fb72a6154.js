export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "lemonade_glass";

  const vessel = new THREE.Group();
  vessel.name = "vessel";
  const contents = new THREE.Group();
  contents.name = "contents";
  const surface_details = new THREE.Group();
  surface_details.name = "surface_details";
  root.add(vessel, contents, surface_details);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glassEdgeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.25,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2dc72,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.9,
    ior: 1.33,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });

  const liquidSurfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe98b,
    metalness: 0.0,
    roughness: 0.02,
    transmission: 0.9,
    ior: 1.33,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const iceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf4f8ff,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.88,
    ior: 1.31,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const iceFillMat = new THREE.MeshStandardMaterial({
    color: 0xeaf1fa,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const iceEdgeMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
    wireframe: true,
    depthWrite: false
  });

  const lemonRindMat = new THREE.MeshStandardMaterial({
    color: 0xf4cf00,
    metalness: 0.0,
    roughness: 0.7
  });

  const lemonPulpMat = new THREE.MeshPhysicalMaterial({
    color: 0xffe89b,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.22,
    ior: 1.38,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });

  const lemonPithMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c5,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xfff7d2,
    metalness: 0.0,
    roughness: 0.25,
    transparent: true,
    opacity: 0.7,
    depthWrite: false
  });

  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glass_wallGeom = new THREE.CylinderGeometry(
    0.36,
    0.31,
    1.24,
    64,
    1,
    true
  );
  const glass_wall = new THREE.Mesh(glass_wallGeom, glassMat);
  glass_wall.name = "glass_wall";
  glass_wall.position.y = 0.66;
  glass_wall.renderOrder = 6;
  vessel.add(glass_wall);

  const glass_baseGeom = new THREE.CylinderGeometry(0.31, 0.31, 0.13, 64);
  const glass_base = new THREE.Mesh(glass_baseGeom, glassMat);
  glass_base.name = "glass_base";
  glass_base.position.y = 0.065;
  glass_base.renderOrder = 6;
  vessel.add(glass_base);

  const glass_rimGeom = new THREE.TorusGeometry(0.351, 0.009, 10, 64);
  const glass_rim = new THREE.Mesh(glass_rimGeom, glassEdgeMat);
  glass_rim.name = "glass_rim";
  glass_rim.rotation.x = Math.PI / 2;
  glass_rim.position.y = 1.28;
  glass_rim.renderOrder = 7;
  vessel.add(glass_rim);

  const glass_inner_rimGeom = new THREE.TorusGeometry(0.337, 0.0045, 8, 64);
  const glass_inner_rim = new THREE.Mesh(glass_inner_rimGeom, glassEdgeMat);
  glass_inner_rim.name = "glass_inner_rim";
  glass_inner_rim.rotation.x = Math.PI / 2;
  glass_inner_rim.position.y = 1.276;
  glass_inner_rim.renderOrder = 7;
  vessel.add(glass_inner_rim);

  const glass_bottom_ringGeom = new THREE.TorusGeometry(0.299, 0.008, 8, 64);
  const glass_bottom_ring = new THREE.Mesh(glass_bottom_ringGeom, glassEdgeMat);
  glass_bottom_ring.name = "glass_bottom_ring";
  glass_bottom_ring.rotation.x = Math.PI / 2;
  glass_bottom_ring.position.y = 0.025;
  glass_bottom_ring.renderOrder = 7;
  vessel.add(glass_bottom_ring);

  const glass_base_top_ringGeom = new THREE.TorusGeometry(0.301, 0.005, 8, 64);
  const glass_base_top_ring = new THREE.Mesh(
    glass_base_top_ringGeom,
    glassEdgeMat
  );
  glass_base_top_ring.name = "glass_base_top_ring";
  glass_base_top_ring.rotation.x = Math.PI / 2;
  glass_base_top_ring.position.y = 0.128;
  glass_base_top_ring.renderOrder = 7;
  vessel.add(glass_base_top_ring);

  const liquid_bodyGeom = new THREE.CylinderGeometry(
    0.337,
    0.296,
    1.02,
    64,
    1,
    false
  );
  const liquid_body = new THREE.Mesh(liquid_bodyGeom, liquidMat);
  liquid_body.name = "liquid_body";
  liquid_body.position.y = 0.64;
  liquid_body.renderOrder = 1;
  contents.add(liquid_body);

  const liquid_surfaceGeom = new THREE.CylinderGeometry(
    0.337,
    0.337,
    0.008,
    64
  );
  const liquid_surface = new THREE.Mesh(
    liquid_surfaceGeom,
    liquidSurfaceMat
  );
  liquid_surface.name = "liquid_surface";
  liquid_surface.position.y = 1.154;
  liquid_surface.renderOrder = 2;
  contents.add(liquid_surface);

  const liquid_meniscusGeom = new THREE.TorusGeometry(
    0.329,
    0.006,
    8,
    64
  );
  const liquid_meniscus = new THREE.Mesh(
    liquid_meniscusGeom,
    liquidSurfaceMat
  );
  liquid_meniscus.name = "liquid_meniscus";
  liquid_meniscus.rotation.x = Math.PI / 2;
  liquid_meniscus.position.y = 1.16;
  liquid_meniscus.renderOrder = 3;
  contents.add(liquid_meniscus);

  const iceShape = new THREE.Shape();
  const iceHalf = 0.095;
  const iceCorner = 0.025;
  iceShape.moveTo(-iceHalf + iceCorner, -iceHalf);
  iceShape.lineTo(iceHalf - iceCorner, -iceHalf);
  iceShape.quadraticCurveTo(
    iceHalf,
    -iceHalf,
    iceHalf,
    -iceHalf + iceCorner
  );
  iceShape.lineTo(iceHalf, iceHalf - iceCorner);
  iceShape.quadraticCurveTo(
    iceHalf,
    iceHalf,
    iceHalf - iceCorner,
    iceHalf
  );
  iceShape.lineTo(-iceHalf + iceCorner, iceHalf);
  iceShape.quadraticCurveTo(
    -iceHalf,
    iceHalf,
    -iceHalf,
    iceHalf - iceCorner
  );
  iceShape.lineTo(-iceHalf, -iceHalf + iceCorner);
  iceShape.quadraticCurveTo(
    -iceHalf,
    -iceHalf,
    -iceHalf + iceCorner,
    -iceHalf
  );

  const ice_cubesGeom = new THREE.ExtrudeGeometry(iceShape, {
    depth: 0.17,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 2
  });
  ice_cubesGeom.translate(0, 0, -0.085);

  const iceTransforms = [
    [-0.13, 1.17, 0.03, 0.20, 0.38, -0.18, 1.05, 0.82, 1.02],
    [0.11, 1.16, -0.08, -0.16, -0.34, 0.24, 0.94, 0.84, 1.08],
    [0.14, 1.12, 0.14, 0.28, 0.52, 0.10, 0.88, 0.78, 0.92],
    [-0.17, 1.08, -0.12, -0.22, 0.20, -0.30, 0.92, 0.86, 1.00],
    [0.01, 1.04, 0.18, 0.18, -0.42, 0.32, 0.86, 0.78, 0.94],
    [0.16, 0.94, 0.00, -0.18, 0.28, 0.40, 0.82, 0.88, 0.90],
    [-0.16, 0.90, 0.08, 0.30, -0.18, -0.24, 0.86, 0.80, 0.94],
    [0.02, 0.82, -0.12, -0.12, 0.46, 0.18, 0.84, 0.82, 0.90]
  ];

  const ice_cubes = new THREE.InstancedMesh(
    ice_cubesGeom,
    iceMat,
    iceTransforms.length
  );
  ice_cubes.name = "ice_cubes";
  ice_cubes.renderOrder = 4;

  const ice_cube_fills = new THREE.InstancedMesh(
    ice_cubesGeom,
    iceFillMat,
    iceTransforms.length
  );
  ice_cube_fills.name = "ice_cube_fills";
  ice_cube_fills.renderOrder = 3;

  const ice_cube_edges = new THREE.InstancedMesh(
    ice_cubesGeom,
    iceEdgeMat,
    iceTransforms.length
  );
  ice_cube_edges.name = "ice_cube_edges";
  ice_cube_edges.renderOrder = 5;

  const instanceDummy = new THREE.Object3D();
  for (let i = 0; i < iceTransforms.length; i++) {
    const transform = iceTransforms[i];
    instanceDummy.position.set(transform[0], transform[1], transform[2]);
    instanceDummy.rotation.set(transform[3], transform[4], transform[5]);
    instanceDummy.scale.set(transform[6], transform[7], transform[8]);
    instanceDummy.updateMatrix();
    ice_cubes.setMatrixAt(i, instanceDummy.matrix);

    instanceDummy.scale.set(transform[6] * 0.84, transform[7] * 0.84, transform[8] * 0.84);
    instanceDummy.updateMatrix();
    ice_cube_fills.setMatrixAt(i, instanceDummy.matrix);

    instanceDummy.scale.set(transform[6] * 1.015, transform[7] * 1.015, transform[8] * 1.015);
    instanceDummy.updateMatrix();
    ice_cube_edges.setMatrixAt(i, instanceDummy.matrix);
  }
  ice_cubes.instanceMatrix.needsUpdate = true;
  ice_cube_fills.instanceMatrix.needsUpdate = true;
  ice_cube_edges.instanceMatrix.needsUpdate = true;
  contents.add(ice_cube_fills, ice_cubes, ice_cube_edges);

  const lemonRindGeom = new THREE.CylinderGeometry(
    0.22,
    0.22,
    0.026,
    48
  );
  const lemonFaceGeom = new THREE.CircleGeometry(0.202, 48);
  const lemonPithRingGeom = new THREE.TorusGeometry(
    0.188,
    0.008,
    8,
    48
  );
  const lemonCenterGeom = new THREE.CircleGeometry(0.018, 20);

  const lemonSegmentShape = new THREE.Shape();
  lemonSegmentShape.moveTo(0.018, -0.004);
  lemonSegmentShape.lineTo(0.174, -0.012);
  lemonSegmentShape.quadraticCurveTo(0.195, 0, 0.174, 0.012);
  lemonSegmentShape.lineTo(0.018, 0.004);
  lemonSegmentShape.quadraticCurveTo(0.008, 0, 0.018, -0.004);
  const lemonSegmentGeom = new THREE.ShapeGeometry(lemonSegmentShape);

  function createLemonSlice(name) {
    const lemon_slice = new THREE.Group();
    lemon_slice.name = name;

    const lemon_rind = new THREE.Mesh(lemonRindGeom, lemonRindMat);
    lemon_rind.name = name + "_rind";
    lemon_rind.rotation.x = Math.PI / 2;
    lemon_slice.add(lemon_rind);

    const lemon_pulp = new THREE.Mesh(lemonFaceGeom, lemonPulpMat);
    lemon_pulp.name = name + "_pulp";
    lemon_pulp.position.z = 0.015;
    lemon_slice.add(lemon_pulp);

    const lemon_pith_ring = new THREE.Mesh(
      lemonPithRingGeom,
      lemonPithMat
    );
    lemon_pith_ring.name = name + "_pith_ring";
    lemon_pith_ring.position.z = 0.018;
    lemon_slice.add(lemon_pith_ring);

    const lemon_segments = new THREE.InstancedMesh(
      lemonSegmentGeom,
      lemonPithMat,
      8
    );
    lemon_segments.name = name + "_segments";
    for (let i = 0; i < 8; i++) {
      instanceDummy.position.set(0, 0, 0.019);
      instanceDummy.rotation.set(0, 0, i / 8 * Math.PI * 2);
      instanceDummy.scale.set(1, 1, 1);
      instanceDummy.updateMatrix();
      lemon_segments.setMatrixAt(i, instanceDummy.matrix);
    }
    lemon_segments.instanceMatrix.needsUpdate = true;
    lemon_slice.add(lemon_segments);

    const lemon_center = new THREE.Mesh(lemonCenterGeom, lemonPithMat);
    lemon_center.name = name + "_center";
    lemon_center.position.z = 0.021;
    lemon_slice.add(lemon_center);

    return lemon_slice;
  }

  const lemon_slice_center = createLemonSlice("lemon_slice_center");
  lemon_slice_center.position.set(0.035, 0.70, 0.245);
  lemon_slice_center.rotation.set(0.02, -0.08, -0.18);
  lemon_slice_center.scale.setScalar(1.13);
  contents.add(lemon_slice_center);

  const lemon_slice_left = createLemonSlice("lemon_slice_left");
  lemon_slice_left.position.set(-0.14, 0.93, 0.17);
  lemon_slice_left.rotation.set(-0.02, 0.10, 0.48);
  lemon_slice_left.scale.setScalar(0.90);
  contents.add(lemon_slice_left);

  const lemon_slice_top = createLemonSlice("lemon_slice_top");
  lemon_slice_top.position.set(0.02, 1.075, 0.04);
  lemon_slice_top.rotation.set(0.08, -0.22, -0.55);
  lemon_slice_top.scale.setScalar(0.78);
  contents.add(lemon_slice_top);

  const bubbleGeom = new THREE.SphereGeometry(1, 8, 6);
  const bubbleCount = 360;
  const bubbles = new THREE.InstancedMesh(
    bubbleGeom,
    bubbleMat,
    bubbleCount
  );
  bubbles.name = "bubbles";
  bubbles.renderOrder = 4;

  for (let i = 0; i < bubbleCount; i++) {
    let x;
    let y;
    let z;
    let bubbleSize;

    if (i < 290) {
      const heightFactor = ((i * 83 + 17) % 293) / 292;
      y = 0.17 + heightFactor * 0.96;
      const angle = i * 2.3999632297 + heightFactor * 0.31;
      const radialFactor = ((i * 107 + 31) % 283) / 282;
      const radialLimit = 0.278 + heightFactor * 0.043;
      const radialDistance = 0.025 + radialFactor * (radialLimit - 0.025);
      x = Math.cos(angle) * radialDistance;
      z = Math.sin(angle) * radialDistance;
      bubbleSize = 0.0032 + ((i * 29 + 3) % 17) * 0.00058;
    } else {
      const trailIndex = i - 290;
      const trail = trailIndex % 7;
      const step = Math.floor(trailIndex / 7);
      const t = step / 8;
      y = 0.22 + t * 0.88;
      const trailAngle = trail / 7 * Math.PI * 2 + 0.35;
      const radialDistance =
        0.075 + trail * 0.024 + Math.sin(t * Math.PI * 3 + trail) * 0.012;
      x = Math.cos(trailAngle) * radialDistance;
      z = Math.sin(trailAngle) * radialDistance;
      bubbleSize = 0.0038 + ((trailIndex * 7 + 2) % 11) * 0.00062;
    }

    instanceDummy.position.set(x, y, z);
    instanceDummy.rotation.set(0, 0, 0);
    instanceDummy.scale.setScalar(bubbleSize);
    instanceDummy.updateMatrix();
    bubbles.setMatrixAt(i, instanceDummy.matrix);
  }
  bubbles.instanceMatrix.needsUpdate = true;
  contents.add(bubbles);

  const surfaceBubbleCount = 64;
  const surface_bubbles = new THREE.InstancedMesh(
    bubbleGeom,
    bubbleMat,
    surfaceBubbleCount
  );
  surface_bubbles.name = "surface_bubbles";
  surface_bubbles.renderOrder = 5;

  for (let i = 0; i < surfaceBubbleCount; i++) {
    const angle = i * 2.3999632297;
    const radialFactor = ((i * 37 + 9) % 67) / 66;
    const radialDistance = 0.035 + radialFactor * 0.285;
    const bubbleSize = 0.0038 + ((i * 13 + 4) % 12) * 0.00062;
    instanceDummy.position.set(
      Math.cos(angle) * radialDistance,
      1.164 + ((i * 5) % 4) * 0.0015,
      Math.sin(angle) * radialDistance
    );
    instanceDummy.rotation.set(0, 0, 0);
    instanceDummy.scale.setScalar(bubbleSize);
    instanceDummy.updateMatrix();
    surface_bubbles.setMatrixAt(i, instanceDummy.matrix);
  }
  surface_bubbles.instanceMatrix.needsUpdate = true;
  contents.add(surface_bubbles);

  const glassHighlightGeom = new THREE.PlaneGeometry(0.018, 0.88);

  const glass_highlight_left = new THREE.Mesh(
    glassHighlightGeom,
    highlightMat
  );
  glass_highlight_left.name = "glass_highlight_left";
  glass_highlight_left.position.set(-0.267, 0.72, 0.205);
  glass_highlight_left.rotation.y = -0.92;
  glass_highlight_left.renderOrder = 8;
  surface_details.add(glass_highlight_left);

  const glass_highlight_right = new THREE.Mesh(
    glassHighlightGeom,
    highlightMat
  );
  glass_highlight_right.name = "glass_highlight_right";
  glass_highlight_right.position.set(0.272, 0.78, 0.198);
  glass_highlight_right.rotation.y = 0.95;
  glass_highlight_right.scale.set(0.72, 0.72, 1);
  glass_highlight_right.renderOrder = 8;
  surface_details.add(glass_highlight_right);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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