export default function generate(THREE) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wood_grainMat = new THREE.MeshStandardMaterial({
    color: 0x713716,
    metalness: 0.0,
    roughness: 0.6,
  });

  const wood_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xf2c99a,
    metalness: 0.0,
    roughness: 0.6,
    transparent: true,
    opacity: 0.55,
  });

  const shaftPathPoints = [
    new THREE.Vector3(0.000, -2.60, 0),
    new THREE.Vector3(-0.005, -2.20, 0),
    new THREE.Vector3(-0.012, -1.60, 0),
    new THREE.Vector3(-0.018, -0.80, 0),
    new THREE.Vector3(-0.022, 0.00, 0),
    new THREE.Vector3(-0.020, 0.80, 0),
    new THREE.Vector3(-0.012, 1.50, 0),
    new THREE.Vector3(-0.002, 2.10, 0),
    new THREE.Vector3(0.018, 2.40, 0),
    new THREE.Vector3(0.070, 2.56, 0),
    new THREE.Vector3(0.140, 2.64, 0),
  ];

  const shaft_curve = new THREE.CatmullRomCurve3(
    shaftPathPoints,
    false,
    "centripetal"
  );

  function shaftRadius(t) {
    if (t < 0.04) {
      const q = t / 0.04;
      return 0.098 * Math.sqrt(Math.max(0, 1 - (1 - q) * (1 - q)));
    }
    if (t <= 0.84) {
      const u = (t - 0.04) / 0.80;
      return 0.098 + 0.010 * u + 0.0015 * Math.sin(u * Math.PI);
    }
    const u = (t - 0.84) / 0.16;
    return 0.108 * Math.sqrt(Math.max(0, 1 - u * u));
  }

  const longitudinalSegments = 112;
  const radialSegments = 24;
  const positions = [];
  const colors = [];
  const indices = [];

  const baseColor = new THREE.Color(0xb66a2d);
  const lightColor = new THREE.Color(0xe0a05a);
  const darkColor = new THREE.Color(0x773916);

  for (let i = 0; i <= longitudinalSegments; i++) {
    const t = i / longitudinalSegments;
    const center = shaft_curve.getPoint(t);
    const tangent = shaft_curve.getTangent(t).normalize();
    const normalX = -tangent.y;
    const normalY = tangent.x;
    const radius = shaftRadius(t);

    for (let j = 0; j <= radialSegments; j++) {
      const angle = j / radialSegments * Math.PI * 2;
      const cosAngle = Math.cos(angle);
      const sinAngle = Math.sin(angle);

      positions.push(
        center.x + normalX * radius * cosAngle,
        center.y + normalY * radius * cosAngle,
        radius * sinAngle
      );

      const grain =
        0.50 +
        0.25 * Math.sin(angle * 3 + t * 17) +
        0.20 * Math.sin(angle * 7 - t * 31) +
        0.05 * Math.sin(t * 105 + angle * 2);

      const tone = Math.max(0.18, Math.min(0.92, grain));
      const sideLight = 0.5 + 0.5 * Math.cos(angle - 2.25);
      const highlight = Math.max(0, sideLight - 0.74) / 0.26;

      const red =
        baseColor.r * (0.62 + tone * 0.48) * (1 + highlight * 0.28);
      const green =
        baseColor.g * (0.62 + tone * 0.48) * (1 + highlight * 0.34);
      const blue =
        baseColor.b * (0.62 + tone * 0.48) * (1 + highlight * 0.30);

      colors.push(
        Math.min(1, red),
        Math.min(1, green),
        Math.min(1, blue)
      );
    }
  }

  const ringSize = radialSegments + 1;
  for (let i = 0; i < longitudinalSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * ringSize + j;
      const b = (i + 1) * ringSize + j;
      const c = b + 1;
      const d = a + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const shaftGeom = new THREE.BufferGeometry();
  shaftGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  shaftGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  shaftGeom.setIndex(indices);
  shaftGeom.computeVertexNormals();

  const shaft = new THREE.Mesh(shaftGeom, woodMat);
  root.add(shaft);

  function makeSurfaceLine(startT, endT, lateral, radius) {
    const points = [];
    const samples = 18;

    for (let i = 0; i <= samples; i++) {
      const t = startT + (endT - startT) * (i / samples);
      const center = shaft_curve.getPoint(t);
      const tangent = shaft_curve.getTangent(t).normalize();
      const normalX = -tangent.y;
      const normalY = tangent.x;
      const surfaceRadius = shaftRadius(t);
      const offset = lateral * surfaceRadius;
      const front = Math.sqrt(
        Math.max(0, surfaceRadius * surfaceRadius - offset * offset)
      );

      points.push(
        new THREE.Vector3(
          center.x + normalX * offset,
          center.y + normalY * offset,
          front + 0.0015
        )
      );
    }

    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      28,
      radius,
      6,
      false
    );
  }

  const wood_grain = new THREE.Group();

  const grain_line_leftGeom = makeSurfaceLine(0.05, 0.76, -0.54, 0.0022);
  const grain_line_left = new THREE.Mesh(
    grain_line_leftGeom,
    wood_grainMat
  );
  wood_grain.add(grain_line_left);

  const grain_line_centerGeom = makeSurfaceLine(0.12, 0.88, -0.08, 0.0018);
  const grain_line_center = new THREE.Mesh(
    grain_line_centerGeom,
    wood_grainMat
  );
  wood_grain.add(grain_line_center);

  const grain_line_rightGeom = makeSurfaceLine(0.03, 0.58, 0.43, 0.0020);
  const grain_line_right = new THREE.Mesh(
    grain_line_rightGeom,
    wood_grainMat
  );
  wood_grain.add(grain_line_right);

  root.add(wood_grain);

  const wood_highlightGeom = makeSurfaceLine(0.07, 0.94, -0.32, 0.008);
  const wood_highlight = new THREE.Mesh(
    wood_highlightGeom,
    wood_highlightMat
  );
  root.add(wood_highlight);

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