export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "brass_measuring_instrument";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa8843f,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedBrassMat = new THREE.MeshStandardMaterial({
    color: 0xc7a654,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x725526,
    metalness: 0.6,
    roughness: 0.5,
  });
  const tapeMat = new THREE.MeshStandardMaterial({
    color: 0xb98758,
    metalness: 0.6,
    roughness: 0.5,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x39291c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x17120c,
    metalness: 0.0,
    roughness: 0.8,
  });

  const y_axis = new THREE.Vector3(0, 1, 0);
  const x_axis = new THREE.Vector3(1, 0, 0);
  const z_axis = new THREE.Vector3(0, 0, 1);

  function makeCylinderBetween(name, start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments || 16
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(y_axis, direction.normalize());
    return mesh;
  }

  function makeTaperBetween(name, start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      0,
      radius,
      length,
      segments || 20
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(y_axis, direction.normalize());
    return mesh;
  }

  function setInstanceBetween(instanced, index, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3()
      .copy(start)
      .add(end)
      .multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      y_axis,
      direction.normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    instanced.setMatrixAt(index, matrix);
  }

  function makeRoundedBarGeometry(length, width, thickness) {
    const radius = width * 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(-length * 0.5 + radius, -width * 0.5);
    shape.lineTo(length * 0.5 - radius, -width * 0.5);
    shape.quadraticCurveTo(
      length * 0.5,
      -width * 0.5,
      length * 0.5,
      0
    );
    shape.quadraticCurveTo(
      length * 0.5,
      width * 0.5,
      length * 0.5 - radius,
      width * 0.5
    );
    shape.lineTo(-length * 0.5 + radius, width * 0.5);
    shape.quadraticCurveTo(
      -length * 0.5,
      width * 0.5,
      -length * 0.5,
      0
    );
    shape.quadraticCurveTo(
      -length * 0.5,
      -width * 0.5,
      -length * 0.5 + radius,
      -width * 0.5
    );
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -thickness * 0.5);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  const measuring_tape = new THREE.Group();
  measuring_tape.name = "measuring_tape";
  root.add(measuring_tape);

  const tapePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-1.34, 0.052, -0.03),
      new THREE.Vector3(-1.08, 0.052, -0.52),
      new THREE.Vector3(-0.62, 0.052, -0.94),
      new THREE.Vector3(-0.02, 0.052, -1.12),
      new THREE.Vector3(0.58, 0.052, -1.02),
      new THREE.Vector3(0.91, 0.052, -0.68),
      new THREE.Vector3(0.99, 0.052, -0.25),
      new THREE.Vector3(0.83, 0.052, 0.08),
      new THREE.Vector3(0.45, 0.052, 0.18),
      new THREE.Vector3(0.08, 0.052, 0.14),
    ],
    false,
    "centripetal"
  );

  const tapeSegments = 72;
  const tapeWidth = 0.095;
  const tapePositions = [];
  const tapeIndices = [];

  for (let i = 0; i <= tapeSegments; i++) {
    const t = i / tapeSegments;
    const point = tapePath.getPoint(t);
    const tangent = tapePath.getTangent(t).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);

    tapePositions.push(
      point.x + side.x * tapeWidth * 0.5,
      point.y,
      point.z + side.z * tapeWidth * 0.5,
      point.x - side.x * tapeWidth * 0.5,
      point.y,
      point.z - side.z * tapeWidth * 0.5
    );

    if (i < tapeSegments) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      tapeIndices.push(a, b, c, b, d, c);
    }
  }

  const tape_ribbonGeom = new THREE.BufferGeometry();
  tape_ribbonGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(tapePositions, 3)
  );
  tape_ribbonGeom.setIndex(tapeIndices);
  tape_ribbonGeom.computeVertexNormals();

  const tape_ribbon = new THREE.Mesh(tape_ribbonGeom, tapeMat);
  tape_ribbon.name = "tape_ribbon";
  measuring_tape.add(tape_ribbon);

  const tapeEdgePoints = [];
  for (let i = 0; i <= 48; i++) {
    const t = i / 48;
    const point = tapePath.getPoint(t);
    const tangent = tapePath.getTangent(t).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
    tapeEdgePoints.push(
      new THREE.Vector3(
        point.x + side.x * tapeWidth * 0.5,
        point.y + 0.003,
        point.z + side.z * tapeWidth * 0.5
      )
    );
  }

  const tapeEdgeCurve = new THREE.CatmullRomCurve3(
    tapeEdgePoints,
    false,
    "centripetal"
  );
  const tape_edgeGeom = new THREE.TubeGeometry(
    tapeEdgeCurve,
    72,
    0.006,
    6,
    false
  );

  const tape_left_edge = new THREE.Mesh(tape_edgeGeom, darkBrassMat);
  tape_left_edge.name = "tape_left_edge";
  measuring_tape.add(tape_left_edge);

  const tape_right_edge = new THREE.Mesh(tape_edgeGeom, darkBrassMat);
  tape_right_edge.name = "tape_right_edge";
  tape_right_edge.scale.setScalar(1);
  measuring_tape.add(tape_right_edge);

  const tickCount = 40;
  const tape_ticksGeom = new THREE.BoxGeometry(0.011, 0.006, 0.058);
  const tape_ticks = new THREE.InstancedMesh(
    tape_ticksGeom,
    inkMat,
    tickCount
  );
  tape_ticks.name = "tape_ticks";

  for (let i = 0; i < tickCount; i++) {
    const t = 0.025 + (i / (tickCount - 1)) * 0.95;
    const point = tapePath.getPoint(t);
    const tangent = tapePath.getTangent(t).normalize();
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      x_axis,
      tangent
    );
    const scale =
      i % 10 === 0
        ? new THREE.Vector3(1, 1, 1.45)
        : i % 5 === 0
          ? new THREE.Vector3(1, 1, 1.15)
          : new THREE.Vector3(1, 1, 0.78);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(point.x, point.y + 0.006, point.z),
      quaternion,
      scale
    );
    tape_ticks.setMatrixAt(i, matrix);
  }
  tape_ticks.instanceMatrix.needsUpdate = true;
  measuring_tape.add(tape_ticks);

  const tape_end_grommetGeom = new THREE.TorusGeometry(
    0.066,
    0.018,
    10,
    28
  );
  const tape_end_grommet = new THREE.Mesh(
    tape_end_grommetGeom,
    darkBrassMat
  );
  tape_end_grommet.name = "tape_end_grommet";
  tape_end_grommet.rotation.x = Math.PI / 2;
  tape_end_grommet.position.set(-1.34, 0.052, -0.03);
  measuring_tape.add(tape_end_grommet);

  const tape_end_openingGeom = new THREE.CylinderGeometry(
    0.044,
    0.044,
    0.012,
    24
  );
  const tape_end_opening = new THREE.Mesh(
    tape_end_openingGeom,
    openingMat
  );
  tape_end_opening.name = "tape_end_opening";
  tape_end_opening.position.set(-1.34, 0.052, -0.03);
  measuring_tape.add(tape_end_opening);

  const tape_end_ridgesGeom = new THREE.BoxGeometry(
    0.018,
    0.022,
    0.032
  );
  const tape_end_ridges = new THREE.InstancedMesh(
    tape_end_ridgesGeom,
    darkBrassMat,
    16
  );
  tape_end_ridges.name = "tape_end_ridges";

  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const position = new THREE.Vector3(
      -1.34 + Math.cos(angle) * 0.084,
      0.052,
      -0.03 + Math.sin(angle) * 0.084
    );
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      y_axis,
      Math.PI / 2 - angle
    );
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    tape_end_ridges.setMatrixAt(i, matrix);
  }
  tape_end_ridges.instanceMatrix.needsUpdate = true;
  measuring_tape.add(tape_end_ridges);

  const ring_hinge = new THREE.Group();
  ring_hinge.name = "ring_hinge";
  root.add(ring_hinge);

  const ring_barrelGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.25,
    20
  );
  const ring_barrel = new THREE.Mesh(ring_barrelGeom, brassMat);
  ring_barrel.name = "ring_barrel";
  ring_barrel.rotation.x = Math.PI / 2;
  ring_barrel.position.set(-0.96, 0.09, -0.56);
  ring_hinge.add(ring_barrel);

  const ring_lugGeom = new THREE.BoxGeometry(0.14, 0.055, 0.11);
  const ring_lug = new THREE.Mesh(ring_lugGeom, darkBrassMat);
  ring_lug.name = "ring_lug";
  ring_lug.position.set(-0.96, 0.09, -0.69);
  ring_lug.rotation.y = -0.16;
  ring_hinge.add(ring_lug);

  const suspension_ringGeom = new THREE.TorusGeometry(
    0.18,
    0.025,
    12,
    40
  );
  const suspension_ring = new THREE.Mesh(
    suspension_ringGeom,
    polishedBrassMat
  );
  suspension_ring.name = "suspension_ring";
  suspension_ring.rotation.x = Math.PI / 2;
  suspension_ring.position.set(-1.02, 0.09, -0.88);
  ring_hinge.add(suspension_ring);

  const ring_inner_trimGeom = new THREE.TorusGeometry(
    0.145,
    0.008,
    8,
    36
  );
  const ring_inner_trim = new THREE.Mesh(
    ring_inner_trimGeom,
    darkBrassMat
  );
  ring_inner_trim.name = "ring_inner_trim";
  ring_inner_trim.rotation.x = Math.PI / 2;
  ring_inner_trim.position.set(-1.02, 0.091, -0.88);
  ring_hinge.add(ring_inner_trim);

  const ring_shank = makeCylinderBetween(
    "ring_shank",
    new THREE.Vector3(-0.96, 0.09, -0.57),
    new THREE.Vector3(-0.06, 0.105, 0.065),
    0.044,
    brassMat,
    18
  );
  ring_hinge.add(ring_shank);

  const ring_shank_rail = makeCylinderBetween(
    "ring_shank_rail",
    new THREE.Vector3(-0.91, 0.13, -0.53),
    new THREE.Vector3(-0.08, 0.14, 0.035),
    0.011,
    polishedBrassMat,
    10
  );
  ring_hinge.add(ring_shank_rail);

  const shank_collarGeom = new THREE.CylinderGeometry(
    0.061,
    0.061,
    0.13,
    20
  );
  const shank_collar = new THREE.Mesh(shank_collarGeom, darkBrassMat);
  shank_collar.name = "shank_collar";
  shank_collar.position.set(-0.82, 0.098, -0.445);
  shank_collar.quaternion.setFromUnitVectors(
    y_axis,
    new THREE.Vector3(0.94, 0, 0.34).normalize()
  );
  ring_hinge.add(shank_collar);

  const main_frame = new THREE.Group();
  main_frame.name = "main_frame";
  root.add(main_frame);

  const right_spikeGeom = makeRoundedBarGeometry(1.72, 0.078, 0.038);
  const right_spike = new THREE.Mesh(right_spikeGeom, polishedBrassMat);
  right_spike.name = "right_spike";
  right_spike.position.set(0.9, 0.105, 0.075);
  right_spike.rotation.y = 0.035;
  main_frame.add(right_spike);

  const right_spike_tip = makeTaperBetween(
    "right_spike_tip",
    new THREE.Vector3(1.75, 0.105, 0.088),
    new THREE.Vector3(2.08, 0.105, 0.096),
    0.043,
    polishedBrassMat,
    20
  );
  main_frame.add(right_spike_tip);

  const right_spike_inlayGeom = new THREE.BoxGeometry(
    1.5,
    0.006,
    0.012
  );
  const right_spike_inlay = new THREE.Mesh(
    right_spike_inlayGeom,
    darkBrassMat
  );
  right_spike_inlay.name = "right_spike_inlay";
  right_spike_inlay.position.set(0.84, 0.13, 0.072);
  right_spike_inlay.rotation.y = 0.035;
  main_frame.add(right_spike_inlay);

  const left_rulerGeom = makeRoundedBarGeometry(1.3, 0.09, 0.04);
  const left_ruler = new THREE.Mesh(left_rulerGeom, brassMat);
  left_ruler.name = "left_ruler";
  left_ruler.position.set(-0.66, 0.105, -0.035);
  left_ruler.rotation.y = -0.025;
  main_frame.add(left_ruler);

  const left_ruler_inlayGeom = new THREE.BoxGeometry(
    1.08,
    0.006,
    0.014
  );
  const left_ruler_inlay = new THREE.Mesh(
    left_ruler_inlayGeom,
    darkBrassMat
  );
  left_ruler_inlay.name = "left_ruler_inlay";
  left_ruler_inlay.position.set(-0.68, 0.13, -0.034);
  left_ruler_inlay.rotation.y = -0.025;
  main_frame.add(left_ruler_inlay);

  const left_ruler_ticksGeom = new THREE.BoxGeometry(
    0.011,
    0.006,
    0.052
  );
  const left_ruler_ticks = new THREE.InstancedMesh(
    left_ruler_ticksGeom,
    inkMat,
    22
  );
  left_ruler_ticks.name = "left_ruler_ticks";

  for (let i = 0; i < 22; i++) {
    const x = -1.2 + (i / 21) * 1.05;
    const z = -0.035 - (x + 0.66) * 0.025;
    const position = new THREE.Vector3(x, 0.133, z);
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      y_axis,
      -0.025
    );
    const scale =
      i % 10 === 0
        ? new THREE.Vector3(1, 1, 1.4)
        : i % 5 === 0
          ? new THREE.Vector3(1, 1, 1.1)
          : new THREE.Vector3(1, 1, 0.72);
    const matrix = new THREE.Matrix4().compose(
      position,
      quaternion,
      scale
    );
    left_ruler_ticks.setMatrixAt(i, matrix);
  }
  left_ruler_ticks.instanceMatrix.needsUpdate = true;
  main_frame.add(left_ruler_ticks);

  const diagonal_needleGeom = new THREE.CylinderGeometry(
    0.052,
    0.012,
    1,
    20
  );
  const diagonal_needle = new THREE.Mesh(
    diagonal_needleGeom,
    polishedBrassMat
  );
  diagonal_needle.name = "diagonal_needle";

  const needleStart = new THREE.Vector3(0.03, 0.105, 0.08);
  const needleEnd = new THREE.Vector3(1.38, 0.105, 1.35);
  const needleDirection = new THREE.Vector3().subVectors(
    needleEnd,
    needleStart
  );
  const needleLength = needleDirection.length();
  diagonal_needle.position
    .copy(needleStart)
    .add(needleEnd)
    .multiplyScalar(0.5);
  diagonal_needle.quaternion.setFromUnitVectors(
    y_axis,
    needleDirection.normalize()
  );
  diagonal_needle.scale.y = needleLength;
  main_frame.add(diagonal_needle);

  const needle_ridge = makeCylinderBetween(
    "needle_ridge",
    new THREE.Vector3(0.12, 0.145, 0.165),
    new THREE.Vector3(1.18, 0.13, 1.14),
    0.007,
    darkBrassMat,
    8
  );
  main_frame.add(needle_ridge);

  const pivot_housing = new THREE.Group();
  pivot_housing.name = "pivot_housing";
  pivot_housing.position.set(0, 0.105, 0.08);
  root.add(pivot_housing);

  const pivot_bodyGeom = new THREE.CylinderGeometry(
    0.145,
    0.155,
    0.16,
    12
  );
  const pivot_body = new THREE.Mesh(pivot_bodyGeom, brassMat);
  pivot_body.name = "pivot_body";
  pivot_body.position.y = 0.01;
  pivot_housing.add(pivot_body);

  const pivot_top_capGeom = new THREE.CylinderGeometry(
    0.12,
    0.14,
    0.05,
    12
  );
  const pivot_top_cap = new THREE.Mesh(
    pivot_top_capGeom,
    polishedBrassMat
  );
  pivot_top_cap.name = "pivot_top_cap";
  pivot_top_cap.position.y = 0.115;
  pivot_housing.add(pivot_top_cap);

  const pivot_bottom_flangeGeom = new THREE.CylinderGeometry(
    0.16,
    0.16,
    0.035,
    16
  );
  const pivot_bottom_flange = new THREE.Mesh(
    pivot_bottom_flangeGeom,
    darkBrassMat
  );
  pivot_bottom_flange.name = "pivot_bottom_flange";
  pivot_bottom_flange.position.y = -0.075;
  pivot_housing.add(pivot_bottom_flange);

  const pivot_top_ringGeom = new THREE.TorusGeometry(
    0.082,
    0.018,
    10,
    28
  );
  const pivot_top_ring = new THREE.Mesh(
    pivot_top_ringGeom,
    polishedBrassMat
  );
  pivot_top_ring.name = "pivot_top_ring";
  pivot_top_ring.rotation.x = Math.PI / 2;
  pivot_top_ring.position.y = 0.145;
  pivot_housing.add(pivot_top_ring);

  const pivot_openingGeom = new THREE.CylinderGeometry(
    0.057,
    0.057,
    0.012,
    24
  );
  const pivot_opening = new THREE.Mesh(pivot_openingGeom, openingMat);
  pivot_opening.name = "pivot_opening";
  pivot_opening.position.y = 0.151;
  pivot_housing.add(pivot_opening);

  const pivot_side_screwGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.026,
    18
  );
  const pivot_side_screw = new THREE.Mesh(
    pivot_side_screwGeom,
    darkBrassMat
  );
  pivot_side_screw.name = "pivot_side_screw";
  pivot_side_screw.rotation.x = Math.PI / 2;
  pivot_side_screw.position.set(0.035, 0.015, 0.153);
  pivot_housing.add(pivot_side_screw);

  const pivot_screw_slotGeom = new THREE.BoxGeometry(
    0.052,
    0.009,
    0.008
  );
  const pivot_screw_slot = new THREE.Mesh(
    pivot_screw_slotGeom,
    openingMat
  );
  pivot_screw_slot.name = "pivot_screw_slot";
  pivot_screw_slot.position.set(0.035, 0.015, 0.17);
  pivot_housing.add(pivot_screw_slot);

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