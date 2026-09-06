export default function generate(THREE) {
  const root = new THREE.Group();
  const quill_assembly = new THREE.Group();
  quill_assembly.rotation.z = -0.38;
  root.add(quill_assembly);

  const handle = new THREE.Group();
  const feather = new THREE.Group();
  quill_assembly.add(handle, feather);

  const handle_shaftMat = new THREE.MeshStandardMaterial({
    color: 0xd7b276,
    metalness: 0.0,
    roughness: 0.6
  });
  const handle_grainMat = new THREE.MeshStandardMaterial({
    color: 0x8e622f,
    metalness: 0.0,
    roughness: 0.6
  });
  const handle_collarMat = new THREE.MeshStandardMaterial({
    color: 0x9b713d,
    metalness: 0.0,
    roughness: 0.6
  });
  const handle_ferruleMat = new THREE.MeshStandardMaterial({
    color: 0x4a2d1d,
    metalness: 0.0,
    roughness: 0.6
  });

  const left_vaneMat = new THREE.MeshStandardMaterial({
    color: 0x604331,
    metalness: 0.0,
    roughness: 0.95
  });
  const right_vaneMat = new THREE.MeshStandardMaterial({
    color: 0x4b3225,
    metalness: 0.0,
    roughness: 0.95
  });
  const barb_textureMat = new THREE.MeshStandardMaterial({
    color: 0x87684f,
    metalness: 0.0,
    roughness: 0.95
  });
  const vane_streaksMat = new THREE.MeshStandardMaterial({
    color: 0x2f211a,
    metalness: 0.0,
    roughness: 0.95
  });
  const base_tuftsMat = new THREE.MeshStandardMaterial({
    color: 0x6d5140,
    metalness: 0.0,
    roughness: 0.95
  });
  const rachisMat = new THREE.MeshStandardMaterial({
    color: 0x352219,
    metalness: 0.0,
    roughness: 0.6
  });
  const rachis_highlightMat = new THREE.MeshStandardMaterial({
    color: 0x76533c,
    metalness: 0.0,
    roughness: 0.6
  });

  const handle_shaftProfile = [
    new THREE.Vector2(0.000, -1.62),
    new THREE.Vector2(0.018, -1.57),
    new THREE.Vector2(0.034, -1.43),
    new THREE.Vector2(0.052, -1.18),
    new THREE.Vector2(0.071, -0.88),
    new THREE.Vector2(0.088, -0.55),
    new THREE.Vector2(0.098, -0.20),
    new THREE.Vector2(0.096, -0.08),
    new THREE.Vector2(0.000, -0.08)
  ];
  const handle_shaftGeom = new THREE.LatheGeometry(handle_shaftProfile, 28);
  const handle_shaft = new THREE.Mesh(handle_shaftGeom, handle_shaftMat);
  handle.add(handle_shaft);

  const writing_tipGeom = new THREE.ConeGeometry(0.020, 0.13, 18);
  const writing_tip = new THREE.Mesh(writing_tipGeom, handle_ferruleMat);
  writing_tip.rotation.z = Math.PI;
  writing_tip.position.y = -1.635;
  handle.add(writing_tip);

  const handle_collarGeom = new THREE.TorusGeometry(0.091, 0.006, 8, 28);
  const handle_collar = new THREE.Mesh(handle_collarGeom, handle_collarMat);
  handle_collar.rotation.x = Math.PI / 2;
  handle_collar.position.y = -0.57;
  handle.add(handle_collar);

  const handle_ferruleGeom = new THREE.CylinderGeometry(0.045, 0.096, 0.45, 24);
  const handle_ferrule = new THREE.Mesh(handle_ferruleGeom, handle_ferruleMat);
  handle_ferrule.position.y = 0.105;
  handle.add(handle_ferrule);

  const handle_grain = new THREE.Group();
  const grainBases = [-0.018, 0.012, 0.034];
  for (let i = 0; i < grainBases.length; i++) {
    const grainPoints = [];
    for (let j = 0; j <= 7; j++) {
      const y = -1.48 + j * 0.185;
      const radius = 0.024 + (y + 1.62) * 0.052;
      const x = grainBases[i] + Math.sin(j * 1.35 + i) * 0.004;
      const z = Math.sqrt(Math.max(radius * radius - x * x, 0.001)) + 0.002;
      grainPoints.push(new THREE.Vector3(x, y, z));
    }
    const grainGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(grainPoints),
      24,
      0.0025,
      5,
      false
    );
    const grain_line = new THREE.Mesh(grainGeom, handle_grainMat);
    handle_grain.add(grain_line);
  }
  handle.add(handle_grain);

  const leftShape = new THREE.Shape();
  leftShape.moveTo(-0.012, 0.22);
  leftShape.bezierCurveTo(-0.075, 0.29, -0.190, 0.55, -0.265, 0.88);
  leftShape.bezierCurveTo(-0.345, 1.22, -0.325, 1.61, -0.235, 1.94);
  leftShape.bezierCurveTo(-0.165, 2.20, -0.070, 2.48, 0.075, 2.66);
  leftShape.bezierCurveTo(0.020, 2.52, -0.005, 2.20, -0.020, 1.88);
  leftShape.bezierCurveTo(-0.035, 1.47, -0.030, 0.76, -0.012, 0.22);
  leftShape.closePath();

  const rightShape = new THREE.Shape();
  rightShape.moveTo(0.012, 0.22);
  rightShape.bezierCurveTo(0.060, 0.30, 0.175, 0.55, 0.270, 0.85);
  rightShape.bezierCurveTo(0.380, 1.18, 0.400, 1.55, 0.330, 1.88);
  rightShape.bezierCurveTo(0.270, 2.16, 0.160, 2.48, 0.075, 2.66);
  rightShape.bezierCurveTo(0.095, 2.30, 0.080, 1.80, 0.060, 1.42);
  rightShape.bezierCurveTo(0.040, 0.95, 0.025, 0.50, 0.012, 0.22);
  rightShape.closePath();

  const vaneOptions = {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.005,
    bevelSize: 0.006,
    bevelSegments: 2
  };
  const left_vaneGeom = new THREE.ExtrudeGeometry(leftShape, vaneOptions);
  const right_vaneGeom = new THREE.ExtrudeGeometry(rightShape, vaneOptions);
  left_vaneGeom.translate(0, 0, -0.013);
  right_vaneGeom.translate(0, 0, -0.013);

  const left_vane = new THREE.Mesh(left_vaneGeom, left_vaneMat);
  const right_vane = new THREE.Mesh(right_vaneGeom, right_vaneMat);
  feather.add(left_vane, right_vane);

  function leftVaneWidth(y) {
    const t = Math.max(0, Math.min(1, (y - 0.22) / 2.44));
    return 0.36 * Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.72);
  }

  function rightVaneWidth(y) {
    const t = Math.max(0, Math.min(1, (y - 0.22) / 2.44));
    return 0.40 * Math.pow(Math.max(0, Math.sin(Math.PI * t)), 0.72);
  }

  const barbCount = 56;
  const barb_textureGeom = new THREE.BoxGeometry(1, 0.007, 0.005);
  const barb_texture = new THREE.InstancedMesh(
    barb_textureGeom,
    barb_textureMat,
    barbCount * 2
  );
  const barbDummy = new THREE.Object3D();
  let barbIndex = 0;

  for (const side of [-1, 1]) {
    for (let i = 0; i < barbCount; i++) {
      const y = 0.38 + i * (2.13 / (barbCount - 1));
      const width = side < 0 ? leftVaneWidth(y) : rightVaneWidth(y);
      const length = width * (0.84 + (i % 4) * 0.018);
      const startX = side * 0.026;
      const endX = side * (0.026 + length);
      const centerX = (startX + endX) * 0.5;
      const angle = side < 0 ? 0.19 : -0.19;

      barbDummy.position.set(centerX, y, 0.021);
      barbDummy.rotation.set(0, 0, angle);
      barbDummy.scale.set(length, 1, 1);
      barbDummy.updateMatrix();
      barb_texture.setMatrixAt(barbIndex++, barbDummy.matrix);
    }
  }
  barb_texture.instanceMatrix.needsUpdate = true;
  feather.add(barb_texture);

  const streakData = [
    [-1, 0.53, 0.78],
    [-1, 0.82, 0.88],
    [-1, 1.12, 0.82],
    [-1, 1.48, 0.76],
    [-1, 1.86, 0.68],
    [-1, 2.20, 0.58],
    [1, 0.62, 0.76],
    [1, 0.96, 0.88],
    [1, 1.30, 0.82],
    [1, 1.67, 0.76],
    [1, 2.02, 0.68],
    [1, 2.34, 0.54]
  ];
  const vane_streaksGeom = new THREE.BoxGeometry(1, 0.011, 0.006);
  const vane_streaks = new THREE.InstancedMesh(
    vane_streaksGeom,
    vane_streaksMat,
    streakData.length
  );
  const streakDummy = new THREE.Object3D();

  for (let i = 0; i < streakData.length; i++) {
    const side = streakData[i][0];
    const y = streakData[i][1];
    const factor = streakData[i][2];
    const width = side < 0 ? leftVaneWidth(y) : rightVaneWidth(y);
    const length = width * factor;
    const startX = side * 0.035;
    const endX = side * (0.035 + length);

    streakDummy.position.set((startX + endX) * 0.5, y, 0.025);
    streakDummy.rotation.set(0, 0, side < 0 ? 0.24 : -0.24);
    streakDummy.scale.set(length, 1, 1);
    streakDummy.updateMatrix();
    vane_streaks.setMatrixAt(i, streakDummy.matrix);
  }
  vane_streaks.instanceMatrix.needsUpdate = true;
  feather.add(vane_streaks);

  const tuftCount = 16;
  const base_tuftsGeom = new THREE.CylinderGeometry(0.004, 0.004, 1, 6);
  const base_tufts = new THREE.InstancedMesh(
    base_tuftsGeom,
    base_tuftsMat,
    tuftCount
  );
  const tuftDummy = new THREE.Object3D();
  const up = new THREE.Vector3(0, 1, 0);

  for (let i = 0; i < tuftCount; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const start = new THREE.Vector3(
      side * 0.012,
      0.19 + (i % 3) * 0.018,
      ((i % 5) - 2) * 0.006
    );
    const end = new THREE.Vector3(
      side * (0.13 + (i % 5) * 0.035),
      0.12 + ((i * 3) % 8) * 0.052,
      ((i % 7) - 3) * 0.012
    );
    const direction = end.clone().sub(start);
    const length = direction.length();

    tuftDummy.position.copy(start).add(end).multiplyScalar(0.5);
    tuftDummy.quaternion.setFromUnitVectors(up, direction.normalize());
    tuftDummy.scale.set(1, length, 1);
    tuftDummy.updateMatrix();
    base_tufts.setMatrixAt(i, tuftDummy.matrix);
  }
  base_tufts.instanceMatrix.needsUpdate = true;
  feather.add(base_tufts);

  const lower_rachisGeom = new THREE.CylinderGeometry(0.024, 0.050, 0.72, 18);
  const lower_rachis = new THREE.Mesh(lower_rachisGeom, rachisMat);
  lower_rachis.position.set(0, 0.36, 0.050);
  feather.add(lower_rachis);

  const middle_rachisGeom = new THREE.CylinderGeometry(0.013, 0.026, 1.45, 18);
  const middle_rachis = new THREE.Mesh(middle_rachisGeom, rachisMat);
  middle_rachis.position.set(0.018, 1.315, 0.050);
  feather.add(middle_rachis);

  const upper_rachisGeom = new THREE.CylinderGeometry(0.0035, 0.014, 0.90, 16);
  const upper_rachis = new THREE.Mesh(upper_rachisGeom, rachisMat);
  upper_rachis.position.set(0.048, 2.21, 0.047);
  feather.add(upper_rachis);

  const rachisHighlightPoints = [
    new THREE.Vector3(-0.010, 0.08, 0.091),
    new THREE.Vector3(-0.012, 0.55, 0.080),
    new THREE.Vector3(-0.006, 1.10, 0.071),
    new THREE.Vector3(0.006, 1.65, 0.064),
    new THREE.Vector3(0.025, 2.12, 0.057),
    new THREE.Vector3(0.050, 2.53, 0.050)
  ];
  const rachis_highlightGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(rachisHighlightPoints),
    40,
    0.0035,
    6,
    false
  );
  const rachis_highlight = new THREE.Mesh(
    rachis_highlightGeom,
    rachis_highlightMat
  );
  feather.add(rachis_highlight);

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