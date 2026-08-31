export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_table";

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0x6f242d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const tabletop_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x57151e,
    metalness: 0.0,
    roughness: 0.6,
  });
  const tabletop_grainMat = new THREE.MeshStandardMaterial({
    color: 0x3d1118,
    metalness: 0.0,
    roughness: 0.6,
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x52151d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const leg_grainMat = new THREE.MeshStandardMaterial({
    color: 0x2e0c11,
    metalness: 0.0,
    roughness: 0.6,
  });

  function makeRoundedRectShape(width, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -depth / 2;
    const y1 = depth / 2;
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

    return shape;
  }

  function makeRoundedRectPath(width, depth, radius, y) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0, Math.PI / 2],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2, Math.PI],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI, Math.PI * 1.5],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5, Math.PI * 2],
    ];

    for (const corner of corners) {
      for (let i = 0; i <= 5; i++) {
        const angle = corner[2] + (corner[3] - corner[2]) * (i / 5);
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
  }

  const tabletopW = 1.60;
  const tabletopD = 1.42;
  const tabletopY = 0.75;
  const tabletopShape = makeRoundedRectShape(tabletopW, tabletopD, 0.13);
  const tabletopGeom = new THREE.ExtrudeGeometry(tabletopShape, {
    depth: 0.08,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 4,
  });
  tabletopGeom.center();

  const tabletop = new THREE.Mesh(
    tabletopGeom,
    [tabletopMat, tabletop_edgeMat]
  );
  tabletop.name = "tabletop";
  tabletop.rotation.x = -Math.PI / 2;
  tabletop.position.y = tabletopY;
  root.add(tabletop);

  const tabletop_edge_trimPath = makeRoundedRectPath(1.58, 1.40, 0.125, 0.752);
  const tabletop_edge_trimGeom = new THREE.TubeGeometry(
    tabletop_edge_trimPath,
    96,
    0.008,
    8,
    true
  );
  const tabletop_edge_trim = new THREE.Mesh(
    tabletop_edge_trimGeom,
    tabletop_edgeMat
  );
  tabletop_edge_trim.name = "tabletop_edge_trim";
  root.add(tabletop_edge_trim);

  const tabletop_grain = new THREE.Group();
  tabletop_grain.name = "tabletop_grain";
  for (let i = 0; i < 14; i++) {
    const zBase = -0.54 + i * (1.08 / 13);
    const points = [];
    for (let j = 0; j <= 7; j++) {
      const x = -0.68 + j * (1.36 / 7);
      const z = zBase + Math.sin(i * 1.37 + j * 1.11) * 0.007;
      points.push(new THREE.Vector3(x, 0.828, z));
    }
    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5),
      28,
      0.0018,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grain_lineGeom, tabletop_grainMat);
    grain_line.name = "tabletop_grain_line_" + i;
    tabletop_grain.add(grain_line);
  }
  root.add(tabletop_grain);

  const tabletop_knotsGeom = new THREE.TorusGeometry(0.035, 0.0022, 5, 24);
  const tabletop_knots = new THREE.InstancedMesh(
    tabletop_knotsGeom,
    tabletop_grainMat,
    3
  );
  tabletop_knots.name = "tabletop_knots";
  const knotTransforms = [
    [-0.42, 0.829, -0.17, 1.55, 0.48, 0.18],
    [0.31, 0.829, 0.22, 1.25, 0.42, -0.24],
    [0.54, 0.829, -0.39, 0.95, 0.36, 0.32],
  ];
  const knotDummy = new THREE.Object3D();
  for (let i = 0; i < knotTransforms.length; i++) {
    const transform = knotTransforms[i];
    knotDummy.position.set(transform[0], transform[1], transform[2]);
    knotDummy.rotation.set(Math.PI / 2, 0, transform[5]);
    knotDummy.scale.set(transform[3], transform[4], 1);
    knotDummy.updateMatrix();
    tabletop_knots.setMatrixAt(i, knotDummy.matrix);
  }
  tabletop_knots.instanceMatrix.needsUpdate = true;
  root.add(tabletop_knots);

  const legTopY = 0.68;
  const legH = 0.68;
  const legBottomY = legTopY - legH;
  const legTopSide = 0.17;
  const legBottomSide = 0.125;
  const legPositions = [
    [-0.66, 0.55],
    [0.66, 0.55],
    [-0.66, -0.55],
    [0.66, -0.55],
  ];

  const legGeom = new THREE.CylinderGeometry(
    legTopSide / Math.sqrt(2),
    legBottomSide / Math.sqrt(2),
    legH,
    4,
    1,
    false
  );
  const legs = new THREE.InstancedMesh(legGeom, legMat, legPositions.length);
  legs.name = "legs";
  const legDummy = new THREE.Object3D();
  for (let i = 0; i < legPositions.length; i++) {
    legDummy.position.set(
      legPositions[i][0],
      legBottomY + legH / 2,
      legPositions[i][1]
    );
    legDummy.rotation.set(0, Math.PI / 4, 0);
    legDummy.scale.set(1, 1, 1);
    legDummy.updateMatrix();
    legs.setMatrixAt(i, legDummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  root.add(legs);

  const leg_grainGeom = new THREE.BoxGeometry(0.006, 0.42, 0.003);
  const leg_grain = new THREE.InstancedMesh(
    leg_grainGeom,
    leg_grainMat,
    legPositions.length * 2
  );
  leg_grain.name = "leg_grain";
  const legGrainDummy = new THREE.Object3D();
  let grainIndex = 0;
  for (let i = 0; i < legPositions.length; i++) {
    for (let j = 0; j < 2; j++) {
      const offset = j === 0 ? -0.026 : 0.027;
      const heightScale = j === 0 ? 1.0 : 0.76;
      const yOffset = j === 0 ? 0.01 : -0.055;
      legGrainDummy.position.set(
        legPositions[i][0] + offset,
        0.32 + yOffset,
        legPositions[i][1] + 0.083
      );
      legGrainDummy.rotation.set(0, 0, 0);
      legGrainDummy.scale.set(1, heightScale, 1);
      legGrainDummy.updateMatrix();
      leg_grain.setMatrixAt(grainIndex, legGrainDummy.matrix);
      grainIndex++;
    }
  }
  leg_grain.instanceMatrix.needsUpdate = true;
  root.add(leg_grain);

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