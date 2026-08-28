export default function generate(THREE) {
  const root = new THREE.Group();
  const tool_assembly = new THREE.Group();
  root.add(tool_assembly);

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x70402f,
    metalness: 0.5,
    roughness: 0.35,
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkSteelMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const copper_handleGeom = new THREE.CylinderGeometry(0.145, 0.145, 3.4, 48);
  const copper_handle = new THREE.Mesh(copper_handleGeom, copperMat);
  copper_handle.position.y = 1.55;
  tool_assembly.add(copper_handle);

  const rear_collarGeom = new THREE.CylinderGeometry(0.158, 0.158, 0.075, 40);
  const rear_collar = new THREE.Mesh(rear_collarGeom, darkCopperMat);
  rear_collar.position.y = 3.23;
  tool_assembly.add(rear_collar);

  const rear_end_capProfile = [
    new THREE.Vector2(0.132, 0.000),
    new THREE.Vector2(0.150, 0.025),
    new THREE.Vector2(0.174, 0.090),
    new THREE.Vector2(0.181, 0.160),
    new THREE.Vector2(0.164, 0.240),
    new THREE.Vector2(0.115, 0.310),
    new THREE.Vector2(0.050, 0.345),
    new THREE.Vector2(0.000, 0.350),
  ];
  const rear_end_capGeom = new THREE.LatheGeometry(rear_end_capProfile, 48);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, copperMat);
  rear_end_cap.position.y = 3.245;
  tool_assembly.add(rear_end_cap);

  const front_ferruleGeom = new THREE.CylinderGeometry(0.145, 0.118, 0.5, 40);
  const front_ferrule = new THREE.Mesh(front_ferruleGeom, steelMat);
  front_ferrule.position.y = -0.37;
  tool_assembly.add(front_ferrule);

  const front_ferrule_rimGeom = new THREE.CylinderGeometry(0.151, 0.151, 0.045, 40);
  const front_ferrule_rim = new THREE.Mesh(front_ferrule_rimGeom, darkSteelMat);
  front_ferrule_rim.position.y = -0.125;
  tool_assembly.add(front_ferrule_rim);

  const auger_coreGeom = new THREE.CylinderGeometry(0.078, 0.024, 0.82, 32);
  const auger_core = new THREE.Mesh(auger_coreGeom, copperMat);
  auger_core.position.y = -0.99;
  tool_assembly.add(auger_core);

  const helical_flightPoints = [];
  const flightSegments = 72;
  const flightTurns = 2.25;
  for (let i = 0; i <= flightSegments; i++) {
    const t = i / flightSegments;
    const angle = t * Math.PI * 2 * flightTurns;
    const radius = 0.098 * (1 - t) + 0.018 * t;
    const y = -0.59 * (1 - t) - 1.39 * t;
    helical_flightPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      )
    );
  }
  const helical_flightCurve = new THREE.CatmullRomCurve3(
    helical_flightPoints,
    false,
    "centripetal"
  );
  const helical_flightGeom = new THREE.TubeGeometry(
    helical_flightCurve,
    144,
    0.028,
    8,
    false
  );
  const helical_flight = new THREE.Mesh(helical_flightGeom, copperMat);
  tool_assembly.add(helical_flight);

  const pointed_bitGeom = new THREE.ConeGeometry(0.047, 0.34, 24);
  const pointed_bit = new THREE.Mesh(pointed_bitGeom, darkSteelMat);
  pointed_bit.rotation.z = Math.PI;
  pointed_bit.position.y = -1.54;
  tool_assembly.add(pointed_bit);

  tool_assembly.rotation.z = -Math.PI * 0.24;
  tool_assembly.rotation.x = 0.06;

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