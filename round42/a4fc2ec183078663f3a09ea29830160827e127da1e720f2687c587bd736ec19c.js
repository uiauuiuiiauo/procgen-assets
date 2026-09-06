export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_tapered_tool";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa66a2f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const end_grainMat = new THREE.MeshStandardMaterial({
    color: 0x99602c,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x5a3219,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const tip_wearMat = new THREE.MeshStandardMaterial({
    color: 0x463326,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const pointed_tipProfile = [
    new THREE.Vector2(0.000, -2.45),
    new THREE.Vector2(0.026, -2.42),
    new THREE.Vector2(0.060, -2.32),
    new THREE.Vector2(0.105, -2.12),
    new THREE.Vector2(0.145, -1.90),
    new THREE.Vector2(0.160, -1.78),
    new THREE.Vector2(0.000, -1.78),
  ];
  const pointed_tipGeom = new THREE.LatheGeometry(pointed_tipProfile, 48);
  const pointed_tip = new THREE.Mesh(pointed_tipGeom, woodMat);
  pointed_tip.name = "pointed_tip";
  pointed_tip.rotation.z = -Math.PI / 2;
  root.add(pointed_tip);

  const main_shaftProfile = [
    new THREE.Vector2(0.000, -1.80),
    new THREE.Vector2(0.158, -1.80),
    new THREE.Vector2(0.166, -1.55),
    new THREE.Vector2(0.178, -1.15),
    new THREE.Vector2(0.193, -0.65),
    new THREE.Vector2(0.211, -0.10),
    new THREE.Vector2(0.230, 0.40),
    new THREE.Vector2(0.247, 0.82),
    new THREE.Vector2(0.258, 1.10),
    new THREE.Vector2(0.260, 1.22),
    new THREE.Vector2(0.000, 1.22),
  ];
  const main_shaftGeom = new THREE.LatheGeometry(main_shaftProfile, 56);
  const main_shaft = new THREE.Mesh(main_shaftGeom, woodMat);
  main_shaft.name = "main_shaft";
  main_shaft.rotation.z = -Math.PI / 2;
  root.add(main_shaft);

  const flared_handleProfile = [
    new THREE.Vector2(0.000, 1.18),
    new THREE.Vector2(0.258, 1.18),
    new THREE.Vector2(0.270, 1.25),
    new THREE.Vector2(0.300, 1.39),
    new THREE.Vector2(0.345, 1.56),
    new THREE.Vector2(0.395, 1.75),
    new THREE.Vector2(0.445, 1.94),
    new THREE.Vector2(0.482, 2.08),
    new THREE.Vector2(0.495, 2.14),
    new THREE.Vector2(0.486, 2.18),
    new THREE.Vector2(0.000, 2.18),
  ];
  const flared_handleGeom = new THREE.LatheGeometry(flared_handleProfile, 56);
  const flared_handle = new THREE.Mesh(flared_handleGeom, woodMat);
  flared_handle.name = "flared_handle";
  flared_handle.rotation.z = -Math.PI / 2;
  root.add(flared_handle);

  const handle_end_faceGeom = new THREE.CircleGeometry(0.480, 56);
  const handle_end_face = new THREE.Mesh(handle_end_faceGeom, end_grainMat);
  handle_end_face.name = "handle_end_face";
  handle_end_face.rotation.y = Math.PI / 2;
  handle_end_face.position.x = 2.183;
  root.add(handle_end_face);

  const tip_seam_ringGeom = new THREE.TorusGeometry(0.159, 0.008, 8, 48);
  const tip_seam_ring = new THREE.Mesh(tip_seam_ringGeom, grainMat);
  tip_seam_ring.name = "tip_seam_ring";
  tip_seam_ring.rotation.y = Math.PI / 2;
  tip_seam_ring.position.x = -1.79;
  root.add(tip_seam_ring);

  const handle_seam_ringGeom = new THREE.TorusGeometry(0.263, 0.010, 8, 56);
  const handle_seam_ring = new THREE.Mesh(handle_seam_ringGeom, grainMat);
  handle_seam_ring.name = "handle_seam_ring";
  handle_seam_ring.rotation.y = Math.PI / 2;
  handle_seam_ring.position.x = 1.225;
  root.add(handle_seam_ring);

  const tip_wearGeom = new THREE.CircleGeometry(0.020, 24);
  const tip_wear = new THREE.Mesh(tip_wearGeom, tip_wearMat);
  tip_wear.name = "tip_wear";
  tip_wear.rotation.y = -Math.PI / 2;
  tip_wear.position.x = -2.452;
  root.add(tip_wear);

  function shaftRadiusAt(x) {
    const t = Math.max(0, Math.min(1, (x + 1.80) / 3.02));
    return 0.158 + 0.102 * t + 0.010 * Math.sin(Math.PI * t);
  }

  function handleRadiusAt(x) {
    const t = Math.max(0, Math.min(1, (x - 1.20) / 0.98));
    return 0.260 + 0.228 * Math.pow(t, 0.78);
  }

  function createGrainGroup(name, specs, radiusAt) {
    const grain_group = new THREE.Group();
    grain_group.name = name;

    for (let i = 0; i < specs.length; i++) {
      const spec = specs[i];
      const points = [];

      for (let j = 0; j <= 7; j++) {
        const t = j / 7;
        const x = spec[0] + (spec[1] - spec[0]) * t;
        const angle =
          spec[2] +
          0.025 * Math.sin(t * Math.PI * 2 + i * 0.73) +
          0.012 * Math.sin(t * Math.PI * 5);
        const radius = radiusAt(x) + 0.003;

        points.push(
          new THREE.Vector3(
            x,
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
          )
        );
      }

      const grain_curve = new THREE.CatmullRomCurve3(
        points,
        false,
        "centripetal"
      );
      const grain_geom = new THREE.TubeGeometry(
        grain_curve,
        18,
        0.004,
        5,
        false
      );
      const grain_line = new THREE.Mesh(grain_geom, grainMat);
      grain_line.name = name + "_line_" + i;
      grain_group.add(grain_line);
    }

    return grain_group;
  }

  const shaft_grainSpecs = [
    [-1.62, -0.72, 0.18],
    [-1.30, 0.38, 0.52],
    [-0.92, 1.02, 0.90],
    [-1.55, -0.20, 1.24],
    [-0.48, 1.05, 1.58],
    [-1.20, 0.72, 1.94],
    [-0.15, 1.08, 2.30],
    [-0.82, 0.48, 2.70],
    [-1.60, -0.52, 3.08],
    [-0.62, 0.92, 3.46],
    [-1.25, 0.15, 3.86],
    [-0.30, 1.05, 4.25],
    [-0.98, 0.78, 4.72],
    [-0.05, 1.08, 5.18],
  ];
  const shaft_grain = createGrainGroup(
    "shaft_grain",
    shaft_grainSpecs,
    shaftRadiusAt
  );
  root.add(shaft_grain);

  const handle_grainSpecs = [
    [1.30, 1.76, 0.12],
    [1.42, 2.05, 0.48],
    [1.28, 1.91, 0.84],
    [1.50, 2.10, 1.20],
    [1.31, 1.68, 1.56],
    [1.46, 2.08, 1.92],
    [1.27, 1.92, 2.28],
    [1.55, 2.11, 2.66],
    [1.31, 1.82, 3.04],
    [1.43, 2.06, 3.42],
    [1.28, 1.62, 3.82],
    [1.51, 2.10, 4.24],
    [1.32, 1.95, 4.70],
    [1.48, 2.09, 5.12],
    [1.29, 1.75, 5.54],
  ];
  const handle_grain = createGrainGroup(
    "handle_grain",
    handle_grainSpecs,
    handleRadiusAt
  );
  root.add(handle_grain);

  const tip_grainSpecs = [
    [-2.34, -2.02, 0.30],
    [-2.29, -1.91, 1.12],
    [-2.35, -2.08, 2.10],
    [-2.25, -1.88, 3.04],
    [-2.33, -2.01, 4.18],
    [-2.27, -1.92, 5.30],
  ];

  function tipRadiusAt(x) {
    const t = Math.max(0, Math.min(1, (x + 2.45) / 0.67));
    return 0.026 + 0.134 * Math.pow(t, 0.82);
  }

  const tip_grain = createGrainGroup(
    "tip_grain",
    tip_grainSpecs,
    tipRadiusAt
  );
  root.add(tip_grain);

  const wood_knotsGeom = new THREE.CircleGeometry(0.022, 18);
  const wood_knots = new THREE.InstancedMesh(
    wood_knotsGeom,
    grainMat,
    7
  );
  wood_knots.name = "wood_knots";

  const knot_specs = [
    [-1.05, 0.30, 0.75, 1.65, shaftRadiusAt],
    [-0.42, 1.02, 0.55, 1.25, shaftRadiusAt],
    [0.18, 2.10, 0.70, 1.45, shaftRadiusAt],
    [0.76, 0.62, 0.52, 1.15, shaftRadiusAt],
    [1.42, 0.42, 0.68, 1.45, handleRadiusAt],
    [1.67, 1.28, 0.52, 1.20, handleRadiusAt],
    [1.91, 2.20, 0.72, 1.55, handleRadiusAt],
  ];

  const knot_dummy = new THREE.Object3D();
  const decal_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < knot_specs.length; i++) {
    const spec = knot_specs[i];
    const radius = spec[4](spec[0]) + 0.004;
    const normal = new THREE.Vector3(
      0,
      Math.cos(spec[1]),
      Math.sin(spec[1])
    ).normalize();

    knot_dummy.position.set(
      spec[0],
      normal.y * radius,
      normal.z * radius
    );
    knot_dummy.quaternion.setFromUnitVectors(decal_forward, normal);
    knot_dummy.scale.set(spec[2], spec[3], 1);
    knot_dummy.updateMatrix();
    wood_knots.setMatrixAt(i, knot_dummy.matrix);
  }

  wood_knots.instanceMatrix.needsUpdate = true;
  root.add(wood_knots);

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