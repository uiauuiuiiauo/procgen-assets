export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ceramic_tulip";

  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xe60018,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x43a853,
    metalness: 0.0,
    roughness: 0.4,
  });
  const leafMat = stemMat;
  const receptacleMat = stemMat;

  function createPetalGeometry(height, halfWidth, bulge, thickness, lean, tipCurl) {
    const verticalSegments = 18;
    const horizontalSegments = 12;
    const rows = verticalSegments + 1;
    const cols = horizontalSegments + 1;
    const layerSize = rows * cols;
    const positions = [];
    const indices = [];

    function widthProfile(t) {
      const roundedBase = 0.12 * (1 - t) * (1 - t);
      const body = 0.82 * Math.pow(Math.sin(Math.PI * t), 0.62);
      const roundedTip = 0.22 * Math.pow(t, 4);
      return halfWidth * (roundedBase + body + roundedTip);
    }

    function surfacePoint(i, j, front) {
      const t = i / verticalSegments;
      const u = j / horizontalSegments * 2 - 1;
      const width = widthProfile(t);
      const arch = Math.sin(Math.PI * t);
      const x = lean * t + u * width;
      const y = height * t + 0.025 * u * u * arch;
      const centerBulge = bulge * (0.25 * t + 0.75 * Math.pow(t, 1.2));
      const crossCurve = thickness * 1.45 * (1 - u * u) * arch;
      const rimCurl = thickness * 0.72 * u * u * Math.pow(t, 6);
      const z = centerBulge + crossCurve - rimCurl + tipCurl * t * t * t;
      return [x, y, z];
    }

    for (let layer = 0; layer < 2; layer++) {
      for (let i = 0; i <= verticalSegments; i++) {
        for (let j = 0; j <= horizontalSegments; j++) {
          const point = surfacePoint(i, j, true);
          const offset = layer === 0 ? thickness : -thickness;
          positions.push(point[0], point[1], point[2] + offset);
        }
      }
    }

    function vertexIndex(i, j, front) {
      return (front ? layerSize : 0) + i * cols + j;
    }

    for (let i = 0; i < verticalSegments; i++) {
      for (let j = 0; j < horizontalSegments; j++) {
        const fa = vertexIndex(i, j, true);
        const fb = vertexIndex(i + 1, j, true);
        const fc = vertexIndex(i + 1, j + 1, true);
        const fd = vertexIndex(i, j + 1, true);
        indices.push(fa, fb, fd, fb, fc, fd);

        const ba = vertexIndex(i, j, false);
        const bb = vertexIndex(i + 1, j, false);
        const bc = vertexIndex(i + 1, j + 1, false);
        const bd = vertexIndex(i, j + 1, false);
        indices.push(ba, bd, bb, bb, bd, bc);
      }
    }

    for (let i = 0; i < verticalSegments; i++) {
      const leftFrontA = vertexIndex(i, 0, true);
      const leftFrontB = vertexIndex(i + 1, 0, true);
      const leftBackA = vertexIndex(i, 0, false);
      const leftBackB = vertexIndex(i + 1, 0, false);
      indices.push(
        leftFrontA, leftBackA, leftFrontB,
        leftFrontB, leftBackA, leftBackB
      );

      const rightFrontA = vertexIndex(i, horizontalSegments, true);
      const rightFrontB = vertexIndex(i + 1, horizontalSegments, true);
      const rightBackA = vertexIndex(i, horizontalSegments, false);
      const rightBackB = vertexIndex(i + 1, horizontalSegments, false);
      indices.push(
        rightFrontA, rightFrontB, rightBackA,
        rightFrontB, rightBackB, rightBackA
      );
    }

    for (let j = 0; j < horizontalSegments; j++) {
      const bottomFrontA = vertexIndex(0, j, true);
      const bottomFrontB = vertexIndex(0, j + 1, true);
      const bottomBackA = vertexIndex(0, j, false);
      const bottomBackB = vertexIndex(0, j + 1, false);
      indices.push(
        bottomFrontA, bottomFrontB, bottomBackA,
        bottomFrontB, bottomBackB, bottomBackA
      );

      const topFrontA = vertexIndex(verticalSegments, j, true);
      const topFrontB = vertexIndex(verticalSegments, j + 1, true);
      const topBackA = vertexIndex(verticalSegments, j, false);
      const topBackB = vertexIndex(verticalSegments, j + 1, false);
      indices.push(
        topFrontA, topBackA, topFrontB,
        topFrontB, topBackA, topBackB
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const stemProfile = [
    new THREE.Vector2(0.00, -0.43),
    new THREE.Vector2(0.10, -0.43),
    new THREE.Vector2(0.14, -0.40),
    new THREE.Vector2(0.16, -0.30),
    new THREE.Vector2(0.17, -0.10),
    new THREE.Vector2(0.19, 0.05),
    new THREE.Vector2(0.18, 0.12),
    new THREE.Vector2(0.00, 0.12),
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 32);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.name = "stem";
  root.add(stem);

  const receptacleGeom = new THREE.SphereGeometry(0.24, 28, 16);
  const receptacle = new THREE.Mesh(receptacleGeom, receptacleMat);
  receptacle.name = "receptacle";
  receptacle.position.set(0, 0.08, 0);
  receptacle.scale.set(1.0, 0.48, 0.95);
  root.add(receptacle);

  const leafGeom = new THREE.SphereGeometry(1, 28, 16);
  const leaf = new THREE.Mesh(leafGeom, leafMat);
  leaf.name = "leaf";
  leaf.position.set(-0.30, 0.07, 0.015);
  leaf.rotation.z = 1.10;
  leaf.scale.set(0.34, 0.075, 0.045);
  root.add(leaf);

  const backPetalGeom = createPetalGeometry(
    1.00, 0.36, 0.28, 0.034, 0.00, 0.035
  );
  const sidePetalGeom = createPetalGeometry(
    0.94, 0.34, 0.27, 0.034, 0.065, 0.060
  );
  const frontPetalGeom = createPetalGeometry(
    0.84, 0.42, 0.32, 0.038, 0.00, 0.085
  );

  const back_center_petal = new THREE.Mesh(backPetalGeom, petalMat);
  back_center_petal.name = "back_center_petal";
  back_center_petal.position.set(0, 0.055, -0.035);
  back_center_petal.rotation.y = Math.PI;
  root.add(back_center_petal);

  const back_left_petal = new THREE.Mesh(sidePetalGeom, petalMat);
  back_left_petal.name = "back_left_petal";
  back_left_petal.position.set(-0.055, 0.055, -0.015);
  back_left_petal.rotation.y = -2.20;
  back_left_petal.scale.set(0.96, 0.96, 0.96);
  root.add(back_left_petal);

  const back_right_petal = new THREE.Mesh(sidePetalGeom, petalMat);
  back_right_petal.name = "back_right_petal";
  back_right_petal.position.set(0.055, 0.055, -0.015);
  back_right_petal.rotation.y = 2.20;
  back_right_petal.scale.set(0.96, 0.96, 0.96);
  root.add(back_right_petal);

  const front_left_petal = new THREE.Mesh(sidePetalGeom, petalMat);
  front_left_petal.name = "front_left_petal";
  front_left_petal.position.set(-0.045, 0.055, 0.035);
  front_left_petal.rotation.y = -0.82;
  front_left_petal.scale.set(1.03, 0.97, 1.03);
  root.add(front_left_petal);

  const front_right_petal = new THREE.Mesh(sidePetalGeom, petalMat);
  front_right_petal.name = "front_right_petal";
  front_right_petal.position.set(0.045, 0.055, 0.035);
  front_right_petal.rotation.y = 0.82;
  front_right_petal.scale.set(1.03, 0.97, 1.03);
  root.add(front_right_petal);

  const front_center_petal = new THREE.Mesh(frontPetalGeom, petalMat);
  front_center_petal.name = "front_center_petal";
  front_center_petal.position.set(0, 0.055, 0.10);
  root.add(front_center_petal);

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