export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rigging_sculpture";

  const stand_group = new THREE.Group();
  stand_group.name = "stand_group";
  root.add(stand_group);

  const mast_group = new THREE.Group();
  mast_group.name = "mast_group";
  root.add(mast_group);

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const rigging_group = new THREE.Group();
  rigging_group.name = "rigging_group";
  root.add(rigging_group);

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08a45,
    metalness: 0.6,
    roughness: 0.2
  });

  const brassSatinMat = new THREE.MeshStandardMaterial({
    color: 0xa88950,
    metalness: 0.6,
    roughness: 0.5
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x6f3518,
    metalness: 0.0,
    roughness: 0.6
  });

  const ropeMat = new THREE.MeshStandardMaterial({
    color: 0xd8d0b5,
    metalness: 0.0,
    roughness: 0.95
  });

  const wireMat = new THREE.MeshStandardMaterial({
    color: 0xa99d7e,
    metalness: 0.2,
    roughness: 0.65
  });

  function makeTube(points, radius, material, tubularSegments, radialSegments) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        tubularSegments || 24,
        radius,
        radialSegments || 6,
        false
      ),
      material
    );
  }

  const base_footGeom = new THREE.CylinderGeometry(0.27, 0.285, 0.036, 48);
  const base_foot = new THREE.Mesh(base_footGeom, brassSatinMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.018;
  stand_group.add(base_foot);

  const base_bevelGeom = new THREE.CylinderGeometry(0.235, 0.27, 0.035, 48);
  const base_bevel = new THREE.Mesh(base_bevelGeom, brassMat);
  base_bevel.name = "base_bevel";
  base_bevel.position.y = 0.047;
  stand_group.add(base_bevel);

  const base_top_discGeom = new THREE.CylinderGeometry(0.225, 0.235, 0.012, 48);
  const base_top_disc = new THREE.Mesh(base_top_discGeom, brassSatinMat);
  base_top_disc.name = "base_top_disc";
  base_top_disc.position.y = 0.068;
  stand_group.add(base_top_disc);

  const base_rimGeom = new THREE.TorusGeometry(0.272, 0.006, 8, 48);
  const base_rim = new THREE.Mesh(base_rimGeom, brassMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.025;
  stand_group.add(base_rim);

  const pedestal_flareGeom = new THREE.CylinderGeometry(0.052, 0.095, 0.11, 32);
  const pedestal_flare = new THREE.Mesh(pedestal_flareGeom, brassMat);
  pedestal_flare.name = "pedestal_flare";
  pedestal_flare.position.y = 0.12;
  stand_group.add(pedestal_flare);

  const pedestal_stemGeom = new THREE.CylinderGeometry(0.034, 0.046, 0.13, 24);
  const pedestal_stem = new THREE.Mesh(pedestal_stemGeom, brassSatinMat);
  pedestal_stem.name = "pedestal_stem";
  pedestal_stem.position.y = 0.215;
  stand_group.add(pedestal_stem);

  const pedestal_neck_ringGeom = new THREE.TorusGeometry(0.045, 0.006, 8, 32);
  const pedestal_neck_ring = new THREE.Mesh(pedestal_neck_ringGeom, brassMat);
  pedestal_neck_ring.name = "pedestal_neck_ring";
  pedestal_neck_ring.rotation.x = Math.PI / 2;
  pedestal_neck_ring.position.y = 0.272;
  stand_group.add(pedestal_neck_ring);

  const mast_stepGeom = new THREE.CylinderGeometry(0.062, 0.083, 0.19, 32);
  const mast_step = new THREE.Mesh(mast_stepGeom, brassMat);
  mast_step.name = "mast_step";
  mast_step.position.y = 0.34;
  stand_group.add(mast_step);

  const mast_step_rimGeom = new THREE.TorusGeometry(0.061, 0.006, 8, 32);
  const mast_step_rim = new THREE.Mesh(mast_step_rimGeom, brassSatinMat);
  mast_step_rim.name = "mast_step_rim";
  mast_step_rim.rotation.x = Math.PI / 2;
  mast_step_rim.position.y = 0.428;
  stand_group.add(mast_step_rim);

  const central_mastGeom = new THREE.CylinderGeometry(0.027, 0.038, 2.04, 24);
  const central_mast = new THREE.Mesh(central_mastGeom, woodMat);
  central_mast.name = "central_mast";
  central_mast.position.y = 1.38;
  mast_group.add(central_mast);

  const mast_base_bandGeom = new THREE.CylinderGeometry(0.042, 0.044, 0.035, 24);
  const mast_base_band = new THREE.Mesh(mast_base_bandGeom, brassSatinMat);
  mast_base_band.name = "mast_base_band";
  mast_base_band.position.y = 0.435;
  mast_group.add(mast_base_band);

  const mast_top_bandGeom = new THREE.CylinderGeometry(0.034, 0.036, 0.032, 24);
  const mast_top_band = new THREE.Mesh(mast_top_bandGeom, brassMat);
  mast_top_band.name = "mast_top_band";
  mast_top_band.position.y = 2.385;
  mast_group.add(mast_top_band);

  const upper_collarGeom = new THREE.CylinderGeometry(0.035, 0.041, 0.045, 24);
  const upper_collar = new THREE.Mesh(upper_collarGeom, brassMat);
  upper_collar.name = "upper_collar";
  upper_collar.position.y = 2.415;
  mast_group.add(upper_collar);

  const top_pinGeom = new THREE.CylinderGeometry(0.026, 0.029, 0.235, 24);
  const top_pin = new THREE.Mesh(top_pinGeom, brassMat);
  top_pin.name = "top_pin";
  top_pin.position.y = 2.555;
  mast_group.add(top_pin);

  const top_pin_capGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.014, 24);
  const top_pin_cap = new THREE.Mesh(top_pin_capGeom, brassSatinMat);
  top_pin_cap.name = "top_pin_cap";
  top_pin_cap.position.y = 2.681;
  mast_group.add(top_pin_cap);

  const curved_armPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.015, 0.365, 0.018),
    new THREE.Vector3(-0.20, 0.335, 0.018),
    new THREE.Vector3(-0.43, 0.395, 0.018),
    new THREE.Vector3(-0.65, 0.565, 0.018),
    new THREE.Vector3(-0.81, 0.795, 0.018),
    new THREE.Vector3(-0.895, 1.025, 0.018),
    new THREE.Vector3(-0.915, 1.145, 0.018)
  ], false, "centripetal");
  const curved_armGeom = new THREE.TubeGeometry(curved_armPath, 64, 0.026, 12, false);
  const curved_arm = new THREE.Mesh(curved_armGeom, brassSatinMat);
  curved_arm.name = "curved_arm";
  frame_group.add(curved_arm);

  const arm_jointGeom = new THREE.SphereGeometry(0.043, 20, 12);
  const arm_joint = new THREE.Mesh(arm_jointGeom, brassMat);
  arm_joint.name = "arm_joint";
  arm_joint.position.set(-0.015, 0.365, 0.018);
  arm_joint.scale.set(0.85, 1.25, 0.85);
  frame_group.add(arm_joint);

  const arm_tip_ferruleGeom = new THREE.CylinderGeometry(0.029, 0.031, 0.04, 20);
  const arm_tip_ferrule = new THREE.Mesh(arm_tip_ferruleGeom, brassMat);
  arm_tip_ferrule.name = "arm_tip_ferrule";
  arm_tip_ferrule.position.set(-0.918, 1.158, 0.018);
  arm_tip_ferrule.rotation.z = -0.14;
  frame_group.add(arm_tip_ferrule);

  const arm_upper_bandGeom = new THREE.TorusGeometry(0.029, 0.0045, 7, 24);
  const arm_upper_band = new THREE.Mesh(arm_upper_bandGeom, brassMat);
  arm_upper_band.name = "arm_upper_band";
  arm_upper_band.position.set(-0.902, 1.01, 0.018);
  arm_upper_band.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0.18, 0.984, 0).normalize()
  );
  frame_group.add(arm_upper_band);

  const arm_inner_bandGeom = new THREE.TorusGeometry(0.029, 0.004, 7, 24);
  const arm_inner_band = new THREE.Mesh(arm_inner_bandGeom, brassSatinMat);
  arm_inner_band.name = "arm_inner_band";
  arm_inner_band.position.set(-0.886, 0.965, 0.018);
  arm_inner_band.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0.16, 0.987, 0).normalize()
  );
  frame_group.add(arm_inner_band);

  const arm_attachmentGeom = new THREE.SphereGeometry(0.034, 16, 10);
  const arm_attachment = new THREE.Mesh(arm_attachmentGeom, brassMat);
  arm_attachment.name = "arm_attachment";
  arm_attachment.position.set(-0.82, 0.80, 0.018);
  frame_group.add(arm_attachment);

  const boom_left = new THREE.Vector3(-0.82, 0.80, 0.032);
  const boom_right = new THREE.Vector3(0.35, 0.875, 0.032);
  const boomDirection = boom_right.clone().sub(boom_left);
  const boomLength = boomDirection.length();
  const boomUnit = boomDirection.clone().normalize();

  const horizontal_boomGeom = new THREE.CylinderGeometry(0.023, 0.029, boomLength, 20);
  const horizontal_boom = new THREE.Mesh(horizontal_boomGeom, woodMat);
  horizontal_boom.name = "horizontal_boom";
  horizontal_boom.position.copy(boom_left).add(boom_right).multiplyScalar(0.5);
  horizontal_boom.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    boomUnit
  );
  frame_group.add(horizontal_boom);

  const boom_left_ferruleGeom = new THREE.SphereGeometry(0.033, 18, 10);
  const boom_left_ferrule = new THREE.Mesh(boom_left_ferruleGeom, brassMat);
  boom_left_ferrule.name = "boom_left_ferrule";
  boom_left_ferrule.position.copy(boom_left);
  frame_group.add(boom_left_ferrule);

  const boom_right_capGeom = new THREE.SphereGeometry(0.027, 18, 10);
  const boom_right_cap = new THREE.Mesh(boom_right_capGeom, woodMat);
  boom_right_cap.name = "boom_right_cap";
  boom_right_cap.position.copy(boom_right);
  frame_group.add(boom_right_cap);

  const boom_center_wrapsGeom = new THREE.TorusGeometry(0.031, 0.0032, 6, 20);
  const boom_center_wraps = new THREE.InstancedMesh(
    boom_center_wrapsGeom,
    ropeMat,
    5
  );
  boom_center_wraps.name = "boom_center_wraps";
  const boomQuat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    boomUnit
  );
  const wrapCenter = boom_left.clone().lerp(boom_right, 0.56);
  const wrapTemp = new THREE.Object3D();
  for (let i = 0; i < 5; i++) {
    wrapTemp.position.copy(wrapCenter).addScaledVector(boomUnit, (i - 2) * 0.008);
    wrapTemp.quaternion.copy(boomQuat);
    wrapTemp.scale.set(1, 1, 1);
    wrapTemp.updateMatrix();
    boom_center_wraps.setMatrixAt(i, wrapTemp.matrix);
  }
  boom_center_wraps.instanceMatrix.needsUpdate = true;
  frame_group.add(boom_center_wraps);

  const boom_mast_wrapsGeom = new THREE.TorusGeometry(0.041, 0.0032, 6, 20);
  const boom_mast_wraps = new THREE.InstancedMesh(
    boom_mast_wrapsGeom,
    ropeMat,
    4
  );
  boom_mast_wraps.name = "boom_mast_wraps";
  const mastWrapQuat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 1, 0)
  );
  const mastWrapTemp = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    mastWrapTemp.position.set(0, 0.846 + i * 0.009, 0);
    mastWrapTemp.quaternion.copy(mastWrapQuat);
    mastWrapTemp.scale.set(1, 1, 1);
    mastWrapTemp.updateMatrix();
    boom_mast_wraps.setMatrixAt(i, mastWrapTemp.matrix);
  }
  boom_mast_wraps.instanceMatrix.needsUpdate = true;
  frame_group.add(boom_mast_wraps);

  const upper_mast_sleeveGeom = new THREE.CylinderGeometry(0.033, 0.034, 0.06, 20);
  const upper_mast_sleeve = new THREE.Mesh(upper_mast_sleeveGeom, brassMat);
  upper_mast_sleeve.name = "upper_mast_sleeve";
  upper_mast_sleeve.position.y = 2.36;
  mast_group.add(upper_mast_sleeve);

  const left_upper_rigging = makeTube([
    new THREE.Vector3(-0.032, 2.405, 0.045),
    new THREE.Vector3(-0.10, 1.84, 0.046),
    new THREE.Vector3(-0.19, 1.22, 0.046),
    new THREE.Vector3(-0.30, 0.86, 0.045)
  ], 0.0032, wireMat, 40, 6);
  left_upper_rigging.name = "left_upper_rigging";
  rigging_group.add(left_upper_rigging);

  const right_upper_rigging = makeTube([
    new THREE.Vector3(0.034, 2.405, 0.047),
    new THREE.Vector3(0.11, 1.82, 0.048),
    new THREE.Vector3(0.21, 1.18, 0.048),
    new THREE.Vector3(0.335, 0.875, 0.047)
  ], 0.0032, wireMat, 40, 6);
  right_upper_rigging.name = "right_upper_rigging";
  rigging_group.add(right_upper_rigging);

  const arm_to_mast_shroud = makeTube([
    new THREE.Vector3(-0.82, 0.80, 0.049),
    new THREE.Vector3(-0.52, 1.00, 0.05),
    new THREE.Vector3(-0.18, 1.22, 0.05),
    new THREE.Vector3(0.025, 1.43, 0.05)
  ], 0.003, ropeMat, 36, 6);
  arm_to_mast_shroud.name = "arm_to_mast_shroud";
  rigging_group.add(arm_to_mast_shroud);

  const lower_left_sheet = makeTube([
    new THREE.Vector3(-0.025, 0.405, 0.051),
    new THREE.Vector3(-0.13, 0.61, 0.052),
    new THREE.Vector3(-0.27, 0.83, 0.052),
    new THREE.Vector3(-0.39, 0.855, 0.052)
  ], 0.0028, ropeMat, 30, 6);
  lower_left_sheet.name = "lower_left_sheet";
  rigging_group.add(lower_left_sheet);

  const lower_right_sheet = makeTube([
    new THREE.Vector3(0.028, 0.405, 0.054),
    new THREE.Vector3(0.095, 0.59, 0.055),
    new THREE.Vector3(0.205, 0.76, 0.055),
    new THREE.Vector3(0.335, 0.86, 0.054)
  ], 0.0028, ropeMat, 28, 6);
  lower_right_sheet.name = "lower_right_sheet";
  rigging_group.add(lower_right_sheet);

  const boom_lift_line = makeTube([
    new THREE.Vector3(0.018, 1.43, 0.057),
    new THREE.Vector3(0.10, 1.23, 0.058),
    new THREE.Vector3(0.20, 1.02, 0.058),
    new THREE.Vector3(0.32, 0.875, 0.057)
  ], 0.0025, ropeMat, 28, 6);
  boom_lift_line.name = "boom_lift_line";
  rigging_group.add(boom_lift_line);

  const mast_lashing_knotGeom = new THREE.SphereGeometry(0.009, 12, 8);
  const mast_lashing_knot = new THREE.Mesh(mast_lashing_knotGeom, ropeMat);
  mast_lashing_knot.name = "mast_lashing_knot";
  mast_lashing_knot.position.set(0.025, 1.43, 0.052);
  rigging_group.add(mast_lashing_knot);

  const boom_lashing_knotGeom = new THREE.SphereGeometry(0.008, 12, 8);
  const boom_lashing_knot = new THREE.Mesh(boom_lashing_knotGeom, ropeMat);
  boom_lashing_knot.name = "boom_lashing_knot";
  boom_lashing_knot.position.set(0.325, 0.87, 0.055);
  rigging_group.add(boom_lashing_knot);

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