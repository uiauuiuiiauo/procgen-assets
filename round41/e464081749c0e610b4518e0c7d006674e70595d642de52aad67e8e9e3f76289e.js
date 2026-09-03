export default function generate(THREE) {
  const root = new THREE.Group();
  const gemstone = new THREE.Group();
  gemstone.name = "gemstone";
  gemstone.rotation.set(0.08, -0.18, -0.20);
  root.add(gemstone);

  function makeGemMaterial(color, roughness, transmission) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness,
      transmission: transmission * 0.35,
      ior: 1.52,
      transparent: true,
      opacity: 0.98,
      clearcoat: 0.75,
      clearcoatRoughness: 0.16,
      thickness: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }

  const gemstone_darkMat = makeGemMaterial(0x17151a, 0.16, 0.08);
  const gemstone_smokyMat = makeGemMaterial(0x29262d, 0.18, 0.10);
  const gemstone_wineMat = makeGemMaterial(0x4b1020, 0.17, 0.10);
  const gemstone_rubyMat = makeGemMaterial(0x86142d, 0.16, 0.09);
  const gemstone_crimsonMat = makeGemMaterial(0xb9253c, 0.15, 0.08);
  const gemstone_roseMat = makeGemMaterial(0xc65362, 0.18, 0.09);
  const gemstone_orangeMat = makeGemMaterial(0xc65a3d, 0.18, 0.08);

  const gemstoneMats = [
    gemstone_darkMat,
    gemstone_smokyMat,
    gemstone_wineMat,
    gemstone_rubyMat,
    gemstone_crimsonMat,
    gemstone_roseMat,
    gemstone_orangeMat,
  ];

  const internal_darkMat = new THREE.MeshStandardMaterial({
    color: 0x120d13,
    metalness: 0.0,
    roughness: 0.28,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const internal_redMat = new THREE.MeshStandardMaterial({
    color: 0x97152d,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const internal_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xd36b45,
    metalness: 0.0,
    roughness: 0.35,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const internal_smokyMat = new THREE.MeshStandardMaterial({
    color: 0x4a4148,
    metalness: 0.0,
    roughness: 0.32,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  function makePolygonGeom(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  function makeTriGeom(a, b, c) {
    return makePolygonGeom([a, b, c]);
  }

  const internal_inclusions = new THREE.Group();
  internal_inclusions.name = "internal_inclusions";
  gemstone.add(internal_inclusions);

  const internal_ruby_bandGeom = makePolygonGeom([
    [-0.37, 0.31],
    [-0.27, 0.46],
    [0.10, 0.43],
    [0.39, 0.27],
    [0.35, 0.15],
    [0.08, 0.18],
    [-0.18, 0.24],
  ]);
  const internal_ruby_band = new THREE.Mesh(
    internal_ruby_bandGeom,
    internal_redMat
  );
  internal_ruby_band.name = "internal_ruby_band";
  internal_ruby_band.position.z = 0.08;
  internal_ruby_band.renderOrder = 1;
  internal_inclusions.add(internal_ruby_band);

  const internal_orange_bandGeom = makePolygonGeom([
    [-0.04, 0.25],
    [0.15, 0.37],
    [0.39, 0.26],
    [0.35, 0.18],
    [0.12, 0.20],
  ]);
  const internal_orange_band = new THREE.Mesh(
    internal_orange_bandGeom,
    internal_orangeMat
  );
  internal_orange_band.name = "internal_orange_band";
  internal_orange_band.position.z = 0.09;
  internal_orange_band.renderOrder = 1;
  internal_inclusions.add(internal_orange_band);

  const internal_dark_bandGeom = makePolygonGeom([
    [-0.16, 0.34],
    [-0.08, 0.51],
    [0.08, 0.27],
    [0.02, -0.02],
    [-0.08, -0.18],
    [-0.18, 0.08],
  ]);
  const internal_dark_band = new THREE.Mesh(
    internal_dark_bandGeom,
    internal_darkMat
  );
  internal_dark_band.name = "internal_dark_band";
  internal_dark_band.position.z = 0.10;
  internal_dark_band.renderOrder = 1;
  internal_inclusions.add(internal_dark_band);

  const internal_smoky_bandGeom = makePolygonGeom([
    [-0.39, -0.12],
    [-0.28, -0.02],
    [0.03, -0.11],
    [0.34, -0.22],
    [0.31, -0.31],
    [-0.30, -0.25],
  ]);
  const internal_smoky_band = new THREE.Mesh(
    internal_smoky_bandGeom,
    internal_smokyMat
  );
  internal_smoky_band.name = "internal_smoky_band";
  internal_smoky_band.position.z = 0.07;
  internal_smoky_band.renderOrder = 1;
  internal_inclusions.add(internal_smoky_band);

  const frontZ = 0.24;
  const backZ = -0.24;

  const front_ring = [
    new THREE.Vector3(-0.08, 0.68, frontZ),
    new THREE.Vector3(0.25, 0.52, frontZ),
    new THREE.Vector3(0.43, 0.20, frontZ),
    new THREE.Vector3(0.38, -0.50, frontZ),
    new THREE.Vector3(0.08, -0.68, frontZ),
    new THREE.Vector3(-0.32, -0.58, frontZ),
    new THREE.Vector3(-0.45, -0.18, frontZ),
    new THREE.Vector3(-0.38, 0.35, frontZ),
  ];

  const back_ring = [
    new THREE.Vector3(-0.06, 0.67, backZ),
    new THREE.Vector3(0.27, 0.50, backZ),
    new THREE.Vector3(0.42, 0.18, backZ),
    new THREE.Vector3(0.36, -0.48, backZ),
    new THREE.Vector3(0.06, -0.66, backZ),
    new THREE.Vector3(-0.31, -0.57, backZ),
    new THREE.Vector3(-0.43, -0.17, backZ),
    new THREE.Vector3(-0.36, 0.34, backZ),
  ];

  const front_center = new THREE.Vector3(-0.01, -0.03, frontZ);
  const back_center = new THREE.Vector3(0.00, -0.03, backZ);
  const facetPositions = [];
  const facetGroups = [];

  function addFacet(a, b, c, materialIndex) {
    const start = facetPositions.length / 3;
    facetPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    facetGroups.push({ start, materialIndex });
  }

  const frontFacetMap = [
    [2, 1, 4, 3, 2, 0, 3, 5],
    [1, 2, 4, 3, 1, 5, 3, 6],
    [0, 2, 3, 1, 2, 5, 4, 3],
    [1, 3, 2, 0, 1, 4, 3, 2],
  ];

  const backFacetMap = [
    [1, 0, 2, 1, 2, 3, 1, 2],
    [0, 1, 2, 0, 1, 3, 2, 1],
    [1, 2, 1, 3, 0, 2, 1, 3],
    [2, 1, 3, 2, 1, 4, 2, 1],
  ];

  const sideFacetMap = [
    1, 2, 3, 1, 2, 4, 1, 3,
    0, 3, 1, 2, 0, 4, 1, 2,
    2, 1, 3, 5, 1, 2, 4, 1,
    3, 5, 1, 2, 4, 0, 3, 1,
  ];

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addFacet(
      front_center,
      front_ring[i],
      front_ring[next],
      frontFacetMap[i]
    );
  }

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addFacet(
      back_center,
      back_ring[next],
      back_ring[i],
      backFacetMap[i]
    );
  }

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    const materialIndex = sideFacetMap[i * 2];
    const secondMaterial = sideFacetMap[i * 2 + 1];

    if (i % 2 === 0) {
      addFacet(
        front_ring[i],
        front_ring[next],
        back_ring[next],
        materialIndex
      );
      addFacet(
        front_ring[i],
        back_ring[next],
        back_ring[i],
        secondMaterial
      );
    } else {
      addFacet(
        front_ring[i],
        front_ring[next],
        back_ring[i],
        materialIndex
      );
      addFacet(
        front_ring[next],
        back_ring[next],
        back_ring[i],
        secondMaterial
      );
    }
  }

  const gemstone_bodyGeom = new THREE.BufferGeometry();
  gemstone_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facetPositions, 3)
  );
  for (const group of facetGroups) {
    gemstone_bodyGeom.addGroup(group.start, 3, group.materialIndex);
  }
  gemstone_bodyGeom.computeVertexNormals();

  const gemstone_body = new THREE.Mesh(gemstone_bodyGeom, gemstoneMats);
  gemstone_body.name = "gemstone_body";
  gemstone_body.renderOrder = 2;
  gemstone.add(gemstone_body);

  const surface_facets = new THREE.Group();
  surface_facets.name = "surface_facets";
  gemstone.add(surface_facets);

  const top_left_facetGeom = makeTriGeom(
    [-0.08, 0.68],
    [-0.38, 0.35],
    [-0.01, -0.03]
  );
  const top_left_facet = new THREE.Mesh(
    top_left_facetGeom,
    gemstone_darkMat
  );
  top_left_facet.name = "top_left_facet";
  top_left_facet.position.z = 0.244;
  top_left_facet.renderOrder = 3;
  surface_facets.add(top_left_facet);

  const top_facetGeom = makeTriGeom(
    [-0.08, 0.68],
    [0.25, 0.52],
    [-0.01, -0.03]
  );
  const top_facet = new THREE.Mesh(top_facetGeom, gemstone_smokyMat);
  top_facet.name = "top_facet";
  top_facet.position.z = 0.245;
  top_facet.renderOrder = 3;
  surface_facets.add(top_facet);

  const upper_right_facetGeom = makeTriGeom(
    [0.25, 0.52],
    [0.43, 0.20],
    [-0.01, -0.03]
  );
  const upper_right_facet = new THREE.Mesh(
    upper_right_facetGeom,
    gemstone_crimsonMat
  );
  upper_right_facet.name = "upper_right_facet";
  upper_right_facet.position.z = 0.246;
  upper_right_facet.renderOrder = 3;
  surface_facets.add(upper_right_facet);

  const right_center_facetGeom = makeTriGeom(
    [0.43, 0.20],
    [0.38, -0.50],
    [-0.01, -0.03]
  );
  const right_center_facet = new THREE.Mesh(
    right_center_facetGeom,
    gemstone_rubyMat
  );
  right_center_facet.name = "right_center_facet";
  right_center_facet.position.z = 0.245;
  right_center_facet.renderOrder = 3;
  surface_facets.add(right_center_facet);

  const bottom_right_facetGeom = makeTriGeom(
    [0.38, -0.50],
    [0.08, -0.68],
    [-0.01, -0.03]
  );
  const bottom_right_facet = new THREE.Mesh(
    bottom_right_facetGeom,
    gemstone_darkMat
  );
  bottom_right_facet.name = "bottom_right_facet";
  bottom_right_facet.position.z = 0.246;
  bottom_right_facet.renderOrder = 3;
  surface_facets.add(bottom_right_facet);

  const bottom_facetGeom = makeTriGeom(
    [0.08, -0.68],
    [-0.32, -0.58],
    [-0.01, -0.03]
  );
  const bottom_facet = new THREE.Mesh(
    bottom_facetGeom,
    gemstone_smokyMat
  );
  bottom_facet.name = "bottom_facet";
  bottom_facet.position.z = 0.245;
  bottom_facet.renderOrder = 3;
  surface_facets.add(bottom_facet);

  const lower_left_facetGeom = makeTriGeom(
    [-0.32, -0.58],
    [-0.45, -0.18],
    [-0.01, -0.03]
  );
  const lower_left_facet = new THREE.Mesh(
    lower_left_facetGeom,
    gemstone_wineMat
  );
  lower_left_facet.name = "lower_left_facet";
  lower_left_facet.position.z = 0.246;
  lower_left_facet.renderOrder = 3;
  surface_facets.add(lower_left_facet);

  const upper_left_facetGeom = makeTriGeom(
    [-0.45, -0.18],
    [-0.38, 0.35],
    [-0.01, -0.03]
  );
  const upper_left_facet = new THREE.Mesh(
    upper_left_facetGeom,
    gemstone_roseMat
  );
  upper_left_facet.name = "upper_left_facet";
  upper_left_facet.position.z = 0.246;
  upper_left_facet.renderOrder = 3;
  surface_facets.add(upper_left_facet);

  const central_ruby_facetGeom = makePolygonGeom([
    [-0.36, 0.31],
    [-0.20, 0.43],
    [-0.01, -0.03],
    [-0.22, -0.17],
    [-0.39, -0.05],
  ]);
  const central_ruby_facet = new THREE.Mesh(
    central_ruby_facetGeom,
    gemstone_rubyMat
  );
  central_ruby_facet.name = "central_ruby_facet";
  central_ruby_facet.position.z = 0.248;
  central_ruby_facet.renderOrder = 4;
  surface_facets.add(central_ruby_facet);

  const central_dark_wedgeGeom = makePolygonGeom([
    [-0.10, 0.42],
    [0.01, 0.31],
    [0.08, 0.08],
    [0.02, -0.16],
    [-0.09, -0.04],
    [-0.03, 0.20],
  ]);
  const central_dark_wedge = new THREE.Mesh(
    central_dark_wedgeGeom,
    gemstone_darkMat
  );
  central_dark_wedge.name = "central_dark_wedge";
  central_dark_wedge.position.z = 0.249;
  central_dark_wedge.renderOrder = 4;
  surface_facets.add(central_dark_wedge);

  const right_crimson_facetGeom = makePolygonGeom([
    [0.01, 0.31],
    [0.25, 0.50],
    [0.41, 0.19],
    [0.35, -0.03],
    [0.08, 0.08],
  ]);
  const right_crimson_facet = new THREE.Mesh(
    right_crimson_facetGeom,
    gemstone_crimsonMat
  );
  right_crimson_facet.name = "right_crimson_facet";
  right_crimson_facet.position.z = 0.248;
  right_crimson_facet.renderOrder = 4;
  surface_facets.add(right_crimson_facet);

  const orange_inclusionGeom = makePolygonGeom([
    [0.01, 0.28],
    [0.16, 0.36],
    [0.35, 0.25],
    [0.32, 0.17],
    [0.13, 0.20],
  ]);
  const orange_inclusion = new THREE.Mesh(
    orange_inclusionGeom,
    gemstone_orangeMat
  );
  orange_inclusion.name = "orange_inclusion";
  orange_inclusion.position.z = 0.250;
  orange_inclusion.renderOrder = 4;
  surface_facets.add(orange_inclusion);

  const lower_wine_facetGeom = makePolygonGeom([
    [-0.42, -0.17],
    [-0.32, -0.56],
    [0.06, -0.66],
    [-0.01, -0.06],
    [-0.22, -0.17],
  ]);
  const lower_wine_facet = new THREE.Mesh(
    lower_wine_facetGeom,
    gemstone_wineMat
  );
  lower_wine_facet.name = "lower_wine_facet";
  lower_wine_facet.position.z = 0.248;
  lower_wine_facet.renderOrder = 4;
  surface_facets.add(lower_wine_facet);

  const veinMat = new THREE.MeshStandardMaterial({
    color: 0xbab2a8,
    metalness: 0.0,
    roughness: 0.7,
  });

  const main_veinPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.08, 0.27, 0.253),
      new THREE.Vector3(0.03, 0.16, 0.253),
      new THREE.Vector3(0.07, 0.05, 0.253),
      new THREE.Vector3(0.01, -0.08, 0.253),
      new THREE.Vector3(0.04, -0.20, 0.253),
      new THREE.Vector3(-0.03, -0.34, 0.253),
      new THREE.Vector3(-0.01, -0.49, 0.253),
      new THREE.Vector3(0.03, -0.63, 0.253),
    ],
    false,
    "centripetal"
  );
  const main_veinGeom = new THREE.TubeGeometry(
    main_veinPath,
    32,
    0.005,
    6,
    false
  );
  const main_vein = new THREE.Mesh(main_veinGeom, veinMat);
  main_vein.name = "main_vein";
  main_vein.renderOrder = 5;
  gemstone.add(main_vein);

  const left_branch_veinPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.02, -0.33, 0.253),
      new THREE.Vector3(-0.13, -0.29, 0.253),
      new THREE.Vector3(-0.25, -0.34, 0.253),
      new THREE.Vector3(-0.37, -0.32, 0.253),
    ],
    false,
    "centripetal"
  );
  const left_branch_veinGeom = new THREE.TubeGeometry(
    left_branch_veinPath,
    18,
    0.0035,
    6,
    false
  );
  const left_branch_vein = new THREE.Mesh(
    left_branch_veinGeom,
    veinMat
  );
  left_branch_vein.name = "left_branch_vein";
  left_branch_vein.renderOrder = 5;
  gemstone.add(left_branch_vein);

  const right_branch_veinPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.02, -0.34, 0.253),
      new THREE.Vector3(0.12, -0.39, 0.253),
      new THREE.Vector3(0.23, -0.43, 0.253),
      new THREE.Vector3(0.34, -0.42, 0.253),
    ],
    false,
    "centripetal"
  );
  const right_branch_veinGeom = new THREE.TubeGeometry(
    right_branch_veinPath,
    18,
    0.0035,
    6,
    false
  );
  const right_branch_vein = new THREE.Mesh(
    right_branch_veinGeom,
    veinMat
  );
  right_branch_vein.name = "right_branch_vein";
  right_branch_vein.renderOrder = 5;
  gemstone.add(right_branch_vein);

  const speckleMat = new THREE.MeshStandardMaterial({
    color: 0xd8d0c7,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const speckleGeom = new THREE.CircleGeometry(0.006, 8);
  const specklePositions = [
    [-0.25, 0.43],
    [0.16, 0.42],
    [0.29, 0.25],
    [-0.31, 0.16],
    [0.08, 0.12],
    [0.25, -0.02],
    [-0.20, -0.12],
    [0.13, -0.20],
    [-0.28, -0.29],
    [0.26, -0.34],
    [-0.12, -0.48],
    [0.12, -0.55],
  ];
  const mineral_speckles = new THREE.InstancedMesh(
    speckleGeom,
    speckleMat,
    specklePositions.length
  );
  mineral_speckles.name = "mineral_speckles";
  const speckleDummy = new THREE.Object3D();
  for (let i = 0; i < specklePositions.length; i++) {
    const p = specklePositions[i];
    const scale = 0.55 + (i % 4) * 0.18;
    speckleDummy.position.set(p[0], p[1], 0.254);
    speckleDummy.rotation.set(0, 0, (i % 5) * 0.37);
    speckleDummy.scale.set(scale, scale * (0.7 + (i % 3) * 0.15), 1);
    speckleDummy.updateMatrix();
    mineral_speckles.setMatrixAt(i, speckleDummy.matrix);
  }
  mineral_speckles.instanceMatrix.needsUpdate = true;
  mineral_speckles.renderOrder = 6;
  gemstone.add(mineral_speckles);

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