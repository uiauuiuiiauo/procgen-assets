export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "faceted_crystal";

  const crystal = new THREE.Group();
  crystal.name = "crystal";
  root.add(crystal);

  const facet_palette = [
    0xffffff,
    0xf5f7f8,
    0xe9edf0,
    0xffffff,
    0xd8dee2,
    0xf9fafb,
    0xcad4da,
    0xffffff,
    0xe4e9ec,
    0xfbf6ec,
    0xd1d9de,
    0xffffff,
    0xe9f1f5,
    0xc5cfd6,
    0xfff8eb,
    0xb8c4cb
  ];

  const facet_colors = facet_palette
    .map((value) => new THREE.Color(value))
    .concat(facet_palette.map((value) => new THREE.Color(value).multiplyScalar(0.91)));

  function makeFacetGeometry(triangles, colorOffset) {
    const positions = [];
    const colors = [];

    for (let i = 0; i < triangles.length; i++) {
      const triangle = triangles[i];
      const colorIndex = (i * 5 + colorOffset) % facet_colors.length;
      const color = facet_colors[colorIndex];

      for (let j = 0; j < 3; j++) {
        const point = triangle[j];
        positions.push(point.x, point.y, point.z);
        colors.push(color.r, color.g, color.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  const outline = [
    new THREE.Vector2(0.00, 1.02),
    new THREE.Vector2(0.18, 0.87),
    new THREE.Vector2(0.34, 0.69),
    new THREE.Vector2(0.47, 0.46),
    new THREE.Vector2(0.56, 0.17),
    new THREE.Vector2(0.58, -0.10),
    new THREE.Vector2(0.54, -0.38),
    new THREE.Vector2(0.43, -0.64),
    new THREE.Vector2(0.26, -0.84),
    new THREE.Vector2(0.00, -1.00),
    new THREE.Vector2(-0.26, -0.84),
    new THREE.Vector2(-0.43, -0.64),
    new THREE.Vector2(-0.54, -0.38),
    new THREE.Vector2(-0.58, -0.10),
    new THREE.Vector2(-0.56, 0.17),
    new THREE.Vector2(-0.47, 0.46),
    new THREE.Vector2(-0.34, 0.69),
    new THREE.Vector2(-0.18, 0.87)
  ];

  function makeRing(scaleX, scaleY, z, xShift, yShift) {
    return outline.map((point) => new THREE.Vector3(
      point.x * scaleX + xShift,
      point.y * scaleY + yShift,
      z
    ));
  }

  const outer_front_ring = makeRing(1.00, 1.00, 0.000, 0.000, 0.000);
  const outer_back_ring = makeRing(1.00, 1.00, -0.025, 0.000, 0.000);
  const crown_ring = makeRing(0.80, 0.83, 0.070, 0.006, 0.000);
  const table_ring = makeRing(0.61, 0.60, 0.125, 0.012, 0.012);
  const rear_crown_ring = makeRing(0.80, 0.83, -0.080, -0.004, 0.000);
  const rear_table_ring = makeRing(0.61, 0.60, -0.125, -0.008, 0.000);
  const front_table_center = new THREE.Vector3(0.012, 0.012, 0.125);
  const rear_table_center = new THREE.Vector3(-0.008, 0.000, -0.125);

  const girdleTriangles = [];
  for (let i = 0; i < outline.length; i++) {
    const next = (i + 1) % outline.length;
    girdleTriangles.push([
      outer_front_ring[i],
      outer_back_ring[next],
      outer_back_ring[i],
      outer_front_ring[i],
      outer_front_ring[next],
      outer_back_ring[next]
    ]);
  }

  const girdle_facetsGeom = makeFacetGeometry(girdleTriangles, 2);
  const girdle_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const girdle_facets = new THREE.Mesh(girdle_facetsGeom, girdle_facetsMat);
  girdle_facets.name = "girdle_facets";
  crystal.add(girdle_facets);

  const crownTriangles = [];
  for (let i = 0; i < outline.length; i++) {
    const next = (i + 1) % outline.length;
    crownTriangles.push([
      outer_front_ring[i],
      outer_front_ring[next],
      crown_ring[next],
      outer_front_ring[i],
      crown_ring[next],
      crown_ring[i]
    ]);
  }

  const crown_facetsGeom = makeFacetGeometry(crownTriangles, 4);
  const crown_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const crown_facets = new THREE.Mesh(crown_facetsGeom, crown_facetsMat);
  crown_facets.name = "crown_facets";
  crystal.add(crown_facets);

  const centralTableTriangles = [];
  for (let i = 0; i < table_ring.length; i++) {
    const next = (i + 1) % table_ring.length;
    centralTableTriangles.push([
      table_ring[i],
      table_ring[next],
      front_table_center
    ]);
  }

  const central_tableGeom = makeFacetGeometry(centralTableTriangles, 0);
  const central_tableMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fafb,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const central_table = new THREE.Mesh(central_tableGeom, central_tableMat);
  central_table.name = "central_table";
  crystal.add(central_table);

  const rearCrownTriangles = [];
  for (let i = 0; i < outline.length; i++) {
    const next = (i + 1) % outline.length;
    rearCrownTriangles.push([
      outer_back_ring[i],
      rear_crown_ring[next],
      outer_back_ring[next],
      outer_back_ring[i],
      rear_crown_ring[i],
      rear_crown_ring[next]
    ]);
  }

  const rear_crown_facetsGeom = makeFacetGeometry(rearCrownTriangles, 8);
  const rear_crown_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const rear_crown_facets = new THREE.Mesh(
    rear_crown_facetsGeom,
    rear_crown_facetsMat
  );
  rear_crown_facets.name = "rear_crown_facets";
  crystal.add(rear_crown_facets);

  const rearTableTriangles = [];
  for (let i = 0; i < outline.length; i++) {
    const next = (i + 1) % outline.length;
    rearTableTriangles.push([
      rear_crown_ring[i],
      rear_table_ring[next],
      rear_crown_ring[next],
      rear_crown_ring[i],
      rear_table_ring[i],
      rear_table_ring[next]
    ]);
    rearTableTriangles.push([
      rear_table_ring[i],
      rear_table_center,
      rear_table_ring[next]
    ]);
  }

  const rear_tableGeom = makeFacetGeometry(rearTableTriangles, 12);
  const rear_tableMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3f6f8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });
  const rear_table = new THREE.Mesh(rear_tableGeom, rear_tableMat);
  rear_table.name = "rear_table";
  crystal.add(rear_table);

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