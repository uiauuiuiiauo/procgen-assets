export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "silver_glitter_fedora";

  const brimRx = 1.70;
  const brimRz = 1.15;
  const brimThickness = 0.045;
  const crownBaseY = 0.105;
  const crownTopY = 1.30;
  const crownBaseRx = 0.92;
  const crownBaseRz = 0.70;
  const crownTopRx = 0.72;
  const crownTopRz = 0.54;
  const bandBottomY = 0.15;
  const bandTopY = 0.56;

  const glitterMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2
  });
  const ribbonMat = new THREE.MeshStandardMaterial({
    color: 0x15151a,
    metalness: 0.0,
    roughness: 0.95
  });
  const ribbonEdgeMat = new THREE.MeshStandardMaterial({
    color: 0x09090c,
    metalness: 0.0,
    roughness: 0.95
  });
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd6a83f,
    metalness: 0.6,
    roughness: 0.2
  });
  const goldHighlightMat = new THREE.MeshStandardMaterial({
    color: 0xf2d477,
    metalness: 0.6,
    roughness: 0.2
  });
  const goldShadowMat = new THREE.MeshStandardMaterial({
    color: 0x9b6d1e,
    metalness: 0.6,
    roughness: 0.2
  });
  const whiteGlitterMat = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const brightSilverGlitterMat = new THREE.MeshBasicMaterial({
    color: 0xf2f2f2
  });

  function brimTopY(r, angle) {
    return 0.08 +
      0.025 * Math.pow(r, 4) -
      0.015 * Math.pow(Math.sin(angle), 2) * Math.pow(r, 3) +
      0.015 * Math.cos(angle * 2) * Math.pow(r, 4);
  }

  function createBrimGeometry() {
    const radialSegments = 14;
    const angularSegments = 72;
    const vertices = [];
    const indices = [];

    vertices.push(0, brimTopY(0, 0), 0);
    for (let ring = 1; ring <= radialSegments; ring++) {
      const r = ring / radialSegments;
      for (let segment = 0; segment < angularSegments; segment++) {
        const angle = segment / angularSegments * Math.PI * 2;
        vertices.push(
          Math.cos(angle) * brimRx * r,
          brimTopY(r, angle),
          Math.sin(angle) * brimRz * r
        );
      }
    }

    const bottomOffset = vertices.length / 3;
    vertices.push(0, brimTopY(0, 0) - brimThickness, 0);
    for (let ring = 1; ring <= radialSegments; ring++) {
      const r = ring / radialSegments;
      for (let segment = 0; segment < angularSegments; segment++) {
        const angle = segment / angularSegments * Math.PI * 2;
        vertices.push(
          Math.cos(angle) * brimRx * r,
          brimTopY(r, angle) - brimThickness,
          Math.sin(angle) * brimRz * r
        );
      }
    }

    for (let segment = 0; segment < angularSegments; segment++) {
      const next = (segment + 1) % angularSegments;
      indices.push(0, 1 + next, 1 + segment);
      indices.push(bottomOffset, bottomOffset + 1 + segment, bottomOffset + 1 + next);
    }

    for (let ring = 1; ring < radialSegments; ring++) {
      const innerStart = 1 + (ring - 1) * angularSegments;
      const outerStart = 1 + ring * angularSegments;
      const bottomInnerStart = bottomOffset + innerStart;
      const bottomOuterStart = bottomOffset + outerStart;

      for (let segment = 0; segment < angularSegments; segment++) {
        const next = (segment + 1) % angularSegments;

        const ia = innerStart + segment;
        const ib = innerStart + next;
        const oa = outerStart + segment;
        const ob = outerStart + next;
        indices.push(ia, ib, oa, ib, ob, oa);

        const bia = bottomInnerStart + segment;
        const bib = bottomInnerStart + next;
        const boa = bottomOuterStart + segment;
        const bob = bottomOuterStart + next;
        indices.push(bia, boa, bib, bib, boa, bob);
      }
    }

    const outerStart = 1 + (radialSegments - 1) * angularSegments;
    const bottomOuterStart = bottomOffset + outerStart;
    for (let segment = 0; segment < angularSegments; segment++) {
      const next = (segment + 1) % angularSegments;
      const topA = outerStart + segment;
      const topB = outerStart + next;
      const bottomA = bottomOuterStart + segment;
      const bottomB = bottomOuterStart + next;
      indices.push(topA, topB, bottomA, topB, bottomB, bottomA);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const brimGeom = createBrimGeometry();
  const brim = new THREE.Mesh(brimGeom, glitterMat);
  brim.name = "brim";
  root.add(brim);

  const brimEdgePoints = [];
  for (let i = 0; i < 72; i++) {
    const angle = i / 72 * Math.PI * 2;
    brimEdgePoints.push(new THREE.Vector3(
      Math.cos(angle) * brimRx,
      brimTopY(1, angle) - 0.006,
      Math.sin(angle) * brimRz
    ));
  }
  const brim_edgeGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(brimEdgePoints, true, "centripetal"),
    144,
    0.018,
    8,
    true
  );
  const brim_edge = new THREE.Mesh(brim_edgeGeom, edgeMat);
  brim_edge.name = "brim_edge";
  root.add(brim_edge);

  function crownPoint(angle, t, radialOffset) {
    const rx = crownBaseRx + (crownTopRx - crownBaseRx) * t +
      0.025 * Math.sin(Math.PI * t);
    const rz = crownBaseRz + (crownTopRz - crownBaseRz) * t +
      0.018 * Math.sin(Math.PI * t);
    const front = Math.max(0, Math.sin(angle));
    const back = Math.max(0, -Math.sin(angle));
    const side = Math.abs(Math.cos(angle));
    const upper = Math.max(0, (t - 0.5) / 0.5);
    const pinch = Math.exp(-Math.pow((Math.abs(Math.cos(angle)) - 0.48) / 0.25, 2));
    const deformation = 1 -
      upper * (
        0.105 * front * pinch +
        0.025 * back * pinch
      );

    let y = crownBaseY + (crownTopY - crownBaseY) * t;
    y -= 0.065 * front * Math.pow(t, 1.4) * pinch;
    y -= 0.012 * back * Math.pow(t, 1.4) * pinch;
    y += 0.018 * Math.pow(side, 4) * Math.sin(Math.PI * t);

    return new THREE.Vector3(
      Math.cos(angle) * (rx * deformation + radialOffset),
      y,
      Math.sin(angle) * (rz * deformation + radialOffset)
    );
  }

  function createCrownGeometry() {
    const angularSegments = 72;
    const verticalSegments = 14;
    const topRings = 10;
    const vertices = [];
    const indices = [];

    for (let row = 0; row <= verticalSegments; row++) {
      const t = row / verticalSegments;
      for (let segment = 0; segment < angularSegments; segment++) {
        const angle = segment / angularSegments * Math.PI * 2;
        const point = crownPoint(angle, t, 0);
        vertices.push(point.x, point.y, point.z);
      }
    }

    for (let row = 0; row < verticalSegments; row++) {
      const lowerStart = row * angularSegments;
      const upperStart = (row + 1) * angularSegments;
      for (let segment = 0; segment < angularSegments; segment++) {
        const next = (segment + 1) % angularSegments;
        const lowerA = lowerStart + segment;
        const lowerB = lowerStart + next;
        const upperA = upperStart + segment;
        const upperB = upperStart + next;
        indices.push(lowerA, upperA, lowerB, lowerB, upperA, upperB);
      }
    }

    const topCenterIndex = vertices.length / 3;
    vertices.push(0, crownTopY - 0.055, 0);

    const topRingStarts = [];
    for (let ring = 1; ring < topRings; ring++) {
      const r = ring / topRings;
      topRingStarts.push(vertices.length / 3);
      for (let segment = 0; segment < angularSegments; segment++) {
        const angle = segment / angularSegments * Math.PI * 2;
        const edge = crownPoint(angle, 1, 0);
        const x = edge.x * r;
        const z = edge.z * r;
        const front = Math.max(0, z / crownTopRz);
        const side = Math.abs(x / crownTopRx);
        const pinch = Math.exp(-Math.pow((Math.abs(x / crownTopRx) - 0.48) / 0.25, 2));
        const y = crownTopY -
          0.055 * (1 - r * r) -
          0.045 * front * pinch * r +
          0.018 * Math.pow(side, 4) * r;
        vertices.push(x, y, z);
      }
    }

    const firstTopRing = topRingStarts[0];
    for (let segment = 0; segment < angularSegments; segment++) {
      const next = (segment + 1) % angularSegments;
      indices.push(topCenterIndex, firstTopRing + next, firstTopRing + segment);
    }

    for (let ring = 0; ring < topRingStarts.length - 1; ring++) {
      const innerStart = topRingStarts[ring];
      const outerStart = topRingStarts[ring + 1];
      for (let segment = 0; segment < angularSegments; segment++) {
        const next = (segment + 1) % angularSegments;
        const ia = innerStart + segment;
        const ib = innerStart + next;
        const oa = outerStart + segment;
        const ob = outerStart + next;
        indices.push(ia, ib, oa, ib, ob, oa);
      }
    }

    const sideTopStart = verticalSegments * angularSegments;
    const lastTopRing = topRingStarts[topRingStarts.length - 1];
    for (let segment = 0; segment < angularSegments; segment++) {
      const next = (segment + 1) % angularSegments;
      const sideA = sideTopStart + segment;
      const sideB = sideTopStart + next;
      const topA = lastTopRing + segment;
      const topB = lastTopRing + next;
      indices.push(sideA, topA, sideB, sideB, topA, topB);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const crownGeom = createCrownGeometry();
  const crown = new THREE.Mesh(crownGeom, glitterMat);
  crown.name = "crown";
  root.add(crown);

  const crownCreasePoints = [];
  for (let i = 0; i <= 10; i++) {
    const z = -0.30 + i / 10 * 0.60;
    const normalizedZ = z / crownTopRz;
    const y = crownTopY -
      0.055 * (1 - normalizedZ * normalizedZ) -
      0.012 * Math.max(0, -normalizedZ) +
      0.006;
    crownCreasePoints.push(new THREE.Vector3(0, y, z));
  }
  const crown_creaseGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(crownCreasePoints, false, "centripetal"),
    32,
    0.012,
    7,
    false
  );
  const crown_crease = new THREE.Mesh(crown_creaseGeom, edgeMat);
  crown_crease.name = "crown_crease";
  root.add(crown_crease);

  function bandRadiiAtY(y) {
    const t = Math.max(0, Math.min(1, (y - crownBaseY) / (crownTopY - crownBaseY)));
    return {
      rx: crownBaseRx + (crownTopRx - crownBaseRx) * t +
        0.025 * Math.sin(Math.PI * t),
      rz: crownBaseRz + (crownTopRz - crownBaseRz) * t +
        0.018 * Math.sin(Math.PI * t)
    };
  }

  function createBandGeometry() {
    const angularSegments = 72;
    const verticalSegments = 4;
    const vertices = [];
    const indices = [];

    for (let row = 0; row <= verticalSegments; row++) {
      const y = bandBottomY + (bandTopY - bandBottomY) * row / verticalSegments;
      const radii = bandRadiiAtY(y);
      for (let segment = 0; segment < angularSegments; segment++) {
        const angle = segment / angularSegments * Math.PI * 2;
        vertices.push(
          Math.cos(angle) * (radii.rx + 0.025),
          y,
          Math.sin(angle) * (radii.rz + 0.025)
        );
      }
    }

    for (let row = 0; row < verticalSegments; row++) {
      const lowerStart = row * angularSegments;
      const upperStart = (row + 1) * angularSegments;
      for (let segment = 0; segment < angularSegments; segment++) {
        const next = (segment + 1) % angularSegments;
        const lowerA = lowerStart + segment;
        const lowerB = lowerStart + next;
        const upperA = upperStart + segment;
        const upperB = upperStart + next;
        indices.push(lowerA, upperA, lowerB, lowerB, upperA, upperB);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const hat_bandGeom = createBandGeometry();
  const hat_band = new THREE.Mesh(hat_bandGeom, ribbonMat);
  hat_band.name = "hat_band";
  root.add(hat_band);

  function createEllipseTubeGeometry(y, rx, rz, radius) {
    const points = [];
    for (let i = 0; i < 72; i++) {
      const angle = i / 72 * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * rx,
        y,
        Math.sin(angle) * rz
      ));
    }
    return new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points, true, "centripetal"),
      120,
      radius,
      7,
      true
    );
  }

  const band_lower_edgeGeom = createEllipseTubeGeometry(
    bandBottomY,
    bandRadiiAtY(bandBottomY).rx + 0.027,
    bandRadiiAtY(bandBottomY).rz + 0.027,
    0.012
  );
  const band_lower_edge = new THREE.Mesh(band_lower_edgeGeom, ribbonEdgeMat);
  band_lower_edge.name = "band_lower_edge";
  root.add(band_lower_edge);

  const band_upper_edgeGeom = createEllipseTubeGeometry(
    bandTopY,
    bandRadiiAtY(bandTopY).rx + 0.027,
    bandRadiiAtY(bandTopY).rz + 0.027,
    0.012
  );
  const band_upper_edge = new THREE.Mesh(band_upper_edgeGeom, ribbonEdgeMat);
  band_upper_edge.name = "band_upper_edge";
  root.add(band_upper_edge);

  const bow_group = new THREE.Group();
  bow_group.name = "bow_group";
  const bowAngle = 0.80;
  const bowRadii = bandRadiiAtY(0.35);
  const bowNormal = new THREE.Vector3(
    Math.cos(bowAngle) / bowRadii.rx,
    0,
    Math.sin(bowAngle) / bowRadii.rz
  ).normalize();
  bow_group.position.set(
    Math.cos(bowAngle) * (bowRadii.rx + 0.045),
    0.35,
    Math.sin(bowAngle) * (bowRadii.rz + 0.045)
  );
  bow_group.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    bowNormal
  );
  root.add(bow_group);

  const bowLeftShape = new THREE.Shape();
  bowLeftShape.moveTo(-0.015, 0.10);
  bowLeftShape.bezierCurveTo(-0.12, 0.16, -0.31, 0.17, -0.38, 0.09);
  bowLeftShape.lineTo(-0.34, -0.12);
  bowLeftShape.bezierCurveTo(-0.24, -0.08, -0.09, -0.10, -0.015, -0.07);
  bowLeftShape.closePath();

  const bow_rightShape = new THREE.Shape();
  bow_rightShape.moveTo(0.015, 0.10);
  bow_rightShape.bezierCurveTo(0.12, 0.16, 0.31, 0.17, 0.38, 0.09);
  bow_rightShape.lineTo(0.34, -0.12);
  bow_rightShape.bezierCurveTo(0.24, -0.08, 0.09, -0.10, 0.015, -0.07);
  bow_rightShape.closePath();

  const bowExtrudeOptions = {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelThickness: 0.008,
    bevelSize: 0.008,
    bevelSegments: 2
  };

  const bow_leftGeom = new THREE.ExtrudeGeometry(bowLeftShape, bowExtrudeOptions);
  const bow_left = new THREE.Mesh(bow_leftGeom, ribbonMat);
  bow_left.name = "bow_left";
  bow_left.position.z = 0.012;
  bow_group.add(bow_left);

  const bow_rightGeom = new THREE.ExtrudeGeometry(bow_rightShape, bowExtrudeOptions);
  const bow_right = new THREE.Mesh(bow_rightGeom, ribbonMat);
  bow_right.name = "bow_right";
  bow_right.position.z = 0.012;
  bow_group.add(bow_right);

  const bowTailShape = new THREE.Shape();
  bowTailShape.moveTo(-0.07, -0.04);
  bowTailShape.lineTo(0.07, -0.04);
  bowTailShape.lineTo(0.11, -0.27);
  bowTailShape.lineTo(0, -0.22);
  bowTailShape.lineTo(-0.11, -0.27);
  bowTailShape.closePath();

  const bow_tailGeom = new THREE.ExtrudeGeometry(bowTailShape, bowExtrudeOptions);
  const bow_tail = new THREE.Mesh(bow_tailGeom, ribbonMat);
  bow_tail.name = "bow_tail";
  bow_tail.position.z = 0.008;
  bow_tail.rotation.z = -0.08;
  bow_group.add(bow_tail);

  const bow_knotGeom = new THREE.SphereGeometry(1, 20, 12);
  const bow_knot = new THREE.Mesh(bow_knotGeom, ribbonMat);
  bow_knot.name = "bow_knot";
  bow_knot.scale.set(0.115, 0.14, 0.065);
  bow_knot.position.z = 0.09;
  bow_group.add(bow_knot);

  const conchoRadius = 0.165;
  const gold_conchoGeom = new THREE.CylinderGeometry(
    conchoRadius,
    conchoRadius,
    0.055,
    40
  );
  const gold_concho = new THREE.Mesh(gold_conchoGeom, goldMat);
  gold_concho.name = "gold_concho";
  gold_concho.rotation.x = Math.PI / 2;
  gold_concho.position.z = 0.105;
  bow_group.add(gold_concho);

  const concho_rimGeom = new THREE.TorusGeometry(0.145, 0.012, 8, 40);
  const concho_rim = new THREE.Mesh(concho_rimGeom, goldHighlightMat);
  concho_rim.name = "concho_rim";
  concho_rim.position.z = 0.137;
  bow_group.add(concho_rim);

  const conchoRayGeom = new THREE.ConeGeometry(0.014, 0.105, 6);
  const concho_rays = new THREE.InstancedMesh(conchoRayGeom, goldHighlightMat, 16);
  concho_rays.name = "concho_rays";
  const rayTransform = new THREE.Object3D();
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    rayTransform.position.set(
      Math.cos(angle) * 0.073,
      Math.sin(angle) * 0.073,
      0.145
    );
    rayTransform.rotation.set(0, 0, angle - Math.PI / 2);
    rayTransform.scale.set(1, i % 2 === 0 ? 1 : 0.82, 0.65);
    rayTransform.updateMatrix();
    concho_rays.setMatrixAt(i, rayTransform.matrix);
  }
  concho_rays.instanceMatrix.needsUpdate = true;
  bow_group.add(concho_rays);

  const concho_centerGeom = new THREE.SphereGeometry(0.052, 20, 12);
  const concho_center = new THREE.Mesh(concho_centerGeom, goldHighlightMat);
  concho_center.name = "concho_center";
  concho_center.scale.set(1, 1, 0.55);
  concho_center.position.z = 0.16;
  bow_group.add(concho_center);

  const concho_center_ringGeom = new THREE.TorusGeometry(0.043, 0.006, 7, 24);
  const concho_center_ring = new THREE.Mesh(concho_center_ringGeom, goldShadowMat);
  concho_center_ring.name = "concho_center_ring";
  concho_center_ring.position.z = 0.188;
  bow_group.add(concho_center_ring);

  const glitterGeom = new THREE.IcosahedronGeometry(1, 0);
  const whiteGlitterTransforms = [];
  const silverGlitterTransforms = [];
  let glitterSerial = 0;

  function addGlitterTransform(x, y, z, nx, ny, nz, serial) {
    const selector = (serial * 7 + Math.floor(serial / 5)) % 13;
    const target = selector < 3 ? whiteGlitterTransforms : silverGlitterTransforms;
    target.push({ x, y, z, nx, ny, nz, serial });
  }

  const brimGlitterRings = 18;
  const brimGlitterSegments = 72;
  for (let ring = 1; ring <= brimGlitterRings; ring++) {
    const r = 0.97 * ring / brimGlitterRings;
    for (let segment = 0; segment < brimGlitterSegments; segment++) {
      const angle = segment / brimGlitterSegments * Math.PI * 2 +
        (ring % 2) * Math.PI / brimGlitterSegments;
      const x = Math.cos(angle) * brimRx * r;
      const z = Math.sin(angle) * brimRz * r;
      const y = brimTopY(r, angle) + 0.010;
      const serial = glitterSerial++;
      addGlitterTransform(x, y, z, 0, 1, 0, serial);
    }
  }

  const crownGlitterRows = 16;
  const crownGlitterSegments = 64;
  for (let row = 0; row < crownGlitterRows; row++) {
    const t = 0.30 + 0.685 * row / (crownGlitterRows - 1);
    for (let segment = 0; segment < crownGlitterSegments; segment++) {
      const angle = segment / crownGlitterSegments * Math.PI * 2 +
        (row % 2) * Math.PI / crownGlitterSegments;
      const point = crownPoint(angle, t, 0.010);
      const serial = glitterSerial++;
      addGlitterTransform(point.x, point.y, point.z, 0, 1, 0, serial);
    }
  }

  const topGlitterRings = 8;
  const topGlitterSegments = 48;
  for (let ring = 1; ring <= topGlitterRings; ring++) {
    const r = 0.88 * ring / topGlitterRings;
    for (let segment = 0; segment < topGlitterSegments; segment++) {
      const angle = segment / topGlitterSegments * Math.PI * 2 +
        (ring % 2) * Math.PI / topGlitterSegments;
      const x = Math.cos(angle) * crownTopRx * r;
      const z = Math.sin(angle) * crownTopRz * r;
      const front = Math.max(0, z / crownTopRz);
      const side = Math.abs(x / crownTopRx);
      const pinch = Math.exp(-Math.pow((Math.abs(x / crownTopRx) - 0.48) / 0.25, 2));
      const y = crownTopY -
        0.055 * (1 - r * r) -
        0.045 * front * pinch * r +
        0.018 * Math.pow(side, 4) * r +
        0.010;
      const serial = glitterSerial++;
      addGlitterTransform(x, y, z, 0, 1, 0, serial);
    }
  }

  function makeGlitterMesh(transforms, material, sizeFactor) {
    const mesh = new THREE.InstancedMesh(glitterGeom, material, transforms.length);
    const transform = new THREE.Object3D();

    for (let i = 0; i < transforms.length; i++) {
      const item = transforms[i];
      const size = (0.006 + (item.serial % 7) * 0.0012) * sizeFactor;
      const stretchX = 0.75 + (item.serial % 3) * 0.18;
      const stretchY = 0.45 + (item.serial % 4) * 0.10;
      const stretchZ = 0.65 + (item.serial % 5) * 0.08;

      transform.position.set(item.x, item.y, item.z);
      transform.rotation.set(
        (item.serial % 5) * 0.37,
        (item.serial % 7) * 0.29,
        (item.serial % 11) * 0.19
      );
      transform.scale.set(
        size * stretchX,
        size * stretchY,
        size * stretchZ
      );
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const glitter_silver = makeGlitterMesh(
    silverGlitterTransforms,
    brightSilverGlitterMat,
    1.0
  );
  glitter_silver.name = "glitter_silver";
  root.add(glitter_silver);

  const glitter_white = makeGlitterMesh(
    whiteGlitterTransforms,
    whiteGlitterMat,
    1.18
  );
  glitter_white.name = "glitter_white";
  root.add(glitter_white);

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