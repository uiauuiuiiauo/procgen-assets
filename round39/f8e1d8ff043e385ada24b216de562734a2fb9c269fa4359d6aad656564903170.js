export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "four_wheel_cart";

  const wheel_assembly = new THREE.Group();
  wheel_assembly.name = "wheel_assembly";
  const chassis = new THREE.Group();
  chassis.name = "chassis";
  const suspension = new THREE.Group();
  suspension.name = "suspension";
  const rear_deck_assembly = new THREE.Group();
  rear_deck_assembly.name = "rear_deck_assembly";
  root.add(wheel_assembly, chassis, suspension, rear_deck_assembly);

  const wheelR = 0.44;
  const wheelY = 0.45;
  const wheelX = 0.67;
  const frontZ = 1.05;
  const rearZ = -1.05;
  const deckY = 0.98;
  const deckZ = -1.05;

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x303332,
    metalness: 0.5,
    roughness: 0.5
  });
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x151616,
    metalness: 0.0,
    roughness: 0.8
  });
  const treadMat = new THREE.MeshStandardMaterial({
    color: 0x0d0e0e,
    metalness: 0.0,
    roughness: 0.8
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x3a3c3b,
    metalness: 0.0,
    roughness: 0.8
  });
  const deck_topMat = new THREE.MeshStandardMaterial({
    color: 0x666967,
    metalness: 0.0,
    roughness: 0.8
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x171918,
    metalness: 0.0,
    roughness: 0.8
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  function finishInstances(mesh) {
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.computeBoundingBox) mesh.computeBoundingBox();
    if (mesh.computeBoundingSphere) mesh.computeBoundingSphere();
  }

  function addRod(parent, p1, p2, radius, material, name, segments) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const rodGeom = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments || 10
    );
    const rod = new THREE.Mesh(rodGeom, material);
    rod.name = name;
    rod.position.copy(p1).add(p2).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(rod);
    return rod;
  }

  const tireGeom = new THREE.TorusGeometry(0.345, 0.095, 14, 40);
  const tires = new THREE.InstancedMesh(tireGeom, tireMat, 4);
  tires.name = "tires";

  const wheelPositions = [
    [-wheelX, frontZ],
    [wheelX, frontZ],
    [-wheelX, rearZ],
    [wheelX, rearZ]
  ];

  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    setInstance(
      tires,
      i,
      wheel[0],
      wheelY,
      wheel[1],
      0,
      Math.PI / 2,
      0
    );
  }
  finishInstances(tires);
  wheel_assembly.add(tires);

  const treadGeom = new THREE.BoxGeometry(0.075, 0.018, 0.055);
  const treadCount = 28;
  const tire_treads = new THREE.InstancedMesh(
    treadGeom,
    treadMat,
    treadCount * 4
  );
  tire_treads.name = "tire_treads";

  let treadIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const wheel = wheelPositions[w];
    for (let i = 0; i < treadCount; i++) {
      const angle = i / treadCount * Math.PI * 2;
      const radius = wheelR - 0.002;
      setInstance(
        tire_treads,
        treadIndex++,
        wheel[0],
        wheelY + Math.cos(angle) * radius,
        wheel[1] + Math.sin(angle) * radius,
        angle,
        0,
        0
      );
    }
  }
  finishInstances(tire_treads);
  wheel_assembly.add(tire_treads);

  const sidewall_ringGeom = new THREE.TorusGeometry(0.348, 0.008, 8, 36);
  const sidewall_rings = new THREE.InstancedMesh(
    sidewall_ringGeom,
    treadMat,
    8
  );
  sidewall_rings.name = "sidewall_rings";

  let sidewallIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const wheel = wheelPositions[w];
    for (const side of [-1, 1]) {
      setInstance(
        sidewall_rings,
        sidewallIndex++,
        wheel[0] + side * 0.098,
        wheelY,
        wheel[1],
        0,
        Math.PI / 2,
        0
      );
    }
  }
  finishInstances(sidewall_rings);
  wheel_assembly.add(sidewall_rings);

  const rimGeom = new THREE.TorusGeometry(0.275, 0.025, 10, 36);
  const wheel_rims = new THREE.InstancedMesh(rimGeom, silverMat, 8);
  wheel_rims.name = "wheel_rims";

  let rimIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const wheel = wheelPositions[w];
    for (const side of [-1, 1]) {
      setInstance(
        wheel_rims,
        rimIndex++,
        wheel[0] + side * 0.062,
        wheelY,
        wheel[1],
        0,
        Math.PI / 2,
        0
      );
    }
  }
  finishInstances(wheel_rims);
  wheel_assembly.add(wheel_rims);

  const spokeGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.215, 6);
  const spokeCount = 20;
  const wheel_spokes = new THREE.InstancedMesh(
    spokeGeom,
    silverMat,
    spokeCount * 8
  );
  wheel_spokes.name = "wheel_spokes";

  const up = new THREE.Vector3(0, 1, 0);
  const spokeDirection = new THREE.Vector3();
  let spokeIndex = 0;

  for (let w = 0; w < wheelPositions.length; w++) {
    const wheel = wheelPositions[w];
    for (const side of [-1, 1]) {
      for (let i = 0; i < spokeCount; i++) {
        const outerAngle = i / spokeCount * Math.PI * 2;
        const innerAngle = outerAngle + side * 0.28;
        const outer = new THREE.Vector3(
          wheel[0] + side * 0.062,
          wheelY + Math.cos(outerAngle) * 0.271,
          wheel[1] + Math.sin(outerAngle) * 0.271
        );
        const inner = new THREE.Vector3(
          wheel[0] + side * 0.062,
          wheelY + Math.cos(innerAngle) * 0.057,
          wheel[1] + Math.sin(innerAngle) * 0.057
        );
        spokeDirection.subVectors(outer, inner);
        dummy.position.copy(outer).add(inner).multiplyScalar(0.5);
        dummy.quaternion.setFromUnitVectors(up, spokeDirection.normalize());
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        wheel_spokes.setMatrixAt(spokeIndex++, dummy.matrix);
      }
    }
  }
  finishInstances(wheel_spokes);
  wheel_assembly.add(wheel_spokes);

  const hubGeom = new THREE.CylinderGeometry(0.064, 0.064, 0.19, 20);
  const wheel_hubs = new THREE.InstancedMesh(hubGeom, silverMat, 4);
  wheel_hubs.name = "wheel_hubs";

  for (let i = 0; i < wheelPositions.length; i++) {
    const wheel = wheelPositions[i];
    setInstance(
      wheel_hubs,
      i,
      wheel[0],
      wheelY,
      wheel[1],
      0,
      0,
      Math.PI / 2
    );
  }
  finishInstances(wheel_hubs);
  wheel_assembly.add(wheel_hubs);

  const hub_capGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.018, 18);
  const hub_caps = new THREE.InstancedMesh(hub_capGeom, silverMat, 8);
  hub_caps.name = "hub_caps";

  let hubCapIndex = 0;
  for (let w = 0; w < wheelPositions.length; w++) {
    const wheel = wheelPositions[w];
    for (const side of [-1, 1]) {
      setInstance(
        hub_caps,
        hubCapIndex++,
        wheel[0] + side * 0.103,
        wheelY,
        wheel[1],
        0,
        0,
        Math.PI / 2
      );
    }
  }
  finishInstances(hub_caps);
  wheel_assembly.add(hub_caps);

  const axleGeom = new THREE.CylinderGeometry(0.025, 0.025, 1.39, 12);
  const axles = new THREE.InstancedMesh(axleGeom, frameMat, 2);
  axles.name = "axles";
  setInstance(axles, 0, 0, wheelY, frontZ, 0, 0, Math.PI / 2);
  setInstance(axles, 1, 0, wheelY, rearZ, 0, 0, Math.PI / 2);
  finishInstances(axles);
  suspension.add(axles);

  const front_crossmember = addRod(
    suspension,
    new THREE.Vector3(-0.57, 0.47, frontZ),
    new THREE.Vector3(0.57, 0.47, frontZ),
    0.034,
    frameMat,
    "front_crossmember",
    12
  );
  const rear_crossmember = addRod(
    suspension,
    new THREE.Vector3(-0.57, 0.47, rearZ),
    new THREE.Vector3(0.57, 0.47, rearZ),
    0.034,
    frameMat,
    "rear_crossmember",
    12
  );

  for (const side of [-1, 1]) {
    const x = side * 0.54;
    addRod(
      suspension,
      new THREE.Vector3(x, 0.49, frontZ - 0.12),
      new THREE.Vector3(x, 0.69, frontZ - 0.43),
      0.027,
      frameMat,
      side < 0 ? "front_left_trailing_arm" : "front_right_trailing_arm",
      10
    );
    addRod(
      suspension,
      new THREE.Vector3(x, 0.49, frontZ + 0.12),
      new THREE.Vector3(x, 0.69, frontZ + 0.43),
      0.027,
      frameMat,
      side < 0 ? "front_left_lead_arm" : "front_right_lead_arm",
      10
    );
    addRod(
      suspension,
      new THREE.Vector3(x, 0.49, rearZ + 0.12),
      new THREE.Vector3(x, 0.69, rearZ + 0.43),
      0.027,
      frameMat,
      side < 0 ? "rear_left_trailing_arm" : "rear_right_trailing_arm",
      10
    );
    addRod(
      suspension,
      new THREE.Vector3(x, 0.49, rearZ - 0.12),
      new THREE.Vector3(x, 0.69, rearZ - 0.43),
      0.027,
      frameMat,
      side < 0 ? "rear_left_lead_arm" : "rear_right_lead_arm",
      10
    );
  }

  const left_chassis_rail = addRod(
    chassis,
    new THREE.Vector3(-0.50, 0.68, -0.88),
    new THREE.Vector3(-0.50, 0.68, 0.88),
    0.034,
    frameMat,
    "left_chassis_rail",
    12
  );
  const right_chassis_rail = addRod(
    chassis,
    new THREE.Vector3(0.50, 0.68, -0.88),
    new THREE.Vector3(0.50, 0.68, 0.88),
    0.034,
    frameMat,
    "right_chassis_rail",
    12
  );
  const front_chassis_crossbar = addRod(
    chassis,
    new THREE.Vector3(-0.55, 0.68, 0.84),
    new THREE.Vector3(0.55, 0.68, 0.84),
    0.034,
    frameMat,
    "front_chassis_crossbar",
    12
  );
  const rear_chassis_crossbar = addRod(
    chassis,
    new THREE.Vector3(-0.55, 0.68, -0.84),
    new THREE.Vector3(0.55, 0.68, -0.84),
    0.034,
    frameMat,
    "rear_chassis_crossbar",
    12
  );

  const center_side_braceGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.25,
    12
  );
  const center_side_braces = new THREE.InstancedMesh(
    center_side_braceGeom,
    frameMat,
    2
  );
  center_side_braces.name = "center_side_braces";
  setInstance(center_side_braces, 0, -0.50, 0.68, 0, 0, 0, 0);
  setInstance(center_side_braces, 1, 0.50, 0.68, 0, 0, 0, 0);
  finishInstances(center_side_braces);
  chassis.add(center_side_braces);

  const left_deck_support = addRod(
    chassis,
    new THREE.Vector3(-0.47, 0.68, -0.78),
    new THREE.Vector3(-0.31, 0.89, deckZ),
    0.032,
    frameMat,
    "left_deck_support",
    12
  );
  const right_deck_support = addRod(
    chassis,
    new THREE.Vector3(0.47, 0.68, -0.78),
    new THREE.Vector3(0.31, 0.89, deckZ),
    0.032,
    frameMat,
    "right_deck_support",
    12
  );

  const rear_deck_baseGeom = new THREE.BoxGeometry(0.78, 0.09, 0.52);
  const rear_deck_base = new THREE.Mesh(rear_deck_baseGeom, darkMat);
  rear_deck_base.name = "rear_deck_base";
  rear_deck_base.position.set(0, 0.91, deckZ);
  rear_deck_assembly.add(rear_deck_base);

  const rear_deckShape = new THREE.Shape();
  rear_deckShape.moveTo(-0.25, -0.28);
  rear_deckShape.lineTo(0.25, -0.28);
  rear_deckShape.lineTo(0.31, -0.22);
  rear_deckShape.lineTo(0.31, 0.22);
  rear_deckShape.lineTo(0.25, 0.28);
  rear_deckShape.lineTo(-0.25, 0.28);
  rear_deckShape.lineTo(-0.31, 0.22);
  rear_deckShape.lineTo(-0.31, -0.22);
  rear_deckShape.closePath();

  const rear_deckGeom = new THREE.ExtrudeGeometry(rear_deckShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  rear_deckGeom.center();

  const rear_deck = new THREE.Mesh(rear_deckGeom, deckMat);
  rear_deck.name = "rear_deck";
  rear_deck.rotation.x = -Math.PI / 2;
  rear_deck.position.set(0, deckY, deckZ);
  rear_deck_assembly.add(rear_deck);

  const rear_deck_topGeom = new THREE.BoxGeometry(0.52, 0.018, 0.39);
  const rear_deck_top = new THREE.Mesh(rear_deck_topGeom, deck_topMat);
  rear_deck_top.name = "rear_deck_top";
  rear_deck_top.position.set(0, 1.045, deckZ);
  rear_deck_assembly.add(rear_deck_top);

  const deck_boltGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 12);
  const deck_bolts = new THREE.InstancedMesh(deck_boltGeom, silverMat, 4);
  deck_bolts.name = "deck_bolts";
  const boltPositions = [
    [-0.23, -0.17],
    [0.23, -0.17],
    [-0.23, 0.17],
    [0.23, 0.17]
  ];
  for (let i = 0; i < boltPositions.length; i++) {
    setInstance(
      deck_bolts,
      i,
      boltPositions[i][0],
      1.059,
      deckZ + boltPositions[i][1],
      0,
      0,
      0
    );
  }
  finishInstances(deck_bolts);
  rear_deck_assembly.add(deck_bolts);

  const deck_badgeGeom = new THREE.BoxGeometry(0.075, 0.008, 0.025);
  const deck_badge = new THREE.Mesh(deck_badgeGeom, darkMat);
  deck_badge.name = "deck_badge";
  deck_badge.position.set(0, 1.061, deckZ + 0.19);
  rear_deck_assembly.add(deck_badge);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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