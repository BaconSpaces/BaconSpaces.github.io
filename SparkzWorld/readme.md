# SparkzWorld 🌆

A full-featured open-world roleplay game built with HTML5, Three.js, and vanilla JavaScript. Experience life in a dynamic city with multiple careers, vehicles, NPCs, and an immersive day/night cycle.

## 🎮 Features

### Game Modes
- **Civilian Mode** - Explore the city, take jobs, buy vehicles, earn money
- **Police Mode** - Respond to callouts, arrest criminals, maintain order
- **EMS Mode** - Respond to medical emergencies, revive injured citizens
- **Admin Mode** - Full control over the world with god mode, weather, time manipulation

### Core Systems
- 🌍 **Dynamic World** - 26 unique buildings, parks, landmarks, and NPCs
- 🚗 **Vehicle System** - Drive civilian cars, police cruisers, ambulances, sports cars
- 🧑‍💼 **Career System** - 12 different jobs including taxi driver, mechanic, chef, developer
- 💰 **Economy** - Earn money, visit shops, banks, manage wealth
- 📊 **Progression** - XP system with levels and achievements
- 🏆 **Achievements** - Unlock achievements for completing tasks
- 🗺️ **Minimap** - Real-time minimap with compass
- 🎁 **Inventory** - Collect and use items with real effects
- 💾 **Save System** - Auto-save and manual game saves

### Environmental Features
- 🌅 **Day/Night Cycle** - 24-hour in-game time cycle
- 🌧️ **Dynamic Weather** - Sunny, rainy, foggy, and storm conditions
- 💡 **Street Lighting** - Functional street lamps throughout the city
- ⭐ **Stars & Moon** - Night sky visibility
- 🌲 **Nature** - 80+ trees, parks, and green spaces

### Police & EMS Features
- 📡 **Dispatch System** - Receive callouts and respond to emergencies
- 🚔 **Arrest System** - Apprehend criminals with charges
- 🩹 **Medical Response** - Revive injured NPCs
- ⭐ **Wanted System** - 5-star wanted level system

### Admin Tools
- ⚡ **God Mode** - Invulnerable to damage
- 👻 **No Clip** - Walk through walls
- ✈️ **Fly Mode** - Unlimited movement in all directions
- 🎮 **Vehicle Spawner** - Spawn any vehicle type
- 🕐 **Time Control** - Set in-game time to any hour
- 🌦️ **Weather Control** - Change weather conditions
- 📍 **Teleport** - Jump to any coordinates
- 💰 **Money Spawning** - Give yourself money

## 🎮 Controls

### Movement (On Foot)
- **W/A/D** - Move forward/left/right
- **Shift** - Sprint (drains stamina)
- **Space** - Jump
- **C** - Crouch
- **Mouse Right Click + Move** - Look around

### Vehicle Controls
- **W** - Accelerate forward
- **Shift** - Brake/Reverse
- **A/D** - Turn left/right
- **Arrow Keys** - Alternative movement controls

