export default function generate(THREE) {
  const root = new THREE.Group();
  const gemstone = new THREE.Group();
  root.add(gemstone);

  const facetPalette = [
    new THREE.Color(0x0048d8),
    new THREE.Color(0x0079ed),
    new THREE.Color(0x00a8f4),
    new THREE.Color(0x0064d0),
    new THREE.Color(0x002b9e),
    new THREE.Color(0x008ce8),
    new THREE.Color(0x0042bb),
    new THREE.Color(0x00b6fa),
    new THREE.Color(0x00328f),
    new THREE.Color(0x0074df),
    new THREE.Color(0x0099ee),
    new THREE.Color(0x0053c7),
  ];

  function makeFacetedGeometry(triangles, paletteOffset) {
    const positions = [];
    const colors = [];

    for (let i = 0; i < triangles.length; i++) {
      const triangle = triangles[i];
      const colorIndex =
        (i * 7 + paletteOffset * 5) % facetPalette.length;
      const color = facetPalette[colorIndex];

      for (const point of triangle) {
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
    geometry.computeBoundingSphere();
    return geometry;
  }

  const outerRing = [
    new THREE.Vector3(-0.14, 0.78, 0.12),
    new THREE.Vector3(0.27, 0.72, 0.14),
    new THREE.Vector3(0.56, 0.52, 0.12),
    new THREE.Vector3(0.73, 0.21, 0.10),
    new THREE.Vector3(0.75, -0.17, 0.09),
    new THREE.Vector3(0.58, -0.51, 0.11),
    new THREE.Vector3(0.25, -0.72, 0.13),
    new THREE.Vector3(-0.18, -0.75, 0.12),
    new THREE.Vector3(-0.52, -0.56, 0.10),
    new THREE.Vector3(-0.74, -0.23, 0.09),
    new THREE.Vector3(-0.73, 0.18, 0.10),
    new THREE.Vector3(-0.53, 0.52, 0.12),
    new THREE.Vector3(-0.29, 0.69, 0.13),
  ];

  const middleRing = [
    new THREE.Vector3(-0.10, 0.56, 0.30),
    new THREE.Vector3(0.21, 0.53, 0.31),
    new THREE.Vector3(0.43, 0.37, 0.30),
    new THREE.Vector3(0.56, 0.14, 0.28),
    new THREE.Vector3(0.57, -0.13, 0.27),
    new THREE.Vector3(0.45, -0.37, 0.29),
    new THREE.Vector3(0.20, -0.54, 0.31),
    new THREE.Vector3(-0.13, -0.56, 0.31),
    new THREE.Vector3(-0.38, -0.41, 0.29),
    new THREE.Vector3(-0.55, -0.17, 0.27),
    new THREE.Vector3(-0.55, 0.13, 0.28),
    new THREE.Vector3(-0.41, 0.37, 0.30),
    new THREE.Vector3(-0.24, 0.52, 0.31),
  ];

  const tableRing = [
    new THREE.Vector3(-0.08, 0.42, 0.42),
    new THREE.Vector3(0.16, 0.41, 0.42),
    new THREE.Vector3(0.34, 0.29, 0.42),
    new THREE.Vector3(0.43, 0.10, 0.42),
    new THREE.Vector3(0.43, -0.12, 0.42),
    new THREE.Vector3(0.33, -0.31, 0.42),
    new THREE.Vector3(0.14, -0.42, 0.42),
    new THREE.Vector3(-0.09, -0.43, 0.42),
    new THREE.Vector3(-0.28, -0.32, 0.42),
    new THREE.Vector3(-0.40, -0.15, 0.42),
    new THREE.Vector3(-0.40, 0.09, 0.42),
    new THREE.Vector3(-0.30, 0.28, 0.42),
    new THREE.Vector3(-0.18, 0.40, 0.42),
  ];

  const outerFrontTriangles = [];
  const outerBackTriangles = [];

  for (let i = 0; i < outerRing.length; i++) {
    const next = (i + 1) % outerRing.length;
    const outerA = outerRing[i];
    const outerB = outerRing[next];
    const innerA = middleRing[i];
    const innerB = middleRing[next];

    outerFrontTriangles.push(
      [outerA, outerB, innerB],
      [outerA, innerB, innerA]
    );

    const backA = new THREE.Vector3(
      outerA.x * 0.97,
      outerA.y * 0.97,
      -0.24
    );
    const backB = new THREE.Vector3(
      outerB.x * 0.97,
      outerB.y * 0.97,
      -0.24
    );

    outerBackTriangles.push(
      [backA, innerB, outerB],
      [backA, innerA, innerB]
    );
  }

  const outer_crownGeom = makeFacetedGeometry(
    outerFrontTriangles,
    0
  );
  const outer_crownMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.78,
    ior: 1.77,
    transparent: true,
    opacity: 0.96,
    thickness: 0.45,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const outer_crown = new THREE.Mesh(
    outer_crownGeom,
    outer_crownMat
  );
  gemstone.add(outer_crown);

  const inner_crownGeom = makeFacetedGeometry(
    outerBackTriangles,
    4
  );
  const inner_crownMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8ddff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    ior: 1.77,
    transparent: true,
    opacity: 0.94,
    thickness: 0.38,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const inner_crown = new THREE.Mesh(
    inner_crownGeom,
    inner_crownMat
  );
  gemstone.add(inner_crown);

  const middleFacetTriangles = [];

  for (let i = 0; i < middleRing.length; i++) {
    const next = (i + 1) % middleRing.length;
    const middleA = middleRing[i];
    const middleB = middleRing[next];
    const tableA = tableRing[i];
    const tableB = tableRing[next];

    middleFacetTriangles.push(
      [middleA, middleB, tableB],
      [middleA, tableB, tableA]
    );
  }

  const middle_facetsGeom = makeFacetedGeometry(
    middleFacetTriangles,
    2
  );
  const middle_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.84,
    ior: 1.77,
    transparent: true,
    opacity: 0.95,
    thickness: 0.32,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const middle_facets = new THREE.Mesh(
    middle_facetsGeom,
    middle_facetsMat
  );
  gemstone.add(middle_facets);

  const centralTableShape = new THREE.Shape();
  centralTableShape.moveTo(tableRing[0].x, tableRing[0].y);

  for (let i = 1; i < tableRing.length; i++) {
    centralTableShape.lineTo(tableRing[i].x, tableRing[i].y);
  }

  centralTableShape.closePath();

  const central_tableGeom = new THREE.ShapeGeometry(
    centralTableShape
  );
  const central_tableMat = new THREE.MeshPhysicalMaterial({
    color: 0x009be4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.72,
    ior: 1.77,
    transparent: true,
    opacity: 0.97,
    thickness: 0.24,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const central_table = new THREE.Mesh(
    central_tableGeom,
    central_tableMat
  );
  central_table.position.z = 0.423;
  gemstone.add(central_table);

  const girdleTriangles = [];

  for (let i = 0; i < outerRing.length; i++) {
    const next = (i + 1) % outerRing.length;
    const frontA = outerRing[i];
    const frontB = outerRing[next];

    const backA = new THREE.Vector3(
      frontA.x * 0.97,
      frontA.y * 0.97,
      -0.24
    );
    const backB = new THREE.Vector3(
      frontB.x * 0.97,
      frontB.y * 0.97,
      -0.24
    );

    girdleTriangles.push(
      [frontA, backA, backB],
      [frontA, backB, frontB]
    );
  }

  const girdleGeom = makeFacetedGeometry(girdleTriangles, 7);
  const girdleMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.76,
    ior: 1.77,
    transparent: true,
    opacity: 0.96,
    thickness: 0.42,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const girdle = new THREE.Mesh(girdleGeom, girdleMat);
  gemstone.add(girdle);

  const pavilionTriangles = [];
  const pavilionApex = new THREE.Vector3(0, -0.03, -0.66);

  for (let i = 0; i < outerRing.length; i++) {
    const next = (i + 1) % outerRing.length;
    const backA = new THREE.Vector3(
      outerRing[i].x * 0.97,
      outerRing[i].y * 0.97,
      -0.24
    );
    const backB = new THREE.Vector3(
      outerRing[next].x * 0.97,
      outerRing[next].y * 0.97,
      -0.24
    );

    pavilionTriangles.push([backA, pavilionApex, backB]);
  }

  const pavilionGeom = makeFacetedGeometry(
    pavilionTriangles,
    5
  );
  const pavilionMat = new THREE.MeshPhysicalMaterial({
    color: 0xa8ceff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.70,
    ior: 1.77,
    transparent: true,
    opacity: 0.95,
    thickness: 0.48,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const pavilion = new THREE.Mesh(pavilionGeom, pavilionMat);
  gemstone.add(pavilion);

  function makeReflectionGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i].x, points[i].y);
    }

    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const leftReflectionPoints = [
    new THREE.Vector2(-0.31, 0.35),
    new THREE.Vector2(-0.12, 0.27),
    new THREE.Vector2(-0.04, 0.07),
    new THREE.Vector2(-0.22, -0.15),
    new THREE.Vector2(-0.38, 0.10),
  ];

  const rightReflectionPoints = [
    new THREE.Vector2(0.17, 0.37),
    new THREE.Vector2(0.35, 0.28),
    new THREE.Vector2(0.43, 0.08),
    new THREE.Vector2(0.24, -0.14),
    new THREE.Vector2(0.08, 0.10),
  ];

  const left_reflectionGeom = makeReflectionGeometry(
    leftReflectionPoints
  );
  const left_reflectionMat = new THREE.MeshBasicMaterial({
    color: 0xd9efff,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const left_reflection = new THREE.Mesh(
    left_reflectionGeom,
    left_reflectionMat
  );
  left_reflection.position.z = 0.431;
  gemstone.add(left_reflection);

  const right_reflectionGeom = makeReflectionGeometry(
    rightReflectionPoints
  );
  const right_reflectionMat = left_reflectionMat;
  const right_reflection = new THREE.Mesh(
    right_reflectionGeom,
    right_reflectionMat
  );
  right_reflection.position.z = 0.432;
  gemstone.add(right_reflection);

  const glintTriangles = [];
  const glintCenter = new THREE.Vector3(0, -0.02, 0.438);

  for (let i = 0; i < tableRing.length; i++) {
    const next = (i + 1) % tableRing.length;
    const tableA = new THREE.Vector3(
      tableRing[i].x,
      tableRing[i].y,
      0.434
    );
    const tableB = new THREE.Vector3(
      tableRing[next].x,
      tableRing[next].y,
      0.434
    );
    glintTriangles.push([glintCenter, tableA, tableB]);
  }

  const front_glint_planeGeom = makeFacetedGeometry(
    glintTriangles,
    1
  );
  const front_glint_planeMat = new THREE.MeshBasicMaterial({
    color: 0x8fe5ff,
    vertexColors: true,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const front_glint_plane = new THREE.Mesh(
    front_glint_planeGeom,
    front_glint_planeMat
  );
  gemstone.add(front_glint_plane);

  const contact_shadow_outerGeom = new THREE.CircleGeometry(
    0.48,
    48
  );
  const contact_shadow_outerMat = new THREE.MeshBasicMaterial({
    color: 0x94d9ff,
    transparent: true,
    opacity: 0.035,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const contact_shadow_outer = new THREE.Mesh(
    contact_shadow_outerGeom,
    contact_shadow_outerMat
  );
  contact_shadow_outer.rotation.x = -Math.PI / 2;
  contact_shadow_outer.scale.set(1.45, 0.34, 1);
  contact_shadow_outer.position.set(0, -0.758, 0);
  root.add(contact_shadow_outer);

  const contact_shadow_middleGeom = new THREE.CircleGeometry(
    0.38,
    48
  );
  const contact_shadow_middleMat = new THREE.MeshBasicMaterial({
    color: 0x42baff,
    transparent: true,
    opacity: 0.065,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const contact_shadow_middle = new THREE.Mesh(
    contact_shadow_middleGeom,
    contact_shadow_middleMat
  );
  contact_shadow_middle.rotation.x = -Math.PI / 2;
  contact_shadow_middle.scale.set(1.45, 0.30, 1);
  contact_shadow_middle.position.set(0, -0.757, 0);
  root.add(contact_shadow_middle);

  const contact_shadow_coreGeom = new THREE.CircleGeometry(
    0.25,
    48
  );
  const contact_shadow_coreMat = new THREE.MeshBasicMaterial({
    color: 0x008ffa,
    transparent: true,
    opacity: 0.10,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const contact_shadow_core = new THREE.Mesh(
    contact_shadow_coreGeom,
    contact_shadow_coreMat
  );
  contact_shadow_core.rotation.x = -Math.PI / 2;
  contact_shadow_core.scale.set(1.50, 0.25, 1);
  contact_shadow_core.position.set(0, -0.756, 0);
  root.add(contact_shadow_core);

  const floor_causticGeom = new THREE.CircleGeometry(0.22, 48);
  const floor_causticMat = new THREE.MeshBasicMaterial({
    color: 0x00baff,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const floor_caustic = new THREE.Mesh(
    floor_causticGeom,
    floor_causticMat
  );
  floor_caustic.rotation.x = -Math.PI / 2;
  floor_caustic.scale.set(1.65, 0.28, 1);
  floor_caustic.position.set(0, -0.755, 0.02);
  root.add(floor_caustic);

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