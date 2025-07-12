class UniversalGiveawayTool {
    constructor() {
        this.platform = 'twitch';
        this.channel = '';
        this.participants = new Map();
        this.winners = [];
        this.isConnected = false;
        this.isDrawing = false;
        this.chatClient = null;
        this.totalEntries = 0;
        
        this.initializeElements();
        this.setupEventListeners();
        this.loadSettings();
        this.updateStats();
    }

    initializeElements() {
        this.elements = {
            twitchBtn: document.getElementById('twitch-btn'),
            kickBtn: document.getElementById('kick-btn'),
            channelInput: document.getElementById('channel-input'),
            keywordInput: document.getElementById('keyword-input'),
            winnerCountInput: document.getElementById('winner-count'),
            subOnlyCheckbox: document.getElementById('sub-only'),
            subMultiplierInput: document.getElementById('sub-multiplier'),
            minFollowTimeInput: document.getElementById('min-follow-time'),
            animationSelect: document.getElementById('animation-type'),
            connectBtn: document.getElementById('connect-btn'),
            status: document.getElementById('status'),
            participantsList: document.getElementById('participants-list'),
            participantCount: document.getElementById('participant-count'),
            participantFilterSelect: document.getElementById('participant-filter-select'),
            drawBtn: document.getElementById('draw-btn'),
            resetBtn: document.getElementById('reset-btn'),
            exportBtn: document.getElementById('export-btn'),
            winnersList: document.getElementById('winners-list'),
            winnerCountDisplay: document.getElementById('winner-count-display'),
            clearWinnersBtn: document.getElementById('clear-winners-btn'),
            winnerModal: document.getElementById('winner-modal'),
            winnerAnimation: document.getElementById('winner-animation'),
            modalOkBtn: document.getElementById('modal-ok-btn'),
            // Stats
            totalParticipants: document.getElementById('total-participants'),
            totalWinners: document.getElementById('total-winners'),
            totalEntries: document.getElementById('total-entries'),
            connectionStatus: document.getElementById('connection-status')
        };
    }

    setupEventListeners() {
        this.elements.twitchBtn.addEventListener('click', () => this.setPlatform('twitch'));
        this.elements.kickBtn.addEventListener('click', () => this.setPlatform('kick'));
        this.elements.connectBtn.addEventListener('click', () => this.toggleConnection());
        this.elements.drawBtn.addEventListener('click', () => this.drawWinner());
        this.elements.resetBtn.addEventListener('click', () => this.reset());
        this.elements.exportBtn.addEventListener('click', () => this.exportResults());
        this.elements.clearWinnersBtn.addEventListener('click', () => this.clearWinners());
        this.elements.modalOkBtn.addEventListener('click', () => this.closeModal());
        this.elements.participantFilterSelect.addEventListener('change', () => this.updateParticipantsList());
        
        // Save settings on change
        ['keywordInput', 'winnerCountInput', 'subOnlyCheckbox', 'subMultiplierInput', 'minFollowTimeInput', 'animationSelect'].forEach(key => {
            this.elements[key].addEventListener('change', () => this.saveSettings());
        });

        // Real-time validation
        this.elements.channelInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
        });
    }

    setPlatform(platform) {
        this.platform = platform;
        this.elements.twitchBtn.classList.toggle('active', platform === 'twitch');
        this.elements.kickBtn.classList.toggle('active', platform === 'kick');
        
        if (this.isConnected) {
            this.disconnect();
        }
        
        this.saveSettings();
    }

    async toggleConnection() {
        if (this.isConnected) {
            this.disconnect();
        } else {
            await this.connect();
        }
    }

    async connect() {
        const channel = this.elements.channelInput.value.trim();
        if (!channel) {
            alert('Please enter a channel name');
            return;
        }

        this.elements.connectBtn.disabled = true;
        this.elements.connectBtn.textContent = '🔄 Connecting...';
        this.updateStatus('Connecting to chat...', 'waiting');

        try {
            // Simulate connection for demo purposes
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.channel = channel;
            this.isConnected = true;
            this.elements.connectBtn.textContent = '🔌 Disconnect';
            this.elements.drawBtn.disabled = false;
            
            const keyword = this.elements.keywordInput.value.trim();
            const statusText = keyword ? 
                `Connected! Waiting for "${keyword}"` : 
                'Connected! Entries are open!';
            this.updateStatus(statusText, 'connected');
            
            // Start demo message simulation
            this.startDemoMessages();
            
        } catch (error) {
            console.error('Connection error:', error);
            this.updateStatus(`Connection failed: ${error.message}`, 'error');
        } finally {
            this.elements.connectBtn.disabled = false;
            this.updateStats();
        }
    }

    disconnect() {
        this.isConnected = false;
        this.elements.connectBtn.textContent = '🔌 Connect';
        this.elements.drawBtn.disabled = true;
        this.updateStatus('Disconnected', 'disconnected');
        this.updateStats();
    }

    startDemoMessages() {
        // Simulate chat messages for demo
        const demoUsers = [
            { name: 'StreamerFan123', badges: { subscriber: true } },
            { name: 'GamerGirl456', badges: { vip: true } },
            { name: 'ChatUser789', badges: {} },
            { name: 'SubViewer001', badges: { subscriber: true } },
            { name: 'ModeratorBot', badges: { mod: true } },
            { name: 'VipMember99', badges: { vip: true } },
            { name: 'NewFollower', badges: {} }
        ];

        let messageIndex = 0;
        const messageInterval = setInterval(() => {
            if (!this.isConnected) {
                clearInterval(messageInterval);
                return;
            }

            const user = demoUsers[messageIndex % demoUsers.length];
            const keyword = this.elements.keywordInput.value.trim();
            const message = keyword || '!giveaway';
            
            // Add some randomness to when messages appear
            if (Math.random() < 0.3) {
                this.processMessage(user.name, message, user.badges);
            }
            
            messageIndex++;
        }, 3000);
    }

    processMessage(username, message, badges) {
        const keyword = this.elements.keywordInput.value.trim().toLowerCase();
        const messageText = message.trim().toLowerCase();
        
        // Check if message matches keyword requirement
        if (keyword && !messageText.includes(keyword)) return;
        
        // Check if already participated
        if (this.participants.has(username)) return;
        
        // Check subscriber only requirement
        if (this.elements.subOnlyCheckbox.checked && !badges.subscriber) return;
        
        // Add participant
        const multiplier = badges.subscriber ? parseInt(this.elements.subMultiplierInput.value) : 1;
        this.participants.set(username, { badges, entries: multiplier });
        
        this.updateParticipantsList();
        this.updateStats();
    }

    updateParticipantsList() {
        const list = this.elements.participantsList;
        const filter = this.elements.participantFilterSelect.value;
        list.innerHTML = '';
        
        let filteredParticipants = [...this.participants.entries()];
        
        if (filter !== 'all') {
            filteredParticipants = filteredParticipants.filter(([username, data]) => {
                switch (filter) {
                    case 'subscribers': return data.badges.subscriber;
                    case 'vips': return data.badges.vip;
                    case 'mods': return data.badges.mod;
                    default: return true;
                }
            });
        }
        
        filteredParticipants.reverse().forEach(([username, data]) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${username}</span>
                <span>${data.entries}x</span>
            `;
            
            if (data.badges.subscriber) li.classList.add('subscriber');
            else if (data.badges.vip) li.classList.add('vip');
            else if (data.badges.mod) li.classList.add('mod');
            
            list.appendChild(li);
        });
        
        this.elements.participantCount.textContent = this.participants.size;
    }

    async drawWinner() {
        if (this.isDrawing || this.participants.size === 0) return;
        
        this.isDrawing = true;
        this.elements.drawBtn.disabled = true;
        this.elements.drawBtn.textContent = '🎲 Drawing...';
        
        // Create entry pool based on multipliers
        const entryPool = [];
        this.participants.forEach((data, username) => {
            for (let i = 0; i < data.entries; i++) {
                entryPool.push(username);
            }
        });
        
        const winnerCount = Math.min(
            parseInt(this.elements.winnerCountInput.value),
            this.participants.size
        );
        
        const drawnWinners = [];
        const tempPool = [...entryPool];
        
        for (let i = 0; i < winnerCount; i++) {
            const randomIndex = Math.floor(Math.random() * tempPool.length);
            const winner = tempPool[randomIndex];
            drawnWinners.push(winner);
            
            // Remove all entries for this winner
            for (let j = tempPool.length - 1; j >= 0; j--) {
                if (tempPool[j] === winner) {
                    tempPool.splice(j, 1);
                }
            }
            
            // Remove from participants
            this.participants.delete(winner);
        }
        
        // Show winner animation
        await this.showWinnerAnimation(drawnWinners);
        
        // Add to winners list
        drawnWinners.forEach(winner => {
            this.winners.push({
                name: winner,
                timestamp: new Date().toISOString(),
                platform: this.platform
            });
        });
        
        this.updateWinnersList();
        this.updateParticipantsList();
        this.updateStats();
        this.saveSettings();
        
        this.isDrawing = false;
        this.elements.drawBtn.disabled = this.participants.size === 0;
        this.elements.drawBtn.textContent = '🎲 Draw Winner';
    }

    async showWinnerAnimation(winners) {
        this.elements.winnerModal.style.display = 'flex';
        
        for (const winner of winners) {
            await this.animateWinner(winner);
        }
        
        return new Promise(resolve => {
            this.elements.modalOkBtn.onclick = () => {
                this.closeModal();
                resolve();
            };
        });
    }

    async animateWinner(finalWinner) {
        const animationType = this.elements.animationSelect.value;
        
        return new Promise(resolve => {
            let frame = 0;
            const maxFrames = 80;
            
            const animate = () => {
                if (frame >= maxFrames) {
                    this.elements.winnerAnimation.textContent = finalWinner;
                    this.elements.winnerAnimation.className = `winner-animation ${this.platform}-color`;
                    setTimeout(resolve, 2000);
                    return;
                }
                
                switch (animationType) {
                    case 'scramble':
                        this.elements.winnerAnimation.textContent = this.scrambleText(finalWinner, frame / maxFrames);
                        break;
                    case 'typewriter':
                        this.elements.winnerAnimation.textContent = this.typewriterEffect(finalWinner, frame / maxFrames);
                        break;
                    default:
                        // Classic animation - cycle through random participants
                        const participantNames = Array.from(this.participants.keys());
                        if (participantNames.length > 0) {
                            const randomName = participantNames[Math.floor(Math.random() * participantNames.length)];
                            this.elements.winnerAnimation.textContent = randomName;
                        }
                        break;
                }
                
                frame++;
                setTimeout(animate, 50);
            };
            
            animate();
        });
    }

    scrambleText(text, progress) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        const revealCount = Math.floor(text.length * progress);
        
        for (let i = 0; i < text.length; i++) {
            if (i < revealCount) {
                result += text[i];
            } else {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        
        return result;
    }

    typewriterEffect(text, progress) {
        const visibleLength = Math.floor(text.length * progress);
        return text.substring(0, visibleLength) + (progress < 1 ? '|' : '');
    }

    closeModal() {
        this.elements.winnerModal.style.display = 'none';
    }

    updateWinnersList() {
        const list = this.elements.winnersList;
        list.innerHTML = '';
        
        this.winners.slice().reverse().forEach((winner, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${winner.name}</span>
                <span class="timestamp">${new Date(winner.timestamp).toLocaleString()}</span>
            `;
            list.appendChild(li);
        });
        
        this.elements.winnerCountDisplay.textContent = this.winners.length;
    }

    reset() {
        if (confirm('Are you sure you want to reset all participants?')) {
            this.participants.clear();
            this.updateParticipantsList();
            this.updateStats();
            this.elements.drawBtn.disabled = true;
        }
    }

    clearWinners() {
        if (confirm('Are you sure you want to clear all winners?')) {
            this.winners = [];
            this.updateWinnersList();
            this.updateStats();
        }
    }

    exportResults() {
        const data = {
            participants: Array.from(this.participants.entries()),
            winners: this.winners,
            platform: this.platform,
            channel: this.channel,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `giveaway-results-${this.channel}-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    updateStatus(message, type) {
        this.elements.status.textContent = message;
        this.elements.status.className = `status ${type}`;
    }

    updateStats() {
        this.totalEntries = Array.from(this.participants.values()).reduce((sum, data) => sum + data.entries, 0);
        
        if (this.elements.totalParticipants) {
            this.elements.totalParticipants.textContent = this.participants.size;
        }
        if (this.elements.totalWinners) {
            this.elements.totalWinners.textContent = this.winners.length;
        }
        if (this.elements.totalEntries) {
            this.elements.totalEntries.textContent = this.totalEntries;
        }
        if (this.elements.connectionStatus) {
            this.elements.connectionStatus.textContent = this.isConnected ? 'Connected' : 'Disconnected';
            this.elements.connectionStatus.className = this.isConnected ? 'connected' : 'disconnected';
        }
    }

    saveSettings() {
        const settings = {
            platform: this.platform,
            keyword: this.elements.keywordInput.value,
            winnerCount: this.elements.winnerCountInput.value,
            subOnly: this.elements.subOnlyCheckbox.checked,
            subMultiplier: this.elements.subMultiplierInput.value,
            minFollowTime: this.elements.minFollowTimeInput.value,
            animationType: this.elements.animationSelect.value
        };
        
        // In a real environment, you would save to localStorage
        // localStorage.setItem('giveawaySettings', JSON.stringify(settings));
        console.log('Settings saved:', settings);
    }

    loadSettings() {
        // In a real environment, you would load from localStorage
        // const saved = localStorage.getItem('giveawaySettings');
        // if (saved) {
        //     const settings = JSON.parse(saved);
        //     this.platform = settings.platform || 'twitch';
        //     this.elements.keywordInput.value = settings.keyword || '';
        //     this.elements.winnerCountInput.value = settings.winnerCount || '1';
        //     this.elements.subOnlyCheckbox.checked = settings.subOnly || false;
        //     this.elements.subMultiplierInput.value = settings.subMultiplier || '2';
        //     this.elements.minFollowTimeInput.value = settings.minFollowTime || '0';
        //     this.elements.animationSelect.value = settings.animationType || 'classic';
        //     this.setPlatform(this.platform);
        // }
        
        // Default settings for demo
        this.platform = 'twitch';
        this.elements.keywordInput.value = '!giveaway';
        this.elements.winnerCountInput.value = '1';
        this.elements.subOnlyCheckbox.checked = false;
        this.elements.subMultiplierInput.value = '2';
        this.elements.minFollowTimeInput.value = '0';
        this.elements.animationSelect.value = 'classic';
        this.setPlatform(this.platform);
    }
}
