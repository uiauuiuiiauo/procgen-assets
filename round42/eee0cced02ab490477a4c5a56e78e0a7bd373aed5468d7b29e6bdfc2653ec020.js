export default function generate(THREE) {
  const root = new THREE.Group();
  const pendant_assembly = new THREE.Group();
  root.add(pendant_assembly);

  const black_stoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x0b0c10,
    metalness: 0.0,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
  });

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const black_stoneGeom = new THREE.SphereGeometry(1, 64, 40);
  const stone_positions = black_stoneGeom.attributes.position;
  for (let i = 0; i < stone_positions.count; i++) {
    const x = stone_positions.getX(i);
    const y = stone_positions.getY(i);
    const z = stone_positions.getZ(i);
    stone_positions.setXYZ(
      i,
      x * 0.34 * (1 + 0.035 * y),
      y * 0.55,
      z * 0.18 * (1 + 0.025 * y)
    );
  }
  stone_positions.needsUpdate = true;
  black_stoneGeom.computeVertexNormals();

  const black_stone = new THREE.Mesh(black_stoneGeom, black_stoneMat);
  pendant_assembly.add(black_stone);

  const stone_top_nubGeom = new THREE.SphereGeometry(1, 24, 16);
  const stone_top_nub = new THREE.Mesh(stone_top_nubGeom, black_stoneMat);
  stone_top_nub.scale.set(0.047, 0.027, 0.041);
  stone_top_nub.position.set(0, 0.535, 0);
  pendant_assembly.add(stone_top_nub);

  const connector_capGeom = new THREE.CylinderGeometry(
    0.035,
    0.057,
    0.036,
    32
  );
  const connector_cap = new THREE.Mesh(
    connector_capGeom,
    polished_silverMat
  );
  connector_cap.position.set(0, 0.556, 0);
  pendant_assembly.add(connector_cap);

  const connector_cap_rimGeom = new THREE.TorusGeometry(
    0.035,
    0.006,
    10,
    32
  );
  const connector_cap_rim = new THREE.Mesh(
    connector_cap_rimGeom,
    polished_silverMat
  );
  connector_cap_rim.rotation.x = Math.PI / 2;
  connector_cap_rim.position.set(0, 0.573, 0);
  pendant_assembly.add(connector_cap_rim);

  const connector_pinGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    0.035,
    16
  );
  const connector_pin = new THREE.Mesh(
    connector_pinGeom,
    polished_silverMat
  );
  connector_pin.position.set(0, 0.582, 0);
  pendant_assembly.add(connector_pin);

  const jump_ringGeom = new THREE.TorusGeometry(0.052, 0.011, 12, 40);
  const jump_ring = new THREE.Mesh(jump_ringGeom, polished_silverMat);
  jump_ring.position.set(0, 0.607, 0.004);
  jump_ring.rotation.y = 0.34;
  pendant_assembly.add(jump_ring);

  const bail_points = [];
  const bail_count = 32;
  for (let i = 0; i < bail_count; i++) {
    const angle = (i / bail_count) * Math.PI * 2;
    bail_points.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.052,
        Math.sin(angle) * 0.095,
        0
      )
    );
  }

  const bail_curve = new THREE.CatmullRomCurve3(
    bail_points,
    true,
    "centripetal"
  );
  const bailGeom = new THREE.TubeGeometry(
    bail_curve,
    64,
    0.014,
    12,
    true
  );
  const bail = new THREE.Mesh(bailGeom, polished_silverMat);
  bail.position.set(0.008, 0.735, -0.004);
  bail.rotation.set(0, -0.28, -0.16);
  pendant_assembly.add(bail);

  pendant_assembly.rotation.set(-0.08, -0.12, -0.5);

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