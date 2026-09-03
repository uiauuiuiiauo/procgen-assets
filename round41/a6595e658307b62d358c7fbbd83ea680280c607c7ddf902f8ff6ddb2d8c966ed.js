export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const cheese_wheel = new THREE.Group();
  cheese_wheel.name = "cheese_wheel";
  root.add(cheese_wheel);

  const cheese_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf2bd62,
    metalness: 0.0,
    roughness: 0.7,
  });

  const cheese_bodyProfile = [
    new THREE.Vector2(0.00, -0.390),
    new THREE.Vector2(0.82, -0.390),
    new THREE.Vector2(0.92, -0.375),
    new THREE.Vector2(0.975, -0.335),
    new THREE.Vector2(0.998, -0.255),
    new THREE.Vector2(1.000, 0.190),
    new THREE.Vector2(0.988, 0.270),
    new THREE.Vector2(0.958, 0.335),
    new THREE.Vector2(0.905, 0.380),
    new THREE.Vector2(0.820, 0.405),
    new THREE.Vector2(0.00, 0.405),
  ];
  const cheese_bodyGeom = new THREE.LatheGeometry(cheese_bodyProfile, 64);
  const cheese_body = new THREE.Mesh(cheese_bodyGeom, cheese_bodyMat);
  cheese_body.name = "cheese_body";
  cheese_wheel.add(cheese_body);

  const top_decoration = new THREE.Group();
  top_decoration.name = "top_decoration";
  cheese_wheel.add(top_decoration);

  const flower_petal_groovesMat = new THREE.MeshStandardMaterial({
    color: 0xd99527,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const flower_petal_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0xf8ca6b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const flower_centersMat = new THREE.MeshStandardMaterial({
    color: 0xf8ca6b,
    metalness: 0.0,
    roughness: 0.7,
  });

  const flower_specs = [
    { x: -0.47, z: 0.12, length: 0.29, width: 0.072, count: 12, rotation: 0.08 },
    { x: 0.49, z: 0.12, length: 0.27, width: 0.068, count: 12, rotation: 0.20 },
    { x: 0.03, z: 0.49, length: 0.26, width: 0.066, count: 11, rotation: 0.02 },
    { x: 0.00, z: -0.35, length: 0.13, width: 0.038, count: 10, rotation: 0.13 },
    { x: -0.49, z: -0.40, length: 0.22, width: 0.055, count: 7, rotation: 0.30 },
    { x: 0.48, z: -0.40, length: 0.22, width: 0.055, count: 7, rotation: -0.18 },
  ];

  let petal_count = 0;
  for (const spec of flower_specs) petal_count += spec.count;

  const flower_petal_groovesGeom = new THREE.CircleGeometry(1, 18);
  const flower_petal_grooves = new THREE.InstancedMesh(
    flower_petal_groovesGeom,
    flower_petal_groovesMat,
    petal_count
  );
  flower_petal_grooves.name = "flower_petal_grooves";

  const flower_petal_ridgesGeom = new THREE.CircleGeometry(1, 18);
  const flower_petal_ridges = new THREE.InstancedMesh(
    flower_petal_ridgesGeom,
    flower_petal_ridgesMat,
    petal_count
  );
  flower_petal_ridges.name = "flower_petal_ridges";

  const petal_dummy = new THREE.Object3D();
  const horizontal_quaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -Math.PI / 2
  );
  const spin_quaternion = new THREE.Quaternion();
  const vertical_axis = new THREE.Vector3(0, 1, 0);

  let petal_index = 0;
  for (const spec of flower_specs) {
    for (let i = 0; i < spec.count; i++) {
      const angle = spec.rotation + (i / spec.count) * Math.PI * 2;
      const dx = Math.sin(angle);
      const dz = Math.cos(angle);
      const px = -Math.cos(angle);
      const pz = Math.sin(angle);

      spin_quaternion.setFromAxisAngle(vertical_axis, angle);
      petal_dummy.quaternion.multiplyQuaternions(
        spin_quaternion,
        horizontal_quaternion
      );

      petal_dummy.position.set(
        spec.x + dx * spec.length * 0.48,
        0.405,
        spec.z + dz * spec.length * 0.48
      );
      petal_dummy.scale.set(spec.width * 0.5, spec.length * 0.5, 1);
      petal_dummy.updateMatrix();
      flower_petal_grooves.setMatrixAt(petal_index, petal_dummy.matrix);

      petal_dummy.position.set(
        spec.x + dx * spec.length * 0.50,
        0.409,
        spec.z + dz * spec.length * 0.50
      );
      petal_dummy.scale.set(spec.width * 0.31, spec.length * 0.42, 1);
      petal_dummy.updateMatrix();
      flower_petal_ridges.setMatrixAt(petal_index, petal_dummy.matrix);

      petal_index++;
    }
  }

  flower_petal_grooves.instanceMatrix.needsUpdate = true;
  flower_petal_ridges.instanceMatrix.needsUpdate = true;
  top_decoration.add(flower_petal_grooves, flower_petal_ridges);

  const flower_centersGeom = new THREE.SphereGeometry(1, 20, 10);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flower_centersMat,
    flower_specs.length
  );
  flower_centers.name = "flower_centers";

  const flower_center_ringsGeom = new THREE.TorusGeometry(0.065, 0.008, 8, 24);
  const flower_center_rings = new THREE.InstancedMesh(
    flower_center_ringsGeom,
    flower_petal_groovesMat,
    flower_specs.length
  );
  flower_center_rings.name = "flower_center_rings";

  const center_dummy = new THREE.Object3D();
  for (let i = 0; i < flower_specs.length; i++) {
    const spec = flower_specs[i];
    const center_scale = spec.length / 0.29;

    center_dummy.position.set(spec.x, 0.411, spec.z);
    center_dummy.quaternion.identity();
    center_dummy.scale.set(
      0.075 * center_scale,
      0.018 * center_scale,
      0.075 * center_scale
    );
    center_dummy.updateMatrix();
    flower_centers.setMatrixAt(i, center_dummy.matrix);

    center_dummy.position.set(spec.x, 0.408, spec.z);
    center_dummy.quaternion.copy(horizontal_quaternion);
    center_dummy.scale.setScalar(center_scale);
    center_dummy.updateMatrix();
    flower_center_rings.setMatrixAt(i, center_dummy.matrix);
  }

  flower_centers.instanceMatrix.needsUpdate = true;
  flower_center_rings.instanceMatrix.needsUpdate = true;
  top_decoration.add(flower_center_rings, flower_centers);

  const side_textureMat = new THREE.MeshStandardMaterial({
    color: 0xdfa443,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const side_pitsGeom = new THREE.CircleGeometry(1, 14);
  const side_pits = new THREE.InstancedMesh(
    side_pitsGeom,
    side_textureMat,
    14
  );
  side_pits.name = "side_pits";

  const side_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2 + Math.sin(i * 1.7) * 0.11;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const y = -0.27 + (((i * 7) % 13) / 12) * 0.43;
    const width = 0.014 + ((i * 5) % 7) * 0.005;
    const height = 0.009 + ((i * 3) % 5) * 0.004;

    side_dummy.position.set(normal.x * 1.002, y, normal.z * 1.002);
    side_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    side_dummy.scale.set(width, height, 1);
    side_dummy.updateMatrix();
    side_pits.setMatrixAt(i, side_dummy.matrix);
  }
  side_pits.instanceMatrix.needsUpdate = true;
  cheese_wheel.add(side_pits);

  const side_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0xffdc8b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const side_crumbsGeom = new THREE.CircleGeometry(1, 10);
  const side_crumbs = new THREE.InstancedMesh(
    side_crumbsGeom,
    side_crumbsMat,
    18
  );
  side_crumbs.name = "side_crumbs";

  for (let i = 0; i < 18; i++) {
    const angle = (i / 18) * Math.PI * 2 + Math.sin(i * 2.3) * 0.16;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const y = -0.30 + (((i * 11) % 17) / 16) * 0.48;
    const width = 0.004 + ((i * 3) % 5) * 0.002;
    const height = 0.003 + ((i * 7) % 4) * 0.002;

    side_dummy.position.set(normal.x * 1.003, y, normal.z * 1.003);
    side_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
    side_dummy.scale.set(width, height, 1);
    side_dummy.updateMatrix();
    side_crumbs.setMatrixAt(i, side_dummy.matrix);
  }
  side_crumbs.instanceMatrix.needsUpdate = true;
  cheese_wheel.add(side_crumbs);

  const side_creaseMat = new THREE.MeshStandardMaterial({
    color: 0xe3a43b,
    metalness: 0.0,
    roughness: 0.7,
  });
  const side_creasePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.295, -0.105, 0.948),
    new THREE.Vector3(-0.255, -0.072, 0.962),
    new THREE.Vector3(-0.205, -0.055, 0.970),
    new THREE.Vector3(-0.160, -0.060, 0.975),
  ]);
  const side_creaseGeom = new THREE.TubeGeometry(
    side_creasePath,
    12,
    0.006,
    6,
    false
  );
  const side_crease = new THREE.Mesh(side_creaseGeom, side_creaseMat);
  side_crease.name = "side_crease";
  cheese_wheel.add(side_crease);

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