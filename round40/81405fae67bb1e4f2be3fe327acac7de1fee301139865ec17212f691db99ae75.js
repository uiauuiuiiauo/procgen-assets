export default function generate(THREE) {
  const root = new THREE.Group();

  const plateMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f1,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const rice_moundMat = new THREE.MeshStandardMaterial({
    color: 0x98745f,
    metalness: 0.0,
    roughness: 0.7,
  });
  const rice_grains_lightMat = new THREE.MeshStandardMaterial({
    color: 0xc29b7e,
    metalness: 0.0,
    roughness: 0.65,
  });
  const rice_grains_mediumMat = new THREE.MeshStandardMaterial({
    color: 0x9d765f,
    metalness: 0.0,
    roughness: 0.68,
  });
  const rice_grains_darkMat = new THREE.MeshStandardMaterial({
    color: 0x765342,
    metalness: 0.0,
    roughness: 0.72,
  });
  const egg_crisp_edgeMat = new THREE.MeshStandardMaterial({
    color: 0xc9822d,
    metalness: 0.0,
    roughness: 0.7,
  });
  const egg_whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf2f1df,
    metalness: 0.0,
    roughness: 0.4,
  });
  const egg_bubblesMat = new THREE.MeshStandardMaterial({
    color: 0xcfcbb8,
    metalness: 0.0,
    roughness: 0.55,
  });
  const egg_yolkMat = new THREE.MeshStandardMaterial({
    color: 0xf28a00,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yolk_rimMat = new THREE.MeshStandardMaterial({
    color: 0xd95e00,
    metalness: 0.0,
    roughness: 0.35,
  });
  const yolk_highlightMat = new THREE.MeshStandardMaterial({
    color: 0xffc4a7,
    metalness: 0.0,
    roughness: 0.3,
  });
  const caramelized_onionsMat = new THREE.MeshStandardMaterial({
    color: 0xd98b25,
    metalness: 0.0,
    roughness: 0.5,
  });
  const dark_onionsMat = new THREE.MeshStandardMaterial({
    color: 0x9d4b18,
    metalness: 0.0,
    roughness: 0.6,
  });
  const green_vegetablesMat = new THREE.MeshStandardMaterial({
    color: 0x66833c,
    metalness: 0.0,
    roughness: 0.7,
  });
  const orange_vegetablesMat = new THREE.MeshStandardMaterial({
    color: 0xd97818,
    metalness: 0.0,
    roughness: 0.65,
  });

  const plate_profile = [
    new THREE.Vector2(0.00, -0.16),
    new THREE.Vector2(0.55, -0.18),
    new THREE.Vector2(1.20, -0.14),
    new THREE.Vector2(1.72, -0.02),
    new THREE.Vector2(2.10, 0.14),
    new THREE.Vector2(2.34, 0.30),
    new THREE.Vector2(2.45, 0.39),
    new THREE.Vector2(2.46, 0.44),
    new THREE.Vector2(2.40, 0.49),
    new THREE.Vector2(2.30, 0.49),
    new THREE.Vector2(2.10, 0.38),
    new THREE.Vector2(1.72, 0.22),
    new THREE.Vector2(1.10, 0.09),
    new THREE.Vector2(0.45, 0.035),
    new THREE.Vector2(0.00, 0.03),
  ];
  const plateGeom = new THREE.LatheGeometry(plate_profile, 64);
  const plate = new THREE.Mesh(plateGeom, plateMat);
  root.add(plate);

  const plate_rimGeom = new THREE.TorusGeometry(2.36, 0.045, 10, 64);
  const plate_rim = new THREE.Mesh(plate_rimGeom, plateMat);
  plate_rim.rotation.x = Math.PI / 2;
  plate_rim.position.y = 0.465;
  root.add(plate_rim);

  const rice_moundGeom = new THREE.SphereGeometry(1, 40, 20);
  const rice_mound = new THREE.Mesh(rice_moundGeom, rice_moundMat);
  rice_mound.position.set(-0.34, 0.29, -0.02);
  rice_mound.scale.set(1.62, 0.56, 1.40);
  root.add(rice_mound);

  const rice_grainGeom = new THREE.CapsuleGeometry(0.034, 0.12, 4, 8);
  const rice_grains_light = new THREE.InstancedMesh(
    rice_grainGeom,
    rice_grains_lightMat,
    160
  );
  const rice_grains_medium = new THREE.InstancedMesh(
    rice_grainGeom,
    rice_grains_mediumMat,
    160
  );
  const rice_grains_dark = new THREE.InstancedMesh(
    rice_grainGeom,
    rice_grains_darkMat,
    160
  );

  const grain_dummy = new THREE.Object3D();
  const grain_up = new THREE.Vector3(0, 1, 0);
  const grain_normal = new THREE.Vector3();
  const grain_direction = new THREE.Vector3();
  const grain_tangent = new THREE.Vector3();
  const grain_quaternion = new THREE.Quaternion();

  function populateRice(mesh, offset) {
    const count = 160;
    for (let i = 0; i < count; i++) {
      const k = i * 3 + offset;
      const u = (((k * 73) % 487) + 0.5) / 487;
      const v = (((k * 199) % 491) + 0.5) / 491;
      const radial = 0.99 * Math.sqrt(u);
      const angle = v * Math.PI * 2;
      const x = -0.34 + 1.59 * radial * Math.cos(angle);
      const z = -0.02 + 1.37 * radial * Math.sin(angle);
      const nx = (x + 0.34) / 1.59;
      const nz = (z + 0.02) / 1.37;
      const y = 0.29 + 0.53 * Math.sqrt(Math.max(0, 1 - radial * radial));

      grain_normal.set(
        nx / 1.59,
        Math.sqrt(Math.max(0.08, 1 - radial * radial)) / 0.53,
        nz / 1.37
      ).normalize();

      grain_direction.set(Math.cos(k * 2.173), 0, Math.sin(k * 2.173));
      grain_tangent.copy(grain_direction).addScaledVector(
        grain_normal,
        -grain_direction.dot(grain_normal)
      );
      if (grain_tangent.lengthSq() < 0.01) {
        grain_tangent.set(1, 0, 0);
      }
      grain_tangent.normalize();
      grain_quaternion.setFromUnitVectors(grain_up, grain_tangent);

      grain_dummy.position.set(x, y, z).addScaledVector(grain_normal, 0.035);
      grain_dummy.quaternion.copy(grain_quaternion);
      grain_dummy.rotateY((k % 11) * 0.29);
      const grain_scale = 0.88 + ((k * 17) % 13) * 0.022;
      grain_dummy.scale.set(
        grain_scale,
        grain_scale * (0.92 + (k % 5) * 0.025),
        grain_scale
      );
      grain_dummy.updateMatrix();
      mesh.setMatrixAt(i, grain_dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
  }

  populateRice(rice_grains_light, 0);
  populateRice(rice_grains_medium, 1);
  populateRice(rice_grains_dark, 2);
  root.add(rice_grains_light, rice_grains_medium, rice_grains_dark);

  const vegetable_pieceGeom = new THREE.BoxGeometry(0.11, 0.035, 0.065);
  const green_vegetables = new THREE.InstancedMesh(
    vegetable_pieceGeom,
    green_vegetablesMat,
    14
  );
  const orange_vegetables = new THREE.InstancedMesh(
    vegetable_pieceGeom,
    orange_vegetablesMat,
    12
  );
  const vegetable_dummy = new THREE.Object3D();

  function populateVegetables(mesh, count, phase) {
    for (let i = 0; i < count; i++) {
      const k = i + phase;
      const angle = k * 2.399;
      const radial = 0.28 + 0.67 * (((k * 29) % 31) / 31);
      const x = -0.34 + 1.50 * radial * Math.cos(angle);
      const z = -0.02 + 1.28 * radial * Math.sin(angle);
      const nx = (x + 0.34) / 1.50;
      const nz = (z + 0.02) / 1.28;
      const y = 0.29 + 0.50 * Math.sqrt(Math.max(0, 1 - radial * radial));
      vegetable_dummy.position.set(x, y + 0.07, z);
      vegetable_dummy.rotation.set(
        (k % 4) * 0.17,
        k * 1.31,
        (k % 5) * 0.13
      );
      const scale = 0.75 + (k % 6) * 0.1;
      vegetable_dummy.scale.set(scale, scale, scale);
      vegetable_dummy.updateMatrix();
      mesh.setMatrixAt(i, vegetable_dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.frustumCulled = false;
  }

  populateVegetables(green_vegetables, 14, 3);
  populateVegetables(orange_vegetables, 12, 17);
  root.add(green_vegetables, orange_vegetables);

  const egg = new THREE.Group();
  egg.position.set(0.74, 0.79, 0.32);
  egg.rotation.set(0.035, -0.10, -0.025);
  root.add(egg);

  function makeCrackPoints(rx, ry, baseY, phase, lift) {
    const points = [];
    const count = 52;
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      const f = 1
        + 0.045 * Math.sin(a * 5 + phase)
        + 0.025 * Math.sin(a * 9 + phase * 1.7)
        + 0.015 * Math.cos(a * 13);
      points.push(new THREE.Vector3(
        rx * f * Math.cos(a),
        baseY + lift * (0.5 + 0.5 * Math.sin(a * 7 + phase)),
        ry * f * Math.sin(a)
      ));
    }
    return points;
  }

  const egg_crisp_edgePoints = makeCrackPoints(1.16, 0.92, 0.005, 0.4, 0.012);
  const egg_crisp_edgeCurve = new THREE.CatmullRomCurve3(
    egg_crisp_edgePoints,
    true,
    "centripetal"
  );
  const egg_crisp_edgeGeom = new THREE.TubeGeometry(
    egg_crisp_edgeCurve,
    84,
    0.028,
    7,
    true
  );
  const egg_crisp_edge = new THREE.Mesh(
    egg_crisp_edgeGeom,
    egg_crisp_edgeMat
  );
  egg.add(egg_crisp_edge);

  const egg_whiteShape = new THREE.Shape();
  const egg_whiteOutline = [
    [-1.08, -0.10],
    [-0.98, -0.48],
    [-0.73, -0.76],
    [-0.35, -0.90],
    [0.05, -0.86],
    [0.43, -0.88],
    [0.78, -0.69],
    [1.03, -0.38],
    [1.10, -0.04],
    [1.02, 0.28],
    [0.84, 0.58],
    [0.52, 0.80],
    [0.15, 0.88],
    [-0.20, 0.84],
    [-0.55, 0.75],
    [-0.85, 0.56],
    [-1.03, 0.28],
  ];
  egg_whiteShape.moveTo(egg_whiteOutline[0][0], egg_whiteOutline[0][1]);
  for (let i = 1; i < egg_whiteOutline.length; i++) {
    egg_whiteShape.lineTo(egg_whiteOutline[i][0], egg_whiteOutline[i][1]);
  }
  egg_whiteShape.closePath();

  const egg_whiteGeom = new THREE.ExtrudeGeometry(egg_whiteShape, {
    depth: 0.055,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  const egg_white = new THREE.Mesh(egg_whiteGeom, egg_whiteMat);
  egg_white.rotation.x = -Math.PI / 2;
  egg.add(egg_white);

  const egg_white_ridgePoints = makeCrackPoints(1.04, 0.81, 0.075, 1.2, 0.014);
  const egg_white_ridgeCurve = new THREE.CatmullRomCurve3(
    egg_white_ridgePoints,
    true,
    "centripetal"
  );
  const egg_white_ridgeGeom = new THREE.TubeGeometry(
    egg_white_ridgeCurve,
    80,
    0.052,
    8,
    true
  );
  const egg_white_ridge = new THREE.Mesh(egg_white_ridgeGeom, egg_whiteMat);
  egg.add(egg_white_ridge);

  const egg_bubblesGeom = new THREE.SphereGeometry(1, 12, 8);
  const egg_bubbles = new THREE.InstancedMesh(
    egg_bubblesGeom,
    egg_bubblesMat,
    18
  );
  const bubble_dummy = new THREE.Object3D();
  for (let i = 0; i < 18; i++) {
    const a = i / 18 * Math.PI * 2 + 0.12 * Math.sin(i * 1.7);
    const inset = 0.90 + 0.05 * Math.sin(i * 2.3);
    bubble_dummy.position.set(
      1.04 * inset * Math.cos(a),
      0.112 + 0.008 * Math.sin(i * 1.9),
      0.81 * inset * Math.sin(a)
    );
    bubble_dummy.rotation.set(0, a, 0);
    const s = 0.025 + (i % 4) * 0.008;
    bubble_dummy.scale.set(s * 1.3, s * 0.35, s);
    bubble_dummy.updateMatrix();
    egg_bubbles.setMatrixAt(i, bubble_dummy.matrix);
  }
  egg_bubbles.instanceMatrix.needsUpdate = true;
  egg_bubbles.frustumCulled = false;
  egg.add(egg_bubbles);

  const egg_yolkGeom = new THREE.SphereGeometry(
    1,
    36,
    18,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const egg_yolk = new THREE.Mesh(egg_yolkGeom, egg_yolkMat);
  egg_yolk.position.set(0.13, 0.095, 0.03);
  egg_yolk.scale.set(0.52, 0.31, 0.47);
  egg.add(egg_yolk);

  const yolk_rimGeom = new THREE.TorusGeometry(0.43, 0.025, 8, 40);
  const yolk_rim = new THREE.Mesh(yolk_rimGeom, yolk_rimMat);
  yolk_rim.rotation.x = Math.PI / 2;
  yolk_rim.position.set(0.13, 0.105, 0.03);
  yolk_rim.scale.set(1.12, 1.0, 1.08);
  egg.add(yolk_rim);

  const yolk_highlightGeom = new THREE.SphereGeometry(1, 16, 8);
  const yolk_highlight = new THREE.Mesh(yolk_highlightGeom, yolk_highlightMat);
  yolk_highlight.position.set(-0.02, 0.385, 0.13);
  yolk_highlight.rotation.y = -0.35;
  yolk_highlight.scale.set(0.105, 0.018, 0.19);
  egg.add(yolk_highlight);

  const caramelized_onions = new THREE.Group();
  root.add(caramelized_onions);

  const onion_paths = [
    [
      [-1.30, 0.86, -0.20], [-1.02, 1.00, -0.38],
      [-0.62, 1.06, -0.28], [-0.25, 0.98, 0.02],
    ],
    [
      [-1.22, 0.90, 0.18], [-0.92, 1.08, 0.02],
      [-0.55, 1.12, 0.18], [-0.18, 0.98, 0.32],
    ],
    [
      [-1.10, 0.94, -0.55], [-0.78, 1.10, -0.40],
      [-0.40, 1.13, -0.55], [0.02, 0.98, -0.48],
    ],
    [
      [-1.34, 0.83, -0.02], [-1.08, 1.04, 0.32],
      [-0.72, 1.10, 0.42], [-0.34, 0.98, 0.28],
    ],
    [
      [-0.92, 0.96, -0.72], [-0.60, 1.10, -0.55],
      [-0.20, 1.13, -0.62], [0.22, 0.96, -0.42],
    ],
    [
      [-1.34, 0.82, 0.42], [-1.02, 1.00, 0.62],
      [-0.62, 1.06, 0.58], [-0.18, 0.94, 0.42],
    ],
    [
      [-0.72, 0.98, -0.12], [-0.45, 1.13, 0.10],
      [-0.10, 1.12, 0.02], [0.30, 0.96, -0.18],
    ],
    [
      [-1.18, 0.89, -0.35], [-0.90, 1.08, -0.05],
      [-0.52, 1.14, -0.10], [-0.12, 1.00, -0.32],
    ],
    [
      [-0.55, 0.96, 0.62], [-0.25, 1.10, 0.50],
      [0.05, 1.10, 0.62], [0.38, 0.94, 0.52],
    ],
  ];

  for (let i = 0; i < onion_paths.length; i++) {
    const points = onion_paths[i].map(
      (p) => new THREE.Vector3(p[0], p[1], p[2])
    );
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const strandGeom = new THREE.TubeGeometry(
      curve,
      24,
      i % 3 === 0 ? 0.024 : 0.019,
      6,
      false
    );
    const strand = new THREE.Mesh(
      strandGeom,
      i % 3 === 0 ? dark_onionsMat : caramelized_onionsMat
    );
    caramelized_onions.add(strand);
  }

  const onion_curlGeom = new THREE.TorusGeometry(
    0.22,
    0.018,
    6,
    28,
    Math.PI * 1.65
  );
  const onion_curl_1 = new THREE.Mesh(onion_curlGeom, caramelized_onionsMat);
  onion_curl_1.position.set(-0.76, 1.08, 0.02);
  onion_curl_1.rotation.set(1.15, 0.35, 0.40);
  onion_curl_1.scale.set(1.25, 0.72, 1);
  caramelized_onions.add(onion_curl_1);

  const onion_curl_2 = new THREE.Mesh(onion_curlGeom, dark_onionsMat);
  onion_curl_2.position.set(-0.48, 1.10, -0.34);
  onion_curl_2.rotation.set(1.25, -0.45, -0.55);
  onion_curl_2.scale.set(0.92, 0.62, 1);
  caramelized_onions.add(onion_curl_2);

  const onion_curl_3 = new THREE.Mesh(onion_curlGeom, caramelized_onionsMat);
  onion_curl_3.position.set(-1.02, 1.02, 0.42);
  onion_curl_3.rotation.set(1.05, 0.70, 0.20);
  onion_curl_3.scale.set(1.10, 0.68, 1);
  caramelized_onions.add(onion_curl_3);

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