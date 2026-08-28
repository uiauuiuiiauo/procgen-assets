export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "herb_ball";

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x263d1d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const fine_granulesMat = new THREE.MeshStandardMaterial({
    color: 0x345326,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true,
  });
  const medium_granulesMat = new THREE.MeshStandardMaterial({
    color: 0x3b5b2b,
    metalness: 0.0,
    roughness: 0.95,
    flatShading: true,
  });
  const leaf_flakesMat = new THREE.MeshStandardMaterial({
    color: 0x4d6a36,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const pale_leaf_flakesMat = new THREE.MeshStandardMaterial({
    color: 0x718052,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const dark_crevicesMat = new THREE.MeshStandardMaterial({
    color: 0x172711,
    metalness: 0.0,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  const stemsMat = new THREE.MeshStandardMaterial({
    color: 0xb7a46c,
    metalness: 0.0,
    roughness: 0.9,
  });
  const green_stemsMat = new THREE.MeshStandardMaterial({
    color: 0x738044,
    metalness: 0.0,
    roughness: 0.9,
  });
  const seed_specksMat = new THREE.MeshStandardMaterial({
    color: 0xc0ab70,
    metalness: 0.0,
    roughness: 0.9,
    flatShading: true,
  });

  const coreGeom = new THREE.SphereGeometry(0.4, 48, 32);
  const corePositions = coreGeom.attributes.position;
  for (let i = 0; i < corePositions.count; i++) {
    const x = corePositions.getX(i);
    const y = corePositions.getY(i);
    const z = corePositions.getZ(i);
    const length = Math.sqrt(x * x + y * y + z * z) || 1;
    const nx = x / length;
    const ny = y / length;
    const nz = z / length;
    const variation =
      0.0035 * Math.sin(nx * 31 + ny * 17 - nz * 13) +
      0.0022 * Math.sin(nx * 53 - ny * 29 + nz * 23);
    const radius = 0.4 + variation;
    corePositions.setXYZ(i, nx * radius, ny * radius, nz * radius);
  }
  corePositions.needsUpdate = true;
  coreGeom.computeVertexNormals();

  const core = new THREE.Mesh(coreGeom, coreMat);
  core.name = "core";
  root.add(core);

  function deterministicUnit(index, salt) {
    const value =
      Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return value - Math.floor(value);
  }

  function surfaceNormal(index, count, phase) {
    const y = 1 - 2 * ((index + 0.5) / count);
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle =
      index * 2.399963229728653 +
      phase +
      0.16 * Math.sin(index * 0.731 + phase);
    return new THREE.Vector3(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );
  }

  function tangentFrame(normal) {
    const reference =
      Math.abs(normal.y) > 0.88
        ? new THREE.Vector3(1, 0, 0)
        : new THREE.Vector3(0, 1, 0);
    const tangent_u = new THREE.Vector3()
      .crossVectors(reference, normal)
      .normalize();
    const tangent_v = new THREE.Vector3()
      .crossVectors(normal, tangent_u)
      .normalize();
    return { tangent_u, tangent_v };
  }

  const instance_dummy = new THREE.Object3D();
  const local_offset = new THREE.Vector3();
  const local_axis_y = new THREE.Vector3(0, 1, 0);

  function placeSurfaceInstance(
    mesh,
    slot,
    normal,
    radius,
    scaleX,
    scaleY,
    scaleZ,
    spin,
    lift
  ) {
    const frame = tangentFrame(normal);
    const sine = Math.sin(spin);
    const cosine = Math.cos(spin);
    const rotated_u = frame.tangent_u
      .clone()
      .multiplyScalar(cosine)
      .addScaledVector(frame.tangent_v, sine);
    const rotated_v = frame.tangent_v
      .clone()
      .multiplyScalar(cosine)
      .addScaledVector(frame.tangent_u, -sine);

    local_offset
      .copy(rotated_u)
      .multiplyScalar(scaleX)
      .addScaledVector(rotated_v, scaleY);

    instance_dummy.position
      .copy(normal)
      .multiplyScalar(radius)
      .add(local_offset);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.quaternion.setFromUnitVectors(local_axis_y, normal);
    instance_dummy.rotateY(spin);
    instance_dummy.scale.set(scaleX, scaleY, scaleZ);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(slot, instance_dummy.matrix);
  }

  const fine_granulesCount = 2600;
  const fine_granulesGeom = new THREE.IcosahedronGeometry(1, 0);
  const fine_granules = new THREE.InstancedMesh(
    fine_granulesGeom,
    fine_granulesMat,
    fine_granulesCount
  );
  fine_granules.name = "fine_granules";
  for (let i = 0; i < fine_granulesCount; i++) {
    const normal = surfaceNormal(i, fine_granulesCount, 0.18);
    const size = 0.0048 + 0.0065 * deterministicUnit(i, 2);
    const scaleX = size * (0.7 + 0.5 * deterministicUnit(i, 3));
    const scaleY = size * (0.65 + 0.55 * deterministicUnit(i, 4));
    const scaleZ = size * (0.7 + 0.5 * deterministicUnit(i, 5));
    const radius = 0.404 + 0.009 * deterministicUnit(i, 6);
    const spin = deterministicUnit(i, 7) * Math.PI * 2;
    placeSurfaceInstance(
      fine_granules,
      i,
      normal,
      radius,
      scaleX,
      scaleY,
      scaleZ,
      spin,
      0
    );
  }
  fine_granules.instanceMatrix.needsUpdate = true;
  root.add(fine_granules);

  const medium_granulesCount = 560;
  const medium_granulesGeom = new THREE.DodecahedronGeometry(1, 0);
  const medium_granules = new THREE.InstancedMesh(
    medium_granulesGeom,
    medium_granulesMat,
    medium_granulesCount
  );
  medium_granules.name = "medium_granules";
  for (let i = 0; i < medium_granulesCount; i++) {
    const normal = surfaceNormal(i, medium_granulesCount, 1.37);
    const size = 0.008 + 0.009 * deterministicUnit(i, 8);
    const scaleX = size * (0.72 + 0.55 * deterministicUnit(i, 9));
    const scaleY = size * (0.62 + 0.6 * deterministicUnit(i, 10));
    const scaleZ = size * (0.72 + 0.5 * deterministicUnit(i, 11));
    const radius = 0.405 + 0.009 * deterministicUnit(i, 12);
    const spin = deterministicUnit(i, 13) * Math.PI * 2;
    placeSurfaceInstance(
      medium_granules,
      i,
      normal,
      radius,
      scaleX,
      scaleY,
      scaleZ,
      spin,
      0
    );
  }
  medium_granules.instanceMatrix.needsUpdate = true;
  root.add(medium_granules);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(-0.56, 0);
  leafShape.lineTo(-0.34, -0.2);
  leafShape.lineTo(-0.08, -0.3);
  leafShape.lineTo(0.2, -0.22);
  leafShape.lineTo(0.56, 0);
  leafShape.lineTo(0.25, 0.27);
  leafShape.lineTo(0.02, 0.31);
  leafShape.lineTo(-0.3, 0.21);
  leafShape.closePath();

  const leaf_flakesCount = 145;
  const leaf_flakesGeom = new THREE.ExtrudeGeometry(leafShape, {
    depth: 0.003,
    steps: 1,
    bevelEnabled: false,
  });
  leaf_flakesGeom.center();
  const leaf_flakes = new THREE.InstancedMesh(
    leaf_flakesGeom,
    leaf_flakesMat,
    leaf_flakesCount
  );
  leaf_flakes.name = "leaf_flakes";
  for (let i = 0; i < leaf_flakesCount; i++) {
    const normal = surfaceNormal(i, leaf_flakesCount, 2.61);
    const length = 0.022 + 0.034 * deterministicUnit(i, 14);
    const width =
      length * (0.42 + 0.34 * deterministicUnit(i, 15));
    const thickness = 0.65 + 0.8 * deterministicUnit(i, 16);
    const radius = 0.413 + 0.005 * deterministicUnit(i, 17);
    const spin = deterministicUnit(i, 18) * Math.PI * 2;
    placeSurfaceInstance(
      leaf_flakes,
      i,
      normal,
      radius,
      length,
      width,
      thickness,
      spin,
      0
    );
  }
  leaf_flakes.instanceMatrix.needsUpdate = true;
  root.add(leaf_flakes);

  const pale_leaf_flakesCount = 42;
  const pale_leaf_flakesGeom = leaf_flakesGeom;
  const pale_leaf_flakes = new THREE.InstancedMesh(
    pale_leaf_flakesGeom,
    pale_leaf_flakesMat,
    pale_leaf_flakesCount
  );
  pale_leaf_flakes.name = "pale_leaf_flakes";
  for (let i = 0; i < pale_leaf_flakesCount; i++) {
    const normal = surfaceNormal(i, pale_leaf_flakesCount, 4.14);
    const length = 0.018 + 0.029 * deterministicUnit(i, 19);
    const width =
      length * (0.45 + 0.3 * deterministicUnit(i, 20));
    const radius = 0.414 + 0.004 * deterministicUnit(i, 21);
    const spin = deterministicUnit(i, 22) * Math.PI * 2;
    placeSurfaceInstance(
      pale_leaf_flakes,
      i,
      normal,
      radius,
      length,
      width,
      0.75 + 0.55 * deterministicUnit(i, 23),
      spin,
      0
    );
  }
  pale_leaf_flakes.instanceMatrix.needsUpdate = true;
  root.add(pale_leaf_flakes);

  const dark_crevicesCount = 125;
  const dark_crevicesGeom = new THREE.CircleGeometry(1, 7);
  const dark_crevices = new THREE.InstancedMesh(
    dark_crevicesGeom,
    dark_crevicesMat,
    dark_crevicesCount
  );
  dark_crevices.name = "dark_crevices";
  for (let i = 0; i < dark_crevicesCount; i++) {
    const normal = surfaceNormal(i, dark_crevicesCount, 5.39);
    const length = 0.007 + 0.013 * deterministicUnit(i, 24);
    const width =
      length * (0.28 + 0.42 * deterministicUnit(i, 25));
    const radius = 0.4035 + 0.002 * deterministicUnit(i, 26);
    const spin = deterministicUnit(i, 27) * Math.PI * 2;
    placeSurfaceInstance(
      dark_crevices,
      i,
      normal,
      radius,
      length,
      width,
      1,
      spin,
      0
    );
  }
  dark_crevices.instanceMatrix.needsUpdate = true;
  root.add(dark_crevices);

  const stemsCount = 54;
  const stemsGeom = new THREE.CylinderGeometry(1, 1, 1, 5, 1, false);
  const stems = new THREE.InstancedMesh(
    stemsGeom,
    stemsMat,
    stemsCount
  );
  stems.name = "stems";
  for (let i = 0; i < stemsCount; i++) {
    const normal = surfaceNormal(i, stemsCount, 0.76);
    const frame = tangentFrame(normal);
    const angle = deterministicUnit(i, 28) * Math.PI * 2;
    const direction = frame.tangent_u
      .clone()
      .multiplyScalar(Math.cos(angle))
      .addScaledVector(frame.tangent_v, Math.sin(angle))
      .normalize();
    const length = 0.025 + 0.055 * deterministicUnit(i, 29);
    const thickness = 0.0012 + 0.001 * deterministicUnit(i, 30);
    const radius = 0.416 + 0.004 * deterministicUnit(i, 31);

    instance_dummy.position.copy(normal).multiplyScalar(radius);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.quaternion.setFromUnitVectors(
      local_axis_y,
      direction
    );
    instance_dummy.scale.set(thickness, length, thickness);
    instance_dummy.updateMatrix();
    stems.setMatrixAt(i, instance_dummy.matrix);
  }
  stems.instanceMatrix.needsUpdate = true;
  root.add(stems);

  const green_stemsCount = 34;
  const green_stemsGeom = stemsGeom;
  const green_stems = new THREE.InstancedMesh(
    green_stemsGeom,
    green_stemsMat,
    green_stemsCount
  );
  green_stems.name = "green_stems";
  for (let i = 0; i < green_stemsCount; i++) {
    const normal = surfaceNormal(i, green_stemsCount, 3.27);
    const frame = tangentFrame(normal);
    const angle = deterministicUnit(i, 32) * Math.PI * 2;
    const direction = frame.tangent_u
      .clone()
      .multiplyScalar(Math.cos(angle))
      .addScaledVector(frame.tangent_v, Math.sin(angle))
      .normalize();
    const length = 0.018 + 0.043 * deterministicUnit(i, 33);
    const thickness = 0.0011 + 0.0009 * deterministicUnit(i, 34);
    const radius = 0.415 + 0.004 * deterministicUnit(i, 35);

    instance_dummy.position.copy(normal).multiplyScalar(radius);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.quaternion.setFromUnitVectors(
      local_axis_y,
      direction
    );
    instance_dummy.scale.set(thickness, length, thickness);
    instance_dummy.updateMatrix();
    green_stems.setMatrixAt(i, instance_dummy.matrix);
  }
  green_stems.instanceMatrix.needsUpdate = true;
  root.add(green_stems);

  const seed_specksCount = 48;
  const seed_specksGeom = new THREE.SphereGeometry(1, 7, 5);
  const seed_specks = new THREE.InstancedMesh(
    seed_specksGeom,
    seed_specksMat,
    seed_specksCount
  );
  seed_specks.name = "seed_specks";
  for (let i = 0; i < seed_specksCount; i++) {
    const normal = surfaceNormal(i, seed_specksCount, 5.83);
    const size = 0.0028 + 0.0038 * deterministicUnit(i, 36);
    const radius = 0.415 + 0.004 * deterministicUnit(i, 37);
    const spin = deterministicUnit(i, 38) * Math.PI * 2;
    placeSurfaceInstance(
      seed_specks,
      i,
      normal,
      radius,
      size * (0.8 + 0.45 * deterministicUnit(i, 39)),
      size * (0.65 + 0.5 * deterministicUnit(i, 40)),
      size,
      spin,
      0
    );
  }
  seed_specks.instanceMatrix.needsUpdate = true;
  root.add(seed_specks);

  function createSurfaceStem(name, coordinates, material, radius) {
    const points = [];
    for (let i = 0; i < coordinates.length; i++) {
      const x = coordinates[i][0];
      const y = coordinates[i][1];
      const z =
        Math.sqrt(Math.max(0.015, 0.168 - x * x - y * y)) + 0.006;
      points.push(new THREE.Vector3(x, y, z));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      20,
      radius,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    root.add(mesh);
    return mesh;
  }

  const front_diagonal_stem = createSurfaceStem(
    "front_diagonal_stem",
    [
      [0.08, -0.22],
      [0.13, -0.19],
      [0.18, -0.15],
      [0.23, -0.12],
    ],
    stemsMat,
    0.0025
  );

  const left_long_stem = createSurfaceStem(
    "left_long_stem",
    [
      [-0.3, -0.035],
      [-0.315, 0.025],
      [-0.32, 0.085],
      [-0.31, 0.145],
    ],
    stemsMat,
    0.0022
  );

  const upper_right_stem = createSurfaceStem(
    "upper_right_stem",
    [
      [0.105, 0.265],
      [0.155, 0.29],
      [0.205, 0.305],
      [0.255, 0.3],
    ],
    stemsMat,
    0.0023
  );

  const right_curved_stem = createSurfaceStem(
    "right_curved_stem",
    [
      [0.29, -0.13],
      [0.315, -0.09],
      [0.33, -0.04],
      [0.32, 0.015],
    ],
    stemsMat,
    0.0021
  );

  const lower_green_stem = createSurfaceStem(
    "lower_green_stem",
    [
      [-0.22, -0.28],
      [-0.17, -0.3],
      [-0.11, -0.305],
      [-0.055, -0.29],
    ],
    green_stemsMat,
    0.0019
  );

  fitToUnitCube(THREE, root);
  return root;

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
}