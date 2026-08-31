export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gear_ring";

  const toothCount = 12;
  const outerRadius = 1.0;
  const rootRadius = 0.79;
  const boreRadius = 0.455;
  const thickness = 0.28;
  const bevelThickness = 0.035;

  const gear_ringMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const bore_lipMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const gear_ringShape = new THREE.Shape();
  const pitch = Math.PI * 2 / toothCount;
  const offsets = [-0.50, -0.36, -0.25, -0.14, 0.14, 0.25, 0.36];
  const radii = [
    rootRadius,
    rootRadius,
    rootRadius,
    outerRadius,
    outerRadius,
    outerRadius,
    rootRadius
  ];

  let firstPoint = true;
  for (let tooth = 0; tooth < toothCount; tooth++) {
    const centerAngle = Math.PI / 2 + tooth * pitch;
    for (let point = 0; point < offsets.length; point++) {
      const angle = centerAngle + offsets[point] * pitch;
      const radius = radii[point];
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (firstPoint) {
        gear_ringShape.moveTo(x, y);
        firstPoint = false;
      } else {
        gear_ringShape.lineTo(x, y);
      }
    }
  }
  gear_ringShape.closePath();

  const borePath = new THREE.Path();
  borePath.moveTo(boreRadius, 0);
  borePath.absarc(0, 0, boreRadius, 0, Math.PI * 2, true);
  gear_ringShape.holes.push(borePath);

  const gear_ringGeom = new THREE.ExtrudeGeometry(gear_ringShape, {
    depth: thickness,
    steps: 1,
    curveSegments: 48,
    bevelEnabled: true,
    bevelThickness: bevelThickness,
    bevelSize: 0.035,
    bevelSegments: 3
  });
  gear_ringGeom.translate(0, 0, -thickness / 2);
  gear_ringGeom.rotateX(-Math.PI / 2);

  const gear_ring = new THREE.Mesh(gear_ringGeom, gear_ringMat);
  gear_ring.name = "gear_ring";
  root.add(gear_ring);

  const bore_lipGeom = new THREE.TorusGeometry(
    boreRadius + 0.018,
    0.018,
    12,
    64
  );
  const bore_lip = new THREE.Mesh(bore_lipGeom, bore_lipMat);
  bore_lip.name = "bore_lip";
  bore_lip.rotation.x = Math.PI / 2;
  bore_lip.position.y = thickness / 2 + bevelThickness - 0.004;
  root.add(bore_lip);

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

  fitToUnitCube(root);
  return root;
}