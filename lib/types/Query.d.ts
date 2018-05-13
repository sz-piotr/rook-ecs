import { Entity } from './Entity';
import { Selector } from './selectors';
export declare function createQuery(selectors: Selector | Selector[]): Query;
export declare type Query = SingleQuery | MultiQuery;
export declare class SingleQuery {
    private _entities;
    private _indexMap;
    private _selector;
    constructor(_selector: Selector);
    readonly entities: Entity[];
    onChange(entity: Entity): void;
    onRemove(entity: Entity): void;
}
export declare class MultiQuery {
    private _queries;
    constructor(_selectors: Selector[]);
    readonly entities: Entity[][];
    onChange(entity: Entity): void;
    onRemove(entity: Entity): void;
}
