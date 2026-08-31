export default function generate(THREE) {
  const root = new THREE.Group();

  const top_shellMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const lower_shellMat = top_shellMat;
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const display_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x111315,
    metalness: 0.0,
    roughness: 0.3,
  });
  const display_inner_rimMat = new THREE.MeshStandardMaterial({
    color: 0x303436,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lcd_screenMat = new THREE.MeshStandardMaterial({
    color: 0x83a98e,
    metalness: 0.0,
    roughness: 0.3,
  });
  const display_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeedd,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });
  const display_digitsMat = new THREE.MeshStandardMaterial({
    color: 0x74f4ff,
    metalness: 0.0,
    roughness: 0.5,
    emissive: 0x74f4ff,
    emissiveIntensity: 1.0,
  });
  const port_recessMat = new THREE.MeshStandardMaterial({
    color: 0x080909,
    metalness: 0.0,
    roughness: 0.8,
  });
  const port_rimMat = new THREE.MeshStandardMaterial({
    color: 0x34383a,
    metalness: 0.0,
    roughness: 0.8,
  });

  function roundedBoxGeometry(width, length, height, radius, bevelSize, bevelThickness) {
    const halfW = width * 0.5;
    const halfL = length * 0.5;
    const shape = new THREE.Shape();

    shape.moveTo(-halfW + radius, -halfL);
    shape.lineTo(halfW - radius, -halfL);
    shape.quadraticCurveTo(halfW, -halfL, halfW, -halfL + radius);
    shape.lineTo(halfW, halfL - radius);
    shape.quadraticCurveTo(halfW, halfL, halfW - radius, halfL);
    shape.lineTo(-halfW + radius, halfL);
    shape.quadraticCurveTo(-halfW, halfL, -halfW, halfL - radius);
    shape.lineTo(-halfW, -halfL + radius);
    shape.quadraticCurveTo(-halfW, -halfL, -halfW + radius, -halfL);

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSize: bevelSize,
      bevelThickness: bevelThickness,
    });
    geometry.translate(0, 0, -height * 0.5);
    return geometry;
  }

  const lower_shellGeom = roundedBoxGeometry(1.14, 2.50, 0.34, 0.25, 0.055, 0.045);
  const lower_shell = new THREE.Mesh(lower_shellGeom, lower_shellMat);
  lower_shell.rotation.x = Math.PI / 2;
  lower_shell.position.y = -0.09;
  root.add(lower_shell);

  const top_shellGeom = roundedBoxGeometry(1.13, 2.48, 0.36, 0.25, 0.055, 0.045);
  const top_shell = new THREE.Mesh(top_shellGeom, top_shellMat);
  top_shell.rotation.x = Math.PI / 2;
  top_shell.position.y = 0.17;
  root.add(top_shell);

  const seamPoints = [];
  const seamHalfW = 0.626;
  const seamHalfL = 1.302;
  const seamRadius = 0.25;
  const seamCorners = [
    [seamHalfW - seamRadius, seamHalfL - seamRadius, 0, Math.PI / 2],
    [-seamHalfW + seamRadius, seamHalfL - seamRadius, Math.PI / 2, Math.PI],
    [-seamHalfW + seamRadius, -seamHalfL + seamRadius, Math.PI, Math.PI * 1.5],
    [seamHalfW - seamRadius, -seamHalfL + seamRadius, Math.PI * 1.5, Math.PI * 2],
  ];

  for (let cornerIndex = 0; cornerIndex < seamCorners.length; cornerIndex++) {
    const corner = seamCorners[cornerIndex];
    for (let step = 0; step <= 5; step++) {
      const angle = corner[2] + (corner[3] - corner[2]) * (step / 5);
      seamPoints.push(new THREE.Vector3(
        corner[0] + Math.cos(angle) * seamRadius,
        -0.045,
        corner[1] + Math.sin(angle) * seamRadius
      ));
    }
  }

  const shell_seamCurve = new THREE.CatmullRomCurve3(
    seamPoints,
    true,
    "centripetal"
  );
  const shell_seamGeom = new THREE.TubeGeometry(
    shell_seamCurve,
    96,
    0.009,
    8,
    true
  );
  const shell_seam = new THREE.Mesh(shell_seamGeom, seamMat);
  root.add(shell_seam);

  const display_group = new THREE.Group();
  display_group.position.set(0, 0.405, -0.32);
  root.add(display_group);

  const display_bezelGeom = roundedBoxGeometry(0.78, 1.02, 0.045, 0.115, 0.018, 0.012);
  const display_bezel = new THREE.Mesh(display_bezelGeom, display_bezelMat);
  display_bezel.rotation.x = Math.PI / 2;
  display_group.add(display_bezel);

  const display_inner_rimGeom = roundedBoxGeometry(0.64, 0.86, 0.018, 0.075, 0.008, 0.006);
  const display_inner_rim = new THREE.Mesh(display_inner_rimGeom, display_inner_rimMat);
  display_inner_rim.rotation.x = Math.PI / 2;
  display_inner_rim.position.y = 0.034;
  display_group.add(display_inner_rim);

  const lcd_screenGeom = roundedBoxGeometry(0.56, 0.76, 0.012, 0.055, 0.005, 0.004);
  const lcd_screen = new THREE.Mesh(lcd_screenGeom, lcd_screenMat);
  lcd_screen.rotation.x = Math.PI / 2;
  lcd_screen.position.y = 0.049;
  display_group.add(lcd_screen);

  const display_glassGeom = roundedBoxGeometry(0.565, 0.765, 0.004, 0.055, 0.002, 0.002);
  const display_glass = new THREE.Mesh(display_glassGeom, display_glassMat);
  display_glass.rotation.x = Math.PI / 2;
  display_glass.position.y = 0.061;
  display_group.add(display_glass);

  const digitSegments = [];

  function addDigitSegment(x, z, width, depth) {
    digitSegments.push({ x: x, z: z, width: width, depth: depth });
  }

  function addSevenSegmentDigit(value, centerX, centerZ) {
    const digitW = 0.105;
    const digitH = 0.205;
    const thick = 0.018;
    const horizontalW = digitW - thick;
    const verticalH = digitH * 0.5 - thick;
    const xEdge = digitW * 0.5 - thick * 0.5;
    const zEdge = digitH * 0.5 - thick * 0.5;
    const upper = digitH * 0.25;
    const lower = -digitH * 0.25;
    const active = value === 1
      ? ["b", "c"]
      : ["a", "b", "c", "d", "e", "f"];

    for (let i = 0; i < active.length; i++) {
      const segment = active[i];
      if (segment === "a") addDigitSegment(centerX, centerZ + upper, horizontalW, thick);
      if (segment === "g") addDigitSegment(centerX, centerZ, horizontalW, thick);
      if (segment === "d") addDigitSegment(centerX, centerZ - upper, horizontalW, thick);
      if (segment === "f") addDigitSegment(centerX - xEdge, centerZ + upper * 0.5, thick, verticalH);
      if (segment === "b") addDigitSegment(centerX + xEdge, centerZ + upper * 0.5, thick, verticalH);
      if (segment === "e") addDigitSegment(centerX - xEdge, centerZ - upper * 0.5, thick, verticalH);
      if (segment === "c") addDigitSegment(centerX + xEdge, centerZ - upper * 0.5, thick, verticalH);
    }
  }

  addSevenSegmentDigit(1, -0.065, -0.055);
  addSevenSegmentDigit(8, 0.075, -0.055);

  addDigitSegment(-0.155, -0.175, 0.012, 0.012);
  addDigitSegment(-0.181, -0.150, 0.012, 0.050);
  addDigitSegment(-0.181, -0.150, 0.050, 0.012);
  addDigitSegment(0.150, 0.165, 0.055, 0.010);
  addDigitSegment(0.178, 0.184, 0.010, 0.040);
  addDigitSegment(0.190, 0.202, 0.032, 0.010);

  const display_digitsGeom = new THREE.BoxGeometry(1, 1, 1);
  const display_digits = new THREE.InstancedMesh(
    display_digitsGeom,
    display_digitsMat,
    digitSegments.length
  );
  const digitDummy = new THREE.Object3D();

  for (let i = 0; i < digitSegments.length; i++) {
    const segment = digitSegments[i];
    digitDummy.position.set(segment.x, 0.071, segment.z);
    digitDummy.rotation.set(0, 0, 0);
    digitDummy.scale.set(segment.width, 0.006, segment.depth);
    digitDummy.updateMatrix();
    display_digits.setMatrixAt(i, digitDummy.matrix);
  }
  display_digits.instanceMatrix.needsUpdate = true;
  display_group.add(display_digits);

  const connector_group = new THREE.Group();
  connector_group.position.set(0, -0.075, 1.315);
  root.add(connector_group);

  const connector_tabGeom = roundedBoxGeometry(0.18, 0.16, 0.028, 0.045, 0.008, 0.006);
  const connector_tab = new THREE.Mesh(connector_tabGeom, display_bezelMat);
  connector_tab.rotation.x = Math.PI / 2;
  connector_tab.position.set(0, 0.035, -0.012);
  connector_group.add(connector_tab);

  const port_recessGeom = roundedBoxGeometry(0.125, 0.105, 0.022, 0.035, 0.006, 0.005);
  const port_recess = new THREE.Mesh(port_recessGeom, port_recessMat);
  port_recess.rotation.x = Math.PI / 2;
  port_recess.position.set(0, -0.025, 0.018);
  connector_group.add(port_recess);

  const port_rimGeom = new THREE.TorusGeometry(0.043, 0.009, 8, 24);
  const port_rim = new THREE.Mesh(port_rimGeom, port_rimMat);
  port_rim.position.set(0, -0.025, 0.035);
  port_rim.scale.set(1.0, 1.12, 1.0);
  connector_group.add(port_rim);

  const port_openingGeom = new THREE.CircleGeometry(0.035, 24);
  const port_opening = new THREE.Mesh(port_openingGeom, port_recessMat);
  port_opening.position.set(0, -0.025, 0.038);
  port_opening.scale.set(1.0, 1.12, 1.0);
  connector_group.add(port_opening);

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

  fitToUnitCube(root);
  return root;
}