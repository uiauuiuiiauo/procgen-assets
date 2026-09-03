export default function generate(THREE) {
  const candle_holder = new THREE.Group();
  candle_holder.name = "candle_holder";

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa27f38,
    metalness: 0.55,
    roughness: 0.42,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x665027,
    metalness: 0.45,
    roughness: 0.65,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x292720,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const wickMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.95,
  });
  const wickTipMat = new THREE.MeshStandardMaterial({
    color: 0x303030,
    metalness: 0.0,
    roughness: 0.95,
  });

  const holder = new THREE.Group();
  holder.name = "holder";
  candle_holder.add(holder);

  const base_pedestalProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.340, 0.000),
    new THREE.Vector2(0.385, 0.012),
    new THREE.Vector2(0.405, 0.032),
    new THREE.Vector2(0.405, 0.055),
    new THREE.Vector2(0.390, 0.078),
    new THREE.Vector2(0.350, 0.105),
    new THREE.Vector2(0.310, 0.140),
    new THREE.Vector2(0.270, 0.185),
    new THREE.Vector2(0.235, 0.235),
    new THREE.Vector2(0.205, 0.290),
    new THREE.Vector2(0.180, 0.345),
    new THREE.Vector2(0.160, 0.395),
    new THREE.Vector2(0.148, 0.425),
    new THREE.Vector2(0.142, 0.448),
    new THREE.Vector2(0.118, 0.448),
    new THREE.Vector2(0.112, 0.425),
    new THREE.Vector2(0.108, 0.400),
    new THREE.Vector2(0.000, 0.400),
  ];
  const base_pedestalGeom = new THREE.LatheGeometry(base_pedestalProfile, 64);
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, brassMat);
  base_pedestal.name = "base_pedestal";
  holder.add(base_pedestal);

  const base_rimGeom = new THREE.TorusGeometry(0.388, 0.012, 10, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, brassMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.045;
  holder.add(base_rim);

  const base_shadow_ringGeom = new THREE.TorusGeometry(0.389, 0.005, 8, 64);
  const base_shadow_ring = new THREE.Mesh(base_shadow_ringGeom, darkBrassMat);
  base_shadow_ring.name = "base_shadow_ring";
  base_shadow_ring.rotation.x = Math.PI / 2;
  base_shadow_ring.position.y = 0.018;
  holder.add(base_shadow_ring);

  const socket_rimGeom = new THREE.TorusGeometry(0.132, 0.010, 10, 48);
  const socket_rim = new THREE.Mesh(socket_rimGeom, brassMat);
  socket_rim.name = "socket_rim";
  socket_rim.rotation.x = Math.PI / 2;
  socket_rim.position.y = 0.446;
  holder.add(socket_rim);

  const socket_innerGeom = new THREE.CylinderGeometry(0.112, 0.112, 0.022, 40);
  const socket_inner = new THREE.Mesh(socket_innerGeom, patinaMat);
  socket_inner.name = "socket_inner";
  socket_inner.position.y = 0.410;
  holder.add(socket_inner);

  const candle_assembly = new THREE.Group();
  candle_assembly.name = "candle_assembly";
  candle_assembly.position.y = 0.380;
  candle_holder.add(candle_assembly);

  const candle_bodyPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.000, 0.000, 0.000),
    new THREE.Vector3(-0.006, 0.350, 0.000),
    new THREE.Vector3(-0.014, 0.800, 0.002),
    new THREE.Vector3(-0.012, 1.250, 0.004),
    new THREE.Vector3(-0.004, 1.650, 0.002),
    new THREE.Vector3(0.010, 2.020, -0.002),
    new THREE.Vector3(0.025, 2.300, 0.000),
  ], false, "centripetal");

  function candleRadius(t) {
    return 0.105 - 0.025 * t - 0.014 * t * t;
  }

  function candleFrame(t) {
    const center = candle_bodyPath.getPoint(t);
    const tangent = candle_bodyPath.getTangent(t).normalize();
    const side = new THREE.Vector3().crossVectors(
      new THREE.Vector3(0, 0, 1),
      tangent
    );
    if (side.lengthSq() < 0.000001) side.set(1, 0, 0);
    side.normalize();
    const front = new THREE.Vector3()
      .crossVectors(tangent, side)
      .normalize();
    return { center, tangent, side, front };
  }

  function createCandleBodyGeometry() {
    const ringCount = 44;
    const radialSegments = 40;
    const ringVertices = radialSegments + 1;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= ringCount; i++) {
      const t = i / ringCount;
      const frame = candleFrame(t);
      const radius = candleRadius(t);

      for (let j = 0; j <= radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const offset = frame.side.clone()
          .multiplyScalar(Math.cos(angle) * radius)
          .addScaledVector(frame.front, Math.sin(angle) * radius);
        const point = frame.center.clone().add(offset);
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let i = 0; i < ringCount; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const a = i * ringVertices + j;
        const b = a + 1;
        const c = (i + 1) * ringVertices + j;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const bottomCenter = candle_bodyPath.getPoint(0);
    const bottomCenterIndex = positions.length / 3;
    positions.push(bottomCenter.x, bottomCenter.y, bottomCenter.z);
    for (let j = 0; j < radialSegments; j++) {
      indices.push(bottomCenterIndex, j + 1, j);
    }

    const topCenter = candle_bodyPath.getPoint(1);
    const topCenterIndex = positions.length / 3;
    positions.push(topCenter.x, topCenter.y, topCenter.z);
    const topRingStart = ringCount * ringVertices;
    for (let j = 0; j < radialSegments; j++) {
      indices.push(topCenterIndex, topRingStart + j, topRingStart + j + 1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const candle_bodyGeom = createCandleBodyGeometry();
  const candle_body = new THREE.Mesh(candle_bodyGeom, brassMat);
  candle_body.name = "candle_body";
  candle_assembly.add(candle_body);

  const candle_top_frame = candleFrame(1);
  const candle_top_capGeom = new THREE.CylinderGeometry(
    candleRadius(1),
    candleRadius(1),
    0.012,
    32
  );
  const candle_top_cap = new THREE.Mesh(candle_top_capGeom, brassMat);
  candle_top_cap.name = "candle_top_cap";
  candle_top_cap.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    candle_top_frame.tangent
  );
  candle_top_cap.position.copy(candle_top_frame.center)
    .addScaledVector(candle_top_frame.tangent, 0.004);
  candle_assembly.add(candle_top_cap);

  const candle_patinaGeom = new THREE.CircleGeometry(0.018, 12);
  const candle_patina = new THREE.InstancedMesh(
    candle_patinaGeom,
    patinaMat,
    46
  );
  candle_patina.name = "candle_patina";

  const candle_patinaMatrix = new THREE.Matrix4();
  const candle_patinaScale = new THREE.Vector3();
  const localNormalAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 46; i++) {
    const t = 0.045 + ((i * 37) % 101) / 101 * 0.91;
    const angle = ((i * 53) % 127) / 127 * Math.PI * 2;
    const frame = candleFrame(t);
    const normal = frame.side.clone()
      .multiplyScalar(Math.cos(angle))
      .addScaledVector(frame.front, Math.sin(angle))
      .normalize();
    const radius = candleRadius(t);
    const position = frame.center.clone().addScaledVector(normal, radius + 0.0018);
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      localNormalAxis,
      normal
    );
    const roll = new THREE.Quaternion().setFromAxisAngle(
      localNormalAxis,
      ((i * 29) % 31) / 31 * Math.PI
    );
    orientation.multiply(roll);
    candle_patinaScale.set(
      0.25 + ((i * 17) % 19) / 19 * 0.95,
      0.20 + ((i * 23) % 17) / 17 * 1.15,
      1
    );
    candle_patinaMatrix.compose(position, orientation, candle_patinaScale);
    candle_patina.setMatrixAt(i, candle_patinaMatrix);
  }
  candle_patina.instanceMatrix.needsUpdate = true;
  candle_assembly.add(candle_patina);

  function baseOuterRadius(y) {
    if (y < 0.055) return 0.402;
    if (y < 0.105) return 0.390 - (y - 0.055) * 1.80;
    if (y < 0.185) return 0.300 - (y - 0.105) * 1.50;
    if (y < 0.290) return 0.240 - (y - 0.185) * 0.75;
    if (y < 0.395) return 0.181 - (y - 0.290) * 0.38;
    return 0.141;
  }

  function baseOuterSlope(y) {
    if (y < 0.055) return 0;
    if (y < 0.105) return -1.80;
    if (y < 0.185) return -1.50;
    if (y < 0.290) return -0.75;
    if (y < 0.395) return -0.38;
    return 0;
  }

  const base_patinaGeom = new THREE.CircleGeometry(0.014, 10);
  const base_patina = new THREE.InstancedMesh(base_patinaGeom, patinaMat, 30);
  base_patina.name = "base_patina";

  const base_patinaMatrix = new THREE.Matrix4();
  const base_patinaScale = new THREE.Vector3();

  for (let i = 0; i < 30; i++) {
    const y = 0.050 + ((i * 23) % 67) / 67 * 0.355;
    const angle = ((i * 41) % 79) / 79 * Math.PI * 2;
    const radius = baseOuterRadius(y);
    const slope = baseOuterSlope(y);
    const normal = new THREE.Vector3(
      Math.cos(angle),
      -slope,
      Math.sin(angle)
    ).normalize();
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ).addScaledVector(normal, 0.002);
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      localNormalAxis,
      normal
    );
    const roll = new THREE.Quaternion().setFromAxisAngle(
      localNormalAxis,
      ((i * 19) % 29) / 29 * Math.PI
    );
    orientation.multiply(roll);
    base_patinaScale.set(
      0.30 + ((i * 13) % 17) / 17 * 1.15,
      0.25 + ((i * 11) % 23) / 23 * 1.35,
      1
    );
    base_patinaMatrix.compose(position, orientation, base_patinaScale);
    base_patina.setMatrixAt(i, base_patinaMatrix);
  }
  base_patina.instanceMatrix.needsUpdate = true;
  holder.add(base_patina);

  const wickPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.025, 2.298, 0.000),
    new THREE.Vector3(0.022, 2.355, 0.002),
    new THREE.Vector3(0.030, 2.410, 0.004),
    new THREE.Vector3(0.050, 2.462, 0.006),
    new THREE.Vector3(0.082, 2.505, 0.008),
    new THREE.Vector3(0.108, 2.535, 0.009),
  ], false, "centripetal");
  const wickGeom = new THREE.TubeGeometry(wickPath, 32, 0.015, 8, false);
  const wick = new THREE.Mesh(wickGeom, wickMat);
  wick.name = "wick";
  candle_assembly.add(wick);

  const wick_tipGeom = new THREE.SphereGeometry(0.019, 12, 8);
  const wick_tip = new THREE.Mesh(wick_tipGeom, wickTipMat);
  wick_tip.name = "wick_tip";
  wick_tip.position.set(0.108, 2.535, 0.009);
  wick_tip.scale.set(1.15, 0.85, 1.0);
  candle_assembly.add(wick_tip);

  function fitToUnitCube(root) {
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

  fitToUnitCube(candle_holder);
  return candle_holder;
}