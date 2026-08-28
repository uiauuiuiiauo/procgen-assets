export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mahogany_table";

  const tabletop_assembly = new THREE.Group();
  tabletop_assembly.name = "tabletop_assembly";
  root.add(tabletop_assembly);

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const tableW = 1.55;
  const tableD = 0.90;
  const tabletopTopY = 0.79;
  const tabletopDepth = 0.06;
  const legH = 0.66;

  function createWoodTexture(vertical) {
    const width = 96;
    const height = 96;
    const data = new Uint8Array(width * height * 4);

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const u = px / (width - 1);
        const v = py / (height - 1);
        const along = vertical ? v : u;
        const across = vertical ? u : v;

        const wave =
          Math.sin(across * 94 + Math.sin(along * 8) * 1.7) +
          0.45 * Math.sin(across * 245 + along * 12) +
          0.22 * Math.sin(across * 57 - along * 19);

        const broad =
          Math.sin(across * 24 + Math.sin(along * 5.5) * 0.8) * 0.5;

        const knotAlong = along - 0.34;
        const knotAcross = across - 0.58;
        const knotDistance = Math.sqrt(
          knotAlong * knotAlong * 0.30 +
          knotAcross * knotAcross * 2.2
        );
        const knot =
          Math.sin(knotDistance * 105) *
          Math.exp(-knotDistance * 7.5);

        const tone = Math.max(
          0,
          Math.min(1, 0.50 + wave * 0.075 + broad * 0.08 + knot * 0.09)
        );

        const index = (py * width + px) * 4;
        data[index] = Math.round(78 + tone * 55);
        data[index + 1] = Math.round(22 + tone * 27);
        data[index + 2] = Math.round(31 + tone * 32);
        data[index + 3] = 255;
      }
    }

    const texture = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(vertical ? 2.2 : 1.7, vertical ? 1.4 : 2.6);
    if (THREE.SRGBColorSpace !== undefined) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    texture.needsUpdate = true;
    return texture;
  }

  const horizontal_wood_texture = createWoodTexture(false);
  const vertical_wood_texture = createWoodTexture(true);

  const tabletopMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: horizontal_wood_texture,
    metalness: 0.0,
    roughness: 0.6
  });

  const edge_beadMat = new THREE.MeshStandardMaterial({
    color: 0x742838,
    metalness: 0.0,
    roughness: 0.6
  });

  const apronMat = new THREE.MeshStandardMaterial({
    color: 0x682231,
    metalness: 0.0,
    roughness: 0.6
  });

  const table_legsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: vertical_wood_texture,
    metalness: 0.0,
    roughness: 0.6
  });

  const tabletopShape = new THREE.Shape();
  const halfW = tableW / 2;
  const halfD = tableD / 2;
  const cornerR = 0.085;

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
    depth: tabletopDepth,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 5
  });
  tabletopGeom.center();
  tabletopGeom.computeVertexNormals();

  const tabletop = new THREE.Mesh(tabletopGeom, tabletopMat);
  tabletop.name = "tabletop";
  tabletop.rotation.x = Math.PI / 2;
  tabletop.position.y = tabletopTopY - tabletopDepth / 2 - 0.025;
  tabletop_assembly.add(tabletop);

  const edgePoints = [];
  const edgeHalfW = tableW / 2 - 0.008;
  const edgeHalfD = tableD / 2 - 0.008;
  const edgeR = 0.075;
  const edgeY = tabletopTopY - 0.058;
  const cornerData = [
    [edgeHalfW - edgeR, edgeHalfD - edgeR, 0, Math.PI / 2],
    [-edgeHalfW + edgeR, edgeHalfD - edgeR, Math.PI / 2, Math.PI],
    [-edgeHalfW + edgeR, -edgeHalfD + edgeR, Math.PI, Math.PI * 1.5],
    [edgeHalfW - edgeR, -edgeHalfD + edgeR, Math.PI * 1.5, Math.PI * 2]
  ];

  for (const corner of cornerData) {
    for (let i = 0; i <= 5; i++) {
      const t = i / 5;
      const angle = corner[2] + (corner[3] - corner[2]) * t;
      edgePoints.push(
        new THREE.Vector3(
          corner[0] + Math.cos(angle) * edgeR,
          edgeY,
          corner[1] + Math.sin(angle) * edgeR
        )
      );
    }
  }

  const edge_beadCurve = new THREE.CatmullRomCurve3(
    edgePoints,
    true,
    "centripetal",
    0.5
  );
  const edge_beadGeom = new THREE.TubeGeometry(
    edge_beadCurve,
    112,
    0.012,
    8,
    true
  );
  const edge_bead = new THREE.Mesh(edge_beadGeom, edge_beadMat);
  edge_bead.name = "edge_bead";
  tabletop_assembly.add(edge_bead);

  const front_apronGeom = new THREE.BoxGeometry(1.36, 0.12, 0.055);
  const front_apronMat = apronMat;
  const front_apron = new THREE.Mesh(front_apronGeom, front_apronMat);
  front_apron.name = "front_apron";
  front_apron.position.set(0, 0.65, 0.375);
  base_assembly.add(front_apron);

  const rear_apronGeom = front_apronGeom;
  const rear_apronMat = apronMat;
  const rear_apron = new THREE.Mesh(rear_apronGeom, rear_apronMat);
  rear_apron.name = "rear_apron";
  rear_apron.position.set(0, 0.65, -0.375);
  base_assembly.add(rear_apron);

  const left_apronGeom = new THREE.BoxGeometry(0.055, 0.12, 0.70);
  const left_apronMat = apronMat;
  const left_apron = new THREE.Mesh(left_apronGeom, left_apronMat);
  left_apron.name = "left_apron";
  left_apron.position.set(-0.69, 0.65, 0);
  base_assembly.add(left_apron);

  const right_apronGeom = left_apronGeom;
  const right_apronMat = apronMat;
  const right_apron = new THREE.Mesh(right_apronGeom, right_apronMat);
  right_apron.name = "right_apron";
  right_apron.position.set(0.69, 0.65, 0);
  base_assembly.add(right_apron);

  const table_legsShape = new THREE.Shape();
  table_legsShape.moveTo(-0.073, 0);
  table_legsShape.lineTo(0.073, 0);
  table_legsShape.quadraticCurveTo(0.085, 0, 0.085, 0.012);
  table_legsShape.lineTo(0.097, 0.628);
  table_legsShape.quadraticCurveTo(0.097, legH, 0.085, legH);
  table_legsShape.lineTo(-0.085, legH);
  table_legsShape.quadraticCurveTo(-0.097, legH, -0.097, 0.628);
  table_legsShape.lineTo(-0.085, 0.012);
  table_legsShape.quadraticCurveTo(-0.085, 0, -0.073, 0);

  const table_legsGeom = new THREE.ExtrudeGeometry(table_legsShape, {
    depth: 0.15,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 3
  });
  table_legsGeom.center();
  table_legsGeom.computeVertexNormals();

  const table_legs = new THREE.InstancedMesh(
    table_legsGeom,
    table_legsMat,
    4
  );
  table_legs.name = "table_legs";

  const legPositions = [
    [-0.65, 0.335, 0.33],
    [0.65, 0.335, 0.33],
    [-0.65, 0.335, -0.33],
    [0.65, 0.335, -0.33]
  ];
  const legTransform = new THREE.Object3D();

  for (let i = 0; i < legPositions.length; i++) {
    const position = legPositions[i];
    legTransform.position.set(position[0], position[1], position[2]);
    legTransform.rotation.set(0, 0, 0);
    legTransform.scale.set(1, 1, 1);
    legTransform.updateMatrix();
    table_legs.setMatrixAt(i, legTransform.matrix);
  }
  table_legs.instanceMatrix.needsUpdate = true;
  base_assembly.add(table_legs);

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