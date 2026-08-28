export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "pear";

  const pear_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb7df65,
    metalness: 0.0,
    roughness: 0.3,
    vertexColors: true,
    emissive: 0x26330f,
    emissiveIntensity: 0.18,
  });

  const skin_specklesMat = new THREE.MeshStandardMaterial({
    color: 0xdce9a7,
    metalness: 0.0,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });

  const dark_specklesMat = new THREE.MeshStandardMaterial({
    color: 0x465020,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x70803a,
    metalness: 0.0,
    roughness: 0.9,
    emissive: 0x171b08,
    emissiveIntensity: 0.12,
  });

  const stem_ridgeMat = new THREE.MeshStandardMaterial({
    color: 0x4b5725,
    metalness: 0.0,
    roughness: 0.9,
  });

  const stem_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x9aa052,
    metalness: 0.0,
    roughness: 0.9,
  });

  const stem_cutMat = new THREE.MeshStandardMaterial({
    color: 0x665037,
    metalness: 0.0,
    roughness: 0.9,
  });

  const stem_cut_centerMat = new THREE.MeshStandardMaterial({
    color: 0x3e3022,
    metalness: 0.0,
    roughness: 0.9,
  });

  const pear_profileCurve = new THREE.CurvePath();
  pear_profileCurve.add(
    new THREE.LineCurve(
      new THREE.Vector2(0.0, -1.08),
      new THREE.Vector2(0.20, -1.08)
    )
  );
  pear_profileCurve.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(0.20, -1.08),
      new THREE.Vector2(0.55, -1.08),
      new THREE.Vector2(0.82, -0.87),
      new THREE.Vector2(0.84, -0.48)
    )
  );
  pear_profileCurve.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(0.84, -0.48),
      new THREE.Vector2(0.86, -0.15),
      new THREE.Vector2(0.76, 0.18),
      new THREE.Vector2(0.62, 0.48)
    )
  );
  pear_profileCurve.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(0.62, 0.48),
      new THREE.Vector2(0.51, 0.72),
      new THREE.Vector2(0.38, 0.98),
      new THREE.Vector2(0.25, 1.10)
    )
  );
  pear_profileCurve.add(
    new THREE.CubicBezierCurve(
      new THREE.Vector2(0.25, 1.10),
      new THREE.Vector2(0.18, 1.17),
      new THREE.Vector2(0.08, 1.18),
      new THREE.Vector2(0.0, 1.14)
    )
  );

  const pear_profile = pear_profileCurve.getSpacedPoints(72);
  const pear_bodyGeom = new THREE.LatheGeometry(pear_profile, 96);
  const pear_positions = pear_bodyGeom.attributes.position;
  const pear_colors = new Float32Array(pear_positions.count * 3);

  for (let i = 0; i < pear_positions.count; i++) {
    let x = pear_positions.getX(i);
    const y = pear_positions.getY(i);
    let z = pear_positions.getZ(i);
    const radius = Math.sqrt(x * x + z * z);
    const angle = radius > 0.00001 ? Math.atan2(z, x) : 0;

    if (radius > 0.00001) {
      const organic_factor =
        1 +
        0.007 * Math.sin(angle * 3 + y * 2.1) +
        0.004 * Math.sin(angle * 7 - y * 1.7);
      x *= organic_factor;
      z *= organic_factor;
      pear_positions.setXYZ(i, x, y, z);
    }

    const broad_tone =
      0.94 +
      0.055 * Math.sin(angle * 2.2 + y * 2.7) +
      0.025 * Math.sin(angle * 5.1 - y * 3.4);
    const fine_tone =
      0.985 + 0.015 * Math.sin(angle * 17.0 + y * 31.0);
    const tone = broad_tone * fine_tone;

    pear_colors[i * 3] = tone * 0.98;
    pear_colors[i * 3 + 1] = tone;
    pear_colors[i * 3 + 2] = tone * 0.94;
  }

  pear_positions.needsUpdate = true;
  pear_bodyGeom.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(pear_colors, 3)
  );
  pear_bodyGeom.computeVertexNormals();

  const pear_body = new THREE.Mesh(pear_bodyGeom, pear_bodyMat);
  pear_body.name = "pear_body";
  root.add(pear_body);

  function pearRadiusAt(y) {
    if (y <= pear_profile[0].y) return pear_profile[0].x;
    for (let i = 1; i < pear_profile.length; i++) {
      const lower = pear_profile[i - 1];
      const upper = pear_profile[i];
      if (y <= upper.y) {
        const span = upper.y - lower.y;
        const t = span > 0 ? (y - lower.y) / span : 0;
        return lower.x + (upper.x - lower.x) * t;
      }
    }
    return pear_profile[pear_profile.length - 1].x;
  }

  function pearRadiusSlopeAt(y) {
    const step = 0.008;
    return (
      (pearRadiusAt(y + step) - pearRadiusAt(y - step)) /
      (step * 2)
    );
  }

  const skin_specklesGeom = new THREE.CircleGeometry(0.012, 8);
  const skin_speckle_count = 1100;
  const skin_speckles = new THREE.InstancedMesh(
    skin_specklesGeom,
    skin_specklesMat,
    skin_speckle_count
  );
  skin_speckles.name = "skin_speckles";

  const speckle_matrix = new THREE.Matrix4();
  const speckle_position = new THREE.Vector3();
  const speckle_normal = new THREE.Vector3();
  const speckle_scale = new THREE.Vector3();
  const speckle_quaternion = new THREE.Quaternion();
  const disc_forward = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < skin_speckle_count; i++) {
    const fraction = (i + 0.5) / skin_speckle_count;
    const y =
      -1.015 +
      fraction * 2.105 +
      Math.sin(i * 1.73) * 0.006;
    const angle =
      i * 2.399963229728653 +
      Math.sin(i * 0.61) * 0.16;
    const radius = pearRadiusAt(y);
    const slope = pearRadiusSlopeAt(y);
    const organic_factor =
      1 +
      0.007 * Math.sin(angle * 3 + y * 2.1) +
      0.004 * Math.sin(angle * 7 - y * 1.7);

    speckle_normal
      .set(
        Math.cos(angle),
        -slope,
        Math.sin(angle)
      )
      .normalize();

    speckle_position
      .set(
        Math.cos(angle) * radius * organic_factor,
        y,
        Math.sin(angle) * radius * organic_factor
      )
      .addScaledVector(speckle_normal, 0.0045);

    speckle_quaternion.setFromUnitVectors(
      disc_forward,
      speckle_normal
    );

    const size_variation = ((i * 37) % 19) / 18;
    const shape_variation = ((i * 23) % 13) / 12;
    const scale = 0.28 + size_variation * 0.72;
    speckle_scale.set(
      scale * (0.72 + shape_variation * 0.32),
      scale,
      1
    );

    speckle_matrix.compose(
      speckle_position,
      speckle_quaternion,
      speckle_scale
    );
    skin_speckles.setMatrixAt(i, speckle_matrix);
  }

  skin_speckles.instanceMatrix.needsUpdate = true;
  root.add(skin_speckles);

  const dark_specklesGeom = new THREE.CircleGeometry(0.008, 7);
  const dark_speckle_count = 18;
  const dark_speckles = new THREE.InstancedMesh(
    dark_specklesGeom,
    dark_specklesMat,
    dark_speckle_count
  );
  dark_speckles.name = "dark_speckles";

  for (let i = 0; i < dark_speckle_count; i++) {
    const fraction = (((i * 7) % 17) + 0.5) / 17;
    const y = -0.88 + fraction * 1.62;
    const angle = 0.42 + i * 2.399963229728653;
    const radius = pearRadiusAt(y);
    const slope = pearRadiusSlopeAt(y);
    const organic_factor =
      1 +
      0.007 * Math.sin(angle * 3 + y * 2.1) +
      0.004 * Math.sin(angle * 7 - y * 1.7);

    speckle_normal
      .set(
        Math.cos(angle),
        -slope,
        Math.sin(angle)
      )
      .normalize();

    speckle_position
      .set(
        Math.cos(angle) * radius * organic_factor,
        y,
        Math.sin(angle) * radius * organic_factor
      )
      .addScaledVector(speckle_normal, 0.005);

    speckle_quaternion.setFromUnitVectors(
      disc_forward,
      speckle_normal
    );

    const scale = 0.45 + ((i * 5) % 9) / 12;
    speckle_scale.set(scale * 0.78, scale, 1);
    speckle_matrix.compose(
      speckle_position,
      speckle_quaternion,
      speckle_scale
    );
    dark_speckles.setMatrixAt(i, speckle_matrix);
  }

  dark_speckles.instanceMatrix.needsUpdate = true;
  root.add(dark_speckles);

  const stem = new THREE.Group();
  stem.name = "stem";
  root.add(stem);

  const stem_p0 = new THREE.Vector3(0.0, 1.09, 0.0);
  const stem_p1 = new THREE.Vector3(0.035, 1.25, -0.004);
  const stem_p2 = new THREE.Vector3(0.095, 1.40, 0.004);
  const stem_p3 = new THREE.Vector3(0.165, 1.53, 0.018);

  function alignCylinder(mesh, start, end) {
    const direction = new THREE.Vector3().subVectors(end, start);
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
  }

  const stem_baseGeom = new THREE.CylinderGeometry(
    0.066,
    0.086,
    stem_p0.distanceTo(stem_p1),
    12,
    2
  );
  const stem_base = new THREE.Mesh(stem_baseGeom, stemMat);
  stem_base.name = "stem_base";
  alignCylinder(stem_base, stem_p0, stem_p1);
  stem.add(stem_base);

  const stem_middleGeom = new THREE.CylinderGeometry(
    0.052,
    0.067,
    stem_p1.distanceTo(stem_p2),
    12,
    2
  );
  const stem_middle = new THREE.Mesh(stem_middleGeom, stemMat);
  stem_middle.name = "stem_middle";
  alignCylinder(stem_middle, stem_p1, stem_p2);
  stem.add(stem_middle);

  const stem_tipGeom = new THREE.CylinderGeometry(
    0.043,
    0.054,
    stem_p2.distanceTo(stem_p3),
    12,
    2
  );
  const stem_tip = new THREE.Mesh(stem_tipGeom, stemMat);
  stem_tip.name = "stem_tip";
  alignCylinder(stem_tip, stem_p2, stem_p3);
  stem.add(stem_tip);

  const stem_base_direction = new THREE.Vector3()
    .subVectors(stem_p1, stem_p0)
    .normalize();
  const stem_socketGeom = new THREE.TorusGeometry(
    0.066,
    0.012,
    8,
    24
  );
  const stem_socket = new THREE.Mesh(
    stem_socketGeom,
    stem_ridgeMat
  );
  stem_socket.name = "stem_socket";
  stem_socket.position
    .copy(stem_p0)
    .addScaledVector(stem_base_direction, 0.006);
  stem_socket.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    stem_base_direction
  );
  stem.add(stem_socket);

  const stem_ridge_points = [
    new THREE.Vector3(0.0, 1.12, 0.078),
    new THREE.Vector3(0.035, 1.25, 0.064),
    new THREE.Vector3(0.095, 1.40, 0.056),
    new THREE.Vector3(0.165, 1.525, 0.049),
  ];
  const stem_ridgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(stem_ridge_points),
    20,
    0.0055,
    6,
    false
  );
  const stem_ridge = new THREE.Mesh(
    stem_ridgeGeom,
    stem_ridgeMat
  );
  stem_ridge.name = "stem_ridge";
  stem.add(stem_ridge);

  const stem_highlight_points = [
    new THREE.Vector3(-0.026, 1.18, 0.069),
    new THREE.Vector3(0.009, 1.31, 0.059),
    new THREE.Vector3(0.069, 1.44, 0.052),
    new THREE.Vector3(0.141, 1.52, 0.046),
  ];
  const stem_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(stem_highlight_points),
    18,
    0.004,
    6,
    false
  );
  const stem_highlight = new THREE.Mesh(
    stem_highlightGeom,
    stem_highlightMat
  );
  stem_highlight.name = "stem_highlight";
  stem.add(stem_highlight);

  const stem_tip_direction = new THREE.Vector3()
    .subVectors(stem_p3, stem_p2)
    .normalize();

  const stem_cutGeom = new THREE.CylinderGeometry(
    0.052,
    0.052,
    0.014,
    14
  );
  const stem_cut = new THREE.Mesh(stem_cutGeom, stem_cutMat);
  stem_cut.name = "stem_cut";
  stem_cut.position
    .copy(stem_p3)
    .addScaledVector(stem_tip_direction, 0.007);
  stem_cut.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    stem_tip_direction
  );
  stem.add(stem_cut);

  const stem_cut_centerGeom = new THREE.CylinderGeometry(
    0.036,
    0.036,
    0.004,
    14
  );
  const stem_cut_center = new THREE.Mesh(
    stem_cut_centerGeom,
    stem_cut_centerMat
  );
  stem_cut_center.name = "stem_cut_center";
  stem_cut_center.position
    .copy(stem_p3)
    .addScaledVector(stem_tip_direction, 0.016);
  stem_cut_center.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    stem_tip_direction
  );
  stem.add(stem_cut_center);

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