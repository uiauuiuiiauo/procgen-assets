export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gold_chain_bracelet";

  const chain_group = new THREE.Group();
  chain_group.name = "chain_group";
  root.add(chain_group);

  const clasp_group = new THREE.Group();
  clasp_group.name = "clasp_group";
  root.add(clasp_group);

  const gemstone_group = new THREE.Group();
  gemstone_group.name = "gemstone_group";
  gemstone_group.position.set(0, 0, 1.2);
  root.add(gemstone_group);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd8a83e,
    metalness: 0.6,
    roughness: 0.2
  });

  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xf5f9ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const diamond_lightMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const diamond_midMat = new THREE.MeshPhysicalMaterial({
    color: 0xdce7f2,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const diamond_shadowMat = new THREE.MeshPhysicalMaterial({
    color: 0xaebdce,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const chainLinkPoints = [];
  for (let i = 0; i < 20; i++) {
    const angle = i / 20 * Math.PI * 2;
    chainLinkPoints.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.21,
        0,
        Math.sin(angle) * 0.135
      )
    );
  }

  const chainLinkCurve = new THREE.CatmullRomCurve3(
    chainLinkPoints,
    true,
    "centripetal"
  );
  const chain_linksGeom = new THREE.TubeGeometry(
    chainLinkCurve,
    48,
    0.052,
    10,
    true
  );

  const chainLinkCount = 18;
  const chain_links = new THREE.InstancedMesh(
    chain_linksGeom,
    goldMat,
    chainLinkCount
  );
  chain_links.name = "chain_links";

  const braceletRadiusX = 1.2;
  const braceletRadiusZ = 0.95;
  const chainStartAngle = -2.72;
  const chainEndAngle = 2.72;
  const chainAngleStep =
    (chainEndAngle - chainStartAngle) / (chainLinkCount - 1);
  const localLongAxis = new THREE.Vector3(1, 0, 0);
  const instanceMatrix = new THREE.Matrix4();

  for (let i = 0; i < chainLinkCount; i++) {
    const angle = chainStartAngle + chainAngleStep * i;
    const position = new THREE.Vector3(
      braceletRadiusX * Math.sin(angle),
      0,
      braceletRadiusZ * Math.cos(angle)
    );

    const tangent = new THREE.Vector3(
      braceletRadiusX * Math.cos(angle),
      0,
      -braceletRadiusZ * Math.sin(angle)
    ).normalize();

    const flatQuaternion = new THREE.Quaternion().setFromUnitVectors(
      localLongAxis,
      tangent
    );
    const tilt = i % 2 === 0 ? 0.16 : -1.02;
    const tiltQuaternion = new THREE.Quaternion().setFromAxisAngle(
      tangent,
      tilt
    );
    const quaternion = tiltQuaternion.multiply(flatQuaternion);

    instanceMatrix.compose(
      position,
      quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    chain_links.setMatrixAt(i, instanceMatrix);
  }

  chain_links.instanceMatrix.needsUpdate = true;
  chain_group.add(chain_links);

  const clasp_bodyGeom = new THREE.CapsuleGeometry(0.09, 0.38, 6, 16);
  const clasp_body = new THREE.Mesh(clasp_bodyGeom, goldMat);
  clasp_body.name = "clasp_body";
  clasp_body.rotation.z = Math.PI / 2;
  clasp_body.position.set(-0.48, 0.025, -1.04);
  clasp_group.add(clasp_body);

  const clasp_collarGeom = new THREE.TorusGeometry(0.091, 0.016, 8, 24);

  const clasp_left_collar = new THREE.Mesh(clasp_collarGeom, goldMat);
  clasp_left_collar.name = "clasp_left_collar";
  clasp_left_collar.rotation.y = Math.PI / 2;
  clasp_left_collar.position.set(-0.75, 0.025, -1.04);
  clasp_group.add(clasp_left_collar);

  const clasp_right_collar = new THREE.Mesh(clasp_collarGeom, goldMat);
  clasp_right_collar.name = "clasp_right_collar";
  clasp_right_collar.rotation.y = Math.PI / 2;
  clasp_right_collar.position.set(-0.21, 0.025, -1.04);
  clasp_group.add(clasp_right_collar);

  const clasp_connectorGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.18,
    12
  );
  const clasp_connector = new THREE.Mesh(clasp_connectorGeom, goldMat);
  clasp_connector.name = "clasp_connector";
  clasp_connector.rotation.x = Math.PI / 2;
  clasp_connector.position.set(-0.12, 0.025, -1.04);
  clasp_group.add(clasp_connector);

  const clasp_jump_ringGeom = new THREE.TorusGeometry(
    0.115,
    0.035,
    10,
    28
  );
  const clasp_jump_ring = new THREE.Mesh(clasp_jump_ringGeom, goldMat);
  clasp_jump_ring.name = "clasp_jump_ring";
  clasp_jump_ring.rotation.x = Math.PI / 2;
  clasp_jump_ring.scale.set(1.25, 0.82, 1);
  clasp_jump_ring.position.set(0.1, 0.025, -1.04);
  clasp_group.add(clasp_jump_ring);

  const clasp_seamGeom = new THREE.TorusGeometry(0.09, 0.008, 6, 24);
  const clasp_seam = new THREE.Mesh(clasp_seamGeom, goldMat);
  clasp_seam.name = "clasp_seam";
  clasp_seam.rotation.y = Math.PI / 2;
  clasp_seam.position.set(-0.43, 0.025, -1.04);
  clasp_group.add(clasp_seam);

  const gemstone_settingGeom = new THREE.CylinderGeometry(
    0.225,
    0.225,
    0.05,
    32
  );
  const gemstone_setting = new THREE.Mesh(gemstone_settingGeom, goldMat);
  gemstone_setting.name = "gemstone_setting";
  gemstone_setting.position.y = 0.025;
  gemstone_group.add(gemstone_setting);

  const gemstone_bezelGeom = new THREE.TorusGeometry(
    0.205,
    0.024,
    10,
    36
  );
  const gemstone_bezel = new THREE.Mesh(gemstone_bezelGeom, goldMat);
  gemstone_bezel.name = "gemstone_bezel";
  gemstone_bezel.rotation.x = Math.PI / 2;
  gemstone_bezel.position.y = 0.115;
  gemstone_group.add(gemstone_bezel);

  const gemstoneGeom = createDiamondGeometry();
  const gemstone = new THREE.Mesh(
    gemstoneGeom,
    [
      diamondMat,
      diamond_lightMat,
      diamond_midMat,
      diamond_shadowMat
    ]
  );
  gemstone.name = "gemstone";
  gemstone.rotation.x = Math.PI / 2;
  gemstone.position.y = 0.14;
  gemstone_group.add(gemstone);

  const gemstone_prongsGeom = new THREE.SphereGeometry(0.055, 16, 10);
  const gemstone_prongs = new THREE.InstancedMesh(
    gemstone_prongsGeom,
    goldMat,
    4
  );
  gemstone_prongs.name = "gemstone_prongs";

  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i / 4 * Math.PI * 2;
    const position = new THREE.Vector3(
      Math.cos(angle) * 0.19,
      0.15,
      Math.sin(angle) * 0.19
    );
    const quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -angle
    );

    instanceMatrix.compose(
      position,
      quaternion,
      new THREE.Vector3(0.8, 1.05, 0.58)
    );
    gemstone_prongs.setMatrixAt(i, instanceMatrix);
  }

  gemstone_prongs.instanceMatrix.needsUpdate = true;
  gemstone_group.add(gemstone_prongs);

  fitToUnitCube(THREE, root);
  return root;

  function createDiamondGeometry() {
    const positions = [];
    const groups = [];
    const segments = 16;
    const tableRadius = 0.085;
    const girdleRadius = 0.2;
    const tableY = 0.1;
    const upperGirdleY = 0.015;
    const lowerGirdleY = -0.005;
    const tipY = -0.11;

    function point(radius, y, angle) {
      return [
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ];
    }

    function pushTriangle(a, b, c) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
    }

    function addGroup(start, a, b, c, materialIndex) {
      pushTriangle(a, b, c);
      groups.push([start, 3, materialIndex]);
    }

    for (let i = 0; i < segments; i++) {
      const angle0 = i / segments * Math.PI * 2;
      const angle1 = (i + 1) / segments * Math.PI * 2;
      const table0 = point(tableRadius, tableY, angle0);
      const table1 = point(tableRadius, tableY, angle1);
      const girdle0 = point(girdleRadius, upperGirdleY, angle0);
      const girdle1 = point(girdleRadius, upperGirdleY, angle1);
      const center = [0, tableY, 0];
      const facetMaterial = i % 4;

      addGroup(
        positions.length / 3,
        center,
        table1,
        table0,
        facetMaterial
      );
      addGroup(
        positions.length / 3,
        table0,
        table1,
        girdle1,
        (facetMaterial + 1) % 4
      );
      addGroup(
        positions.length / 3,
        table0,
        girdle1,
        girdle0,
        (facetMaterial + 2) % 4
      );
    }

    const lowerStart = positions.length / 3;
    for (let i = 0; i < segments; i++) {
      const angle0 = i / segments * Math.PI * 2;
      const angle1 = (i + 1) / segments * Math.PI * 2;
      const upper0 = point(girdleRadius, upperGirdleY, angle0);
      const upper1 = point(girdleRadius, upperGirdleY, angle1);
      const lower0 = point(girdleRadius, lowerGirdleY, angle0);
      const lower1 = point(girdleRadius, lowerGirdleY, angle1);
      const tip = [0, tipY, 0];

      pushTriangle(upper0, upper1, lower1);
      pushTriangle(upper0, lower1, lower0);
      pushTriangle(lower0, lower1, tip);
    }

    groups.push([
      lowerStart,
      positions.length / 3 - lowerStart,
      3
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    for (const group of groups) {
      geometry.addGroup(group[0], group[1], group[2]);
    }

    geometry.computeVertexNormals();
    return geometry;
  }

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
}