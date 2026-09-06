export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "bamboo_bed_frame";

  const outer_frame = new THREE.Group();
  outer_frame.name = "outer_frame";
  const slat_system = new THREE.Group();
  slat_system.name = "slat_system";
  const leg_system = new THREE.Group();
  leg_system.name = "leg_system";
  const bamboo_details = new THREE.Group();
  bamboo_details.name = "bamboo_nodes";
  root.add(outer_frame, slat_system, leg_system, bamboo_details);

  const bambooMat = new THREE.MeshStandardMaterial({
    color: 0xc99350,
    metalness: 0.0,
    roughness: 0.6
  });
  const bambooLightMat = new THREE.MeshStandardMaterial({
    color: 0xd8a65e,
    metalness: 0.0,
    roughness: 0.6
  });
  const bambooLegMat = new THREE.MeshStandardMaterial({
    color: 0xa96f36,
    metalness: 0.0,
    roughness: 0.6
  });
  const bambooNodeMat = new THREE.MeshStandardMaterial({
    color: 0x79502f,
    metalness: 0.0,
    roughness: 0.6
  });

  const frameW = 2.8;
  const frameD = 2.0;
  const railR = 0.09;
  const railY = 0.62;
  const halfW = frameW / 2;
  const halfD = frameD / 2;

  const long_frame_railGeom = new THREE.CylinderGeometry(
    railR, railR, frameW, 24
  );
  const front_frame_rail = new THREE.Mesh(long_frame_railGeom, bambooMat);
  front_frame_rail.name = "front_frame_rail";
  front_frame_rail.rotation.z = Math.PI / 2;
  front_frame_rail.position.set(0, railY, halfD);
  outer_frame.add(front_frame_rail);

  const rear_frame_rail = new THREE.Mesh(long_frame_railGeom, bambooMat);
  rear_frame_rail.name = "rear_frame_rail";
  rear_frame_rail.rotation.z = Math.PI / 2;
  rear_frame_rail.position.set(0, railY, -halfD);
  outer_frame.add(rear_frame_rail);

  const side_frame_railGeom = new THREE.CylinderGeometry(
    railR, railR, frameD, 24
  );
  const left_frame_rail = new THREE.Mesh(side_frame_railGeom, bambooMat);
  left_frame_rail.name = "left_frame_rail";
  left_frame_rail.rotation.x = Math.PI / 2;
  left_frame_rail.position.set(-halfW, railY, 0);
  outer_frame.add(left_frame_rail);

  const right_frame_rail = new THREE.Mesh(side_frame_railGeom, bambooMat);
  right_frame_rail.name = "right_frame_rail";
  right_frame_rail.rotation.x = Math.PI / 2;
  right_frame_rail.position.set(halfW, railY, 0);
  outer_frame.add(right_frame_rail);

  const frame_corner_jointsGeom = new THREE.SphereGeometry(railR, 20, 12);
  const frame_corner_joints = new THREE.InstancedMesh(
    frame_corner_jointsGeom,
    bambooMat,
    4
  );
  frame_corner_joints.name = "frame_corner_joints";
  const cornerDummy = new THREE.Object3D();
  const cornerPositions = [
    [-halfW, railY, -halfD],
    [halfW, railY, -halfD],
    [-halfW, railY, halfD],
    [halfW, railY, halfD]
  ];
  for (let i = 0; i < cornerPositions.length; i++) {
    const p = cornerPositions[i];
    cornerDummy.position.set(p[0], p[1], p[2]);
    cornerDummy.rotation.set(0, 0, 0);
    cornerDummy.scale.set(1, 1, 1);
    cornerDummy.updateMatrix();
    frame_corner_joints.setMatrixAt(i, cornerDummy.matrix);
  }
  frame_corner_joints.instanceMatrix.needsUpdate = true;
  outer_frame.add(frame_corner_joints);

  const center_support_beamGeom = new THREE.CylinderGeometry(
    0.055, 0.055, frameD - 0.12, 20
  );
  const center_support_beam = new THREE.Mesh(
    center_support_beamGeom,
    bambooMat
  );
  center_support_beam.name = "center_support_beam";
  center_support_beam.rotation.x = Math.PI / 2;
  center_support_beam.position.set(0, 0.535, 0);
  slat_system.add(center_support_beam);

  const slatCount = 15;
  const slatR = 0.041;
  const slatLength = frameD - slatR * 2;
  const bed_slatsGeom = new THREE.CylinderGeometry(
    slatR, slatR, slatLength, 18
  );
  const bed_slats = new THREE.InstancedMesh(
    bed_slatsGeom,
    bambooLightMat,
    slatCount
  );
  bed_slats.name = "bed_slats";
  const slatDummy = new THREE.Object3D();
  const slatMinX = -1.18;
  const slatMaxX = 1.18;
  for (let i = 0; i < slatCount; i++) {
    const t = i / (slatCount - 1);
    const x = slatMinX + (slatMaxX - slatMinX) * t;
    slatDummy.position.set(x, 0.56, 0);
    slatDummy.rotation.set(Math.PI / 2, 0, 0);
    slatDummy.scale.set(1, 1, 1);
    slatDummy.updateMatrix();
    bed_slats.setMatrixAt(i, slatDummy.matrix);
  }
  bed_slats.instanceMatrix.needsUpdate = true;
  slat_system.add(bed_slats);

  const slat_support_blocksGeom = new THREE.BoxGeometry(0.13, 0.05, 0.16);
  const slat_support_blocks = new THREE.InstancedMesh(
    slat_support_blocksGeom,
    bambooMat,
    slatCount
  );
  slat_support_blocks.name = "slat_support_blocks";
  const blockDummy = new THREE.Object3D();
  for (let i = 0; i < slatCount; i++) {
    const t = i / (slatCount - 1);
    const x = slatMinX + (slatMaxX - slatMinX) * t;
    blockDummy.position.set(x, 0.505, 0);
    blockDummy.rotation.set(0, 0, 0);
    blockDummy.scale.set(1, 1, 1);
    blockDummy.updateMatrix();
    slat_support_blocks.setMatrixAt(i, blockDummy.matrix);
  }
  slat_support_blocks.instanceMatrix.needsUpdate = true;
  slat_system.add(slat_support_blocks);

  const legShape = new THREE.Shape();
  legShape.moveTo(-0.075, 0.59);
  legShape.bezierCurveTo(-0.085, 0.48, -0.055, 0.33, -0.025, 0.20);
  legShape.bezierCurveTo(-0.005, 0.12, -0.055, 0.045, -0.025, 0.015);
  legShape.bezierCurveTo(0.005, -0.012, 0.09, -0.005, 0.115, 0.035);
  legShape.bezierCurveTo(0.14, 0.08, 0.055, 0.16, 0.055, 0.24);
  legShape.bezierCurveTo(0.05, 0.36, 0.13, 0.48, 0.075, 0.59);
  legShape.closePath();

  const legDepth = 0.17;
  const legsGeom = new THREE.ExtrudeGeometry(legShape, {
    depth: legDepth,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3
  });
  legsGeom.translate(0, 0, -legDepth / 2);

  const legs = new THREE.InstancedMesh(legsGeom, bambooLegMat, 4);
  legs.name = "curved_legs";
  const legDummy = new THREE.Object3D();
  const legTransforms = [
    [-halfW + 0.04, 0, halfD - 0.04, 0],
    [halfW - 0.04, 0, halfD - 0.04, Math.PI / 2],
    [-halfW + 0.04, 0, -halfD + 0.04, Math.PI],
    [halfW - 0.04, 0, -halfD + 0.04, -Math.PI / 2]
  ];
  for (let i = 0; i < legTransforms.length; i++) {
    const transform = legTransforms[i];
    legDummy.position.set(transform[0], transform[1], transform[2]);
    legDummy.rotation.set(0, transform[3], 0);
    legDummy.scale.set(1, 1, 1);
    legDummy.updateMatrix();
    legs.setMatrixAt(i, legDummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  leg_system.add(legs);

  const long_rail_node_ringsGeom = new THREE.TorusGeometry(
    railR + 0.001,
    0.006,
    6,
    24
  );
  const longRailNodeX = [-0.94, -0.32, 0.34, 0.96];
  const long_rail_node_rings = new THREE.InstancedMesh(
    long_rail_node_ringsGeom,
    bambooNodeMat,
    longRailNodeX.length * 2
  );
  long_rail_node_rings.name = "long_rail_node_rings";
  const nodeDummy = new THREE.Object3D();
  let nodeIndex = 0;
  for (const z of [-halfD, halfD]) {
    for (let i = 0; i < longRailNodeX.length; i++) {
      nodeDummy.position.set(longRailNodeX[i], railY, z);
      nodeDummy.rotation.set(0, Math.PI / 2, 0);
      nodeDummy.scale.set(1, 1, 1);
      nodeDummy.updateMatrix();
      long_rail_node_rings.setMatrixAt(nodeIndex++, nodeDummy.matrix);
    }
  }
  long_rail_node_rings.instanceMatrix.needsUpdate = true;
  bamboo_details.add(long_rail_node_rings);

  const side_rail_node_ringsGeom = new THREE.TorusGeometry(
    railR + 0.001,
    0.006,
    6,
    24
  );
  const sideRailNodeZ = [-0.56, 0, 0.56];
  const side_rail_node_rings = new THREE.InstancedMesh(
    side_rail_node_ringsGeom,
    bambooNodeMat,
    sideRailNodeZ.length * 2
  );
  side_rail_node_rings.name = "side_rail_node_rings";
  nodeIndex = 0;
  for (const x of [-halfW, halfW]) {
    for (let i = 0; i < sideRailNodeZ.length; i++) {
      nodeDummy.position.set(x, railY, sideRailNodeZ[i]);
      nodeDummy.rotation.set(0, 0, 0);
      nodeDummy.scale.set(1, 1, 1);
      nodeDummy.updateMatrix();
      side_rail_node_rings.setMatrixAt(nodeIndex++, nodeDummy.matrix);
    }
  }
  side_rail_node_rings.instanceMatrix.needsUpdate = true;
  bamboo_details.add(side_rail_node_rings);

  const bed_slat_node_ringsGeom = new THREE.TorusGeometry(
    slatR + 0.001,
    0.004,
    6,
    20
  );
  const bed_slat_node_rings = new THREE.InstancedMesh(
    bed_slat_node_ringsGeom,
    bambooNodeMat,
    slatCount * 2
  );
  bed_slat_node_rings.name = "bed_slat_node_rings";
  nodeIndex = 0;
  for (let i = 0; i < slatCount; i++) {
    const t = i / (slatCount - 1);
    const x = slatMinX + (slatMaxX - slatMinX) * t;
    const z1 = -0.58 + (i % 4) * 0.09;
    const z2 = 0.34 + (i % 3) * 0.11;
    for (const z of [z1, z2]) {
      nodeDummy.position.set(x, 0.56, z);
      nodeDummy.rotation.set(0, 0, 0);
      nodeDummy.scale.set(1, 1, 1);
      nodeDummy.updateMatrix();
      bed_slat_node_rings.setMatrixAt(nodeIndex++, nodeDummy.matrix);
    }
  }
  bed_slat_node_rings.instanceMatrix.needsUpdate = true;
  bamboo_details.add(bed_slat_node_rings);

  const center_support_node_ringsGeom = new THREE.TorusGeometry(
    0.056,
    0.005,
    6,
    22
  );
  const center_support_node_rings = new THREE.InstancedMesh(
    center_support_node_ringsGeom,
    bambooNodeMat,
    3
  );
  center_support_node_rings.name = "center_support_node_rings";
  const centerNodeZ = [-0.58, 0.02, 0.61];
  for (let i = 0; i < centerNodeZ.length; i++) {
    nodeDummy.position.set(0, 0.535, centerNodeZ[i]);
    nodeDummy.rotation.set(0, 0, 0);
    nodeDummy.scale.set(1, 1, 1);
    nodeDummy.updateMatrix();
    center_support_node_rings.setMatrixAt(i, nodeDummy.matrix);
  }
  center_support_node_rings.instanceMatrix.needsUpdate = true;
  bamboo_details.add(center_support_node_rings);

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