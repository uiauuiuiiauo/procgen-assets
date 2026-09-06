export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blender";

  const matte_blackMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glossy_blackMat = new THREE.MeshStandardMaterial({
    color: 0x090a0c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xe5eef2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xcbd7dd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const markMat = new THREE.MeshStandardMaterial({
    color: 0x899196,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.48,
  });
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const residueMat = new THREE.MeshStandardMaterial({
    color: 0x8b4a25,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
  });

  const motor_base = new THREE.Group();
  motor_base.name = "motor_base";
  root.add(motor_base);

  const base_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.48, 0.00),
    new THREE.Vector2(0.57, 0.025),
    new THREE.Vector2(0.62, 0.09),
    new THREE.Vector2(0.64, 0.20),
    new THREE.Vector2(0.63, 0.42),
    new THREE.Vector2(0.60, 0.66),
    new THREE.Vector2(0.55, 0.84),
    new THREE.Vector2(0.48, 0.92),
    new THREE.Vector2(0.00, 0.92),
  ];
  const base_bodyGeom = new THREE.LatheGeometry(base_bodyProfile, 48);
  const base_body = new THREE.Mesh(base_bodyGeom, matte_blackMat);
  base_body.name = "base_body";
  motor_base.add(base_body);

  const base_bottom_ringGeom = new THREE.CylinderGeometry(0.53, 0.56, 0.055, 48);
  const base_bottom_ring = new THREE.Mesh(base_bottom_ringGeom, glossy_blackMat);
  base_bottom_ring.name = "base_bottom_ring";
  base_bottom_ring.position.y = 0.025;
  motor_base.add(base_bottom_ring);

  const base_feetGeom = new THREE.CylinderGeometry(0.075, 0.085, 0.07, 16);
  const base_feet = new THREE.InstancedMesh(base_feetGeom, rubberMat, 4);
  base_feet.name = "base_feet";
  const feet_dummy = new THREE.Object3D();
  const feet_positions = [
    [-0.43, -0.025, 0.27],
    [0.43, -0.025, 0.27],
    [-0.43, -0.025, -0.27],
    [0.43, -0.025, -0.27],
  ];
  for (let i = 0; i < feet_positions.length; i++) {
    const p = feet_positions[i];
    feet_dummy.position.set(p[0], p[1], p[2]);
    feet_dummy.updateMatrix();
    base_feet.setMatrixAt(i, feet_dummy.matrix);
  }
  base_feet.instanceMatrix.needsUpdate = true;
  motor_base.add(base_feet);

  const motor_collarProfile = [
    new THREE.Vector2(0.00, 0.84),
    new THREE.Vector2(0.46, 0.84),
    new THREE.Vector2(0.49, 0.88),
    new THREE.Vector2(0.47, 0.98),
    new THREE.Vector2(0.44, 1.15),
    new THREE.Vector2(0.42, 1.20),
    new THREE.Vector2(0.00, 1.20),
  ];
  const motor_collarGeom = new THREE.LatheGeometry(motor_collarProfile, 48);
  const motor_collar = new THREE.Mesh(motor_collarGeom, matte_blackMat);
  motor_collar.name = "motor_collar";
  motor_base.add(motor_collar);

  const collar_lower_trimGeom = new THREE.TorusGeometry(0.465, 0.018, 10, 48);
  const collar_lower_trim = new THREE.Mesh(collar_lower_trimGeom, glossy_blackMat);
  collar_lower_trim.name = "collar_lower_trim";
  collar_lower_trim.rotation.x = Math.PI / 2;
  collar_lower_trim.position.y = 0.88;
  motor_base.add(collar_lower_trim);

  const jar_socketGeom = new THREE.CylinderGeometry(0.43, 0.45, 0.075, 48);
  const jar_socket = new THREE.Mesh(jar_socketGeom, glossy_blackMat);
  jar_socket.name = "jar_socket";
  jar_socket.position.y = 1.185;
  motor_base.add(jar_socket);

  const control_switchShape = new THREE.Shape();
  control_switchShape.moveTo(-0.17, 0.10);
  control_switchShape.lineTo(0.17, 0.10);
  control_switchShape.lineTo(0.145, -0.035);
  control_switchShape.bezierCurveTo(0.125, -0.10, 0.065, -0.16, 0.00, -0.17);
  control_switchShape.bezierCurveTo(-0.065, -0.16, -0.125, -0.10, -0.145, -0.035);
  control_switchShape.closePath();

  const control_switchGeom = new THREE.ExtrudeGeometry(control_switchShape, {
    depth: 0.035,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const control_switch = new THREE.Mesh(control_switchGeom, glossy_blackMat);
  control_switch.name = "control_switch";
  control_switch.position.set(0, 0.56, 0.595);
  motor_base.add(control_switch);

  const pitcher = new THREE.Group();
  pitcher.name = "pitcher";
  root.add(pitcher);

  const pitcher_bodyProfile = [
    new THREE.Vector2(0.00, 1.16),
    new THREE.Vector2(0.38, 1.16),
    new THREE.Vector2(0.42, 1.18),
    new THREE.Vector2(0.46, 1.25),
    new THREE.Vector2(0.50, 1.42),
    new THREE.Vector2(0.55, 1.70),
    new THREE.Vector2(0.59, 2.02),
    new THREE.Vector2(0.62, 2.34),
    new THREE.Vector2(0.64, 2.52),
    new THREE.Vector2(0.00, 2.52),
  ];
  const pitcher_bodyGeom = new THREE.LatheGeometry(pitcher_bodyProfile, 48);
  const pitcher_body = new THREE.Mesh(pitcher_bodyGeom, glassMat);
  pitcher_body.name = "pitcher_body";
  pitcher.add(pitcher_body);

  const pitcher_ribPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.22, 0.445),
    new THREE.Vector3(0, 1.39, 0.505),
    new THREE.Vector3(0, 1.70, 0.565),
    new THREE.Vector3(0, 2.02, 0.615),
    new THREE.Vector3(0, 2.30, 0.642),
  ]);
  const pitcher_ribsGeom = new THREE.TubeGeometry(
    pitcher_ribPath,
    28,
    0.018,
    8,
    false
  );
  const pitcher_ribs = new THREE.InstancedMesh(
    pitcher_ribsGeom,
    glass_edgeMat,
    8
  );
  pitcher_ribs.name = "pitcher_ribs";
  const ribs_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    ribs_dummy.position.set(0, 0, 0);
    ribs_dummy.rotation.set(0, (i / 8) * Math.PI * 2, 0);
    ribs_dummy.updateMatrix();
    pitcher_ribs.setMatrixAt(i, ribs_dummy.matrix);
  }
  pitcher_ribs.instanceMatrix.needsUpdate = true;
  pitcher.add(pitcher_ribs);

  const pitcher_bottom_ringGeom = new THREE.TorusGeometry(0.405, 0.022, 10, 48);
  const pitcher_bottom_ring = new THREE.Mesh(
    pitcher_bottom_ringGeom,
    glass_edgeMat
  );
  pitcher_bottom_ring.name = "pitcher_bottom_ring";
  pitcher_bottom_ring.rotation.x = Math.PI / 2;
  pitcher_bottom_ring.position.y = 1.19;
  pitcher.add(pitcher_bottom_ring);

  const blade_hubGeom = new THREE.CylinderGeometry(0.075, 0.09, 0.085, 24);
  const blade_hub = new THREE.Mesh(blade_hubGeom, bladeMat);
  blade_hub.name = "blade_hub";
  blade_hub.position.y = 1.235;
  pitcher.add(blade_hub);

  const blade_armsGeom = new THREE.BoxGeometry(0.27, 0.025, 0.055);
  const blade_arms = new THREE.InstancedMesh(blade_armsGeom, bladeMat, 4);
  blade_arms.name = "blade_arms";
  const blade_dummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    blade_dummy.position.set(
      Math.cos(angle) * 0.13,
      1.255,
      Math.sin(angle) * 0.13
    );
    blade_dummy.rotation.set(0, -angle, i % 2 === 0 ? 0.08 : -0.08);
    blade_dummy.updateMatrix();
    blade_arms.setMatrixAt(i, blade_dummy.matrix);
  }
  blade_arms.instanceMatrix.needsUpdate = true;
  pitcher.add(blade_arms);

  function pitcherRadiusAt(y) {
    if (y <= 1.42) {
      return 0.42 + ((y - 1.18) / 0.24) * 0.08;
    }
    if (y <= 2.02) {
      return 0.50 + ((y - 1.42) / 0.60) * 0.09;
    }
    return 0.59 + ((y - 2.02) / 0.50) * 0.05;
  }

  const measurement_markings = new THREE.Group();
  measurement_markings.name = "measurement_markings";
  pitcher.add(measurement_markings);

  const mark_heights = [1.50, 1.70, 1.90, 2.10, 2.30];
  for (let i = 0; i < mark_heights.length; i++) {
    const y = mark_heights[i];
    const radius = pitcherRadiusAt(y);
    const x = 0.16;
    const z = Math.sqrt(Math.max(0, radius * radius - x * x)) + 0.009;
    const mark_points = [
      new THREE.Vector3(x - 0.055, y, z),
      new THREE.Vector3(x + 0.055, y, z),
    ];
    const mark_lineGeom = new THREE.TubeGeometry(
      new THREE.LineCurve3(mark_points[0], mark_points[1]),
      1,
      0.005,
      6,
      false
    );
    const mark_line = new THREE.Mesh(mark_lineGeom, markMat);
    mark_line.name = "measurement_line_" + i;
    measurement_markings.add(mark_line);

    if (i % 2 === 0) {
      const digit_x = 0.075;
      const digit_z =
        Math.sqrt(Math.max(0, radius * radius - digit_x * digit_x)) + 0.01;
      const digit_points = [
        new THREE.Vector3(digit_x - 0.012, y - 0.022, digit_z),
        new THREE.Vector3(digit_x + 0.012, y, digit_z),
        new THREE.Vector3(digit_x - 0.012, y + 0.022, digit_z),
      ];
      const mark_digitGeom = new THREE.TubeGeometry(
        new THREE.CatmullRomCurve3(digit_points),
        8,
        0.004,
        6,
        false
      );
      const mark_digit = new THREE.Mesh(mark_digitGeom, markMat);
      mark_digit.name = "measurement_digit_" + i;
      measurement_markings.add(mark_digit);
    }
  }

  const residue_splashesGeom = new THREE.CircleGeometry(0.025, 12);
  const residue_splashes = new THREE.InstancedMesh(
    residue_splashesGeom,
    residueMat,
    7
  );
  residue_splashes.name = "residue_splashes";
  const residue_dummy = new THREE.Object3D();
  const residue_data = [
    [-0.25, 1.29, 0.75],
    [-0.16, 1.36, 0.45],
    [-0.06, 1.27, 0.62],
    [0.04, 1.31, 0.42],
    [0.14, 1.25, 0.70],
    [0.23, 1.34, 0.48],
    [0.30, 1.28, 0.36],
  ];
  const front_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < residue_data.length; i++) {
    const data = residue_data[i];
    const x = data[0];
    const y = data[1];
    const radius = pitcherRadiusAt(y);
    const z = Math.sqrt(Math.max(0, radius * radius - x * x));
    const normal = new THREE.Vector3(x, 0, z).normalize();
    residue_dummy.position.set(
      x + normal.x * 0.008,
      y,
      z + normal.z * 0.008
    );
    residue_dummy.quaternion.setFromUnitVectors(front_axis, normal);
    residue_dummy.scale.set(data[2], data[2] * 0.65, 1);
    residue_dummy.updateMatrix();
    residue_splashes.setMatrixAt(i, residue_dummy.matrix);
  }
  residue_splashes.instanceMatrix.needsUpdate = true;
  pitcher.add(residue_splashes);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(0.56, 2.51);
  handleShape.lineTo(0.80, 2.49);
  handleShape.lineTo(1.00, 2.40);
  handleShape.lineTo(1.09, 2.23);
  handleShape.lineTo(1.09, 1.63);
  handleShape.lineTo(1.00, 1.45);
  handleShape.lineTo(0.58, 1.19);
  handleShape.lineTo(0.49, 1.30);
  handleShape.lineTo(0.86, 1.57);
  handleShape.lineTo(0.95, 1.69);
  handleShape.lineTo(0.95, 2.10);
  handleShape.lineTo(0.88, 2.23);
  handleShape.lineTo(0.72, 2.31);
  handleShape.lineTo(0.55, 2.31);
  handleShape.closePath();

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.14,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
  });
  const handle = new THREE.Mesh(handleGeom, glass_edgeMat);
  handle.name = "handle";
  handle.position.z = -0.07;
  pitcher.add(handle);

  const handle_upper_mountGeom = new THREE.BoxGeometry(0.19, 0.17, 0.20);
  const handle_upper_mount = new THREE.Mesh(
    handle_upper_mountGeom,
    glass_edgeMat
  );
  handle_upper_mount.name = "handle_upper_mount";
  handle_upper_mount.position.set(0.61, 2.39, 0);
  handle_upper_mount.rotation.z = -0.08;
  pitcher.add(handle_upper_mount);

  const handle_lower_mountGeom = new THREE.BoxGeometry(0.17, 0.18, 0.19);
  const handle_lower_mount = new THREE.Mesh(
    handle_lower_mountGeom,
    glass_edgeMat
  );
  handle_lower_mount.name = "handle_lower_mount";
  handle_lower_mount.position.set(0.52, 1.31, 0);
  handle_lower_mount.rotation.z = 0.28;
  pitcher.add(handle_lower_mount);

  const spoutShape = new THREE.Shape();
  spoutShape.moveTo(-0.60, 2.50);
  spoutShape.lineTo(-0.94, 2.50);
  spoutShape.lineTo(-0.82, 2.36);
  spoutShape.lineTo(-0.65, 2.10);
  spoutShape.lineTo(-0.58, 2.16);
  spoutShape.lineTo(-0.66, 2.36);
  spoutShape.closePath();

  const spoutGeom = new THREE.ExtrudeGeometry(spoutShape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  const spout = new THREE.Mesh(spoutGeom, glass_edgeMat);
  spout.name = "spout";
  spout.position.z = -0.09;
  pitcher.add(spout);

  const spout_lipPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.95, 2.505, 0.00),
    new THREE.Vector3(-0.82, 2.515, 0.075),
    new THREE.Vector3(-0.67, 2.515, 0.10),
    new THREE.Vector3(-0.59, 2.505, 0.07),
  ]);
  const spout_lipGeom = new THREE.TubeGeometry(
    spout_lipPath,
    18,
    0.018,
    8,
    false
  );
  const spout_lip = new THREE.Mesh(spout_lipGeom, glass_edgeMat);
  spout_lip.name = "spout_lip";
  pitcher.add(spout_lip);

  const top_rim_bandGeom = new THREE.CylinderGeometry(
    0.665,
    0.64,
    0.28,
    48,
    1,
    true
  );
  const top_rim_band = new THREE.Mesh(top_rim_bandGeom, glossy_blackMat);
  top_rim_band.name = "top_rim_band";
  top_rim_band.position.y = 2.59;
  pitcher.add(top_rim_band);

  const rim_lower_trimGeom = new THREE.TorusGeometry(0.625, 0.021, 10, 48);
  const rim_lower_trim = new THREE.Mesh(rim_lower_trimGeom, glossy_blackMat);
  rim_lower_trim.name = "rim_lower_trim";
  rim_lower_trim.rotation.x = Math.PI / 2;
  rim_lower_trim.position.y = 2.45;
  pitcher.add(rim_lower_trim);

  const top_rimGeom = new THREE.TorusGeometry(0.65, 0.038, 12, 56);
  const top_rim = new THREE.Mesh(top_rimGeom, glossy_blackMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = 2.735;
  pitcher.add(top_rim);

  const rim_surfaceGeom = new THREE.RingGeometry(0.56, 0.66, 56);
  const rim_surface = new THREE.Mesh(rim_surfaceGeom, glossy_blackMat);
  rim_surface.name = "rim_surface";
  rim_surface.rotation.x = -Math.PI / 2;
  rim_surface.position.y = 2.725;
  pitcher.add(rim_surface);

  const rim_tabGeom = new THREE.BoxGeometry(0.17, 0.075, 0.105);
  const rim_tab = new THREE.Mesh(rim_tabGeom, glossy_blackMat);
  rim_tab.name = "rim_tab";
  rim_tab.position.set(0, 2.425, 0.57);
  pitcher.add(rim_tab);

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