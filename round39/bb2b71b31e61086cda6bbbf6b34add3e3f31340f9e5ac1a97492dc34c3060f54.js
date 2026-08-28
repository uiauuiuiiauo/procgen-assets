export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_body = new THREE.Group();
  ring_body.rotation.z = Math.PI / 4;
  root.add(ring_body);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_silverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const white_diamondsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.12,
    vertexColors: true,
    flatShading: true,
  });
  const central_gemstoneMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.16,
    vertexColors: true,
    flatShading: true,
  });

  function addRoundedRectPath(path, width, height, radius, clockwise) {
    const left = -width / 2;
    const right = width / 2;
    const bottom = -height / 2;
    const top = height / 2;

    if (!clockwise) {
      path.moveTo(left + radius, bottom);
      path.lineTo(right - radius, bottom);
      path.quadraticCurveTo(right, bottom, right, bottom + radius);
      path.lineTo(right, top - radius);
      path.quadraticCurveTo(right, top, right - radius, top);
      path.lineTo(left + radius, top);
      path.quadraticCurveTo(left, top, left, top - radius);
      path.lineTo(left, bottom + radius);
      path.quadraticCurveTo(left, bottom, left + radius, bottom);
    } else {
      path.moveTo(left + radius, bottom);
      path.quadraticCurveTo(left, bottom, left, bottom + radius);
      path.lineTo(left, top - radius);
      path.quadraticCurveTo(left, top, left + radius, top);
      path.lineTo(right - radius, top);
      path.quadraticCurveTo(right, top, right, top - radius);
      path.lineTo(right, bottom + radius);
      path.quadraticCurveTo(right, bottom, right - radius, bottom);
      path.lineTo(left + radius, bottom);
    }
    path.closePath();
  }

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    addRoundedRectPath(shape, width, height, radius, false);
    return shape;
  }

  function makeRoundedRectRingShape(
    outer_width,
    outer_height,
    outer_radius,
    inner_width,
    inner_height,
    inner_radius
  ) {
    const shape = makeRoundedRectShape(
      outer_width,
      outer_height,
      outer_radius
    );
    const hole = new THREE.Path();
    addRoundedRectPath(
      hole,
      inner_width,
      inner_height,
      inner_radius,
      true
    );
    shape.holes.push(hole);
    return shape;
  }

  function makeFacetedRoundGemGeometry() {
    const positions = [];
    const colors = [];
    const palette = [
      [1.0, 1.0, 1.0],
      [0.72, 0.77, 0.86],
      [0.92, 0.95, 1.0],
      [0.57, 0.64, 0.75],
      [0.82, 0.86, 0.93],
      [0.66, 0.72, 0.82],
    ];
    const segments = 12;

    function point(radius, angle, z) {
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z,
      ];
    }

    function addTriangle(a, b, c, shade) {
      const color = palette[shade % palette.length];
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const table0 = point(0.36, a0, 0.36);
      const table1 = point(0.36, a1, 0.36);
      const crown0 = point(0.72, a0, 0.20);
      const crown1 = point(0.72, a1, 0.20);
      const girdle0 = point(1.0, a0, 0.0);
      const girdle1 = point(1.0, a1, 0.0);
      const lower0 = point(1.0, a0, -0.08);
      const lower1 = point(1.0, a1, -0.08);
      const pavilion0 = point(0.48, a0, -0.34);
      const pavilion1 = point(0.48, a1, -0.34);

      addTriangle([0, 0, 0.36], table0, table1, i);
      addTriangle(table0, crown0, crown1, i + 2);
      addTriangle(table0, crown1, table1, i + 4);
      addTriangle(crown0, girdle0, girdle1, i + 1);
      addTriangle(crown0, girdle1, crown1, i + 3);
      addTriangle(girdle0, lower0, lower1, i + 4);
      addTriangle(girdle0, lower1, girdle1, i + 2);
      addTriangle(lower0, pavilion0, pavilion1, i + 1);
      addTriangle(lower0, pavilion1, lower1, i + 3);
      addTriangle(pavilion0, [0, 0, -0.56], pavilion1, i + 5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function makeCushionGemGeometry() {
    const positions = [];
    const colors = [];
    const palette = [
      [0.78, 0.74, 0.94],
      [0.55, 0.50, 0.76],
      [0.91, 0.89, 0.99],
      [0.42, 0.39, 0.65],
      [0.69, 0.65, 0.87],
      [0.86, 0.83, 0.96],
      [0.34, 0.32, 0.56],
      [0.62, 0.58, 0.80],
    ];

    function addTriangle(a, b, c, shade) {
      const color = palette[shade % palette.length];
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    const outline = [
      [-0.30, -0.50],
      [0.30, -0.50],
      [0.42, -0.46],
      [0.49, -0.36],
      [0.52, -0.22],
      [0.52, 0.22],
      [0.49, 0.36],
      [0.42, 0.46],
      [0.30, 0.50],
      [-0.30, 0.50],
      [-0.42, 0.46],
      [-0.49, 0.36],
      [-0.52, 0.22],
      [-0.52, -0.22],
      [-0.49, -0.36],
      [-0.42, -0.46],
    ];
    const count = outline.length;
    const lower = [];
    const outer = [];
    const crown = [];
    const table = [];

    for (let i = 0; i < count; i++) {
      const x = outline[i][0];
      const y = outline[i][1];
      lower.push([x, y, -0.04]);
      outer.push([x, y, 0.02]);
      crown.push([x * 0.73, y * 0.73, 0.20]);
      table.push([x * 0.44, y * 0.44, 0.31]);
    }

    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      addTriangle(lower[i], lower[next], outer[next], i + 2);
      addTriangle(lower[i], outer[next], outer[i], i + 5);
      addTriangle(outer[i], outer[next], crown[next], i + 1);
      addTriangle(outer[i], crown[next], crown[i], i + 4);
      addTriangle(crown[i], crown[next], table[next], i + 6);
      addTriangle(crown[i], table[next], table[i], i + 3);
    }

    const center = [0, 0, 0.31];
    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      addTriangle(center, table[i], table[next], i + 4);
    }

    const back_center = [0, 0, -0.34];
    for (let i = 0; i < count; i++) {
      const next = (i + 1) % count;
      addTriangle(back_center, lower[next], lower[i], i + 6);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const ring_bandGeom = new THREE.TorusGeometry(0.44, 0.075, 12, 48);
  const ring_band = new THREE.Mesh(ring_bandGeom, silverMat);
  ring_band.rotation.x = Math.PI / 2;
  ring_band.position.z = -0.42;
  ring_body.add(ring_band);

  const left_shoulderGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.29, 0, -0.22),
      new THREE.Vector3(-0.41, 0, -0.06),
      new THREE.Vector3(-0.51, 0, 0.04),
    ]),
    16,
    0.055,
    8,
    false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  ring_body.add(left_shoulder);

  const right_shoulderGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.29, 0, -0.22),
      new THREE.Vector3(0.41, 0, -0.06),
      new THREE.Vector3(0.51, 0, 0.04),
    ]),
    16,
    0.055,
    8,
    false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, silverMat);
  ring_body.add(right_shoulder);

  const halo_baseShape = makeRoundedRectShape(1.48, 1.48, 0.12);
  const halo_baseGeom = new THREE.ExtrudeGeometry(halo_baseShape, {
    depth: 0.10,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.025,
    bevelThickness: 0.018,
    curveSegments: 16,
  });
  const halo_base = new THREE.Mesh(halo_baseGeom, silverMat);
  halo_base.position.z = -0.05;
  ring_body.add(halo_base);

  const outer_halo_recessShape = makeRoundedRectRingShape(
    1.46, 1.46, 0.11,
    1.04, 1.04, 0.075
  );
  const outer_halo_recessGeom = new THREE.ExtrudeGeometry(
    outer_halo_recessShape,
    {
      depth: 0.018,
      steps: 1,
      bevelEnabled: false,
      curveSegments: 16,
    }
  );
  const outer_halo_recess = new THREE.Mesh(
    outer_halo_recessGeom,
    dark_silverMat
  );
  outer_halo_recess.position.z = 0.063;
  ring_body.add(outer_halo_recess);

  const inner_setting_frameShape = makeRoundedRectRingShape(
    1.08, 1.08, 0.09,
    0.88, 0.88, 0.065
  );
  const inner_setting_frameGeom = new THREE.ExtrudeGeometry(
    inner_setting_frameShape,
    {
      depth: 0.028,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.012,
      bevelThickness: 0.008,
      curveSegments: 16,
    }
  );
  const inner_setting_frame = new THREE.Mesh(
    inner_setting_frameGeom,
    polished_silverMat
  );
  inner_setting_frame.position.z = 0.073;
  ring_body.add(inner_setting_frame);

  const outer_halo_borderShape = makeRoundedRectRingShape(
    1.49, 1.49, 0.125,
    1.40, 1.40, 0.09
  );
  const outer_halo_borderGeom = new THREE.ExtrudeGeometry(
    outer_halo_borderShape,
    {
      depth: 0.025,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.007,
      bevelThickness: 0.006,
      curveSegments: 16,
    }
  );
  const outer_halo_border = new THREE.Mesh(
    outer_halo_borderGeom,
    polished_silverMat
  );
  outer_halo_border.position.z = 0.076;
  ring_body.add(outer_halo_border);

  const inner_halo_borderShape = makeRoundedRectRingShape(
    1.09, 1.09, 0.095,
    1.00, 1.00, 0.065
  );
  const inner_halo_borderGeom = new THREE.ExtrudeGeometry(
    inner_halo_borderShape,
    {
      depth: 0.025,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.006,
      bevelThickness: 0.006,
      curveSegments: 16,
    }
  );
  const inner_halo_border = new THREE.Mesh(
    inner_halo_borderGeom,
    polished_silverMat
  );
  inner_halo_border.position.z = 0.078;
  ring_body.add(inner_halo_border);

  const white_diamondsGeom = makeFacetedRoundGemGeometry();
  const outer_diamond_placements = [];
  const outer_side_count = 10;
  const outer_half = 0.64;
  const outer_corner_center = 0.56;
  const outer_corner_radius = 0.095;

  for (let i = 0; i < outer_side_count; i++) {
    const t = i / (outer_side_count - 1);
    const coordinate = -outer_half + 0.11 + t * 1.02;
    outer_diamond_placements.push([coordinate, outer_half, 0.072]);
    outer_diamond_placements.push([coordinate, -outer_half, 0.072]);
    outer_diamond_placements.push([outer_half, coordinate, 0.072]);
    outer_diamond_placements.push([-outer_half, coordinate, 0.072]);
  }

  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      outer_diamond_placements.push([
        sx * outer_corner_center,
        sy * outer_corner_center,
        0.105,
      ]);
    }
  }

  for (let i = 0; i < outer_side_count; i++) {
    const t = i / (outer_side_count - 1);
    const coordinate = -outer_half + 0.13 + t * 0.98;
    outer_diamond_placements.push([
      coordinate,
      outer_corner_center,
      0.048,
    ]);
    outer_diamond_placements.push([
      coordinate,
      -outer_corner_center,
      0.048,
    ]);
    outer_diamond_placements.push([
      outer_corner_center,
      coordinate,
      0.048,
    ]);
    outer_diamond_placements.push([
      -outer_corner_center,
      coordinate,
      0.048,
    ]);
  }

  const outer_corner_centers = [
    [outer_corner_center, outer_corner_center],
    [-outer_corner_center, outer_corner_center],
    [outer_corner_center, -outer_corner_center],
    [-outer_corner_center, -outer_corner_center],
  ];
  for (const center of outer_corner_centers) {
    for (let i = 0; i < 6; i++) {
      const angle = i / 6 * Math.PI * 2;
      outer_diamond_placements.push([
        center[0] + Math.cos(angle) * outer_corner_radius,
        center[1] + Math.sin(angle) * outer_corner_radius,
        0.052,
      ]);
    }
  }

  const white_diamonds = new THREE.InstancedMesh(
    white_diamondsGeom,
    white_diamondsMat,
    outer_diamond_placements.length
  );
  const diamond_dummy = new THREE.Object3D();

  for (let i = 0; i < outer_diamond_placements.length; i++) {
    const placement = outer_diamond_placements[i];
    const size = placement[2];
    diamond_dummy.position.set(placement[0], placement[1], 0.116);
    diamond_dummy.rotation.set(0, 0, (i % 7) * Math.PI / 21);
    diamond_dummy.scale.set(size, size, size * 0.72);
    diamond_dummy.updateMatrix();
    white_diamonds.setMatrixAt(i, diamond_dummy.matrix);
  }
  white_diamonds.instanceMatrix.needsUpdate = true;
  ring_body.add(white_diamonds);

  const inner_diamond_placements = [];
  const inner_side_count = 5;
  const inner_half = 0.455;
  const inner_straight_half = 0.36;

  for (let i = 0; i < inner_side_count; i++) {
    const t = i / (inner_side_count - 1);
    const coordinate =
      -inner_straight_half + t * inner_straight_half * 2;
    const size = i === 2 ? 0.082 : 0.075;
    inner_diamond_placements.push([coordinate, inner_half, size]);
    inner_diamond_placements.push([coordinate, -inner_half, size]);
    inner_diamond_placements.push([inner_half, coordinate, size]);
    inner_diamond_placements.push([-inner_half, coordinate, size]);
  }

  const inner_corner = 0.385;
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      inner_diamond_placements.push([
        sx * inner_corner,
        sy * inner_corner,
        0.098,
      ]);
    }
  }

  const inner_diamonds = new THREE.InstancedMesh(
    white_diamondsGeom,
    white_diamondsMat,
    inner_diamond_placements.length
  );

  for (let i = 0; i < inner_diamond_placements.length; i++) {
    const placement = inner_diamond_placements[i];
    const size = placement[2];
    diamond_dummy.position.set(placement[0], placement[1], 0.132);
    diamond_dummy.rotation.set(0, 0, (i % 6) * Math.PI / 18);
    diamond_dummy.scale.set(size, size, size * 0.76);
    diamond_dummy.updateMatrix();
    inner_diamonds.setMatrixAt(i, diamond_dummy.matrix);
  }
  inner_diamonds.instanceMatrix.needsUpdate = true;
  ring_body.add(inner_diamonds);

  const central_gemstone_bezelShape = makeRoundedRectRingShape(
    1.01, 1.01, 0.15,
    0.93, 0.93, 0.125
  );
  const central_gemstone_bezelGeom = new THREE.ExtrudeGeometry(
    central_gemstone_bezelShape,
    {
      depth: 0.026,
      steps: 1,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.008,
      bevelThickness: 0.006,
      curveSegments: 20,
    }
  );
  const central_gemstone_bezel = new THREE.Mesh(
    central_gemstone_bezelGeom,
    polished_silverMat
  );
  central_gemstone_bezel.position.z = 0.108;
  ring_body.add(central_gemstone_bezel);

  const central_gemstoneGeom = makeCushionGemGeometry();
  const central_gemstone = new THREE.Mesh(
    central_gemstoneGeom,
    central_gemstoneMat
  );
  central_gemstone.position.z = 0.13;
  ring_body.add(central_gemstone);

  const gemstone_prongsGeom = new THREE.SphereGeometry(1, 16, 10);
  const gemstone_prongs = new THREE.InstancedMesh(
    gemstone_prongsGeom,
    polished_silverMat,
    4
  );
  const prong_positions = [
    [0.43, 0],
    [-0.43, 0],
    [0, 0.43],
    [0, -0.43],
  ];

  for (let i = 0; i < prong_positions.length; i++) {
    diamond_dummy.position.set(
      prong_positions[i][0],
      prong_positions[i][1],
      0.30
    );
    diamond_dummy.rotation.set(0, 0, 0);
    diamond_dummy.scale.set(0.058, 0.058, 0.048);
    diamond_dummy.updateMatrix();
    gemstone_prongs.setMatrixAt(i, diamond_dummy.matrix);
  }
  gemstone_prongs.instanceMatrix.needsUpdate = true;
  ring_body.add(gemstone_prongs);

  const halo_edge_beadsGeom = new THREE.SphereGeometry(1, 10, 8);
  const outer_bead_count = 48;
  const outer_halo_edge_beads = new THREE.InstancedMesh(
    halo_edge_beadsGeom,
    polished_silverMat,
    outer_bead_count
  );
  const bead_dummy = new THREE.Object3D();
  const outer_bead_apothem = 0.72;
  let outer_bead_index = 0;

  function placeOuterBead(p, angle) {
    bead_dummy.position.set(
      p[0] + Math.cos(angle) * 0.006,
      p[1] + Math.sin(angle) * 0.006,
      0.132
    );
    bead_dummy.rotation.set(0, 0, 0);
    bead_dummy.scale.set(0.017, 0.017, 0.014);
    bead_dummy.updateMatrix();
    outer_halo_edge_beads.setMatrixAt(
      outer_bead_index,
      bead_dummy.matrix
    );
    outer_bead_index++;
  }

  for (let i = 0; i < 12; i++) {
    const t = -0.60 + i / 11 * 1.20;
    placeOuterBead([t, outer_bead_apothem], 0);
    placeOuterBead([t, -outer_bead_apothem], Math.PI);
    placeOuterBead([outer_bead_apothem, t], Math.PI / 2);
    placeOuterBead([-outer_bead_apothem, t], -Math.PI / 2);
  }

  for (const center of outer_corner_centers) {
    for (let i = 0; i < 6; i++) {
      const angle = (i + 0.5) / 6 * Math.PI * 2;
      placeOuterBead([
        center[0] + Math.cos(angle) * 0.077,
        center[1] + Math.sin(angle) * 0.077,
      ], angle);
    }
  }
  outer_halo_edge_beads.instanceMatrix.needsUpdate = true;
  ring_body.add(outer_halo_edge_beads);

  const inner_bead_count = 24;
  const inner_halo_edge_beads = new THREE.InstancedMesh(
    halo_edge_beadsGeom,
    polished_silverMat,
    inner_bead_count
  );
  const inner_bead_apothem = 0.522;
  let inner_bead_index = 0;

  function placeInnerBead(p, angle) {
    bead_dummy.position.set(
      p[0] + Math.cos(angle) * 0.004,
      p[1] + Math.sin(angle) * 0.004,
      0.142
    );
    bead_dummy.rotation.set(0, 0, 0);
    bead_dummy.scale.set(0.013, 0.013, 0.011);
    bead_dummy.updateMatrix();
    inner_halo_edge_beads.setMatrixAt(
      inner_bead_index,
      bead_dummy.matrix
    );
    inner_bead_index++;
  }

  for (let i = 0; i < 6; i++) {
    const t = -0.34 + i / 5 * 0.68;
    placeInnerBead([t, inner_bead_apothem], 0);
    placeInnerBead([t, -inner_bead_apothem], Math.PI);
    placeInnerBead([inner_bead_apothem, t], Math.PI / 2);
    placeInnerBead([-inner_bead_apothem, t], -Math.PI / 2);
  }

  const inner_bead_corner = 0.465;
  for (const center of [
    [inner_bead_corner, inner_bead_corner],
    [-inner_bead_corner, inner_bead_corner],
    [inner_bead_corner, -inner_bead_corner],
    [-inner_bead_corner, -inner_bead_corner],
  ]) {
    for (let i = 0; i < 3; i++) {
      const angle = Math.PI / 4 + i / 3 * Math.PI / 2;
      placeInnerBead([
        center[0] + Math.cos(angle) * 0.035,
        center[1] + Math.sin(angle) * 0.035,
      ], angle);
    }
  }
  inner_halo_edge_beads.instanceMatrix.needsUpdate = true;
  ring_body.add(inner_halo_edge_beads);

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