export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rounded_puzzle_cube";

  const white_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0xf2f1eb,
    metalness: 0.0,
    roughness: 0.3,
  });
  const red_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0xef3d32,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x0755c5,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dark_blue_plastic_mat = new THREE.MeshStandardMaterial({
    color: 0x063b91,
    metalness: 0.0,
    roughness: 0.3,
  });
  const dark_core_mat = new THREE.MeshStandardMaterial({
    color: 0x101820,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedBoxGeometry(width, height, depth, radius) {
    const bevel = Math.min(
      radius * 0.45,
      width * 0.12,
      height * 0.12,
      depth * 0.12
    );
    const shapeWidth = width - bevel * 2;
    const shapeHeight = height - bevel * 2;
    const shapeDepth = depth - bevel * 2;
    const corner = Math.max(0.002, radius - bevel);
    const halfWidth = shapeWidth * 0.5;
    const halfHeight = shapeHeight * 0.5;

    const shape = new THREE.Shape();
    shape.moveTo(-halfWidth + corner, -halfHeight);
    shape.lineTo(halfWidth - corner, -halfHeight);
    shape.quadraticCurveTo(
      halfWidth,
      -halfHeight,
      halfWidth,
      -halfHeight + corner
    );
    shape.lineTo(halfWidth, halfHeight - corner);
    shape.quadraticCurveTo(
      halfWidth,
      halfHeight,
      halfWidth - corner,
      halfHeight
    );
    shape.lineTo(-halfWidth + corner, halfHeight);
    shape.quadraticCurveTo(
      -halfWidth,
      halfHeight,
      -halfWidth,
      halfHeight - corner
    );
    shape.lineTo(-halfWidth, -halfHeight + corner);
    shape.quadraticCurveTo(
      -halfWidth,
      -halfHeight,
      -halfWidth + corner,
      -halfHeight
    );
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: shapeDepth,
      steps: 1,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -shapeDepth * 0.5);
    return geometry;
  }

  const cube_core_geom = new THREE.BoxGeometry(2.66, 2.66, 2.66);
  const cube_core = new THREE.Mesh(cube_core_geom, dark_core_mat);
  cube_core.name = "cube_core";
  root.add(cube_core);

  const outer_face_tiles_geom = roundedBoxGeometry(
    0.86,
    0.86,
    0.14,
    0.115
  );
  const white_outer_face_tiles_mat = white_plastic_mat;
  const red_outer_face_tiles_mat = red_plastic_mat;
  const white_outer_face_tiles = new THREE.InstancedMesh(
    outer_face_tiles_geom,
    white_outer_face_tiles_mat,
    54
  );
  const red_outer_face_tiles = new THREE.InstancedMesh(
    outer_face_tiles_geom,
    red_outer_face_tiles_mat,
    18
  );
  white_outer_face_tiles.name = "white_outer_face_tiles";
  red_outer_face_tiles.name = "red_outer_face_tiles";

  const face_definitions = [
    {
      normal: new THREE.Vector3(0, 0, 1),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 1, 0),
    },
    {
      normal: new THREE.Vector3(0, 0, -1),
      u: new THREE.Vector3(-1, 0, 0),
      v: new THREE.Vector3(0, 1, 0),
    },
    {
      normal: new THREE.Vector3(1, 0, 0),
      u: new THREE.Vector3(0, 0, -1),
      v: new THREE.Vector3(0, 1, 0),
    },
    {
      normal: new THREE.Vector3(-1, 0, 0),
      u: new THREE.Vector3(0, 0, 1),
      v: new THREE.Vector3(0, 1, 0),
    },
    {
      normal: new THREE.Vector3(0, 1, 0),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 0, -1),
    },
    {
      normal: new THREE.Vector3(0, -1, 0),
      u: new THREE.Vector3(1, 0, 0),
      v: new THREE.Vector3(0, 0, 1),
    },
  ];

  const tile_distance = 0.88;
  const tile_matrix = new THREE.Matrix4();
  let white_tile_index = 0;
  let red_tile_index = 0;

  for (let faceIndex = 0; faceIndex < face_definitions.length; faceIndex++) {
    const face = face_definitions[faceIndex];
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        const position = face.normal
          .clone()
          .multiplyScalar(1.33)
          .addScaledVector(face.u, (column - 1) * tile_distance)
          .addScaledVector(face.v, (row - 1) * tile_distance);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          face.normal
        );
        tile_matrix.compose(
          position,
          quaternion,
          new THREE.Vector3(1, 1, 1)
        );

        const isRed =
          (row + column + faceIndex * 2) % 4 === 0;
        if (isRed) {
          red_outer_face_tiles.setMatrixAt(
            red_tile_index++,
            tile_matrix
          );
        } else {
          white_outer_face_tiles.setMatrixAt(
            white_tile_index++,
            tile_matrix
          );
        }
      }
    }
  }

  white_outer_face_tiles.instanceMatrix.needsUpdate = true;
  red_outer_face_tiles.instanceMatrix.needsUpdate = true;
  root.add(white_outer_face_tiles, red_outer_face_tiles);

  const center_face_discs_geom = new THREE.CylinderGeometry(
    0.395,
    0.395,
    0.1,
    32
  );
  const center_face_discs_mat = blue_plastic_mat;
  const center_face_discs = new THREE.InstancedMesh(
    center_face_discs_geom,
    center_face_discs_mat,
    6
  );
  center_face_discs.name = "center_face_discs";

  const center_disc_rims_geom = new THREE.TorusGeometry(
    0.36,
    0.035,
    10,
    32
  );
  const center_disc_rims_mat = dark_blue_plastic_mat;
  const center_disc_rims = new THREE.InstancedMesh(
    center_disc_rims_geom,
    center_disc_rims_mat,
    6
  );
  center_disc_rims.name = "center_disc_rims";

  const disc_matrix = new THREE.Matrix4();
  const rim_matrix = new THREE.Matrix4();
  const local_cylinder_normal = new THREE.Vector3(0, 1, 0);
  const local_ring_normal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < face_definitions.length; i++) {
    const face = face_definitions[i];

    const disc_position = face.normal.clone().multiplyScalar(1.435);
    const disc_quaternion = new THREE.Quaternion().setFromUnitVectors(
      local_cylinder_normal,
      face.normal
    );
    disc_matrix.compose(
      disc_position,
      disc_quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    center_face_discs.setMatrixAt(i, disc_matrix);

    const rim_position = face.normal.clone().multiplyScalar(1.475);
    const rim_quaternion = new THREE.Quaternion().setFromUnitVectors(
      local_ring_normal,
      face.normal
    );
    rim_matrix.compose(
      rim_position,
      rim_quaternion,
      new THREE.Vector3(1, 1, 1)
    );
    center_disc_rims.setMatrixAt(i, rim_matrix);
  }

  center_face_discs.instanceMatrix.needsUpdate = true;
  center_disc_rims.instanceMatrix.needsUpdate = true;
  root.add(center_face_discs, center_disc_rims);

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