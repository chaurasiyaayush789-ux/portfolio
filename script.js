    // Auto theme (time-based) + toggle cycles
    const body = document.body;
    const themeLabel = document.getElementById("themeLabel");
    const hudMode = document.getElementById("hudMode");

    function getAutoTheme() {
      const h = new Date().getHours();
      if (h >= 6 && h < 16) return "light";   // 6-15
      if (h >= 16 && h < 20) return "dark";   // 16-19
      return "ai";                            // 20-5
    }

    function applyTheme(theme, modeLabel = "AUTO") {
      body.setAttribute("data-theme", theme);
      const label = theme === "light" ? "LIGHT" : theme === "dark" ? "DARK" : "AI";
      themeLabel.textContent = `${modeLabel} • ${label}`;
      hudMode.textContent = label === "AI" ? "AI Neon" : label + " mode";
    }

    // Auto mode on load
    let themeMode = "auto"; // auto / manual
    let manualThemeIndex = 0;
    const manualThemes = ["light", "dark", "ai"];

    function initTheme() {
      const autoTheme = getAutoTheme();
      applyTheme(autoTheme, "AUTO");
    }
    initTheme();

    // Theme toggle button: switch manual modes
    document.getElementById("themeToggle").addEventListener("click", () => {
      if (themeMode === "auto") {
        // switch to manual starting from current auto theme index
        themeMode = "manual";
        const current = body.getAttribute("data-theme");
        manualThemeIndex = manualThemes.indexOf(current);
        if (manualThemeIndex === -1) manualThemeIndex = 0;
      } else {
        // next theme
        manualThemeIndex = (manualThemeIndex + 1) % manualThemes.length;
      }
      const nextTheme = manualThemes[manualThemeIndex];
      applyTheme(nextTheme, "MANUAL");
    });

    // Re-apply auto theme every hour (if still in auto)
    setInterval(() => {
      if (themeMode === "auto") {
        initTheme();
      }
    }, 60 * 60 * 1000);

    // Mobile nav toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("navLinks");

    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });

    // Typing effect
    const typingEl = document.getElementById("typing");
    const typingTexts = [
      "AI assistants like Ayra.",
      "futuristic UI for the web.",
      "automation flows that save time."
    ];
    let textIndex = 0;
    let charIndex = 0;
    let typingForward = true;

    function typeLoop() {
      const current = typingTexts[textIndex];
      if (typingForward) {
        charIndex++;
        if (charIndex === current.length + 3) {
          typingForward = false;
        }
      } else {
        charIndex--;
        if (charIndex === 0) {
          typingForward = true;
          textIndex = (textIndex + 1) % typingTexts.length;
        }
      }
      typingEl.textContent = current.slice(0, Math.max(0, charIndex));
      setTimeout(typeLoop, typingForward ? 70 : 40);
    }
    typeLoop();

    // Terminal auto lines
    const terminalBody = document.getElementById("terminalBody");
    const terminalLines = [
      "> booting   ayra_assistant() …",
      "> status:   online",
      "> profile:  Aayush • AI & Web Dev",
      "> focus:    AI assistants, web, automation",
      "> hint:     type 'projects' in chat widget"
    ];
    let lineIdx = 0;

    function addTerminalLine() {
      if (lineIdx >= terminalLines.length) return;
      const line = document.createElement("div");
      line.textContent = terminalLines[lineIdx];
      terminalBody.appendChild(line);
      terminalBody.scrollTop = terminalBody.scrollHeight;
      lineIdx++;
      setTimeout(addTerminalLine, 600);
    }
    setTimeout(addTerminalLine, 400);

    // HUD time + device info
    const hudTime = document.getElementById("hudTime");
    const hudDevice = document.getElementById("hudDevice");

    function updateTime() {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      hudTime.textContent = `${h}:${m}`;
    }
    updateTime();
    setInterval(updateTime, 30 * 1000);

    function detectDevice() {
      const ua = navigator.userAgent.toLowerCase();
      let device = "Desktop";
      if (/mobile|android|iphone|ipad/.test(ua)) device = "Mobile";
      hudDevice.textContent = device;
    }
    detectDevice();

    // Fake form handler
    function handleSubmit(e) {
      e.preventDefault();
      const status = document.getElementById("formStatus");
      status.textContent = "Thank you! This is a demo form – contact via email or WhatsApp for now.";
      e.target.reset();
    }
    window.handleSubmit = handleSubmit;

    // Year
    document.getElementById("year").textContent = new Date().getFullYear();

    // Particles
    const particlesContainer = document.getElementById("particles");
    const PARTICLE_COUNT = 40;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("span");
      p.classList.add("particle");
      const size = Math.random() * 3 + 1;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.top = Math.random() * 100 + "%";
      p.style.animationDuration = 10 + Math.random() * 12 + "s";
      p.style.animationDelay = Math.random() * 8 + "s";
      particlesContainer.appendChild(p);
    }

    // 3D tilt effect for hero panel & project cards
    const tiltElements = document.querySelectorAll(".tilt");
    tiltElements.forEach((card) => {
      const factor = 15;
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / rect.width) * factor;
        const rotateX = ((rect.height / 2 - y) / rect.height) * factor;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
      });
    });

    // Neon cursor + click ripple
    const cursorDot = document.getElementById("cursorDot");
    window.addEventListener("mousemove", (e) => {
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    });

    window.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.classList.add("click-ripple");
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    });

    // Ayra Chat widget
    const chatWidget = document.getElementById("chatWidget");
    const chatToggle = document.getElementById("chatToggle");
    const chatBody = document.getElementById("chatBody");
    const chatInput = document.getElementById("chatInput");
    const chatSend = document.getElementById("chatSend");

    function addChatMessage(text, isAI = true) {
      const div = document.createElement("div");
      div.classList.add("msg");
      div.classList.add(isAI ? "msg-ai" : "msg-user");
      div.innerHTML = text;
      chatBody.appendChild(div);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleIntent(intent) {
      if (intent === "projects") {
        addChatMessage("You can scroll to the Projects section or click here to jump there. 🚀", true);
        document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
      } else if (intent === "skills") {
        addChatMessage("Showing skills & radar chart. 🧠", true);
        document.querySelector("#skills").scrollIntoView({ behavior: "smooth" });
      } else if (intent === "contact") {
        addChatMessage("Here are the contact details & form. 📮", true);
        document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
      } else {
        addChatMessage("I understand: <strong>" + intent + "</strong>, but try keywords: <em>projects</em>, <em>skills</em>, <em>contact</em>.", true);
      }
    }

    chatToggle.addEventListener("click", () => {
      chatWidget.classList.toggle("open");
    });

    chatSend.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (!text) return;
      addChatMessage(text, false);
      chatInput.value = "";
      handleIntent(text.toLowerCase());
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        chatSend.click();
      }
    });

    document.querySelectorAll(".chat-suggestions button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const intent = btn.dataset.intent;
        addChatMessage(intent, false);
        handleIntent(intent);
      });
    });

    // Small AI boot sound text (no audio file, sirf console log)
    console.log("Ayra voice: System online. Welcome back, Aayush.");