export default function generate(THREE) {
  const root = new THREE.Group();

  const vase_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xdde2df,
    metalness: 0.0,
    roughness: 0.4,
    flatShading: false,
    side: THREE.DoubleSide,
  });

  const inner_cavityMat = new THREE.MeshStandardMaterial({
    color: 0xc5ccc9,
    metalness: 0.0,
    roughness: 0.4,
    flatShading: false,
    side: THREE.DoubleSide,
  });

  const vase_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.255, 0.000),
    new THREE.Vector2(0.292, 0.012),
    new THREE.Vector2(0.322, 0.040),
    new THREE.Vector2(0.335, 0.075),
    new THREE.Vector2(0.330, 0.110),
    new THREE.Vector2(0.310, 0.145),
    new THREE.Vector2(0.282, 0.175),
    new THREE.Vector2(0.270, 0.225),
    new THREE.Vector2(0.278, 0.330),
    new THREE.Vector2(0.298, 0.500),
    new THREE.Vector2(0.325, 0.700),
    new THREE.Vector2(0.345, 0.900),
    new THREE.Vector2(0.350, 1.080),
    new THREE.Vector2(0.342, 1.250),
    new THREE.Vector2(0.325, 1.400),
    new THREE.Vector2(0.300, 1.530),
    new THREE.Vector2(0.267, 1.640),
    new THREE.Vector2(0.235, 1.720),
    new THREE.Vector2(0.216, 1.785),
    new THREE.Vector2(0.214, 1.835),
    new THREE.Vector2(0.228, 1.890),
    new THREE.Vector2(0.255, 1.945),
    new THREE.Vector2(0.295, 2.000),
    new THREE.Vector2(0.338, 2.045),
    new THREE.Vector2(0.372, 2.075),
  ];
  const vase_bodyGeom = new THREE.LatheGeometry(vase_bodyProfile, 128);
  vase_bodyGeom.computeVertexNormals();
  const vase_body = new THREE.Mesh(vase_bodyGeom, vase_bodyMat);
  root.add(vase_body);

  const inner_cavityProfile = [
    new THREE.Vector2(0.000, 1.735),
    new THREE.Vector2(0.065, 1.740),
    new THREE.Vector2(0.130, 1.750),
    new THREE.Vector2(0.180, 1.770),
    new THREE.Vector2(0.205, 1.810),
    new THREE.Vector2(0.214, 1.860),
    new THREE.Vector2(0.222, 1.915),
    new THREE.Vector2(0.240, 1.970),
    new THREE.Vector2(0.270, 2.020),
    new THREE.Vector2(0.302, 2.062),
    new THREE.Vector2(0.319, 2.083),
  ];
  const inner_cavityGeom = new THREE.LatheGeometry(inner_cavityProfile, 128);
  inner_cavityGeom.computeVertexNormals();
  const inner_cavity = new THREE.Mesh(inner_cavityGeom, inner_cavityMat);
  root.add(inner_cavity);

  const rimGeom = new THREE.TorusGeometry(0.347, 0.028, 24, 128);
  const rimMat = vase_bodyMat;
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.087;
  root.add(rim);

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