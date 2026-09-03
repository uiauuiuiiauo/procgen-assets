export default function generate(THREE) {
  const root = new THREE.Group();
  const vessel = new THREE.Group();
  root.add(vessel);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfeaf4,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.68,
    thickness: 0.08,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const edge_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x62bddc,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    thickness: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const base_group = new THREE.Group();
  const body_group = new THREE.Group();
  const mouth_group = new THREE.Group();
  vessel.add(base_group, body_group, mouth_group);

  function createClosedSurface(profile, segments, closeBottom, capCenterY) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < profile.length; i++) {
      const ring = profile[i];
      for (let j = 0; j < segments; j++) {
        const angle = j / segments * Math.PI * 2;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const x = ring.rx * cosine;
        const z = ring.rz * sine;
        const y = ring.y + ring.tiltX * cosine + ring.tiltZ * sine;
        positions.push(x, y, z);
      }
    }

    for (let i = 0; i < profile.length - 1; i++) {
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        const a = i * segments + j;
        const b = i * segments + next;
        const c = (i + 1) * segments + next;
        const d = (i + 1) * segments + j;
        indices.push(a, d, b, b, d, c);
      }
    }

    if (closeBottom) {
      const centerIndex = positions.length / 3;
      positions.push(0, capCenterY, 0);
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        indices.push(centerIndex, j, next);
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

  function createEllipticalAnnulus(
    outerRx,
    outerRz,
    innerRx,
    innerRz,
    y,
    tiltX,
    tiltZ,
    segments
  ) {
    const positions = [];
    const indices = [];

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const riseX = tiltX * cosine;
      const riseZ = tiltZ * sine;
      positions.push(
        outerRx * cosine,
        y + riseX,
        outerRz * sine
      );
      positions.push(
        innerRx * cosine,
        y + riseX,
        innerRz * sine
      );
    }

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      const outer = i * 2;
      const inner = outer + 1;
      const nextOuter = next * 2;
      const nextInner = nextOuter + 1;
      indices.push(outer, inner, nextOuter);
      indices.push(nextOuter, inner, nextInner);
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

  function createEllipseCurve(rx, rz, y, tiltX, tiltZ, segments) {
    const points = [];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      points.push(
        new THREE.Vector3(
          rx * cosine,
          y + tiltX * cosine + tiltZ * sine,
          rz * sine
        )
      );
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const base_plinthProfile = [
    { rx: 0.300, rz: 0.235, y: 0.000, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.340, rz: 0.265, y: 0.018, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.350, rz: 0.272, y: 0.060, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.340, rz: 0.265, y: 0.120, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.310, rz: 0.245, y: 0.180, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.285, rz: 0.225, y: 0.230, tiltX: 0.000, tiltZ: 0.000 },
  ];
  const base_plinthGeom = createClosedSurface(
    base_plinthProfile,
    64,
    true,
    0.000
  );
  const base_plinth = new THREE.Mesh(base_plinthGeom, edge_glassMat);
  base_group.add(base_plinth);

  const base_foot_rimCurve = createEllipseCurve(
    0.347,
    0.270,
    0.052,
    0,
    0,
    48
  );
  const base_foot_rimGeom = new THREE.TubeGeometry(
    base_foot_rimCurve,
    96,
    0.018,
    10,
    true
  );
  const base_foot_rim = new THREE.Mesh(base_foot_rimGeom, edge_glassMat);
  base_group.add(base_foot_rim);

  const base_inner_ringCurve = createEllipseCurve(
    0.225,
    0.175,
    0.214,
    0,
    0,
    48
  );
  const base_inner_ringGeom = new THREE.TubeGeometry(
    base_inner_ringCurve,
    72,
    0.009,
    8,
    true
  );
  const base_inner_ring = new THREE.Mesh(
    base_inner_ringGeom,
    edge_glassMat
  );
  base_group.add(base_inner_ring);

  const bodyProfile = [
    { rx: 0.285, rz: 0.225, y: 0.190, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.275, rz: 0.216, y: 0.300, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.245, rz: 0.193, y: 0.500, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.205, rz: 0.163, y: 0.700, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.175, rz: 0.140, y: 0.880, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.160, rz: 0.128, y: 1.030, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.155, rz: 0.124, y: 1.160, tiltX: 0.000, tiltZ: 0.000 },
    { rx: 0.162, rz: 0.128, y: 1.280, tiltX: 0.002, tiltZ: 0.000 },
    { rx: 0.180, rz: 0.140, y: 1.400, tiltX: 0.008, tiltZ: 0.002 },
    { rx: 0.205, rz: 0.157, y: 1.500, tiltX: 0.020, tiltZ: 0.006 },
  ];
  const bodyGeom = createClosedSurface(bodyProfile, 64, false, 0);
  const body = new THREE.Mesh(bodyGeom, glassMat);
  body_group.add(body);

  const mouthRings = [
    { rx: 0.255, rz: 0.198, y: 1.575, tiltX: 0.060, tiltZ: 0.018 },
    { rx: 0.248, rz: 0.193, y: 1.548, tiltX: 0.048, tiltZ: 0.014 },
    { rx: 0.228, rz: 0.178, y: 1.512, tiltX: 0.030, tiltZ: 0.009 },
    { rx: 0.205, rz: 0.157, y: 1.482, tiltX: 0.020, tiltZ: 0.006 },
  ];

  const mouth_flareGeom = createClosedSurface(mouthRings, 64, false, 0);
  const mouth_flare = new THREE.Mesh(mouth_flareGeom, glassMat);
  mouth_group.add(mouth_flare);

  const mouth_lip_surfaceGeom = createEllipticalAnnulus(
    0.265,
    0.207,
    0.214,
    0.164,
    1.578,
    0.062,
    0.019,
    64
  );
  const mouth_lip_surface = new THREE.Mesh(
    mouth_lip_surfaceGeom,
    edge_glassMat
  );
  mouth_group.add(mouth_lip_surface);

  const mouth_outer_rimCurve = createEllipseCurve(
    0.258,
    0.201,
    1.578,
    0.061,
    0.019,
    56
  );
  const mouth_outer_rimGeom = new THREE.TubeGeometry(
    mouth_outer_rimCurve,
    112,
    0.016,
    10,
    true
  );
  const mouth_outer_rim = new THREE.Mesh(
    mouth_outer_rimGeom,
    edge_glassMat
  );
  mouth_group.add(mouth_outer_rim);

  const mouth_inner_rimCurve = createEllipseCurve(
    0.214,
    0.164,
    1.578,
    0.061,
    0.019,
    56
  );
  const mouth_inner_rimGeom = new THREE.TubeGeometry(
    mouth_inner_rimCurve,
    112,
    0.007,
    8,
    true
  );
  const mouth_inner_rim = new THREE.Mesh(
    mouth_inner_rimGeom,
    edge_glassMat
  );
  mouth_group.add(mouth_inner_rim);

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