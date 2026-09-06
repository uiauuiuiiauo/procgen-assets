export default function generate(THREE) {
  const root = new THREE.Group();

  const texture_width = 96;
  const texture_height = 384;
  const texture_data = new Uint8Array(texture_width * texture_height * 4);

  function fract(value) {
    return value - Math.floor(value);
  }

  for (let y = 0; y < texture_height; y++) {
    const v = y / (texture_height - 1);
    for (let x = 0; x < texture_width; x++) {
      const u = x / (texture_width - 1);
      const warp =
        u +
        0.012 * Math.sin(v * Math.PI * 8) +
        0.005 * Math.sin(v * Math.PI * 25);

      const broad = Math.sin(
        (warp * 11 + 0.08 * Math.sin(v * Math.PI * 5)) * Math.PI * 2
      );
      const grain = Math.sin(
        (warp * 31 + 0.12 * Math.sin(v * Math.PI * 13)) * Math.PI * 2
      );
      const fine = Math.sin(
        (warp * 73 + 0.08 * Math.sin(v * Math.PI * 31)) * Math.PI * 2
      );
      const pore = Math.pow(
        0.5 + 0.5 * Math.sin((warp * 19 + v * 0.7) * Math.PI * 2),
        12
      );

      const r = 166 + broad * 17 + grain * 8 + fine * 3 - pore * 28;
      const g = 82 + broad * 11 + grain * 5 + fine * 2 - pore * 17;
      const b = 29 + broad * 5 + grain * 2 - pore * 7;

      const index = (y * texture_width + x) * 4;
      texture_data[index] = Math.max(0, Math.min(255, Math.floor(r)));
      texture_data[index + 1] = Math.max(0, Math.min(255, Math.floor(g)));
      texture_data[index + 2] = Math.max(0, Math.min(255, Math.floor(b)));
      texture_data[index + 3] = 255;
    }
  }

  const woodTexture = new THREE.DataTexture(
    texture_data,
    texture_width,
    texture_height,
    THREE.RGBAFormat
  );
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.ClampToEdgeWrapping;
  woodTexture.magFilter = THREE.LinearFilter;
  woodTexture.minFilter = THREE.LinearFilter;
  if (THREE.SRGBColorSpace !== undefined) {
    woodTexture.colorSpace = THREE.SRGBColorSpace;
  }
  woodTexture.needsUpdate = true;

  const wooden_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: woodTexture,
    metalness: 0.0,
    roughness: 0.6
  });

  const wooden_bodyPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.000, -1.42, 0),
      new THREE.Vector3(-0.004, -1.05, 0),
      new THREE.Vector3(-0.007, -0.55, 0),
      new THREE.Vector3(-0.005, 0.00, 0),
      new THREE.Vector3(0.000, 0.55, 0),
      new THREE.Vector3(0.008, 1.00, 0),
      new THREE.Vector3(0.022, 1.27, 0),
      new THREE.Vector3(0.060, 1.39, 0),
      new THREE.Vector3(0.112, 1.455, 0),
      new THREE.Vector3(0.160, 1.445, 0)
    ],
    false,
    "centripetal",
    0.5
  );

  const wooden_bodyRadiusKeys = [
    [0.000, 0.043],
    [0.018, 0.060],
    [0.045, 0.073],
    [0.120, 0.076],
    [0.500, 0.078],
    [0.780, 0.077],
    [0.860, 0.073],
    [0.910, 0.064],
    [0.955, 0.046],
    [0.985, 0.022],
    [1.000, 0.000]
  ];

  function woodenBodyRadius(t) {
    for (let i = 0; i < wooden_bodyRadiusKeys.length - 1; i++) {
      const a = wooden_bodyRadiusKeys[i];
      const b = wooden_bodyRadiusKeys[i + 1];
      if (t <= b[0]) {
        const f = (t - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * f;
      }
    }
    return 0;
  }

  function createSweptGeometry(curve, tubularSegments, radialSegments, depthScale) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];
    const normal_z = new THREE.Vector3(0, 0, 1);
    const normal_side = new THREE.Vector3();

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const center = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t).normalize();

      normal_side.set(-tangent.y, tangent.x, 0).normalize();
      const radius = woodenBodyRadius(t);

      for (let j = 0; j < radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const cos_angle = Math.cos(angle);
        const sin_angle = Math.sin(angle);

        positions.push(
          center.x + normal_side.x * cos_angle * radius + normal_z.x * sin_angle * radius * depthScale,
          center.y + normal_side.y * cos_angle * radius + normal_z.y * sin_angle * radius * depthScale,
          center.z + normal_side.z * cos_angle * radius + normal_z.z * sin_angle * radius * depthScale
        );

        const nx = normal_side.x * cos_angle + normal_z.x * sin_angle;
        const ny = normal_side.y * cos_angle + normal_z.y * sin_angle;
        const nz = normal_side.z * cos_angle + normal_z.z * sin_angle;
        const normal_length = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        normals.push(
          nx / normal_length,
          ny / normal_length,
          nz / normal_length
        );
        uvs.push(j / radialSegments, t);
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const next_j = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + next_j;
        const d = i * radialSegments + next_j;
        indices.push(a, d, b, b, d, c);
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
    geometry.setAttribute(
      "uv",
      new THREE.Float32BufferAttribute(uvs, 2)
    );
    geometry.setIndex(indices);
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const wooden_bodyGeom = createSweptGeometry(
    wooden_bodyPath,
    128,
    24,
    0.72
  );
  const wooden_body = new THREE.Mesh(wooden_bodyGeom, wooden_bodyMat);
  root.add(wooden_body);

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