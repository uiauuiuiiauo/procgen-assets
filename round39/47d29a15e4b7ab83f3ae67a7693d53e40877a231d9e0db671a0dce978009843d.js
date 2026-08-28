export default function generate(THREE) {
  const root = new THREE.Group();

  const seatW = 0.86;
  const seatD = 0.70;
  const seatH = 0.54;
  const cushionH = 0.05;
  const backH = 0.82;
  const armW = 0.0;
  const armH = 0.0;
  const legH = 0.50;
  const moduleCount = 1;
  const frameWood = 0x9b6238;
  const caneMat = new THREE.MeshStandardMaterial({
    color: 0xd7aa6a,
    metalness: 0.0,
    roughness: 0.9,
  });
  const caneDarkMat = new THREE.MeshStandardMaterial({
    color: 0xb98249,
    metalness: 0.0,
    roughness: 0.9,
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: frameWood,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x87502e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0xad7040,
    metalness: 0.0,
    roughness: 0.6,
  });

  function roundedRectShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const x = width / 2;
    const y = depth / 2;
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    shape.closePath();
    return shape;
  }

  function setInstance(mesh, index, position, quaternion, scale) {
    const matrix = new THREE.Matrix4();
    matrix.compose(position, quaternion, scale);
    mesh.setMatrixAt(index, matrix);
  }

  function setSegmentInstance(mesh, index, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    setInstance(
      mesh,
      index,
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
  }

  const seatShape = roundedRectShape(seatW, seatD, 0.10);
  const seatGeom = new THREE.ExtrudeGeometry(seatShape, {
    depth: cushionH,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const seat = new THREE.Mesh(seatGeom, woodMat);
  seat.rotation.x = Math.PI / 2;
  seat.position.set(0, seatH, 0.02);
  root.add(seat);

  const seat_inset_borderShape = roundedRectShape(0.79, 0.62, 0.085);
  const seat_inset_borderGeom = new THREE.ExtrudeGeometry(
    seat_inset_borderShape,
    {
      depth: 0.012,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 14,
    }
  );
  const seat_inset_border = new THREE.Mesh(
    seat_inset_borderGeom,
    woodDarkMat
  );
  seat_inset_border.rotation.x = Math.PI / 2;
  seat_inset_border.position.set(0, seatH + 0.012, 0.02);
  root.add(seat_inset_border);

  const seat_cane_panelShape = roundedRectShape(0.735, 0.565, 0.072);
  const seat_cane_panelGeom = new THREE.ExtrudeGeometry(
    seat_cane_panelShape,
    {
      depth: 0.008,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 14,
    }
  );
  const seat_cane_panel = new THREE.Mesh(seat_cane_panelGeom, caneMat);
  seat_cane_panel.rotation.x = Math.PI / 2;
  seat_cane_panel.position.set(0, seatH + 0.018, 0.02);
  root.add(seat_cane_panel);

  const seatRimPoints = [
    new THREE.Vector3(-0.31, seatH + 0.025, 0.365),
    new THREE.Vector3(0.31, seatH + 0.025, 0.365),
    new THREE.Vector3(0.405, seatH + 0.025, 0.325),
    new THREE.Vector3(0.435, seatH + 0.025, 0.225),
    new THREE.Vector3(0.435, seatH + 0.025, -0.225),
    new THREE.Vector3(0.405, seatH + 0.025, -0.305),
    new THREE.Vector3(0.31, seatH + 0.025, -0.335),
    new THREE.Vector3(-0.31, seatH + 0.025, -0.335),
    new THREE.Vector3(-0.405, seatH + 0.025, -0.305),
    new THREE.Vector3(-0.435, seatH + 0.025, -0.225),
    new THREE.Vector3(-0.435, seatH + 0.025, 0.225),
    new THREE.Vector3(-0.405, seatH + 0.025, 0.325),
  ];
  const seat_inner_rimGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(seatRimPoints, true, "centripetal"),
    72,
    0.012,
    8,
    true
  );
  const seat_inner_rim = new THREE.Mesh(seat_inner_rimGeom, caneMat);
  root.add(seat_inner_rim);

  const seatLongitudinalCount = 19;
  const seat_longitudinal_weaveGeom = new THREE.CylinderGeometry(
    0.004,
    0.004,
    1,
    6
  );
  const seat_longitudinal_weave = new THREE.InstancedMesh(
    seat_longitudinal_weaveGeom,
    caneDarkMat,
    seatLongitudinalCount
  );
  const seatLongQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(Math.PI / 2, 0, 0)
  );
  for (let i = 0; i < seatLongitudinalCount; i++) {
    const x = -0.32 + (0.64 * i) / (seatLongitudinalCount - 1);
    const edge = Math.abs(x) / 0.32;
    const length = 0.53 - 0.07 * edge * edge * edge * edge;
    setInstance(
      seat_longitudinal_weave,
      i,
      new THREE.Vector3(x, seatH + 0.029, 0.02),
      seatLongQuat,
      new THREE.Vector3(1, length, 1)
    );
  }
  seat_longitudinal_weave.instanceMatrix.needsUpdate = true;
  root.add(seat_longitudinal_weave);

  const seatCrossCount = 15;
  const seat_cross_weaveGeom = new THREE.CylinderGeometry(
    0.0044,
    0.0044,
    1,
    6
  );
  const seat_cross_weave = new THREE.InstancedMesh(
    seat_cross_weaveGeom,
    caneMat,
    seatCrossCount
  );
  const seatCrossQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  for (let i = 0; i < seatCrossCount; i++) {
    const z = -0.235 + (0.51 * i) / (seatCrossCount - 1);
    const edge = Math.abs(z - 0.02) / 0.255;
    const length = 0.68 - 0.08 * edge * edge * edge * edge;
    setInstance(
      seat_cross_weave,
      i,
      new THREE.Vector3(0, seatH + 0.033, z),
      seatCrossQuat,
      new THREE.Vector3(1, length, 1)
    );
  }
  seat_cross_weave.instanceMatrix.needsUpdate = true;
  root.add(seat_cross_weave);

  const seatDiagonalSegments = [];
  for (let directionIndex = 0; directionIndex < 2; directionIndex++) {
    const angle = directionIndex === 0 ? 0.72 : -0.72;
    const nx = Math.cos(angle);
    const nz = Math.sin(angle);
    const tx = -nz;
    const tz = nx;
    const halfLength = 0.32;
    const halfDepth = 0.245;

    for (let i = 0; i < 13; i++) {
      const offset = -0.285 + (0.57 * i) / 12;
      const px = tx * offset;
      const pz = tz * offset;
      let minT = -halfLength;
      let maxT = halfLength;

      let a = (-halfDepth - pz) / nz;
      let b = (halfDepth - pz) / nz;
      if (nz > 0) {
        minT = Math.max(minT, Math.min(a, b));
        maxT = Math.min(maxT, Math.max(a, b));
      } else {
        minT = Math.max(minT, Math.max(a, b));
        maxT = Math.min(maxT, Math.min(a, b));
      }

      a = (-halfLength - px) / nx;
      b = (halfLength - px) / nx;
      if (nx > 0) {
        minT = Math.max(minT, Math.min(a, b));
        maxT = Math.min(maxT, Math.max(a, b));
      } else {
        minT = Math.max(minT, Math.max(a, b));
        maxT = Math.min(maxT, Math.min(a, b));
      }

      if (maxT > minT) {
        seatDiagonalSegments.push([
          new THREE.Vector3(
            px + nx * minT,
            seatH + 0.036,
            0.02 + pz + nz * minT
          ),
          new THREE.Vector3(
            px + nx * maxT,
            seatH + 0.036,
            0.02 + pz + nz * maxT
          ),
        ]);
      }
    }
  }

  const seat_diagonal_weaveGeom = new THREE.CylinderGeometry(
    0.0032,
    0.0032,
    1,
    5
  );
  const seat_diagonal_weave = new THREE.InstancedMesh(
    seat_diagonal_weaveGeom,
    caneDarkMat,
    seatDiagonalSegments.length
  );
  for (let i = 0; i < seatDiagonalSegments.length; i++) {
    setSegmentInstance(
      seat_diagonal_weave,
      i,
      seatDiagonalSegments[i][0],
      seatDiagonalSegments[i][1]
    );
  }
  seat_diagonal_weave.instanceMatrix.needsUpdate = true;
  root.add(seat_diagonal_weave);

  const seatKnotPositions = [];
  for (let xi = 1; xi < seatLongitudinalCount - 1; xi++) {
    const x = -0.32 + (0.64 * xi) / (seatLongitudinalCount - 1);
    for (let zi = 1; zi < seatCrossCount - 1; zi++) {
      const z = -0.235 + (0.51 * zi) / (seatCrossCount - 1);
      seatKnotPositions.push(new THREE.Vector3(x, seatH + 0.039, z));
    }
  }
  const seat_weave_knotsGeom = new THREE.SphereGeometry(0.0065, 6, 4);
  const seat_weave_knots = new THREE.InstancedMesh(
    seat_weave_knotsGeom,
    caneDarkMat,
    seatKnotPositions.length
  );
  for (let i = 0; i < seatKnotPositions.length; i++) {
    setInstance(
      seat_weave_knots,
      i,
      seatKnotPositions[i],
      new THREE.Quaternion(),
      new THREE.Vector3(1, 0.65, 1)
    );
  }
  seat_weave_knots.instanceMatrix.needsUpdate = true;
  root.add(seat_weave_knots);

  const front_apronGeom = new THREE.BoxGeometry(0.72, 0.085, 0.058);
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.position.set(0, seatH - 0.055, 0.335);
  root.add(front_apron);

  const side_apronGeom = new THREE.BoxGeometry(0.058, 0.08, 0.55);
  const left_apron = new THREE.Mesh(side_apronGeom, woodMat);
  left_apron.position.set(-0.37, seatH - 0.055, 0.005);
  root.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, woodMat);
  right_apron.position.set(0.37, seatH - 0.055, 0.005);
  root.add(right_apron);

  const rear_apronGeom = new THREE.BoxGeometry(0.68, 0.075, 0.05);
  const rear_apron = new THREE.Mesh(rear_apronGeom, woodDarkMat);
  rear_apron.position.set(0, seatH - 0.052, -0.29);
  root.add(rear_apron);

  const legGeom = new THREE.CylinderGeometry(0.034, 0.046, 1, 14);
  const legs = new THREE.InstancedMesh(legGeom, woodMat, 4);
  const legSegments = [
    [
      new THREE.Vector3(-0.47, 0.025, 0.39),
      new THREE.Vector3(-0.35, seatH - 0.025, 0.27),
    ],
    [
      new THREE.Vector3(0.47, 0.025, 0.39),
      new THREE.Vector3(0.35, seatH - 0.025, 0.27),
    ],
    [
      new THREE.Vector3(-0.43, 0.025, -0.36),
      new THREE.Vector3(-0.34, seatH - 0.025, -0.25),
    ],
    [
      new THREE.Vector3(0.43, 0.025, -0.36),
      new THREE.Vector3(0.34, seatH - 0.025, -0.25),
    ],
  ];
  for (let i = 0; i < legSegments.length; i++) {
    setSegmentInstance(legs, i, legSegments[i][0], legSegments[i][1]);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const footGeom = new THREE.SphereGeometry(0.046, 12, 8);
  const feet = new THREE.InstancedMesh(footGeom, woodDarkMat, 4);
  for (let i = 0; i < legSegments.length; i++) {
    const footPosition = legSegments[i][0].clone();
    footPosition.y = 0.022;
    setInstance(
      feet,
      i,
      footPosition,
      new THREE.Quaternion(),
      new THREE.Vector3(1, 0.45, 1)
    );
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

  const back_mountGeom = new THREE.BoxGeometry(0.105, 0.15, 0.11);
  const left_back_mount = new THREE.Mesh(back_mountGeom, woodDarkMat);
  left_back_mount.position.set(-0.345, seatH - 0.035, -0.29);
  left_back_mount.rotation.x = -0.12;
  root.add(left_back_mount);

  const right_back_mount = new THREE.Mesh(back_mountGeom, woodDarkMat);
  right_back_mount.position.set(0.345, seatH - 0.035, -0.29);
  right_back_mount.rotation.x = -0.12;
  root.add(right_back_mount);

  const backrest_group = new THREE.Group();
  backrest_group.position.set(0, seatH - 0.02, -0.30);
  backrest_group.rotation.x = -0.27;
  root.add(backrest_group);

  const backFramePoints = [
    new THREE.Vector3(-0.35, 0.0, 0),
    new THREE.Vector3(-0.375, 0.22, 0),
    new THREE.Vector3(-0.37, 0.58, 0),
    new THREE.Vector3(-0.34, 0.73, 0),
    new THREE.Vector3(-0.25, 0.80, 0),
    new THREE.Vector3(0, backH, 0),
    new THREE.Vector3(0.25, 0.80, 0),
    new THREE.Vector3(0.34, 0.73, 0),
    new THREE.Vector3(0.37, 0.58, 0),
    new THREE.Vector3(0.375, 0.22, 0),
    new THREE.Vector3(0.35, 0.0, 0),
    new THREE.Vector3(0.24, -0.018, 0),
    new THREE.Vector3(0, -0.025, 0),
    new THREE.Vector3(-0.24, -0.018, 0),
  ];
  const backrest_frameGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(backFramePoints, true, "centripetal"),
    112,
    0.045,
    10,
    true
  );
  const backrest_frame = new THREE.Mesh(backrest_frameGeom, woodMat);
  backrest_group.add(backrest_frame);

  const backInnerRimPoints = [
    new THREE.Vector3(-0.305, 0.045, 0.022),
    new THREE.Vector3(-0.325, 0.25, 0.022),
    new THREE.Vector3(-0.315, 0.56, 0.022),
    new THREE.Vector3(-0.28, 0.70, 0.022),
    new THREE.Vector3(-0.20, 0.765, 0.022),
    new THREE.Vector3(0, 0.78, 0.022),
    new THREE.Vector3(0.20, 0.765, 0.022),
    new THREE.Vector3(0.28, 0.70, 0.022),
    new THREE.Vector3(0.315, 0.56, 0.022),
    new THREE.Vector3(0.325, 0.25, 0.022),
    new THREE.Vector3(0.305, 0.045, 0.022),
    new THREE.Vector3(0.21, 0.025, 0.022),
    new THREE.Vector3(0, 0.02, 0.022),
    new THREE.Vector3(-0.21, 0.025, 0.022),
  ];
  const backrest_inner_rimGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(backInnerRimPoints, true, "centripetal"),
    96,
    0.012,
    8,
    true
  );
  const backrest_inner_rim = new THREE.Mesh(
    backrest_inner_rimGeom,
    caneMat
  );
  backrest_group.add(backrest_inner_rim);

  const backVerticalCount = 17;
  const back_vertical_weaveGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    1,
    6
  );
  const back_vertical_weave = new THREE.InstancedMesh(
    back_vertical_weaveGeom,
    caneDarkMat,
    backVerticalCount
  );
  for (let i = 0; i < backVerticalCount; i++) {
    const x = -0.285 + (0.57 * i) / (backVerticalCount - 1);
    const edge = Math.abs(x) / 0.285;
    const bottom = 0.05 + 0.02 * edge;
    const top = 0.755 - 0.14 * edge * edge * edge * edge;
    const length = top - bottom;
    setInstance(
      back_vertical_weave,
      i,
      new THREE.Vector3(x, bottom + length / 2, 0.035),
      new THREE.Quaternion(),
      new THREE.Vector3(1, length, 1)
    );
  }
  back_vertical_weave.instanceMatrix.needsUpdate = true;
  backrest_group.add(back_vertical_weave);

  const backRowCount = 16;
  const back_horizontal_weaveGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    1,
    6
  );
  const back_horizontal_weave = new THREE.InstancedMesh(
    back_horizontal_weaveGeom,
    caneMat,
    backRowCount
  );
  const backRowQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  for (let i = 0; i < backRowCount; i++) {
    const y = 0.065 + (0.67 * i) / (backRowCount - 1);
    const t = y / 0.78;
    const width =
      0.60 - 0.13 * Math.pow(Math.max(0, t - 0.68) / 0.32, 2);
    setInstance(
      back_horizontal_weave,
      i,
      new THREE.Vector3(0, y, 0.04),
      backRowQuat,
      new THREE.Vector3(1, width, 1)
    );
  }
  back_horizontal_weave.instanceMatrix.needsUpdate = true;
  backrest_group.add(back_horizontal_weave);

  const backDiagonalSegments = [];
  for (let directionIndex = 0; directionIndex < 2; directionIndex++) {
    const angle = directionIndex === 0 ? 0.78 : -0.78;
    const nx = Math.cos(angle);
    const ny = Math.sin(angle);
    const tx = -ny;
    const ty = nx;
    const halfWidth = 0.275;
    const halfHeight = 0.335;
    const centerY = 0.405;

    for (let i = 0; i < 15; i++) {
      const offset = -0.34 + (0.68 * i) / 14;
      const px = tx * offset;
      const py = centerY + ty * offset;
      let minT = -halfHeight;
      let maxT = halfHeight;

      let a = (-halfWidth - px) / nx;
      let b = (halfWidth - px) / nx;
      if (nx > 0) {
        minT = Math.max(minT, Math.min(a, b));
        maxT = Math.min(maxT, Math.max(a, b));
      } else {
        minT = Math.max(minT, Math.max(a, b));
        maxT = Math.min(maxT, Math.min(a, b));
      }

      a = (centerY - halfHeight - py) / ny;
      b = (centerY + halfHeight - py) / ny;
      if (ny > 0) {
        minT = Math.max(minT, Math.min(a, b));
        maxT = Math.min(maxT, Math.max(a, b));
      } else {
        minT = Math.max(minT, Math.max(a, b));
        maxT = Math.min(maxT, Math.min(a, b));
      }

      if (maxT > minT) {
        backDiagonalSegments.push([
          new THREE.Vector3(
            px + nx * minT,
            py + ny * minT,
            0.045
          ),
          new THREE.Vector3(
            px + nx * maxT,
            py + ny * maxT,
            0.045
          ),
        ]);
      }
    }
  }

  const back_diagonal_weaveGeom = new THREE.CylinderGeometry(
    0.0032,
    0.0032,
    1,
    5
  );
  const back_diagonal_weave = new THREE.InstancedMesh(
    back_diagonal_weaveGeom,
    caneDarkMat,
    backDiagonalSegments.length
  );
  for (let i = 0; i < backDiagonalSegments.length; i++) {
    setSegmentInstance(
      back_diagonal_weave,
      i,
      backDiagonalSegments[i][0],
      backDiagonalSegments[i][1]
    );
  }
  back_diagonal_weave.instanceMatrix.needsUpdate = true;
  backrest_group.add(back_diagonal_weave);

  const backKnotPositions = [];
  for (let xi = 1; xi < backVerticalCount - 1; xi++) {
    const x = -0.285 + (0.57 * xi) / (backVerticalCount - 1);
    for (let yi = 1; yi < backRowCount - 1; yi++) {
      const y = 0.065 + (0.67 * yi) / (backRowCount - 1);
      backKnotPositions.push(new THREE.Vector3(x, y, 0.05));
    }
  }
  const back_weave_knotsGeom = new THREE.SphereGeometry(0.0065, 6, 4);
  const back_weave_knots = new THREE.InstancedMesh(
    back_weave_knotsGeom,
    caneDarkMat,
    backKnotPositions.length
  );
  for (let i = 0; i < backKnotPositions.length; i++) {
    setInstance(
      back_weave_knots,
      i,
      backKnotPositions[i],
      new THREE.Quaternion(),
      new THREE.Vector3(1, 1, 0.65)
    );
  }
  back_weave_knots.instanceMatrix.needsUpdate = true;
  backrest_group.add(back_weave_knots);

  const backCenterPoints = [
    new THREE.Vector3(0.018, 0.07, 0.052),
    new THREE.Vector3(-0.012, 0.25, 0.052),
    new THREE.Vector3(0.016, 0.44, 0.052),
    new THREE.Vector3(-0.01, 0.61, 0.052),
    new THREE.Vector3(0, 0.735, 0.052),
  ];
  const back_center_supportGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      backCenterPoints,
      false,
      "centripetal"
    ),
    28,
    0.008,
    7,
    false
  );
  const back_center_support = new THREE.Mesh(
    back_center_supportGeom,
    caneDarkMat
  );
  backrest_group.add(back_center_support);

  const backTopBindingPoints = [
    new THREE.Vector3(-0.275, 0.705, 0.052),
    new THREE.Vector3(-0.15, 0.76, 0.052),
    new THREE.Vector3(0, 0.775, 0.052),
    new THREE.Vector3(0.15, 0.76, 0.052),
    new THREE.Vector3(0.275, 0.705, 0.052),
  ];
  const back_top_bindingGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      backTopBindingPoints,
      false,
      "centripetal"
    ),
    30,
    0.009,
    7,
    false
  );
  const back_top_binding = new THREE.Mesh(
    back_top_bindingGeom,
    caneMat
  );
  backrest_group.add(back_top_binding);

  const front_apron_grainGeom = new THREE.CylinderGeometry(
    0.0018,
    0.0018,
    1,
    5
  );
  const front_apron_grain = new THREE.InstancedMesh(
    front_apron_grainGeom,
    woodGrainMat,
    3
  );
  const grainQuat = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  for (let i = 0; i < 3; i++) {
    setInstance(
      front_apron_grain,
      i,
      new THREE.Vector3(0, seatH - 0.082 + i * 0.024, 0.367),
      grainQuat,
      new THREE.Vector3(1, 0.62, 1)
    );
  }
  front_apron_grain.instanceMatrix.needsUpdate = true;
  root.add(front_apron_grain);

  const back_frame_grain = new THREE.Group();
  backrest_group.add(back_frame_grain);

  function addBackFrameGrain(points) {
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      24,
      0.0017,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, woodGrainMat);
    back_frame_grain.add(grain);
  }

  addBackFrameGrain([
    new THREE.Vector3(-0.366, 0.08, 0.047),
    new THREE.Vector3(-0.378, 0.31, 0.047),
    new THREE.Vector3(-0.367, 0.57, 0.047),
    new THREE.Vector3(-0.335, 0.735, 0.047),
  ]);
  addBackFrameGrain([
    new THREE.Vector3(0.366, 0.08, 0.047),
    new THREE.Vector3(0.378, 0.31, 0.047),
    new THREE.Vector3(0.367, 0.57, 0.047),
    new THREE.Vector3(0.335, 0.735, 0.047),
  ]);
  addBackFrameGrain([
    new THREE.Vector3(-0.29, 0.795, 0.047),
    new THREE.Vector3(-0.12, 0.819, 0.047),
    new THREE.Vector3(0.10, 0.818, 0.047),
    new THREE.Vector3(0.29, 0.795, 0.047),
  ]);

  const left_back_join_bandGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(-0.398, 0.30, 0),
      new THREE.Vector3(-0.342, 0.303, 0)
    ),
    1,
    0.0465,
    8,
    false
  );
  const left_back_join_band = new THREE.Mesh(
    left_back_join_bandGeom,
    woodDarkMat
  );
  backrest_group.add(left_back_join_band);

  const right_back_join_bandGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(
      new THREE.Vector3(0.398, 0.30, 0),
      new THREE.Vector3(0.342, 0.303, 0)
    ),
    1,
    0.0465,
    8,
    false
  );
  const right_back_join_band = new THREE.Mesh(
    right_back_join_bandGeom,
    woodDarkMat
  );
  backrest_group.add(right_back_join_band);

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