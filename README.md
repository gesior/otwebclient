# OTWebClient

Open Tibia Client written in TypeScript. Based on edubart/otclient.

**ALPHA VERSION** - project is not working in most cases, all features are experimental.
Until now I made it parse TibianicCamPlayer movie files, 
connect to server (and handle incoming packets) and generate screenshots of game view.
Generating one frame of view takes around 2 seconds on high-end gaming PC, so it's unplayable.

To connect to server it requires websocket-proxy server.

It was only tested with server Kasteria 8.54 protocol.
