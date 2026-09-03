export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "diamond_cluster_ring";

  const ring_shankMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const facet_reflectionsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  function createBrilliantGeometry() {
    const positions = [];
    const colors = [];
    const palette = [
      [1.00, 1.00, 1.00],
      [0.82, 0.87, 0.92],
      [0.48, 0.55, 0.62],
      [0.94, 0.98, 1.00],
      [0.20, 0.25, 0.31],
      [0.68, 0.75, 0.82],
      [0.07, 0.09, 0.12],
      [0.90, 0.93, 0.96],
    ];

    function point(radius, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      );
    }

    function addTriangle(a, b, c, shadeIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const shade = palette[shadeIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(shade[0], shade[1], shade[2]);
      }
    }

    const segments = 16;
    const table_radius = 0.36;
    const star_radius = 0.69;
    const girdle_radius = 1.00;
    const pavilion_radius = 0.56;
    const table_z = 0.24;
    const star_z = 0.13;
    const girdle_top_z = 0.02;
    const girdle_bottom_z = -0.04;
    const pavilion_z = -0.28;
    const culet_z = -0.62;
    const center = new THREE.Vector3(0, 0, table_z);
    const culet = new THREE.Vector3(0, 0, culet_z);

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const am = (a0 + a1) * 0.5;

      const table0 = point(table_radius, a0, table_z);
      const table1 = point(table_radius, a1, table_z);
      const star0 = point(star_radius, am, star_z);
      const star1 = point(
        star_radius,
        am + Math.PI / segments,
        star_z
      );

      const girdle_top0 = point(girdle_radius, a0, girdle_top_z);
      const girdle_top1 = point(girdle_radius, a1, girdle_top_z);
      const girdle_bottom0 = point(
        girdle_radius,
        a0,
        girdle_bottom_z
      );
      const girdle_bottom1 = point(
        girdle_radius,
        a1,
        girdle_bottom_z
      );
      const pavilion0 = point(pavilion_radius, am, pavilion_z);
      const pavilion1 = point(
        pavilion_radius,
        am + Math.PI / segments,
        pavilion_z
      );

      addTriangle(center, table0, table1, i * 3);
      addTriangle(table0, star0, table1, i * 5 + 1);
      addTriangle(table1, star0, star1, i * 7 + 2);
      addTriangle(star0, girdle_top0, girdle_top1, i * 3 + 4);
      addTriangle(star0, girdle_top1, star1, i * 5 + 6);

      addTriangle(
        girdle_top0,
        girdle_bottom0,
        girdle_bottom1,
        i + 2
      );
      addTriangle(
        girdle_top0,
        girdle_bottom1,
        girdle_top1,
        i + 5
      );

      addTriangle(
        girdle_bottom0,
        pavilion0,
        girdle_bottom1,
        i * 2 + 3
      );
      addTriangle(
        girdle_bottom1,
        pavilion0,
        pavilion1,
        i * 4 + 1
      );
      addTriangle(pavilion0, culet, pavilion1, i * 5 + 3);
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

  function createFacetReflectionGeometry() {
    const positions = [];
    const colors = [];
    const palette = [
      [1.00, 1.00, 1.00],
      [0.72, 0.78, 0.84],
      [0.12, 0.15, 0.19],
      [0.92, 0.96, 1.00],
      [0.38, 0.44, 0.50],
      [0.04, 0.05, 0.07],
      [0.82, 0.87, 0.92],
      [0.25, 0.30, 0.36],
    ];

    function point(radius, angle, z) {
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z
      );
    }

    function addTriangle(a, b, c, shadeIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const shade = palette[shadeIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(shade[0], shade[1], shade[2]);
      }
    }

    const segments = 16;
    const center = new THREE.Vector3(0, 0, 0.246);

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const am = (a0 + a1) * 0.5;
      const inner_radius = i % 2 === 0 ? 0.34 : 0.42;

      const inner0 = point(inner_radius, am, 0.175);
      const inner1 = point(inner_radius, am + Math.PI / segments, 0.175);
      const edge0 = point(0.975, a0, 0.026);
      const edge1 = point(0.975, a1, 0.026);

      addTriangle(center, inner0, edge0, i * 3 + 1);
      addTriangle(inner0, inner1, edge0, i * 5 + 2);
      addTriangle(inner1, edge1, edge0, i * 7 + 4);
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

  const ring_shankGeom = new THREE.TorusGeometry(0.62, 0.095, 16, 64);
  const ring_shank = new THREE.Mesh(ring_shankGeom, ring_shankMat);
  ring_shank.name = "ring_shank";
  ring_shank.rotation.x = Math.PI / 2;
  ring_shank.position.set(0, 0, -0.50);
  root.add(ring_shank);

  const left_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.44, 0, -0.10),
    new THREE.Vector3(-0.57, 0, -0.04),
    new THREE.Vector3(-0.70, 0, 0.03),
    new THREE.Vector3(-0.80, 0, 0.09),
  ]);
  const left_shoulderGeom = new THREE.TubeGeometry(
    left_shoulderPath,
    24,
    0.095,
    12,
    false
  );
  const left_shoulder = new THREE.Mesh(
    left_shoulderGeom,
    ring_shankMat
  );
  left_shoulder.name = "left_shoulder";
  root.add(left_shoulder);

  const right_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.44, 0, -0.10),
    new THREE.Vector3(0.57, 0, -0.04),
    new THREE.Vector3(0.70, 0, 0.03),
    new THREE.Vector3(0.80, 0, 0.09),
  ]);
  const right_shoulderGeom = new THREE.TubeGeometry(
    right_shoulderPath,
    24,
    0.095,
    12,
    false
  );
  const right_shoulder = new THREE.Mesh(
    right_shoulderGeom,
    ring_shankMat
  );
  right_shoulder.name = "right_shoulder";
  root.add(right_shoulder);

  const diamondGeom = createBrilliantGeometry();
  const facet_reflectionsGeom = createFacetReflectionGeometry();
  const diamond_settingGeom = new THREE.CylinderGeometry(1, 1, 1, 32);
  const prong_stemGeom = new THREE.CylinderGeometry(1, 1, 1, 10);
  const prong_tipGeom = new THREE.SphereGeometry(1, 16, 10);
  const transform_helper = new THREE.Object3D();

  function createDiamondSetting(radius, name) {
    const setting = new THREE.Mesh(
      diamond_settingGeom,
      ring_shankMat
    );
    setting.name = name;
    setting.rotation.x = Math.PI / 2;
    setting.scale.set(radius * 0.70, 0.035, radius * 0.70);
    setting.position.z = -0.025;
    return setting;
  }

  function createProngStems(radius, count, phase, name) {
    const stems = new THREE.InstancedMesh(
      prong_stemGeom,
      ring_shankMat,
      count
    );
    stems.name = name;

    for (let i = 0; i < count; i++) {
      const angle = phase + i / count * Math.PI * 2;
      transform_helper.position.set(
        Math.cos(angle) * radius * 0.96,
        Math.sin(angle) * radius * 0.96,
        0.075
      );
      transform_helper.rotation.set(Math.PI / 2, 0, 0);
      transform_helper.scale.set(0.018, 0.14, 0.018);
      transform_helper.updateMatrix();
      stems.setMatrixAt(i, transform_helper.matrix);
    }

    stems.instanceMatrix.needsUpdate = true;
    return stems;
  }

  function createProngTips(radius, count, phase, name) {
    const tips = new THREE.InstancedMesh(
      prong_tipGeom,
      ring_shankMat,
      count
    );
    tips.name = name;

    for (let i = 0; i < count; i++) {
      const angle = phase + i / count * Math.PI * 2;
      transform_helper.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.145
      );
      transform_helper.rotation.set(0, 0, angle);
      transform_helper.scale.set(0.055, 0.038, 0.045);
      transform_helper.updateMatrix();
      tips.setMatrixAt(i, transform_helper.matrix);
    }

    tips.instanceMatrix.needsUpdate = true;
    return tips;
  }

  const center_radius = 0.68;
  const center_phase = Math.PI / 2;

  const center_setting = createDiamondSetting(
    center_radius,
    "center_setting"
  );
  center_setting.position.set(0, 0.10, 0.16);
  root.add(center_setting);

  const center_diamond = new THREE.Mesh(diamondGeom, diamondMat);
  center_diamond.name = "center_diamond";
  center_diamond.position.set(0, 0.10, 0.22);
  center_diamond.scale.setScalar(center_radius);
  root.add(center_diamond);

  const center_facets = new THREE.Mesh(
    facet_reflectionsGeom,
    facet_reflectionsMat
  );
  center_facets.name = "center_facets";
  center_facets.position.copy(center_diamond.position);
  center_facets.scale.copy(center_diamond.scale);
  center_facets.renderOrder = 2;
  root.add(center_facets);

  const center_prong_stems = createProngStems(
    center_radius,
    6,
    center_phase,
    "center_prong_stems"
  );
  center_prong_stems.position.set(0, 0.10, 0);
  root.add(center_prong_stems);

  const center_prongs = createProngTips(
    center_radius,
    6,
    center_phase,
    "center_prongs"
  );
  center_prongs.position.set(0, 0.10, 0);
  root.add(center_prongs);

  const side_radius = 0.31;
  const side_phase = Math.PI / 2 + Math.PI / 6;

  const left_diamond_setting = createDiamondSetting(
    side_radius,
    "left_diamond_setting"
  );
  left_diamond_setting.position.set(-0.82, 0.08, 0.10);
  root.add(left_diamond_setting);

  const left_side_diamond = new THREE.Mesh(diamondGeom, diamondMat);
  left_side_diamond.name = "left_side_diamond";
  left_side_diamond.position.set(-0.82, 0.08, 0.16);
  left_side_diamond.scale.setScalar(side_radius);
  root.add(left_side_diamond);

  const left_diamond_facets = new THREE.Mesh(
    facet_reflectionsGeom,
    facet_reflectionsMat
  );
  left_diamond_facets.name = "left_diamond_facets";
  left_diamond_facets.position.copy(left_side_diamond.position);
  left_diamond_facets.scale.copy(left_side_diamond.scale);
  left_diamond_facets.renderOrder = 2;
  root.add(left_diamond_facets);

  const left_prong_stems = createProngStems(
    side_radius,
    4,
    side_phase,
    "left_prong_stems"
  );
  left_prong_stems.position.set(-0.82, 0.08, 0);
  root.add(left_prong_stems);

  const left_prongs = createProngTips(
    side_radius,
    4,
    side_phase,
    "left_prongs"
  );
  left_prongs.position.set(-0.82, 0.08, 0);
  root.add(left_prongs);

  const right_diamond_setting = createDiamondSetting(
    side_radius,
    "right_diamond_setting"
  );
  right_diamond_setting.position.set(0.82, 0.08, 0.10);
  root.add(right_diamond_setting);

  const right_side_diamond = new THREE.Mesh(diamondGeom, diamondMat);
  right_side_diamond.name = "right_side_diamond";
  right_side_diamond.position.set(0.82, 0.08, 0.16);
  right_side_diamond.scale.setScalar(side_radius);
  root.add(right_side_diamond);

  const right_diamond_facets = new THREE.Mesh(
    facet_reflectionsGeom,
    facet_reflectionsMat
  );
  right_diamond_facets.name = "right_diamond_facets";
  right_diamond_facets.position.copy(right_side_diamond.position);
  right_diamond_facets.scale.copy(right_side_diamond.scale);
  right_diamond_facets.renderOrder = 2;
  root.add(right_diamond_facets);

  const right_prong_stems = createProngStems(
    side_radius,
    4,
    side_phase,
    "right_prong_stems"
  );
  right_prong_stems.position.set(0.82, 0.08, 0);
  root.add(right_prong_stems);

  const right_prongs = createProngTips(
    side_radius,
    4,
    side_phase,
    "right_prongs"
  );
  right_prongs.position.set(0.82, 0.08, 0);
  root.add(right_prongs);

  const accent_radius = 0.105;
  const accent_positions = [
    [-0.42, 0.64],
    [0.42, 0.64],
    [-0.43, -0.51],
    [0.43, -0.51],
  ];

  const accent_diamond_settings = new THREE.InstancedMesh(
    diamond_settingGeom,
    ring_shankMat,
    accent_positions.length
  );
  accent_diamond_settings.name = "accent_diamond_settings";

  const accent_diamonds = new THREE.InstancedMesh(
    diamondGeom,
    diamondMat,
    accent_positions.length
  );
  accent_diamonds.name = "accent_diamonds";

  for (let i = 0; i < accent_positions.length; i++) {
    const position = accent_positions[i];

    transform_helper.position.set(
      position[0],
      position[1],
      0.145
    );
    transform_helper.rotation.set(Math.PI / 2, 0, 0);
    transform_helper.scale.set(
      accent_radius * 0.70,
      0.025,
      accent_radius * 0.70
    );
    transform_helper.updateMatrix();
    accent_diamond_settings.setMatrixAt(
      i,
      transform_helper.matrix
    );

    transform_helper.position.set(
      position[0],
      position[1],
      0.19
    );
    transform_helper.rotation.set(0, 0, 0);
    transform_helper.scale.setScalar(accent_radius);
    transform_helper.updateMatrix();
    accent_diamonds.setMatrixAt(i, transform_helper.matrix);
  }

  accent_diamond_settings.instanceMatrix.needsUpdate = true;
  accent_diamonds.instanceMatrix.needsUpdate = true;
  root.add(accent_diamond_settings);
  root.add(accent_diamonds);

  const accent_prongs = new THREE.InstancedMesh(
    prong_tipGeom,
    ring_shankMat,
    accent_positions.length * 3
  );
  accent_prongs.name = "accent_prongs";

  let accent_prong_index = 0;
  for (let i = 0; i < accent_positions.length; i++) {
    const position = accent_positions[i];

    for (let j = 0; j < 3; j++) {
      const angle = Math.PI / 2 + j / 3 * Math.PI * 2;
      transform_helper.position.set(
        position[0] + Math.cos(angle) * accent_radius,
        position[1] + Math.sin(angle) * accent_radius,
        0.235
      );
      transform_helper.rotation.set(0, 0, angle);
      transform_helper.scale.set(0.022, 0.016, 0.020);
      transform_helper.updateMatrix();
      accent_prongs.setMatrixAt(
        accent_prong_index,
        transform_helper.matrix
      );
      accent_prong_index++;
    }
  }

  accent_prongs.instanceMatrix.needsUpdate = true;
  root.add(accent_prongs);

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