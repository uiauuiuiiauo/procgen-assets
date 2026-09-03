export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x1b1b1d,
    metalness: 0.35,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0x111113,
    metalness: 0.4,
    roughness: 0.5,
  });
  const grateMat = new THREE.MeshStandardMaterial({
    color: 0x625d59,
    metalness: 0.6,
    roughness: 0.5,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151517,
    metalness: 0.0,
    roughness: 0.8,
  });
  const charcoalMat = new THREE.MeshStandardMaterial({
    color: 0x303033,
    metalness: 0.0,
    roughness: 0.9,
  });
  const ashMat = new THREE.MeshStandardMaterial({
    color: 0x77777a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const emberMat = new THREE.MeshStandardMaterial({
    color: 0xff3b16,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xff3b16,
    emissiveIntensity: 1.0,
  });
  const hotEmberMat = new THREE.MeshStandardMaterial({
    color: 0xffa52a,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xffa52a,
    emissiveIntensity: 1.0,
  });

  function createRoundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hd = depth / 2;
    shape.moveTo(-hw + radius, -hd);
    shape.lineTo(hw - radius, -hd);
    shape.quadraticCurveTo(hw, -hd, hw, -hd + radius);
    shape.lineTo(hw, hd - radius);
    shape.quadraticCurveTo(hw, hd, hw - radius, hd);
    shape.lineTo(-hw + radius, hd);
    shape.quadraticCurveTo(-hw, hd, -hw, hd - radius);
    shape.lineTo(-hw, -hd + radius);
    shape.quadraticCurveTo(-hw, -hd, -hw + radius, -hd);
    shape.closePath();
    return shape;
  }

  function roundedRectPoints(width, depth, radius, y, cornerSegments) {
    const points = [];
    const hw = width / 2;
    const hd = depth / 2;
    const centers = [
      [hw - radius, hd - radius, 0],
      [-hw + radius, hd - radius, Math.PI / 2],
      [-hw + radius, -hd + radius, Math.PI],
      [hw - radius, -hd + radius, Math.PI * 1.5],
    ];
    for (let c = 0; c < centers.length; c++) {
      const center = centers[c];
      for (let i = 0; i < cornerSegments; i++) {
        const angle = center[2] + (i / cornerSegments) * Math.PI / 2;
        points.push(new THREE.Vector3(
          center[0] + Math.cos(angle) * radius,
          y,
          center[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function createRingGeometry(rings, cornerSegments) {
    const vertices = [];
    const indices = [];
    const ringPoints = [];

    for (let r = 0; r < rings.length; r++) {
      const ring = rings[r];
      const points = roundedRectPoints(
        ring.width,
        ring.depth,
        ring.radius,
        ring.y,
        cornerSegments
      );
      ringPoints.push(points);
      for (let i = 0; i < points.length; i++) {
        vertices.push(points[i].x, points[i].y, points[i].z);
      }
    }

    const pointCount = ringPoints[0].length;
    for (let r = 0; r < rings.length - 1; r++) {
      const lowerOffset = r * pointCount;
      const upperOffset = (r + 1) * pointCount;
      for (let i = 0; i < pointCount; i++) {
        const next = (i + 1) % pointCount;
        const a = lowerOffset + i;
        const b = lowerOffset + next;
        const c = upperOffset + next;
        const d = upperOffset + i;
        indices.push(a, b, c, a, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRoundedRectTube(width, depth, radius, y, tubeRadius) {
    const pathPoints = roundedRectPoints(width, depth, radius, y, 6);
    const path = new THREE.CatmullRomCurve3(
      pathPoints,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(path, 96, tubeRadius, 8, true);
  }

  function createRodBetween(start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  function createCurvedTube(points, radius, material, segments) {
    const path = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(path, segments, radius, 10, false),
      material
    );
  }

  const firebox_bodyGeom = createRingGeometry([
    { width: 1.12, depth: 0.78, radius: 0.17, y: -0.28 },
    { width: 1.20, depth: 0.84, radius: 0.18, y: -0.23 },
    { width: 1.30, depth: 0.92, radius: 0.15, y: -0.08 },
    { width: 1.46, depth: 1.05, radius: 0.11, y: 0.27 },
    { width: 1.52, depth: 1.10, radius: 0.09, y: 0.34 },
  ], 7);
  const firebox_body = new THREE.Mesh(firebox_bodyGeom, bodyMat);
  root.add(firebox_body);

  const firebox_bottomGeom = new THREE.ShapeGeometry(
    createRoundedRectShape(1.12, 0.78, 0.17),
    8
  );
  const firebox_bottom = new THREE.Mesh(firebox_bottomGeom, bodyMat);
  firebox_bottom.rotation.x = -Math.PI / 2;
  firebox_bottom.position.y = -0.28;
  root.add(firebox_bottom);

  const firebox_interiorGeom = new THREE.ShapeGeometry(
    createRoundedRectShape(1.31, 0.91, 0.12),
    8
  );
  const firebox_interior = new THREE.Mesh(firebox_interiorGeom, rimMat);
  firebox_interior.rotation.x = -Math.PI / 2;
  firebox_interior.position.y = 0.18;
  root.add(firebox_interior);

  const top_rimGeom = createRoundedRectTube(
    1.58,
    1.16,
    0.10,
    0.36,
    0.028
  );
  const top_rim = new THREE.Mesh(top_rimGeom, rimMat);
  root.add(top_rim);

  const charcoalGeom = new THREE.DodecahedronGeometry(0.105, 0);
  const charcoalPieces = [
    [-0.48, 0.31, -0.27, 1.15, 0.75, 0.90, 0.20],
    [-0.25, 0.32, -0.29, 1.25, 0.80, 0.85, 0.65],
    [0.00, 0.31, -0.28, 1.10, 0.72, 1.00, 0.35],
    [0.25, 0.32, -0.27, 1.20, 0.78, 0.85, 0.85],
    [0.48, 0.30, -0.24, 1.05, 0.70, 0.95, 0.15],
    [-0.53, 0.32, -0.06, 1.20, 0.78, 0.90, 0.55],
    [-0.30, 0.34, -0.07, 1.30, 0.85, 0.95, 0.95],
    [-0.06, 0.32, -0.05, 1.10, 0.75, 1.00, 0.30],
    [0.18, 0.34, -0.04, 1.25, 0.82, 0.90, 0.75],
    [0.43, 0.32, -0.03, 1.15, 0.76, 0.95, 0.45],
    [-0.43, 0.31, 0.17, 1.15, 0.72, 0.85, 0.80],
    [-0.20, 0.34, 0.18, 1.30, 0.82, 0.90, 0.25],
    [0.05, 0.32, 0.17, 1.20, 0.78, 1.00, 0.65],
    [0.29, 0.34, 0.18, 1.25, 0.80, 0.85, 0.10],
    [0.49, 0.31, 0.15, 1.05, 0.72, 0.90, 0.50],
    [-0.31, 0.30, 0.34, 1.10, 0.68, 0.80, 0.35],
    [0.00, 0.31, 0.35, 1.20, 0.72, 0.85, 0.90],
    [0.32, 0.30, 0.33, 1.10, 0.68, 0.90, 0.45],
  ];
  const charcoal = new THREE.InstancedMesh(
    charcoalGeom,
    charcoalMat,
    charcoalPieces.length
  );
  const charcoal_dummy = new THREE.Object3D();
  for (let i = 0; i < charcoalPieces.length; i++) {
    const piece = charcoalPieces[i];
    charcoal_dummy.position.set(piece[0], piece[1], piece[2]);
    charcoal_dummy.rotation.set(
      piece[6] * 0.7,
      piece[6],
      piece[6] * 0.45
    );
    charcoal_dummy.scale.set(piece[3], piece[4], piece[5]);
    charcoal_dummy.updateMatrix();
    charcoal.setMatrixAt(i, charcoal_dummy.matrix);
  }
  charcoal.instanceMatrix.needsUpdate = true;
  root.add(charcoal);

  const ash_capGeom = new THREE.DodecahedronGeometry(0.075, 0);
  const ash_caps = new THREE.InstancedMesh(
    ash_capGeom,
    ashMat,
    charcoalPieces.length
  );
  const ash_dummy = new THREE.Object3D();
  for (let i = 0; i < charcoalPieces.length; i++) {
    const piece = charcoalPieces[i];
    ash_dummy.position.set(
      piece[0] + ((i % 3) - 1) * 0.012,
      piece[1] + 0.055,
      piece[2] + ((i % 2) * 2 - 1) * 0.009
    );
    ash_dummy.rotation.set(
      piece[6] + 0.2,
      piece[6] * 0.8,
      piece[6] - 0.15
    );
    ash_dummy.scale.set(
      piece[3] * 0.72,
      piece[4] * 0.38,
      piece[5] * 0.70
    );
    ash_dummy.updateMatrix();
    ash_caps.setMatrixAt(i, ash_dummy.matrix);
  }
  ash_caps.instanceMatrix.needsUpdate = true;
  root.add(ash_caps);

  const emberGeom = new THREE.DodecahedronGeometry(0.075, 0);
  const emberPieces = [
    [-0.42, 0.275, -0.17, 1.10, 0.55, 0.85],
    [-0.18, 0.285, -0.18, 1.25, 0.58, 0.90],
    [0.08, 0.275, -0.17, 1.15, 0.52, 0.85],
    [0.34, 0.285, -0.15, 1.20, 0.56, 0.90],
    [-0.50, 0.280, 0.06, 1.00, 0.54, 0.85],
    [-0.27, 0.290, 0.07, 1.30, 0.60, 0.90],
    [-0.02, 0.280, 0.08, 1.10, 0.55, 0.95],
    [0.22, 0.295, 0.08, 1.25, 0.60, 0.85],
    [0.46, 0.275, 0.10, 1.05, 0.52, 0.80],
    [-0.34, 0.280, 0.28, 1.10, 0.54, 0.85],
    [-0.08, 0.295, 0.29, 1.30, 0.60, 0.90],
    [0.18, 0.285, 0.29, 1.20, 0.56, 0.90],
    [0.39, 0.280, 0.27, 1.05, 0.52, 0.80],
  ];
  const embers = new THREE.InstancedMesh(
    emberGeom,
    emberMat,
    emberPieces.length
  );
  const ember_dummy = new THREE.Object3D();
  for (let i = 0; i < emberPieces.length; i++) {
    const piece = emberPieces[i];
    ember_dummy.position.set(piece[0], piece[1], piece[2]);
    ember_dummy.rotation.set(i * 0.31, i * 0.57, i * 0.19);
    ember_dummy.scale.set(piece[3], piece[4], piece[5]);
    ember_dummy.updateMatrix();
    embers.setMatrixAt(i, ember_dummy.matrix);
  }
  embers.instanceMatrix.needsUpdate = true;
  root.add(embers);

  const hotEmberPieces = [
    [-0.29, 0.322, 0.07, 0.65, 0.35, 0.55],
    [-0.02, 0.326, 0.08, 0.72, 0.38, 0.60],
    [0.22, 0.328, 0.08, 0.68, 0.36, 0.58],
    [-0.08, 0.322, 0.29, 0.70, 0.36, 0.56],
    [0.34, 0.316, -0.15, 0.62, 0.34, 0.54],
  ];
  const hot_embers = new THREE.InstancedMesh(
    emberGeom,
    hotEmberMat,
    hotEmberPieces.length
  );
  const hot_ember_dummy = new THREE.Object3D();
  for (let i = 0; i < hotEmberPieces.length; i++) {
    const piece = hotEmberPieces[i];
    hot_ember_dummy.position.set(piece[0], piece[1], piece[2]);
    hot_ember_dummy.rotation.set(i * 0.42, i * 0.63, i * 0.27);
    hot_ember_dummy.scale.set(piece[3], piece[4], piece[5]);
    hot_ember_dummy.updateMatrix();
    hot_embers.setMatrixAt(i, hot_ember_dummy.matrix);
  }
  hot_embers.instanceMatrix.needsUpdate = true;
  root.add(hot_embers);

  const grateY = 0.43;
  const grateZMin = -0.49;
  const grateZMax = 0.49;
  const grateBarCount = 18;
  const grateBarLength = grateZMax - grateZMin;
  const grate_barsGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    grateBarLength,
    8
  );
  const grate_bars = new THREE.InstancedMesh(
    grate_barsGeom,
    grateMat,
    grateBarCount
  );
  const grate_bar_dummy = new THREE.Object3D();
  for (let i = 0; i < grateBarCount; i++) {
    const x = -0.66 + (1.32 * i) / (grateBarCount - 1);
    grate_bar_dummy.position.set(x, grateY, 0);
    grate_bar_dummy.rotation.set(Math.PI / 2, 0, 0);
    grate_bar_dummy.scale.set(1, 1, 1);
    grate_bar_dummy.updateMatrix();
    grate_bars.setMatrixAt(i, grate_bar_dummy.matrix);
  }
  grate_bars.instanceMatrix.needsUpdate = true;
  root.add(grate_bars);

  const grate_crossbarGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    1.42,
    10
  );
  const grate_crossbars = new THREE.InstancedMesh(
    grate_crossbarGeom,
    grateMat,
    3
  );
  const grate_crossbar_dummy = new THREE.Object3D();
  const crossbarPositions = [-0.47, 0, 0.47];
  for (let i = 0; i < crossbarPositions.length; i++) {
    grate_crossbar_dummy.position.set(
      0,
      grateY - 0.014,
      crossbarPositions[i]
    );
    grate_crossbar_dummy.rotation.set(0, 0, Math.PI / 2);
    grate_crossbar_dummy.scale.set(1, 1, 1);
    grate_crossbar_dummy.updateMatrix();
    grate_crossbars.setMatrixAt(i, grate_crossbar_dummy.matrix);
  }
  grate_crossbars.instanceMatrix.needsUpdate = true;
  root.add(grate_crossbars);

  const grate_frameGeom = createRoundedRectTube(
    1.44,
    1.02,
    0.055,
    grateY,
    0.014
  );
  const grate_frame = new THREE.Mesh(grate_frameGeom, grateMat);
  root.add(grate_frame);

  const grate_lipsGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    1.04,
    10
  );
  const grate_lips = new THREE.InstancedMesh(
    grate_lipsGeom,
    rimMat,
    2
  );
  const grate_lip_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    grate_lip_dummy.position.set(i === 0 ? -0.715 : 0.715, 0.445, 0);
    grate_lip_dummy.rotation.set(Math.PI / 2, 0, 0);
    grate_lip_dummy.scale.set(1, 1, 1);
    grate_lip_dummy.updateMatrix();
    grate_lips.setMatrixAt(i, grate_lip_dummy.matrix);
  }
  grate_lips.instanceMatrix.needsUpdate = true;
  root.add(grate_lips);

  const right_handle = createCurvedTube([
    new THREE.Vector3(0.70, 0.34, -0.32),
    new THREE.Vector3(0.82, 0.34, -0.31),
    new THREE.Vector3(0.91, 0.34, -0.22),
    new THREE.Vector3(0.94, 0.34, 0),
    new THREE.Vector3(0.91, 0.34, 0.22),
    new THREE.Vector3(0.82, 0.34, 0.31),
    new THREE.Vector3(0.70, 0.34, 0.32),
  ], 0.021, frameMat, 36);
  root.add(right_handle);

  const left_handle = createCurvedTube([
    new THREE.Vector3(-0.70, 0.34, -0.32),
    new THREE.Vector3(-0.82, 0.34, -0.31),
    new THREE.Vector3(-0.91, 0.34, -0.22),
    new THREE.Vector3(-0.94, 0.34, 0),
    new THREE.Vector3(-0.91, 0.34, 0.22),
    new THREE.Vector3(-0.82, 0.34, 0.31),
    new THREE.Vector3(-0.70, 0.34, 0.32),
  ], 0.021, frameMat, 36);
  root.add(left_handle);

  const handle_mountGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.075,
    12
  );
  const handle_mounts = new THREE.InstancedMesh(
    handle_mountGeom,
    frameMat,
    4
  );
  const handle_mount_dummy = new THREE.Object3D();
  const handleMountPositions = [
    [0.72, 0.34, -0.32],
    [0.72, 0.34, 0.32],
    [-0.72, 0.34, -0.32],
    [-0.72, 0.34, 0.32],
  ];
  for (let i = 0; i < handleMountPositions.length; i++) {
    const position = handleMountPositions[i];
    handle_mount_dummy.position.set(
      position[0],
      position[1],
      position[2]
    );
    handle_mount_dummy.rotation.set(0, 0, Math.PI / 2);
    handle_mount_dummy.scale.set(1, 1, 1);
    handle_mount_dummy.updateMatrix();
    handle_mounts.setMatrixAt(i, handle_mount_dummy.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  root.add(handle_mounts);

  const legSegments = [
    [
      new THREE.Vector3(-0.58, -0.17, 0.38),
      new THREE.Vector3(-0.78, -0.84, 0.50),
    ],
    [
      new THREE.Vector3(0.58, -0.17, 0.38),
      new THREE.Vector3(0.78, -0.84, 0.50),
    ],
    [
      new THREE.Vector3(-0.58, -0.17, -0.38),
      new THREE.Vector3(-0.78, -0.84, -0.50),
    ],
    [
      new THREE.Vector3(0.58, -0.17, -0.38),
      new THREE.Vector3(0.78, -0.84, -0.50),
    ],
  ];

  const legsGeom = new THREE.CylinderGeometry(0.034, 0.034, 1, 12);
  const legs = new THREE.InstancedMesh(legsGeom, frameMat, 4);
  const leg_dummy = new THREE.Object3D();
  for (let i = 0; i < legSegments.length; i++) {
    const start = legSegments[i][0];
    const end = legSegments[i][1];
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    leg_dummy.position.copy(start).add(end).multiplyScalar(0.5);
    leg_dummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    leg_dummy.scale.set(1, length, 1);
    leg_dummy.updateMatrix();
    legs.setMatrixAt(i, leg_dummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const rubber_feetGeom = new THREE.CylinderGeometry(
    0.045,
    0.066,
    0.16,
    12
  );
  const rubber_feet = new THREE.InstancedMesh(
    rubber_feetGeom,
    rubberMat,
    4
  );
  const rubber_foot_dummy = new THREE.Object3D();
  for (let i = 0; i < legSegments.length; i++) {
    const start = legSegments[i][0];
    const end = legSegments[i][1];
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const midpoint = new THREE.Vector3()
      .copy(end)
      .addScaledVector(direction, -0.08);
    rubber_foot_dummy.position.copy(midpoint);
    rubber_foot_dummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
    rubber_foot_dummy.scale.set(1, 1, 1);
    rubber_foot_dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, rubber_foot_dummy.matrix);
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  root.add(rubber_feet);

  const lower_guard_railGeom = createRoundedRectTube(
    1.48,
    0.98,
    0.12,
    -0.70,
    0.023
  );
  const lower_guard_rail = new THREE.Mesh(
    lower_guard_railGeom,
    frameMat
  );
  root.add(lower_guard_rail);

  const lower_shelfGeom = new THREE.BoxGeometry(1.18, 0.025, 0.72);
  const lower_shelf = new THREE.Mesh(lower_shelfGeom, frameMat);
  lower_shelf.position.set(0, -0.695, 0);
  root.add(lower_shelf);

  const ash_catcherGeom = new THREE.CylinderGeometry(
    0.16,
    0.19,
    0.055,
    24
  );
  const ash_catcher = new THREE.Mesh(ash_catcherGeom, frameMat);
  ash_catcher.position.set(0, -0.64, 0);
  root.add(ash_catcher);

  const ash_catcher_capGeom = new THREE.CylinderGeometry(
    0.075,
    0.12,
    0.05,
    20
  );
  const ash_catcher_cap = new THREE.Mesh(
    ash_catcher_capGeom,
    frameMat
  );
  ash_catcher_cap.position.set(0, -0.595, 0);
  root.add(ash_catcher_cap);

  const ash_catcher_handle = createRodBetween(
    new THREE.Vector3(0, -0.57, 0),
    new THREE.Vector3(0, -0.49, 0),
    0.018,
    frameMat,
    10
  );
  root.add(ash_catcher_handle);

  const front_rivetsGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.012,
    12
  );
  const front_rivets = new THREE.InstancedMesh(
    front_rivetsGeom,
    frameMat,
    2
  );
  const front_rivet_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    front_rivet_dummy.position.set(
      i === 0 ? -0.48 : 0.48,
      0.18,
      0.526
    );
    front_rivet_dummy.rotation.set(Math.PI / 2, 0, 0);
    front_rivet_dummy.scale.set(1, 1, 1);
    front_rivet_dummy.updateMatrix();
    front_rivets.setMatrixAt(i, front_rivet_dummy.matrix);
  }
  front_rivets.instanceMatrix.needsUpdate = true;
  root.add(front_rivets);

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