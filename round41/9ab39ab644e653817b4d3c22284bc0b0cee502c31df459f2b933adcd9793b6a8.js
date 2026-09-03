export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_assembly = new THREE.Group();
  root.add(tool_assembly);

  const wooden_handleMat = new THREE.MeshStandardMaterial({
    color: 0xb9824f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x8f5d32,
    metalness: 0.0,
    roughness: 0.6,
  });
  const ferruleMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const needle_shaftMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const wooden_handleProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.076, 0.000),
    new THREE.Vector2(0.080, 0.080),
    new THREE.Vector2(0.082, 0.400),
    new THREE.Vector2(0.085, 1.200),
    new THREE.Vector2(0.087, 2.150),
    new THREE.Vector2(0.086, 2.400),
    new THREE.Vector2(0.080, 2.500),
    new THREE.Vector2(0.064, 2.570),
    new THREE.Vector2(0.038, 2.615),
    new THREE.Vector2(0.000, 2.635),
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(wooden_handleProfile, 32);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, wooden_handleMat);
  tool_assembly.add(wooden_handle);

  const wood_grain = new THREE.Group();
  const grain_specs = [
    [0.25, 1.15, 0.35, 0.10],
    [1.15, 2.15, 1.70, -0.08],
    [2.00, 0.70, 3.10, 0.12],
    [2.65, 1.75, 4.40, -0.11],
    [0.65, 0.30, 5.50, 0.07],
  ];
  for (let i = 0; i < grain_specs.length; i++) {
    const spec = grain_specs[i];
    const points = [];
    for (let j = 0; j <= 5; j++) {
      const t = j / 5;
      const y = spec[0] + (spec[1] - spec[0]) * t;
      const angle = spec[2] + spec[3] * Math.sin(t * Math.PI);
      const radius = 0.087;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    const grain_streakGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      12,
      0.0018,
      5,
      false
    );
    const grain_streak = new THREE.Mesh(grain_streakGeom, wood_grainMat);
    wood_grain.add(grain_streak);
  }
  tool_assembly.add(wood_grain);

  const ferruleGeom = new THREE.CylinderGeometry(0.076, 0.048, 0.38, 24);
  const ferrule = new THREE.Mesh(ferruleGeom, ferruleMat);
  ferrule.position.y = -0.19;
  tool_assembly.add(ferrule);

  const ferrule_collarGeom = new THREE.CylinderGeometry(0.079, 0.076, 0.045, 24);
  const ferrule_collar = new THREE.Mesh(ferrule_collarGeom, ferruleMat);
  ferrule_collar.position.y = -0.012;
  tool_assembly.add(ferrule_collar);

  const needle_shaftGeom = new THREE.CylinderGeometry(0.047, 0.026, 0.78, 24);
  const needle_shaft = new THREE.Mesh(needle_shaftGeom, needle_shaftMat);
  needle_shaft.position.y = -0.77;
  tool_assembly.add(needle_shaft);

  const needle_tipGeom = new THREE.CylinderGeometry(0.026, 0.000, 0.42, 24);
  const needle_tip = new THREE.Mesh(needle_tipGeom, needle_shaftMat);
  needle_tip.position.y = -1.37;
  tool_assembly.add(needle_tip);

  tool_assembly.rotation.z = -0.43;
  tool_assembly.rotation.x = 0.06;

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}