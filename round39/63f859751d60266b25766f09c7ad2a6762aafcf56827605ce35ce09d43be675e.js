export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "fruit_punch_bottle";

  const bottle_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc91412,
    metalness: 0.0,
    roughness: 0.3,
  });
  const label_sleeveMat = new THREE.MeshStandardMaterial({
    color: 0xf5a238,
    metalness: 0.0,
    roughness: 0.7,
  });
  const label_redMat = new THREE.MeshStandardMaterial({
    color: 0xd62828,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_dark_redMat = new THREE.MeshStandardMaterial({
    color: 0xb91518,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const label_yellowMat = new THREE.MeshStandardMaterial({
    color: 0xf2c235,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const letter_outlineMat = new THREE.MeshStandardMaterial({
    color: 0x292728,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const letter_fillMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1ec,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });
  const cap_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const cap_ridgesMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const cap_grooveMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const cap_neckMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });

  const bottle_bodyProfile = [
    new THREE.Vector2(0.00, 0.00),
    new THREE.Vector2(0.39, 0.00),
    new THREE.Vector2(0.44, 0.015),
    new THREE.Vector2(0.48, 0.05),
    new THREE.Vector2(0.505, 0.12),
    new THREE.Vector2(0.515, 0.23),
    new THREE.Vector2(0.515, 0.38),
    new THREE.Vector2(0.505, 0.48),
    new THREE.Vector2(0.505, 1.68),
    new THREE.Vector2(0.515, 1.78),
    new THREE.Vector2(0.515, 1.88),
    new THREE.Vector2(0.495, 2.00),
    new THREE.Vector2(0.455, 2.12),
    new THREE.Vector2(0.405, 2.22),
    new THREE.Vector2(0.370, 2.30),
    new THREE.Vector2(0.360, 2.40),
    new THREE.Vector2(0.390, 2.43),
    new THREE.Vector2(0.00, 2.43),
  ];
  const bottle_bodyGeom = new THREE.LatheGeometry(bottle_bodyProfile, 64);
  const bottle_body = new THREE.Mesh(bottle_bodyGeom, bottle_bodyMat);
  bottle_body.name = "bottle_body";
  root.add(bottle_body);

  const bottle_base_ringGeom = new THREE.TorusGeometry(0.493, 0.012, 10, 64);
  const bottle_base_ring = new THREE.Mesh(bottle_base_ringGeom, bottle_bodyMat);
  bottle_base_ring.name = "bottle_base_ring";
  bottle_base_ring.rotation.x = Math.PI / 2;
  bottle_base_ring.position.y = 0.43;
  root.add(bottle_base_ring);

  const bottle_neck_ringGeom = new THREE.TorusGeometry(0.368, 0.018, 10, 64);
  const bottle_neck_ring = new THREE.Mesh(bottle_neck_ringGeom, bottle_bodyMat);
  bottle_neck_ring.name = "bottle_neck_ring";
  bottle_neck_ring.rotation.x = Math.PI / 2;
  bottle_neck_ring.position.y = 2.315;
  root.add(bottle_neck_ring);

  const label_group = new THREE.Group();
  label_group.name = "label_group";
  root.add(label_group);

  const labelRadius = 0.519;
  const label_sleeveGeom = new THREE.CylinderGeometry(
    labelRadius,
    labelRadius,
    1.28,
    64,
    1,
    true
  );
  const label_sleeve = new THREE.Mesh(label_sleeveGeom, label_sleeveMat);
  label_sleeve.name = "label_sleeve";
  label_sleeve.position.y = 1.055;
  label_group.add(label_sleeve);

  function createSurfaceBand(name, y, height, startAngle, endAngle, material, offset) {
    const radius = labelRadius + offset;
    const geometry = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      48,
      1,
      true,
      startAngle,
      endAngle - startAngle
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.y = y;
    label_group.add(mesh);
    return mesh;
  }

  const label_red_wave = createSurfaceBand(
    "label_red_wave",
    1.055,
    0.27,
    -1.30,
    1.30,
    label_redMat,
    0.004
  );
  const label_dark_red_wave = createSurfaceBand(
    "label_dark_red_wave",
    0.925,
    0.16,
    -0.90,
    1.20,
    label_dark_redMat,
    0.006
  );
  const label_yellow_wave = createSurfaceBand(
    "label_yellow_wave",
    0.805,
    0.12,
    0.05,
    1.24,
    label_yellowMat,
    0.008
  );
  const label_upper_gold = createSurfaceBand(
    "label_upper_gold",
    1.515,
    0.10,
    0.46,
    1.25,
    label_yellowMat,
    0.006
  );

  function createBarGeometry(length, thickness) {
    const halfLength = length * 0.5;
    const halfThickness = thickness * 0.5;
    const radius = Math.min(thickness * 0.28, length * 0.12);
    const shape = new THREE.Shape();
    shape.moveTo(-halfLength + radius, -halfThickness);
    shape.lineTo(halfLength - radius, -halfThickness);
    shape.quadraticCurveTo(halfLength, -halfThickness, halfLength, -halfThickness + radius);
    shape.lineTo(halfLength, halfThickness - radius);
    shape.quadraticCurveTo(halfLength, halfThickness, halfLength - radius, halfThickness);
    shape.lineTo(-halfLength + radius, halfThickness);
    shape.quadraticCurveTo(-halfLength, halfThickness, -halfLength, halfThickness - radius);
    shape.lineTo(-halfLength, -halfThickness + radius);
    shape.quadraticCurveTo(-halfLength, -halfThickness, -halfLength + radius, -halfThickness);
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 6);
  }

  const glyphs = {
    F: {
      width: 0.72,
      segments: [
        [0.14, 0.04, 0.14, 0.96],
        [0.14, 0.94, 0.66, 0.94],
        [0.14, 0.56, 0.56, 0.56],
      ],
    },
    R: {
      width: 0.74,
      segments: [
        [0.14, 0.04, 0.14, 0.96],
        [0.14, 0.94, 0.53, 0.94],
        [0.53, 0.94, 0.66, 0.82],
        [0.66, 0.82, 0.66, 0.65],
        [0.66, 0.65, 0.53, 0.54],
        [0.14, 0.54, 0.53, 0.54],
        [0.43, 0.54, 0.70, 0.04],
      ],
    },
    U: {
      width: 0.76,
      segments: [
        [0.12, 0.96, 0.12, 0.22],
        [0.64, 0.96, 0.64, 0.22],
        [0.12, 0.22, 0.25, 0.06],
        [0.25, 0.06, 0.51, 0.06],
        [0.51, 0.06, 0.64, 0.22],
      ],
    },
    I: {
      width: 0.42,
      segments: [
        [0.21, 0.04, 0.21, 0.96],
        [0.07, 0.94, 0.35, 0.94],
        [0.07, 0.06, 0.35, 0.06],
      ],
    },
    T: {
      width: 0.76,
      segments: [
        [0.06, 0.94, 0.70, 0.94],
        [0.38, 0.94, 0.38, 0.04],
      ],
    },
    P: {
      width: 0.72,
      segments: [
        [0.14, 0.04, 0.14, 0.96],
        [0.14, 0.94, 0.53, 0.94],
        [0.53, 0.94, 0.66, 0.82],
        [0.66, 0.82, 0.66, 0.65],
        [0.66, 0.65, 0.53, 0.54],
        [0.14, 0.54, 0.53, 0.54],
      ],
    },
    N: {
      width: 0.76,
      segments: [
        [0.13, 0.04, 0.13, 0.96],
        [0.13, 0.94, 0.63, 0.06],
        [0.63, 0.06, 0.63, 0.96],
      ],
    },
    C: {
      width: 0.74,
      segments: [
        [0.66, 0.84, 0.54, 0.95],
        [0.54, 0.95, 0.25, 0.95],
        [0.25, 0.95, 0.11, 0.81],
        [0.11, 0.81, 0.11, 0.20],
        [0.11, 0.20, 0.25, 0.05],
        [0.25, 0.05, 0.54, 0.05],
        [0.54, 0.05, 0.67, 0.17],
      ],
    },
    H: {
      width: 0.76,
      segments: [
        [0.13, 0.04, 0.13, 0.96],
        [0.63, 0.04, 0.63, 0.96],
        [0.13, 0.51, 0.63, 0.51],
      ],
    },
  };

  function createWordMesh(
    name,
    word,
    targetWidth,
    baseY,
    letterHeight,
    thickness,
    material,
    surfaceRadius,
    tilt,
    compression
  ) {
    const gap = 0.10;
    let totalUnits = 0;
    for (let i = 0; i < word.length; i++) {
      totalUnits += glyphs[word[i]].width;
      if (i < word.length - 1) totalUnits += gap;
    }

    const unit = targetWidth / totalUnits;
    const segments = [];
    let cursor = -targetWidth * 0.5;

    for (let i = 0; i < word.length; i++) {
      const glyph = glyphs[word[i]];
      for (let j = 0; j < glyph.segments.length; j++) {
        const segment = glyph.segments[j];
        const x1 = cursor + segment[0] * unit;
        const y1 = baseY + segment[1] * letterHeight;
        const x2 = cursor + segment[2] * unit;
        const y2 = baseY + segment[3] * letterHeight;
        const fullX1 = x1 * compression;
        const fullX2 = x2 * compression;
        const dx = fullX2 - fullX1;
        const dy = y2 - y1;
        segments.push({
          x: (fullX1 + fullX2) * 0.5,
          y: (y1 + y2) * 0.5,
          length: Math.hypot(dx, dy),
          angle: Math.atan2(dy, dx) + tilt,
        });
      }
      cursor += glyph.width * unit;
      if (i < word.length - 1) cursor += gap * unit;
    }

    const geometry = createBarGeometry(1, 1);
    const mesh = new THREE.InstancedMesh(geometry, material, segments.length);
    mesh.name = name;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const angle = segment.x / surfaceRadius;
      dummy.position.set(
        Math.sin(angle) * surfaceRadius,
        segment.y,
        Math.cos(angle) * surfaceRadius
      );
      dummy.rotation.set(0, angle, segment.angle);
      dummy.scale.set(segment.length, thickness, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const textSurfaceRadius = labelRadius + 0.012;
  const textCompression = 1.34;

  const fruit_outline = createWordMesh(
    "fruit_outline",
    "FRUIT",
    0.90,
    1.185,
    0.37,
    0.092,
    letter_outlineMat,
    textSurfaceRadius,
    0.075,
    textCompression
  );
  label_group.add(fruit_outline);

  const fruit_fill = createWordMesh(
    "fruit_fill",
    "FRUIT",
    0.90,
    1.185,
    0.37,
    0.055,
    letter_fillMat,
    textSurfaceRadius + 0.004,
    0.075,
    textCompression
  );
  label_group.add(fruit_fill);

  const punch_outline = createWordMesh(
    "punch_outline",
    "PUNCH",
    0.91,
    0.805,
    0.36,
    0.092,
    letter_outlineMat,
    textSurfaceRadius,
    -0.035,
    textCompression
  );
  label_group.add(punch_outline);

  const punch_fill = createWordMesh(
    "punch_fill",
    "PUNCH",
    0.91,
    0.805,
    0.36,
    0.055,
    letter_fillMat,
    textSurfaceRadius + 0.004,
    -0.035,
    textCompression
  );
  label_group.add(punch_fill);

  const cap_group = new THREE.Group();
  cap_group.name = "cap_group";
  root.add(cap_group);

  const cap_neckGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.055, 64);
  const cap_neck = new THREE.Mesh(cap_neckGeom, cap_neckMat);
  cap_neck.name = "cap_neck";
  cap_neck.position.y = 2.405;
  cap_group.add(cap_neck);

  const cap_lower_flangeGeom = new THREE.CylinderGeometry(0.49, 0.49, 0.045, 64);
  const cap_lower_flange = new THREE.Mesh(cap_lower_flangeGeom, cap_bodyMat);
  cap_lower_flange.name = "cap_lower_flange";
  cap_lower_flange.position.y = 2.445;
  cap_group.add(cap_lower_flange);

  const cap_bodyProfile = [
    new THREE.Vector2(0.00, 2.455),
    new THREE.Vector2(0.455, 2.455),
    new THREE.Vector2(0.475, 2.485),
    new THREE.Vector2(0.470, 2.525),
    new THREE.Vector2(0.452, 2.555),
    new THREE.Vector2(0.445, 2.620),
    new THREE.Vector2(0.445, 2.705),
    new THREE.Vector2(0.430, 2.755),
    new THREE.Vector2(0.00, 2.770),
  ];
  const cap_bodyGeom = new THREE.LatheGeometry(cap_bodyProfile, 64);
  const cap_body = new THREE.Mesh(cap_bodyGeom, cap_bodyMat);
  cap_body.name = "cap_body";
  cap_group.add(cap_body);

  const cap_lower_grooveGeom = new THREE.TorusGeometry(0.451, 0.006, 8, 64);
  const cap_lower_groove = new THREE.Mesh(cap_lower_grooveGeom, cap_grooveMat);
  cap_lower_groove.name = "cap_lower_groove";
  cap_lower_groove.rotation.x = Math.PI / 2;
  cap_lower_groove.position.y = 2.555;
  cap_group.add(cap_lower_groove);

  const cap_middle_grooveGeom = new THREE.TorusGeometry(0.444, 0.004, 8, 64);
  const cap_middle_groove = new THREE.Mesh(cap_middle_grooveGeom, cap_grooveMat);
  cap_middle_groove.name = "cap_middle_groove";
  cap_middle_groove.rotation.x = Math.PI / 2;
  cap_middle_groove.position.y = 2.625;
  cap_group.add(cap_middle_groove);

  const cap_upper_grooveGeom = new THREE.TorusGeometry(0.437, 0.004, 8, 64);
  const cap_upper_groove = new THREE.Mesh(cap_upper_grooveGeom, cap_grooveMat);
  cap_upper_groove.name = "cap_upper_groove";
  cap_upper_groove.rotation.x = Math.PI / 2;
  cap_upper_groove.position.y = 2.705;
  cap_group.add(cap_upper_groove);

  const cap_ridgesGeom = new THREE.BoxGeometry(0.014, 0.135, 0.020);
  const cap_ridges = new THREE.InstancedMesh(cap_ridgesGeom, cap_ridgesMat, 44);
  cap_ridges.name = "cap_ridges";
  const cap_ridge_dummy = new THREE.Object3D();
  for (let i = 0; i < 44; i++) {
    const angle = i / 44 * Math.PI * 2;
    cap_ridge_dummy.position.set(
      Math.sin(angle) * 0.443,
      2.722,
      Math.cos(angle) * 0.443
    );
    cap_ridge_dummy.rotation.set(0, angle, 0);
    cap_ridge_dummy.scale.set(1, 1, 1);
    cap_ridge_dummy.updateMatrix();
    cap_ridges.setMatrixAt(i, cap_ridge_dummy.matrix);
  }
  cap_ridges.instanceMatrix.needsUpdate = true;
  cap_group.add(cap_ridges);

  const cap_top_rimGeom = new THREE.TorusGeometry(0.417, 0.012, 10, 64);
  const cap_top_rim = new THREE.Mesh(cap_top_rimGeom, cap_ridgesMat);
  cap_top_rim.name = "cap_top_rim";
  cap_top_rim.rotation.x = Math.PI / 2;
  cap_top_rim.position.y = 2.755;
  cap_group.add(cap_top_rim);

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
  const box = new THREE.Box3().setFromObject(root);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 0.95 / maxDim;
  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}