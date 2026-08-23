export default function generate(THREE) {
  const root = new THREE.Group();
  root.name = "rainbow_glass_orb";

  const orb_group = new THREE.Group();
  orb_group.name = "orb_group";
  root.add(orb_group);

  const vortex_group = new THREE.Group();
  vortex_group.name = "vortex_group";
  orb_group.add(vortex_group);

  const glass_shellMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2f8ff,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.95,
    ior: 1.5,
    transparent: true,
    opacity: 0.48,
    thickness: 0.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    depthWrite: false
  });

  const dark_coreMat = new THREE.MeshStandardMaterial({
    color: 0x060713,
    metalness: 0.0,
    roughness: 0.3
  });

  const vortex_wellMat = new THREE.MeshStandardMaterial({
    color: 0x02030a,
    metalness: 0.0,
    roughness: 0.3,
    side: THREE.DoubleSide
  });

  const shell_reflectionMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.3,
    transparent: true,
    opacity: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  function makeSpiralRibbonMaterial(color) {
    return new THREE.MeshStandardMaterial({
      color,
      metalness: 0.0,
      roughness: 0.3,
      emissive: color,
      emissiveIntensity: 0.45,
      side: THREE.DoubleSide
    });
  }

  const red_spiral_ribbonMat = makeSpiralRibbonMaterial(0xff3b30);
  const orange_spiral_ribbonMat = makeSpiralRibbonMaterial(0xff8b20);
  const yellow_spiral_ribbonMat = makeSpiralRibbonMaterial(0xffe52c);
  const green_spiral_ribbonMat = makeSpiralRibbonMaterial(0x42e56f);
  const cyan_spiral_ribbonMat = makeSpiralRibbonMaterial(0x20e8e6);
  const blue_spiral_ribbonMat = makeSpiralRibbonMaterial(0x2478ff);
  const violet_spiral_ribbonMat = makeSpiralRibbonMaterial(0x7048ff);
  const magenta_spiral_ribbonMat = makeSpiralRibbonMaterial(0xff36d0);

  const dark_coreGeom = new THREE.SphereGeometry(0.455, 64, 32);
  const dark_core = new THREE.Mesh(dark_coreGeom, dark_coreMat);
  dark_core.name = "dark_core";
  dark_core.position.set(0, 0, -0.07);
  dark_core.scale.set(1, 1, 0.78);
  vortex_group.add(dark_core);

  function createSpiralRibbonGeometry(
    phase,
    startRadius,
    endRadius,
    turns,
    innerWidth,
    outerWidth,
    surfaceRadius,
    centerX,
    centerY,
    zOffset
  ) {
    const segments = 128;
    const positions = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const theta = phase + t * turns * Math.PI * 2;
      const radius = startRadius + (endRadius - startRadius) * t;
      const width = innerWidth + (outerWidth - innerWidth) * t;
      const x = centerX + Math.cos(theta) * radius;
      const y = centerY + Math.sin(theta) * radius;

      const beforeT = Math.max(0, t - 1 / segments);
      const afterT = Math.min(1, t + 1 / segments);
      const beforeTheta = phase + beforeT * turns * Math.PI * 2;
      const afterTheta = phase + afterT * turns * Math.PI * 2;
      const beforeRadius = startRadius + (endRadius - startRadius) * beforeT;
      const afterRadius = startRadius + (endRadius - startRadius) * afterT;
      const beforeX = centerX + Math.cos(beforeTheta) * beforeRadius;
      const beforeY = centerY + Math.sin(beforeTheta) * beforeRadius;
      const afterX = centerX + Math.cos(afterTheta) * afterRadius;
      const afterY = centerY + Math.sin(afterTheta) * afterRadius;
      const tangentX = afterX - beforeX;
      const tangentY = afterY - beforeY;
      const tangentLength = Math.sqrt(tangentX * tangentX + tangentY * tangentY) || 1;
      const normalX = -tangentY / tangentLength;
      const normalY = tangentX / tangentLength;

      const halfWidth = width * 0.5;
      const leftX = x + normalX * halfWidth;
      const leftY = y + normalY * halfWidth;
      const rightX = x - normalX * halfWidth;
      const rightY = y - normalY * halfWidth;

      const leftDepth = Math.sqrt(Math.max(
        0.002,
        surfaceRadius * surfaceRadius - leftX * leftX - leftY * leftY
      ));
      const rightDepth = Math.sqrt(Math.max(
        0.002,
        surfaceRadius * surfaceRadius - rightX * rightX - rightY * rightY
      ));

      positions.push(leftX, leftY, leftDepth + zOffset);
      positions.push(rightX, rightY, rightDepth + zOffset);
    }

    for (let i = 0; i < segments; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  const spiral_surface_radius = 0.46;
  const spiral_center_x = 0.025;
  const spiral_center_y = -0.015;
  const spiral_z_offset = 0.13;

  const red_spiral_ribbonGeom = createSpiralRibbonGeometry(
    0.05, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const red_spiral_ribbon = new THREE.Mesh(
    red_spiral_ribbonGeom,
    red_spiral_ribbonMat
  );
  red_spiral_ribbon.name = "red_spiral_ribbon";
  vortex_group.add(red_spiral_ribbon);

  const orange_spiral_ribbonGeom = createSpiralRibbonGeometry(
    0.49, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const orange_spiral_ribbon = new THREE.Mesh(
    orange_spiral_ribbonGeom,
    orange_spiral_ribbonMat
  );
  orange_spiral_ribbon.name = "orange_spiral_ribbon";
  vortex_group.add(orange_spiral_ribbon);

  const yellow_spiral_ribbonGeom = createSpiralRibbonGeometry(
    0.93, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const yellow_spiral_ribbon = new THREE.Mesh(
    yellow_spiral_ribbonGeom,
    yellow_spiral_ribbonMat
  );
  yellow_spiral_ribbon.name = "yellow_spiral_ribbon";
  vortex_group.add(yellow_spiral_ribbon);

  const green_spiral_ribbonGeom = createSpiralRibbonGeometry(
    1.37, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const green_spiral_ribbon = new THREE.Mesh(
    green_spiral_ribbonGeom,
    green_spiral_ribbonMat
  );
  green_spiral_ribbon.name = "green_spiral_ribbon";
  vortex_group.add(green_spiral_ribbon);

  const cyan_spiral_ribbonGeom = createSpiralRibbonGeometry(
    1.81, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const cyan_spiral_ribbon = new THREE.Mesh(
    cyan_spiral_ribbonGeom,
    cyan_spiral_ribbonMat
  );
  cyan_spiral_ribbon.name = "cyan_spiral_ribbon";
  vortex_group.add(cyan_spiral_ribbon);

  const blue_spiral_ribbonGeom = createSpiralRibbonGeometry(
    2.25, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const blue_spiral_ribbon = new THREE.Mesh(
    blue_spiral_ribbonGeom,
    blue_spiral_ribbonMat
  );
  blue_spiral_ribbon.name = "blue_spiral_ribbon";
  vortex_group.add(blue_spiral_ribbon);

  const violet_spiral_ribbonGeom = createSpiralRibbonGeometry(
    2.69, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const violet_spiral_ribbon = new THREE.Mesh(
    violet_spiral_ribbonGeom,
    violet_spiral_ribbonMat
  );
  violet_spiral_ribbon.name = "violet_spiral_ribbon";
  vortex_group.add(violet_spiral_ribbon);

  const magenta_spiral_ribbonGeom = createSpiralRibbonGeometry(
    3.13, 0.008, 0.445, 2.55, 0.009, 0.043,
    spiral_surface_radius, spiral_center_x, spiral_center_y, spiral_z_offset
  );
  const magenta_spiral_ribbon = new THREE.Mesh(
    magenta_spiral_ribbonGeom,
    magenta_spiral_ribbonMat
  );
  magenta_spiral_ribbon.name = "magenta_spiral_ribbon";
  vortex_group.add(magenta_spiral_ribbon);

  const outer_cyan_arcGeom = new THREE.TorusGeometry(
    0.49, 0.021, 10, 112, 4.55
  );
  const outer_cyan_arc = new THREE.Mesh(
    outer_cyan_arcGeom,
    cyan_spiral_ribbonMat
  );
  outer_cyan_arc.name = "outer_cyan_arc";
  outer_cyan_arc.position.set(-0.008, -0.005, 0.08);
  outer_cyan_arc.rotation.z = 0.38;
  vortex_group.add(outer_cyan_arc);

  const outer_yellow_arcGeom = new THREE.TorusGeometry(
    0.525, 0.019, 10, 104, 3.75
  );
  const outer_yellow_arc = new THREE.Mesh(
    outer_yellow_arcGeom,
    yellow_spiral_ribbonMat
  );
  outer_yellow_arc.name = "outer_yellow_arc";
  outer_yellow_arc.position.set(0.006, -0.009, 0.06);
  outer_yellow_arc.rotation.z = -1.35;
  vortex_group.add(outer_yellow_arc);

  const outer_magenta_arcGeom = new THREE.TorusGeometry(
    0.55, 0.017, 10, 96, 3.2
  );
  const outer_magenta_arc = new THREE.Mesh(
    outer_magenta_arcGeom,
    magenta_spiral_ribbonMat
  );
  outer_magenta_arc.name = "outer_magenta_arc";
  outer_magenta_arc.position.set(-0.009, 0.008, 0.025);
  outer_magenta_arc.rotation.z = 2.15;
  vortex_group.add(outer_magenta_arc);

  const outer_orange_arcGeom = new THREE.TorusGeometry(
    0.575, 0.014, 9, 88, 2.65
  );
  const outer_orange_arc = new THREE.Mesh(
    outer_orange_arcGeom,
    orange_spiral_ribbonMat
  );
  outer_orange_arc.name = "outer_orange_arc";
  outer_orange_arc.position.set(0.008, 0.004, -0.015);
  outer_orange_arc.rotation.z = -0.45;
  vortex_group.add(outer_orange_arc);

  const vortex_wellGeom = new THREE.ConeGeometry(0.058, 0.14, 48);
  const vortex_well = new THREE.Mesh(vortex_wellGeom, vortex_wellMat);
  vortex_well.name = "vortex_well";
  vortex_well.rotation.x = Math.PI / 2;
  vortex_well.position.set(
    spiral_center_x,
    spiral_center_y,
    0.265
  );
  vortex_group.add(vortex_well);

  const vortex_rimGeom = new THREE.TorusGeometry(0.058, 0.006, 10, 48);
  const vortex_rim = new THREE.Mesh(vortex_rimGeom, violet_spiral_ribbonMat);
  vortex_rim.name = "vortex_rim";
  vortex_rim.position.set(
    spiral_center_x,
    spiral_center_y,
    0.34
  );
  vortex_group.add(vortex_rim);

  const vortex_pinholeGeom = new THREE.CircleGeometry(0.023, 32);
  const vortex_pinhole = new THREE.Mesh(vortex_pinholeGeom, vortex_wellMat);
  vortex_pinhole.name = "vortex_pinhole";
  vortex_pinhole.position.set(
    spiral_center_x,
    spiral_center_y,
    0.342
  );
  vortex_group.add(vortex_pinhole);

  const shell_reflectionGeom = new THREE.SphereGeometry(
    0.606,
    48,
    24,
    0.08,
    1.30,
    0.48,
    1.58
  );
  const shell_reflection = new THREE.Mesh(
    shell_reflectionGeom,
    shell_reflectionMat
  );
  shell_reflection.name = "shell_reflection";
  shell_reflection.renderOrder = 3;
  orb_group.add(shell_reflection);

  const glass_shellGeom = new THREE.SphereGeometry(0.62, 64, 32);
  const glass_shell = new THREE.Mesh(glass_shellGeom, glass_shellMat);
  glass_shell.name = "glass_shell";
  glass_shell.renderOrder = 4;
  orb_group.add(glass_shell);

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