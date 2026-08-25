export default function generate(THREE) {
  const root = new THREE.Group();

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });

  const bowl_center_z = -0.58;
  const bowl_radius_x = 0.39;
  const bowl_radius_z = 0.46;
  const bowl_depth = 0.22;
  const bowl_shell_thickness = 0.024;
  const bowl_rim_y = 0.03;

  function bowlSurfaceY(radius, upward) {
    const inner = 1 - upward;
    const q = Math.max(0, Math.min(1, 1 - radius * radius));
    const y = bowl_rim_y - bowl_depth * q;
    const offset = bowl_shell_thickness * (0.75 - 0.25 * q);
    return y + (inner ? -offset : offset);
  }

  function createBowlGeometry() {
    const radialSegments = 64;
    const radialRings = 20;
    const positions = [];
    const indices = [];
    const surfaceVertexCount = (radialRings + 1) * radialSegments;

    for (let surface = 0; surface < 2; surface++) {
      const upward = surface === 0;
      for (let ring = 0; ring <= radialRings; ring++) {
        const radius = ring / radialRings;
        for (let segment = 0; segment < radialSegments; segment++) {
          const angle = segment / radialSegments * Math.PI * 2;
          positions.push(
            Math.cos(angle) * bowl_radius_x * radius,
            bowlSurfaceY(radius, upward),
            Math.sin(angle) * bowl_radius_z * radius
          );
        }
      }
    }

    for (let ring = 0; ring < radialRings; ring++) {
      for (let segment = 0; segment < radialSegments; segment++) {
        const next = (segment + 1) % radialSegments;
        const a = ring * radialSegments + segment;
        const b = (ring + 1) * radialSegments + segment;
        const c = (ring + 1) * radialSegments + next;
        const d = ring * radialSegments + next;
        indices.push(a, c, b, a, d, c);
      }
    }

    const innerCenter = positions.length / 3;
    positions.push(0, bowlSurfaceY(0, true), 0);
    for (let segment = 0; segment < radialSegments; segment++) {
      const next = (segment + 1) % radialSegments;
      indices.push(innerCenter, next, segment);
    }

    const outerCenter = positions.length / 3;
    positions.push(0, bowlSurfaceY(0, false), 0);
    const outerStart = surfaceVertexCount;
    for (let segment = 0; segment < radialSegments; segment++) {
      const next = (segment + 1) % radialSegments;
      indices.push(outerCenter, outerStart + segment, outerStart + next);
    }

    const innerRimStart = radialRings * radialSegments;
    const outerRimStart = surfaceVertexCount + radialRings * radialSegments;
    for (let segment = 0; segment < radialSegments; segment++) {
      const next = (segment + 1) % radialSegments;
      const innerCurrent = innerRimStart + segment;
      const innerNext = innerRimStart + next;
      const outerCurrent = outerRimStart + segment;
      const outerNext = outerRimStart + next;
      indices.push(
        innerCurrent, outerNext, outerCurrent,
        innerCurrent, innerNext, outerNext
      );
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

  const bowlGeom = createBowlGeometry();
  const bowl = new THREE.Mesh(bowlGeom, brushed_metalMat);
  bowl.position.z = bowl_center_z;
  root.add(bowl);

  const rimPoints = [];
  const rimPointCount = 64;
  for (let i = 0; i < rimPointCount; i++) {
    const angle = i / rimPointCount * Math.PI * 2;
    rimPoints.push(new THREE.Vector3(
      Math.cos(angle) * bowl_radius_x,
      bowl_rim_y,
      Math.sin(angle) * bowl_radius_z
    ));
  }

  const bowl_rimPath = new THREE.CatmullRomCurve3(
    rimPoints,
    true,
    "centripetal"
  );
  const bowl_rimGeom = new THREE.TubeGeometry(
    bowl_rimPath,
    96,
    0.014,
    10,
    true
  );
  const bowl_rim = new THREE.Mesh(bowl_rimGeom, polished_metalMat);
  bowl_rim.position.z = bowl_center_z;
  root.add(bowl_rim);

  const handleShape = new THREE.Shape();
  handleShape.moveTo(-0.105, -0.22);
  handleShape.bezierCurveTo(-0.10, -0.10, -0.075, 0.04, -0.064, 0.18);
  handleShape.bezierCurveTo(-0.050, 0.42, -0.053, 0.70, -0.085, 0.94);
  handleShape.bezierCurveTo(-0.105, 1.07, -0.132, 1.17, -0.130, 1.23);
  handleShape.bezierCurveTo(-0.128, 1.30, -0.070, 1.34, 0, 1.34);
  handleShape.bezierCurveTo(0.070, 1.34, 0.128, 1.30, 0.130, 1.23);
  handleShape.bezierCurveTo(0.132, 1.17, 0.105, 1.07, 0.085, 0.94);
  handleShape.bezierCurveTo(0.053, 0.70, 0.050, 0.42, 0.064, 0.18);
  handleShape.bezierCurveTo(0.075, 0.04, 0.10, -0.10, 0.105, -0.22);
  handleShape.closePath();

  const handleGeom = new THREE.ExtrudeGeometry(handleShape, {
    depth: 0.044,
    steps: 1,
    curveSegments: 24,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });

  const handle_position = handleGeom.attributes.position;
  for (let i = 0; i < handle_position.count; i++) {
    const localY = handle_position.getY(i);
    const t = Math.max(0, Math.min(1, (localY + 0.22) / 1.56));
    const arch = 0.026 * Math.sin(Math.PI * t) + 0.016 * t * t;
    handle_position.setZ(i, handle_position.getZ(i) - arch);
  }
  handle_position.needsUpdate = true;
  handleGeom.computeVertexNormals();

  const handle = new THREE.Mesh(handleGeom, polished_metalMat);
  handle.rotation.x = Math.PI / 2;
  handle.position.y = 0.055;
  root.add(handle);

  const neck_transitionGeom = new THREE.SphereGeometry(1, 32, 16);
  const neck_transition = new THREE.Mesh(
    neck_transitionGeom,
    polished_metalMat
  );
  neck_transition.scale.set(0.112, 0.032, 0.155);
  neck_transition.position.set(0, 0.025, -0.15);
  root.add(neck_transition);

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