export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_assembly = new THREE.Group();
  root.add(ring_assembly);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x8a8a8a,
    emissiveIntensity: 0.55,
  });

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  const gemstone_reflectorMat = new THREE.MeshStandardMaterial({
    color: 0x006b2d,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const gemstone_girdleMat = new THREE.MeshStandardMaterial({
    color: 0x005522,
    metalness: 0.0,
    roughness: 0.3,
  });

  const facet_highlightsMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.38,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const gemstone_inclusionsMat = new THREE.MeshBasicMaterial({
    color: 0x69ffe0,
  });

  function makeEllipseTube(rx, ry, z, tubeRadius, tubularSegments) {
    const points = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * rx,
        Math.sin(angle) * ry,
        z
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(
      curve,
      tubularSegments,
      tubeRadius,
      12,
      true
    );
  }

  function makeGemstoneGeometry() {
    const positions = [];
    const colors = [];
    const palette = [
      new THREE.Color(0x002514),
      new THREE.Color(0x003b1c),
      new THREE.Color(0x005522),
      new THREE.Color(0x006b2d),
      new THREE.Color(0x008a36),
      new THREE.Color(0x00a842),
      new THREE.Color(0x00c94d),
      new THREE.Color(0x004a24),
    ];

    function addTriangle(a, b, c, colorIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = palette[colorIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const segmentCount = 16;
    const outer = [];
    const middle = [];
    const table = [];
    const back = [];

    for (let i = 0; i < segmentCount; i++) {
      const angle = i / segmentCount * Math.PI * 2;
      const c = Math.cos(angle);
      const s = Math.sin(angle);
      outer.push(new THREE.Vector3(c * 0.49, s * 0.70, 0.025));
      middle.push(new THREE.Vector3(
        c * 0.36,
        s * 0.51,
        0.108 + (i % 4) * 0.007
      ));
      table.push(new THREE.Vector3(c * 0.20, s * 0.285, 0.151));
      back.push(new THREE.Vector3(c * 0.49, s * 0.70, -0.055));
    }

    const tableCenter = new THREE.Vector3(0.012, -0.008, 0.157);
    const pavilionPoint = new THREE.Vector3(0, 0, -0.22);

    for (let i = 0; i < segmentCount; i++) {
      const next = (i + 1) % segmentCount;

      addTriangle(outer[i], outer[next], middle[next], i + 2);
      addTriangle(outer[i], middle[next], middle[i], i * 3 + 1);

      addTriangle(middle[i], middle[next], table[next], i * 5 + 2);
      addTriangle(middle[i], table[next], table[i], i * 7 + 4);

      addTriangle(tableCenter, table[i], table[next], i * 3 + 5);

      addTriangle(outer[i], back[i], back[next], i + 1);
      addTriangle(outer[i], back[next], outer[next], i + 3);

      addTriangle(back[i], pavilionPoint, back[next], i * 2 + 1);
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

  function makeFacetHighlightGeometry() {
    const positions = [];
    const colors = [];
    const tones = [
      new THREE.Color(0xeafff4),
      new THREE.Color(0x8effb5),
      new THREE.Color(0x31c968),
      new THREE.Color(0xc5ffe0),
      new THREE.Color(0x168f45),
      new THREE.Color(0xf2ffff),
    ];

    function addTriangle(a, b, c, toneIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const tone = tones[toneIndex % tones.length];
      for (let i = 0; i < 3; i++) {
        colors.push(tone.r, tone.g, tone.b);
      }
    }

    const facetTriangles = [
      [
        new THREE.Vector3(-0.45, 0.31, 0.070),
        new THREE.Vector3(-0.13, 0.55, 0.130),
        new THREE.Vector3(-0.18, 0.13, 0.161),
      ],
      [
        new THREE.Vector3(0.08, 0.56, 0.132),
        new THREE.Vector3(0.43, 0.29, 0.073),
        new THREE.Vector3(0.18, 0.11, 0.162),
      ],
      [
        new THREE.Vector3(-0.47, 0.08, 0.069),
        new THREE.Vector3(-0.27, -0.30, 0.094),
        new THREE.Vector3(-0.03, -0.01, 0.166),
      ],
      [
        new THREE.Vector3(0.47, 0.06, 0.069),
        new THREE.Vector3(0.26, -0.31, 0.094),
        new THREE.Vector3(0.02, -0.01, 0.166),
      ],
      [
        new THREE.Vector3(-0.35, -0.43, 0.080),
        new THREE.Vector3(-0.04, -0.58, 0.119),
        new THREE.Vector3(-0.02, -0.03, 0.166),
      ],
      [
        new THREE.Vector3(0.34, -0.44, 0.080),
        new THREE.Vector3(0.04, -0.58, 0.119),
        new THREE.Vector3(0.02, -0.03, 0.166),
      ],
      [
        new THREE.Vector3(-0.20, 0.20, 0.160),
        new THREE.Vector3(0.02, 0.54, 0.132),
        new THREE.Vector3(0.17, 0.18, 0.160),
      ],
      [
        new THREE.Vector3(-0.33, -0.13, 0.126),
        new THREE.Vector3(-0.12, -0.49, 0.101),
        new THREE.Vector3(0.01, -0.08, 0.165),
      ],
    ];

    for (let i = 0; i < facetTriangles.length; i++) {
      const triangle = facetTriangles[i];
      addTriangle(
        triangle[0],
        triangle[1],
        triangle[2],
        i * 2 + 1
      );
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

  const ring_bandGeom = new THREE.TorusGeometry(0.56, 0.055, 16, 72);
  const ring_band = new THREE.Mesh(ring_bandGeom, silverMat);
  ring_band.rotation.x = Math.PI / 2;
  ring_band.position.set(0, -0.01, -0.56);
  ring_assembly.add(ring_band);

  const left_shoulderGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.40, -0.01, -0.025),
      new THREE.Vector3(-0.35, -0.005, -0.12),
      new THREE.Vector3(-0.25, -0.005, -0.24),
      new THREE.Vector3(-0.12, -0.005, -0.31),
    ], false, "centripetal"),
    20,
    0.06,
    12,
    false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  ring_assembly.add(left_shoulder);

  const right_shoulderGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.40, -0.01, -0.025),
      new THREE.Vector3(0.35, -0.005, -0.12),
      new THREE.Vector3(0.25, -0.005, -0.24),
      new THREE.Vector3(0.12, -0.005, -0.31),
    ], false, "centripetal"),
    20,
    0.06,
    12,
    false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, silverMat);
  ring_assembly.add(right_shoulder);

  const setting_backplateGeom = new THREE.CylinderGeometry(1, 1, 0.10, 64);
  const setting_backplate = new THREE.Mesh(setting_backplateGeom, silverMat);
  setting_backplate.rotation.x = Math.PI / 2;
  setting_backplate.scale.set(0.60, 1.0, 0.84);
  setting_backplate.position.z = -0.035;
  ring_assembly.add(setting_backplate);

  const bezel_frameGeom = makeEllipseTube(0.55, 0.79, 0.018, 0.065, 96);
  const bezel_frame = new THREE.Mesh(bezel_frameGeom, silverMat);
  ring_assembly.add(bezel_frame);

  const outer_bezel_ridgeGeom = makeEllipseTube(
    0.588,
    0.828,
    0.058,
    0.018,
    96
  );
  const outer_bezel_ridge = new THREE.Mesh(
    outer_bezel_ridgeGeom,
    silverMat
  );
  ring_assembly.add(outer_bezel_ridge);

  const inner_bezel_ridgeGeom = makeEllipseTube(
    0.505,
    0.735,
    0.076,
    0.014,
    96
  );
  const inner_bezel_ridge = new THREE.Mesh(
    inner_bezel_ridgeGeom,
    silverMat
  );
  ring_assembly.add(inner_bezel_ridge);

  const gemstone_reflectorGeom = new THREE.CircleGeometry(1, 64);
  const gemstone_reflector = new THREE.Mesh(
    gemstone_reflectorGeom,
    gemstone_reflectorMat
  );
  gemstone_reflector.scale.set(0.475, 0.675, 1);
  gemstone_reflector.position.z = 0.018;
  ring_assembly.add(gemstone_reflector);

  const gemstoneGeom = makeGemstoneGeometry();
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.renderOrder = 1;
  ring_assembly.add(gemstone);

  const gemstone_girdleGeom = makeEllipseTube(
    0.486,
    0.692,
    0.057,
    0.008,
    80
  );
  const gemstone_girdle = new THREE.Mesh(
    gemstone_girdleGeom,
    gemstone_girdleMat
  );
  ring_assembly.add(gemstone_girdle);

  const facet_highlightsGeom = makeFacetHighlightGeometry();
  const facet_highlights = new THREE.Mesh(
    facet_highlightsGeom,
    facet_highlightsMat
  );
  facet_highlights.renderOrder = 2;
  ring_assembly.add(facet_highlights);

  const gemstone_inclusionsGeom = new THREE.SphereGeometry(0.006, 8, 6);
  const inclusionPositions = [
    [-0.28, 0.25, 0.125],
    [-0.19, -0.29, 0.132],
    [0.27, 0.18, 0.126],
    [0.18, -0.34, 0.128],
    [-0.08, 0.39, 0.132],
    [0.31, -0.08, 0.124],
    [-0.32, -0.04, 0.121],
    [0.09, 0.31, 0.139],
    [0.22, 0.03, 0.146],
    [-0.12, -0.12, 0.151],
  ];
  const gemstone_inclusions = new THREE.InstancedMesh(
    gemstone_inclusionsGeom,
    gemstone_inclusionsMat,
    inclusionPositions.length
  );
  const inclusionDummy = new THREE.Object3D();
  for (let i = 0; i < inclusionPositions.length; i++) {
    const p = inclusionPositions[i];
    inclusionDummy.position.set(p[0], p[1], p[2]);
    inclusionDummy.scale.setScalar(0.7 + (i % 3) * 0.18);
    inclusionDummy.updateMatrix();
    gemstone_inclusions.setMatrixAt(i, inclusionDummy.matrix);
  }
  gemstone_inclusions.instanceMatrix.needsUpdate = true;
  gemstone_inclusions.renderOrder = 3;
  ring_assembly.add(gemstone_inclusions);

  ring_assembly.rotation.set(-0.08, -0.18, -0.06);

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