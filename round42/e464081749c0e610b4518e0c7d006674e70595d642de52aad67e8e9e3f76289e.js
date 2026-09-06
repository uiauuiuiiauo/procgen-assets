export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "faceted_garnet_crystal";

  const crystal = new THREE.Group();
  crystal.name = "crystal";
  crystal.rotation.set(0.04, -0.14, -0.20);
  root.add(crystal);

  const crystal_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x5a0718,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const deep_ruby_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0x310008,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const blood_ruby_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0x850016,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const scarlet_ruby_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xc51a2d,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const smoky_ruby_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0x21171b,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const rose_ruby_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0x9a4050,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });
  const inner_ruby_coreMat = new THREE.MeshStandardMaterial({
    color: 0x4b000b,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const main_mineral_veinMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const surface_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xd8d1cf,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const surface_flecksMat = new THREE.MeshStandardMaterial({
    color: 0xe0a073,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const surface_scratchesMat = new THREE.LineBasicMaterial({
    color: 0xd7d0ce,
    transparent: true,
    opacity: 0.62
  });

  function makeRing(y, radiusX, radiusZ, offsetX, offsetZ) {
    return [
      new THREE.Vector3(offsetX, y, radiusZ),
      new THREE.Vector3(offsetX + radiusX * 0.68, y, radiusZ * 0.56),
      new THREE.Vector3(offsetX + radiusX, y, 0),
      new THREE.Vector3(offsetX + radiusX * 0.62, y, -radiusZ * 0.66),
      new THREE.Vector3(offsetX, y, -radiusZ),
      new THREE.Vector3(offsetX - radiusX * 0.72, y, -radiusZ * 0.52),
      new THREE.Vector3(offsetX - radiusX, y, 0),
      new THREE.Vector3(offsetX - radiusX * 0.62, y, radiusZ * 0.68)
    ];
  }

  function makeFacetData() {
    return {
      positions: [],
      groups: []
    };
  }

  function addOrientedTriangle(data, a, b, c, materialIndex, outward) {
    const edge1 = new THREE.Vector3().subVectors(b, a);
    const edge2 = new THREE.Vector3().subVectors(c, a);
    const normal = edge1.cross(edge2);
    let second = b;
    let third = c;

    if (normal.dot(outward) < 0) {
      second = c;
      third = b;
    }

    const start = data.positions.length / 3;
    data.positions.push(
      a.x, a.y, a.z,
      second.x, second.y, second.z,
      third.x, third.y, third.z
    );
    data.groups.push({ start, materialIndex });
  }

  function addQuad(data, a, b, c, d, materialIndex, outward) {
    addOrientedTriangle(data, a, b, c, materialIndex, outward);
    addOrientedTriangle(data, a, c, d, materialIndex, outward);
  }

  function makeFacetGeometry(data) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(data.positions, 3)
    );

    for (const group of data.groups) {
      geometry.addGroup(group.start, 3, group.materialIndex);
    }

    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function radialNormal(angle) {
    return new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    ).normalize();
  }

  const lower_ring = makeRing(-0.64, 0.38, 0.31, -0.03, 0.01);
  const middle_ring = makeRing(0.10, 0.42, 0.34, 0.01, -0.01);
  const upper_ring = makeRing(0.56, 0.39, 0.32, 0.04, -0.02);
  const top_ring = [
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015),
    new THREE.Vector3(0.035, 0.72, 0.015)
  ];

  const crystal_bodyData = makeFacetData();

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    const angle = (i + 0.5) / 8 * Math.PI * 2;
    const normal = radialNormal(angle);

    addQuad(
      crystal_bodyData,
      lower_ring[i],
      middle_ring[i],
      middle_ring[next],
      lower_ring[next],
      0,
      normal
    );
    addQuad(
      crystal_bodyData,
      middle_ring[i],
      upper_ring[i],
      upper_ring[next],
      middle_ring[next],
      0,
      normal
    );
    addQuad(
      crystal_bodyData,
      upper_ring[i],
      top_ring[i],
      top_ring[next],
      upper_ring[next],
      0,
      normal
    );
  }

  const bottom_center = new THREE.Vector3(-0.03, -0.64, 0.01);
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addOrientedTriangle(
      crystal_bodyData,
      bottom_center,
      lower_ring[next],
      lower_ring[i],
      0,
      new THREE.Vector3(0, -1, 0)
    );
  }

  const crystal_bodyGeom = makeFacetGeometry(crystal_bodyData);
  const crystal_body = new THREE.Mesh(crystal_bodyGeom, crystal_bodyMat);
  crystal_body.name = "crystal_body";
  crystal_body.renderOrder = 1;
  crystal.add(crystal_body);

  const inner_ruby_coreGeom = new THREE.DodecahedronGeometry(0.31, 0);
  const inner_ruby_core = new THREE.Mesh(inner_ruby_coreGeom, inner_ruby_coreMat);
  inner_ruby_core.name = "inner_ruby_core";
  inner_ruby_core.position.set(-0.01, -0.02, 0);
  inner_ruby_core.scale.set(0.92, 1.62, 0.76);
  inner_ruby_core.rotation.set(0.08, 0.24, -0.05);
  inner_ruby_core.renderOrder = 0;
  crystal.add(inner_ruby_core);

  const front_left_mid = new THREE.Vector3(-0.15, 0.09, 0.326);
  const front_left_top = new THREE.Vector3(-0.14, 0.55, 0.306);
  const front_top_left = new THREE.Vector3(-0.02, 0.69, 0.15);
  const front_ridge_left = new THREE.Vector3(-0.005, 0.04, 0.35);
  const front_ridge_right = new THREE.Vector3(0.045, -0.02, 0.354);
  const front_ridge_bottom = new THREE.Vector3(0.015, -0.58, 0.286);
  const front_lower_left = new THREE.Vector3(-0.18, -0.58, 0.278);
  const front_lower_right = new THREE.Vector3(0.21, -0.55, 0.26);

  const front_facetsData = makeFacetData();
  addQuad(
    front_facetsData,
    lower_ring[0],
    front_ridge_bottom,
    front_ridge_right,
    middle_ring[1],
    3,
    radialNormal(Math.PI * 0.125)
  );
  addQuad(
    front_facetsData,
    lower_ring[0],
    front_lower_left,
    front_ridge_bottom,
    front_facetsData,
    2,
    radialNormal(Math.PI * 0.125)
  );
  addQuad(
    front_facetsData,
    front_lower_left,
    front_left_mid,
    front_ridge_right,
    front_ridge_bottom,
    2,
    radialNormal(Math.PI * 0.125)
  );
  addQuad(
    front_facetsData,
    front_lower_left,
    middle_ring[0],
    front_left_mid,
    front_ridge_right,
    1,
    radialNormal(Math.PI * 0.125)
  );
  addQuad(
    front_facetsData,
    front_left_mid,
    front_left_top,
    front_ridge_left,
    front_ridge_right,
    2,
    radialNormal(Math.PI * 0.125)
  );
  addQuad(
    front_facetsData,
    front_left_top,
    front_top_left,
    top_ring[1],
    front_ridge_left,
    3,
    radialNormal(Math.PI * 0.125)
  );
  addQuad(
    front_facetsData,
    middle_ring[1],
    front_ridge_right,
    front_left_top,
    upper_ring[1],
    4,
    radialNormal(Math.PI * 0.375)
  );
  addQuad(
    front_facetsData,
    front_ridge_right,
    front_lower_right,
    front_ridge_bottom,
    front_left_mid,
    3,
    radialNormal(Math.PI * 0.375)
  );
  addQuad(
    front_facetsData,
    front_lower_right,
    lower_ring[1],
    front_ridge_bottom,
    front_ridge_right,
    1,
    radialNormal(Math.PI * 0.375)
  );
  addQuad(
    front_facetsData,
    front_lower_right,
    middle_ring[2],
    upper_ring[2],
    front_left_top,
    2,
    radialNormal(Math.PI * 0.375)
  );

  const front_facetsGeom = makeFacetGeometry(front_facetsData);
  const front_facetsMats = [
    deep_ruby_facetsMat,
    blood_ruby_facetsMat,
    scarlet_ruby_facetsMat,
    smoky_ruby_facetsMat,
    rose_ruby_facetsMat
  ];
  const front_facets = new THREE.Mesh(front_facetsGeom, front_facetsMats);
  front_facets.name = "front_facets";
  front_facets.renderOrder = 2;
  crystal.add(front_facets);

  const right_mid_point = new THREE.Vector3(0.405, 0.08, 0.08);
  const right_top_point = new THREE.Vector3(0.385, 0.54, 0.06);
  const right_lower_point = new THREE.Vector3(0.35, -0.56, 0.04);

  const right_facetsData = makeFacetData();
  const right_mid_normal = radialNormal(-Math.PI * 0.125);
  const right_top_normal = radialNormal(-Math.PI * 0.375);

  addQuad(
    right_facetsData,
    lower_ring[1],
    right_lower_point,
    right_mid_point,
    middle_ring[2],
    1,
    right_mid_normal
  );
  addQuad(
    right_facetsData,
    right_lower_point,
    lower_ring[2],
    front_lower_right,
    right_mid_point,
    3,
    right_mid_normal
  );
  addQuad(
    right_facetsData,
    middle_ring[2],
    right_mid_point,
    right_top_point,
    upper_ring[2],
    2,
    right_top_normal
  );
  addQuad(
    right_facetsData,
    right_mid_point,
    right_lower_point,
    front_left_top,
    right_top_point,
    4,
    right_top_normal
  );
  addQuad(
    right_facetsData,
    upper_ring[2],
    right_top_point,
    top_ring[2],
    upper_ring[3],
    3,
    right_top_normal
  );
  addQuad(
    right_facetsData,
    lower_ring[2],
    right_lower_point,
    right_mid_point,
    middle_ring[3],
    0,
    radialNormal(-Math.PI * 0.625)
  );
  addQuad(
    right_facetsData,
    middle_ring[3],
    right_mid_point,
    right_top_point,
    upper_ring[3],
    1,
    radialNormal(-Math.PI * 0.625)
  );

  const right_facetsGeom = makeFacetGeometry(right_facetsData);
  const right_facetsMats = [
    crystal_bodyMat,
    blood_ruby_facetsMat,
    scarlet_ruby_facetsMat,
    smoky_ruby_facetsMat,
    rose_ruby_facetsMat
  ];
  const right_facets = new THREE.Mesh(right_facetsGeom, right_facetsMats);
  right_facets.name = "right_facets";
  right_facets.renderOrder = 2;
  crystal.add(right_facets);

  const left_mid_point = new THREE.Vector3(-0.405, 0.06, -0.02);
  const left_top_point = new THREE.Vector3(-0.37, 0.52, -0.04);
  const left_lower_point = new THREE.Vector3(-0.35, -0.55, -0.03);

  const left_facetsData = makeFacetData();
  const left_mid_normal = radialNormal(Math.PI * 0.625);
  const left_top_normal = radialNormal(Math.PI * 0.375);

  addQuad(
    left_facetsData,
    lower_ring[6],
    left_lower_point,
    left_mid_point,
    middle_ring[7],
    2,
    left_mid_normal
  );
  addQuad(
    left_facetsData,
    left_lower_point,
    lower_ring[7],
    front_lower_left,
    left_mid_point,
    1,
    left_mid_normal
  );
  addQuad(
    left_facetsData,
    middle_ring[7],
    left_mid_point,
    left_top_point,
    upper_ring[7],
    3,
    left_top_normal
  );
  addQuad(
    left_facetsData,
    left_mid_point,
    left_lower_point,
    front_left_mid,
    left_top_point,
    4,
    left_top_normal
  );
  addQuad(
    left_facetsData,
    upper_ring[7],
    left_top_point,
    top_ring[7],
    upper_ring[0],
    2,
    left_top_normal
  );
  addQuad(
    left_facetsData,
    lower_ring[7],
    left_lower_point,
    left_mid_point,
    middle_ring[0],
    0,
    radialNormal(Math.PI * 0.875)
  );
  addQuad(
    left_facetsData,
    middle_ring[0],
    left_mid_point,
    left_top_point,
    upper_ring[0],
    1,
    radialNormal(Math.PI * 0.875)
  );

  const left_facetsGeom = makeFacetGeometry(left_facetsData);
  const left_facetsMats = [
    crystal_bodyMat,
    blood_ruby_facetsMat,
    scarlet_ruby_facetsMat,
    smoky_ruby_facetsMat,
    rose_ruby_facetsMat
  ];
  const left_facets = new THREE.Mesh(left_facetsGeom, left_facetsMats);
  left_facets.name = "left_facets";
  left_facets.renderOrder = 2;
  crystal.add(left_facets);

  const rear_mid_point = new THREE.Vector3(0.02, 0.08, -0.345);
  const rear_top_point = new THREE.Vector3(0.01, 0.53, -0.325);
  const rear_lower_point = new THREE.Vector3(0.00, -0.56, -0.305);

  const rear_facetsData = makeFacetData();
  addQuad(
    rear_facetsData,
    lower_ring[3],
    rear_lower_point,
    rear_mid_point,
    middle_ring[4],
    1,
    new THREE.Vector3(0, 0, -1)
  );
  addQuad(
    rear_facetsData,
    rear_lower_point,
    lower_ring[4],
    front_lower_right,
    rear_mid_point,
    2,
    new THREE.Vector3(0, 0, -1)
  );
  addQuad(
    rear_facetsData,
    middle_ring[4],
    rear_mid_point,
    rear_top_point,
    upper_ring[4],
    3,
    new THREE.Vector3(0, 0, -1)
  );
  addQuad(
    rear_facetsData,
    rear_mid_point,
    rear_lower_point,
    front_left_top,
    rear_top_point,
    4,
    new THREE.Vector3(0, 0, -1)
  );
  addQuad(
    rear_facetsData,
    upper_ring[4],
    rear_top_point,
    top_ring[4],
    upper_ring[5],
    2,
    new THREE.Vector3(0, 0, -1)
  );

  const rear_facetsGeom = makeFacetGeometry(rear_facetsData);
  const rear_facetsMats = [
    deep_ruby_facetsMat,
    blood_ruby_facetsMat,
    scarlet_ruby_facetsMat,
    smoky_ruby_facetsMat,
    rose_ruby_facetsMat
  ];
  const rear_facets = new THREE.Mesh(rear_facetsGeom, rear_facetsMats);
  rear_facets.name = "rear_facets";
  rear_facets.renderOrder = 2;
  crystal.add(rear_facets);

  const main_mineral_veinPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.005, 0.07, 0.357),
    new THREE.Vector3(0.035, -0.01, 0.359),
    new THREE.Vector3(0.005, -0.11, 0.353),
    new THREE.Vector3(0.040, -0.21, 0.344),
    new THREE.Vector3(0.000, -0.32, 0.329),
    new THREE.Vector3(0.025, -0.44, 0.310),
    new THREE.Vector3(0.015, -0.58, 0.289)
  ], false, "centripetal");
  const main_mineral_veinGeom = new THREE.TubeGeometry(
    main_mineral_veinPath,
    36,
    0.006,
    6,
    false
  );
  const main_mineral_vein = new THREE.Mesh(
    main_mineral_veinGeom,
    main_mineral_veinMat
  );
  main_mineral_vein.name = "main_mineral_vein";
  main_mineral_vein.renderOrder = 4;
  crystal.add(main_mineral_vein);

  const lower_mineral_branchPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.020, -0.34, 0.331),
    new THREE.Vector3(0.095, -0.39, 0.323),
    new THREE.Vector3(0.155, -0.46, 0.302),
    new THREE.Vector3(0.215, -0.52, 0.269)
  ], false, "centripetal");
  const lower_mineral_branchGeom = new THREE.TubeGeometry(
    lower_mineral_branchPath,
    18,
    0.0045,
    6,
    false
  );
  const lower_mineral_branch = new THREE.Mesh(
    lower_mineral_branchGeom,
    main_mineral_veinMat
  );
  lower_mineral_branch.name = "lower_mineral_branch";
  lower_mineral_branch.renderOrder = 4;
  crystal.add(lower_mineral_branch);

  const left_mineral_branchPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.010, -0.42, 0.316),
    new THREE.Vector3(-0.075, -0.45, 0.306),
    new THREE.Vector3(-0.145, -0.50, 0.287),
    new THREE.Vector3(-0.205, -0.55, 0.270)
  ], false, "centripetal");
  const left_mineral_branchGeom = new THREE.TubeGeometry(
    left_mineral_branchPath,
    18,
    0.0038,
    6,
    false
  );
  const left_mineral_branch = new THREE.Mesh(
    left_mineral_branchGeom,
    main_mineral_veinMat
  );
  left_mineral_branch.name = "left_mineral_branch";
  left_mineral_branch.renderOrder = 4;
  crystal.add(left_mineral_branch);

  const surface_specklesGeom = new THREE.CircleGeometry(0.007, 8);
  const surface_speckles = new THREE.InstancedMesh(
    surface_specklesGeom,
    surface_specklesMat,
    24
  );
  surface_speckles.name = "surface_speckles";
  surface_speckles.renderOrder = 5;

  const speckle_dummy = new THREE.Object3D();
  const front_normal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < 24; i++) {
    const x = -0.27 + ((i * 7) % 23) / 22 * 0.54;
    const y = -0.54 + ((i * 11) % 29) / 28 * 1.08;
    const z = 0.34 * (1 - Math.abs(x) / 0.46) + 0.007;
    const scale = 0.55 + ((i * 5) % 8) * 0.11;

    speckle_dummy.position.set(x, y, z);
    speckle_dummy.quaternion.setFromUnitVectors(front_normal, radialNormal(1.43));
    speckle_dummy.scale.set(scale, scale * (0.7 + (i % 3) * 0.15), 1);
    speckle_dummy.updateMatrix();
    surface_speckles.setMatrixAt(i, speckle_dummy.matrix);
  }
  surface_speckles.instanceMatrix.needsUpdate = true;
  crystal.add(surface_speckles);

  const surface_flecksGeom = new THREE.CircleGeometry(0.006, 8);
  const surface_flecks = new THREE.InstancedMesh(
    surface_flecksGeom,
    surface_flecksMat,
    12
  );
  surface_flecks.name = "surface_flecks";
  surface_flecks.renderOrder = 5;

  const fleck_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const x = -0.24 + ((i * 5) % 13) / 12 * 0.47;
    const y = -0.48 + ((i * 9) % 17) / 16 * 0.94;
    const z = 0.338 * (1 - Math.abs(x) / 0.47) + 0.008;
    const scale = 0.65 + (i % 4) * 0.16;

    fleck_dummy.position.set(x, y, z);
    fleck_dummy.quaternion.setFromUnitVectors(front_normal, radialNormal(1.48));
    fleck_dummy.scale.set(scale, scale * 0.72, 1);
    fleck_dummy.updateMatrix();
    surface_flecks.setMatrixAt(i, fleck_dummy.matrix);
  }
  surface_flecks.instanceMatrix.needsUpdate = true;
  crystal.add(surface_flecks);

  const scratch_positions = [];
  for (let i = 0; i < 14; i++) {
    const x = -0.25 + ((i * 9) % 17) / 16 * 0.50;
    const y = -0.49 + ((i * 7) % 19) / 18 * 0.96;
    const length = 0.018 + (i % 4) * 0.009;
    const angle = -1.1 + (i % 7) * 0.34;
    const z = 0.341 * (1 - Math.abs(x) / 0.47) + 0.009;

    scratch_positions.push(
      x, y, z,
      x + Math.cos(angle) * length,
      y + Math.sin(angle) * length,
      z
    );
  }

  const surface_scratchesGeom = new THREE.BufferGeometry();
  surface_scratchesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(scratch_positions, 3)
  );
  const surface_scratches = new THREE.LineSegments(
    surface_scratchesGeom,
    surface_scratchesMat
  );
  surface_scratches.name = "surface_scratches";
  surface_scratches.renderOrder = 5;
  crystal.add(surface_scratches);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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