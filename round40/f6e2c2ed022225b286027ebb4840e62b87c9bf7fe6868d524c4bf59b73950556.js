export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornamental_wooden_pedestal";

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x87502f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const lightWoodMat = new THREE.MeshStandardMaterial({
    color: 0x9b633d,
    metalness: 0.0,
    roughness: 0.6,
  });
  const darkWoodMat = new THREE.MeshStandardMaterial({
    color: 0x62351f,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.MeshStandardMaterial({
    color: 0x321a11,
    metalness: 0.0,
    roughness: 0.9,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x484640,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createRoundedSquareSlabGeometry(width, depth, height, radius, bevel) {
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
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function createSquareFrustumGeometry(bottomWidth, topWidth, height) {
    const geometry = new THREE.CylinderGeometry(
      topWidth / Math.SQRT2,
      bottomWidth / Math.SQRT2,
      height,
      4,
      1,
      false
    );
    geometry.rotateY(Math.PI / 4);
    return geometry;
  }

  const base_assembly = new THREE.Group();
  base_assembly.name = "base_assembly";
  root.add(base_assembly);

  const base_bottom_padGeom = createRoundedSquareSlabGeometry(
    1.16, 1.16, 0.018, 0.075, 0.006
  );
  const base_bottom_pad = new THREE.Mesh(base_bottom_padGeom, darkWoodMat);
  base_bottom_pad.name = "base_bottom_pad";
  base_bottom_pad.position.y = 0.009;
  base_assembly.add(base_bottom_pad);

  const base_plinthGeom = createRoundedSquareSlabGeometry(
    1.20, 1.20, 0.16, 0.085, 0.018
  );
  const base_plinth = new THREE.Mesh(base_plinthGeom, woodMat);
  base_plinth.name = "base_plinth";
  base_plinth.position.y = 0.09;
  base_assembly.add(base_plinth);

  const base_slopeGeom = createSquareFrustumGeometry(1.14, 0.88, 0.105);
  const base_slope = new THREE.Mesh(base_slopeGeom, lightWoodMat);
  base_slope.name = "base_slope";
  base_slope.position.y = 0.2225;
  base_assembly.add(base_slope);

  const base_upper_stepGeom = createSquareFrustumGeometry(0.90, 0.82, 0.045);
  const base_upper_step = new THREE.Mesh(base_upper_stepGeom, woodMat);
  base_upper_step.name = "base_upper_step";
  base_upper_step.position.y = 0.2975;
  base_assembly.add(base_upper_step);

  const base_top_plateGeom = createRoundedSquareSlabGeometry(
    0.82, 0.82, 0.045, 0.035, 0.009
  );
  const base_top_plate = new THREE.Mesh(base_top_plateGeom, lightWoodMat);
  base_top_plate.name = "base_top_plate";
  base_top_plate.position.y = 0.3375;
  base_assembly.add(base_top_plate);

  const square_plinthGeom = createRoundedSquareSlabGeometry(
    0.46, 0.46, 0.15, 0.025, 0.012
  );
  const square_plinth = new THREE.Mesh(square_plinthGeom, woodMat);
  square_plinth.name = "square_plinth";
  square_plinth.position.y = 0.435;
  base_assembly.add(square_plinth);

  const square_plinth_topGeom = createRoundedSquareSlabGeometry(
    0.40, 0.40, 0.035, 0.022, 0.007
  );
  const square_plinth_top = new THREE.Mesh(square_plinth_topGeom, darkWoodMat);
  square_plinth_top.name = "square_plinth_top";
  square_plinth_top.position.y = 0.5225;
  base_assembly.add(square_plinth_top);

  const column_assembly = new THREE.Group();
  column_assembly.name = "column_assembly";
  root.add(column_assembly);

  const lower_wood_collarProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.17, 0.00),
    new THREE.Vector2(0.195, 0.012),
    new THREE.Vector2(0.215, 0.035),
    new THREE.Vector2(0.220, 0.060),
    new THREE.Vector2(0.210, 0.090),
    new THREE.Vector2(0.185, 0.115),
    new THREE.Vector2(0.170, 0.125),
    new THREE.Vector2(0.00, 0.125),
  ];
  const lower_wood_collarGeom = new THREE.LatheGeometry(
    lower_wood_collarProfile, 48
  );
  const lower_wood_collar = new THREE.Mesh(lower_wood_collarGeom, woodMat);
  lower_wood_collar.name = "lower_wood_collar";
  lower_wood_collar.position.y = 0.515;
  column_assembly.add(lower_wood_collar);

  const wooden_columnProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.165, 0.00),
    new THREE.Vector2(0.170, 0.025),
    new THREE.Vector2(0.168, 0.10),
    new THREE.Vector2(0.160, 0.25),
    new THREE.Vector2(0.153, 0.55),
    new THREE.Vector2(0.154, 0.82),
    new THREE.Vector2(0.162, 1.02),
    new THREE.Vector2(0.170, 1.075),
    new THREE.Vector2(0.00, 1.075),
  ];
  const wooden_columnGeom = new THREE.LatheGeometry(wooden_columnProfile, 64);
  const wooden_column = new THREE.Mesh(wooden_columnGeom, woodMat);
  wooden_column.name = "wooden_column";
  wooden_column.position.y = 0.61;
  column_assembly.add(wooden_column);

  const upper_wood_collarProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.165, 0.00),
    new THREE.Vector2(0.185, 0.012),
    new THREE.Vector2(0.215, 0.035),
    new THREE.Vector2(0.225, 0.065),
    new THREE.Vector2(0.218, 0.095),
    new THREE.Vector2(0.190, 0.120),
    new THREE.Vector2(0.165, 0.135),
    new THREE.Vector2(0.00, 0.135),
  ];
  const upper_wood_collarGeom = new THREE.LatheGeometry(
    upper_wood_collarProfile, 48
  );
  const upper_wood_collar = new THREE.Mesh(upper_wood_collarGeom, woodMat);
  upper_wood_collar.name = "upper_wood_collar";
  upper_wood_collar.position.y = 1.65;
  column_assembly.add(upper_wood_collar);

  const column_grainGeom = new THREE.BoxGeometry(0.006, 0.10, 0.003);
  const column_grain = new THREE.InstancedMesh(
    column_grainGeom,
    woodGrainMat,
    96
  );
  column_grain.name = "column_grain";
  const grain_dummy = new THREE.Object3D();

  for (let i = 0; i < 96; i++) {
    const angle = i * 2.399963229728653;
    const t = ((i * 37) % 101) / 100;
    const y = 0.66 + t * 0.96;
    const radius = 0.170 - 0.016 * t + 0.004 * Math.sin(t * Math.PI);
    const lengthScale = 0.35 + ((i * 11) % 17) / 18;
    const widthScale = 0.55 + ((i * 7) % 9) / 12;

    grain_dummy.position.set(
      Math.cos(angle) * (radius + 0.002),
      y,
      Math.sin(angle) * (radius + 0.002)
    );
    grain_dummy.rotation.set(0, Math.PI / 2 - angle, 0);
    grain_dummy.scale.set(widthScale, lengthScale, 1);
    grain_dummy.updateMatrix();
    column_grain.setMatrixAt(i, grain_dummy.matrix);
  }
  column_grain.instanceMatrix.needsUpdate = true;
  column_assembly.add(column_grain);

  const base_grainGeom = new THREE.BoxGeometry(0.18, 0.003, 0.006);
  const base_grain = new THREE.InstancedMesh(
    base_grainGeom,
    woodGrainMat,
    48
  );
  base_grain.name = "base_grain";
  const base_grain_dummy = new THREE.Object3D();
  let baseGrainIndex = 0;

  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 12; i++) {
      const tangent = -0.46 + i * (0.92 / 11);
      const y = 0.035 + (((i * 5 + side * 3) % 11) / 10) * 0.105;
      const lengthScale = 0.45 + ((i * 7 + side * 3) % 13) / 13;
      const surface = 0.603;

      base_grain_dummy.scale.set(lengthScale, 1, 1);
      if (side === 0) {
        base_grain_dummy.position.set(tangent, y, surface);
        base_grain_dummy.rotation.set(0, 0, 0);
      } else if (side === 1) {
        base_grain_dummy.position.set(tangent, y, -surface);
        base_grain_dummy.rotation.set(0, 0, 0);
      } else if (side === 2) {
        base_grain_dummy.position.set(surface, y, tangent);
        base_grain_dummy.rotation.set(0, Math.PI / 2, 0);
      } else {
        base_grain_dummy.position.set(-surface, y, tangent);
        base_grain_dummy.rotation.set(0, Math.PI / 2, 0);
      }
      base_grain_dummy.updateMatrix();
      base_grain.setMatrixAt(baseGrainIndex++, base_grain_dummy.matrix);
    }
  }
  base_grain.instanceMatrix.needsUpdate = true;
  base_assembly.add(base_grain);

  const square_plinth_grainGeom = new THREE.BoxGeometry(0.005, 0.085, 0.003);
  const square_plinth_grain = new THREE.InstancedMesh(
    square_plinth_grainGeom,
    woodGrainMat,
    24
  );
  square_plinth_grain.name = "square_plinth_grain";
  const plinth_grain_dummy = new THREE.Object3D();
  let plinthGrainIndex = 0;

  for (let side = 0; side < 4; side++) {
    for (let i = 0; i < 6; i++) {
      const tangent = -0.17 + i * 0.068;
      const y = 0.395 + (((i * 3 + side) % 5) / 4) * 0.075;
      const lengthScale = 0.45 + ((i * 5 + side * 2) % 7) / 8;
      const surface = 0.233;

      plinth_grain_dummy.scale.set(1, lengthScale, 1);
      if (side === 0) {
        plinth_grain_dummy.position.set(tangent, y, surface);
        plinth_grain_dummy.rotation.set(0, 0, 0);
      } else if (side === 1) {
        plinth_grain_dummy.position.set(tangent, y, -surface);
        plinth_grain_dummy.rotation.set(0, 0, 0);
      } else if (side === 2) {
        plinth_grain_dummy.position.set(surface, y, tangent);
        plinth_grain_dummy.rotation.set(0, Math.PI / 2, 0);
      } else {
        plinth_grain_dummy.position.set(-surface, y, tangent);
        plinth_grain_dummy.rotation.set(0, Math.PI / 2, 0);
      }
      plinth_grain_dummy.updateMatrix();
      square_plinth_grain.setMatrixAt(
        plinthGrainIndex++,
        plinth_grain_dummy.matrix
      );
    }
  }
  square_plinth_grain.instanceMatrix.needsUpdate = true;
  base_assembly.add(square_plinth_grain);

  const metal_assembly = new THREE.Group();
  metal_assembly.name = "metal_assembly";
  root.add(metal_assembly);

  const metal_neckProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.155, 0.00),
    new THREE.Vector2(0.170, 0.020),
    new THREE.Vector2(0.190, 0.050),
    new THREE.Vector2(0.192, 0.080),
    new THREE.Vector2(0.170, 0.110),
    new THREE.Vector2(0.145, 0.135),
    new THREE.Vector2(0.130, 0.180),
    new THREE.Vector2(0.130, 0.230),
    new THREE.Vector2(0.150, 0.270),
    new THREE.Vector2(0.190, 0.300),
    new THREE.Vector2(0.205, 0.330),
    new THREE.Vector2(0.190, 0.360),
    new THREE.Vector2(0.145, 0.390),
    new THREE.Vector2(0.135, 0.415),
    new THREE.Vector2(0.00, 0.415),
  ];
  const metal_neckGeom = new THREE.LatheGeometry(metal_neckProfile, 64);
  const metal_neck = new THREE.Mesh(metal_neckGeom, silverMat);
  metal_neck.name = "metal_neck";
  metal_neck.position.y = 1.75;
  metal_assembly.add(metal_neck);

  const metal_neck_lower_bandGeom = new THREE.TorusGeometry(
    0.177, 0.010, 10, 48
  );
  const metal_neck_lower_band = new THREE.Mesh(
    metal_neck_lower_bandGeom,
    recessMat
  );
  metal_neck_lower_band.name = "metal_neck_lower_band";
  metal_neck_lower_band.rotation.x = Math.PI / 2;
  metal_neck_lower_band.position.y = 1.805;
  metal_assembly.add(metal_neck_lower_band);

  const metal_neck_middle_bandGeom = new THREE.TorusGeometry(
    0.137, 0.009, 10, 48
  );
  const metal_neck_middle_band = new THREE.Mesh(
    metal_neck_middle_bandGeom,
    recessMat
  );
  metal_neck_middle_band.name = "metal_neck_middle_band";
  metal_neck_middle_band.rotation.x = Math.PI / 2;
  metal_neck_middle_band.position.y = 1.995;
  metal_assembly.add(metal_neck_middle_band);

  const metal_neck_upper_bandGeom = new THREE.TorusGeometry(
    0.190, 0.012, 10, 48
  );
  const metal_neck_upper_band = new THREE.Mesh(
    metal_neck_upper_bandGeom,
    recessMat
  );
  metal_neck_upper_band.name = "metal_neck_upper_band";
  metal_neck_upper_band.rotation.x = Math.PI / 2;
  metal_neck_upper_band.position.y = 2.075;
  metal_assembly.add(metal_neck_upper_band);

  const ornate_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.130, 0.00),
    new THREE.Vector2(0.145, 0.020),
    new THREE.Vector2(0.170, 0.055),
    new THREE.Vector2(0.200, 0.105),
    new THREE.Vector2(0.220, 0.165),
    new THREE.Vector2(0.222, 0.215),
    new THREE.Vector2(0.205, 0.275),
    new THREE.Vector2(0.180, 0.335),
    new THREE.Vector2(0.150, 0.395),
    new THREE.Vector2(0.125, 0.445),
    new THREE.Vector2(0.110, 0.480),
    new THREE.Vector2(0.00, 0.480),
  ];
  const ornate_bodyGeom = new THREE.LatheGeometry(ornate_bodyProfile, 64);
  const ornate_body = new THREE.Mesh(ornate_bodyGeom, silverMat);
  ornate_body.name = "ornate_body";
  ornate_body.position.y = 2.12;
  metal_assembly.add(ornate_body);

  const ornate_lower_bandGeom = new THREE.TorusGeometry(
    0.137, 0.010, 10, 48
  );
  const ornate_lower_band = new THREE.Mesh(
    ornate_lower_bandGeom,
    recessMat
  );
  ornate_lower_band.name = "ornate_lower_band";
  ornate_lower_band.rotation.x = Math.PI / 2;
  ornate_lower_band.position.y = 2.145;
  metal_assembly.add(ornate_lower_band);

  const ornate_top_collarProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.105, 0.00),
    new THREE.Vector2(0.120, 0.015),
    new THREE.Vector2(0.145, 0.035),
    new THREE.Vector2(0.150, 0.055),
    new THREE.Vector2(0.135, 0.075),
    new THREE.Vector2(0.105, 0.090),
    new THREE.Vector2(0.00, 0.090),
  ];
  const ornate_top_collarGeom = new THREE.LatheGeometry(
    ornate_top_collarProfile, 48
  );
  const ornate_top_collar = new THREE.Mesh(
    ornate_top_collarGeom,
    silverMat
  );
  ornate_top_collar.name = "ornate_top_collar";
  ornate_top_collar.position.y = 2.57;
  metal_assembly.add(ornate_top_collar);

  const ornate_top_bandGeom = new THREE.TorusGeometry(
    0.126, 0.009, 10, 48
  );
  const ornate_top_band = new THREE.Mesh(ornate_top_bandGeom, recessMat);
  ornate_top_band.name = "ornate_top_band";
  ornate_top_band.rotation.x = Math.PI / 2;
  ornate_top_band.position.y = 2.625;
  metal_assembly.add(ornate_top_band);

  const finialProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.080, 0.00),
    new THREE.Vector2(0.095, 0.015),
    new THREE.Vector2(0.100, 0.035),
    new THREE.Vector2(0.085, 0.055),
    new THREE.Vector2(0.070, 0.075),
    new THREE.Vector2(0.065, 0.105),
    new THREE.Vector2(0.045, 0.135),
    new THREE.Vector2(0.020, 0.150),
    new THREE.Vector2(0.00, 0.155),
  ];
  const finialGeom = new THREE.LatheGeometry(finialProfile, 48);
  const finial = new THREE.Mesh(finialGeom, silverMat);
  finial.name = "finial";
  finial.position.y = 2.64;
  metal_assembly.add(finial);

  function ornateRadiusAt(y) {
    if (y <= 2.18) return 0.145 + (y - 2.12) * 0.48;
    if (y <= 2.29) return 0.174 + (y - 2.18) * 0.43;
    if (y <= 2.39) return 0.222 - (y - 2.29) * 0.22;
    return 0.200 - (y - 2.39) * 0.55;
  }

  function ornateSurfacePoint(angle, y, extra) {
    const radius = ornateRadiusAt(y) + extra;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  const ornament_center_ridges = new THREE.Group();
  ornament_center_ridges.name = "ornament_center_ridges";
  metal_assembly.add(ornament_center_ridges);

  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 4;
    const ridgePoints = [
      ornateSurfacePoint(angle, 2.18, 0.008),
      ornateSurfacePoint(angle, 2.28, 0.008),
      ornateSurfacePoint(angle, 2.39, 0.008),
      ornateSurfacePoint(angle, 2.52, 0.008),
    ];
    const ridgeCurve = new THREE.CatmullRomCurve3(
      ridgePoints,
      false,
      "centripetal"
    );
    const ridgeGeom = new THREE.TubeGeometry(
      ridgeCurve, 20, 0.007, 6, false
    );
    const ridge = new THREE.Mesh(ridgeGeom, recessMat);
    ornament_center_ridges.add(ridge);
  }

  const ornament_left_scrolls = new THREE.Group();
  ornament_left_scrolls.name = "ornament_left_scrolls";
  metal_assembly.add(ornament_left_scrolls);

  const ornament_right_scrolls = new THREE.Group();
  ornament_right_scrolls.name = "ornament_right_scrolls";
  metal_assembly.add(ornament_right_scrolls);

  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 4;

    const leftScrollPoints = [
      ornateSurfacePoint(angle, 2.205, 0.009),
      ornateSurfacePoint(angle + 0.15, 2.255, 0.009),
      ornateSurfacePoint(angle + 0.25, 2.345, 0.009),
      ornateSurfacePoint(angle + 0.19, 2.445, 0.009),
      ornateSurfacePoint(angle + 0.07, 2.485, 0.009),
    ];
    const leftScrollCurve = new THREE.CatmullRomCurve3(
      leftScrollPoints,
      false,
      "centripetal"
    );
    const leftScrollGeom = new THREE.TubeGeometry(
      leftScrollCurve, 22, 0.0065, 6, false
    );
    const leftScroll = new THREE.Mesh(leftScrollGeom, recessMat);
    ornament_left_scrolls.add(leftScroll);

    const rightScrollPoints = [
      ornateSurfacePoint(angle, 2.205, 0.009),
      ornateSurfacePoint(angle - 0.15, 2.255, 0.009),
      ornateSurfacePoint(angle - 0.25, 2.345, 0.009),
      ornateSurfacePoint(angle - 0.19, 2.445, 0.009),
      ornateSurfacePoint(angle - 0.07, 2.485, 0.009),
    ];
    const rightScrollCurve = new THREE.CatmullRomCurve3(
      rightScrollPoints,
      false,
      "centripetal"
    );
    const rightScrollGeom = new THREE.TubeGeometry(
      rightScrollCurve, 22, 0.0065, 6, false
    );
    const rightScroll = new THREE.Mesh(rightScrollGeom, recessMat);
    ornament_right_scrolls.add(rightScroll);
  }

  const ornament_leafShape = new THREE.Shape();
  ornament_leafShape.moveTo(0, -0.045);
  ornament_leafShape.bezierCurveTo(
    0.024, -0.020,
    0.026, 0.025,
    0, 0.055
  );
  ornament_leafShape.bezierCurveTo(
    -0.026, 0.025,
    -0.024, -0.020,
    0, -0.045
  );
  ornament_leafShape.closePath();

  const ornament_leaf_reliefsGeom = new THREE.ShapeGeometry(
    ornament_leafShape,
    10
  );
  const ornament_leaf_reliefs = new THREE.InstancedMesh(
    ornament_leaf_reliefsGeom,
    recessMat,
    16
  );
  ornament_leaf_reliefs.name = "ornament_leaf_reliefs";

  const leaf_dummy = new THREE.Object3D();
  const outward_axis = new THREE.Vector3(0, 0, 1);
  let leafIndex = 0;

  for (let i = 0; i < 8; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 4;

    for (const side of [-1, 1]) {
      const leafAngle = angle + side * 0.13;
      const y = 2.305;
      const radius = ornateRadiusAt(y) + 0.010;
      const normal = new THREE.Vector3(
        Math.cos(leafAngle),
        0,
        Math.sin(leafAngle)
      );

      leaf_dummy.position.set(
        normal.x * radius,
        y,
        normal.z * radius
      );
      leaf_dummy.quaternion.setFromUnitVectors(outward_axis, normal);
      leaf_dummy.rotateZ(side * 0.58);
      leaf_dummy.scale.set(0.82, 0.82, 1);
      leaf_dummy.updateMatrix();
      ornament_leaf_reliefs.setMatrixAt(leafIndex++, leaf_dummy.matrix);
    }
  }
  ornament_leaf_reliefs.instanceMatrix.needsUpdate = true;
  metal_assembly.add(ornament_leaf_reliefs);

  fitToUnitCube(root);
  return root;

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
}