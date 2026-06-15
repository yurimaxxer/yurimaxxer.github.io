"use client";

import { useEffect, useRef } from 'react';

interface StarfieldShaderProps {
  density?: number;
  speed?: number;
  size?: number;
  className?: string;
}

const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// Direct port of the Godot fragment shader
const FRAGMENT_SRC = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform float density;
uniform float speed;
uniform float size;

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 grid = floor(uv * density);
    vec2 local = fract(uv * density) - 0.5;
    float r = rand(grid);
    float star_mask = step(0.97, r);
    float diamond = 1.0 - (abs(local.x) + abs(local.y)) / size;
    diamond = clamp(diamond, 0.0, 1.0);
    float flicker = sin(u_time * speed + r * 1000.0);
    flicker = flicker * 0.5 + 0.5;
    float brightness = diamond * star_mask * flicker;
    gl_FragColor = vec4(vec3(brightness), brightness);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

/**
 * Fullscreen animated starfield, ported from a Godot canvas_item shader.
 * Renders behind page content by default (position: fixed, z-index: -1).
 *
 * Usage:
 *   <StarfieldShader density={80} speed={2} size={0.25} />
 */
export default function StarfieldShader({
  density = 100,
  speed = 2,
  size = 0.12,
  className,
}: StarfieldShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true });
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const program = gl.createProgram();
    if (!program) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const densityLoc = gl.getUniformLocation(program, 'density');
    const speedLoc = gl.getUniformLocation(program, 'speed');
    const sizeLoc = gl.getUniformLocation(program, 'size');

    let animationFrameId: number;
    const startTime = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = Math.round(canvas.clientWidth * dpr);
      const displayHeight = Math.round(canvas.clientHeight * dpr);
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    const render = () => {
      resize();
      const elapsed = (performance.now() - startTime) / 1000;
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(densityLoc, density);
      gl.uniform1f(speedLoc, speed);
      gl.uniform1f(sizeLoc, size);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(buffer);
    };
  }, [density, speed, size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
      }}
    />
  );
}