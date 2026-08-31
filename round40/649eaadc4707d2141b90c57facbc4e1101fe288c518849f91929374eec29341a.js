export default function generate(THREE) {
  const root = new THREE.Group();

  const pan_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const rivet_headsMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const stainMat = new THREE.MeshStandardMaterial({
    color: 0x7b431d,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const dark_stainMat = new THREE.MeshStandardMaterial({
    color: 0x482414,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const pan_bodyProfile = [
    new THREE.Vector2(0.00, -0.20),
    new THREE.Vector2(1.08, -0.20),
    new THREE.Vector2(1.17, -0.18),
    new THREE.Vector2(1.25, -0.12),
    new THREE.Vector2(1.31, 0.02),
    new THREE.Vector2(1.36, 0.34),
    new THREE.Vector2(1.40, 0.56),
    new THREE.Vector2(1.46, 0.61),
    new THREE.Vector2(1.48, 0.65),
    new THREE.Vector2(1.45, 0.69),
    new THREE.Vector2(1.36, 0.68),
    new THREE.Vector2(1.30, 0.59),
    new THREE.Vector2(1.25, 0.36),
    new THREE.Vector2(1.18, 0.08),
    new THREE.Vector2(1.10, -0.01),
    new THREE.Vector2(0.00, -0.01),
  ];
  const pan_bodyGeom = new THREE.LatheGeometry(pan_bodyProfile, 64);
  const pan_body = new THREE.Mesh(pan_bodyGeom, pan_bodyMat);
  root.add(pan_body);

  const cooking_surfaceGeom = new THREE.CylinderGeometry(1.105, 1.105, 0.018, 64);
  const cooking_surface = new THREE.Mesh(cooking_surfaceGeom, pan_bodyMat);
  cooking_surface.position.y = -0.002;
  root.add(cooking_surface);

  const upper_rimGeom = new THREE.TorusGeometry(1.415, 0.052, 12, 64);
  const upper_rim = new THREE.Mesh(upper_rimGeom, polished_metalMat);
  upper_rim.rotation.x = Math.PI / 2;
  upper_rim.position.y = 0.655;
  root.add(upper_rim);

  const bottom_baseGeom = new THREE.CylinderGeometry(1.17, 1.17, 0.045, 64);
  const bottom_base = new THREE.Mesh(bottom_baseGeom, polished_metalMat);
  bottom_base.position.y = -0.216;
  root.add(bottom_base);

  const bottom_edgeGeom = new THREE.TorusGeometry(1.145, 0.035, 10, 64);
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, polished_metalMat);
  bottom_edge.rotation.x = Math.PI / 2;
  bottom_edge.position.y = -0.202;
  root.add(bottom_edge);

  const handle_assembly = new THREE.Group();
  handle_assembly.rotation.y = -0.42;
  root.add(handle_assembly);

  const handle_mountGeom = new THREE.CylinderGeometry(0.21, 0.21, 0.40, 24);
  const handle_mount = new THREE.Mesh(handle_mountGeom, pan_bodyMat);
  handle_mount.rotation.z = Math.PI / 2;
  handle_mount.position.set(1.27, 0.51, 0);
  handle_assembly.add(handle_mount);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(1.14, 0.42);
  handleShape.bezierCurveTo(1.38, 0.49, 1.55, 0.62, 1.76, 0.71);
  handleShape.lineTo(2.94, 1.15);
  handleShape.bezierCurveTo(3.12, 1.22, 3.25, 1.27, 3.27, 1.38);
  handleShape.bezierCurveTo(3.29, 1.49, 3.18, 1.57, 3.03, 1.55);
  handleShape.lineTo(1.72, 1.13);
  handleShape.bezierCurveTo(1.49, 1.05, 1.31, 0.91, 1.14, 0.78);
  handleShape.closePath();

  const handleHolePath = new THREE.Path();
  handleHolePath.absarc(3.08, 1.405, 0.105, 0, Math.PI * 2, false);
  handleShape.holes.push(handleHolePath);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  const handle = new THREE.Mesh(handleGeom, pan_bodyMat);
  handle.rotation.x = -Math.PI / 2;
  handle.position.y = 0.50;
  handle_assembly.add(handle);

  const handle_hole_shadowGeom = new THREE.CircleGeometry(0.084, 24);
  const handle_hole_shadow = new THREE.Mesh(handle_hole_shadowGeom, dark_metalMat);
  handle_hole_shadow.rotation.x = -Math.PI / 2;
  handle_hole_shadow.position.set(3.08, 0.505, -1.405);
  handle_assembly.add(handle_hole_shadow);

  const handle_hole_rimGeom = new THREE.TorusGeometry(0.105, 0.014, 8, 28);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, polished_metalMat);
  handle_hole_rim.rotation.x = Math.PI / 2;
  handle_hole_rim.position.set(3.08, 0.672, -1.405);
  handle_assembly.add(handle_hole_rim);

  const handle_rivets = new THREE.Group();
  handle_rivets.rotation.y = -0.42;
  root.add(handle_rivets);

  const rivet_headsGeom = new THREE.SphereGeometry(1, 18, 10);
  const rivet_heads = new THREE.InstancedMesh(rivet_headsGeom, rivet_headsMat, 3);
  const rivetDummy = new THREE.Object3D();
  const rivetAngles = [0.48, 0.76, 1.04];
  const rivetHeights = [0.47, 0.46, 0.44];

  for (let i = 0; i < 3; i++) {
    const angle = rivetAngles[i];
    const radius = 1.245;
    rivetDummy.position.set(
      Math.cos(angle) * radius,
      rivetHeights[i],
      Math.sin(angle) * radius
    );
    rivetDummy.rotation.set(0, Math.PI / 2 + angle, 0);
    rivetDummy.scale.set(0.078, 0.098, 0.035);
    rivetDummy.updateMatrix();
    rivet_heads.setMatrixAt(i, rivetDummy.matrix);
  }
  rivet_heads.instanceMatrix.needsUpdate = true;
  handle_rivets.add(rivet_heads);

  const interior_stains = new THREE.Group();
  root.add(interior_stains);

  const floor_stainGeom = new THREE.CircleGeometry(1, 14);
  const floorStainData = [
    [-0.72, 0.05, 0.13, 0.035, 0.20],
    [-0.48, 0.31, 0.10, 0.026, -0.35],
    [-0.23, 0.47, 0.17, 0.038, 0.12],
    [0.08, 0.51, 0.20, 0.045, -0.18],
    [0.39, 0.40, 0.12, 0.032, 0.46],
    [0.68, 0.18, 0.15, 0.034, -0.28],
    [0.78, -0.12, 0.09, 0.025, 0.25],
    [0.45, -0.34, 0.13, 0.029, -0.52],
    [0.04, -0.42, 0.08, 0.022, 0.10],
    [-0.44, -0.31, 0.11, 0.027, 0.55],
    [-0.83, -0.20, 0.08, 0.023, -0.15],
  ];
  const floor_stains = new THREE.InstancedMesh(
    floor_stainGeom,
    stainMat,
    floorStainData.length
  );
  const floorDummy = new THREE.Object3D();

  for (let i = 0; i < floorStainData.length; i++) {
    const data = floorStainData[i];
    floorDummy.position.set(data[0], 0.012, data[1]);
    floorDummy.rotation.set(-Math.PI / 2, 0, data[4]);
    floorDummy.scale.set(data[2], data[3], 1);
    floorDummy.updateMatrix();
    floor_stains.setMatrixAt(i, floorDummy.matrix);
  }
  floor_stains.instanceMatrix.needsUpdate = true;
  interior_stains.add(floor_stains);

  const wall_stainGeom = new THREE.CircleGeometry(1, 14);
  const wallStainData = [
    [2.66, 0.13, 0.13, 0.035, 0.25],
    [2.35, 0.22, 0.18, 0.040, -0.30],
    [2.03, 0.16, 0.11, 0.030, 0.45],
    [1.70, 0.29, 0.20, 0.045, -0.18],
    [1.39, 0.20, 0.13, 0.032, 0.34],
    [1.08, 0.31, 0.10, 0.028, -0.42],
    [0.76, 0.18, 0.15, 0.036, 0.16],
    [0.47, 0.27, 0.09, 0.025, -0.25],
  ];
  const wall_stains = new THREE.InstancedMesh(
    wall_stainGeom,
    dark_stainMat,
    wallStainData.length
  );
  const wallDummy = new THREE.Object3D();
  const decalForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < wallStainData.length; i++) {
    const data = wallStainData[i];
    const angle = data[0];
    const height = data[1];
    const radius = 1.19 + (height + 0.01) * 0.27;
    const normal = new THREE.Vector3(
      -Math.cos(angle),
      0.27,
      -Math.sin(angle)
    ).normalize();

    wallDummy.position.set(
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    );
    wallDummy.position.addScaledVector(normal, 0.008);
    wallDummy.quaternion.setFromUnitVectors(decalForward, normal);
    wallDummy.rotateZ(data[4]);
    wallDummy.scale.set(data[2], data[3], 1);
    wallDummy.updateMatrix();
    wall_stains.setMatrixAt(i, wallDummy.matrix);
  }
  wall_stains.instanceMatrix.needsUpdate = true;
  interior_stains.add(wall_stains);

  fitToUnitCube(THREE, root);
  return root;

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
}