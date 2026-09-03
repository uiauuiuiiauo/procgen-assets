export default function generate(THREE) {
  const teapot = new THREE.Group();
  teapot.name = "teapot";

  const ceramicMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.4,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x756c5d,
    metalness: 0.0,
    roughness: 0.8,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x554f45,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  function createTaperedTubeGeometry(curve, tubularSegments, radialSegments, radiusAt) {
    const positions = [];
    const indices = [];
    const reference = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const center = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const basis1 = new THREE.Vector3().crossVectors(reference, tangent);

      if (basis1.lengthSq() < 0.000001) {
        basis1.crossVectors(new THREE.Vector3(1, 0, 0), tangent);
      }
      basis1.normalize();

      const basis2 = new THREE.Vector3()
        .crossVectors(tangent, basis1)
        .normalize();
      const radius = radiusAt(t);

      for (let j = 0; j < radialSegments; j++) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const radial = basis1
          .clone()
          .multiplyScalar(Math.cos(angle))
          .addScaledVector(basis2, Math.sin(angle));

        positions.push(
          center.x + radial.x * radius,
          center.y + radial.y * radius,
          center.z + radial.z * radius
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + nextJ;
        const d = i * radialSegments + nextJ;
        indices.push(a, d, b, b, d, c);
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

  function createLegGeometry(height, topRadius, bottomRadius) {
    const profile = [
      new THREE.Vector2(0, -height / 2),
      new THREE.Vector2(bottomRadius * 0.78, -height / 2),
      new THREE.Vector2(bottomRadius, -height / 2 + 0.025),
      new THREE.Vector2(bottomRadius * 1.04, -height / 2 + 0.075),
      new THREE.Vector2(bottomRadius * 1.12, -height * 0.12),
      new THREE.Vector2(topRadius * 0.82, height * 0.16),
      new THREE.Vector2(topRadius, height * 0.40),
      new THREE.Vector2(topRadius * 0.96, height / 2),
      new THREE.Vector2(0, height / 2),
    ];
    return new THREE.LatheGeometry(profile, 24);
  }

  function createFrustumBetween(
    start,
    end,
    startRadius,
    endRadius,
    material
  ) {
    const direction = end.clone().sub(start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(
      endRadius,
      startRadius,
      length,
      24,
      1,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  const legsGeom = createLegGeometry(0.48, 0.17, 0.09);
  const legs = new THREE.InstancedMesh(legsGeom, ceramicMat, 4);
  legs.name = "legs";
  const legPositions = [
    [-0.28, 0.24, 0.28],
    [0.28, 0.24, 0.28],
    [-0.28, 0.24, -0.25],
    [0.28, 0.24, -0.25],
  ];
  const legTransform = new THREE.Object3D();

  for (let i = 0; i < legPositions.length; i++) {
    const position = legPositions[i];
    legTransform.position.set(position[0], position[1], position[2]);
    legTransform.rotation.set(0, 0, 0);
    legTransform.scale.set(1, 1, 1);
    legTransform.updateMatrix();
    legs.setMatrixAt(i, legTransform.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  teapot.add(legs);

  const bodyProfile = [
    new THREE.Vector2(0, 0.27),
    new THREE.Vector2(0.27, 0.27),
    new THREE.Vector2(0.40, 0.31),
    new THREE.Vector2(0.53, 0.40),
    new THREE.Vector2(0.64, 0.55),
    new THREE.Vector2(0.70, 0.72),
    new THREE.Vector2(0.72, 0.91),
    new THREE.Vector2(0.70, 1.10),
    new THREE.Vector2(0.65, 1.28),
    new THREE.Vector2(0.57, 1.42),
    new THREE.Vector2(0.49, 1.51),
    new THREE.Vector2(0.47, 1.58),
    new THREE.Vector2(0.47, 1.61),
    new THREE.Vector2(0, 1.61),
  ];
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const body = new THREE.Mesh(bodyGeom, ceramicMat);
  body.name = "body";
  teapot.add(body);

  const neck_rimGeom = new THREE.TorusGeometry(0.465, 0.024, 12, 64);
  const neck_rim = new THREE.Mesh(neck_rimGeom, ceramicMat);
  neck_rim.name = "neck_rim";
  neck_rim.rotation.x = Math.PI / 2;
  neck_rim.position.y = 1.605;
  teapot.add(neck_rim);

  const lid_seamGeom = new THREE.TorusGeometry(0.463, 0.009, 8, 64);
  const lid_seam = new THREE.Mesh(lid_seamGeom, seamMat);
  lid_seam.name = "lid_seam";
  lid_seam.rotation.x = Math.PI / 2;
  lid_seam.position.y = 1.625;
  teapot.add(lid_seam);

  const lidProfile = [
    new THREE.Vector2(0, 1.615),
    new THREE.Vector2(0.43, 1.615),
    new THREE.Vector2(0.49, 1.625),
    new THREE.Vector2(0.515, 1.65),
    new THREE.Vector2(0.50, 1.685),
    new THREE.Vector2(0.44, 1.72),
    new THREE.Vector2(0.35, 1.77),
    new THREE.Vector2(0.24, 1.81),
    new THREE.Vector2(0.12, 1.84),
    new THREE.Vector2(0, 1.845),
  ];
  const lidGeom = new THREE.LatheGeometry(lidProfile, 64);
  const lid = new THREE.Mesh(lidGeom, ceramicMat);
  lid.name = "lid";
  teapot.add(lid);

  const lid_knobProfile = [
    new THREE.Vector2(0, 1.82),
    new THREE.Vector2(0.09, 1.82),
    new THREE.Vector2(0.105, 1.86),
    new THREE.Vector2(0.10, 1.92),
    new THREE.Vector2(0.145, 1.96),
    new THREE.Vector2(0.17, 2.03),
    new THREE.Vector2(0.16, 2.10),
    new THREE.Vector2(0.115, 2.15),
    new THREE.Vector2(0, 2.16),
  ];
  const lid_knobGeom = new THREE.LatheGeometry(lid_knobProfile, 40);
  const lid_knob = new THREE.Mesh(lid_knobGeom, ceramicMat);
  lid_knob.name = "lid_knob";
  teapot.add(lid_knob);

  const handlePath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.50, 1.36, -0.08),
      new THREE.Vector3(0.66, 1.42, -0.08),
      new THREE.Vector3(0.82, 1.58, -0.08),
      new THREE.Vector3(1.04, 1.64, -0.08),
      new THREE.Vector3(1.23, 1.56, -0.08),
      new THREE.Vector3(1.31, 1.34, -0.08),
      new THREE.Vector3(1.30, 1.08, -0.08),
      new THREE.Vector3(1.18, 0.84, -0.08),
      new THREE.Vector3(0.96, 0.64, -0.08),
      new THREE.Vector3(0.69, 0.50, -0.08),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handlePath,
    64,
    0.085,
    16,
    false
  );
  const handle = new THREE.Mesh(handleGeom, ceramicMat);
  handle.name = "handle";
  teapot.add(handle);

  const handle_upper_mount = createFrustumBetween(
    new THREE.Vector3(0.48, 1.34, -0.07),
    new THREE.Vector3(0.69, 1.44, -0.08),
    0.145,
    0.09,
    ceramicMat
  );
  handle_upper_mount.name = "handle_upper_mount";
  teapot.add(handle_upper_mount);

  const handle_lower_mount = createFrustumBetween(
    new THREE.Vector3(0.49, 0.52, -0.07),
    new THREE.Vector3(0.72, 0.50, -0.08),
    0.15,
    0.09,
    ceramicMat
  );
  handle_lower_mount.name = "handle_lower_mount";
  teapot.add(handle_lower_mount);

  const spoutPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.50, 1.05, 0.00),
      new THREE.Vector3(-0.68, 1.04, 0.01),
      new THREE.Vector3(-0.82, 1.15, 0.03),
      new THREE.Vector3(-0.91, 1.35, 0.06),
      new THREE.Vector3(-1.00, 1.53, 0.10),
      new THREE.Vector3(-1.13, 1.63, 0.15),
      new THREE.Vector3(-1.25, 1.61, 0.21),
    ],
    false,
    "centripetal"
  );

  function spoutRadiusAt(t) {
    if (t < 0.72) {
      return 0.22 + (0.105 - 0.22) * (t / 0.72);
    }
    return 0.105 + (0.145 - 0.105) * ((t - 0.72) / 0.28);
  }

  const spoutGeom = createTaperedTubeGeometry(
    spoutPath,
    48,
    20,
    spoutRadiusAt
  );
  const spout = new THREE.Mesh(spoutGeom, ceramicMat);
  spout.name = "spout";
  teapot.add(spout);

  const spoutTip = spoutPath.getPoint(1);
  const spoutDirection = spoutPath.getTangent(1).normalize();
  const spoutOrientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutDirection
  );

  const spout_openingGeom = new THREE.CircleGeometry(0.112, 32);
  const spout_opening = new THREE.Mesh(spout_openingGeom, openingMat);
  spout_opening.name = "spout_opening";
  spout_opening.quaternion.copy(spoutOrientation);
  spout_opening.position
    .copy(spoutTip)
    .addScaledVector(spoutDirection, 0.009);
  teapot.add(spout_opening);

  const spout_lipGeom = new THREE.TorusGeometry(0.126, 0.019, 12, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, ceramicMat);
  spout_lip.name = "spout_lip";
  spout_lip.quaternion.copy(spoutOrientation);
  spout_lip.position
    .copy(spoutTip)
    .addScaledVector(spoutDirection, 0.011);
  teapot.add(spout_lip);

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

  fitToUnitCube(THREE, teapot);
  return teapot;
}