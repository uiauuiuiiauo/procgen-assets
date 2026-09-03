export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "modern_plastic_stool";

  const white_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ee,
    metalness: 0.0,
    roughness: 0.3,
  });

  const seatW = 1.04;
  const seatD = 1.04;
  const seatH = 0.98;
  const seatThickness = 0.075;
  const legH = 0.84;
  const legOffset = 0.36;
  const lowerRailY = 0.14;

  function createRoundedSlabGeometry(width, depth, thickness, radius, bevelSize, bevelThickness) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -thickness / 2);
    return geometry;
  }

  const seatGeom = createRoundedSlabGeometry(
    seatW,
    seatD,
    seatThickness,
    0.115,
    0.025,
    0.018
  );
  const seat = new THREE.Mesh(seatGeom, white_plasticMat);
  seat.name = "seat";
  seat.rotation.x = -Math.PI / 2;
  seat.position.y = seatH;
  root.add(seat);

  const seat_undersideGeom = createRoundedSlabGeometry(
    0.88,
    0.88,
    0.035,
    0.105,
    0.014,
    0.01
  );
  const seat_underside = new THREE.Mesh(seat_undersideGeom, white_plasticMat);
  seat_underside.name = "seat_underside";
  seat_underside.rotation.x = -Math.PI / 2;
  seat_underside.position.y = 0.91;
  root.add(seat_underside);

  const legShape = new THREE.Shape();
  legShape.moveTo(-0.05, 0.025);
  legShape.quadraticCurveTo(-0.05, 0.002, -0.027, 0.002);
  legShape.lineTo(0.027, 0.002);
  legShape.quadraticCurveTo(0.05, 0.002, 0.05, 0.025);
  legShape.lineTo(0.05, 0.69);
  legShape.bezierCurveTo(
    0.05, 0.77,
    0.075, 0.835,
    0.13,
    legH
  );
  legShape.lineTo(-0.13, legH);
  legShape.bezierCurveTo(
    -0.075, 0.835,
    -0.05, 0.77,
    -0.05, 0.69
  );
  legShape.closePath();

  const legDepth = 0.11;
  const legsGeom = new THREE.ExtrudeGeometry(legShape, {
    depth: legDepth,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.008,
    bevelThickness: 0.008,
  });
  legsGeom.translate(0, 0, -legDepth / 2);

  const legs = new THREE.InstancedMesh(legsGeom, white_plasticMat, 4);
  legs.name = "legs";

  const leg_positions = [
    [-legOffset, 0,  legOffset],
    [ legOffset, 0,  legOffset],
    [-legOffset, 0, -legOffset],
    [ legOffset, 0, -legOffset],
  ];
  const leg_rotations = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
  const leg_transform = new THREE.Object3D();

  for (let i = 0; i < 4; i++) {
    leg_transform.position.set(
      leg_positions[i][0],
      leg_positions[i][1],
      leg_positions[i][2]
    );
    leg_transform.rotation.set(0, leg_rotations[i], 0);
    leg_transform.scale.set(1, 1, 1);
    leg_transform.updateMatrix();
    legs.setMatrixAt(i, leg_transform.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const upperRailPoints = [
    new THREE.Vector3(-0.415, 0.845, 0),
    new THREE.Vector3(-0.35, 0.87, 0),
    new THREE.Vector3(-0.18, 0.895, 0),
    new THREE.Vector3(0, 0.905, 0),
    new THREE.Vector3(0.18, 0.895, 0),
    new THREE.Vector3(0.35, 0.87, 0),
    new THREE.Vector3(0.415, 0.845, 0),
  ];
  const upper_frame_railsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(upperRailPoints, false, "centripetal"),
    32,
    0.028,
    8,
    false
  );
  const upper_frame_rails = new THREE.InstancedMesh(
    upper_frame_railsGeom,
    white_plasticMat,
    4
  );
  upper_frame_rails.name = "upper_frame_rails";

  const upper_rail_transforms = [
    [0, 0, legOffset, 0],
    [0, 0, -legOffset, 0],
    [legOffset, 0, 0, Math.PI / 2],
    [-legOffset, 0, 0, Math.PI / 2],
  ];
  const rail_transform = new THREE.Object3D();

  for (let i = 0; i < 4; i++) {
    const transform = upper_rail_transforms[i];
    rail_transform.position.set(transform[0], transform[1], transform[2]);
    rail_transform.rotation.set(0, transform[3], 0);
    rail_transform.scale.set(1, 1, 1);
    rail_transform.updateMatrix();
    upper_frame_rails.setMatrixAt(i, rail_transform.matrix);
  }
  upper_frame_rails.instanceMatrix.needsUpdate = true;
  root.add(upper_frame_rails);

  const lowerRailPoints = [
    new THREE.Vector3(-0.41, lowerRailY, 0),
    new THREE.Vector3(-0.32, 0.155, 0),
    new THREE.Vector3(-0.16, 0.18, 0),
    new THREE.Vector3(0, 0.195, 0),
    new THREE.Vector3(0.16, 0.18, 0),
    new THREE.Vector3(0.32, 0.155, 0),
    new THREE.Vector3(0.41, lowerRailY, 0),
  ];
  const lower_frame_railsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(lowerRailPoints, false, "centripetal"),
    32,
    0.024,
    8,
    false
  );
  const lower_frame_rails = new THREE.InstancedMesh(
    lower_frame_railsGeom,
    white_plasticMat,
    4
  );
  lower_frame_rails.name = "lower_frame_rails";

  const lower_rail_transforms = [
    [0, 0, legOffset, 0],
    [0, 0, -legOffset, 0],
    [legOffset, 0, 0, Math.PI / 2],
    [-legOffset, 0, 0, Math.PI / 2],
  ];

  for (let i = 0; i < 4; i++) {
    const transform = lower_rail_transforms[i];
    rail_transform.position.set(transform[0], transform[1], transform[2]);
    rail_transform.rotation.set(0, transform[3], 0);
    rail_transform.scale.set(1, 1, 1);
    rail_transform.updateMatrix();
    lower_frame_rails.setMatrixAt(i, rail_transform.matrix);
  }
  lower_frame_rails.instanceMatrix.needsUpdate = true;
  root.add(lower_frame_rails);

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