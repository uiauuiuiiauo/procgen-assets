export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "terracotta_pot";

  const pot = new THREE.Group();
  pot.name = "pot";
  root.add(pot);

  const pot_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb95d45,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x64271c,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const crackMat = new THREE.MeshStandardMaterial({
    color: 0x29120e,
    metalness: 0.0,
    roughness: 0.95,
  });

  const dark_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x613329,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const pale_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xd79a82,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });

  const pot_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.270, 0.000),
    new THREE.Vector2(0.305, 0.008),
    new THREE.Vector2(0.330, 0.030),
    new THREE.Vector2(0.350, 0.080),
    new THREE.Vector2(0.385, 0.160),
    new THREE.Vector2(0.430, 0.270),
    new THREE.Vector2(0.475, 0.400),
    new THREE.Vector2(0.510, 0.540),
    new THREE.Vector2(0.525, 0.660),
    new THREE.Vector2(0.520, 0.760),
    new THREE.Vector2(0.500, 0.850),
    new THREE.Vector2(0.465, 0.930),
    new THREE.Vector2(0.420, 1.000),
    new THREE.Vector2(0.380, 1.050),
    new THREE.Vector2(0.365, 1.090),
    new THREE.Vector2(0.365, 1.120),
    new THREE.Vector2(0.385, 1.145),
    new THREE.Vector2(0.420, 1.158),
    new THREE.Vector2(0.445, 1.180),
    new THREE.Vector2(0.450, 1.205),
    new THREE.Vector2(0.435, 1.230),
    new THREE.Vector2(0.400, 1.247),
    new THREE.Vector2(0.350, 1.252),
    new THREE.Vector2(0.320, 1.242),
    new THREE.Vector2(0.305, 1.220),
    new THREE.Vector2(0.300, 1.190),
    new THREE.Vector2(0.305, 1.150),
    new THREE.Vector2(0.310, 1.100),
    new THREE.Vector2(0.315, 1.050),
    new THREE.Vector2(0.330, 0.990),
    new THREE.Vector2(0.350, 0.930),
    new THREE.Vector2(0.370, 0.870),
    new THREE.Vector2(0.000, 0.840),
  ];
  const pot_bodyGeom = new THREE.LatheGeometry(pot_bodyProfile, 64);
  const pot_body = new THREE.Mesh(pot_bodyGeom, pot_bodyMat);
  pot_body.name = "pot_body";
  pot.add(pot_body);

  const inner_cavityProfile = [
    new THREE.Vector2(0.000, 0.848),
    new THREE.Vector2(0.180, 0.855),
    new THREE.Vector2(0.285, 0.875),
    new THREE.Vector2(0.335, 0.930),
    new THREE.Vector2(0.325, 0.990),
    new THREE.Vector2(0.310, 1.050),
    new THREE.Vector2(0.305, 1.110),
    new THREE.Vector2(0.300, 1.160),
    new THREE.Vector2(0.298, 1.185),
  ];
  const inner_cavityGeom = new THREE.LatheGeometry(inner_cavityProfile, 64);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  inner_cavity.name = "inner_cavity";
  pot.add(inner_cavity);

  const inner_lip_shadowGeom = new THREE.TorusGeometry(0.302, 0.006, 8, 64);
  const inner_lip_shadow = new THREE.Mesh(inner_lip_shadowGeom, inner_cavityMat);
  inner_lip_shadow.name = "inner_lip_shadow";
  inner_lip_shadow.rotation.x = Math.PI / 2;
  inner_lip_shadow.position.y = 1.187;
  pot.add(inner_lip_shadow);

  const radius_samples = [
    [0.00, 0.270],
    [0.08, 0.350],
    [0.16, 0.385],
    [0.27, 0.430],
    [0.40, 0.475],
    [0.54, 0.510],
    [0.66, 0.525],
    [0.76, 0.520],
    [0.85, 0.500],
    [0.93, 0.465],
    [1.00, 0.420],
    [1.05, 0.380],
    [1.09, 0.365],
    [1.12, 0.365],
    [1.15, 0.420],
    [1.18, 0.445],
    [1.205, 0.450],
    [1.23, 0.435],
    [1.25, 0.350],
  ];

  function potRadiusAt(y) {
    if (y <= radius_samples[0][0]) return radius_samples[0][1];
    for (let i = 1; i < radius_samples.length; i++) {
      const previous = radius_samples[i - 1];
      const current = radius_samples[i];
      if (y <= current[0]) {
        const t = (y - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return radius_samples[radius_samples.length - 1][1];
  }

  function surfacePoint(angle, y, offset) {
    const radius = potRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function createSurfaceCrack(samples, radius) {
    const points = [];
    for (let i = 0; i < samples.length; i++) {
      points.push(surfacePoint(samples[i][0], samples[i][1], 0.004));
    }
    const path = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(
      path,
      Math.max(8, (points.length - 1) * 6),
      radius,
      6,
      false
    );
    return new THREE.Mesh(geometry, crackMat);
  }

  const front_rim_crack = createSurfaceCrack([
    [1.58, 1.250],
    [1.56, 1.225],
    [1.60, 1.200],
    [1.57, 1.172],
    [1.61, 1.145],
    [1.58, 1.118],
    [1.62, 1.090],
  ], 0.0035);
  front_rim_crack.name = "front_rim_crack";
  pot.add(front_rim_crack);

  const front_crack_branch = createSurfaceCrack([
    [1.59, 1.174],
    [1.50, 1.188],
    [1.42, 1.207],
    [1.34, 1.230],
  ], 0.0024);
  front_crack_branch.name = "front_crack_branch";
  pot.add(front_crack_branch);

  const right_rim_crack = createSurfaceCrack([
    [0.62, 1.247],
    [0.68, 1.224],
    [0.65, 1.201],
    [0.72, 1.177],
    [0.70, 1.151],
    [0.77, 1.128],
  ], 0.0032);
  right_rim_crack.name = "right_rim_crack";
  pot.add(right_rim_crack);

  const left_rim_crack = createSurfaceCrack([
    [2.47, 1.247],
    [2.40, 1.226],
    [2.44, 1.204],
    [2.37, 1.180],
    [2.34, 1.154],
    [2.27, 1.136],
  ], 0.0031);
  left_rim_crack.name = "left_rim_crack";
  pot.add(left_rim_crack);

  const rear_rim_crack = createSurfaceCrack([
    [-1.30, 1.250],
    [-1.32, 1.226],
    [-1.28, 1.202],
    [-1.34, 1.178],
    [-1.31, 1.151],
    [-1.36, 1.128],
  ], 0.0028);
  rear_rim_crack.name = "rear_rim_crack";
  pot.add(rear_rim_crack);

  const lower_front_crack = createSurfaceCrack([
    [1.18, 0.455],
    [1.15, 0.430],
    [1.19, 0.405],
    [1.16, 0.378],
  ], 0.0018);
  lower_front_crack.name = "lower_front_crack";
  pot.add(lower_front_crack);

  const speckleGeom = new THREE.CircleGeometry(1, 8);
  const dark_speckles = new THREE.InstancedMesh(
    speckleGeom,
    dark_specklesMat,
    24
  );
  dark_speckles.name = "dark_speckles";

  const pale_speckles = new THREE.InstancedMesh(
    speckleGeom,
    pale_specklesMat,
    16
  );
  pale_speckles.name = "pale_speckles";

  function placeSpeckles(mesh, count, indexOffset, sizeFactor) {
    const dummy = new THREE.Object3D();
    const outward = new THREE.Vector3();
    const forward = new THREE.Vector3(0, 0, 1);
    const quaternion = new THREE.Quaternion();

    for (let i = 0; i < count; i++) {
      const n = i + indexOffset;
      const angle = (n * 2.399963229728653) % (Math.PI * 2);
      const y = 0.10 + (((n * 7) % 31) / 30) * 0.92;
      const position = surfacePoint(angle, y, 0.005);
      const size = sizeFactor * (0.0022 + (n % 4) * 0.00065);

      outward.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
      quaternion.setFromUnitVectors(forward, outward);

      dummy.position.copy(position);
      dummy.quaternion.copy(quaternion);
      dummy.scale.set(size, size * (0.75 + (n % 3) * 0.12), 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  placeSpeckles(dark_speckles, 24, 0, 1.0);
  placeSpeckles(pale_speckles, 16, 37, 0.85);
  pot.add(dark_speckles, pale_speckles);

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