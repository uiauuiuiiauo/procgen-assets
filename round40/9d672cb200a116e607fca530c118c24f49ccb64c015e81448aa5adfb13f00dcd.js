export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "sailing_yacht";

  const hull_group = new THREE.Group();
  hull_group.name = "hull_group";
  const deck_group = new THREE.Group();
  deck_group.name = "deck_group";
  const rig_group = new THREE.Group();
  rig_group.name = "rig_group";
  const sails_group = new THREE.Group();
  sails_group.name = "sails_group";
  root.add(hull_group, deck_group, rig_group, sails_group);

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0xf4f3ed,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const lower_hullMat = new THREE.MeshStandardMaterial({
    color: 0x10275c,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xd50032,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const sail_seamMat = new THREE.MeshStandardMaterial({
    color: 0xf06b83,
    metalness: 0.0,
    roughness: 0.95
  });
  const sail_patchMat = new THREE.MeshStandardMaterial({
    color: 0xef3155,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const mastMat = new THREE.MeshStandardMaterial({
    color: 0x24292d,
    metalness: 0.6,
    roughness: 0.5
  });
  const dark_trimMat = new THREE.MeshStandardMaterial({
    color: 0x15191c,
    metalness: 0.0,
    roughness: 0.8
  });
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0x3b3034,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0x777b7d,
    metalness: 0.0,
    roughness: 0.7
  });
  const red_lightMat = new THREE.MeshStandardMaterial({
    color: 0xd91f32,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xd91f32,
    emissiveIntensity: 1.0
  });

  function makeHorizontalExtrude(points, depth) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], -points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], -points[i][1]);
    }
    shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      bevelEnabled: false
    });
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function makeVerticalPrism(points, halfWidth) {
    const positions = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        positions.push(
          side * halfWidth, a[1], a[0],
          side * halfWidth, b[1], b[0]
        );
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function makePrismGeometry(points, width) {
    const positions = [];
    const halfWidth = width * 0.5;

    function addTriangle(a, b, c) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
    }

    function addQuad(a, b, c, d) {
      addTriangle(a, b, c);
      addTriangle(a, c, d);
    }

    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      const a = new THREE.Vector3(points[i][0], points[i][1], -halfWidth);
      const b = new THREE.Vector3(points[j][0], points[j][1], -halfWidth);
      const c = new THREE.Vector3(points[j][0], points[j][1], halfWidth);
      const d = new THREE.Vector3(points[i][0], points[i][1], halfWidth);
      addQuad(a, b, c, d);
    }

    for (let i = 1; i < points.length - 1; i++) {
      const front_a = new THREE.Vector3(points[0][0], points[0][1], halfWidth);
      const front_b = new THREE.Vector3(points[i][0], points[i][1], halfWidth);
      const front_c = new THREE.Vector3(points[i + 1][0], points[i + 1][1], halfWidth);
      addTriangle(front_a, front_b, front_c);

      const back_a = new THREE.Vector3(points[0][0], points[0][1], -halfWidth);
      const back_b = new THREE.Vector3(points[i + 1][0], points[i + 1][1], -halfWidth);
      const back_c = new THREE.Vector3(points[i][0], points[i][1], -halfWidth);
      addTriangle(back_a, back_b, back_c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function makeTube(points, radius, material, tubularSegments) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      curve,
      tubularSegments || Math.max(8, points.length * 6),
      radius,
      6,
      false
    );
    return new THREE.Mesh(geometry, material);
  }

  function makeCylinderBetween(a, b, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(b, a);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments || 10
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const hull_stations = [
    { z: -3.05, w: 0.64, deck: 0.48, water: 0.10, bottom: -0.24 },
    { z: -2.55, w: 0.88, deck: 0.50, water: 0.08, bottom: -0.48 },
    { z: -1.50, w: 1.00, deck: 0.52, water: 0.06, bottom: -0.68 },
    { z: 0.00, w: 1.05, deck: 0.54, water: 0.06, bottom: -0.76 },
    { z: 1.40, w: 0.95, deck: 0.58, water: 0.08, bottom: -0.70 },
    { z: 2.40, w: 0.62, deck: 0.65, water: 0.12, bottom: -0.45 },
    { z: 3.12, w: 0.06, deck: 0.76, water: 0.36, bottom: 0.12 }
  ];

  function createHullBandGeometry(upperAt, lowerAt) {
    const positions = [];
    const indices = [];

    for (const side of [-1, 1]) {
      const base = positions.length / 3;
      for (const station of hull_stations) {
        const upper = upperAt(station);
        const lower = lowerAt(station);
        positions.push(
          side * upper.w, upper.y, station.z,
          side * lower.w, lower.y, station.z
        );
      }

      for (let i = 0; i < hull_stations.length - 1; i++) {
        const a = base + i * 2;
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;
        if (side > 0) {
          indices.push(a, b, c, b, d, c);
        } else {
          indices.push(a, c, b, b, c, d);
        }
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

  const upper_hullGeom = createHullBandGeometry(
    (s) => ({ w: s.w, y: s.deck }),
    (s) => ({ w: s.w * 0.98, y: s.water })
  );
  const upper_hull = new THREE.Mesh(upper_hullGeom, hullMat);
  upper_hull.name = "upper_hull";
  hull_group.add(upper_hull);

  const lower_hullGeom = createHullBandGeometry(
    (s) => ({ w: s.w * 0.98, y: s.water + 0.008 }),
    (s) => ({ w: s.w * 0.28, y: s.bottom })
  );
  const lower_hull = new THREE.Mesh(lower_hullGeom, lower_hullMat);
  lower_hull.name = "lower_hull";
  hull_group.add(lower_hull);

  const deck_surfaceGeom = makeHorizontalExtrude([
    [-0.64, -3.05],
    [0.64, -3.05],
    [1.00, -1.50],
    [1.05, 0.00],
    [0.95, 1.40],
    [0.62, 2.40],
    [0.05, 3.12],
    [-0.05, 3.12],
    [-0.62, 2.40],
    [-0.95, 1.40],
    [-1.05, 0.00],
    [-1.00, -1.50]
  ], 0.10);
  const deck_surface = new THREE.Mesh(deck_surfaceGeom, hullMat);
  deck_surface.name = "deck_surface";
  deck_surface.position.y = 0.47;
  deck_group.add(deck_surface);

  const port_gunwale = makeTube([
    new THREE.Vector3(-0.64, 0.53, -3.05),
    new THREE.Vector3(-0.88, 0.55, -2.55),
    new THREE.Vector3(-1.00, 0.57, -1.50),
    new THREE.Vector3(-1.05, 0.59, 0.00),
    new THREE.Vector3(-0.95, 0.63, 1.40),
    new THREE.Vector3(-0.62, 0.70, 2.40),
    new THREE.Vector3(-0.06, 0.79, 3.12)
  ], 0.025, hullMat, 42);
  port_gunwale.name = "port_gunwale";
  hull_group.add(port_gunwale);

  const starboard_gunwale = makeTube([
    new THREE.Vector3(0.64, 0.53, -3.05),
    new THREE.Vector3(0.88, 0.55, -2.55),
    new THREE.Vector3(1.00, 0.57, -1.50),
    new THREE.Vector3(1.05, 0.59, 0.00),
    new THREE.Vector3(0.95, 0.63, 1.40),
    new THREE.Vector3(0.62, 0.70, 2.40),
    new THREE.Vector3(0.06, 0.79, 3.12)
  ], 0.025, hullMat, 42);
  starboard_gunwale.name = "starboard_gunwale";
  hull_group.add(starboard_gunwale);

  const port_rub_rail = makeTube([
    new THREE.Vector3(-0.65, 0.38, -3.03),
    new THREE.Vector3(-0.90, 0.34, -2.50),
    new THREE.Vector3(-1.02, 0.31, -1.40),
    new THREE.Vector3(-1.07, 0.30, 0.00),
    new THREE.Vector3(-0.97, 0.33, 1.40),
    new THREE.Vector3(-0.65, 0.40, 2.40),
    new THREE.Vector3(-0.08, 0.56, 3.05)
  ], 0.018, dark_trimMat, 42);
  port_rub_rail.name = "port_rub_rail";
  hull_group.add(port_rub_rail);

  const starboard_rub_rail = makeTube([
    new THREE.Vector3(0.65, 0.38, -3.03),
    new THREE.Vector3(0.90, 0.34, -2.50),
    new THREE.Vector3(1.02, 0.31, -1.40),
    new THREE.Vector3(1.07, 0.30, 0.00),
    new THREE.Vector3(0.97, 0.33, 1.40),
    new THREE.Vector3(0.65, 0.40, 2.40),
    new THREE.Vector3(0.08, 0.56, 3.05)
  ], 0.018, dark_trimMat, 42);
  starboard_rub_rail.name = "starboard_rub_rail";
  hull_group.add(starboard_rub_rail);

  const keelGeom = makeVerticalPrism([
    [-2.72, -0.40],
    [-1.95, -1.15],
    [-0.62, -1.18],
    [0.30, -0.72],
    [0.10, -0.42]
  ], 0.16);
  const keel = new THREE.Mesh(keelGeom, lower_hullMat);
  keel.name = "keel";
  hull_group.add(keel);

  const rudderGeom = makeVerticalPrism([
    [-2.92, -0.24],
    [-2.88, -0.98],
    [-2.48, -1.02],
    [-2.40, -0.32]
  ], 0.09);
  const rudder = new THREE.Mesh(rudderGeom, lower_hullMat);
  rudder.name = "rudder";
  hull_group.add(rudder);

  const cabin_shellShape = new THREE.Shape();
  cabin_shellShape.moveTo(-1.42, 0.00);
  cabin_shellShape.lineTo(1.25, 0.00);
  cabin_shellShape.lineTo(1.18, 0.17);
  cabin_shellShape.lineTo(0.72, 0.48);
  cabin_shellShape.lineTo(-0.72, 0.48);
  cabin_shellShape.lineTo(-1.10, 0.34);
  cabin_shellShape.closePath();

  const cabin_shellGeom = new THREE.ExtrudeGeometry(cabin_shellShape, {
    depth: 1.28,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  cabin_shellGeom.translate(0, 0, -0.64);
  const cabin_shell = new THREE.Mesh(cabin_shellGeom, hullMat);
  cabin_shell.name = "cabin_shell";
  cabin_shell.rotation.y = Math.PI / 2;
  cabin_shell.position.y = 0.54;
  deck_group.add(cabin_shell);

  const cabin_roofGeom = new THREE.BoxGeometry(1.48, 0.08, 1.95);
  const cabin_roof = new THREE.Mesh(cabin_roofGeom, hullMat);
  cabin_roof.name = "cabin_roof";
  cabin_roof.position.set(0, 1.055, -0.05);
  deck_group.add(cabin_roof);

  const cabin_side_windowGeom = makePrismGeometry([
    [-0.76, 0.72],
    [-0.38, 0.72],
    [-0.34, 0.96],
    [-0.66, 0.96]
  ], 0.014);
  const cabin_side_windows = new THREE.InstancedMesh(
    cabin_side_windowGeom,
    windowMat,
    4
  );
  cabin_side_windows.name = "cabin_side_windows";
  const cabin_window_matrix = new THREE.Matrix4();
  const cabin_window_quaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  const cabin_window_scale = new THREE.Vector3(1, 1, 1);
  let cabin_window_index = 0;
  for (const side of [-1, 1]) {
    for (const zOffset of [0, 0.78]) {
      cabin_window_matrix.compose(
        new THREE.Vector3(side * 0.652, 0, zOffset),
        cabin_window_quaternion,
        cabin_window_scale
      );
      cabin_side_windows.setMatrixAt(cabin_window_index++, cabin_window_matrix);
    }
  }
  cabin_side_windows.instanceMatrix.needsUpdate = true;
  deck_group.add(cabin_side_windows);

  const cabin_front_windowGeom = makePrismGeometry([
    [-0.50, 0.72],
    [0.50, 0.72],
    [0.43, 0.96],
    [-0.43, 0.96]
  ], 0.014);
  const cabin_front_window = new THREE.Mesh(
    cabin_front_windowGeom,
    windowMat
  );
  cabin_front_window.name = "cabin_front_window";
  cabin_front_window.position.z = 1.225;
  deck_group.add(cabin_front_window);

  const cabin_hatchGeom = new THREE.BoxGeometry(0.50, 0.025, 0.42);
  const cabin_hatches = new THREE.InstancedMesh(
    cabin_hatchGeom,
    windowMat,
    2
  );
  cabin_hatches.name = "cabin_hatches";
  const hatch_matrix = new THREE.Matrix4();
  const hatch_quaternion = new THREE.Quaternion();
  hatch_matrix.compose(
    new THREE.Vector3(0, 1.112, -0.55),
    hatch_quaternion,
    cabin_window_scale
  );
  cabin_hatches.setMatrixAt(0, hatch_matrix);
  hatch_matrix.compose(
    new THREE.Vector3(0, 1.112, 0.48),
    hatch_quaternion,
    cabin_window_scale
  );
  cabin_hatches.setMatrixAt(1, hatch_matrix);
  cabin_hatches.instanceMatrix.needsUpdate = true;
  deck_group.add(cabin_hatches);

  const foredeck_hatchGeom = new THREE.BoxGeometry(0.62, 0.025, 0.48);
  const foredeck_hatch = new THREE.Mesh(foredeck_hatchGeom, windowMat);
  foredeck_hatch.name = "foredeck_hatch";
  foredeck_hatch.position.set(0, 0.635, 1.72);
  foredeck_hatch.rotation.x = -0.04;
  deck_group.add(foredeck_hatch);

  const cockpit_wellGeom = new THREE.BoxGeometry(1.18, 0.035, 0.82);
  const cockpit_well = new THREE.Mesh(cockpit_wellGeom, dark_trimMat);
  cockpit_well.name = "cockpit_well";
  cockpit_well.position.set(0, 0.59, -2.10);
  deck_group.add(cockpit_well);

  const cockpit_benchGeom = new THREE.BoxGeometry(0.24, 0.10, 0.86);
  const cockpit_benches = new THREE.InstancedMesh(
    cockpit_benchGeom,
    hullMat,
    2
  );
  cockpit_benches.name = "cockpit_benches";
  const bench_matrix = new THREE.Matrix4();
  bench_matrix.makeTranslation(-0.69, 0.65, -2.10);
  cockpit_benches.setMatrixAt(0, bench_matrix);
  bench_matrix.makeTranslation(0.69, 0.65, -2.10);
  cockpit_benches.setMatrixAt(1, bench_matrix);
  cockpit_benches.instanceMatrix.needsUpdate = true;
  deck_group.add(cockpit_benches);

  const tiller = makeCylinderBetween(
    new THREE.Vector3(0, 0.72, -2.72),
    new THREE.Vector3(0, 0.78, -1.92),
    0.035,
    mastMat,
    10
  );
  tiller.name = "tiller";
  deck_group.add(tiller);

  const mastGeom = new THREE.CylinderGeometry(0.075, 0.09, 5.60, 16);
  const mast = new THREE.Mesh(mastGeom, mastMat);
  mast.name = "mast";
  mast.position.set(0, 3.34, 0.04);
  rig_group.add(mast);

  const mast_trackGeom = new THREE.BoxGeometry(0.024, 5.25, 0.025);
  const mast_track = new THREE.Mesh(mast_trackGeom, silverMat);
  mast_track.name = "mast_track";
  mast_track.position.set(0.078, 3.28, -0.015);
  rig_group.add(mast_track);

  const mast_baseGeom = new THREE.CylinderGeometry(0.13, 0.14, 0.12, 16);
  const mast_base = new THREE.Mesh(mast_baseGeom, silverMat);
  mast_base.name = "mast_base";
  mast_base.position.set(0, 0.61, 0.04);
  rig_group.add(mast_base);

  const mastheadGeom = new THREE.CylinderGeometry(0.035, 0.045, 0.18, 10);
  const masthead = new THREE.Mesh(mastheadGeom, mastMat);
  masthead.name = "masthead";
  masthead.position.set(0, 6.23, 0.04);
  rig_group.add(masthead);

  const boomGeom = new THREE.CylinderGeometry(0.072, 0.078, 2.82, 16);
  const boom = new THREE.Mesh(boomGeom, mastMat);
  boom.name = "boom";
  boom.rotation.x = Math.PI / 2;
  boom.position.set(0, 1.56, -1.31);
  rig_group.add(boom);

  const boom_end_capGeom = new THREE.SphereGeometry(0.082, 12, 8);
  const boom_end_caps = new THREE.InstancedMesh(
    boom_end_capGeom,
    dark_trimMat,
    2
  );
  boom_end_caps.name = "boom_end_caps";
  const boom_cap_matrix = new THREE.Matrix4();
  boom_cap_matrix.makeTranslation(0, 1.56, -2.72);
  boom_end_caps.setMatrixAt(0, boom_cap_matrix);
  boom_cap_matrix.makeTranslation(0, 1.56, 0.10);
  boom_end_caps.setMatrixAt(1, boom_cap_matrix);
  boom_end_caps.instanceMatrix.needsUpdate = true;
  rig_group.add(boom_end_caps);

  const boom_bandsGeom = new THREE.TorusGeometry(0.079, 0.009, 6, 16);
  const boom_bands = new THREE.InstancedMesh(boom_bandsGeom, silverMat, 2);
  boom_bands.name = "boom_bands";
  const boom_band_matrix = new THREE.Matrix4();
  boom_band_matrix.makeTranslation(0, 1.56, -1.82);
  boom_bands.setMatrixAt(0, boom_band_matrix);
  boom_band_matrix.makeTranslation(0, 1.56, -0.35);
  boom_bands.setMatrixAt(1, boom_band_matrix);
  boom_bands.instanceMatrix.needsUpdate = true;
  rig_group.add(boom_bands);

  const spreader_bar = makeCylinderBetween(
    new THREE.Vector3(-0.48, 3.28, 0.04),
    new THREE.Vector3(0.48, 3.28, 0.04),
    0.025,
    mastMat,
    10
  );
  spreader_bar.name = "spreader_bar";
  rig_group.add(spreader_bar);

  const upper_spreader = makeCylinderBetween(
    new THREE.Vector3(-0.31, 4.72, 0.04),
    new THREE.Vector3(0.31, 4.72, 0.04),
    0.018,
    mastMat,
    8
  );
  upper_spreader.name = "upper_spreader";
  rig_group.add(upper_spreader);

  const mainsailGeom = makePrismGeometry([
    [-2.55, 1.64],
    [-0.08, 1.64],
    [-0.08, 5.56],
    [-0.45, 5.40],
    [-1.45, 3.08]
  ], 0.026);
  const mainsail = new THREE.Mesh(mainsailGeom, sailMat);
  mainsail.name = "mainsail";
  mainsail.position.x = 0.025;
  sails_group.add(mainsail);

  const jibGeom = makePrismGeometry([
    [0.18, 1.64],
    [2.72, 1.73],
    [0.10, 5.48]
  ], 0.026);
  const jib = new THREE.Mesh(jibGeom, sailMat);
  jib.name = "jib";
  jib.position.x = 0.035;
  sails_group.add(jib);

  const mainsail_lower_seam = makeTube([
    new THREE.Vector3(0.047, 2.55, -2.20),
    new THREE.Vector3(0.047, 2.55, -0.08)
  ], 0.007, sail_seamMat, 12);
  mainsail_lower_seam.name = "mainsail_lower_seam";
  sails_group.add(mainsail_lower_seam);

  const mainsail_middle_seam = makeTube([
    new THREE.Vector3(0.047, 3.55, -1.65),
    new THREE.Vector3(0.047, 3.55, -0.08)
  ], 0.007, sail_seamMat, 12);
  mainsail_middle_seam.name = "mainsail_middle_seam";
  sails_group.add(mainsail_middle_seam);

  const mainsail_upper_seam = makeTube([
    new THREE.Vector3(0.047, 4.55, -1.02),
    new THREE.Vector3(0.047, 4.55, -0.08)
  ], 0.007, sail_seamMat, 12);
  mainsail_upper_seam.name = "mainsail_upper_seam";
  sails_group.add(mainsail_upper_seam);

  const mainsail_reinforcementGeom = new THREE.PlaneGeometry(0.48, 0.18);
  const mainsail_reinforcement = new THREE.Mesh(
    mainsail_reinforcementGeom,
    sail_patchMat
  );
  mainsail_reinforcement.name = "mainsail_reinforcement";
  mainsail_reinforcement.rotation.y = Math.PI / 2;
  mainsail_reinforcement.position.set(0.048, 1.88, -2.20);
  sails_group.add(mainsail_reinforcement);

  const jib_lower_seam = makeTube([
    new THREE.Vector3(0.057, 2.55, 0.22),
    new THREE.Vector3(0.057, 2.55, 2.02)
  ], 0.007, sail_seamMat, 12);
  jib_lower_seam.name = "jib_lower_seam";
  sails_group.add(jib_lower_seam);

  const jib_middle_seam = makeTube([
    new THREE.Vector3(0.057, 3.55, 0.20),
    new THREE.Vector3(0.057, 3.55, 1.28)
  ], 0.007, sail_seamMat, 12);
  jib_middle_seam.name = "jib_middle_seam";
  sails_group.add(jib_middle_seam);

  const jib_reinforcementGeom = new THREE.PlaneGeometry(0.38, 0.16);
  const jib_reinforcement = new THREE.Mesh(
    jib_reinforcementGeom,
    sail_patchMat
  );
  jib_reinforcement.name = "jib_reinforcement";
  jib_reinforcement.rotation.y = Math.PI / 2;
  jib_reinforcement.position.set(0.058, 1.91, 2.48);
  sails_group.add(jib_reinforcement);

  const mainsail_leech_rope = makeTube([
    new THREE.Vector3(0.055, 5.56, -0.08),
    new THREE.Vector3(0.055, 1.64, -0.08)
  ], 0.008, ropeMat, 16);
  mainsail_leech_rope.name = "mainsail_leech_rope";
  rig_group.add(mainsail_leech_rope);

  const mainsail_tack_rope = makeTube([
    new THREE.Vector3(0.055, 1.64, -2.55),
    new THREE.Vector3(0.055, 0.61, -2.88)
  ], 0.008, ropeMat, 12);
  mainsail_tack_rope.name = "mainsail_tack_rope";
  rig_group.add(mainsail_tack_rope);

  const jib_foot_rope = makeTube([
    new THREE.Vector3(0.055, 1.73, 2.72),
    new THREE.Vector3(0.055, 0.72, 2.92)
  ], 0.008, ropeMat, 12);
  jib_foot_rope.name = "jib_foot_rope";
  rig_group.add(jib_foot_rope);

  const forestay = makeTube([
    new THREE.Vector3(0, 6.08, 0.04),
    new THREE.Vector3(0, 0.78, 3.00)
  ], 0.009, ropeMat, 24);
  forestay.name = "forestay";
  rig_group.add(forestay);

  const backstay = makeTube([
    new THREE.Vector3(0, 6.08, 0.04),
    new THREE.Vector3(0, 0.68, -2.92)
  ], 0.009, ropeMat, 24);
  backstay.name = "backstay";
  rig_group.add(backstay);

  const port_shroud = makeTube([
    new THREE.Vector3(0, 5.72, 0.04),
    new THREE.Vector3(-0.48, 3.28, 0.04),
    new THREE.Vector3(-1.00, 0.61, -0.18)
  ], 0.009, ropeMat, 24);
  port_shroud.name = "port_shroud";
  rig_group.add(port_shroud);

  const starboard_shroud = makeTube([
    new THREE.Vector3(0, 5.72, 0.04),
    new THREE.Vector3(0.48, 3.28, 0.04),
    new THREE.Vector3(1.00, 0.61, -0.18)
  ], 0.009, ropeMat, 24);
  starboard_shroud.name = "starboard_shroud";
  rig_group.add(starboard_shroud);

  const halyard = makeTube([
    new THREE.Vector3(0.10, 6.06, 0.04),
    new THREE.Vector3(0.10, 0.65, 0.04)
  ], 0.006, ropeMat, 18);
  halyard.name = "halyard";
  rig_group.add(halyard);

  const mast_instrumentGeom = new THREE.CylinderGeometry(
    0.085,
    0.085,
    0.13,
    14
  );
  const mast_instrument = new THREE.Mesh(
    mast_instrumentGeom,
    hullMat
  );
  mast_instrument.name = "mast_instrument";
  mast_instrument.position.set(0.10, 3.25, 0.04);
  rig_group.add(mast_instrument);

  const mast_instrument_bandGeom = new THREE.CylinderGeometry(
    0.09,
    0.09,
    0.025,
    14
  );
  const mast_instrument_band = new THREE.Mesh(
    mast_instrument_bandGeom,
    silverMat
  );
  mast_instrument_band.name = "mast_instrument_band";
  mast_instrument_band.position.set(0.10, 3.25, 0.04);
  rig_group.add(mast_instrument_band);

  const wind_vane = makeCylinderBetween(
    new THREE.Vector3(0, 6.30, -0.25),
    new THREE.Vector3(0, 6.30, 0.35),
    0.012,
    mastMat,
    8
  );
  wind_vane.name = "wind_vane";
  rig_group.add(wind_vane);

  const wind_arrowGeom = new THREE.ConeGeometry(0.045, 0.16, 8);
  const wind_arrow = new THREE.Mesh(wind_arrowGeom, mastMat);
  wind_arrow.name = "wind_arrow";
  wind_arrow.rotation.x = Math.PI / 2;
  wind_arrow.position.set(0, 6.30, 0.42);
  rig_group.add(wind_arrow);

  const navigation_lightGeom = new THREE.SphereGeometry(0.045, 12, 8);
  const navigation_light = new THREE.Mesh(
    navigation_lightGeom,
    red_lightMat
  );
  navigation_light.name = "navigation_light";
  navigation_light.position.set(-0.10, 6.28, 0.04);
  rig_group.add(navigation_light);

  const antenna = makeTube([
    new THREE.Vector3(0.04, 6.20, 0.04),
    new THREE.Vector3(0.30, 6.55, 0.04)
  ], 0.008, mastMat, 8);
  antenna.name = "antenna";
  rig_group.add(antenna);

  const stanchion_positions = [
    [-0.82, 0.55, -2.55],
    [0.82, 0.55, -2.55],
    [-0.98, 0.57, -1.55],
    [0.98, 0.57, -1.55],
    [-1.02, 0.59, -0.45],
    [1.02, 0.59, -0.45],
    [-0.98, 0.61, 0.65],
    [0.98, 0.61, 0.65],
    [-0.82, 0.66, 1.62],
    [0.82, 0.66, 1.62],
    [-0.52, 0.72, 2.45],
    [0.52, 0.72, 2.45]
  ];
  const deck_stanchionsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.38,
    8
  );
  const deck_stanchions = new THREE.InstancedMesh(
    deck_stanchionsGeom,
    silverMat,
    stanchion_positions.length
  );
  deck_stanchions.name = "deck_stanchions";
  const stanchion_matrix = new THREE.Matrix4();
  for (let i = 0; i < stanchion_positions.length; i++) {
    const p = stanchion_positions[i];
    stanchion_matrix.makeTranslation(p[0], p[1] + 0.19, p[2]);
    deck_stanchions.setMatrixAt(i, stanchion_matrix);
  }
  deck_stanchions.instanceMatrix.needsUpdate = true;
  deck_group.add(deck_stanchions);

  const port_lifeline = makeTube([
    new THREE.Vector3(-0.82, 0.89, -2.55),
    new THREE.Vector3(-0.98, 0.91, -1.55),
    new THREE.Vector3(-1.02, 0.93, -0.45),
    new THREE.Vector3(-0.98, 0.95, 0.65),
    new THREE.Vector3(-0.82, 1.00, 1.62),
    new THREE.Vector3(-0.52, 1.06, 2.45),
    new THREE.Vector3(-0.08, 1.12, 3.00)
  ], 0.008, ropeMat, 42);
  port_lifeline.name = "port_lifeline";
  deck_group.add(port_lifeline);

  const starboard_lifeline = makeTube([
    new THREE.Vector3(0.82, 0.89, -2.55),
    new THREE.Vector3(0.98, 0.91, -1.55),
    new THREE.Vector3(1.02, 0.93, -0.45),
    new THREE.Vector3(0.98, 0.95, 0.65),
    new THREE.Vector3(0.82, 1.00, 1.62),
    new THREE.Vector3(0.52, 1.06, 2.45),
    new THREE.Vector3(0.08, 1.12, 3.00)
  ], 0.008, ropeMat, 42);
  starboard_lifeline.name = "starboard_lifeline";
  deck_group.add(starboard_lifeline);

  const bow_pulpit = makeTube([
    new THREE.Vector3(-0.52, 1.06, 2.45),
    new THREE.Vector3(-0.35, 1.18, 2.82),
    new THREE.Vector3(0, 1.22, 3.08),
    new THREE.Vector3(0.35, 1.18, 2.82),
    new THREE.Vector3(0.52, 1.06, 2.45)
  ], 0.018, silverMat, 24);
  bow_pulpit.name = "bow_pulpit";
  deck_group.add(bow_pulpit);

  const stern_guard = makeTube([
    new THREE.Vector3(-0.82, 0.89, -2.55),
    new THREE.Vector3(-0.72, 1.05, -2.82),
    new THREE.Vector3(0, 1.08, -3.00),
    new THREE.Vector3(0.72, 1.05, -2.82),
    new THREE.Vector3(0.82, 0.89, -2.55)
  ], 0.016, silverMat, 24);
  stern_guard.name = "stern_guard";
  deck_group.add(stern_guard);

  const bow_roller = makeCylinderBetween(
    new THREE.Vector3(-0.10, 0.78, 2.98),
    new THREE.Vector3(0.10, 0.78, 2.98),
    0.035,
    silverMat,
    10
  );
  bow_roller.name = "bow_roller";
  deck_group.add(bow_roller);

  const deck_cleatsGeom = new THREE.BoxGeometry(0.16, 0.035, 0.045);
  const deck_cleats = new THREE.InstancedMesh(
    deck_cleatsGeom,
    silverMat,
    4
  );
  deck_cleats.name = "deck_cleats";
  const cleat_positions = [
    [-0.55, 0.69, -2.35],
    [0.55, 0.69, -2.35],
    [-0.48, 0.75, 2.25],
    [0.48, 0.75, 2.25]
  ];
  const cleat_matrix = new THREE.Matrix4();
  for (let i = 0; i < cleat_positions.length; i++) {
    const p = cleat_positions[i];
    cleat_matrix.makeTranslation(p[0], p[1], p[2]);
    deck_cleats.setMatrixAt(i, cleat_matrix);
  }
  deck_cleats.instanceMatrix.needsUpdate = true;
  deck_group.add(deck_cleats);

  fitToUnitCube(THREE, root);
  return root;

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
}