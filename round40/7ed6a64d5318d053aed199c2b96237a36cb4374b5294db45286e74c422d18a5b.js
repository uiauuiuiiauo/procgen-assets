export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blueberry_tart";

  const crust_group = new THREE.Group();
  crust_group.name = "crust_group";
  const filling_group = new THREE.Group();
  filling_group.name = "filling_group";
  const fruit_group = new THREE.Group();
  fruit_group.name = "fruit_group";
  root.add(crust_group, filling_group, fruit_group);

  const crustMat = new THREE.MeshStandardMaterial({
    color: 0xf1c36a,
    metalness: 0.0,
    roughness: 0.9
  });
  const crust_rimMat = new THREE.MeshStandardMaterial({
    color: 0xf6ce78,
    metalness: 0.0,
    roughness: 0.9
  });
  const crust_toastMat = new THREE.MeshStandardMaterial({
    color: 0xc9822f,
    metalness: 0.0,
    roughness: 0.9
  });
  const crust_poreMat = new THREE.MeshStandardMaterial({
    color: 0xffd98e,
    metalness: 0.0,
    roughness: 0.9
  });
  const fillingMat = new THREE.MeshPhysicalMaterial({
    color: 0x940b35,
    metalness: 0.0,
    roughness: 0.18,
    transmission: 0.06,
    ior: 1.33,
    transparent: true,
    opacity: 0.98
  });
  const filling_lobeMat = new THREE.MeshPhysicalMaterial({
    color: 0xa50d3d,
    metalness: 0.0,
    roughness: 0.12,
    transmission: 0.08,
    ior: 1.33,
    transparent: true,
    opacity: 0.98
  });
  const blueberryMat = new THREE.MeshStandardMaterial({
    color: 0x35577f,
    metalness: 0.0,
    roughness: 0.7
  });
  const blueberry_calyxMat = new THREE.MeshStandardMaterial({
    color: 0x101b2b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const blueberry_bloomMat = new THREE.MeshStandardMaterial({
    color: 0x8298b1,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const raspberryMat = new THREE.MeshStandardMaterial({
    color: 0xb20e3e,
    metalness: 0.0,
    roughness: 0.4
  });
  const raspberry_drupeletMat = new THREE.MeshStandardMaterial({
    color: 0xcf1748,
    metalness: 0.0,
    roughness: 0.4
  });
  const glaze_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffe3e8,
    metalness: 0.0,
    roughness: 0.3
  });

  const crust_bodyGeom = createFlutedTartGeometry(THREE, 1.34, 1.31, 0.52, 28);
  const crust_body = new THREE.Mesh(crust_bodyGeom, crustMat);
  crust_body.name = "crust_body";
  crust_group.add(crust_body);

  const crust_rim_points = [];
  for (let i = 0; i < 96; i++) {
    const angle = i / 96 * Math.PI * 2;
    const radius =
      1.205 +
      0.018 * Math.sin(angle * 28) +
      0.008 * Math.sin(angle * 14);
    const height =
      0.505 +
      0.018 * Math.sin(angle * 28 + 0.4) +
      0.006 * Math.sin(angle * 7);
    crust_rim_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      )
    );
  }

  const crust_rim_curve = new THREE.CatmullRomCurve3(
    crust_rim_points,
    true,
    "centripetal"
  );
  const crust_rimGeom = new THREE.TubeGeometry(
    crust_rim_curve,
    192,
    0.115,
    10,
    true
  );
  const crust_rim = new THREE.Mesh(crust_rimGeom, crust_rimMat);
  crust_rim.name = "crust_rim";
  crust_group.add(crust_rim);

  const crust_rim_puffsGeom = new THREE.SphereGeometry(1, 14, 9);
  const crust_rim_puffs = new THREE.InstancedMesh(
    crust_rim_puffsGeom,
    crust_rimMat,
    28
  );
  crust_rim_puffs.name = "crust_rim_puffs";

  const puff_matrix = new THREE.Matrix4();
  const puff_position = new THREE.Vector3();
  const puff_quaternion = new THREE.Quaternion();
  const puff_scale = new THREE.Vector3();

  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    const radius = 1.205 + 0.014 * Math.sin(angle * 3);
    puff_position.set(
      Math.cos(angle) * radius,
      0.515 + 0.014 * Math.sin(angle * 5),
      Math.sin(angle) * radius
    );
    puff_quaternion.setFromEuler(
      new THREE.Euler(
        0.04 * Math.sin(angle * 4),
        Math.PI / 2 - angle,
        0.08 * Math.sin(angle * 7)
      )
    );
    puff_scale.set(
      0.16 + 0.025 * (0.5 + 0.5 * Math.sin(angle * 5)),
      0.105 + 0.025 * (0.5 + 0.5 * Math.sin(angle * 9 + 0.5)),
      0.14 + 0.02 * (0.5 + 0.5 * Math.cos(angle * 6))
    );
    puff_matrix.compose(puff_position, puff_quaternion, puff_scale);
    crust_rim_puffs.setMatrixAt(i, puff_matrix);
  }
  crust_rim_puffs.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_rim_puffs);

  const crust_toast_spotsGeom = new THREE.SphereGeometry(1, 8, 5);
  const crust_toast_spots = new THREE.InstancedMesh(
    crust_toast_spotsGeom,
    crust_toastMat,
    44
  );
  crust_toast_spots.name = "crust_toast_spots";

  const toast_matrix = new THREE.Matrix4();
  const toast_position = new THREE.Vector3();
  const toast_quaternion = new THREE.Quaternion();
  const toast_scale = new THREE.Vector3();

  for (let i = 0; i < 44; i++) {
    const angle = i * 2.3999632297;
    if (i < 28) {
      const radius = 1.205 + 0.02 * Math.sin(angle * 3);
      toast_position.set(
        Math.cos(angle) * radius,
        0.626 + 0.012 * Math.sin(angle * 5),
        Math.sin(angle) * radius
      );
      toast_quaternion.setFromEuler(
        new THREE.Euler(0, Math.PI / 2 - angle, 0)
      );
      toast_scale.set(
        0.025 + 0.018 * (0.5 + 0.5 * Math.sin(angle * 8)),
        0.006,
        0.018 + 0.012 * (0.5 + 0.5 * Math.cos(angle * 6))
      );
    } else {
      const j = i - 28;
      const y = 0.08 + (j % 6) * 0.067;
      const t = y / 0.52;
      const radius = 1.34 - 0.03 * t + 0.025 * t * t + 0.006;
      toast_position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      );
      toast_quaternion.setFromEuler(
        new THREE.Euler(0, Math.PI / 2 - angle, 0)
      );
      toast_scale.set(
        0.025 + 0.018 * (0.5 + 0.5 * Math.sin(angle * 7)),
        0.012 + 0.009 * (0.5 + 0.5 * Math.cos(angle * 5)),
        0.005
      );
    }
    toast_matrix.compose(toast_position, toast_quaternion, toast_scale);
    crust_toast_spots.setMatrixAt(i, toast_matrix);
  }
  crust_toast_spots.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_toast_spots);

  const crust_poresGeom = new THREE.SphereGeometry(1, 7, 5);
  const crust_pores = new THREE.InstancedMesh(
    crust_poresGeom,
    crust_poreMat,
    72
  );
  crust_pores.name = "crust_pores";

  const pore_matrix = new THREE.Matrix4();
  const pore_position = new THREE.Vector3();
  const pore_quaternion = new THREE.Quaternion();
  const pore_scale = new THREE.Vector3();

  for (let i = 0; i < 72; i++) {
    const angle = i * 2.3999632297 + 0.37;
    const y = 0.055 + ((i * 11) % 37) / 37 * 0.39;
    const t = y / 0.52;
    const radius = 1.34 - 0.03 * t + 0.025 * t * t + 0.009;
    pore_position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    pore_quaternion.setFromEuler(
      new THREE.Euler(0, Math.PI / 2 - angle, 0)
    );
    pore_scale.set(
      0.012 + 0.012 * (0.5 + 0.5 * Math.sin(angle * 9)),
      0.007 + 0.007 * (0.5 + 0.5 * Math.cos(angle * 7)),
      0.0035
    );
    pore_matrix.compose(pore_position, pore_quaternion, pore_scale);
    crust_pores.setMatrixAt(i, pore_matrix);
  }
  crust_pores.instanceMatrix.needsUpdate = true;
  crust_group.add(crust_pores);

  const filling_baseGeom = new THREE.CylinderGeometry(1.12, 1.12, 0.1, 64);
  const filling_base = new THREE.Mesh(filling_baseGeom, fillingMat);
  filling_base.name = "filling_base";
  filling_base.position.y = 0.45;
  filling_group.add(filling_base);

  const filling_surfaceGeom = new THREE.SphereGeometry(1, 64, 24);
  const filling_surface = new THREE.Mesh(filling_surfaceGeom, fillingMat);
  filling_surface.name = "filling_surface";
  filling_surface.position.y = 0.49;
  filling_surface.scale.set(1.1, 0.13, 1.1);
  filling_group.add(filling_surface);

  const filling_lobesGeom = new THREE.SphereGeometry(1, 24, 12);
  const filling_lobes = new THREE.InstancedMesh(
    filling_lobesGeom,
    filling_lobeMat,
    11
  );
  filling_lobes.name = "filling_lobes";

  const lobe_matrix = new THREE.Matrix4();
  const lobe_position = new THREE.Vector3();
  const lobe_quaternion = new THREE.Quaternion();
  const lobe_scale = new THREE.Vector3();

  for (let i = 0; i < 11; i++) {
    const angle = i * 2.3999632297 + 0.3;
    const radius = 0.18 + 0.62 * ((i % 4) / 3);
    lobe_position.set(
      Math.cos(angle) * radius,
      0.56 + 0.008 * Math.sin(angle * 5),
      Math.sin(angle) * radius
    );
    lobe_quaternion.setFromEuler(
      new THREE.Euler(0, angle * 0.7, 0.08 * Math.sin(angle * 3))
    );
    lobe_scale.set(
      0.25 + 0.08 * (0.5 + 0.5 * Math.sin(angle * 4)),
      0.075 + 0.025 * (0.5 + 0.5 * Math.cos(angle * 7)),
      0.22 + 0.07 * (0.5 + 0.5 * Math.cos(angle * 5))
    );
    lobe_matrix.compose(lobe_position, lobe_quaternion, lobe_scale);
    filling_lobes.setMatrixAt(i, lobe_matrix);
  }
  filling_lobes.instanceMatrix.needsUpdate = true;
  filling_group.add(filling_lobes);

  const blueberry_data = [
    [-0.38, -0.88, 0.21],
    [0.18, -0.88, 0.22],
    [0.58, -0.72, 0.21],
    [-0.78, -0.62, 0.22],
    [-0.38, -0.48, 0.23],
    [0.78, -0.42, 0.22],
    [-0.68, -0.18, 0.22],
    [-0.08, -0.22, 0.24],
    [0.40, -0.25, 0.22],
    [-0.88, 0.18, 0.23],
    [-0.45, 0.18, 0.22],
    [0.08, 0.10, 0.22],
    [0.68, 0.15, 0.23],
    [-0.72, 0.55, 0.22],
    [-0.28, 0.58, 0.23],
    [0.32, 0.55, 0.22],
    [0.72, 0.60, 0.23],
    [-0.48, 0.88, 0.22],
    [0.00, 0.86, 0.23],
    [0.48, 0.84, 0.22]
  ];

  const blueberry_x_factors = [
    1.05, 0.94, 1.08, 0.97, 1.02,
    0.92, 1.07, 0.96, 1.03, 0.95,
    1.08, 0.93, 1.02, 0.98, 1.06,
    0.94, 1.04, 0.96, 1.07, 0.99
  ];
  const blueberry_z_factors = [
    0.94, 1.06, 0.97, 1.03, 0.95,
    1.08, 0.93, 1.04, 0.96, 1.05,
    0.98, 1.07, 0.95, 1.03, 0.92,
    1.06, 0.97, 1.04, 0.95, 1.02
  ];
  const blueberry_y_factors = [
    1.00, 0.93, 1.06, 0.97, 1.02,
    0.95, 1.08, 0.98, 1.04, 0.96,
    1.03, 0.94, 1.06, 0.98, 1.01,
    0.95, 1.05, 0.97, 1.03, 0.99
  ];

  const blueberry_fruitsGeom = new THREE.SphereGeometry(1, 24, 16);
  const blueberry_fruits = new THREE.InstancedMesh(
    blueberry_fruitsGeom,
    blueberryMat,
    blueberry_data.length
  );
  blueberry_fruits.name = "blueberry_fruits";

  const fruit_matrix = new THREE.Matrix4();
  const fruit_position = new THREE.Vector3();
  const fruit_quaternion = new THREE.Quaternion();
  const fruit_scale = new THREE.Vector3();

  for (let i = 0; i < blueberry_data.length; i++) {
    const data = blueberry_data[i];
    const radius = data[2];
    const sx = radius * blueberry_x_factors[i];
    const sy = radius * blueberry_y_factors[i];
    const sz = radius * blueberry_z_factors[i];
    fruit_position.set(data[0], 0.59 + sy * 0.35, data[1]);
    fruit_quaternion.setFromEuler(
      new THREE.Euler(
        0.04 * Math.sin(i * 1.7),
        i * 0.61,
        0.035 * Math.cos(i * 1.3)
      )
    );
    fruit_scale.set(sx, sy, sz);
    fruit_matrix.compose(fruit_position, fruit_quaternion, fruit_scale);
    blueberry_fruits.setMatrixAt(i, fruit_matrix);
  }
  blueberry_fruits.instanceMatrix.needsUpdate = true;
  fruit_group.add(blueberry_fruits);

  const blueberry_calyxShape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i / 10 * Math.PI * 2;
    const radius = i % 2 === 0 ? 1 : 0.4;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      blueberry_calyxShape.moveTo(x, y);
    } else {
      blueberry_calyxShape.lineTo(x, y);
    }
  }
  blueberry_calyxShape.closePath();

  const blueberry_calyxesGeom = new THREE.ShapeGeometry(
    blueberry_calyxShape
  );
  blueberry_calyxesGeom.rotateX(-Math.PI / 2);

  const blueberry_calyxes = new THREE.InstancedMesh(
    blueberry_calyxesGeom,
    blueberry_calyxMat,
    blueberry_data.length
  );
  blueberry_calyxes.name = "blueberry_calyxes";

  const blueberry_dimplesGeom = new THREE.CylinderGeometry(1, 1, 1, 12);
  const blueberry_dimples = new THREE.InstancedMesh(
    blueberry_dimplesGeom,
    blueberry_calyxMat,
    blueberry_data.length
  );
  blueberry_dimples.name = "blueberry_dimples";

  const calyx_matrix = new THREE.Matrix4();
  const calyx_position = new THREE.Vector3();
  const calyx_quaternion = new THREE.Quaternion();
  const calyx_scale = new THREE.Vector3();
  const dimple_matrix = new THREE.Matrix4();
  const dimple_position = new THREE.Vector3();
  const dimple_scale = new THREE.Vector3();

  for (let i = 0; i < blueberry_data.length; i++) {
    const data = blueberry_data[i];
    const radius = data[2];
    const sx = radius * blueberry_x_factors[i];
    const sy = radius * blueberry_y_factors[i];
    const sz = radius * blueberry_z_factors[i];
    const centerY = 0.59 + sy * 0.35;
    const topY = centerY + sy;
    calyx_position.set(data[0], topY + 0.004, data[1]);
    calyx_quaternion.setFromEuler(
      new THREE.Euler(0, i * 0.73, 0)
    );
    calyx_scale.set(radius * 0.34, 1, radius * 0.34);
    calyx_matrix.compose(calyx_position, calyx_quaternion, calyx_scale);
    blueberry_calyxes.setMatrixAt(i, calyx_matrix);

    dimple_position.set(data[0], topY + 0.001, data[1]);
    dimple_scale.set(radius * 0.11, 0.006, radius * 0.11);
    dimple_matrix.compose(
      dimple_position,
      new THREE.Quaternion(),
      dimple_scale
    );
    blueberry_dimples.setMatrixAt(i, dimple_matrix);
  }
  blueberry_calyxes.instanceMatrix.needsUpdate = true;
  blueberry_dimples.instanceMatrix.needsUpdate = true;
  fruit_group.add(blueberry_calyxes, blueberry_dimples);

  const bloom_indices = [
    0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 13, 14, 15, 17, 18
  ];
  const blueberry_bloom_spotsGeom = new THREE.CircleGeometry(1, 12);
  const blueberry_bloom_spots = new THREE.InstancedMesh(
    blueberry_bloom_spotsGeom,
    blueberry_bloomMat,
    bloom_indices.length
  );
  blueberry_bloom_spots.name = "blueberry_bloom_spots";

  const bloom_matrix = new THREE.Matrix4();
  const bloom_position = new THREE.Vector3();
  const bloom_normal = new THREE.Vector3();
  const bloom_quaternion = new THREE.Quaternion();
  const bloom_scale = new THREE.Vector3();
  const bloom_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < bloom_indices.length; i++) {
    const index = bloom_indices[i];
    const data = blueberry_data[index];
    const radius = data[2];
    const sx = radius * blueberry_x_factors[index];
    const sy = radius * blueberry_y_factors[index];
    const sz = radius * blueberry_z_factors[index];
    const centerY = 0.59 + sy * 0.35;
    bloom_normal.set(
      0.28 * Math.sin(index * 1.9),
      0.35 + 0.12 * (0.5 + 0.5 * Math.cos(index * 1.4)),
      0.82
    ).normalize();
    bloom_position.set(
      data[0] + bloom_normal.x * sx * 0.88,
      centerY + bloom_normal.y * sy * 0.88,
      data[1] + bloom_normal.z * sz * 0.88
    );
    bloom_quaternion.setFromUnitVectors(bloom_forward, bloom_normal);
    const spot = radius * (0.13 + 0.04 * (0.5 + 0.5 * Math.sin(index * 2.2)));
    bloom_scale.set(spot, spot * 0.65, 1);
    bloom_matrix.compose(bloom_position, bloom_quaternion, bloom_scale);
    blueberry_bloom_spots.setMatrixAt(i, bloom_matrix);
  }
  blueberry_bloom_spots.instanceMatrix.needsUpdate = true;
  fruit_group.add(blueberry_bloom_spots);

  const raspberry_data = [
    [0.00, -0.62, 0.24],
    [0.62, -0.02, 0.23],
    [-0.38, 0.08, 0.22],
    [-0.08, 0.38, 0.23],
    [0.40, 0.35, 0.24]
  ];

  const raspberry_coresGeom = new THREE.SphereGeometry(1, 20, 13);
  const raspberry_cores = new THREE.InstancedMesh(
    raspberry_coresGeom,
    raspberryMat,
    raspberry_data.length
  );
  raspberry_cores.name = "raspberry_cores";

  const raspberry_matrix = new THREE.Matrix4();
  const raspberry_position = new THREE.Vector3();
  const raspberry_scale = new THREE.Vector3();

  for (let i = 0; i < raspberry_data.length; i++) {
    const data = raspberry_data[i];
    const radius = data[2];
    raspberry_position.set(data[0], 0.61, data[1]);
    raspberry_scale.set(radius, radius * 0.78, radius);
    raspberry_matrix.compose(
      raspberry_position,
      new THREE.Quaternion(),
      raspberry_scale
    );
    raspberry_cores.setMatrixAt(i, raspberry_matrix);
  }
  raspberry_cores.instanceMatrix.needsUpdate = true;
  fruit_group.add(raspberry_cores);

  const raspberry_drupeletsGeom = new THREE.SphereGeometry(1, 12, 8);
  const raspberry_drupelets = new THREE.InstancedMesh(
    raspberry_drupeletsGeom,
    raspberry_drupeletMat,
    raspberry_data.length * 15
  );
  raspberry_drupelets.name = "raspberry_drupelets";

  const drupelet_matrix = new THREE.Matrix4();
  const drupelet_position = new THREE.Vector3();
  const drupelet_scale = new THREE.Vector3();
  let drupelet_index = 0;

  for (let i = 0; i < raspberry_data.length; i++) {
    const data = raspberry_data[i];
    const radius = data[2];

    for (let j = 0; j < 15; j++) {
      let nx = 0;
      let ny = 1;
      let nz = 0;
      let phi = 0;

      if (j === 1) {
        nx = 1;
        ny = 0;
        nz = 0;
      } else if (j === 2) {
        nx = -1;
        ny = 0;
        nz = 0;
      } else if (j >= 3 && j <= 6) {
        phi = (j - 3) / 4 * Math.PI * 2 + i * 0.31;
        nx = Math.cos(phi);
        ny = 0.22;
        nz = Math.sin(phi);
      } else if (j >= 7) {
        phi = (j - 7) / 8 * Math.PI * 2 + i * 0.39;
        nx = Math.cos(phi);
        ny = -0.38;
        nz = Math.sin(phi);
      }

      drupelet_position.set(
        data[0] + nx * radius * 0.72,
        0.61 + ny * radius * 0.58,
        data[1] + nz * radius * 0.72
      );
      const drupeletRadius =
        radius * (0.28 + 0.035 * (0.5 + 0.5 * Math.sin(i * 2 + j * 1.7)));
      drupelet_scale.setScalar(drupeletRadius);
      drupelet_matrix.compose(
        drupelet_position,
        new THREE.Quaternion(),
        drupelet_scale
      );
      raspberry_drupelets.setMatrixAt(drupelet_index, drupelet_matrix);
      drupelet_index++;
    }
  }
  raspberry_drupelets.instanceMatrix.needsUpdate = true;
  fruit_group.add(raspberry_drupelets);

  const glaze_highlightsGeom = new THREE.SphereGeometry(1, 10, 6);
  const glaze_highlights = new THREE.InstancedMesh(
    glaze_highlightsGeom,
    glaze_highlightMat,
    24
  );
  glaze_highlights.name = "glaze_highlights";

  const highlight_matrix = new THREE.Matrix4();
  const highlight_position = new THREE.Vector3();
  const highlight_quaternion = new THREE.Quaternion();
  const highlight_scale = new THREE.Vector3();

  for (let i = 0; i < 24; i++) {
    const angle = i * 2.3999632297 + 0.45;
    const radius = 0.16 + 0.76 * ((i % 6) / 5);
    highlight_position.set(
      Math.cos(angle) * radius,
      0.65 + 0.008 * Math.sin(angle * 6),
      Math.sin(angle) * radius
    );
    highlight_quaternion.setFromEuler(
      new THREE.Euler(0, angle, 0)
    );
    highlight_scale.set(
      0.025 + 0.025 * (0.5 + 0.5 * Math.sin(angle * 5)),
      0.005,
      0.012 + 0.012 * (0.5 + 0.5 * Math.cos(angle * 7))
    );
    highlight_matrix.compose(
      highlight_position,
      highlight_quaternion,
      highlight_scale
    );
    glaze_highlights.setMatrixAt(i, highlight_matrix);
  }
  glaze_highlights.instanceMatrix.needsUpdate = true;
  filling_group.add(glaze_highlights);

  fitToUnitCube(THREE, root);
  return root;
}

function createFlutedTartGeometry(THREE, topRadius, bottomRadius, height, fluteCount) {
  const angularSegments = fluteCount * 4;
  const verticalSegments = 6;
  const vertices = [];
  const indices = [];

  for (let j = 0; j <= verticalSegments; j++) {
    const t = j / verticalSegments;
    const smoothT = t * t * (3 - 2 * t);
    const baseRadius =
      bottomRadius +
      (topRadius - bottomRadius) * smoothT +
      0.025 * Math.sin(Math.PI * t);

    for (let i = 0; i <= angularSegments; i++) {
      const angle = i / angularSegments * Math.PI * 2;
      const flute =
        0.035 * Math.sin(angle * fluteCount) * (0.45 + 0.55 * t) +
        0.008 * Math.sin(angle * 7 + t * 2) * Math.sin(Math.PI * t);
      const radius = baseRadius + flute;
      vertices.push(
        Math.cos(angle) * radius,
        t * height,
        Math.sin(angle) * radius
      );
    }
  }

  const row = angularSegments + 1;
  for (let j = 0; j < verticalSegments; j++) {
    for (let i = 0; i < angularSegments; i++) {
      const a = j * row + i;
      const b = a + 1;
      const c = a + row;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
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