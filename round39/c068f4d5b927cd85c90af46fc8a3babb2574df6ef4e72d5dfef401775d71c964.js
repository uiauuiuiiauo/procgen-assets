export default function generate(THREE) {
  const apple = new THREE.Group();
  apple.name = "apple";

  const apple_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffdf24,
    metalness: 0.0,
    roughness: 0.3,
  });

  const stem_haloMat = new THREE.MeshStandardMaterial({
    color: 0x7b8e28,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const stem_cavityMat = new THREE.MeshStandardMaterial({
    color: 0x405116,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });

  const stem_remnantMat = new THREE.MeshStandardMaterial({
    color: 0x4b2b14,
    metalness: 0.0,
    roughness: 0.9,
  });

  const stem_knobsMat = new THREE.MeshStandardMaterial({
    color: 0x63371b,
    metalness: 0.0,
    roughness: 0.9,
  });

  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xb88413,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const bodyProfile = new THREE.SplineCurve([
    new THREE.Vector2(0.000, -0.470),
    new THREE.Vector2(0.080, -0.470),
    new THREE.Vector2(0.220, -0.430),
    new THREE.Vector2(0.380, -0.320),
    new THREE.Vector2(0.480, -0.120),
    new THREE.Vector2(0.490, 0.080),
    new THREE.Vector2(0.460, 0.250),
    new THREE.Vector2(0.370, 0.380),
    new THREE.Vector2(0.260, 0.440),
    new THREE.Vector2(0.160, 0.430),
    new THREE.Vector2(0.090, 0.370),
    new THREE.Vector2(0.045, 0.300),
    new THREE.Vector2(0.000, 0.270),
  ]).getSpacedPoints(56);

  const apple_bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const bodyPosition = apple_bodyGeom.attributes.position;

  for (let i = 0; i < bodyPosition.count; i++) {
    const x = bodyPosition.getX(i);
    const y = bodyPosition.getY(i);
    const z = bodyPosition.getZ(i);
    const radius = Math.sqrt(x * x + z * z);

    if (radius > 0.00001) {
      const angle = Math.atan2(z, x);
      const upperWeight = Math.max(0, Math.min(1, (y + 0.15) / 0.58));
      const lobeWave = Math.cos(angle * 5 + 0.35);
      const broadAsymmetry = Math.cos(angle - 0.45);
      const radialFactor =
        1 +
        0.026 * lobeWave * upperWeight +
        0.014 * broadAsymmetry * (0.45 + 0.55 * upperWeight);

      bodyPosition.setXYZ(i, x * radialFactor, y, z * radialFactor);
    }
  }

  bodyPosition.needsUpdate = true;
  apple_bodyGeom.computeVertexNormals();
  apple_bodyGeom.computeBoundingBox();
  apple_bodyGeom.computeBoundingSphere();

  const apple_body = new THREE.Mesh(apple_bodyGeom, apple_bodyMat);
  apple_body.name = "apple_body";
  apple_body.scale.set(1.02, 1.0, 0.98);
  apple.add(apple_body);

  function profileDataAt(y) {
    for (let i = 0; i < bodyProfile.length - 1; i++) {
      const a = bodyProfile[i];
      const b = bodyProfile[i + 1];

      if (y >= a.y && y <= b.y) {
        const span = b.y - a.y;
        const t = span === 0 ? 0 : (y - a.y) / span;
        return {
          radius: a.x + (b.x - a.x) * t,
          slope: span === 0 ? 0 : (b.x - a.x) / span,
        };
      }
    }

    return {
      radius: y < bodyProfile[0].y ? bodyProfile[0].x : bodyProfile[bodyProfile.length - 1].x,
      slope: 0,
    };
  }

  function surfacePose(angle, y, extra) {
    const data = profileDataAt(y);
    const upperWeight = Math.max(0, Math.min(1, (y + 0.15) / 0.58));
    const lobeWave = Math.cos(angle * 5 + 0.35);
    const broadAsymmetry = Math.cos(angle - 0.45);
    const radialFactor =
      1 +
      0.026 * lobeWave * upperWeight +
      0.014 * broadAsymmetry * (0.45 + 0.55 * upperWeight);

    const radius = data.radius * radialFactor;
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const normal = new THREE.Vector3(
      cosAngle / 1.02,
      -data.slope,
      sinAngle / 0.98
    ).normalize();

    const position = new THREE.Vector3(
      cosAngle * radius * 1.02,
      y,
      sinAngle * radius * 0.98
    ).addScaledVector(normal, extra);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );

    return { position, quaternion };
  }

  const stem_haloGeom = new THREE.RingGeometry(0.032, 0.108, 48);
  const stem_halo = new THREE.Mesh(stem_haloGeom, stem_haloMat);
  stem_halo.name = "stem_halo";
  stem_halo.rotation.x = Math.PI / 2 + 0.24;
  stem_halo.position.set(0, 0.323, 0.018);
  apple.add(stem_halo);

  const stem_cavityGeom = new THREE.CircleGeometry(0.046, 32);
  const stem_cavity = new THREE.Mesh(stem_cavityGeom, stem_cavityMat);
  stem_cavity.name = "stem_cavity";
  stem_cavity.rotation.x = Math.PI / 2 + 0.24;
  stem_cavity.position.set(0, 0.326, 0.018);
  apple.add(stem_cavity);

  const stem_remnantGeom = new THREE.CylinderGeometry(0.010, 0.022, 0.060, 7, 2);
  const stem_remnant = new THREE.Mesh(stem_remnantGeom, stem_remnantMat);
  stem_remnant.name = "stem_remnant";
  stem_remnant.position.set(0.004, 0.347, 0.018);
  stem_remnant.rotation.set(0.12, 0.15, -0.18);
  apple.add(stem_remnant);

  const stem_tipGeom = new THREE.DodecahedronGeometry(0.014, 0);
  const stem_tip = new THREE.Mesh(stem_tipGeom, stem_knobsMat);
  stem_tip.name = "stem_tip";
  stem_tip.position.set(0.010, 0.378, 0.016);
  stem_tip.scale.set(1.0, 0.72, 0.85);
  apple.add(stem_tip);

  const stem_knobsGeom = new THREE.DodecahedronGeometry(0.010, 0);
  const stem_knobs = new THREE.InstancedMesh(stem_knobsGeom, stem_knobsMat, 4);
  stem_knobs.name = "stem_knobs";

  const knobTransform = new THREE.Object3D();
  const knobPositions = [
    [-0.008, 0.334, 0.027],
    [0.014, 0.340, 0.013],
    [0.002, 0.354, 0.007],
    [0.018, 0.362, 0.022],
  ];

  for (let i = 0; i < knobPositions.length; i++) {
    const p = knobPositions[i];
    knobTransform.position.set(p[0], p[1], p[2]);
    knobTransform.rotation.set(i * 0.37, i * 0.61, i * 0.29);
    knobTransform.scale.set(1.0 + i * 0.08, 0.75 + (i % 2) * 0.2, 0.9);
    knobTransform.updateMatrix();
    stem_knobs.setMatrixAt(i, knobTransform.matrix);
  }

  stem_knobs.instanceMatrix.needsUpdate = true;
  apple.add(stem_knobs);

  const skin_specklesGeom = new THREE.CircleGeometry(1, 8);
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    34
  );
  skin_speckles.name = "skin_speckles";

  const speckleTransform = new THREE.Object3D();

  for (let i = 0; i < 34; i++) {
    const angle = 0.18 + (((i * 13) % 37) / 36) * 2.78;
    const y = -0.35 + (((i * 17) % 41) / 40) * 0.59;
    const pose = surfacePose(angle, y, 0.004);
    const size = 0.0024 + ((i * 5) % 7) * 0.00042;

    speckleTransform.position.copy(pose.position);
    speckleTransform.quaternion.copy(pose.quaternion);
    speckleTransform.scale.set(size, size * (0.65 + (i % 3) * 0.12), 1);
    speckleTransform.updateMatrix();
    skin_speckles.setMatrixAt(i, speckleTransform.matrix);
  }

  skin_speckles.instanceMatrix.needsUpdate = true;
  apple.add(skin_speckles);

  fitToUnitCube(THREE, apple);
  return apple;
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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}