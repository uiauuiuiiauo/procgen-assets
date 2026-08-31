export default function generate(THREE) {
  const root = new THREE.Group();
  const firebox_group = new THREE.Group();
  const grate_group = new THREE.Group();
  const stand_group = new THREE.Group();
  const fuel_group = new THREE.Group();
  root.add(firebox_group, grate_group, stand_group, fuel_group);

  const fireboxMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const grateMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.0,
    roughness: 0.8,
  });
  const charcoalMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.9,
  });
  const ashMat = new THREE.MeshStandardMaterial({
    color: 0x555555,
    metalness: 0.0,
    roughness: 0.9,
  });
  const emberMat = new THREE.MeshStandardMaterial({
    color: 0xff3b18,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xff3b18,
    emissiveIntensity: 1.0,
  });

  function roundedRectLoop(width, depth, radius, y, cornerSegments) {
    const points = [];
    const centers = [
      [width / 2 - radius, depth / 2 - radius],
      [-width / 2 + radius, depth / 2 - radius],
      [-width / 2 + radius, -depth / 2 + radius],
      [width / 2 - radius, -depth / 2 + radius],
    ];
    for (let corner = 0; corner < 4; corner++) {
      const start = corner * Math.PI / 2;
      for (let i = 0; i <= cornerSegments; i++) {
        const angle = start + i / cornerSegments * Math.PI / 2;
        points.push(new THREE.Vector3(
          centers[corner][0] + Math.cos(angle) * radius,
          y,
          centers[corner][1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  function makeRoundedShape(width, depth, radius) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2 + radius, -depth / 2);
    shape.lineTo(width / 2 - radius, -depth / 2);
    shape.quadraticCurveTo(width / 2, -depth / 2, width / 2, -depth / 2 + radius);
    shape.lineTo(width / 2, depth / 2 - radius);
    shape.quadraticCurveTo(width / 2, depth / 2, width / 2 - radius, depth / 2);
    shape.lineTo(-width / 2 + radius, depth / 2);
    shape.quadraticCurveTo(-width / 2, depth / 2, -width / 2, depth / 2 - radius);
    shape.lineTo(-width / 2, -depth / 2 + radius);
    shape.quadraticCurveTo(-width / 2, -depth / 2, -width / 2 + radius, -depth / 2);
    return shape;
  }

  function makeTube(points, radius, material, closed, tubularSegments) {
    const curve = new THREE.CatmullRomCurve3(points, closed, "centripetal");
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, tubularSegments, radius, 10, closed),
      material
    );
  }

  function makeRod(start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const rod = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, length, 12),
      material
    );
    rod.position.copy(start).add(end).multiplyScalar(0.5);
    rod.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return rod;
  }

  const firebox_top_width = 3.5;
  const firebox_top_depth = 2.5;
  const firebox_bottom_width = 2.75;
  const firebox_bottom_depth = 1.8;
  const firebox_bottom_y = 0.4;
  const firebox_top_y = 1.6;

  const firebox_vertices = [];
  function addFireboxPanel(points) {
    const base = firebox_vertices.length / 3;
    for (const point of points) firebox_vertices.push(point.x, point.y, point.z);
    firebox_vertices.push(
      points[0].x, points[0].y, points[0].z,
      points[1].x, points[1].y, points[1].z,
      points[2].x, points[2].y, points[2].z),
      firebox_vertices.push(
      points[0].x, points[0].y, points[0].z,
      points[2].x, points[2].y, points[2].z,
      points[3].x, points[3].y, points[3].z
    );
    return base;
  }

  const firebox_front_panel = addFireboxPanel([
    new THREE.Vector3(-firebox_bottom_width / 2, firebox_bottom_y, firebox_bottom_depth / 2),
    new THREE.Vector3(firebox_bottom_width / 2, firebox_bottom_y, firebox_bottom_depth / 2),
    new THREE.Vector3(firebox_top_width / 2, firebox_top_y, firebox_top_depth / 2),
    new THREE.Vector3(-firebox_top_width / 2, firebox_top_y, firebox_top_depth / 2),
  ]);
  const firebox_rear_panel = addFireboxPanel([
    new THREE.Vector3(firebox_bottom_width / 2, firebox_bottom_y, -firebox_bottom_depth / 2),
    new THREE.Vector3(-firebox_bottom_width / 2, firebox_bottom_y, -firebox_bottom_depth / 2),
    new THREE.Vector3(-firebox_top_width / 2, firebox_top_y, -firebox_top_depth / 2),
    new THREE.Vector3(firebox_top_width / 2, firebox_top_y, -firebox_top_depth / 2),
  ]);
  const firebox_left_panel = addFireboxPanel([
    new THREE.Vector3(-firebox_bottom_width / 2, firebox_bottom_y, -firebox_bottom_depth / 2),
    new THREE.Vector3(-firebox_bottom_width / 2, firebox_bottom_y, firebox_bottom_depth / 2),
    new THREE.Vector3(-firebox_top_width / 2, firebox_top_y, firebox_top_depth / 2),
    new THREE.Vector3(-firebox_top_width / 2, firebox_top_y, -firebox_top_depth / 2),
  ]);
  const firebox_right_panel = addFireboxPanel([
    new THREE.Vector3(firebox_bottom_width / 2, firebox_bottom_y, firebox_bottom_depth / 2),
    new THREE.Vector3(firebox_bottom_width / 2, firebox_bottom_y, -firebox_bottom_depth / 2),
    new THREE.Vector3(firebox_top_width / 2, firebox_top_y, -firebox_top_depth / 2),
    new THREE.Vector3(firebox_top_width / 2, firebox_top_y, firebox_top_depth / 2),
  ]);

  const firebox_bodyGeom = new THREE.BufferGeometry();
  firebox_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(firebox_vertices, 3)
  );
  firebox_bodyGeom.computeVertexNormals();

  const firebox_body = new THREE.Mesh(firebox_bodyGeom, fireboxMat);
  firebox_group.add(firebox_body);

  const firebox_bottomGeom = new THREE.BoxGeometry(
    firebox_bottom_width,
    0.12,
    firebox_bottom_depth
  );
  const firebox_bottom = new THREE.Mesh(firebox_bottomGeom, fireboxMat);
  firebox_bottom.position.y = 0.4;
  firebox_group.add(firebox_bottom);

  const firebox_rim = makeTube(
    roundedRectLoop(3.62, 2.62, 0.27, 1.64, 5),
    0.065,
    fireboxMat,
    true,
    96
  );
  firebox_group.add(firebox_rim);

  const firebox_lower_band = makeTube(
    roundedRectLoop(2.84, 1.89, 0.19, 0.46, 4),
    0.035,
    fireboxMat,
    true,
    72
  );
  firebox_group.add(firebox_lower_band);

  const charcoal_bedGeom = new THREE.BoxGeometry(2.95, 0.08, 1.72);
  const charcoal_bed = new THREE.Mesh(charcoal_bedGeom, charcoalMat);
  charcoal_bed.position.y = 1.18;
  fuel_group.add(charcoal_bed);

  const ember_glowGeom = new THREE.SphereGeometry(1, 18, 10);
  const ember_glow = new THREE.Mesh(ember_glowGeom, emberMat);
  ember_glow.position.set(0, 1.245, 0);
  ember_glow.scale.set(1.28, 0.075, 0.7);
  fuel_group.add(ember_glow);

  const charcoal_piecesGeom = new THREE.DodecahedronGeometry(1, 0);
  const charcoal_pieces = new THREE.InstancedMesh(
    charcoal_piecesGeom,
    charcoalMat,
    28
  );
  const charcoal_dummy = new THREE.Object3D();
  for (let i = 0; i < 28; i++) {
    const row = Math.floor(i / 7);
    const column = i % 7;
    const x = -1.25 + column * (2.5 / 6) + (row % 2) * 0.045;
    const z = -0.68 + row * 0.45;
    const y = 1.3 + (i % 3) * 0.018;
    const sx = 0.17 + (i % 4) * 0.018;
    const sy = 0.115 + ((i * 2) % 4) * 0.012;
    const sz = 0.145 + ((i * 3) % 5) * 0.012;
    charcoal_dummy.position.set(x, y, z);
    charcoal_dummy.rotation.set(
      (i % 5) * 0.31,
      (i % 7) * 0.43,
      (i % 4) * 0.27
    );
    charcoal_dummy.scale.set(sx, sy, sz);
    charcoal_dummy.updateMatrix();
    charcoal_pieces.setMatrixAt(i, charcoal_dummy.matrix);
  }
  charcoal_pieces.instanceMatrix.needsUpdate = true;
  fuel_group.add(charcoal_pieces);

  const ash_piecesGeom = new THREE.DodecahedronGeometry(1, 0);
  const ash_pieces = new THREE.InstancedMesh(ash_piecesGeom, ashMat, 12);
  const ash_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const x = -1.12 + (i % 6) * 0.45 + (Math.floor(i / 6) % 2) * 0.06;
    const z = -0.55 + Math.floor(i / 6) * 1.05 + (i % 3) * 0.08;
    ash_dummy.position.set(x, 1.405 + (i % 2) * 0.015, z);
    ash_dummy.rotation.set(i * 0.27, i * 0.39, i * 0.18);
    ash_dummy.scale.set(
      0.13 + (i % 3) * 0.018,
      0.07 + (i % 2) * 0.014,
      0.11 + (i % 4) * 0.012
    );
    ash_dummy.updateMatrix();
    ash_pieces.setMatrixAt(i, ash_dummy.matrix);
  }
  ash_pieces.instanceMatrix.needsUpdate = true;
  fuel_group.add(ash_pieces);

  const glowing_embersGeom = new THREE.DodecahedronGeometry(1, 0);
  const glowing_embers = new THREE.InstancedMesh(
    glowing_embersGeom,
    emberMat,
    18
  );
  const ember_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const x = -1.12 + (i % 9) * 0.28;
    const z = -0.48 + Math.floor(i / 9) * 0.88 + (i % 4) * 0.075;
    ember_dummy.position.set(x, 1.39 + (i % 3) * 0.012, z);
    ember_dummy.rotation.set(i * 0.24, i * 0.41, i * 0.17);
    ember_dummy.scale.set(
      0.085 + (i % 4) * 0.014,
      0.05 + (i % 3) * 0.01,
      0.075 + ((i * 2) % 4) * 0.012
    );
    ember_dummy.updateMatrix();
    glowing_embers.setMatrixAt(i, ember_dummy.matrix);
  }
  glowing_embers.instanceMatrix.needsUpdate = true;
  fuel_group.add(glowing_embers);

  const grate_longitudinal_rodsGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    2.2,
    10
  );
  const grate_longitudinal_rods = new THREE.InstancedMesh(
    grate_longitudinal_rodsGeom,
    grateMat,
    13
  );
  const grate_dummy = new THREE.Object3D();
  for (let i = 0; i < 13; i++) {
    grate_dummy.position.set(-1.32 + i * 0.22, 1.65, 0);
    grate_dummy.rotation.set(Math.PI / 2, 0, 0);
    grate_dummy.scale.set(1, 1, 1);
    grate_dummy.updateMatrix();
    grate_longitudinal_rods.setMatrixAt(i, grate_dummy.matrix);
  }
  grate_longitudinal_rods.instanceMatrix.needsUpdate = true;
  grate_group.add(grate_longitudinal_rods);

  const grate_cross_rodsGeom = new THREE.CylinderGeometry(
    0.027,
    0.027,
    3.18,
    10
  );
  const grate_cross_rods = new THREE.InstancedMesh(
    grate_cross_rodsGeom,
    grateMat,
    3
  );
  for (let i = 0; i < 3; i++) {
    grate_dummy.position.set(0, 1.675, -0.72 + i * 0.72);
    grate_dummy.rotation.set(0, 0, Math.PI / 2);
    grate_dummy.scale.set(1, 1, 1);
    grate_dummy.updateMatrix();
    grate_cross_rods.setMatrixAt(i, grate_dummy.matrix);
  }
  grate_cross_rods.instanceMatrix.needsUpdate = true;
  grate_group.add(grate_cross_rods);

  const grate_frame = makeTube(
    roundedRectLoop(3.25, 2.25, 0.12, 1.66, 4),
    0.034,
    grateMat,
    true,
    80
  );
  grate_group.add(grate_frame);

  const side_handle_points = [
    new THREE.Vector3(1.61, 1.5, -0.72),
    new THREE.Vector3(1.82, 1.5, -0.66),
    new THREE.Vector3(1.98, 1.5, -0.42),
    new THREE.Vector3(2.02, 1.5, 0.42),
    new THREE.Vector3(1.84, 1.5, 0.67),
    new THREE.Vector3(1.61, 1.5, 0.72),
  ];
  const side_handle_curve = new THREE.CatmullRomCurve3(
    side_handle_points,
    false,
    "centripetal"
  );
  const side_handleGeom = new THREE.TubeGeometry(
    side_handle_curve,
    40,
    0.045,
    10,
    false
  );
  const right_handle = new THREE.Mesh(side_handleGeom, polished_metalMat);
  firebox_group.add(right_handle);

  const left_handle = new THREE.Mesh(side_handleGeom, polished_metalMat);
  left_handle.scale.x = -1;
  firebox_group.add(left_handle);

  const handle_mountsGeom = new THREE.CylinderGeometry(
    0.07,
    0.07,
    0.18,
    12
  );
  const handle_mounts = new THREE.InstancedMesh(
    handle_mountsGeom,
    polished_metalMat,
    4
  );
  const handle_mount_positions = [
    [1.66, 1.5, -0.72],
    [1.66, 1.5, 0.72],
    [-1.66, 1.5, -0.72],
    [-1.66, 1.5, 0.72],
  ];
  for (let i = 0; i < handle_mount_positions.length; i++) {
    const p = handle_mount_positions[i];
    grate_dummy.position.set(p[0], p[1], p[2]);
    grate_dummy.rotation.set(0, 0, Math.PI / 2);
    grate_dummy.scale.set(1, 1, 1);
    grate_dummy.updateMatrix();
    handle_mounts.setMatrixAt(i, grate_dummy.matrix);
  }
  handle_mounts.instanceMatrix.needsUpdate = true;
  firebox_group.add(handle_mounts);

  const support_legsGeom = new THREE.CylinderGeometry(
    0.065,
    0.065,
    1,
    14
  );
  const support_legs = new THREE.InstancedMesh(
    support_legsGeom,
    brushed_metalMat,
    4
  );
  const rubber_feetGeom = new THREE.CylinderGeometry(
    0.07,
    0.13,
    1,
    14
  );
  const rubber_feet = new THREE.InstancedMesh(
    rubber_feetGeom,
    rubberMat,
    4
  );

  const leg_pairs = [
    [
      new THREE.Vector3(-1.52, -1.06, 1.03),
      new THREE.Vector3(-1.27, 0.54, 0.82),
    ],
    [
      new THREE.Vector3(1.52, -1.06, 1.03),
      new THREE.Vector3(1.27, 0.54, 0.82),
    ],
    [
      new THREE.Vector3(-1.52, -1.06, -1.03),
      new THREE.Vector3(-1.27, 0.54, -0.82),
    ],
    [
      new THREE.Vector3(1.52, -1.06, -1.03),
      new THREE.Vector3(1.27, 0.54, -0.82),
    ],
  ];
  const leg_dummy = new THREE.Object3D();
  for (let i = 0; i < leg_pairs.length; i++) {
    const bottom = leg_pairs[i][0];
    const top = leg_pairs[i][1];
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const length = direction.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    leg_dummy.position.copy(bottom).add(top).multiplyScalar(0.5);
    leg_dummy.quaternion.copy(quaternion);
    leg_dummy.scale.set(1, length, 1);
    leg_dummy.updateMatrix();
    support_legs.setMatrixAt(i, leg_dummy.matrix);

    const foot_length = 0.29;
    leg_dummy.position.copy(bottom).add(direction.clone().normalize().multiplyScalar(foot_length / 2));
    leg_dummy.quaternion.copy(quaternion);
    leg_dummy.scale.set(1, foot_length, 1);
    leg_dummy.updateMatrix();
    rubber_feet.setMatrixAt(i, leg_dummy.matrix);
  }
  support_legs.instanceMatrix.needsUpdate = true;
  rubber_feet.instanceMatrix.needsUpdate = true;
  stand_group.add(support_legs, rubber_feet);

  const stand_perimeter = makeTube(
    roundedRectLoop(3.05, 2.05, 0.18, -0.82, 4),
    0.045,
    polished_metalMat,
    true,
    80
  );
  stand_group.add(stand_perimeter);

  const drip_trayShape = makeRoundedShape(2.42, 1.42, 0.18);
  const drip_trayGeom = new THREE.ExtrudeGeometry(drip_trayShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  const drip_tray = new THREE.Mesh(drip_trayGeom, brushed_metalMat);
  drip_tray.rotation.x = Math.PI / 2;
  drip_tray.position.y = -0.74;
  stand_group.add(drip_tray);

  const drip_tray_rim = makeTube(
    roundedRectLoop(2.48, 1.48, 0.19, -0.715, 4),
    0.035,
    polished_metalMat,
    true,
    64
  );
  stand_group.add(drip_tray_rim);

  const tray_mountGeom = new THREE.CylinderGeometry(0.18, 0.22, 0.13, 20);
  const tray_mount = new THREE.Mesh(tray_mountGeom, polished_metalMat);
  tray_mount.position.y = -0.65;
  stand_group.add(tray_mount);

  const tray_mount_ringGeom = new THREE.TorusGeometry(0.18, 0.025, 8, 24);
  const tray_mount_ring = new THREE.Mesh(tray_mount_ringGeom, fireboxMat);
  tray_mount_ring.rotation.x = Math.PI / 2;
  tray_mount_ring.position.y = -0.585;
  stand_group.add(tray_mount_ring);

  const front_cross_brace = makeRod(
    new THREE.Vector3(-1.36, -0.84, 0.62),
    new THREE.Vector3(1.36, -0.84, 0.62),
    0.032,
    polished_metalMat
  );
  const rear_cross_brace = makeRod(
    new THREE.Vector3(-1.36, -0.84, -0.62),
    new THREE.Vector3(1.36, -0.84, -0.62),
    0.032,
    polished_metalMat
  );
  stand_group.add(front_cross_brace, rear_cross_brace);

  fitToUnitCube(root);
  return root;

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
}