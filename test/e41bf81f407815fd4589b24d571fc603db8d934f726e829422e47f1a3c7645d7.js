export default function generate(THREE) {
  const root = new THREE.Group();

  const orange_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xff641f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const recessed_detailMat = new THREE.MeshStandardMaterial({
    color: 0x050505,
    metalness: 0.0,
    roughness: 0.8,
  });

  const orange_bodyGeom = new THREE.SphereGeometry(0.5, 64, 40);
  const orange_body = new THREE.Mesh(orange_bodyGeom, orange_bodyMat);
  root.add(orange_body);

  const side_mountsGeom = new THREE.CylinderGeometry(0.067, 0.067, 0.03, 32);
  const side_mounts = new THREE.InstancedMesh(
    side_mountsGeom,
    black_plasticMat,
    2
  );
  const mount_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    mount_dummy.position.set(side * 0.486, -0.005, 0);
    mount_dummy.rotation.set(0, 0, Math.PI / 2);
    mount_dummy.scale.set(1, 1, 1);
    mount_dummy.updateMatrix();
    side_mounts.setMatrixAt(i, mount_dummy.matrix);
  }
  side_mounts.instanceMatrix.needsUpdate = true;
  root.add(side_mounts);

  const side_housingsGeom = new THREE.SphereGeometry(1, 32, 20);
  const side_housings = new THREE.InstancedMesh(
    side_housingsGeom,
    black_plasticMat,
    2
  );
  const housing_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    housing_dummy.position.set(side * 0.505, -0.005, 0);
    housing_dummy.rotation.set(0, 0, 0);
    housing_dummy.scale.set(0.034, 0.075, 0.052);
    housing_dummy.updateMatrix();
    side_housings.setMatrixAt(i, housing_dummy.matrix);
  }
  side_housings.instanceMatrix.needsUpdate = true;
  root.add(side_housings);

  const outer_capsGeom = new THREE.CylinderGeometry(0.052, 0.052, 0.014, 32);
  const outer_caps = new THREE.InstancedMesh(
    outer_capsGeom,
    black_plasticMat,
    2
  );
  const cap_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    cap_dummy.position.set(side * 0.531, -0.005, 0);
    cap_dummy.rotation.set(0, 0, Math.PI / 2);
    cap_dummy.scale.set(1, 1, 1);
    cap_dummy.updateMatrix();
    outer_caps.setMatrixAt(i, cap_dummy.matrix);
  }
  outer_caps.instanceMatrix.needsUpdate = true;
  root.add(outer_caps);

  const right_cap_grooveGeom = new THREE.TorusGeometry(0.032, 0.003, 8, 24);
  const right_cap_groove = new THREE.Mesh(
    right_cap_grooveGeom,
    recessed_detailMat
  );
  right_cap_groove.position.set(0.539, -0.005, 0);
  right_cap_groove.rotation.y = Math.PI / 2;
  root.add(right_cap_groove);

  const right_cap_buttonGeom = new THREE.CylinderGeometry(
    0.013,
    0.013,
    0.007,
    20
  );
  const right_cap_button = new THREE.Mesh(
    right_cap_buttonGeom,
    recessed_detailMat
  );
  right_cap_button.position.set(0.542, -0.005, 0);
  right_cap_button.rotation.z = Math.PI / 2;
  root.add(right_cap_button);

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