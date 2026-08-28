export default function generate(THREE) {
  const root = new THREE.Group();
  const vessel_group = new THREE.Group();
  const liquid_group = new THREE.Group();
  const handle_group = new THREE.Group();
  const steam_group = new THREE.Group();

  root.add(vessel_group, liquid_group, handle_group, steam_group);

  const copperMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.32,
  });
  const polished_copperMat = new THREE.MeshStandardMaterial({
    color: 0xc98249,
    metalness: 0.6,
    roughness: 0.2,
  });
  const dark_copperMat = new THREE.MeshStandardMaterial({
    color: 0x704026,
    metalness: 0.5,
    roughness: 0.45,
  });
  const inner_copperMat = new THREE.MeshStandardMaterial({
    color: 0x8f512f,
    metalness: 0.5,
    roughness: 0.38,
    side: THREE.DoubleSide,
  });
  const liquidMat = new THREE.MeshStandardMaterial({
    color: 0xf4f2e9,
    metalness: 0.0,
    roughness: 0.4,
  });
  const foamMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.55,
  });
  const bubbleMat = new THREE.MeshStandardMaterial({
    color: 0xdedfd9,
    metalness: 0.0,
    roughness: 0.45,
    side: THREE.DoubleSide,
  });
  const steamMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.95,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
  });

  const pot_bodyProfile = [
    new THREE.Vector2(0.00, -0.50),
    new THREE.Vector2(0.29, -0.50),
    new THREE.Vector2(0.38, -0.47),
    new THREE.Vector2(0.47, -0.40),
    new THREE.Vector2(0.54, -0.29),
    new THREE.Vector2(0.58, -0.14),
    new THREE.Vector2(0.59, 0.02),
    new THREE.Vector2(0.57, 0.16),
    new THREE.Vector2(0.52, 0.29),
    new THREE.Vector2(0.46, 0.39),
    new THREE.Vector2(0.44, 0.45),
    new THREE.Vector2(0.46, 0.49),
  ];
  const pot_bodyGeom = new THREE.LatheGeometry(pot_bodyProfile, 64);
  const pot_body = new THREE.Mesh(pot_bodyGeom, copperMat);
  vessel_group.add(pot_body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.426,
    0.405,
    0.09,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_copperMat);
  inner_wall.position.y = 0.445;
  vessel_group.add(inner_wall);

  const base_footGeom = new THREE.CylinderGeometry(0.30, 0.32, 0.026, 48);
  const base_foot = new THREE.Mesh(base_footGeom, dark_copperMat);
  base_foot.position.y = -0.505;
  vessel_group.add(base_foot);

  const rimGeom = new THREE.TorusGeometry(0.46, 0.036, 16, 72);
  const rim = new THREE.Mesh(rimGeom, polished_copperMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.49;
  vessel_group.add(rim);

  const neck_bandGeom = new THREE.TorusGeometry(0.443, 0.009, 8, 64);
  const neck_band = new THREE.Mesh(neck_bandGeom, dark_copperMat);
  neck_band.rotation.x = Math.PI / 2;
  neck_band.position.y = 0.431;
  vessel_group.add(neck_band);

  const liquid_surfaceGeom = new THREE.CylinderGeometry(
    0.414,
    0.414,
    0.016,
    64
  );
  const liquid_surface = new THREE.Mesh(liquid_surfaceGeom, liquidMat);
  liquid_surface.position.y = 0.448;
  liquid_group.add(liquid_surface);

  const foam_ringGeom = new THREE.TorusGeometry(0.365, 0.032, 12, 72);
  const foam_ring = new THREE.Mesh(foam_ringGeom, foamMat);
  foam_ring.rotation.x = Math.PI / 2;
  foam_ring.position.y = 0.463;
  liquid_group.add(foam_ring);

  const bubble_ringGeom = new THREE.TorusGeometry(0.014, 0.003, 6, 16);
  const bubble_rings = new THREE.InstancedMesh(
    bubble_ringGeom,
    bubbleMat,
    24
  );
  const bubble_dummy = new THREE.Object3D();
  for (let i = 0; i < 24; i++) {
    const angle = (i / 24) * Math.PI * 2;
    const radius = 0.315 + (i % 3) * 0.026;
    const scale = 0.72 + (i % 5) * 0.11;
    bubble_dummy.position.set(
      Math.cos(angle) * radius,
      0.469 + (i % 2) * 0.002,
      Math.sin(angle) * radius
    );
    bubble_dummy.rotation.set(Math.PI / 2, 0, angle);
    bubble_dummy.scale.setScalar(scale);
    bubble_dummy.updateMatrix();
    bubble_rings.setMatrixAt(i, bubble_dummy.matrix);
  }
  bubble_rings.instanceMatrix.needsUpdate = true;
  liquid_group.add(bubble_rings);

  const foam_moundGeom = new THREE.SphereGeometry(0.026, 12, 8);
  const foam_mounds = new THREE.InstancedMesh(
    foam_moundGeom,
    foamMat,
    18
  );
  const mound_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const angle = i * 2.3999632297;
    const radius = 0.045 + (((i * 7) % 17) / 17) * 0.285;
    const scale = 0.65 + (i % 4) * 0.16;
    mound_dummy.position.set(
      Math.cos(angle) * radius,
      0.466,
      Math.sin(angle) * radius
    );
    mound_dummy.rotation.set(0, angle, 0);
    mound_dummy.scale.set(scale * 1.25, scale * 0.42, scale);
    mound_dummy.updateMatrix();
    foam_mounds.setMatrixAt(i, mound_dummy.matrix);
  }
  foam_mounds.instanceMatrix.needsUpdate = true;
  liquid_group.add(foam_mounds);

  const handle_points = [
    new THREE.Vector3(0.435, 0.435, -0.018),
    new THREE.Vector3(0.545, 0.475, -0.018),
    new THREE.Vector3(0.700, 0.535, -0.018),
    new THREE.Vector3(0.825, 0.555, -0.018),
    new THREE.Vector3(0.915, 0.515, -0.018),
    new THREE.Vector3(0.940, 0.455, -0.018),
    new THREE.Vector3(0.895, 0.395, -0.018),
    new THREE.Vector3(0.770, 0.350, -0.018),
    new THREE.Vector3(0.625, 0.275, -0.018),
    new THREE.Vector3(0.525, 0.170, -0.018),
    new THREE.Vector3(0.485, 0.145, -0.018),
  ];
  const handle_curve = new THREE.CatmullRomCurve3(
    handle_points,
    false,
    "centripetal"
  );
  const handleGeom = new THREE.TubeGeometry(
    handle_curve,
    72,
    0.052,
    12,
    false
  );
  const handle = new THREE.Mesh(handleGeom, copperMat);
  handle_group.add(handle);

  const handle_inset_points = [];
  for (let i = 0; i < handle_points.length; i++) {
    const point = handle_points[i];
    handle_inset_points.push(
      new THREE.Vector3(point.x, point.y, point.z + 0.048)
    );
  }
  const handle_inset_curve = new THREE.CatmullRomCurve3(
    handle_inset_points,
    false,
    "centripetal"
  );
  const handle_insetGeom = new THREE.TubeGeometry(
    handle_inset_curve,
    72,
    0.031,
    10,
    false
  );
  const handle_inset = new THREE.Mesh(handle_insetGeom, dark_copperMat);
  handle_group.add(handle_inset);

  const handle_highlight_points = [];
  for (let i = 0; i < handle_points.length; i++) {
    const point = handle_points[i];
    handle_highlight_points.push(
      new THREE.Vector3(point.x, point.y + 0.004, point.z + 0.051)
    );
  }
  const handle_highlight_curve = new THREE.CatmullRomCurve3(
    handle_highlight_points,
    false,
    "centripetal"
  );
  const handle_highlightGeom = new THREE.TubeGeometry(
    handle_highlight_curve,
    72,
    0.008,
    8,
    false
  );
  const handle_highlight = new THREE.Mesh(
    handle_highlightGeom,
    polished_copperMat
  );
  handle_group.add(handle_highlight);

  const upper_handle_mountGeom = new THREE.SphereGeometry(0.07, 20, 12);
  const upper_handle_mount = new THREE.Mesh(
    upper_handle_mountGeom,
    copperMat
  );
  upper_handle_mount.position.set(0.445, 0.432, -0.012);
  upper_handle_mount.scale.set(0.72, 1.0, 0.82);
  handle_group.add(upper_handle_mount);

  const lower_handle_mountGeom = new THREE.SphereGeometry(0.06, 20, 12);
  const lower_handle_mount = new THREE.Mesh(
    lower_handle_mountGeom,
    dark_copperMat
  );
  lower_handle_mount.position.set(0.485, 0.155, -0.012);
  lower_handle_mount.scale.set(0.65, 1.2, 0.8);
  handle_group.add(lower_handle_mount);

  const steam_wisp_left_points = [
    new THREE.Vector3(-0.27, 0.485, 0.02),
    new THREE.Vector3(-0.31, 0.61, 0.03),
    new THREE.Vector3(-0.24, 0.73, 0.02),
    new THREE.Vector3(-0.30, 0.86, 0.00),
    new THREE.Vector3(-0.23, 1.00, -0.02),
    new THREE.Vector3(-0.27, 1.18, -0.03),
  ];
  const steam_wisp_leftGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      steam_wisp_left_points,
      false,
      "centripetal"
    ),
    40,
    0.008,
    6,
    false
  );
  const steam_wisp_left = new THREE.Mesh(
    steam_wisp_leftGeom,
    steamMat
  );
  steam_group.add(steam_wisp_left);

  const steam_wisp_center_points = [
    new THREE.Vector3(-0.04, 0.49, -0.01),
    new THREE.Vector3(0.01, 0.63, 0.00),
    new THREE.Vector3(-0.06, 0.77, 0.02),
    new THREE.Vector3(0.02, 0.91, 0.00),
    new THREE.Vector3(-0.03, 1.08, -0.02),
    new THREE.Vector3(0.04, 1.30, -0.03),
  ];
  const steam_wisp_centerGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      steam_wisp_center_points,
      false,
      "centripetal"
    ),
    44,
    0.01,
    6,
    false
  );
  const steam_wisp_center = new THREE.Mesh(
    steam_wisp_centerGeom,
    steamMat
  );
  steam_group.add(steam_wisp_center);

  const steam_wisp_right_points = [
    new THREE.Vector3(0.24, 0.49, 0.03),
    new THREE.Vector3(0.30, 0.61, 0.01),
    new THREE.Vector3(0.25, 0.74, 0.00),
    new THREE.Vector3(0.33, 0.87, -0.01),
    new THREE.Vector3(0.28, 1.02, -0.03),
    new THREE.Vector3(0.35, 1.19, -0.04),
  ];
  const steam_wisp_rightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(
      steam_wisp_right_points,
      false,
      "centripetal"
    ),
    40,
    0.009,
    6,
    false
  );
  const steam_wisp_right = new THREE.Mesh(
    steam_wisp_rightGeom,
    steamMat
  );
  steam_group.add(steam_wisp_right);

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