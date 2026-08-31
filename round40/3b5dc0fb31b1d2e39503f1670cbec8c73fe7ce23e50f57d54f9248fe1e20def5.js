export default function generate(THREE) {
  const root = new THREE.Group();

  const polished_brassMat = new THREE.MeshStandardMaterial({
    color: 0xc9a75b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const light_brassMat = new THREE.MeshStandardMaterial({
    color: 0xd8bd72,
    metalness: 0.5,
    roughness: 0.25,
  });
  const aged_brassMat = new THREE.MeshStandardMaterial({
    color: 0x9b7a38,
    metalness: 0.5,
    roughness: 0.5,
  });
  const dark_engravingMat = new THREE.MeshStandardMaterial({
    color: 0x4f3b20,
    metalness: 0.4,
    roughness: 0.65,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const body_assembly = new THREE.Group();
  root.add(body_assembly);

  const main_caseGeom = new THREE.CylinderGeometry(0.64, 0.66, 0.105, 64);
  const main_case = new THREE.Mesh(main_caseGeom, aged_brassMat);
  main_case.rotation.x = Math.PI / 2;
  body_assembly.add(main_case);

  const rear_caseGeom = new THREE.CylinderGeometry(0.625, 0.64, 0.035, 64);
  const rear_case = new THREE.Mesh(rear_caseGeom, aged_brassMat);
  rear_case.rotation.x = Math.PI / 2;
  rear_case.position.z = -0.06;
  body_assembly.add(rear_case);

  const front_faceGeom = new THREE.CylinderGeometry(0.595, 0.605, 0.028, 64);
  const front_face = new THREE.Mesh(front_faceGeom, light_brassMat);
  front_face.rotation.x = Math.PI / 2;
  front_face.position.z = 0.064;
  body_assembly.add(front_face);

  const outer_bezelGeom = new THREE.TorusGeometry(0.615, 0.035, 12, 64);
  const outer_bezel = new THREE.Mesh(outer_bezelGeom, polished_brassMat);
  outer_bezel.position.z = 0.076;
  body_assembly.add(outer_bezel);

  const outer_trimGeom = new THREE.TorusGeometry(0.647, 0.009, 8, 64);
  const outer_trim = new THREE.Mesh(outer_trimGeom, aged_brassMat);
  outer_trim.position.z = 0.078;
  body_assembly.add(outer_trim);

  const inner_bezelGeom = new THREE.TorusGeometry(0.555, 0.014, 10, 64);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polished_brassMat);
  inner_bezel.position.z = 0.085;
  body_assembly.add(inner_bezel);

  const face_grooveGeom = new THREE.TorusGeometry(0.528, 0.006, 8, 64);
  const face_groove = new THREE.Mesh(face_grooveGeom, dark_engravingMat);
  face_groove.position.z = 0.088;
  body_assembly.add(face_groove);

  const flower_group = new THREE.Group();
  body_assembly.add(flower_group);

  const petalShape = new THREE.Shape();
  petalShape.moveTo(-0.052, 0.075);
  petalShape.lineTo(-0.09, 0.25);
  petalShape.lineTo(-0.046, 0.34);
  petalShape.lineTo(0, 0.475);
  petalShape.lineTo(0.046, 0.34);
  petalShape.lineTo(0.09, 0.25);
  petalShape.lineTo(0.052, 0.075);
  petalShape.closePath();

  const flower_petal_engravingsGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: false,
  });
  const flower_petal_engravings = new THREE.InstancedMesh(
    flower_petal_engravingsGeom,
    dark_engravingMat,
    8
  );

  const flower_petalsGeom = new THREE.ExtrudeGeometry(petalShape, {
    depth: 0.006,
    steps: 1,
    bevelEnabled: false,
  });
  const flower_petals = new THREE.InstancedMesh(
    flower_petalsGeom,
    light_brassMat,
    8
  );

  const petal_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;

    petal_dummy.position.set(0, 0, 0.087);
    petal_dummy.rotation.set(0, 0, angle);
    petal_dummy.scale.set(1, 1, 1);
    petal_dummy.updateMatrix();
    flower_petal_engravings.setMatrixAt(i, petal_dummy.matrix);

    petal_dummy.position.set(0, 0, 0.095);
    petal_dummy.rotation.set(0, 0, angle);
    petal_dummy.scale.set(0.86, 0.94, 1);
    petal_dummy.updateMatrix();
    flower_petals.setMatrixAt(i, petal_dummy.matrix);
  }
  flower_petal_engravings.instanceMatrix.needsUpdate = true;
  flower_petals.instanceMatrix.needsUpdate = true;
  flower_group.add(flower_petal_engravings, flower_petals);

  const flower_veinsGeom = new THREE.CylinderGeometry(0.004, 0.004, 0.29, 6);
  const flower_veins = new THREE.InstancedMesh(
    flower_veinsGeom,
    dark_engravingMat,
    24
  );
  const vein_dummy = new THREE.Object3D();
  let veinIndex = 0;
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    for (const offset of [-0.23, 0, 0.23]) {
      const direction = angle + offset;
      const radius = 0.275;
      vein_dummy.position.set(
        -Math.sin(direction) * radius,
        Math.cos(direction) * radius,
        0.105
      );
      vein_dummy.rotation.set(0, 0, angle + offset * 0.55);
      vein_dummy.scale.set(1, 1, 1);
      vein_dummy.updateMatrix();
      flower_veins.setMatrixAt(veinIndex++, vein_dummy.matrix);
    }
  }
  flower_veins.instanceMatrix.needsUpdate = true;
  flower_group.add(flower_veins);

  const armShape = new THREE.Shape();
  armShape.moveTo(-0.078, -0.045);
  armShape.lineTo(0.078, -0.045);
  armShape.lineTo(0.061, 0.27);
  armShape.lineTo(0.043, 0.60);
  armShape.lineTo(0.025, 0.91);
  armShape.lineTo(0.012, 1.015);
  armShape.lineTo(0, 1.065);
  armShape.lineTo(-0.012, 1.015);
  armShape.lineTo(-0.025, 0.91);
  armShape.lineTo(-0.043, 0.60);
  armShape.lineTo(-0.061, 0.27);
  armShape.closePath();

  const alidade_armsGeom = new THREE.ExtrudeGeometry(armShape, {
    depth: 0.028,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const alidade_arms = new THREE.InstancedMesh(
    alidade_armsGeom,
    polished_brassMat,
    2
  );

  const armAngle = Math.PI * 0.75;
  const arm_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const direction = i === 0 ? armAngle : -armAngle;
    arm_dummy.position.set(0, 0, 0.112);
    arm_dummy.rotation.set(0, 0, direction);
    arm_dummy.scale.set(1, 1, 1);
    arm_dummy.updateMatrix();
    alidade_arms.setMatrixAt(i, arm_dummy.matrix);
  }
  alidade_arms.instanceMatrix.needsUpdate = true;
  body_assembly.add(alidade_arms);

  const pivot_baseGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.052, 32);
  const pivot_base = new THREE.Mesh(pivot_baseGeom, aged_brassMat);
  pivot_base.rotation.x = Math.PI / 2;
  pivot_base.position.z = 0.137;
  body_assembly.add(pivot_base);

  const pivot_capGeom = new THREE.CylinderGeometry(0.116, 0.126, 0.04, 32);
  const pivot_cap = new THREE.Mesh(pivot_capGeom, polished_brassMat);
  pivot_cap.rotation.x = Math.PI / 2;
  pivot_cap.position.z = 0.166;
  body_assembly.add(pivot_cap);

  const pivot_screwGeom = new THREE.SphereGeometry(0.058, 24, 12);
  const pivot_screw = new THREE.Mesh(pivot_screwGeom, silverMat);
  pivot_screw.position.z = 0.196;
  pivot_screw.scale.set(1, 1, 0.58);
  body_assembly.add(pivot_screw);

  const crown_assembly = new THREE.Group();
  crown_assembly.position.set(0, 0.57, -0.012);
  root.add(crown_assembly);

  const crown_socketGeom = new THREE.CylinderGeometry(0.098, 0.112, 0.12, 32);
  const crown_socket = new THREE.Mesh(crown_socketGeom, aged_brassMat);
  crown_socket.position.y = 0.045;
  crown_assembly.add(crown_socket);

  const winding_crownGeom = new THREE.CylinderGeometry(0.136, 0.136, 0.115, 32);
  const winding_crown = new THREE.Mesh(winding_crownGeom, polished_brassMat);
  winding_crown.position.y = 0.13;
  crown_assembly.add(winding_crown);

  const crown_ridgesGeom = new THREE.BoxGeometry(0.014, 0.105, 0.025);
  const crown_ridges = new THREE.InstancedMesh(
    crown_ridgesGeom,
    light_brassMat,
    24
  );
  const crown_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    crown_dummy.position.set(
      Math.cos(angle) * 0.137,
      0.13,
      Math.sin(angle) * 0.137
    );
    crown_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    crown_dummy.scale.set(1, 1, 1);
    crown_dummy.updateMatrix();
    crown_ridges.setMatrixAt(i, crown_dummy.matrix);
  }
  crown_ridges.instanceMatrix.needsUpdate = true;
  crown_assembly.add(crown_ridges);

  const crown_lower_bandGeom = new THREE.TorusGeometry(0.127, 0.012, 8, 32);
  const crown_lower_band = new THREE.Mesh(crown_lower_bandGeom, aged_brassMat);
  crown_lower_band.rotation.x = Math.PI / 2;
  crown_lower_band.position.y = 0.078;
  crown_assembly.add(crown_lower_band);

  const crown_upper_bandGeom = new THREE.TorusGeometry(0.127, 0.012, 8, 32);
  const crown_upper_band = new THREE.Mesh(crown_upper_bandGeom, aged_brassMat);
  crown_upper_band.rotation.x = Math.PI / 2;
  crown_upper_band.position.y = 0.184;
  crown_assembly.add(crown_upper_band);

  const crown_stemGeom = new THREE.CylinderGeometry(0.078, 0.086, 0.11, 32);
  const crown_stem = new THREE.Mesh(crown_stemGeom, polished_brassMat);
  crown_stem.position.y = 0.225;
  crown_assembly.add(crown_stem);

  const crown_bulbGeom = new THREE.SphereGeometry(0.102, 28, 16);
  const crown_bulb = new THREE.Mesh(crown_bulbGeom, light_brassMat);
  crown_bulb.position.y = 0.305;
  crown_bulb.scale.set(1, 0.86, 1);
  crown_assembly.add(crown_bulb);

  const loop_mountGeom = new THREE.CylinderGeometry(0.06, 0.075, 0.08, 28);
  const loop_mount = new THREE.Mesh(loop_mountGeom, polished_brassMat);
  loop_mount.position.y = 0.39;
  crown_assembly.add(loop_mount);

  const suspension_ringGeom = new THREE.TorusGeometry(0.19, 0.036, 12, 56);
  const suspension_ring = new THREE.Mesh(
    suspension_ringGeom,
    polished_brassMat
  );
  suspension_ring.position.set(0, 0.60, -0.012);
  crown_assembly.add(suspension_ring);

  const ring_inner_edgeGeom = new THREE.TorusGeometry(0.154, 0.007, 8, 56);
  const ring_inner_edge = new THREE.Mesh(ring_inner_edgeGeom, aged_brassMat);
  ring_inner_edge.position.set(0, 0.60, -0.014);
  crown_assembly.add(ring_inner_edge);

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