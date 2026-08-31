export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_metallophone";

  const bodyW = 1.25;
  const bodyL = 1.65;
  const bodyH = 0.28;
  const bodyY = -0.08;

  const coralMat = new THREE.MeshStandardMaterial({
    color: 0xf0644e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xd94b91,
    metalness: 0.0,
    roughness: 0.6,
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x169ed4,
    metalness: 0.0,
    roughness: 0.6,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x48c875,
    metalness: 0.0,
    roughness: 0.6,
  });
  const limeMat = new THREE.MeshStandardMaterial({
    color: 0xa8d943,
    metalness: 0.0,
    roughness: 0.6,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf0d331,
    metalness: 0.0,
    roughness: 0.6,
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xf47b3d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkGreenMat = new THREE.MeshStandardMaterial({
    color: 0x268b58,
    metalness: 0.0,
    roughness: 0.7,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushedMetalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polishedMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.8,
  });
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb98552,
    metalness: 0.0,
    roughness: 0.9,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x5a3825,
    metalness: 0.0,
    roughness: 0.9,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function horizontalRoundedGeom(width, length, depth, radius) {
    const shape = roundedRectShape(width, length, radius);
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: Math.min(depth * 0.18, 0.014),
      bevelSize: Math.min(radius * 0.25, 0.018),
      bevelSegments: 2,
    });
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  function verticalRoundedGeom(width, height, depth, radius) {
    const shape = roundedRectShape(width, height, radius);
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    });
  }

  const body_coreGeom = new THREE.BoxGeometry(bodyW - 0.04, bodyH, bodyL - 0.04);
  const body_core = new THREE.Mesh(body_coreGeom, brushedMetalMat);
  body_core.name = "body_core";
  body_core.position.y = bodyY;
  root.add(body_core);

  const top_green_leftGeom = new THREE.BoxGeometry(0.31, 0.025, 1.59);
  const top_green_left = new THREE.Mesh(top_green_leftGeom, greenMat);
  top_green_left.name = "top_green_left";
  top_green_left.position.set(-0.47, 0.072, 0);
  root.add(top_green_left);

  const top_blue_leftGeom = new THREE.BoxGeometry(0.31, 0.025, 1.59);
  const top_blue_left = new THREE.Mesh(top_blue_leftGeom, blueMat);
  top_blue_left.name = "top_blue_left";
  top_blue_left.position.set(-0.157, 0.072, 0);
  root.add(top_blue_left);

  const top_yellow_centerGeom = new THREE.BoxGeometry(0.31, 0.025, 1.59);
  const top_yellow_center = new THREE.Mesh(top_yellow_centerGeom, yellowMat);
  top_yellow_center.name = "top_yellow_center";
  top_yellow_center.position.set(0.157, 0.072, 0);
  root.add(top_yellow_center);

  const top_orange_rightGeom = new THREE.BoxGeometry(0.31, 0.025, 1.59);
  const top_orange_right = new THREE.Mesh(top_orange_rightGeom, orangeMat);
  top_orange_right.name = "top_orange_right";
  top_orange_right.position.set(0.47, 0.072, 0);
  root.add(top_orange_right);

  const top_pink_rear_stripGeom = new THREE.BoxGeometry(0.22, 0.014, 0.18);
  const top_pink_rear_strip = new THREE.Mesh(top_pink_rear_stripGeom, pinkMat);
  top_pink_rear_strip.name = "top_pink_rear_strip";
  top_pink_rear_strip.position.set(0.47, 0.094, -0.72);
  root.add(top_pink_rear_strip);

  const top_lime_front_stripGeom = new THREE.BoxGeometry(0.22, 0.014, 0.18);
  const top_lime_front_strip = new THREE.Mesh(top_lime_front_stripGeom, limeMat);
  top_lime_front_strip.name = "top_lime_front_strip";
  top_lime_front_strip.position.set(0.47, 0.094, 0.72);
  root.add(top_lime_front_strip);

  const front_face_pinkGeom = verticalRoundedGeom(0.62, 0.25, 0.025, 0.025);
  const front_face_pink = new THREE.Mesh(front_face_pinkGeom, pinkMat);
  front_face_pink.name = "front_face_pink";
  front_face_pink.position.set(-0.31, bodyY, bodyL / 2 - 0.006);
  root.add(front_face_pink);

  const front_face_blueGeom = verticalRoundedGeom(0.31, 0.25, 0.025, 0.02);
  const front_face_blue = new THREE.Mesh(front_face_blueGeom, blueMat);
  front_face_blue.name = "front_face_blue";
  front_face_blue.position.set(0.155, bodyY, bodyL / 2 - 0.006);
  root.add(front_face_blue);

  const front_face_yellowGeom = verticalRoundedGeom(0.18, 0.25, 0.025, 0.02);
  const front_face_yellow = new THREE.Mesh(front_face_yellowGeom, yellowMat);
  front_face_yellow.name = "front_face_yellow";
  front_face_yellow.position.set(0.395, bodyY, bodyL / 2 - 0.006);
  root.add(front_face_yellow);

  const front_face_orangeGeom = verticalRoundedGeom(0.14, 0.25, 0.025, 0.02);
  const front_face_orange = new THREE.Mesh(front_face_orangeGeom, orangeMat);
  front_face_orange.name = "front_face_orange";
  front_face_orange.position.set(0.56, bodyY, bodyL / 2 - 0.006);
  root.add(front_face_orange);

  const right_front_orangeGeom = new THREE.BoxGeometry(0.026, 0.25, 0.58);
  const right_front_orange = new THREE.Mesh(right_front_orangeGeom, orangeMat);
  right_front_orange.name = "right_front_orange";
  right_front_orange.position.set(bodyW / 2 + 0.006, bodyY, 0.535);
  root.add(right_front_orange);

  const right_middle_pinkGeom = new THREE.BoxGeometry(0.026, 0.25, 0.54);
  const right_middle_pink = new THREE.Mesh(right_middle_pinkGeom, pinkMat);
  right_middle_pink.name = "right_middle_pink";
  right_middle_pink.position.set(bodyW / 2 + 0.006, bodyY, 0);
  root.add(right_middle_pink);

  const right_rear_coralGeom = new THREE.BoxGeometry(0.026, 0.25, 0.53);
  const right_rear_coral = new THREE.Mesh(right_rear_coralGeom, coralMat);
  right_rear_coral.name = "right_rear_coral";
  right_rear_coral.position.set(bodyW / 2 + 0.006, bodyY, -0.545);
  root.add(right_rear_coral);

  const left_side_greenGeom = new THREE.BoxGeometry(0.024, 0.25, 1.59);
  const left_side_green = new THREE.Mesh(left_side_greenGeom, greenMat);
  left_side_green.name = "left_side_green";
  left_side_green.position.set(-bodyW / 2 - 0.006, bodyY, 0);
  root.add(left_side_green);

  const rear_face_coralGeom = verticalRoundedGeom(0.63, 0.25, 0.025, 0.025);
  const rear_face_coral = new THREE.Mesh(rear_face_coralGeom, coralMat);
  rear_face_coral.name = "rear_face_coral";
  rear_face_coral.position.set(-0.315, bodyY, -bodyL / 2 + 0.006);
  rear_face_coral.rotation.y = Math.PI;
  root.add(rear_face_coral);

  const rear_face_pinkGeom = verticalRoundedGeom(0.63, 0.25, 0.025, 0.025);
  const rear_face_pink = new THREE.Mesh(rear_face_pinkGeom, pinkMat);
  rear_face_pink.name = "rear_face_pink";
  rear_face_pink.position.set(0.315, bodyY, -bodyL / 2 + 0.006);
  rear_face_pink.rotation.y = Math.PI;
  root.add(rear_face_pink);

  const front_edgeGeom = new THREE.BoxGeometry(1.19, 0.018, 0.024);
  const front_edge = new THREE.Mesh(front_edgeGeom, brushedMetalMat);
  front_edge.name = "front_edge";
  front_edge.position.set(0, -0.205, 0.832);
  root.add(front_edge);

  const right_edgeGeom = new THREE.BoxGeometry(0.024, 0.018, 1.57);
  const right_edge = new THREE.Mesh(right_edgeGeom, brushedMetalMat);
  right_edge.name = "right_edge";
  right_edge.position.set(0.632, -0.205, 0);
  root.add(right_edge);

  const rear_edgeGeom = new THREE.BoxGeometry(1.19, 0.018, 0.024);
  const rear_edge = new THREE.Mesh(rear_edgeGeom, brushedMetalMat);
  rear_edge.name = "rear_edge";
  rear_edge.position.set(0, -0.205, -0.832);
  root.add(rear_edge);

  const key_support_railGeom = new THREE.BoxGeometry(0.055, 0.035, 1.28);
  const key_support_rail = new THREE.Mesh(key_support_railGeom, darkGreenMat);
  key_support_rail.name = "key_support_rail";
  key_support_rail.position.set(0.39, 0.105, 0);
  root.add(key_support_rail);

  const long_tone_barsGeom = horizontalRoundedGeom(0.205, 1.02, 0.045, 0.035);
  const long_tone_bars = new THREE.InstancedMesh(long_tone_barsGeom, silverMat, 4);
  long_tone_bars.name = "long_tone_bars";
  const longBarX = [-0.46, -0.155, 0.155, 0.46];
  const instanceMatrix = new THREE.Matrix4();
  for (let i = 0; i < longBarX.length; i++) {
    instanceMatrix.makeTranslation(longBarX[i], 0.115, 0.17);
    long_tone_bars.setMatrixAt(i, instanceMatrix);
  }
  long_tone_bars.instanceMatrix.needsUpdate = true;
  root.add(long_tone_bars);

  const short_tone_barsGeom = horizontalRoundedGeom(0.205, 0.56, 0.045, 0.035);
  const short_tone_bars = new THREE.InstancedMesh(short_tone_barsGeom, silverMat, 4);
  short_tone_bars.name = "short_tone_bars";
  for (let i = 0; i < longBarX.length; i++) {
    instanceMatrix.makeTranslation(longBarX[i], 0.115, -0.56);
    short_tone_bars.setMatrixAt(i, instanceMatrix);
  }
  short_tone_bars.instanceMatrix.needsUpdate = true;
  root.add(short_tone_bars);

  const cross_bracketGeom = horizontalRoundedGeom(1.08, 0.15, 0.035, 0.035);
  const cross_bracket = new THREE.Mesh(cross_bracketGeom, silverMat);
  cross_bracket.name = "cross_bracket";
  cross_bracket.position.set(0, 0.165, -0.27);
  root.add(cross_bracket);

  const bracket_rivet_washerGeom = new THREE.CylinderGeometry(0.068, 0.068, 0.012, 20);
  const bracket_rivet_washers = new THREE.InstancedMesh(
    bracket_rivet_washerGeom,
    darkMetalMat,
    2
  );
  bracket_rivet_washers.name = "bracket_rivet_washers";
  for (let i = 0; i < 2; i++) {
    const x = i === 0 ? -0.46 : 0.46;
    instanceMatrix.makeTranslation(x, 0.207, -0.27);
    bracket_rivet_washers.setMatrixAt(i, instanceMatrix);
  }
  bracket_rivet_washers.instanceMatrix.needsUpdate = true;
  root.add(bracket_rivet_washers);

  const bracket_rivetGeom = new THREE.SphereGeometry(0.055, 18, 10);
  const bracket_rivets = new THREE.InstancedMesh(bracket_rivetGeom, polishedMetalMat, 2);
  bracket_rivets.name = "bracket_rivets";
  const rivetScale = new THREE.Vector3(1, 0.35, 1);
  const rivetQuaternion = new THREE.Quaternion();
  for (let i = 0; i < 2; i++) {
    const x = i === 0 ? -0.46 : 0.46;
    instanceMatrix.compose(
      new THREE.Vector3(x, 0.219, -0.27),
      rivetQuaternion,
      rivetScale
    );
    bracket_rivets.setMatrixAt(i, instanceMatrix);
  }
  bracket_rivets.instanceMatrix.needsUpdate = true;
  root.add(bracket_rivets);

  const front_socket_rimGeom = new THREE.TorusGeometry(0.052, 0.012, 8, 20);
  const front_socket_rim = new THREE.Mesh(front_socket_rimGeom, darkMetalMat);
  front_socket_rim.name = "front_socket_rim";
  front_socket_rim.position.set(-0.29, -0.11, 0.851);
  root.add(front_socket_rim);

  const front_socketGeom = new THREE.CircleGeometry(0.043, 20);
  const front_socket = new THREE.Mesh(front_socketGeom, rubberMat);
  front_socket.name = "front_socket";
  front_socket.position.set(-0.29, -0.11, 0.853);
  root.add(front_socket);

  const front_screwGeom = new THREE.CylinderGeometry(0.035, 0.035, 0.014, 16);
  const front_screw = new THREE.Mesh(front_screwGeom, polishedMetalMat);
  front_screw.name = "front_screw";
  front_screw.rotation.x = Math.PI / 2;
  front_screw.position.set(0.46, -0.12, 0.852);
  root.add(front_screw);

  const front_screw_slotGeom = new THREE.BoxGeometry(0.045, 0.008, 0.008);
  const front_screw_slot = new THREE.Mesh(front_screw_slotGeom, darkMetalMat);
  front_screw_slot.name = "front_screw_slot";
  front_screw_slot.position.set(0.46, -0.12, 0.862);
  front_screw_slot.rotation.z = 0.4;
  root.add(front_screw_slot);

  const side_rivetGeom = new THREE.CylinderGeometry(0.034, 0.034, 0.014, 16);
  const side_rivets = new THREE.InstancedMesh(side_rivetGeom, polishedMetalMat, 2);
  side_rivets.name = "side_rivets";
  const sideRivetQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, 0, Math.PI / 2)
  );
  const unitScale = new THREE.Vector3(1, 1, 1);
  const sideRivetZ = [-0.55, 0.53];
  for (let i = 0; i < sideRivetZ.length; i++) {
    instanceMatrix.compose(
      new THREE.Vector3(0.652, -0.08, sideRivetZ[i]),
      sideRivetQuaternion,
      unitScale
    );
    side_rivets.setMatrixAt(i, instanceMatrix);
  }
  side_rivets.instanceMatrix.needsUpdate = true;
  root.add(side_rivets);

  const handle_mountGeom = new THREE.CylinderGeometry(0.14, 0.14, 0.18, 24);
  const handle_mount = new THREE.Mesh(handle_mountGeom, darkMetalMat);
  handle_mount.name = "handle_mount";
  handle_mount.rotation.z = Math.PI / 2;
  handle_mount.position.set(0.67, -0.08, 0.31);
  root.add(handle_mount);

  const handle_gasketGeom = new THREE.CylinderGeometry(0.125, 0.125, 0.055, 24);
  const handle_gasket = new THREE.Mesh(handle_gasketGeom, rubberMat);
  handle_gasket.name = "handle_gasket";
  handle_gasket.rotation.z = Math.PI / 2;
  handle_gasket.position.set(0.755, -0.08, 0.31);
  root.add(handle_gasket);

  const handleProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.105, 0.0),
    new THREE.Vector2(0.11, 0.05),
    new THREE.Vector2(0.12, 0.13),
    new THREE.Vector2(0.14, 0.23),
    new THREE.Vector2(0.17, 0.35),
    new THREE.Vector2(0.185, 0.43),
    new THREE.Vector2(0.17, 0.49),
    new THREE.Vector2(0.12, 0.54),
    new THREE.Vector2(0.0, 0.56),
  ];
  const wooden_handleGeom = new THREE.LatheGeometry(handleProfile, 32);
  const wooden_handle = new THREE.Mesh(wooden_handleGeom, woodMat);
  wooden_handle.name = "wooden_handle";
  wooden_handle.rotation.z = -Math.PI / 2;
  wooden_handle.position.set(0.72, -0.08, 0.31);
  root.add(wooden_handle);

  const handle_ringGeom = new THREE.TorusGeometry(0.15, 0.011, 8, 24);
  const handle_rings = new THREE.InstancedMesh(handle_ringGeom, darkWoodMat, 3);
  handle_rings.name = "handle_rings";
  const ringQuaternion = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(0, Math.PI / 2, 0)
  );
  const ringData = [
    [0.98, 1.0],
    [1.045, 1.07],
    [1.11, 1.14],
  ];
  for (let i = 0; i < ringData.length; i++) {
    const scale = ringData[i][1];
    instanceMatrix.compose(
      new THREE.Vector3(ringData[i][0], -0.08, 0.31),
      ringQuaternion,
      new THREE.Vector3(scale, scale, scale)
    );
    handle_rings.setMatrixAt(i, instanceMatrix);
  }
  handle_rings.instanceMatrix.needsUpdate = true;
  root.add(handle_rings);

  const handle_grain = new THREE.Group();
  handle_grain.name = "handle_grain";
  for (let i = 0; i < 3; i++) {
    const angle = 0.55 + i * 0.75;
    const grainPoints = [
      [0.82, 0.108],
      [0.91, 0.122],
      [1.02, 0.145],
      [1.14, 0.168],
      [1.23, 0.165],
    ];
    const points = [];
    for (let j = 0; j < grainPoints.length; j++) {
      const radius = grainPoints[j][1];
      points.push(
        new THREE.Vector3(
          grainPoints[j][0],
          -0.08 + Math.cos(angle) * radius,
          0.31 + Math.sin(angle) * radius
        )
      );
    }
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      16,
      0.0035,
      5,
      false
    );
    const grain = new THREE.Mesh(grainGeom, darkWoodMat);
    handle_grain.add(grain);
  }
  root.add(handle_grain);

  fitToUnitCube(root);
  return root;

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
}