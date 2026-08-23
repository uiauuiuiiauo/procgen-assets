export default function generate(THREE) {
  const root = new THREE.Group();
  const vessel = new THREE.Group();
  root.add(vessel);

  const height = 2.1;
  const outerR = 0.5;
  const innerR = 0.445;
  const columnCount = 21;
  const rowCount = 13;
  const dTheta = Math.PI * 2 / columnCount;
  const tileDepth = 0.024;
  const groutWidth = 0.009;

  const groutMat = new THREE.MeshStandardMaterial({
    color: 0xd8d3c8,
    metalness: 0.0,
    roughness: 0.7
  });

  const inner_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x263b35,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide
  });

  const opening_shadowMat = new THREE.MeshStandardMaterial({
    color: 0x142722,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const red_tilesMat = new THREE.MeshStandardMaterial({
    color: 0xd7193f,
    metalness: 0.0,
    roughness: 0.4
  });
  const coral_tilesMat = new THREE.MeshStandardMaterial({
    color: 0xff6552,
    metalness: 0.0,
    roughness: 0.4
  });
  const orange_tilesMat = new THREE.MeshStandardMaterial({
    color: 0xf47718,
    metalness: 0.0,
    roughness: 0.4
  });
  const yellow_tilesMat = new THREE.MeshStandardMaterial({
    color: 0xffdc00,
    metalness: 0.0,
    roughness: 0.4
  });
  const green_tilesMat = new THREE.MeshStandardMaterial({
    color: 0x07964f,
    metalness: 0.0,
    roughness: 0.4
  });
  const teal_tilesMat = new THREE.MeshStandardMaterial({
    color: 0x08a6a5,
    metalness: 0.0,
    roughness: 0.4
  });
  const cyan_tilesMat = new THREE.MeshStandardMaterial({
    color: 0x18b9e8,
    metalness: 0.0,
    roughness: 0.4
  });
  const blue_tilesMat = new THREE.MeshStandardMaterial({
    color: 0x1558b5,
    metalness: 0.0,
    roughness: 0.4
  });
  const purple_tilesMat = new THREE.MeshStandardMaterial({
    color: 0x58409b,
    metalness: 0.0,
    roughness: 0.4
  });
  const cream_tilesMat = new THREE.MeshStandardMaterial({
    color: 0xf4efa8,
    metalness: 0.0,
    roughness: 0.4
  });

  const outer_grout_shellGeom = new THREE.CylinderGeometry(
    outerR - 0.003,
    outerR - 0.003,
    height,
    72,
    1,
    true
  );
  const outer_grout_shell = new THREE.Mesh(outer_grout_shellGeom, groutMat);
  vessel.add(outer_grout_shell);

  const inner_grout_shellGeom = new THREE.CylinderGeometry(
    innerR,
    innerR,
    height - 0.02,
    72,
    1,
    true
  );
  const inner_grout_shell = new THREE.Mesh(inner_grout_shellGeom, groutMat);
  vessel.add(inner_grout_shell);

  const inner_surfaceGeom = new THREE.CylinderGeometry(
    innerR - 0.006,
    innerR - 0.006,
    height - 0.045,
    72,
    1,
    true
  );
  const inner_surface = new THREE.Mesh(inner_surfaceGeom, inner_surfaceMat);
  inner_surface.position.y = 0.004;
  vessel.add(inner_surface);

  const top_grout_annulusGeom = new THREE.RingGeometry(innerR, outerR, 72);
  const top_grout_annulus = new THREE.Mesh(top_grout_annulusGeom, groutMat);
  top_grout_annulus.rotation.x = -Math.PI / 2;
  top_grout_annulus.position.y = height / 2;
  vessel.add(top_grout_annulus);

  const inner_lipGeom = new THREE.TorusGeometry(innerR + 0.007, 0.012, 8, 72);
  const inner_lip = new THREE.Mesh(inner_lipGeom, groutMat);
  inner_lip.rotation.x = Math.PI / 2;
  inner_lip.position.y = height / 2 + 0.002;
  vessel.add(inner_lip);

  const opening_shadowGeom = new THREE.CircleGeometry(innerR - 0.022, 64);
  const opening_shadow = new THREE.Mesh(opening_shadowGeom, opening_shadowMat);
  opening_shadow.rotation.x = -Math.PI / 2;
  opening_shadow.position.y = height / 2 - 0.13;
  vessel.add(opening_shadow);

  const bottom_baseGeom = new THREE.CircleGeometry(outerR - 0.006, 64);
  const bottom_base = new THREE.Mesh(bottom_baseGeom, groutMat);
  bottom_base.rotation.x = Math.PI / 2;
  bottom_base.position.y = -height / 2;
  vessel.add(bottom_base);

  const outer_tileGeom = new THREE.CylinderGeometry(
    1,
    1,
    1,
    4,
    1,
    true,
    -Math.PI / 4,
    Math.PI / 2
  );

  const tileBuckets = Array.from({ length: 10 }, () => []);
  const tileShades = [
    [1.00, 1.00, 1.00],
    [0.96, 0.98, 1.02],
    [1.03, 1.01, 0.97],
    [0.98, 1.03, 1.01],
    [1.01, 0.97, 1.02]
  ];

  const thetaStart = -Math.PI - dTheta / 2;
  const yStart = -0.96;
  const cellDTheta = dTheta / Math.SQRT2;
  const cellHeight = 0.17;

  for (let row = 0; row < rowCount; row++) {
    const centerY = yStart + cellHeight * (row + 0.5);
    const stagger = row % 2 === 0 ? 0 : dTheta / 2;

    for (let column = 0; column < columnCount; column++) {
      const centerTheta = thetaStart + dTheta * column + stagger;
      const colorIndex =
        (column * 7 + row * 11 + (column * row) % 5) % 10;
      const shade =
        tileShades[(column * 3 + row * 2 + column * row) % tileShades.length];

      tileBuckets[colorIndex].push([
        centerTheta,
        centerY,
        shade[0],
        shade[1],
        shade[2]
      ]);
    }
  }

  const red_tiles = createTileInstances(
    tileBuckets[0],
    red_tilesMat
  );
  const coral_tiles = createTileInstances(
    tileBuckets[1],
    coral_tilesMat
  );
  const orange_tiles = createTileInstances(
    tileBuckets[2],
    orange_tilesMat
  );
  const yellow_tiles = createTileInstances(
    tileBuckets[3],
    yellow_tilesMat
  );
  const green_tiles = createTileInstances(
    tileBuckets[4],
    green_tilesMat
  );
  const teal_tiles = createTileInstances(
    tileBuckets[5],
    teal_tilesMat
  );
  const cyan_tiles = createTileInstances(
    tileBuckets[6],
    cyan_tilesMat
  );
  const blue_tiles = createTileInstances(
    tileBuckets[7],
    blue_tilesMat
  );
  const purple_tiles = createTileInstances(
    tileBuckets[8],
    purple_tilesMat
  );
  const cream_tiles = createTileInstances(
    tileBuckets[9],
    cream_tilesMat
  );

  vessel.add(
    red_tiles,
    coral_tiles,
    orange_tiles,
    yellow_tiles,
    green_tiles,
    teal_tiles,
    cyan_tiles,
    blue_tiles,
    purple_tiles,
    cream_tiles
  );

  fitToUnitCube(THREE, root);
  return root;

  function createTileInstances(entries, material) {
    const mesh = new THREE.InstancedMesh(
      outer_tileGeom,
      material,
      entries.length
    );
    const tileRadius = outerR + tileDepth / 2 - 0.001;
    const arcSpan = cellDTheta - groutWidth;
    const tileWidth = tileRadius * arcSpan;
    const tileHeight = cellHeight - groutWidth;
    const tileArc = tileWidth / tileRadius;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      dummy.position.set(0, entry[1], tileRadius);
      dummy.rotation.set(0, entry[0], 0);
      dummy.scale.set(
        tileRadius * entry[2],
        tileHeight * entry[3],
        tileRadius * entry[4]
      );
      dummy.rotateX(tileArc / 2);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    return mesh;
  }
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