export default function generate(THREE) {
  const root = new THREE.Group();

  const apple_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa91632,
    metalness: 0.0,
    roughness: 0.3
  });

  const stem_wellMat = new THREE.MeshStandardMaterial({
    color: 0x570916,
    metalness: 0.0,
    roughness: 0.7
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x5a351c,
    metalness: 0.0,
    roughness: 0.9
  });

  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xf0bd91,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const apple_profileCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.000, -0.490),
    new THREE.Vector2(0.080, -0.492),
    new THREE.Vector2(0.200, -0.470),
    new THREE.Vector2(0.330, -0.405),
    new THREE.Vector2(0.420, -0.300),
    new THREE.Vector2(0.475, -0.160),
    new THREE.Vector2(0.495,  0.000),
    new THREE.Vector2(0.485,  0.160),
    new THREE.Vector2(0.450,  0.300),
    new THREE.Vector2(0.370,  0.410),
    new THREE.Vector2(0.270,  0.470),
    new THREE.Vector2(0.170,  0.490),
    new THREE.Vector2(0.090,  0.475),
    new THREE.Vector2(0.045,  0.438),
    new THREE.Vector2(0.000,  0.415)
  ]);

  const apple_profile = apple_profileCurve.getSpacedPoints(64);
  const apple_bodyGeom = new THREE.LatheGeometry(apple_profile, 64);
  const apple_positions = apple_bodyGeom.attributes.position;

  for (let i = 0; i < apple_positions.count; i++) {
    let x = apple_positions.getX(i);
    let y = apple_positions.getY(i);
    let z = apple_positions.getZ(i);
    const radius = Math.sqrt(x * x + z * z);

    if (radius > 0.0001) {
      const angle = Math.atan2(z, x);
      const top_weight = Math.max(0, Math.min(1, (y - 0.27) / 0.22));
      const lobe_scale =
        1 + 0.012 * Math.cos(angle * 5 + 0.35) * top_weight;
      x *= lobe_scale;
      z *= lobe_scale;

      if (y > 0.34) {
        y += 0.006 * Math.cos(angle * 5 + 0.35) * top_weight;
      }
    }

    apple_positions.setXYZ(i, x, y, z);
  }

  apple_positions.needsUpdate = true;
  apple_bodyGeom.computeVertexNormals();

  const apple_body = new THREE.Mesh(apple_bodyGeom, apple_bodyMat);
  root.add(apple_body);

  const stem_wellGeom = new THREE.TorusGeometry(0.047, 0.008, 8, 32);
  const stem_well = new THREE.Mesh(stem_wellGeom, stem_wellMat);
  stem_well.rotation.x = Math.PI / 2;
  stem_well.position.set(-0.004, 0.426, 0.002);
  root.add(stem_well);

  const stemGeom = new THREE.CylinderGeometry(0.011, 0.017, 0.064, 9);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.position.set(-0.012, 0.454, 0.004);
  stem.rotation.x = -0.12;
  stem.rotation.z = 0.18;
  root.add(stem);

  const stem_tipGeom = new THREE.SphereGeometry(0.012, 10, 6);
  const stem_tip = new THREE.Mesh(stem_tipGeom, stemMat);
  stem_tip.scale.set(0.9, 0.55, 0.9);
  stem_tip.position.set(-0.017, 0.485, 0.008);
  root.add(stem_tip);

  function appleRadiusAt(y) {
    if (y <= -0.47) return 0.16;
    if (y <= -0.38) return 0.20 + (y + 0.47) / 0.09 * 0.15;
    if (y <= -0.15) return 0.35 + (y + 0.38) / 0.23 * 0.13;
    if (y <= 0.12) return 0.48 + (y + 0.15) / 0.27 * 0.015;
    if (y <= 0.30) return 0.495 - (y - 0.12) / 0.18 * 0.045;
    if (y <= 0.41) return 0.45 - (y - 0.30) / 0.11 * 0.08;
    return Math.max(0.12, 0.37 - (y - 0.41) * 1.4);
  }

  const speckle_count = 240;
  const skin_specklesGeom = new THREE.CircleGeometry(1, 8);
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    speckle_count
  );

  const speckle_matrix = new THREE.Matrix4();
  const speckle_position = new THREE.Vector3();
  const speckle_normal = new THREE.Vector3();
  const speckle_quaternion = new THREE.Quaternion();
  const speckle_scale = new THREE.Vector3();
  const speckle_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < speckle_count; i++) {
    const y_fraction = ((i * 73) % 241) / 240;
    const angle_fraction = ((i * 89) % 251) / 250;
    const y = -0.425 + y_fraction * 0.825;
    const angle = angle_fraction * Math.PI * 2;
    const top_weight = Math.max(0, Math.min(1, (y - 0.27) / 0.22));
    const lobe_scale =
      1 + 0.012 * Math.cos(angle * 5 + 0.35) * top_weight;
    const radius = appleRadiusAt(y) * lobe_scale;

    speckle_normal.set(
      Math.cos(angle),
      (y + 0.02) * 0.75,
      Math.sin(angle)
    ).normalize();

    speckle_position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    ).addScaledVector(speckle_normal, 0.004);

    speckle_quaternion.setFromUnitVectors(
      speckle_forward,
      speckle_normal
    );

    const size = 0.0027 + ((i * 17) % 7) * 0.00028;
    const stretch = 0.78 + ((i * 11) % 5) * 0.06;
    speckle_scale.set(size, size * stretch, 1);

    speckle_matrix.compose(
      speckle_position,
      speckle_quaternion,
      speckle_scale
    );
    skin_speckles.setMatrixAt(i, speckle_matrix);
  }

  skin_speckles.instanceMatrix.needsUpdate = true;
  skin_speckles.frustumCulled = false;
  root.add(skin_speckles);

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