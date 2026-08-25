export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "neon_cylinder_sign";

  const body_length = 4.6;
  const body_radius = 0.86;
  const body_half = body_length / 2;

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x160d1c,
    metalness: 0.0,
    roughness: 0.3,
  });
  const end_collarMat = new THREE.MeshStandardMaterial({
    color: 0x202126,
    metalness: 0.0,
    roughness: 0.8,
  });
  const end_faceMat = new THREE.MeshStandardMaterial({
    color: 0x0c0c10,
    metalness: 0.0,
    roughness: 0.8,
  });
  const mountingMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const cableMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    metalness: 0.0,
    roughness: 0.8,
  });

  const red_neonMat = new THREE.MeshStandardMaterial({
    color: 0xff2038,
    emissive: 0xff2038,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_neon_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffc0b4,
    emissive: 0xffc0b4,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_neonMat = new THREE.MeshStandardMaterial({
    color: 0x008dff,
    emissive: 0x008dff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_neon_coreMat = new THREE.MeshStandardMaterial({
    color: 0xcafcff,
    emissive: 0xcafcff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_backingMat = new THREE.MeshStandardMaterial({
    color: 0x4a0010,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_backingMat = new THREE.MeshStandardMaterial({
    color: 0x00183d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_haloMat = new THREE.MeshBasicMaterial({
    color: 0xff1738,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });
  const blue_haloMat = new THREE.MeshBasicMaterial({
    color: 0x008eff,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
  });

  function surface_point(x, y, extra) {
    const base_z = Math.sqrt(Math.max(0, body_radius * body_radius - y * y));
    const radial = new THREE.Vector3(0, y, base_z).normalize();
    return new THREE.Vector3(x, y, base_z).addScaledVector(radial, extra);
  }

  function surface_normal(y) {
    const base_z = Math.sqrt(Math.max(0, body_radius * body_radius - y * y));
    return new THREE.Vector3(0, y, base_z).normalize();
  }

  function make_surface_curve(coords, extra, closed) {
    const points = [];
    for (let i = 0; i < coords.length; i++) {
      points.push(surface_point(coords[i][0], coords[i][1], extra));
    }
    if (closed && points.length > 2) {
      points.pop();
    }
    return new THREE.CatmullRomCurve3(points, closed, "centripetal");
  }

  function add_mounted_stroke(parent, name, coords, closed, outer_mat, core_mat, halo_mat) {
    const stroke_group = new THREE.Group();
    stroke_group.name = name;

    const mounting_curve = make_surface_curve(coords, 0.028, closed);
    const mountingGeom = new THREE.TubeGeometry(
      mounting_curve,
      Math.max(24, coords.length * 6),
      0.074,
      8,
      closed
    );
    const mounting = new THREE.Mesh(mountingGeom, mountingMat);
    mounting.name = name + "_mounting";
    stroke_group.add(mounting);

    const halo_curve = make_surface_curve(coords, 0.055, closed);
    const haloGeom = new THREE.TubeGeometry(
      halo_curve,
      Math.max(28, coords.length * 6),
      0.112,
      8,
      closed
    );
    const halo = new THREE.Mesh(haloGeom, halo_mat);
    halo.name = name + "_halo";
    stroke_group.add(halo);

    const outer_curve = make_surface_curve(coords, 0.085, closed);
    const outerGeom = new THREE.TubeGeometry(
      outer_curve,
      Math.max(30, coords.length * 6),
      0.074,
      10,
      closed
    );
    const outer_tube = new THREE.Mesh(outerGeom, outer_mat);
    outer_tube.name = name + "_outer_tube";
    stroke_group.add(outer_tube);

    const core_curve = make_surface_curve(coords, 0.15, closed);
    const coreGeom = new THREE.TubeGeometry(
      core_curve,
      Math.max(30, coords.length * 6),
      0.031,
      10,
      closed
    );
    const core_tube = new THREE.Mesh(coreGeom, core_mat);
    core_tube.name = name + "_core_tube";
    stroke_group.add(core_tube);

    parent.add(stroke_group);
    return stroke_group;
  }

  const main_bodyGeom = new THREE.CylinderGeometry(
    body_radius,
    body_radius,
    body_length,
    64,
    1,
    false
  );
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.name = "main_body";
  main_body.rotation.z = Math.PI / 2;
  root.add(main_body);

  const end_collarGeom = new THREE.CylinderGeometry(0.96, 0.96, 0.3, 48);

  const left_end_collar = new THREE.Mesh(end_collarGeom, end_collarMat);
  left_end_collar.name = "left_end_collar";
  left_end_collar.rotation.z = Math.PI / 2;
  left_end_collar.position.x = -body_half;
  root.add(left_end_collar);

  const right_end_collar = new THREE.Mesh(end_collarGeom, end_collarMat);
  right_end_collar.name = "right_end_collar";
  right_end_collar.rotation.z = Math.PI / 2;
  right_end_collar.position.x = body_half;
  root.add(right_end_collar);

  const end_bandGeom = new THREE.TorusGeometry(0.875, 0.045, 10, 48);

  const left_end_band = new THREE.Mesh(end_bandGeom, end_collarMat);
  left_end_band.name = "left_end_band";
  left_end_band.rotation.y = Math.PI / 2;
  left_end_band.position.x = -2.22;
  root.add(left_end_band);

  const right_end_band = new THREE.Mesh(end_bandGeom, end_collarMat);
  right_end_band.name = "right_end_band";
  right_end_band.rotation.y = Math.PI / 2;
  right_end_band.position.x = 2.22;
  root.add(right_end_band);

  const end_faceGeom = new THREE.CylinderGeometry(0.79, 0.79, 0.055, 48);

  const left_end_face = new THREE.Mesh(end_faceGeom, end_faceMat);
  left_end_face.name = "left_end_face";
  left_end_face.rotation.z = Math.PI / 2;
  left_end_face.position.x = -2.405;
  root.add(left_end_face);

  const right_end_face = new THREE.Mesh(end_faceGeom, end_faceMat);
  right_end_face.name = "right_end_face";
  right_end_face.rotation.z = Math.PI / 2;
  right_end_face.position.x = 2.405;
  root.add(right_end_face);

  const end_rimGeom = new THREE.TorusGeometry(0.82, 0.075, 12, 48);

  const left_end_rim = new THREE.Mesh(end_rimGeom, end_collarMat);
  left_end_rim.name = "left_end_rim";
  left_end_rim.rotation.y = Math.PI / 2;
  left_end_rim.position.x = -2.435;
  root.add(left_end_rim);

  const right_end_rim = new THREE.Mesh(end_rimGeom, end_collarMat);
  right_end_rim.name = "right_end_rim";
  right_end_rim.rotation.y = Math.PI / 2;
  right_end_rim.position.x = 2.435;
  root.add(right_end_rim);

  const left_power_socketGeom = new THREE.CylinderGeometry(0.105, 0.105, 0.055, 20);
  const left_power_socket = new THREE.Mesh(left_power_socketGeom, cableMat);
  left_power_socket.name = "left_power_socket";
  left_power_socket.rotation.z = Math.PI / 2;
  left_power_socket.position.set(-2.46, -0.08, 0.12);
  root.add(left_power_socket);

  const left_power_socket_centerGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.065, 16);
  const left_power_socket_center = new THREE.Mesh(left_power_socket_centerGeom, end_faceMat);
  left_power_socket_center.name = "left_power_socket_center";
  left_power_socket_center.rotation.z = Math.PI / 2;
  left_power_socket_center.position.set(-2.49, -0.08, 0.12);
  root.add(left_power_socket_center);

  const power_cable_path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.42, -0.16, -0.08),
    new THREE.Vector3(2.56, -0.22, -0.12),
    new THREE.Vector3(2.72, -0.39, -0.18),
    new THREE.Vector3(2.94, -0.62, -0.23),
  ], false, "centripetal");
  const power_cableGeom = new THREE.TubeGeometry(power_cable_path, 28, 0.047, 10, false);
  const power_cable = new THREE.Mesh(power_cableGeom, cableMat);
  power_cable.name = "power_cable";
  root.add(power_cable);

  const power_cable_grommetGeom = new THREE.SphereGeometry(0.075, 16, 10);
  const power_cable_grommet = new THREE.Mesh(power_cable_grommetGeom, cableMat);
  power_cable_grommet.name = "power_cable_grommet";
  power_cable_grommet.position.set(2.43, -0.16, -0.08);
  root.add(power_cable_grommet);

  const rear_support_points = [];
  for (let i = 0; i <= 8; i++) {
    const x = -1.95 + i * 0.4875;
    rear_support_points.push(surface_point(x, -0.04, 0.012));
  }
  const rear_support_railGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(rear_support_points, false, "centripetal"),
    40,
    0.035,
    8,
    false
  );
  const rear_support_rail = new THREE.Mesh(rear_support_railGeom, mountingMat);
  rear_support_rail.name = "rear_support_rail";
  root.add(rear_support_rail);

  const mounting_clipsGeom = new THREE.BoxGeometry(0.13, 0.075, 0.035);
  const mounting_clips = new THREE.InstancedMesh(mounting_clipsGeom, mountingMat, 8);
  mounting_clips.name = "mounting_clips";
  const clip_positions = [
    [-2.02, 0.0],
    [-1.08, 0.56],
    [-0.36, 0.0],
    [0.42, 0.0],
    [1.18, 0.0],
    [1.62, 0.55],
    [2.04, 0.0],
    [-1.7, -0.5],
  ];
  const clip_dummy = new THREE.Object3D();
  const local_front = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < clip_positions.length; i++) {
    const x = clip_positions[i][0];
    const y = clip_positions[i][1];
    const point = surface_point(x, y, 0.03);
    const normal = surface_normal(y);
    clip_dummy.position.copy(point);
    clip_dummy.quaternion.setFromUnitVectors(local_front, normal);
    clip_dummy.scale.set(1, 1, 1);
    clip_dummy.updateMatrix();
    mounting_clips.setMatrixAt(i, clip_dummy.matrix);
  }
  mounting_clips.instanceMatrix.needsUpdate = true;
  root.add(mounting_clips);

  const mounting_screwsGeom = new THREE.CylinderGeometry(0.024, 0.024, 0.026, 12);
  const mounting_screws = new THREE.InstancedMesh(mounting_screwsGeom, mountingMat, 8);
  mounting_screws.name = "mounting_screws";
  const screw_dummy = new THREE.Object3D();
  const local_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < clip_positions.length; i++) {
    const x = clip_positions[i][0];
    const y = clip_positions[i][1];
    const point = surface_point(x, y, 0.055);
    const normal = surface_normal(y);
    screw_dummy.position.copy(point);
    screw_dummy.quaternion.setFromUnitVectors(local_up, normal);
    screw_dummy.scale.set(1, 1, 1);
    screw_dummy.updateMatrix();
    mounting_screws.setMatrixAt(i, screw_dummy.matrix);
  }
  mounting_screws.instanceMatrix.needsUpdate = true;
  root.add(mounting_screws);

  const neon_letters = new THREE.Group();
  neon_letters.name = "neon_letters";
  root.add(neon_letters);

  const first_n_letter = new THREE.Group();
  first_n_letter.name = "first_n_letter";
  neon_letters.add(first_n_letter);

  const first_n_left_stroke = add_mounted_stroke(
    first_n_letter,
    "first_n_left_stroke",
    [
      [-1.92, -0.53],
      [-1.91, -0.27],
      [-1.89, 0.19],
      [-1.86, 0.49],
      [-1.81, 0.57],
    ],
    false,
    blue_neonMat,
    blue_neon_coreMat,
    blue_haloMat
  );

  const first_n_diagonal_stroke = add_mounted_stroke(
    first_n_letter,
    "first_n_diagonal_stroke",
    [
      [-1.84, 0.51],
      [-1.69, 0.48],
      [-1.43, 0.08],
      [-1.18, -0.4],
      [-1.12, -0.52],
      [-1.07, -0.46],
    ],
    false,
    blue_neonMat,
    blue_neon_coreMat,
    blue_haloMat
  );

  const first_n_right_stroke = add_mounted_stroke(
    first_n_letter,
    "first_n_right_stroke",
    [
      [-1.11, 0.49],
      [-1.08, 0.57],
      [-1.03, 0.49],
      [-1.0, -0.31],
      [-1.01, -0.5],
      [-1.06, -0.56],
    ],
    false,
    red_neonMat,
    red_neon_coreMat,
    red_haloMat
  );

  const e_letter = new THREE.Group();
  e_letter.name = "e_letter";
  neon_letters.add(e_letter);

  const e_vertical_stroke = add_mounted_stroke(
    e_letter,
    "e_vertical_stroke",
    [
      [-0.69, -0.52],
      [-0.7, -0.2],
      [-0.69, 0.2],
      [-0.67, 0.52],
      [-0.62, 0.58],
    ],
    false,
    blue_neonMat,
    blue_neon_coreMat,
    blue_haloMat
  );

  const e_top_stroke = add_mounted_stroke(
    e_letter,
    "e_top_stroke",
    [
      [-0.64, 0.53],
      [-0.4, 0.57],
      [0.2, 0.57],
      [0.4, 0.54],
      [0.45, 0.48],
      [0.4, 0.42],
      [0.03, 0.4],
      [-0.4, 0.39],
    ],
    false,
    blue_neonMat,
    blue_neon_coreMat,
    blue_haloMat
  );

  const e_middle_stroke = add_mounted_stroke(
    e_letter,
    "e_middle_stroke",
    [
      [-0.61, 0.04],
      [-0.3, 0.05],
      [0.13, 0.05],
      [0.31, 0.03],
      [0.34, -0.02],
      [0.28, -0.07],
      [-0.4, -0.08],
    ],
    false,
    red_neonMat,
    red_neon_coreMat,
    red_haloMat
  );

  const e_bottom_stroke = add_mounted_stroke(
    e_letter,
    "e_bottom_stroke",
    [
      [-0.62, -0.48],
      [-0.38, -0.55],
      [0.22, -0.55],
      [0.43, -0.52],
      [0.5, -0.46],
      [0.45, -0.4],
      [0.05, -0.38],
      [-0.42, -0.38],
    ],
    false,
    red_neonMat,
    red_neon_coreMat,
    red_haloMat
  );

  const o_letter = new THREE.Group();
  o_letter.name = "o_letter";
  neon_letters.add(o_letter);

  const o_loop_coords = [];
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    o_loop_coords.push([
      0.9 + Math.cos(angle) * 0.48,
      0.02 + Math.sin(angle) * 0.56,
    ]);
  }

  const o_loop = add_mounted_stroke(
    o_letter,
    "o_loop",
    o_loop_coords,
    true,
    red_neonMat,
    red_neon_coreMat,
    red_haloMat
  );

  const second_n_letter = new THREE.Group();
  second_n_letter.name = "second_n_letter";
  neon_letters.add(second_n_letter);

  const second_n_left_stroke = add_mounted_stroke(
    second_n_letter,
    "second_n_left_stroke",
    [
      [1.42, -0.51],
      [1.42, -0.18],
      [1.43, 0.24],
      [1.45, 0.52],
      [1.5, 0.58],
    ],
    false,
    blue_neonMat,
    blue_neon_coreMat,
    blue_haloMat
  );

  const second_n_diagonal_stroke = add_mounted_stroke(
    second_n_letter,
    "second_n_diagonal_stroke",
    [
      [1.47, 0.52],
      [1.62, 0.5],
      [1.88, 0.13],
      [2.1, -0.34],
      [2.14, -0.46],
      [2.1, -0.52],
    ],
    false,
    blue_neonMat,
    blue_neon_coreMat,
    blue_haloMat
  );

  const second_n_right_stroke = add_mounted_stroke(
    second_n_letter,
    "second_n_right_stroke",
    [
      [2.1, 0.51],
      [2.13, 0.57],
      [2.17, 0.5],
      [2.17, 0.22],
      [2.16, -0.32],
      [2.12, -0.5],
      [2.06, -0.55],
    ],
    false,
    red_neonMat,
    red_neon_coreMat,
    red_haloMat
  );

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