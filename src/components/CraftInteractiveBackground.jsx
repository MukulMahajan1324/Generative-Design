import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FLORA_GREEN = [
  '/flowers/green/abstract_flora_1_green.avif',
  '/flowers/green/abstract_flora_2_green.avif',
  '/flowers/green/abstract_flora_3_green.avif',
  '/flowers/green/abstract_flora_4_green.avif',
  '/flowers/green/abstract_flora_5_green.avif',
  '/flowers/green/abstract_flora_6_green.avif',
  '/flowers/green/abstract_flora_7_green.avif',
];

const FLORA_GREENBLUE = [
  '/flowers/greenblue/abstract_flora_1_greenblue.avif',
  '/flowers/greenblue/abstract_flora_2_greenblue.avif',
  '/flowers/greenblue/abstract_flora_3_greenblue.avif',
  '/flowers/greenblue/abstract_flora_4_greenblue.avif',
  '/flowers/greenblue/abstract_flora_5_greenblue.avif',
  '/flowers/greenblue/abstract_flora_6_greenblue.avif',
  '/flowers/greenblue/abstract_flora_7_greenblue.avif',
];

export const DEFAULT_SHADER_CONFIG = {
  // Aperture & Blur
  apertureRadius: 0.10,       // Base radius of mouse aperture (0.02 to 0.35)
  apertureSoftness: 0.26,     // Feathering / blur of the aperture edge (0.05 to 0.60)
  velocitySensitivity: 2.5,   // Speed scaling multiplier (0.0 to 5.0)
  lerpSpeed: 5.0,             // Mouse inertia / tracking smoothness (1.0 to 15.0)
  
  // Motion & Speed
  revealDuration: 4.5,        // Seconds for a flower to fully open (1.0 to 10.0)
  fadeDuration: 4.5,          // Seconds for a flower to fade out (1.0 to 8.0)
  spawnInterval: 1.8,         // Seconds between new flower sprouts (0.5 to 5.0)
  rotationSpeed: 0.08,        // Continuous ambient rotation (0.0 to 0.6)
  
  // Scale & Viewport Geometry
  bloomScale: 1.35,           // Scale multiplier relative to viewport (0.6 to 2.5)
  
  // Color & Lighting
  bgColor: '#19231f',         // Background moss color
  contrast: 1.0,              // Layer contrast (0.7 to 1.5)
};

// High-resolution procedural botanical flora generator
function createProceduralFloraTexture(palette = 'green', seed = 0) {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;

  const numPetals = 8 + (seed % 5);
  const baseRadius = 320 + (seed % 4) * 30;

  ctx.clearRect(0, 0, size, size);

  const colors = palette === 'green'
    ? [
        'rgba(46, 125, 80, 0.9)',
        'rgba(27, 94, 52, 0.95)',
        'rgba(74, 158, 107, 0.85)',
        'rgba(18, 55, 34, 0.98)',
        'rgba(110, 195, 140, 0.8)',
      ]
    : [
        'rgba(163, 230, 53, 0.95)',
        'rgba(74, 222, 128, 0.9)',
        'rgba(34, 211, 238, 0.9)',
        'rgba(52, 211, 153, 0.95)',
        'rgba(217, 249, 157, 0.85)',
      ];

  // Draw 4 layers of organic petals
  for (let layer = 0; layer < 4; layer++) {
    const layerRadius = baseRadius * (1 - layer * 0.18);
    const layerOffset = (layer * Math.PI) / numPetals;

    for (let i = 0; i < numPetals; i++) {
      const angle = (i * 2 * Math.PI) / numPetals + layerOffset;
      const nextAngle = ((i + 1) * 2 * Math.PI) / numPetals + layerOffset;
      const midAngle = (angle + nextAngle) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);

      const tipX = cx + Math.cos(midAngle) * layerRadius;
      const tipY = cy + Math.sin(midAngle) * layerRadius;
      const ctrl1X = cx + Math.cos(angle) * (layerRadius * 0.72);
      const ctrl1Y = cy + Math.sin(angle) * (layerRadius * 0.72);
      const ctrl2X = cx + Math.cos(nextAngle) * (layerRadius * 0.72);
      const ctrl2Y = cy + Math.sin(nextAngle) * (layerRadius * 0.72);

      ctx.quadraticCurveTo(ctrl1X, ctrl1Y, tipX, tipY);
      ctx.quadraticCurveTo(ctrl2X, ctrl2Y, cx, cy);
      ctx.closePath();

      const grad = ctx.createRadialGradient(cx, cy, 20, tipX, tipY, layerRadius);
      grad.addColorStop(0, colors[layer % colors.length]);
      grad.addColorStop(0.7, colors[(layer + 1) % colors.length]);
      grad.addColorStop(1, colors[(layer + 3) % colors.length]);

      ctx.fillStyle = grad;
      ctx.fill();

      // Translucent interior petal rib vein
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(tipX, tipY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    }
  }

  // Botanical core
  const centerGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 90);
  if (palette === 'green') {
    centerGrad.addColorStop(0, '#0d2217');
    centerGrad.addColorStop(0.7, '#1b3b29');
    centerGrad.addColorStop(1, 'rgba(13, 34, 23, 0)');
  } else {
    centerGrad.addColorStop(0, '#fef08a');
    centerGrad.addColorStop(0.6, '#a3e635');
    centerGrad.addColorStop(1, 'rgba(163, 230, 53, 0)');
  }
  ctx.beginPath();
  ctx.arc(cx, cy, 90, 0, Math.PI * 2);
  ctx.fillStyle = centerGrad;
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

