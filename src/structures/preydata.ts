import {BonusType, PreyState} from "../constants/const";

export class PreyData {
    state: PreyState = PreyState.STATE_LOCKED;
    preyList: string[] = [];
    timeLeft = 0;
    lastReroll = 0;
    bonusType: BonusType = BonusType.BONUS_NONE;
    bonusGrade = 0;
    bonusValue = 0;
    preyMonster: string = null;
}