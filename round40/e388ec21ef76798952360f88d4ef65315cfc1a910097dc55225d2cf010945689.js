export default function generate(THREE) {
  const root = new THREE.Group();

  const clear_resinMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  const facet_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const silver_metalMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });

  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });

  const gemstone_clusterMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    flatShading: true
  });

  const clear_faceted_shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
    flatShading: true
  });

  function createFacetedShellGeometry() {
    const positions = [];

    function addTriangle(a, b, c) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
    }

    function addQuad(a, b, c, d) {
      addTriangle(a, b, c);
      addTriangle(a, c, d);
    }

    const top = [
      new THREE.Vector3(-0.34, 0.66, 0.18),
      new THREE.Vector3(0.34, 0.66, 0.18),
      new THREE.Vector3(0.44, 0.66, 0.00),
      new THREE.Vector3(0.34, 0.66, -0.18),
      new THREE.Vector3(-0.34, 0.66, -0.18),
      new THREE.Vector3(-0.44, 0.66, 0.00)
    ];

    const bottom = [
      new THREE.Vector3(-0.29, -0.68, 0.18),
      new THREE.Vector3(0.29, -0.68, 0.18),
      new THREE.Vector3(0.41, -0.68, 0.00),
      new THREE.Vector3(0.29, -0.68, -0.18),
      new THREE.Vector3(-0.29, -0.68, -0.18),
      new THREE.Vector3(-0.41, -0.68, 0.00)
    ];

    const front_mid = [
      new THREE.Vector3(-0.49, -0.06, 0.31),
      new THREE.Vector3(0.49, -0.06, 0.31),
      new THREE.Vector3(0.56, -0.06, 0.00),
      new THREE.Vector3(0.49, -0.06, -0.31),
      new THREE.Vector3(-0.49, -0.06, -0.31),
      new THREE.Vector3(-0.56, -0.06, 0.00)
    ];

    const back_mid = [
      new THREE.Vector3(-0.49, 0.10, -0.31),
      new THREE.Vector3(0.49, 0.10, -0.31),
      new THREE.Vector3(0.56, 0.10, 0.00),
      new THREE.Vector3(0.49, 0.10, 0.31),
      new THREE.Vector3(-0.49, 0.10, 0.31),
      new THREE.Vector3(-0.56, 0.10, 0.00)
    ];

    const top_cap_center = new THREE.Vector3(0, 0.66, 0);
    const bottom_cap_center = new THREE.Vector3(0, -0.68, 0);

    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      addQuad(top[i], top[next], front_mid[next], front_mid[i]);
      addTriangle(top_cap_center, top[next], top[i]);
    }

    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      addQuad(bottom[i], bottom[next], front_mid[next], front_mid[i]);
      addTriangle(bottom_cap_center, bottom[i], bottom[next]);
    }

    for (let i = 0; i < 6; i++) {
      const next = (i + 1) % 6;
      if (i === 0) {
        addQuad(back_mid[i], back_mid[next], front_mid[next], front_mid[i]);
      } else {
        addQuad(back_mid[next], back_mid[i], front_mid[i], front_mid[next]);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  const clear_faceted_shellGeom = createFacetedShellGeometry();
  const clear_faceted_shell = new THREE.Mesh(
    clear_faceted_shellGeom,
    clear_faceted_shellMat
  );
  clear_faceted_shell.renderOrder = 3;
  root.add(clear_faceted_shell);

  const front_facet_highlightShape = new THREE.Shape();
  front_facet_highlightShape.moveTo(-0.43, 0.50);
  front_facet_highlightShape.lineTo(-0.25, 0.61);
  front_facet_highlightShape.lineTo(0.18, -0.51);
  front_facet_highlightShape.lineTo(-0.03, -0.60);
  front_facet_highlightShape.closePath();

  const front_facet_highlightGeom = new THREE.ShapeGeometry(
    front_facet_highlightShape
  );
  const front_facet_highlight = new THREE.Mesh(
    front_facet_highlightGeom,
    facet_highlightMat
  );
  front_facet_highlight.position.z = 0.315;
  front_facet_highlight.renderOrder = 4;
  root.add(front_facet_highlight);

  const right_facet_highlightShape = new THREE.Shape();
  right_facet_highlightShape.moveTo(0.34, 0.57);
  right_facet_highlightShape.lineTo(0.48, 0.22);
  right_facet_highlightShape.lineTo(0.43, -0.48);
  right_facet_highlightShape.lineTo(0.30, -0.58);
  right_facet_highlightShape.closePath();

  const right_facet_highlightGeom = new THREE.ShapeGeometry(
    right_facet_highlightShape
  );
  const right_facet_highlight = new THREE.Mesh(
    right_facet_highlightGeom,
    facet_highlightMat
  );
  right_facet_highlight.position.z = 0.316;
  right_facet_highlight.renderOrder = 4;
  root.add(right_facet_highlight);

  const gemstone_clusterGeom = new THREE.DodecahedronGeometry(1, 0);
  const gemstone_count = 108;
  const gemstone_cluster = new THREE.InstancedMesh(
    gemstone_clusterGeom,
    gemstone_clusterMat,
    gemstone_count
  );
  const gemstone_dummy = new THREE.Object3D();
  const gemstone_palette = [
    0x005dff,
    0x00c8ff,
    0x00a662,
    0x22d43c,
    0xffd500,
    0xff7a00,
    0xe6003c,
    0xd7198c,
    0x7018d7,
    0xb521bd,
    0x173a68,
    0x16483e,
    0x6b173e,
    0xc89512
  ];

  for (let i = 0; i < gemstone_count; i++) {
    const layer = Math.floor(i / 12);
    const slot = i % 12;
    const y = -0.57 + layer * 0.082 + ((slot % 3) - 1) * 0.008;
    const x =
      ((slot * 5 + layer * 3) % 12 - 5.5) * 0.073 +
      (layer % 2 === 0 ? -0.012 : 0.012);
    const z =
      ((slot * 7 + layer * 2) % 5 - 2) * 0.083 +
      (slot % 2 === 0 ? -0.014 : 0.014);

    const large_chunk = i % 9 === 0 || i % 17 === 0;
    const sx = large_chunk
      ? 0.072 + (i % 4) * 0.008
      : 0.040 + ((i * 7) % 5) * 0.007;
    const sy = large_chunk
      ? 0.052 + ((i * 3) % 4) * 0.009
      : 0.032 + ((i * 5) % 6) * 0.006;
    const sz = large_chunk
      ? 0.055 + ((i * 2) % 4) * 0.008
      : 0.038 + ((i * 3) % 5) * 0.007;

    gemstone_dummy.position.set(x, y, z);
    gemstone_dummy.rotation.set(
      (i * 0.71) % Math.PI,
      (i * 1.13) % Math.PI,
      (i * 0.47) % Math.PI
    );
    gemstone_dummy.scale.set(sx, sy, sz);
    gemstone_dummy.updateMatrix();
    gemstone_cluster.setMatrixAt(i, gemstone_dummy.matrix);

    const palette_index =
      (i * 5 + layer * 3 + slot) % gemstone_palette.length;
    gemstone_cluster.setColorAt(
      i,
      new THREE.Color(gemstone_palette[palette_index])
    );
  }

  gemstone_cluster.instanceMatrix.needsUpdate = true;
  if (gemstone_cluster.instanceColor) {
    gemstone_cluster.instanceColor.needsUpdate = true;
  }
  root.add(gemstone_cluster);

  const top_mountGeom = new THREE.CylinderGeometry(0.034, 0.052, 0.11, 16);
  const top_mount = new THREE.Mesh(top_mountGeom, clear_resinMat);
  top_mount.position.set(0, 0.705, 0);
  top_mount.renderOrder = 4;
  root.add(top_mount);

  const connector_pinGeom = new THREE.CylinderGeometry(
    0.012,
    0.012,
    0.115,
    12
  );
  const connector_pin = new THREE.Mesh(
    connector_pinGeom,
    polished_metalMat
  );
  connector_pin.position.set(0, 0.705, 0.006);
  root.add(connector_pin);

  const jump_ringGeom = new THREE.TorusGeometry(0.086, 0.017, 12, 36);
  const jump_ring = new THREE.Mesh(jump_ringGeom, polished_metalMat);
  jump_ring.position.set(0, 0.79, 0.025);
  root.add(jump_ring);

  const pendant_bailShape = new THREE.Shape();
  pendant_bailShape.moveTo(-0.052, -0.205);
  pendant_bailShape.bezierCurveTo(
    -0.095,
    -0.13,
    -0.13,
    0.04,
    -0.105,
    0.135
  );
  pendant_bailShape.bezierCurveTo(
    -0.08,
    0.225,
    0.07,
    0.235,
    0.11,
    0.14
  );
  pendant_bailShape.bezierCurveTo(
    0.135,
    0.045,
    0.09,
    -0.13,
    0.052,
    -0.205
  );
  pendant_bailShape.bezierCurveTo(
    0.025,
    -0.235,
    -0.025,
    -0.235,
    -0.052,
    -0.205
  );
  pendant_bailShape.closePath();

  const pendant_bail_hole = new THREE.Path();
  pendant_bail_hole.moveTo(-0.025, -0.13);
  pendant_bail_hole.bezierCurveTo(
    -0.045,
    -0.055,
    -0.06,
    0.04,
    -0.045,
    0.105
  );
  pendant_bail_hole.bezierCurveTo(
    -0.03,
    0.155,
    0.03,
    0.16,
    0.05,
    0.105
  );
  pendant_bail_hole.bezierCurveTo(
    0.06,
    0.04,
    0.04,
    -0.055,
    0.024,
    -0.13
  );
  pendant_bail_hole.bezierCurveTo(
    0.012,
    -0.16,
    -0.012,
    -0.16,
    -0.025,
    -0.13
  );
  pendant_bail_hole.closePath();
  pendant_bailShape.holes.push(pendant_bail_hole);

  const pendant_bailGeom = new THREE.ExtrudeGeometry(pendant_bailShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 3,
    curveSegments: 16
  });
  const pendant_bail = new THREE.Mesh(
    pendant_bailGeom,
    polished_metalMat
  );
  pendant_bail.position.set(0, 0.98, -0.035);
  pendant_bail.rotation.y = -0.1;
  root.add(pendant_bail);

  const bail_highlightGeom = new THREE.BoxGeometry(0.018, 0.22, 0.006);
  const bail_highlight = new THREE.Mesh(
    bail_highlightGeom,
    silver_metalMat
  );
  bail_highlight.position.set(-0.073, 1.015, 0.047);
  bail_highlight.rotation.z = -0.16;
  root.add(bail_highlight);

  const bail_reflectionGeom = new THREE.BoxGeometry(0.025, 0.075, 0.007);
  const bail_reflection = new THREE.Mesh(
    bail_reflectionGeom,
    dark_metalMat
  );
  bail_reflection.position.set(0.035, 1.075, 0.048);
  bail_reflection.rotation.z = 0.12;
  root.add(bail_reflection);

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