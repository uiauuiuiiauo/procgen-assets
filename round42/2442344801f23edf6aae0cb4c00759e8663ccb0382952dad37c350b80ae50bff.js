export default function generate(THREE) {
  const root = new THREE.Group();

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9b7735,
    metalness: 0.6,
    roughness: 0.5,
  });
  const bright_brassMat = new THREE.MeshStandardMaterial({
    color: 0xb69248,
    metalness: 0.6,
    roughness: 0.5,
  });
  const dark_patinaMat = new THREE.MeshStandardMaterial({
    color: 0x27231c,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const copper_patinaMat = new THREE.MeshStandardMaterial({
    color: 0x704b35,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x171817,
    metalness: 0.0,
    roughness: 0.95,
  });
  const charMat = new THREE.MeshStandardMaterial({
    color: 0x090a09,
    metalness: 0.0,
    roughness: 0.95,
  });

  const base_pedestalProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.335, 0.000),
    new THREE.Vector2(0.385, 0.015),
    new THREE.Vector2(0.405, 0.040),
    new THREE.Vector2(0.400, 0.070),
    new THREE.Vector2(0.370, 0.095),
    new THREE.Vector2(0.315, 0.125),
    new THREE.Vector2(0.265, 0.165),
    new THREE.Vector2(0.225, 0.215),
    new THREE.Vector2(0.190, 0.275),
    new THREE.Vector2(0.162, 0.345),
    new THREE.Vector2(0.142, 0.415),
    new THREE.Vector2(0.130, 0.455),
    new THREE.Vector2(0.108, 0.475),
    new THREE.Vector2(0.000, 0.475),
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile, 64);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, brassMat);
  root.add(base_pedestal);

  const base_bottom_bandGeom = new THREE.CylinderGeometry(0.394, 0.394, 0.028, 64);
  const base_bottom_band = new THREE.Mesh(base_bottom_bandGeom, bright_brassMat);
  base_bottom_band.position.y = 0.026;
  root.add(base_bottom_band);

  const base_rimGeom = new THREE.TorusGeometry(0.378, 0.018, 10, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, bright_brassMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.052;
  root.add(base_rim);

  const base_collarGeom = new THREE.TorusGeometry(0.116, 0.018, 10, 48);
  const base_collar = new THREE.Mesh(base_collarGeom, bright_brassMat);
  base_collar.rotation.x = Math.PI / 2;
  base_collar.position.y = 0.468;
  root.add(base_collar);

  const socket_innerGeom = new THREE.CylinderGeometry(0.101, 0.101, 0.012, 40);
  const socket_inner = new THREE.Mesh(socket_innerGeom, dark_patinaMat);
  socket_inner.position.y = 0.481;
  root.add(socket_inner);

  const candle_bodyPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.000, 0.455, 0.000),
    new THREE.Vector3(-0.004, 0.720, 0.002),
    new THREE.Vector3(-0.012, 1.080, 0.004),
    new THREE.Vector3(-0.006, 1.450, 0.003),
    new THREE.Vector3(0.006, 1.820, 0.001),
    new THREE.Vector3(0.018, 2.170, -0.002),
    new THREE.Vector3(0.032, 2.480, -0.003),
    new THREE.Vector3(0.040, 2.700, 0.000),
  ], false, "centripetal");

  function candleRadius(t) {
    return 0.106 - 0.020 * t + 0.0015 * Math.sin(t * Math.PI * 4);
  }

  function candleFrame(t) {
    const center = candle_bodyPath.getPoint(t);
    const tangent = candle_bodyPath.getTangent(t).normalize();
    const normal = new THREE.Vector3().crossVectors(
      new THREE.Vector3(0, 0, 1),
      tangent
    );
    if (normal.lengthSq() < 0.000001) normal.set(1, 0, 0);
    normal.normalize();
    const binormal = new THREE.Vector3()
      .crossVectors(tangent, normal)
      .normalize();
    return { center, tangent, normal, binormal };
  }

  const candle_bodyGeom = new THREE.BufferGeometry();
  const candlePositions = [];
  const candleIndices = [];
  const candleLengthSegments = 72;
  const candleRadialSegments = 32;

  for (let iy = 0; iy <= candleLengthSegments; iy++) {
    const t = iy / candleLengthSegments;
    const frame = candleFrame(t);
    const radius = candleRadius(t);
    for (let ia = 0; ia < candleRadialSegments; ia++) {
      const angle = ia / candleRadialSegments * Math.PI * 2;
      const radial = frame.normal.clone()
        .multiplyScalar(Math.cos(angle))
        .addScaledVector(frame.binormal, Math.sin(angle));
      const vertex = frame.center.clone().addScaledVector(radial, radius);
      candlePositions.push(vertex.x, vertex.y, vertex.z);
    }
  }

  for (let iy = 0; iy < candleLengthSegments; iy++) {
    for (let ia = 0; ia < candleRadialSegments; ia++) {
      const next = (ia + 1) % candleRadialSegments;
      const a = iy * candleRadialSegments + ia;
      const b = iy * candleRadialSegments + next;
      const c = (iy + 1) * candleRadialSegments + next;
      const d = (iy + 1) * candleRadialSegments + ia;
      candleIndices.push(a, b, d, b, c, d);
    }
  }

  const candleBottomCenter = candlePositions.length / 3;
  const bottomCenterPoint = candle_bodyPath.getPoint(0);
  candlePositions.push(bottomCenterPoint.x, bottomCenterPoint.y, bottomCenterPoint.z);

  const candleTopCenter = candlePositions.length / 3;
  const topCenterPoint = candle_bodyPath.getPoint(1);
  candlePositions.push(topCenterPoint.x, topCenterPoint.y, topCenterPoint.z);

  for (let ia = 0; ia < candleRadialSegments; ia++) {
    const next = (ia + 1) % candleRadialSegments;
    candleIndices.push(candleBottomCenter, next, ia);

    const topStart = candleLengthSegments * candleRadialSegments;
    candleIndices.push(
      candleTopCenter,
      topStart + ia,
      topStart + next
    );
  }

  candle_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(candlePositions, 3)
  );
  candle_bodyGeom.setIndex(candleIndices);
  candle_bodyGeom.computeVertexNormals();

  const candle_body = new THREE.Mesh(candle_bodyGeom, brassMat);
  root.add(candle_body);

  const candle_top_capGeom = new THREE.CylinderGeometry(0.087, 0.087, 0.012, 32);
  const candle_top_cap = new THREE.Mesh(candle_top_capGeom, brassMat);
  candle_top_cap.position.copy(topCenterPoint);
  root.add(candle_top_cap);

  const wick_socketGeom = new THREE.TorusGeometry(0.027, 0.007, 8, 24);
  const wick_socket = new THREE.Mesh(wick_socketGeom, charMat);
  wick_socket.rotation.x = Math.PI / 2;
  wick_socket.position.set(topCenterPoint.x, topCenterPoint.y + 0.009, topCenterPoint.z);
  root.add(wick_socket);

  const patina_spotGeom = new THREE.CircleGeometry(1, 10);
  const normalAxis = new THREE.Vector3(0, 0, 1);

  const candleSpotCount = 46;
  const candle_patina_spots = new THREE.InstancedMesh(
    patina_spotGeom,
    dark_patinaMat,
    candleSpotCount
  );
  const candleSpotMatrix = new THREE.Matrix4();

  for (let i = 0; i < candleSpotCount; i++) {
    const t = 0.035 + ((i * 17) % 47) / 47 * 0.91;
    const angle = ((i * 13) % 43) / 43 * Math.PI * 2;
    const frame = candleFrame(t);
    const radius = candleRadius(t) + 0.0018;
    const radial = frame.normal.clone()
      .multiplyScalar(Math.cos(angle))
      .addScaledVector(frame.binormal, Math.sin(angle))
      .normalize();
    const position = frame.center.clone().addScaledVector(radial, radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(normalAxis, radial);
    const sx = 0.006 + (i % 5) * 0.0022;
    const sy = 0.008 + ((i * 3) % 7) * 0.003;
    candleSpotMatrix.compose(
      position,
      quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
    candle_patina_spots.setMatrixAt(i, candleSpotMatrix);
  }
  candle_patina_spots.instanceMatrix.needsUpdate = true;
  root.add(candle_patina_spots);

  const candleClusterCount = 14;
  const candle_patina_clusters = new THREE.InstancedMesh(
    patina_spotGeom,
    dark_patinaMat,
    candleClusterCount
  );
  const clusterMatrix = new THREE.Matrix4();

  for (let i = 0; i < candleClusterCount; i++) {
    const t = 0.07 + ((i * 9) % 17) / 17 * 0.62;
    const angle = ((i * 11 + 3) % 19) / 19 * Math.PI * 2;
    const frame = candleFrame(t);
    const radius = candleRadius(t) + 0.002;
    const radial = frame.normal.clone()
      .multiplyScalar(Math.cos(angle))
      .addScaledVector(frame.binormal, Math.sin(angle))
      .normalize();
    const position = frame.center.clone().addScaledVector(radial, radius);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(normalAxis, radial);
    const sx = 0.010 + (i % 4) * 0.003;
    const sy = 0.020 + ((i * 5) % 6) * 0.005;
    clusterMatrix.compose(
      position,
      quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
    candle_patina_clusters.setMatrixAt(i, clusterMatrix);
  }
  candle_patina_clusters.instanceMatrix.needsUpdate = true;
  root.add(candle_patina_clusters);

  function baseSurfacePose(y, angle, offset) {
    let radius;
    let slope;
    if (y < 0.10) {
      radius = 0.390 - (y - 0.06) * 0.75;
      slope = -0.75;
    } else if (y < 0.20) {
      radius = 0.360 - (y - 0.10) * 1.30;
      slope = -1.30;
    } else if (y < 0.32) {
      radius = 0.230 - (y - 0.20) * 0.58;
      slope = -0.58;
    } else {
      radius = 0.160 - (y - 0.32) * 0.38;
      slope = -0.38;
    }

    const radial = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
    const normal = new THREE.Vector3(
      radial.x * -slope,
      1,
      radial.z * -slope
    ).normalize();
    const position = radial.clone()
      .multiplyScalar(radius)
      .add(new THREE.Vector3(0, y, 0))
      .addScaledVector(normal, offset);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(normalAxis, normal);
    return { position, quaternion };
  }

  const baseSpotCount = 30;
  const base_patina_spots = new THREE.InstancedMesh(
    patina_spotGeom,
    dark_patinaMat,
    baseSpotCount
  );
  const baseSpotMatrix = new THREE.Matrix4();

  for (let i = 0; i < baseSpotCount; i++) {
    const y = 0.075 + ((i * 7) % 31) / 31 * 0.35;
    const angle = ((i * 11 + 1) % 29) / 29 * Math.PI * 2;
    const pose = baseSurfacePose(y, angle, 0.002);
    const sx = 0.006 + (i % 6) * 0.0025;
    const sy = 0.006 + ((i * 5) % 7) * 0.002;
    baseSpotMatrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
    base_patina_spots.setMatrixAt(i, baseSpotMatrix);
  }
  base_patina_spots.instanceMatrix.needsUpdate = true;
  root.add(base_patina_spots);

  const baseTarnishCount = 13;
  const base_tarnish_spots = new THREE.InstancedMesh(
    patina_spotGeom,
    copper_patinaMat,
    baseTarnishCount
  );
  const tarnishMatrix = new THREE.Matrix4();

  for (let i = 0; i < baseTarnishCount; i++) {
    const y = 0.085 + ((i * 5 + 2) % 17) / 17 * 0.30;
    const angle = ((i * 9 + 4) % 23) / 23 * Math.PI * 2;
    const pose = baseSurfacePose(y, angle, 0.0018);
    const sx = 0.014 + (i % 4) * 0.005;
    const sy = 0.008 + ((i * 3) % 5) * 0.004;
    tarnishMatrix.compose(
      pose.position,
      pose.quaternion,
      new THREE.Vector3(sx, sy, 1)
    );
    base_tarnish_spots.setMatrixAt(i, tarnishMatrix);
  }
  base_tarnish_spots.instanceMatrix.needsUpdate = true;
  root.add(base_tarnish_spots);

  const wickPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(topCenterPoint.x, topCenterPoint.y + 0.005, topCenterPoint.z),
    new THREE.Vector3(0.041, 2.755, 0.002),
    new THREE.Vector3(0.034, 2.815, 0.004),
    new THREE.Vector3(0.048, 2.865, 0.002),
    new THREE.Vector3(0.082, 2.910, 0.000),
    new THREE.Vector3(0.116, 2.942, -0.002),
  ], false, "centripetal");
  const wickGeom = new THREE.TubeGeometry(wickPath, 28, 0.018, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  root.add(wick);

  const wick_tipGeom = new THREE.SphereGeometry(0.022, 12, 8);
  const wick_tip = new THREE.Mesh(wick_tipGeom, charMat);
  wick_tip.position.set(0.118, 2.944, -0.002);
  wick_tip.scale.set(1.15, 0.75, 0.9);
  root.add(wick_tip);

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}