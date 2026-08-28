export default function generate(THREE) {
  const root = new THREE.Group();
  const tablet_group = new THREE.Group();
  const keyboard_group = new THREE.Group();
  root.add(tablet_group, keyboard_group);

  const tabletW = 3.4;
  const tabletD = 2.3;
  const tabletH = 0.16;
  const tabletCenterZ = -0.28;
  const keyboardW = 2.45;
  const keyboardD = 1.05;
  const keyboardH = 0.14;
  const keyboardCenterX = 0.25;
  const keyboardCenterZ = 1.0;

  const tablet_chassisMat = new THREE.MeshStandardMaterial({
    color: 0x55585e,
    metalness: 0.6,
    roughness: 0.5
  });
  const tablet_edgeMat = new THREE.MeshStandardMaterial({
    color: 0x34373c,
    metalness: 0.6,
    roughness: 0.5
  });
  const top_bezelMat = new THREE.MeshStandardMaterial({
    color: 0x4a4d52,
    metalness: 0.6,
    roughness: 0.5
  });
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0xdce7e6,
    metalness: 0.0,
    roughness: 0.3
  });
  const screen_footerMat = new THREE.MeshStandardMaterial({
    color: 0xa9c0be,
    metalness: 0.0,
    roughness: 0.3
  });
  const screen_logoMat = new THREE.MeshStandardMaterial({
    color: 0xb7c1c0,
    metalness: 0.0,
    roughness: 0.3
  });
  const portMat = new THREE.MeshStandardMaterial({
    color: 0x101215,
    metalness: 0.0,
    roughness: 0.8
  });
  const port_innerMat = new THREE.MeshStandardMaterial({
    color: 0x30343a,
    metalness: 0.0,
    roughness: 0.8
  });
  const connectorMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const keyboard_trayMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const keyboard_wellMat = new THREE.MeshStandardMaterial({
    color: 0x282b2f,
    metalness: 0.0,
    roughness: 0.8
  });
  const keyboard_keysMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const keyboard_legendsMat = new THREE.MeshStandardMaterial({
    color: 0x34383c,
    metalness: 0.0,
    roughness: 0.8
  });

  function roundedRectShape(width, height, radius) {
    const shape = new THREE.Shape();
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const r = Math.min(radius, width / 2, height / 2);

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

  function horizontalRoundedGeometry(width, depth, height, radius, bevel) {
    const shape = roundedRectShape(width, depth, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: height,
      steps: 1,
      curveSegments: 8,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 2
    });
    geometry.translate(0, 0, -height / 2);
    geometry.rotateX(-Math.PI / 2);
    return geometry;
  }

  function verticalRoundedGeometry(width, height, depth, radius, bevel) {
    const shape = roundedRectShape(width, height, radius);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth,
      steps: 1,
      curveSegments: 6,
      bevelEnabled: bevel > 0,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 1
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const tablet_lower_chassisGeom = horizontalRoundedGeometry(
    tabletW,
    tabletD,
    tabletH,
    0.13,
    0.025
  );
  const tablet_lower_chassis = new THREE.Mesh(
    tablet_lower_chassisGeom,
    tablet_chassisMat
  );
  tablet_lower_chassis.position.set(0, 0.12, tabletCenterZ);
  tablet_group.add(tablet_lower_chassis);

  const tablet_bottom_panelGeom = horizontalRoundedGeometry(
    tabletW - 0.08,
    tabletD - 0.08,
    0.025,
    0.11,
    0.006
  );
  const tablet_bottom_panel = new THREE.Mesh(
    tablet_bottom_panelGeom,
    tablet_edgeMat
  );
  tablet_bottom_panel.position.set(0, 0.045, tabletCenterZ);
  tablet_group.add(tablet_bottom_panel);

  const tablet_seam_bandGeom = horizontalRoundedGeometry(
    tabletW + 0.01,
    tabletD + 0.01,
    0.025,
    0.13,
    0.004
  );
  const tablet_seam_band = new THREE.Mesh(
    tablet_seam_bandGeom,
    tablet_edgeMat
  );
  tablet_seam_band.position.set(0, 0.205, tabletCenterZ);
  tablet_group.add(tablet_seam_band);

  const tablet_top_bezelGeom = horizontalRoundedGeometry(
    tabletW - 0.04,
    tabletD - 0.04,
    0.055,
    0.12,
    0.012
  );
  const tablet_top_bezel = new THREE.Mesh(
    tablet_top_bezelGeom,
    top_bezelMat
  );
  tablet_top_bezel.position.set(0, 0.235, tabletCenterZ);
  tablet_group.add(tablet_top_bezel);

  const screenW = 2.88;
  const screenD = 1.72;
  const screenCenterZ = -0.32;

  const screenGeom = horizontalRoundedGeometry(
    screenW,
    screenD,
    0.012,
    0.035,
    0.002
  );
  const screen = new THREE.Mesh(screenGeom, screenMat);
  screen.position.set(0, 0.279, screenCenterZ);
  tablet_group.add(screen);

  const screen_footerGeom = new THREE.BoxGeometry(
    screenW - 0.04,
    0.006,
    0.31
  );
  const screen_footer = new THREE.Mesh(
    screen_footerGeom,
    screen_footerMat
  );
  screen_footer.position.set(
    0,
    0.29,
    screenCenterZ + screenD / 2 - 0.165
  );
  tablet_group.add(screen_footer);

  const screen_logoGeom = new THREE.BoxGeometry(0.22, 0.004, 0.014);
  const screen_logo = new THREE.Mesh(screen_logoGeom, screen_logoMat);
  screen_logo.position.set(0, 0.291, screenCenterZ);
  tablet_group.add(screen_logo);

  const screen_logo_centerGeom = new THREE.BoxGeometry(
    0.014,
    0.004,
    0.052
  );
  const screen_logo_center = new THREE.Mesh(
    screen_logo_centerGeom,
    screen_logoMat
  );
  screen_logo_center.position.set(0, 0.292, screenCenterZ);
  tablet_group.add(screen_logo_center);

  const screen_power_iconGeom = new THREE.RingGeometry(
    0.025,
    0.034,
    20,
    1,
    Math.PI * 0.75,
    Math.PI * 1.5
  );
  const screen_power_icon = new THREE.Mesh(
    screen_power_iconGeom,
    connectorMat
  );
  screen_power_icon.rotation.x = -Math.PI / 2;
  screen_power_icon.position.set(
    -1.12,
    0.296,
    screenCenterZ + screenD / 2 - 0.17
  );
  tablet_group.add(screen_power_icon);

  const screen_power_stemGeom = new THREE.BoxGeometry(
    0.009,
    0.004,
    0.035
  );
  const screen_power_stem = new THREE.Mesh(
    screen_power_stemGeom,
    connectorMat
  );
  screen_power_stem.position.set(
    -1.12,
    0.297,
    screenCenterZ + screenD / 2 - 0.195
  );
  tablet_group.add(screen_power_stem);

  const screen_status_leftGeom = new THREE.BoxGeometry(
    0.055,
    0.004,
    0.012
  );
  const screen_status_left = new THREE.Mesh(
    screen_status_leftGeom,
    connectorMat
  );
  screen_status_left.position.set(
    1.02,
    0.296,
    screenCenterZ + screenD / 2 - 0.18
  );
  tablet_group.add(screen_status_left);

  const screen_status_rightGeom = new THREE.BoxGeometry(
    0.032,
    0.004,
    0.012
  );
  const screen_status_right = new THREE.Mesh(
    screen_status_rightGeom,
    connectorMat
  );
  screen_status_right.position.set(
    1.1,
    0.296,
    screenCenterZ + screenD / 2 - 0.18
  );
  tablet_group.add(screen_status_right);

  const camera_ringGeom = new THREE.RingGeometry(0.01, 0.019, 16);
  const camera_ring = new THREE.Mesh(camera_ringGeom, tablet_edgeMat);
  camera_ring.rotation.x = -Math.PI / 2;
  camera_ring.position.set(
    -1.12,
    0.28,
    tabletCenterZ - tabletD / 2 + 0.11
  );
  tablet_group.add(camera_ring);

  const camera_lensGeom = new THREE.CircleGeometry(0.008, 16);
  const camera_lens = new THREE.Mesh(camera_lensGeom, portMat);
  camera_lens.rotation.x = -Math.PI / 2;
  camera_lens.position.set(
    -1.12,
    0.281,
    tabletCenterZ - tabletD / 2 + 0.11
  );
  tablet_group.add(camera_lens);

  const front_edge_z = tabletCenterZ + tabletD / 2;

  const usb_c_rimGeom = verticalRoundedGeometry(
    0.22,
    0.066,
    0.014,
    0.026,
    0
  );
  const usb_c_rim = new THREE.Mesh(usb_c_rimGeom, tablet_edgeMat);
  usb_c_rim.position.set(-1.48, 0.13, front_edge_z + 0.025);
  tablet_group.add(usb_c_rim);

  const usb_c_portGeom = verticalRoundedGeometry(
    0.18,
    0.042,
    0.012,
    0.018,
    0
  );
  const usb_c_port = new THREE.Mesh(usb_c_portGeom, portMat);
  usb_c_port.position.set(-1.48, 0.13, front_edge_z + 0.034);
  tablet_group.add(usb_c_port);

  const usb_c_tongueGeom = new THREE.BoxGeometry(
    0.1,
    0.01,
    0.008
  );
  const usb_c_tongue = new THREE.Mesh(
    usb_c_tongueGeom,
    port_innerMat
  );
  usb_c_tongue.position.set(-1.48, 0.13, front_edge_z + 0.041);
  tablet_group.add(usb_c_tongue);

  const front_hdmi_portGeom = verticalRoundedGeometry(
    0.31,
    0.115,
    0.014,
    0.035,
    0
  );
  const front_hdmi_port = new THREE.Mesh(
    front_hdmi_portGeom,
    portMat
  );
  front_hdmi_port.position.set(-0.87, 0.13, front_edge_z + 0.026);
  tablet_group.add(front_hdmi_port);

  const front_hdmi_innerGeom = verticalRoundedGeometry(
    0.25,
    0.075,
    0.01,
    0.022,
    0
  );
  const front_hdmi_inner = new THREE.Mesh(
    front_hdmi_innerGeom,
    port_innerMat
  );
  front_hdmi_inner.position.set(-0.87, 0.13, front_edge_z + 0.035);
  tablet_group.add(front_hdmi_inner);

  const front_hdmi_contactGeom = new THREE.BoxGeometry(
    0.18,
    0.016,
    0.007
  );
  const front_hdmi_contact = new THREE.Mesh(
    front_hdmi_contactGeom,
    connectorMat
  );
  front_hdmi_contact.position.set(
    -0.87,
    0.105,
    front_edge_z + 0.042
  );
  tablet_group.add(front_hdmi_contact);

  const front_card_slotGeom = verticalRoundedGeometry(
    0.17,
    0.055,
    0.012,
    0.008,
    0
  );
  const front_card_slot = new THREE.Mesh(
    front_card_slotGeom,
    portMat
  );
  front_card_slot.position.set(-0.43, 0.13, front_edge_z + 0.03);
  tablet_group.add(front_card_slot);

  const front_usb_rimGeom = verticalRoundedGeometry(
    0.28,
    0.09,
    0.014,
    0.018,
    0
  );
  const front_usb_rim = new THREE.Mesh(
    front_usb_rimGeom,
    tablet_edgeMat
  );
  front_usb_rim.position.set(0.72, 0.13, front_edge_z + 0.025);
  tablet_group.add(front_usb_rim);

  const front_usb_portGeom = verticalRoundedGeometry(
    0.23,
    0.055,
    0.012,
    0.012,
    0
  );
  const front_usb_port = new THREE.Mesh(
    front_usb_portGeom,
    portMat
  );
  front_usb_port.position.set(0.72, 0.13, front_edge_z + 0.035);
  tablet_group.add(front_usb_port);

  const front_usb_contactGeom = new THREE.BoxGeometry(
    0.16,
    0.014,
    0.007
  );
  const front_usb_contact = new THREE.Mesh(
    front_usb_contactGeom,
    connectorMat
  );
  front_usb_contact.position.set(
    0.72,
    0.118,
    front_edge_z + 0.042
  );
  tablet_group.add(front_usb_contact);

  const front_power_jackGeom = new THREE.CylinderGeometry(
    0.043,
    0.043,
    0.018,
    18
  );
  const front_power_jack = new THREE.Mesh(
    front_power_jackGeom,
    portMat
  );
  front_power_jack.rotation.x = Math.PI / 2;
  front_power_jack.position.set(
    1.18,
    0.13,
    front_edge_z + 0.035
  );
  tablet_group.add(front_power_jack);

  const front_power_pinGeom = new THREE.CylinderGeometry(
    0.009,
    0.009,
    0.021,
    12
  );
  const front_power_pin = new THREE.Mesh(
    front_power_pinGeom,
    connectorMat
  );
  front_power_pin.rotation.x = Math.PI / 2;
  front_power_pin.position.set(
    1.18,
    0.13,
    front_edge_z + 0.045
  );
  tablet_group.add(front_power_pin);

  const front_status_lightGeom = new THREE.BoxGeometry(
    0.045,
    0.012,
    0.009
  );
  const front_status_light = new THREE.Mesh(
    front_status_lightGeom,
    screen_footerMat
  );
  front_status_light.position.set(
    1.48,
    0.15,
    front_edge_z + 0.038
  );
  tablet_group.add(front_status_light);

  const left_side_x = -tabletW / 2;

  const side_vent_plateGeom = new THREE.BoxGeometry(
    0.014,
    0.07,
    0.48
  );
  const side_vent_plate = new THREE.Mesh(
    side_vent_plateGeom,
    tablet_edgeMat
  );
  side_vent_plate.position.set(
    left_side_x - 0.018,
    0.13,
    -0.78
  );
  tablet_group.add(side_vent_plate);

  const side_vent_slotsGeom = new THREE.BoxGeometry(
    0.012,
    0.012,
    0.055
  );
  const side_vent_slots = new THREE.InstancedMesh(
    side_vent_slotsGeom,
    portMat,
    6
  );
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    vent_dummy.position.set(
      left_side_x - 0.028,
      0.13,
      -0.94 + i * 0.064
    );
    vent_dummy.rotation.set(0, 0, 0);
    vent_dummy.scale.set(1, 1, 1);
    vent_dummy.updateMatrix();
    side_vent_slots.setMatrixAt(i, vent_dummy.matrix);
  }
  side_vent_slots.instanceMatrix.needsUpdate = true;
  tablet_group.add(side_vent_slots);

  const left_usb_portGeom = new THREE.BoxGeometry(
    0.014,
    0.06,
    0.22
  );
  const left_usb_port = new THREE.Mesh(
    left_usb_portGeom,
    portMat
  );
  left_usb_port.position.set(
    left_side_x - 0.026,
    0.13,
    -0.2
  );
  tablet_group.add(left_usb_port);

  const left_usb_contactGeom = new THREE.BoxGeometry(
    0.008,
    0.018,
    0.15
  );
  const left_usb_contact = new THREE.Mesh(
    left_usb_contactGeom,
    connectorMat
  );
  left_usb_contact.position.set(
    left_side_x - 0.035,
    0.118,
    -0.2
  );
  tablet_group.add(left_usb_contact);

  const left_audio_jackGeom = new THREE.CylinderGeometry(
    0.04,
    0.04,
    0.018,
    18
  );
  const left_audio_jack = new THREE.Mesh(
    left_audio_jackGeom,
    portMat
  );
  left_audio_jack.rotation.z = Math.PI / 2;
  left_audio_jack.position.set(
    left_side_x - 0.032,
    0.13,
    0.2
  );
  tablet_group.add(left_audio_jack);

  const left_audio_ringGeom = new THREE.TorusGeometry(
    0.041,
    0.006,
    8,
    20
  );
  const left_audio_ring = new THREE.Mesh(
    left_audio_ringGeom,
    connectorMat
  );
  left_audio_ring.rotation.y = Math.PI / 2;
  left_audio_ring.position.set(
    left_side_x - 0.042,
    0.13,
    0.2
  );
  tablet_group.add(left_audio_ring);

  const left_power_portGeom = new THREE.BoxGeometry(
    0.014,
    0.065,
    0.16
  );
  const left_power_port = new THREE.Mesh(
    left_power_portGeom,
    portMat
  );
  left_power_port.position.set(
    left_side_x - 0.026,
    0.13,
    0.52
  );
  tablet_group.add(left_power_port);

  const keyboard_supportsGeom = new THREE.CylinderGeometry(
    0.025,
    0.025,
    0.18,
    10
  );
  const keyboard_supports = new THREE.InstancedMesh(
    keyboard_supportsGeom,
    tablet_edgeMat,
    2
  );
  const support_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    support_dummy.position.set(
      keyboardCenterX + (i === 0 ? -0.92 : 0.92),
      0.085,
      0.62
    );
    support_dummy.rotation.set(0, 0, 0);
    support_dummy.scale.set(1, 1, 1);
    support_dummy.updateMatrix();
    keyboard_supports.setMatrixAt(i, support_dummy.matrix);
  }
  keyboard_supports.instanceMatrix.needsUpdate = true;
  keyboard_group.add(keyboard_supports);

  const keyboard_trayGeom = horizontalRoundedGeometry(
    keyboardW,
    keyboardD,
    keyboardH,
    0.065,
    0.012
  );
  const keyboard_tray = new THREE.Mesh(
    keyboard_trayGeom,
    keyboard_trayMat
  );
  keyboard_tray.position.set(
    keyboardCenterX,
    0.035,
    keyboardCenterZ
  );
  keyboard_group.add(keyboard_tray);

  const keyboard_wellGeom = horizontalRoundedGeometry(
    keyboardW - 0.08,
    keyboardD - 0.07,
    0.02,
    0.045,
    0.004
  );
  const keyboard_well = new THREE.Mesh(
    keyboard_wellGeom,
    keyboard_wellMat
  );
  keyboard_well.position.set(
    keyboardCenterX,
    0.119,
    keyboardCenterZ - 0.015
  );
  keyboard_group.add(keyboard_well);

  const keyboard_front_lipGeom = new THREE.BoxGeometry(
    keyboardW - 0.04,
    0.075,
    0.035
  );
  const keyboard_front_lip = new THREE.Mesh(
    keyboard_front_lipGeom,
    keyboard_trayMat
  );
  keyboard_front_lip.position.set(
    keyboardCenterX,
    0.035,
    keyboardCenterZ + keyboardD / 2
  );
  keyboard_group.add(keyboard_front_lip);

  const key_layout = [];
  for (let row = 0; row < 4; row++) {
    const count = 11 - Math.floor(row / 2);
    const start_x = keyboardCenterX - 1.02 + row * 0.035;
    for (let column = 0; column < count; column++) {
      key_layout.push({
        x: start_x + column * 0.2,
        z: 0.69 + row * 0.19,
        rx: 0,
        rz: 0
      });
    }
  }

  const bottom_key_x = [
    keyboardCenterX - 1.03,
    keyboardCenterX - 0.82,
    keyboardCenterX - 0.61,
    keyboardCenterX + 0.61,
    keyboardCenterX + 0.82,
    keyboardCenterX + 1.03
  ];
  for (let i = 0; i < bottom_key_x.length; i++) {
    key_layout.push({
      x: bottom_key_x[i],
      z: 1.3,
      rx: 0,
      rz: 0
    });
  }

  const keyboard_keysGeom = horizontalRoundedGeometry(
    0.17,
    0.15,
    0.04,
    0.018,
    0.006
  );
  const keyboard_keys = new THREE.InstancedMesh(
    keyboard_keysGeom,
    keyboard_keysMat,
    key_layout.length
  );
  const key_dummy = new THREE.Object3D();
  for (let i = 0; i < key_layout.length; i++) {
    const key = key_layout[i];
    key_dummy.position.set(key.x, 0.158, key.z);
    key_dummy.rotation.set(key.rx, 0, key.rz);
    key_dummy.scale.set(1, 1, 1);
    key_dummy.updateMatrix();
    keyboard_keys.setMatrixAt(i, key_dummy.matrix);
  }
  keyboard_keys.instanceMatrix.needsUpdate = true;
  keyboard_group.add(keyboard_keys);

  const keyboard_legendsGeom = new THREE.BoxGeometry(
    0.045,
    0.004,
    0.009
  );
  const keyboard_legends = new THREE.InstancedMesh(
    keyboard_legendsGeom,
    keyboard_legendsMat,
    key_layout.length
  );
  const legend_dummy = new THREE.Object3D();
  for (let i = 0; i < key_layout.length; i++) {
    const key = key_layout[i];
    legend_dummy.position.set(key.x, 0.187, key.z);
    legend_dummy.rotation.set(key.rx, 0, key.rz);
    legend_dummy.scale.set(1, 1, 1);
    legend_dummy.updateMatrix();
    keyboard_legends.setMatrixAt(i, legend_dummy.matrix);
  }
  keyboard_legends.instanceMatrix.needsUpdate = true;
  keyboard_group.add(keyboard_legends);

  const spacebarGeom = horizontalRoundedGeometry(
    0.72,
    0.15,
    0.04,
    0.018,
    0.006
  );
  const spacebar = new THREE.Mesh(spacebarGeom, keyboard_keysMat);
  spacebar.position.set(keyboardCenterX, 0.158, 1.3);
  keyboard_group.add(spacebar);

  const spacebar_legendGeom = new THREE.BoxGeometry(
    0.22,
    0.004,
    0.008
  );
  const spacebar_legend = new THREE.Mesh(
    spacebar_legendGeom,
    keyboard_legendsMat
  );
  spacebar_legend.position.set(keyboardCenterX, 0.187, 1.3);
  keyboard_group.add(spacebar_legend);

  const keyboard_usb_rimGeom = verticalRoundedGeometry(
    0.25,
    0.07,
    0.012,
    0.014,
    0
  );
  const keyboard_usb_rim = new THREE.Mesh(
    keyboard_usb_rimGeom,
    tablet_edgeMat
  );
  keyboard_usb_rim.position.set(
    keyboardCenterX - 0.58,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.02
  );
  keyboard_group.add(keyboard_usb_rim);

  const keyboard_usb_portGeom = verticalRoundedGeometry(
    0.2,
    0.043,
    0.01,
    0.01,
    0
  );
  const keyboard_usb_port = new THREE.Mesh(
    keyboard_usb_portGeom,
    portMat
  );
  keyboard_usb_port.position.set(
    keyboardCenterX - 0.58,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.028
  );
  keyboard_group.add(keyboard_usb_port);

  const keyboard_usb_contactGeom = new THREE.BoxGeometry(
    0.14,
    0.012,
    0.006
  );
  const keyboard_usb_contact = new THREE.Mesh(
    keyboard_usb_contactGeom,
    connectorMat
  );
  keyboard_usb_contact.position.set(
    keyboardCenterX - 0.58,
    0.03,
    keyboardCenterZ + keyboardD / 2 + 0.035
  );
  keyboard_group.add(keyboard_usb_contact);

  const keyboard_card_slotGeom = verticalRoundedGeometry(
    0.22,
    0.045,
    0.01,
    0.006,
    0
  );
  const keyboard_card_slot = new THREE.Mesh(
    keyboard_card_slotGeom,
    portMat
  );
  keyboard_card_slot.position.set(
    keyboardCenterX - 0.18,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.027
  );
  keyboard_group.add(keyboard_card_slot);

  const keyboard_hdmi_portGeom = verticalRoundedGeometry(
    0.27,
    0.08,
    0.012,
    0.02,
    0
  );
  const keyboard_hdmi_port = new THREE.Mesh(
    keyboard_hdmi_portGeom,
    portMat
  );
  keyboard_hdmi_port.position.set(
    keyboardCenterX + 0.2,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.02
  );
  keyboard_group.add(keyboard_hdmi_port);

  const keyboard_hdmi_innerGeom = verticalRoundedGeometry(
    0.21,
    0.05,
    0.009,
    0.014,
    0
  );
  const keyboard_hdmi_inner = new THREE.Mesh(
    keyboard_hdmi_innerGeom,
    port_innerMat
  );
  keyboard_hdmi_inner.position.set(
    keyboardCenterX + 0.2,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.03
  );
  keyboard_group.add(keyboard_hdmi_inner);

  const keyboard_power_jackGeom = new THREE.CylinderGeometry(
    0.035,
    0.035,
    0.016,
    16
  );
  const keyboard_power_jack = new THREE.Mesh(
    keyboard_power_jackGeom,
    portMat
  );
  keyboard_power_jack.rotation.x = Math.PI / 2;
  keyboard_power_jack.position.set(
    keyboardCenterX + 0.62,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.03
  );
  keyboard_group.add(keyboard_power_jack);

  const keyboard_power_pinGeom = new THREE.CylinderGeometry(
    0.008,
    0.008,
    0.019,
    10
  );
  const keyboard_power_pin = new THREE.Mesh(
    keyboard_power_pinGeom,
    connectorMat
  );
  keyboard_power_pin.rotation.x = Math.PI / 2;
  keyboard_power_pin.position.set(
    keyboardCenterX + 0.62,
    0.04,
    keyboardCenterZ + keyboardD / 2 + 0.039
  );
  keyboard_group.add(keyboard_power_pin);

  const keyboard_status_lightGeom = new THREE.BoxGeometry(
    0.035,
    0.012,
    0.008
  );
  const keyboard_status_light = new THREE.Mesh(
    keyboard_status_lightGeom,
    screen_footerMat
  );
  keyboard_status_light.position.set(
    keyboardCenterX + 0.86,
    0.055,
    keyboardCenterZ + keyboardD / 2 + 0.032
  );
  keyboard_group.add(keyboard_status_light);

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

  fitToUnitCube(THREE, root);
  return root;
}