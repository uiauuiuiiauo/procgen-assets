export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silo_facility";

  const silo_layout = [
    { x: -1.80, z:  0.08, r: 0.57, h: 3.52 },
    { x: -0.90, z: -0.07, r: 0.62, h: 3.84 },
    { x:  0.00, z:  0.12, r: 0.65, h: 4.05 },
    { x:  0.90, z: -0.02, r: 0.63, h: 3.94 },
    { x:  1.80, z:  0.08, r: 0.58, h: 3.58 },
  ];

  const silo_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const top_capMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_openingMat = new THREE.MeshStandardMaterial({
    color: 0x202426,
    metalness: 0.0,
    roughness: 0.8,
  });

  const dummy = new THREE.Object3D();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(rx || 0, ry || 0, rz || 0);
    dummy.scale.set(
      sx === undefined ? 1 : sx,
      sy === undefined ? 1 : sy,
      sz === undefined ? 1 : sz
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const silo_bodyGeom = new THREE.CylinderGeometry(1, 1, 1, 64);
  const silo_bodies = new THREE.InstancedMesh(
    silo_bodyGeom,
    silo_bodyMat,
    silo_layout.length
  );
  silo_bodies.name = "silo_bodies";

  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    setInstance(
      silo_bodies,
      i,
      silo.x,
      silo.h * 0.5,
      silo.z,
      0,
      0,
      0,
      silo.r,
      silo.h,
      silo.r
    );
  }
  silo_bodies.instanceMatrix.needsUpdate = true;
  root.add(silo_bodies);

  const top_collarGeom = new THREE.CylinderGeometry(1, 1, 1, 64);
  const top_collars = new THREE.InstancedMesh(
    top_collarGeom,
    top_capMat,
    silo_layout.length
  );
  top_collars.name = "top_collars";

  const top_hatchGeom = new THREE.CylinderGeometry(1, 1, 1, 64);
  const top_hatches = new THREE.InstancedMesh(
    top_hatchGeom,
    top_capMat,
    silo_layout.length
  );
  top_hatches.name = "top_hatches";

  const top_rimGeom = new THREE.TorusGeometry(1, 0.035, 8, 64);
  const top_rims = new THREE.InstancedMesh(
    top_rimGeom,
    seamMat,
    silo_layout.length
  );
  top_rims.name = "top_rims";

  const top_panel_postGeom = new THREE.CylinderGeometry(0.009, 0.009, 1, 8);
  const top_panel_posts = new THREE.InstancedMesh(
    top_panel_postGeom,
    seamMat,
    silo_layout.length * 12
  );
  top_panel_posts.name = "top_panel_posts";

  let topPostIndex = 0;
  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];

    setInstance(
      top_collars,
      i,
      silo.x,
      silo.h + 0.035,
      silo.z,
      0,
      0,
      0,
      silo.r * 1.035,
      0.13,
      silo.r * 1.035
    );

    setInstance(
      top_hatches,
      i,
      silo.x,
      silo.h + 0.12,
      silo.z,
      0,
      0,
      0,
      silo.r * 0.91,
      0.07,
      silo.r * 0.91
    );

    setInstance(
      top_rims,
      i,
      silo.x,
      silo.h + 0.07,
      silo.z,
      Math.PI / 2,
      0,
      0,
      silo.r * 1.035,
      silo.r * 1.035,
      silo.r * 1.035
    );

    for (let j = 0; j < 12; j++) {
      const angle = j / 12 * Math.PI * 2;
      const radius = silo.r * 1.05;
      setInstance(
        top_panel_posts,
        topPostIndex++,
        silo.x + Math.cos(angle) * radius,
        silo.h + 0.04,
        silo.z + Math.sin(angle) * radius,
        0,
        0,
        0,
        1,
        0.15,
        1
      );
    }
  }

  top_collars.instanceMatrix.needsUpdate = true;
  top_hatches.instanceMatrix.needsUpdate = true;
  top_rims.instanceMatrix.needsUpdate = true;
  top_panel_posts.instanceMatrix.needsUpdate = true;
  root.add(top_collars, top_hatches, top_rims, top_panel_posts);

  const horizontal_body_seamGeom = new THREE.TorusGeometry(1, 0.009, 6, 64);
  const horizontal_body_seams = new THREE.InstancedMesh(
    horizontal_body_seamGeom,
    seamMat,
    silo_layout.length * 8
  );
  horizontal_body_seams.name = "horizontal_body_seams";

  let bodySeamIndex = 0;
  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    for (let j = 1; j <= 8; j++) {
      setInstance(
        horizontal_body_seams,
        bodySeamIndex++,
        silo.x,
        silo.h * j / 9,
        silo.z,
        Math.PI / 2,
        0,
        0,
        silo.r * 1.005,
        silo.r * 1.005,
        silo.r * 1.005
      );
    }
  }
  horizontal_body_seams.instanceMatrix.needsUpdate = true;
  root.add(horizontal_body_seams);

  const vertical_body_seamGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    1,
    8
  );
  const vertical_body_seams = new THREE.InstancedMesh(
    vertical_body_seamGeom,
    seamMat,
    silo_layout.length * 4
  );
  vertical_body_seams.name = "vertical_body_seams";

  let verticalSeamIndex = 0;
  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    for (let j = 0; j < 4; j++) {
      const angle = j / 4 * Math.PI * 2;
      const radius = silo.r + 0.007;
      setInstance(
        vertical_body_seams,
        verticalSeamIndex++,
        silo.x + Math.cos(angle) * radius,
        silo.h * 0.5,
        silo.z + Math.sin(angle) * radius,
        0,
        0,
        0,
        1,
        silo.h * 0.94,
        1
      );
    }
  }
  vertical_body_seams.instanceMatrix.needsUpdate = true;
  root.add(vertical_body_seams);

  const bottom_rimGeom = new THREE.TorusGeometry(1, 0.025, 8, 64);
  const bottom_rims = new THREE.InstancedMesh(
    bottom_rimGeom,
    seamMat,
    silo_layout.length
  );
  bottom_rims.name = "bottom_rims";

  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    setInstance(
      bottom_rims,
      i,
      silo.x,
      0.045,
      silo.z,
      Math.PI / 2,
      0,
      0,
      silo.r * 1.01,
      silo.r * 1.01,
      silo.r * 1.01
    );
  }
  bottom_rims.instanceMatrix.needsUpdate = true;
  root.add(bottom_rims);

  const base_boltGeom = new THREE.SphereGeometry(0.012, 8, 6);
  const base_bolts = new THREE.InstancedMesh(
    base_boltGeom,
    seamMat,
    silo_layout.length * 8
  );
  base_bolts.name = "base_bolts";

  let baseBoltIndex = 0;
  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    for (let j = 0; j < 8; j++) {
      const angle = j / 8 * Math.PI * 2;
      setInstance(
        base_bolts,
        baseBoltIndex++,
        silo.x + Math.cos(angle) * (silo.r + 0.014),
        0.105,
        silo.z + Math.sin(angle) * (silo.r + 0.014),
        0,
        0,
        0,
        1,
        1,
        1
      );
    }
  }
  base_bolts.instanceMatrix.needsUpdate = true;
  root.add(base_bolts);

  const base_access_hatchGeom = new THREE.BoxGeometry(0.28, 0.34, 0.025);
  const base_access_hatches = new THREE.InstancedMesh(
    base_access_hatchGeom,
    top_capMat,
    silo_layout.length
  );
  base_access_hatches.name = "base_access_hatches";

  const access_latchGeom = new THREE.BoxGeometry(0.025, 0.075, 0.035);
  const access_latches = new THREE.InstancedMesh(
    access_latchGeom,
    seamMat,
    silo_layout.length
  );
  access_latches.name = "access_latches";

  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    setInstance(
      base_access_hatches,
      i,
      silo.x + 0.15,
      0.25,
      silo.z + silo.r + 0.016,
      0,
      0,
      0,
      1,
      1,
      1
    );
    setInstance(
      access_latches,
      i,
      silo.x + 0.22,
      0.25,
      silo.z + silo.r + 0.043,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  base_access_hatches.instanceMatrix.needsUpdate = true;
  access_latches.instanceMatrix.needsUpdate = true;
  root.add(base_access_hatches, access_latches);

  const drain_pipe_points = [
    new THREE.Vector3(0.00, 0.27, 0.00),
    new THREE.Vector3(0.08, 0.27, 0.00),
    new THREE.Vector3(0.13, 0.23, 0.00),
    new THREE.Vector3(0.15, 0.14, 0.00),
    new THREE.Vector3(0.15, 0.00, 0.00),
    new THREE.Vector3(0.21, -0.025, 0.00),
  ];
  const drain_pipeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(drain_pipe_points, false, "centripetal"),
    24,
    0.035,
    10,
    false
  );
  const base_drain_pipes = new THREE.InstancedMesh(
    drain_pipeGeom,
    top_capMat,
    silo_layout.length
  );
  base_drain_pipes.name = "base_drain_pipes";

  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    setInstance(
      base_drain_pipes,
      i,
      silo.x - silo.r * 0.65,
      0,
      silo.z + silo.r + 0.025,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  base_drain_pipes.instanceMatrix.needsUpdate = true;
  root.add(base_drain_pipes);

  const port_silo_index = 2;
  const port_silo = silo_layout[port_silo_index];

  const inspection_portGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.026,
    20
  );
  const inspection_port = new THREE.Mesh(inspection_portGeom, seamMat);
  inspection_port.name = "inspection_port";
  inspection_port.rotation.x = Math.PI / 2;
  inspection_port.position.set(
    port_silo.x + 0.12,
    0.57,
    port_silo.z + port_silo.r + 0.016
  );
  root.add(inspection_port);

  const inspection_port_centerGeom = new THREE.CylinderGeometry(
    0.017,
    0.017,
    0.032,
    16
  );
  const inspection_port_center = new THREE.Mesh(
    inspection_port_centerGeom,
    dark_openingMat
  );
  inspection_port_center.name = "inspection_port_center";
  inspection_port_center.rotation.x = Math.PI / 2;
  inspection_port_center.position.set(
    port_silo.x + 0.12,
    0.57,
    port_silo.z + port_silo.r + 0.035
  );
  root.add(inspection_port_center);

  const service_railGeom = new THREE.CylinderGeometry(0.012, 0.012, 1, 8);
  const service_rails = new THREE.InstancedMesh(
    service_railGeom,
    seamMat,
    4
  );
  service_rails.name = "service_rails";

  const serviceRailData = [
    [-1.27, 0.30,  0.00, 0.60, 0.14],
    [-1.27, 1.45,  0.00, 0.60, 0.14],
    [  0.28, 0.36, -0.22, 0.78, 0.14],
    [  0.28, 1.58, -0.22, 0.78, 0.14],
  ];
  for (let i = 0; i < serviceRailData.length; i++) {
    const rail = serviceRailData[i];
    setInstance(
      service_rails,
      i,
      rail[0],
      rail[1],
      rail[2],
      0,
      0,
      Math.PI / 2,
      1,
      rail[3],
      1
    );
  }
  service_rails.instanceMatrix.needsUpdate = true;
  root.add(service_rails);

  const pipeNozzleData = [
    [-1.27, 0.24,  0.00, 0.15],
    [-1.27, 0.36,  0.00, 0.15],
    [ 0.28, 0.28, -0.22, 0.16],
    [ 0.28, 0.44, -0.22, 0.16],
  ];
  const service_nozzleGeom = new THREE.CylinderGeometry(0.018, 0.018, 1, 10);
  const service_nozzles = new THREE.InstancedMesh(
    service_nozzleGeom,
    seamMat,
    pipeNozzleData.length
  );
  service_nozzles.name = "service_nozzles";

  for (let i = 0; i < pipeNozzleData.length; i++) {
    const nozzle = pipeNozzleData[i];
    setInstance(
      service_nozzles,
      i,
      nozzle[0],
      nozzle[1],
      nozzle[2],
      0,
      0,
      Math.PI / 2,
      1,
      nozzle[3],
      1
    );
  }
  service_nozzles.instanceMatrix.needsUpdate = true;
  root.add(service_nozzles);

  const roof_pipe_path = [
    new THREE.Vector3(-0.30, 0.00, 0),
    new THREE.Vector3(-0.28, 0.12, 0),
    new THREE.Vector3(-0.18, 0.25, 0),
    new THREE.Vector3(-0.04, 0.30, 0),
    new THREE.Vector3( 0.10, 0.25, 0),
    new THREE.Vector3( 0.18, 0.10, 0),
    new THREE.Vector3( 0.18, -0.02, 0),
  ];
  const roof_pipeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(roof_pipe_path, false, "centripetal"),
    32,
    0.032,
    10,
    false
  );
  const roof_pipes = new THREE.InstancedMesh(
    roof_pipeGeom,
    top_capMat,
    silo_layout.length
  );
  roof_pipes.name = "roof_pipes";

  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    setInstance(
      roof_pipes,
      i,
      silo.x,
      silo.h + 0.16,
      silo.z,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  roof_pipes.instanceMatrix.needsUpdate = true;
  root.add(roof_pipes);

  const roof_pipe_flangeGeom = new THREE.CylinderGeometry(
    0.058,
    0.058,
    0.025,
    16
  );
  const roof_pipe_flanges = new THREE.InstancedMesh(
    roof_pipe_flangeGeom,
    seamMat,
    silo_layout.length * 2
  );
  roof_pipe_flanges.name = "roof_pipe_flanges";

  let roofFlangeIndex = 0;
  for (let i = 0; i < silo_layout.length; i++) {
    const silo = silo_layout[i];
    const roofY = silo.h + 0.16;
    setInstance(
      roof_pipe_flanges,
      roofFlangeIndex++,
      silo.x - 0.30,
      roofY,
      silo.z,
      0,
      0,
      0,
      1,
      1,
      1
    );
    setInstance(
      roof_pipe_flanges,
      roofFlangeIndex++,
      silo.x + 0.18,
      roofY,
      silo.z,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  roof_pipe_flanges.instanceMatrix.needsUpdate = true;
  root.add(roof_pipe_flanges);

  const ladder_silo = silo_layout[4];
  const ladder_x = ladder_silo.x + ladder_silo.r * 0.55;
  const ladder_z = ladder_silo.z + ladder_silo.r * 0.835;
  const ladder_bottom = 0.16;
  const ladder_top = ladder_silo.h - 0.10;
  const ladder_height = ladder_top - ladder_bottom;
  const ladder_center_y = (ladder_bottom + ladder_top) * 0.5;

  const ladder_sideGeom = new THREE.CylinderGeometry(
    0.014,
    0.014,
    ladder_height,
    8
  );
  const ladder_sides = new THREE.InstancedMesh(
    ladder_sideGeom,
    seamMat,
    2
  );
  ladder_sides.name = "ladder_sides";

  setInstance(
    ladder_sides,
    0,
    ladder_x - 0.13,
    ladder_center_y,
    ladder_z,
    0,
    0,
    0,
    1,
    1,
    1
  );
  setInstance(
    ladder_sides,
    1,
    ladder_x + 0.13,
    ladder_center_y,
    ladder_z,
    0,
    0,
    0,
    1,
    1,
    1
  );
  ladder_sides.instanceMatrix.needsUpdate = true;
  root.add(ladder_sides);

  const ladder_rungGeom = new THREE.CylinderGeometry(
    0.011,
    0.011,
    0.27,
    8
  );
  const ladder_rungs = new THREE.InstancedMesh(
    ladder_rungGeom,
    seamMat,
    18
  );
  ladder_rungs.name = "ladder_rungs";

  for (let i = 0; i < 18; i++) {
    setInstance(
      ladder_rungs,
      i,
      ladder_x,
      ladder_bottom + ladder_height * i / 17,
      ladder_z,
      0,
      0,
      Math.PI / 2,
      1,
      1,
      1
    );
  }
  ladder_rungs.instanceMatrix.needsUpdate = true;
  root.add(ladder_rungs);

  const cagePoints = [
    new THREE.Vector3(-0.13, 0.00, 0.00),
    new THREE.Vector3(-0.13, 0.18, 0.00),
    new THREE.Vector3(-0.18, 0.24, 0.055),
    new THREE.Vector3(-0.18, 0.34, 0.11),
    new THREE.Vector3( 0.18, 0.34, 0.11),
    new THREE.Vector3( 0.18, 0.24, 0.055),
    new THREE.Vector3( 0.13, 0.18, 0.00),
    new THREE.Vector3( 0.13, 0.00, 0.00),
  ];
  const ladder_cage_hoopGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(cagePoints, false, "centripetal"),
    28,
    0.011,
    8,
    false
  );
  const ladder_cage_hoops = new THREE.InstancedMesh(
    ladder_cage_hoopGeom,
    seamMat,
    10
  );
  ladder_cage_hoops.name = "ladder_cage_hoops";

  for (let i = 0; i < 10; i++) {
    setInstance(
      ladder_cage_hoops,
      i,
      ladder_x,
      ladder_bottom + ladder_height * i / 9,
      ladder_z,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  ladder_cage_hoops.instanceMatrix.needsUpdate = true;
  root.add(ladder_cage_hoops);

  const cage_verticalGeom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    ladder_height,
    8
  );
  const ladder_cage_verticals = new THREE.InstancedMesh(
    cage_verticalGeom,
    seamMat,
    3
  );
  ladder_cage_verticals.name = "ladder_cage_verticals";

  setInstance(
    ladder_cage_verticals,
    0,
    ladder_x - 0.18,
    ladder_center_y,
    ladder_z + 0.11,
    0,
    0,
    0,
    1,
    1,
    1
  );
  setInstance(
    ladder_cage_verticals,
    1,
    ladder_x,
    ladder_center_y,
    ladder_z + 0.11,
    0,
    0,
    0,
    1,
    1,
    1
  );
  setInstance(
    ladder_cage_verticals,
    2,
    ladder_x + 0.18,
    ladder_center_y,
    ladder_z + 0.11,
    0,
    0,
    0,
    1,
    1,
    1
  );
  ladder_cage_verticals.instanceMatrix.needsUpdate = true;
  root.add(ladder_cage_verticals);

  const ladder_standoffGeom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    0.11,
    8
  );
  const ladder_standoffs = new THREE.InstancedMesh(
    ladder_standoffGeom,
    seamMat,
    20
  );
  ladder_standoffs.name = "ladder_standoffs";

  let standoffIndex = 0;
  for (let i = 0; i < 10; i++) {
    const y = ladder_bottom + ladder_height * i / 9;
    for (const side of [-1, 1]) {
      setInstance(
        ladder_standoffs,
        standoffIndex++,
        ladder_x + side * 0.18,
        y + 0.32,
        ladder_z + 0.055,
        Math.PI / 2,
        0,
        0,
        1,
        1,
        1
      );
    }
  }
  ladder_standoffs.instanceMatrix.needsUpdate = true;
  root.add(ladder_standoffs);

  const ladder_footGeom = new THREE.CylinderGeometry(0.018, 0.018, 1, 8);
  const ladder_feet = new THREE.InstancedMesh(
    ladder_footGeom,
    seamMat,
    2
  );
  ladder_feet.name = "ladder_feet";

  setInstance(
    ladder_feet,
    0,
    ladder_x - 0.13,
    0.10,
    ladder_z,
    Math.PI / 2,
    0,
    0,
    1,
    0.18,
    1
  );
  setInstance(
    ladder_feet,
    1,
    ladder_x + 0.13,
    0.10,
    ladder_z,
    Math.PI / 2,
    0,
    0,
    1,
    0.18,
    1
  );
  ladder_feet.instanceMatrix.needsUpdate = true;
  root.add(ladder_feet);

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