export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "floral_cheese";

  const cheese_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf2b957,
    metalness: 0.0,
    roughness: 0.7,
  });

  const cheese_bodyProfile = [
    new THREE.Vector2(0.00, -0.340),
    new THREE.Vector2(0.58, -0.340),
    new THREE.Vector2(0.64, -0.325),
    new THREE.Vector2(0.685, -0.290),
    new THREE.Vector2(0.710, -0.220),
    new THREE.Vector2(0.720, -0.100),
    new THREE.Vector2(0.720, 0.170),
    new THREE.Vector2(0.710, 0.245),
    new THREE.Vector2(0.685, 0.300),
    new THREE.Vector2(0.640, 0.335),
    new THREE.Vector2(0.00, 0.335),
  ];
  const cheese_bodyGeom = new THREE.LatheGeometry(cheese_bodyProfile, 64);
  const cheese_body = new THREE.Mesh(cheese_bodyGeom, cheese_bodyMat);
  cheese_body.name = "cheese_body";
  root.add(cheese_body);

  const flower_groovesMat = new THREE.MeshStandardMaterial({
    color: 0xd9932c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const flower_centersMat = cheese_bodyMat;

  const flower_groovesShape = new THREE.Shape();
  flower_groovesShape.moveTo(0, -0.5);
  flower_groovesShape.bezierCurveTo(0.20, -0.47, 0.34, -0.24, 0.32, 0.02);
  flower_groovesShape.bezierCurveTo(0.30, 0.28, 0.15, 0.46, 0, 0.5);
  flower_groovesShape.bezierCurveTo(-0.15, 0.46, -0.30, 0.28, -0.32, 0.02);
  flower_groovesShape.bezierCurveTo(-0.34, -0.24, -0.20, -0.47, 0, -0.5);

  const flower_groovesGeom = new THREE.ShapeGeometry(flower_groovesShape, 12);
  const flower_centersGeom = new THREE.CylinderGeometry(1, 1, 0.014, 24);
  const flower_center_ringsGeom = new THREE.TorusGeometry(0.8, 0.12, 6, 24);
  const horizontalQuat = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -Math.PI / 2
  );

  function makePetalMatrix(cx, cz, angle, base, length, width, y) {
    const centerDistance = base + length * 0.5;
    const position = new THREE.Vector3(
      cx + Math.sin(angle) * centerDistance,
      y,
      cz + Math.cos(angle) * centerDistance
    );
    const yawQuat = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angle
    );
    const quaternion = yawQuat.multiply(horizontalQuat);
    const scale = new THREE.Vector3(width / 0.64, length, 1);
    return new THREE.Matrix4().compose(position, quaternion, scale);
  }

  function makeCenterMatrix(cx, cz, radius, y) {
    return new THREE.Matrix4().compose(
      new THREE.Vector3(cx, y, cz),
      new THREE.Quaternion(),
      new THREE.Vector3(radius, 1, radius)
    );
  }

  function makeCenterRingMatrix(cx, cz, radius, y) {
    return new THREE.Matrix4().compose(
      new THREE.Vector3(cx, y, cz),
      horizontalQuat,
      new THREE.Vector3(radius, radius, radius)
    );
  }

  const largeFlowers = [
    { cx: -0.31, cz: 0.12, count: 12, base: 0.070, length: 0.190, width: 0.070, center: 0.052, phase: 0.02 },
    { cx: 0.33, cz: 0.10, count: 11, base: 0.068, length: 0.180, width: 0.068, center: 0.050, phase: 0.10 },
    { cx: 0.02, cz: 0.34, count: 11, base: 0.064, length: 0.165, width: 0.064, center: 0.047, phase: -0.04 },
  ];
  const smallFlowers = [
    { cx: -0.02, cz: -0.22, count: 10, base: 0.032, length: 0.090, width: 0.036, center: 0.030, phase: 0.08 },
    { cx: -0.28, cz: -0.34, count: 7, base: 0.027, length: 0.105, width: 0.038, center: 0.020, phase: 0.18 },
    { cx: 0.28, cz: -0.34, count: 7, base: 0.027, length: 0.105, width: 0.038, center: 0.020, phase: -0.12 },
    { cx: -0.44, cz: -0.03, count: 6, base: 0.024, length: 0.090, width: 0.034, center: 0.018, phase: 0.04 },
    { cx: 0.43, cz: -0.02, count: 6, base: 0.024, length: 0.090, width: 0.034, center: 0.018, phase: -0.08 },
  ];
  const allFlowers = largeFlowers.concat(smallFlowers);

  let largePetalCount = 0;
  for (const flower of largeFlowers) largePetalCount += flower.count;
  let smallPetalCount = 0;
  for (const flower of smallFlowers) smallPetalCount += flower.count;

  const large_flower_grooves = new THREE.InstancedMesh(
    flower_groovesGeom,
    flower_groovesMat,
    largePetalCount
  );
  large_flower_grooves.name = "large_flower_grooves";

  const small_flower_grooves = new THREE.InstancedMesh(
    flower_groovesGeom,
    flower_groovesMat,
    smallPetalCount
  );
  small_flower_grooves.name = "small_flower_grooves";

  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    flower_centersMat,
    allFlowers.length
  );
  flower_centers.name = "flower_centers";

  const flower_center_rings = new THREE.InstancedMesh(
    flower_center_ringsGeom,
    flower_groovesMat,
    allFlowers.length
  );
  flower_center_rings.name = "flower_center_rings";

  function populateFlowers(mesh, flowers) {
    let instanceIndex = 0;
    for (const flower of flowers) {
      for (let i = 0; i < flower.count; i++) {
        const angle = flower.phase + i / flower.count * Math.PI * 2;
        mesh.setMatrixAt(
          instanceIndex++,
          makePetalMatrix(
            flower.cx,
            flower.cz,
            angle,
            flower.base,
            flower.length,
            flower.width,
            0.3405
          )
        );
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  populateFlowers(large_flower_grooves, largeFlowers);
  populateFlowers(small_flower_grooves, smallFlowers);

  for (let i = 0; i < allFlowers.length; i++) {
    const flower = allFlowers[i];
    flower_centers.setMatrixAt(
      i,
      makeCenterMatrix(flower.cx, flower.cz, flower.center, 0.342)
    );
    flower_center_rings.setMatrixAt(
      i,
      makeCenterRingMatrix(
        flower.cx,
        flower.cz,
        flower.center,
        flower.center * 0.18
      )
    );
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  flower_center_rings.instanceMatrix.needsUpdate = true;

  root.add(large_flower_grooves);
  root.add(small_flower_grooves);
  root.add(flower_center_rings);
  root.add(flower_centers);

  const side_poresMat = new THREE.MeshStandardMaterial({
    color: 0xd79a3b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const side_poresGeom = new THREE.CircleGeometry(1, 12);
  const sidePoreCount = 24;
  const side_pores = new THREE.InstancedMesh(
    side_poresGeom,
    side_poresMat,
    sidePoreCount
  );
  side_pores.name = "side_pores";

  for (let i = 0; i < sidePoreCount; i++) {
    const angle = i * 2.399963229728653;
    const y = -0.245 + ((i * 7) % 23) / 22 * 0.405;
    const edgeDistance = Math.abs(y - 0.015);
    const radius = 0.721 - Math.max(0, edgeDistance - 0.14) * 0.08;
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    const width = 0.008 + ((i * 5) % 7) * 0.0024;
    const height = 0.004 + ((i * 3) % 5) * 0.0018;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(normal.x * radius, y, normal.z * radius),
      quaternion,
      new THREE.Vector3(width, height, 1)
    );
    side_pores.setMatrixAt(i, matrix);
  }
  side_pores.instanceMatrix.needsUpdate = true;
  root.add(side_pores);

  const side_scuffsMat = new THREE.MeshStandardMaterial({
    color: 0xd89a3c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const side_scuffsGeom = new THREE.CylinderGeometry(0.0022, 0.0022, 1, 6);
  const sideScuffData = [
    [0.55, -0.16, 0.075, -0.42],
    [0.92, 0.04, 0.050, 0.30],
    [1.28, -0.08, 0.065, -0.18],
    [1.62, 0.15, 0.045, 0.48],
    [1.95, -0.20, 0.055, -0.36],
    [2.35, 0.07, 0.040, 0.22],
    [2.78, -0.02, 0.060, -0.28],
  ];
  const side_scuffs = new THREE.InstancedMesh(
    side_scuffsGeom,
    side_scuffsMat,
    sideScuffData.length
  );
  side_scuffs.name = "side_scuffs";

  for (let i = 0; i < sideScuffData.length; i++) {
    const data = sideScuffData[i];
    const angle = data[0];
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const tangent = new THREE.Vector3(normal.z, 0, -normal.x);
    const direction = tangent.multiplyScalar(Math.cos(data[3]))
      .add(new THREE.Vector3(0, Math.sin(data[3]), 0))
      .normalize();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction
    );
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(normal.x * 0.722, data[1], normal.z * 0.722),
      quaternion,
      new THREE.Vector3(1, data[2], 1)
    );
    side_scuffs.setMatrixAt(i, matrix);
  }
  side_scuffs.instanceMatrix.needsUpdate = true;
  root.add(side_scuffs);

  const top_crumbsMat = new THREE.MeshStandardMaterial({
    color: 0xffd98c,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const top_crumbsGeom = new THREE.CircleGeometry(1, 8);
  const topCrumbCount = 18;
  const top_crumbs = new THREE.InstancedMesh(
    top_crumbsGeom,
    top_crumbsMat,
    topCrumbCount
  );
  top_crumbs.name = "top_crumbs";

  for (let i = 0; i < topCrumbCount; i++) {
    const angle = i * 2.164208272;
    const radius = 0.10 + ((i * 11) % 19) / 18 * 0.46;
    const size = 0.003 + ((i * 5) % 6) * 0.0012;
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0.3385,
        Math.sin(angle) * radius
      ),
      horizontalQuat,
      new THREE.Vector3(size, size * 0.65, 1)
    );
    top_crumbs.setMatrixAt(i, matrix);
  }
  top_crumbs.instanceMatrix.needsUpdate = true;
  root.add(top_crumbs);

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