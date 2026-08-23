export default function generate(THREE) {
  const root = new THREE.Group();
  const container = new THREE.Group();
  root.add(container);

  const bodyR = 0.342;
  const openingR = 0.108;

  const green_bodyMat = new THREE.MeshStandardMaterial({
    color: 0x43bf61,
    metalness: 0.0,
    roughness: 0.8,
  });

  const yellow_plasticMat = new THREE.MeshStandardMaterial({
    color: 0xdde313,
    metalness: 0.0,
    roughness: 0.8,
  });

  const inner_wallMat = new THREE.MeshStandardMaterial({
    color: 0x174d2a,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const inner_bottomMat = new THREE.MeshStandardMaterial({
    color: 0x0e2f19,
    metalness: 0.0,
    roughness: 0.8,
    side: THREE.DoubleSide,
  });

  const green_bodyProfile = [
    new THREE.Vector2(0.330, -0.565),
    new THREE.Vector2(0.338, -0.557),
    new THREE.Vector2(bodyR, -0.540),
    new THREE.Vector2(bodyR, 0.535),
    new THREE.Vector2(0.339, 0.552),
    new THREE.Vector2(0.330, 0.560),
  ];
  const green_bodyGeom = new THREE.LatheGeometry(green_bodyProfile, 64);
  const green_body = new THREE.Mesh(green_bodyGeom, green_bodyMat);
  container.add(green_body);

  const yellow_bottom_bandProfile = [
    new THREE.Vector2(0.000, -0.680),
    new THREE.Vector2(0.175, -0.680),
    new THREE.Vector2(0.245, -0.671),
    new THREE.Vector2(0.302, -0.648),
    new THREE.Vector2(0.333, -0.612),
    new THREE.Vector2(0.347, -0.575),
    new THREE.Vector2(0.344, -0.552),
    new THREE.Vector2(0.334, -0.540),
    new THREE.Vector2(0.000, -0.540),
  ];
  const yellow_bottom_bandGeom = new THREE.LatheGeometry(
    yellow_bottom_bandProfile,
    64
  );
  const yellow_bottom_band = new THREE.Mesh(
    yellow_bottom_bandGeom,
    yellow_plasticMat
  );
  container.add(yellow_bottom_band);

  const yellow_top_bandProfile = [
    new THREE.Vector2(0.334, 0.538),
    new THREE.Vector2(0.345, 0.550),
    new THREE.Vector2(0.347, 0.574),
    new THREE.Vector2(0.339, 0.603),
    new THREE.Vector2(0.320, 0.629),
    new THREE.Vector2(0.286, 0.650),
    new THREE.Vector2(0.230, 0.666),
    new THREE.Vector2(0.160, 0.675),
    new THREE.Vector2(0.121, 0.674),
    new THREE.Vector2(0.108, 0.661),
    new THREE.Vector2(0.105, 0.635),
    new THREE.Vector2(0.105, 0.580),
  ];
  const yellow_top_bandGeom = new THREE.LatheGeometry(
    yellow_top_bandProfile,
    64
  );
  const yellow_top_band = new THREE.Mesh(
    yellow_top_bandGeom,
    yellow_plasticMat
  );
  container.add(yellow_top_band);

  const inner_wallGeom = new THREE.CylinderGeometry(
    openingR,
    openingR,
    0.090,
    48,
    1,
    true
  );
  const inner_wall = new THREE.Mesh(inner_wallGeom, inner_wallMat);
  inner_wall.position.y = 0.620;
  container.add(inner_wall);

  const inner_bottomGeom = new THREE.CircleGeometry(openingR * 0.985, 48);
  const inner_bottom = new THREE.Mesh(inner_bottomGeom, inner_bottomMat);
  inner_bottom.rotation.x = -Math.PI / 2;
  inner_bottom.position.y = 0.574;
  container.add(inner_bottom);

  const opening_rimGeom = new THREE.TorusGeometry(
    openingR,
    0.0055,
    10,
    48
  );
  const opening_rim = new THREE.Mesh(opening_rimGeom, inner_wallMat);
  opening_rim.rotation.x = Math.PI / 2;
  opening_rim.position.y = 0.665;
  container.add(opening_rim);

  const textureGeom = new THREE.SphereGeometry(1, 6, 4);
  const greenTextureRows = 28;
  const greenTextureCols = 48;
  const green_surface_texture = new THREE.InstancedMesh(
    textureGeom,
    green_bodyMat,
    greenTextureRows * greenTextureCols
  );
  const green_texture_dummy = new THREE.Object3D();
  const radialNormal = new THREE.Vector3();
  const outwardAxis = new THREE.Vector3(0, 0, 1);
  let greenTextureIndex = 0;

  for (let row = 0; row < greenTextureRows; row++) {
    const y = -0.525 + row * (1.060 / (greenTextureRows - 1));
    for (let col = 0; col < greenTextureCols; col++) {
      const stagger = (row % 2) * Math.PI / greenTextureCols;
      const angle =
        col * (Math.PI * 2 / greenTextureCols) + stagger;
      const size =
        0.0027 + ((row * 7 + col * 3) % 5) * 0.00018;
      radialNormal.set(Math.cos(angle), 0, Math.sin(angle));
      green_texture_dummy.position.set(
        radialNormal.x * (bodyR + 0.0005),
        y,
        radialNormal.z * (bodyR + 0.0005)
      );
      green_texture_dummy.quaternion.setFromUnitVectors(
        outwardAxis,
        radialNormal
      );
      green_texture_dummy.scale.set(size, size * 0.82, 0.0011);
      green_texture_dummy.updateMatrix();
      green_surface_texture.setMatrixAt(
        greenTextureIndex++,
        green_texture_dummy.matrix
      );
    }
  }
  green_surface_texture.instanceMatrix.needsUpdate = true;
  container.add(green_surface_texture);

  const yellowTextureRows = 5;
  const yellowTextureCols = 40;
  const yellow_surface_texture = new THREE.InstancedMesh(
    textureGeom,
    yellow_plasticMat,
    yellowTextureRows * yellowTextureCols * 2
  );
  const yellow_texture_dummy = new THREE.Object3D();
  let yellowTextureIndex = 0;

  for (let row = 0; row < yellowTextureRows; row++) {
    const t = (row + 0.5) / yellowTextureRows;
    const topY = 0.558 + t * 0.094;
    const topRadius = 0.345 + Math.sin(t * Math.PI) * 0.006;
    const bottomY = -0.664 + t * 0.103;
    const bottomRadius = 0.278 + t * 0.067;

    for (let col = 0; col < yellowTextureCols; col++) {
      const stagger = (row % 2) * Math.PI / yellowTextureCols;
      const angle =
        col * (Math.PI * 2 / yellowTextureCols) + stagger;
      const size =
        0.0025 + ((row * 5 + col * 2) % 4) * 0.0002;
      radialNormal.set(Math.cos(angle), 0, Math.sin(angle));

      yellow_texture_dummy.position.set(
        radialNormal.x * (topRadius + 0.0005),
        topY,
        radialNormal.z * (topRadius + 0.0005)
      );
      yellow_texture_dummy.quaternion.setFromUnitVectors(
        outwardAxis,
        radialNormal
      );
      yellow_texture_dummy.scale.set(size, size * 0.82, 0.0010);
      yellow_texture_dummy.updateMatrix();
      yellow_surface_texture.setMatrixAt(
        yellowTextureIndex++,
        yellow_texture_dummy.matrix
      );

      yellow_texture_dummy.position.set(
        radialNormal.x * (bottomRadius + 0.0005),
        bottomY,
        radialNormal.z * (bottomRadius + 0.0005)
      );
      yellow_texture_dummy.updateMatrix();
      yellow_surface_texture.setMatrixAt(
        yellowTextureIndex++,
        yellow_texture_dummy.matrix
      );
    }
  }
  yellow_surface_texture.instanceMatrix.needsUpdate = true;
  container.add(yellow_surface_texture);

  const topTextureRings = 6;
  const topTextureCols = 40;
  const top_surface_texture = new THREE.InstancedMesh(
    textureGeom,
    yellow_plasticMat,
    topTextureRings * topTextureCols
  );
  const top_texture_dummy = new THREE.Object3D();
  const upwardNormal = new THREE.Vector3(0, 1, 0);
  let topTextureIndex = 0;

  for (let ring = 0; ring < topTextureRings; ring++) {
    const radius = 0.126 + ring * 0.031;
    const y = 0.677 - radius * 0.18;
    for (let col = 0; col < topTextureCols; col++) {
      const angle =
        ((col + ring * 0.35) / topTextureCols) * Math.PI * 2;
      const size =
        0.0024 + ((ring * 3 + col * 2) % 4) * 0.00016;
      top_texture_dummy.position.set(
        Math.cos(angle) * radius,
        y + 0.0005,
        Math.sin(angle) * radius
      );
      top_texture_dummy.quaternion.setFromUnitVectors(
        outwardAxis,
        upwardNormal
      );
      top_texture_dummy.scale.set(size, size * 0.82, 0.0010);
      top_texture_dummy.updateMatrix();
      top_surface_texture.setMatrixAt(
        topTextureIndex++,
        top_texture_dummy.matrix
      );
    }
  }
  top_surface_texture.instanceMatrix.needsUpdate = true;
  container.add(top_surface_texture);

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