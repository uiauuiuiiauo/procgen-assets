export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "antique_bell";

  const bell_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.2,
  });

  const dark_bronzeMat = new THREE.MeshStandardMaterial({
    color: 0x332820,
    metalness: 0.5,
    roughness: 0.45,
  });

  const bell_bodyProfile = [
    new THREE.Vector2(0.700, 0.000),
    new THREE.Vector2(0.750, 0.012),
    new THREE.Vector2(0.790, 0.050),
    new THREE.Vector2(0.810, 0.100),
    new THREE.Vector2(0.815, 0.160),
    new THREE.Vector2(0.800, 0.220),
    new THREE.Vector2(0.760, 0.290),
    new THREE.Vector2(0.700, 0.360),
    new THREE.Vector2(0.640, 0.430),
    new THREE.Vector2(0.590, 0.520),
    new THREE.Vector2(0.540, 0.640),
    new THREE.Vector2(0.500, 0.780),
    new THREE.Vector2(0.460, 0.940),
    new THREE.Vector2(0.430, 1.120),
    new THREE.Vector2(0.415, 1.300),
    new THREE.Vector2(0.405, 1.400),
    new THREE.Vector2(0.380, 1.460),
    new THREE.Vector2(0.320, 1.500),
    new THREE.Vector2(0.240, 1.520),
    new THREE.Vector2(0.120, 1.530),
    new THREE.Vector2(0.000, 1.530),
  ];
  const bell_bodyGeom = new THREE.LatheGeometry(bell_bodyProfile, 64);
  const bell_body = new THREE.Mesh(bell_bodyGeom, bell_bodyMat);
  bell_body.name = "bell_body";
  root.add(bell_body);

  const base_rimMat = bell_bodyMat;
  const base_rimGeom = new THREE.TorusGeometry(0.770, 0.025, 12, 64);
  const base_rim = new THREE.Mesh(base_rimGeom, base_rimMat);
  base_rim.name = "base_rim";
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.055;
  root.add(base_rim);

  const lower_grooveMat = dark_bronzeMat;
  const lower_grooveGeom = new THREE.TorusGeometry(0.720, 0.010, 8, 64);
  const lower_groove = new THREE.Mesh(lower_grooveGeom, lower_grooveMat);
  lower_groove.name = "lower_groove";
  lower_groove.rotation.x = Math.PI / 2;
  lower_groove.position.y = 0.325;
  root.add(lower_groove);

  const upper_grooveMat = dark_bronzeMat;
  const upper_grooveGeom = new THREE.TorusGeometry(0.675, 0.009, 8, 64);
  const upper_groove = new THREE.Mesh(upper_grooveGeom, upper_grooveMat);
  upper_groove.name = "upper_groove";
  upper_groove.rotation.x = Math.PI / 2;
  upper_groove.position.y = 0.365;
  root.add(upper_groove);

  const loop_mountMat = dark_bronzeMat;
  const loop_mountGeom = new THREE.SphereGeometry(1, 32, 16);
  const loop_mount = new THREE.Mesh(loop_mountGeom, loop_mountMat);
  loop_mount.name = "loop_mount";
  loop_mount.position.set(0, 1.535, -0.018);
  loop_mount.scale.set(0.235, 0.065, 0.120);
  root.add(loop_mount);

  const loop_mount_trimMat = bell_bodyMat;
  const loop_mount_trimGeom = new THREE.TorusGeometry(0.165, 0.018, 8, 40);
  const loop_mount_trim = new THREE.Mesh(loop_mount_trimGeom, loop_mount_trimMat);
  loop_mount_trim.name = "loop_mount_trim";
  loop_mount_trim.rotation.x = Math.PI / 2;
  loop_mount_trim.position.set(0, 1.535, -0.005);
  loop_mount_trim.scale.set(1.1, 0.65, 1);
  root.add(loop_mount_trim);

  const hanging_loopShape = new THREE.Shape();
  hanging_loopShape.moveTo(0.000, 1.490);
  hanging_loopShape.bezierCurveTo(0.120, 1.490, 0.180, 1.550, 0.200, 1.680);
  hanging_loopShape.bezierCurveTo(0.230, 1.840, 0.130, 1.950, 0.000, 1.960);
  hanging_loopShape.bezierCurveTo(-0.130, 1.950, -0.230, 1.840, -0.200, 1.680);
  hanging_loopShape.bezierCurveTo(-0.180, 1.550, -0.120, 1.490, 0.000, 1.490);

  const hanging_loopHole = new THREE.Path();
  hanging_loopHole.absellipse(0, 1.750, 0.108, 0.108, 0, Math.PI * 2, false);
  hanging_loopShape.holes.push(hanging_loopHole);

  const hanging_loopMat = dark_bronzeMat;
  const hanging_loopGeom = new THREE.ExtrudeGeometry(hanging_loopShape, {
    depth: 0.09,
    steps: 1,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.018,
    bevelSize: 0.014,
    bevelSegments: 3,
  });
  const hanging_loop = new THREE.Mesh(hanging_loopGeom, hanging_loopMat);
  hanging_loop.name = "hanging_loop";
  hanging_loop.position.z = -0.045;
  root.add(hanging_loop);

  const loop_faceShape = new THREE.Shape();
  loop_faceShape.moveTo(0.000, 1.505);
  loop_faceShape.bezierCurveTo(0.105, 1.505, 0.160, 1.560, 0.180, 1.680);
  loop_faceShape.bezierCurveTo(0.205, 1.820, 0.115, 1.925, 0.000, 1.935);
  loop_faceShape.bezierCurveTo(-0.115, 1.925, -0.205, 1.820, -0.180, 1.680);
  loop_faceShape.bezierCurveTo(-0.160, 1.560, -0.105, 1.505, 0.000, 1.505);

  const loop_faceHole = new THREE.Path();
  loop_faceHole.absellipse(0, 1.750, 0.108, 0.108, 0, Math.PI * 2, false);
  loop_faceShape.holes.push(loop_faceHole);

  const loop_faceMat = bell_bodyMat;
  const loop_faceGeom = new THREE.ShapeGeometry(loop_faceShape, 32);
  const loop_face = new THREE.Mesh(loop_faceGeom, loop_faceMat);
  loop_face.name = "loop_face";
  loop_face.position.z = 0.065;
  root.add(loop_face);

  function skirtRadiusAt(y) {
    if (y <= 0.16) return 0.815;
    if (y <= 0.22) return 0.815 - (y - 0.16) * (0.015 / 0.06);
    if (y <= 0.29) return 0.800 - (y - 0.22) * (0.040 / 0.07);
    return 0.760 - (y - 0.29) * (0.060 / 0.07);
  }

  function glyphPoint(centerAngle, localX, y) {
    const radius = skirtRadiusAt(y) + 0.007;
    const angle = centerAngle - localX / radius;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
  }

  function addGlyphStroke(parent, centerAngle, x1, y1, x2, y2) {
    const points = [];
    for (let i = 0; i <= 4; i++) {
      const t = i / 4;
      const x = x1 + (x2 - x1) * t;
      const y = y1 + (y2 - y1) * t;
      points.push(glyphPoint(centerAngle, x, y));
    }
    const glyph_strokeCurve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    const glyph_strokeGeom = new THREE.TubeGeometry(
      glyph_strokeCurve,
      8,
      0.008,
      6,
      false
    );
    const glyph_stroke = new THREE.Mesh(glyph_strokeGeom, dark_bronzeMat);
    parent.add(glyph_stroke);
  }

  function makeGlyphBuilder(strokes) {
    return function addGlyph(parent, centerAngle) {
      for (const stroke of strokes) {
        addGlyphStroke(
          parent,
          centerAngle,
          stroke[0],
          stroke[1],
          stroke[2],
          stroke[3]
        );
      }
    };
  }

  const glyph_y = makeGlyphBuilder([
    [-0.055, 0.305, 0.000, 0.235],
    [0.055, 0.305, 0.000, 0.235],
    [0.000, 0.235, 0.000, 0.145],
  ]);

  const glyph_h = makeGlyphBuilder([
    [-0.050, 0.145, -0.050, 0.305],
    [0.050, 0.145, 0.050, 0.305],
    [-0.050, 0.225, 0.050, 0.225],
  ]);

  const glyph_i = makeGlyphBuilder([
    [-0.045, 0.305, 0.045, 0.305],
    [0.000, 0.305, 0.000, 0.145],
    [-0.045, 0.145, 0.045, 0.145],
  ]);

  const glyph_v = makeGlyphBuilder([
    [-0.055, 0.305, 0.000, 0.145],
    [0.000, 0.145, 0.055, 0.305],
  ]);

  const glyph_m = makeGlyphBuilder([
    [-0.060, 0.145, -0.060, 0.305],
    [-0.060, 0.305, 0.000, 0.215],
    [0.000, 0.215, 0.060, 0.305],
    [0.060, 0.305, 0.060, 0.145],
  ]);

  const engraved_inscription = new THREE.Group();
  engraved_inscription.name = "engraved_inscription";
  root.add(engraved_inscription);

  const inscription_styles = [
    glyph_y,
    glyph_h,
    glyph_i,
    glyph_v,
    glyph_i,
    glyph_m,
    glyph_i,
  ];
  const inscription_angles = [
    Math.PI / 2 + 0.92,
    Math.PI / 2 + 0.61,
    Math.PI / 2 + 0.305,
    Math.PI / 2,
    Math.PI / 2 - 0.305,
    Math.PI / 2 - 0.61,
    Math.PI / 2 - 0.92,
  ];

  for (let i = 0; i < inscription_styles.length; i++) {
    inscription_styles[i](engraved_inscription, inscription_angles[i]);
  }

  function fitToUnitCube(rootObject) {
    const box = new THREE.Box3().setFromObject(rootObject);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 0.95 / maxDim;
    rootObject.scale.setScalar(scale);
    rootObject.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
  }

  fitToUnitCube(root);
  return root;
}