export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cylindrical_laser_device";

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const top_capMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const bottom_baseMat = new THREE.MeshStandardMaterial({
    color: 0x17191b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8,
  });
  const fastenerMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x090b0d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const laser_emitterMat = new THREE.MeshStandardMaterial({
    color: 0x8ff7ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x8ff7ff,
    emissiveIntensity: 1.0,
  });
  const laser_beamMat = new THREE.MeshBasicMaterial({
    color: 0x72efff,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
  });
  const laser_glowMat = new THREE.MeshBasicMaterial({
    color: 0x9bf8ff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });

  const main_bodyGeom = new THREE.CylinderGeometry(0.36, 0.36, 2.17, 64);
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.name = "main_body";
  main_body.position.y = 1.415;
  root.add(main_body);

  const bottom_baseProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.32, 0.00),
    new THREE.Vector2(0.355, 0.018),
    new THREE.Vector2(0.372, 0.055),
    new THREE.Vector2(0.372, 0.245),
    new THREE.Vector2(0.360, 0.285),
    new THREE.Vector2(0.00, 0.285),
  ];
  const bottom_baseGeom = new THREE.LatheGeometry(bottom_baseProfile, 64);
  const bottom_base = new THREE.Mesh(bottom_baseGeom, bottom_baseMat);
  bottom_base.name = "bottom_base";
  root.add(bottom_base);

  const bottom_seamGeom = new THREE.TorusGeometry(0.357, 0.006, 8, 64);
  const bottom_seam = new THREE.Mesh(bottom_seamGeom, seamMat);
  bottom_seam.name = "bottom_seam";
  bottom_seam.rotation.x = Math.PI / 2;
  bottom_seam.position.y = 0.292;
  root.add(bottom_seam);

  const top_capProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.345, 0.00),
    new THREE.Vector2(0.372, 0.012),
    new THREE.Vector2(0.380, 0.032),
    new THREE.Vector2(0.380, 0.095),
    new THREE.Vector2(0.368, 0.122),
    new THREE.Vector2(0.330, 0.140),
    new THREE.Vector2(0.00, 0.140),
  ];
  const top_capGeom = new THREE.LatheGeometry(top_capProfile, 64);
  const top_cap = new THREE.Mesh(top_capGeom, top_capMat);
  top_cap.name = "top_cap";
  top_cap.position.y = 2.47;
  root.add(top_cap);

  const top_seamGeom = new THREE.TorusGeometry(0.362, 0.006, 8, 64);
  const top_seam = new THREE.Mesh(top_seamGeom, seamMat);
  top_seam.name = "top_seam";
  top_seam.rotation.x = Math.PI / 2;
  top_seam.position.y = 2.474;
  root.add(top_seam);

  const top_holeGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.009, 32);
  const top_hole = new THREE.Mesh(top_holeGeom, recessMat);
  top_hole.name = "top_hole";
  top_hole.position.set(0, 2.614, 0.015);
  root.add(top_hole);

  const top_hole_rimGeom = new THREE.TorusGeometry(0.071, 0.008, 8, 32);
  const top_hole_rim = new THREE.Mesh(top_hole_rimGeom, seamMat);
  top_hole_rim.name = "top_hole_rim";
  top_hole_rim.rotation.x = Math.PI / 2;
  top_hole_rim.position.set(0, 2.617, 0.015);
  root.add(top_hole_rim);

  const top_buttonGeom = new THREE.CylinderGeometry(0.031, 0.031, 0.009, 24);
  const top_button = new THREE.Mesh(top_buttonGeom, fastenerMat);
  top_button.name = "top_button";
  top_button.position.set(0.205, 2.614, -0.025);
  root.add(top_button);

  const top_button_centerGeom = new THREE.CylinderGeometry(0.018, 0.018, 0.012, 24);
  const top_button_center = new THREE.Mesh(top_button_centerGeom, top_capMat);
  top_button_center.name = "top_button_center";
  top_button_center.position.set(0.205, 2.619, -0.025);
  root.add(top_button_center);

  const radialForward = new THREE.Vector3(0, 0, 1);

  function placeRadial(mesh, angle, y, radius) {
    const normal = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
    mesh.position.set(normal.x * radius, y, normal.z * radius);
    mesh.quaternion.setFromUnitVectors(radialForward, normal);
    root.add(mesh);
    return mesh;
  }

  const upper_screwGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.014, 24);
  upper_screwGeom.rotateX(Math.PI / 2);
  const upper_screw_slotGeom = new THREE.BoxGeometry(0.038, 0.007, 0.005);

  const upper_left_screw = new THREE.Mesh(upper_screwGeom, fastenerMat);
  upper_left_screw.name = "upper_left_screw";
  placeRadial(upper_left_screw, 0.50, 2.285, 0.365);

  const upper_left_screw_slot = new THREE.Mesh(upper_screw_slotGeom, recessMat);
  upper_left_screw_slot.name = "upper_left_screw_slot";
  upper_left_screw_slot.rotation.z = 0.65;
  upper_left_screw_slot.position.z = 0.009;
  upper_left_screw.add(upper_left_screw_slot);

  const upper_right_screw = new THREE.Mesh(upper_screwGeom, fastenerMat);
  upper_right_screw.name = "upper_right_screw";
  placeRadial(upper_right_screw, 1.08, 2.285, 0.365);

  const upper_right_screw_slot = new THREE.Mesh(upper_screw_slotGeom, recessMat);
  upper_right_screw_slot.name = "upper_right_screw_slot";
  upper_right_screw_slot.rotation.z = -0.55;
  upper_right_screw_slot.position.z = 0.009;
  upper_right_screw.add(upper_right_screw_slot);

  const side_switchShape = new THREE.Shape();
  const switchW = 0.078;
  const switchH = 0.285;
  const switchR = 0.026;
  side_switchShape.moveTo(-switchW / 2 + switchR, -switchH / 2);
  side_switchShape.lineTo(switchW / 2 - switchR, -switchH / 2);
  side_switchShape.quadraticCurveTo(
    switchW / 2,
    -switchH / 2,
    switchW / 2,
    -switchH / 2 + switchR
  );
  side_switchShape.lineTo(switchW / 2, switchH / 2 - switchR);
  side_switchShape.quadraticCurveTo(
    switchW / 2,
    switchH / 2,
    switchW / 2 - switchR,
    switchH / 2
  );
  side_switchShape.lineTo(-switchW / 2 + switchR, switchH / 2);
  side_switchShape.quadraticCurveTo(
    -switchW / 2,
    switchH / 2,
    -switchW / 2,
    switchH / 2 - switchR
  );
  side_switchShape.lineTo(-switchW / 2, -switchH / 2 + switchR);
  side_switchShape.quadraticCurveTo(
    -switchW / 2,
    -switchH / 2,
    -switchW / 2 + switchR,
    -switchH / 2
  );

  const side_switchGeom = new THREE.ExtrudeGeometry(side_switchShape, {
    depth: 0.024,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const side_switch = new THREE.Mesh(side_switchGeom, bottom_baseMat);
  side_switch.name = "side_switch";
  placeRadial(side_switch, 1.27, 2.075, 0.361);

  const side_switch_ridgeGeom = new THREE.BoxGeometry(0.046, 0.010, 0.006);
  const side_switch_ridge = new THREE.Mesh(side_switch_ridgeGeom, fastenerMat);
  side_switch_ridge.name = "side_switch_ridge";
  side_switch_ridge.position.set(0, 0.095, 0.029);
  side_switch.add(side_switch_ridge);

  const middle_screwGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.014, 24);
  middle_screwGeom.rotateX(Math.PI / 2);
  const middle_screw = new THREE.Mesh(middle_screwGeom, fastenerMat);
  middle_screw.name = "middle_screw";
  placeRadial(middle_screw, 0.72, 1.48, 0.365);

  const middle_screw_slot_horizontal = new THREE.Mesh(
    upper_screw_slotGeom,
    recessMat
  );
  middle_screw_slot_horizontal.name = "middle_screw_slot_horizontal";
  middle_screw_slot_horizontal.position.z = 0.009;
  middle_screw.add(middle_screw_slot_horizontal);

  const middle_screw_slot_vertical = new THREE.Mesh(
    upper_screw_slotGeom,
    recessMat
  );
  middle_screw_slot_vertical.name = "middle_screw_slot_vertical";
  middle_screw_slot_vertical.rotation.z = Math.PI / 2;
  middle_screw_slot_vertical.position.z = 0.009;
  middle_screw.add(middle_screw_slot_vertical);

  const access_coverGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.014, 32);
  access_coverGeom.rotateX(Math.PI / 2);
  const access_cover = new THREE.Mesh(access_coverGeom, fastenerMat);
  access_cover.name = "access_cover";
  placeRadial(access_cover, -0.48, 0.56, 0.365);

  const access_cover_rimGeom = new THREE.TorusGeometry(0.067, 0.006, 8, 32);
  const access_cover_rim = new THREE.Mesh(access_cover_rimGeom, recessMat);
  access_cover_rim.name = "access_cover_rim";
  access_cover_rim.position.z = 0.010;
  access_cover.add(access_cover_rim);

  const access_cover_slotGeom = new THREE.BoxGeometry(0.044, 0.008, 0.005);
  const access_cover_slot = new THREE.Mesh(access_cover_slotGeom, recessMat);
  access_cover_slot.name = "access_cover_slot";
  access_cover_slot.rotation.z = 0.9;
  access_cover_slot.position.z = 0.011;
  access_cover.add(access_cover_slot);

  const laser_emitterGeom = new THREE.CylinderGeometry(0.023, 0.023, 0.016, 24);
  laser_emitterGeom.rotateX(Math.PI / 2);
  const laser_emitter = new THREE.Mesh(laser_emitterGeom, laser_emitterMat);
  laser_emitter.name = "laser_emitter";
  placeRadial(laser_emitter, -1.18, 2.08, 0.366);

  const laser_start = new THREE.Vector3(-0.365, 2.08, 0.397);
  const laser_end = new THREE.Vector3(-1.02, 1.78, 0.50);
  const laser_path = new THREE.LineCurve3(laser_start, laser_end);

  const laser_beamGeom = new THREE.TubeGeometry(laser_path, 1, 0.009, 8, false);
  const laser_beam = new THREE.Mesh(laser_beamGeom, laser_beamMat);
  laser_beam.name = "laser_beam";
  root.add(laser_beam);

  const laser_glowGeom = new THREE.TubeGeometry(laser_path, 1, 0.025, 10, false);
  const laser_glow = new THREE.Mesh(laser_glowGeom, laser_glowMat);
  laser_glow.name = "laser_glow";
  root.add(laser_glow);

  const laser_flareGeom = new THREE.SphereGeometry(0.036, 20, 12);
  const laser_flare = new THREE.Mesh(laser_flareGeom, laser_emitterMat);
  laser_flare.name = "laser_flare";
  laser_flare.position.copy(laser_start);
  root.add(laser_flare);

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