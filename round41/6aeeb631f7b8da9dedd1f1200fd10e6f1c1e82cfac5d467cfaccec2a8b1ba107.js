export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "kayak";

  const length = 5.2;
  const halfLength = length / 2;
  const halfWidth = 0.34;
  const cockpitHalfLength = 0.68;
  const cockpitHalfWidth = 0.255;

  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x59615a,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x454d47,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide,
  });
  const cockpitMat = new THREE.MeshStandardMaterial({
    color: 0x151b17,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });
  const cordMat = new THREE.MeshStandardMaterial({
    color: 0x171a18,
    metalness: 0.0,
    roughness: 0.8,
  });
  const paddleMat = new THREE.MeshStandardMaterial({
    color: 0x3f4741,
    metalness: 0.0,
    roughness: 0.8,
  });
  const badgeMat = new THREE.MeshStandardMaterial({
    color: 0x737b74,
    metalness: 0.0,
    roughness: 0.7,
  });

  function hullProfileAt(z) {
    const t = Math.min(1, Math.abs(z) / halfLength);
    const endCurve = Math.pow(
      Math.max(0, Math.cos(t * Math.PI / 2)),
      0.55
    );
    const width = halfWidth * endCurve;
    const top = 0.08 + 0.20 * Math.pow(t, 4);
    const bottom = -0.24 + 0.31 * Math.pow(t, 5);
    return { width, top, bottom };
  }

  function deckSurfaceAt(x, z) {
    const profile = hullProfileAt(z);
    const ratio = Math.min(0.98, Math.abs(x) / Math.max(profile.width, 0.001));
    const cross = Math.sqrt(Math.max(0, 1 - ratio * ratio));
    return profile.bottom + (profile.top - profile.bottom) * Math.pow(cross, 0.35);
  }

  function createHullGeometry() {
    const longitudinalSegments = 56;
    const crossSegments = 20;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= longitudinalSegments; i++) {
      const z = -halfLength + length * i / longitudinalSegments;
      const profile = hullProfileAt(z);

      for (let j = 0; j <= crossSegments; j++) {
        const angle = Math.PI * j / crossSegments;
        const sine = Math.max(0, Math.sin(angle));
        const x = profile.width * Math.cos(angle);
        const y = profile.bottom +
          (profile.top - profile.bottom) * Math.pow(sine, 0.35);
        positions.push(x, y, z);
      }
    }

    const row = crossSegments + 1;
    for (let i = 0; i < longitudinalSegments; i++) {
      for (let j = 0; j < crossSegments; j++) {
        const a = i * row + j;
        const b = (i + 1) * row + j;
        const c = (i + 1) * row + j + 1;
        const d = i * row + j + 1;
        indices.push(a, d, b, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createDeckGeometry(side, startZ, endZ) {
    const longitudinalSegments = 24;
    const transverseSegments = 8;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= longitudinalSegments; i++) {
      const z = startZ + (endZ - startZ) * i / longitudinalSegments;
      const profile = hullProfileAt(z);
      const innerX = side * (cockpitHalfWidth + 0.035);
      const outerX = side * profile.width * 0.91;

      for (let j = 0; j <= transverseSegments; j++) {
        const u = j / transverseSegments;
        const x = side * (innerX + (outerX - innerX) * u);
        const y = deckSurfaceAt(x, z) + 0.007;
        positions.push(x, y, z);
      }
    }

    const row = transverseSegments + 1;
    for (let i = 0; i < longitudinalSegments; i++) {
      for (let j = 0; j < transverseSegments; j++) {
        const a = i * row + j;
        const b = (i + 1) * row + j;
        const c = (i + 1) * row + j + 1;
        const d = i * row + j + 1;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createDeckRailGeometry(side) {
    const points = [];
    const samples = 28;

    for (let i = 0; i <= samples; i++) {
      const z = -halfLength + length * i / samples;
      const x = side * hullProfileAt(z).width * 0.94;
      points.push(new THREE.Vector3(x, deckSurfaceAt(x, z) + 0.018, z));
    }

    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      72,
      0.012,
      7,
      false
    );
  }

  function createDeckCordGeometry(x1, z1, x2, z2) {
    const dx = x2 - x1;
    const dz = z2 - z1;
    const lengthBetween = Math.sqrt(dx * dx + dz * dz);
    const steps = Math.max(4, Math.ceil(lengthBetween / 0.12));
    const points = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = x1 + dx * t;
      const z = z1 + dz * t;
      points.push(new THREE.Vector3(x, deckSurfaceAt(x, z) + 0.026, z));
    }

    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      steps * 3,
      0.007,
      6,
      false
    );
  }

  const hullGeom = createHullGeometry();
  const hull = new THREE.Mesh(hullGeom, hullMat);
  hull.name = "hull";
  root.add(hull);

  const bow_deckGeom = createDeckGeometry(1, cockpitHalfLength, halfLength - 0.035);
  const bow_deck = new THREE.Mesh(bow_deckGeom, hullMat);
  bow_deck.name = "bow_deck";
  root.add(bow_deck);

  const stern_deckGeom = createDeckGeometry(-1, -halfLength + 0.035, -cockpitHalfLength);
  const stern_deck = new THREE.Mesh(stern_deckGeom, hullMat);
  stern_deck.name = "stern_deck";
  root.add(stern_deck);

  const bow_deck_panelGeom = createDeckGeometry(-1, cockpitHalfLength, halfLength - 0.035);
  const bow_deck_panel = new THREE.Mesh(bow_deck_panelGeom, hullMat);
  bow_deck_panel.name = "bow_deck_panel";
  root.add(bow_deck_panel);

  const stern_deck_panelGeom = createDeckGeometry(1, -halfLength + 0.035, -cockpitHalfLength);
  const stern_deck_panel = new THREE.Mesh(stern_deck_panelGeom, hullMat);
  stern_deck_panel.name = "stern_deck_panel";
  root.add(stern_deck_panel);

  const cockpit_openingGeom = new THREE.CircleGeometry(1, 48);
  const cockpit_opening = new THREE.Mesh(cockpit_openingGeom, cockpitMat);
  cockpit_opening.name = "cockpit_opening";
  cockpit_opening.rotation.x = -Math.PI / 2;
  cockpit_opening.scale.set(0.235, 0.62, 1);
  cockpit_opening.position.y = 0.087;
  root.add(cockpit_opening);

  function createCockpitRimGeometry(radiusX, radiusZ, height, tubeRadius) {
    const points = [];
    const samples = 48;

    for (let i = 0; i < samples; i++) {
      const angle = Math.PI * 2 * i / samples;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radiusX,
        height,
        Math.sin(angle) * radiusZ
      ));
    }

    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, true),
      72,
      tubeRadius,
      8,
      true
    );
  }

  const cockpit_outer_rimGeom = createCockpitRimGeometry(
    cockpitHalfWidth,
    cockpitHalfLength,
    0.119,
    0.025
  );
  const cockpit_outer_rim = new THREE.Mesh(cockpit_outer_rimGeom, trimMat);
  cockpit_outer_rim.name = "cockpit_outer_rim";
  root.add(cockpit_outer_rim);

  const cockpit_inner_rimGeom = createCockpitRimGeometry(
    0.218,
    0.615,
    0.116,
    0.011
  );
  const cockpit_inner_rim = new THREE.Mesh(cockpit_inner_rimGeom, cockpitMat);
  cockpit_inner_rim.name = "cockpit_inner_rim";
  root.add(cockpit_inner_rim);

  const port_gunwaleGeom = createDeckRailGeometry(-1);
  const port_gunwale = new THREE.Mesh(port_gunwaleGeom, trimMat);
  port_gunwale.name = "port_gunwale";
  root.add(port_gunwale);

  const starboard_gunwaleGeom = createDeckRailGeometry(1);
  const starboard_gunwale = new THREE.Mesh(starboard_gunwaleGeom, trimMat);
  starboard_gunwale.name = "starboard_gunwale";
  root.add(starboard_gunwale);

  const bow_bungee_leftGeom = createDeckCordGeometry(0.11, 1.05, 0.12, 2.25);
  const bow_bungee_left = new THREE.Mesh(bow_bungee_leftGeom, cordMat);
  bow_bungee_left.name = "bow_bungee_left";
  root.add(bow_bungee_left);

  const bow_bungee_rightGeom = createDeckCordGeometry(-0.11, 1.05, -0.12, 2.25);
  const bow_bungee_right = new THREE.Mesh(bow_bungee_rightGeom, cordMat);
  bow_bungee_right.name = "bow_bungee_right";
  root.add(bow_bungee_right);

  const bow_bungee_cross_1Geom = createDeckCordGeometry(-0.17, 1.42, 0.17, 1.42);
  const bow_bungee_cross_1 = new THREE.Mesh(bow_bungee_cross_1Geom, cordMat);
  bow_bungee_cross_1.name = "bow_bungee_cross_1";
  root.add(bow_bungee_cross_1);

  const bow_bungee_cross_2Geom = createDeckCordGeometry(-0.15, 1.82, 0.15, 1.82);
  const bow_bungee_cross_2 = new THREE.Mesh(bow_bungee_cross_2Geom, cordMat);
  bow_bungee_cross_2.name = "bow_bungee_cross_2";
  root.add(bow_bungee_cross_2);

  const bow_bungee_cross_3Geom = createDeckCordGeometry(-0.13, 2.18, 0.13, 2.18);
  const bow_bungee_cross_3 = new THREE.Mesh(bow_bungee_cross_3Geom, cordMat);
  bow_bungee_cross_3.name = "bow_bungee_cross_3";
  root.add(bow_bungee_cross_3);

  const stern_bungee_leftGeom = createDeckCordGeometry(0.11, -1.05, 0.12, -2.25);
  const stern_bungee_left = new THREE.Mesh(stern_bungee_leftGeom, cordMat);
  stern_bungee_left.name = "stern_bungee_left";
  root.add(stern_bungee_left);

  const stern_bungee_rightGeom = createDeckCordGeometry(-0.11, -1.05, -0.12, -2.25);
  const stern_bungee_right = new THREE.Mesh(stern_bungee_rightGeom, cordMat);
  stern_bungee_right.name = "stern_bungee_right";
  root.add(stern_bungee_right);

  const stern_bungee_cross_1Geom = createDeckCordGeometry(-0.17, -1.42, 0.17, -1.42);
  const stern_bungee_cross_1 = new THREE.Mesh(stern_bungee_cross_1Geom, cordMat);
  stern_bungee_cross_1.name = "stern_bungee_cross_1";
  root.add(stern_bungee_cross_1);

  const stern_bungee_cross_2Geom = createDeckCordGeometry(-0.15, -1.82, 0.15, -1.82);
  const stern_bungee_cross_2 = new THREE.Mesh(stern_bungee_cross_2Geom, cordMat);
  stern_bungee_cross_2.name = "stern_bungee_cross_2";
  root.add(stern_bungee_cross_2);

  const stern_bungee_cross_3Geom = createDeckCordGeometry(-0.13, -2.18, 0.13, -2.18);
  const stern_bungee_cross_3 = new THREE.Mesh(stern_bungee_cross_3Geom, cordMat);
  stern_bungee_cross_3.name = "stern_bungee_cross_3";
  root.add(stern_bungee_cross_3);

  const anchorPositions = [
    [0.11, 1.05], [-0.11, 1.05],
    [0.12, 2.25], [-0.12, 2.25],
    [0.11, -1.05], [-0.11, -1.05],
    [0.12, -2.25], [-0.12, -2.25],
  ];
  const deck_anchor_clipsGeom = new THREE.BoxGeometry(0.055, 0.018, 0.075);
  const deck_anchor_clips = new THREE.InstancedMesh(
    deck_anchor_clipsGeom,
    cordMat,
    anchorPositions.length
  );
  deck_anchor_clips.name = "deck_anchor_clips";

  const anchorDummy = new THREE.Object3D();
  for (let i = 0; i < anchorPositions.length; i++) {
    const x = anchorPositions[i][0];
    const z = anchorPositions[i][1];
    anchorDummy.position.set(x, deckSurfaceAt(x, z) + 0.027, z);
    anchorDummy.rotation.set(0, 0, 0);
    anchorDummy.scale.set(1, 1, 1);
    anchorDummy.updateMatrix();
    deck_anchor_clips.setMatrixAt(i, anchorDummy.matrix);
  }
  deck_anchor_clips.instanceMatrix.needsUpdate = true;
  root.add(deck_anchor_clips);

  const paddleY = 0.235;
  const paddle_shaftGeom = new THREE.CylinderGeometry(0.018, 0.018, 3.45, 12);
  const paddle_shaft = new THREE.Mesh(paddle_shaftGeom, paddleMat);
  paddle_shaft.name = "paddle_shaft";
  paddle_shaft.rotation.x = Math.PI / 2;
  paddle_shaft.position.y = paddleY;
  root.add(paddle_shaft);

  const paddle_bladeShape = new THREE.Shape();
  paddle_bladeShape.moveTo(0.045, -0.052);
  paddle_bladeShape.bezierCurveTo(0.22, -0.09, 0.50, -0.165, 0.70, -0.15);
  paddle_bladeShape.bezierCurveTo(0.79, -0.12, 0.83, -0.055, 0.82, 0);
  paddle_bladeShape.bezierCurveTo(0.81, 0.065, 0.76, 0.12, 0.68, 0.145);
  paddle_bladeShape.bezierCurveTo(0.46, 0.16, 0.22, 0.09, 0.045, 0.052);
  paddle_bladeShape.lineTo(0.045, -0.052);

  const paddle_bladeGeom = new THREE.ExtrudeGeometry(paddle_bladeShape, {
    depth: 0.026,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 2,
  });
  paddle_bladeGeom.translate(0, 0, -0.013);
  paddle_bladeGeom.rotateX(Math.PI / 2);

  const right_paddle_blade = new THREE.Mesh(paddle_bladeGeom, paddleMat);
  right_paddle_blade.name = "right_paddle_blade";
  right_paddle_blade.position.y = paddleY;
  root.add(right_paddle_blade);

  const left_paddle_blade = new THREE.Mesh(paddle_bladeGeom, paddleMat);
  left_paddle_blade.name = "left_paddle_blade";
  left_paddle_blade.rotation.y = Math.PI;
  left_paddle_blade.position.y = paddleY;
  root.add(left_paddle_blade);

  const paddle_collarGeom = new THREE.CylinderGeometry(0.032, 0.032, 0.105, 12);

  const front_paddle_collar = new THREE.Mesh(paddle_collarGeom, cordMat);
  front_paddle_collar.name = "front_paddle_collar";
  front_paddle_collar.rotation.x = Math.PI / 2;
  front_paddle_collar.position.set(0, paddleY, 0.82);
  root.add(front_paddle_collar);

  const rear_paddle_collar = new THREE.Mesh(paddle_collarGeom, cordMat);
  rear_paddle_collar.name = "rear_paddle_collar";
  rear_paddle_collar.rotation.x = Math.PI / 2;
  rear_paddle_collar.position.set(0, paddleY, -0.82);
  root.add(rear_paddle_collar);

  const front_paddle_strapGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, paddleY + 0.01, 0.82),
      new THREE.Vector3(0.015, 0.17, 0.76),
      new THREE.Vector3(0.025, deckSurfaceAt(0.025, 0.70) + 0.03, 0.70),
    ]),
    12,
    0.008,
    6,
    false
  );
  const front_paddle_strap = new THREE.Mesh(front_paddle_strapGeom, cordMat);
  front_paddle_strap.name = "front_paddle_strap";
  root.add(front_paddle_strap);

  const rear_paddle_strapGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, paddleY + 0.01, -0.82),
      new THREE.Vector3(-0.015, 0.17, -0.76),
      new THREE.Vector3(-0.025, deckSurfaceAt(-0.025, -0.70) + 0.03, -0.70),
    ]),
    12,
    0.008,
    6,
    false
  );
  const rear_paddle_strap = new THREE.Mesh(rear_paddle_strapGeom, cordMat);
  rear_paddle_strap.name = "rear_paddle_strap";
  root.add(rear_paddle_strap);

  const strap_drop_weightGeom = new THREE.SphereGeometry(0.03, 12, 8);

  const front_strap_drop_weight = new THREE.Mesh(strap_drop_weightGeom, cordMat);
  front_strap_drop_weight.name = "front_strap_drop_weight";
  front_strap_drop_weight.scale.set(0.65, 1.15, 0.65);
  front_strap_drop_weight.position.set(0.025, deckSurfaceAt(0.025, 0.70) + 0.035, 0.70);
  root.add(front_strap_drop_weight);

  const rear_strap_drop_weight = new THREE.Mesh(strap_drop_weightGeom, cordMat);
  rear_strap_drop_weight.name = "rear_strap_drop_weight";
  rear_strap_drop_weight.scale.set(0.65, 1.15, 0.65);
  rear_strap_drop_weight.position.set(-0.025, deckSurfaceAt(-0.025, -0.70) + 0.035, -0.70);
  root.add(rear_strap_drop_weight);

  const brand_badgeGeom = new THREE.BoxGeometry(0.009, 0.045, 0.18);
  const brand_badge = new THREE.Mesh(brand_badgeGeom, badgeMat);
  brand_badge.name = "brand_badge";
  brand_badge.position.set(halfWidth + 0.004, -0.065, 0);
  root.add(brand_badge);

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