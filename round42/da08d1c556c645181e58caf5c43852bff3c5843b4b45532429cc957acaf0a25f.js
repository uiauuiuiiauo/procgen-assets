export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "orange_fruit";

  const radius_x = 1.25;
  const radius_y = 0.98;
  const radius_z = 1.02;

  const fruit_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffb000,
    metalness: 0.0,
    roughness: 0.35,
  });
  const equatorial_grooveMat = new THREE.MeshStandardMaterial({
    color: 0xc96300,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rind_poresMat = new THREE.MeshStandardMaterial({
    color: 0xd87800,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const rind_pore_centersMat = new THREE.MeshStandardMaterial({
    color: 0xb96300,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const rind_bumpsMat = new THREE.MeshStandardMaterial({
    color: 0xffc22e,
    metalness: 0.0,
    roughness: 0.45,
  });
  const dark_specksMat = new THREE.MeshStandardMaterial({
    color: 0x5a3215,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x777052,
    metalness: 0.0,
    roughness: 0.9,
    flatShading: true,
  });
  const stem_darkMat = new THREE.MeshStandardMaterial({
    color: 0x494431,
    metalness: 0.0,
    roughness: 0.9,
    flatShading: true,
  });

  function surfaceDisplacement(nx, ny, nz) {
    const theta = Math.atan2(nz, nx);
    const equator = Math.max(0, 1 - ny * ny);
    const broad =
      0.011 * Math.sin(theta * 5 + ny * 3.2) * equator +
      0.007 * Math.sin(theta * 9 - ny * 7.0) * equator;
    const grain =
      0.012 *
        Math.sin(theta * 23 + ny * 17) *
        Math.sin(theta * 13 - ny * 21) +
      0.007 * Math.sin(theta * 39 - ny * 29) +
      0.004 * Math.sin(theta * 53 + ny * 37);
    const seam =
      -0.025 * Math.exp(-(ny * ny) / 0.0025);
    return broad + grain + seam;
  }

  function surfacePoint(nx, ny, nz, extra) {
    const length = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= length;
    ny /= length;
    nz /= length;

    const displacement = surfaceDisplacement(nx, ny, nz);
    const pebble_field =
      Math.sin(Math.atan2(nz, nx) * 31 + ny * 24) *
      Math.sin(Math.atan2(nz, nx) * 17 - ny * 35);
    const pebble = 0.008 * pebble_field * pebble_field;
    const radial_scale = 1 + displacement + pebble;

    const point = new THREE.Vector3(
      nx * radius_x * radial_scale,
      ny * radius_y * radial_scale,
      nz * radius_z * radial_scale
    );

    if (point.y < -0.9) {
      point.y = -0.9 + (point.y + 0.9) * 0.2;
    }

    const normal = surfaceNormal(nx, ny, nz);
    point.addScaledVector(normal, extra || 0);
    return { point, normal };
  }

  function surfaceNormal(nx, ny, nz) {
    const length = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
    nx /= length;
    ny /= length;
    nz /= length;
    return new THREE.Vector3(
      nx / radius_x,
      ny / radius_y,
      nz / radius_z
    ).normalize();
  }

  const fruit_bodyGeom = new THREE.SphereGeometry(1, 96, 64);
  const fruit_positions = fruit_bodyGeom.attributes.position;
  for (let i = 0; i < fruit_positions.count; i++) {
    const x = fruit_positions.getX(i);
    const y = fruit_positions.getY(i);
    const z = fruit_positions.getZ(i);
    const length = Math.sqrt(x * x + y * y + z * z) || 1;
    const nx = x / length;
    const ny = y / length;
    const nz = z / length;
    const pose = surfacePoint(nx, ny, nz, 0);
    fruit_positions.setXYZ(
      i,
      pose.point.x,
      pose.point.y,
      pose.point.z
    );
  }
  fruit_positions.needsUpdate = true;
  fruit_bodyGeom.computeVertexNormals();

  const fruit_body = new THREE.Mesh(fruit_bodyGeom, fruit_bodyMat);
  fruit_body.name = "fruit_body";
  root.add(fruit_body);

  const groove_points = [];
  const groove_count = 64;
  for (let i = 0; i < groove_count; i++) {
    const angle = (i / groove_count) * Math.PI * 2;
    const nx = Math.cos(angle);
    const nz = Math.sin(angle);
    const ny = 0.012 * Math.sin(angle * 3);
    groove_points.push(surfacePoint(nx, ny, nz, 0.001).point);
  }
  const equatorial_grooveCurve = new THREE.CatmullRomCurve3(
    groove_points,
    true,
    "centripetal"
  );
  const equatorial_grooveGeom = new THREE.TubeGeometry(
    equatorial_grooveCurve,
    128,
    0.012,
    7,
    true
  );
  const equatorial_groove = new THREE.Mesh(
    equatorial_grooveGeom,
    equatorial_grooveMat
  );
  equatorial_groove.name = "equatorial_groove";
  root.add(equatorial_groove);

  const local_z_axis = new THREE.Vector3(0, 0, 1);
  const instance_matrix = new THREE.Matrix4();

  const rind_pore_count = 720;
  const rind_poresGeom = new THREE.RingGeometry(0.011, 0.022, 9);
  const rind_pores = new THREE.InstancedMesh(
    rind_poresGeom,
    rind_poresMat,
    rind_pore_count
  );
  rind_pores.name = "rind_pores";

  const rind_pore_centersGeom = new THREE.CircleGeometry(0.01, 8);
  const rind_pore_centers = new THREE.InstancedMesh(
    rind_pore_centersGeom,
    rind_pore_centersMat,
    rind_pore_count
  );
  rind_pore_centers.name = "rind_pore_centers";

  for (let i = 0; i < rind_pore_count; i++) {
    const ny = -0.96 + 1.92 * ((i + 0.5) / rind_pore_count);
    const radial = Math.sqrt(Math.max(0, 1 - ny * ny));
    const angle = i * 2.399963229728653 + Math.sin(i * 0.73) * 0.18;
    const nx = Math.cos(angle) * radial;
    const nz = Math.sin(angle) * radial;

    const rim_pose = surfacePoint(nx, ny, nz, 0.006);
    const center_pose = surfacePoint(nx, ny, nz, 0.004);
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      local_z_axis,
      rim_pose.normal
    );
    const roll = new THREE.Quaternion().setFromAxisAngle(
      local_z_axis,
      i * 1.371
    );
    orientation.multiply(roll);

    const sx =
      0.68 + 0.62 * (0.5 + 0.5 * Math.sin(i * 1.91));
    const sy =
      0.48 + 0.5 * (0.5 + 0.5 * Math.sin(i * 2.47 + 0.8));
    const scale = new THREE.Vector3(sx, sy, 1);

    instance_matrix.compose(rim_pose.point, orientation, scale);
    rind_pores.setMatrixAt(i, instance_matrix);

    instance_matrix.compose(center_pose.point, orientation, scale);
    rind_pore_centers.setMatrixAt(i, instance_matrix);
  }
  rind_pores.instanceMatrix.needsUpdate = true;
  rind_pore_centers.instanceMatrix.needsUpdate = true;
  root.add(rind_pores, rind_pore_centers);

  const rind_bump_count = 360;
  const rind_bumpsGeom = new THREE.SphereGeometry(1, 7, 5);
  const rind_bumps = new THREE.InstancedMesh(
    rind_bumpsGeom,
    rind_bumpsMat,
    rind_bump_count
  );
  rind_bumps.name = "rind_bumps";

  for (let i = 0; i < rind_bump_count; i++) {
    const ny = -0.94 + 1.88 * ((i + 0.5) / rind_bump_count);
    const radial = Math.sqrt(Math.max(0, 1 - ny * ny));
    const angle =
      i * 2.399963229728653 + 0.7 + Math.sin(i * 1.13) * 0.16;
    const nx = Math.cos(angle) * radial;
    const nz = Math.sin(angle) * radial;
    const pose = surfacePoint(nx, ny, nz, 0.001);

    const orientation = new THREE.Quaternion().setFromUnitVectors(
      local_z_axis,
      pose.normal
    );
    const roll = new THREE.Quaternion().setFromAxisAngle(
      local_z_axis,
      i * 0.91
    );
    orientation.multiply(roll);

    const sx =
      0.018 + 0.022 * (0.5 + 0.5 * Math.sin(i * 1.57));
    const sy =
      0.012 + 0.017 * (0.5 + 0.5 * Math.sin(i * 2.11 + 0.4));
    const sz =
      0.006 + 0.007 * (0.5 + 0.5 * Math.sin(i * 1.29 + 1.1));
    instance_matrix.compose(
      pose.point,
      orientation,
      new THREE.Vector3(sx, sy, sz)
    );
    rind_bumps.setMatrixAt(i, instance_matrix);
  }
  rind_bumps.instanceMatrix.needsUpdate = true;
  root.add(rind_bumps);

  const dark_speck_count = 24;
  const dark_specksGeom = new THREE.CircleGeometry(1, 7);
  const dark_specks = new THREE.InstancedMesh(
    dark_specksGeom,
    dark_specksMat,
    dark_speck_count
  );
  dark_specks.name = "dark_specks";

  for (let i = 0; i < dark_speck_count; i++) {
    const ny = -0.78 + 1.56 * ((i + 0.5) / dark_speck_count);
    const radial = Math.sqrt(Math.max(0, 1 - ny * ny));
    const angle = i * 2.399963229728653 + 1.42;
    const nx = Math.cos(angle) * radial;
    const nz = Math.sin(angle) * radial;
    const pose = surfacePoint(nx, ny, nz, 0.009);
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      local_z_axis,
      pose.normal
    );
    const size =
      0.006 + 0.008 * (0.5 + 0.5 * Math.sin(i * 2.83));
    instance_matrix.compose(
      pose.point,
      orientation,
      new THREE.Vector3(size, size * 0.72, 1)
    );
    dark_specks.setMatrixAt(i, instance_matrix);
  }
  dark_specks.instanceMatrix.needsUpdate = true;
  root.add(dark_specks);

  const calyx_leaf_shape = new THREE.Shape();
  calyx_leaf_shape.moveTo(0, 0);
  calyx_leaf_shape.bezierCurveTo(0.026, 0.035, 0.025, 0.105, 0, 0.15);
  calyx_leaf_shape.bezierCurveTo(-0.025, 0.105, -0.026, 0.035, 0, 0);
  const calyx_leafGeom = new THREE.ShapeGeometry(calyx_leaf_shape, 5);

  function createCalyx(name) {
    const calyx = new THREE.Group();
    calyx.name = name;

    const calyx_baseGeom = new THREE.CylinderGeometry(
      0.045,
      0.052,
      0.018,
      10
    );
    const calyx_base = new THREE.Mesh(calyx_baseGeom, stem_darkMat);
    calyx_base.rotation.z = Math.PI / 2;
    calyx_base.position.x = 0.002;
    calyx.add(calyx_base);

    const calyx_leaves = new THREE.InstancedMesh(
      calyx_leafGeom,
      stemMat,
      5
    );
    const tangent_u = new THREE.Vector3(0, 1, 0);
    const tangent_v = new THREE.Vector3(0, 0, 1);

    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const direction = tangent_u
        .clone()
        .multiplyScalar(Math.cos(angle))
        .addScaledVector(tangent_v, Math.sin(angle))
        .normalize();
      const orientation = new THREE.Quaternion().setFromUnitVectors(
        local_z_axis,
        direction
      );
      const leaf_scale =
        0.82 + 0.16 * (0.5 + 0.5 * Math.sin(i * 2.2));
      instance_matrix.compose(
        new THREE.Vector3(0.006, 0, 0),
        orientation,
        new THREE.Vector3(leaf_scale, leaf_scale, 1)
      );
      calyx_leaves.setMatrixAt(i, instance_matrix);
    }
    calyx_leaves.instanceMatrix.needsUpdate = true;
    calyx.add(calyx_leaves);

    const calyx_centerGeom = new THREE.DodecahedronGeometry(0.035, 0);
    const calyx_center = new THREE.Mesh(calyx_centerGeom, stemMat);
    calyx_center.position.x = 0.022;
    calyx_center.scale.set(0.7, 0.9, 0.9);
    calyx.add(calyx_center);

    return calyx;
  }

  const left_calyx = createCalyx("left_calyx");
  left_calyx.position.set(-1.258, 0, 0);
  left_calyx.scale.setScalar(0.9);
  root.add(left_calyx);

  const right_calyx = createCalyx("right_calyx");
  right_calyx.position.set(1.258, 0, 0);
  right_calyx.rotation.y = Math.PI;
  right_calyx.scale.setScalar(0.78);
  root.add(right_calyx);

  const stem_stubGeom = new THREE.CylinderGeometry(
    0.021,
    0.032,
    0.075,
    7
  );
  const stem_cutGeom = new THREE.DodecahedronGeometry(0.027, 0);

  const left_stem = new THREE.Group();
  left_stem.name = "left_stem";
  left_stem.position.set(-1.255, 0, 0);

  const left_stem_stub = new THREE.Mesh(stem_stubGeom, stemMat);
  left_stem_stub.rotation.z = Math.PI / 2;
  left_stem_stub.position.x = -0.038;
  left_stem.add(left_stem_stub);

  const left_stem_cut = new THREE.Mesh(stem_cutGeom, stem_darkMat);
  left_stem_cut.position.x = -0.082;
  left_stem_cut.scale.set(0.75, 1, 1);
  left_stem.add(left_stem_cut);
  root.add(left_stem);

  const right_stem = new THREE.Group();
  right_stem.name = "right_stem";
  right_stem.position.set(1.255, 0, 0);

  const right_stem_stub = new THREE.Mesh(stem_stubGeom, stemMat);
  right_stem_stub.rotation.z = -Math.PI / 2;
  right_stem_stub.position.x = 0.038;
  right_stem.add(right_stem_stub);

  const right_stem_cut = new THREE.Mesh(stem_cutGeom, stem_darkMat);
  right_stem_cut.position.x = 0.082;
  right_stem_cut.scale.set(0.75, 1, 1);
  right_stem.add(right_stem_cut);
  root.add(right_stem);

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

  fitToUnitCube(root);
  return root;
}