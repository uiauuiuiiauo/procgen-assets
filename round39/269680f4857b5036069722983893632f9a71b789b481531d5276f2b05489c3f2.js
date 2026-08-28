export default function generate(THREE) {
  const root = new THREE.Group();
  const spatula_assembly = new THREE.Group();
  root.add(spatula_assembly);

  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.4,
  });

  const bladeThickness = 0.045;
  const bladeHalfThickness = bladeThickness / 2;
  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.075, -0.43);
  bladeShape.bezierCurveTo(-0.09, -0.30, -0.20, -0.20, -0.33, -0.10);
  bladeShape.bezierCurveTo(-0.41, -0.035, -0.455, -0.005, -0.455, 0.055);
  bladeShape.lineTo(-0.375, 1.145);
  bladeShape.quadraticCurveTo(-0.37, 1.205, -0.34, 1.225);

  const toothCount = 10;
  const toothLeft = -0.34;
  const toothRight = 0.37;
  const toothStep = (toothRight - toothLeft) / toothCount;
  bladeShape.lineTo(toothLeft, 1.225);

  for (let i = 0; i < toothCount; i++) {
    const toothPeakX = toothLeft + (i + 0.48) * toothStep;
    const toothValleyX = toothLeft + (i + 1) * toothStep;
    const toothPeakY = 1.285 - i * 0.003;
    bladeShape.lineTo(toothPeakX, toothPeakY);
    bladeShape.lineTo(toothValleyX, 1.225);
  }

  bladeShape.quadraticCurveTo(0.405, 1.205, 0.41, 1.145);
  bladeShape.lineTo(0.455, 0.055);
  bladeShape.quadraticCurveTo(0.455, -0.005, 0.395, -0.04);
  bladeShape.bezierCurveTo(0.25, -0.13, 0.12, -0.22, 0.075, -0.43);
  bladeShape.closePath();

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: bladeThickness,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const blade = new THREE.Mesh(bladeGeom, [bladeMat, edgeMat]);
  blade.position.z = -bladeHalfThickness;
  spatula_assembly.add(blade);

  const neckShape = new THREE.Shape();
  neckShape.moveTo(-0.095, -0.84);
  neckShape.bezierCurveTo(-0.092, -0.70, -0.088, -0.54, -0.078, -0.43);
  neckShape.bezierCurveTo(-0.072, -0.31, -0.11, -0.20, -0.21, -0.10);
  neckShape.bezierCurveTo(-0.13, -0.055, -0.07, -0.025, -0.05, 0.02);
  neckShape.lineTo(0.05, 0.02);
  neckShape.bezierCurveTo(0.07, -0.025, 0.13, -0.055, 0.21, -0.10);
  neckShape.bezierCurveTo(0.11, -0.20, 0.072, -0.31, 0.078, -0.43);
  neckShape.bezierCurveTo(0.088, -0.54, 0.092, -0.70, 0.095, -0.84);
  neckShape.closePath();

  const neckDepth = 0.058;
  const neckHalfDepth = neckDepth / 2;
  const neckGeom = new THREE.ExtrudeGeometry(neckShape, {
    depth: neckDepth,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.007,
    bevelSegments: 2,
  });
  const neck = new THREE.Mesh(neckGeom, [handleMat, edgeMat]);
  neck.position.z = -neckHalfDepth;
  spatula_assembly.add(neck);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.092, -0.82);
  handleShape.bezierCurveTo(-0.098, -0.98, -0.115, -1.22, -0.132, -1.47);
  handleShape.bezierCurveTo(-0.145, -1.66, -0.158, -1.84, -0.162, -1.92);
  handleShape.bezierCurveTo(-0.166, -2.02, -0.095, -2.09, 0, -2.095);
  handleShape.bezierCurveTo(0.095, -2.09, 0.166, -2.02, 0.162, -1.92);
  handleShape.bezierCurveTo(0.158, -1.84, 0.145, -1.66, 0.132, -1.47);
  handleShape.bezierCurveTo(0.115, -1.22, 0.098, -0.98, 0.092, -0.82);
  handleShape.closePath();

  const hangingHole = new THREE.Path();
  hangingHole.absarc(0, -1.91, 0.071, 0, Math.PI * 2, true);
  handleShape.holes.push(hangingHole);

  const handleDepth = 0.085;
  const handleHalfDepth = handleDepth / 2;
  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: handleDepth,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const handle = new THREE.Mesh(handleGeom, [handleMat, edgeMat]);
  handle.position.z = -handleHalfDepth;
  spatula_assembly.add(handle);

  const hanging_hole_rimGeom = new THREE.TorusGeometry(0.078, 0.009, 8, 32);
  const hanging_hole_rim = new THREE.Mesh(hanging_hole_rimGeom, edgeMat);
  hanging_hole_rim.position.set(0, -1.91, handleHalfDepth + 0.014);
  spatula_assembly.add(hanging_hole_rim);

  const handle_seamGeom = new THREE.BoxGeometry(0.188, 0.009, 0.007);
  const handle_seam = new THREE.Mesh(handle_seamGeom, seamMat);
  handle_seam.position.set(0, -0.825, handleHalfDepth + 0.015);
  spatula_assembly.add(handle_seam);

  spatula_assembly.rotation.z = -0.12;

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