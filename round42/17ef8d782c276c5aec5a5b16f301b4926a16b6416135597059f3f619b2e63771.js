export default function generate(THREE) {
  const root = new THREE.Group();

  const base_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x090a0b,
    metalness: 0.0,
    roughness: 0.3,
  });

  const top_lidMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.3,
  });

  const lid_seamMat = new THREE.MeshStandardMaterial({
    color: 0x030404,
    metalness: 0.0,
    roughness: 0.8,
  });

  const top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x151618,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createRoundedRectangleShape(width, depth, radius) {
    const halfW = width / 2;
    const halfD = depth / 2;
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + radius, -halfD);
    shape.lineTo(halfW - radius, -halfD);
    shape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + radius);
    shape.lineTo(halfW, halfD - radius);
    shape.quadraticCurveTo(halfW, halfD, halfW - radius, halfD);
    shape.lineTo(-halfW + radius, halfD);
    shape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - radius);
    shape.lineTo(-halfW, -halfD + radius);
    shape.quadraticCurveTo(-halfW, -halfD, -halfW + radius, -halfD);

    return shape;
  }

  function createRoundedSlabGeometry(
    width,
    depth,
    height,
    radius,
    bevelSize,
    bevelThickness
  ) {
    const shape = createRoundedRectangleShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSegments: 5,
      bevelSize,
      bevelThickness,
    });
    geometry.center();
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  const base_bodyGeom = createRoundedSlabGeometry(
    1.12,
    1.12,
    0.11,
    0.105,
    0.025,
    0.025
  );
  const base_body = new THREE.Mesh(base_bodyGeom, base_bodyMat);
  base_body.position.y = -0.005;
  root.add(base_body);

  const lid_seamGeom = createRoundedSlabGeometry(
    1.105,
    1.105,
    0.012,
    0.092,
    0.008,
    0.004
  );
  const lid_seam = new THREE.Mesh(lid_seamGeom, lid_seamMat);
  lid_seam.position.y = 0.064;
  root.add(lid_seam);

  const top_lidGeom = createRoundedSlabGeometry(
    1.075,
    1.075,
    0.035,
    0.088,
    0.018,
    0.012
  );
  const top_lid = new THREE.Mesh(top_lidGeom, top_lidMat);
  top_lid.position.y = 0.09;
  root.add(top_lid);

  const top_surfaceGeom = createRoundedSlabGeometry(
    1.025,
    1.025,
    0.006,
    0.075,
    0.008,
    0.003
  );
  const top_surface = new THREE.Mesh(top_surfaceGeom, top_surfaceMat);
  top_surface.position.y = 0.124;
  root.add(top_surface);

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