export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_balloon";

  const balloon_group = new THREE.Group();
  balloon_group.name = "balloon_group";
  root.add(balloon_group);

  const tie_group = new THREE.Group();
  tie_group.name = "tie_group";
  root.add(tie_group);

  const string_group = new THREE.Group();
  string_group.name = "string_group";
  root.add(string_group);

  const bodyH = 2.3;
  const bodyR = 1.0;
  const bodyY = 1.18;
  const bodyBottom = bodyY - bodyH / 2;
  const bodyTop = bodyY + bodyH / 2;
  const profilePower = 0.72;
  const goreCount = 10;
  const goreWidth = Math.PI * 2 / goreCount;

  const red_goreMat = new THREE.MeshStandardMaterial({
    color: 0xef3e2a,
    metalness: 0.0,
    roughness: 0.3
  });
  const yellow_goreMat = new THREE.MeshStandardMaterial({
    color: 0xf4ea00,
    metalness: 0.0,
    roughness: 0.3
  });
  const green_goreMat = new THREE.MeshStandardMaterial({
    color: 0x319d4b,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_goreMat = new THREE.MeshStandardMaterial({
    color: 0x0874d1,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyan_goreMat = new THREE.MeshStandardMaterial({
    color: 0x58c968,
    metalness: 0.0,
    roughness: 0.3
  });
  const violet_goreMat = new THREE.MeshStandardMaterial({
    color: 0x7254c8,
    metalness: 0.0,
    roughness: 0.3
  });
  const magenta_goreMat = new THREE.MeshStandardMaterial({
    color: 0xc42b68,
    metalness: 0.0,
    roughness: 0.3
  });
  const orange_goreMat = new THREE.MeshStandardMaterial({
    color: 0xf2a51d,
    metalness: 0.0,
    roughness: 0.3
  });

  function balloonRadiusAt(t) {
    const sine = Math.max(0, Math.sin(Math.PI * t));
    return bodyR * Math.pow(sine, profilePower) * (0.92 + 0.12 * t);
  }

  function createGoreGeometry() {
    const verticalSegments = 32;
    const angularSegments = 6;
    const positions = [];
    const indices = [];

    for (let iy = 0; iy <= verticalSegments; iy++) {
      const t = iy / verticalSegments;
      const y = bodyBottom + bodyH * t;
      const radius = balloonRadiusAt(t);

      for (let ia = 0; ia <= angularSegments; ia++) {
        const angle = -goreWidth / 2 + goreWidth * ia / angularSegments;
        positions.push(
          Math.sin(angle) * radius,
          y,
          Math.cos(angle) * radius
        );
      }
    }

    const row = angularSegments + 1;
    for (let iy = 0; iy < verticalSegments; iy++) {
      for (let ia = 0; ia < angularSegments; ia++) {
        const a = iy * row + ia;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const balloon_goreGeom = createGoreGeometry();

  function makeGore(name, material, index) {
    const mesh = new THREE.Mesh(balloon_goreGeom, material);
    mesh.name = name;
    mesh.rotation.y = index * goreWidth;
    balloon_group.add(mesh);
    return mesh;
  }

  const red_front_gore = makeGore("red_front_gore", red_goreMat, 0);
  const yellow_front_right_gore = makeGore(
    "yellow_front_right_gore",
    yellow_goreMat,
    1
  );
  const green_right_gore = makeGore(
    "green_right_gore",
    green_goreMat,
    2
  );
  const blue_right_gore = makeGore(
    "blue_right_gore",
    blue_goreMat,
    3
  );
  const cyan_back_right_gore = makeGore(
    "cyan_back_right_gore",
    cyan_goreMat,
    4
  );
  const violet_back_gore = makeGore(
    "violet_back_gore",
    violet_goreMat,
    5
  );
  const magenta_back_left_gore = makeGore(
    "magenta_back_left_gore",
    magenta_goreMat,
    6
  );
  const orange_back_left_gore = makeGore(
    "orange_back_left_gore",
    orange_goreMat,
    7
  );
  const cyan_back_gore = makeGore(
    "cyan_back_gore",
    cyan_goreMat,
    8
  );
  const blue_left_gore = makeGore(
    "blue_left_gore",
    blue_goreMat,
    9
  );

  const balloon_neckMat = new THREE.MeshStandardMaterial({
    color: 0xc92b24,
    metalness: 0.0,
    roughness: 0.3
  });
  const balloon_neckGeom = new THREE.CylinderGeometry(
    0.025,
    0.043,
    0.12,
    14
  );
  const balloon_neck = new THREE.Mesh(balloon_neckGeom, balloon_neckMat);
  balloon_neck.name = "balloon_neck";
  balloon_neck.position.y = bodyBottom - 0.04;
  tie_group.add(balloon_neck);

  const knot_centerMat = new THREE.MeshStandardMaterial({
    color: 0xa91e18,
    metalness: 0.0,
    roughness: 0.3
  });
  const knot_centerGeom = new THREE.SphereGeometry(0.052, 16, 10);
  const knot_center = new THREE.Mesh(knot_centerGeom, knot_centerMat);
  knot_center.name = "knot_center";
  knot_center.scale.set(1.0, 0.78, 0.86);
  knot_center.position.y = bodyBottom - 0.12;
  tie_group.add(knot_center);

  const knot_lobesGeom = new THREE.SphereGeometry(0.04, 12, 8);
  const knot_lobes = new THREE.InstancedMesh(
    knot_lobesGeom,
    knot_centerMat,
    4
  );
  knot_lobes.name = "knot_lobes";

  const knotDummy = new THREE.Object3D();
  const knotLobeData = [
    [-0.045, bodyBottom - 0.135, 0.002, 1.15, 0.72, 0.82],
    [0.045, bodyBottom - 0.137, 0.002, 1.15, 0.72, 0.82],
    [0.0, bodyBottom - 0.098, 0.025, 0.92, 0.72, 1.05],
    [0.0, bodyBottom - 0.153, -0.012, 0.88, 0.65, 0.92]
  ];

  for (let i = 0; i < knotLobeData.length; i++) {
    const data = knotLobeData[i];
    knotDummy.position.set(data[0], data[1], data[2]);
    knotDummy.scale.set(data[3], data[4], data[5]);
    knotDummy.updateMatrix();
    knot_lobes.setMatrixAt(i, knotDummy.matrix);
  }
  knot_lobes.instanceMatrix.needsUpdate = true;
  tie_group.add(knot_lobes);

  const gathered_skirtMat = new THREE.MeshStandardMaterial({
    color: 0xd62d25,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const gatheredSkirtSegments = 24;
  const gatheredSkirtPositions = [];
  const gatheredSkirtIndices = [];
  const skirtRows = [
    { y: bodyBottom - 0.105, r: 0.026 },
    { y: bodyBottom - 0.155, r: 0.052 },
    { y: bodyBottom - 0.215, r: 0.088 }
  ];

  for (let row = 0; row < skirtRows.length; row++) {
    for (let i = 0; i <= gatheredSkirtSegments; i++) {
      const angle = Math.PI * 2 * i / gatheredSkirtSegments;
      const fold = 0.86 + 0.14 * Math.cos(angle * goreCount);
      const radius = skirtRows[row].r * fold;
      gatheredSkirtPositions.push(
        Math.sin(angle) * radius,
        skirtRows[row].y,
        Math.cos(angle) * radius
      );
    }
  }

  const skirtRow = gatheredSkirtSegments + 1;
  for (let row = 0; row < skirtRows.length - 1; row++) {
    for (let i = 0; i < gatheredSkirtSegments; i++) {
      const a = row * skirtRow + i;
      const b = a + 1;
      const c = a + skirtRow;
      const d = c + 1;
      gatheredSkirtIndices.push(a, b, c, b, d, c);
    }
  }

  const gathered_skirtGeom = new THREE.BufferGeometry();
  gathered_skirtGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(gatheredSkirtPositions, 3)
  );
  gathered_skirtGeom.setIndex(gatheredSkirtIndices);
  gathered_skirtGeom.computeVertexNormals();

  const gathered_skirt = new THREE.Mesh(
    gathered_skirtGeom,
    gathered_skirtMat
  );
  gathered_skirt.name = "gathered_skirt";
  tie_group.add(gathered_skirt);

  const green_collarMat = new THREE.MeshStandardMaterial({
    color: 0x198f42,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });
  const greenCollarSegments = 24;
  const greenCollarPositions = [];
  const greenCollarIndices = [];
  const collarRows = [
    { y: bodyBottom - 0.19, r: 0.066 },
    { y: bodyBottom - 0.245, r: 0.105 },
    { y: bodyBottom - 0.29, r: 0.13 }
  ];

  for (let row = 0; row < collarRows.length; row++) {
    for (let i = 0; i <= greenCollarSegments; i++) {
      const angle = Math.PI * 2 * i / greenCollarSegments;
      const fold = 0.84 + 0.16 * Math.cos(angle * 10);
      const radius = collarRows[row].r * fold;
      greenCollarPositions.push(
        Math.sin(angle) * radius,
        collarRows[row].y,
        Math.cos(angle) * radius
      );
    }
  }

  for (let row = 0; row < collarRows.length - 1; row++) {
    for (let i = 0; i < greenCollarSegments; i++) {
      const a = row * skirtRow + i;
      const b = a + 1;
      const c = a + skirtRow;
      const d = c + 1;
      greenCollarIndices.push(a, b, c, b, d, c);
    }
  }

  const green_collarGeom = new THREE.BufferGeometry();
  green_collarGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(greenCollarPositions, 3)
  );
  green_collarGeom.setIndex(greenCollarIndices);
  green_collarGeom.computeVertexNormals();

  const green_collar = new THREE.Mesh(green_collarGeom, green_collarMat);
  green_collar.name = "green_collar";
  tie_group.add(green_collar);

  const collar_edgeGeom = new THREE.TorusGeometry(0.12, 0.012, 8, 32);
  const collar_edge = new THREE.Mesh(collar_edgeGeom, green_collarMat);
  collar_edge.name = "collar_edge";
  collar_edge.rotation.x = Math.PI / 2;
  collar_edge.position.y = bodyBottom - 0.29;
  tie_group.add(collar_edge);

  const balloon_stringMat = new THREE.MeshStandardMaterial({
    color: 0xe4e5df,
    metalness: 0.0,
    roughness: 0.8
  });
  const balloon_stringPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.0, bodyBottom - 0.30, 0.0),
    new THREE.Vector3(0.006, bodyBottom - 0.48, 0.002),
    new THREE.Vector3(0.012, -0.78, 0.005),
    new THREE.Vector3(0.018, -1.08, 0.002),
    new THREE.Vector3(0.015, -1.38, 0.0)
  ]);
  const balloon_stringGeom = new THREE.TubeGeometry(
    balloon_stringPath,
    28,
    0.006,
    6,
    false
  );
  const balloon_string = new THREE.Mesh(
    balloon_stringGeom,
    balloon_stringMat
  );
  balloon_string.name = "balloon_string";
  string_group.add(balloon_string);

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