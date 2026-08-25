export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "hammered_copper_kettle";

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xb87333,
    metalness: 0.6,
    roughness: 0.5,
  });
  const rimMat = new THREE.MeshStandardMaterial({
    color: 0xc47a55,
    metalness: 0.6,
    roughness: 0.2,
  });
  const darkCopperMat = new THREE.MeshStandardMaterial({
    color: 0x633224,
    metalness: 0.5,
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x171313,
    metalness: 0.0,
    roughness: 0.7,
  });
  const handleEndMat = new THREE.MeshStandardMaterial({
    color: 0x302421,
    metalness: 0.0,
    roughness: 0.7,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: 0x9a7848,
    metalness: 0.6,
    roughness: 0.5,
  });
  const interiorMat = new THREE.MeshStandardMaterial({
    color: 0x170d0a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  function applyHammeredSurface(geometry, yMin, yMax, amplitude) {
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const z = position.getZ(i);
      const radius = Math.sqrt(x * x + z * z);
      if (radius < 0.06 || y <= yMin || y >= yMax) continue;

      const theta = Math.atan2(z, x);
      const normalizedY = (y - yMin) / (yMax - yMin);
      const edgeFade = Math.sin(Math.PI * normalizedY);
      const waveA = Math.cos(theta * 23 + y * 8.1);
      const waveB = Math.cos(y * 31.7 - theta * 5.4);
      const waveC = Math.sin(theta * 11.3 + y * 19.2);
      const cell = Math.pow(0.5 + 0.5 * waveA * waveB, 3);
      const dent = -amplitude * cell;
      const facet = amplitude * 0.18 * waveC;
      const offset = (dent + facet) * Math.min(1, edgeFade);
      const scale = (radius + offset) / radius;

      position.setXYZ(i, x * scale, y, z * scale);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  function createTaperedTube(curve, tubularSegments, radialSegments, radiusAt) {
    const frames = curve.computeFrenetFrames(tubularSegments, false);
    const positions = [];
    const indices = [];
    const point = new THREE.Vector3();

    for (let i = 0; i <= tubularSegments; i++) {
      const t = i / tubularSegments;
      curve.getPointAt(t, point);
      const radius = radiusAt(t);
      const normal = frames.normals[i];
      const binormal = frames.binormals[i];

      for (let j = 0; j < radialSegments; j++) {
        const angle = j / radialSegments * Math.PI * 2;
        const cx = Math.cos(angle) * radius;
        const cy = Math.sin(angle) * radius;
        positions.push(
          point.x + normal.x * cx + binormal.x * cy,
          point.y + normal.y * cx + binormal.y * cy,
          point.z + normal.z * cx + binormal.z * cy
        );
      }
    }

    for (let i = 0; i < tubularSegments; i++) {
      for (let j = 0; j < radialSegments; j++) {
        const next = (j + 1) % radialSegments;
        const a = i * radialSegments + j;
        const b = (i + 1) * radialSegments + j;
        const c = (i + 1) * radialSegments + next;
        const d = i * radialSegments + next;
        indices.push(a, b, d, b, c, d);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  const bodyProfileCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.54, 0.05),
    new THREE.Vector2(0.58, 0.08),
    new THREE.Vector2(0.57, 0.18),
    new THREE.Vector2(0.55, 0.38),
    new THREE.Vector2(0.53, 0.60),
    new THREE.Vector2(0.49, 0.79),
    new THREE.Vector2(0.43, 0.92),
    new THREE.Vector2(0.37, 0.99),
  ]);
  const bodyProfile = bodyProfileCurve.getSpacedPoints(72);
  const bodyGeom = new THREE.LatheGeometry(bodyProfile, 128);
  applyHammeredSurface(bodyGeom, 0.05, 0.99, 0.008);
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.name = "body";
  root.add(body);

  const bottom_bandGeom = new THREE.CylinderGeometry(0.575, 0.59, 0.045, 64);
  const bottom_band = new THREE.Mesh(bottom_bandGeom, rimMat);
  bottom_band.name = "bottom_band";
  bottom_band.position.y = 0.045;
  root.add(bottom_band);

  const bottom_rimGeom = new THREE.TorusGeometry(0.575, 0.018, 12, 64);
  const bottom_rim = new THREE.Mesh(bottom_rimGeom, rimMat);
  bottom_rim.name = "bottom_rim";
  bottom_rim.rotation.x = Math.PI / 2;
  bottom_rim.position.y = 0.06;
  root.add(bottom_rim);

  const bottom_edgeGeom = new THREE.TorusGeometry(0.585, 0.012, 10, 64);
  const bottom_edge = new THREE.Mesh(bottom_edgeGeom, darkCopperMat);
  bottom_edge.name = "bottom_edge";
  bottom_edge.rotation.x = Math.PI / 2;
  bottom_edge.position.y = 0.025;
  root.add(bottom_edge);

  const top_collarGeom = new THREE.TorusGeometry(0.37, 0.014, 10, 64);
  const top_collar = new THREE.Mesh(top_collarGeom, rimMat);
  top_collar.name = "top_collar";
  top_collar.rotation.x = Math.PI / 2;
  top_collar.position.y = 0.985;
  root.add(top_collar);

  const lidProfileCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.39, 0.00),
    new THREE.Vector2(0.405, 0.025),
    new THREE.Vector2(0.37, 0.055),
    new THREE.Vector2(0.30, 0.095),
    new THREE.Vector2(0.18, 0.135),
    new THREE.Vector2(0.00, 0.15),
  ]);
  const lidProfile = lidProfileCurve.getSpacedPoints(40);
  const lidGeom = new THREE.LatheGeometry(lidProfile, 96);
  applyHammeredSurface(lidGeom, 0.0, 0.15, 0.0035);
  const lid = new THREE.Mesh(lidGeom, bodyMat);
  lid.name = "lid";
  lid.position.y = 0.985;
  root.add(lid);

  const lid_seamGeom = new THREE.TorusGeometry(0.386, 0.008, 8, 64);
  const lid_seam = new THREE.Mesh(lid_seamGeom, darkCopperMat);
  lid_seam.name = "lid_seam";
  lid_seam.rotation.x = Math.PI / 2;
  lid_seam.position.y = 0.992;
  root.add(lid_seam);

  const lid_rimGeom = new THREE.TorusGeometry(0.395, 0.017, 12, 64);
  const lid_rim = new THREE.Mesh(lid_rimGeom, rimMat);
  lid_rim.name = "lid_rim";
  lid_rim.rotation.x = Math.PI / 2;
  lid_rim.position.y = 1.005;
  root.add(lid_rim);

  const knob_baseGeom = new THREE.CylinderGeometry(0.095, 0.105, 0.025, 32);
  const knob_base = new THREE.Mesh(knob_baseGeom, darkCopperMat);
  knob_base.name = "knob_base";
  knob_base.position.y = 1.125;
  root.add(knob_base);

  const knob_stemGeom = new THREE.CylinderGeometry(0.052, 0.065, 0.055, 24);
  const knob_stem = new THREE.Mesh(knob_stemGeom, rimMat);
  knob_stem.name = "knob_stem";
  knob_stem.position.y = 1.155;
  root.add(knob_stem);

  const lid_knobGeom = new THREE.SphereGeometry(0.088, 32, 20);
  const lid_knob = new THREE.Mesh(lid_knobGeom, handleEndMat);
  lid_knob.name = "lid_knob";
  lid_knob.position.y = 1.225;
  lid_knob.scale.set(1, 1.12, 1);
  root.add(lid_knob);

  const spoutPoints = [
    new THREE.Vector3(-0.43, 0.48, 0.03),
    new THREE.Vector3(-0.56, 0.50, 0.04),
    new THREE.Vector3(-0.66, 0.60, 0.07),
    new THREE.Vector3(-0.72, 0.75, 0.11),
    new THREE.Vector3(-0.81, 0.90, 0.16),
    new THREE.Vector3(-0.98, 0.98, 0.23),
  ];
  const spoutCurve = new THREE.CatmullRomCurve3(
    spoutPoints,
    false,
    "centripetal",
    0.5
  );
  const spoutGeom = createTaperedTube(
    spoutCurve,
    64,
    24,
    function (t) {
      if (t < 0.78) return 0.165 - 0.085 * (t / 0.78);
      return 0.08 + 0.035 * ((t - 0.78) / 0.22);
    }
  );
  const spout = new THREE.Mesh(spoutGeom, bodyMat);
  spout.name = "spout";
  root.add(spout);

  const spoutStart = spoutCurve.getPointAt(0);
  const spoutStartTangent = spoutCurve.getTangentAt(0).normalize();
  const spout_base_collarGeom = new THREE.TorusGeometry(0.145, 0.014, 10, 40);
  const spout_base_collar = new THREE.Mesh(spout_base_collarGeom, rimMat);
  spout_base_collar.name = "spout_base_collar";
  spout_base_collar.position.copy(spoutStart);
  spout_base_collar.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutStartTangent
  );
  root.add(spout_base_collar);

  const spoutEnd = spoutCurve.getPointAt(1);
  const spoutEndTangent = spoutCurve.getTangentAt(1).normalize();

  const spout_openingGeom = new THREE.CircleGeometry(0.104, 40);
  const spout_opening = new THREE.Mesh(spout_openingGeom, interiorMat);
  spout_opening.name = "spout_opening";
  spout_opening.position.copy(spoutEnd).addScaledVector(spoutEndTangent, 0.004);
  spout_opening.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutEndTangent
  );
  root.add(spout_opening);

  const spout_lipGeom = new THREE.TorusGeometry(0.108, 0.012, 10, 40);
  const spout_lip = new THREE.Mesh(spout_lipGeom, rimMat);
  spout_lip.name = "spout_lip";
  spout_lip.position.copy(spoutEnd).addScaledVector(spoutEndTangent, 0.006);
  spout_lip.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    spoutEndTangent
  );
  root.add(spout_lip);

  const leftBracketPoints = [
    new THREE.Vector3(-0.43, 0.49, 0.10),
    new THREE.Vector3(-0.49, 0.67, 0.11),
    new THREE.Vector3(-0.50, 0.86, 0.11),
    new THREE.Vector3(-0.48, 1.06, 0.10),
    new THREE.Vector3(-0.43, 1.29, 0.08),
  ];
  const left_handle_bracketGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(leftBracketPoints, false, "centripetal", 0.5),
    40,
    0.017,
    10,
    false
  );
  const left_handle_bracket = new THREE.Mesh(left_handle_bracketGeom, brassMat);
  left_handle_bracket.name = "left_handle_bracket";
  root.add(left_handle_bracket);

  const rightBracketPoints = [
    new THREE.Vector3(0.45, 0.58, 0.10),
    new THREE.Vector3(0.54, 0.65, 0.11),
    new THREE.Vector3(0.62, 0.72, 0.10),
    new THREE.Vector3(0.66, 0.78, 0.08),
  ];
  const right_handle_bracketGeom = new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(rightBracketPoints, false, "centripetal", 0.5),
    28,
    0.018,
    10,
    false
  );
  const right_handle_bracket = new THREE.Mesh(right_handle_bracketGeom, brassMat);
  right_handle_bracket.name = "right_handle_bracket";
  root.add(right_handle_bracket);

  const handlePoints = [
    new THREE.Vector3(-0.43, 1.29, 0.045),
    new THREE.Vector3(-0.18, 1.36, 0.035),
    new THREE.Vector3(0.15, 1.39, 0.025),
    new THREE.Vector3(0.45, 1.33, 0.015),
    new THREE.Vector3(0.67, 1.17, 0.005),
    new THREE.Vector3(0.78, 0.94, 0.00),
    new THREE.Vector3(0.77, 0.72, 0.00),
    new THREE.Vector3(0.66, 0.78, 0.00),
  ];
  const handleCurve = new THREE.CatmullRomCurve3(
    handlePoints,
    false,
    "centripetal",
    0.5
  );
  const handleGeom = new THREE.TubeGeometry(
    handleCurve,
    88,
    0.062,
    18,
    false
  );
  const handle = new THREE.Mesh(handleGeom, handleMat);
  handle.name = "handle";
  root.add(handle);

  const handleEndGeom = new THREE.SphereGeometry(0.072, 24, 16);

  const handle_left_end = new THREE.Mesh(handleEndGeom, handleEndMat);
  handle_left_end.name = "handle_left_end";
  handle_left_end.position.copy(handlePoints[0]);
  handle_left_end.scale.set(1.08, 0.9, 1.0);
  root.add(handle_left_end);

  const handle_right_end = new THREE.Mesh(handleEndGeom, handleEndMat);
  handle_right_end.name = "handle_right_end";
  handle_right_end.position.copy(handlePoints[handlePoints.length - 1]);
  handle_right_end.scale.set(1.08, 0.92, 1.0);
  root.add(handle_right_end);

  const left_hinge_plateGeom = new THREE.SphereGeometry(0.055, 20, 12);
  const left_hinge_plate = new THREE.Mesh(left_hinge_plateGeom, darkCopperMat);
  left_hinge_plate.name = "left_hinge_plate";
  left_hinge_plate.position.set(-0.455, 0.84, 0.13);
  left_hinge_plate.scale.set(0.72, 1.0, 0.28);
  root.add(left_hinge_plate);

  const left_hinge_pinGeom = new THREE.CylinderGeometry(0.027, 0.027, 0.055, 20);
  const left_hinge_pin = new THREE.Mesh(left_hinge_pinGeom, brassMat);
  left_hinge_pin.name = "left_hinge_pin";
  left_hinge_pin.rotation.x = Math.PI / 2;
  left_hinge_pin.position.set(-0.455, 0.84, 0.165);
  root.add(left_hinge_pin);

  const right_hinge_plateGeom = new THREE.SphereGeometry(0.06, 20, 12);
  const right_hinge_plate = new THREE.Mesh(right_hinge_plateGeom, darkCopperMat);
  right_hinge_plate.name = "right_hinge_plate";
  right_hinge_plate.position.set(0.455, 0.59, 0.13);
  right_hinge_plate.scale.set(0.7, 1.15, 0.28);
  root.add(right_hinge_plate);

  const right_hinge_pinGeom = new THREE.CylinderGeometry(0.022, 0.022, 0.05, 18);
  const right_hinge_pin = new THREE.Mesh(right_hinge_pinGeom, brassMat);
  right_hinge_pin.name = "right_hinge_pin";
  right_hinge_pin.rotation.x = Math.PI / 2;
  right_hinge_pin.position.set(0.47, 0.58, 0.165);
  root.add(right_hinge_pin);

  fitToUnitCube(root);
  return root;

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
}