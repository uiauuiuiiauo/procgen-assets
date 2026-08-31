export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "dried_seed_pod";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.9,
  });
  const ridgeMat = new THREE.MeshStandardMaterial({
    color: 0x8a512f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const furMat = new THREE.MeshStandardMaterial({
    color: 0x8b5a35,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkFurMat = new THREE.MeshStandardMaterial({
    color: 0x633a24,
    metalness: 0.0,
    roughness: 0.9,
  });
  const opening_rimMat = new THREE.MeshStandardMaterial({
    color: 0x704127,
    metalness: 0.0,
    roughness: 0.9,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x17100c,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x68452c,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stem_tipMat = new THREE.MeshStandardMaterial({
    color: 0x49301f,
    metalness: 0.0,
    roughness: 0.9,
  });

  const bodyProfile = [
    new THREE.Vector2(0.000, -0.430),
    new THREE.Vector2(0.075, -0.425),
    new THREE.Vector2(0.160, -0.390),
    new THREE.Vector2(0.235, -0.300),
    new THREE.Vector2(0.285, -0.150),
    new THREE.Vector2(0.300, 0.030),
    new THREE.Vector2(0.285, 0.180),
    new THREE.Vector2(0.240, 0.300),
    new THREE.Vector2(0.155, 0.380),
    new THREE.Vector2(0.075, 0.415),
    new THREE.Vector2(0.000, 0.430),
  ];

  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 64);
  const bodyPosition = bodyGeom.attributes.position;
  const bodyColors = [];
  const darkColor = new THREE.Color(0x704326);
  const lightColor = new THREE.Color(0xb47749);
  const vertexColor = new THREE.Color();

  for (let i = 0; i < bodyPosition.count; i++) {
    const x = bodyPosition.getX(i);
    const y = bodyPosition.getY(i);
    const z = bodyPosition.getZ(i);
    const angle = Math.atan2(z, x);
    const grain =
      Math.sin(angle * 13.0 + y * 37.0) * 0.018 +
      Math.sin(angle * 29.0 - y * 21.0) * 0.011 +
      Math.sin(angle * 7.0 + y * 63.0) * 0.007;
    const radialScale = 1.0 + grain;
    bodyPosition.setXYZ(i, x * radialScale, y, z * radialScale);

    const variation = 0.5 + 0.5 * Math.sin(angle * 17.0 + y * 43.0);
    const band = 0.5 + 0.5 * Math.sin(angle * 5.0 - y * 18.0);
    const shade = 0.34 + variation * 0.42 + band * 0.12;
    vertexColor.copy(darkColor).lerp(lightColor, shade);
    bodyColors.push(vertexColor.r, vertexColor.g, vertexColor.b);
  }

  bodyGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(bodyColors, 3)
  );
  bodyGeom.computeVertexNormals();

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  body.rotation.z = -Math.PI / 2;
  body.scale.set(0.82, 1.0, 1.0);
  root.add(body);

  const radiusStops = [
    [-0.430, 0.000],
    [-0.425, 0.075],
    [-0.390, 0.160],
    [-0.300, 0.235],
    [-0.150, 0.285],
    [0.030, 0.300],
    [0.180, 0.285],
    [0.300, 0.240],
    [0.380, 0.155],
    [0.415, 0.075],
    [0.430, 0.000],
  ];

  function bodyRadiusAt(x) {
    if (x <= radiusStops[0][0]) return radiusStops[0][1];
    for (let i = 1; i < radiusStops.length; i++) {
      const previous = radiusStops[i - 1];
      const current = radiusStops[i];
      if (x <= current[0]) {
        const t = (x - previous[0]) / (current[0] - previous[0]);
        return previous[1] + (current[1] - previous[1]) * t;
      }
    }
    return radiusStops[radiusStops.length - 1][1];
  }

  function surfacePoint(x, angle) {
    const radius = bodyRadiusAt(x);
    const y = Math.cos(angle) * radius * 0.82;
    const z = Math.sin(angle) * radius;
    const normal = new THREE.Vector3(
      0,
      y / (0.82 * 0.82),
      z
    ).normalize();
    return {
      position: new THREE.Vector3(x, y, z),
      normal,
    };
  }

  const surface_fibers = new THREE.Group();
  surface_fibers.name = "surface_fibers";
  root.add(surface_fibers);

  const ridgeAngles = [0.18, 1.05, 2.05, 3.02, 4.08, 5.25];
  for (let r = 0; r < ridgeAngles.length; r++) {
    const ridgePoints = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const x = -0.355 + t * 0.720;
      const angle =
        ridgeAngles[r] + Math.sin(t * Math.PI * 2.0 + r) * 0.035;
      const sample = surfacePoint(x, angle);
      ridgePoints.push(
        sample.position.clone().addScaledVector(sample.normal, 0.004)
      );
    }
    const longitudinal_ridgeGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(ridgePoints),
      24,
      0.0032,
      5,
      false
    );
    const longitudinal_ridge = new THREE.Mesh(
      longitudinal_ridgeGeom,
      ridgeMat
    );
    longitudinal_ridge.name = "longitudinal_ridge_" + r;
    surface_fibers.add(longitudinal_ridge);
  }

  const up = new THREE.Vector3(0, 1, 0);
  const dummy = new THREE.Object3D();

  const furCount = 360;
  const surface_fuzzGeom = new THREE.CylinderGeometry(
    0.0007,
    0.0018,
    0.012,
    5
  );
  const surface_fuzz = new THREE.InstancedMesh(
    surface_fuzzGeom,
    furMat,
    furCount
  );
  surface_fuzz.name = "surface_fuzz";

  for (let i = 0; i < furCount; i++) {
    const t = (i + 0.5) / furCount;
    const x = -0.402 + t * 0.804;
    const angle = i * 2.3999632297 + Math.sin(i * 0.73) * 0.18;
    const sample = surfacePoint(x, angle);
    const lengthScale = 0.65 + 0.55 * (0.5 + 0.5 * Math.sin(i * 1.71));
    const widthScale = 0.75 + 0.35 * (0.5 + 0.5 * Math.sin(i * 2.31));

    dummy.position
      .copy(sample.position)
      .addScaledVector(sample.normal, 0.006 * lengthScale);
    dummy.quaternion.setFromUnitVectors(up, sample.normal);
    dummy.scale.set(widthScale, lengthScale, widthScale);
    dummy.updateMatrix();
    surface_fuzz.setMatrixAt(i, dummy.matrix);
  }
  surface_fuzz.instanceMatrix.needsUpdate = true;
  root.add(surface_fuzz);

  const darkFurCount = 110;
  const dark_surface_fuzzGeom = new THREE.CylinderGeometry(
    0.0005,
    0.0012,
    0.008,
    5
  );
  const dark_surface_fuzz = new THREE.InstancedMesh(
    dark_surface_fuzzGeom,
    darkFurMat,
    darkFurCount
  );
  dark_surface_fuzz.name = "dark_surface_fuzz";

  for (let i = 0; i < darkFurCount; i++) {
    const t = (i + 0.35) / darkFurCount;
    const x = -0.390 + t * 0.755;
    const angle = i * 2.3999632297 + 1.17;
    const sample = surfacePoint(x, angle);
    const lengthScale = 0.7 + 0.45 * (0.5 + 0.5 * Math.sin(i * 1.37));

    dummy.position
      .copy(sample.position)
      .addScaledVector(sample.normal, 0.004 * lengthScale);
    dummy.quaternion.setFromUnitVectors(up, sample.normal);
    dummy.scale.set(1, lengthScale, 1);
    dummy.updateMatrix();
    dark_surface_fuzz.setMatrixAt(i, dummy.matrix);
  }
  dark_surface_fuzz.instanceMatrix.needsUpdate = true;
  root.add(dark_surface_fuzz);

  const opening_rimGeom = new THREE.TorusGeometry(0.038, 0.008, 10, 32);
  const opening_rim = new THREE.Mesh(opening_rimGeom, opening_rimMat);
  opening_rim.name = "opening_rim";
  opening_rim.rotation.y = Math.PI / 2;
  opening_rim.position.x = -0.431;
  root.add(opening_rim);

  const openingGeom = new THREE.CircleGeometry(0.034, 32);
  const opening = new THREE.Mesh(openingGeom, openingMat);
  opening.name = "opening";
  opening.rotation.y = -Math.PI / 2;
  opening.position.x = -0.434;
  root.add(opening);

  const opening_depthGeom = new THREE.CylinderGeometry(
    0.027,
    0.027,
    0.012,
    24
  );
  const opening_depth = new THREE.Mesh(opening_depthGeom, openingMat);
  opening_depth.name = "opening_depth";
  opening_depth.rotation.z = Math.PI / 2;
  opening_depth.position.x = -0.438;
  root.add(opening_depth);

  const stem_collarGeom = new THREE.CylinderGeometry(
    0.052,
    0.065,
    0.055,
    18
  );
  const stem_collar = new THREE.Mesh(stem_collarGeom, stemMat);
  stem_collar.name = "stem_collar";
  stem_collar.rotation.z = -Math.PI / 2;
  stem_collar.position.x = 0.425;
  root.add(stem_collar);

  const stemPoints = [
    new THREE.Vector3(0.418, 0.000, 0.000),
    new THREE.Vector3(0.465, 0.010, 0.004),
    new THREE.Vector3(0.515, 0.032, 0.012),
    new THREE.Vector3(0.570, 0.046, 0.020),
  ];
  const stemGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(stemPoints),
    24,
    0.034,
    10,
    false
  );
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.name = "stem";
  root.add(stem);

  const stemDirection = new THREE.Vector3()
    .subVectors(stemPoints[3], stemPoints[2])
    .normalize();
  const stemTipEnd = stemPoints[3]
    .clone()
    .addScaledVector(stemDirection, 0.012);
  const stemTipStart = stemPoints[3]
    .clone()
    .addScaledVector(stemDirection, -0.004);

  const stem_tipGeom = new THREE.TubeGeometry(
    new THREE.LineCurve3(stemTipStart, stemTipEnd),
    2,
    0.027,
    10,
    false
  );
  const stem_tip = new THREE.Mesh(stem_tipGeom, stem_tipMat);
  stem_tip.name = "stem_tip";
  root.add(stem_tip);

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