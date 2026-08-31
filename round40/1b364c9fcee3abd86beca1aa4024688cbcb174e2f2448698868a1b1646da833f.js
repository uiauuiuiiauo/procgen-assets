export default function generate(THREE) {
  const root = new THREE.Group();

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2d878,
    metalness: 0.0,
    roughness: 0.32,
    transmission: 0.32,
    ior: 1.45,
    thickness: 0.8,
    attenuationColor: 0xffe79a,
    attenuationDistance: 2.0,
    transparent: true,
    opacity: 0.98,
    emissive: 0xf2d878,
    emissiveIntensity: 0.16,
  });
  const bodyGeom = new THREE.SphereGeometry(0.5, 64, 40);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.scale.set(1.0, 0.99, 1.0);
  root.add(body);

  const surface_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xb98208,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const surface_specklesGeom = new THREE.CircleGeometry(1, 7);
  const surface_specklesCount = 1260;
  const surface_speckles = new THREE.InstancedMesh(
    surface_specklesGeom,
    surface_specklesMat,
    surface_specklesCount
  );
  root.add(surface_speckles);

  const dark_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x896007,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const dark_specklesGeom = new THREE.CircleGeometry(1, 6);
  const dark_specklesCount = 320;
  const dark_speckles = new THREE.InstancedMesh(
    dark_specklesGeom,
    dark_specklesMat,
    dark_specklesCount
  );
  root.add(dark_speckles);

  const pale_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0xfff2bd,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const pale_inclusionsGeom = new THREE.CircleGeometry(1, 8);
  const pale_inclusionsCount = 240;
  const pale_inclusions = new THREE.InstancedMesh(
    pale_inclusionsGeom,
    pale_inclusionsMat,
    pale_inclusionsCount
  );
  root.add(pale_inclusions);

  const golden_flakesMat = new THREE.MeshStandardMaterial({
    color: 0xd09a08,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const golden_flakesGeom = new THREE.CircleGeometry(1, 5);
  const golden_flakesCount = 180;
  const golden_flakes = new THREE.InstancedMesh(
    golden_flakesGeom,
    golden_flakesMat,
    golden_flakesCount
  );
  root.add(golden_flakes);

  const decal_forward = new THREE.Vector3(0, 0, 1);
  const surface_normal = new THREE.Vector3();
  const surface_position = new THREE.Vector3();
  const decal_scale = new THREE.Vector3();
  const decal_quaternion = new THREE.Quaternion();
  const decal_twist = new THREE.Quaternion();
  const decal_dummy = new THREE.Object3D();

  function populateDecals(mesh, count, baseSize, sizeRange, phase, offset) {
    for (let i = 0; i < count; i++) {
      const fraction = (i + 0.5) / count;
      const y = -0.985 + 1.97 * fraction;
      const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
      const angle =
        i * 2.399963229728653 +
        phase +
        0.17 * Math.sin(i * 1.731 + phase);

      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;
      surface_normal.set(x, y, z).normalize();

      surface_position.copy(surface_normal).multiplyScalar(0.502);
      decal_quaternion.setFromUnitVectors(decal_forward, surface_normal);
      decal_twist.setFromAxisAngle(
        decal_forward,
        i * 1.217 + phase + 0.4 * Math.sin(i * 0.83)
      );
      decal_quaternion.multiply(decal_twist);

      const variation =
        0.5 +
        0.5 * Math.sin((i + 1) * (phase + 1.713) * 2.41);
      const size = baseSize + sizeRange * variation * variation;
      const aspect =
        0.38 +
        0.52 * (0.5 + 0.5 * Math.sin(i * 3.137 + phase * 2.1));

      decal_scale.set(size, size * aspect, 1);
      decal_dummy.position.copy(surface_position);
      decal_dummy.quaternion.copy(decal_quaternion);
      decal_dummy.scale.copy(decal_scale);
      decal_dummy.updateMatrix();
      mesh.setMatrixAt(i, decal_dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    mesh.renderOrder = offset;
  }

  populateDecals(
    surface_speckles,
    surface_specklesCount,
    0.0015,
    0.0045,
    0.31,
    1
  );
  populateDecals(
    dark_speckles,
    dark_specklesCount,
    0.002,
    0.005,
    1.73,
    2
  );
  populateDecals(
    pale_inclusions,
    pale_inclusionsCount,
    0.0015,
    0.004,
    3.12,
    3
  );
  populateDecals(
    golden_flakes,
    golden_flakesCount,
    0.0025,
    0.006,
    4.46,
    4
  );

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