export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "railway_freight_wagon";

  const wagon_length = 3.6;
  const wagon_width = 1.4;
  const body_bottom = 0.9;
  const body_height = 1.35;
  const body_top = body_bottom + body_height;
  const wheel_radius = 0.405;
  const wheel_y = 0.43;
  const wheel_x = 0.78;
  const axle_positions = [-1.18, 1.18];

  const body_mat = new THREE.MeshStandardMaterial({
    color: 0x5b4635,
    metalness: 0.1,
    roughness: 0.8
  });
  const body_trim_mat = new THREE.MeshStandardMaterial({
    color: 0x49372c,
    metalness: 0.1,
    roughness: 0.85
  });
  const roof_mat = new THREE.MeshStandardMaterial({
    color: 0x70736c,
    metalness: 0.35,
    roughness: 0.65
  });
  const underframe_mat = new THREE.MeshStandardMaterial({
    color: 0x202322,
    metalness: 0.45,
    roughness: 0.6
  });
  const wheel_face_mat = new THREE.MeshStandardMaterial({
    color: 0x111313,
    metalness: 0.5,
    roughness: 0.5
  });
  const wheel_rim_mat = new THREE.MeshStandardMaterial({
    color: 0x9b815d,
    metalness: 0.4,
    roughness: 0.55
  });
  const lettering_mat = new THREE.MeshStandardMaterial({
    color: 0xd6bd68,
    metalness: 0.0,
    roughness: 0.7
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const cargo_body_geom = new THREE.BoxGeometry(
    wagon_width,
    body_height,
    wagon_length
  );
  const cargo_body = new THREE.Mesh(cargo_body_geom, body_mat);
  cargo_body.name = "cargo_body";
  cargo_body.position.set(0, body_bottom + body_height / 2, 0);
  root.add(cargo_body);

  const side_door_panels_geom = new THREE.BoxGeometry(0.026, 1.17, 0.74);
  const side_door_panels = new THREE.InstancedMesh(
    side_door_panels_geom,
    body_mat,
    4
  );
  side_door_panels.name = "side_door_panels";
  const dummy = new THREE.Object3D();
  let instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.42, 0.42]) {
      dummy.position.set(
        side * (wagon_width / 2 + 0.014),
        1.565,
        z
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_door_panels.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  side_door_panels.instanceMatrix.needsUpdate = true;
  root.add(side_door_panels);

  const roof_geom = new THREE.CylinderGeometry(
    1,
    1,
    wagon_length + 0.28,
    24,
    1,
    false
  );
  const roof = new THREE.Mesh(roof_geom, roof_mat);
  roof.name = "roof";
  roof.rotation.x = Math.PI / 2;
  roof.scale.set(0.84, 1, 0.11);
  roof.position.set(0, body_top + 0.075, 0);
  root.add(roof);

  const roof_edge_rails_geom = new THREE.BoxGeometry(
    0.075,
    0.075,
    wagon_length + 0.24
  );
  const roof_edge_rails = new THREE.InstancedMesh(
    roof_edge_rails_geom,
    roof_mat,
    2
  );
  roof_edge_rails.name = "roof_edge_rails";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.81, body_top + 0.005, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_edge_rails.setMatrixAt(i, dummy.matrix);
  }
  roof_edge_rails.instanceMatrix.needsUpdate = true;
  root.add(roof_edge_rails);

  const roof_end_rails_geom = new THREE.BoxGeometry(1.62, 0.075, 0.075);
  const roof_end_rails = new THREE.InstancedMesh(
    roof_end_rails_geom,
    roof_mat,
    2
  );
  roof_end_rails.name = "roof_end_rails";
  for (let i = 0; i < 2; i++) {
    const end = i === 0 ? -1 : 1;
    dummy.position.set(0, body_top + 0.005, end * 1.91);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    roof_end_rails.setMatrixAt(i, dummy.matrix);
  }
  roof_end_rails.instanceMatrix.needsUpdate = true;
  root.add(roof_end_rails);

  const side_vertical_ribs_geom = new THREE.BoxGeometry(0.06, 1.27, 0.065);
  const side_vertical_ribs = new THREE.InstancedMesh(
    side_vertical_ribs_geom,
    body_trim_mat,
    10
  );
  side_vertical_ribs.name = "side_vertical_ribs";
  const rib_positions = [-1.72, -1.12, -0.66, 0, 0.66, 1.12, 1.72];
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of rib_positions) {
      dummy.position.set(
        side * (wagon_width / 2 + 0.035),
        1.565,
        z
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_vertical_ribs.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  side_vertical_ribs.instanceMatrix.needsUpdate = true;
  root.add(side_vertical_ribs);

  const side_horizontal_rails_geom = new THREE.BoxGeometry(
    0.058,
    0.075,
    wagon_length
  );
  const side_horizontal_rails = new THREE.InstancedMesh(
    side_horizontal_rails_geom,
    body_trim_mat,
    4
  );
  side_horizontal_rails.name = "side_horizontal_rails";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const y of [0.96, 2.17]) {
      dummy.position.set(
        side * (wagon_width / 2 + 0.034),
        y,
        0
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      side_horizontal_rails.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  side_horizontal_rails.instanceMatrix.needsUpdate = true;
  root.add(side_horizontal_rails);

  const door_seams_geom = new THREE.BoxGeometry(0.018, 1.12, 0.018);
  const door_seams = new THREE.InstancedMesh(
    door_seams_geom,
    body_trim_mat,
    4
  );
  door_seams.name = "door_seams";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.05, 0.05]) {
      dummy.position.set(
        side * (wagon_width / 2 + 0.052),
        1.565,
        z
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      door_seams.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  door_seams.instanceMatrix.needsUpdate = true;
  root.add(door_seams);

  const door_latches_geom = new THREE.CylinderGeometry(
    0.065,
    0.065,
    0.05,
    16
  );
  const door_latches = new THREE.InstancedMesh(
    door_latches_geom,
    underframe_mat,
    2
  );
  door_latches.name = "door_latches";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(
      side * (wagon_width / 2 + 0.075),
      1.52,
      0.07
    );
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_latches.setMatrixAt(i, dummy.matrix);
  }
  door_latches.instanceMatrix.needsUpdate = true;
  root.add(door_latches);

  const door_latch_slots_geom = new THREE.BoxGeometry(0.014, 0.055, 0.012);
  const door_latch_slots = new THREE.InstancedMesh(
    door_latch_slots_geom,
    wheel_face_mat,
    2
  );
  door_latch_slots.name = "door_latch_slots";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(
      side * (wagon_width / 2 + 0.103),
      1.52,
      0.07
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    door_latch_slots.setMatrixAt(i, dummy.matrix);
  }
  door_latch_slots.instanceMatrix.needsUpdate = true;
  root.add(door_latch_slots);

  const end_vertical_ribs_geom = new THREE.BoxGeometry(0.065, 1.27, 0.06);
  const end_vertical_ribs = new THREE.InstancedMesh(
    end_vertical_ribs_geom,
    body_trim_mat,
    4
  );
  end_vertical_ribs.name = "end_vertical_ribs";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const x of [-0.52, 0.52]) {
      dummy.position.set(x, 1.565, end * 1.825);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      end_vertical_ribs.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  end_vertical_ribs.instanceMatrix.needsUpdate = true;
  root.add(end_vertical_ribs);

  const end_horizontal_rails_geom = new THREE.BoxGeometry(1.42, 0.075, 0.06);
  const end_horizontal_rails = new THREE.InstancedMesh(
    end_horizontal_rails_geom,
    body_trim_mat,
    4
  );
  end_horizontal_rails.name = "end_horizontal_rails";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const y of [0.96, 2.17]) {
      dummy.position.set(0, y, end * 1.825);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      end_horizontal_rails.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  end_horizontal_rails.instanceMatrix.needsUpdate = true;
  root.add(end_horizontal_rails);

  const end_ladders = new THREE.Group();
  end_ladders.name = "end_ladders";
  const ladder_vertical_geom = new THREE.BoxGeometry(0.055, 0.76, 0.055);
  const ladder_rung_geom = new THREE.BoxGeometry(0.46, 0.05, 0.055);
  for (const end of [-1, 1]) {
    for (const x of [-0.18, 0.18]) {
      const ladder_vertical = new THREE.Mesh(
        ladder_vertical_geom,
        body_trim_mat
      );
      ladder_vertical.position.set(x, 1.48, end * 1.875);
      end_ladders.add(ladder_vertical);
    }
    for (const y of [1.18, 1.48, 1.78]) {
      const ladder_rung = new THREE.Mesh(ladder_rung_geom, body_trim_mat);
      ladder_rung.position.set(0, y, end * 1.875);
      end_ladders.add(ladder_rung);
    }
  }
  root.add(end_ladders);

  const chassis_geom = new THREE.BoxGeometry(1.52, 0.22, 4.02);
  const chassis = new THREE.Mesh(chassis_geom, underframe_mat);
  chassis.name = "chassis";
  chassis.position.set(0, 0.8, 0);
  root.add(chassis);

  const side_sills_geom = new THREE.BoxGeometry(0.12, 0.27, 3.9);
  const side_sills = new THREE.InstancedMesh(
    side_sills_geom,
    underframe_mat,
    2
  );
  side_sills.name = "side_sills";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(side * 0.73, 0.77, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_sills.setMatrixAt(i, dummy.matrix);
  }
  side_sills.instanceMatrix.needsUpdate = true;
  root.add(side_sills);

  const buffer_beams_geom = new THREE.BoxGeometry(1.62, 0.3, 0.18);
  const buffer_beams = new THREE.InstancedMesh(
    buffer_beams_geom,
    underframe_mat,
    2
  );
  buffer_beams.name = "buffer_beams";
  for (let i = 0; i < 2; i++) {
    const end = i === 0 ? -1 : 1;
    dummy.position.set(0, 0.75, end * 2.04);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    buffer_beams.setMatrixAt(i, dummy.matrix);
  }
  buffer_beams.instanceMatrix.needsUpdate = true;
  root.add(buffer_beams);

  const buffer_stems_geom = new THREE.CylinderGeometry(
    0.065,
    0.065,
    0.38,
    14
  );
  const buffer_stems = new THREE.InstancedMesh(
    buffer_stems_geom,
    underframe_mat,
    4
  );
  buffer_stems.name = "buffer_stems";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const x of [-0.5, 0.5]) {
      dummy.position.set(x, 0.75, end * 2.29);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      buffer_stems.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  buffer_stems.instanceMatrix.needsUpdate = true;
  root.add(buffer_stems);

  const buffer_heads_geom = new THREE.CylinderGeometry(
    0.145,
    0.145,
    0.075,
    20
  );
  const buffer_heads = new THREE.InstancedMesh(
    buffer_heads_geom,
    underframe_mat,
    4
  );
  buffer_heads.name = "buffer_heads";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const x of [-0.5, 0.5]) {
      dummy.position.set(x, 0.75, end * 2.51);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      buffer_heads.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  buffer_heads.instanceMatrix.needsUpdate = true;
  root.add(buffer_heads);

  const coupler_rods_geom = new THREE.BoxGeometry(0.1, 0.11, 0.52);
  const coupler_rods = new THREE.InstancedMesh(
    coupler_rods_geom,
    underframe_mat,
    2
  );
  coupler_rods.name = "coupler_rods";
  for (let i = 0; i < 2; i++) {
    const end = i === 0 ? -1 : 1;
    dummy.position.set(0, 0.61, end * 2.35);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    coupler_rods.setMatrixAt(i, dummy.matrix);
  }
  coupler_rods.instanceMatrix.needsUpdate = true;
  root.add(coupler_rods);

  const coupler_hooks = new THREE.Group();
  coupler_hooks.name = "coupler_hooks";
  for (const end of [-1, 1]) {
    const hook_points = [
      new THREE.Vector3(0, 0.62, end * 2.56),
      new THREE.Vector3(0, 0.59, end * 2.68),
      new THREE.Vector3(0, 0.48, end * 2.74),
      new THREE.Vector3(0, 0.42, end * 2.67)
    ];
    const hook_curve = new THREE.CatmullRomCurve3(hook_points);
    const hook_geom = new THREE.TubeGeometry(
      hook_curve,
      12,
      0.035,
      8,
      false
    );
    const coupler_hook = new THREE.Mesh(hook_geom, underframe_mat);
    coupler_hooks.add(coupler_hook);
  }
  root.add(coupler_hooks);

  const axles_geom = new THREE.CylinderGeometry(0.065, 0.065, 1.68, 14);
  const axles = new THREE.InstancedMesh(axles_geom, underframe_mat, 2);
  axles.name = "axles";
  for (let i = 0; i < axle_positions.length; i++) {
    dummy.position.set(0, wheel_y, axle_positions[i]);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    axles.setMatrixAt(i, dummy.matrix);
  }
  axles.instanceMatrix.needsUpdate = true;
  root.add(axles);

  const wheel_discs_geom = new THREE.CylinderGeometry(
    wheel_radius,
    wheel_radius,
    0.18,
    32
  );
  const wheel_discs = new THREE.InstancedMesh(
    wheel_discs_geom,
    wheel_face_mat,
    4
  );
  wheel_discs.name = "wheel_discs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * wheel_x, wheel_y, z);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_discs.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  wheel_discs.instanceMatrix.needsUpdate = true;
  root.add(wheel_discs);

  const wheel_outer_rims_geom = new THREE.TorusGeometry(
    0.34,
    0.055,
    12,
    32
  );
  const wheel_outer_rims = new THREE.InstancedMesh(
    wheel_outer_rims_geom,
    wheel_rim_mat,
    4
  );
  wheel_outer_rims.name = "wheel_outer_rims";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * 0.88, wheel_y, z);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_outer_rims.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  wheel_outer_rims.instanceMatrix.needsUpdate = true;
  root.add(wheel_outer_rims);

  const wheel_spokes_geom = new THREE.BoxGeometry(0.045, 0.28, 0.06);
  const wheel_spokes = new THREE.InstancedMesh(
    wheel_spokes_geom,
    underframe_mat,
    24
  );
  wheel_spokes.name = "wheel_spokes";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      for (let i = 0; i < 6; i++) {
        const angle = i / 6 * Math.PI * 2;
        dummy.position.set(
          side * 0.9,
          wheel_y + Math.cos(angle) * 0.18,
          z + Math.sin(angle) * 0.18
        );
        dummy.rotation.set(angle, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        wheel_spokes.setMatrixAt(instance_index++, dummy.matrix);
      }
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const wheel_hubs_geom = new THREE.CylinderGeometry(0.12, 0.12, 0.22, 18);
  const wheel_hubs = new THREE.InstancedMesh(
    wheel_hubs_geom,
    underframe_mat,
    4
  );
  wheel_hubs.name = "wheel_hubs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * 0.89, wheel_y, z);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      wheel_hubs.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const axle_boxes_geom = new THREE.BoxGeometry(0.15, 0.25, 0.28);
  const axle_boxes = new THREE.InstancedMesh(
    axle_boxes_geom,
    underframe_mat,
    4
  );
  axle_boxes.name = "axle_boxes";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * 0.96, wheel_y, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      axle_boxes.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  axle_boxes.instanceMatrix.needsUpdate = true;
  root.add(axle_boxes);

  const axle_box_caps_geom = new THREE.CylinderGeometry(
    0.09,
    0.09,
    0.04,
    16
  );
  const axle_box_caps = new THREE.InstancedMesh(
    axle_box_caps_geom,
    wheel_face_mat,
    4
  );
  axle_box_caps.name = "axle_box_caps";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * 1.045, wheel_y, z);
      dummy.rotation.set(0, 0, Math.PI / 2);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      axle_box_caps.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  axle_box_caps.instanceMatrix.needsUpdate = true;
  root.add(axle_box_caps);

  const spring_plates_geom = new THREE.BoxGeometry(0.13, 0.1, 0.76);
  const spring_plates = new THREE.InstancedMesh(
    spring_plates_geom,
    underframe_mat,
    4
  );
  spring_plates.name = "spring_plates";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * 0.91, 0.89, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      spring_plates.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  spring_plates.instanceMatrix.needsUpdate = true;
  root.add(spring_plates);

  const leaf_springs_geom = new THREE.BoxGeometry(0.055, 0.045, 0.58);
  const leaf_springs = new THREE.InstancedMesh(
    leaf_springs_geom,
    wheel_rim_mat,
    4
  );
  leaf_springs.name = "leaf_springs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      dummy.position.set(side * 0.99, 0.84, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      leaf_springs.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  leaf_springs.instanceMatrix.needsUpdate = true;
  root.add(leaf_springs);

  const underframe_braces = new THREE.Group();
  underframe_braces.name = "underframe_braces";
  for (const side of [-1, 1]) {
    for (const axle_z of axle_positions) {
      for (const direction of [-1, 1]) {
        const brace_curve = new THREE.LineCurve3(
          new THREE.Vector3(side * 0.94, 0.72, axle_z + direction * 0.31),
          new THREE.Vector3(side * 0.94, 0.87, axle_z + direction * 0.08)
        );
        const brace_geom = new THREE.TubeGeometry(
          brace_curve,
          1,
          0.025,
          6,
          false
        );
        const underframe_brace = new THREE.Mesh(
          brace_geom,
          underframe_mat
        );
        underframe_braces.add(underframe_brace);
      }
    }
  }
  root.add(underframe_braces);

  const center_brake_rigging = new THREE.Group();
  center_brake_rigging.name = "center_brake_rigging";
  const rigging_bar_geom = new THREE.BoxGeometry(0.065, 0.065, 0.72);
  for (const z of [-0.34, 0.34]) {
    const rigging_bar = new THREE.Mesh(rigging_bar_geom, underframe_mat);
    rigging_bar.position.set(0, 0.52, z);
    center_brake_rigging.add(rigging_bar);
  }
  const rigging_post_geom = new THREE.BoxGeometry(0.065, 0.3, 0.065);
  for (const z of [-0.34, 0.34]) {
    for (const x of [-0.28, 0.28]) {
      const rigging_post = new THREE.Mesh(rigging_post_geom, underframe_mat);
      rigging_post.position.set(x, 0.67, z);
      center_brake_rigging.add(rigging_post);
    }
  }
  root.add(center_brake_rigging);

  const side_steps = new THREE.Group();
  side_steps.name = "side_steps";
  const step_tread_geom = new THREE.BoxGeometry(0.24, 0.055, 0.36);
  const step_support_geom = new THREE.BoxGeometry(0.06, 0.25, 0.06);
  for (const side of [-1, 1]) {
    const step_tread = new THREE.Mesh(step_tread_geom, underframe_mat);
    step_tread.position.set(side * 0.84, 0.58, 0);
    side_steps.add(step_tread);
    for (const z of [-0.13, 0.13]) {
      const step_support = new THREE.Mesh(step_support_geom, underframe_mat);
      step_support.position.set(side * 0.76, 0.7, z);
      side_steps.add(step_support);
    }
  }
  root.add(side_steps);

  const side_handrails = new THREE.Group();
  side_handrails.name = "side_handrails";
  for (const side of [-1, 1]) {
    const handrail_points = [
      new THREE.Vector3(side * 0.77, 0.82, 1.63),
      new THREE.Vector3(side * 0.89, 0.85, 1.68),
      new THREE.Vector3(side * 0.89, 1.08, 1.68),
      new THREE.Vector3(side * 0.77, 1.1, 1.61)
    ];
    const handrail_curve = new THREE.CatmullRomCurve3(handrail_points);
    const handrail_geom = new THREE.TubeGeometry(
      handrail_curve,
      16,
      0.025,
      8,
      false
    );
    const side_handrail = new THREE.Mesh(handrail_geom, underframe_mat);
    side_handrails.add(side_handrail);
  }
  root.add(side_handrails);

  const roof_hooks_geom = new THREE.TorusGeometry(0.055, 0.012, 8, 18);
  const roof_hooks = new THREE.InstancedMesh(
    roof_hooks_geom,
    underframe_mat,
    4
  );
  roof_hooks.name = "roof_hooks";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-1.78, 1.78]) {
      dummy.position.set(side * 0.86, 2.23, z);
      dummy.rotation.set(0, side * Math.PI / 2, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      roof_hooks.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  roof_hooks.instanceMatrix.needsUpdate = true;
  root.add(roof_hooks);

  const glyphs = {
    Q: [
      [0.14, 0.08, 0.86, 0.08],
      [0.86, 0.08, 0.86, 0.92],
      [0.86, 0.92, 0.14, 0.92],
      [0.14, 0.92, 0.14, 0.08],
      [0.56, 0.27, 1.0, -0.08]
    ],
    U: [
      [0.14, 0.92, 0.14, 0.18],
      [0.14, 0.18, 0.3, 0.06],
      [0.3, 0.06, 0.7, 0.06],
      [0.7, 0.06, 0.86, 0.18],
      [0.86, 0.18, 0.86, 0.92]
    ],
    I: [
      [0.2, 0.92, 0.8, 0.92],
      [0.5, 0.92, 0.5, 0.08],
      [0.2, 0.08, 0.8, 0.08]
    ],
    L: [
      [0.16, 0.92, 0.16, 0.08],
      [0.16, 0.08, 0.86, 0.08]
    ],
    P: [
      [0.16, 0.08, 0.16, 0.92],
      [0.16, 0.92, 0.72, 0.92],
      [0.72, 0.92, 0.86, 0.78],
      [0.86, 0.78, 0.86, 0.58],
      [0.86, 0.58, 0.7, 0.48],
      [0.7, 0.48, 0.16, 0.48]
    ],
    S: [
      [0.84, 0.9, 0.24, 0.9],
      [0.24, 0.9, 0.14, 0.76],
      [0.14, 0.76, 0.24, 0.56],
      [0.24, 0.56, 0.76, 0.46],
      [0.76, 0.46, 0.86, 0.26],
      [0.86, 0.26, 0.74, 0.08],
      [0.74, 0.08, 0.14, 0.08]
    ],
    H: [
      [0.16, 0.08, 0.16, 0.92],
      [0.84, 0.08, 0.84, 0.92],
      [0.16, 0.5, 0.84, 0.5]
    ],
    E: [
      [0.16, 0.08, 0.16, 0.92],
      [0.16, 0.92, 0.86, 0.92],
      [0.16, 0.5, 0.74, 0.5],
      [0.16, 0.08, 0.86, 0.08]
    ],
    R: [
      [0.16, 0.08, 0.16, 0.92],
      [0.16, 0.92, 0.72, 0.92],
      [0.72, 0.92, 0.86, 0.76],
      [0.86, 0.76, 0.86, 0.58],
      [0.86, 0.58, 0.7, 0.48],
      [0.7, 0.48, 0.16, 0.48],
      [0.54, 0.48, 0.88, 0.08]
    ],
    "0": [
      [0.16, 0.08, 0.84, 0.08],
      [0.84, 0.08, 0.84, 0.92],
      [0.84, 0.92, 0.16, 0.92],
      [0.16, 0.92, 0.16, 0.08]
    ],
    "1": [
      [0.28, 0.72, 0.5, 0.92],
      [0.5, 0.92, 0.5, 0.08],
      [0.22, 0.08, 0.78, 0.08]
    ],
    "5": [
      [0.84, 0.92, 0.18, 0.92],
      [0.18, 0.92, 0.18, 0.52],
      [0.18, 0.52, 0.74, 0.52],
      [0.74, 0.52, 0.84, 0.34],
      [0.84, 0.34, 0.74, 0.08],
      [0.74, 0.08, 0.16, 0.08]
    ],
    "6": [
      [0.8, 0.9, 0.32, 0.9],
      [0.32, 0.9, 0.16, 0.68],
      [0.16, 0.68, 0.16, 0.18],
      [0.16, 0.5, 0.72, 0.5],
      [0.72, 0.5, 0.84, 0.32],
      [0.84, 0.32, 0.72, 0.08],
      [0.72, 0.08, 0.16, 0.08]
    ]
  };

  const letter_stroke_geom = new THREE.BoxGeometry(0.018, 1, 0.018);

  function create_lettering(text, height, center_y, center_z) {
    const char_width = height * 0.52;
    const gap = height * 0.14;
    const total_width =
      text.length * char_width + Math.max(0, text.length - 1) * gap;
    const strokes = [];

    for (let i = 0; i < text.length; i++) {
      const glyph = glyphs[text[i]] || [];
      const offset_z =
        -total_width / 2 + i * (char_width + gap);
      for (const segment of glyph) {
        strokes.push({
          z1: offset_z + segment[0] * char_width,
          y1: center_y + (segment[1] - 0.5) * height,
          z2: offset_z + segment[2] * char_width,
          y2: center_y + (segment[3] - 0.5) * height
        });
      }
    }

    const lettering = new THREE.InstancedMesh(
      letter_stroke_geom,
      lettering_mat,
      strokes.length * 2
    );
    let index = 0;
    for (const side of [-1, 1]) {
      for (const stroke of strokes) {
        const dz = stroke.z2 - stroke.z1;
        const dy = stroke.y2 - stroke.y1;
        const length = Math.sqrt(dz * dz + dy * dy);
        dummy.position.set(
          side * (wagon_width / 2 + 0.066),
          (stroke.y1 + stroke.y2) / 2,
          (stroke.z1 + stroke.z2) / 2
        );
        dummy.rotation.set(Math.atan2(dz, dy), 0, 0);
        dummy.scale.set(1, length, 1);
        dummy.updateMatrix();
        lettering.setMatrixAt(index++, dummy.matrix);
      }
    }
    lettering.instanceMatrix.needsUpdate = true;
    return lettering;
  }

  const quill_lettering = create_lettering("QUILL", 0.28, 1.83, 0);
  quill_lettering.name = "quill_lettering";
  root.add(quill_lettering);

  const pushier_lettering = create_lettering("PUSHIER", 0.18, 1.48, 0);
  pushier_lettering.name = "pushier_lettering";
  root.add(pushier_lettering);

  const serial_lettering = create_lettering("015615", 0.075, 1.25, 0);
  serial_lettering.name = "serial_lettering";
  root.add(serial_lettering);

  const pushier_underline = new THREE.Group();
  pushier_underline.name = "pushier_underline";
  const underline_geom = new THREE.BoxGeometry(0.018, 0.018, 0.82);
  for (const side of [-1, 1]) {
    const underline = new THREE.Mesh(underline_geom, lettering_mat);
    underline.position.set(
      side * (wagon_width / 2 + 0.066),
      1.62,
      0
    );
    pushier_underline.add(underline);
  }
  root.add(pushier_underline);

  const capacity_plates_geom = new THREE.BoxGeometry(0.018, 0.18, 0.24);
  const capacity_plates = new THREE.InstancedMesh(
    capacity_plates_geom,
    lettering_mat,
    2
  );
  capacity_plates.name = "capacity_plates";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(
      side * (wagon_width / 2 + 0.067),
      1.12,
      1.47
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    capacity_plates.setMatrixAt(i, dummy.matrix);
  }
  capacity_plates.instanceMatrix.needsUpdate = true;
  root.add(capacity_plates);

  const capacity_marks_geom = new THREE.BoxGeometry(0.012, 0.018, 0.17);
  const capacity_marks = new THREE.InstancedMesh(
    capacity_marks_geom,
    body_trim_mat,
    6
  );
  capacity_marks.name = "capacity_marks";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const y of [1.07, 1.12, 1.17]) {
      dummy.position.set(
        side * (wagon_width / 2 + 0.079),
        y,
        1.47
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      capacity_marks.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  capacity_marks.instanceMatrix.needsUpdate = true;
  root.add(capacity_marks);

  const side_oval_badges_geom = new THREE.TorusGeometry(
    0.085,
    0.012,
    8,
    24
  );
  const side_oval_badges = new THREE.InstancedMesh(
    side_oval_badges_geom,
    lettering_mat,
    2
  );
  side_oval_badges.name = "side_oval_badges";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(
      side * (wagon_width / 2 + 0.071),
      1.08,
      -1.42
    );
    dummy.rotation.set(0, side * Math.PI / 2, 0);
    dummy.scale.set(1.45, 0.62, 1);
    dummy.updateMatrix();
    side_oval_badges.setMatrixAt(i, dummy.matrix);
  }
  side_oval_badges.instanceMatrix.needsUpdate = true;
  root.add(side_oval_badges);

  const badge_marks_geom = new THREE.BoxGeometry(0.012, 0.015, 0.12);
  const badge_marks = new THREE.InstancedMesh(
    badge_marks_geom,
    lettering_mat,
    2
  );
  badge_marks.name = "badge_marks";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    dummy.position.set(
      side * (wagon_width / 2 + 0.079),
      1.08,
      -1.42
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    badge_marks.setMatrixAt(i, dummy.matrix);
  }
  badge_marks.instanceMatrix.needsUpdate = true;
  root.add(badge_marks);

  const roof_rivets_geom = new THREE.SphereGeometry(0.014, 8, 6);
  const roof_rivets = new THREE.InstancedMesh(
    roof_rivets_geom,
    silver_mat,
    16
  );
  roof_rivets.name = "roof_rivets";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 8; i++) {
      const z = -1.55 + i * 0.44;
      dummy.position.set(
        side * (wagon_width / 2 + 0.073),
        2.22,
        z
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      roof_rivets.setMatrixAt(instance_index++, dummy.matrix);
    }
  }
  roof_rivets.instanceMatrix.needsUpdate = true;
  root.add(roof_rivets);

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