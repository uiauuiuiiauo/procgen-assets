export default function generate(THREE) {
  const root = new THREE.Group();
  const crystal_assembly = new THREE.Group();
  crystal_assembly.rotation.set(0.08, -0.38, -0.62);
  root.add(crystal_assembly);

  const outer_crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x8bcfff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const side_crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x3d86d8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const deep_crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x1f5fa8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.52,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const frosted_crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xc9efff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0x54bfff,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0x54bfff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const bright_inclusionMat = new THREE.MeshStandardMaterial({
    color: 0xc9f5ff,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0xc9f5ff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.72,
    depthWrite: false
  });

  const fractureMat = new THREE.MeshStandardMaterial({
    color: 0xdaf8ff,
    metalness: 0.0,
    roughness: 0.7,
    emissive: 0x86ddff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.32,
    depthWrite: false
  });

  const dark_inclusionMat = new THREE.MeshStandardMaterial({
    color: 0x174d82,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });

  const crystal_width = 0.64;
  const crystal_depth = 0.48;
  const corner_cut = 0.105;
  const body_bottom = -0.72;
  const body_top = 0.68;
  const tip_top = 1.02;
  const base_bottom = -1.06;

  function makeRing(y, width, depth, cut) {
    const hw = width * 0.5;
    const hd = depth * 0.5;
    return [
      new THREE.Vector3(-hw + cut, y, -hd),
      new THREE.Vector3(hw - cut, y, -hd),
      new THREE.Vector3(hw, y, -hd + cut),
      new THREE.Vector3(hw, y, hd - cut),
      new THREE.Vector3(hw - cut, y, hd),
      new THREE.Vector3(-hw + cut, y, hd),
      new THREE.Vector3(-hw, y, hd - cut),
      new THREE.Vector3(-hw, y, -hd + cut)
    ];
  }

  const base_ring = makeRing(base_bottom, 0.43, 0.33, 0.075);
  const lower_ring = makeRing(body_bottom, 0.60, 0.44, corner_cut);
  const upper_ring = makeRing(body_top, crystal_width, crystal_depth, corner_cut);
  const tip_ring = makeRing(tip_top, 0.055, 0.045, 0.012);
  const crystal_positions = [];

  function addTriangle(a, b, c) {
    crystal_positions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
  }

  function addQuad(a, b, c, d) {
    addTriangle(a, b, c);
    addTriangle(a, c, d);
  }

  function buildCrystalGeometry() {
    const rings = [base_ring, lower_ring, upper_ring, tip_ring];
    const centers = [
      new THREE.Vector3(0, base_bottom, 0),
      new THREE.Vector3(0, tip_top, 0)
    ];
    const groups = [];

    function addGroup(start, count, materialIndex) {
      groups.push({ start, count, materialIndex });
    }

    for (let j = 0; j < rings[0].length; j++) {
      const k = (j + 1) % rings[0].length;
      const start = crystal_positions.length / 3;
      addTriangle(centers[0], rings[0][k], rings[0][j]);
      addGroup(start, 1, j % 2 === 0 ? 2 : 1);
    }

    for (let r = 0; r < rings.length - 1; r++) {
      const lower = rings[r];
      const upper = rings[r + 1];

      for (let j = 0; j < lower.length; j++) {
        const k = (j + 1) % lower.length;
        let materialIndex = 2;
        if (r === 0) materialIndex = j % 3 === 0 ? 1 : 2;
        if (r === 1 && (j === 2 || j === 3 || j === 4)) materialIndex = 0;
        if (r === 1 && j === 0) materialIndex = 3;
        if (r === 2) materialIndex = j % 2 === 0 ? 1 : 2;

        const start = crystal_positions.length / 3;
        addQuad(lower[j], upper[j], upper[k], lower[k]);
        addGroup(start, 6, materialIndex);
      }
    }

    for (let j = 0; j < tip_ring.length; j++) {
      const k = (j + 1) % tip_ring.length;
      const start = crystal_positions.length / 3;
      addTriangle(centers[1], tip_ring[j], tip_ring[k]);
      addGroup(start, 1, j % 2 === 0 ? 1 : 2);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(crystal_positions, 3)
    );
    for (const group of groups) {
      geometry.addGroup(group.start, group.count, group.materialIndex);
    }
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const outer_crystalGeom = buildCrystalGeometry();
  const outer_crystal = new THREE.Mesh(outer_crystalGeom, [
    outer_crystalMat,
    side_crystalMat,
    deep_crystalMat,
    frosted_crystalMat
  ]);
  outer_crystal.renderOrder = 2;
  crystal_assembly.add(outer_crystal);

  const inner_glowGeom = new THREE.BoxGeometry(0.27, 1.34, 0.18);
  const inner_glow = new THREE.Mesh(inner_glowGeom, inner_glowMat);
  inner_glow.position.set(0.015, -0.02, 0.01);
  inner_glow.renderOrder = 1;
  crystal_assembly.add(inner_glow);

  const lower_fractureGeom = new THREE.BufferGeometry();
  lower_fractureGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -0.22, -0.88, 0.15,
      -0.07, -0.68, 0.19,
      0.17, -0.47, 0.14,
      -0.16, -0.55, 0.20,
       0.20, -0.83, 0.12,
       0.04, -0.61, 0.21,
       0.08, -0.96, 0.08,
       0.22, -0.70, 0.16,
      -0.20, -0.74, 0.10,
      -0.02, -0.52, 0.18
    ], 3)
  );
  const lower_fractureMat = new THREE.LineBasicMaterial({
    color: 0xc8f2ff,
    transparent: true,
    opacity: 0.52,
    depthWrite: false
  });
  const lower_fracture = new THREE.LineSegments(
    lower_fractureGeom,
    lower_fractureMat
  );
  lower_fracture.renderOrder = 3;
  crystal_assembly.add(lower_fracture);

  const upper_fractureGeom = new THREE.BufferGeometry();
  upper_fractureGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -0.20, 0.18, 0.19,
       0.02, 0.37, 0.21,
       0.21, 0.55, 0.15,
      -0.12, 0.51, 0.20,
       0.16, 0.22, 0.18,
      -0.19, 0.06, 0.15,
       0.13, 0.62, 0.16,
      -0.03, 0.42, 0.22
    ], 3)
  );
  const upper_fractureMat = new THREE.LineBasicMaterial({
    color: 0x2b78b8,
    transparent: true,
    opacity: 0.38,
    depthWrite: false
  });
  const upper_fracture = new THREE.LineSegments(
    upper_fractureGeom,
    upper_fractureMat
  );
  upper_fracture.renderOrder = 3;
  crystal_assembly.add(upper_fracture);

  const lower_cloudGeom = new THREE.SphereGeometry(1, 18, 12);
  const lower_cloud = new THREE.Mesh(lower_cloudGeom, frosted_crystalMat);
  lower_cloud.position.set(0.035, -0.70, 0.025);
  lower_cloud.scale.set(0.22, 0.25, 0.16);
  lower_cloud.rotation.set(0.18, -0.28, 0.12);
  lower_cloud.renderOrder = 1;
  crystal_assembly.add(lower_cloud);

  const tip_cloudGeom = new THREE.SphereGeometry(1, 16, 10);
  const tip_cloud = new THREE.Mesh(tip_cloudGeom, frosted_crystalMat);
  tip_cloud.position.set(-0.015, 0.73, 0.01);
  tip_cloud.scale.set(0.18, 0.20, 0.13);
  tip_cloud.rotation.set(-0.22, 0.31, -0.16);
  tip_cloud.renderOrder = 1;
  crystal_assembly.add(tip_cloud);

  const bright_inclusionGeom = new THREE.SphereGeometry(0.018, 10, 7);
  const bright_inclusion_data = [
    [-0.18, -0.82, 0.10, 1.2],
    [0.16, -0.66, 0.12, 0.8],
    [-0.21, -0.48, -0.04, 0.7],
    [0.20, -0.31, 0.10, 1.0],
    [-0.15, -0.12, 0.16, 0.65],
    [0.18, 0.04, -0.08, 0.8],
    [-0.20, 0.22, 0.08, 1.15],
    [0.16, 0.38, 0.12, 0.7],
    [-0.13, 0.53, -0.06, 0.9],
    [0.12, 0.66, 0.07, 0.65],
    [-0.08, 0.79, 0.02, 0.75],
    [0.08, 0.88, -0.02, 0.55]
  ];
  const bright_inclusions = new THREE.InstancedMesh(
    bright_inclusionGeom,
    bright_inclusionMat,
    bright_inclusion_data.length
  );
  const instance_dummy = new THREE.Object3D();
  for (let i = 0; i < bright_inclusion_data.length; i++) {
    const item = bright_inclusion_data[i];
    instance_dummy.position.set(item[0], item[1], item[2]);
    instance_dummy.rotation.set(i * 0.31, i * 0.47, i * 0.19);
    instance_dummy.scale.set(item[3], item[3] * 0.7, item[3]);
    instance_dummy.updateMatrix();
    bright_inclusions.setMatrixAt(i, instance_dummy.matrix);
  }
  bright_inclusions.instanceMatrix.needsUpdate = true;
  bright_inclusions.renderOrder = 3;
  crystal_assembly.add(bright_inclusions);

  const dark_inclusionGeom = new THREE.TetrahedronGeometry(0.026, 0);
  const dark_inclusion_data = [
    [-0.12, -0.91, -0.03],
    [0.15, -0.77, 0.04],
    [-0.18, -0.58, 0.10],
    [0.12, -0.39, -0.12],
    [-0.16, -0.20, -0.08],
    [0.18, 0.13, 0.05],
    [-0.12, 0.34, 0.12],
    [0.10, 0.57, -0.05]
  ];
  const dark_inclusions = new THREE.InstancedMesh(
    dark_inclusionGeom,
    dark_inclusionMat,
    dark_inclusion_data.length
  );
  for (let i = 0; i < dark_inclusion_data.length; i++) {
    const item = dark_inclusion_data[i];
    instance_dummy.position.set(item[0], item[1], item[2]);
    instance_dummy.rotation.set(i * 0.53, i * 0.29, i * 0.71);
    instance_dummy.scale.set(0.65 + i * 0.05, 1.0, 0.55);
    instance_dummy.updateMatrix();
    dark_inclusions.setMatrixAt(i, instance_dummy.matrix);
  }
  dark_inclusions.instanceMatrix.needsUpdate = true;
  dark_inclusions.renderOrder = 3;
  crystal_assembly.add(dark_inclusions);

  const lower_splitGeom = new THREE.BufferGeometry();
  lower_splitGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      -0.20, -0.64, 0.205,
       0.17, -0.51, 0.215,
      -0.16, -0.50, 0.218,
       0.20, -0.67, 0.190,
      -0.08, -0.91, 0.175,
       0.13, -0.78, 0.190
    ], 3)
  );
  const lower_splitMat = new THREE.LineBasicMaterial({
    color: 0xe0f8ff,
    transparent: true,
    opacity: 0.62,
    depthWrite: false
  });
  const lower_split = new THREE.LineSegments(lower_splitGeom, lower_splitMat);
  lower_split.renderOrder = 4;
  crystal_assembly.add(lower_split);

  function setEdgeInstance(mesh, index, a, b) {
    const direction = new THREE.Vector3().subVectors(b, a);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    const matrix = new THREE.Matrix4().compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    mesh.setMatrixAt(index, matrix);
  }

  const bevel_edgesGeom = new THREE.CylinderGeometry(0.0045, 0.0045, 1, 6);
  const bevel_edgesMat = new THREE.MeshStandardMaterial({
    color: 0xc8efff,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });
  const bevel_edges = new THREE.InstancedMesh(
    bevel_edgesGeom,
    bevel_edgesMat,
    16
  );

  for (let i = 0; i < 8; i++) {
    const k = (i + 1) % 8;
    setEdgeInstance(bevel_edges, i, lower_ring[i], upper_ring[k]);
  }
  for (let i = 0; i < 8; i++) {
    const k = (i + 1) % 8;
    setEdgeInstance(bevel_edges, 8 + i, upper_ring[i], upper_ring[k]);
  }
  bevel_edges.instanceMatrix.needsUpdate = true;
  bevel_edges.renderOrder = 5;
  crystal_assembly.add(bevel_edges);

  const lower_bevel_edgesGeom = new THREE.CylinderGeometry(0.0035, 0.0035, 1, 6);
  const lower_bevel_edgesMat = bevel_edgesMat;
  const lower_bevel_edges = new THREE.InstancedMesh(
    lower_bevel_edgesGeom,
    lower_bevel_edgesMat,
    8
  );
  for (let i = 0; i < 8; i++) {
    const k = (i + 1) % 8;
    setEdgeInstance(lower_bevel_edges, i, base_ring[i], lower_ring[k]);
  }
  lower_bevel_edges.instanceMatrix.needsUpdate = true;
  lower_bevel_edges.renderOrder = 5;
  crystal_assembly.add(lower_bevel_edges);

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