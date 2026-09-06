export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "diamond_pendant";

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkSilverMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7fbff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const diamondBackingMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  function traceRoundedRect(path, width, height, radius, clockwise) {
    const x = width / 2;
    const y = height / 2;
    const r = Math.min(radius, x, y);

    if (!clockwise) {
      path.moveTo(-x + r, -y);
      path.lineTo(x - r, -y);
      path.quadraticCurveTo(x, -y, x, -y + r);
      path.lineTo(x, y - r);
      path.quadraticCurveTo(x, y, x - r, y);
      path.lineTo(-x + r, y);
      path.quadraticCurveTo(-x, y, -x, y - r);
      path.lineTo(-x, -y + r);
      path.quadraticCurveTo(-x, -y, -x + r, -y);
    } else {
      path.moveTo(-x + r, -y);
      path.lineTo(-x, -y + r);
      path.lineTo(-x, y - r);
      path.quadraticCurveTo(-x, y, -x + r, y);
      path.lineTo(x - r, y);
      path.quadraticCurveTo(x, y, x, y - r);
      path.lineTo(x, -y + r);
      path.quadraticCurveTo(x, -y, x - r, -y);
      path.lineTo(-x + r, -y);
    }
    path.closePath();
  }

  function makeRoundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    traceRoundedRect(shape, width, height, radius, false);
    return shape;
  }

  function makeRoundedRectRingShape(
    outerWidth,
    outerHeight,
    outerRadius,
    innerWidth,
    innerHeight,
    innerRadius
  ) {
    const shape = makeRoundedRectShape(outerWidth, outerHeight, outerRadius);
    const hole = new THREE.Path();
    traceRoundedRect(hole, innerWidth, innerHeight, innerRadius, true);
    shape.holes.push(hole);
    return shape;
  }

  function makeExtrudedGeometry(shape, depth, bevelSize, bevelThickness) {
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevelSize > 0,
      bevelSegments: 3,
      bevelSize,
      bevelThickness,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function createFacetedGemGeometry(rx, ry, depth, segments) {
    const positions = [];
    const colors = [];
    const palette = [
      [1.00, 1.00, 1.00],
      [0.88, 0.92, 0.97],
      [0.58, 0.64, 0.72],
      [0.96, 0.98, 1.00],
      [0.32, 0.38, 0.46],
      [0.75, 0.80, 0.87],
      [1.00, 1.00, 1.00],
      [0.18, 0.23, 0.30],
    ];

    function point(scale, index, z) {
      const angle = index / segments * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const xSign = cosine < 0 ? -1 : 1;
      const ySign = sine < 0 ? -1 : 1;
      return new THREE.Vector3(
        rx * scale * xSign * Math.sqrt(Math.abs(cosine)),
        ry * scale * ySign * Math.sqrt(Math.abs(sine)),
        z
      );
    }

    function addTriangle(a, b, c, colorIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = palette[colorIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    const center = new THREE.Vector3(0, 0, depth * 0.48);
    const pavilion = new THREE.Vector3(0, 0, -depth * 0.55);

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const outer0 = point(1.0, i, 0);
      const outer1 = point(1.0, next, 0);
      const middle0 = point(0.72, i, depth * (i % 2 === 0 ? 0.34 : 0.29));
      const middle1 = point(0.72, next, depth * (next % 2 === 0 ? 0.34 : 0.29));
      const table0 = point(0.40, i, depth * (i % 2 === 0 ? 0.47 : 0.43));
      const table1 = point(0.40, next, depth * (next % 2 === 0 ? 0.47 : 0.43));

      addTriangle(outer0, outer1, middle0, i + 1);
      addTriangle(outer1, middle1, middle0, i * 3 + 2);
      addTriangle(middle0, middle1, table0, i * 5 + 3);
      addTriangle(middle1, table1, table0, i * 7 + 4);
      addTriangle(table0, table1, center, i * 3 + 5);
      addTriangle(outer1, outer0, pavilion, i + 6);
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

  const pendant_body = new THREE.Group();
  pendant_body.name = "pendant_body";
  pendant_body.position.y = -0.34;
  root.add(pendant_body);

  const outer_baseShape = makeRoundedRectShape(1.50, 1.70, 0.25);
  const outer_baseGeom = makeExtrudedGeometry(
    outer_baseShape,
    0.12,
    0.035,
    0.025
  );
  const outer_base = new THREE.Mesh(outer_baseGeom, silverMat);
  outer_base.name = "outer_base";
  outer_base.position.z = -0.015;
  pendant_body.add(outer_base);

  const halo_bedShape = makeRoundedRectRingShape(
    1.44,
    1.64,
    0.23,
    1.12,
    1.32,
    0.18
  );
  const halo_bedGeom = makeExtrudedGeometry(
    halo_bedShape,
    0.065,
    0.018,
    0.012
  );
  const halo_bed = new THREE.Mesh(halo_bedGeom, polishedMat);
  halo_bed.name = "halo_bed";
  halo_bed.position.z = 0.055;
  pendant_body.add(halo_bed);

  const outer_edge_railShape = makeRoundedRectRingShape(
    1.50,
    1.70,
    0.25,
    1.41,
    1.61,
    0.215
  );
  const outer_edge_railGeom = makeExtrudedGeometry(
    outer_edge_railShape,
    0.045,
    0.01,
    0.008
  );
  const outer_edge_rail = new THREE.Mesh(outer_edge_railGeom, polishedMat);
  outer_edge_rail.name = "outer_edge_rail";
  outer_edge_rail.position.z = 0.105;
  pendant_body.add(outer_edge_rail);

  const inner_bezelShape = makeRoundedRectRingShape(
    1.18,
    1.38,
    0.20,
    1.06,
    1.26,
    0.16
  );
  const inner_bezelGeom = makeExtrudedGeometry(
    inner_bezelShape,
    0.075,
    0.018,
    0.012
  );
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polishedMat);
  inner_bezel.name = "inner_bezel";
  inner_bezel.position.z = 0.105;
  pendant_body.add(inner_bezel);

  const halo_count = 18;
  const halo_gemGeom = createFacetedGemGeometry(0.10, 0.10, 0.08, 12);
  const halo_gems = new THREE.InstancedMesh(
    halo_gemGeom,
    diamondMat,
    halo_count
  );
  halo_gems.name = "halo_gems";

  const halo_settingGeom = new THREE.TorusGeometry(0.105, 0.014, 8, 24);
  const halo_settings = new THREE.InstancedMesh(
    halo_settingGeom,
    polishedMat,
    halo_count
  );
  halo_settings.name = "halo_settings";

  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < halo_count; i++) {
    const angle = Math.PI / 2 - i / halo_count * Math.PI * 2;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const x = 0.64 * Math.sign(cosine) * Math.sqrt(Math.abs(cosine));
    const y = 0.75 * Math.sign(sine) * Math.sqrt(Math.abs(sine));
    const scale = i % 3 === 0 ? 1.06 : (i % 3 === 1 ? 0.96 : 1.0);

    instance_dummy.position.set(x, y, 0.16);
    instance_dummy.rotation.set(0, 0, angle * 0.35);
    instance_dummy.scale.setScalar(scale);
    instance_dummy.updateMatrix();
    halo_gems.setMatrixAt(i, instance_dummy.matrix);

    instance_dummy.position.set(x, y, 0.112);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.setScalar(scale);
    instance_dummy.updateMatrix();
    halo_settings.setMatrixAt(i, instance_dummy.matrix);
  }
  halo_gems.instanceMatrix.needsUpdate = true;
  halo_settings.instanceMatrix.needsUpdate = true;
  pendant_body.add(halo_settings, halo_gems);

  const halo_prongGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const halo_prongs = new THREE.InstancedMesh(
    halo_prongGeom,
    polishedMat,
    halo_count * 2
  );
  halo_prongs.name = "halo_prongs";

  for (let i = 0; i < halo_count; i++) {
    const angle0 = Math.PI / 2 - i / halo_count * Math.PI * 2;
    const angle1 = Math.PI / 2 - (i + 1) / halo_count * Math.PI * 2;
    const midpoint = (i + 0.5) / halo_count;
    const middleAngle = Math.PI / 2 - midpoint * Math.PI * 2;

    const firstAngle = i % 2 === 0 ? angle0 : angle1;
    const firstCosine = Math.cos(firstAngle);
    const firstSine = Math.sin(firstAngle);
    instance_dummy.position.set(
      0.735 * Math.sign(firstCosine) * Math.sqrt(Math.abs(firstCosine)),
      0.845 * Math.sign(firstSine) * Math.sqrt(Math.abs(firstSine)),
      0.18
    );
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.setScalar(1);
    instance_dummy.updateMatrix();
    halo_prongs.setMatrixAt(i * 2, instance_dummy.matrix);

    instance_dummy.position.set(
      0.65 * Math.sign(Math.cos(middleAngle)) *
        Math.sqrt(Math.abs(Math.cos(middleAngle))),
      0.76 * Math.sign(Math.sin(middleAngle)) *
        Math.sqrt(Math.abs(Math.sin(middleAngle))),
      0.185
    );
    instance_dummy.updateMatrix();
    halo_prongs.setMatrixAt(i * 2 + 1, instance_dummy.matrix);
  }
  halo_prongs.instanceMatrix.needsUpdate = true;
  pendant_body.add(halo_prongs);

  const central_backingShape = makeRoundedRectShape(1.04, 1.24, 0.16);
  const central_backingGeom = new THREE.ShapeGeometry(
    central_backingShape,
    12
  );
  const central_backing = new THREE.Mesh(
    central_backingGeom,
    diamondBackingMat
  );
  central_backing.name = "central_backing";
  central_backing.position.z = 0.105;
  pendant_body.add(central_backing);

  const central_gemstoneGeom = createFacetedGemGeometry(
    0.53,
    0.63,
    0.18,
    24
  );
  const central_gemstone = new THREE.Mesh(
    central_gemstoneGeom,
    diamondMat
  );
  central_gemstone.name = "central_gemstone";
  central_gemstone.position.z = 0.19;
  pendant_body.add(central_gemstone);

  const gemstone_prongGeom = new THREE.SphereGeometry(0.08, 18, 12);
  const gemstone_prongs = new THREE.InstancedMesh(
    gemstone_prongGeom,
    polishedMat,
    4
  );
  gemstone_prongs.name = "gemstone_prongs";
  const gemstone_prong_positions = [
    new THREE.Vector3(-0.43, 0.49, 0.275),
    new THREE.Vector3(0.43, 0.49, 0.275),
    new THREE.Vector3(-0.43, -0.49, 0.275),
    new THREE.Vector3(0.43, -0.49, 0.275),
  ];
  for (let i = 0; i < gemstone_prong_positions.length; i++) {
    instance_dummy.position.copy(gemstone_prong_positions[i]);
    instance_dummy.rotation.set(0, 0, i * Math.PI / 2);
    instance_dummy.scale.set(0.78, 1.18, 0.58);
    instance_dummy.updateMatrix();
    gemstone_prongs.setMatrixAt(i, instance_dummy.matrix);
  }
  gemstone_prongs.instanceMatrix.needsUpdate = true;
  pendant_body.add(gemstone_prongs);

  const connector_ringGeom = new THREE.TorusGeometry(
    0.17,
    0.038,
    12,
    32
  );
  const connector_ring = new THREE.Mesh(connector_ringGeom, polishedMat);
  connector_ring.name = "connector_ring";
  connector_ring.position.set(0, 0.64, 0.015);
  root.add(connector_ring);

  const bail = new THREE.Group();
  bail.name = "bail";
  bail.position.y = 1.10;
  root.add(bail);

  const bail_frameShape = new THREE.Shape();
  bail_frameShape.moveTo(-0.10, -0.52);
  bail_frameShape.quadraticCurveTo(0, -0.59, 0.10, -0.52);
  bail_frameShape.lineTo(0.34, 0.42);
  bail_frameShape.quadraticCurveTo(0.38, 0.55, 0.22, 0.58);
  bail_frameShape.lineTo(-0.22, 0.58);
  bail_frameShape.quadraticCurveTo(-0.38, 0.55, -0.34, 0.42);
  bail_frameShape.lineTo(-0.10, -0.52);
  bail_frameShape.closePath();

  const bail_hole = new THREE.Path();
  bail_hole.moveTo(-0.05, -0.38);
  bail_hole.lineTo(-0.22, 0.38);
  bail_hole.quadraticCurveTo(-0.24, 0.44, -0.16, 0.45);
  bail_hole.lineTo(0.16, 0.45);
  bail_hole.quadraticCurveTo(0.24, 0.44, 0.22, 0.38);
  bail_hole.lineTo(0.05, -0.38);
  bail_hole.quadraticCurveTo(0, -0.44, -0.05, -0.38);
  bail_hole.closePath();
  bail_frameShape.holes.push(bail_hole);

  const bail_frameGeom = makeExtrudedGeometry(
    bail_frameShape,
    0.10,
    0.025,
    0.018
  );
  const bail_frame = new THREE.Mesh(bail_frameGeom, polishedMat);
  bail_frame.name = "bail_frame";
  bail.add(bail_frame);

  const bail_center_stripShape = new THREE.Shape();
  bail_center_stripShape.moveTo(-0.055, -0.42);
  bail_center_stripShape.quadraticCurveTo(0, -0.47, 0.055, -0.42);
  bail_center_stripShape.lineTo(0.18, 0.43);
  bail_center_stripShape.quadraticCurveTo(0.19, 0.49, 0.13, 0.50);
  bail_center_stripShape.lineTo(-0.13, 0.50);
  bail_center_stripShape.quadraticCurveTo(-0.19, 0.49, -0.18, 0.43);
  bail_center_stripShape.lineTo(-0.055, -0.42);
  bail_center_stripShape.closePath();

  const bail_center_stripGeom = makeExtrudedGeometry(
    bail_center_stripShape,
    0.055,
    0.012,
    0.009
  );
  const bail_center_strip = new THREE.Mesh(
    bail_center_stripGeom,
    darkSilverMat
  );
  bail_center_strip.name = "bail_center_strip";
  bail_center_strip.position.z = 0.025;
  bail.add(bail_center_strip);

  const bail_top_gemGeom = createFacetedGemGeometry(
    0.13,
    0.14,
    0.075,
    12
  );
  const bail_top_gem = new THREE.Mesh(bail_top_gemGeom, diamondMat);
  bail_top_gem.name = "bail_top_gem";
  bail_top_gem.position.set(0, 0.27, 0.105);
  bail.add(bail_top_gem);

  const bail_top_settingGeom = new THREE.TorusGeometry(
    0.135,
    0.013,
    8,
    24
  );
  const bail_top_setting = new THREE.Mesh(
    bail_top_settingGeom,
    polishedMat
  );
  bail_top_setting.name = "bail_top_setting";
  bail_top_setting.position.set(0, 0.27, 0.072);
  bail_top_setting.scale.y = 1.08;
  bail.add(bail_top_setting);

  const bail_small_gemGeom = createFacetedGemGeometry(
    0.048,
    0.052,
    0.05,
    10
  );
  const bail_small_gems = new THREE.InstancedMesh(
    bail_small_gemGeom,
    diamondMat,
    3
  );
  bail_small_gems.name = "bail_small_gems";
  const bail_small_gem_positions = [
    new THREE.Vector3(-0.052, 0.045, 0.105),
    new THREE.Vector3(0.052, 0.045, 0.105),
    new THREE.Vector3(0, -0.16, 0.105),
  ];
  for (let i = 0; i < bail_small_gem_positions.length; i++) {
    instance_dummy.position.copy(bail_small_gem_positions[i]);
    instance_dummy.rotation.set(0, 0, i * 0.45);
    instance_dummy.scale.setScalar(i === 2 ? 0.92 : 1);
    instance_dummy.updateMatrix();
    bail_small_gems.setMatrixAt(i, instance_dummy.matrix);
  }
  bail_small_gems.instanceMatrix.needsUpdate = true;
  bail.add(bail_small_gems);

  const bail_gem_separatorGeom = new THREE.SphereGeometry(0.022, 10, 7);
  const bail_gem_separators = new THREE.InstancedMesh(
    bail_gem_separatorGeom,
    polishedMat,
    2
  );
  bail_gem_separators.name = "bail_gem_separators";
  for (let i = 0; i < 2; i++) {
    instance_dummy.position.set(i === 0 ? -0.09 : 0.09, -0.055, 0.112);
    instance_dummy.rotation.set(0, 0, 0);
    instance_dummy.scale.setScalar(1);
    instance_dummy.updateMatrix();
    bail_gem_separators.setMatrixAt(i, instance_dummy.matrix);
  }
  bail_gem_separators.instanceMatrix.needsUpdate = true;
  bail.add(bail_gem_separators);

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