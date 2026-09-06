export default function generate(THREE) {
  const root = new THREE.Group();

  const blue_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x2454df,
    metalness: 0.0,
    roughness: 0.3,
  });

  const handleProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.34, 0.00),
    new THREE.Vector2(0.39, 0.015),
    new THREE.Vector2(0.43, 0.05),
    new THREE.Vector2(0.46, 0.12),
    new THREE.Vector2(0.47, 0.22),
    new THREE.Vector2(0.47, 2.42),
    new THREE.Vector2(0.465, 2.50),
    new THREE.Vector2(0.45, 2.57),
    new THREE.Vector2(0.42, 2.62),
    new THREE.Vector2(0.00, 2.64),
  ];
  const handleGeom = new THREE.LatheGeometry(handleProfile, 48);
  const handle = new THREE.Mesh(handleGeom, blue_plasticMat);
  root.add(handle);

  const blade_headShape = new THREE.Shape();
  blade_headShape.moveTo(-0.42, 2.58);
  blade_headShape.bezierCurveTo(-0.31, 2.65, -0.22, 2.82, -0.15, 3.00);
  blade_headShape.bezierCurveTo(-0.07, 3.19, -0.09, 3.38, -0.23, 3.58);
  blade_headShape.lineTo(-0.38, 3.80);
  blade_headShape.lineTo(-0.30, 5.10);
  blade_headShape.bezierCurveTo(-0.295, 5.20, -0.25, 5.27, -0.16, 5.30);
  blade_headShape.bezierCurveTo(-0.08, 5.32, 0.03, 5.26, 0.13, 5.22);
  blade_headShape.bezierCurveTo(0.24, 5.18, 0.29, 5.08, 0.34, 4.95);
  blade_headShape.lineTo(0.69, 4.00);
  blade_headShape.bezierCurveTo(0.74, 3.86, 0.72, 3.74, 0.64, 3.62);
  blade_headShape.bezierCurveTo(0.51, 3.43, 0.42, 3.23, 0.41, 3.04);
  blade_headShape.bezierCurveTo(0.40, 2.84, 0.45, 2.69, 0.48, 2.58);
  blade_headShape.closePath();

  const blade_headGeom = new THREE.ExtrudeGeometry(blade_headShape, {
    depth: 0.34,
    steps: 1,
    curveSegments: 20,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.045,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  blade_headGeom.translate(0, 0, -0.17);

  const blade_head = new THREE.Mesh(blade_headGeom, blue_plasticMat);
  root.add(blade_head);

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