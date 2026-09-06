export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "speedboat";

  const hull_group = new THREE.Group();
  hull_group.name = "hull_group";
  root.add(hull_group);

  const deck_group = new THREE.Group();
  deck_group.name = "deck_group";
  root.add(deck_group);

  const cockpit_group = new THREE.Group();
  cockpit_group.name = "cockpit_group";
  root.add(cockpit_group);

  const windshield_group = new THREE.Group();
  windshield_group.name = "windshield_group";
  root.add(windshield_group);

  const stern_group = new THREE.Group();
  stern_group.name = "stern_group";
  root.add(stern_group);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const lowerHullMat = new THREE.MeshStandardMaterial({
    color: 0x292b2d,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171819,
    metalness: 0.0,
    roughness: 0.8
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x242628,
    metalness: 0.0,
    roughness: 0.7
  });
  const upholsteryMat = new THREE.MeshStandardMaterial({
    color: 0xd8d0c3,
    metalness: 0.0,
    roughness: 0.7
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x9d9588,
    metalness: 0.0,
    roughness: 0.7
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fc6c8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const redAccentMat = new THREE.MeshStandardMaterial({
    color: 0x9e2028,
    metalness: 0.0,
    roughness: 0.3
  });
  const redLightMat = new THREE.MeshStandardMaterial({
    color: 0xff2535,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff2535,
    emissiveIntensity: 1.0
  });
  const greenLightMat = new THREE.MeshStandardMaterial({
    color: 0x20e080,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x20e080,
    emissiveIntensity: 1.0
  });

  function createHullGeometry(stations) {
    const positions = [];
    const indices = [];
    const ringSize = 6;

    for (const station of stations) {
      const ring = [
        [-station.w, station.top],
        [-station.w * 0.98, station.chine],
        [-station.w * 0.48, station.keel],
        [station.w * 0.48, station.keel],
        [station.w * 0.98, station.chine],
        [station.w, station.top]
      ];
      for (const point of ring) {
        positions.push(point[0], point[1], station.z);
      }
    }

    for (let i = 0; i < stations.length - 1; i++) {
      for (let j = 0; j < ringSize; j++) {
        const next = (j + 1) % ringSize;
        const a = i * ringSize + j;
        const b = i * ringSize + next;
        const c = (i + 1) * ringSize + next;
        const d = (i + 1) * ringSize + j;
        indices.push(a, b, d, b, c, d);
      }
    }

    const frontCenter = positions.length / 3;
    positions.push(0, stations[0].top, stations[0].z);
    for (let j = 0; j < ringSize; j++) {
      indices.push(frontCenter, (j + 1) % ringSize, j);
    }

    const rearCenter = positions.length / 3;
    const rearBase = (stations.length - 1) * ringSize;
    positions.push(0, stations[stations.length - 1].top, stations[stations.length - 1].z);
    for (let j = 0; j < ringSize; j++) {
      indices.push(rearCenter, rearBase + j, rearBase + (j + 1) % ringSize);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createLowerHullGeometry(stations) {
    const positions = [];
    const indices = [];
    const ringSize = 4;

    for (const station of stations) {
      const ring = [
        [-station.w * 0.84, station.water],
        [-station.w * 0.34, station.keel - 0.015],
        [station.w * 0.34, station.keel - 0.015],
        [station.w * 0.84, station.water]
      ];
      for (const point of ring) {
        positions.push(point[0], point[1], station.z);
      }
    }

    for (let i = 0; i < stations.length - 1; i++) {
      for (let j = 0; j < ringSize; j++) {
        const next = (j + 1) % ringSize;
        const a = i * ringSize + j;
        const b = i * ringSize + next;
        const c = (i + 1) * ringSize + next;
        const d = (i + 1) * ringSize + j;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createDeckGeometry(stations) {
    const positions = [];
    const indices = [];

    for (const station of stations) {
      positions.push(-station.w, station.y, station.z);
      positions.push(station.w, station.y, station.z);
    }

    for (let i = 0; i < stations.length - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 3;
      const d = a + 2;
      indices.push(a, b, d, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPrismGeometry(points, thickness) {
    const positions = [];
    const indices = [];
    const count = points.length;
    const half = thickness * 0.5;

    for (const point of points) {
      positions.push(point[0], point[1], point[2] - half);
    }
    for (const point of points) {
      positions.push(point[0], point[1], point[2] + half);
    }

    for (let i = 1; i < count - 1; i++) {
      indices.push(0, i + 1, i);
      indices.push(count, count + i, count + i + 1);
    }

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      indices.push(i, next, count + next);
      indices.push(i, count + next, count + i);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createQuadGeometry(points) {
    const positions = [];
    for (const point of points) {
      positions.push(point.x, point.y, point.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex([0, 1, 2, 0, 2, 3]);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTube(points, radius, material, closed) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed === true, "centripetal");
    const segments = Math.max(4, (points.length - 1) * 8);
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 8, closed === true),
      material
    );
  }

  function createCylinderBetween(start, end, radius, material, segments) {
    const direction = end.clone().sub(start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(radius, radius, length, segments || 12);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  function createRoundedRectGeometry(width, height, radius) {
    const x0 = -width * 0.5;
    const x1 = width * 0.5;
    const y0 = -height * 0.5;
    const y1 = height * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return new THREE.ShapeGeometry(shape, 8);
  }

  const hullStations = [
    { z: 3.40, w: 0.025, top: 0.70, chine: 0.58, keel: 0.50, water: 0.54 },
    { z: 3.15, w: 0.34, top: 0.79, chine: 0.34, keel: 0.16, water: 0.28 },
    { z: 2.75, w: 0.62, top: 0.84, chine: 0.12, keel: -0.08, water: 0.05 },
    { z: 2.20, w: 0.82, top: 0.88, chine: -0.02, keel: -0.28, water: -0.08 },
    { z: 1.40, w: 0.94, top: 0.91, chine: -0.10, keel: -0.43, water: -0.16 },
    { z: 0.40, w: 0.99, top: 0.94, chine: -0.16, keel: -0.54, water: -0.22 },
    { z: -0.70, w: 0.98, top: 0.96, chine: -0.18, keel: -0.57, water: -0.24 },
    { z: -1.70, w: 0.92, top: 0.98, chine: -0.18, keel: -0.55, water: -0.23 },
    { z: -2.50, w: 0.82, top: 0.98, chine: -0.14, keel: -0.48, water: -0.19 }
  ];

  const hullGeom = createHullGeometry(hullStations);
  const hull = new THREE.Mesh(hullGeom, hullMat);
  hull.name = "hull";
  hull_group.add(hull);

  const lowerHullStations = hullStations.slice(1);
  const lower_hullGeom = createLowerHullGeometry(lowerHullStations);
  const lower_hull = new THREE.Mesh(lower_hullGeom, lowerHullMat);
  lower_hull.name = "lower_hull";
  hull_group.add(lower_hull);

  const keel_strip = createTube([
    new THREE.Vector3(0, 0.48, 3.34),
    new THREE.Vector3(0, 0.10, 2.76),
    new THREE.Vector3(0, -0.27, 2.18),
    new THREE.Vector3(0, -0.50, 1.30),
    new THREE.Vector3(0, -0.56, 0.20),
    new THREE.Vector3(0, -0.55, -0.80),
    new THREE.Vector3(0, -0.50, -1.70),
    new THREE.Vector3(0, -0.43, -2.42)
  ], 0.035, rubberMat, false);
  keel_strip.name = "keel_strip";
  hull_group.add(keel_strip);

  for (const side of [-1, 1]) {
    const upper_accent = createTube([
      new THREE.Vector3(side * 0.12, 0.48, 3.12),
      new THREE.Vector3(side * 0.52, 0.18, 2.62),
      new THREE.Vector3(side * 0.78, -0.02, 2.00),
      new THREE.Vector3(side * 0.91, -0.18, 1.10),
      new THREE.Vector3(side * 0.96, -0.27, 0.00),
      new THREE.Vector3(side * 0.94, -0.29, -1.10),
      new THREE.Vector3(side * 0.84, -0.23, -2.34)
    ], 0.018, brushedMat, false);
    upper_accent.name = side < 0 ? "port_upper_accent" : "starboard_upper_accent";
    hull_group.add(upper_accent);

    const lower_accent = createTube([
      new THREE.Vector3(side * 0.38, 0.02, 2.54),
      new THREE.Vector3(side * 0.70, -0.20, 1.92),
      new THREE.Vector3(side * 0.86, -0.36, 1.00),
      new THREE.Vector3(side * 0.91, -0.43, -0.10),
      new THREE.Vector3(side * 0.88, -0.42, -1.20),
      new THREE.Vector3(side * 0.78, -0.35, -2.25)
    ], 0.016, chromeMat, false);
    lower_accent.name = side < 0 ? "port_lower_accent" : "starboard_lower_accent";
    hull_group.add(lower_accent);
  }

  const DeckStations = [
    { z: 3.40, w: 0.02, y: 0.72 },
    { z: 3.15, w: 0.34, y: 0.81 },
    { z: 2.75, w: 0.62, y: 0.86 },
    { z: 2.20, w: 0.82, y: 0.90 },
    { z: 1.40, w: 0.94, y: 0.93 },
    { z: 0.40, w: 0.99, y: 0.96 },
    { z: -0.70, w: 0.98, y: 0.98 },
    { z: -1.70, w: 0.92, y: 1.00 },
    { z: -2.50, w: 0.82, y: 1.00 }
  ];

  const deckGeom = createDeckGeometry(DeckStations);
  const deck = new THREE.Mesh(deckGeom, hullMat);
  deck.name = "deck";
  deck_group.add(deck);

  const port_gunwale = createTube([
    new THREE.Vector3(-0.02, 0.73, 3.38),
    new THREE.Vector3(-0.34, 0.82, 3.14),
    new THREE.Vector3(-0.62, 0.87, 2.74),
    new THREE.Vector3(-0.82, 0.91, 2.20),
    new THREE.Vector3(-0.94, 0.94, 1.40),
    new THREE.Vector3(-0.99, 0.97, 0.40),
    new THREE.Vector3(-0.98, 0.99, -0.70),
    new THREE.Vector3(-0.92, 1.01, -1.70),
    new THREE.Vector3(-0.82, 1.01, -2.48)
  ], 0.026, chromeMat, false);
  port_gunwale.name = "port_gunwale";
  deck_group.add(port_gunwale);

  const starboard_gunwale = createTube([
    new THREE.Vector3(0.02, 0.73, 3.38),
    new THREE.Vector3(0.34, 0.82, 3.14),
    new THREE.Vector3(0.62, 0.87, 2.74),
    new THREE.Vector3(0.82, 0.91, 2.20),
    new THREE.Vector3(0.94, 0.94, 1.40),
    new THREE.Vector3(0.99, 0.97, 0.40),
    new THREE.Vector3(0.98, 0.99, -0.70),
    new THREE.Vector3(0.92, 1.01, -1.70),
    new THREE.Vector3(0.82, 1.01, -2.48)
  ], 0.026, chromeMat, false);
  starboard_gunwale.name = "starboard_gunwale";
  deck_group.add(starboard_gunwale);

  const port_rub_rail = createTube([
    new THREE.Vector3(-0.34, 0.78, 3.12),
    new THREE.Vector3(-0.62, 0.83, 2.72),
    new THREE.Vector3(-0.82, 0.87, 2.18),
    new THREE.Vector3(-0.94, 0.90, 1.38),
    new THREE.Vector3(-0.99, 0.93, 0.38),
    new THREE.Vector3(-0.98, 0.95, -0.72),
    new THREE.Vector3(-0.92, 0.97, -1.68),
    new THREE.Vector3(-0.82, 0.97, -2.42)
  ], 0.012, rubberMat, false);
  port_rub_rail.name = "port_rub_rail";
  deck_group.add(port_rub_rail);

  const starboard_rub_rail = createTube([
    new THREE.Vector3(0.34, 0.78, 3.12),
    new THREE.Vector3(0.62, 0.83, 2.72),
    new THREE.Vector3(0.82, 0.87, 2.18),
    new THREE.Vector3(0.94, 0.90, 1.38),
    new THREE.Vector3(0.99, 0.93, 0.38),
    new THREE.Vector3(0.98, 0.95, -0.72),
    new THREE.Vector3(0.92, 0.97, -1.68),
    new THREE.Vector3(0.82, 0.97, -2.42)
  ], 0.012, rubberMat, false);
  starboard_rub_rail.name = "starboard_rub_rail";
  deck_group.add(starboard_rub_rail);

  const cockpit_wellGeom = new THREE.BoxGeometry(1.58, 0.035, 1.95);
  const cockpit_well = new THREE.Mesh(cockpit_wellGeom, interiorMat);
  cockpit_well.name = "cockpit_well";
  cockpit_well.position.set(0, 0.985, -1.18);
  cockpit_group.add(cockpit_well);

  const cockpit_coamingGeom = new THREE.BoxGeometry(0.09, 0.13, 2.05);
  const port_cockpit_coaming = new THREE.Mesh(cockpit_coamingGeom, hullMat);
  port_cockpit_coaming.name = "port_cockpit_coaming";
  port_cockpit_coaming.position.set(-0.84, 1.02, -1.18);
  cockpit_group.add(port_cockpit_coaming);

  const starboard_cockpit_coaming = new THREE.Mesh(cockpit_coamingGeom, hullMat);
  starboard_cockpit_coaming.name = "starboard_cockpit_coaming";
  starboard_cockpit_coaming.position.set(0.84, 1.02, -1.18);
  cockpit_group.add(starboard_cockpit_coaming);

  const rear_cockpit_coamingGeom = new THREE.BoxGeometry(1.68, 0.14, 0.12);
  const rear_cockpit_coaming = new THREE.Mesh(rear_cockpit_coamingGeom, hullMat);
  rear_cockpit_coaming.name = "rear_cockpit_coaming";
  rear_cockpit_coaming.position.set(0, 1.02, -2.19);
  cockpit_group.add(rear_cockpit_coaming);

  const dashboardGeom = new THREE.BoxGeometry(1.48, 0.18, 0.28);
  const dashboard = new THREE.Mesh(dashboardGeom, interiorMat);
  dashboard.name = "dashboard";
  dashboard.position.set(0, 1.08, 0.28);
  dashboard.rotation.x = -0.08;
  cockpit_group.add(dashboard);

  const helm_consoleGeom = new THREE.BoxGeometry(0.42, 0.38, 0.34);
  const helm_console = new THREE.Mesh(helm_consoleGeom, interiorMat);
  helm_console.name = "helm_console";
  helm_console.position.set(0.38, 1.18, 0.10);
  cockpit_group.add(helm_console);

  const steering_wheelGeom = new THREE.TorusGeometry(0.15, 0.018, 8, 24);
  const steering_wheel = new THREE.Mesh(steering_wheelGeom, rubberMat);
  steering_wheel.name = "steering_wheel";
  steering_wheel.position.set(0.38, 1.34, -0.08);
  steering_wheel.rotation.x = -0.22;
  cockpit_group.add(steering_wheel);

  const steering_hubGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.08, 12);
  const steering_hub = new THREE.Mesh(steering_hubGeom, chromeMat);
  steering_hub.name = "steering_hub";
  steering_hub.position.set(0.38, 1.34, -0.08);
  steering_hub.rotation.x = Math.PI / 2 - 0.22;
  cockpit_group.add(steering_hub);

  const seatCushionGeom = new THREE.SphereGeometry(1, 24, 12);
  const seatBackGeom = new THREE.SphereGeometry(1, 24, 12);

  const front_left_seat_cushion = new THREE.Mesh(seatCushionGeom, upholsteryMat);
  front_left_seat_cushion.name = "front_left_seat_cushion";
  front_left_seat_cushion.position.set(-0.39, 1.075, -0.56);
  front_left_seat_cushion.scale.set(0.32, 0.085, 0.31);
  cockpit_group.add(front_left_seat_cushion);

  const front_right_seat_cushion = new THREE.Mesh(seatCushionGeom, upholsteryMat);
  front_right_seat_cushion.name = "front_right_seat_cushion";
  front_right_seat_cushion.position.set(0.39, 1.075, -0.56);
  front_right_seat_cushion.scale.set(0.32, 0.085, 0.31);
  cockpit_group.add(front_right_seat_cushion);

  const front_left_seat_back = new THREE.Mesh(seatBackGeom, upholsteryMat);
  front_left_seat_back.name = "front_left_seat_back";
  front_left_seat_back.position.set(-0.39, 1.31, -0.84);
  front_left_seat_back.scale.set(0.32, 0.25, 0.10);
  front_left_seat_back.rotation.x = -0.10;
  cockpit_group.add(front_left_seat_back);

  const front_right_seat_back = new THREE.Mesh(seatBackGeom, upholsteryMat);
  front_right_seat_back.name = "front_right_seat_back";
  front_right_seat_back.position.set(0.39, 1.31, -0.84);
  front_right_seat_back.scale.set(0.32, 0.25, 0.10);
  front_right_seat_back.rotation.x = -0.10;
  cockpit_group.add(front_right_seat_back);

  const rear_bench_cushion = new THREE.Mesh(seatCushionGeom, upholsteryMat);
  rear_bench_cushion.name = "rear_bench_cushion";
  rear_bench_cushion.position.set(0, 1.08, -1.63);
  rear_bench_cushion.scale.set(0.70, 0.09, 0.32);
  cockpit_group.add(rear_bench_cushion);

  const rear_bench_back = new THREE.Mesh(seatBackGeom, upholsteryMat);
  rear_bench_back.name = "rear_bench_back";
  rear_bench_back.position.set(0, 1.31, -1.93);
  rear_bench_back.scale.set(0.70, 0.25, 0.10);
  rear_bench_back.rotation.x = -0.08;
  cockpit_group.add(rear_bench_back);

  const rear_back_seamGeom = new THREE.CylinderGeometry(0.009, 0.009, 0.38, 8);
  const rear_back_left_seam = new THREE.Mesh(rear_back_seamGeom, seamMat);
  rear_back_left_seam.name = "rear_back_left_seam";
  rear_back_left_seam.position.set(-0.24, 1.31, -1.825);
  rear_back_left_seam.rotation.x = -0.08;
  cockpit_group.add(rear_back_left_seam);

  const rear_back_right_seam = new THREE.Mesh(rear_back_seamGeom, seamMat);
  rear_back_right_seam.name = "rear_back_right_seam";
  rear_back_right_seam.position.set(0.24, 1.31, -1.825);
  rear_back_right_seam.rotation.x = -0.08;
  cockpit_group.add(rear_back_right_seam);

  const frontWindshieldPoints = [
    [-0.72, 1.02, 0.62],
    [0.72, 1.02, 0.62],
    [0.58, 1.68, 0.10],
    [-0.58, 1.68, 0.10]
  ];
  const front_windshieldGeom = createQuadGeometry(frontWindshieldPoints.map(
    p => new THREE.Vector3(p[0], p[1], p[2])
  ));
  const front_windshield = new THREE.Mesh(front_windshieldGeom, glassMat);
  front_windshield.name = "front_windshield";
  windshield_group.add(front_windshield);

  const portSideWindshieldPoints = [
    [-0.72, 1.02, 0.62],
    [-0.72, 1.00, -0.52],
    [-0.61, 1.52, -0.42],
    [-0.58, 1.68, 0.10]
  ];
  const port_side_windshieldGeom = createQuadGeometry(portSideWindshieldPoints.map(
    p => new THREE.Vector3(p[0], p[1], p[2])
  ));
  const port_side_windshield = new THREE.Mesh(port_side_windshieldGeom, glassMat);
  port_side_windshield.name = "port_side_windshield";
  windshield_group.add(port_side_windshield);

  const starboardSideWindshieldPoints = [
    [0.72, 1.02, 0.62],
    [0.58, 1.68, 0.10],
    [0.61, 1.52, -0.42],
    [0.72, 1.00, -0.52]
  ];
  const starboard_side_windshieldGeom = createQuadGeometry(starboardSideWindshieldPoints.map(
    p => new THREE.Vector3(p[0], p[1], p[2])
  ));
  const starboard_side_windshield = new THREE.Mesh(starboard_side_windshieldGeom, glassMat);
  starboard_side_windshield.name = "starboard_side_windshield";
  windshield_group.add(starboard_side_windshield);

  const windshield_frame = new THREE.Group();
  windshield_frame.name = "windshield_frame";
  windshield_group.add(windshield_frame);

  const frameSegments = [
    [new THREE.Vector3(-0.72, 1.02, 0.62), new THREE.Vector3(0.72, 1.02, 0.62)],
    [new THREE.Vector3(-0.58, 1.68, 0.10), new THREE.Vector3(0.58, 1.68, 0.10)],
    [new THREE.Vector3(-0.72, 1.02, 0.62), new THREE.Vector3(-0.58, 1.68, 0.10)],
    [new THREE.Vector3(0.72, 1.02, 0.62), new THREE.Vector3(0.58, 1.68, 0.10)],
    [new THREE.Vector3(-0.58, 1.68, 0.10), new THREE.Vector3(-0.61, 1.52, -0.42)],
    [new THREE.Vector3(0.58, 1.68, 0.10), new THREE.Vector3(0.61, 1.52, -0.42)],
    [new THREE.Vector3(-0.72, 1.02, 0.62), new THREE.Vector3(-0.72, 1.00, -0.52)],
    [new THREE.Vector3(0.72, 1.02, 0.62), new THREE.Vector3(0.72, 1.00, -0.52)],
    [new THREE.Vector3(-0.61, 1.52, -0.42), new THREE.Vector3(-0.72, 1.00, -0.52)],
    [new THREE.Vector3(0.61, 1.52, -0.42), new THREE.Vector3(0.72, 1.00, -0.52)],
    [new THREE.Vector3(0, 1.02, 0.62), new THREE.Vector3(0, 1.68, 0.10)]
  ];
  for (let i = 0; i < frameSegments.length; i++) {
    const frame_bar = createCylinderBetween(
      frameSegments[i][0],
      frameSegments[i][1],
      i === 10 ? 0.018 : 0.024,
      chromeMat,
      10
    );
    frame_bar.name = "windshield_frame_bar_" + i;
    windshield_frame.add(frame_bar);
  }

  const navigation_lightGeom = new THREE.SphereGeometry(0.035, 14, 8);
  const port_navigation_light = new THREE.Mesh(navigation_lightGeom, redLightMat);
  port_navigation_light.name = "port_navigation_light";
  port_navigation_light.position.set(-0.61, 1.72, 0.07);
  windshield_group.add(port_navigation_light);

  const starboard_navigation_light = new THREE.Mesh(navigation_lightGeom, greenLightMat);
  starboard_navigation_light.name = "starboard_navigation_light";
  starboard_navigation_light.position.set(0.61, 1.72, 0.07);
  windshield_group.add(starboard_navigation_light);

  const bow_rail = new THREE.Group();
  bow_rail.name = "bow_rail";
  deck_group.add(bow_rail);

  const port_bow_rail = createTube([
    new THREE.Vector3(-0.72, 1.05, 1.34),
    new THREE.Vector3(-0.61, 1.10, 2.12),
    new THREE.Vector3(-0.43, 1.10, 2.72),
    new THREE.Vector3(-0.20, 1.04, 3.14)
  ], 0.014, chromeMat, false);
  port_bow_rail.name = "port_bow_rail";
  bow_rail.add(port_bow_rail);

  const starboard_bow_rail = createTube([
    new THREE.Vector3(0.72, 1.05, 1.34),
    new THREE.Vector3(0.61, 1.10, 2.12),
    new THREE.Vector3(0.43, 1.10, 2.72),
    new THREE.Vector3(0.20, 1.04, 3.14)
  ], 0.014, chromeMat, false);
  starboard_bow_rail.name = "starboard_bow_rail";
  bow_rail.add(starboard_bow_rail);

  const bow_rail_stanchions = new THREE.Group();
  bow_rail_stanchions.name = "bow_rail_stanchions";
  const stanchionData = [
    [-0.72, 0.91, 1.34, 1.05],
    [-0.61, 0.90, 2.12, 1.10],
    [-0.43, 0.87, 2.72, 1.10],
    [-0.20, 0.82, 3.14, 1.04],
    [0.72, 0.91, 1.34, 1.05],
    [0.61, 0.90, 2.12, 1.10],
    [0.43, 0.87, 2.72, 1.10],
    [0.20, 0.82, 3.14, 1.04]
  ];
  for (let i = 0; i < stanchionData.length; i++) {
    const d = stanchionData[i];
    const stanchion = createCylinderBetween(
      new THREE.Vector3(d[0], d[1], d[2]),
      new THREE.Vector3(d[0], d[3], d[2]),
      0.012,
      chromeMat,
      8
    );
    stanchion.name = "bow_rail_stanchion_" + i;
    bow_rail_stanchions.add(stanchion);
  }
  bow_rail.add(bow_rail_stanchions);

  const bow_anchor = new THREE.Group();
  bow_anchor.name = "bow_anchor";
  hull_group.add(bow_anchor);

  const anchor_shank = createCylinderBetween(
    new THREE.Vector3(0, 0.66, 3.30),
    new THREE.Vector3(0, 0.39, 3.56),
    0.025,
    chromeMat,
    10
  );
  anchor_shank.name = "anchor_shank";
  bow_anchor.add(anchor_shank);

  const anchor_stock = createCylinderBetween(
    new THREE.Vector3(-0.18, 0.51, 3.49),
    new THREE.Vector3(0.18, 0.51, 3.49),
    0.020,
    chromeMat,
    10
  );
  anchor_stock.name = "anchor_stock";
  bow_anchor.add(anchor_stock);

  const anchor_left_arm = createCylinderBetween(
    new THREE.Vector3(0, 0.39, 3.56),
    new THREE.Vector3(-0.16, 0.31, 3.48),
    0.022,
    chromeMat,
    10
  );
  anchor_left_arm.name = "anchor_left_arm";
  bow_anchor.add(anchor_left_arm);

  const anchor_right_arm = createCylinderBetween(
    new THREE.Vector3(0, 0.39, 3.56),
    new THREE.Vector3(0.16, 0.31, 3.48),
    0.022,
    chromeMat,
    10
  );
  anchor_right_arm.name = "anchor_right_arm";
  bow_anchor.add(anchor_right_arm);

  const anchor_left_flukeGeom = new THREE.ConeGeometry(0.065, 0.16, 8);
  const anchor_left_fluke = new THREE.Mesh(anchor_left_flukeGeom, chromeMat);
  anchor_left_fluke.name = "anchor_left_fluke";
  anchor_left_fluke.position.set(-0.18, 0.30, 3.47);
  anchor_left_fluke.rotation.z = Math.PI / 2;
  bow_anchor.add(anchor_left_fluke);

  const anchor_right_fluke = new THREE.Mesh(anchor_left_flukeGeom, chromeMat);
  anchor_right_fluke.name = "anchor_right_fluke";
  anchor_right_fluke.position.set(0.18, 0.30, 3.47);
  anchor_right_fluke.rotation.z = -Math.PI / 2;
  bow_anchor.add(anchor_right_fluke);

  const rear_deck_hatchGeom = new THREE.BoxGeometry(0.92, 0.035, 0.58);
  const rear_deck_hatch = new THREE.Mesh(rear_deck_hatchGeom, interiorMat);
  rear_deck_hatch.name = "rear_deck_hatch";
  rear_deck_hatch.position.set(0, 1.025, -2.18);
  stern_group.add(rear_deck_hatch);

  const transom_trimGeom = new THREE.BoxGeometry(1.62, 0.06, 0.055);
  const transom_trim = new THREE.Mesh(transom_trimGeom, chromeMat);
  transom_trim.name = "transom_trim";
  transom_trim.position.set(0, 0.94, -2.52);
  stern_group.add(transom_trim);

  const outboard_engine = new THREE.Group();
  outboard_engine.name = "outboard_engine";
  stern_group.add(outboard_engine);

  const engine_mountGeom = new THREE.BoxGeometry(0.48, 0.46, 0.18);
  const engine_mount = new THREE.Mesh(engine_mountGeom, rubberMat);
  engine_mount.name = "engine_mount";
  engine_mount.position.set(0, 0.72, -2.58);
  outboard_engine.add(engine_mount);

  const engineCowlingPoints = [
    [-0.34, 0.78, -2.66],
    [0.34, 0.78, -2.66],
    [0.43, 0.88, -2.76],
    [0.44, 1.14, -2.78],
    [0.34, 1.28, -2.88],
    [-0.34, 1.28, -2.88],
    [-0.44, 1.14, -2.78],
    [-0.43, 0.88, -2.76]
  ];
  const engine_cowlingGeom = createPrismGeometry(engineCowlingPoints, 0.62);
  const engine_cowling = new THREE.Mesh(engine_cowlingGeom, brushedMat);
  engine_cowling.name = "engine_cowling";
  outboard_engine.add(engine_cowling);

  const engine_cowl_topGeom = new THREE.SphereGeometry(1, 24, 12);
  const engine_cowl_top = new THREE.Mesh(engine_cowl_topGeom, brushedMat);
  engine_cowl_top.name = "engine_cowl_top";
  engine_cowl_top.position.set(0, 1.25, -2.77);
  engine_cowl_top.scale.set(0.43, 0.12, 0.34);
  outboard_engine.add(engine_cowl_top);

  const engine_lower_legGeom = new THREE.BoxGeometry(0.24, 0.72, 0.28);
  const engine_lower_leg = new THREE.Mesh(engine_lower_legGeom, rubberMat);
  engine_lower_leg.name = "engine_lower_leg";
  engine_lower_leg.position.set(0, 0.38, -2.73);
  engine_lower_leg.rotation.x = -0.10;
  outboard_engine.add(engine_lower_leg);

  const engine_drive = createCylinderBetween(
    new THREE.Vector3(0, 0.10, -2.76),
    new THREE.Vector3(0, -0.18, -2.98),
    0.11,
    rubberMat,
    12
  );
  engine_drive.name = "engine_drive";
  outboard_engine.add(engine_drive);

  const engine_skegGeom = new THREE.BoxGeometry(0.07, 0.30, 0.24);
  const engine_skeg = new THREE.Mesh(engine_skegGeom, rubberMat);
  engine_skeg.name = "engine_skeg";
  engine_skeg.position.set(0, -0.18, -2.90);
  engine_skeg.rotation.x = -0.18;
  outboard_engine.add(engine_skeg);

  const engine_gearcaseGeom = new THREE.SphereGeometry(1, 20, 10);
  const engine_gearcase = new THREE.Mesh(engine_gearcaseGeom, rubberMat);
  engine_gearcase.name = "engine_gearcase";
  engine_gearcase.position.set(0, -0.20, -3.02);
  engine_gearcase.scale.set(0.18, 0.11, 0.30);
  outboard_engine.add(engine_gearcase);

  const engine_red_stripeGeom = new THREE.BoxGeometry(0.018, 0.045, 0.36);
  const engine_red_stripes = new THREE.Group();
  engine_red_stripes.name = "engine_red_stripes";
  for (const side of [-1, 1]) {
    const stripe = new THREE.Mesh(engine_red_stripeGeom, redAccentMat);
    stripe.position.set(side * 0.445, 0.98, -2.79);
    stripe.rotation.x = -0.18;
    stripe.name = side < 0 ? "port_engine_red_stripe" : "starboard_engine_red_stripe";
    engine_red_stripes.add(stripe);
  }
  outboard_engine.add(engine_red_stripes);

  const propeller_hubGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.30, 14);
  const propeller_hub = new THREE.Mesh(propeller_hubGeom, rubberMat);
  propeller_hub.name = "propeller_hub";
  propeller_hub.position.set(0, -0.20, -3.15);
  propeller_hub.rotation.x = Math.PI / 2;
  outboard_engine.add(propeller_hub);

  const propellerBladeShape = new THREE.Shape();
  propellerBladeShape.moveTo(-0.025, 0.045);
  propellerBladeShape.lineTo(-0.075, 0.16);
  propellerBladeShape.lineTo(-0.055, 0.34);
  propellerBladeShape.lineTo(0.055, 0.31);
  propellerBladeShape.lineTo(0.075, 0.15);
  propellerBladeShape.lineTo(0.025, 0.045);
  propellerBladeShape.closePath();

  const propeller_bladeGeom = new THREE.ExtrudeGeometry(propellerBladeShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.006,
    bevelSegments: 2
  });
  propeller_bladeGeom.translate(0, 0, -0.0175);

  const propeller_blades = new THREE.InstancedMesh(propeller_bladeGeom, rubberMat, 3);
  propeller_blades.name = "propeller_blades";
  const propellerDummy = new THREE.Object3D();
  for (let i = 0; i < 3; i++) {
    propellerDummy.position.set(0, -0.20, -3.18);
    propellerDummy.rotation.set(0, 0, i / 3 * Math.PI * 2);
    propellerDummy.updateMatrix();
    propeller_blades.setMatrixAt(i, propellerDummy.matrix);
  }
  propeller_blades.instanceMatrix.needsUpdate = true;
  outboard_engine.add(propeller_blades);

  const hull_badgeGeom = createRoundedRectGeometry(0.30, 0.075, 0.025);
  const hull_badges = new THREE.Group();
  hull_badges.name = "hull_badges";
  for (const side of [-1, 1]) {
    const badge = new THREE.Mesh(hull_badgeGeom, interiorMat);
    badge.position.set(side * 0.955, 0.76, -1.55);
    badge.rotation.y = side * Math.PI / 2;
    badge.name = side < 0 ? "port_hull_badge" : "starboard_hull_badge";
    hull_badges.add(badge);
  }
  hull_group.add(hull_badges);

  const bow_eyeGeom = new THREE.TorusGeometry(0.055, 0.012, 8, 18);
  const bow_eye = new THREE.Mesh(bow_eyeGeom, chromeMat);
  bow_eye.name = "bow_eye";
  bow_eye.position.set(0, 0.62, 3.38);
  hull_group.add(bow_eye);

  fitToUnitCube(root);
  return root;

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
}