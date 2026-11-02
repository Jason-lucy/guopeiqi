const texts={
"产品":["AI 产品经理","关注问题定义、用户流程与 MVP 验证，把 AI 能力转成清晰可用的产品价值。"],
"售前":["AI 售前 / FDE","擅长需求澄清、方案演示和技术沟通，从业务场景到可运行 Demo 推进客户决策。"],
"运营":["AI 运营","通过知识库、Prompt、SOP 与内容工作流，让 AI 能力沉淀为团队可复用的日常实践。"]
};
document.querySelectorAll(".role").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".role").forEach(x=>x.classList.remove("active"));btn.classList.add("active");const [title,copy]=texts[btn.dataset.role];document.querySelector("#roleTitle").textContent=title;document.querySelector("#roleText").textContent=copy;}));
const menu=document.querySelector(".menu"),nav=document.querySelector(".nav nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.textContent=open?"×":"☰";});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.textContent="☰";}));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll(".card,.stats>div,.experience-row,.highlight").forEach(el=>{el.classList.add("reveal");io.observe(el)});
