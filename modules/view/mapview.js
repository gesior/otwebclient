import { g_map } from "../map";
import { g_game } from "../game";
export class MapView {
    constructor() {
    }
    init() {
        const awareRange = g_map.getAwareRange();
        var mapViewContainer = document.getElementById('mapview');
        //for (let z = 0; z <= Otc.MAX_Z + 1; ++z) {
        for (let y = 0; y < awareRange.vertical(); ++y) {
            for (let x = 0; x < awareRange.horizontal(); ++x) {
                var content = document.createElement('div');
                content.setAttribute('id', this.getTileId(x, y, 0));
                content.innerText = this.getTileId(x, y, 0);
                mapViewContainer.appendChild(content);
            }
        }
        //}
    }
    draw() {
        const awareRange = g_map.getAwareRange();
        for (let y = 0; y < awareRange.vertical(); ++y) {
            for (let x = 0; x < awareRange.horizontal(); ++x) {
                let tileContainer = this.getTile(x, y, 0);
                let tile = g_game.getLocalPlayer().getTile();
                var text = ''; //'<img src="http://inditex.localhost/prv/imgup/mynet/X_datain_854/' + tile.getGround().rawGetThingType().getSprites()[0] + '.png">';
                var things = tile.m_things;
                for (const thing of things) {
                    const sprite = thing.rawGetThingType().getSprites()[0];
                    console.error(thing.rawGetThingType());
                    text = text + '<img src="http://inditex.localhost/prv/imgup/mynet/X_datain_854/' + sprite + '.png">';
                }
                var creatures = tile.getCreatures();
                for (const creature of creatures) {
                    text = text + '<img src="http://outfit-images.ots.me/idleOutfits1092/outfit.php?id=' + creature.m_outfit.m_id
                        + '&addons=' + creature.m_outfit.m_addons
                        + '&head=' + creature.m_outfit.m_head
                        + '&body=' + creature.m_outfit.m_body
                        + '&legs=' + creature.m_outfit.m_legs
                        + '&feet=' + creature.m_outfit.m_feet
                        + '&mount=' + creature.m_outfit.m_mount
                        + '&direction=' + creature.m_direction
                        + '">';
                }
                tileContainer.innerHTML = text;
            }
        }
    }
    clear() {
        const awareRange = g_map.getAwareRange();
        for (let y = 0; y < awareRange.vertical(); ++y) {
            for (let x = 0; x < awareRange.horizontal(); ++x) {
                let tile = this.getTile(x, y, 0);
                tile.innerHTML = '<img src="https://avatars2.githubusercontent.com/u/864393?s=40&v=4" alt="@bigtimebuddy">';
            }
        }
    }
    getTileId(x, y, z) {
        return 'tile-' + x + '-' + y;
    }
    getTile(x, y, z) {
        return document.getElementById(this.getTileId(x, y, z));
    }
}
let g_mapview = new MapView();
export { g_mapview };
//# sourceMappingURL=mapview.js.map