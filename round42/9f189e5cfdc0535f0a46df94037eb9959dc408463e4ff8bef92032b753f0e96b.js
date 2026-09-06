export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "plush_ottoman";

  const cushion_group = new THREE.Group();
  cushion_group.name = "cushion_group";
  root.add(cushion_group);

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const cushionW = 1.56;
  const cushionD = 1.42;
  const cushionH = 0.50;
  const cushionY = 0.02;
  const cushionTop = cushionY + cushionH / 2;

  const base_cushionMat = new THREE.MeshStandardMaterial({
    color: 0xe3d8d2,
    metalness: 0.0,
    roughness: 0.95
  });
  const top_furMat = new THREE.MeshStandardMaterial({
    color: 0xeee5e0,
    metalness: 0.0,
    roughness: 0.95
  });
  const side_furMat = new THREE.MeshStandardMaterial({
    color: 0xdccfc8,
    metalness: 0.0,
    roughness: 0.95
  });
  const tuft_depressionMat = new THREE.MeshStandardMaterial({
    color: 0xcbbfb8,
    metalness: 0.0,
    roughness: 0.95
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  function createRoundedCushionGeometry(width, depth, height, radius, bevel) {
    const shapeW = width - bevel * 2;
    const shapeD = depth - bevel * 2;
    const halfW = shapeW / 2;
    const halfD = shapeD / 2;
    const cornerR = Math.max(0.02, radius - bevel);
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + cornerR, -halfD);
    shape.lineTo(halfW - cornerR, -halfD);
    shape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + cornerR);
    shape.lineTo(halfW, halfD - cornerR);
    shape.quadraticCurveTo(halfW, halfD, halfW - cornerR, halfD);
    shape.lineTo(-halfW + cornerR, halfD);
    shape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - cornerR);
    shape.lineTo(-halfW, -halfD + cornerR);
    shape.quadraticCurveTo(-halfW, -halfD, -halfW + cornerR, -halfD);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height - bevel * 2,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 5,
      curveSegments: 10
    });
    geometry.center();
    geometry.rotateX(-Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRoundedRectanglePath(halfW, halfD, radius) {
    const points = [];
    const cornerSegments = 8;
    const corners = [
      [halfW - radius, halfD - radius, 0],
      [-halfW + radius, halfD - radius, Math.PI / 2],
      [-halfW + radius, -halfD + radius, Math.PI],
      [halfW - radius, -halfD + radius, Math.PI * 1.5]
    ];

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= cornerSegments; i++) {
        const angle = corner[2] + (i / cornerSegments) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          0,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
  }

  const base_cushionGeom = createRoundedCushionGeometry(
    cushionW,
    cushionD,
    cushionH,
    0.18,
    0.065
  );
  const base_cushion = new THREE.Mesh(base_cushionGeom, base_cushionMat);
  base_cushion.name = "base_cushion";
  base_cushion.position.y = cushionY;
  cushion_group.add(base_cushion);

  const tuft_centers = [
    [-0.46, -0.34],
    [-0.02, -0.34],
    [0.43, -0.32],
    [-0.29, 0.02],
    [0.19, 0.04],
    [-0.46, 0.35],
    [0.00, 0.33],
    [0.45, 0.34]
  ];

  const top_furGeom = new THREE.PlaneGeometry(
    0.88,
    0.88,
    28,
    28
  );
  const topPosition = top_furGeom.attributes.position;
  const topHalf = 0.44;
  const topCorner = 0.14;

  for (let i = 0; i < topPosition.count; i++) {
    let x = topPosition.getX(i);
    let z = topPosition.getY(i);
    const absX = Math.abs(x);
    const absZ = Math.abs(z);
    let nx = 0;
    let nz = 0;

    if (absX > topHalf - topCorner) {
      nx = (x < 0 ? -1 : 1) *
        (absX - (topHalf - topCorner)) / topCorner;
    }
    if (absZ > topHalf - topCorner) {
      nz = (z < 0 ? -1 : 1) *
        (absZ - (topHalf - topCorner)) / topCorner;
    }

    const cornerLength = Math.sqrt(nx * nx + nz * nz);
    if (cornerLength > 1) {
      x -= Math.sign(x) * topCorner * (1 - 1 / cornerLength);
      z -= Math.sign(z) * topCorner * (1 - 1 / cornerLength);
    }

    let depression = 0;
    let mound = 0;
    for (let t = 0; t < tuft_centers.length; t++) {
      const dx = x - tuft_centers[t][0];
      const dz = z - tuft_centers[t][1];
      const distanceSquared = dx * dx + dz * dz;
      depression += Math.exp(-distanceSquared / 0.0038);
      mound += Math.exp(-distanceSquared / 0.020);
    }

    const fineWave =
      Math.sin(x * 43 + z * 17) * 0.0018 +
      Math.sin(z * 51 - x * 13) * 0.0014;
    const y = 0.012 + fineWave + mound * 0.006 - depression * 0.018;

    topPosition.setX(i, x);
    topPosition.setY(i, z);
    topPosition.setZ(i, y);
  }
  top_furGeom.computeVertexNormals();
  top_furGeom.rotateX(-Math.PI / 2);

  const top_fur = new THREE.Mesh(top_furGeom, top_furMat);
  top_fur.name = "top_fur";
  top_fur.scale.set(1.31, 1, 1.17);
  top_fur.position.y = cushionTop + 0.002;
  cushion_group.add(top_fur);

  const side_furGeom = new THREE.PlaneGeometry(1, 1);
  const side_fur = new THREE.InstancedMesh(side_furGeom, side_furMat, 4);
  side_fur.name = "side_fur";
  const sideDummy = new THREE.Object3D();
  const sideY = cushionY - 0.015;
  const sideTransforms = [
    [0, sideY, cushionD / 2 + 0.003, 0, 1.36, 0.34],
    [0, sideY, -cushionD / 2 - 0.003, Math.PI, 1.36, 0.34],
    [cushionW / 2 + 0.003, sideY, 0, Math.PI / 2, 1.22, 0.34],
    [-cushionW / 2 - 0.003, sideY, 0, -Math.PI / 2, 1.22, 0.34]
  ];

  for (let i = 0; i < sideTransforms.length; i++) {
    const transform = sideTransforms[i];
    sideDummy.position.set(transform[0], transform[1], transform[2]);
    sideDummy.rotation.set(0, transform[3], 0);
    sideDummy.scale.set(transform[4], transform[5], 1);
    sideDummy.updateMatrix();
    side_fur.setMatrixAt(i, sideDummy.matrix);
  }
  side_fur.instanceMatrix.needsUpdate = true;
  cushion_group.add(side_fur);

  const corner_furGeom = new THREE.PlaneGeometry(1, 1);
  const corner_fur = new THREE.InstancedMesh(
    corner_furGeom,
    side_furMat,
    4
  );
  corner_fur.name = "corner_fur";
  const cornerDummy = new THREE.Object3D();
  const cornerSigns = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ];
  const cornerX = cushionW / 2 - 0.145;
  const cornerZ = cushionD / 2 - 0.145;

  for (let i = 0; i < cornerSigns.length; i++) {
    const sx = cornerSigns[i][0];
    const sz = cornerSigns[i][1];
    const normal = new THREE.Vector3(sx, 0, sz).normalize();
    cornerDummy.position.set(
      sx * cornerX + normal.x * 0.004,
      sideY,
      sz * cornerZ + normal.z * 0.004
    );
    cornerDummy.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    cornerDummy.scale.set(0.22, 0.34, 1);
    cornerDummy.updateMatrix();
    corner_fur.setMatrixAt(i, cornerDummy.matrix);
  }
  corner_fur.instanceMatrix.needsUpdate = true;
  cushion_group.add(corner_fur);

  const tuft_depressionGeom = new THREE.SphereGeometry(1, 16, 8);
  const tuft_depressions = new THREE.InstancedMesh(
    tuft_depressionGeom,
    tuft_depressionMat,
    tuft_centers.length
  );
  tuft_depressions.name = "tuft_depressions";
  const depressionDummy = new THREE.Object3D();

  for (let i = 0; i < tuft_centers.length; i++) {
    depressionDummy.position.set(
      tuft_centers[i][0],
      cushionTop + 0.003,
      tuft_centers[i][1]
    );
    depressionDummy.rotation.set(0, 0, 0);
    depressionDummy.scale.set(0.052, 0.0045, 0.035);
    depressionDummy.updateMatrix();
    tuft_depressions.setMatrixAt(i, depressionDummy.matrix);
  }
  tuft_depressions.instanceMatrix.needsUpdate = true;
  cushion_group.add(tuft_depressions);

  const top_fiberPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.004, 0.008, -0.002),
    new THREE.Vector3(0.012, 0.015, 0.003),
    new THREE.Vector3(0.019, 0.010, 0.006)
  ]);
  const top_fiberGeom = new THREE.TubeGeometry(
    top_fiberPath,
    4,
    0.00145,
    4,
    false
  );
  const topFiberColumns = 34;
  const topFiberRows = 30;
  const top_fibers = new THREE.InstancedMesh(
    top_fiberGeom,
    top_furMat,
    topFiberColumns * topFiberRows
  );
  top_fibers.name = "top_fibers";
  const topFiberDummy = new THREE.Object3D();
  let topFiberIndex = 0;

  for (let iz = 0; iz < topFiberRows; iz++) {
    for (let ix = 0; ix < topFiberColumns; ix++) {
      const x = -0.63 + (ix / (topFiberColumns - 1)) * 1.26 +
        Math.sin((ix + 1) * 12.37 + (iz + 1) * 7.13) * 0.006;
      const z = -0.55 + (iz / (topFiberRows - 1)) * 1.10 +
        Math.sin((ix + 1) * 5.71 + (iz + 1) * 11.43) * 0.006;

      let depression = 0;
      for (let t = 0; t < tuft_centers.length; t++) {
        const dx = x - tuft_centers[t][0];
        const dz = z - tuft_centers[t][1];
        depression += Math.exp(-(dx * dx + dz * dz) / 0.0045);
      }

      const fiberHeight =
        0.015 +
        Math.sin((ix + 1) * 4.19 + (iz + 1) * 8.31) * 0.003 -
        depression * 0.004;
      const baseY = cushionTop + 0.005 + depression * 0.008;

      topFiberDummy.position.set(x, baseY, z);
      topFiberDummy.rotation.set(
        Math.sin((ix + 1) * 2.17 + iz) * 0.22,
        ((ix * 7 + iz * 13) % 31) / 31 * Math.PI * 2,
        Math.sin((ix + iz + 1) * 3.11) * 0.22
      );
      topFiberDummy.scale.set(
        0.78 + ((ix + iz * 2) % 5) * 0.07,
        fiberHeight / 0.015,
        0.78 + ((ix * 2 + iz) % 4) * 0.08
      );
      topFiberDummy.updateMatrix();
      top_fibers.setMatrixAt(topFiberIndex++, topFiberDummy.matrix);
    }
  }
  top_fibers.instanceMatrix.needsUpdate = true;
  cushion_group.add(top_fibers);

  const sideFiberColumns = 30;
  const sideFiberRows = 9;
  const cornerFiberColumns = 5;
  const sideFiberCount =
    2 * sideFiberColumns * sideFiberRows +
    4 * cornerFiberColumns * sideFiberRows;
  const side_fiberGeom = new THREE.TubeGeometry(
    top_fiberPath,
    4,
    0.0015,
    4,
    false
  );
  const side_fibers = new THREE.InstancedMesh(
    side_fiberGeom,
    side_furMat,
    sideFiberCount
  );
  side_fibers.name = "side_fibers";
  const sideFiberDummy = new THREE.Object3D();
  let sideFiberIndex = 0;

  for (let side = 0; side < 2; side++) {
    const faceSign = side === 0 ? 1 : -1;
    for (let iy = 0; iy < sideFiberRows; iy++) {
      for (let ix = 0; ix < sideFiberColumns; ix++) {
        const x = -0.66 + (ix / (sideFiberColumns - 1)) * 1.32 +
          Math.sin((ix + 1) * 8.17 + (iy + 1) * 5.31) * 0.005;
        const y = -0.19 + (iy / (sideFiberRows - 1)) * 0.39 +
          Math.sin((ix + 1) * 3.73 + iy) * 0.003;

        sideFiberDummy.position.set(
          x,
          y,
          faceSign * (cushionD / 2 + 0.005)
        );
        sideFiberDummy.rotation.set(
          faceSign * Math.PI / 2,
          ((ix + iy * 3) % 11) * 0.035,
          Math.sin((ix + 1) * 2.43 + iy) * 0.20
        );
        sideFiberDummy.scale.set(
          0.82 + ((ix + iy) % 4) * 0.08,
          0.90 + ((ix * 2 + iy) % 5) * 0.08,
          0.85
        );
        sideFiberDummy.updateMatrix();
        side_fibers.setMatrixAt(sideFiberIndex++, sideFiberDummy.matrix);
      }
    }
  }

  for (let side = 0; side < 2; side++) {
    const faceSign = side === 0 ? 1 : -1;
    for (let iy = 0; iy < sideFiberRows; iy++) {
      for (let ix = 0; ix < sideFiberColumns; ix++) {
        const z = -0.58 + (ix / (sideFiberColumns - 1)) * 1.16 +
          Math.sin((ix + 1) * 6.41 + (iy + 1) * 9.13) * 0.005;
        const y = -0.19 + (iy / (sideFiberRows - 1)) * 0.39 +
          Math.sin((ix + 1) * 4.11 + iy) * 0.003;

        sideFiberDummy.position.set(
          faceSign * (cushionW / 2 + 0.005),
          y,
          z
        );
        sideFiberDummy.rotation.set(
          Math.sin((ix + iy) * 2.19) * 0.20,
          faceSign * Math.PI / 2,
          -faceSign * Math.PI / 2
        );
        sideFiberDummy.scale.set(
          0.82 + ((ix + iy) % 4) * 0.08,
          0.90 + ((ix * 2 + iy) % 5) * 0.08,
          0.85
        );
        sideFiberDummy.updateMatrix();
        side_fibers.setMatrixAt(sideFiberIndex++, sideFiberDummy.matrix);
      }
    }
  }

  for (let c = 0; c < cornerSigns.length; c++) {
    const sx = cornerSigns[c][0];
    const sz = cornerSigns[c][1];
    const normal = new THREE.Vector3(sx, 0, sz).normalize();
    const tangent = new THREE.Vector3(-sz, 0, sx).normalize();
    const normalQuaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );

    for (let iy = 0; iy < sideFiberRows; iy++) {
      for (let ix = 0; ix < cornerFiberColumns; ix++) {
        const tangentOffset =
          -0.09 + (ix / (cornerFiberColumns - 1)) * 0.18;
        const y = -0.19 + (iy / (sideFiberRows - 1)) * 0.39;

        sideFiberDummy.position.set(
          sx * cornerX + normal.x * 0.006 + tangent.x * tangentOffset,
          y,
          sz * cornerZ + normal.z * 0.006 + tangent.z * tangentOffset
        );
        sideFiberDummy.quaternion.copy(normalQuaternion);
        sideFiberDummy.rotateZ(
          Math.sin((ix + 1) * 3.17 + iy + c) * 0.20
        );
        sideFiberDummy.rotateX(
          Math.sin((ix + iy + 1) * 2.29 + c) * 0.18
        );
        sideFiberDummy.scale.set(
          0.82 + ((ix + iy + c) % 4) * 0.08,
          0.90 + ((ix * 2 + iy + c) % 5) * 0.08,
          0.85
        );
        sideFiberDummy.updateMatrix();
        side_fibers.setMatrixAt(sideFiberIndex++, sideFiberDummy.matrix);
      }
    }
  }
  side_fibers.instanceMatrix.needsUpdate = true;
  cushion_group.add(side_fibers);

  const frameHalfW = 0.835;
  const frameHalfD = 0.775;
  const frameRadius = 0.15;
  const upperFrameY = 0.13;
  const lowerFrameY = -0.23;

  const upper_framePath = createRoundedRectanglePath(
    frameHalfW,
    frameHalfD,
    frameRadius
  );
  const upper_frameGeom = new THREE.TubeGeometry(
    upper_framePath,
    128,
    0.027,
    12,
    true
  );
  const upper_frame = new THREE.Mesh(upper_frameGeom, frameMat);
  upper_frame.name = "upper_frame";
  upper_frame.position.y = upperFrameY;
  frame_group.add(upper_frame);

  const lower_framePath = createRoundedRectanglePath(
    frameHalfW,
    frameHalfD,
    frameRadius
  );
  const lower_frameGeom = new THREE.TubeGeometry(
    lower_framePath,
    128,
    0.027,
    12,
    true
  );
  const lower_frame = new THREE.Mesh(lower_frameGeom, frameMat);
  lower_frame.name = "lower_frame";
  lower_frame.position.y = lowerFrameY;
  frame_group.add(lower_frame);

  const verticalBarHeight = upperFrameY - lowerFrameY;
  const verticalBarY = (upperFrameY + lowerFrameY) / 2;
  const vertical_frame_barsGeom = new THREE.CylinderGeometry(
    0.0125,
    0.0125,
    1,
    12
  );
  const vertical_frame_bars = new THREE.InstancedMesh(
    vertical_frame_barsGeom,
    frameMat,
    26
  );
  vertical_frame_bars.name = "vertical_frame_bars";
  const barDummy = new THREE.Object3D();
  let barIndex = 0;

  for (const faceSign of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      barDummy.position.set(
        -0.54 + (i / 6) * 1.08,
        verticalBarY,
        faceSign * frameHalfD
      );
      barDummy.rotation.set(0, 0, 0);
      barDummy.scale.set(1, verticalBarHeight, 1);
      barDummy.updateMatrix();
      vertical_frame_bars.setMatrixAt(barIndex++, barDummy.matrix);
    }
  }

  for (const faceSign of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      barDummy.position.set(
        faceSign * frameHalfW,
        verticalBarY,
        -0.47 + (i / 5) * 0.94
      );
      barDummy.rotation.set(0, 0, 0);
      barDummy.scale.set(1, verticalBarHeight, 1);
      barDummy.updateMatrix();
      vertical_frame_bars.setMatrixAt(barIndex++, barDummy.matrix);
    }
  }

  for (let c = 0; c < cornerSigns.length; c++) {
    const sx = cornerSigns[c][0];
    const sz = cornerSigns[c][1];
    barDummy.position.set(
      sx * (frameHalfW - frameRadius),
      verticalBarY,
      sz * (frameHalfD - frameRadius)
    );
    barDummy.rotation.set(0, 0, 0);
    barDummy.scale.set(1, verticalBarHeight, 1);
    barDummy.updateMatrix();
    vertical_frame_bars.setMatrixAt(barIndex++, barDummy.matrix);
  }
  vertical_frame_bars.instanceMatrix.needsUpdate = true;
  frame_group.add(vertical_frame_bars);

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

  fitToUnitCube(root);
  return root;
}