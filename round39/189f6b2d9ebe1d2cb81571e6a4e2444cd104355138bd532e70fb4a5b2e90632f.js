export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_assembly = new THREE.Group();
  root.add(ring_assembly);

  const outerRadius = 1.0;
  const innerRadius = 0.78;
  const bandDepth = 0.34;
  const bevelThickness = 0.035;
  const frontSurface = bandDepth * 0.5 + bevelThickness;

  const ring_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd5aa68,
    metalness: 0.6,
    roughness: 0.2
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xe2bd7d,
    metalness: 0.6,
    roughness: 0.2
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x4a2917,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const ringShape = new THREE.Shape();
  ringShape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
  const ringHole = new THREE.Path();
  ringHole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  ringShape.holes.push(ringHole);

  const ring_bodyGeom = new THREE.ExtrudeGeometry(ringShape, {
    depth: bandDepth,
    steps: 1,
    curveSegments: 128,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.028,
    bevelThickness
  });
  ring_bodyGeom.translate(0, 0, -bandDepth * 0.5);
  const ring_body = new THREE.Mesh(ring_bodyGeom, ring_bodyMat);
  ring_assembly.add(ring_body);

  const front_inner_rimGeom = new THREE.TorusGeometry(0.812, 0.014, 10, 128);
  const front_inner_rim = new THREE.Mesh(front_inner_rimGeom, rimMat);
  front_inner_rim.position.z = frontSurface - 0.005;
  ring_assembly.add(front_inner_rim);

  const rear_inner_rimGeom = new THREE.TorusGeometry(0.812, 0.012, 8, 128);
  const rear_inner_rim = new THREE.Mesh(rear_inner_rimGeom, rimMat);
  rear_inner_rim.position.z = -frontSurface + 0.006;
  ring_assembly.add(rear_inner_rim);

  const front_outer_rimGeom = new THREE.TorusGeometry(0.968, 0.012, 8, 128);
  const front_outer_rim = new THREE.Mesh(front_outer_rimGeom, rimMat);
  front_outer_rim.position.z = frontSurface - 0.004;
  ring_assembly.add(front_outer_rim);

  function frontPoint(angle, radius, z = frontSurface + 0.003) {
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      z
    );
  }

  function addEngravedCurve(points, closed = false, radius = 0.007) {
    const curve = points.length === 2
      ? new THREE.LineCurve3(points[0], points[1])
      : new THREE.CatmullRomCurve3(points, closed, "centripetal");
    const segments = closed ? 48 : Math.max(12, points.length * 5);
    const geom = new THREE.TubeGeometry(
      curve,
      segments,
      radius,
      6,
      closed
    );
    const mesh = new THREE.Mesh(geom, engravingMat);
    engraved_band.add(mesh);
    return mesh;
  }

  function addSpiral(
    centerAngle,
    centerRadius,
    angleSpan,
    radialSpan,
    turns,
    direction
  ) {
    const points = [];
    const count = 28;
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const decay = 1 - 0.72 * t;
      const phase = direction * turns * Math.PI * 2 * t;
      const tangentOffset = angleSpan * decay * Math.cos(phase);
      const radialOffset = radialSpan * decay * Math.sin(phase);
      const angle = centerAngle + tangentOffset;
      const radius = centerRadius + radialOffset;
      points.push(frontPoint(angle, radius, frontSurface + 0.004));
    }
    return addEngravedCurve(points, false, 0.0075);
  }

  function addRadialStroke(
    angle,
    radius,
    tangentOffset,
    radialOffset,
    width,
    slant
  ) {
    const points = [];
    for (let i = 0; i <= 5; i++) {
      const t = i / 5;
      const decay = 1 - t;
      const localAngle = angle + tangentOffset * decay + slant * t;
      const localRadius = radius + radialOffset * decay;
      points.push(new THREE.Vector3(
        Math.cos(localAngle) * localRadius,
        Math.sin(localAngle) * localRadius,
        frontSurface + 0.004
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geom = new THREE.TubeGeometry(curve, 12, width, 7, false);
    const stroke = new THREE.Mesh(geom, engravingMat);
    engraved_band.add(stroke);
    return stroke;
  }

  function addBranchVein(angle, radius, length, spread, slope) {
    const points = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const tangentOffset = (t - 0.5) * spread;
      const radialOffset = -slope * length * (0.25 + 0.75 * t);
      const branchAngle = angle + tangentOffset;
      const branchRadius = radius + radialOffset;
      points.push(frontPoint(branchAngle, branchRadius, frontSurface + 0.004));
    }
    return addEngravedCurve(points, false, 0.0055);
  }

  function addLeafOutline(
    angle,
    radius,
    tangentHalf,
    radialHalf,
    tilt
  ) {
    const points = [];
    const count = 24;
    for (let i = 0; i < count; i++) {
      const phase = i / count * Math.PI * 2;
      const baseU = Math.cos(phase) * tangentHalf;
      const baseV = Math.sin(phase) * radialHalf;
      const u = baseU * Math.cos(tilt) - baseV * Math.sin(tilt);
      const v = baseU * Math.sin(tilt) + baseV * Math.cos(tilt);
      points.push(frontPoint(
        angle + u,
        radius + v,
        frontSurface + 0.004
      ));
    }
    return addEngravedCurve(points, true, 0.0055);
  }

  function addTriangleOutline(angle, radius, tangentHalf, radialHalf) {
    const p1 = frontPoint(
      angle - tangentHalf,
      radius - radialHalf * 0.65,
      frontSurface + 0.004
    );
    const p2 = frontPoint(
      angle + tangentHalf,
      radius - radialHalf * 0.65,
      frontSurface + 0.004
    );
    const p3 = frontPoint(
      angle,
      radius + radialHalf,
      frontSurface + 0.004
    );
    addEngravedCurve([p1, p2], false, 0.0055);
    addEngravedCurve([p2, p3], false, 0.0055);
    addEngravedCurve([p3, p1], false, 0.0055);
  }

  const engraved_band = new THREE.Group();
  ring_assembly.add(engraved_band);

  const panelCount = 10;
  const panelStep = Math.PI * 2 / panelCount;
  const panelPhase = 0.12;

  for (let i = 0; i < panelCount; i++) {
    const angle = i * panelStep + panelPhase;
    addRadialStroke(angle, 0.948, 0.105, -0.17, 0.0065, 0.018);
    addBranchVein(angle, 0.862, 0.17, 0.085, 0.075);
    addBranchVein(angle + 0.018, 0.902, 0.13, 0.072, -0.06);
  }

  const engraved_inner_borderGeom = new THREE.TorusGeometry(
    0.808,
    0.007,
    6,
    160
  );
  const engraved_inner_border = new THREE.Mesh(
    engraved_inner_borderGeom,
    engravingMat
  );
  engraved_inner_border.position.z = frontSurface + 0.002;
  engraved_band.add(engraved_inner_border);

  const engraved_outer_borderGeom = new THREE.TorusGeometry(
    0.958,
    0.007,
    6,
    160
  );
  const engraved_outer_border = new THREE.Mesh(
    engraved_outer_borderGeom,
    engravingMat
  );
  engraved_outer_border.position.z = frontSurface + 0.002;
  engraved_band.add(engraved_outer_border);

  const spiral_motifs = new THREE.Group();
  engraved_band.add(spiral_motifs);

  for (let i = 0; i < panelCount; i++) {
    const angle = i * panelStep + panelPhase + panelStep * 0.34;
    const direction = i % 2 === 0 ? 1 : -1;
    const motifRadius = i % 2 === 0 ? 0.902 : 0.875;
    addSpiral(
      angle,
      motifRadius,
      0.145,
      0.043,
      1.18,
      direction
    );
  }

  const leafCount = 18;
  for (let i = 0; i < leafCount; i++) {
    const angle = i / leafCount * Math.PI * 2 + 0.24;
    const radius = 0.872 + (i % 3) * 0.025;
    const tilt = i % 2 === 0 ? 0.42 : -0.42;
    addLeafOutline(
      angle,
      radius,
      0.027 + (i % 3) * 0.004,
      0.017 + (i % 2) * 0.004,
      tilt
    );
  }

  const triangleCount = 12;
  for (let i = 0; i < triangleCount; i++) {
    const angle = i / triangleCount * Math.PI * 2 + 0.09;
    const radius = i % 2 === 0 ? 0.858 : 0.923;
    addTriangleOutline(
      angle,
      radius,
      0.022,
      0.022
    );
  }

  const dotCount = 32;
  const engraved_dotsGeom = new THREE.CircleGeometry(0.0075, 10);
  const engraved_dots = new THREE.InstancedMesh(
    engraved_dotsGeom,
    engravingMat,
    dotCount
  );
  const dotMatrix = new THREE.Matrix4();
  const dotQuaternion = new THREE.Quaternion();
  const dotScale = new THREE.Vector3();
  for (let i = 0; i < dotCount; i++) {
    const angle = i / dotCount * Math.PI * 2 + 0.18;
    const radius = 0.842 + (i % 4) * 0.033;
    const size = 0.78 + (i % 3) * 0.16;
    const position = frontPoint(angle, radius, frontSurface + 0.005);
    dotScale.set(size, size, 1);
    dotMatrix.compose(position, dotQuaternion, dotScale);
    engraved_dots.setMatrixAt(i, dotMatrix);
  }
  engraved_dots.instanceMatrix.needsUpdate = true;
  engraved_band.add(engraved_dots);

  const wedgeCount = 16;
  const engraved_wedgesGeom = new THREE.CircleGeometry(0.014, 3);
  const engraved_wedges = new THREE.InstancedMesh(
    engraved_wedgesGeom,
    engravingMat,
    wedgeCount
  );
  const wedgeMatrix = new THREE.Matrix4();
  const wedgeQuaternion = new THREE.Quaternion();
  const wedgeScale = new THREE.Vector3();
  const wedgeAxis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < wedgeCount; i++) {
    const angle = i / wedgeCount * Math.PI * 2 + 0.31;
    const radius = i % 2 === 0 ? 0.887 : 0.932;
    const position = frontPoint(angle, radius, frontSurface + 0.0055);
    const rotation = angle + (i % 3 - 1) * 0.38;
    wedgeQuaternion.setFromAxisAngle(wedgeAxis, rotation);
    wedgeScale.set(
      0.85 + (i % 4) * 0.1,
      0.7 + (i % 2) * 0.18,
      1
    );
    wedgeMatrix.compose(position, wedgeQuaternion, wedgeScale);
    engraved_wedges.setMatrixAt(i, wedgeMatrix);
  }
  engraved_wedges.instanceMatrix.needsUpdate = true;
  engraved_band.add(engraved_wedges);

  const seamOuter = frontPoint(
    -1.18,
    outerRadius - 0.006,
    frontSurface + 0.006
  );
  const seamInner = frontPoint(
    -1.18,
    innerRadius + 0.006,
    frontSurface + 0.006
  );
  const closure_seam = addEngravedCurve(
    [seamOuter, seamInner],
    false,
    0.011
  );
  closure_seam.renderOrder = 2;

  ring_assembly.rotation.set(0.08, 0.52, -0.14);

  fitToUnitCube(THREE, root);
  return root;

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
}