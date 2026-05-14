import { useEffect, useRef } from "react";

/**
 * AnimatedBackground — Liquid Marble
 * Wrappez n'importe quelle page :
 *   <AnimatedBackground><Navbar /><Routes>...</Routes></AnimatedBackground>
 */
export default function AnimatedBackground({ children }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId, T = 0;
    let offCanvas = null, offCtx = null;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Perlin noise */
    const _p = (() => {
      const a = [...Array(256)].map((_, i) => i).sort(() => Math.random() - 0.5);
      const p = new Uint8Array(512);
      for (let i = 0; i < 512; i++) p[i] = a[i & 255];
      return p;
    })();
    const fade = t => t*t*t*(t*(t*6-15)+10);
    const lerp = (t,a,b) => a+t*(b-a);
    const grad = (h,x,y) => { const H=h&3,u=H<2?x:y,v=H<2?y:x; return((H&1)?-u:u)+((H&2)?-v:v); };
    const n2 = (x,y) => {
      const xi=Math.floor(x)&255,yi=Math.floor(y)&255,xf=x-Math.floor(x),yf=y-Math.floor(y);
      const u=fade(xf),v=fade(yf),aa=_p[_p[xi]+yi],ab=_p[_p[xi]+yi+1],ba=_p[_p[xi+1]+yi],bb=_p[_p[xi+1]+yi+1];
      return lerp(v,lerp(u,grad(aa,xf,yf),grad(ba,xf-1,yf)),lerp(u,grad(ab,xf,yf-1),grad(bb,xf-1,yf-1)));
    };
    const fbm = (x,y,o=5) => { let v=0,a=1,f=1,m=0; for(let i=0;i<o;i++){v+=n2(x*f,y*f)*a;m+=a;a*=.5;f*=2;} return v/m; };

    const marbleVal = (px,py,t) => {
      const sc=0.0028,spd=t*0.00014,diag=(px*0.7+py)*sc*0.9;
      const wx=fbm(px*sc*0.6+spd*.5,py*sc*0.6,4)*2.2,wy=fbm(px*sc*0.6-.3,py*sc*0.6+spd*.4,4)*2.2;
      return Math.sin(diag*6.5+fbm(px*sc+wx*0.9+spd,py*sc+wy*0.8,5)*7);
    };
    const marbleColor = v => {
      const n=(v+1)*.5;
      if(n<0.18){const f=n/0.18;return[8+f*8|0,7+f*7|0,16+f*14|0];}
      if(n<0.35){const f=(n-.18)/.17;return[16+f*22|0,14+f*8|0,30+f*40|0];}
      if(n<0.52){const f=(n-.35)/.17;return[38+f*55|0,22+f*14|0,70+f*72|0];}
      if(n<0.70){const f=(n-.52)/.18;return[93+f*68|0,36+f*18|0,142+f*68|0];}
      if(n<0.85){const f=(n-.70)/.15;return[161+f*34|0,54+f*42|0,210+f*35|0];}
      const f=(n-.85)/.15;return[195+f*12|0,96+f*30|0,245];
    };

    const STEP = 3;
    const draw = () => {
      T++;
      const W=canvas.width,H=canvas.height;
      const iW=Math.ceil(W/STEP),iH=Math.ceil(H/STEP);
      if(!offCanvas||offCanvas.width!==iW||offCanvas.height!==iH){
        offCanvas=document.createElement("canvas");offCanvas.width=iW;offCanvas.height=iH;offCtx=offCanvas.getContext("2d");
      }
      const img=offCtx.createImageData(iW,iH),d=img.data;
      for(let iy=0;iy<iH;iy++) for(let ix=0;ix<iW;ix++){
        const[r,g,b]=marbleColor(marbleVal(ix*STEP,iy*STEP,T));
        const i=(iy*iW+ix)*4;d[i]=r;d[i+1]=g;d[i+2]=b;d[i+3]=255;
      }
      offCtx.putImageData(img,0,0);
      ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high";
      ctx.drawImage(offCanvas,0,0,W,H);
      const vig=ctx.createRadialGradient(W/2,H/2,H*.2,W/2,H/2,H*.9);
      vig.addColorStop(0,"transparent");vig.addColorStop(1,"rgba(8,7,14,0.7)");
      ctx.fillStyle=vig;ctx.fillRect(0,0,W,H);
      animId=requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize",resize); };
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <canvas ref={canvasRef} style={{ position:"fixed",inset:0,width:"100%",height:"100%",zIndex:0 }} />
      <div style={{
        position:"fixed",inset:0,zIndex:1,pointerEvents:"none",opacity:0.2,mixBlendMode:"screen",
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize:"200px"
      }} />
      <div style={{ position:"relative",zIndex:2,minHeight:"100vh" }}>
        {children}
      </div>
    </div>
  );
}