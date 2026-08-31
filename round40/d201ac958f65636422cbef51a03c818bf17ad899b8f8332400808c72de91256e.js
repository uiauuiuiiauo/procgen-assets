export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornate_jeweled_tiara";

  const band_group = new THREE.Group();
  band_group.name = "band_group";
  root.add(band_group);

  const crown_group = new THREE.Group();
  crown_group.name = "crown_group";
  root.add(crown_group);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xc99b52,
    metalness: 0.6,
    roughness: 0.2,
  });
  const green_enamelMat = new THREE.MeshStandardMaterial({
    color: 0x16845d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const pink_enamelMat = new THREE.MeshStandardMaterial({
    color: 0xb63c79,
    metalness: 0.0,
    roughness: 0.3,
  });
  const turquoise_enamelMat = new THREE.MeshStandardMaterial({
    color: 0x1597a5,
    metalness: 0.0,
    roughness: 0.3,
  });
  const violet_enamelMat = new THREE.MeshStandardMaterial({
    color: 0x743d91,
    metalness: 0.0,
    roughness: 0.3,
  });
  const amber_enamelMat = new THREE.MeshStandardMaterial({
    color: 0xd48a2d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const crystal_backingMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const crystal_facetMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,
    side: THREE.DoubleSide,
  });

  function createCurvedBandGeometry(innerRadius, outerRadius, y0, y1, segments) {
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      positions.push(
        sin * innerRadius, y0, cos * innerRadius,
        sin * innerRadius, y1, cos * innerRadius,
        sin * outerRadius, y0, cos * outerRadius,
        sin * outerRadius, y1, cos * outerRadius
      );
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 4;
      const b = (i + 1) * 4;

      indices.push(
        a + 2, b + 2, b + 3,
        a + 2, b + 3, a + 3,

        a, b + 1, b,
        a, a + 1, b + 1,

        a, b, b + 2,
        a, b + 2, a + 2,

        a + 1, a + 3, b + 3,
        a + 1, b + 3, b + 1
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

  function createFacetedGemGeometry(radius, depth, segments) {
    const positions = [];
    const colors = [];
    const palette = [
      [1.00, 1.00, 1.00],
      [0.82, 0.87, 0.92],
      [0.55, 0.62, 0.70],
      [0.93, 0.97, 1.00],
      [0.34, 0.42, 0.50],
      [0.72, 0.77, 0.84],
    ];

    function ring(r, z, offset) {
      const points = [];
      for (let i = 0; i < segments; i++) {
        const angle = i / segments * Math.PI * 2 + offset;
        points.push(new THREE.Vector3(
          Math.cos(angle) * r,
          Math.sin(angle) * r,
          z
        ));
      }
      return points;
    }

    function addTriangle(a, b, c, colorIndex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = palette[colorIndex % palette.length];
      for (let i = 0; i < 3; i++) {
        colors.push(color[0], color[1], color[2]);
      }
    }

    const center = new THREE.Vector3(0, 0, depth * 0.50);
    const table = ring(radius * 0.32, depth * 0.48, 0);
    const star = ring(
      radius * 0.68,
      depth * 0.31,
      Math.PI / segments
    );
    const girdle_front = ring(radius, depth * 0.03, 0);
    const girdle_back = ring(radius, -depth * 0.03, 0);
    const pavilion = ring(
      radius * 0.48,
      -depth * 0.28,
      Math.PI / segments
    );
    const culet = new THREE.Vector3(0, 0, -depth * 0.50);

    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;

      addTriangle(center, table[i], table[next], i);
      addTriangle(table[i], star[i], star[next], i + 2);
      addTriangle(table[i], star[next], table[next], i + 4);
      addTriangle(star[i], girdle_front[i], girdle_front[next], i + 1);
      addTriangle(star[i], girdle_front[next], star[next], i + 3);
      addTriangle(girdle_front[i], girdle_back[i], girdle_back[next], i + 2);
      addTriangle(girdle_front[i], girdle_back[next], girdle_front[next], i + 5);
      addTriangle(girdle_back[i], pavilion[i], pavilion[next], i + 1);
      addTriangle(girdle_back[i], pavilion[next], girdle_back[next], i + 4);
      addTriangle(pavilion[i], culet, pavilion[next], i + 3);
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

  const temp_matrix = new THREE.Matrix4();
  const temp_position = new THREE.Vector3();
  const temp_quaternion = new THREE.Quaternion();
  const temp_scale = new THREE.Vector3();
  const temp_euler = new THREE.Euler();

  function setInstance(mesh, index, x, y, z, rx, ry, rz, sx, sy, sz) {
    temp_position.set(x, y, z);
    temp_euler.set(rx, ry, rz);
    temp_quaternion.setFromEuler(temp_euler);
    temp_scale.set(sx, sy, sz);
    temp_matrix.compose(temp_position, temp_quaternion, temp_scale);
    mesh.setMatrixAt(index, temp_matrix);
  }

  const band_inner_radius = 1.48;
  const band_outer_radius = 1.58;

  const lower_bandGeom = createCurvedBandGeometry(
    band_inner_radius,
    band_outer_radius,
    0.02,
    0.30,
    72
  );
  const lower_band = new THREE.Mesh(lower_bandGeom, goldMat);
  lower_band.name = "lower_band";
  band_group.add(lower_band);

  const upper_crown_bandGeom = createCurvedBandGeometry(
    band_inner_radius,
    band_outer_radius,
    0.30,
    0.52,
    72
  );
  const upper_crown_band = new THREE.Mesh(
    upper_crown_bandGeom,
    goldMat
  );
  upper_crown_band.name = "upper_crown_band";
  band_group.add(upper_crown_band);

  const bottom_rimGeom = new THREE.TorusGeometry(1.53, 0.045, 10, 72);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, goldMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.02;
  band_group.add(bottom_rim);

  const middle_rimGeom = new THREE.TorusGeometry(1.575, 0.025, 8, 72);
  const middle_rim = new THREE.Mesh(middle_rimGeom, goldMat);
  middle_rim.name = "middle_rim";
  middle_rim.rotation.x = Math.PI / 2;
  middle_rim.position.y = 0.30;
  band_group.add(middle_rim);

  const upper_rimGeom = new THREE.TorusGeometry(1.575, 0.035, 10, 72);
  const upper_rim = new THREE.Mesh(upper_rimGeom, goldMat);
  upper_rim.name = "upper_rim";
  upper_rim.rotation.x = Math.PI / 2;
  upper_rim.position.y = 0.52;
  band_group.add(upper_rim);

  const enamel_patchGeom = new THREE.BoxGeometry(0.34, 0.17, 0.028);
  const enamel_patch_count = 18;

  function fillEnamelPatches(mesh, offset) {
    for (let i = 0; i < enamel_patch_count; i++) {
      const angle = (i * 2 + offset) / 36 * Math.PI * 2;
      const radius = 1.592;
      const y = 0.10 + ((i + offset) % 2) * 0.18;
      setInstance(
        mesh,
        i,
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius,
        0,
        angle,
        0,
        1,
        1,
        1
      );
    }
    mesh.instanceMatrix.needsUpdate = true;
  }

  const green_enamel_patches = new THREE.InstancedMesh(
    enamel_patchGeom,
    green_enamelMat,
    enamel_patch_count
  );
  green_enamel_patches.name = "green_enamel_patches";
  fillEnamelPatches(green_enamel_patches, 0);
  band_group.add(green_enamel_patches);

  const pink_enamel_patches = new THREE.InstancedMesh(
    enamel_patchGeom,
    pink_enamelMat,
    enamel_patch_count
  );
  pink_enamel_patches.name = "pink_enamel_patches";
  fillEnamelPatches(pink_enamel_patches, 1);
  band_group.add(pink_enamel_patches);

  const turquoise_enamel_patches = new THREE.InstancedMesh(
    enamel_patchGeom,
    turquoise_enamelMat,
    enamel_patch_count
  );
  turquoise_enamel_patches.name = "turquoise_enamel_patches";
  fillEnamelPatches(turquoise_enamel_patches, 2);
  band_group.add(turquoise_enamel_patches);

  const band_gem_count = 20;
  const band_gem_radius = 0.13;
  const band_gem_depth = 0.09;
  const band_gem_backingGeom = new THREE.CircleGeometry(
    band_gem_radius * 0.94,
    16
  );
  const band_gem_backings = new THREE.InstancedMesh(
    band_gem_backingGeom,
    crystal_backingMat,
    band_gem_count
  );
  band_gem_backings.name = "band_gem_backings";

  const band_gemGeom = createFacetedGemGeometry(
    band_gem_radius,
    band_gem_depth,
    12
  );
  const band_gems = new THREE.InstancedMesh(
    band_gemGeom,
    crystal_facetMat,
    band_gem_count
  );
  band_gems.name = "band_gems";

  const band_gem_bezelGeom = new THREE.TorusGeometry(
    band_gem_radius,
    0.016,
    6,
    18
  );
  const band_gem_bezels = new THREE.InstancedMesh(
    band_gem_bezelGeom,
    goldMat,
    band_gem_count
  );
  band_gem_bezels.name = "band_gem_bezels";

  const band_prongGeom = new THREE.SphereGeometry(0.024, 10, 6);
  const band_prongs = new THREE.InstancedMesh(
    band_prongGeom,
    goldMat,
    band_gem_count * 4
  );
  band_prongs.name = "band_prongs";

  for (let i = 0; i < band_gem_count; i++) {
    const angle = i / band_gem_count * Math.PI * 2;
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const gem_radius = 1.615;
    const prong_radius = 1.642;

    setInstance(
      band_gem_backings,
      i,
      sin * 1.605,
      0.30,
      cos * 1.605,
      0,
      angle,
      0,
      1,
      1,
      1
    );
    setInstance(
      band_gems,
      i,
      sin * gem_radius,
      0.30,
      cos * gem_radius,
      0,
      angle,
      0,
      1,
      1,
      1
    );
    setInstance(
      band_gem_bezels,
      i,
      sin * 1.612,
      0.30,
      cos * 1.612,
      0,
      angle,
      0,
      1,
      1,
      1
    );

    for (let p = 0; p < 4; p++) {
      const prong_angle = p / 4 * Math.PI * 2;
      const px = sin * prong_radius + Math.cos(angle) * 0.112;
      const pz = cos * prong_radius - Math.sin(angle) * 0.112;
      const py = 0.30 + Math.sin(prong_angle) * 0.112;
      setInstance(
        band_prongs,
        i * 4 + p,
        px,
        py,
        pz,
        0,
        0,
        0,
        1,
        1,
        1
      );
    }
  }

  band_gem_backings.instanceMatrix.needsUpdate = true;
  band_gems.instanceMatrix.needsUpdate = true;
  band_gem_bezels.instanceMatrix.needsUpdate = true;
  band_prongs.instanceMatrix.needsUpdate = true;
  band_group.add(
    band_gem_backings,
    band_gem_bezels,
    band_gems,
    band_prongs
  );

  const central_supportShape = new THREE.Shape();
  central_supportShape.moveTo(-0.58, 0.48);
  central_supportShape.bezierCurveTo(-0.52, 0.80, -0.46, 1.18, -0.36, 1.55);
  central_supportShape.bezierCurveTo(-0.31, 1.82, -0.24, 2.08, -0.17, 2.28);
  central_supportShape.lineTo(0.17, 2.28);
  central_supportShape.bezierCurveTo(0.24, 2.08, 0.31, 1.82, 0.36, 1.55);
  central_supportShape.bezierCurveTo(0.46, 1.18, 0.52, 0.80, 0.58, 0.48);
  central_supportShape.closePath();

  const central_supportGeom = new THREE.ExtrudeGeometry(
    central_supportShape,
    {
      depth: 0.08,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.018,
      bevelSegments: 2,
    }
  );
  const central_support = new THREE.Mesh(
    central_supportGeom,
    goldMat
  );
  central_support.name = "central_support";
  central_support.position.z = 1.49;
  crown_group.add(central_support);

  const central_support_inlay = new THREE.Mesh(
    central_supportGeom,
    green_enamelMat
  );
  central_support_inlay.name = "central_support_inlay";
  central_support_inlay.position.set(0, 0.04, 1.585);
  central_support_inlay.scale.set(0.78, 0.92, 0.22);
  crown_group.add(central_support_inlay);

  function makeTube(points, radius, material, closed) {
    const curve = new THREE.CatmullRomCurve3(
      points,
      closed,
      "centripetal"
    );
    return new THREE.Mesh(
      new THREE.TubeGeometry(
        curve,
        Math.max(16, points.length * 6),
        radius,
        8,
        closed
      ),
      material
    );
  }

  const left_outer_enamel_arm = makeTube([
    new THREE.Vector3(-1.34, 0.52, 0.72),
    new THREE.Vector3(-1.46, 0.86, 0.72),
    new THREE.Vector3(-1.34, 1.27, 0.72),
    new THREE.Vector3(-1.03, 1.52, 0.72),
    new THREE.Vector3(-0.67, 1.62, 0.72),
  ], 0.075, green_enamelMat, false);
  left_outer_enamel_arm.name = "left_outer_enamel_arm";
  crown_group.add(left_outer_enamel_arm);

  const right_outer_enamel_arm = makeTube([
    new THREE.Vector3(1.34, 0.52, 0.72),
    new THREE.Vector3(1.46, 0.86, 0.72),
    new THREE.Vector3(1.34, 1.27, 0.72),
    new THREE.Vector3(1.03, 1.52, 0.72),
    new THREE.Vector3(0.67, 1.62, 0.72),
  ], 0.075, green_enamelMat, false);
  right_outer_enamel_arm.name = "right_outer_enamel_arm";
  crown_group.add(right_outer_enamel_arm);

  const left_outer_gold_arm = makeTube([
    new THREE.Vector3(-1.34, 0.52, 0.78),
    new THREE.Vector3(-1.46, 0.86, 0.78),
    new THREE.Vector3(-1.34, 1.27, 0.78),
    new THREE.Vector3(-1.03, 1.52, 0.78),
    new THREE.Vector3(-0.67, 1.62, 0.78),
  ], 0.026, goldMat, false);
  left_outer_gold_arm.name = "left_outer_gold_arm";
  crown_group.add(left_outer_gold_arm);

  const right_outer_gold_arm = makeTube([
    new THREE.Vector3(1.34, 0.52, 0.78),
    new THREE.Vector3(1.46, 0.86, 0.78),
    new THREE.Vector3(1.34, 1.27, 0.78),
    new THREE.Vector3(1.03, 1.52, 0.78),
    new THREE.Vector3(0.67, 1.62, 0.78),
  ], 0.026, goldMat, false);
  right_outer_gold_arm.name = "right_outer_gold_arm";
  crown_group.add(right_outer_gold_arm);

  const left_lower_enamel_scroll = makeTube([
    new THREE.Vector3(-0.62, 0.54, 1.61),
    new THREE.Vector3(-0.84, 0.43, 1.61),
    new THREE.Vector3(-1.12, 0.45, 1.61),
    new THREE.Vector3(-1.34, 0.61, 1.61),
    new THREE.Vector3(-1.38, 0.82, 1.61),
    new THREE.Vector3(-1.24, 0.98, 1.61),
    new THREE.Vector3(-1.05, 0.98, 1.61),
    new THREE.Vector3(-0.96, 0.84, 1.61),
    new THREE.Vector3(-1.03, 0.70, 1.61),
    new THREE.Vector3(-1.18, 0.69, 1.61),
  ], 0.058, green_enamelMat, false);
  left_lower_enamel_scroll.name = "left_lower_enamel_scroll";
  crown_group.add(left_lower_enamel_scroll);

  const right_lower_enamel_scroll = makeTube([
    new THREE.Vector3(0.62, 0.54, 1.61),
    new THREE.Vector3(0.84, 0.43, 1.61),
    new THREE.Vector3(1.12, 0.45, 1.61),
    new THREE.Vector3(1.34, 0.61, 1.61),
    new THREE.Vector3(1.38, 0.82, 1.61),
    new THREE.Vector3(1.24, 0.98, 1.61),
    new THREE.Vector3(1.05, 0.98, 1.61),
    new THREE.Vector3(0.96, 0.84, 1.61),
    new THREE.Vector3(1.03, 0.70, 1.61),
    new THREE.Vector3(1.18, 0.69, 1.61),
  ], 0.058, green_enamelMat, false);
  right_lower_enamel_scroll.name = "right_lower_enamel_scroll";
  crown_group.add(right_lower_enamel_scroll);

  const left_lower_gold_scroll = makeTube([
    new THREE.Vector3(-0.62, 0.54, 1.665),
    new THREE.Vector3(-0.84, 0.43, 1.665),
    new THREE.Vector3(-1.12, 0.45, 1.665),
    new THREE.Vector3(-1.34, 0.61, 1.665),
    new THREE.Vector3(-1.38, 0.82, 1.665),
    new THREE.Vector3(-1.24, 0.98, 1.665),
    new THREE.Vector3(-1.05, 0.98, 1.665),
    new THREE.Vector3(-0.96, 0.84, 1.665),
    new THREE.Vector3(-1.03, 0.70, 1.665),
    new THREE.Vector3(-1.18, 0.69, 1.665),
  ], 0.022, goldMat, false);
  left_lower_gold_scroll.name = "left_lower_gold_scroll";
  crown_group.add(left_lower_gold_scroll);

  const right_lower_gold_scroll = makeTube([
    new THREE.Vector3(0.62, 0.54, 1.665),
    new THREE.Vector3(0.84, 0.43, 1.665),
    new THREE.Vector3(1.12, 0.45, 1.665),
    new THREE.Vector3(1.34, 0.61, 1.665),
    new THREE.Vector3(1.38, 0.82, 1.665),
    new THREE.Vector3(1.24, 0.98, 1.665),
    new THREE.Vector3(1.05, 0.98, 1.665),
    new THREE.Vector3(0.96, 0.84, 1.665),
    new THREE.Vector3(1.03, 0.70, 1.665),
    new THREE.Vector3(1.18, 0.69, 1.665),
  ], 0.022, goldMat, false);
  right_lower_gold_scroll.name = "right_lower_gold_scroll";
  crown_group.add(right_lower_gold_scroll);

  const left_upper_enamel_arch = makeTube([
    new THREE.Vector3(-0.42, 1.15, 1.61),
    new THREE.Vector3(-0.58, 1.42, 1.61),
    new THREE.Vector3(-0.52, 1.72, 1.61),
    new THREE.Vector3(-0.30, 1.98, 1.61),
    new THREE.Vector3(0, 2.08, 1.61),
  ], 0.065, green_enamelMat, false);
  left_upper_enamel_arch.name = "left_upper_enamel_arch";
  crown_group.add(left_upper_enamel_arch);

  const right_upper_enamel_arch = makeTube([
    new THREE.Vector3(0.42, 1.15, 1.61),
    new THREE.Vector3(0.58, 1.42, 1.61),
    new THREE.Vector3(0.52, 1.72, 1.61),
    new THREE.Vector3(0.30, 1.98, 1.61),
    new THREE.Vector3(0, 2.08, 1.61),
  ], 0.065, green_enamelMat, false);
  right_upper_enamel_arch.name = "right_upper_enamel_arch";
  crown_group.add(right_upper_enamel_arch);

  const left_upper_gold_arch = makeTube([
    new THREE.Vector3(-0.42, 1.15, 1.665),
    new THREE.Vector3(-0.58, 1.42, 1.665),
    new THREE.Vector3(-0.52, 1.72, 1.665),
    new THREE.Vector3(-0.30, 1.98, 1.665),
    new THREE.Vector3(0, 2.08, 1.665),
  ], 0.023, goldMat, false);
  left_upper_gold_arch.name = "left_upper_gold_arch";
  crown_group.add(left_upper_gold_arch);

  const right_upper_gold_arch = makeTube([
    new THREE.Vector3(0.42, 1.15, 1.665),
    new THREE.Vector3(0.58, 1.42, 1.665),
    new THREE.Vector3(0.52, 1.72, 1.665),
    new THREE.Vector3(0.30, 1.98, 1.665),
    new THREE.Vector3(0, 2.08, 1.665),
  ], 0.023, goldMat, false);
  right_upper_gold_arch.name = "right_upper_gold_arch";
  crown_group.add(right_upper_gold_arch);

  const left_pink_enamel_scroll = makeTube([
    new THREE.Vector3(-0.55, 0.53, 1.64),
    new THREE.Vector3(-0.72, 0.68, 1.64),
    new THREE.Vector3(-0.91, 0.88, 1.64),
    new THREE.Vector3(-1.12, 1.02, 1.64),
    new THREE.Vector3(-1.29, 1.00, 1.64),
    new THREE.Vector3(-1.35, 0.86, 1.64),
    new THREE.Vector3(-1.27, 0.75, 1.64),
  ], 0.045, pink_enamelMat, false);
  left_pink_enamel_scroll.name = "left_pink_enamel_scroll";
  crown_group.add(left_pink_enamel_scroll);

  const right_pink_enamel_scroll = makeTube([
    new THREE.Vector3(0.55, 0.53, 1.64),
    new THREE.Vector3(0.72, 0.68, 1.64),
    new THREE.Vector3(0.91, 0.88, 1.64),
    new THREE.Vector3(1.12, 1.02, 1.64),
    new THREE.Vector3(1.29, 1.00, 1.64),
    new THREE.Vector3(1.35, 0.86, 1.64),
    new THREE.Vector3(1.27, 0.75, 1.64),
  ], 0.045, pink_enamelMat, false);
  right_pink_enamel_scroll.name = "right_pink_enamel_scroll";
  crown_group.add(right_pink_enamel_scroll);

  const left_turquoise_enamel_accent = makeTube([
    new THREE.Vector3(-0.43, 0.72, 1.67),
    new THREE.Vector3(-0.54, 0.91, 1.67),
    new THREE.Vector3(-0.68, 1.10, 1.67),
    new THREE.Vector3(-0.84, 1.25, 1.67),
  ], 0.038, turquoise_enamelMat, false);
  left_turquoise_enamel_accent.name = "left_turquoise_enamel_accent";
  crown_group.add(left_turquoise_enamel_accent);

  const right_turquoise_enamel_accent = makeTube([
    new THREE.Vector3(0.43, 0.72, 1.67),
    new THREE.Vector3(0.54, 0.91, 1.67),
    new THREE.Vector3(0.68, 1.10, 1.67),
    new THREE.Vector3(0.84, 1.25, 1.67),
  ], 0.038, turquoise_enamelMat, false);
  right_turquoise_enamel_accent.name = "right_turquoise_enamel_accent";
  crown_group.add(right_turquoise_enamel_accent);

  const side_settings = [
    { x: -1.05, y: 1.02, z: 1.62, r: 0.22 },
    { x: -0.72, y: 1.18, z: 1.62, r: 0.22 },
    { x: -1.35, y: 0.80, z: 1.00, r: 0.20 },
    { x: -1.28, y: 1.30, z: 0.75, r: 0.20 },
    { x: 1.05, y: 1.02, z: 1.62, r: 0.22 },
    { x: 0.72, y: 1.18, z: 1.62, r: 0.22 },
    { x: 1.35, y: 0.80, z: 1.00, r: 0.20 },
    { x: 1.28, y: 1.30, z: 0.75, r: 0.20 },
  ];

  const side_gem_backingGeom = new THREE.CircleGeometry(0.205, 16);
  const side_gem_backings = new THREE.InstancedMesh(
    side_gem_backingGeom,
    crystal_backingMat,
    side_settings.length
  );
  side_gem_backings.name = "side_gem_backings";

  const side_gemGeom = createFacetedGemGeometry(0.21, 0.14, 12);
  const side_gems = new THREE.InstancedMesh(
    side_gemGeom,
    crystal_facetMat,
    side_settings.length
  );
  side_gems.name = "side_gems";

  const side_gem_bezelGeom = new THREE.TorusGeometry(
    0.21,
    0.022,
    7,
    20
  );
  const side_gem_bezels = new THREE.InstancedMesh(
    side_gem_bezelGeom,
    goldMat,
    side_settings.length
  );
  side_gem_bezels.name = "side_gem_bezels";

  const side_prongGeom = new THREE.SphereGeometry(0.032, 10, 7);
  const side_prongs = new THREE.InstancedMesh(
    side_prongGeom,
    goldMat,
    side_settings.length * 4
  );
  side_prongs.name = "side_prongs";

  for (let i = 0; i < side_settings.length; i++) {
    const setting = side_settings[i];
    const normal_scale = setting.r / 0.21;

    setInstance(
      side_gem_backings,
      i,
      setting.x,
      setting.y,
      setting.z - 0.055,
      0,
      0,
      0,
      normal_scale,
      normal_scale,
      normal_scale
    );
    setInstance(
      side_gems,
      i,
      setting.x,
      setting.y,
      setting.z,
      0,
      0,
      0,
      normal_scale,
      normal_scale,
      normal_scale
    );
    setInstance(
      side_gem_bezels,
      i,
      setting.x,
      setting.y,
      setting.z - 0.045,
      0,
      0,
      0,
      normal_scale,
      normal_scale,
      normal_scale
    );

    for (let p = 0; p < 4; p++) {
      const angle = p / 4 * Math.PI * 2;
      setInstance(
        side_prongs,
        i * 4 + p,
        setting.x + Math.cos(angle) * setting.r * 0.91,
        setting.y + Math.sin(angle) * setting.r * 0.91,
        setting.z + 0.035,
        0,
        0,
        0,
        1,
        1,
        1
      );
    }
  }

  side_gem_backings.instanceMatrix.needsUpdate = true;
  side_gems.instanceMatrix.needsUpdate = true;
  side_gem_bezels.instanceMatrix.needsUpdate = true;
  side_prongs.instanceMatrix.needsUpdate = true;
  crown_group.add(
    side_gem_backings,
    side_gem_bezels,
    side_gems,
    side_prongs
  );

  const central_gem_radius = 0.62;
  const central_gem_depth = 0.24;
  const central_gem_y = 1.14;
  const central_gem_z = 1.72;

  const central_gem_backingGeom = new THREE.CircleGeometry(
    central_gem_radius * 0.95,
    24
  );
  const central_gem_backing = new THREE.Mesh(
    central_gem_backingGeom,
    crystal_backingMat
  );
  central_gem_backing.name = "central_gem_backing";
  central_gem_backing.position.set(
    0,
    central_gem_y,
    central_gem_z - 0.075
  );
  crown_group.add(central_gem_backing);

  const central_gem_bezelGeom = new THREE.TorusGeometry(
    central_gem_radius,
    0.035,
    10,
    40
  );
  const central_gem_bezel = new THREE.Mesh(
    central_gem_bezelGeom,
    goldMat
  );
  central_gem_bezel.name = "central_gem_bezel";
  central_gem_bezel.position.set(
    0,
    central_gem_y,
    central_gem_z - 0.055
  );
  crown_group.add(central_gem_bezel);

  const central_gemGeom = createFacetedGemGeometry(
    central_gem_radius,
    central_gem_depth,
    20
  );
  const central_gem = new THREE.Mesh(
    central_gemGeom,
    crystal_facetMat
  );
  central_gem.name = "central_gem";
  central_gem.position.set(
    0,
    central_gem_y,
    central_gem_z
  );
  crown_group.add(central_gem);

  const central_prongGeom = new THREE.SphereGeometry(0.055, 12, 8);
  const central_prongs = new THREE.InstancedMesh(
    central_prongGeom,
    goldMat,
    8
  );
  central_prongs.name = "central_prongs";

  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    setInstance(
      central_prongs,
      i,
      Math.cos(angle) * central_gem_radius * 0.94,
      central_gem_y + Math.sin(angle) * central_gem_radius * 0.94,
      central_gem_z + 0.075,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  central_prongs.instanceMatrix.needsUpdate = true;
  crown_group.add(central_prongs);

  const top_gem_radius = 0.38;
  const top_gem_depth = 0.20;
  const top_gem_y = 2.02;
  const top_gem_z = 1.72;

  const top_gem_backingGeom = new THREE.CircleGeometry(
    top_gem_radius * 0.95,
    20
  );
  const top_gem_backing = new THREE.Mesh(
    top_gem_backingGeom,
    crystal_backingMat
  );
  top_gem_backing.name = "top_gem_backing";
  top_gem_backing.position.set(
    0,
    top_gem_y,
    top_gem_z - 0.065
  );
  crown_group.add(top_gem_backing);

  const top_gem_bezelGeom = new THREE.TorusGeometry(
    top_gem_radius,
    0.028,
    9,
    32
  );
  const top_gem_bezel = new THREE.Mesh(
    top_gem_bezelGeom,
    goldMat
  );
  top_gem_bezel.name = "top_gem_bezel";
  top_gem_bezel.position.set(
    0,
    top_gem_y,
    top_gem_z - 0.05
  );
  crown_group.add(top_gem_bezel);

  const top_gemGeom = createFacetedGemGeometry(
    top_gem_radius,
    top_gem_depth,
    18
  );
  const top_gem = new THREE.Mesh(
    top_gemGeom,
    crystal_facetMat
  );
  top_gem.name = "top_gem";
  top_gem.position.set(0, top_gem_y, top_gem_z);
  crown_group.add(top_gem);

  const top_prongGeom = new THREE.SphereGeometry(0.043, 11, 7);
  const top_prongs = new THREE.InstancedMesh(
    top_prongGeom,
    goldMat,
    6
  );
  top_prongs.name = "top_prongs";

  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    setInstance(
      top_prongs,
      i,
      Math.cos(angle) * top_gem_radius * 0.94,
      top_gem_y + Math.sin(angle) * top_gem_radius * 0.94,
      top_gem_z + 0.06,
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  top_prongs.instanceMatrix.needsUpdate = true;
  crown_group.add(top_prongs);

  const top_finial_stemGeom = new THREE.CylinderGeometry(
    0.025,
    0.032,
    0.10,
    10
  );
  const top_finial_stem = new THREE.Mesh(
    top_finial_stemGeom,
    goldMat
  );
  top_finial_stem.name = "top_finial_stem";
  top_finial_stem.position.set(0, 2.425, 1.72);
  crown_group.add(top_finial_stem);

  const top_finialGeom = new THREE.SphereGeometry(0.075, 14, 9);
  const top_finial = new THREE.Mesh(top_finialGeom, goldMat);
  top_finial.name = "top_finial";
  top_finial.position.set(0, 2.49, 1.72);
  top_finial.scale.set(1.15, 0.72, 0.82);
  crown_group.add(top_finial);

  const arm_tip_positions = [
    [-1.34, 0.52, 0.75],
    [1.34, 0.52, 0.75],
    [-0.67, 1.62, 0.75],
    [0.67, 1.62, 0.75],
    [-1.18, 0.69, 1.64],
    [1.18, 0.69, 1.64],
    [-1.29, 1.00, 1.64],
    [1.29, 1.00, 1.64],
  ];
  const arm_tipGeom = new THREE.SphereGeometry(0.045, 10, 7);
  const arm_tip_caps = new THREE.InstancedMesh(
    arm_tipGeom,
    goldMat,
    arm_tip_positions.length
  );
  arm_tip_caps.name = "arm_tip_caps";

  for (let i = 0; i < arm_tip_positions.length; i++) {
    const p = arm_tip_positions[i];
    setInstance(
      arm_tip_caps,
      i,
      p[0],
      p[1],
      p[2],
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  arm_tip_caps.instanceMatrix.needsUpdate = true;
  crown_group.add(arm_tip_caps);

  const accent_bead_positions = [
    [-0.43, 0.72, 1.68],
    [0.43, 0.72, 1.68],
    [-0.84, 1.25, 1.68],
    [0.84, 1.25, 1.68],
    [-0.30, 1.98, 1.68],
    [0.30, 1.98, 1.68],
    [-1.05, 0.98, 1.68],
    [1.05, 0.98, 1.68],
  ];
  const accent_beadGeom = new THREE.SphereGeometry(0.027, 9, 6);
  const accent_beads = new THREE.InstancedMesh(
    accent_beadGeom,
    silverMat,
    accent_bead_positions.length
  );
  accent_beads.name = "accent_beads";

  for (let i = 0; i < accent_bead_positions.length; i++) {
    const p = accent_bead_positions[i];
    setInstance(
      accent_beads,
      i,
      p[0],
      p[1],
      p[2],
      0,
      0,
      0,
      1,
      1,
      1
    );
  }
  accent_beads.instanceMatrix.needsUpdate = true;
  crown_group.add(accent_beads);

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