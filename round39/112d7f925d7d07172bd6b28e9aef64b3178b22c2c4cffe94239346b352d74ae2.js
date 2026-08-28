export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const wheel_assembly = new THREE.Group();
  wheel_assembly.name = "wheel_assembly";
  wheel_assembly.rotation.set(0, 0.36, -0.025);
  root.add(wheel_assembly);

  const wheel_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x747678,
    metalness: 0.6,
    roughness: 0.5,
  });
  const hub_metalMat = new THREE.MeshStandardMaterial({
    color: 0x555759,
    metalness: 0.6,
    roughness: 0.5,
  });
  const edge_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const cap_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x202122,
    metalness: 0.0,
    roughness: 0.8,
  });

  const wheel_bodyProfile = [
    new THREE.Vector2(0.00, -0.115),
    new THREE.Vector2(0.72, -0.115),
    new THREE.Vector2(0.88, -0.108),
    new THREE.Vector2(0.96, -0.082),
    new THREE.Vector2(0.995, -0.035),
    new THREE.Vector2(1.00, 0.018),
    new THREE.Vector2(0.982, 0.065),
    new THREE.Vector2(0.945, 0.102),
    new THREE.Vector2(0.895, 0.122),
    new THREE.Vector2(0.00, 0.122),
  ];
  const wheel_bodyGeom = new THREE.LatheGeometry(wheel_bodyProfile, 64);
  const wheel_body = new THREE.Mesh(wheel_bodyGeom, wheel_bodyMat);
  wheel_body.name = "wheel_body";
  wheel_body.rotation.z = -Math.PI / 2;
  wheel_assembly.add(wheel_body);

  const front_faceGeom = new THREE.CylinderGeometry(0.89, 0.89, 0.018, 64);
  const front_face = new THREE.Mesh(front_faceGeom, wheel_bodyMat);
  front_face.name = "front_face";
  front_face.rotation.z = -Math.PI / 2;
  front_face.position.x = 0.131;
  wheel_assembly.add(front_face);

  const back_faceGeom = new THREE.CylinderGeometry(0.86, 0.86, 0.014, 64);
  const back_face = new THREE.Mesh(back_faceGeom, wheel_bodyMat);
  back_face.name = "back_face";
  back_face.rotation.z = -Math.PI / 2;
  back_face.position.x = -0.121;
  wheel_assembly.add(back_face);

  const outer_rimGeom = new THREE.TorusGeometry(0.94, 0.027, 12, 64);
  const outer_rim = new THREE.Mesh(outer_rimGeom, edge_metalMat);
  outer_rim.name = "outer_rim";
  outer_rim.rotation.y = Math.PI / 2;
  outer_rim.position.x = 0.145;
  wheel_assembly.add(outer_rim);

  const back_rimGeom = new THREE.TorusGeometry(0.94, 0.024, 10, 64);
  const back_rim = new THREE.Mesh(back_rimGeom, edge_metalMat);
  back_rim.name = "back_rim";
  back_rim.rotation.y = Math.PI / 2;
  back_rim.position.x = -0.112;
  wheel_assembly.add(back_rim);

  const face_grooveGeom = new THREE.TorusGeometry(0.875, 0.009, 8, 64);
  const face_groove = new THREE.Mesh(face_grooveGeom, grooveMat);
  face_groove.name = "face_groove";
  face_groove.rotation.y = Math.PI / 2;
  face_groove.position.x = 0.149;
  wheel_assembly.add(face_groove);

  const rear_bossGeom = new THREE.CylinderGeometry(0.275, 0.275, 0.105, 40);
  const rear_boss = new THREE.Mesh(rear_bossGeom, hub_metalMat);
  rear_boss.name = "rear_boss";
  rear_boss.rotation.z = -Math.PI / 2;
  rear_boss.position.x = -0.151;
  wheel_assembly.add(rear_boss);

  const rear_hubGeom = new THREE.CylinderGeometry(0.245, 0.285, 0.39, 40);
  const rear_hub = new THREE.Mesh(rear_hubGeom, hub_metalMat);
  rear_hub.name = "rear_hub";
  rear_hub.rotation.z = -Math.PI / 2;
  rear_hub.position.x = -0.355;
  wheel_assembly.add(rear_hub);

  const rear_hub_grooveGeom = new THREE.TorusGeometry(0.267, 0.009, 8, 40);
  const rear_hub_groove = new THREE.Mesh(rear_hub_grooveGeom, grooveMat);
  rear_hub_groove.name = "rear_hub_groove";
  rear_hub_groove.rotation.y = Math.PI / 2;
  rear_hub_groove.position.x = -0.225;
  wheel_assembly.add(rear_hub_groove);

  const rear_end_capGeom = new THREE.CylinderGeometry(0.23, 0.23, 0.018, 40);
  const rear_end_cap = new THREE.Mesh(rear_end_capGeom, hub_metalMat);
  rear_end_cap.name = "rear_end_cap";
  rear_end_cap.rotation.z = -Math.PI / 2;
  rear_end_cap.position.x = -0.558;
  wheel_assembly.add(rear_end_cap);

  const front_bossGeom = new THREE.CylinderGeometry(0.31, 0.31, 0.105, 48);
  const front_boss = new THREE.Mesh(front_bossGeom, hub_metalMat);
  front_boss.name = "front_boss";
  front_boss.rotation.z = -Math.PI / 2;
  front_boss.position.x = 0.176;
  wheel_assembly.add(front_boss);

  const front_boss_grooveGeom = new THREE.TorusGeometry(0.296, 0.01, 8, 48);
  const front_boss_groove = new THREE.Mesh(front_boss_grooveGeom, grooveMat);
  front_boss_groove.name = "front_boss_groove";
  front_boss_groove.rotation.y = Math.PI / 2;
  front_boss_groove.position.x = 0.216;
  wheel_assembly.add(front_boss_groove);

  const front_flangeGeom = new THREE.CylinderGeometry(0.35, 0.35, 0.105, 48);
  const front_flange = new THREE.Mesh(front_flangeGeom, hub_metalMat);
  front_flange.name = "front_flange";
  front_flange.rotation.z = -Math.PI / 2;
  front_flange.position.x = 0.255;
  wheel_assembly.add(front_flange);

  const front_flange_rimGeom = new THREE.TorusGeometry(0.334, 0.014, 10, 48);
  const front_flange_rim = new THREE.Mesh(front_flange_rimGeom, edge_metalMat);
  front_flange_rim.name = "front_flange_rim";
  front_flange_rim.rotation.y = Math.PI / 2;
  front_flange_rim.position.x = 0.303;
  wheel_assembly.add(front_flange_rim);

  const front_hub_barrelGeom = new THREE.CylinderGeometry(0.275, 0.305, 0.38, 48);
  const front_hub_barrel = new THREE.Mesh(front_hub_barrelGeom, hub_metalMat);
  front_hub_barrel.name = "front_hub_barrel";
  front_hub_barrel.rotation.z = -Math.PI / 2;
  front_hub_barrel.position.x = 0.47;
  wheel_assembly.add(front_hub_barrel);

  const hub_seamGeom = new THREE.TorusGeometry(0.291, 0.009, 8, 48);
  const hub_seam = new THREE.Mesh(hub_seamGeom, grooveMat);
  hub_seam.name = "hub_seam";
  hub_seam.rotation.y = Math.PI / 2;
  hub_seam.position.x = 0.354;
  wheel_assembly.add(hub_seam);

  const locking_ringGeom = new THREE.TorusGeometry(0.285, 0.023, 10, 48);
  const locking_ring = new THREE.Mesh(locking_ringGeom, hub_metalMat);
  locking_ring.name = "locking_ring";
  locking_ring.rotation.y = Math.PI / 2;
  locking_ring.position.x = 0.382;
  wheel_assembly.add(locking_ring);

  const front_end_capGeom = new THREE.CylinderGeometry(0.255, 0.255, 0.035, 48);
  const front_end_cap = new THREE.Mesh(front_end_capGeom, edge_metalMat);
  front_end_cap.name = "front_end_cap";
  front_end_cap.rotation.z = -Math.PI / 2;
  front_end_cap.position.x = 0.67;
  wheel_assembly.add(front_end_cap);

  const front_cap_insetGeom = new THREE.CylinderGeometry(0.178, 0.178, 0.014, 40);
  const front_cap_inset = new THREE.Mesh(front_cap_insetGeom, cap_metalMat);
  front_cap_inset.name = "front_cap_inset";
  front_cap_inset.rotation.z = -Math.PI / 2;
  front_cap_inset.position.x = 0.692;
  wheel_assembly.add(front_cap_inset);

  const front_cap_grooveGeom = new THREE.TorusGeometry(0.187, 0.007, 8, 40);
  const front_cap_groove = new THREE.Mesh(front_cap_grooveGeom, grooveMat);
  front_cap_groove.name = "front_cap_groove";
  front_cap_groove.rotation.y = Math.PI / 2;
  front_cap_groove.position.x = 0.696;
  wheel_assembly.add(front_cap_groove);

  const set_screw_holesGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.013, 16);
  const set_screw_holes = new THREE.InstancedMesh(
    set_screw_holesGeom,
    grooveMat,
    3
  );
  set_screw_holes.name = "set_screw_holes";
  const screw_angle = Math.PI / 6;
  const screw_radius = 0.306;
  const screw_dummy = new THREE.Object3D();
  const screw_axis = new THREE.Vector3(1, 0, 0);

  for (let i = 0; i < 3; i++) {
    const angle = screw_angle + i * Math.PI * 2 / 3;
    const radial = new THREE.Vector3(
      0,
      Math.cos(angle),
      Math.sin(angle)
    ).normalize();
    screw_dummy.position.set(
      0.405,
      radial.y * screw_radius,
      radial.z * screw_radius
    );
    screw_dummy.quaternion.setFromUnitVectors(screw_axis, radial);
    screw_dummy.updateMatrix();
    set_screw_holes.setMatrixAt(i, screw_dummy.matrix);
  }
  set_screw_holes.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(set_screw_holes);

  const cap_dimplesGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 12);
  const cap_dimples = new THREE.InstancedMesh(cap_dimplesGeom, grooveMat, 2);
  cap_dimples.name = "cap_dimples";
  const dimple_dummy = new THREE.Object3D();
  const dimple_axis = new THREE.Vector3(1, 0, 0);

  for (let i = 0; i < 2; i++) {
    const angle = i * Math.PI;
    const radial = new THREE.Vector3(
      0,
      Math.cos(angle),
      Math.sin(angle)
    ).normalize();
    dimple_dummy.position.set(
      0.662,
      radial.y * 0.267,
      radial.z * 0.267
    );
    dimple_dummy.quaternion.setFromUnitVectors(dimple_axis, radial);
    dimple_dummy.updateMatrix();
    cap_dimples.setMatrixAt(i, dimple_dummy.matrix);
  }
  cap_dimples.instanceMatrix.needsUpdate = true;
  wheel_assembly.add(cap_dimples);

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