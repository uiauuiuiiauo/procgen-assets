export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "glass_flame_sculpture";

  const metal_stand = new THREE.Group();
  metal_stand.name = "metal_stand";
  root.add(metal_stand);

  const flame_assembly = new THREE.Group();
  flame_assembly.name = "flame_assembly";
  root.add(flame_assembly);

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171918,
    metalness: 0.0,
    roughness: 0.8,
  });

  const glass_flameMat = new THREE.MeshPhysicalMaterial({
    color: 0x16c9b8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    thickness: 0.35,
    attenuationColor: 0x008f7d,
    attenuationDistance: 0.8,
    side: THREE.DoubleSide,
  });

  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xc8fff7,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
  });

  const base_rubber_padGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.018, 64);
  const base_rubber_pad = new THREE.Mesh(base_rubber_padGeom, rubberMat);
  base_rubber_pad.name = "base_rubber_pad";
  base_rubber_pad.position.y = 0.009;
  metal_stand.add(base_rubber_pad);

  const base_plateProfile = [
    new THREE.Vector2(0.00, 0.018),
    new THREE.Vector2(0.34, 0.018),
    new THREE.Vector2(0.405, 0.025),
    new THREE.Vector2(0.435, 0.045),
    new THREE.Vector2(0.440, 0.064),
    new THREE.Vector2(0.420, 0.086),
    new THREE.Vector2(0.345, 0.104),
    new THREE.Vector2(0.175, 0.112),
    new THREE.Vector2(0.00, 0.112),
  ];
  const base_plateGeom = new THREE.LatheGeometry(base_plateProfile, 64);
  const base_plate = new THREE.Mesh(base_plateGeom, brushed_metalMat);
  base_plate.name = "base_plate";
  metal_stand.add(base_plate);

  const base_edge_ringGeom = new THREE.TorusGeometry(0.416, 0.011, 10, 64);
  const base_edge_ring = new THREE.Mesh(base_edge_ringGeom, polished_metalMat);
  base_edge_ring.name = "base_edge_ring";
  base_edge_ring.rotation.x = Math.PI / 2;
  base_edge_ring.position.y = 0.056;
  metal_stand.add(base_edge_ring);

  const pedestal_stemProfile = [
    new THREE.Vector2(0.00, 0.090),
    new THREE.Vector2(0.155, 0.090),
    new THREE.Vector2(0.135, 0.125),
    new THREE.Vector2(0.105, 0.175),
    new THREE.Vector2(0.083, 0.270),
    new THREE.Vector2(0.074, 0.405),
    new THREE.Vector2(0.078, 0.555),
    new THREE.Vector2(0.092, 0.675),
    new THREE.Vector2(0.122, 0.755),
    new THREE.Vector2(0.148, 0.790),
    new THREE.Vector2(0.00, 0.790),
  ];
  const pedestal_stemGeom = new THREE.LatheGeometry(pedestal_stemProfile, 64);
  const pedestal_stem = new THREE.Mesh(pedestal_stemGeom, brushed_metalMat);
  pedestal_stem.name = "pedestal_stem";
  metal_stand.add(pedestal_stem);

  const support_cupProfile = [
    new THREE.Vector2(0.00, 0.735),
    new THREE.Vector2(0.105, 0.735),
    new THREE.Vector2(0.155, 0.765),
    new THREE.Vector2(0.220, 0.815),
    new THREE.Vector2(0.280, 0.885),
    new THREE.Vector2(0.318, 0.975),
    new THREE.Vector2(0.335, 1.080),
    new THREE.Vector2(0.335, 1.185),
    new THREE.Vector2(0.320, 1.270),
    new THREE.Vector2(0.285, 1.315),
    new THREE.Vector2(0.00, 1.315),
  ];
  const support_cupGeom = new THREE.LatheGeometry(support_cupProfile, 64);
  const support_cup = new THREE.Mesh(support_cupGeom, brushed_metalMat);
  support_cup.name = "support_cup";
  metal_stand.add(support_cup);

  const cup_top_flangeGeom = new THREE.CylinderGeometry(0.355, 0.325, 0.052, 64);
  const cup_top_flange = new THREE.Mesh(cup_top_flangeGeom, brushed_metalMat);
  cup_top_flange.name = "cup_top_flange";
  cup_top_flange.position.y = 1.306;
  metal_stand.add(cup_top_flange);

  const cup_rimGeom = new THREE.TorusGeometry(0.337, 0.018, 12, 64);
  const cup_rim = new THREE.Mesh(cup_rimGeom, polished_metalMat);
  cup_rim.name = "cup_rim";
  cup_rim.rotation.x = Math.PI / 2;
  cup_rim.position.y = 1.327;
  metal_stand.add(cup_rim);

  const upper_collarGeom = new THREE.CylinderGeometry(0.282, 0.300, 0.082, 64);
  const upper_collar = new THREE.Mesh(upper_collarGeom, brushed_metalMat);
  upper_collar.name = "upper_collar";
  upper_collar.position.y = 1.365;
  metal_stand.add(upper_collar);

  const collar_trimGeom = new THREE.TorusGeometry(0.276, 0.010, 10, 64);
  const collar_trim = new THREE.Mesh(collar_trimGeom, polished_metalMat);
  collar_trim.name = "collar_trim";
  collar_trim.rotation.x = Math.PI / 2;
  collar_trim.position.y = 1.405;
  metal_stand.add(collar_trim);

  const glass_seat_ringGeom = new THREE.TorusGeometry(0.224, 0.012, 10, 64);
  const glass_seat_ring = new THREE.Mesh(glass_seat_ringGeom, rubberMat);
  glass_seat_ring.name = "glass_seat_ring";
  glass_seat_ring.rotation.x = Math.PI / 2;
  glass_seat_ring.position.y = 1.414;
  metal_stand.add(glass_seat_ring);

  function createFlameGeometry() {
    const rings = [
      { y: 1.390, cx: 0.000, rx: 0.080, rz: 0.070 },
      { y: 1.420, cx: 0.000, rx: 0.180, rz: 0.145 },
      { y: 1.500, cx: -0.005, rx: 0.280, rz: 0.225 },
      { y: 1.620, cx: -0.015, rx: 0.350, rz: 0.275 },
      { y: 1.780, cx: -0.025, rx: 0.380, rz: 0.300 },
      { y: 1.960, cx: -0.035, rx: 0.370, rz: 0.290 },
      { y: 2.140, cx: -0.050, rx: 0.320, rz: 0.255 },
      { y: 2.320, cx: -0.075, rx: 0.250, rz: 0.205 },
      { y: 2.500, cx: -0.095, rx: 0.190, rz: 0.155 },
      { y: 2.680, cx: -0.105, rx: 0.145, rz: 0.120 },
      { y: 2.860, cx: -0.095, rx: 0.110, rz: 0.090 },
      { y: 3.040, cx: -0.070, rx: 0.085, rz: 0.070 },
      { y: 3.200, cx: -0.045, rx: 0.060, rz: 0.050 },
      { y: 3.340, cx: -0.030, rx: 0.035, rz: 0.030 },
      { y: 3.430, cx: -0.035, rx: 0.002, rz: 0.002 },
    ];
    const radialSegments = 48;
    const positions = [];
    const indices = [];

    for (const ring of rings) {
      for (let j = 0; j < radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        positions.push(
          ring.cx + Math.cos(angle) * ring.rx,
          ring.y,
          Math.sin(angle) * ring.rz
        );
      }
    }

    for (let i = 0; i < rings.length - 1; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const next = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = i * radialSegments + next;
        const c = (i + 1) * radialSegments + next;
        const d = (i + 1) * radialSegments + j;
        indices.push(a, d, b, b, d, c);
      }
    }

    const bottomCenter = positions.length / 3;
    positions.push(0, rings[0].y, 0);
    for (let j = 0; j < radialSegments; j++) {
      indices.push(bottomCenter, j, (j + 1) % radialSegments);
    }

    const topCenter = positions.length / 3;
    const topRingStart = (rings.length - 1) * radialSegments;
    positions.push(rings[rings.length - 1].cx, rings[rings.length - 1].y + 0.012, 0);
    for (let j = 0; j < radialSegments; j++) {
      const next = (j + 1) % radialSegments;
      indices.push(topCenter, topRingStart + next, topRingStart + j);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const glass_flameGeom = createFlameGeometry();
  const glass_flame = new THREE.Mesh(glass_flameGeom, glass_flameMat);
  glass_flame.name = "glass_flame";
  flame_assembly.add(glass_flame);

  function createHighlightGeometry(points, radius) {
    const path = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(path, 32, radius, 8, false);
  }

  const left_glass_highlightGeom = createHighlightGeometry([
    new THREE.Vector3(-0.175, 1.575, 0.286),
    new THREE.Vector3(-0.205, 1.790, 0.292),
    new THREE.Vector3(-0.190, 2.030, 0.278),
    new THREE.Vector3(-0.155, 2.280, 0.235),
    new THREE.Vector3(-0.125, 2.520, 0.177),
    new THREE.Vector3(-0.095, 2.750, 0.128),
    new THREE.Vector3(-0.070, 2.970, 0.091),
    new THREE.Vector3(-0.052, 3.170, 0.064),
  ], 0.013);
  const left_glass_highlight = new THREE.Mesh(left_glass_highlightGeom, glass_highlightMat);
  left_glass_highlight.name = "left_glass_highlight";
  flame_assembly.add(left_glass_highlight);

  const right_glass_highlightGeom = createHighlightGeometry([
    new THREE.Vector3(0.205, 1.620, 0.258),
    new THREE.Vector3(0.245, 1.830, 0.268),
    new THREE.Vector3(0.235, 2.050, 0.247),
    new THREE.Vector3(0.190, 2.270, 0.214),
    new THREE.Vector3(0.135, 2.470, 0.170),
  ], 0.017);
  const right_glass_highlight = new THREE.Mesh(right_glass_highlightGeom, glass_highlightMat);
  right_glass_highlight.name = "right_glass_highlight";
  flame_assembly.add(right_glass_highlight);

  const tip_glass_highlightGeom = createHighlightGeometry([
    new THREE.Vector3(-0.005, 2.900, 0.101),
    new THREE.Vector3(-0.010, 3.050, 0.084),
    new THREE.Vector3(-0.015, 3.190, 0.061),
    new THREE.Vector3(-0.030, 3.310, 0.037),
  ], 0.007);
  const tip_glass_highlight = new THREE.Mesh(tip_glass_highlightGeom, glass_highlightMat);
  tip_glass_highlight.name = "tip_glass_highlight";
  flame_assembly.add(tip_glass_highlight);

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