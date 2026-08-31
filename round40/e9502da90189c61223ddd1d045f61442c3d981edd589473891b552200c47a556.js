export default function generate(THREE) {
  const root = new THREE.Group();

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
  const brushedMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x17202b,
    metalness: 0.0,
    roughness: 0.8,
  });
  const bluePlasticMat = new THREE.MeshStandardMaterial({
    color: 0x006dcb,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blueGlowMat = new THREE.MeshStandardMaterial({
    color: 0x00aaff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x00aaff,
    emissiveIntensity: 1.0,
  });
  const whiteLedMat = new THREE.MeshStandardMaterial({
    color: 0xeaffff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xeaffff,
    emissiveIntensity: 1.0,
  });
  const lensMat = new THREE.MeshPhysicalMaterial({
    color: 0x42c8ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x = width / 2;
    const y = height / 2;
    const r = Math.min(radius, x, y);

    shape.moveTo(-x + r, -y);
    shape.lineTo(x - r, -y);
    shape.quadraticCurveTo(x, -y, x, -y + r);
    shape.lineTo(x, y - r);
    shape.quadraticCurveTo(x, y, x - r, y);
    shape.lineTo(-x + r, y);
    shape.quadraticCurveTo(-x, y, -x, y - r);
    shape.lineTo(-x, -y + r);
    shape.quadraticCurveTo(-x, -y, -x + r, -y);
    shape.closePath();
    return shape;
  }

  function roundedRectHole(width, height, radius) {
    const path = new THREE.Path();
    const x = width / 2;
    const y = height / 2;
    const r = Math.min(radius, x, y);

    path.moveTo(-x + r, -y);
    path.lineTo(-x, -y + r);
    path.lineTo(-x, y - r);
    path.quadraticCurveTo(-x, y, -x + r, y);
    path.lineTo(x - r, y);
    path.quadraticCurveTo(x, y, x, y - r);
    path.lineTo(x, -y + r);
    path.quadraticCurveTo(x, -y, x - r, -y);
    path.lineTo(-x + r, -y);
    path.closePath();
    return path;
  }

  function roundedExtrudeGeometry(width, height, radius, depth, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 3,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  function roundedRingGeometry(
    outerWidth,
    outerHeight,
    outerRadius,
    innerWidth,
    innerHeight,
    innerRadius,
    depth,
    bevel
  ) {
    const shape = roundedRectShape(outerWidth, outerHeight, outerRadius);
    shape.holes.push(
      roundedRectHole(innerWidth, innerHeight, innerRadius)
    );
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 12,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const body_group = new THREE.Group();
  root.add(body_group);

  const body_seamGeom = roundedExtrudeGeometry(
    0.69,
    2.54,
    0.145,
    0.14,
    0.018
  );
  const body_seam = new THREE.Mesh(body_seamGeom, darkMat);
  body_seam.position.set(0, -0.68, -0.035);
  body_group.add(body_seam);

  const main_bodyGeom = roundedExtrudeGeometry(
    0.66,
    2.5,
    0.135,
    0.16,
    0.028
  );
  const main_body = new THREE.Mesh(main_bodyGeom, silverMat);
  main_body.position.set(0, -0.68, 0.02);
  body_group.add(main_body);

  const blue_edge_stripGeom = new THREE.BoxGeometry(0.014, 1.92, 0.025);
  const blue_edge_strip = new THREE.Mesh(blue_edge_stripGeom, blueGlowMat);
  blue_edge_strip.position.set(0.337, -0.72, -0.005);
  body_group.add(blue_edge_strip);

  const window_bezelGeom = roundedRingGeometry(
    0.43,
    1.72,
    0.12,
    0.325,
    1.56,
    0.085,
    0.022,
    0.006
  );
  const window_bezel = new THREE.Mesh(window_bezelGeom, polishedMat);
  window_bezel.position.set(0, -0.7, 0.126);
  body_group.add(window_bezel);

  const window_recessGeom = roundedExtrudeGeometry(
    0.35,
    1.61,
    0.1,
    0.014,
    0.004
  );
  const window_recess = new THREE.Mesh(window_recessGeom, darkMat);
  window_recess.position.set(0, -0.7, 0.139);
  body_group.add(window_recess);

  const light_channelGeom = roundedExtrudeGeometry(
    0.29,
    1.5,
    0.08,
    0.012,
    0.003
  );
  const light_channel = new THREE.Mesh(light_channelGeom, bluePlasticMat);
  light_channel.position.set(0, -0.7, 0.151);
  body_group.add(light_channel);

  const window_glowGeom = roundedExtrudeGeometry(
    0.225,
    1.39,
    0.065,
    0.008,
    0.002
  );
  const window_glow = new THREE.Mesh(window_glowGeom, blueGlowMat);
  window_glow.position.set(0, -0.7, 0.16);
  body_group.add(window_glow);

  const window_lensGeom = roundedExtrudeGeometry(
    0.305,
    1.48,
    0.078,
    0.01,
    0.003
  );
  const window_lens = new THREE.Mesh(window_lensGeom, lensMat);
  window_lens.position.set(0, -0.7, 0.169);
  body_group.add(window_lens);

  const led_emittersGeom = new THREE.SphereGeometry(1, 16, 8);
  const led_emitters = new THREE.InstancedMesh(
    led_emittersGeom,
    whiteLedMat,
    6
  );
  const ledDummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    ledDummy.position.set(0, -1.29 + i * 0.235, 0.181);
    ledDummy.rotation.set(0, 0, 0);
    ledDummy.scale.set(0.068, 0.092, 0.014);
    ledDummy.updateMatrix();
    led_emitters.setMatrixAt(i, ledDummy.matrix);
  }
  led_emitters.instanceMatrix.needsUpdate = true;
  body_group.add(led_emitters);

  const logoBars = [];
  function addLogoBar(x, y, length, angle) {
    logoBars.push([x, y, length, angle]);
  }

  const logoY = 0.205;
  const logoH = 0.068;
  const logoW = 0.045;
  const logoT = 0.008;

  let cx = -0.13;
  addLogoBar(cx, logoY + logoH / 2, logoW, 0);
  addLogoBar(cx, logoY - logoH / 2, logoW, 0);
  addLogoBar(
    cx,
    logoY,
    Math.sqrt(logoH * logoH + logoW * logoW),
    Math.atan2(logoH, logoW)
  );

  cx = -0.045;
  addLogoBar(cx - logoW / 2, logoY, logoH, Math.PI / 2);
  addLogoBar(cx, logoY + logoH / 2, logoW, 0);
  addLogoBar(cx - 0.003, logoY, logoW * 0.82, 0);
  addLogoBar(cx, logoY - logoH / 2, logoW, 0);

  cx = 0.045;
  addLogoBar(cx - logoW / 2, logoY, logoH, Math.PI / 2);
  addLogoBar(cx + logoW / 2, logoY, logoH, Math.PI / 2);
  addLogoBar(cx, logoY, logoW, 0);

  cx = 0.135;
  addLogoBar(cx, logoY + logoH / 2, logoW, 0);
  addLogoBar(cx, logoY - logoH / 2, logoW, 0);
  addLogoBar(cx - logoW / 2, logoY, logoH, Math.PI / 2);
  addLogoBar(cx + logoW / 2, logoY, logoH, Math.PI / 2);

  const logo_markGeom = new THREE.BoxGeometry(1, 1, 1);
  const logo_mark = new THREE.InstancedMesh(
    logo_markGeom,
    brushedMat,
    logoBars.length
  );
  const logoDummy = new THREE.Object3D();
  for (let i = 0; i < logoBars.length; i++) {
    const bar = logoBars[i];
    logoDummy.position.set(bar[0], bar[1], 0.151);
    logoDummy.rotation.set(0, 0, bar[3]);
    logoDummy.scale.set(bar[2], logoT, 0.006);
    logoDummy.updateMatrix();
    logo_mark.setMatrixAt(i, logoDummy.matrix);
  }
  logo_mark.instanceMatrix.needsUpdate = true;
  body_group.add(logo_mark);

  const connector_group = new THREE.Group();
  root.add(connector_group);

  const connector_neckGeom = new THREE.CylinderGeometry(
    0.105,
    0.105,
    0.25,
    24
  );
  const connector_neck = new THREE.Mesh(connector_neckGeom, polishedMat);
  connector_neck.rotation.x = Math.PI / 2;
  connector_neck.position.set(0, 0.59, 0.015);
  connector_group.add(connector_neck);

  const connector_housingGeom = roundedExtrudeGeometry(
    0.5,
    0.36,
    0.085,
    0.24,
    0.025
  );
  const connector_housing = new THREE.Mesh(
    connector_housingGeom,
    silverMat
  );
  connector_housing.position.set(0, 0.59, 0.02);
  connector_group.add(connector_housing);

  const connector_frontGeom = roundedExtrudeGeometry(
    0.45,
    0.31,
    0.07,
    0.012,
    0.004
  );
  const connector_front = new THREE.Mesh(connector_frontGeom, polishedMat);
  connector_front.position.set(0, 0.59, 0.166);
  connector_group.add(connector_front);

  const connector_seamGeom = new THREE.BoxGeometry(0.42, 0.018, 0.012);
  const connector_seam = new THREE.Mesh(connector_seamGeom, darkMat);
  connector_seam.position.set(0, 0.405, 0.176);
  connector_group.add(connector_seam);

  const ring_group = new THREE.Group();
  ring_group.position.set(0, 1.43, -0.035);
  root.add(ring_group);

  const outerRadius = 0.78;
  const innerRadius = 0.61;
  const ringWidth = outerRadius - innerRadius;
  const ringMidRadius = (outerRadius + innerRadius) / 2;
  const gapAngle = 0.22;
  const ringStart = Math.PI / 2 + gapAngle / 2;
  const ringArc = Math.PI * 2 - gapAngle;

  const keyring_outerGeom = new THREE.TorusGeometry(
    outerRadius - ringWidth / 2,
    ringWidth / 2,
    12,
    96,
    ringArc
  );
  const keyring_outer = new THREE.Mesh(keyring_outerGeom, polishedMat);
  keyring_outer.rotation.z = ringStart;
  keyring_outer.scale.z = 0.55;
  ring_group.add(keyring_outer);

  const keyring_innerGeom = new THREE.TorusGeometry(
    innerRadius + 0.016,
    0.016,
    10,
    96,
    ringArc
  );
  const keyring_inner = new THREE.Mesh(keyring_innerGeom, brushedMat);
  keyring_inner.rotation.z = ringStart;
  keyring_inner.position.z = 0.02;
  keyring_inner.scale.z = 0.7;
  ring_group.add(keyring_inner);

  const keyring_grooveGeom = new THREE.TorusGeometry(
    ringMidRadius,
    0.009,
    8,
    96,
    ringArc
  );
  const keyring_groove = new THREE.Mesh(keyring_grooveGeom, darkMat);
  keyring_groove.rotation.z = ringStart;
  keyring_groove.position.z = 0.044;
  keyring_groove.scale.z = 0.55;
  ring_group.add(keyring_groove);

  const seamX = outerRadius * Math.cos(gapAngle / 2);
  const seamY = outerRadius * Math.sin(gapAngle / 2);
  const keyring_gap_seamGeom = new THREE.BoxGeometry(
    ringWidth * 0.9,
    0.014,
    0.012
  );
  const keyring_gap_seam = new THREE.Mesh(
    keyring_gap_seamGeom,
    darkMat
  );
  keyring_gap_seam.position.set(seamX, seamY, 0.047);
  keyring_gap_seam.rotation.z = Math.PI / 2 - gapAngle / 2;
  ring_group.add(keyring_gap_seam);

  const splitAngle = Math.PI * 1.28;
  const splitX = ringMidRadius * Math.cos(splitAngle);
  const splitY = ringMidRadius * Math.sin(splitAngle);
  const keyring_split_lineGeom = new THREE.BoxGeometry(
    ringWidth * 0.82,
    0.012,
    0.01
  );
  const keyring_split_line = new THREE.Mesh(
    keyring_split_lineGeom,
    brushedMat
  );
  keyring_split_line.position.set(splitX, splitY, 0.048);
  keyring_split_line.rotation.z = splitAngle + Math.PI / 2;
  ring_group.add(keyring_split_line);

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