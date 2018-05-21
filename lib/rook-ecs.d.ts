export interface ComponentClass<T> {
	new (...args: any[]): T;
	id: string;
}
export declare class Entity {
	private _components;
	private _changeRegistered;
	private _registerChange?;
	readonly id: number;
	constructor(_registerChange?: (entity: Entity) => void);
	add(instance: any): this;
	has(componentClass: ComponentClass<any>): boolean;
	get<T>(componentClass: ComponentClass<T>): T;
	remove(componentClass: ComponentClass<any>): this;
	private _onChange();
}
export declare type Event = {
	type: string;
	timeDelta: number;
};
export declare type Selector = (entity: Entity) => boolean;
export declare function hasAll(...components: ComponentClass<any>[]): Selector;
export declare function hasAny(...components: ComponentClass<any>[]): Selector;
export interface World {
	readonly time: number;
	createEntity(assemblage?: (entity: Entity) => void): Entity;
	removeEntity(entity: Entity): void;
	emit(event: Event | string): void;
}
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
export declare class Game {
	private _systems;
	private _world;
	constructor(systems: System[], init?: (world: World) => void);
	update(time: number): void;
	start(): void;
}