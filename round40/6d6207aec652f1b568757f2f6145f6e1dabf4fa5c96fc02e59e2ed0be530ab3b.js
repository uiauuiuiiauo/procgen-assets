export default function generate(THREE) {
  const root = new THREE.Group();

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xd8d8d8,
    metalness: 0.6,
    roughness: 0.2,
  });

  const diamondMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 2.4,
    transparent: true,
    opacity: 0.92,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const diamond_facetMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    transparent: true,
    opacity: 0.86,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });

  function createDiamondGeometry() {
    const positions = [];
    const colors = [];
    const segments = 32;
    const palette = [
      [1.00, 1.00, 1.00],
      [0.96, 0.97, 0.98],
      [0.84, 0.87, 0.90],
      [0.68, 0.72, 0.76],
      [0.30, 0.33, 0.36],
      [0.08, 0.09, 0.10],
      [0.91, 0.93, 0.95],
      [0.52, 0.56, 0.60],
    ];

    function point(radius, angle, z) {
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z,
      ];
    }

    function addTriangle(a, b, c, shadeIndex) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      const shade = palette[shadeIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(shade[0], shade[1], shade[2]);
      }
    }

    const center_front = [0, 0, 0.31];
    const culet = [0, 0, -0.72];

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const am = (a0 + a1) * 0.5;
      const t0 = i / segments;
      const t1 = (i + 1) / segments;
      const zm0 = i % 2 === 0 ? 0.245 : 0.225;
      const zm1 = (i + 1) % 2 === 0 ? 0.245 : 0.225;

      const table0 = point(0.38, a0, 0.30);
      const table1 = point(0.38, a1, 0.30);
      const middle0 = point(0.70, am, zm0);
      const middle1 = point(0.70, am, zm1);
      const girdle0 = point(1.00, a0, t0 * 0.012);
      const girdle1 = point(1.00, a1, t1 * 0.012);
      const lower0 = point(1.00, a0, -0.045 + t0 * 0.012);
      const lower1 = point(1.00, a1, -0.045 + t1 * 0.012);
      const pavilion0 = point(0.56, am, -0.34);
      const pavilion1 = point(0.56, am, -0.365);

      addTriangle(center_front, table0, table1, i * 3 + 1);
      addTriangle(table0, middle0, table1, i * 5 + 2);
      addTriangle(table1, middle0, middle1, i * 7 + 4);
      addTriangle(middle0, girdle0, girdle1, i * 3 + 5);
      addTriangle(middle0, girdle1, middle1, i * 5 + 1);
      addTriangle(girdle0, lower0, lower1, 4 + i % 3);
      addTriangle(girdle0, lower1, girdle1, 6 + i % 2);
      addTriangle(lower0, pavilion0, lower1, i * 3 + 3);
      addTriangle(lower1, pavilion0, pavilion1, i * 5 + 5);
      addTriangle(pavilion0, culet, pavilion1, i * 7 + 2);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function createFacetTableGeometry() {
    const positions = [];
    const colors = [];
    const segments = 24;
    const palette = [
      [1.00, 1.00, 1.00],
      [0.95, 0.96, 0.97],
      [0.82, 0.85, 0.88],
      [0.63, 0.67, 0.71],
      [0.38, 0.41, 0.44],
      [0.10, 0.11, 0.12],
      [0.90, 0.92, 0.94],
      [0.55, 0.58, 0.61],
    ];

    function point(radius, angle, z) {
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        z,
      ];
    }

    function addTriangle(a, b, c, shadeIndex) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      const shade = palette[shadeIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(shade[0], shade[1], shade[2]);
      }
    }

    const center = [0, 0, 0.315];

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const am = (a0 + a1) * 0.5;
      const inner0 = point(0.20, a0, 0.312);
      const inner1 = point(0.20, a1, 0.312);
      const middle0 = point(0.46, am, i % 2 === 0 ? 0.275 : 0.255);
      const middle1 = point(0.46, am, (i + 1) % 2 === 0 ? 0.275 : 0.255);
      const outer0 = point(0.72, a0, i % 2 === 0 ? 0.195 : 0.175);
      const outer1 = point(0.72, a1, (i + 1) % 2 === 0 ? 0.195 : 0.175);

      addTriangle(center, inner0, inner1, i * 3 + 2);
      addTriangle(inner0, middle0, inner1, i * 5 + 1);
      addTriangle(inner1, middle0, middle1, i * 7 + 4);
      addTriangle(middle0, outer0, outer1, i * 3 + 5);
      addTriangle(middle0, outer1, middle1, i * 5 + 6);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const diamondGeom = createDiamondGeometry();
  const diamond_facetGeom = createFacetTableGeometry();
  const prongGeom = new THREE.SphereGeometry(1, 16, 10);
  const dummy = new THREE.Object3D();

  function setProngMatrix(mesh, index, x, y, z, scale) {
    dummy.position.set(x, y, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }

  const ring_band_group = new THREE.Group();
  root.add(ring_band_group);

  const ring_bandGeom = new THREE.TorusGeometry(0.56, 0.095, 16, 64);
  const ring_band = new THREE.Mesh(ring_bandGeom, silverMat);
  ring_band.rotation.x = Math.PI / 2;
  ring_band.position.set(0, -0.14, -0.48);
  ring_band_group.add(ring_band);

  const left_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.40, -0.14, -0.76),
    new THREE.Vector3(-0.57, -0.13, -0.57),
    new THREE.Vector3(-0.69, -0.10, -0.28),
    new THREE.Vector3(-0.72, -0.06, 0.02),
  ]);
  const left_shoulderGeom = new THREE.TubeGeometry(
    left_shoulderPath, 24, 0.078, 10, false
  );
  const left_shoulder = new THREE.Mesh(left_shoulderGeom, silverMat);
  ring_band_group.add(left_shoulder);

  const right_shoulderPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.40, -0.14, -0.76),
    new THREE.Vector3(0.57, -0.13, -0.57),
    new THREE.Vector3(0.69, -0.10, -0.28),
    new THREE.Vector3(0.72, -0.06, 0.02),
  ]);
  const right_shoulderGeom = new THREE.TubeGeometry(
    right_shoulderPath, 24, 0.078, 10, false
  );
  const right_shoulder = new THREE.Mesh(right_shoulderGeom, silverMat);
  ring_band_group.add(right_shoulder);

  const left_gallery_railPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.48, -0.11, -0.22),
    new THREE.Vector3(-0.63, -0.09, -0.10),
    new THREE.Vector3(-0.72, -0.06, 0.04),
    new THREE.Vector3(-0.76, -0.03, 0.18),
  ]);
  const left_gallery_railGeom = new THREE.TubeGeometry(
    left_gallery_railPath, 18, 0.024, 8, false
  );
  const left_gallery_rail = new THREE.Mesh(left_gallery_railGeom, silverMat);
  ring_band_group.add(left_gallery_rail);

  const right_gallery_railPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.48, -0.11, -0.22),
    new THREE.Vector3(0.63, -0.09, -0.10),
    new THREE.Vector3(0.72, -0.06, 0.04),
    new THREE.Vector3(0.76, -0.03, 0.18),
  ]);
  const right_gallery_railGeom = new THREE.TubeGeometry(
    right_gallery_railPath, 18, 0.024, 8, false
  );
  const right_gallery_rail = new THREE.Mesh(right_gallery_railGeom, silverMat);
  ring_band_group.add(right_gallery_rail);

  const main_setting = new THREE.Group();
  main_setting.position.set(0, 0.30, 0.12);
  root.add(main_setting);

  const main_basketGeom = new THREE.TorusGeometry(0.46, 0.025, 10, 48);
  const main_basket = new THREE.Mesh(main_basketGeom, silverMat);
  main_basket.position.z = -0.16;
  main_setting.add(main_basket);

  const main_galleryGeom = new THREE.TorusGeometry(0.22, 0.022, 8, 32);
  const main_gallery = new THREE.Mesh(main_galleryGeom, silverMat);
  main_gallery.position.z = -0.34;
  main_setting.add(main_gallery);

  const main_diamond = new THREE.Mesh(diamondGeom, diamondMat);
  main_diamond.scale.setScalar(0.56);
  main_diamond.renderOrder = 1;
  main_setting.add(main_diamond);

  const main_diamond_facets = new THREE.Mesh(
    diamond_facetGeom,
    diamond_facetMat
  );
  main_diamond_facets.scale.setScalar(0.56);
  main_diamond_facets.renderOrder = 2;
  main_setting.add(main_diamond_facets);

  const main_prongs = new THREE.InstancedMesh(prongGeom, silverMat, 4);
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    setProngMatrix(
      main_prongs,
      i,
      Math.cos(angle) * 0.535,
      Math.sin(angle) * 0.535,
      0.075,
      0.068
    );
  }
  main_prongs.instanceMatrix.needsUpdate = true;
  main_setting.add(main_prongs);

  const side_setting_rimGeom = new THREE.TorusGeometry(
    0.205, 0.018, 8, 32
  );
  const side_galleryGeom = new THREE.TorusGeometry(0.105, 0.015, 8, 24);

  const left_side_setting = new THREE.Group();
  left_side_setting.position.set(-0.72, -0.03, 0.08);
  left_side_setting.rotation.y = -0.24;
  root.add(left_side_setting);

  const left_setting_rim = new THREE.Mesh(
    side_setting_rimGeom,
    silverMat
  );
  left_setting_rim.position.z = -0.075;
  left_side_setting.add(left_setting_rim);

  const left_gallery = new THREE.Mesh(side_galleryGeom, silverMat);
  left_gallery.position.z = -0.19;
  left_side_setting.add(left_gallery);

  const left_side_diamond = new THREE.Mesh(diamondGeom, diamondMat);
  left_side_diamond.scale.setScalar(0.24);
  left_side_diamond.renderOrder = 1;
  left_side_setting.add(left_side_diamond);

  const left_side_diamond_facets = new THREE.Mesh(
    diamond_facetGeom,
    diamond_facetMat
  );
  left_side_diamond_facets.scale.setScalar(0.24);
  left_side_diamond_facets.renderOrder = 2;
  left_side_setting.add(left_side_diamond_facets);

  const left_side_prongs = new THREE.InstancedMesh(
    prongGeom,
    silverMat,
    4
  );
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    setProngMatrix(
      left_side_prongs,
      i,
      Math.cos(angle) * 0.225,
      Math.sin(angle) * 0.225,
      0.035,
      0.043
    );
  }
  left_side_prongs.instanceMatrix.needsUpdate = true;
  left_side_setting.add(left_side_prongs);

  const right_side_setting = new THREE.Group();
  right_side_setting.position.set(0.72, -0.03, 0.08);
  right_side_setting.rotation.y = 0.24;
  root.add(right_side_setting);

  const right_setting_rim = new THREE.Mesh(
    side_setting_rimGeom,
    silverMat
  );
  right_setting_rim.position.z = -0.075;
  right_side_setting.add(right_setting_rim);

  const right_gallery = new THREE.Mesh(side_galleryGeom, silverMat);
  right_gallery.position.z = -0.19;
  right_side_setting.add(right_gallery);

  const right_side_diamond = new THREE.Mesh(diamondGeom, diamondMat);
  right_side_diamond.scale.setScalar(0.24);
  right_side_diamond.renderOrder = 1;
  right_side_setting.add(right_side_diamond);

  const right_side_diamond_facets = new THREE.Mesh(
    diamond_facetGeom,
    diamond_facetMat
  );
  right_side_diamond_facets.scale.setScalar(0.24);
  right_side_diamond_facets.renderOrder = 2;
  right_side_setting.add(right_side_diamond_facets);

  const right_side_prongs = new THREE.InstancedMesh(
    prongGeom,
    silverMat,
    4
  );
  for (let i = 0; i < 4; i++) {
    const angle = Math.PI / 4 + i * Math.PI / 2;
    setProngMatrix(
      right_side_prongs,
      i,
      Math.cos(angle) * 0.225,
      Math.sin(angle) * 0.225,
      0.035,
      0.043
    );
  }
  right_side_prongs.instanceMatrix.needsUpdate = true;
  right_side_setting.add(right_side_prongs);

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