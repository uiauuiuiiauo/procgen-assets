export default function generate(THREE) {
  const root = new THREE.Group();

  const main_plateMat = new THREE.MeshStandardMaterial({
    color: 0xf20a12,
    metalness: 0.0,
    roughness: 0.3
  });

  function createRoundedRectangleShape(width, height, radius) {
    const halfW = width / 2;
    const halfH = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + radius, -halfH);
    shape.lineTo(halfW - radius, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + radius);
    shape.lineTo(halfW, halfH - radius);
    shape.quadraticCurveTo(halfW, halfH, halfW - radius, halfH);
    shape.lineTo(-halfW + radius, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - radius);
    shape.lineTo(-halfW, -halfH + radius);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + radius, -halfH);

    return shape;
  }

  const rear_tabsShape = createRoundedRectangleShape(0.25, 0.34, 0.065);
  const rear_tabsGeom = new THREE.ExtrudeGeometry(rear_tabsShape, {
    depth: 0.10,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.022,
    bevelSize: 0.022,
    bevelSegments: 4
  });
  rear_tabsGeom.center();

  const rear_tabs = new THREE.InstancedMesh(rear_tabsGeom, main_plateMat, 2);
  const rear_tab_transform = new THREE.Object3D();

  rear_tab_transform.position.set(-0.48, 0.34, -0.105);
  rear_tab_transform.rotation.z = Math.PI / 4;
  rear_tab_transform.updateMatrix();
  rear_tabs.setMatrixAt(0, rear_tab_transform.matrix);

  rear_tab_transform.position.set(0.48, -0.34, -0.105);
  rear_tab_transform.rotation.z = Math.PI / 4;
  rear_tab_transform.updateMatrix();
  rear_tabs.setMatrixAt(1, rear_tab_transform.matrix);

  rear_tabs.instanceMatrix.needsUpdate = true;
  root.add(rear_tabs);

  const main_plateShape = createRoundedRectangleShape(1.16, 1.16, 0.095);
  const main_plateGeom = new THREE.ExtrudeGeometry(main_plateShape, {
    depth: 0.13,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 6
  });
  main_plateGeom.center();

  const main_plate = new THREE.Mesh(main_plateGeom, main_plateMat);
  main_plate.rotation.z = Math.PI / 4;
  root.add(main_plate);

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