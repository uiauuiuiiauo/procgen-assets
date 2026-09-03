export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "tabletop_greenhouse";

  const width = 1.50;
  const depth = 1.30;
  const halfW = width / 2;
  const halfD = depth / 2;
  const wallBottom = 0.14;
  const eaveY = 1.18;
  const ridgeY = 1.67;
  const wallH = eaveY - wallBottom;

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const blackPlasticMat = new THREE.MeshStandardMaterial({
    color: 0x202322,
    metalness: 0.0,
    roughness: 0.8,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xa77c50,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x765033,
    metalness: 0.0,
    roughness: 0.6,
  });
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x30251b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const mulchMat = new THREE.MeshStandardMaterial({
    color: 0x493522,
    metalness: 0.0,
    roughness: 0.95,
  });
  const frostedGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce5e1,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const fernLightMat = new THREE.MeshStandardMaterial({
    color: 0x5f9638,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const fernDarkMat = new THREE.MeshStandardMaterial({
    color: 0x315f25,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const fernStemMat = new THREE.MeshStandardMaterial({
    color: 0x426f2d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const mossMat = new THREE.MeshStandardMaterial({
    color: 0x496d2d,
    metalness: 0.0,
    roughness: 0.95,
  });

  const frame_group = new THREE.Group();
  frame_group.name = "aluminum_frame";
  root.add(frame_group);

  const glazing_group = new THREE.Group();
  glazing_group.name = "frosted_glazing";
  root.add(glazing_group);

  const planter_group = new THREE.Group();
  planter_group.name = "wooden_planter";
  root.add(planter_group);

  const door_group = new THREE.Group();
  door_group.name = "front_door";
  root.add(door_group);

  const plants_group = new THREE.Group();
  plants_group.name = "fern_plants";
  root.add(plants_group);

  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);
  const dummy = new THREE.Object3D();
  const upAxis = new THREE.Vector3(0, 1, 0);

  function addBeam(target, p1, p2, thickness, material) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const beam = new THREE.Mesh(unitBoxGeom, material);
    beam.position.copy(p1).add(p2).multiplyScalar(0.5);
    beam.quaternion.setFromUnitVectors(upAxis, direction.normalize());
    beam.scale.set(thickness, length, thickness);
    target.add(beam);
    return beam;
  }

  const corner_posts = new THREE.InstancedMesh(unitBoxGeom, aluminumMat, 4);
  corner_posts.name = "corner_posts";
  const cornerPositions = [
    [-halfW, halfD],
    [halfW, halfD],
    [-halfW, -halfD],
    [halfW, -halfD],
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    dummy.position.set(cornerPositions[i][0], wallBottom + wallH / 2, cornerPositions[i][1]);
    dummy.quaternion.identity();
    dummy.scale.set(0.065, wallH + 0.03, 0.065);
    dummy.updateMatrix();
    corner_posts.setMatrixAt(i, dummy.matrix);
  }
  corner_posts.instanceMatrix.needsUpdate = true;
  frame_group.add(corner_posts);

  const front_base_rail = new THREE.Mesh(unitBoxGeom, aluminumMat);
  front_base_rail.name = "front_base_rail";
  front_base_rail.position.set(0, 0.075, halfD + 0.018);
  front_base_rail.scale.set(width + 0.08, 0.105, 0.075);
  frame_group.add(front_base_rail);

  const rear_base_rail = new THREE.Mesh(unitBoxGeom, aluminumMat);
  rear_base_rail.name = "rear_base_rail";
  rear_base_rail.position.set(0, 0.075, -halfD - 0.018);
  rear_base_rail.scale.set(width + 0.08, 0.105, 0.075);
  frame_group.add(rear_base_rail);

  const left_base_rail = new THREE.Mesh(unitBoxGeom, aluminumMat);
  left_base_rail.name = "left_base_rail";
  left_base_rail.position.set(-halfW - 0.018, 0.075, 0);
  left_base_rail.scale.set(0.075, 0.105, depth + 0.08);
  frame_group.add(left_base_rail);

  const right_base_rail = new THREE.Mesh(unitBoxGeom, aluminumMat);
  right_base_rail.name = "right_base_rail";
  right_base_rail.position.set(halfW + 0.018, 0.075, 0);
  right_base_rail.scale.set(0.075, 0.105, depth + 0.08);
  frame_group.add(right_base_rail);

  const front_eave_beam = new THREE.Mesh(unitBoxGeom, aluminumMat);
  front_eave_beam.name = "front_eave_beam";
  front_eave_beam.position.set(0, eaveY, halfD);
  front_eave_beam.scale.set(width + 0.08, 0.065, 0.065);
  frame_group.add(front_eave_beam);

  const rear_eave_beam = new THREE.Mesh(unitBoxGeom, aluminumMat);
  rear_eave_beam.name = "rear_eave_beam";
  rear_eave_beam.position.set(0, eaveY, -halfD);
  rear_eave_beam.scale.set(width + 0.08, 0.065, 0.065);
  frame_group.add(rear_eave_beam);

  const left_eave_beam = new THREE.Mesh(unitBoxGeom, aluminumMat);
  left_eave_beam.name = "left_eave_beam";
  left_eave_beam.position.set(-halfW, eaveY, 0);
  left_eave_beam.scale.set(0.065, 0.065, depth + 0.08);
  frame_group.add(left_eave_beam);

  const right_eave_beam = new THREE.Mesh(unitBoxGeom, aluminumMat);
  right_eave_beam.name = "right_eave_beam";
  right_eave_beam.position.set(halfW, eaveY, 0);
  right_eave_beam.scale.set(0.065, 0.065, depth + 0.08);
  frame_group.add(right_eave_beam);

  const ridge_beam = new THREE.Mesh(unitBoxGeom, aluminumMat);
  ridge_beam.name = "ridge_beam";
  ridge_beam.position.set(0, ridgeY, 0);
  ridge_beam.scale.set(0.075, 0.075, depth + 0.13);
  frame_group.add(ridge_beam);

  const roof_rafter_group = new THREE.Group();
  roof_rafter_group.name = "roof_rafters";
  frame_group.add(roof_rafter_group);
  const rafterZ = [-halfD - 0.025, -0.22, 0.22, halfD + 0.025];
  for (let i = 0; i < rafterZ.length; i++) {
    addBeam(
      roof_rafter_group,
      new THREE.Vector3(-halfW - 0.025, eaveY, rafterZ[i]),
      new THREE.Vector3(0, ridgeY, rafterZ[i]),
      0.055,
      aluminumMat
    );
    addBeam(
      roof_rafter_group,
      new THREE.Vector3(0, ridgeY, rafterZ[i]),
      new THREE.Vector3(halfW + 0.025, eaveY, rafterZ[i]),
      0.055,
      aluminumMat
    );
  }

  const roof_center_seam = addBeam(
    frame_group,
    new THREE.Vector3(0, ridgeY + 0.018, -halfD - 0.055),
    new THREE.Vector3(0, ridgeY + 0.018, halfD + 0.055),
    0.035,
    silverMat
  );
  roof_center_seam.name = "roof_center_seam";

  const corner_capGeom = new THREE.SphereGeometry(0.045, 12, 8);
  const roof_corner_caps = new THREE.InstancedMesh(corner_capGeom, blackPlasticMat, 4);
  roof_corner_caps.name = "roof_corner_caps";
  const roofCapPositions = [
    [-halfW - 0.035, eaveY - 0.005, halfD + 0.035],
    [halfW + 0.035, eaveY - 0.005, halfD + 0.035],
    [-halfW - 0.035, eaveY - 0.005, -halfD - 0.035],
    [halfW + 0.035, eaveY - 0.005, -halfD - 0.035],
  ];
  for (let i = 0; i < roofCapPositions.length; i++) {
    dummy.position.set(roofCapPositions[i][0], roofCapPositions[i][1], roofCapPositions[i][2]);
    dummy.quaternion.identity();
    dummy.scale.set(1.1, 0.75, 1.1);
    dummy.updateMatrix();
    roof_corner_caps.setMatrixAt(i, dummy.matrix);
  }
  roof_corner_caps.instanceMatrix.needsUpdate = true;
  frame_group.add(roof_corner_caps);

  const wallGlassGeom = new THREE.BoxGeometry(width - 0.11, wallH - 0.07, 0.012);
  const front_wall_glass = new THREE.Mesh(wallGlassGeom, frostedGlassMat);
  front_wall_glass.name = "front_wall_glass";
  front_wall_glass.position.set(0, wallBottom + wallH / 2, halfD - 0.012);
  glazing_group.add(front_wall_glass);

  const rear_wall_glass = new THREE.Mesh(wallGlassGeom, frostedGlassMat);
  rear_wall_glass.name = "rear_wall_glass";
  rear_wall_glass.position.set(0, wallBottom + wallH / 2, -halfD + 0.012);
  glazing_group.add(rear_wall_glass);

  const sideGlassGeom = new THREE.BoxGeometry(0.012, wallH - 0.07, depth - 0.11);
  const left_wall_glass = new THREE.Mesh(sideGlassGeom, frostedGlassMat);
  left_wall_glass.name = "left_wall_glass";
  left_wall_glass.position.set(-halfW + 0.012, wallBottom + wallH / 2, 0);
  glazing_group.add(left_wall_glass);

  const right_wall_glass = new THREE.Mesh(sideGlassGeom, frostedGlassMat);
  right_wall_glass.name = "right_wall_glass";
  right_wall_glass.position.set(halfW - 0.012, wallBottom + wallH / 2, 0);
  glazing_group.add(right_wall_glass);

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-halfW + 0.055, 0);
  gableShape.lineTo(halfW - 0.055, 0);
  gableShape.lineTo(0, ridgeY - eaveY - 0.035);
  gableShape.lineTo(-halfW + 0.055, 0);
  const gableGeom = new THREE.ShapeGeometry(gableShape);

  const front_gable_glass = new THREE.Mesh(gableGeom, frostedGlassMat);
  front_gable_glass.name = "front_gable_glass";
  front_gable_glass.position.set(0, eaveY, halfD - 0.012);
  glazing_group.add(front_gable_glass);

  const rear_gable_glass = new THREE.Mesh(gableGeom, frostedGlassMat);
  rear_gable_glass.name = "rear_gable_glass";
  rear_gable_glass.position.set(0, eaveY, -halfD + 0.012);
  glazing_group.add(rear_gable_glass);

  const roofRun = halfW - 0.035;
  const roofRise = ridgeY - eaveY;
  const roofAngle = Math.atan2(roofRise, roofRun);
  const roofSlopeLength = Math.sqrt(roofRun * roofRun + roofRise * roofRise);
  const roofGlassGeom = new THREE.BoxGeometry(roofSlopeLength - 0.055, 0.012, depth - 0.08);

  const left_roof_glass = new THREE.Mesh(roofGlassGeom, frostedGlassMat);
  left_roof_glass.name = "left_roof_glass";
  left_roof_glass.position.set(-halfW / 2, eaveY + roofRise / 2, 0);
  left_roof_glass.rotation.z = roofAngle;
  glazing_group.add(left_roof_glass);

  const right_roof_glass = new THREE.Mesh(roofGlassGeom, frostedGlassMat);
  right_roof_glass.name = "right_roof_glass";
  right_roof_glass.position.set(halfW / 2, eaveY + roofRise / 2, 0);
  right_roof_glass.rotation.z = -roofAngle;
  glazing_group.add(right_roof_glass);

  const soil_bed = new THREE.Mesh(unitBoxGeom, soilMat);
  soil_bed.name = "soil_bed";
  soil_bed.position.set(0, 0.235, 0);
  soil_bed.scale.set(width - 0.17, 0.22, depth - 0.17);
  planter_group.add(soil_bed);

  const front_planter_board = new THREE.Mesh(unitBoxGeom, woodMat);
  front_planter_board.name = "front_planter_board";
  front_planter_board.position.set(0, 0.22, halfD - 0.045);
  front_planter_board.scale.set(width - 0.10, 0.17, 0.065);
  planter_group.add(front_planter_board);

  const rear_planter_board = new THREE.Mesh(unitBoxGeom, woodMat);
  rear_planter_board.name = "rear_planter_board";
  rear_planter_board.position.set(0, 0.22, -halfD + 0.045);
  rear_planter_board.scale.set(width - 0.10, 0.17, 0.065);
  planter_group.add(rear_planter_board);

  const left_planter_board = new THREE.Mesh(unitBoxGeom, woodMat);
  left_planter_board.name = "left_planter_board";
  left_planter_board.position.set(-halfW + 0.045, 0.22, 0);
  left_planter_board.scale.set(0.065, 0.17, depth - 0.10);
  planter_group.add(left_planter_board);

  const right_planter_board = new THREE.Mesh(unitBoxGeom, woodMat);
  right_planter_board.name = "right_planter_board";
  right_planter_board.position.set(halfW - 0.045, 0.22, 0);
  right_planter_board.scale.set(0.065, 0.17, depth - 0.10);
  planter_group.add(right_planter_board);

  const front_wood_grain = new THREE.InstancedMesh(unitBoxGeom, woodDarkMat, 3);
  front_wood_grain.name = "front_wood_grain";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(-0.04 + i * 0.035, 0.17 + i * 0.045, halfD - 0.009);
    dummy.quaternion.identity();
    dummy.scale.set(width - 0.20 - i * 0.07, 0.008, 0.006);
    dummy.updateMatrix();
    front_wood_grain.setMatrixAt(i, dummy.matrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  planter_group.add(front_wood_grain);

  const doorW = 0.72;
  const doorBottom = 0.16;
  const doorTop = 1.13;
  const doorH = doorTop - doorBottom;
  const doorX = -0.04;
  const doorZ = halfD + 0.047;

  const door_glass = new THREE.Mesh(
    new THREE.BoxGeometry(doorW - 0.115, doorH - 0.115, 0.014),
    frostedGlassMat
  );
  door_glass.name = "door_glass";
  door_glass.position.set(doorX, (doorBottom + doorTop) / 2, doorZ - 0.022);
  door_group.add(door_glass);

  const door_left_stile = new THREE.Mesh(unitBoxGeom, silverMat);
  door_left_stile.name = "door_left_stile";
  door_left_stile.position.set(doorX - doorW / 2, (doorBottom + doorTop) / 2, doorZ);
  door_left_stile.scale.set(0.055, doorH, 0.045);
  door_group.add(door_left_stile);

  const door_right_stile = new THREE.Mesh(unitBoxGeom, silverMat);
  door_right_stile.name = "door_right_stile";
  door_right_stile.position.set(doorX + doorW / 2, (doorBottom + doorTop) / 2, doorZ);
  door_right_stile.scale.set(0.055, doorH, 0.045);
  door_group.add(door_right_stile);

  const door_top_rail = new THREE.Mesh(unitBoxGeom, silverMat);
  door_top_rail.name = "door_top_rail";
  door_top_rail.position.set(doorX, doorTop, doorZ);
  door_top_rail.scale.set(doorW, 0.06, 0.045);
  door_group.add(door_top_rail);

  const door_bottom_rail = new THREE.Mesh(unitBoxGeom, silverMat);
  door_bottom_rail.name = "door_bottom_rail";
  door_bottom_rail.position.set(doorX, doorBottom, doorZ);
  door_bottom_rail.scale.set(doorW, 0.06, 0.045);
  door_group.add(door_bottom_rail);

  const door_left_trim = new THREE.Mesh(unitBoxGeom, aluminumMat);
  door_left_trim.name = "door_left_trim";
  door_left_trim.position.set(doorX - doorW / 2 - 0.032, (doorBottom + doorTop) / 2, doorZ - 0.005);
  door_left_trim.scale.set(0.035, doorH + 0.05, 0.035);
  door_group.add(door_left_trim);

  const door_right_trim = new THREE.Mesh(unitBoxGeom, aluminumMat);
  door_right_trim.name = "door_right_trim";
  door_right_trim.position.set(doorX + doorW / 2 + 0.032, (doorBottom + doorTop) / 2, doorZ - 0.005);
  door_right_trim.scale.set(0.035, doorH + 0.05, 0.035);
  door_group.add(door_right_trim);

  const door_hinges = new THREE.InstancedMesh(unitBoxGeom, silverMat, 3);
  door_hinges.name = "door_hinges";
  for (let i = 0; i < 3; i++) {
    dummy.position.set(doorX + doorW / 2 + 0.052, 0.35 + i * 0.34, doorZ + 0.025);
    dummy.quaternion.identity();
    dummy.scale.set(0.025, 0.105, 0.028);
    dummy.updateMatrix();
    door_hinges.setMatrixAt(i, dummy.matrix);
  }
  door_hinges.instanceMatrix.needsUpdate = true;
  door_group.add(door_hinges);

  const handleX = doorX + doorW / 2 - 0.105;
  const handleY = 0.66;

  const door_handle_hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.044, 0.044, 0.035, 20),
    silverMat
  );
  door_handle_hub.name = "door_handle_hub";
  door_handle_hub.rotation.x = Math.PI / 2;
  door_handle_hub.position.set(handleX, handleY, doorZ + 0.046);
  door_group.add(door_handle_hub);

  const door_handle_lever = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.016, 0.20, 12),
    silverMat
  );
  door_handle_lever.name = "door_handle_lever";
  door_handle_lever.rotation.z = Math.PI / 2;
  door_handle_lever.position.set(handleX - 0.10, handleY, doorZ + 0.066);
  door_group.add(door_handle_lever);

  const door_latch_plate = new THREE.Mesh(unitBoxGeom, darkMetalMat);
  door_latch_plate.name = "door_latch_plate";
  door_latch_plate.position.set(doorX + doorW / 2 + 0.025, handleY, doorZ - 0.018);
  door_latch_plate.scale.set(0.025, 0.09, 0.018);
  door_group.add(door_latch_plate);

  const frameFastenerPositions = [
    [-halfW, 0.31, halfD + 0.038],
    [-halfW, 0.72, halfD + 0.038],
    [-halfW, 1.08, halfD + 0.038],
    [halfW, 0.31, halfD + 0.038],
    [halfW, 0.72, halfD + 0.038],
    [halfW, 1.08, halfD + 0.038],
    [-0.58, eaveY, halfD + 0.038],
    [0.58, eaveY, halfD + 0.038],
  ];
  const frame_fastenerGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.008, 12);
  const frame_fasteners = new THREE.InstancedMesh(
    frame_fastenerGeom,
    darkMetalMat,
    frameFastenerPositions.length
  );
  frame_fasteners.name = "frame_fasteners";
  for (let i = 0; i < frameFastenerPositions.length; i++) {
    dummy.position.set(
      frameFastenerPositions[i][0],
      frameFastenerPositions[i][1],
      frameFastenerPositions[i][2]
    );
    dummy.rotation.set(Math.PI / 2, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    frame_fasteners.setMatrixAt(i, dummy.matrix);
  }
  frame_fasteners.instanceMatrix.needsUpdate = true;
  frame_group.add(frame_fasteners);

  const fern_leafShape = new THREE.Shape();
  fern_leafShape.moveTo(0, 0);
  fern_leafShape.lineTo(-0.10, 0.10);
  fern_leafShape.lineTo(-0.20, 0.18);
  fern_leafShape.lineTo(-0.14, 0.25);
  fern_leafShape.lineTo(-0.28, 0.34);
  fern_leafShape.lineTo(-0.18, 0.42);
  fern_leafShape.lineTo(-0.32, 0.51);
  fern_leafShape.lineTo(-0.19, 0.60);
  fern_leafShape.lineTo(-0.27, 0.70);
  fern_leafShape.lineTo(-0.14, 0.79);
  fern_leafShape.lineTo(-0.16, 0.88);
  fern_leafShape.lineTo(0, 1.00);
  fern_leafShape.lineTo(0.16, 0.88);
  fern_leafShape.lineTo(0.14, 0.79);
  fern_leafShape.lineTo(0.27, 0.70);
  fern_leafShape.lineTo(0.19, 0.60);
  fern_leafShape.lineTo(0.32, 0.51);
  fern_leafShape.lineTo(0.18, 0.42);
  fern_leafShape.lineTo(0.28, 0.34);
  fern_leafShape.lineTo(0.14, 0.25);
  fern_leafShape.lineTo(0.20, 0.18);
  fern_leafShape.lineTo(0.10, 0.10);
  fern_leafShape.lineTo(0, 0);
  const fern_leafGeom = new THREE.ShapeGeometry(fern_leafShape);

  const plantBases = [
    { x: -0.47, z: 0.40, scale: 0.95 },
    { x: 0.39, z: 0.39, scale: 1.05 },
    { x: 0.38, z: -0.34, scale: 0.90 },
    { x: -0.42, z: -0.34, scale: 0.78 },
  ];
  const frondsPerPlant = 10;
  const leafPairsPerFrond = 12;
  const frondCount = plantBases.length * frondsPerPlant;
  const leafCount = frondCount * leafPairsPerFrond * 2;

  const fern_stems = new THREE.Group();
  fern_stems.name = "fern_stems";
  plants_group.add(fern_stems);

  const fern_leaflets_light = new THREE.InstancedMesh(fern_leafGeom, fernLightMat, leafCount / 2);
  fern_leaflets_light.name = "fern_leaflets_light";
  const fern_leaflets_dark = new THREE.InstancedMesh(fern_leafGeom, fernDarkMat, leafCount / 2);
  fern_leaflets_dark.name = "fern_leaflets_dark";

  const localLeafAxis = new THREE.Vector3(0, 0, 1);
  const localTwistAxis = new THREE.Vector3(0, 0, 1);
  const leafMatrix = new THREE.Matrix4();
  let lightLeafIndex = 0;
  let darkLeafIndex = 0;

  for (let p = 0; p < plantBases.length; p++) {
    const base = plantBases[p];

    for (let f = 0; f < frondsPerPlant; f++) {
      const angle = f / frondsPerPlant * Math.PI * 2 + p * 0.37;
      const radial = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const lateral = new THREE.Vector3(-Math.sin(angle), 0, Math.cos(angle));
      const frondLength = base.scale * (0.43 + 0.035 * ((f + p) % 4));
      const lift = 0.35 + 0.055 * ((f + 2 * p) % 4);

      const frondPoints = [
        new THREE.Vector3(base.x, 0.32, base.z),
        new THREE.Vector3(
          base.x + radial.x * frondLength * 0.24,
          0.32 + lift * 0.58,
          base.z + radial.z * frondLength * 0.24
        ),
        new THREE.Vector3(
          base.x + radial.x * frondLength * 0.62,
          0.32 + lift * 0.98,
          base.z + radial.z * frondLength * 0.62
        ),
        new THREE.Vector3(
          base.x + radial.x * frondLength,
          0.32 + lift * 0.68,
          base.z + radial.z * frondLength
        ),
      ];

      const fern_stemGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(frondPoints, false, "centripetal"),
        14,
        0.006,
        5,
        false
      );
      const fern_stem = new THREE.Mesh(fern_stemGeom, fernStemMat);
      fern_stem.name = "fern_stem";
      fern_stems.add(fern_stem);

      for (let k = 0; k < leafPairsPerFrond; k++) {
        const t = 0.10 + k * (0.76 / (leafPairsPerFrond - 1));
        const center = new THREE.Vector3().lerpVectors(frondPoints[1], frondPoints[3], t);
        const leafSize = base.scale * (0.105 + 0.075 * Math.sin(Math.PI * t));

        for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
          const side = sideIndex === 0 ? -1 : 1;
          const leafDirection = lateral.clone().multiplyScalar(side)
            .addScaledVector(radial, 0.16)
            .normalize();
          const leafQuaternion = new THREE.Quaternion().setFromUnitVectors(
            localLeafAxis,
            leafDirection
          );
          const leafTwist = new THREE.Quaternion().setFromAxisAngle(
            localTwistAxis,
            side * 0.16 + 0.05 * ((k + f) % 3)
          );
          leafQuaternion.multiply(leafTwist);
          leafMatrix.compose(
            center,
            leafQuaternion,
            new THREE.Vector3(leafSize, leafSize, 1)
          );

          if ((k + f + p + sideIndex) % 2 === 0) {
            fern_leaflets_light.setMatrixAt(lightLeafIndex++, leafMatrix);
          } else {
            fern_leaflets_dark.setMatrixAt(darkLeafIndex++, leafMatrix);
          }
        }
      }
    }
  }

  fern_leaflets_light.instanceMatrix.needsUpdate = true;
  fern_leaflets_dark.instanceMatrix.needsUpdate = true;
  plants_group.add(fern_leaflets_light);
  plants_group.add(fern_leaflets_dark);

  const moss_clumpGeom = new THREE.IcosahedronGeometry(1, 1);
  const moss_clumps = new THREE.InstancedMesh(moss_clumpGeom, mossMat, 24);
  moss_clumps.name = "moss_clumps";
  for (let i = 0; i < 24; i++) {
    const x = -0.62 + ((i * 7) % 23) / 22 * 1.24;
    const z = -0.52 + ((i * 11) % 19) / 18 * 1.04;
    const size = 0.035 + 0.012 * (i % 4);
    dummy.position.set(x, 0.35 + 0.006 * (i % 3), z);
    dummy.quaternion.identity();
    dummy.scale.set(size, size * 0.55, size * 0.85);
    dummy.updateMatrix();
    moss_clumps.setMatrixAt(i, dummy.matrix);
  }
  moss_clumps.instanceMatrix.needsUpdate = true;
  plants_group.add(moss_clumps);

  const mulch_pieceGeom = new THREE.DodecahedronGeometry(1, 0);
  const mulch_pieces = new THREE.InstancedMesh(mulch_pieceGeom, mulchMat, 18);
  mulch_pieces.name = "mulch_pieces";
  for (let i = 0; i < 18; i++) {
    const x = -0.58 + ((i * 5) % 17) / 16 * 1.16;
    const z = -0.48 + ((i * 9) % 17) / 16 * 0.96;
    dummy.position.set(x, 0.36 + 0.008 * (i % 2), z);
    dummy.quaternion.setFromAxisAngle(upAxis, i * 0.73);
    dummy.scale.set(0.025 + 0.006 * (i % 3), 0.012, 0.035 + 0.005 * (i % 2));
    dummy.updateMatrix();
    mulch_pieces.setMatrixAt(i, dummy.matrix);
  }
  mulch_pieces.instanceMatrix.needsUpdate = true;
  plants_group.add(mulch_pieces);

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