import { Entity } from './Entity';
import { ComponentClass } from './components';
export declare type Selector = (entity: Entity) => boolean;
export declare function hasAll(...components: ComponentClass<any>[]): Selector;
export declare function hasAny(...components: ComponentClass<any>[]): Selector;
