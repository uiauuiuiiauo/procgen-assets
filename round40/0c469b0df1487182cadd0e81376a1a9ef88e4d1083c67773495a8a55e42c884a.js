export default function generate(THREE) {
  const root = new THREE.Group();

  const gemstone_group = new THREE.Group();
  gemstone_group.name = "gemstone_group";
  gemstone_group.rotation.set(-0.28, -0.42, -0.18);
  root.add(gemstone_group);

  function signedPower(value, exponent) {
    return (value < 0 ? -1 : 1) * Math.pow(Math.abs(value), exponent);
  }

  function deformDirection(ox, oy, oz) {
    const length = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
    const nx = ox / length;
    const ny = oy / length;
    const nz = oz / length;

    const wobble =
      1 +
      0.018 * Math.sin(2.7 * nx + 1.4 * ny - 0.8 * nz) +
      0.012 * Math.sin(4.1 * nz - 1.8 * nx) +
      0.008 * Math.cos(3.2 * ny + 1.1 * nz);

    let px = signedPower(nx, 0.62) * 0.60 * wobble;
    let py = signedPower(ny, 0.62) * 0.50 * wobble;
    const pz = signedPower(nz, 0.62) * 0.53 * wobble;

    px += 0.012 * (1 - ny * ny) * nz;
    py +=
      0.024 * nx * (0.35 + 0.65 * (1 - ny * ny)) +
      0.010 * (1 - ny * ny) * nz;

    return new THREE.Vector3(px, py, pz);
  }

  function surfacePoint(ox, oy, oz, offset) {
    const point = deformDirection(ox, oy, oz);
    const normal = new THREE.Vector3(
      point.x / (0.60 * 0.60),
      point.y / (0.50 * 0.50),
      point.z / (0.53 * 0.53)
    ).normalize();
    return point.addScaledVector(normal, offset);
  }

  function surfaceNormal(ox, oy, oz) {
    const point = deformDirection(ox, oy, oz);
    return new THREE.Vector3(
      point.x / (0.60 * 0.60),
      point.y / (0.50 * 0.50),
      point.z / (0.53 * 0.53)
    ).normalize();
  }

  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0x007a48,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    thickness: 0.45,
    attenuationColor: 0x00683c,
    attenuationDistance: 1.2,
    transparent: true,
    depthWrite: false
  });

  const gemstoneGeom = new THREE.SphereGeometry(1, 64, 40);
  const gemstonePositions = gemstoneGeom.attributes.position;

  for (let i = 0; i < gemstonePositions.count; i++) {
    const point = deformDirection(
      gemstonePositions.getX(i),
      gemstonePositions.getY(i),
      gemstonePositions.getZ(i)
    );
    gemstonePositions.setXYZ(i, point.x, point.y, point.z);
  }

  gemstonePositions.needsUpdate = true;
  gemstoneGeom.computeVertexNormals();
  gemstoneGeom.computeBoundingBox();
  gemstoneGeom.computeBoundingSphere();

  const gemstone = new THREE.Mesh(gemstoneGeom, gemstoneMat);
  gemstone.name = "gemstone";
  gemstone.renderOrder = 2;
  gemstone_group.add(gemstone);

  const decal_forward = new THREE.Vector3(0, 0, 1);

  function placeSurfaceDecal(mesh, ox, oy, oz, rotation, offset) {
    const normal = surfaceNormal(ox, oy, oz);
    mesh.position.copy(surfacePoint(ox, oy, oz, offset));
    mesh.quaternion.setFromUnitVectors(decal_forward, normal);
    mesh.rotateZ(rotation);
  }

  const highlight_glowMat = new THREE.MeshStandardMaterial({
    color: 0xb8e4d2,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.08,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const highlight_glowGeom = new THREE.CircleGeometry(0.5, 40);
  const highlight_glow = new THREE.Mesh(highlight_glowGeom, highlight_glowMat);
  highlight_glow.name = "highlight_glow";
  highlight_glow.scale.set(0.42, 0.14, 1);
  highlight_glow.renderOrder = 4;
  placeSurfaceDecal(highlight_glow, -0.16, 0.55, 0.82, -0.12, 0.006);
  gemstone_group.add(highlight_glow);

  const surface_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xd0eee2,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const surface_highlightGeom = new THREE.CircleGeometry(0.5, 40);
  const surface_highlight = new THREE.Mesh(
    surface_highlightGeom,
    surface_highlightMat
  );
  surface_highlight.name = "surface_highlight";
  surface_highlight.scale.set(0.34, 0.095, 1);
  surface_highlight.renderOrder = 5;
  placeSurfaceDecal(surface_highlight, -0.16, 0.55, 0.82, -0.12, 0.009);
  gemstone_group.add(surface_highlight);

  const internal_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x002919,
    metalness: 0.0,
    roughness: 0.7
  });

  const internal_inclusionsGeom = new THREE.IcosahedronGeometry(0.018, 1);
  const inclusionData = [
    [-0.24, 0.04, 0.48, 1.1, 0.7, 1.5, 0.2, 0.4, 0.1],
    [-0.08, -0.18, 0.54, 0.7, 1.0, 0.8, 0.8, 0.1, 0.5],
    [0.12, 0.10, 0.50, 0.6, 0.8, 1.2, 0.3, 0.7, 0.4],
    [0.27, -0.14, 0.42, 1.0, 0.6, 0.7, 0.5, 0.2, 0.8],
    [0.34, 0.18, 0.34, 0.5, 0.8, 1.1, 0.1, 0.6, 0.3],
    [-0.34, -0.20, 0.36, 0.8, 1.2, 0.6, 0.7, 0.3, 0.2],
    [0.02, -0.34, 0.40, 0.5, 0.7, 1.3, 0.4, 0.9, 0.1],
    [0.18, 0.32, 0.30, 0.7, 0.5, 0.8, 0.9, 0.2, 0.6],
    [-0.14, 0.28, 0.38, 0.5, 0.9, 0.6, 0.2, 0.5, 0.8]
  ];

  const internal_inclusions = new THREE.InstancedMesh(
    internal_inclusionsGeom,
    internal_inclusionsMat,
    inclusionData.length
  );
  internal_inclusions.name = "internal_inclusions";

  const inclusion_dummy = new THREE.Object3D();
  for (let i = 0; i < inclusionData.length; i++) {
    const data = inclusionData[i];
    inclusion_dummy.position.set(data[0], data[1], data[2]);
    inclusion_dummy.scale.set(data[3], data[4], data[5]);
    inclusion_dummy.rotation.set(data[6], data[7], data[8]);
    inclusion_dummy.updateMatrix();
    internal_inclusions.setMatrixAt(i, inclusion_dummy.matrix);
  }
  internal_inclusions.instanceMatrix.needsUpdate = true;
  gemstone_group.add(internal_inclusions);

  const mineral_specksMat = new THREE.MeshStandardMaterial({
    color: 0xa8c7b5,
    metalness: 0.0,
    roughness: 0.7
  });

  const mineral_specksGeom = new THREE.SphereGeometry(0.006, 8, 6);
  const speckData = [
    [-0.38, 0.18, 0.42, 0.7],
    [-0.22, -0.26, 0.52, 0.9],
    [-0.04, 0.22, 0.56, 0.6],
    [0.10, -0.12, 0.55, 0.8],
    [0.24, 0.28, 0.45, 0.6],
    [0.36, -0.04, 0.38, 1.0],
    [0.18, -0.34, 0.42, 0.7],
    [-0.30, 0.34, 0.34, 0.5],
    [0.40, 0.16, 0.28, 0.6],
    [-0.08, 0.02, 0.60, 0.5],
    [0.28, 0.06, 0.50, 0.55],
    [-0.42, -0.08, 0.28, 0.65]
  ];

  const mineral_specks = new THREE.InstancedMesh(
    mineral_specksGeom,
    mineral_specksMat,
    speckData.length
  );
  mineral_specks.name = "mineral_specks";

  const speck_dummy = new THREE.Object3D();
  for (let i = 0; i < speckData.length; i++) {
    const data = speckData[i];
    speck_dummy.position.set(data[0], data[1], data[2]);
    speck_dummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    speck_dummy.scale.setScalar(data[3]);
    speck_dummy.updateMatrix();
    mineral_specks.setMatrixAt(i, speck_dummy.matrix);
  }
  mineral_specks.instanceMatrix.needsUpdate = true;
  gemstone_group.add(mineral_specks);

  const surface_specksMat = new THREE.MeshStandardMaterial({
    color: 0xb5d4c5,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const surface_specksGeom = new THREE.CircleGeometry(0.009, 10);
  const surfaceSpeckDirections = [
    [-0.48, 0.18, 0.86],
    [-0.28, -0.34, 0.90],
    [0.02, 0.38, 0.92],
    [0.30, 0.20, 0.93],
    [0.46, -0.12, 0.88],
    [-0.12, -0.50, 0.86],
    [0.18, -0.42, 0.89],
    [-0.52, -0.04, 0.85],
    [0.38, 0.42, 0.82],
    [-0.06, 0.62, 0.78],
    [0.54, 0.08, 0.84],
    [-0.36, 0.42, 0.83]
  ];

  const surface_specks = new THREE.InstancedMesh(
    surface_specksGeom,
    surface_specksMat,
    surfaceSpeckDirections.length
  );
  surface_specks.name = "surface_specks";
  surface_specks.renderOrder = 6;

  const surface_speck_dummy = new THREE.Object3D();
  for (let i = 0; i < surfaceSpeckDirections.length; i++) {
    const direction = surfaceSpeckDirections[i];
    const normal = surfaceNormal(direction[0], direction[1], direction[2]);
    surface_speck_dummy.position.copy(
      surfacePoint(direction[0], direction[1], direction[2], 0.006)
    );
    surface_speck_dummy.quaternion.setFromUnitVectors(
      decal_forward,
      normal
    );
    surface_speck_dummy.rotateZ(i * 0.73);
    const scale = 0.48 + (i % 4) * 0.18;
    surface_speck_dummy.scale.set(scale, scale * (0.72 + (i % 3) * 0.12), 1);
    surface_speck_dummy.updateMatrix();
    surface_specks.setMatrixAt(i, surface_speck_dummy.matrix);
  }
  surface_specks.instanceMatrix.needsUpdate = true;
  gemstone_group.add(surface_specks);

  const dark_surface_specksMat = new THREE.MeshStandardMaterial({
    color: 0x00251a,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const dark_surface_specksGeom = new THREE.CircleGeometry(0.010, 10);
  const darkSpeckDirections = [
    [-0.18, 0.08, 0.98],
    [0.16, -0.24, 0.96],
    [0.36, 0.12, 0.92],
    [-0.40, -0.18, 0.90],
    [0.06, 0.48, 0.88],
    [0.44, -0.28, 0.86]
  ];

  const dark_surface_specks = new THREE.InstancedMesh(
    dark_surface_specksGeom,
    dark_surface_specksMat,
    darkSpeckDirections.length
  );
  dark_surface_specks.name = "dark_surface_specks";

  const dark_speck_dummy = new THREE.Object3D();
  for (let i = 0; i < darkSpeckDirections.length; i++) {
    const direction = darkSpeckDirections[i];
    const normal = surfaceNormal(direction[0], direction[1], direction[2]);
    dark_speck_dummy.position.copy(
      surfacePoint(direction[0], direction[1], direction[2], 0.007)
    );
    dark_speck_dummy.quaternion.setFromUnitVectors(
      decal_forward,
      normal
    );
    dark_speck_dummy.rotateZ(i * 1.07);
    const scale = 0.55 + (i % 3) * 0.24;
    dark_speck_dummy.scale.set(scale, scale * (0.55 + (i % 2) * 0.35), 1);
    dark_speck_dummy.updateMatrix();
    dark_surface_specks.setMatrixAt(i, dark_speck_dummy.matrix);
  }
  dark_surface_specks.instanceMatrix.needsUpdate = true;
  gemstone_group.add(dark_surface_specks);

  const fissureMat = new THREE.MeshStandardMaterial({
    color: 0xa7cbb9,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });

  function createFissure(name, directionData, radius) {
    const points = [];
    for (let i = 0; i < directionData.length; i++) {
      const direction = directionData[i];
      points.push(surfacePoint(direction[0], direction[1], direction[2], 0.005));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 20, radius, 6, false);
    const mesh = new THREE.Mesh(geometry, fissureMat);
    mesh.name = name;
    mesh.renderOrder = 6;
    return mesh;
  }

  const surface_fissure_left = createFissure(
    "surface_fissure_left",
    [
      [-0.42, 0.30, 0.86],
      [-0.46, 0.23, 0.86],
      [-0.43, 0.15, 0.89],
      [-0.49, 0.08, 0.87],
      [-0.45, 0.00, 0.89]
    ],
    0.0028
  );
  gemstone_group.add(surface_fissure_left);

  const surface_fissure_right = createFissure(
    "surface_fissure_right",
    [
      [0.28, -0.22, 0.94],
      [0.34, -0.28, 0.90],
      [0.39, -0.34, 0.86],
      [0.44, -0.39, 0.81],
      [0.47, -0.44, 0.76]
    ],
    0.0025
  );
  gemstone_group.add(surface_fissure_right);

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