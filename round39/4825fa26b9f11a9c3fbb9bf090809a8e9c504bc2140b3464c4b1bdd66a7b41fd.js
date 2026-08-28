export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "round_window";

  const frame_assembly = new THREE.Group();
  frame_assembly.name = "frame_assembly";
  root.add(frame_assembly);

  const glazing_assembly = new THREE.Group();
  glazing_assembly.name = "glazing_assembly";
  root.add(glazing_assembly);

  const hardware_assembly = new THREE.Group();
  hardware_assembly.name = "hardware_assembly";
  root.add(hardware_assembly);

  const outer_frameMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide
  });

  const inner_bezelMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide
  });

  const rear_gasketMat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const glass_backingMat = new THREE.MeshStandardMaterial({
    color: 0xdce7e6,
    metalness: 0.0,
    roughness: 0.7
  });

  const glass_paneMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde7e6,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true
  });

  const screw_headsMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const screw_detailsMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const outer_frameProfile = [
    new THREE.Vector2(0.750, -0.035),
    new THREE.Vector2(0.750, 0.025),
    new THREE.Vector2(0.762, 0.070),
    new THREE.Vector2(0.790, 0.102),
    new THREE.Vector2(0.835, 0.116),
    new THREE.Vector2(0.900, 0.108),
    new THREE.Vector2(0.955, 0.078),
    new THREE.Vector2(0.988, 0.035),
    new THREE.Vector2(1.000, -0.010),
    new THREE.Vector2(0.987, -0.060),
    new THREE.Vector2(0.950, -0.094),
    new THREE.Vector2(0.885, -0.108),
    new THREE.Vector2(0.805, -0.096),
    new THREE.Vector2(0.760, -0.067),
    new THREE.Vector2(0.750, -0.035)
  ];
  const outer_frameGeom = new THREE.LatheGeometry(outer_frameProfile, 96);
  const outer_frame = new THREE.Mesh(outer_frameGeom, outer_frameMat);
  outer_frame.name = "outer_frame";
  outer_frame.rotation.x = Math.PI / 2;
  frame_assembly.add(outer_frame);

  const inner_bezelGeom = new THREE.TorusGeometry(0.778, 0.023, 16, 96);
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, inner_bezelMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.103;
  frame_assembly.add(inner_bezel);

  const inner_bezel_stepGeom = new THREE.TorusGeometry(0.811, 0.009, 12, 96);
  const inner_bezel_step = new THREE.Mesh(inner_bezel_stepGeom, inner_bezelMat);
  inner_bezel_step.name = "inner_bezel_step";
  inner_bezel_step.position.z = 0.112;
  frame_assembly.add(inner_bezel_step);

  const outer_frame_edgeGeom = new THREE.TorusGeometry(0.968, 0.012, 12, 96);
  const outer_frame_edge = new THREE.Mesh(outer_frame_edgeGeom, inner_bezelMat);
  outer_frame_edge.name = "outer_frame_edge";
  outer_frame_edge.position.z = 0.083;
  frame_assembly.add(outer_frame_edge);

  const glass_backingGeom = new THREE.CylinderGeometry(0.716, 0.716, 0.014, 96);
  const glass_backing = new THREE.Mesh(glass_backingGeom, glass_backingMat);
  glass_backing.name = "glass_backing";
  glass_backing.rotation.x = Math.PI / 2;
  glass_backing.position.z = -0.030;
  glazing_assembly.add(glass_backing);

  const glass_paneGeom = new THREE.CylinderGeometry(0.716, 0.716, 0.018, 96);
  const glass_pane = new THREE.Mesh(glass_paneGeom, glass_paneMat);
  glass_pane.name = "glass_pane";
  glass_pane.rotation.x = Math.PI / 2;
  glass_pane.position.z = 0.020;
  glazing_assembly.add(glass_pane);

  const rear_gasketGeom = new THREE.RingGeometry(0.714, 0.754, 96);
  const rear_gasket = new THREE.Mesh(rear_gasketGeom, rear_gasketMat);
  rear_gasket.name = "rear_gasket";
  rear_gasket.position.z = 0.034;
  glazing_assembly.add(rear_gasket);

  const inner_gasketGeom = new THREE.TorusGeometry(0.735, 0.012, 12, 96);
  const inner_gasket = new THREE.Mesh(inner_gasketGeom, rear_gasketMat);
  inner_gasket.name = "inner_gasket";
  inner_gasket.position.z = 0.052;
  glazing_assembly.add(inner_gasket);

  const screwCount = 6;
  const screw_headsGeom = new THREE.CylinderGeometry(0.027, 0.032, 0.014, 20);
  const screw_heads = new THREE.InstancedMesh(
    screw_headsGeom,
    screw_headsMat,
    screwCount
  );
  screw_heads.name = "screw_heads";

  const screw_rimsGeom = new THREE.TorusGeometry(0.029, 0.003, 8, 24);
  const screw_rims = new THREE.InstancedMesh(
    screw_rimsGeom,
    screw_detailsMat,
    screwCount
  );
  screw_rims.name = "screw_rims";

  const screwSlotLength = 0.034;
  const screw_slotsGeom = new THREE.BoxGeometry(
    screwSlotLength,
    0.006,
    0.003
  );
  const screw_slots = new THREE.InstancedMesh(
    screw_slotsGeom,
    screw_detailsMat,
    screwCount * 2
  );
  screw_slots.name = "screw_slots";

  const screwRadius = 0.875;
  const screwDummy = new THREE.Object3D();
  for (let i = 0; i < screwCount; i++) {
    const angle = Math.PI / 6 + i / screwCount * Math.PI * 2;
    const x = Math.cos(angle) * screwRadius;
    const y = Math.sin(angle) * screwRadius;

    screwDummy.position.set(x, y, 0.116);
    screwDummy.rotation.set(Math.PI / 2, 0, 0);
    screwDummy.scale.set(1, 1, 1);
    screwDummy.updateMatrix();
    screw_heads.setMatrixAt(i, screwDummy.matrix);

    screwDummy.position.set(x, y, 0.124);
    screwDummy.rotation.set(0, 0, 0);
    screwDummy.scale.set(1, 1, 1);
    screwDummy.updateMatrix();
    screw_rims.setMatrixAt(i, screwDummy.matrix);

    const slotAngle = i % 2 === 0 ? angle * 0.37 + 0.25 : -angle * 0.29 - 0.18;
    for (let j = 0; j < 2; j++) {
      screwDummy.position.set(x, y, 0.127);
      screwDummy.rotation.set(0, 0, slotAngle + j * Math.PI / 2);
      screwDummy.scale.set(1, 1, 1);
      screwDummy.updateMatrix();
      screw_slots.setMatrixAt(i * 2 + j, screwDummy.matrix);
    }
  }
  screw_heads.instanceMatrix.needsUpdate = true;
  screw_rims.instanceMatrix.needsUpdate = true;
  screw_slots.instanceMatrix.needsUpdate = true;
  hardware_assembly.add(screw_heads, screw_rims, screw_slots);

  const seamAngle = -0.055;
  const seamRadius = 0.944;
  const frame_seamGeom = new THREE.BoxGeometry(0.006, 0.105, 0.004);
  const frame_seam = new THREE.Mesh(frame_seamGeom, screw_detailsMat);
  frame_seam.name = "frame_seam";
  frame_seam.position.set(
    Math.cos(seamAngle) * seamRadius,
    Math.sin(seamAngle) * seamRadius,
    0.117
  );
  frame_seam.rotation.z = seamAngle - Math.PI / 2;
  hardware_assembly.add(frame_seam);

  const hinge_mountGeom = new THREE.CylinderGeometry(0.067, 0.067, 0.022, 32);
  const hinge_mount = new THREE.Mesh(hinge_mountGeom, inner_bezelMat);
  hinge_mount.name = "hinge_mount";
  hinge_mount.rotation.x = Math.PI / 2;
  hinge_mount.position.set(0.800, -0.010, 0.120);
  hardware_assembly.add(hinge_mount);

  const hinge_mount_rimGeom = new THREE.TorusGeometry(0.060, 0.006, 10, 32);
  const hinge_mount_rim = new THREE.Mesh(hinge_mount_rimGeom, screw_detailsMat);
  hinge_mount_rim.name = "hinge_mount_rim";
  hinge_mount_rim.position.set(0.800, -0.010, 0.133);
  hardware_assembly.add(hinge_mount_rim);

  const hinge_leafGeom = new THREE.BoxGeometry(0.078, 0.105, 0.030);
  const hinge_leaf = new THREE.Mesh(hinge_leafGeom, outer_frameMat);
  hinge_leaf.name = "hinge_leaf";
  hinge_leaf.position.set(0.835, -0.005, 0.137);
  hardware_assembly.add(hinge_leaf);

  const hinge_pinGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.125, 16);
  const hinge_pin = new THREE.Mesh(hinge_pinGeom, screw_detailsMat);
  hinge_pin.name = "hinge_pin";
  hinge_pin.position.set(0.844, 0.000, 0.151);
  hardware_assembly.add(hinge_pin);

  const hinge_knuckleGeom = new THREE.CylinderGeometry(0.030, 0.030, 0.052, 20);
  const hinge_knuckle = new THREE.Mesh(hinge_knuckleGeom, inner_bezelMat);
  hinge_knuckle.name = "hinge_knuckle";
  hinge_knuckle.position.set(0.844, 0.041, 0.151);
  hardware_assembly.add(hinge_knuckle);

  const hinge_lower_knuckle = new THREE.Mesh(
    hinge_knuckleGeom,
    inner_bezelMat
  );
  hinge_lower_knuckle.name = "hinge_lower_knuckle";
  hinge_lower_knuckle.position.set(0.844, -0.041, 0.151);
  hardware_assembly.add(hinge_lower_knuckle);

  const latch_strapShape = new THREE.Shape();
  const strapWidth = 0.270;
  const strapHeight = 0.076;
  const strapRadius = strapHeight / 2;
  latch_strapShape.moveTo(-strapWidth / 2 + strapRadius, -strapHeight / 2);
  latch_strapShape.lineTo(strapWidth / 2 - strapRadius, -strapHeight / 2);
  latch_strapShape.quadraticCurveTo(
    strapWidth / 2,
    -strapHeight / 2,
    strapWidth / 2,
    0
  );
  latch_strapShape.quadraticCurveTo(
    strapWidth / 2,
    strapHeight / 2,
    strapWidth / 2 - strapRadius,
    strapHeight / 2
  );
  latch_strapShape.lineTo(-strapWidth / 2 + strapRadius, strapHeight / 2);
  latch_strapShape.quadraticCurveTo(
    -strapWidth / 2,
    strapHeight / 2,
    -strapWidth / 2,
    0
  );
  latch_strapShape.quadraticCurveTo(
    -strapWidth / 2,
    -strapHeight / 2,
    -strapWidth / 2 + strapRadius,
    -strapHeight / 2
  );

  const latch_strapGeom = new THREE.ExtrudeGeometry(latch_strapShape, {
    depth: 0.030,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 3,
    curveSegments: 12
  });
  const latch_strap = new THREE.Mesh(latch_strapGeom, inner_bezelMat);
  latch_strap.name = "latch_strap";
  latch_strap.position.set(0.708, 0.000, 0.145);
  hardware_assembly.add(latch_strap);

  const latch_pivotGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.018, 20);
  const latch_pivot = new THREE.Mesh(latch_pivotGeom, screw_detailsMat);
  latch_pivot.name = "latch_pivot";
  latch_pivot.rotation.x = Math.PI / 2;
  latch_pivot.position.set(0.817, 0.000, 0.184);
  hardware_assembly.add(latch_pivot);

  fitToUnitCube(root);
  return root;

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
}