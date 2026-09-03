export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "stainless_steel_pan";

  const pan_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const cooking_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const rolled_rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const handle_inlayMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rivetsMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const rivet_ringsMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.5,
    roughness: 0.4,
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0x75401f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const dark_stainMat = new THREE.MeshStandardMaterial({
    color: 0x3e2115,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const pan_bodyProfile = [
    new THREE.Vector2(0.00, -0.39),
    new THREE.Vector2(1.08, -0.39),
    new THREE.Vector2(1.20, -0.36),
    new THREE.Vector2(1.29, -0.29),
    new THREE.Vector2(1.36, -0.14),
    new THREE.Vector2(1.41, 0.27),
    new THREE.Vector2(1.46, 0.37),
    new THREE.Vector2(1.44, 0.43),
    new THREE.Vector2(1.36, 0.45),
    new THREE.Vector2(1.30, 0.39),
    new THREE.Vector2(1.27, 0.25),
    new THREE.Vector2(1.22, -0.11),
    new THREE.Vector2(1.14, -0.22),
    new THREE.Vector2(1.03, -0.27),
    new THREE.Vector2(0.00, -0.27),
  ];
  const pan_bodyGeom = new THREE.LatheGeometry(pan_bodyProfile, 64);
  const pan_body = new THREE.Mesh(pan_bodyGeom, pan_bodyMat);
  pan_body.name = "pan_body";
  root.add(pan_body);

  const cooking_surfaceGeom = new THREE.CylinderGeometry(1.045, 1.045, 0.025, 64);
  const cooking_surface = new THREE.Mesh(cooking_surfaceGeom, cooking_surfaceMat);
  cooking_surface.name = "cooking_surface";
  cooking_surface.position.y = -0.252;
  root.add(cooking_surface);

  const rolled_rimGeom = new THREE.TorusGeometry(1.395, 0.055, 12, 64);
  const rolled_rim = new THREE.Mesh(rolled_rimGeom, rolled_rimMat);
  rolled_rim.name = "rolled_rim";
  rolled_rim.rotation.x = Math.PI / 2;
  rolled_rim.position.y = 0.405;
  root.add(rolled_rim);

  const base_ringGeom = new THREE.TorusGeometry(1.185, 0.032, 10, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, rolled_rimMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = -0.365;
  root.add(base_ring);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  handle_group.rotation.y = 2.34;
  root.add(handle_group);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.31, 1.16);
  handleShape.lineTo(0.31, 1.16);
  handleShape.bezierCurveTo(0.30, 1.34, 0.22, 1.49, 0.18, 1.64);
  handleShape.lineTo(0.145, 2.90);
  handleShape.bezierCurveTo(0.145, 3.08, 0.21, 3.18, 0.21, 3.31);
  handleShape.bezierCurveTo(0.21, 3.47, 0.11, 3.56, 0.00, 3.56);
  handleShape.bezierCurveTo(-0.11, 3.56, -0.21, 3.47, -0.21, 3.31);
  handleShape.bezierCurveTo(-0.21, 3.18, -0.145, 3.08, -0.145, 2.90);
  handleShape.lineTo(-0.18, 1.64);
  handleShape.bezierCurveTo(-0.22, 1.49, -0.30, 1.34, -0.31, 1.16);
  handleShape.closePath();

  const handle_hole = new THREE.Path();
  handle_hole.absarc(0, 3.31, 0.092, 0, Math.PI * 2, true);
  handleShape.holes.push(handle_hole);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 20,
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  handle.rotation.x = Math.PI / 2;
  handle.position.y = 0.49;
  handle_group.add(handle);

  const handle_inlayShape = new THREE.Shape();
  handle_inlayShape.moveTo(-0.17, 1.37);
  handle_inlayShape.lineTo(0.17, 1.37);
  handle_inlayShape.bezierCurveTo(0.15, 1.49, 0.115, 1.59, 0.105, 1.73);
  handle_inlayShape.lineTo(0.082, 2.89);
  handle_inlayShape.bezierCurveTo(0.082, 3.03, 0.12, 3.12, 0.12, 3.25);
  handle_inlayShape.bezierCurveTo(0.12, 3.38, 0.065, 3.45, 0.00, 3.45);
  handle_inlayShape.bezierCurveTo(-0.065, 3.45, -0.12, 3.38, -0.12, 3.25);
  handle_inlayShape.bezierCurveTo(-0.12, 3.12, -0.082, 3.03, -0.082, 2.89);
  handle_inlayShape.lineTo(-0.105, 1.73);
  handle_inlayShape.bezierCurveTo(-0.115, 1.59, -0.15, 1.49, -0.17, 1.37);
  handle_inlayShape.closePath();

  const handle_inlay_hole = new THREE.Path();
  handle_inlay_hole.absarc(0, 3.31, 0.105, 0, Math.PI * 2, true);
  handle_inlayShape.holes.push(handle_inlay_hole);

  const handle_inlayGeom = new THREE.ExtrudeGeometry(handle_inlayShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 16,
  });
  const handle_inlay = new THREE.Mesh(handle_inlayGeom, handle_inlayMat);
  handle_inlay.name = "handle_inlay";
  handle_inlay.rotation.x = Math.PI / 2;
  handle_inlay.position.y = 0.515;
  handle_group.add(handle_inlay);

  const handle_hole_shadowGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.008, 24);
  const handle_hole_shadow = new THREE.Mesh(handle_hole_shadowGeom, rivet_ringsMat);
  handle_hole_shadow.name = "handle_hole_shadow";
  handle_hole_shadow.position.set(0, 0.39, 3.31);
  handle_group.add(handle_hole_shadow);

  const handle_hole_rimGeom = new THREE.TorusGeometry(0.098, 0.012, 8, 28);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, rolled_rimMat);
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.rotation.x = Math.PI / 2;
  handle_hole_rim.position.set(0, 0.515, 3.31);
  handle_group.add(handle_hole_rim);

  const rivetsGeom = new THREE.SphereGeometry(1, 20, 12);
  const rivets = new THREE.InstancedMesh(rivetsGeom, rivetsMat, 3);
  rivets.name = "rivets";
  const rivetAngles = [0.42, 0.82, 1.22];
  const rivetHeights = [0.17, 0.15, 0.13];
  const rivetMatrix = new THREE.Matrix4();
  const rivetScale = new THREE.Vector3(0.078, 0.092, 0.035);
  const localForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 3; i++) {
    const angle = rivetAngles[i];
    const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const inward = radial.clone().multiplyScalar(-1);
    const position = radial.clone().multiplyScalar(1.245);
    position.y = rivetHeights[i];
    const quaternion = new THREE.Quaternion().setFromUnitVectors(localForward, inward);
    rivetMatrix.compose(position, quaternion, rivetScale);
    rivets.setMatrixAt(i, rivetMatrix);
  }
  rivets.instanceMatrix.needsUpdate = true;
  root.add(rivets);

  const rivet_ringsGeom = new THREE.TorusGeometry(0.087, 0.009, 8, 24);
  const rivet_rings = new THREE.InstancedMesh(rivet_ringsGeom, rivet_ringsMat, 3);
  rivet_rings.name = "rivet_rings";
  const ringMatrix = new THREE.Matrix4();
  const ringScale = new THREE.Vector3(1, 1, 1);

  for (let i = 0; i < 3; i++) {
    const angle = rivetAngles[i];
    const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const inward = radial.clone().multiplyScalar(-1);
    const position = radial.clone().multiplyScalar(1.235);
    position.y = rivetHeights[i];
    const quaternion = new THREE.Quaternion().setFromUnitVectors(localForward, inward);
    ringMatrix.compose(position, quaternion, ringScale);
    rivet_rings.setMatrixAt(i, ringMatrix);
  }
  rivet_rings.instanceMatrix.needsUpdate = true;
  root.add(rivet_rings);

  const floor_stainsGeom = new THREE.CircleGeometry(1, 14);
  const floor_stains = new THREE.InstancedMesh(floor_stainsGeom, stainMat, 18);
  floor_stains.name = "floor_stains";
  const floorStainMatrix = new THREE.Matrix4();
  const floorQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(-Math.PI / 2, 0, 0)
  );

  for (let i = 0; i < 18; i++) {
    const angle = i * 2.399;
    const radius = 0.16 + (((i * 7) % 17) / 17) * 0.78;
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      -0.235,
      Math.sin(angle) * radius
    );
    const scale = new THREE.Vector3(
      0.025 + (i % 4) * 0.014,
      0.012 + ((i * 3) % 5) * 0.007,
      1
    );
    floorStainMatrix.compose(position, floorQuat, scale);
    floor_stains.setMatrixAt(i, floorStainMatrix);
  }
  floor_stains.instanceMatrix.needsUpdate = true;
  root.add(floor_stains);

  const dark_floor_stainsGeom = new THREE.CircleGeometry(1, 12);
  const dark_floor_stains = new THREE.InstancedMesh(
    dark_floor_stainsGeom,
    dark_stainMat,
    7
  );
  dark_floor_stains.name = "dark_floor_stains";
  const darkFloorStainMatrix = new THREE.Matrix4();

  for (let i = 0; i < 7; i++) {
    const angle = 0.7 + i * 2.15;
    const radius = 0.28 + (((i * 5) % 7) / 7) * 0.62;
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      -0.233,
      Math.sin(angle) * radius
    );
    const scale = new THREE.Vector3(
      0.018 + (i % 3) * 0.012,
      0.009 + (i % 2) * 0.009,
      1
    );
    darkFloorStainMatrix.compose(position, floorQuat, scale);
    dark_floor_stains.setMatrixAt(i, darkFloorStainMatrix);
  }
  dark_floor_stains.instanceMatrix.needsUpdate = true;
  root.add(dark_floor_stains);

  const wall_stainsGeom = new THREE.CircleGeometry(1, 14);
  const wall_stains = new THREE.InstancedMesh(wall_stainsGeom, stainMat, 12);
  wall_stains.name = "wall_stains";
  const wallStainMatrix = new THREE.Matrix4();

  for (let i = 0; i < 12; i++) {
    const angle = 0.28 + i * 0.51;
    const y = -0.10 + (i % 4) * 0.075;
    const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const inward = radial.clone().multiplyScalar(-1);
    const position = radial.clone().multiplyScalar(1.205);
    position.y = y;
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      localForward,
      inward
    );
    const scale = new THREE.Vector3(
      0.025 + (i % 3) * 0.018,
      0.014 + ((i * 2) % 4) * 0.009,
      1
    );
    wallStainMatrix.compose(position, quaternion, scale);
    wall_stains.setMatrixAt(i, wallStainMatrix);
  }
  wall_stains.instanceMatrix.needsUpdate = true;
  root.add(wall_stains);

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