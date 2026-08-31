export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "faceted_garnet_crystal";

  const crystal_assembly = new THREE.Group();
  crystal_assembly.name = "crystal_assembly";
  crystal_assembly.rotation.set(0.04, -0.28, -0.18);
  root.add(crystal_assembly);

  function makeCrystalMaterial(color, transmission, roughness) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness,
      transmission,
      ior: 1.7,
      transparent: true,
      opacity: 0.92,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
      side: THREE.DoubleSide
    });
  }

  const crystal_blackMat = makeCrystalMaterial(0x101216, 0.16, 0.12);
  const crystal_smokyMat = makeCrystalMaterial(0x302d32, 0.22, 0.14);
  const crystal_deep_redMat = makeCrystalMaterial(0x4d000d, 0.15, 0.13);
  const crystal_rubyMat = makeCrystalMaterial(0x8f061d, 0.18, 0.11);
  const crystal_crimsonMat = makeCrystalMaterial(0xb7192d, 0.2, 0.1);
  const crystal_wineMat = makeCrystalMaterial(0x5a1424, 0.17, 0.14);
  const crystal_roseMat = makeCrystalMaterial(0x9a4b57, 0.22, 0.12);

  const crystal_bodyMat = [
    crystal_blackMat,
    crystal_smokyMat,
    crystal_deep_redMat,
    crystal_rubyMat,
    crystal_crimsonMat,
    crystal_wineMat,
    crystal_roseMat
  ];

  function createFacetedBodyGeometry(rings) {
    const positions = [];
    const groups = [];

    function addTriangle(a, b, c, materialIndex) {
      const start = positions.length / 3;
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      groups.push([start, 3, materialIndex]);
    }

    const facetPattern = [0, 2, 4, 1, 5, 3, 6];

    for (let r = 0; r < rings.length - 1; r++) {
      const lower = rings[r];
      const upper = rings[r + 1];

      for (let i = 0; i < 6; i++) {
        const j = (i + 1) % 6;
        const a = lower[i];
        const b = lower[j];
        const c = upper[j];
        const d = upper[i];
        const firstMaterial = facetPattern[(i + r * 2) % facetPattern.length];
        const secondMaterial = facetPattern[(i + r * 2 + 2) % facetPattern.length];

        if ((i + r) % 2 === 0) {
          addTriangle(a, b, c, firstMaterial);
          addTriangle(a, c, d, secondMaterial);
        } else {
          addTriangle(a, b, d, firstMaterial);
          addTriangle(b, c, d, secondMaterial);
        }
      }
    }

    const bottom = rings[0];
    const bottomCenter = new THREE.Vector3();
    for (const point of bottom) bottomCenter.add(point);
    bottomCenter.multiplyScalar(1 / bottom.length);

    for (let i = 0; i < 6; i++) {
      addTriangle(
        bottomCenter,
        bottom[(i + 1) % 6],
        bottom[i],
        i % 2 === 0 ? 0 : 2
      );
    }

    const top = rings[rings.length - 1];
    const topCenter = new THREE.Vector3();
    for (const point of top) topCenter.add(point);
    topCenter.multiplyScalar(1 / top.length);

    for (let i = 0; i < 6; i++) {
      addTriangle(
        topCenter,
        top[i],
        top[(i + 1) % 6],
        facetPattern[(i + 3) % facetPattern.length]
      );
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
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const baseRing = [
    new THREE.Vector3(-0.30, 0.00, -0.26),
    new THREE.Vector3(0.27, 0.00, -0.29),
    new THREE.Vector3(0.39, 0.00, 0.02),
    new THREE.Vector3(0.22, 0.00, 0.34),
    new THREE.Vector3(-0.34, 0.00, 0.30),
    new THREE.Vector3(-0.41, 0.00, -0.04)
  ];

  const middleRing = [
    new THREE.Vector3(-0.25, 0.55, -0.23),
    new THREE.Vector3(0.32, 0.55, -0.25),
    new THREE.Vector3(0.42, 0.55, 0.05),
    new THREE.Vector3(0.25, 0.55, 0.37),
    new THREE.Vector3(-0.30, 0.55, 0.35),
    new THREE.Vector3(-0.39, 0.55, -0.01)
  ];

  const crownRing = [
    new THREE.Vector3(-0.08, 1.08, -0.16),
    new THREE.Vector3(0.24, 1.08, -0.18),
    new THREE.Vector3(0.31, 1.08, 0.08),
    new THREE.Vector3(0.15, 1.08, 0.25),
    new THREE.Vector3(-0.15, 1.08, 0.24),
    new THREE.Vector3(-0.25, 1.08, 0.03)
  ];

  const apex = new THREE.Vector3(0.02, 1.34, -0.01);
  const crystalRings = [
    baseRing,
    middleRing,
    crownRing,
    [apex, apex, apex, apex, apex, apex]
  ];

  const crystal_bodyGeom = createFacetedBodyGeometry(crystalRings);
  const crystal_body = new THREE.Mesh(crystal_bodyGeom, crystal_bodyMat);
  crystal_body.name = "crystal_body";
  crystal_body.renderOrder = 1;
  crystal_assembly.add(crystal_body);

  const internal_red_bandMat = new THREE.MeshPhysicalMaterial({
    color: 0x7d0014,
    metalness: 0.0,
    roughness: 0.22,
    transmission: 0.18,
    ior: 1.7,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide
  });

  const internal_red_bandShape = new THREE.Shape();
  internal_red_bandShape.moveTo(-0.30, -0.09);
  internal_red_bandShape.lineTo(-0.12, -0.14);
  internal_red_bandShape.lineTo(0.03, -0.07);
  internal_red_bandShape.lineTo(0.22, -0.11);
  internal_red_bandShape.lineTo(0.31, 0.02);
  internal_red_bandShape.lineTo(0.18, 0.13);
  internal_red_bandShape.lineTo(-0.02, 0.10);
  internal_red_bandShape.lineTo(-0.20, 0.15);
  internal_red_bandShape.lineTo(-0.32, 0.05);
  internal_red_bandShape.closePath();

  const internal_red_bandGeom = new THREE.ExtrudeGeometry(
    internal_red_bandShape,
    {
      depth: 0.022,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.004,
      bevelSegments: 1
    }
  );
  const internal_red_band = new THREE.Mesh(
    internal_red_bandGeom,
    internal_red_bandMat
  );
  internal_red_band.name = "internal_red_band";
  internal_red_band.position.set(0, 0.62, 0.275);
  internal_red_band.rotation.z = -0.06;
  internal_red_band.renderOrder = 0;
  crystal_assembly.add(internal_red_band);

  const internal_dark_inclusionMat = new THREE.MeshPhysicalMaterial({
    color: 0x12070b,
    metalness: 0.0,
    roughness: 0.3,
    transmission: 0.08,
    ior: 1.7,
    transparent: true,
    opacity: 0.76,
    side: THREE.DoubleSide
  });

  const internal_dark_inclusionShape = new THREE.Shape();
  internal_dark_inclusionShape.moveTo(-0.08, -0.18);
  internal_dark_inclusionShape.lineTo(0.06, -0.23);
  internal_dark_inclusionShape.lineTo(0.18, -0.04);
  internal_dark_inclusionShape.lineTo(0.10, 0.20);
  internal_dark_inclusionShape.lineTo(-0.04, 0.13);
  internal_dark_inclusionShape.lineTo(-0.15, 0.02);
  internal_dark_inclusionShape.closePath();

  const internal_dark_inclusionGeom = new THREE.ExtrudeGeometry(
    internal_dark_inclusionShape,
    {
      depth: 0.018,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 1
    }
  );
  const internal_dark_inclusion = new THREE.Mesh(
    internal_dark_inclusionGeom,
    internal_dark_inclusionMat
  );
  internal_dark_inclusion.name = "internal_dark_inclusion";
  internal_dark_inclusion.position.set(0.015, 0.39, 0.29);
  internal_dark_inclusion.rotation.z = 0.12;
  internal_dark_inclusion.renderOrder = 0;
  crystal_assembly.add(internal_dark_inclusion);

  const internal_rose_inclusionMat = new THREE.MeshPhysicalMaterial({
    color: 0xa33c49,
    metalness: 0.0,
    roughness: 0.25,
    transmission: 0.2,
    ior: 1.7,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide
  });

  const internal_rose_inclusionShape = new THREE.Shape();
  internal_rose_inclusionShape.moveTo(-0.18, -0.07);
  internal_rose_inclusionShape.lineTo(0.02, -0.10);
  internal_rose_inclusionShape.lineTo(0.19, 0.01);
  internal_rose_inclusionShape.lineTo(0.08, 0.12);
  internal_rose_inclusionShape.lineTo(-0.12, 0.09);
  internal_rose_inclusionShape.closePath();

  const internal_rose_inclusionGeom = new THREE.ExtrudeGeometry(
    internal_rose_inclusionShape,
    {
      depth: 0.016,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 1
    }
  );
  const internal_rose_inclusion = new THREE.Mesh(
    internal_rose_inclusionGeom,
    internal_rose_inclusionMat
  );
  internal_rose_inclusion.name = "internal_rose_inclusion";
  internal_rose_inclusion.position.set(-0.05, 0.82, 0.205);
  internal_rose_inclusion.rotation.z = -0.14;
  internal_rose_inclusion.renderOrder = 0;
  crystal_assembly.add(internal_rose_inclusion);

  const mineral_veinMat = new THREE.MeshStandardMaterial({
    color: 0xbab5a8,
    metalness: 0.0,
    roughness: 0.9
  });

  const mineral_veinCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.055, 0.70, 0.334),
      new THREE.Vector3(0.025, 0.61, 0.348),
      new THREE.Vector3(0.070, 0.52, 0.356),
      new THREE.Vector3(0.035, 0.42, 0.365),
      new THREE.Vector3(0.080, 0.31, 0.373),
      new THREE.Vector3(0.045, 0.20, 0.380),
      new THREE.Vector3(0.090, 0.08, 0.385)
    ],
    false,
    "centripetal"
  );
  const mineral_veinGeom = new THREE.TubeGeometry(
    mineral_veinCurve,
    32,
    0.0055,
    6,
    false
  );
  const mineral_vein = new THREE.Mesh(mineral_veinGeom, mineral_veinMat);
  mineral_vein.name = "mineral_vein";
  mineral_vein.renderOrder = 3;
  crystal_assembly.add(mineral_vein);

  const lower_mineral_branchCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.055, 0.27, 0.376),
      new THREE.Vector3(-0.015, 0.20, 0.382),
      new THREE.Vector3(-0.090, 0.13, 0.386),
      new THREE.Vector3(-0.165, 0.08, 0.388)
    ],
    false,
    "centripetal"
  );
  const lower_mineral_branchGeom = new THREE.TubeGeometry(
    lower_mineral_branchCurve,
    16,
    0.004,
    6,
    false
  );
  const lower_mineral_branch = new THREE.Mesh(
    lower_mineral_branchGeom,
    mineral_veinMat
  );
  lower_mineral_branch.name = "lower_mineral_branch";
  lower_mineral_branch.renderOrder = 3;
  crystal_assembly.add(lower_mineral_branch);

  const right_mineral_branchCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.075, 0.31, 0.374),
      new THREE.Vector3(0.145, 0.25, 0.379),
      new THREE.Vector3(0.220, 0.18, 0.382),
      new THREE.Vector3(0.285, 0.12, 0.384)
    ],
    false,
    "centripetal"
  );
  const right_mineral_branchGeom = new THREE.TubeGeometry(
    right_mineral_branchCurve,
    16,
    0.0035,
    6,
    false
  );
  const right_mineral_branch = new THREE.Mesh(
    right_mineral_branchGeom,
    mineral_veinMat
  );
  right_mineral_branch.name = "right_mineral_branch";
  right_mineral_branch.renderOrder = 3;
  crystal_assembly.add(right_mineral_branch);

  function interpolateRing(y) {
    let lower;
    let upper;
    let t;

    if (y <= middleRing[0].y) {
      lower = baseRing;
      upper = middleRing;
      t = (y - baseRing[0].y) / (middleRing[0].y - baseRing[0].y);
    } else if (y <= crownRing[0].y) {
      lower = middleRing;
      upper = crownRing;
      t = (y - middleRing[0].y) / (crownRing[0].y - middleRing[0].y);
    } else {
      lower = crownRing;
      upper = crystalRings[3];
      t = (y - crownRing[0].y) / (crystalRings[3][0].y - crownRing[0].y);
    }

    t = Math.max(0, Math.min(1, t));
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(lower[i].clone().lerp(upper[i], t));
    }
    return result;
  }

  function frontSurfaceZ(x, y) {
    const ring = interpolateRing(y);
    const frontLeft = ring[4];
    const frontCenter = ring[3];
    const frontRight = ring[2];

    if (x <= frontCenter.x) {
      const span = frontCenter.x - frontLeft.x || 1;
      const t = (x - frontLeft.x) / span;
      return frontLeft.z + (frontCenter.z - frontLeft.z) * t;
    }

    const span = frontRight.x - frontCenter.x || 1;
    const t = (x - frontCenter.x) / span;
    return frontCenter.z + (frontRight.z - frontCenter.z) * t;
  }

  const mineral_specksGeom = new THREE.SphereGeometry(0.006, 6, 4);
  const mineral_specksMat = new THREE.MeshStandardMaterial({
    color: 0xd2ccc0,
    metalness: 0.0,
    roughness: 0.8
  });
  const speckCount = 28;
  const mineral_specks = new THREE.InstancedMesh(
    mineral_specksGeom,
    mineral_specksMat,
    speckCount
  );
  mineral_specks.name = "mineral_specks";

  const speckTransform = new THREE.Object3D();
  for (let i = 0; i < speckCount; i++) {
    const y = 0.09 + (((i * 37) % 101) / 101) * 0.91;
    const ring = interpolateRing(y);
    const centerX = (ring[2].x + ring[3].x + ring[4].x) / 3;
    const halfWidth = Math.max(0.05, (ring[2].x - ring[4].x) * 0.34);
    const x = centerX + ((((i * 53) % 97) / 96) - 0.5) * halfWidth * 2;
    const z = frontSurfaceZ(x, y) + 0.004;
    const scale = 0.55 + (i % 5) * 0.13;

    speckTransform.position.set(x, y, z);
    speckTransform.scale.setScalar(scale);
    speckTransform.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    speckTransform.updateMatrix();
    mineral_specks.setMatrixAt(i, speckTransform.matrix);
  }
  mineral_specks.instanceMatrix.needsUpdate = true;
  mineral_specks.renderOrder = 4;
  crystal_assembly.add(mineral_specks);

  const surface_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffd5d8,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const surface_highlightShape = new THREE.Shape();
  surface_highlightShape.moveTo(-0.035, -0.14);
  surface_highlightShape.lineTo(0.025, -0.11);
  surface_highlightShape.lineTo(0.045, 0.13);
  surface_highlightShape.lineTo(-0.018, 0.17);
  surface_highlightShape.closePath();

  const surface_highlightGeom = new THREE.ShapeGeometry(
    surface_highlightShape
  );
  const surface_highlight = new THREE.Mesh(
    surface_highlightGeom,
    surface_highlightMat
  );
  surface_highlight.name = "surface_highlight";
  surface_highlight.position.set(-0.12, 0.82, 0.302);
  surface_highlight.rotation.set(-0.22, 0.12, -0.18);
  surface_highlight.renderOrder = 5;
  crystal_assembly.add(surface_highlight);

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