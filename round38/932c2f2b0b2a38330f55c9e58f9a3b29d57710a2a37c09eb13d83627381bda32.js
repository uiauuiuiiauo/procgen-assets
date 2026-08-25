export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "striped_upholstered_armchair";

  const seatW = 1.56;
  const seatD = 1.34;
  const seatH = 0.70;
  const cushionH = 0.32;
  const backH = 1.00;
  const armW = 0.34;
  const armH = 0.72;
  const legH = 0.14;
  const moduleCount = 2;
  const armX = seatW / 2 + armW / 2;

  const fabricMat = new THREE.MeshStandardMaterial({
    color: 0x88b8d5,
    metalness: 0.0,
    roughness: 0.95
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0xe4edf0,
    metalness: 0.0,
    roughness: 0.95
  });
  const pipingMat = new THREE.MeshStandardMaterial({
    color: 0xf0f3f2,
    metalness: 0.0,
    roughness: 0.95
  });
  const shadowMat = new THREE.MeshStandardMaterial({
    color: 0x426f8b,
    metalness: 0.0,
    roughness: 0.95
  });
  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedBoxGeometry(w, h, d, radius) {
    const bevel = Math.min(
      radius * 0.45,
      d * 0.22,
      w * 0.12,
      h * 0.12
    );
    const shapeW = Math.max(0.01, w - bevel * 2);
    const shapeH = Math.max(0.01, h - bevel * 2);
    const halfW = shapeW / 2;
    const halfH = shapeH / 2;
    const corner = Math.max(
      0.005,
      Math.min(radius - bevel, halfW * 0.45, halfH * 0.45)
    );
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + corner, -halfH);
    shape.lineTo(halfW - corner, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + corner);
    shape.lineTo(halfW, halfH - corner);
    shape.quadraticCurveTo(halfW, halfH, halfW - corner, halfH);
    shape.lineTo(-halfW + corner, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - corner);
    shape.lineTo(-halfW, -halfH + corner);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + corner, -halfH);
    shape.closePath();

    const innerDepth = Math.max(0.005, d - bevel * 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: innerDepth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -innerDepth / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function roundedRectXYPoints(w, h, radius, z) {
    const points = [];
    const corners = [
      [w / 2 - radius, h / 2 - radius, 0, Math.PI / 2],
      [-w / 2 + radius, h / 2 - radius, Math.PI / 2, Math.PI],
      [-w / 2 + radius, -h / 2 + radius, Math.PI, Math.PI * 1.5],
      [w / 2 - radius, -h / 2 + radius, Math.PI * 1.5, Math.PI * 2]
    ];

    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      for (let j = 0; j <= 4; j++) {
        const angle = corner[2] + (corner[3] - corner[2]) * (j / 4);
        points.push(
          new THREE.Vector3(
            corner[0] + Math.cos(angle) * radius,
            corner[1] + Math.sin(angle) * radius,
            z
          )
        );
      }
    }
    return points;
  }

  function roundedRectXZPoints(w, d, radius, y) {
    const points = [];
    const corners = [
      [w / 2 - radius, d / 2 - radius, 0, Math.PI / 2],
      [-w / 2 + radius, d / 2 - radius, Math.PI / 2, Math.PI],
      [-w / 2 + radius, -d / 2 + radius, Math.PI, Math.PI * 1.5],
      [w / 2 - radius, -d / 2 + radius, Math.PI * 1.5, Math.PI * 2]
    ];

    for (let i = 0; i < corners.length; i++) {
      const corner = corners[i];
      for (let j = 0; j <= 4; j++) {
        const angle = corner[2] + (corner[3] - corner[2]) * (j / 4);
        points.push(
          new THREE.Vector3(
            corner[0] + Math.cos(angle) * radius,
            y,
            corner[1] + Math.sin(angle) * radius
          )
        );
      }
    }
    return points;
  }

  function closedPipeGeometry(points, radius) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(
      curve,
      points.length * 3,
      radius,
      8,
      true
    );
  }

  const stripe_unitGeom = new THREE.BoxGeometry(1, 1, 1);
  const identityQuat = new THREE.Quaternion();

  function createStripeInstances(transforms, material) {
    const stripes = new THREE.InstancedMesh(
      stripe_unitGeom,
      material,
      transforms.length
    );
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();

    for (let i = 0; i < transforms.length; i++) {
      const transform = transforms[i];
      position.set(transform[0], transform[1], transform[2]);
      scale.set(transform[3], transform[4], transform[5]);
      matrix.compose(position, identityQuat, scale);
      stripes.setMatrixAt(i, matrix);
    }

    stripes.instanceMatrix.needsUpdate = true;
    return stripes;
  }

  const feetGeom = new THREE.CylinderGeometry(
    0.085,
    0.105,
    legH,
    18
  );
  const feet = new THREE.InstancedMesh(feetGeom, feetMat, 4);
  feet.name = "feet";

  const footPositions = [
    [-0.91, legH / 2, 0.62],
    [0.91, legH / 2, 0.62],
    [-0.91, legH / 2, -0.55],
    [0.91, legH / 2, -0.55]
  ];
  const footMatrix = new THREE.Matrix4();

  for (let i = 0; i < footPositions.length; i++) {
    footMatrix.makeTranslation(
      footPositions[i][0],
      footPositions[i][1],
      footPositions[i][2]
    );
    feet.setMatrixAt(i, footMatrix);
  }

  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const baseBottom = legH - 0.02;
  const baseTop = seatH - cushionH;
  const baseH = baseTop - baseBottom;

  const front_baseGeom = roundedBoxGeometry(
    1.94,
    baseH,
    0.18,
    0.07
  );
  const front_base = new THREE.Mesh(front_baseGeom, fabricMat);
  front_base.name = "front_base";
  front_base.position.set(
    0,
    baseBottom + baseH / 2,
    0.68
  );
  base_group.add(front_base);

  const rear_base = new THREE.Mesh(front_baseGeom, fabricMat);
  rear_base.name = "rear_base";
  rear_base.position.set(
    0,
    baseBottom + baseH / 2,
    -0.66
  );
  base_group.add(rear_base);

  const side_baseGeom = roundedBoxGeometry(
    0.18,
    baseH,
    1.20,
    0.07
  );
  const left_side_base = new THREE.Mesh(side_baseGeom, fabricMat);
  left_side_base.name = "left_side_base";
  left_side_base.position.set(
    -0.91,
    baseBottom + baseH / 2,
    0.01
  );
  base_group.add(left_side_base);

  const right_side_base = new THREE.Mesh(side_baseGeom, fabricMat);
  right_side_base.name = "right_side_base";
  right_side_base.position.set(
    0.91,
    baseBottom + baseH / 2,
    0.01
  );
  base_group.add(right_side_base);

  const front_base_stripes = createStripeInstances([
    [-0.79, baseBottom + baseH * 0.50, 0.774, 0.014, baseH * 0.88, 0.008],
    [-0.63, baseBottom + baseH * 0.50, 0.774, 0.010, baseH * 0.88, 0.008],
    [-0.47, baseBottom + baseH * 0.50, 0.774, 0.016, baseH * 0.88, 0.008],
    [-0.28, baseBottom + baseH * 0.50, 0.774, 0.009, baseH * 0.88, 0.008],
    [-0.11, baseBottom + baseH * 0.50, 0.774, 0.015, baseH * 0.88, 0.008],
    [0.10, baseBottom + baseH * 0.50, 0.774, 0.010, baseH * 0.88, 0.008],
    [0.29, baseBottom + baseH * 0.50, 0.774, 0.016, baseH * 0.88, 0.008],
    [0.49, baseBottom + baseH * 0.50, 0.774, 0.009, baseH * 0.88, 0.008],
    [0.67, baseBottom + baseH * 0.50, 0.774, 0.015, baseH * 0.88, 0.008],
    [0.81, baseBottom + baseH * 0.50, 0.774, 0.010, baseH * 0.88, 0.008]
  ], stripeMat);
  front_base_stripes.name = "front_base_stripes";
  base_group.add(front_base_stripes);

  const side_base_stripes = createStripeInstances([
    [-1.004, baseBottom + baseH * 0.50, -0.45, 0.008, baseH * 0.88, 0.014],
    [-1.004, baseBottom + baseH * 0.50, -0.30, 0.008, baseH * 0.88, 0.010],
    [-1.004, baseBottom + baseH * 0.50, -0.14, 0.008, baseH * 0.88, 0.016],
    [-1.004, baseBottom + baseH * 0.50, 0.05, 0.008, baseH * 0.88, 0.010],
    [-1.004, baseBottom + baseH * 0.50, 0.23, 0.008, baseH * 0.88, 0.015],
    [-1.004, baseBottom + baseH * 0.50, 0.43, 0.008, baseH * 0.88, 0.010],
    [1.004, baseBottom + baseH * 0.50, -0.45, 0.008, baseH * 0.88, 0.014],
    [1.004, baseBottom + baseH * 0.50, -0.30, 0.008, baseH * 0.88, 0.010],
    [1.004, baseBottom + baseH * 0.50, -0.14, 0.008, baseH * 0.88, 0.016],
    [1.004, baseBottom + baseH * 0.50, 0.05, 0.008, baseH * 0.88, 0.010],
    [1.004, baseBottom + baseH * 0.50, 0.23, 0.008, baseH * 0.88, 0.015],
    [1.004, baseBottom + baseH * 0.50, 0.43, 0.008, baseH * 0.88, 0.010]
  ], stripeMat);
  side_base_stripes.name = "side_base_stripes";
  base_group.add(side_base_stripes);

  const front_base_pipingGeom = closedPipeGeometry([
    new THREE.Vector3(-0.88, baseBottom + 0.025, 0.779),
    new THREE.Vector3(0.88, baseBottom + 0.025, 0.779),
    new THREE.Vector3(0.95, baseBottom + 0.09, 0.779),
    new THREE.Vector3(0.95, baseTop - 0.08, 0.779),
    new THREE.Vector3(0.88, baseTop - 0.015, 0.779),
    new THREE.Vector3(-0.88, baseTop - 0.015, 0.779),
    new THREE.Vector3(-0.95, baseTop - 0.08, 0.779),
    new THREE.Vector3(-0.95, baseBottom + 0.09, 0.779)
  ], 0.012);
  const front_base_piping = new THREE.Mesh(
    front_base_pipingGeom,
    pipingMat
  );
  front_base_piping.name = "front_base_piping";
  base_group.add(front_base_piping);

  const seat_group = new THREE.Group();
  seat_group.name = "seat_group";
  root.add(seat_group);

  const seat_shadowGeom = roundedBoxGeometry(
    seatW + 0.02,
    0.055,
    seatD - 0.05,
    0.025
  );
  const seat_shadow = new THREE.Mesh(seat_shadowGeom, shadowMat);
  seat_shadow.name = "seat_shadow";
  seat_shadow.position.set(
    0,
    seatH - cushionH + 0.012,
    0.08
  );
  seat_group.add(seat_shadow);

  const seat_cushionGeom = roundedBoxGeometry(
    seatW,
    cushionH,
    seatD,
    0.14
  );
  const seat_cushion = new THREE.Mesh(
    seat_cushionGeom,
    fabricMat
  );
  seat_cushion.name = "seat_cushion";
  seat_cushion.position.set(
    0,
    seatH - cushionH / 2,
    0.08
  );
  seat_group.add(seat_cushion);

  const seatTop = seatH;
  const seatFront = 0.08 + seatD / 2 + 0.008;

  const seat_top_stripes = createStripeInstances([
    [-0.66, seatTop + 0.006, 0.08, 0.014, 0.008, seatD * 0.84],
    [-0.53, seatTop + 0.006, 0.08, 0.010, 0.008, seatD * 0.84],
    [-0.39, seatTop + 0.006, 0.08, 0.016, 0.008, seatD * 0.84],
    [-0.23, seatTop + 0.006, 0.08, 0.009, 0.008, seatD * 0.84],
    [-0.08, seatTop + 0.006, 0.08, 0.015, 0.008, seatD * 0.84],
    [0.09, seatTop + 0.006, 0.08, 0.010, 0.008, seatD * 0.84],
    [0.25, seatTop + 0.006, 0.08, 0.016, 0.008, seatD * 0.84],
    [0.42, seatTop + 0.006, 0.08, 0.009, 0.008, seatD * 0.84],
    [0.57, seatTop + 0.006, 0.08, 0.015, 0.008, seatD * 0.84],
    [0.69, seatTop + 0.006, 0.08, 0.010, 0.008, seatD * 0.84]
  ], stripeMat);
  seat_top_stripes.name = "seat_top_stripes";
  seat_group.add(seat_top_stripes);

  const seat_front_stripes = createStripeInstances([
    [-0.66, seatH - cushionH / 2, seatFront, 0.014, cushionH * 0.76, 0.008],
    [-0.53, seatH - cushionH / 2, seatFront, 0.010, cushionH * 0.76, 0.008],
    [-0.39, seatH - cushionH / 2, seatFront, 0.016, cushionH * 0.76, 0.008],
    [-0.23, seatH - cushionH / 2, seatFront, 0.009, cushionH * 0.76, 0.008],
    [-0.08, seatH - cushionH / 2, seatFront, 0.015, cushionH * 0.76, 0.008],
    [0.09, seatH - cushionH / 2, seatFront, 0.010, cushionH * 0.76, 0.008],
    [0.25, seatH - cushionH / 2, seatFront, 0.016, cushionH * 0.76, 0.008],
    [0.42, seatH - cushionH / 2, seatFront, 0.009, cushionH * 0.76, 0.008],
    [0.57, seatH - cushionH / 2, seatFront, 0.015, cushionH * 0.76, 0.008],
    [0.69, seatH - cushionH / 2, seatFront, 0.010, cushionH * 0.76, 0.008]
  ], stripeMat);
  seat_front_stripes.name = "seat_front_stripes";
  seat_group.add(seat_front_stripes);

  const seat_pipingGeom = closedPipeGeometry(
    roundedRectXZPoints(
      seatW - 0.05,
      seatD - 0.05,
      0.13,
      seatTop + 0.012
    ),
    0.015
  );
  const seat_piping = new THREE.Mesh(
    seat_pipingGeom,
    pipingMat
  );
  seat_piping.name = "seat_piping";
  seat_piping.position.z = 0.08;
  seat_group.add(seat_piping);

  const back_group = new THREE.Group();
  back_group.name = "back_group";
  root.add(back_group);

  const back_supportGeom = roundedBoxGeometry(
    seatW + 0.10,
    0.76,
    0.16,
    0.08
  );
  const back_support = new THREE.Mesh(
    back_supportGeom,
    fabricMat
  );
  back_support.name = "back_support";
  back_support.position.set(0, 1.01, -0.64);
  back_support.rotation.x = -0.08;
  back_group.add(back_support);

  const back_cushionW = seatW / moduleCount - 0.04;
  const back_cushionD = 0.30;
  const back_cushionGeom = roundedBoxGeometry(
    back_cushionW,
    backH,
    back_cushionD,
    0.15
  );
  const backStripeCount = 7;
  const backStripeTransforms = [];

  for (let i = 0; i < backStripeCount; i++) {
    const x = -back_cushionW * 0.38 +
      back_cushionW * 0.76 * (i / (backStripeCount - 1));
    const width = i % 3 === 0 ? 0.020 : 0.011;

    backStripeTransforms.push([
      x,
      0,
      back_cushionD / 2 + 0.007,
      width,
      backH * 0.84,
      0.008
    ]);
    backStripeTransforms.push([
      x,
      0,
      -back_cushionD / 2 - 0.007,
      width,
      backH * 0.84,
      0.008
    ]);
    backStripeTransforms.push([
      x,
      0,
      0,
      width,
      0.008,
      back_cushionD * 0.78
    ]);
  }

  const back_pipingGeom = closedPipeGeometry(
    roundedRectXYPoints(
      back_cushionW - 0.045,
      backH - 0.045,
      0.14,
      back_cushionD / 2 + 0.013
    ),
    0.014
  );

  const left_back_module = new THREE.Group();
  left_back_module.name = "left_back_module";
  left_back_module.position.set(-0.38, 1.20, -0.48);
  left_back_module.rotation.x = -0.11;

  const left_back_cushion = new THREE.Mesh(
    back_cushionGeom,
    fabricMat
  );
  left_back_cushion.name = "left_back_cushion";
  left_back_module.add(left_back_cushion);

  const left_back_stripes = createStripeInstances(
    backStripeTransforms,
    stripeMat
  );
  left_back_stripes.name = "left_back_stripes";
  left_back_module.add(left_back_stripes);

  const left_back_piping = new THREE.Mesh(
    back_pipingGeom,
    pipingMat
  );
  left_back_piping.name = "left_back_piping";
  left_back_module.add(left_back_piping);
  back_group.add(left_back_module);

  const right_back_module = new THREE.Group();
  right_back_module.name = "right_back_module";
  right_back_module.position.set(0.38, 1.20, -0.48);
  right_back_module.rotation.x = -0.11;

  const right_back_cushion = new THREE.Mesh(
    back_cushionGeom,
    fabricMat
  );
  right_back_cushion.name = "right_back_cushion";
  right_back_module.add(right_back_cushion);

  const right_back_stripes = createStripeInstances(
    backStripeTransforms,
    stripeMat
  );
  right_back_stripes.name = "right_back_stripes";
  right_back_module.add(right_back_stripes);

  const right_back_piping = new THREE.Mesh(
    back_pipingGeom,
    pipingMat
  );
  right_back_piping.name = "right_back_piping";
  right_back_module.add(right_back_piping);
  back_group.add(right_back_module);

  const back_center_seamGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    backH * 0.82,
    8
  );
  const back_center_seam = new THREE.Mesh(
    back_center_seamGeom,
    shadowMat
  );
  back_center_seam.name = "back_center_seam";
  back_center_seam.position.set(0, 1.20, -0.314);
  back_center_seam.rotation.x = -0.11;
  back_group.add(back_center_seam);

  const arms_group = new THREE.Group();
  arms_group.name = "arms_group";
  root.add(arms_group);

  const arm_sideGeom = roundedBoxGeometry(
    armW,
    armH,
    1.50,
    0.13
  );
  const left_arm_side = new THREE.Mesh(
    arm_sideGeom,
    fabricMat
  );
  left_arm_side.name = "left_arm_side";
  left_arm_side.position.set(-armX, 0.48, 0.04);
  arms_group.add(left_arm_side);

  const right_arm_side = new THREE.Mesh(
    arm_sideGeom,
    fabricMat
  );
  right_arm_side.name = "right_arm_side";
  right_arm_side.position.set(armX, 0.48, 0.04);
  arms_group.add(right_arm_side);

  const arm_side_stripes = createStripeInstances([
    [-1.145, 0.48, -0.48, 0.008, armH * 0.76, 0.015],
    [-1.145, 0.48, -0.31, 0.008, armH * 0.76, 0.010],
    [-1.145, 0.48, -0.14, 0.008, armH * 0.76, 0.017],
    [-1.145, 0.48, 0.06, 0.008, armH * 0.76, 0.010],
    [-1.145, 0.48, 0.25, 0.008, armH * 0.76, 0.016],
    [-1.145, 0.48, 0.46, 0.008, armH * 0.76, 0.010],
    [1.145, 0.48, -0.48, 0.008, armH * 0.76, 0.015],
    [1.145, 0.48, -0.31, 0.008, armH * 0.76, 0.010],
    [1.145, 0.48, -0.14, 0.008, armH * 0.76, 0.017],
    [1.145, 0.48, 0.06, 0.008, armH * 0.76, 0.010],
    [1.145, 0.48, 0.25, 0.008, armH * 0.76, 0.016],
    [1.145, 0.48, 0.46, 0.008, armH * 0.76, 0.010]
  ], stripeMat);
  arm_side_stripes.name = "arm_side_stripes";
  arms_group.add(arm_side_stripes);

  const arm_rollGeom = new THREE.CylinderGeometry(
    0.18,
    0.18,
    1.50,
    28
  );
  const left_arm_roll = new THREE.Mesh(
    arm_rollGeom,
    fabricMat
  );
  left_arm_roll.name = "left_arm_roll";
  left_arm_roll.rotation.x = Math.PI / 2;
  left_arm_roll.position.set(-armX, 0.84, 0.04);
  arms_group.add(left_arm_roll);

  const right_arm_roll = new THREE.Mesh(
    arm_rollGeom,
    fabricMat
  );
  right_arm_roll.name = "right_arm_roll";
  right_arm_roll.rotation.x = Math.PI / 2;
  right_arm_roll.position.set(armX, 0.84, 0.04);
  arms_group.add(right_arm_roll);

  const arm_roll_stripesGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    1.32,
    6
  );
  const arm_roll_stripes = new THREE.InstancedMesh(
    arm_roll_stripesGeom,
    stripeMat,
    16
  );
  arm_roll_stripes.name = "arm_roll_stripes";

  const rollStripeMatrix = new THREE.Matrix4();
  const rollStripeQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );
  const rollStripeScale = new THREE.Vector3(1, 1, 1);
  const rollStripePosition = new THREE.Vector3();
  let rollStripeIndex = 0;

  for (const centerX of [-armX, armX]) {
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      rollStripePosition.set(
        centerX + Math.cos(angle) * 0.182,
        0.84 + Math.sin(angle) * 0.182,
        0.04
      );
      rollStripeMatrix.compose(
        rollStripePosition,
        rollStripeQuat,
        rollStripeScale
      );
      arm_roll_stripes.setMatrixAt(
        rollStripeIndex,
        rollStripeMatrix
      );
      rollStripeIndex++;
    }
  }

  arm_roll_stripes.instanceMatrix.needsUpdate = true;
  arms_group.add(arm_roll_stripes);

  const arm_frontGeom = roundedBoxGeometry(
    0.36,
    0.76,
    0.22,
    0.14
  );
  const left_arm_front = new THREE.Mesh(
    arm_frontGeom,
    fabricMat
  );
  left_arm_front.name = "left_arm_front";
  left_arm_front.position.set(-armX, 0.54, 0.78);
  arms_group.add(left_arm_front);

  const right_arm_front = new THREE.Mesh(
    arm_frontGeom,
    fabricMat
  );
  right_arm_front.name = "right_arm_front";
  right_arm_front.position.set(armX, 0.54, 0.78);
  arms_group.add(right_arm_front);

  const arm_front_stripes = createStripeInstances([
    [-1.08, 0.54, 0.896, 0.015, 0.58, 0.008],
    [-0.97, 0.54, 0.896, 0.010, 0.58, 0.008],
    [0.97, 0.54, 0.896, 0.010, 0.58, 0.008],
    [1.08, 0.54, 0.896, 0.015, 0.58, 0.008]
  ], stripeMat);
  arm_front_stripes.name = "arm_front_stripes";
  arms_group.add(arm_front_stripes);

  const arm_front_pipingGeom = closedPipeGeometry(
    roundedRectXYPoints(
      0.31,
      0.70,
      0.13,
      0.116
    ),
    0.012
  );
  const left_arm_front_piping = new THREE.Mesh(
    arm_front_pipingGeom,
    pipingMat
  );
  left_arm_front_piping.name = "left_arm_front_piping";
  left_arm_front_piping.position.set(-armX, 0.54, 0.78);
  arms_group.add(left_arm_front_piping);

  const right_arm_front_piping = new THREE.Mesh(
    arm_front_pipingGeom,
    pipingMat
  );
  right_arm_front_piping.name = "right_arm_front_piping";
  right_arm_front_piping.position.set(armX, 0.54, 0.78);
  arms_group.add(right_arm_front_piping);

  const left_arm_pipingGeom = closedPipeGeometry([
    new THREE.Vector3(-0.96, 0.995, -0.66),
    new THREE.Vector3(-0.96, 1.015, -0.15),
    new THREE.Vector3(-0.96, 0.995, 0.55),
    new THREE.Vector3(-0.96, 0.92, 0.73),
    new THREE.Vector3(-0.96, 0.68, 0.82),
    new THREE.Vector3(-0.96, 0.22, 0.84),
    new THREE.Vector3(-0.96, 0.16, 0.75),
    new THREE.Vector3(-0.96, 0.17, 0.55),
    new THREE.Vector3(-0.96, 0.17, -0.58)
  ], 0.013);
  const left_arm_piping = new THREE.Mesh(
    left_arm_pipingGeom,
    pipingMat
  );
  left_arm_piping.name = "left_arm_piping";
  arms_group.add(left_arm_piping);

  const right_arm_pipingGeom = closedPipeGeometry([
    new THREE.Vector3(0.96, 0.995, -0.66),
    new THREE.Vector3(0.96, 1.015, -0.15),
    new THREE.Vector3(0.96, 0.995, 0.55),
    new THREE.Vector3(0.96, 0.92, 0.73),
    new THREE.Vector3(0.96, 0.68, 0.82),
    new THREE.Vector3(0.96, 0.22, 0.84),
    new THREE.Vector3(0.96, 0.16, 0.75),
    new THREE.Vector3(0.96, 0.17, 0.55),
    new THREE.Vector3(0.96, 0.17, -0.58)
  ], 0.013);
  const right_arm_piping = new THREE.Mesh(
    right_arm_pipingGeom,
    pipingMat
  );
  right_arm_piping.name = "right_arm_piping";
  arms_group.add(right_arm_piping);

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