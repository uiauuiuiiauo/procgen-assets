export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mosaic_stud_earring_pair";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad68,
    metalness: 0.6,
    roughness: 0.2,
  });

  function enamelMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });
  }

  const blueMat = enamelMaterial(0x1677d2);
  const cyanMat = enamelMaterial(0x18b8dc);
  const skyBlueMat = enamelMaterial(0x67c8ee);
  const greenMat = enamelMaterial(0x00a85a);
  const emeraldMat = enamelMaterial(0x087d45);
  const tealMat = enamelMaterial(0x18b99b);
  const pinkMat = enamelMaterial(0xf31a70);
  const redMat = enamelMaterial(0xd90d45);
  const yellowMat = enamelMaterial(0xffd928);
  const orangeMat = enamelMaterial(0xff9918);
  const purpleMat = enamelMaterial(0x5b2293);
  const violetMat = enamelMaterial(0x33239d);
  const peachMat = enamelMaterial(0xd99a70);

  function makePolygonShape(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i].x, points[i].y);
    }
    shape.closePath();
    return shape;
  }

  function makeRoundedShape(points, radius) {
    const shape = new THREE.Shape();
    const entries = [];
    const exits = [];

    for (let i = 0; i < points.length; i++) {
      const previous = points[(i + points.length - 1) % points.length];
      const current = points[i];
      const next = points[(i + 1) % points.length];

      const entry = previous.clone().sub(current).normalize()
        .multiplyScalar(radius).add(current);
      const exit = next.clone().sub(current).normalize()
        .multiplyScalar(radius).add(current);

      entries.push(entry);
      exits.push(exit);
    }

    shape.moveTo(entries[0].x, entries[0].y);
    for (let i = 0; i < points.length; i++) {
      if (i > 0) shape.lineTo(entries[i].x, entries[i].y);
      shape.quadraticCurveTo(
        points[i].x,
        points[i].y,
        exits[i].x,
        exits[i].y
      );
    }
    shape.closePath();
    return shape;
  }

  function addEnamelCell(parent, name, points, material) {
    const cellShape = makePolygonShape(points);
    const cellGeom = new THREE.ExtrudeGeometry(cellShape, {
      depth: 0.018,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.004,
      bevelSegments: 2,
      curveSegments: 4,
    });
    const cell = new THREE.Mesh(cellGeom, material);
    cell.name = name;
    cell.position.z = 0.034;
    parent.add(cell);
    return cell;
  }

  const outerPoints = [
    new THREE.Vector2(-0.22, -0.62),
    new THREE.Vector2(0.22, -0.62),
    new THREE.Vector2(0.39, -0.47),
    new THREE.Vector2(0.46, -0.18),
    new THREE.Vector2(0.44, 0.10),
    new THREE.Vector2(0.34, 0.42),
    new THREE.Vector2(0.18, 0.60),
    new THREE.Vector2(-0.16, 0.61),
    new THREE.Vector2(-0.33, 0.46),
    new THREE.Vector2(-0.43, 0.16),
    new THREE.Vector2(-0.45, -0.16),
    new THREE.Vector2(-0.38, -0.45),
  ];

  const leftPattern = [
    [[-0.16, 0.54], [0.07, 0.51], [0.22, 0.30], [-0.02, 0.05], [-0.18, 0.22]],
    [[0.07, 0.51], [0.25, 0.42], [0.39, 0.10], [0.22, 0.30]],
    [[-0.30, 0.41], [-0.16, 0.54], [-0.18, 0.22], [-0.42, 0.04], [-0.38, -0.08]],
    [[-0.18, 0.22], [-0.02, 0.05], [-0.13, -0.16], [-0.38, -0.08]],
    [[-0.02, 0.05], [0.22, 0.30], [0.39, 0.10], [0.24, -0.12], [-0.13, -0.16]],
    [[0.25, 0.42], [0.33, 0.38], [0.42, 0.16], [0.39, 0.10]],
    [[-0.38, -0.08], [-0.13, -0.16], [-0.23, -0.36], [-0.38, -0.35]],
    [[-0.13, -0.16], [0.24, -0.12], [0.09, -0.42], [-0.23, -0.36]],
    [[0.24, -0.12], [0.39, 0.10], [0.43, -0.08], [0.36, -0.30], [0.09, -0.42]],
    [[-0.38, -0.35], [-0.23, -0.36], [0.09, -0.42], [0.19, -0.56], [-0.18, -0.56]],
    [[0.09, -0.42], [0.36, -0.30], [0.31, -0.47], [0.19, -0.56]],
  ];

  const rightPattern = [
    [[-0.18, 0.51], [0.05, 0.55], [0.20, 0.34], [-0.04, 0.10], [-0.21, 0.28]],
    [[0.05, 0.55], [0.24, 0.50], [0.38, 0.22], [0.20, 0.34]],
    [[-0.31, 0.40], [-0.18, 0.51], [-0.21, 0.28], [-0.42, 0.08], [-0.38, -0.05]],
    [[-0.21, 0.28], [-0.04, 0.10], [-0.13, -0.13], [-0.38, -0.05]],
    [[-0.04, 0.10], [0.20, 0.34], [0.38, 0.22], [0.27, -0.02], [-0.13, -0.13]],
    [[0.24, 0.50], [0.32, 0.44], [0.42, 0.19], [0.38, 0.22]],
    [[-0.38, -0.05], [-0.13, -0.13], [-0.25, -0.36], [-0.39, -0.34]],
    [[-0.13, -0.13], [0.27, -0.02], [0.11, -0.34], [-0.25, -0.36]],
    [[0.27, -0.02], [0.38, 0.22], [0.43, 0.02], [0.36, -0.28], [0.11, -0.34]],
    [[-0.39, -0.34], [-0.25, -0.36], [0.11, -0.34], [0.20, -0.55], [-0.18, -0.56]],
    [[0.11, -0.34], [0.36, -0.28], [0.31, -0.47], [0.20, -0.55]],
  ];

  function buildMosaicPanel(name, pattern, materialMap) {
    const panel = new THREE.Group();
    panel.name = name;

    const backingShape = makeRoundedShape(outerPoints, 0.035);
    const backingGeom = new THREE.ExtrudeGeometry(backingShape, {
      depth: 0.085,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.012,
      bevelSegments: 3,
      curveSegments: 5,
    });
    const backing = new THREE.Mesh(backingGeom, goldMat);
    backing.name = name + "_gold_backing";
    backing.position.z = -0.065;
    panel.add(backing);

    for (let i = 0; i < pattern.length; i++) {
      const points = pattern[i].map(
        (point) => new THREE.Vector2(point[0], point[1])
      );
      addEnamelCell(panel, name + "_cell_" + i, points, materialMap[i]);
    }

    const borderShape = makeRoundedShape(outerPoints, 0.035);
    const borderHole = new THREE.Path();
    const innerPoints = outerPoints.map((point) =>
      new THREE.Vector2(point.x * 0.92, point.y * 0.92)
    );
    borderHole.moveTo(innerPoints[innerPoints.length - 1].x, innerPoints[innerPoints.length - 1].y);
    for (let i = innerPoints.length - 2; i >= 0; i--) {
      borderHole.lineTo(innerPoints[i].x, innerPoints[i].y);
    }
    borderHole.closePath();
    borderShape.holes.push(borderHole);

    const borderGeom = new THREE.ExtrudeGeometry(borderShape, {
      depth: 0.025,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.006,
      bevelSize: 0.006,
      bevelSegments: 2,
      curveSegments: 5,
    });
    const outer_border = new THREE.Mesh(borderGeom, goldMat);
    outer_border.name = name + "_outer_border";
    outer_border.position.z = 0.03;
    panel.add(outer_border);

    let edgeIndex = 0;
    for (let i = 0; i < outerPoints.length; i++) {
      const start = outerPoints[i].clone().multiplyScalar(0.92);
      const end = outerPoints[(i + 1) % outerPoints.length].clone().multiplyScalar(0.92);
      if (start.distanceTo(end) > 0.04) {
        const borderEdgeGeom = new THREE.TubeGeometry(
          new THREE.LineCurve3(
            new THREE.Vector3(start.x, start.y, 0.061),
            new THREE.Vector3(end.x, end.y, 0.061)
          ),
          1,
          0.013,
          8,
          false
        );
        const border_edge = new THREE.Mesh(borderEdgeGeom, goldMat);
        border_edge.name = name + "_border_edge_" + edgeIndex;
        panel.add(border_edge);
        edgeIndex++;
      }
    }

    let separatorIndex = 0;
    for (let cellIndex = 0; cellIndex < pattern.length; cellIndex++) {
      const cell = pattern[cellIndex];
      for (let edge = 0; edge < cell.length; edge++) {
        const pointA = cell[edge];
        const pointB = cell[(edge + 1) % cell.length];
        if (pointA[0] === pointB[0] && pointA[1] === pointB[1]) continue;

        const separatorGeom = new THREE.TubeGeometry(
          new THREE.LineCurve3(
            new THREE.Vector3(pointA[0], pointA[1], 0.061),
            new THREE.Vector3(pointB[0], pointB[1], 0.061)
          ),
          1,
          0.013,
          8,
          false
        );
        const separator = new THREE.Mesh(separatorGeom, goldMat);
        separator.name = name + "_separator_" + separatorIndex;
        panel.add(separator);
        separatorIndex++;
      }
    }

    return panel;
  }

  const left_earring = buildMosaicPanel(
    "left_earring",
    leftPattern,
    [
      blueMat,
      pinkMat,
      greenMat,
      skyBlueMat,
      cyanMat,
      orangeMat,
      redMat,
      emeraldMat,
      yellowMat,
      violetMat,
      tealMat,
      purpleMat,
    ]
  );
  left_earring.position.set(-0.50, -0.015, 0);
  left_earring.rotation.y = 0.10;
  left_earring.rotation.z = -0.025;
  root.add(left_earring);

  const right_earring = buildMosaicPanel(
    "right_earring",
    rightPattern,
    [
      pinkMat,
      tealMat,
      skyBlueMat,
      yellowMat,
      greenMat,
      violetMat,
      blueMat,
      cyanMat,
      redMat,
      orangeMat,
      emeraldMat,
      purpleMat,
    ]
  );
  right_earring.position.set(0.50, 0.012, 0.008);
  right_earring.rotation.y = -0.10;
  right_earring.rotation.z = 0.025;
  root.add(right_earring);

  const studGeom = new THREE.CylinderGeometry(0.035, 0.027, 0.13, 16);
  const postGeom = new THREE.CylinderGeometry(0.011, 0.011, 0.34, 12);

  const left_stud = new THREE.Mesh(studGeom, goldMat);
  left_stud.name = "left_stud";
  left_stud.rotation.x = Math.PI / 2;
  left_stud.position.set(0, 0, -0.14);
  left_earring.add(left_stud);

  const left_post = new THREE.Mesh(postGeom, goldMat);
  left_post.name = "left_post";
  left_post.rotation.x = Math.PI / 2;
  left_post.position.set(0, 0, -0.34);
  left_earring.add(left_post);

  const right_stud = new THREE.Mesh(studGeom, goldMat);
  right_stud.name = "right_stud";
  right_stud.rotation.x = Math.PI / 2;
  right_stud.position.set(0, 0, -0.14);
  right_earring.add(right_stud);

  const right_post = new THREE.Mesh(postGeom, goldMat);
  right_post.name = "right_post";
  right_post.rotation.x = Math.PI / 2;
  right_post.position.set(0, 0, -0.34);
  right_earring.add(right_post);

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