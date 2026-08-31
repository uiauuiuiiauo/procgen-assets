export default function generate(THREE) {
  const root = new THREE.Group();

  const hullLength = 5.16;
  const hullHalfLength = hullLength / 2;
  const beam = 1.10;
  const hullHalfBeam = beam / 2;
  const strakeCount = 8;
  const shellThickness = 0.045;
  const endScale = 0.88;

  const strakeMats = [
    new THREE.MeshStandardMaterial({
      color: 0x8f5c34,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xb97c42,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xd4a066,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xc58c50,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xe0b477,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xb67a43,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xd19a5b,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
    new THREE.MeshStandardMaterial({
      color: 0xc18a50,
      metalness: 0.0,
      roughness: 0.6,
      side: THREE.DoubleSide,
    }),
  ];

  const trimMat = new THREE.MeshStandardMaterial({
    color: 0xe2b779,
    metalness: 0.0,
    roughness: 0.6,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0xb98249,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x754522,
    metalness: 0.0,
    roughness: 0.6,
  });
  const endMat = new THREE.MeshStandardMaterial({
    color: 0xb97c42,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  function hullPoint(u, v, side, inner) {
    const endFactor = Math.pow(Math.abs(u), 1.65);
    const halfBeamAtU = hullHalfBeam * (1 - endFactor * endScale);
    const bottomY = 0.02 + 0.72 * Math.pow(Math.abs(u), 3.2);
    const topY = 0.68 + 0.46 * Math.pow(Math.abs(u), 2.2);
    const verticalFactor = Math.pow(v, 0.72);
    const halfWidth = halfBeamAtU * (0.035 + 0.965 * verticalFactor);
    const y = bottomY + (topY - bottomY) * v;
    return new THREE.Vector3(
      u * hullHalfLength,
      y,
      side * (halfWidth - (inner ? shellThickness : 0))
    );
  }

  function createStrakeGeometry(side, strakeIndex) {
    const uSegments = 32;
    const vStart = strakeIndex / strakeCount;
    const vEnd = (strakeIndex + 1) / strakeCount;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= uSegments; i++) {
      const u = -1 + (2 * i) / uSegments;
      const lower = hullPoint(u, vStart, side, false);
      const upper = hullPoint(u, vEnd, side, false);
      positions.push(
        lower.x, lower.y, lower.z,
        upper.x, upper.y, upper.z
      );
    }

    for (let i = 0; i < uSegments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      if (side > 0) {
        indices.push(a, b, c, b, d, c);
      } else {
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const hull_strakes = new THREE.Group();
  hull_strakes.name = "hull_strakes";
  for (const side of [-1, 1]) {
    for (let i = 0; i < strakeCount; i++) {
      const strakeGeom = createStrakeGeometry(side, i);
      const strake = new THREE.Mesh(strakeGeom, strakeMats[i]);
      strake.name =
        (side > 0 ? "starboard_strake_" : "port_strake_") + (i + 1);
      hull_strakes.add(strake);
    }
  }
  root.add(hull_strakes);

  function createBottomGeometry() {
    const uSegments = 32;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= uSegments; i++) {
      const u = -1 + (2 * i) / uSegments;
      const left = hullPoint(u, 0, -1, false);
      const right = hullPoint(u, 0, 1, false);
      positions.push(
        left.x, left.y, left.z,
        right.x, right.y, right.z
      );
    }

    for (let i = 0; i < uSegments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const hull_bottomGeom = createBottomGeometry();
  const hull_bottomMat = strakeMats[0];
  const hull_bottom = new THREE.Mesh(hull_bottomGeom, hull_bottomMat);
  hull_bottom.name = "hull_bottom";
  root.add(hull_bottom);

  function createRailGeometry(side, v, inner, yOffset, xOffset, radius) {
    const points = [];
    const pointCount = 28;
    for (let i = 0; i <= pointCount; i++) {
      const u = -1 + (2 * i) / pointCount;
      const point = hullPoint(u, v, side, inner);
      point.y += yOffset;
      point.z += side * xOffset;
      points.push(point);
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 64, radius, 8, false);
  }

  const gunwaleGeomOuterStarboard = createRailGeometry(
    1, 1, false, 0.025, 0.012, 0.055
  );
  const gunwale_starboard = new THREE.Mesh(gunwaleGeomOuterStarboard, trimMat);
  gunwale_starboard.name = "gunwale_starboard";
  root.add(gunwale_starboard);

  const gunwaleGeomOuterPort = createRailGeometry(
    -1, 1, false, 0.025, 0.012, 0.055
  );
  const gunwale_port = new THREE.Mesh(gunwaleGeomOuterPort, trimMat);
  gunwale_port.name = "gunwale_port";
  root.add(gunwale_port);

  const gunwaleGeomInnerStarboard = createRailGeometry(
    1, 1, true, 0.018, -0.018, 0.035
  );
  const gunwale_inner_starboard = new THREE.Mesh(
    gunwaleGeomInnerStarboard,
    trimMat
  );
  gunwale_inner_starboard.name = "gunwale_inner_starboard";
  root.add(gunwale_inner_starboard);

  const gunwaleGeomInnerPort = createRailGeometry(
    -1, 1, true, 0.018, -0.018, 0.035
  );
  const gunwale_inner_port = new THREE.Mesh(
    gunwaleGeomInnerPort,
    trimMat
  );
  gunwale_inner_port.name = "gunwale_inner_port";
  root.add(gunwale_inner_port);

  const hull_seams = new THREE.Group();
  hull_seams.name = "hull_seams";
  for (const side of [-1, 1]) {
    for (let i = 1; i < strakeCount; i++) {
      const seamGeom = createRailGeometry(side, i / strakeCount, false, 0, 0, 0.008);
      const seam = new THREE.Mesh(seamGeom, darkWoodMat);
      seam.name =
        (side > 0 ? "starboard_seam_" : "port_seam_") + i;
      hull_seams.add(seam);
    }
  }
  root.add(hull_seams);

  const keelPoints = [];
  for (let i = 0; i <= 28; i++) {
    const u = -1 + (2 * i) / 28;
    const point = hullPoint(u, 0, 1, false);
    point.y -= 0.018;
    keelPoints.push(point);
  }
  const keelGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(keelPoints, false, "centripetal"),
    64,
    0.035,
    8,
    false
  );
  const keel = new THREE.Mesh(keelGeom, darkWoodMat);
  keel.name = "keel";
  root.add(keel);

  function createStemGeometry(side) {
    const stemShape = new THREE.Shape();
    stemShape.moveTo(side * 1.88, 0.48);
    stemShape.bezierCurveTo(
      side * 2.08, 0.58,
      side * 2.38, 1.08,
      side * 2.56, 1.30
    );
    stemShape.quadraticCurveTo(
      side * 2.70, 1.39,
      side * 2.62, 1.20
    );
    stemShape.bezierCurveTo(
      side * 2.45, 0.78,
      side * 2.22, 0.30,
      side * 1.98, 0.08
    );
    stemShape.quadraticCurveTo(
      side * 1.92, 0.12,
      side * 1.88, 0.48
    );

    const geometry = new THREE.ExtrudeGeometry(stemShape, {
      depth: 0.30,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.018,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -0.15);
    return geometry;
  }

  const bow_stemGeom = createStemGeometry(1);
  const bow_stem = new THREE.Mesh(bow_stemGeom, endMat);
  bow_stem.name = "bow_stem";
  root.add(bow_stem);

  const stern_stemGeom = createStemGeometry(-1);
  const stern_stem = new THREE.Mesh(stern_stemGeom, endMat);
  stern_stem.name = "stern_stem";
  root.add(stern_stem);

  function createStemTrimGeometry(side) {
    const points = [
      new THREE.Vector3(side * 1.91, 0.53, 0.17),
      new THREE.Vector3(side * 2.08, 0.72, 0.17),
      new THREE.Vector3(side * 2.30, 1.05, 0.17),
      new THREE.Vector3(side * 2.55, 1.30, 0.17),
    ];
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      32,
      0.022,
      8,
      false
    );
  }

  const bow_stem_trimGeom = createStemTrimGeometry(1);
  const bow_stem_trim = new THREE.Mesh(bow_stem_trimGeom, trimMat);
  bow_stem_trim.name = "bow_stem_trim";
  root.add(bow_stem_trim);

  const stern_stem_trimGeom = createStemTrimGeometry(-1);
  const stern_stem_trim = new THREE.Mesh(stern_stem_trimGeom, trimMat);
  stern_stem_trim.name = "stern_stem_trim";
  root.add(stern_stem_trim);

  const floorboardGeom = new THREE.BoxGeometry(3.72, 0.055, 0.50);
  const floorboard = new THREE.Mesh(floorboardGeom, interiorMat);
  floorboard.position.set(0, 0.18, 0);
  floorboard.name = "floorboard";
  root.add(floorboard);

  const inner_ribsGeom = new THREE.BoxGeometry(0.055, 1, 0.07);
  const inner_ribsMat = trimMat;
  const inner_ribs = new THREE.InstancedMesh(
    inner_ribsGeom,
    inner_ribsMat,
    16
  );
  inner_ribs.name = "inner_ribs";
  const ribDummy = new THREE.Object3D();
  const ribUp = new THREE.Vector3(0, 1, 0);
  let ribIndex = 0;

  for (const endSign of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const u = endSign * (0.12 + i * 0.105);
      const bottom = hullPoint(u, 0.12, 1, true);
      const top = hullPoint(u, 0.94, 1, true);
      const midpoint = bottom.clone().add(top).multiplyScalar(0.5);
      const direction = top.clone().sub(bottom);
      const length = direction.length();

      ribDummy.position.copy(midpoint);
      ribDummy.quaternion.setFromUnitVectors(
        ribUp,
        direction.normalize()
      );
      ribDummy.scale.set(1, length, 1);
      ribDummy.updateMatrix();
      inner_ribs.setMatrixAt(ribIndex++, ribDummy.matrix);
    }
  }
  inner_ribs.instanceMatrix.needsUpdate = true;
  root.add(inner_ribs);

  const benchPositions = [-1.18, -0.42, 0.42, 1.18];
  const benchesGeom = new THREE.BoxGeometry(0.22, 0.075, 1);
  const benchesMat = trimMat;
  const benches = new THREE.InstancedMesh(
    benchesGeom,
    benchesMat,
    benchPositions.length
  );
  benches.name = "benches";
  const benchDummy = new THREE.Object3D();

  for (let i = 0; i < benchPositions.length; i++) {
    const x = benchPositions[i];
    const u = x / hullHalfLength;
    const edge = hullPoint(u, 0.94, 1, false);
    const width = Math.max(0.58, 2 * (edge.z - 0.04));

    benchDummy.position.set(x, 0.66, 0);
    benchDummy.quaternion.identity();
    benchDummy.scale.set(1, 1, width);
    benchDummy.updateMatrix();
    benches.setMatrixAt(i, benchDummy.matrix);
  }
  benches.instanceMatrix.needsUpdate = true;
  root.add(benches);

  const bench_supportsGeom = new THREE.BoxGeometry(0.12, 0.42, 0.10);
  const bench_supportsMat = interiorMat;
  const bench_supports = new THREE.InstancedMesh(
    bench_supportsGeom,
    bench_supportsMat,
    benchPositions.length * 2
  );
  bench_supports.name = "bench_supports";
  const supportDummy = new THREE.Object3D();
  let supportIndex = 0;

  for (const x of benchPositions) {
    for (const side of [-1, 1]) {
      supportDummy.position.set(x, 0.42, side * 0.30);
      supportDummy.quaternion.identity();
      supportDummy.scale.set(1, 1, 1);
      supportDummy.updateMatrix();
      bench_supports.setMatrixAt(supportIndex++, supportDummy.matrix);
    }
  }
  bench_supports.instanceMatrix.needsUpdate = true;
  root.add(bench_supports);

  const wood_knotsGeom = new THREE.CircleGeometry(0.022, 12);
  const wood_knotsMat = darkWoodMat;
  const knotLocations = [
    [-0.72, 0.34],
    [-0.43, 0.58],
    [-0.08, 0.27],
    [0.24, 0.48],
    [0.56, 0.67],
    [0.79, 0.39],
  ];
  const wood_knots = new THREE.InstancedMesh(
    wood_knotsGeom,
    wood_knotsMat,
    knotLocations.length * 2
  );
  wood_knots.name = "wood_knots";
  const knotDummy = new THREE.Object3D();
  const knotForward = new THREE.Vector3(0, 0, 1);
  let knotIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < knotLocations.length; i++) {
      const u = knotLocations[i][0];
      const v = knotLocations[i][1];
      const point = hullPoint(u, v, side, false);
      const normal = new THREE.Vector3(0, 0, side);

      knotDummy.position.copy(point).addScaledVector(normal, 0.008);
      knotDummy.quaternion.setFromUnitVectors(knotForward, normal);
      const knotScale = 0.78 + (i % 3) * 0.12;
      knotDummy.scale.set(knotScale, knotScale * 0.65, 1);
      knotDummy.updateMatrix();
      wood_knots.setMatrixAt(knotIndex++, knotDummy.matrix);
    }
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  root.add(wood_knots);

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