export default function generate(THREE) {
  const root = new THREE.Group();
  const orb_group = new THREE.Group();
  const pedestal_group = new THREE.Group();
  root.add(orb_group, pedestal_group);

  const orbR = 0.45;
  orb_group.position.y = 0.04;

  const orb_bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0x55c8ef,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.78,
    thickness: 0.32,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 700],
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const orb_bodyGeom = new THREE.SphereGeometry(orbR, 64, 40);
  const orb_body = new THREE.Mesh(orb_bodyGeom, orb_bodyMat);
  orb_body.renderOrder = 2;
  orb_group.add(orb_body);

  const inner_glowMat = new THREE.MeshStandardMaterial({
    color: 0x27b9e8,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const inner_glowGeom = new THREE.SphereGeometry(orbR * 0.91, 48, 28);
  const inner_glow = new THREE.Mesh(inner_glowGeom, inner_glowMat);
  inner_glow.renderOrder = 0;
  orb_group.add(inner_glow);

  const lower_frosted_layerMat = new THREE.MeshPhysicalMaterial({
    color: 0xd9f5ff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lower_frosted_layerGeom = new THREE.SphereGeometry(
    orbR * 1.006,
    64,
    24,
    0,
    Math.PI * 2,
    Math.PI / 2,
    Math.PI / 2
  );
  const lower_frosted_layer = new THREE.Mesh(
    lower_frosted_layerGeom,
    lower_frosted_layerMat
  );
  lower_frosted_layer.renderOrder = 1;
  orb_group.add(lower_frosted_layer);

  const lower_milky_coreMat = new THREE.MeshStandardMaterial({
    color: 0xeaf8ff,
    metalness: 0.0,
    roughness: 0.8,
    transparent: true,
    opacity: 0.13,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lower_milky_coreGeom = new THREE.SphereGeometry(
    orbR * 0.94,
    48,
    20,
    0,
    Math.PI * 2,
    Math.PI / 2 + 0.05,
    Math.PI / 2 - 0.05
  );
  const lower_milky_core = new THREE.Mesh(
    lower_milky_coreGeom,
    lower_milky_coreMat
  );
  lower_milky_core.renderOrder = 0;
  orb_group.add(lower_milky_core);

  const equator_refraction_bandMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9f4ff,
    metalness: 0.0,
    roughness: 0.4,
    transmission: 0.7,
    ior: 1.5,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });
  const equator_refraction_bandGeom = new THREE.TorusGeometry(
    orbR * 0.974,
    0.008,
    10,
    96
  );
  const equator_refraction_band = new THREE.Mesh(
    equator_refraction_bandGeom,
    equator_refraction_bandMat
  );
  equator_refraction_band.rotation.x = Math.PI / 2;
  equator_refraction_band.position.y = -0.006;
  equator_refraction_band.renderOrder = 3;
  orb_group.add(equator_refraction_band);

  const top_apertureMat = new THREE.MeshPhysicalMaterial({
    color: 0x168fc9,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const top_apertureGeom = new THREE.TorusGeometry(0.014, 0.0028, 8, 32);
  const top_aperture = new THREE.Mesh(top_apertureGeom, top_apertureMat);
  top_aperture.rotation.x = Math.PI / 2;
  top_aperture.position.y = orbR + 0.001;
  top_aperture.renderOrder = 4;
  orb_group.add(top_aperture);

  const top_aperture_centerMat = new THREE.MeshStandardMaterial({
    color: 0x166b9f,
    metalness: 0.0,
    roughness: 0.7,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const top_aperture_centerGeom = new THREE.CircleGeometry(0.0105, 24);
  const top_aperture_center = new THREE.Mesh(
    top_aperture_centerGeom,
    top_aperture_centerMat
  );
  top_aperture_center.rotation.x = -Math.PI / 2;
  top_aperture_center.position.y = orbR + 0.0015;
  top_aperture_center.renderOrder = 3;
  orb_group.add(top_aperture_center);

  const base_pedestalMat = new THREE.MeshPhysicalMaterial({
    color: 0x0879d1,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.76,
    thickness: 0.12,
    iridescence: 0.8,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 520],
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const base_pedestalGeom = new THREE.CylinderGeometry(
    0.177,
    0.19,
    0.055,
    64
  );
  const base_pedestal = new THREE.Mesh(base_pedestalGeom, base_pedestalMat);
  base_pedestal.position.y = -0.442;
  pedestal_group.add(base_pedestal);

  const base_bottom_rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x0752a9,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.82,
    depthWrite: false
  });
  const base_bottom_rimGeom = new THREE.TorusGeometry(0.178, 0.009, 10, 64);
  const base_bottom_rim = new THREE.Mesh(
    base_bottom_rimGeom,
    base_bottom_rimMat
  );
  base_bottom_rim.rotation.x = Math.PI / 2;
  base_bottom_rim.position.y = -0.469;
  base_bottom_rim.renderOrder = 2;
  pedestal_group.add(base_bottom_rim);

  const base_top_rimMat = base_bottom_rimMat;
  const base_top_rimGeom = new THREE.TorusGeometry(0.165, 0.008, 10, 64);
  const base_top_rim = new THREE.Mesh(base_top_rimGeom, base_top_rimMat);
  base_top_rim.rotation.x = Math.PI / 2;
  base_top_rim.position.y = -0.414;
  base_top_rim.renderOrder = 2;
  pedestal_group.add(base_top_rim);

  const base_contact_ringMat = new THREE.MeshStandardMaterial({
    color: 0x075bb8,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.58,
    depthWrite: false
  });
  const base_contact_ringGeom = new THREE.TorusGeometry(0.145, 0.005, 8, 56);
  const base_contact_ring = new THREE.Mesh(
    base_contact_ringGeom,
    base_contact_ringMat
  );
  base_contact_ring.rotation.x = Math.PI / 2;
  base_contact_ring.position.y = -0.411;
  base_contact_ring.renderOrder = 3;
  pedestal_group.add(base_contact_ring);

  function orbSurfacePoint(x, y, offset) {
    const z = Math.sqrt(Math.max(0, orbR * orbR - x * x - y * y));
    const scale = (orbR + offset) / orbR;
    return new THREE.Vector3(x * scale, y * scale, z * scale);
  }

  function makeSurfaceArcGeometry(xyPoints, radius) {
    const pathPoints = [];
    for (let i = 0; i < xyPoints.length; i++) {
      pathPoints.push(orbSurfacePoint(xyPoints[i].x, xyPoints[i].y, 0.004));
    }
    const curve = new THREE.CatmullRomCurve3(
      pathPoints,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(
      curve,
      Math.max(24, xyPoints.length * 5),
      radius,
      8,
      false
    );
  }

  const upper_rainbow_arcMat = new THREE.MeshBasicMaterial({
    color: 0x34d9ff,
    transparent: true,
    opacity: 0.42,
    depthWrite: false
  });
  const upper_rainbow_arcGeom = makeSurfaceArcGeometry([
    new THREE.Vector2(-0.31, 0.235),
    new THREE.Vector2(-0.18, 0.315),
    new THREE.Vector2(0.01, 0.345),
    new THREE.Vector2(0.20, 0.305),
    new THREE.Vector2(0.33, 0.205)
  ], 0.0042);
  const upper_rainbow_arc = new THREE.Mesh(
    upper_rainbow_arcGeom,
    upper_rainbow_arcMat
  );
  upper_rainbow_arc.renderOrder = 4;
  orb_group.add(upper_rainbow_arc);

  const upper_violet_arcMat = new THREE.MeshBasicMaterial({
    color: 0xb66dff,
    transparent: true,
    opacity: 0.34,
    depthWrite: false
  });
  const upper_violet_arcGeom = makeSurfaceArcGeometry([
    new THREE.Vector2(-0.335, 0.19),
    new THREE.Vector2(-0.22, 0.275),
    new THREE.Vector2(-0.04, 0.325),
    new THREE.Vector2(0.16, 0.285),
    new THREE.Vector2(0.31, 0.17)
  ], 0.0032);
  const upper_violet_arc = new THREE.Mesh(
    upper_violet_arcGeom,
    upper_violet_arcMat
  );
  upper_violet_arc.renderOrder = 4;
  orb_group.add(upper_violet_arc);

  const lower_rainbow_arcMat = new THREE.MeshBasicMaterial({
    color: 0x16a9ff,
    transparent: true,
    opacity: 0.46,
    depthWrite: false
  });
  const lower_rainbow_arcGeom = makeSurfaceArcGeometry([
    new THREE.Vector2(-0.34, -0.19),
    new THREE.Vector2(-0.25, -0.31),
    new THREE.Vector2(-0.06, -0.395),
    new THREE.Vector2(0.15, -0.365),
    new THREE.Vector2(0.29, -0.27),
    new THREE.Vector2(0.35, -0.15)
  ], 0.0045);
  const lower_rainbow_arc = new THREE.Mesh(
    lower_rainbow_arcGeom,
    lower_rainbow_arcMat
  );
  lower_rainbow_arc.renderOrder = 4;
  orb_group.add(lower_rainbow_arc);

  const lower_gold_arcMat = new THREE.MeshBasicMaterial({
    color: 0xffd84a,
    transparent: true,
    opacity: 0.38,
    depthWrite: false
  });
  const lower_gold_arcGeom = makeSurfaceArcGeometry([
    new THREE.Vector2(-0.27, -0.325),
    new THREE.Vector2(-0.10, -0.405),
    new THREE.Vector2(0.09, -0.395),
    new THREE.Vector2(0.25, -0.315)
  ], 0.003);
  const lower_gold_arc = new THREE.Mesh(
    lower_gold_arcGeom,
    lower_gold_arcMat
  );
  lower_gold_arc.renderOrder = 4;
  orb_group.add(lower_gold_arc);

  const lower_pink_arcMat = new THREE.MeshBasicMaterial({
    color: 0xff55b6,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });
  const lower_pink_arcGeom = makeSurfaceArcGeometry([
    new THREE.Vector2(-0.17, -0.405),
    new THREE.Vector2(0.01, -0.435),
    new THREE.Vector2(0.19, -0.385),
    new THREE.Vector2(0.30, -0.29)
  ], 0.0028);
  const lower_pink_arc = new THREE.Mesh(
    lower_pink_arcGeom,
    lower_pink_arcMat
  );
  lower_pink_arc.renderOrder = 4;
  orb_group.add(lower_pink_arc);

  const window_highlightMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function makeWindowHighlightGeometry(centerX, centerY, width, height, tilt) {
    const geometry = new THREE.PlaneGeometry(width, height, 5, 5);
    const positions = geometry.attributes.position;
    const c = Math.cos(tilt);
    const s = Math.sin(tilt);

    for (let i = 0; i < positions.count; i++) {
      const px = positions.getX(i);
      const py = positions.getY(i);
      const x = centerX + px * c - py * s;
      const y = centerY + px * s + py * c;
      const z = Math.sqrt(Math.max(0, orbR * orbR - x * x - y * y));
      const scale = (orbR + 0.007) / orbR;
      positions.setXYZ(i, x * scale, y * scale, z * scale);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const left_window_highlightGeom = makeWindowHighlightGeometry(
    -0.155,
    0.045,
    0.105,
    0.205,
    -0.18
  );
  const left_window_highlight = new THREE.Mesh(
    left_window_highlightGeom,
    window_highlightMat
  );
  left_window_highlight.renderOrder = 5;
  orb_group.add(left_window_highlight);

  const right_window_highlightGeom = makeWindowHighlightGeometry(
    0.145,
    0.135,
    0.135,
    0.145,
    0.16
  );
  const right_window_highlight = new THREE.Mesh(
    right_window_highlightGeom,
    window_highlightMat
  );
  right_window_highlight.renderOrder = 5;
  orb_group.add(right_window_highlight);

  const lower_window_glowMat = new THREE.MeshBasicMaterial({
    color: 0xf3ffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const lower_window_glowGeom = new THREE.CircleGeometry(1, 40);
  const lower_window_glow = new THREE.Mesh(
    lower_window_glowGeom,
    lower_window_glowMat
  );
  const lowerGlowX = 0.08;
  const lowerGlowY = -0.14;
  const lowerGlowZ = Math.sqrt(
    Math.max(
      0,
      orbR * orbR -
        lowerGlowX * lowerGlowX -
        lowerGlowY * lowerGlowY
    )
  );
  const lowerGlowNormal = new THREE.Vector3(
    lowerGlowX,
    lowerGlowY,
    lowerGlowZ
  ).normalize();
  lower_window_glow.position.copy(lowerGlowNormal).multiplyScalar(orbR + 0.006);
  lower_window_glow.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    lowerGlowNormal
  );
  lower_window_glow.scale.set(0.13, 0.18, 1);
  lower_window_glow.renderOrder = 5;
  orb_group.add(lower_window_glow);

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