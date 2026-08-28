export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_wood_and_silver_finial";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x8b512d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodLightMat = new THREE.MeshStandardMaterial({
    color: 0xa76838,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodDarkMat = new THREE.MeshStandardMaterial({
    color: 0x5b301c,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x321b12,
    metalness: 0.0,
    roughness: 0.6,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const patinaMat = new THREE.MeshStandardMaterial({
    color: 0x3a3833,
    metalness: 0.5,
    roughness: 0.5,
  });

  function createRoundedSlabGeometry(width, depth, height, radius, bevel) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;

    shape.moveTo(x0 + radius, z0);
    shape.lineTo(x1 - radius, z0);
    shape.quadraticCurveTo(x1, z0, x1, z0 + radius);
    shape.lineTo(x1, z1 - radius);
    shape.quadraticCurveTo(x1, z1, x1 - radius, z1);
    shape.lineTo(x0 + radius, z1);
    shape.quadraticCurveTo(x0, z1, x0, z1 - radius);
    shape.lineTo(x0, z0 + radius);
    shape.quadraticCurveTo(x0, z0, x0 + radius, z0);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.center();
    return geometry;
  }

  function createSquareFrustumGeometry(bottomWidth, bottomDepth, topWidth, topDepth, height) {
    const by = -height / 2;
    const ty = height / 2;
    const bw = bottomWidth / 2;
    const bd = bottomDepth / 2;
    const tw = topWidth / 2;
    const td = topDepth / 2;

    const corners = [
      new THREE.Vector3(-bw, by, -bd),
      new THREE.Vector3(bw, by, -bd),
      new THREE.Vector3(bw, by, bd),
      new THREE.Vector3(-bw, by, bd),
      new THREE.Vector3(-tw, ty, -td),
      new THREE.Vector3(tw, ty, -td),
      new THREE.Vector3(tw, ty, td),
      new THREE.Vector3(-tw, ty, td),
    ];

    const faces = [
      [0, 1, 2, 3],
      [4, 7, 6, 5],
      [3, 2, 6, 7],
      [1, 0, 4, 5],
      [2, 1, 5, 6],
      [0, 3, 7, 4],
    ];
    const positions = [];
    const indices = [];

    for (const face of faces) {
      const offset = positions.length / 3;
      for (const cornerIndex of face) {
        const point = corners[cornerIndex];
        positions.push(point.x, point.y, point.z);
      }
      indices.push(offset, offset + 1, offset + 2, offset, offset + 2, offset + 3);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const base_bottomGeom = createRoundedSlabGeometry(1.16, 1.02, 0.16, 0.075, 0.018);
  const base_bottom = new THREE.Mesh(base_bottomGeom, woodMat);
  base_bottom.name = "base_bottom";
  base_bottom.position.y = 0.09;
  root.add(base_bottom);

  const base_beveled_stepGeom = createSquareFrustumGeometry(1.14, 1.0, 1.02, 0.88, 0.075);
  const base_beveled_step = new THREE.Mesh(base_beveled_stepGeom, woodLightMat);
  base_beveled_step.name = "base_beveled_step";
  base_beveled_step.position.y = 0.205;
  root.add(base_beveled_step);

  const base_upper_moldingGeom = createSquareFrustumGeometry(1.02, 0.88, 0.92, 0.78, 0.05);
  const base_upper_molding = new THREE.Mesh(base_upper_moldingGeom, woodMat);
  base_upper_molding.name = "base_upper_molding";
  base_upper_molding.position.y = 0.265;
  root.add(base_upper_molding);

  const base_top_platformGeom = createRoundedSlabGeometry(0.92, 0.78, 0.055, 0.025, 0.008);
  const base_top_platform = new THREE.Mesh(base_top_platformGeom, woodLightMat);
  base_top_platform.name = "base_top_platform";
  base_top_platform.position.y = 0.305;
  root.add(base_top_platform);

  const pedestal_blockGeom = createRoundedSlabGeometry(0.43, 0.41, 0.14, 0.025, 0.012);
  const pedestal_block = new THREE.Mesh(pedestal_blockGeom, woodMat);
  pedestal_block.name = "pedestal_block";
  pedestal_block.position.y = 0.405;
  root.add(pedestal_block);

  const pedestal_top_bandGeom = new THREE.CylinderGeometry(0.22, 0.22, 0.035, 48);
  const pedestal_top_band = new THREE.Mesh(pedestal_top_bandGeom, woodDarkMat);
  pedestal_top_band.name = "pedestal_top_band";
  pedestal_top_band.position.y = 0.49;
  root.add(pedestal_top_band);

  const pedestal_roundGeom = new THREE.CylinderGeometry(0.205, 0.215, 0.075, 48);
  const pedestal_round = new THREE.Mesh(pedestal_roundGeom, woodLightMat);
  pedestal_round.name = "pedestal_round";
  pedestal_round.position.y = 0.53;
  root.add(pedestal_round);

  const pedestal_upper_beadGeom = new THREE.TorusGeometry(0.19, 0.018, 10, 48);
  const pedestal_upper_bead = new THREE.Mesh(pedestal_upper_beadGeom, woodDarkMat);
  pedestal_upper_bead.name = "pedestal_upper_bead";
  pedestal_upper_bead.rotation.x = Math.PI / 2;
  pedestal_upper_bead.position.y = 0.555;
  root.add(pedestal_upper_bead);

  const shaftProfile = [
    new THREE.Vector2(0.0, 0.55),
    new THREE.Vector2(0.18, 0.55),
    new THREE.Vector2(0.19, 0.58),
    new THREE.Vector2(0.185, 0.64),
    new THREE.Vector2(0.176, 0.78),
    new THREE.Vector2(0.165, 1.02),
    new THREE.Vector2(0.153, 1.28),
    new THREE.Vector2(0.145, 1.43),
    new THREE.Vector2(0.15, 1.48),
    new THREE.Vector2(0.0, 1.48),
  ];
  const shaftGeom = new THREE.LatheGeometry(shaftProfile, 48);
  const shaft = new THREE.Mesh(shaftGeom, woodMat);
  shaft.name = "shaft";
  root.add(shaft);

  const shaft_bottom_ringGeom = new THREE.TorusGeometry(0.183, 0.014, 10, 48);
  const shaft_bottom_ring = new THREE.Mesh(shaft_bottom_ringGeom, woodDarkMat);
  shaft_bottom_ring.name = "shaft_bottom_ring";
  shaft_bottom_ring.rotation.x = Math.PI / 2;
  shaft_bottom_ring.position.y = 0.575;
  root.add(shaft_bottom_ring);

  const shaft_top_ringGeom = new THREE.TorusGeometry(0.15, 0.012, 10, 48);
  const shaft_top_ring = new THREE.Mesh(shaft_top_ringGeom, woodDarkMat);
  shaft_top_ring.name = "shaft_top_ring";
  shaft_top_ring.rotation.x = Math.PI / 2;
  shaft_top_ring.position.y = 1.455;
  root.add(shaft_top_ring);

  const shaft_grainGeom = new THREE.BoxGeometry(0.006, 0.05, 0.003);
  const shaft_grain = new THREE.InstancedMesh(shaft_grainGeom, grainMat, 72);
  shaft_grain.name = "shaft_grain";
  const shaft_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 72; i++) {
    const angle = i * 2.3999632297;
    const t = ((i * 29) % 71) / 70;
    const y = 0.62 + t * 0.78;
    const radius = 0.185 - 0.04 * t;
    const lengthScale = 0.45 + ((i * 17) % 13) / 12;

    shaft_grain_dummy.position.set(
      Math.cos(angle) * (radius + 0.002),
      y,
      Math.sin(angle) * (radius + 0.002)
    );
    shaft_grain_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    shaft_grain_dummy.scale.set(0.7, lengthScale, 1);
    shaft_grain_dummy.updateMatrix();
    shaft_grain.setMatrixAt(i, shaft_grain_dummy.matrix);
  }
  shaft_grain.instanceMatrix.needsUpdate = true;
  root.add(shaft_grain);

  const base_front_grainGeom = new THREE.BoxGeometry(0.14, 0.004, 0.003);
  const base_front_grain = new THREE.InstancedMesh(base_front_grainGeom, grainMat, 42);
  base_front_grain.name = "base_front_grain";
  const base_front_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 42; i++) {
    const x = -0.5 + (((i * 31) % 43) / 42) * 1.0;
    const y = 0.03 + (((i * 19) % 37) / 36) * 0.14;
    const z = 0.53 + 0.018 * (y / 0.16);
    const lengthScale = 0.45 + ((i * 11) % 17) / 13;

    base_front_grain_dummy.position.set(x, y, z + 0.003);
    base_front_grain_dummy.rotation.set(0, 0, (((i * 7) % 9) - 4) * 0.012);
    base_front_grain_dummy.scale.set(lengthScale, 1, 1);
    base_front_grain_dummy.updateMatrix();
    base_front_grain.setMatrixAt(i, base_front_grain_dummy.matrix);
  }
  base_front_grain.instanceMatrix.needsUpdate = true;
  root.add(base_front_grain);

  const base_side_grainGeom = new THREE.BoxGeometry(0.003, 0.004, 0.14);
  const base_side_grain = new THREE.InstancedMesh(base_side_grainGeom, grainMat, 34);
  base_side_grain.name = "base_side_grain";
  const base_side_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 34; i++) {
    const z = -0.43 + (((i * 23) % 35) / 34) * 0.86;
    const y = 0.035 + (((i * 13) % 31) / 30) * 0.13;
    const x = 0.59 + 0.018 * (y / 0.16);
    const lengthScale = 0.5 + ((i * 9) % 15) / 12;

    base_side_grain_dummy.position.set(x + 0.003, y, z);
    base_side_grain_dummy.rotation.set((((i * 5) % 7) - 3) * 0.012, 0, 0);
    base_side_grain_dummy.scale.set(1, 1, lengthScale);
    base_side_grain_dummy.updateMatrix();
    base_side_grain.setMatrixAt(i, base_side_grain_dummy.matrix);
  }
  base_side_grain.instanceMatrix.needsUpdate = true;
  root.add(base_side_grain);

  const base_top_grain_xGeom = new THREE.BoxGeometry(0.14, 0.003, 0.005);
  const base_top_grain_x = new THREE.InstancedMesh(base_top_grain_xGeom, grainMat, 20);
  base_top_grain_x.name = "base_top_grain_x";
  const base_top_grain_x_dummy = new THREE.Object3D();

  for (let i = 0; i < 20; i++) {
    const x = -0.39 + (((i * 17) % 21) / 20) * 0.78;
    const z = -0.31 + (((i * 13) % 19) / 18) * 0.62;
    base_top_grain_x_dummy.position.set(x, 0.342, z);
    base_top_grain_x_dummy.rotation.set(0, (((i * 5) % 7) - 3) * 0.02, 0);
    base_top_grain_x_dummy.scale.set(0.55 + ((i * 7) % 11) / 10, 1, 1);
    base_top_grain_x_dummy.updateMatrix();
    base_top_grain_x.setMatrixAt(i, base_top_grain_x_dummy.matrix);
  }
  base_top_grain_x.instanceMatrix.needsUpdate = true;
  root.add(base_top_grain_x);

  const base_top_grain_zGeom = new THREE.BoxGeometry(0.005, 0.003, 0.12);
  const base_top_grain_z = new THREE.InstancedMesh(base_top_grain_zGeom, grainMat, 16);
  base_top_grain_z.name = "base_top_grain_z";
  const base_top_grain_z_dummy = new THREE.Object3D();

  for (let i = 0; i < 16; i++) {
    const x = -0.38 + (((i * 11) % 17) / 16) * 0.76;
    const z = -0.3 + (((i * 9) % 17) / 16) * 0.6;
    base_top_grain_z_dummy.position.set(x, 0.343, z);
    base_top_grain_z_dummy.rotation.set(0, (((i * 3) % 7) - 3) * 0.018, 0);
    base_top_grain_z_dummy.scale.set(1, 1, 0.55 + ((i * 5) % 9) / 9);
    base_top_grain_z_dummy.updateMatrix();
    base_top_grain_z.setMatrixAt(i, base_top_grain_z_dummy.matrix);
  }
  base_top_grain_z.instanceMatrix.needsUpdate = true;
  root.add(base_top_grain_z);

  const pedestal_front_grainGeom = new THREE.BoxGeometry(0.005, 0.065, 0.003);
  const pedestal_front_grain = new THREE.InstancedMesh(pedestal_front_grainGeom, grainMat, 12);
  pedestal_front_grain.name = "pedestal_front_grain";
  const pedestal_front_grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 12; i++) {
    const x = -0.18 + i * 0.033;
    const y = 0.37 + ((i * 5) % 7) * 0.008;
    pedestal_front_grain_dummy.position.set(x, y, 0.222);
    pedestal_front_grain_dummy.rotation.set(0, 0, (((i * 3) % 5) - 2) * 0.018);
    pedestal_front_grain_dummy.scale.set(1, 0.6 + ((i * 7) % 6) / 8, 1);
    pedestal_front_grain_dummy.updateMatrix();
    pedestal_front_grain.setMatrixAt(i, pedestal_front_grain_dummy.matrix);
  }
  pedestal_front_grain.instanceMatrix.needsUpdate = true;
  root.add(pedestal_front_grain);

  const finial_lower_collarProfile = [
    new THREE.Vector2(0.0, 1.43),
    new THREE.Vector2(0.145, 1.43),
    new THREE.Vector2(0.165, 1.45),
    new THREE.Vector2(0.185, 1.48),
    new THREE.Vector2(0.19, 1.51),
    new THREE.Vector2(0.175, 1.54),
    new THREE.Vector2(0.145, 1.56),
    new THREE.Vector2(0.13, 1.61),
    new THREE.Vector2(0.13, 1.66),
    new THREE.Vector2(0.145, 1.7),
    new THREE.Vector2(0.18, 1.72),
    new THREE.Vector2(0.195, 1.75),
    new THREE.Vector2(0.18, 1.78),
    new THREE.Vector2(0.13, 1.8),
    new THREE.Vector2(0.0, 1.8),
  ];
  const finial_lower_collarGeom = new THREE.LatheGeometry(finial_lower_collarProfile, 64);
  const finial_lower_collar = new THREE.Mesh(finial_lower_collarGeom, silverMat);
  finial_lower_collar.name = "finial_lower_collar";
  root.add(finial_lower_collar);

  const lower_collar_grooveGeom = new THREE.TorusGeometry(0.136, 0.006, 8, 48);
  const lower_collar_groove = new THREE.Mesh(lower_collar_grooveGeom, patinaMat);
  lower_collar_groove.name = "lower_collar_groove";
  lower_collar_groove.rotation.x = Math.PI / 2;
  lower_collar_groove.position.y = 1.605;
  root.add(lower_collar_groove);

  const lower_collar_highlightGeom = new THREE.TorusGeometry(0.181, 0.009, 8, 48);
  const lower_collar_highlight = new THREE.Mesh(lower_collar_highlightGeom, silverMat);
  lower_collar_highlight.name = "lower_collar_highlight";
  lower_collar_highlight.rotation.x = Math.PI / 2;
  lower_collar_highlight.position.y = 1.748;
  root.add(lower_collar_highlight);

  const finial_ornate_bodyProfile = [
    new THREE.Vector2(0.0, 1.76),
    new THREE.Vector2(0.12, 1.76),
    new THREE.Vector2(0.135, 1.8),
    new THREE.Vector2(0.175, 1.85),
    new THREE.Vector2(0.205, 1.92),
    new THREE.Vector2(0.215, 1.99),
    new THREE.Vector2(0.2, 2.06),
    new THREE.Vector2(0.17, 2.12),
    new THREE.Vector2(0.13, 2.17),
    new THREE.Vector2(0.095, 2.2),
    new THREE.Vector2(0.0, 2.2),
  ];
  const finial_ornate_bodyGeom = new THREE.LatheGeometry(finial_ornate_bodyProfile, 64);
  const finial_ornate_body = new THREE.Mesh(finial_ornate_bodyGeom, silverMat);
  finial_ornate_body.name = "finial_ornate_body";
  root.add(finial_ornate_body);

  const body_base_grooveGeom = new THREE.TorusGeometry(0.128, 0.006, 8, 48);
  const body_base_groove = new THREE.Mesh(body_base_grooveGeom, patinaMat);
  body_base_groove.name = "body_base_groove";
  body_base_groove.rotation.x = Math.PI / 2;
  body_base_groove.position.y = 1.785;
  root.add(body_base_groove);

  const body_base_trimGeom = new THREE.TorusGeometry(0.139, 0.008, 8, 48);
  const body_base_trim = new THREE.Mesh(body_base_trimGeom, silverMat);
  body_base_trim.name = "body_base_trim";
  body_base_trim.rotation.x = Math.PI / 2;
  body_base_trim.position.y = 1.805;
  root.add(body_base_trim);

  const bodyRadiusSamples = [
    [1.76, 0.12],
    [1.8, 0.135],
    [1.85, 0.175],
    [1.92, 0.205],
    [1.99, 0.215],
    [2.06, 0.2],
    [2.12, 0.17],
    [2.17, 0.13],
    [2.2, 0.095],
  ];

  function bodyRadiusAt(y) {
    for (let i = 0; i < bodyRadiusSamples.length - 1; i++) {
      const a = bodyRadiusSamples[i];
      const b = bodyRadiusSamples[i + 1];
      if (y >= a[0] && y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return y < bodyRadiusSamples[0][0] ? bodyRadiusSamples[0][1] : bodyRadiusSamples[bodyRadiusSamples.length - 1][1];
  }

  function bodySurfacePoint(angle, y, offset) {
    const radius = bodyRadiusAt(y) + offset;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function createBodyTubeGeometry(angleFunction, yFunction, tubeRadius) {
    const points = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      points.push(bodySurfacePoint(angleFunction(t), yFunction(t), 0.006));
    }
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    return new THREE.TubeGeometry(curve, 32, tubeRadius, 6, false);
  }

  function setRotatedInstances(instancedMesh, count, offsetAngle) {
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 0, 0);
      dummy.rotation.set(0, offsetAngle + (i / count) * Math.PI * 2, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
  }

  const leaf_inlaysShape = new THREE.Shape();
  leaf_inlaysShape.moveTo(0, -0.105);
  leaf_inlaysShape.bezierCurveTo(-0.05, -0.07, -0.065, 0.025, 0, 0.11);
  leaf_inlaysShape.bezierCurveTo(0.065, 0.025, 0.05, -0.07, 0, -0.105);
  const leaf_inlaysGeom = new THREE.ShapeGeometry(leaf_inlaysShape, 12);
  const leaf_inlays = new THREE.InstancedMesh(leaf_inlaysGeom, patinaMat, 8);
  leaf_inlays.name = "leaf_inlays";

  const leaf_inlays_dummy = new THREE.Object3D();
  const leaf_inlays_forward = new THREE.Vector3(0, 0, 1);
  let leaf_inlays_index = 0;

  for (let i = 0; i < 4; i++) {
    const baseAngle = i / 4 * Math.PI * 2;
    for (const side of [-1, 1]) {
      const y = 1.985;
      const angle = baseAngle + side * 0.22;
      const radius = bodyRadiusAt(y) + 0.009;
      const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));

      leaf_inlays_dummy.position.set(normal.x * radius, y, normal.z * radius);
      leaf_inlays_dummy.quaternion.setFromUnitVectors(leaf_inlays_forward, normal);
      leaf_inlays_dummy.rotateZ(-side * 0.42);
      leaf_inlays_dummy.scale.set(0.78, 0.82, 1);
      leaf_inlays_dummy.updateMatrix();
      leaf_inlays.setMatrixAt(leaf_inlays_index, leaf_inlays_dummy.matrix);
      leaf_inlays_index++;
    }
  }
  leaf_inlays.instanceMatrix.needsUpdate = true;
  root.add(leaf_inlays);

  const leaf_inlay_veinsGeom = createBodyTubeGeometry(
    () => 0,
    t => 1.89 + t * 0.19,
    0.0035
  );
  const leaf_inlay_veins = new THREE.InstancedMesh(leaf_inlay_veinsGeom, silverMat, 8);
  leaf_inlay_veins.name = "leaf_inlay_veins";
  setRotatedInstances(leaf_inlay_veins, 4, 0);

  const leaf_veins_dummy = new THREE.Object3D();
  let leaf_veins_index = 0;
  for (let i = 0; i < 4; i++) {
    const baseAngle = i / 4 * Math.PI * 2;
    for (const side of [-1, 1]) {
      leaf_veins_dummy.position.set(0, 0, 0);
      leaf_veins_dummy.rotation.set(0, baseAngle + side * 0.22, 0);
      leaf_veins_dummy.scale.set(1, 1, 1);
      leaf_veins_dummy.updateMatrix();
      leaf_inlay_veins.setMatrixAt(leaf_veins_index, leaf_veins_dummy.matrix);
      leaf_veins_index++;
    }
  }
  leaf_inlay_veins.instanceMatrix.needsUpdate = true;
  root.add(leaf_inlay_veins);

  const central_stemGeom = createBodyTubeGeometry(
    () => 0,
    t => 1.81 + t * 0.33,
    0.008
  );
  const central_stem_motifs = new THREE.InstancedMesh(central_stemGeom, patinaMat, 4);
  central_stem_motifs.name = "central_stem_motifs";
  setRotatedInstances(central_stem_motifs, 4, 0);
  root.add(central_stem_motifs);

  const central_stem_highlightGeom = createBodyTubeGeometry(
    () => 0,
    t => 1.82 + t * 0.31,
    0.0035
  );
  const central_stem_highlights = new THREE.InstancedMesh(central_stem_highlightGeom, silverMat, 4);
  central_stem_highlights.name = "central_stem_highlights";
  setRotatedInstances(central_stem_highlights, 4, 0);
  root.add(central_stem_highlights);

  const left_lower_scrollGeom = createBodyTubeGeometry(
    t => -0.04 - 0.48 * t - Math.sin(t * Math.PI) * 0.08,
    t => 1.84 + 0.11 * t - Math.sin(t * Math.PI) * 0.035,
    0.007
  );
  const left_lower_scroll_motifs = new THREE.InstancedMesh(left_lower_scrollGeom, patinaMat, 4);
  left_lower_scroll_motifs.name = "left_lower_scroll_motifs";
  setRotatedInstances(left_lower_scroll_motifs, 4, 0);
  root.add(left_lower_scroll_motifs);

  const right_lower_scrollGeom = createBodyTubeGeometry(
    t => 0.04 + 0.48 * t + Math.sin(t * Math.PI) * 0.08,
    t => 1.84 + 0.11 * t - Math.sin(t * Math.PI) * 0.035,
    0.007
  );
  const right_lower_scroll_motifs = new THREE.InstancedMesh(right_lower_scrollGeom, patinaMat, 4);
  right_lower_scroll_motifs.name = "right_lower_scroll_motifs";
  setRotatedInstances(right_lower_scroll_motifs, 4, 0);
  root.add(right_lower_scroll_motifs);

  const left_upper_branchGeom = createBodyTubeGeometry(
    t => -0.01 - 0.36 * t - Math.sin(t * Math.PI) * 0.06,
    t => 1.91 + 0.22 * t,
    0.006
  );
  const left_upper_branch_motifs = new THREE.InstancedMesh(left_upper_branchGeom, patinaMat, 4);
  left_upper_branch_motifs.name = "left_upper_branch_motifs";
  setRotatedInstances(left_upper_branch_motifs, 4, 0);
  root.add(left_upper_branch_motifs);

  const right_upper_branchGeom = createBodyTubeGeometry(
    t => 0.01 + 0.36 * t + Math.sin(t * Math.PI) * 0.06,
    t => 1.91 + 0.22 * t,
    0.006
  );
  const right_upper_branch_motifs = new THREE.InstancedMesh(right_upper_branchGeom, patinaMat, 4);
  right_upper_branch_motifs.name = "right_upper_branch_motifs";
  setRotatedInstances(right_upper_branch_motifs, 4, 0);
  root.add(right_upper_branch_motifs);

  const upper_fluteGeom = createBodyTubeGeometry(
    t => 0,
    t => 2.015 + t * 0.15,
    0.004
  );
  const upper_flute_motifs = new THREE.InstancedMesh(upper_fluteGeom, patinaMat, 10);
  upper_flute_motifs.name = "upper_flute_motifs";
  setRotatedInstances(upper_flute_motifs, 10, Math.PI / 10);
  root.add(upper_flute_motifs);

  const finial_top_capProfile = [
    new THREE.Vector2(0.0, 2.17),
    new THREE.Vector2(0.09, 2.17),
    new THREE.Vector2(0.105, 2.185),
    new THREE.Vector2(0.115, 2.205),
    new THREE.Vector2(0.108, 2.225),
    new THREE.Vector2(0.09, 2.24),
    new THREE.Vector2(0.075, 2.255),
    new THREE.Vector2(0.06, 2.28),
    new THREE.Vector2(0.035, 2.305),
    new THREE.Vector2(0.0, 2.315),
  ];
  const finial_top_capGeom = new THREE.LatheGeometry(finial_top_capProfile, 64);
  const finial_top_cap = new THREE.Mesh(finial_top_capGeom, silverMat);
  finial_top_cap.name = "finial_top_cap";
  root.add(finial_top_cap);

  const top_cap_grooveGeom = new THREE.TorusGeometry(0.106, 0.006, 8, 48);
  const top_cap_groove = new THREE.Mesh(top_cap_grooveGeom, patinaMat);
  top_cap_groove.name = "top_cap_groove";
  top_cap_groove.rotation.x = Math.PI / 2;
  top_cap_groove.position.y = 2.205;
  root.add(top_cap_groove);

  function fitToUnitCube(rootObject) {
    rootObject.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    rootObject.scale.setScalar(scale);
    rootObject.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}