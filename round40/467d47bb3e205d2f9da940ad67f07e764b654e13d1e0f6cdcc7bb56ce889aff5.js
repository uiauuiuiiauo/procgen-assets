export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cottage_diorama";

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  const cottage_group = new THREE.Group();
  cottage_group.name = "cottage_group";
  const fence_group = new THREE.Group();
  fence_group.name = "fence_group";
  const ivy_group = new THREE.Group();
  ivy_group.name = "ivy_group";
  root.add(base_group, cottage_group, fence_group, ivy_group);

  const sidingMat = new THREE.MeshStandardMaterial({
    color: 0x71344f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const sidingShadowMat = new THREE.MeshStandardMaterial({
    color: 0x4b2238,
    metalness: 0.0,
    roughness: 0.9,
  });
  const whiteTrimMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1e9,
    metalness: 0.0,
    roughness: 0.6,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x303238,
    metalness: 0.0,
    roughness: 0.9,
  });
  const shingleMat = new THREE.MeshStandardMaterial({
    color: 0x454850,
    metalness: 0.0,
    roughness: 0.9,
  });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x687579,
    metalness: 0.0,
    roughness: 0.4,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.5,
    roughness: 0.5,
  });
  const brickMat = new THREE.MeshStandardMaterial({
    color: 0x8b4f36,
    metalness: 0.0,
    roughness: 0.9,
  });
  const brickCapMat = new THREE.MeshStandardMaterial({
    color: 0xa65c3d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mortarMat = new THREE.MeshStandardMaterial({
    color: 0xb9aa96,
    metalness: 0.0,
    roughness: 0.9,
  });
  const baseEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x655b3d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const grassMat = new THREE.MeshStandardMaterial({
    color: 0x61743b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const ivyMat = new THREE.MeshStandardMaterial({
    color: 0x315b28,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const ivyLightMat = new THREE.MeshStandardMaterial({
    color: 0x64863a,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const vineMat = new THREE.MeshStandardMaterial({
    color: 0x244b21,
    metalness: 0.0,
    roughness: 0.95,
  });

  const baseW = 3.8;
  const baseD = 3.5;
  const grassTop = 0.12;
  const houseW = 2.4;
  const houseD = 1.7;
  const wallBottom = 0.12;
  const wallH = 1.4;
  const wallTop = wallBottom + wallH;
  const roofRise = 0.72;
  const roofRun = 1.05;
  const ridgeY = wallTop + roofRise;
  const roofW = 2.72;
  const roofSlope = Math.sqrt(roofRun * roofRun + roofRise * roofRise);
  const roofAngle = Math.atan2(roofRise, roofRun);
  const frontZ = houseD / 2;

  function addBox(parent, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function makeTube(points, radius, mat, segments) {
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, segments, radius, 6, false),
      mat
    );
  }

  const base_platformGeom = new THREE.BoxGeometry(baseW, 0.1, baseD);
  const base_platform = new THREE.Mesh(base_platformGeom, baseEdgeMat);
  base_platform.name = "base_platform";
  base_platform.position.y = 0.05;
  base_group.add(base_platform);

  const grass_baseGeom = new THREE.BoxGeometry(baseW - 0.14, 0.025, baseD - 0.14);
  const grass_base = new THREE.Mesh(grass_baseGeom, grassMat);
  grass_base.name = "grass_base";
  grass_base.position.y = 0.108;
  base_group.add(grass_base);

  const foundationGeom = new THREE.BoxGeometry(houseW + 0.12, 0.14, houseD + 0.12);
  const foundation = new THREE.Mesh(foundationGeom, sidingShadowMat);
  foundation.name = "foundation";
  foundation.position.set(0, wallBottom + 0.01, 0);
  cottage_group.add(foundation);

  const wall_coreGeom = new THREE.BoxGeometry(houseW, wallH, houseD);
  const wall_core = new THREE.Mesh(wall_coreGeom, sidingMat);
  wall_core.name = "wall_core";
  wall_core.position.set(0, wallBottom + wallH / 2, 0);
  cottage_group.add(wall_core);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-houseD / 2, 0);
  gableShape.lineTo(houseD / 2, 0);
  gableShape.lineTo(0, roofRise);
  gableShape.closePath();

  const gableGeom = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.06,
    steps: 1,
    bevelEnabled: false,
  });

  const left_gable = new THREE.Mesh(gableGeom, sidingMat);
  left_gable.name = "left_gable";
  left_gable.rotation.y = Math.PI / 2;
  left_gable.position.set(-houseW / 2 - 0.03, wallTop, 0);
  cottage_group.add(left_gable);

  const right_gable = new THREE.Mesh(gableGeom, sidingMat);
  right_gable.name = "right_gable";
  right_gable.rotation.y = Math.PI / 2;
  right_gable.position.set(houseW / 2 - 0.03, wallTop, 0);
  cottage_group.add(right_gable);

  const dummy = new THREE.Object3D();
  const sidingRows = 13;
  const horizontal_sidingGeom = new THREE.BoxGeometry(1, 0.026, 0.028);
  const horizontal_siding = new THREE.InstancedMesh(
    horizontal_sidingGeom,
    sidingShadowMat,
    sidingRows * 4
  );
  horizontal_siding.name = "horizontal_siding";
  let sidingIndex = 0;
  for (let i = 0; i < sidingRows; i++) {
    const y = wallBottom + 0.08 + i * 0.105;
    for (const side of [-1, 1]) {
      dummy.position.set(0, y, side * (houseD / 2 + 0.018));
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(houseW, 1, 1);
      dummy.updateMatrix();
      horizontal_siding.setMatrixAt(sidingIndex++, dummy.matrix);
    }
    for (const side of [-1, 1]) {
      dummy.position.set(side * (houseW / 2 + 0.018), y, 0);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.scale.set(houseD, 1, 1);
      dummy.updateMatrix();
      horizontal_siding.setMatrixAt(sidingIndex++, dummy.matrix);
    }
  }
  horizontal_siding.instanceMatrix.needsUpdate = true;
  cottage_group.add(horizontal_siding);

  const gable_sidingGeom = new THREE.BoxGeometry(0.028, 0.026, 1);
  const gable_siding = new THREE.InstancedMesh(gable_sidingGeom, sidingShadowMat, 14);
  gable_siding.name = "gable_siding";
  let gableSidingIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const t = (i + 0.5) / 7;
      const length = houseD * (1 - t) * 0.94;
      dummy.position.set(
        side * (houseW / 2 + 0.036),
        wallTop + t * roofRise,
        0
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, length);
      dummy.updateMatrix();
      gable_siding.setMatrixAt(gableSidingIndex++, dummy.matrix);
    }
  }
  gable_siding.instanceMatrix.needsUpdate = true;
  cottage_group.add(gable_siding);

  const corner_trimGeom = new THREE.BoxGeometry(0.075, wallH + 0.05, 0.075);
  const corner_trim = new THREE.InstancedMesh(corner_trimGeom, whiteTrimMat, 4);
  corner_trim.name = "corner_trim";
  const cornerPositions = [
    [-houseW / 2, wallBottom + wallH / 2, -houseD / 2],
    [houseW / 2, wallBottom + wallH / 2, -houseD / 2],
    [-houseW / 2, wallBottom + wallH / 2, houseD / 2],
    [houseW / 2, wallBottom + wallH / 2, houseD / 2],
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    corner_trim.setMatrixAt(i, dummy.matrix);
  }
  corner_trim.instanceMatrix.needsUpdate = true;
  cottage_group.add(corner_trim);

  const roof_panelGeom = new THREE.BoxGeometry(roofW, 0.07, roofSlope);
  const front_roof_panel = new THREE.Mesh(roof_panelGeom, roofMat);
  front_roof_panel.name = "front_roof_panel";
  front_roof_panel.rotation.x = roofAngle;
  front_roof_panel.position.set(0, wallTop + roofRise / 2, roofRun / 2);
  cottage_group.add(front_roof_panel);

  const back_roof_panel = new THREE.Mesh(roof_panelGeom, roofMat);
  back_roof_panel.name = "back_roof_panel";
  back_roof_panel.rotation.x = -roofAngle;
  back_roof_panel.position.set(0, wallTop + roofRise / 2, -roofRun / 2);
  cottage_group.add(back_roof_panel);

  const shingleRows = 9;
  const shingleCols = 10;
  const shingleStepX = roofW / shingleCols;
  const shingleStepZ = roofSlope / shingleRows;
  const roof_shinglesGeom = new THREE.BoxGeometry(
    shingleStepX * 0.92,
    0.025,
    shingleStepZ * 0.9
  );
  const roof_shingles = new THREE.InstancedMesh(
    roof_shinglesGeom,
    shingleMat,
    shingleRows * shingleCols * 2
  );
  roof_shingles.name = "roof_shingles";
  let shingleIndex = 0;
  for (const side of [-1, 1]) {
    const euler = new THREE.Euler(side * roofAngle, 0, 0);
    for (let row = 0; row < shingleRows; row++) {
      const zAbs = (row + 0.5) * shingleStepZ;
      for (let col = 0; col < shingleCols; col++) {
        const x = -roofW / 2 + (col + 0.5) * shingleStepX;
        dummy.position.set(
          x,
          ridgeY - zAbs * Math.sin(roofAngle) + 0.045 * Math.cos(roofAngle),
          side * (zAbs * Math.cos(roofAngle) + 0.045 * Math.sin(roofAngle))
        );
        dummy.rotation.set(0, 0, 0);
        dummy.quaternion.setFromEuler(euler);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        roof_shingles.setMatrixAt(shingleIndex++, dummy.matrix);
      }
    }
  }
  roof_shingles.instanceMatrix.needsUpdate = true;
  cottage_group.add(roof_shingles);

  const roof_ridgeGeom = new THREE.CylinderGeometry(0.065, 0.065, roofW + 0.08, 12);
  const roof_ridge = new THREE.Mesh(roof_ridgeGeom, roofMat);
  roof_ridge.name = "roof_ridge";
  roof_ridge.rotation.z = Math.PI / 2;
  roof_ridge.position.set(0, ridgeY + 0.035, 0);
  cottage_group.add(roof_ridge);

  const front_fascia = addBox(
    cottage_group,
    roofW,
    0.075,
    0.065,
    whiteTrimMat,
    0,
    wallTop - 0.005,
    roofRun + 0.015
  );
  front_fascia.name = "front_fascia";

  const back_fascia = addBox(
    cottage_group,
    roofW,
    0.075,
    0.065,
    whiteTrimMat,
    0,
    wallTop - 0.005,
    -roofRun - 0.015
  );
  back_fascia.name = "back_fascia";

  const gable_trimGeom = new THREE.BoxGeometry(0.07, roofSlope, 0.075);
  const gable_trim = new THREE.InstancedMesh(gable_trimGeom, whiteTrimMat, 4);
  gable_trim.name = "gable_trim";
  let gableTrimIndex = 0;
  for (const xSide of [-1, 1]) {
    for (const zSide of [-1, 1]) {
      const run = roofRun / 2;
      const rise = roofRise / 2;
      const angle = zSide > 0 ? -Math.atan2(rise, run) : Math.atan2(rise, run);
      dummy.position.set(
        xSide * (roofW / 2 + 0.005),
        wallTop + rise / 2,
        zSide * run
      );
      dummy.rotation.set(angle, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      gable_trim.setMatrixAt(gableTrimIndex++, dummy.matrix);
    }
  }
  gable_trim.instanceMatrix.needsUpdate = true;
  cottage_group.add(gable_trim);

  function createWindow(name, w, h) {
    const group = new THREE.Group();
    group.name = name;

    const glass = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.025), glassMat);
    glass.name = name + "_glass";
    group.add(glass);

    const left_frame = new THREE.Mesh(
      new THREE.BoxGeometry(0.065, h + 0.12, 0.055),
      whiteTrimMat
    );
    left_frame.position.set(-w / 2 - 0.0325, 0, 0.025);
    group.add(left_frame);

    const right_frame = left_frame.clone();
    right_frame.position.x = w / 2 + 0.0325;
    group.add(right_frame);

    const top_frame = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.13, 0.065, 0.055),
      whiteTrimMat
    );
    top_frame.position.set(0, h / 2 + 0.0325, 0.025);
    group.add(top_frame);

    const bottom_frame = top_frame.clone();
    bottom_frame.position.y = -h / 2 - 0.0325;
    group.add(bottom_frame);

    const vertical_mullion = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, h, 0.045),
      whiteTrimMat
    );
    vertical_mullion.position.z = 0.035;
    group.add(vertical_mullion);

    for (const y of [-h / 6, h / 6]) {
      const horizontal_mullion = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.032, 0.045),
        whiteTrimMat
      );
      horizontal_mullion.position.set(0, y, 0.035);
      group.add(horizontal_mullion);
    }

    const sill = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.22, 0.075, 0.13),
      whiteTrimMat
    );
    sill.position.set(0, -h / 2 - 0.085, 0.055);
    group.add(sill);
    return group;
  }

  const front_left_window = createWindow("front_left_window", 0.4, 0.62);
  front_left_window.position.set(-0.72, 0.88, frontZ + 0.035);
  cottage_group.add(front_left_window);

  const front_right_window = createWindow("front_right_window", 0.54, 0.7);
  front_right_window.position.set(0.72, 0.9, frontZ + 0.035);
  cottage_group.add(front_right_window);

  const left_side_window = createWindow("left_side_window", 0.43, 0.62);
  left_side_window.rotation.y = -Math.PI / 2;
  left_side_window.position.set(-houseW / 2 - 0.035, 0.88, 0.38);
  cottage_group.add(left_side_window);

  const right_side_window = createWindow("right_side_window", 0.43, 0.62);
  right_side_window.rotation.y = Math.PI / 2;
  right_side_window.position.set(houseW / 2 + 0.035, 0.88, 0.38);
  cottage_group.add(right_side_window);

  const left_attic_window = createWindow("left_attic_window", 0.27, 0.42);
  left_attic_window.rotation.y = -Math.PI / 2;
  left_attic_window.position.set(-houseW / 2 - 0.045, wallTop + 0.29, 0);
  cottage_group.add(left_attic_window);

  const right_attic_window = createWindow("right_attic_window", 0.27, 0.42);
  right_attic_window.rotation.y = Math.PI / 2;
  right_attic_window.position.set(houseW / 2 + 0.045, wallTop + 0.29, 0);
  cottage_group.add(right_attic_window);

  const doorGeom = new THREE.BoxGeometry(0.48, 1.12, 0.06);
  const door = new THREE.Mesh(doorGeom, sidingMat);
  door.name = "door";
  door.position.set(-0.08, wallBottom + 0.56, frontZ + 0.04);
  cottage_group.add(door);

  const door_left_frame = addBox(
    cottage_group,
    0.075,
    1.2,
    0.075,
    whiteTrimMat,
    -0.35,
    wallBottom + 0.6,
    frontZ + 0.075
  );
  door_left_frame.name = "door_left_frame";

  const door_right_frame = addBox(
    cottage_group,
    0.075,
    1.2,
    0.075,
    whiteTrimMat,
    0.19,
    wallBottom + 0.6,
    frontZ + 0.075
  );
  door_right_frame.name = "door_right_frame";

  const door_top_frame = addBox(
    cottage_group,
    0.615,
    0.075,
    0.075,
    whiteTrimMat,
    -0.08,
    wallBottom + 1.2,
    frontZ + 0.075
  );
  door_top_frame.name = "door_top_frame";

  const door_threshold = addBox(
    cottage_group,
    0.62,
    0.075,
    0.16,
    whiteTrimMat,
    -0.08,
    wallBottom + 0.025,
    frontZ + 0.11
  );
  door_threshold.name = "door_threshold";

  const door_handleGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.045, 12);
  const door_handle = new THREE.Mesh(door_handleGeom, handleMat);
  door_handle.name = "door_handle";
  door_handle.rotation.x = Math.PI / 2;
  door_handle.position.set(0.1, 0.69, frontZ + 0.095);
  cottage_group.add(door_handle);

  const chimneyX = 0.78;
  const chimneyZ = -0.28;
  const chimneyBottom = 1.88;
  const chimneyH = 0.65;

  const chimneyGeom = new THREE.BoxGeometry(0.36, chimneyH, 0.34);
  const chimney = new THREE.Mesh(chimneyGeom, brickMat);
  chimney.name = "chimney";
  chimney.position.set(chimneyX, chimneyBottom + chimneyH / 2, chimneyZ);
  cottage_group.add(chimney);

  const chimney_mortar_coursesGeom = new THREE.BoxGeometry(1, 0.018, 0.018);
  const chimney_mortar_courses = new THREE.InstancedMesh(
    chimney_mortar_coursesGeom,
    mortarMat,
    10
  );
  chimney_mortar_courses.name = "chimney_mortar_courses";
  let mortarIndex = 0;
  for (let i = 0; i < 5; i++) {
    const y = chimneyBottom + 0.08 + i * 0.115;
    for (const side of [-1, 1]) {
      dummy.position.set(chimneyX, y, chimneyZ + side * 0.178);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.37, 1, 1);
      dummy.updateMatrix();
      chimney_mortar_courses.setMatrixAt(mortarIndex++, dummy.matrix);
    }
  }
  chimney_mortar_courses.instanceMatrix.needsUpdate = true;
  cottage_group.add(chimney_mortar_courses);

  const chimney_mortar_jointsGeom = new THREE.BoxGeometry(0.018, 0.09, 0.018);
  const chimney_mortar_joints = new THREE.InstancedMesh(
    chimney_mortar_jointsGeom,
    mortarMat,
    10
  );
  chimney_mortar_joints.name = "chimney_mortar_joints";
  mortarIndex = 0;
  for (let i = 0; i < 5; i++) {
    const y = chimneyBottom + 0.135 + i * 0.115;
    const offset = i % 2 === 0 ? -0.085 : 0.085;
    for (const side of [-1, 1]) {
      dummy.position.set(chimneyX + offset, y, chimneyZ + side * 0.179);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      chimney_mortar_joints.setMatrixAt(mortarIndex++, dummy.matrix);
    }
  }
  chimney_mortar_joints.instanceMatrix.needsUpdate = true;
  cottage_group.add(chimney_mortar_joints);

  const chimney_capGeom = new THREE.BoxGeometry(0.43, 0.09, 0.41);
  const chimney_cap = new THREE.Mesh(chimney_capGeom, brickCapMat);
  chimney_cap.name = "chimney_cap";
  chimney_cap.position.set(chimneyX, chimneyBottom + chimneyH + 0.045, chimneyZ);
  cottage_group.add(chimney_cap);

  const picketShape = new THREE.Shape();
  picketShape.moveTo(-0.045, 0);
  picketShape.lineTo(0.045, 0);
  picketShape.lineTo(0.045, 0.5);
  picketShape.lineTo(0, 0.62);
  picketShape.lineTo(-0.045, 0.5);
  picketShape.closePath();

  const fence_picketsGeom = new THREE.ExtrudeGeometry(picketShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: false,
  });
  fence_picketsGeom.translate(0, 0, -0.0275);

  const frontPicketCount = 25;
  const sidePicketCount = 21;
  const fence_pickets = new THREE.InstancedMesh(
    fence_picketsGeom,
    whiteTrimMat,
    frontPicketCount * 2 + sidePicketCount * 2
  );
  fence_pickets.name = "fence_pickets";
  let picketIndex = 0;
  const fenceFrontZ = 1.55;
  const fenceSideX = 1.72;

  for (const zSide of [-1, 1]) {
    for (let i = 0; i < frontPicketCount; i++) {
      const x = -1.66 + (3.32 * i) / (frontPicketCount - 1);
      dummy.position.set(x, grassTop, zSide * fenceFrontZ);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      fence_pickets.setMatrixAt(picketIndex++, dummy.matrix);
    }
  }

  for (const xSide of [-1, 1]) {
    for (let i = 0; i < sidePicketCount; i++) {
      const z = -1.45 + (2.9 * i) / (sidePicketCount - 1);
      dummy.position.set(xSide * fenceSideX, grassTop, z);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      fence_pickets.setMatrixAt(picketIndex++, dummy.matrix);
    }
  }
  fence_pickets.instanceMatrix.needsUpdate = true;
  fence_group.add(fence_pickets);

  const fence_railsGeom = new THREE.BoxGeometry(1, 0.065, 0.055);
  const fence_rails = new THREE.InstancedMesh(fence_railsGeom, whiteTrimMat, 8);
  fence_rails.name = "fence_rails";
  let railIndex = 0;
  for (const zSide of [-1, 1]) {
    for (const y of [0.31, 0.51]) {
      dummy.position.set(0, y, zSide * (fenceFrontZ - 0.035));
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(3.38, 1, 1);
      dummy.updateMatrix();
      fence_rails.setMatrixAt(railIndex++, dummy.matrix);
    }
  }
  for (const xSide of [-1, 1]) {
    for (const y of [0.31, 0.51]) {
      dummy.position.set(xSide * (fenceSideX - 0.035), y, 0);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.scale.set(2.98, 1, 1);
      dummy.updateMatrix();
      fence_rails.setMatrixAt(railIndex++, dummy.matrix);
    }
  }
  fence_rails.instanceMatrix.needsUpdate = true;
  fence_group.add(fence_rails);

  const fence_postGeom = new THREE.BoxGeometry(0.13, 0.7, 0.13);
  const fence_posts = new THREE.InstancedMesh(fence_postGeom, whiteTrimMat, 6);
  fence_posts.name = "fence_posts";
  const fencePostPositions = [
    [-fenceSideX, 0.47, -fenceFrontZ],
    [fenceSideX, 0.47, -fenceFrontZ],
    [-fenceSideX, 0.47, fenceFrontZ],
    [fenceSideX, 0.47, fenceFrontZ],
    [0, 0.47, -fenceFrontZ],
    [0, 0.47, fenceFrontZ],
  ];
  for (let i = 0; i < fencePostPositions.length; i++) {
    const p = fencePostPositions[i];
    dummy.position.set(p[0], p[1], p[2]);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    fence_posts.setMatrixAt(i, dummy.matrix);
  }
  fence_posts.instanceMatrix.needsUpdate = true;
  fence_group.add(fence_posts);

  const ivy_leafShape = new THREE.Shape();
  ivy_leafShape.moveTo(0, -0.06);
  ivy_leafShape.lineTo(0.025, -0.025);
  ivy_leafShape.lineTo(0.055, -0.005);
  ivy_leafShape.lineTo(0.027, 0.01);
  ivy_leafShape.lineTo(0.04, 0.045);
  ivy_leafShape.lineTo(0, 0.025);
  ivy_leafShape.lineTo(-0.04, 0.045);
  ivy_leafShape.lineTo(-0.027, 0.01);
  ivy_leafShape.lineTo(-0.055, -0.005);
  ivy_leafShape.lineTo(-0.025, -0.025);
  ivy_leafShape.closePath();

  const ivy_leafGeom = new THREE.ShapeGeometry(ivy_leafShape);
  const ivyLeafData = [];

  function addIvyPath(points, normal, count, baseScale, selector) {
    const curve = new THREE.CatmullRomCurve3(points);
    ivy_group.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, Math.max(12, count * 2), 0.012, 6, false),
        vineMat
      )
    );

    const n = normal.clone().normalize();
    for (let i = 0; i < count; i++) {
      const t = (i + 0.5) / count;
      const point = curve.getPoint(t);
      const angle = i * 2.3999632297 + t * Math.PI;
      const tangentOffset = new THREE.Vector3(
        Math.cos(angle) * 0.045,
        Math.sin(angle) * 0.045,
        0
      ).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          n
        ));
      const scale = baseScale * (0.82 + (i % 5) * 0.055);
      ivyLeafData.push({
        position: point.clone().add(tangentOffset).addScaledVector(n, 0.008),
        normal: n.clone(),
        angle: angle + (i % 3) * 0.35,
        scale,
        light: (i + selector) % 5 === 0,
      });
    }
  }

  const frontNormal = new THREE.Vector3(0, 0, 1);
  const leftNormal = new THREE.Vector3(-1, 0, 0);
  const rightNormal = new THREE.Vector3(1, 0, 0);
  const frontRoofNormal = new THREE.Vector3(
    0,
    Math.cos(roofAngle),
    Math.sin(roofAngle)
  );
  const backRoofNormal = new THREE.Vector3(
    0,
    Math.cos(roofAngle),
    -Math.sin(roofAngle)
  );

  function roofPoint(x, zAbs, offset) {
    return new THREE.Vector3(
      x,
      ridgeY - zAbs * Math.sin(roofAngle) + offset * Math.cos(roofAngle),
      zAbs * Math.cos(roofAngle) + offset * Math.sin(roofAngle)
    );
  }

  addIvyPath(
    [
      roofPoint(-0.62, 0.08, 0.05),
      roofPoint(-0.5, 0.35, 0.05),
      roofPoint(-0.38, 0.68, 0.05),
      roofPoint(-0.25, 1.02, 0.05),
    ],
    frontRoofNormal,
    28,
    1.15,
    0
  );
  addIvyPath(
    [
      roofPoint(0.22, 0.08, 0.055),
      roofPoint(0.35, 0.38, 0.055),
      roofPoint(0.55, 0.72, 0.055),
      roofPoint(0.72, 1.02, 0.055),
    ],
    frontRoofNormal,
    28,
    1.12,
    1
  );
  addIvyPath(
    [
      roofPoint(0.95, 0.12, 0.05),
      roofPoint(1.02, 0.42, 0.05),
      roofPoint(1.1, 0.72, 0.05),
      roofPoint(1.15, 1.0, 0.05),
    ],
    frontRoofNormal,
    24,
    1.05,
    2
  );
  addIvyPath(
    [
      roofPoint(-1.02, 0.18, 0.05),
      roofPoint(-1.08, 0.48, 0.05),
      roofPoint(-1.12, 0.78, 0.05),
      roofPoint(-1.08, 1.0, 0.05),
    ],
    frontRoofNormal,
    22,
    1.0,
    3
  );
  addIvyPath(
    [
      roofPoint(0.48, 0.2, 0.06),
      roofPoint(0.1, 0.48, 0.06),
      roofPoint(-0.18, 0.78, 0.06),
      roofPoint(-0.48, 1.0, 0.06),
    ],
    frontRoofNormal,
    25,
    1.08,
    4
  );
  addIvyPath(
    [
      roofPoint(-0.2, 0.25, 0.05),
      roofPoint(-0.38, 0.58, 0.05),
      roofPoint(-0.55, 1.0, 0.05),
    ],
    backRoofNormal,
    18,
    0.95,
    1
  );
  addIvyPath(
    [
      roofPoint(0.72, 0.2, 0.05),
      roofPoint(0.82, 0.55, 0.05),
      roofPoint(0.92, 0.98, 0.05),
    ],
    backRoofNormal,
    18,
    0.95,
    2
  );

  addIvyPath(
    [
      new THREE.Vector3(-0.68, 1.78, frontZ + 0.06),
      new THREE.Vector3(-0.62, 1.48, frontZ + 0.06),
      new THREE.Vector3(-0.55, 1.15, frontZ + 0.06),
      new THREE.Vector3(-0.48, 0.72, frontZ + 0.06),
      new THREE.Vector3(-0.38, 0.2, frontZ + 0.06),
    ],
    frontNormal,
    30,
    1.0,
    0
  );
  addIvyPath(
    [
      new THREE.Vector3(0.48, 1.72, frontZ + 0.06),
      new THREE.Vector3(0.5, 1.45, frontZ + 0.06),
      new THREE.Vector3(0.48, 1.1, frontZ + 0.06),
      new THREE.Vector3(0.52, 0.72, frontZ + 0.06),
      new THREE.Vector3(0.6, 0.18, frontZ + 0.06),
    ],
    frontNormal,
    30,
    1.0,
    2
  );
  addIvyPath(
    [
      new THREE.Vector3(1.02, 1.55, frontZ + 0.055),
      new THREE.Vector3(1.05, 1.25, frontZ + 0.055),
      new THREE.Vector3(1.02, 0.9, frontZ + 0.055),
      new THREE.Vector3(0.98, 0.55, frontZ + 0.055),
    ],
    frontNormal,
    20,
    0.95,
    3
  );
  addIvyPath(
    [
      new THREE.Vector3(-1.08, 0.18, frontZ + 0.055),
      new THREE.Vector3(-1.04, 0.45, frontZ + 0.055),
      new THREE.Vector3(-1.08, 0.75, frontZ + 0.055),
      new THREE.Vector3(-1.0, 1.05, frontZ + 0.055),
    ],
    frontNormal,
    18,
    0.9,
    4
  );
  addIvyPath(
    [
      new THREE.Vector3(-0.3, 0.18, frontZ + 0.06),
      new THREE.Vector3(-0.25, 0.42, frontZ + 0.06),
      new THREE.Vector3(-0.32, 0.7, frontZ + 0.06),
      new THREE.Vector3(-0.27, 1.0, frontZ + 0.06),
    ],
    frontNormal,
    18,
    0.9,
    1
  );

  addIvyPath(
    [
      new THREE.Vector3(-houseW / 2 - 0.06, 0.16, -0.58),
      new THREE.Vector3(-houseW / 2 - 0.06, 0.5, -0.52),
      new THREE.Vector3(-houseW / 2 - 0.06, 0.9, -0.45),
      new THREE.Vector3(-houseW / 2 - 0.06, 1.35, -0.35),
    ],
    leftNormal,
    22,
    0.95,
    0
  );
  addIvyPath(
    [
      new THREE.Vector3(-houseW / 2 - 0.06, 0.18, 0.72),
      new THREE.Vector3(-houseW / 2 - 0.06, 0.55, 0.68),
      new THREE.Vector3(-houseW / 2 - 0.06, 0.95, 0.72),
      new THREE.Vector3(-houseW / 2 - 0.06, 1.45, 0.62),
    ],
    leftNormal,
    22,
    0.95,
    2
  );
  addIvyPath(
    [
      new THREE.Vector3(houseW / 2 + 0.06, 0.18, 0.68),
      new THREE.Vector3(houseW / 2 + 0.06, 0.55, 0.62),
      new THREE.Vector3(houseW / 2 + 0.06, 0.95, 0.7),
      new THREE.Vector3(houseW / 2 + 0.06, 1.4, 0.58),
    ],
    rightNormal,
    20,
    0.92,
    3
  );

  const ivy_leaves = new THREE.InstancedMesh(
    ivy_leafGeom,
    ivyMat,
    ivyLeafData.length
  );
  ivy_leaves.name = "ivy_leaves";
  const ivy_light_leaves = new THREE.InstancedMesh(
    ivy_leafGeom,
    ivyLightMat,
    ivyLeafData.length
  );
  ivy_light_leaves.name = "ivy_light_leaves";

  const zAxis = new THREE.Vector3(0, 0, 1);
  let darkLeafIndex = 0;
  let lightLeafIndex = 0;
  for (const data of ivyLeafData) {
    const surfaceQuaternion = new THREE.Quaternion().setFromUnitVectors(
      zAxis,
      data.normal
    );
    const spinQuaternion = new THREE.Quaternion().setFromAxisAngle(
      zAxis,
      data.angle
    );
    dummy.position.copy(data.position);
    dummy.quaternion.copy(surfaceQuaternion).multiply(spinQuaternion);
    dummy.scale.set(data.scale, data.scale, data.scale);
    dummy.updateMatrix();
    if (data.light) {
      ivy_light_leaves.setMatrixAt(lightLeafIndex++, dummy.matrix);
    } else {
      ivy_leaves.setMatrixAt(darkLeafIndex++, dummy.matrix);
    }
  }
  ivy_leaves.count = darkLeafIndex;
  ivy_light_leaves.count = lightLeafIndex;
  ivy_leaves.instanceMatrix.needsUpdate = true;
  ivy_light_leaves.instanceMatrix.needsUpdate = true;
  ivy_group.add(ivy_leaves, ivy_light_leaves);

  const grass_tuftsGeom = new THREE.ConeGeometry(0.025, 0.12, 5);
  const grass_tufts = new THREE.InstancedMesh(grass_tuftsGeom, ivyLightMat, 40);
  grass_tufts.name = "grass_tufts";
  for (let i = 0; i < 40; i++) {
    let x;
    let z;
    if (i < 20) {
      x = -1.6 + (3.2 * i) / 19;
      z = 1.42 + Math.sin(i * 1.7) * 0.04;
    } else if (i < 30) {
      const j = i - 20;
      x = -1.55 + (3.1 * j) / 9;
      z = -1.42 + Math.sin(j * 1.4) * 0.04;
    } else if (i < 35) {
      const j = i - 30;
      x = -1.66 + Math.sin(j * 1.8) * 0.04;
      z = -1.2 + (2.4 * j) / 4;
    } else {
      const j = i - 35;
      x = 1.66 + Math.sin(j * 1.6) * 0.04;
      z = -1.2 + (2.4 * j) / 4;
    }
    dummy.position.set(x, grassTop + 0.06, z);
    dummy.rotation.set(0, i * 0.73, 0);
    dummy.scale.set(0.8 + (i % 3) * 0.12, 0.9 + (i % 4) * 0.08, 0.8);
    dummy.updateMatrix();
    grass_tufts.setMatrixAt(i, dummy.matrix);
  }
  grass_tufts.instanceMatrix.needsUpdate = true;
  ivy_group.add(grass_tufts);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}