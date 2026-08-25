export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_assembly = new THREE.Group();
  root.add(ring_assembly);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xe5e5e5,
    metalness: 0.5,
    roughness: 0.2,
  });

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 2.4,
    transparent: true,
    side: THREE.DoubleSide,
    flatShading: true,
  });

  const gemstone_facetsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
    flatShading: true,
    depthWrite: false,
  });

  function createTaperedBandGeometry() {
    const positions = [];
    const indices = [];
    const pathSegments = 72;
    const capSegments = 10;
    const majorRadius = 0.78;
    const bandRadius = 0.105;
    const centerX = -0.12;
    const thetaStart = 0.90;
    const thetaEnd = Math.PI * 2 + 0.90;

    function addVertex(point, radialOffset, front) {
      const radialX = point.x - centerX;
      const radialY = point.y;
      const radialLength = Math.sqrt(
        radialX * radialX + radialY * radialY
      ) || 1;
      positions.push(
        point.x + radialX / radialLength * radialOffset,
        point.y + radialY / radialLength * radialOffset,
        point.z + (front ? bandRadius : -bandRadius)
      );
    }

    for (let i = 0; i <= pathSegments; i++) {
      const u = i / pathSegments;
      const theta = thetaStart + (thetaEnd - thetaStart) * u;
      let taper = 0;
      if (u > 0.82) taper = (u - 0.82) / 0.18;
      const localRadius = bandRadius * (1 - 0.5 * taper * taper);
      const point = new THREE.Vector3(
        centerX + majorRadius * Math.cos(theta),
        majorRadius * Math.sin(theta),
        0
      );
      addVertex(point, localRadius, true);
      addVertex(point, localRadius, false);
      addVertex(point, -localRadius, true);
      addVertex(point, -localRadius, false);
    }

    for (let i = 0; i < pathSegments; i++) {
      const current = i * 4;
      const next = (i + 1) * 4;
      for (let side = 0; side < 4; side++) {
        const sideNext = (side + 1) % 4;
        indices.push(
          current + side,
          next + side,
          next + sideNext,
          current + side,
          next + sideNext,
          current + sideNext
        );
      }
    }

    const startPoint = new THREE.Vector3(
      centerX + majorRadius * Math.cos(thetaStart),
      majorRadius * Math.sin(thetaStart),
      0
    );
    const endPoint = new THREE.Vector3(
      centerX + majorRadius * Math.cos(thetaEnd),
      majorRadius * Math.sin(thetaEnd),
      0
    );

    const startCenter = positions.length / 3;
    positions.push(startPoint.x, startPoint.y, startPoint.z);
    for (let i = 0; i < capSegments; i++) {
      const a0 = i / capSegments * Math.PI * 2;
      const a1 = (i + 1) / capSegments * Math.PI * 2;
      const r0 = bandRadius * 0.96;
      const r1 = bandRadius * 0.96;
      positions.push(
        startPoint.x + Math.cos(a0) * r0,
        startPoint.y + Math.sin(a0) * r0,
        Math.cos(a0) * bandRadius,
        startPoint.x + Math.cos(a1) * r1,
        startPoint.y + Math.sin(a1) * r1,
        Math.cos(a1) * bandRadius
      );
    }
    for (let i = 0; i < capSegments; i++) {
      indices.push(
        startCenter,
        startCenter + 1 + i,
        startCenter + 1 + ((i + 1) % capSegments)
      );
    }

    const endCenter = positions.length / 3;
    positions.push(endPoint.x, endPoint.y, endPoint.z);
    for (let i = 0; i < capSegments; i++) {
      const a0 = i / capSegments * Math.PI * 2;
      const a1 = (i + 1) / capSegments * Math.PI * 2;
      const r0 = bandRadius * 0.48;
      const r1 = bandRadius * 0.48;
      positions.push(
        endPoint.x + Math.cos(a0) * r0,
        endPoint.y + Math.sin(a0) * r0,
        Math.cos(a0) * bandRadius,
        endPoint.x + Math.cos(a1) * r1,
        endPoint.y + Math.sin(a1) * r1,
        Math.cos(a1) * bandRadius
      );
    }
    for (let i = 0; i < capSegments; i++) {
      indices.push(
        endCenter,
        endCenter + 1 + ((i + 1) % capSegments),
        endCenter + 1 + i
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

  const ring_bandGeom = createTaperedBandGeometry();
  const ring_band = new THREE.Mesh(ring_bandGeom, silverMat);
  ring_assembly.add(ring_band);

  const upper_archShape = new THREE.Shape();
  upper_archShape.moveTo(-0.86, 0.40);
  upper_archShape.bezierCurveTo(-0.82, 0.56, -0.68, 0.66, -0.49, 0.72);
  upper_archShape.bezierCurveTo(-0.25, 0.80, 0.03, 0.80, 0.24, 0.70);
  upper_archShape.bezierCurveTo(0.43, 0.61, 0.56, 0.47, 0.63, 0.34);
  upper_archShape.lineTo(0.51, 0.27);
  upper_archShape.bezierCurveTo(0.43, 0.40, 0.31, 0.51, 0.16, 0.58);
  upper_archShape.bezierCurveTo(-0.03, 0.67, -0.26, 0.67, -0.46, 0.61);
  upper_archShape.bezierCurveTo(-0.62, 0.56, -0.72, 0.49, -0.76, 0.39);
  upper_archShape.lineTo(-0.86, 0.40);
  upper_archShape.closePath();

  const upper_archGeom = new THREE.ExtrudeGeometry(upper_archShape, {
    depth: 0.13,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  upper_archGeom.translate(0, 0, -0.065);
  const upper_arch = new THREE.Mesh(upper_archGeom, silverMat);
  ring_assembly.add(upper_arch);

  const left_openwork_armPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.63, 0.59, 0.005),
    new THREE.Vector3(-0.73, 0.55, 0.005),
    new THREE.Vector3(-0.83, 0.47, 0.005),
    new THREE.Vector3(-0.88, 0.37, 0.005),
  ], false, "centripetal");
  const left_openwork_armGeom = new THREE.TubeGeometry(
    left_openwork_armPath,
    24,
    0.034,
    10,
    false
  );
  const left_openwork_arm = new THREE.Mesh(
    left_openwork_armGeom,
    silverMat
  );
  ring_assembly.add(left_openwork_arm);

  const left_openwork_tipGeom = new THREE.SphereGeometry(0.045, 16, 10);
  const left_openwork_tip = new THREE.Mesh(left_openwork_tipGeom, silverMat);
  left_openwork_tip.position.set(-0.88, 0.37, 0.005);
  left_openwork_tip.scale.set(1.25, 0.72, 1);
  ring_assembly.add(left_openwork_tip);

  const right_openwork_armShape = new THREE.Shape();
  right_openwork_armShape.moveTo(0.30, 0.66);
  right_openwork_armShape.bezierCurveTo(0.43, 0.60, 0.54, 0.48, 0.61, 0.35);
  right_openwork_armShape.lineTo(0.50, 0.29);
  right_openwork_armShape.bezierCurveTo(0.45, 0.41, 0.36, 0.52, 0.25, 0.58);
  right_openwork_armShape.closePath();

  const right_openwork_armGeom = new THREE.ExtrudeGeometry(
    right_openwork_armShape,
    {
      depth: 0.12,
      steps: 1,
      curveSegments: 14,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.014,
      bevelSegments: 3,
    }
  );
  right_openwork_armGeom.translate(0, 0, -0.06);
  const right_openwork_arm = new THREE.Mesh(
    right_openwork_armGeom,
    silverMat
  );
  ring_assembly.add(right_openwork_arm);

  const inner_left_supportShape = new THREE.Shape();
  inner_left_supportShape.moveTo(0.34, 0.31);
  inner_left_supportShape.lineTo(0.43, 0.37);
  inner_left_supportShape.lineTo(0.13, -0.20);
  inner_left_supportShape.lineTo(0.02, -0.16);
  inner_left_supportShape.closePath();

  const inner_left_supportGeom = new THREE.ExtrudeGeometry(
    inner_left_supportShape,
    {
      depth: 0.11,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.010,
      bevelSegments: 2,
    }
  );
  inner_left_supportGeom.translate(0, 0, -0.055);
  const inner_left_support = new THREE.Mesh(
    inner_left_supportGeom,
    silverMat
  );
  inner_left_support.position.z = 0.015;
  ring_assembly.add(inner_left_support);

  const inner_right_supportShape = new THREE.Shape();
  inner_right_supportShape.moveTo(0.50, 0.31);
  inner_right_supportShape.lineTo(0.60, 0.26);
  inner_right_supportShape.lineTo(0.30, -0.23);
  inner_right_supportShape.lineTo(0.20, -0.18);
  inner_right_supportShape.closePath();

  const inner_right_supportGeom = new THREE.ExtrudeGeometry(
    inner_right_supportShape,
    {
      depth: 0.11,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.010,
      bevelSegments: 2,
    }
  );
  inner_right_supportGeom.translate(0, 0, -0.055);
  const inner_right_support = new THREE.Mesh(
    inner_right_supportGeom,
    silverMat
  );
  inner_right_support.position.z = 0.015;
  ring_assembly.add(inner_right_support);

  const gemstoneCenterX = 0.66;
  const gemstoneCenterY = 0.10;
  const gemstoneRadius = 0.36;

  const setting_neckGeom = new THREE.CylinderGeometry(
    0.085,
    0.115,
    0.22,
    18
  );
  const setting_neck = new THREE.Mesh(setting_neckGeom, silverMat);
  setting_neck.position.set(0.57, -0.12, -0.005);
  setting_neck.rotation.z = -0.12;
  ring_assembly.add(setting_neck);

  const gemstone_basketGeom = new THREE.TorusGeometry(
    0.30,
    0.034,
    10,
    48
  );
  const gemstone_basket = new THREE.Mesh(gemstone_basketGeom, silverMat);
  gemstone_basket.position.set(gemstoneCenterX, gemstoneCenterY, 0.075);
  ring_assembly.add(gemstone_basket);

  const gallery_ringGeom = new THREE.TorusGeometry(0.245, 0.025, 8, 40);
  const gallery_ring = new THREE.Mesh(gallery_ringGeom, silverMat);
  gallery_ring.position.set(gemstoneCenterX, gemstoneCenterY, 0.015);
  ring_assembly.add(gallery_ring);

  const prongPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.285, 0, 0.075),
    new THREE.Vector3(0.335, 0, 0.155),
    new THREE.Vector3(0.355, 0, 0.225),
    new THREE.Vector3(0.325, 0, 0.285),
  ], false, "centripetal");
  const gemstone_prongsGeom = new THREE.TubeGeometry(
    prongPath,
    18,
    0.030,
    10,
    false
  );
  const gemstone_prongs = new THREE.InstancedMesh(
    gemstone_prongsGeom,
    silverMat,
    4
  );
  gemstone_prongs.position.set(gemstoneCenterX, gemstoneCenterY, 0);

  const prong_tipsGeom = new THREE.SphereGeometry(0.040, 14, 10);
  const prong_tips = new THREE.InstancedMesh(
    prong_tipsGeom,
    silverMat,
    4
  );
  prong_tips.position.set(gemstoneCenterX, gemstoneCenterY, 0);

  const instanceDummy = new THREE.Object3D();
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;

    instanceDummy.position.set(0, 0, 0);
    instanceDummy.rotation.set(0, 0, angle);
    instanceDummy.scale.set(1, 1, 1);
    instanceDummy.updateMatrix();
    gemstone_prongs.setMatrixAt(i, instanceDummy.matrix);

    instanceDummy.position.set(
      Math.cos(angle) * 0.325,
      Math.sin(angle) * 0.325,
      0.285
    );
    instanceDummy.rotation.set(0, 0, angle);
    instanceDummy.scale.set(1.15, 0.72, 0.82);
    instanceDummy.updateMatrix();
    prong_tips.setMatrixAt(i, instanceDummy.matrix);
  }
  gemstone_prongs.instanceMatrix.needsUpdate = true;
  prong_tips.instanceMatrix.needsUpdate = true;
  ring_assembly.add(gemstone_prongs);
  ring_assembly.add(prong_tips);

  function createGemstoneGeometry() {
    const positions = [];
    const facetCount = 16;
    const tableRadius = 0.168;
    const outerRadius = gemstoneRadius;
    const tableZ = 0.225;
    const frontOuterZ = 0.085;
    const backOuterZ = 0.025;
    const backZ = -0.040;

    function pushTriangle(a, b, c) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
    }

    const tableCenter = new THREE.Vector3(0, 0, tableZ);
    const backCenter = new THREE.Vector3(0, 0, backZ);

    for (let i = 0; i < facetCount; i++) {
      const a0 = i / facetCount * Math.PI * 2;
      const a1 = (i + 1) / facetCount * Math.PI * 2;
      const table0 = new THREE.Vector3(
        Math.cos(a0) * tableRadius,
        Math.sin(a0) * tableRadius,
        tableZ
      );
      const table1 = new THREE.Vector3(
        Math.cos(a1) * tableRadius,
        Math.sin(a1) * tableRadius,
        tableZ
      );
      const outer0 = new THREE.Vector3(
        Math.cos(a0) * outerRadius,
        Math.sin(a0) * outerRadius,
        frontOuterZ
      );
      const outer1 = new THREE.Vector3(
        Math.cos(a1) * outerRadius,
        Math.sin(a1) * outerRadius,
        frontOuterZ
      );
      const back0 = new THREE.Vector3(
        Math.cos(a0) * outerRadius,
        Math.sin(a0) * outerRadius,
        backOuterZ
      );
      const back1 = new THREE.Vector3(
        Math.cos(a1) * outerRadius,
        Math.sin(a1) * outerRadius,
        backOuterZ
      );

      pushTriangle(tableCenter, table0, table1);
      pushTriangle(table0, outer0, outer1);
      pushTriangle(table0, outer1, table1);
      pushTriangle(outer0, back0, back1);
      pushTriangle(outer0, back1, outer1);
      pushTriangle(backCenter, back1, back0);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createFacetFlashGeometry() {
    const positions = [];
    const colors = [];
    const facetCount = 16;
    const tableRadius = 0.164;
    const outerRadius = 0.348;
    const tableZ = 0.232;
    const outerZ = 0.092;
    const palette = [
      [1.00, 1.00, 1.00],
      [0.73, 0.82, 0.90],
      [0.93, 0.97, 1.00],
      [0.54, 0.64, 0.75],
      [0.82, 0.88, 0.95],
      [1.00, 0.98, 0.90],
    ];

    function pushColoredTriangle(a, b, c, color) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    const center = new THREE.Vector3(0, 0, tableZ);
    for (let i = 0; i < facetCount; i++) {
      const a0 = i / facetCount * Math.PI * 2;
      const a1 = (i + 1) / facetCount * Math.PI * 2;
      const table0 = new THREE.Vector3(
        Math.cos(a0) * tableRadius,
        Math.sin(a0) * tableRadius,
        tableZ
      );
      const table1 = new THREE.Vector3(
        Math.cos(a1) * tableRadius,
        Math.sin(a1) * tableRadius,
        tableZ
      );
      const outer0 = new THREE.Vector3(
        Math.cos(a0) * outerRadius,
        Math.sin(a0) * outerRadius,
        outerZ
      );
      const outer1 = new THREE.Vector3(
        Math.cos(a1) * outerRadius,
        Math.sin(a1) * outerRadius,
        outerZ
      );

      pushColoredTriangle(
        center,
        table0,
        table1,
        palette[(i * 5) % palette.length]
      );
      pushColoredTriangle(
        table0,
        outer0,
        outer1,
        palette[(i * 3 + 2) % palette.length]
      );
      pushColoredTriangle(
        table0,
        outer1,
        table1,
        palette[(i * 7 + 1) % palette.length]
      );
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

  const gemstoneGeom = createGemstoneGeometry();
  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.position.set(gemstoneCenterX, gemstoneCenterY, 0.12);
  gemstone.renderOrder = 1;
  ring_assembly.add(gemstone);

  const gemstone_facetsGeom = createFacetFlashGeometry();
  const gemstone_facets = new THREE.Mesh(
    gemstone_facetsGeom,
    gemstone_facetsMat
  );
  gemstone_facets.position.set(gemstoneCenterX, gemstoneCenterY, 0.12);
  gemstone_facets.renderOrder = 2;
  ring_assembly.add(gemstone_facets);

  ring_assembly.rotation.set(-0.10, -0.16, -0.055);

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