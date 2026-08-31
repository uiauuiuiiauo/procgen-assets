export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_silo_cluster";

  const silo_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polished_trimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_serviceMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const left_silo = new THREE.Group();
  left_silo.name = "left_silo";
  left_silo.position.set(-1.48, 0, -0.12);

  const left_center_silo = new THREE.Group();
  left_center_silo.name = "left_center_silo";
  left_center_silo.position.set(-0.49, 0, 0.04);

  const center_silo = new THREE.Group();
  center_silo.name = "center_silo";
  center_silo.position.set(0.5, 0, 0.2);

  const right_center_silo = new THREE.Group();
  right_center_silo.name = "right_center_silo";
  right_center_silo.position.set(1.49, 0, 0.04);

  const right_silo = new THREE.Group();
  right_silo.name = "right_silo";
  right_silo.position.set(2.48, 0, -0.12);

  root.add(
    left_silo,
    left_center_silo,
    center_silo,
    right_center_silo,
    right_silo
  );

  const siloRadius = 0.45;
  const siloHeight = 3.4;
  const roofRadius = 0.47;
  const rimHeight = 0.16;

  const silo_bodyGeom = new THREE.CylinderGeometry(
    siloRadius,
    siloRadius,
    siloHeight,
    48,
    1,
    false
  );
  const silo_roofGeom = new THREE.CylinderGeometry(
    0.43,
    roofRadius,
    0.1,
    48
  );
  const silo_rim_skirtGeom = new THREE.CylinderGeometry(
    roofRadius,
    roofRadius,
    rimHeight,
    48
  );
  const silo_rim_ringGeom = new THREE.TorusGeometry(
    roofRadius,
    0.012,
    8,
    48
  );
  const silo_seamGeom = new THREE.TorusGeometry(
    siloRadius + 0.004,
    0.005,
    6,
    48
  );
  const silo_base_ringGeom = new THREE.TorusGeometry(
    siloRadius + 0.003,
    0.009,
    7,
    48
  );
  const vertical_weldGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    siloHeight - 0.08,
    8
  );
  const eave_bracketGeom = new THREE.BoxGeometry(0.026, 0.05, 0.045);
  const access_hatchGeom = new THREE.BoxGeometry(0.22, 0.3, 0.018);
  const access_hatch_frameGeom = new THREE.BoxGeometry(0.27, 0.35, 0.012);
  const hatch_handleGeom = new THREE.CylinderGeometry(
    0.007,
    0.007,
    0.065,
    10
  );
  const service_postGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.34,
    10
  );
  const service_capGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.025,
    12
  );
  const service_boxGeom = new THREE.BoxGeometry(0.13, 0.18, 0.1);
  const nozzleGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.04, 16);
  const ladder_railGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    3.08,
    8
  );
  const ladder_rungGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.24,
    8
  );

  function addSiloShell(group, prefix) {
    const body = new THREE.Mesh(silo_bodyGeom, silo_bodyMat);
    body.name = prefix + "_body";
    body.position.y = siloHeight / 2;
    group.add(body);

    const roof = new THREE.Mesh(silo_roofGeom, silo_bodyMat);
    roof.name = prefix + "_roof";
    roof.position.y = siloHeight + 0.05;
    group.add(roof);

    const rim_skirt = new THREE.Mesh(
      silo_rim_skirtGeom,
      polished_trimMat
    );
    rim_skirt.name = prefix + "_rim_skirt";
    rim_skirt.position.y = siloHeight + 0.12;
    group.add(rim_skirt);

    const lower_eave_ring = new THREE.Mesh(
      silo_rim_ringGeom,
      seamMat
    );
    lower_eave_ring.name = prefix + "_lower_eave_ring";
    lower_eave_ring.rotation.x = Math.PI / 2;
    lower_eave_ring.position.y = siloHeight + 0.04;
    group.add(lower_eave_ring);

    const upper_eave_ring = new THREE.Mesh(
      silo_rim_ringGeom,
      polished_trimMat
    );
    upper_eave_ring.name = prefix + "_upper_eave_ring";
    upper_eave_ring.rotation.x = Math.PI / 2;
    upper_eave_ring.position.y = siloHeight + 0.2;
    group.add(upper_eave_ring);

    return { body, roof, rim_skirt, lower_eave_ring, upper_eave_ring };
  }

  function addPanelSeams(group, prefix) {
    const seams = new THREE.InstancedMesh(silo_seamGeom, seamMat, 8);
    seams.name = prefix + "_horizontal_panel_seams";
    const transform = new THREE.Object3D();

    for (let i = 0; i < 8; i++) {
      transform.position.set(0, 0.43 + i * 0.4, 0);
      transform.rotation.set(Math.PI / 2, 0, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      seams.setMatrixAt(i, transform.matrix);
    }

    seams.instanceMatrix.needsUpdate = true;
    group.add(seams);
    return seams;
  }

  function addEaveBrackets(group, prefix) {
    const brackets = new THREE.InstancedMesh(
      eave_bracketGeom,
      seamMat,
      16
    );
    brackets.name = prefix + "_eave_brackets";
    const transform = new THREE.Object3D();

    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2;
      transform.position.set(
        Math.sin(angle) * 0.462,
        siloHeight + 0.12,
        Math.cos(angle) * 0.462
      );
      transform.rotation.set(0, angle, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      brackets.setMatrixAt(i, transform.matrix);
    }

    brackets.instanceMatrix.needsUpdate = true;
    group.add(brackets);
    return brackets;
  }

  function addVerticalWelds(group, prefix, count, angleOffset) {
    const welds = new THREE.InstancedMesh(
      vertical_weldGeom,
      seamMat,
      count
    );
    welds.name = prefix + "_vertical_welds";
    const transform = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const angle = angleOffset + (i / count) * Math.PI * 2;
      transform.position.set(
        Math.sin(angle) * (siloRadius + 0.005),
        siloHeight / 2,
        Math.cos(angle) * (siloRadius + 0.005)
      );
      transform.rotation.set(0, 0, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      welds.setMatrixAt(i, transform.matrix);
    }

    welds.instanceMatrix.needsUpdate = true;
    group.add(welds);
    return welds;
  }

  function addAccessHatch(group, prefix, angle) {
    const hatch = new THREE.Group();
    hatch.name = prefix + "_access_hatch";
    hatch.position.set(
      Math.sin(angle) * (siloRadius + 0.008),
      0.25,
      Math.cos(angle) * (siloRadius + 0.008)
    );
    hatch.rotation.y = angle;

    const frame = new THREE.Mesh(
      access_hatch_frameGeom,
      seamMat
    );
    frame.name = prefix + "_access_hatch_frame";
    frame.position.z = -0.004;
    hatch.add(frame);

    const door = new THREE.Mesh(
      access_hatchGeom,
      silo_bodyMat
    );
    door.name = prefix + "_access_hatch_door";
    door.position.z = 0.009;
    hatch.add(door);

    const handle = new THREE.Mesh(
      hatch_handleGeom,
      dark_serviceMat
    );
    handle.name = prefix + "_access_hatch_handle";
    handle.rotation.z = Math.PI / 2;
    handle.position.set(0.065, 0, 0.028);
    hatch.add(handle);

    group.add(hatch);
    return hatch;
  }

  function addServiceOutlet(group, prefix, angle) {
    const outlet = new THREE.Group();
    outlet.name = prefix + "_service_outlet";
    outlet.position.set(
      Math.sin(angle) * (siloRadius + 0.004),
      0,
      Math.cos(angle) * (siloRadius + 0.004)
    );
    outlet.rotation.y = angle;

    const post = new THREE.Mesh(
      service_postGeom,
      polished_trimMat
    );
    post.name = prefix + "_service_outlet_post";
    post.position.set(0, 0.17, 0.035);
    outlet.add(post);

    const cap = new THREE.Mesh(
      service_capGeom,
      polished_trimMat
    );
    cap.name = prefix + "_service_outlet_cap";
    cap.position.set(0, 0.352, 0.035);
    outlet.add(cap);

    const electrical_box = new THREE.Mesh(
      service_boxGeom,
      seamMat
    );
    electrical_box.name = prefix + "_electrical_box";
    electrical_box.position.set(-0.12, 0.09, 0.025);
    outlet.add(electrical_box);

    group.add(outlet);
    return outlet;
  }

  function addPressureNozzle(group, prefix, angle, y) {
    const nozzleAngle = angle + 0.18;
    const nozzle = new THREE.Mesh(nozzleGeom, seamMat);
    nozzle.name = prefix + "_pressure_nozzle";
    nozzle.rotation.x = Math.PI / 2;
    nozzle.position.set(
      Math.sin(nozzleAngle) * (siloRadius + 0.018),
      y,
      Math.cos(nozzleAngle) * (siloRadius + 0.018)
    );
    group.add(nozzle);
    return nozzle;
  }

  function addLadder(group, prefix, angle) {
    const ladder = new THREE.Group();
    ladder.name = prefix + "_ladder";
    ladder.position.set(
      Math.sin(angle) * (siloRadius + 0.055),
      0,
      Math.cos(angle) * (siloRadius + 0.055)
    );
    ladder.rotation.y = angle;

    const left_rail = new THREE.Mesh(
      ladder_railGeom,
      seamMat
    );
    left_rail.name = prefix + "_ladder_left_rail";
    left_rail.position.set(-0.12, 1.75, 0);
    ladder.add(left_rail);

    const right_rail = new THREE.Mesh(
      ladder_railGeom,
      seamMat
    );
    right_rail.name = prefix + "_ladder_right_rail";
    right_rail.position.set(0.12, 1.75, 0);
    ladder.add(right_rail);

    const rungs = new THREE.InstancedMesh(
      ladder_rungGeom,
      seamMat,
      19
    );
    rungs.name = prefix + "_ladder_rungs";
    const transform = new THREE.Object3D();

    for (let i = 0; i < 19; i++) {
      transform.position.set(0, 0.34 + i * 0.155, 0);
      transform.rotation.set(0, 0, Math.PI / 2);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      rungs.setMatrixAt(i, transform.matrix);
    }

    rungs.instanceMatrix.needsUpdate = true;
    ladder.add(rungs);
    group.add(ladder);
    return ladder;
  }

  function addRoofPipe(group, prefix, angle, rise) {
    const roof_pipe = new THREE.Group();
    roof_pipe.name = prefix + "_roof_pipe";
    roof_pipe.position.set(
      Math.sin(angle) * siloRadius,
      siloHeight + 0.205,
      Math.cos(angle) * siloRadius
    );
    roof_pipe.rotation.y = angle;

    const points = [
      new THREE.Vector3(-0.16, 0.01, 0),
      new THREE.Vector3(-0.15, 0.09, 0),
      new THREE.Vector3(-0.08, 0.15, 0),
      new THREE.Vector3(0.08, 0.15, 0),
      new THREE.Vector3(0.15, 0.09, 0),
      new THREE.Vector3(0.16, 0.01, 0),
    ];
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const pipeGeom = new THREE.TubeGeometry(
      curve,
      28,
      0.022,
      8,
      false
    );
    const pipe = new THREE.Mesh(pipeGeom, polished_trimMat);
    pipe.name = prefix + "_roof_pipe_tube";
    pipe.scale.y = rise;
    roof_pipe.add(pipe);

    const flangeGeom = new THREE.CylinderGeometry(
      0.045,
      0.045,
      0.028,
      16
    );

    const left_flange = new THREE.Mesh(flangeGeom, seamMat);
    left_flange.name = prefix + "_roof_pipe_left_flange";
    left_flange.position.set(-0.16, 0.005, 0);
    roof_pipe.add(left_flange);

    const right_flange = new THREE.Mesh(flangeGeom, seamMat);
    right_flange.name = prefix + "_roof_pipe_right_flange";
    right_flange.position.set(0.16, 0.005, 0);
    roof_pipe.add(right_flange);

    group.add(roof_pipe);
    return roof_pipe;
  }

  function addInterTankPipe(group, prefix, start, end, y) {
    const inter_tank_pipeGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(start, end),
      1,
      0.018,
      8,
      false
    );
    const inter_tank_pipe = new THREE.Mesh(
      inter_tank_pipeGeom,
      polished_trimMat
    );
    inter_tank_pipe.name = prefix + "_inter_tank_pipe";
    inter_tank_pipe.position.y = y;
    group.add(inter_tank_pipe);
    return inter_tank_pipe;
  }

  const left_silo_shell_parts = addSiloShell(
    left_silo,
    "left_silo"
  );
  const left_silo_body = left_silo_shell_parts.body;
  const left_silo_roof = left_silo_shell_parts.roof;
  const left_silo_rim_skirt = left_silo_shell_parts.rim_skirt;
  const left_silo_lower_eave_ring =
    left_silo_shell_parts.lower_eave_ring;
  const left_silo_upper_eave_ring =
    left_silo_shell_parts.upper_eave_ring;
  const left_silo_panel_seams = addPanelSeams(
    left_silo,
    "left_silo"
  );
  const left_silo_eave_brackets = addEaveBrackets(
    left_silo,
    "left_silo"
  );
  const left_silo_vertical_welds = addVerticalWelds(
    left_silo,
    "left_silo",
    3,
    -0.25
  );
  const left_silo_base_ring = new THREE.Mesh(
    silo_base_ringGeom,
    seamMat
  );
  left_silo_base_ring.name = "left_silo_base_ring";
  left_silo_base_ring.rotation.x = Math.PI / 2;
  left_silo_base_ring.position.y = 0.035;
  left_silo.add(left_silo_base_ring);
  const left_silo_access_hatch = addAccessHatch(
    left_silo,
    "left_silo",
    0.28
  );
  const left_silo_service_outlet = addServiceOutlet(
    left_silo,
    "left_silo",
    -0.25
  );
  const left_silo_pressure_nozzle = addPressureNozzle(
    left_silo,
    "left_silo",
    -0.1,
    0.54
  );
  const left_silo_ladder = addLadder(
    left_silo,
    "left_silo",
    -1.02
  );
  const left_silo_roof_pipe = addRoofPipe(
    left_silo,
    "left_silo",
    0,
    0.78
  );

  const left_center_silo_shell_parts = addSiloShell(
    left_center_silo,
    "left_center_silo"
  );
  const left_center_silo_body =
    left_center_silo_shell_parts.body;
  const left_center_silo_roof =
    left_center_silo_shell_parts.roof;
  const left_center_silo_rim_skirt =
    left_center_silo_shell_parts.rim_skirt;
  const left_center_silo_lower_eave_ring =
    left_center_silo_shell_parts.lower_eave_ring;
  const left_center_silo_upper_eave_ring =
    left_center_silo_shell_parts.upper_eave_ring;
  const left_center_silo_panel_seams = addPanelSeams(
    left_center_silo,
    "left_center_silo"
  );
  const left_center_silo_eave_brackets = addEaveBrackets(
    left_center_silo,
    "left_center_silo"
  );
  const left_center_silo_vertical_welds = addVerticalWelds(
    left_center_silo,
    "left_center_silo",
    3,
    0.18
  );
  const left_center_silo_base_ring = new THREE.Mesh(
    silo_base_ringGeom,
    seamMat
  );
  left_center_silo_base_ring.name = "left_center_silo_base_ring";
  left_center_silo_base_ring.rotation.x = Math.PI / 2;
  left_center_silo_base_ring.position.y = 0.035;
  left_center_silo.add(left_center_silo_base_ring);
  const left_center_silo_access_hatch = addAccessHatch(
    left_center_silo,
    "left_center_silo",
    0.16
  );
  const left_center_silo_service_outlet = addServiceOutlet(
    left_center_silo,
    "left_center_silo",
    -0.22
  );
  const left_center_silo_pressure_nozzle = addPressureNozzle(
    left_center_silo,
    "left_center_silo",
    0.05,
    0.56
  );
  const left_center_silo_ladder = addLadder(
    left_center_silo,
    "left_center_silo",
    1.02
  );
  const left_center_silo_roof_pipe = addRoofPipe(
    left_center_silo,
    "left_center_silo",
    0,
    0.92
  );

  const center_silo_shell_parts = addSiloShell(
    center_silo,
    "center_silo"
  );
  const center_silo_body = center_silo_shell_parts.body;
  const center_silo_roof = center_silo_shell_parts.roof;
  const center_silo_rim_skirt = center_silo_shell_parts.rim_skirt;
  const center_silo_lower_eave_ring =
    center_silo_shell_parts.lower_eave_ring;
  const center_silo_upper_eave_ring =
    center_silo_shell_parts.upper_eave_ring;
  const center_silo_panel_seams = addPanelSeams(
    center_silo,
    "center_silo"
  );
  const center_silo_eave_brackets = addEaveBrackets(
    center_silo,
    "center_silo"
  );
  const center_silo_vertical_welds = addVerticalWelds(
    center_silo,
    "center_silo",
    4,
    0
  );
  const center_silo_base_ring = new THREE.Mesh(
    silo_base_ringGeom,
    seamMat
  );
  center_silo_base_ring.name = "center_silo_base_ring";
  center_silo_base_ring.rotation.x = Math.PI / 2;
  center_silo_base_ring.position.y = 0.035;
  center_silo.add(center_silo_base_ring);
  const center_silo_access_hatch = addAccessHatch(
    center_silo,
    "center_silo",
    0
  );
  const center_silo_service_outlet = addServiceOutlet(
    center_silo,
    "center_silo",
    -0.32
  );
  const center_silo_pressure_nozzle = addPressureNozzle(
    center_silo,
    "center_silo",
    0.02,
    0.58
  );
  const center_silo_ladder = addLadder(
    center_silo,
    "center_silo",
    -1.02
  );
  const center_silo_roof_pipe = addRoofPipe(
    center_silo,
    "center_silo",
    0,
    1.08
  );

  const right_center_silo_shell_parts = addSiloShell(
    right_center_silo,
    "right_center_silo"
  );
  const right_center_silo_body =
    right_center_silo_shell_parts.body;
  const right_center_silo_roof =
    right_center_silo_shell_parts.roof;
  const right_center_silo_rim_skirt =
    right_center_silo_shell_parts.rim_skirt;
  const right_center_silo_lower_eave_ring =
    right_center_silo_shell_parts.lower_eave_ring;
  const right_center_silo_upper_eave_ring =
    right_center_silo_shell_parts.upper_eave_ring;
  const right_center_silo_panel_seams = addPanelSeams(
    right_center_silo,
    "right_center_silo"
  );
  const right_center_silo_eave_brackets = addEaveBrackets(
    right_center_silo,
    "right_center_silo"
  );
  const right_center_silo_vertical_welds = addVerticalWelds(
    right_center_silo,
    "right_center_silo",
    3,
    -0.16
  );
  const right_center_silo_base_ring = new THREE.Mesh(
    silo_base_ringGeom,
    seamMat
  );
  right_center_silo_base_ring.name =
    "right_center_silo_base_ring";
  right_center_silo_base_ring.rotation.x = Math.PI / 2;
  right_center_silo_base_ring.position.y = 0.035;
  right_center_silo.add(right_center_silo_base_ring);
  const right_center_silo_access_hatch = addAccessHatch(
    right_center_silo,
    "right_center_silo",
    -0.16
  );
  const right_center_silo_service_outlet = addServiceOutlet(
    right_center_silo,
    "right_center_silo",
    0.24
  );
  const right_center_silo_pressure_nozzle = addPressureNozzle(
    right_center_silo,
    "right_center_silo",
    -0.05,
    0.55
  );
  const right_center_silo_ladder = addLadder(
    right_center_silo,
    "right_center_silo",
    -1.02
  );
  const right_center_silo_roof_pipe = addRoofPipe(
    right_center_silo,
    "right_center_silo",
    0,
    1.0
  );

  const right_silo_shell_parts = addSiloShell(
    right_silo,
    "right_silo"
  );
  const right_silo_body = right_silo_shell_parts.body;
  const right_silo_roof = right_silo_shell_parts.roof;
  const right_silo_rim_skirt = right_silo_shell_parts.rim_skirt;
  const right_silo_lower_eave_ring =
    right_silo_shell_parts.lower_eave_ring;
  const right_silo_upper_eave_ring =
    right_silo_shell_parts.upper_eave_ring;
  const right_silo_panel_seams = addPanelSeams(
    right_silo,
    "right_silo"
  );
  const right_silo_eave_brackets = addEaveBrackets(
    right_silo,
    "right_silo"
  );
  const right_silo_vertical_welds = addVerticalWelds(
    right_silo,
    "right_silo",
    3,
    0.22
  );
  const right_silo_base_ring = new THREE.Mesh(
    silo_base_ringGeom,
    seamMat
  );
  right_silo_base_ring.name = "right_silo_base_ring";
  right_silo_base_ring.rotation.x = Math.PI / 2;
  right_silo_base_ring.position.y = 0.035;
  right_silo.add(right_silo_base_ring);
  const right_silo_access_hatch = addAccessHatch(
    right_silo,
    "right_silo",
    -0.28
  );
  const right_silo_service_outlet = addServiceOutlet(
    right_silo,
    "right_silo",
    0.25
  );
  const right_silo_pressure_nozzle = addPressureNozzle(
    right_silo,
    "right_silo",
    -0.08,
    0.52
  );
  const right_silo_ladder = addLadder(
    right_silo,
    "right_silo",
    1.02
  );
  const right_silo_roof_pipe = addRoofPipe(
    right_silo,
    "right_silo",
    0,
    0.72
  );

  const left_connector_pipe = addInterTankPipe(
    root,
    "left",
    new THREE.Vector3(-0.99, 0, -0.08),
    new THREE.Vector3(-0.98, 0, 0.01),
    0.34
  );

  const center_left_connector_pipe = addInterTankPipe(
    root,
    "center_left",
    new THREE.Vector3(-0.005, 0, 0.1),
    new THREE.Vector3(0.005, 0, 0.16),
    0.36
  );

  const right_connector_pipe = addInterTankPipe(
    root,
    "right",
    new THREE.Vector3(1.985, 0, 0.01),
    new THREE.Vector3(1.99, 0, -0.08),
    0.34
  );

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