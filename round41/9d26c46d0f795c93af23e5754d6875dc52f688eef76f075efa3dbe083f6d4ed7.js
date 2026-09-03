export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_running_shoe";

  const upperMat = new THREE.MeshStandardMaterial({
    color: 0x1264d3,
    metalness: 0.0,
    roughness: 0.3,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x0d55bd,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const highlightMat = new THREE.MeshStandardMaterial({
    color: 0x2b79dc,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x063889,
    metalness: 0.0,
    roughness: 0.3,
  });
  const outsoleMat = new THREE.MeshStandardMaterial({
    color: 0x1761c8,
    metalness: 0.0,
    roughness: 0.8,
  });
  const midsoleMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedTrimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushedInsetMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x5f6368,
    metalness: 0.6,
    roughness: 0.5,
  });

  function createFootprintShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.34, -1.50);
    shape.bezierCurveTo(-0.43, -1.49, -0.46, -1.38, -0.46, -1.20);
    shape.bezierCurveTo(-0.48, -0.72, -0.52, -0.10, -0.53, 0.48);
    shape.bezierCurveTo(-0.54, 0.94, -0.49, 1.30, -0.34, 1.48);
    shape.bezierCurveTo(-0.20, 1.57, 0.20, 1.57, 0.36, 1.47);
    shape.bezierCurveTo(0.51, 1.28, 0.54, 0.90, 0.52, 0.46);
    shape.bezierCurveTo(0.50, -0.10, 0.47, -0.76, 0.44, -1.20);
    shape.bezierCurveTo(0.43, -1.40, 0.39, -1.50, 0.31, -1.51);
    shape.bezierCurveTo(0.12, -1.55, -0.18, -1.55, -0.34, -1.50);
    shape.closePath();
    return shape;
  }

  function createHeelCounterShape() {
    const shape = new THREE.Shape();
    shape.moveTo(-0.35, 0.29);
    shape.lineTo(0.35, 0.29);
    shape.lineTo(0.35, 0.72);
    shape.bezierCurveTo(0.34, 0.91, 0.28, 1.10, 0.17, 1.18);
    shape.bezierCurveTo(0.08, 1.24, -0.08, 1.24, -0.17, 1.18);
    shape.bezierCurveTo(-0.28, 1.10, -0.34, 0.91, -0.35, 0.72);
    shape.closePath();
    return shape;
  }

  function createSideExtrude(shape, depth, bevelSize, bevelThickness) {
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
    geom.translate(0, 0, -depth / 2);
    geom.rotateY(-Math.PI / 2);
    return geom;
  }

  function createSidePanel(shape) {
    const geom = new THREE.ShapeGeometry(shape, 16);
    geom.rotateY(-Math.PI / 2);
    return geom;
  }

  function createSidePair(geom, mat, offset, name) {
    const pair = new THREE.InstancedMesh(geom, mat, 2);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 2; i++) {
      dummy.position.set(i === 0 ? -offset : offset, 0, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      pair.setMatrixAt(i, dummy.matrix);
    }
    pair.instanceMatrix.needsUpdate = true;
    pair.name = name;
    root.add(pair);
    return pair;
  }

  function createTube(points, radius, mat, tubularSegments, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        tubularSegments,
        radius,
        8,
        closed
      ),
      mat
    );
  }

  function createSegmentInstances(segments, radius, mat, name) {
    const geom = new THREE.CylinderGeometry(radius, radius, 1, 8);
    const instances = new THREE.InstancedMesh(geom, mat, segments.length);
    const dummy = new THREE.Object3D();
    const up = new THREE.Vector3(0, 1, 0);
    const direction = new THREE.Vector3();
    const midpoint = new THREE.Vector3();

    for (let i = 0; i < segments.length; i++) {
      const a = segments[i][0];
      const b = segments[i][1];
      direction.subVectors(b, a);
      const length = direction.length();
      midpoint.addVectors(a, b).multiplyScalar(0.5);
      dummy.position.copy(midpoint);
      dummy.quaternion.setFromUnitVectors(up, direction.normalize());
      dummy.scale.set(1, length, 1);
      dummy.updateMatrix();
      instances.setMatrixAt(i, dummy.matrix);
    }
    instances.instanceMatrix.needsUpdate = true;
    instances.name = name;
    root.add(instances);
    return instances;
  }

  function soleHalfWidthAt(z) {
    if (z < -1.20) {
      return 0.34 + ((z + 1.50) / 0.30) * 0.12;
    }
    if (z < 0.48) {
      return 0.46 + ((z + 1.20) / 1.68) * 0.07;
    }
    if (z < 1.20) {
      return 0.53 - ((z - 0.48) / 0.72) * 0.05;
    }
    return 0.48 - ((z - 1.20) / 0.31) * 0.14;
  }

  const outsoleShape = createFootprintShape();
  const outsoleGeom = new THREE.ExtrudeGeometry(outsoleShape, {
    depth: 0.09,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.025,
    bevelThickness: 0.018,
  });
  outsoleGeom.translate(0, 0, -0.045);
  outsoleGeom.rotateX(Math.PI / 2);
  const outsole = new THREE.Mesh(outsoleGeom, outsoleMat);
  outsole.position.y = 0.075;
  outsole.name = "outsole";
  root.add(outsole);

  const midsoleShape = createFootprintShape();
  const midsoleGeom = new THREE.ExtrudeGeometry(midsoleShape, {
    depth: 0.25,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 4,
    bevelSize: 0.035,
    bevelThickness: 0.025,
  });
  midsoleGeom.translate(0, 0, -0.125);
  midsoleGeom.rotateX(Math.PI / 2);
  const midsole = new THREE.Mesh(midsoleGeom, midsoleMat);
  midsole.position.y = 0.235;
  midsole.scale.set(0.985, 1, 0.995);
  midsole.name = "midsole";
  root.add(midsole);

  const upperShape = new THREE.Shape();
  upperShape.moveTo(-1.43, 0.34);
  upperShape.lineTo(1.31, 0.34);
  upperShape.bezierCurveTo(1.42, 0.35, 1.46, 0.47, 1.39, 0.59);
  upperShape.bezierCurveTo(1.29, 0.72, 1.04, 0.77, 0.78, 0.82);
  upperShape.bezierCurveTo(0.52, 0.87, 0.30, 1.00, 0.08, 1.12);
  upperShape.bezierCurveTo(-0.10, 1.23, -0.25, 1.28, -0.37, 1.22);
  upperShape.bezierCurveTo(-0.50, 1.14, -0.58, 0.94, -0.74, 0.87);
  upperShape.bezierCurveTo(-0.89, 0.81, -0.99, 0.84, -1.08, 0.93);
  upperShape.bezierCurveTo(-1.18, 1.04, -1.22, 1.19, -1.34, 1.22);
  upperShape.bezierCurveTo(-1.43, 1.20, -1.46, 1.00, -1.45, 0.80);
  upperShape.bezierCurveTo(-1.45, 0.60, -1.44, 0.43, -1.43, 0.34);
  upperShape.closePath();

  const upperGeom = createSideExtrude(upperShape, 0.72, 0.045, 0.045);
  const upper = new THREE.Mesh(upperGeom, upperMat);
  upper.name = "upper";
  root.add(upper);

  const toe_boxGeom = new THREE.SphereGeometry(1, 32, 18);
  const toe_box = new THREE.Mesh(toe_boxGeom, upperMat);
  toe_box.position.set(0, 0.58, 0.88);
  toe_box.scale.set(0.39, 0.25, 0.59);
  toe_box.name = "toe_box";
  root.add(toe_box);

  const heel_counterShape = createHeelCounterShape();
  const heel_counterGeom = createSideExtrude(
    heel_counterShape,
    0.66,
    0.035,
    0.035
  );
  const heel_counter = new THREE.Mesh(heel_counterGeom, upperMat);
  heel_counter.position.z = -1.03;
  heel_counter.name = "heel_counter";
  root.add(heel_counter);

  const heel_bumperGeom = new THREE.SphereGeometry(1, 28, 16);
  const heel_bumper = new THREE.Mesh(heel_bumperGeom, panelMat);
  heel_bumper.position.set(0, 0.66, -1.36);
  heel_bumper.scale.set(0.34, 0.34, 0.17);
  heel_bumper.name = "heel_bumper";
  root.add(heel_bumper);

  const collar_openingGeom = new THREE.SphereGeometry(1, 28, 14);
  const collar_opening = new THREE.Mesh(collar_openingGeom, seamMat);
  collar_opening.position.set(0, 1.145, -0.69);
  collar_opening.scale.set(0.27, 0.035, 0.43);
  collar_opening.name = "collar_opening";
  root.add(collar_opening);

  const collarPoints = [];
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    collarPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.31,
        1.15 + Math.abs(Math.cos(angle)) * 0.035,
        -0.69 + Math.sin(angle) * 0.43
      )
    );
  }
  const collar_trim = createTube(
    collarPoints,
    0.035,
    highlightMat,
    64,
    true
  );
  collar_trim.name = "collar_trim";
  root.add(collar_trim);

  const tongueShape = new THREE.Shape();
  tongueShape.moveTo(-0.20, -0.42);
  tongueShape.bezierCurveTo(-0.25, -0.42, -0.28, -0.37, -0.28, -0.30);
  tongueShape.lineTo(-0.28, 0.31);
  tongueShape.bezierCurveTo(-0.28, 0.39, -0.24, 0.43, -0.18, 0.43);
  tongueShape.lineTo(0.18, 0.43);
  tongueShape.bezierCurveTo(0.24, 0.43, 0.28, 0.39, 0.28, 0.31);
  tongueShape.lineTo(0.28, -0.30);
  tongueShape.bezierCurveTo(0.28, -0.37, 0.25, -0.42, 0.20, -0.42);
  tongueShape.closePath();

  const tongueGeom = new THREE.ExtrudeGeometry(tongueShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.018,
    bevelThickness: 0.015,
  });
  tongueGeom.translate(0, 0, -0.0225);
  const tongue = new THREE.Mesh(tongueGeom, upperMat);
  tongue.position.set(0, 1.07, 0.14);
  tongue.rotation.x = -0.95;
  tongue.name = "tongue";
  root.add(tongue);

  const tongue_labelGeom = new THREE.BoxGeometry(0.16, 0.08, 0.018);
  const tongue_label = new THREE.Mesh(tongue_labelGeom, panelMat);
  tongue_label.position.set(0, 0.28, 0.045);
  tongue_label.name = "tongue_label";
  tongue.add(tongue_label);

  const lateralPanelShape = new THREE.Shape();
  lateralPanelShape.moveTo(-0.76, 0.40);
  lateralPanelShape.lineTo(0.91, 0.40);
  lateralPanelShape.bezierCurveTo(0.84, 0.51, 0.72, 0.61, 0.54, 0.68);
  lateralPanelShape.bezierCurveTo(0.28, 0.78, -0.02, 0.84, -0.30, 0.77);
  lateralPanelShape.bezierCurveTo(-0.52, 0.71, -0.68, 0.57, -0.76, 0.40);
  lateralPanelShape.closePath();
  const lateral_panelGeom = createSidePanel(lateralPanelShape);
  const lateral_panel = createSidePair(
    lateral_panelGeom,
    panelMat,
    0.405,
    "lateral_panel"
  );

  const medialPanelShape = new THREE.Shape();
  medialPanelShape.moveTo(-0.76, 0.40);
  medialPanelShape.lineTo(0.91, 0.40);
  medialPanelShape.bezierCurveTo(0.84, 0.51, 0.72, 0.61, 0.54, 0.68);
  medialPanelShape.bezierCurveTo(0.28, 0.78, -0.02, 0.84, -0.30, 0.77);
  medialPanelShape.bezierCurveTo(-0.52, 0.71, -0.68, 0.57, -0.76, 0.40);
  medialPanelShape.closePath();
  const medial_panelGeom = createSidePanel(medialPanelShape);
  const medial_panel = createSidePair(
    medial_panelGeom,
    panelMat,
    0.405,
    "medial_panel"
  );

  const heelPanelShape = new THREE.Shape();
  heelPanelShape.moveTo(-1.42, 0.40);
  heelPanelShape.lineTo(-0.66, 0.40);
  heelPanelShape.bezierCurveTo(-0.59, 0.50, -0.54, 0.61, -0.47, 0.69);
  heelPanelShape.bezierCurveTo(-0.67, 0.78, -0.91, 0.84, -1.08, 0.92);
  heelPanelShape.lineTo(-1.39, 0.78);
  heelPanelShape.closePath();
  const heel_panelGeom = createSidePanel(heelPanelShape);
  const heel_panel = createSidePair(
    heel_panelGeom,
    panelMat,
    0.378,
    "heel_panel"
  );

  const eyestayPanelShape = new THREE.Shape();
  eyestayPanelShape.moveTo(-0.34, 1.17);
  eyestayPanelShape.bezierCurveTo(-0.12, 1.13, 0.24, 0.99, 0.66, 0.84);
  eyestayPanelShape.lineTo(0.58, 0.77);
  eyestayPanelShape.bezierCurveTo(0.23, 0.88, -0.08, 1.01, -0.31, 1.08);
  eyestayPanelShape.closePath();
  const eyestay_panelGeom = createSidePanel(eyestayPanelShape);
  const eyestay_panel = createSidePair(
    eyestay_panelGeom,
    highlightMat,
    0.414,
    "eyestay_panel"
  );

  const lateralStitchSegments = [];
  const medialStitchSegments = [];
  for (const side of [-1, 1]) {
    lateralStitchSegments.push([
      new THREE.Vector3(side * 0.417, 0.42, -0.72),
      new THREE.Vector3(side * 0.417, 0.66, -0.53),
    ]);
    lateralStitchSegments.push([
      new THREE.Vector3(side * 0.417, 0.66, -0.53),
      new THREE.Vector3(side * 0.417, 0.77, -0.28),
    ]);
    lateralStitchSegments.push([
      new THREE.Vector3(side * 0.417, 0.42, 0.88),
      new THREE.Vector3(side * 0.417, 0.66, 0.57),
    ]);
    lateralStitchSegments.push([
      new THREE.Vector3(side * 0.417, 0.66, 0.57),
      new THREE.Vector3(side * 0.417, 0.78, 0.28),
    ]);
    medialStitchSegments.push([
      new THREE.Vector3(side * 0.417, 1.17, -0.31),
      new THREE.Vector3(side * 0.417, 1.08, 0.02),
    ]);
    medialStitchSegments.push([
      new THREE.Vector3(side * 0.417, 1.08, 0.02),
      new THREE.Vector3(side * 0.417, 0.94, 0.35),
    ]);
    medialStitchSegments.push([
      new THREE.Vector3(side * 0.417, 0.94, 0.35),
      new THREE.Vector3(side * 0.417, 0.82, 0.64),
    ]);
  }

  const lateral_stitching = createSegmentInstances(
    lateralStitchSegments,
    0.008,
    seamMat,
    "lateral_stitching"
  );
  const medial_stitching = createSegmentInstances(
    medialStitchSegments,
    0.008,
    seamMat,
    "medial_stitching"
  );

  const heelCounterTrimPoints = [
    new THREE.Vector3(-0.37, 0.74, -1.38),
    new THREE.Vector3(-0.35, 1.02, -1.31),
    new THREE.Vector3(-0.24, 1.19, -1.20),
    new THREE.Vector3(0, 1.25, -1.13),
    new THREE.Vector3(0.24, 1.19, -1.20),
    new THREE.Vector3(0.35, 1.02, -1.31),
    new THREE.Vector3(0.37, 0.74, -1.38),
  ];
  const heel_counter_trim = createTube(
    heelCounterTrimPoints,
    0.022,
    highlightMat,
    36,
    false
  );
  heel_counter_trim.name = "heel_counter_trim";
  root.add(heel_counter_trim);

  const toeCapSeamPoints = [
    new THREE.Vector3(-0.36, 0.62, 1.28),
    new THREE.Vector3(-0.26, 0.76, 1.22),
    new THREE.Vector3(0, 0.82, 1.18),
    new THREE.Vector3(0.26, 0.76, 1.22),
    new THREE.Vector3(0.36, 0.62, 1.28),
  ];
  const toe_cap_seam = createTube(
    toeCapSeamPoints,
    0.010,
    seamMat,
    28,
    false
  );
  toe_cap_seam.name = "toe_cap_seam";
  root.add(toe_cap_seam);

  const eyeletGeom = new THREE.TorusGeometry(0.045, 0.011, 8, 18);
  const eyelets = new THREE.InstancedMesh(eyeletGeom, seamMat, 8);
  const eyeletDummy = new THREE.Object3D();
  const eyeletRows = [
    { z: -0.18, y: 1.17 },
    { z: 0.07, y: 1.08 },
    { z: 0.31, y: 0.99 },
    { z: 0.54, y: 0.90 },
  ];
  let eyeletIndex = 0;
  for (const side of [-1, 1]) {
    for (const row of eyeletRows) {
      eyeletDummy.position.set(side * 0.421, row.y, row.z);
      eyeletDummy.rotation.set(0, side * Math.PI / 2, 0);
      eyeletDummy.scale.set(1, 1, 1);
      eyeletDummy.updateMatrix();
      eyelets.setMatrixAt(eyeletIndex++, eyeletDummy.matrix);
    }
  }
  eyelets.instanceMatrix.needsUpdate = true;
  eyelets.name = "eyelets";
  root.add(eyelets);

  const laceSegments = [
    [new THREE.Vector3(-0.25, 1.205, -0.18), new THREE.Vector3(0.25, 1.145, 0.07)],
    [new THREE.Vector3(0.25, 1.205, -0.18), new THREE.Vector3(-0.25, 1.145, 0.07)],
    [new THREE.Vector3(-0.25, 1.115, 0.07), new THREE.Vector3(0.25, 1.055, 0.31)],
    [new THREE.Vector3(0.25, 1.115, 0.07), new THREE.Vector3(-0.25, 1.055, 0.31)],
    [new THREE.Vector3(-0.25, 1.025, 0.31), new THREE.Vector3(0.25, 0.965, 0.54)],
    [new THREE.Vector3(0.25, 1.025, 0.31), new THREE.Vector3(-0.25, 0.965, 0.54)],
  ];
  const lace_crossings = createSegmentInstances(
    laceSegments,
    0.022,
    highlightMat,
    "lace_crossings"
  );

  const lace_loop_left = createTube(
    [
      new THREE.Vector3(-0.08, 1.205, -0.18),
      new THREE.Vector3(-0.25, 1.285, -0.27),
      new THREE.Vector3(-0.39, 1.235, -0.15),
      new THREE.Vector3(-0.28, 1.165, -0.04),
      new THREE.Vector3(-0.10, 1.19, -0.13),
    ],
    0.022,
    highlightMat,
    30,
    false
  );
  lace_loop_left.name = "lace_loop_left";
  root.add(lace_loop_left);

  const lace_loop_right = createTube(
    [
      new THREE.Vector3(0.08, 1.205, -0.18),
      new THREE.Vector3(0.25, 1.285, -0.27),
      new THREE.Vector3(0.39, 1.235, -0.15),
      new THREE.Vector3(0.28, 1.165, -0.04),
      new THREE.Vector3(0.10, 1.19, -0.13),
    ],
    0.022,
    highlightMat,
    30,
    false
  );
  lace_loop_right.name = "lace_loop_right";
  root.add(lace_loop_right);

  const lace_knotGeom = new THREE.SphereGeometry(0.055, 16, 10);
  const lace_knot = new THREE.Mesh(lace_knotGeom, highlightMat);
  lace_knot.position.set(0, 1.22, -0.16);
  lace_knot.scale.set(1.2, 0.75, 0.8);
  lace_knot.name = "lace_knot";
  root.add(lace_knot);

  const silverStripePoints = [
    new THREE.Vector3(-0.35, 0.365, -1.45),
    new THREE.Vector3(-0.45, 0.365, -1.25),
    new THREE.Vector3(-0.48, 0.365, -0.65),
    new THREE.Vector3(-0.51, 0.365, 0.10),
    new THREE.Vector3(-0.50, 0.365, 0.80),
    new THREE.Vector3(-0.42, 0.365, 1.35),
    new THREE.Vector3(-0.25, 0.365, 1.49),
    new THREE.Vector3(0, 0.365, 1.53),
    new THREE.Vector3(0.25, 0.365, 1.49),
    new THREE.Vector3(0.42, 0.365, 1.35),
    new THREE.Vector3(0.50, 0.365, 0.80),
    new THREE.Vector3(0.51, 0.365, 0.10),
    new THREE.Vector3(0.48, 0.365, -0.65),
    new THREE.Vector3(0.45, 0.365, -1.25),
    new THREE.Vector3(0.35, 0.365, -1.45),
    new THREE.Vector3(0, 0.365, -1.50),
  ];
  const silver_top_stripe = createTube(
    silverStripePoints,
    0.026,
    polishedTrimMat,
    80,
    true
  );
  silver_top_stripe.name = "silver_top_stripe";
  root.add(silver_top_stripe);

  const forefootInsetShape = new THREE.Shape();
  forefootInsetShape.moveTo(-0.42, 0.11);
  forefootInsetShape.lineTo(0.42, 0.11);
  forefootInsetShape.lineTo(0.34, 0.30);
  forefootInsetShape.lineTo(-0.34, 0.30);
  forefootInsetShape.closePath();
  const forefoot_midsole_insetGeom = createSidePanel(forefootInsetShape);
  const forefoot_midsole_inset = createSidePair(
    forefoot_midsole_insetGeom,
    brushedInsetMat,
    0.505,
    "forefoot_midsole_inset"
  );

  const heelInsetShape = new THREE.Shape();
  heelInsetShape.moveTo(-1.35, 0.12);
  heelInsetShape.lineTo(-0.72, 0.12);
  heelInsetShape.lineTo(-0.63, 0.29);
  heelInsetShape.lineTo(-1.25, 0.29);
  heelInsetShape.closePath();
  const heel_midsole_insetGeom = createSidePanel(heelInsetShape);
  const heel_midsole_inset = createSidePair(
    heel_midsole_insetGeom,
    brushedInsetMat,
    0.475,
    "heel_midsole_inset"
  );

  const grooveSegments = [];
  for (const side of [-1, 1]) {
    grooveSegments.push([
      new THREE.Vector3(side * 0.516, 0.12, -0.42),
      new THREE.Vector3(side * 0.516, 0.30, -0.32),
    ]);
    grooveSegments.push([
      new THREE.Vector3(side * 0.516, 0.12, 0.42),
      new THREE.Vector3(side * 0.516, 0.30, 0.32),
    ]);
  }
  const midsole_grooves = createSegmentInstances(
    grooveSegments,
    0.009,
    grooveMat,
    "midsole_grooves"
  );

  const treadGeom = new THREE.BoxGeometry(0.16, 0.055, 0.13);
  const tread_lugs = new THREE.InstancedMesh(treadGeom, outsoleMat, 24);
  const treadDummy = new THREE.Object3D();
  let treadIndex = 0;
  for (let i = 0; i < 12; i++) {
    const z = -1.32 + (i / 11) * 2.64;
    const width = soleHalfWidthAt(z);
    for (const side of [-1, 1]) {
      treadDummy.position.set(side * width * 0.63, -0.012, z);
      treadDummy.rotation.set(0, side * (i % 2 === 0 ? 0.09 : -0.09), 0);
      treadDummy.scale.set(1, 1, 1);
      treadDummy.updateMatrix();
      tread_lugs.setMatrixAt(treadIndex++, treadDummy.matrix);
    }
  }
  tread_lugs.instanceMatrix.needsUpdate = true;
  tread_lugs.name = "tread_lugs";
  root.add(tread_lugs);

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