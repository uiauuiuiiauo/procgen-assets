export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "handheld_electronic_device";

  const length = 3.4;
  const width = 0.86;
  const upperWidth = 0.82;
  const upperLength = 3.34;
  const upperHeight = 0.25;
  const upperCenterY = 0.17;
  const lowerWidth = 0.80;
  const lowerLength = 3.28;
  const lowerHeight = 0.20;
  const lowerCenterY = -0.13;

  function roundedRectShape(w, h, r) {
    const shape = new THREE.Shape();
    const x0 = -w / 2;
    const x1 = w / 2;
    const y0 = -h / 2;
    const y1 = h / 2;
    shape.moveTo(x0 + r, y0);
    shape.lineTo(x1 - r, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + r);
    shape.lineTo(x1, y1 - r);
    shape.quadraticCurveTo(x1, y1, x1 - r, y1);
    shape.lineTo(x0 + r, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - r);
    shape.lineTo(x0, y0 + r);
    shape.quadraticCurveTo(x0, y0, x0 + r, y0);
    return shape;
  }

  function roundedPrismGeometry(w, l, h, r, bevel) {
    const geom = new THREE.ExtrudeGeometry(roundedRectShape(w, l, r), {
      depth: h,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4
    });
    geom.translate(0, 0, -h / 2);
    geom.rotateX(-Math.PI / 2);
    return geom;
  }

  function roundedLoopPoints(w, l, r, y, steps) {
    const points = [];
    const corners = [
      [w / 2 - r, l / 2 - r, 0],
      [-w / 2 + r, l / 2 - r, Math.PI / 2],
      [-w / 2 + r, -l / 2 + r, Math.PI],
      [w / 2 - r, -l / 2 + r, Math.PI * 1.5]
    ];
    for (let c = 0; c < corners.length; c++) {
      const corner = corners[c];
      for (let i = 0; i <= steps; i++) {
        const angle = corner[2] + (i / steps) * Math.PI / 2;
        points.push(new THREE.Vector3(
          corner[0] + Math.cos(angle) * r,
          y,
          corner[1] + Math.sin(angle) * r
        ));
      }
    }
    return points;
  }

  const upper_shellMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const upper_shellGeom = roundedPrismGeometry(
    upperWidth,
    upperLength,
    upperHeight,
    0.30,
    0.04
  );
  const upper_shell = new THREE.Mesh(upper_shellGeom, upper_shellMat);
  upper_shell.name = "upper_shell";
  upper_shell.position.y = upperCenterY;
  root.add(upper_shell);

  const lower_shellMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const lower_shellGeom = roundedPrismGeometry(
    lowerWidth,
    lowerLength,
    lowerHeight,
    0.29,
    0.035
  );
  const lower_shell = new THREE.Mesh(lower_shellGeom, lower_shellMat);
  lower_shell.name = "lower_shell";
  lower_shell.position.y = lowerCenterY;
  root.add(lower_shell);

  const seam_gasketMat = new THREE.MeshStandardMaterial({
    color: 0x171b20,
    metalness: 0.0,
    roughness: 0.8
  });
  const seam_gasketGeom = roundedPrismGeometry(0.85, 3.36, 0.025, 0.30, 0.008);
  const seam_gasket = new THREE.Mesh(seam_gasketGeom, seam_gasketMat);
  seam_gasket.name = "seam_gasket";
  seam_gasket.position.y = 0.018;
  root.add(seam_gasket);

  const cyan_led_stripMat = new THREE.MeshStandardMaterial({
    color: 0x00bfff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x00bfff,
    emissiveIntensity: 1.0
  });
  const cyanLedPoints = roundedLoopPoints(0.87, 3.38, 0.305, 0.035, 6);
  const cyanLedCurve = new THREE.CatmullRomCurve3(
    cyanLedPoints,
    true,
    "centripetal"
  );
  const cyan_led_stripGeom = new THREE.TubeGeometry(
    cyanLedCurve,
    128,
    0.026,
    8,
    true
  );
  const cyan_led_strip = new THREE.Mesh(cyan_led_stripGeom, cyan_led_stripMat);
  cyan_led_strip.name = "cyan_led_strip";
  root.add(cyan_led_strip);

  const blue_led_stripMat = new THREE.MeshStandardMaterial({
    color: 0x176dff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x176dff,
    emissiveIntensity: 1.0
  });
  const blueLedPoints = roundedLoopPoints(0.855, 3.35, 0.295, 0.001, 6);
  const blueLedCurve = new THREE.CatmullRomCurve3(
    blueLedPoints,
    true,
    "centripetal"
  );
  const blue_led_stripGeom = new THREE.TubeGeometry(
    blueLedCurve,
    128,
    0.018,
    8,
    true
  );
  const blue_led_strip = new THREE.Mesh(blue_led_stripGeom, blue_led_stripMat);
  blue_led_strip.name = "blue_led_strip";
  root.add(blue_led_strip);

  const screen_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x11161b,
    metalness: 0.0,
    roughness: 0.3
  });
  const screen_bezelGeom = roundedPrismGeometry(0.44, 0.50, 0.025, 0.075, 0.012);
  const screen_bezel = new THREE.Mesh(screen_bezelGeom, screen_bezelMat);
  screen_bezel.name = "screen_bezel";
  screen_bezel.position.set(0, 0.345, -0.98);
  root.add(screen_bezel);

  const screen_glassMat = new THREE.MeshStandardMaterial({
    color: 0x17343d,
    metalness: 0.0,
    roughness: 0.3
  });
  const screen_glassGeom = roundedPrismGeometry(0.34, 0.38, 0.008, 0.05, 0.004);
  const screen_glass = new THREE.Mesh(screen_glassGeom, screen_glassMat);
  screen_glass.name = "screen_glass";
  screen_glass.position.set(0, 0.369, -0.98);
  root.add(screen_glass);

  const screen_glyphsMat = new THREE.MeshStandardMaterial({
    color: 0x91d9df,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x91d9df,
    emissiveIntensity: 1.0
  });
  const screen_glyphsGeom = new THREE.BoxGeometry(0.042, 0.006, 0.012);
  const screen_glyphs = new THREE.InstancedMesh(
    screen_glyphsGeom,
    screen_glyphsMat,
    10
  );
  screen_glyphs.name = "screen_glyphs";
  const glyphMatrix = new THREE.Matrix4();
  const glyphPosition = new THREE.Vector3();
  const glyphQuaternion = new THREE.Quaternion();
  const glyphScale = new THREE.Vector3();
  for (let i = 0; i < 10; i++) {
    const column = i % 2;
    const row = Math.floor(i / 2);
    glyphPosition.set(
      column === 0 ? -0.055 : 0.055,
      0.379,
      -1.09 + row * 0.052
    );
    glyphScale.set(column === 0 ? 1.15 : 0.75, 1, 1);
    glyphMatrix.compose(glyphPosition, glyphQuaternion, glyphScale);
    screen_glyphs.setMatrixAt(i, glyphMatrix);
  }
  screen_glyphs.instanceMatrix.needsUpdate = true;
  root.add(screen_glyphs);

  const screen_status_ledMat = new THREE.MeshStandardMaterial({
    color: 0x28dfff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x28dfff,
    emissiveIntensity: 1.0
  });
  const screen_status_ledGeom = new THREE.SphereGeometry(0.024, 12, 8);
  const screen_status_led = new THREE.Mesh(
    screen_status_ledGeom,
    screen_status_ledMat
  );
  screen_status_led.name = "screen_status_led";
  screen_status_led.scale.set(1, 0.35, 1);
  screen_status_led.position.set(0.12, 0.381, -0.82);
  root.add(screen_status_led);

  const port_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_bezelGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.46, 0.19, 0.085),
    12
  );
  const port_bezel = new THREE.Mesh(port_bezelGeom, port_bezelMat);
  port_bezel.name = "port_bezel";
  port_bezel.rotation.y = Math.PI / 2;
  port_bezel.position.set(upperWidth / 2 + 0.045, 0.17, 0.18);
  root.add(port_bezel);

  const port_rimMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const port_rimGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.39, 0.135, 0.062),
    12
  );
  const port_rim = new THREE.Mesh(port_rimGeom, port_rimMat);
  port_rim.name = "port_rim";
  port_rim.rotation.y = Math.PI / 2;
  port_rim.position.set(upperWidth / 2 + 0.050, 0.17, 0.18);
  root.add(port_rim);

  const port_openingMat = new THREE.MeshStandardMaterial({
    color: 0x050607,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_openingGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.335, 0.092, 0.043),
    12
  );
  const port_opening = new THREE.Mesh(port_openingGeom, port_openingMat);
  port_opening.name = "port_opening";
  port_opening.rotation.y = Math.PI / 2;
  port_opening.position.set(upperWidth / 2 + 0.055, 0.17, 0.18);
  root.add(port_opening);

  const port_tongueMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const port_tongueGeom = new THREE.BoxGeometry(0.012, 0.022, 0.20);
  const port_tongue = new THREE.Mesh(port_tongueGeom, port_tongueMat);
  port_tongue.name = "port_tongue";
  port_tongue.position.set(upperWidth / 2 + 0.062, 0.151, 0.18);
  root.add(port_tongue);

  const power_symbolMat = new THREE.MeshStandardMaterial({
    color: 0x34383b,
    metalness: 0.0,
    roughness: 0.7
  });
  const power_symbol_ringGeom = new THREE.TorusGeometry(0.052, 0.008, 6, 24);
  const power_symbol_ring = new THREE.Mesh(
    power_symbol_ringGeom,
    power_symbolMat
  );
  power_symbol_ring.name = "power_symbol_ring";
  power_symbol_ring.rotation.x = Math.PI / 2;
  power_symbol_ring.position.set(-0.14, 0.352, 1.12);
  root.add(power_symbol_ring);

  const power_symbol_stemGeom = new THREE.BoxGeometry(0.014, 0.008, 0.058);
  const power_symbol_stem = new THREE.Mesh(
    power_symbol_stemGeom,
    power_symbolMat
  );
  power_symbol_stem.name = "power_symbol_stem";
  power_symbol_stem.position.set(-0.14, 0.354, 1.071);
  root.add(power_symbol_stem);

  const front_status_windowMat = new THREE.MeshStandardMaterial({
    color: 0x071018,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_status_windowGeom = new THREE.SphereGeometry(1, 20, 12);
  const front_status_window = new THREE.Mesh(
    front_status_windowGeom,
    front_status_windowMat
  );
  front_status_window.name = "front_status_window";
  front_status_window.scale.set(0.14, 0.055, 0.022);
  front_status_window.position.set(0, 0.105, upperLength / 2 + 0.035);
  root.add(front_status_window);

  const front_status_ledMat = new THREE.MeshStandardMaterial({
    color: 0xff3b1f,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0xff3b1f,
    emissiveIntensity: 1.0
  });
  const front_status_ledGeom = new THREE.SphereGeometry(1, 16, 10);
  const front_status_led = new THREE.Mesh(
    front_status_ledGeom,
    front_status_ledMat
  );
  front_status_led.name = "front_status_led";
  front_status_led.scale.set(0.052, 0.026, 0.012);
  front_status_led.position.set(
    -0.045,
    0.105,
    upperLength / 2 + 0.058
  );
  root.add(front_status_led);

  fitToUnitCube(root);
  return root;

  function fitToUnitCube(object) {
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