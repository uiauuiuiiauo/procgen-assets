export default function generate(THREE) {
  const root = new THREE.Group();

  const chocolate_barMat = new THREE.MeshStandardMaterial({
    color: 0x3b211d,
    metalness: 0.0,
    roughness: 0.3,
  });

  const wrapper_sheetMat = new THREE.MeshStandardMaterial({
    color: 0xb58a45,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  const wrapper_creaseMat = new THREE.MeshStandardMaterial({
    color: 0x80602f,
    metalness: 0.5,
    roughness: 0.25,
  });

  function createWrapperSheetGeometry(side) {
    const positions = [];
    const segments = 20;
    const innerX = side * 1.07;
    const outerX = side * 1.55;

    function point(t, v, outerRow) {
      const x = innerX + (outerX - innerX) * t;
      const edge = 0.72 + 0.18 * t + (outerRow ? 0.018 * Math.sin(v * Math.PI * 10) : 0);
      const z = v * edge;
      const fold = 0.012 * Math.sin(t * Math.PI * 7 + v * Math.PI * 4) * (0.25 + 0.75 * t);
      const ridge = 0.024 * Math.sin(v * Math.PI * 5) * t * (1 - t);
      const edgeCurl = 0.022 * t * t * Math.sin((v + 1) * Math.PI * 2.5);
      const shoulder = side > 0
        ? 0.08 * Math.exp(-Math.pow((x - 1.16) / 0.12, 2))
        : 0;
      return [x, shoulder + fold + ridge + edgeCurl, z];
    }

    function pushTriangle(a, b, c) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
    }

    for (let row = 0; row < 2; row++) {
      const v0 = -1 + row;
      const v1 = -1 + row + 1;
      for (let i = 0; i < segments; i++) {
        const t0 = i / segments;
        const t1 = (i + 1) / segments;
        const p00 = point(t0, v0, row);
        const p10 = point(t1, v0, row);
        const p11 = point(t1, v1, row);
        const p01 = point(t0, v1, row);

        if (side > 0) {
          pushTriangle(p00, p10, p11);
          pushTriangle(p00, p11, p01);
        } else {
          pushTriangle(p00, p11, p10);
          pushTriangle(p00, p01, p11);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    return geometry;
  }

  function createWrapperEdgeGeometry(side) {
    const positions = [];
    const segments = 20;
    const outerX = side * 1.55;

    function edgePoint(t, v, lower) {
      const edge = 0.90 + 0.018 * Math.sin(v * Math.PI * 10);
      const x = outerX + 0.008 * Math.sin(t * Math.PI * 6 + v * Math.PI * 3);
      const z = v * edge + (lower ? -0.018 : 0);
      const y = -0.018 + 0.026 * t * t +
        0.012 * Math.sin(t * Math.PI * 5 + v * Math.PI * 4);
      return [x, y, z];
    }

    function pushTriangle(a, b, c) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
    }

    for (let i = 0; i < segments; i++) {
      const v0 = -1 + i / segments;
      const v1 = -1 + (i + 1) / segments;
      const top0 = edgePoint(i / segments, v0, false);
      const top1 = edgePoint((i + 1) / segments, v1, false);
      const bottom1 = edgePoint((i + 1) / segments, v1, true);
      const bottom0 = edgePoint(i / segments, v0, true);

      if (side > 0) {
        pushTriangle(top0, top1, bottom1);
        pushTriangle(top0, bottom1, bottom0);
      } else {
        pushTriangle(top0, bottom1, top1);
        pushTriangle(top0, bottom0, bottom1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    return geometry;
  }

  function createWrapperSideWallGeometry(side) {
    const positions = [];
    const segments = 10;

    function wallPoint(t, lower) {
      const x = 1.07 + 0.48 * t;
      const z = 0.72 + 0.18 * t;
      const topY = 0.075 - 0.065 * t +
        0.01 * Math.sin(t * Math.PI * 5);
      const y = lower ? topY - 0.045 : topY;
      return [side * x, y, z];
    }

    function pushTriangle(a, b, c) {
      positions.push(
        a[0], a[1], a[2],
        b[0], b[1], b[2],
        c[0], c[1], c[2]
      );
    }

    for (let i = 0; i < segments; i++) {
      const t0 = i / segments;
      const t1 = (i + 1) / segments;
      const top0 = wallPoint(t0, false);
      const top1 = wallPoint(t1, false);
      const bottom1 = wallPoint(t1, true);
      const bottom0 = wallPoint(t0, true);

      if (side > 0) {
        pushTriangle(top0, top1, bottom1);
        pushTriangle(top0, bottom1, bottom0);
      } else {
        pushTriangle(top0, bottom1, top1);
        pushTriangle(top0, bottom0, bottom1);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRoundedRectangleShape(width, depth, radius) {
    const shape = new THREE.Shape();
    const left = -width / 2;
    const right = width / 2;
    const bottom = -depth / 2;
    const top = depth / 2;

    shape.moveTo(left + radius, bottom);
    shape.lineTo(right - radius, bottom);
    shape.quadraticCurveTo(right, bottom, right, bottom + radius);
    shape.lineTo(right, top - radius);
    shape.quadraticCurveTo(right, top, right - radius, top);
    shape.lineTo(left + radius, top);
    shape.quadraticCurveTo(left, top, left, top - radius);
    shape.lineTo(left, bottom + radius);
    shape.quadraticCurveTo(left, bottom, left + radius, bottom);
    return shape;
  }

  const wrapper_group = new THREE.Group();
  root.add(wrapper_group);

  const wrapper_sheetGeom = createWrapperSheetGeometry(1);
  const wrapper_sheet = new THREE.Mesh(wrapper_sheetGeom, wrapper_sheetMat);
  wrapper_group.add(wrapper_sheet);

  const left_wrapper_sheetGeom = createWrapperSheetGeometry(-1);
  const left_wrapper_sheet = new THREE.Mesh(left_wrapper_sheetGeom, wrapper_sheetMat);
  wrapper_group.add(left_wrapper_sheet);

  const wrapper_edgeGeom = createWrapperEdgeGeometry(1);
  const wrapper_edge = new THREE.Mesh(wrapper_edgeGeom, wrapper_sheetMat);
  wrapper_group.add(wrapper_edge);

  const left_wrapper_edgeGeom = createWrapperEdgeGeometry(-1);
  const left_wrapper_edge = new THREE.Mesh(left_wrapper_edgeGeom, wrapper_sheetMat);
  wrapper_group.add(left_wrapper_edge);

  const wrapper_side_wallGeom = createWrapperSideWallGeometry(1);
  const wrapper_side_wall = new THREE.Mesh(wrapper_side_wallGeom, wrapper_sheetMat);
  wrapper_group.add(wrapper_side_wall);

  const left_wrapper_side_wallGeom = createWrapperSideWallGeometry(-1);
  const left_wrapper_side_wall = new THREE.Mesh(left_wrapper_side_wallGeom, wrapper_sheetMat);
  wrapper_group.add(left_wrapper_side_wall);

  const wrapper_gussetShape = new THREE.Shape();
  wrapper_gussetShape.moveTo(1.04, -0.035);
  wrapper_gussetShape.lineTo(1.52, -0.012);
  wrapper_gussetShape.lineTo(1.17, 0.095);
  wrapper_gussetShape.closePath();

  const wrapper_gussetGeom = new THREE.ExtrudeGeometry(wrapper_gussetShape, {
    depth: 0.025,
    steps: 1,
    bevelEnabled: false,
  });
  wrapper_gussetGeom.translate(0, 0, -0.0125);

  const front_wrapper_gusset = new THREE.Mesh(wrapper_gussetGeom, wrapper_sheetMat);
  front_wrapper_gusset.position.z = 0.705;
  wrapper_group.add(front_wrapper_gusset);

  const back_wrapper_gusset = new THREE.Mesh(wrapper_gussetGeom, wrapper_sheetMat);
  back_wrapper_gusset.position.z = -0.705;
  wrapper_group.add(back_wrapper_gusset);

  const wrapper_ridgesGeom = new THREE.CylinderGeometry(0.009, 0.009, 1.32, 10);
  const wrapper_ridges = new THREE.InstancedMesh(
    wrapper_ridgesGeom,
    wrapper_sheetMat,
    6
  );
  const ridge_dummy = new THREE.Object3D();
  let ridge_index = 0;
  for (const side of [-1, 1]) {
    for (const offset of [-0.055, 0, 0.055]) {
      ridge_dummy.position.set(side * (1.18 + offset), 0.092, 0);
      ridge_dummy.rotation.set(Math.PI / 2, 0, 0);
      ridge_dummy.scale.set(1, 1, 1);
      ridge_dummy.updateMatrix();
      wrapper_ridges.setMatrixAt(ridge_index++, ridge_dummy.matrix);
    }
  }
  wrapper_ridges.instanceMatrix.needsUpdate = true;
  wrapper_group.add(wrapper_ridges);

  const wrapper_crease_linesGeom = new THREE.CylinderGeometry(0.004, 0.004, 1.34, 8);
  const wrapper_crease_lines = new THREE.InstancedMesh(
    wrapper_crease_linesGeom,
    wrapper_creaseMat,
    4
  );
  const crease_dummy = new THREE.Object3D();
  let crease_index = 0;
  for (const side of [-1, 1]) {
    for (const offset of [-0.027, 0.027]) {
      crease_dummy.position.set(side * (1.18 + offset), 0.094, 0);
      crease_dummy.rotation.set(Math.PI / 2, 0, 0);
      crease_dummy.scale.set(1, 1, 1);
      crease_dummy.updateMatrix();
      wrapper_crease_lines.setMatrixAt(crease_index++, crease_dummy.matrix);
    }
  }
  wrapper_crease_lines.instanceMatrix.needsUpdate = true;
  wrapper_group.add(wrapper_crease_lines);

  const wrapper_cross_seamsGeom = new THREE.CylinderGeometry(0.006, 0.006, 0.30, 8);
  const wrapper_cross_seams = new THREE.InstancedMesh(
    wrapper_cross_seamsGeom,
    wrapper_creaseMat,
    2
  );
  const cross_seam_dummy = new THREE.Object3D();
  for (let i = 0; i < 2; i++) {
    const side = i === 0 ? -1 : 1;
    cross_seam_dummy.position.set(side * 1.34, 0.047, 0);
    cross_seam_dummy.rotation.set(Math.PI / 2, 0, 0);
    cross_seam_dummy.scale.set(1, 1, 1);
    cross_seam_dummy.updateMatrix();
    wrapper_cross_seams.setMatrixAt(i, cross_seam_dummy.matrix);
  }
  wrapper_cross_seams.instanceMatrix.needsUpdate = true;
  wrapper_group.add(wrapper_cross_seams);

  const chocolate_group = new THREE.Group();
  root.add(chocolate_group);

  const chocolate_barShape = createRoundedRectangleShape(2.18, 1.40, 0.15);
  const chocolate_barGeom = new THREE.ExtrudeGeometry(chocolate_barShape, {
    depth: 0.18,
    steps: 1,
    curveSegments: 10,
    bevelEnabled: true,
    bevelThickness: 0.055,
    bevelSize: 0.07,
    bevelSegments: 5,
  });
  const chocolate_bar = new THREE.Mesh(chocolate_barGeom, chocolate_barMat);
  chocolate_bar.rotation.x = Math.PI / 2;
  chocolate_bar.position.y = 0.09;
  chocolate_group.add(chocolate_bar);

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