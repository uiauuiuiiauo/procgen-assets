export default function generate(THREE) {
  const root = new THREE.Group();
  const pen_group = new THREE.Group();
  root.add(pen_group);

  const blue_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x86a9c6,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blue_seamMat = new THREE.MeshStandardMaterial({
    color: 0x496b88,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_gasketMat = new THREE.MeshStandardMaterial({
    color: 0x252b2f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const control_markMat = new THREE.MeshStandardMaterial({
    color: 0x334d63,
    metalness: 0.0,
    roughness: 0.7,
  });

  const rear_capProfile = [
    new THREE.Vector2(0.00, -0.36),
    new THREE.Vector2(0.40, -0.36),
    new THREE.Vector2(0.48, -0.345),
    new THREE.Vector2(0.54, -0.30),
    new THREE.Vector2(0.57, -0.20),
    new THREE.Vector2(0.575, 0.22),
    new THREE.Vector2(0.56, 0.31),
    new THREE.Vector2(0.52, 0.36),
    new THREE.Vector2(0.00, 0.36),
  ];
  const rear_capGeom = new THREE.LatheGeometry(rear_capProfile, 64);
  const rear_cap = new THREE.Mesh(rear_capGeom, blue_bodyMat);
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -2.24;
  pen_group.add(rear_cap);

  const main_barrelProfile = [
    new THREE.Vector2(0.00, -1.04),
    new THREE.Vector2(0.50, -1.04),
    new THREE.Vector2(0.54, -1.00),
    new THREE.Vector2(0.565, -0.91),
    new THREE.Vector2(0.57, -0.78),
    new THREE.Vector2(0.57, 0.82),
    new THREE.Vector2(0.56, 0.94),
    new THREE.Vector2(0.52, 1.02),
    new THREE.Vector2(0.00, 1.04),
  ];
  const main_barrelGeom = new THREE.LatheGeometry(main_barrelProfile, 64);
  const main_barrel = new THREE.Mesh(main_barrelGeom, blue_bodyMat);
  main_barrel.rotation.x = Math.PI / 2;
  main_barrel.position.z = -1.18;
  pen_group.add(main_barrel);

  const center_sleeveProfile = [
    new THREE.Vector2(0.00, -0.58),
    new THREE.Vector2(0.48, -0.58),
    new THREE.Vector2(0.52, -0.54),
    new THREE.Vector2(0.545, -0.45),
    new THREE.Vector2(0.545, 0.45),
    new THREE.Vector2(0.53, 0.53),
    new THREE.Vector2(0.49, 0.58),
    new THREE.Vector2(0.00, 0.58),
  ];
  const center_sleeveGeom = new THREE.LatheGeometry(center_sleeveProfile, 64);
  const center_sleeve = new THREE.Mesh(center_sleeveGeom, blue_bodyMat);
  center_sleeve.rotation.x = Math.PI / 2;
  center_sleeve.position.z = 0.22;
  pen_group.add(center_sleeve);

  const front_barrelProfile = [
    new THREE.Vector2(0.00, -0.98),
    new THREE.Vector2(0.48, -0.98),
    new THREE.Vector2(0.52, -0.94),
    new THREE.Vector2(0.55, -0.84),
    new THREE.Vector2(0.56, -0.69),
    new THREE.Vector2(0.56, 0.58),
    new THREE.Vector2(0.545, 0.72),
    new THREE.Vector2(0.49, 0.88),
    new THREE.Vector2(0.00, 0.90),
  ];
  const front_barrelGeom = new THREE.LatheGeometry(front_barrelProfile, 64);
  const front_barrel = new THREE.Mesh(front_barrelGeom, blue_bodyMat);
  front_barrel.rotation.x = Math.PI / 2;
  front_barrel.position.z = 1.70;
  pen_group.add(front_barrel);

  const barrel_seamGeom = new THREE.TorusGeometry(0.538, 0.012, 8, 64);
  const barrel_seams = new THREE.InstancedMesh(
    barrel_seamGeom,
    blue_seamMat,
    3
  );
  const seam_transform = new THREE.Object3D();
  const seam_positions = [-1.72, -0.36, 0.80];
  for (let i = 0; i < seam_positions.length; i++) {
    seam_transform.position.set(0, 0, seam_positions[i]);
    seam_transform.rotation.set(0, 0, 0);
    seam_transform.scale.set(1, 1, 1);
    seam_transform.updateMatrix();
    barrel_seams.setMatrixAt(i, seam_transform.matrix);
  }
  barrel_seams.instanceMatrix.needsUpdate = true;
  pen_group.add(barrel_seams);

  const nose_collarProfile = [
    new THREE.Vector2(0.00, -0.28),
    new THREE.Vector2(0.42, -0.28),
    new THREE.Vector2(0.47, -0.24),
    new THREE.Vector2(0.49, -0.15),
    new THREE.Vector2(0.46, 0.02),
    new THREE.Vector2(0.38, 0.20),
    new THREE.Vector2(0.28, 0.27),
    new THREE.Vector2(0.00, 0.28),
  ];
  const nose_collarGeom = new THREE.LatheGeometry(nose_collarProfile, 64);
  const nose_collar = new THREE.Mesh(nose_collarGeom, polished_metalMat);
  nose_collar.rotation.x = Math.PI / 2;
  nose_collar.position.z = 2.80;
  pen_group.add(nose_collar);

  const nose_gasketGeom = new THREE.TorusGeometry(0.245, 0.018, 8, 48);
  const nose_gasket = new THREE.Mesh(nose_gasketGeom, dark_gasketMat);
  nose_gasket.position.z = 3.075;
  pen_group.add(nose_gasket);

  const nib_shaftGeom = new THREE.CylinderGeometry(0.17, 0.19, 0.54, 40);
  const nib_shaft = new THREE.Mesh(nib_shaftGeom, silver_metalMat);
  nib_shaft.rotation.x = Math.PI / 2;
  nib_shaft.position.z = 3.32;
  pen_group.add(nib_shaft);

  const shaft_ringGeom = new THREE.TorusGeometry(0.178, 0.012, 8, 40);
  const shaft_ring = new THREE.Mesh(shaft_ringGeom, polished_metalMat);
  shaft_ring.position.z = 3.55;
  pen_group.add(shaft_ring);

  const nib_baseGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.10, 40);
  const nib_base = new THREE.Mesh(nib_baseGeom, polished_metalMat);
  nib_base.rotation.x = Math.PI / 2;
  nib_base.position.z = 3.61;
  pen_group.add(nib_base);

  const nib_base_ringGeom = new THREE.TorusGeometry(0.205, 0.018, 8, 48);
  const nib_base_ring = new THREE.Mesh(nib_base_ringGeom, silver_metalMat);
  nib_base_ring.position.z = 3.66;
  pen_group.add(nib_base_ring);

  const nib_coneProfile = [
    new THREE.Vector2(0.00, -0.34),
    new THREE.Vector2(0.20, -0.34),
    new THREE.Vector2(0.235, -0.29),
    new THREE.Vector2(0.22, -0.20),
    new THREE.Vector2(0.18, -0.08),
    new THREE.Vector2(0.135, 0.06),
    new THREE.Vector2(0.085, 0.19),
    new THREE.Vector2(0.035, 0.30),
    new THREE.Vector2(0.00, 0.35),
  ];
  const nib_coneGeom = new THREE.LatheGeometry(nib_coneProfile, 48);
  const nib_cone = new THREE.Mesh(nib_coneGeom, polished_metalMat);
  nib_cone.rotation.x = Math.PI / 2;
  nib_cone.position.z = 3.98;
  pen_group.add(nib_cone);

  const control_markGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.16,
    12
  );
  const control_mark = new THREE.Mesh(control_markGeom, control_markMat);
  control_mark.rotation.x = Math.PI / 2;
  control_mark.position.set(0.14, -0.523, 0.20);
  pen_group.add(control_mark);

  pen_group.rotation.set(0, -Math.PI / 2, -Math.PI / 4);

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