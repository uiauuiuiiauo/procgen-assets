export default function generate(THREE) {
  const root = new THREE.Group();
  const glass_vessel = new THREE.Group();
  const gold_ornament = new THREE.Group();
  root.add(glass_vessel, gold_ornament);

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8f3f7,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const blue_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x174fc4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.65,
    ior: 1.5,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });

  const gold_leafMat = new THREE.MeshStandardMaterial({
    color: 0xd8aa45,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const gold_veinMat = new THREE.MeshStandardMaterial({
    color: 0xf0cf77,
    metalness: 0.5,
    roughness: 0.25,
  });

  const glass_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.320, 0.000),
    new THREE.Vector2(0.350, 0.010),
    new THREE.Vector2(0.365, 0.035),
    new THREE.Vector2(0.367, 0.120),
    new THREE.Vector2(0.372, 0.160),
    new THREE.Vector2(0.385, 0.200),
    new THREE.Vector2(0.392, 0.400),
    new THREE.Vector2(0.405, 0.750),
    new THREE.Vector2(0.422, 1.100),
    new THREE.Vector2(0.440, 1.350),
    new THREE.Vector2(0.448, 1.405),
    new THREE.Vector2(0.445, 1.435),
    new THREE.Vector2(0.430, 1.455),
    new THREE.Vector2(0.412, 1.455),
    new THREE.Vector2(0.405, 1.435),
    new THREE.Vector2(0.408, 1.400),
    new THREE.Vector2(0.400, 1.340),
    new THREE.Vector2(0.382, 1.100),
    new THREE.Vector2(0.365, 0.750),
    new THREE.Vector2(0.350, 0.400),
    new THREE.Vector2(0.340, 0.220),
    new THREE.Vector2(0.325, 0.180),
    new THREE.Vector2(0.000, 0.180),
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 64);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glass_bodyMat);
  glass_body.renderOrder = 1;
  glass_vessel.add(glass_body);

  const blue_rimGeom = new THREE.TorusGeometry(0.429, 0.022, 16, 72);
  const blue_rim = new THREE.Mesh(blue_rimGeom, blue_rimMat);
  blue_rim.rotation.x = Math.PI / 2;
  blue_rim.position.y = 1.432;
  blue_rim.renderOrder = 2;
  glass_vessel.add(blue_rim);

  const blue_inner_rimGeom = new THREE.TorusGeometry(0.407, 0.008, 12, 72);
  const blue_inner_rim = new THREE.Mesh(blue_inner_rimGeom, blue_rimMat);
  blue_inner_rim.rotation.x = Math.PI / 2;
  blue_inner_rim.position.y = 1.426;
  blue_inner_rim.renderOrder = 2;
  glass_vessel.add(blue_inner_rim);

  const blue_lower_rimGeom = new THREE.TorusGeometry(0.431, 0.009, 12, 72);
  const blue_lower_rim = new THREE.Mesh(blue_lower_rimGeom, blue_rimMat);
  blue_lower_rim.rotation.x = Math.PI / 2;
  blue_lower_rim.position.y = 1.393;
  blue_lower_rim.renderOrder = 2;
  glass_vessel.add(blue_lower_rim);

  const base_lower_edgeGeom = new THREE.TorusGeometry(0.350, 0.012, 12, 64);
  const base_lower_edge = new THREE.Mesh(base_lower_edgeGeom, glass_bodyMat);
  base_lower_edge.rotation.x = Math.PI / 2;
  base_lower_edge.position.y = 0.025;
  base_lower_edge.renderOrder = 2;
  glass_vessel.add(base_lower_edge);

  const base_upper_edgeGeom = new THREE.TorusGeometry(0.360, 0.010, 12, 64);
  const base_upper_edge = new THREE.Mesh(base_upper_edgeGeom, glass_bodyMat);
  base_upper_edge.rotation.x = Math.PI / 2;
  base_upper_edge.position.y = 0.165;
  base_upper_edge.renderOrder = 2;
  glass_vessel.add(base_upper_edge);

  const inner_base_discGeom = new THREE.CylinderGeometry(0.315, 0.315, 0.026, 64);
  const inner_base_disc = new THREE.Mesh(inner_base_discGeom, glass_bodyMat);
  inner_base_disc.position.y = 0.166;
  inner_base_disc.renderOrder = 2;
  glass_vessel.add(inner_base_disc);

  const inner_base_ringGeom = new THREE.TorusGeometry(0.205, 0.012, 12, 56);
  const inner_base_ring = new THREE.Mesh(inner_base_ringGeom, glass_bodyMat);
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.188;
  inner_base_ring.renderOrder = 2;
  glass_vessel.add(inner_base_ring);

  const inner_base_centerGeom = new THREE.CylinderGeometry(0.075, 0.090, 0.012, 40);
  const inner_base_center = new THREE.Mesh(inner_base_centerGeom, glass_bodyMat);
  inner_base_center.position.y = 0.186;
  inner_base_center.renderOrder = 2;
  glass_vessel.add(inner_base_center);

  function glassRadiusAt(y) {
    if (y <= 0.16) return 0.367;
    if (y <= 0.20) return 0.367 + ((y - 0.16) / 0.04) * 0.018;
    const t = Math.min(1, Math.max(0, (y - 0.20) / 1.20));
    return 0.385 + t * 0.060;
  }

  function surfacePoint(angle, y, extra) {
    const radius = glassRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function createSurfaceLeafGeometry(
    angleStart,
    yStart,
    angleEnd,
    yEnd,
    bow,
    maxWidth,
    extra
  ) {
    const segments = 24;
    const vertices = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const sine = Math.sin(Math.PI * t);
      const angle = angleStart + (angleEnd - angleStart) * t + bow * sine;
      const centerY = yStart + (yEnd - yStart) * t + 0.018 * sine;
      const width = maxWidth * (0.012 + 0.988 * Math.pow(sine, 0.72));

      for (const side of [-1, 1]) {
        const edgeAngle = angle + side * width / glassRadiusAt(centerY);
        const edgeY = centerY + side * width * 0.55;
        const point = surfacePoint(edgeAngle, edgeY, extra);
        vertices.push(point.x, point.y, point.z);
      }
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, c, b, b, c, d);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createSurfaceStemGeometry(
    angle0,
    y0,
    angle1,
    y1,
    bow,
    radius
  ) {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const sine = Math.sin(Math.PI * t);
      const angle = angle0 + (angle1 - angle0) * t + bow * sine;
      const y = y0 + (y1 - y0) * t + 0.010 * sine;
      points.push(surfacePoint(angle, y, 0.012));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 28, radius, 7, false);
  }

  function createLeafVeinGeometry(
    angleStart,
    yStart,
    angleEnd,
    yEnd,
    bow,
    extra
  ) {
    const points = [];
    for (let i = 0; i <= 10; i++) {
      const t = 0.08 + (i / 10) * 0.84;
      const sine = Math.sin(Math.PI * t);
      const angle = angleStart + (angleEnd - angleStart) * t + bow * sine;
      const y =
        yStart +
        (yEnd - yStart) * t +
        0.018 * sine +
        0.002;
      points.push(surfacePoint(angle, y, extra));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 24, 0.0032, 6, false);
  }

  const gold_stemGeom = createSurfaceStemGeometry(
    0.55,
    0.680,
    0.89,
    0.965,
    -0.035,
    0.006
  );
  const gold_stem = new THREE.Mesh(gold_stemGeom, gold_leafMat);
  gold_stem.renderOrder = 4;
  gold_ornament.add(gold_stem);

  const gold_upper_twigGeom = createSurfaceStemGeometry(
    0.61,
    0.795,
    0.57,
    1.105,
    0.045,
    0.0045
  );
  const gold_upper_twig = new THREE.Mesh(gold_upper_twigGeom, gold_leafMat);
  gold_upper_twig.renderOrder = 4;
  gold_ornament.add(gold_upper_twig);

  const gold_middle_twigGeom = createSurfaceStemGeometry(
    0.64,
    0.850,
    0.73,
    1.035,
    -0.025,
    0.0038
  );
  const gold_middle_twig = new THREE.Mesh(gold_middle_twigGeom, gold_leafMat);
  gold_middle_twig.renderOrder = 4;
  gold_ornament.add(gold_middle_twig);

  const gold_left_leafGeom = createSurfaceLeafGeometry(
    0.60,
    0.805,
    1.58,
    0.625,
    -0.075,
    0.066,
    0.009
  );
  const gold_left_leaf = new THREE.Mesh(gold_left_leafGeom, gold_leafMat);
  gold_left_leaf.renderOrder = 3;
  gold_ornament.add(gold_left_leaf);

  const gold_right_leafGeom = createSurfaceLeafGeometry(
    0.59,
    0.825,
    0.48,
    0.455,
    0.060,
    0.058,
    0.010
  );
  const gold_right_leaf = new THREE.Mesh(gold_right_leafGeom, gold_leafMat);
  gold_right_leaf.renderOrder = 3;
  gold_ornament.add(gold_right_leaf);

  const gold_upper_leafGeom = createSurfaceLeafGeometry(
    0.60,
    0.840,
    0.57,
    1.115,
    -0.035,
    0.043,
    0.009
  );
  const gold_upper_leaf = new THREE.Mesh(gold_upper_leafGeom, gold_leafMat);
  gold_upper_leaf.renderOrder = 3;
  gold_ornament.add(gold_upper_leaf);

  const gold_left_leaf_veinGeom = createLeafVeinGeometry(
    0.60,
    0.805,
    1.58,
    0.625,
    -0.075,
    0.015
  );
  const gold_left_leaf_vein = new THREE.Mesh(
    gold_left_leaf_veinGeom,
    gold_veinMat
  );
  gold_left_leaf_vein.renderOrder = 5;
  gold_ornament.add(gold_left_leaf_vein);

  const gold_right_leaf_veinGeom = createLeafVeinGeometry(
    0.59,
    0.825,
    0.48,
    0.455,
    0.060,
    0.016
  );
  const gold_right_leaf_vein = new THREE.Mesh(
    gold_right_leaf_veinGeom,
    gold_veinMat
  );
  gold_right_leaf_vein.renderOrder = 5;
  gold_ornament.add(gold_right_leaf_vein);

  const gold_upper_leaf_veinGeom = createLeafVeinGeometry(
    0.60,
    0.840,
    0.57,
    1.115,
    -0.035,
    0.015
  );
  const gold_upper_leaf_vein = new THREE.Mesh(
    gold_upper_leaf_veinGeom,
    gold_veinMat
  );
  gold_upper_leaf_vein.renderOrder = 5;
  gold_ornament.add(gold_upper_leaf_vein);

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