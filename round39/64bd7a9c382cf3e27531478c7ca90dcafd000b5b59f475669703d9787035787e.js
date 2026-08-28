export default function generate(THREE) {
  const root = new THREE.Group();

  const brownMat = new THREE.MeshStandardMaterial({
    color: 0x6f452b,
    metalness: 0.15,
    roughness: 0.5,
  });
  const brownLightMat = new THREE.MeshStandardMaterial({
    color: 0x805237,
    metalness: 0.12,
    roughness: 0.48,
  });
  const brownDarkMat = new THREE.MeshStandardMaterial({
    color: 0x43291b,
    metalness: 0.1,
    roughness: 0.65,
  });
  const blackMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  function makeRoundedRectShape(width, height, radius) {
    const x = width / 2;
    const y = height / 2;
    const r = Math.min(radius, x, y);
    const shape = new THREE.Shape();
    shape.moveTo(-x + r, -y);
    shape.lineTo(x - r, -y);
    shape.quadraticCurveTo(x, -y, x, -y + r);
    shape.lineTo(x, y - r);
    shape.quadraticCurveTo(x, y, x - r, y);
    shape.lineTo(-x + r, y);
    shape.quadraticCurveTo(-x, y, -x, y - r);
    shape.lineTo(-x, -y + r);
    shape.quadraticCurveTo(-x, -y, -x + r, -y);
    shape.closePath();
    return shape;
  }

  function makeRoundedFootprintGeometry(width, depth, height, radius, bevel) {
    const shape = makeRoundedRectShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }

  function makePlateGeometry(shape, depth, bevelSize) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelThickness: bevelSize,
      bevelSize,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function makeCylinderBetween(pointA, pointB, radius, material, segments) {
    const direction = pointB.clone().sub(pointA);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      length,
      segments
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(pointA).add(pointB).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  function makeFrustumBetween(pointA, pointB, radiusA, radiusB, material) {
    const direction = pointB.clone().sub(pointA);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      radiusB,
      radiusA,
      length,
      24
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(pointA).add(pointB).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const base_group = new THREE.Group();
  root.add(base_group);

  const base_plateGeom = makeRoundedFootprintGeometry(
    0.9,
    0.66,
    0.11,
    0.085,
    0.012
  );
  const base_plate = new THREE.Mesh(base_plateGeom, brownMat);
  base_plate.position.y = 0.065;
  base_group.add(base_plate);

  const base_top_ridgeGeom = makeRoundedFootprintGeometry(
    0.82,
    0.58,
    0.045,
    0.07,
    0.008
  );
  const base_top_ridge = new THREE.Mesh(base_top_ridgeGeom, brownLightMat);
  base_top_ridge.position.y = 0.135;
  base_group.add(base_top_ridge);

  const mounting_boltsGeom = new THREE.CylinderGeometry(
    0.026,
    0.026,
    0.018,
    16
  );
  const mounting_bolts = new THREE.InstancedMesh(
    mounting_boltsGeom,
    rubberMat,
    4
  );
  const boltPositions = [
    [-0.36, 0.17, 0.24],
    [0.36, 0.17, 0.24],
    [-0.36, 0.17, -0.24],
    [0.36, 0.17, -0.24],
  ];
  const instanceMatrix = new THREE.Matrix4();
  const instanceQuaternion = new THREE.Quaternion();
  const instanceScale = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < boltPositions.length; i++) {
    const p = boltPositions[i];
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], p[2]),
      instanceQuaternion,
      instanceScale
    );
    mounting_bolts.setMatrixAt(i, instanceMatrix);
  }
  mounting_bolts.instanceMatrix.needsUpdate = true;
  base_group.add(mounting_bolts);

  const pedestal_group = new THREE.Group();
  root.add(pedestal_group);

  const pedestal_lowerGeom = new THREE.CylinderGeometry(
    0.325,
    0.34,
    0.17,
    48
  );
  const pedestal_lower = new THREE.Mesh(pedestal_lowerGeom, brownMat);
  pedestal_lower.position.y = 0.235;
  pedestal_group.add(pedestal_lower);

  const pedestal_upperGeom = new THREE.CylinderGeometry(
    0.31,
    0.325,
    0.14,
    48
  );
  const pedestal_upper = new THREE.Mesh(pedestal_upperGeom, brownLightMat);
  pedestal_upper.position.y = 0.37;
  pedestal_group.add(pedestal_upper);

  const swivel_seamGeom = new THREE.TorusGeometry(0.326, 0.008, 8, 48);
  const swivel_seam = new THREE.Mesh(swivel_seamGeom, brownDarkMat);
  swivel_seam.rotation.x = Math.PI / 2;
  swivel_seam.position.y = 0.31;
  pedestal_group.add(swivel_seam);

  const pedestal_topGeom = new THREE.CylinderGeometry(
    0.29,
    0.31,
    0.05,
    48
  );
  const pedestal_top = new THREE.Mesh(pedestal_topGeom, brownMat);
  pedestal_top.position.y = 0.455;
  pedestal_group.add(pedestal_top);

  const pedestal_side_cheeksShape = new THREE.Shape();
  pedestal_side_cheeksShape.moveTo(-0.29, 0);
  pedestal_side_cheeksShape.lineTo(0.27, 0);
  pedestal_side_cheeksShape.lineTo(0.26, 0.17);
  pedestal_side_cheeksShape.quadraticCurveTo(0.23, 0.29, 0.13, 0.35);
  pedestal_side_cheeksShape.lineTo(0.02, 0.35);
  pedestal_side_cheeksShape.quadraticCurveTo(-0.08, 0.31, -0.14, 0.22);
  pedestal_side_cheeksShape.lineTo(-0.27, 0.08);
  pedestal_side_cheeksShape.closePath();

  const pedestal_side_cheeksGeom = makePlateGeometry(
    pedestal_side_cheeksShape,
    0.075,
    0.008
  );
  pedestal_side_cheeksGeom.rotateY(Math.PI / 2);
  const pedestal_side_cheeks = new THREE.InstancedMesh(
    pedestal_side_cheeksGeom,
    brownMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instanceMatrix.compose(
      new THREE.Vector3(side * 0.225, 0.43, 0),
      new THREE.Quaternion(),
      instanceScale
    );
    pedestal_side_cheeks.setMatrixAt(i, instanceMatrix);
  }
  pedestal_side_cheeks.instanceMatrix.needsUpdate = true;
  pedestal_group.add(pedestal_side_cheeks);

  const pivot_housingGeom = new THREE.CylinderGeometry(
    0.145,
    0.145,
    0.42,
    32
  );
  const pivot_housing = new THREE.Mesh(pivot_housingGeom, brownMat);
  pivot_housing.rotation.z = Math.PI / 2;
  pivot_housing.position.set(0, 0.65, -0.13);
  pedestal_group.add(pivot_housing);

  const pivot_capsGeom = new THREE.CylinderGeometry(
    0.108,
    0.108,
    0.038,
    32
  );
  const pivot_caps = new THREE.InstancedMesh(
    pivot_capsGeom,
    blackMetalMat,
    2
  );
  const axisXQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    Math.PI / 2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instanceMatrix.compose(
      new THREE.Vector3(side * 0.23, 0.65, -0.13),
      axisXQuaternion,
      instanceScale
    );
    pivot_caps.setMatrixAt(i, instanceMatrix);
  }
  pivot_caps.instanceMatrix.needsUpdate = true;
  pedestal_group.add(pivot_caps);

  const pivot_center_capsGeom = new THREE.CylinderGeometry(
    0.045,
    0.045,
    0.045,
    24
  );
  const pivot_center_caps = new THREE.InstancedMesh(
    pivot_center_capsGeom,
    rubberMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instanceMatrix.compose(
      new THREE.Vector3(side * 0.252, 0.65, -0.13),
      axisXQuaternion,
      instanceScale
    );
    pivot_center_caps.setMatrixAt(i, instanceMatrix);
  }
  pivot_center_caps.instanceMatrix.needsUpdate = true;
  pedestal_group.add(pivot_center_caps);

  const pedestal_fastenersGeom = new THREE.CylinderGeometry(
    0.018,
    0.018,
    0.018,
    16
  );
  const pedestal_fasteners = new THREE.InstancedMesh(
    pedestal_fastenersGeom,
    silverMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instanceMatrix.compose(
      new THREE.Vector3(side * 0.274, 0.59, -0.015),
      axisXQuaternion,
      instanceScale
    );
    pedestal_fasteners.setMatrixAt(i, instanceMatrix);
  }
  pedestal_fasteners.instanceMatrix.needsUpdate = true;
  pedestal_group.add(pedestal_fasteners);

  const armDepth = 0.17;

  const main_armShape = new THREE.Shape();
  main_armShape.moveTo(0.18, 0.57);
  main_armShape.bezierCurveTo(0.12, 0.88, 0.01, 1.28, -0.19, 1.53);
  main_armShape.quadraticCurveTo(-0.25, 1.6, -0.34, 1.56);
  main_armShape.lineTo(-0.37, 1.44);
  main_armShape.bezierCurveTo(-0.16, 1.18, -0.02, 0.82, 0.07, 0.55);
  main_armShape.quadraticCurveTo(0.12, 0.49, 0.18, 0.57);
  main_armShape.closePath();

  const main_armGeom = makePlateGeometry(main_armShape, armDepth, 0.012);
  const main_arm = new THREE.Mesh(main_armGeom, brownMat);
  root.add(main_arm);

  const boomShape = new THREE.Shape();
  boomShape.moveTo(-0.24, 1.52);
  boomShape.lineTo(-1.03, 1.65);
  boomShape.quadraticCurveTo(-1.1, 1.66, -1.11, 1.58);
  boomShape.lineTo(-1.08, 1.47);
  boomShape.quadraticCurveTo(-1.06, 1.42, -0.99, 1.42);
  boomShape.lineTo(-0.31, 1.31);
  boomShape.quadraticCurveTo(-0.24, 1.3, -0.22, 1.37);
  boomShape.closePath();

  const boomGeom = makePlateGeometry(boomShape, 0.18, 0.012);
  const boom = new THREE.Mesh(boomGeom, brownMat);
  root.add(boom);

  const boom_upper_lipShape = new THREE.Shape();
  boom_upper_lipShape.moveTo(-1.04, 1.645);
  boom_upper_lipShape.lineTo(-0.25, 1.535);
  boom_upper_lipShape.lineTo(-0.21, 1.565);
  boom_upper_lipShape.lineTo(-1.06, 1.68);
  boom_upper_lipShape.closePath();

  const boom_upper_lipGeom = makePlateGeometry(
    boom_upper_lipShape,
    0.19,
    0.004
  );
  const boom_upper_lip = new THREE.Mesh(boom_upper_lipGeom, brownLightMat);
  root.add(boom_upper_lip);

  const boom_pivot_plateShape = new THREE.Shape();
  boom_pivot_plateShape.moveTo(-1.13, 1.67);
  boom_pivot_plateShape.quadraticCurveTo(-1.02, 1.7, -0.92, 1.66);
  boom_pivot_plateShape.lineTo(-0.86, 1.57);
  boom_pivot_plateShape.lineTo(-0.91, 1.39);
  boom_pivot_plateShape.lineTo(-1.07, 1.34);
  boom_pivot_plateShape.quadraticCurveTo(-1.18, 1.43, -1.19, 1.53);
  boom_pivot_plateShape.quadraticCurveTo(-1.19, 1.61, -1.13, 1.67);
  boom_pivot_plateShape.closePath();

  const boom_pivot_plateGeom = makePlateGeometry(
    boom_pivot_plateShape,
    0.19,
    0.01
  );
  const boom_pivot_plate = new THREE.Mesh(
    boom_pivot_plateGeom,
    brownLightMat
  );
  root.add(boom_pivot_plate);

  const wrist_plateShape = new THREE.Shape();
  wrist_plateShape.moveTo(-1.08, 1.49);
  wrist_plateShape.lineTo(-0.91, 1.44);
  wrist_plateShape.lineTo(-0.82, 1.27);
  wrist_plateShape.lineTo(-0.96, 1.18);
  wrist_plateShape.lineTo(-1.12, 1.29);
  wrist_plateShape.closePath();

  const wrist_plateGeom = makePlateGeometry(wrist_plateShape, 0.18, 0.009);
  const wrist_plate = new THREE.Mesh(wrist_plateGeom, brownMat);
  root.add(wrist_plate);

  const boom_pivot_axle = makeCylinderBetween(
    new THREE.Vector3(-0.1, 1.47, -0.11),
    new THREE.Vector3(-0.1, 1.47, 0.11),
    0.07,
    blackMetalMat,
    24
  );
  root.add(boom_pivot_axle);

  const boom_pivot_capsGeom = new THREE.CylinderGeometry(
    0.095,
    0.095,
    0.032,
    32
  );
  const boom_pivot_caps = new THREE.InstancedMesh(
    boom_pivot_capsGeom,
    blackMetalMat,
    2
  );
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    instanceMatrix.compose(
      new THREE.Vector3(-0.1, 1.47, side * 0.112),
      axisXQuaternion,
      instanceScale
    );
    boom_pivot_caps.setMatrixAt(i, instanceMatrix);
  }
  boom_pivot_caps.instanceMatrix.needsUpdate = true;
  root.add(boom_pivot_caps);

  const wrist_upper_pivot_axle = makeCylinderBetween(
    new THREE.Vector3(-1.04, 1.57, -0.115),
    new THREE.Vector3(-1.04, 1.57, 0.115),
    0.057,
    blackMetalMat,
    24
  );
  root.add(wrist_upper_pivot_axle);

  const wrist_lower_pivot_axle = makeCylinderBetween(
    new THREE.Vector3(-0.96, 1.35, -0.11),
    new THREE.Vector3(-0.96, 1.35, 0.11),
    0.045,
    blackMetalMat,
    20
  );
  root.add(wrist_lower_pivot_axle);

  const wrist_pivot_capsGeom = new THREE.CylinderGeometry(
    0.066,
    0.066,
    0.026,
    24
  );
  const wrist_pivot_caps = new THREE.InstancedMesh(
    wrist_pivot_capsGeom,
    rubberMat,
    4
  );
  const wristCapPositions = [
    [-1.04, 1.57, -0.126],
    [-1.04, 1.57, 0.126],
    [-0.96, 1.35, -0.121],
    [-0.96, 1.35, 0.121],
  ];
  for (let i = 0; i < wristCapPositions.length; i++) {
    const p = wristCapPositions[i];
    instanceMatrix.compose(
      new THREE.Vector3(p[0], p[1], p[2]),
      axisXQuaternion,
      instanceScale
    );
    wrist_pivot_caps.setMatrixAt(i, instanceMatrix);
  }
  wrist_pivot_caps.instanceMatrix.needsUpdate = true;
  root.add(wrist_pivot_caps);

  const tool_group = new THREE.Group();
  tool_group.position.set(-0.99, 1.26, 0);
  tool_group.rotation.z = 0.28;
  root.add(tool_group);

  const tool_collarGeom = new THREE.CylinderGeometry(
    0.118,
    0.108,
    0.1,
    28
  );
  const tool_collar = new THREE.Mesh(tool_collarGeom, brownDarkMat);
  tool_collar.position.y = -0.045;
  tool_group.add(tool_collar);

  const tool_sleeveGeom = new THREE.CylinderGeometry(
    0.095,
    0.075,
    0.25,
    28
  );
  const tool_sleeve = new THREE.Mesh(tool_sleeveGeom, brownMat);
  tool_sleeve.position.y = -0.2;
  tool_group.add(tool_sleeve);

  const tool_end_ringGeom = new THREE.CylinderGeometry(
    0.08,
    0.078,
    0.045,
    24
  );
  const tool_end_ring = new THREE.Mesh(tool_end_ringGeom, brownDarkMat);
  tool_end_ring.position.y = -0.342;
  tool_group.add(tool_end_ring);

  const tool_tipGeom = new THREE.CylinderGeometry(
    0.055,
    0.06,
    0.08,
    20
  );
  const tool_tip = new THREE.Mesh(tool_tipGeom, rubberMat);
  tool_tip.position.y = -0.397;
  tool_group.add(tool_tip);

  const hydraulic_group = new THREE.Group();
  root.add(hydraulic_group);

  const hydraulic_hosePoints = [
    new THREE.Vector3(-0.18, 1.55, 0.015),
    new THREE.Vector3(0.02, 1.34, 0.02),
    new THREE.Vector3(0.18, 1.02, 0.025),
    new THREE.Vector3(0.31, 0.7, 0.02),
    new THREE.Vector3(0.3, 0.55, 0.005),
  ];
  const hydraulic_hoseCurve = new THREE.CatmullRomCurve3(
    hydraulic_hosePoints
  );
  const hydraulic_hoseGeom = new THREE.TubeGeometry(
    hydraulic_hoseCurve,
    48,
    0.018,
    8,
    false
  );
  const hydraulic_hose = new THREE.Mesh(hydraulic_hoseGeom, rubberMat);
  hydraulic_group.add(hydraulic_hose);

  const upper_hose_points = [
    new THREE.Vector3(-0.78, 1.675, -0.09),
    new THREE.Vector3(-0.48, 1.635, -0.1),
    new THREE.Vector3(-0.18, 1.595, -0.095),
    new THREE.Vector3(0.02, 1.565, -0.08),
  ];
  const upper_hose_curve = new THREE.CatmullRomCurve3(upper_hose_points);
  const upper_hoseGeom = new THREE.TubeGeometry(
    upper_hose_curve,
    28,
    0.014,
    8,
    false
  );
  const upper_hose = new THREE.Mesh(upper_hoseGeom, rubberMat);
  hydraulic_group.add(upper_hose);

  const wrist_cablePoints = [
    new THREE.Vector3(-1.13, 1.62, -0.1),
    new THREE.Vector3(-1.2, 1.49, -0.105),
    new THREE.Vector3(-1.13, 1.35, -0.1),
    new THREE.Vector3(-1.04, 1.28, -0.09),
  ];
  const wrist_cableCurve = new THREE.CatmullRomCurve3(wrist_cablePoints);
  const wrist_cableGeom = new THREE.TubeGeometry(
    wrist_cableCurve,
    20,
    0.011,
    7,
    false
  );
  const wrist_cable = new THREE.Mesh(wrist_cableGeom, rubberMat);
  hydraulic_group.add(wrist_cable);

  const hose_ribsGeom = new THREE.TorusGeometry(0.022, 0.004, 6, 16);
  const hose_ribs = new THREE.InstancedMesh(hose_ribsGeom, rubberMat, 10);
  const hoseRibQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -0.56
  );
  for (let i = 0; i < 10; i++) {
    const t = 0.08 + i * 0.026;
    const point = hydraulic_hoseCurve.getPoint(t);
    instanceMatrix.compose(
      point,
      hoseRibQuaternion,
      instanceScale
    );
    hose_ribs.setMatrixAt(i, instanceMatrix);
  }
  hose_ribs.instanceMatrix.needsUpdate = true;
  hydraulic_group.add(hose_ribs);

  const upper_hose_ribsGeom = new THREE.TorusGeometry(
    0.017,
    0.0035,
    6,
    14
  );
  const upper_hose_ribs = new THREE.InstancedMesh(
    upper_hose_ribsGeom,
    rubberMat,
    8
  );
  const upperHoseRibQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -0.15
  );
  for (let i = 0; i < 8; i++) {
    const point = upper_hose_curve.getPoint(0.08 + i * 0.065);
    instanceMatrix.compose(
      point,
      upperHoseRibQuaternion,
      instanceScale
    );
    upper_hose_ribs.setMatrixAt(i, instanceMatrix);
  }
  upper_hose_ribs.instanceMatrix.needsUpdate = true;
  hydraulic_group.add(upper_hose_ribs);

  const hose_couplingsGeom = new THREE.CylinderGeometry(
    0.029,
    0.025,
    0.07,
    16
  );
  const hose_couplings = new THREE.InstancedMesh(
    hose_couplingsGeom,
    blackMetalMat,
    2
  );
  const lowerCouplingQuaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    0.4
  );
  instanceMatrix.compose(
    new THREE.Vector3(-0.19, 1.56, 0.01),
    lowerCouplingQuaternion,
    instanceScale
  );
  hose_couplings.setMatrixAt(0, instanceMatrix);
  instanceMatrix.compose(
    new THREE.Vector3(0.3, 0.54, 0.005),
    new THREE.Quaternion(),
    instanceScale
  );
  hose_couplings.setMatrixAt(1, instanceMatrix);
  hose_couplings.instanceMatrix.needsUpdate = true;
  hydraulic_group.add(hose_couplings);

  fitToUnitCube(root);
  return root;

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
    object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }
}