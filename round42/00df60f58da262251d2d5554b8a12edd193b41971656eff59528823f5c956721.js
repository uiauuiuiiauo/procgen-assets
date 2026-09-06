export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_assembly = new THREE.Group();
  root.add(ring_assembly);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x00752d,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const gemstone_backingMat = new THREE.MeshStandardMaterial({
    color: 0x00652b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const gemstone_starMat = new THREE.MeshStandardMaterial({
    color: 0x00a846,
    metalness: 0.0,
    roughness: 0.3,
  });
  const gemstone_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x63d889,
    metalness: 0.0,
    roughness: 0.7,
  });

  const facet_materials = [
    0x003b1d,
    0x006526,
    0x008a32,
    0x00b33f,
    0x00d94b,
    0x164d29,
    0x097b35,
    0x2b9b4d,
  ].map((color) => new THREE.MeshStandardMaterial({
    color,
    metalness: 0.0,
    roughness: 0.3,
    flatShading: true,
    side: THREE.DoubleSide,
  }));

  const facet_highlightMats = [
    new THREE.MeshStandardMaterial({
      color: 0xb7d1c2,
      metalness: 0.0,
      roughness: 0.3,
      transparent: true,
      opacity: 0.48,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x79a98a,
      metalness: 0.0,
      roughness: 0.3,
      transparent: true,
      opacity: 0.34,
      side: THREE.DoubleSide,
    }),
  ];

  function createOvalGemGeometry(halfW, halfH) {
    const positions = [];
    const outer = [];
    const inner = [];
    const segments = 16;
    const innerScale = 0.53;

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      outer.push(new THREE.Vector3(x * halfW, y * halfH, 0.072));
      inner.push(new THREE.Vector3(
        x * halfW * innerScale,
        y * halfH * innerScale,
        0.168
      ));
    }

    function addTriangle(a, b, c) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
    }

    const frontCenter = new THREE.Vector3(0, 0, 0.174);
    const backCenter = new THREE.Vector3(0, 0, -0.105);

    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      addTriangle(frontCenter, inner[i], inner[j]);
      addTriangle(outer[i], outer[j], inner[j]);
      addTriangle(outer[i], inner[j], inner[i]);
      addTriangle(outer[i], backCenter, outer[j]);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createFacetGeometry(halfW, halfH, materialCount) {
    const positions = [];
    const groups = [];
    const segments = 12;
    const outer = [];
    const table = [];

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      outer.push(new THREE.Vector3(x * halfW, y * halfH, 0.075));
      table.push(new THREE.Vector3(x * halfW * 0.51, y * halfH * 0.51, 0.171));
    }

    function addFacet(a, b, c, materialIndex) {
      const start = positions.length / 3;
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      groups.push([start, 3, materialIndex % materialCount]);
    }

    const center = new THREE.Vector3(0, 0, 0.176);

    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      addFacet(center, table[i], table[j], i * 5 + 2);
      addFacet(outer[i], outer[j], table[j], i * 3 + 1);
      addFacet(outer[i], table[j], table[i], i * 7 + 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    for (const group of groups) {
      geometry.addGroup(group[0], group[1], group[2]);
    }
    geometry.computeVertexNormals();
    return geometry;
  }

  function createHighlightGeometry(triangles, materialCount) {
    const positions = [];
    const groups = [];

    for (let i = 0; i < triangles.length; i++) {
      const triangle = triangles[i];
      const start = positions.length / 3;
      for (const point of triangle) {
        positions.push(point.x, point.y, point.z);
      }
      groups.push([start, 3, i % materialCount]);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    for (const group of groups) {
      geometry.addGroup(group[0], group[1], group[2]);
    }
    geometry.computeVertexNormals();
    return geometry;
  }

  const ring_bandGeom = new THREE.TorusGeometry(0.43, 0.06, 16, 64);
  const ring_band = new THREE.Mesh(ring_bandGeom, silverMat);
  ring_band.rotation.x = Math.PI / 2;
  ring_band.position.set(0, -0.035, -0.44);
  ring_assembly.add(ring_band);

  const left_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.34, -0.035, -0.07),
    new THREE.Vector3(-0.39, -0.035, -0.14),
    new THREE.Vector3(-0.42, -0.035, -0.23),
    new THREE.Vector3(-0.43, -0.035, -0.33),
  ]);
  const left_shoulderGeom = new THREE.TubeGeometry(
    left_shoulderPath,
    20,
    0.062,
    12,
    false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  ring_assembly.add(left_shoulder);

  const right_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.34, -0.035, -0.07),
    new THREE.Vector3(0.39, -0.035, -0.14),
    new THREE.Vector3(0.42, -0.035, -0.23),
    new THREE.Vector3(0.43, -0.035, -0.33),
  ]);
  const right_shoulderGeom = new THREE.TubeGeometry(
    right_shoulderPath,
    20,
    0.062,
    12,
    false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, silverMat);
  ring_assembly.add(right_shoulder);

  const bezel_setting = new THREE.Group();
  bezel_setting.position.y = 0.015;
  ring_assembly.add(bezel_setting);

  const bezel_backplateGeom = new THREE.CylinderGeometry(1, 1, 0.12, 64);
  const bezel_backplate = new THREE.Mesh(bezel_backplateGeom, silverMat);
  bezel_backplate.rotation.x = Math.PI / 2;
  bezel_backplate.scale.set(0.49, 1, 0.64);
  bezel_backplate.position.z = -0.035;
  bezel_setting.add(bezel_backplate);

  const outer_bezelGeom = new THREE.TorusGeometry(0.5, 0.06, 18, 72);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polishedMat);
  outer_bezel.scale.set(0.86, 1.18, 1);
  outer_bezel.position.z = 0.03;
  bezel_setting.add(outer_bezel);

  const outer_highlightGeom = new THREE.TorusGeometry(0.5, 0.018, 12, 72);
  const outer_highlight = new THREE.Mesh(outer_highlightGeom, polishedMat);
  outer_highlight.scale.set(0.86, 1.18, 1);
  outer_highlight.position.z = 0.083;
  bezel_setting.add(outer_highlight);

  const gemstone_backingGeom = new THREE.CylinderGeometry(1, 1, 0.025, 64);
  const gemstone_backing = new THREE.Mesh(
    gemstone_backingGeom,
    gemstone_backingMat
  );
  gemstone_backing.rotation.x = Math.PI / 2;
  gemstone_backing.scale.set(0.397, 1, 0.545);
  gemstone_backing.position.z = 0.035;
  bezel_setting.add(gemstone_backing);

  const gemstoneGeom = createOvalGemGeometry(0.395, 0.545);
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  bezel_setting.add(gemstone);

  const gemstone_facetsGeom = createFacetGeometry(0.395, 0.545, 8);
  const gemstone_facets = new THREE.Mesh(
    gemstone_facetsGeom,
    facet_materials
  );
  bezel_setting.add(gemstone_facets);

  const gemstone_starShape = new THREE.Shape();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const radius = i % 2 === 0 ? 0.14 : 0.025;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      gemstone_starShape.moveTo(x, y);
    } else {
      gemstone_starShape.lineTo(x, y);
    }
  }
  gemstone_starShape.closePath();

  const gemstone_starGeom = new THREE.ShapeGeometry(gemstone_starShape);
  const gemstone_star = new THREE.Mesh(gemstone_starGeom, gemstone_starMat);
  gemstone_star.position.z = 0.18;
  bezel_setting.add(gemstone_star);

  const gemstone_inclusionsGeom = new THREE.SphereGeometry(0.0045, 8, 6);
  const gemstone_inclusions = new THREE.InstancedMesh(
    gemstone_inclusionsGeom,
    gemstone_inclusionsMat,
    18
  );
  const inclusion_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.08 + (i % 6) * 0.045;
    const size = 0.65 + (i % 4) * 0.16;
    inclusion_dummy.position.set(
      Math.cos(angle) * radius * 0.75,
      Math.sin(angle) * radius,
      0.182 + (i % 3) * 0.0005
    );
    inclusion_dummy.scale.setScalar(size);
    inclusion_dummy.updateMatrix();
    gemstone_inclusions.setMatrixAt(i, inclusion_dummy.matrix);
  }
  gemstone_inclusions.instanceMatrix.needsUpdate = true;
  bezel_setting.add(gemstone_inclusions);

  const gemstone_highlightsGeom = createHighlightGeometry([
    [
      new THREE.Vector3(-0.36, 0.18, 0.105),
      new THREE.Vector3(-0.17, 0.47, 0.145),
      new THREE.Vector3(-0.055, 0.16, 0.178),
    ],
    [
      new THREE.Vector3(0.08, 0.47, 0.15),
      new THREE.Vector3(0.34, 0.27, 0.112),
      new THREE.Vector3(0.12, 0.08, 0.178),
    ],
    [
      new THREE.Vector3(-0.35, -0.13, 0.108),
      new THREE.Vector3(-0.16, -0.42, 0.142),
      new THREE.Vector3(-0.04, -0.11, 0.178),
    ],
    [
      new THREE.Vector3(0.10, -0.12, 0.178),
      new THREE.Vector3(0.35, -0.27, 0.112),
      new THREE.Vector3(0.17, -0.45, 0.145),
    ],
  ], 2);
  const gemstone_highlights = new THREE.Mesh(
    gemstone_highlightsGeom,
    facet_highlightMats
  );
  bezel_setting.add(gemstone_highlights);

  const inner_bezelGeom = new THREE.TorusGeometry(0.5, 0.017, 12, 72);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, brushedMat);
  inner_bezel.scale.set(0.82, 1.12, 1);
  inner_bezel.position.z = 0.095;
  bezel_setting.add(inner_bezel);

  const inner_bezel_highlightGeom = new THREE.TorusGeometry(
    0.5,
    0.009,
    10,
    72
  );
  const inner_bezel_highlight = new THREE.Mesh(
    inner_bezel_highlightGeom,
    polishedMat
  );
  inner_bezel_highlight.scale.set(0.81, 1.105, 1);
  inner_bezel_highlight.position.z = 0.111;
  bezel_setting.add(inner_bezel_highlight);

  ring_assembly.rotation.set(-0.08, -0.12, -0.04);

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