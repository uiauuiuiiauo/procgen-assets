export default function generate(THREE) {
  const root = new THREE.Group();

  const deviceW = 1.05;
  const deviceL = 4.45;
  const cornerR = 0.42;

  function roundedRectShape(width, height, radius) {
    const x = -width / 2;
    const y = -height / 2;
    const r = Math.min(radius, width / 2, height / 2);
    const shape = new THREE.Shape();
    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    shape.closePath();
    return shape;
  }

  function roundedPrismGeometry(width, length, radius, height, bevelSize, bevelThickness) {
    return new THREE.ExtrudeGeometry(
      roundedRectShape(width, length, radius),
      {
        depth: height,
        steps: 1,
        curveSegments: 16,
        bevelEnabled: true,
        bevelSegments: 4,
        bevelSize,
        bevelThickness
      }
    );
  }

  const lower_shellMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const lower_shellGeom = roundedPrismGeometry(
    deviceW,
    deviceL,
    cornerR,
    0.24,
    0.045,
    0.055
  );
  const lower_shell = new THREE.Mesh(lower_shellGeom, lower_shellMat);
  lower_shell.rotation.x = -Math.PI / 2;
  lower_shell.position.y = -0.27;
  root.add(lower_shell);

  const led_gasketMat = new THREE.MeshStandardMaterial({
    color: 0x17202b,
    metalness: 0.0,
    roughness: 0.8
  });
  const led_gasketGeom = roundedPrismGeometry(
    deviceW + 0.03,
    deviceL + 0.03,
    cornerR + 0.01,
    0.035,
    0.018,
    0.012
  );
  const led_gasket = new THREE.Mesh(led_gasketGeom, led_gasketMat);
  led_gasket.rotation.x = -Math.PI / 2;
  led_gasket.position.y = 0.005;
  root.add(led_gasket);

  const led_bandMat = new THREE.MeshStandardMaterial({
    color: 0x159cff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x159cff,
    emissiveIntensity: 1.0
  });
  const led_bandGeom = roundedPrismGeometry(
    deviceW + 0.025,
    deviceL + 0.025,
    cornerR,
    0.065,
    0.022,
    0.015
  );
  const led_band = new THREE.Mesh(led_bandGeom, led_bandMat);
  led_band.rotation.x = -Math.PI / 2;
  led_band.position.y = 0.035;
  root.add(led_band);

  const upper_shellMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const upper_shellGeom = roundedPrismGeometry(
    deviceW,
    deviceL,
    cornerR,
    0.25,
    0.045,
    0.055
  );
  const upper_shell = new THREE.Mesh(upper_shellGeom, upper_shellMat);
  upper_shell.rotation.x = -Math.PI / 2;
  upper_shell.position.y = 0.105;
  root.add(upper_shell);

  const top_faceMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const top_faceGeom = roundedPrismGeometry(
    0.98,
    4.22,
    0.37,
    0.022,
    0.018,
    0.012
  );
  const top_face = new THREE.Mesh(top_faceGeom, top_faceMat);
  top_face.rotation.x = -Math.PI / 2;
  top_face.position.y = 0.402;
  root.add(top_face);

  const display_windowMat = new THREE.MeshStandardMaterial({
    color: 0x101720,
    metalness: 0.0,
    roughness: 0.3
  });
  const display_windowGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.59, 0.52, 0.105),
    16
  );
  const display_window = new THREE.Mesh(display_windowGeom, display_windowMat);
  display_window.rotation.x = -Math.PI / 2;
  display_window.position.set(0, 0.443, -1.22);
  root.add(display_window);

  const display_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x9bb9c8,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true
  });
  const display_glassGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.50, 0.40, 0.075),
    16
  );
  const display_glass = new THREE.Mesh(display_glassGeom, display_glassMat);
  display_glass.rotation.x = -Math.PI / 2;
  display_glass.position.set(0, 0.448, -1.22);
  root.add(display_glass);

  const display_markingsMat = new THREE.MeshStandardMaterial({
    color: 0x7898a6,
    metalness: 0.0,
    roughness: 0.7
  });
  const display_markingsGeom = new THREE.BoxGeometry(0.035, 0.004, 0.018);
  const display_markings = new THREE.InstancedMesh(
    display_markingsGeom,
    display_markingsMat,
    12
  );
  const display_marking_transform = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    const row = Math.floor(i / 4);
    const column = i % 4;
    display_marking_transform.position.set(
      -0.15 + column * 0.10,
      0.452,
      -1.34 + row * 0.12
    );
    display_marking_transform.scale.set(
      0.75 + (i % 3) * 0.18,
      1,
      1
    );
    display_marking_transform.updateMatrix();
    display_markings.setMatrixAt(i, display_marking_transform.matrix);
  }
  display_markings.instanceMatrix.needsUpdate = true;
  root.add(display_markings);

  const display_indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x159cff,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x159cff,
    emissiveIntensity: 1.0
  });
  const display_indicatorGeom = new THREE.CircleGeometry(0.024, 16);
  const display_indicator = new THREE.Mesh(
    display_indicatorGeom,
    display_indicatorMat
  );
  display_indicator.rotation.x = -Math.PI / 2;
  display_indicator.position.set(0.18, 0.454, -1.08);
  root.add(display_indicator);

  const port_recessMat = new THREE.MeshStandardMaterial({
    color: 0x080a0c,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_recessGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.53, 0.225, 0.09),
    16
  );
  const port_recess = new THREE.Mesh(port_recessGeom, port_recessMat);
  port_recess.rotation.y = Math.PI / 2;
  port_recess.position.set(0.574, 0.245, 0.20);
  root.add(port_recess);

  const port_rimMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5
  });
  const port_rimGeom = new THREE.TorusGeometry(0.105, 0.022, 10, 28);
  const port_rim = new THREE.Mesh(port_rimGeom, port_rimMat);
  port_rim.rotation.y = Math.PI / 2;
  port_rim.scale.set(1.9, 0.78, 1);
  port_rim.position.set(0.585, 0.245, 0.20);
  root.add(port_rim);

  const port_tongueMat = new THREE.MeshStandardMaterial({
    color: 0x30363b,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_tongueGeom = new THREE.BoxGeometry(0.018, 0.045, 0.28);
  const port_tongue = new THREE.Mesh(port_tongueGeom, port_tongueMat);
  port_tongue.position.set(0.591, 0.225, 0.20);
  root.add(port_tongue);

  const port_contactMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const port_contactGeom = new THREE.BoxGeometry(0.008, 0.012, 0.19);
  const port_contact = new THREE.Mesh(port_contactGeom, port_contactMat);
  port_contact.position.set(0.602, 0.225, 0.20);
  root.add(port_contact);

  const front_notchMat = new THREE.MeshStandardMaterial({
    color: 0x090d12,
    metalness: 0.0,
    roughness: 0.8
  });
  const front_notchGeom = new THREE.ShapeGeometry(
    roundedRectShape(0.52, 0.145, 0.06),
    14
  );
  const front_notch = new THREE.Mesh(front_notchGeom, front_notchMat);
  front_notch.position.set(0, 0.205, 2.274);
  root.add(front_notch);

  const front_sensorMat = new THREE.MeshStandardMaterial({
    color: 0x8f2417,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0x8f2417,
    emissiveIntensity: 1.0
  });
  const front_sensorGeom = new THREE.CircleGeometry(0.038, 16);
  const front_sensor = new THREE.Mesh(front_sensorGeom, front_sensorMat);
  front_sensor.scale.set(1.35, 0.58, 1);
  front_sensor.position.set(-0.13, 0.205, 2.279);
  root.add(front_sensor);

  const front_cameraMat = new THREE.MeshStandardMaterial({
    color: 0x142b42,
    metalness: 0.0,
    roughness: 0.3
  });
  const front_cameraGeom = new THREE.CircleGeometry(0.033, 16);
  const front_camera = new THREE.Mesh(front_cameraGeom, front_cameraMat);
  front_camera.scale.set(1.15, 0.62, 1);
  front_camera.position.set(0.14, 0.205, 0.28);
  root.add(front_camera);

  const power_iconMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.0,
    roughness: 0.7
  });
  const power_icon_ringGeom = new THREE.TorusGeometry(
    0.073,
    0.011,
    8,
    24,
    Math.PI * 1.55
  );
  const power_icon_ring = new THREE.Mesh(
    power_icon_ringGeom,
    power_iconMat
  );
  power_icon_ring.rotation.x = Math.PI / 2;
  power_icon_ring.rotation.z = -Math.PI * 0.28;
  power_icon_ring.position.set(0, 0.449, 1.43);
  root.add(power_icon_ring);

  const power_icon_barGeom = new THREE.BoxGeometry(0.018, 0.007, 0.072);
  const power_icon_bar = new THREE.Mesh(power_icon_barGeom, power_iconMat);
  power_icon_bar.position.set(0, 0.45, 1.375);
  root.add(power_icon_bar);

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