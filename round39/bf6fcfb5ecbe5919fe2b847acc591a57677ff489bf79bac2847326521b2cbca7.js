export default function generate(THREE) {
  const root = new THREE.Group();
  const petal_group = new THREE.Group();
  root.add(petal_group);

  const xMin = -1.05;
  const xMax = 1.20;
  const widthNodes = 40;
  const heightNodes = 24;

  function clamp(value, low, high) {
    return Math.max(low, Math.min(high, value));
  }

  function halfWidthAt(s) {
    const arch = Math.pow(Math.max(0, Math.sin(Math.PI * s)), 0.58);
    const upperWidth = 0.035 + 0.70 * arch * (0.88 + 0.18 * s);
    const lowerWidth = 0.028 + 0.55 * arch * (0.94 + 0.06 * s);
    return upperWidth * (1 - s) + lowerWidth * s + 0.012 * s;
  }

  function surfacePoint(s, v) {
    const clampedS = clamp(s, 0, 1);
    const clampedV = clamp(v, -1, 1);
    const absV = Math.abs(clampedV);
    const signV = clampedV < 0 ? -1 : 1;
    const arch = Math.pow(Math.max(0, Math.sin(Math.PI * clampedS)), 0.62);
    const halfWidth = halfWidthAt(clampedS);
    const centerBias = 0.92 + 0.10 * clampedS;
    const side = clampedV < 0 ? 1 - clampedS : clampedS;
    const sideLength = side < 0.5 ? 0.72 : 0.84;
    const sidePosition = clamp(side / sideLength, 0, 1);
    const sideTaper = Math.pow(
      Math.max(0, Math.cos(sidePosition * Math.PI * 0.5)),
      0.55
    );
    const edgeFactor = Math.pow(absV, 1.8);
    const upperEdge =
      0.10 +
      0.76 * arch +
      0.06 * clampedS +
      0.018 * Math.sin(clampedS * Math.PI * 3);
    const lowerEdge =
      -0.12 -
      0.56 * arch +
      0.04 * clampedS -
      0.014 * Math.sin(clampedS * Math.PI * 2.5);
    const edgeY =
      lowerEdge * (1 - clampedS) +
      upperEdge * clampedS;
    const x =
      xMin +
      (xMax - xMin) * clampedS +
      0.018 * Math.sin(clampedV * Math.PI) * arch;
    const y =
      edgeY +
      clampedV * halfWidth * centerBias * sideTaper;
    const z =
      0.19 * (1 - Math.pow(absV, 1.65)) * arch +
      0.032 * Math.sin(Math.PI * clampedS) -
      0.030 * Math.pow(absV, 6) * arch +
      0.014 *
        Math.sin(
          clampedV * Math.PI * 4.5 + clampedS * Math.PI * 1.3
        ) *
        arch *
        (1 - absV);

    return new THREE.Vector3(x, y, z);
  }

  function surfaceNormal(s, v) {
    const epsilon = 0.002;
    const s0 = clamp(s - epsilon, 0, 1);
    const s1 = clamp(s + epsilon, 0, 1);
    const v0 = clamp(v - epsilon, -1, 1);
    const v1 = clamp(v + epsilon, -1, 1);
    const tangentS = surfacePoint(s1, v).sub(surfacePoint(s0, v));
    const tangentV = surfacePoint(s, v1).sub(surfacePoint(s, v0));
    const normal = new THREE.Vector3().crossVectors(tangentV, tangentS);
    if (normal.lengthSq() < 0.000001) {
      normal.set(0, 0, 1);
    } else {
      normal.normalize();
    }
    if (normal.z < 0) normal.multiplyScalar(-1);
    return normal;
  }

  const petal_vertices = [];
  const petal_colors = [];
  const petal_indices = [];
  const rowSize = heightNodes + 1;

  for (let i = 0; i <= widthNodes; i++) {
    const s = i / widthNodes;
    for (let j = 0; j <= heightNodes; j++) {
      const v = -1 + (2 * j) / heightNodes;
      const point = surfacePoint(s, v);
      petal_vertices.push(point.x, point.y, point.z);

      let topness = clamp((v + 0.12) / 1.12, 0, 1);
      topness = topness * topness * (3 - 2 * topness);
      let grain =
        0.022 * Math.sin(i * 0.73 + j * 1.17) +
        0.011 * Math.sin(i * 0.19 - j * 0.81);

      const veinPulse = Math.pow(
        Math.max(
          0,
          Math.cos((v * 7.4 + 0.28 * Math.sin(s * Math.PI * 5)) * Math.PI)
        ),
        14
      );
      grain -= 0.045 * veinPulse * Math.sin(Math.PI * s);

      const topR = 0.995;
      const topG = 0.435;
      const topB = 0.012;
      const baseR = 0.985;
      const baseG = 0.735;
      const baseB = 0.105;

      let r = baseR + (topR - baseR) * topness;
      let g = baseG + (topG - baseG) * topness;
      let b = baseB + (topB - baseB) * topness;
      r = clamp(r * (1 + grain), 0, 1);
      g = clamp(g * (1 + grain), 0, 1);
      b = clamp(b * (1 + grain * 0.6), 0, 1);
      petal_colors.push(r, g, b);
    }
  }

  for (let i = 0; i < widthNodes; i++) {
    for (let j = 0; j < heightNodes; j++) {
      const a = i * rowSize + j;
      const b = (i + 1) * rowSize + j;
      const c = (i + 1) * rowSize + j + 1;
      const d = i * rowSize + j + 1;
      petal_indices.push(a, b, d, b, c, d);
    }
  }

  const petal_surfaceGeom = new THREE.BufferGeometry();
  petal_surfaceGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(petal_vertices, 3)
  );
  petal_surfaceGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(petal_colors, 3)
  );
  petal_surfaceGeom.setIndex(petal_indices);
  petal_surfaceGeom.computeVertexNormals();

  const petal_surfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xffefc5,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.62,
    transmission: 0.12,
    ior: 1.4,
    transparent: true,
    opacity: 1.0,
    thickness: 0.02,
    emissive: 0x8a3f05,
    emissiveIntensity: 0.28,
    side: THREE.DoubleSide
  });
  const petal_surface = new THREE.Mesh(petal_surfaceGeom, petal_surfaceMat);
  petal_group.add(petal_surface);

  const petal_edge_points = [];
  const edgeSteps = 24;

  for (let i = 0; i <= edgeSteps; i++) {
    petal_edge_points.push(surfacePoint(i / edgeSteps, 1));
  }
  for (let j = 1; j <= edgeSteps; j++) {
    petal_edge_points.push(surfacePoint(1, 1 - (2 * j) / edgeSteps));
  }
  for (let i = edgeSteps - 1; i >= 0; i--) {
    petal_edge_points.push(surfacePoint(i / edgeSteps, -1));
  }
  for (let j = 1; j < edgeSteps; j++) {
    petal_edge_points.push(surfacePoint(0, -1 + (2 * j) / edgeSteps));
  }

  const petal_edge_curve = new THREE.CatmullRomCurve3(
    petal_edge_points,
    true,
    "centripetal"
  );
  const petal_edgeGeom = new THREE.TubeGeometry(
    petal_edge_curve,
    128,
    0.004,
    6,
    true
  );
  const petal_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xc9680b,
    metalness: 0.0,
    roughness: 0.72
  });
  const petal_edge = new THREE.Mesh(petal_edgeGeom, petal_edgeMat);
  petal_group.add(petal_edge);

  const primary_veins = new THREE.Group();
  petal_group.add(primary_veins);

  const primary_veinsMat = new THREE.MeshStandardMaterial({
    color: 0xc47a0c,
    metalness: 0.0,
    roughness: 0.72,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const veinCount = 19;
  for (let i = 0; i < veinCount; i++) {
    const targetV = -0.88 + (1.76 * i) / (veinCount - 1);
    const endS = 0.91 + 0.065 * (1 - Math.abs(targetV));
    const vein_points = [];

    for (let k = 0; k <= 12; k++) {
      const t = k / 12;
      const s = 0.018 + (endS - 0.018) * t;
      const curvedV =
        targetV * Math.pow(t, 0.82) +
        0.018 * Math.sin(t * Math.PI) * Math.sin(i * 1.37);
      const point = surfacePoint(s, curvedV);
      const normal = surfaceNormal(s, curvedV);
      point.addScaledVector(normal, -0.004);
      vein_points.push(point);
    }

    const primary_vein_curve = new THREE.CatmullRomCurve3(
      vein_points,
      false,
      "centripetal"
    );
    const primary_veinGeom = new THREE.TubeGeometry(
      primary_vein_curve,
      32,
      0.0042,
      6,
      false
    );
    const primary_vein = new THREE.Mesh(
      primary_veinGeom,
      primary_veinsMat
    );
    primary_veins.add(primary_vein);
  }

  function appendSegment(target, pointA, pointB) {
    target.push(pointA.x, pointA.y, pointA.z);
    target.push(pointB.x, pointB.y, pointB.z);
  }

  const secondary_vein_positions = [];
  const branchCount = 180;

  for (let i = 0; i < branchCount; i++) {
    const lane = i % 30;
    const layer = Math.floor(i / 30);
    const startS = 0.10 + layer * 0.14 + (lane % 4) * 0.006;
    const endS = Math.min(
      0.965,
      startS + 0.125 + (lane % 5) * 0.009
    );
    const direction = lane % 2 === 0 ? 1 : -1;
    const startV =
      direction *
      (0.22 +
        layer * 0.10 +
        Math.floor(lane / 4) * 0.055);
    const endV = clamp(
      startV +
        direction *
          (0.18 +
            (lane % 5) * 0.035 +
            layer * 0.012),
      -0.94,
      0.94
    );

    let previous = null;
    for (let k = 0; k <= 4; k++) {
      const t = k / 4;
      const s = startS + (endS - startS) * t;
      const bentV =
        startV +
        (endV - startV) * t +
        direction *
          0.022 *
          Math.sin(t * Math.PI) *
          (1 + (lane % 3) * 0.25);
      const point = surfacePoint(s, bentV);
      const normal = surfaceNormal(s, bentV);
      point.addScaledVector(normal, -0.0048);
      if (previous) appendSegment(secondary_vein_positions, previous, point);
      previous = point;
    }
  }

  const secondary_veinsGeom = new THREE.BufferGeometry();
  secondary_veinsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(secondary_vein_positions, 3)
  );
  const secondary_veinsMat = new THREE.LineBasicMaterial({
    color: 0xc47a0c,
    transparent: true,
    opacity: 0.34
  });
  const secondary_veins = new THREE.LineSegments(
    secondary_veinsGeom,
    secondary_veinsMat
  );
  petal_group.add(secondary_veins);

  const edge_ridge_positions = [];
  const ridgeCount = 38;

  for (let i = 0; i < ridgeCount; i++) {
    const baseS = 0.055 + (0.90 * i) / (ridgeCount - 1);
    for (const side of [-1, 1]) {
      let previous = null;
      for (let k = 0; k <= 4; k++) {
        const t = k / 4;
        const inward = 0.115 * t;
        const s =
          clamp(baseS + 0.018 * t, 0, 1) +
          0.005 * Math.sin(t * Math.PI);
        const v = clamp(side * (1 - inward), -1, 1);
        const point = surfacePoint(s, v);
        const normal = surfaceNormal(s, v);
        point.addScaledVector(normal, -0.003);
        if (previous) appendSegment(edge_ridge_positions, previous, point);
        previous = point;
      }
    }
  }

  const edge_ridgesGeom = new THREE.BufferGeometry();
  edge_ridgesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(edge_ridge_positions, 3)
  );
  const edge_ridgesMat = new THREE.LineBasicMaterial({
    color: 0xc47a0c,
    transparent: true,
    opacity: 0.28
  });
  const edge_ridges = new THREE.LineSegments(
    edge_ridgesGeom,
    edge_ridgesMat
  );
  petal_group.add(edge_ridges);

  const petal_baseGeom = new THREE.SphereGeometry(0.06, 20, 12);
  const petal_baseMat = new THREE.MeshStandardMaterial({
    color: 0xf0bd4c,
    metalness: 0.0,
    roughness: 0.7
  });
  const petal_base = new THREE.Mesh(petal_baseGeom, petal_baseMat);
  const basePoint = surfacePoint(0.012, 0);
  const baseNormal = surfaceNormal(0.012, 0);
  petal_base.position.copy(basePoint).addScaledVector(baseNormal, -0.012);
  petal_base.scale.set(0.9, 0.55, 0.32);
  petal_group.add(petal_base);

  petal_group.rotation.set(-0.12, -0.16, -0.10);

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