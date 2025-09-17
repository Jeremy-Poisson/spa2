(function () {
  const styles = `
    <style>
      #vapiToggleBtn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 1000;
        background-color: #5dfeaa;
        border: none;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 24px;
        color: #000;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
	#vapiToggleBtn:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(139, 92, 246, 0.6);
            gap: 15px;
        }
      #vapiChatOverlay {
        display: none;
        position: fixed;
        bottom: 100px;
        right: 30px;
        z-index: 999;
        width: 360px;
        max-height: 60vh;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        overflow: hidden;
        font-family: sans-serif;
        border: 1px solid #ddd;
        flex-direction: column;
      }
  #vapiChatOverlay.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
        }
 .chat-header {
            background: linear-gradient(45deg, #1a2a6c, #b21f1f);
            color: white;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
        }
        
        .chat-header-content {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .chat-header img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .chat-header-text h2 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 3px;
        }
        
        .chat-header-text p {
            font-size: 0.85rem;
            opacity: 0.9;
        }
.close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }
        
        .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: rotate(90deg);
        }

     #chatMessages {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            background: #f8f8f8;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
.message {
            max-width: 80%;
            padding: 12px 15px;
            border-radius: 18px;
            position: relative;
            animation: fadeInMsg 0.3s ease;
            word-wrap: break-word;
			line-height: 1.5;
            font-size: 15px;
        }
.vapi-assistant {
            background: #e6f0ff;
            color: #1a2a6c;
            border-bottom-left-radius: 5px;
            align-self: flex-start;
        }
        
        .vapi-user {
            background: #1a2a6c;
            color: white;
            border-bottom-right-radius: 5px;
            align-self: flex-end;
        }
      #chatControls {
        display: flex;
        padding: 10px;
        border-top: 1px solid #ddd;
        gap: 10px;
		background: white;
      }
      #chatInput {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
     
@keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInMsg {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
 @keyframes typing {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
        }
.welcome-message {
            background: #e6f0ff;
            color: #1a2a6c;
            padding: 15px;
            border-radius: 18px;
            border-bottom-left-radius: 5px;
            margin-bottom: 15px;
            animation: fadeInMsg 0.5s ease;
        }
 .typing-indicator {
            background: #e6f0ff;
            color: #1a2a6c;
            padding: 15px;
            border-radius: 18px;
            border-bottom-left-radius: 5px;
            align-self: flex-start;
            display: inline-block;
            width: auto;
        }
        
        .typing-indicator span {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #1a2a6c;
            border-radius: 50%;
            margin: 0 2px;
            animation: typing 1.4s infinite;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }



       #transcriptBox {
        display: none;
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 360px;
        max-height: 60vh;
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        overflow: hidden;
        font-family: sans-serif;
        border: 1px solid #ddd;
        z-index: 998;
        flex-direction: column;
        animation: slideUp 0.3s ease;
      }

      #transcriptBox.active {
        display: flex;
      }

      .transcript-header {
        background: linear-gradient(45deg, #1a2a6c, #b21f1f);
        color: white;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .transcript-header-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .transcript-header img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .transcript-header-text h2 {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 3px;
      }

     .transcript-messages {
        flex: 1;
        overflow-y: auto;
        padding: 15px;
        background: #f8f8f8;
        display: flex;
        flex-direction: column;
        gap: 12px;
        /* Ensure scrolling works properly */
        max-height: calc(60vh - 100px);
      }

      .transcript-assistant {
        background: #e6f0ff;
        color: #1a2a6c;
        border-bottom-left-radius: 5px;
        align-self: flex-start;
      }

      .transcript-user {
        background: #1a2a6c;
        color: white;
        border-bottom-right-radius: 5px;
        align-self: flex-end;
      }

      .transcript-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .transcript-close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
      }





	.send-button {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            padding: 10px 10px;
            background: linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef);
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
            transform: translateY(0);
        }
	.send-button:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 25px rgba(139, 92, 246, 0.6);
            gap: 15px;
        }
	.send-button .icon {
  		width: 16px;
  		height: 16px;
		filter: brightness(0) invert(1);
	}
 #vapi-support-btn {
        position: fixed;
        
        z-index: 1001; /* Higher than other elements */
        display: block;
      }
 .chat-popup {
      position: fixed;
      bottom: 100px;
      right: 30px;
      background-color: #333;
      color: #fff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      padding: 20px;
      width: 300px;
      z-index: 1000;
      display: none;
      animation: fadeIn 0.5s ease-out;
    }

    .chat-popup::after {
      content: '';
      position: absolute;
      bottom: -10px;
      right: 40px;
      border-width: 10px 10px 0;
      border-style: solid;
      border-color: #333 transparent;
      display: block;
      width: 0;
    }

    .chat-popup img.agent-img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: absolute;
      top: -35px;
      left: calc(50% - 30px);
      border: 3px solid white;
    }

    .chat-popup .close-btn2 {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 18px;
      cursor: pointer;
    }

    .chat-popup h3 {
      margin-top: 30px;
      font-size: 20px;
      text-align: center;
    }

    .chat-popup p {
      font-size: 15px;
      text-align: center;
      margin: 10px 0 0;
    }

    @keyframes fadeIn {
      from {opacity: 0; transform: translateY(20px);}
      to {opacity: 1; transform: translateY(0);}
    }
#phone {
  color: white;
  text-decoration: none; /* Optional: removes underline */
}

#phone:hover {
  color: #ddd; /* Optional: light gray on hover */
}
.live-chat-title {
  text-align: center;
  font-size: 1.5em;
  margin: 20px 0;
}

    </style>
  `;

  const html = `
    <button id="vapiToggleBtn">💬</button>
    <div id="vapiChatOverlay">
      <div class="chat-header">
        <div class="chat-header-content">
          <img src="headshot.png" alt="Chat Icon">
          <div class="chat-header-text">
            <div><b>Online Now</b></div>
            Chat with an assistant from <br>Bella A'more Salon
          </div>
        </div>
        <button class="close-btn" onclick="closeChatOverlay()">&times;</button>
      </div>
      <div id="chatMessages"> 
        <div class="message vapi-assistant welcome-message">
          Welcome to Bella A'more Salon! Waiting on an assistant...say, "Hi" to get started
        </div>
      </div>
      <div id="chatControls">
        <input type="text" id="chatInput" placeholder="Type your message..." />
        <button class="send-button" onclick="sendChat()"> 
          <span>Send</span>
          <img src="https://digitalfootprints.app/paper-air.svg" alt="Send icon" class="icon">
        </button>
      </div>
    </div>
    
    <div id="transcriptBox">
      <div class="transcript-header">
        <div class="transcript-header-content">
          <img src="headshot.png" alt="Voice Assistant">
          <div class="transcript-header-text">
            <div><b>Voice Assistant</b></div>
            Active Conversation
          </div>
        </div>
        <button class="transcript-close-btn" onclick="closeTranscript()">&times;</button>
      </div>
      <div class="transcript-messages" id="transcriptMessages"></div>
    </div>
    
    <!-- Live Chat Popup -->
    <div class="chat-popup" id="chatBox">
      <img src="headshot.png" alt="Agent" class="agent-img">
      <span class="close-btn2" onclick="closeChat()">X</span>
      <div class="live-chat-title"><strong>LIVE CHAT</strong></div>
      <p>Your 24/7 Live Assistant is ready!</p>
    </div>
  `;

  document.head.insertAdjacentHTML("beforeend", styles);
  document.body.insertAdjacentHTML("beforeend", html);
	const lastPartialMessages = {
  assistant: null,
  user: null
};
  
  window.onload = function() {
    document.getElementById("chatBox").style.display = "block";
  };
    

  const assistantId = "86b6597e-121b-4666-8303-c68edc32bfe4";
  const apiKey = "00bc9f40-2b5a-4e76-bed9-879d3e548632";
  const webhookToolId = "00c96666-c5fa-4b48-8523-083b255c7c71";
  const webhookUrl = "https://hook.us2.make.com/khka18x8gyvkxujk1xt70ug2m15qttbj"; //"https://hook.us2.make.com/e7s16ufdo3drbrbmrg1sngdmthmu98k1"; ///"https://hook.us2.make.com/khka18x8gyvkxujk1xt70ug2m15qttbj";   ////this is for the make.com for digitalfootprintsapp@gmail.com
	const vapiBtnContainer = document.getElementById('vapi-support-btn');

  let lastAssistantTranscript = "";
  let isTextChat = false;
  let vapiInstance = null;
  let isCallActive = false;
  let currentChatId = null;
  const conversationHistory = [];

  const buttonConfig = {
  //position: "top-right", // "bottom" | "top" | "left" | "right" | "top-right" | "top-left" | "bottom-left" | "bottom-right"
  offset: "40px", // decide how far the button should be from the edge
  width: "45px", // min-width of the button
  height: "45px", // height of the button
  idle: { // button state when the call is not active.
    color: `rgb(93, 254, 202)`, 
    type: "round", //pill or "round"
    title: "Have a quick question?", // only required in case of Pill
    subtitle: "Talk with our AI assistant", // only required in case of pill
    icon: `https://unpkg.com/lucide-static@0.321.0/icons/mic.svg`,
  },
  loading: { // button state when the call is connecting
    color: `rgb(93, 124, 202)`,
    type: "round", // or "round"
    title: "Connecting...", // only required in case of Pill
    subtitle: "Please wait", // only required in case of pill
    icon: `https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg`,
  },
  active: { // button state when the call is in progress or active.
    color: `rgb(255, 0, 0)`,
    type: "round", // or "round"
    title: "Call is in progress...", // only required in case of Pill
    subtitle: "End the call.", // only required in case of pill
    icon: `https://unpkg.com/lucide-static@0.321.0/icons/mic-off.svg`,
  },
}; // Modify this as required

  document.getElementById("vapiToggleBtn").onclick = function () {
    const overlay = document.getElementById("vapiChatOverlay");
    //overlay.style.display = overlay.style.display === "none" ? "flex" : "none";
	  overlay.style.display = overlay.style.display === "flex" ? "none" : "flex";
	  const transcriptBox = document.getElementById("transcriptBox");
  if (transcriptBox) transcriptBox.style.display = "none";
	   const vapiBtnContainer = document.getElementById('vapi-support-btn');
	
      if (vapiBtnContainer) vapiBtnContainer.style.display = "none";
	  closeChat();
	  
  };
	
	
function appendTranscriptMessage(text, role) {
    const box = document.getElementById("transcriptMessages");
    if (!box) return;
    
    const messageDiv = document.createElement("div");
    messageDiv.className = `transcript-message ${role === "assistant" ? "transcript-assistant" : "transcript-user"}`;
    messageDiv.textContent = text;
    messageDiv.style.animation = "fadeInMsg 0.3s ease";
    box.appendChild(messageDiv);
    
    // Fix scrolling - scroll to bottom after adding message
    box.scrollTop = box.scrollHeight;
  }	
function createTranscriptMessage(text, role) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `transcript-message ${role === "assistant" ? "transcript-assistant" : "transcript-user"}`;
  messageDiv.textContent = text;
  messageDiv.style.animation = "fadeInMsg 0.3s ease";
  return messageDiv;
}
  function appendChatMessage(text, sender = "user") {
    const box = document.getElementById("chatMessages");
    const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            messageDiv.classList.add(sender === "assistant" ? "vapi-assistant" : "vapi-user");
            messageDiv.textContent = text;
            box.appendChild(messageDiv);
    box.scrollTop = box.scrollHeight;
    conversationHistory.push({ role: sender, content: text });
  }
function showTypingIndicator() {
            const box = document.getElementById("chatMessages");
            const typingDiv = document.createElement("div");
            typingDiv.classList.add("typing-indicator");
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            box.appendChild(typingDiv);
            box.scrollTop = box.scrollHeight;
            return typingDiv;
        }
        
        function removeTypingIndicator(indicator) {
            if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }
	 // Helper function to toggle Vapi mic button visibility
  function toggleVapiButton(show) {
    const vapiBtnContainer = document.getElementById('vapi-support-btn');
	
      if (vapiBtnContainer) vapiBtnContainer.style.display = "block";
   
  }

  window.sendChat = function () {
  const inputEl = document.getElementById("chatInput");
  const userMessage = inputEl.value.trim();
  if (!userMessage) return;

  appendChatMessage(userMessage, "user");
  inputEl.value = "";
  const typingIndicator = showTypingIndicator();

  if (userMessage.toLowerCase() === "voice") {
    const chatOverlay = document.getElementById("vapiChatOverlay");
    if (chatOverlay) chatOverlay.style.display = "none";
    const transcriptBox = document.getElementById("transcriptBox");
    if (transcriptBox) transcriptBox.style.display = "block";
    transcriptBox.innerHTML = '';
    const prompt = document.createElement("p");
    prompt.textContent = "Click the voice button (mic) to get started";
    prompt.style.color = "gray";
    prompt.style.textAlign = "center";
    transcriptBox.appendChild(prompt);
    toggleVapiButton(true);
    console.log("Switched to voice mode. Waiting for user to click the voice button.");
    removeTypingIndicator(typingIndicator);
    return;
  }

  const requestBody = {
    assistantId,
    input: userMessage,
    ...(currentChatId && { previousChatId: currentChatId })
  };

  fetch("https://api.vapi.ai/chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer c02f3195-331b-4326-b386-1dcb777f745b`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(res => res.json())
    .then(data => {
      if (data.id) currentChatId = data.id;

      let foundResponse = false;
      data.output?.forEach(msg => {
        if (msg.role !== "tool" && (msg.content || msg.text)) {
          const responseText = msg.content || msg.text;
          appendChatMessage(responseText, "assistant");
          foundResponse = true;
        }
      });

      removeTypingIndicator(typingIndicator);

      if (!foundResponse) {
        appendChatMessage("Processing your request...", "assistant");
      }
    })
    .catch(err => {
      console.error(err);
      appendChatMessage("Error connecting to assistant.", "assistant");
    });
};

  function sendToMakeWebhook() {
  const rawTranscript = conversationHistory.map(e => `${e.role}: ${e.content}`).join("\n");
  const transcriptWithBreaks = rawTranscript.replace(/\n/g, "<br>");
  const transcript = transcriptWithBreaks;

  const extractNameFromContext = () => {
    for (let i = 0; i < conversationHistory.length - 1; i++) {
      const entry = conversationHistory[i];
      const nextEntry = conversationHistory[i + 1];
      if (
        entry.role === "assistant" &&
        /your name|may I have your name|can I get your name|full name/i.test(entry.content) &&
        nextEntry.role === "user"
      ) {
        const match = nextEntry.content.match(/^([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)$/);
        return match ? match[1] : nextEntry.content.trim();
      }
    }
    return "";
  };

  const extractPhone = (text) => {
    const match = text.match(/(?:\b|\D)(\d{3})[\s\-]?(\d{3})[\s\-]?(\d{4})(?:\b|\D)/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : "";
  };

  const extractEmail = (text) => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
    return match ? match[0] : "";
  };

  const extractLocationInfo = () => {
    let isFromBuffalo = "unsure";
    let city = "";
    let state = "";
    let zip = "";

    for (let i = 0; i < conversationHistory.length - 1; i++) {
      const entry = conversationHistory[i];
      const nextEntry = conversationHistory[i + 1];

      if (
        entry.role === "assistant" &&
        /Are you located in or near Montgomery County and Bucks County,\??$/i.test(entry.content)
      ) {
        const userReply = nextEntry?.content?.toLowerCase().trim();
        if (userReply === "yes" || userReply.startsWith("yes")) {
          isFromBuffalo = "yes";
        } else if (userReply === "no") {
          isFromBuffalo = "no";
        }
      }
    }

    const cityMatch = transcript.match(/\b(?:city|in|at|from)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)\b/);
    const stateMatch = transcript.match(/\b(PA|Pennsylvania)\b/i);
    const zipMatch = transcript.match(/\b\d{5}(-\d{4})?\b/);

    if (cityMatch) city = cityMatch[1];
    if (stateMatch) state = stateMatch[0];
    if (zipMatch) zip = zipMatch[0];

    return { isFromBuffalo, city, state, zip };
  };

  const name = extractNameFromContext();
  const phone = extractPhone(transcript);
  const email = extractEmail(transcript);
  const summary = "Submitted via text chat (no voice call)";
  const pageUrl = window.location.href;
  const referrerUrl = document.referrer;

  const { isFromBuffalo, city, state, zip } = extractLocationInfo();

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: name || "Not found",
      phone: phone || "Not found",
      email: email || "Not found",
      call_summary: summary,
      full_transcript: transcript,
      source: "text-chat",
      page_url: pageUrl,
      referrer_url: referrerUrl,
      city_is_buffalo_or_wny: isFromBuffalo,
      ...(city && { city }),
      ...(state && { state }),
      ...(zip && { zip })
    })
  })
    .then(() => {
      appendChatMessage("Your information has been sent. Thank you!", "assistant");
    })
    .catch((err) => {
      console.error("Webhook failed:", err);
      appendChatMessage("There was an error sending your information.", "assistant");
    });
}

  document.addEventListener("keydown", function (event) {
    const chatInput = document.getElementById("chatInput");
    if (document.activeElement === chatInput && event.key === "Enter") {
      event.preventDefault();
      sendChat();
    }
  });

  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
  s.async = true;
  s.onload = function () {
 
  
    vapiInstance = window.vapiSDK.run({
      apiKey: apiKey,
      assistant: assistantId,
      config: buttonConfig,
	container: vapiBtnContainer  // Mount button inside specific container
    });

    vapiInstance.on("call-start", () => {
      isCallActive = true;
const chatOverlay = document.getElementById("vapiChatOverlay");
      if (chatOverlay) chatOverlay.style.display = "none";
const transcriptBox = document.getElementById("transcriptBox");
      if (transcriptBox) transcriptBox.style.display = "block";
    });

    vapiInstance.on("call-end", () => {
      isCallActive = false;
		const transcriptBox = document.getElementById("transcriptBox");
  if (transcriptBox) transcriptBox.style.display = "none";
    });

   vapiInstance.on("message", (message) => {
  if (message.type === "conversation-update") {
    currentChatId = message.conversation.id;
  }

  if (message.type === "transcript") {
    const role = message.role || "";
    const transcript = message.transcript?.trim() || "";
    const isPartial = message.transcriptType === "partial";

    if (!transcript) return;

    const box = document.getElementById("transcriptMessages");
    if (!box) return;

    // Handle partial messages by updating the last message
    if (isPartial) {
      // Update existing partial message
      if (lastPartialMessages[role]) {
        lastPartialMessages[role].textContent = transcript;
      } 
      // Create new partial message
      else {
        const messageDiv = createTranscriptMessage(transcript, role);
        box.appendChild(messageDiv);
        lastPartialMessages[role] = messageDiv;
      }
    } 
    // Handle final messages
    else {
      // Remove partial message if exists
      if (lastPartialMessages[role]) {
        box.removeChild(lastPartialMessages[role]);
        lastPartialMessages[role] = null;
      }
      
      // Create final message
      const messageDiv = createTranscriptMessage(transcript, role);
      box.appendChild(messageDiv);
    }

    // Always scroll to bottom
    box.scrollTop = box.scrollHeight;

    // Store last assistant transcript for text chat switching
    if (role === "assistant" && !isPartial) {
      lastAssistantTranscript = transcript;
    }

    // Handle switch to text command
    if (role === "user" && transcript.toLowerCase().includes("switch to text") && !isTextChat) {
      if (isCallActive && typeof vapiInstance.stop === "function") {
        vapiInstance.stop();
        isCallActive = false;
      }

      isTextChat = true;
      const chatOverlay = document.getElementById("vapiChatOverlay");
      const transcriptBox = document.getElementById("transcriptBox");
      if (chatOverlay) chatOverlay.style.display = "flex";
      if (transcriptBox) transcriptBox.classList.remove("active");

      setTimeout(() => {
        if (lastAssistantTranscript) {
          appendChatMessage(lastAssistantTranscript, "assistant");
          conversationHistory.push({
            role: "assistant",
            content: lastAssistantTranscript
          });
        }
      }, 300);
    }
  }
});

  };
  document.body.appendChild(s);
})();
// Add new helper functions
  window.closeTranscript = function() {
    const transcriptBox = document.getElementById("transcriptBox");
    transcriptBox.classList.remove("active");
    
    if (isCallActive && typeof vapiInstance.stop === "function") {
      vapiInstance.stop();
      isCallActive = false;
    }
  };
function closeChat() {
      document.getElementById("chatBox").style.display = "none";
    };
function closeChatOverlay() {
      document.getElementById("vapiChatOverlay").style.display = "none";
    };