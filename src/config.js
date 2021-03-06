let config = {
    spawner: {
        baseSpawnTimeSeconds: 2,
        wavesPerLevel: 10,
        levelsPerSpeedUp: 5,
        speedUpExponent: 3/4,
        slowLevelSpeed: 0,
        probabilitySlowLevel: 0.1,
        probabilityBoringObstacle: 0.7
    },
    physics: {
        delta: 15
    },
    game: {
        baseObstacleSpeed: 5,
        specialMoveHeight: 0.3
    }
};

export default config;
