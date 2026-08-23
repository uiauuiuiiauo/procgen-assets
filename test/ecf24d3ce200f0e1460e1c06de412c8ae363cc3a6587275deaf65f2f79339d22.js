export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "folding_canvas_chair";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const fabric_group = new THREE.Group();
  fabric_group.name = "fabric_group";
  root.add(fabric_group);

  const hardware_group = new THREE.Group();
  hardware_group.name = "hardware_group";
  root.add(hardware_group);

  const seatW = 0.84;
  const seatD = 0.62;
  const seatH = 0.58;
  const backH = 0.62;
  const legH = 1.42;
  const frameX = 0.47;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb9783d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x173b39,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x0d2928,
    metalness: 0.0,
    roughness: 0.95,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x315b56,
    metalness: 0.0,
    roughness: 0.95,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x555957,
    metalness: 0.5,
    roughness: 0.25,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x242725,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeRoundedPlankGeometry(width, height, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeTubeGeometry(points, radius, segments, radialSegments) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(
      curve,
      segments,
      radius,
      radialSegments,
      false
    );
  }

  function makeBeam(geometry, p1, p2, material, name) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const beam = new THREE.Mesh(geometry, material);
    beam.name = name;
    beam.position.copy(p1).add(p2).multiplyScalar(0.5);
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    beam.scale.set(1, length, 1);
    return beam;
  }

  function setBeamInstance(mesh, index, p1, p2) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const position = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    mesh.setMatrixAt(index, matrix);
  }

  const main_side_railsGeom = makeRoundedPlankGeometry(
    0.078,
    1,
    0.048,
    0.037
  );
  const main_side_rails = new THREE.InstancedMesh(
    main_side_railsGeom,
    woodMat,
    2
  );
  main_side_rails.name = "main_side_rails";
  setBeamInstance(
    main_side_rails,
    0,
    new THREE.Vector3(-frameX, 0.025, 0.46),
    new THREE.Vector3(-frameX, legH, -0.34)
  );
  setBeamInstance(
    main_side_rails,
    1,
    new THREE.Vector3(frameX, 0.025, 0.46),
    new THREE.Vector3(frameX, legH, -0.34)
  );
  main_side_rails.instanceMatrix.needsUpdate = true;
  frame_group.add(main_side_rails);

  const rear_legsGeom = makeRoundedPlankGeometry(
    0.073,
    1,
    0.046,
    0.035
  );
  const rear_legs = new THREE.InstancedMesh(rear_legsGeom, woodMat, 2);
  rear_legs.name = "rear_legs";
  setBeamInstance(
    rear_legs,
    0,
    new THREE.Vector3(-frameX, 0.03, -0.43),
    new THREE.Vector3(-frameX, 0.69, 0.22)
  );
  setBeamInstance(
    rear_legs,
    1,
    new THREE.Vector3(frameX, 0.03, -0.43),
    new THREE.Vector3(frameX, 0.69, 0.22)
  );
  rear_legs.instanceMatrix.needsUpdate = true;
  frame_group.add(rear_legs);

  const seat_side_railsGeom = makeRoundedPlankGeometry(
    0.055,
    1,
    0.05,
    0.022
  );
  const seat_side_rails = new THREE.InstancedMesh(
    seat_side_railsGeom,
    woodMat,
    2
  );
  seat_side_rails.name = "seat_side_rails";
  setBeamInstance(
    seat_side_rails,
    0,
    new THREE.Vector3(-0.455, 0.515, -0.27),
    new THREE.Vector3(-0.455, 0.535, 0.34)
  );
  setBeamInstance(
    seat_side_rails,
    1,
    new THREE.Vector3(0.455, 0.515, -0.27),
    new THREE.Vector3(0.455, 0.535, 0.34)
  );
  seat_side_rails.instanceMatrix.needsUpdate = true;
  frame_group.add(seat_side_rails);

  const seat_cross_railsGeom = makeRoundedPlankGeometry(
    0.055,
    1,
    0.055,
    0.024
  );
  const seat_cross_rails = new THREE.InstancedMesh(
    seat_cross_railsGeom,
    woodMat,
    2
  );
  seat_cross_rails.name = "seat_cross_rails";
  setBeamInstance(
    seat_cross_rails,
    0,
    new THREE.Vector3(-0.46, 0.535, 0.31),
    new THREE.Vector3(0.46, 0.535, 0.31)
  );
  setBeamInstance(
    seat_cross_rails,
    1,
    new THREE.Vector3(-0.46, 0.515, -0.25),
    new THREE.Vector3(0.46, 0.515, -0.25)
  );
  seat_cross_rails.instanceMatrix.needsUpdate = true;
  frame_group.add(seat_cross_rails);

  const lower_cross_stretchersGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    1,
    18
  );
  const lower_cross_stretchers = new THREE.InstancedMesh(
    lower_cross_stretchersGeom,
    woodMat,
    2
  );
  lower_cross_stretchers.name = "lower_cross_stretchers";
  setBeamInstance(
    lower_cross_stretchers,
    0,
    new THREE.Vector3(-frameX, 0.22, 0.305),
    new THREE.Vector3(frameX, 0.22, 0.305)
  );
  setBeamInstance(
    lower_cross_stretchers,
    1,
    new THREE.Vector3(-frameX, 0.25, -0.31),
    new THREE.Vector3(frameX, 0.25, -0.31)
  );
  lower_cross_stretchers.instanceMatrix.needsUpdate = true;
  frame_group.add(lower_cross_stretchers);

  const folding_bracesGeom = makeRoundedPlankGeometry(
    0.043,
    1,
    0.027,
    0.017
  );
  const folding_braces = new THREE.InstancedMesh(
    folding_bracesGeom,
    woodMat,
    2
  );
  folding_braces.name = "folding_braces";
  setBeamInstance(
    folding_braces,
    0,
    new THREE.Vector3(-0.37, 0.26, -0.28),
    new THREE.Vector3(-0.37, 0.51, 0.27)
  );
  setBeamInstance(
    folding_braces,
    1,
    new THREE.Vector3(0.37, 0.26, -0.28),
    new THREE.Vector3(0.37, 0.51, 0.27)
  );
  folding_braces.instanceMatrix.needsUpdate = true;
  frame_group.add(folding_braces);

  function seatFabricPoint(u, t, offset) {
    const z = -0.25 + seatD * t;
    const halfWidth = seatW * 0.5 + 0.008 * Math.sin(Math.PI * t);
    const nx = u * 2 - 1;
    const centerFactor = 1 - nx * nx;
    const sag = 0.045 * centerFactor * Math.sin(Math.PI * t);
    const fold = 0.006 * Math.sin((u * 3 + t * 2) * Math.PI) *
      Math.sin(Math.PI * t) * (1 - centerFactor);
    return new THREE.Vector3(
      nx * halfWidth,
      seatH - sag + fold + offset,
      z
    );
  }

  function makeSeatFabricGeometry() {
    const xSegments = 16;
    const zSegments = 10;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= zSegments; j++) {
      const t = j / zSegments;
      for (let i = 0; i <= xSegments; i++) {
        const u = i / xSegments;
        const point = seatFabricPoint(u, t, 0);
        positions.push(point.x, point.y, point.z);
      }
    }

    const row = xSegments + 1;
    for (let j = 0; j < zSegments; j++) {
      for (let i = 0; i < xSegments; i++) {
        const a = j * row + i;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const seat_fabricGeom = makeSeatFabricGeometry();
  const seat_fabric = new THREE.Mesh(seat_fabricGeom, fabricMat);
  seat_fabric.name = "seat_fabric";
  fabric_group.add(seat_fabric);

  const seat_front_hemGeom = makeTubeGeometry([
    new THREE.Vector3(-0.425, seatH - 0.044, 0.374),
    new THREE.Vector3(-0.21, seatH - 0.041, 0.376),
    new THREE.Vector3(0, seatH - 0.037, 0.377),
    new THREE.Vector3(0.21, seatH - 0.041, 0.376),
    new THREE.Vector3(0.425, seatH - 0.044, 0.374),
  ], 0.021, 28, 10);
  const seat_front_hem = new THREE.Mesh(seat_front_hemGeom, fabricMat);
  seat_front_hem.name = "seat_front_hem";
  fabric_group.add(seat_front_hem);

  const seat_rear_hemGeom = makeTubeGeometry([
    new THREE.Vector3(-0.41, seatH - 0.002, -0.25),
    new THREE.Vector3(0, seatH + 0.003, -0.25),
    new THREE.Vector3(0.41, seatH - 0.002, -0.25),
  ], 0.014, 20, 8);
  const seat_rear_hem = new THREE.Mesh(seat_rear_hemGeom, fabricMat);
  seat_rear_hem.name = "seat_rear_hem";
  fabric_group.add(seat_rear_hem);

  const seat_left_edge_hemGeom = makeTubeGeometry([
    new THREE.Vector3(-0.41, seatH - 0.002, -0.25),
    new THREE.Vector3(-0.418, seatH - 0.012, -0.08),
    new THREE.Vector3(-0.425, seatH - 0.026, 0.11),
    new THREE.Vector3(-0.425, seatH - 0.044, 0.374),
  ], 0.012, 22, 8);
  const seat_left_edge_hem = new THREE.Mesh(
    seat_left_edge_hemGeom,
    fabricMat
  );
  seat_left_edge_hem.name = "seat_left_edge_hem";
  fabric_group.add(seat_left_edge_hem);

  const seat_right_edge_hemGeom = makeTubeGeometry([
    new THREE.Vector3(0.41, seatH - 0.002, -0.25),
    new THREE.Vector3(0.418, seatH - 0.012, -0.08),
    new THREE.Vector3(0.425, seatH - 0.026, 0.11),
    new THREE.Vector3(0.425, seatH - 0.044, 0.374),
  ], 0.012, 22, 8);
  const seat_right_edge_hem = new THREE.Mesh(
    seat_right_edge_hemGeom,
    fabricMat
  );
  seat_right_edge_hem.name = "seat_right_edge_hem";
  fabric_group.add(seat_right_edge_hem);

  const seat_front_stitchingGeom = makeTubeGeometry([
    new THREE.Vector3(-0.405, seatH - 0.022, 0.378),
    new THREE.Vector3(-0.2, seatH - 0.019, 0.38),
    new THREE.Vector3(0, seatH - 0.016, 0.381),
    new THREE.Vector3(0.2, seatH - 0.019, 0.38),
    new THREE.Vector3(0.405, seatH - 0.022, 0.378),
  ], 0.0022, 28, 6);
  const seat_front_stitching = new THREE.Mesh(
    seat_front_stitchingGeom,
    stitchMat
  );
  seat_front_stitching.name = "seat_front_stitching";
  fabric_group.add(seat_front_stitching);

  function backFabricPoint(u, v, offset) {
    const halfWidth = 0.415 - 0.01 * v;
    const nx = u * 2 - 1;
    const bottomY = 0.79 + 0.045 * (1 - nx * nx);
    const y = bottomY + backH * v;
    const z = -0.245 - 0.095 * v -
      0.014 * (1 - nx * nx) * (0.3 + 0.7 * v);
    return new THREE.Vector3(nx * halfWidth, y, z + offset);
  }

  function makeBackFabricGeometry() {
    const xSegments = 16;
    const ySegments = 10;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= ySegments; j++) {
      const v = j / ySegments;
      for (let i = 0; i <= xSegments; i++) {
        const u = i / xSegments;
        const point = backFabricPoint(u, v, 0);
        positions.push(point.x, point.y, point.z);
      }
    }

    const row = xSegments + 1;
    for (let j = 0; j < ySegments; j++) {
      for (let i = 0; i < xSegments; i++) {
        const a = j * row + i;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const back_fabricGeom = makeBackFabricGeometry();
  const back_fabric = new THREE.Mesh(back_fabricGeom, fabricMat);
  back_fabric.name = "back_fabric";
  fabric_group.add(back_fabric);

  const back_top_hemGeom = makeTubeGeometry([
    new THREE.Vector3(-0.405, 1.405, -0.334),
    new THREE.Vector3(-0.2, 1.411, -0.337),
    new THREE.Vector3(0, 1.413, -0.338),
    new THREE.Vector3(0.2, 1.411, -0.337),
    new THREE.Vector3(0.405, 1.405, -0.334),
  ], 0.013, 28, 8);
  const back_top_hem = new THREE.Mesh(back_top_hemGeom, fabricMat);
  back_top_hem.name = "back_top_hem";
  fabric_group.add(back_top_hem);

  const back_bottom_hemGeom = makeTubeGeometry([
    new THREE.Vector3(-0.415, 0.835, -0.243),
    new THREE.Vector3(-0.21, 0.811, -0.232),
    new THREE.Vector3(0, 0.801, -0.227),
    new THREE.Vector3(0.21, 0.811, -0.232),
    new THREE.Vector3(0.415, 0.835, -0.243),
  ], 0.013, 28, 8);
  const back_bottom_hem = new THREE.Mesh(back_bottom_hemGeom, fabricMat);
  back_bottom_hem.name = "back_bottom_hem";
  fabric_group.add(back_bottom_hem);

  const back_left_hemGeom = makeTubeGeometry([
    new THREE.Vector3(-0.415, 0.835, -0.243),
    new THREE.Vector3(-0.412, 1.02, -0.267),
    new THREE.Vector3(-0.408, 1.21, -0.292),
    new THREE.Vector3(-0.405, 1.405, -0.334),
  ], 0.011, 24, 8);
  const back_left_hem = new THREE.Mesh(back_left_hemGeom, fabricMat);
  back_left_hem.name = "back_left_hem";
  fabric_group.add(back_left_hem);

  const back_right_hemGeom = makeTubeGeometry([
    new THREE.Vector3(0.415, 0.835, -0.243),
    new THREE.Vector3(0.412, 1.02, -0.267),
    new THREE.Vector3(0.408, 1.21, -0.292),
    new THREE.Vector3(0.405, 1.405, -0.334),
  ], 0.011, 24, 8);
  const back_right_hem = new THREE.Mesh(back_right_hemGeom, fabricMat);
  back_right_hem.name = "back_right_hem";
  fabric_group.add(back_right_hem);

  const back_top_stitchingGeom = makeTubeGeometry([
    new THREE.Vector3(-0.39, 1.388, -0.32),
    new THREE.Vector3(-0.2, 1.394, -0.323),
    new THREE.Vector3(0, 1.396, -0.324),
    new THREE.Vector3(0.2, 1.394, -0.323),
    new THREE.Vector3(0.39, 1.388, -0.32),
  ], 0.002, 28, 6);
  const back_top_stitching = new THREE.Mesh(
    back_top_stitchingGeom,
    stitchMat
  );
  back_top_stitching.name = "back_top_stitching";
  fabric_group.add(back_top_stitching);

  const back_bottom_stitchingGeom = makeTubeGeometry([
    new THREE.Vector3(-0.395, 0.824, -0.218),
    new THREE.Vector3(-0.2, 0.804, -0.208),
    new THREE.Vector3(0, 0.796, -0.204),
    new THREE.Vector3(0.2, 0.804, -0.208),
    new THREE.Vector3(0.395, 0.824, -0.218),
  ], 0.002, 28, 6);
  const back_bottom_stitching = new THREE.Mesh(
    back_bottom_stitchingGeom,
    stitchMat
  );
  back_bottom_stitching.name = "back_bottom_stitching";
  fabric_group.add(back_bottom_stitching);

  const back_vertical_stitchingGeom = makeTubeGeometry([
    new THREE.Vector3(-0.22, 0.82, -0.215),
    new THREE.Vector3(-0.215, 1.01, -0.242),
    new THREE.Vector3(-0.205, 1.2, -0.273),
    new THREE.Vector3(-0.19, 1.39, -0.314),
  ], 0.0017, 24, 6);
  const back_vertical_stitching = new THREE.Mesh(
    back_vertical_stitchingGeom,
    stitchMat
  );
  back_vertical_stitching.name = "back_vertical_stitching";
  fabric_group.add(back_vertical_stitching);

  const pivot_washersGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.012,
    24
  );
  const pivot_washers = new THREE.InstancedMesh(
    pivot_washersGeom,
    silverMat,
    2
  );
  pivot_washers.name = "pivot_washers";

  const pivot_pinsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.018,
    18
  );
  const pivot_pins = new THREE.InstancedMesh(
    pivot_pinsGeom,
    darkMetalMat,
    2
  );
  pivot_pins.name = "pivot_pins";

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      -side * Math.PI / 2
    );
    const washerMatrix = new THREE.Matrix4().compose(
      new THREE.Vector3(side * 0.505, 0.68, 0.19),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    const pinMatrix = new THREE.Matrix4().compose(
      new THREE.Vector3(side * 0.516, 0.68, 0.19),
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    pivot_washers.setMatrixAt(i, washerMatrix);
    pivot_pins.setMatrixAt(i, pinMatrix);
  }
  pivot_washers.instanceMatrix.needsUpdate = true;
  pivot_pins.instanceMatrix.needsUpdate = true;
  hardware_group.add(pivot_washers, pivot_pins);

  const back_hinge_washersGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.01,
    20
  );
  const back_hinge_washers = new THREE.InstancedMesh(
    back_hinge_washersGeom,
    silverMat,
    2
  );
  back_hinge_washers.name = "back_hinge_washers";

  const back_hinge_pinsGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    0.015,
    14
  );
  const back_hinge_pins = new THREE.InstancedMesh(
    back_hinge_pinsGeom,
    darkMetalMat,
    2
  );
  back_hinge_pins.name = "back_hinge_pins";

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      -side * Math.PI / 2
    );
    back_hinge_washers.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.503, 0.94, -0.055),
        quaternion,
        new THREE.Vector3(1, 1, 1)
      )
    );
    back_hinge_pins.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.513, 0.94, -0.055),
        quaternion,
        new THREE.Vector3(1, 1, 1)
      )
    );
  }
  back_hinge_washers.instanceMatrix.needsUpdate = true;
  back_hinge_pins.instanceMatrix.needsUpdate = true;
  hardware_group.add(back_hinge_washers, back_hinge_pins);

  const top_bolt_washersGeom = new THREE.CylinderGeometry(
    0.013,
    0.013,
    0.009,
    18
  );
  const top_bolt_washers = new THREE.InstancedMesh(
    top_bolt_washersGeom,
    silverMat,
    2
  );
  top_bolt_washers.name = "top_bolt_washers";

  const top_bolt_pinsGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    0.014,
    12
  );
  const top_bolt_pins = new THREE.InstancedMesh(
    top_bolt_pinsGeom,
    darkMetalMat,
    2
  );
  top_bolt_pins.name = "top_bolt_pins";

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      -side * Math.PI / 2
    );
    top_bolt_washers.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.503, 1.345, -0.292),
        quaternion,
        new THREE.Vector3(1, 1, 1)
      )
    );
    top_bolt_pins.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        new THREE.Vector3(side * 0.512, 1.345, -0.292),
        quaternion,
        new THREE.Vector3(1, 1, 1)
      )
    );
  }
  top_bolt_washers.instanceMatrix.needsUpdate = true;
  top_bolt_pins.instanceMatrix.needsUpdate = true;
  hardware_group.add(top_bolt_washers, top_bolt_pins);

  const seat_rail_boltsGeom = new THREE.CylinderGeometry(
    0.01,
    0.01,
    0.009,
    16
  );
  const seat_rail_bolts = new THREE.InstancedMesh(
    seat_rail_boltsGeom,
    silverMat,
    4
  );
  seat_rail_bolts.name = "seat_rail_bolts";

  let boltIndex = 0;
  for (const side of [-1, 1]) {
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      -side * Math.PI / 2
    );
    for (const z of [-0.15, 0.21]) {
      seat_rail_bolts.setMatrixAt(
        boltIndex,
        new THREE.Matrix4().compose(
          new THREE.Vector3(side * 0.489, 0.527, z),
          quaternion,
          new THREE.Vector3(1, 1, 1)
        )
      );
      boltIndex++;
    }
  }
  seat_rail_bolts.instanceMatrix.needsUpdate = true;
  hardware_group.add(seat_rail_bolts);

  const rubber_feetGeom = new THREE.SphereGeometry(1, 14, 8);
  const rubber_feet = new THREE.InstancedMesh(
    rubber_feetGeom,
    rubberMat,
    4
  );
  rubber_feet.name = "rubber_feet";

  const footPositions = [
    new THREE.Vector3(-frameX, 0.006, 0.46),
    new THREE.Vector3(frameX, 0.006, 0.46),
    new THREE.Vector3(-frameX, 0.006, -0.43),
    new THREE.Vector3(frameX, 0.006, -0.43),
  ];
  for (let i = 0; i < footPositions.length; i++) {
    rubber_feet.setMatrixAt(
      i,
      new THREE.Matrix4().compose(
        footPositions[i],
        new THREE.Quaternion(),
        new THREE.Vector3(0.035, 0.009, 0.028)
      )
    );
  }
  rubber_feet.instanceMatrix.needsUpdate = true;
  hardware_group.add(rubber_feet);

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