export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "gemstone_display_rack";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xb77a43,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x754321,
    metalness: 0.0,
    roughness: 0.6,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x241a14,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeGemMaterial(color, transmission) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness: 0.05,
      transmission,
      ior: 1.5,
      transparent: true,
      flatShading: true,
    });
  }

  const clear_gemMat = makeGemMaterial(0xf4f8ff, 0.82);
  const pink_gemMat = makeGemMaterial(0xee82b4, 0.55);
  const blue_gemMat = makeGemMaterial(0x55c8ee, 0.55);
  const mint_gemMat = makeGemMaterial(0x72d6b4, 0.58);
  const purple_gemMat = makeGemMaterial(0xc999e4, 0.55);
  const peach_gemMat = makeGemMaterial(0xf2a16e, 0.52);
  const yellow_gemMat = makeGemMaterial(0xe5d77c, 0.52);

  function makeRoundedRectangleShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;

    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function makeRoundedPanelGeometry(width, height, depth, radius, bevel) {
    const shape = makeRoundedRectangleShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
      curveSegments: 8,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const end_blockGeom = makeRoundedPanelGeometry(
    1.12,
    0.76,
    0.24,
    0.12,
    0.018
  );

  const left_end_block = new THREE.Mesh(end_blockGeom, woodMat);
  left_end_block.name = "left_end_block";
  left_end_block.rotation.y = Math.PI / 2;
  left_end_block.position.set(-1.55, 0.02, 0);
  root.add(left_end_block);

  const right_end_block = new THREE.Mesh(end_blockGeom, woodMat);
  right_end_block.name = "right_end_block";
  right_end_block.rotation.y = Math.PI / 2;
  right_end_block.position.set(1.55, 0.02, 0);
  root.add(right_end_block);

  const base_boardGeom = new THREE.BoxGeometry(3.08, 0.12, 0.96);
  const base_board = new THREE.Mesh(base_boardGeom, woodDarkMat);
  base_board.name = "base_board";
  base_board.position.set(0, -0.3, 0);
  root.add(base_board);

  const front_frameGeom = makeRoundedPanelGeometry(
    3.08,
    0.16,
    0.12,
    0.035,
    0.01
  );
  const front_frame = new THREE.Mesh(front_frameGeom, woodMat);
  front_frame.name = "front_frame";
  front_frame.position.set(0, -0.22, 0.51);
  root.add(front_frame);

  const rear_support_railGeom = makeRoundedPanelGeometry(
    3.02,
    0.1,
    0.08,
    0.025,
    0.008
  );
  const rear_support_rail = new THREE.Mesh(
    rear_support_railGeom,
    woodDarkMat
  );
  rear_support_rail.name = "rear_support_rail";
  rear_support_rail.position.set(0, -0.07, -0.49);
  root.add(rear_support_rail);

  const slatCount = 9;
  const slatWidth = 0.255;
  const slatDepth = 0.94;
  const slatThickness = 0.08;
  const slatTilt = 0.38;
  const slatCenterY = 0.05;

  const display_slatsGeom = makeRoundedPanelGeometry(
    slatWidth,
    slatDepth,
    slatThickness,
    0.045,
    0.012
  );
  const display_slats = new THREE.InstancedMesh(
    display_slatsGeom,
    woodMat,
    slatCount
  );
  display_slats.name = "display_slats";

  const slatPositions = [];
  const slatQuaternions = [];
  const transform = new THREE.Object3D();

  for (let i = 0; i < slatCount; i++) {
    const x = (i - (slatCount - 1) / 2) * 0.33;
    slatPositions.push(new THREE.Vector3(x, slatCenterY, 0));
    slatQuaternions.push(new THREE.Quaternion().setFromEuler(
      new THREE.Euler(slatTilt, 0, 0)
    ));
    transform.position.copy(slatPositions[i]);
    transform.quaternion.copy(slatQuaternions[i]);
    transform.scale.set(1, 1, 1);
    transform.updateMatrix();
    display_slats.setMatrixAt(i, transform.matrix);
  }
  display_slats.instanceMatrix.needsUpdate = true;
  root.add(display_slats);

  const support_pegsGeom = new THREE.CylinderGeometry(
    0.022,
    0.022,
    0.14,
    10
  );
  const support_pegs = new THREE.InstancedMesh(
    support_pegsGeom,
    silverMat,
    slatCount * 2
  );
  support_pegs.name = "support_pegs";

  let pegIndex = 0;
  for (let i = 0; i < slatCount; i++) {
    const slatPosition = slatPositions[i];
    for (const localZ of [-0.36, 0.36]) {
      const offset = new THREE.Vector3(0, -0.055, localZ)
        .applyQuaternion(slatQuaternions[i]);
      transform.position.copy(slatPosition).add(offset);
      transform.rotation.set(Math.PI / 2, 0, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      support_pegs.setMatrixAt(pegIndex, transform.matrix);
      pegIndex++;
    }
  }
  support_pegs.instanceMatrix.needsUpdate = true;
  root.add(support_pegs);

  const end_grain_linesGeom = new THREE.BoxGeometry(0.012, 0.5, 0.009);
  const end_grain_lines = new THREE.InstancedMesh(
    end_grain_linesGeom,
    woodDarkMat,
    4
  );
  end_grain_lines.name = "end_grain_lines";

  let grainIndex = 0;
  for (const side of [-1, 1]) {
    for (const z of [-0.045, 0.045]) {
      transform.position.set(side * 1.692, 0.02, z);
      transform.rotation.set(0, 0, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      end_grain_lines.setMatrixAt(grainIndex, transform.matrix);
      grainIndex++;
    }
  }
  end_grain_lines.instanceMatrix.needsUpdate = true;
  root.add(end_grain_lines);

  const left_hanging_holeGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.014,
    18
  );
  const left_hanging_hole = new THREE.Mesh(
    left_hanging_holeGeom,
    recessMat
  );
  left_hanging_hole.name = "left_hanging_hole";
  left_hanging_hole.rotation.z = Math.PI / 2;
  left_hanging_hole.position.set(-1.697, -0.04, 0.11);
  root.add(left_hanging_hole);

  const gemstoneGeom = new THREE.IcosahedronGeometry(1, 2);
  const gemstoneMatrices = Array.from({ length: 7 }, () => []);
  const gemstone_prongsGeom = new THREE.SphereGeometry(1, 8, 5);
  const gemstone_prongs = new THREE.InstancedMesh(
    gemstone_prongsGeom,
    silverMat,
    slatCount * 4 * 4
  );
  gemstone_prongs.name = "gemstone_prongs";

  let prongIndex = 0;
  const localUp = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < slatCount; i++) {
    const slatPosition = slatPositions[i];
    const slatQuaternion = slatQuaternions[i];

    for (let j = 0; j < 4; j++) {
      const localZ = -0.35 + j * 0.235;
      const variation = ((i * 3 + j * 2) % 5 - 2) * 0.008;
      const radius = 0.09 + variation;
      const aspect = 0.94 + ((i + j * 2) % 4) * 0.025;
      const thickness = 0.041 + ((i * 2 + j) % 3) * 0.003;
      const localOffset = new THREE.Vector3(0, 0, localZ);
      const gemCenter = slatPosition.clone().add(
        localOffset.clone().applyQuaternion(slatQuaternion)
      );
      const gemBase = gemCenter.clone().add(
        new THREE.Vector3(0, slatThickness / 2 + 0.006, 0)
          .applyQuaternion(slatQuaternion)
      );
      const normal = localUp.clone().applyQuaternion(slatQuaternion);
      const tangentX = new THREE.Vector3(1, 0, 0)
        .applyQuaternion(slatQuaternion);
      const tangentZ = new THREE.Vector3(0, 0, 1)
        .applyQuaternion(slatQuaternion);

      gemCenter.addScaledVector(normal, thickness);

      const gemQuaternion = new THREE.Quaternion().setFromUnitVectors(
        localUp,
        normal
      );
      const spin = ((i * 5 + j * 3) % 12) / 12 * Math.PI * 2;
      const spinQuaternion = new THREE.Quaternion().setFromAxisAngle(
        localUp,
        spin
      );
      gemQuaternion.multiply(spinQuaternion);

      const gemScale = new THREE.Vector3(
        radius * aspect,
        thickness,
        radius / aspect
      );
      const gemMatrix = new THREE.Matrix4().compose(
        gemCenter,
        gemQuaternion,
        gemScale
      );
      const colorIndex = (i * 2 + j * 3 + (i + j) % 2) % 7;
      gemstoneMatrices[colorIndex].push(gemMatrix);

      for (const px of [-1, 1]) {
        for (const pz of [-1, 1]) {
          const prongPosition = gemCenter.clone()
            .addScaledVector(tangentX, px * radius * aspect * 0.78)
            .addScaledVector(tangentZ, pz * radius / aspect * 0.76);
          const prongScale = new THREE.Vector3(
            0.012,
            0.012,
            0.012
          );
          const prongMatrix = new THREE.Matrix4().compose(
            prongPosition,
            new THREE.Quaternion(),
            prongScale
          );
          gemstone_prongs.setMatrixAt(prongIndex, prongMatrix);
          prongIndex++;
        }
      }
    }
  }
  gemstone_prongs.instanceMatrix.needsUpdate = true;
  root.add(gemstone_prongs);

  function createGemInstances(name, material, matrices) {
    const mesh = new THREE.InstancedMesh(
      gemstoneGeom,
      material,
      matrices.length
    );
    mesh.name = name;
    for (let i = 0; i < matrices.length; i++) {
      mesh.setMatrixAt(i, matrices[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    root.add(mesh);
    return mesh;
  }

  const gemstones_clear = createGemInstances(
    "gemstones_clear",
    clear_gemMat,
    gemstoneMatrices[0]
  );
  const gemstones_pink = createGemInstances(
    "gemstones_pink",
    pink_gemMat,
    gemstoneMatrices[1]
  );
  const gemstones_blue = createGemInstances(
    "gemstones_blue",
    blue_gemMat,
    gemstoneMatrices[2]
  );
  const gemstones_mint = createGemInstances(
    "gemstones_mint",
    mint_gemMat,
    gemstoneMatrices[3]
  );
  const gemstones_purple = createGemInstances(
    "gemstones_purple",
    purple_gemMat,
    gemstoneMatrices[4]
  );
  const gemstones_peach = createGemInstances(
    "gemstones_peach",
    peach_gemMat,
    gemstoneMatrices[5]
  );
  const gemstones_yellow = createGemInstances(
    "gemstones_yellow",
    yellow_gemMat,
    gemstoneMatrices[6]
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