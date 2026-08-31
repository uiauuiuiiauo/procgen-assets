export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "book";

  const bookW = 1.16;
  const bookH = 1.72;
  const bookD = 0.20;
  const coverT = 0.032;
  const pageW = 1.09;
  const pageH = 1.62;
  const pageD = 0.136;

  const coverMat = new THREE.MeshStandardMaterial({
    color: 0x080a09,
    metalness: 0.0,
    roughness: 0.7,
  });
  const coverFaceMat = new THREE.MeshStandardMaterial({
    color: 0x101312,
    metalness: 0.0,
    roughness: 0.7,
  });
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0x252927,
    metalness: 0.0,
    roughness: 0.9,
  });
  const pageLineMat = new THREE.MeshStandardMaterial({
    color: 0x39403d,
    metalness: 0.0,
    roughness: 0.9,
  });
  const titleMat = new THREE.MeshStandardMaterial({
    color: 0x70ff85,
    metalness: 0.0,
    roughness: 0.7,
  });
  const publisherMat = new THREE.MeshStandardMaterial({
    color: 0xd8dddd,
    metalness: 0.0,
    roughness: 0.7,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = width * 0.5;
    const y = height * 0.5;
    shape.moveTo(-x + radius, -y);
    shape.lineTo(x - radius, -y);
    shape.quadraticCurveTo(x, -y, x, -y + radius);
    shape.lineTo(x, y - radius);
    shape.quadraticCurveTo(x, y, x - radius, y);
    shape.lineTo(-x + radius, y);
    shape.quadraticCurveTo(-x, y, -x, y - radius);
    shape.lineTo(-x, -y + radius);
    shape.quadraticCurveTo(-x, -y, -x + radius, -y);
    return shape;
  }

  const page_blockGeom = new THREE.BoxGeometry(pageW, pageH, pageD);
  const page_block = new THREE.Mesh(page_blockGeom, pageMat);
  page_block.name = "page_block";
  page_block.position.set(0.025, bookH * 0.5, 0);
  root.add(page_block);

  const coverShape = roundedRectShape(bookW, bookH, 0.018);
  const coverGeom = new THREE.ExtrudeGeometry(coverShape, {
    depth: coverT,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
  });

  const front_cover = new THREE.Mesh(coverGeom, coverMat);
  front_cover.name = "front_cover";
  front_cover.position.set(0, bookH * 0.5, bookD * 0.5 - coverT);
  root.add(front_cover);

  const back_cover = new THREE.Mesh(coverGeom, coverMat);
  back_cover.name = "back_cover";
  back_cover.position.set(0, bookH * 0.5, -bookD * 0.5);
  root.add(back_cover);

  const front_cover_faceGeom = new THREE.ShapeGeometry(
    roundedRectShape(bookW - 0.014, bookH - 0.014, 0.014),
    8
  );
  const front_cover_face = new THREE.Mesh(front_cover_faceGeom, coverFaceMat);
  front_cover_face.name = "front_cover_face";
  front_cover_face.position.set(0, bookH * 0.5, bookD * 0.5 + 0.005);
  root.add(front_cover_face);

  const spineGeom = new THREE.CylinderGeometry(
    bookD * 0.5,
    bookD * 0.5,
    bookH,
    28
  );
  const spine = new THREE.Mesh(spineGeom, coverMat);
  spine.name = "spine";
  spine.position.set(-bookW * 0.5 + 0.018, bookH * 0.5, 0);
  spine.scale.set(0.45, 1, 1);
  root.add(spine);

  const hingeGeom = new THREE.CylinderGeometry(0.006, 0.006, bookH - 0.05, 10);
  const front_hinge = new THREE.Mesh(hingeGeom, coverMat);
  front_hinge.name = "front_hinge";
  front_hinge.position.set(
    -bookW * 0.5 + 0.075,
    bookH * 0.5,
    bookD * 0.5 + 0.005
  );
  root.add(front_hinge);

  const back_hinge = new THREE.Mesh(hingeGeom, coverMat);
  back_hinge.name = "back_hinge";
  back_hinge.position.set(
    -bookW * 0.5 + 0.075,
    bookH * 0.5,
    -bookD * 0.5 - 0.002
  );
  root.add(back_hinge);

  const page_edge_lineGeom = new THREE.BoxGeometry(1, 1, 1);
  const page_edge_lines = new THREE.InstancedMesh(
    page_edge_lineGeom,
    pageLineMat,
    9
  );
  page_edge_lines.name = "page_edge_lines";
  const pageLineMatrix = new THREE.Matrix4();
  const pageLineQuat = new THREE.Quaternion();
  for (let i = 0; i < 9; i++) {
    const y = 0.13 + i * 0.17;
    pageLineMatrix.compose(
      new THREE.Vector3(0.025 + pageW * 0.5 + 0.001, y, 0),
      pageLineQuat,
      new THREE.Vector3(0.003, 0.002, pageD * 0.94)
    );
    page_edge_lines.setMatrixAt(i, pageLineMatrix);
  }
  page_edge_lines.instanceMatrix.needsUpdate = true;
  root.add(page_edge_lines);

  const top_page_lineGeom = new THREE.BoxGeometry(1, 1, 1);
  const top_page_lines = new THREE.InstancedMesh(
    top_page_lineGeom,
    pageLineMat,
    5
  );
  top_page_lines.name = "top_page_lines";
  const topLineMatrix = new THREE.Matrix4();
  for (let i = 0; i < 5; i++) {
    topLineMatrix.compose(
      new THREE.Vector3(
        0.025,
        bookH - 0.006,
        -pageD * 0.4 + i * pageD * 0.2
      ),
      pageLineQuat,
      new THREE.Vector3(pageW * 0.94, 0.002, 0.002)
    );
    top_page_lines.setMatrixAt(i, topLineMatrix);
  }
  top_page_lines.instanceMatrix.needsUpdate = true;
  root.add(top_page_lines);

  const glyphs = {
    " ": { w: 0.35, s: [] },
    A: {
      w: 0.62,
      s: [
        [0.04, 0.02, 0.31, 0.98],
        [0.31, 0.98, 0.58, 0.02],
        [0.13, 0.43, 0.49, 0.43],
      ],
    },
    C: {
      w: 0.62,
      s: [
        [0.56, 0.9, 0.43, 0.98],
        [0.43, 0.98, 0.14, 0.98],
        [0.14, 0.98, 0.04, 0.84],
        [0.04, 0.84, 0.04, 0.16],
        [0.04, 0.16, 0.14, 0.02],
        [0.14, 0.02, 0.43, 0.02],
        [0.43, 0.02, 0.56, 0.1],
      ],
    },
    D: {
      w: 0.64,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.06, 0.98, 0.39, 0.98],
        [0.39, 0.98, 0.57, 0.8],
        [0.57, 0.8, 0.57, 0.2],
        [0.57, 0.2, 0.39, 0.02],
        [0.39, 0.02, 0.06, 0.02],
      ],
    },
    E: {
      w: 0.58,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.06, 0.98, 0.54, 0.98],
        [0.06, 0.5, 0.45, 0.5],
        [0.06, 0.02, 0.54, 0.02],
      ],
    },
    F: {
      w: 0.57,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.06, 0.98, 0.53, 0.98],
        [0.06, 0.5, 0.44, 0.5],
      ],
    },
    G: {
      w: 0.64,
      s: [
        [0.56, 0.88, 0.43, 0.98],
        [0.43, 0.98, 0.14, 0.98],
        [0.14, 0.98, 0.04, 0.84],
        [0.04, 0.84, 0.04, 0.16],
        [0.04, 0.16, 0.14, 0.02],
        [0.14, 0.02, 0.45, 0.02],
        [0.45, 0.02, 0.58, 0.15],
        [0.58, 0.15, 0.58, 0.48],
        [0.58, 0.48, 0.35, 0.48],
      ],
    },
    H: {
      w: 0.64,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.58, 0.02, 0.58, 0.98],
        [0.06, 0.5, 0.58, 0.5],
      ],
    },
    I: {
      w: 0.34,
      s: [[0.17, 0.02, 0.17, 0.98]],
    },
    L: {
      w: 0.56,
      s: [
        [0.06, 0.98, 0.06, 0.02],
        [0.06, 0.02, 0.52, 0.02],
      ],
    },
    M: {
      w: 0.75,
      s: [
        [0.05, 0.02, 0.05, 0.98],
        [0.05, 0.98, 0.37, 0.5],
        [0.37, 0.5, 0.7, 0.98],
        [0.7, 0.98, 0.7, 0.02],
      ],
    },
    N: {
      w: 0.66,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.06, 0.98, 0.59, 0.02],
        [0.59, 0.02, 0.59, 0.98],
      ],
    },
    O: {
      w: 0.64,
      s: [
        [0.14, 0.98, 0.46, 0.98],
        [0.46, 0.98, 0.58, 0.84],
        [0.58, 0.84, 0.58, 0.16],
        [0.58, 0.16, 0.46, 0.02],
        [0.46, 0.02, 0.14, 0.02],
        [0.14, 0.02, 0.04, 0.16],
        [0.04, 0.16, 0.04, 0.84],
        [0.04, 0.84, 0.14, 0.98],
      ],
    },
    P: {
      w: 0.61,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.06, 0.98, 0.42, 0.98],
        [0.42, 0.98, 0.56, 0.84],
        [0.56, 0.84, 0.56, 0.6],
        [0.56, 0.6, 0.42, 0.48],
        [0.42, 0.48, 0.06, 0.48],
      ],
    },
    Q: {
      w: 0.66,
      s: [
        [0.14, 0.98, 0.46, 0.98],
        [0.46, 0.98, 0.58, 0.84],
        [0.58, 0.84, 0.58, 0.16],
        [0.58, 0.16, 0.46, 0.02],
        [0.46, 0.02, 0.14, 0.02],
        [0.14, 0.02, 0.04, 0.16],
        [0.04, 0.16, 0.04, 0.84],
        [0.04, 0.84, 0.14, 0.98],
        [0.38, 0.25, 0.64, -0.06],
      ],
    },
    R: {
      w: 0.64,
      s: [
        [0.06, 0.02, 0.06, 0.98],
        [0.06, 0.98, 0.42, 0.98],
        [0.42, 0.98, 0.56, 0.84],
        [0.56, 0.84, 0.56, 0.6],
        [0.56, 0.6, 0.42, 0.48],
        [0.42, 0.48, 0.06, 0.48],
        [0.35, 0.48, 0.6, 0.02],
      ],
    },
    S: {
      w: 0.6,
      s: [
        [0.54, 0.9, 0.43, 0.98],
        [0.43, 0.98, 0.14, 0.98],
        [0.14, 0.98, 0.04, 0.84],
        [0.04, 0.84, 0.08, 0.58],
        [0.08, 0.58, 0.48, 0.43],
        [0.48, 0.43, 0.57, 0.16],
        [0.57, 0.16, 0.46, 0.02],
        [0.46, 0.02, 0.13, 0.02],
        [0.13, 0.02, 0.03, 0.1],
      ],
    },
    T: {
      w: 0.62,
      s: [[0.03, 0.98, 0.59, 0.98], [0.31, 0.98, 0.31, 0.02]],
    },
    U: {
      w: 0.64,
      s: [
        [0.05, 0.98, 0.05, 0.18],
        [0.05, 0.18, 0.16, 0.02],
        [0.16, 0.02, 0.47, 0.02],
        [0.47, 0.02, 0.58, 0.18],
        [0.58, 0.18, 0.58, 0.98],
      ],
    },
    Y: {
      w: 0.64,
      s: [
        [0.04, 0.98, 0.31, 0.52],
        [0.59, 0.98, 0.31, 0.52],
        [0.31, 0.52, 0.31, 0.02],
      ],
    },
    a: {
      w: 0.55,
      s: [
        [0.12, 0.58, 0.43, 0.58],
        [0.43, 0.58, 0.51, 0.48],
        [0.51, 0.48, 0.51, 0.02],
        [0.51, 0.25, 0.42, 0.02],
        [0.42, 0.02, 0.13, 0.02],
        [0.13, 0.02, 0.05, 0.16],
        [0.05, 0.16, 0.08, 0.45],
        [0.08, 0.45, 0.12, 0.58],
      ],
    },
    d: {
      w: 0.57,
      s: [
        [0.13, 0.58, 0.43, 0.58],
        [0.43, 0.58, 0.51, 0.47],
        [0.51, 0.47, 0.51, -0.15],
        [0.51, 0.24, 0.42, 0.02],
        [0.42, 0.02, 0.13, 0.02],
        [0.13, 0.02, 0.05, 0.16],
        [0.05, 0.16, 0.08, 0.45],
        [0.08, 0.45, 0.13, 0.58],
      ],
    },
    e: {
      w: 0.55,
      s: [
        [0.08, 0.3, 0.5, 0.3],
        [0.5, 0.3, 0.48, 0.48],
        [0.48, 0.48, 0.39, 0.58],
        [0.39, 0.58, 0.14, 0.58],
        [0.14, 0.58, 0.05, 0.45],
        [0.05, 0.45, 0.05, 0.16],
        [0.05, 0.16, 0.14, 0.02],
        [0.14, 0.02, 0.42, 0.02],
        [0.42, 0.02, 0.5, 0.1],
      ],
    },
    g: {
      w: 0.58,
      s: [
        [0.13, 0.58, 0.43, 0.58],
        [0.43, 0.58, 0.51, 0.47],
        [0.51, 0.47, 0.51, -0.28],
        [0.51, -0.28, 0.42, -0.39],
        [0.42, -0.39, 0.14, -0.39],
        [0.14, -0.39, 0.05, -0.29],
        [0.51, 0.2, 0.1, 0.2],
        [0.1, 0.2, 0.05, 0.15],
        [0.1, 0.2, 0.13, 0.02],
        [0.13, 0.02, 0.42, 0.02],
        [0.42, 0.02, 0.51, 0.12],
      ],
    },
    h: {
      w: 0.57,
      s: [
        [0.05, 0.02, 0.05, 0.98],
        [0.05, 0.36, 0.16, 0.56],
        [0.16, 0.56, 0.39, 0.58],
        [0.39, 0.58, 0.51, 0.46],
        [0.51, 0.46, 0.51, 0.02],
      ],
    },
    i: {
      w: 0.28,
      s: [
        [0.14, 0.02, 0.14, 0.58],
        [0.14, 0.84, 0.14, 0.9],
      ],
    },
    l: {
      w: 0.29,
      s: [[0.14, 0.02, 0.14, 0.98]],
    },
    m: {
      w: 0.72,
      s: [
        [0.05, 0.02, 0.05, 0.58],
        [0.05, 0.42, 0.16, 0.58],
        [0.16, 0.58, 0.31, 0.54],
        [0.31, 0.54, 0.36, 0.4],
        [0.36, 0.4, 0.36, 0.02],
        [0.36, 0.42, 0.48, 0.58],
        [0.48, 0.58, 0.64, 0.53],
        [0.64, 0.53, 0.67, 0.39],
        [0.67, 0.39, 0.67, 0.02],
      ],
    },
    n: {
      w: 0.57,
      s: [
        [0.05, 0.02, 0.05, 0.58],
        [0.05, 0.4, 0.17, 0.57],
        [0.17, 0.57, 0.4, 0.57],
        [0.4, 0.57, 0.51, 0.45],
        [0.51, 0.45, 0.51, 0.02],
      ],
    },
    p: {
      w: 0.57,
      s: [
        [0.05, -0.38, 0.05, 0.58],
        [0.05, 0.42, 0.16, 0.58],
        [0.16, 0.58, 0.4, 0.58],
        [0.4, 0.58, 0.51, 0.46],
        [0.51, 0.46, 0.51, 0.2],
        [0.51, 0.2, 0.4, 0.08],
        [0.4, 0.08, 0.05, 0.08],
      ],
    },
    q: {
      w: 0.58,
      s: [
        [0.13, 0.58, 0.43, 0.58],
        [0.43, 0.58, 0.51, 0.47],
        [0.51, 0.47, 0.51, -0.38],
        [0.51, 0.22, 0.42, 0.02],
        [0.42, 0.02, 0.13, 0.02],
        [0.13, 0.02, 0.05, 0.16],
        [0.05, 0.16, 0.08, 0.45],
        [0.08, 0.45, 0.13, 0.58],
      ],
    },
    r: {
      w: 0.43,
      s: [
        [0.05, 0.02, 0.05, 0.58],
        [0.05, 0.4, 0.16, 0.57],
        [0.16, 0.57, 0.36, 0.55],
      ],
    },
    s: {
      w: 0.5,
      s: [
        [0.46, 0.52, 0.37, 0.58],
        [0.37, 0.58, 0.14, 0.58],
        [0.14, 0.58, 0.05, 0.47],
        [0.05, 0.47, 0.11, 0.3],
        [0.11, 0.3, 0.43, 0.22],
        [0.43, 0.22, 0.48, 0.1],
        [0.48, 0.1, 0.39, 0.02],
        [0.39, 0.02, 0.12, 0.02],
        [0.12, 0.02, 0.03, 0.09],
      ],
    },
    t: {
      w: 0.42,
      s: [
        [0.22, 0.02, 0.22, 0.9],
        [0.02, 0.58, 0.42, 0.58],
        [0.22, 0.02, 0.36, 0.04],
      ],
    },
    u: {
      w: 0.57,
      s: [
        [0.05, 0.58, 0.05, 0.17],
        [0.05, 0.17, 0.15, 0.02],
        [0.15, 0.02, 0.42, 0.02],
        [0.42, 0.02, 0.51, 0.16],
        [0.51, 0.16, 0.51, 0.58],
      ],
    },
    y: {
      w: 0.58,
      s: [
        [0.04, 0.58, 0.27, 0.13],
        [0.52, 0.58, 0.27, 0.13],
        [0.27, 0.13, 0.18, -0.36],
        [0.18, -0.36, 0.08, -0.39],
      ],
    },
  };

  function createStrokeText(
    text,
    targetWidth,
    height,
    thickness,
    depth,
    material,
    centerX,
    baselineY,
    z
  ) {
    const gap = 0.13;
    let totalUnits = 0;
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      const glyph = glyphs[text[i]] || glyphs[" "];
      totalUnits += glyph.w;
      if (i < text.length - 1) totalUnits += gap;
      count += glyph.s.length;
    }

    const scaleX = targetWidth / totalUnits;
    const strokeRadius = thickness * 0.5;
    const geometry = new THREE.CylinderGeometry(
      strokeRadius,
      strokeRadius,
      1,
      8,
      1,
      false
    );
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    const matrix = new THREE.Matrix4();
    const yAxis = new THREE.Vector3(0, 1, 0);
    let cursor = centerX - targetWidth * 0.5;
    let instanceIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const glyph = glyphs[text[i]] || glyphs[" "];

      for (let j = 0; j < glyph.s.length; j++) {
        const segment = glyph.s[j];
        const p1 = new THREE.Vector3(
          cursor + segment[0] * scaleX,
          baselineY + segment[1] * height,
          z
        );
        const p2 = new THREE.Vector3(
          cursor + segment[2] * scaleX,
          baselineY + segment[3] * height,
          z
        );
        const direction = new THREE.Vector3().subVectors(p2, p1);
        const length = direction.length();
        const midpoint = new THREE.Vector3()
          .addVectors(p1, p2)
          .multiplyScalar(0.5);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          yAxis,
          direction.normalize()
        );

        matrix.compose(
          midpoint,
          quaternion,
          new THREE.Vector3(scaleX, length, depth / thickness)
        );
        mesh.setMatrixAt(instanceIndex, matrix);
        instanceIndex++;
      }

      cursor += (glyph.w + gap) * scaleX;
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
    return mesh;
  }

  const front_title = new THREE.Group();
  front_title.name = "front_title";

  const title_digital = createStrokeText(
    "Digital",
    0.68,
    0.18,
    0.019,
    0.0045,
    titleMat,
    0.09,
    1.22,
    bookD * 0.5 + 0.01
  );
  title_digital.name = "title_digital";
  front_title.add(title_digital);

  const title_quantum = createStrokeText(
    "Quantum",
    0.98,
    0.2,
    0.021,
    0.0045,
    titleMat,
    0.04,
    0.94,
    bookD * 0.5 + 0.01
  );
  title_quantum.name = "title_quantum";
  front_title.add(title_quantum);

  const title_physics = createStrokeText(
    "Physics",
    0.79,
    0.2,
    0.021,
    0.0045,
    titleMat,
    0.07,
    0.66,
    bookD * 0.5 + 0.01
  );
  title_physics.name = "title_physics";
  front_title.add(title_physics);

  const front_subtitle = createStrokeText(
    "Advanced Field Operations",
    0.74,
    0.058,
    0.0055,
    0.003,
    titleMat,
    0.04,
    0.5,
    bookD * 0.5 + 0.009
  );
  front_subtitle.name = "front_subtitle";
  front_title.add(front_subtitle);

  const front_description = createStrokeText(
    "Quantum Information",
    0.66,
    0.056,
    0.0052,
    0.003,
    titleMat,
    0.04,
    0.41,
    bookD * 0.5 + 0.009
  );
  front_description.name = "front_description";
  front_title.add(front_description);

  const front_footer = createStrokeText(
    "A Technical Reference",
    0.73,
    0.057,
    0.0052,
    0.003,
    titleMat,
    0.04,
    0.13,
    bookD * 0.5 + 0.009
  );
  front_footer.name = "front_footer";
  front_title.add(front_footer);

  root.add(front_title);

  const spine_title_group = new THREE.Group();
  spine_title_group.name = "spine_title_group";
  spine_title_group.position.set(-bookW * 0.5 - 0.008, 0.9, 0);
  spine_title_group.rotation.y = -Math.PI * 0.5;

  const spine_title = createStrokeText(
    "Digital Quantum Physics",
    1.03,
    0.048,
    0.0048,
    0.003,
    titleMat,
    0,
    -0.515,
    0.006
  );
  spine_title.name = "spine_title";
  spine_title.rotation.z = Math.PI * 0.5;
  spine_title_group.add(spine_title);
  root.add(spine_title_group);

  const publisher_markGeom = new THREE.RingGeometry(0.014, 0.022, 20);
  const publisher_mark = new THREE.Mesh(publisher_markGeom, publisherMat);
  publisher_mark.name = "publisher_mark";
  publisher_mark.position.set(
    -bookW * 0.5 - 0.008,
    0.12,
    0
  );
  publisher_mark.rotation.y = -Math.PI * 0.5;
  root.add(publisher_mark);

  const publisher_dotGeom = new THREE.CircleGeometry(0.006, 14);
  const publisher_dot = new THREE.Mesh(publisher_dotGeom, publisherMat);
  publisher_dot.name = "publisher_dot";
  publisher_dot.position.set(
    -bookW * 0.5 - 0.009,
    0.12,
    0
  );
  publisher_dot.rotation.y = -Math.PI * 0.5;
  root.add(publisher_dot);

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