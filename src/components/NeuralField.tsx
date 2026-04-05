import React, { useEffect, useRef } from 'react';

interface NeuralFieldProps {
  isActive: boolean;
}

export const NeuralField: React.FC<NeuralFieldProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Adjust particle count based on screen size for performance
    const particleCount = Math.min(window.innerWidth > 768 ? 250 : 100, 300);
    const connectionDistance = 120;
    const activeConnectionDistance = 200;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;
      phaseOffset: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseVx = (Math.random() - 0.5) * 0.8;
        this.baseVy = (Math.random() - 0.5) * 0.8;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.radius = Math.random() * 1.5 + 0.5;
        this.phaseOffset = Math.random() * Math.PI * 2;
      }

      update(isActive: boolean, mouseX: number, mouseY: number) {
        if (isActive) {
          // Clustering behavior towards mouse or center
          const targetX = mouseX || width / 2;
          const targetY = mouseY || height / 2;
          const dx = targetX - this.x;
          const dy = targetY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 400) {
            // Attract to target
            this.vx += (dx / dist) * 0.08;
            this.vy += (dy / dist) * 0.08;
          } else {
            // Slowly return to base velocity
            this.vx += (this.baseVx - this.vx) * 0.05;
            this.vy += (this.baseVy - this.vy) * 0.05;
          }
          
          // Add friction to prevent infinite acceleration
          this.vx *= 0.92;
          this.vy *= 0.92;
        } else {
          // Chaotic, organic motion
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
          
          // Limit chaotic speed
          const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (speed > 1.5) {
            this.vx = (this.vx / speed) * 1.5;
            this.vy = (this.vy / speed) * 1.5;
          }
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges for a seamless infinite feel
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D, time: number, isActive: boolean) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Pulse particle size and opacity slightly
        const pulse = Math.sin(time * 0.002 + this.phaseOffset) * 0.5 + 0.5;
        const opacity = isActive ? 0.8 + pulse * 0.2 : 0.4 + pulse * 0.3;
        
        ctx.fillStyle = `rgba(247, 255, 114, ${opacity})`;
        ctx.fill();
        
        // Add glow
        ctx.shadowBlur = isActive ? 15 : 5;
        ctx.shadowColor = '#F7FF72';
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseMoving = false;
    let mouseTimeout: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      // Create a trailing effect by filling with semi-transparent dark void
      ctx.fillStyle = 'rgba(19, 20, 24, 0.3)';
      ctx.fillRect(0, 0, width, height);
      
      time += 16; // Approx 60fps delta
      
      // Determine if we should show active state (prop or mouse movement)
      const currentlyActive = isActive || isMouseMoving;
      const currentConnectionDist = currentlyActive ? activeConnectionDistance : connectionDistance;

      // Draw connections
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 0; // Reset shadow for lines to improve performance
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentConnectionDist) {
            let opacity = 1 - dist / currentConnectionDist;
            
            if (currentlyActive) {
               // Add wave/pulse effect traveling through the network
               const wave = Math.sin(dist * 0.02 - time * 0.005) * 0.5 + 0.5;
               opacity *= (0.3 + wave * 0.7);
               ctx.strokeStyle = `rgba(247, 255, 114, ${opacity * 0.8})`;
            } else {
               ctx.strokeStyle = `rgba(247, 255, 114, ${opacity * 0.15})`;
            }
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        p.update(currentlyActive, mouseX, mouseY);
        p.draw(ctx, time, currentlyActive);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      />
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#131418_100%)] opacity-60"></div>
    </div>
  );
};
