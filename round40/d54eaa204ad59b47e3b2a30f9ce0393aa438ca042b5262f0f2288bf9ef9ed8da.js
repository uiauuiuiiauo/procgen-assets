export default function generate(THREE) {
  const root = new THREE.Group();

  const glass_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9e8f5,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0x4ba8cf,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const radialSegments = 96;

  function topPoint(angle, radius, y) {
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const tilt = 0.15 * cosine - 0.075 * sine;
    return new THREE.Vector3(
      radius * cosine,
      y + tilt,
      0.88 * radius * sine
    );
  }

  function createSweptSurface(rings, segments, capBottom, capTop) {
    const positions = [];
    const indices = [];

    for (let ringIndex = 0; ringIndex < rings.length; ringIndex++) {
      const ring = rings[ringIndex];
      for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
        const angle = segmentIndex / segments * Math.PI * 2;
        const point = topPoint(angle, ring.radius, ring.y);
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex++) {
      for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
        const next = (segmentIndex + 1) % segments;
        const lower = ringIndex * segments + segmentIndex;
        const lowerNext = ringIndex * segments + next;
        const upper = (ringIndex + 1) * segments + segmentIndex;
        const upperNext = (ringIndex + 1) * segments + next;
        indices.push(lower, upper, upperNext);
        indices.push(lower, upperNext, lowerNext);
      }
    }

    if (capBottom) {
      const centerIndex = positions.length / 3;
      positions.push(0, rings[0].y, 0);
      for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
        const next = (segmentIndex + 1) % segments;
        indices.push(centerIndex, segmentIndex, next);
      }
    }

    if (capTop) {
      const centerIndex = positions.length / 3;
      const topOffset = (rings.length - 1) * segments;
      positions.push(0, rings[rings.length - 1].y, 0);
      for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
        const next = (segmentIndex + 1) % segments;
        indices.push(centerIndex, topOffset + next, topOffset + segmentIndex);
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

  function createAnnularSurface(
    outerRadius,
    innerRadius,
    outerY,
    innerY,
    segments
  ) {
    const positions = [];
    const indices = [];

    for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
      const angle = segmentIndex / segments * Math.PI * 2;
      const outer = topPoint(angle, outerRadius, outerY);
      const inner = topPoint(angle, innerRadius, innerY);
      positions.push(
        outer.x, outer.y, outer.z,
        inner.x, inner.y, inner.z
      );
    }

    for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
      const next = (segmentIndex + 1) % segments;
      const outer = segmentIndex * 2;
      const inner = outer + 1;
      const outerNext = next * 2;
      const innerNext = outerNext + 1;
      indices.push(outer, inner, innerNext);
      indices.push(outer, innerNext, outerNext);
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

  function createClosedRim(radius, y, tubeRadius, segments) {
    const points = [];
    for (let segmentIndex = 0; segmentIndex < segments; segmentIndex++) {
      const angle = segmentIndex / segments * Math.PI * 2;
      points.push(topPoint(angle, radius, y));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      true,
      "centripetal"
    );
    return new THREE.TubeGeometry(
      curve,
      segments * 2,
      tubeRadius,
      12,
      true
    );
  }

  const base_footProfile = [
    new THREE.Vector2(0.00, 0.000),
    new THREE.Vector2(0.49, 0.000),
    new THREE.Vector2(0.57, 0.018),
    new THREE.Vector2(0.61, 0.060),
    new THREE.Vector2(0.615, 0.115),
    new THREE.Vector2(0.59, 0.180),
    new THREE.Vector2(0.53, 0.270),
    new THREE.Vector2(0.47, 0.300),
    new THREE.Vector2(0.00, 0.300)
  ];
  const base_footGeom = new THREE.LatheGeometry(base_footProfile, 64);
  const base_footMat = glass_bodyMat;
  const base_foot = new THREE.Mesh(base_footGeom, base_footMat);
  root.add(base_foot);

  const base_bottom_ringGeom = new THREE.TorusGeometry(
    0.555,
    0.025,
    12,
    64
  );
  const base_bottom_ringMat = glass_edgeMat;
  const base_bottom_ring = new THREE.Mesh(
    base_bottom_ringGeom,
    base_bottom_ringMat
  );
  base_bottom_ring.rotation.x = Math.PI / 2;
  base_bottom_ring.position.y = 0.055;
  root.add(base_bottom_ring);

  const base_upper_ringGeom = new THREE.TorusGeometry(
    0.475,
    0.014,
    10,
    64
  );
  const base_upper_ringMat = glass_edgeMat;
  const base_upper_ring = new THREE.Mesh(
    base_upper_ringGeom,
    base_upper_ringMat
  );
  base_upper_ring.rotation.x = Math.PI / 2;
  base_upper_ring.position.y = 0.292;
  root.add(base_upper_ring);

  const inner_base_discGeom = new THREE.CylinderGeometry(
    0.385,
    0.385,
    0.018,
    64
  );
  const inner_base_discMat = glass_bodyMat;
  const inner_base_disc = new THREE.Mesh(
    inner_base_discGeom,
    inner_base_discMat
  );
  inner_base_disc.position.y = 0.307;
  root.add(inner_base_disc);

  const inner_base_ringGeom = new THREE.TorusGeometry(
    0.36,
    0.012,
    10,
    64
  );
  const inner_base_ringMat = glass_edgeMat;
  const inner_base_ring = new THREE.Mesh(
    inner_base_ringGeom,
    inner_base_ringMat
  );
  inner_base_ring.rotation.x = Math.PI / 2;
  inner_base_ring.position.y = 0.319;
  root.add(inner_base_ring);

  const outerRings = [
    { radius: 0.450, y: 0.270 },
    { radius: 0.485, y: 0.400 },
    { radius: 0.465, y: 0.620 },
    { radius: 0.420, y: 0.900 },
    { radius: 0.370, y: 1.200 },
    { radius: 0.335, y: 1.500 },
    { radius: 0.315, y: 1.750 },
    { radius: 0.315, y: 1.950 },
    { radius: 0.330, y: 2.180 },
    { radius: 0.355, y: 2.400 },
    { radius: 0.390, y: 2.620 },
    { radius: 0.430, y: 2.820 },
    { radius: 0.470, y: 2.980 },
    { radius: 0.500, y: 3.080 }
  ];

  const innerRings = [
    { radius: 0.410, y: 0.340 },
    { radius: 0.445, y: 0.430 },
    { radius: 0.425, y: 0.620 },
    { radius: 0.382, y: 0.900 },
    { radius: 0.334, y: 1.200 },
    { radius: 0.299, y: 1.500 },
    { radius: 0.280, y: 1.750 },
    { radius: 0.280, y: 1.950 },
    { radius: 0.295, y: 2.180 },
    { radius: 0.318, y: 2.400 },
    { radius: 0.350, y: 2.620 },
    { radius: 0.388, y: 2.820 },
    { radius: 0.425, y: 2.980 },
    { radius: 0.450, y: 3.080 }
  ];

  const glass_bodyGeom = createSweptSurface(
    outerRings,
    radialSegments,
    false,
    false
  );
  const glass_body = new THREE.Mesh(glass_bodyGeom, glass_bodyMat);
  root.add(glass_body);

  const inner_wallGeom = createSweptSurface(
    innerRings,
    radialSegments,
    false,
    false
  );
  const inner_wallMat = glass_bodyMat;
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_wallMat);
  root.add(inner_wall);

  const top_lipGeom = createAnnularSurface(
    0.500,
    0.450,
    3.080,
    3.080,
    radialSegments
  );
  const top_lipMat = glass_bodyMat;
  const top_lip = new THREE.Mesh(top_lipGeom, top_lipMat);
  root.add(top_lip);

  const top_rimGeom = createClosedRim(
    0.500,
    3.080,
    0.026,
    72
  );
  const top_rimMat = glass_edgeMat;
  const top_rim = new THREE.Mesh(top_rimGeom, top_rimMat);
  root.add(top_rim);

  const inner_rimGeom = createClosedRim(
    0.450,
    3.080,
    0.012,
    72
  );
  const inner_rimMat = glass_edgeMat;
  const inner_rim = new THREE.Mesh(inner_rimGeom, inner_rimMat);
  root.add(inner_rim);

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