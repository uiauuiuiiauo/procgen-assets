export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_teacup";

  const cup_assembly = new THREE.Group();
  cup_assembly.name = "cup_assembly";
  root.add(cup_assembly);

  const cup_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x7fa66f,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const inner_bowlMat = new THREE.MeshStandardMaterial({
    color: 0xf2f0df,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const base_footMat = new THREE.MeshStandardMaterial({
    color: 0x557d45,
    metalness: 0.0,
    roughness: 0.4,
  });
  const base_trimMat = new THREE.MeshStandardMaterial({
    color: 0xd9ccb2,
    metalness: 0.0,
    roughness: 0.4,
  });
  const floral_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x50675a,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const floral_fillMat = new THREE.MeshStandardMaterial({
    color: 0xe9e9dd,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const floral_centerMat = new THREE.MeshStandardMaterial({
    color: 0x789184,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const cup_bodyProfile = [
    new THREE.Vector2(0.000, 0.110),
    new THREE.Vector2(0.280, 0.110),
    new THREE.Vector2(0.330, 0.125),
    new THREE.Vector2(0.370, 0.165),
    new THREE.Vector2(0.405, 0.220),
    new THREE.Vector2(0.440, 0.300),
    new THREE.Vector2(0.468, 0.400),
    new THREE.Vector2(0.487, 0.520),
    new THREE.Vector2(0.498, 0.650),
    new THREE.Vector2(0.500, 0.775),
    new THREE.Vector2(0.495, 0.825),
    new THREE.Vector2(0.480, 0.842),
    new THREE.Vector2(0.455, 0.842),
    new THREE.Vector2(0.443, 0.810),
    new THREE.Vector2(0.438, 0.700),
    new THREE.Vector2(0.428, 0.570),
    new THREE.Vector2(0.410, 0.440),
    new THREE.Vector2(0.380, 0.320),
    new THREE.Vector2(0.340, 0.230),
    new THREE.Vector2(0.280, 0.180),
    new THREE.Vector2(0.000, 0.180),
  ];
  const cup_bodyGeom = new THREE.LatheGeometry(cup_bodyProfile, 64);
  const cup_body = new THREE.Mesh(cup_bodyGeom, cup_bodyMat);
  cup_body.name = "cup_body";
  cup_assembly.add(cup_body);

  const inner_bowlProfile = [
    new THREE.Vector2(0.000, 0.184),
    new THREE.Vector2(0.275, 0.184),
    new THREE.Vector2(0.333, 0.230),
    new THREE.Vector2(0.373, 0.320),
    new THREE.Vector2(0.403, 0.440),
    new THREE.Vector2(0.421, 0.570),
    new THREE.Vector2(0.431, 0.700),
    new THREE.Vector2(0.436, 0.810),
    new THREE.Vector2(0.447, 0.833),
  ];
  const inner_bowlGeom = new THREE.LatheGeometry(inner_bowlProfile, 64);
  const inner_bowl = new THREE.Mesh(inner_bowlGeom, inner_bowlMat);
  inner_bowl.name = "inner_bowl";
  cup_assembly.add(inner_bowl);

  const top_rimMat = inner_bowlMat;
  const top_rimGeom = new THREE.TorusGeometry(0.470, 0.024, 12, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, top_rimMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 0.837;
  cup_assembly.add(top_rim);

  const outer_rim_accentMat = cup_bodyMat;
  const outer_rim_accentGeom = new THREE.TorusGeometry(0.492, 0.010, 10, 64);
  const outer_rim_accent = new THREE.Mesh(
    outer_rim_accentGeom,
    outer_rim_accentMat
  );
  outer_rim_accent.name = "outer_rim_accent";
  outer_rim_accent.rotation.x = Math.PI / 2;
  outer_rim_accent.position.y = 0.821;
  cup_assembly.add(outer_rim_accent);

  const base_footGeom = new THREE.CylinderGeometry(
    0.330,
    0.340,
    0.070,
    64
  );
  const base_foot = new THREE.Mesh(base_footGeom, base_footMat);
  base_foot.name = "base_foot";
  base_foot.position.y = 0.075;
  cup_assembly.add(base_foot);

  const base_foot_ringMat = base_footMat;
  const base_foot_ringGeom = new THREE.TorusGeometry(0.320, 0.018, 10, 64);
  const base_foot_ring = new THREE.Mesh(
    base_foot_ringGeom,
    base_foot_ringMat
  );
  base_foot_ring.name = "base_foot_ring";
  base_foot_ring.rotation.x = Math.PI / 2;
  base_foot_ring.position.y = 0.108;
  cup_assembly.add(base_foot_ring);

  const base_trimGeom = new THREE.TorusGeometry(0.326, 0.009, 8, 64);
  const base_trim = new THREE.Mesh(base_trimGeom, base_trimMat);
  base_trim.name = "base_trim";
  base_trim.rotation.x = Math.PI / 2;
  base_trim.position.y = 0.039;
  cup_assembly.add(base_trim);

  const handlePath = [
    new THREE.Vector3(0.465, 0.695, 0.000),
    new THREE.Vector3(0.565, 0.770, 0.000),
    new THREE.Vector3(0.710, 0.785, 0.000),
    new THREE.Vector3(0.835, 0.705, 0.000),
    new THREE.Vector3(0.890, 0.555, 0.000),
    new THREE.Vector3(0.855, 0.405, 0.000),
    new THREE.Vector3(0.735, 0.285, 0.000),
    new THREE.Vector3(0.585, 0.205, 0.000),
    new THREE.Vector3(0.455, 0.235, 0.000),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePath,
    false,
    "centripetal",
    0.5
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    72,
    0.057,
    16,
    false
  );
  const handleMat = cup_bodyMat;
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  cup_assembly.add(handle);

  const handle_mountGeom = new THREE.SphereGeometry(0.075, 24, 14);

  const handle_upper_mountMat = cup_bodyMat;
  const handle_upper_mount = new THREE.Mesh(
    handle_mountGeom,
    handle_upper_mountMat
  );
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.position.set(0.475, 0.690, 0);
  handle_upper_mount.scale.set(0.95, 0.72, 1.05);
  cup_assembly.add(handle_upper_mount);

  const handle_lower_mountMat = cup_bodyMat;
  const handle_lower_mount = new THREE.Mesh(
    handle_mountGeom,
    handle_lower_mountMat
  );
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.position.set(0.455, 0.240, 0);
  handle_lower_mount.scale.set(0.92, 0.72, 1.05);
  cup_assembly.add(handle_lower_mount);

  const floral_decoration = new THREE.Group();
  floral_decoration.name = "floral_decoration";
  cup_assembly.add(floral_decoration);

  function cupRadiusAt(y) {
    if (y <= 0.165) return 0.370;
    if (y <= 0.300) {
      return 0.370 + ((y - 0.165) / 0.135) * 0.070;
    }
    if (y <= 0.520) {
      return 0.440 + ((y - 0.300) / 0.220) * 0.047;
    }
    if (y <= 0.775) {
      return 0.487 + ((y - 0.520) / 0.255) * 0.011;
    }
    return 0.498;
  }

  function surfacePoint(angle, y, extra) {
    const radius = cupRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function surfaceQuaternion(angle) {
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }

  function addSurfaceVine(name, controls, radius) {
    const points = [];
    for (let i = 0; i < controls.length; i++) {
      points.push(surfacePoint(controls[i][0], controls[i][1], 0.008));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal",
      0.5
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(18, (points.length - 1) * 8),
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, floral_outlineMat);
    mesh.name = name;
    floral_decoration.add(mesh);
    return mesh;
  }

  const main_vine = addSurfaceVine(
    "main_vine",
    [
      [2.18, 0.185],
      [1.96, 0.205],
      [1.72, 0.220],
      [1.48, 0.270],
      [1.25, 0.355],
      [1.05, 0.465],
      [0.86, 0.600],
    ],
    0.0042
  );

  const left_vine = addSurfaceVine(
    "left_vine",
    [
      [1.98, 0.205],
      [2.18, 0.315],
      [2.36, 0.455],
      [2.50, 0.610],
      [2.55, 0.720],
    ],
    0.0040
  );

  const middle_branch = addSurfaceVine(
    "middle_branch",
    [
      [1.72, 0.220],
      [1.86, 0.315],
      [1.96, 0.425],
      [2.00, 0.500],
    ],
    0.0038
  );

  const center_branch = addSurfaceVine(
    "center_branch",
    [
      [1.48, 0.270],
      [1.54, 0.355],
      [1.55, 0.430],
    ],
    0.0038
  );

  const right_branch = addSurfaceVine(
    "right_branch",
    [
      [1.25, 0.355],
      [1.02, 0.385],
      [0.78, 0.430],
      [0.56, 0.515],
    ],
    0.0038
  );

  const upper_branch = addSurfaceVine(
    "upper_branch",
    [
      [1.05, 0.465],
      [1.17, 0.555],
      [1.27, 0.645],
    ],
    0.0036
  );

  const far_left_branch = addSurfaceVine(
    "far_left_branch",
    [
      [2.36, 0.455],
      [2.58, 0.500],
      [2.70, 0.565],
    ],
    0.0036
  );

  const flowerSpecs = [
    { angle: 2.36, y: 0.455, size: 0.070 },
    { angle: 2.00, y: 0.500, size: 0.055 },
    { angle: 1.55, y: 0.430, size: 0.065 },
    { angle: 1.27, y: 0.645, size: 0.067 },
    { angle: 0.56, y: 0.515, size: 0.052 },
    { angle: 0.78, y: 0.430, size: 0.045 },
    { angle: 1.88, y: 0.245, size: 0.043 },
  ];

  const floral_petalsGeom = new THREE.CircleGeometry(1, 18);
  const floral_petals_outline = new THREE.InstancedMesh(
    floral_petalsGeom,
    floral_outlineMat,
    flowerSpecs.length * 5
  );
  floral_petals_outline.name = "floral_petals_outline";

  const floral_petals_fill = new THREE.InstancedMesh(
    floral_petalsGeom,
    floral_fillMat,
    flowerSpecs.length * 5
  );
  floral_petals_fill.name = "floral_petals_fill";

  const floral_centersGeom = new THREE.CircleGeometry(1, 18);
  const floral_centers = new THREE.InstancedMesh(
    floral_centersGeom,
    floral_centerMat,
    flowerSpecs.length
  );
  floral_centers.name = "floral_centers";

  const petal_dummy = new THREE.Object3D();
  let petalIndex = 0;

  for (let f = 0; f < flowerSpecs.length; f++) {
    const flower = flowerSpecs[f];

    for (let i = 0; i < 5; i++) {
      const petalAngle = (i / 5) * Math.PI * 2;
      const localX = Math.cos(petalAngle) * flower.size * 0.43;
      const localY = Math.sin(petalAngle) * flower.size * 0.43;
      const localRadius = cupRadiusAt(flower.y);
      const surfaceAngle = flower.angle - localX / localRadius;

      petal_dummy.position.copy(
        surfacePoint(surfaceAngle, flower.y + localY, 0.008)
      );
      petal_dummy.quaternion.copy(surfaceQuaternion(surfaceAngle));
      petal_dummy.rotateZ(petalAngle);
      petal_dummy.scale.set(
        flower.size * 0.48,
        flower.size * 0.255,
        1
      );
      petal_dummy.updateMatrix();
      floral_petals_outline.setMatrixAt(petalIndex, petal_dummy.matrix);

      petal_dummy.position.copy(
        surfacePoint(surfaceAngle, flower.y + localY, 0.010)
      );
      petal_dummy.quaternion.copy(surfaceQuaternion(surfaceAngle));
      petal_dummy.rotateZ(petalAngle);
      petal_dummy.scale.set(
        flower.size * 0.425,
        flower.size * 0.215,
        1
      );
      petal_dummy.updateMatrix();
      floral_petals_fill.setMatrixAt(petalIndex, petal_dummy.matrix);

      petalIndex++;
    }

    petal_dummy.position.copy(
      surfacePoint(flower.angle, flower.y, 0.011)
    );
    petal_dummy.quaternion.copy(surfaceQuaternion(flower.angle));
    petal_dummy.scale.set(
      flower.size * 0.205,
      flower.size * 0.205,
      1
    );
    petal_dummy.updateMatrix();
    floral_centers.setMatrixAt(f, petal_dummy.matrix);
  }

  floral_petals_outline.instanceMatrix.needsUpdate = true;
  floral_petals_fill.instanceMatrix.needsUpdate = true;
  floral_centers.instanceMatrix.needsUpdate = true;
  floral_decoration.add(
    floral_petals_outline,
    floral_petals_fill,
    floral_centers
  );

  const leafShape = new THREE.Shape();
  leafShape.moveTo(-1.0, 0.0);
  leafShape.bezierCurveTo(-0.45, 0.62, 0.45, 0.62, 1.0, 0.0);
  leafShape.bezierCurveTo(0.45, -0.62, -0.45, -0.62, -1.0, 0.0);

  const leafSpecs = [
    { angle: 2.55, y: 0.690, size: 0.040, rotation: 0.85 },
    { angle: 2.47, y: 0.610, size: 0.037, rotation: -0.72 },
    { angle: 2.28, y: 0.545, size: 0.038, rotation: 0.62 },
    { angle: 2.58, y: 0.500, size: 0.035, rotation: -0.68 },
    { angle: 2.25, y: 0.365, size: 0.038, rotation: 0.72 },
    { angle: 2.10, y: 0.300, size: 0.035, rotation: -0.70 },
    { angle: 1.96, y: 0.380, size: 0.036, rotation: 0.82 },
    { angle: 1.84, y: 0.315, size: 0.037, rotation: -0.65 },
    { angle: 1.72, y: 0.270, size: 0.035, rotation: 0.72 },
    { angle: 1.52, y: 0.345, size: 0.039, rotation: 0.92 },
    { angle: 1.38, y: 0.330, size: 0.037, rotation: -0.72 },
    { angle: 1.18, y: 0.405, size: 0.038, rotation: 0.70 },
    { angle: 1.10, y: 0.535, size: 0.037, rotation: -0.72 },
    { angle: 0.95, y: 0.555, size: 0.038, rotation: 0.72 },
    { angle: 0.82, y: 0.465, size: 0.036, rotation: -0.70 },
    { angle: 0.68, y: 0.430, size: 0.034, rotation: 0.72 },
    { angle: 2.68, y: 0.570, size: 0.033, rotation: -0.62 },
    { angle: 2.72, y: 0.650, size: 0.032, rotation: 0.72 },
  ];

  const floral_leavesGeom = new THREE.ShapeGeometry(leafShape, 12);
  const floral_leaves_outline = new THREE.InstancedMesh(
    floral_leavesGeom,
    floral_outlineMat,
    leafSpecs.length
  );
  floral_leaves_outline.name = "floral_leaves_outline";

  const floral_leaves_fill = new THREE.InstancedMesh(
    floral_leavesGeom,
    floral_fillMat,
    leafSpecs.length
  );
  floral_leaves_fill.name = "floral_leaves_fill";

  const leaf_dummy = new THREE.Object3D();

  for (let i = 0; i < leafSpecs.length; i++) {
    const leaf = leafSpecs[i];

    leaf_dummy.position.copy(
      surfacePoint(leaf.angle, leaf.y, 0.008)
    );
    leaf_dummy.quaternion.copy(surfaceQuaternion(leaf.angle));
    leaf_dummy.rotateZ(leaf.rotation);
    leaf_dummy.scale.set(leaf.size, leaf.size * 0.48, 1);
    leaf_dummy.updateMatrix();
    floral_leaves_outline.setMatrixAt(i, leaf_dummy.matrix);

    leaf_dummy.position.copy(
      surfacePoint(leaf.angle, leaf.y, 0.010)
    );
    leaf_dummy.quaternion.copy(surfaceQuaternion(leaf.angle));
    leaf_dummy.rotateZ(leaf.rotation);
    leaf_dummy.scale.set(leaf.size * 0.84, leaf.size * 0.39, 1);
    leaf_dummy.updateMatrix();
    floral_leaves_fill.setMatrixAt(i, leaf_dummy.matrix);
  }

  floral_leaves_outline.instanceMatrix.needsUpdate = true;
  floral_leaves_fill.instanceMatrix.needsUpdate = true;
  floral_decoration.add(floral_leaves_outline, floral_leaves_fill);

  const budSpecs = [
    { angle: 2.55, y: 0.720, size: 0.026, rotation: 0.82 },
    { angle: 2.70, y: 0.565, size: 0.023, rotation: -0.62 },
    { angle: 2.00, y: 0.535, size: 0.022, rotation: 0.72 },
    { angle: 1.72, y: 0.220, size: 0.022, rotation: -0.72 },
    { angle: 0.86, y: 0.600, size: 0.025, rotation: 0.72 },
    { angle: 0.56, y: 0.545, size: 0.022, rotation: -0.68 },
  ];

  const floral_buds_outline = new THREE.InstancedMesh(
    floral_leavesGeom,
    floral_outlineMat,
    budSpecs.length
  );
  floral_buds_outline.name = "floral_buds_outline";

  const floral_buds_fill = new THREE.InstancedMesh(
    floral_leavesGeom,
    floral_fillMat,
    budSpecs.length
  );
  floral_buds_fill.name = "floral_buds_fill";

  const bud_dummy = new THREE.Object3D();

  for (let i = 0; i < budSpecs.length; i++) {
    const bud = budSpecs[i];

    bud_dummy.position.copy(
      surfacePoint(bud.angle, bud.y, 0.008)
    );
    bud_dummy.quaternion.copy(surfaceQuaternion(bud.angle));
    bud_dummy.rotateZ(bud.rotation);
    bud_dummy.scale.set(bud.size, bud.size * 0.50, 1);
    bud_dummy.updateMatrix();
    floral_buds_outline.setMatrixAt(i, bud_dummy.matrix);

    bud_dummy.position.copy(
      surfacePoint(bud.angle, bud.y, 0.010)
    );
    bud_dummy.quaternion.copy(surfaceQuaternion(bud.angle));
    bud_dummy.rotateZ(bud.rotation);
    bud_dummy.scale.set(bud.size * 0.83, bud.size * 0.40, 1);
    bud_dummy.updateMatrix();
    floral_buds_fill.setMatrixAt(i, bud_dummy.matrix);
  }

  floral_buds_outline.instanceMatrix.needsUpdate = true;
  floral_buds_fill.instanceMatrix.needsUpdate = true;
  floral_decoration.add(floral_buds_outline, floral_buds_fill);

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