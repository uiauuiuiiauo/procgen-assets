export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "wooden_timer_box";

  const boxW = 1.12;
  const boxH = 0.72;
  const boxD = 1.00;
  const cornerR = 0.075;
  const bevel = 0.035;

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0xc99a63,
    metalness: 0.0,
    roughness: 0.6,
  });
  const grainMat = new THREE.MeshStandardMaterial({
    color: 0x70452d,
    metalness: 0.0,
    roughness: 0.9,
    transparent: true,
    opacity: 0.32,
  });
  const inkMat = new THREE.MeshStandardMaterial({
    color: 0x211d19,
    metalness: 0.0,
    roughness: 0.8,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa8873b,
    metalness: 0.55,
    roughness: 0.45,
  });
  const darkBrassMat = new THREE.MeshStandardMaterial({
    color: 0x665022,
    metalness: 0.5,
    roughness: 0.55,
  });
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0x756141,
    metalness: 0.0,
    roughness: 0.95,
  });
  const cordHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xb39a70,
    metalness: 0.0,
    roughness: 0.95,
  });

  function makeRoundedRectangleShape(width, height, radius) {
    const shape = new THREE.Shape();
    const hw = width / 2;
    const hh = height / 2;
    shape.moveTo(-hw + radius, -hh);
    shape.lineTo(hw - radius, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + radius);
    shape.lineTo(hw, hh - radius);
    shape.quadraticCurveTo(hw, hh, hw - radius, hh);
    shape.lineTo(-hw + radius, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - radius);
    shape.lineTo(-hw, -hh + radius);
    shape.quadraticCurveTo(-hw, -hh, -hw + radius, -hh);
    shape.closePath();
    return shape;
  }

  const wooden_bodyShape = makeRoundedRectangleShape(boxW, boxH, cornerR);
  const wooden_bodyGeom = new THREE.ExtrudeGeometry(wooden_bodyShape, {
    depth: boxD,
    steps: 1,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
  });
  const wooden_body = new THREE.Mesh(wooden_bodyGeom, woodMat);
  wooden_body.name = "wooden_body";
  wooden_body.position.z = -boxD / 2;
  root.add(wooden_body);

  const grainGeom = new THREE.BoxGeometry(1, 1, 1);
  const grainDummy = new THREE.Object3D();

  const topGrainCount = 34;
  const top_wood_grain = new THREE.InstancedMesh(
    grainGeom,
    grainMat,
    topGrainCount
  );
  top_wood_grain.name = "top_wood_grain";
  for (let i = 0; i < topGrainCount; i++) {
    const t = i / (topGrainCount - 1);
    const length = 0.11 + ((i * 5) % 9) * 0.031;
    const x = Math.sin(i * 2.17) * 0.31;
    const z = -0.40 + t * 0.80;
    grainDummy.position.set(x, boxH / 2 + bevel + 0.004, z);
    grainDummy.rotation.set(0, Math.sin(i * 1.43) * 0.055, 0);
    grainDummy.scale.set(length, 0.003, 0.006);
    grainDummy.updateMatrix();
    top_wood_grain.setMatrixAt(i, grainDummy.matrix);
  }
  top_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(top_wood_grain);

  const frontGrainCount = 28;
  const front_wood_grain = new THREE.InstancedMesh(
    grainGeom,
    grainMat,
    frontGrainCount
  );
  front_wood_grain.name = "front_wood_grain";
  for (let i = 0; i < frontGrainCount; i++) {
    const t = i / (frontGrainCount - 1);
    const length = 0.08 + ((i * 7) % 10) * 0.027;
    const x = Math.sin(i * 2.61) * 0.34;
    const y = -0.28 + t * 0.56;
    grainDummy.position.set(x, y, boxD / 2 + bevel + 0.004);
    grainDummy.rotation.set(0, 0, Math.sin(i * 1.19) * 0.075);
    grainDummy.scale.set(length, 0.005, 0.003);
    grainDummy.updateMatrix();
    front_wood_grain.setMatrixAt(i, grainDummy.matrix);
  }
  front_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(front_wood_grain);

  const sideGrainCount = 30;
  const side_wood_grain = new THREE.InstancedMesh(
    grainGeom,
    grainMat,
    sideGrainCount
  );
  side_wood_grain.name = "side_wood_grain";
  for (let i = 0; i < sideGrainCount; i++) {
    const t = i / (sideGrainCount - 1);
    const length = 0.09 + ((i * 4) % 9) * 0.029;
    const y = -0.27 + t * 0.54;
    const z = Math.sin(i * 2.33) * 0.32;
    grainDummy.position.set(boxW / 2 + bevel + 0.004, y, z);
    grainDummy.rotation.set(Math.sin(i * 1.27) * 0.07, 0, 0);
    grainDummy.scale.set(0.003, 0.005, length);
    grainDummy.updateMatrix();
    side_wood_grain.setMatrixAt(i, grainDummy.matrix);
  }
  side_wood_grain.instanceMatrix.needsUpdate = true;
  root.add(side_wood_grain);

  const dial_group = new THREE.Group();
  dial_group.name = "dial_group";
  dial_group.position.set(
    -0.10,
    -0.055,
    boxD / 2 + bevel + 0.008
  );
  root.add(dial_group);

  const dial_ringGeom = new THREE.TorusGeometry(0.225, 0.006, 8, 64);
  const dial_ring = new THREE.Mesh(dial_ringGeom, inkMat);
  dial_ring.name = "dial_ring";
  dial_group.add(dial_ring);

  const dial_ticksGeom = new THREE.BoxGeometry(0.011, 0.044, 0.006);
  const dial_ticks = new THREE.InstancedMesh(dial_ticksGeom, inkMat, 12);
  dial_ticks.name = "dial_ticks";
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * Math.PI * 2;
    const radial = 0.197;
    grainDummy.position.set(
      Math.sin(angle) * radial,
      Math.cos(angle) * radial,
      0.008
    );
    grainDummy.rotation.set(0, 0, -angle);
    grainDummy.scale.set(
      i % 3 === 0 ? 1.25 : 0.75,
      i % 3 === 0 ? 1.35 : 0.82,
      1
    );
    grainDummy.updateMatrix();
    dial_ticks.setMatrixAt(i, grainDummy.matrix);
  }
  dial_ticks.instanceMatrix.needsUpdate = true;
  dial_group.add(dial_ticks);

  const dial_hubGeom = new THREE.CylinderGeometry(0.047, 0.052, 0.026, 24);
  const dial_hub = new THREE.Mesh(dial_hubGeom, darkBrassMat);
  dial_hub.name = "dial_hub";
  dial_hub.rotation.x = Math.PI / 2;
  dial_hub.position.z = 0.017;
  dial_group.add(dial_hub);

  const dial_hub_capGeom = new THREE.CylinderGeometry(
    0.032,
    0.037,
    0.032,
    24
  );
  const dial_hub_cap = new THREE.Mesh(dial_hub_capGeom, brassMat);
  dial_hub_cap.name = "dial_hub_cap";
  dial_hub_cap.rotation.x = Math.PI / 2;
  dial_hub_cap.position.z = 0.032;
  dial_group.add(dial_hub_cap);

  const dial_hub_slotGeom = new THREE.BoxGeometry(0.043, 0.007, 0.004);
  const dial_hub_slot = new THREE.Mesh(dial_hub_slotGeom, inkMat);
  dial_hub_slot.name = "dial_hub_slot";
  dial_hub_slot.position.z = 0.050;
  dial_hub_slot.rotation.z = 0.68;
  dial_group.add(dial_hub_slot);

  const side_buttonGeom = new THREE.CylinderGeometry(
    0.045,
    0.050,
    0.026,
    24
  );
  const side_button = new THREE.Mesh(side_buttonGeom, darkBrassMat);
  side_button.name = "side_button";
  side_button.rotation.z = -Math.PI / 2;
  side_button.position.set(boxW / 2 + bevel + 0.015, -0.025, 0.15);
  root.add(side_button);

  const side_button_capGeom = new THREE.CylinderGeometry(
    0.032,
    0.038,
    0.030,
    24
  );
  const side_button_cap = new THREE.Mesh(side_button_capGeom, brassMat);
  side_button_cap.name = "side_button_cap";
  side_button_cap.rotation.z = -Math.PI / 2;
  side_button_cap.position.set(boxW / 2 + bevel + 0.032, -0.025, 0.15);
  root.add(side_button_cap);

  const side_button_slotGeom = new THREE.BoxGeometry(0.004, 0.007, 0.043);
  const side_button_slot = new THREE.Mesh(side_button_slotGeom, inkMat);
  side_button_slot.name = "side_button_slot";
  side_button_slot.position.set(
    boxW / 2 + bevel + 0.050,
    -0.025,
    0.15
  );
  side_button_slot.rotation.x = -0.62;
  root.add(side_button_slot);

  const side_label_bars = [
    [0.025, -0.195, 0.010, 0.070, 0.00],
    [0.065, -0.195, 0.010, 0.070, 0.00],
    [0.078, -0.228, 0.036, 0.010, 0.00],
    [0.112, -0.195, 0.010, 0.070, 0.00],
    [0.126, -0.162, 0.036, 0.010, 0.00],
    [0.126, -0.228, 0.036, 0.010, 0.00],
    [0.158, -0.195, 0.010, 0.070, 0.00],
    [0.190, -0.195, 0.010, 0.070, 0.00],
    [0.174, -0.162, 0.040, 0.010, 0.00],
    [0.174, -0.195, 0.038, 0.009, 0.00],
    [0.225, -0.195, 0.010, 0.070, 0.00],
    [0.241, -0.176, 0.042, 0.010, 0.00],
    [0.241, -0.214, 0.042, 0.010, 0.00],
    [0.264, -0.195, 0.010, 0.070, 0.00],
  ];
  const side_labelGeom = new THREE.BoxGeometry(0.007, 1, 1);
  const side_label = new THREE.InstancedMesh(
    side_labelGeom,
    inkMat,
    side_label_bars.length
  );
  side_label.name = "side_label";
  for (let i = 0; i < side_label_bars.length; i++) {
    const bar = side_label_bars[i];
    grainDummy.position.set(
      boxW / 2 + bevel + 0.008,
      bar[1],
      bar[0]
    );
    grainDummy.rotation.set(bar[4], 0, 0);
    grainDummy.scale.set(1, bar[3], bar[2]);
    grainDummy.updateMatrix();
    side_label.setMatrixAt(i, grainDummy.matrix);
  }
  side_label.instanceMatrix.needsUpdate = true;
  root.add(side_label);

  const spindle_group = new THREE.Group();
  spindle_group.name = "spindle_group";
  spindle_group.position.z = -0.10;
  root.add(spindle_group);

  const spindle_base_shadowGeom = new THREE.CylinderGeometry(
    0.087,
    0.087,
    0.012,
    32
  );
  const spindle_base_shadow = new THREE.Mesh(
    spindle_base_shadowGeom,
    darkBrassMat
  );
  spindle_base_shadow.name = "spindle_base_shadow";
  spindle_base_shadow.position.y = boxH / 2 + bevel + 0.006;
  spindle_group.add(spindle_base_shadow);

  const spindle_baseGeom = new THREE.CylinderGeometry(
    0.074,
    0.082,
    0.030,
    32
  );
  const spindle_base = new THREE.Mesh(spindle_baseGeom, brassMat);
  spindle_base.name = "spindle_base";
  spindle_base.position.y = boxH / 2 + bevel + 0.021;
  spindle_group.add(spindle_base);

  const spindle_base_rimGeom = new THREE.TorusGeometry(
    0.064,
    0.008,
    8,
    32
  );
  const spindle_base_rim = new THREE.Mesh(
    spindle_base_rimGeom,
    darkBrassMat
  );
  spindle_base_rim.name = "spindle_base_rim";
  spindle_base_rim.rotation.x = Math.PI / 2;
  spindle_base_rim.position.y = boxH / 2 + bevel + 0.037;
  spindle_group.add(spindle_base_rim);

  const postBottom = boxH / 2 + bevel + 0.028;
  const postTop = 1.405;
  const vertical_postGeom = new THREE.CylinderGeometry(
    0.030,
    0.042,
    postTop - postBottom,
    24
  );
  const vertical_post = new THREE.Mesh(vertical_postGeom, brassMat);
  vertical_post.name = "vertical_post";
  vertical_post.position.y = (postBottom + postTop) / 2;
  spindle_group.add(vertical_post);

  const post_capGeom = new THREE.CylinderGeometry(
    0.053,
    0.044,
    0.038,
    28
  );
  const post_cap = new THREE.Mesh(post_capGeom, brassMat);
  post_cap.name = "post_cap";
  post_cap.position.y = 1.416;
  spindle_group.add(post_cap);

  const post_cap_domeGeom = new THREE.SphereGeometry(0.050, 24, 12);
  const post_cap_dome = new THREE.Mesh(post_cap_domeGeom, brassMat);
  post_cap_dome.name = "post_cap_dome";
  post_cap_dome.scale.set(1, 0.36, 1);
  post_cap_dome.position.y = 1.438;
  spindle_group.add(post_cap_dome);

  const top_eyeletGeom = new THREE.TorusGeometry(0.045, 0.011, 10, 36);
  const top_eyelet = new THREE.Mesh(top_eyeletGeom, darkBrassMat);
  top_eyelet.name = "top_eyelet";
  top_eyelet.position.set(-0.037, 1.425, 0.004);
  spindle_group.add(top_eyelet);

  const eyelet_pinGeom = new THREE.CylinderGeometry(
    0.015,
    0.015,
    0.022,
    18
  );
  const eyelet_pin = new THREE.Mesh(eyelet_pinGeom, brassMat);
  eyelet_pin.name = "eyelet_pin";
  eyelet_pin.rotation.x = Math.PI / 2;
  eyelet_pin.position.set(-0.037, 1.425, 0.006);
  spindle_group.add(eyelet_pin);

  function makeCordPoints(offset, phase) {
    const points = [];
    const count = 18;
    const start = new THREE.Vector3(-0.055, 1.410, 0.018);
    const end = new THREE.Vector3(-0.34, 0.995, 0.050);
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const envelope = Math.sin(Math.PI * t);
      const twist = t * Math.PI * 10 + phase;
      points.push(
        new THREE.Vector3(
          start.x + (end.x - start.x) * t +
            Math.cos(twist) * offset * envelope,
          start.y + (end.y - start.y) * t +
            Math.sin(twist) * offset * envelope,
          start.z + (end.z - start.z) * t
        )
      );
    }
    return points;
  }

  const winding_cordPoints = makeCordPoints(0.0045, 0);
  const winding_cordCurve = new THREE.CatmullRomCurve3(
    winding_cordPoints,
    false,
    "centripetal"
  );
  const winding_cordGeom = new THREE.TubeGeometry(
    winding_cordCurve,
    72,
    0.005,
    6,
    false
  );
  const winding_cord = new THREE.Mesh(winding_cordGeom, cordMat);
  winding_cord.name = "winding_cord";
  spindle_group.add(winding_cord);

  const cord_highlightPoints = makeCordPoints(-0.0045, Math.PI);
  const cord_highlightCurve = new THREE.CatmullRomCurve3(
    cord_highlightPoints,
    false,
    "centripetal"
  );
  const cord_highlightGeom = new THREE.TubeGeometry(
    cord_highlightCurve,
    72,
    0.0022,
    5,
    false
  );
  const cord_highlight = new THREE.Mesh(
    cord_highlightGeom,
    cordHighlightMat
  );
  cord_highlight.name = "cord_highlight";
  spindle_group.add(cord_highlight);

  const cord_tipGeom = new THREE.SphereGeometry(0.009, 14, 8);
  const cord_tip = new THREE.Mesh(cord_tipGeom, cordMat);
  cord_tip.name = "cord_tip";
  cord_tip.position.set(-0.34, 0.995, 0.050);
  spindle_group.add(cord_tip);

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