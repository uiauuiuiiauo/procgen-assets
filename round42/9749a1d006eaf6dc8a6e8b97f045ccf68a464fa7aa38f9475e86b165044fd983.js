export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "marble_loveseat";

  const seatW = 2.08;
  const seatD = 1.12;
  const seatH = 0.60;
  const cushionH = 0.19;
  const backH = 0.76;
  const armW = 0.24;
  const armH = 1.18;
  const legH = 0.10;
  const moduleCount = 2;
  const moduleGap = 0.035;
  const moduleW = (seatW - moduleGap) / moduleCount;
  const moduleX = (moduleW + moduleGap) / 2;
  const armX = (seatW + armW) / 2;
  const armD = 1.38;
  const backW = 2.50;
  const backD = 0.24;
  const backZ = -0.52;
  const backY = 0.98;
  const backBottom = backY - backH / 2;

  function clampByte(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
  }

  function createMarbleTexture() {
    const size = 128;
    const data = new Uint8Array(size * size * 4);

    function setPixel(x, y, r, g, b) {
      const px = Math.round(x);
      const py = Math.round(y);
      if (px < 0 || py < 0 || px >= size || py >= size) return;
      const index = (py * size + px) * 4;
      data[index] = clampByte(r);
      data[index + 1] = clampByte(g);
      data[index + 2] = clampByte(b);
      data[index + 3] = 255;
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const u = x / (size - 1);
        const v = y / (size - 1);

        const cloud =
          0.5 +
          0.22 * Math.sin(u * 10.6 + Math.sin(v * 7.2) * 1.7) +
          0.18 * Math.sin(v * 13.4 - u * 4.1) +
          0.10 * Math.sin((u + v) * 23.0);

        const baseR = 48 + 105 * cloud;
        const baseG = 92 + 125 * cloud;
        const baseB = 132 + 96 * cloud;

        const f1 =
          (u * 2.15 + v * 0.82 +
            0.15 * Math.sin(v * 12.0) +
            0.05 * Math.sin((u - v) * 25.0)) - 0.52;
        const f2 =
          (v * 1.75 - u * 0.68 +
            0.13 * Math.sin(u * 11.0) -
            0.06 * Math.sin((u + v) * 21.0)) - 1.02;
        const f3 =
          (u * 1.42 - v * 1.28 +
            0.11 * Math.sin((u + v) * 15.0)) - 1.58;
        const f4 =
          (u * 2.75 - v * 0.34 +
            0.09 * Math.sin(v * 18.0)) - 2.16;

        const d1 = Math.abs(f1);
        const d2 = Math.abs(f2);
        const d3 = Math.abs(f3);
        const d4 = Math.abs(f4);

        let dark = Math.exp(-d1 * 72) + 0.78 * Math.exp(-d2 * 78);
        dark += 0.55 * Math.exp(-d3 * 84) + 0.42 * Math.exp(-d4 * 90);
        dark = Math.min(1, dark);

        const branchMask = Math.exp(
          -Math.abs(f2 * 0.46 + f1 * 0.31 - 0.18) * 34
        );
        dark = Math.min(1, dark + 0.22 * branchMask);

        const paleCloud = Math.max(
          0,
          Math.sin(u * 8.2 + v * 5.3 + Math.sin(v * 9.0)) * 0.65 +
          Math.sin(v * 11.5 - u * 3.7) * 0.35 -
          0.16
        );

        const fiber =
          3.5 * Math.sin(x * 1.73 + y * 0.37) +
          2.5 * Math.sin(y * 1.41 - x * 0.29);

        const darkR = 10;
        const darkG = 38;
        const darkB = 70;

        let r = baseR * (1 - dark) + darkR * dark;
        let g = baseG * (1 - dark) + darkG * dark;
        let b = baseB * (1 - dark) + darkB * dark;

        r = r * (1 - paleCloud * 0.52) + 222 * paleCloud * 0.52 + fiber;
        g = g * (1 - paleCloud * 0.52) + 235 * paleCloud * 0.52 + fiber;
        b = b * (1 - paleCloud * 0.52) + 242 * paleCloud * 0.52 + fiber;

        setPixel(x, y, r, g, b);
      }
    }

    for (let i = 0; i < 15; i++) {
      const cx = (37 + i * 29) % size;
      const cy = (19 + i * 43) % size;
      const radius = 1.2 + (i % 3) * 0.55;
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance <= radius) {
            const strength = 1 - distance / radius;
            setPixel(
              cx + dx,
              cy + dy,
              178 + 65 * strength,
              210 + 38 * strength,
              228 + 25 * strength
            );
          }
        }
      }
    }

    const texture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.UnsignedByteType
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.45, 1.45);
    texture.offset.set(0.04, 0.02);
    texture.needsUpdate = true;
    if (THREE.SRGBColorSpace !== undefined) {
      texture.colorSpace = THREE.SRGBColorSpace;
    }
    return texture;
  }

  function createRoundedBoxGeometry(w, h, d, radius) {
    const bevel = Math.min(radius * 0.32, w * 0.04, h * 0.12, d * 0.10);
    const shapeW = Math.max(0.02, w - bevel * 2);
    const shapeH = Math.max(0.02, h - bevel * 2);
    const corner = Math.max(
      0.008,
      Math.min(radius - bevel, shapeW * 0.48, shapeH * 0.48)
    );
    const x0 = -shapeW / 2;
    const x1 = shapeW / 2;
    const y0 = -shapeH / 2;
    const y1 = shapeH / 2;

    const shape = new THREE.Shape();
    shape.moveTo(x0 + corner, y0);
    shape.lineTo(x1 - corner, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + corner);
    shape.lineTo(x1, y1 - corner);
    shape.quadraticCurveTo(x1, y1, x1 - corner, y1);
    shape.lineTo(x0 + corner, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - corner);
    shape.lineTo(x0, y0 + corner);
    shape.quadraticCurveTo(x0, y0, x0 + corner, y0);

    const coreDepth = Math.max(0.01, d - bevel * 2);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: coreDepth,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3
    });
    geometry.translate(0, 0, -coreDepth / 2);
    return geometry;
  }

  function createPillowGeometry(w, h, d) {
    const bevel = 0.055;
    const shapeW = w - bevel * 2;
    const shapeH = h - bevel * 2;
    const corner = 0.085;
    const x0 = -shapeW / 2;
    const x1 = shapeW / 2;
    const y0 = -shapeH / 2;
    const y1 = shapeH / 2;

    const shape = new THREE.Shape();
    shape.moveTo(x0 + corner, y0);
    shape.lineTo(x1 - corner, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + corner);
    shape.lineTo(x1, y1 - corner);
    shape.quadraticCurveTo(x1, y1, x1 - corner, y1);
    shape.lineTo(x0 + corner, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - corner);
    shape.lineTo(x0, y0 + corner);
    shape.quadraticCurveTo(x0, y0, x0 + corner, y0);

    const coreDepth = d - bevel * 2;
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: coreDepth,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 5
    });
    geometry.translate(0, 0, -coreDepth / 2);
    return geometry;
  }

  function createPillowPipingGeometry(w, h, z) {
    const inset = 0.062;
    const corner = 0.09;
    const x = w / 2 - inset;
    const y = h / 2 - inset;
    const points = [
      new THREE.Vector3(-x + corner, -y, z),
      new THREE.Vector3(x - corner, -y, z),
      new THREE.Vector3(x, -y + corner, z),
      new THREE.Vector3(x, y - corner, z),
      new THREE.Vector3(x - corner, y, z),
      new THREE.Vector3(-x + corner, y, z),
      new THREE.Vector3(-x, y - corner, z),
      new THREE.Vector3(-x, -y + corner, z)
    ];
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(curve, 48, 0.012, 7, true);
  }

  function createSeatPipingGeometry(w, d, y) {
    const inset = 0.045;
    const corner = 0.10;
    const x = w / 2 - inset;
    const z = d / 2 - inset;
    const points = [
      new THREE.Vector3(-x + corner, y, -z),
      new THREE.Vector3(x - corner, y, -z),
      new THREE.Vector3(x, y, -z + corner),
      new THREE.Vector3(x, y, z - corner),
      new THREE.Vector3(x - corner, y, z),
      new THREE.Vector3(-x + corner, y, z),
      new THREE.Vector3(-x, y, z - corner),
      new THREE.Vector3(-x, y, -z + corner)
    ];
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal",
      0.5
    );
    return new THREE.TubeGeometry(curve, 48, 0.008, 6, true);
  }

  const marbleTexture = createMarbleTexture();

  const upholsteryMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: marbleTexture,
    metalness: 0.0,
    roughness: 0.95
  });

  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x174f78,
    metalness: 0.0,
    roughness: 0.95
  });

  const pillowMat = new THREE.MeshStandardMaterial({
    color: 0x570b2d,
    metalness: 0.0,
    roughness: 0.95
  });

  const pillowSeamMat = new THREE.MeshStandardMaterial({
    color: 0x2d0619,
    metalness: 0.0,
    roughness: 0.95
  });

  const feetMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });

  const upholstered_shell = new THREE.Group();
  upholstered_shell.name = "upholstered_shell";
  root.add(upholstered_shell);

  const seat_baseGeom = createRoundedBoxGeometry(
    seatW + 0.04,
    seatH - legH,
    1.25,
    0.13
  );
  const seat_base = new THREE.Mesh(seat_baseGeom, upholsteryMat);
  seat_base.name = "seat_base";
  seat_base.position.set(0, legH + (seatH - legH) / 2, 0.06);
  upholstered_shell.add(seat_base);

  const backrestGeom = createRoundedBoxGeometry(
    backW,
    backH,
    backD,
    0.115
  );
  const backrest = new THREE.Mesh(backrestGeom, upholsteryMat);
  backrest.name = "backrest";
  backrest.position.set(0, backY, backZ);
  upholstered_shell.add(backrest);

  const armGeom = createRoundedBoxGeometry(
    armW,
    armH,
    armD,
    0.105
  );

  const left_arm = new THREE.Mesh(armGeom, upholsteryMat);
  left_arm.name = "left_arm";
  left_arm.position.set(-armX, legH + armH / 2, -0.02);
  upholstered_shell.add(left_arm);

  const right_arm = new THREE.Mesh(armGeom, upholsteryMat);
  right_arm.name = "right_arm";
  right_arm.position.set(armX, legH + armH / 2, -0.02);
  upholstered_shell.add(right_arm);

  const back_top_pipingGeom = new THREE.CylinderGeometry(
    0.010,
    0.010,
    backW - 0.10,
    10
  );
  const back_top_piping = new THREE.Mesh(back_top_pipingGeom, seamMat);
  back_top_piping.name = "back_top_piping";
  back_top_piping.rotation.z = Math.PI / 2;
  back_top_piping.position.set(0, backY + backH / 2 - 0.018, backZ + backD / 2 + 0.006);
  upholstered_shell.add(back_top_piping);

  const back_side_pipingGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    backH - 0.12,
    8
  );

  const left_back_piping = new THREE.Mesh(back_side_pipingGeom, seamMat);
  left_back_piping.name = "left_back_piping";
  left_back_piping.position.set(
    -backW / 2 + 0.025,
    backY,
    backZ + backD / 2 + 0.006
  );
  upholstered_shell.add(left_back_piping);

  const right_back_piping = new THREE.Mesh(back_side_pipingGeom, seamMat);
  right_back_piping.name = "right_back_piping";
  right_back_piping.position.set(
    backW / 2 - 0.025,
    backY,
    backZ + backD / 2 + 0.006
  );
  upholstered_shell.add(right_back_piping);

  const arm_front_pipingGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    armH - 0.14,
    8
  );

  const left_arm_front_piping = new THREE.Mesh(
    arm_front_pipingGeom,
    seamMat
  );
  left_arm_front_piping.name = "left_arm_front_piping";
  left_arm_front_piping.position.set(
    -seatW / 2 - 0.008,
    legH + armH / 2,
    armD / 2 - 0.025
  );
  upholstered_shell.add(left_arm_front_piping);

  const right_arm_front_piping = new THREE.Mesh(
    arm_front_pipingGeom,
    seamMat
  );
  right_arm_front_piping.name = "right_arm_front_piping";
  right_arm_front_piping.position.set(
    seatW / 2 + 0.008,
    legH + armH / 2,
    armD / 2 - 0.025
  );
  upholstered_shell.add(right_arm_front_piping);

  const seat_assembly = new THREE.Group();
  seat_assembly.name = "seat_assembly";
  root.add(seat_assembly);

  const seat_cushionGeom = createRoundedBoxGeometry(
    moduleW,
    cushionH,
    seatD,
    0.095
  );
  const seat_pipingGeom = createSeatPipingGeometry(
    moduleW,
    seatD,
    cushionH / 2 + 0.004
  );

  const left_seat_cushion = new THREE.Mesh(
    seat_cushionGeom,
    upholsteryMat
  );
  left_seat_cushion.name = "left_seat_cushion";
  left_seat_cushion.position.set(
    -moduleX,
    seatH + cushionH / 2,
    0.08
  );
  seat_assembly.add(left_seat_cushion);

  const right_seat_cushion = new THREE.Mesh(
    seat_cushionGeom,
    upholsteryMat
  );
  right_seat_cushion.name = "right_seat_cushion";
  right_seat_cushion.position.set(
    moduleX,
    seatH + cushionH / 2,
    0.08
  );
  seat_assembly.add(right_seat_cushion);

  const left_seat_piping = new THREE.Mesh(seat_pipingGeom, seamMat);
  left_seat_piping.name = "left_seat_piping";
  left_seat_cushion.add(left_seat_piping);

  const right_seat_piping = new THREE.Mesh(seat_pipingGeom, seamMat);
  right_seat_piping.name = "right_seat_piping";
  right_seat_cushion.add(right_seat_piping);

  const center_seat_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    seatD - 0.10,
    8
  );
  const center_seat_seam = new THREE.Mesh(center_seat_seamGeom, seamMat);
  center_seat_seam.name = "center_seat_seam";
  center_seat_seam.rotation.x = Math.PI / 2;
  center_seat_seam.position.set(
    0,
    seatH + cushionH + 0.005,
    0.08
  );
  seat_assembly.add(center_seat_seam);

  const front_seat_seamGeom = new THREE.CylinderGeometry(
    0.006,
    0.006,
    seatW - 0.12,
    8
  );
  const front_seat_seam = new THREE.Mesh(front_seat_seamGeom, seamMat);
  front_seat_seam.name = "front_seat_seam";
  front_seat_seam.rotation.z = Math.PI / 2;
  front_seat_seam.position.set(
    0,
    seatH + cushionH * 0.72,
    0.08 + seatD / 2 + 0.006
  );
  seat_assembly.add(front_seat_seam);

  const throw_pillows = new THREE.Group();
  throw_pillows.name = "throw_pillows";
  root.add(throw_pillows);

  const pillowW = 0.78;
  const pillowH = 0.82;
  const pillowD = 0.21;
  const pillowGeom = createPillowGeometry(pillowW, pillowH, pillowD);
  const pillow_pipingGeom = createPillowPipingGeometry(
    pillowW,
    pillowH,
    pillowD / 2 + 0.006
  );

  const left_throw_pillow = new THREE.Group();
  left_throw_pillow.name = "left_throw_pillow";
  left_throw_pillow.position.set(-0.53, 1.03, -0.27);
  left_throw_pillow.rotation.set(-0.14, 0.02, 0.18);
  throw_pillows.add(left_throw_pillow);

  const left_pillow_body = new THREE.Mesh(pillowGeom, pillowMat);
  left_pillow_body.name = "left_pillow_body";
  left_throw_pillow.add(left_pillow_body);

  const left_pillow_piping = new THREE.Mesh(
    pillow_pipingGeom,
    pillowSeamMat
  );
  left_pillow_piping.name = "left_pillow_piping";
  left_throw_pillow.add(left_pillow_piping);

  const right_throw_pillow = new THREE.Group();
  right_throw_pillow.name = "right_throw_pillow";
  right_throw_pillow.position.set(0.55, 1.04, -0.27);
  right_throw_pillow.rotation.set(-0.13, -0.02, -0.08);
  throw_pillows.add(right_throw_pillow);

  const right_pillow_body = new THREE.Mesh(pillowGeom, pillowMat);
  right_pillow_body.name = "right_pillow_body";
  right_throw_pillow.add(right_pillow_body);

  const right_pillow_piping = new THREE.Mesh(
    pillow_pipingGeom,
    pillowSeamMat
  );
  right_pillow_piping.name = "right_pillow_piping";
  right_throw_pillow.add(right_pillow_piping);

  const feetGeom = new THREE.CylinderGeometry(
    0.072,
    0.082,
    legH,
    16
  );
  const feet = new THREE.InstancedMesh(feetGeom, feetMat, 4);
  feet.name = "feet";
  const footPositions = [
    [-1.08, legH / 2, 0.50],
    [1.08, legH / 2, 0.50],
    [-1.08, legH / 2, -0.48],
    [1.08, legH / 2, -0.48]
  ];
  const footTransform = new THREE.Object3D();
  for (let i = 0; i < footPositions.length; i++) {
    const position = footPositions[i];
    footTransform.position.set(position[0], position[1], position[2]);
    footTransform.updateMatrix();
    feet.setMatrixAt(i, footTransform.matrix);
  }
  feet.instanceMatrix.needsUpdate = true;
  root.add(feet);

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