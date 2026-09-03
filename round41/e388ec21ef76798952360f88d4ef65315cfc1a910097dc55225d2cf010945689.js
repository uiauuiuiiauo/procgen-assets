export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "pendant_root";

  const pendant = new THREE.Group();
  pendant.name = "gemstone_pendant";
  root.add(pendant);

  const crystal_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const facet_overlayMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const crystal_edgesMat = new THREE.MeshStandardMaterial({
    color: 0xdce8ee,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });

  const crystal_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x718896,
    metalness: 0.0,
    roughness: 0.7
  });

  const polished_silverMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });

  const dark_gemstone_fillMat = new THREE.MeshStandardMaterial({
    color: 0x17131d,
    metalness: 0.0,
    roughness: 0.7
  });

  const gemstone_palette = [
    0x2048d4, 0x16c5eb, 0x00a86b, 0x62c94c,
    0xf0d21a, 0xf28c18, 0xe44725, 0xd91f55,
    0xc51a93, 0x7626c7, 0xa563d9, 0x292333
  ];

  const gemstoneMats = gemstone_palette.map((color) =>
    new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.3
    })
  );

  const crystal_outline = [
    new THREE.Vector2(-0.25, -0.62),
    new THREE.Vector2(0.23, -0.62),
    new THREE.Vector2(0.49, -0.42),
    new THREE.Vector2(0.54, -0.08),
    new THREE.Vector2(0.47, 0.34),
    new THREE.Vector2(0.25, 0.52),
    new THREE.Vector2(-0.24, 0.52),
    new THREE.Vector2(-0.47, 0.34),
    new THREE.Vector2(-0.54, -0.08),
    new THREE.Vector2(-0.49, -0.42)
  ];

  const crystal_front = [];
  const crystal_back = [];
  for (let i = 0; i < crystal_outline.length; i++) {
    const p = crystal_outline[i];
    crystal_front.push(new THREE.Vector3(p.x, p.y, 0.17));
    crystal_back.push(new THREE.Vector3(p.x, p.y, -0.17));
  }

  const crystal_body_positions = [];
  for (let i = 0; i < crystal_outline.length; i++) {
    const next = (i + 1) % crystal_outline.length;
    const f0 = crystal_front[i];
    const f1 = crystal_front[next];
    const b0 = crystal_back[i];
    const b1 = crystal_back[next];

    crystal_body_positions.push(
      f0.x, f0.y, f0.z, f1.x, f1.y, f1.z, b1.x, b1.y, b1.z,
      f0.x, f0.y, f0.z, b1.x, b1.y, b1.z, b0.x, b0.y, b0.z,
      b0.x, b0.y, b0.z, b1.x, b1.y, b1.z, f1.x, f1.y, f1.z,
      b0.x, b0.y, b0.z, f1.x, f1.y, f1.z, f0.x, f0.y, f0.z
    );
  }

  const crystal_bodyGeom = new THREE.BufferGeometry();
  crystal_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(crystal_body_positions, 3)
  );
  crystal_bodyGeom.computeVertexNormals();

  const crystal_body = new THREE.Mesh(crystal_bodyGeom, crystal_bodyMat);
  crystal_body.name = "crystal_body";
  crystal_body.renderOrder = 1;
  pendant.add(crystal_body);

  const front_facet_positions = [];
  const front_facet_center = new THREE.Vector3(0, -0.05, 0.173);
  for (let i = 0; i < crystal_outline.length; i++) {
    const next = (i + 1) % crystal_outline.length;
    front_facet_positions.push(
      front_facet_center.x, front_facet_center.y, front_facet_center.z,
      crystal_front[i].x, crystal_front[i].y, crystal_front[i].z + 0.003,
      crystal_front[next].x, crystal_front[next].y, crystal_front[next].z + 0.003
    );
  }

  const front_facetGeom = new THREE.BufferGeometry();
  front_facetGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(front_facet_positions, 3)
  );
  front_facetGeom.computeVertexNormals();

  const front_facet = new THREE.Mesh(front_facetGeom, facet_overlayMat);
  front_facet.name = "front_facet";
  front_facet.renderOrder = 2;
  pendant.add(front_facet);

  const back_facet_positions = [];
  const back_facet_center = new THREE.Vector3(0, -0.05, -0.173);
  for (let i = 0; i < crystal_outline.length; i++) {
    const next = (i + 1) % crystal_outline.length;
    back_facet_positions.push(
      back_facet_center.x, back_facet_center.y, back_facet_center.z,
      crystal_back[next].x, crystal_back[next].y, crystal_back[next].z - 0.003,
      crystal_back[i].x, crystal_back[i].y, crystal_back[i].z - 0.003
    );
  }

  const back_facetGeom = new THREE.BufferGeometry();
  back_facetGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(back_facet_positions, 3)
  );
  back_facetGeom.computeVertexNormals();

  const back_facet = new THREE.Mesh(back_facetGeom, facet_overlayMat);
  back_facet.name = "back_facet";
  back_facet.renderOrder = 0;
  pendant.add(back_facet);

  const crystal_edge_pairs = [];
  for (let i = 0; i < crystal_outline.length; i++) {
    const next = (i + 1) % crystal_outline.length;
    crystal_edge_pairs.push(
      [crystal_front[i], crystal_front[next]],
      [crystal_back[i], crystal_back[next]],
      [crystal_front[i], crystal_back[i]]
    );
  }

  const crystal_edgesGeom = new THREE.CylinderGeometry(1, 1, 1, 6);
  const crystal_edges = new THREE.InstancedMesh(
    crystal_edgesGeom,
    crystal_edgesMat,
    crystal_edge_pairs.length
  );
  crystal_edges.name = "crystal_edges";
  crystal_edges.renderOrder = 3;

  const edge_up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < crystal_edge_pairs.length; i++) {
    const p0 = crystal_edge_pairs[i][0];
    const p1 = crystal_edge_pairs[i][1];
    const direction = p1.clone().sub(p0);
    const length = direction.length();
    const midpoint = p0.clone().add(p1).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      edge_up,
      direction.normalize()
    );
    const scale = new THREE.Vector3(0.005, length, 0.005);
    const matrix = new THREE.Matrix4().compose(midpoint, quaternion, scale);
    crystal_edges.setMatrixAt(i, matrix);
  }
  crystal_edges.instanceMatrix.needsUpdate = true;
  pendant.add(crystal_edges);

  const front_glint_pairs = [
    [new THREE.Vector3(-0.24, 0.51, 0.181), new THREE.Vector3(-0.46, 0.33, 0.181)],
    [new THREE.Vector3(-0.46, 0.33, 0.181), new THREE.Vector3(-0.52, -0.07, 0.181)],
    [new THREE.Vector3(-0.52, -0.07, 0.181), new THREE.Vector3(-0.47, -0.40, 0.181)],
    [new THREE.Vector3(0.24, 0.51, 0.181), new THREE.Vector3(0.46, 0.33, 0.181)],
    [new THREE.Vector3(0.46, 0.33, 0.181), new THREE.Vector3(0.52, -0.07, 0.181)]
  ];

  const front_glints = new THREE.InstancedMesh(
    crystal_edgesGeom,
    crystal_edgesMat,
    front_glint_pairs.length
  );
  front_glints.name = "front_glints";
  front_glints.renderOrder = 4;

  for (let i = 0; i < front_glint_pairs.length; i++) {
    const p0 = front_glint_pairs[i][0];
    const p1 = front_glint_pairs[i][1];
    const direction = p1.clone().sub(p0);
    const length = direction.length();
    const midpoint = p0.clone().add(p1).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      edge_up,
      direction.normalize()
    );
    const scale = new THREE.Vector3(0.008, length, 0.008);
    front_glints.setMatrixAt(
      i,
      new THREE.Matrix4().compose(midpoint, quaternion, scale)
    );
  }
  front_glints.instanceMatrix.needsUpdate = true;
  pendant.add(front_glints);

  const facet_highlight_positions = [
    -0.18, 0.44, 0.184,
     0.10, 0.44, 0.184,
     0.02, 0.08, 0.184,

    -0.40, 0.27, 0.184,
   -0.24, 0.45, 0.184,
   -0.34, 0.08, 0.184,

    -0.40, 0.27, 0.184,
   -0.34, 0.08, 0.184,
   -0.49, -0.02, 0.184,

    -0.47, -0.39, 0.184,
   -0.28, -0.56, 0.184,
   -0.35, -0.25, 0.184,

    -0.16, -0.56, 0.184,
     0.17, -0.56, 0.184,
     0.06, -0.30, 0.184,

     0.31, -0.47, 0.184,
     0.46, -0.31, 0.184,
     0.39, -0.12, 0.184,

     0.39, -0.12, 0.184,
     0.50, 0.04, 0.184,
     0.43, 0.18, 0.184,

     0.27, 0.43, 0.184,
     0.45, 0.29, 0.184,
     0.35, 0.12, 0.184
  ];

  const facet_highlightsGeom = new THREE.BufferGeometry();
  facet_highlightsGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(facet_highlight_positions, 3)
  );
  facet_highlightsGeom.computeVertexNormals();

  const facet_highlights = new THREE.Mesh(
    facet_highlightsGeom,
    crystal_edgesMat
  );
  facet_highlights.name = "facet_highlights";
  facet_highlights.renderOrder = 4;
  pendant.add(facet_highlights);

  const dark_gemstone_fillGeom = new THREE.DodecahedronGeometry(1, 0);
  const dark_gemstone_fill = new THREE.Mesh(
    dark_gemstone_fillGeom,
    dark_gemstone_fillMat
  );
  dark_gemstone_fill.name = "dark_gemstone_fill";
  dark_gemstone_fill.position.set(0, -0.25, 0);
  dark_gemstone_fill.scale.set(0.39, 0.42, 0.11);
  pendant.add(dark_gemstone_fill);

  const gemstone_fragmentGeom = new THREE.DodecahedronGeometry(1, 0);
  const gemstone_fragments = new THREE.Group();
  gemstone_fragments.name = "gemstone_fragments";
  pendant.add(gemstone_fragments);

  const gemstone_count = 180;
  const gemstone_dummy = new THREE.Object3D();

  for (let color_index = 0; color_index < gemstone_palette.length; color_index++) {
    const batch_count = Math.floor(gemstone_count / gemstone_palette.length);
    const gemstone_color_batch = new THREE.InstancedMesh(
      gemstone_fragmentGeom,
      gemstoneMats[color_index],
      batch_count
    );
    gemstone_color_batch.name = "gemstone_color_batch_" + color_index;

    for (let j = 0; j < batch_count; j++) {
      const i = color_index + j * gemstone_palette.length;
      const u = ((i * 37 + 13) % 181) / 180;
      const v = ((i * 67 + 29) % 179) / 178;
      const w = ((i * 43 + 7) % 173) / 172;
      const y = -0.56 + v * 0.78;
      const envelope = 0.30 + 0.13 * Math.sin((v + 0.08) * Math.PI);
      const x = (u - 0.5) * 2 * envelope;
      const z = -0.13 + w * 0.26;

      gemstone_dummy.position.set(x, y, z);
      gemstone_dummy.rotation.set(
        (i * 0.73) % Math.PI,
        (i * 1.17) % Math.PI,
        (i * 0.41) % Math.PI
      );
      gemstone_dummy.scale.set(
        0.022 + 0.040 * (((i * 11 + 3) % 17) / 16),
        0.025 + 0.050 * (((i * 7 + 5) % 19) / 18),
        0.018 + 0.032 * (((i * 13 + 2) % 13) / 12)
      );
      gemstone_dummy.updateMatrix();
      gemstone_color_batch.setMatrixAt(j, gemstone_dummy.matrix);
    }

    gemstone_color_batch.instanceMatrix.needsUpdate = true;
    gemstone_fragments.add(gemstone_color_batch);
  }

  const gemstone_shardGeom = new THREE.OctahedronGeometry(1, 0);
  const gemstone_shards = new THREE.Group();
  gemstone_shards.name = "gemstone_shards";
  pendant.add(gemstone_shards);

  const shard_count = 36;
  for (let color_index = 0; color_index < gemstone_palette.length; color_index++) {
    const gemstone_shard_batch = new THREE.InstancedMesh(
      gemstone_shardGeom,
      gemstoneMats[color_index],
      3
    );
    gemstone_shard_batch.name = "gemstone_shard_batch_" + color_index;

    for (let j = 0; j < 3; j++) {
      const i = color_index + j * gemstone_palette.length;
      const u = ((i * 19 + 5) % 37) / 36;
      const v = ((i * 23 + 3) % 41) / 40;
      const w = ((i * 29 + 7) % 43) / 42;
      const envelope = 0.27 + 0.09 * Math.sin((v + 0.1) * Math.PI);

      gemstone_dummy.position.set(
        (u - 0.5) * 2 * envelope,
        -0.53 + v * 0.69,
        -0.105 + w * 0.21
      );
      gemstone_dummy.rotation.set(
        (i * 0.53) % Math.PI,
        (i * 0.89) % Math.PI,
        (i * 1.31) % Math.PI
      );
      gemstone_dummy.scale.set(
        0.012 + 0.018 * (((i * 5 + 1) % 9) / 8),
        0.040 + 0.055 * (((i * 7 + 2) % 11) / 10),
        0.010 + 0.015 * (((i * 3 + 4) % 7) / 6)
      );
      gemstone_dummy.updateMatrix();
      gemstone_shard_batch.setMatrixAt(j, gemstone_dummy.matrix);
    }

    gemstone_shard_batch.instanceMatrix.needsUpdate = true;
    gemstone_shards.add(gemstone_shard_batch);
  }

  const crystal_inclusion_pairs = [
    [new THREE.Vector3(-0.31, 0.39, 0.04), new THREE.Vector3(-0.12, 0.25, 0.07)],
    [new THREE.Vector3(-0.12, 0.25, 0.07), new THREE.Vector3(0.01, 0.34, 0.04)],
    [new THREE.Vector3(0.01, 0.34, 0.04), new THREE.Vector3(0.17, 0.20, 0.08)],
    [new THREE.Vector3(0.17, 0.20, 0.08), new THREE.Vector3(0.31, 0.29, 0.03)],
    [new THREE.Vector3(-0.20, 0.18, -0.04), new THREE.Vector3(-0.04, 0.07, 0.03)],
    [new THREE.Vector3(-0.04, 0.07, 0.03), new THREE.Vector3(0.12, 0.12, -0.06)],
    [new THREE.Vector3(0.12, 0.12, -0.06), new THREE.Vector3(0.27, 0.02, 0.02)]
  ];

  const crystal_inclusionsGeom = new THREE.CylinderGeometry(1, 1, 1, 5);
  const crystal_inclusions = new THREE.InstancedMesh(
    crystal_inclusionsGeom,
    crystal_inclusionsMat,
    crystal_inclusion_pairs.length
  );
  crystal_inclusions.name = "crystal_inclusions";

  for (let i = 0; i < crystal_inclusion_pairs.length; i++) {
    const p0 = crystal_inclusion_pairs[i][0];
    const p1 = crystal_inclusion_pairs[i][1];
    const direction = p1.clone().sub(p0);
    const length = direction.length();
    const midpoint = p0.clone().add(p1).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      edge_up,
      direction.normalize()
    );
    const scale = new THREE.Vector3(0.0022, length, 0.0022);
    crystal_inclusions.setMatrixAt(
      i,
      new THREE.Matrix4().compose(midpoint, quaternion, scale)
    );
  }
  crystal_inclusions.instanceMatrix.needsUpdate = true;
  pendant.add(crystal_inclusions);

  const crystal_capGeom = new THREE.CylinderGeometry(0.045, 0.078, 0.08, 10);
  const crystal_cap = new THREE.Mesh(crystal_capGeom, crystal_bodyMat);
  crystal_cap.name = "crystal_cap";
  crystal_cap.position.set(0, 0.545, 0);
  crystal_cap.renderOrder = 2;
  pendant.add(crystal_cap);

  const connector_pinGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.09, 12);
  const connector_pin = new THREE.Mesh(connector_pinGeom, polished_silverMat);
  connector_pin.name = "connector_pin";
  connector_pin.position.set(0, 0.59, 0.01);
  pendant.add(connector_pin);

  const jump_ringGeom = new THREE.TorusGeometry(0.065, 0.012, 10, 32);
  const jump_ring = new THREE.Mesh(jump_ringGeom, polished_silverMat);
  jump_ring.name = "jump_ring";
  jump_ring.position.set(0, 0.63, 0.035);
  pendant.add(jump_ring);

  const bail_shape = new THREE.Shape();
  bail_shape.moveTo(0, -0.17);
  bail_shape.bezierCurveTo(0.065, -0.12, 0.10, 0.03, 0.08, 0.13);
  bail_shape.bezierCurveTo(0.055, 0.19, -0.055, 0.19, -0.08, 0.13);
  bail_shape.bezierCurveTo(-0.10, 0.03, -0.065, -0.12, 0, -0.17);

  const bail_hole = new THREE.Path();
  bail_hole.moveTo(0, -0.085);
  bail_hole.bezierCurveTo(-0.032, -0.045, -0.045, 0.04, -0.032, 0.10);
  bail_hole.bezierCurveTo(-0.016, 0.125, 0.016, 0.125, 0.032, 0.10);
  bail_hole.bezierCurveTo(0.045, 0.04, 0.032, -0.045, 0, -0.085);
  bail_shape.holes.push(bail_hole);

  const bailGeom = new THREE.ExtrudeGeometry(bail_shape, {
    depth: 0.05,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.008,
    bevelSegments: 3,
    curveSegments: 16
  });
  bailGeom.translate(0, 0, -0.025);

  const bail = new THREE.Mesh(bailGeom, polished_silverMat);
  bail.name = "bail";
  bail.position.set(0, 0.80, 0.015);
  bail.rotation.y = -0.12;
  pendant.add(bail);

  pendant.rotation.y = -0.16;
  pendant.rotation.z = -0.06;

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