export default function generate(THREE) {
  const root = new THREE.Group();

  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff5a0a,
    metalness: 0.0,
    roughness: 0.3,
  });

  const white_bandMat = new THREE.MeshStandardMaterial({
    color: 0xf2f4f5,
    metalness: 0.0,
    roughness: 0.3,
  });

  const radius = 1.0;
  const bandHalfHeight = 0.09;
  const seamGap = 0.006;
  const upperBottom = bandHalfHeight + seamGap;
  const lowerTop = -bandHalfHeight - seamGap;

  const upper_shellProfile = [];
  const upperSteps = 32;
  for (let i = 0; i <= upperSteps; i++) {
    const t = i / upperSteps;
    const y = upperBottom + (Math.sqrt(radius * radius - upperBottom * upperBottom) - upperBottom) * t;
    upper_shellProfile.push(new THREE.Vector2(Math.sqrt(Math.max(0, radius * radius - y * y)), y));
  }
  upper_shellProfile.push(new THREE.Vector2(0, radius));

  const upper_shellGeom = new THREE.LatheGeometry(upper_shellProfile, 64);
  const upper_shell = new THREE.Mesh(upper_shellGeom, orangeMat);
  root.add(upper_shell);

  const lower_shellProfile = [new THREE.Vector2(0, -radius)];
  const lowerSteps = 32;
  for (let i = 0; i <= lowerSteps; i++) {
    const t = i / lowerSteps;
    const bottomY = -Math.sqrt(radius * radius - lowerTop * lowerTop);
    const y = bottomY + (lowerTop - bottomY) * t;
    lower_shellProfile.push(new THREE.Vector2(Math.sqrt(Math.max(0, radius * radius - y * y)), y));
  }

  const lower_shellGeom = new THREE.LatheGeometry(lower_shellProfile, 64);
  const lower_shell = new THREE.Mesh(lower_shellGeom, orangeMat);
  root.add(lower_shell);

  const white_bandProfile = [];
  const bandSteps = 12;
  for (let i = 0; i <= bandSteps; i++) {
    const t = i / bandSteps;
    const y = -bandHalfHeight + bandHalfHeight * 2 * t;
    white_bandProfile.push(new THREE.Vector2(Math.sqrt(radius * radius - y * y) + 0.006, y));
  }

  const white_bandGeom = new THREE.LatheGeometry(white_bandProfile, 64);
  const white_band = new THREE.Mesh(white_bandGeom, white_bandMat);
  root.add(white_band);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}