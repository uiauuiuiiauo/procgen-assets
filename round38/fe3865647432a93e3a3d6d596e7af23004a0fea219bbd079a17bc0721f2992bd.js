export default function generate(THREE) {
  const root = new THREE.Group();
  const marker_group = new THREE.Group();
  marker_group.name = "marker_group";
  marker_group.rotation.y = -0.32;
  root.add(marker_group);

  const purpleMat = new THREE.MeshStandardMaterial({
    color: 0x7136c7,
    metalness: 0.0,
    roughness: 0.8,
  });
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x773bd0,
    metalness: 0.0,
    roughness: 0.8,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x56239d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x2b0756,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const main_bodyProfile = [
    new THREE.Vector2(0.00, -1.72),
    new THREE.Vector2(0.28, -1.72),
    new THREE.Vector2(0.35, -1.69),
    new THREE.Vector2(0.40, -1.62),
    new THREE.Vector2(0.42, -1.52),
    new THREE.Vector2(0.42, 0.70),
    new THREE.Vector2(0.415, 0.80),
    new THREE.Vector2(0.39, 0.87),
    new THREE.Vector2(0.00, 0.87),
  ];
  const main_bodyGeom = new THREE.LatheGeometry(main_bodyProfile, 48);
  const main_body = new THREE.Mesh(main_bodyGeom, purpleMat);
  main_body.name = "main_body";
  main_body.rotation.z = -Math.PI / 2;
  marker_group.add(main_body);

  const front_endGeom = new THREE.CircleGeometry(0.278, 32);
  const front_end = new THREE.Mesh(front_endGeom, grooveMat);
  front_end.name = "front_end";
  front_end.rotation.y = Math.PI / 2;
  front_end.position.x = -1.723;
  marker_group.add(front_end);

  const cap_shellProfile = [
    new THREE.Vector2(0.00, 0.82),
    new THREE.Vector2(0.39, 0.82),
    new THREE.Vector2(0.418, 0.88),
    new THREE.Vector2(0.43, 1.00),
    new THREE.Vector2(0.43, 1.47),
    new THREE.Vector2(0.42, 1.55),
    new THREE.Vector2(0.39, 1.64),
    new THREE.Vector2(0.34, 1.72),
    new THREE.Vector2(0.00, 1.72),
  ];
  const cap_shellGeom = new THREE.LatheGeometry(cap_shellProfile, 48);
  const cap_shell = new THREE.Mesh(cap_shellGeom, capMat);
  cap_shell.name = "cap_shell";
  cap_shell.rotation.z = -Math.PI / 2;
  marker_group.add(cap_shell);

  const seam_ringGeom = new THREE.TorusGeometry(0.412, 0.012, 8, 48);
  const seam_ring = new THREE.Mesh(seam_ringGeom, grooveMat);
  seam_ring.name = "seam_ring";
  seam_ring.rotation.y = Math.PI / 2;
  seam_ring.position.x = 0.855;
  marker_group.add(seam_ring);

  const grip_baseGeom = new THREE.CylinderGeometry(0.438, 0.438, 0.66, 48);
  const grip_base = new THREE.Mesh(grip_baseGeom, capMat);
  grip_base.name = "grip_base";
  grip_base.rotation.z = -Math.PI / 2;
  grip_base.position.x = 1.47;
  marker_group.add(grip_base);

  const grip_ribsGeom = new THREE.BoxGeometry(0.58, 0.032, 0.026);
  const grip_ribs = new THREE.InstancedMesh(grip_ribsGeom, capMat, 28);
  grip_ribs.name = "grip_ribs";
  const grip_rib_transform = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    grip_rib_transform.position.set(
      1.47,
      Math.cos(angle) * 0.447,
      Math.sin(angle) * 0.447
    );
    grip_rib_transform.rotation.set(angle, 0, 0);
    grip_rib_transform.updateMatrix();
    grip_ribs.setMatrixAt(i, grip_rib_transform.matrix);
  }
  grip_ribs.instanceMatrix.needsUpdate = true;
  marker_group.add(grip_ribs);

  const grip_front_ringGeom = new THREE.TorusGeometry(0.432, 0.014, 8, 48);
  const grip_front_ring = new THREE.Mesh(grip_front_ringGeom, capMat);
  grip_front_ring.name = "grip_front_ring";
  grip_front_ring.rotation.y = Math.PI / 2;
  grip_front_ring.position.x = 1.16;
  marker_group.add(grip_front_ring);

  const grip_rear_ringGeom = new THREE.TorusGeometry(0.429, 0.015, 8, 48);
  const grip_rear_ring = new THREE.Mesh(grip_rear_ringGeom, capMat);
  grip_rear_ring.name = "grip_rear_ring";
  grip_rear_ring.rotation.y = Math.PI / 2;
  grip_rear_ring.position.x = 1.77;
  marker_group.add(grip_rear_ring);

  const hole_recessGeom = new THREE.CircleGeometry(0.108, 32);
  const hole_recess = new THREE.Mesh(hole_recessGeom, holeMat);
  hole_recess.name = "hole_recess";
  hole_recess.rotation.x = -Math.PI / 2;
  hole_recess.position.set(1.08, 0.434, 0);
  marker_group.add(hole_recess);

  const hole_rimGeom = new THREE.TorusGeometry(0.116, 0.021, 10, 36);
  const hole_rim = new THREE.Mesh(hole_rimGeom, capMat);
  hole_rim.name = "hole_rim";
  hole_rim.rotation.x = -Math.PI / 2;
  hole_rim.position.set(1.08, 0.439, 0);
  marker_group.add(hole_rim);

  const hole_depthGeom = new THREE.CircleGeometry(0.071, 28);
  const hole_depth = new THREE.Mesh(hole_depthGeom, holeMat);
  hole_depth.name = "hole_depth";
  hole_depth.rotation.x = -Math.PI / 2;
  hole_depth.position.set(1.08, 0.441, 0);
  marker_group.add(hole_depth);

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