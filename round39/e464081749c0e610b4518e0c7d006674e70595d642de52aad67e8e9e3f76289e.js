export default function generate(THREE) {
  const root = new THREE.Group();
  const crystal = new THREE.Group();
  crystal.name = "crystal";
  crystal.rotation.set(0.04, -0.10, -0.34);
  crystal.scale.set(1.40, 1.00, 1.00);
  root.add(crystal);

  const gemstone_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x760b1b,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.88,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const black_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0x242527,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.58,
    ior: 1.5,
    transparent: true,
    opacity: 0.84,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const red_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xa50d22,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.68,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const maroon_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0x5f0715,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.62,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const rose_facetsMat = new THREE.MeshPhysicalMaterial({
    color: 0xc56a70,
    metalness: 0.0,
    roughness: 0.1,
    transmission: 0.72,
    ior: 1.5,
    transparent: true,
    opacity: 0.72,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const inner_coreMat = new THREE.MeshStandardMaterial({
    color: 0x4f0712,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.2
  });

  const inner_red_cloudsMat = new THREE.MeshStandardMaterial({
    color: 0xe31a28,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });

  const inner_amber_cloudsMat = new THREE.MeshStandardMaterial({
    color: 0xff8060,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.26,
    depthWrite: false
  });

  const inner_smoky_bandsMat = new THREE.MeshStandardMaterial({
    color: 0x171519,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });

  const mineral_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0xc2b9aa,
    metalness: 0.0,
    roughness: 0.7
  });

  const surface_specksMat = new THREE.MeshStandardMaterial({
    color: 0xd8d0c2,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });

  const dark_inclusionsMat = new THREE.MeshStandardMaterial({
    color: 0x151315,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide
  });

  const cross_section = [
    new THREE.Vector2(-0.31, 0.38),
    new THREE.Vector2(0.27, 0.36),
    new THREE.Vector2(0.45, 0.16),
    new THREE.Vector2(0.43, -0.20),
    new THREE.Vector2(0.22, -0.38),
    new THREE.Vector2(-0.28, -0.39),
    new THREE.Vector2(-0.45, -0.18),
    new THREE.Vector2(-0.43, 0.16)
  ];

  function makeRing(y, scaleX, scaleZ, offsetX, offsetZ) {
    return cross_section.map(function (point) {
      return new THREE.Vector3(
        point.x * scaleX + offsetX,
        y,
        point.y * scaleZ + offsetZ
      );
    });
  }

  const bottom_ring = makeRing(-0.70, 0.78, 0.72, 0.01, 0.00);
  const lower_ring = makeRing(-0.42, 1.00, 0.95, 0.00, 0.00);
  const middle_ring = makeRing(0.04, 1.02, 0.98, -0.01, 0.00);
  const shoulder_ring = makeRing(0.35, 0.96, 0.92, -0.02, 0.00);
  const top_ring = makeRing(0.72, 0.27, 0.24, -0.04, 0.00);
  const top_center = new THREE.Vector3(-0.04, 0.72, 0.00);
  const bottom_center = new THREE.Vector3(0.01, -0.70, 0.00);

  const bodyPositions = [];
  const bodyGroups = [];

  function pushBodyTriangle(a, b, c, materialIndex) {
    const start = bodyPositions.length / 3;
    bodyPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z
    );
    bodyGroups.push([start, 3, materialIndex]);
  }

  function pushBodyQuad(a, b, c, d, materialIndex) {
    const start = bodyPositions.length / 3;
    bodyPositions.push(
      a.x, a.y, a.z,
      b.x, b.y, b.z,
      c.x, c.y, c.z,
      a.x, a.y, a.z,
      c.x, c.y, c.z,
      d.x, d.y, d.z
    );
    bodyGroups.push([start, 6, materialIndex]);
  }

  function addSideBand(lower, upper, bandIndex) {
    for (let i = 0; i < 8; i++) {
      const next = (i + 1) % 8;
      let materialIndex;
      if (bandIndex === 0) {
        const codes = [1, 0, 2, 1, 4, 0, 3, 1];
        materialIndex = codes[i];
      } else if (bandIndex === 1) {
        const codes = [2, 1, 0, 3, 1, 2, 0, 4];
        materialIndex = codes[i];
      } else if (bandIndex === 2) {
        const codes = [0, 3, 1, 2, 0, 4, 1, 2];
        materialIndex = codes[i];
      } else {
        const codes = [4, 1, 2, 0, 3, 1, 2, 0];
        materialIndex = codes[i];
      }

      if (i % 2 === 0) {
        pushBodyQuad(
          lower[i],
          lower[next],
          upper[next],
          upper[i],
          materialIndex
        );
      } else {
        pushBodyTriangle(lower[i], lower[next], upper[next], materialIndex);
        pushBodyTriangle(
          lower[i],
          upper[next],
          upper[i],
          materialIndex
        );
      }
    }
  }

  addSideBand(bottom_ring, lower_ring, 3);
  addSideBand(lower_ring, middle_ring, 2);
  addSideBand(middle_ring, shoulder_ring, 1);
  addSideBand(shoulder_ring, top_ring, 0);

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    let materialIndex;
    if (i >= 1 && i <= 3) {
      materialIndex = i === 2 ? 1 : 0;
    } else if (i === 4) {
      materialIndex = 4;
    } else if (i === 6) {
      materialIndex = 3;
    } else {
      materialIndex = 2;
    }
    pushBodyTriangle(top_ring[i], top_center, top_ring[next], materialIndex);
  }

  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    const materialIndex = i === 0 ? 4 : (i === 7 ? 1 : 2);
    pushBodyTriangle(bottom_ring[next], bottom_center, bottom_ring[i], materialIndex);
  }

  const gemstone_bodyGeom = new THREE.BufferGeometry();
  gemstone_bodyGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(bodyPositions, 3)
  );
  for (const group of bodyGroups) {
    gemstone_bodyGeom.addGroup(group[0], group[1], group[2]);
  }
  gemstone_bodyGeom.computeVertexNormals();

  const inner_core = new THREE.Mesh(gemstone_bodyGeom, inner_coreMat);
  inner_core.name = "inner_core";
  inner_core.scale.set(0.76, 0.84, 0.72);
  inner_core.rotation.set(0.015, -0.08, 0.025);
  inner_core.renderOrder = 0;
  crystal.add(inner_core);

  const inner_red_cloudsGeom = new THREE.SphereGeometry(0.22, 20, 12);
  const inner_red_clouds = new THREE.InstancedMesh(
    inner_red_cloudsGeom,
    inner_red_cloudsMat,
    4
  );
  inner_red_clouds.name = "inner_red_clouds";

  const cloud_dummy = new THREE.Object3D();
  const redCloudData = [
    [-0.10, 0.23, 0.02, 1.38, 0.48, 0.90, 0.18, 0.22, -0.12],
    [0.14, -0.08, 0.08, 1.18, 0.42, 0.82, -0.20, 0.48, 0.16],
    [-0.16, -0.36, -0.04, 1.02, 0.38, 0.78, 0.12, -0.35, 0.28],
    [0.06, 0.40, -0.06, 0.92, 0.34, 0.72, -0.16, 0.18, -0.20]
  ];

  for (let i = 0; i < redCloudData.length; i++) {
    const data = redCloudData[i];
    cloud_dummy.position.set(data[0], data[1], data[2]);
    cloud_dummy.scale.set(data[3], data[4], data[5]);
    cloud_dummy.rotation.set(data[6], data[7], data[8]);
    cloud_dummy.updateMatrix();
    inner_red_clouds.setMatrixAt(i, cloud_dummy.matrix);
  }
  inner_red_clouds.instanceMatrix.needsUpdate = true;
  inner_red_clouds.renderOrder = 1;
  crystal.add(inner_red_clouds);

  const inner_amber_cloudsGeom = new THREE.SphereGeometry(0.18, 18, 10);
  const inner_amber_clouds = new THREE.InstancedMesh(
    inner_amber_cloudsGeom,
    inner_amber_cloudsMat,
    3
  );
  inner_amber_clouds.name = "inner_amber_clouds";

  const amberCloudData = [
    [0.02, 0.10, 0.14, 1.45, 0.34, 0.72, 0.16, -0.25, 0.30],
    [0.18, -0.18, 0.02, 1.05, 0.30, 0.68, -0.18, 0.38, -0.14],
    [-0.10, 0.31, 0.04, 0.88, 0.28, 0.62, 0.20, 0.18, 0.18]
  ];

  for (let i = 0; i < amberCloudData.length; i++) {
    const data = amberCloudData[i];
    cloud_dummy.position.set(data[0], data[1], data[2]);
    cloud_dummy.scale.set(data[3], data[4], data[5]);
    cloud_dummy.rotation.set(data[6], data[7], data[8]);
    cloud_dummy.updateMatrix();
    inner_amber_clouds.setMatrixAt(i, cloud_dummy.matrix);
  }
  inner_amber_clouds.instanceMatrix.needsUpdate = true;
  inner_amber_clouds.renderOrder = 1;
  crystal.add(inner_amber_clouds);

  const inner_smoky_bandsGeom = new THREE.SphereGeometry(0.20, 18, 10);
  const inner_smoky_bands = new THREE.InstancedMesh(
    inner_smoky_bandsGeom,
    inner_smoky_bandsMat,
    3
  );
  inner_smoky_bands.name = "inner_smoky_bands";

  const smokyBandData = [
    [-0.02, 0.02, 0.00, 1.75, 0.25, 0.78, 0.08, 0.18, -0.28],
    [0.10, -0.27, 0.00, 1.35, 0.22, 0.82, -0.12, -0.30, 0.22],
    [-0.12, 0.29, -0.02, 1.10, 0.20, 0.70, 0.16, 0.24, 0.18]
  ];

  for (let i = 0; i < smokyBandData.length; i++) {
    const data = smokyBandData[i];
    cloud_dummy.position.set(data[0], data[1], data[2]);
    cloud_dummy.scale.set(data[3], data[4], data[5]);
    cloud_dummy.rotation.set(data[6], data[7], data[8]);
    cloud_dummy.updateMatrix();
    inner_smoky_bands.setMatrixAt(i, cloud_dummy.matrix);
  }
  inner_smoky_bands.instanceMatrix.needsUpdate = true;
  inner_smoky_bands.renderOrder = 1;
  crystal.add(inner_smoky_bands);

  const gemstone_body = new THREE.Mesh(gemstone_bodyGeom, [
    gemstone_bodyMat,
    black_facetsMat,
    red_facetsMat,
    maroon_facetsMat,
    rose_facetsMat
  ]);
  gemstone_body.name = "gemstone_body";
  gemstone_body.renderOrder = 2;
  crystal.add(gemstone_body);

  const mineral_inclusions = new THREE.Group();
  mineral_inclusions.name = "mineral_inclusions";

  function addInclusion(points, radius) {
    const curve = new THREE.CatmullRomCurve3(points);
    const inclusionGeom = new THREE.TubeGeometry(
      curve,
      20,
      radius,
      5,
      false
    );
    const inclusion = new THREE.Mesh(inclusionGeom, mineral_inclusionsMat);
    mineral_inclusions.add(inclusion);
  }

  addInclusion([
    new THREE.Vector3(-0.055, -0.62, 0.255),
    new THREE.Vector3(-0.075, -0.48, 0.270),
    new THREE.Vector3(-0.030, -0.34, 0.282),
    new THREE.Vector3(0.005, -0.20, 0.292),
    new THREE.Vector3(0.045, -0.08, 0.300),
    new THREE.Vector3(0.020, 0.07, 0.305)
  ], 0.0042);

  addInclusion([
    new THREE.Vector3(0.020, 0.07, 0.304),
    new THREE.Vector3(-0.012, 0.15, 0.308),
    new THREE.Vector3(0.018, 0.24, 0.304),
    new THREE.Vector3(-0.025, 0.34, 0.288)
  ], 0.0032);

  addInclusion([
    new THREE.Vector3(-0.030, -0.34, 0.280),
    new THREE.Vector3(0.080, -0.39, 0.274),
    new THREE.Vector3(0.180, -0.43, 0.250),
    new THREE.Vector3(0.270, -0.47, 0.205)
  ], 0.0034);

  addInclusion([
    new THREE.Vector3(0.045, -0.08, 0.296),
    new THREE.Vector3(-0.055, -0.12, 0.302),
    new THREE.Vector3(-0.155, -0.17, 0.286)
  ], 0.0028);

  crystal.add(mineral_inclusions);

  function frontSurfaceZ(x) {
    if (x <= 0.27) {
      return 0.36 - (x + 0.31) * (0.02 / 0.58);
    }
    return 0.352 - (x - 0.27) * (0.19 / 0.18);
  }

  function frontSurfaceNormal(x) {
    let slope = -0.02 / 0.58;
    if (x > 0.27) slope = -0.19 / 0.18;
    return new THREE.Vector3(-slope, 0, 1).normalize();
  }

  const surface_specksGeom = new THREE.CircleGeometry(0.008, 10);
  const surface_specks = new THREE.InstancedMesh(
    surface_specksGeom,
    surface_specksMat,
    18
  );
  surface_specks.name = "surface_specks";

  const speck_dummy = new THREE.Object3D();
  const front_axis = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 18; i++) {
    const x = -0.29 + (((i * 7) % 19) / 18) * 0.61;
    const y = -0.55 + (((i * 11) % 23) / 22) * 0.78;
    const normal = frontSurfaceNormal(x);
    const size = 0.48 + ((i * 5) % 7) * 0.11;
    speck_dummy.position.set(x, y, frontSurfaceZ(x));
    speck_dummy.position.addScaledVector(normal, 0.006);
    speck_dummy.quaternion.setFromUnitVectors(front_axis, normal);
    speck_dummy.scale.set(size, size, 1);
    speck_dummy.updateMatrix();
    surface_specks.setMatrixAt(i, speck_dummy.matrix);
  }
  surface_specks.instanceMatrix.needsUpdate = true;
  surface_specks.renderOrder = 3;
  crystal.add(surface_specks);

  const dark_inclusionsGeom = new THREE.CircleGeometry(0.018, 12);
  const dark_inclusions = new THREE.InstancedMesh(
    dark_inclusionsGeom,
    dark_inclusionsMat,
    7
  );
  dark_inclusions.name = "dark_inclusions";

  const darkData = [
    [-0.25, 0.28, 1.15, 0.55, 0.20],
    [0.22, 0.18, 0.72, 1.18, -0.45],
    [-0.12, -0.18, 1.35, 0.62, 0.30],
    [0.29, -0.30, 0.82, 0.48, -0.20],
    [-0.22, -0.47, 0.70, 1.10, 0.55],
    [0.08, 0.48, 0.62, 0.95, -0.35],
    [0.33, -0.02, 0.55, 0.75, 0.15]
  ];

  for (let i = 0; i < darkData.length; i++) {
    const data = darkData[i];
    const normal = frontSurfaceNormal(data[0]);
    speck_dummy.position.set(data[0], data[1], frontSurfaceZ(data[0]));
    speck_dummy.position.addScaledVector(normal, 0.007);
    speck_dummy.quaternion.setFromUnitVectors(front_axis, normal);
    speck_dummy.rotateZ(data[4]);
    speck_dummy.scale.set(data[2], data[3], 1);
    speck_dummy.updateMatrix();
    dark_inclusions.setMatrixAt(i, speck_dummy.matrix);
  }
  dark_inclusions.instanceMatrix.needsUpdate = true;
  dark_inclusions.renderOrder = 3;
  crystal.add(dark_inclusions);

  fitToUnitCube(THREE, root);
  return root;

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
}