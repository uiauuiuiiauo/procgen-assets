export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_mythological_box";

  const boxW = 3.2;
  const boxD = 2.5;
  const panelY = 0.88;
  const lidTopY = 1.62;

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc69a46,
    metalness: 0.55,
    roughness: 0.3,
  });
  const agedGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8b672d,
    metalness: 0.5,
    roughness: 0.45,
  });
  const pearlMat = new THREE.MeshStandardMaterial({
    color: 0xd8d4e8,
    metalness: 0.0,
    roughness: 0.4,
  });
  const pearlPinkMat = new THREE.MeshStandardMaterial({
    color: 0xe8c9df,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
  });
  const pearlBlueMat = new THREE.MeshStandardMaterial({
    color: 0xc6e3e5,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
  });
  const pearlMintMat = new THREE.MeshStandardMaterial({
    color: 0xcce5d5,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
  });

  const unitBoxGeom = new THREE.BoxGeometry(1, 1, 1);
  const unitSphereGeom = new THREE.SphereGeometry(1, 16, 10);
  const unitLimbGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const unitBeadGeom = new THREE.SphereGeometry(1, 10, 6);
  const unitReliefGeom = new THREE.SphereGeometry(1, 12, 8);
  const yAxis = new THREE.Vector3(0, 1, 0);

  function addBox(name, w, h, d, mat, x, y, z, parent = root) {
    const mesh = new THREE.Mesh(unitBoxGeom, mat);
    mesh.name = name;
    mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addSphere(name, mat, x, y, z, sx, sy, sz, parent = root) {
    const mesh = new THREE.Mesh(unitSphereGeom, mat);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.scale.set(sx, sy, sz);
    parent.add(mesh);
    return mesh;
  }

  function composeMatrix(x, y, z, rx, ry, rz, sx, sy, sz) {
    const position = new THREE.Vector3(x, y, z);
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(rx, ry, rz)
    );
    const scale = new THREE.Vector3(sx, sy, sz);
    return new THREE.Matrix4().compose(position, quaternion, scale);
  }

  function composeLimb(p1, p2, radius) {
    const direction = new THREE.Vector3().subVectors(p2, p1);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      yAxis,
      direction.normalize()
    );
    return new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(radius, length, radius)
    );
  }

  function createInstanced(name, geom, mat, matrices, parent = root) {
    const mesh = new THREE.InstancedMesh(geom, mat, matrices.length);
    mesh.name = name;
    for (let i = 0; i < matrices.length; i++) {
      mesh.setMatrixAt(i, matrices[i]);
    }
    mesh.instanceMatrix.needsUpdate = true;
    parent.add(mesh);
    return mesh;
  }

  function addTubePath(name, points, radius, mat, parent = root) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const geom = new THREE.TubeGeometry(curve, 24, radius, 7, false);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.name = name;
    parent.add(mesh);
    return mesh;
  }

  const box_feetGeom = new THREE.LatheGeometry([
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.13, 0.0),
    new THREE.Vector2(0.18, 0.045),
    new THREE.Vector2(0.17, 0.105),
    new THREE.Vector2(0.125, 0.17),
    new THREE.Vector2(0.12, 0.25),
    new THREE.Vector2(0.0, 0.25),
  ], 24);
  const box_feet = new THREE.InstancedMesh(box_feetGeom, agedGoldMat, 4);
  box_feet.name = "box_feet";
  const footPositions = [
    [-1.4, 0.18, 1.08],
    [1.4, 0.18, 1.08],
    [-1.4, 0.18, -1.08],
    [1.4, 0.18, -1.08],
  ];
  for (let i = 0; i < footPositions.length; i++) {
    const p = footPositions[i];
    box_feet.setMatrixAt(i, composeMatrix(p[0], p[1], p[2], 0, 0, 0, 1, 1, 1));
  }
  box_feet.instanceMatrix.needsUpdate = true;
  root.add(box_feet);

  const lower_plinthGeom = new THREE.BoxGeometry(3.34, 0.18, 2.64);
  const lower_plinth = new THREE.Mesh(lower_plinthGeom, goldMat);
  lower_plinth.name = "lower_plinth";
  lower_plinth.position.y = 0.35;
  root.add(lower_plinth);

  const lower_plinth_trim = new THREE.Group();
  lower_plinth_trim.name = "lower_plinth_trim";
  root.add(lower_plinth_trim);
  addBox("lower_front_rail", 3.42, 0.11, 0.12, agedGoldMat, 0, 0.43, 1.31, lower_plinth_trim);
  addBox("lower_back_rail", 3.42, 0.11, 0.12, agedGoldMat, 0, 0.43, -1.31, lower_plinth_trim);
  addBox("lower_left_rail", 0.12, 0.11, 2.55, agedGoldMat, -1.65, 0.43, 0, lower_plinth_trim);
  addBox("lower_right_rail", 0.12, 0.11, 2.55, agedGoldMat, 1.65, 0.43, 0, lower_plinth_trim);

  const front_panelGeom = new THREE.BoxGeometry(3.0, 0.82, 0.08);
  const front_panel = new THREE.Mesh(front_panelGeom, pearlMat);
  front_panel.name = "front_panel";
  front_panel.position.set(0, panelY, 1.215);
  root.add(front_panel);

  const back_panelGeom = new THREE.BoxGeometry(3.0, 0.82, 0.08);
  const back_panel = new THREE.Mesh(back_panelGeom, pearlMat);
  back_panel.name = "back_panel";
  back_panel.position.set(0, panelY, -1.215);
  root.add(back_panel);

  const side_panelGeom = new THREE.BoxGeometry(0.08, 0.82, 2.28);
  const left_side_panel = new THREE.Mesh(side_panelGeom, pearlMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.position.set(-1.56, panelY, 0);
  root.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, pearlMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.position.set(1.56, panelY, 0);
  root.add(right_side_panel);

  const body_frame = new THREE.Group();
  body_frame.name = "body_frame";
  root.add(body_frame);
  addBox("front_lower_frame", 3.22, 0.11, 0.13, agedGoldMat, 0, 0.49, 1.285, body_frame);
  addBox("front_upper_frame", 3.22, 0.12, 0.13, agedGoldMat, 0, 1.275, 1.285, body_frame);
  addBox("back_lower_frame", 3.22, 0.11, 0.13, agedGoldMat, 0, 0.49, -1.285, body_frame);
  addBox("back_upper_frame", 3.22, 0.12, 0.13, agedGoldMat, 0, 1.275, -1.285, body_frame);
  addBox("left_lower_frame", 0.13, 0.11, 2.46, agedGoldMat, -1.625, 0.49, 0, body_frame);
  addBox("left_upper_frame", 0.13, 0.12, 2.46, agedGoldMat, -1.625, 1.275, 0, body_frame);
  addBox("right_lower_frame", 0.13, 0.11, 2.46, agedGoldMat, 1.625, 0.49, 0, body_frame);
  addBox("right_upper_frame", 0.13, 0.12, 2.46, agedGoldMat, 1.625, 1.275, 0, body_frame);

  const corner_pillarsGeom = new THREE.BoxGeometry(0.24, 0.86, 0.24);
  const corner_pillars = new THREE.InstancedMesh(corner_pillarsGeom, agedGoldMat, 4);
  corner_pillars.name = "corner_pillars";
  const pillarPositions = [
    [-1.48, 0.88, 1.12],
    [1.48, 0.88, 1.12],
    [-1.48, 0.88, -1.12],
    [1.48, 0.88, -1.12],
  ];
  for (let i = 0; i < pillarPositions.length; i++) {
    const p = pillarPositions[i];
    corner_pillars.setMatrixAt(i, composeMatrix(p[0], p[1], p[2], 0, 0, 0, 1, 1, 1));
  }
  corner_pillars.instanceMatrix.needsUpdate = true;
  root.add(corner_pillars);

  const corner_pillar_rosettes = new THREE.InstancedMesh(unitSphereGeom, goldMat, 8);
  corner_pillar_rosettes.name = "corner_pillar_rosettes";
  let rosetteIndex = 0;
  for (const x of [-1.48, 1.48]) {
    for (const y of [0.69, 1.07]) {
      corner_pillar_rosettes.setMatrixAt(
        rosetteIndex++,
        composeMatrix(x, y, 1.247, 0, 0, 0, 0.075, 0.115, 0.025)
      );
    }
  }
  for (const z of [-1.12, 1.12]) {
    for (const y of [0.69, 1.07]) {
      corner_pillar_rosettes.setMatrixAt(
        rosetteIndex++,
        composeMatrix(1.607, y, z, 0, 0, 0, 0.025, 0.115, 0.075)
      );
    }
  }
  corner_pillar_rosettes.instanceMatrix.needsUpdate = true;
  root.add(corner_pillar_rosettes);

  const front_scrollwork = new THREE.Group();
  front_scrollwork.name = "front_scrollwork";
  root.add(front_scrollwork);
  for (const x of [-1.48, 1.48]) {
    addTubePath(
      "front_pillar_scroll",
      [
        new THREE.Vector3(x, 0.53, 1.25),
        new THREE.Vector3(x + (x < 0 ? 0.08 : -0.08), 0.67, 1.252),
        new THREE.Vector3(x, 0.83, 1.254),
        new THREE.Vector3(x + (x < 0 ? -0.07 : 0.07), 1.01, 1.252),
        new THREE.Vector3(x, 1.19, 1.25),
      ],
      0.025,
      goldMat,
      front_scrollwork
    );
  }

  const right_side_scrollwork = new THREE.Group();
  right_side_scrollwork.name = "right_side_scrollwork";
  root.add(right_side_scrollwork);
  for (const z of [-1.08, 1.08]) {
    addTubePath(
      "right_pillar_scroll",
      [
        new THREE.Vector3(1.61, 0.53, z),
        new THREE.Vector3(1.612, 0.68, z - 0.07),
        new THREE.Vector3(1.614, 0.84, z),
        new THREE.Vector3(1.612, 1.01, z + 0.07),
        new THREE.Vector3(1.61, 1.19, z),
      ],
      0.024,
      goldMat,
      right_side_scrollwork
    );
  }

  const front_beading_matrices = [];
  for (let i = 0; i < 32; i++) {
    const x = -1.48 + (2.96 * i) / 31;
    front_beading_matrices.push(composeMatrix(x, 1.275, 1.36, 0, 0, 0, 0.025, 0.025, 0.025));
  }
  const front_beading = createInstanced(
    "front_beading",
    unitBeadGeom,
    goldMat,
    front_beading_matrices
  );

  const side_beading_matrices = [];
  for (const x of [-1.69, 1.69]) {
    for (let i = 0; i < 24; i++) {
      const z = -1.08 + (2.16 * i) / 23;
      side_beading_matrices.push(composeMatrix(x, 1.275, z, 0, 0, 0, 0.025, 0.025, 0.025));
    }
  }
  const side_beading = createInstanced(
    "side_beading",
    unitBeadGeom,
    goldMat,
    side_beading_matrices
  );

  const lid_seam = new THREE.Group();
  lid_seam.name = "lid_seam";
  root.add(lid_seam);
  addBox("lid_seam_front", 3.3, 0.045, 0.055, agedGoldMat, 0, 1.335, 1.335, lid_seam);
  addBox("lid_seam_back", 3.3, 0.045, 0.055, agedGoldMat, 0, 1.335, -1.335, lid_seam);
  addBox("lid_seam_left", 0.055, 0.045, 2.62, agedGoldMat, -1.625, 1.335, 0, lid_seam);
  addBox("lid_seam_right", 0.055, 0.045, 2.62, agedGoldMat, 1.625, 1.335, 0, lid_seam);

  const lid_lower_rim = new THREE.Group();
  lid_lower_rim.name = "lid_lower_rim";
  root.add(lid_lower_rim);
  addBox("lid_lower_front_rail", 3.38, 0.12, 0.16, agedGoldMat, 0, 1.385, 1.34, lid_lower_rim);
  addBox("lid_lower_back_rail", 3.38, 0.12, 0.16, agedGoldMat, 0, 1.385, -1.34, lid_lower_rim);
  addBox("lid_lower_left_rail", 0.16, 0.12, 2.56, agedGoldMat, -1.61, 1.385, 0, lid_lower_rim);
  addBox("lid_lower_right_rail", 0.16, 0.12, 2.56, agedGoldMat, 1.61, 1.385, 0, lid_lower_rim);

  const lid_bodyGeom = new THREE.BoxGeometry(boxW, 0.23, boxD);
  const lid_body = new THREE.Mesh(lid_bodyGeom, goldMat);
  lid_body.name = "lid_body";
  lid_body.position.y = 1.47;
  root.add(lid_body);

  const lid_top_panelGeom = new THREE.BoxGeometry(2.86, 0.1, 2.16);
  const lid_top_panel = new THREE.Mesh(lid_top_panelGeom, pearlMat);
  lid_top_panel.name = "lid_top_panel";
  lid_top_panel.position.y = 1.565;
  root.add(lid_top_panel);

  const lid_top_frame = new THREE.Group();
  lid_top_frame.name = "lid_top_frame";
  root.add(lid_top_frame);
  addBox("lid_top_front_rail", 3.28, 0.12, 0.22, agedGoldMat, 0, 1.61, 1.25, lid_top_frame);
  addBox("lid_top_back_rail", 3.28, 0.12, 0.22, agedGoldMat, 0, 1.61, -1.25, lid_top_frame);
  addBox("lid_top_left_rail", 0.22, 0.12, 2.3, agedGoldMat, -1.58, 1.61, 0, lid_top_frame);
  addBox("lid_top_right_rail", 0.22, 0.12, 2.3, agedGoldMat, 1.58, 1.61, 0, lid_top_frame);

  const top_beading_matrices = [];
  for (const z of [-1.17, 1.17]) {
    for (let i = 0; i < 25; i++) {
      const x = -1.44 + (2.88 * i) / 24;
      top_beading_matrices.push(composeMatrix(x, 1.675, z, 0, 0, 0, 0.026, 0.018, 0.026));
    }
  }
  for (const x of [-1.5, 1.5]) {
    for (let i = 1; i < 19; i++) {
      const z = -1.08 + (2.16 * i) / 19;
      top_beading_matrices.push(composeMatrix(x, 1.675, z, 0, 0, 0, 0.026, 0.018, 0.026));
    }
  }
  const top_beading = createInstanced(
    "top_beading",
    unitBeadGeom,
    goldMat,
    top_beading_matrices
  );

  const top_patch_matrices = [[], [], []];
  for (let i = 0; i < 8; i++) {
    const x = -1.18 + (2.36 * i) / 7;
    const colorIndex = i % 3;
    top_patch_matrices[colorIndex].push(
      composeMatrix(x, 1.619, -0.68, Math.PI / 2, 0, 0, 0.34, 0.46, 1)
    );
    top_patch_matrices[(colorIndex + 1) % 3].push(
      composeMatrix(x, 1.619, 0.68, Math.PI / 2, 0, 0, 0.34, 0.46, 1)
    );
  }
  const top_pearl_patches_pink = createInstanced(
    "top_pearl_patches_pink",
    unitSphereGeom,
    pearlPinkMat,
    top_patch_matrices[0]
  );
  const top_pearl_patches_blue = createInstanced(
    "top_pearl_patches_blue",
    unitSphereGeom,
    pearlBlueMat,
    top_patch_matrices[1]
  );
  const top_pearl_patches_mint = createInstanced(
    "top_pearl_patches_mint",
    unitSphereGeom,
    pearlMintMat,
    top_patch_matrices[2]
  );

  const side_patch_matrices = [[], [], []];
  for (let i = 0; i < 5; i++) {
    const x = -1.18 + (2.36 * i) / 4;
    side_patch_matrices[i % 3].push(
      composeMatrix(x, 0.69, 1.259, 0, 0, 0, 0.38, 0.23, 0.008)
    );
    side_patch_matrices[(i + 1) % 3].push(
      composeMatrix(x, 1.08, 1.259, 0, 0, 0, 0.38, 0.23, 0.008)
    );
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const z = -0.88 + (1.76 * i) / 3;
      side_patch_matrices[(i + (side > 0 ? 1 : 2)) % 3].push(
        composeMatrix(side * 1.604, 0.72, z, 0, side * Math.PI / 2, 0, 0.32, 0.22, 0.008)
      );
      side_patch_matrices[(i + 1) % 3].push(
        composeMatrix(side * 1.604, 1.08, z, 0, side * Math.PI / 2, 0, 0.32, 0.22, 0.008)
      );
    }
  }
  const side_pearl_patches_pink = createInstanced(
    "side_pearl_patches_pink",
    unitSphereGeom,
    pearlPinkMat,
    side_patch_matrices[0]
  );
  const side_pearl_patches_blue = createInstanced(
    "side_pearl_patches_blue",
    unitSphereGeom,
    pearlBlueMat,
    side_patch_matrices[1]
  );
  const side_pearl_patches_mint = createInstanced(
    "side_pearl_patches_mint",
    unitSphereGeom,
    pearlMintMat,
    side_patch_matrices[2]
  );

  const top_border_leaf_matrices = [];
  for (const z of [-1.25, 1.25]) {
    for (let i = 0; i < 14; i++) {
      const x = -1.38 + (2.76 * i) / 13;
      top_border_leaf_matrices.push(
        composeMatrix(x, 1.678, z, 0, (i % 2 ? 0.55 : -0.55), 0, 0.075, 0.014, 0.035)
      );
    }
  }
  for (const x of [-1.58, 1.58]) {
    for (let i = 0; i < 10; i++) {
      const z = -1.0 + (2.0 * i) / 9;
      top_border_leaf_matrices.push(
        composeMatrix(x, 1.678, z, 0, Math.PI / 2 + (i % 2 ? 0.55 : -0.55), 0, 0.075, 0.014, 0.035)
      );
    }
  }
  const top_border_leaves = createInstanced(
    "top_border_leaves",
    unitReliefGeom,
    goldMat,
    top_border_leaf_matrices
  );

  const lid_frieze_leaf_matrices = [];
  for (const z of [-1.34, 1.34]) {
    for (let i = 0; i < 15; i++) {
      const x = -1.42 + (2.84 * i) / 14;
      lid_frieze_leaf_matrices.push(
        composeMatrix(x, 1.445, z, 0, (i % 2 ? 0.7 : -0.7), 0, 0.075, 0.022, 0.025)
      );
    }
  }
  for (const x of [-1.61, 1.61]) {
    for (let i = 0; i < 11; i++) {
      const z = -1.05 + (2.1 * i) / 10;
      lid_frieze_leaf_matrices.push(
        composeMatrix(x, 1.445, z, 0, Math.PI / 2 + (i % 2 ? 0.7 : -0.7), 0, 0.075, 0.022, 0.025)
      );
    }
  }
  const lid_frieze_leaves = createInstanced(
    "lid_frieze_leaves",
    unitReliefGeom,
    goldMat,
    lid_frieze_leaf_matrices
  );

  const lower_frieze_leaf_matrices = [];
  for (const z of [-1.285, 1.285]) {
    for (let i = 0; i < 15; i++) {
      const x = -1.43 + (2.86 * i) / 14;
      lower_frieze_leaf_matrices.push(
        composeMatrix(x, 0.505, z, 0, (i % 2 ? 0.65 : -0.65), 0, 0.07, 0.02, 0.022)
      );
    }
  }
  for (const x of [-1.625, 1.625]) {
    for (let i = 0; i < 11; i++) {
      const z = -1.05 + (2.1 * i) / 10;
      lower_frieze_leaf_matrices.push(
        composeMatrix(x, 0.505, z, 0, Math.PI / 2 + (i % 2 ? 0.65 : -0.65), 0, 0.07, 0.02, 0.022)
      );
    }
  }
  const lower_frieze_leaves = createInstanced(
    "lower_frieze_leaves",
    unitReliefGeom,
    goldMat,
    lower_frieze_leaf_matrices
  );

  const top_corner_rosettes = new THREE.Group();
  top_corner_rosettes.name = "top_corner_rosettes";
  root.add(top_corner_rosettes);
  const top_rosette_petalsGeom = new THREE.SphereGeometry(1, 14, 8);
  const top_rosette_petals = new THREE.InstancedMesh(top_rosette_petalsGeom, goldMat, 24);
  top_rosette_petals.name = "top_rosette_petals";
  const top_rosette_centers = new THREE.InstancedMesh(unitSphereGeom, agedGoldMat, 4);
  top_rosette_centers.name = "top_rosette_centers";
  const rosetteCorners = [
    [-1.34, -0.96],
    [1.34, -0.96],
    [-1.34, 0.96],
    [1.34, 0.96],
  ];
  let petalIndex = 0;
  for (let c = 0; c < rosetteCorners.length; c++) {
    const cx = rosetteCorners[c][0];
    const cz = rosetteCorners[c][1];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      top_rosette_petals.setMatrixAt(
        petalIndex++,
        composeMatrix(
          cx + Math.cos(a) * 0.12,
          1.672,
          cz + Math.sin(a) * 0.12,
          0,
          -a,
          0,
          0.13,
          0.018,
          0.055
        )
      );
    }
    top_rosette_centers.setMatrixAt(
      c,
      composeMatrix(cx, 1.682, cz, 0, 0, 0, 0.075, 0.028, 0.075)
    );
  }
  top_rosette_petals.instanceMatrix.needsUpdate = true;
  top_rosette_centers.instanceMatrix.needsUpdate = true;
  top_corner_rosettes.add(top_rosette_petals, top_rosette_centers);

  const top_corner_scrolls = new THREE.Group();
  top_corner_scrolls.name = "top_corner_scrolls";
  root.add(top_corner_scrolls);
  for (let i = 0; i < rosetteCorners.length; i++) {
    const x = rosetteCorners[i][0];
    const z = rosetteCorners[i][1];
    const sx = x < 0 ? 1 : -1;
    const sz = z < 0 ? 1 : -1;
    addTubePath(
      "top_corner_scroll",
      [
        new THREE.Vector3(x, 1.67, z),
        new THREE.Vector3(x + sx * 0.2, 1.672, z),
        new THREE.Vector3(x + sx * 0.31, 1.672, z + sz * 0.08),
        new THREE.Vector3(x + sx * 0.23, 1.672, z + sz * 0.18),
      ],
      0.018,
      goldMat,
      top_corner_scrolls
    );
  }

  const top_center_figure = new THREE.Group();
  top_center_figure.name = "top_center_figure";
  root.add(top_center_figure);

  const top_figure_torsoShape = new THREE.Shape();
  top_figure_torsoShape.moveTo(-0.11, 0.22);
  top_figure_torsoShape.bezierCurveTo(-0.18, 0.14, -0.18, -0.04, -0.12, -0.2);
  top_figure_torsoShape.lineTo(0.12, -0.2);
  top_figure_torsoShape.bezierCurveTo(0.18, -0.04, 0.18, 0.14, 0.11, 0.22);
  top_figure_torsoShape.closePath();
  const top_figure_torsoGeom = new THREE.ExtrudeGeometry(top_figure_torsoShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 2,
  });
  const top_figure_torso = new THREE.Mesh(top_figure_torsoGeom, goldMat);
  top_figure_torso.name = "top_figure_torso";
  top_figure_torso.rotation.x = Math.PI / 2;
  top_figure_torso.position.set(0, 1.7, 0);
  top_center_figure.add(top_figure_torso);

  const top_figure_head = addSphere(
    "top_figure_head",
    goldMat,
    -0.05,
    1.72,
    -0.31,
    0.105,
    0.045,
    0.105,
    top_center_figure
  );
  const top_figure_neck = addTubePath(
    "top_figure_neck",
    [
      new THREE.Vector3(-0.05, 1.7, -0.23),
      new THREE.Vector3(-0.05, 1.7, -0.27),
      new THREE.Vector3(-0.05, 1.7, -0.3),
    ],
    0.05,
    goldMat,
    top_center_figure
  );

  const top_figure_arms = new THREE.Group();
  top_figure_arms.name = "top_figure_arms";
  top_center_figure.add(top_figure_arms);
  const topArmPaths = [
    [
      new THREE.Vector3(-0.1, 1.7, -0.13),
      new THREE.Vector3(-0.38, 1.702, -0.2),
      new THREE.Vector3(-0.7, 1.702, -0.3),
      new THREE.Vector3(-1.02, 1.702, -0.28),
    ],
    [
      new THREE.Vector3(-0.1, 1.7, -0.04),
      new THREE.Vector3(-0.4, 1.702, 0.02),
      new THREE.Vector3(-0.72, 1.702, 0.12),
      new THREE.Vector3(-1.05, 1.702, 0.1),
    ],
    [
      new THREE.Vector3(0.1, 1.7, -0.13),
      new THREE.Vector3(0.38, 1.702, -0.18),
      new THREE.Vector3(0.69, 1.702, -0.08),
      new THREE.Vector3(0.98, 1.702, 0.05),
    ],
    [
      new THREE.Vector3(0.1, 1.7, -0.03),
      new THREE.Vector3(0.34, 1.702, 0.08),
      new THREE.Vector3(0.58, 1.702, 0.25),
      new THREE.Vector3(0.82, 1.702, 0.31),
    ],
  ];
  for (let i = 0; i < topArmPaths.length; i++) {
    addTubePath("top_figure_arm", topArmPaths[i], 0.035, goldMat, top_figure_arms);
  }

  const top_figure_hands_data = [
    [-1.04, -0.28],
    [-1.07, 0.1],
    [1.0, 0.05],
    [0.83, 0.31],
  ];
  const top_figure_hands = new THREE.InstancedMesh(unitSphereGeom, goldMat, 4);
  top_figure_hands.name = "top_figure_hands";
  for (let i = 0; i < top_figure_hands_data.length; i++) {
    const p = top_figure_hands_data[i];
    top_figure_hands.setMatrixAt(
      i,
      composeMatrix(p[0], 1.71, p[1], 0, 0, 0, 0.055, 0.028, 0.055)
    );
  }
  top_figure_hands.instanceMatrix.needsUpdate = true;
  top_center_figure.add(top_figure_hands);

  const top_figure_skirtShape = new THREE.Shape();
  top_figure_skirtShape.moveTo(-0.12, 0.02);
  top_figure_skirtShape.bezierCurveTo(-0.2, 0.18, -0.32, 0.32, -0.42, 0.48);
  top_figure_skirtShape.bezierCurveTo(-0.2, 0.5, -0.08, 0.51, 0, 0.53);
  top_figure_skirtShape.bezierCurveTo(0.08, 0.51, 0.2, 0.5, 0.42, 0.48);
  top_figure_skirtShape.bezierCurveTo(0.32, 0.32, 0.2, 0.18, 0.12, 0.02);
  top_figure_skirtShape.closePath();
  const top_figure_skirtGeom = new THREE.ExtrudeGeometry(top_figure_skirtShape, {
    depth: 0.04,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.009,
    bevelSegments: 2,
  });
  const top_figure_skirt = new THREE.Mesh(top_figure_skirtGeom, goldMat);
  top_figure_skirt.name = "top_figure_skirt";
  top_figure_skirt.rotation.x = Math.PI / 2;
  top_figure_skirt.position.set(0, 1.7, 0.08);
  top_center_figure.add(top_figure_skirt);

  const top_figure_legs = new THREE.Group();
  top_figure_legs.name = "top_figure_legs";
  top_center_figure.add(top_figure_legs);
  addTubePath(
    "top_figure_left_leg",
    [
      new THREE.Vector3(-0.1, 1.7, 0.48),
      new THREE.Vector3(-0.18, 1.702, 0.65),
      new THREE.Vector3(-0.3, 1.702, 0.84),
      new THREE.Vector3(-0.48, 1.702, 0.91),
    ],
    0.045,
    goldMat,
    top_figure_legs
  );
  addTubePath(
    "top_figure_right_leg",
    [
      new THREE.Vector3(0.1, 1.7, 0.48),
      new THREE.Vector3(0.25, 1.702, 0.61),
      new THREE.Vector3(0.48, 1.702, 0.72),
      new THREE.Vector3(0.7, 1.702, 0.7),
    ],
    0.045,
    goldMat,
    top_figure_legs
  );

  const top_figure_feet_data = [
    [-0.5, 0.92, -0.25],
    [0.72, 0.7, 0.45],
  ];
  const top_figure_feet = new THREE.InstancedMesh(unitSphereGeom, goldMat, 2);
  top_figure_feet.name = "top_figure_feet";
  for (let i = 0; i < top_figure_feet_data.length; i++) {
    const p = top_figure_feet_data[i];
    top_figure_feet.setMatrixAt(
      i,
      composeMatrix(p[0], 1.71, p[1], 0, p[2], 0, 0.13, 0.03, 0.055)
    );
  }
  top_figure_feet.instanceMatrix.needsUpdate = true;
  top_center_figure.add(top_figure_feet);

  const top_figure_sash = addTubePath(
    "top_figure_sash",
    [
      new THREE.Vector3(-0.12, 1.725, -0.12),
      new THREE.Vector3(0.02, 1.728, 0.0),
      new THREE.Vector3(0.16, 1.725, 0.16),
    ],
    0.025,
    agedGoldMat,
    top_center_figure
  );

  const top_figure_relief_matrices = [];
  for (let i = 0; i < 5; i++) {
    top_figure_relief_matrices.push(
      composeMatrix(-0.075 + i * 0.0375, 1.735, 0.23, 0, 0, 0, 0.014, 0.012, 0.12)
    );
  }
  const top_figure_torso_relief = createInstanced(
    "top_figure_torso_relief",
    unitReliefGeom,
    agedGoldMat,
    top_figure_relief_matrices,
    top_center_figure
  );

  const top_figure_waist_beltGeom = new THREE.TorusGeometry(0.13, 0.018, 8, 24);
  const top_figure_waist_belt = new THREE.Mesh(top_figure_waist_beltGeom, agedGoldMat);
  top_figure_waist_belt.name = "top_figure_waist_belt";
  top_figure_waist_belt.rotation.x = Math.PI / 2;
  top_figure_waist_belt.position.set(0, 1.735, 0.09);
  top_center_figure.add(top_figure_waist_belt);

  const top_figure_hair_beads = new THREE.InstancedMesh(unitBeadGeom, agedGoldMat, 8);
  top_figure_hair_beads.name = "top_figure_hair_beads";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    top_figure_hair_beads.setMatrixAt(
      i,
      composeMatrix(
        -0.05 + Math.cos(a) * 0.11,
        1.725,
        -0.31 + Math.sin(a) * 0.11,
        0,
        0,
        0,
        0.025,
        0.018,
        0.025
      )
    );
  }
  top_figure_hair_beads.instanceMatrix.needsUpdate = true;
  top_center_figure.add(top_figure_hair_beads);

  const top_figure_crownGeom = new THREE.TorusGeometry(0.055, 0.012, 7, 18);
  const top_figure_crown = new THREE.Mesh(top_figure_crownGeom, agedGoldMat);
  top_figure_crown.name = "top_figure_crown";
  top_figure_crown.rotation.x = Math.PI / 2;
  top_figure_crown.position.set(-0.05, 1.755, -0.37);
  top_center_figure.add(top_figure_crown);

  const top_figure_scepter = addTubePath(
    "top_figure_scepter",
    [
      new THREE.Vector3(0.83, 1.72, 0.31),
      new THREE.Vector3(1.0, 1.72, 0.42),
      new THREE.Vector3(1.18, 1.72, 0.52),
    ],
    0.017,
    goldMat,
    top_center_figure
  );
  const top_figure_scepter_orb = addSphere(
    "top_figure_scepter_orb",
    goldMat,
    1.2,
    1.725,
    0.53,
    0.055,
    0.025,
    0.055,
    top_center_figure
  );

  const top_flower_locations = [
    [-0.92, 0.52],
    [0.92, 0.48],
    [-0.72, -0.62],
    [0.72, -0.62],
  ];
  const top_flower_petal_matrices = [];
  for (let f = 0; f < top_flower_locations.length; f++) {
    const cx = top_flower_locations[f][0];
    const cz = top_flower_locations[f][1];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      top_flower_petal_matrices.push(
        composeMatrix(
          cx + Math.cos(a) * 0.075,
          1.67,
          cz + Math.sin(a) * 0.075,
          0,
          -a,
          0,
          0.09,
          0.016,
          0.04
        )
      );
    }
  }
  const top_flower_petals = createInstanced(
    "top_flower_petals",
    unitReliefGeom,
    goldMat,
    top_flower_petal_matrices
  );
  const top_flower_centers = new THREE.InstancedMesh(unitSphereGeom, agedGoldMat, 4);
  top_flower_centers.name = "top_flower_centers";
  for (let i = 0; i < top_flower_locations.length; i++) {
    const p = top_flower_locations[i];
    top_flower_centers.setMatrixAt(
      i,
      composeMatrix(p[0], 1.68, p[1], 0, 0, 0, 0.045, 0.022, 0.045)
    );
  }
  top_flower_centers.instanceMatrix.needsUpdate = true;
  root.add(top_flower_petals, top_flower_centers);

  const top_garland = new THREE.Group();
  top_garland.name = "top_garland";
  root.add(top_garland);
  addTubePath(
    "top_left_garland",
    [
      new THREE.Vector3(-1.28, 1.668, 0.5),
      new THREE.Vector3(-1.12, 1.668, 0.65),
      new THREE.Vector3(-0.92, 1.668, 0.62),
      new THREE.Vector3(-0.78, 1.668, 0.48),
    ],
    0.015,
    goldMat,
    top_garland
  );
  addTubePath(
    "top_right_garland",
    [
      new THREE.Vector3(1.28, 1.668, 0.48),
      new THREE.Vector3(1.12, 1.668, 0.63),
      new THREE.Vector3(0.92, 1.668, 0.6),
      new THREE.Vector3(0.78, 1.668, 0.45),
    ],
    0.015,
    goldMat,
    top_garland
  );

  const top_bird_wing_matrices = [];
  const top_bird_body_matrices = [];
  const top_bird_head_matrices = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI * 0.25;
    const x = Math.cos(a) * 0.32;
    const z = Math.sin(a) * 0.24;
    top_bird_wing_matrices.push(
      composeMatrix(x - 0.07, 1.67, z, 0, -a, 0, 0.13, 0.014, 0.05)
    );
    top_bird_body_matrices.push(
      composeMatrix(x, 1.672, z, 0, -a, 0, 0.13, 0.018, 0.045)
    );
    top_bird_head_matrices.push(
      composeMatrix(x + Math.cos(a) * 0.12, 1.68, z + Math.sin(a) * 0.12, 0, 0, 0, 0.045, 0.025, 0.045)
    );
  }
  const top_bird_relief_wings = createInstanced(
    "top_bird_relief_wings",
    unitReliefGeom,
    goldMat,
    top_bird_wing_matrices
  );
  const top_bird_relief_bodies = createInstanced(
    "top_bird_relief_bodies",
    unitReliefGeom,
    agedGoldMat,
    top_bird_body_matrices
  );
  const top_bird_relief_heads = createInstanced(
    "top_bird_relief_heads",
    unitSphereGeom,
    goldMat,
    top_bird_head_matrices
  );

  const side_figure_templates = [
    {
      pose: "standing",
      head: { x: 0.0, y: 0.94, sx: 0.095, sy: 0.115, sz: 0.045 },
      torso: { x: 0.0, y: 0.69, sx: 0.12, sy: 0.19, sz: 0.045 },
      hips: { x: 0.0, y: 0.52, sx: 0.115, sy: 0.075, sz: 0.05 },
      limbs: [
        {
          p1: { x: -0.09, y: 0.82 },
          p2: { x: -0.25, y: 1.04 },
          r: 0.034,
        },
        {
          p1: { x: -0.25, y: 1.04 },
          p2: { x: -0.32, y: 1.16 },
          r: 0.028,
        },
        {
          p1: { x: 0.09, y: 0.82 },
          p2: { x: 0.28, y: 0.96 },
          r: 0.034,
        },
        {
          p1: { x: 0.28, y: 0.96 },
          p2: { x: 0.36, y: 1.06 },
          r: 0.028,
        },
        {
          p1: { x: -0.06, y: 0.5 },
          p2: { x: -0.12, y: 0.27 },
          r: 0.038,
        },
        {
          p1: { x: 0.06, y: 0.5 },
          p2: { x: 0.14, y: 0.27 },
          r: 0.038,
        },
      ],
      hands: [
        { x: -0.32, y: 1.16, sx: 0.045, sy: 0.052, sz: 0.035 },
        { x: 0.36, y: 1.06, sx: 0.045, sy: 0.052, sz: 0.035 },
      ],
      feet: [
        { x: -0.13, y: 0.255, sx: 0.095, sy: 0.035, sz: 0.04 },
        { x: 0.15, y: 0.255, sx: 0.095, sy: 0.035, sz: 0.04 },
      ],
    },
    {
      pose: "seated",
      head: { x: -0.02, y: 0.92, sx: 0.095, sy: 0.115, sz: 0.045 },
      torso: { x: -0.02, y: 0.68, sx: 0.125, sy: 0.19, sz: 0.045 },
      hips: { x: 0.02, y: 0.49, sx: 0.16, sy: 0.1, sz: 0.055 },
      limbs: [
        {
          p1: { x: -0.11, y: 0.8 },
          p2: { x: -0.29, y: 0.94 },
          r: 0.034,
        },
        {
          p1: { x: -0.29, y: 0.94 },
          p2: { x: -0.37, y: 1.04 },
          r: 0.028,
        },
        {
          p1: { x: 0.07, y: 0.79 },
          p2: { x: 0.27, y: 0.88 },
          r: 0.034,
        },
        {
          p1: { x: 0.27, y: 0.88 },
          p2: { x: 0.36, y: 0.98 },
          r: 0.028,
        },
        {
          p1: { x: -0.02, y: 0.49 },
          p2: { x: -0.22, y: 0.33 },
          r: 0.045,
        },
        {
          p1: { x: -0.22, y: 0.33 },
          p2: { x: -0.38, y: 0.27 },
          r: 0.038,
        },
        {
          p1: { x: 0.06, y: 0.48 },
          p2: { x: 0.25, y: 0.31 },
          r: 0.045,
        },
        {
          p1: { x: 0.25, y: 0.31 },
          p2: { x: 0.4, y: 0.26 },
          r: 0.038,
        },
      ],
      hands: [
        { x: -0.37, y: 1.04, sx: 0.045, sy: 0.052, sz: 0.035 },
        { x: 0.36, y: 0.98, sx: 0.045, sy: 0.052, sz: 0.035 },
      ],
      feet: [
        { x: -0.4, y: 0.255, sx: 0.11, sy: 0.035, sz: 0.04 },
        { x: 0.42, y: 0.245, sx: 0.11, sy: 0.035, sz: 0.04 },
      ],
    },
  ];

  function buildSideFigures(name, specs) {
    const group = new THREE.Group();
    group.name = name;
    root.add(group);

    const headMatrices = [];
    const hairMatrices = [];
    const torsoMatrices = [];
    const hipMatrices = [];
    const skirtMatrices = [];
    const limbMatrices = [];
    const handMatrices = [];
    const footMatrices = [];
    const crownMatrices = [];
    const collarMatrices = [];
    const reliefLineMatrices = [];

    const skirtShape = new THREE.Shape();
    skirtShape.moveTo(-0.09, 0.12);
    skirtShape.bezierCurveTo(-0.11, 0.04, -0.18, -0.06, -0.22, -0.12);
    skirtShape.bezierCurveTo(-0.09, -0.135, 0.09, -0.135, 0.22, -0.12);
    skirtShape.bezierCurveTo(0.18, -0.06, 0.11, 0.04, 0.09, 0.12);
    skirtShape.closePath();
    const side_figure_skirtGeom = new THREE.ExtrudeGeometry(skirtShape, {
      depth: 0.035,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.007,
      bevelSegments: 2,
    });

    for (const spec of specs) {
      const template = side_figure_templates[spec.template];
      const ox = spec.ox || 0;
      const oy = spec.oy || 0;
      const mirror = spec.mirror ? -1 : 1;

      function shifted(x, y) {
        return {
          x: spec.cx + ox + mirror * x * spec.sx,
          y: spec.cy + oy + y * spec.sy,
        };
      }

      const headPart = shifted(template.head.x, template.head.y);
      headMatrices.push(
        composeMatrix(
          headPart.x,
          headPart.y,
          spec.surface,
          0,
          spec.ry,
          0,
          template.head.sx * spec.sx,
          template.head.sy * spec.sy,
          template.head.sz
        )
      );
      hairMatrices.push(
        composeMatrix(
          headPart.x - mirror * 0.018 * spec.sx,
          headPart.y + 0.025 * spec.sy,
          spec.surface - 0.012,
          0,
          spec.ry,
          0,
          0.11 * spec.sx,
          0.125 * spec.sy,
          0.03
        )
      );

      const torsoPart = shifted(template.torso.x, template.torso.y);
      torsoMatrices.push(
        composeMatrix(
          torsoPart.x,
          torsoPart.y,
          spec.surface,
          0,
          spec.ry,
          0,
          template.torso.sx * spec.sx,
          template.torso.sy * spec.sy,
          template.torso.sz
        )
      );
      collarMatrices.push(
        composeMatrix(
          torsoPart.x,
          torsoPart.y + 0.12 * spec.sy,
          spec.surface + 0.045,
          0,
          spec.ry,
          0,
          0.105 * spec.sx,
          0.025,
          0.018
        )
      );

      const hipsPart = shifted(template.hips.x, template.hips.y);
      hipMatrices.push(
        composeMatrix(
          hipsPart.x,
          hipsPart.y,
          spec.surface,
          0,
          spec.ry,
          0,
          template.hips.sx * spec.sx,
          template.hips.sy * spec.sy,
          template.hips.sz
        )
      );

      if (template.pose === "standing") {
        skirtMatrices.push(
          composeMatrix(
            hipsPart.x,
            hipsPart.y - 0.11 * spec.sy,
            spec.surface,
            0,
            spec.ry,
            0,
            spec.sx * 1.12,
            spec.sy * 1.12,
            1
          )
        );
      }

      for (const limb of template.limbs) {
        const p1 = shifted(limb.p1.x, limb.p1.y);
        const p2 = shifted(limb.p2.x, limb.p2.y);
        const p1v = new THREE.Vector3(
          p1.x,
          p1.y,
          spec.surface + 0.005
        );
        const p2v = new THREE.Vector3(
          p2.x,
          p2.y,
          spec.surface + 0.005
        );
        limbMatrices.push(composeLimb(p1v, p2v, limb.r * spec.sx));
      }

      for (const hand of template.hands) {
        const part = shifted(hand.x, hand.y);
        handMatrices.push(
          composeMatrix(
            part.x,
            part.y,
            spec.surface + 0.015,
            0,
            spec.ry,
            0,
            hand.sx * spec.sx,
            hand.sy * spec.sy,
            hand.sz
          )
        );
      }

      for (const foot of template.feet) {
        const part = shifted(foot.x, foot.y);
        footMatrices.push(
          composeMatrix(
            part.x,
            part.y,
            spec.surface + 0.012,
            0,
            spec.ry,
            foot.x < 0 ? -0.12 : 0.12,
            foot.sx * spec.sx,
            foot.sy * spec.sy,
            foot.sz
          )
        );
      }

      crownMatrices.push(
        composeMatrix(
          headPart.x,
          headPart.y + 0.125 * spec.sy,
          spec.surface + 0.045,
          0,
          spec.ry,
          0,
          0.07 * spec.sx,
          0.05,
          0.025
        )
      );

      for (let i = 0; i < 3; i++) {
        reliefLineMatrices.push(
          composeMatrix(
            torsoPart.x + (i - 1) * 0.035 * spec.sx,
            torsoPart.y - 0.01 * spec.sy,
            spec.surface + 0.05,
            0,
            spec.ry,
            0,
            0.009,
            0.105 * spec.sy,
            0.009
          )
        );
      }

      if (spec.staff) {
        const staffBottom = shifted(-0.26, -0.13);
        const staffTop = shifted(-0.31, 1.06);
        limbMatrices.push(
          composeLimb(
            new THREE.Vector3(staffBottom.x, staffBottom.y, spec.surface + 0.012),
            new THREE.Vector3(staffTop.x, staffTop.y, spec.surface + 0.012),
            0.014
          )
        );
        handMatrices.push(
          composeMatrix(
            staffTop.x,
            staffTop.y,
            spec.surface + 0.025,
            0,
            spec.ry,
            0,
            0.04,
            0.045,
            0.03
          )
        );
      }
    }

    const heads = createInstanced(
      "heads",
      unitSphereGeom,
      goldMat,
      headMatrices,
      group
    );
    const hair = createInstanced(
      "hair",
      unitSphereGeom,
      agedGoldMat,
      hairMatrices,
      group
    );
    const torsos = createInstanced(
      "torsos",
      unitSphereGeom,
      goldMat,
      torsoMatrices,
      group
    );
    const hips = createInstanced(
      "hips",
      unitSphereGeom,
      goldMat,
      hipMatrices,
      group
    );
    const skirts = createInstanced(
      "skirts",
      side_figure_skirtGeom,
      goldMat,
      skirtMatrices,
      group
    );
    const limbs = createInstanced(
      "limbs",
      unitLimbGeom,
      goldMat,
      limbMatrices,
      group
    );
    const hands = createInstanced(
      "hands",
      unitSphereGeom,
      goldMat,
      handMatrices,
      group
    );
    const feet = createInstanced(
      "feet",
      unitSphereGeom,
      goldMat,
      footMatrices,
      group
    );
    const crowns = createInstanced(
      "crowns",
      unitSphereGeom,
      agedGoldMat,
      crownMatrices,
      group
    );
    const collars = createInstanced(
      "collars",
      unitReliefGeom,
      agedGoldMat,
      collarMatrices,
      group
    );
    const relief_lines = createInstanced(
      "relief_lines",
      unitReliefGeom,
      agedGoldMat,
      reliefLineMatrices,
      group
    );

    group.add(
      hair,
      skirts,
      hips,
      torsos,
      heads,
      limbs,
      hands,
      feet,
      crowns,
      collars,
      relief_lines
    );
    return group;
  }

  const front_figure_specs = [
    {
      cx: -1.03,
      cy: panelY,
      sx: 0.88,
      sy: 0.9,
      template: 1,
      surface: 1.271,
      ry: 0,
      mirror: false,
      staff: true,
    },
    {
      cx: -0.03,
      cy: panelY,
      sx: 0.94,
      sy: 0.94,
      template: 0,
      surface: 1.271,
      ry: 0,
      mirror: true,
      ox: -0.04,
      staff: false,
    },
    {
      cx: 0.98,
      cy: panelY,
      sx: 0.88,
      sy: 0.91,
      template: 1,
      surface: 1.271,
      ry: 0,
      mirror: false,
      staff: true,
    },
  ];
  const front_relief_figures = buildSideFigures(
    "front_relief_figures",
    front_figure_specs
  );

  const back_figure_specs = [
    {
      cx: -0.92,
      cy: panelY,
      sx: 0.9,
      sy: 0.91,
      template: 0,
      surface: -1.257,
      ry: Math.PI,
      mirror: true,
      staff: true,
    },
    {
      cx: 0.92,
      cy: panelY,
      sx: 0.9,
      sy: 0.9,
      template: 1,
      surface: -1.257,
      ry: Math.PI,
      mirror: false,
      staff: true,
    },
  ];
  const back_relief_figures = buildSideFigures(
    "back_relief_figures",
    back_figure_specs
  );

  const right_side_figure_specs = [
    {
      cx: -0.55,
      cy: panelY,
      sx: 0.78,
      sy: 0.9,
      template: 1,
      surface: 1.612,
      ry: Math.PI / 2,
      mirror: false,
      staff: true,
    },
    {
      cx: 0.48,
      cy: panelY,
      sx: 0.82,
      sy: 0.92,
      template: 0,
      surface: 1.612,
      ry: Math.PI / 2,
      mirror: true,
      staff: false,
    },
  ];
  const right_side_relief_figures = buildSideFigures(
    "right_side_relief_figures",
    right_side_figure_specs
  );

  const left_side_figure_specs = [
    {
      cx: -0.5,
      cy: panelY,
      sx: 0.8,
      sy: 0.91,
      template: 0,
      surface: -1.612,
      ry: -Math.PI / 2,
      mirror: true,
      staff: false,
    },
    {
      cx: 0.52,
      cy: panelY,
      sx: 0.78,
      sy: 0.9,
      template: 1,
      surface: -1.612,
      ry: -Math.PI / 2,
      mirror: false,
      staff: true,
    },
  ];
  const left_side_relief_figures = buildSideFigures(
    "left_side_relief_figures",
    left_side_figure_specs
  );

  fitToUnitCube(THREE, root);
  return root;

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