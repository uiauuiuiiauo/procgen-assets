export default function generate(THREE) {
  const root = new THREE.Group();
  const apple = new THREE.Group();
  root.add(apple);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const apple_profile = [
    new THREE.Vector2(0.00, -0.72),
    new THREE.Vector2(0.18, -0.72),
    new THREE.Vector2(0.36, -0.68),
    new THREE.Vector2(0.53, -0.59),
    new THREE.Vector2(0.66, -0.43),
    new THREE.Vector2(0.73, -0.20),
    new THREE.Vector2(0.76, 0.05),
    new THREE.Vector2(0.74, 0.28),
    new THREE.Vector2(0.67, 0.46),
    new THREE.Vector2(0.57, 0.59),
    new THREE.Vector2(0.44, 0.67),
    new THREE.Vector2(0.31, 0.69),
    new THREE.Vector2(0.20, 0.64),
    new THREE.Vector2(0.11, 0.55),
    new THREE.Vector2(0.05, 0.50),
    new THREE.Vector2(0.00, 0.48)
  ];

  function appleRadiusAtY(y) {
    if (y <= apple_profile[0].y) return apple_profile[1].x;
    for (let i = 0; i < apple_profile.length - 1; i++) {
      const a = apple_profile[i];
      const b = apple_profile[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.x + (b.x - a.x) * t;
      }
    }
    return 0;
  }

  function appleSurfaceSample(y, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const lobe = 1 + 0.018 * Math.cos(angle * 5) *
      (0.35 + 0.65 * Math.abs(sin));
    const radius = appleRadiusAtY(y) * lobe;
    const position = new THREE.Vector3(
      cos * radius,
      y,
      sin * radius * 0.96
    );
    const normal = new THREE.Vector3(cos, 0, sin / 0.96).normalize();
    return { position, normal };
  }

  const apple_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    vertexColors: true
  });

  const apple_bodyGeom = new THREE.LatheGeometry(apple_profile, 96);
  const apple_bodyPosition = apple_bodyGeom.attributes.position;
  const apple_bodyColors = new Float32Array(apple_bodyPosition.count * 3);
  const apple_dark_color = new THREE.Color(0x82051f);
  const apple_light_color = new THREE.Color(0xd62b4b);
  const apple_green_color = new THREE.Color(0xa9aa4f);
  const apple_gold_color = new THREE.Color(0xe2bd58);
  const apple_temp_color = new THREE.Color();

  for (let i = 0; i < apple_bodyPosition.count; i++) {
    const ox = apple_bodyPosition.getX(i);
    const oy = apple_bodyPosition.getY(i);
    const oz = apple_bodyPosition.getZ(i);
    const angle = Math.atan2(oz, ox);
    const lobe = 1 + 0.018 * Math.cos(angle * 5) *
      (0.35 + 0.65 * Math.sqrt(Math.max(0, 1 - Math.cos(angle * angle))));

    apple_bodyPosition.setXYZ(
      i,
      ox * lobe,
      oy,
      oz * lobe * 0.96
    );

    const fineMottle =
      Math.sin(angle * 17 + oy * 13) *
      Math.sin(angle * 9 - oy * 19);
    const broadMottle = Math.sin(angle * 5 + oy * 4);
    const colorMix = clamp(
      0.70 + fineMottle * 0.10 + broadMottle * 0.06,
      0.28,
      0.94
    );

    apple_temp_color.copy(apple_dark_color).lerp(
      apple_light_color,
      colorMix
    );

    const greenStripe =
      Math.pow(Math.max(0, -Math.sin(angle)), 4) *
      Math.exp(-Math.pow((oy - 0.57) / 0.16, 2));
    apple_temp_color.lerp(
      apple_green_color,
      clamp(greenStripe * 0.78, 0, 0.78)
    );

    const goldStripe =
      Math.pow(Math.max(0, Math.cos(angle)), 6) *
      Math.exp(-Math.pow((oy - 0.59) / 0.14, 2));
    apple_temp_color.lerp(
      apple_gold_color,
      clamp(goldStripe * 0.68, 0, 0.68)
    );

    apple_bodyColors[i * 3] = apple_temp_color.r;
    apple_bodyColors[i * 3 + 1] = apple_temp_color.g;
    apple_bodyColors[i * 3 + 2] = apple_temp_color.b;
  }

  apple_bodyGeom.setAttribute(
    "color",
    new THREE.BufferAttribute(apple_bodyColors, 3)
  );
  apple_bodyGeom.computeVertexNormals();

  const apple_body = new THREE.Mesh(apple_bodyGeom, apple_bodyMat);
  apple.add(apple_body);

  const stem_wellMat = new THREE.MeshStandardMaterial({
    color: 0x4b251d,
    metalness: 0.0,
    roughness: 0.9
  });
  const stem_wellGeom = new THREE.TorusGeometry(0.052, 0.012, 8, 24);
  const stem_well = new THREE.Mesh(stem_wellGeom, stem_wellMat);
  stem_well.rotation.x = Math.PI / 2;
  stem_well.position.set(0.004, 0.496, 0.002);
  apple.add(stem_well);

  const surface_dummy = new THREE.Object3D();
  const surface_axis = new THREE.Vector3(0, 0, 1);

  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xf0cd76,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const skin_specklesGeom = new THREE.CircleGeometry(1, 8);
  const skin_speckle_count = 360;
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    skin_speckle_count
  );

  for (let i = 0; i < skin_speckle_count; i++) {
    const t = (i + 0.5) / skin_speckle_count;
    const y = -0.64 + t * 1.16;
    const angle = i * 2.3999632297 +
      Math.sin(i * 1.6180339887) * 0.28;
    const sample = appleSurfaceSample(y, angle);
    const size = 0.004 +
      (0.5 + 0.5 * Math.sin(i * 8.173 + 0.4)) * 0.007;
    const stretch = 0.68 +
      (0.5 + 0.5 * Math.sin(i * 3.719)) * 0.48;

    surface_dummy.position.copy(sample.position).addScaledVector(
      sample.normal,
      0.006
    );
    surface_dummy.quaternion.setFromUnitVectors(
      surface_axis,
      sample.normal
    );
    surface_dummy.rotateZ(i * 0.731);
    surface_dummy.scale.set(size * stretch, size, 1);
    surface_dummy.updateMatrix();
    skin_speckles.setMatrixAt(i, surface_dummy.matrix);
  }
  skin_speckles.instanceMatrix.needsUpdate = true;
  apple.add(skin_speckles);

  const skin_poresMat = new THREE.MeshStandardMaterial({
    color: 0x65071d,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const skin_poresGeom = new THREE.CircleGeometry(1, 7);
  const skin_pore_count = 120;
  const skin_pores = new THREE.InstancedMesh(
    skin_poresGeom,
    skin_poresMat,
    skin_pore_count
  );

  for (let i = 0; i < skin_pore_count; i++) {
    const t = (i + 0.5) / skin_pore_count;
    const y = -0.60 + t * 1.08;
    const angle = i * 2.173 +
      Math.sin(i * 0.937 + 1.2) * 0.35;
    const sample = appleSurfaceSample(y, angle);
    const size = 0.0025 +
      (0.5 + 0.5 * Math.sin(i * 5.327)) * 0.003;

    surface_dummy.position.copy(sample.position).addScaledVector(
      sample.normal,
      0.0065
    );
    surface_dummy.quaternion.setFromUnitVectors(
      surface_axis,
      sample.normal
    );
    surface_dummy.rotateZ(i * 1.113);
    surface_dummy.scale.set(size * 0.8, size, 1);
    surface_dummy.updateMatrix();
    skin_pores.setMatrixAt(i, surface_dummy.matrix);
  }
  skin_pores.instanceMatrix.needsUpdate = true;
  apple.add(skin_pores);

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x6d5130,
    metalness: 0.0,
    roughness: 0.9
  });
  const stem_darkMat = new THREE.MeshStandardMaterial({
    color: 0x3e2d1c,
    metalness: 0.0,
    roughness: 0.9
  });
  const stem_cutMat = new THREE.MeshStandardMaterial({
    color: 0xb49a5f,
    metalness: 0.0,
    roughness: 0.9
  });

  const stem = new THREE.Group();
  stem.position.set(0.002, 0.485, 0.002);
  stem.rotation.set(0.035, 0, -0.22);
  apple.add(stem);

  const stem_lowerGeom = new THREE.CylinderGeometry(
    0.031,
    0.043,
    0.30,
    9
  );
  const stem_lower = new THREE.Mesh(stem_lowerGeom, stemMat);
  stem_lower.position.y = 0.15;
  stem.add(stem_lower);

  const stem_upperGeom = new THREE.CylinderGeometry(
    0.023,
    0.032,
    0.105,
    8
  );
  const stem_upper = new THREE.Mesh(stem_upperGeom, stemMat);
  stem_upper.position.y = 0.3525;
  stem.add(stem_upper);

  const stem_tipGeom = new THREE.CylinderGeometry(
    0.030,
    0.023,
    0.035,
    7
  );
  const stem_tip = new THREE.Mesh(stem_tipGeom, stem_darkMat);
  stem_tip.position.y = 0.4275;
  stem.add(stem_tip);

  const stem_cutGeom = new THREE.CylinderGeometry(
    0.026,
    0.027,
    0.006,
    8
  );
  const stem_cut = new THREE.Mesh(stem_cutGeom, stem_cutMat);
  stem_cut.position.y = 0.448;
  stem.add(stem_cut);

  const stem_bark_ridgesGeom = new THREE.CylinderGeometry(
    0.0035,
    0.0045,
    0.22,
    5
  );
  const stem_bark_ridges = new THREE.InstancedMesh(
    stem_bark_ridgesGeom,
    stem_darkMat,
    5
  );
  const ridge_dummy = new THREE.Object3D();

  for (let i = 0; i < 5; i++) {
    const angle = i / 5 * Math.PI * 2;
    ridge_dummy.position.set(
      Math.cos(angle) * 0.030,
      0.15 + Math.sin(i * 2.1) * 0.008,
      Math.sin(angle) * 0.030
    );
    ridge_dummy.rotation.set(0, 0, 0);
    ridge_dummy.scale.set(1, 0.88 + i * 0.025, 1);
    ridge_dummy.updateMatrix();
    stem_bark_ridges.setMatrixAt(i, ridge_dummy.matrix);
  }
  stem_bark_ridges.instanceMatrix.needsUpdate = true;
  stem.add(stem_bark_ridges);

  const stem_knotsGeom = new THREE.DodecahedronGeometry(0.010, 0);
  const stem_knots = new THREE.InstancedMesh(
    stem_knotsGeom,
    stem_darkMat,
    4
  );
  const knot_positions = [
    [-0.018, 0.085, 0.026],
    [0.024, 0.190, 0.021],
    [-0.014, 0.285, 0.025],
    [0.019, 0.370, 0.018]
  ];

  for (let i = 0; i < knot_positions.length; i++) {
    const p = knot_positions[i];
    ridge_dummy.position.set(p[0], p[1], p[2]);
    ridge_dummy.rotation.set(i * 0.7, i * 0.9, i * 0.53);
    ridge_dummy.scale.set(0.8, 1.2, 0.7);
    ridge_dummy.updateMatrix();
    stem_knots.setMatrixAt(i, ridge_dummy.matrix);
  }
  stem_knots.instanceMatrix.needsUpdate = true;
  stem.add(stem_knots);

  const stem_fragmentsGeom = new THREE.DodecahedronGeometry(0.014, 0);
  const stem_fragments = new THREE.InstancedMesh(
    stem_fragmentsGeom,
    stem_cutMat,
    3
  );
  const fragment_positions = [
    [-0.014, 0.445, 0.004],
    [0.012, 0.449, -0.006],
    [0.001, 0.454, 0.013]
  ];

  for (let i = 0; i < fragment_positions.length; i++) {
    const p = fragment_positions[i];
    ridge_dummy.position.set(p[0], p[1], p[2]);
    ridge_dummy.rotation.set(i * 0.81, i * 1.07, i * 0.49);
    ridge_dummy.scale.set(0.8, 0.65, 0.75);
    ridge_dummy.updateMatrix();
    stem_fragments.setMatrixAt(i, ridge_dummy.matrix);
  }
  stem_fragments.instanceMatrix.needsUpdate = true;
  stem.add(stem_fragments);

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