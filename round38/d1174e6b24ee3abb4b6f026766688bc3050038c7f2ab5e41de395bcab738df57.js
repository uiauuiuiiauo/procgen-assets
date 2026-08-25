export default function generate(THREE) {
  const root = new THREE.Group();
  const glass_group = new THREE.Group();
  const wine_group = new THREE.Group();
  root.add(glass_group, wine_group);

  const bowlMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const stemMat = bowlMat;
  const baseMat = bowlMat;

  const wineMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3d982,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.55,
    ior: 1.33,
    transparent: true,
    opacity: 0.84,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const wine_surfaceMat = new THREE.MeshPhysicalMaterial({
    color: 0xf3d982,
    metalness: 0.0,
    roughness: 0.08,
    transmission: 0.45,
    ior: 1.33,
    transparent: true,
    opacity: 0.62,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const wine_meniscusMat = new THREE.MeshStandardMaterial({
    color: 0xd6a52b,
    metalness: 0.0,
    roughness: 0.4,
    transparent: true,
    opacity: 0.72
  });

  const outerCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.055, 0.900),
    new THREE.Vector2(0.110, 0.960),
    new THREE.Vector2(0.250, 1.080),
    new THREE.Vector2(0.380, 1.300),
    new THREE.Vector2(0.445, 1.570),
    new THREE.Vector2(0.455, 1.780),
    new THREE.Vector2(0.425, 2.050),
    new THREE.Vector2(0.340, 2.310)
  ]);

  const innerCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.045, 0.918),
    new THREE.Vector2(0.100, 0.978),
    new THREE.Vector2(0.238, 1.100),
    new THREE.Vector2(0.365, 1.310),
    new THREE.Vector2(0.430, 1.580),
    new THREE.Vector2(0.440, 1.780),
    new THREE.Vector2(0.410, 2.030),
    new THREE.Vector2(0.320, 2.285)
  ]);

  const outerPoints = outerCurve.getSpacedPoints(42);
  const innerPoints = innerCurve.getSpacedPoints(42).reverse();
  const bowlProfile = outerPoints.concat(innerPoints);
  bowlProfile.push(new THREE.Vector2(outerPoints[0].x, outerPoints[0].y));

  const bowlGeom = new THREE.LatheGeometry(bowlProfile, 64);
  const bowl = new THREE.Mesh(bowlGeom, bowlMat);
  bowl.renderOrder = 3;
  glass_group.add(bowl);

  const rimGeom = new THREE.TorusGeometry(0.331, 0.009, 10, 64);
  const rimMat = bowlMat;
  const rim = new THREE.Mesh(rimGeom, rimMat);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.301;
  rim.renderOrder = 4;
  glass_group.add(rim);

  const stemProfile = [
    new THREE.Vector2(0.000, 0.075),
    new THREE.Vector2(0.080, 0.082),
    new THREE.Vector2(0.065, 0.125),
    new THREE.Vector2(0.043, 0.185),
    new THREE.Vector2(0.032, 0.330),
    new THREE.Vector2(0.028, 0.650),
    new THREE.Vector2(0.030, 0.800),
    new THREE.Vector2(0.045, 0.885),
    new THREE.Vector2(0.075, 0.940),
    new THREE.Vector2(0.000, 0.952)
  ];
  const stemGeom = new THREE.LatheGeometry(stemProfile, 48);
  const stem = new THREE.Mesh(stemGeom, stemMat);
  stem.renderOrder = 3;
  glass_group.add(stem);

  const baseProfile = [
    new THREE.Vector2(0.000, 0.014),
    new THREE.Vector2(0.220, 0.014),
    new THREE.Vector2(0.360, 0.018),
    new THREE.Vector2(0.410, 0.028),
    new THREE.Vector2(0.405, 0.041),
    new THREE.Vector2(0.340, 0.050),
    new THREE.Vector2(0.180, 0.060),
    new THREE.Vector2(0.080, 0.078),
    new THREE.Vector2(0.000, 0.082)
  ];
  const baseGeom = new THREE.LatheGeometry(baseProfile, 64);
  const base = new THREE.Mesh(baseGeom, baseMat);
  base.renderOrder = 3;
  glass_group.add(base);

  const base_rimGeom = new THREE.TorusGeometry(0.393, 0.008, 10, 64);
  const base_rimMat = bowlMat;
  const base_rim = new THREE.Mesh(base_rimGeom, base_rimMat);
  base_rim.rotation.x = Math.PI / 2;
  base_rim.position.y = 0.030;
  base_rim.renderOrder = 4;
  glass_group.add(base_rim);

  const base_buttonGeom = new THREE.TorusGeometry(0.061, 0.006, 8, 40);
  const base_buttonMat = bowlMat;
  const base_button = new THREE.Mesh(base_buttonGeom, base_buttonMat);
  base_button.rotation.x = Math.PI / 2;
  base_button.position.y = 0.070;
  base_button.renderOrder = 4;
  glass_group.add(base_button);

  const wineCurve = new THREE.SplineCurve([
    new THREE.Vector2(0.047, 0.924),
    new THREE.Vector2(0.103, 0.980),
    new THREE.Vector2(0.238, 1.105),
    new THREE.Vector2(0.360, 1.310),
    new THREE.Vector2(0.421, 1.535)
  ]);
  const wineSidePoints = wineCurve.getSpacedPoints(32);
  const wineProfile = [new THREE.Vector2(0.000, 0.924)];
  for (const point of wineSidePoints) {
    wineProfile.push(new THREE.Vector2(point.x, point.y));
  }
  wineProfile.push(new THREE.Vector2(0.000, 1.535));

  const wineGeom = new THREE.LatheGeometry(wineProfile, 64);
  const wine = new THREE.Mesh(wineGeom, wineMat);
  wine.renderOrder = 1;
  wine_group.add(wine);

  const wine_surfaceGeom = new THREE.CylinderGeometry(0.421, 0.421, 0.006, 64);
  const wine_surface = new THREE.Mesh(wine_surfaceGeom, wine_surfaceMat);
  wine_surface.position.y = 1.539;
  wine_surface.renderOrder = 2;
  wine_group.add(wine_surface);

  const wine_meniscusGeom = new THREE.TorusGeometry(0.416, 0.007, 10, 64);
  const wine_meniscus = new THREE.Mesh(wine_meniscusGeom, wine_meniscusMat);
  wine_meniscus.rotation.x = Math.PI / 2;
  wine_meniscus.position.y = 1.543;
  wine_meniscus.renderOrder = 2;
  wine_group.add(wine_meniscus);

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