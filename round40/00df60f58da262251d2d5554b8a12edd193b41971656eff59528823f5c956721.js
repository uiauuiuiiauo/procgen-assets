export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "oval_emerald_ring";

  const setting_group = new THREE.Group();
  setting_group.name = "setting_group";
  root.add(setting_group);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const gemstone_girdleMat = new THREE.MeshStandardMaterial({
    color: 0x064a2a,
    metalness: 0.0,
    roughness: 0.25
  });

  const gemstoneMat = [
    new THREE.MeshPhysicalMaterial({
      color: 0x00351f,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.18,
      ior: 1.5,
      transparent: true,
      opacity: 0.96,
      flatShading: true,
      side: THREE.DoubleSide
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x006b36,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.95,
      flatShading: true,
      side: THREE.DoubleSide
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x00a94b,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.16,
      ior: 1.5,
      transparent: true,
      opacity: 0.94,
      flatShading: true,
      side: THREE.DoubleSide
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x00d95a,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.12,
      ior: 1.5,
      transparent: true,
      opacity: 0.93,
      flatShading: true,
      side: THREE.DoubleSide
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x00512b,
      metalness: 0.0,
      roughness: 0.06,
      transmission: 0.18,
      ior: 1.5,
      transparent: true,
      opacity: 0.96,
      flatShading: true,
      side: THREE.DoubleSide
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x00823b,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.16,
      ior: 1.5,
      transparent: true,
      opacity: 0.94,
      flatShading: true,
      side: THREE.DoubleSide
    })
  ];

  const gemstone_facetsMat = gemstoneMat;

  const gemstone_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x58c985,
    metalness: 0.0,
    roughness: 0.7
  });

  function createOvalTubeGeometry(rx, ry, z, tubeRadius, tubularSegments, radialSegments) {
    const points = [];
    const pointCount = 48;
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * rx,
        Math.sin(angle) * ry,
        z
      ));
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(
      curve,
      tubularSegments,
      tubeRadius,
      radialSegments,
      true
    );
  }

  const ring_shankGeom = new THREE.TorusGeometry(0.42, 0.055, 16, 64);
  const ring_shankMat = silverMat;
  const ring_shank = new THREE.Mesh(ring_shankGeom, ring_shankMat);
  ring_shank.name = "ring_shank";
  ring_shank.rotation.x = Math.PI / 2;
  ring_shank.position.set(0, -0.08, -0.43);
  root.add(ring_shank);

  const right_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.48, -0.08, -0.055),
    new THREE.Vector3(0.45, -0.08, -0.11),
    new THREE.Vector3(0.39, -0.08, -0.18),
    new THREE.Vector3(0.32, -0.08, -0.245)
  ], false, "centripetal");
  const right_shoulderGeom = new THREE.TubeGeometry(
    right_shoulderPath,
    16,
    0.058,
    12,
    false
  );
  const right_shoulderMat = silverMat;
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, right_shoulderMat);
  right_shoulder.name = "right_shoulder";
  root.add(right_shoulder);

  const left_shoulderGeom = right_shoulderGeom;
  const left_shoulderMat = silverMat;
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, left_shoulderMat);
  left_shoulder.name = "left_shoulder";
  left_shoulder.scale.x = -1;
  root.add(left_shoulder);

  const bezel_backplateGeom = new THREE.CylinderGeometry(1, 1, 0.14, 64);
  const bezel_backplateMat = silverMat;
  const bezel_backplate = new THREE.Mesh(bezel_backplateGeom, bezel_backplateMat);
  bezel_backplate.name = "bezel_backplate";
  bezel_backplate.rotation.x = Math.PI / 2;
  bezel_backplate.scale.set(0.535, 1, 0.695);
  bezel_backplate.position.z = -0.015;
  setting_group.add(bezel_backplate);

  const outer_bezelGeom = createOvalTubeGeometry(
    0.485,
    0.645,
    0.065,
    0.055,
    96,
    16
  );
  const outer_bezelMat = silverMat;
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, outer_bezelMat);
  outer_bezel.name = "outer_bezel";
  setting_group.add(outer_bezel);

  const inner_bezelGeom = createOvalTubeGeometry(
    0.405,
    0.555,
    0.105,
    0.018,
    80,
    12
  );
  const inner_bezelMat = silverMat;
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, inner_bezelMat);
  inner_bezel.name = "inner_bezel";
  setting_group.add(inner_bezel);

  const gemstone_girdleGeom = createOvalTubeGeometry(
    0.385,
    0.535,
    0.082,
    0.019,
    80,
    12
  );
  const gemstone_girdle = new THREE.Mesh(
    gemstone_girdleGeom,
    gemstone_girdleMat
  );
  gemstone_girdle.name = "gemstone_girdle";
  setting_group.add(gemstone_girdle);

  function createGemstoneGeometry() {
    const segmentCount = 16;
    const rx = 0.385;
    const ry = 0.535;
    const rings = [
      { scale: 1.00, z: 0.075 },
      { scale: 0.97, z: 0.108 },
      { scale: 0.76, z: 0.148 },
      { scale: 0.42, z: 0.174 }
    ];
    const positions = [];
    const groups = [];

    function pointAt(ring, index) {
      const angle = index / segmentCount * Math.PI * 2;
      return new THREE.Vector3(
        Math.cos(angle) * rx * ring.scale,
        Math.sin(angle) * ry * ring.scale,
        ring.z
      );
    }

    function addTriangle(a, b, c, materialIndex) {
      const start = positions.length / 3;
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      groups.push({ start: start, count: 3, materialIndex: materialIndex });
    }

    for (let band = 0; band < rings.length - 1; band++) {
      for (let i = 0; i < segmentCount; i++) {
        const next = (i + 1) % segmentCount;
        const a = pointAt(rings[band], i);
        const b = pointAt(rings[band], next);
        const c = pointAt(rings[band + 1], next);
        const d = pointAt(rings[band + 1], i);
        const firstMaterial = (i + band * 2) % gemstoneMat.length;
        const secondMaterial = (i * 3 + band + 1) % gemstoneMat.length;

        if ((i + band) % 2 === 0) {
          addTriangle(a, b, d, firstMaterial);
          addTriangle(b, c, d, secondMaterial);
        } else {
          addTriangle(a, b, c, firstMaterial);
          addTriangle(a, c, d, secondMaterial);
        }
      }
    }

    const tableCenter = new THREE.Vector3(0, 0, 0.176);
    for (let i = 0; i < segmentCount; i++) {
      const next = (i + 1) % segmentCount;
      addTriangle(
        tableCenter,
        pointAt(rings[rings.length - 1], i),
        pointAt(rings[rings.length - 1], next),
        (i * 5 + 2) % gemstoneMat.length
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    for (const group of groups) {
      geometry.addGroup(group.start, group.count, group.materialIndex);
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const gemstoneGeom = createGemstoneGeometry();
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  setting_group.add(gemstone);

  const facetBoundary = [
    new THREE.Vector3(-0.14, 0.445, 0.151),
    new THREE.Vector3(0.14, 0.445, 0.151),
    new THREE.Vector3(0.30, 0.24, 0.151),
    new THREE.Vector3(0.30, -0.24, 0.151),
    new THREE.Vector3(0.14, -0.445, 0.151),
    new THREE.Vector3(-0.14, -0.445, 0.151),
    new THREE.Vector3(-0.30, -0.24, 0.151),
    new THREE.Vector3(-0.30, 0.24, 0.151)
  ];

  const facetCenter = new THREE.Vector3(0, 0, 0.181);
  const facetPositions = [];
  const facetGroups = [];
  const facetMaterials = [1, 3, 2, 4, 5, 3, 1, 4];

  function addFacetTriangle(a, b, c, materialIndex) {
    const start = facetPositions.length / 3;
    facetPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    facetGroups.push({ start: start, count: 3, materialIndex: materialIndex });
  }

  for (let i = 0; i < facetBoundary.length; i++) {
    addFacetTriangle(
      facetCenter,
      facetBoundary[i],
      facetBoundary[(i + 1) % facetBoundary.length],
      facetMaterials[i]
    );
  }

  const gemstone_facetsGeom = new THREE.BufferGeometry();
  gemstone_facetsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facetPositions, 3)
  );
  for (const group of facetGroups) {
    gemstone_facetsGeom.addGroup(
      group.start,
      group.count,
      group.materialIndex
    );
  }
  gemstone_facetsGeom.computeVertexNormals();
  gemstone_facetsGeom.computeBoundingBox();
  gemstone_facetsGeom.computeBoundingSphere();

  const gemstone_facets = new THREE.Mesh(
    gemstone_facetsGeom,
    gemstone_facetsMat
  );
  gemstone_facets.name = "gemstone_facets";
  setting_group.add(gemstone_facets);

  const inclusionData = [
    [-0.25, 0.25, 0.006],
    [-0.19, 0.34, 0.004],
    [-0.09, 0.39, 0.005],
    [0.08, 0.38, 0.004],
    [0.22, 0.28, 0.006],
    [0.27, 0.12, 0.004],
    [0.25, -0.08, 0.005],
    [0.20, -0.27, 0.007],
    [0.08, -0.39, 0.004],
    [-0.08, -0.40, 0.005],
    [-0.22, -0.29, 0.004],
    [-0.28, -0.10, 0.006],
    [-0.24, 0.05, 0.003],
    [0.15, 0.19, 0.004],
    [0.18, -0.16, 0.003],
    [-0.12, -0.20, 0.005],
    [0.03, 0.30, 0.003],
    [0.02, -0.28, 0.004]
  ];

  const gemstone_inclusionsGeom = new THREE.SphereGeometry(1, 8, 6);
  const gemstone_inclusions = new THREE.InstancedMesh(
    gemstone_inclusionsGeom,
    gemstone_inclusionsMat,
    inclusionData.length
  );
  gemstone_inclusions.name = "gemstone_inclusions";

  const inclusionMatrix = new THREE.Matrix4();
  const inclusionQuaternion = new THREE.Quaternion();
  const inclusionPosition = new THREE.Vector3();
  const inclusionScale = new THREE.Vector3();

  for (let i = 0; i < inclusionData.length; i++) {
    const inclusion = inclusionData[i];
    inclusionPosition.set(inclusion[0], inclusion[1], 0.184);
    inclusionScale.set(inclusion[2], inclusion[2], inclusion[2] * 0.45);
    inclusionMatrix.compose(
      inclusionPosition,
      inclusionQuaternion,
      inclusionScale
    );
    gemstone_inclusions.setMatrixAt(i, inclusionMatrix);
  }
  gemstone_inclusions.instanceMatrix.needsUpdate = true;
  setting_group.add(gemstone_inclusions);

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