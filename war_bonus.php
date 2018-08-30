<?php
$guildWarBonuses_fragsForBonus = 200;
$guildWarBonuses_minLevelOfKilledPlayer = 130;
$guildWarBonuses_maxFragsPerPlayerPerDay = 4;

$guildId = 3;

$rows = [[], []];
foreach ([0, 1] as $bonus) {
    $frags_list = $SQL->query(
        'SELECT k.id, dp.name, pd.player_id, pd.level, pd.`date` as timestamp, GROUP_CONCAT(kp.name) AS killers, FLOOR(pd.`date` / 86400) AS day ' .
        'FROM `killers` k ' .
        'INNER JOIN `player_deaths` pd ON `k`.`death_id` = `pd`.`id` ' .
        'INNER JOIN `player_killers` pk ON `pk`.`kill_id` = `k`.`id` ' .
        'INNER JOIN `players` kp ON `kp`.`id` = `pk`.`player_id` ' .
        'INNER JOIN `players` dp ON `dp`.`id` = `pd`.`player_id` ' .
        'WHERE k.bonus = ' . $bonus . ' AND k.war > 0 AND k.guild_id = ' . $guildId . ' ' .
        'GROUP BY `k`.`death_id` ORDER BY pd.`date` ASC'
    )->fetchAll();


    $playerDeathsThisDay = [];
    $fragsCount = 0;
    $lastKillDay = 0;
    if (count($frags_list) > 0) {
        foreach ($frags_list as $frag) {
            $killersId = $frag["id"];
            $killedPlayerId = $frag["player_id"];
            $killedPlayerName = $frag["name"];
            $killersNames = explode(',', $frag["killers"]);
            $level = $frag["level"];
            $date = $frag["timestamp"];
            $killDay = $frag["day"];

            if ($lastKillDay != $killDay) {
                $lastKillDay = $killDay;
                $playerDeathsThisDay = [];
            }

            if (!isset($playerDeathsThisDay[$killedPlayerId]))
                $playerDeathsThisDay[$killedPlayerId] = 0;

            $playerDeathsThisDay[$killedPlayerId]++;

            $skip = false;
            if ($level < $guildWarBonuses_minLevelOfKilledPlayer)
                $skip = 'Too low level.';
            elseif ($playerDeathsThisDay[$killedPlayerId] > $guildWarBonuses_maxFragsPerPlayerPerDay)
                $skip = 'Too many frags on player this day.';
            else
                $fragsCount++;
            //print(fragsCount, guildId, killedPlayerId, level, os . date('%c', dd))

            var_dump($skip, $fragsCount,$level,$date,$killedPlayerId, $killedPlayerName);
            if ($fragsCount == $guildWarBonuses_fragsForBonus) {
                $fragsCount = 0;
                $lastKillDay = 0;
            }
        }
    } else {
        echo 'nie ma fragow do bonusa';
    }
}

