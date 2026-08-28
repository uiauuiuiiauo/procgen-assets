export default function generate(THREE) {
  const root = new THREE.Group();
  const ring_assembly = new THREE.Group();
  root.add(ring_assembly);

  const silverMat = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    metalness: 0.5,
    roughness: 0.25,
  });
  const polishedMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const center_gemstoneMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.18,
    ior: 1.8,
    transparent: true,
    opacity: 0.98,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  const halo_diamondsMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.45,
    ior: 2.4,
    transparent: true,
    opacity: 0.96,
    vertexColors: true,
    flatShading: true,
    side: THREE.DoubleSide,
  });
  const shoulder_diamondsMat = halo_diamondsMat;
  const diamond_highlightsMat = halo_diamondsMat;

  const diamond_reflectorMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  function createFacetedOvalGemGeometry() {
    const positions = [];
    const colors = [];
    const segments = 20;
    const palette = [
      0x7432a8, 0x9f5dcf, 0xc799ef, 0x56207c,
      0xaf72dc, 0xead8ff, 0x8b45bd, 0xd9c2f5,
      0x69308f, 0xb779e2, 0x40175f, 0xe7dcff,
    ];

    function addTriangle(a, b, c, colorHex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = new THREE.Color(colorHex);
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const outer = [];
    const middle = [];
    const table = [];
    const pavilion = [];

    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      const wave = Math.sin(angle * 2);
      outer.push(new THREE.Vector3(
        Math.cos(angle) * 0.50,
        Math.sin(angle) * 0.60,
        0.025
      ));
      middle.push(new THREE.Vector3(
        Math.cos(angle) * 0.39,
        Math.sin(angle) * 0.47,
        0.105 + wave * 0.009
      ));
      table.push(new THREE.Vector3(
        Math.cos(angle) * 0.245,
        Math.sin(angle) * 0.295,
        0.155 + wave * 0.006
      ));
      pavilion.push(new THREE.Vector3(
        Math.cos(angle) * 0.27,
        Math.sin(angle) * 0.32,
        -0.105
      ));
    }

    const table_center = new THREE.Vector3(0, 0, 0.17);
    const culet = new THREE.Vector3(0, 0, -0.19);

    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;

      addTriangle(
        outer[i], outer[j], middle[j],
        palette[(i * 5 + 1) % palette.length]
      );
      addTriangle(
        outer[i], middle[j], middle[i],
        palette[(i * 7 + 4) % palette.length]
      );

      addTriangle(
        middle[i], middle[j], table[j],
        palette[(i * 3 + 6) % palette.length]
      );
      addTriangle(
        middle[i], table[j], table[i],
        palette[(i * 5 + 2) % palette.length]
      );

      addTriangle(
        table[i], table[j], table_center,
        palette[(i * 7 + 3) % palette.length]
      );

      addTriangle(
        outer[i], pavilion[i], pavilion[j],
        palette[(i * 2 + 4) % palette.length]
      );
      addTriangle(
        outer[i], pavilion[j], outer[j],
        palette[(i * 3 + 8) % palette.length]
      );
      addTriangle(
        pavilion[i], culet, pavilion[j],
        palette[(i * 5 + 5) % palette.length]
      );
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
    geometry.computeVertexNormals();
    return geometry;
  }

  function createRoundDiamondGeometry() {
    const positions = [];
    const colors = [];
    const segments = 12;
    const palette = [
      0xffffff, 0xe8eefF, 0xcbd5e8, 0xf9fbff,
      0xaebbc2, 0xdde8f3, 0xffffff, 0xbac7d8,
    ];

    function addTriangle(a, b, c, colorHex) {
      positions.push(
        a.x, a.y, a.z,
        b.x, b.y, b.z,
        c.x, c.y, c.z
      );
      const color = new THREE.Color(colorHex);
      for (let i = 0; i < 3; i++) {
        colors.push(color.r, color.g, color.b);
      }
    }

    const girdle = [];
    const crown = [];
    for (let i = 0; i < segments; i++) {
      const angle = i / segments * Math.PI * 2;
      girdle.push(new THREE.Vector3(
        Math.cos(angle) * 0.5,
        Math.sin(angle) * 0.5,
        0
      ));
      crown.push(new THREE.Vector3(
        Math.cos(angle) * 0.24,
        Math.sin(angle) * 0.24,
        0.34
      ));
    }

    const table_center = new THREE.Vector3(0, 0, 0.37);
    const culet = new THREE.Vector3(0, 0, -0.5);

    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      addTriangle(
        girdle[i], girdle[j], crown[j],
        palette[(i * 3) % palette.length]
      );
      addTriangle(
        girdle[i], crown[j], crown[i],
        palette[(i * 5 + 2) % palette.length]
      );
      addTriangle(
        crown[i], crown[j], table_center,
        palette[(i * 7 + 1) % palette.length]
      );
      addTriangle(
        girdle[i], culet, girdle[j],
        palette[(i * 2 + 4) % palette.length]
      );
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
    geometry.computeVertexNormals();
    return geometry;
  }

  const bandPoints = [];
  const bandRadiusX = 0.68;
  const bandRadiusZ = 0.74;
  for (let i = 0; i < 48; i++) {
    const angle = i / 48 * Math.PI * 2;
    bandPoints.push(new THREE.Vector3(
      Math.cos(angle) * bandRadiusX,
      -0.08,
      Math.sin(angle) * bandRadiusZ
    ));
  }
  const bandCurve = new THREE.CatmullRomCurve3(
    bandPoints,
    true,
    "centripetal"
  );
  const bandGeom = new THREE.TubeGeometry(
    bandCurve,
    96,
    0.058,
    10,
    true
  );
  const bandMat = silverMat;
  const band = new THREE.Mesh(bandGeom, bandMat);
  ring_assembly.add(band);

  function makeShoulderCurve(side) {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.655, -0.08, 0.10),
      new THREE.Vector3(side * 0.625, -0.025, 0.25),
      new THREE.Vector3(side * 0.565, 0.035, 0.40),
      new THREE.Vector3(side * 0.485, 0.085, 0.52),
    ], false, "centripetal");
  }

  const right_shoulderGeom = new THREE.TubeGeometry(
    makeShoulderCurve(1),
    28,
    0.074,
    10,
    false
  );
  const right_shoulderMat = silverMat;
  const right_shoulder = new THREE.Mesh(
    right_shoulderGeom,
    right_shoulderMat
  );
  ring_assembly.add(right_shoulder);

  const left_shoulderGeom = new THREE.TubeGeometry(
    makeShoulderCurve(-1),
    28,
    0.074,
    10,
    false
  );
  const left_shoulderMat = silverMat;
  const left_shoulder = new THREE.Mesh(
    left_shoulderGeom,
    left_shoulderMat
  );
  ring_assembly.add(left_shoulder);

  const setting_basketGeom = new THREE.TorusGeometry(
    0.475,
    0.025,
    10,
    64
  );
  setting_basketGeom.scale(1, 1.2, 1);
  const setting_basketMat = silverMat;
  const setting_basket = new THREE.Mesh(
    setting_basketGeom,
    setting_basketMat
  );
  setting_basket.position.set(0, 0.10, 0.57);
  ring_assembly.add(setting_basket);

  const halo_frameGeom = new THREE.TorusGeometry(
    0.59,
    0.045,
    12,
    72
  );
  halo_frameGeom.scale(1, 1.2, 1);
  const halo_frameMat = polishedMat;
  const halo_frame = new THREE.Mesh(halo_frameGeom, halo_frameMat);
  halo_frame.position.set(0, 0.10, 0.63);
  ring_assembly.add(halo_frame);

  const inner_bezelGeom = new THREE.TorusGeometry(
    0.50,
    0.018,
    10,
    64
  );
  inner_bezelGeom.scale(1, 1.2, 1);
  const inner_bezelMat = polishedMat;
  const inner_bezel = new THREE.Mesh(inner_bezelGeom, inner_bezelMat);
  inner_bezel.position.set(0, 0.10, 0.675);
  ring_assembly.add(inner_bezel);

  const center_gemstoneGeom = createFacetedOvalGemGeometry();
  const center_gemstone = new THREE.Mesh(
    center_gemstoneGeom,
    center_gemstoneMat
  );
  center_gemstone.position.set(0, 0.10, 0.68);
  center_gemstone.scale.setScalar(0.9);
  ring_assembly.add(center_gemstone);

  const dummy = new THREE.Object3D();

  const haloCount = 26;
  const halo_diamondsGeom = createRoundDiamondGeometry();
  const halo_diamonds = new THREE.InstancedMesh(
    halo_diamondsGeom,
    halo_diamondsMat,
    haloCount
  );
  for (let i = 0; i < haloCount; i++) {
    const angle = i / haloCount * Math.PI * 2;
    dummy.position.set(
      Math.cos(angle) * 0.56,
      0.10 + Math.sin(angle) * 0.67,
      0.69
    );
    dummy.rotation.set(0, 0, angle);
    dummy.scale.setScalar(0.095);
    dummy.updateMatrix();
    halo_diamonds.setMatrixAt(i, dummy.matrix);
  }
  halo_diamonds.instanceMatrix.needsUpdate = true;
  ring_assembly.add(halo_diamonds);

  const diamond_reflectorGeom = new THREE.CircleGeometry(0.5, 12);
  const halo_diamond_reflectors = new THREE.InstancedMesh(
    diamond_reflectorGeom,
    diamond_reflectorMat,
    haloCount
  );
  for (let i = 0; i < haloCount; i++) {
    const angle = i / haloCount * Math.PI * 2;
    dummy.position.set(
      Math.cos(angle) * 0.56,
      0.10 + Math.sin(angle) * 0.67,
      0.674
    );
    dummy.rotation.set(0, 0, angle);
    dummy.scale.setScalar(0.095);
    dummy.updateMatrix();
    halo_diamond_reflectors.setMatrixAt(i, dummy.matrix);
  }
  halo_diamond_reflectors.instanceMatrix.needsUpdate = true;
  ring_assembly.add(halo_diamond_reflectors);

  const diamond_highlightGeom = new THREE.CircleGeometry(0.16, 8);
  const halo_diamond_highlights = new THREE.InstancedMesh(
    diamond_highlightGeom,
    diamond_highlightsMat,
    haloCount
  );
  for (let i = 0; i < haloCount; i++) {
    const angle = i / haloCount * Math.PI * 2;
    dummy.position.set(
      Math.cos(angle) * 0.56,
      0.10 + Math.sin(angle) * 0.67,
      0.723
    );
    dummy.rotation.set(0, 0, angle);
    dummy.scale.setScalar(0.095);
    dummy.updateMatrix();
    halo_diamond_highlights.setMatrixAt(i, dummy.matrix);
  }
  halo_diamond_highlights.instanceMatrix.needsUpdate = true;
  ring_assembly.add(halo_diamond_highlights);

  const shoulderCount = 14;
  const shoulder_diamondsGeom = halo_diamondsGeom;
  const shoulder_diamonds = new THREE.InstancedMesh(
    shoulder_diamondsGeom,
    shoulder_diamondsMat,
    shoulderCount
  );
  let shoulderIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const x = side * (0.65 - 0.15 * t);
      const y = -0.08 + 0.16 * t;
      const z = 0.12 + 0.40 * t;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, side * 0.22);
      dummy.scale.setScalar(0.065 + 0.004 * i);
      dummy.updateMatrix();
      shoulder_diamonds.setMatrixAt(shoulderIndex++, dummy.matrix);
    }
  }
  shoulder_diamonds.instanceMatrix.needsUpdate = true;
  ring_assembly.add(shoulder_diamonds);

  const shoulder_reflectors = new THREE.InstancedMesh(
    diamond_reflectorGeom,
    diamond_reflectorMat,
    shoulderCount
  );
  shoulderIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const x = side * (0.65 - 0.15 * t);
      const y = -0.08 + 0.16 * t;
      const z = 0.111 + 0.40 * t;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, side * 0.22);
      dummy.scale.setScalar(0.065 + 0.004 * i);
      dummy.updateMatrix();
      shoulder_reflectors.setMatrixAt(shoulderIndex++, dummy.matrix);
    }
  }
  shoulder_reflectors.instanceMatrix.needsUpdate = true;
  ring_assembly.add(shoulder_reflectors);

  const shoulder_highlights = new THREE.InstancedMesh(
    diamond_highlightGeom,
    diamond_highlightsMat,
    shoulderCount
  );
  shoulderIndex = 0;
  for (const side of [-1, 1]) {
    for (let i = 0; i < 7; i++) {
      const t = i / 6;
      const x = side * (0.65 - 0.15 * t);
      const y = -0.08 + 0.16 * t;
      const z = 0.145 + 0.40 * t;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, side * 0.22);
      dummy.scale.setScalar(0.065 + 0.004 * i);
      dummy.updateMatrix();
      shoulder_highlights.setMatrixAt(shoulderIndex++, dummy.matrix);
    }
  }
  shoulder_highlights.instanceMatrix.needsUpdate = true;
  ring_assembly.add(shoulder_highlights);

  const prongGeom = new THREE.SphereGeometry(1, 18, 10);

  const left_prong = new THREE.Mesh(prongGeom, polishedMat);
  left_prong.position.set(-0.445, 0.10, 0.82);
  left_prong.scale.set(0.072, 0.046, 0.048);
  ring_assembly.add(left_prong);

  const right_prong = new THREE.Mesh(prongGeom, polishedMat);
  right_prong.position.set(0.445, 0.10, 0.82);
  right_prong.scale.set(0.072, 0.046, 0.048);
  ring_assembly.add(right_prong);

  const upper_right_prong = new THREE.Mesh(prongGeom, polishedMat);
  upper_right_prong.position.set(0.32, 0.555, 0.815);
  upper_right_prong.scale.set(0.046, 0.052, 0.044);
  ring_assembly.add(upper_right_prong);

  const lower_right_prong = new THREE.Mesh(prongGeom, polishedMat);
  lower_right_prong.position.set(0.32, -0.355, 0.815);
  lower_right_prong.scale.set(0.046, 0.052, 0.044);
  ring_assembly.add(lower_right_prong);

  ring_assembly.rotation.set(-0.10, 0.18, -0.12);

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