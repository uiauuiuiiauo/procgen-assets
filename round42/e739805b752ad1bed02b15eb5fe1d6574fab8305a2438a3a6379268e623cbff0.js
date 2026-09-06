export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const vase = new THREE.Group();
  vase.name = "vase";
  root.add(vase);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe5ddd5,
    metalness: 0.0,
    roughness: 0.4,
  });

  const inner_neckMat = new THREE.MeshStandardMaterial({
    color: 0xcbbfb6,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const cavity_shadowMat = new THREE.MeshStandardMaterial({
    color: 0xa99d94,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  const crack_channelMat = new THREE.MeshStandardMaterial({
    color: 0x382307,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.290, 0.000),
    new THREE.Vector2(0.315, 0.012),
    new THREE.Vector2(0.335, 0.040),
    new THREE.Vector2(0.360, 0.100),
    new THREE.Vector2(0.400, 0.180),
    new THREE.Vector2(0.445, 0.280),
    new THREE.Vector2(0.480, 0.400),
    new THREE.Vector2(0.495, 0.520),
    new THREE.Vector2(0.490, 0.620),
    new THREE.Vector2(0.460, 0.720),
    new THREE.Vector2(0.410, 0.820),
    new THREE.Vector2(0.340, 0.910),
    new THREE.Vector2(0.270, 0.980),
    new THREE.Vector2(0.235, 1.040),
    new THREE.Vector2(0.225, 1.100),
    new THREE.Vector2(0.230, 1.160),
    new THREE.Vector2(0.255, 1.210),
    new THREE.Vector2(0.290, 1.245),
    new THREE.Vector2(0.310, 1.265),
  ];

  function bodyRadiusAt(y) {
    if (y <= bodyProfile[0].y) return bodyProfile[0].x;
    for (let i = 1; i < bodyProfile.length; i++) {
      const lower = bodyProfile[i - 1];
      const upper = bodyProfile[i];
      if (y <= upper.y) {
        const span = upper.y - lower.y || 1;
        const t = (y - lower.y) / span;
        return lower.x + (upper.x - lower.x) * t;
      }
    }
    return bodyProfile[bodyProfile.length - 1].x;
  }

  function surfacePoint(angle, y, extra) {
    const radius = bodyRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function frontSurfacePoint(x, y, extra) {
    const radius = bodyRadiusAt(y);
    const safeX = Math.max(-radius * 0.985, Math.min(radius * 0.985, x));
    const z = Math.sqrt(Math.max(0.000001, radius * radius - safeX * safeX));
    const scale = (radius + extra) / radius;
    return new THREE.Vector3(safeX * scale, y, z * scale);
  }

  function createSurfaceRibbon(points, widths, extra) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < points.length; i++) {
      const previous = points[Math.max(0, i - 1)];
      const next = points[Math.min(points.length - 1, i + 1)];
      const tangent = next.clone().sub(previous).normalize();
      const normal = new THREE.Vector3(points[i].x, 0, points[i].z).normalize();
      const side = new THREE.Vector3().crossVectors(normal, tangent).normalize();
      const halfWidth = widths[i] * 0.5;

      const left = points[i].clone().addScaledVector(side, halfWidth);
      const right = points[i].clone().addScaledVector(side, -halfWidth);
      const leftRadius = Math.sqrt(left.x * left.x + left.z * left.z) || 1;
      const rightRadius = Math.sqrt(right.x * right.x + right.z * right.z) || 1;

      left.x *= (leftRadius + extra) / leftRadius;
      left.z *= (leftRadius + extra) / leftRadius;
      right.x *= (rightRadius + extra) / rightRadius;
      right.z *= (rightRadius + extra) / rightRadius;

      positions.push(left.x, left.y, left.z);
      positions.push(right.x, right.y, right.z);

      if (i < points.length - 1) {
        const base = i * 2;
        indices.push(
          base, base + 2, base + 1,
          base + 1, base + 2, base + 3
        );
      }
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

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  vase.add(body);

  const base_footGeom = new THREE.CylinderGeometry(0.292, 0.300, 0.018, 64);
  const base_foot = new THREE.Mesh(base_footGeom, bodyMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.009;
  vase.add(base_foot);

  const inner_neckGeom = new THREE.CylinderGeometry(
    0.242,
    0.205,
    0.105,
    64,
    1,
    true
  );
  const inner_neck = new THREE.Mesh(inner_neckGeom, inner_neckMat);
  inner_neck.name = "inner_neck";
  inner_neck.position.y = 1.2125;
  vase.add(inner_neck);

  const cavity_shadowGeom = new THREE.CircleGeometry(0.205, 64);
  const cavity_shadow = new THREE.Mesh(cavity_shadowGeom, cavity_shadowMat);
  cavity_shadow.name = "cavity_shadow";
  cavity_shadow.rotation.x = -Math.PI / 2;
  cavity_shadow.position.y = 1.160;
  vase.add(cavity_shadow);

  const rimGeom = new THREE.TorusGeometry(0.285, 0.025, 16, 64);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.265;
  vase.add(rim);

  const inner_rimGeom = new THREE.TorusGeometry(0.244, 0.007, 10, 64);
  const inner_rim = new THREE.Mesh(inner_rimGeom, inner_neckMat);
  inner_rim.name = "inner_rim";
  inner_rim.rotation.x = Math.PI / 2;
  inner_rim.position.y = 1.264;
  vase.add(inner_rim);

  const gold_decoration = new THREE.Group();
  gold_decoration.name = "gold_decoration";
  vase.add(gold_decoration);

  const speckleGeom = new THREE.CircleGeometry(1, 8);
  const speckleCount = 340;
  const gold_speckles = new THREE.InstancedMesh(
    speckleGeom,
    goldMat,
    speckleCount
  );
  gold_speckles.name = "gold_speckles";
  gold_speckles.frustumCulled = false;

  const speckle_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < speckleCount; i++) {
    const verticalIndex = (i * 73) % speckleCount;
    const u = (verticalIndex + 0.5) / speckleCount;
    const y = 0.030 + 1.195 * Math.pow(u, 1.35);
    const angle =
      i * 2.399963229728653 +
      Math.sin(i * 1.731) * 0.28 +
      Math.cos(i * 0.417) * 0.12;
    const radius = bodyRadiusAt(y) + 0.0045;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );

    let size = 0.0018 + (((i * 29) % 23) / 22) * 0.0048;
    if (i % 41 === 0) size *= 2.1;
    if (i % 17 === 0) size *= 1.45;

    const widthFactor = 0.55 + (((i * 11) % 19) / 18) * 0.85;
    const heightFactor = 0.45 + (((i * 31) % 17) / 16) * 1.15;

    speckle_dummy.position.set(
      normal.x * radius,
      y,
      normal.z * radius
    );
    speckle_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    speckle_dummy.rotateZ(i * 1.117 + Math.sin(i * 0.63) * 0.8);
    speckle_dummy.scale.set(
      size * widthFactor,
      size * heightFactor,
      1
    );
    speckle_dummy.updateMatrix();
    gold_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }

  gold_speckles.instanceMatrix.needsUpdate = true;
  gold_decoration.add(gold_speckles);

  const upper_left_path = [
    frontSurfacePoint(-0.155, 1.245, 0.003),
    frontSurfacePoint(-0.172, 1.190, 0.003),
    frontSurfacePoint(-0.166, 1.135, 0.003),
    frontSurfacePoint(-0.145, 1.075, 0.003),
    frontSurfacePoint(-0.135, 1.015, 0.003),
    frontSurfacePoint(-0.105, 0.955, 0.003),
    frontSurfacePoint(-0.112, 0.895, 0.003),
    frontSurfacePoint(-0.078, 0.835, 0.003),
    frontSurfacePoint(-0.060, 0.770, 0.003),
    frontSurfacePoint(-0.025, 0.705, 0.003),
    frontSurfacePoint(-0.035, 0.640, 0.003),
    frontSurfacePoint(0.000, 0.570, 0.003),
  ];

  const upper_left_widths = [
    0.013, 0.015, 0.013, 0.017, 0.014, 0.019,
    0.015, 0.021, 0.017, 0.023, 0.018, 0.027,
  ];

  const upper_left_crack_channelGeom = createSurfaceRibbon(
    upper_left_path,
    upper_left_widths,
    0.004
  );
  const upper_left_crack_channel = new THREE.Mesh(
    upper_left_crack_channelGeom,
    crack_channelMat
  );
  upper_left_crack_channel.name = "upper_left_crack_channel";
  gold_decoration.add(upper_left_crack_channel);

  const upper_left_crackGeom = createSurfaceRibbon(
    upper_left_path,
    upper_left_widths,
    0.008
  );
  const upper_left_crack = new THREE.Mesh(upper_left_crackGeom, goldMat);
  upper_left_crack.name = "upper_left_crack";
  gold_decoration.add(upper_left_crack);

  const right_crack_path = [
    frontSurfacePoint(0.000, 0.570, 0.003),
    frontSurfacePoint(0.045, 0.525, 0.003),
    frontSurfacePoint(0.095, 0.475, 0.003),
    frontSurfacePoint(0.145, 0.420, 0.003),
    frontSurfacePoint(0.190, 0.355, 0.003),
    frontSurfacePoint(0.225, 0.290, 0.003),
    frontSurfacePoint(0.260, 0.220, 0.003),
    frontSurfacePoint(0.282, 0.145, 0.003),
    frontSurfacePoint(0.300, 0.070, 0.003),
    frontSurfacePoint(0.292, 0.018, 0.003),
  ];

  const right_crack_widths = [
    0.027, 0.025, 0.023, 0.021, 0.019,
    0.017, 0.015, 0.013, 0.010, 0.007,
  ];

  const right_crack_channelGeom = createSurfaceRibbon(
    right_crack_path,
    right_crack_widths,
    0.004
  );
  const right_crack_channel = new THREE.Mesh(
    right_crack_channelGeom,
    crack_channelMat
  );
  right_crack_channel.name = "right_crack_channel";
  gold_decoration.add(right_crack_channel);

  const right_crackGeom = createSurfaceRibbon(
    right_crack_path,
    right_crack_widths,
    0.008
  );
  const right_crack = new THREE.Mesh(right_crackGeom, goldMat);
  right_crack.name = "right_crack";
  gold_decoration.add(right_crack);

  const lower_left_path = [
    frontSurfacePoint(0.000, 0.570, 0.003),
    frontSurfacePoint(-0.045, 0.525, 0.003),
    frontSurfacePoint(-0.080, 0.475, 0.003),
    frontSurfacePoint(-0.110, 0.420, 0.003),
    frontSurfacePoint(-0.135, 0.360, 0.003),
    frontSurfacePoint(-0.145, 0.300, 0.003),
    frontSurfacePoint(-0.175, 0.235, 0.003),
    frontSurfacePoint(-0.165, 0.175, 0.003),
    frontSurfacePoint(-0.205, 0.115, 0.003),
    frontSurfacePoint(-0.215, 0.060, 0.003),
    frontSurfacePoint(-0.205, 0.018, 0.003),
  ];

  const lower_left_widths = [
    0.027, 0.024, 0.022, 0.019, 0.017,
    0.016, 0.015, 0.013, 0.010, 0.008, 0.006,
  ];

  const lower_left_crack_channelGeom = createSurfaceRibbon(
    lower_left_path,
    lower_left_widths,
    0.004
  );
  const lower_left_crack_channel = new THREE.Mesh(
    lower_left_crack_channelGeom,
    crack_channelMat
  );
  lower_left_crack_channel.name = "lower_left_crack_channel";
  gold_decoration.add(lower_left_crack_channel);

  const lower_left_crackGeom = createSurfaceRibbon(
    lower_left_path,
    lower_left_widths,
    0.008
  );
  const lower_left_crack = new THREE.Mesh(lower_left_crackGeom, goldMat);
  lower_left_crack.name = "lower_left_crack";
  gold_decoration.add(lower_left_crack);

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