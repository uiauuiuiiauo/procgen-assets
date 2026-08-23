export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_table";

  const tabletop_assembly = new THREE.Group();
  tabletop_assembly.name = "tabletop_assembly";
  root.add(tabletop_assembly);

  const leg_assembly = new THREE.Group();
  leg_assembly.name = "leg_assembly";
  root.add(leg_assembly);

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0xe2c79e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: 0xd8ba8f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const tabletop_grainMat = new THREE.LineBasicMaterial({
    color: 0xb88e61,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });

  const tabletopW = 1.42;
  const tabletopD = 0.90;
  const tabletopH = 0.105;
  const tabletopY = 0.72;
  const tabletopCornerR = 0.105;
  const tabletopBevel = 0.018;

  function makeRoundedRectangleShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hd = depth / 2;

    shape.moveTo(-hw + radius, -hd);
    shape.lineTo(hw - radius, -hd);
    shape.quadraticCurveTo(hw, -hd, hw, -hd + radius);
    shape.lineTo(hw, hd - radius);
    shape.quadraticCurveTo(hw, hd, hw - radius, hd);
    shape.lineTo(-hw + radius, hd);
    shape.quadraticCurveTo(-hw, hd, -hw, hd - radius);
    shape.lineTo(-hw, -hd + radius);
    shape.quadraticCurveTo(-hw, -hd, -hw + radius, -hd);
    return shape;
  }

  const tabletopShape = makeRoundedRectangleShape(
    tabletopW,
    tabletopD,
    tabletopCornerR
  );
  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: tabletopH,
    steps: 1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: tabletopBevel,
    bevelSize: 0.024,
    bevelSegments: 4,
  });
  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = -Math.PI / 2;
  tabletop.position.y = tabletopY;
  tabletop_assembly.add(tabletop);

  const tabletop_grainPoints = [];
  const grainRows = 25;
  const grainSegments = 48;
  const grainZMin = -tabletopD * 0.425;
  const grainZMax = tabletopD * 0.425;

  for (let row = 0; row < grainRows; row++) {
    const rowT = row / (grainRows - 1);
    const baseZ = grainZMin + (grainZMax - grainZMin) * rowT;
    const phase = row * 0.79;

    for (let segment = 0; segment < grainSegments; segment++) {
      const u0 = segment / grainSegments;
      const u1 = (segment + 1) / grainSegments;
      const x0 = -tabletopW * 0.455 + tabletopW * 0.91 * u0;
      const x1 = -tabletopW * 0.455 + tabletopW * 0.91 * u1;

      const z0 =
        baseZ +
        Math.sin(u0 * Math.PI * 2.15 + phase) * 0.0045 +
        Math.sin(u0 * Math.PI * 7.2 + phase * 0.61) * 0.0018;
      const z1 =
        baseZ +
        Math.sin(u1 * Math.PI * 2.15 + phase) * 0.0045 +
        Math.sin(u1 * Math.PI * 7.2 + phase * 0.61) * 0.0018;

      tabletop_grainPoints.push(
        new THREE.Vector3(x0, 0.847, z0),
        new THREE.Vector3(x1, 0.847, z1)
      );
    }
  }

  const knotCenters = [
    [-0.43, -0.19, 0.070, 0.022],
    [0.15, 0.12, 0.082, 0.025],
    [0.47, -0.08, 0.058, 0.019],
  ];

  for (let knot = 0; knot < knotCenters.length; knot++) {
    const center = knotCenters[knot];

    for (let ring = 0; ring < 2; ring++) {
      const radiusX = center[2] + ring * 0.018;
      const radiusZ = center[3] + ring * 0.006;
      const ringSegments = 30;

      for (let segment = 0; segment < ringSegments; segment++) {
        const a0 = (segment / ringSegments) * Math.PI * 2;
        const a1 = ((segment + 1) / ringSegments) * Math.PI * 2;

        tabletop_grainPoints.push(
          new THREE.Vector3(
            center[0] + Math.cos(a0) * radiusX,
            0.8475,
            center[1] + Math.sin(a0) * radiusZ
          ),
          new THREE.Vector3(
            center[0] + Math.cos(a1) * radiusX,
            0.8475,
            center[1] + Math.sin(a1) * radiusZ
          )
        );
      }
    }
  }

  const tabletop_grainGeom = new THREE.BufferGeometry().setFromPoints(
    tabletop_grainPoints
  );
  const tabletop_grain = new THREE.LineSegments(
    tabletop_grainGeom,
    tabletop_grainMat
  );
  tabletop_grain.name = "tabletop_grain";
  tabletop_assembly.add(tabletop_grain);

  const front_edge_grainPoints = [];
  const edgeSegments = 42;
  const edgeXMin = -tabletopW * 0.43;
  const edgeXMax = tabletopW * 0.43;
  const edgeZ = tabletopD / 2 + 0.025;

  for (let row = 0; row < 3; row++) {
    const baseY = tabletopY + 0.025 + row * 0.027;

    for (let segment = 0; segment < edgeSegments; segment++) {
      const u0 = segment / edgeSegments;
      const u1 = (segment + 1) / edgeSegments;
      const x0 = edgeXMin + (edgeXMax - edgeXMin) * u0;
      const x1 = edgeXMin + (edgeXMax - edgeXMin) * u1;
      const y0 = baseY + Math.sin(u0 * Math.PI * 4 + row) * 0.0015;
      const y1 = baseY + Math.sin(u1 * Math.PI * 4 + row) * 0.0015;

      front_edge_grainPoints.push(
        new THREE.Vector3(x0, y0, edgeZ),
        new THREE.Vector3(x1, y1, edgeZ)
      );
    }
  }

  const front_edge_grainGeom = new THREE.BufferGeometry().setFromPoints(
    front_edge_grainPoints
  );
  const front_edge_grain = new THREE.LineSegments(
    front_edge_grainGeom,
    tabletop_grainMat
  );
  front_edge_grain.name = "front_edge_grain";
  tabletop_assembly.add(front_edge_grain);

  const legTopRadius = 0.064;
  const legBottomRadius = 0.050;
  const legTopY = 0.665;
  const legBottomY = 0.025;
  const legTopX = 0.54;
  const legTopZ = 0.31;
  const legBottomX = 0.62;
  const legBottomZ = 0.38;

  const legLength = Math.sqrt(
    (legTopY - legBottomY) * (legTopY - legBottomY) +
    (legTopX - legBottomX) * (legTopX - legBottomX) +
    (legTopZ - legBottomZ) * (legTopZ - legBottomZ)
  );

  const legGeom = new THREE.CylinderGeometry(
    legTopRadius,
    legBottomRadius,
    legLength,
    24,
    1,
    false
  );

  function poseLeg(mesh, top, bottom) {
    const direction = new THREE.Vector3().subVectors(top, bottom);
    const midpoint = new THREE.Vector3().addVectors(top, bottom).multiplyScalar(0.5);
    mesh.position.copy(midpoint);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
  }

  const front_left_leg = new THREE.Mesh(legGeom, legMat);
  front_left_leg.name = "front_left_leg";
  poseLeg(
    front_left_leg,
    new THREE.Vector3(-legTopX, legTopY, legTopZ),
    new THREE.Vector3(-legBottomX, legBottomY, legBottomZ)
  );
  leg_assembly.add(front_left_leg);

  const front_right_leg = new THREE.Mesh(legGeom, legMat);
  front_right_leg.name = "front_right_leg";
  poseLeg(
    front_right_leg,
    new THREE.Vector3(legTopX, legTopY, legTopZ),
    new THREE.Vector3(legBottomX, legBottomY, legBottomZ)
  );
  leg_assembly.add(front_right_leg);

  const rear_left_leg = new THREE.Mesh(legGeom, legMat);
  rear_left_leg.name = "rear_left_leg";
  poseLeg(
    rear_left_leg,
    new THREE.Vector3(-legTopX, legTopY, -legTopZ),
    new THREE.Vector3(-legBottomX, legBottomY, -legBottomZ)
  );
  leg_assembly.add(rear_left_leg);

  const rear_right_leg = new THREE.Mesh(legGeom, legMat);
  rear_right_leg.name = "rear_right_leg";
  poseLeg(
    rear_right_leg,
    new THREE.Vector3(legTopX, legTopY, -legTopZ),
    new THREE.Vector3(legBottomX, legBottomY, -legBottomZ)
  );
  leg_assembly.add(rear_right_leg);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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