export default function generate(THREE) {
  const root = new THREE.Group();

  const height = 1.35;
  const bottomW = 0.92;
  const bottomD = 0.70;
  const topW = 0.68;
  const topD = 0.48;

  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  function createPanelGeometry(a, b, c, d, outward) {
    const positions = [
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z,
      d.x, d.y, d.z,
    ];
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(outward ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3]);
    geom.computeVertexNormals();
    return geom;
  }

  function createRoundedRingGeometry(width, depth, radius, tubeRadius) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5],
    ];
    for (const corner of corners) {
      for (let i = 0; i < 6; i++) {
        const angle = corner[2] + i / 5 * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          0,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    const curve = new THREE.CatmullRomCurve3(points, true, "centripetal");
    return new THREE.TubeGeometry(curve, 96, tubeRadius, 10, true);
  }

  function createRodBetween(start, end, radius, material) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const geom = new THREE.CylinderGeometry(radius, radius, length, 12);
    const mesh = new THREE.Mesh(geom, material);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    return mesh;
  }

  function frontSurfaceZ(y, offset) {
    return bottomD / 2 +
      (y / height) * (topD / 2 - bottomD / 2) +
      offset;
  }

  function sideSurfaceX(side, y, offset) {
    return side * (bottomW / 2 +
      (y / height) * (topW / 2 - bottomW / 2)) +
      offset;
  }

  const front_panelGeom = createPanelGeometry(
    new THREE.Vector3(-bottomW / 2, 0, bottomD / 2),
    new THREE.Vector3(bottomW / 2, 0, bottomD / 2),
    new THREE.Vector3(topW / 2, height, topD / 2),
    new THREE.Vector3(-topW / 2, height, topD / 2),
    true
  );
  const front_panel = new THREE.Mesh(front_panelGeom, brushedMat);
  root.add(front_panel);

  const back_panelGeom = createPanelGeometry(
    new THREE.Vector3(bottomW / 2, 0, -bottomD / 2),
    new THREE.Vector3(-bottomW / 2, 0, -bottomD / 2),
    new THREE.Vector3(-topW / 2, height, -topD / 2),
    new THREE.Vector3(topW / 2, height, -topD / 2),
    true
  );
  const back_panel = new THREE.Mesh(back_panelGeom, brushedMat);
  root.add(back_panel);

  const right_panelGeom = createPanelGeometry(
    new THREE.Vector3(bottomW / 2, 0, bottomD / 2),
    new THREE.Vector3(bottomW / 2, 0, -bottomD / 2),
    new THREE.Vector3(topW / 2, height, -topD / 2),
    new THREE.Vector3(topW / 2, height, topD / 2),
    true
  );
  const right_panel = new THREE.Mesh(right_panelGeom, brushedMat);
  root.add(right_panel);

  const left_panelGeom = createPanelGeometry(
    new THREE.Vector3(-bottomW / 2, 0, -bottomD / 2),
    new THREE.Vector3(-bottomW / 2, 0, bottomD / 2),
    new THREE.Vector3(-topW / 2, height, topD / 2),
    new THREE.Vector3(-topW / 2, height, -topD / 2),
    true
  );
  const left_panel = new THREE.Mesh(left_panelGeom, brushedMat);
  root.add(left_panel);

  const interior_floorGeom = new THREE.BoxGeometry(0.72, 0.018, 0.50);
  const interior_floor = new THREE.Mesh(interior_floorGeom, darkMat);
  interior_floor.position.set(0, height - 0.075, 0);
  root.add(interior_floor);

  const front_inner_shadowGeom = new THREE.BoxGeometry(0.62, 0.028, 0.018);
  const front_inner_shadow = new THREE.Mesh(front_inner_shadowGeom, darkMat);
  front_inner_shadow.position.set(0, height - 0.025, topD / 2 - 0.025);
  root.add(front_inner_shadow);

  const back_inner_shadowGeom = new THREE.BoxGeometry(0.62, 0.028, 0.018);
  const back_inner_shadow = new THREE.Mesh(back_inner_shadowGeom, darkMat);
  back_inner_shadow.position.set(0, height - 0.025, -topD / 2 + 0.025);
  root.add(back_inner_shadow);

  const right_inner_shadowGeom = new THREE.BoxGeometry(0.018, 0.028, 0.40);
  const right_inner_shadow = new THREE.Mesh(right_inner_shadowGeom, darkMat);
  right_inner_shadow.position.set(topW / 2 - 0.025, height - 0.025, 0);
  root.add(right_inner_shadow);

  const left_inner_shadowGeom = new THREE.BoxGeometry(0.018, 0.028, 0.40);
  const left_inner_shadow = new THREE.Mesh(left_inner_shadowGeom, darkMat);
  left_inner_shadow.position.set(-topW / 2 + 0.025, height - 0.025, 0);
  root.add(left_inner_shadow);

  const base_rimGeom = createRoundedRingGeometry(1.00, 0.80, 0.075, 0.025);
  const base_rim = new THREE.Mesh(base_rimGeom, polishedMat);
  base_rim.position.y = 0.018;
  root.add(base_rim);

  const base_trimGeom = createRoundedRingGeometry(0.96, 0.76, 0.065, 0.014);
  const base_trim = new THREE.Mesh(base_trimGeom, polishedMat);
  base_trim.position.y = 0.050;
  root.add(base_trim);

  const top_rimGeom = createRoundedRingGeometry(0.72, 0.52, 0.045, 0.015);
  const top_rim = new THREE.Mesh(top_rimGeom, polishedMat);
  top_rim.position.y = height + 0.008;
  root.add(top_rim);

  const corner_edge_trim = new THREE.Group();
  const bottomCorners = [
    new THREE.Vector3(-bottomW / 2, 0.04, bottomD / 2),
    new THREE.Vector3(bottomW / 2, 0.04, bottomD / 2),
    new THREE.Vector3(bottomW / 2, 0.04, -bottomD / 2),
    new THREE.Vector3(-bottomW / 2, 0.04, -bottomD / 2),
  ];
  const topCorners = [
    new THREE.Vector3(-topW / 2, height, topD / 2),
    new THREE.Vector3(topW / 2, height, topD / 2),
    new THREE.Vector3(topW / 2, height, -topD / 2),
    new THREE.Vector3(-topW / 2, height, -topD / 2),
  ];
  for (let i = 0; i < 4; i++) {
    corner_edge_trim.add(createRodBetween(
      bottomCorners[i],
      topCorners[i],
      0.009,
      polishedMat
    ));
  }
  root.add(corner_edge_trim);

  const handlePath = [
    new THREE.Vector3(-0.31, 1.27, -0.15),
    new THREE.Vector3(-0.33, 1.45, -0.15),
    new THREE.Vector3(-0.32, 1.62, -0.15),
    new THREE.Vector3(-0.25, 1.73, -0.15),
    new THREE.Vector3(-0.12, 1.78, -0.15),
    new THREE.Vector3(0.12, 1.78, -0.15),
    new THREE.Vector3(0.25, 1.73, -0.15),
    new THREE.Vector3(0.32, 1.62, -0.15),
    new THREE.Vector3(0.33, 1.45, -0.15),
    new THREE.Vector3(0.31, 1.27, -0.15),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(handlePath, false, "centripetal");
  const handleGeom = new THREE.TubeGeometry(handleCurve, 64, 0.043, 14, false);
  const handle = new THREE.Mesh(handleGeom, chromeMat);
  root.add(handle);

  const handle_mountGeom = new THREE.BoxGeometry(0.075, 0.16, 0.075);
  const handle_left_mount = new THREE.Mesh(handle_mountGeom, polishedMat);
  handle_left_mount.position.set(-0.31, 1.30, -0.15);
  root.add(handle_left_mount);

  const handle_right_mount = new THREE.Mesh(handle_mountGeom, polishedMat);
  handle_right_mount.position.set(0.31, 1.30, -0.15);
  root.add(handle_right_mount);

  const frontHoleData = [];
  for (let row = 0; row < 14; row++) {
    const y = 0.34 + row * 0.067;
    const stagger = row % 2 === 0 ? -0.018 : 0.018;
    for (let col = 0; col < 12; col++) {
      const x = (col - 5.5) * 0.048 + stagger;
      const edge = Math.max(0, Math.abs(x) - 0.22) * 0.35;
      frontHoleData.push({
        x,
        y: y + edge,
        rot: (row + col) % 2 === 0 ? -0.62 : 0.62,
      });
    }
  }

  const front_holesGeom = new THREE.CircleGeometry(1, 14);
  const front_holes = new THREE.InstancedMesh(
    front_holesGeom,
    darkMat,
    frontHoleData.length
  );
  const front_hole_rimsGeom = new THREE.TorusGeometry(1, 0.18, 6, 14);
  const front_hole_rims = new THREE.InstancedMesh(
    front_hole_rimsGeom,
    brushedMat,
    frontHoleData.length
  );
  const front_teethGeom = new THREE.ConeGeometry(0.014, 0.034, 3);
  const front_teeth = new THREE.InstancedMesh(
    front_teethGeom,
    polishedMat,
    frontHoleData.length
  );

  const dummy = new THREE.Object3D();
  for (let i = 0; i < frontHoleData.length; i++) {
    const data = frontHoleData[i];

    dummy.position.set(data.x, data.y, frontSurfaceZ(data.y, 0.004));
    dummy.rotation.set(0, 0, data.rot);
    dummy.scale.set(0.017, 0.025, 1);
    dummy.updateMatrix();
    front_holes.setMatrixAt(i, dummy.matrix);

    dummy.position.set(data.x, data.y, frontSurfaceZ(data.y, 0.008));
    dummy.rotation.set(0, 0, data.rot);
    dummy.scale.set(0.019, 0.027, 0.010);
    dummy.updateMatrix();
    front_hole_rims.setMatrixAt(i, dummy.matrix);

    dummy.position.set(
      data.x - Math.sin(data.rot) * 0.014,
      data.y + Math.cos(data.rot) * 0.014,
      frontSurfaceZ(data.y, 0.020)
    );
    dummy.rotation.set(Math.PI / 2, 0, data.rot);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    front_teeth.setMatrixAt(i, dummy.matrix);
  }
  front_holes.instanceMatrix.needsUpdate = true;
  front_hole_rims.instanceMatrix.needsUpdate = true;
  front_teeth.instanceMatrix.needsUpdate = true;
  root.add(front_holes, front_hole_rims, front_teeth);

  const sideHoleData = [];
  for (const side of [-1, 1]) {
    for (let row = 0; row < 15; row++) {
      const y = 0.20 + row * 0.078;
      const stagger = row % 2 === 0 ? -0.012 : 0.012;
      for (let col = 0; col < 8; col++) {
        const z = (col - 3.5) * 0.066 + stagger;
        const edge = Math.max(0, Math.abs(z) - 0.16) * 0.25;
        sideHoleData.push({
          side,
          y,
          z,
          rot: (row + col) % 2 === 0 ? -0.35 : 0.35,
        });
      }
    }
  }

  const side_holesGeom = new THREE.CircleGeometry(1, 14);
  const side_holes = new THREE.InstancedMesh(
    side_holesGeom,
    darkMat,
    sideHoleData.length
  );
  const side_hole_rimsGeom = new THREE.TorusGeometry(1, 0.20, 6, 14);
  const side_hole_rims = new THREE.InstancedMesh(
    side_hole_rimsGeom,
    brushedMat,
    sideHoleData.length
  );
  const side_teethGeom = new THREE.ConeGeometry(0.011, 0.025, 3);
  const side_teeth = new THREE.InstancedMesh(
    side_teethGeom,
    polishedMat,
    sideHoleData.length
  );

  const localNormal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < sideHoleData.length; i++) {
    const data = sideHoleData[i];
    const normal = new THREE.Vector3(data.side, 0, 0);
    const surfaceQuat = new THREE.Quaternion().setFromUnitVectors(localNormal, normal);
    const spinQuat = new THREE.Quaternion().setFromAxisAngle(localNormal, data.rot);
    const holeQuat = surfaceQuat.clone().multiply(spinQuat);
    const toothQuat = surfaceQuat.clone().multiply(spinQuat);

    dummy.position.set(
      sideSurfaceX(data.side, data.y, 0.004),
      data.y,
      data.z
    );
    dummy.quaternion.copy(holeQuat);
    dummy.scale.set(0.018, 0.026, 1);
    dummy.updateMatrix();
    side_holes.setMatrixAt(i, dummy.matrix);

    dummy.position.set(
      sideSurfaceX(data.side, data.y, 0.009),
      data.y,
      data.z
    );
    dummy.quaternion.copy(holeQuat);
    dummy.scale.set(0.020, 0.028, 0.010);
    dummy.updateMatrix();
    side_hole_rims.setMatrixAt(i, dummy.matrix);

    dummy.position.set(
      sideSurfaceX(data.side, data.y, 0.021),
      data.y + 0.010,
      data.z
    );
    dummy.quaternion.copy(toothQuat);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    side_teeth.setMatrixAt(i, dummy.matrix);
  }
  side_holes.instanceMatrix.needsUpdate = true;
  side_hole_rims.instanceMatrix.needsUpdate = true;
  side_teeth.instanceMatrix.needsUpdate = true;
  root.add(side_holes, side_hole_rims, side_teeth);

  const topHoleData = [];
  for (let i = 0; i < 12; i++) {
    topHoleData.push({
      x: -0.245 + i * 0.0445,
      z: 0.165,
      rot: i % 2 === 0 ? -0.25 : 0.25,
    });
  }

  const top_holesGeom = new THREE.CircleGeometry(1, 14);
  const top_holes = new THREE.InstancedMesh(
    top_holesGeom,
    darkMat,
    topHoleData.length
  );
  const top_hole_rimsGeom = new THREE.TorusGeometry(1, 0.18, 6, 14);
  const top_hole_rims = new THREE.InstancedMesh(
    top_hole_rimsGeom,
    brushedMat,
    topHoleData.length
  );

  const topNormal = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < topHoleData.length; i++) {
    const data = topHoleData[i];
    const surfaceQuat = new THREE.Quaternion().setFromUnitVectors(localNormal, topNormal);
    const spinQuat = new THREE.Quaternion().setFromAxisAngle(localNormal, data.rot);
    const quat = surfaceQuat.clone().multiply(spinQuat);

    dummy.position.set(data.x, height - 0.050, data.z);
    dummy.quaternion.copy(quat);
    dummy.scale.set(0.016, 0.024, 1);
    dummy.updateMatrix();
    top_holes.setMatrixAt(i, dummy.matrix);

    dummy.position.set(data.x, height - 0.046, data.z);
    dummy.quaternion.copy(quat);
    dummy.scale.set(0.018, 0.026, 0.009);
    dummy.updateMatrix();
    top_hole_rims.setMatrixAt(i, dummy.matrix);
  }
  top_holes.instanceMatrix.needsUpdate = true;
  top_hole_rims.instanceMatrix.needsUpdate = true;
  root.add(top_holes, top_hole_rims);

  const glyphs = {
    G: ["01110", "10000", "10000", "10111", "10001", "10001", "01110"],
    R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
    A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  };
  const brandWord = "GRATER";
  const brandCells = [];
  for (let letter = 0; letter < brandWord.length; letter++) {
    const glyph = glyphs[brandWord[letter]];
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col] === "1") {
          brandCells.push({ letter, row, col });
        }
      }
    }
  }

  const brand_labelGeom = new THREE.BoxGeometry(0.009, 0.009, 0.005);
  const brand_label = new THREE.InstancedMesh(
    brand_labelGeom,
    darkMat,
    brandCells.length
  );
  const brandStartX = -(brandWord.length * 6 - 1) * 0.0105 / 2;
  for (let i = 0; i < brandCells.length; i++) {
    const cell = brandCells[i];
    const x = brandStartX + (cell.letter * 6 + cell.col) * 0.0105;
    const y = 0.155 - cell.row * 0.011;
    dummy.position.set(x, y, frontSurfaceZ(y, 0.008));
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    brand_label.setMatrixAt(i, dummy.matrix);
  }
  brand_label.instanceMatrix.needsUpdate = true;
  root.add(brand_label);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}