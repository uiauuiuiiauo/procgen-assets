export default function generate(THREE) {
  const root = new THREE.Group();

  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x9a6a43,
    metalness: 0.6,
    roughness: 0.5,
  });
  const bladeMat = new THREE.MeshStandardMaterial({
    color: 0x795238,
    metalness: 0.6,
    roughness: 0.5,
  });
  const cutting_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2,
  });
  const blade_spineMat = new THREE.MeshStandardMaterial({
    color: 0x60422f,
    metalness: 0.6,
    roughness: 0.5,
  });
  const maker_markMat = new THREE.MeshStandardMaterial({
    color: 0x38271f,
    metalness: 0.0,
    roughness: 0.8,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x493428,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-2.72, -0.25);
  handleShape.lineTo(-0.25, -0.25);
  handleShape.bezierCurveTo(0.05, -0.25, 0.24, -0.19, 0.24, -0.10);
  handleShape.lineTo(0.24, 0.10);
  handleShape.bezierCurveTo(0.24, 0.19, 0.05, 0.25, -0.25, 0.25);
  handleShape.lineTo(-2.72, 0.25);
  handleShape.bezierCurveTo(-2.88, 0.25, -2.98, 0.14, -2.98, 0.00);
  handleShape.bezierCurveTo(-2.98, -0.14, -2.88, -0.25, -2.72, -0.25);

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.position.z = -0.05;
  root.add(handle);

  const bladeShape = new THREE.Shape();
  bladeShape.moveTo(-0.15, -0.17);
  bladeShape.lineTo(2.78, -0.24);
  bladeShape.bezierCurveTo(3.02, -0.24, 3.18, -0.13, 3.18, 0.00);
  bladeShape.bezierCurveTo(3.18, 0.13, 3.02, 0.24, 2.78, 0.24);
  bladeShape.lineTo(-0.15, 0.17);
  bladeShape.bezierCurveTo(-0.23, 0.11, -0.23, -0.11, -0.15, -0.17);

  const bladeGeom = new THREE.ExtrudeGeometry(bladeShape, {
    depth: 0.075,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.018,
    bevelSegments: 3,
    curveSegments: 16,
  });
  const blade = new THREE.Mesh(bladeGeom, bladeMat);
  blade.position.z = -0.0375;
  root.add(blade);

  const cutting_edgeShape = new THREE.Shape();
  cutting_edgeShape.moveTo(-0.05, -0.17);
  cutting_edgeShape.lineTo(2.78, -0.24);
  cutting_edgeShape.bezierCurveTo(3.02, -0.24, 3.17, -0.13, 3.17, -0.02);
  cutting_edgeShape.lineTo(2.98, -0.025);
  cutting_edgeShape.lineTo(0.02, 0.045);
  cutting_edgeShape.bezierCurveTo(-0.02, 0.02, -0.04, -0.08, -0.05, -0.17);

  const cutting_edgeGeom = new THREE.ExtrudeGeometry(cutting_edgeShape, {
    depth: 0.006,
    steps: 1,
    bevelEnabled: false,
    curveSegments: 12,
  });
  const cutting_edge = new THREE.Mesh(cutting_edgeGeom, cutting_edgeMat);
  cutting_edge.position.z = 0.051;
  root.add(cutting_edge);

  const blade_spineShape = new THREE.Shape();
  blade_spineShape.moveTo(-0.02, 0.125);
  blade_spineShape.lineTo(2.76, 0.18);
  blade_spineShape.lineTo(2.76, 0.215);
  blade_spineShape.lineTo(-0.02, 0.16);
  blade_spineShape.closePath();

  const blade_spineGeom = new THREE.ExtrudeGeometry(blade_spineShape, {
    depth: 0.004,
    steps: 1,
    bevelEnabled: false,
  });
  const blade_spine = new THREE.Mesh(blade_spineGeom, blade_spineMat);
  blade_spine.position.z = 0.050;
  root.add(blade_spine);

  const maker_mark = new THREE.Group();
  maker_mark.position.set(-1.55, 0, 0.073);

  const letter_oGeom = new THREE.TorusGeometry(0.043, 0.006, 6, 20);
  const letter_o = new THREE.Mesh(letter_oGeom, maker_markMat);
  letter_o.position.x = 0.00;
  maker_mark.add(letter_o);

  const letter_mStrokeGeom = new THREE.BoxGeometry(0.010, 0.086, 0.006);
  const letter_m_left = new THREE.Mesh(letter_mStrokeGeom, maker_markMat);
  letter_m_left.position.set(0.105, 0, 0);
  maker_mark.add(letter_m_left);

  const letter_m_right = new THREE.Mesh(letter_mStrokeGeom, maker_markMat);
  letter_m_right.position.set(0.175, 0, 0);
  maker_mark.add(letter_m_right);

  const letter_mInnerGeom = new THREE.BoxGeometry(0.010, 0.058, 0.006);
  const letter_m_inner_left = new THREE.Mesh(letter_mInnerGeom, maker_markMat);
  letter_m_inner_left.position.set(0.126, 0.014, 0);
  letter_m_inner_left.rotation.z = -0.55;
  maker_mark.add(letter_m_inner_left);

  const letter_m_inner_right = new THREE.Mesh(letter_mInnerGeom, maker_markMat);
  letter_m_inner_right.position.set(0.154, 0.014, 0);
  letter_m_inner_right.rotation.z = 0.55;
  maker_mark.add(letter_m_inner_right);

  const letter_aStrokeGeom = new THREE.BoxGeometry(0.010, 0.090, 0.006);
  const letter_a_left = new THREE.Mesh(letter_aStrokeGeom, maker_markMat);
  letter_a_left.position.set(0.255, 0, 0);
  letter_a_left.rotation.z = -0.27;
  maker_mark.add(letter_a_left);

  const letter_a_right = new THREE.Mesh(letter_aStrokeGeom, maker_markMat);
  letter_a_right.position.set(0.315, 0, 0);
  letter_a_right.rotation.z = 0.27;
  maker_mark.add(letter_a_right);

  const letter_aCrossGeom = new THREE.BoxGeometry(0.052, 0.009, 0.006);
  const letter_a_cross = new THREE.Mesh(letter_aCrossGeom, maker_markMat);
  letter_a_cross.position.set(0.285, -0.006, 0);
  maker_mark.add(letter_a_cross);

  root.add(maker_mark);

  const patina_spotGeom = new THREE.CircleGeometry(0.022, 12);
  const spotData = [
    [-2.58, 0.08, 1.25, 0.55],
    [-2.18, -0.10, 0.70, 0.42],
    [-1.08, 0.13, 0.90, 0.38],
    [-0.56, -0.11, 0.55, 0.35],
    [0.42, -0.10, 0.72, 0.42],
    [1.03, 0.09, 1.10, 0.36],
    [1.70, -0.08, 0.62, 0.34],
    [2.32, 0.10, 0.85, 0.30],
  ];
  const patina_spots = new THREE.InstancedMesh(
    patina_spotGeom,
    patinaMat,
    spotData.length
  );
  const spotDummy = new THREE.Object3D();
  for (let i = 0; i < spotData.length; i++) {
    const data = spotData[i];
    spotDummy.position.set(data[0], data[1], 0.074);
    spotDummy.scale.set(data[2], data[3], 1);
    spotDummy.updateMatrix();
    patina_spots.setMatrixAt(i, spotDummy.matrix);
  }
  patina_spots.instanceMatrix.needsUpdate = true;
  root.add(patina_spots);

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