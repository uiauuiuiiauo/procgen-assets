export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "root";

  const carrot_assembly = new THREE.Group();
  carrot_assembly.name = "carrot_assembly";
  carrot_assembly.rotation.set(0.12, 0, -0.95);
  root.add(carrot_assembly);

  const carrot_bodyMat = new THREE.MeshStandardMaterial({
    color: 0xffb20a,
    metalness: 0.0,
    roughness: 0.7
  });

  const growth_ringsMat = new THREE.MeshStandardMaterial({
    color: 0xc98212,
    metalness: 0.0,
    roughness: 0.9
  });

  const surface_scarsMat = new THREE.MeshStandardMaterial({
    color: 0xd8a34c,
    metalness: 0.0,
    roughness: 0.9
  });

  const surface_pitsMat = new THREE.MeshStandardMaterial({
    color: 0x9b5b17,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const cut_faceMat = new THREE.MeshStandardMaterial({
    color: 0xffd34b,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const cut_rindMat = new THREE.MeshStandardMaterial({
    color: 0x80552a,
    metalness: 0.0,
    roughness: 0.9,
    side: THREE.DoubleSide
  });

  const cut_coreMat = new THREE.MeshStandardMaterial({
    color: 0xffe477,
    metalness: 0.0,
    roughness: 0.7,
    side: THREE.DoubleSide
  });

  const cut_growth_ringMat = new THREE.MeshStandardMaterial({
    color: 0xd99a20,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide
  });

  const profileData = [
    [0.000, -0.700],
    [0.075, -0.692],
    [0.155, -0.665],
    [0.230, -0.610],
    [0.285, -0.530],
    [0.315, -0.420],
    [0.325, -0.280],
    [0.326, -0.120],
    [0.317,  0.040],
    [0.302,  0.200],
    [0.282,  0.360],
    [0.258,  0.510],
    [0.231,  0.640],
    [0.205,  0.730],
    [0.184,  0.790],
    [0.174,  0.820]
  ];

  function bodyRadiusAt(y) {
    if (y <= profileData[0][1]) return profileData[0][0];
    for (let i = 1; i < profileData.length; i++) {
      const lower = profileData[i - 1];
      const upper = profileData[i];
      if (y <= upper[1]) {
        const t = (y - lower[1]) / (upper[1] - lower[1]);
        return lower[0] + (upper[0] - lower[0]) * t;
      }
    }
    return profileData[profileData.length - 1][0];
  }

  const carrot_bodyProfile = profileData.map(
    point => new THREE.Vector2(point[0], point[1])
  );
  const carrot_bodyGeom = new THREE.LatheGeometry(carrot_bodyProfile, 64);
  const carrot_body = new THREE.Mesh(carrot_bodyGeom, carrot_bodyMat);
  carrot_body.name = "carrot_body";
  carrot_assembly.add(carrot_body);

  const growth_ringsGeom = new THREE.TorusGeometry(1, 0.009, 6, 64);
  const growthRingHeights = [-0.385, -0.035, 0.305, 0.585];
  const growth_rings = new THREE.InstancedMesh(
    growth_ringsGeom,
    growth_ringsMat,
    growthRingHeights.length
  );
  growth_rings.name = "growth_rings";

  const growth_ring_dummy = new THREE.Object3D();
  for (let i = 0; i < growthRingHeights.length; i++) {
    const y = growthRingHeights[i];
    const radius = bodyRadiusAt(y) + 0.001;
    growth_ring_dummy.position.set(0, y, 0);
    growth_ring_dummy.rotation.set(Math.PI / 2, 0, 0);
    growth_ring_dummy.scale.set(radius, radius, 1);
    growth_ring_dummy.updateMatrix();
    growth_rings.setMatrixAt(i, growth_ring_dummy.matrix);
  }
  growth_rings.instanceMatrix.needsUpdate = true;
  carrot_assembly.add(growth_rings);

  const surface_scars = new THREE.Group();
  surface_scars.name = "surface_scars";
  carrot_assembly.add(surface_scars);

  function addSurfaceScar(angle0, angle1, y0, y1, bend, radius) {
    const points = [];
    for (let i = 0; i <= 6; i++) {
      const t = i / 6;
      const angle = angle0 + (angle1 - angle0) * t;
      const y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI) * bend;
      const surfaceRadius = bodyRadiusAt(y) + 0.005;
      points.push(new THREE.Vector3(
        Math.cos(angle) * surfaceRadius,
        y,
        Math.sin(angle) * surfaceRadius
      ));
    }
    const scarGeom = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      14,
      radius,
      5,
      false
    );
    const scar = new THREE.Mesh(scarGeom, surface_scarsMat);
    surface_scars.add(scar);
  }

  addSurfaceScar(0.42, 0.72, -0.500, -0.390, 0.012, 0.0045);
  addSurfaceScar(1.05, 1.32, -0.285, -0.170, -0.010, 0.0040);
  addSurfaceScar(0.18, 0.46, -0.090, 0.025, 0.014, 0.0045);
  addSurfaceScar(1.30, 1.58, 0.105, 0.225, 0.008, 0.0038);
  addSurfaceScar(0.55, 0.82, 0.315, 0.425, -0.012, 0.0042);
  addSurfaceScar(1.12, 1.39, 0.470, 0.565, 0.010, 0.0038);
  addSurfaceScar(0.28, 0.50, 0.610, 0.685, -0.006, 0.0035);
  addSurfaceScar(1.52, 1.72, -0.600, -0.525, 0.006, 0.0035);
  addSurfaceScar(0.82, 1.02, 0.690, 0.748, 0.004, 0.0032);

  const surface_pitsGeom = new THREE.CircleGeometry(1, 10);
  const surfacePitData = [
    [0.34, -0.555, 0.010, 0.005],
    [0.76, -0.455, 0.007, 0.004],
    [1.22, -0.330, 0.009, 0.004],
    [0.16, -0.145, 0.006, 0.004],
    [0.58, -0.015, 0.008, 0.004],
    [1.46,  0.145, 0.006, 0.003],
    [0.30,  0.255, 0.009, 0.004],
    [1.02,  0.390, 0.006, 0.003],
    [0.66,  0.520, 0.008, 0.004],
    [1.35,  0.625, 0.006, 0.003],
    [0.22,  0.720, 0.005, 0.003],
    [1.70, -0.090, 0.005, 0.003]
  ];
  const surface_pits = new THREE.InstancedMesh(
    surface_pitsGeom,
    surface_pitsMat,
    surfacePitData.length
  );
  surface_pits.name = "surface_pits";

  const surface_pit_dummy = new THREE.Object3D();
  const decalNormal = new THREE.Vector3(0, 0, 1);
  for (let i = 0; i < surfacePitData.length; i++) {
    const pit = surfacePitData[i];
    const angle = pit[0];
    const y = pit[1];
    const normal = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
    const radius = bodyRadiusAt(y) + 0.006;

    surface_pit_dummy.position.set(normal.x * radius, y, normal.z * radius);
    surface_pit_dummy.quaternion.setFromUnitVectors(decalNormal, normal);
    surface_pit_dummy.scale.set(pit[2], pit[3], 1);
    surface_pit_dummy.updateMatrix();
    surface_pits.setMatrixAt(i, surface_pit_dummy.matrix);
  }
  surface_pits.instanceMatrix.needsUpdate = true;
  carrot_assembly.add(surface_pits);

  const cut_faceGeom = new THREE.CircleGeometry(0.169, 48);
  const cut_face = new THREE.Mesh(cut_faceGeom, cut_faceMat);
  cut_face.name = "cut_face";
  cut_face.rotation.x = Math.PI / 2;
  cut_face.position.y = 0.821;
  carrot_assembly.add(cut_face);

  const cut_rindGeom = new THREE.RingGeometry(0.149, 0.174, 48);
  const cut_rind = new THREE.Mesh(cut_rindGeom, cut_rindMat);
  cut_rind.name = "cut_rind";
  cut_rind.rotation.x = Math.PI / 2;
  cut_rind.position.y = 0.823;
  carrot_assembly.add(cut_rind);

  const cut_coreGeom = new THREE.CircleGeometry(0.056, 32);
  const cut_core = new THREE.Mesh(cut_coreGeom, cut_coreMat);
  cut_core.name = "cut_core";
  cut_core.rotation.x = Math.PI / 2;
  cut_core.position.y = 0.824;
  carrot_assembly.add(cut_core);

  const cut_growth_ringGeom = new THREE.RingGeometry(0.092, 0.108, 40);
  const cut_growth_ring = new THREE.Mesh(cut_growth_ringGeom, cut_growth_ringMat);
  cut_growth_ring.name = "cut_growth_ring";
  cut_growth_ring.rotation.x = Math.PI / 2;
  cut_growth_ring.position.y = 0.8245;
  carrot_assembly.add(cut_growth_ring);

  const cut_centerGeom = new THREE.CircleGeometry(0.018, 20);
  const cut_center = new THREE.Mesh(cut_centerGeom, cut_growth_ringMat);
  cut_center.name = "cut_center";
  cut_center.rotation.x = Math.PI / 2;
  cut_center.position.y = 0.825;
  carrot_assembly.add(cut_center);

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
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
}