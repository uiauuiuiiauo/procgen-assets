export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "quill_and_wooden_box";

  const box_group = new THREE.Group();
  box_group.name = "box_group";
  root.add(box_group);

  const outerW = 2.70;
  const outerD = 1.78;
  const wallT = 0.14;
  const wallH = 0.42;
  const wallY = 0.34;
  const frontZ = outerD / 2 - wallT / 2;
  const sideX = outerW / 2 - wallT / 2;
  const innerW = outerW - wallT * 2;
  const innerD = outerD - wallT * 2;
  const floorTop = 0.235;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x9b6038,
    metalness: 0.0,
    roughness: 0.6
  });
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0xb77a48,
    metalness: 0.0,
    roughness: 0.6
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x603820,
    metalness: 0.0,
    roughness: 0.9
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x40271b,
    metalness: 0.0,
    roughness: 0.9
  });
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0x4b3529,
    metalness: 0.0,
    roughness: 0.95
  });
  const grainMat = new THREE.LineBasicMaterial({
    color: 0x5c3824,
    transparent: true,
    opacity: 0.38
  });

  const bottom_panelGeom = new THREE.BoxGeometry(outerW, 0.12, outerD);
  const bottom_panel = new THREE.Mesh(bottom_panelGeom, darkWoodMat);
  bottom_panel.name = "bottom_panel";
  bottom_panel.position.y = 0.06;
  box_group.add(bottom_panel);

  const interior_floorGeom = new THREE.BoxGeometry(innerW, 0.10, innerD);
  const interior_floor = new THREE.Mesh(interior_floorGeom, floorMat);
  interior_floor.name = "interior_floor";
  interior_floor.position.y = 0.185;
  box_group.add(interior_floor);

  const front_panelGeom = new THREE.BoxGeometry(outerW, wallH, wallT);
  const front_panel = new THREE.Mesh(front_panelGeom, woodMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, wallY, frontZ);
  box_group.add(front_panel);

  const back_panelGeom = new THREE.BoxGeometry(outerW, wallH, wallT);
  const back_panel = new THREE.Mesh(back_panelGeom, woodMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, wallY, -frontZ);
  box_group.add(back_panel);

  const left_panelGeom = new THREE.BoxGeometry(wallT, wallH, innerD);
  const left_panel = new THREE.Mesh(left_panelGeom, woodMat);
  left_panel.name = "left_panel";
  left_panel.position.set(-sideX, wallY, 0);
  box_group.add(left_panel);

  const right_panelGeom = new THREE.BoxGeometry(wallT, wallH, innerD);
  const right_panel = new THREE.Mesh(right_panelGeom, woodMat);
  right_panel.name = "right_panel";
  right_panel.position.set(sideX, wallY, 0);
  box_group.add(right_panel);

  const front_rimGeom = new THREE.BoxGeometry(outerW + 0.02, 0.10, wallT + 0.02);
  const front_rim = new THREE.Mesh(front_rimGeom, floorMat);
  front_rim.name = "front_rim";
  front_rim.position.set(0, 0.58, frontZ);
  box_group.add(front_rim);

  const back_rimGeom = new THREE.BoxGeometry(outerW + 0.02, 0.10, wallT + 0.02);
  const back_rim = new THREE.Mesh(back_rimGeom, floorMat);
  back_rim.name = "back_rim";
  back_rim.position.set(0, 0.58, -frontZ);
  box_group.add(back_rim);

  const left_rimGeom = new THREE.BoxGeometry(wallT + 0.02, 0.10, innerD);
  const left_rim = new THREE.Mesh(left_rimGeom, floorMat);
  left_rim.name = "left_rim";
  left_rim.position.set(-sideX, 0.58, 0);
  box_group.add(left_rim);

  const right_rimGeom = new THREE.BoxGeometry(wallT + 0.02, 0.10, innerD);
  const right_rim = new THREE.Mesh(right_rimGeom, floorMat);
  right_rim.name = "right_rim";
  right_rim.position.set(sideX, 0.58, 0);
  box_group.add(right_rim);

  const front_inner_shadowGeom = new THREE.BoxGeometry(innerW - 0.08, 0.025, 0.025);
  const front_inner_shadow = new THREE.Mesh(front_inner_shadowGeom, darkWoodMat);
  front_inner_shadow.name = "front_inner_shadow";
  front_inner_shadow.position.set(0, 0.525, frontZ - wallT / 2 - 0.008);
  box_group.add(front_inner_shadow);

  const back_inner_shadowGeom = new THREE.BoxGeometry(innerW - 0.08, 0.025, 0.025);
  const back_inner_shadow = new THREE.Mesh(back_inner_shadowGeom, darkWoodMat);
  back_inner_shadow.name = "back_inner_shadow";
  back_inner_shadow.position.set(0, 0.525, -frontZ + wallT / 2 + 0.008);
  box_group.add(back_inner_shadow);

  const left_inner_shadowGeom = new THREE.BoxGeometry(0.025, 0.025, innerD - 0.08);
  const left_inner_shadow = new THREE.Mesh(left_inner_shadowGeom, darkWoodMat);
  left_inner_shadow.name = "left_inner_shadow";
  left_inner_shadow.position.set(-sideX + wallT / 2 + 0.008, 0.525, 0);
  box_group.add(left_inner_shadow);

  const right_inner_shadowGeom = new THREE.BoxGeometry(0.025, 0.025, innerD - 0.08);
  const right_inner_shadow = new THREE.Mesh(right_inner_shadowGeom, darkWoodMat);
  right_inner_shadow.name = "right_inner_shadow";
  right_inner_shadow.position.set(sideX - wallT / 2 - 0.008, 0.525, 0);
  box_group.add(right_inner_shadow);

  const up = new THREE.Vector3(0, 1, 0);
  const segmentMatrix = new THREE.Matrix4();
  const segmentQuat = new THREE.Quaternion();
  const segmentScale = new THREE.Vector3();
  const segmentCenter = new THREE.Vector3();
  const segmentDirection = new THREE.Vector3();

  function setSegmentInstance(mesh, index, p1, p2) {
    segmentDirection.subVectors(p2, p1);
    const length = segmentDirection.length();
    segmentCenter.copy(p1).add(p2).multiplyScalar(0.5);
    segmentQuat.setFromUnitVectors(up, segmentDirection.normalize());
    segmentScale.set(1, length, 1);
    segmentMatrix.compose(segmentCenter, segmentQuat, segmentScale);
    mesh.setMatrixAt(index, segmentMatrix);
  }

  const latticeSegments = [];
  const latticeHalfW = outerW / 2 - 0.07;
  const latticeHalfD = outerD / 2 - 0.07;
  const latticeY0 = 0.18;
  const latticeY1 = 0.51;

  function addClippedLine(slope, intercept) {
    const candidates = [];

    function addCandidate(u, y) {
      if (u < -latticeHalfW - 0.0001 || u > latticeHalfW + 0.0001) return;
      if (y < latticeY0 - 0.0001 || y > latticeY1 + 0.0001) return;
      for (let i = 0; i < candidates.length; i++) {
        const d = candidates[i];
        if (Math.abs(d.x - u) < 0.0001 && Math.abs(d.y - y) < 0.0001) return;
      }
      candidates.push(new THREE.Vector2(u, y));
    }

    addCandidate(-latticeHalfW, slope * -latticeHalfW + intercept);
    addCandidate(latticeHalfW, slope * latticeHalfW + intercept);
    addCandidate((latticeY0 - intercept) / slope, latticeY0);
    addCandidate((latticeY1 - intercept) / slope, latticeY1);

    if (candidates.length >= 2) {
      latticeSegments.push([
        new THREE.Vector3(candidates[0].x, candidates[0].y, outerD / 2 + 0.012),
        new THREE.Vector3(candidates[1].x, candidates[1].y, outerD / 2 + 0.012)
      ]);
    }
  }

  for (let i = 0; i < 9; i++) {
    const intercept = -0.65 + i * 0.19;
    addClippedLine(0.68, intercept);
    addClippedLine(-0.68, intercept);
  }

  const lattice_cordsGeom = new THREE.CylinderGeometry(0.011, 0.011, 1, 7);
  const lattice_cords = new THREE.InstancedMesh(lattice_cordsGeom, cordMat, latticeSegments.length);
  lattice_cords.name = "lattice_cords";
  for (let i = 0; i < latticeSegments.length; i++) {
    setSegmentInstance(lattice_cords, i, latticeSegments[i][0], latticeSegments[i][1]);
  }
  lattice_cords.instanceMatrix.needsUpdate = true;
  box_group.add(lattice_cords);

  const borderSegments = [];
  function addBorderSegment(p1, p2) {
    borderSegments.push([p1, p2]);
  }

  const borderY0 = 0.145;
  const borderY1 = 0.545;
  const borderX = outerW / 2 - 0.025;
  const borderZ = outerD / 2 + 0.018;

  addBorderSegment(
    new THREE.Vector3(-borderX, borderY0, borderZ),
    new THREE.Vector3(borderX, borderY0, borderZ)
  );
  addBorderSegment(
    new THREE.Vector3(-borderX, borderY1, borderZ),
    new THREE.Vector3(borderX, borderY1, borderZ)
  );
  addBorderSegment(
    new THREE.Vector3(-borderX, borderY0, -borderZ),
    new THREE.Vector3(borderX, borderY0, -borderZ)
  );
  addBorderSegment(
    new THREE.Vector3(-borderX, borderY1, -borderZ),
    new THREE.Vector3(borderX, borderY1, -borderZ)
  );
  for (const x of [-borderX, borderX]) {
    addBorderSegment(
      new THREE.Vector3(x, borderY0, -borderZ),
      new THREE.Vector3(x, borderY0, borderZ)
    );
    addBorderSegment(
      new THREE.Vector3(x, borderY1, -borderZ),
      new THREE.Vector3(x, borderY1, borderZ)
    );
  }

  const border_cordsGeom = new THREE.CylinderGeometry(0.014, 0.014, 1, 8);
  const border_cords = new THREE.InstancedMesh(border_cordsGeom, cordMat, borderSegments.length);
  border_cords.name = "border_cords";
  for (let i = 0; i < borderSegments.length; i++) {
    setSegmentInstance(border_cords, i, borderSegments[i][0], borderSegments[i][1]);
  }
  border_cords.instanceMatrix.needsUpdate = true;
  box_group.add(border_cords);

  const knotGeom = new THREE.SphereGeometry(0.021, 8, 6);
  const lattice_knots = new THREE.InstancedMesh(knotGeom, cordMat, latticeSegments.length);
  lattice_knots.name = "lattice_knots";
  const knotDummy = new THREE.Object3D();
  for (let i = 0; i < latticeSegments.length; i++) {
    const p1 = latticeSegments[i][0];
    const p2 = latticeSegments[i][1];
    knotDummy.position.copy(p1).add(p2).multiplyScalar(0.5);
    knotDummy.position.z += 0.006;
    knotDummy.scale.set(1.0, 0.82, 0.65);
    knotDummy.updateMatrix();
    lattice_knots.setMatrixAt(i, knotDummy.matrix);
  }
  lattice_knots.instanceMatrix.needsUpdate = true;
  box_group.add(lattice_knots);

  const floorGrainPoints = [];
  const floorGrainX = innerW / 2 - 0.07;
  const floorGrainZ = innerD / 2 - 0.07;
  for (let i = 0; i < 18; i++) {
    const baseZ = -floorGrainZ + (i + 0.5) * (floorGrainZ * 2 / 18);
    for (let j = 0; j < 12; j++) {
      const x0 = -floorGrainX + j * (floorGrainX * 2 / 12);
      const x1 = -floorGrainX + (j + 1) * (floorGrainX * 2 / 12);
      const z0 = baseZ + Math.sin(i * 1.37 + j * 0.73) * 0.010;
      const z1 = baseZ + Math.sin(i * 1.37 + (j + 1) * 0.73) * 0.010;
      floorGrainPoints.push(
        new THREE.Vector3(x0, floorTop + 0.004, z0),
        new THREE.Vector3(x1, floorTop + 0.004, z1)
      );
    }
  }
  const floor_grainGeom = new THREE.BufferGeometry().setFromPoints(floorGrainPoints);
  const floor_grain = new THREE.LineSegments(floor_grainGeom, grainMat);
  floor_grain.name = "floor_grain";
  box_group.add(floor_grain);

  const wallGrainPoints = [];
  for (let row = 0; row < 8; row++) {
    const baseY = 0.18 + row * 0.043;
    for (let j = 0; j < 13; j++) {
      const x0 = -1.22 + j * (2.44 / 13);
      const x1 = -1.22 + (j + 1) * (2.44 / 13);
      const y0 = baseY + Math.sin(row * 1.1 + j * 0.62) * 0.006;
      const y1 = baseY + Math.sin(row * 1.1 + (j + 1) * 0.62) * 0.006;
      wallGrainPoints.push(
        new THREE.Vector3(x0, y0, outerD / 2 + 0.004),
        new THREE.Vector3(x1, y1, outerD / 2 + 0.004),
        new THREE.Vector3(x0, y0, -outerD / 2 - 0.004),
        new THREE.Vector3(x1, y1, -outerD / 2 - 0.004)
      );
    }
  }
  for (const side of [-1, 1]) {
    for (let row = 0; row < 8; row++) {
      const baseY = 0.18 + row * 0.043;
      for (let j = 0; j < 8; j++) {
        const z0 = -0.70 + j * (1.40 / 8);
        const z1 = -0.70 + (j + 1) * (1.40 / 8);
        const y0 = baseY + Math.sin(row * 0.91 + j * 0.68) * 0.006;
        const y1 = baseY + Math.sin(row * 0.91 + (j + 1) * 0.68) * 0.006;
        wallGrainPoints.push(
          new THREE.Vector3(side * (outerW / 2 + 0.004), y0, z0),
          new THREE.Vector3(side * (outerW / 2 + 0.004), y1, z1)
        );
      }
    }
  }
  const wall_grainGeom = new THREE.BufferGeometry().setFromPoints(wallGrainPoints);
  const wall_grain = new THREE.LineSegments(wall_grainGeom, grainMat);
  wall_grain.name = "wall_grain";
  box_group.add(wall_grain);

  const front_wood_knotGeom = new THREE.TorusGeometry(0.045, 0.008, 7, 20);
  const front_wood_knot = new THREE.Mesh(front_wood_knotGeom, grooveMat);
  front_wood_knot.name = "front_wood_knot";
  front_wood_knot.position.set(-0.72, 0.34, outerD / 2 + 0.011);
  front_wood_knot.scale.set(1.0, 0.55, 1.0);
  box_group.add(front_wood_knot);

  const back_wood_knotGeom = new THREE.TorusGeometry(0.035, 0.007, 7, 18);
  const back_wood_knot = new THREE.Mesh(back_wood_knotGeom, grooveMat);
  back_wood_knot.name = "back_wood_knot";
  back_wood_knot.position.set(0.48, 0.39, -outerD / 2 - 0.011);
  back_wood_knot.scale.set(1.0, 0.55, 1.0);
  box_group.add(back_wood_knot);

  const floor_wood_knotGeom = new THREE.TorusGeometry(0.032, 0.006, 7, 18);
  const floor_wood_knot = new THREE.Mesh(floor_wood_knotGeom, grooveMat);
  floor_wood_knot.name = "floor_wood_knot";
  floor_wood_knot.rotation.x = Math.PI / 2;
  floor_wood_knot.position.set(0.62, floorTop + 0.006, -0.18);
  floor_wood_knot.scale.set(1.35, 0.65, 1.0);
  box_group.add(floor_wood_knot);

  const front_latch_recessGeom = new THREE.SphereGeometry(1, 16, 10);
  const front_latch_recess = new THREE.Mesh(front_latch_recessGeom, grooveMat);
  front_latch_recess.name = "front_latch_recess";
  front_latch_recess.position.set(-0.72, 0.34, outerD / 2 + 0.018);
  front_latch_recess.scale.set(0.105, 0.070, 0.025);
  box_group.add(front_latch_recess);

  const front_latch_tongueGeom = new THREE.CylinderGeometry(0.028, 0.035, 0.12, 10);
  const front_latch_tongue = new THREE.Mesh(front_latch_tongueGeom, darkWoodMat);
  front_latch_tongue.name = "front_latch_tongue";
  front_latch_tongue.rotation.x = Math.PI / 2;
  front_latch_tongue.position.set(-0.72, 0.31, outerD / 2 + 0.075);
  box_group.add(front_latch_tongue);

  const front_latch_pinGeom = new THREE.CylinderGeometry(0.020, 0.020, 0.13, 10);
  const front_latch_pin = new THREE.Mesh(front_latch_pinGeom, darkWoodMat);
  front_latch_pin.name = "front_latch_pin";
  front_latch_pin.rotation.z = Math.PI / 2;
  front_latch_pin.position.set(-0.72, 0.36, outerD / 2 + 0.075);
  box_group.add(front_latch_pin);

  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xd8cbb7,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const featherShaftMat = new THREE.MeshStandardMaterial({
    color: 0xeee5d2,
    metalness: 0.0,
    roughness: 0.7
  });
  const featherBarbMat = new THREE.LineBasicMaterial({
    color: 0xb7a58e,
    transparent: true,
    opacity: 0.62
  });
  const nibMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xb58a2a,
    metalness: 0.6,
    roughness: 0.2
  });

  const feather_group = new THREE.Group();
  feather_group.name = "feather_group";
  feather_group.position.set(-0.72, floorTop + 0.025, 0.42);

  const featherDirection = new THREE.Vector3(0.78, 0.56, -0.27).normalize();
  feather_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    featherDirection
  );

  const featherVaneShape = new THREE.Shape();
  featherVaneShape.moveTo(0, 0.43);
  featherVaneShape.lineTo(-0.035, 0.55);
  featherVaneShape.lineTo(-0.075, 0.66);
  featherVaneShape.lineTo(-0.055, 0.70);
  featherVaneShape.lineTo(-0.110, 0.82);
  featherVaneShape.lineTo(-0.080, 0.86);
  featherVaneShape.lineTo(-0.145, 1.02);
  featherVaneShape.lineTo(-0.110, 1.07);
  featherVaneShape.lineTo(-0.170, 1.28);
  featherVaneShape.lineTo(-0.130, 1.34);
  featherVaneShape.lineTo(-0.180, 1.55);
  featherVaneShape.lineTo(-0.140, 1.62);
  featherVaneShape.lineTo(-0.150, 1.82);
  featherVaneShape.lineTo(-0.110, 1.98);
  featherVaneShape.lineTo(-0.060, 2.14);
  featherVaneShape.lineTo(0, 2.28);
  featherVaneShape.lineTo(0.055, 2.17);
  featherVaneShape.lineTo(0.090, 2.02);
  featherVaneShape.lineTo(0.120, 1.84);
  featherVaneShape.lineTo(0.100, 1.78);
  featherVaneShape.lineTo(0.160, 1.60);
  featherVaneShape.lineTo(0.130, 1.54);
  featherVaneShape.lineTo(0.190, 1.33);
  featherVaneShape.lineTo(0.145, 1.27);
  featherVaneShape.lineTo(0.170, 1.08);
  featherVaneShape.lineTo(0.130, 1.02);
  featherVaneShape.lineTo(0.120, 0.84);
  featherVaneShape.lineTo(0.080, 0.79);
  featherVaneShape.lineTo(0.070, 0.65);
  featherVaneShape.lineTo(0.035, 0.54);
  featherVaneShape.closePath();

  const feather_vaneGeom = new THREE.ShapeGeometry(featherVaneShape, 1);
  const feather_vane = new THREE.Mesh(feather_vaneGeom, featherMat);
  feather_vane.name = "feather_vane";
  feather_group.add(feather_vane);

  const featherShaftPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.000, 0.20, 0.018),
    new THREE.Vector3(0.005, 0.65, 0.018),
    new THREE.Vector3(-0.004, 1.15, 0.018),
    new THREE.Vector3(0.004, 1.65, 0.018),
    new THREE.Vector3(0.000, 2.245, 0.018)
  ]);
  const feather_shaftGeom = new THREE.TubeGeometry(featherShaftPath, 48, 0.012, 8, false);
  const feather_shaft = new THREE.Mesh(feather_shaftGeom, featherShaftMat);
  feather_shaft.name = "feather_shaft";
  feather_group.add(feather_shaft);

  const barbPoints = [];
  for (let i = 0; i < 25; i++) {
    const y = 0.62 + i * (1.50 / 24);
    const t = (y - 0.58) / 1.67;
    const envelope = 0.045 + 0.145 * Math.sin(Math.PI * t);
    const centerX = Math.sin(i * 0.77) * 0.003;
    barbPoints.push(
      new THREE.Vector3(centerX, y, 0.025),
      new THREE.Vector3(-envelope, y + 0.055, 0.025),
      new THREE.Vector3(centerX, y, 0.025),
      new THREE.Vector3(envelope * 0.92, y + 0.070, 0.025)
    );
  }
  for (let i = 0; i < 7; i++) {
    const y = 0.47 + i * 0.035;
    const width = 0.045 + i * 0.010;
    barbPoints.push(
      new THREE.Vector3(0, y, 0.026),
      new THREE.Vector3(-width, y - 0.075, 0.026),
      new THREE.Vector3(0, y, 0.026),
      new THREE.Vector3(width * 0.85, y - 0.065, 0.026)
    );
  }
  const feather_barbsGeom = new THREE.BufferGeometry().setFromPoints(barbPoints);
  const feather_barbs = new THREE.LineSegments(feather_barbsGeom, featherBarbMat);
  feather_barbs.name = "feather_barbs";
  feather_group.add(feather_barbs);

  const metal_nibGeom = new THREE.ConeGeometry(0.055, 0.46, 16);
  const metal_nib = new THREE.Mesh(metal_nibGeom, nibMat);
  metal_nib.name = "metal_nib";
  metal_nib.rotation.z = Math.PI;
  metal_nib.position.set(0, 0.23, 0.012);
  feather_group.add(metal_nib);

  const nib_tipGeom = new THREE.SphereGeometry(0.022, 10, 7);
  const nib_tip = new THREE.Mesh(nib_tipGeom, nibMat);
  nib_tip.name = "nib_tip";
  nib_tip.position.set(0, -0.008, 0.012);
  nib_tip.scale.set(0.75, 1.0, 0.75);
  feather_group.add(nib_tip);

  const nib_slitGeom = new THREE.BoxGeometry(0.006, 0.17, 0.006);
  const nib_slit = new THREE.Mesh(nib_slitGeom, grooveMat);
  nib_slit.name = "nib_slit";
  nib_slit.position.set(0, 0.19, 0.058);
  feather_group.add(nib_slit);

  const gold_gripGeom = new THREE.CylinderGeometry(0.055, 0.075, 0.25, 20);
  const gold_grip = new THREE.Mesh(gold_gripGeom, goldMat);
  gold_grip.name = "gold_grip";
  gold_grip.rotation.z = Math.PI;
  gold_grip.position.set(0, 0.525, 0.012);
  feather_group.add(gold_grip);

  const gold_collarGeom = new THREE.CylinderGeometry(0.083, 0.083, 0.045, 20);
  const gold_collar = new THREE.Mesh(gold_collarGeom, goldMat);
  gold_collar.name = "gold_collar";
  gold_collar.rotation.z = Math.PI;
  gold_collar.position.set(0, 0.655, 0.012);
  feather_group.add(gold_collar);

  const gold_ringGeom = new THREE.TorusGeometry(0.073, 0.009, 7, 20);

  const gold_ring_lower = new THREE.Mesh(gold_ringGeom, goldMat);
  gold_ring_lower.name = "gold_ring_lower";
  gold_ring_lower.rotation.x = Math.PI / 2;
  gold_ring_lower.position.set(0, 0.425, 0.012);
  feather_group.add(gold_ring_lower);

  const gold_ring_middle = new THREE.Mesh(gold_ringGeom, goldMat);
  gold_ring_middle.name = "gold_ring_middle";
  gold_ring_middle.rotation.x = Math.PI / 2;
  gold_ring_middle.position.set(0, 0.520, 0.012);
  gold_ring_middle.scale.setScalar(0.94);
  feather_group.add(gold_ring_middle);

  const gold_ring_upper = new THREE.Mesh(gold_ringGeom, goldMat);
  gold_ring_upper.name = "gold_ring_upper";
  gold_ring_upper.rotation.x = Math.PI / 2;
  gold_ring_upper.position.set(0, 0.615, 0.012);
  gold_ring_upper.scale.setScalar(0.88);
  feather_group.add(gold_ring_upper);

  root.add(feather_group);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    object.scale.setScalar(scale);
    object.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
  }

  fitToUnitCube(root);
  return root;
}