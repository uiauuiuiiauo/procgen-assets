export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "chocolate_berry_cake";

  const cake_boardMat = new THREE.MeshStandardMaterial({
    color: 0xc7a66b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const cake_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x35140e,
    metalness: 0.0,
    roughness: 0.9,
  });
  const side_poresMat = new THREE.MeshStandardMaterial({
    color: 0x120604,
    metalness: 0.0,
    roughness: 0.95,
  });
  const crumb_flecksMat = new THREE.MeshStandardMaterial({
    color: 0x71341f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const ganacheMat = new THREE.MeshStandardMaterial({
    color: 0x3b1711,
    metalness: 0.0,
    roughness: 0.2,
  });
  const powdered_sugarMat = new THREE.MeshStandardMaterial({
    color: 0xf5f2ea,
    metalness: 0.0,
    roughness: 0.95,
  });
  const raspberryMat = new THREE.MeshStandardMaterial({
    color: 0xd51f35,
    metalness: 0.0,
    roughness: 0.45,
  });
  const blackberryMat = new THREE.MeshStandardMaterial({
    color: 0x17151c,
    metalness: 0.0,
    roughness: 0.4,
  });
  const blueberryMat = new THREE.MeshStandardMaterial({
    color: 0x263950,
    metalness: 0.0,
    roughness: 0.7,
  });
  const blueberry_calyxMat = new THREE.MeshStandardMaterial({
    color: 0x10151d,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const purple_plumMat = new THREE.MeshStandardMaterial({
    color: 0x633451,
    metalness: 0.0,
    roughness: 0.7,
  });
  const plum_dimpleMat = new THREE.MeshStandardMaterial({
    color: 0x2f1b29,
    metalness: 0.0,
    roughness: 0.8,
  });

  const cake_boardGeom = new THREE.CylinderGeometry(1.67, 1.67, 0.04, 64);
  const cake_board = new THREE.Mesh(cake_boardGeom, cake_boardMat);
  cake_board.name = "cake_board";
  cake_board.position.y = 0.02;
  root.add(cake_board);

  const cake_board_rimGeom = new THREE.TorusGeometry(1.645, 0.018, 8, 64);
  const cake_board_rim = new THREE.Mesh(cake_board_rimGeom, cake_boardMat);
  cake_board_rim.name = "cake_board_rim";
  cake_board_rim.rotation.x = Math.PI / 2;
  cake_board_rim.position.y = 0.043;
  root.add(cake_board_rim);

  const cake_bodyGeom = new THREE.CylinderGeometry(1.4, 1.43, 0.96, 64, 3);
  const cake_body = new THREE.Mesh(cake_bodyGeom, cake_bodyMat);
  cake_body.name = "cake_body";
  cake_body.position.y = 0.53;
  root.add(cake_body);

  const dummy = new THREE.Object3D();
  const local_forward = new THREE.Vector3(0, 0, 1);
  const radial_normal = new THREE.Vector3();

  const side_poresGeom = new THREE.SphereGeometry(1, 8, 5);
  const side_pores = new THREE.InstancedMesh(side_poresGeom, side_poresMat, 128);
  side_pores.name = "side_pores";
  for (let i = 0; i < 128; i++) {
    const angle = i * 2.3999632297;
    const fraction = ((i * 43) % 127) / 126;
    const y = 0.1 + fraction * 0.82;
    const radius = 1.426;
    const width = 0.018 + 0.032 * (0.5 + 0.5 * Math.sin(i * 1.71));
    const height = 0.008 + 0.015 * (0.5 + 0.5 * Math.sin(i * 2.27 + 0.4));

    radial_normal.set(Math.cos(angle), 0, Math.sin(angle));
    dummy.position.set(
      radial_normal.x * radius,
      y,
      radial_normal.z * radius
    );
    dummy.quaternion.setFromUnitVectors(local_forward, radial_normal);
    dummy.scale.set(width, height, 0.006);
    dummy.updateMatrix();
    side_pores.setMatrixAt(i, dummy.matrix);
  }
  side_pores.instanceMatrix.needsUpdate = true;
  root.add(side_pores);

  const crumb_flecksGeom = new THREE.IcosahedronGeometry(1, 0);
  const crumb_flecks = new THREE.InstancedMesh(
    crumb_flecksGeom,
    crumb_flecksMat,
    96
  );
  crumb_flecks.name = "crumb_flecks";
  for (let i = 0; i < 96; i++) {
    const angle = i * 2.173 + 0.35;
    const fraction = ((i * 31) % 95) / 94;
    const size = 0.009 + 0.015 * (0.5 + 0.5 * Math.sin(i * 2.63));
    const radius = 1.428;

    dummy.position.set(
      Math.cos(angle) * radius,
      0.09 + fraction * 0.84,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(i * 0.37, angle, i * 0.21);
    dummy.scale.set(size * 1.3, size, size * 0.55);
    dummy.updateMatrix();
    crumb_flecks.setMatrixAt(i, dummy.matrix);
  }
  crumb_flecks.instanceMatrix.needsUpdate = true;
  root.add(crumb_flecks);

  const top_ganacheProfile = [
    new THREE.Vector2(0.0, 1.008),
    new THREE.Vector2(1.2, 1.008),
    new THREE.Vector2(1.36, 1.018),
    new THREE.Vector2(1.445, 1.045),
    new THREE.Vector2(1.47, 1.078),
    new THREE.Vector2(1.445, 1.108),
    new THREE.Vector2(1.34, 1.128),
    new THREE.Vector2(0.0, 1.128),
  ];
  const top_ganacheGeom = new THREE.LatheGeometry(top_ganacheProfile, 64);
  const top_ganache = new THREE.Mesh(top_ganacheGeom, ganacheMat);
  top_ganache.name = "top_ganache";
  root.add(top_ganache);

  const ganache_dripsGeom = new THREE.SphereGeometry(1, 16, 10);
  const ganache_drips = new THREE.InstancedMesh(
    ganache_dripsGeom,
    ganacheMat,
    14
  );
  ganache_drips.name = "ganache_drips";
  for (let i = 0; i < 14; i++) {
    const angle = i / 14 * Math.PI * 2 + 0.12 * Math.sin(i * 1.9);
    const height = 0.07 + 0.11 * (0.5 + 0.5 * Math.sin(i * 2.31 + 0.2));
    const width = 0.045 + 0.035 * (0.5 + 0.5 * Math.sin(i * 1.43));

    dummy.position.set(
      Math.cos(angle) * 1.423,
      1.066 - height * 0.5,
      Math.sin(angle) * 1.423
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(width, height, 0.035);
    dummy.updateMatrix();
    ganache_drips.setMatrixAt(i, dummy.matrix);
  }
  ganache_drips.instanceMatrix.needsUpdate = true;
  root.add(ganache_drips);

  const front_ganache_dripPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.47, 1.105, 1.39),
    new THREE.Vector3(-0.48, 1.01, 1.435),
    new THREE.Vector3(-0.465, 0.82, 1.449),
    new THREE.Vector3(-0.48, 0.58, 1.452),
    new THREE.Vector3(-0.46, 0.31, 1.454),
    new THREE.Vector3(-0.47, 0.12, 1.458),
    new THREE.Vector3(-0.45, 0.065, 1.462),
  ]);
  const front_ganache_dripGeom = new THREE.TubeGeometry(
    front_ganache_dripPath,
    36,
    0.065,
    12,
    false
  );
  const front_ganache_drip = new THREE.Mesh(
    front_ganache_dripGeom,
    ganacheMat
  );
  front_ganache_drip.name = "front_ganache_drip";
  root.add(front_ganache_drip);

  const front_ganache_dropGeom = new THREE.SphereGeometry(1, 20, 12);
  const front_ganache_drop = new THREE.Mesh(
    front_ganache_dropGeom,
    ganacheMat
  );
  front_ganache_drop.name = "front_ganache_drop";
  front_ganache_drop.position.set(-0.45, 0.065, 1.462);
  front_ganache_drop.scale.set(0.12, 0.065, 0.09);
  root.add(front_ganache_drop);

  const powdered_sugarGeom = new THREE.IcosahedronGeometry(1, 0);
  const powdered_sugar = new THREE.InstancedMesh(
    powdered_sugarGeom,
    powdered_sugarMat,
    220
  );
  powdered_sugar.name = "powdered_sugar";
  for (let i = 0; i < 220; i++) {
    const angle = i * 2.3999632297;
    const fraction = ((i * 67) % 219) / 218;
    const radius = i < 150
      ? 0.98 + 0.41 * Math.sqrt(fraction)
      : 0.58 + 0.78 * Math.sqrt(fraction);
    const size = 0.011 + 0.018 * (0.5 + 0.5 * Math.sin(i * 2.83));

    dummy.position.set(
      Math.cos(angle) * radius,
      1.139 + size * 0.3,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(i * 0.31, angle, i * 0.17);
    dummy.scale.set(size * 1.35, size * 0.55, size);
    dummy.updateMatrix();
    powdered_sugar.setMatrixAt(i, dummy.matrix);
  }
  powdered_sugar.instanceMatrix.needsUpdate = true;
  root.add(powdered_sugar);

  const raspberry_coreGeom = new THREE.SphereGeometry(1, 20, 14);
  const raspberry_drupeletGeom = new THREE.SphereGeometry(1, 10, 8);

  function createRaspberry(name) {
    const raspberry = new THREE.Group();
    raspberry.name = name;

    const raspberry_core = new THREE.Mesh(raspberry_coreGeom, raspberryMat);
    raspberry_core.name = name + "_core";
    raspberry_core.scale.set(0.16, 0.225, 0.16);
    raspberry.add(raspberry_core);

    const ring_counts = [8, 9, 10, 9, 8];
    const ring_radii = [0.12, 0.158, 0.17, 0.145, 0.095];
    const ring_heights = [-0.15, -0.075, 0.0, 0.075, 0.15];
    let drupelet_count = 0;
    for (let i = 0; i < ring_counts.length; i++) {
      drupelet_count += ring_counts[i];
    }

    const raspberry_drupelets = new THREE.InstancedMesh(
      raspberry_drupeletGeom,
      raspberryMat,
      drupelet_count
    );
    raspberry_drupelets.name = name + "_drupelets";

    let index = 0;
    for (let ring = 0; ring < ring_counts.length; ring++) {
      const count = ring_counts[ring];
      for (let j = 0; j < count; j++) {
        const angle = j / count * Math.PI * 2 + ring * 0.31;
        const size = 0.041 + 0.005 * (0.5 + 0.5 * Math.sin(index * 2.1));

        dummy.position.set(
          Math.cos(angle) * ring_radii[ring],
          ring_heights[ring],
          Math.sin(angle) * ring_radii[ring]
        );
        dummy.rotation.set(angle * 0.2, angle, ring * 0.15);
        dummy.scale.set(size, size * 0.92, size);
        dummy.updateMatrix();
        raspberry_drupelets.setMatrixAt(index, dummy.matrix);
        index++;
      }
    }
    raspberry_drupelets.instanceMatrix.needsUpdate = true;
    raspberry.add(raspberry_drupelets);

    return raspberry;
  }

  const back_left_raspberry = createRaspberry("back_left_raspberry");
  back_left_raspberry.position.set(-0.52, 1.405, -0.27);
  back_left_raspberry.rotation.set(0.12, -0.18, -0.28);
  back_left_raspberry.scale.setScalar(0.95);
  root.add(back_left_raspberry);

  const back_center_raspberry = createRaspberry("back_center_raspberry");
  back_center_raspberry.position.set(0.0, 1.455, -0.42);
  back_center_raspberry.rotation.set(-0.08, 0.2, 0.08);
  back_center_raspberry.scale.setScalar(0.92);
  root.add(back_center_raspberry);

  const left_raspberry = createRaspberry("left_raspberry");
  left_raspberry.position.set(-0.43, 1.345, 0.12);
  left_raspberry.rotation.set(0.18, 0.1, -0.2);
  left_raspberry.scale.setScalar(0.96);
  root.add(left_raspberry);

  const center_raspberry = createRaspberry("center_raspberry");
  center_raspberry.position.set(0.02, 1.39, -0.02);
  center_raspberry.rotation.set(-0.08, 0.2, 0.05);
  center_raspberry.scale.setScalar(0.88);
  root.add(center_raspberry);

  const front_raspberry = createRaspberry("front_raspberry");
  front_raspberry.position.set(0.22, 1.335, 0.34);
  front_raspberry.rotation.set(0.12, -0.1, 0.16);
  front_raspberry.scale.setScalar(1.08);
  root.add(front_raspberry);

  const right_raspberry = createRaspberry("right_raspberry");
  right_raspberry.position.set(0.72, 1.35, 0.08);
  right_raspberry.rotation.set(-0.12, 0.18, -0.2);
  right_raspberry.scale.setScalar(1.0);
  root.add(right_raspberry);

  const blackberry_coreGeom = new THREE.SphereGeometry(1, 18, 12);
  const blackberry_drupeletGeom = new THREE.SphereGeometry(1, 10, 8);

  function createBlackberry(name) {
    const blackberry = new THREE.Group();
    blackberry.name = name;

    const blackberry_core = new THREE.Mesh(
      blackberry_coreGeom,
      blackberryMat
    );
    blackberry_core.name = name + "_core";
    blackberry_core.scale.set(0.17, 0.205, 0.17);
    blackberry.add(blackberry_core);

    const ring_counts = [8, 9, 10, 9, 7];
    const ring_radii = [0.125, 0.16, 0.17, 0.145, 0.09];
    const ring_heights = [-0.145, -0.072, 0.0, 0.075, 0.15];
    let drupelet_count = 0;

    for (let i = 0; i < ring_counts.length; i++) {
      drupelet_count += ring_counts[i];
    }

    const blackberry_drupelets = new THREE.InstancedMesh(
      blackberry_drupeletGeom,
      blackberryMat,
      drupelet_count
    );
    blackberry_drupelets.name = name + "_drupelets";

    let index = 0;
    for (let ring = 0; ring < ring_counts.length; ring++) {
      const count = ring_counts[ring];
      for (let j = 0; j < count; j++) {
        const angle = j / count * Math.PI * 2 + ring * 0.29;
        const size = 0.043 + 0.005 * (0.5 + 0.5 * Math.sin(index * 1.87));

        dummy.position.set(
          Math.cos(angle) * ring_radii[ring],
          ring_heights[ring],
          Math.sin(angle) * ring_radii[ring]
        );
        dummy.rotation.set(ring * 0.17, angle, angle * 0.2);
        dummy.scale.set(size, size * 0.95, size);
        dummy.updateMatrix();
        blackberry_drupelets.setMatrixAt(index, dummy.matrix);
        index++;
      }
    }
    blackberry_drupelets.instanceMatrix.needsUpdate = true;
    blackberry.add(blackberry_drupelets);

    return blackberry;
  }

  const center_blackberry = createBlackberry("center_blackberry");
  center_blackberry.position.set(0.12, 1.465, -0.22);
  center_blackberry.rotation.set(0.08, -0.2, -0.08);
  center_blackberry.scale.setScalar(1.1);
  root.add(center_blackberry);

  const back_right_blackberry = createBlackberry("back_right_blackberry");
  back_right_blackberry.position.set(0.5, 1.47, -0.4);
  back_right_blackberry.rotation.set(-0.1, 0.18, 0.12);
  back_right_blackberry.scale.setScalar(0.98);
  root.add(back_right_blackberry);

  const blueberryGeom = new THREE.SphereGeometry(1, 24, 16);
  const blueberry_data = [
    [-0.82, 1.315, -0.02, 0.19],
    [0.91, 1.335, -0.12, 0.18],
    [0.49, 1.315, -0.01, 0.18],
    [-0.03, 1.285, 0.55, 0.205],
    [0.4, 1.265, 0.69, 0.18],
  ];

  const blueberries = new THREE.InstancedMesh(
    blueberryGeom,
    blueberryMat,
    blueberry_data.length
  );
  blueberries.name = "blueberries";
  for (let i = 0; i < blueberry_data.length; i++) {
    const data = blueberry_data[i];

    dummy.position.set(data[0], data[1], data[2]);
    dummy.rotation.set(0.08 * Math.sin(i), i * 0.37, 0.05 * Math.cos(i));
    dummy.scale.set(data[3], data[3] * 0.94, data[3]);
    dummy.updateMatrix();
    blueberries.setMatrixAt(i, dummy.matrix);
  }
  blueberries.instanceMatrix.needsUpdate = true;
  root.add(blueberries);

  const blueberry_calyxShape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i / 10 * Math.PI * 2;
    const radius = i % 2 === 0 ? 0.045 : 0.018;
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
  const blueberry_calyxes = new THREE.InstancedMesh(
    blueberry_calyxesGeom,
    blueberry_calyxMat,
    blueberry_data.length
  );
  blueberry_calyxes.name = "blueberry_calyxes";

  const calyx_normal = new THREE.Vector3();
  for (let i = 0; i < blueberry_data.length; i++) {
    const data = blueberry_data[i];
    calyx_normal.set(
      0.18 * Math.sin(i * 1.7),
      0.82,
      0.55 + 0.12 * Math.cos(i * 1.3)
    ).normalize();

    dummy.position.set(
      data[0] + calyx_normal.x * data[3] * 0.97,
      data[1] + calyx_normal.y * data[3] * 0.97,
      data[2] + calyx_normal.z * data[3] * 0.97
    );
    dummy.quaternion.setFromUnitVectors(local_forward, calyx_normal);
    dummy.scale.setScalar(i === 3 ? 1.12 : 0.9);
    dummy.updateMatrix();
    blueberry_calyxes.setMatrixAt(i, dummy.matrix);
  }
  blueberry_calyxes.instanceMatrix.needsUpdate = true;
  root.add(blueberry_calyxes);

  const purple_plumGeom = new THREE.SphereGeometry(1, 28, 18);
  const purple_plum = new THREE.Mesh(purple_plumGeom, purple_plumMat);
  purple_plum.name = "purple_plum";
  purple_plum.position.set(-0.55, 1.29, 0.47);
  purple_plum.rotation.set(0.12, -0.15, -0.18);
  purple_plum.scale.set(0.2, 0.205, 0.19);
  root.add(purple_plum);

  const purple_plum_dimpleGeom = new THREE.TorusGeometry(
    0.026,
    0.007,
    7,
    18
  );
  const purple_plum_dimple = new THREE.Mesh(
    purple_plum_dimpleGeom,
    plum_dimpleMat
  );
  purple_plum_dimple.name = "purple_plum_dimple";
  purple_plum_dimple.position.set(-0.55, 1.29, 0.661);
  purple_plum_dimple.rotation.x = -0.18;
  root.add(purple_plum_dimple);

  const fruit_sugar = new THREE.InstancedMesh(
    powdered_sugarGeom,
    powdered_sugarMat,
    70
  );
  fruit_sugar.name = "fruit_sugar";

  const fruit_centers = [
    [-0.52, 1.405, -0.27, 0.27],
    [0.0, 1.455, -0.42, 0.26],
    [-0.43, 1.345, 0.12, 0.27],
    [0.22, 1.335, 0.34, 0.29],
    [0.72, 1.35, 0.08, 0.27],
    [0.12, 1.465, -0.22, 0.26],
    [0.5, 1.47, -0.4, 0.24],
  ];

  for (let i = 0; i < 70; i++) {
    const fruit_index = i % fruit_centers.length;
    const fruit = fruit_centers[fruit_index];
    const angle = i * 2.3999632297;
    const phi = 0.25 + 1.05 * (((i * 11) % 37) / 36);
    const offset_x = fruit[3] * Math.sin(phi) * Math.cos(angle);
    const offset_y = fruit[3] * Math.cos(phi);
    const offset_z = fruit[3] * Math.sin(phi) * Math.sin(angle);
    const size = 0.008 + 0.009 * (0.5 + 0.5 * Math.sin(i * 2.47));

    dummy.position.set(
      fruit[0] + offset_x,
      fruit[1] + offset_y,
      fruit[2] + offset_z
    );
    dummy.rotation.set(i * 0.21, angle, i * 0.13);
    dummy.scale.set(size * 1.3, size * 0.6, size);
    dummy.updateMatrix();
    fruit_sugar.setMatrixAt(i, dummy.matrix);
  }
  fruit_sugar.instanceMatrix.needsUpdate = true;
  root.add(fruit_sugar);

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