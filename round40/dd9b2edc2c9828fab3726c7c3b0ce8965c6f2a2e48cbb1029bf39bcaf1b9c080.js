export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "two_by_two_color_cube";

  const cellSize = 1.0;
  const pitch = 1.02;
  const bodySize = 0.86;
  const bodyDepth = 0.86;
  const bodyBevel = 0.07;
  const panelDepth = 0.022;
  const panelBevel = 0.012;

  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x181a1b,
    metalness: 0.0,
    roughness: 0.3,
  });

  const redMat = new THREE.MeshStandardMaterial({
    color: 0xf05243,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x168de0,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffdf20,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x58ad4d,
    metalness: 0.0,
    roughness: 0.3,
  });
  const light_greenMat = new THREE.MeshStandardMaterial({
    color: 0x79df74,
    metalness: 0.0,
    roughness: 0.3,
  });
  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ef,
    metalness: 0.0,
    roughness: 0.3,
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: 0xc83d63,
    metalness: 0.0,
    roughness: 0.3,
  });

  function createRoundedRectGeometry(width, height, radius, depth, bevel) {
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

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      steps: 1,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
    });
    geometry.translate(0, 0, -depth / 2);
    return geometry;
  }

  const bodyGeom = createRoundedRectGeometry(
    bodySize,
    bodySize,
    0.115,
    bodyDepth,
    bodyBevel
  );

  const full_panelGeom = createRoundedRectGeometry(
    0.84,
    0.84,
    0.105,
    panelDepth,
    panelBevel
  );
  const half_panelGeom = createRoundedRectGeometry(
    0.84,
    0.4,
    0.08,
    panelDepth,
    panelBevel
  );
  const wide_stripeGeom = createRoundedRectGeometry(
    0.84,
    0.18,
    0.065,
    panelDepth,
    panelBevel
  );
  const narrow_stripeGeom = createRoundedRectGeometry(
    0.84,
    0.1,
    0.04,
    panelDepth,
    panelBevel
  );

  const bodyOffset = pitch / 2 - bodyBevel;
  const panelOffset = pitch / 2 + 0.008;
  const stripeOffset = pitch / 2 + 0.035;

  function createCell(name, x, y, z) {
    const cell = new THREE.Group();
    cell.name = name;
    cell.position.set(x, y, z);

    const body = new THREE.Mesh(bodyGeom, frameMat);
    body.name = name + "_body";
    cell.add(body);

    root.add(cell);
    return cell;
  }

  function addPanel(cell, name, geometry, material, face, u, v, offset) {
    const panel = new THREE.Mesh(geometry, material);
    panel.name = name;

    if (face === "front") {
      panel.position.set(u, v, offset);
    } else if (face === "back") {
      panel.position.set(u, v, -offset);
      panel.rotation.y = Math.PI;
    } else if (face === "right") {
      panel.position.set(offset, v, u);
      panel.rotation.y = Math.PI / 2;
    } else if (face === "left") {
      panel.position.set(-offset, v, u);
      panel.rotation.y = -Math.PI / 2;
    } else if (face === "top") {
      panel.position.set(u, offset, v);
      panel.rotation.x = -Math.PI / 2;
    } else {
      panel.position.set(u, -offset, v);
      panel.rotation.x = Math.PI / 2;
    }

    cell.add(panel);
    return panel;
  }

  const front_top_left_cell = createCell(
    "front_top_left_cell",
    -bodyOffset,
    bodyOffset,
    bodyOffset
  );
  const front_top_left_body = front_top_left_cell.children[0];
  const front_top_left_red_panel = addPanel(
    front_top_left_cell,
    "front_top_left_red_panel",
    full_panelGeom,
    redMat,
    "front",
    0,
    0,
    panelOffset
  );

  const front_top_right_cell = createCell(
    "front_top_right_cell",
    bodyOffset,
    bodyOffset,
    bodyOffset
  );
  const front_top_right_body = front_top_right_cell.children[0];
  const front_top_right_yellow_panel = addPanel(
    front_top_right_cell,
    "front_top_right_yellow_panel",
    full_panelGeom,
    yellowMat,
    "front",
    0,
    0,
    panelOffset
  );

  const front_bottom_left_cell = createCell(
    "front_bottom_left_cell",
    -bodyOffset,
    -bodyOffset,
    bodyOffset
  );
  const front_bottom_left_body = front_bottom_left_cell.children[0];
  const front_bottom_left_blue_panel = addPanel(
    front_bottom_left_cell,
    "front_bottom_left_blue_panel",
    full_panelGeom,
    blueMat,
    "front",
    0,
    0,
    panelOffset
  );

  const front_bottom_right_cell = createCell(
    "front_bottom_right_cell",
    bodyOffset,
    -bodyOffset,
    bodyOffset
  );
  const front_bottom_right_body = front_bottom_right_cell.children[0];
  const front_bottom_right_red_panel = addPanel(
    front_bottom_right_cell,
    "front_bottom_right_red_panel",
    full_panelGeom,
    redMat,
    "front",
    0,
    0,
    panelOffset
  );

  const right_top_front_cell = createCell(
    "right_top_front_cell",
    bodyOffset,
    bodyOffset,
    bodyOffset
  );
  const right_top_front_body = right_top_front_cell.children[0];
  const right_top_front_blue_panel = addPanel(
    right_top_front_cell,
    "right_top_front_blue_panel",
    half_panelGeom,
    blueMat,
    "right",
    0.205,
    0.29,
    panelOffset
  );
  const right_top_front_green_stripe = addPanel(
    right_top_front_cell,
    "right_top_front_green_stripe",
    wide_stripeGeom,
    greenMat,
    "right",
    0.205,
    -0.28,
    stripeOffset
  );
  const right_top_front_white_stripe = addPanel(
    right_top_front_cell,
    "right_top_front_white_stripe",
    narrow_stripeGeom,
    whiteMat,
    "right",
    -0.205,
    -0.015,
    panelOffset
  );

  const right_top_back_cell = createCell(
    "right_top_back_cell",
    bodyOffset,
    bodyOffset,
    -bodyOffset
  );
  const right_top_back_body = right_top_back_cell.children[0];
  const right_top_back_red_panel = addPanel(
    right_top_back_cell,
    "right_top_back_red_panel",
    half_panelGeom,
    redMat,
    "right",
    0,
    0.29,
    panelOffset
  );
  const right_top_back_green_stripe = addPanel(
    right_top_back_cell,
    "right_top_back_green_stripe",
    wide_stripeGeom,
    greenMat,
    "right",
    0,
    -0.28,
    stripeOffset
  );

  const right_bottom_front_cell = createCell(
    "right_bottom_front_cell",
    bodyOffset,
    -bodyOffset,
    bodyOffset
  );
  const right_bottom_front_body = right_bottom_front_cell.children[0];
  const right_bottom_front_yellow_panel = addPanel(
    right_bottom_front_cell,
    "right_bottom_front_yellow_panel",
    full_panelGeom,
    yellowMat,
    "right",
    0,
    0,
    panelOffset
  );

  const right_bottom_back_cell = createCell(
    "right_bottom_back_cell",
    bodyOffset,
    -bodyOffset,
    -bodyOffset
  );
  const right_bottom_back_body = right_bottom_back_cell.children[0];
  const right_bottom_back_magenta_panel = addPanel(
    right_bottom_back_cell,
    "right_bottom_back_magenta_panel",
    full_panelGeom,
    magentaMat,
    "right",
    0,
    0,
    panelOffset
  );

  const left_top_front_cell = createCell(
    "left_top_front_cell",
    -bodyOffset,
    bodyOffset,
    bodyOffset
  );
  const left_top_front_body = left_top_front_cell.children[0];
  const left_top_front_white_panel = addPanel(
    left_top_front_cell,
    "left_top_front_white_panel",
    full_panelGeom,
    whiteMat,
    "left",
    0,
    0,
    panelOffset
  );

  const left_top_back_cell = createCell(
    "left_top_back_cell",
    -bodyOffset,
    bodyOffset,
    -bodyOffset
  );
  const left_top_back_body = left_top_back_cell.children[0];
  const left_top_back_green_panel = addPanel(
    left_top_back_cell,
    "left_top_back_green_panel",
    full_panelGeom,
    greenMat,
    "left",
    0,
    0,
    panelOffset
  );

  const left_bottom_front_cell = createCell(
    "left_bottom_front_cell",
    -bodyOffset,
    -bodyOffset,
    bodyOffset
  );
  const left_bottom_front_body = left_bottom_front_cell.children[0];
  const left_bottom_front_white_panel = addPanel(
    left_bottom_front_cell,
    "left_bottom_front_white_panel",
    full_panelGeom,
    whiteMat,
    "left",
    0,
    0,
    panelOffset
  );

  const left_bottom_back_cell = createCell(
    "left_bottom_back_cell",
    -bodyOffset,
    -bodyOffset,
    -bodyOffset
  );
  const left_bottom_back_body = left_bottom_back_cell.children[0];
  const left_bottom_back_blue_panel = addPanel(
    left_bottom_back_cell,
    "left_bottom_back_blue_panel",
    full_panelGeom,
    blueMat,
    "left",
    0,
    0,
    panelOffset
  );

  const top_front_left_cell = createCell(
    "top_front_left_cell",
    -bodyOffset,
    bodyOffset,
    bodyOffset
  );
  const top_front_left_body = top_front_left_cell.children[0];
  const top_front_left_light_green_panel = addPanel(
    top_front_left_cell,
    "top_front_left_light_green_panel",
    full_panelGeom,
    light_greenMat,
    "top",
    0,
    0,
    panelOffset
  );

  const top_front_right_cell = createCell(
    "top_front_right_cell",
    bodyOffset,
    bodyOffset,
    bodyOffset
  );
  const top_front_right_body = top_front_right_cell.children[0];
  const top_front_right_green_panel = addPanel(
    top_front_right_cell,
    "top_front_right_green_panel",
    full_panelGeom,
    greenMat,
    "top",
    0,
    0,
    panelOffset
  );

  const top_back_left_cell = createCell(
    "top_back_left_cell",
    -bodyOffset,
    bodyOffset,
    -bodyOffset
  );
  const top_back_left_body = top_back_left_cell.children[0];
  const top_back_left_red_panel = addPanel(
    top_back_left_cell,
    "top_back_left_red_panel",
    full_panelGeom,
    redMat,
    "top",
    0,
    0,
    panelOffset
  );

  const top_back_right_cell = createCell(
    "top_back_right_cell",
    bodyOffset,
    bodyOffset,
    -bodyOffset
  );
  const top_back_right_body = top_back_right_cell.children[0];
  const top_back_right_blue_panel = addPanel(
    top_back_right_cell,
    "top_back_right_blue_panel",
    full_panelGeom,
    blueMat,
    "top",
    0,
    0,
    panelOffset
  );

  const back_top_left_cell = createCell(
    "back_top_left_cell",
    -bodyOffset,
    bodyOffset,
    -bodyOffset
  );
  const back_top_left_body = back_top_left_cell.children[0];
  const back_top_left_yellow_panel = addPanel(
    back_top_left_cell,
    "back_top_left_yellow_panel",
    full_panelGeom,
    yellowMat,
    "back",
    0,
    0,
    panelOffset
  );

  const back_top_right_cell = createCell(
    "back_top_right_cell",
    bodyOffset,
    bodyOffset,
    -bodyOffset
  );
  const back_top_right_body = back_top_right_cell.children[0];
  const back_top_right_white_panel = addPanel(
    back_top_right_cell,
    "back_top_right_white_panel",
    full_panelGeom,
    whiteMat,
    "back",
    0,
    0,
    panelOffset
  );

  const back_bottom_left_cell = createCell(
    "back_bottom_left_cell",
    -bodyOffset,
    -bodyOffset,
    -bodyOffset
  );
  const back_bottom_left_body = back_bottom_left_cell.children[0];
  const back_bottom_left_red_panel = addPanel(
    back_bottom_left_cell,
    "back_bottom_left_red_panel",
    full_panelGeom,
    redMat,
    "back",
    0,
    0,
    panelOffset
  );

  const back_bottom_right_cell = createCell(
    "back_bottom_right_cell",
    bodyOffset,
    -bodyOffset,
    -bodyOffset
  );
  const back_bottom_right_body = back_bottom_right_cell.children[0];
  const back_bottom_right_blue_panel = addPanel(
    back_bottom_right_cell,
    "back_bottom_right_blue_panel",
    full_panelGeom,
    blueMat,
    "back",
    0,
    0,
    panelOffset
  );

  const bottom_front_left_cell = createCell(
    "bottom_front_left_cell",
    -bodyOffset,
    -bodyOffset,
    bodyOffset
  );
  const bottom_front_left_body = bottom_front_left_cell.children[0];
  const bottom_front_left_green_panel = addPanel(
    bottom_front_left_cell,
    "bottom_front_left_green_panel",
    full_panelGeom,
    greenMat,
    "bottom",
    0,
    0,
    panelOffset
  );

  const bottom_front_right_cell = createCell(
    "bottom_front_right_cell",
    bodyOffset,
    -bodyOffset,
    bodyOffset
  );
  const bottom_front_right_body = bottom_front_right_cell.children[0];
  const bottom_front_right_magenta_panel = addPanel(
    bottom_front_right_cell,
    "bottom_front_right_magenta_panel",
    full_panelGeom,
    magentaMat,
    "bottom",
    0,
    0,
    panelOffset
  );

  const bottom_back_left_cell = createCell(
    "bottom_back_left_cell",
    -bodyOffset,
    -bodyOffset,
    -bodyOffset
  );
  const bottom_back_left_body = bottom_back_left_cell.children[0];
  const bottom_back_left_blue_panel = addPanel(
    bottom_back_left_cell,
    "bottom_back_left_blue_panel",
    full_panelGeom,
    blueMat,
    "bottom",
    0,
    0,
    panelOffset
  );

  const bottom_back_right_cell = createCell(
    "bottom_back_right_cell",
    bodyOffset,
    -bodyOffset,
    -bodyOffset
  );
  const bottom_back_right_body = bottom_back_right_cell.children[0];
  const bottom_back_right_yellow_panel = addPanel(
    bottom_back_right_cell,
    "bottom_back_right_yellow_panel",
    full_panelGeom,
    yellowMat,
    "bottom",
    0,
    0,
    panelOffset
  );

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