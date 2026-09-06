export default function generate(THREE) {
  const basketball = new THREE.Group();

  const ball_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xe97832,
    metalness: 0.0,
    roughness: 0.8,
  });
  const surface_pebblesMat = new THREE.MeshStandardMaterial({
    color: 0xf08039,
    metalness: 0.0,
    roughness: 0.8,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const ball_bodyGeom = new THREE.SphereGeometry(1, 96, 64);
  const ball_body = new THREE.Mesh(ball_bodyGeom, ball_bodyMat);
  basketball.add(ball_body);

  const surface_pebblesGeom = new THREE.SphereGeometry(1, 6, 4);
  const pebbleCount = 7000;
  const surface_pebbles = new THREE.InstancedMesh(
    surface_pebblesGeom,
    surface_pebblesMat,
    pebbleCount
  );
  const pebbleTransform = new THREE.Object3D();
  const pebbleNormal = new THREE.Vector3();
  const pebbleUp = new THREE.Vector3(0, 1, 0);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < pebbleCount; i++) {
    const y = 1 - 2 * (i + 0.5) / pebbleCount;
    const radial = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = i * goldenAngle;
    pebbleNormal.set(
      Math.cos(angle) * radial,
      y,
      Math.sin(angle) * radial
    );

    const width = 0.0125 * (1 + 0.12 * Math.sin(i * 1.71));
    const depth = 0.0022 * (1 + 0.1 * Math.cos(i * 2.13));
    pebbleTransform.position.copy(pebbleNormal).multiplyScalar(1.001);
    pebbleTransform.quaternion.setFromUnitVectors(pebbleUp, pebbleNormal);
    pebbleTransform.scale.set(width, depth, width * 0.9);
    pebbleTransform.updateMatrix();
    surface_pebbles.setMatrixAt(i, pebbleTransform.matrix);
  }
  surface_pebbles.instanceMatrix.needsUpdate = true;
  surface_pebbles.frustumCulled = false;
  basketball.add(surface_pebbles);

  const horizontal_seamGeom = new THREE.TorusGeometry(0.991, 0.027, 10, 160);
  const horizontal_seam = new THREE.Mesh(horizontal_seamGeom, seamMat);
  horizontal_seam.rotation.x = Math.PI / 2;
  basketball.add(horizontal_seam);

  function createGreatCircleCurve(basisY, basisZ, radius) {
    const points = [];
    const pointCount = 96;
    for (let i = 0; i < pointCount; i++) {
      const angle = i / pointCount * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        basisY * Math.sin(angle) * radius,
        basisZ * Math.sin(angle) * radius
      ));
    }
    return new THREE.CatmullRomCurve3(points, true, "centripetal");
  }

  const diagonal_seamCurve = createGreatCircleCurve(0.62, 0.785, 0.991);
  const diagonal_seamGeom = new THREE.TubeGeometry(
    diagonal_seamCurve,
    192,
    0.024,
    8,
    true
  );
  const diagonal_seam = new THREE.Mesh(diagonal_seamGeom, seamMat);
  basketball.add(diagonal_seam);

  const side_seamCurve = createGreatCircleCurve(0.785, -0.62, 0.991);
  const side_seamGeom = new THREE.TubeGeometry(
    side_seamCurve,
    192,
    0.024,
    8,
    true
  );
  const side_seam = new THREE.Mesh(side_seamGeom, seamMat);
  basketball.add(side_seam);

  function projectDecalGeometry(geometry, centerNormal, offset) {
    const position = geometry.attributes.position;
    const normal = centerNormal.clone().normalize();
    const tangentX = new THREE.Vector3(1, 0, 0);
    tangentX.addScaledVector(normal, -tangentX.dot(normal)).normalize();
    const tangentY = new THREE.Vector3()
      .crossVectors(normal, tangentX)
      .normalize();

    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const projectedNormal = normal.clone()
        .addScaledVector(tangentX, x)
        .addScaledVector(tangentY, y)
        .normalize();
      position.setXYZ(
        i,
        projectedNormal.x * offset,
        projectedNormal.y * offset,
        projectedNormal.z * offset
      );
    }

    position.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createProjectedRectGeometry(width, height, rotation, centerNormal, offset) {
    const shape = new THREE.Shape();
    shape.moveTo(-width / 2, -height / 2);
    shape.lineTo(width / 2, -height / 2);
    shape.lineTo(width / 2, height / 2);
    shape.lineTo(-width / 2, height / 2);
    shape.lineTo(-width / 2, -height / 2);

    const geometry = new THREE.ShapeGeometry(shape);
    const position = geometry.attributes.position;
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);

    for (let i = 0; i < position.count; i++) {
      const px = position.getX(i);
      const py = position.getY(i);
      position.setXYZ(i, px * c - py * s, px * s + py * c, 0);
    }

    return projectDecalGeometry(geometry, centerNormal, offset);
  }

  function createProjectedRingGeometry(outerRadius, innerRadius, rotation, centerNormal, offset) {
    const shape = new THREE.Shape();
    shape.moveTo(outerRadius, 0);
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);

    const hole = new THREE.Path();
    hole.moveTo(innerRadius, 0);
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const geometry = new THREE.ShapeGeometry(shape, 24);
    const position = geometry.attributes.position;
    const c = Math.cos(rotation);
    const s = Math.sin(rotation);

    for (let i = 0; i < position.count; i++) {
      const px = position.getX(i);
      const py = position.getY(i);
      position.setXYZ(i, px * c - py * s, px * s + py * c, 0);
    }

    return projectDecalGeometry(geometry, centerNormal, offset);
  }

  const logo_group = new THREE.Group();
  const logoRotation = 0.38;
  const logoOffset = 0.014;

  const logo_d_normal = new THREE.Vector3(-0.46, 0.43, 0.77).normalize();
  const logo_d_ringGeom = createProjectedRingGeometry(
    0.13, 0.061, logoRotation, logo_d_normal, logoOffset
  );
  const logo_d_ring = new THREE.Mesh(logo_d_ringGeom, logoMat);
  logo_group.add(logo_d_ring);

  const logo_d_stemGeom = createProjectedRectGeometry(
    0.058, 0.235, logoRotation, logo_d_normal, logoOffset + 0.001
  );
  const logo_d_stem = new THREE.Mesh(logo_d_stemGeom, logoMat);
  logo_d_stem.position.set(-0.083 * Math.cos(logoRotation), 0.083 * Math.cos(logoRotation), 0);
  logo_group.add(logo_d_stem);

  const logo_i_normal = new THREE.Vector3(-0.36, 0.59, 0.72).normalize();
  const logo_iGeom = createProjectedRectGeometry(
    0.064, 0.22, logoRotation, logo_i_normal, logoOffset
  );
  const logo_i = new THREE.Mesh(logo_iGeom, logoMat);
  logo_group.add(logo_i);

  const logo_v_shape = new THREE.Shape();
  logo_v_shape.moveTo(-0.105, 0.11);
  logo_v_shape.lineTo(-0.038, 0.11);
  logo_v_shape.lineTo(0, -0.025);
  logo_v_shape.lineTo(0.038, 0.11);
  logo_v_shape.lineTo(0.105, 0.11);
  logo_v_shape.lineTo(0, -0.12);
  logo_v_shape.lineTo(-0.105, 0.11);

  const logo_vGeom = projectDecalGeometry(
    new THREE.ShapeGeometry(logo_v_shape),
    new THREE.Vector3(-0.24, 0.73, 0.64).normalize(),
    logoOffset
  );
  const logo_v = new THREE.Mesh(logo_vGeom, logoMat);
  logo_group.add(logo_v);

  const logo_n_top_barGeom = createProjectedRectGeometry(
    0.205, 0.052, logoRotation, logo_d_normal, logoOffset + 0.002
  );
  const logo_n_top_bar = new THREE.Mesh(logo_n_top_barGeom, logoMat);
  logo_n_top_bar.position.set(0.098 * Math.sin(logoRotation), -0.098 * Math.cos(logoRotation), 0);
  logo_group.add(logo_n_top_bar);

  const logo_n_bottom_barGeom = createProjectedRectGeometry(
    0.205, 0.052, logoRotation, logo_d_normal, logoOffset + 0.002
  );
  const logo_n_bottom_bar = new THREE.Mesh(logo_n_bottom_barGeom, logoMat);
  logo_n_bottom_bar.position.set(-0.098 * Math.sin(logoRotation), 0.098 * Math.cos(logoRotation), 0);
  logo_group.add(logo_n_bottom_bar);

  const logo_mark_normal = new THREE.Vector3(-0.52, -0.45, 0.725).normalize();
  const logo_mark_stemGeom = createProjectedRectGeometry(
    0.058, 0.25, -0.48, logo_mark_normal, logoOffset
  );
  const logo_mark_stem = new THREE.Mesh(logo_mark_stemGeom, logoMat);
  logo_group.add(logo_mark_stem);

  const logo_mark_hookGeom = createProjectedRingGeometry(
    0.105, 0.052, -0.48, logo_mark_normal, logoOffset + 0.001
  );
  const logo_mark_hook = new THREE.Mesh(logo_mark_hookGeom, logoMat);
  logo_mark_hook.position.set(0.065 * Math.cos(-0.48), -0.065 * Math.sin(-0.48), 0);
  logo_group.add(logo_mark_hook);

  basketball.add(logo_group);

  function fitToUnitCube(root) {
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

  fitToUnitCube(basketball);
  return basketball;
}