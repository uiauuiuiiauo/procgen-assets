export default function generate(THREE) {
  const root = new THREE.Group();
  const vessel = new THREE.Group();
  root.add(vessel);

  const outer_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const inner_linerMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const top_rimMat = new THREE.MeshStandardMaterial({
    color: 0x181818,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });

  const base_footMat = outer_bodyMat;

  function outerRadiusAt(y) {
    const t = Math.max(0, Math.min(1, (y + 0.61) / 1.22));
    const smooth = t * t * (3 - 2 * t);
    return 0.245 + 0.14 * smooth + 0.018 * Math.sin(Math.PI * t);
  }

  function centerXAt(y) {
    const t = Math.max(0, Math.min(1, (y + 0.61) / 1.22));
    return -0.09 * t * t;
  }

  function outerZAt(y) {
    return 0.012 * Math.sin(Math.PI * (y + 0.61) / 1.22);
  }

  function createOuterBodyGeometry() {
    const radialSegments = 64;
    const heightSegments = 40;
    const positions = [];
    const indices = [];

    for (let j = 0; j <= heightSegments; j++) {
      const t = j / heightSegments;
      const y = -0.61 + 1.22 * t;
      const radius = outerRadiusAt(y);
      const centerX = centerXAt(y);
      const centerZ = outerZAt(y);

      for (let i = 0; i < radialSegments; i++) {
        const angle = i / radialSegments * Math.PI * 2;
        positions.push(
          centerX + Math.cos(angle) * radius,
          y,
          centerZ + Math.sin(angle) * radius
        );
      }
    }

    for (let j = 0; j < heightSegments; j++) {
      for (let i = 0; i < radialSegments; i++) {
        const next = (i + 1) % radialSegments;
        const a = j * radialSegments + i;
        const b = j * radialSegments + next;
        const c = (j + 1) * radialSegments + next;
        const d = (j + 1) * radialSegments + i;
        indices.push(a, d, b, b, d, c);
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

  const outer_bodyGeom = createOuterBodyGeometry();
  const outer_body = new THREE.Mesh(outer_bodyGeom, outer_bodyMat);
  vessel.add(outer_body);

  const inner_linerProfile = [
    new THREE.Vector2(0, -0.25),
    new THREE.Vector2(0.16, -0.25),
    new THREE.Vector2(0.22, -0.17),
    new THREE.Vector2(0.255, 0.02),
    new THREE.Vector2(0.292, 0.32),
    new THREE.Vector2(0.318, 0.55),
    new THREE.Vector2(0.322, 0.603),
  ];
  const inner_linerGeom = new THREE.LatheGeometry(inner_linerProfile, 64);
  const inner_liner = new THREE.Mesh(inner_linerGeom, inner_linerMat);
  inner_liner.position.x = -0.09;
  vessel.add(inner_liner);

  const top_rimProfile = [
    new THREE.Vector2(0.322, 0.592),
    new THREE.Vector2(0.322, 0.616),
    new THREE.Vector2(0.331, 0.638),
    new THREE.Vector2(0.351, 0.650),
    new THREE.Vector2(0.378, 0.642),
    new THREE.Vector2(0.394, 0.619),
    new THREE.Vector2(0.390, 0.594),
    new THREE.Vector2(0.374, 0.579),
    new THREE.Vector2(0.345, 0.579),
    new THREE.Vector2(0.327, 0.587),
    new THREE.Vector2(0.322, 0.592),
  ];
  const top_rimGeom = new THREE.LatheGeometry(top_rimProfile, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, top_rimMat);
  top_rim.position.x = -0.09;
  vessel.add(top_rim);

  const base_footGeom = new THREE.CylinderGeometry(
    0.238,
    0.231,
    0.018,
    64
  );
  const base_foot = new THREE.Mesh(base_footGeom, base_footMat);
  base_foot.position.set(0, -0.616, 0);
  vessel.add(base_foot);

  vessel.rotation.z = -0.16;
  vessel.rotation.y = 0.08;

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
  root.position.set(
    -center.x * scale,
    -center.y * scale,
    -center.z * scale
  );
}