export default function generate(THREE) {
  const root = new THREE.Group();

  const ballRadius = 0.5;
  const seamOffset = 0.003;
  const seamRotation = new THREE.Euler(0, 0.55, 0.22);

  const ballMat = new THREE.MeshStandardMaterial({
    color: 0xf2ff25,
    metalness: 0.0,
    roughness: 0.95,
  });

  const seam_grooveMat = new THREE.MeshStandardMaterial({
    color: 0xd7e34b,
    metalness: 0.0,
    roughness: 0.95,
  });

  const seam_feltMat = new THREE.MeshStandardMaterial({
    color: 0xf7faa5,
    metalness: 0.0,
    roughness: 0.95,
  });

  const seam_nubsMat = new THREE.MeshStandardMaterial({
    color: 0xf4f77c,
    metalness: 0.0,
    roughness: 0.95,
  });

  const ballGeom = new THREE.SphereGeometry(ballRadius, 64, 40);
  const ball = new THREE.Mesh(ballGeom, ballMat);
  root.add(ball);

  const seam_normals = [];
  const seam_quaternions = [];
  const seam_curve_normals = [];
  const seamCurveSamples = 128;
  const seamPlaneNormal = new THREE.Vector3(0.62, 0.34, 0.71).normalize();

  for (let i = 0; i < seamCurveSamples; i++) {
    const t = i / seamCurveSamples * Math.PI * 2;
    const radial = new THREE.Vector3(Math.cos(t), Math.sin(t), 0);
    const normal = radial
      .clone()
      .addScaledVector(seamPlaneNormal, -radial.dot(seamPlaneNormal))
      .normalize();

    seam_normals.push(normal);
    seam_quaternions.push(
      new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal
      )
    );
    seam_curve_normals.push(normal.clone().applyEuler(seamRotation));
  }

  function createSeamRibbon(width, radius, phase) {
    const positions = [];
    const normals = [];
    const indices = [];

    for (let i = 0; i < seamCurveSamples; i++) {
      const previous = seam_curve_normals[
        (i + seamCurveSamples - 1) % seamCurveSamples
      ];
      const current = seam_curve_normals[i];
      const next = seam_curve_normals[(i + 1) % seamCurveSamples];

      const tangent = next.clone().sub(previous).normalize();
      const side = new THREE.Vector3()
        .crossVectors(current, tangent)
        .normalize();

      const waviness =
        Math.sin(i * 0.31 + phase) * 0.0018 +
        Math.sin(i * 0.83 + phase * 1.7) * 0.0009;
      const centerNormal = current.clone().addScaledVector(side, waviness);
      centerNormal.normalize();

      const left = centerNormal
        .clone()
        .addScaledVector(side, width * 0.5)
        .normalize();
      const right = centerNormal
        .clone()
        .addScaledVector(side, -width * 0.5)
        .normalize();

      positions.push(
        left.x * radius, left.y * radius, left.z * radius,
        right.x * radius, right.y * radius, right.z * radius
      );
      normals.push(
        left.x, left.y, left.z,
        right.x, right.y, right.z
      );
    }

    for (let i = 0; i < seamCurveSamples; i++) {
      const nextIndex = (i + 1) % seamCurveSamples;
      const left = i * 2;
      const right = left + 1;
      const nextLeft = nextIndex * 2;
      const nextRight = nextLeft + 1;

      indices.push(
        left, right, nextLeft,
        right, nextRight, nextLeft
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();
    return geometry;
  }

  const seam_grooveGeom = createSeamRibbon(0.052, ballRadius + 0.001, 0.4);
  const seam_groove = new THREE.Mesh(seam_grooveGeom, seam_grooveMat);
  seam_groove.rotation.copy(seamRotation);
  root.add(seam_groove);

  const seam_feltGeom = createSeamRibbon(0.032, ballRadius + 0.0022, 2.1);
  const seam_felt = new THREE.Mesh(seam_feltGeom, seam_feltMat);
  seam_felt.rotation.copy(seamRotation);
  root.add(seam_felt);

  const surface_fuzzCount = 1400;
  const surface_fuzzGeom = new THREE.CylinderGeometry(
    0.00035,
    0.00075,
    0.0035,
    4,
    1
  );
  const surface_fuzz = new THREE.InstancedMesh(
    surface_fuzzGeom,
    ballMat,
    surface_fuzzCount
  );

  const up = new THREE.Vector3(0, 1, 0);
  const fuzzMatrix = new THREE.Matrix4();
  const goldenAngle = 2.399963229728653;

  for (let i = 0; i < surface_fuzzCount; i++) {
    const y = 1 - 2 * (i + 0.5) / surface_fuzzCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    const normal = new THREE.Vector3(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );

    const position = normal.clone().multiplyScalar(ballRadius + 0.0012);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(up, normal);
    const lengthScale = 0.72 + ((i * 17) % 11) / 28;
    const widthScale = 0.72 + ((i * 7) % 9) / 30;
    const scale = new THREE.Vector3(widthScale, lengthScale, widthScale);

    fuzzMatrix.compose(position, quaternion, scale);
    surface_fuzz.setMatrixAt(i, fuzzMatrix);
  }

  surface_fuzz.instanceMatrix.needsUpdate = true;
  surface_fuzz.frustumCulled = false;
  root.add(surface_fuzz);

  const seam_nubsCount = 180;
  const seam_nubsGeom = new THREE.CylinderGeometry(
    0.00045,
    0.0009,
    0.004,
    4,
    1
  );
  const seam_nubs = new THREE.InstancedMesh(
    seam_nubsGeom,
    seam_nubsMat,
    seam_nubsCount
  );

  const nubMatrix = new THREE.Matrix4();

  for (let i = 0; i < seam_nubsCount; i++) {
    const curveIndex = (i * 7) % seamCurveSamples;
    const normal = seam_curve_normals[curveIndex];
    const tangent = seam_curve_normals[
      (curveIndex + 1) % seamCurveSamples
    ].clone()
      .sub(seam_curve_normals[(curveIndex + seamCurveSamples - 1) % seamCurveSamples])
      .normalize();
    const side = new THREE.Vector3()
      .crossVectors(normal, tangent)
      .normalize();

    const lateral = ((i * 13) % 29 - 14) / 14 * 0.021;
    const surfaceNormal = normal
      .clone()
      .addScaledVector(side, lateral)
      .normalize();
    const position = surfaceNormal
      .clone()
      .multiplyScalar(ballRadius + 0.0025);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up,
      surfaceNormal
    );
    const lengthScale = 0.75 + ((i * 5) % 13) / 24;
    const scale = new THREE.Vector3(1, lengthScale, 1);

    nubMatrix.compose(position, quaternion, scale);
    seam_nubs.setMatrixAt(i, nubMatrix);
  }

  seam_nubs.instanceMatrix.needsUpdate = true;
  seam_nubs.frustumCulled = false;
  root.add(seam_nubs);

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