export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "ornamental_plate";

  const plate_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf7f6f2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const gold_ornamentMat = new THREE.MeshStandardMaterial({
    color: 0xb48a52,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });
  const flower_insetsMat = new THREE.MeshStandardMaterial({
    color: 0xf7f6f2,
    metalness: 0.0,
    roughness: 0.4,
    side: THREE.DoubleSide,
  });

  const plate_body_profile = [
    new THREE.Vector2(0.00, -0.055),
    new THREE.Vector2(0.40, -0.060),
    new THREE.Vector2(0.75, -0.055),
    new THREE.Vector2(0.95, -0.035),
    new THREE.Vector2(1.10, 0.005),
    new THREE.Vector2(1.18, 0.065),
    new THREE.Vector2(1.20, 0.110),
    new THREE.Vector2(1.195, 0.145),
    new THREE.Vector2(1.18, 0.170),
    new THREE.Vector2(1.14, 0.180),
    new THREE.Vector2(1.10, 0.165),
    new THREE.Vector2(1.04, 0.140),
    new THREE.Vector2(0.98, 0.105),
    new THREE.Vector2(0.92, 0.060),
    new THREE.Vector2(0.86, 0.015),
    new THREE.Vector2(0.80, -0.010),
    new THREE.Vector2(0.65, -0.020),
    new THREE.Vector2(0.35, -0.025),
    new THREE.Vector2(0.00, -0.025),
  ];
  const plate_bodyGeom = new THREE.LatheGeometry(plate_body_profile, 96);
  const plate_body = new THREE.Mesh(plate_bodyGeom, plate_bodyMat);
  plate_body.name = "plate_body";
  root.add(plate_body);

  const foot_ringGeom = new THREE.TorusGeometry(0.68, 0.027, 10, 96);
  const foot_ring = new THREE.Mesh(foot_ringGeom, plate_bodyMat);
  foot_ring.name = "foot_ring";
  foot_ring.rotation.x = Math.PI / 2;
  foot_ring.position.y = -0.064;
  root.add(foot_ring);

  const outer_gold_rimGeom = new THREE.TorusGeometry(1.193, 0.010, 8, 128);
  const outer_gold_rim = new THREE.Mesh(outer_gold_rimGeom, gold_ornamentMat);
  outer_gold_rim.name = "outer_gold_rim";
  outer_gold_rim.rotation.x = Math.PI / 2;
  outer_gold_rim.position.y = 0.151;
  root.add(outer_gold_rim);

  const lower_gold_edgeGeom = new THREE.TorusGeometry(1.183, 0.007, 8, 128);
  const lower_gold_edge = new THREE.Mesh(lower_gold_edgeGeom, gold_ornamentMat);
  lower_gold_edge.name = "lower_gold_edge";
  lower_gold_edge.rotation.x = Math.PI / 2;
  lower_gold_edge.position.y = 0.092;
  root.add(lower_gold_edge);

  const inner_gold_ringGeom = new THREE.TorusGeometry(0.875, 0.005, 8, 128);
  const inner_gold_ring = new THREE.Mesh(inner_gold_ringGeom, gold_ornamentMat);
  inner_gold_ring.name = "inner_gold_ring";
  inner_gold_ring.rotation.x = Math.PI / 2;
  inner_gold_ring.position.y = 0.026;
  root.add(inner_gold_ring);

  const border_vineGeom = new THREE.TorusGeometry(1.015, 0.0045, 6, 128);
  const border_vine = new THREE.Mesh(border_vineGeom, gold_ornamentMat);
  border_vine.name = "border_vine";
  border_vine.rotation.x = Math.PI / 2;
  border_vine.position.y = 0.143;
  root.add(border_vine);

  function topSurfaceY(radius) {
    if (radius <= 0.80) return -0.010;
    if (radius <= 0.92) {
      return -0.010 + (radius - 0.80) / 0.12 * 0.070;
    }
    if (radius <= 1.04) {
      return 0.060 + (radius - 0.92) / 0.12 * 0.080;
    }
    if (radius <= 1.14) {
      return 0.140 + (radius - 1.04) / 0.10 * 0.040;
    }
    return 0.180 - (radius - 1.14) / 0.06 * 0.030;
  }

  function topSurfaceSlope(radius) {
    if (radius <= 0.80) return 0;
    if (radius <= 0.92) return 0.070 / 0.12;
    if (radius <= 1.04) return 0.080 / 0.12;
    if (radius <= 1.14) return 0.040 / 0.10;
    return -0.030 / 0.06;
  }

  function surfaceFrame(angle, radius, offset) {
    const slope = topSurfaceSlope(radius);
    const tangent = new THREE.Vector3(
      -Math.sin(angle),
      0,
      Math.cos(angle)
    ).normalize();
    const radial_tangent = new THREE.Vector3(
      Math.cos(angle),
      slope,
      Math.sin(angle)
    ).normalize();
    const normal = new THREE.Vector3()
      .crossVectors(tangent, radial_tangent)
      .normalize();
    const position = new THREE.Vector3(
      Math.cos(angle) * radius,
      topSurfaceY(radius),
      Math.sin(angle) * radius
    ).addScaledVector(normal, offset);
    const basis = new THREE.Matrix4().makeBasis(
      tangent,
      radial_tangent,
      normal
    );
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(basis);
    return { position, quaternion, normal };
  }

  function surfacePoint(angle, radius, offset) {
    return surfaceFrame(angle, radius, offset).position;
  }

  function surfaceMatrix(angle, radius, twist, offset, sx, sy, sz) {
    const frame = surfaceFrame(angle, radius, offset);
    const twist_quaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 0, 1),
      twist
    );
    const quaternion = frame.quaternion.clone().multiply(twist_quaternion);
    const matrix = new THREE.Matrix4();
    matrix.compose(
      frame.position,
      quaternion,
      new THREE.Vector3(sx, sy, sz)
    );
    return matrix;
  }

  function makeSegmentMatrix(point_a, point_b) {
    const direction = point_b.clone().sub(point_a);
    const length = direction.length();
    const midpoint = point_a.clone().add(point_b).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize()
    );
    const matrix = new THREE.Matrix4();
    matrix.compose(
      midpoint,
      quaternion,
      new THREE.Vector3(1, length, 1)
    );
    return matrix;
  }

  const flower_count = 8;
  const petal_count = 8;
  const motif_step = Math.PI * 2 / flower_count;

  const gold_leavesShape = new THREE.Shape();
  gold_leavesShape.moveTo(0, -0.045);
  gold_leavesShape.bezierCurveTo(0.026, -0.025, 0.032, 0.018, 0, 0.055);
  gold_leavesShape.bezierCurveTo(-0.032, 0.018, -0.026, -0.025, 0, -0.045);
  const gold_leavesGeom = new THREE.ShapeGeometry(gold_leavesShape, 4);

  const border_leaves = new THREE.InstancedMesh(
    gold_leavesGeom,
    gold_ornamentMat,
    flower_count * 8
  );
  border_leaves.name = "border_leaves";
  let border_leaf_index = 0;
  for (let i = 0; i < flower_count; i++) {
    const center_angle = Math.PI / 2 + i * motif_step;
    for (const side of [-1, 1]) {
      for (let k = 0; k < 4; k++) {
        const angle = center_angle + side * (0.055 + k * motif_step * 0.055);
        const radius = 0.995 + k * 0.010;
        const twist = side * (0.58 + k * 0.12);
        const scale = 0.68 - k * 0.035;
        border_leaves.setMatrixAt(
          border_leaf_index++,
          surfaceMatrix(angle, radius, twist, 0.006, scale, scale, 1)
        );
      }
    }
  }
  border_leaves.instanceMatrix.needsUpdate = true;
  root.add(border_leaves);

  const flower_petals = new THREE.InstancedMesh(
    gold_leavesGeom,
    gold_ornamentMat,
    flower_count * petal_count
  );
  flower_petals.name = "flower_petals";
  let flower_petal_index = 0;
  for (let i = 0; i < flower_count; i++) {
    const center_angle = Math.PI / 2 + i * motif_step;
    for (let p = 0; p < petal_count; p++) {
      const petal_angle = p / petal_count * Math.PI * 2;
      const local_x = Math.cos(petal_angle) * 0.060;
      const local_radial = Math.sin(petal_angle) * 0.052;
      const angle = center_angle - local_x / 1.015;
      const radius = 1.015 + local_radial;
      flower_petals.setMatrixAt(
        flower_petal_index++,
        surfaceMatrix(
          angle,
          radius,
          petal_angle - Math.PI / 2,
          0.007,
          0.72,
          0.90,
          1
        )
      );
    }
  }
  flower_petals.instanceMatrix.needsUpdate = true;
  root.add(flower_petals);

  const flower_centersGeom = new THREE.CircleGeometry(0.027, 18);
  const flower_centers = new THREE.InstancedMesh(
    flower_centersGeom,
    gold_ornamentMat,
    flower_count
  );
  flower_centers.name = "flower_centers";

  const flower_insetsGeom = new THREE.CircleGeometry(0.012, 16);
  const flower_insets = new THREE.InstancedMesh(
    flower_insetsGeom,
    flower_insetsMat,
    flower_count
  );
  flower_insets.name = "flower_insets";

  for (let i = 0; i < flower_count; i++) {
    const angle = Math.PI / 2 + i * motif_step;
    flower_centers.setMatrixAt(
      i,
      surfaceMatrix(angle, 1.015, 0, 0.008, 1, 1, 1)
    );
    flower_insets.setMatrixAt(
      i,
      surfaceMatrix(angle, 1.015, 0, 0.010, 1, 1, 1)
    );
  }
  flower_centers.instanceMatrix.needsUpdate = true;
  flower_insets.instanceMatrix.needsUpdate = true;
  root.add(flower_centers, flower_insets);

  const flower_stamens = new THREE.InstancedMesh(
    gold_leavesGeom,
    gold_ornamentMat,
    flower_count * 4
  );
  flower_stamens.name = "flower_stamens";
  let stamen_index = 0;
  for (let i = 0; i < flower_count; i++) {
    const center_angle = Math.PI / 2 + i * motif_step;
    for (let j = 0; j < 4; j++) {
      const angle = center_angle + (j - 1.5) * 0.032;
      const radius = 1.015 + (j % 2) * 0.018;
      const twist = (j - 1.5) * 0.28;
      flower_stamens.setMatrixAt(
        stamen_index++,
        surfaceMatrix(angle, radius, twist, 0.009, 0.34, 0.42, 1)
      );
    }
  }
  flower_stamens.instanceMatrix.needsUpdate = true;
  root.add(flower_stamens);

  const border_scrolls = new THREE.Group();
  border_scrolls.name = "border_scrolls";
  for (let i = 0; i < flower_count; i++) {
    const start_angle = Math.PI / 2 + i * motif_step + 0.125;
    const end_angle = start_angle + motif_step - 0.25;
    const scroll_points = [];
    for (let j = 0; j <= 10; j++) {
      const t = j / 10;
      const angle = start_angle + (end_angle - start_angle) * t;
      const radius = 1.005 + Math.sin(t * Math.PI) * 0.025;
      scroll_points.push(surfacePoint(angle, radius, 0.006));
    }
    const scrollGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(scroll_points),
      24,
      0.004,
      6,
      false
    );
    const scroll = new THREE.Mesh(scrollGeom, gold_ornamentMat);
    scroll.name = "border_scroll_" + i;
    border_scrolls.add(scroll);
  }
  root.add(border_scrolls);

  const curl_points = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const phase = t * Math.PI * 2.4;
    const amplitude = 1 - t;
    const angle = 0.17 * amplitude * Math.cos(phase);
    const radius = 1.005 + 0.050 * amplitude * Math.sin(phase);
    curl_points.push(surfacePoint(angle, radius, 0.007));
  }
  const gold_curlsGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(curl_points),
    32,
    0.0045,
    6,
    false
  );
  const gold_curls = new THREE.InstancedMesh(
    gold_curlsGeom,
    gold_ornamentMat,
    flower_count * 2
  );
  gold_curls.name = "gold_curls";
  let curl_index = 0;
  for (let i = 0; i < flower_count; i++) {
    const center_angle = Math.PI / 2 + i * motif_step;
    for (const side of [-1, 1]) {
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        -(center_angle + side * 0.205)
      );
      const matrix = new THREE.Matrix4();
      matrix.compose(
        new THREE.Vector3(0, 0, 0),
        quaternion,
        new THREE.Vector3(1, 1, 1)
      );
      gold_curls.setMatrixAt(curl_index++, matrix);
    }
  }
  gold_curls.instanceMatrix.needsUpdate = true;
  root.add(gold_curls);

  const bud_count = flower_count * 4;
  const ornamental_budsGeom = new THREE.CircleGeometry(0.010, 12);
  const ornamental_buds = new THREE.InstancedMesh(
    ornamental_budsGeom,
    gold_ornamentMat,
    bud_count
  );
  ornamental_buds.name = "ornamental_buds";

  const bud_stemsGeom = new THREE.CylinderGeometry(0.003, 0.003, 1, 6);
  const bud_stems = new THREE.InstancedMesh(
    bud_stemsGeom,
    gold_ornamentMat,
    bud_count
  );
  bud_stems.name = "bud_stems";

  let bud_index = 0;
  for (let i = 0; i < flower_count; i++) {
    const center_angle = Math.PI / 2 + i * motif_step;
    for (const side of [-1, 1]) {
      for (let k = 0; k < 2; k++) {
        const branch_angle = center_angle + side * (0.13 + k * 0.09);
        const bud_angle = branch_angle + side * 0.022;
        const stem_start = surfacePoint(branch_angle, 0.995, 0.006);
        const stem_end = surfacePoint(bud_angle, 1.018, 0.008);
        bud_stems.setMatrixAt(
          bud_index,
          makeSegmentMatrix(stem_start, stem_end)
        );
        ornamental_buds.setMatrixAt(
          bud_index,
          surfaceMatrix(
            bud_angle,
            1.018,
            side * (0.45 + k * 0.25),
            0.010,
            0.72,
            1,
            1
          )
        );
        bud_index++;
      }
    }
  }
  ornamental_buds.instanceMatrix.needsUpdate = true;
  bud_stems.instanceMatrix.needsUpdate = true;
  root.add(bud_stems, ornamental_buds);

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