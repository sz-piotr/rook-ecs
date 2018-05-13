import { ComponentClass } from './components';
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
export declare function notifyAfterChangeRegistered(entity: Entity): void;
