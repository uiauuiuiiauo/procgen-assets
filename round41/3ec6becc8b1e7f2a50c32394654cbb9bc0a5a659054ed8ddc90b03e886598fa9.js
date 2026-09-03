export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gumball_container";

  const container_shell = new THREE.Group();
  container_shell.name = "container_shell";

  const gumball_fill = new THREE.Group();
  gumball_fill.name = "gumball_fill";

  const red_gumballMat = new THREE.MeshStandardMaterial({
    color: 0xf02b28,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blue_gumballMat = new THREE.MeshStandardMaterial({
    color: 0x087fda,
    metalness: 0.0,
    roughness: 0.3,
  });
  const green_gumballMat = new THREE.MeshStandardMaterial({
    color: 0x08a94f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellow_gumballMat = new THREE.MeshStandardMaterial({
    color: 0xffdc18,
    metalness: 0.0,
    roughness: 0.3,
  });
  const orange_gumballMat = new THREE.MeshStandardMaterial({
    color: 0xff6a1a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pink_gumballMat = new THREE.MeshStandardMaterial({
    color: 0xf25b8d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const purple_gumballMat = new THREE.MeshStandardMaterial({
    color: 0x55469b,
    metalness: 0.0,
    roughness: 0.3,
  });
  const cream_gumballMat = new THREE.MeshStandardMaterial({
    color: 0xf1edcf,
    metalness: 0.0,
    roughness: 0.3,
  });
  const teal_gumballMat = new THREE.MeshStandardMaterial({
    color: 0x168b91,
    metalness: 0.0,
    roughness: 0.3,
  });

  const outer_glass_shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf6f8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const gumballGeom = new THREE.SphereGeometry(1, 20, 14);
  const ball_batches = Array.from({ length: 9 }, () => []);

  function appendBall(x, y, z, radius, colorIndex) {
    const batch = ball_batches[colorIndex];
    batch.push(x, y, z, radius);
  }

  const spacing = 0.18;
  const fillRadius = 0.86;
  const fillCenterY = 0.01;
  const fillVerticalRadius = fillRadius;
  const fillHorizontalRadius = fillRadius;
  const layerCount = 16;

  for (let layer = 0; layer < layerCount; layer++) {
    const baseY = -0.855 + layer * (1.71 / (layerCount - 1));

    for (let row = -6; row <= 6; row++) {
      for (let column = -6; column <= 6; column++) {
        const rowOffset = ((row + layer) & 1) ? spacing * 0.5 : 0;
        const layerShift = (layer & 1) ? spacing * 0.22 : -spacing * 0.11;
        const gridX = column * spacing + rowOffset + layerShift;
        const gridZ = row * spacing * 0.8660254 + layer * 0.004;

        const nx = gridX / fillHorizontalRadius;
        const ny = (baseY - fillCenterY) / fillVerticalRadius;
        const nz = gridZ / fillRadius;
        const sphereMetric = nx * nx + ny * ny + nz * nz;

        if (sphereMetric <= 1) {
          const jitterX =
            0.011 * Math.sin((column + 7) * 1.71 + (row + 9) * 0.83 + layer * 1.19);
          const jitterY =
            0.008 * Math.sin((row + 5) * 1.37 + layer * 0.91 + column * 0.43);
          const jitterZ =
            0.011 * Math.cos((column - 4) * 1.13 + row * 0.67 - layer * 0.79);

          const x = gridX + jitterX;
          const y = baseY + jitterY;
          const z = gridZ + jitterZ;
          const radius =
            0.087 +
            0.009 *
              (0.5 +
                0.5 *
                  Math.sin(column * 1.29 + row * 0.73 + layer * 1.61));

          const colorCode =
            (column * 17 + row * 31 + layer * 47 + 612) % 101;
          let colorIndex;

          if (colorCode < 18) colorIndex = 0;
          else if (colorCode < 36) colorIndex = 1;
          else if (colorCode < 54) colorIndex = 2;
          else if (colorCode < 68) colorIndex = 3;
          else if (colorCode < 78) colorIndex = 4;
          else if (colorCode < 84) colorIndex = 5;
          else if (colorCode < 88) colorIndex = 6;
          else if (colorCode < 94) colorIndex = 7;
          else colorIndex = 8;

          appendBall(x, y, z, radius, colorIndex);
        }
      }
    }
  }

  function createGumballInstances(name, material, batch) {
    const count = batch.length / 4;
    const mesh = new THREE.InstancedMesh(gumballGeom, material, count);
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    mesh.name = name;

    for (let i = 0; i < count; i++) {
      const offset = i * 4;
      position.set(batch[offset], batch[offset + 1], batch[offset + 2]);
      const radius = batch[offset + 3];
      scale.setScalar(radius);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingBox();
    mesh.computeBoundingSphere();
    mesh.frustumCulled = false;
    gumball_fill.add(mesh);
    return mesh;
  }

  const red_gumballs = createGumballInstances(
    "red_gumballs",
    red_gumballMat,
    ball_batches[0]
  );
  const blue_gumballs = createGumballInstances(
    "blue_gumballs",
    blue_gumballMat,
    ball_batches[1]
  );
  const green_gumballs = createGumballInstances(
    "green_gumballs",
    green_gumballMat,
    ball_batches[2]
  );
  const yellow_gumballs = createGumballInstances(
    "yellow_gumballs",
    yellow_gumballMat,
    ball_batches[3]
  );
  const orange_gumballs = createGumballInstances(
    "orange_gumballs",
    orange_gumballMat,
    ball_batches[4]
  );
  const pink_gumballs = createGumballInstances(
    "pink_gumballs",
    pink_gumballMat,
    ball_batches[5]
  );
  const purple_gumballs = createGumballInstances(
    "purple_gumballs",
    purple_gumballMat,
    ball_batches[6]
  );
  const cream_gumballs = createGumballInstances(
    "cream_gumballs",
    cream_gumballMat,
    ball_batches[7]
  );
  const teal_gumballs = createGumballInstances(
    "teal_gumballs",
    teal_gumballMat,
    ball_batches[8]
  );

  const outer_glass_shellGeom = new THREE.SphereGeometry(1.0, 48, 32);
  const outer_glass_shell = new THREE.Mesh(
    outer_glass_shellGeom,
    outer_glass_shellMat
  );
  outer_glass_shell.name = "outer_glass_shell";
  outer_glass_shell.renderOrder = 2;
  container_shell.add(outer_glass_shell);

  const glass_base_plateGeom = new THREE.CylinderGeometry(
    0.39,
    0.36,
    0.035,
    48
  );
  const glass_base_plate = new THREE.Mesh(
    glass_base_plateGeom,
    outer_glass_shellMat
  );
  glass_base_plate.name = "glass_base_plate";
  glass_base_plate.position.y = -0.985;
  glass_base_plate.renderOrder = 2;
  container_shell.add(glass_base_plate);

  const glass_base_rimGeom = new THREE.TorusGeometry(
    0.37,
    0.018,
    10,
    48
  );
  const glass_base_rim = new THREE.Mesh(
    glass_base_rimGeom,
    outer_glass_shellMat
  );
  glass_base_rim.name = "glass_base_rim";
  glass_base_rim.rotation.x = Math.PI / 2;
  glass_base_rim.position.y = -0.968;
  glass_base_rim.renderOrder = 2;
  container_shell.add(glass_base_rim);

  const glass_base_inner_rimGeom = new THREE.TorusGeometry(
    0.29,
    0.008,
    8,
    40
  );
  const glass_base_inner_rim = new THREE.Mesh(
    glass_base_inner_rimGeom,
    outer_glass_shellMat
  );
  glass_base_inner_rim.name = "glass_base_inner_rim";
  glass_base_inner_rim.rotation.x = Math.PI / 2;
  glass_base_inner_rim.position.y = -0.996;
  glass_base_inner_rim.renderOrder = 2;
  container_shell.add(glass_base_inner_rim);

  function createSurfaceArc(name, startAngle, endAngle, radius) {
    const points = [];
    const zRatio = 0.36;
    const z = Math.sqrt(1 - zRatio * zRatio);

    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      const angle = startAngle + (endAngle - startAngle) * t;
      points.push(
        new THREE.Vector3(
          radius * Math.cos(angle),
          radius * zRatio,
          radius * z
        )
      );
    }

    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const geometry = new THREE.TubeGeometry(
      curve,
      32,
      0.006,
      6,
      false
    );
    const mesh = new THREE.Mesh(geometry, glass_highlightMat);
    mesh.name = name;
    mesh.renderOrder = 3;
    container_shell.add(mesh);
    return mesh;
  }

  const upper_glass_highlight = createSurfaceArc(
    "upper_glass_highlight",
    0.72,
    1.62,
    1.006
  );
  const lower_glass_highlight = createSurfaceArc(
    "lower_glass_highlight",
    2.28,
    2.76,
    1.006
  );

  root.add(gumball_fill);
  root.add(container_shell);

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