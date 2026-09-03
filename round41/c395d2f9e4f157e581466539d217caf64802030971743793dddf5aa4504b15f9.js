export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "crocus_flower";

  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x78a943,
    metalness: 0.0,
    roughness: 0.8
  });
  const stem_lightMat = new THREE.MeshStandardMaterial({
    color: 0x9abd58,
    metalness: 0.0,
    roughness: 0.8
  });
  const petalMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    vertexColors: true,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const petal_rimMat = new THREE.MeshStandardMaterial({
    color: 0xc77ce0,
    metalness: 0.0,
    roughness: 0.7
  });
  const petal_veinMat = new THREE.LineBasicMaterial({
    color: 0x7d329f,
    transparent: true,
    opacity: 0.34
  });
  const petal_striationMat = new THREE.LineBasicMaterial({
    color: 0xdaa7ee,
    transparent: true,
    opacity: 0.28
  });
  const pollenMat = new THREE.MeshStandardMaterial({
    color: 0xf5d21a,
    metalness: 0.0,
    roughness: 0.7
  });
  const filamentMat = new THREE.MeshStandardMaterial({
    color: 0xffdc27,
    metalness: 0.0,
    roughness: 0.7
  });
  const throatMat = new THREE.MeshStandardMaterial({
    color: 0x28102f,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  const throat_markMat = new THREE.MeshStandardMaterial({
    color: 0xf2ead1,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  function petalPoint(params, u, v) {
    const sine = Math.max(0, Math.sin(Math.PI * v));
    const widthFactor =
      0.035 +
      0.10 * (1 - v) +
      0.965 * Math.pow(sine, 0.72);
    const width = params.halfWidth * widthFactor;
    const edge = 2 * u - 1;
    const arch = Math.pow(sine, 0.85);
    const tipRound =
      params.height *
      0.055 *
      Math.pow(Math.abs(edge), 2.4) *
      Math.pow(v, 8);
    const ridge =
      params.ridge *
      (1 - edge * edge) *
      sine;
    const x = edge * width;
    const y = params.baseY + params.height * v - tipRound;
    const z =
      params.baseRadius +
      params.outward * (0.15 * v + 0.85 * Math.pow(v, 1.45)) +
      ridge -
      params.cup * (1 - edge * edge) * sine +
      params.tipCurl * Math.pow(v, 6);
    return new THREE.Vector3(x, y, z);
  }

  function petalColor(params, u, v) {
    const edge = Math.abs(2 * u - 1);
    const vein =
      0.034 *
      (0.5 + 0.5 * Math.cos((u - 0.5) * Math.PI * 24)) *
      Math.sin(Math.PI * v);
    const fine =
      0.018 *
      (0.5 + 0.5 * Math.cos((u - 0.5) * Math.PI * 52)) *
      Math.sin(Math.PI * v);
    const lower = Math.max(0, Math.min(1, (v - 0.035) / 0.22));
    const baseWhite = (1 - lower) * 0.72;
    const r = Math.min(
      1,
      params.color.r * (1 - baseWhite) + baseWhite + vein + fine
    );
    const g = Math.min(
      1,
      params.color.g * (1 - baseWhite) + baseWhite + vein * 0.72 + fine * 0.55
    );
    const b = Math.min(
      1,
      params.color.b * (1 - baseWhite) + baseWhite + vein + fine
    );
    return [r, g, b];
  }

  function createPetalGeometry(params) {
    const widthSegments = 30;
    const heightSegments = 32;
    const positions = [];
    const colors = [];
    const indices = [];

    for (let iy = 0; iy <= heightSegments; iy++) {
      const v = iy / heightSegments;
      for (let ix = 0; ix <= widthSegments; ix++) {
        const u = ix / widthSegments;
        const point = petalPoint(params, u, v);
        const color = petalColor(params, u, v);
        positions.push(point.x, point.y, point.z);
        colors.push(color[0], color[1], color[2]);
      }
    }

    const row = widthSegments + 1;
    for (let iy = 0; iy < heightSegments; iy++) {
      for (let ix = 0; ix < widthSegments; ix++) {
        const a = iy * row + ix;
        const b = a + 1;
        const c = a + row;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPetalRimGeometry(params, side) {
    const points = [];
    for (let i = 0; i <= 16; i++) {
      const v = i / 16;
      points.push(petalPoint(params, side, v));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 32, 0.006, 6, false);
  }

  function createPetalVeinGeometry(params) {
    const positions = [];
    const veinCount = 13;
    const steps = 15;

    for (let vein = 0; vein < veinCount; vein++) {
      const u = 0.07 + 0.86 * vein / (veinCount - 1);
      for (let step = 0; step < steps; step++) {
        const v0 = 0.13 + 0.80 * step / steps;
        const v1 = 0.13 + 0.80 * (step + 1) / steps;
        const p0 = petalPoint(params, u, v0);
        const p1 = petalPoint(params, u, v1);
        p0.z += 0.004;
        p1.z += 0.004;
        positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  function createPetalStriationGeometry(params) {
    const positions = [];
    const striationCount = 25;
    const steps = 18;

    for (let line = 0; line < striationCount; line++) {
      const u = 0.045 + 0.91 * line / (striationCount - 1);
      for (let step = 0; step < steps; step++) {
        const v0 = 0.16 + 0.77 * step / steps;
        const v1 = 0.16 + 0.77 * (step + 1) / steps;
        const p0 = petalPoint(params, u, v0);
        const p1 = petalPoint(params, u, v1);
        p0.z += 0.0045;
        p1.z += 0.0045;
        positions.push(p0.x, p0.y, p0.z, p1.x, p1.y, p1.z);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geometry;
  }

  const stem_leftPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.015, 0.16, -0.035),
    new THREE.Vector3(-0.13, -0.12, -0.055),
    new THREE.Vector3(-0.31, -0.48, -0.075),
    new THREE.Vector3(-0.52, -0.90, -0.09)
  ], false, "centripetal");
  const stem_leftGeom = new THREE.TubeGeometry(
    stem_leftPath,
    32,
    0.032,
    10,
    false
  );
  const stem_left = new THREE.Mesh(stem_leftGeom, stemMat);
  stem_left.name = "stem_left";
  root.add(stem_left);

  const stem_rightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.025, 0.15, -0.075),
    new THREE.Vector3(0.075, -0.12, -0.085),
    new THREE.Vector3(0.105, -0.49, -0.09),
    new THREE.Vector3(0.08, -0.91, -0.09)
  ], false, "centripetal");
  const stem_rightGeom = new THREE.TubeGeometry(
    stem_rightPath,
    32,
    0.034,
    10,
    false
  );
  const stem_right = new THREE.Mesh(stem_rightGeom, stemMat);
  stem_right.name = "stem_right";
  root.add(stem_right);

  const stem_left_highlightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.008, 0.15, -0.006),
    new THREE.Vector3(-0.128, -0.12, -0.026),
    new THREE.Vector3(-0.308, -0.48, -0.046),
    new THREE.Vector3(-0.518, -0.89, -0.061)
  ], false, "centripetal");
  const stem_left_highlightGeom = new THREE.TubeGeometry(
    stem_left_highlightPath,
    28,
    0.004,
    6,
    false
  );
  const stem_left_highlight = new THREE.Mesh(
    stem_left_highlightGeom,
    stem_lightMat
  );
  stem_left_highlight.name = "stem_left_highlight";
  root.add(stem_left_highlight);

  const stem_right_highlightPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.031, 0.14, -0.044),
    new THREE.Vector3(0.081, -0.12, -0.054),
    new THREE.Vector3(0.111, -0.48, -0.059),
    new THREE.Vector3(0.086, -0.89, -0.059)
  ], false, "centripetal");
  const stem_right_highlightGeom = new THREE.TubeGeometry(
    stem_right_highlightPath,
    28,
    0.004,
    6,
    false
  );
  const stem_right_highlight = new THREE.Mesh(
    stem_right_highlightGeom,
    stem_lightMat
  );
  stem_right_highlight.name = "stem_right_highlight";
  root.add(stem_right_highlight);

  const flower_head = new THREE.Group();
  flower_head.name = "flower_head";
  flower_head.position.y = 0.12;
  flower_head.rotation.x = 0.38;
  root.add(flower_head);

  const flower_throatGeom = new THREE.CircleGeometry(0.14, 32);
  const flower_throat = new THREE.Mesh(flower_throatGeom, throatMat);
  flower_throat.name = "flower_throat";
  flower_throat.rotation.x = -Math.PI / 2;
  flower_throat.position.y = 0.105;
  flower_head.add(flower_throat);

  const throat_markShape = new THREE.Shape();
  throat_markShape.moveTo(-0.018, 0);
  throat_markShape.bezierCurveTo(-0.035, 0.05, -0.045, 0.12, -0.022, 0.18);
  throat_markShape.lineTo(0, 0.29);
  throat_markShape.lineTo(0.022, 0.18);
  throat_markShape.bezierCurveTo(0.045, 0.12, 0.035, 0.05, 0.018, 0);
  throat_markShape.closePath();

  const throat_markGeom = new THREE.ShapeGeometry(throat_markShape, 12);
  throat_markGeom.rotateX(-Math.PI / 2);

  const throat_markings = new THREE.InstancedMesh(
    throat_markGeom,
    throat_markMat,
    6
  );
  throat_markings.name = "throat_markings";
  const throat_dummy = new THREE.Object3D();
  for (let i = 0; i < 6; i++) {
    const angle = i / 6 * Math.PI * 2;
    throat_dummy.position.set(
      Math.sin(angle) * 0.04,
      0.112,
      Math.cos(angle) * 0.04
    );
    throat_dummy.rotation.set(0, angle, 0);
    throat_dummy.scale.set(1, 1, 1);
    throat_dummy.updateMatrix();
    throat_markings.setMatrixAt(i, throat_dummy.matrix);
  }
  throat_markings.instanceMatrix.needsUpdate = true;
  flower_head.add(throat_markings);

  const outerParams = {
    halfWidth: 0.40,
    height: 0.94,
    baseY: 0.02,
    baseRadius: 0.055,
    outward: 0.38,
    cup: 0.07,
    ridge: 0.022,
    tipCurl: -0.025,
    color: new THREE.Color(0xa753cf)
  };
  const outer_petalGeom = createPetalGeometry(outerParams);
  const outer_left_rimGeom = createPetalRimGeometry(outerParams, 0);
  const outer_right_rimGeom = createPetalRimGeometry(outerParams, 1);
  const outer_veinGeom = createPetalVeinGeometry(outerParams);
  const outer_striationGeom = createPetalStriationGeometry(outerParams);

  const innerParams = {
    halfWidth: 0.31,
    height: 1.01,
    baseY: 0.025,
    baseRadius: 0.05,
    outward: 0.28,
    cup: 0.052,
    ridge: 0.018,
    tipCurl: -0.045,
    color: new THREE.Color(0x9842c0)
  };
  const inner_petalGeom = createPetalGeometry(innerParams);
  const inner_left_rimGeom = createPetalRimGeometry(innerParams, 0);
  const inner_right_rimGeom = createPetalRimGeometry(innerParams, 1);
  const inner_veinGeom = createPetalVeinGeometry(innerParams);
  const inner_striationGeom = createPetalStriationGeometry(innerParams);

  function createPetal(name, geometry, rimLeftGeom, rimRightGeom, veinGeom, striationGeom, angle, scaleX, scaleY, rotationX) {
    const petal_group = new THREE.Group();
    petal_group.name = name;
    petal_group.rotation.y = angle;
    petal_group.scale.set(scaleX, scaleY, 1);
    petal_group.position.y = 0.015;

    const surface = new THREE.Mesh(geometry, petalMat);
    surface.name = name + "_surface";
    petal_group.add(surface);

    const left_rim = new THREE.Mesh(rimLeftGeom, petal_rimMat);
    left_rim.name = name + "_left_rim";
    petal_group.add(left_rim);

    const right_rim = new THREE.Mesh(rimRightGeom, petal_rimMat);
    right_rim.name = name + "_right_rim";
    petal_group.add(right_rim);

    const veins = new THREE.LineSegments(veinGeom, petal_veinMat);
    veins.name = name + "_veins";
    petal_group.add(veins);

    const striations = new THREE.LineSegments(striationGeom, petal_striationMat);
    striations.name = name + "_fine_striations";
    petal_group.add(striations);

    petal_group.rotation.x += rotationX;
    flower_head.add(petal_group);
    return petal_group;
  }

  const rear_center_petal = createPetal(
    "rear_center_petal",
    outer_petalGeom,
    outer_left_rimGeom,
    outer_right_rimGeom,
    outer_veinGeom,
    outer_striationGeom,
    Math.PI,
    0.90,
    1.05,
    -0.02
  );

  const rear_left_petal = createPetal(
    "rear_left_petal",
    inner_petalGeom,
    inner_left_rimGeom,
    inner_right_rimGeom,
    inner_veinGeom,
    inner_striationGeom,
    -2.10,
    0.98,
    0.98,
    -0.03
  );

  const rear_right_petal = createPetal(
    "rear_right_petal",
    inner_petalGeom,
    inner_left_rimGeom,
    inner_right_rimGeom,
    inner_veinGeom,
    inner_striationGeom,
    2.10,
    0.98,
    0.98,
    -0.03
  );

  const left_side_petal = createPetal(
    "left_side_petal",
    outer_petalGeom,
    outer_left_rimGeom,
    outer_right_rimGeom,
    outer_veinGeom,
    outer_striationGeom,
    -1.25,
    0.90,
    0.96,
    -0.02
  );

  const right_side_petal = createPetal(
    "right_side_petal",
    outer_petalGeom,
    outer_left_rimGeom,
    outer_right_rimGeom,
    outer_veinGeom,
    outer_striationGeom,
    1.25,
    0.90,
    0.96,
    -0.02
  );

  const front_center_petal = createPetal(
    "front_center_petal",
    outer_petalGeom,
    outer_left_rimGeom,
    outer_right_rimGeom,
    outer_veinGeom,
    outer_striationGeom,
    0,
    1.05,
    0.72,
    -0.06
  );

  const pistil_baseGeom = new THREE.SphereGeometry(0.07, 18, 10);
  const pistil_base = new THREE.Mesh(pistil_baseGeom, pollenMat);
  pistil_base.name = "pistil_base";
  pistil_base.scale.set(0.82, 0.65, 0.82);
  pistil_base.position.set(0, 0.25, 0.015);
  flower_head.add(pistil_base);

  const pistil_columnGeom = new THREE.CylinderGeometry(
    0.043,
    0.058,
    0.36,
    18
  );
  const pistil_column = new THREE.Mesh(pistil_columnGeom, pollenMat);
  pistil_column.name = "pistil_column";
  pistil_column.position.set(0, 0.43, 0.015);
  flower_head.add(pistil_column);

  const stamen_filamentGeom = new THREE.CylinderGeometry(
    0.009,
    0.012,
    1,
    8
  );
  const stamen_antherGeom = new THREE.SphereGeometry(1, 14, 9);
  const stamenCount = 6;

  const stamen_filaments = new THREE.InstancedMesh(
    stamen_filamentGeom,
    filamentMat,
    stamenCount
  );
  stamen_filaments.name = "stamen_filaments";

  const stamen_anthers = new THREE.InstancedMesh(
    stamen_antherGeom,
    pollenMat,
    stamenCount
  );
  stamen_anthers.name = "stamen_anthers";

  const up = new THREE.Vector3(0, 1, 0);
  const filament_matrix = new THREE.Matrix4();
  const anther_matrix = new THREE.Matrix4();
  const anther_scale = new THREE.Vector3(0.026, 0.055, 0.026);

  for (let i = 0; i < stamenCount; i++) {
    const angle = i / stamenCount * Math.PI * 2;
    const start = new THREE.Vector3(
      Math.cos(angle) * 0.025,
      0.27,
      Math.sin(angle) * 0.025 + 0.015
    );
    const end = new THREE.Vector3(
      Math.cos(angle) * 0.13,
      0.55 + 0.012 * Math.cos(angle * 2),
      Math.sin(angle) * 0.13 + 0.015
    );
    const direction = end.clone().sub(start);
    const length = direction.length();
    const midpoint = start.clone().add(end).multiplyScalar(0.5);
    const filament_quaternion = new THREE.Quaternion().setFromUnitVectors(
      up,
      direction.normalize()
    );

    filament_matrix.compose(
      midpoint,
      filament_quaternion,
      new THREE.Vector3(1, length, 1)
    );
    stamen_filaments.setMatrixAt(i, filament_matrix);

    const anther_quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        0.18 * Math.sin(angle),
        -angle,
        0.22 * Math.cos(angle)
      )
    );
    anther_matrix.compose(end, anther_quaternion, anther_scale);
    stamen_anthers.setMatrixAt(i, anther_matrix);
  }

  stamen_filaments.instanceMatrix.needsUpdate = true;
  stamen_anthers.instanceMatrix.needsUpdate = true;
  flower_head.add(stamen_filaments);
  flower_head.add(stamen_anthers);

  const pistil_stylePath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.58, 0.015),
    new THREE.Vector3(0.006, 0.66, 0.018),
    new THREE.Vector3(0.018, 0.73, 0.02),
    new THREE.Vector3(0.032, 0.79, 0.022)
  ], false, "centripetal");
  const pistil_styleGeom = new THREE.TubeGeometry(
    pistil_stylePath,
    16,
    0.018,
    8,
    false
  );
  const pistil_style = new THREE.Mesh(pistil_styleGeom, pollenMat);
  pistil_style.name = "pistil_style";
  flower_head.add(pistil_style);

  const stigma_lobeGeom = new THREE.SphereGeometry(1, 14, 9);
  const stigma_lobes = new THREE.InstancedMesh(
    stigma_lobeGeom,
    pollenMat,
    3
  );
  stigma_lobes.name = "stigma_lobes";

  const stigma_matrix = new THREE.Matrix4();
  for (let i = 0; i < 3; i++) {
    const angle = i / 3 * Math.PI * 2;
    const position = new THREE.Vector3(
      0.032 + Math.cos(angle) * 0.035,
      0.79 + Math.sin(angle) * 0.018,
      0.022 + Math.sin(angle) * 0.035
    );
    const quaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, -angle, 0.12 * Math.cos(angle))
    );
    stigma_matrix.compose(
      position,
      quaternion,
      new THREE.Vector3(0.052, 0.025, 0.032)
    );
    stigma_lobes.setMatrixAt(i, stigma_matrix);
  }
  stigma_lobes.instanceMatrix.needsUpdate = true;
  flower_head.add(stigma_lobes);

  function fitToUnitCube(object) {
    object.updateMatrixWorld(true);
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