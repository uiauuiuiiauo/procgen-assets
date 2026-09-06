export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x914b34,
    metalness: 0.0,
    roughness: 0.4,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x4f251b,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const throwing_ringMat = new THREE.MeshStandardMaterial({
    color: 0x7d3d2b,
    metalness: 0.0,
    roughness: 0.4,
  });
  const dark_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x352823,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const light_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xc18465,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const bodyProfile = [
    new THREE.Vector2(0.00, 0.03),
    new THREE.Vector2(0.34, 0.03),
    new THREE.Vector2(0.40, 0.06),
    new THREE.Vector2(0.43, 0.10),
    new THREE.Vector2(0.50, 0.16),
    new THREE.Vector2(0.56, 0.27),
    new THREE.Vector2(0.60, 0.41),
    new THREE.Vector2(0.61, 0.56),
    new THREE.Vector2(0.60, 0.70),
    new THREE.Vector2(0.56, 0.84),
    new THREE.Vector2(0.49, 0.96),
    new THREE.Vector2(0.43, 1.04),
    new THREE.Vector2(0.40, 1.10),
    new THREE.Vector2(0.40, 1.15),
    new THREE.Vector2(0.43, 1.18),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  root.add(body);

  const base_footGeom = new THREE.CylinderGeometry(0.39, 0.37, 0.055, 48);
  const base_foot = new THREE.Mesh(base_footGeom, bodyMat);
  base_foot.position.y = 0.035;
  root.add(base_foot);

  const base_ringGeom = new THREE.TorusGeometry(0.365, 0.027, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, throwing_ringMat);
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.052;
  root.add(base_ring);

  const rimGeom = new THREE.TorusGeometry(0.425, 0.055, 16, 64);
  const rim = new THREE.Mesh(rimGeom, bodyMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 1.195;
  root.add(rim);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.372,
    0.35,
    0.14,
    48,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, interiorMat);
  inner_wall.position.y = 1.12;
  root.add(inner_wall);

  const inner_cavityGeom = new THREE.CircleGeometry(0.35, 48);
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, interiorMat);
  inner_cavity.rotation.x = -Math.PI / 2;
  inner_cavity.position.y = 1.048;
  root.add(inner_cavity);

  const throwing_ringGeom = new THREE.TorusGeometry(0.586, 0.006, 6, 64);
  const throwing_ring = new THREE.Mesh(throwing_ringGeom, throwing_ringMat);
  throwing_ring.rotation.x = Math.PI / 2;
  throwing_ring.position.y = 0.69;
  root.add(throwing_ring);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.39, 1.08, -0.08),
      new THREE.Vector3(0.54, 1.17, -0.08),
      new THREE.Vector3(0.70, 1.27, -0.08),
      new THREE.Vector3(0.88, 1.25, -0.08),
      new THREE.Vector3(1.01, 1.11, -0.08),
      new THREE.Vector3(1.06, 0.91, -0.08),
      new THREE.Vector3(1.02, 0.70, -0.08),
      new THREE.Vector3(0.90, 0.52, -0.08),
      new THREE.Vector3(0.75, 0.38, -0.08),
      new THREE.Vector3(0.62, 0.31, -0.08),
      new THREE.Vector3(0.55, 0.42, -0.08),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(handlePath, 72, 0.073, 14, false);
  const handle = new THREE.Mesh(handleGeom, bodyMat);
  root.add(handle);

  const handle_upper_mountGeom = new THREE.SphereGeometry(1, 24, 16);
  const handle_upper_mount = new THREE.Mesh(handle_upper_mountGeom, bodyMat);
  handle_upper_mount.position.set(0.43, 1.075, -0.065);
  handle_upper_mount.scale.set(0.14, 0.105, 0.115);
  root.add(handle_upper_mount);

  const handle_lower_mountGeom = new THREE.SphereGeometry(1, 24, 16);
  const handle_lower_mount = new THREE.Mesh(handle_lower_mountGeom, bodyMat);
  handle_lower_mount.position.set(0.55, 0.42, -0.065);
  handle_lower_mount.scale.set(0.13, 0.15, 0.12);
  root.add(handle_lower_mount);

  const spoutPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.48, 0.55, 0.00),
      new THREE.Vector3(-0.62, 0.59, 0.00),
      new THREE.Vector3(-0.72, 0.72, 0.01),
      new THREE.Vector3(-0.78, 0.90, 0.03),
      new THREE.Vector3(-0.88, 1.07, 0.08),
      new THREE.Vector3(-1.00, 1.17, 0.14),
      new THREE.Vector3(-1.09, 1.18, 0.18),
    ],
    false,
    "centripetal"
  );

  function createTaperedTubeGeometry(
    curve,
    tubularSegments,
    radialSegments,
    startRadius,
    endRadius
  ) {
    const vertices = [];
    const indices = [];
    const frames = curve.computeFrenetFrames(tubularSegments, false);

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const point = curve.getPointAt(t);
      const radius = startRadius + (endRadius - startRadius) * t;
      const normal = frames.normals[i];
      const binormal = frames.binormals[i];

      for (let j = 0; j < radialSegments; j++) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        vertices.push(
          point.x + radius * (normal.x * cos + binormal.x * sin),
          point.y + radius * (normal.y * cos + binormal.y * sin),
          point.z + radius * (normal.z * cos + binormal.z * sin)
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const next = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + next;
        const d = i * radialSegments + next;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const spoutGeom = createTaperedTubeGeometry(spoutPath, 48, 18, 0.17, 0.09);
  const spout = new THREE.Mesh(spoutGeom, bodyMat);
  root.add(spout);

  const spoutTip = spoutPath.getPointAt(1);
  const spoutTangent = spoutPath.getTangentAt(1).normalize();
  const spoutOrientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutTangent
  );

  const spout_lipGeom = new THREE.TorusGeometry(0.078, 0.017, 10, 36);
  const spout_lip = new THREE.Mesh(spout_lipGeom, bodyMat);
  spout_lip.position.copy(spoutTip);
  spout_lip.quaternion.copy(spoutOrientation);
  root.add(spout_lip);

  const spout_openingGeom = new THREE.CircleGeometry(0.077, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, interiorMat);
  spout_opening.position
    .copy(spoutTip)
    .addScaledVector(spoutTangent, -0.006);
  spout_opening.quaternion.copy(spoutOrientation);
  root.add(spout_opening);

  function bodyRadiusAt(y) {
    if (y < 0.16) return 0.43 + (y - 0.10) * 1.15;
    if (y < 0.40) return 0.50 + (y - 0.16) * 0.42;
    if (y < 0.65) return 0.60 + (y - 0.40) * 0.04;
    if (y < 0.84) return 0.61 - (y - 0.65) * 0.26;
    if (y < 1.00) return 0.56 - (y - 0.84) * 0.55;
    return 0.47 - (y - 1.00) * 0.60;
  }

  function createSpeckles(count, seed, material) {
    const speckleGeom = new THREE.CircleGeometry(1, 8);
    const speckles = new THREE.InstancedMesh(speckleGeom, material, count);
    const dummy = new THREE.Object3D();
    const outward = new THREE.Vector3();
    const orientation = new THREE.Quaternion();

    for (let i = 0; i < count; i++) {
      const u = ((i * 37 + seed * 13) % 101) / 100;
      const v = ((i * 61 + seed * 17) % 103) / 102;
      const angle = 0.20 + u * 2.74;
      const y = 0.14 + v * 0.88;
      const radius = bodyRadiusAt(y) + 0.006;
      const size = 0.0035 + (((i * 19 + seed * 7) % 11) / 10) * 0.0045;

      outward.set(Math.cos(angle), 0, Math.sin(angle)).normalize();
      orientation.setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward);

      dummy.position.set(outward.x * radius, y, outward.z * radius);
      dummy.quaternion.copy(orientation);
      dummy.scale.set(size, size * (0.65 + (i % 4) * 0.1), 1);
      dummy.updateMatrix();
      speckles.setMatrixAt(i, dummy.matrix);
    }

    speckles.instanceMatrix.needsUpdate = true;
    return speckles;
  }

  const dark_speckles = createSpeckles(24, 2, dark_specklesMat);
  root.add(dark_speckles);

  const light_speckles = createSpeckles(18, 5, light_specklesMat);
  root.add(light_speckles);

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