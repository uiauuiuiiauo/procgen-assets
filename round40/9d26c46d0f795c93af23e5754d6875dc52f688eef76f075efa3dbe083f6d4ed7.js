export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_running_shoe";

  const upperMat = new THREE.MeshStandardMaterial({
    color: 0x1268d1,
    metalness: 0.0,
    roughness: 0.3,
  });
  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x0e5abb,
    metalness: 0.0,
    roughness: 0.3,
  });
  const quarterMat = new THREE.MeshStandardMaterial({
    color: 0x0c56b4,
    metalness: 0.0,
    roughness: 0.3,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x2479dc,
    metalness: 0.0,
    roughness: 0.3,
  });
  const liningMat = new THREE.MeshStandardMaterial({
    color: 0x073777,
    metalness: 0.0,
    roughness: 0.8,
  });
  const laceMat = new THREE.MeshStandardMaterial({
    color: 0x155fc5,
    metalness: 0.0,
    roughness: 0.95,
  });
  const stitchMat = new THREE.MeshStandardMaterial({
    color: 0x082f69,
    metalness: 0.0,
    roughness: 0.8,
  });
  const midsoleMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const grooveMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const outsoleMat = new THREE.MeshStandardMaterial({
    color: 0x0c4d9f,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createLoftGeometry(sections, radialSegments) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      for (let j = 0; j < radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);
        const x = section.w * sinAngle;
        const y = section.c + section.h * cosAngle;
        positions.push(x, y, section.z);
      }
    }

    for (let i = 0; i < sections.length - 1; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + nextJ;
        const d = i * radialSegments + nextJ;
        indices.push(a, d, b, b, d, c);
      }
    }

    const rearCenter = positions.length / 3;
    positions.push(
      0,
      sections[0].c + sections[0].h * 0.15,
      sections[0].z
    );
    for (let j = 0; j < radialSegments; j++) {
      indices.push(rearCenter, (j + 1) % radialSegments, j);
    }

    const frontCenter = positions.length / 3;
    const frontStart = (sections.length - 1) * radialSegments;
    positions.push(
      0,
      sections[sections.length - 1].c + sections[sections.length - 1].h * 0.15,
      sections[sections.length - 1].z
    );
    for (let j = 0; j < radialSegments; j++) {
      indices.push(
        frontCenter,
        frontStart + j,
        frontStart + (j + 1) % radialSegments
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSideExtrudeGeometry(points, depth, bevelSize) {
    const shape = new THREE.Shape();
    shape.moveTo(-points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(-points[i][0], points[i][1]);
    }
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: bevelSize > 0,
      bevelThickness: bevelSize,
      bevelSize,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    geometry.rotateY(Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createTube(points, radius, material, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, points.length * 8),
      radius,
      7,
      closed
    );
    return new THREE.Mesh(geometry, material);
  }

  function createSidePanelInstances(geometry, material, sideOffset) {
    const panels = new THREE.InstancedMesh(geometry, material, 2);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 2; i++) {
      dummy.position.set(i === 0 ? -sideOffset : sideOffset, 0, 0);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      panels.setMatrixAt(i, dummy.matrix);
    }
    panels.instanceMatrix.needsUpdate = true;
    return panels;
  }

  const outsoleSections = [
    { z: -1.68, w: 0.34, c: 0.11, h: 0.09 },
    { z: -1.58, w: 0.49, c: 0.11, h: 0.09 },
    { z: -1.25, w: 0.53, c: 0.11, h: 0.09 },
    { z: -0.70, w: 0.54, c: 0.11, h: 0.09 },
    { z: 0.00, w: 0.54, c: 0.11, h: 0.09 },
    { z: 0.70, w: 0.53, c: 0.11, h: 0.09 },
    { z: 1.25, w: 0.49, c: 0.12, h: 0.09 },
    { z: 1.52, w: 0.38, c: 0.13, h: 0.08 },
    { z: 1.66, w: 0.14, c: 0.14, h: 0.06 },
  ];
  const outsoleGeom = createLoftGeometry(outsoleSections, 20);
  const outsole = new THREE.Mesh(outsoleGeom, outsoleMat);
  outsole.name = "outsole";
  root.add(outsole);

  const midsoleSections = [
    { z: -1.65, w: 0.36, c: 0.27, h: 0.11 },
    { z: -1.56, w: 0.50, c: 0.27, h: 0.12 },
    { z: -1.20, w: 0.54, c: 0.27, h: 0.12 },
    { z: -0.60, w: 0.55, c: 0.27, h: 0.12 },
    { z: 0.00, w: 0.55, c: 0.27, h: 0.12 },
    { z: 0.65, w: 0.54, c: 0.27, h: 0.12 },
    { z: 1.18, w: 0.50, c: 0.28, h: 0.12 },
    { z: 1.50, w: 0.38, c: 0.29, h: 0.10 },
    { z: 1.64, w: 0.13, c: 0.30, h: 0.07 },
  ];
  const midsoleGeom = createLoftGeometry(midsoleSections, 20);
  const midsole = new THREE.Mesh(midsoleGeom, midsoleMat);
  midsole.name = "midsole";
  root.add(midsole);

  const upperSections = [
    { z: -1.52, w: 0.34, c: 0.61, h: 0.32 },
    { z: -1.38, w: 0.45, c: 0.62, h: 0.39 },
    { z: -1.10, w: 0.48, c: 0.63, h: 0.40 },
    { z: -0.82, w: 0.48, c: 0.63, h: 0.38 },
    { z: -0.52, w: 0.47, c: 0.64, h: 0.34 },
    { z: -0.20, w: 0.47, c: 0.66, h: 0.43 },
    { z: 0.10, w: 0.47, c: 0.68, h: 0.50 },
    { z: 0.42, w: 0.48, c: 0.69, h: 0.44 },
    { z: 0.72, w: 0.49, c: 0.68, h: 0.36 },
    { z: 1.02, w: 0.48, c: 0.66, h: 0.30 },
    { z: 1.28, w: 0.44, c: 0.63, h: 0.25 },
    { z: 1.48, w: 0.34, c: 0.58, h: 0.20 },
    { z: 1.60, w: 0.12, c: 0.50, h: 0.10 },
  ];
  const upperGeom = createLoftGeometry(upperSections, 28);
  const upper = new THREE.Mesh(upperGeom, upperMat);
  upper.name = "upper";
  root.add(upper);

  const toe_capSections = [
    { z: 0.72, w: 0.47, c: 0.57, h: 0.13 },
    { z: 0.95, w: 0.48, c: 0.56, h: 0.14 },
    { z: 1.20, w: 0.45, c: 0.54, h: 0.13 },
    { z: 1.43, w: 0.35, c: 0.51, h: 0.11 },
    { z: 1.57, w: 0.14, c: 0.48, h: 0.07 },
  ];
  const toe_capGeom = createLoftGeometry(toe_capSections, 20);
  const toe_cap = new THREE.Mesh(toe_capGeom, panelMat);
  toe_cap.name = "toe_cap";
  root.add(toe_cap);

  const heel_counterPoints = [
    [-1.50, 0.40],
    [-1.50, 0.73],
    [-1.45, 0.94],
    [-1.37, 1.07],
    [-1.27, 1.10],
    [-1.17, 1.01],
    [-1.08, 0.84],
    [-0.94, 0.72],
    [-0.78, 0.58],
    [-0.83, 0.41],
  ];
  const heel_counterGeom = createSideExtrudeGeometry(
    heel_counterPoints,
    0.028,
    0.008
  );
  const heel_counter = createSidePanelInstances(
    heel_counterGeom,
    quarterMat,
    0.455
  );
  heel_counter.name = "heel_counter";
  root.add(heel_counter);

  const quarter_panelPoints = [
    [-0.92, 0.40],
    [-0.85, 0.64],
    [-0.63, 0.78],
    [-0.30, 0.87],
    [0.08, 0.94],
    [0.46, 0.82],
    [0.72, 0.60],
    [0.64, 0.40],
  ];
  const quarter_panelGeom = createSideExtrudeGeometry(
    quarter_panelPoints,
    0.026,
    0.007
  );
  const quarter_panel = createSidePanelInstances(
    quarter_panelGeom,
    panelMat,
    0.458
  );
  quarter_panel.name = "quarter_panel";
  root.add(quarter_panel);

  const eyestayPoints = [
    [-0.49, 0.98],
    [-0.38, 1.17],
    [-0.24, 1.24],
    [0.05, 1.15],
    [0.42, 1.00],
    [0.78, 0.86],
    [0.72, 0.74],
    [0.38, 0.82],
    [0.02, 0.95],
    [-0.35, 0.94],
  ];
  const eyestayGeom = createSideExtrudeGeometry(
    eyestayPoints,
    0.026,
    0.007
  );
  const eyestay = createSidePanelInstances(
    eyestayGeom,
    panelMat,
    0.438
  );
  eyestay.name = "eyestay";
  root.add(eyestay);

  const collar_openingGeom = new THREE.SphereGeometry(1, 32, 14);
  const collar_opening = new THREE.Mesh(collar_openingGeom, liningMat);
  collar_opening.name = "collar_opening";
  collar_opening.position.set(0, 1.01, -0.91);
  collar_opening.scale.set(0.31, 0.035, 0.48);
  root.add(collar_opening);

  const collarPoints = [];
  for (let i = 0; i < 28; i++) {
    const angle = i / 28 * Math.PI * 2;
    const z = -0.91 + Math.cos(angle) * 0.51;
    const x = Math.sin(angle) * 0.39;
    const y = 0.99 - Math.cos(angle) * 0.07;
    collarPoints.push(new THREE.Vector3(x, y, z));
  }
  const collar_rim = createTube(collarPoints, 0.035, trimMat, true);
  collar_rim.name = "collar_rim";
  root.add(collar_rim);

  const tongueShape = new THREE.Shape();
  tongueShape.moveTo(-0.18, -0.42);
  tongueShape.lineTo(0.18, -0.42);
  tongueShape.lineTo(0.25, 0.22);
  tongueShape.bezierCurveTo(0.25, 0.34, 0.18, 0.42, 0.08, 0.42);
  tongueShape.lineTo(-0.08, 0.42);
  tongueShape.bezierCurveTo(-0.18, 0.42, -0.25, 0.34, -0.25, 0.22);
  tongueShape.closePath();

  const tongueGeom = new THREE.ExtrudeGeometry(tongueShape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  tongueGeom.translate(0, 0, -0.025);
  const tongue = new THREE.Mesh(tongueGeom, panelMat);
  tongue.name = "tongue";
  tongue.position.set(0, 1.10, 0.02);
  tongue.rotation.x = -0.72;
  root.add(tongue);

  const tongue_labelGeom = new THREE.BoxGeometry(0.18, 0.075, 0.014);
  const tongue_label = new THREE.Mesh(tongue_labelGeom, stitchMat);
  tongue_label.name = "tongue_label";
  tongue_label.position.set(0, 0.31, 0.045);
  tongue.add(tongue_label);

  const laces = new THREE.Group();
  laces.name = "laces";
  for (let i = 0; i < 5; i++) {
    const z = -0.28 + i * 0.22;
    const width = 0.22 + i * 0.012;
    const y = 1.29 - i * 0.085;
    const lace = createTube(
      [
        new THREE.Vector3(-width, y, z),
        new THREE.Vector3(0, y + 0.045, z + 0.008),
        new THREE.Vector3(width, y, z),
      ],
      0.022,
      laceMat,
      false
    );
    lace.name = "lace_" + (i + 1);
    laces.add(lace);
  }
  root.add(laces);

  const eyeletsGeom = new THREE.TorusGeometry(0.032, 0.008, 8, 18);
  const eyelets = new THREE.InstancedMesh(eyeletsGeom, stitchMat, 10);
  eyelets.name = "eyelets";
  const eyeletDummy = new THREE.Object3D();
  let eyeletIndex = 0;
  for (let i = 0; i < 5; i++) {
    const z = -0.28 + i * 0.22;
    const y = 1.27 - i * 0.085;
    for (const side of [-1, 1]) {
      eyeletDummy.position.set(side * 0.285, y, z);
      eyeletDummy.rotation.set(0, side * Math.PI / 2, 0);
      eyeletDummy.scale.set(1, 1, 1);
      eyeletDummy.updateMatrix();
      eyelets.setMatrixAt(eyeletIndex++, eyeletDummy.matrix);
    }
  }
  eyelets.instanceMatrix.needsUpdate = true;
  root.add(eyelets);

  const heelTabPoints = [];
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    heelTabPoints.push(
      new THREE.Vector3(
        Math.sin(angle) * 0.14,
        1.08 - Math.cos(angle) * 0.045,
        -1.49 - Math.cos(angle) * 0.11
      )
    );
  }
  const heel_tab = createTube(heelTabPoints, 0.018, laceMat, true);
  heel_tab.name = "heel_tab";
  root.add(heel_tab);

  const sole_piping = new THREE.Group();
  sole_piping.name = "sole_piping";
  for (const side of [-1, 1]) {
    const points = [
      new THREE.Vector3(side * 0.37, 0.405, -1.57),
      new THREE.Vector3(side * 0.50, 0.405, -1.35),
      new THREE.Vector3(side * 0.54, 0.405, -0.75),
      new THREE.Vector3(side * 0.55, 0.405, 0.00),
      new THREE.Vector3(side * 0.53, 0.415, 0.75),
      new THREE.Vector3(side * 0.47, 0.425, 1.25),
      new THREE.Vector3(side * 0.29, 0.435, 1.55),
    ];
    const piping = createTube(points, 0.017, trimMat, false);
    sole_piping.add(piping);
  }
  root.add(sole_piping);

  const midsole_grooves = new THREE.Group();
  midsole_grooves.name = "midsole_grooves";
  for (const side of [-1, 1]) {
    const grooveOne = createTube(
      [
        new THREE.Vector3(side * 0.525, 0.36, -0.48),
        new THREE.Vector3(side * 0.552, 0.27, -0.18),
        new THREE.Vector3(side * 0.552, 0.18, 0.18),
      ],
      0.009,
      grooveMat,
      false
    );
    const grooveTwo = createTube(
      [
        new THREE.Vector3(side * 0.548, 0.36, 0.60),
        new THREE.Vector3(side * 0.548, 0.27, 0.82),
        new THREE.Vector3(side * 0.515, 0.18, 1.05),
      ],
      0.009,
      grooveMat,
      false
    );
    midsole_grooves.add(grooveOne, grooveTwo);
  }
  root.add(midsole_grooves);

  const panel_seams = new THREE.Group();
  panel_seams.name = "panel_seams";
  for (const side of [-1, 1]) {
    const x = side * 0.482;

    const heelSeam = createTube(
      [
        new THREE.Vector3(x, 0.43, -1.47),
        new THREE.Vector3(x, 0.72, -1.43),
        new THREE.Vector3(x, 0.98, -1.34),
        new THREE.Vector3(x, 1.03, -1.24),
        new THREE.Vector3(x, 0.88, -1.10),
        new THREE.Vector3(x, 0.66, -0.91),
        new THREE.Vector3(x, 0.49, -0.76),
      ],
      0.007,
      stitchMat,
      false
    );
    panel_seams.add(heelSeam);

    const toeSeam = createTube(
      [
        new THREE.Vector3(x, 0.43, 0.72),
        new THREE.Vector3(x, 0.55, 0.82),
        new THREE.Vector3(x, 0.66, 1.02),
        new THREE.Vector3(x, 0.64, 1.25),
        new THREE.Vector3(x, 0.56, 1.46),
      ],
      0.007,
      stitchMat,
      false
    );
    panel_seams.add(toeSeam);

    const quarterSeam = createTube(
      [
        new THREE.Vector3(x, 0.73, -0.86),
        new THREE.Vector3(x, 0.84, -0.55),
        new THREE.Vector3(x, 0.92, -0.18),
        new THREE.Vector3(x, 0.91, 0.18),
        new THREE.Vector3(x, 0.79, 0.52),
        new THREE.Vector3(x, 0.64, 0.70),
      ],
      0.006,
      stitchMat,
      false
    );
    panel_seams.add(quarterSeam);
  }
  root.add(panel_seams);

  const stitchTransforms = [];
  for (const side of [-1, 1]) {
    for (let i = 0; i < 6; i++) {
      const z = -0.28 + i * 0.22;
      const y = 1.22 - i * 0.085;
      stitchTransforms.push({
        x: side * 0.315,
        y,
        z,
        rotationX: Math.PI / 2,
        rotationZ: 0,
      });
    }
    for (let i = 0; i < 5; i++) {
      stitchTransforms.push({
        x: side * 0.485,
        y: 0.65 + i * 0.035,
        z: -1.42 + i * 0.09,
        rotationX: 0,
        rotationZ: Math.PI / 2,
      });
    }
  }

  const panel_stitchesGeom = new THREE.BoxGeometry(0.034, 0.007, 0.007);
  const panel_stitches = new THREE.InstancedMesh(
    panel_stitchesGeom,
    stitchMat,
    stitchTransforms.length
  );
  panel_stitches.name = "panel_stitches";
  const stitchDummy = new THREE.Object3D();
  for (let i = 0; i < stitchTransforms.length; i++) {
    const transform = stitchTransforms[i];
    stitchDummy.position.set(transform.x, transform.y, transform.z);
    stitchDummy.rotation.set(transform.rotationX, 0, transform.rotationZ);
    stitchDummy.scale.set(1, 1, 1);
    stitchDummy.updateMatrix();
    panel_stitches.setMatrixAt(i, stitchDummy.matrix);
  }
  panel_stitches.instanceMatrix.needsUpdate = true;
  root.add(panel_stitches);

  const tread_lugsGeom = new THREE.BoxGeometry(0.18, 0.065, 0.12);
  const tread_lugs = new THREE.InstancedMesh(
    tread_lugsGeom,
    outsoleMat,
    20
  );
  tread_lugs.name = "tread_lugs";
  const treadDummy = new THREE.Object3D();
  let treadIndex = 0;
  for (let i = 0; i < 10; i++) {
    const z = -1.42 + i * (2.84 / 9);
    const endScale = i === 0 || i === 9 ? 0.78 : 1;
    for (const side of [-1, 1]) {
      treadDummy.position.set(side * 0.27, 0.025, z);
      treadDummy.rotation.set(0, side * (i % 2 === 0 ? 0.08 : -0.08), 0);
      treadDummy.scale.set(endScale, 1, 1);
      treadDummy.updateMatrix();
      tread_lugs.setMatrixAt(treadIndex++, treadDummy.matrix);
    }
  }
  tread_lugs.instanceMatrix.needsUpdate = true;
  root.add(tread_lugs);

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