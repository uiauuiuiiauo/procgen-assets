export default function generate(THREE) {
  const root = new THREE.Group();
  const file_assembly = new THREE.Group();
  root.add(file_assembly);

  const file_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const file_spineMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const file_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const file_bodyShape = new THREE.Shape();
  file_bodyShape.moveTo(-3.45, -0.035);
  file_bodyShape.lineTo(-3.38, 0.055);
  file_bodyShape.lineTo(-1.25, 0.42);
  file_bodyShape.lineTo(3.25, 0.48);
  file_bodyShape.bezierCurveTo(3.38, 0.48, 3.47, 0.39, 3.47, 0.24);
  file_bodyShape.lineTo(3.47, -0.17);
  file_bodyShape.bezierCurveTo(3.47, -0.31, 3.39, -0.39, 3.25, -0.39);
  file_bodyShape.lineTo(-3.45, -0.035);
  file_bodyShape.closePath();

  const file_bodyGeom = new THREE.ExtrudeGeometry(file_bodyShape, {
    depth: 0.24,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 16,
  });
  file_bodyGeom.translate(0, 0, -0.12);

  const file_body = new THREE.Mesh(file_bodyGeom, file_bodyMat);
  file_assembly.add(file_body);

  const file_spineShape = new THREE.Shape();
  file_spineShape.moveTo(-3.40, -0.025);
  file_spineShape.lineTo(-3.34, 0.052);
  file_spineShape.lineTo(-1.25, 0.405);
  file_spineShape.lineTo(3.23, 0.455);
  file_spineShape.bezierCurveTo(3.30, 0.455, 3.34, 0.41, 3.34, 0.35);
  file_spineShape.lineTo(3.34, 0.30);
  file_spineShape.lineTo(-1.25, 0.27);
  file_spineShape.lineTo(-3.38, -0.022);
  file_spineShape.closePath();

  const file_spineGeom = new THREE.ExtrudeGeometry(file_spineShape, {
    depth: 0.27,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 2,
    curveSegments: 12,
  });
  file_spineGeom.translate(0, 0, -0.135);

  const file_spine = new THREE.Mesh(file_spineGeom, file_spineMat);
  file_assembly.add(file_spine);

  const file_grooveGeom = new THREE.BoxGeometry(4.45, 0.026, 0.018);
  const file_groove = new THREE.Mesh(file_grooveGeom, file_grooveMat);
  file_groove.position.set(1.05, 0.278, 0.158);
  file_groove.rotation.z = 0.032;
  file_assembly.add(file_groove);

  const file_groove_back = new THREE.Mesh(file_grooveGeom, file_grooveMat);
  file_groove_back.position.set(1.05, 0.278, -0.158);
  file_groove_back.rotation.z = 0.032;
  file_assembly.add(file_groove_back);

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