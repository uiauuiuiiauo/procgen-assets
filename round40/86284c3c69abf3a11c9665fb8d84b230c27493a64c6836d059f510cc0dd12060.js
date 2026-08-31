export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "modern_slab_bench";

  const topMat = new THREE.MeshStandardMaterial({
    color: 0x242424,
    metalness: 0.0,
    roughness: 0.7,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.7,
  });
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0x101010,
    metalness: 0.0,
    roughness: 0.7,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x090909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x080808,
    metalness: 0.0,
    roughness: 0.8,
  });

  const topW = 3.30;
  const topD = 1.22;
  const topH = 0.24;
  const topY = 1.075;
  const supportThickness = 0.18;
  const supportDepth = 1.00;
  const supportH = 0.94;
  const supportX = 1.27;

  function createRoundedBoxGeometry(width, height, depth, radius, bevel) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const topGeom = createRoundedBoxGeometry(topW, topH, topD, 0.075, 0.025);
  const top = new THREE.Mesh(topGeom, topMat);
  top.name = "top";
  top.position.y = topY;
  root.add(top);

  const supportShape = new THREE.Shape();
  supportShape.moveTo(-0.34, -supportH / 2);
  supportShape.lineTo(0.34, -supportH / 2);
  supportShape.lineTo(0.47, supportH / 2);
  supportShape.lineTo(-0.47, supportH / 2);
  supportShape.closePath();

  const supportGeom = new THREE.ExtrudeGeometry(supportShape, {
    depth: supportDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  supportGeom.translate(0, 0, -supportDepth / 2);

  const left_support = new THREE.Mesh(supportGeom, frameMat);
  left_support.name = "left_support";
  left_support.position.set(-supportX, supportH / 2, 0);
  root.add(left_support);

  const right_support = new THREE.Mesh(supportGeom, frameMat);
  right_support.name = "right_support";
  right_support.position.set(supportX, supportH / 2, 0);
  root.add(right_support);

  const underside_panelGeom = createRoundedBoxGeometry(
    topW - 0.18,
    0.055,
    topD - 0.16,
    0.02,
    0.008
  );
  const underside_panel = new THREE.Mesh(underside_panelGeom, innerMat);
  underside_panel.name = "underside_panel";
  underside_panel.position.set(0, 0.925, 0);
  root.add(underside_panel);

  const rear_stretcherGeom = createRoundedBoxGeometry(
    2.38,
    0.34,
    0.12,
    0.025,
    0.01
  );
  const rear_stretcher = new THREE.Mesh(rear_stretcherGeom, innerMat);
  rear_stretcher.name = "rear_stretcher";
  rear_stretcher.position.set(0, 0.70, -0.405);
  root.add(rear_stretcher);

  const front_seamGeom = new THREE.BoxGeometry(topW - 0.12, 0.012, 0.014);
  const front_seam = new THREE.Mesh(front_seamGeom, seamMat);
  front_seam.name = "front_seam";
  front_seam.position.set(0, 0.944, topD / 2 + 0.018);
  root.add(front_seam);

  const side_seamGeom = new THREE.BoxGeometry(0.014, 0.012, topD - 0.12);
  const left_seam = new THREE.Mesh(side_seamGeom, seamMat);
  left_seam.name = "left_seam";
  left_seam.position.set(-topW / 2 - 0.018, 0.944, 0);
  root.add(left_seam);

  const right_seam = new THREE.Mesh(side_seamGeom, seamMat);
  right_seam.name = "right_seam";
  right_seam.position.set(topW / 2 + 0.018, 0.944, 0);
  root.add(right_seam);

  const handle_recessGeom = createRoundedBoxGeometry(
    0.19,
    0.085,
    0.012,
    0.018,
    0.003
  );
  const handle_recess = new THREE.Mesh(handle_recessGeom, rubberMat);
  handle_recess.name = "handle_recess";
  handle_recess.rotation.y = Math.PI / 2;
  handle_recess.position.set(-topW / 2 - 0.025, 1.015, 0.25);
  root.add(handle_recess);

  const footGeom = new THREE.BoxGeometry(0.18, 0.025, 0.12);
  const feet = new THREE.InstancedMesh(footGeom, rubberMat, 4);
  feet.name = "feet";
  const footDummy = new THREE.Object3D();
  const footPositions = [
    [-supportX, 0.0125, 0.37],
    [-supportX, 0.0125, -0.37],
    [supportX, 0.0125, 0.37],
    [supportX, 0.0125, -0.37],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const position = footPositions[i];
    footDummy.position.set(position[0], position[1], position[2]);
    footDummy.updateMatrix();
    feet.setMatrixAt(i, footDummy.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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