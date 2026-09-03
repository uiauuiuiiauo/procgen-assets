export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "crystal_goblet";

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const cutMat = new THREE.MeshPhysicalMaterial({
    color: 0xe8eef0,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.9,
    ior: 1.5,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    side: THREE.DoubleSide
  });

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xf0ca63,
    metalness: 0.6,
    roughness: 0.2,
    side: THREE.DoubleSide
  });

  const glass_base_assembly = new THREE.Group();
  glass_base_assembly.name = "glass_base_assembly";
  root.add(glass_base_assembly);

  const bowl_assembly = new THREE.Group();
  bowl_assembly.name = "bowl_assembly";
  root.add(bowl_assembly);

  const stem_assembly = new THREE.Group();
  stem_assembly.name = "stem_assembly";
  root.add(stem_assembly);

  const glass_footProfile = [
    new THREE.Vector2(0.00, 0.02),
    new THREE.Vector2(0.34, 0.02),
    new THREE.Vector2(0.72, 0.035),
    new THREE.Vector2(0.92, 0.065),
    new THREE.Vector2(0.98, 0.11),
    new THREE.Vector2(0.95, 0.15),
    new THREE.Vector2(0.82, 0.18),
    new THREE.Vector2(0.55, 0.20),
    new THREE.Vector2(0.30, 0.23),
    new THREE.Vector2(0.00, 0.24)
  ];
  const glass_footGeom = new THREE.LatheGeometry(glass_footProfile, 64);
  const glass_foot = new THREE.Mesh(glass_footGeom, glassMat);
  glass_foot.name = "glass_foot";
  glass_base_assembly.add(glass_foot);

  const foot_outer_rimGeom = new THREE.TorusGeometry(0.94, 0.025, 10, 64);
  const foot_outer_rim = new THREE.Mesh(foot_outer_rimGeom, cutMat);
  foot_outer_rim.name = "foot_outer_rim";
  foot_outer_rim.rotation.x = Math.PI / 2;
  foot_outer_rim.position.y = 0.105;
  glass_base_assembly.add(foot_outer_rim);

  const foot_inner_ringGeom = new THREE.TorusGeometry(0.76, 0.012, 8, 64);
  const foot_inner_ring = new THREE.Mesh(foot_inner_ringGeom, cutMat);
  foot_inner_ring.name = "foot_inner_ring";
  foot_inner_ring.rotation.x = Math.PI / 2;
  foot_inner_ring.position.y = 0.17;
  glass_base_assembly.add(foot_inner_ring);

  const stemProfile = [
    new THREE.Vector2(0.00, 0.18),
    new THREE.Vector2(0.28, 0.20),
    new THREE.Vector2(0.34, 0.28),
    new THREE.Vector2(0.31, 0.38),
    new THREE.Vector2(0.24, 0.48),
    new THREE.Vector2(0.19, 0.60),
    new THREE.Vector2(0.17, 0.82),
    new THREE.Vector2(0.17, 1.08),
    new THREE.Vector2(0.20, 1.30),
    new THREE.Vector2(0.28, 1.42),
    new THREE.Vector2(0.31, 1.50),
    new THREE.Vector2(0.27, 1.59),
    new THREE.Vector2(0.19, 1.68),
    new THREE.Vector2(0.00, 1.70)
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 8);
  const stem = new THREE.Mesh(stemGeom, glassMat);
  stem.name = "stem";
  stem_assembly.add(stem);

  const stem_lower_collarGeom = new THREE.CylinderGeometry(
    0.30, 0.34, 0.10, 8
  );
  const stem_lower_collar = new THREE.Mesh(stem_lower_collarGeom, cutMat);
  stem_lower_collar.name = "stem_lower_collar";
  stem_lower_collar.position.y = 0.29;
  stem_assembly.add(stem_lower_collar);

  const stem_upper_collarGeom = new THREE.CylinderGeometry(
    0.25, 0.29, 0.10, 8
  );
  const stem_upper_collar = new THREE.Mesh(stem_upper_collarGeom, cutMat);
  stem_upper_collar.name = "stem_upper_collar";
  stem_upper_collar.position.y = 1.53;
  stem_assembly.add(stem_upper_collar);

  const stem_upper_ringGeom = new THREE.TorusGeometry(0.235, 0.018, 8, 32);
  const stem_upper_ring = new THREE.Mesh(stem_upper_ringGeom, cutMat);
  stem_upper_ring.name = "stem_upper_ring";
  stem_upper_ring.rotation.x = Math.PI / 2;
  stem_upper_ring.position.y = 1.61;
  stem_assembly.add(stem_upper_ring);

  const glass_bowlProfile = [
    new THREE.Vector2(0.00, 1.58),
    new THREE.Vector2(0.18, 1.59),
    new THREE.Vector2(0.38, 1.65),
    new THREE.Vector2(0.62, 1.80),
    new THREE.Vector2(0.82, 2.02),
    new THREE.Vector2(0.98, 2.32),
    new THREE.Vector2(1.09, 2.68),
    new THREE.Vector2(1.17, 3.10),
    new THREE.Vector2(1.21, 3.52),
    new THREE.Vector2(1.22, 3.78),
    new THREE.Vector2(1.18, 3.78),
    new THREE.Vector2(1.17, 3.52),
    new THREE.Vector2(1.13, 3.10),
    new THREE.Vector2(1.05, 2.70),
    new THREE.Vector2(0.94, 2.35),
    new THREE.Vector2(0.79, 2.07),
    new THREE.Vector2(0.60, 1.86),
    new THREE.Vector2(0.36, 1.72),
    new THREE.Vector2(0.16, 1.66),
    new THREE.Vector2(0.00, 1.65)
  ];
  const glass_bowlGeom = new THREE.LatheGeometry(glass_bowlProfile, 64);
  const glass_bowl = new THREE.Mesh(glass_bowlGeom, glassMat);
  glass_bowl.name = "glass_bowl";
  bowl_assembly.add(glass_bowl);

  const bowl_base_ringGeom = new THREE.TorusGeometry(0.22, 0.018, 8, 32);
  const bowl_base_ring = new THREE.Mesh(bowl_base_ringGeom, cutMat);
  bowl_base_ring.name = "bowl_base_ring";
  bowl_base_ring.rotation.x = Math.PI / 2;
  bowl_base_ring.position.y = 1.67;
  bowl_assembly.add(bowl_base_ring);

  const bowlRadiusSamples = [
    { y: 1.65, r: 0.38 },
    { y: 1.80, r: 0.62 },
    { y: 2.02, r: 0.82 },
    { y: 2.32, r: 0.98 },
    { y: 2.68, r: 1.09 },
    { y: 3.10, r: 1.17 },
    { y: 3.52, r: 1.21 },
    { y: 3.78, r: 1.22 }
  ];

  function bowlRadiusAt(y) {
    if (y <= bowlRadiusSamples[0].y) return bowlRadiusSamples[0].r;
    for (let i = 0; i < bowlRadiusSamples.length - 1; i++) {
      const a = bowlRadiusSamples[i];
      const b = bowlRadiusSamples[i + 1];
      if (y <= b.y) {
        const t = (y - a.y) / (b.y - a.y);
        return a.r + (b.r - a.r) * t;
      }
    }
    return bowlRadiusSamples[bowlRadiusSamples.length - 1].r;
  }

  function makeSurfaceCutGeometry(y0, y1, angleSpan, tubeRadius) {
    const points = [];
    const pointCount = 12;
    for (let i = 0; i < pointCount; i++) {
      const t = i / (pointCount - 1);
      const y = y0 + (y1 - y0) * t;
      const wave = Math.sin(t * Math.PI * 2);
      const angle = angleSpan * (t + wave * 0.12);
      const radius = bowlRadiusAt(y) + 0.014 + Math.abs(wave) * 0.006;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
      ));
    }
    const curve = new THREE.CatmullRomCurve3(
      points,
      false,
      "centripetal"
    );
    return new THREE.TubeGeometry(curve, 40, tubeRadius, 6, false);
  }

  function makeCutInstances(geometry, material, count, name) {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.name = name;
    const transform = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      transform.position.set(0, 0, 0);
      transform.rotation.set(0, i / count * Math.PI * 2, 0);
      transform.scale.set(1, 1, 1);
      transform.updateMatrix();
      mesh.setMatrixAt(i, transform.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    return mesh;
  }

  const long_flame_cutsGeom = makeSurfaceCutGeometry(
    1.76, 3.48, 0.31, 0.015
  );
  const long_flame_cuts = makeCutInstances(
    long_flame_cutsGeom, cutMat, 8, "long_flame_cuts"
  );
  bowl_assembly.add(long_flame_cuts);

  const long_flame_inner_cutsGeom = makeSurfaceCutGeometry(
    1.86, 3.25, 0.15, 0.009
  );
  const long_flame_inner_cuts = makeCutInstances(
    long_flame_inner_cutsGeom, cutMat, 8, "long_flame_inner_cuts"
  );
  bowl_assembly.add(long_flame_inner_cuts);

  const lower_fan_cutsGeom = makeSurfaceCutGeometry(
    1.70, 2.38, 0.23, 0.011
  );
  const lower_fan_cuts = makeCutInstances(
    lower_fan_cutsGeom, cutMat, 16, "lower_fan_cuts"
  );
  bowl_assembly.add(lower_fan_cuts);

  const star_cutShape = new THREE.Shape();
  star_cutShape.moveTo(0.00, 0.15);
  star_cutShape.lineTo(0.075, 0.00);
  star_cutShape.lineTo(0.00, -0.15);
  star_cutShape.lineTo(-0.075, 0.00);
  star_cutShape.closePath();

  const star_cutsGeom = new THREE.ShapeGeometry(star_cutShape);
  const star_cuts = new THREE.InstancedMesh(star_cutsGeom, cutMat, 16);
  star_cuts.name = "star_cuts";
  const starTransform = new THREE.Object3D();
  const starForward = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < 16; i++) {
    const angle = i / 16 * Math.PI * 2;
    const normal = new THREE.Vector3(
      Math.cos(angle),
      0,
      Math.sin(angle)
    );
    const radius = bowlRadiusAt(1.82) + 0.016;
    starTransform.position.set(
      normal.x * radius,
      1.82,
      normal.z * radius
    );
    starTransform.quaternion.setFromUnitVectors(starForward, normal);
    starTransform.scale.set(1, 1, 1);
    starTransform.updateMatrix();
    star_cuts.setMatrixAt(i, starTransform.matrix);
  }
  star_cuts.instanceMatrix.needsUpdate = true;
  bowl_assembly.add(star_cuts);

  const gold_inner_bandGeom = new THREE.CylinderGeometry(
    1.165, 1.17, 0.14, 64, 1, true
  );
  const gold_inner_band = new THREE.Mesh(gold_inner_bandGeom, goldMat);
  gold_inner_band.name = "gold_inner_band";
  gold_inner_band.position.y = 3.70;
  bowl_assembly.add(gold_inner_band);

  const gold_rim_bandGeom = new THREE.CylinderGeometry(
    1.235, 1.215, 0.09, 64, 1, true
  );
  const gold_rim_band = new THREE.Mesh(gold_rim_bandGeom, goldMat);
  gold_rim_band.name = "gold_rim_band";
  gold_rim_band.position.y = 3.79;
  bowl_assembly.add(gold_rim_band);

  const gold_top_rimGeom = new THREE.RingGeometry(1.14, 1.255, 64);
  const gold_top_rim = new THREE.Mesh(gold_top_rimGeom, goldMat);
  gold_top_rim.name = "gold_top_rim";
  gold_top_rim.rotation.x = Math.PI / 2;
  gold_top_rim.position.y = 3.835;
  bowl_assembly.add(gold_top_rim);

  const gold_outer_beadGeom = new THREE.TorusGeometry(1.225, 0.030, 10, 64);
  const gold_outer_bead = new THREE.Mesh(gold_outer_beadGeom, goldMat);
  gold_outer_bead.name = "gold_outer_bead";
  gold_outer_bead.rotation.x = Math.PI / 2;
  gold_outer_bead.position.y = 3.82;
  bowl_assembly.add(gold_outer_bead);

  const gold_lower_beadGeom = new THREE.TorusGeometry(1.205, 0.018, 8, 64);
  const gold_lower_bead = new THREE.Mesh(gold_lower_beadGeom, goldMat);
  gold_lower_bead.name = "gold_lower_bead";
  gold_lower_bead.rotation.x = Math.PI / 2;
  gold_lower_bead.position.y = 3.745;
  bowl_assembly.add(gold_lower_bead);

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