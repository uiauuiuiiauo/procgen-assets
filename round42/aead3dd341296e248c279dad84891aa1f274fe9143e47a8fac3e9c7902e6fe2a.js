export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "lemonade_pitcher";

  const pitcher = new THREE.Group();
  pitcher.name = "pitcher";

  const contents = new THREE.Group();
  contents.name = "contents";

  const lid = new THREE.Group();
  lid.name = "lid";

  const straw = new THREE.Group();
  straw.name = "straw";

  root.add(pitcher, contents, lid, straw);

  const pitcher_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xd7efc8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const green_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xa8d88d,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const frosted_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb7df98,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xe4df58,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.55,
    ior: 1.33,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const lemon_rindMat = new THREE.MeshStandardMaterial({
    color: 0xf1d918,
    metalness: 0.0,
    roughness: 0.7
  });

  const lemon_pulpMat = new THREE.MeshStandardMaterial({
    color: 0xf4e878,
    metalness: 0.0,
    roughness: 0.65,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide
  });

  const lemon_pithMat = new THREE.MeshStandardMaterial({
    color: 0xfff8c9,
    metalness: 0.0,
    roughness: 0.75,
    side: THREE.DoubleSide
  });

  const strawMat = new THREE.MeshStandardMaterial({
    color: 0xf4e9a5,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.76,
    side: THREE.DoubleSide
  });

  const straw_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xfffbd5,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.72
  });

  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xfffbe0,
    metalness: 0.0,
    roughness: 0.7
  });

  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x76975e,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });

  const condensation_dropletsMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f5d8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false
  });

  const pitcher_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.52, 0.00),
    new THREE.Vector2(0.61, 0.035),
    new THREE.Vector2(0.66, 0.12),
    new THREE.Vector2(0.70, 0.42),
    new THREE.Vector2(0.72, 0.86),
    new THREE.Vector2(0.71, 1.30),
    new THREE.Vector2(0.68, 1.65),
    new THREE.Vector2(0.61, 1.92),
    new THREE.Vector2(0.53, 2.12),
    new THREE.Vector2(0.51, 2.32),
    new THREE.Vector2(0.52, 2.40),
    new THREE.Vector2(0.00, 2.40)
  ];
  const pitcher_bodyGeom = new THREE.LatheGeometry(pitcher_bodyProfile, 48);
  const pitcher_body = new THREE.Mesh(pitcher_bodyGeom, pitcher_bodyMat);
  pitcher_body.name = "pitcher_body";
  pitcher_body.renderOrder = 4;
  pitcher.add(pitcher_body);

  const pitcher_baseGeom = new THREE.CylinderGeometry(0.59, 0.61, 0.075, 48);
  const pitcher_base = new THREE.Mesh(pitcher_baseGeom, green_glassMat);
  pitcher_base.name = "pitcher_base";
  pitcher_base.position.y = 0.045;
  pitcher_base.renderOrder = 4;
  pitcher.add(pitcher_base);

  const pitcher_base_ringGeom = new THREE.TorusGeometry(0.59, 0.035, 10, 48);
  const pitcher_base_ring = new THREE.Mesh(pitcher_base_ringGeom, green_glassMat);
  pitcher_base_ring.name = "pitcher_base_ring";
  pitcher_base_ring.rotation.x = Math.PI / 2;
  pitcher_base_ring.position.y = 0.055;
  pitcher_base_ring.renderOrder = 4;
  pitcher.add(pitcher_base_ring);

  const pitcher_neckGeom = new THREE.CylinderGeometry(0.515, 0.515, 0.29, 48, 1, true);
  const pitcher_neck = new THREE.Mesh(pitcher_neckGeom, green_glassMat);
  pitcher_neck.name = "pitcher_neck";
  pitcher_neck.position.y = 2.255;
  pitcher_neck.renderOrder = 4;
  pitcher.add(pitcher_neck);

  const pitcher_lower_collarGeom = new THREE.TorusGeometry(0.535, 0.065, 12, 48);
  const pitcher_lower_collar = new THREE.Mesh(pitcher_lower_collarGeom, green_glassMat);
  pitcher_lower_collar.name = "pitcher_lower_collar";
  pitcher_lower_collar.rotation.x = Math.PI / 2;
  pitcher_lower_collar.position.y = 2.16;
  pitcher_lower_collar.renderOrder = 4;
  pitcher.add(pitcher_lower_collar);

  const pitcher_upper_collarGeom = new THREE.TorusGeometry(0.525, 0.042, 10, 48);
  const pitcher_upper_collar = new THREE.Mesh(pitcher_upper_collarGeom, green_glassMat);
  pitcher_upper_collar.name = "pitcher_upper_collar";
  pitcher_upper_collar.rotation.x = Math.PI / 2;
  pitcher_upper_collar.position.y = 2.34;
  pitcher_upper_collar.renderOrder = 4;
  pitcher.add(pitcher_upper_collar);

  const pitcher_mouth_rimGeom = new THREE.TorusGeometry(0.52, 0.038, 10, 48);
  const pitcher_mouth_rim = new THREE.Mesh(pitcher_mouth_rimGeom, green_glassMat);
  pitcher_mouth_rim.name = "pitcher_mouth_rim";
  pitcher_mouth_rim.rotation.x = Math.PI / 2;
  pitcher_mouth_rim.position.y = 2.405;
  pitcher_mouth_rim.renderOrder = 4;
  pitcher.add(pitcher_mouth_rim);

  const pitcher_handlePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.53, 1.94, -0.05),
    new THREE.Vector3(0.78, 2.02, -0.05),
    new THREE.Vector3(1.08, 1.96, -0.05),
    new THREE.Vector3(1.27, 1.68, -0.05),
    new THREE.Vector3(1.28, 1.25, -0.05),
    new THREE.Vector3(1.12, 0.82, -0.05),
    new THREE.Vector3(0.72, 0.58, -0.05)
  ], false, "centripetal");
  const pitcher_handleGeom = new THREE.TubeGeometry(
    pitcher_handlePath,
    56,
    0.135,
    14,
    false
  );
  const pitcher_handle = new THREE.Mesh(pitcher_handleGeom, green_glassMat);
  pitcher_handle.name = "pitcher_handle";
  pitcher_handle.renderOrder = 4;
  pitcher.add(pitcher_handle);

  const handle_attachmentGeom = new THREE.SphereGeometry(1, 24, 14);

  const handle_upper_attachment = new THREE.Mesh(handle_attachmentGeom, green_glassMat);
  handle_upper_attachment.name = "handle_upper_attachment";
  handle_upper_attachment.position.set(0.59, 1.93, -0.045);
  handle_upper_attachment.scale.set(0.22, 0.17, 0.18);
  handle_upper_attachment.renderOrder = 4;
  pitcher.add(handle_upper_attachment);

  const handle_lower_attachment = new THREE.Mesh(handle_attachmentGeom, green_glassMat);
  handle_lower_attachment.name = "handle_lower_attachment";
  handle_lower_attachment.position.set(0.66, 0.61, -0.045);
  handle_lower_attachment.scale.set(0.20, 0.18, 0.17);
  handle_lower_attachment.renderOrder = 4;
  pitcher.add(handle_lower_attachment);

  const liquidProfile = [
    new THREE.Vector2(0.00, 0.11),
    new THREE.Vector2(0.53, 0.11),
    new THREE.Vector2(0.60, 0.16),
    new THREE.Vector2(0.65, 0.38),
    new THREE.Vector2(0.67, 0.82),
    new THREE.Vector2(0.66, 1.25),
    new THREE.Vector2(0.635, 1.52),
    new THREE.Vector2(0.00, 1.52)
  ];
  const liquidGeom = new THREE.LatheGeometry(liquidProfile, 48);
  const liquid = new THREE.Mesh(liquidGeom, liquidMat);
  liquid.name = "liquid";
  liquid.renderOrder = 1;
  contents.add(liquid);

  const liquid_surfaceGeom = new THREE.CircleGeometry(0.632, 48);
  const liquid_surface = new THREE.Mesh(liquid_surfaceGeom, liquidMat);
  liquid_surface.name = "liquid_surface";
  liquid_surface.rotation.x = -Math.PI / 2;
  liquid_surface.position.y = 1.523;
  liquid_surface.renderOrder = 1;
  contents.add(liquid_surface);

  const liquid_meniscusGeom = new THREE.TorusGeometry(0.615, 0.012, 8, 48);
  const liquid_meniscus = new THREE.Mesh(liquid_meniscusGeom, foamMat);
  liquid_meniscus.name = "liquid_meniscus";
  liquid_meniscus.rotation.x = Math.PI / 2;
  liquid_meniscus.position.y = 1.535;
  contents.add(liquid_meniscus);

  const lemon_slice_outerGeom = new THREE.CylinderGeometry(1, 1, 0.055, 48);
  const lemon_slice_pithGeom = new THREE.RingGeometry(0.79, 0.965, 48);
  const lemon_slice_pulpGeom = new THREE.CircleGeometry(0.81, 48);
  const lemon_slice_centerGeom = new THREE.CircleGeometry(0.09, 20);
  const lemon_segment_membraneGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.68, 6);

  function createLemonSlice(partName) {
    const slice = new THREE.Group();
    slice.name = partName;

    const outer_rind = new THREE.Mesh(lemon_slice_outerGeom, lemon_rindMat);
    outer_rind.name = partName + "_outer_rind";
    outer_rind.rotation.x = Math.PI / 2;
    slice.add(outer_rind);

    const inner_pith = new THREE.Mesh(lemon_slice_pithGeom, lemon_pithMat);
    inner_pith.name = partName + "_inner_pith";
    inner_pith.position.z = 0.030;
    slice.add(inner_pith);

    const fruit_pulp = new THREE.Mesh(lemon_slice_pulpGeom, lemon_pulpMat);
    fruit_pulp.name = partName + "_fruit_pulp";
    fruit_pulp.position.z = 0.032;
    slice.add(fruit_pulp);

    const segment_membranes = new THREE.InstancedMesh(
      lemon_segment_membraneGeom,
      lemon_pithMat,
      9
    );
    segment_membranes.name = partName + "_segment_membranes";
    const membrane_dummy = new THREE.Object3D();
    for (let i = 0; i < 9; i++) {
      const angle = i / 9 * Math.PI * 2;
      membrane_dummy.position.set(
        Math.cos(angle) * 0.34,
        Math.sin(angle) * 0.34,
        0.041
      );
      membrane_dummy.rotation.set(0, 0, angle - Math.PI / 2);
      membrane_dummy.scale.set(1, 1, 1);
      membrane_dummy.updateMatrix();
      segment_membranes.setMatrixAt(i, membrane_dummy.matrix);
    }
    segment_membranes.instanceMatrix.needsUpdate = true;
    slice.add(segment_membranes);

    const center_pith = new THREE.Mesh(lemon_slice_centerGeom, lemon_pithMat);
    center_pith.name = partName + "_center_pith";
    center_pith.position.z = 0.047;
    slice.add(center_pith);

    return slice;
  }

  const lemon_slice_upper = createLemonSlice("lemon_slice_upper");
  lemon_slice_upper.position.set(-0.03, 1.55, 0.48);
  lemon_slice_upper.rotation.set(0.02, -0.10, -0.18);
  lemon_slice_upper.scale.setScalar(0.50);
  contents.add(lemon_slice_upper);

  const lemon_slice_right = createLemonSlice("lemon_slice_right");
  lemon_slice_right.position.set(0.18, 0.98, 0.50);
  lemon_slice_right.rotation.set(-0.02, 0.10, 0.14);
  lemon_slice_right.scale.setScalar(0.49);
  contents.add(lemon_slice_right);

  const lemon_slice_lower_left = createLemonSlice("lemon_slice_lower_left");
  lemon_slice_lower_left.position.set(-0.18, 0.47, 0.47);
  lemon_slice_lower_left.rotation.set(0.03, -0.08, 0.48);
  lemon_slice_lower_left.scale.set(0.47, 0.53, 0.47);
  contents.add(lemon_slice_lower_left);

  const lemon_slice_rear = createLemonSlice("lemon_slice_rear");
  lemon_slice_rear.position.set(-0.15, 0.82, -0.46);
  lemon_slice_rear.rotation.set(0.04, Math.PI - 0.12, -0.28);
  lemon_slice_rear.scale.setScalar(0.45);
  contents.add(lemon_slice_rear);

  const foam_bubblesGeom = new THREE.SphereGeometry(1, 10, 7);
  const foam_bubbles = new THREE.InstancedMesh(foam_bubblesGeom, foamMat, 24);
  foam_bubbles.name = "foam_bubbles";
  const foam_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = i / 24 * Math.PI * 2;
    const radius = 0.565 + (i % 3) * 0.012;
    const bubbleSize = 0.011 + (i % 4) * 0.003;
    foam_dummy.position.set(
      Math.cos(angle) * radius,
      1.548 + (i % 2) * 0.006,
      Math.sin(angle) * radius
    );
    foam_dummy.rotation.set(0, 0, 0);
    foam_dummy.scale.setScalar(bubbleSize);
    foam_dummy.updateMatrix();
    foam_bubbles.setMatrixAt(i, foam_dummy.matrix);
  }
  foam_bubbles.instanceMatrix.needsUpdate = true;
  contents.add(foam_bubbles);

  const lid_capProfile = [
    new THREE.Vector2(0.00, 2.40),
    new THREE.Vector2(0.53, 2.40),
    new THREE.Vector2(0.61, 2.42),
    new THREE.Vector2(0.66, 2.47),
    new THREE.Vector2(0.65, 2.57),
    new THREE.Vector2(0.61, 2.62),
    new THREE.Vector2(0.46, 2.64),
    new THREE.Vector2(0.00, 2.64)
  ];
  const lid_capGeom = new THREE.LatheGeometry(lid_capProfile, 48);
  const lid_cap = new THREE.Mesh(lid_capGeom, frosted_glassMat);
  lid_cap.name = "lid_cap";
  lid_cap.renderOrder = 5;
  lid.add(lid_cap);

  const lid_lower_rimGeom = new THREE.TorusGeometry(0.615, 0.038, 10, 48);
  const lid_lower_rim = new THREE.Mesh(lid_lower_rimGeom, frosted_glassMat);
  lid_lower_rim.name = "lid_lower_rim";
  lid_lower_rim.rotation.x = Math.PI / 2;
  lid_lower_rim.position.y = 2.445;
  lid_lower_rim.renderOrder = 5;
  lid.add(lid_lower_rim);

  const lid_top_rimGeom = new THREE.TorusGeometry(0.565, 0.035, 10, 48);
  const lid_top_rim = new THREE.Mesh(lid_top_rimGeom, frosted_glassMat);
  lid_top_rim.name = "lid_top_rim";
  lid_top_rim.rotation.x = Math.PI / 2;
  lid_top_rim.position.y = 2.615;
  lid_top_rim.renderOrder = 5;
  lid.add(lid_top_rim);

  const lid_ribsGeom = new THREE.BoxGeometry(0.027, 0.135, 0.027);
  const lid_ribs = new THREE.InstancedMesh(lid_ribsGeom, frosted_glassMat, 30);
  lid_ribs.name = "lid_ribs";
  const lid_rib_dummy = new THREE.Object3D();
  for (let i = 0; i < 30; i++) {
    const angle = i / 30 * Math.PI * 2;
    lid_rib_dummy.position.set(
      Math.cos(angle) * 0.655,
      2.525,
      Math.sin(angle) * 0.655
    );
    lid_rib_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    lid_rib_dummy.scale.set(1, 1, 1);
    lid_rib_dummy.updateMatrix();
    lid_ribs.setMatrixAt(i, lid_rib_dummy.matrix);
  }
  lid_ribs.instanceMatrix.needsUpdate = true;
  lid_ribs.renderOrder = 5;
  lid.add(lid_ribs);

  const lid_straw_holeGeom = new THREE.CircleGeometry(0.078, 24);
  const lid_straw_hole = new THREE.Mesh(lid_straw_holeGeom, openingMat);
  lid_straw_hole.name = "lid_straw_hole";
  lid_straw_hole.rotation.x = -Math.PI / 2;
  lid_straw_hole.position.set(0.04, 2.647, 0.01);
  lid.add(lid_straw_hole);

  const lid_straw_grommetGeom = new THREE.TorusGeometry(0.075, 0.015, 8, 28);
  const lid_straw_grommet = new THREE.Mesh(lid_straw_grommetGeom, frosted_glassMat);
  lid_straw_grommet.name = "lid_straw_grommet";
  lid_straw_grommet.rotation.x = Math.PI / 2;
  lid_straw_grommet.position.set(0.04, 2.651, 0.01);
  lid_straw_grommet.renderOrder = 5;
  lid.add(lid_straw_grommet);

  const straw_bottom = new THREE.Vector3(0.52, 0.28, 0.10);
  const straw_top = new THREE.Vector3(-0.72, 3.72, 0.03);
  const straw_direction = new THREE.Vector3().subVectors(straw_top, straw_bottom);
  const straw_length = straw_direction.length();
  straw_direction.normalize();

  const straw_quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    straw_direction
  );

  const straw_outerGeom = new THREE.CylinderGeometry(
    0.068,
    0.068,
    straw_length,
    24,
    1,
    true
  );
  const straw_outer = new THREE.Mesh(straw_outerGeom, strawMat);
  straw_outer.name = "straw_outer";
  straw_outer.position.copy(straw_bottom).add(straw_top).multiplyScalar(0.5);
  straw_outer.quaternion.copy(straw_quaternion);
  straw.add(straw_outer);

  const straw_highlightOffset = new THREE.Vector3(0, 0, 0.064);
  const straw_highlightGeom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    straw_length * 0.98,
    8
  );
  const straw_highlight = new THREE.Mesh(straw_highlightGeom, straw_highlightMat);
  straw_highlight.name = "straw_highlight";
  straw_highlight.position.copy(straw_outer.position).add(straw_highlightOffset);
  straw_highlight.quaternion.copy(straw_quaternion);
  straw.add(straw_highlight);

  const straw_top_rimGeom = new THREE.TorusGeometry(0.058, 0.010, 8, 24);
  const straw_top_rim = new THREE.Mesh(straw_top_rimGeom, strawMat);
  straw_top_rim.name = "straw_top_rim";
  straw_top_rim.position.copy(straw_top);
  straw_top_rim.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    straw_direction
  );
  straw.add(straw_top_rim);

  const straw_openingGeom = new THREE.CircleGeometry(0.049, 24);
  const straw_opening = new THREE.Mesh(straw_openingGeom, openingMat);
  straw_opening.name = "straw_opening";
  straw_opening.position.copy(straw_top).addScaledVector(straw_direction, 0.002);
  straw_opening.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    straw_direction
  );
  straw.add(straw_opening);

  function bodyRadiusAt(y) {
    if (y < 0.18) return 0.61 + y * 0.30;
    if (y < 1.30) return 0.67 + (y - 0.18) * 0.035;
    if (y < 1.90) return 0.709 - (y - 1.30) * 0.165;
    if (y < 2.15) return 0.61 - (y - 1.90) * 0.32;
    return 0.51;
  }

  const condensation_dropletsGeom = new THREE.SphereGeometry(1, 10, 7);
  const condensation_droplets = new THREE.InstancedMesh(
    condensation_dropletsGeom,
    condensation_dropletsMat,
    18
  );
  condensation_droplets.name = "condensation_droplets";
  const droplet_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const y = 0.28 + ((i * 7) % 17) / 17 * 1.72;
    const x = ((((i * 5) % 17) - 8) / 8) * 0.48;
    const radius = bodyRadiusAt(y);
    const z = Math.sqrt(Math.max(0.02, radius * radius - x * x)) + 0.009;
    const dropletSize = 0.010 + (i % 4) * 0.003;
    droplet_dummy.position.set(x, y, z);
    droplet_dummy.rotation.set(0, 0, 0);
    droplet_dummy.scale.set(
      dropletSize,
      dropletSize * (1.0 + (i % 3) * 0.35),
      dropletSize * 0.55
    );
    droplet_dummy.updateMatrix();
    condensation_droplets.setMatrixAt(i, droplet_dummy.matrix);
  }
  condensation_droplets.instanceMatrix.needsUpdate = true;
  condensation_droplets.renderOrder = 6;
  pitcher.add(condensation_droplets);

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