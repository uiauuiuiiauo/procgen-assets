export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "plush_monkey_keychain";

  const monkey_group = new THREE.Group();
  monkey_group.name = "monkey_group";
  root.add(monkey_group);

  const keychain_group = new THREE.Group();
  keychain_group.name = "keychain_group";
  root.add(keychain_group);

  const plush_mat = new THREE.MeshStandardMaterial({
    color: 0x470b29,
    metalness: 0.0,
    roughness: 0.95
  });
  const plush_dark_mat = new THREE.MeshStandardMaterial({
    color: 0x2c0619,
    metalness: 0.0,
    roughness: 0.95
  });
  const cream_fabric_mat = new THREE.MeshStandardMaterial({
    color: 0xf2e4d8,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide
  });
  const muzzle_mat = new THREE.MeshStandardMaterial({
    color: 0xe8b9a2,
    metalness: 0.0,
    roughness: 0.95
  });
  const inner_ear_mat = new THREE.MeshStandardMaterial({
    color: 0xe8a99a,
    metalness: 0.0,
    roughness: 0.95
  });
  const eye_mat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.3
  });
  const highlight_mat = new THREE.MeshStandardMaterial({
    color: 0xf4f4ef,
    metalness: 0.0,
    roughness: 0.3
  });
  const thread_mat = new THREE.MeshStandardMaterial({
    color: 0x211218,
    metalness: 0.0,
    roughness: 0.8
  });
  const polished_metal_mat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const brushed_metal_mat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const unit_sphere_geom = new THREE.SphereGeometry(1, 32, 20);

  function make_ellipsoid(name, material, x, y, z, sx, sy, sz, parent) {
    const mesh = new THREE.Mesh(unit_sphere_geom, material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    parent.add(mesh);
    return mesh;
  }

  function make_tube(name, points, radius, material, segments, parent) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geometry = new THREE.TubeGeometry(curve, segments, radius, 8, false);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  function make_rod_between(name, start, end, radius, material, parent) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geometry = new THREE.CylinderGeometry(radius, radius, length, 12);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    parent.add(mesh);
    return mesh;
  }

  function make_ovral_geometry(outer_radius, inner_radius, tube_radius) {
    const ovral_points = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      ovral_points.push(new THREE.Vector3(
        Math.cos(angle) * outer_radius,
        Math.sin(angle) * inner_radius,
        0
      ));
    }
    const ovral_curve = new THREE.CatmullRomCurve3(
      ovral_points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(ovral_curve, 96, tube_radius, 12, true);
  }

  const tail_points = [
    new THREE.Vector3(0.27, 0.48, -0.15),
    new THREE.Vector3(0.47, 0.45, -0.14),
    new THREE.Vector3(0.61, 0.56, -0.10),
    new THREE.Vector3(0.66, 0.75, -0.05),
    new THREE.Vector3(0.64, 0.91, 0.00),
    new THREE.Vector3(0.57, 0.99, 0.04)
  ];
  const tail_geom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(tail_points, false, "centripetal"),
    40,
    0.075,
    12,
    false
  );
  const tail = new THREE.Mesh(tail_geom, plush_mat);
  tail.name = "tail";
  monkey_group.add(tail);

  const tail_tip = make_ellipsoid(
    "tail_tip", plush_mat, 0.57, 0.99, 0.04,
    0.085, 0.095, 0.085, monkey_group
  );

  const body = make_ellipsoid(
    "body", plush_mat, 0, 0.73, -0.04,
    0.35, 0.54, 0.29, monkey_group
  );

  const left_thigh = make_ellipsoid(
    "left_thigh", plush_mat, -0.22, 0.43, -0.01,
    0.24, 0.34, 0.22, monkey_group
  );
  left_thigh.rotation.z = -0.24;

  const right_thigh = make_ellipsoid(
    "right_thigh", plush_mat, 0.22, 0.43, -0.01,
    0.24, 0.34, 0.22, monkey_group
  );
  right_thigh.rotation.z = 0.24;

  const left_foot = make_ellipsoid(
    "left_foot", plush_mat, -0.23, 0.14, 0.23,
    0.24, 0.13, 0.31, monkey_group
  );
  left_foot.rotation.y = -0.08;

  const right_foot = make_ellipsoid(
    "right_foot", plush_mat, 0.23, 0.14, 0.23,
    0.24, 0.13, 0.31, monkey_group
  );
  right_foot.rotation.y = 0.08;

  const left_toe_seam = make_tube(
    "left_toe_seam",
    [
      new THREE.Vector3(-0.23, 0.205, 0.475),
      new THREE.Vector3(-0.23, 0.16, 0.505),
      new THREE.Vector3(-0.23, 0.115, 0.495)
    ],
    0.006,
    plush_dark_mat,
    10,
    monkey_group
  );

  const right_toe_seam = make_tube(
    "right_toe_seam",
    [
      new THREE.Vector3(0.23, 0.205, 0.475),
      new THREE.Vector3(0.23, 0.16, 0.505),
      new THREE.Vector3(0.23, 0.115, 0.495)
    ],
    0.006,
    plush_dark_mat,
    10,
    monkey_group
  );

  const left_arm = make_tube(
    "left_arm",
    [
      new THREE.Vector3(-0.24, 0.99, 0.02),
      new THREE.Vector3(-0.31, 0.82, 0.15),
      new THREE.Vector3(-0.35, 0.65, 0.26),
      new THREE.Vector3(-0.31, 0.54, 0.31)
    ],
    0.09,
    plush_mat,
    28,
    monkey_group
  );

  const right_arm = make_tube(
    "right_arm",
    [
      new THREE.Vector3(0.24, 0.99, 0.02),
      new THREE.Vector3(0.29, 0.82, 0.16),
      new THREE.Vector3(0.31, 0.65, 0.28),
      new THREE.Vector3(0.27, 0.54, 0.33)
    ],
    0.09,
    plush_mat,
    28,
    monkey_group
  );

  const left_hand = make_ellipsoid(
    "left_hand", plush_mat, -0.31, 0.53, 0.32,
    0.105, 0.12, 0.105, monkey_group
  );

  const right_hand = make_ellipsoid(
    "right_hand", plush_mat, 0.27, 0.53, 0.34,
    0.105, 0.12, 0.105, monkey_group
  );

  const head = make_ellipsoid(
    "head", plush_mat, 0, 1.35, 0,
    0.47, 0.50, 0.40, monkey_group
  );

  const outer_ear_geom = unit_sphere_geom;
  const left_ear = new THREE.Mesh(outer_ear_geom, plush_mat);
  left_ear.name = "left_ear";
  left_ear.position.set(-0.44, 1.39, 0.01);
  left_ear.scale.set(0.15, 0.20, 0.11);
  monkey_group.add(left_ear);

  const right_ear = new THREE.Mesh(outer_ear_geom, plush_mat);
  right_ear.name = "right_ear";
  right_ear.position.set(0.44, 1.39, 0.01);
  right_ear.scale.set(0.15, 0.20, 0.11);
  monkey_group.add(right_ear);

  const left_inner_ear = make_ellipsoid(
    "left_inner_ear", inner_ear_mat, -0.455, 1.39, 0.105,
    0.105, 0.145, 0.026, monkey_group
  );

  const right_inner_ear = make_ellipsoid(
    "right_inner_ear", inner_ear_mat, 0.455, 1.39, 0.105,
    0.105, 0.145, 0.026, monkey_group
  );

  const ear_rim_geom = new THREE.TorusGeometry(0.105, 0.018, 10, 32);
  const left_ear_rim = new THREE.Mesh(ear_rim_geom, plush_mat);
  left_ear_rim.name = "left_ear_rim";
  left_ear_rim.position.set(-0.455, 1.39, 0.136);
  left_ear_rim.scale.set(1.0, 1.36, 1);
  monkey_group.add(left_ear_rim);

  const right_ear_rim = new THREE.Mesh(ear_rim_geom, plush_mat);
  right_ear_rim.name = "right_ear_rim";
  right_ear_rim.position.set(0.455, 1.39, 0.136);
  right_ear_rim.scale.set(1.0, 1.36, 1);
  monkey_group.add(right_ear_rim);

  const left_face_patch = make_ellipsoid(
    "left_face_patch", cream_fabric_mat, -0.13, 1.47, 0.365,
    0.17, 0.25, 0.038, monkey_group
  );
  left_face_patch.rotation.z = -0.08;

  const right_face_patch = make_ellipsoid(
    "right_face_patch", cream_fabric_mat, 0.13, 1.47, 0.365,
    0.17, 0.25, 0.038, monkey_group
  );
  right_face_patch.rotation.z = 0.08;

  const forehead_seam = make_tube(
    "forehead_seam",
    [
      new THREE.Vector3(0, 1.82, 0.178),
      new THREE.Vector3(-0.006, 1.73, 0.258),
      new THREE.Vector3(0.005, 1.64, 0.315),
      new THREE.Vector3(0, 1.575, 0.35)
    ],
    0.007,
    plush_dark_mat,
    20,
    monkey_group
  );

  const left_eye = make_ellipsoid(
    "left_eye", eye_mat, -0.14, 1.49, 0.414,
    0.058, 0.078, 0.034, monkey_group
  );

  const right_eye = make_ellipsoid(
    "right_eye", eye_mat, 0.14, 1.49, 0.414,
    0.058, 0.078, 0.034, monkey_group
  );

  const left_eye_highlight = make_ellipsoid(
    "left_eye_highlight", highlight_mat, -0.155, 1.515, 0.446,
    0.014, 0.019, 0.009, monkey_group
  );

  const right_eye_highlight = make_ellipsoid(
    "right_eye_highlight", highlight_mat, 0.125, 1.515, 0.446,
    0.014, 0.019, 0.009, monkey_group
  );

  const muzzle = make_ellipsoid(
    "muzzle", muzzle_mat, 0, 1.245, 0.39,
    0.30, 0.23, 0.06, monkey_group
  );

  const left_nostril = make_ellipsoid(
    "left_nostril", thread_mat, -0.055, 1.315, 0.452,
    0.019, 0.012, 0.008, monkey_group
  );
  left_nostril.rotation.z = -0.25;

  const right_nostril = make_ellipsoid(
    "right_nostril", thread_mat, 0.055, 1.315, 0.452,
    0.019, 0.012, 0.008, monkey_group
  );
  right_nostril.rotation.z = 0.25;

  const philtrum = make_tube(
    "philtrum",
    [
      new THREE.Vector3(0, 1.305, 0.454),
      new THREE.Vector3(0, 1.275, 0.458),
      new THREE.Vector3(0, 1.242, 0.458)
    ],
    0.006,
    thread_mat,
    10,
    monkey_group
  );

  const mouth = make_tube(
    "mouth",
    [
      new THREE.Vector3(-0.18, 1.205, 0.449),
      new THREE.Vector3(-0.105, 1.155, 0.454),
      new THREE.Vector3(0, 1.137, 0.456),
      new THREE.Vector3(0.105, 1.155, 0.454),
      new THREE.Vector3(0.18, 1.205, 0.449)
    ],
    0.009,
    thread_mat,
    28,
    monkey_group
  );

  const chin_seam = make_tube(
    "chin_seam",
    [
      new THREE.Vector3(0, 1.142, 0.454),
      new THREE.Vector3(0, 1.105, 0.448),
      new THREE.Vector3(0, 1.065, 0.431)
    ],
    0.005,
    thread_mat,
    10,
    monkey_group
  );

  const attachment_loop_geom = new THREE.TorusGeometry(0.055, 0.014, 10, 28);
  const attachment_loop = new THREE.Mesh(attachment_loop_geom, brushed_metal_mat);
  attachment_loop.name = "attachment_loop";
  attachment_loop.position.set(0, 1.845, -0.015);
  attachment_loop.scale.set(0.72, 1.15, 1);
  keychain_group.add(attachment_loop);

  const chain_link_geom = new THREE.TorusGeometry(0.06, 0.014, 10, 28);

  const lower_chain_link = new THREE.Mesh(chain_link_geom, polished_metal_mat);
  lower_chain_link.name = "lower_chain_link";
  lower_chain_link.position.set(0, 1.925, -0.01);
  lower_chain_link.scale.set(0.72, 1.16, 1);
  keychain_group.add(lower_chain_link);

  const middle_chain_link = new THREE.Mesh(chain_link_geom, polished_metal_mat);
  middle_chain_link.name = "middle_chain_link";
  middle_chain_link.position.set(0.008, 2.035, -0.025);
  middle_chain_link.rotation.y = Math.PI * 0.38;
  middle_chain_link.scale.set(0.72, 1.16, 1);
  keychain_group.add(middle_chain_link);

  const upper_chain_link = new THREE.Mesh(chain_link_geom, polished_metal_mat);
  upper_chain_link.name = "upper_chain_link";
  upper_chain_link.position.set(0, 2.145, -0.012);
  upper_chain_link.scale.set(0.72, 1.16, 1);
  keychain_group.add(upper_chain_link);

  const key_ring_back_geom = make_ovral_geometry(0.365, 0.275, 0.027);
  const key_ring_back = new THREE.Mesh(key_ring_back_geom, brushed_metal_mat);
  key_ring_back.name = "key_ring_back";
  key_ring_back.position.set(0, 2.52, -0.035);
  keychain_group.add(key_ring_back);

  const key_ring_geom = make_ovral_geometry(0.365, 0.275, 0.029);
  const key_ring = new THREE.Mesh(key_ring_geom, polished_metal_mat);
  key_ring.name = "key_ring";
  key_ring.position.set(0, 2.52, 0.005);
  keychain_group.add(key_ring);

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