// 互动问答功能
const quizData = [
    {
        question: "Q：余晖烁烁代表的和谐之元是什么？",
        answer: "A：同理心（Empathy）"
    },
    {
        question: "Q：她在《彩虹摇滚》中加入了哪个乐队？",
        answer: "A：彩虹音爆（Rainbow Rocks）"
    }
];

document.querySelectorAll('.quiz-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const answerBox = document.getElementById('answerBox');
        answerBox.textContent = quizData[index].answer;
        // 添加答题特效
        const sparkles = Array.from({ length: 5 }, () => {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                animation: sparkle 1s linear infinite;
                transform: rotate(${Math.random() * 360}deg);
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
            `;
            return sparkle;
        });
        sparkles.forEach(sparkle => document.body.appendChild(sparkle));
        setTimeout(() => sparkles.forEach(s => s.remove()), 1000);
    });
});

// 新增鼠标轨迹特效
let trails = [];
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);

    trails.push(trail);
    if (trails.length > 10) {
        trails.shift().remove();
    }
});

// 新增粒子背景
const particles = [];
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    document.body.appendChild(particle);
    particles.push(particle);
}

function updateParticles() {
    particles.forEach(particle => {
        const x = parseFloat(particle.style.left);
        const y = parseFloat(particle.style.top);
        const dx = (Math.random() - 0.5) * 0.5;
        const dy = (Math.random() - 0.5) * 0.5;
        particle.style.left = x + dx + 'vw';
        particle.style.top = y + dy + 'vh';
        particle.style.opacity -= 0.005;
        if (particle.style.opacity < 0.1) {
            particle.style.opacity = 1;
        }
    });
    requestAnimationFrame(updateParticles);
}
updateParticles();

// 为了让答题特效的动画能正常工作，需要在页面中动态添加关键帧动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
    .trail {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #ffd700;
        border-radius: 50%;
        pointer-events: none;
        animation: trailFade 1s linear forwards;
    }
    @keyframes trailFade {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            display: none;
        }
    }
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        pointer-events: none;
    }
`;
document.head.appendChild(style);