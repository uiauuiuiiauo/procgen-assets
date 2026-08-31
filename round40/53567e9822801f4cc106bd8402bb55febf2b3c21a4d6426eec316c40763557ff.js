export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "moss_ball";

  const moss_ball = new THREE.Group();
  moss_ball.name = "moss_ball";
  root.add(moss_ball);

  const core_radius = 0.425;
  const golden_angle = Math.PI * (3 - Math.sqrt(5));
  const up_axis = new THREE.Vector3(0, 1, 0);
  const forward_axis = new THREE.Vector3(0, 0, 1);
  const instance_matrix = new THREE.Matrix4();

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x29451e,
    metalness: 0.0,
    roughness: 0.95
  });
  const fine_granulesMat = new THREE.MeshStandardMaterial({
    color: 0x315127,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true
  });
  const coarse_clumpsMat = new THREE.MeshStandardMaterial({
    color: 0x24431c,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true
  });
  const shadow_granulesMat = new THREE.MeshStandardMaterial({
    color: 0x172c14,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true
  });
  const leaf_flakesMat = new THREE.MeshStandardMaterial({
    color: 0x3d5e31,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const pale_leaf_flakesMat = new THREE.MeshStandardMaterial({
    color: 0x657d4d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });
  const tan_needlesMat = new THREE.MeshStandardMaterial({
    color: 0xc3b779,
    metalness: 0.0,
    roughness: 0.9
  });
  const green_needlesMat = new THREE.MeshStandardMaterial({
    color: 0x718052,
    metalness: 0.0,
    roughness: 0.9
  });
  const curled_fibersMat = new THREE.MeshStandardMaterial({
    color: 0xb8ae72,
    metalness: 0.0,
    roughness: 0.9
  });
  const pale_seedsMat = new THREE.MeshStandardMaterial({
    color: 0xc6b878,
    metalness: 0.0,
    roughness: 0.9,
    flatShading: true
  });

  function roughenGeometry(geometry, amount) {
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const wave =
        Math.sin(x * 37 + y * 53 + z * 29) * 0.55 +
        Math.sin(x * 83 - y * 41 + z * 67) * 0.30 +
        Math.cos(x * 113 + y * 71 - z * 47) * 0.15;
      const factor = 1 + amount * wave;
      position.setXYZ(i, x * factor, y * factor, z * factor);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    return geometry;
  }

  function setSurfaceTransform(object, normal, radius, spin, sx, sy, sz) {
    object.position.copy(normal).multiplyScalar(radius);
    object.quaternion.setFromUnitVectors(up_axis, normal);
    object.rotateY(spin);
    object.scale.set(sx, sy, sz);
    object.updateMatrix();
  }

  function setSurfaceDirection(object, normal, direction, radius, sx, sy, sz) {
    object.position.copy(normal).multiplyScalar(radius);
    object.quaternion.setFromUnitVectors(up_axis, direction.normalize());
    object.scale.set(sx, sy, sz);
    object.updateMatrix();
  }

  const coreGeom = roughenGeometry(
    new THREE.IcosahedronGeometry(core_radius, 5),
    0.014
  );
  const core = new THREE.Mesh(coreGeom, coreMat);
  core.name = "core";
  moss_ball.add(core);

  const fine_granulesGeom = roughenGeometry(
    new THREE.IcosahedronGeometry(0.0105, 0),
    0.14
  );
  const fine_granules_count = 2100;
  const fine_granules = new THREE.InstancedMesh(
    fine_granulesGeom,
    fine_granulesMat,
    fine_granules_count
  );
  fine_granules.name = "fine_granules";

  for (let i = 0; i < fine_granules_count; i++) {
    const y = 1 - 2 * (i + 0.5) / fine_granules_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * golden_angle;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const tangent = new THREE.Vector3(-normal.z, 0, normal.x);
    if (tangent.lengthSq() < 0.0001) tangent.set(1, 0, 0);
    tangent.normalize();

    const bitangent = new THREE.Vector3()
      .crossVectors(normal, tangent)
      .normalize();
    const offset =
      0.006 * Math.sin(i * 2.173) +
      0.0025 * Math.cos(i * 0.619);
    const radius =
      0.427 +
      0.0055 * Math.sin(i * 1.731) +
      0.0025 * Math.cos(i * 0.417);
    const position = normal.clone()
      .multiplyScalar(radius)
      .addScaledVector(tangent, offset);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        up_axis,
        i * 1.913 + Math.sin(i * 0.47)
      )
    );

    const scale = new THREE.Vector3(
      0.62 + 0.78 * (0.5 + 0.5 * Math.sin(i * 1.371)),
      0.48 + 0.58 * (0.5 + 0.5 * Math.cos(i * 1.117)),
      0.64 + 0.82 * (0.5 + 0.5 * Math.sin(i * 0.823 + 0.8))
    );
    instance_matrix.compose(position, quaternion, scale);
    fine_granules.setMatrixAt(i, instance_matrix);
  }
  fine_granules.instanceMatrix.needsUpdate = true;
  moss_ball.add(fine_granules);

  const coarse_clumpsGeom = roughenGeometry(
    new THREE.IcosahedronGeometry(0.022, 1),
    0.19
  );
  const coarse_clumps_count = 175;
  const coarse_clumps = new THREE.InstancedMesh(
    coarse_clumpsGeom,
    coarse_clumpsMat,
    coarse_clumps_count
  );
  coarse_clumps.name = "coarse_clumps";

  for (let i = 0; i < coarse_clumps_count; i++) {
    const y = 1 - 2 * (i + 0.35) / coarse_clumps_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.41) * golden_angle + 0.37;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.424 +
      0.004 * Math.sin(i * 1.51) +
      0.002 * Math.cos(i * 0.73)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        up_axis,
        i * 1.37 + Math.sin(i * 0.61)
      )
    );
    const scale = new THREE.Vector3(
      0.55 + 0.75 * (0.5 + 0.5 * Math.sin(i * 1.23)),
      0.38 + 0.55 * (0.5 + 0.5 * Math.cos(i * 0.91)),
      0.58 + 0.72 * (0.5 + 0.5 * Math.sin(i * 1.77 + 0.4))
    );
    instance_matrix.compose(position, quaternion, scale);
    coarse_clumps.setMatrixAt(i, instance_matrix);
  }
  coarse_clumps.instanceMatrix.needsUpdate = true;
  moss_ball.add(coarse_clumps);

  const shadow_granulesGeom = roughenGeometry(
    new THREE.TetrahedronGeometry(0.008, 0),
    0.16
  );
  const shadow_granules_count = 340;
  const shadow_granules = new THREE.InstancedMesh(
    shadow_granulesGeom,
    shadow_granulesMat,
    shadow_granules_count
  );
  shadow_granules.name = "shadow_granules";

  for (let i = 0; i < shadow_granules_count; i++) {
    const y = 1 - 2 * (i + 0.72) / shadow_granules_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.83) * golden_angle;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.431 + 0.003 * Math.sin(i * 2.03)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        up_axis,
        i * 2.41
      )
    );
    const scale = new THREE.Vector3(
      0.55 + 0.65 * (0.5 + 0.5 * Math.sin(i * 1.43)),
      0.40 + 0.48 * (0.5 + 0.5 * Math.cos(i * 1.09)),
      0.58 + 0.62 * (0.5 + 0.5 * Math.sin(i * 1.81))
    );
    instance_matrix.compose(position, quaternion, scale);
    shadow_granules.setMatrixAt(i, instance_matrix);
  }
  shadow_granules.instanceMatrix.needsUpdate = true;
  moss_ball.add(shadow_granules);

  const moss_nodulesGeom = roughenGeometry(
    new THREE.IcosahedronGeometry(0.009, 1),
    0.22
  );
  const moss_nodules_count = 125;
  const moss_nodules = new THREE.InstancedMesh(
    moss_nodulesGeom,
    coarse_clumpsMat,
    moss_nodules_count
  );
  moss_nodules.name = "moss_nodules";

  for (let i = 0; i < moss_nodules_count; i++) {
    const y = 1 - 2 * (i + 0.28) / moss_nodules_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.62) * golden_angle + 1.2;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.425 + 0.004 * Math.cos(i * 1.31)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        up_axis,
        i * 1.72
      )
    );
    const scale = new THREE.Vector3(
      0.62 + 0.68 * (0.5 + 0.5 * Math.sin(i * 1.11)),
      0.42 + 0.50 * (0.5 + 0.5 * Math.cos(i * 1.57)),
      0.64 + 0.66 * (0.5 + 0.5 * Math.sin(i * 0.87 + 1.1))
    );
    instance_matrix.compose(position, quaternion, scale);
    moss_nodules.setMatrixAt(i, instance_matrix);
  }
  moss_nodules.instanceMatrix.needsUpdate = true;
  moss_ball.add(moss_nodules);

  const leaf_shape = new THREE.Shape();
  leaf_shape.moveTo(-0.034, 0);
  leaf_shape.bezierCurveTo(-0.026, 0.012, -0.009, 0.018, 0.010, 0.014);
  leaf_shape.bezierCurveTo(0.023, 0.012, 0.032, 0.006, 0.036, 0);
  leaf_shape.bezierCurveTo(0.027, -0.010, 0.008, -0.016, -0.011, -0.013);
  leaf_shape.bezierCurveTo(-0.024, -0.011, -0.031, -0.006, -0.034, 0);
  leaf_shape.closePath();

  const leaf_flakesGeom = new THREE.ExtrudeGeometry(leaf_shape, {
    depth: 0.0024,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.0008,
    bevelSize: 0.001,
    bevelSegments: 1
  });
  leaf_flakesGeom.center();

  const leaf_flakes_count = 78;
  const leaf_flakes = new THREE.InstancedMesh(
    leaf_flakesGeom,
    leaf_flakesMat,
    leaf_flakes_count
  );
  leaf_flakes.name = "leaf_flakes";

  for (let i = 0; i < leaf_flakes_count; i++) {
    const y = 1 - 2 * (i + 0.47) / leaf_flakes_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.21) * golden_angle + 0.74;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.434 + 0.002 * Math.sin(i * 1.37)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      forward_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        forward_axis,
        i * 1.83 + Math.sin(i * 0.53)
      )
    );
    const scale = new THREE.Vector3(
      0.55 + 0.72 * (0.5 + 0.5 * Math.sin(i * 1.21)),
      0.50 + 0.60 * (0.5 + 0.5 * Math.cos(i * 1.49)),
      0.75
    );
    instance_matrix.compose(position, quaternion, scale);
    leaf_flakes.setMatrixAt(i, instance_matrix);
  }
  leaf_flakes.instanceMatrix.needsUpdate = true;
  moss_ball.add(leaf_flakes);

  const pale_leaf_flakes_count = 24;
  const pale_leaf_flakes = new THREE.InstancedMesh(
    leaf_flakesGeom,
    pale_leaf_flakesMat,
    pale_leaf_flakes_count
  );
  pale_leaf_flakes.name = "pale_leaf_flakes";

  for (let i = 0; i < pale_leaf_flakes_count; i++) {
    const y = 1 - 2 * (i + 0.79) / pale_leaf_flakes_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.53) * golden_angle + 2.1;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.435 + 0.0015 * Math.cos(i * 1.61)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      forward_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        forward_axis,
        i * 2.17
      )
    );
    const scale = new THREE.Vector3(
      0.42 + 0.50 * (0.5 + 0.5 * Math.sin(i * 1.33)),
      0.38 + 0.46 * (0.5 + 0.5 * Math.cos(i * 1.07)),
      0.68
    );
    instance_matrix.compose(position, quaternion, scale);
    pale_leaf_flakes.setMatrixAt(i, instance_matrix);
  }
  pale_leaf_flakes.instanceMatrix.needsUpdate = true;
  moss_ball.add(pale_leaf_flakes);

  const tan_needlesGeom = new THREE.CylinderGeometry(
    0.0018,
    0.0022,
    0.075,
    6
  );
  const tan_needles_count = 34;
  const tan_needles = new THREE.InstancedMesh(
    tan_needlesGeom,
    tan_needlesMat,
    tan_needles_count
  );
  tan_needles.name = "tan_needles";

  for (let i = 0; i < tan_needles_count; i++) {
    const y = 1 - 2 * (i + 0.31) / tan_needles_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.12) * golden_angle + 1.06;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const tangent = new THREE.Vector3(-normal.z, 0, normal.x);
    if (tangent.lengthSq() < 0.0001) tangent.set(1, 0, 0);
    tangent.normalize();
    const bitangent = new THREE.Vector3()
      .crossVectors(normal, tangent)
      .normalize();
    const direction = tangent.multiplyScalar(
      Math.cos(i * 1.71)
    ).addScaledVector(bitangent, Math.sin(i * 1.71)).normalize();
    const position = normal.clone().multiplyScalar(
      0.440 + 0.0015 * Math.sin(i * 1.23)
    );
    const scale = new THREE.Vector3(
      0.75 + 0.25 * (0.5 + 0.5 * Math.sin(i * 1.11)),
      0.55 + 0.72 * (0.5 + 0.5 * Math.cos(i * 1.39)),
      0.75 + 0.25 * (0.5 + 0.5 * Math.sin(i * 1.11))
    );
    setSurfaceDirection(object_placeholder(), normal, direction, 0.440, 1, 1, 1);
    instance_matrix.compose(position, quaternion_from_direction(direction), scale);
    tan_needles.setMatrixAt(i, instance_matrix);
  }
  tan_needles.instanceMatrix.needsUpdate = true;
  moss_ball.add(tan_needles);

  function object_placeholder() {
    return new THREE.Object3D();
  }

  function quaternion_from_direction(direction) {
    return new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      direction.normalize()
    );
  }

  const green_needles_count = 25;
  const green_needles = new THREE.InstancedMesh(
    tan_needlesGeom,
    green_needlesMat,
    green_needles_count
  );
  green_needles.name = "green_needles";

  for (let i = 0; i < green_needles_count; i++) {
    const y = 1 - 2 * (i + 0.66) / green_needles_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.74) * golden_angle;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const tangent = new THREE.Vector3(-normal.z, 0, normal.x);
    if (tangent.lengthSq() < 0.0001) tangent.set(1, 0, 0);
    tangent.normalize();
    const bitangent = new THREE.Vector3()
      .crossVectors(normal, tangent)
      .normalize();
    const direction = tangent.multiplyScalar(
      Math.cos(i * 2.03 + 0.6)
    ).addScaledVector(bitangent, Math.sin(i * 2.03 + 0.6)).normalize();
    const position = normal.clone().multiplyScalar(0.439);
    const quaternion = quaternion_from_direction(direction);
    const scale = new THREE.Vector3(
      0.72,
      0.48 + 0.60 * (0.5 + 0.5 * Math.sin(i * 1.51)),
      0.72
    );
    instance_matrix.compose(position, quaternion, scale);
    green_needles.setMatrixAt(i, instance_matrix);
  }
  green_needles.instanceMatrix.needsUpdate = true;
  moss_ball.add(green_needles);

  const curled_fibersGeom = new THREE.TorusGeometry(
    0.034,
    0.0019,
    5,
    18,
    Math.PI * 1.28
  );
  const curled_fibers_count = 11;
  const curled_fibers = new THREE.InstancedMesh(
    curled_fibersGeom,
    curled_fibersMat,
    curled_fibers_count
  );
  curled_fibers.name = "curled_fibers";

  for (let i = 0; i < curled_fibers_count; i++) {
    const y = 1 - 2 * (i + 0.42) / curled_fibers_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.28) * golden_angle + 2.72;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.438 + 0.001 * Math.cos(i * 1.43)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      forward_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        forward_axis,
        i * 1.91
      )
    );
    const scale = new THREE.Vector3(
      0.62 + 0.42 * (0.5 + 0.5 * Math.sin(i * 1.29)),
      0.55 + 0.50 * (0.5 + 0.5 * Math.cos(i * 1.67)),
      1
    );
    instance_matrix.compose(position, quaternion, scale);
    curled_fibers.setMatrixAt(i, instance_matrix);
  }
  curled_fibers.instanceMatrix.needsUpdate = true;
  moss_ball.add(curled_fibers);

  const pale_seedsGeom = new THREE.IcosahedronGeometry(0.0065, 1);
  const pale_seeds_count = 38;
  const pale_seeds = new THREE.InstancedMesh(
    pale_seedsGeom,
    pale_seedsMat,
    pale_seeds_count
  );
  pale_seeds.name = "pale_seeds";

  for (let i = 0; i < pale_seeds_count; i++) {
    const y = 1 - 2 * (i + 0.58) / pale_seeds_count;
    const ring = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = (i + 0.39) * golden_angle + 1.83;
    const normal = new THREE.Vector3(
      Math.cos(angle) * ring,
      y,
      Math.sin(angle) * ring
    );
    const position = normal.clone().multiplyScalar(
      0.437 + 0.0015 * Math.sin(i * 1.79)
    );
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      up_axis,
      normal
    );
    quaternion.multiply(
      new THREE.Quaternion().setFromAxisAngle(
        up_axis,
        i * 1.47
      )
    );
    const scale = new THREE.Vector3(
      0.65 + 0.55 * (0.5 + 0.5 * Math.sin(i * 1.13)),
      0.45 + 0.42 * (0.5 + 0.5 * Math.cos(i * 1.31)),
      0.62 + 0.50 * (0.5 + 0.5 * Math.sin(i * 1.69))
    );
    instance_matrix.compose(position, quaternion, scale);
    pale_seeds.setMatrixAt(i, instance_matrix);
  }
  pale_seeds.instanceMatrix.needsUpdate = true;
  moss_ball.add(pale_seeds);

  fitToUnitCube(THREE, root);
  return root;
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