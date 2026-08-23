export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ceramic_rope_handle_mug";

  const mug_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xeeeae0,
    metalness: 0.0,
    roughness: 0.4,
  });
  const inner_baseMat = new THREE.MeshStandardMaterial({
    color: 0xd9d4c8,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const rope_coreMat = new THREE.MeshStandardMaterial({
    color: 0xb9ad9b,
    metalness: 0.0,
    roughness: 0.95,
  });
  const rope_strand_oneMat = new THREE.MeshStandardMaterial({
    color: 0xcfc2af,
    metalness: 0.0,
    roughness: 0.95,
  });
  const rope_strand_twoMat = new THREE.MeshStandardMaterial({
    color: 0xddd0bd,
    metalness: 0.0,
    roughness: 0.95,
  });
  const rope_strand_threeMat = new THREE.MeshStandardMaterial({
    color: 0xbfb29f,
    metalness: 0.0,
    roughness: 0.95,
  });

  const mug_bodyProfile = [
    new THREE.Vector2(0.000, -0.460),
    new THREE.Vector2(0.220, -0.460),
    new THREE.Vector2(0.280, -0.455),
    new THREE.Vector2(0.320, -0.440),
    new THREE.Vector2(0.345, -0.410),
    new THREE.Vector2(0.360, -0.360),
    new THREE.Vector2(0.365, -0.280),
    new THREE.Vector2(0.365, 0.340),
    new THREE.Vector2(0.362, 0.400),
    new THREE.Vector2(0.350, 0.445),
    new THREE.Vector2(0.330, 0.468),
    new THREE.Vector2(0.305, 0.478),
    new THREE.Vector2(0.286, 0.473),
    new THREE.Vector2(0.278, 0.458),
    new THREE.Vector2(0.286, 0.430),
    new THREE.Vector2(0.298, 0.360),
    new THREE.Vector2(0.300, -0.300),
    new THREE.Vector2(0.290, -0.350),
    new THREE.Vector2(0.260, -0.380),
    new THREE.Vector2(0.000, -0.380),
  ];
  const mug_bodyGeom = new THREE.LatheGeometry(mug_bodyProfile, 64);
  const mug_body = new THREE.Mesh(mug_bodyGeom, mug_bodyMat);
  mug_body.name = "mug_body";
  root.add(mug_body);

  const rimMat = mug_bodyMat;
  const rimGeom = new THREE.TorusGeometry(0.317, 0.031, 16, 64);
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.name = "rim";
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.455;
  root.add(rim);

  const inner_baseGeom = new THREE.CircleGeometry(0.255, 48);
  const inner_base = new THREE.Mesh(inner_baseGeom, inner_baseMat);
  inner_base.name = "inner_base";
  inner_base.rotation.x = -Math.PI / 2;
  inner_base.position.y = -0.377;
  root.add(inner_base);

  const handle_group = new THREE.Group();
  handle_group.name = "handle_group";
  root.add(handle_group);

  const mount_startGeom = new THREE.SphereGeometry(1, 28, 18);

  const upper_mount_startMat = mug_bodyMat;
  const upper_mount_start = new THREE.Mesh(mount_startGeom, upper_mount_startMat);
  upper_mount_start.name = "upper_mount_start";
  upper_mount_start.position.set(0.375, 0.280, 0);
  upper_mount_start.scale.set(0.070, 0.064, 0.060);
  handle_group.add(upper_mount_start);

  const lower_mount_startMat = mug_bodyMat;
  const lower_mount_start = new THREE.Mesh(mount_startGeom, lower_mount_startMat);
  lower_mount_start.name = "lower_mount_start";
  lower_mount_start.position.set(0.375, -0.270, 0);
  lower_mount_start.scale.set(0.070, 0.064, 0.060);
  handle_group.add(lower_mount_start);

  const upper_mountGeom = new THREE.CylinderGeometry(0.034, 0.064, 0.160, 28);
  const upper_mountMat = mug_bodyMat;
  const upper_mount = new THREE.Mesh(upper_mountGeom, upper_mountMat);
  upper_mount.name = "upper_mount";
  upper_mount.rotation.z = -Math.PI / 2;
  upper_mount.position.set(0.405, 0.280, 0);
  handle_group.add(upper_mount);

  const lower_mountGeom = upper_mountGeom;
  const lower_mountMat = mug_bodyMat;
  const lower_mount = new THREE.Mesh(lower_mountGeom, lower_mountMat);
  lower_mount.name = "lower_mount";
  lower_mount.rotation.z = -Math.PI / 2;
  lower_mount.position.set(0.405, -0.270, 0);
  handle_group.add(lower_mount);

  const rope_handlePoints = [
    new THREE.Vector3(0.390, 0.280, 0.000),
    new THREE.Vector3(0.455, 0.292, 0.000),
    new THREE.Vector3(0.525, 0.320, 0.000),
    new THREE.Vector3(0.600, 0.290, 0.000),
    new THREE.Vector3(0.655, 0.210, 0.000),
    new THREE.Vector3(0.680, 0.105, 0.000),
    new THREE.Vector3(0.680, -0.020, 0.000),
    new THREE.Vector3(0.655, -0.145, 0.000),
    new THREE.Vector3(0.600, -0.245, 0.000),
    new THREE.Vector3(0.525, -0.310, 0.000),
    new THREE.Vector3(0.455, -0.292, 0.000),
    new THREE.Vector3(0.390, -0.270, 0.000),
  ];
  const rope_handleCurve = new THREE.CatmullRomCurve3(
    rope_handlePoints,
    false,
    "centripetal"
  );

  const rope_coreGeom = new THREE.TubeGeometry(
    rope_handleCurve,
    160,
    0.027,
    12,
    false
  );
  const rope_core = new THREE.Mesh(rope_coreGeom, rope_coreMat);
  rope_core.name = "rope_core";
  handle_group.add(rope_core);

  const rope_strand_group = new THREE.Group();
  rope_strand_group.name = "rope_strand_group";
  handle_group.add(rope_strand_group);

  const strandCount = 3;
  const strandSamples = 180;
  const strandTurns = 11;
  const strandOffset = 0.021;
  const strandRadius = 0.017;
  const strandMaterials = [
    rope_strand_oneMat,
    rope_strand_twoMat,
    rope_strand_threeMat,
  ];

  for (let strandIndex = 0; strandIndex < strandCount; strandIndex++) {
    const strandPoints = [];
    const phaseOffset = strandIndex * Math.PI * 2 / strandCount;

    for (let pointIndex = 0; pointIndex <= strandSamples; pointIndex++) {
      const t = pointIndex / strandSamples;
      const center = rope_handleCurve.getPoint(t);
      const tangent = rope_handleCurve.getTangent(t).normalize();
      const planarNormal = new THREE.Vector3(
        -tangent.y,
        tangent.x,
        0
      ).normalize();
      const binormal = new THREE.Vector3(0, 0, 1);
      const phase = Math.PI * 2 * strandTurns * t + phaseOffset;
      const point = center.clone()
        .addScaledVector(planarNormal, Math.cos(phase) * strandOffset)
        .addScaledVector(binormal, Math.sin(phase) * strandOffset);
      strandPoints.push(point);
    }

    const rope_strandCurve = new THREE.CatmullRomCurve3(
      strandPoints,
      false,
      "centripetal"
    );
    const rope_strandGeom = new THREE.TubeGeometry(
      rope_strandCurve,
      220,
      strandRadius,
      10,
      false
    );
    const rope_strand = new THREE.Mesh(
      rope_strandGeom,
      strandMaterials[strandIndex]
    );
    rope_strand.name = "rope_strand_" + (strandIndex + 1);
    rope_strand_group.add(rope_strand);
  }

  const upper_rope_collarMat = mug_bodyMat;
  const upper_rope_collarGeom = new THREE.TorusGeometry(0.034, 0.006, 10, 28);
  const upper_rope_collar = new THREE.Mesh(
    upper_rope_collarGeom,
    upper_rope_collarMat
  );
  upper_rope_collar.name = "upper_rope_collar";
  upper_rope_collar.rotation.y = Math.PI / 2;
  upper_rope_collar.position.set(0.455, 0.286, 0);
  handle_group.add(upper_rope_collar);

  const lower_rope_collarMat = mug_bodyMat;
  const lower_rope_collarGeom = upper_rope_collarGeom;
  const lower_rope_collar = new THREE.Mesh(
    lower_rope_collarGeom,
    lower_rope_collarMat
  );
  lower_rope_collar.name = "lower_rope_collar";
  lower_rope_collar.rotation.y = Math.PI / 2;
  lower_rope_collar.position.set(0.455, -0.282, 0);
  handle_group.add(lower_rope_collar);

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