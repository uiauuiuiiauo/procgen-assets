export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "glass_jar";

  const jar_shell = new THREE.Group();
  jar_shell.name = "jar_shell";
  root.add(jar_shell);

  const base_group = new THREE.Group();
  base_group.name = "base_group";
  root.add(base_group);

  const mouth_group = new THREE.Group();
  mouth_group.name = "mouth_group";
  root.add(mouth_group);

  const decoration_group = new THREE.Group();
  decoration_group.name = "decoration_group";
  root.add(decoration_group);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xdde8e1,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const glass_edgeMat = new THREE.MeshPhysicalMaterial({
    color: 0xb8c7be,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const inner_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd7e2dc,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const embossed_glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x87978e,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    side: THREE.DoubleSide
  });

  const jar_bodyProfile = [
    new THREE.Vector2(0.000, 0.000),
    new THREE.Vector2(0.280, 0.000),
    new THREE.Vector2(0.325, 0.006),
    new THREE.Vector2(0.352, 0.025),
    new THREE.Vector2(0.368, 0.065),
    new THREE.Vector2(0.375, 0.140),
    new THREE.Vector2(0.375, 0.760),
    new THREE.Vector2(0.370, 0.840),
    new THREE.Vector2(0.355, 0.900),
    new THREE.Vector2(0.330, 0.960),
    new THREE.Vector2(0.325, 0.985),
    new THREE.Vector2(0.325, 1.155),
    new THREE.Vector2(0.335, 1.170),
    new THREE.Vector2(0.335, 1.190),
    new THREE.Vector2(0.294, 1.190),
    new THREE.Vector2(0.294, 1.170),
    new THREE.Vector2(0.286, 1.155),
    new THREE.Vector2(0.286, 0.995),
    new THREE.Vector2(0.294, 0.970),
    new THREE.Vector2(0.320, 0.910),
    new THREE.Vector2(0.337, 0.840),
    new THREE.Vector2(0.340, 0.760),
    new THREE.Vector2(0.340, 0.150),
    new THREE.Vector2(0.334, 0.095),
    new THREE.Vector2(0.315, 0.065),
    new THREE.Vector2(0.280, 0.050),
    new THREE.Vector2(0.000, 0.050)
  ];
  const jar_bodyGeom = new THREE.LatheGeometry(jar_bodyProfile, 64);
  const jar_body = new THREE.Mesh(jar_bodyGeom, glassMat);
  jar_body.name = "jar_body";
  jar_shell.add(jar_body);

  const inner_wallGeom = new THREE.CylinderGeometry(
    0.289,
    0.289,
    0.165,
    64,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_glassMat);
  inner_wall.name = "inner_wall";
  inner_wall.position.y = 1.087;
  jar_shell.add(inner_wall);

  const inner_bottomGeom = new THREE.CircleGeometry(0.288, 64);
  const inner_bottom = new THREE.Mesh(inner_bottomGeom, inner_glassMat);
  inner_bottom.name = "inner_bottom";
  inner_bottom.rotation.x = -Math.PI / 2;
  inner_bottom.position.y = 0.054;
  jar_shell.add(inner_bottom);

  const base_floorGeom = new THREE.CylinderGeometry(
    0.318,
    0.326,
    0.018,
    64
  );
  const base_floor = new THREE.Mesh(base_floorGeom, glassMat);
  base_floor.name = "base_floor";
  base_floor.position.y = 0.052;
  base_group.add(base_floor);

  const base_ringGeom = new THREE.TorusGeometry(0.329, 0.017, 12, 64);
  const base_ring = new THREE.Mesh(base_ringGeom, glass_edgeMat);
  base_ring.name = "base_ring";
  base_ring.rotation.x = Math.PI / 2;
  base_ring.position.y = 0.022;
  base_group.add(base_ring);

  const base_knurlingGeom = new THREE.SphereGeometry(0.007, 8, 6);
  const base_knurling = new THREE.InstancedMesh(
    base_knurlingGeom,
    glass_edgeMat,
    48
  );
  base_knurling.name = "base_knurling";

  const base_knurl_dummy = new THREE.Object3D();
  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    base_knurl_dummy.position.set(
      Math.cos(angle) * 0.340,
      0.008,
      Math.sin(angle) * 0.340
    );
    base_knurl_dummy.rotation.set(0, -angle, 0);
    base_knurl_dummy.scale.set(0.75, 0.55, 1.2);
    base_knurl_dummy.updateMatrix();
    base_knurling.setMatrixAt(i, base_knurl_dummy.matrix);
  }
  base_knurling.instanceMatrix.needsUpdate = true;
  base_group.add(base_knurling);

  const bottom_inset_ringGeom = new THREE.TorusGeometry(
    0.278,
    0.006,
    8,
    64
  );
  const bottom_inset_ring = new THREE.Mesh(
    bottom_inset_ringGeom,
    embossed_glassMat
  );
  bottom_inset_ring.name = "bottom_inset_ring";
  bottom_inset_ring.rotation.x = Math.PI / 2;
  bottom_inset_ring.position.y = 0.064;
  base_group.add(bottom_inset_ring);

  const bottom_punt_ringGeom = new THREE.TorusGeometry(
    0.052,
    0.005,
    8,
    32
  );
  const bottom_punt_ring = new THREE.Mesh(
    bottom_punt_ringGeom,
    embossed_glassMat
  );
  bottom_punt_ring.name = "bottom_punt_ring";
  bottom_punt_ring.rotation.x = Math.PI / 2;
  bottom_punt_ring.position.y = 0.067;
  base_group.add(bottom_punt_ring);

  const shoulder_ringGeom = new THREE.TorusGeometry(
    0.351,
    0.019,
    12,
    64
  );
  const shoulder_ring = new THREE.Mesh(shoulder_ringGeom, glass_edgeMat);
  shoulder_ring.name = "shoulder_ring";
  shoulder_ring.rotation.x = Math.PI / 2;
  shoulder_ring.position.y = 0.925;
  mouth_group.add(shoulder_ring);

  const thread_base_ringGeom = new THREE.TorusGeometry(
    0.329,
    0.008,
    10,
    64
  );
  const thread_base_ring = new THREE.Mesh(
    thread_base_ringGeom,
    glass_edgeMat
  );
  thread_base_ring.name = "thread_base_ring";
  thread_base_ring.rotation.x = Math.PI / 2;
  thread_base_ring.position.y = 0.970;
  mouth_group.add(thread_base_ring);

  const thread_points = [];
  const thread_steps = 72;
  const thread_turns = 2.15;
  for (let i = 0; i <= thread_steps; i++) {
    const t = i / thread_steps;
    const angle = t * thread_turns * Math.PI * 2;
    thread_points.push(
      new THREE.Vector3(
        Math.cos(angle) * 0.337,
        0.978 + t * 0.118,
        Math.sin(angle) * 0.337
      )
    );
  }

  const screw_threadCurve = new THREE.CatmullRomCurve3(
    thread_points,
    false,
    "centripetal"
  );
  const screw_threadGeom = new THREE.TubeGeometry(
    screw_threadCurve,
    144,
    0.0075,
    8,
    false
  );
  const screw_thread = new THREE.Mesh(
    screw_threadGeom,
    glass_edgeMat
  );
  screw_thread.name = "screw_thread";
  mouth_group.add(screw_thread);

  const upper_bandGeom = new THREE.CylinderGeometry(
    0.340,
    0.340,
    0.038,
    64,
    1,
    true
  );
  const upper_band = new THREE.Mesh(upper_bandGeom, glass_edgeMat);
  upper_band.name = "upper_band";
  upper_band.position.y = 1.132;
  mouth_group.add(upper_band);

  const upper_band_lower_ringGeom = new THREE.TorusGeometry(
    0.334,
    0.007,
    10,
    64
  );
  const upper_band_lower_ring = new THREE.Mesh(
    upper_band_lower_ringGeom,
    glass_edgeMat
  );
  upper_band_lower_ring.name = "upper_band_lower_ring";
  upper_band_lower_ring.rotation.x = Math.PI / 2;
  upper_band_lower_ring.position.y = 1.111;
  mouth_group.add(upper_band_lower_ring);

  const upper_band_upper_ringGeom = new THREE.TorusGeometry(
    0.334,
    0.007,
    10,
    64
  );
  const upper_band_upper_ring = new THREE.Mesh(
    upper_band_upper_ringGeom,
    glass_edgeMat
  );
  upper_band_upper_ring.name = "upper_band_upper_ring";
  upper_band_upper_ring.rotation.x = Math.PI / 2;
  upper_band_upper_ring.position.y = 1.151;
  mouth_group.add(upper_band_upper_ring);

  const mouth_rimGeom = new THREE.TorusGeometry(
    0.315,
    0.020,
    14,
    64
  );
  const mouth_rim = new THREE.Mesh(mouth_rimGeom, glass_edgeMat);
  mouth_rim.name = "mouth_rim";
  mouth_rim.rotation.x = Math.PI / 2;
  mouth_rim.position.y = 1.181;
  mouth_group.add(mouth_rim);

  const mouth_lip_surfaceGeom = new THREE.RingGeometry(
    0.292,
    0.335,
    64
  );
  const mouth_lip_surface = new THREE.Mesh(
    mouth_lip_surfaceGeom,
    glass_edgeMat
  );
  mouth_lip_surface.name = "mouth_lip_surface";
  mouth_lip_surface.rotation.x = -Math.PI / 2;
  mouth_lip_surface.position.y = 1.190;
  mouth_group.add(mouth_lip_surface);

  const inner_mouth_ringGeom = new THREE.TorusGeometry(
    0.294,
    0.006,
    8,
    64
  );
  const inner_mouth_ring = new THREE.Mesh(
    inner_mouth_ringGeom,
    glass_edgeMat
  );
  inner_mouth_ring.name = "inner_mouth_ring";
  inner_mouth_ring.rotation.x = Math.PI / 2;
  inner_mouth_ring.position.y = 1.187;
  mouth_group.add(inner_mouth_ring);

  const side_flute_points = [
    new THREE.Vector3(0.350, 0.060, 0),
    new THREE.Vector3(0.363, 0.085, 0),
    new THREE.Vector3(0.374, 0.140, 0),
    new THREE.Vector3(0.378, 0.250, 0),
    new THREE.Vector3(0.378, 0.700, 0),
    new THREE.Vector3(0.372, 0.820, 0),
    new THREE.Vector3(0.360, 0.880, 0),
    new THREE.Vector3(0.340, 0.920, 0)
  ];
  const side_flutesCurve = new THREE.CatmullRomCurve3(
    side_flute_points,
    false,
    "centripetal"
  );
  const side_flutesGeom = new THREE.TubeGeometry(
    side_flutesCurve,
    48,
    0.0055,
    7,
    false
  );
  const side_flutes = new THREE.InstancedMesh(
    side_flutesGeom,
    embossed_glassMat,
    12
  );
  side_flutes.name = "side_flutes";

  const side_flute_dummy = new THREE.Object3D();
  for (let i = 0; i < 12; i++) {
    side_flute_dummy.position.set(0, 0, 0);
    side_flute_dummy.rotation.set(
      0,
      i / 12 * Math.PI * 2,
      0
    );
    side_flute_dummy.scale.set(1, 1, 1);
    side_flute_dummy.updateMatrix();
    side_flutes.setMatrixAt(i, side_flute_dummy.matrix);
  }
  side_flutes.instanceMatrix.needsUpdate = true;
  decoration_group.add(side_flutes);

  const vertical_mold_linesGeom = new THREE.CylinderGeometry(
    0.0035,
    0.0035,
    0.650,
    8
  );
  const vertical_mold_lines = new THREE.InstancedMesh(
    vertical_mold_linesGeom,
    embossed_glassMat,
    8
  );
  vertical_mold_lines.name = "vertical_mold_lines";

  const vertical_mold_dummy = new THREE.Object3D();
  for (let i = 0; i < 8; i++) {
    const angle = i / 8 * Math.PI * 2;
    vertical_mold_dummy.position.set(
      Math.cos(angle) * 0.374,
      0.475,
      Math.sin(angle) * 0.374
    );
    vertical_mold_dummy.rotation.set(0, 0, 0);
    vertical_mold_dummy.scale.set(1, 1, 1);
    vertical_mold_dummy.updateMatrix();
    vertical_mold_lines.setMatrixAt(i, vertical_mold_dummy.matrix);
  }
  vertical_mold_lines.instanceMatrix.needsUpdate = true;
  decoration_group.add(vertical_mold_lines);

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

  fitToUnitCube(THREE, root);
  return root;
}