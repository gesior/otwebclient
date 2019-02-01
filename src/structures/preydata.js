import { BonusType, PreyState } from "../constants/const";
export class PreyData {
    constructor() {
        this.state = PreyState.STATE_LOCKED;
        this.preyList = [];
        this.timeLeft = 0;
        this.lastReroll = 0;
        this.bonusType = BonusType.BONUS_NONE;
        this.bonusGrade = 0;
        this.bonusValue = 0;
        this.preyMonster = null;
    }
}
//# sourceMappingURL=preydata.js.map