// Single flower bloom vertex shader
const FLOWER_VS = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Single flower bloom fragment shader with soft circular reveal & fade out
const FLOWER_FS = `
precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uRevealProgress;
uniform float uFadeOutProgress;

varying vec2 vUv;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);

  // Maximum radius covering the quad diagonal
  float maxRadius = 0.707106;
  float revealCircleRadius = uRevealProgress * maxRadius;

  vec2 center = vec2(0.5, 0.5);
  float centerDist = distance(vUv, center);

  float softness = 0.22;
  float revealAlpha = 1.0 - smoothstep(revealCircleRadius - softness, revealCircleRadius, centerDist);

  float fadeOutRadius = uFadeOutProgress * maxRadius;
  float fadeOutMask = smoothstep(fadeOutRadius - softness, fadeOutRadius, centerDist);

  float finalAlpha = revealAlpha * fadeOutMask;
  vec3 finalColor = mix(vec3(0.0, 0.0, 0.0), textureColor.rgb, fadeOutMask);

  gl_FragColor = vec4(finalColor, textureColor.a * finalAlpha);
}
`;

// Screen compositor vertex shader
const COMPOSITOR_VS = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Screen compositor fragment shader blending Green and GreenBlue layers with customizable aperture parameters
const COMPOSITOR_FS = `
precision mediump float;

uniform sampler2D uFlowersTexture;
uniform sampler2D uLimeFlowersTexture;
uniform vec2 uResolution;
uniform vec4 uMouse; // (x, y, z, velocity)
uniform float uApertureRadius;
uniform float uApertureSoftness;
uniform float uVelocitySensitivity;
uniform float uContrast;

varying vec2 vUv;

float softCircle(vec2 uv, vec2 center, float radius, float softness, float aspect) {
  vec2 aspectUv = vec2(uv.x * aspect, uv.y);
  vec2 aspectCenter = vec2(center.x * aspect, center.y);
  float dist = distance(aspectUv, aspectCenter);
  return 1.0 - smoothstep(radius, radius + softness, dist);
}

void main() {
  vec4 greenTexture = texture2D(uFlowersTexture, vUv);
  vec4 limeTexture = texture2D(uLimeFlowersTexture, vUv);

  float aspect = uResolution.x / uResolution.y;
  vec2 mouseUv = uMouse.xy / uResolution;

  float velocity = uMouse.w;
  float normalizedVelocity = clamp(velocity / 1000.0, 0.0, 1.0);
  float smoothVelocity = smoothstep(0.0, 1.0, normalizedVelocity);
  float velocityScale = 1.0 + smoothVelocity * uVelocitySensitivity;

  float circleRadius = uApertureRadius * velocityScale;
  float circleSoftness = uApertureSoftness * velocityScale;
  float circleMask = softCircle(vUv, mouseUv, circleRadius, circleSoftness, aspect);
  circleMask = clamp(circleMask, 0.0, 1.0);

  // Optional contrast tuning
  if (uContrast != 1.0) {
    greenTexture.rgb = pow(greenTexture.rgb, vec3(1.0 / uContrast));
    limeTexture.rgb = pow(limeTexture.rgb, vec3(1.0 / uContrast));
  }

  vec3 finalColor = mix(greenTexture.rgb, limeTexture.rgb, circleMask);
  float finalAlpha = mix(greenTexture.a, limeTexture.a, circleMask);

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

export default function CraftInteractiveBackground({ 
  className = "",
  config = DEFAULT_SHADER_CONFIG
}) {
  const containerRef = useRef(null);
  const configRef = useRef(config);

  // Keep configRef current without tearing down the WebGL scene
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(configRef.current.bgColor), 1);
    container.appendChild(renderer.domElement);

    // 2. Camera Setup (Orthographic)
    const frustumSize = 100;
    let aspect = width / height;

    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    const screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // 3. Offscreen Render Targets
    const targetOptions = {
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };
    const greenRenderTarget = new THREE.WebGLRenderTarget(width, height, targetOptions);
    const limeRenderTarget = new THREE.WebGLRenderTarget(width, height, targetOptions);

    // 4. Preload Textures (Instant Procedural + AVIF Updates)
    const greenTextures = Array.from({ length: 7 }, (_, i) => createProceduralFloraTexture('green', i));
    const limeTextures = Array.from({ length: 7 }, (_, i) => createProceduralFloraTexture('greenblue', i));

    const textureLoader = new THREE.TextureLoader();

    FLORA_GREEN.forEach((path, idx) => {
      textureLoader.load(
        path,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          greenTextures[idx] = tex;
        },
        undefined,
        () => {}
      );
    });

    FLORA_GREENBLUE.forEach((path, idx) => {
      textureLoader.load(
        path,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          limeTextures[idx] = tex;
        },
        undefined,
        () => {}
      );
    });

    // 5. Flower Sub-Scenes & Mesh Geometry
    const greenScene = new THREE.Scene();
    const limeScene = new THREE.Scene();

    // Sizing to completely cover the entire viewport
    const viewportDim = Math.max(frustumSize * aspect, frustumSize);
    const fullViewportSize = viewportDim * configRef.current.bloomScale;
    const mediumSize = viewportDim * (configRef.current.bloomScale * 0.65);

    const fullQuadGeometry = new THREE.PlaneGeometry(fullViewportSize, fullViewportSize);
    const mediumQuadGeometry = new THREE.PlaneGeometry(mediumSize, mediumSize);

    const SLOTS_COUNT = 7;
    const slots = [];

    for (let i = 0; i < SLOTS_COUNT; i++) {
      const isGiant = i === 0 || i === 3;
      const geom = isGiant ? fullQuadGeometry : mediumQuadGeometry;

      const greenMaterial = new THREE.ShaderMaterial({
        vertexShader: FLOWER_VS,
        fragmentShader: FLOWER_FS,
        uniforms: {
          uTexture: { value: greenTextures[i % greenTextures.length] },
          uResolution: { value: new THREE.Vector2(fullViewportSize, fullViewportSize) },
          uRevealProgress: { value: 0 },
          uFadeOutProgress: { value: 0 },
        },
        transparent: true,
      });

      const limeMaterial = new THREE.ShaderMaterial({
        vertexShader: FLOWER_VS,
        fragmentShader: FLOWER_FS,
        uniforms: {
          uTexture: { value: limeTextures[i % limeTextures.length] },
          uResolution: { value: new THREE.Vector2(fullViewportSize, fullViewportSize) },
          uRevealProgress: { value: 0 },
          uFadeOutProgress: { value: 0 },
        },
        transparent: true,
      });

      const greenMesh = new THREE.Mesh(geom, greenMaterial);
      const limeMesh = new THREE.Mesh(geom, limeMaterial);
      greenMesh.visible = false;
      limeMesh.visible = false;

      greenScene.add(greenMesh);
      limeScene.add(limeMesh);

      slots.push({
        slotIndex: i,
        isGiant,
        active: false,
        greenMesh,
        limeMesh,
        greenMaterial,
        limeMaterial,
        elapsed: 0,
        revealDur: 4.5,
        fadeDur: 4.5,
      });
    }

    // Function to sprout/bloom flowers across the entire viewport
    const spawnFlower = (slot, initialPosition = null) => {
      const count = Math.min(greenTextures.length, limeTextures.length);
      const randomIndex = Math.floor(Math.random() * count);

      const gTex = greenTextures[randomIndex];
      const lTex = limeTextures[randomIndex];

      let posX = 0;
      let posY = 0;

      if (initialPosition) {
        posX = initialPosition.x;
        posY = initialPosition.y;
      } else if (slot.isGiant) {
        posX = (Math.random() - 0.5) * 15;
        posY = (Math.random() - 0.5) * 15;
      } else {
        const halfW = (frustumSize * aspect) * 0.42;
        const halfH = frustumSize * 0.42;
        posX = (Math.random() - 0.5) * 2 * halfW;
        posY = (Math.random() - 0.5) * 2 * halfH;
      }

      const rotation = Math.random() * Math.PI * 2;

      slot.greenMesh.position.set(posX, posY, 0);
      slot.limeMesh.position.set(posX, posY, 0);

      slot.greenMesh.rotation.z = rotation;
      slot.limeMesh.rotation.z = rotation;

      slot.greenMaterial.uniforms.uTexture.value = gTex;
      slot.limeMaterial.uniforms.uTexture.value = lTex;

      slot.greenMaterial.uniforms.uRevealProgress.value = 0;
      slot.limeMaterial.uniforms.uRevealProgress.value = 0;
      slot.greenMaterial.uniforms.uFadeOutProgress.value = 0;
      slot.limeMaterial.uniforms.uFadeOutProgress.value = 0;

      // Update scale dynamically based on config
      const curScale = configRef.current.bloomScale / 1.35;
      slot.greenMesh.scale.set(curScale, curScale, 1);
      slot.limeMesh.scale.set(curScale, curScale, 1);

      slot.greenMesh.visible = true;
      slot.limeMesh.visible = true;

      slot.active = true;
      slot.elapsed = 0;
      slot.revealDur = configRef.current.revealDuration * (slot.isGiant ? 1.15 : 0.95);
      slot.fadeDur = configRef.current.fadeDuration;
    };

    // 6. Compositor Scene & Screen Quad
    const compositorScene = new THREE.Scene();
    const compositorMaterial = new THREE.ShaderMaterial({
      vertexShader: COMPOSITOR_VS,
      fragmentShader: COMPOSITOR_FS,
      uniforms: {
        uFlowersTexture: { value: greenRenderTarget.texture },
        uLimeFlowersTexture: { value: limeRenderTarget.texture },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: new THREE.Vector4(width * 0.5, height * 0.5, 1.0, 0.0) },
        uApertureRadius: { value: configRef.current.apertureRadius },
        uApertureSoftness: { value: configRef.current.apertureSoftness },
        uVelocitySensitivity: { value: configRef.current.velocitySensitivity },
        uContrast: { value: configRef.current.contrast },
      },
      transparent: true,
    });
    const quadMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), compositorMaterial);
    compositorScene.add(quadMesh);

    // 7. Mouse / Touch Tracking & Inertia
    const mouseTarget = new THREE.Vector2(width * 0.5, height * 0.5);
    const mouseSmooth = new THREE.Vector2(width * 0.5, height * 0.5);
    let smoothedVelocity = 0;
    let lastTime = performance.now();

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = height - (e.clientY - rect.top);
      mouseTarget.set(clientX, clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const clientX = touch.clientX - rect.left;
        const clientY = height - (touch.clientY - rect.top);
        mouseTarget.set(clientX, clientY);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Initial Sprout: Slot 0 covers the center immediately
    spawnFlower(slots[0], { x: 0, y: 0 });
    setTimeout(() => spawnFlower(slots[1], { x: -25, y: 15 }), 300);
    setTimeout(() => spawnFlower(slots[2], { x: 25, y: -15 }), 800);

    // 8. Animation Render Loop
    let animationFrameId;
    let spawnTimer = 0;

    const animate = (now) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const cfg = configRef.current;

      // Update clear color dynamically if changed
      renderer.setClearColor(new THREE.Color(cfg.bgColor), 1);

      // Mouse inertia physics using dynamic lerpSpeed
      const factor = 1.0 - Math.exp(-cfg.lerpSpeed * dt);
      const deltaX = (mouseTarget.x - mouseSmooth.x) * factor;
      const deltaY = (mouseTarget.y - mouseSmooth.y) * factor;

      mouseSmooth.x += deltaX;
      mouseSmooth.y += deltaY;

      const instantSpeed = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / (dt || 0.016);
      const velFactor = 1.0 - Math.exp(-cfg.lerpSpeed * 0.3 * dt);
      smoothedVelocity += (instantSpeed - smoothedVelocity) * velFactor;

      // Update compositor uniforms in real-time
      compositorMaterial.uniforms.uMouse.value.set(
        mouseSmooth.x,
        mouseSmooth.y,
        1.0,
        smoothedVelocity
      );
      compositorMaterial.uniforms.uApertureRadius.value = cfg.apertureRadius;
      compositorMaterial.uniforms.uApertureSoftness.value = cfg.apertureSoftness;
      compositorMaterial.uniforms.uVelocitySensitivity.value = cfg.velocitySensitivity;
      compositorMaterial.uniforms.uContrast.value = cfg.contrast;

      // Continuous spawning using dynamic spawnInterval
      spawnTimer += dt;
      if (spawnTimer >= cfg.spawnInterval) {
        spawnTimer = 0;
        const freeSlot = slots.find((s) => !s.active);
        if (freeSlot) spawnFlower(freeSlot);
      }

      slots.forEach((slot) => {
        if (!slot.active) return;
        slot.elapsed += dt;

        // Ambient rotation
        if (cfg.rotationSpeed > 0) {
          slot.greenMesh.rotation.z += cfg.rotationSpeed * dt;
          slot.limeMesh.rotation.z += cfg.rotationSpeed * dt;
        }

        // Reveal phase
        const reveal = Math.min(slot.elapsed / slot.revealDur, 1.0);
        slot.greenMaterial.uniforms.uRevealProgress.value = reveal;
        slot.limeMaterial.uniforms.uRevealProgress.value = reveal;

        // Fade out phase
        const totalLife = slot.revealDur + slot.fadeDur;
        const fadeStart = slot.revealDur * 0.85;
        if (slot.elapsed > fadeStart) {
          const fade = Math.min((slot.elapsed - fadeStart) / (totalLife - fadeStart), 1.0);
          slot.greenMaterial.uniforms.uFadeOutProgress.value = fade;
          slot.limeMaterial.uniforms.uFadeOutProgress.value = fade;
        }

        if (slot.elapsed >= totalLife) {
          slot.active = false;
          slot.greenMesh.visible = false;
          slot.limeMesh.visible = false;
        }
      });

      // Render Green Layer
      renderer.setRenderTarget(greenRenderTarget);
      renderer.clear();
      renderer.render(greenScene, camera);

      // Render Lime Layer
      renderer.setRenderTarget(limeRenderTarget);
      renderer.clear();
      renderer.render(limeScene, camera);

      // Render Final Compositor
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(compositorScene, screenCamera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      aspect = width / height;
      camera.left = (-frustumSize * aspect) / 2;
      camera.right = (frustumSize * aspect) / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      greenRenderTarget.setSize(width, height);
      limeRenderTarget.setSize(width, height);

      compositorMaterial.uniforms.uResolution.value.set(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      greenRenderTarget.dispose();
      limeRenderTarget.dispose();
      fullQuadGeometry.dispose();
      mediumQuadGeometry.dispose();
      quadMesh.geometry.dispose();
      compositorMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full overflow-hidden select-none touch-none ${className}`}
    />
  );
}
