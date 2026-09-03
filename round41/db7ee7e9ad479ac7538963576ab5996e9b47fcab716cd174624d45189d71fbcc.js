export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "cylindrical_appliance";

  const bodyR = 0.50;
  const bodyBottom = 0.43;
  const bodyTop = 2.21;
  const bodyH = bodyTop - bodyBottom;
  const bodyY = bodyBottom + bodyH / 2;

  const main_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5,
  });
  const silver_trimMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const dark_metalMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a,
    metalness: 0.6,
    roughness: 0.5,
  });
  const black_rubberMat = new THREE.MeshStandardMaterial({
    color: 0x17191a,
    metalness: 0.0,
    roughness: 0.8,
  });
  const lcd_screenMat = new THREE.MeshStandardMaterial({
    color: 0x52605a,
    metalness: 0.0,
    roughness: 0.3,
  });
  const display_segmentsMat = new THREE.MeshStandardMaterial({
    color: 0xb8e6a0,
    emissive: 0xb8e6a0,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5,
  });
  const green_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x19c786,
    metalness: 0.0,
    roughness: 0.3,
  });

  function roundedRectShape(width, height, radius) {
    const x0 = -width / 2;
    const x1 = width / 2;
    const y0 = -height / 2;
    const y1 = height / 2;
    const shape = new THREE.Shape();
    shape.moveTo(x0 + radius, y0);
    shape.lineTo(x1 - radius, y0);
    shape.quadraticCurveTo(x1, y0, x1, y0 + radius);
    shape.lineTo(x1, y1 - radius);
    shape.quadraticCurveTo(x1, y1, x1 - radius, y1);
    shape.lineTo(x0 + radius, y1);
    shape.quadraticCurveTo(x0, y1, x0, y1 - radius);
    shape.lineTo(x0, y0 + radius);
    shape.quadraticCurveTo(x0, y0, x0 + radius, y0);
    return shape;
  }

  function createRoundedPlateGeometry(width, height, radius, depth, bevelSize) {
    const geometry = new THREE.ExtrudeGeometry(
      roundedRectShape(width, height, radius),
      {
        depth,
        steps: 1,
        curveSegments: 12,
        bevelEnabled: bevelSize > 0,
        bevelThickness: bevelSize * 0.6,
        bevelSize,
        bevelSegments: 2,
      }
    );
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const main_bodyGeom = new THREE.CylinderGeometry(
    bodyR,
    bodyR,
    bodyH,
    64,
    1,
    false
  );
  const main_body = new THREE.Mesh(main_bodyGeom, main_bodyMat);
  main_body.name = "main_body";
  main_body.position.y = bodyY;
  root.add(main_body);

  const bottom_capGeom = new THREE.CylinderGeometry(0.495, 0.48, 0.045, 64);
  const bottom_cap = new THREE.Mesh(bottom_capGeom, silver_trimMat);
  bottom_cap.name = "bottom_cap";
  bottom_cap.position.y = bodyBottom + 0.006;
  root.add(bottom_cap);

  const bottom_rimGeom = new THREE.TorusGeometry(0.486, 0.012, 10, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, dark_metalMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = bodyBottom + 0.022;
  root.add(bottom_rim);

  const top_lidGeom = new THREE.CylinderGeometry(0.50, 0.515, 0.075, 64);
  const top_lid = new THREE.Mesh(top_lidGeom, silver_trimMat);
  top_lid.name = "top_lid";
  top_lid.position.y = bodyTop + 0.025;
  root.add(top_lid);

  const top_rimGeom = new THREE.TorusGeometry(0.502, 0.012, 10, 64);
  const top_rim = new THREE.Mesh(top_rimGeom, dark_metalMat);
  top_rim.name = "top_rim";
  top_rim.rotation.x = Math.PI / 2;
  top_rim.position.y = bodyTop - 0.002;
  root.add(top_rim);

  const top_surfaceGeom = new THREE.CylinderGeometry(0.495, 0.50, 0.018, 64);
  const top_surface = new THREE.Mesh(top_surfaceGeom, main_bodyMat);
  top_surface.name = "top_surface";
  top_surface.position.y = bodyTop + 0.069;
  root.add(top_surface);

  const top_knob_baseGeom = new THREE.CylinderGeometry(0.145, 0.145, 0.045, 48);
  const top_knob_base = new THREE.Mesh(top_knob_baseGeom, dark_metalMat);
  top_knob_base.name = "top_knob_base";
  top_knob_base.position.y = bodyTop + 0.095;
  root.add(top_knob_base);

  const top_knobGeom = new THREE.CylinderGeometry(0.17, 0.16, 0.105, 48);
  const top_knob = new THREE.Mesh(top_knobGeom, silver_trimMat);
  top_knob.name = "top_knob";
  top_knob.position.y = bodyTop + 0.158;
  root.add(top_knob);

  const top_knob_capGeom = new THREE.CylinderGeometry(0.166, 0.17, 0.018, 48);
  const top_knob_cap = new THREE.Mesh(top_knob_capGeom, main_bodyMat);
  top_knob_cap.name = "top_knob_cap";
  top_knob_cap.position.y = bodyTop + 0.218;
  root.add(top_knob_cap);

  const control_panel_group = new THREE.Group();
  control_panel_group.name = "control_panel_group";
  control_panel_group.position.set(0, 1.72, bodyR - 0.004);
  root.add(control_panel_group);

  const panel_borderGeom = createRoundedPlateGeometry(
    0.52,
    0.36,
    0.035,
    0.018,
    0.006
  );
  const panel_border = new THREE.Mesh(panel_borderGeom, dark_metalMat);
  panel_border.name = "panel_border";
  panel_border.position.z = 0.009;
  control_panel_group.add(panel_border);

  const control_panelGeom = createRoundedPlateGeometry(
    0.496,
    0.336,
    0.029,
    0.018,
    0.005
  );
  const control_panel = new THREE.Mesh(control_panelGeom, silver_trimMat);
  control_panel.name = "control_panel";
  control_panel.position.z = 0.021;
  control_panel_group.add(control_panel);

  const display_bezelGeom = createRoundedPlateGeometry(
    0.30,
    0.16,
    0.018,
    0.014,
    0.004
  );
  const display_bezel = new THREE.Mesh(display_bezelGeom, black_rubberMat);
  display_bezel.name = "display_bezel";
  display_bezel.position.set(-0.075, 0.018, 0.038);
  control_panel_group.add(display_bezel);

  const lcd_screenGeom = createRoundedPlateGeometry(
    0.252,
    0.108,
    0.008,
    0.008,
    0
  );
  const lcd_screen = new THREE.Mesh(lcd_screenGeom, lcd_screenMat);
  lcd_screen.name = "lcd_screen";
  lcd_screen.position.set(-0.075, 0.018, 0.049);
  control_panel_group.add(lcd_screen);

  const segmentPatterns = {
    1: ["b", "c"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
  };
  const digitValues = [1, 8, 8];
  const digitCenters = [-0.155, -0.075, 0.005];
  const segmentTransforms = [];
  const segmentData = {
    a: [0, 0.038, 0],
    b: [0.021, 0.019, Math.PI / 2],
    c: [0.021, -0.019, Math.PI / 2],
    d: [0, -0.038, 0],
    e: [-0.021, -0.019, Math.PI / 2],
    f: [-0.021, 0.019, Math.PI / 2],
    g: [0, 0, 0],
  };

  for (let i = 0; i < digitValues.length; i++) {
    const active = segmentPatterns[digitValues[i]];
    for (const segmentName of active) {
      const data = segmentData[segmentName];
      segmentTransforms.push([
        digitCenters[i] + data[0],
        0.018 + data[1],
        data[2],
      ]);
    }
  }

  const display_segmentsGeom = new THREE.BoxGeometry(0.034, 0.006, 0.004);
  const display_segments = new THREE.InstancedMesh(
    display_segmentsGeom,
    display_segmentsMat,
    segmentTransforms.length
  );
  display_segments.name = "display_segments";
  const segment_dummy = new THREE.Object3D();
  for (let i = 0; i < segmentTransforms.length; i++) {
    const transform = segmentTransforms[i];
    segment_dummy.position.set(transform[0], transform[1], 0.056);
    segment_dummy.rotation.set(0, 0, transform[2]);
    segment_dummy.scale.set(1, 1, 1);
    segment_dummy.updateMatrix();
    display_segments.setMatrixAt(i, segment_dummy.matrix);
  }
  display_segments.instanceMatrix.needsUpdate = true;
  control_panel_group.add(display_segments);

  const display_colonGeom = new THREE.SphereGeometry(0.005, 12, 8);
  const display_colon = new THREE.InstancedMesh(
    display_colonGeom,
    display_segmentsMat,
    2
  );
  display_colon.name = "display_colon";
  const colon_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    colon_dummy.position.set(-0.115, 0.018 + (i === 0 ? 0.018 : -0.018), 0.058);
    colon_dummy.updateMatrix();
    display_colon.setMatrixAt(i, colon_dummy.matrix);
  }
  display_colon.instanceMatrix.needsUpdate = true;
  control_panel_group.add(display_colon);

  const power_button_rimGeom = new THREE.CylinderGeometry(
    0.026,
    0.026,
    0.012,
    24
  );
  const power_button_rim = new THREE.Mesh(
    power_button_rimGeom,
    black_rubberMat
  );
  power_button_rim.name = "power_button_rim";
  power_button_rim.rotation.x = Math.PI / 2;
  power_button_rim.position.set(0.17, 0.055, 0.051);
  control_panel_group.add(power_button_rim);

  const power_buttonGeom = new THREE.CylinderGeometry(
    0.019,
    0.019,
    0.014,
    24
  );
  const power_button = new THREE.Mesh(power_buttonGeom, dark_metalMat);
  power_button.name = "power_button";
  power_button.rotation.x = Math.PI / 2;
  power_button.position.set(0.17, 0.055, 0.058);
  control_panel_group.add(power_button);

  const power_icon_ringGeom = new THREE.TorusGeometry(0.008, 0.0015, 6, 20);
  const power_icon_ring = new THREE.Mesh(
    power_icon_ringGeom,
    black_rubberMat
  );
  power_icon_ring.name = "power_icon_ring";
  power_icon_ring.position.set(0.17, 0.054, 0.067);
  control_panel_group.add(power_icon_ring);

  const power_icon_lineGeom = new THREE.BoxGeometry(0.003, 0.010, 0.003);
  const power_icon_line = new THREE.Mesh(
    power_icon_lineGeom,
    black_rubberMat
  );
  power_icon_line.name = "power_icon_line";
  power_icon_line.position.set(0.17, 0.063, 0.068);
  control_panel_group.add(power_icon_line);

  const start_button_rimGeom = new THREE.CylinderGeometry(
    0.028,
    0.028,
    0.012,
    24
  );
  const start_button_rim = new THREE.Mesh(
    start_button_rimGeom,
    black_rubberMat
  );
  start_button_rim.name = "start_button_rim";
  start_button_rim.rotation.x = Math.PI / 2;
  start_button_rim.position.set(0.17, -0.065, 0.051);
  control_panel_group.add(start_button_rim);

  const start_buttonGeom = new THREE.CylinderGeometry(
    0.021,
    0.021,
    0.015,
    24
  );
  const start_button = new THREE.Mesh(start_buttonGeom, green_buttonMat);
  start_button.name = "start_button";
  start_button.rotation.x = Math.PI / 2;
  start_button.position.set(0.17, -0.065, 0.059);
  control_panel_group.add(start_button);

  const leg_positions = [
    [-0.32, 0.28],
    [0.32, 0.28],
    [-0.32, -0.28],
    [0.32, -0.28],
  ];

  const support_legsGeom = new THREE.CylinderGeometry(
    0.048,
    0.052,
    0.34,
    24
  );
  const support_legs = new THREE.InstancedMesh(
    support_legsGeom,
    main_bodyMat,
    leg_positions.length
  );
  support_legs.name = "support_legs";

  const upper_leg_collarsGeom = new THREE.CylinderGeometry(
    0.061,
    0.068,
    0.11,
    24
  );
  const upper_leg_collars = new THREE.InstancedMesh(
    upper_leg_collarsGeom,
    silver_trimMat,
    leg_positions.length
  );
  upper_leg_collars.name = "upper_leg_collars";

  const decorative_leg_ringsGeom = new THREE.TorusGeometry(
    0.054,
    0.008,
    8,
    24
  );
  const decorative_leg_rings = new THREE.InstancedMesh(
    decorative_leg_ringsGeom,
    silver_trimMat,
    leg_positions.length * 2
  );
  decorative_leg_rings.name = "decorative_leg_rings";

  const foot_capsGeom = new THREE.CylinderGeometry(
    0.057,
    0.057,
    0.018,
    24
  );
  const foot_caps = new THREE.InstancedMesh(
    foot_capsGeom,
    silver_trimMat,
    leg_positions.length
  );
  foot_caps.name = "foot_caps";

  const leg_dummy = new THREE.Object3D();
  for (let i = 0; i < leg_positions.length; i++) {
    const x = leg_positions[i][0];
    const z = leg_positions[i][1];

    leg_dummy.position.set(x, 0.17, z);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.scale.set(1, 1, 1);
    leg_dummy.updateMatrix();
    support_legs.setMatrixAt(i, leg_dummy.matrix);

    leg_dummy.position.set(x, 0.395, z);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.updateMatrix();
    upper_leg_collars.setMatrixAt(i, leg_dummy.matrix);

    leg_dummy.position.set(x, 0.315, z);
    leg_dummy.rotation.set(Math.PI / 2, 0, 0);
    leg_dummy.updateMatrix();
    decorative_leg_rings.setMatrixAt(i * 2, leg_dummy.matrix);

    leg_dummy.position.set(x, 0.285, z);
    leg_dummy.rotation.set(Math.PI / 2, 0, 0);
    leg_dummy.updateMatrix();
    decorative_leg_rings.setMatrixAt(i * 2 + 1, leg_dummy.matrix);

    leg_dummy.position.set(x, -0.008, z);
    leg_dummy.rotation.set(0, 0, 0);
    leg_dummy.updateMatrix();
    foot_caps.setMatrixAt(i, leg_dummy.matrix);
  }

  support_legs.instanceMatrix.needsUpdate = true;
  upper_leg_collars.instanceMatrix.needsUpdate = true;
  decorative_leg_rings.instanceMatrix.needsUpdate = true;
  foot_caps.instanceMatrix.needsUpdate = true;

  root.add(
    support_legs,
    upper_leg_collars,
    decorative_leg_rings,
    foot_caps
  );

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