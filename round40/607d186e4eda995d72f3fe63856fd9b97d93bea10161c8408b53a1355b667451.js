export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "arcade_machine";

  const cabinet_group = new THREE.Group();
  cabinet_group.name = "cabinet_group";
  root.add(cabinet_group);

  const cabinet_darkMat = new THREE.MeshStandardMaterial({
    color: 0x171722,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_panelMat = new THREE.MeshStandardMaterial({
    color: 0xb82448,
    metalness: 0.0,
    roughness: 0.3
  });
  const blue_panelMat = new THREE.MeshStandardMaterial({
    color: 0x183b88,
    metalness: 0.0,
    roughness: 0.3
  });
  const purple_panelMat = new THREE.MeshStandardMaterial({
    color: 0x632062,
    metalness: 0.0,
    roughness: 0.3
  });
  const brushed_metalMat = new THREE.MeshStandardMaterial({
    color: 0x909090,
    metalness: 0.6,
    roughness: 0.5
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const matte_blackMat = new THREE.MeshStandardMaterial({
    color: 0x111116,
    metalness: 0.0,
    roughness: 0.8
  });
  const rubberMat = new THREE.MeshStandardMaterial({
    color: 0x15151a,
    metalness: 0.0,
    roughness: 0.8
  });
  const clear_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xddeeff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    side: THREE.DoubleSide
  });
  const pink_fabricMat = new THREE.MeshStandardMaterial({
    color: 0xf39ac4,
    metalness: 0.0,
    roughness: 0.95
  });
  const dark_pink_fabricMat = new THREE.MeshStandardMaterial({
    color: 0xd765a4,
    metalness: 0.0,
    roughness: 0.95
  });
  const cream_muzzleMat = new THREE.MeshStandardMaterial({
    color: 0xffc9df,
    metalness: 0.0,
    roughness: 0.95
  });
  const black_plasticMat = new THREE.MeshStandardMaterial({
    color: 0x101014,
    metalness: 0.0,
    roughness: 0.3
  });
  const white_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xf4f4f4,
    metalness: 0.0,
    roughness: 0.3
  });

  const cyan_neonMat = new THREE.MeshStandardMaterial({
    color: 0x00eaff,
    emissive: 0x00eaff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const blue_neonMat = new THREE.MeshStandardMaterial({
    color: 0x357cff,
    emissive: 0x357cff,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const pink_neonMat = new THREE.MeshStandardMaterial({
    color: 0xff3f8a,
    emissive: 0xff3f8a,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const yellow_neonMat = new THREE.MeshStandardMaterial({
    color: 0xffef73,
    emissive: 0xffef73,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const green_indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x42ff72,
    emissive: 0x42ff72,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const red_indicatorMat = new THREE.MeshStandardMaterial({
    color: 0xff334d,
    emissive: 0xff334d,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });
  const orange_displayMat = new THREE.MeshStandardMaterial({
    color: 0xff735c,
    emissive: 0xff735c,
    emissiveIntensity: 1.0,
    metalness: 0.0,
    roughness: 0.5
  });

  const yellow_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xffd83d,
    metalness: 0.0,
    roughness: 0.3
  });
  const cyan_buttonMat = new THREE.MeshStandardMaterial({
    color: 0x35f4e8,
    metalness: 0.0,
    roughness: 0.3
  });
  const red_buttonMat = new THREE.MeshStandardMaterial({
    color: 0xff4054,
    metalness: 0.0,
    roughness: 0.3
  });

  function addBox(parent, w, h, d, mat, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    parent.add(mesh);
    return mesh;
  }

  function addNeonStroke(parent, points, coreMat, glowMat, coreRadius, glowRadius) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const segments = Math.max(12, points.length * 6);

    const glowGeom = new THREE.TubeGeometry(curve, segments, glowRadius, 8, false);
    const glow = new THREE.Mesh(glowGeom, glowMat);
    parent.add(glow);

    const coreGeom = new THREE.TubeGeometry(curve, segments, coreRadius, 8, false);
    const core = new THREE.Mesh(coreGeom, coreMat);
    parent.add(core);
    return { glow, core };
  }

  function addNeonLetter(parent, letter, x, y, w, h, coreMat, glowMat) {
    function stroke(coords) {
      const points = [];
      for (const coord of coords) {
        points.push(new THREE.Vector3(x + coord[0] * w, y + coord[1] * h, 0));
      }
      return addNeonStroke(parent, points, coreMat, glowMat, 0.011, 0.024);
    }

    if (letter === "P") {
      stroke([[0.12, 0.05], [0.12, 0.95]]);
      stroke([[0.12, 0.92], [0.55, 0.92], [0.78, 0.78], [0.72, 0.60], [0.48, 0.53], [0.12, 0.53]]);
    } else if (letter === "L") {
      stroke([[0.16, 0.95], [0.16, 0.08], [0.82, 0.08]]);
    } else if (letter === "A") {
      stroke([[0.08, 0.05], [0.48, 0.95], [0.90, 0.05]]);
      stroke([[0.25, 0.40], [0.73, 0.40]]);
    } else if (letter === "Y") {
      stroke([[0.06, 0.94], [0.48, 0.53], [0.92, 0.94]]);
      stroke([[0.48, 0.53], [0.48, 0.05]]);
    } else if (letter === "M") {
      stroke([[0.08, 0.05], [0.08, 0.95], [0.48, 0.48], [0.88, 0.95], [0.88, 0.05]]);
    } else if (letter === "E") {
      stroke([[0.14, 0.05], [0.14, 0.95]]);
      stroke([[0.14, 0.93], [0.84, 0.93]]);
      stroke([[0.14, 0.51], [0.72, 0.51]]);
      stroke([[0.14, 0.07], [0.84, 0.07]]);
    }
  }

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

  const cabinet_rear = addBox(
    cabinet_group, 1.18, 2.16, 0.12, cabinet_darkMat, 0, 1.18, -0.35
  );
  cabinet_rear.name = "cabinet_rear";

  const rear_blue_panel = addBox(
    cabinet_group, 1.02, 1.55, 0.025, blue_panelMat, 0, 0.92, -0.421
  );
  rear_blue_panel.name = "rear_blue_panel";

  const rear_red_panel = addBox(
    cabinet_group, 1.03, 0.72, 0.028, red_panelMat, 0, 1.79, -0.424
  );
  rear_red_panel.name = "rear_red_panel";

  const lower_base = addBox(
    cabinet_group, 1.30, 0.11, 1.16, cabinet_darkMat, 0, 0.105, 0.08
  );
  lower_base.name = "lower_base";

  const lower_front_panel = addBox(
    cabinet_group, 1.16, 0.48, 0.07, red_panelMat, 0, 0.39, 0.67
  );
  lower_front_panel.name = "lower_front_panel";

  const lower_front_trim = addBox(
    cabinet_group, 1.25, 0.075, 0.075, brushed_metalMat, 0, 0.65, 0.675
  );
  lower_front_trim.name = "lower_front_trim";

  const lower_bottom_trim = addBox(
    cabinet_group, 1.22, 0.07, 0.07, brushed_metalMat, 0, 0.13, 0.675
  );
  lower_bottom_trim.name = "lower_bottom_trim";

  const side_panelShape = new THREE.Shape();
  side_panelShape.moveTo(-0.40, 0.08);
  side_panelShape.lineTo(-0.40, 2.27);
  side_panelShape.lineTo(0.02, 2.27);
  side_panelShape.bezierCurveTo(0.10, 2.16, 0.12, 2.00, 0.12, 1.84);
  side_panelShape.bezierCurveTo(0.12, 1.62, -0.08, 1.47, -0.10, 1.30);
  side_panelShape.bezierCurveTo(-0.12, 1.10, 0.25, 0.84, 0.55, 0.69);
  side_panelShape.lineTo(0.70, 0.58);
  side_panelShape.lineTo(0.70, 0.08);
  side_panelShape.closePath();

  const side_panelGeom = new THREE.ExtrudeGeometry(side_panelShape, {
    depth: 0.07,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  });

  const left_side_panel = new THREE.Mesh(side_panelGeom, red_panelMat);
  left_side_panel.name = "left_side_panel";
  left_side_panel.rotation.y = Math.PI / 2;
  left_side_panel.position.x = -0.68;
  cabinet_group.add(left_side_panel);

  const right_side_panel = new THREE.Mesh(side_panelGeom, red_panelMat);
  right_side_panel.name = "right_side_panel";
  right_side_panel.rotation.y = Math.PI / 2;
  right_side_panel.position.x = 0.61;
  cabinet_group.add(right_side_panel);

  const side_lowerShape = new THREE.Shape();
  side_lowerShape.moveTo(-0.40, 0.08);
  side_lowerShape.lineTo(-0.40, 1.18);
  side_lowerShape.bezierCurveTo(-0.10, 1.05, 0.30, 0.82, 0.55, 0.69);
  side_lowerShape.lineTo(0.70, 0.58);
  side_lowerShape.lineTo(0.70, 0.08);
  side_lowerShape.closePath();

  const side_lowerGeom = new THREE.ExtrudeGeometry(side_lowerShape, {
    depth: 0.012,
    steps: 1,
    bevelEnabled: false
  });

  const left_side_lower_decal = new THREE.Mesh(side_lowerGeom, blue_panelMat);
  left_side_lower_decal.name = "left_side_lower_decal";
  left_side_lower_decal.rotation.y = Math.PI / 2;
  left_side_lower_decal.position.x = -0.693;
  cabinet_group.add(left_side_lower_decal);

  const right_side_lower_decal = new THREE.Mesh(side_lowerGeom, blue_panelMat);
  right_side_lower_decal.name = "right_side_lower_decal";
  right_side_lower_decal.rotation.y = Math.PI / 2;
  right_side_lower_decal.position.x = 0.687;
  cabinet_group.add(right_side_lower_decal);

  const side_purpleShape = new THREE.Shape();
  side_purpleShape.moveTo(-0.40, 1.05);
  side_purpleShape.lineTo(-0.40, 2.20);
  side_purpleShape.lineTo(0.02, 2.20);
  side_purpleShape.bezierCurveTo(0.10, 2.05, 0.10, 1.88, 0.10, 1.76);
  side_purpleShape.bezierCurveTo(0.08, 1.55, -0.10, 1.30, -0.40, 1.12);
  side_purpleShape.closePath();

  const side_purpleGeom = new THREE.ExtrudeGeometry(side_purpleShape, {
    depth: 0.014,
    steps: 1,
    bevelEnabled: false
  });

  const left_side_purple_decal = new THREE.Mesh(side_purpleGeom, purple_panelMat);
  left_side_purple_decal.name = "left_side_purple_decal";
  left_side_purple_decal.rotation.y = Math.PI / 2;
  left_side_purple_decal.position.x = -0.696;
  cabinet_group.add(left_side_purple_decal);

  const right_side_purple_decal = new THREE.Mesh(side_purpleGeom, purple_panelMat);
  right_side_purple_decal.name = "right_side_purple_decal";
  right_side_purple_decal.rotation.y = Math.PI / 2;
  right_side_purple_decal.position.x = 0.701;
  cabinet_group.add(right_side_purple_decal);

  const side_railPoints = [
    new THREE.Vector3(0, 2.24, 0.02),
    new THREE.Vector3(0, 2.02, 0.10),
    new THREE.Vector3(0, 1.78, 0.08),
    new THREE.Vector3(0, 1.53, -0.06),
    new THREE.Vector3(0, 1.28, -0.08),
    new THREE.Vector3(0, 1.02, 0.15),
    new THREE.Vector3(0, 0.78, 0.48),
    new THREE.Vector3(0, 0.62, 0.66)
  ];
  const side_railCurve = new THREE.CatmullRomCurve3(
    side_railPoints, false, "centripetal"
  );
  const side_railGeom = new THREE.TubeGeometry(
    side_railCurve, 48, 0.038, 10, false
  );

  const left_side_rail = new THREE.Mesh(side_railGeom, cabinet_darkMat);
  left_side_rail.name = "left_side_rail";
  left_side_rail.position.x = -0.655;
  cabinet_group.add(left_side_rail);

  const right_side_rail = new THREE.Mesh(side_railGeom, cabinet_darkMat);
  right_side_rail.name = "right_side_rail";
  right_side_rail.position.x = 0.655;
  cabinet_group.add(right_side_rail);

  const footGeom = new THREE.CylinderGeometry(0.055, 0.065, 0.12, 16);
  const cabinet_feet = new THREE.InstancedMesh(footGeom, rubberMat, 4);
  cabinet_feet.name = "cabinet_feet";
  const foot_dummy = new THREE.Object3D();
  const foot_positions = [
    [-0.55, 0.03, 0.52],
    [0.55, 0.03, 0.52],
    [-0.55, 0.03, -0.31],
    [0.55, 0.03, -0.31]
  ];
  for (let i = 0; i < foot_positions.length; i++) {
    foot_dummy.position.set(
      foot_positions[i][0],
      foot_positions[i][1],
      foot_positions[i][2]
    );
    foot_dummy.rotation.set(0, 0, 0);
    foot_dummy.scale.set(1, 1, 1);
    foot_dummy.updateMatrix();
    cabinet_feet.setMatrixAt(i, foot_dummy.matrix);
  }
  cabinet_feet.instanceMatrix.needsUpdate = true;
  cabinet_group.add(cabinet_feet);

  const control_deck_group = new THREE.Group();
  control_deck_group.name = "control_deck_group";
  control_deck_group.position.set(0, 0.72, 0.32);
  control_deck_group.rotation.x = 0.30;
  cabinet_group.add(control_deck_group);

  const control_deck_frame = addBox(
    control_deck_group, 1.20, 0.07, 0.78, cabinet_darkMat, 0, -0.005, 0
  );
  control_deck_frame.name = "control_deck_frame";

  const control_deck_top = addBox(
    control_deck_group, 1.06, 0.025, 0.65, purple_panelMat, 0, 0.04, 0
  );
  control_deck_top.name = "control_deck_top";

  const control_deck_glass = addBox(
    control_deck_group, 0.98, 0.018, 0.59, clear_glassMat, 0, 0.064, 0
  );
  control_deck_glass.name = "control_deck_glass";

  const deck_left_light_strip = addBox(
    control_deck_group, 0.018, 0.018, 0.58, pink_neonMat, -0.47, 0.078, 0
  );
  deck_left_light_strip.name = "deck_left_light_strip";

  const deck_right_light_strip = addBox(
    control_deck_group, 0.018, 0.018, 0.58, cyan_neonMat, 0.47, 0.078, 0
  );
  deck_right_light_strip.name = "deck_right_light_strip";

  const deck_back_light_strip = addBox(
    control_deck_group, 0.94, 0.018, 0.018, blue_neonMat, 0, 0.078, -0.29
  );
  deck_back_light_strip.name = "deck_back_light_strip";

  const control_display = addBox(
    control_deck_group, 0.34, 0.025, 0.15, matte_blackMat, 0, 0.086, 0.23
  );
  control_display.name = "control_display";

  const control_display_glass = addBox(
    control_deck_group, 0.23, 0.012, 0.075, red_indicatorMat, 0, 0.105, 0.23
  );
  control_display_glass.name = "control_display_glass";

  const joystick_baseGeom = new THREE.CylinderGeometry(0.055, 0.065, 0.025, 20);
  const joystick_shaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.09, 12);
  const joystick_ballGeom = new THREE.SphereGeometry(0.052, 20, 12);

  const left_joystick_base = new THREE.Mesh(joystick_baseGeom, matte_blackMat);
  left_joystick_base.name = "left_joystick_base";
  left_joystick_base.position.set(-0.35, 0.09, 0.02);
  control_deck_group.add(left_joystick_base);

  const left_joystick_shaft = new THREE.Mesh(joystick_shaftGeom, silverMat);
  left_joystick_shaft.name = "left_joystick_shaft";
  left_joystick_shaft.position.set(-0.35, 0.145, 0.02);
  control_deck_group.add(left_joystick_shaft);

  const left_joystick_ball = new THREE.Mesh(joystick_ballGeom, yellow_buttonMat);
  left_joystick_ball.name = "left_joystick_ball";
  left_joystick_ball.position.set(-0.35, 0.205, 0.02);
  control_deck_group.add(left_joystick_ball);

  const right_joystick_base = new THREE.Mesh(joystick_baseGeom, matte_blackMat);
  right_joystick_base.name = "right_joystick_base";
  right_joystick_base.position.set(0.35, 0.09, 0.02);
  control_deck_group.add(right_joystick_base);

  const right_joystick_shaft = new THREE.Mesh(joystick_shaftGeom, silverMat);
  right_joystick_shaft.name = "right_joystick_shaft";
  right_joystick_shaft.position.set(0.35, 0.145, 0.02);
  control_deck_group.add(right_joystick_shaft);

  const right_joystick_ball = new THREE.Mesh(joystick_ballGeom, red_buttonMat);
  right_joystick_ball.name = "right_joystick_ball";
  right_joystick_ball.position.set(0.35, 0.205, 0.02);
  control_deck_group.add(right_joystick_ball);

  const deck_buttonGeom = new THREE.CylinderGeometry(0.045, 0.045, 0.025, 20);

  const deck_cyan_button = new THREE.Mesh(deck_buttonGeom, cyan_buttonMat);
  deck_cyan_button.name = "deck_cyan_button";
  deck_cyan_button.position.set(-0.16, 0.10, -0.10);
  control_deck_group.add(deck_cyan_button);

  const deck_yellow_button = new THREE.Mesh(deck_buttonGeom, yellow_buttonMat);
  deck_yellow_button.name = "deck_yellow_button";
  deck_yellow_button.position.set(0.16, 0.10, -0.10);
  control_deck_group.add(deck_yellow_button);

  const play_window_group = new THREE.Group();
  play_window_group.name = "play_window_group";
  cabinet_group.add(play_window_group);

  const playfield_back = addBox(
    play_window_group, 1.02, 1.06, 0.035, purple_panelMat, 0, 1.31, -0.285
  );
  playfield_back.name = "playfield_back";

  const playfield_glass = addBox(
    play_window_group, 0.98, 1.01, 0.018, clear_glassMat, 0, 1.31, 0.075
  );
  playfield_glass.name = "playfield_glass";

  const playfield_lower_sill = addBox(
    play_window_group, 1.08, 0.075, 0.12, brushed_metalMat, 0, 0.77, 0.05
  );
  playfield_lower_sill.name = "playfield_lower_sill";

  const playfield_left_post = addBox(
    play_window_group, 0.055, 1.08, 0.09, cabinet_darkMat, -0.52, 1.31, 0.04
  );
  playfield_left_post.name = "playfield_left_post";

  const playfield_right_post = addBox(
    play_window_group, 0.055, 1.08, 0.09, cabinet_darkMat, 0.52, 1.31, 0.04
  );
  playfield_right_post.name = "playfield_right_post";

  const playfield_top_rail = addBox(
    play_window_group, 1.08, 0.07, 0.10, cabinet_darkMat, 0, 1.84, 0.04
  );
  playfield_top_rail.name = "playfield_top_rail";

  const playfield_left_light = addBox(
    play_window_group, 0.018, 0.72, 0.018, pink_neonMat, -0.42, 1.28, 0.092
  );
  playfield_left_light.name = "playfield_left_light";

  const playfield_right_light = addBox(
    play_window_group, 0.018, 0.72, 0.018, cyan_neonMat, 0.42, 1.28, 0.092
  );
  playfield_right_light.name = "playfield_right_light";

  const playfield_bottom_light = addBox(
    play_window_group, 0.78, 0.018, 0.018, blue_neonMat, 0, 0.83, 0.092
  );
  playfield_bottom_light.name = "playfield_bottom_light";

  const mechanism_console = addBox(
    play_window_group, 0.34, 0.27, 0.045, matte_blackMat, 0.27, 1.04, -0.18
  );
  mechanism_console.name = "mechanism_console";

  const mechanism_screen = addBox(
    play_window_group, 0.20, 0.16, 0.018, green_indicatorMat, 0.27, 1.08, -0.15
  );
  mechanism_screen.name = "mechanism_screen";

  const mechanism_screen_bar = addBox(
    play_window_group, 0.17, 0.025, 0.012, cyan_neonMat, 0.27, 1.08, -0.137
  );
  mechanism_screen_bar.name = "mechanism_screen_bar";

  const mechanism_red_slot = addBox(
    play_window_group, 0.16, 0.055, 0.018, red_indicatorMat, 0.27, 0.94, -0.145
  );
  mechanism_red_slot.name = "mechanism_red_slot";

  const mechanism_dialGeom = new THREE.CylinderGeometry(0.095, 0.095, 0.028, 24);
  const mechanism_dial = new THREE.Mesh(mechanism_dialGeom, silverMat);
  mechanism_dial.name = "mechanism_dial";
  mechanism_dial.rotation.x = Math.PI / 2;
  mechanism_dial.position.set(-0.12, 1.48, -0.16);
  play_window_group.add(mechanism_dial);

  const mechanism_dial_faceGeom = new THREE.CylinderGeometry(0.073, 0.073, 0.032, 24);
  const mechanism_dial_face = new THREE.Mesh(
    mechanism_dial_faceGeom, cyan_neonMat
  );
  mechanism_dial_face.name = "mechanism_dial_face";
  mechanism_dial_face.rotation.x = Math.PI / 2;
  mechanism_dial_face.position.set(-0.12, 1.48, -0.14);
  play_window_group.add(mechanism_dial_face);

  const mechanism_dial_ringGeom = new THREE.TorusGeometry(0.105, 0.012, 8, 28);
  const mechanism_dial_ring = new THREE.Mesh(
    mechanism_dial_ringGeom, silverMat
  );
  mechanism_dial_ring.name = "mechanism_dial_ring";
  mechanism_dial_ring.position.set(-0.12, 1.48, -0.12);
  play_window_group.add(mechanism_dial_ring);

  const rear_lightGeom = new THREE.SphereGeometry(0.025, 12, 8);
  const rear_green_lights = new THREE.InstancedMesh(
    rear_lightGeom, green_indicatorMat, 4
  );
  rear_green_lights.name = "rear_green_lights";
  const rear_light_dummy = new THREE.Object3D();
  const rear_green_positions = [
    [-0.38, 1.62, -0.17],
    [-0.35, 1.20, -0.17],
    [0.05, 1.68, -0.17],
    [0.38, 1.32, -0.17]
  ];
  for (let i = 0; i < rear_green_positions.length; i++) {
    rear_light_dummy.position.set(
      rear_green_positions[i][0],
      rear_green_positions[i][1],
      rear_green_positions[i][2]
    );
    rear_light_dummy.updateMatrix();
    rear_green_lights.setMatrixAt(i, rear_light_dummy.matrix);
  }
  rear_green_lights.instanceMatrix.needsUpdate = true;
  play_window_group.add(rear_green_lights);

  const rear_red_lights = new THREE.InstancedMesh(
    rear_lightGeom, red_indicatorMat, 3
  );
  rear_red_lights.name = "rear_red_lights";
  const rear_red_positions = [
    [-0.31, 1.72, -0.17],
    [0.35, 1.62, -0.17],
    [0.39, 0.98, -0.17]
  ];
  for (let i = 0; i < rear_red_positions.length; i++) {
    rear_light_dummy.position.set(
      rear_red_positions[i][0],
      rear_red_positions[i][1],
      rear_red_positions[i][2]
    );
    rear_light_dummy.updateMatrix();
    rear_red_lights.setMatrixAt(i, rear_light_dummy.matrix);
  }
  rear_red_lights.instanceMatrix.needsUpdate = true;
  play_window_group.add(rear_red_lights);

  const rear_cable_redCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.08, 1.75, -0.19),
    new THREE.Vector3(0.25, 1.60, -0.18),
    new THREE.Vector3(0.18, 1.38, -0.17),
    new THREE.Vector3(0.34, 1.18, -0.17)
  ], false, "centripetal");
  const rear_cable_redGeom = new THREE.TubeGeometry(
    rear_cable_redCurve, 24, 0.009, 6, false
  );
  const rear_cable_red = new THREE.Mesh(rear_cable_redGeom, red_indicatorMat);
  rear_cable_red.name = "rear_cable_red";
  play_window_group.add(rear_cable_red);

  const rear_cable_cyanCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.02, 1.78, -0.20),
    new THREE.Vector3(0.10, 1.57, -0.19),
    new THREE.Vector3(-0.02, 1.36, -0.18),
    new THREE.Vector3(0.12, 1.16, -0.18)
  ], false, "centripetal");
  const rear_cable_cyanGeom = new THREE.TubeGeometry(
    rear_cable_cyanCurve, 24, 0.008, 6, false
  );
  const rear_cable_cyan = new THREE.Mesh(rear_cable_cyanGeom, cyan_neonMat);
  rear_cable_cyan.name = "rear_cable_cyan";
  play_window_group.add(rear_cable_cyan);

  const rear_cable_pinkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.38, 1.76, -0.20),
    new THREE.Vector3(0.22, 1.58, -0.19),
    new THREE.Vector3(0.39, 1.43, -0.18),
    new THREE.Vector3(0.20, 1.22, -0.18)
  ], false, "centripetal");
  const rear_cable_pinkGeom = new THREE.TubeGeometry(
    rear_cable_pinkCurve, 24, 0.008, 6, false
  );
  const rear_cable_pink = new THREE.Mesh(rear_cable_pinkGeom, pink_neonMat);
  rear_cable_pink.name = "rear_cable_pink";
  play_window_group.add(rear_cable_pink);

  const marquee_group = new THREE.Group();
  marquee_group.name = "marquee_group";
  cabinet_group.add(marquee_group);

  const marquee_back = addBox(
    marquee_group, 1.22, 0.61, 0.13, cabinet_darkMat, 0, 2.07, 0.055
  );
  marquee_back.name = "marquee_back";

  const marquee_inner = addBox(
    marquee_group, 1.06, 0.46, 0.035, purple_panelMat, 0, 2.07, 0.132
  );
  marquee_inner.name = "marquee_inner";

  const marquee_glass = addBox(
    marquee_group, 1.01, 0.42, 0.018, clear_glassMat, 0, 2.07, 0.158
  );
  marquee_glass.name = "marquee_glass";

  const marquee_top_frame = addBox(
    marquee_group, 1.18, 0.065, 0.075, cabinet_darkMat, 0, 2.34, 0.15
  );
  marquee_top_frame.name = "marquee_top_frame";

  const marquee_bottom_frame = addBox(
    marquee_group, 1.18, 0.065, 0.075, cabinet_darkMat, 0, 1.80, 0.15
  );
  marquee_bottom_frame.name = "marquee_bottom_frame";

  const marquee_left_frame = addBox(
    marquee_group, 0.065, 0.52, 0.075, cabinet_darkMat, -0.59, 2.07, 0.15
  );
  marquee_left_frame.name = "marquee_left_frame";

  const marquee_right_frame = addBox(
    marquee_group, 0.065, 0.52, 0.075, cabinet_darkMat, 0.59, 2.07, 0.15
  );
  marquee_right_frame.name = "marquee_right_frame";

  const marquee_top_light = addBox(
    marquee_group, 0.94, 0.018, 0.018, cyan_neonMat, 0, 2.275, 0.182
  );
  marquee_top_light.name = "marquee_top_light";

  const marquee_bottom_light = addBox(
    marquee_group, 0.94, 0.018, 0.018, cyan_neonMat, 0, 1.865, 0.182
  );
  marquee_bottom_light.name = "marquee_bottom_light";

  const marquee_left_light = addBox(
    marquee_group, 0.018, 0.39, 0.018, pink_neonMat, -0.525, 2.07, 0.182
  );
  marquee_left_light.name = "marquee_left_light";

  const marquee_right_light = addBox(
    marquee_group, 0.018, 0.39, 0.018, blue_neonMat, 0.525, 2.07, 0.182
  );
  marquee_right_light.name = "marquee_right_light";

  const marquee_neon_word = new THREE.Group();
  marquee_neon_word.name = "marquee_neon_word";
  marquee_neon_word.position.z = 0.195;
  marquee_group.add(marquee_neon_word);

  addNeonLetter(
    marquee_neon_word, "P", -0.44, 1.965, 0.17, 0.245,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    marquee_neon_word, "L", -0.255, 1.965, 0.12, 0.245,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    marquee_neon_word, "A", -0.115, 1.965, 0.15, 0.245,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    marquee_neon_word, "Y", 0.055, 1.965, 0.15, 0.245,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    marquee_neon_word, "M", 0.245, 1.965, 0.17, 0.245,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    marquee_neon_word, "E", 0.435, 1.965, 0.12, 0.245,
    yellow_neonMat, pink_neonMat
  );

  const marquee_starGeom = new THREE.CircleGeometry(0.018, 4);
  const marquee_stars = new THREE.InstancedMesh(
    marquee_starGeom, cyan_neonMat, 6
  );
  marquee_stars.name = "marquee_stars";
  const marquee_star_dummy = new THREE.Object3D();
  const marquee_star_positions = [
    [-0.48, 2.18],
    [-0.30, 2.22],
    [-0.03, 2.20],
    [0.18, 2.22],
    [0.39, 2.19],
    [0.49, 2.10]
  ];
  for (let i = 0; i < marquee_star_positions.length; i++) {
    marquee_star_dummy.position.set(
      marquee_star_positions[i][0],
      marquee_star_positions[i][1],
      0.184
    );
    marquee_star_dummy.rotation.set(0, 0, i * 0.37);
    marquee_star_dummy.scale.set(1, 1, 1);
    marquee_star_dummy.updateMatrix();
    marquee_stars.setMatrixAt(i, marquee_star_dummy.matrix);
  }
  marquee_stars.instanceMatrix.needsUpdate = true;
  marquee_group.add(marquee_stars);

  const marquee_boltGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.012, 12);
  const marquee_bolts = new THREE.InstancedMesh(marquee_boltGeom, silverMat, 4);
  marquee_bolts.name = "marquee_bolts";
  const marquee_bolt_dummy = new THREE.Object3D();
  const marquee_bolt_positions = [
    [-0.54, 1.89],
    [0.54, 1.89],
    [-0.54, 2.25],
    [0.54, 2.25]
  ];
  for (let i = 0; i < marquee_bolt_positions.length; i++) {
    marquee_bolt_dummy.position.set(
      marquee_bolt_positions[i][0],
      marquee_bolt_positions[i][1],
      0.198
    );
    marquee_bolt_dummy.rotation.set(Math.PI / 2, 0, 0);
    marquee_bolt_dummy.updateMatrix();
    marquee_bolts.setMatrixAt(i, marquee_bolt_dummy.matrix);
  }
  marquee_bolts.instanceMatrix.needsUpdate = true;
  marquee_group.add(marquee_bolts);

  const side_neon_word = new THREE.Group();
  side_neon_word.name = "side_neon_word";
  side_neon_word.position.set(0.713, 1.92, 0);
  side_neon_word.rotation.y = Math.PI / 2;
  cabinet_group.add(side_neon_word);

  addNeonLetter(
    side_neon_word, "P", -0.35, 0.00, 0.15, 0.25,
    blue_neonMat, cyan_neonMat
  );
  addNeonLetter(
    side_neon_word, "L", -0.18, 0.00, 0.11, 0.25,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    side_neon_word, "A", -0.04, 0.00, 0.14, 0.25,
    pink_neonMat, yellow_neonMat
  );
  addNeonLetter(
    side_neon_word, "Y", 0.13, 0.00, 0.14, 0.25,
    cyan_neonMat, blue_neonMat
  );
  addNeonLetter(
    side_neon_word, "M", 0.28, 0.00, 0.14, 0.25,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    side_neon_word, "E", 0.44, 0.00, 0.11, 0.25,
    pink_neonMat, cyan_neonMat
  );

  const side_lower_logo = new THREE.Group();
  side_lower_logo.name = "side_lower_logo";
  side_lower_logo.position.set(0.713, 0.66, 0);
  side_lower_logo.rotation.y = Math.PI / 2;
  cabinet_group.add(side_lower_logo);

  addNeonLetter(
    side_lower_logo, "P", -0.32, 0.00, 0.14, 0.22,
    blue_neonMat, cyan_neonMat
  );
  addNeonLetter(
    side_lower_logo, "L", -0.16, 0.00, 0.10, 0.22,
    pink_neonMat, yellow_neonMat
  );
  addNeonLetter(
    side_lower_logo, "A", -0.03, 0.00, 0.13, 0.22,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    side_lower_logo, "Y", 0.12, 0.00, 0.13, 0.22,
    cyan_neonMat, blue_neonMat
  );
  addNeonLetter(
    side_lower_logo, "M", 0.27, 0.00, 0.13, 0.22,
    yellow_neonMat, pink_neonMat
  );
  addNeonLetter(
    side_lower_logo, "E", 0.41, 0.00, 0.10, 0.22,
    pink_neonMat, cyan_neonMat
  );

  const side_starGeom = new THREE.CircleGeometry(0.025, 4);
  const side_stars = new THREE.InstancedMesh(
    side_starGeom, yellow_neonMat, 7
  );
  side_stars.name = "side_stars";
  const side_star_dummy = new THREE.Object3D();
  const side_star_positions = [
    [1.55, -0.20],
    [1.38, 0.20],
    [1.18, -0.24],
    [0.98, 0.27],
    [0.38, -0.20],
    [0.27, 0.18],
    [0.48, 0.31]
  ];
  for (let i = 0; i < side_star_positions.length; i++) {
    side_star_dummy.position.set(
      0.713,
      side_star_positions[i][0],
      side_star_positions[i][1]
    );
    side_star_dummy.rotation.set(0, Math.PI / 2, i * 0.42);
    side_star_dummy.scale.set(1, 1, 1);
    side_star_dummy.updateMatrix();
    side_stars.setMatrixAt(i, side_star_dummy.matrix);
  }
  side_stars.instanceMatrix.needsUpdate = true;
  cabinet_group.add(side_stars);

  const side_dog_decal = new THREE.Group();
  side_dog_decal.name = "side_dog_decal";
  side_dog_decal.position.set(0.716, 0.58, -0.08);
  side_dog_decal.rotation.y = Math.PI / 2;
  cabinet_group.add(side_dog_decal);

  const side_dog_circleGeom = new THREE.CircleGeometry(0.10, 20);

  const side_dog_body = new THREE.Mesh(side_dog_circleGeom, dark_pink_fabricMat);
  side_dog_body.name = "side_dog_body";
  side_dog_body.scale.set(0.75, 1.25, 1);
  side_dog_body.position.set(0, -0.12, 0);
  side_dog_decal.add(side_dog_body);

  const side_dog_head = new THREE.Mesh(side_dog_circleGeom, pink_fabricMat);
  side_dog_head.name = "side_dog_head";
  side_dog_head.scale.set(1.05, 0.95, 1);
  side_dog_head.position.set(0, 0.07, 0.004);
  side_dog_decal.add(side_dog_head);

  const side_dog_ear_left = new THREE.Mesh(side_dog_circleGeom, pink_fabricMat);
  side_dog_ear_left.name = "side_dog_ear_left";
  side_dog_ear_left.scale.set(0.55, 1.0, 1);
  side_dog_ear_left.position.set(-0.105, 0.035, 0.006);
  side_dog_decal.add(side_dog_ear_left);

  const side_dog_ear_right = new THREE.Mesh(side_dog_circleGeom, pink_fabricMat);
  side_dog_ear_right.name = "side_dog_ear_right";
  side_dog_ear_right.scale.set(0.55, 1.0, 1);
  side_dog_ear_right.position.set(0.105, 0.035, 0.006);
  side_dog_decal.add(side_dog_ear_right);

  const side_dog_muzzle = new THREE.Mesh(side_dog_circleGeom, cream_muzzleMat);
  side_dog_muzzle.name = "side_dog_muzzle";
  side_dog_muzzle.scale.set(0.62, 0.42, 1);
  side_dog_muzzle.position.set(0, 0.015, 0.010);
  side_dog_decal.add(side_dog_muzzle);

  const side_dog_eyeGeom = new THREE.CircleGeometry(0.012, 12);
  const side_dog_left_eye = new THREE.Mesh(side_dog_eyeGeom, black_plasticMat);
  side_dog_left_eye.name = "side_dog_left_eye";
  side_dog_left_eye.position.set(-0.038, 0.095, 0.012);
  side_dog_decal.add(side_dog_left_eye);

  const side_dog_right_eye = new THREE.Mesh(side_dog_eyeGeom, black_plasticMat);
  side_dog_right_eye.name = "side_dog_right_eye";
  side_dog_right_eye.position.set(0.038, 0.095, 0.012);
  side_dog_decal.add(side_dog_right_eye);

  const front_control_group = new THREE.Group();
  front_control_group.name = "front_control_group";
  cabinet_group.add(front_control_group);

  const front_control_panel = addBox(
    front_control_group, 0.78, 0.37, 0.035, matte_blackMat, -0.08, 0.40, 0.718
  );
  front_control_panel.name = "front_control_panel";

  const front_display = addBox(
    front_control_group, 0.56, 0.18, 0.025, cabinet_darkMat, -0.17, 0.43, 0.746
  );
  front_display.name = "front_display";

  const front_display_glass = addBox(
    front_control_group, 0.47, 0.12, 0.014, orange_displayMat, -0.17, 0.43, 0.766
  );
  front_display_glass.name = "front_display_glass";

  const front_display_barGeom = new THREE.BoxGeometry(0.035, 0.012, 0.008);
  const front_display_bars = new THREE.InstancedMesh(
    front_display_barGeom, yellow_neonMat, 8
  );
  front_display_bars.name = "front_display_bars";
  const display_bar_dummy = new THREE.Object3D();
  const display_bar_positions = [
    [-0.36, 0.46],
    [-0.31, 0.46],
    [-0.26, 0.46],
    [-0.18, 0.46],
    [-0.10, 0.46],
    [-0.31, 0.40],
    [-0.21, 0.40],
    [-0.12, 0.40]
  ];
  for (let i = 0; i < display_bar_positions.length; i++) {
    display_bar_dummy.position.set(
      display_bar_positions[i][0],
      display_bar_positions[i][1],
      0.778
    );
    display_bar_dummy.rotation.set(0, 0, i % 3 === 0 ? Math.PI / 2 : 0);
    display_bar_dummy.scale.set(1, 1, 1);
    display_bar_dummy.updateMatrix();
    front_display_bars.setMatrixAt(i, display_bar_dummy.matrix);
  }
  front_display_bars.instanceMatrix.needsUpdate = true;
  front_control_group.add(front_display_bars);

  const front_vent = addBox(
    front_control_group, 0.42, 0.105, 0.025, matte_blackMat, -0.17, 0.205, 0.746
  );
  front_vent.name = "front_vent";

  const vent_slatsGeom = new THREE.BoxGeometry(0.025, 0.075, 0.012);
  const vent_slats = new THREE.InstancedMesh(vent_slatsGeom, cabinet_darkMat, 12);
  vent_slats.name = "vent_slats";
  const vent_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    vent_dummy.position.set(-0.345 + i * 0.031, 0.205, 0.765);
    vent_dummy.rotation.set(0, 0, -0.22);
    vent_dummy.scale.set(1, 1, 1);
    vent_dummy.updateMatrix();
    vent_slats.setMatrixAt(i, vent_dummy.matrix);
  }
  vent_slats.instanceMatrix.needsUpdate = true;
  front_control_group.add(vent_slats);

  const front_knobGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.035, 20);
  const front_knob = new THREE.Mesh(front_knobGeom, matte_blackMat);
  front_knob.name = "front_knob";
  front_knob.rotation.x = Math.PI / 2;
  front_knob.position.set(0.31, 0.34, 0.765);
  front_control_group.add(front_knob);

  const front_knob_capGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.042, 16);
  const front_knob_cap = new THREE.Mesh(front_knob_capGeom, silverMat);
  front_knob_cap.name = "front_knob_cap";
  front_knob_cap.rotation.x = Math.PI / 2;
  front_knob_cap.position.set(0.31, 0.34, 0.782);
  front_control_group.add(front_knob_cap);

  const front_coin_dialGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.025, 20);
  const front_coin_dial = new THREE.Mesh(front_coin_dialGeom, silverMat);
  front_coin_dial.name = "front_coin_dial";
  front_coin_dial.rotation.x = Math.PI / 2;
  front_coin_dial.position.set(0.43, 0.52, 0.755);
  front_control_group.add(front_coin_dial);

  const front_coin_centerGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.03, 16);
  const front_coin_center = new THREE.Mesh(
    front_coin_centerGeom, brushed_metalMat
  );
  front_coin_center.name = "front_coin_center";
  front_coin_center.rotation.x = Math.PI / 2;
  front_coin_center.position.set(0.43, 0.52, 0.772);
  front_control_group.add(front_coin_center);

  const front_red_switch = addBox(
    front_control_group, 0.045, 0.065, 0.025, red_indicatorMat, 0.31, 0.22, 0.77
  );
  front_red_switch.name = "front_red_switch";

  const front_screwGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.012, 10);
  const front_screws = new THREE.InstancedMesh(front_screwGeom, silverMat, 4);
  front_screws.name = "front_screws";
  const front_screw_dummy = new THREE.Object3D();
  const front_screw_positions = [
    [-0.52, 0.22],
    [0.52, 0.22],
    [-0.52, 0.58],
    [0.52, 0.58]
  ];
  for (let i = 0; i < front_screw_positions.length; i++) {
    front_screw_dummy.position.set(
      front_screw_positions[i][0],
      front_screw_positions[i][1],
      0.725
    );
    front_screw_dummy.rotation.set(Math.PI / 2, 0, 0);
    front_screw_dummy.updateMatrix();
    front_screws.setMatrixAt(i, front_screw_dummy.matrix);
  }
  front_screws.instanceMatrix.needsUpdate = true;
  front_control_group.add(front_screws);

  const plush_dog = new THREE.Group();
  plush_dog.name = "plush_dog";
  plush_dog.position.set(0, 0.82, 0.10);
  cabinet_group.add(plush_dog);

  const plush_sphereGeom = new THREE.SphereGeometry(1, 28, 18);

  const plush_torso = new THREE.Mesh(plush_sphereGeom, pink_fabricMat);
  plush_torso.name = "plush_torso";
  plush_torso.scale.set(0.22, 0.30, 0.17);
  plush_torso.position.set(0, 0.38, 0.02);
  plush_dog.add(plush_torso);

  const plush_neck_scarf = new THREE.Mesh(
    plush_sphereGeom, dark_pink_fabricMat
  );
  plush_neck_scarf.name = "plush_neck_scarf";
  plush_neck_scarf.scale.set(0.19, 0.055, 0.15);
  plush_neck_scarf.position.set(0, 0.57, 0.055);
  plush_dog.add(plush_neck_scarf);

  const plush_head = new THREE.Mesh(plush_sphereGeom, pink_fabricMat);
  plush_head.name = "plush_head";
  plush_head.scale.set(0.29, 0.27, 0.23);
  plush_head.position.set(0, 0.75, 0.055);
  plush_dog.add(plush_head);

  const plush_earGeom = new THREE.CapsuleGeometry(0.09, 0.22, 8, 16);

  const plush_left_ear = new THREE.Mesh(plush_earGeom, pink_fabricMat);
  plush_left_ear.name = "plush_left_ear";
  plush_left_ear.scale.set(1.05, 1.0, 0.72);
  plush_left_ear.rotation.z = -0.24;
  plush_left_ear.position.set(-0.255, 0.70, 0.035);
  plush_dog.add(plush_left_ear);

  const plush_right_ear = new THREE.Mesh(plush_earGeom, pink_fabricMat);
  plush_right_ear.name = "plush_right_ear";
  plush_right_ear.scale.set(1.05, 1.0, 0.72);
  plush_right_ear.rotation.z = 0.24;
  plush_right_ear.position.set(0.255, 0.70, 0.035);
  plush_dog.add(plush_right_ear);

  const plush_inner_earGeom = new THREE.SphereGeometry(1, 20, 12);
  const plush_left_inner_ear = new THREE.Mesh(
    plush_inner_earGeom, dark_pink_fabricMat
  );
  plush_left_inner_ear.name = "plush_left_inner_ear";
  plush_left_inner_ear.scale.set(0.055, 0.14, 0.018);
  plush_left_inner_ear.rotation.z = -0.24;
  plush_left_inner_ear.position.set(-0.267, 0.69, 0.112);
  plush_dog.add(plush_left_inner_ear);

  const plush_right_inner_ear = new THREE.Mesh(
    plush_inner_earGeom, dark_pink_fabricMat
  );
  plush_right_inner_ear.name = "plush_right_inner_ear";
  plush_right_inner_ear.scale.set(0.055, 0.14, 0.018);
  plush_right_inner_ear.rotation.z = 0.24;
  plush_right_inner_ear.position.set(0.267, 0.69, 0.112);
  plush_dog.add(plush_right_inner_ear);

  const plush_muzzle = new THREE.Mesh(plush_sphereGeom, cream_muzzleMat);
  plush_muzzle.name = "plush_muzzle";
  plush_muzzle.scale.set(0.18, 0.125, 0.105);
  plush_muzzle.position.set(0, 0.665, 0.245);
  plush_dog.add(plush_muzzle);

  const plush_eyeGeom = new THREE.SphereGeometry(0.035, 18, 12);
  const plush_left_eye = new THREE.Mesh(plush_eyeGeom, black_plasticMat);
  plush_left_eye.name = "plush_left_eye";
  plush_left_eye.position.set(-0.105, 0.79, 0.267);
  plush_dog.add(plush_left_eye);

  const plush_right_eye = new THREE.Mesh(plush_eyeGeom, black_plasticMat);
  plush_right_eye.name = "plush_right_eye";
  plush_right_eye.position.set(0.105, 0.79, 0.267);
  plush_dog.add(plush_right_eye);

  const plush_eye_glintGeom = new THREE.SphereGeometry(0.009, 10, 6);
  const plush_left_eye_glint = new THREE.Mesh(
    plush_eye_glintGeom, white_plasticMat
  );
  plush_left_eye_glint.name = "plush_left_eye_glint";
  plush_left_eye_glint.position.set(-0.095, 0.802, 0.298);
  plush_dog.add(plush_left_eye_glint);

  const plush_right_eye_glint = new THREE.Mesh(
    plush_eye_glintGeom, white_plasticMat
  );
  plush_right_eye_glint.name = "plush_right_eye_glint";
  plush_right_eye_glint.position.set(0.115, 0.802, 0.298);
  plush_dog.add(plush_right_eye_glint);

  const plush_nose = new THREE.Mesh(plush_sphereGeom, black_plasticMat);
  plush_nose.name = "plush_nose";
  plush_nose.scale.set(0.068, 0.052, 0.045);
  plush_nose.position.set(0, 0.705, 0.355);
  plush_dog.add(plush_nose);

  const plush_mouth_leftCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.685, 0.354),
    new THREE.Vector3(-0.018, 0.650, 0.356),
    new THREE.Vector3(-0.065, 0.642, 0.342)
  ], false, "centripetal");
  const plush_mouth_leftGeom = new THREE.TubeGeometry(
    plush_mouth_leftCurve, 10, 0.007, 6, false
  );
  const plush_mouth_left = new THREE.Mesh(
    plush_mouth_leftGeom, black_plasticMat
  );
  plush_mouth_left.name = "plush_mouth_left";
  plush_dog.add(plush_mouth_left);

  const plush_mouth_rightCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.685, 0.354),
    new THREE.Vector3(0.018, 0.650, 0.356),
    new THREE.Vector3(0.065, 0.642, 0.342)
  ], false, "centripetal");
  const plush_mouth_rightGeom = new THREE.TubeGeometry(
    plush_mouth_rightCurve, 10, 0.007, 6, false
  );
  const plush_mouth_right = new THREE.Mesh(
    plush_mouth_rightGeom, black_plasticMat
  );
  plush_mouth_right.name = "plush_mouth_right";
  plush_dog.add(plush_mouth_right);

  const plush_armGeom = new THREE.CapsuleGeometry(0.075, 0.23, 8, 16);
  const plush_left_arm = new THREE.Mesh(plush_armGeom, pink_fabricMat);
  plush_left_arm.name = "plush_left_arm";
  plush_left_arm.rotation.z = -0.48;
  plush_left_arm.position.set(-0.22, 0.37, 0.065);
  plush_dog.add(plush_left_arm);

  const plush_right_arm = new THREE.Mesh(plush_armGeom, pink_fabricMat);
  plush_right_arm.name = "plush_right_arm";
  plush_right_arm.rotation.z = 0.48;
  plush_right_arm.position.set(0.22, 0.37, 0.065);
  plush_dog.add(plush_right_arm);

  const plush_left_paw = new THREE.Mesh(plush_sphereGeom, pink_fabricMat);
  plush_left_paw.name = "plush_left_paw";
  plush_left_paw.scale.set(0.10, 0.085, 0.09);
  plush_left_paw.position.set(-0.285, 0.24, 0.13);
  plush_dog.add(plush_left_paw);

  const plush_right_paw = new THREE.Mesh(plush_sphereGeom, pink_fabricMat);
  plush_right_paw.name = "plush_right_paw";
  plush_right_paw.scale.set(0.10, 0.085, 0.09);
  plush_right_paw.position.set(0.285, 0.24, 0.13);
  plush_dog.add(plush_right_paw);

  const plush_legGeom = new THREE.CapsuleGeometry(0.10, 0.16, 8, 16);
  const plush_left_leg = new THREE.Mesh(plush_legGeom, pink_fabricMat);
  plush_left_leg.name = "plush_left_leg";
  plush_left_leg.rotation.z = -0.28;
  plush_left_leg.position.set(-0.14, 0.16, 0.035);
  plush_dog.add(plush_left_leg);

  const plush_right_leg = new THREE.Mesh(plush_legGeom, pink_fabricMat);
  plush_right_leg.name = "plush_right_leg";
  plush_right_leg.rotation.z = 0.28;
  plush_right_leg.position.set(0.14, 0.16, 0.035);
  plush_dog.add(plush_right_leg);

  const plush_left_foot = new THREE.Mesh(plush_sphereGeom, pink_fabricMat);
  plush_left_foot.name = "plush_left_foot";
  plush_left_foot.scale.set(0.15, 0.105, 0.16);
  plush_left_foot.position.set(-0.17, 0.075, 0.17);
  plush_dog.add(plush_left_foot);

  const plush_right_foot = new THREE.Mesh(plush_sphereGeom, pink_fabricMat);
  plush_right_foot.name = "plush_right_foot";
  plush_right_foot.scale.set(0.15, 0.105, 0.16);
  plush_right_foot.position.set(0.17, 0.075, 0.17);
  plush_dog.add(plush_right_foot);

  const plush_soleGeom = new THREE.CircleGeometry(0.09, 20);
  const plush_left_sole = new THREE.Mesh(plush_soleGeom, cream_muzzleMat);
  plush_left_sole.name = "plush_left_sole";
  plush_left_sole.scale.set(1.0, 0.65, 1);
  plush_left_sole.position.set(-0.17, 0.075, 0.332);
  plush_dog.add(plush_left_sole);

  const plush_right_sole = new THREE.Mesh(plush_soleGeom, cream_muzzleMat);
  plush_right_sole.name = "plush_right_sole";
  plush_right_sole.scale.set(1.0, 0.65, 1);
  plush_right_sole.position.set(0.17, 0.075, 0.332);
  plush_dog.add(plush_right_sole);

  const plush_fur_tuftGeom = new THREE.ConeGeometry(0.008, 0.028, 5);
  const plush_fur_tufts = new THREE.InstancedMesh(
    plush_fur_tuftGeom, pink_fabricMat, 36
  );
  plush_fur_tufts.name = "plush_fur_tufts";
  const fur_dummy = new THREE.Object3D();
  const fur_up = new THREE.Vector3(0, 1, 0);
  let fur_index = 0;

  for (let row = 0; row < 6; row++) {
    const y = 0.56 + row * 0.072;
    const dy = (y - 0.75) / 0.27;
    const head_radius = 0.29 * Math.sqrt(Math.max(0.15, 1 - dy * dy));

    for (let col = 0; col < 6; col++) {
      const x = (col - 2.5) * head_radius * 0.32;
      const dx = x / 0.29;
      const surface_z = 0.055 + 0.23 * Math.sqrt(
        Math.max(0.12, 1 - dx * dx - dy * dy)
      );
      const normal = new THREE.Vector3(dx * 0.7, dy * 0.35, 1).normalize();

      fur_dummy.position.set(x, y, surface_z + 0.012);
      fur_dummy.quaternion.setFromUnitVectors(fur_up, normal);
      fur_dummy.scale.set(1, 1, 1);
      fur_dummy.updateMatrix();
      plush_fur_tufts.setMatrixAt(fur_index, fur_dummy.matrix);
      fur_index++;
    }
  }
  plush_fur_tufts.instanceMatrix.needsUpdate = true;
  plush_dog.add(plush_fur_tufts);

  fitToUnitCube(THREE, root);
  return root;
}