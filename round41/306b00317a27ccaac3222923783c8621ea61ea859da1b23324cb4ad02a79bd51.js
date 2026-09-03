export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
    side: THREE.DoubleSide,
  });

  function createPlateGeometry() {
    const rows = 12;
    const cols = 10;
    const rowSize = cols + 1;
    const layerSize = (rows + 1) * rowSize;
    const thickness = 0.018;
    const positions = [];
    const indices = [];

    function halfWidth(t) {
      if (t < 0.18) {
        return 0.12 + (0.39 - 0.12) * (t / 0.18);
      }
      return 0.39 + (0.36 - 0.39) * ((t - 0.18) / 0.82);
    }

    function surfaceY(t, u) {
      const sideLift = 0.028 * u * u;
      const rearLift = 0.045 * Math.pow(1 - t, 4);
      const edgeWave = 0.006 * Math.sin(t * Math.PI * 2) * u * u;
      return 0.018 + sideLift + rearLift + edgeWave;
    }

    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i <= rows; i++) {
        const t = i / rows;
        const width = halfWidth(t);
        const z = -0.52 + t * 1.17;
        for (let j = 0; j <= cols; j++) {
          const u = -1 + (2 * j) / cols;
          const y = surfaceY(t, u) - layer * thickness;
          positions.push(u * width, y, z);
        }
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const a = i * rowSize + j;
        const b = (i + 1) * rowSize + j;
        const c = (i + 1) * rowSize + j + 1;
        const d = i * rowSize + j + 1;
        indices.push(a, b, d, b, c, d);

        const ab = a + layerSize;
        const bb = b + layerSize;
        const cb = c + layerSize;
        const db = d + layerSize;
        indices.push(ab, db, bb, bb, db, cb);
      }
    }

    for (let i = 0; i < rows; i++) {
      const leftTop = i * rowSize;
      const leftNextTop = (i + 1) * rowSize;
      const leftBottom = leftTop + layerSize;
      const leftNextBottom = leftNextTop + layerSize;
      indices.push(
        leftTop, leftBottom, leftNextTop,
        leftNextTop, leftBottom, leftNextBottom
      );

      const rightTop = i * rowSize + cols;
      const rightNextTop = (i + 1) * rowSize + cols;
      const rightBottom = rightTop + layerSize;
      const rightNextBottom = rightNextTop + layerSize;
      indices.push(
        rightTop, rightNextTop, rightBottom,
        rightNextTop, rightNextBottom, rightBottom
      );
    }

    for (let j = 0; j < cols; j++) {
      const rearTopA = j;
      const rearTopB = j + 1;
      const rearBottomA = rearTopA + layerSize;
      const rearBottomB = rearTopB + layerSize;
      indices.push(
        rearTopA, rearTopB, rearBottomA,
        rearTopB, rearBottomB, rearBottomA
      );

      const frontBase = rows * rowSize;
      const frontTopA = frontBase + j;
      const frontTopB = frontTopA + 1;
      const frontBottomA = frontTopA + layerSize;
      const frontBottomB = frontTopB + layerSize;
      indices.push(
        frontTopA, frontBottomA, frontTopB,
        frontTopB, frontBottomA, frontBottomB
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const blade_assembly = new THREE.Group();
  root.add(blade_assembly);

  const bladeGeom = createPlateGeometry();
  const blade = new THREE.Mesh(bladeGeom, silverMat);
  blade_assembly.add(blade);

  const blade_side_lipPoints = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    const width = halfWidth(t);
    const y = surfaceY(t, 1) + 0.004;
    blade_side_lipPoints.push(
      new THREE.Vector3(width, y, -0.52 + t * 1.17)
    );
  }
  const blade_side_lipCurve = new THREE.CatmullRomCurve3(
    blade_side_lipPoints,
    false,
    "centripetal"
  );
  const blade_side_lipGeom = new THREE.TubeGeometry(
    blade_side_lipCurve,
    28,
    0.008,
    6,
    false
  );
  const blade_side_lips = new THREE.InstancedMesh(
    blade_side_lipGeom,
    silverMat,
    2
  );
  blade_side_lips.setMatrixAt(0, new THREE.Matrix4());
  blade_side_lips.setMatrixAt(
    1,
    new THREE.Matrix4().makeScale(-1, 1, 1)
  );
  blade_side_lips.instanceMatrix.needsUpdate = true;
  blade_assembly.add(blade_side_lips);

  const blade_front_lipCurve = new THREE.LineCurve3(
    new THREE.Vector3(-0.36, 0.054, 0.65),
    new THREE.Vector3(0.36, 0.054, 0.65)
  );
  const blade_front_lipGeom = new THREE.TubeGeometry(
    blade_front_lipCurve,
    1,
    0.008,
    6,
    false
  );
  const blade_front_lip = new THREE.Mesh(blade_front_lipGeom, silverMat);
  blade_assembly.add(blade_front_lip);

  const blade_socketGeom = new THREE.SphereGeometry(1, 24, 12);
  const blade_socket = new THREE.Mesh(blade_socketGeom, silverMat);
  blade_socket.position.set(0, 0.078, -0.405);
  blade_socket.scale.set(0.13, 0.045, 0.17);
  blade_assembly.add(blade_socket);

  const blade_rivetGeom = new THREE.CylinderGeometry(
    0.022,
    0.024,
    0.012,
    16
  );
  const blade_rivet = new THREE.Mesh(blade_rivetGeom, silverMat);
  blade_rivet.position.set(0, 0.077, -0.04);
  blade_assembly.add(blade_rivet);

  const shaft_assembly = new THREE.Group();
  root.add(shaft_assembly);

  const shaftCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.065, -0.42),
      new THREE.Vector3(0, 0.10, -0.50),
      new THREE.Vector3(0, 0.22, -0.58),
      new THREE.Vector3(0, 0.43, -0.65),
      new THREE.Vector3(0, 0.68, -0.72),
      new THREE.Vector3(0, 0.90, -0.80),
    ],
    false,
    "centripetal"
  );
  const shaftGeom = new THREE.TubeGeometry(
    shaftCurve,
    48,
    0.045,
    12,
    false
  );
  const shaft = new THREE.Mesh(shaftGeom, silverMat);
  shaft_assembly.add(shaft);

  const handle_assembly = new THREE.Group();
  root.add(handle_assembly);

  const handleCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0.88, -0.79),
      new THREE.Vector3(0, 1.08, -0.93),
      new THREE.Vector3(0, 1.32, -1.08),
      new THREE.Vector3(0, 1.53, -1.24),
      new THREE.Vector3(0, 1.63, -1.39),
      new THREE.Vector3(0, 1.62, -1.54),
      new THREE.Vector3(0, 1.53, -1.67),
      new THREE.Vector3(0, 1.39, -1.78),
      new THREE.Vector3(0, 1.25, -1.85),
    ],
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    64,
    0.078,
    16,
    false
  );
  const handle = new THREE.Mesh(handleGeom, silverMat);
  handle_assembly.add(handle);

  const handle_end_capGeom = new THREE.SphereGeometry(0.079, 20, 12);
  const handle_end_cap = new THREE.Mesh(handle_end_capGeom, silverMat);
  handle_end_cap.position.set(0, 1.25, -1.85);
  handle_end_cap.scale.set(1, 0.92, 1);
  handle_assembly.add(handle_end_cap);

  const handle_collarGeom = new THREE.CylinderGeometry(
    0.076,
    0.076,
    0.13,
    20
  );
  const handle_collar = new THREE.Mesh(handle_collarGeom, silverMat);
  const collarDirection = new THREE.Vector3(0, 0.2, -0.14).normalize();
  handle_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    collarDirection
  );
  handle_collar.position.set(0, 0.925, -0.825);
  handle_assembly.add(handle_collar);

  const handle_collar_seamGeom = new THREE.TorusGeometry(
    0.067,
    0.006,
    8,
    24
  );
  const handle_collar_seam = new THREE.Mesh(
    handle_collar_seamGeom,
    darkMetalMat
  );
  handle_collar_seam.position.set(0, 0.87, -0.775);
  handle_collar_seam.rotation.x = 0.64;
  handle_assembly.add(handle_collar_seam);

  const handle_holeGeom = new THREE.CircleGeometry(0.027, 20);
  const handle_hole = new THREE.Mesh(handle_holeGeom, darkMetalMat);
  handle_hole.position.set(0, 1.686, -1.43);
  handle_hole.rotation.x = -Math.PI / 2;
  handle_hole.scale.set(0.7, 1.45, 1);
  handle_assembly.add(handle_hole);

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

  function halfWidth(t) {
    if (t < 0.18) {
      return 0.12 + (0.39 - 0.12) * (t / 0.18);
    }
    return 0.39 + (0.36 - 0.39) * ((t - 0.18) / 0.82);
  }

  function surfaceY(t, u) {
    return (
      0.018 +
      0.028 * u * u +
      0.045 * Math.pow(1 - t, 4) +
      0.006 * Math.sin(t * Math.PI * 2) * u * u
    );
  }
}