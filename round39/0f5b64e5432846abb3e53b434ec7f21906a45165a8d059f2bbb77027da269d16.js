export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cinnamon_cheesecake";

  const cakeRadius = 1.5;
  const cakeTopY = 1.16;
  const cakeBottomY = 0.11;

  const cake_boardMat = new THREE.MeshStandardMaterial({
    color: 0xc7a64b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const cake_board_rimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const crumb_crustMat = new THREE.MeshStandardMaterial({
    color: 0x995326,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crumb_lightMat = new THREE.MeshStandardMaterial({
    color: 0xb87338,
    metalness: 0.0,
    roughness: 0.9,
  });
  const crumb_darkMat = new THREE.MeshStandardMaterial({
    color: 0x74401f,
    metalness: 0.0,
    roughness: 0.9,
  });
  const cheesecake_fillingMat = new THREE.MeshStandardMaterial({
    color: 0xfff8df,
    metalness: 0.0,
    roughness: 0.7,
  });
  const filling_mottlingMat = new THREE.MeshStandardMaterial({
    color: 0xeee4c8,
    metalness: 0.0,
    roughness: 0.7,
  });
  const filling_speckMat = new THREE.MeshStandardMaterial({
    color: 0xa96d3d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const top_smearsMat = new THREE.MeshStandardMaterial({
    color: 0xd9b77e,
    metalness: 0.0,
    roughness: 0.7,
  });
  const cinnamon_stickMat = new THREE.MeshStandardMaterial({
    color: 0x9b542b,
    metalness: 0.0,
    roughness: 0.9,
  });
  const cinnamon_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xb66a38,
    metalness: 0.0,
    roughness: 0.9,
  });
  const cinnamon_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x4b2415,
    metalness: 0.0,
    roughness: 0.95,
  });
  const cinnamon_innerMat = new THREE.MeshStandardMaterial({
    color: 0x35170d,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const cinnamon_shavingsMat = new THREE.MeshStandardMaterial({
    color: 0xa95d2d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const sugar_crystalsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.8,
  });

  const cake_boardGeom = new THREE.CylinderGeometry(1.68, 1.68, 0.045, 96);
  const cake_board = new THREE.Mesh(cake_boardGeom, cake_boardMat);
  cake_board.name = "cake_board";
  cake_board.position.y = 0.025;
  root.add(cake_board);

  const cake_board_rimGeom = new THREE.TorusGeometry(1.665, 0.018, 8, 96);
  const cake_board_rim = new THREE.Mesh(cake_board_rimGeom, cake_board_rimMat);
  cake_board_rim.name = "cake_board_rim";
  cake_board_rim.rotation.x = Math.PI / 2;
  cake_board_rim.position.y = 0.025;
  root.add(cake_board_rim);

  const crumb_crustGeom = new THREE.CylinderGeometry(1.48, 1.5, 0.16, 96);
  const crumb_crust = new THREE.Mesh(crumb_crustGeom, crumb_crustMat);
  crumb_crust.name = "crumb_crust";
  crumb_crust.position.y = 0.13;
  root.add(crumb_crust);

  const crumb_upper_edgeGeom = new THREE.TorusGeometry(1.455, 0.028, 8, 96);
  const crumb_upper_edge = new THREE.Mesh(crumb_upper_edgeGeom, crumb_lightMat);
  crumb_upper_edge.name = "crumb_upper_edge";
  crumb_upper_edge.rotation.x = Math.PI / 2;
  crumb_upper_edge.position.y = 0.205;
  root.add(crumb_upper_edge);

  const dummy = new THREE.Object3D();
  const up_axis = new THREE.Vector3(0, 1, 0);
  const forward_axis = new THREE.Vector3(0, 0, 1);

  const crust_crumbsGeom = new THREE.DodecahedronGeometry(1, 0);
  const crust_crumbs = new THREE.InstancedMesh(
    crust_crumbsGeom,
    crumb_lightMat,
    120
  );
  crust_crumbs.name = "crust_crumbs";
  for (let i = 0; i < 120; i++) {
    const angle = i * 2.3999632297;
    const radius = 1.455 + (((i * 17) % 23) / 22) * 0.085;
    const scale = 0.018 + (((i * 13) % 19) / 18) * 0.027;
    dummy.position.set(
      Math.cos(angle) * radius,
      0.065 + (((i * 29) % 31) / 30) * 0.145,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(i * 0.37, i * 0.61, i * 0.23);
    dummy.scale.set(scale * 1.2, scale * 0.8, scale);
    dummy.updateMatrix();
    crust_crumbs.setMatrixAt(i, dummy.matrix);
  }
  crust_crumbs.instanceMatrix.needsUpdate = true;
  root.add(crust_crumbs);

  const crust_dark_crumbsGeom = new THREE.DodecahedronGeometry(1, 0);
  const crust_dark_crumbs = new THREE.InstancedMesh(
    crust_dark_crumbsGeom,
    crumb_darkMat,
    64
  );
  crust_dark_crumbs.name = "crust_dark_crumbs";
  for (let i = 0; i < 64; i++) {
    const angle = i * 2.17648 + 0.4;
    const radius = 1.46 + (((i * 11) % 17) / 16) * 0.075;
    const scale = 0.014 + (((i * 7) % 13) / 12) * 0.021;
    dummy.position.set(
      Math.cos(angle) * radius,
      0.07 + (((i * 19) % 23) / 22) * 0.13,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(i * 0.51, i * 0.29, i * 0.73);
    dummy.scale.set(scale, scale * 0.75, scale * 1.25);
    dummy.updateMatrix();
    crust_dark_crumbs.setMatrixAt(i, dummy.matrix);
  }
  crust_dark_crumbs.instanceMatrix.needsUpdate = true;
  root.add(crust_dark_crumbs);

  const cheesecake_fillingProfile = [
    new THREE.Vector2(0.0, cakeBottomY),
    new THREE.Vector2(1.42, cakeBottomY),
    new THREE.Vector2(1.47, 0.15),
    new THREE.Vector2(1.49, 0.25),
    new THREE.Vector2(1.5, 0.82),
    new THREE.Vector2(1.495, 1.02),
    new THREE.Vector2(1.47, 1.1),
    new THREE.Vector2(1.4, 1.145),
    new THREE.Vector2(0.0, cakeTopY),
  ];
  const cheesecake_fillingGeom = new THREE.LatheGeometry(
    cheesecake_fillingProfile,
    96
  );
  const cheesecake_filling = new THREE.Mesh(
    cheesecake_fillingGeom,
    cheesecake_fillingMat
  );
  cheesecake_filling.name = "cheesecake_filling";
  root.add(cheesecake_filling);

  const filling_mottlingGeom = new THREE.SphereGeometry(1, 8, 6);
  const filling_mottling = new THREE.InstancedMesh(
    filling_mottlingGeom,
    filling_mottlingMat,
    34
  );
  filling_mottling.name = "filling_mottling";
  for (let i = 0; i < 34; i++) {
    const angle = i * 2.3999632297 + 0.2;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const radius = 1.499;
    dummy.position.set(
      normal.x * radius,
      0.25 + (((i * 17) % 29) / 28) * 0.76,
      normal.z * radius
    );
    dummy.quaternion.setFromUnitVectors(forward_axis, normal);
    dummy.scale.set(
      0.025 + (((i * 5) % 9) / 8) * 0.035,
      0.012 + (((i * 11) % 8) / 7) * 0.022,
      0.004
    );
    dummy.updateMatrix();
    filling_mottling.setMatrixAt(i, dummy.matrix);
  }
  filling_mottling.instanceMatrix.needsUpdate = true;
  root.add(filling_mottling);

  const filling_specksGeom = new THREE.SphereGeometry(1, 7, 5);
  const filling_specks = new THREE.InstancedMesh(
    filling_specksGeom,
    filling_speckMat,
    18
  );
  filling_specks.name = "filling_specks";
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.731 + 0.35;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const radius = 1.502;
    const scale = 0.008 + (((i * 7) % 10) / 9) * 0.012;
    dummy.position.set(
      normal.x * radius,
      0.29 + (((i * 13) % 23) / 22) * 0.69,
      normal.z * radius
    );
    dummy.quaternion.setFromUnitVectors(forward_axis, normal);
    dummy.scale.set(scale * 1.5, scale, 0.003);
    dummy.updateMatrix();
    filling_specks.setMatrixAt(i, dummy.matrix);
  }
  filling_specks.instanceMatrix.needsUpdate = true;
  root.add(filling_specks);

  const top_smearsGeom = new THREE.CircleGeometry(1, 14);
  const top_smears = new THREE.InstancedMesh(
    top_smearsGeom,
    top_smearsMat,
    12
  );
  top_smears.name = "top_smears";
  for (let i = 0; i < 12; i++) {
    const angle = i * 2.13 + 0.6;
    const radius = 0.24 + (((i * 17) % 19) / 18) * 1.02;
    dummy.position.set(
      Math.cos(angle) * radius,
      cakeTopY + 0.004,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(-Math.PI / 2, 0, angle * 0.7);
    dummy.scale.set(
      0.025 + (((i * 5) % 8) / 7) * 0.055,
      0.012 + (((i * 9) % 7) / 6) * 0.025,
      1
    );
    dummy.updateMatrix();
    top_smears.setMatrixAt(i, dummy.matrix);
  }
  top_smears.instanceMatrix.needsUpdate = true;
  root.add(top_smears);

  const cinnamon_shavingsShape = new THREE.Shape();
  cinnamon_shavingsShape.moveTo(-0.1, -0.018);
  cinnamon_shavingsShape.lineTo(-0.055, -0.045);
  cinnamon_shavingsShape.lineTo(0.015, -0.032);
  cinnamon_shavingsShape.lineTo(0.09, -0.05);
  cinnamon_shavingsShape.lineTo(0.115, -0.008);
  cinnamon_shavingsShape.lineTo(0.06, 0.018);
  cinnamon_shavingsShape.lineTo(0.08, 0.045);
  cinnamon_shavingsShape.lineTo(0.005, 0.035);
  cinnamon_shavingsShape.lineTo(-0.045, 0.052);
  cinnamon_shavingsShape.lineTo(-0.075, 0.018);
  cinnamon_shavingsShape.closePath();

  const cinnamon_shavingsGeom = new THREE.ShapeGeometry(
    cinnamon_shavingsShape
  );
  const cinnamon_shavings = new THREE.InstancedMesh(
    cinnamon_shavingsGeom,
    cinnamon_shavingsMat,
    38
  );
  cinnamon_shavings.name = "cinnamon_shavings";
  for (let i = 0; i < 38; i++) {
    const angle = i * 2.3999632297 + 0.15;
    const radius = 0.18 + (((i * 23) % 37) / 36) * 1.12;
    const lengthScale = 0.42 + (((i * 7) % 13) / 12) * 0.72;
    dummy.position.set(
      Math.cos(angle) * radius,
      cakeTopY + 0.012,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(-Math.PI / 2, 0, angle * 1.45);
    dummy.scale.set(lengthScale, 0.65 + (((i * 5) % 9) / 8) * 0.65, 1);
    dummy.updateMatrix();
    cinnamon_shavings.setMatrixAt(i, dummy.matrix);
  }
  cinnamon_shavings.instanceMatrix.needsUpdate = true;
  root.add(cinnamon_shavings);

  const sugar_crystalsGeom = new THREE.DodecahedronGeometry(1, 0);
  const sugar_crystals = new THREE.InstancedMesh(
    sugar_crystalsGeom,
    sugar_crystalsMat,
    72
  );
  sugar_crystals.name = "sugar_crystals";
  for (let i = 0; i < 72; i++) {
    const angle = i * 2.3999632297 + 0.9;
    const radius = 0.12 + (((i * 29) % 71) / 70) * 1.22;
    const scale = 0.008 + (((i * 11) % 15) / 14) * 0.014;
    dummy.position.set(
      Math.cos(angle) * radius,
      cakeTopY + 0.014 + scale * 0.5,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(i * 0.41, i * 0.67, i * 0.27);
    dummy.scale.set(scale, scale * 0.75, scale * 1.1);
    dummy.updateMatrix();
    sugar_crystals.setMatrixAt(i, dummy.matrix);
  }
  sugar_crystals.instanceMatrix.needsUpdate = true;
  root.add(sugar_crystals);

  const cinnamon_stickGeom = new THREE.CylinderGeometry(
    0.09,
    0.09,
    1,
    24,
    8,
    true
  );
  const cinnamon_compressed_sideGeom = new THREE.CylinderGeometry(
    0.084,
    0.084,
    1,
    24,
    8,
    true
  );
  const cinnamon_grooveGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    1,
    8
  );
  const cinnamon_seamGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    1,
    8
  );
  const cinnamon_openingGeom = new THREE.CircleGeometry(0.052, 24);
  const cinnamon_outer_rimGeom = new THREE.TorusGeometry(
    0.071,
    0.018,
    8,
    24
  );
  const cinnamon_inner_coilGeom = new THREE.TorusGeometry(
    0.029,
    0.007,
    7,
    20
  );
  const cinnamon_fleckGeom = new THREE.SphereGeometry(1, 7, 5);

  function createCinnamonStick(name, length, thickness, curl) {
    const cinnamon_stick = new THREE.Group();
    cinnamon_stick.name = name;

    const radiusScale = thickness / 0.18;
    const bodyLength = length * 0.96;

    const stick_body = new THREE.Mesh(
      cinnamon_stickGeom,
      cinnamon_stickMat
    );
    stick_body.name = name + "_body";
    stick_body.scale.set(radiusScale, bodyLength, radiusScale);
    stick_body.rotation.z = Math.PI / 2;
    cinnamon_stick.add(stick_body);

    const compressedOffset = curl * 0.035;
    const compressedLength = length * (0.27 - Math.abs(curl) * 0.06);
    const compressedRatio = compressedLength / bodyLength;

    const compressed_side_a = new THREE.Mesh(
      cinnamon_compressed_sideGeom,
      cinnamon_grooveMat
    );
    compressed_side_a.name = name + "_compressed_side_a";
    compressed_side_a.position.set(
      -curl * length * 0.145,
      0,
      -compressedOffset
    );
    compressed_side_a.scale.set(
      radiusScale * 1.01,
      compressedLength,
      radiusScale * 0.96
    );
    compressed_side_a.rotation.z = Math.PI / 2;
    cinnamon_stick.add(compressed_side_a);

    const compressed_side_b = new THREE.Mesh(
      cinnamon_compressed_sideGeom,
      cinnamon_highlightMat
    );
    compressed_side_b.name = name + "_compressed_side_b";
    compressed_side_b.position.set(
      curl * length * 0.145,
      0,
      compressedOffset
    );
    compressed_side_b.scale.set(
      radiusScale * 0.98,
      compressedLength * 0.94,
      radiusScale * 1.01
    );
    compressed_side_b.rotation.z = Math.PI / 2;
    cinnamon_stick.add(compressed_side_b);

    const grooveAngles = [0.55, 2.55, 4.55];
    for (let i = 0; i < grooveAngles.length; i++) {
      const grooveAngle = grooveAngles[i];
      const grooveRadius = 0.092 * radiusScale;
      const groove = new THREE.Mesh(
        cinnamon_grooveGeom,
        cinnamon_grooveMat
      );
      groove.name = name + "_groove_" + i;
      groove.position.set(
        curl * length * 0.035,
        Math.cos(grooveAngle) * grooveRadius,
        Math.sin(grooveAngle) * grooveRadius
      );
      groove.scale.set(
        i === 1 ? radiusScale * 0.55 : radiusScale,
        bodyLength * (i === 1 ? 0.76 : 0.84),
        i === 1 ? radiusScale * 0.55 : radiusScale
      );
      groove.rotation.z = Math.PI / 2;
      cinnamon_stick.add(groove);
    }

    const seamOffset = curl * 0.05;
    const longitudinal_seam = new THREE.Mesh(
      cinnamon_seamGeom,
      cinnamon_grooveMat
    );
    longitudinal_seam.name = name + "_longitudinal_seam";
    longitudinal_seam.position.set(
      curl * length * 0.08,
      0,
      seamOffset
    );
    longitudinal_seam.scale.set(
      radiusScale,
      bodyLength * (0.44 + Math.abs(curl) * 0.12),
      radiusScale
    );
    longitudinal_seam.rotation.z = Math.PI / 2;
    cinnamon_stick.add(longitudinal_seam);

    for (const side of [-1, 1]) {
      const endX = side * length * 0.48;

      const inner_opening = new THREE.Mesh(
        cinnamon_openingGeom,
        cinnamon_innerMat
      );
      inner_opening.name =
        name + (side < 0 ? "_left_opening" : "_right_opening");
      inner_opening.position.x = side * (bodyLength * 0.5 + 0.002);
      inner_opening.rotation.y =
        side < 0 ? -Math.PI / 2 : Math.PI / 2;
      inner_opening.scale.setScalar(radiusScale);
      cinnamon_stick.add(inner_opening);

      const outer_rim = new THREE.Mesh(
        cinnamon_outer_rimGeom,
        cinnamon_stickMat
      );
      outer_rim.name =
        name + (side < 0 ? "_left_rim" : "_right_rim");
      outer_rim.position.x = side * (bodyLength * 0.5 + 0.004);
      outer_rim.rotation.y =
        side < 0 ? -Math.PI / 2 : Math.PI / 2;
      outer_rim.scale.setScalar(radiusScale);
      cinnamon_stick.add(outer_rim);

      const inner_coil = new THREE.Mesh(
        cinnamon_inner_coilGeom,
        cinnamon_highlightMat
      );
      inner_coil.name =
        name + (side < 0 ? "_left_coil" : "_right_coil");
      inner_coil.position.set(
        side * (bodyLength * 0.5 + 0.008),
        side * 0.006 * radiusScale,
        curl * 0.008 * radiusScale
      );
      inner_coil.rotation.y =
        side < 0 ? -Math.PI / 2 : Math.PI / 2;
      inner_coil.scale.setScalar(radiusScale);
      cinnamon_stick.add(inner_coil);
    }

    const surface_flecks = new THREE.InstancedMesh(
      cinnamon_fleckGeom,
      cinnamon_grooveMat,
      14
    );
    surface_flecks.name = name + "_surface_flecks";
    for (let i = 0; i < 14; i++) {
      const angle = i * 2.17 + curl * 0.4;
      const fraction = ((i * 37) % 13) / 12;
      const surfaceRadius = 0.0915 * radiusScale;
      dummy.position.set(
        (fraction - 0.5) * length * 0.82,
        Math.cos(angle) * surfaceRadius,
        Math.sin(angle) * surfaceRadius
      );
      dummy.rotation.set(i * 0.31, angle, i * 0.47);
      dummy.scale.set(
        0.012 + (((i * 5) % 7) / 6) * 0.018,
        0.004,
        0.007 + (((i * 3) % 5) / 4) * 0.008
      );
      dummy.updateMatrix();
      surface_flecks.setMatrixAt(i, dummy.matrix);
    }
    surface_flecks.instanceMatrix.needsUpdate = true;
    cinnamon_stick.add(surface_flecks);

    return cinnamon_stick;
  }

  function placeStick(stick, x, y, z, yaw, tilt, sideRise) {
    const localAxis = new THREE.Vector3(1, 0, 0);
    const direction = new THREE.Vector3(
      Math.cos(yaw),
      tilt,
      -Math.sin(yaw)
    ).normalize();
    const stickSide = new THREE.Vector3(
      Math.sin(yaw),
      0,
      Math.cos(yaw)
    ).normalize();
    const stickUp = new THREE.Vector3()
      .crossVectors(direction, stickSide)
      .normalize();
    const orientation = new THREE.Matrix4().makeBasis(
      stickSide,
      stickUp,
      direction
    );

    stick.position.set(x, y, z);
    stick.quaternion.setFromRotationMatrix(orientation);
    stick.rotateX(sideRise);
    root.add(stick);
  }

  const cinnamon_stick_back_left = createCinnamonStick(
    "cinnamon_stick_back_left",
    1.34,
    0.185,
    -0.45
  );
  placeStick(
    cinnamon_stick_back_left,
    -0.34,
    1.285,
    -0.31,
    0.37,
    0.035,
    0.08
  );

  const cinnamon_stick_rear = createCinnamonStick(
    "cinnamon_stick_rear",
    1.94,
    0.18,
    0.35
  );
  placeStick(
    cinnamon_stick_rear,
    -0.06,
    1.325,
    -0.2,
    0.3,
    0.055,
    -0.06
  );

  const cinnamon_stick_center = createCinnamonStick(
    "cinnamon_stick_center",
    1.25,
    0.19,
    -0.25
  );
  placeStick(
    cinnamon_stick_center,
    -0.1,
    1.415,
    0.015,
    -0.67,
    0.035,
    0.07
  );

  const cinnamon_stick_front = createCinnamonStick(
    "cinnamon_stick_front",
    1.96,
    0.19,
    0.5
  );
  placeStick(
    cinnamon_stick_front,
    0.04,
    1.465,
    0.08,
    0.55,
    0.045,
    -0.04
  );

  const cinnamon_stick_right = createCinnamonStick(
    "cinnamon_stick_right",
    1.42,
    0.185,
    -0.35
  );
  placeStick(
    cinnamon_stick_right,
    0.34,
    1.375,
    0.09,
    0.5,
    0.025,
    0.09
  );

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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