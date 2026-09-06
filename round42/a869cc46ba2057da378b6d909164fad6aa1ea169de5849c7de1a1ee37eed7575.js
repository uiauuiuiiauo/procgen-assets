export default function generate(THREE) {
  const root = new THREE.Group();

  const shellMat = new THREE.MeshStandardMaterial({
    color: 0xffe500,
    metalness: 0.0,
    roughness: 0.3,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xd9b900,
    metalness: 0.0,
    roughness: 0.3,
  });

  const radius = 0.5;
  const seamY = -0.395;
  const seamTheta = Math.acos(seamY / radius);
  const seamRadius = Math.sqrt(radius * radius - seamY * seamY);

  const upper_shellGeom = new THREE.SphereGeometry(
    radius,
    64,
    32,
    0,
    Math.PI * 2,
    0,
    seamTheta
  );
  const upper_shell = new THREE.Mesh(upper_shellGeom, shellMat);
  root.add(upper_shell);

  const lower_shellGeom = new THREE.SphereGeometry(
    radius,
    64,
    24,
    0,
    Math.PI * 2,
    seamTheta,
    Math.PI - seamTheta
  );
  const lower_shell = new THREE.Mesh(lower_shellGeom, shellMat);
  root.add(lower_shell);

  const seam_ringGeom = new THREE.TorusGeometry(
    seamRadius - 0.0015,
    0.0025,
    8,
    96
  );
  const seam_ring = new THREE.Mesh(seam_ringGeom, seamMat);
  seam_ring.rotation.x = Math.PI / 2;
  seam_ring.position.y = seamY;
  root.add(seam_ring);

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