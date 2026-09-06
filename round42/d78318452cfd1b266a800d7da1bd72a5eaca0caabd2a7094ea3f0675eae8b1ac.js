export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "eternity_ring";

  const ring_structure = new THREE.Group();
  ring_structure.name = "ring_structure";
  root.add(ring_structure);

  const diamond_array = new THREE.Group();
  diamond_array.name = "diamond_array";
  root.add(diamond_array);

  const clasp_assembly = new THREE.Group();
  clasp_assembly.name = "clasp_assembly";
  root.add(clasp_assembly);

  const ringRadius = 1.55;
  const stoneCount = 18;
  const claspAngle = 2.10;
  const angleStep = Math.PI * 2 / stoneCount;
  const angleOffset = Math.PI / 2 - claspAngle;
  const dummy = new THREE.Object3D();

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });

  const diamondsMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5fbff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    side: THREE.DoubleSide,
  });

  const diamond_tablesMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function makeCurvedPlateGeometry(radius, radialThickness, width, height, segments) {
    const positions = [];
    const indices = [];
    const innerRadius = radius - radialThickness / 2;
    const outerRadius = radius + radialThickness / 2;

    function point(rad, angle, y) {
      return [
        Math.cos(angle) * rad,
        y,
        Math.sin(angle) * rad,
      ];
    }

    function addQuad(a, b, c, d) {
      const index = positions.length / 3;
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2],
        d[0], d[1], d[2]
      );
      indices.push(
        index, index + 1, index + 2,
        index, index + 2, index + 3
      );
    }

    for (let i = 0; i < segments; i++) {
      const a0 = -Math.PI + i / segments * Math.PI * 2;
      const a1 = -Math.PI + (i + 1) / segments * Math.PI * 2;
      const halfAngle = width * 0.5 / radius;

      addQuad(
        point(outerRadius, a0 + halfAngle, -height / 2),
        point(outerRadius, a1 + halfAngle, -height / 2),
        point(outerRadius, a1 - halfAngle, height / 2),
        point(outerRadius, a0 - halfAngle, height / 2)
      );

      addQuad(
        point(innerRadius, a0 + halfAngle, -height / 2),
        point(innerRadius, a1 + halfAngle, -height / 2),
        point(innerRadius, a1 - halfAngle, height / 2),
        point(innerRadius, a0 - halfAngle, height / 2)
      );

      addQuad(
        point(innerRadius, a0 + halfAngle, height / 2),
        point(innerRadius, a1 + halfAngle, height / 2),
        point(outerRadius, a1 + halfAngle, height / 2),
        point(outerRadius, a0 + halfAngle, height / 2)
      );

      addQuad(
        point(innerRadius, a0 - halfAngle, -height / 2),
        point(innerRadius, a1 - halfAngle, -height / 2),
        point(outerRadius, a1 - halfAngle, -height / 2),
        point(outerRadius, a0 - halfAngle, -height / 2)
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

  function makeDiamondGeometry() {
    const positions = [];
    const colors = [];
    const segments = 16;
    const tableRadius = 0.105;
    const girdleRadius = 0.225;
    const tableY = 0.13;
    const girdleY = 0.0;
    const pavilionY = -0.18;
    const pavilionColors = [
      [1.0, 1.0, 1.0],
      [0.68, 0.76, 0.84],
      [0.92, 0.97, 1.0],
      [0.76, 0.84, 0.92],
    ];

    function point(radius, angle, y) {
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      ];
    }

    function addTriangle(a, b, c, color) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    const topCenter = [0, tableY, 0];
    const pavilionTip = [0, pavilionY, 0];

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const table0 = point(tableRadius, a0, tableY);
      const table1 = point(tableRadius, a1, tableY);
      const girdle0 = point(girdleRadius, a0, girdleY);
      const girdle1 = point(girdleRadius, a1, girdleY);
      const facetColor = pavilionColors[i % pavilionColors.length];

      addTriangle(topCenter, table1, table0, [1.0, 1.0, 1.0]);
      addTriangle(table0, table1, girdle1, facetColor);
      addTriangle(table0, girdle1, girdle0, facetColor);
      addTriangle(girdle0, girdle1, pavilionTip, facetColor);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  const inner_bandGeom = makeCurvedPlateGeometry(
    ringRadius,
    0.10,
    0.40,
    0.42,
    96
  );
  const inner_band = new THREE.Mesh(inner_bandGeom, polished_metalMat);
  inner_band.name = "inner_band";
  ring_structure.add(inner_band);

  const setting_horizontal_railsGeom = new THREE.BoxGeometry(
    0.43,
    0.045,
    0.07
  );
  const setting_horizontal_rails = new THREE.InstancedMesh(
    setting_horizontal_railsGeom,
    polished_metalMat,
    stoneCount * 2
  );
  setting_horizontal_rails.name = "setting_horizontal_rails";

  let instanceIndex = 0;
  for (let i = 0; i < stoneCount; i++) {
    const angle = angleOffset + i * angleStep;

    for (const y of [-0.235, 0.235]) {
      dummy.position.set(
        Math.cos(angle) * ringRadius,
        y,
        Math.sin(angle) * ringRadius
      );
      dummy.rotation.set(0, Math.PI / 2 - angle, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      setting_horizontal_rails.setMatrixAt(instanceIndex++, dummy.matrix);
    }
  }
  setting_horizontal_rails.instanceMatrix.needsUpdate = true;
  ring_structure.add(setting_horizontal_rails);

  const setting_vertical_postsGeom = new THREE.BoxGeometry(
    0.055,
    0.45,
    0.07
  );
  const setting_vertical_posts = new THREE.InstancedMesh(
    setting_vertical_postsGeom,
    polished_metalMat,
    stoneCount * 2
  );
  setting_vertical_posts.name = "setting_vertical_posts";

  instanceIndex = 0;
  for (let i = 0; i < stoneCount; i++) {
    const angle = angleOffset + i * angleStep;
    const halfArc = 0.205 / ringRadius;

    for (const angularOffset of [-halfArc, halfArc]) {
      const postAngle = angle + angularOffset;
      dummy.position.set(
        Math.cos(postAngle) * ringRadius,
        0,
        Math.sin(postAngle) * ringRadius
      );
      dummy.rotation.set(0, Math.PI / 2 - postAngle, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      setting_vertical_posts.setMatrixAt(instanceIndex++, dummy.matrix);
    }
  }
  setting_vertical_posts.instanceMatrix.needsUpdate = true;
  ring_structure.add(setting_vertical_posts);

  const setting_connectorsGeom = new THREE.BoxGeometry(0.10, 0.065, 0.13);
  const setting_connectors = new THREE.InstancedMesh(
    setting_connectorsGeom,
    silver_metalMat,
    stoneCount * 2
  );
  setting_connectors.name = "setting_connectors";

  instanceIndex = 0;
  for (let i = 0; i < stoneCount; i++) {
    const midpoint = angleOffset + (i + 0.5) * angleStep;
    const gapAngle = Math.PI - claspAngle;

    for (const y of [-0.16, 0.16]) {
      dummy.position.set(
        Math.cos(midpoint) * ringRadius,
        y,
        Math.sin(midpoint) * ringRadius
      );
      dummy.rotation.set(0, Math.PI / 2 - midpoint, 0);
      dummy.scale.set(gapAngle < 0.35 ? 0.22 : 1, 1, 1);
      dummy.updateMatrix();
      setting_connectors.setMatrixAt(instanceIndex++, dummy.matrix);
    }
  }
  setting_connectors.instanceMatrix.needsUpdate = true;
  ring_structure.add(setting_connectors);

  const diamondsGeom = makeDiamondGeometry();
  const diamonds = new THREE.InstancedMesh(
    diamondsGeom,
    diamondsMat,
    stoneCount
  );
  diamonds.name = "diamonds";

  for (let i = 0; i < stoneCount; i++) {
    const angle = angleOffset + i * angleStep;
    dummy.position.set(
      Math.cos(angle) * ringRadius,
      0,
      Math.sin(angle) * ringRadius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    diamonds.setMatrixAt(i, dummy.matrix);
  }
  diamonds.instanceMatrix.needsUpdate = true;
  diamond_array.add(diamonds);

  const diamond_tablesGeom = new THREE.CircleGeometry(0.101, 16);
  diamond_tablesGeom.rotateX(-Math.PI / 2);
  const diamond_tables = new THREE.InstancedMesh(
    diamond_tablesGeom,
    diamond_tablesMat,
    stoneCount
  );
  diamond_tables.name = "diamond_tables";

  for (let i = 0; i < stoneCount; i++) {
    const angle = angleOffset + i * angleStep;
    dummy.position.set(
      Math.cos(angle) * ringRadius,
      0.132,
      Math.sin(angle) * ringRadius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    diamond_tables.setMatrixAt(i, dummy.matrix);
  }
  diamond_tables.instanceMatrix.needsUpdate = true;
  diamond_array.add(diamond_tables);

  const diamond_prongsGeom = new THREE.SphereGeometry(0.035, 12, 8);
  const diamond_prongs = new THREE.InstancedMesh(
    diamond_prongsGeom,
    polished_metalMat,
    stoneCount * 4
  );
  diamond_prongs.name = "diamond_prongs";

  instanceIndex = 0;
  for (let i = 0; i < stoneCount; i++) {
    const angle = angleOffset + i * angleStep;
    const radialX = Math.cos(angle);
    const radialZ = Math.sin(angle);
    const tangentX = -Math.sin(angle);
    const tangentZ = Math.cos(angle);

    for (const radialOffset of [-0.19, 0.19]) {
      for (const tangentOffset of [-0.19, 0.19]) {
        const radius = ringRadius + radialOffset;
        dummy.position.set(
          radialX * radius + tangentX * tangentOffset,
          0.095,
          radialZ * radius + tangentZ * tangentOffset
        );
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        diamond_prongs.setMatrixAt(instanceIndex++, dummy.matrix);
      }
    }
  }
  diamond_prongs.instanceMatrix.needsUpdate = true;
  diamond_array.add(diamond_prongs);

  const clasp_bodyShape = new THREE.Shape();
  clasp_bodyShape.moveTo(-0.28, -0.22);
  clasp_bodyShape.lineTo(0.28, -0.22);
  clasp_bodyShape.quadraticCurveTo(0.35, -0.22, 0.35, -0.15);
  clasp_bodyShape.lineTo(0.35, 0.15);
  clasp_bodyShape.quadraticCurveTo(0.35, 0.22, 0.28, 0.22);
  clasp_bodyShape.lineTo(-0.28, 0.22);
  clasp_bodyShape.quadraticCurveTo(-0.35, 0.22, -0.35, 0.15);
  clasp_bodyShape.lineTo(-0.35, -0.15);
  clasp_bodyShape.quadraticCurveTo(-0.35, -0.22, -0.28, -0.22);
  clasp_bodyShape.closePath();

  const clasp_bodyGeom = new THREE.ExtrudeGeometry(clasp_bodyShape, {
    depth: 0.20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
  });
  clasp_bodyGeom.translate(0, 0, -0.10);

  const clasp_body = new THREE.Mesh(clasp_bodyGeom, polished_metalMat);
  clasp_body.name = "clasp_body";
  clasp_body.rotation.y = Math.PI / 2;
  clasp_body.position.set(0, 0, -ringRadius);
  clasp_assembly.add(clasp_body);

  const clasp_front_plateGeom = new THREE.BoxGeometry(0.56, 0.34, 0.025);
  const clasp_front_plate = new THREE.Mesh(
    clasp_front_plateGeom,
    silver_metalMat
  );
  clasp_front_plate.name = "clasp_front_plate";
  clasp_front_plate.position.set(0, 0, -ringRadius + 0.125);
  clasp_assembly.add(clasp_front_plate);

  const clasp_latchGeom = new THREE.BoxGeometry(0.38, 0.055, 0.045);
  const clasp_latch = new THREE.Mesh(clasp_latchGeom, polished_metalMat);
  clasp_latch.name = "clasp_latch";
  clasp_latch.position.set(0, 0.185, -ringRadius + 0.15);
  clasp_assembly.add(clasp_latch);

  const clasp_hingeGeom = new THREE.CylinderGeometry(
    0.055,
    0.055,
    0.64,
    20
  );
  const clasp_hinge = new THREE.Mesh(clasp_hingeGeom, polished_metalMat);
  clasp_hinge.name = "clasp_hinge";
  clasp_hinge.rotation.z = Math.PI / 2;
  clasp_hinge.position.set(0, 0.245, -ringRadius);
  clasp_assembly.add(clasp_hinge);

  const clasp_receiversGeom = new THREE.BoxGeometry(0.11, 0.40, 0.16);
  const clasp_receivers = new THREE.InstancedMesh(
    clasp_receiversGeom,
    polished_metalMat,
    2
  );
  clasp_receivers.name = "clasp_receivers";

  const receiverAngles = [claspAngle - 0.32, claspAngle + 0.32];
  for (let i = 0; i < receiverAngles.length; i++) {
    const angle = receiverAngles[i];
    dummy.position.set(
      Math.cos(angle) * ringRadius,
      0,
      Math.sin(angle) * ringRadius
    );
    dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    clasp_receivers.setMatrixAt(i, dummy.matrix);
  }
  clasp_receivers.instanceMatrix.needsUpdate = true;
  clasp_assembly.add(clasp_receivers);

  const clasp_screwsGeom = new THREE.CylinderGeometry(
    0.032,
    0.032,
    0.014,
    16
  );
  const clasp_screws = new THREE.InstancedMesh(
    clasp_screwsGeom,
    silver_metalMat,
    2
  );
  clasp_screws.name = "clasp_screws";

  for (let i = 0; i < 2; i++) {
    dummy.position.set(
      i === 0 ? -0.18 : 0.18,
      0.282,
      -ringRadius
    );
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    clasp_screws.setMatrixAt(i, dummy.matrix);
  }
  clasp_screws.instanceMatrix.needsUpdate = true;
  clasp_assembly.add(clasp_screws);

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