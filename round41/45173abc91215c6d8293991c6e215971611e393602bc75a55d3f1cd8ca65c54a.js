export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "railway_freight_wagon";

  const wagon_length = 3.55;
  const wagon_width = 1.34;
  const body_bottom = 0.78;
  const body_height = 1.30;
  const body_center_y = body_bottom + body_height / 2;
  const roof_width = 1.58;
  const roof_length = 3.88;
  const roof_y = 2.18;
  const wheel_radius = 0.44;
  const wheel_y = 0.38;
  const wheel_x = 0.76;
  const axle_positions = [-1.18, 1.18];

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x5a4637,
    metalness: 0.0,
    roughness: 0.7
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x624d3d,
    metalness: 0.0,
    roughness: 0.7
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x3f3128,
    metalness: 0.0,
    roughness: 0.7
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x737772,
    metalness: 0.6,
    roughness: 0.5
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x202323,
    metalness: 0.6,
    roughness: 0.5
  });
  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x292c2c,
    metalness: 0.6,
    roughness: 0.5
  });
  const wheelRimMat = new THREE.MeshStandardMaterial({
    color: 0x9b8668,
    metalness: 0.6,
    roughness: 0.5
  });
  const hardwareMat = new THREE.MeshStandardMaterial({
    color: 0x555956,
    metalness: 0.6,
    roughness: 0.5
  });
  const letteringMat = new THREE.MeshStandardMaterial({
    color: 0xd8bd68,
    metalness: 0.0,
    roughness: 0.7
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xd9c45d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const darkLabelMat = new THREE.MeshStandardMaterial({
    color: 0x302820,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const instance_dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    instance_dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const cargo_bodyGeom = new THREE.BoxGeometry(
    wagon_width,
    body_height,
    wagon_length
  );
  const cargo_body = new THREE.Mesh(cargo_bodyGeom, bodyMat);
  cargo_body.name = "cargo_body";
  cargo_body.position.set(0, body_center_y, 0);
  root.add(cargo_body);

  const sidePanelGeom = new THREE.BoxGeometry(0.025, 1.16, 0.66);
  const side_panels = new THREE.InstancedMesh(sidePanelGeom, panelMat, 8);
  side_panels.name = "side_panels";
  const panel_positions = [-1.35, -0.66, 0.66, 1.35];
  let instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of panel_positions) {
      setInstance(
        side_panels,
        instance_index++,
        side * (wagon_width / 2 + 0.012),
        body_center_y,
        z
      );
    }
  }
  side_panels.instanceMatrix.needsUpdate = true;
  root.add(side_panels);

  const doorGeom = new THREE.BoxGeometry(0.032, 1.18, 0.66);
  const side_doors = new THREE.InstancedMesh(doorGeom, panelMat, 2);
  side_doors.name = "side_doors";
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    setInstance(
      side_doors,
      i,
      side * (wagon_width / 2 + 0.015),
      body_center_y + 0.01,
      0
    );
  }
  side_doors.instanceMatrix.needsUpdate = true;
  root.add(side_doors);

  const verticalRibGeom = new THREE.BoxGeometry(0.055, 1.34, 0.065);
  const vertical_ribs = new THREE.InstancedMesh(verticalRibGeom, trimMat, 10);
  vertical_ribs.name = "vertical_ribs";
  const rib_positions = [-1.72, -1.02, -0.33, 0.33, 1.72];
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of rib_positions) {
      setInstance(
        vertical_ribs,
        instance_index++,
        side * (wagon_width / 2 + 0.035),
        body_center_y,
        z
      );
    }
  }
  vertical_ribs.instanceMatrix.needsUpdate = true;
  root.add(vertical_ribs);

  const horizontalRailGeom = new THREE.BoxGeometry(0.055, 0.07, 3.48);
  const horizontal_rails = new THREE.InstancedMesh(
    horizontalRailGeom,
    trimMat,
    4
  );
  horizontal_rails.name = "horizontal_rails";
  instance_index = 0;
  for (const side of [-1, 1]) {
    setInstance(
      horizontal_rails,
      instance_index++,
      side * (wagon_width / 2 + 0.035),
      0.82,
      0
    );
    setInstance(
      horizontal_rails,
      instance_index++,
      side * (wagon_width / 2 + 0.035),
      2.04,
      0
    );
  }
  horizontal_rails.instanceMatrix.needsUpdate = true;
  root.add(horizontal_rails);

  const endRibGeom = new THREE.BoxGeometry(0.06, 1.34, 0.055);
  const end_ribs = new THREE.InstancedMesh(endRibGeom, trimMat, 6);
  end_ribs.name = "end_ribs";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const x of [-0.48, 0, 0.48]) {
      setInstance(
        end_ribs,
        instance_index++,
        x,
        body_center_y,
        end * (wagon_length / 2 + 0.025)
      );
    }
  }
  end_ribs.instanceMatrix.needsUpdate = true;
  root.add(end_ribs);

  const endRailGeom = new THREE.BoxGeometry(1.34, 0.07, 0.055);
  const end_rails = new THREE.InstancedMesh(endRailGeom, trimMat, 4);
  end_rails.name = "end_rails";
  instance_index = 0;
  for (const end of [-1, 1]) {
    setInstance(
      end_rails,
      instance_index++,
      0,
      0.82,
      end * (wagon_length / 2 + 0.025)
    );
    setInstance(
      end_rails,
      instance_index++,
      0,
      2.04,
      end * (wagon_length / 2 + 0.025)
    );
  }
  end_rails.instanceMatrix.needsUpdate = true;
  root.add(end_rails);

  const doorSeamGeom = new THREE.BoxGeometry(0.014, 1.12, 0.018);
  const door_seams = new THREE.InstancedMesh(doorSeamGeom, trimMat, 4);
  door_seams.name = "door_seams";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.315, 0.315]) {
      setInstance(
        door_seams,
        instance_index++,
        side * (wagon_width / 2 + 0.043),
        body_center_y,
        z
      );
    }
  }
  door_seams.instanceMatrix.needsUpdate = true;
  root.add(door_seams);

  const hingeGeom = new THREE.BoxGeometry(0.065, 0.10, 0.075);
  const door_hinges = new THREE.InstancedMesh(hingeGeom, hardwareMat, 8);
  door_hinges.name = "door_hinges";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.29, 0.29]) {
      for (const y of [1.10, 1.72]) {
        setInstance(
          door_hinges,
          instance_index++,
          side * (wagon_width / 2 + 0.065),
          y,
          z
        );
      }
    }
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  root.add(door_hinges);

  const doorLatchGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.04, 16);
  const door_latches = new THREE.InstancedMesh(
    doorLatchGeom,
    hardwareMat,
    2
  );
  door_latches.name = "door_latches";
  setInstance(
    door_latches,
    0,
    -(wagon_width / 2 + 0.07),
    1.48,
    0.26,
    0,
    0,
    Math.PI / 2
  );
  setInstance(
    door_latches,
    1,
    wagon_width / 2 + 0.07,
    1.48,
    0.26,
    0,
    0,
    Math.PI / 2
  );
  door_latches.instanceMatrix.needsUpdate = true;
  root.add(door_latches);

  const roofShape = new THREE.Shape();
  roofShape.moveTo(-roof_length / 2, -0.07);
  roofShape.lineTo(-roof_length / 2 + 0.07, 0);
  roofShape.lineTo(-roof_length / 2 + 0.22, 0.075);
  roofShape.lineTo(roof_length / 2 - 0.22, 0.075);
  roofShape.lineTo(roof_length / 2 - 0.07, 0);
  roofShape.lineTo(roof_length / 2, -0.07);
  roofShape.lineTo(-roof_length / 2, -0.07);

  const roofGeom = new THREE.ExtrudeGeometry(roofShape, {
    depth: roof_width,
    steps: 1,
    bevelEnabled: false
  });
  const roof = new THREE.Mesh(roofGeom, roofMat);
  roof.name = "roof";
  roof.rotation.y = Math.PI / 2;
  roof.position.set(-roof_width / 2, roof_y, 0);
  root.add(roof);

  const roofEdgeGeom = new THREE.BoxGeometry(0.075, 0.075, roof_length);
  const roof_edges = new THREE.InstancedMesh(roofEdgeGeom, roofMat, 2);
  roof_edges.name = "roof_edges";
  setInstance(roof_edges, 0, -roof_width / 2 + 0.025, roof_y - 0.055, 0);
  setInstance(roof_edges, 1, roof_width / 2 - 0.025, roof_y - 0.055, 0);
  roof_edges.instanceMatrix.needsUpdate = true;
  root.add(roof_edges);

  const chassisGeom = new THREE.BoxGeometry(1.50, 0.18, 3.95);
  const chassis = new THREE.Mesh(chassisGeom, frameMat);
  chassis.name = "chassis";
  chassis.position.set(0, 0.69, 0);
  root.add(chassis);

  const sideBeamGeom = new THREE.BoxGeometry(0.11, 0.22, 3.82);
  const side_beams = new THREE.InstancedMesh(sideBeamGeom, frameMat, 2);
  side_beams.name = "side_beams";
  setInstance(side_beams, 0, -0.69, 0.68, 0);
  setInstance(side_beams, 1, 0.69, 0.68, 0);
  side_beams.instanceMatrix.needsUpdate = true;
  root.add(side_beams);

  const bufferBeamGeom = new THREE.BoxGeometry(1.56, 0.22, 0.16);
  const buffer_beams = new THREE.InstancedMesh(bufferBeamGeom, frameMat, 2);
  buffer_beams.name = "buffer_beams";
  setInstance(buffer_beams, 0, 0, 0.67, -1.96);
  setInstance(buffer_beams, 1, 0, 0.67, 1.96);
  buffer_beams.instanceMatrix.needsUpdate = true;
  root.add(buffer_beams);

  const axleGeom = new THREE.CylinderGeometry(0.065, 0.065, 1.64, 12);
  const axles = new THREE.InstancedMesh(axleGeom, wheelMat, 2);
  axles.name = "axles";
  for (let i = 0; i < axle_positions.length; i++) {
    setInstance(
      axles,
      i,
      0,
      wheel_y,
      axle_positions[i],
      0,
      0,
      Math.PI / 2
    );
  }
  axles.instanceMatrix.needsUpdate = true;
  root.add(axles);

  const wheelDiscGeom = new THREE.CylinderGeometry(
    wheel_radius,
    wheel_radius,
    0.16,
    32
  );
  const wheel_discs = new THREE.InstancedMesh(wheelDiscGeom, wheelMat, 4);
  wheel_discs.name = "wheel_discs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      setInstance(
        wheel_discs,
        instance_index++,
        side * wheel_x,
        wheel_y,
        z,
        0,
        0,
        Math.PI / 2
      );
    }
  }
  wheel_discs.instanceMatrix.needsUpdate = true;
  root.add(wheel_discs);

  const wheelRimGeom = new THREE.TorusGeometry(0.375, 0.055, 10, 32);
  const wheel_rims = new THREE.InstancedMesh(wheelRimGeom, wheelRimMat, 4);
  wheel_rims.name = "wheel_rims";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      setInstance(
        wheel_rims,
        instance_index++,
        side * (wheel_x + 0.085),
        wheel_y,
        z,
        0,
        Math.PI / 2,
        0
      );
    }
  }
  wheel_rims.instanceMatrix.needsUpdate = true;
  root.add(wheel_rims);

  const wheelHubGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.20, 16);
  const wheel_hubs = new THREE.InstancedMesh(wheelHubGeom, wheelMat, 4);
  wheel_hubs.name = "wheel_hubs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      setInstance(
        wheel_hubs,
        instance_index++,
        side * (wheel_x + 0.04),
        wheel_y,
        z,
        0,
        0,
        Math.PI / 2
      );
    }
  }
  wheel_hubs.instanceMatrix.needsUpdate = true;
  root.add(wheel_hubs);

  const hubCapGeom = new THREE.CylinderGeometry(0.085, 0.085, 0.04, 12);
  const hub_caps = new THREE.InstancedMesh(hubCapGeom, hardwareMat, 4);
  hub_caps.name = "hub_caps";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      setInstance(
        hub_caps,
        instance_index++,
        side * (wheel_x + 0.13),
        wheel_y,
        z,
        0,
        0,
        Math.PI / 2
      );
    }
  }
  hub_caps.instanceMatrix.needsUpdate = true;
  root.add(hub_caps);

  const spokeGeom = new THREE.BoxGeometry(0.045, 0.27, 0.065);
  const wheel_spokes = new THREE.InstancedMesh(spokeGeom, wheelMat, 24);
  wheel_spokes.name = "wheel_spokes";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      for (let i = 0; i < 6; i++) {
        const angle = i / 6 * Math.PI * 2;
        const radial_offset = 0.21;
        setInstance(
          wheel_spokes,
          instance_index++,
          side * (wheel_x + 0.11),
          wheel_y + Math.cos(angle) * radial_offset,
          z + Math.sin(angle) * radial_offset,
          angle,
          0,
          0
        );
      }
    }
  }
  wheel_spokes.instanceMatrix.needsUpdate = true;
  root.add(wheel_spokes);

  const springPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.00, -0.42),
    new THREE.Vector3(0, 0.08, -0.22),
    new THREE.Vector3(0, 0.12, 0.00),
    new THREE.Vector3(0, 0.08, 0.22),
    new THREE.Vector3(0, 0.00, 0.42)
  ]);
  const springGeom = new THREE.TubeGeometry(
    springPath,
    20,
    0.045,
    8,
    false
  );
  const leaf_springs = new THREE.InstancedMesh(springGeom, wheelMat, 4);
  leaf_springs.name = "leaf_springs";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      setInstance(
        leaf_springs,
        instance_index++,
        side * 0.77,
        0.79,
        z
      );
    }
  }
  leaf_springs.instanceMatrix.needsUpdate = true;
  root.add(leaf_springs);

  const springHangerGeom = new THREE.BoxGeometry(0.08, 0.25, 0.08);
  const spring_hangers = new THREE.InstancedMesh(
    springHangerGeom,
    wheelMat,
    8
  );
  spring_hangers.name = "spring_hangers";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of axle_positions) {
      for (const dz of [-0.42, 0.42]) {
        setInstance(
          spring_hangers,
          instance_index++,
          side * 0.77,
          0.72,
          z + dz
        );
      }
    }
  }
  spring_hangers.instanceMatrix.needsUpdate = true;
  root.add(spring_hangers);

  const brakeRodGeom = new THREE.CylinderGeometry(0.032, 0.032, 2.45, 10);
  const brake_rod = new THREE.Mesh(brakeRodGeom, frameMat);
  brake_rod.name = "brake_rod";
  brake_rod.rotation.x = Math.PI / 2;
  brake_rod.position.set(0, 0.48, 0);
  root.add(brake_rod);

  const brakeBoxGeom = new THREE.BoxGeometry(0.28, 0.20, 0.34);
  const brake_box = new THREE.Mesh(brakeBoxGeom, frameMat);
  brake_box.name = "brake_box";
  brake_box.position.set(0, 0.42, 0.10);
  root.add(brake_box);

  const brakeWheelGeom = new THREE.TorusGeometry(0.18, 0.035, 8, 24);
  const brake_wheel = new THREE.Mesh(brakeWheelGeom, frameMat);
  brake_wheel.name = "brake_wheel";
  brake_wheel.rotation.y = Math.PI / 2;
  brake_wheel.position.set(0.18, 0.43, -0.42);
  root.add(brake_wheel);

  const bufferStemGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.30, 14);
  const buffer_stems = new THREE.InstancedMesh(bufferStemGeom, frameMat, 4);
  buffer_stems.name = "buffer_stems";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const x of [-0.48, 0.48]) {
      setInstance(
        buffer_stems,
        instance_index++,
        x,
        0.68,
        end * 2.12,
        Math.PI / 2,
        0,
        0
      );
    }
  }
  buffer_stems.instanceMatrix.needsUpdate = true;
  root.add(buffer_stems);

  const bufferHeadGeom = new THREE.CylinderGeometry(0.13, 0.13, 0.065, 20);
  const buffer_heads = new THREE.InstancedMesh(bufferHeadGeom, frameMat, 4);
  buffer_heads.name = "buffer_heads";
  instance_index = 0;
  for (const end of [-1, 1]) {
    for (const x of [-0.48, 0.48]) {
      setInstance(
        buffer_heads,
        instance_index++,
        x,
        0.68,
        end * 2.29,
        Math.PI / 2,
        0,
        0
      );
    }
  }
  buffer_heads.instanceMatrix.needsUpdate = true;
  root.add(buffer_heads);

  const couplerStemGeom = new THREE.BoxGeometry(0.09, 0.09, 0.48);
  const coupler_stems = new THREE.InstancedMesh(couplerStemGeom, frameMat, 2);
  coupler_stems.name = "coupler_stems";
  setInstance(coupler_stems, 0, 0, 0.55, -2.16);
  setInstance(coupler_stems, 1, 0, 0.55, 2.16);
  coupler_stems.instanceMatrix.needsUpdate = true;
  root.add(coupler_stems);

  const couplerHookGeom = new THREE.TorusGeometry(
    0.12,
    0.035,
    8,
    20,
    Math.PI * 1.55
  );
  const coupler_hooks = new THREE.InstancedMesh(
    couplerHookGeom,
    frameMat,
    2
  );
  coupler_hooks.name = "coupler_hooks";
  setInstance(
    coupler_hooks,
    0,
    0,
    0.52,
    -2.43,
    0,
    Math.PI / 2,
    0.25
  );
  setInstance(
    coupler_hooks,
    1,
    0,
    0.52,
    2.43,
    0,
    -Math.PI / 2,
    -0.25
  );
  coupler_hooks.instanceMatrix.needsUpdate = true;
  root.add(coupler_hooks);

  const stepGeom = new THREE.BoxGeometry(0.32, 0.045, 0.34);
  const underframe_steps = new THREE.InstancedMesh(stepGeom, frameMat, 2);
  underframe_steps.name = "underframe_steps";
  setInstance(underframe_steps, 0, -0.72, 0.54, 0);
  setInstance(underframe_steps, 1, 0.72, 0.54, 0);
  underframe_steps.instanceMatrix.needsUpdate = true;
  root.add(underframe_steps);

  const stepHangerGeom = new THREE.BoxGeometry(0.045, 0.18, 0.045);
  const step_hangers = new THREE.InstancedMesh(stepHangerGeom, frameMat, 4);
  step_hangers.name = "step_hangers";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.13, 0.13]) {
      setInstance(
        step_hangers,
        instance_index++,
        side * 0.70,
        0.63,
        z
      );
    }
  }
  step_hangers.instanceMatrix.needsUpdate = true;
  root.add(step_hangers);

  const endPlatformGeom = new THREE.BoxGeometry(1.24, 0.07, 0.32);
  const end_platforms = new THREE.InstancedMesh(endPlatformGeom, frameMat, 2);
  end_platforms.name = "end_platforms";
  setInstance(end_platforms, 0, 0, 0.77, -1.76);
  setInstance(end_platforms, 1, 0, 0.77, 1.76);
  end_platforms.instanceMatrix.needsUpdate = true;
  root.add(end_platforms);

  const handrailPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.00, 0.00),
    new THREE.Vector3(0, 0.18, 0.00),
    new THREE.Vector3(0, 0.36, 0.00),
    new THREE.Vector3(0, 0.42, 0.08),
    new THREE.Vector3(0, 0.42, 0.20),
    new THREE.Vector3(0, 0.34, 0.28)
  ]);
  const handrailGeom = new THREE.TubeGeometry(
    handrailPath,
    20,
    0.025,
    8,
    false
  );
  const end_handrails = new THREE.InstancedMesh(handrailGeom, frameMat, 4);
  end_handrails.name = "end_handrails";
  setInstance(end_handrails, 0, -0.56, 0.72, -1.78);
  setInstance(
    end_handrails,
    1,
    0.56,
    0.72,
    -1.78,
    0,
    Math.PI,
    0
  );
  setInstance(end_handrails, 2, -0.56, 0.72, 1.78);
  setInstance(
    end_handrails,
    3,
    0.56,
    0.72,
    1.78,
    0,
    Math.PI,
    0
  );
  end_handrails.instanceMatrix.needsUpdate = true;
  root.add(end_handrails);

  const glyphs = {
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    N: ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
    Q: ["01110", "10001", "10001", "10001", "10101", "10010", "01101"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
    "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
    "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"]
  };

  const letter_cells = [];

  function addBitmapLine(text, center_z, center_y, cell_size) {
    const total_width = (text.length * 6 - 1) * cell_size;
    for (const side of [-1, 1]) {
      for (let c = 0; c < text.length; c++) {
        const glyph = glyphs[text[c]];
        if (!glyph) {
          continue;
        }
        for (let row = 0; row < 7; row++) {
          for (let col = 0; col < 5; col++) {
            if (glyph[row][col] === "1") {
              const horizontal =
                (c * 6 + col + 0.5) * cell_size - total_width / 2;
              letter_cells.push({
                side: side,
                z: center_z - side * horizontal,
                y: center_y + (3 - row) * cell_size,
                size: cell_size
              });
            }
          }
        }
      }
    }
  }

  addBitmapLine("QUILL", 0, 1.72, 0.034);
  addBitmapLine("PUSHIER", 0, 1.40, 0.025);
  addBitmapLine("10001", 0, 1.18, 0.017);

  const letteringGeom = new THREE.BoxGeometry(0.018, 1, 1);
  const side_lettering = new THREE.InstancedMesh(
    letteringGeom,
    letteringMat,
    letter_cells.length
  );
  side_lettering.name = "side_lettering";
  for (let i = 0; i < letter_cells.length; i++) {
    const cell = letter_cells[i];
    setInstance(
      side_lettering,
      i,
      cell.side * (wagon_width / 2 + 0.055),
      cell.y,
      cell.z,
      0,
      0,
      0,
      1,
      cell.size * 0.82,
      cell.size * 0.82
    );
  }
  side_lettering.instanceMatrix.needsUpdate = true;
  root.add(side_lettering);

  const warningLabelGeom = new THREE.PlaneGeometry(0.22, 0.17);
  const warning_labels = new THREE.InstancedMesh(
    warningLabelGeom,
    labelMat,
    2
  );
  warning_labels.name = "warning_labels";
  setInstance(
    warning_labels,
    0,
    -(wagon_width / 2 + 0.055),
    1.05,
    1.48,
    0,
    -Math.PI / 2,
    0
  );
  setInstance(
    warning_labels,
    1,
    wagon_width / 2 + 0.055,
    1.05,
    1.48,
    0,
    Math.PI / 2,
    0
  );
  warning_labels.instanceMatrix.needsUpdate = true;
  root.add(warning_labels);

  const warningMarkGeom = new THREE.BoxGeometry(0.012, 0.018, 0.13);
  const warning_marks = new THREE.InstancedMesh(
    warningMarkGeom,
    darkLabelMat,
    6
  );
  warning_marks.name = "warning_marks";
  instance_index = 0;
  for (const side of [-1, 1]) {
    for (const y of [0.99, 1.05, 1.11]) {
      setInstance(
        warning_marks,
        instance_index++,
        side * (wagon_width / 2 + 0.061),
        y,
        1.48
      );
    }
  }
  warning_marks.instanceMatrix.needsUpdate = true;
  root.add(warning_marks);

  const makerPlateGeom = new THREE.CircleGeometry(1, 24);
  const maker_plates = new THREE.InstancedMesh(
    makerPlateGeom,
    labelMat,
    2
  );
  maker_plates.name = "maker_plates";
  setInstance(
    maker_plates,
    0,
    -(wagon_width / 2 + 0.056),
    1.02,
    -1.42,
    0,
    -Math.PI / 2,
    0,
    0.16,
    0.055,
    1
  );
  setInstance(
    maker_plates,
    1,
    wagon_width / 2 + 0.056,
    1.02,
    -1.42,
    0,
    Math.PI / 2,
    0,
    0.16,
    0.055,
    1
  );
  maker_plates.instanceMatrix.needsUpdate = true;
  root.add(maker_plates);

  const makerInsetGeom = new THREE.CircleGeometry(1, 24);
  const maker_insets = new THREE.InstancedMesh(
    makerInsetGeom,
    darkLabelMat,
    2
  );
  maker_insets.name = "maker_insets";
  setInstance(
    maker_insets,
    0,
    -(wagon_width / 2 + 0.061),
    1.02,
    -1.42,
    0,
    -Math.PI / 2,
    0,
    0.13,
    0.035,
    1
  );
  setInstance(
    maker_insets,
    1,
    wagon_width / 2 + 0.061,
    1.02,
    -1.42,
    0,
    Math.PI / 2,
    0,
    0.13,
    0.035,
    1
  );
  maker_insets.instanceMatrix.needsUpdate = true;
  root.add(maker_insets);

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