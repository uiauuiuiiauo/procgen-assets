export default function generate(THREE) {
  const root = new THREE.Group();

  const padW = 3.20;
  const padD = 2.20;
  const cornerR = 0.18;
  const surfaceW = 3.08;
  const surfaceD = 2.08;
  const surfaceR = 0.13;
  const surfaceY = 0.069;
  const logoY = 0.075;

  function makeRoundedRectShape(width, depth, radius) {
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
    return shape;
  }

  function makeRoundedSlabGeometry(width, depth, radius, height, bevelSize, bevelThickness) {
    const shape = makeRoundedRectShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness
    });
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function makeRoundedRectPath(width, depth, radius, y) {
    const points = [];
    const corners = [
      [width / 2 - radius, depth / 2 - radius, 0],
      [-width / 2 + radius, depth / 2 - radius, Math.PI / 2],
      [-width / 2 + radius, -depth / 2 + radius, Math.PI],
      [width / 2 - radius, -depth / 2 + radius, Math.PI * 1.5]
    ];
    const cornerSteps = 8;

    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i < cornerSteps; i++) {
        const angle = corner[2] + (i / cornerSteps) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * radius,
          y,
          corner[1] + Math.sin(angle) * radius
        ));
      }
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const lower_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });
  const lower_edgeGeom = makeRoundedSlabGeometry(
    padW - 0.04,
    padD - 0.04,
    cornerR - 0.01,
    0.055,
    0.018,
    0.012
  );
  const lower_edge = new THREE.Mesh(lower_edgeGeom, lower_edgeMat);
  lower_edge.position.y = -0.070;
  root.add(lower_edge);

  const side_bindingMat = new THREE.MeshStandardMaterial({
    color: 0x202225,
    metalness: 0.0,
    roughness: 0.8
  });
  const side_bindingGeom = makeRoundedSlabGeometry(
    padW,
    padD,
    cornerR,
    0.085,
    0.022,
    0.015
  );
  const side_binding = new THREE.Mesh(side_bindingGeom, side_bindingMat);
  side_binding.position.y = -0.045;
  root.add(side_binding);

  const top_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x181a1c,
    metalness: 0.0,
    roughness: 0.95
  });
  const top_surfaceGeom = makeRoundedSlabGeometry(
    surfaceW,
    surfaceD,
    surfaceR,
    0.018,
    0.008,
    0.005
  );
  const top_surface = new THREE.Mesh(top_surfaceGeom, top_surfaceMat);
  top_surface.position.y = 0.045;
  root.add(top_surface);

  const perimeter_pipingMat = new THREE.MeshStandardMaterial({
    color: 0x292b2e,
    metalness: 0.0,
    roughness: 0.95
  });
  const perimeter_pipingPath = makeRoundedRectPath(
    surfaceW,
    surfaceD,
    surfaceR,
    0.068
  );
  const perimeter_pipingGeom = new THREE.TubeGeometry(
    perimeter_pipingPath,
    112,
    0.012,
    8,
    true
  );
  const perimeter_piping = new THREE.Mesh(
    perimeter_pipingGeom,
    perimeter_pipingMat
  );
  root.add(perimeter_piping);

  const textureCols = 34;
  const textureRows = 22;
  let textureCount = 0;

  for (let ix = 0; ix < textureCols; ix++) {
    for (let iz = 0; iz < textureRows; iz++) {
      const x = -surfaceW / 2 + 0.12 +
        (surfaceW - 0.24) * ix / (textureCols - 1);
      const z = -surfaceD / 2 + 0.12 +
        (surfaceD - 0.24) * iz / (textureRows - 1);
      const cornerX = Math.abs(x) - (surfaceW / 2 - surfaceR);
      const cornerZ = Math.abs(z) - (surfaceD / 2 - surfaceR);
      const dx = Math.max(cornerX, 0);
      const dz = Math.max(cornerZ, 0);

      if (dx * dx + dz * dz <= surfaceR * surfaceR) {
        textureCount++;
      }
    }
  }

  const surface_textureMat = new THREE.MeshStandardMaterial({
    color: 0x1c1e20,
    metalness: 0.0,
    roughness: 0.95
  });
  const surface_textureGeom = new THREE.CylinderGeometry(
    0.0045,
    0.0045,
    0.0018,
    6
  );
  const surface_texture = new THREE.InstancedMesh(
    surface_textureGeom,
    surface_textureMat,
    textureCount
  );
  const texture_dummy = new THREE.Object3D();
  let textureIndex = 0;

  for (let iz = 0; iz < textureRows; iz++) {
    for (let ix = 0; ix < textureCols; ix++) {
      const x = -surfaceW / 2 + 0.12 +
        (surfaceW - 0.24) * ix / (textureCols - 1);
      const z = -surfaceD / 2 + 0.12 +
        (surfaceD - 0.24) * iz / (textureRows - 1);
      const cornerX = Math.abs(x) - (surfaceW / 2 - surfaceR);
      const cornerZ = Math.abs(z) - (surfaceD / 2 - surfaceR);
      const dx = Math.max(cornerX, 0);
      const dz = Math.max(cornerZ, 0);

      if (dx * dx + dz * dz <= surfaceR * surfaceR) {
        const scale = 0.82 + ((ix * 7 + iz * 3) % 5) * 0.045;
        texture_dummy.position.set(x, surfaceY + 0.001, z);
        texture_dummy.scale.set(scale, 1, scale);
        texture_dummy.updateMatrix();
        surface_texture.setMatrixAt(textureIndex++, texture_dummy.matrix);
      }
    }
  }
  surface_texture.instanceMatrix.needsUpdate = true;
  root.add(surface_texture);

  const logoGlyphs = {
    G: [
      "01110",
      "10001",
      "10000",
      "10111",
      "10001",
      "10001",
      "01110"
    ],
    E: [
      "11111",
      "10000",
      "10000",
      "11110",
      "10000",
      "10000",
      "11111"
    ],
    N: [
      "10001",
      "11001",
      "11001",
      "10101",
      "10011",
      "10011",
      "10001"
    ],
    R: [
      "11110",
      "10001",
      "10001",
      "11110",
      "10100",
      "10010",
      "10001"
    ],
    A: [
      "01110",
      "10001",
      "10001",
      "11111",
      "10001",
      "10001",
      "10001"
    ],
    I: [
      "11111",
      "00100",
      "00100",
      "00100",
      "00100",
      "00100",
      "11111"
    ]
  };

  const logoWord = "GENERAGI";
  const logoPixel = 0.015;
  const logoGap = 0.012;
  const logoAdvance = logoPixel * 5 + logoGap;
  const logoPixels = [];
  const logoStartX = -1.36;
  const logoCenterZ = -0.78;

  for (let letter = 0; letter < logoWord.length; letter++) {
    const glyph = logoGlyphs[logoWord[letter]];
    for (let row = 0; row < glyph.length; row++) {
      for (let col = 0; col < glyph[row].length; col++) {
        if (glyph[row][col] === "1") {
          logoPixels.push(new THREE.Vector3(
            logoStartX + letter * logoAdvance + col * logoPixel,
            logoY,
            logoCenterZ + (row - 3) * logoPixel
          ));
        }
      }
    }
  }

  const logo_markMat = new THREE.MeshStandardMaterial({
    color: 0xd7d7d7,
    metalness: 0.0,
    roughness: 0.7
  });
  const logo_markGeom = new THREE.BoxGeometry(
    logoPixel * 0.82,
    0.004,
    logoPixel * 0.82
  );
  const logo_mark = new THREE.InstancedMesh(
    logo_markGeom,
    logo_markMat,
    logoPixels.length
  );
  const logo_dummy = new THREE.Object3D();

  for (let i = 0; i < logoPixels.length; i++) {
    logo_dummy.position.copy(logoPixels[i]);
    logo_dummy.updateMatrix();
    logo_mark.setMatrixAt(i, logo_dummy.matrix);
  }
  logo_mark.instanceMatrix.needsUpdate = true;
  root.add(logo_mark);

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