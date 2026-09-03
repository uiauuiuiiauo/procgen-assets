export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_silo_cluster";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x666d72,
    metalness: 0.5,
    roughness: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x25292b,
    metalness: 0.0,
    roughness: 0.8,
  });

  const silo_bodyGeom = new THREE.CylinderGeometry(1, 1, 1, 64, 1, false);
  const horizontal_ringGeom = new THREE.TorusGeometry(1, 0.012, 6, 64);
  const roof_domeGeom = new THREE.SphereGeometry(
    1,
    48,
    12,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const roof_collarGeom = new THREE.CylinderGeometry(1.025, 1.025, 1, 64);
  const base_skirtGeom = new THREE.CylinderGeometry(1.018, 1.018, 1, 64);
  const roof_guardrailGeom = new THREE.TorusGeometry(1.085, 0.009, 6, 64);
  const vertical_barrelGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  const access_doorGeom = new THREE.BoxGeometry(0.34, 0.43, 0.025);
  const access_door_panelGeom = new THREE.BoxGeometry(0.27, 0.34, 0.018);
  const door_handleGeom = new THREE.CylinderGeometry(0.014, 0.014, 0.08, 10);
  const base_boltGeom = new THREE.SphereGeometry(0.018, 8, 6);
  const service_boxGeom = new THREE.BoxGeometry(0.16, 0.28, 0.13);
  const service_box_capGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.025, 16);
  const outlet_flangeGeom = new THREE.CylinderGeometry(0.09, 0.09, 0.035, 20);
  const outlet_pipeGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.16, 16);

  const rail_barGeom = new THREE.BoxGeometry(1, 1, 1);
  const pump_mountGeom = new THREE.BoxGeometry(0.22, 0.055, 0.24);
  const pump_bodyGeom = new THREE.CylinderGeometry(0.09, 0.115, 0.26, 20);
  const pump_capGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.035, 20);
  const pump_boltGeom = new THREE.SphereGeometry(0.014, 8, 6);

  const dummy = new THREE.Object3D();

  function addHorizontalRing(parent, name, radius, y) {
    const ring = new THREE.Mesh(horizontal_ringGeom, seamMat);
    ring.name = name;
    ring.rotation.x = Math.PI / 2;
    ring.scale.setScalar(radius);
    ring.position.y = y;
    parent.add(ring);
    return ring;
  }

  function addVerticalSeam(parent, name, x, y, height, z) {
    const seam = new THREE.Mesh(vertical_barrelGeom, seamMat);
    seam.name = name;
    seam.scale.set(1, height, 1);
    seam.position.set(x, y, z);
    parent.add(seam);
    return seam;
  }

  function addRailingSpan(parent, name, x1, z1, x2, z2, y, radius) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const length = Math.sqrt(dx * dx + dz * dz);
    const rail = new THREE.Mesh(rail_barGeom, brushedMat);
    rail.name = name;
    rail.scale.set(length, 0.018, 0.018);
    rail.rotation.y = -Math.atan2(dz, dx);
    rail.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
    parent.add(rail);
    return rail;
  }

  function addLadder(parent, name, x, z, startY, height, rungs) {
    const ladder = new THREE.Group();
    ladder.name = name;
    ladder.position.set(x, startY, z);

    const left_rail = new THREE.Mesh(vertical_barrelGeom, brushedMat);
    left_rail.name = name + "_left_rail";
    left_rail.scale.set(1, height, 1);
    left_rail.position.set(-0.065, height / 2, 0);
    ladder.add(left_rail);

    const right_rail = new THREE.Mesh(vertical_barrelGeom, brushedMat);
    right_rail.name = name + "_right_rail";
    right_rail.scale.set(1, height, 1);
    right_rail.position.set(0.065, height / 2, 0);
    ladder.add(right_rail);

    const ladder_rungs = new THREE.InstancedMesh(
      rail_barGeom,
      brushedMat,
      rungs
    );
    ladder_rungs.name = name + "_rungs";
    ladder_rungs.frustumCulled = false;

    for (let i = 0; i < rungs; i++) {
      const y = 0.1 + (height - 0.2) * (i / (rungs - 1));
      dummy.position.set(0, y, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.18, 0.014, 0.028);
      dummy.updateMatrix();
      ladder_rungs.setMatrixAt(i, dummy.matrix);
    }
    ladder_rungs.instanceMatrix.needsUpdate = true;
    ladder.add(ladder_rungs);

    parent.add(ladder);
    return ladder;
  }

  function addAccessDoor(parent, name, x, y, z, radius) {
    const door = new THREE.Group();
    door.name = name;
    door.position.set(x, y, z);

    const door_frame = new THREE.Mesh(access_doorGeom, seamMat);
    door_frame.name = name + "_frame";
    door.add(door_frame);

    const door_panel = new THREE.Mesh(access_door_panelGeom, silverMat);
    door_panel.name = name + "_panel";
    door_panel.position.z = 0.025;
    door.add(door_panel);

    const door_handle = new THREE.Mesh(door_handleGeom, brushedMat);
    door_handle.name = name + "_handle";
    door_handle.rotation.z = Math.PI / 2;
    door_handle.position.set(0.095, 0, 0.055);
    door.add(door_handle);

    door.position.y -= 0.04;
    const angle = Math.asin(Math.max(-0.9, Math.min(0.9, x / radius)));
    door.rotation.y = angle;
    parent.add(door);
    return door;
  }

  function addServiceBox(parent, name, x, y, z) {
    const service_box = new THREE.Group();
    service_box.name = name;
    service_box.position.set(x, y, z);

    const service_box_body = new THREE.Mesh(service_boxGeom, brushedMat);
    service_box_body.name = name + "_body";
    service_box.add(service_box_body);

    const service_box_cap = new THREE.Mesh(service_box_capGeom, silverMat);
    service_box_cap.name = name + "_cap";
    service_box_cap.position.y = 0.152;
    service_box.add(service_box_cap);

    parent.add(service_box);
    return service_box;
  }

  function addOutlet(parent, name, x, y, z, radius) {
    const outlet = new THREE.Group();
    outlet.name = name;
    outlet.position.set(x, y, z);

    const angle = Math.asin(Math.max(-0.9, Math.min(0.9, x / radius)));
    outlet.rotation.y = angle;

    const outlet_flange = new THREE.Mesh(outlet_flangeGeom, seamMat);
    outlet_flange.name = name + "_flange";
    outlet_flange.rotation.x = Math.PI / 2;
    outlet_flange.position.z = 0.018;
    outlet.add(outlet_flange);

    const outlet_pipe = new THREE.Mesh(outlet_pipeGeom, brushedMat);
    outlet_pipe.name = name + "_pipe";
    outlet_pipe.rotation.x = Math.PI / 2;
    outlet_pipe.position.z = 0.105;
    outlet.add(outlet_pipe);

    parent.add(outlet);
    return outlet;
  }

  function addPump(parent, name, x, z, tankY) {
    const pump = new THREE.Group();
    pump.name = name;
    pump.position.set(x, 0, z);

    const pump_mount = new THREE.Mesh(pump_mountGeom, seamMat);
    pump_mount.name = name + "_mount";
    pump_mount.position.y = 0.0275;
    pump.add(pump_mount);

    const pump_body = new THREE.Mesh(pump_bodyGeom, brushedMat);
    pump_body.name = name + "_body";
    pump_body.position.y = 0.18;
    pump.add(pump_body);

    const pump_cap = new THREE.Mesh(pump_capGeom, silverMat);
    pump_cap.name = name + "_cap";
    pump_cap.position.y = 0.327;
    pump.add(pump_cap);

    const pump_bolts = new THREE.InstancedMesh(
      pump_boltGeom,
      seamMat,
      4
    );
    pump_bolts.name = name + "_bolts";
    pump_bolts.frustumCulled = false;
    for (let i = 0; i < 4; i++) {
      const angle = i / 4 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * 0.105,
        tankY + 0.07,
        Math.sin(angle) * 0.105
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      pump_bolts.setMatrixAt(i, dummy.matrix);
    }
    pump_bolts.instanceMatrix.needsUpdate = true;
    pump.add(pump_bolts);

    parent.add(pump);
    return pump;
  }

  function addTankPipe(parent, name, points, radius) {
    const path = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal",
      0.5
    );
    const pipeGeom = new THREE.TubeGeometry(
      path,
      28,
      radius,
      8,
      false
    );
    const pipe = new THREE.Mesh(pipeGeom, brushedMat);
    pipe.name = name;
    parent.add(pipe);
    return pipe;
  }

  function addTank(parent, name, x, z, radius, height) {
    const tank = new THREE.Group();
    tank.name = name;
    tank.position.set(x, 0, z);
    tank.userData.radius = radius;
    tank.userData.height = height;

    const body = new THREE.Mesh(silo_bodyGeom, silverMat);
    body.name = name + "_body";
    body.scale.set(radius, height, radius);
    body.position.y = height / 2;
    tank.add(body);

    const base_skirt = new THREE.Mesh(base_skirtGeom, brushedMat);
    base_skirt.name = name + "_base_skirt";
    base_skirt.scale.set(radius, 0.075, radius);
    base_skirt.position.y = 0.0375;
    tank.add(base_skirt);

    const base_ring = addHorizontalRing(
      tank,
      name + "_base_ring",
      radius * 1.018,
      0.075
    );
    base_ring.name = name + "_base_ring";

    const roof_collar = new THREE.Mesh(roof_collarGeom, brushedMat);
    roof_collar.name = name + "_roof_collar";
    roof_collar.scale.set(radius, 0.11, radius);
    roof_collar.position.y = height + 0.055;
    tank.add(roof_collar);

    const roof_dome = new THREE.Mesh(roof_domeGeom, silverMat);
    roof_dome.name = name + "_roof_dome";
    roof_dome.scale.set(radius * 0.985, 0.065, radius * 0.985);
    roof_dome.position.y = height + 0.105;
    tank.add(roof_dome);

    const roof_seam_ring = addHorizontalRing(
      tank,
      name + "_roof_seam_ring",
      radius * 1.025,
      height + 0.055
    );
    roof_seam_ring.name = name + "_roof_seam_ring";

    const roof_outer_ring = addHorizontalRing(
      tank,
      name + "_roof_outer_ring",
      radius * 1.025,
      height + 0.108
    );
    roof_outer_ring.name = name + "_roof_outer_ring";

    const roof_guardrail = new THREE.Mesh(roof_guardrailGeom, brushedMat);
    roof_guardrail.name = name + "_roof_guardrail";
    roof_guardrail.rotation.x = Math.PI / 2;
    roof_guardrail.scale.setScalar(radius);
    roof_guardrail.position.y = height + 0.205;
    tank.add(roof_guardrail);

    const body_seam_rings = new THREE.InstancedMesh(
      horizontal_ringGeom,
      seamMat,
      8
    );
    body_seam_rings.name = name + "_body_seam_rings";
    body_seam_rings.frustumCulled = false;

    for (let i = 0; i < 8; i++) {
      const y = height * (i + 1) / 9;
      dummy.position.set(0, y, 0);
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.scale.setScalar(radius * 1.006);
      dummy.updateMatrix();
      body_seam_rings.setMatrixAt(i, dummy.matrix);
    }
    body_seam_rings.instanceMatrix.needsUpdate = true;
    tank.add(body_seam_rings);

    const vertical_panel_seams = new THREE.InstancedMesh(
      vertical_barrelGeom,
      seamMat,
      4
    );
    vertical_panel_seams.name = name + "_vertical_panel_seams";
    vertical_panel_seams.frustumCulled = false;

    for (let i = 0; i < 4; i++) {
      const angle = Math.PI / 4 + i * Math.PI / 2;
      dummy.position.set(
        Math.cos(angle) * radius * 1.006,
        height / 2,
        Math.sin(angle) * radius * 1.006
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, height * 0.94, 1);
      dummy.updateMatrix();
      vertical_panel_seams.setMatrixAt(i, dummy.matrix);
    }
    vertical_panel_seams.instanceMatrix.needsUpdate = true;
    tank.add(vertical_panel_seams);

    const roof_bolts = new THREE.InstancedMesh(
      base_boltGeom,
      seamMat,
      12
    );
    roof_bolts.name = name + "_roof_bolts";
    roof_bolts.frustumCulled = false;

    for (let i = 0; i < 12; i++) {
      const angle = i / 12 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * radius * 1.035,
        height + 0.085,
        Math.sin(angle) * radius * 1.035
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      roof_bolts.setMatrixAt(i, dummy.matrix);
    }
    roof_bolts.instanceMatrix.needsUpdate = true;
    tank.add(roof_bolts);

    const base_bolts = new THREE.InstancedMesh(
      base_boltGeom,
      seamMat,
      10
    );
    base_bolts.name = name + "_base_bolts";
    base_bolts.frustumCulled = false;

    for (let i = 0; i < 10; i++) {
      const angle = i / 10 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * radius * 1.025,
        0.105,
        Math.sin(angle) * radius * 1.025
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      base_bolts.setMatrixAt(i, dummy.matrix);
    }
    base_bolts.instanceMatrix.needsUpdate = true;
    tank.add(base_bolts);

    const roof_railing_posts = new THREE.InstancedMesh(
      vertical_barrelGeom,
      brushedMat,
      12
    );
    roof_railing_posts.name = name + "_roof_railing_posts";
    roof_railing_posts.frustumCulled = false;

    for (let i = 0; i < 12; i++) {
      const angle = i / 12 * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * radius * 1.085,
        height + 0.145,
        Math.sin(angle) * radius * 1.085
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 0.13, 1);
      dummy.updateMatrix();
      roof_railing_posts.setMatrixAt(i, dummy.matrix);
    }
    roof_railing_posts.instanceMatrix.needsUpdate = true;
    tank.add(roof_railing_posts);

    const roof_front_rail = addRailingSpan(
      tank,
      name + "_roof_front_rail",
      -radius * 0.82,
      radius * 0.57,
      radius * 0.82,
      radius * 0.57,
      height + 0.16,
      0.012
    );
    roof_front_rail.name = name + "_roof_front_rail";

    parent.add(tank);
    return tank;
  }

  const left_rear_tank = addTank(
    root,
    "left_rear_tank",
    -1.62,
    -0.38,
    0.55,
    4.25
  );
  const left_rear_radius = left_rear_tank.userData.radius;
  const left_rear_height = left_rear_tank.userData.height;

  const left_front_tank = addTank(
    root,
    "left_front_tank",
    -0.82,
    0.34,
    0.63,
    4.55
  );
  const left_front_radius = left_front_tank.userData.radius;
  const left_front_height = left_front_tank.userData.height;

  const center_tank = addTank(
    root,
    "center_tank",
    0.18,
    0.52,
    0.66,
    4.8
  );
  const center_radius = center_tank.userData.radius;
  const center_height = center_tank.userData.height;

  const right_front_tank = addTank(
    root,
    "right_front_tank",
    1.22,
    0.34,
    0.63,
    4.65
  );
  const right_front_radius = right_front_tank.userData.radius;
  const right_front_height = right_front_tank.userData.height;

  const right_rear_tank = addTank(
    root,
    "right_rear_tank",
    2.05,
    -0.38,
    0.55,
    4.35
  );
  const right_rear_radius = right_rear_tank.userData.radius;
  const right_rear_height = right_rear_tank.userData.height;

  const left_rear_vertical_seam = addVerticalSeam(
    left_rear_tank,
    "left_rear_vertical_seam",
    -left_rear_radius * 0.72,
    left_rear_height / 2,
    left_rear_height * 0.94,
    Math.sqrt(
      left_rear_radius * left_rear_radius -
      left_rear_radius * left_rear_radius * 0.72 * 0.72
    ) + 0.008
  );
  left_rear_vertical_seam.name = "left_rear_vertical_seam";

  const left_front_vertical_seam = addVerticalSeam(
    left_front_tank,
    "left_front_vertical_seam",
    -left_front_radius * 0.72,
    left_front_height / 2,
    left_front_height * 0.94,
    Math.sqrt(
      left_front_radius * left_front_radius -
      left_front_radius * left_front_radius * 0.72 * 0.72
    ) + 0.008
  );
  left_front_vertical_seam.name = "left_front_vertical_seam";

  const center_vertical_seam = addVerticalSeam(
    center_tank,
    "center_vertical_seam",
    -center_radius * 0.72,
    center_height / 2,
    center_height * 0.94,
    Math.sqrt(
      center_radius * center_radius -
      center_radius * center_radius * 0.72 * 0.72
    ) + 0.008
  );
  center_vertical_seam.name = "center_vertical_seam";

  const right_front_vertical_seam = addVerticalSeam(
    right_front_tank,
    "right_front_vertical_seam",
    right_front_radius * 0.72,
    right_front_height / 2,
    right_front_height * 0.94,
    Math.sqrt(
      right_front_radius * right_front_radius -
      right_front_radius * right_front_radius * 0.72 * 0.72
    ) + 0.008
  );
  right_front_vertical_seam.name = "right_front_vertical_seam";

  const right_rear_vertical_seam = addVerticalSeam(
    right_rear_tank,
    "right_rear_vertical_seam",
    right_rear_radius * 0.72,
    right_rear_height / 2,
    right_rear_height * 0.94,
    Math.sqrt(
      right_rear_radius * right_rear_radius -
      right_rear_radius * right_rear_radius * 0.72 * 0.72
    ) + 0.008
  );
  right_rear_vertical_seam.name = "right_rear_vertical_seam";

  const left_rear_roof_hatchGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.045,
    20
  );
  const left_rear_roof_hatch = new THREE.Mesh(
    left_rear_roof_hatchGeom,
    brushedMat
  );
  left_rear_roof_hatch.name = "left_rear_roof_hatch";
  left_rear_roof_hatch.position.y = left_rear_height + 0.165;
  left_rear_tank.add(left_rear_roof_hatch);

  const left_front_roof_hatchGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.045,
    20
  );
  const left_front_roof_hatch = new THREE.Mesh(
    left_front_roof_hatchGeom,
    brushedMat
  );
  left_front_roof_hatch.name = "left_front_roof_hatch";
  left_front_roof_hatch.position.y = left_front_height + 0.165;
  left_front_tank.add(left_front_roof_hatch);

  const center_roof_hatchGeom = new THREE.CylinderGeometry(
    0.08,
    0.08,
    0.045,
    20
  );
  const center_roof_hatch = new THREE.Mesh(
    center_roof_hatchGeom,
    brushedMat
  );
  center_roof_hatch.name = "center_roof_hatch";
  center_roof_hatch.position.y = center_height + 0.165;
  center_tank.add(center_roof_hatch);

  const right_front_roof_hatchGeom = new THREE.CylinderGeometry(
    0.08,
    0.08,
    0.045,
    20
  );
  const right_front_roof_hatch = new THREE.Mesh(
    right_front_roof_hatchGeom,
    brushedMat
  );
  right_front_roof_hatch.name = "right_front_roof_hatch";
  right_front_roof_hatch.position.y = right_front_height + 0.165;
  right_front_tank.add(right_front_roof_hatch);

  const right_rear_roof_hatchGeom = new THREE.CylinderGeometry(
    0.075,
    0.075,
    0.045,
    20
  );
  const right_rear_roof_hatch = new THREE.Mesh(
    right_rear_roof_hatchGeom,
    brushedMat
  );
  right_rear_roof_hatch.name = "right_rear_roof_hatch";
  right_rear_roof_hatch.position.y = right_rear_height + 0.165;
  right_rear_tank.add(right_rear_roof_hatch);

  const left_rear_ladder = addLadder(
    left_rear_tank,
    "left_rear_ladder",
    left_rear_radius * 0.76,
    Math.sqrt(
      left_rear_radius * left_rear_radius -
      left_rear_radius * left_rear_radius * 0.76 * 0.76
    ) + 0.025,
    0.12,
    left_rear_height - 0.2,
    21
  );
  left_rear_ladder.name = "left_rear_ladder";

  const left_front_ladder = addLadder(
    left_front_tank,
    "left_front_ladder",
    -left_front_radius * 0.8,
    Math.sqrt(
      left_front_radius * left_front_radius -
      left_front_radius * left_front_radius * 0.8 * 0.8
    ) + 0.025,
    0.12,
    left_front_height - 0.2,
    22
  );
  left_front_ladder.name = "left_front_ladder";

  const center_ladder = addLadder(
    center_tank,
    "center_ladder",
    -center_radius * 0.82,
    Math.sqrt(
      center_radius * center_radius -
      center_radius * center_radius * 0.82 * 0.82
    ) + 0.025,
    0.12,
    center_height - 0.2,
    23
  );
  center_ladder.name = "center_ladder";

  const right_front_ladder = addLadder(
    right_front_tank,
    "right_front_ladder",
    right_front_radius * 0.8,
    Math.sqrt(
      right_front_radius * right_front_radius -
      right_front_radius * right_front_radius * 0.8 * 0.8
    ) + 0.025,
    0.12,
    right_front_height - 0.2,
    23
  );
  right_front_ladder.name = "right_front_ladder";

  const right_rear_ladder = addLadder(
    right_rear_tank,
    "right_rear_ladder",
    right_rear_radius * 0.78,
    Math.sqrt(
      right_rear_radius * right_rear_radius -
      right_rear_radius * right_rear_radius * 0.78 * 0.78
    ) + 0.025,
    0.12,
    right_rear_height - 0.2,
    22
  );
  right_rear_ladder.name = "right_rear_ladder";

  const left_rear_access_door = addAccessDoor(
    left_rear_tank,
    "left_rear_access_door",
    0.1,
    0.31,
    left_rear_radius + 0.015,
    left_rear_radius
  );
  left_rear_access_door.name = "left_rear_access_door";

  const left_front_access_door = addAccessDoor(
    left_front_tank,
    "left_front_access_door",
    -0.12,
    0.31,
    left_front_radius + 0.015,
    left_front_radius
  );
  left_front_access_door.name = "left_front_access_door";

  const center_access_door = addAccessDoor(
    center_tank,
    "center_access_door",
    0.08,
    0.31,
    center_radius + 0.015,
    center_radius
  );
  center_access_door.name = "center_access_door";

  const right_front_access_door = addAccessDoor(
    right_front_tank,
    "right_front_access_door",
    -0.1,
    0.31,
    right_front_radius + 0.015,
    right_front_radius
  );
  right_front_access_door.name = "right_front_access_door";

  const right_rear_access_door = addAccessDoor(
    right_rear_tank,
    "right_rear_access_door",
    -0.08,
    0.31,
    right_rear_radius + 0.015,
    right_rear_radius
  );
  right_rear_access_door.name = "right_rear_access_door";

  const left_rear_service_box = addServiceBox(
    left_rear_tank,
    "left_rear_service_box",
    -0.22,
    0.15,
    left_rear_radius + 0.07
  );
  left_rear_service_box.name = "left_rear_service_box";

  const left_front_service_box = addServiceBox(
    left_front_tank,
    "left_front_service_box",
    0.24,
    0.15,
    left_front_radius + 0.07
  );
  left_front_service_box.name = "left_front_service_box";

  const center_service_box = addServiceBox(
    center_tank,
    "center_service_box",
    -0.25,
    0.15,
    center_radius + 0.07
  );
  center_service_box.name = "center_service_box";

  const right_front_service_box = addServiceBox(
    right_front_tank,
    "right_front_service_box",
    0.24,
    0.15,
    right_front_radius + 0.07
  );
  right_front_service_box.name = "right_front_service_box";

  const right_rear_service_box = addServiceBox(
    right_rear_tank,
    "right_rear_service_box",
    0.2,
    0.15,
    right_rear_radius + 0.07
  );
  right_rear_service_box.name = "right_rear_service_box";

  const left_rear_outlet = addOutlet(
    left_rear_tank,
    "left_rear_outlet",
    0.26,
    0.25,
    left_rear_radius + 0.01,
    left_rear_radius
  );
  left_rear_outlet.name = "left_rear_outlet";

  const left_front_outlet = addOutlet(
    left_front_tank,
    "left_front_outlet",
    0.28,
    0.25,
    left_front_radius + 0.01,
    left_front_radius
  );
  left_front_outlet.name = "left_front_outlet";

  const center_outlet = addOutlet(
    center_tank,
    "center_outlet",
    0.3,
    0.25,
    center_radius + 0.01,
    center_radius
  );
  center_outlet.name = "center_outlet";

  const right_front_outlet = addOutlet(
    right_front_tank,
    "right_front_outlet",
    -0.28,
    0.25,
    right_front_radius + 0.01,
    right_front_radius
  );
  right_front_outlet.name = "right_front_outlet";

  const right_rear_outlet = addOutlet(
    right_rear_tank,
    "right_rear_outlet",
    -0.24,
    0.25,
    right_rear_radius + 0.01,
    right_rear_radius
  );
  right_rear_outlet.name = "right_rear_outlet";

  const left_rear_pump = addPump(
    left_rear_tank,
    "left_rear_pump",
    -0.18,
    left_rear_radius + 0.14,
    left_rear_height
  );
  left_rear_pump.name = "left_rear_pump";

  const left_front_pump = addPump(
    left_front_tank,
    "left_front_pump",
    0.18,
    left_front_radius + 0.14,
    left_front_height
  );
  left_front_pump.name = "left_front_pump";

  const center_pump = addPump(
    center_tank,
    "center_pump",
    -0.18,
    center_radius + 0.14,
    center_height
  );
  center_pump.name = "center_pump";

  const right_front_pump = addPump(
    right_front_tank,
    "right_front_pump",
    0.18,
    right_front_radius + 0.14,
    right_front_height
  );
  right_front_pump.name = "right_front_pump";

  const right_rear_pump = addPump(
    right_rear_tank,
    "right_rear_pump",
    -0.16,
    right_rear_radius + 0.14,
    right_rear_height
  );
  right_rear_pump.name = "right_rear_pump";

  const left_transfer_pipe = addTankPipe(
    root,
    "left_transfer_pipe",
    [
      new THREE.Vector3(-1.5, 4.39, -0.38),
      new THREE.Vector3(-1.47, 4.57, -0.38),
      new THREE.Vector3(-1.25, 4.63, -0.31),
      new THREE.Vector3(-1.02, 4.61, -0.18),
      new THREE.Vector3(-0.82, 4.69, 0.34),
    ],
    0.035
  );
  left_transfer_pipe.name = "left_transfer_pipe";

  const center_transfer_pipe = addTankPipe(
    root,
    "center_transfer_pipe",
    [
      new THREE.Vector3(0.18, 4.94, 0.52),
      new THREE.Vector3(0.18, 5.13, 0.52),
      new THREE.Vector3(0.35, 5.16, 0.5),
      new THREE.Vector3(0.58, 5.08, 0.46),
      new THREE.Vector3(0.78, 4.82, 0.4),
    ],
    0.038
  );
  center_transfer_pipe.name = "center_transfer_pipe";

  const right_transfer_pipe = addTankPipe(
    root,
    "right_transfer_pipe",
    [
      new THREE.Vector3(1.22, 4.79, 0.34),
      new THREE.Vector3(1.22, 4.99, 0.34),
      new THREE.Vector3(1.39, 5.02, 0.32),
      new THREE.Vector3(1.62, 4.94, 0.12),
      new THREE.Vector3(1.84, 4.55, -0.28),
      new THREE.Vector3(2.05, 4.49, -0.38),
    ],
    0.036
  );
  right_transfer_pipe.name = "right_transfer_pipe";

  const left_feed_pipe = addTankPipe(
    root,
    "left_feed_pipe",
    [
      new THREE.Vector3(-0.82, 4.69, 0.34),
      new THREE.Vector3(-0.7, 4.83, 0.35),
      new THREE.Vector3(-0.47, 4.88, 0.42),
      new THREE.Vector3(-0.24, 4.86, 0.49),
      new THREE.Vector3(0.18, 4.94, 0.52),
    ],
    0.032
  );
  left_feed_pipe.name = "left_feed_pipe";

  const right_feed_pipe = addTankPipe(
    root,
    "right_feed_pipe",
    [
      new THREE.Vector3(0.18, 4.94, 0.52),
      new THREE.Vector3(0.48, 4.98, 0.51),
      new THREE.Vector3(0.77, 4.92, 0.45),
      new THREE.Vector3(1.02, 4.78, 0.38),
      new THREE.Vector3(1.22, 4.79, 0.34),
    ],
    0.032
  );
  right_feed_pipe.name = "right_feed_pipe";

  const lower_return_pipe = addTankPipe(
    root,
    "lower_return_pipe",
    [
      new THREE.Vector3(-1.62, 0.46, -0.05),
      new THREE.Vector3(-1.35, 0.46, 0.15),
      new THREE.Vector3(-1.08, 0.46, 0.62),
      new THREE.Vector3(-0.82, 0.46, 0.78),
      new THREE.Vector3(-0.55, 0.46, 0.72),
      new THREE.Vector3(0.18, 0.46, 0.98),
    ],
    0.027
  );
  lower_return_pipe.name = "lower_return_pipe";

  const inter_tank_return_pipe = addTankPipe(
    root,
    "inter_tank_return_pipe",
    [
      new THREE.Vector3(0.18, 0.42, 0.98),
      new THREE.Vector3(0.5, 0.42, 0.92),
      new THREE.Vector3(0.78, 0.42, 0.8),
      new THREE.Vector3(1.22, 0.42, 0.87),
      new THREE.Vector3(1.65, 0.42, 0.67),
      new THREE.Vector3(2.05, 0.42, 0.08),
    ],
    0.027
  );
  inter_tank_return_pipe.name = "inter_tank_return_pipe";

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}