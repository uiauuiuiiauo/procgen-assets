export default function generate(THREE) {
  const root = new THREE.Group();

  const shellMat = new THREE.MeshStandardMaterial({
    color: 0xffe600,
    metalness: 0.0,
    roughness: 0.3,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xd6b900,
    metalness: 0.0,
    roughness: 0.3,
  });

  const seamY = -0.34;
  const seamAngle = Math.asin(seamY);
  const sphereRadius = 0.5;
  const sphereCenterY = 0.01;

  const upper_shellGeom = new THREE.SphereGeometry(
    sphereRadius,
    64,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2 - seamAngle
  );
  const upper_shell = new THREE.Mesh(upper_shellGeom, shellMat);
  upper_shell.position.y = sphereCenterY;
  root.add(upper_shell);

  const lower_shellGeom = new THREE.SphereGeometry(
    sphereRadius,
    64,
    24,
    0,
    Math.PI * 2,
    Math.PI / 2 + seamAngle,
    Math.PI / 2 - seamAngle
  );
  const lower_shell = new THREE.Mesh(lower_shellGeom, shellMat);
  lower_shell.position.y = sphereCenterY;
  root.add(lower_shell);

  const seamRadius = Math.sqrt(
    sphereRadius * sphereRadius - seamY * seamY
  );
  const seamGeom = new THREE.TorusGeometry(
    seamRadius - 0.002,
    0.003,
    8,
    96
  );
  const seam = new THREE.Mesh(seamGeom, seamMat);
  seam.rotation.x = Math.PI / 2;
  seam.position.y = sphereCenterY + seamY;
  root.add(seam);

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