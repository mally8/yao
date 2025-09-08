![YAO Showcase](/assets/yao-showcase.png)
# YAO
A simple ACT/IINACT overlay inspired by a LMeter profile preset with a few adjustments UI wise.

### Usage on IINACT + Browsingway / or any other HUD that can show a webpage.
Create a new profile in Browsingway and add;
`https://mally8.github.io/yao/?OVERLAY_WS=ws://127.0.0.1:10501/ws`
If that doesn't show any data then make sure the websocket address is the same as whats written in IINACT.

### Usage on ACT.
I have not tested how it works in ACT's OverlayPlugin but if the above link doesn't work maybe just using `https://mally8.github.io/yao/` works.

## Settings
![Settings Picture](/assets/setting.png)
Click on the "YAO" element show the settings.
1. Colors: Class based or Role based.
2. Formatted Nums: Format numbers and abbreviate them to something like 32,2k (not implemented yet).
3. Show Fake Data: will show a fake 8 man encounter to help you setup the overlay how you like it!

Features I might implement later:
1. A modal to show more player stats when clicking on a player.
2. A toggle to hide max hit stat.
