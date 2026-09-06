export default function generate(THREE) {
  const root = new THREE.Group();

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const red_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xe20b18,
    metalness: 0.0,
    roughness: 0.3,
  });

  const dark_red_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xb40712,
    metalness: 0.0,
    roughness: 0.3,
  });

  // Continuous elliptical coil forming the flexible ring.
  const metal_coilPoints = [];
  const coilPointCount = 144;
  const coilTurns = 24;
  const coilRadius = 1.25;
  const coilTubeRadius = 0.075;
  const coilRadialHalfWidth = 0.20;
  const coilDepthHalfWidth = 0.18;

  for (let i = 0; i < coilPointCount; i++) {
    const angle = i / coilPointCount * Math.PI * 2;
    const phase = coilTurns * angle;
    const radius = coilRadius + coilRadialHalfWidth * Math.cos(phase);
    metal_coilPoints.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      coilDepthHalfWidth * Math.sin(phase),
      Math.sin(angle) * radius
    ));
  }

  const metal_coilCurve = new THREE.CatmullRomCurve3(
    metal_coilPoints,
    true,
    "centripetal"
  );
  const metal_coilGeom = new THREE.TubeGeometry(
    metal_coilCurve,
    480,
    coilTubeRadius,
    12,
    true
  );
  const metal_coil = new THREE.Mesh(metal_coilGeom, polished_metalMat);
  root.add(metal_coil);

  // Molded red handle tucked behind the right-hand side of the coil.
  const red_handleShape = new THREE.Shape();
  red_handleShape.moveTo(-0.12, -0.25);
  red_handleShape.bezierCurveTo(0.10, -0.27, 0.30, -0.22, 0.48, -0.17);
  red_handleShape.bezierCurveTo(0.69, -0.12, 0.86, -0.17, 0.98, -0.13);
  red_handleShape.bezierCurveTo(1.10, -0.09, 1.12, 0.07, 1.04, 0.16);
  red_handleShape.bezierCurveTo(0.95, 0.25, 0.79, 0.22, 0.63, 0.18);
  red_handleShape.bezierCurveTo(0.43, 0.14, 0.25, 0.20, 0.08, 0.25);
  red_handleShape.bezierCurveTo(-0.08, 0.30, -0.21, 0.18, -0.19, 0.02);
  red_handleShape.bezierCurveTo(-0.18, -0.10, -0.16, -0.20, -0.12, -0.25);

  const red_handleHole = new THREE.Path();
  red_handleHole.moveTo(0.43, 0.01);
  red_handleHole.bezierCurveTo(0.48, -0.08, 0.57, -0.12, 0.69, -0.11);
  red_handleHole.bezierCurveTo(0.82, -0.11, 0.94, -0.09, 0.98, -0.02);
  red_handleHole.bezierCurveTo(1.00, 0.04, 0.94, 0.10, 0.85, 0.11);
  red_handleHole.bezierCurveTo(0.71, 0.13, 0.57, 0.10, 0.48, 0.07);
  red_handleHole.bezierCurveTo(0.43, 0.05, 0.41, 0.03, 0.43, 0.01);
  red_handleShape.holes.push(red_handleHole);

  const red_handleGeom = new THREE.ExtrudeGeometry(red_handleShape, {
    depth: 0.13,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 18,
  });
  red_handleGeom.translate(0, 0, -0.065);

  const red_handle = new THREE.Mesh(red_handleGeom, red_plasticMat);
  red_handle.rotation.x = Math.PI / 2;
  red_handle.position.set(0.82, -0.07, 0.30);
  root.add(red_handle);

  // A shallow molded grip inset follows the upper edge of the handle.
  const red_grip_insetPoints = [
    new THREE.Vector3(1.00, 0.014, 0.17),
    new THREE.Vector3(1.20, 0.014, 0.15),
    new THREE.Vector3(1.42, 0.014, 0.17),
    new THREE.Vector3(1.63, 0.014, 0.22),
  ];
  const red_grip_insetCurve = new THREE.CatmullRomCurve3(
    red_grip_insetPoints,
    false,
    "centripetal"
  );
  const red_grip_insetGeom = new THREE.TubeGeometry(
    red_grip_insetCurve,
    24,
    0.018,
    8,
    false
  );
  const red_grip_inset = new THREE.Mesh(
    red_grip_insetGeom,
    dark_red_plasticMat
  );
  root.add(red_grip_inset);

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