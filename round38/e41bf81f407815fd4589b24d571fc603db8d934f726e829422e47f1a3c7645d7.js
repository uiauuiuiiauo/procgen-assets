export default function generate(THREE) {
  const root = new THREE.Group();

  const orange_ballMat = new THREE.MeshStandardMaterial({
    color: 0xff641f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const side_plugsMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.3,
  });
  const plug_markingsMat = new THREE.MeshStandardMaterial({
    color: 0x4a4a4a,
    metalness: 0.0,
    roughness: 0.8,
  });

  const orange_ballGeom = new THREE.SphereGeometry(1, 64, 40);
  const orange_ball = new THREE.Mesh(orange_ballGeom, orange_ballMat);
  root.add(orange_ball);

  const side_plugsGeom = new THREE.SphereGeometry(1, 32, 20);
  const side_plugs = new THREE.InstancedMesh(side_plugsGeom, side_plugsMat, 2);

  const plugRadius = 1.005;
  const plugAngle = 1.48;
  const plugY = -0.02;
  const transform = new THREE.Object3D();
  const localForward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const x = side * Math.sin(plugAngle) * plugRadius;
    const z = Math.cos(plugAngle) * plugRadius;
    const normal = new THREE.Vector3(x, 0, z).normalize();

    transform.position.set(x, plugY, z);
    transform.quaternion.setFromUnitVectors(localForward, normal);
    transform.scale.set(0.13, 0.22, 0.095);
    transform.updateMatrix();
    side_plugs.setMatrixAt(i, transform.matrix);
  }
  side_plugs.instanceMatrix.needsUpdate = true;
  root.add(side_plugs);

  const plug_markingsGeom = new THREE.TorusGeometry(0.023, 0.006, 8, 18);
  const plug_markings = new THREE.InstancedMesh(
    plug_markingsGeom,
    plug_markingsMat,
    2
  );

  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    const x = side * Math.sin(plugAngle) * plugRadius;
    const z = Math.cos(plugAngle) * plugRadius;
    const normal = new THREE.Vector3(x, 0, z).normalize();

    transform.position.set(
      x + normal.x * 0.099,
      plugY - 0.015,
      z + normal.z * 0.099
    );
    transform.quaternion.setFromUnitVectors(localForward, normal);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    plug_markings.setMatrixAt(i, transform.matrix);
  }
  plug_markings.instanceMatrix.needsUpdate = true;
  root.add(plug_markings);

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