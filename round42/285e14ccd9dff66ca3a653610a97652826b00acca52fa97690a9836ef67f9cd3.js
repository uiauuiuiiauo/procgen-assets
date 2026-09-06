export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "citrus_bowl";

  const bowlMat = new THREE.MeshStandardMaterial({
    color: 0xe5c8b2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const bowl_footMat = new THREE.MeshStandardMaterial({
    color: 0xc99b78,
    metalness: 0.0,
    roughness: 0.4,
  });
  const orange_peelMat = new THREE.MeshStandardMaterial({
    color: 0xf28a22,
    metalness: 0.0,
    roughness: 0.6,
  });
  const deep_orange_peelMat = new THREE.MeshStandardMaterial({
    color: 0xe87518,
    metalness: 0.0,
    roughness: 0.6,
  });
  const yellow_peelMat = new THREE.MeshStandardMaterial({
    color: 0xffc52a,
    metalness: 0.0,
    roughness: 0.6,
  });
  const green_peelMat = new THREE.MeshStandardMaterial({
    color: 0x78a83b,
    metalness: 0.0,
    roughness: 0.65,
  });
  const orange_poreMat = new THREE.MeshStandardMaterial({
    color: 0xd97018,
    metalness: 0.0,
    roughness: 0.8,
  });
  const yellow_poreMat = new THREE.MeshStandardMaterial({
    color: 0xe3a918,
    metalness: 0.0,
    roughness: 0.8,
  });
  const green_poreMat = new THREE.MeshStandardMaterial({
    color: 0x527d2c,
    metalness: 0.0,
    roughness: 0.8,
  });
  const orange_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xffa126,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const pale_fleshMat = new THREE.MeshStandardMaterial({
    color: 0xffbd45,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const pithMat = new THREE.MeshStandardMaterial({
    color: 0xfff0c7,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const membraneMat = new THREE.MeshStandardMaterial({
    color: 0xffdfaa,
    metalness: 0.0,
    roughness: 0.8,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x617744,
    metalness: 0.0,
    roughness: 0.9,
  });
  const calyxMat = new THREE.MeshStandardMaterial({
    color: 0x7d8954,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const calyx_centerMat = new THREE.MeshStandardMaterial({
    color: 0x555331,
    metalness: 0.0,
    roughness: 0.9,
  });

  const bowl_profile = [
    new THREE.Vector2(0.0, 0.02),
    new THREE.Vector2(0.28, 0.02),
    new THREE.Vector2(0.42, 0.05),
    new THREE.Vector2(0.56, 0.12),
    new THREE.Vector2(0.68, 0.23),
    new THREE.Vector2(0.78, 0.37),
    new THREE.Vector2(0.85, 0.5),
    new THREE.Vector2(0.87, 0.54),
    new THREE.Vector2(0.86, 0.57),
    new THREE.Vector2(0.82, 0.59),
    new THREE.Vector2(0.78, 0.58),
    new THREE.Vector2(0.75, 0.53),
    new THREE.Vector2(0.7, 0.43),
    new THREE.Vector2(0.61, 0.31),
    new THREE.Vector2(0.49, 0.22),
    new THREE.Vector2(0.33, 0.16),
    new THREE.Vector2(0.0, 0.15),
  ];
  const bowlGeom = new THREE.LatheGeometry(bowl_profile, 64);
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.name = "bowl";
  root.add(bowl);

  const bowl_rimGeom = new THREE.TorusGeometry(0.825, 0.038, 12, 64);
  const bowl_rim = new THREE.Mesh(bowl_rimGeom, bowlMat);
  bowl_rim.name = "bowl_rim";
  bowl_rim.rotation.x = Math.PI / 2;
  bowl_rim.position.y = 0.555;
  root.add(bowl_rim);

  const bowl_footGeom = new THREE.CylinderGeometry(0.35, 0.31, 0.055, 48);
  const bowl_foot = new THREE.Mesh(bowl_footGeom, bowl_footMat);
  bowl_foot.name = "bowl_foot";
  bowl_foot.position.y = 0.012;
  root.add(bowl_foot);

  const fruitGeom = new THREE.SphereGeometry(1, 40, 24);
  const fruit_position = fruitGeom.attributes.position;
  for (let i = 0; i < fruit_position.count; i++) {
    const x = fruit_position.getX(i);
    const y = fruit_position.getY(i);
    const z = fruit_position.getZ(i);
    const wave =
      Math.sin(x * 43 + y * 17) * Math.sin(y * 39 - z * 21) *
      Math.sin(z * 47 + x * 13);
    const factor = 1 + wave * 0.009;
    fruit_position.setXYZ(i, x * factor, y * factor, z * factor);
  }
  fruit_position.needsUpdate = true;
  fruitGeom.computeVertexNormals();

  function createFruit(name, material, x, y, z, sx, sy, sz) {
    const fruit = new THREE.Mesh(fruitGeom, material);
    fruit.name = name;
    fruit.position.set(x, y, z);
    fruit.scale.set(sx, sy, sz);
    root.add(fruit);
    return fruit;
  }

  const back_left_orange = createFruit(
    "back_left_orange", orange_peelMat,
    -0.28, 0.84, -0.25, 0.24, 0.26, 0.24
  );
  const top_yellow_orange = createFruit(
    "top_yellow_orange", yellow_peelMat,
    0.11, 0.88, -0.04, 0.27, 0.29, 0.26
  );
  const back_right_orange = createFruit(
    "back_right_orange", orange_peelMat,
    0.37, 0.76, -0.16, 0.25, 0.27, 0.24
  );
  const left_upper_orange = createFruit(
    "left_upper_orange", yellow_peelMat,
    -0.43, 0.72, 0.0, 0.28, 0.27, 0.27
  );
  const left_side_orange = createFruit(
    "left_side_orange", deep_orange_peelMat,
    -0.57, 0.58, 0.18, 0.22, 0.23, 0.21
  );
  const front_left_orange = createFruit(
    "front_left_orange", yellow_peelMat,
    -0.34, 0.52, 0.36, 0.27, 0.25, 0.26
  );
  const front_center_orange = createFruit(
    "front_center_orange", orange_peelMat,
    0.0, 0.56, 0.43, 0.26, 0.23, 0.25
  );
  const front_right_orange = createFruit(
    "front_right_orange", deep_orange_peelMat,
    0.45, 0.6, 0.3, 0.28, 0.27, 0.27
  );
  const front_green_orange = createFruit(
    "front_green_orange", green_peelMat,
    0.25, 0.49, 0.47, 0.27, 0.22, 0.25
  );
  const right_lime = createFruit(
    "right_lime", green_peelMat,
    0.57, 0.68, -0.01, 0.2, 0.21, 0.19
  );
  const bottom_center_orange = createFruit(
    "bottom_center_orange", yellow_peelMat,
    -0.06, 0.43, 0.28, 0.25, 0.2, 0.23
  );

  const poreGeom = new THREE.SphereGeometry(1, 6, 4);
  const orange_pore_points = [];
  const yellow_pore_points = [];
  const green_pore_points = [];
  const green_cap_points = [];

  function addSurfacePores(target, fruit, count, offset, poreScale) {
    for (let i = 0; i < count; i++) {
      const fraction = (i + 0.5) / count;
      const ny = 1 - fraction * 2;
      const radial = Math.sqrt(Math.max(0, 1 - ny * ny));
      const angle = i * 2.3999632297 + offset;
      const normal = new THREE.Vector3(
        Math.cos(angle) * radial,
        ny,
        Math.sin(angle) * radial
      ).normalize();
      const position = new THREE.Vector3(
        fruit.position.x + normal.x * fruit.scale.x * 1.008,
        fruit.position.y + normal.y * fruit.scale.y * 1.008,
        fruit.position.z + normal.z * fruit.scale.z * 1.008
      );
      target.push({
        position,
        normal,
        scale: poreScale * (0.82 + (i % 5) * 0.045),
      });
    }
  }

  function addGreenCap(fruit, direction, count) {
    const dir = direction.clone().normalize();
    for (let i = 0; i < count; i++) {
      const fraction = (i + 0.5) / count;
      const angular = Math.sqrt(fraction) * 0.62;
      const around = i * 2.3999632297 + 0.4;
      const tangent_a = new THREE.Vector3(0, 1, 0).cross(dir);
      if (tangent_a.lengthSq() < 0.001) tangent_a.set(1, 0, 0);
      tangent_a.normalize();
      const tangent_b = dir.clone().cross(tangent_a).normalize();
      const normal = dir.clone()
        .multiplyScalar(Math.cos(angular))
        .addScaledVector(tangent_a, Math.sin(angular) * Math.cos(around))
        .addScaledVector(tangent_b, Math.sin(angular) * Math.sin(around))
        .normalize();
      green_cap_points.push({
        position: new THREE.Vector3(
          fruit.position.x + normal.x * fruit.scale.x * 1.012,
          fruit.position.y + normal.y * fruit.scale.y * 1.012,
          fruit.position.z + normal.z * fruit.scale.z * 1.012
        ),
        normal,
        scale: 0.0065 + (i % 4) * 0.00045,
      });
    }
  }

  addSurfacePores(orange_pore_points, back_left_orange, 24, 0.2, 0.0065);
  addSurfacePores(yellow_pore_points, top_yellow_orange, 28, 0.7, 0.0068);
  addSurfacePores(orange_pore_points, back_right_orange, 24, 1.1, 0.0065);
  addSurfacePores(yellow_pore_points, left_upper_orange, 28, 1.7, 0.0068);
  addSurfacePores(orange_pore_points, left_side_orange, 20, 2.2, 0.0062);
  addSurfacePores(yellow_pore_points, front_left_orange, 26, 2.8, 0.0068);
  addSurfacePores(orange_pore_points, front_center_orange, 25, 3.4, 0.0065);
  addSurfacePores(orange_pore_points, front_right_orange, 27, 4.0, 0.0066);
  addSurfacePores(green_pore_points, front_green_orange, 30, 4.6, 0.0066);
  addSurfacePores(green_pore_points, right_lime, 22, 5.1, 0.0062);
  addSurfacePores(yellow_pore_points, bottom_center_orange, 22, 5.7, 0.0065);
  addGreenCap(front_green_orange, new THREE.Vector3(0.35, 0.1, -0.93), 24);
  addGreenCap(right_lime, new THREE.Vector3(0.45, 0.05, -0.89), 20);

  function createPoreInstances(name, points, material) {
    const instances = new THREE.InstancedMesh(poreGeom, material, points.length);
    instances.name = name;
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const reference = new THREE.Vector3(0, 0, 1);
    const scale = new THREE.Vector3();
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      quaternion.setFromUnitVectors(reference, point.normal);
      scale.set(point.scale, point.scale, point.scale * 0.32);
      matrix.compose(point.position, quaternion, scale);
      instances.setMatrixAt(i, matrix);
    }
    instances.instanceMatrix.needsUpdate = true;
    root.add(instances);
    return instances;
  }

  const orange_peel_pores = createPoreInstances(
    "orange_peel_pores", orange_pore_points, orange_poreMat
  );
  const yellow_peel_pores = createPoreInstances(
    "yellow_peel_pores", yellow_pore_points, yellow_poreMat
  );
  const green_peel_pores = createPoreInstances(
    "green_peel_pores", green_pore_points, green_poreMat
  );
  const green_cap_pores = createPoreInstances(
    "green_cap_pores", green_cap_points, green_poreMat
  );

  const calyx_shape = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI / 2 + i / 10 * Math.PI * 2;
    const radius = i % 2 === 0 ? 1 : 0.42;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) calyx_shape.moveTo(x, y);
    else calyx_shape.lineTo(x, y);
  }
  calyx_shape.closePath();
  const calyxGeom = new THREE.ShapeGeometry(calyx_shape);
  const calyx_centerGeom = new THREE.SphereGeometry(1, 10, 6);

  function createCalyx(name, fruit, direction, size) {
    const calyx = new THREE.Group();
    calyx.name = name;
    const normal = direction.clone().normalize();
    calyx.position.set(
      fruit.position.x + normal.x * fruit.scale.x * 1.018,
      fruit.position.y + normal.y * fruit.scale.y * 1.018,
      fruit.position.z + normal.z * fruit.scale.z * 1.018
    );
    calyx.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);

    const calyx_star = new THREE.Mesh(calyxGeom, calyxMat);
    calyx_star.scale.setScalar(size);
    calyx.add(calyx_star);

    const calyx_center = new THREE.Mesh(calyx_centerGeom, calyx_centerMat);
    calyx_center.scale.set(size * 0.3, size * 0.3, size * 0.18);
    calyx_center.position.z = 0.004;
    calyx.add(calyx_center);
    root.add(calyx);
    return calyx;
  }

  const top_orange_calyx = createCalyx(
    "top_orange_calyx", top_yellow_orange,
    new THREE.Vector3(0.08, 0.86, 0.5), 0.045
  );
  const left_orange_calyx = createCalyx(
    "left_orange_calyx", left_upper_orange,
    new THREE.Vector3(-0.12, 0.55, 0.83), 0.04
  );
  const front_center_calyx = createCalyx(
    "front_center_calyx", front_center_orange,
    new THREE.Vector3(-0.35, -0.25, 0.9), 0.038
  );
  const front_right_calyx = createCalyx(
    "front_right_calyx", front_right_orange,
    new THREE.Vector3(0.08, 0.02, 0.99), 0.047
  );

  const stemGeom = new THREE.CylinderGeometry(0.012, 0.018, 0.055, 10);
  const top_fruit_stem = new THREE.Mesh(stemGeom, stemMat);
  top_fruit_stem.name = "top_fruit_stem";
  top_fruit_stem.position.set(0.02, 1.185, -0.07);
  top_fruit_stem.rotation.z = -0.25;
  root.add(top_fruit_stem);

  const back_left_stem = new THREE.Mesh(stemGeom, stemMat);
  back_left_stem.name = "back_left_stem";
  back_left_stem.scale.setScalar(0.75);
  back_left_stem.position.set(-0.19, 1.095, -0.29);
  back_left_stem.rotation.z = 0.55;
  root.add(back_left_stem);

  const slice_bodyGeom = new THREE.CylinderGeometry(1, 1, 1, 48);
  const slice_faceGeom = new THREE.CircleGeometry(1, 48);
  const slice_rindGeom = new THREE.TorusGeometry(0.91, 0.09, 10, 48);
  const segmentGeom = new THREE.BoxGeometry(0.012, 0.27, 0.007);
  const slice_pithGeom = new THREE.SphereGeometry(1, 16, 8);

  function createCitrusHalf(name, radius, faceMaterial) {
    const half = new THREE.Group();
    half.name = name;

    const slice_body = new THREE.Mesh(slice_bodyGeom, yellow_peelMat);
    slice_body.name = name + "_body";
    slice_body.rotation.x = Math.PI / 2;
    slice_body.scale.set(radius, 0.11, radius);
    half.add(slice_body);

    const slice_pith = new THREE.Mesh(slice_faceGeom, pithMat);
    slice_pith.name = name + "_pith";
    slice_pith.scale.setScalar(radius * 0.88);
    slice_pith.position.z = 0.057;
    half.add(slice_pith);

    const slice_face = new THREE.Mesh(slice_faceGeom, faceMaterial);
    slice_face.name = name + "_face";
    slice_face.scale.setScalar(radius * 0.78);
    slice_face.position.z = 0.061;
    half.add(slice_face);

    const slice_rind = new THREE.Mesh(slice_rindGeom, yellow_peelMat);
    slice_rind.name = name + "_rind";
    slice_rind.scale.setScalar(radius);
    slice_rind.position.z = 0.06;
    half.add(slice_rind);

    const segment_membranes = new THREE.InstancedMesh(
      segmentGeom, membraneMat, 8
    );
    segment_membranes.name = name + "_segment_membranes";
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(radius, radius, 1);
    for (let i = 0; i < 8; i++) {
      const angle = i / 8 * Math.PI * 2;
      position.set(
        Math.cos(angle) * radius * 0.39,
        Math.sin(angle) * radius * 0.39,
        0.067
      );
      quaternion.setFromEuler(
        new THREE.Euler(0, 0, angle - Math.PI / 2)
      );
      matrix.compose(position, quaternion, scale);
      segment_membranes.setMatrixAt(i, matrix);
    }
    segment_membranes.instanceMatrix.needsUpdate = true;
    half.add(segment_membranes);

    const slice_pith_center = new THREE.Mesh(slice_pithGeom, pithMat);
    slice_pith_center.name = name + "_pith_center";
    slice_pith_center.scale.set(
      radius * 0.13,
      radius * 0.13,
      radius * 0.055
    );
    slice_pith_center.position.z = 0.073;
    half.add(slice_pith_center);

    return half;
  }

  const cut_half_back = createCitrusHalf(
    "cut_half_back", 0.255, pale_fleshMat
  );
  cut_half_back.position.set(0.43, 0.83, -0.22);
  cut_half_back.rotation.set(-0.25, -0.28, -0.18);
  root.add(cut_half_back);

  const cut_half_left = createCitrusHalf(
    "cut_half_left", 0.245, orange_fleshMat
  );
  cut_half_left.position.set(-0.07, 0.73, 0.25);
  cut_half_left.rotation.set(-0.22, 0.12, 0.28);
  root.add(cut_half_left);

  const cut_half_right = createCitrusHalf(
    "cut_half_right", 0.235, orange_fleshMat
  );
  cut_half_right.position.set(0.18, 0.72, 0.27);
  cut_half_right.rotation.set(-0.18, -0.12, -0.25);
  root.add(cut_half_right);

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