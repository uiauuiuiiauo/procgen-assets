export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_vase_with_roses";

  const vase_group = new THREE.Group();
  vase_group.name = "vase_group";
  root.add(vase_group);

  const bouquet_group = new THREE.Group();
  bouquet_group.name = "bouquet_group";
  root.add(bouquet_group);

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const vase_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const vase_openingMat = new THREE.MeshStandardMaterial({
    color: 0x263126,
    metalness: 0.0,
    roughness: 0.9
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x31542b,
    metalness: 0.0,
    roughness: 0.9
  });

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x3f6b35,
    metalness: 0.0,
    roughness: 0.85
  });

  const rose_outerMat = new THREE.MeshStandardMaterial({
    color: 0xf1efe7,
    metalness: 0.0,
    roughness: 0.95
  });

  const rose_middleMat = new THREE.MeshStandardMaterial({
    color: 0xe8e2d5,
    metalness: 0.0,
    roughness: 0.95
  });

  const rose_innerMat = new THREE.MeshStandardMaterial({
    color: 0xd9cfb8,
    metalness: 0.0,
    roughness: 0.95
  });

  const vase_profile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.335, 0.000),
    new THREE.Vector2(0.385, 0.012),
    new THREE.Vector2(0.415, 0.035),
    new THREE.Vector2(0.420, 0.058),
    new THREE.Vector2(0.405, 0.082),
    new THREE.Vector2(0.365, 0.105),
    new THREE.Vector2(0.330, 0.120),
    new THREE.Vector2(0.305, 0.145),
    new THREE.Vector2(0.282, 0.180),
    new THREE.Vector2(0.255, 0.225),
    new THREE.Vector2(0.245, 0.255),
    new THREE.Vector2(0.260, 0.278),
    new THREE.Vector2(0.292, 0.300),
    new THREE.Vector2(0.305, 0.325),
    new THREE.Vector2(0.292, 0.350),
    new THREE.Vector2(0.267, 0.372),
    new THREE.Vector2(0.252, 0.392),
    new THREE.Vector2(0.270, 0.418),
    new THREE.Vector2(0.315, 0.455),
    new THREE.Vector2(0.355, 0.515),
    new THREE.Vector2(0.390, 0.600),
    new THREE.Vector2(0.412, 0.700),
    new THREE.Vector2(0.415, 0.800),
    new THREE.Vector2(0.400, 0.900),
    new THREE.Vector2(0.365, 0.995),
    new THREE.Vector2(0.320, 1.070),
    new THREE.Vector2(0.270, 1.125),
    new THREE.Vector2(0.225, 1.165),
    new THREE.Vector2(0.200, 1.190),
    new THREE.Vector2(0.197, 1.210),
    new THREE.Vector2(0.000, 1.210)
  ];

  const vase_bodyGeom = new THREE.LatheGeometry(vase_profile, 64);
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  vase_body.name = "vase_body";
  vase_group.add(vase_body);

  const base_lower_ringGeom = new THREE.TorusGeometry(0.386, 0.017, 12, 64);
  const base_lower_ring = new THREE.Mesh(base_lower_ringGeom, vase_bodyMat);
  base_lower_ring.name = "base_lower_ring";
  base_lower_ring.rotation.x = Math.PI / 2;
  base_lower_ring.position.y = 0.052;
  vase_group.add(base_lower_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(0.340, 0.010, 10, 64);
  const base_upper_ring = new THREE.Mesh(base_upper_ringGeom, vase_bodyMat);
  base_upper_ring.name = "base_upper_ring";
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = 0.112;
  vase_group.add(base_upper_ring);

  const base_grooveGeom = new THREE.TorusGeometry(0.350, 0.006, 8, 64);
  const base_groove = new THREE.Mesh(base_grooveGeom, vase_shadowMat);
  base_groove.name = "base_groove";
  base_groove.rotation.x = Math.PI / 2;
  base_groove.position.y = 0.126;
  vase_group.add(base_groove);

  const pedestal_collarGeom = new THREE.TorusGeometry(0.282, 0.012, 10, 64);
  const pedestal_collar = new THREE.Mesh(pedestal_collarGeom, vase_bodyMat);
  pedestal_collar.name = "pedestal_collar";
  pedestal_collar.rotation.x = Math.PI / 2;
  pedestal_collar.position.y = 0.296;
  vase_group.add(pedestal_collar);

  const pedestal_grooveGeom = new THREE.TorusGeometry(0.272, 0.006, 8, 64);
  const pedestal_groove = new THREE.Mesh(pedestal_grooveGeom, vase_shadowMat);
  pedestal_groove.name = "pedestal_groove";
  pedestal_groove.rotation.x = Math.PI / 2;
  pedestal_groove.position.y = 0.344;
  vase_group.add(pedestal_groove);

  const upper_collarGeom = new THREE.TorusGeometry(0.263, 0.011, 10, 64);
  const upper_collar = new THREE.Mesh(upper_collarGeom, vase_bodyMat);
  upper_collar.name = "upper_collar";
  upper_collar.rotation.x = Math.PI / 2;
  upper_collar.position.y = 0.374;
  vase_group.add(upper_collar);

  const vase_openingGeom = new THREE.CylinderGeometry(0.183, 0.183, 0.010, 48);
  const vase_opening = new THREE.Mesh(vase_openingGeom, vase_openingMat);
  vase_opening.name = "vase_opening";
  vase_opening.position.y = 1.214;
  vase_group.add(vase_opening);

  const vase_rimGeom = new THREE.TorusGeometry(0.190, 0.012, 12, 64);
  const vase_rim = new THREE.Mesh(vase_rimGeom, vase_bodyMat);
  vase_rim.name = "vase_rim";
  vase_rim.rotation.x = Math.PI / 2;
  vase_rim.position.y = 1.215;
  vase_group.add(vase_rim);

  function createStem(name, points, radius) {
    const stem_curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const stem_geom = new THREE.TubeGeometry(stem_curve, 24, radius, 7, false);
    const stem = new THREE.Mesh(stem_geom, stemMat);
    stem.name = name;
    bouquet_group.add(stem);
    return stem;
  }

  const front_left_stem = createStem("front_left_stem", [
    new THREE.Vector3(-0.055, 1.175, 0.015),
    new THREE.Vector3(-0.085, 1.300, 0.055),
    new THREE.Vector3(-0.165, 1.410, 0.135),
    new THREE.Vector3(-0.230, 1.485, 0.210)
  ], 0.012);

  const front_right_stem = createStem("front_right_stem", [
    new THREE.Vector3(0.050, 1.175, 0.020),
    new THREE.Vector3(0.085, 1.305, 0.065),
    new THREE.Vector3(0.175, 1.420, 0.145),
    new THREE.Vector3(0.240, 1.520, 0.220)
  ], 0.012);

  const center_stem = createStem("center_stem", [
    new THREE.Vector3(0.000, 1.175, -0.035),
    new THREE.Vector3(0.015, 1.350, -0.010),
    new THREE.Vector3(0.020, 1.535, 0.055),
    new THREE.Vector3(0.010, 1.700, 0.120)
  ], 0.013);

  const back_left_stem = createStem("back_left_stem", [
    new THREE.Vector3(-0.065, 1.175, -0.045),
    new THREE.Vector3(-0.120, 1.300, -0.025),
    new THREE.Vector3(-0.225, 1.430, 0.005),
    new THREE.Vector3(-0.340, 1.575, 0.045)
  ], 0.011);

  const back_right_stem = createStem("back_right_stem", [
    new THREE.Vector3(0.065, 1.175, -0.050),
    new THREE.Vector3(0.120, 1.300, -0.025),
    new THREE.Vector3(0.230, 1.430, 0.005),
    new THREE.Vector3(0.340, 1.580, 0.045)
  ], 0.011);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0.000, 0.000);
  leafShape.bezierCurveTo(-0.045, 0.025, -0.095, 0.115, -0.090, 0.185);
  leafShape.bezierCurveTo(-0.080, 0.255, -0.030, 0.315, 0.000, 0.340);
  leafShape.bezierCurveTo(0.030, 0.315, 0.080, 0.255, 0.090, 0.185);
  leafShape.bezierCurveTo(0.095, 0.115, 0.045, 0.025, 0.000, 0.000);

  const leavesGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.008,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.002,
    bevelSize: 0.002,
    bevelSegments: 1
  });

  const leaf_transforms = [
    [-0.105, 1.275, 0.080, -0.10, 0.15, 1.18, 0.88, 0.90],
    [-0.175, 1.365, 0.115, 0.12, -0.20, 0.82, 0.76, 0.82],
    [-0.285, 1.455, 0.075, -0.18, 0.35, 2.18, 0.70, 0.76],
    [0.105, 1.285, 0.085, -0.08, -0.15, -1.14, 0.88, 0.92],
    [0.180, 1.375, 0.120, 0.14, 0.20, -0.82, 0.78, 0.84],
    [0.285, 1.465, 0.075, -0.12, -0.30, -2.14, 0.70, 0.76],
    [-0.020, 1.355, -0.010, 0.18, 0.25, 0.42, 0.78, 0.86],
    [0.030, 1.455, 0.015, -0.12, -0.25, -0.42, 0.74, 0.82],
    [-0.155, 1.485, -0.015, 0.20, 0.10, 1.55, 0.66, 0.72],
    [0.155, 1.490, -0.010, 0.16, -0.10, -1.55, 0.66, 0.72],
    [-0.330, 1.510, 0.010, 0.08, 0.30, 2.65, 0.58, 0.64],
    [0.330, 1.515, 0.010, 0.08, -0.25, -2.65, 0.58, 0.64]
  ];

  const leaves = new THREE.InstancedMesh(
    leavesGeom,
    leafMat,
    leaf_transforms.length
  );
  leaves.name = "leaves";

  const leaf_dummy = new THREE.Object3D();
  for (let i = 0; i < leaf_transforms.length; i++) {
    const t = leaf_transforms[i];
    leaf_dummy.position.set(t[0], t[1], t[2]);
    leaf_dummy.rotation.set(t[3], t[4], t[5]);
    leaf_dummy.scale.set(t[6], t[7], 1);
    leaf_dummy.updateMatrix();
    leaves.setMatrixAt(i, leaf_dummy.matrix);
  }
  leaves.instanceMatrix.needsUpdate = true;
  bouquet_group.add(leaves);

  const rose_petalShape = new THREE.Shape();
  rose_petalShape.moveTo(0.000, -0.500);
  rose_petalShape.bezierCurveTo(-0.180, -0.470, -0.480, -0.250, -0.500, 0.050);
  rose_petalShape.bezierCurveTo(-0.520, 0.300, -0.300, 0.500, 0.000, 0.540);
  rose_petalShape.bezierCurveTo(0.300, 0.500, 0.520, 0.300, 0.500, 0.050);
  rose_petalShape.bezierCurveTo(0.480, -0.250, 0.180, -0.470, 0.000, -0.500);

  const rose_petalGeom = new THREE.ExtrudeGeometry(rose_petalShape, {
    depth: 0.028,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.012,
    bevelSegments: 2
  });
  rose_petalGeom.translate(0, 0, -0.014);

  const rose_calyxGeom = new THREE.ConeGeometry(0.078, 0.130, 5);
  const rose_centerGeom = new THREE.SphereGeometry(0.030, 12, 8);

  function createPetalRing(name, ring_index, flower_scale, count, radius, width, length, z, tilt, phase, material) {
    const petal_ring = new THREE.InstancedMesh(rose_petalGeom, material, count);
    petal_ring.name = name;

    const petal_dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const angle = phase + i / count * Math.PI * 2;
      const width_variation = 1 + 0.045 * Math.sin((i + 1) * 1.7);
      const length_variation = 1 + 0.040 * Math.cos((i + 1) * 1.3);

      petal_dummy.position.set(
        Math.sin(angle) * radius * flower_scale,
        Math.cos(angle) * radius * flower_scale,
        z * flower_scale
      );
      petal_dummy.rotation.set(
        tilt,
        0,
        -angle + 0.055 * Math.sin((i + 1) * 2.1)
      );
      petal_dummy.scale.set(
        width * flower_scale * width_variation,
        length * flower_scale * length_variation,
        flower_scale
      );
      petal_dummy.updateMatrix();
      petal_ring.setMatrixAt(i, petal_dummy.matrix);
    }

    petal_ring.instanceMatrix.needsUpdate = true;
    return petal_ring;
  }

  function createRose(name, x, y, z, scale, rx, ry, rz) {
    const rose = new THREE.Group();
    rose.name = name;

    const rose_calyx = new THREE.Mesh(rose_calyxGeom, leafMat);
    rose_calyx.name = name + "_calyx";
    rose_calyx.rotation.x = Math.PI / 2;
    rose_calyx.position.z = -0.070 * scale;
    rose.add(rose_calyx);

    const outer_petals = createPetalRing(
      name + "_outer_petals", 0, scale, 8,
      0.070, 0.150, 0.175, 0.000, 0.10, 0.00, rose_outerMat
    );
    rose.add(outer_petals);

    const middle_petals = createPetalRing(
      name + "_middle_petals", 1, scale, 7,
      0.048, 0.130, 0.145, 0.034, 0.27, Math.PI / 7, rose_middleMat
    );
    rose.add(middle_petals);

    const inner_petals = createPetalRing(
      name + "_inner_petals", 2, scale, 5,
      0.024, 0.095, 0.110, 0.066, 0.48, Math.PI / 5, rose_innerMat
    );
    rose.add(inner_petals);

    const rose_center = new THREE.Mesh(rose_centerGeom, rose_innerMat);
    rose_center.name = name + "_center";
    rose_center.position.z = 0.108 * scale;
    rose_center.scale.set(0.80, 1.05, 0.70);
    rose.add(rose_center);

    rose.position.set(x, y, z);
    rose.rotation.set(rx, ry, rz);
    bouquet_group.add(rose);
    return rose;
  }

  const front_left_rose = createRose(
    "front_left_rose",
    -0.230, 1.500, 0.250,
    0.94,
    -0.18, -0.18, -0.12
  );

  const front_right_rose = createRose(
    "front_right_rose",
    0.250, 1.540, 0.255,
    0.90,
    -0.15, 0.20, 0.10
  );

  const center_rose = createRose(
    "center_rose",
    0.010, 1.720, 0.160,
    1.00,
    -0.22, 0.04, -0.04
  );

  const back_left_rose = createRose(
    "back_left_rose",
    -0.350, 1.600, 0.075,
    0.78,
    -0.12, -0.28, -0.18
  );

  const back_right_rose = createRose(
    "back_right_rose",
    0.350, 1.600, 0.075,
    0.78,
    -0.12, 0.28, 0.18
  );

  function fitToUnitCube(root_object) {
    const box = new THREE.Box3().setFromObject(root_object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    root_object.scale.setScalar(scale);
    root_object.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}