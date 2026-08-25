export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "star_pendant_necklace";

  const polished_metalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xf7fbff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
  });
  const gemstone_backingMat = new THREE.MeshStandardMaterial({
    color: 0xf4f7fa,
    metalness: 0.0,
    roughness: 0.2,
  });
  const gemstone_facetMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.18,
    vertexColors: true,
    side: THREE.DoubleSide,
  });

  function createStarShape(outerRadius, innerRadius, pointCount) {
    const shape = new THREE.Shape();
    for (let i = 0; i < pointCount * 2; i++) {
      const angle = Math.PI / 2 + i * Math.PI / pointCount;
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }

  function createGemstoneGeometry(radius, depth, segments) {
    const positions = [];
    const tableRadius = radius * 0.42;
    const frontZ = depth * 0.52;
    const girdleZ = 0;
    const backZ = -depth * 0.65;

    function point(r, angle, z) {
      return [Math.cos(angle) * r, Math.sin(angle) * r, z];
    }

    function triangle(a, b, c) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
    }

    const frontCenter = [0, 0, frontZ];
    const backCenter = [0, 0, backZ];

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const table0 = point(tableRadius, a0, frontZ);
      const table1 = point(tableRadius, a1, frontZ);
      const girdle0 = point(radius, a0, girdleZ);
      const girdle1 = point(radius, a1, girdleZ);

      triangle(frontCenter, table0, table1);
      triangle(table0, girdle0, girdle1);
      triangle(table0, girdle1, table1);
      triangle(girdle0, backCenter, girdle1);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.computeVertexNormals();
    return geometry;
  }

  function createFacetGeometry(radius, depth, segments) {
    const positions = [];
    const colors = [];
    const tableRadius = radius * 0.42;
    const frontZ = depth * 0.53;
    const girdleZ = 0.004;
    const palette = [
      [1.00, 1.00, 1.00],
      [0.72, 0.80, 0.88],
      [0.92, 0.96, 1.00],
      [0.54, 0.63, 0.72],
      [0.82, 0.87, 0.93],
      [0.62, 0.72, 0.82],
    ];

    function point(r, angle, z) {
      return [Math.cos(angle) * r, Math.sin(angle) * r, z];
    }

    function triangle(a, b, c, color) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
      for (let i = 0; i < 3; i++) colors.push(color[0], color[1], color[2]);
    }

    const center = [0, 0, frontZ];

    for (let i = 0; i < segments; i++) {
      const a0 = i / segments * Math.PI * 2;
      const a1 = (i + 1) / segments * Math.PI * 2;
      const table0 = point(tableRadius, a0, frontZ);
      const table1 = point(tableRadius, a1, frontZ);
      const girdle0 = point(radius, a0, girdleZ);
      const girdle1 = point(radius, a1, girdleZ);

      triangle(center, table0, table1, palette[i % palette.length]);
      triangle(table0, girdle0, girdle1, palette[(i + 2) % palette.length]);
      triangle(table0, girdle1, table1, palette[(i + 4) % palette.length]);
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
    return geometry;
  }

  const starCenterY = -0.43;
  const starOuterRadius = 0.78;
  const starInnerRadius = 0.36;

  const pendant_group = new THREE.Group();
  pendant_group.name = "pendant_group";
  pendant_group.position.y = starCenterY;
  root.add(pendant_group);

  const star_shape = createStarShape(starOuterRadius, starInnerRadius, 6);

  const star_backingGeom = new THREE.ExtrudeGeometry(star_shape, {
    depth: 0.065,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.018,
    bevelSegments: 3,
  });
  const star_backing = new THREE.Mesh(star_backingGeom, polished_metalMat);
  star_backing.name = "star_backing";
  star_backing.position.z = -0.055;
  pendant_group.add(star_backing);

  const star_inlayGeom = new THREE.ExtrudeGeometry(star_shape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.008,
    bevelSegments: 2,
  });
  const star_inlay = new THREE.Mesh(star_inlayGeom, silverMat);
  star_inlay.name = "star_inlay";
  star_inlay.scale.set(0.925, 0.925, 1);
  star_inlay.position.z = 0.024;
  pendant_group.add(star_inlay);

  const star_rim_points = [];
  for (let i = 0; i < 12; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 6;
    const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
    star_rim_points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0.061
      )
    );
  }
  const star_rim_curve = new THREE.CatmullRomCurve3(
    star_rim_points,
    true,
    "centripetal"
  );
  const star_rimGeom = new THREE.TubeGeometry(
    star_rim_curve,
    144,
    0.014,
    8,
    true
  );
  const star_rim = new THREE.Mesh(star_rimGeom, polished_metalMat);
  star_rim.name = "star_rim";
  pendant_group.add(star_rim);

  const central_settingGeom = new THREE.CylinderGeometry(
    0.292,
    0.292,
    0.025,
    32
  );
  const central_setting = new THREE.Mesh(central_settingGeom, silverMat);
  central_setting.name = "central_setting";
  central_setting.rotation.x = Math.PI / 2;
  central_setting.position.set(0, 0, 0.058);
  pendant_group.add(central_setting);

  const central_gemstoneGeom = createGemstoneGeometry(0.26, 0.12, 20);
  const central_gemstone = new THREE.Mesh(
    central_gemstoneGeom,
    gemstoneMat
  );
  central_gemstone.name = "central_gemstone";
  central_gemstone.position.set(0, 0, 0.085);
  pendant_group.add(central_gemstone);

  const central_facetsGeom = createFacetGeometry(0.26, 0.12, 20);
  const central_facets = new THREE.Mesh(
    central_facetsGeom,
    gemstone_facetMat
  );
  central_facets.name = "central_facets";
  central_facets.position.set(0, 0, 0.087);
  pendant_group.add(central_facets);

  const central_prongsGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const central_prongs = new THREE.InstancedMesh(
    central_prongsGeom,
    polished_metalMat,
    6
  );
  central_prongs.name = "central_prongs";
  const central_prong_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 3;
    central_prong_dummy.position.set(
      Math.cos(angle) * 0.267,
      Math.sin(angle) * 0.267,
      0.128
    );
    central_prong_dummy.rotation.set(0, 0, 0);
    central_prong_dummy.scale.set(1, 1, 1);
    central_prong_dummy.updateMatrix();
    central_prongs.setMatrixAt(i, central_prong_dummy.matrix);
  }
  central_prongs.instanceMatrix.needsUpdate = true;
  pendant_group.add(central_prongs);

  const halo_gemstone_settingsGeom = new THREE.CylinderGeometry(
    0.128,
    0.128,
    0.02,
    20
  );
  const halo_gemstone_settings = new THREE.InstancedMesh(
    halo_gemstone_settingsGeom,
    silverMat,
    6
  );
  halo_gemstone_settings.name = "halo_gemstone_settings";

  const halo_gemstonesGeom = createGemstoneGeometry(0.11, 0.075, 16);
  const halo_gemstones = new THREE.InstancedMesh(
    halo_gemstonesGeom,
    gemstoneMat,
    6
  );
  halo_gemstones.name = "halo_gemstones";

  const halo_facetsGeom = createFacetGeometry(0.11, 0.075, 16);
  const halo_facets = new THREE.InstancedMesh(
    halo_facetsGeom,
    gemstone_facetMat,
    6
  );
  halo_facets.name = "halo_facets";

  const halo_prongsGeom = new THREE.SphereGeometry(0.014, 10, 7);
  const halo_prongs = new THREE.InstancedMesh(
    halo_prongsGeom,
    polished_metalMat,
    18
  );
  halo_prongs.name = "halo_prongs";

  const halo_dummy = new THREE.Object3D();
  let halo_prong_index = 0;
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 6 + i * Math.PI / 3;
    const x = Math.cos(angle) * 0.39;
    const y = Math.sin(angle) * 0.39;

    halo_dummy.position.set(x, y, 0.058);
    halo_dummy.rotation.set(Math.PI / 2, 0, 0);
    halo_dummy.scale.set(1, 1, 1);
    halo_dummy.updateMatrix();
    halo_gemstone_settings.setMatrixAt(i, halo_dummy.matrix);

    halo_dummy.position.set(x, y, 0.085);
    halo_dummy.rotation.set(0, 0, 0);
    halo_dummy.updateMatrix();
    halo_gemstones.setMatrixAt(i, halo_dummy.matrix);

    halo_dummy.position.set(x, y, 0.087);
    halo_dummy.updateMatrix();
    halo_facets.setMatrixAt(i, halo_dummy.matrix);

    for (let j = 0; j < 3; j++) {
      const prongAngle = angle + j * Math.PI * 2 / 3;
      halo_dummy.position.set(
        x + Math.cos(prongAngle) * 0.112,
        y + Math.sin(prongAngle) * 0.112,
        0.115
      );
      halo_dummy.rotation.set(0, 0, 0);
      halo_dummy.updateMatrix();
      halo_prongs.setMatrixAt(halo_prong_index++, halo_dummy.matrix);
    }
  }
  halo_gemstone_settings.instanceMatrix.needsUpdate = true;
  halo_gemstones.instanceMatrix.needsUpdate = true;
  halo_facets.instanceMatrix.needsUpdate = true;
  halo_prongs.instanceMatrix.needsUpdate = true;
  pendant_group.add(
    halo_gemstone_settings,
    halo_gemstones,
    halo_facets,
    halo_prongs
  );

  const tip_gemstone_settingsGeom = new THREE.CylinderGeometry(
    0.074,
    0.074,
    0.018,
    18
  );
  const tip_gemstone_settings = new THREE.InstancedMesh(
    tip_gemstone_settingsGeom,
    silverMat,
    6
  );
  tip_gemstone_settings.name = "tip_gemstone_settings";

  const tip_gemstonesGeom = createGemstoneGeometry(0.058, 0.055, 14);
  const tip_gemstones = new THREE.InstancedMesh(
    tip_gemstonesGeom,
    gemstoneMat,
    6
  );
  tip_gemstones.name = "tip_gemstones";

  const tip_facetsGeom = createFacetGeometry(0.058, 0.055, 14);
  const tip_facets = new THREE.InstancedMesh(
    tip_facetsGeom,
    gemstone_facetMat,
    6
  );
  tip_facets.name = "tip_facets";

  const tip_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + i * Math.PI / 3;
    const x = Math.cos(angle) * 0.65;
    const y = Math.sin(angle) * 0.65;

    tip_dummy.position.set(x, y, 0.057);
    tip_dummy.rotation.set(Math.PI / 2, 0, 0);
    tip_dummy.scale.set(1, 1, 1);
    tip_dummy.updateMatrix();
    tip_gemstone_settings.setMatrixAt(i, tip_dummy.matrix);

    tip_dummy.position.set(x, y, 0.08);
    tip_dummy.rotation.set(0, 0, 0);
    tip_dummy.updateMatrix();
    tip_gemstones.setMatrixAt(i, tip_dummy.matrix);

    tip_dummy.position.set(x, y, 0.082);
    tip_dummy.updateMatrix();
    tip_facets.setMatrixAt(i, tip_dummy.matrix);
  }
  tip_gemstone_settings.instanceMatrix.needsUpdate = true;
  tip_gemstones.instanceMatrix.needsUpdate = true;
  tip_facets.instanceMatrix.needsUpdate = true;
  pendant_group.add(
    tip_gemstone_settings,
    tip_gemstones,
    tip_facets
  );

  const pavilion_count = 54;
  const pavilion_stonesGeom = new THREE.OctahedronGeometry(0.016, 0);
  const pavilion_stones = new THREE.InstancedMesh(
    pavilion_stonesGeom,
    gemstone_backingMat,
    pavilion_count
  );
  pavilion_stones.name = "pavilion_stones";
  const pavilion_dummy = new THREE.Object3D();
  let pavilion_index = 0;

  for (let arm = 0; arm < 6; arm++) {
    const angle = Math.PI / 2 + arm * Math.PI / 3;
    const radialX = Math.cos(angle);
    const radialY = Math.sin(angle);
    const tangentX = -radialY;
    const tangentY = radialX;

    for (let row = 0; row < 9; row++) {
      const radius = 0.445 + row * 0.039;
      for (let sideIndex = 0; sideIndex < 3; sideIndex++) {
        const side = sideIndex - 1;
        const offset = side * 0.025;
        const size = 0.86 + ((arm + row + sideIndex) % 3) * 0.08;
        pavilion_dummy.position.set(
          radialX * radius + tangentX * offset,
          radialY * radius + tangentY * offset,
          0.063
        );
        pavilion_dummy.rotation.set(
          0,
          0,
          angle + row * 0.19 + side * 0.35
        );
        pavilion_dummy.scale.set(size, size, size * 0.55);
        pavilion_dummy.updateMatrix();
        pavilion_stones.setMatrixAt(
          pavilion_index++,
          pavilion_dummy.matrix
        );
      }
    }
  }
  pavilion_stones.instanceMatrix.needsUpdate = true;
  pendant_group.add(pavilion_stones);

  const bail_shape = new THREE.Shape();
  bail_shape.moveTo(-0.055, -0.21);
  bail_shape.bezierCurveTo(-0.075, -0.12, -0.135, 0.08, -0.14, 0.16);
  bail_shape.bezierCurveTo(-0.145, 0.23, -0.08, 0.255, 0, 0.255);
  bail_shape.bezierCurveTo(0.08, 0.255, 0.145, 0.23, 0.14, 0.16);
  bail_shape.bezierCurveTo(0.135, 0.08, 0.075, -0.12, 0.055, -0.21);
  bail_shape.closePath();

  const bail_hole = new THREE.Path();
  bail_hole.moveTo(-0.03, -0.105);
  bail_hole.bezierCurveTo(-0.015, -0.13, 0.015, -0.13, 0.03, -0.105);
  bail_hole.bezierCurveTo(0.05, -0.01, 0.085, 0.105, 0.075, 0.155);
  bail_hole.bezierCurveTo(0.068, 0.19, 0.03, 0.202, 0, 0.202);
  bail_hole.bezierCurveTo(-0.03, 0.202, -0.068, 0.19, -0.075, 0.155);
  bail_hole.bezierCurveTo(-0.085, 0.105, -0.05, -0.01, -0.03, -0.105);
  bail_hole.closePath();
  bail_shape.holes.push(bail_hole);

  const bailGeom = new THREE.ExtrudeGeometry(bail_shape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.01,
    bevelSegments: 3,
  });
  const bail = new THREE.Mesh(bailGeom, polished_metalMat);
  bail.name = "bail";
  bail.position.set(0, 0.91, 0.005);
  root.add(bail);

  const bail_highlightGeom = new THREE.SphereGeometry(0.04, 16, 10);
  const bail_highlight = new THREE.Mesh(
    bail_highlightGeom,
    gemstone_backingMat
  );
  bail_highlight.name = "bail_highlight";
  bail_highlight.scale.set(0.65, 2.8, 0.28);
  bail_highlight.position.set(-0.073, 1.055, 0.076);
  root.add(bail_highlight);

  const chain_linksGeom = new THREE.TorusGeometry(
    0.055,
    0.011,
    8,
    24
  );
  const chain_linksMat = polished_metalMat;
  const linksPerSide = 14;
  const chain_links = new THREE.InstancedMesh(
    chain_linksGeom,
    chain_linksMat,
    linksPerSide * 2
  );
  chain_links.name = "chain_links";

  const chain_dummy = new THREE.Object3D();
  const chain_z_axis = new THREE.Vector3(0, 0, 1);
  const chain_y_axis = new THREE.Vector3(0, 1, 0);
  const chain_align_quaternion = new THREE.Quaternion();
  const chain_twist_quaternion = new THREE.Quaternion();
  let chain_index = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < linksPerSide; i++) {
      const t = i / (linksPerSide - 1);
      const curve = Math.sin(Math.PI * t);
      const x = side * (0.105 + 1.05 * t + 0.03 * curve);
      const y = 0.91 + 1.47 * t + 0.03 * curve;
      const dx = side * (
        1.05 + 0.03 * Math.PI * Math.cos(Math.PI * t)
      );
      const dy = 1.47 + 0.03 * Math.PI * Math.cos(Math.PI * t);
      const rotationZ = Math.atan2(-dx, dy);
      const twist = i % 2 === 0 ? 0.22 : 1.02;

      chain_align_quaternion.setFromAxisAngle(
        chain_z_axis,
        rotationZ
      );
      chain_twist_quaternion.setFromAxisAngle(
        chain_y_axis,
        side * twist
      );

      chain_dummy.position.set(x, y, -0.004);
      chain_dummy.quaternion
        .copy(chain_align_quaternion)
        .multiply(chain_twist_quaternion);
      chain_dummy.scale.set(0.72, 1.18, 1);
      chain_dummy.updateMatrix();
      chain_links.setMatrixAt(chain_index++, chain_dummy.matrix);
    }
  }
  chain_links.instanceMatrix.needsUpdate = true;
  root.add(chain_links);

  fitToUnitCube(THREE, root);
  return root;

  function fitToUnitCube(THREE, object) {
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
}