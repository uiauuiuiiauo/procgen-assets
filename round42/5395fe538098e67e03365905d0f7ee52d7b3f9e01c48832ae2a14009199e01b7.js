export default function generate(THREE) {
  const root = new THREE.Group();

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x454543,
    metalness: 0.6,
    roughness: 0.5,
  });
  const baseTopMat = new THREE.MeshStandardMaterial({
    color: 0x50504d,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x161616,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.5,
    roughness: 0.25,
  });
  const amberGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffc36a,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0xfff5cf,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xfff5cf,
    emissiveIntensity: 1.0,
  });
  const glowCoreMat = new THREE.MeshBasicMaterial({
    color: 0xffffee,
  });
  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xffb52d,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xffb52d,
    emissiveIntensity: 1.0,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xfff8e8,
    transparent: true,
    opacity: 0.7,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const base_bottom_ringGeom = new THREE.CylinderGeometry(0.282, 0.282, 0.024, 48);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, rubberMat);
  base_bottom_ring.position.y = 0.012;
  root.add(base_bottom_ring);

  const base_bodyGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.88, 48);
  const base_body = new THREE.Mesh(base_bodyGeom, baseMat);
  base_body.position.y = 0.46;
  root.add(base_body);

  const base_top_capGeom = new THREE.CylinderGeometry(0.292, 0.292, 0.018, 48);
  const base_top_cap = new THREE.Mesh(base_top_capGeom, baseTopMat);
  base_top_cap.position.y = 0.909;
  root.add(base_top_cap);

  const base_top_trimGeom = new THREE.TorusGeometry(0.278, 0.007, 8, 48);
  const base_top_trim = new THREE.Mesh(base_top_trimGeom, polishedMetalMat);
  base_top_trim.rotation.x = Math.PI / 2;
  base_top_trim.position.y = 0.919;
  root.add(base_top_trim);

  const stem_footGeom = new THREE.CylinderGeometry(0.048, 0.048, 0.07, 24);
  const stem_foot = new THREE.Mesh(stem_footGeom, brushedMetalMat);
  stem_foot.position.set(0, 0.955, -0.035);
  root.add(stem_foot);

  const stem_foot_trimGeom = new THREE.TorusGeometry(0.041, 0.006, 8, 24);
  const stem_foot_trim = new THREE.Mesh(stem_foot_trimGeom, polishedMetalMat);
  stem_foot_trim.rotation.x = Math.PI / 2;
  stem_foot_trim.position.set(0, 0.987, -0.035);
  root.add(stem_foot_trim);

  const stemGeom = new THREE.CylinderGeometry(0.022, 0.022, 1.18, 24);
  const stem = new THREE.Mesh(stemGeom, polishedMetalMat);
  stem.position.set(0, 1.57, -0.035);
  root.add(stem);

  const stem_upper_collarGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.055, 24);
  const stem_upper_collar = new THREE.Mesh(stem_upper_collarGeom, brushedMetalMat);
  stem_upper_collar.position.set(0, 2.145, -0.035);
  root.add(stem_upper_collar);

  const pivot_columnGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.23, 24);
  const pivot_column = new THREE.Mesh(pivot_columnGeom, brushedMetalMat);
  pivot_column.position.set(0, 2.255, -0.035);
  root.add(pivot_column);

  const pivot_column_capGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.035, 24);
  const pivot_column_cap = new THREE.Mesh(pivot_column_capGeom, polishedMetalMat);
  pivot_column_cap.position.set(0, 2.36, -0.035);
  root.add(pivot_column_cap);

  const pivot_axleGeom = new THREE.CylinderGeometry(0.058, 0.058, 0.21, 24);
  const pivot_axle = new THREE.Mesh(pivot_axleGeom, brushedMetalMat);
  pivot_axle.rotation.x = Math.PI / 2;
  pivot_axle.position.set(0, 2.39, 0.035);
  root.add(pivot_axle);

  const pivot_front_discGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.025, 24);
  const pivot_front_disc = new THREE.Mesh(pivot_front_discGeom, polishedMetalMat);
  pivot_front_disc.rotation.x = Math.PI / 2;
  pivot_front_disc.position.set(0, 2.39, 0.145);
  root.add(pivot_front_disc);

  const lamp_head = new THREE.Group();
  lamp_head.position.set(0, 2.39, 0.055);
  lamp_head.rotation.x = -0.3;
  root.add(lamp_head);

  const rear_housingGeom = new THREE.SphereGeometry(1, 32, 16);
  const rear_housing = new THREE.Mesh(rear_housingGeom, brushedMetalMat);
  rear_housing.scale.set(0.145, 0.13, 0.15);
  rear_housing.position.z = -0.34;
  lamp_head.add(rear_housing);

  const head_barrelGeom = new THREE.CylinderGeometry(0.135, 0.135, 0.38, 32);
  const head_barrel = new THREE.Mesh(head_barrelGeom, brushedMetalMat);
  head_barrel.rotation.x = Math.PI / 2;
  head_barrel.position.z = -0.12;
  lamp_head.add(head_barrel);

  const head_rear_seamGeom = new THREE.TorusGeometry(0.132, 0.004, 8, 32);
  const head_rear_seam = new THREE.Mesh(head_rear_seamGeom, rubberMat);
  head_rear_seam.position.z = -0.295;
  lamp_head.add(head_rear_seam);

  const head_front_seamGeom = new THREE.TorusGeometry(0.134, 0.004, 8, 32);
  const head_front_seam = new THREE.Mesh(head_front_seamGeom, rubberMat);
  head_front_seam.position.z = 0.065;
  lamp_head.add(head_front_seam);

  const socket_collarGeom = new THREE.CylinderGeometry(0.153, 0.145, 0.11, 32);
  const socket_collar = new THREE.Mesh(socket_collarGeom, polishedMetalMat);
  socket_collar.rotation.x = Math.PI / 2;
  socket_collar.position.z = 0.115;
  lamp_head.add(socket_collar);

  const socket_insertGeom = new THREE.CylinderGeometry(0.112, 0.112, 0.025, 32);
  const socket_insert = new THREE.Mesh(socket_insertGeom, brassMat);
  socket_insert.rotation.x = Math.PI / 2;
  socket_insert.position.z = 0.178;
  lamp_head.add(socket_insert);

  const bulbProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.065, 0.0),
    new THREE.Vector2(0.078, 0.035),
    new THREE.Vector2(0.095, 0.075),
    new THREE.Vector2(0.145, 0.12),
    new THREE.Vector2(0.188, 0.19),
    new THREE.Vector2(0.205, 0.27),
    new THREE.Vector2(0.198, 0.34),
    new THREE.Vector2(0.17, 0.405),
    new THREE.Vector2(0.11, 0.465),
    new THREE.Vector2(0.045, 0.495),
    new THREE.Vector2(0.0, 0.505),
  ];
  const bulb_glassGeom = new THREE.LatheGeometry(bulbProfile, 48);
  const bulb_glass = new THREE.Mesh(bulb_glassGeom, amberGlassMat);
  bulb_glass.rotation.x = Math.PI / 2;
  bulb_glass.position.z = 0.16;
  lamp_head.add(bulb_glass);

  const bulb_glow_discGeom = new THREE.CircleGeometry(0.135, 32);
  const bulb_glow_disc = new THREE.Mesh(bulb_glow_discGeom, glowMat);
  bulb_glow_disc.position.z = 0.43;
  lamp_head.add(bulb_glow_disc);

  const bulb_glow_coreGeom = new THREE.SphereGeometry(0.075, 24, 12);
  const bulb_glow_core = new THREE.Mesh(bulb_glow_coreGeom, glowCoreMat);
  bulb_glow_core.scale.set(1.25, 1.25, 0.45);
  bulb_glow_core.position.z = 0.438;
  lamp_head.add(bulb_glow_core);

  const filament_support_leftGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.035, -0.035, 0.215),
      new THREE.Vector3(-0.055, 0.055, 0.405)
    ),
    1,
    0.003,
    6,
    false
  );
  const filament_support_left = new THREE.Mesh(filament_support_leftGeom, brassMat);
  lamp_head.add(filament_support_left);

  const filament_support_rightGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.035, -0.035, 0.215),
      new THREE.Vector3(0.055, 0.055, 0.405)
    ),
    1,
    0.003,
    6,
    false
  );
  const filament_support_right = new THREE.Mesh(filament_support_rightGeom, brassMat);
  lamp_head.add(filament_support_right);

  const filamentPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.055, 0.055, 0.405),
    new THREE.Vector3(-0.075, 0.095, 0.414),
    new THREE.Vector3(-0.038, 0.125, 0.421),
    new THREE.Vector3(0, 0.095, 0.426),
    new THREE.Vector3(0.038, 0.125, 0.421),
    new THREE.Vector3(0.075, 0.095, 0.414),
    new THREE.Vector3(0.055, 0.055, 0.405),
  ]);
  const filamentGeom = new THREE.TubeGeometry(filamentPath, 24, 0.0045, 6, false);
  const filament = new THREE.Mesh(filamentGeom, filamentMat);
  lamp_head.add(filament);

  const bulb_highlightGeom = new THREE.CircleGeometry(0.035, 20);
  const bulb_highlight = new THREE.Mesh(bulb_highlightGeom, highlightMat);
  bulb_highlight.scale.set(0.55, 1.35, 1);
  bulb_highlight.position.set(-0.075, 0.085, 0.505);
  lamp_head.add(bulb_highlight);

  const adjustmentRodStart = new THREE.Vector3(-0.07, -0.075, -0.285);
  const adjustmentRodEnd = new THREE.Vector3(-0.245, -0.285, -0.465);
  const adjustment_rodGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(adjustmentRodStart, adjustmentRodEnd),
    1,
    0.017,
    10,
    false
  );
  const adjustment_rod = new THREE.Mesh(adjustment_rodGeom, brushedMetalMat);
  lamp_head.add(adjustment_rod);

  const adjustment_knobGeom = new THREE.SphereGeometry(0.032, 20, 12);
  const adjustment_knob = new THREE.Mesh(adjustment_knobGeom, rubberMat);
  adjustment_knob.position.copy(adjustmentRodEnd);
  lamp_head.add(adjustment_knob);

  const powerCablePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.045, 2.37, -0.12),
    new THREE.Vector3(-0.075, 2.22, -0.13),
    new THREE.Vector3(-0.09, 2.04, -0.13),
    new THREE.Vector3(-0.09, 1.86, -0.12),
    new THREE.Vector3(-0.075, 1.68, -0.1),
    new THREE.Vector3(-0.055, 1.5, -0.075),
  ]);
  const power_cableGeom = new THREE.TubeGeometry(powerCablePath, 40, 0.011, 8, false);
  const power_cable = new THREE.Mesh(power_cableGeom, rubberMat);
  root.add(power_cable);

  const baseCablePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.265, 0.27, -0.08),
    new THREE.Vector3(0.34, 0.23, -0.075),
    new THREE.Vector3(0.46, 0.16, -0.055),
    new THREE.Vector3(0.68, 0.105, -0.025),
    new THREE.Vector3(0.95, 0.075, 0.005),
    new THREE.Vector3(1.25, 0.065, 0.035),
  ]);
  const base_power_cableGeom = new THREE.TubeGeometry(baseCablePath, 48, 0.012, 8, false);
  const base_power_cable = new THREE.Mesh(base_power_cableGeom, rubberMat);
  root.add(base_power_cable);

  function fitToUnitCube(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}