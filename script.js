document.addEventListener("DOMContentLoaded", () => {

    // Elements
    const envelope = document.getElementById("envelope-container");
    const letter = document.getElementById("letter-container");
    const noBtn = document.querySelector(".no-btn");
    const yesBtn = document.querySelector(".btn[alt='Yes']");
    const verifyBtn = document.getElementById("verify-yes");
    const verifyInput = document.getElementById("verify-input");

    const title = document.getElementById("letter-title");
    const specialTitle = document.getElementById("special-letter-title");
    const specialSubtitle = document.getElementById("special-letter-subtitle");
    const romanticMessage = document.getElementById("romantic-message");
    const messageDots = document.getElementById("message-dots");
    const catImg = document.getElementById("letter-cat");
    const buttons = document.getElementById("letter-buttons");
    const typingCursor = document.getElementById("typing-cursor");

    const stage1 = document.getElementById("stage1-content");
    const stage2 = document.getElementById("stage2-messages");
    const stage3 = document.getElementById("stage3-proposal");
    const stage4 = document.getElementById("stage4-verify");
    const stage5 = document.getElementById("stage5-love");
    const stage6 = document.getElementById("stage6-final");

    const nameScreen = document.getElementById("name-screen");
    const nameInput = document.getElementById("name-input");
    const submitName = document.getElementById("submit-name");
    
    const dobScreen = document.getElementById("dob-screen");
    const dobInput = document.getElementById("dob-input");
    const submitDob = document.getElementById("submit-dob");

    // Audio element
    const bgMusic = document.getElementById('bg-music');

    // ========== ROMANTIC MESSAGES ARRAY ==========
    const romanticMessages = [
        "First of all, I just want to thank you for making me feel this way 💕",
        "The more I get to know you, the more my feelings grow ✨",
        "I still get nervous around you, and I'm so grateful for all the time we've spent together 💓",
        "I don't even know when I fell for you… I just know I fell deeply 🌸",
        "I'm just so grateful to still be by your side 🧩",
        "On days when you feel sad, I'll make you laugh. Not just by saying I love you, but by showing you 🏠",
        "Whenever you're angry, I'll comfort you and never make you cry 💝",
        "so...........",
    ];

    // Secret message flag
    let secretRevealed = false;
    
    // Sparkle trail flag
    let sparkleActive = false;
    
    // Message slideshow interval
    let messageInterval = null;
    
    // No button evasion counter
    let noButtonEscapeCount = 0;

    // ========== VALID DOB FORMATS ==========
    function isValidDOB(input) {
        // Remove all spaces and common separators
        const cleanInput = input.trim().replace(/[\/\-\.]/g, '');
        
        // Check for American format: 06/22/2004 or 06222004
        if (cleanInput === '06222004' || input.includes('06/22/2004') || input.includes('06-22-2004')) {
            return true;
        }
        
        // Check for British format: 22/06/2004
        if (input.includes('22/06/2004') || input.includes('22-06-2004')) {
            return true;
        }
        
        // Check for Nepali format: 2061-03-08
        if (input.includes('2061-03-08') || input.includes('2061/03/08') || input === '20610308') {
            return true;
        }
        
        // Check for MM/DD/YYYY format with June 22
        const datePattern = /^0?6[\/\-]0?22[\/\-]2004$/;
        if (datePattern.test(input)) {
            return true;
        }
        
        return false;
    }

    // ========== ENSURE MUSIC PLAYS ==========
    function playMusic() {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => {
            console.log("Auto-play prevented. Will play on first click.");
        });
    }
    
    playMusic();
    
    document.body.addEventListener('click', function playOnFirstClick() {
        bgMusic.play().catch(e => console.log("Still couldn't play"));
        document.body.removeEventListener('click', playOnFirstClick);
    }, { once: true });

    // ========== TYPING EFFECT FUNCTION ==========
    function typeWriter(element, text, speed = 120, callback = null) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    // ========== CREATE MESSAGE DOTS ==========
    function createMessageDots(count) {
        messageDots.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            messageDots.appendChild(dot);
        }
    }

    // ========== UPDATE ACTIVE DOT ==========
    function updateActiveDot(index) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ========== START MESSAGE SLIDESHOW ==========
    function startMessageSlideshow() {
        let currentIndex = 0;
        
        createMessageDots(romanticMessages.length);
        romanticMessage.textContent = romanticMessages[0];
        updateActiveDot(0);
        
        if (messageInterval) {
            clearInterval(messageInterval);
            messageInterval = null;
        }
        
        messageInterval = setInterval(() => {
            currentIndex++;
            
            if (currentIndex >= romanticMessages.length) {
                clearInterval(messageInterval);
                messageInterval = null;
                return;
            }
            
            romanticMessage.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                romanticMessage.textContent = romanticMessages[currentIndex];
                romanticMessage.style.animation = 'heartbeat 1.3s infinite';
                updateActiveDot(currentIndex);
            }, 500);
            
        }, 7000);
    }

    // ========== ENHANCED NO BUTTON EVASION ==========
    function moveNoButton() {
        noButtonEscapeCount++;
        
        const button = noBtn;
        const container = document.querySelector('.buttons');
        
        let moveX, moveY;
        
        if (noButtonEscapeCount % 3 === 0) {
            const corners = [
                { x: 150, y: -150 },
                { x: -150, y: -150 },
                { x: 150, y: 150 },
                { x: -150, y: 150 }
            ];
            const corner = corners[Math.floor(Math.random() * corners.length)];
            moveX = corner.x;
            moveY = corner.y;
        } else if (noButtonEscapeCount % 3 === 1) {
            const angle = Math.random() * Math.PI * 2;
            moveX = Math.cos(angle) * 250;
            moveY = Math.sin(angle) * 200;
        } else {
            moveX = (Math.random() - 0.5) * 400;
            moveY = (Math.random() - 0.5) * 300;
        }
        
        moveX = Math.max(-250, Math.min(250, moveX));
        moveY = Math.max(-200, Math.min(200, moveY));
        
        button.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        button.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 20 - 10}deg)`;
        
        if (noButtonEscapeCount > 5) {
            button.style.transform += ` scale(${Math.max(0.5, 1 - (noButtonEscapeCount * 0.05))})`;
        }
        
        createHeart();
    }

    // ========== CONFETTI FUNCTION ==========
    function throwConfetti() {
        for(let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    width: 10px;
                    height: 10px;
                    background: hsl(${Math.random() * 360}, 100%, 65%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transform: translate(-50%, -50%);
                    box-shadow: 0 0 5px rgba(255,255,255,0.5);
                `;
                document.body.appendChild(confetti);
                
                let x = window.innerWidth / 2;
                let y = window.innerHeight / 2;
                let vx = (Math.random() - 0.5) * 22;
                let vy = (Math.random() - 0.8) * 22;
                let opacity = 1;
                
                function animate() {
                    x += vx;
                    y += vy;
                    vy += 0.3;
                    opacity -= 0.008;
                    
                    confetti.style.left = x + 'px';
                    confetti.style.top = y + 'px';
                    confetti.style.opacity = opacity;
                    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 65%)`;
                    
                    if (opacity > 0 && y < window.innerHeight + 100) {
                        requestAnimationFrame(animate);
                    } else {
                        confetti.remove();
                    }
                }
                animate();
            }, i * 4);
        }
    }

    // ========== FLOATING HEARTS ==========
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '💖', '💗', '💓'][Math.floor(Math.random() * 10)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.bottom = '0';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    // ========== SPARKLE TRAIL ==========
    function createSparkle(e) {
        if (sparkleActive && Math.random() > 0.6) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.innerHTML = ['✨', '💖', '🌸', '⭐', '💫', '🌟', '💕'][Math.floor(Math.random() * 7)];
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            sparkle.style.fontSize = (Math.random() * 15 + 15) + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // ========== CLICK ENVELOPE ==========
    envelope.addEventListener("click", () => {
        envelope.style.display = "none";
        nameScreen.style.display = "flex";
        
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Still couldn't play"));
        }
    });

    // ========== SUBMIT NAME ==========
    submitName.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        
        if (name.toLowerCase() === "saumya") {
            nameScreen.style.display = "none";
            dobScreen.style.display = "flex";
        } else {
            alert(`💕 Sorry, this letter is only for Saumya! 💕`);
            envelope.style.display = "block";
            nameScreen.style.display = "none";
            nameInput.value = "";
        }
    });

    // ========== SUBMIT DOB ==========
    submitDob.addEventListener("click", () => {
        const dob = dobInput.value.trim();
        
        if (isValidDOB(dob)) {
            dobScreen.style.display = "none";
            letter.style.display = "flex";
            
            setTimeout(() => {
                document.querySelector(".letter-window").classList.add("open");
                
                setTimeout(() => {
                    typingCursor.style.display = 'none';
                    specialTitle.innerHTML = '💌';
                    
                    typeWriter(specialSubtitle, `A special letter for Saumya`, 120, () => {
                        typingCursor.style.display = 'none';
                        
                        setTimeout(() => {
                            stage1.style.animation = 'fadeOut 0.5s ease';
                            stage1.style.opacity = '0';
                            
                            setTimeout(() => {
                                stage1.style.display = 'none';
                                stage2.style.display = 'flex';
                                startMessageSlideshow();
                                
                                setTimeout(() => {
                                    if (messageInterval) clearInterval(messageInterval);
                                    
                                    stage2.style.animation = 'fadeOut 0.5s ease';
                                    stage2.style.opacity = '0';
                                    
                                    setTimeout(() => {
                                        stage2.style.display = 'none';
                                        stage3.style.display = 'block';
                                        
                                        title.style.animation = 'slideIn 0.8s ease';
                                        catImg.style.animation = 'bounceIn 0.8s ease';
                                        document.querySelector('.buttons').style.animation = 'slideUp 0.8s ease';
                                        
                                        for(let i = 0; i < 15; i++) {
                                            setTimeout(() => {
                                                createHeart();
                                            }, i * 50);
                                        }
                                    }, 500);
                                }, 56000);
                                
                            }, 500);
                        }, 3000);
                    });
                    
                    typingCursor.style.display = 'inline-block';
                    
                }, 100);
                
            }, 50);
            
        } else {
            alert(`🎂 That's not the right date... Try again! 💕`);
            dobInput.value = "";
            dobInput.focus();
        }
    });

    // ========== MOVE NO BUTTON ON HOVER ==========
    noBtn.addEventListener("mouseover", moveNoButton);
    
    window.addEventListener('resize', () => {
        if (stage3.style.display === 'block') {
            moveNoButton();
        }
    });

    // ========== YES CLICKED ==========
    yesBtn.addEventListener("click", () => {
        stage3.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            stage3.style.display = 'none';
            stage4.style.display = 'block';
            
            verifyInput.value = '';
            verifyBtn.disabled = false;
            verifyBtn.style.backgroundColor = '#ff9eb5';
            
            setTimeout(() => verifyInput.focus(), 100);
        }, 300);
    });

    // ========== VERIFICATION ==========
    function checkVerification() {
        const verifyText = verifyInput.value.trim().toLowerCase();
        
        if (verifyText === "yes") {
            stage4.style.animation = 'fadeOut 0.3s ease';
            
            setTimeout(() => {
                stage4.style.display = 'none';
                stage5.style.display = 'block';
                
                setTimeout(() => {
                    stage5.style.animation = 'fadeOut 0.5s ease';
                    
                    setTimeout(() => {
                        stage5.style.display = 'none';
                        stage6.style.display = 'block';
                        
                        sparkleActive = true;
                        throwConfetti();
                        
                        for(let i = 0; i < 30; i++) {
                            setTimeout(() => {
                                createHeart();
                            }, i * 150);
                        }
                        
                        setTimeout(() => {
                            const secretMsg = document.createElement('p');
                            secretMsg.className = 'secret-message';
                            secretMsg.style.fontSize = '18px';
                            secretMsg.style.padding = '15px 25px';
                            secretMsg.style.animation = 'fadeIn 0.5s ease, heartbeat 1.3s infinite';
                            secretMsg.textContent = "✨ Can I call you my princess, my cutie, my girl, mine? ✨";
                            document.querySelector('.letter-window').appendChild(secretMsg);
                            
                            setTimeout(() => {
                                secretMsg.remove();
                            }, 8000);
                        }, 2000);
                        
                    }, 500);
                }, 10000);
                
            }, 300);
        } else {
            verifyInput.classList.add('shake');
            setTimeout(() => {
                verifyInput.classList.remove('shake');
            }, 500);
        }
    }

    verifyBtn.addEventListener("click", checkVerification);
    
    verifyInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            checkVerification();
        }
    });

    // ========== SECRET MESSAGE ON DOUBLE CLICK ==========
    document.querySelector('.letter-window').addEventListener('dblclick', (e) => {
        e.stopPropagation();
        
        if (!secretRevealed) {
            const secretMsg = document.createElement('p');
            secretMsg.className = 'secret-message';
            secretMsg.textContent = "✨ You're the only one for me, forever ✨";
            document.querySelector('.letter-window').appendChild(secretMsg);
            secretRevealed = true;
            
            for(let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createHeart();
                }, i * 50);
            }
            
            setTimeout(() => {
                secretMsg.remove();
                secretRevealed = false;
            }, 4000);
        }
    });

    // ========== SPARKLE TRAIL ==========
    document.addEventListener('mousemove', createSparkle);

    // ========== CLEAN UP ==========
    window.addEventListener('beforeunload', () => {
        if (messageInterval) clearInterval(messageInterval);
        sparkleActive = false;
    });

    // ========== ENTER KEY SUPPORT ==========
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitName.click();
        }
    });
    
    dobInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitDob.click();
        }
    });

});