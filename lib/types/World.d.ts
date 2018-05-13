import { Entity } from './Entity';
import { Event } from './Events';
import { Query } from './Query';
export interface World {
    readonly time: number;
    createEntity(assemblage?: (entity: Entity) => void): Entity;
    removeEntity(entity: Entity): void;
    emit(event: Event | string): void;
}
export declare class GameWorld implements World {
    private _queries;
    private _changedEntities;
    private _removedEntities;
    private _events;
    private _time?;
    constructor(_queries: Query[]);
    readonly time: number;
    createEntity(assemblage?: (entity: Entity) => void): Entity;
    private _onEntityChange;
    removeEntity(entity: Entity): void;
    emit(event: Event | string): void;
    _internal_getEvents(type: string): Event[];
    _internal_tick(time: number): void;
    _internal_handleChanges(): void;
}
