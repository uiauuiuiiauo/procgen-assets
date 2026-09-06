export default function generate(THREE) {
  const root = new THREE.Group();

  const staff_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xa86c32,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grain_darkMat = new THREE.MeshStandardMaterial({
    color: 0x5a3016,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_grain_lightMat = new THREE.MeshStandardMaterial({
    color: 0xd29450,
    metalness: 0.0,
    roughness: 0.6,
  });
  const wood_knotsMat = new THREE.MeshStandardMaterial({
    color: 0x633716,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });
  const holeMat = new THREE.MeshStandardMaterial({
    color: 0x100b08,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const hole_rimMat = new THREE.MeshStandardMaterial({
    color: 0x4b2814,
    metalness: 0.0,
    roughness: 0.6,
    side: THREE.DoubleSide,
  });

  const staff_path = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(-0.16, -1.10, 0),
      new THREE.Vector3(-0.11, -0.82, 0),
      new THREE.Vector3(-0.05, -0.48, 0),
      new THREE.Vector3(0.01, -0.12, 0),
      new THREE.Vector3(0.05, 0.25, 0),
      new THREE.Vector3(0.06, 0.58, 0),
      new THREE.Vector3(0.04, 0.82, 0),
      new THREE.Vector3(0.06, 1.00, 0),
      new THREE.Vector3(0.13, 1.10, 0),
      new THREE.Vector3(0.26, 1.14, 0),
    ],
    false,
    "centripetal",
    0.5
  );

  const radius_keys = [
    [0.00, 0.032],
    [0.04, 0.038],
    [0.28, 0.041],
    [0.55, 0.045],
    [0.72, 0.048],
    [0.82, 0.052],
    [0.88, 0.061],
    [0.95, 0.068],
    [1.00, 0.064],
  ];

  function staffRadius(t) {
    for (let i = 0; i < radius_keys.length - 1; i++) {
      const a = radius_keys[i];
      const b = radius_keys[i + 1];
      if (t <= b[0]) {
        const f = (t - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * f;
      }
    }
    return radius_keys[radius_keys.length - 1][1];
  }

  function getFrame(t) {
    const center = staff_path.getPointAt(t);
    const tangent = staff_path.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.y, tangent.x, 0).normalize();
    const binormal = new THREE.Vector3(0, 0, 1);
    return { center, tangent, normal, binormal };
  }

  function createSweepGeometry(curve, lengthSegments, radialSegments) {
    const positions = [];
    const indices = [];

    for (let i = 0; i <= lengthSegments; i++) {
      const t = i / lengthSegments;
      const frame = getFrame(t);
      const radius = staffRadius(t);

      for (let j = 0; j < radialSegments; j++) {
        const angle = (j / radialSegments) * Math.PI * 2;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        positions.push(
          frame.center.x +
            frame.normal.x * cos * radius +
            frame.binormal.x * sin * radius,
          frame.center.y +
            frame.normal.y * cos * radius +
            frame.binormal.y * sin * radius,
          frame.center.z +
            frame.normal.z * cos * radius +
            frame.binormal.z * sin * radius
        );
      }
    }

    for (let i = 0; i < lengthSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const next = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + next;
        const d = i * radialSegments + next;
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

  const staff_bodyGeom = createSweepGeometry(staff_path, 96, 20);
  const staff_body = new THREE.Mesh(staff_bodyGeom, staff_bodyMat);
  root.add(staff_body);

  function createEndCap(t, facing) {
    const frame = getFrame(t);
    const radius = staffRadius(t);
    const outward = frame.tangent.clone().multiplyScalar(facing);
    const cap_depth = 0.007;
    const rings = 3;
    const segments = 20;
    const positions = [];
    const indices = [];

    positions.push(
      frame.center.x + outward.x * cap_depth,
      frame.center.y + outward.y * cap_depth,
      frame.center.z + outward.z * cap_depth
    );

    for (let ring = 1; ring <= rings; ring++) {
      const f = ring / rings;
      const r = radius * Math.sqrt(Math.max(0, 1 - cap_depth * cap_depth * f * f));
      const offset = outward.clone().multiplyScalar(cap_depth * f);
      for (let j = 0; j < segments; j++) {
        const angle = (j / segments) * Math.PI * 2;
        const radial = frame.normal
          .clone()
          .multiplyScalar(Math.cos(angle))
          .add(frame.binormal.clone().multiplyScalar(Math.sin(angle)));
        const point = frame.center.clone().add(offset).add(radial.multiplyScalar(r));
        positions.push(point.x, point.y, point.z);
      }
    }

    for (let j = 0; j < segments; j++) {
      const next = (j + 1) % segments;
      if (facing > 0) {
        indices.push(0, 1 + j, 1 + next);
      } else {
        indices.push(0, 1 + next, 1 + j);
      }
    }

    for (let ring = 1; ring < rings; ring++) {
      const inner = 1 + (ring - 1) * segments;
      const outer = 1 + ring * segments;
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        const a = inner + j;
        const b = outer + j;
        const c = outer + next;
        const d = inner + next;
        if (facing > 0) {
          indices.push(a, b, c, a, c, d);
        } else {
          indices.push(a, c, b, a, d, c);
        }
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

  const bottom_end_capGeom = createEndCap(0, -1);
  const bottom_end_cap = new THREE.Mesh(bottom_end_capGeom, staff_bodyMat);
  root.add(bottom_end_cap);

  const top_end_capGeom = createEndCap(1, 1);
  const top_end_cap = new THREE.Mesh(top_end_capGeom, staff_bodyMat);
  root.add(top_end_cap);

  const wood_grain = new THREE.Group();
  for (let i = 0; i < 14; i++) {
    const start = 0.035 + (i % 5) * 0.018;
    const end = 0.84 + (i % 4) * 0.024;
    const base_angle = (i / 14) * Math.PI * 2;
    const points = [];

    for (let j = 0; j <= 18; j++) {
      const u = j / 18;
      const t = start + (end - start) * u;
      const frame = getFrame(t);
      const angle =
        base_angle +
        Math.sin((u * 2.6 + i * 0.31) * Math.PI) * 0.035;
      const radius = staffRadius(t) + 0.001;
      const radial = frame.normal
        .clone()
        .multiplyScalar(Math.cos(angle))
        .add(frame.binormal.clone().multiplyScalar(Math.sin(angle)));
      points.push(frame.center.clone().add(radial.multiplyScalar(radius)));
    }

    const grain_lineGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5),
      24,
      i % 3 === 0 ? 0.0014 : 0.0011,
      5,
      false
    );
    const grain_line = new THREE.Mesh(
      grain_lineGeom,
      i % 3 === 0 ? wood_grain_lightMat : wood_grain_darkMat
    );
    wood_grain.add(grain_line);
  }
  root.add(wood_grain);

  const wood_knotsGeom = new THREE.CircleGeometry(0.01, 14);
  const wood_knots = new THREE.InstancedMesh(
    wood_knotsGeom,
    wood_knotsMat,
    4
  );
  const knot_data = [
    [0.19, 1.18, 0.75, 1.65, 0.25],
    [0.39, 1.72, 0.55, 1.35, -0.35],
    [0.61, 1.30, 0.65, 1.55, 0.15],
    [0.78, 1.86, 0.50, 1.20, -0.20],
  ];
  const knot_dummy = new THREE.Object3D();
  const local_z = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < knot_data.length; i++) {
    const data = knot_data[i];
    const t = data[0];
    const angle = data[1];
    const frame = getFrame(t);
    const surface_normal = frame.normal
      .clone()
      .multiplyScalar(Math.cos(angle))
      .add(frame.binormal.clone().multiplyScalar(Math.sin(angle)))
      .normalize();
    const radius = staffRadius(t) + 0.0025;

    knot_dummy.position
      .copy(frame.center)
      .add(surface_normal.clone().multiplyScalar(radius));
    knot_dummy.quaternion.setFromUnitVectors(local_z, surface_normal);
    knot_dummy.rotateZ(data[4]);
    knot_dummy.scale.set(data[2], data[3], 1);
    knot_dummy.updateMatrix();
    wood_knots.setMatrixAt(i, knot_dummy.matrix);
  }
  wood_knots.instanceMatrix.needsUpdate = true;
  root.add(wood_knots);

  function placeSurfaceDisc(mesh, t, angle, offset) {
    const frame = getFrame(t);
    const surface_normal = frame.normal
      .clone()
      .multiplyScalar(Math.cos(angle))
      .add(frame.binormal.clone().multiplyScalar(Math.sin(angle)))
      .normalize();
    mesh.position
      .copy(frame.center)
      .add(surface_normal.clone().multiplyScalar(staffRadius(t) + offset));
    mesh.quaternion.setFromUnitVectors(local_z, surface_normal);
  }

  const top_hole_rimGeom = new THREE.RingGeometry(0.018, 0.024, 24);
  const top_hole_rim = new THREE.Mesh(top_hole_rimGeom, hole_rimMat);
  placeSurfaceDisc(top_hole_rim, 0.945, Math.PI / 2, 0.002);
  top_hole_rim.scale.set(1.45, 0.72, 1);
  top_hole_rim.rotateZ(-0.12);
  root.add(top_hole_rim);

  const top_holeGeom = new THREE.CircleGeometry(0.0185, 24);
  const top_hole = new THREE.Mesh(top_holeGeom, holeMat);
  placeSurfaceDisc(top_hole, 0.945, Math.PI / 2, 0.0025);
  top_hole.scale.set(1.45, 0.72, 1);
  top_hole.rotateZ(-0.12);
  root.add(top_hole);

  const bottom_hole_rimGeom = new THREE.RingGeometry(0.009, 0.0125, 20);
  const bottom_hole_rim = new THREE.Mesh(bottom_hole_rimGeom, hole_rimMat);
  placeSurfaceDisc(bottom_hole_rim, 0.025, Math.PI / 2, 0.0018);
  bottom_hole_rim.scale.set(0.9, 1.05, 1);
  root.add(bottom_hole_rim);

  const bottom_holeGeom = new THREE.CircleGeometry(0.0093, 20);
  const bottom_hole = new THREE.Mesh(bottom_holeGeom, holeMat);
  placeSurfaceDisc(bottom_hole, 0.025, Math.PI / 2, 0.0023);
  bottom_hole.scale.set(0.9, 1.05, 1);
  root.add(bottom_hole);

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