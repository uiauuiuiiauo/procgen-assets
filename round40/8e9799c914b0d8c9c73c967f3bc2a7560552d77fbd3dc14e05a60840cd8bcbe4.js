export default function generate(THREE) {
  const root = new THREE.Group();

  const padW = 3.6;
  const padD = 2.7;
  const cornerR = 0.19;

  function makeRoundedRectShape(width, depth, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const z0 = -depth / 2;
    const z1 = depth / 2;
    const shape = new THREE.Shape();

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

    return shape;
  }

  function makeRoundedExtrude(width, depth, radius, depthValue, bevelSize, bevelThickness) {
    const shape = makeRoundedRectShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depthValue,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness
    });
    geometry.rotateX(-Math.PI / 2);
    geometry.computeVertexNormals();
    return geometry;
  }

  const bottom_backingMat = new THREE.MeshStandardMaterial({
    color: 0x111214,
    metalness: 0.0,
    roughness: 0.8
  });
  const bottom_backingGeom = makeRoundedExtrude(
    padW - 0.04,
    padD - 0.04,
    cornerR,
    0.055,
    0.018,
    0.018
  );
  const bottom_backing = new THREE.Mesh(bottom_backingGeom, bottom_backingMat);
  bottom_backing.position.y = -0.045;
  root.add(bottom_backing);

  const lower_edge_bandMat = new THREE.MeshStandardMaterial({
    color: 0x202124,
    metalness: 0.0,
    roughness: 0.8
  });
  const lower_edge_bandGeom = makeRoundedExtrude(
    padW - 0.01,
    padD - 0.01,
    cornerR + 0.005,
    0.045,
    0.014,
    0.012
  );
  const lower_edge_band = new THREE.Mesh(lower_edge_bandGeom, lower_edge_bandMat);
  lower_edge_band.position.y = -0.005;
  root.add(lower_edge_band);

  const side_wallMat = new THREE.MeshStandardMaterial({
    color: 0x292a2d,
    metalness: 0.0,
    roughness: 0.8
  });
  const side_wallGeom = makeRoundedExtrude(
    padW,
    padD,
    cornerR + 0.01,
    0.07,
    0.022,
    0.018
  );
  const side_wall = new THREE.Mesh(side_wallGeom, side_wallMat);
  side_wall.position.y = 0.025;
  root.add(side_wall);

  const top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x242527,
    metalness: 0.0,
    roughness: 0.95
  });
  const top_surfaceGeom = makeRoundedExtrude(
    padW - 0.055,
    padD - 0.055,
    cornerR - 0.012,
    0.026,
    0.014,
    0.012
  );
  const top_surface = new THREE.Mesh(top_surfaceGeom, top_surfaceMat);
  top_surface.position.y = 0.095;
  root.add(top_surface);

  function makeRoundedPerimeterPoints(width, depth, radius, y) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5]
    ];

    for (let cornerIndex = 0; cornerIndex < corners.length; cornerIndex++) {
      const corner = corners[cornerIndex];
      for (let step = 0; step <= 5; step++) {
        const angle = corner[2] + step / 5 * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return points;
  }

  const perimeter_seamMat = new THREE.MeshStandardMaterial({
    color: 0x0d0e0f,
    metalness: 0.0,
    roughness: 0.8
  });
  const perimeter_seamPoints = makeRoundedPerimeterPoints(
    padW - 0.075,
    padD - 0.075,
    cornerR - 0.018,
    0.137
  );
  const perimeter_seamCurve = new THREE.CatmullRomCurve3(
    perimeter_seamPoints,
    true,
    "centripetal"
  );
  const perimeter_seamGeom = new THREE.TubeGeometry(
    perimeter_seamCurve,
    112,
    0.006,
    6,
    true
  );
  const perimeter_seam = new THREE.Mesh(perimeter_seamGeom, perimeter_seamMat);
  root.add(perimeter_seam);

  const surface_textureMat = new THREE.MeshStandardMaterial({
    color: 0x1b1c1e,
    metalness: 0.0,
    roughness: 0.95
  });
  const surface_textureGeom = new THREE.SphereGeometry(0.008, 6, 4);
  const textureCols = 29;
  const textureRows = 21;
  const surface_texture = new THREE.InstancedMesh(
    surface_textureGeom,
    surface_textureMat,
    textureCols * textureRows
  );
  const texture_dummy = new THREE.Object3D();
  let textureIndex = 0;

  for (let row = 0; row < textureRows; row++) {
    for (let col = 0; col < textureCols; col++) {
      const x = -1.62 + col / (textureCols - 1) * 3.24
        + Math.sin((col + 1) * (row + 2)) * 0.006;
      const z = -1.17 + row / (textureRows - 1) * 2.34
        + Math.cos((col + 2) * (row + 1)) * 0.005;
      const size = 0.72 + ((col * 7 + row * 11) % 5) * 0.055;

      texture_dummy.position.set(x, 0.137, z);
      texture_dummy.rotation.set(0, ((col * 3 + row * 5) % 8) * Math.PI / 8, 0);
      texture_dummy.scale.set(size, 0.22, size * 0.82);
      texture_dummy.updateMatrix();
      surface_texture.setMatrixAt(textureIndex, texture_dummy.matrix);
      textureIndex++;
    }
  }
  surface_texture.instanceMatrix.needsUpdate = true;
  root.add(surface_texture);

  const logoMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const logo_strokeGeom = new THREE.BoxGeometry(1, 0.006, 1);
  const logo = new THREE.Group();
  logo.position.set(-1.34, 0.143, -1.015);
  logo.rotation.y = -0.035;
  root.add(logo);

  const glyphs = [
    ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
    ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
    ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
    ["01110", "10001", "10000", "10111", "10001", "10001", "01110"],
    ["10001", "11001", "11001", "10101", "10011", "10011", "10001"],
    ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    ["10001", "11001", "11001", "10101", "10011", "10011", "10001"]
  ];

  let logoCount = 0;
  for (let glyphIndex = 0; glyphIndex < glyphs.length; glyphIndex++) {
    for (let row = 0; row < glyphs[glyphIndex].length; row++) {
      for (let col = 0; col < glyphs[glyphIndex][row].length; col++) {
        if (glyphs[glyphIndex][row][col] === "1") logoCount++;
      }
    }
  }

  const logo_pixelW = 0.012;
  const logo_pixelD = 0.017;
  const logo_pitchX = 0.014;
  const logo_pitchZ = 0.020;
  const logo_advance = 0.083;
  const logo_strokes = new THREE.InstancedMesh(
    logo_strokeGeom,
    logoMat,
    logoCount
  );
  const logo_dummy = new THREE.Object3D();
  let logoIndex = 0;

  for (let glyphIndex = 0; glyphIndex < glyphs.length; glyphIndex++) {
    for (let row = 0; row < glyphs[glyphIndex].length; row++) {
      for (let col = 0; col < glyphs[glyphIndex][row].length; col++) {
        if (glyphs[glyphIndex][row][col] !== "1") continue;

        logo_dummy.position.set(
          glyphIndex * logo_advance + col * logo_pitchX,
          0,
          row * logo_pitchZ
        );
        logo_dummy.rotation.set(0, 0, 0);
        logo_dummy.scale.set(logo_pixelW, 1, logo_pixelD);
        logo_dummy.updateMatrix();
        logo_strokes.setMatrixAt(logoIndex, logo_dummy.matrix);
        logoIndex++;
      }
    }
  }
  logo_strokes.instanceMatrix.needsUpdate = true;
  logo.add(logo_strokes);

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