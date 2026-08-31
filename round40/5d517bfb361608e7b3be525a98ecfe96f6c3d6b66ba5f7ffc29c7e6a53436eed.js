export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "basketball";

  const ballRadius = 1;
  const seamRadius = 0.018;
  const surfaceRadius = 1.001;

  const basketball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf36f21,
    metalness: 0.0,
    roughness: 0.8,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const black_panelMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const orange_pebblesMat = new THREE.MeshStandardMaterial({
    color: 0xf98535,
    metalness: 0.0,
    roughness: 0.8,
  });
  const black_pebblesMat = new THREE.MeshStandardMaterial({
    color: 0x292929,
    metalness: 0.0,
    roughness: 0.8,
  });

  const basketball_bodyGeom = new THREE.SphereGeometry(ballRadius, 96, 64);
  const basketball_body = new THREE.Mesh(basketball_bodyGeom, basketball_bodyMat);
  basketball_body.name = "basketball_body";
  root.add(basketball_body);

  function makeGreatCircleGeometry(basisY, basisZ, radius) {
    const basisX = new THREE.Vector3(1, 0, 0);
    const circleBasisY = basisY.clone().normalize();
    const circleBasisZ = basisZ.clone().normalize();
    const points = [];
    const pointCount = 72;

    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(
        new THREE.Vector3()
          .addScaledVector(basisX, Math.cos(angle))
          .addScaledVector(circleBasisY, Math.sin(angle) * 0.70710678)
          .addScaledVector(circleBasisZ, Math.sin(angle) * 0.70710678)
          .normalize()
          .multiplyScalar(radius)
      );
    }

    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 144, seamRadius, 8, true);
  }

  function makeProjectedPathGeometry(path2d, radius) {
    const points = [];
    const subdivisions = 5;

    for (let i = 0; i < path2d.length - 1; i++) {
      const start = path2d[i];
      const end = path2d[i + 1];

      for (let j = 0; j <= subdivisions; j++) {
        if (i > 0 && j === 0) continue;

        const t = j / subdivisions;
        const x = start[0] + (end[0] - start[0]) * t;
        const y = start[1] + (end[1] - start[1]) * t;
        const z = Math.sqrt(Math.max(0.0001, 1 - x * x - y * y));

        points.push(
          new THREE.Vector3(x, y, z)
            .normalize()
            .multiplyScalar(radius)
        );
      }
    }

    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(
      curve,
      Math.max(32, points.length * 2),
      seamRadius,
      8,
      false
    );
  }

  const horizontal_basis_y = new THREE.Vector3(0, 1, 0);
  const horizontal_basis_z = new THREE.Vector3(0, 0, 1);
  const diagonal_basis_y = new THREE.Vector3(0, 1, 0);
  const diagonal_basis_z = new THREE.Vector3(1, 0, 0);
  const vertical_basis_y = new THREE.Vector3(1, 0, 0);
  const vertical_basis_z = new THREE.Vector3(0, 0, 1);

  const seam_horizontalGeom = makeGreatCircleGeometry(
    horizontal_basis_y,
    horizontal_basis_z,
    0.997
  );
  const seam_horizontal = new THREE.Mesh(seam_horizontalGeom, seamMat);
  seam_horizontal.name = "seam_horizontal";
  root.add(seam_horizontal);

  const seam_diagonal_leftGeom = makeGreatCircleGeometry(
    diagonal_basis_y,
    diagonal_basis_z,
    0.997
  );
  const seam_diagonal_left = new THREE.Mesh(seam_diagonal_leftGeom, seamMat);
  seam_diagonal_left.name = "seam_diagonal_left";
  root.add(seam_diagonal_left);

  const seam_diagonal_rightGeom = makeGreatCircleGeometry(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(-1, 0, 0),
    0.997
  );
  const seam_diagonal_right = new THREE.Mesh(seam_diagonal_rightGeom, seamMat);
  seam_diagonal_right.name = "seam_diagonal_right";
  root.add(seam_diagonal_right);

  const seam_verticalGeom = makeGreatCircleGeometry(
    vertical_basis_y,
    vertical_basis_z,
    0.997
  );
  const seam_vertical = new THREE.Mesh(seam_verticalGeom, seamMat);
  seam_vertical.name = "seam_vertical";
  root.add(seam_vertical);

  function pointInPolygon(x, y, polygon) {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];
      const crosses =
        (yi > y) !== (yj > y) &&
        x < (xj - xi) * (y - yi) / (yj - yi) + xi;

      if (crosses) inside = !inside;
    }

    return inside;
  }

  function makeSphericalPatch(polygon, radius, divisions) {
    let minX = polygon[0][0];
    let maxX = polygon[0][0];
    let minY = polygon[0][1];
    let maxY = polygon[0][1];

    for (let i = 1; i < polygon.length; i++) {
      minX = Math.min(minX, polygon[i][0]);
      maxX = Math.max(maxX, polygon[i][0]);
      minY = Math.min(minY, polygon[i][1]);
      maxY = Math.max(maxY, polygon[i][1]);
    }

    const positions = [];
    const normals = [];
    const dx = (maxX - minX) / divisions;
    const dy = (maxY - minY) / divisions;

    function appendVertex(x, y) {
      const z = Math.sqrt(Math.max(0.0001, 1 - x * x - y * y));
      const nx = x / radius;
      const ny = y / radius;
      const nz = z / radius;

      positions.push(x, y, z);
      normals.push(nx, ny, nz);
    }

    for (let iy = 0; iy < divisions; iy++) {
      const y0 = minY + iy * dy;
      const y1 = y0 + dy;
      const cy = (y0 + y1) * 0.5;

      for (let ix = 0; ix < divisions; ix++) {
        const x0 = minX + ix * dx;
        const x1 = x0 + dx;
        const cx = (x0 + x1) * 0.5;

        if (!pointInPolygon(cx, cy, polygon)) continue;

        appendVertex(x0, y0);
        appendVertex(x1, y0);
        appendVertex(x1, y1);

        appendVertex(x0, y0);
        appendVertex(x1, y1);
        appendVertex(x0, y1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
    geometry.computeBoundingSphere();
    return geometry;
  }

  const top_black_panel_points = [
    [-0.28, 0.80],
    [-0.08, 0.95],
    [0.30, 0.90],
    [0.20, 0.76],
    [-0.10, 0.72],
  ];
  const top_black_panelGeom = makeSphericalPatch(
    top_black_panel_points,
    1.004,
    30
  );
  const top_black_panel = new THREE.Mesh(top_black_panelGeom, black_panelMat);
  top_black_panel.name = "top_black_panel";
  root.add(top_black_panel);

  const lower_left_black_panel_points = [
    [-0.58, -0.56],
    [-0.47, -0.33],
    [-0.18, -0.50],
    [0.25, -0.72],
    [0.18, -0.86],
    [-0.35, -0.82],
    [-0.56, -0.68],
  ];
  const lower_left_black_panelGeom = makeSphericalPatch(
    lower_left_black_panel_points,
    1.004,
    30
  );
  const lower_left_black_panel = new THREE.Mesh(
    lower_left_black_panelGeom,
    black_panelMat
  );
  lower_left_black_panel.name = "lower_left_black_panel";
  root.add(lower_left_black_panel);

  const lower_right_black_panel_points = [
    [0.53, -0.56],
    [0.72, -0.45],
    [0.78, -0.62],
    [0.62, -0.80],
    [0.48, -0.69],
  ];
  const lower_right_black_panelGeom = makeSphericalPatch(
    lower_right_black_panel_points,
    1.004,
    30
  );
  const lower_right_black_panel = new THREE.Mesh(
    lower_right_black_panelGeom,
    black_panelMat
  );
  lower_right_black_panel.name = "lower_right_black_panel";
  root.add(lower_right_black_panel);

  const top_black_panel_outlineGeom = makeProjectedPathGeometry(
    top_black_panel_points,
    1.008
  );
  const top_black_panel_outline = new THREE.Mesh(
    top_black_panel_outlineGeom,
    seamMat
  );
  top_black_panel_outline.name = "top_black_panel_outline";
  root.add(top_black_panel_outline);

  const lower_left_black_panel_outlineGeom = makeProjectedPathGeometry(
    lower_left_black_panel_points,
    1.008
  );
  const lower_left_black_panel_outline = new THREE.Mesh(
    lower_left_black_panel_outlineGeom,
    seamMat
  );
  lower_left_black_panel_outline.name = "lower_left_black_panel_outline";
  root.add(lower_left_black_panel_outline);

  const lower_right_black_panel_outlineGeom = makeProjectedPathGeometry(
    lower_right_black_panel_points,
    1.008
  );
  const lower_right_black_panel_outline = new THREE.Mesh(
    lower_right_black_panel_outlineGeom,
    seamMat
  );
  lower_right_black_panel_outline.name = "lower_right_black_panel_outline";
  root.add(lower_right_black_panel_outline);

  const blackRegions = [
    top_black_panel_points,
    lower_left_black_panel_points,
    lower_right_black_panel_points,
  ];

  function isBlackSurfacePoint(x, y, z) {
    if (z < 0.15) return false;

    for (let i = 0; i < blackRegions.length; i++) {
      if (pointInPolygon(x, y, blackRegions[i])) return true;
    }

    return false;
  }

  const orangePebbleData = [];
  const blackPebbleData = [];
  const pebbleCount = 12000;
  const goldenAngle = 2.399963229728653;

  for (let i = 0; i < pebbleCount; i++) {
    const y = 1 - 2 * (i + 0.5) / pebbleCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    const x = Math.cos(angle) * radial;
    const z = Math.sin(angle) * radial;
    const size = 0.9 + (i % 7) * 0.025;
    const twist = (i % 13) / 13 * Math.PI * 2;

    const data = {
      x: x,
      y: y,
      z: z,
      size: size,
      twist: twist,
    };

    if (isBlackSurfacePoint(x, y, z)) {
      blackPebbleData.push(data);
    } else {
      orangePebbleData.push(data);
    }
  }

  const pebbleGeom = new THREE.SphereGeometry(0.0145, 6, 4);
  const orange_pebbles = new THREE.InstancedMesh(
    pebbleGeom,
    orange_pebblesMat,
    orangePebbleData.length
  );
  orange_pebbles.name = "orange_pebbles";

  const black_pebbles = new THREE.InstancedMesh(
    pebbleGeom,
    black_pebblesMat,
    blackPebbleData.length
  );
  black_pebbles.name = "black_pebbles";

  const pebble_dummy = new THREE.Object3D();
  const pebble_normal = new THREE.Vector3();
  const pebble_up = new THREE.Vector3(0, 1, 0);

  function fillPebbles(instancedMesh, dataList, radius) {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];

      pebble_normal.set(data.x, data.y, data.z).normalize();
      pebble_dummy.position.copy(pebble_normal).multiplyScalar(radius);
      pebble_dummy.quaternion.setFromUnitVectors(pebble_up, pebble_normal);
      pebble_dummy.rotateY(data.twist);
      pebble_dummy.scale.set(
        data.size * 1.12,
        data.size * 0.42,
        data.size * 0.82
      );
      pebble_dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, pebble_dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  fillPebbles(orange_pebbles, orangePebbleData, surfaceRadius);
  fillPebbles(black_pebbles, blackPebbleData, 1.006);

  root.add(orange_pebbles);
  root.add(black_pebbles);

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