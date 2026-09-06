export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "faceted_crystal_heart";

  const crystal_heartMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide
  });

  const outline = [
    new THREE.Vector2(0.00, -0.64),
    new THREE.Vector2(0.10, -0.56),
    new THREE.Vector2(0.24, -0.44),
    new THREE.Vector2(0.39, -0.29),
    new THREE.Vector2(0.52, -0.12),
    new THREE.Vector2(0.61, 0.06),
    new THREE.Vector2(0.64, 0.24),
    new THREE.Vector2(0.62, 0.42),
    new THREE.Vector2(0.55, 0.56),
    new THREE.Vector2(0.45, 0.65),
    new THREE.Vector2(0.33, 0.69),
    new THREE.Vector2(0.21, 0.68),
    new THREE.Vector2(0.10, 0.63),
    new THREE.Vector2(0.00, 0.53),
    new THREE.Vector2(-0.10, 0.63),
    new THREE.Vector2(-0.21, 0.68),
    new THREE.Vector2(-0.33, 0.69),
    new THREE.Vector2(-0.45, 0.65),
    new THREE.Vector2(-0.55, 0.56),
    new THREE.Vector2(-0.62, 0.42),
    new THREE.Vector2(-0.64, 0.24),
    new THREE.Vector2(-0.61, 0.06),
    new THREE.Vector2(-0.52, -0.12),
    new THREE.Vector2(-0.39, -0.29),
    new THREE.Vector2(-0.24, -0.44),
    new THREE.Vector2(-0.10, -0.56)
  ];

  const front_center = new THREE.Vector3(0, 0.035, 0.235);
  const back_center = new THREE.Vector3(0, 0.025, -0.205);
  const front_outer = [];
  const back_outer = [];
  const front_inner = [];
  const back_inner = [];

  for (let i = 0; i < outline.length; i++) {
    const point = outline[i];
    const innerY = 0.055 + (point.y - 0.055) * 0.55;

    front_outer.push(new THREE.Vector3(point.x, point.y, 0.025));
    back_outer.push(new THREE.Vector3(point.x * 0.97, point.y, -0.045));
    front_inner.push(new THREE.Vector3(point.x * 0.58, innerY, 0.165));
    back_inner.push(new THREE.Vector3(point.x * 0.57, innerY, -0.145));
  }

  const positions = [];
  const colors = [];
  const facetPalette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xf4f7f8),
    new THREE.Color(0xdfe6ea),
    new THREE.Color(0xffffff),
    new THREE.Color(0xcbd5db),
    new THREE.Color(0xf8fafb),
    new THREE.Color(0xb8c5cd),
    new THREE.Color(0xe8eef1),
    new THREE.Color(0xfff1dc),
    new THREE.Color(0xdcecff)
  ];

  function addFacet(a, b, c, shade, faceForward) {
    let second = b;
    let third = c;

    const ux = second.x - a.x;
    const uy = second.y - a.y;
    const uz = second.z - a.z;
    const vx = third.x - a.x;
    const vy = third.y - a.y;
    const vz = third.z - a.z;

    const nx = uy * vz - uz * vy;
    const ny = uz * vx - ux * vz;
    const nz = ux * vy - uy * vx;

    const cx = (a.x + second.x + third.x) / 3;
    const cy = (a.y + second.y + third.y) / 3;
    const cz = (a.z + second.z + third.z) / 3;

    if (faceForward) {
      const normalZ = nz - nx * 0.12 + ny * 0.04;
      const normalY = ny + nx * 0.12 - ny * 0.04;
      const dot = cx * normalXSafe(nx) + cy * normalY + cz * normalZSafe(normalZ);
      if (dot < 0) {
        second = c;
        third = b;
      }
    }

    positions.push(
      a.x, a.y, a.z,
      second.x, second.y, second.z,
      third.x, third.y, third.z
    );

    const color = facetPalette[shade % facetPalette.length];
    for (let i = 0; i < 3; i++) {
      colors.push(color.r, color.g, color.b);
    }
  }

  function normalXSafe(value) {
    return value;
  }

  function normalZSafe(value) {
    return value;
  }

  const facetCount = outline.length;
  for (let i = 0; i < facetCount; i++) {
    const next = (i + 1) % facetCount;

    addFacet(
      front_outer[i],
      front_outer[next],
      front_inner[next],
      i * 3 + 1,
      true
    );
    addFacet(
      front_outer[i],
      front_inner[next],
      front_inner[i],
      i * 3 + 4,
      true
    );
    addFacet(
      front_inner[i],
      front_inner[next],
      front_center,
      i * 7 + 2,
      true
    );

    addFacet(
      back_outer[i],
      back_inner[next],
      back_outer[next],
      i * 3 + 6,
      false
    );
    addFacet(
      back_outer[i],
      back_inner[i],
      back_inner[next],
      i * 3 + 8,
      false
    );
    addFacet(
      back_inner[i],
      back_center,
      back_inner[next],
      i * 5 + 3,
      false
    );

    addFacet(
      front_outer[i],
      back_outer[next],
      front_outer[next],
      i * 2 + 5,
      true
    );
    addFacet(
      front_outer[i],
      back_outer[i],
      back_outer[next],
      i * 2 + 7,
      true
    );
  }

  const crystal_heartGeom = new THREE.BufferGeometry();
  crystal_heartGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  crystal_heartGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  crystal_heartGeom.computeVertexNormals();
  crystal_heartGeom.computeBoundingSphere();

  const crystal_heart = new THREE.Mesh(crystal_heartGeom, crystal_heartMat);
  crystal_heart.name = "crystal_heart";
  root.add(crystal_heart);

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