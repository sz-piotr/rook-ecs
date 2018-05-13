import { Entity } from './Entity';
import { Event } from './Events';
import { World } from './World';
import { Query } from './Query';
import { Selector } from './selectors';
export declare type System = StandardSystem | MultiQuerySystem | IterativeSystem;
export interface StandardSystem {
    query?: Selector;
    on?: string;
    process(entites: Entity[], world: World, event: Event): void;
}
export interface MultiQuerySystem {
    query?: Selector[];
    on?: string;
    process(entites: Entity[][], world: World, event: Event): void;
}
export interface IterativeSystem {
    query: (entity: Entity) => boolean;
    on?: string;
    processEntity(entity: Entity, world: World, event: Event): void;
}
export interface InternalSystem {
    query?: Query;
    on: string;
    process(entites: Entity[] | Entity[][], world: World, event: Event): void;
}
export declare function toInternalSystem(system: System): InternalSystem;
