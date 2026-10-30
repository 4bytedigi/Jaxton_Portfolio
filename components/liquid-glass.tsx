'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const vertexSource = `
attribute vec2 aPosition;
uniform float uTime;
uniform float uAspect;
uniform vec2 uPointer;
uniform float uEnergy;
uniform float uLayer;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vEdge;
vec3 surface(vec2 uv) {
  float x = uv.x * 8.5;
  float phase = uLayer * 1.7;
  float t = uTime * .22;
  float center = sin(x * .42 + t + phase) * .65;
  float twist = sin(x * .25 + t * .6 + phase) * 1.25 + .35;
  float width = (1.3 + .22 * sin(x * .55 - t + phase)) * (uLayer < .5 ? 1.0 : .68);
  float y = center + uv.y * cos(twist) * width;
  float z = uv.y * sin(twist) * width + cos(x * .38 + t + phase) * .55 + (1.0 - uv.y * uv.y) * .32;
  vec2 pointer = vec2(uPointer.x * 8.5, uPointer.y * 3.5);
  float d = length(vec2(x, y) - pointer);
  float influence = exp(-d * d * .34) * uEnergy;
  y += influence * (.65 + sin(d * 4.0 - uTime * 2.5) * .14);
  z += influence * .8;
  y += uLayer == 1.0 ? .55 : (uLayer == 2.0 ? -.7 : 0.0);
  return vec3(x, y, z - uLayer * .7);
}
void main() {
  vec3 p = surface(aPosition);
  vec3 dx = surface(aPosition + vec2(.001, 0.0)) - p;
  vec3 dy = surface(aPosition + vec2(0.0, .001)) - p;
  vNormal = normalize(cross(dx, dy));
  vPosition = p;
  vEdge = aPosition.y;
  float perspective = 1.0 / (1.0 - p.z * .065);
  gl_Position = vec4(p.x / 8.5 * perspective, p.y / 3.5 * perspective, -p.z * .04, 1.0);
}`;

const fragmentSource = `
precision mediump float;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vEdge;
uniform float uTime;
uniform float uLayer;
void main() {
  vec3 n = normalize(vNormal);
  if (!gl_FrontFacing) n = -n;
  vec3 view = normalize(vec3(0.0, .2, 8.0) - vPosition * .12);
  vec3 r = reflect(-view, n);
  float fresnel = pow(1.0 - abs(dot(n, view)), 2.6);
  float strip = pow(max(0.0, 1.0 - abs(r.y * .72 + r.z * .38 - .18) * 3.2), 5.0);
  float cobalt = pow(max(0.0, 1.0 - abs(r.y + .38) * 2.2), 5.0);
  float white = pow(max(0.0, dot(r, normalize(vec3(-.25, .9, .65)))), 45.0);
  float rim = pow(abs(vEdge), 30.0);
  vec3 color = vec3(.009, .023, .075);
  float skylight = pow(max(0.0, 1.0 - abs(r.y - .6) * 1.6), 4.0);
  color += vec3(.01, .22, .62) * skylight * .65;
  color += vec3(.01, .055, .55) * cobalt * 1.3;
  color += vec3(.025, .48, .95) * strip * 1.5;
  color += vec3(.12, .28, .7) * fresnel * .65;
  color += vec3(.48, .8, 1.0) * white * 1.4;
  color += vec3(.15, .39, .95) * rim * (.22 + fresnel);
  float edgeLight = pow(max(0.0, 1.0 - abs(vEdge + .92) * 25.0), 2.0);
  color += vec3(.33, .64, 1.0) * edgeLight * .6;
  color = pow(color, vec3(.85));
  gl_FragColor = vec4(color, .97);
}`;

/** A lightweight web approximation of reflective glass; no assets or 3D library required. */
export function LiquidGlass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
    if (!gl) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const vertices: number[] = [];
    const segments = 220, rows = 20;
    for (let x = 0; x < segments; x++) {
      for (let y = 0; y < rows; y++) {
        const x0 = x / segments * 2 - 1, x1 = (x + 1) / segments * 2 - 1;
        const y0 = y / rows * 2 - 1, y1 = (y + 1) / rows * 2 - 1;
        vertices.push(x0,y0,x1,y0,x0,y1,x0,y1,x1,y0,x1,y1);
      }
    }
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(['uTime','uAspect','uPointer','uEnergy','uLayer'].map(name => [name, gl.getUniformLocation(program, name)]));
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    let frame = 0, elapsed = 3, previous = 0, visible = true, dirty = true, lost = false;
    let px = 0, py = 0, tx = 0, ty = 0, energy = 0, targetEnergy = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      dirty = true;
    };
    const pointer = (event: PointerEvent) => {
      if (media.matches || pausedRef.current) return;
      const rect = canvas.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      ty = 1 - (event.clientY - rect.top) / rect.height * 2;
      targetEnergy = event.clientY > rect.top - 150 && event.clientY < rect.bottom ? 1 : 0;
    };
    const leave = () => { targetEnergy = 0; };
    const draw = (now: number) => {
      const dt = Math.min((now - previous) / 1000, .05);
      previous = now;
      const moving = !media.matches && !pausedRef.current;
      if (visible && !document.hidden && !lost && (moving || dirty || canvas.dataset.motion !== 'paused')) {
        if (moving) {
          elapsed += dt;
          px += (tx - px) * .065;
          py += (ty - py) * .065;
          energy += (targetEnergy - energy) * .045;
        }
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.uniform1f(uniforms.uTime, elapsed);
        gl.uniform1f(uniforms.uAspect, canvas.width / canvas.height);
        gl.uniform2f(uniforms.uPointer, px, py);
        gl.uniform1f(uniforms.uEnergy, energy);
        for (let layer = 2; layer >= 0; layer--) {
          gl.uniform1f(uniforms.uLayer, layer);
          gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
        }
        canvas.dataset.motion = moving ? 'running' : 'paused';
        canvas.dataset.phase = elapsed.toFixed(2);
        canvas.dataset.pointer = `${px.toFixed(2)},${py.toFixed(2)}`;
        dirty = false;
      }
      frame = requestAnimationFrame(draw);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersection.observe(canvas);
    window.addEventListener('pointermove', pointer, { passive: true });
    window.addEventListener('pointerdown', pointer, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    const contextLost = () => { lost = true; canvas.dataset.renderer = 'fallback'; };
    canvas.addEventListener('webglcontextlost', contextLost);
    canvas.dataset.renderer = 'webgl';
    resize();
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('webglcontextlost', contextLost);
      observer.disconnect(); intersection.disconnect();
      window.removeEventListener('pointermove', pointer);
      window.removeEventListener('pointerdown', pointer);
      document.documentElement.removeEventListener('pointerleave', leave);
      gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment);
    };
  }, []);

  return <div className="liquid-stage">
    <div className="liquid-fallback" aria-hidden="true"><i/><i/></div>
    <canvas ref={canvasRef} className="liquid-canvas" aria-hidden="true" />
    <div className="liquid-caption"><button type="button" aria-label={paused ? 'Play background animation' : 'Pause background animation'} aria-pressed={paused} onClick={() => { pausedRef.current = !paused; setPaused(!paused); }}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button></div>
  </div>;
}
