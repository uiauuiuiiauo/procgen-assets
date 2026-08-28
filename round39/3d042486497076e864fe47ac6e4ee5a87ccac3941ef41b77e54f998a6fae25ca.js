export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "framed_chalkboard";

  const boardW = 3.20;
  const boardH = 2.40;
  const frameW = 0.18;
  const frameDepth = 0.12;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xd9ad73,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodSeamMat = new THREE.MeshStandardMaterial({
    color: 0xaa7445,
    metalness: 0.0,
    roughness: 0.6,
  });
  const woodGrainMat = new THREE.LineBasicMaterial({
    color: 0x9b6539,
    transparent: true,
    opacity: 0.38,
  });
  const chalkboardMat = new THREE.MeshStandardMaterial({
    color: 0x111314,
    metalness: 0.0,
    roughness: 0.95,
  });
  const innerTrimMat = new THREE.MeshStandardMaterial({
    color: 0x171512,
    metalness: 0.0,
    roughness: 0.8,
  });
  const eraserBodyMat = new THREE.MeshStandardMaterial({
    color: 0x34393d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const eraserBandMat = new THREE.MeshStandardMaterial({
    color: 0xe8e4dc,
    metalness: 0.0,
    roughness: 0.8,
  });
  const eraserPinkMat = new THREE.MeshStandardMaterial({
    color: 0xf29aa3,
    metalness: 0.0,
    roughness: 0.8,
  });
  const eraserSeamMat = new THREE.MeshStandardMaterial({
    color: 0xc97b84,
    metalness: 0.0,
    roughness: 0.8,
  });

  function makeRailGeometry(points) {
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, {
      depth: frameDepth,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.008,
      bevelSegments: 2,
    });
  }

  function makeRailGrainGeometry(points) {
    const vertices = [];
    const z = frameDepth + 0.016;
    const count = 6;

    for (let i = 0; i < count; i++) {
      const offset = ((i + 1) / (count + 1) - 0.5) * 0.105;
      const phase = i * 0.73;

      for (let j = 0; j < 10; j++) {
        const t0 = j / 10;
        const t1 = (j + 1) / 10;
        const wave0 = Math.sin(t0 * Math.PI * 3 + phase) * 0.003;
        const wave1 = Math.sin(t1 * Math.PI * 3 + phase) * 0.003;
        const x0 = points[0][0] + (points[1][0] - points[0][0]) * t0;
        const y0 = points[0][1] + (points[1][1] - points[0][1]) * t0;
        const x1 = points[0][0] + (points[1][0] - points[0][0]) * t1;
        const y1 = points[0][1] + (points[1][1] - points[0][1]) * t1;
        const dx = x1 - x0;
        const dy = y1 - y0;
        const length = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / length;
        const ny = dx / length;

        vertices.push(
          x0 + nx * offset + wave0,
          y0 + ny * offset + wave0,
          z,
          x1 + nx * offset + wave1,
          y1 + ny * offset + wave1,
          z
        );
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return geometry;
  }

  const chalkboardGeom = new THREE.BoxGeometry(2.94, 2.14, 0.055);
  const chalkboard = new THREE.Mesh(chalkboardGeom, chalkboardMat);
  chalkboard.name = "chalkboard";
  chalkboard.position.set(0, 0, -0.012);
  root.add(chalkboard);

  const inner_horizontal_trimGeom = new THREE.BoxGeometry(2.92, 0.025, 0.026);
  const inner_vertical_trimGeom = new THREE.BoxGeometry(0.025, 2.09, 0.026);

  const inner_top_trim = new THREE.Mesh(
    inner_horizontal_trimGeom,
    innerTrimMat
  );
  inner_top_trim.name = "inner_top_trim";
  inner_top_trim.position.set(0, 1.066, 0.026);
  root.add(inner_top_trim);

  const inner_bottom_trim = new THREE.Mesh(
    inner_horizontal_trimGeom,
    innerTrimMat
  );
  inner_bottom_trim.name = "inner_bottom_trim";
  inner_bottom_trim.position.set(0, -1.066, 0.026);
  root.add(inner_bottom_trim);

  const inner_left_trim = new THREE.Mesh(inner_vertical_trimGeom, innerTrimMat);
  inner_left_trim.name = "inner_left_trim";
  inner_left_trim.position.set(-1.458, 0, 0.026);
  root.add(inner_left_trim);

  const inner_right_trim = new THREE.Mesh(
    inner_vertical_trimGeom,
    innerTrimMat
  );
  inner_right_trim.name = "inner_right_trim";
  inner_right_trim.position.set(1.458, 0, 0.026);
  root.add(inner_right_trim);

  const top_frame_railGeom = makeRailGeometry([
    [-1.50, 1.08],
    [1.50, 1.08],
    [1.60, 1.20],
    [-1.60, 1.20],
  ]);
  const top_frame_rail = new THREE.Mesh(top_frame_railGeom, woodMat);
  top_frame_rail.name = "top_frame_rail";
  top_frame_rail.position.z = -0.03;
  root.add(top_frame_rail);

  const bottom_frame_railGeom = makeRailGeometry([
    [-1.60, -1.20],
    [1.60, -1.20],
    [1.50, -1.08],
    [-1.50, -1.08],
  ]);
  const bottom_frame_rail = new THREE.Mesh(bottom_frame_railGeom, woodMat);
  bottom_frame_rail.name = "bottom_frame_rail";
  bottom_frame_rail.position.z = -0.03;
  root.add(bottom_frame_rail);

  const left_frame_railGeom = makeRailGeometry([
    [-1.60, -1.20],
    [-1.50, -1.08],
    [-1.50, 1.08],
    [-1.60, 1.20],
  ]);
  const left_frame_rail = new THREE.Mesh(left_frame_railGeom, woodMat);
  left_frame_rail.name = "left_frame_rail";
  left_frame_rail.position.z = -0.03;
  root.add(left_frame_rail);

  const right_frame_railGeom = makeRailGeometry([
    [1.50, -1.08],
    [1.60, -1.20],
    [1.60, 1.20],
    [1.50, 1.08],
  ]);
  const right_frame_rail = new THREE.Mesh(right_frame_railGeom, woodMat);
  right_frame_rail.name = "right_frame_rail";
  right_frame_rail.position.z = -0.03;
  root.add(right_frame_rail);

  const top_frame_grainGeom = makeRailGrainGeometry([
    [-1.50, 1.08],
    [1.50, 1.08],
  ]);
  const top_frame_grain = new THREE.LineSegments(
    top_frame_grainGeom,
    woodGrainMat
  );
  top_frame_grain.name = "top_frame_grain";
  top_frame_rail.add(top_frame_grain);

  const bottom_frame_grainGeom = makeRailGrainGeometry([
    [-1.60, -1.20],
    [1.60, -1.20],
  ]);
  const bottom_frame_grain = new THREE.LineSegments(
    bottom_frame_grainGeom,
    woodGrainMat
  );
  bottom_frame_grain.name = "bottom_frame_grain";
  bottom_frame_rail.add(bottom_frame_grain);

  const left_frame_grainGeom = makeRailGrainGeometry([
    [-1.60, -1.20],
    [-1.60, 1.20],
  ]);
  const left_frame_grain = new THREE.LineSegments(
    left_frame_grainGeom,
    woodGrainMat
  );
  left_frame_grain.name = "left_frame_grain";
  left_frame_rail.add(left_frame_grain);

  const right_frame_grainGeom = makeRailGrainGeometry([
    [1.60, -1.20],
    [1.60, 1.20],
  ]);
  const right_frame_grain = new THREE.LineSegments(
    right_frame_grainGeom,
    woodGrainMat
  );
  right_frame_grain.name = "right_frame_grain";
  right_frame_rail.add(right_frame_grain);

  const miter_seamGeom = new THREE.CylinderGeometry(
    0.005,
    0.005,
    Math.sqrt(0.12 * 0.12 + 0.12 * 0.12),
    8
  );
  const miterAxis = new THREE.Vector3(0, 1, 0);

  function positionMiter(mesh, x, y, dx, dy) {
    const direction = new THREE.Vector3(dx, dy, 0).normalize();
    mesh.quaternion.setFromUnitVectors(miterAxis, direction);
    mesh.position.set(x, y, 0.108);
  }

  const top_left_miter_seam = new THREE.Mesh(miter_seamGeom, woodSeamMat);
  top_left_miter_seam.name = "top_left_miter_seam";
  positionMiter(top_left_miter_seam, -1.55, 1.14, -0.10, 0.12);
  root.add(top_left_miter_seam);

  const top_right_miter_seam = new THREE.Mesh(miter_seamGeom, woodSeamMat);
  top_right_miter_seam.name = "top_right_miter_seam";
  positionMiter(top_right_miter_seam, 1.55, 1.14, 0.10, 0.12);
  root.add(top_right_miter_seam);

  const bottom_left_miter_seam = new THREE.Mesh(
    miter_seamGeom,
    woodSeamMat
  );
  bottom_left_miter_seam.name = "bottom_left_miter_seam";
  positionMiter(bottom_left_miter_seam, -1.55, -1.14, -0.10, -0.12);
  root.add(bottom_left_miter_seam);

  const bottom_right_miter_seam = new THREE.Mesh(
    miter_seamGeom,
    woodSeamMat
  );
  bottom_right_miter_seam.name = "bottom_right_miter_seam";
  positionMiter(bottom_right_miter_seam, 1.55, -1.14, 0.10, -0.12);
  root.add(bottom_right_miter_seam);

  const eraser_bodyShape = new THREE.Shape();
  const bodyW = 0.52;
  const bodyH = 0.16;
  const bodyR = 0.025;
  eraser_bodyShape.moveTo(-bodyW / 2 + bodyR, -bodyH / 2);
  eraser_bodyShape.lineTo(bodyW / 2 - bodyR, -bodyH / 2);
  eraser_bodyShape.quadraticCurveTo(
    bodyW / 2,
    -bodyH / 2,
    bodyW / 2,
    -bodyH / 2 + bodyR
  );
  eraser_bodyShape.lineTo(bodyW / 2, bodyH / 2 - bodyR);
  eraser_bodyShape.quadraticCurveTo(
    bodyW / 2,
    bodyH / 2,
    bodyW / 2 - bodyR,
    bodyH / 2
  );
  eraser_bodyShape.lineTo(-bodyW / 2 + bodyR, bodyH / 2);
  eraser_bodyShape.quadraticCurveTo(
    -bodyW / 2,
    bodyH / 2,
    -bodyW / 2,
    bodyH / 2 - bodyR
  );
  eraser_bodyShape.lineTo(-bodyW / 2, -bodyH / 2 + bodyR);
  eraser_bodyShape.quadraticCurveTo(
    -bodyW / 2,
    -bodyH / 2,
    -bodyW / 2 + bodyR,
    -bodyH / 2
  );
  eraser_bodyShape.closePath();

  const eraser_bodyGeom = new THREE.ExtrudeGeometry(eraser_bodyShape, {
    depth: 0.20,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const eraser_body = new THREE.Mesh(eraser_bodyGeom, eraserBodyMat);
  eraser_body.name = "eraser_body";
  eraser_body.position.set(0.14, -1.145, 0.078);
  root.add(eraser_body);

  const eraser_white_bandGeom = new THREE.BoxGeometry(0.24, 0.145, 0.012);
  const eraser_white_band = new THREE.Mesh(
    eraser_white_bandGeom,
    eraserBandMat
  );
  eraser_white_band.name = "eraser_white_band";
  eraser_white_band.position.set(-0.06, -1.145, 0.292);
  root.add(eraser_white_band);

  const eraser_pink_topShape = new THREE.Shape();
  const pinkW = 0.43;
  const pinkH = 0.07;
  const pinkR = 0.025;
  eraser_pink_topShape.moveTo(-pinkW / 2 + pinkR, -pinkH / 2);
  eraser_pink_topShape.lineTo(pinkW / 2 - pinkR, -pinkH / 2);
  eraser_pink_topShape.quadraticCurveTo(
    pinkW / 2,
    -pinkH / 2,
    pinkW / 2,
    -pinkH / 2 + pinkR
  );
  eraser_pink_topShape.lineTo(pinkW / 2, pinkH / 2 - pinkR);
  eraser_pink_topShape.quadraticCurveTo(
    pinkW / 2,
    pinkH / 2,
    pinkW / 2 - pinkR,
    pinkH / 2
  );
  eraser_pink_topShape.lineTo(-pinkW / 2 + pinkR, pinkH / 2);
  eraser_pink_topShape.quadraticCurveTo(
    -pinkW / 2,
    pinkH / 2,
    -pinkW / 2,
    pinkH / 2 - pinkR
  );
  eraser_pink_topShape.lineTo(-pinkW / 2, -pinkH / 2 + pinkR);
  eraser_pink_topShape.quadraticCurveTo(
    -pinkW / 2,
    -pinkH / 2,
    -pinkW / 2 + pinkR,
    -pinkH / 2
  );
  eraser_pink_topShape.closePath();

  const eraser_pink_topGeom = new THREE.ExtrudeGeometry(
    eraser_pink_topShape,
    {
      depth: 0.215,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.009,
      bevelSize: 0.009,
      bevelSegments: 2,
    }
  );
  const eraser_pink_top = new THREE.Mesh(
    eraser_pink_topGeom,
    eraserPinkMat
  );
  eraser_pink_top.name = "eraser_pink_top";
  eraser_pink_top.position.set(0.14, -1.02, 0.070);
  root.add(eraser_pink_top);

  const eraser_pink_seamGeom = new THREE.BoxGeometry(0.39, 0.008, 0.009);
  const eraser_pink_seam = new THREE.Mesh(
    eraser_pink_seamGeom,
    eraserSeamMat
  );
  eraser_pink_seam.name = "eraser_pink_seam";
  eraser_pink_seam.position.set(0.14, -1.055, 0.299);
  root.add(eraser_pink_seam);

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