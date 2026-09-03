export default function generate(THREE) {
  const root = new THREE.Group();
  const clasp_group = new THREE.Group();
  clasp_group.rotation.z = Math.PI / 4;
  root.add(clasp_group);

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf0000c,
    metalness: 0.0,
    roughness: 0.3,
  });

  function makeRoundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();

    return shape;
  }

  const rear_hinge_tabsShape = makeRoundedRectShape(0.32, 0.46, 0.085);
  const rear_hinge_tabsGeom = new THREE.ExtrudeGeometry(
    rear_hinge_tabsShape,
    {
      depth: 0.13,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 4,
      curveSegments: 10,
    }
  );
  rear_hinge_tabsGeom.translate(0, 0, -0.065);

  const rear_hinge_tabs = new THREE.InstancedMesh(
    rear_hinge_tabsGeom,
    main_bodyMat,
    2
  );
  const tab_transform = new THREE.Object3D();
  const tab_positions = [-0.96, 0.96];
  for (let i = 0; i < tab_positions.length; i++) {
    tab_transform.position.set(0, tab_positions[i], -0.12);
    tab_transform.updateMatrix();
    rear_hinge_tabs.setMatrixAt(i, tab_transform.matrix);
  }
  rear_hinge_tabs.instanceMatrix.needsUpdate = true;
  clasp_group.add(rear_hinge_tabs);

  const main_bodyShape = makeRoundedRectShape(1.62, 1.62, 0.14);
  const main_bodyGeom = new THREE.ExtrudeGeometry(main_bodyShape, {
    depth: 0.18,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.055,
    bevelSegments: 6,
    curveSegments: 14,
  });
  main_bodyGeom.translate(0, 0, -0.09);

  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.position.z = 0.06;
  clasp_group.add(main_body);

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