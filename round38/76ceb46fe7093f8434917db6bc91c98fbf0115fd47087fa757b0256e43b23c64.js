export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_table";

  const tableW = 2.30;
  const tableD = 1.32;
  const tabletopH = 0.16;
  const tabletopY = 1.28;
  const tabletopBevelSize = 0.055;
  const tabletopBevelThickness = 0.035;
  const tabletopCoreDepth = tabletopH - tabletopBevelThickness * 2;
  const tabletopShapeWidth = tableW - tabletopBevelSize * 2;
  const tabletopShapeDepth = tableD - tabletopBevelSize * 2;
  const tabletopCornerRadius = 0.14;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd9c19b,
    metalness: 0.0,
    roughness: 0.6,
  });

  const grainMat = new THREE.LineBasicMaterial({
    color: 0xa77d50,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });

  function roundedRectangleShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const back = -depth / 2;
    const front = depth / 2;

    shape.moveTo(left + radius, back);
    shape.lineTo(right - radius, back);
    shape.quadraticCurveTo(right, back, right, back + radius);
    shape.lineTo(right, front - radius);
    shape.quadraticCurveTo(right, front, right - radius, front);
    shape.lineTo(left + radius, front);
    shape.quadraticCurveTo(left, front, left, front - radius);
    shape.lineTo(left, back + radius);
    shape.quadraticCurveTo(left, back, left + radius, back);
    shape.closePath();
    return shape;
  }

  function createLineSegments(positions, material, name) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    const lines = new THREE.LineSegments(geometry, material);
    lines.name = name;
    return lines;
  }

  function appendPolyline(points, positions) {
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }

  const tabletop_group = new THREE.Group();
  tabletop_group.name = "tabletop_group";
  tabletop_group.position.y = tabletopY;
  root.add(tabletop_group);

  const tabletopShape = roundedRectangleShape(
    tabletopShapeWidth,
    tabletopShapeDepth,
    tabletopCornerRadius
  );
  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: tabletopCoreDepth,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: tabletopBevelThickness,
    bevelSize: tabletopBevelSize,
    bevelSegments: 5,
  });
  tabletopGeom.translate(0, 0, -tabletopCoreDepth / 2);

  const tabletop = new THREE.Mesh(tabletopGeom, woodMat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = -Math.PI / 2;
  tabletop_group.add(tabletop);

  const tabletopTop = tabletopH / 2;
  const tabletopGrainPositions = [];
  const grainRows = 27;
  const grainSegments = 46;
  const grainXMin = -tabletopShapeWidth / 2 + 0.055;
  const grainXMax = tabletopShapeWidth / 2 - 0.055;
  const grainZMin = -tabletopShapeDepth / 2 + 0.065;
  const grainZMax = tabletopShapeDepth / 2 - 0.065;

  for (let row = 0; row < grainRows; row++) {
    const rowT = row / (grainRows - 1);
    const points = [];
    for (let segment = 0; segment <= grainSegments; segment++) {
      const xT = segment / grainSegments;
      const x = grainXMin + (grainXMax - grainXMin) * xT;
      const zBase = grainZMin + (grainZMax - grainZMin) * rowT;
      const wave =
        0.007 * Math.sin(x * 2.8 + row * 0.41) +
        0.003 * Math.sin(x * 7.1 - row * 0.19);
      const bow =
        0.005 *
        Math.sin((x + tabletopShapeWidth / 2) * Math.PI * 1.35 + row * 0.27);
      points.push(new THREE.Vector3(x, tabletopTop + 0.003, zBase + wave + bow));
    }
    appendPolyline(points, tabletopGrainPositions);
  }

  const knotData = [
    [-0.72, -0.29, 0.13, 0.042],
    [0.30, 0.18, 0.10, 0.034],
    [0.77, -0.05, 0.085, 0.030],
  ];

  for (let knotIndex = 0; knotIndex < knotData.length; knotIndex++) {
    const knot = knotData[knotIndex];
    for (let ring = 1; ring <= 3; ring++) {
      const ringPoints = [];
      const ringSegments = 28;
      for (let segment = 0; segment <= ringSegments; segment++) {
        const angle = (segment / ringSegments) * Math.PI * 2;
        const radiusX = knot[2] * ring * 1.45;
        const radiusZ = knot[3] * ring;
        const distortion = 1 + 0.08 * Math.sin(angle * 3 + knotIndex);
        ringPoints.push(
          new THREE.Vector3(
            knot[0] + Math.cos(angle) * radiusX * distortion,
            tabletopTop + 0.0035,
            knot[1] + Math.sin(angle) * radiusZ
          )
        );
      }
      appendPolyline(ringPoints, tabletopGrainPositions);
    }
  }

  const tabletop_grain = createLineSegments(
    tabletopGrainPositions,
    grainMat,
    "tabletop_grain"
  );
  tabletop_group.add(tabletop_grain);

  const tabletopEdgePositions = [];
  const edgeLevels = [-0.052, -0.020, 0.014, 0.045];
  const edgeZ = tableD / 2 + 0.002;
  const edgeX = tableW / 2 + 0.002;

  for (let levelIndex = 0; levelIndex < edgeLevels.length; levelIndex++) {
    const frontPoints = [];
    const sidePoints = [];
    const segments = 42;

    for (let segment = 0; segment <= segments; segment++) {
      const t = segment / segments;
      const x = -tableW / 2 + 0.05 + (tableW - 0.10) * t;
      const z = -tableD / 2 + 0.05 + (tableD - 0.10) * t;
      const y =
        edgeLevels[levelIndex] +
        0.0025 * Math.sin(t * Math.PI * 5 + levelIndex * 0.7);
      frontPoints.push(new THREE.Vector3(x, y, edgeZ));
      sidePoints.push(new THREE.Vector3(edgeX, y, z));
    }

    appendPolyline(frontPoints, tabletopEdgePositions);
    appendPolyline(sidePoints, tabletopEdgePositions);
  }

  const tabletop_edge_grain = createLineSegments(
    tabletopEdgePositions,
    grainMat,
    "tabletop_edge_grain"
  );
  tabletop_group.add(tabletop_edge_grain);

  const legHeight = 1.195;
  const legTopWidth = 0.17;
  const legTopDepth = 0.15;
  const legBottomWidth = 0.125;
  const legBottomDepth = 0.115;
  const legCornerRadius = 0.025;

  function createRoundedTaperedLegGeometry(height) {
    const rings = [
      {
        y: 0,
        w: legBottomWidth,
        d: legBottomDepth,
        r: legCornerRadius * 0.85,
      },
      {
        y: 0.025,
        w: legBottomWidth,
        d: legBottomDepth,
        r: legCornerRadius,
      },
      {
        y: height - 0.025,
        w: legTopWidth,
        d: legTopDepth,
        r: legCornerRadius,
      },
      {
        y: height,
        w: legTopWidth,
        d: legTopDepth,
        r: legCornerRadius,
      },
    ];
    const ringPoints = [];

    function roundedLoop(width, depth, radius, y) {
      const points = [];
      const halfW = width / 2;
      const halfD = depth / 2;
      const corners = [
        { x: halfW - radius, z: halfD - radius, a: 0 },
        { x: -halfW + radius, z: halfD - radius, a: Math.PI / 2 },
        { x: -halfW + radius, z: -halfD + radius, a: Math.PI },
        { x: halfW - radius, z: -halfD + radius, a: Math.PI * 1.5 },
      ];

      for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
        const corner = corners[cornerIndex];
        for (let step = 0; step < 4; step++) {
          const angle = corner.a + (step / 3) * Math.PI / 2;
          points.push(
            new THREE.Vector3(
              corner.x + Math.cos(angle) * radius,
              y,
              corner.z + Math.sin(angle) * radius
            )
          );
        }
      }
      return points;
    }

    for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
      const ring = rings[ringIndex];
      ringPoints.push(
        roundedLoop(ring.w, ring.d, ring.r, ring.y)
      );
    }

    const positions = [];
    const indices = [];
    const pointsPerRing = ringPoints[0].length;

    for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
      for (let pointIndex = 0; pointIndex < pointsPerRing; pointIndex++) {
        const point = ringPoints[ringIndex][pointIndex];
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex++) {
      const lowerOffset = ringIndex * pointsPerRing;
      const upperOffset = (ringIndex + 1) * pointsPerRing;
      for (let pointIndex = 0; pointIndex < pointsPerRing; pointIndex++) {
        const next = (pointIndex + 1) % pointsPerRing;
        const lower = lowerOffset + pointIndex;
        const lowerNext = lowerOffset + next;
        const upper = upperOffset + pointIndex;
        const upperNext = upperOffset + next;
        indices.push(lower, upperNext, lowerNext);
        indices.push(lower, upper, upperNext);
      }
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, 0, 0);
    const topCenter = positions.length / 3;
    positions.push(0, height, 0);
    const topOffset = (rings.length - 1) * pointsPerRing;

    for (let pointIndex = 0; pointIndex < pointsPerRing; pointIndex++) {
      const next = (pointIndex + 1) % pointsPerRing;
      indices.push(bottomCenter, pointIndex, next);
      indices.push(topCenter, topOffset + next, topOffset + pointIndex);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const legGeom = createRoundedTaperedLegGeometry(legHeight);

  const front_left_leg = new THREE.Mesh(legGeom, woodMat);
  front_left_leg.name = "front_left_leg";
  front_left_leg.position.set(-0.89, 0.02, 0.43);
  front_left_leg.rotation.z = -0.10;
  root.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(legGeom, woodMat);
  front_right_leg.name = "front_right_leg";
  front_right_leg.position.set(0.89, 0.02, 0.43);
  front_right_leg.rotation.z = 0.10;
  root.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(legGeom, woodMat);
  rear_left_leg.name = "rear_left_leg";
  rear_left_leg.position.set(-0.89, 0.02, -0.43);
  rear_left_leg.rotation.z = -0.10;
  root.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(legGeom, woodMat);
  rear_right_leg.name = "rear_right_leg";
  rear_right_leg.position.set(0.89, 0.02, -0.43);
  rear_right_leg.rotation.z = 0.10;
  root.add(rear_right_leg);

  function legSurfacePose(leg, localX, y, side) {
    const t = Math.max(0, Math.min(1, y / legHeight));
    const depth = legBottomDepth + (legTopDepth - legBottomDepth) * t;
    const z = side * (depth / 2 + 0.002);
    return new THREE.Vector3(
      leg.position.x + localX,
      leg.position.y + y,
      leg.position.z + z
    );
  }

  const legGrainPositions = [];
  const legGrainRows = 5;
  const legGrainSegments = 14;

  function addLegGrain(leg, seed) {
    for (let row = 0; row < legGrainRows; row++) {
      const points = [];
      const baseX = -0.045 + row * 0.0225;
      for (let segment = 0; segment <= legGrainSegments; segment++) {
        const t = segment / legGrainSegments;
        const y = 0.07 + t * (legHeight - 0.14);
        const localX =
          baseX +
          0.0035 * Math.sin(t * Math.PI * 3 + row * 0.8 + seed);
        points.push(legSurfacePose(leg, localX, y, 1));
      }
      appendPolyline(points, legGrainPositions);
    }
  }

  addLegGrain(front_left_leg, 0.3);
  addLegGrain(front_right_leg, 1.4);
  addLegGrain(rear_left_leg, 2.2);
  addLegGrain(rear_right_leg, 3.1);

  const leg_grain = createLineSegments(
    legGrainPositions,
    grainMat,
    "leg_grain"
  );
  root.add(leg_grain);

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