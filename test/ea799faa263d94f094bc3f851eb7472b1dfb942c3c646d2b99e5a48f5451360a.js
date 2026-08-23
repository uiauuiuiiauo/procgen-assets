export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "spherical_device";

  const bodyR = 1.0;
  const bodyCenterY = 0.02;
  const bodyScaleY = 0.97;

  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff5a0a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const seamMat = new THREE.MeshStandardMaterial({
    color: 0xb93408,
    metalness: 0.0,
    roughness: 0.8,
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x171717,
    metalness: 0.0,
    roughness: 0.8,
  });
  const apertureMat = new THREE.MeshStandardMaterial({
    color: 0x030303,
    metalness: 0.0,
    roughness: 0.8,
  });
  const amberLensMat = new THREE.MeshStandardMaterial({
    color: 0xffb13b,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xff8a00,
    emissiveIntensity: 1.0,
  });
  const whiteLedMat = new THREE.MeshStandardMaterial({
    color: 0xfff4c7,
    metalness: 0.0,
    roughness: 0.3,
    emissive: 0xfff4c7,
    emissiveIntensity: 1.0,
  });
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ed,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide,
  });

  function ellipsoidPose(phi, theta, offset) {
    const sinPhi = Math.sin(phi);
    const x = bodyR * sinPhi * Math.sin(theta);
    const y = bodyCenterY + bodyR * bodyScaleY * Math.cos(phi);
    const z = bodyR * sinPhi * Math.cos(theta);
    const normal = new THREE.Vector3(
      x,
      (y - bodyCenterY) / (bodyScaleY * bodyScaleY),
      z
    ).normalize();
    const position = new THREE.Vector3(x, y, z).addScaledVector(normal, offset);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      normal
    );
    return { position, normal, quaternion };
  }

  const upper_shellGeom = new THREE.SphereGeometry(
    bodyR, 64, 24, 0, Math.PI * 2, 0, Math.PI / 2
  );
  const upper_shell = new THREE.Mesh(upper_shellGeom, orangeMat);
  upper_shell.name = "upper_shell";
  upper_shell.position.y = bodyCenterY;
  upper_shell.scale.y = bodyScaleY;
  root.add(upper_shell);

  const lower_shellGeom = new THREE.SphereGeometry(
    bodyR, 64, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2
  );
  const lower_shell = new THREE.Mesh(lower_shellGeom, orangeMat);
  lower_shell.name = "lower_shell";
  lower_shell.position.y = bodyCenterY;
  lower_shell.scale.y = bodyScaleY;
  root.add(lower_shell);

  const equatorial_seamGeom = new THREE.TorusGeometry(0.994, 0.008, 8, 96);
  const equatorial_seam = new THREE.Mesh(equatorial_seamGeom, seamMat);
  equatorial_seam.name = "equatorial_seam";
  equatorial_seam.rotation.x = Math.PI / 2;
  equatorial_seam.position.y = bodyCenterY;
  root.add(equatorial_seam);

  const left_port = new THREE.Group();
  left_port.name = "left_port";
  const leftPortPose = ellipsoidPose(Math.PI / 2, -Math.PI / 2, 0.012);
  left_port.position.copy(leftPortPose.position);
  left_port.quaternion.copy(leftPortPose.quaternion);
  root.add(left_port);

  const left_port_mountGeom = new THREE.SphereGeometry(1, 24, 12);
  const left_port_mount = new THREE.Mesh(left_port_mountGeom, orangeMat);
  left_port_mount.name = "left_port_mount";
  left_port_mount.scale.set(0.13, 0.13, 0.045);
  left_port_mount.position.z = 0.01;
  left_port.add(left_port_mount);

  const left_port_ringGeom = new THREE.TorusGeometry(0.068, 0.027, 12, 32);
  const left_port_ring = new THREE.Mesh(left_port_ringGeom, rubberMat);
  left_port_ring.name = "left_port_ring";
  left_port_ring.position.z = 0.073;
  left_port.add(left_port_ring);

  const left_port_apertureGeom = new THREE.CircleGeometry(0.047, 32);
  const left_port_aperture = new THREE.Mesh(left_port_apertureGeom, apertureMat);
  left_port_aperture.name = "left_port_aperture";
  left_port_aperture.position.z = 0.075;
  left_port.add(left_port_aperture);

  const left_port_inner_rimGeom = new THREE.TorusGeometry(0.039, 0.006, 8, 28);
  const left_port_inner_rim = new THREE.Mesh(left_port_inner_rimGeom, seamMat);
  left_port_inner_rim.name = "left_port_inner_rim";
  left_port_inner_rim.position.z = 0.078;
  left_port.add(left_port_inner_rim);

  const right_connector = new THREE.Group();
  right_connector.name = "right_connector";
  const rightConnectorPose = ellipsoidPose(Math.PI / 2, Math.PI / 2, 0.012);
  right_connector.position.copy(rightConnectorPose.position);
  right_connector.quaternion.copy(rightConnectorPose.quaternion);
  root.add(right_connector);

  const right_connector_mountGeom = new THREE.SphereGeometry(1, 24, 12);
  const right_connector_mount = new THREE.Mesh(right_connector_mountGeom, orangeMat);
  right_connector_mount.name = "right_connector_mount";
  right_connector_mount.scale.set(0.12, 0.12, 0.045);
  right_connector_mount.position.z = 0.01;
  right_connector.add(right_connector_mount);

  const right_connector_capGeom = new THREE.CylinderGeometry(0.078, 0.078, 0.055, 24);
  const right_connector_cap = new THREE.Mesh(right_connector_capGeom, rubberMat);
  right_connector_cap.name = "right_connector_cap";
  right_connector_cap.rotation.x = Math.PI / 2;
  right_connector_cap.position.z = 0.065;
  right_connector.add(right_connector_cap);

  const right_connector_faceGeom = new THREE.CircleGeometry(0.057, 24);
  const right_connector_face = new THREE.Mesh(right_connector_faceGeom, apertureMat);
  right_connector_face.name = "right_connector_face";
  right_connector_face.position.z = 0.095;
  right_connector.add(right_connector_face);

  function createIndicator(name, phi, theta, size) {
    const indicator = new THREE.Group();
    indicator.name = name;
    const pose = ellipsoidPose(phi, theta, 0.012);
    indicator.position.copy(pose.position);
    indicator.quaternion.copy(pose.quaternion);

    const indicator_mountGeom = new THREE.SphereGeometry(1, 24, 12);
    const indicator_mount = new THREE.Mesh(indicator_mountGeom, orangeMat);
    indicator_mount.name = name + "_mount";
    indicator_mount.scale.set(size * 1.08, size * 1.08, 0.04);
    indicator_mount.position.z = 0.008;
    indicator.add(indicator_mount);

    const indicator_bezelGeom = new THREE.TorusGeometry(size * 0.72, size * 0.15, 10, 32);
    const indicator_bezel = new THREE.Mesh(indicator_bezelGeom, orangeMat);
    indicator_bezel.name = name + "_bezel";
    indicator_bezel.position.z = 0.052;
    indicator.add(indicator_bezel);

    const indicator_lensGeom = new THREE.CylinderGeometry(size * 0.62, size * 0.62, 0.032, 28);
    const indicator_lens = new THREE.Mesh(indicator_lensGeom, amberLensMat);
    indicator_lens.name = name + "_lens";
    indicator_lens.rotation.x = Math.PI / 2;
    indicator_lens.position.z = 0.064;
    indicator.add(indicator_lens);

    const indicator_ledGeom = new THREE.CircleGeometry(size * 0.27, 20);
    const indicator_led = new THREE.Mesh(indicator_ledGeom, whiteLedMat);
    indicator_led.name = name + "_led";
    indicator_led.position.z = 0.082;
    indicator.add(indicator_led);

    root.add(indicator);
    return indicator;
  }

  const upper_left_indicator = createIndicator(
    "upper_left_indicator", 1.12, -0.92, 0.15
  );
  const lower_right_indicator = createIndicator(
    "lower_right_indicator", 1.72, 0.88, 0.135
  );
  const upper_right_indicator = createIndicator(
    "upper_right_indicator", 1.12, 0.98, 0.105
  );

  const vent_slotGeom = new THREE.SphereGeometry(1, 12, 6);
  const vent_slots = new THREE.InstancedMesh(vent_slotGeom, apertureMat, 5);
  vent_slots.name = "vent_slots";
  const ventData = [
    [1.88, -0.66, 0.010, 0.042],
    [1.96, -0.58, 0.010, 0.050],
    [2.04, -0.50, 0.010, 0.056],
    [2.12, -0.42, 0.010, 0.052],
    [1.86, 0.73, 0.009, 0.038],
  ];
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < ventData.length; i++) {
    const data = ventData[i];
    const pose = ellipsoidPose(data[0], data[1], 0.008);
    vent_dummy.position.copy(pose.position);
    vent_dummy.quaternion.copy(pose.quaternion);
    vent_dummy.scale.set(data[2], data[3], 0.006);
    vent_dummy.updateMatrix();
    vent_slots.setMatrixAt(i, vent_dummy.matrix);
  }
  vent_slots.instanceMatrix.needsUpdate = true;
  root.add(vent_slots);

  const warning_label = new THREE.Group();
  warning_label.name = "warning_label";
  const warningLabelPose = ellipsoidPose(2.02, -0.70, 0.012);
  warning_label.position.copy(warningLabelPose.position);
  warning_label.quaternion.copy(warningLabelPose.quaternion);
  warning_label.rotateZ(-0.28);
  root.add(warning_label);

  const warning_label_plateGeom = new THREE.PlaneGeometry(0.12, 0.18);
  const warning_label_plate = new THREE.Mesh(warning_label_plateGeom, labelMat);
  warning_label_plate.name = "warning_label_plate";
  warning_label.add(warning_label_plate);

  const warning_mark_leftGeom = new THREE.BoxGeometry(0.012, 0.075, 0.004);
  const warning_mark_left = new THREE.Mesh(warning_mark_leftGeom, orangeMat);
  warning_mark_left.name = "warning_mark_left";
  warning_mark_left.position.set(-0.024, 0.006, 0.004);
  warning_mark_left.rotation.z = -0.48;
  warning_label.add(warning_mark_left);

  const warning_mark_rightGeom = new THREE.BoxGeometry(0.012, 0.075, 0.004);
  const warning_mark_right = new THREE.Mesh(warning_mark_rightGeom, orangeMat);
  warning_mark_right.name = "warning_mark_right";
  warning_mark_right.position.set(0.024, 0.006, 0.004);
  warning_mark_right.rotation.z = 0.48;
  warning_label.add(warning_mark_right);

  const warning_mark_baseGeom = new THREE.BoxGeometry(0.056, 0.010, 0.004);
  const warning_mark_base = new THREE.Mesh(warning_mark_baseGeom, orangeMat);
  warning_mark_base.name = "warning_mark_base";
  warning_mark_base.position.set(0, -0.023, 0.004);
  warning_label.add(warning_mark_base);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}