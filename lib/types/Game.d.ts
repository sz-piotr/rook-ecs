import { World } from './World';
import { System } from './systems';
export declare class Game {
    private _systems;
    private _world;
    constructor(systems: System[], init?: (world: World) => void);
    update(time: number): void;
    start(): void;
}
