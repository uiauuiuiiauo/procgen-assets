export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gear_assembly";

  const gearMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const toothCount = 14;
  const outerRadius = 1.0;
  const rootRadius = 0.81;
  const boreRadius = 0.39;
  const gearDepth = 0.26;
  const bevelThickness = 0.025;
  const pitch = Math.PI * 2 / toothCount;
  const toothProfile = [
    [-0.50, rootRadius],
    [-0.38, rootRadius],
    [-0.31, 0.835],
    [-0.255, 0.94],
    [-0.205, 0.985],
    [-0.145, outerRadius],
    [0.145, outerRadius],
    [0.205, 0.985],
    [0.255, 0.94],
    [0.31, 0.835],
    [0.38, rootRadius],
  ];

  const gearShape = new THREE.Shape();
  let firstPoint = true;

  for (let i = 0; i < toothCount; i++) {
    const centerAngle = i * pitch;
    for (let j = 0; j < toothProfile.length; j++) {
      const angle = centerAngle + toothProfile[j][0] * pitch;
      const radius = toothProfile[j][1];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (firstPoint) {
        gearShape.moveTo(x, y);
        firstPoint = false;
      } else {
        gearShape.lineTo(x, y);
      }
    }
  }
  gearShape.closePath();

  const central_hole = new THREE.Path();
  central_hole.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
  gearShape.holes.push(central_hole);

  const gearGeom = new THREE.ExtrudeGeometry(gearShape, {
    depth: gearDepth,
    steps: 1,
    curveSegments: 48,
    bevelEnabled: true,
    bevelThickness,
    bevelSize: 0.022,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  gearGeom.computeVertexNormals();

  const gear = new THREE.Mesh(gearGeom, gearMat);
  gear.name = "gear";
  gear.rotation.x = -Math.PI / 2;
  gear.position.y = -gearDepth / 2;
  root.add(gear);

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