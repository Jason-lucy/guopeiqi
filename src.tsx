import React,{useState,useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import './hero.css';
import portrait from './portrait.jpg';
const videoURL='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const roles=[
 ['AI 产品经理','我用 GeoPulse 追踪同一组问题在不同模型中的回答，保留每条判断的原文证据。','geo','查看 GeoPulse'],
 ['AI 售前 / FDE','我为制造业客户搭建仿真 Demo，也把 948 页产品资料整理成可检索的建模助手。','rag','查看建模助手'],
 ['AI 运营','我把选题、脚本、分镜和质量检查串进口播工作台，让每一步都能回看、修改。','film','查看口播工作台']
];
const email='2576593778@qq.com';
function useTypewriter(text:string,speed=38,startDelay=600){
 const [count,setCount]=useState(0);
 useEffect(()=>{setCount(0);if(matchMedia('(prefers-reduced-motion: reduce)').matches){setCount(text.length);return}
 let tick:number;const start=setTimeout(()=>{let n=0;tick=window.setInterval(()=>{setCount(++n);if(n>=text.length)clearInterval(tick)},speed)},startDelay);
 return ()=>{clearTimeout(start);clearInterval(tick)}},[text,speed,startDelay]);
 return {displayed:text.slice(0,count),done:count>=text.length};
}
function Hero(){
 const [role,select]=useState(0),[open,menu]=useState(false),[copy,feedback]=useState('复制邮箱');
 const video=useRef<HTMLVideoElement>(null);
 const [label,story,id,action]=roles[role],typing=useTypewriter(story);
 useEffect(()=>{const v=video.current;if(!v||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 let prev:number|undefined,target=0;
 const seek=()=>{if(!v.seeking&&Number.isFinite(v.duration)&&Math.abs(v.currentTime-target)>.025)v.currentTime=target};
 const move=(e:MouseEvent)=>{if(prev!==undefined&&Number.isFinite(v.duration)){target=Math.min(v.duration,Math.max(0,target+(e.clientX-prev)/innerWidth*.8*v.duration));seek()}prev=e.clientX};
 window.addEventListener('mousemove',move);v.addEventListener('seeked',seek);return ()=>{window.removeEventListener('mousemove',move);v.removeEventListener('seeked',seek)}},[]);
 const links=<><a href="#work">作品</a><a href="#experience">履历</a><a href="#about">关于我</a></>;
 return <><header className="mast"><a href="#top" className="wordmark">Guo Peiqi ✳︎</a><nav>{links}</nav><a className="mail" href={'mailto:'+email}>联系我 ↗</a><button className="toggle" aria-expanded={open} aria-label="切换导航" onClick={()=>menu(!open)}>{open?'关闭 ×':'菜单 ☰'}</button></header>{open&&<nav className="overlay" onClick={()=>menu(false)}>{links}<a href={'mailto:'+email}>联系我 ↗</a></nav>}
 <section className="cover"><img className="poster" src={portrait} alt="根据郭佩琦简历照片创作的数字肖像"/><video ref={video} src={videoURL} muted playsInline preload="auto" onLoadedData={e=>e.currentTarget.classList.add('ready')} onError={e=>e.currentTarget.classList.remove('ready')}/>
 <div className="covercopy"><small>个人作品集　／　2026</small><h1>郭佩琦</h1><div className="subtitle">AI 产品与解决方案<br/>南京 · 可适应出差与驻场</div>
 <p className="story" aria-label={story}><span aria-hidden="true">{typing.displayed}{!typing.done&&<i/>}</span></p>
 <div className="flex flex-wrap gap-2 pills">{roles.map(([name],i)=><button key={name} aria-pressed={role===i} onClick={()=>select(i)}>{name}</button>)}<a href={'#'+id}>{action} ↘</a><button className="copy" onClick={async()=>{try{await navigator.clipboard.writeText(email);feedback('已复制邮箱 ✓')}catch{feedback(email)}}}>{copy} ▢</button></div></div><a className="bottom" href="#work">01 / 作品选集 ↓</a></section></>;
}
createRoot(document.getElementById('entry')!).render(<Hero/>);
