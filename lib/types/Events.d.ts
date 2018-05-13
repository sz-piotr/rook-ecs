export declare type Event = {
    type: string;
    timeDelta: number;
};
export declare class Events {
    private _events;
    private _eventTimes;
    emit(event: string | Event, time: number): void;
    get(eventType: string): Event[];
    clear(): void;
}
