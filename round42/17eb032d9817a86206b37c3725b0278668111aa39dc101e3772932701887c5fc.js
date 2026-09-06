export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "quill_pen_with_stand";

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd0a44a,
    metalness: 0.6,
    roughness: 0.2,
  });
  const antiqueGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8a6425,
    metalness: 0.5,
    roughness: 0.35,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0xc8b8a4,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.88,
    side: THREE.DoubleSide,
  });
  const featherLightMat = new THREE.MeshStandardMaterial({
    color: 0xd8cbb9,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.82,
    side: THREE.DoubleSide,
  });
  const featherShadeMat = new THREE.MeshStandardMaterial({
    color: 0x94836f,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.78,
    side: THREE.DoubleSide,
  });
  const barbMat = new THREE.LineBasicMaterial({
    color: 0x8e7d69,
    transparent: true,
    opacity: 0.58,
  });
  const fineBarbMat = new THREE.LineBasicMaterial({
    color: 0xb2a38f,
    transparent: true,
    opacity: 0.48,
  });
  const downMat = new THREE.LineBasicMaterial({
    color: 0xd8d1c5,
    transparent: true,
    opacity: 0.55,
  });
  const engravingMat = new THREE.MeshStandardMaterial({
    color: 0x4e3518,
    metalness: 0.0,
    roughness: 0.7,
  });

  function createTaperedTubeGeometry(curve, tubularSegments, radialSegments, radiusAt) {
    const positions = [];
    const indices = [];

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const normal = new THREE.Vector3(-tangent.y, tangent.x, 0);

      if (normal.lengthSq() < 0.000001) normal.set(1, 0, 0);
      normal.normalize();

      const binormal = new THREE.Vector3()
        .crossVectors(tangent, normal)
        .normalize();
      const radius = radiusAt(t);

      for (let j = 0; j < radialSegments; j++) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const offset = normal
          .clone()
          .multiplyScalar(Math.cos(angle) * radius)
          .add(
            binormal
              .clone()
              .multiplyScalar(Math.sin(angle) * radius)
          );
        positions.push(
          point.x + offset.x,
          point.y + offset.y,
          point.z + offset.z
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const nextJ = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + nextJ;
        const d = i * radialSegments + nextJ;
        indices.push(a, d, b, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const feather = new THREE.Group();
  feather.name = "feather";
  feather.position.set(-0.34, 0.11, 0);
  feather.rotation.z = -0.52;
  root.add(feather);

  const feather_left_vaneShape = new THREE.Shape();
  feather_left_vaneShape.moveTo(-0.012, 0.02);
  feather_left_vaneShape.bezierCurveTo(
    -0.018,
    0.24,
    -0.055,
    0.62,
    -0.09,
    0.96
  );
  feather_left_vaneShape.bezierCurveTo(
    -0.12,
    1.25,
    -0.11,
    1.55,
    -0.04,
    1.78
  );
  feather_left_vaneShape.bezierCurveTo(
    0.0,
    1.91,
    0.07,
    1.98,
    0.12,
    1.96
  );
  feather_left_vaneShape.bezierCurveTo(
    0.09,
    1.68,
    0.07,
    1.26,
    0.052,
    0.92
  );
  feather_left_vaneShape.bezierCurveTo(
    0.035,
    0.57,
    0.012,
    0.22,
    -0.012,
    0.02
  );
  feather_left_vaneShape.closePath();

  const feather_left_vaneGeom = new THREE.ShapeGeometry(
    feather_left_vaneShape,
    28
  );
  const feather_left_vane = new THREE.Mesh(
    feather_left_vaneGeom,
    featherMat
  );
  feather_left_vane.name = "feather_left_vane";
  feather.add(feather_left_vane);

  const feather_right_vaneShape = new THREE.Shape();
  feather_right_vaneShape.moveTo(0.012, 0.02);
  feather_right_vaneShape.bezierCurveTo(
    0.05,
    0.2,
    0.14,
    0.48,
    0.23,
    0.72
  );
  feather_right_vaneShape.bezierCurveTo(
    0.32,
    0.93,
    0.39,
    1.15,
    0.42,
    1.36
  );
  feather_right_vaneShape.bezierCurveTo(
    0.45,
    1.57,
    0.4,
    1.78,
    0.25,
    1.9
  );
  feather_right_vaneShape.bezierCurveTo(
    0.2,
    1.95,
    0.16,
    1.97,
    0.12,
    1.96
  );
  feather_right_vaneShape.bezierCurveTo(
    0.09,
    1.68,
    0.07,
    1.26,
    0.052,
    0.92
  );
  feather_right_vaneShape.bezierCurveTo(
    0.035,
    0.57,
    0.015,
    0.2,
    0.012,
    0.02
  );
  feather_right_vaneShape.closePath();

  const feather_right_vaneGeom = new THREE.ShapeGeometry(
    feather_right_vaneShape,
    28
  );
  const feather_right_vane = new THREE.Mesh(
    feather_right_vaneGeom,
    featherLightMat
  );
  feather_right_vane.name = "feather_right_vane";
  feather.add(feather_right_vane);

  const feather_right_slit_lowerShape = new THREE.Shape();
  feather_right_slit_lowerShape.moveTo(0.055, 0.62);
  feather_right_slit_lowerShape.lineTo(0.46, 0.8);
  feather_right_slit_lowerShape.lineTo(0.3, 0.72);
  feather_right_slit_lowerShape.lineTo(0.06, 0.66);
  feather_right_slit_lowerShape.closePath();

  const feather_right_slit_lowerGeom = new THREE.ShapeGeometry(
    feather_right_slit_lowerShape
  );
  const feather_right_slit_lower = new THREE.Mesh(
    feather_right_slit_lowerGeom,
    featherShadeMat
  );
  feather_right_slit_lower.name = "feather_right_slit_lower";
  feather_right_slit_lower.position.z = 0.014;
  feather.add(feather_right_slit_lower);

  const feather_right_slit_middleShape = new THREE.Shape();
  feather_right_slit_middleShape.moveTo(0.06, 0.95);
  feather_right_slit_middleShape.lineTo(0.49, 1.2);
  feather_right_slit_middleShape.lineTo(0.34, 1.1);
  feather_right_slit_middleShape.lineTo(0.065, 0.99);
  feather_right_slit_middleShape.closePath();

  const feather_right_slit_middleGeom = new THREE.ShapeGeometry(
    feather_right_slit_middleShape
  );
  const feather_right_slit_middle = new THREE.Mesh(
    feather_right_slit_middleGeom,
    featherShadeMat
  );
  feather_right_slit_middle.name = "feather_right_slit_middle";
  feather_right_slit_middle.position.z = 0.015;
  feather.add(feather_right_slit_middle);

  const feather_right_slit_upperShape = new THREE.Shape();
  feather_right_slit_upperShape.moveTo(0.07, 1.35);
  feather_right_slit_upperShape.lineTo(0.43, 1.58);
  feather_right_slit_upperShape.lineTo(0.32, 1.49);
  feather_right_slit_upperShape.lineTo(0.075, 1.38);
  feather_right_slit_upperShape.closePath();

  const feather_right_slit_upperGeom = new THREE.ShapeGeometry(
    feather_right_slit_upperShape
  );
  const feather_right_slit_upper = new THREE.Mesh(
    feather_right_slit_upperGeom,
    featherShadeMat
  );
  feather_right_slit_upper.name = "feather_right_slit_upper";
  feather_right_slit_upper.position.z = 0.016;
  feather.add(feather_right_slit_upper);

  const feather_barb_positions = [];
  const barbCount = 54;

  for (let i = 0; i < barbCount; i++) {
    const t = (i + 1) / (barbCount + 2);
    const y = 0.08 + t * 1.78;
    const shaftX = 0.012 + t * 0.105;
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.72);
    const leftWidth = 0.34 * envelope * (0.68 + 0.32 * t);
    const rightWidth =
      0.42 * envelope * (0.78 + 0.22 * t);

    feather_barb_positions.push(
      shaftX - 0.004,
      y,
      0.024,
      shaftX - leftWidth,
      y + 0.025 + 0.05 * (1 - t),
      0.024
    );
    feather_barb_positions.push(
      shaftX + 0.004,
      y,
      0.025,
      shaftX + rightWidth,
      y + 0.02 + 0.045 * (1 - t),
      0.025
    );
  }

  const feather_barbsGeom = new THREE.BufferGeometry();
  feather_barbsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(feather_barb_positions, 3)
  );
  const feather_barbs = new THREE.LineSegments(
    feather_barbsGeom,
    barbMat
  );
  feather_barbs.name = "feather_barbs";
  feather.add(feather_barbs);

  const feather_fine_barb_positions = [];
  const fineBarbCount = 66;

  for (let i = 0; i < fineBarbCount; i++) {
    const t = (i + 0.5) / fineBarbCount;
    const y = 0.1 + t * 1.74;
    const shaftX = 0.012 + t * 0.105;
    const envelope = Math.pow(Math.sin(Math.PI * t), 0.75);
    const leftWidth = 0.31 * envelope;
    const rightWidth = 0.39 * envelope;

    feather_fine_barb_positions.push(
      shaftX - 0.009,
      y,
      0.027,
      shaftX - leftWidth,
      y + 0.045,
      0.027
    );
    feather_fine_barb_positions.push(
      shaftX + 0.009,
      y,
      0.028,
      shaftX + rightWidth,
      y + 0.038,
      0.028
    );
  }

  const feather_fine_barbsGeom = new THREE.BufferGeometry();
  feather_fine_barbsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(feather_fine_barb_positions, 3)
  );
  const feather_fine_barbs = new THREE.LineSegments(
    feather_fine_barbsGeom,
    fineBarbMat
  );
  feather_fine_barbs.name = "feather_fine_barbs";
  feather.add(feather_fine_barbs);

  const feather_down_positions = [];
  const downCount = 22;

  for (let i = 0; i < downCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const t = i / (downCount - 1);
    const startX = 0.01 + 0.025 * t;
    const startY = 0.02 + 0.14 * t;
    const reach =
      0.24 + 0.22 * Math.sin(((i + 1) / downCount) * Math.PI);
    const endX = startX + side * reach;
    const endY =
      startY -
      0.04 +
      0.12 * t +
      0.07 * Math.sin(i * 1.7);
    const midX = startX + side * reach * 0.54;
    const midY =
      startY +
      0.05 * Math.sin(i * 0.9) +
      0.03 * t;

    feather_down_positions.push(
      startX,
      startY,
      -0.012,
      midX,
      midY,
      -0.012
    );
    feather_down_positions.push(
      midX,
      midY,
      -0.012,
      endX,
      endY,
      -0.012
    );
  }

  const feather_downGeom = new THREE.BufferGeometry();
  feather_downGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(feather_down_positions, 3)
  );
  const feather_down = new THREE.LineSegments(
    feather_downGeom,
    downMat
  );
  feather_down.name = "feather_down";
  feather.add(feather_down);

  const rachisCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.0, 0.0, 0.045),
      new THREE.Vector3(0.025, 0.42, 0.045),
      new THREE.Vector3(0.065, 0.92, 0.045),
      new THREE.Vector3(0.105, 1.45, 0.045),
      new THREE.Vector3(0.12, 1.94, 0.045),
    ],
    false,
    "centripetal"
  );

  const feather_rachisGeom = createTaperedTubeGeometry(
    rachisCurve,
    56,
    10,
    function (t) {
      return 0.036 * (1 - t) + 0.005;
    }
  );
  const feather_rachis = new THREE.Mesh(
    feather_rachisGeom,
    goldMat
  );
  feather_rachis.name = "feather_rachis";
  feather.add(feather_rachis);

  const pen_assembly = new THREE.Group();
  pen_assembly.name = "pen_assembly";
  pen_assembly.position.set(-0.34, 0.11, 0);
  pen_assembly.rotation.z = -0.52;
  root.add(pen_assembly);

  const pen_shaftCurve = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.0, -0.25, 0.05),
      new THREE.Vector3(0.018, 0.15, 0.05),
      new THREE.Vector3(0.055, 0.62, 0.05),
      new THREE.Vector3(0.095, 1.15, 0.05),
      new THREE.Vector3(0.115, 1.62, 0.05),
    ],
    false,
    "centripetal"
  );

  const pen_shaftGeom = createTaperedTubeGeometry(
    pen_shaftCurve,
    52,
    12,
    function (t) {
      return 0.048 * (1 - t) + 0.014;
    }
  );
  const pen_shaft = new THREE.Mesh(pen_shaftGeom, goldMat);
  pen_shaft.name = "pen_shaft";
  pen_assembly.add(pen_shaft);

  const ferrule_sleeveGeom = new THREE.CylinderGeometry(
    0.052,
    0.072,
    0.34,
    24
  );
  const ferrule_sleeve = new THREE.Mesh(
    ferrule_sleeveGeom,
    goldMat
  );
  ferrule_sleeve.name = "ferrule_sleeve";
  ferrule_sleeve.position.set(0, -0.36, 0.05);
  pen_assembly.add(ferrule_sleeve);

  const ferrule_upper_bandGeom = new THREE.TorusGeometry(
    0.057,
    0.011,
    8,
    24
  );
  const ferrule_upper_band = new THREE.Mesh(
    ferrule_upper_bandGeom,
    goldMat
  );
  ferrule_upper_band.name = "ferrule_upper_band";
  ferrule_upper_band.rotation.x = Math.PI / 2;
  ferrule_upper_band.position.set(0, -0.19, 0.05);
  pen_assembly.add(ferrule_upper_band);

  const ferrule_lower_bandGeom = new THREE.TorusGeometry(
    0.074,
    0.012,
    8,
    24
  );
  const ferrule_lower_band = new THREE.Mesh(
    ferrule_lower_bandGeom,
    goldMat
  );
  ferrule_lower_band.name = "ferrule_lower_band";
  ferrule_lower_band.rotation.x = Math.PI / 2;
  ferrule_lower_band.position.set(0, -0.53, 0.05);
  pen_assembly.add(ferrule_lower_band);

  const ornate_gripProfile = [
    new THREE.Vector2(0.0, -0.94),
    new THREE.Vector2(0.038, -0.94),
    new THREE.Vector2(0.046, -0.87),
    new THREE.Vector2(0.072, -0.81),
    new THREE.Vector2(0.066, -0.76),
    new THREE.Vector2(0.105, -0.7),
    new THREE.Vector2(0.12, -0.63),
    new THREE.Vector2(0.096, -0.57),
    new THREE.Vector2(0.072, -0.51),
    new THREE.Vector2(0.0, -0.5),
  ];
  const ornate_gripGeom = new THREE.LatheGeometry(
    ornate_gripProfile,
    32
  );
  const ornate_grip = new THREE.Mesh(
    ornate_gripGeom,
    goldMat
  );
  ornate_grip.name = "ornate_grip";
  ornate_grip.position.z = 0.05;
  pen_assembly.add(ornate_grip);

  const ornate_upper_collarGeom = new THREE.TorusGeometry(
    0.096,
    0.014,
    8,
    28
  );
  const ornate_upper_collar = new THREE.Mesh(
    ornate_upper_collarGeom,
    goldMat
  );
  ornate_upper_collar.name = "ornate_upper_collar";
  ornate_upper_collar.rotation.x = Math.PI / 2;
  ornate_upper_collar.position.set(0, -0.56, 0.05);
  pen_assembly.add(ornate_upper_collar);

  const ornate_lower_collarGeom = new THREE.TorusGeometry(
    0.061,
    0.012,
    8,
    28
  );
  const ornate_lower_collar = new THREE.Mesh(
    ornate_lower_collarGeom,
    goldMat
  );
  ornate_lower_collar.name = "ornate_lower_collar";
  ornate_lower_collar.rotation.x = Math.PI / 2;
  ornate_lower_collar.position.set(0, -0.88, 0.05);
  pen_assembly.add(ornate_lower_collar);

  const ornate_center_bandGeom = new THREE.TorusGeometry(
    0.112,
    0.012,
    8,
    28
  );
  const ornate_center_band = new THREE.Mesh(
    ornate_center_bandGeom,
    antiqueGoldMat
  );
  ornate_center_band.name = "ornate_center_band";
  ornate_center_band.rotation.x = Math.PI / 2;
  ornate_center_band.position.set(0, -0.69, 0.05);
  pen_assembly.add(ornate_center_band);

  const ornate_leaf_ribsGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.16,
    8
  );
  const ornate_leaf_ribs = new THREE.InstancedMesh(
    ornate_leaf_ribsGeom,
    goldMat,
    8
  );
  ornate_leaf_ribs.name = "ornate_leaf_ribs";

  const rib_dummy = new THREE.Object3D();
  const local_y_axis = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const radial = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
    const direction = new THREE.Vector3(
      radial.x * 0.7,
      0.72,
      radial.z * 0.7
    ).normalize();

    rib_dummy.position.set(
      radial.x * 0.105,
      -0.68,
      0.05 + radial.z * 0.105
    );
    rib_dummy.quaternion.setFromUnitVectors(
      local_y_axis,
      direction
    );
    rib_dummy.scale.set(1, 1, 1);
    rib_dummy.updateMatrix();
    ornate_leaf_ribs.setMatrixAt(i, rib_dummy.matrix);
  }

  ornate_leaf_ribs.instanceMatrix.needsUpdate = true;
  pen_assembly.add(ornate_leaf_ribs);

  const ornate_leaf_tipsGeom = new THREE.SphereGeometry(
    0.021,
    12,
    8
  );
  const ornate_leaf_tips = new THREE.InstancedMesh(
    ornate_leaf_tipsGeom,
    goldMat,
    8
  );
  ornate_leaf_tips.name = "ornate_leaf_tips";

  const tip_dummy = new THREE.Object3D();

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    tip_dummy.position.set(
      Math.cos(angle) * 0.12,
      -0.61,
      0.05 + Math.sin(angle) * 0.12
    );
    tip_dummy.scale.set(0.8, 1.25, 0.8);
    tip_dummy.quaternion.identity();
    tip_dummy.updateMatrix();
    ornate_leaf_tips.setMatrixAt(i, tip_dummy.matrix);
  }

  ornate_leaf_tips.instanceMatrix.needsUpdate = true;
  pen_assembly.add(ornate_leaf_tips);

  const ornate_center_beadGeom = new THREE.SphereGeometry(
    0.038,
    16,
    10
  );
  const ornate_center_bead = new THREE.Mesh(
    ornate_center_beadGeom,
    goldMat
  );
  ornate_center_bead.name = "ornate_center_bead";
  ornate_center_bead.position.set(0, -0.69, 0.17);
  ornate_center_bead.scale.set(1, 0.8, 0.65);
  pen_assembly.add(ornate_center_bead);

  const writing_tipGeom = new THREE.ConeGeometry(
    0.041,
    0.45,
    24
  );
  const writing_tip = new THREE.Mesh(
    writing_tipGeom,
    goldMat
  );
  writing_tip.name = "writing_tip";
  writing_tip.rotation.z = Math.PI;
  writing_tip.position.set(0, -1.14, 0.05);
  pen_assembly.add(writing_tip);

  const writing_tip_capGeom = new THREE.SphereGeometry(
    0.014,
    12,
    8
  );
  const writing_tip_cap = new THREE.Mesh(
    writing_tip_capGeom,
    antiqueGoldMat
  );
  writing_tip_cap.name = "writing_tip_cap";
  writing_tip_cap.position.set(0, -1.37, 0.05);
  pen_assembly.add(writing_tip_cap);

  const holder = new THREE.Group();
  holder.name = "holder";
  holder.position.set(0.1, -0.72, -0.02);
  root.add(holder);

  const holder_baseProfile = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.29, 0.0),
    new THREE.Vector2(0.34, 0.025),
    new THREE.Vector2(0.35, 0.06),
    new THREE.Vector2(0.33, 0.095),
    new THREE.Vector2(0.28, 0.13),
    new THREE.Vector2(0.25, 0.18),
    new THREE.Vector2(0.21, 0.25),
    new THREE.Vector2(0.17, 0.33),
    new THREE.Vector2(0.13, 0.38),
    new THREE.Vector2(0.0, 0.38),
  ];
  const holder_baseGeom = new THREE.LatheGeometry(
    holder_baseProfile,
    40
  );
  const holder_base = new THREE.Mesh(
    holder_baseGeom,
    goldMat
  );
  holder_base.name = "holder_base";
  holder.add(holder_base);

  const holder_base_trimGeom = new THREE.TorusGeometry(
    0.326,
    0.014,
    8,
    36
  );
  const holder_base_trim = new THREE.Mesh(
    holder_base_trimGeom,
    antiqueGoldMat
  );
  holder_base_trim.name = "holder_base_trim";
  holder_base_trim.rotation.x = Math.PI / 2;
  holder_base_trim.position.y = 0.052;
  holder.add(holder_base_trim);

  const holder_neckGeom = new THREE.CylinderGeometry(
    0.115,
    0.135,
    0.17,
    32
  );
  const holder_neck = new THREE.Mesh(
    holder_neckGeom,
    goldMat
  );
  holder_neck.name = "holder_neck";
  holder_neck.position.y = 0.44;
  holder.add(holder_neck);

  const holder_neck_bandGeom = new THREE.TorusGeometry(
    0.124,
    0.012,
    8,
    30
  );
  const holder_neck_band = new THREE.Mesh(
    holder_neck_bandGeom,
    antiqueGoldMat
  );
  holder_neck_band.name = "holder_neck_band";
  holder_neck_band.rotation.x = Math.PI / 2;
  holder_neck_band.position.y = 0.38;
  holder.add(holder_neck_band);

  const holder_top_rimGeom = new THREE.TorusGeometry(
    0.122,
    0.024,
    10,
    36
  );
  const holder_top_rim = new THREE.Mesh(
    holder_top_rimGeom,
    goldMat
  );
  holder_top_rim.name = "holder_top_rim";
  holder_top_rim.rotation.x = Math.PI / 2;
  holder_top_rim.position.y = 0.54;
  holder.add(holder_top_rim);

  const holder_top_insetGeom = new THREE.CylinderGeometry(
    0.095,
    0.095,
    0.012,
    32
  );
  const holder_top_inset = new THREE.Mesh(
    holder_top_insetGeom,
    antiqueGoldMat
  );
  holder_top_inset.name = "holder_top_inset";
  holder_top_inset.position.y = 0.548;
  holder.add(holder_top_inset);

  function holderSurfacePoint(x, y, extra) {
    const radius = 0.29;
    const z = Math.sqrt(
      Math.max(0.001, radius * radius - x * x)
    );
    const normal = new THREE.Vector3(
      x / radius,
      0,
      z / radius
    ).normalize();

    return new THREE.Vector3(x, y, z).add(
      normal.multiplyScalar(extra)
    );
  }

  const holder_engravingCurve = new THREE.CatmullRomCurve3(
    [
      holderSurfacePoint(-0.235, 0.11, 0.008),
      holderSurfacePoint(-0.19, 0.15, 0.008),
      holderSurfacePoint(-0.15, 0.22, 0.008),
      holderSurfacePoint(-0.08, 0.27, 0.008),
      holderSurfacePoint(-0.02, 0.2, 0.008),
      holderSurfacePoint(0.035, 0.13, 0.008),
      holderSurfacePoint(0.11, 0.1, 0.008),
    ],
    false,
    "centripetal"
  );
  const holder_engravingGeom = new THREE.TubeGeometry(
    holder_engravingCurve,
    30,
    0.007,
    6,
    false
  );
  const holder_engraving = new THREE.Mesh(
    holder_engravingGeom,
    engravingMat
  );
  holder_engraving.name = "holder_engraving";
  holder.add(holder_engraving);

  const holder_scrollCurve = new THREE.CatmullRomCurve3(
    [
      holderSurfacePoint(0.055, 0.12, 0.01),
      holderSurfacePoint(0.12, 0.1, 0.01),
      holderSurfacePoint(0.17, 0.14, 0.01),
      holderSurfacePoint(0.16, 0.2, 0.01),
      holderSurfacePoint(0.11, 0.22, 0.01),
      holderSurfacePoint(0.075, 0.18, 0.01),
      holderSurfacePoint(0.105, 0.15, 0.01),
    ],
    false,
    "centripetal"
  );
  const holder_scrollGeom = new THREE.TubeGeometry(
    holder_scrollCurve,
    28,
    0.007,
    6,
    false
  );
  const holder_scroll = new THREE.Mesh(
    holder_scrollGeom,
    engravingMat
  );
  holder_scroll.name = "holder_scroll";
  holder.add(holder_scroll);

  const holder_engraving_leafGeom = new THREE.SphereGeometry(
    0.035,
    14,
    8
  );
  const holder_engraving_leaf = new THREE.Mesh(
    holder_engraving_leafGeom,
    engravingMat
  );
  holder_engraving_leaf.name = "holder_engraving_leaf";
  holder_engraving_leaf.position.copy(
    holderSurfacePoint(-0.105, 0.245, 0.012)
  );
  holder_engraving_leaf.scale.set(1.45, 0.48, 0.22);
  holder_engraving_leaf.rotation.z = -0.55;
  holder.add(holder_engraving_leaf);

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

  fitToUnitCube(THREE, root);
  return root;
}