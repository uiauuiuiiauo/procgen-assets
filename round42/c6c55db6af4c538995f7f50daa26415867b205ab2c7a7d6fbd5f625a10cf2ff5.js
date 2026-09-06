export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ice_cream_pop";

  const popsicle = new THREE.Group();
  popsicle.name = "popsicle";
  popsicle.rotation.z = -0.56;
  root.add(popsicle);

  const scoopRx = 0.36;
  const scoopRy = 0.39;
  const scoopRz = 0.35;
  const scoopY = 0.16;

  const scoopMat = new THREE.MeshStandardMaterial({
    color: 0xff2343,
    metalness: 0.0,
    roughness: 0.9,
  });
  const stickMat = new THREE.MeshStandardMaterial({
    color: 0xf20b32,
    metalness: 0.0,
    roughness: 0.3,
  });
  const creviceMat = new THREE.MeshStandardMaterial({
    color: 0xb90929,
    metalness: 0.0,
    roughness: 0.9,
  });
  const frostMat = new THREE.MeshStandardMaterial({
    color: 0xff7b8d,
    metalness: 0.0,
    roughness: 0.9,
  });

  const stickShape = new THREE.Shape();
  const stickHalfW = 0.095;
  const stickTopY = -0.02;
  const stickBottomY = -0.64;
  const stickRadius = 0.09;

  stickShape.moveTo(-stickHalfW, stickTopY);
  stickShape.lineTo(stickHalfW, stickTopY);
  stickShape.lineTo(stickHalfW, stickBottomY + stickRadius);
  stickShape.quadraticCurveTo(
    stickHalfW,
    stickBottomY,
    0,
    stickBottomY
  );
  stickShape.quadraticCurveTo(
    -stickHalfW,
    stickBottomY,
    -stickHalfW,
    stickBottomY + stickRadius
  );
  stickShape.lineTo(-stickHalfW, stickTopY);
  stickShape.closePath();

  const stickGeom = new THREE.ExtrudeGeometry(stickShape, {
    depth: 0.11,
    steps: 1,
    curveSegments: 16,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 4,
  });
  const stick = new THREE.Mesh(stickGeom, stickMat);
  stick.name = "stick";
  stick.position.z = -0.055;
  popsicle.add(stick);

  const scoopGeom = new THREE.SphereGeometry(1, 64, 40);
  const scoopPosition = scoopGeom.attributes.position;

  for (let i = 0; i < scoopPosition.count; i++) {
    const nx = scoopPosition.getX(i);
    const ny = scoopPosition.getY(i);
    const nz = scoopPosition.getZ(i);

    const broadVariation =
      Math.sin(nx * 13 + ny * 7) *
      Math.sin(nz * 11 - ny * 5);
    const grainVariation =
      Math.sin(nx * 41 + nz * 29 + ny * 17) *
      Math.sin(ny * 37 - nz * 19);

    let radial =
      1 +
      broadVariation * 0.009 +
      grainVariation * 0.0035;

    if (ny < -0.78) {
      radial +=
        0.018 *
        Math.sin(nx * 19 + nz * 23) *
        (-ny - 0.78) / 0.22;
    }

    const x = nx * scoopRx * radial;
    const y =
      scoopY +
      ny * scoopRy * radial +
      Math.sin(nx * 17 + nz * 9) * 0.0018;
    const z = nz * scoopRz * radial;

    scoopPosition.setXYZ(i, x, y, z);
  }

  scoopPosition.needsUpdate = true;
  scoopGeom.computeVertexNormals();
  scoopGeom.computeBoundingBox();
  scoopGeom.computeBoundingSphere();

  const scoop = new THREE.Mesh(scoopGeom, scoopMat);
  scoop.name = "scoop";
  popsicle.add(scoop);

  function surfacePoint(x, y, offset) {
    const dx = x / scoopRx;
    const dy = (y - scoopY) / scoopRy;
    const remaining = Math.max(0.002, 1 - dx * dx - dy * dy);
    const z = scoopRz * Math.sqrt(remaining);

    const normal = new THREE.Vector3(
      x / (scoopRx * scoopRx),
      (y - scoopY) / (scoopRy * scoopRy),
      z / (scoopRz * scoopRz)
    ).normalize();

    return new THREE.Vector3(x, y, z).addScaledVector(normal, offset);
  }

  function surfaceNormal(x, y) {
    const point = surfacePoint(x, y, 0);
    return new THREE.Vector3(
      point.x / (scoopRx * scoopRx),
      (point.y - scoopY) / (scoopRy * scoopRy),
      point.z / (scoopRz * scoopRz)
    ).normalize();
  }

  function createSurfaceTube(name, coordinates, radius, material) {
    const points = [];
    for (const coordinate of coordinates) {
      points.push(surfacePoint(coordinate[0], coordinate[1], 0.001));
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      Math.max(12, coordinates.length * 5),
      radius,
      7,
      false
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }

  const scoop_rim_points = [];
  const rimCount = 48;
  for (let i = 0; i < rimCount; i++) {
    const angle = i / rimCount * Math.PI * 2;
    const wave =
      Math.sin(angle * 3) * 0.011 +
      Math.sin(angle * 7 + 0.4) * 0.006;
    const x = Math.cos(angle) * (0.326 + wave);
    const y =
      scoopY -
      0.018 +
      Math.sin(angle) * (0.346 + wave * 0.7);
    scoop_rim_points.push(surfacePoint(x, y, 0.001));
  }

  const scoop_rim_curve = new THREE.CatmullRomCurve3(
    scoop_rim_points,
    true,
    "centripetal"
  );
  const scoop_rimGeom = new THREE.TubeGeometry(
    scoop_rim_curve,
    112,
    0.014,
    8,
    true
  );
  const scoop_rim = new THREE.Mesh(scoop_rimGeom, scoopMat);
  scoop_rim.name = "scoop_rim";
  popsicle.add(scoop_rim);

  const surface_details = new THREE.Group();
  surface_details.name = "surface_details";
  popsicle.add(surface_details);

  const upper_crease = createSurfaceTube(
    "upper_crease",
    [
      [-0.245, 0.285],
      [-0.205, 0.274],
      [-0.164, 0.282],
      [-0.126, 0.263],
      [-0.082, 0.27],
      [-0.038, 0.249],
      [0.008, 0.255],
      [0.048, 0.232],
    ],
    0.005,
    creviceMat
  );
  surface_details.add(upper_crease);

  const upper_crease_branch = createSurfaceTube(
    "upper_crease_branch",
    [
      [-0.145, 0.272],
      [-0.155, 0.302],
      [-0.137, 0.326],
      [-0.108, 0.337],
    ],
    0.0038,
    creviceMat
  );
  surface_details.add(upper_crease_branch);

  const center_crease = createSurfaceTube(
    "center_crease",
    [
      [-0.225, 0.075],
      [-0.188, 0.095],
      [-0.151, 0.083],
      [-0.112, 0.105],
      [-0.071, 0.091],
      [-0.031, 0.108],
      [0.008, 0.087],
      [0.041, 0.096],
    ],
    0.0045,
    creviceMat
  );
  surface_details.add(center_crease);

  const center_crease_branch = createSurfaceTube(
    "center_crease_branch",
    [
      [-0.073, 0.092],
      [-0.052, 0.061],
      [-0.027, 0.048],
      [-0.006, 0.021],
    ],
    0.0035,
    creviceMat
  );
  surface_details.add(center_crease_branch);

  const lower_crease = createSurfaceTube(
    "lower_crease",
    [
      [-0.188, -0.105],
      [-0.151, -0.087],
      [-0.113, -0.101],
      [-0.075, -0.083],
      [-0.036, -0.096],
      [0.004, -0.078],
      [0.041, -0.089],
    ],
    0.0042,
    creviceMat
  );
  surface_details.add(lower_crease);

  const lower_crease_branch = createSurfaceTube(
    "lower_crease_branch",
    [
      [-0.108, -0.096],
      [-0.091, -0.128],
      [-0.067, -0.146],
      [-0.052, -0.174],
    ],
    0.0034,
    creviceMat
  );
  surface_details.add(lower_crease_branch);

  const pitCoordinates = [
    [-0.151, 0.278],
    [-0.087, 0.252],
    [-0.188, 0.091],
    [-0.071, 0.093],
    [-0.029, 0.055],
    [-0.111, -0.096],
    [-0.055, -0.132],
    [-0.204, -0.074],
  ];

  const surface_pitsGeom = new THREE.CircleGeometry(0.018, 12);
  const surface_pits = new THREE.InstancedMesh(
    surface_pitsGeom,
    creviceMat,
    pitCoordinates.length
  );
  surface_pits.name = "surface_pits";

  const pitTransform = new THREE.Object3D();
  const frontAxis = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < pitCoordinates.length; i++) {
    const x = pitCoordinates[i][0];
    const y = pitCoordinates[i][1];
    const normal = surfaceNormal(x, y);

    pitTransform.position.copy(surfacePoint(x, y, 0.0015));
    pitTransform.quaternion.setFromUnitVectors(frontAxis, normal);
    pitTransform.rotateZ(i * 0.71);
    pitTransform.scale.set(
      0.65 + (i % 3) * 0.19,
      0.38 + ((i + 1) % 3) * 0.13,
      1
    );
    pitTransform.updateMatrix();
    surface_pits.setMatrixAt(i, pitTransform.matrix);
  }

  surface_pits.instanceMatrix.needsUpdate = true;
  surface_details.add(surface_pits);

  const frostCount = 56;
  const frost_specklesGeom = new THREE.SphereGeometry(0.0032, 6, 4);
  const frost_speckles = new THREE.InstancedMesh(
    frost_specklesGeom,
    frostMat,
    frostCount
  );
  frost_speckles.name = "frost_speckles";

  const frostTransform = new THREE.Object3D();
  for (let i = 0; i < frostCount; i++) {
    const radialFraction =
      0.12 + 0.76 * Math.sqrt((i + 0.5) / frostCount);
    const angle = i * 2.399963229728653;
    const x = scoopRx * radialFraction * Math.cos(angle);
    const y =
      scoopY +
      scoopRy * radialFraction * Math.sin(angle);
    const normal = surfaceNormal(x, y);
    const scale = 0.65 + (i % 5) * 0.13;

    frostTransform.position.copy(surfacePoint(x, y, 0.0018));
    frostTransform.quaternion.setFromUnitVectors(frontAxis, normal);
    frostTransform.scale.set(
      scale,
      scale * (0.75 + (i % 3) * 0.1),
      scale * 0.32
    );
    frostTransform.updateMatrix();
    frost_speckles.setMatrixAt(i, frostTransform.matrix);
  }

  frost_speckles.instanceMatrix.needsUpdate = true;
  surface_details.add(frost_speckles);

  const edgeCount = 18;
  const edge_crumbsGeom = new THREE.DodecahedronGeometry(0.012, 0);
  const edge_crumbs = new THREE.InstancedMesh(
    edge_crumbsGeom,
    scoopMat,
    edgeCount
  );
  edge_crumbs.name = "edge_crumbs";

  const edgeTransform = new THREE.Object3D();
  for (let i = 0; i < edgeCount; i++) {
    const t = i / (edgeCount - 1);
    const angle = Math.PI + t * Math.PI;
    const wave = Math.sin(i * 1.73) * 0.009;
    const x = Math.cos(angle) * (0.326 + wave);
    const y =
      scoopY -
      0.018 +
      Math.sin(angle) * (0.346 - wave * 0.4);
    const normal = surfaceNormal(x, y);
    const scale = 0.62 + (i % 4) * 0.12;

    edgeTransform.position.copy(surfacePoint(x, y, 0.001));
    edgeTransform.quaternion.setFromUnitVectors(frontAxis, normal);
    edgeTransform.rotateZ(i * 0.83);
    edgeTransform.scale.set(scale, scale * 0.72, scale * 0.45);
    edgeTransform.updateMatrix();
    edge_crumbs.setMatrixAt(i, edgeTransform.matrix);
  }

  edge_crumbs.instanceMatrix.needsUpdate = true;
  surface_details.add(edge_crumbs);

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