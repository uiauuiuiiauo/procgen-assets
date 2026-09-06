export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cheese_wheel";

  const cheese_wheelMat = new THREE.MeshStandardMaterial({
    color: 0xf2bd58,
    metalness: 0.0,
    roughness: 0.7,
  });

  const cheese_wheelProfile = [
    new THREE.Vector2(0.00, -0.310),
    new THREE.Vector2(0.46, -0.310),
    new THREE.Vector2(0.53, -0.298),
    new THREE.Vector2(0.58, -0.270),
    new THREE.Vector2(0.61, -0.220),
    new THREE.Vector2(0.625, -0.130),
    new THREE.Vector2(0.630, 0.120),
    new THREE.Vector2(0.620, 0.200),
    new THREE.Vector2(0.595, 0.260),
    new THREE.Vector2(0.560, 0.300),
    new THREE.Vector2(0.500, 0.325),
    new THREE.Vector2(0.000, 0.325),
  ];
  const cheese_wheelGeom = new THREE.LatheGeometry(cheese_wheelProfile, 64);
  const cheese_wheel = new THREE.Mesh(cheese_wheelGeom, cheese_wheelMat);
  cheese_wheel.name = "cheese_wheel";
  root.add(cheese_wheel);

  const top_decoration = new THREE.Group();
  top_decoration.name = "top_decoration";
  root.add(top_decoration);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(0, -0.5);
  petalShape.bezierCurveTo(-0.42, -0.34, -0.52, 0.16, 0, 0.5);
  petalShape.bezierCurveTo(0.52, 0.16, 0.42, -0.34, 0, -0.5);

  const flower_petalsGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.006,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  flower_petalsGeom.rotateX(-Math.PI / 2);

  const flower_petalsMat = new THREE.MeshStandardMaterial({
    color: 0xd69425,
    metalness: 0.0,
    roughness: 0.7,
  });

  const flower_specs = [
    { x: -0.285, z: 0.075, size: 0.190, count: 12, phase: 0.08 },
    { x: 0.285, z: 0.055, size: 0.180, count: 12, phase: 0.24 },
    { x: 0.000, z: 0.305, size: 0.170, count: 11, phase: 0.02 },
    { x: 0.015, z: -0.225, size: 0.105, count: 10, phase: 0.17 },
    { x: -0.320, z: -0.220, size: 0.130, count: 8, phase: 0.31 },
    { x: 0.320, z: -0.220, size: 0.130, count: 8, phase: 0.04 },
    { x: -0.405, z: 0.265, size: 0.095, count: 7, phase: 0.15 },
    { x: 0.405, z: 0.275, size: 0.095, count: 7, phase: 0.36 },
  ];

  let flower_petal_count = 0;
  for (const spec of flower_specs) flower_petal_count += spec.count;

  const flower_petals = new THREE.InstancedMesh(
    flower_petalsGeom,
    flower_petalsMat,
    flower_petal_count
  );
  flower_petals.name = "flower_petals";

  const petal_dummy = new THREE.Object3D();
  let petal_index = 0;
  for (const spec of flower_specs) {
    for (let i = 0; i < spec.count; i++) {
      const angle = spec.phase + (i / spec.count) * Math.PI * 2;
      const radial_offset = spec.size * 0.48;
      const width_variation = 0.92 + 0.08 * Math.sin((i + 1) * 1.73 + spec.phase);
      const length_variation = 0.94 + 0.06 * Math.cos((i + 1) * 1.31 + spec.phase);

      petal_dummy.position.set(
        spec.x + Math.sin(angle) * radial_offset,
        0.326,
        spec.z + Math.cos(angle) * radial_offset
      );
      petal_dummy.rotation.set(0, angle, 0);
      petal_dummy.scale.set(
        spec.size * 0.34 * width_variation,
        1,
        spec.size * 0.92 * length_variation
      );
      petal_dummy.updateMatrix();
      flower_petals.setMatrixAt(petal_index++, petal_dummy.matrix);
    }
  }
  flower_petals.instanceMatrix.needsUpdate = true;
  top_decoration.add(flower_petals);

  const flower_centersGeom = new THREE.CylinderGeometry(1, 1, 0.010, 24);
  const flower_centersMat = flower_petalsMat;
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flower_centersMat,
    flower_specs.length
  );
  flower_centers.name = "flower_centers";

  const center_dummy = new THREE.Object3D();
  for (let i = 0; i < flower_specs.length; i++) {
    const spec = flower_specs[i];
    const center_radius = spec.size * 0.22;
    center_dummy.position.set(spec.x, 0.330, spec.z);
    center_dummy.rotation.set(0, 0, 0);
    center_dummy.scale.set(center_radius, 1, center_radius);
    center_dummy.updateMatrix();
    flower_centers.setMatrixAt(i, center_dummy.matrix);
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  top_decoration.add(flower_centers);

  const side_pitsGeom = new THREE.CircleGeometry(1, 14);
  const side_pitsMat = new THREE.MeshStandardMaterial({
    color: 0xd49a35,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const side_pit_specs = [
    [0.55, -0.080, 0.018, 0.010],
    [0.82, -0.170, 0.010, 0.018],
    [1.08, 0.020, 0.025, 0.012],
    [1.32, -0.120, 0.014, 0.009],
    [1.58, -0.200, 0.012, 0.007],
    [1.86, 0.055, 0.009, 0.015],
    [2.15, -0.075, 0.020, 0.010],
    [2.48, -0.185, 0.013, 0.008],
    [2.76, 0.010, 0.010, 0.018],
  ];

  const side_pits = new THREE.InstancedMesh(
    side_pitsGeom,
    side_pitsMat,
    side_pit_specs.length
  );
  side_pits.name = "side_pits";

  const pit_dummy = new THREE.Object3D();
  const pit_forward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < side_pit_specs.length; i++) {
    const spec = side_pit_specs[i];
    const angle = spec[0];
    const y = spec[1];
    const radius = 0.632;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

    pit_dummy.position.set(normal.x * radius, y, normal.z * radius);
    pit_dummy.quaternion.setFromUnitVectors(pit_forward, normal);
    pit_dummy.scale.set(spec[2], spec[3], 1);
    pit_dummy.updateMatrix();
    side_pits.setMatrixAt(i, pit_dummy.matrix);
  }
  side_pits.instanceMatrix.needsUpdate = true;
  root.add(side_pits);

  const side_crackMat = new THREE.MeshStandardMaterial({
    color: 0xcf8d28,
    metalness: 0.0,
    roughness: 0.7,
  });

  function sidePoint(angle, y, radius) {
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  const side_crack_1Path = new THREE.CatmullRomCurve3([
    sidePoint(0.92, 0.155, 0.628),
    sidePoint(0.96, 0.120, 0.632),
    sidePoint(0.94, 0.082, 0.632),
    sidePoint(1.00, 0.045, 0.632),
  ]);
  const side_crack_1Geom = new THREE.TubeGeometry(
    side_crack_1Path,
    12,
    0.0035,
    6,
    false
  );
  const side_crack_1 = new THREE.Mesh(side_crack_1Geom, side_crackMat);
  side_crack_1.name = "side_crack_1";
  root.add(side_crack_1);

  const side_crack_2Path = new THREE.CatmullRomCurve3([
    sidePoint(1.68, -0.030, 0.632),
    sidePoint(1.73, -0.065, 0.632),
    sidePoint(1.70, -0.100, 0.632),
    sidePoint(1.77, -0.135, 0.630),
  ]);
  const side_crack_2Geom = new THREE.TubeGeometry(
    side_crack_2Path,
    12,
    0.003,
    6,
    false
  );
  const side_crack_2 = new THREE.Mesh(side_crack_2Geom, side_crackMat);
  side_crack_2.name = "side_crack_2";
  root.add(side_crack_2);

  const side_crack_3Path = new THREE.CatmullRomCurve3([
    sidePoint(2.38, 0.105, 0.631),
    sidePoint(2.34, 0.075, 0.632),
    sidePoint(2.39, 0.045, 0.632),
    sidePoint(2.36, 0.015, 0.632),
  ]);
  const side_crack_3Geom = new THREE.TubeGeometry(
    side_crack_3Path,
    12,
    0.003,
    6,
    false
  );
  const side_crack_3 = new THREE.Mesh(side_crack_3Geom, side_crackMat);
  side_crack_3.name = "side_crack_3";
  root.add(side_crack_3);

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