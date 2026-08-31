export default function generate(THREE) {
  const root = new THREE.Group();

  const brown_paintMat = new THREE.MeshStandardMaterial({
    color: 0x70472b,
    metalness: 0.2,
    roughness: 0.55,
  });
  const brown_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x5b3823,
    metalness: 0.15,
    roughness: 0.65,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const black_rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createRoundedPlateGeometry(width, depth, height, radius, bevel) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);
    return new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
      curveSegments: 8,
    });
  }

  function createLinkGeometry(length, startWidth, endWidth, depth) {
    const halfLength = length / 2;
    const startHalf = startWidth / 2;
    const endHalf = endWidth / 2;
    const chamfer = Math.min(0.035, startWidth * 0.12, endWidth * 0.12);
    const shape = new THREE.Shape();
    shape.moveTo(-halfLength + chamfer, -startHalf);
    shape.lineTo(halfLength - chamfer, -endHalf);
    shape.lineTo(halfLength, -endHalf + chamfer);
    shape.lineTo(halfLength, endHalf - chamfer);
    shape.lineTo(halfLength - chamfer, endHalf);
    shape.lineTo(-halfLength + chamfer, startHalf);
    shape.lineTo(-halfLength, startHalf - chamfer);
    shape.lineTo(-halfLength, -startHalf + chamfer);
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 2,
    });
  }

  function createSideProfileGeometry(points, depth, bevel) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
  }

  function orientLink(mesh, x1, y1, x2, y2, z) {
    mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, z);
    mesh.rotation.z = Math.atan2(y2 - y1, x2 - x1);
  }

  function createCylinderBetween(start, end, radius, material, segments) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const base_assembly = new THREE.Group();
  root.add(base_assembly);

  const base_plateGeom = createRoundedPlateGeometry(
    1.18,
    0.82,
    0.12,
    0.11,
    0.018
  );
  const base_plate = new THREE.Mesh(base_plateGeom, brown_paintMat);
  base_plate.rotation.x = -Math.PI / 2;
  base_plate.position.y = 0.018;
  base_assembly.add(base_plate);

  const base_top_deckGeom = createRoundedPlateGeometry(
    1.04,
    0.69,
    0.065,
    0.08,
    0.012
  );
  const base_top_deck = new THREE.Mesh(base_top_deckGeom, brown_paintMat);
  base_top_deck.rotation.x = -Math.PI / 2;
  base_top_deck.position.y = 0.105;
  base_assembly.add(base_top_deck);

  const base_front_ridgeGeom = new THREE.BoxGeometry(0.78, 0.045, 0.045);
  const base_front_ridge = new THREE.Mesh(
    base_front_ridgeGeom,
    brown_edgeMat
  );
  base_front_ridge.position.set(0, 0.17, 0.32);
  base_assembly.add(base_front_ridge);

  const base_rear_ridgeGeom = base_front_ridgeGeom;
  const base_rear_ridge = new THREE.Mesh(
    base_rear_ridgeGeom,
    brown_edgeMat
  );
  base_rear_ridge.position.set(0, 0.17, -0.32);
  base_assembly.add(base_rear_ridge);

  const base_side_ridgeGeom = new THREE.BoxGeometry(0.045, 0.045, 0.56);
  const base_left_ridge = new THREE.Mesh(
    base_side_ridgeGeom,
    brown_edgeMat
  );
  base_left_ridge.position.set(-0.49, 0.17, 0);
  base_assembly.add(base_left_ridge);

  const base_right_ridge = new THREE.Mesh(
    base_side_ridgeGeom,
    brown_edgeMat
  );
  base_right_ridge.position.set(0.49, 0.17, 0);
  base_assembly.add(base_right_ridge);

  const mounting_bossesGeom = new THREE.CylinderGeometry(
    0.075,
    0.085,
    0.08,
    16
  );
  const mounting_bosses = new THREE.InstancedMesh(
    mounting_bossesGeom,
    brown_paintMat,
    4
  );
  const mountingPositions = [
    [-0.49, 0.19, 0.29],
    [0.49, 0.19, 0.29],
    [-0.49, 0.19, -0.29],
    [0.49, 0.19, -0.29],
  ];
  const mountingDummy = new THREE.Object3D();
  for (let i = 0; i < mountingPositions.length; i++) {
    mountingDummy.position.set(
      mountingPositions[i][0],
      mountingPositions[i][1],
      mountingPositions[i][2]
    );
    mountingDummy.rotation.set(0, 0, 0);
    mountingDummy.scale.set(1, 1, 1);
    mountingDummy.updateMatrix();
    mounting_bosses.setMatrixAt(i, mountingDummy.matrix);
  }
  mounting_bosses.instanceMatrix.needsUpdate = true;
  base_assembly.add(mounting_bosses);

  const mounting_bolt_headsGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.022,
    16
  );
  const mounting_bolt_heads = new THREE.InstancedMesh(
    mounting_bolt_headsGeom,
    black_rubberMat,
    4
  );
  for (let i = 0; i < mountingPositions.length; i++) {
    mountingDummy.position.set(
      mountingPositions[i][0],
      0.242,
      mountingPositions[i][2]
    );
    mountingDummy.rotation.set(0, 0, 0);
    mountingDummy.scale.set(1, 1, 1);
    mountingDummy.updateMatrix();
    mounting_bolt_heads.setMatrixAt(i, mountingDummy.matrix);
  }
  mounting_bolt_heads.instanceMatrix.needsUpdate = true;
  base_assembly.add(mounting_bolt_heads);

  const turntable_lowerGeom = new THREE.CylinderGeometry(
    0.44,
    0.44,
    0.14,
    48
  );
  const turntable_lower = new THREE.Mesh(
    turntable_lowerGeom,
    brown_paintMat
  );
  turntable_lower.position.y = 0.235;
  base_assembly.add(turntable_lower);

  const turntable_seamGeom = new THREE.CylinderGeometry(
    0.445,
    0.445,
    0.018,
    48
  );
  const turntable_seam = new THREE.Mesh(
    turntable_seamGeom,
    black_rubberMat
  );
  turntable_seam.position.y = 0.31;
  base_assembly.add(turntable_seam);

  const turntable_upperGeom = new THREE.CylinderGeometry(
    0.415,
    0.435,
    0.13,
    48
  );
  const turntable_upper = new THREE.Mesh(
    turntable_upperGeom,
    brown_paintMat
  );
  turntable_upper.position.y = 0.37;
  base_assembly.add(turntable_upper);

  const turntable_top_rimGeom = new THREE.TorusGeometry(
    0.388,
    0.018,
    8,
    48
  );
  const turntable_top_rim = new THREE.Mesh(
    turntable_top_rimGeom,
    brown_edgeMat
  );
  turntable_top_rim.rotation.x = Math.PI / 2;
  turntable_top_rim.position.y = 0.425;
  base_assembly.add(turntable_top_rim);

  const pedestal_assembly = new THREE.Group();
  root.add(pedestal_assembly);

  const pedestal_housingGeom = createSideProfileGeometry(
    [
      [-0.34, 0.0],
      [0.34, 0.0],
      [0.33, 0.11],
      [0.23, 0.22],
      [0.10, 0.35],
      [-0.03, 0.41],
      [-0.17, 0.39],
      [-0.29, 0.29],
      [-0.35, 0.14],
    ],
    0.52,
    0.014
  );
  const pedestal_housing = new THREE.Mesh(
    pedestal_housingGeom,
    brown_paintMat
  );
  pedestal_housing.rotation.y = Math.PI / 2;
  pedestal_housing.position.set(-0.26, 0.40, 0);
  pedestal_assembly.add(pedestal_housing);

  const pedestal_front_ridgeGeom = new THREE.BoxGeometry(
    0.48,
    0.026,
    0.035
  );
  const pedestal_front_ridge = new THREE.Mesh(
    pedestal_front_ridgeGeom,
    brown_edgeMat
  );
  pedestal_front_ridge.position.set(0, 0.455, 0.275);
  pedestal_assembly.add(pedestal_front_ridge);

  const shoulder_supportGeom = createSideProfileGeometry(
    [
      [-0.20, 0.0],
      [0.20, 0.0],
      [0.18, 0.12],
      [0.10, 0.29],
      [-0.02, 0.34],
      [-0.14, 0.27],
      [-0.20, 0.12],
    ],
    0.38,
    0.012
  );
  const shoulder_support = new THREE.Mesh(
    shoulder_supportGeom,
    brown_edgeMat
  );
  shoulder_support.rotation.y = Math.PI / 2;
  shoulder_support.position.set(-0.19, 0.61, 0);
  pedestal_assembly.add(shoulder_support);

  const shoulder_axleGeom = new THREE.CylinderGeometry(
    0.145,
    0.145,
    0.48,
    32
  );
  const shoulder_axle = new THREE.Mesh(
    shoulder_axleGeom,
    brown_paintMat
  );
  shoulder_axle.rotation.z = Math.PI / 2;
  shoulder_axle.position.set(0, 0.88, 0);
  pedestal_assembly.add(shoulder_axle);

  const shoulder_capGeom = new THREE.CylinderGeometry(
    0.118,
    0.118,
    0.04,
    32
  );
  const shoulder_left_cap = new THREE.Mesh(
    shoulder_capGeom,
    dark_metalMat
  );
  shoulder_left_cap.rotation.z = Math.PI / 2;
  shoulder_left_cap.position.set(-0.26, 0.88, 0);
  pedestal_assembly.add(shoulder_left_cap);

  const shoulder_right_cap = new THREE.Mesh(
    shoulder_capGeom,
    dark_metalMat
  );
  shoulder_right_cap.rotation.z = Math.PI / 2;
  shoulder_right_cap.position.set(0.26, 0.88, 0);
  pedestal_assembly.add(shoulder_right_cap);

  const shoulder_boltGeom = new THREE.CylinderGeometry(
    0.034,
    0.034,
    0.022,
    16
  );
  const shoulder_left_bolt = new THREE.Mesh(
    shoulder_boltGeom,
    black_rubberMat
  );
  shoulder_left_bolt.rotation.z = Math.PI / 2;
  shoulder_left_bolt.position.set(-0.286, 0.88, 0);
  pedestal_assembly.add(shoulder_left_bolt);

  const shoulder_right_bolt = new THREE.Mesh(
    shoulder_boltGeom,
    black_rubberMat
  );
  shoulder_right_bolt.rotation.z = Math.PI / 2;
  shoulder_right_bolt.position.set(0.286, 0.88, 0);
  pedestal_assembly.add(shoulder_right_bolt);

  const pedestal_side_boltGeom = new THREE.CylinderGeometry(
    0.024,
    0.024,
    0.018,
    14
  );
  const pedestal_side_bolt = new THREE.Mesh(
    pedestal_side_boltGeom,
    dark_metalMat
  );
  pedestal_side_bolt.rotation.z = Math.PI / 2;
  pedestal_side_bolt.position.set(0.275, 0.75, 0.08);
  pedestal_assembly.add(pedestal_side_bolt);

  const arm_assembly = new THREE.Group();
  root.add(arm_assembly);

  const lower_armGeom = createLinkGeometry(0.86, 0.22, 0.20, 0.24);
  const lower_arm = new THREE.Mesh(lower_armGeom, brown_paintMat);
  orientLink(lower_arm, 0, 0.88, -0.36, 1.66, -0.12);
  arm_assembly.add(lower_arm);

  const lower_arm_edgeGeom = createLinkGeometry(0.70, 0.075, 0.065, 0.012);
  const lower_arm_edge = new THREE.Mesh(
    lower_arm_edgeGeom,
    brown_edgeMat
  );
  orientLink(lower_arm_edge, 0.01, 0.98, -0.27, 1.54, 0.137);
  arm_assembly.add(lower_arm_edge);

  const upper_armGeom = createLinkGeometry(0.80, 0.20, 0.18, 0.24);
  const upper_arm = new THREE.Mesh(upper_armGeom, brown_paintMat);
  orientLink(upper_arm, -0.36, 1.66, 0.46, 1.72, -0.12);
  arm_assembly.add(upper_arm);

  const upper_arm_edgeGeom = createLinkGeometry(0.65, 0.07, 0.06, 0.012);
  const upper_arm_edge = new THREE.Mesh(
    upper_arm_edgeGeom,
    brown_edgeMat
  );
  orientLink(upper_arm_edge, -0.25, 1.665, 0.36, 1.705, 0.137);
  arm_assembly.add(upper_arm_edge);

  const wrist_bracketGeom = createLinkGeometry(0.32, 0.18, 0.15, 0.22);
  const wrist_bracket = new THREE.Mesh(
    wrist_bracketGeom,
    brown_paintMat
  );
  orientLink(wrist_bracket, -0.36, 1.66, -0.56, 1.48, -0.11);
  arm_assembly.add(wrist_bracket);

  const wrist_side_plateGeom = createSideProfileGeometry(
    [
      [-0.11, 0.14],
      [0.08, 0.15],
      [0.15, 0.02],
      [0.09, -0.14],
      [-0.08, -0.15],
      [-0.15, -0.02],
    ],
    0.22,
    0.012
  );
  const wrist_side_plate = new THREE.Mesh(
    wrist_side_plateGeom,
    brown_paintMat
  );
  wrist_side_plate.position.set(-0.46, 1.57, -0.11);
  arm_assembly.add(wrist_side_plate);

  const joint_capGeom = new THREE.CylinderGeometry(
    0.09,
    0.09,
    0.035,
    28
  );
  const shoulder_front_cap = new THREE.Mesh(
    joint_capGeom,
    dark_metalMat
  );
  shoulder_front_cap.rotation.x = Math.PI / 2;
  shoulder_front_cap.position.set(0, 0.88, 0.16);
  arm_assembly.add(shoulder_front_cap);

  const elbow_front_cap = new THREE.Mesh(
    joint_capGeom,
    dark_metalMat
  );
  elbow_front_cap.rotation.x = Math.PI / 2;
  elbow_front_cap.position.set(-0.36, 1.66, 0.16);
  arm_assembly.add(elbow_front_cap);

  const wrist_front_cap = new THREE.Mesh(
    joint_capGeom,
    dark_metalMat
  );
  wrist_front_cap.rotation.x = Math.PI / 2;
  wrist_front_cap.position.set(-0.56, 1.48, 0.155);
  arm_assembly.add(wrist_front_cap);

  const joint_domeGeom = new THREE.SphereGeometry(0.073, 20, 12);
  const shoulder_front_dome = new THREE.Mesh(
    joint_domeGeom,
    black_rubberMat
  );
  shoulder_front_dome.scale.set(1, 1, 0.38);
  shoulder_front_dome.position.set(0, 0.88, 0.188);
  arm_assembly.add(shoulder_front_dome);

  const elbow_front_dome = new THREE.Mesh(
    joint_domeGeom,
    black_rubberMat
  );
  elbow_front_dome.scale.set(1, 1, 0.38);
  elbow_front_dome.position.set(-0.36, 1.66, 0.188);
  arm_assembly.add(elbow_front_dome);

  const wrist_front_dome = new THREE.Mesh(
    joint_domeGeom,
    black_rubberMat
  );
  wrist_front_dome.scale.set(0.88, 0.88, 0.34);
  wrist_front_dome.position.set(-0.56, 1.48, 0.182);
  arm_assembly.add(wrist_front_dome);

  const joint_boltGeom = new THREE.CylinderGeometry(
    0.026,
    0.026,
    0.022,
    14
  );
  const shoulder_joint_bolt = new THREE.Mesh(
    joint_boltGeom,
    dark_metalMat
  );
  shoulder_joint_bolt.rotation.x = Math.PI / 2;
  shoulder_joint_bolt.position.set(0, 0.88, 0.222);
  arm_assembly.add(shoulder_joint_bolt);

  const elbow_joint_bolt = new THREE.Mesh(
    joint_boltGeom,
    dark_metalMat
  );
  elbow_joint_bolt.rotation.x = Math.PI / 2;
  elbow_joint_bolt.position.set(-0.36, 1.66, 0.222);
  arm_assembly.add(elbow_joint_bolt);

  const wrist_joint_bolt = new THREE.Mesh(
    joint_boltGeom,
    dark_metalMat
  );
  wrist_joint_bolt.rotation.x = Math.PI / 2;
  wrist_joint_bolt.position.set(-0.56, 1.48, 0.212);
  arm_assembly.add(wrist_joint_bolt);

  const wrist_lower_bolt = new THREE.Mesh(
    joint_boltGeom,
    dark_metalMat
  );
  wrist_lower_bolt.rotation.x = Math.PI / 2;
  wrist_lower_bolt.scale.set(0.8, 0.8, 0.8);
  wrist_lower_bolt.position.set(-0.49, 1.405, 0.155);
  arm_assembly.add(wrist_lower_bolt);

  const tool_cup_start = new THREE.Vector3(-0.59, 1.405, 0);
  const tool_cup_end = new THREE.Vector3(-0.68, 1.205, 0);
  const tool_cup = createCylinderBetween(
    tool_cup_start,
    tool_cup_end,
    0.09,
    brown_paintMat,
    28
  );
  arm_assembly.add(tool_cup);

  const tool_cup_rim_start = new THREE.Vector3(
    -0.665,
    1.245,
    0
  );
  const tool_cup_rim_end = new THREE.Vector3(
    -0.685,
    1.198,
    0
  );
  const tool_cup_rim = createCylinderBetween(
    tool_cup_rim_start,
    tool_cup_rim_end,
    0.102,
    brown_edgeMat,
    28
  );
  arm_assembly.add(tool_cup_rim);

  const spindle_start = new THREE.Vector3(-0.68, 1.205, 0);
  const spindle_end = new THREE.Vector3(-0.72, 1.105, 0);
  const spindle = createCylinderBetween(
    spindle_start,
    spindle_end,
    0.043,
    dark_metalMat,
    18
  );
  arm_assembly.add(spindle);

  const grip_start = new THREE.Vector3(-0.715, 1.11, 0);
  const grip_end = new THREE.Vector3(-0.755, 1.025, 0);
  const grip = createCylinderBetween(
    grip_start,
    grip_end,
    0.065,
    black_rubberMat,
    20
  );
  arm_assembly.add(grip);

  const upper_arm_spring_core_start = new THREE.Vector3(
    -0.22,
    1.765,
    0.155
  );
  const upper_arm_spring_core_end = new THREE.Vector3(
    -0.02,
    1.77,
    0.155
  );
  const upper_arm_spring_core = createCylinderBetween(
    upper_arm_spring_core_start,
    upper_arm_spring_core_end,
    0.012,
    dark_metalMat,
    10
  );
  arm_assembly.add(upper_arm_spring_core);

  const upper_arm_springPoints = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const angle = t * Math.PI * 10;
    upper_arm_springPoints.push(
      new THREE.Vector3(
        -0.22 + 0.20 * t,
        1.765 + 0.005 * t + Math.cos(angle) * 0.018,
        0.155 + Math.sin(angle) * 0.018
      )
    );
  }
  const upper_arm_springGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(upper_arm_springPoints),
    60,
    0.007,
    6,
    false
  );
  const upper_arm_spring = new THREE.Mesh(
    upper_arm_springGeom,
    black_rubberMat
  );
  arm_assembly.add(upper_arm_spring);

  const cablePoints = [
    new THREE.Vector3(0.26, 0.88, -0.16),
    new THREE.Vector3(0.34, 1.05, -0.16),
    new THREE.Vector3(0.28, 1.30, -0.16),
    new THREE.Vector3(0.14, 1.55, -0.16),
    new THREE.Vector3(-0.08, 1.72, -0.16),
    new THREE.Vector3(-0.30, 1.77, -0.16),
    new THREE.Vector3(-0.43, 1.72, -0.16),
  ];
  const cable_housingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(cablePoints),
    48,
    0.022,
    8,
    false
  );
  const cable_housing = new THREE.Mesh(
    cable_housingGeom,
    black_rubberMat
  );
  arm_assembly.add(cable_housing);

  const shoulder_cable_collarGeom = new THREE.TorusGeometry(
    0.032,
    0.007,
    6,
    18
  );
  const shoulder_cable_collar = new THREE.Mesh(
    shoulder_cable_collarGeom,
    black_rubberMat
  );
  shoulder_cable_collar.rotation.y = Math.PI / 2;
  shoulder_cable_collar.position.set(0.275, 0.88, 0);
  arm_assembly.add(shoulder_cable_collar);

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