export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "frosted_bottle_with_crystal";

  const bottle_group = new THREE.Group();
  bottle_group.name = "bottle_group";
  root.add(bottle_group);

  const stopper_group = new THREE.Group();
  stopper_group.name = "stopper_group";
  root.add(stopper_group);

  const crystal_group = new THREE.Group();
  crystal_group.name = "crystal_group";
  crystal_group.position.set(0.018, 2.67, 0);
  crystal_group.rotation.y = -0.12;
  stopper_group.add(crystal_group);

  const bottle_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xe5e9e1,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.94
  });

  const bottle_lipMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8ddd4,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.96
  });

  const crystal_stopperMat = new THREE.MeshPhysicalMaterial({
    color: 0xfff7f3,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    flatShading: true
  });

  const crystal_rose_patchMat = new THREE.MeshStandardMaterial({
    color: 0xd8aaa5,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.2,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const crystal_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.24,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const crystal_inclusionMat = new THREE.MeshStandardMaterial({
    color: 0xf2dfd5,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.470, 0.000),
    new THREE.Vector2(0.520, 0.015),
    new THREE.Vector2(0.560, 0.055),
    new THREE.Vector2(0.580, 0.120),
    new THREE.Vector2(0.585, 0.220),
    new THREE.Vector2(0.585, 1.680),
    new THREE.Vector2(0.580, 1.790),
    new THREE.Vector2(0.560, 1.900),
    new THREE.Vector2(0.520, 2.010),
    new THREE.Vector2(0.470, 2.100),
    new THREE.Vector2(0.400, 2.180),
    new THREE.Vector2(0.330, 2.240),
    new THREE.Vector2(0.285, 2.310),
    new THREE.Vector2(0.265, 2.390),
    new THREE.Vector2(0.265, 2.650),
    new THREE.Vector2(0.240, 2.670),
    new THREE.Vector2(0.000, 2.670)
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.name = "bottle_body";
  bottle_group.add(bottle_body);

  const bottle_lipProfile = [
    new THREE.Vector2(0.235, 2.570),
    new THREE.Vector2(0.285, 2.570),
    new THREE.Vector2(0.325, 2.595),
    new THREE.Vector2(0.345, 2.635),
    new THREE.Vector2(0.345, 2.755),
    new THREE.Vector2(0.330, 2.790),
    new THREE.Vector2(0.295, 2.815),
    new THREE.Vector2(0.240, 2.815),
    new THREE.Vector2(0.225, 2.785),
    new THREE.Vector2(0.225, 2.620),
    new THREE.Vector2(0.235, 2.570)
  ];
  const bottle_lipGeom = new THREE.LatheGeometry(bottle_lipProfile, 64);
  const bottle_lip = new THREE.Mesh(bottle_lipGeom, bottle_lipMat);
  bottle_lip.name = "bottle_lip";
  bottle_group.add(bottle_lip);

  const crystal_stopperGeom = new THREE.BufferGeometry();
  const crystal_positions = [];

  function addCrystalTriangle(a, b, c) {
    crystal_positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
  }

  function makeRing(width, depth, y, cornerCut, phase) {
    if (phase === 0) {
      return [
        new THREE.Vector3(-width / 2 + cornerCut, y, -depth / 2),
        new THREE.Vector3(width / 2 - cornerCut, y, -depth / 2),
        new THREE.Vector3(width / 2, y, -depth / 2 + cornerCut),
        new THREE.Vector3(width / 2, y, depth / 2 - cornerCut),
        new THREE.Vector3(width / 2 - cornerCut, y, depth / 2),
        new THREE.Vector3(-width / 2 + cornerCut, y, depth / 2),
        new THREE.Vector3(-width / 2, y, depth / 2 - cornerCut),
        new THREE.Vector3(-width / 2, y, -depth / 2 + cornerCut)
      ];
    }
    return [
      new THREE.Vector3(-width / 2 + cornerCut * 0.6, y, -depth / 2),
      new THREE.Vector3(width / 2 - cornerCut * 1.2, y, -depth / 2 + 0.012),
      new THREE.Vector3(width / 2, y, -depth / 2 + cornerCut * 1.4),
      new THREE.Vector3(width / 2 - 0.012, y, depth / 2 - cornerCut * 0.5),
      new THREE.Vector3(width / 2 - cornerCut * 1.1, y, depth / 2),
      new THREE.Vector3(-width / 2 + cornerCut * 1.4, y, depth / 2 - 0.010),
      new THREE.Vector3(-width / 2, y, depth / 2 - cornerCut * 1.2),
      new THREE.Vector3(-width / 2 + 0.010, y, -depth / 2 + cornerCut * 0.7)
    ];
  }

  const crystal_bottom_ring = makeRing(0.340, 0.270, 0.000, 0.042, 0);
  const crystal_upper_ring = makeRing(0.480, 0.360, 0.520, 0.060, 1);
  const crystal_top_ring = crystal_upper_ring.map(
    (point) => new THREE.Vector3(point.x * 0.98, 0.600, point.z * 0.98)
  );
  const crystal_bottom_center = new THREE.Vector3(0, 0, 0);
  const crystal_top_center = new THREE.Vector3(0.008, 0.600, -0.004);

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addCrystalTriangle(
      crystal_bottom_center,
      crystal_bottom_ring[next],
      crystal_bottom_ring[i]
    );

    addCrystalTriangle(
      crystal_bottom_ring[i],
      crystal_bottom_ring[next],
      crystal_upper_ring[next]
    );
    addCrystalTriangle(
      crystal_bottom_ring[i],
      crystal_upper_ring[next],
      crystal_upper_ring[i]
    );

    addCrystalTriangle(
      crystal_upper_ring[i],
      crystal_upper_ring[next],
      crystal_top_ring[next]
    );
    addCrystalTriangle(
      crystal_upper_ring[i],
      crystal_top_ring[next],
      crystal_top_ring[i]
    );

    addCrystalTriangle(
      crystal_top_center,
      crystal_top_ring[i],
      crystal_top_ring[next]
    );
  }

  crystal_positions[15] += 0.026;
  crystal_positions[18] -= 0.018;
  crystal_positions[48] += 0.020;
  crystal_positions[51] -= 0.012;

  crystal_stopperGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(crystal_positions, 3)
  );
  crystal_stopperGeom.computeVertexNormals();

  const crystal_stopper = new THREE.Mesh(
    crystal_stopperGeom,
    crystal_stopperMat
  );
  crystal_stopper.name = "crystal_stopper";
  crystal_group.add(crystal_stopper);

  const crystal_rose_patchGeom = new THREE.CircleGeometry(0.072, 20);
  const crystal_rose_patch = new THREE.Mesh(
    crystal_rose_patchGeom,
    crystal_rose_patchMat
  );
  crystal_rose_patch.name = "crystal_rose_patch";
  crystal_rose_patch.position.set(-0.090, 0.405, 0.166);
  crystal_rose_patch.rotation.z = -0.35;
  crystal_rose_patch.scale.set(0.72, 1.35, 1);
  crystal_group.add(crystal_rose_patch);

  const crystal_highlightGeom = new THREE.CircleGeometry(0.055, 18);
  const crystal_highlight = new THREE.Mesh(
    crystal_highlightGeom,
    crystal_highlightMat
  );
  crystal_highlight.name = "crystal_highlight";
  crystal_highlight.position.set(0.105, 0.325, 0.171);
  crystal_highlight.rotation.z = 0.28;
  crystal_highlight.scale.set(0.28, 1.55, 1);
  crystal_group.add(crystal_highlight);

  const crystal_inclusionPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.135, 0.155, 0.025),
    new THREE.Vector3(-0.075, 0.225, 0.032),
    new THREE.Vector3(-0.100, 0.305, 0.020),
    new THREE.Vector3(-0.035, 0.385, 0.010)
  ]);
  const crystal_inclusionGeom = new THREE.TubeGeometry(
    crystal_inclusionPath,
    16,
    0.004,
    6,
    false
  );
  const crystal_inclusion = new THREE.Mesh(
    crystal_inclusionGeom,
    crystal_inclusionMat
  );
  crystal_inclusion.name = "crystal_inclusion";
  crystal_group.add(crystal_inclusion);

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