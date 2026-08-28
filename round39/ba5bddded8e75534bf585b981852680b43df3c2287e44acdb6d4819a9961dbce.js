export default function generate(THREE) {
  const root = new THREE.Group();

  const aircraft_length = 5.4;
  const aircraft_width = 6.4;
  const aircraft_height = 2.5;
  const body_bottom = -0.65;
  const wheel_r = 0.32;
  const front_z = aircraft_length * 0.5;
  const rear_z = -aircraft_length * 0.47;

  const airframe_mat = new THREE.MeshStandardMaterial({
    color: 0xf2f3f1,
    metalness: 0.0,
    roughness: 0.3
  });
  const window_frame_mat = new THREE.MeshStandardMaterial({
    color: 0x171a1b,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });
  const window_glass_mat = new THREE.MeshPhysicalMaterial({
    color: 0x52616a,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.45,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide
  });
  const wingstripe_mat = new THREE.MeshStandardMaterial({
    color: 0x25282a,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const rubber_mat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8
  });
  const silver_mat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const propeller_mat = new THREE.MeshStandardMaterial({
    color: 0x292b2d,
    metalness: 0.0,
    roughness: 0.8
  });
  const orange_mat = new THREE.MeshStandardMaterial({
    color: 0xe88922,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_mat = new THREE.MeshStandardMaterial({
    color: 0xc81018,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const seam_mat = new THREE.MeshStandardMaterial({
    color: 0x74787a,
    metalness: 0.0,
    roughness: 0.7
  });
  const hub_mat = new THREE.MeshStandardMaterial({
    color: 0x9ec8c5,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_light_mat = new THREE.MeshStandardMaterial({
    color: 0xff2435,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff2435,
    emissiveIntensity: 1.0
  });
  const green_light_mat = new THREE.MeshStandardMaterial({
    color: 0x36dd78,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x36dd78,
    emissiveIntensity: 1.0
  });

  function make_tube(start, end, radius, material) {
    const path = new THREE.LineCurve3(start, end);
    return new THREE.Mesh(
      new THREE.TubeGeometry(path, 4, radius, 8, false),
      material
    );
  }

  function make_rounded_rect_shape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = width * 0.5;
    const y = height * 0.5;
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.closePath();
    return shape;
  }

  function make_trapezoid_shape(bottom_width, top_width, height) {
    const shape = new THREE.Shape();
    shape.moveTo(-bottom_width * 0.5, -height * 0.5);
    shape.lineTo(bottom_width * 0.5, -height * 0.5);
    shape.lineTo(top_width * 0.5, height * 0.5);
    shape.lineTo(-top_width * 0.5, height * 0.5);
    shape.closePath();
    return shape;
  }

  const fuselage_profile = [
    new THREE.Vector2(0.00, rear_z),
    new THREE.Vector2(0.12, -2.43),
    new THREE.Vector2(0.27, -2.18),
    new THREE.Vector2(0.40, -1.78),
    new THREE.Vector2(0.51, -1.24),
    new THREE.Vector2(0.61, -0.62),
    new THREE.Vector2(0.67, 0.10),
    new THREE.Vector2(0.69, 0.72),
    new THREE.Vector2(0.67, 1.22),
    new THREE.Vector2(0.61, 1.62),
    new THREE.Vector2(0.54, 1.94),
    new THREE.Vector2(0.48, 2.20),
    new THREE.Vector2(0.45, front_z)
  ];
  const fuselage_geom = new THREE.LatheGeometry(fuselage_profile, 48);
  const fuselage = new THREE.Mesh(fuselage_geom, airframe_mat);
  fuselage.rotation.x = Math.PI / 2;
  fuselage.scale.set(1, 1, 0.9);
  root.add(fuselage);

  const right_wing_shape = new THREE.Shape();
  right_wing_shape.moveTo(0.20, -0.82);
  right_wing_shape.lineTo(3.04, -0.30);
  right_wing_shape.quadraticCurveTo(3.22, -0.25, 3.18, -0.06);
  right_wing_shape.quadraticCurveTo(3.15, 0.10, 2.96, 0.16);
  right_wing_shape.lineTo(0.22, 0.84);
  right_wing_shape.closePath();

  const right_wing_geom = new THREE.ExtrudeGeometry(right_wing_shape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2
  });
  const right_wing = new THREE.Mesh(right_wing_geom, airframe_mat);
  right_wing.rotation.x = Math.PI / 2;
  right_wing.position.y = -0.17;
  root.add(right_wing);

  const left_wing_geom = right_wing_geom;
  const left_wing = new THREE.Mesh(left_wing_geom, airframe_mat);
  left_wing.rotation.x = Math.PI / 2;
  left_wing.scale.x = -1;
  left_wing.position.y = -0.17;
  root.add(left_wing);

  const right_wing_leading_stripe_shape = new THREE.Shape();
  right_wing_leading_stripe_shape.moveTo(0.30, 0.80);
  right_wing_leading_stripe_shape.lineTo(2.94, 0.145);
  right_wing_leading_stripe_shape.lineTo(2.70, 0.045);
  right_wing_leading_stripe_shape.lineTo(0.42, 0.67);
  right_wing_leading_stripe_shape.closePath();
  const right_wing_leading_stripe_geom = new THREE.ShapeGeometry(right_wing_leading_stripe_shape);
  const right_wing_leading_stripe = new THREE.Mesh(right_wing_leading_stripe_geom, wingstripe_mat);
  right_wing_leading_stripe.rotation.x = Math.PI / 2;
  right_wing_leading_stripe.position.y = -0.137;
  root.add(right_wing_leading_stripe);

  const left_wing_leading_stripe_geom = right_wing_leading_stripe_geom;
  const left_wing_leading_stripe = new THREE.Mesh(left_wing_leading_stripe_geom, wingstripe_mat);
  left_wing_leading_stripe.rotation.x = Math.PI / 2;
  left_wing_leading_stripe.scale.x = -1;
  left_wing_leading_stripe.position.y = -0.137;
  root.add(left_wing_leading_stripe);

  const right_aileron_seam = make_tube(
    new THREE.Vector3(1.18, -0.126, -0.57),
    new THREE.Vector3(2.86, -0.126, -0.255),
    0.009,
    seam_mat
  );
  root.add(right_aileron_seam);

  const left_aileron_seam = make_tube(
    new THREE.Vector3(-1.18, -0.126, -0.57),
    new THREE.Vector3(-2.86, -0.126, -0.255),
    0.009,
    seam_mat
  );
  root.add(left_aileron_seam);

  const wing_logo_ring_geom = new THREE.RingGeometry(0.105, 0.145, 28);
  const wing_logo_ring = new THREE.Mesh(wing_logo_ring_geom, wingstripe_mat);
  wing_logo_ring.rotation.x = Math.PI / 2;
  wing_logo_ring.scale.set(1.55, 0.72, 1);
  wing_logo_ring.position.set(2.18, -0.126, -0.10);
  root.add(wing_logo_ring);

  const wing_logo_bar_geom = new THREE.BoxGeometry(0.50, 0.012, 0.055);
  const wing_logo_bar = new THREE.Mesh(wing_logo_bar_geom, wingstripe_mat);
  wing_logo_bar.position.set(2.18, -0.123, -0.10);
  wing_logo_bar.rotation.y = -0.32;
  root.add(wing_logo_bar);

  const right_horizontal_stabilizer_shape = new THREE.Shape();
  right_horizontal_stabilizer_shape.moveTo(0.08, -2.31);
  right_horizontal_stabilizer_shape.lineTo(1.20, -2.21);
  right_horizontal_stabilizer_shape.quadraticCurveTo(1.34, -2.17, 1.27, -2.02);
  right_horizontal_stabilizer_shape.lineTo(0.10, -1.68);
  right_horizontal_stabilizer_shape.closePath();
  const right_horizontal_stabilizer_geom = new THREE.ExtrudeGeometry(
    right_horizontal_stabilizer_shape,
    {
      depth: 0.08,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 2
    }
  );
  const right_horizontal_stabilizer = new THREE.Mesh(
    right_horizontal_stabilizer_geom,
    airframe_mat
  );
  right_horizontal_stabilizer.rotation.x = Math.PI / 2;
  right_horizontal_stabilizer.position.y = 0.18;
  root.add(right_horizontal_stabilizer);

  const left_horizontal_stabilizer_geom = right_horizontal_stabilizer_geom;
  const left_horizontal_stabilizer = new THREE.Mesh(
    left_horizontal_stabilizer_geom,
    airframe_mat
  );
  left_horizontal_stabilizer.rotation.x = Math.PI / 2;
  left_horizontal_stabilizer.scale.x = -1;
  left_horizontal_stabilizer.position.y = 0.18;
  root.add(left_horizontal_stabilizer);

  const vertical_stabilizer_shape = new THREE.Shape();
  vertical_stabilizer_shape.moveTo(rear_z - 0.01, 0.04);
  vertical_stabilizer_shape.bezierCurveTo(
    -2.46, 0.46,
    -2.43, 1.20,
    -2.14, 1.43
  );
  vertical_stabilizer_shape.bezierCurveTo(
    -1.94, 1.59,
    -1.72, 1.48,
    -1.56, 1.22
  );
  vertical_stabilizer_shape.bezierCurveTo(
    -1.35, 0.89,
    -1.16, 0.58,
    -0.91, 0.43
  );
  vertical_stabilizer_shape.lineTo(-1.24, 0.20);
  vertical_stabilizer_shape.lineTo(-2.18, 0.16);
  vertical_stabilizer_shape.closePath();
  const vertical_stabilizer_geom = new THREE.ExtrudeGeometry(
    vertical_stabilizer_shape,
    {
      depth: 0.14,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 2
    }
  );
  const vertical_stabilizer = new THREE.Mesh(vertical_stabilizer_geom, airframe_mat);
  vertical_stabilizer.rotation.y = -Math.PI / 2;
  vertical_stabilizer.position.x = 0.07;
  root.add(vertical_stabilizer);

  const rudder_seam = make_tube(
    new THREE.Vector3(0.083, 0.25, -2.22),
    new THREE.Vector3(0.083, 1.34, -2.18),
    0.009,
    seam_mat
  );
  root.add(rudder_seam);

  const cabin_roof_geom = new THREE.SphereGeometry(1, 32, 16);
  const cabin_roof = new THREE.Mesh(cabin_roof_geom, airframe_mat);
  cabin_roof.scale.set(0.59, 0.18, 1.12);
  cabin_roof.position.set(0, 0.49, 0.64);
  root.add(cabin_roof);

  const passenger_window_frame_geom = new THREE.ShapeGeometry(
    make_rounded_rect_shape(0.46, 0.39, 0.055)
  );
  const passenger_window_frames = new THREE.InstancedMesh(
    passenger_window_frame_geom,
    window_frame_mat,
    8
  );
  const passenger_window_glass_geom = new THREE.ShapeGeometry(
    make_rounded_rect_shape(0.385, 0.315, 0.043)
  );
  const passenger_window_glass = new THREE.InstancedMesh(
    passenger_window_glass_geom,
    window_glass_mat,
    8
  );
  const passenger_window_z = [-0.62, -0.08, 0.46, 1.00];
  const y_axis = new THREE.Vector3(0, 1, 0);
  const unit_scale = new THREE.Vector3(1, 1, 1);
  let passenger_window_index = 0;

  for (const side of [-1, 1]) {
    for (const z of passenger_window_z) {
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        y_axis,
        side * Math.PI / 2
      );
      const frame_matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.655, 0.20, z),
        quaternion,
        unit_scale
      );
      const glass_matrix = new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.662, 0.20, z),
        quaternion,
        unit_scale
      );
      passenger_window_frames.setMatrixAt(passenger_window_index, frame_matrix);
      passenger_window_glass.setMatrixAt(passenger_window_index, glass_matrix);
      passenger_window_index++;
    }
  }
  passenger_window_frames.instanceMatrix.needsUpdate = true;
  passenger_window_glass.instanceMatrix.needsUpdate = true;
  root.add(passenger_window_frames, passenger_window_glass);

  const cockpit_window_frame_geom = new THREE.ShapeGeometry(
    make_trapezoid_shape(0.34, 0.28, 0.40)
  );
  const cockpit_window_frames = new THREE.InstancedMesh(
    cockpit_window_frame_geom,
    window_frame_mat,
    2
  );
  const cockpit_window_glass_geom = new THREE.ShapeGeometry(
    make_trapezoid_shape(0.285, 0.235, 0.335)
  );
  const cockpit_window_glass = new THREE.InstancedMesh(
    cockpit_window_glass_geom,
    window_glass_mat,
    2
  );

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      y_axis,
      side * Math.PI / 2
    );
    cockpit_window_frames.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.625, 0.23, 1.49),
        quaternion,
        unit_scale
      )
    );
    cockpit_window_glass.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.633, 0.23, 1.49),
        quaternion,
        unit_scale
      )
    );
  }
  cockpit_window_frames.instanceMatrix.needsUpdate = true;
  cockpit_window_glass.instanceMatrix.needsUpdate = true;
  root.add(cockpit_window_frames, cockpit_window_glass);

  const front_windshield_frame_geom = new THREE.PlaneGeometry(0.73, 0.43);
  const front_windshield_frame = new THREE.Mesh(
    front_windshield_frame_geom,
    window_frame_mat
  );
  front_windshield_frame.rotation.x = -0.34;
  front_windshield_frame.position.set(0, 0.28, 1.84);
  root.add(front_windshield_frame);

  const front_windshield_geom = new THREE.PlaneGeometry(0.655, 0.355);
  const front_windshield = new THREE.Mesh(front_windshield_geom, window_glass_mat);
  front_windshield.rotation.x = -0.34;
  front_windshield.position.set(0, 0.284, 1.849);
  root.add(front_windshield);

  const windshield_center_bar_geom = new THREE.BoxGeometry(0.035, 0.39, 0.025);
  const windshield_center_bar = new THREE.Mesh(
    windshield_center_bar_geom,
    airframe_mat
  );
  windshield_center_bar.rotation.x = -0.34;
  windshield_center_bar.position.set(0, 0.282, 1.865);
  root.add(windshield_center_bar);

  const engine_cowling_geom = new THREE.CylinderGeometry(0.49, 0.57, 1.05, 40);
  const engine_cowling = new THREE.Mesh(engine_cowling_geom, airframe_mat);
  engine_cowling.rotation.x = Math.PI / 2;
  engine_cowling.position.z = 2.05;
  root.add(engine_cowling);

  const cowling_seam_geom = new THREE.TorusGeometry(0.535, 0.009, 8, 40);
  const cowling_seam = new THREE.Mesh(cowling_seam_geom, seam_mat);
  cowling_seam.position.z = 1.73;
  root.add(cowling_seam);

  const exhaust_stubs_geom = new THREE.CylinderGeometry(0.042, 0.052, 0.17, 12);
  const exhaust_stubs = new THREE.InstancedMesh(
    exhaust_stubs_geom,
    brushed_metal_mat,
    8
  );
  const exhaust_openings_geom = new THREE.CylinderGeometry(0.029, 0.029, 0.012, 12);
  const exhaust_openings = new THREE.InstancedMesh(
    exhaust_openings_geom,
    propeller_mat,
    8
  );
  const exhaust_quaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  let exhaust_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = 1.86 + i * 0.15;
      exhaust_stubs.setMatrixAt(
        exhaust_index,
        new THREE.Matrix4().compose(
          new THREE.Vector3(side * 0.555, 0.015, z),
          exhaust_quaternion,
          unit_scale
        )
      );
      exhaust_openings.setMatrixAt(
        exhaust_index,
        new THREE.Matrix4().compose(
          new THREE.Vector3(side * 0.646, 0.015, z),
          exhaust_quaternion,
          unit_scale
        )
      );
      exhaust_index++;
    }
  }
  exhaust_stubs.instanceMatrix.needsUpdate = true;
  exhaust_openings.instanceMatrix.needsUpdate = true;
  root.add(exhaust_stubs, exhaust_openings);

  const cowling_vent_geom = new THREE.BoxGeometry(0.014, 0.13, 0.18);
  const cowling_vents = new THREE.InstancedMesh(cowling_vent_geom, seam_mat, 2);
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    cowling_vents.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.545, -0.18, 1.78),
        new THREE.Quaternion(),
        unit_scale
      )
    );
  }
  cowling_vents.instanceMatrix.needsUpdate = true;
  root.add(cowling_vents);

  const propeller_blade_shape = new THREE.Shape();
  propeller_blade_shape.moveTo(-0.055, 0.18);
  propeller_blade_shape.bezierCurveTo(-0.11, 0.48, -0.16, 0.92, -0.095, 1.18);
  propeller_blade_shape.quadraticCurveTo(-0.045, 1.29, 0.018, 1.27);
  propeller_blade_shape.quadraticCurveTo(0.080, 1.23, 0.078, 1.12);
  propeller_blade_shape.bezierCurveTo(0.075, 0.77, 0.105, 0.43, 0.055, 0.18);
  propeller_blade_shape.closePath();

  const propeller_blades_geom = new THREE.ExtrudeGeometry(
    propeller_blade_shape,
    {
      depth: 0.045,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 1
    }
  );
  const propeller_blades = new THREE.InstancedMesh(
    propeller_blades_geom,
    propeller_mat,
    3
  );
  const propeller_tip_shape = new THREE.Shape();
  propeller_tip_shape.moveTo(-0.10, 1.075);
  propeller_tip_shape.bezierCurveTo(-0.10, 1.17, -0.055, 1.28, 0.015, 1.285);
  propeller_tip_shape.bezierCurveTo(0.070, 1.27, 0.085, 1.18, 0.075, 1.085);
  propeller_tip_shape.closePath();
  const propeller_tips_geom = new THREE.ExtrudeGeometry(propeller_tip_shape, {
    depth: 0.052,
    steps: 1,
    bevelEnabled: false
  });
  const propeller_tips = new THREE.InstancedMesh(
    propeller_tips_geom,
    orange_mat,
    3
  );

  for (let i = 0; i < 3; i++) {
    const angle = 0.12 + i * Math.PI * 2 / 3;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      angle
    );
    propeller_blades.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(0, 0, 2.59),
        quaternion,
        unit_scale
      )
    );
    propeller_tips.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(0, 0, 2.60),
        quaternion,
        unit_scale
      )
    );
  }
  propeller_blades.instanceMatrix.needsUpdate = true;
  propeller_tips.instanceMatrix.needsUpdate = true;
  root.add(propeller_blades, propeller_tips);

  const propeller_hub_geom = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 28);
  const propeller_hub = new THREE.Mesh(propeller_hub_geom, brushed_metal_mat);
  propeller_hub.rotation.x = Math.PI / 2;
  propeller_hub.position.z = 2.65;
  root.add(propeller_hub);

  const spinner_geom = new THREE.ConeGeometry(0.235, 0.48, 32);
  const spinner = new THREE.Mesh(spinner_geom, airframe_mat);
  spinner.rotation.x = Math.PI / 2;
  spinner.position.z = 2.84;
  root.add(spinner);

  const radio_antenna = make_tube(
    new THREE.Vector3(0, 0.64, 0.18),
    new THREE.Vector3(0, 1.00, -0.02),
    0.012,
    silver_mat
  );
  root.add(radio_antenna);

  const main_tire_geom = new THREE.TorusGeometry(
    wheel_r - 0.105,
    0.105,
    14,
    32
  );
  const main_tires = new THREE.InstancedMesh(main_tire_geom, rubber_mat, 2);
  const main_hub_geom = new THREE.CylinderGeometry(0.135, 0.135, 0.18, 24);
  const main_hubs = new THREE.InstancedMesh(main_hub_geom, hub_mat, 2);
  const main_wheel_quaternion = new THREE.Quaternion().setFromAxisAngle(
    y_axis,
    Math.PI / 2
  );
  const main_hub_quaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    Math.PI / 2
  );

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    main_tires.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 1.22, -0.79, 0.38),
        main_wheel_quaternion,
        unit_scale
      )
    );
    main_hubs.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 1.22, -0.79, 0.38),
        main_hub_quaternion,
        unit_scale
      )
    );
  }
  main_tires.instanceMatrix.needsUpdate = true;
  main_hubs.instanceMatrix.needsUpdate = true;
  root.add(main_tires, main_hubs);

  const left_main_strut = make_tube(
    new THREE.Vector3(-0.67, -0.39, 0.34),
    new THREE.Vector3(-1.22, -0.70, 0.38),
    0.035,
    silver_mat
  );
  const right_main_strut = make_tube(
    new THREE.Vector3(0.67, -0.39, 0.34),
    new THREE.Vector3(1.22, -0.70, 0.38),
    0.035,
    silver_mat
  );
  const left_main_brace = make_tube(
    new THREE.Vector3(-0.84, -0.42, 0.02),
    new THREE.Vector3(-1.22, -0.69, 0.38),
    0.024,
    silver_mat
  );
  const right_main_brace = make_tube(
    new THREE.Vector3(0.84, -0.42, 0.02),
    new THREE.Vector3(1.22, -0.69, 0.38),
    0.024,
    silver_mat
  );
  root.add(left_main_strut, right_main_strut, left_main_brace, right_main_brace);

  const main_gear_door_geom = new THREE.BoxGeometry(0.13, 0.38, 0.035);
  const main_gear_doors = new THREE.InstancedMesh(
    main_gear_door_geom,
    airframe_mat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    main_gear_doors.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.95, -0.51, 0.36),
        new THREE.Quaternion(),
        unit_scale
      )
    );
  }
  main_gear_doors.instanceMatrix.needsUpdate = true;
  root.add(main_gear_doors);

  const tail_tire_geom = new THREE.TorusGeometry(0.095, 0.055, 12, 26);
  const tail_tire = new THREE.Mesh(tail_tire_geom, rubber_mat);
  tail_tire.rotation.y = Math.PI / 2;
  tail_tire.position.set(0, -0.84, -1.72);
  root.add(tail_tire);

  const tail_hub_geom = new THREE.CylinderGeometry(0.055, 0.055, 0.11, 18);
  const tail_hub = new THREE.Mesh(tail_hub_geom, hub_mat);
  tail_hub.rotation.z = Math.PI / 2;
  tail_hub.position.set(0, -0.84, -1.72);
  root.add(tail_hub);

  const tail_gear_strut = make_tube(
    new THREE.Vector3(0, -0.38, -1.56),
    new THREE.Vector3(0, -0.78, -1.70),
    0.027,
    silver_mat
  );
  const tail_gear_brace = make_tube(
    new THREE.Vector3(0, -0.37, -1.90),
    new THREE.Vector3(0, -0.77, -1.70),
    0.021,
    silver_mat
  );
  root.add(tail_gear_strut, tail_gear_brace);

  const fuselage_red_marking_geom = new THREE.PlaneGeometry(0.25, 0.12);
  const fuselage_red_markings = new THREE.InstancedMesh(
    fuselage_red_marking_geom,
    red_mat,
    6
  );
  const red_marking_z = [-1.30, -1.06, -0.82];
  const red_marking_scale = [
    new THREE.Vector3(1.0, 1.0, 1),
    new THREE.Vector3(0.62, 0.82, 1),
    new THREE.Vector3(1.45, 0.72, 1)
  ];
  let red_marking_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < red_marking_z.length; i++) {
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        y_axis,
        side * Math.PI / 2
      );
      fuselage_red_markings.setMatrixAt(
        red_marking_index,
        new THREE.Matrix4().compose(
          new THREE.Vector3(side * 0.555, 0.015, red_marking_z[i]),
          quaternion,
          red_marking_scale[i]
        )
      );
      red_marking_index++;
    }
  }
  fuselage_red_markings.instanceMatrix.needsUpdate = true;
  root.add(fuselage_red_markings);

  const left_wingtip_light_geom = new THREE.SphereGeometry(0.045, 14, 8);
  const left_wingtip_light = new THREE.Mesh(
    left_wingtip_light_geom,
    red_light_mat
  );
  left_wingtip_light.position.set(-3.10, -0.17, -0.13);
  root.add(left_wingtip_light);

  const right_wingtip_light_geom = left_wingtip_light_geom;
  const right_wingtip_light = new THREE.Mesh(
    right_wingtip_light_geom,
    green_light_mat
  );
  right_wingtip_light.position.set(3.10, -0.17, -0.13);
  root.add(right_wingtip_light);

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