export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "four_by_four_puzzle_cube";

  const cube_coreMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    metalness: 0.0,
    roughness: 0.8,
  });

  const red_stickersMat = new THREE.MeshStandardMaterial({
    color: 0xff4149,
    metalness: 0.0,
    roughness: 0.3,
  });
  const orange_stickersMat = new THREE.MeshStandardMaterial({
    color: 0xff6738,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellow_stickersMat = new THREE.MeshStandardMaterial({
    color: 0xffed22,
    metalness: 0.0,
    roughness: 0.3,
  });
  const green_stickersMat = new THREE.MeshStandardMaterial({
    color: 0x10b978,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_stickersMat = new THREE.MeshStandardMaterial({
    color: 0x098cf2,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cyan_stickersMat = new THREE.MeshStandardMaterial({
    color: 0x0799ac,
    metalness: 0.0,
    roughness: 0.3,
  });

  function makeRoundedRectangleShape(width, height, radius) {
    const shape = new THREE.Shape();
    const halfW = width / 2;
    const halfH = height / 2;

    shape.moveTo(-halfW + radius, -halfH);
    shape.lineTo(halfW - radius, -halfH);
    shape.quadraticCurveTo(halfW, -halfH, halfW, -halfH + radius);
    shape.lineTo(halfW, halfH - radius);
    shape.quadraticCurveTo(halfW, halfH, halfW - radius, halfH);
    shape.lineTo(-halfW + radius, halfH);
    shape.quadraticCurveTo(-halfW, halfH, -halfW, halfH - radius);
    shape.lineTo(-halfW, -halfH + radius);
    shape.quadraticCurveTo(-halfW, -halfH, -halfW + radius, -halfH);
    shape.closePath();
    return shape;
  }

  const cube_coreShape = makeRoundedRectangleShape(3.86, 3.86, 0.24);
  const cube_coreGeom = new THREE.ExtrudeGeometry(cube_coreShape, {
    depth: 3.86,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.10,
    bevelSize: 0.10,
    bevelSegments: 4,
  });
  cube_coreGeom.translate(0, 0, -1.93);

  const cube_core = new THREE.Mesh(cube_coreGeom, cube_coreMat);
  cube_core.name = "cube_core";
  root.add(cube_core);

  const stickerShape = makeRoundedRectangleShape(0.88, 0.88, 0.105);
  const stickerGeom = new THREE.ExtrudeGeometry(stickerShape, {
    depth: 0.035,
    steps: 1,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  stickerGeom.translate(0, 0, -0.0175);

  const sticker_transforms = {
    red: [],
    orange: [],
    yellow: [],
    green: [],
    blue: [],
    cyan: [],
  };

  const unitScale = new THREE.Vector3(1, 1, 1);
  const stickerSurface = 2.045;
  const stickerStep = 0.95;

  function stickerPosition(face, u, v) {
    if (face === "front") return new THREE.Vector3(u, v, stickerSurface);
    if (face === "back") return new THREE.Vector3(-u, v, -stickerSurface);
    if (face === "right") return new THREE.Vector3(stickerSurface, v, -u);
    if (face === "left") return new THREE.Vector3(-stickerSurface, v, u);
    if (face === "top") return new THREE.Vector3(u, stickerSurface, -v);
    return new THREE.Vector3(u, -stickerSurface, v);
  }

  function stickerQuaternion(face) {
    const position = stickerPosition(face, 0, 0);
    const normal = position.clone().normalize();
    return new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
  }

  function recordSticker(color, face, column, row) {
    const u = (column - 1.5) * stickerStep;
    const v = (1.5 - row) * stickerStep;
    const matrix = new THREE.Matrix4();
    matrix.compose(
      stickerPosition(face, u, v),
      stickerQuaternion(face),
      unitScale
    );
    sticker_transforms[color].push(matrix);
  }

  const front_layout = [
    "green", "yellow", "blue", "orange",
    "blue", "red", "blue", "green",
    "green", "yellow", "green", "green",
    "orange", "yellow", "red", "blue",
  ];
  const right_layout = [
    "orange", "yellow", "blue",
    "green", "yellow", "green",
    "green", "green", "orange",
    "green", "yellow", "red",
  ];
  const top_layout = [
    "red", "yellow", "orange", "orange",
    "yellow", "cyan", "blue", "orange",
    "green", "cyan", "red", "green",
    "green", "yellow", "red", "blue",
  ];
  const left_layout = [
    "orange", "green", "yellow", "red",
    "yellow", "blue", "green", "orange",
    "blue", "red", "yellow", "green",
    "green", "orange", "blue", "yellow",
  ];
  const back_layout = [
    "yellow", "red", "green", "orange",
    "green", "orange", "blue", "yellow",
    "red", "blue", "green", "cyan",
    "orange", "yellow", "red", "green",
  ];
  const bottom_layout = [
    "blue", "green", "red", "yellow",
    "orange", "yellow", "green", "red",
    "green", "cyan", "orange", "blue",
    "yellow", "red", "green", "orange",
  ];

  function recordFaceLayout(face, layout) {
    const columns = face === "right" || face === "left" ? 3 : 4;
    for (let row = 0; row < 4; row++) {
      for (let column = 0; column < columns; column++) {
        recordSticker(layout[row * columns + column], face, column, row);
      }
    }
  }

  recordFaceLayout("front", front_layout);
  recordFaceLayout("right", right_layout);
  recordFaceLayout("top", top_layout);
  recordFaceLayout("left", left_layout);
  recordFaceLayout("back", back_layout);
  recordFaceLayout("bottom", bottom_layout);

  function createStickerInstances(name, material, transforms) {
    const mesh = new THREE.InstancedMesh(
      stickerGeom,
      material,
      transforms.length
    );
    mesh.name = name;
    for (let i = 0; i < transforms.length; i++) {
      mesh.setMatrixAt(i, transforms[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    root.add(mesh);
    return mesh;
  }

  const red_stickers = createStickerInstances(
    "red_stickers",
    red_stickersMat,
    sticker_transforms.red
  );
  const orange_stickers = createStickerInstances(
    "orange_stickers",
    orange_stickersMat,
    sticker_transforms.orange
  );
  const yellow_stickers = createStickerInstances(
    "yellow_stickers",
    yellow_stickersMat,
    sticker_transforms.yellow
  );
  const green_stickers = createStickerInstances(
    "green_stickers",
    green_stickersMat,
    sticker_transforms.green
  );
  const blue_stickers = createStickerInstances(
    "blue_stickers",
    blue_stickersMat,
    sticker_transforms.blue
  );
  const cyan_stickers = createStickerInstances(
    "cyan_stickers",
    cyan_stickersMat,
    sticker_transforms.cyan
  );

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