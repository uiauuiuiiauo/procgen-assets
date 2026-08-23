export default function generate(THREE) {
  const root = new THREE.Group();

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x303236,
    metalness: 0.0,
    roughness: 0.7,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x202225,
    metalness: 0.0,
    roughness: 0.8,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x101113,
    metalness: 0.0,
    roughness: 0.8,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x030303,
    metalness: 0.0,
    roughness: 0.8,
  });

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.15, -0.34);
  bladeShape.bezierCurveTo(-0.18, -0.20, -0.38, -0.08, -0.52, 0.08);
  bladeShape.lineTo(-0.63, 1.98);
  bladeShape.bezierCurveTo(-0.64, 2.13, -0.54, 2.25, -0.39, 2.30);
  bladeShape.lineTo(0.39, 2.30);
  bladeShape.bezierCurveTo(0.54, 2.25, 0.64, 2.13, 0.63, 1.98);
  bladeShape.lineTo(0.52, 0.08);
  bladeShape.bezierCurveTo(0.38, -0.08, 0.18, -0.20, 0.15, -0.34);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 20,
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.rotation.x = Math.PI / 2;
  blade.position.y = 0.0275;
  root.add(blade);

  const shankShape = new THREE.Shape();
  shankShape.moveTo(-0.13, -1.06);
  shankShape.lineTo(-0.15, -0.30);
  shankShape.bezierCurveTo(-0.18, -0.18, -0.34, -0.04, -0.40, 0.08);
  shankShape.lineTo(0.40, 0.08);
  shankShape.bezierCurveTo(0.34, -0.04, 0.18, -0.18, 0.15, -0.30);
  shankShape.lineTo(0.13, -1.06);
  shankShape.closePath();

  const shankGeom = new THREE.ExtrudeGeometry(shankShape, {
    depth: 0.12,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const shank = new THREE.Mesh(shankGeom, bladeMat);
  shank.rotation.x = Math.PI / 2;
  shank.position.y = 0.16;
  root.add(shank);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.24, -1.00);
  handleShape.bezierCurveTo(-0.30, -1.07, -0.35, -1.14, -0.35, -1.25);
  handleShape.lineTo(-0.39, -2.76);
  handleShape.bezierCurveTo(-0.40, -3.02, -0.25, -3.22, 0.00, -3.27);
  handleShape.bezierCurveTo(0.25, -3.22, 0.40, -3.02, 0.39, -2.76);
  handleShape.lineTo(0.35, -1.25);
  handleShape.bezierCurveTo(0.35, -1.14, 0.30, -1.07, 0.24, -1.00);
  handleShape.closePath();

  const hangingHolePath = new THREE.Path();
  hangingHolePath.absellipse(
    0,
    -2.84,
    0.135,
    0.135,
    0,
    Math.PI * 2,
    true,
    0
  );
  handleShape.holes.push(hangingHolePath);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.28,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 5,
    curveSegments: 28,
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.rotation.x = Math.PI / 2;
  handle.position.y = 0.29;
  root.add(handle);

  const handle_collarGeom = new THREE.CapsuleGeometry(0.10, 0.44, 5, 16);
  const handle_collar = new THREE.Mesh(handle_collarGeom, handleMat);
  handle_collar.rotation.z = Math.PI / 2;
  handle_collar.scale.set(0.78, 1, 1.08);
  handle_collar.position.set(0, 0.145, -1.01);
  root.add(handle_collar);

  const handle_seamGeom = new THREE.BoxGeometry(0.62, 0.014, 1.48);
  const handle_seam = new THREE.Mesh(handle_seamGeom, seamMat);
  handle_seam.position.set(0, 0.066, -1.86);
  root.add(handle_seam);

  const hanging_holeGeom = new THREE.CylinderGeometry(0.122, 0.122, 0.025, 28);
  const hanging_hole = new THREE.Mesh(hanging_holeGeom, holeMat);
  hanging_hole.position.set(0, -0.045, -2.84);
  root.add(hanging_hole);

  const hanging_hole_rimGeom = new THREE.TorusGeometry(0.135, 0.014, 8, 32);
  const hanging_hole_rim = new THREE.Mesh(hanging_hole_rimGeom, seamMat);
  hanging_hole_rim.rotation.x = -Math.PI / 2;
  hanging_hole_rim.position.set(0, 0.349, -2.84);
  root.add(hanging_hole_rim);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
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