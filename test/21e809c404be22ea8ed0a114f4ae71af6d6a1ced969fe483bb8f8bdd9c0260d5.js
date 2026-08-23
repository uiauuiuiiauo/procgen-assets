export default function generate(THREE) {
  const root = new THREE.Group();

  const padW = 1.56;
  const padD = 1.56;
  const cornerR = 0.12;

  function createRoundedRectShape(width, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);

    return shape;
  }

  const blue_baseMat = new THREE.MeshStandardMaterial({
    color: 0x08a8ed,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_baseShape = createRoundedRectShape(padW, padD, cornerR);
  const blue_baseGeom = new THREE.ExtrudeGeometry(blue_baseShape, {
    depth: 0.045,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.011,
    bevelSize: 0.012,
    bevelSegments: 4
  });
  const blue_base = new THREE.Mesh(blue_baseGeom, blue_baseMat);
  blue_base.rotation.x = -Math.PI / 2;
  blue_base.position.y = 0.012;
  root.add(blue_base);

  const black_topMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8
  });
  const black_topShape = createRoundedRectShape(
    padW - 0.025,
    padD - 0.025,
    cornerR - 0.01
  );
  const black_topGeom = new THREE.ExtrudeGeometry(black_topShape, {
    depth: 0.025,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.009,
    bevelSegments: 4
  });
  const black_top = new THREE.Mesh(black_topGeom, black_topMat);
  black_top.rotation.x = -Math.PI / 2;
  black_top.position.y = 0.061;
  root.add(black_top);

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