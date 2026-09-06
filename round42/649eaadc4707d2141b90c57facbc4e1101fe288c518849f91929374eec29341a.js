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
  });

  const burn_stainMat = new THREE.MeshStandardMaterial({
    color: 0x70401f,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const dark_stainMat = new THREE.MeshStandardMaterial({
    color: 0x3d2418,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const pan_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(1.30, 0.00),
    new THREE.Vector2(1.40, 0.03),
    new THREE.Vector2(1.48, 0.12),
    new THREE.Vector2(1.53, 0.42),
    new THREE.Vector2(1.58, 0.68),
    new THREE.Vector2(1.63, 0.76),
    new THREE.Vector2(1.64, 0.81),
    new THREE.Vector2(1.60, 0.85),
    new THREE.Vector2(1.52, 0.85),
    new THREE.Vector2(1.48, 0.79),
    new THREE.Vector2(1.45, 0.64),
    new THREE.Vector2(1.38, 0.27),
    new THREE.Vector2(1.30, 0.17),
    new THREE.Vector2(0.00, 0.17),
  ];
  const pan_bodyGeom = new THREE.LatheGeometry(pan_bodyProfile, 64);
  const pan_body = new THREE.Mesh(pan_bodyGeom, pan_bodyMat);
  pan_body.name = "pan_body";
  root.add(pan_body);

  const cooking_surfaceGeom = new THREE.CylinderGeometry(1.29, 1.29, 0.022, 64);
  const cooking_surface = new THREE.Mesh(cooking_surfaceGeom, cooking_surfaceMat);
  cooking_surface.name = "cooking_surface";
  cooking_surface.position.y = 0.181;
  root.add(cooking_surface);

  const upper_rimGeom = new THREE.TorusGeometry(1.585, 0.055, 12, 64);
  const upper_rim = new THREE.Mesh(upper_rimGeom, polished_metalMat);
  upper_rim.name = "upper_rim";
  upper_rim.rotation.x = Math.PI / 2;
  upper_rim.position.y = 0.815;
  root.add(upper_rim);

  const base_ringGeom = new THREE.TorusGeometry(1.405, 0.032, 10, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, polished_metalMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.035;
  root.add(base_ring);

  const lower_seamGeom = new THREE.TorusGeometry(1.465, 0.012, 8, 64);
  const lower_seam = new THREE.Mesh(lower_seamGeom, dark_metalMat);
  lower_seam.name = "lower_seam";
  lower_seam.rotation.x = Math.PI / 2;
  lower_seam.position.y = 0.105;
  root.add(lower_seam);

  const handle_shape = new THREE.Shape();
  handle_shape.moveTo(-0.38, -0.08);
  handle_shape.lineTo(0.38, -0.08);
  handle_shape.bezierCurveTo(0.42, 0.12, 0.34, 0.34, 0.25, 0.48);
  handle_shape.lineTo(0.18, 1.68);
  handle_shape.bezierCurveTo(0.18, 1.88, 0.10, 2.00, 0.00, 2.02);
  handle_shape.bezierCurveTo(-0.10, 2.00, -0.18, 1.88, -0.18, 1.68);
  handle_shape.lineTo(-0.25, 0.48);
  handle_shape.bezierCurveTo(-0.34, 0.34, -0.42, 0.12, -0.38, -0.08);
  handle_shape.closePath();

  const handle_holePath = new THREE.Path();
  handle_holePath.absarc(0, 1.76, 0.082, 0, Math.PI * 2, true);
  handle_shape.holes.push(handle_holePath);

  const handleGeom = new THREE.ExtrudeGeometry(handle_shape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  handleGeom.translate(0, 0, -0.06);

  const handle_assembly = new THREE.Group();
  handle_assembly.name = "handle_assembly";
  handle_assembly.position.set(1.42, 0.72, 0);
  handle_assembly.rotation.z = -1.36;

  const handle = new THREE.Mesh(handleGeom, pan_bodyMat);
  handle.name = "handle";
  handle_assembly.add(handle);

  const handle_holeGeom = new THREE.CylinderGeometry(0.071, 0.071, 0.145, 24);
  const handle_hole = new THREE.Mesh(handle_holeGeom, dark_metalMat);
  handle_hole.name = "handle_hole";
  handle_hole.rotation.x = Math.PI / 2;
  handle_hole.position.set(0, 1.76, 0);
  handle_assembly.add(handle_hole);

  const handle_hole_rimGeom = new THREE.TorusGeometry(0.082, 0.014, 8, 24);
  const handle_hole_rim = new THREE.Mesh(handle_hole_rimGeom, polished_metalMat);
  handle_hole_rim.name = "handle_hole_rim";
  handle_hole_rim.position.set(0, 1.76, 0.087);
  handle_assembly.add(handle_hole_rim);
  root.add(handle_assembly);

  const rivet_headsGeom = new THREE.SphereGeometry(1, 20, 12);
  const rivet_heads = new THREE.InstancedMesh(
    rivet_headsGeom,
    rivet_headsMat,
    3
  );
  rivet_heads.name = "rivet_heads";

  const rivet_data = [
    [1.82, 0.66, 0.115],
    [1.99, 0.64, 0.110],
    [2.16, 0.62, 0.105],
  ];
  const rivet_dummy = new THREE.Object3D();
  const rivet_axis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < rivet_data.length; i++) {
    const angle = rivet_data[i][0];
    const y = rivet_data[i][1];
    const size = rivet_data[i][2];
    const normal = new THREE.Vector3(
      -Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();

    rivet_dummy.position.set(
      Math.cos(angle) * 1.435,
      y,
      -Math.sin(angle) * 1.435
    );
    rivet_dummy.quaternion.setFromUnitVectors(rivet_axis, normal);
    rivet_dummy.scale.set(size, size, size * 0.38);
    rivet_dummy.updateMatrix();
    rivet_heads.setMatrixAt(i, rivet_dummy.matrix);
  }
  rivet_heads.instanceMatrix.needsUpdate = true;
  root.add(rivet_heads);

  const floor_stains = new THREE.Group();
  floor_stains.name = "floor_stains";

  const floor_stainGeom = new THREE.CircleGeometry(1, 20);
  const floor_stain_data = [
    [-0.95, 0.30, 0.13, 0.045, 0.30],
    [-0.72, -0.52, 0.10, 0.035, -0.45],
    [-0.28, -0.72, 0.16, 0.040, 0.15],
    [0.18, -0.68, 0.09, 0.030, -0.20],
    [0.62, -0.48, 0.14, 0.045, 0.55],
    [0.92, -0.15, 0.11, 0.032, -0.35],
    [0.75, 0.35, 0.08, 0.028, 0.20],
    [-0.55, 0.62, 0.10, 0.030, -0.60],
    [0.10, 0.55, 0.07, 0.025, 0.40],
  ];

  for (let i = 0; i < floor_stain_data.length; i++) {
    const data = floor_stain_data[i];
    const floor_stain = new THREE.Mesh(
      floor_stainGeom,
      i % 3 === 0 ? dark_stainMat : burn_stainMat
    );
    floor_stain.name = "floor_stain_" + i;
    floor_stain.rotation.x = -Math.PI / 2;
    floor_stain.rotation.z = data[4];
    floor_stain.scale.set(data[2], data[3], 1);
    floor_stain.position.set(data[0], 0.198, data[1]);
    floor_stains.add(floor_stain);
  }
  root.add(floor_stains);

  const wall_stains = new THREE.Group();
  wall_stains.name = "wall_stains";

  const wall_stain_data = [
    [2.55, 0.35, 1.405, 0.13, 0.045, 0.30],
    [2.12, 0.47, 1.425, 0.10, 0.035, -0.45],
    [1.68, 0.39, 1.410, 0.16, 0.050, 0.15],
    [1.25, 0.52, 1.435, 0.11, 0.040, 0.60],
    [0.82, 0.36, 1.405, 0.09, 0.032, -0.25],
    [3.02, 0.54, 1.445, 0.08, 0.028, 0.45],
  ];

  for (let i = 0; i < wall_stain_data.length; i++) {
    const data = wall_stain_data[i];
    const angle = data[0];
    const normal = new THREE.Vector3(
      -Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();

    const wall_stain = new THREE.Mesh(
      floor_stainGeom,
      i % 2 === 0 ? burn_stainMat : dark_stainMat
    );
    wall_stain.name = "wall_stain_" + i;
    wall_stain.quaternion.setFromUnitVectors(rivet_axis, normal);
    wall_stain.rotateZ(data[5]);
    wall_stain.scale.set(data[3], data[4], 1);
    wall_stain.position.set(
      Math.cos(angle) * data[2],
      data[1],
      -Math.sin(angle) * data[2]
    );
    wall_stains.add(wall_stain);
  }
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