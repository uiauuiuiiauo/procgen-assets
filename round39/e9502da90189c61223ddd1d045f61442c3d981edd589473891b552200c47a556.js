export default function generate(THREE) {
  const root = new THREE.Group();
  const fob_group = new THREE.Group();
  const ring_group = new THREE.Group();
  root.add(fob_group, ring_group);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const recessMat = new THREE.MeshStandardMaterial({
    color: 0x0753a5,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x004db8,
    emissiveIntensity: 0.45,
  });
  const ledMat = new THREE.MeshStandardMaterial({
    color: 0x49f8ff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x49f8ff,
    emissiveIntensity: 1.0,
  });
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x555b60,
    metalness: 0.0,
    roughness: 0.7,
  });
  const statusLensMat = new THREE.MeshStandardMaterial({
    color: 0x087cff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x006dff,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.82,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    shape.closePath();
    return shape;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 8,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 3,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const body_side_gasketGeom = roundedExtrudeGeometry(
    0.635, 1.56, 0.105, 0.07, 0.012
  );
  const body_side_gasket = new THREE.Mesh(body_side_gasketGeom, darkMetalMat);
  body_side_gasket.position.set(0, -0.275, -0.07);
  fob_group.add(body_side_gasket);

  const body_lower_shellGeom = roundedExtrudeGeometry(
    0.66, 1.61, 0.115, 0.11, 0.018
  );
  const body_lower_shell = new THREE.Mesh(body_lower_shellGeom, silverMat);
  body_lower_shell.position.set(0, -0.285, -0.025);
  fob_group.add(body_lower_shell);

  const body_top_panelGeom = roundedExtrudeGeometry(
    0.615, 1.515, 0.095, 0.045, 0.012
  );
  const body_top_panel = new THREE.Mesh(body_top_panelGeom, silverMat);
  body_top_panel.position.set(0, -0.275, 0.07);
  fob_group.add(body_top_panel);

  const led_recess_rimGeom = roundedExtrudeGeometry(
    0.245, 1.14, 0.115, 0.012, 0.005
  );
  const led_recess_rim = new THREE.Mesh(led_recess_rimGeom, polishedMat);
  led_recess_rim.position.set(-0.035, -0.305, 0.113);
  fob_group.add(led_recess_rim);

  const led_recessGeom = roundedExtrudeGeometry(
    0.205, 1.085, 0.095, 0.01, 0.003
  );
  const led_recess = new THREE.Mesh(led_recessGeom, recessMat);
  led_recess.position.set(-0.035, -0.305, 0.126);
  fob_group.add(led_recess);

  const ledCount = 7;
  const ledStartY = -0.75;
  const ledStep = 0.145;
  const dummy = new THREE.Object3D();

  const led_diffuser_stripsGeom = new THREE.BoxGeometry(0.14, 0.078, 0.008);
  const led_diffuser_strips = new THREE.InstancedMesh(
    led_diffuser_stripsGeom,
    recessMat,
    ledCount
  );
  for (let i = 0; i < ledCount; i++) {
    dummy.position.set(-0.035, ledStartY + i * ledStep, 0.14);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    led_diffuser_strips.setMatrixAt(i, dummy.matrix);
  }
  led_diffuser_strips.instanceMatrix.needsUpdate = true;
  fob_group.add(led_diffuser_strips);

  const led_cellsGeom = new THREE.CircleGeometry(0.038, 20);
  const led_cells = new THREE.InstancedMesh(led_cellsGeom, ledMat, ledCount);
  for (let i = 0; i < ledCount; i++) {
    dummy.position.set(-0.035, ledStartY + i * ledStep, 0.147);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    led_cells.setMatrixAt(i, dummy.matrix);
  }
  led_cells.instanceMatrix.needsUpdate = true;
  fob_group.add(led_cells);

  const status_lensGeom = new THREE.CircleGeometry(0.037, 20);
  const status_lens = new THREE.Mesh(status_lensGeom, statusLensMat);
  status_lens.position.set(0.145, 0.075, 0.142);
  fob_group.add(status_lens);

  const logo_group = new THREE.Group();
  logo_group.position.set(0.075, 0.225, 0.137);
  fob_group.add(logo_group);

  function addLogoStroke(width, height, x, y, rotation) {
    const strokeGeom = new THREE.BoxGeometry(width, height, 0.006);
    const stroke = new THREE.Mesh(strokeGeom, logoMat);
    stroke.position.set(x, y, 0);
    stroke.rotation.z = rotation;
    logo_group.add(stroke);
  }

  const letterW = 0.052;
  const letterH = 0.075;
  const letterGap = 0.014;
  const totalLogoW = letterW * 5 + letterGap * 4;
  const firstLetterX = -totalLogoW / 2 + letterW / 2;
  const letterStep = letterW + letterGap;

  function logoBar(x, y, width, height, rotation) {
    addLogoStroke(width, height, x, y, rotation || 0);
  }

  function logoDiagonal(x, y, length, angle) {
    const dx = Math.cos(angle) * length * 0.5;
    const dy = Math.sin(angle) * length * 0.5;
    const distance = Math.sqrt(dx * dx + dy * dy);
    addLogoStroke(
      0.008,
      distance,
      x + dx * 0.5,
      y + dy * 0.5,
      Math.atan2(dy, dx) - Math.PI / 2
    );
  }

  let cx = firstLetterX;
  logoBar(cx - 0.019, 0, 0.008, letterH);
  logoBar(cx, 0.034, letterW, 0.008);
  logoBar(cx, -0.034, letterW, 0.008);
  logoBar(cx + 0.019, 0, 0.008, letterH);

  cx += letterStep;
  logoBar(cx - 0.019, 0, 0.008, letterH);
  logoBar(cx, 0.034, letterW, 0.008);
  logoBar(cx - 0.001, 0, letterW * 0.9, 0.008);
  logoBar(cx, -0.034, letterW, 0.008);

  cx += letterStep;
  logoDiagonal(cx - 0.012, 0, 0.078, 1.12);
  logoDiagonal(cx + 0.012, 0, 0.078, 2.02);
  logoBar(cx, -0.004, 0.032, 0.008);

  cx += letterStep;
  logoBar(cx - 0.019, 0, 0.008, letterH);
  logoBar(cx + 0.001, 0.034, letterW * 1.35, 0.008);
  logoBar(cx - 0.002, -0.002, letterW * 1.1, 0.008);
  logoBar(cx + 0.018, 0.018, 0.008, 0.04);

  cx += letterStep;
  logoBar(cx, 0.034, letterW, 0.008);
  logoBar(cx, -0.034, letterW, 0.008);
  logoBar(cx - 0.019, 0, 0.008, letterH);
  logoBar(cx + 0.019, 0, 0.008, letterH);

  const connector_seamGeom = roundedExtrudeGeometry(
    0.41, 0.16, 0.045, 0.12, 0.01
  );
  const connector_seam = new THREE.Mesh(connector_seamGeom, darkMetalMat);
  connector_seam.position.set(0, 0.505, -0.005);
  fob_group.add(connector_seam);

  const connector_housingGeom = roundedExtrudeGeometry(
    0.375, 0.205, 0.055, 0.22, 0.018
  );
  const connector_housing = new THREE.Mesh(connector_housingGeom, silverMat);
  connector_housing.position.set(0, 0.625, 0);
  fob_group.add(connector_housing);

  const connector_bandGeom = new THREE.BoxGeometry(0.39, 0.028, 0.225);
  const connector_band = new THREE.Mesh(connector_bandGeom, darkMetalMat);
  connector_band.position.set(0, 0.525, 0);
  fob_group.add(connector_band);

  const connector_pinGeom = new THREE.CylinderGeometry(0.075, 0.075, 0.3, 24);
  const connector_pin = new THREE.Mesh(connector_pinGeom, polishedMat);
  connector_pin.rotation.x = Math.PI / 2;
  connector_pin.position.set(0, 0.71, 0);
  fob_group.add(connector_pin);

  ring_group.position.set(0, 1.03, -0.015);

  const outerRadius = 0.49;
  const innerRadius = 0.35;
  const ringArc = Math.PI * 1.84;
  const ringStart = -2.3;

  const keyring_outerGeom = new THREE.TorusGeometry(
    outerRadius, 0.055, 12, 80, ringArc
  );
  const keyring_outer = new THREE.Mesh(keyring_outerGeom, silverMat);
  keyring_outer.rotation.z = ringStart;
  keyring_outer.position.z = 0.025;
  ring_group.add(keyring_outer);

  const keyring_innerGeom = new THREE.TorusGeometry(
    innerRadius, 0.042, 12, 72, ringArc
  );
  const keyring_inner = new THREE.Mesh(keyring_innerGeom, polishedMat);
  keyring_inner.rotation.z = ringStart;
  keyring_inner.position.z = -0.015;
  ring_group.add(keyring_inner);

  const keyring_grooveGeom = new THREE.TorusGeometry(
    0.42, 0.009, 8, 72, ringArc
  );
  const keyring_groove = new THREE.Mesh(keyring_grooveGeom, darkMetalMat);
  keyring_groove.rotation.z = ringStart;
  keyring_groove.position.z = 0.068;
  ring_group.add(keyring_groove);

  const keyring_end_capsGeom = new THREE.SphereGeometry(0.055, 16, 10);
  const keyring_end_caps = new THREE.InstancedMesh(
    keyring_end_capsGeom,
    silverMat,
    4
  );
  const endAngles = [ringStart, ringStart + ringArc];
  const radii = [outerRadius, innerRadius];
  const depths = [0.025, -0.015];
  let capIndex = 0;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const angle = endAngles[i];
      const radius = radii[j];
      dummy.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        depths[j]
      );
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      keyring_end_caps.setMatrixAt(capIndex, dummy.matrix);
      capIndex++;
    }
  }
  keyring_end_caps.instanceMatrix.needsUpdate = true;
  ring_group.add(keyring_end_caps);

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