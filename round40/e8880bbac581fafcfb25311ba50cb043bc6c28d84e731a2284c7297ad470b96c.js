export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "blue_teardrop";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x168fd2,
    metalness: 0.0,
    roughness: 0.3,
  });

  const radialSegments = 72;
  const ringCount = 48;
  const positions = [];
  const indices = [];

  function appendVertex(x, y, z) {
    positions.push(x, y, z);
    return positions.length / 3 - 1;
  }

  const bottom_tip_index = appendVertex(0, -0.5, 0);
  const ring_start = positions.length / 3;

  for (let i = 0; i < ringCount; i++) {
    const t = (i + 1) / (ringCount + 1);
    const sine = Math.sin(Math.PI * t);
    const cosine = Math.cos(Math.PI * t);
    const y = -0.5 + t;
    const center_x = 0.24 * t * t;
    const radius_x = 0.5 * sine * (1 - 0.6 * t);
    const radius_z = 0.42 * sine * (1 - 0.3 * t);

    for (let j = 0; j < radialSegments; j++) {
      const angle = j / radialSegments * Math.PI * 2;
      const cos_angle = Math.cos(angle);
      const sin_angle = Math.sin(angle);
      const cleft =
        0.035 *
        Math.exp(-Math.pow((y - 0.1) / 0.13, 2)) *
        Math.max(0, sin_angle);

      const x = center_x + radius_x * cos_angle - cleft;
      const z = radius_z * sin_angle;
      appendVertex(x, y, z);
    }
  }

  for (let j = 0; j < radialSegments; j++) {
    const next = (j + 1) % radialSegments;
    indices.push(
      bottom_tip_index,
      ring_start + j,
      ring_start + next
    );
  }

  for (let i = 0; i < ringCount - 1; i++) {
    const lower_ring = ring_start + i * radialSegments;
    const upper_ring = lower_ring + radialSegments;

    for (let j = 0; j < radialSegments; j++) {
      const next = (j + 1) % radialSegments;
      const lower_current = lower_ring + j;
      const lower_next = lower_ring + next;
      const upper_current = upper_ring + j;
      const upper_next = upper_ring + next;

      indices.push(
        lower_current,
        upper_current,
        upper_next,
        lower_current,
        upper_next,
        lower_next
      );
    }
  }

  const top_tip_index = appendVertex(0.24, 0.5, 0);
  const last_ring = ring_start + (ringCount - 1) * radialSegments;

  for (let j = 0; j < radialSegments; j++) {
    const next = (j + 1) % radialSegments;
    indices.push(
      last_ring + j,
      top_tip_index,
      last_ring + next
    );
  }

  const bodyGeom = new THREE.BufferGeometry();
  bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  bodyGeom.setIndex(indices);
  bodyGeom.computeVertexNormals();
  bodyGeom.computeBoundingBox();
  bodyGeom.computeBoundingSphere();

  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

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