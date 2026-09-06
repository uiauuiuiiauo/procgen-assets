export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_table";

  const tabletop = new THREE.Group();
  tabletop.name = "tabletop";

  const frame = new THREE.Group();
  frame.name = "frame";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xcbb28f,
    metalness: 0.0,
    roughness: 0.6,
  });

  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xb99670,
    metalness: 0.0,
    roughness: 0.6,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x9d7b59,
    metalness: 0.0,
    roughness: 0.6,
  });

  const grainMat = new THREE.LineBasicMaterial({
    color: 0x9f7f5e,
    transparent: true,
    opacity: 0.2,
  });

  const tableW = 1.6;
  const tableD = 1.6;
  const tabletopBase = 1.08;
  const tabletopDepth = 0.07;
  const tabletopBevel = 0.009;
  const tabletopTop =
    tabletopBase + tabletopDepth + tabletopBevel * 2;

  const legW = 0.13;
  const legD = 0.13;
  const legH = 1.08;
  const legX = 0.7;
  const legZ = 0.7;

  const apronH = 0.19;
  const apronT = 0.055;
  const apronY = 1.0;
  const apronSpanX = legX * 2 + legW - legW * 2;
  const apronSpanZ = legZ * 2 + legD - legD * 2;

  function createRoundedPanelGeometry(width, depth, thickness, radius) {
    const bevelSize = Math.min(
      0.009,
      width * 0.05,
      depth * 0.05
    );
    const bevelThickness = Math.min(
      0.009,
      thickness * 0.22
    );
    const shapeW = width - bevelSize * 2;
    const shapeD = depth - bevelSize * 2;
    const halfW = shapeW / 2;
    const halfD = shapeD / 2;
    const corner = Math.max(
      0.002,
      Math.min(radius - bevelSize, halfW, halfD)
    );

    const shape = new THREE.Shape();
    shape.moveTo(-halfW + corner, -halfD);
    shape.lineTo(halfW - corner, -halfD);
    shape.quadraticCurveTo(
      halfW,
      -halfD,
      halfW,
      -halfD + corner
    );
    shape.lineTo(halfW, halfD - corner);
    shape.quadraticCurveTo(
      halfW,
      halfD,
      halfW - corner,
      halfD
    );
    shape.lineTo(-halfW + corner, halfD);
    shape.quadraticCurveTo(
      -halfW,
      halfD,
      -halfW,
      halfD - corner
    );
    shape.lineTo(-halfW, -halfD + corner);
    shape.quadraticCurveTo(
      -halfW,
      -halfD,
      -halfW + corner,
      -halfD
    );

    const coreDepth = Math.max(
      0.001,
      thickness - bevelThickness * 2
    );
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: coreDepth,
      steps: 1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness,
      bevelSize,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -coreDepth / 2);
    return geometry;
  }

  const panelGap = 0.006;
  const panelW = (tableW - panelGap) / 2;
  const panelD = (tableD - panelGap) / 2;
  const panelOffsetX = (panelW + panelGap) / 2;
  const panelOffsetZ = (panelD + panelGap) / 2;

  const tabletop_panelGeom = createRoundedPanelGeometry(
    panelW,
    panelD,
    tabletopDepth,
    0.035
  );

  const front_left_tabletop_panel = new THREE.Mesh(
    tabletop_panelGeom,
    woodMat
  );
  front_left_tabletop_panel.name =
    "front_left_tabletop_panel";
  front_left_tabletop_panel.rotation.x = Math.PI / 2;
  front_left_tabletop_panel.position.set(
    -panelOffsetX,
    tabletopBase + tabletopDepth / 2,
    panelOffsetZ
  );
  tabletop.add(front_left_tabletop_panel);

  const front_right_tabletop_panel = new THREE.Mesh(
    tabletop_panelGeom,
    woodMat
  );
  front_right_tabletop_panel.name =
    "front_right_tabletop_panel";
  front_right_tabletop_panel.rotation.x = Math.PI / 2;
  front_right_tabletop_panel.position.set(
    panelOffsetX,
    tabletopBase + tabletopDepth / 2,
    panelOffsetZ
  );
  tabletop.add(front_right_tabletop_panel);

  const rear_left_tabletop_panel = new THREE.Mesh(
    tabletop_panelGeom,
    woodMat
  );
  rear_left_tabletop_panel.name =
    "rear_left_tabletop_panel";
  rear_left_tabletop_panel.rotation.x = Math.PI / 2;
  rear_left_tabletop_panel.position.set(
    -panelOffsetX,
    tabletopBase + tabletopDepth / 2,
    -panelOffsetZ
  );
  tabletop.add(rear_left_tabletop_panel);

  const rear_right_tabletop_panel = new THREE.Mesh(
    tabletop_panelGeom,
    woodMat
  );
  rear_right_tabletop_panel.name =
    "rear_right_tabletop_panel";
  rear_right_tabletop_panel.rotation.x = Math.PI / 2;
  rear_right_tabletop_panel.position.set(
    panelOffsetX,
    tabletopBase + tabletopDepth / 2,
    -panelOffsetZ
  );
  tabletop.add(rear_right_tabletop_panel);

  const tabletop_center_x_seamGeom = new THREE.BoxGeometry(
    0.004,
    0.0015,
    tableD - 0.08
  );
  const tabletop_center_x_seam = new THREE.Mesh(
    tabletop_center_x_seamGeom,
    seamMat
  );
  tabletop_center_x_seam.name =
    "tabletop_center_x_seam";
  tabletop_center_x_seam.position.set(
    0,
    tabletopTop + 0.0004,
    0
  );
  tabletop.add(tabletop_center_x_seam);

  const tabletop_center_z_seamGeom = new THREE.BoxGeometry(
    tableW - 0.08,
    0.0015,
    0.004
  );
  const tabletop_center_z_seam = new THREE.Mesh(
    tabletop_center_z_seamGeom,
    seamMat
  );
  tabletop_center_z_seam.name =
    "tabletop_center_z_seam";
  tabletop_center_z_seam.position.set(
    0,
    tabletopTop + 0.0004,
    0
  );
  tabletop.add(tabletop_center_z_seam);

  const tabletop_front_edgeGeom = new THREE.BoxGeometry(
    tableW - 0.08,
    0.022,
    0.012
  );
  const tabletop_front_edge = new THREE.Mesh(
    tabletop_front_edgeGeom,
    edgeMat
  );
  tabletop_front_edge.name = "tabletop_front_edge";
  tabletop_front_edge.position.set(
    0,
    tabletopBase + 0.018,
    tableD / 2 - 0.004
  );
  tabletop.add(tabletop_front_edge);

  const tabletop_back_edge = new THREE.Mesh(
    tabletop_front_edgeGeom,
    edgeMat
  );
  tabletop_back_edge.name = "tabletop_back_edge";
  tabletop_back_edge.position.set(
    0,
    tabletopBase + 0.018,
    -tableD / 2 + 0.004
  );
  tabletop.add(tabletop_back_edge);

  const tabletop_side_edgeGeom = new THREE.BoxGeometry(
    0.012,
    0.022,
    tableD - 0.08
  );
  const tabletop_left_edge = new THREE.Mesh(
    tabletop_side_edgeGeom,
    edgeMat
  );
  tabletop_left_edge.name = "tabletop_left_edge";
  tabletop_left_edge.position.set(
    -tableW / 2 + 0.004,
    tabletopBase + 0.018,
    0
  );
  tabletop.add(tabletop_left_edge);

  const tabletop_right_edge = new THREE.Mesh(
    tabletop_side_edgeGeom,
    edgeMat
  );
  tabletop_right_edge.name = "tabletop_right_edge";
  tabletop_right_edge.position.set(
    tableW / 2 - 0.004,
    tabletopBase + 0.018,
    0
  );
  tabletop.add(tabletop_right_edge);

  const tabletop_grain_points = [];
  const grainRows = 16;
  const grainSegments = 12;

  for (let row = 0; row < grainRows; row++) {
    const zBase =
      -tableD / 2 +
      0.07 +
      ((tableD - 0.14) * row) / (grainRows - 1);

    for (let segment = 0; segment < grainSegments; segment++) {
      const x0 =
        -tableW / 2 +
        0.06 +
        ((tableW - 0.12) * segment) / grainSegments;
      const x1 =
        -tableW / 2 +
        0.06 +
        ((tableW - 0.12) * (segment + 1)) / grainSegments;
      const z0 =
        zBase + Math.sin(row * 1.7 + segment * 0.8) * 0.003;
      const z1 =
        zBase +
        Math.sin(row * 1.7 + (segment + 1) * 0.8) * 0.003;

      tabletop_grain_points.push(
        new THREE.Vector3(x0, tabletopTop + 0.0014, z0),
        new THREE.Vector3(x1, tabletopTop + 0.0014, z1)
      );
    }
  }

  const tabletop_grainGeom =
    new THREE.BufferGeometry().setFromPoints(
      tabletop_grain_points
    );
  const tabletop_grain = new THREE.LineSegments(
    tabletop_grainGeom,
    grainMat
  );
  tabletop_grain.name = "tabletop_grain";
  tabletop.add(tabletop_grain);

  const legGeom = createRoundedPanelGeometry(
    legW,
    legD,
    legH,
    0.012
  );
  const legs = new THREE.InstancedMesh(legGeom, woodMat, 4);
  legs.name = "legs";

  const leg_positions = [
    [-legX, legH / 2, legZ],
    [legX, legH / 2, legZ],
    [-legX, legH / 2, -legZ],
    [legX, legH / 2, -legZ],
  ];
  const leg_dummy = new THREE.Object3D();

  for (let i = 0; i < leg_positions.length; i++) {
    const leg_position = leg_positions[i];
    leg_dummy.position.set(
      leg_position[0],
      leg_position[1],
      leg_position[2]
    );
    leg_dummy.rotation.set(Math.PI / 2, 0, 0);
    leg_dummy.updateMatrix();
    legs.setMatrixAt(i, leg_dummy.matrix);
  }
  legs.instanceMatrix.needsUpdate = true;
  frame.add(legs);

  const front_apronGeom = createRoundedPanelGeometry(
    apronSpanX,
    apronH,
    apronT,
    0.012
  );
  const front_apron = new THREE.Mesh(front_apronGeom, woodMat);
  front_apron.name = "front_apron";
  front_apron.position.set(
    0,
    apronY,
    legZ + legD / 2 - apronT / 2
  );
  frame.add(front_apron);

  const back_apron = new THREE.Mesh(front_apronGeom, woodMat);
  back_apron.name = "back_apron";
  back_apron.position.set(
    0,
    apronY,
    -legZ - legD / 2 + apronT / 2
  );
  frame.add(back_apron);

  const side_apronGeom = createRoundedPanelGeometry(
    apronSpanZ,
    apronH,
    apronT,
    0.012
  );
  const left_apron = new THREE.Mesh(side_apronGeom, woodMat);
  left_apron.name = "left_apron";
  left_apron.rotation.y = Math.PI / 2;
  left_apron.position.set(
    -legX - legW / 2 + apronT / 2,
    apronY,
    0
  );
  frame.add(left_apron);

  const right_apron = new THREE.Mesh(side_apronGeom, woodMat);
  right_apron.name = "right_apron";
  right_apron.rotation.y = Math.PI / 2;
  right_apron.position.set(
    legX + legW / 2 - apronT / 2,
    apronY,
    0
  );
  frame.add(right_apron);

  const frame_grain_points = [];
  const apronGrainRows = 5;
  const apronGrainSegments = 9;

  for (let row = 0; row < apronGrainRows; row++) {
    const baseY =
      apronY -
      apronH / 2 +
      0.02 +
      ((apronH - 0.04) * row) / (apronGrainRows - 1);

    for (let segment = 0; segment < apronGrainSegments; segment++) {
      const x0 =
        -apronSpanX / 2 +
        0.02 +
        ((apronSpanX - 0.04) * segment) /
          apronGrainSegments;
      const x1 =
        -apronSpanX / 2 +
        0.02 +
        ((apronSpanX - 0.04) * (segment + 1)) /
          apronGrainSegments;
      const y0 =
        baseY + Math.sin(row * 1.4 + segment * 0.9) * 0.0018;
      const y1 =
        baseY +
        Math.sin(row * 1.4 + (segment + 1) * 0.9) * 0.0018;
      const faceZ = legZ + legD / 2 + 0.001;

      frame_grain_points.push(
        new THREE.Vector3(x0, y0, faceZ),
        new THREE.Vector3(x1, y1, faceZ),
        new THREE.Vector3(x0, y0, -faceZ),
        new THREE.Vector3(x1, y1, -faceZ)
      );

      const z0 =
        -apronSpanZ / 2 +
        0.02 +
        ((apronSpanZ - 0.04) * segment) /
          apronGrainSegments;
      const z1 =
        -apronSpanZ / 2 +
        0.02 +
        ((apronSpanZ - 0.04) * (segment + 1)) /
          apronGrainSegments;
      const y0Side =
        baseY + Math.sin(row * 1.6 + segment * 0.75) * 0.0018;
      const y1Side =
        baseY +
        Math.sin(row * 1.6 + (segment + 1) * 0.75) * 0.0018;
      const faceX = legX + legW / 2 + 0.001;

      frame_grain_points.push(
        new THREE.Vector3(faceX, y0Side, z0),
        new THREE.Vector3(faceX, y1Side, z1),
        new THREE.Vector3(-faceX, y0Side, z0),
        new THREE.Vector3(-faceX, y1Side, z1)
      );
    }
  }

  for (
    let legIndex = 0;
    legIndex < leg_positions.length;
    legIndex++
  ) {
    const leg_position = leg_positions[legIndex];
    const centerX = leg_position[0];
    const centerZ = leg_position[2];
    const xSign = centerX < 0 ? -1 : 1;
    const zSign = centerZ < 0 ? -1 : 1;

    for (let stripe = 0; stripe < 4; stripe++) {
      const offset = (stripe - 1.5) * 0.022;

      for (let segment = 0; segment < 6; segment++) {
        const y0 = 0.06 + segment * 0.17;
        const y1 = y0 + 0.15;
        const wiggle0 =
          Math.sin(
            legIndex * 1.3 + stripe + segment * 0.7
          ) * 0.0015;
        const wiggle1 =
          Math.sin(
            legIndex * 1.3 +
              stripe +
              (segment + 1) * 0.7
          ) * 0.0015;

        frame_grain_points.push(
          new THREE.Vector3(
            centerX + offset + wiggle0,
            y0,
            centerZ + zSign * (legD / 2 + 0.001)
          ),
          new THREE.Vector3(
            centerX + offset + wiggle1,
            y1,
            centerZ + zSign * (legD / 2 + 0.001)
          ),
          new THREE.Vector3(
            centerX + xSign * (legW / 2 + 0.001),
            y0,
            centerZ + offset + wiggle0
          ),
          new THREE.Vector3(
            centerX + xSign * (legW / 2 + 0.001),
            y1,
            centerZ + offset + wiggle1
          )
        );
      }
    }
  }

  const frame_grainGeom =
    new THREE.BufferGeometry().setFromPoints(
      frame_grain_points
    );
  const frame_grain = new THREE.LineSegments(
    frame_grainGeom,
    grainMat
  );
  frame_grain.name = "frame_grain";
  frame.add(frame_grain);

  root.add(frame);
  root.add(tabletop);

  function fitToUnitCube(THREE, object) {
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

  fitToUnitCube(THREE, root);
  return root;
}