### General
- **E** - Interact with NPCs, buildings, vehicles
- **F** - Enter/Exit vehicles
- **Tab** - Open Inventory
- **H** - Open Shop
- **J** - Open Job Board
- **B** - Open Bank
- **M** - Open Admin Panel (Admin mode only)
- **/** - Open Command Console
- **ESC** - Pause menu

## 📦 Items & Inventory

### Health Items
- 🍔 **Burger** - $25 - Restore 20 HP
- 🩹 **Medical Kit** - $150 - Restore 50 HP
- 🩺 **Medical Bag** - $200 - Restore 75 HP (EMS)

### Utility Items
- 📱 **Smartphone** - $800 - Contact NPCs and access services
- 🗺️ **City Map** - $100 - Reveals all locations on minimap
- 🔑 **Lockpick** - $300 - Crack vehicle locks
- 📻 **Police Scanner** - $600 - Monitor police frequency

### Equipment
- 🛡️ **Body Armor** - $500 - Add 50 Armor
- ⚡ **Energy Drink** - $50 - Restore Stamina
- ⚡ **Defibrillator** - EMS item - Revive patients
- ⛓️ **Handcuffs** - Police item - Apprehend suspects
- ⚡ **Admin Badge** - Admin item - Full system access

## 💼 Jobs

### Entry Level
1. **Pizza Delivery** - $40-80 per delivery
2. **Fisherman** - $60-200 per catch
3. **Taxi Driver** - $80-150 per run
4. **Energy Drink** - $50 per drink

### Mid Level
5. **Garbage Collector** - $120 per shift
6. **Street Artist** - $50-150 per piece
7. **Photographer** - $100-300 per shoot
8. **Construction Worker** - $180 per shift

### High Level
9. **Mechanic** - $200 per repair
10. **Security Guard** - $150-250 per shift
11. **Chef** - $250-400 per shift
12. **Developer** - $500 per project

## 🏗️ World Locations

### Key Buildings
- 🏛️ **City Hall** - Central landmark with iconic dome
- 🏢 **Downtown District** - Tall buildings and offices
- 🏥 **Hospital** - North side, red cross symbol
- 🚔 **Police Station** - West side with blue signage
- 🏦 **SparkzBank** - South side banking hub
- ⛽ **Gas Station** - Gas station with convenience shop
- 🏞️ **Parks** - Green spaces with trees
- 💧 **Water Tower** - Southwest corner landmark

## 💾 Save System

- **Auto-Save** - Game saves every minute
- **Manual Save** - Save from pause menu
- **Load Game** - Load from main menu
- **Save Data** - Stored in browser localStorage

## 🎯 Achievements

Unlock these achievements for extra XP:
- 👟 **First Steps** - Take your first steps
- 💼 **Working 9-5** - Complete your first job
- 💰 **Money Bags** - Earn $50,000
- ⭐ **Rising Star** - Reach Level 5
- 🚔 **Law Enforcer** - Make your first arrest (Police)
- ❤️ **Lifesaver** - Revive your first patient (EMS)

## 🔧 Command Console

Press **/** to open the command console and enter commands:

- `/tp x z` - Teleport to coordinates
- `/car [type]` - Spawn a vehicle (civilian, police, ambulance, sport)
- `/heal` - Fully heal yourself
- `/god` - Toggle god mode
- `/weather [type]` - Change weather (sunny, rain, fog, storm)
- `/time [0-24]` - Set in-game time
- `/money [amount]` - Give yourself money
- `/noclip` - Toggle no-clip mode
- `/spectate` - Toggle spectator mode
- `/wanted [0-5]` - Set wanted level
- `/arrest` - Trigger arrest prompt
- `/help` - Show all commands

## 🖥️ Technical Details

### Technology Stack
- **Engine**: Three.js (3D rendering)
- **Language**: JavaScript (ES6+)
- **Platform**: Web-based (runs in any modern browser)
- **Save Data**: Browser localStorage

### Performance Features
- Dynamic shadow mapping
- Post-processing effects
- Fog-based distance culling
- Efficient NPC and vehicle management
- Optimized for 60 FPS

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. Choose your character and customize appearance
3. Select your game mode (Civilian, Police, EMS, or Admin)
4. Start playing!

## 💡 Tips

- Start with entry-level jobs to earn money
- Buy items from shops to boost your stats
- Check the minimap to navigate the city
- Use the police scanner as Police/EMS to get callouts
- Build up your level to unlock achievements
- Explore the world to find all locations
- Use admin mode for creative freedom and testing

## 🐛 Known Features

- Day/night cycle transitions smoothly
- Weather affects visibility and gameplay
- NPCs have AI pathfinding
- Vehicle AI traffic simulation
- Wanted level system with enforcement
- Arrest and injury recovery systems

## 📝 Version

**SparkzWorld v1.0.0 - ALPHA**

This is an alpha release. More features and improvements coming soon!

## 🎨 Customization

The game supports character customization:
- Choose from 3 unique characters (Alex, Maya, Dante)
- Select skin tone and clothing colors
- Each mode has unique appearance variations

---

**Enjoy your time in SparkzWorld! 🌟**
