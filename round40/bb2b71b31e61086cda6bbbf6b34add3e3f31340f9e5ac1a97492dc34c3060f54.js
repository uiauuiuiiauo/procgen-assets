export default function generate(THREE) {
  const root = new THREE.Group();
  const setting = new THREE.Group();
  root.add(setting);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  const central_gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.62,
    ior: 1.5,
    transparent: true,
    vertexColors: true,
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
    const shape = new THREE.Shape();
    traceRoundedRect(shape, outerWidth, outerHeight, outerRadius, false);
    const hole = new THREE.Path();
    traceRoundedRect(hole, innerWidth, innerHeight, innerRadius, true);
    shape.holes.push(hole);
    return shape;
  }

  function makeCushionShape(width, height, corner) {
    const shape = new THREE.Shape();
    shape.moveTo(-width * 0.28, -height * 0.5);
    shape.lineTo(width * 0.28, -height * 0.5);
    shape.bezierCurveTo(
      width * 0.4, -height * 0.5,
      width * 0.5, -height * 0.38,
      width * 0.5, -height * 0.25
    );
    shape.lineTo(width * 0.5, height * 0.25);
    shape.bezierCurveTo(
      width * 0.5, height * 0.38,
      width * 0.4, height * 0.5,
      width * 0.28, height * 0.5
    );
    shape.lineTo(-width * 0.28, height * 0.5);
    shape.bezierCurveTo(
      -width * 0.4, height * 0.5,
      -width * 0.5, height * 0.38,
      -width * 0.5, height * 0.25
    );
    shape.lineTo(-width * 0.5, -height * 0.25);
    shape.bezierCurveTo(
      -width * 0.5, -height * 0.38,
      -width * 0.4, -height * 0.5,
      -width * 0.28, -height * 0.5
    );
    shape.closePath();
    return shape;
  }

  function makeFacetedGemGeometry(width, height, corner, depth, palette) {
    const outline = [
      new THREE.Vector2(-width * 0.28, -height * 0.5),
      new THREE.Vector2(width * 0.28, -height * 0.5),
      new THREE.Vector2(width * 0.42, -height * 0.44),
      new THREE.Vector2(width * 0.5, -height * 0.28),
      new THREE.Vector2(width * 0.5, height * 0.28),
      new THREE.Vector2(width * 0.42, height * 0.44),
      new THREE.Vector2(width * 0.28, height * 0.5),
      new THREE.Vector2(-width * 0.28, height * 0.5),
      new THREE.Vector2(-width * 0.42, height * 0.44),
      new THREE.Vector2(-width * 0.5, height * 0.28),
      new THREE.Vector2(-width * 0.5, -height * 0.28),
      new THREE.Vector2(-width * 0.42, -height * 0.44),
    ];

    const positions = [];
    const colors = [];
    const paletteColors = palette.map((value) => new THREE.Color(value));

    function addTriangle(a, b, c, colorIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = paletteColors[colorIndex % paletteColors.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const outer = outline.map(
      (point) => new THREE.Vector3(point.x, point.y, -depth * 0.12)
    );
    const inner = outline.map(
      (point) => new THREE.Vector3(point.x * 0.58, point.y * 0.58, depth * 0.58)
    );
    const table = outline.map(
      (point) => new THREE.Vector3(point.x * 0.34, point.y * 0.34, depth * 0.96)
    );
    const front_center = new THREE.Vector3(0, 0, depth);
    const back_center = new THREE.Vector3(0, 0, -depth * 0.62);

    for (let i = 0; i < outline.length; i++) {
      const next = (i + 1) % outline.length;
      addTriangle(outer[i], outer[next], inner[next], i + 1);
      addTriangle(outer[i], inner[next], inner[i], i + 3);
      addTriangle(inner[i], inner[next], table[next], i * 2 + 2);
      addTriangle(inner[i], table[next], table[i], i * 2 + 4);
      addTriangle(table[i], table[next], front_center, i * 3 + 1);
      addTriangle(outer[next], outer[i], back_center, i + 2);
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

  function makeDiamondGeometry(radius, depth, segments) {
    const positions = [];
    const colors = [];
    const coolPalette = [
      0xffffff,
      0xeaf3ff,
      0xcbd7e8,
      0xffffff,
      0xb8c6dc,
      0xf8fbff,
      0xd6e0ed,
      0xffffff,
    ];
    const paletteColors = coolPalette.map((value) => new THREE.Color(value));

    function addTriangle(a, b, c, colorIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = paletteColors[colorIndex % paletteColors.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const outer = [];
    const crown = [];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      outer.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        )
      );
      crown.push(
        new THREE.Vector3(
          Math.cos(angle) * radius * 0.46,
          Math.sin(angle) * radius * 0.46,
          depth * 0.72
        )
      );
    }

    const table_center = new THREE.Vector3(0, 0, depth);
    const pavilion = new THREE.Vector3(0, 0, -depth * 0.8);

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      addTriangle(outer[i], outer[next], crown[next], i + 1);
      addTriangle(outer[i], crown[next], crown[i], i + 4);
      addTriangle(crown[i], crown[next], table_center, i * 3);
      addTriangle(outer[next], outer[i], pavilion, i + 2);
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

  const instance_dummy = new THREE.Object3D();

  function setInstance(
    mesh,
    index,
    x,
    y,
    z,
    sx,
    sy,
    sz,
    rx,
    ry,
    rz
  ) {
    instance_dummy.position.set(x, y, z);
    instance_dummy.scale.set(sx, sy, sz);
    instance_dummy.rotation.set(rx, ry, rz);
    instance_dummy.updateMatrix();
    mesh.setMatrixAt(index, instance_dummy.matrix);
  }

  const outer_plateShape = makeRoundedRectShape(1.52, 1.52, 0.11);
  const outer_plateGeom = new THREE.ExtrudeGeometry(outer_plateShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 3,
    curveSegments: 8,
  });
  const outer_plate = new THREE.Mesh(outer_plateGeom, silverMat);
  outer_plate.position.z = -0.055;
  setting.add(outer_plate);

  const outer_borderShape = makeRoundedRectRingShape(
    1.47, 1.47, 0.095,
    1.33, 1.33, 0.07
  );
  const outer_borderGeom = new THREE.ExtrudeGeometry(outer_borderShape, {
    depth: 0.03,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.009,
    bevelSize: 0.009,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const outer_border = new THREE.Mesh(outer_borderGeom, polished_silverMat);
  outer_border.position.z = 0.025;
  setting.add(outer_border);

  const halo_bedShape = makeRoundedRectRingShape(
    1.36, 1.36, 0.08,
    0.94, 0.94, 0.065
  );
  const halo_bedGeom = new THREE.ExtrudeGeometry(halo_bedShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const halo_bed = new THREE.Mesh(halo_bedGeom, recessMat);
  halo_bed.position.z = 0.025;
  setting.add(halo_bed);

  const inner_bezelShape = makeRoundedRectRingShape(
    1.01, 1.01, 0.075,
    0.86, 0.86, 0.06
  );
  const inner_bezelGeom = new THREE.ExtrudeGeometry(inner_bezelShape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelSegments: 3,
    curveSegments: 8,
  });
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, polished_silverMat);
  inner_bezel.position.z = 0.05;
  setting.add(inner_bezel);

  const inner_bezel_lipShape = makeRoundedRectRingShape(
    0.91, 0.91, 0.065,
    0.82, 0.82, 0.055
  );
  const inner_bezel_lipGeom = new THREE.ExtrudeGeometry(inner_bezel_lipShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.007,
    bevelSize: 0.007,
    bevelSegments: 2,
    curveSegments: 8,
  });
  const inner_bezel_lip = new THREE.Mesh(
    inner_bezel_lipGeom,
    polished_silverMat
  );
  inner_bezel_lip.position.z = 0.095;
  setting.add(inner_bezel_lip);

  const central_seatShape = makeCushionShape(0.84, 0.84, 0.06);
  const central_seatGeom = new THREE.ExtrudeGeometry(central_seatShape, {
    depth: 0.03,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 10,
  });
  const central_seat = new THREE.Mesh(central_seatGeom, recessMat);
  central_seat.position.z = 0.07;
  setting.add(central_seat);

  const halo_diamondsGeom = makeDiamondGeometry(0.112, 0.072, 12);
  const halo_diamonds = new THREE.InstancedMesh(
    halo_diamondsGeom,
    diamondMat,
    20
  );
  const halo_positions = [];

  for (let i = 0; i < 5; i++) {
    const offset = -0.48 + i * 0.24;
    halo_positions.push(new THREE.Vector3(offset, 0.625, 0.105));
    halo_positions.push(new THREE.Vector3(offset, -0.625, 0.105));
    halo_positions.push(new THREE.Vector3(0.625, offset, 0.105));
    halo_positions.push(new THREE.Vector3(-0.625, offset, 0.105));
  }

  for (let i = 0; i < halo_positions.length; i++) {
    const point = halo_positions[i];
    const scale = i % 5 === 2 ? 1.04 : 1.0;
    setInstance(
      halo_diamonds,
      i,
      point.x,
      point.y,
      point.z,
      scale,
      scale,
      1,
      0,
      0,
      i * 0.17
    );
  }
  halo_diamonds.instanceMatrix.needsUpdate = true;
  setting.add(halo_diamonds);

  const halo_diamond_settingsGeom = new THREE.TorusGeometry(
    0.105,
    0.009,
    8,
    20
  );
  const halo_diamond_settings = new THREE.InstancedMesh(
    halo_diamond_settingsGeom,
    polished_silverMat,
    20
  );
  for (let i = 0; i < halo_positions.length; i++) {
    const point = halo_positions[i];
    const scale = i % 5 === 2 ? 1.04 : 1.0;
    setInstance(
      halo_diamond_settings,
      i,
      point.x,
      point.y,
      0.083,
      scale,
      scale,
      1,
      0,
      0,
      0
    );
  }
  halo_diamond_settings.instanceMatrix.needsUpdate = true;
  setting.add(halo_diamond_settings);

  const halo_prongsGeom = new THREE.SphereGeometry(0.023, 10, 7);
  const halo_prongs = new THREE.InstancedMesh(
    halo_prongsGeom,
    polished_silverMat,
    40
  );
  let halo_prong_index = 0;
  for (let i = 0; i < halo_positions.length; i++) {
    const point = halo_positions[i];
    for (let j = 0; j < 2; j++) {
      const angle = i * 0.73 + j * Math.PI;
      setInstance(
        halo_prongs,
        halo_prong_index++,
        point.x + Math.cos(angle) * 0.105,
        point.y + Math.sin(angle) * 0.105,
        0.158,
        1,
        1,
        1,
        0,
        0,
        0
      );
    }
  }
  halo_prongs.instanceMatrix.needsUpdate = true;
  setting.add(halo_prongs);

  const inner_diamondsGeom = makeDiamondGeometry(0.068, 0.05, 10);
  const inner_diamonds = new THREE.InstancedMesh(
    inner_diamondsGeom,
    diamondMat,
    8
  );
  const inner_positions = [];
  for (let i = 0; i < 4; i++) {
    const offset = -0.3 + i * 0.2;
    inner_positions.push(new THREE.Vector3(offset, 0.445, 0.13));
    inner_positions.push(new THREE.Vector3(offset, -0.445, 0.13));
    inner_positions.push(new THREE.Vector3(0.445, offset, 0.13));
    inner_positions.push(new THREE.Vector3(-0.445, offset, 0.13));
  }

  for (let i = 0; i < inner_positions.length; i++) {
    const point = inner_positions[i];
    setInstance(
      inner_diamonds,
      i,
      point.x,
      point.y,
      point.z,
      1,
      1,
      1,
      0,
      0,
      i * 0.21
    );
  }
  inner_diamonds.instanceMatrix.needsUpdate = true;
  setting.add(inner_diamonds);

  const inner_diamond_settingsGeom = new THREE.TorusGeometry(
    0.064,
    0.007,
    8,
    18
  );
  const inner_diamond_settings = new THREE.InstancedMesh(
    inner_diamond_settingsGeom,
    polished_silverMat,
    8
  );
  for (let i = 0; i < inner_positions.length; i++) {
    const point = inner_positions[i];
    setInstance(
      inner_diamond_settings,
      i,
      point.x,
      point.y,
      0.108,
      1,
      1,
      1,
      0,
      0,
      0
    );
  }
  inner_diamond_settings.instanceMatrix.needsUpdate = true;
  setting.add(inner_diamond_settings);

  const inner_prongsGeom = new THREE.SphereGeometry(0.015, 9, 6);
  const inner_prongs = new THREE.InstancedMesh(
    inner_prongsGeom,
    polished_silverMat,
    16
  );
  let inner_prong_index = 0;
  for (let i = 0; i < inner_positions.length; i++) {
    const point = inner_positions[i];
    for (let j = 0; j < 2; j++) {
      const angle = i * 0.61 + j * Math.PI;
      setInstance(
        inner_prongs,
        inner_prong_index++,
        point.x + Math.cos(angle) * 0.066,
        point.y + Math.sin(angle) * 0.066,
        0.164,
        1,
        1,
        1,
        0,
        0,
        0
      );
    }
  }
  inner_prongs.instanceMatrix.needsUpdate = true;
  setting.add(inner_prongs);

  const central_gemstoneGeom = makeFacetedGemGeometry(
    0.78,
    0.78,
    0.07,
    0.16,
    [
      0xc9c7ff,
      0xe1e1ff,
      0x9695d4,
      0xf1f1ff,
      0x7474b5,
      0xb6b5ec,
      0x555582,
      0xd9d9fa,
      0x8584c2,
      0xf7f7ff,
      0xaaa9df,
      0x626294,
    ]
  );
  const central_gemstone = new THREE.Mesh(
    central_gemstoneGeom,
    central_gemstoneMat
  );
  central_gemstone.position.z = 0.135;
  setting.add(central_gemstone);

  const central_prong_stemsGeom = new THREE.CylinderGeometry(
    0.024,
    0.032,
    0.105,
    12
  );
  const central_prong_stems = new THREE.InstancedMesh(
    central_prong_stemsGeom,
    polished_silverMat,
    4
  );
  const central_prong_positions = [
    new THREE.Vector3(0, 0.385, 0.225),
    new THREE.Vector3(0.385, 0, 0.225),
    new THREE.Vector3(0, -0.385, 0.225),
    new THREE.Vector3(-0.385, 0, 0.225),
  ];
  for (let i = 0; i < central_prong_positions.length; i++) {
    const point = central_prong_positions[i];
    setInstance(
      central_prong_stems,
      i,
      point.x,
      point.y,
      point.z,
      1,
      1,
      1,
      Math.PI / 2,
      0,
      0
    );
  }
  central_prong_stems.instanceMatrix.needsUpdate = true;
  setting.add(central_prong_stems);

  const central_prongsGeom = new THREE.SphereGeometry(0.058, 16, 10);
  const central_prongs = new THREE.InstancedMesh(
    central_prongsGeom,
    polished_silverMat,
    4
  );
  for (let i = 0; i < central_prong_positions.length; i++) {
    const point = central_prong_positions[i];
    setInstance(
      central_prongs,
      i,
      point.x,
      point.y,
      0.278,
      1,
      1,
      0.76,
      0,
      0,
      0
    );
  }
  central_prongs.instanceMatrix.needsUpdate = true;
  setting.add(central_prongs);

  setting.rotation.z = Math.PI / 4;

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