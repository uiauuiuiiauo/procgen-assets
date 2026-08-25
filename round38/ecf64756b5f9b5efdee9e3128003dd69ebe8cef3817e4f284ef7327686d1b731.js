export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "iridescent_hourglass";

  const frame_group = new THREE.Group();
  frame_group.name = "frame_group";
  root.add(frame_group);

  const vessel_group = new THREE.Group();
  vessel_group.name = "vessel_group";
  root.add(vessel_group);

  const contents_group = new THREE.Group();
  contents_group.name = "contents_group";
  root.add(contents_group);

  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  root.add(decoration_group);

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x171313,
    metalness: 0.0,
    roughness: 0.3
  });

  const frame_trimMat = new THREE.MeshStandardMaterial({
    color: 0x2b2020,
    metalness: 0.0,
    roughness: 0.3
  });

  const top_insetMat = new THREE.MeshStandardMaterial({
    color: 0x292829,
    metalness: 0.0,
    roughness: 0.8
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const sandMat = new THREE.MeshStandardMaterial({
    color: 0x24252a,
    metalness: 0.0,
    roughness: 0.9
  });

  const lower_sand_surfaceMat = new THREE.MeshStandardMaterial({
    color: 0x34363b,
    metalness: 0.0,
    roughness: 0.9
  });

  const glass_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x5d8f94,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.55
  });

  const glass_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.18,
    depthWrite: false
  });

  const base_plinthProfile = [
    new THREE.Vector2(0.00, -0.96),
    new THREE.Vector2(0.42, -0.96),
    new THREE.Vector2(0.48, -0.945),
    new THREE.Vector2(0.53, -0.90),
    new THREE.Vector2(0.55, -0.83),
    new THREE.Vector2(0.54, -0.77),
    new THREE.Vector2(0.50, -0.71),
    new THREE.Vector2(0.44, -0.66),
    new THREE.Vector2(0.37, -0.64),
    new THREE.Vector2(0.00, -0.64)
  ];
  const base_plinthGeom = new THREE.LatheGeometry(base_plinthProfile, 64);
  const base_plinth = new THREE.Mesh(base_plinthGeom, frameMat);
  base_plinth.name = "base_plinth";
  frame_group.add(base_plinth);

  const base_lower_trimGeom = new THREE.TorusGeometry(0.495, 0.014, 10, 64);
  const base_lower_trim = new THREE.Mesh(base_lower_trimGeom, frame_trimMat);
  base_lower_trim.name = "base_lower_trim";
  base_lower_trim.rotation.x = Math.PI / 2;
  base_lower_trim.position.y = -0.90;
  frame_group.add(base_lower_trim);

  const base_upper_trimGeom = new THREE.TorusGeometry(0.465, 0.017, 10, 64);
  const base_upper_trim = new THREE.Mesh(base_upper_trimGeom, frame_trimMat);
  base_upper_trim.name = "base_upper_trim";
  base_upper_trim.rotation.x = Math.PI / 2;
  base_upper_trim.position.y = -0.69;
  frame_group.add(base_upper_trim);

  const base_top_ringGeom = new THREE.TorusGeometry(0.375, 0.025, 12, 64);
  const base_top_ring = new THREE.Mesh(base_top_ringGeom, frameMat);
  base_top_ring.name = "base_top_ring";
  base_top_ring.rotation.x = Math.PI / 2;
  base_top_ring.position.y = -0.625;
  frame_group.add(base_top_ring);

  const top_lidProfile = [
    new THREE.Vector2(0.00, 0.62),
    new THREE.Vector2(0.34, 0.62),
    new THREE.Vector2(0.43, 0.64),
    new THREE.Vector2(0.50, 0.68),
    new THREE.Vector2(0.54, 0.74),
    new THREE.Vector2(0.55, 0.81),
    new THREE.Vector2(0.53, 0.88),
    new THREE.Vector2(0.48, 0.93),
    new THREE.Vector2(0.40, 0.95),
    new THREE.Vector2(0.00, 0.95)
  ];
  const top_lidGeom = new THREE.LatheGeometry(top_lidProfile, 64);
  const top_lid = new THREE.Mesh(top_lidGeom, frameMat);
  top_lid.name = "top_lid";
  frame_group.add(top_lid);

  const top_insetGeom = new THREE.CylinderGeometry(0.405, 0.405, 0.014, 64);
  const top_inset = new THREE.Mesh(top_insetGeom, top_insetMat);
  top_inset.name = "top_inset";
  top_inset.position.y = 0.957;
  frame_group.add(top_inset);

  const top_inset_rimGeom = new THREE.TorusGeometry(0.39, 0.009, 8, 64);
  const top_inset_rim = new THREE.Mesh(top_inset_rimGeom, frame_trimMat);
  top_inset_rim.name = "top_inset_rim";
  top_inset_rim.rotation.x = Math.PI / 2;
  top_inset_rim.position.y = 0.966;
  frame_group.add(top_inset_rim);

  const top_lower_trimGeom = new THREE.TorusGeometry(0.445, 0.018, 10, 64);
  const top_lower_trim = new THREE.Mesh(top_lower_trimGeom, frame_trimMat);
  top_lower_trim.name = "top_lower_trim";
  top_lower_trim.rotation.x = Math.PI / 2;
  top_lower_trim.position.y = 0.645;
  frame_group.add(top_lower_trim);

  const glass_bodyProfile = [
    new THREE.Vector2(0.350, -0.640),
    new THREE.Vector2(0.370, -0.590),
    new THREE.Vector2(0.365, -0.490),
    new THREE.Vector2(0.340, -0.380),
    new THREE.Vector2(0.290, -0.260),
    new THREE.Vector2(0.220, -0.150),
    new THREE.Vector2(0.140, -0.070),
    new THREE.Vector2(0.070, -0.020),
    new THREE.Vector2(0.043, 0.000),
    new THREE.Vector2(0.070, 0.020),
    new THREE.Vector2(0.140, 0.070),
    new THREE.Vector2(0.220, 0.150),
    new THREE.Vector2(0.290, 0.260),
    new THREE.Vector2(0.340, 0.380),
    new THREE.Vector2(0.365, 0.490),
    new THREE.Vector2(0.370, 0.590),
    new THREE.Vector2(0.350, 0.640),
    new THREE.Vector2(0.325, 0.600),
    new THREE.Vector2(0.330, 0.510),
    new THREE.Vector2(0.305, 0.390),
    new THREE.Vector2(0.255, 0.270),
    new THREE.Vector2(0.185, 0.160),
    new THREE.Vector2(0.105, 0.080),
    new THREE.Vector2(0.045, 0.025),
    new THREE.Vector2(0.025, 0.000),
    new THREE.Vector2(0.045, -0.025),
    new THREE.Vector2(0.105, -0.080),
    new THREE.Vector2(0.185, -0.160),
    new THREE.Vector2(0.255, -0.270),
    new THREE.Vector2(0.305, -0.390),
    new THREE.Vector2(0.330, -0.510),
    new THREE.Vector2(0.325, -0.600),
    new THREE.Vector2(0.350, -0.640)
  ];
  const glass_bodyGeom = new THREE.LatheGeometry(glass_bodyProfile, 72);
  const glass_body = new THREE.Mesh(glass_bodyGeom, glassMat);
  glass_body.name = "glass_body";
  glass_body.renderOrder = 3;
  vessel_group.add(glass_body);

  const waist_glass_rimGeom = new THREE.TorusGeometry(0.043, 0.006, 8, 40);
  const waist_glass_rim = new THREE.Mesh(waist_glass_rimGeom, glass_edgeMat);
  waist_glass_rim.name = "waist_glass_rim";
  waist_glass_rim.rotation.x = Math.PI / 2;
  waist_glass_rim.renderOrder = 4;
  vessel_group.add(waist_glass_rim);

  const lower_sandProfile = [
    new THREE.Vector2(0.000, -0.585),
    new THREE.Vector2(0.285, -0.585),
    new THREE.Vector2(0.300, -0.550),
    new THREE.Vector2(0.270, -0.500),
    new THREE.Vector2(0.210, -0.445),
    new THREE.Vector2(0.120, -0.405),
    new THREE.Vector2(0.000, -0.390)
  ];
  const lower_sandGeom = new THREE.LatheGeometry(lower_sandProfile, 48);
  const lower_sand = new THREE.Mesh(lower_sandGeom, sandMat);
  lower_sand.name = "lower_sand";
  contents_group.add(lower_sand);

  const lower_sand_surfaceGeom = new THREE.CylinderGeometry(0.275, 0.275, 0.012, 48);
  const lower_sand_surface = new THREE.Mesh(lower_sand_surfaceGeom, lower_sand_surfaceMat);
  lower_sand_surface.name = "lower_sand_surface";
  lower_sand_surface.position.y = -0.578;
  contents_group.add(lower_sand_surface);

  const upper_sand_reservoirGeom = new THREE.SphereGeometry(0.16, 32, 16);
  const upper_sand_reservoir = new THREE.Mesh(upper_sand_reservoirGeom, sandMat);
  upper_sand_reservoir.name = "upper_sand_reservoir";
  upper_sand_reservoir.position.y = 0.16;
  upper_sand_reservoir.scale.set(1.0, 0.62, 1.0);
  contents_group.add(upper_sand_reservoir);

  const falling_sand_streamGeom = new THREE.CylinderGeometry(0.006, 0.008, 0.50, 10);
  const falling_sand_stream = new THREE.Mesh(falling_sand_streamGeom, sandMat);
  falling_sand_stream.name = "falling_sand_stream";
  falling_sand_stream.position.y = -0.135;
  contents_group.add(falling_sand_stream);

  const falling_grainsGeom = new THREE.SphereGeometry(0.008, 8, 6);
  const falling_grains = new THREE.InstancedMesh(falling_grainsGeom, sandMat, 12);
  falling_grains.name = "falling_grains";
  const grain_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    grain_dummy.position.set(
      Math.sin(i * 1.7) * 0.004,
      0.095 - t * 0.465,
      Math.cos(i * 1.3) * 0.004
    );
    grain_dummy.scale.setScalar(0.65 + (i % 3) * 0.12);
    grain_dummy.rotation.set(0, 0, 0);
    grain_dummy.updateMatrix();
    falling_grains.setMatrixAt(i, grain_dummy.matrix);
  }
  falling_grains.instanceMatrix.needsUpdate = true;
  contents_group.add(falling_grains);

  const radius_profile = [
    [-0.64, 0.35],
    [-0.59, 0.37],
    [-0.49, 0.365],
    [-0.38, 0.34],
    [-0.26, 0.29],
    [-0.15, 0.22],
    [-0.07, 0.14],
    [-0.02, 0.07],
    [0.00, 0.043],
    [0.02, 0.07],
    [0.07, 0.14],
    [0.15, 0.22],
    [0.26, 0.29],
    [0.38, 0.34],
    [0.49, 0.365],
    [0.59, 0.37],
    [0.64, 0.35]
  ];

  function glassRadiusAt(y) {
    if (y <= radius_profile[0][0]) return radius_profile[0][1];
    for (let i = 0; i < radius_profile.length - 1; i++) {
      const a = radius_profile[i];
      const b = radius_profile[i + 1];
      if (y <= b[0]) {
        const t = (y - a[0]) / (b[0] - a[0]);
        return a[1] + (b[1] - a[1]) * t;
      }
    }
    return radius_profile[radius_profile.length - 1][1];
  }

  function makeGlassHighlight(side) {
    const ys = [-0.56, -0.43, -0.27, -0.10, 0.00, 0.10, 0.27, 0.43, 0.56];
    const points = [];
    for (let i = 0; i < ys.length; i++) {
      const y = ys[i];
      const r = glassRadiusAt(y);
      const x = side * Math.min(0.06, r * 0.16);
      const z = Math.sqrt(Math.max(0.0001, r * r - x * x)) + 0.006;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, false, "centripetal"),
      48,
      side === 0 ? 0.010 : 0.006,
      6,
      false
    );
  }

  const central_glass_highlightGeom = makeGlassHighlight(0);
  const central_glass_highlight = new THREE.Mesh(
    central_glass_highlightGeom,
    glass_highlightMat
  );
  central_glass_highlight.name = "central_glass_highlight";
  central_glass_highlight.renderOrder = 5;
  decoration_group.add(central_glass_highlight);

  const left_glass_highlightGeom = makeGlassHighlight(-1);
  const left_glass_highlight = new THREE.Mesh(
    left_glass_highlightGeom,
    glass_highlightMat
  );
  left_glass_highlight.name = "left_glass_highlight";
  left_glass_highlight.renderOrder = 5;
  decoration_group.add(left_glass_highlight);

  const right_glass_highlightGeom = makeGlassHighlight(1);
  const right_glass_highlight = new THREE.Mesh(
    right_glass_highlightGeom,
    glass_highlightMat
  );
  right_glass_highlight.name = "right_glass_highlight";
  right_glass_highlight.renderOrder = 5;
  decoration_group.add(right_glass_highlight);

  function makePrismMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.0,
      roughness: 0.5,
      emissive: color,
      emissiveIntensity: 1.0
    });
  }

  const cyan_prism_flecksMat = makePrismMaterial(0x28eaff);
  const green_prism_flecksMat = makePrismMaterial(0x36ff8b);
  const blue_prism_flecksMat = makePrismMaterial(0x557dff);
  const magenta_prism_flecksMat = makePrismMaterial(0xff55d8);
  const yellow_prism_flecksMat = makePrismMaterial(0xffe34c);
  const orange_prism_flecksMat = makePrismMaterial(0xff873d);
  const violet_prism_flecksMat = makePrismMaterial(0xa65dff);

  const prism_fleckGeom = new THREE.SphereGeometry(1, 10, 7);
  const fleckCount = 12;

  const cyan_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    cyan_prism_flecksMat,
    fleckCount
  );
  cyan_prism_flecks.name = "cyan_prism_flecks";

  const green_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    green_prism_flecksMat,
    fleckCount
  );
  green_prism_flecks.name = "green_prism_flecks";

  const blue_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    blue_prism_flecksMat,
    fleckCount
  );
  blue_prism_flecks.name = "blue_prism_flecks";

  const magenta_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    magenta_prism_flecksMat,
    fleckCount
  );
  magenta_prism_flecks.name = "magenta_prism_flecks";

  const yellow_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    yellow_prism_flecksMat,
    fleckCount
  );
  yellow_prism_flecks.name = "yellow_prism_flecks";

  const orange_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    orange_prism_flecksMat,
    fleckCount
  );
  orange_prism_flecks.name = "orange_prism_flecks";

  const violet_prism_flecks = new THREE.InstancedMesh(
    prism_fleckGeom,
    violet_prism_flecksMat,
    fleckCount
  );
  violet_prism_flecks.name = "violet_prism_flecks";

  const fleck_sets = [
    cyan_prism_flecks,
    green_prism_flecks,
    blue_prism_flecks,
    magenta_prism_flecks,
    yellow_prism_flecks,
    orange_prism_flecks,
    violet_prism_flecks
  ];

  const normal_axis = new THREE.Vector3(0, 0, 1);
  const fleck_dummy = new THREE.Object3D();

  for (let colorIndex = 0; colorIndex < fleck_sets.length; colorIndex++) {
    const fleck_mesh = fleck_sets[colorIndex];
    for (let i = 0; i < fleckCount; i++) {
      const k = i * fleck_sets.length + colorIndex;
      const upper = k % 2 === 0;
      const q = ((k * 13) % 71) / 70;
      const y = upper ? 0.075 + q * 0.50 : -0.59 + q * 0.50;
      const r = glassRadiusAt(y) - 0.008;
      const angle = k * 2.399963229728653 + colorIndex * 0.11;
      const normal = new THREE.Vector3(
        Math.cos(angle),
        0,
        Math.sin(angle)
      ).normalize();

      fleck_dummy.position.set(normal.x * r, y, normal.z * r);
      fleck_dummy.quaternion.setFromUnitVectors(normal_axis, normal);
      fleck_dummy.rotateZ(((k * 5) % 13) / 13 * Math.PI);
      fleck_dummy.scale.set(
        0.014 + (k % 4) * 0.005,
        0.025 + ((k * 3) % 5) * 0.006,
        0.0045
      );
      fleck_dummy.updateMatrix();
      fleck_mesh.setMatrixAt(i, fleck_dummy.matrix);
    }
    fleck_mesh.instanceMatrix.needsUpdate = true;
    decoration_group.add(fleck_mesh);
  }

  fitToUnitCube(THREE, root);
  return root;
}

function fitToUnitCube(THREE, root) {
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