export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "faceted_amethyst";

  const gemstone = new THREE.Group();
  gemstone.name = "gemstone";
  root.add(gemstone);

  const crown_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const girdleMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const pavilion_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const table_facetMat = new THREE.MeshPhysicalMaterial({
    color: 0x574763,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });

  const internal_reflectionsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.34,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const facetPalette = [
    0x211529,
    0x34203f,
    0x4b2a55,
    0x65416f,
    0x806087,
    0xa093a5,
    0x302536,
    0x536075,
  ];

  function makeRing(radius, y, count, offset) {
    const ring = [];
    for (let i = 0; i < count; i++) {
      const angle = offset + i / count * Math.PI * 2;
      ring.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    return ring;
  }

  function addFacet(facets, a, b, c, colorValue) {
    let second = b;
    let third = c;

    const edgeA = new THREE.Vector3().subVectors(second, a);
    const edgeB = new THREE.Vector3().subVectors(third, a);
    const normal = new THREE.Vector3().crossVectors(edgeA, edgeB);
    const center = new THREE.Vector3()
      .add(a)
      .add(second)
      .add(third)
      .multiplyScalar(1 / 3);

    if (normal.dot(center) < 0) {
      second = c;
      third = b;
    }

    const color = new THREE.Color(colorValue);
    const points = [a, second, third];
    for (const point of points) {
      facets.positions.push(point.x, point.y, point.z);
      facets.colors.push(color.r, color.g, color.b);
    }
  }

  function addColoredPlane(facets, points, colorValue) {
    const color = new THREE.Color(colorValue);
    for (let i = 1; i < points.length - 1; i++) {
      const triangle = [points[0], points[i], points[i + 1]];
      for (const point of triangle) {
        facets.positions.push(point.x, point.y, point.z);
        facets.colors.push(color.r, color.g, color.b);
      }
    }
  }

  function createFacetGeometry(facets) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(facets.positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(facets.colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const outer_top = makeRing(0.62, 0.34, 8, Math.PI / 8);
  const table_ring = makeRing(0.43, 0.56, 8, Math.PI / 8);
  const girdle_upper = makeRing(1.00, 0.02, 8, 0);
  const girdle_lower = makeRing(1.00, -0.025, 8, 0);
  const pavilion_middle = makeRing(0.58, -0.43, 8, 0);
  const pavilion_low = makeRing(0.22, -0.78, 8, 0);
  const table_center = new THREE.Vector3(0, 0.56, 0);
  const pavilion_tip = new THREE.Vector3(0, -0.98, 0);

  const crownFacets = { positions: [], colors: [] };
  const crownColorA = [5, 2, 4, 6, 3, 7, 1, 4];
  const crownColorB = [1, 4, 2, 5, 6, 3, 4, 7];

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;

    addFacet(
      crownFacets,
      outer_top[i],
      outer_top[next],
      table_ring[next],
      facetPalette[crownColorA[i]]
    );
    addFacet(
      crownFacets,
      outer_top[i],
      table_ring[next],
      table_ring[i],
      facetPalette[crownColorB[i]]
    );

    addFacet(
      crownFacets,
      girdle_upper[i],
      girdle_upper[next],
      outer_top[next],
      facetPalette[(crownColorA[i] + 1) % 8]
    );
    addFacet(
      crownFacets,
      girdle_upper[i],
      outer_top[next],
      outer_top[i],
      facetPalette[(crownColorB[i] + 2) % 8]
    );
  }

  const crown_facetsGeom = createFacetGeometry(crownFacets);
  const crown_facets = new THREE.Mesh(crown_facetsGeom, crown_facetsMat);
  crown_facets.name = "crown_facets";
  gemstone.add(crown_facets);

  const table_facetGeom = new THREE.CircleGeometry(
    0.43,
    8,
    Math.PI / 8
  );
  const table_facet = new THREE.Mesh(table_facetGeom, table_facetMat);
  table_facet.name = "table_facet";
  table_facet.rotation.x = -Math.PI / 2;
  table_facet.position.y = 0.561;
  gemstone.add(table_facet);

  const girdleFacets = { positions: [], colors: [] };
  const girdleColors = [0, 1, 6, 0, 1, 7, 0, 5];

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    const color = facetPalette[girdleColors[i]];

    addFacet(
      girdleFacets,
      girdle_upper[i],
      girdle_upper[next],
      girdle_lower[next],
      color
    );
    addFacet(
      girdleFacets,
      girdle_upper[i],
      girdle_lower[next],
      girdle_lower[i],
      color
    );
  }

  const girdleGeom = createFacetGeometry(girdleFacets);
  const girdle = new THREE.Mesh(girdleGeom, girdleMat);
  girdle.name = "girdle";
  gemstone.add(girdle);

  const pavilionFacets = { positions: [], colors: [] };
  const pavilionColorA = [1, 3, 0, 2, 6, 4, 0, 5];
  const pavilionColorB = [2, 0, 4, 1, 3, 7, 2, 0];

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;

    addFacet(
      pavilionFacets,
      girdle_lower[i],
      girdle_lower[next],
      pavilion_middle[next],
      facetPalette[pavilionColorA[i]]
    );
    addFacet(
      pavilionFacets,
      girdle_lower[i],
      pavilion_middle[next],
      pavilion_middle[i],
      facetPalette[pavilionColorB[i]]
    );

    addFacet(
      pavilionFacets,
      pavilion_middle[i],
      pavilion_middle[next],
      pavilion_low[next],
      facetPalette[(pavilionColorA[i] + 2) % 8]
    );
    addFacet(
      pavilionFacets,
      pavilion_middle[i],
      pavilion_low[next],
      pavilion_low[i],
      facetPalette[(pavilionColorB[i] + 1) % 8]
    );

    addFacet(
      pavilionFacets,
      pavilion_low[i],
      pavilion_low[next],
      pavilion_tip,
      facetPalette[(i + 4) % 8]
    );
  }

  const pavilion_facetsGeom = createFacetGeometry(pavilionFacets);
  const pavilion_facets = new THREE.Mesh(
    pavilion_facetsGeom,
    pavilion_facetsMat
  );
  pavilion_facets.name = "pavilion_facets";
  gemstone.add(pavilion_facets);

  const reflectionPoints = [
    new THREE.Vector3(-0.31, 0.42, 0.34),
    new THREE.Vector3(0.00, 0.50, 0.34),
    new THREE.Vector3(0.31, 0.40, 0.34),
    new THREE.Vector3(0.43, 0.08, 0.34),
    new THREE.Vector3(0.34, -0.30, 0.34),
    new THREE.Vector3(0.00, -0.72, 0.34),
    new THREE.Vector3(-0.34, -0.30, 0.34),
    new THREE.Vector3(-0.43, 0.08, 0.34),
    new THREE.Vector3(0.00, 0.07, 0.34),
  ];

  const reflectionFacets = { positions: [], colors: [] };
  const reflectionColors = [
    0x75517f,
    0x24152d,
    0x8c658f,
    0x382044,
    0x68446f,
    0x1c1025,
    0x9a719d,
    0x49304f,
  ];

  for (let i = 0; i < 8; i++) {
    addColoredPlane(
      reflectionFacets,
      [
        reflectionPoints[8],
        reflectionPoints[i],
        reflectionPoints[(i + 1) % 8],
      ],
      reflectionColors[i]
    );
  }

  addColoredPlane(
    reflectionFacets,
    [
      new THREE.Vector3(-0.31, 0.42, 0.351),
      new THREE.Vector3(0.00, 0.50, 0.351),
      new THREE.Vector3(-0.05, 0.10, 0.351),
    ],
    0x907096
  );

  addColoredPlane(
    reflectionFacets,
    [
      new THREE.Vector3(0.00, 0.50, 0.352),
      new THREE.Vector3(0.31, 0.40, 0.352),
      new THREE.Vector3(0.05, 0.10, 0.352),
    ],
    0x281632
  );

  addColoredPlane(
    reflectionFacets,
    [
      new THREE.Vector3(-0.43, 0.08, 0.352),
      new THREE.Vector3(0.00, 0.07, 0.352),
      new THREE.Vector3(-0.18, -0.48, 0.352),
    ],
    0x56305e
  );

  addColoredPlane(
    reflectionFacets,
    [
      new THREE.Vector3(0.00, 0.07, 0.353),
      new THREE.Vector3(0.43, 0.08, 0.353),
      new THREE.Vector3(0.12, -0.50, 0.353),
    ],
    0x1b0f22
  );

  addColoredPlane(
    reflectionFacets,
    [
      new THREE.Vector3(-0.34, -0.30, 0.352),
      new THREE.Vector3(0.00, -0.72, 0.352),
      new THREE.Vector3(-0.04, -0.28, 0.352),
    ],
    0x77507f
  );

  addColoredPlane(
    reflectionFacets,
    [
      new THREE.Vector3(0.00, -0.72, 0.353),
      new THREE.Vector3(0.34, -0.30, 0.353),
      new THREE.Vector3(0.05, -0.29, 0.353),
    ],
    0x321d39
  );

  const internal_reflectionsGeom = createFacetGeometry(reflectionFacets);
  const internal_reflections = new THREE.Mesh(
    internal_reflectionsGeom,
    internal_reflectionsMat
  );
  internal_reflections.name = "internal_reflections";
  internal_reflections.renderOrder = 1;
  gemstone.add(internal_reflections);

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