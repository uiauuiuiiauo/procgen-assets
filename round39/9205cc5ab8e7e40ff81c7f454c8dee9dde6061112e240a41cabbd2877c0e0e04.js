export default function generate(THREE) {
  const root = new THREE.Group();

  const topW = 3.4;
  const topD = 1.65;
  const topT = 0.075;
  const topY = 1.365;

  const baseW = 1.35;
  const baseD = 1.32;
  const baseT = 0.045;
  const baseY = 0.03;

  const pedestalH = 1.26;
  const pedestalD = 1.18;
  const pedestalFrontT = 0.055;
  const pedestalRearT = 0.085;
  const pedestalZ = -0.02;

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });

  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const base_plateMat = tabletopMat;

  const mounting_plinthMat = tabletopMat;

  const pedestal_frontMat = tabletopMat;

  const pedestal_rearMat = tabletopMat;

  const halfW = topW / 2;
  const halfD = topD / 2;
  const cornerR = 0.035;

  const tabletopShape = new THREE.Shape();
  tabletopShape.moveTo(-halfW + cornerR, -halfD);
  tabletopShape.lineTo(halfW - cornerR, -halfD);
  tabletopShape.quadraticCurveTo(halfW, -halfD, halfW, -halfD + cornerR);
  tabletopShape.lineTo(halfW, halfD - cornerR);
  tabletopShape.quadraticCurveTo(halfW, halfD, halfW - cornerR, halfD);
  tabletopShape.lineTo(-halfW + cornerR, halfD);
  tabletopShape.quadraticCurveTo(-halfW, halfD, -halfW, halfD - cornerR);
  tabletopShape.lineTo(-halfW, -halfD + cornerR);
  tabletopShape.quadraticCurveTo(-halfW, -halfD, -halfW + cornerR, -halfD);

  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: topT,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.015,
    bevelSegments: 2
  });
  tabletopGeom.translate(0, 0, -topT / 2);

  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.rotation.x = Math.PI / 2;
  tabletop.position.y = topY;
  root.add(tabletop);

  const long_edgeGeom = new THREE.BoxGeometry(topW - 0.08, 0.048, 0.022);

  const front_edge = new THREE.Mesh(long_edgeGeom, edgeMat);
  front_edge.position.set(0, topY - 0.007, halfD + 0.004);
  root.add(front_edge);

  const rear_edge = new THREE.Mesh(long_edgeGeom, edgeMat);
  rear_edge.position.set(0, topY - 0.007, -halfD - 0.004);
  root.add(rear_edge);

  const side_edgeGeom = new THREE.BoxGeometry(0.022, 0.048, topD - 0.08);

  const left_edge = new THREE.Mesh(side_edgeGeom, edgeMat);
  left_edge.position.set(-halfW - 0.004, topY - 0.007, 0);
  root.add(left_edge);

  const right_edge = new THREE.Mesh(side_edgeGeom, edgeMat);
  right_edge.position.set(halfW + 0.004, topY - 0.007, 0);
  root.add(right_edge);

  const base_plateGeom = new THREE.BoxGeometry(baseW, baseT, baseD);
  const base_plate = new THREE.Mesh(base_plateGeom, base_plateMat);
  base_plate.position.set(0, baseY, 0);
  root.add(base_plate);

  const mounting_plinthGeom = new THREE.BoxGeometry(0.24, 0.075, 0.34);
  const mounting_plinth = new THREE.Mesh(mounting_plinthGeom, mounting_plinthMat);
  mounting_plinth.position.set(0, baseY + baseT / 2 + 0.0375, pedestalZ);
  root.add(mounting_plinth);

  const pedestalShape = new THREE.Shape();
  pedestalShape.moveTo(-pedestalD / 2, 0);
  pedestalShape.lineTo(pedestalD / 2, 0);
  pedestalShape.lineTo(pedestalD / 2, pedestalH);
  pedestalShape.lineTo(-pedestalD / 2, pedestalH);
  pedestalShape.closePath();

  const pedestal_rearGeom = new THREE.ExtrudeGeometry(pedestalShape, {
    depth: pedestalRearT,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.006,
    bevelSegments: 1
  });
  pedestal_rearGeom.translate(0, 0, -pedestalRearT / 2);

  const pedestal_rear = new THREE.Mesh(pedestal_rearGeom, pedestal_rearMat);
  pedestal_rear.position.set(0, baseY + baseT / 2, pedestalZ - pedestalRearT / 2);
  root.add(pedestal_rear);

  const pedestal_frontGeom = new THREE.BoxGeometry(
    pedestalFrontT,
    pedestalH,
    pedestalD
  );
  const pedestal_front = new THREE.Mesh(pedestal_frontGeom, pedestal_frontMat);
  pedestal_front.position.set(
    pedestalRearT / 2 + pedestalFrontT / 2,
    baseY + baseT / 2 + pedestalH / 2,
    pedestalZ
  );
  root.add(pedestal_front);

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