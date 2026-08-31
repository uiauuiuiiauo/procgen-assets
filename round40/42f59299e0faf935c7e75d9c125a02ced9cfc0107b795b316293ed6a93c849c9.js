export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "burgundy_fedora_hat";

  const feltMat = new THREE.MeshStandardMaterial({
    color: 0x7d1733,
    metalness: 0.0,
    roughness: 0.95,
  });
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x68152d,
    metalness: 0.0,
    roughness: 0.95,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x571226,
    metalness: 0.0,
    roughness: 0.95,
  });
  const eyeletMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.5,
    roughness: 0.25,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const featherMat = new THREE.MeshStandardMaterial({
    color: 0x211b1d,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const featherShaftMat = new THREE.MeshStandardMaterial({
    color: 0xb9aa96,
    metalness: 0.0,
    roughness: 0.8,
  });

  function createBrimGeometry() {
    const segments = 96;
    const rings = 12;
    const radiusX = 1.72;
    const radiusZ = 1.15;
    const thickness = 0.055;
    const positions = [];
    const indices = [];

    function surfaceY(r, angle) {
      const sideCurl = 0.085 * Math.pow(Math.cos(angle), 4);
      const frontDip = -0.018 * Math.pow(Math.max(0, Math.sin(angle)), 4);
      return 0.105 + Math.pow(r, 4) * (sideCurl - frontDip);
    }

    for (let side = 0; side < 2; side++) {
      for (let j = 0; j <= rings; j++) {
        const r = j / rings;
        for (let i = 0; i < segments; i++) {
          const angle = i / segments * Math.PI * 2;
          const x = Math.cos(angle) * radiusX * r;
          const z = Math.sin(angle) * radiusZ * r;
          const y = surfaceY(r, angle) - side * thickness;
          positions.push(x, y, z);
        }
      }
    }

    const sideOffset = (rings + 1) * segments;
    for (let j = 0; j < rings; j++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = j * segments + i;
        const b = (j + 1) * segments + i;
        const c = (j + 1) * segments + next;
        const d = j * segments + next;
        indices.push(a, c, b, a, d, c);

        const ba = sideOffset + a;
        const bb = sideOffset + b;
        const bc = sideOffset + c;
        const bd = sideOffset + d;
        indices.push(ba, bb, bc, ba, bc, bd);
      }
    }

    const outerTop = rings * segments;
    const outerBottom = sideOffset + outerTop;
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const t0 = outerTop + i;
      const t1 = outerTop + next;
      const b0 = outerBottom + i;
      const b1 = outerBottom + next;
      indices.push(t0, t1, b0, t1, b1, b0);
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

  function createCrownGeometry() {
    const segments = 96;
    const levels = [
      { y: 0.11, rx: 0.96, rz: 0.69 },
      { y: 0.30, rx: 0.95, rz: 0.68 },
      { y: 0.62, rx: 0.89, rz: 0.63 },
      { y: 0.88, rx: 0.80, rz: 0.56 },
      { y: 1.01, rx: 0.73, rz: 0.50 },
    ];
    const positions = [];
    const indices = [];

    for (let level = 0; level < levels.length; level++) {
      const data = levels[level];
      const upper = level >= levels.length - 1;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const front = Math.pow(Math.max(0, Math.sin(angle)), 2);
        let rx = data.rx;
        let rz = data.rz;
        let y = data.y;

        if (level === 2) {
          const pinch = 1 - 0.055 * front;
          rx *= pinch;
          rz *= pinch;
        }

        if (upper) {
          const groove = 0.14 * Math.exp(
            -Math.pow(Math.abs(angle) / 0.52, 2)
          );
          const rearRise = 0.035 * Math.pow(
            Math.max(0, -Math.cos(angle)),
            2
          );
          y += rearRise;
          if (Math.abs(angle) < 0.78) {
            y -= groove * (0.78 - Math.abs(angle)) / 0.78;
          }
          rx *= 1 - 0.025 * groove;
          rz *= 1 - 0.045 * groove;
        }

        positions.push(
          Math.cos(angle) * rx,
          y,
          Math.sin(angle) * rz
        );
      }
    }

    for (let level = 0; level < levels.length - 1; level++) {
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = level * segments + i;
        const b = (level + 1) * segments + i;
        const c = (level + 1) * segments + next;
        const d = level * segments + next;
        indices.push(a, b, c, a, c, d);
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

  function createCrownTopGeometry() {
    const segments = 96;
    const radialSteps = 14;
    const radiusX = 0.73;
    const radiusZ = 0.50;
    const positions = [0, 0.855, 0];
    const indices = [];

    for (let ring = 1; ring <= radialSteps; ring++) {
      const r = ring / radialSteps;
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2;
        const groove = 0.14 * Math.exp(
          -Math.pow(Math.abs(angle) / 0.52, 2)
        );
        const rearRise = 0.035 * Math.pow(
          Math.max(0, -Math.cos(angle)),
          2
        );
        const edgeY =
          1.01 +
          rearRise -
          groove * (0.78 - Math.min(Math.abs(angle), 0.78)) / 0.78;
        const y = 0.855 + (edgeY - 0.855) * Math.pow(r, 1.55);
        positions.push(
          Math.cos(angle) * radiusX * r,
          y,
          Math.sin(angle) * radiusZ * r
        );
      }
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(0, 1 + next, 1 + i);
    }

    for (let ring = 1; ring < radialSteps; ring++) {
      const innerStart = 1 + (ring - 1) * segments;
      const outerStart = 1 + ring * segments;
      for (let i = 0; i < segments; i++) {
        const next = (i + 1) % segments;
        const a = innerStart + i;
        const b = outerStart + i;
        const c = outerStart + next;
        const d = innerStart + next;
        indices.push(a, c, b, a, d, c);
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

  function createEllipseTube(rx, rz, y, radius, material) {
    const points = [];
    const count = 64;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * rx,
        y,
        Math.sin(angle) * rz
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 96, radius, 8, true),
      material
    );
  }

  function createBrimEdge() {
    const points = [];
    const count = 96;
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2;
      const sideCurl = 0.085 * Math.pow(Math.cos(angle), 4);
      const frontDip = -0.018 * Math.pow(
        Math.max(0, Math.sin(angle)),
        4
      );
      points.push(new THREE.Vector3(
        Math.cos(angle) * 1.72,
        0.105 + sideCurl - frontDip,
        Math.sin(angle) * 1.15
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 128, 0.031, 8, true),
      seamMat
    );
  }

  function createCrownCrease(angle) {
    const points = [];
    const samples = 10;
    for (let i = 0; i < samples; i++) {
      const t = i / (samples - 1);
      const y = 0.84 + t * 0.17;
      const rx = 0.69 + t * 0.04;
      const rz = 0.46 + t * 0.04;
      const x = Math.cos(angle) * rx;
      const z = Math.sin(angle) * rz;
      const normal = new THREE.Vector3(
        x / (rx * rx),
        0,
        z / (rz * rz)
      ).normalize();
      points.push(
        new THREE.Vector3(x, y, z).addScaledVector(normal, 0.008)
      );
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(curve, 24, 0.007, 6, false),
      seamMat
    );
  }

  function createFeatherGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);

    const leftEdges = [
      [-0.018, 0.08],
      [-0.045, 0.16],
      [-0.032, 0.22],
      [-0.082, 0.30],
      [-0.060, 0.37],
      [-0.125, 0.46],
      [-0.090, 0.54],
      [-0.155, 0.64],
      [-0.112, 0.72],
      [-0.160, 0.82],
      [-0.110, 0.91],
      [-0.092, 1.00],
      [-0.045, 1.09],
      [0, 1.16],
    ];
    const rightEdges = [
      [0.020, 0.08],
      [0.040, 0.16],
      [0.026, 0.23],
      [0.075, 0.31],
      [0.052, 0.38],
      [0.105, 0.47],
      [0.070, 0.55],
      [0.125, 0.65],
      [0.082, 0.73],
      [0.115, 0.82],
      [0.075, 0.91],
      [0.060, 1.00],
      [0.030, 1.09],
      [0, 1.16],
    ];

    for (let i = 1; i < leftEdges.length; i++) {
      shape.lineTo(leftEdges[i][0], leftEdges[i][1]);
    }
    for (let i = 1; i < rightEdges.length - 1; i++) {
      shape.lineTo(rightEdges[i][0], rightEdges[i][1]);
    }
    shape.closePath();

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.012,
      steps: 1,
      bevelEnabled: false,
    });
  }

  const brimGeom = createBrimGeometry();
  const brim = new THREE.Mesh(brimGeom, feltMat);
  brim.name = "brim";
  root.add(brim);

  const brim_edge = createBrimEdge();
  brim_edge.name = "brim_edge";
  root.add(brim_edge);

  const crownGeom = createCrownGeometry();
  const crown = new THREE.Mesh(crownGeom, feltMat);
  crown.name = "crown";
  root.add(crown);

  const crown_topGeom = createCrownTopGeometry();
  const crown_top = new THREE.Mesh(crown_topGeom, feltMat);
  crown_top.name = "crown_top";
  root.add(crown_top);

  const left_crown_crease = createCrownCrease(-0.48);
  left_crown_crease.name = "left_crown_crease";
  root.add(left_crown_crease);

  const right_crown_crease = createCrownCrease(0.48);
  right_crown_crease.name = "right_crown_crease";
  root.add(right_crown_crease);

  const hat_bandGeom = new THREE.CylinderGeometry(
    0.94,
    0.975,
    0.27,
    64,
    1,
    true
  );
  const hat_band = new THREE.Mesh(hat_bandGeom, bandMat);
  hat_band.name = "hat_band";
  hat_band.position.y = 0.31;
  hat_band.scale.z = 0.715;
  root.add(hat_band);

  const band_bottom_seam = createEllipseTube(
    0.976,
    0.699,
    0.175,
    0.012,
    seamMat
  );
  band_bottom_seam.name = "band_bottom_seam";
  root.add(band_bottom_seam);

  const band_top_seam = createEllipseTube(
    0.942,
    0.675,
    0.445,
    0.011,
    seamMat
  );
  band_top_seam.name = "band_top_seam";
  root.add(band_top_seam);

  const bow_group = new THREE.Group();
  bow_group.name = "bow_group";
  const bowAngle = 0.72;
  const bowNormal = new THREE.Vector3(
    Math.cos(bowAngle),
    0,
    Math.sin(bowAngle)
  ).normalize();
  bow_group.position.set(
    Math.cos(bowAngle) * 0.955,
    0.33,
    Math.sin(bowAngle) * 0.685
  );
  bow_group.position.addScaledVector(bowNormal, 0.035);
  bow_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bowNormal
  );

  const bow_left_loopShape = new THREE.Shape();
  bow_left_loopShape.moveTo(-0.015, 0.015);
  bow_left_loopShape.bezierCurveTo(
    -0.10, 0.13,
    -0.34, 0.15,
    -0.42, 0.035
  );
  bow_left_loopShape.bezierCurveTo(
    -0.40, -0.10,
    -0.14, -0.13,
    -0.015, -0.025
  );
  bow_left_loopShape.closePath();

  const bow_left_loopGeom = new THREE.ExtrudeGeometry(
    bow_left_loopShape,
    {
      depth: 0.035,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    }
  );
  const bow_left_loop = new THREE.Mesh(bow_left_loopGeom, bandMat);
  bow_left_loop.name = "bow_left_loop";
  bow_group.add(bow_left_loop);

  const bow_right_loopShape = new THREE.Shape();
  bow_right_loopShape.moveTo(0.015, 0.012);
  bow_right_loopShape.bezierCurveTo(
    0.10, 0.10,
    0.28, 0.10,
    0.33, 0.01
  );
  bow_right_loopShape.bezierCurveTo(
    0.29, -0.09,
    0.10, -0.10,
    0.015, -0.022
  );
  bow_right_loopShape.closePath();

  const bow_right_loopGeom = new THREE.ExtrudeGeometry(
    bow_right_loopShape,
    {
      depth: 0.035,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.008,
      bevelSize: 0.008,
      bevelSegments: 2,
    }
  );
  const bow_right_loop = new THREE.Mesh(bow_right_loopGeom, bandMat);
  bow_right_loop.name = "bow_right_loop";
  bow_group.add(bow_right_loop);

  const bow_knotGeom = new THREE.SphereGeometry(1, 20, 12);
  const bow_knot = new THREE.Mesh(bow_knotGeom, bandMat);
  bow_knot.name = "bow_knot";
  bow_knot.scale.set(0.075, 0.105, 0.052);
  bow_knot.position.z = 0.045;
  bow_group.add(bow_knot);
  root.add(bow_group);

  const eyelet_group = new THREE.Group();
  eyelet_group.name = "eyelet_group";
  const eyeletAngle = 0.60;
  const eyeletNormal = new THREE.Vector3(
    Math.cos(eyeletAngle),
    0,
    Math.sin(eyeletAngle)
  ).normalize();
  eyelet_group.position.set(
    Math.cos(eyeletAngle) * 0.875,
    0.65,
    Math.sin(eyeletAngle) * 0.625
  );
  eyelet_group.position.addScaledVector(eyeletNormal, 0.018);
  eyelet_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    eyeletNormal
  );

  const eyelet_holeGeom = new THREE.CircleGeometry(0.026, 20);
  const eyelet_hole = new THREE.Mesh(eyelet_holeGeom, holeMat);
  eyelet_hole.name = "eyelet_hole";
  eyelet_hole.position.z = 0.002;
  eyelet_group.add(eyelet_hole);

  const eyelet_ringGeom = new THREE.TorusGeometry(
    0.034,
    0.008,
    8,
    24
  );
  const eyelet_ring = new THREE.Mesh(eyelet_ringGeom, eyeletMat);
  eyelet_ring.name = "eyelet_ring";
  eyelet_ring.position.z = 0.008;
  eyelet_group.add(eyelet_ring);
  root.add(eyelet_group);

  const feather_group = new THREE.Group();
  feather_group.name = "feather_group";
  feather_group.position.set(0.65, 0.32, 0.58);
  feather_group.rotation.y = -0.08;

  const feather_vaneGeom = createFeatherGeometry();
  const feather_vane = new THREE.Mesh(feather_vaneGeom, featherMat);
  feather_vane.name = "feather_vane";
  feather_vane.rotation.z = -0.28;
  feather_vane.position.z = -0.006;
  feather_group.add(feather_vane);

  const feather_shaftPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.000, 0.00, 0.018),
      new THREE.Vector3(0.025, 0.18, 0.018),
      new THREE.Vector3(0.060, 0.40, 0.018),
      new THREE.Vector3(0.105, 0.64, 0.018),
      new THREE.Vector3(0.155, 0.86, 0.018),
      new THREE.Vector3(0.205, 1.05, 0.018),
    ],
    false,
    "centripetal"
  );
  const feather_shaftGeom = new THREE.TubeGeometry(
    feather_shaftPath,
    40,
    0.009,
    7,
    false
  );
  const feather_shaft = new THREE.Mesh(
    feather_shaftGeom,
    featherShaftMat
  );
  feather_shaft.name = "feather_shaft";
  feather_group.add(feather_shaft);

  const feather_barbsGeom = new THREE.CylinderGeometry(
    0.004,
    0.004,
    1,
    6
  );
  const feather_barbs = new THREE.InstancedMesh(
    feather_barbsGeom,
    featherShaftMat,
    16
  );
  feather_barbs.name = "feather_barbs";

  const up = new THREE.Vector3(0, 1, 0);
  const barbMatrix = new THREE.Matrix4();
  const barbQuaternion = new THREE.Quaternion();
  const barbScale = new THREE.Vector3();
  const barbMidpoint = new THREE.Vector3();
  const barbDirection = new THREE.Vector3();

  function setBarb(index, start, end) {
    barbDirection.subVectors(end, start);
    const length = barbDirection.length();
    barbDirection.normalize();
    barbMidpoint.addVectors(start, end).multiplyScalar(0.5);
    barbQuaternion.setFromUnitVectors(up, barbDirection);
    barbScale.set(1, length, 1);
    barbMatrix.compose(barbMidpoint, barbQuaternion, barbScale);
    feather_barbs.setMatrixAt(index, barbMatrix);
  }

  for (let i = 0; i < 8; i++) {
    const t = (i + 1) / 9;
    const y = 0.12 + t * 0.88;
    const shaftX = 0.018 + t * 0.19;
    const width = 0.035 + 0.105 * Math.sin(Math.PI * t);
    const z = 0.020 + t * 0.006;

    setBarb(
      i * 2,
      new THREE.Vector3(shaftX, y, z),
      new THREE.Vector3(
        shaftX - width,
        y + 0.045 + t * 0.025,
        z
      )
    );
    setBarb(
      i * 2 + 1,
      new THREE.Vector3(shaftX, y, z),
      new THREE.Vector3(
        shaftX + width * 0.72,
        y + 0.035 + t * 0.020,
        z
      )
    );
  }
  feather_barbs.instanceMatrix.needsUpdate = true;
  feather_group.add(feather_barbs);
  root.add(feather_group);

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