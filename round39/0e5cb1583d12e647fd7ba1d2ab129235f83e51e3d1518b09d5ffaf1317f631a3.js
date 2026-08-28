export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_balloon";

  const balloon_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const neck_collarMat = balloon_bodyMat;
  const tie_knotMat = balloon_bodyMat;

  const surface_scuffsMat = new THREE.MeshStandardMaterial({
    color: 0x666666,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const surface_scratchesMat = new THREE.MeshStandardMaterial({
    color: 0x8a8a8a,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const balloon_bodyProfileCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.070, 0.015),
    new THREE.Vector2(0.130, 0.070),
    new THREE.Vector2(0.155, 0.170),
    new THREE.Vector2(0.160, 0.280),
    new THREE.Vector2(0.220, 0.420),
    new THREE.Vector2(0.340, 0.600),
    new THREE.Vector2(0.500, 0.820),
    new THREE.Vector2(0.640, 1.080),
    new THREE.Vector2(0.720, 1.350),
    new THREE.Vector2(0.730, 1.580),
    new THREE.Vector2(0.680, 1.820),
    new THREE.Vector2(0.550, 2.020),
    new THREE.Vector2(0.350, 2.160),
    new THREE.Vector2(0.120, 2.220),
    new THREE.Vector2(0.000, 2.230),
  ]);
  const balloon_bodyProfile = balloon_bodyProfileCurve.getSpacedPoints(96);
  const balloon_bodyGeom = new THREE.LatheGeometry(balloon_bodyProfile, 64);
  const balloon_body = new THREE.Mesh(balloon_bodyGeom, balloon_bodyMat);
  balloon_body.name = "balloon_body";
  root.add(balloon_body);

  const neck_collarProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.040, 0.000),
    new THREE.Vector2(0.052, 0.018),
    new THREE.Vector2(0.055, 0.052),
    new THREE.Vector2(0.048, 0.082),
    new THREE.Vector2(0.065, 0.108),
    new THREE.Vector2(0.000, 0.115),
  ];
  const neck_collarGeom = new THREE.LatheGeometry(neck_collarProfile, 32);
  const neck_collar = new THREE.Mesh(neck_collarGeom, neck_collarMat);
  neck_collar.name = "neck_collar";
  neck_collar.position.y = -0.075;
  root.add(neck_collar);

  const tie_knotGeom = new THREE.SphereGeometry(0.1, 32, 20);
  const tie_knot = new THREE.Mesh(tie_knotGeom, tie_knotMat);
  tie_knot.name = "tie_knot";
  tie_knot.position.set(0, -0.16, 0);
  tie_knot.scale.set(0.9, 0.8, 0.86);
  root.add(tie_knot);

  function bodyRadiusAt(y) {
    if (y <= balloon_bodyProfile[0].y) return balloon_bodyProfile[0].x;
    for (let i = 1; i < balloon_bodyProfile.length; i++) {
      const lower = balloon_bodyProfile[i - 1];
      const upper = balloon_bodyProfile[i];
      if (y <= upper.y) {
        const span = upper.y - lower.y || 1;
        const t = (y - lower.y) / span;
        return lower.x + (upper.x - lower.x) * t;
      }
    }
    return balloon_bodyProfile[balloon_bodyProfile.length - 1].x;
  }

  function surfaceFrame(angle, y, offset) {
    const sample = 0.004;
    const radius = bodyRadiusAt(y);
    const slope = (bodyRadiusAt(y + sample) - bodyRadiusAt(y - sample)) / (sample * 2);
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);

    const normal = new THREE.Vector3(cosAngle, -slope, sinAngle).normalize();
    const tangentX = new THREE.Vector3(sinAngle, 0, -cosAngle).normalize();
    const tangentY = new THREE.Vector3(
      slope * cosAngle,
      1,
      slope * sinAngle
    ).normalize();

    const position = new THREE.Vector3(
      cosAngle * radius,
      y,
      sinAngle * radius
    ).addScaledVector(normal, offset);

    const basis = new THREE.Matrix4().makeBasis(tangentX, tangentY, normal);
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(basis);
    return { position, quaternion };
  }

  const surface_scuffsGeom = new THREE.CircleGeometry(0.018, 12);
  const scuffData = [
    [1.57, 1.66, 1.45, 0.55, 0.18],
    [1.36, 1.70, 0.72, 0.42, -0.42],
    [1.78, 1.58, 0.88, 0.38, 0.62],
    [1.05, 1.47, 0.55, 0.30, -0.18],
    [2.18, 1.73, 0.78, 0.32, 0.48],
    [0.72, 1.28, 0.48, 0.24, -0.70],
    [2.48, 1.34, 0.62, 0.27, 0.24],
    [1.42, 1.16, 0.58, 0.32, 0.88],
    [1.82, 0.96, 0.82, 0.30, -0.36],
    [1.18, 0.72, 0.48, 0.24, 0.35],
    [2.06, 0.58, 0.62, 0.25, -0.72],
    [0.86, 0.43, 0.42, 0.20, 0.16],
    [1.55, 0.31, 0.54, 0.22, 0.58],
    [2.34, 0.82, 0.42, 0.20, -0.24],
    [0.54, 1.58, 0.54, 0.22, 0.76],
    [2.70, 1.08, 0.46, 0.20, -0.52],
    [1.34, 1.93, 0.45, 0.20, 0.12],
    [1.92, 1.86, 0.38, 0.18, -0.68],
  ];
  const surface_scuffs = new THREE.InstancedMesh(
    surface_scuffsGeom,
    surface_scuffsMat,
    scuffData.length
  );
  surface_scuffs.name = "surface_scuffs";

  const scuffMatrix = new THREE.Matrix4();
  const scuffRoll = new THREE.Quaternion();
  const scuffScale = new THREE.Vector3();
  const localNormalAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < scuffData.length; i++) {
    const data = scuffData[i];
    const frame = surfaceFrame(data[0], data[1], 0.0035);
    scuffRoll.setFromAxisAngle(localNormalAxis, data[4]);
    frame.quaternion.multiply(scuffRoll);
    scuffScale.set(data[2], data[3], 1);
    scuffMatrix.compose(frame.position, frame.quaternion, scuffScale);
    surface_scuffs.setMatrixAt(i, scuffMatrix);
  }
  surface_scuffs.instanceMatrix.needsUpdate = true;
  root.add(surface_scuffs);

  const surface_scratchesGeom = new THREE.PlaneGeometry(0.0025, 0.065);
  const scratchData = [
    [1.20, 1.52, 0.75, 0.80, -0.22],
    [1.43, 1.43, 0.55, 1.10, 0.34],
    [1.72, 1.38, 0.42, 0.72, -0.58],
    [2.02, 1.49, 0.62, 0.92, 0.18],
    [0.82, 1.10, 0.48, 0.65, -0.44],
    [2.42, 1.15, 0.52, 0.82, 0.52],
    [1.31, 0.88, 0.68, 1.05, -0.12],
    [1.76, 0.76, 0.46, 0.76, 0.62],
    [2.12, 0.55, 0.52, 0.90, -0.32],
    [1.02, 0.42, 0.38, 0.58, 0.28],
    [1.62, 0.34, 0.44, 0.68, -0.50],
    [2.58, 1.52, 0.38, 0.62, 0.14],
    [0.48, 1.72, 0.46, 0.72, -0.36],
    [2.82, 0.92, 0.42, 0.62, 0.48],
    [1.50, 1.86, 0.36, 0.54, 0.08],
    [1.96, 1.72, 0.44, 0.66, -0.24],
  ];
  const surface_scratches = new THREE.InstancedMesh(
    surface_scratchesGeom,
    surface_scratchesMat,
    scratchData.length
  );
  surface_scratches.name = "surface_scratches";

  const scratchMatrix = new THREE.Matrix4();
  const scratchRoll = new THREE.Quaternion();
  const scratchScale = new THREE.Vector3();

  for (let i = 0; i < scratchData.length; i++) {
    const data = scratchData[i];
    const frame = surfaceFrame(data[0], data[1], 0.004);
    scratchRoll.setFromAxisAngle(localNormalAxis, data[4]);
    frame.quaternion.multiply(scratchRoll);
    scratchScale.set(data[2], data[3], 1);
    scratchMatrix.compose(frame.position, frame.quaternion, scratchScale);
    surface_scratches.setMatrixAt(i, scratchMatrix);
  }
  surface_scratches.instanceMatrix.needsUpdate = true;
  root.add(surface_scratches);

  function fitToUnitCube(object) {
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

  fitToUnitCube(root);
  return root;
}