export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "mosaic_stud_earrings";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6ad6b,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x9b6b32,
    metalness: 0.6,
    roughness: 0.2,
  });

  function glossyEnamel(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.3,
    });
  }

  const blueMat = glossyEnamel(0x087bd8);
  const cyanMat = glossyEnamel(0x16bde9);
  const skyMat = glossyEnamel(0x62c9f4);
  const greenMat = glossyEnamel(0x00a957);
  const mintMat = glossyEnamel(0x42d5ad);
  const pinkMat = glossyEnamel(0xf33b88);
  const redMat = glossyEnamel(0xe00058);
  const orangeMat = glossyEnamel(0xff9215);
  const yellowMat = glossyEnamel(0xf4e829);
  const purpleMat = glossyEnamel(0x5b24b8);
  const peachMat = glossyEnamel(0xdca181);

  const outerShape = new THREE.Shape();
  outerShape.moveTo(-0.20, 0.58);
  outerShape.bezierCurveTo(-0.25, 0.58, -0.31, 0.51, -0.34, 0.44);
  outerShape.bezierCurveTo(-0.42, 0.27, -0.50, 0.06, -0.49, -0.10);
  outerShape.bezierCurveTo(-0.48, -0.28, -0.40, -0.46, -0.30, -0.53);
  outerShape.bezierCurveTo(-0.12, -0.59, 0.12, -0.59, 0.30, -0.53);
  outerShape.bezierCurveTo(0.40, -0.46, 0.48, -0.28, 0.49, -0.10);
  outerShape.bezierCurveTo(0.50, 0.06, 0.42, 0.27, 0.34, 0.44);
  outerShape.bezierCurveTo(0.31, 0.51, 0.25, 0.58, 0.20, 0.58);
  outerShape.bezierCurveTo(0.08, 0.60, -0.08, 0.60, -0.20, 0.58);
  outerShape.closePath();

  const backingGeom = new THREE.ExtrudeGeometry(outerShape, {
    depth: 0.07,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.014,
    bevelSegments: 3,
  });
  const frontFrameGeom = new THREE.ExtrudeGeometry(outerShape, {
    depth: 0.018,
    steps: 1,
    curveSegments: 18,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 3,
  });

  function createRibbonGeometry(paths, width, depth) {
    const positions = [];
    const indices = [];
    const halfWidth = width * 0.5;

    for (const path of paths) {
      const dx = path[1].x - path[0].x;
      const dy = path[1].y - path[0].y;
      const length = Math.sqrt(dx * dx + dy * dy) || 1;
      const nx = -dy / length * halfWidth;
      const ny = dx / length * halfWidth;
      const base = positions.length / 3;

      const corners = [
        path[0].clone().add(new THREE.Vector2(nx, ny)),
        path[0].clone().sub(new THREE.Vector2(nx, ny)),
        path[1].clone().sub(new THREE.Vector2(nx, ny)),
        path[1].clone().add(new THREE.Vector2(nx, ny)),
      ];

      for (const corner of corners) {
        positions.push(corner.x, corner.y, 0);
        positions.push(corner.x, corner.y, -depth);
      }

      indices.push(
        base, base + 4, base + 1,
        base + 1, base + 4, base + 5,
        base + 1, base + 5, base + 2,
        base + 2, base + 5, base + 6,
        base + 2, base + 6, base + 3,
        base + 3, base + 6, base + 7,
        base + 3, base + 7, base,
        base + 7, base + 4, base
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

  const leftTileData = [
    { points: [[-0.18, 0.52], [-0.31, 0.42], [-0.20, 0.22], [-0.07, 0.35]], color: blueMat },
    { points: [[-0.31, 0.42], [-0.42, 0.22], [-0.27, 0.02], [-0.20, 0.22]], color: greenMat },
    { points: [[-0.42, 0.22], [-0.47, 0.03], [-0.34, -0.11], [-0.27, 0.02]], color: skyMat },
    { points: [[-0.47, 0.03], [-0.46, -0.18], [-0.35, -0.29], [-0.34, -0.11]], color: purpleMat },
    { points: [[-0.46, -0.18], [-0.38, -0.42], [-0.27, -0.33], [-0.35, -0.29]], color: yellowMat },
    { points: [[-0.38, -0.42], [-0.27, -0.53], [-0.14, -0.48], [-0.27, -0.33]], color: skyMat },
    { points: [[-0.27, -0.53], [-0.02, -0.56], [0.05, -0.46], [-0.14, -0.48]], color: purpleMat },
    { points: [[-0.02, -0.56], [0.24, -0.52], [0.15, -0.38], [0.05, -0.46]], color: greenMat },
    { points: [[0.24, -0.52], [0.31, -0.48], [0.35, -0.34], [0.15, -0.38]], color: cyanMat },
    { points: [[0.31, -0.48], [0.40, -0.35], [0.42, -0.20], [0.35, -0.34]], color: greenMat },
    { points: [[0.40, -0.35], [0.46, -0.12], [0.42, 0.04], [0.35, -0.08], [0.35, -0.34]], color: purpleMat },
    { points: [[0.46, -0.12], [0.45, 0.15], [0.35, 0.33], [0.42, 0.04]], color: greenMat },
    { points: [[0.45, 0.15], [0.38, 0.35], [0.30, 0.48], [0.23, 0.35], [0.35, 0.15], [0.42, 0.04]], color: purpleMat },
    { points: [[0.38, 0.35], [0.27, 0.52], [0.18, 0.52], [0.23, 0.35], [0.35, 0.15]], color: orangeMat },
    { points: [[0.27, 0.52], [0.18, 0.52], [0.05, 0.34], [0.14, 0.20], [0.23, 0.35]], color: pinkMat },
    { points: [[0.18, 0.52], [-0.07, 0.56], [-0.18, 0.52], [-0.07, 0.35], [0.05, 0.34]], color: pinkMat },
    { points: [[-0.07, 0.35], [-0.20, 0.22], [-0.07, 0.02], [0.05, 0.16], [0.14, 0.20]], color: cyanMat },
    { points: [[-0.20, 0.22], [-0.27, 0.02], [-0.17, -0.15], [-0.07, 0.02]], color: redMat },
    { points: [[-0.27, 0.02], [-0.34, -0.11], [-0.20, -0.30], [-0.17, -0.15]], color: redMat },
    { points: [[-0.34, -0.11], [-0.35, -0.29], [-0.16, -0.45], [-0.20, -0.30]], color: peachMat },
    { points: [[-0.17, -0.15], [-0.07, 0.02], [0.05, -0.12], [-0.05, -0.28]], color: greenMat },
    { points: [[-0.17, -0.15], [-0.05, -0.28], [0.05, -0.46], [-0.16, -0.45]], color: skyMat },
    { points: [[-0.05, -0.28], [0.05, -0.12], [0.20, -0.28], [0.15, -0.38], [0.05, -0.46]], color: purpleMat },
    { points: [[0.05, 0.16], [0.14, 0.20], [0.23, 0.05], [0.10, -0.08], [0.05, -0.12]], color: greenMat },
    { points: [[0.14, 0.20], [0.35, 0.15], [0.35, -0.08], [0.23, 0.05]], color: purpleMat },
    { points: [[0.23, 0.05], [0.35, -0.08], [0.25, -0.25], [0.10, -0.08]], color: redMat },
    { points: [[0.10, -0.08], [0.23, 0.05], [0.20, -0.28], [0.05, -0.12]], color: blueMat },
    { points: [[0.25, -0.25], [0.35, -0.08], [0.35, -0.34], [0.15, -0.38]], color: greenMat },
  ];

  const rightTileData = [
    { points: [[-0.18, 0.52], [-0.29, 0.46], [-0.18, 0.25], [-0.05, 0.39]], color: pinkMat },
    { points: [[-0.29, 0.46], [-0.40, 0.28], [-0.27, 0.08], [-0.18, 0.25]], color: pinkMat },
    { points: [[-0.40, 0.28], [-0.46, 0.08], [-0.35, -0.08], [-0.27, 0.08]], color: skyMat },
    { points: [[-0.46, 0.08], [-0.45, -0.13], [-0.34, -0.28], [-0.35, -0.08]], color: yellowMat },
    { points: [[-0.45, -0.13], [-0.38, -0.38], [-0.25, -0.23], [-0.34, -0.28]], color: greenMat },
    { points: [[-0.38, -0.38], [-0.27, -0.52], [-0.10, -0.48], [-0.25, -0.23]], color: greenMat },
    { points: [[-0.27, -0.52], [0.02, -0.55], [0.12, -0.45], [-0.10, -0.48]], color: skyMat },
    { points: [[0.02, -0.55], [0.27, -0.51], [0.18, -0.36], [0.12, -0.45]], color: greenMat },
    { points: [[0.27, -0.51], [0.37, -0.40], [0.34, -0.25], [0.18, -0.36]], color: purpleMat },
    { points: [[0.37, -0.40], [0.44, -0.23], [0.42, -0.08], [0.34, -0.25]], color: yellowMat },
    { points: [[0.44, -0.23], [0.47, -0.02], [0.43, 0.15], [0.42, -0.08]], color: orangeMat },
    { points: [[0.47, -0.02], [0.43, 0.24], [0.35, 0.38], [0.43, 0.15]], color: purpleMat },
    { points: [[0.43, 0.24], [0.34, 0.43], [0.27, 0.52], [0.35, 0.38]], color: mintMat },
    { points: [[0.34, 0.43], [0.23, 0.53], [0.08, 0.38], [0.18, 0.22], [0.27, 0.36], [0.35, 0.38]], color: cyanMat },
    { points: [[0.23, 0.53], [0.10, 0.56], [-0.05, 0.39], [0.08, 0.38]], color: pinkMat },
    { points: [[-0.05, 0.39], [-0.18, 0.25], [-0.05, 0.05], [0.08, 0.22], [0.18, 0.22]], color: skyMat },
    { points: [[-0.18, 0.25], [-0.27, 0.08], [-0.15, -0.10], [-0.05, 0.05]], color: blueMat },
    { points: [[-0.27, 0.08], [-0.35, -0.08], [-0.25, -0.23], [-0.15, -0.10]], color: greenMat },
    { points: [[-0.35, -0.08], [-0.34, -0.28], [-0.16, -0.44], [-0.25, -0.23]], color: greenMat },
    { points: [[-0.15, -0.10], [-0.05, 0.05], [0.08, -0.10], [-0.02, -0.25]], color: blueMat },
    { points: [[-0.15, -0.10], [-0.02, -0.25], [0.08, -0.45], [-0.16, -0.44]], color: greenMat },
    { points: [[-0.02, -0.25], [0.08, -0.10], [0.22, -0.26], [0.12, -0.42], [0.08, -0.45]], color: cyanMat },
    { points: [[0.08, 0.22], [0.18, 0.22], [0.30, 0.05], [0.18, -0.12], [0.08, -0.10]], color: skyMat },
    { points: [[0.18, 0.22], [0.35, 0.38], [0.43, 0.15], [0.30, 0.05]], color: purpleMat },
    { points: [[0.30, 0.05], [0.43, 0.15], [0.42, -0.08], [0.34, -0.20], [0.18, -0.12]], color: redMat },
    { points: [[0.18, -0.12], [0.34, -0.20], [0.28, -0.34], [0.12, -0.42], [0.22, -0.26]], color: greenMat },
    { points: [[0.34, -0.20], [0.42, -0.08], [0.34, -0.25], [0.28, -0.34]], color: mintMat },
  ];

  function createTileGroup(data, z, name) {
    const group = new THREE.Group();
    group.name = name;

    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      const points = entry.points;
      const shape = new THREE.Shape();
      shape.moveTo(points[0][0], points[0][1]);
      for (let j = 1; j < points.length; j++) {
        shape.lineTo(points[j][0], points[j][1]);
      }
      shape.closePath();

      const tileGeom = new THREE.ShapeGeometry(shape);
      const tile = new THREE.Mesh(tileGeom, entry.color);
      tile.name = name + "_tile_" + i;
      tile.position.z = z;
      group.add(tile);
    }
    return group;
  }

  function createRibbonRims(data, z, name) {
    const paths = [];
    for (const entry of data) {
      const points = entry.points;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const b = points[(i + 1) % points.length];
        paths.push([
          new THREE.Vector2(a[0], a[1]),
          new THREE.Vector2(b[0], b[1]),
        ]);
      }
    }

    const rimsGeom = createRibbonGeometry(paths, 0.018, 0.012);
    const rims = new THREE.Mesh(rimsGeom, goldMat);
    rims.name = name;
    rims.position.z = z;
    return rims;
  }

  function createPostGeometry() {
    const postShape = new THREE.Shape();
    postShape.moveTo(-0.018, 0);
    postShape.lineTo(0.018, 0);
    postShape.lineTo(0.012, 0.35);
    postShape.lineTo(-0.012, 0.35);
    postShape.closePath();

    return new THREE.ExtrudeGeometry(postShape, {
      depth: 0.05,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.005,
      bevelSize: 0.004,
      bevelSegments: 2,
    });
  }

  const postGeom = createPostGeometry();
  const clutchGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.035, 18);
  const clutchCapGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.039, 16);

  const left_earring = new THREE.Group();
  left_earring.name = "left_earring";
  left_earring.position.set(-0.56, 0, 0);
  left_earring.rotation.z = -0.045;
  left_earring.rotation.y = -0.035;

  const left_backing = new THREE.Mesh(backingGeom, darkGoldMat);
  left_backing.name = "left_backing";
  left_backing.position.z = -0.07;
  left_earring.add(left_backing);

  const left_front_frame = new THREE.Mesh(frontFrameGeom, goldMat);
  left_front_frame.name = "left_front_frame";
  left_front_frame.position.z = 0.012;
  left_earring.add(left_front_frame);

  const left_enamel_tiles = createTileGroup(
    leftTileData,
    0.039,
    "left_enamel_tiles"
  );
  left_earring.add(left_enamel_tiles);

  const left_mosaic_seams = createRibbonRims(
    leftTileData,
    0.048,
    "left_mosaic_seams"
  );
  left_earring.add(left_mosaic_seams);

  const left_post = new THREE.Mesh(postGeom, goldMat);
  left_post.name = "left_post";
  left_post.position.set(0, -0.08, -0.34);
  left_earring.add(left_post);

  const left_clutch = new THREE.Mesh(clutchGeom, goldMat);
  left_clutch.name = "left_clutch";
  left_clutch.rotation.x = Math.PI / 2;
  left_clutch.position.set(0, -0.08, -0.36);
  left_earring.add(left_clutch);

  const left_clutch_cap = new THREE.Mesh(clutchCapGeom, darkGoldMat);
  left_clutch_cap.name = "left_clutch_cap";
  left_clutch_cap.rotation.x = Math.PI / 2;
  left_clutch_cap.position.set(0, -0.08, -0.382);
  left_earring.add(left_clutch_cap);

  const right_earring = new THREE.Group();
  right_earring.name = "right_earring";
  right_earring.position.set(0.56, 0.005, 0);
  right_earring.rotation.z = 0.055;
  right_earring.rotation.y = 0.035;

  const right_backing = new THREE.Mesh(backingGeom, darkGoldMat);
  right_backing.name = "right_backing";
  right_backing.position.z = -0.07;
  right_earring.add(right_backing);

  const right_front_frame = new THREE.Mesh(frontFrameGeom, goldMat);
  right_front_frame.name = "right_front_frame";
  right_front_frame.position.z = 0.012;
  right_earring.add(right_front_frame);

  const right_enamel_tiles = createTileGroup(
    rightTileData,
    0.039,
    "right_enamel_tiles"
  );
  right_earring.add(right_enamel_tiles);

  const right_mosaic_seams = createRibbonRims(
    rightTileData,
    0.048,
    "right_mosaic_seams"
  );
  right_earring.add(right_mosaic_seams);

  const right_post = new THREE.Mesh(postGeom, goldMat);
  right_post.name = "right_post";
  right_post.position.set(0, -0.08, -0.34);
  right_earring.add(right_post);

  const right_clutch = new THREE.Mesh(clutchGeom, goldMat);
  right_clutch.name = "right_clutch";
  right_clutch.rotation.x = Math.PI / 2;
  right_clutch.position.set(0, -0.08, -0.36);
  right_earring.add(right_clutch);

  const right_clutch_cap = new THREE.Mesh(clutchCapGeom, darkGoldMat);
  right_clutch_cap.name = "right_clutch_cap";
  right_clutch_cap.rotation.x = Math.PI / 2;
  right_clutch_cap.position.set(0, -0.08, -0.382);
  right_earring.add(right_clutch_cap);

  root.add(left_earring, right_earring);

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