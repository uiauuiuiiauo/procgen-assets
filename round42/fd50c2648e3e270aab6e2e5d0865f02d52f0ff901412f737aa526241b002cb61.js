export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "slim_dual_leg_table";

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x484848,
    metalness: 0.0,
    roughness: 0.7,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x151515,
    metalness: 0.35,
    roughness: 0.6,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x252525,
    metalness: 0.35,
    roughness: 0.6,
  });

  const tabletopW = 1.24;
  const tabletopD = 1.0;
  const tabletopH = 0.035;
  const tabletopY = 1.35;
  const cornerR = 0.025;

  const tabletopShape = new THREE.Shape();
  tabletopShape.moveTo(-tabletopW / 2 + cornerR, -tabletopD / 2);
  tabletopShape.lineTo(tabletopW / 2 - cornerR, -tabletopD / 2);
  tabletopShape.quadraticCurveTo(
    tabletopW / 2,
    -tabletopD / 2,
    tabletopW / 2,
    -tabletopD / 2 + cornerR
  );
  tabletopShape.lineTo(tabletopW / 2, tabletopD / 2 - cornerR);
  tabletopShape.quadraticCurveTo(
    tabletopW / 2,
    tabletopD / 2,
    tabletopW / 2 - cornerR,
    tabletopD / 2
  );
  tabletopShape.lineTo(-tabletopW / 2 + cornerR, tabletopD / 2);
  tabletopShape.quadraticCurveTo(
    -tabletopW / 2,
    tabletopD / 2,
    -tabletopW / 2,
    tabletopD / 2 - cornerR
  );
  tabletopShape.lineTo(-tabletopW / 2, -tabletopD / 2 + cornerR);
  tabletopShape.quadraticCurveTo(
    -tabletopW / 2,
    -tabletopD / 2,
    -tabletopW / 2 + cornerR,
    -tabletopD / 2
  );

  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: tabletopH,
    steps: 1,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  tabletopGeom.translate(0, 0, -tabletopH / 2);

  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = -Math.PI / 2;
  tabletop.position.y = tabletopY;
  root.add(tabletop);

  const edgeH = 0.026;
  const edgeY = tabletopY - tabletopH / 2 - edgeH / 2 + 0.002;

  const front_edgeGeom = new THREE.BoxGeometry(tabletopW - 0.025, edgeH, 0.026);
  const front_edge = new THREE.Mesh(front_edgeGeom, edgeMat);
  front_edge.name = "front_edge";
  front_edge.position.set(0, edgeY, tabletopD / 2 - 0.006);
  root.add(front_edge);

  const rear_edgeGeom = front_edgeGeom;
  const rear_edge = new THREE.Mesh(rear_edgeGeom, edgeMat);
  rear_edge.name = "rear_edge";
  rear_edge.position.set(0, edgeY, -tabletopD / 2 + 0.006);
  root.add(rear_edge);

  const side_edgeGeom = new THREE.BoxGeometry(0.026, edgeH, tabletopD - 0.05);
  const left_edge = new THREE.Mesh(side_edgeGeom, edgeMat);
  left_edge.name = "left_edge";
  left_edge.position.set(-tabletopW / 2 + 0.006, edgeY, 0);
  root.add(left_edge);

  const right_edge = new THREE.Mesh(side_edgeGeom, edgeMat);
  right_edge.name = "right_edge";
  right_edge.position.set(tabletopW / 2 - 0.006, edgeY, 0);
  root.add(right_edge);

  const underframeW = 1.13;
  const underframeD = 0.89;
  const underframeH = 0.018;
  const underframeY = tabletopY - tabletopH / 2 - underframeH / 2 - 0.002;

  const underframeGeom = new THREE.BoxGeometry(
    underframeW,
    underframeH,
    underframeD
  );
  const underframe = new THREE.Mesh(underframeGeom, frameMat);
  underframe.name = "underframe";
  underframe.position.y = underframeY;
  root.add(underframe);

  const apronY = 1.292;

  const front_apronGeom = new THREE.BoxGeometry(1.08, 0.045, 0.045);
  const front_apron = new THREE.Mesh(front_apronGeom, frameMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, apronY, 0.43);
  root.add(front_apron);

  const rear_apron = new THREE.Mesh(front_apronGeom, frameMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, apronY, -0.43);
  root.add(rear_apron);

  const side_apronGeom = new THREE.BoxGeometry(0.045, 0.045, 0.82);
  const left_apron = new THREE.Mesh(side_apronGeom, frameMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-0.54, apronY, 0);
  root.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, frameMat);
  right_apron.name = "right_apron";
  right_apron.position.set(0.54, apronY, 0);
  root.add(right_apron);

  const leg_mountsGeom = new THREE.BoxGeometry(0.22, 0.038, 0.13);
  const leg_mounts = new THREE.InstancedMesh(leg_mountsGeom, frameMat, 2);
  leg_mounts.name = "leg_mounts";
  const mountTransform = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    mountTransform.position.set(i === 0 ? -0.14 : 0.14, 1.294, 0);
    mountTransform.updateMatrix();
    leg_mounts.setMatrixAt(i, mountTransform.matrix);
  }
  leg_mounts.instanceMatrix.needsUpdate = true;
  root.add(leg_mounts);

  const legTopY = 1.306;
  const legBottomY = -1.22;
  const legHeight = legTopY - legBottomY;
  const legCenterY = (legTopY + legBottomY) / 2;

  const legGeom = new THREE.CylinderGeometry(
    0.047,
    0.026,
    legHeight,
    24,
    1,
    false
  );

  const left_leg = new THREE.Mesh(legGeom, frameMat);
  left_leg.name = "left_leg";
  left_leg.position.set(-0.14, legCenterY, 0);
  root.add(left_leg);

  const right_leg = new THREE.Mesh(legGeom, frameMat);
  right_leg.name = "right_leg";
  right_leg.position.set(0.14, legCenterY, 0);
  root.add(right_leg);

  const footGeom = new THREE.SphereGeometry(1, 16, 8);

  const left_foot = new THREE.Mesh(footGeom, frameMat);
  left_foot.name = "left_foot";
  left_foot.scale.set(0.026, 0.012, 0.026);
  left_foot.position.set(-0.14, legBottomY, 0);
  root.add(left_foot);

  const right_foot = new THREE.Mesh(footGeom, frameMat);
  right_foot.name = "right_foot";
  right_foot.scale.set(0.026, 0.012, 0.026);
  right_foot.position.set(0.14, legBottomY, 0);
  root.add(right_foot);

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