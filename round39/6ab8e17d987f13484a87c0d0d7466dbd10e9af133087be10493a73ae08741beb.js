export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "opal_gemstone";

  const stone_group = new THREE.Group();
  stone_group.name = "stone_group";
  root.add(stone_group);

  const inclusions_group = new THREE.Group();
  inclusions_group.name = "inclusions_group";
  stone_group.add(inclusions_group);

  const surface_details = new THREE.Group();
  surface_details.name = "surface_details";
  stone_group.add(surface_details);

  const opal_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf0f4f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    depthWrite: false
  });

  const opal_inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0xf2f5f4,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.07,
    depthWrite: false,
    side: THREE.BackSide
  });

  function makeFlakeGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }

  const rainbow_flakeGeom = makeFlakeGeometry([
    [-0.55, -0.12],
    [-0.18, -0.48],
    [0.48, -0.28],
    [0.58, 0.18],
    [0.12, 0.52],
    [-0.46, 0.30]
  ]);

  const rainbow_shardGeom = makeFlakeGeometry([
    [-0.58, -0.08],
    [-0.12, -0.34],
    [0.58, 0.06],
    [0.20, 0.28],
    [-0.38, 0.20]
  ]);

  const rainbow_speckGeom = new THREE.CircleGeometry(0.5, 12);

  const rainbow_cyanMat = new THREE.MeshStandardMaterial({
    color: 0x24f4e3,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x24f4e3,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  const rainbow_greenMat = new THREE.MeshStandardMaterial({
    color: 0x45ff72,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x45ff72,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  const rainbow_magentaMat = new THREE.MeshStandardMaterial({
    color: 0xff4fd6,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xff4fd6,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  const rainbow_orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff7b38,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xff7b38,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  const rainbow_violetMat = new THREE.MeshStandardMaterial({
    color: 0x986cff,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0x986cff,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  const rainbow_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffe64c,
    metalness: 0.0,
    roughness: 0.4,
    emissive: 0xffe64c,
    emissiveIntensity: 1.0,
    side: THREE.DoubleSide
  });

  const milky_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.12,
    depthWrite: false
  });

  const internal_fracturesMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.22,
    depthWrite: false
  });

  const surface_scratchesMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.24,
    depthWrite: false
  });

  const profileCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.00, -0.60),
    new THREE.Vector2(0.16, -0.59),
    new THREE.Vector2(0.34, -0.53),
    new THREE.Vector2(0.48, -0.40),
    new THREE.Vector2(0.55, -0.18),
    new THREE.Vector2(0.54, 0.04),
    new THREE.Vector2(0.47, 0.25),
    new THREE.Vector2(0.36, 0.43),
    new THREE.Vector2(0.22, 0.59),
    new THREE.Vector2(0.09, 0.70),
    new THREE.Vector2(0.035, 0.73),
    new THREE.Vector2(0.00, 0.74)
  ]);

  const opal_bodyProfile = profileCurve.getSpacedPoints(72).map(
    (point) => new THREE.Vector2(Math.max(0, point.x), point.y)
  );

  const opal_bodyGeom = new THREE.LatheGeometry(opal_bodyProfile, 64);
  const opal_body = new THREE.Mesh(opal_bodyGeom, opal_bodyMat);
  opal_body.name = "opal_body";
  opal_body.scale.set(1.0, 1.0, 0.84);
  opal_body.renderOrder = 2;
  stone_group.add(opal_body);

  const opal_inner_glow = new THREE.Mesh(
    opal_bodyGeom,
    opal_inner_glowMat
  );
  opal_inner_glow.name = "opal_inner_glow";
  opal_inner_glow.scale.set(0.975, 0.975, 0.815);
  opal_inner_glow.renderOrder = 1;
  stone_group.add(opal_inner_glow);

  const radiusKeys = [
    [-0.60, 0.00],
    [-0.59, 0.16],
    [-0.53, 0.34],
    [-0.40, 0.48],
    [-0.18, 0.55],
    [0.04, 0.54],
    [0.25, 0.47],
    [0.43, 0.36],
    [0.59, 0.22],
    [0.70, 0.09],
    [0.73, 0.035],
    [0.74, 0.00]
  ];

  function stoneRadiusAt(y) {
    if (y <= radiusKeys[0][0]) return radiusKeys[0][1];
    for (let i = 1; i < radiusKeys.length; i++) {
      const previous = radiusKeys[i - 1];
      const current = radiusKeys[i];
      if (y <= current[0]) {
        const t = (y - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return 0;
  }

  const dummy = new THREE.Object3D();
  const localNormal = new THREE.Vector3(0, 0, 1);
  const surfaceNormal = new THREE.Vector3();
  const surfacePosition = new THREE.Vector3();

  function populateInclusions(mesh, count, phase, minSize, maxSize, depth) {
    for (let i = 0; i < count; i++) {
      const heightValue = ((i * 13 + 5) % 37) / 36;
      const y = -0.48 + heightValue * 1.08;
      const radius = stoneRadiusAt(y);
      const radialValue = (((i * 17 + 3) % 29) + 0.5) / 29;
      const radialDistance = radius * (0.12 + 0.72 * Math.sqrt(radialValue));
      const angle = i * 2.3999632297 + phase;
      const x = Math.cos(angle) * radialDistance;
      const z = Math.sin(angle) * radialDistance * 0.84;
      const wave = 0.5 + 0.5 * Math.sin((i + 1) * (phase + 1.7));
      const size = minSize + (maxSize - minSize) * wave;

      dummy.position.set(x, y, z);
      dummy.rotation.set(
        i * 0.71 + phase,
        i * 1.13 + phase * 0.5,
        i * 0.43 + phase
      );
      dummy.scale.set(
        size * (0.75 + 0.35 * (((i * 3) % 7) / 6)),
        size * (0.55 + 0.55 * (((i * 5) % 9) / 8)),
        depth
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const milky_inclusionsGeom = new THREE.SphereGeometry(0.5, 12, 8);
  const milky_inclusions = new THREE.InstancedMesh(
    milky_inclusionsGeom,
    milky_inclusionsMat,
    10
  );
  milky_inclusions.name = "milky_inclusions";
  milky_inclusions.renderOrder = 0;

  for (let i = 0; i < 10; i++) {
    const y = -0.40 + ((i * 9 + 2) % 19) / 18 * 0.84;
    const radius = stoneRadiusAt(y);
    const angle = i * 2.07 + 0.35;
    const radialFactor = 0.20 + 0.42 * (((i * 5 + 1) % 13) / 12);
    const radialDistance = radius * radialFactor;
    dummy.position.set(
      Math.cos(angle) * radialDistance,
      y,
      Math.sin(angle) * radialDistance * 0.84
    );
    dummy.rotation.set(i * 0.48, i * 0.81, i * 0.29);
    dummy.scale.set(
      0.08 + 0.05 * ((i % 4) / 3),
      0.035 + 0.035 * (((i * 3) % 5) / 4),
      0.025 + 0.025 * (((i * 7) % 6) / 5)
    );
    dummy.updateMatrix();
    milky_inclusions.setMatrixAt(i, dummy.matrix);
  }
  milky_inclusions.instanceMatrix.needsUpdate = true;
  inclusions_group.add(milky_inclusions);

  const internal_fracturesGeom = new THREE.BoxGeometry(1, 1, 1);
  const internal_fractures = new THREE.InstancedMesh(
    internal_fracturesGeom,
    internal_fracturesMat,
    14
  );
  internal_fractures.name = "internal_fractures";
  internal_fractures.renderOrder = 0;

  for (let i = 0; i < 14; i++) {
    const y = -0.43 + ((i * 11 + 2) % 23) / 22 * 0.88;
    const radius = stoneRadiusAt(y);
    const angle = i * 1.83 + 0.6;
    const radialDistance = radius * (0.18 + 0.42 * (((i * 7) % 17) / 16));
    dummy.position.set(
      Math.cos(angle) * radialDistance,
      y,
      Math.sin(angle) * radialDistance * 0.84
    );
    dummy.rotation.set(i * 0.37, i * 0.69, i * 0.91);
    dummy.scale.set(
      0.055 + 0.065 * (((i * 5) % 8) / 7),
      0.0025 + 0.0025 * (((i * 3) % 5) / 4),
      0.0018
    );
    dummy.updateMatrix();
    internal_fractures.setMatrixAt(i, dummy.matrix);
  }
  internal_fractures.instanceMatrix.needsUpdate = true;
  inclusions_group.add(internal_fractures);

  const rainbow_flakes_cyan = new THREE.InstancedMesh(
    rainbow_flakeGeom,
    rainbow_cyanMat,
    14
  );
  rainbow_flakes_cyan.name = "rainbow_flakes_cyan";
  populateInclusions(rainbow_flakes_cyan, 14, 0.15, 0.040, 0.075, 0.003);
  inclusions_group.add(rainbow_flakes_cyan);

  const rainbow_flakes_green = new THREE.InstancedMesh(
    rainbow_flakeGeom,
    rainbow_greenMat,
    14
  );
  rainbow_flakes_green.name = "rainbow_flakes_green";
  populateInclusions(rainbow_flakes_green, 14, 1.04, 0.038, 0.072, 0.003);
  inclusions_group.add(rainbow_flakes_green);

  const rainbow_flakes_magenta = new THREE.InstancedMesh(
    rainbow_flakeGeom,
    rainbow_magentaMat,
    13
  );
  rainbow_flakes_magenta.name = "rainbow_flakes_magenta";
  populateInclusions(rainbow_flakes_magenta, 13, 2.02, 0.036, 0.070, 0.003);
  inclusions_group.add(rainbow_flakes_magenta);

  const rainbow_flakes_orange = new THREE.InstancedMesh(
    rainbow_flakeGeom,
    rainbow_orangeMat,
    13
  );
  rainbow_flakes_orange.name = "rainbow_flakes_orange";
  populateInclusions(rainbow_flakes_orange, 13, 2.83, 0.035, 0.068, 0.003);
  inclusions_group.add(rainbow_flakes_orange);

  const rainbow_flakes_violet = new THREE.InstancedMesh(
    rainbow_flakeGeom,
    rainbow_violetMat,
    12
  );
  rainbow_flakes_violet.name = "rainbow_flakes_violet";
  populateInclusions(rainbow_flakes_violet, 12, 3.71, 0.036, 0.070, 0.003);
  inclusions_group.add(rainbow_flakes_violet);

  const rainbow_flakes_yellow = new THREE.InstancedMesh(
    rainbow_flakeGeom,
    rainbow_yellowMat,
    12
  );
  rainbow_flakes_yellow.name = "rainbow_flakes_yellow";
  populateInclusions(rainbow_flakes_yellow, 12, 4.56, 0.032, 0.064, 0.003);
  inclusions_group.add(rainbow_flakes_yellow);

  const rainbow_shards_cyan = new THREE.InstancedMesh(
    rainbow_shardGeom,
    rainbow_cyanMat,
    16
  );
  rainbow_shards_cyan.name = "rainbow_shards_cyan";
  populateInclusions(rainbow_shards_cyan, 16, 0.73, 0.032, 0.066, 0.0025);
  inclusions_group.add(rainbow_shards_cyan);

  const rainbow_shards_green = new THREE.InstancedMesh(
    rainbow_shardGeom,
    rainbow_greenMat,
    16
  );
  rainbow_shards_green.name = "rainbow_shards_green";
  populateInclusions(rainbow_shards_green, 16, 1.62, 0.031, 0.064, 0.0025);
  inclusions_group.add(rainbow_shards_green);

  const rainbow_shards_magenta = new THREE.InstancedMesh(
    rainbow_shardGeom,
    rainbow_magentaMat,
    15
  );
  rainbow_shards_magenta.name = "rainbow_shards_magenta";
  populateInclusions(rainbow_shards_magenta, 15, 2.48, 0.030, 0.062, 0.0025);
  inclusions_group.add(rainbow_shards_magenta);

  const rainbow_shards_orange = new THREE.InstancedMesh(
    rainbow_shardGeom,
    rainbow_orangeMat,
    15
  );
  rainbow_shards_orange.name = "rainbow_shards_orange";
  populateInclusions(rainbow_shards_orange, 15, 3.37, 0.029, 0.060, 0.0025);
  inclusions_group.add(rainbow_shards_orange);

  const rainbow_shards_violet = new THREE.InstancedMesh(
    rainbow_shardGeom,
    rainbow_violetMat,
    14
  );
  rainbow_shards_violet.name = "rainbow_shards_violet";
  populateInclusions(rainbow_shards_violet, 14, 4.21, 0.030, 0.061, 0.0025);
  inclusions_group.add(rainbow_shards_violet);

  const rainbow_shards_yellow = new THREE.InstancedMesh(
    rainbow_shardGeom,
    rainbow_yellowMat,
    14
  );
  rainbow_shards_yellow.name = "rainbow_shards_yellow";
  populateInclusions(rainbow_shards_yellow, 14, 5.06, 0.027, 0.056, 0.0025);
  inclusions_group.add(rainbow_shards_yellow);

  const rainbow_specks_cyan = new THREE.InstancedMesh(
    rainbow_speckGeom,
    rainbow_cyanMat,
    18
  );
  rainbow_specks_cyan.name = "rainbow_specks_cyan";
  populateInclusions(rainbow_specks_cyan, 18, 0.42, 0.012, 0.026, 0.002);
  inclusions_group.add(rainbow_specks_cyan);

  const rainbow_specks_green = new THREE.InstancedMesh(
    rainbow_speckGeom,
    rainbow_greenMat,
    18
  );
  rainbow_specks_green.name = "rainbow_specks_green";
  populateInclusions(rainbow_specks_green, 18, 1.38, 0.011, 0.025, 0.002);
  inclusions_group.add(rainbow_specks_green);

  const rainbow_specks_magenta = new THREE.InstancedMesh(
    rainbow_speckGeom,
    rainbow_magentaMat,
    17
  );
  rainbow_specks_magenta.name = "rainbow_specks_magenta";
  populateInclusions(rainbow_specks_magenta, 17, 2.29, 0.011, 0.024, 0.002);
  inclusions_group.add(rainbow_specks_magenta);

  const rainbow_specks_orange = new THREE.InstancedMesh(
    rainbow_speckGeom,
    rainbow_orangeMat,
    17
  );
  rainbow_specks_orange.name = "rainbow_specks_orange";
  populateInclusions(rainbow_specks_orange, 17, 3.17, 0.010, 0.023, 0.002);
  inclusions_group.add(rainbow_specks_orange);

  const rainbow_specks_violet = new THREE.InstancedMesh(
    rainbow_speckGeom,
    rainbow_violetMat,
    16
  );
  rainbow_specks_violet.name = "rainbow_specks_violet";
  populateInclusions(rainbow_specks_violet, 16, 4.08, 0.010, 0.023, 0.002);
  inclusions_group.add(rainbow_specks_violet);

  const rainbow_specks_yellow = new THREE.InstancedMesh(
    rainbow_speckGeom,
    rainbow_yellowMat,
    16
  );
  rainbow_specks_yellow.name = "rainbow_specks_yellow";
  populateInclusions(rainbow_specks_yellow, 16, 5.01, 0.010, 0.022, 0.002);
  inclusions_group.add(rainbow_specks_yellow);

  function frontSurfacePoint(x, y, offset) {
    const radius = stoneRadiusAt(y);
    const normalizedX = Math.min(0.985, Math.abs(x) / radius);
    const z = radius * 0.84 *
      Math.sqrt(Math.max(0.03, 1 - normalizedX * normalizedX));

    surfaceNormal.set(
      x / (radius * radius),
      0,
      z / ((radius * 0.84) * (radius * 0.84))
    ).normalize();

    surfacePosition.set(x, y, z).addScaledVector(surfaceNormal, offset);
    return surfacePosition;
  }

  function populateSurfaceScratches(mesh, count, phase, minLength, maxLength) {
    for (let i = 0; i < count; i++) {
      const y = -0.42 + ((i * 7 + 3) % 19) / 18 * 0.80;
      const radius = stoneRadiusAt(y);
      const xFactor = -0.62 + 1.24 * (((i * 11 + 2) % 23) / 22);
      const x = radius * xFactor;
      const position = frontSurfacePoint(x, y, 0.004);
      const normal = surfaceNormal.clone();
      const length = minLength +
        (maxLength - minLength) * (((i * 5 + 1) % 9) / 8);

      dummy.position.copy(position);
      dummy.quaternion.setFromUnitVectors(localNormal, normal);
      dummy.rotateZ(phase + i * 0.73);
      dummy.scale.set(length, 0.0042, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const surface_scratchesGeom = new THREE.BoxGeometry(1, 1, 0.0015);
  const surface_scratches = new THREE.InstancedMesh(
    surface_scratchesGeom,
    surface_scratchesMat,
    18
  );
  surface_scratches.name = "surface_scratches";
  surface_scratches.renderOrder = 3;
  populateSurfaceScratches(surface_scratches, 18, 0.31, 0.025, 0.075);
  surface_details.add(surface_scratches);

  const surface_fissures = new THREE.InstancedMesh(
    surface_scratchesGeom,
    surface_scratchesMat,
    9
  );
  surface_fissures.name = "surface_fissures";
  surface_fissures.renderOrder = 3;
  populateSurfaceScratches(surface_fissures, 9, 1.47, 0.045, 0.105);
  surface_details.add(surface_fissures);

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