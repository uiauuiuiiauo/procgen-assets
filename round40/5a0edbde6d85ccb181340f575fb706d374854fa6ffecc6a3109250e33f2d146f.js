export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "amber_glass_dome";

  const domeR = 1.55;
  const domeBaseY = 0.18;
  const domeH = 1.58;
  const ribCount = 12;
  const ribStep = Math.PI * 2 / ribCount;

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const fastenerMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const amber_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8890b,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xb96808,
    metalness: 0.0,
    roughness: 0.7,
  });

  function domeRadius(t) {
    return domeR * Math.sqrt(Math.max(0, 1 - t * t));
  }

  function domeY(t) {
    return domeBaseY + domeH * t;
  }

  const glass_shellProfile = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    glass_shellProfile.push(
      new THREE.Vector2(domeRadius(t), domeY(t))
    );
  }
  const glass_shellGeom = new THREE.LatheGeometry(glass_shellProfile, 64);
  const glass_shell = new THREE.Mesh(glass_shellGeom, amber_glassMat);
  glass_shell.name = "glass_shell";
  root.add(glass_shell);

  const interior_floorGeom = new THREE.CylinderGeometry(1.43, 1.43, 0.055, 64);
  const interior_floor = new THREE.Mesh(interior_floorGeom, floorMat);
  interior_floor.name = "interior_floor";
  interior_floor.position.y = 0.135;
  root.add(interior_floor);

  const base_bandGeom = new THREE.CylinderGeometry(
    1.565,
    1.565,
    0.15,
    64,
    1,
    true
  );
  const base_band = new THREE.Mesh(base_bandGeom, frameMat);
  base_band.name = "base_band";
  base_band.position.y = 0.075;
  root.add(base_band);

  const base_bottom_ringGeom = new THREE.TorusGeometry(1.525, 0.045, 10, 64);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, frameMat);
  base_bottom_ring.name = "base_bottom_ring";
  base_bottom_ring.rotation.x = Math.PI / 2;
  base_bottom_ring.position.y = 0.015;
  root.add(base_bottom_ring);

  const base_top_ringGeom = new THREE.TorusGeometry(1.525, 0.045, 10, 64);
  const base_top_ring = new THREE.Mesh(base_top_ringGeom, frameMat);
  base_top_ring.name = "base_top_ring";
  base_top_ring.rotation.x = Math.PI / 2;
  base_top_ring.position.y = 0.17;
  root.add(base_top_ring);

  const ribPathPoints = [];
  for (let i = 0; i <= 18; i++) {
    const t = i / 18;
    ribPathPoints.push(
      new THREE.Vector3(0, domeY(t), domeRadius(t))
    );
  }
  const ribPath = new THREE.CatmullRomCurve3(
    ribPathPoints,
    false,
    "centripetal"
  );
  const ribGeom = new THREE.TubeGeometry(ribPath, 36, 0.035, 8, false);
  const radial_ribs = new THREE.InstancedMesh(ribGeom, frameMat, ribCount);
  radial_ribs.name = "radial_ribs";
  const ribMatrix = new THREE.Matrix4();
  for (let i = 0; i < ribCount; i++) {
    ribMatrix.makeRotationY(i * ribStep);
    radial_ribs.setMatrixAt(i, ribMatrix);
  }
  radial_ribs.instanceMatrix.needsUpdate = true;
  root.add(radial_ribs);

  const rib_footGeom = new THREE.BoxGeometry(0.09, 0.17, 0.105);
  const rib_feet = new THREE.InstancedMesh(rib_footGeom, frameMat, ribCount);
  rib_feet.name = "rib_feet";
  const ribFootPosition = new THREE.Vector3();
  const ribFootQuaternion = new THREE.Quaternion();
  const ribFootScale = new THREE.Vector3(1, 1, 1);
  const ribFootMatrix = new THREE.Matrix4();
  const yAxis = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < ribCount; i++) {
    const angle = i * ribStep;
    ribFootPosition.set(
      Math.sin(angle) * 1.505,
      0.18,
      Math.cos(angle) * 1.505
    );
    ribFootQuaternion.setFromAxisAngle(yAxis, angle);
    ribFootMatrix.compose(ribFootPosition, ribFootQuaternion, ribFootScale);
    rib_feet.setMatrixAt(i, ribFootMatrix);
  }
  rib_feet.instanceMatrix.needsUpdate = true;
  root.add(rib_feet);

  const upperRingT = 0.70;
  const upperRingY = domeY(upperRingT);
  const upperRingR = domeRadius(upperRingT);
  const upper_ringGeom = new THREE.CylinderGeometry(
    upperRingR + 0.028,
    upperRingR + 0.028,
    0.042,
    64,
    1,
    true
  );
  const upper_ring = new THREE.Mesh(upper_ringGeom, frameMat);
  upper_ring.name = "upper_ring";
  upper_ring.position.y = upperRingY;
  root.add(upper_ring);

  const midRingT = 0.34;
  const midRingY = domeY(midRingT);
  const midRingR = domeRadius(midRingT);
  const mid_ringGeom = new THREE.CylinderGeometry(
    midRingR + 0.038,
    midRingR + 0.038,
    0.068,
    64,
    1,
    true
  );
  const mid_ring = new THREE.Mesh(mid_ringGeom, frameMat);
  mid_ring.name = "mid_ring";
  mid_ring.position.y = midRingY;
  root.add(mid_ring);

  const joint_connectorGeom = new THREE.BoxGeometry(0.115, 0.078, 0.115);
  const mid_joint_connectors = new THREE.InstancedMesh(
    joint_connectorGeom,
    frameMat,
    ribCount
  );
  mid_joint_connectors.name = "mid_joint_connectors";
  const jointPosition = new THREE.Vector3();
  const jointQuaternion = new THREE.Quaternion();
  const jointScale = new THREE.Vector3(1, 1, 1);
  const jointMatrix = new THREE.Matrix4();
  for (let i = 0; i < ribCount; i++) {
    const angle = i * ribStep;
    jointPosition.set(
      Math.sin(angle) * midRingR,
      midRingY,
      Math.cos(angle) * midRingR
    );
    jointQuaternion.setFromAxisAngle(yAxis, angle);
    jointMatrix.compose(jointPosition, jointQuaternion, jointScale);
    mid_joint_connectors.setMatrixAt(i, jointMatrix);
  }
  mid_joint_connectors.instanceMatrix.needsUpdate = true;
  root.add(mid_joint_connectors);

  const upper_joint_connectors = new THREE.InstancedMesh(
    joint_connectorGeom,
    frameMat,
    ribCount
  );
  upper_joint_connectors.name = "upper_joint_connectors";
  const upperJointScale = new THREE.Vector3(0.72, 0.68, 0.72);
  for (let i = 0; i < ribCount; i++) {
    const angle = i * ribStep;
    jointPosition.set(
      Math.sin(angle) * upperRingR,
      upperRingY,
      Math.cos(angle) * upperRingR
    );
    jointQuaternion.setFromAxisAngle(yAxis, angle);
    jointMatrix.compose(jointPosition, jointQuaternion, upperJointScale);
    upper_joint_connectors.setMatrixAt(i, jointMatrix);
  }
  upper_joint_connectors.instanceMatrix.needsUpdate = true;
  root.add(upper_joint_connectors);

  const base_boltGeom = new THREE.SphereGeometry(0.025, 10, 6);
  const base_bolts = new THREE.InstancedMesh(base_boltGeom, fastenerMat, ribCount);
  base_bolts.name = "base_bolts";
  const boltPosition = new THREE.Vector3();
  const boltQuaternion = new THREE.Quaternion();
  const boltScale = new THREE.Vector3(1, 1, 0.55);
  const boltMatrix = new THREE.Matrix4();
  for (let i = 0; i < ribCount; i++) {
    const angle = i * ribStep;
    boltPosition.set(
      Math.sin(angle) * 1.576,
      0.085,
      Math.cos(angle) * 1.576
    );
    boltQuaternion.setFromAxisAngle(yAxis, angle);
    boltMatrix.compose(boltPosition, boltQuaternion, boltScale);
    base_bolts.setMatrixAt(i, boltMatrix);
  }
  base_bolts.instanceMatrix.needsUpdate = true;
  root.add(base_bolts);

  const doorAngle = ribStep;
  const doorNormal = new THREE.Vector3(
    Math.sin(doorAngle),
    0,
    Math.cos(doorAngle)
  );
  const doorTangent = new THREE.Vector3(
    Math.cos(doorAngle),
    0,
    -Math.sin(doorAngle)
  );
  const doorQuaternion = new THREE.Quaternion().setFromAxisAngle(
    yAxis,
    doorAngle
  );

  const door_latch_plateGeom = new THREE.BoxGeometry(0.045, 0.25, 0.025);
  const door_latch_plate = new THREE.Mesh(door_latch_plateGeom, darkMetalMat);
  door_latch_plate.name = "door_latch_plate";
  door_latch_plate.position.copy(doorNormal).multiplyScalar(1.555);
  door_latch_plate.position.y = 0.49;
  door_latch_plate.quaternion.copy(doorQuaternion);
  root.add(door_latch_plate);

  const door_handleGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.13, 10);
  const door_handle = new THREE.Mesh(door_handleGeom, fastenerMat);
  door_handle.name = "door_handle";
  door_handle.position.copy(doorNormal).multiplyScalar(1.59);
  door_handle.position.addScaledVector(doorTangent, 0.045);
  door_handle.position.y = 0.54;
  root.add(door_handle);

  const door_handle_upper_mountGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.04,
    10
  );
  const door_handle_upper_mount = new THREE.Mesh(
    door_handle_upper_mountGeom,
    darkMetalMat
  );
  door_handle_upper_mount.name = "door_handle_upper_mount";
  door_handle_upper_mount.position.copy(doorNormal).multiplyScalar(1.575);
  door_handle_upper_mount.position.addScaledVector(doorTangent, 0.045);
  door_handle_upper_mount.position.y = 0.605;
  door_handle_upper_mount.quaternion.copy(doorQuaternion);
  root.add(door_handle_upper_mount);

  const door_handle_lower_mount = new THREE.Mesh(
    door_handle_upper_mountGeom,
    darkMetalMat
  );
  door_handle_lower_mount.name = "door_handle_lower_mount";
  door_handle_lower_mount.position.copy(doorNormal).multiplyScalar(1.575);
  door_handle_lower_mount.position.addScaledVector(doorTangent, 0.045);
  door_handle_lower_mount.position.y = 0.475;
  door_handle_lower_mount.quaternion.copy(doorQuaternion);
  root.add(door_handle_lower_mount);

  const door_hingeGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.055, 10);
  const door_hinges = new THREE.InstancedMesh(door_hingeGeom, darkMetalMat, 2);
  door_hinges.name = "door_hinges";
  const hingePosition = new THREE.Vector3();
  const hingeMatrix = new THREE.Matrix4();
  const hingeScale = new THREE.Vector3(1, 1, 1);
  const identityQuaternion = new THREE.Quaternion();
  const hingeHeights = [0.29, 0.72];
  for (let i = 0; i < hingeHeights.length; i++) {
    hingePosition.copy(doorNormal).multiplyScalar(1.57);
    hingePosition.addScaledVector(doorTangent, -0.07);
    hingePosition.y = hingeHeights[i];
    hingeMatrix.compose(hingePosition, identityQuaternion, hingeScale);
    door_hinges.setMatrixAt(i, hingeMatrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  root.add(door_hinges);

  const apex_collarGeom = new THREE.TorusGeometry(0.15, 0.028, 10, 32);
  const apex_collar = new THREE.Mesh(apex_collarGeom, frameMat);
  apex_collar.name = "apex_collar";
  apex_collar.rotation.x = Math.PI / 2;
  apex_collar.position.y = domeBaseY + domeH;
  root.add(apex_collar);

  const apex_capProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.23, 0.00),
    new THREE.Vector2(0.24, 0.025),
    new THREE.Vector2(0.19, 0.065),
    new THREE.Vector2(0.09, 0.105),
    new THREE.Vector2(0.00, 0.12),
  ];
  const apex_capGeom = new THREE.LatheGeometry(apex_capProfile, 32);
  const apex_cap = new THREE.Mesh(apex_capGeom, frameMat);
  apex_cap.name = "apex_cap";
  apex_cap.position.y = domeBaseY + domeH - 0.005;
  root.add(apex_cap);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}