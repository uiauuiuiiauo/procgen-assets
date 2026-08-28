export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_balloon";

  const balloon_group = new THREE.Group();
  balloon_group.name = "balloon_group";
  root.add(balloon_group);

  const ribbon_group = new THREE.Group();
  ribbon_group.name = "ribbon_group";
  root.add(ribbon_group);

  const redMat = new THREE.MeshStandardMaterial({
    color: 0xf20b22,
    metalness: 0.0,
    roughness: 0.3,
  });
  const magentaMat = new THREE.MeshStandardMaterial({
    color: 0xa5009e,
    metalness: 0.0,
    roughness: 0.3,
  });
  const purpleMat = new THREE.MeshStandardMaterial({
    color: 0x5b22bd,
    metalness: 0.0,
    roughness: 0.3,
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x008eea,
    metalness: 0.0,
    roughness: 0.3,
  });
  const darkBlueMat = new THREE.MeshStandardMaterial({
    color: 0x2445c4,
    metalness: 0.0,
    roughness: 0.3,
  });
  const greenMat = new THREE.MeshStandardMaterial({
    color: 0x00a83f,
    metalness: 0.0,
    roughness: 0.3,
  });
  const yellowMat = new THREE.MeshStandardMaterial({
    color: 0xffed00,
    metalness: 0.0,
    roughness: 0.3,
  });
  const orangeMat = new THREE.MeshStandardMaterial({
    color: 0xff9800,
    metalness: 0.0,
    roughness: 0.3,
  });
  const redOrangeMat = new THREE.MeshStandardMaterial({
    color: 0xff4b22,
    metalness: 0.0,
    roughness: 0.3,
  });
  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });
  const silverShineMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    metalness: 0.35,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });
  const threadMat = new THREE.MeshStandardMaterial({
    color: 0xf2f2ed,
    metalness: 0.0,
    roughness: 0.8,
  });

  const balloonBottom = 0.0;
  const balloonHeight = 2.5;
  const maxRadius = 1.03;
  const balloonNeckR = 0.045;

  function balloonRadiusAt(t) {
    if (t <= 0 || t >= 1) return balloonNeckR;
    const u = t * 2 - 1;
    const sphereRadius = Math.sqrt(Math.max(0, 1 - u * u));
    const lowerTaper = 0.22 + 0.78 * t / 0.52;
    return maxRadius * sphereRadius * lowerTaper;
  }

  function createBalloonPanelGeometry(theta0, theta1) {
    const radialSteps = 36;
    const angularSteps = 7;
    const positions = [];
    const normals = [];
    const indices = [];

    for (let j = 0; j <= radialSteps; j++) {
      const t = j / radialSteps;
      const y = balloonBottom + balloonHeight * t;
      const radius = balloonRadiusAt(t);
      const drdt =
        (balloonRadiusAt(t + 0.001) - balloonRadiusAt(t - 0.001)) / 0.002;
      const invLength = 1 / Math.sqrt(balloonHeight * balloonHeight + drdt * drdt);

      for (let k = 0; k <= angularSteps; k++) {
        const u = k / angularSteps;
        const theta = theta0 + (theta1 - theta0) * u;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        positions.push(radius * sinTheta, y, radius * cosTheta);
        normals.push(
          cosTheta * invLength,
          -drdt * invLength / balloonHeight,
          sinTheta * invLength
        );
      }
    }

    const row = angularSteps + 1;
    for (let j = 0; j < radialSteps; j++) {
      for (let k = 0; k < angularSteps; k++) {
        const a = j * row + k;
        const b = (j + 1) * row + k;
        const c = (j + 1) * row + k + 1;
        const d = j * row + k + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    geometry.setIndex(indices);
    geometry.computeBoundingSphere();
    return geometry;
  }

  const panelStep = Math.PI * 2 / 12;
  const panelOffset = -0.08;

  const right_red_panelGeom = createBalloonPanelGeometry(
    panelOffset,
    panelOffset + panelStep
  );
  const right_red_panel = new THREE.Mesh(right_red_panelGeom, redMat);
  right_red_panel.name = "right_red_panel";
  balloon_group.add(right_red_panel);

  const front_right_magenta_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep,
    panelOffset + panelStep * 2
  );
  const front_right_magenta_panel = new THREE.Mesh(
    front_right_magenta_panelGeom,
    magentaMat
  );
  front_right_magenta_panel.name = "front_right_magenta_panel";
  balloon_group.add(front_right_magenta_panel);

  const front_right_blue_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 2,
    panelOffset + panelStep * 3
  );
  const front_right_blue_panel = new THREE.Mesh(
    front_right_blue_panelGeom,
    darkBlueMat
  );
  front_right_blue_panel.name = "front_right_blue_panel";
  balloon_group.add(front_right_blue_panel);

  const right_purple_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 3,
    panelOffset + panelStep * 4
  );
  const right_purple_panel = new THREE.Mesh(right_purple_panelGeom, purpleMat);
  right_purple_panel.name = "right_purple_panel";
  balloon_group.add(right_purple_panel);

  const front_blue_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 4,
    panelOffset + panelStep * 5
  );
  const front_blue_panel = new THREE.Mesh(front_blue_panelGeom, blueMat);
  front_blue_panel.name = "front_blue_panel";
  balloon_group.add(front_blue_panel);

  const front_green_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 5,
    panelOffset + panelStep * 6
  );
  const front_green_panel = new THREE.Mesh(front_green_panelGeom, greenMat);
  front_green_panel.name = "front_green_panel";
  balloon_group.add(front_green_panel);

  const front_yellow_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 6,
    panelOffset + panelStep * 7
  );
  const front_yellow_panel = new THREE.Mesh(front_yellow_panelGeom, yellowMat);
  front_yellow_panel.name = "front_yellow_panel";
  balloon_group.add(front_yellow_panel);

  const front_left_orange_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 7,
    panelOffset + panelStep * 8
  );
  const front_left_orange_panel = new THREE.Mesh(
    front_left_orange_panelGeom,
    orangeMat
  );
  front_left_orange_panel.name = "front_left_orange_panel";
  balloon_group.add(front_left_orange_panel);

  const left_red_orange_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 8,
    panelOffset + panelStep * 9
  );
  const left_red_orange_panel = new THREE.Mesh(
    left_red_orange_panelGeom,
    redOrangeMat
  );
  left_red_orange_panel.name = "left_red_orange_panel";
  balloon_group.add(left_red_orange_panel);

  const upper_left_red_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 9,
    panelOffset + panelStep * 10
  );
  const upper_left_red_panel = new THREE.Mesh(upper_left_red_panelGeom, redMat);
  upper_left_red_panel.name = "upper_left_red_panel";
  balloon_group.add(upper_left_red_panel);

  const back_left_magenta_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 10,
    panelOffset + panelStep * 11
  );
  const back_left_magenta_panel = new THREE.Mesh(
    back_left_magenta_panelGeom,
    magentaMat
  );
  back_left_magenta_panel.name = "back_left_magenta_panel";
  balloon_group.add(back_left_magenta_panel);

  const back_purple_panelGeom = createBalloonPanelGeometry(
    panelOffset + panelStep * 11,
    panelOffset + panelStep * 12
  );
  const back_purple_panel = new THREE.Mesh(back_purple_panelGeom, purpleMat);
  back_purple_panel.name = "back_purple_panel";
  balloon_group.add(back_purple_panel);

  const balloon_neckGeom = new THREE.CylinderGeometry(0.048, 0.035, 0.1, 20);
  const balloon_neck = new THREE.Mesh(balloon_neckGeom, redMat);
  balloon_neck.name = "balloon_neck";
  balloon_neck.position.y = -0.045;
  balloon_group.add(balloon_neck);

  const balloon_knotGeom = new THREE.SphereGeometry(0.055, 20, 12);
  const balloon_knot = new THREE.Mesh(balloon_knotGeom, redMat);
  balloon_knot.name = "balloon_knot";
  balloon_knot.scale.set(1.0, 0.72, 0.86);
  balloon_knot.position.set(0, -0.105, 0.008);
  balloon_group.add(balloon_knot);

  const balloon_loopGeom = new THREE.TorusGeometry(0.052, 0.012, 8, 28);
  const balloon_loop = new THREE.Mesh(balloon_loopGeom, redMat);
  balloon_loop.name = "balloon_loop";
  balloon_loop.scale.set(1.0, 0.72, 1.0);
  balloon_loop.rotation.z = -0.22;
  balloon_loop.position.set(0.025, -0.145, 0.018);
  balloon_group.add(balloon_loop);

  const ribbon_bandGeom = new THREE.CylinderGeometry(0.043, 0.043, 0.085, 20);
  const ribbon_band = new THREE.Mesh(ribbon_bandGeom, silverMat);
  ribbon_band.name = "ribbon_band";
  ribbon_band.position.y = -0.15;
  ribbon_group.add(ribbon_band);

  const bow_knotGeom = new THREE.SphereGeometry(0.045, 20, 12);
  const bow_knot = new THREE.Mesh(bow_knotGeom, silverShineMat);
  bow_knot.name = "bow_knot";
  bow_knot.scale.set(1.2, 0.72, 0.75);
  bow_knot.position.set(0, -0.175, 0.055);
  ribbon_group.add(bow_knot);

  const left_bow_loopShape = new THREE.Shape();
  left_bow_loopShape.moveTo(-0.015, 0.015);
  left_bow_loopShape.bezierCurveTo(-0.13, 0.12, -0.36, 0.14, -0.47, 0.035);
  left_bow_loopShape.bezierCurveTo(-0.39, -0.08, -0.15, -0.09, -0.015, -0.015);
  left_bow_loopShape.bezierCurveTo(-0.05, -0.005, -0.05, 0.005, -0.015, 0.015);

  const left_bow_loopHole = new THREE.Path();
  left_bow_loopHole.moveTo(-0.08, 0.018);
  left_bow_loopHole.bezierCurveTo(-0.18, 0.075, -0.34, 0.085, -0.40, 0.035);
  left_bow_loopHole.bezierCurveTo(-0.32, -0.025, -0.17, -0.025, -0.08, 0.018);
  left_bow_loopShape.holes.push(left_bow_loopHole);

  const left_bow_loopGeom = new THREE.ExtrudeGeometry(left_bow_loopShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const left_bow_loop = new THREE.Mesh(left_bow_loopGeom, silverMat);
  left_bow_loop.name = "left_bow_loop";
  left_bow_loop.position.set(0, -0.18, 0.028);
  left_bow_loop.rotation.z = -0.025;
  ribbon_group.add(left_bow_loop);

  const right_bow_loopShape = new THREE.Shape();
  right_bow_loopShape.moveTo(0.015, 0.015);
  right_bow_loopShape.bezierCurveTo(0.13, 0.12, 0.36, 0.14, 0.47, 0.035);
  right_bow_loopShape.bezierCurveTo(0.39, -0.08, 0.15, -0.09, 0.015, -0.015);
  right_bow_loopShape.bezierCurveTo(0.05, -0.005, 0.05, 0.005, 0.015, 0.015);

  const right_bow_loopHole = new THREE.Path();
  right_bow_loopHole.moveTo(0.08, 0.018);
  right_bow_loopHole.bezierCurveTo(0.18, 0.075, 0.34, 0.085, 0.40, 0.035);
  right_bow_loopHole.bezierCurveTo(0.32, -0.025, 0.17, -0.025, 0.08, 0.018);
  right_bow_loopShape.holes.push(right_bow_loopHole);

  const right_bow_loopGeom = new THREE.ExtrudeGeometry(right_bow_loopShape, {
    depth: 0.018,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.004,
    bevelSegments: 2,
  });
  const right_bow_loop = new THREE.Mesh(right_bow_loopGeom, silverMat);
  right_bow_loop.name = "right_bow_loop";
  right_bow_loop.position.set(0, -0.18, 0.028);
  right_bow_loop.rotation.z = 0.025;
  ribbon_group.add(right_bow_loop);

  function createRibbonStripGeometry(points, widths, segments, twistPhase) {
    const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
    const positions = [];
    const indices = [];
    const up = new THREE.Vector3(0, 1, 0);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const center = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const side = new THREE.Vector3().crossVectors(tangent, up);

      if (side.lengthSq() < 0.000001) side.set(1, 0, 0);
      side.normalize();

      const twist = twistPhase + t * Math.PI * 1.5;
      const foldedSide = side.clone().multiplyScalar(Math.cos(twist));
      const verticalSide = up.clone().multiplyScalar(Math.sin(twist));
      const indexPosition = t * (widths.length - 1);
      const widthIndex = Math.min(widths.length - 1, Math.floor(indexPosition));
      const nextWidthIndex = Math.min(widths.length - 1, widthIndex + 1);
      const widthFraction = indexPosition - widthIndex;
      const width =
        widths[widthIndex] +
        (widths[nextWidthIndex] - widths[widthIndex]) * widthFraction;
      const halfWidth = width * 0.5;

      const left = center.clone().addScaledVector(foldedSide, halfWidth);
      const right = center.clone().addScaledVector(foldedSide, -halfWidth);
      const leftUp = left.clone().addScaledVector(verticalSide, 0.006);
      const leftDown = left.clone().addScaledVector(verticalSide, -0.006);
      const rightUp = right.clone().addScaledVector(verticalSide, 0.006);
      const rightDown = right.clone().addScaledVector(verticalSide, -0.006);

      positions.push(
        left.x, left.y, left.z,
        leftUp.x, leftUp.y, leftUp.z,
        right.x, right.y, right.z,
        rightUp.x, rightUp.y, rightUp.z
      );
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 4;
      const b = (i + 1) * 4;
      indices.push(
        a, b, b + 1,
        a, b + 1, a + 1,
        a + 2, a + 3, b + 3,
        a + 2, b + 3, b + 2,
        a + 1, b + 1, b + 3,
        a + 1, b + 3, a + 3,
        a, a + 2, b + 2,
        a, b + 2, b
      );
    }

    const last = segments * 4;
    indices.push(0, 1, 3, 0, 3, 2);
    indices.push(last, last + 2, last + 3, last, last + 3, last + 1);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const left_ribbon_tailGeom = createRibbonStripGeometry(
    [
      new THREE.Vector3(-0.018, -0.205, 0.045),
      new THREE.Vector3(-0.035, -0.42, 0.055),
      new THREE.Vector3(-0.09, -0.65, 0.06),
      new THREE.Vector3(-0.17, -0.88, 0.05),
      new THREE.Vector3(-0.27, -1.12, 0.04),
      new THREE.Vector3(-0.31, -1.36, 0.03),
      new THREE.Vector3(-0.25, -1.55, 0.02),
      new THREE.Vector3(-0.29, -1.68, 0.015),
    ],
    [0.09, 0.082, 0.075, 0.068, 0.06, 0.052, 0.035, 0.006],
    36,
    -0.35
  );
  const left_ribbon_tail = new THREE.Mesh(left_ribbon_tailGeom, silverMat);
  left_ribbon_tail.name = "left_ribbon_tail";
  ribbon_group.add(left_ribbon_tail);

  const right_ribbon_tailGeom = createRibbonStripGeometry(
    [
      new THREE.Vector3(0.018, -0.205, 0.05),
      new THREE.Vector3(0.025, -0.43, 0.06),
      new THREE.Vector3(0.06, -0.68, 0.055),
      new THREE.Vector3(0.10, -0.92, 0.045),
      new THREE.Vector3(0.20, -1.16, 0.035),
      new THREE.Vector3(0.32, -1.38, 0.025),
      new THREE.Vector3(0.40, -1.56, 0.018),
      new THREE.Vector3(0.56, -1.62, 0.012),
    ],
    [0.09, 0.082, 0.075, 0.068, 0.06, 0.052, 0.035, 0.006],
    38,
    0.45
  );
  const right_ribbon_tail = new THREE.Mesh(right_ribbon_tailGeom, silverMat);
  right_ribbon_tail.name = "right_ribbon_tail";
  ribbon_group.add(right_ribbon_tail);

  const central_hanging_threadPath = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0.0, -0.21, 0.018),
      new THREE.Vector3(0.008, -0.58, 0.018),
      new THREE.Vector3(0.012, -0.98, 0.018),
      new THREE.Vector3(0.008, -1.38, 0.018),
      new THREE.Vector3(-0.005, -1.62, 0.018),
      new THREE.Vector3(-0.08, -1.71, 0.018),
      new THREE.Vector3(-0.20, -1.72, 0.018),
    ],
    false,
    "centripetal"
  );
  const central_hanging_threadGeom = new THREE.TubeGeometry(
    central_hanging_threadPath,
    40,
    0.005,
    6,
    false
  );
  const central_hanging_thread = new THREE.Mesh(
    central_hanging_threadGeom,
    threadMat
  );
  central_hanging_thread.name = "central_hanging_thread";
  ribbon_group.add(central_hanging_thread);

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