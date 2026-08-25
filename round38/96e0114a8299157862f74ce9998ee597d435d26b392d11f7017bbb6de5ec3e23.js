export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedSilverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedSilverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb88932,
    metalness: 0.6,
    roughness: 0.28,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x76501f,
    metalness: 0.5,
    roughness: 0.4,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lensBackingMat = new THREE.MeshStandardMaterial({
    color: 0x26332f,
    metalness: 0.0,
    roughness: 0.45,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddebe5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const base_bottomGeom = new THREE.CylinderGeometry(0.52, 0.52, 0.11, 48);
  const base_bottom = new THREE.Mesh(base_bottomGeom, darkBrassMat);
  base_bottom.position.y = 0.055;
  root.add(base_bottom);

  const base_plinthGeom = new THREE.CylinderGeometry(0.48, 0.52, 0.15, 48);
  const base_plinth = new THREE.Mesh(base_plinthGeom, brassMat);
  base_plinth.position.y = 0.145;
  root.add(base_plinth);

  const base_top_stepGeom = new THREE.CylinderGeometry(0.40, 0.47, 0.075, 48);
  const base_top_step = new THREE.Mesh(base_top_stepGeom, brassMat);
  base_top_step.position.y = 0.2525;
  root.add(base_top_step);

  const pedestal_lower_ringGeom = new THREE.CylinderGeometry(0.25, 0.31, 0.08, 40);
  const pedestal_lower_ring = new THREE.Mesh(pedestal_lower_ringGeom, brassMat);
  pedestal_lower_ring.position.y = 0.32;
  root.add(pedestal_lower_ring);

  const pedestal_columnGeom = new THREE.CylinderGeometry(0.205, 0.22, 0.27, 40);
  const pedestal_column = new THREE.Mesh(pedestal_columnGeom, brassMat);
  pedestal_column.position.y = 0.49;
  root.add(pedestal_column);

  const pedestal_upper_ringGeom = new THREE.CylinderGeometry(0.23, 0.205, 0.07, 40);
  const pedestal_upper_ring = new THREE.Mesh(pedestal_upper_ringGeom, brassMat);
  pedestal_upper_ring.position.y = 0.65;
  root.add(pedestal_upper_ring);

  const swivel_lower_collarGeom = new THREE.CylinderGeometry(0.17, 0.19, 0.09, 36);
  const swivel_lower_collar = new THREE.Mesh(swivel_lower_collarGeom, brassMat);
  swivel_lower_collar.position.y = 0.725;
  root.add(swivel_lower_collar);

  const swivel_neckGeom = new THREE.CylinderGeometry(0.135, 0.145, 0.12, 32);
  const swivel_neck = new THREE.Mesh(swivel_neckGeom, brassMat);
  swivel_neck.position.y = 0.81;
  root.add(swivel_neck);

  const swivel_upper_collarGeom = new THREE.CylinderGeometry(0.18, 0.15, 0.075, 36);
  const swivel_upper_collar = new THREE.Mesh(swivel_upper_collarGeom, brassMat);
  swivel_upper_collar.position.y = 0.8975;
  root.add(swivel_upper_collar);

  const mount_shadow_gapGeom = new THREE.CylinderGeometry(0.185, 0.185, 0.025, 36);
  const mount_shadow_gap = new THREE.Mesh(mount_shadow_gapGeom, blackMat);
  mount_shadow_gap.position.y = 0.94;
  root.add(mount_shadow_gap);

  const mount_saddleGeom = new THREE.CylinderGeometry(0.19, 0.18, 0.065, 36);
  const mount_saddle = new THREE.Mesh(mount_saddleGeom, brassMat);
  mount_saddle.position.y = 0.9775;
  root.add(mount_saddle);

  const pedestal_lock_knobGeom = new THREE.CylinderGeometry(0.067, 0.067, 0.065, 24);
  const pedestal_lock_knob = new THREE.Mesh(pedestal_lock_knobGeom, blackMat);
  pedestal_lock_knob.rotation.x = Math.PI / 2;
  pedestal_lock_knob.position.set(0.18, 0.51, 0.225);
  root.add(pedestal_lock_knob);

  const pedestal_lock_capGeom = new THREE.CylinderGeometry(0.045, 0.05, 0.025, 24);
  const pedestal_lock_cap = new THREE.Mesh(pedestal_lock_capGeom, brushedSilverMat);
  pedestal_lock_cap.rotation.x = Math.PI / 2;
  pedestal_lock_cap.position.set(0.18, 0.51, 0.267);
  root.add(pedestal_lock_cap);

  const telescope = new THREE.Group();
  telescope.position.set(0, 1.16, 0);
  telescope.rotation.x = -0.34;
  root.add(telescope);

  const main_barrelGeom = new THREE.CylinderGeometry(0.31, 0.275, 1.25, 48);
  const main_barrel = new THREE.Mesh(main_barrelGeom, silverMat);
  main_barrel.rotation.x = Math.PI / 2;
  main_barrel.position.z = -0.05;
  telescope.add(main_barrel);

  const objective_flareGeom = new THREE.CylinderGeometry(0.405, 0.305, 0.18, 48);
  const objective_flare = new THREE.Mesh(objective_flareGeom, silverMat);
  objective_flare.rotation.x = Math.PI / 2;
  objective_flare.position.z = 0.645;
  telescope.add(objective_flare);

  const objective_rimGeom = new THREE.CylinderGeometry(0.415, 0.405, 0.11, 48);
  const objective_rim = new THREE.Mesh(objective_rimGeom, polishedSilverMat);
  objective_rim.rotation.x = Math.PI / 2;
  objective_rim.position.z = 0.775;
  telescope.add(objective_rim);

  const objective_face_ringGeom = new THREE.RingGeometry(0.315, 0.407, 48);
  const objective_face_ring = new THREE.Mesh(objective_face_ringGeom, polishedSilverMat);
  objective_face_ring.position.z = 0.836;
  telescope.add(objective_face_ring);

  const objective_outer_beadGeom = new THREE.TorusGeometry(0.392, 0.018, 10, 48);
  const objective_outer_bead = new THREE.Mesh(objective_outer_beadGeom, silverMat);
  objective_outer_bead.position.z = 0.84;
  telescope.add(objective_outer_bead);

  const objective_apertureGeom = new THREE.CircleGeometry(0.316, 48);
  const objective_aperture = new THREE.Mesh(objective_apertureGeom, blackMat);
  objective_aperture.position.z = 0.841;
  telescope.add(objective_aperture);

  const inner_lens_bezelGeom = new THREE.CircleGeometry(0.258, 48);
  const inner_lens_bezel = new THREE.Mesh(inner_lens_bezelGeom, lensBackingMat);
  inner_lens_bezel.position.z = 0.844;
  telescope.add(inner_lens_bezel);

  const inner_bezel_ringGeom = new THREE.RingGeometry(0.222, 0.255, 48);
  const inner_bezel_ring = new THREE.Mesh(inner_bezel_ringGeom, blackMat);
  inner_bezel_ring.position.z = 0.847;
  telescope.add(inner_bezel_ring);

  const objective_lensGeom = new THREE.SphereGeometry(1, 40, 20);
  const objective_lens = new THREE.Mesh(objective_lensGeom, glassMat);
  objective_lens.scale.set(0.218, 0.218, 0.055);
  objective_lens.position.z = 0.858;
  telescope.add(objective_lens);

  const lens_highlightGeom = new THREE.CircleGeometry(0.06, 20);
  const lens_highlight = new THREE.Mesh(lens_highlightGeom, highlightMat);
  lens_highlight.scale.set(1.45, 0.42, 1);
  lens_highlight.rotation.z = -0.45;
  lens_highlight.position.set(-0.07, 0.075, 0.914);
  telescope.add(lens_highlight);

  const barrel_front_seamGeom = new THREE.TorusGeometry(0.304, 0.006, 6, 48);
  const barrel_front_seam = new THREE.Mesh(barrel_front_seamGeom, brushedSilverMat);
  barrel_front_seam.position.z = 0.49;
  telescope.add(barrel_front_seam);

  const barrel_rear_seamGeom = new THREE.TorusGeometry(0.278, 0.006, 6, 48);
  const barrel_rear_seam = new THREE.Mesh(barrel_rear_seamGeom, brushedSilverMat);
  barrel_rear_seam.position.z = -0.66;
  telescope.add(barrel_rear_seam);

  const mounting_bandGeom = new THREE.CylinderGeometry(0.292, 0.292, 0.12, 44);
  const mounting_band = new THREE.Mesh(mounting_bandGeom, brassMat);
  mounting_band.rotation.x = Math.PI / 2;
  mounting_band.position.z = -0.43;
  telescope.add(mounting_band);

  const mounting_band_front_edgeGeom = new THREE.TorusGeometry(0.286, 0.012, 8, 44);
  const mounting_band_front_edge = new THREE.Mesh(mounting_band_front_edgeGeom, darkBrassMat);
  mounting_band_front_edge.position.z = -0.365;
  telescope.add(mounting_band_front_edge);

  const mounting_band_rear_edgeGeom = new THREE.TorusGeometry(0.286, 0.012, 8, 44);
  const mounting_band_rear_edge = new THREE.Mesh(mounting_band_rear_edgeGeom, darkBrassMat);
  mounting_band_rear_edge.position.z = -0.495;
  telescope.add(mounting_band_rear_edge);

  const rear_transition_ringGeom = new THREE.CylinderGeometry(0.275, 0.245, 0.12, 44);
  const rear_transition_ring = new THREE.Mesh(rear_transition_ringGeom, brassMat);
  rear_transition_ring.rotation.x = Math.PI / 2;
  rear_transition_ring.position.z = -0.72;
  telescope.add(rear_transition_ring);

  const rear_capGeom = new THREE.CylinderGeometry(0.245, 0.225, 0.18, 44);
  const rear_cap = new THREE.Mesh(rear_capGeom, brassMat);
  rear_cap.rotation.x = Math.PI / 2;
  rear_cap.position.z = -0.86;
  telescope.add(rear_cap);

  const eyepiece_end_ringGeom = new THREE.CylinderGeometry(0.215, 0.195, 0.09, 40);
  const eyepiece_end_ring = new THREE.Mesh(eyepiece_end_ringGeom, brushedSilverMat);
  eyepiece_end_ring.rotation.x = Math.PI / 2;
  eyepiece_end_ring.position.z = -0.995;
  telescope.add(eyepiece_end_ring);

  const eyepiece_end_beadGeom = new THREE.TorusGeometry(0.184, 0.018, 8, 40);
  const eyepiece_end_bead = new THREE.Mesh(eyepiece_end_beadGeom, polishedSilverMat);
  eyepiece_end_bead.position.z = -1.042;
  telescope.add(eyepiece_end_bead);

  const focus_knobGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.15, 28);
  const focus_knob = new THREE.Mesh(focus_knobGeom, blackMat);
  focus_knob.rotation.z = Math.PI / 2;
  focus_knob.position.set(0.325, 0.035, -0.57);
  telescope.add(focus_knob);

  const focus_knob_capGeom = new THREE.CylinderGeometry(0.078, 0.085, 0.025, 24);
  const focus_knob_cap = new THREE.Mesh(focus_knob_capGeom, blackMat);
  focus_knob_cap.rotation.z = Math.PI / 2;
  focus_knob_cap.position.set(0.407, 0.035, -0.57);
  telescope.add(focus_knob_cap);

  const focus_knob_ridgeGeom = new THREE.TorusGeometry(0.099, 0.006, 6, 24);
  const focus_knob_ridges = new THREE.InstancedMesh(
    focus_knob_ridgeGeom,
    blackMat,
    7
  );
  const ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 7; i++) {
    ridge_dummy.position.set(0.27 + i * 0.019, 0.035, -0.57);
    ridge_dummy.rotation.set(0, Math.PI / 2, 0);
    ridge_dummy.updateMatrix();
    focus_knob_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  focus_knob_ridges.instanceMatrix.needsUpdate = true;
  telescope.add(focus_knob_ridges);

  const tilt_tabShape = new THREE.Shape();
  tilt_tabShape.moveTo(-0.12, 0);
  tilt_tabShape.lineTo(0.12, 0);
  tilt_tabShape.lineTo(0.095, 0.105);
  tilt_tabShape.lineTo(-0.075, 0.125);
  tilt_tabShape.closePath();

  const tilt_tabGeom = new THREE.ExtrudeGeometry(tilt_tabShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  const tilt_tab = new THREE.Mesh(tilt_tabGeom, silverMat);
  tilt_tab.rotation.y = Math.PI / 2;
  tilt_tab.position.set(-0.065, 0.255, 0.18);
  telescope.add(tilt_tab);

  const tilt_pivotGeom = new THREE.CylinderGeometry(0.088, 0.088, 0.045, 32);
  const tilt_pivot = new THREE.Mesh(tilt_pivotGeom, silverMat);
  tilt_pivot.rotation.z = Math.PI / 2;
  tilt_pivot.position.set(0.09, 0.365, 0.18);
  telescope.add(tilt_pivot);

  const tilt_pivot_capGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.025, 32);
  const tilt_pivot_cap = new THREE.Mesh(tilt_pivot_capGeom, polishedSilverMat);
  tilt_pivot_cap.rotation.z = Math.PI / 2;
  tilt_pivot_cap.position.set(0.122, 0.365, 0.18);
  telescope.add(tilt_pivot_cap);

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