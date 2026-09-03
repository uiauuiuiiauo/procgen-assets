export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "iridescent_glass_pyramid";

  const baseY = 0.02;
  const apexY = 1.28;
  const halfWidth = 0.72;
  const baseDepth = halfWidth * 1.43;
  const frontZ = baseDepth / 2;
  const rearZ = -frontZ;
  const leftX = -halfWidth;
  const rightX = halfWidth;

  const apex = new THREE.Vector3(0, apexY, 0);
  const front_left = new THREE.Vector3(leftX, baseY, frontZ);
  const front_right = new THREE.Vector3(rightX, baseY, frontZ);
  const rear_right = new THREE.Vector3(rightX, baseY, rearZ);
  const rear_left = new THREE.Vector3(leftX, baseY, rearZ);

  function makeTriangleGeometry(a, b, c) {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      ], 3)
    );
    geom.computeVertexNormals();
    return geom;
  }

  function makeQuadGeometry(a, b, c, d) {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z,
        a.x, a.y, a.z,
        c.x, c.y, c.z,
        d.x, d.y, d.z
      ], 3)
    );
    geom.computeVertexNormals();
    return geom;
  }

  function makeBaseFacetGeometry(outerA, outerB, innerB, innerA) {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute([
        outerA.x, 0, outerA.z,
        outerB.x, 0, outerB.z,
        innerB.x, baseY, innerB.z,
        outerA.x, 0, outerA.z,
        innerB.x, baseY, innerB.z,
        innerA.x, baseY, innerA.z
      ], 3)
    );
    geom.computeVertexNormals();
    return geom;
  }

  function makePatchGeometry(points) {
    const positions = [];
    for (let i = 1; i < points.length - 1; i++) {
      const triangle = [points[0], points[i], points[i + 1]];
      for (const point of triangle) {
        positions.push(point.x, point.y, point.z);
      }
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geom.computeVertexNormals();
    return geom;
  }

  function barycentricPoint(a, b, c, wa, wb, wc, offset) {
    const normal = new THREE.Vector3()
      .subVectors(b, a)
      .cross(new THREE.Vector3().subVectors(c, a))
      .normalize();
    const point = new THREE.Vector3()
      .addScaledVector(a, wa)
      .addScaledVector(b, wb)
      .addScaledVector(c, wc);
    return point.addScaledVector(normal, offset);
  }

  function makeFaceMaterial(color, opacity) {
    return new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.95,
      ior: 1.5,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }

  function makePatchMaterial(color, opacity) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.3,
      transparent: true,
      opacity,
      side: THREE.DoubleSide,
      depthWrite: false
    });
  }

  const front_facetMat = makeFaceMaterial(0xb9f5f3, 0.34);
  const right_facetMat = makeFaceMaterial(0xd8c8ef, 0.42);
  const rear_facetMat = makeFaceMaterial(0xb7e9f2, 0.38);
  const left_facetMat = makeFaceMaterial(0xc8d9f5, 0.42);

  const front_facetGeom = makeTriangleGeometry(apex, front_right, front_left);
  const front_facet = new THREE.Mesh(front_facetGeom, front_facetMat);
  front_facet.name = "front_facet";
  front_facet.renderOrder = 4;
  root.add(front_facet);

  const right_facetGeom = makeTriangleGeometry(apex, rear_right, front_right);
  const right_facet = new THREE.Mesh(right_facetGeom, right_facetMat);
  right_facet.name = "right_facet";
  right_facet.renderOrder = 3;
  root.add(right_facet);

  const rear_facetGeom = makeTriangleGeometry(apex, rear_left, rear_right);
  const rear_facet = new THREE.Mesh(rear_facetGeom, rear_facetMat);
  rear_facet.name = "rear_facet";
  rear_facet.renderOrder = 1;
  root.add(rear_facet);

  const left_facetGeom = makeTriangleGeometry(apex, front_left, rear_left);
  const left_facet = new THREE.Mesh(left_facetGeom, left_facetMat);
  left_facet.name = "left_facet";
  left_facet.renderOrder = 2;
  root.add(left_facet);

  const base_frontMat = makeFaceMaterial(0xaeeeff, 0.52);
  const base_rightMat = makeFaceMaterial(0xe1b8ff, 0.54);
  const base_rearMat = makeFaceMaterial(0xb6d8ff, 0.48);
  const base_leftMat = makeFaceMaterial(0xffd1ad, 0.52);

  const innerFrontZ = frontZ * 0.82;
  const innerRearZ = rearZ * 0.82;
  const innerLeftX = leftX * 0.82;
  const innerRightX = rightX * 0.82;

  const base_frontGeom = makeBaseFacetGeometry(
    front_left,
    front_right,
    new THREE.Vector3(innerRightX, baseY, innerFrontZ),
    new THREE.Vector3(innerLeftX, baseY, innerFrontZ)
  );
  const base_front = new THREE.Mesh(base_frontGeom, base_frontMat);
  base_front.name = "base_front";
  base_front.renderOrder = 5;
  root.add(base_front);

  const base_rightGeom = makeBaseFacetGeometry(
    front_right,
    rear_right,
    new THREE.Vector3(innerRightX, baseY, innerRearZ),
    new THREE.Vector3(innerRightX, baseY, innerFrontZ)
  );
  const base_right = new THREE.Mesh(base_rightGeom, base_rightMat);
  base_right.name = "base_right";
  base_right.renderOrder = 4;
  root.add(base_right);

  const base_rearGeom = makeBaseFacetGeometry(
    rear_right,
    rear_left,
    new THREE.Vector3(innerLeftX, baseY, innerRearZ),
    new THREE.Vector3(innerRightX, baseY, innerRearZ)
  );
  const base_rear = new THREE.Mesh(base_rearGeom, base_rearMat);
  base_rear.name = "base_rear";
  base_rear.renderOrder = 2;
  root.add(base_rear);

  const base_leftGeom = makeBaseFacetGeometry(
    rear_left,
    front_left,
    new THREE.Vector3(innerLeftX, baseY, innerFrontZ),
    new THREE.Vector3(innerLeftX, baseY, innerRearZ)
  );
  const base_left = new THREE.Mesh(base_leftGeom, base_leftMat);
  base_left.name = "base_left";
  base_left.renderOrder = 3;
  root.add(base_left);

  const base_coreMat = new THREE.MeshStandardMaterial({
    color: 0xc8b9e8,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const base_coreGeom = new THREE.BufferGeometry();
  base_coreGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([
      0, 0.014, innerFrontZ,
      innerRightX, 0.014, 0,
      0, 0.014, innerRearZ,
      0, 0.014, innerFrontZ,
      0, 0.014, innerRearZ,
      innerLeftX, 0.014, 0
    ], 3)
  );
  base_coreGeom.computeVertexNormals();
  const base_core = new THREE.Mesh(base_coreGeom, base_coreMat);
  base_core.name = "base_core";
  base_core.renderOrder = 1;
  root.add(base_core);

  const internal_reflectionMat = new THREE.MeshStandardMaterial({
    color: 0x84e8ed,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.24,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const internal_reflectionGeom = makeQuadGeometry(
    new THREE.Vector3(leftX * 0.84, 0.235, frontZ * 0.82),
    new THREE.Vector3(rightX * 0.84, 0.235, frontZ * 0.82),
    new THREE.Vector3(rightX * 0.84, 0.235, rearZ * 0.82),
    new THREE.Vector3(leftX * 0.84, 0.235, rearZ * 0.82)
  );
  const internal_reflection = new THREE.Mesh(
    internal_reflectionGeom,
    internal_reflectionMat
  );
  internal_reflection.name = "internal_reflection";
  internal_reflection.renderOrder = 0;
  root.add(internal_reflection);

  const front_left_normal = new THREE.Vector3()
    .subVectors(front_right, apex)
    .cross(new THREE.Vector3().subVectors(front_left, apex))
    .normalize();
  const front_right_normal = new THREE.Vector3()
    .subVectors(rear_right, apex)
    .cross(new THREE.Vector3().subVectors(front_right, apex))
    .normalize();
  const left_normal = new THREE.Vector3()
    .subVectors(front_left, apex)
    .cross(new THREE.Vector3().subVectors(rear_left, apex))
    .normalize();
  const right_normal = new THREE.Vector3()
    .subVectors(rear_right, apex)
    .cross(new THREE.Vector3().subVectors(front_right, apex))
    .normalize();

  function frontPoint(wapex, wright, wleft, offset) {
    return barycentricPoint(
      apex,
      front_right,
      front_left,
      wapex,
      wright,
      wleft,
      offset
    );
  }

  function leftFacePoint(wapex, wfront, wrear, offset) {
    return barycentricPoint(
      apex,
      front_left,
      rear_left,
      wapex,
      wfront,
      wrear,
      offset
    );
  }

  function rightFacePoint(wapex, wfront, wrear, offset) {
    return barycentricPoint(
      apex,
      front_right,
      rear_right,
      wapex,
      wfront,
      wrear,
      offset
    );
  }

  const front_left_cyan_patchMat = makePatchMaterial(0x13e6f2, 0.5);
  const front_left_cyan_patchGeom = makePatchGeometry([
    frontPoint(0.72, 0.28, 0.001, 0.004),
    frontPoint(0.88, 0.12, 0.001, 0.004),
    frontPoint(0.90, 0.001, 0.099, 0.004),
    frontPoint(0.62, 0.001, 0.379, 0.004)
  ]);
  const front_left_cyan_patch = new THREE.Mesh(
    front_left_cyan_patchGeom,
    front_left_cyan_patchMat
  );
  front_left_cyan_patch.name = "front_left_cyan_patch";
  front_left_cyan_patch.renderOrder = 6;
  root.add(front_left_cyan_patch);

  const front_left_magenta_patchMat = makePatchMaterial(0xee36d7, 0.48);
  const front_left_magenta_patchGeom = makePatchGeometry([
    frontPoint(0.48, 0.001, 0.519, 0.004),
    frontPoint(0.72, 0.001, 0.279, 0.004),
    frontPoint(0.82, 0.001, 0.179, 0.004),
    frontPoint(0.38, 0.001, 0.619, 0.004)
  ]);
  const front_left_magenta_patch = new THREE.Mesh(
    front_left_magenta_patchGeom,
    front_left_magenta_patchMat
  );
  front_left_magenta_patch.name = "front_left_magenta_patch";
  front_left_magenta_patch.renderOrder = 6;
  root.add(front_left_magenta_patch);

  const front_left_yellow_patchMat = makePatchMaterial(0xffd42d, 0.58);
  const front_left_yellow_patchGeom = makePatchGeometry([
    frontPoint(0.91, 0.001, 0.089, 0.004),
    frontPoint(0.98, 0.001, 0.019, 0.004),
    frontPoint(0.82, 0.001, 0.179, 0.004),
    frontPoint(0.76, 0.001, 0.239, 0.004)
  ]);
  const front_left_yellow_patch = new THREE.Mesh(
    front_left_yellow_patchGeom,
    front_left_yellow_patchMat
  );
  front_left_yellow_patch.name = "front_left_yellow_patch";
  front_left_yellow_patch.renderOrder = 6;
  root.add(front_left_yellow_patch);

  const front_left_green_patchMat = makePatchMaterial(0x63ed72, 0.46);
  const front_left_green_patchGeom = makePatchGeometry([
    frontPoint(0.86, 0.001, 0.139, 0.004),
    frontPoint(0.95, 0.001, 0.049, 0.004),
    frontPoint(0.98, 0.001, 0.019, 0.004),
    frontPoint(0.90, 0.001, 0.099, 0.004)
  ]);
  const front_left_green_patch = new THREE.Mesh(
    front_left_green_patchGeom,
    front_left_green_patchMat
  );
  front_left_green_patch.name = "front_left_green_patch";
  front_left_green_patch.renderOrder = 6;
  root.add(front_left_green_patch);

  const front_right_violet_patchMat = makePatchMaterial(0x9c43e8, 0.5);
  const front_right_violet_patchGeom = makePatchGeometry([
    frontPoint(0.68, 0.319, 0.001, 0.004),
    frontPoint(0.84, 0.159, 0.001, 0.004),
    frontPoint(0.90, 0.001, 0.099, 0.004),
    frontPoint(0.58, 0.001, 0.419, 0.004)
  ]);
  const front_right_violet_patch = new THREE.Mesh(
    front_right_violet_patchGeom,
    front_right_violet_patchMat
  );
  front_right_violet_patch.name = "front_right_violet_patch";
  front_right_violet_patch.renderOrder = 6;
  root.add(front_right_violet_patch);

  const front_right_green_patchMat = makePatchMaterial(0x58e878, 0.52);
  const front_right_green_patchGeom = makePatchGeometry([
    frontPoint(0.84, 0.159, 0.001, 0.004),
    frontPoint(0.94, 0.059, 0.001, 0.004),
    frontPoint(0.98, 0.001, 0.019, 0.004),
    frontPoint(0.88, 0.001, 0.119, 0.004)
  ]);
  const front_right_green_patch = new THREE.Mesh(
    front_right_green_patchGeom,
    front_right_green_patchMat
  );
  front_right_green_patch.name = "front_right_green_patch";
  front_right_green_patch.renderOrder = 6;
  root.add(front_right_green_patch);

  const front_right_yellow_patchMat = makePatchMaterial(0xffc928, 0.58);
  const front_right_yellow_patchGeom = makePatchGeometry([
    frontPoint(0.92, 0.059, 0.001, 0.004),
    frontPoint(0.98, 0.001, 0.019, 0.004),
    frontPoint(0.88, 0.001, 0.119, 0.004),
    frontPoint(0.84, 0.119, 0.001, 0.004)
  ]);
  const front_right_yellow_patch = new THREE.Mesh(
    front_right_yellow_patchGeom,
    front_right_yellow_patchMat
  );
  front_right_yellow_patch.name = "front_right_yellow_patch";
  front_right_yellow_patch.renderOrder = 6;
  root.add(front_right_yellow_patch);

  const left_orange_patchMat = makePatchMaterial(0xff6655, 0.48);
  const left_orange_patchGeom = makePatchGeometry([
    leftFacePoint(0.84, 0.159, 0.001, 0.004),
    leftFacePoint(0.96, 0.039, 0.001, 0.004),
    leftFacePoint(0.98, 0.001, 0.019, 0.004),
    leftFacePoint(0.88, 0.001, 0.119, 0.004)
  ]);
  const left_orange_patch = new THREE.Mesh(
    left_orange_patchGeom,
    left_orange_patchMat
  );
  left_orange_patch.name = "left_orange_patch";
  left_orange_patch.renderOrder = 6;
  root.add(left_orange_patch);

  const left_cyan_patchMat = makePatchMaterial(0x16dff4, 0.5);
  const left_cyan_patchGeom = makePatchGeometry([
    leftFacePoint(0.68, 0.319, 0.001, 0.004),
    leftFacePoint(0.84, 0.159, 0.001, 0.004),
    leftFacePoint(0.90, 0.001, 0.099, 0.004),
    leftFacePoint(0.58, 0.001, 0.419, 0.004)
  ]);
  const left_cyan_patch = new THREE.Mesh(
    left_cyan_patchGeom,
    left_cyan_patchMat
  );
  left_cyan_patch.name = "left_cyan_patch";
  left_cyan_patch.renderOrder = 6;
  root.add(left_cyan_patch);

  const right_magenta_patchMat = makePatchMaterial(0xe63bd1, 0.46);
  const right_magenta_patchGeom = makePatchGeometry([
    rightFacePoint(0.72, 0.279, 0.001, 0.004),
    rightFacePoint(0.88, 0.119, 0.001, 0.004),
    rightFacePoint(0.90, 0.001, 0.099, 0.004),
    rightFacePoint(0.62, 0.001, 0.379, 0.004)
  ]);
  const right_magenta_patch = new THREE.Mesh(
    right_magenta_patchGeom,
    right_magenta_patchMat
  );
  right_magenta_patch.name = "right_magenta_patch";
  right_magenta_patch.renderOrder = 6;
  root.add(right_magenta_patch);

  const right_yellow_patchMat = makePatchMaterial(0xffd22e, 0.56);
  const right_yellow_patchGeom = makePatchGeometry([
    rightFacePoint(0.92, 0.059, 0.001, 0.004),
    rightFacePoint(0.98, 0.001, 0.019, 0.004),
    rightFacePoint(0.88, 0.001, 0.119, 0.004),
    rightFacePoint(0.84, 0.119, 0.001, 0.004)
  ]);
  const right_yellow_patch = new THREE.Mesh(
    right_yellow_patchGeom,
    right_yellow_patchMat
  );
  right_yellow_patch.name = "right_yellow_patch";
  right_yellow_patch.renderOrder = 6;
  root.add(right_yellow_patch);

  const base_front_cyan_patchMat = makePatchMaterial(0x00dfff, 0.62);
  const base_front_cyan_patchGeom = makePatchGeometry([
    new THREE.Vector3(-0.36, 0.004, frontZ),
    new THREE.Vector3(0.02, 0.004, frontZ),
    new THREE.Vector3(0, baseY + 0.004, innerFrontZ),
    new THREE.Vector3(-0.18, baseY + 0.004, innerFrontZ)
  ]);
  const base_front_cyan_patch = new THREE.Mesh(
    base_front_cyan_patchGeom,
    base_front_cyan_patchMat
  );
  base_front_cyan_patch.name = "base_front_cyan_patch";
  base_front_cyan_patch.renderOrder = 7;
  root.add(base_front_cyan_patch);

  const base_front_magenta_patchMat = makePatchMaterial(0xe33de2, 0.58);
  const base_front_magenta_patchGeom = makePatchGeometry([
    new THREE.Vector3(0.02, 0.004, frontZ),
    new THREE.Vector3(0.38, 0.004, frontZ),
    new THREE.Vector3(0.18, baseY + 0.004, innerFrontZ),
    new THREE.Vector3(0, baseY + 0.004, innerFrontZ)
  ]);
  const base_front_magenta_patch = new THREE.Mesh(
    base_front_magenta_patchGeom,
    base_front_magenta_patchMat
  );
  base_front_magenta_patch.name = "base_front_magenta_patch";
  base_front_magenta_patch.renderOrder = 7;
  root.add(base_front_magenta_patch);

  const base_right_green_patchMat = makePatchMaterial(0x59e878, 0.58);
  const base_right_green_patchGeom = makePatchGeometry([
    new THREE.Vector3(rightX, 0.004, frontZ),
    new THREE.Vector3(rightX, 0.004, 0.02),
    new THREE.Vector3(innerRightX, baseY + 0.004, 0),
    new THREE.Vector3(innerRightX, baseY + 0.004, innerFrontZ)
  ]);
  const base_right_green_patch = new THREE.Mesh(
    base_right_green_patchGeom,
    base_right_green_patchMat
  );
  base_right_green_patch.name = "base_right_green_patch";
  base_right_green_patch.renderOrder = 7;
  root.add(base_right_green_patch);

  const base_right_yellow_patchMat = makePatchMaterial(0xffd42c, 0.6);
  const base_right_yellow_patchGeom = makePatchGeometry([
    new THREE.Vector3(rightX, 0.004, 0.02),
    new THREE.Vector3(rightX, 0.004, rearZ),
    new THREE.Vector3(innerRightX, baseY + 0.004, innerRearZ),
    new THREE.Vector3(innerRightX, baseY + 0.004, 0)
  ]);
  const base_right_yellow_patch = new THREE.Mesh(
    base_right_yellow_patchGeom,
    base_right_yellow_patchMat
  );
  base_right_yellow_patch.name = "base_right_yellow_patch";
  base_right_yellow_patch.renderOrder = 7;
  root.add(base_right_yellow_patch);

  const base_left_patchMat = makePatchMaterial(0x7268ed, 0.5);
  const base_left_patchGeom = makePatchGeometry([
    new THREE.Vector3(leftX, 0.004, frontZ),
    new THREE.Vector3(innerLeftX, baseY + 0.004, innerFrontZ),
    new THREE.Vector3(innerLeftX, baseY + 0.004, 0),
    new THREE.Vector3(leftX, 0.004, 0.04)
  ]);
  const base_left_patch = new THREE.Mesh(
    base_left_patchGeom,
    base_left_patchMat
  );
  base_left_patch.name = "base_left_patch";
  base_left_patch.renderOrder = 7;
  root.add(base_left_patch);

  const edgePositions = [];

  function addEdge(a, b) {
    edgePositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  }

  addEdge(apex, front_left);
  addEdge(apex, front_right);
  addEdge(apex, rear_left);
  addEdge(apex, rear_right);
  addEdge(front_left, front_right);
  addEdge(front_right, rear_right);
  addEdge(rear_right, rear_left);
  addEdge(rear_left, front_left);

  const pyramid_edgesGeom = new THREE.BufferGeometry();
  pyramid_edgesGeom.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(edgePositions, 3)
  );
  const pyramid_edgesMat = new THREE.LineBasicMaterial({
    color: 0x63dce9,
    transparent: true,
    opacity: 0.72
  });
  const pyramid_edges = new THREE.LineSegments(
    pyramid_edgesGeom,
    pyramid_edgesMat
  );
  pyramid_edges.name = "pyramid_edges";
  pyramid_edges.renderOrder = 8;
  root.add(pyramid_edges);

  fitToUnitCube(THREE, root);
  return root;

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
}