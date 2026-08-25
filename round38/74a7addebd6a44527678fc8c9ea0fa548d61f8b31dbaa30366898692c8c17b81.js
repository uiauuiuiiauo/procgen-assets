export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "weathered_storage_shed";

  const buildingW = 1.34;
  const buildingD = 1.78;
  const lowerH = 0.68;
  const eaveY = 0.68;
  const ridgeY = 1.56;
  const roofRun = 0.82;
  const roofRise = ridgeY - eaveY;
  const roofLength = 2.04;
  const roofAngle = Math.atan2(roofRise, roofRun);
  const roofSlopeLength = Math.sqrt(roofRun * roofRun + roofRise * roofRise);

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xe7e6dc,
    metalness: 0.0,
    roughness: 0.8
  });
  const wallSeamMat = new THREE.MeshStandardMaterial({
    color: 0xc8c9c2,
    metalness: 0.0,
    roughness: 0.9
  });
  const weatheredWoodMat = new THREE.MeshStandardMaterial({
    color: 0x927d65,
    metalness: 0.0,
    roughness: 0.9
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0xb29a78,
    metalness: 0.0,
    roughness: 0.9
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x554638,
    metalness: 0.0,
    roughness: 0.9
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x414648,
    metalness: 0.6,
    roughness: 0.5
  });
  const roofSeamMat = new THREE.MeshStandardMaterial({
    color: 0x292d2f,
    metalness: 0.5,
    roughness: 0.6
  });
  const rustMat = new THREE.MeshStandardMaterial({
    color: 0x74483c,
    metalness: 0.1,
    roughness: 0.9
  });
  const doorMat = new THREE.MeshStandardMaterial({
    color: 0xa94f45,
    metalness: 0.0,
    roughness: 0.8
  });
  const doorFrameMat = new THREE.MeshStandardMaterial({
    color: 0xb96054,
    metalness: 0.0,
    roughness: 0.8
  });
  const doorHardwareMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.5
  });
  const windowGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c1bd,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true
  });
  const windowRecessMat = new THREE.MeshStandardMaterial({
    color: 0x3c4241,
    metalness: 0.0,
    roughness: 0.8
  });
  const foundationMat = new THREE.MeshStandardMaterial({
    color: 0x5c5142,
    metalness: 0.0,
    roughness: 0.9
  });

  const foundation_skidGeom = new THREE.BoxGeometry(1.38, 0.08, 1.82);
  const foundation_skid = new THREE.Mesh(foundation_skidGeom, foundationMat);
  foundation_skid.name = "foundation_skid";
  foundation_skid.position.set(0, 0.04, 0);
  root.add(foundation_skid);

  const lower_wallsGeom = new THREE.BoxGeometry(buildingW, lowerH, buildingD);
  const lower_walls = new THREE.Mesh(lower_wallsGeom, wallMat);
  lower_walls.name = "lower_walls";
  lower_walls.position.set(0, 0.38, 0);
  root.add(lower_walls);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-buildingW / 2, eaveY);
  gableShape.lineTo(0, ridgeY);
  gableShape.lineTo(buildingW / 2, eaveY);
  gableShape.closePath();

  const front_gableGeom = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: false
  });
  const front_gable = new THREE.Mesh(front_gableGeom, weatheredWoodMat);
  front_gable.name = "front_gable";
  front_gable.position.z = buildingD / 2 - 0.005;
  root.add(front_gable);

  const back_gable = new THREE.Mesh(front_gableGeom, weatheredWoodMat);
  back_gable.name = "back_gable";
  back_gable.position.z = -buildingD / 2 - 0.04;
  root.add(back_gable);

  const plankTones = [
    new THREE.Color(0x8d7962),
    new THREE.Color(0xa38c70),
    new THREE.Color(0x756552),
    new THREE.Color(0xb09a7b),
    new THREE.Color(0x927d65)
  ];

  const upper_planksGeom = new THREE.BoxGeometry(0.102, 1, 0.022);
  const upperPlankCount = 11;
  const front_upper_planks = new THREE.InstancedMesh(
    upper_planksGeom,
    weatheredWoodMat,
    upperPlankCount
  );
  front_upper_planks.name = "front_upper_planks";

  const back_upper_planks = new THREE.InstancedMesh(
    upper_planksGeom,
    weatheredWoodMat,
    upperPlankCount
  );
  back_upper_planks.name = "back_upper_planks";

  const upperDummy = new THREE.Object3D();
  for (let i = 0; i < upperPlankCount; i++) {
    const x = -buildingW / 2 + (i + 0.5) * buildingW / upperPlankCount;
    const topY = ridgeY - Math.abs(x) / (buildingW / 2) * roofRise;
    const height = Math.max(0.06, topY - eaveY - 0.025);

    upperDummy.position.set(x, eaveY + height / 2, buildingD / 2 + 0.026);
    upperDummy.rotation.set(0, 0, 0);
    upperDummy.scale.set(1, height, 1);
    upperDummy.updateMatrix();
    front_upper_planks.setMatrixAt(i, upperDummy.matrix);
    front_upper_planks.setColorAt(i, plankTones[i % plankTones.length]);

    upperDummy.position.set(x, eaveY + height / 2, -buildingD / 2 - 0.026);
    upperDummy.updateMatrix();
    back_upper_planks.setMatrixAt(i, upperDummy.matrix);
    back_upper_planks.setColorAt(
      i,
      plankTones[(i + 2) % plankTones.length]
    );
  }
  front_upper_planks.instanceMatrix.needsUpdate = true;
  back_upper_planks.instanceMatrix.needsUpdate = true;
  if (front_upper_planks.instanceColor) {
    front_upper_planks.instanceColor.needsUpdate = true;
  }
  if (back_upper_planks.instanceColor) {
    back_upper_planks.instanceColor.needsUpdate = true;
  }
  root.add(front_upper_planks, back_upper_planks);

  const upper_seamsGeom = new THREE.BoxGeometry(0.008, 1, 0.014);
  const upper_vertical_seams = new THREE.InstancedMesh(
    upper_seamsGeom,
    darkWoodMat,
    upperPlankCount * 2
  );
  upper_vertical_seams.name = "upper_vertical_seams";

  let upperSeamIndex = 0;
  for (let i = 0; i <= upperPlankCount; i++) {
    const x = -buildingW / 2 + i * buildingW / upperPlankCount;
    const topY = ridgeY - Math.abs(x) / (buildingW / 2) * roofRise;
    const height = Math.max(0.05, topY - eaveY - 0.03);

    upperDummy.position.set(x, eaveY + height / 2, buildingD / 2 + 0.041);
    upperDummy.rotation.set(0, 0, 0);
    upperDummy.scale.set(1, height, 1);
    upperDummy.updateMatrix();
    upper_vertical_seams.setMatrixAt(upperSeamIndex++, upperDummy.matrix);

    upperDummy.position.set(x, eaveY + height / 2, -buildingD / 2 - 0.041);
    upperDummy.updateMatrix();
    upper_vertical_seams.setMatrixAt(upperSeamIndex++, upperDummy.matrix);
  }
  upper_vertical_seams.instanceMatrix.needsUpdate = true;
  root.add(upper_vertical_seams);

  const lower_front_back_seamsGeom = new THREE.BoxGeometry(
    0.008,
    lowerH - 0.04,
    0.012
  );
  const lower_front_back_seams = new THREE.InstancedMesh(
    lower_front_back_seamsGeom,
    wallSeamMat,
    22
  );
  lower_front_back_seams.name = "lower_front_back_seams";

  let frontBackSeamIndex = 0;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 11; i++) {
      const x = -buildingW / 2 + i * buildingW / 10;
      upperDummy.position.set(
        x,
        0.38,
        side * (buildingD / 2 + 0.008)
      );
      upperDummy.rotation.set(0, 0, 0);
      upperDummy.scale.set(1, 1, 1);
      upperDummy.updateMatrix();
      lower_front_back_seams.setMatrixAt(
        frontBackSeamIndex++,
        upperDummy.matrix
      );
    }
  }
  lower_front_back_seams.instanceMatrix.needsUpdate = true;
  root.add(lower_front_back_seams);

  const lower_side_seamsGeom = new THREE.BoxGeometry(
    0.012,
    lowerH - 0.04,
    0.008
  );
  const lower_side_seams = new THREE.InstancedMesh(
    lower_side_seamsGeom,
    wallSeamMat,
    26
  );
  lower_side_seams.name = "lower_side_seams";

  let sideSeamIndex = 0;
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 13; i++) {
      const z = -buildingD / 2 + i * buildingD / 12;
      upperDummy.position.set(
        side * (buildingW / 2 + 0.008),
        0.38,
        z
      );
      upperDummy.rotation.set(0, 0, 0);
      upperDummy.scale.set(1, 1, 1);
      upperDummy.updateMatrix();
      lower_side_seams.setMatrixAt(sideSeamIndex++, upperDummy.matrix);
    }
  }
  lower_side_seams.instanceMatrix.needsUpdate = true;
  root.add(lower_side_seams);

  const corner_trimGeom = new THREE.BoxGeometry(
    0.055,
    lowerH + 0.02,
    0.055
  );
  const corner_trim = new THREE.InstancedMesh(
    corner_trimGeom,
    lightWoodMat,
    4
  );
  corner_trim.name = "corner_trim";

  const cornerPositions = [
    [-buildingW / 2, 0.39, -buildingD / 2],
    [buildingW / 2, 0.39, -buildingD / 2],
    [-buildingW / 2, 0.39, buildingD / 2],
    [buildingW / 2, 0.39, buildingD / 2]
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    upperDummy.position.set(p[0], p[1], p[2]);
    upperDummy.rotation.set(0, 0, 0);
    upperDummy.scale.set(1, 1, 1);
    upperDummy.updateMatrix();
    corner_trim.setMatrixAt(i, upperDummy.matrix);
  }
  corner_trim.instanceMatrix.needsUpdate = true;
  root.add(corner_trim);

  const roof_panelGeom = new THREE.BoxGeometry(
    roofSlopeLength,
    0.035,
    roofLength
  );

  const left_roof_panel = new THREE.Mesh(roof_panelGeom, roofMat);
  left_roof_panel.name = "left_roof_panel";
  left_roof_panel.position.set(
    -roofRun / 2,
    eaveY + roofRise / 2,
    0
  );
  left_roof_panel.rotation.z = roofAngle;
  root.add(left_roof_panel);

  const right_roof_panel = new THREE.Mesh(roof_panelGeom, roofMat);
  right_roof_panel.name = "right_roof_panel";
  right_roof_panel.position.set(
    roofRun / 2,
    eaveY + roofRise / 2,
    0
  );
  right_roof_panel.rotation.z = -roofAngle;
  root.add(right_roof_panel);

  const roof_seamsGeom = new THREE.BoxGeometry(
    roofSlopeLength * 0.98,
    0.014,
    0.012
  );
  const roofSeamsPerSide = 17;
  const roof_seams = new THREE.InstancedMesh(
    roof_seamsGeom,
    roofSeamMat,
    roofSeamsPerSide * 2
  );
  roof_seams.name = "roof_seams";

  const roofDummy = new THREE.Object3D();
  let roofSeamIndex = 0;
  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? -1 : 1;
    for (let i = 0; i < roofSeamsPerSide; i++) {
      const z = -roofLength / 2 +
        (i + 0.5) * roofLength / roofSeamsPerSide;

      roofDummy.position.set(
        sign * roofRun / 2 + sign * Math.sin(roofAngle) * 0.026,
        eaveY + roofRise / 2 + Math.cos(roofAngle) * 0.026,
        z
      );
      roofDummy.rotation.set(0, 0, -sign * roofAngle);
      roofDummy.scale.set(1, 1, 1);
      roofDummy.updateMatrix();
      roof_seams.setMatrixAt(roofSeamIndex++, roofDummy.matrix);
    }
  }
  roof_seams.instanceMatrix.needsUpdate = true;
  root.add(roof_seams);

  const roof_rust_streaksGeom = new THREE.BoxGeometry(
    roofSlopeLength * 0.72,
    0.009,
    0.022
  );
  const roof_rust_streaks = new THREE.InstancedMesh(
    roof_rust_streaksGeom,
    rustMat,
    10
  );
  roof_rust_streaks.name = "roof_rust_streaks";

  for (let i = 0; i < 10; i++) {
    const sign = i < 5 ? -1 : 1;
    const j = i % 5;
    roofDummy.position.set(
      sign * roofRun / 2 + sign * Math.sin(roofAngle) * 0.034,
      eaveY + roofRise / 2 + Math.cos(roofAngle) * 0.034,
      -0.78 + j * 0.39
    );
    roofDummy.rotation.set(0, 0, -sign * roofAngle);
    roofDummy.scale.set(1, 1, 1);
    roofDummy.updateMatrix();
    roof_rust_streaks.setMatrixAt(i, roofDummy.matrix);
  }
  roof_rust_streaks.instanceMatrix.needsUpdate = true;
  root.add(roof_rust_streaks);

  const roof_fastenersGeom = new THREE.SphereGeometry(0.009, 8, 6);
  const roof_fasteners = new THREE.InstancedMesh(
    roof_fastenersGeom,
    roofSeamMat,
    roofSeamsPerSide * 2
  );
  roof_fasteners.name = "roof_fasteners";

  let fastenerIndex = 0;
  for (let side = 0; side < 2; side++) {
    const sign = side === 0 ? -1 : 1;
    for (let i = 0; i < roofSeamsPerSide; i++) {
      const z = -roofLength / 2 +
        (i + 0.5) * roofLength / roofSeamsPerSide;
      roofDummy.position.set(
        sign * 0.11 + sign * Math.sin(roofAngle) * 0.04,
        eaveY + 0.11 / Math.cos(roofAngle) +
          Math.cos(roofAngle) * 0.04,
        z
      );
      roofDummy.rotation.set(0, 0, 0);
      roofDummy.scale.set(1, 1, 1);
      roofDummy.updateMatrix();
      roof_fasteners.setMatrixAt(fastenerIndex++, roofDummy.matrix);
    }
  }
  roof_fasteners.instanceMatrix.needsUpdate = true;
  root.add(roof_fasteners);

  const ridge_capGeom = new THREE.BoxGeometry(
    0.075,
    0.055,
    roofLength + 0.04
  );
  const ridge_cap = new THREE.Mesh(ridge_capGeom, roofSeamMat);
  ridge_cap.name = "ridge_cap";
  ridge_cap.position.set(0, ridgeY + 0.025, 0);
  root.add(ridge_cap);

  const eave_fasciaGeom = new THREE.BoxGeometry(
    0.055,
    0.075,
    roofLength + 0.02
  );
  const left_eave_fascia = new THREE.Mesh(eave_fasciaGeom, darkWoodMat);
  left_eave_fascia.name = "left_eave_fascia";
  left_eave_fascia.position.set(-roofRun, eaveY - 0.005, 0);
  root.add(left_eave_fascia);

  const right_eave_fascia = new THREE.Mesh(eave_fasciaGeom, darkWoodMat);
  right_eave_fascia.name = "right_eave_fascia";
  right_eave_fascia.position.set(roofRun, eaveY - 0.005, 0);
  root.add(right_eave_fascia);

  function makeBeamBetween(start, end, thickness, depth, material, name) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const beamGeom = new THREE.BoxGeometry(thickness, length, depth);
    const beam = new THREE.Mesh(beamGeom, material);
    beam.name = name;
    beam.position.copy(start).add(end).multiplyScalar(0.5);
    beam.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    root.add(beam);
    return beam;
  }

  const front_left_fascia = makeBeamBetween(
    new THREE.Vector3(-roofRun, eaveY, roofLength / 2 + 0.018),
    new THREE.Vector3(0, ridgeY, roofLength / 2 + 0.018),
    0.058,
    0.065,
    lightWoodMat,
    "front_left_fascia"
  );

  const front_right_fascia = makeBeamBetween(
    new THREE.Vector3(0, ridgeY, roofLength / 2 + 0.018),
    new THREE.Vector3(roofRun, eaveY, roofLength / 2 + 0.018),
    0.058,
    0.065,
    lightWoodMat,
    "front_right_fascia"
  );

  const back_left_fascia = makeBeamBetween(
    new THREE.Vector3(-roofRun, eaveY, -roofLength / 2 - 0.018),
    new THREE.Vector3(0, ridgeY, -roofLength / 2 - 0.018),
    0.058,
    0.065,
    lightWoodMat,
    "back_left_fascia"
  );

  const back_right_fascia = makeBeamBetween(
    new THREE.Vector3(0, ridgeY, -roofLength / 2 - 0.018),
    new THREE.Vector3(roofRun, eaveY, -roofLength / 2 - 0.018),
    0.058,
    0.065,
    lightWoodMat,
    "back_right_fascia"
  );

  const front_gable_tieGeom = new THREE.BoxGeometry(
    buildingW + 0.04,
    0.055,
    0.065
  );
  const front_gable_tie = new THREE.Mesh(
    front_gable_tieGeom,
    lightWoodMat
  );
  front_gable_tie.name = "front_gable_tie";
  front_gable_tie.position.set(
    0,
    eaveY + 0.012,
    buildingD / 2 + 0.06
  );
  root.add(front_gable_tie);

  const doorX = -0.25;
  const doorBottom = 0.08;
  const doorW = 0.42;
  const doorH = 0.56;

  const door_recessGeom = new THREE.BoxGeometry(0.46, 0.60, 0.018);
  const door_recess = new THREE.Mesh(door_recessGeom, darkWoodMat);
  door_recess.name = "door_recess";
  door_recess.position.set(
    doorX,
    doorBottom + doorH / 2,
    buildingD / 2 + 0.018
  );
  root.add(door_recess);

  const door_leafGeom = new THREE.BoxGeometry(0.19, 0.53, 0.035);
  const left_door_leaf = new THREE.Mesh(door_leafGeom, doorMat);
  left_door_leaf.name = "left_door_leaf";
  left_door_leaf.position.set(
    doorX - 0.10,
    doorBottom + 0.265,
    buildingD / 2 + 0.045
  );
  root.add(left_door_leaf);

  const right_door_leaf = new THREE.Mesh(door_leafGeom, doorMat);
  right_door_leaf.name = "right_door_leaf";
  right_door_leaf.position.set(
    doorX + 0.10,
    doorBottom + 0.265,
    buildingD / 2 + 0.045
  );
  root.add(right_door_leaf);

  const door_center_seamGeom = new THREE.BoxGeometry(0.012, 0.53, 0.012);
  const door_center_seam = new THREE.Mesh(
    door_center_seamGeom,
    darkWoodMat
  );
  door_center_seam.name = "door_center_seam";
  door_center_seam.position.set(
    doorX,
    doorBottom + 0.265,
    buildingD / 2 + 0.069
  );
  root.add(door_center_seam);

  const door_side_frameGeom = new THREE.BoxGeometry(0.04, 0.60, 0.055);
  const door_left_frame = new THREE.Mesh(
    door_side_frameGeom,
    doorFrameMat
  );
  door_left_frame.name = "door_left_frame";
  door_left_frame.position.set(
    doorX - doorW / 2 - 0.018,
    doorBottom + doorH / 2,
    buildingD / 2 + 0.07
  );
  root.add(door_left_frame);

  const door_right_frame = new THREE.Mesh(
    door_side_frameGeom,
    doorFrameMat
  );
  door_right_frame.name = "door_right_frame";
  door_right_frame.position.set(
    doorX + doorW / 2 + 0.018,
    doorBottom + doorH / 2,
    buildingD / 2 + 0.07
  );
  root.add(door_right_frame);

  const door_headerGeom = new THREE.BoxGeometry(0.51, 0.055, 0.065);
  const door_header = new THREE.Mesh(door_headerGeom, doorFrameMat);
  door_header.name = "door_header";
  door_header.position.set(
    doorX,
    doorBottom + doorH + 0.022,
    buildingD / 2 + 0.075
  );
  root.add(door_header);

  const door_sillGeom = new THREE.BoxGeometry(0.47, 0.045, 0.12);
  const door_sill = new THREE.Mesh(door_sillGeom, lightWoodMat);
  door_sill.name = "door_sill";
  door_sill.position.set(doorX, 0.065, buildingD / 2 + 0.055);
  root.add(door_sill);

  const door_panel_accentsGeom = new THREE.BoxGeometry(
    0.135,
    0.145,
    0.012
  );
  const door_panel_accents = new THREE.InstancedMesh(
    door_panel_accentsGeom,
    doorFrameMat,
    4
  );
  door_panel_accents.name = "door_panel_accents";

  const panelPositions = [
    [doorX - 0.10, 0.215],
    [doorX + 0.10, 0.215],
    [doorX - 0.10, 0.445],
    [doorX + 0.10, 0.445]
  ];
  for (let i = 0; i < panelPositions.length; i++) {
    upperDummy.position.set(
      panelPositions[i][0],
      panelPositions[i][1],
      buildingD / 2 + 0.071
    );
    upperDummy.rotation.set(0, 0, 0);
    upperDummy.scale.set(1, 1, 1);
    upperDummy.updateMatrix();
    door_panel_accents.setMatrixAt(i, upperDummy.matrix);
  }
  door_panel_accents.instanceMatrix.needsUpdate = true;
  root.add(door_panel_accents);

  const door_hingesGeom = new THREE.BoxGeometry(0.11, 0.024, 0.018);
  const door_hinges = new THREE.InstancedMesh(
    door_hingesGeom,
    doorHardwareMat,
    4
  );
  door_hinges.name = "door_hinges";

  const hingePositions = [
    [doorX - 0.145, 0.19],
    [doorX - 0.145, 0.49],
    [doorX + 0.145, 0.19],
    [doorX + 0.145, 0.49]
  ];
  for (let i = 0; i < hingePositions.length; i++) {
    upperDummy.position.set(
      hingePositions[i][0],
      hingePositions[i][1],
      buildingD / 2 + 0.086
    );
    upperDummy.rotation.set(0, 0, 0);
    upperDummy.scale.set(1, 1, 1);
    upperDummy.updateMatrix();
    door_hinges.setMatrixAt(i, upperDummy.matrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  root.add(door_hinges);

  const door_handle_plateGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.012,
    12
  );
  const door_handle_plate = new THREE.Mesh(
    door_handle_plateGeom,
    doorHardwareMat
  );
  door_handle_plate.name = "door_handle_plate";
  door_handle_plate.rotation.x = Math.PI / 2;
  door_handle_plate.position.set(
    doorX + 0.035,
    0.34,
    buildingD / 2 + 0.094
  );
  root.add(door_handle_plate);

  const door_handleGeom = new THREE.SphereGeometry(0.018, 12, 8);
  const door_handle = new THREE.Mesh(door_handleGeom, doorHardwareMat);
  door_handle.name = "door_handle";
  door_handle.position.set(
    doorX + 0.035,
    0.34,
    buildingD / 2 + 0.115
  );
  root.add(door_handle);

  const windowX = -0.18;
  const windowY = 1.08;

  const loft_window_recessGeom = new THREE.BoxGeometry(
    0.285,
    0.315,
    0.018
  );
  const loft_window_recess = new THREE.Mesh(
    loft_window_recessGeom,
    windowRecessMat
  );
  loft_window_recess.name = "loft_window_recess";
  loft_window_recess.position.set(
    windowX,
    windowY,
    buildingD / 2 + 0.057
  );
  root.add(loft_window_recess);

  const loft_window_glassGeom = new THREE.BoxGeometry(
    0.225,
    0.245,
    0.012
  );
  const loft_window_glass = new THREE.Mesh(
    loft_window_glassGeom,
    windowGlassMat
  );
  loft_window_glass.name = "loft_window_glass";
  loft_window_glass.position.set(
    windowX,
    windowY,
    buildingD / 2 + 0.073
  );
  root.add(loft_window_glass);

  const window_side_frameGeom = new THREE.BoxGeometry(
    0.035,
    0.34,
    0.04
  );
  const loft_window_left_frame = new THREE.Mesh(
    window_side_frameGeom,
    lightWoodMat
  );
  loft_window_left_frame.name = "loft_window_left_frame";
  loft_window_left_frame.position.set(
    windowX - 0.145,
    windowY,
    buildingD / 2 + 0.085
  );
  root.add(loft_window_left_frame);

  const loft_window_right_frame = new THREE.Mesh(
    window_side_frameGeom,
    lightWoodMat
  );
  loft_window_right_frame.name = "loft_window_right_frame";
  loft_window_right_frame.position.set(
    windowX + 0.145,
    windowY,
    buildingD / 2 + 0.085
  );
  root.add(loft_window_right_frame);

  const window_cross_frameGeom = new THREE.BoxGeometry(
    0.325,
    0.035,
    0.04
  );
  const loft_window_top_frame = new THREE.Mesh(
    window_cross_frameGeom,
    lightWoodMat
  );
  loft_window_top_frame.name = "loft_window_top_frame";
  loft_window_top_frame.position.set(
    windowX,
    windowY + 0.17,
    buildingD / 2 + 0.085
  );
  root.add(loft_window_top_frame);

  const loft_window_bottom_frame = new THREE.Mesh(
    window_cross_frameGeom,
    lightWoodMat
  );
  loft_window_bottom_frame.name = "loft_window_bottom_frame";
  loft_window_bottom_frame.position.set(
    windowX,
    windowY - 0.17,
    buildingD / 2 + 0.085
  );
  root.add(loft_window_bottom_frame);

  const wood_knotsGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.008,
    10
  );
  const knotLocations = [
    [-0.53, 0.84],
    [-0.36, 1.31],
    [-0.08, 0.91],
    [0.13, 1.22],
    [0.34, 0.82],
    [0.51, 1.02]
  ];
  const wood_knots = new THREE.InstancedMesh(
    wood_knotsGeom,
    darkWoodMat,
    knotLocations.length
  );
  wood_knots.name = "wood_knots";

  for (let i = 0; i < knotLocations.length; i++) {
    roofDummy.position.set(
      knotLocations[i][0],
      knotLocations[i][1],
      buildingD / 2 + 0.055
    );
    roofDummy.rotation.set(Math.PI / 2, 0, 0);
    roofDummy.scale.set(1, 1, 1);
    roofDummy.updateMatrix();
    wood_knots.setMatrixAt(i, roofDummy.matrix);
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  root.add(wood_knots);

  fitToUnitCube(root);
  return root;

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
}