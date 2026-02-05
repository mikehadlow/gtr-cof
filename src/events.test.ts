import { describe, expect, test } from 'bun:test';
import { Bus } from './events';

describe('Bus class', () => {
    describe('constructor', () => {
        test('creates a bus with the given name', () => {
            const bus = new Bus<string>('testBus');
            expect(bus).toBeInstanceOf(Bus);
        });
    });

    describe('subscribe', () => {
        test('adds a listener that receives published events', () => {
            const bus = new Bus<number>('numberBus');
            const received: number[] = [];

            bus.subscribe((n) => received.push(n));
            bus.publish(42);

            expect(received).toEqual([42]);
        });

        test('allows multiple listeners', () => {
            const bus = new Bus<string>('stringBus');
            const received1: string[] = [];
            const received2: string[] = [];

            bus.subscribe((s) => received1.push(s));
            bus.subscribe((s) => received2.push(s));
            bus.publish('hello');

            expect(received1).toEqual(['hello']);
            expect(received2).toEqual(['hello']);
        });

        test('listeners receive events in subscription order', () => {
            const bus = new Bus<void>('voidBus');
            const callOrder: number[] = [];

            bus.subscribe(() => callOrder.push(1));
            bus.subscribe(() => callOrder.push(2));
            bus.subscribe(() => callOrder.push(3));
            bus.publish();

            expect(callOrder).toEqual([1, 2, 3]);
        });
    });

    describe('publish', () => {
        test('does nothing when there are no listeners', () => {
            const bus = new Bus<number>('emptyBus');
            // Should not throw
            expect(() => bus.publish(123)).not.toThrow();
        });

        test('calls listener with the exact event object', () => {
            const bus = new Bus<{ value: number }>('objectBus');
            const received: Array<{ value: number }> = [];
            const event = { value: 42 };

            bus.subscribe((e) => received.push(e));
            bus.publish(event);

            expect(received.length).toBe(1);
            expect(received[0]).toBe(event);
        });

        test('calls all listeners for each publish', () => {
            const bus = new Bus<number>('countBus');
            let callCount = 0;

            bus.subscribe(() => callCount++);
            bus.subscribe(() => callCount++);

            bus.publish(1);
            expect(callCount).toBe(2);

            bus.publish(2);
            expect(callCount).toBe(4);
        });

        test('handles complex event types', () => {
            type ComplexEvent = {
                readonly nodes: string[];
                readonly mode: { name: string };
            };

            const bus = new Bus<ComplexEvent>('complexBus');
            const received: ComplexEvent[] = [];

            bus.subscribe((e) => received.push(e));

            const event: ComplexEvent = {
                nodes: ['A', 'B', 'C'],
                mode: { name: 'test' }
            };
            bus.publish(event);

            expect(received.length).toBe(1);
            expect(received[0]).toEqual(event);
            expect(received[0].nodes).toEqual(['A', 'B', 'C']);
            expect(received[0].mode.name).toBe('test');
        });
    });

    describe('resubscribe', () => {
        test('adds new listener when index is -1', () => {
            const bus = new Bus<number>('resubBus');
            const received: number[] = [];

            const index = bus.resubscribe((n) => received.push(n), -1);
            bus.publish(10);

            expect(received).toEqual([10]);
            expect(index).toBe(0);
        });

        test('returns correct index for first subscription', () => {
            const bus = new Bus<string>('indexBus');

            const index = bus.resubscribe(() => {}, -1);

            expect(index).toBe(0);
        });

        test('returns incrementing indices for multiple subscriptions', () => {
            const bus = new Bus<string>('multiIndexBus');

            const index1 = bus.resubscribe(() => {}, -1);
            const index2 = bus.resubscribe(() => {}, -1);
            const index3 = bus.resubscribe(() => {}, -1);

            expect(index1).toBe(0);
            expect(index2).toBe(1);
            expect(index3).toBe(2);
        });

        test('replaces listener at existing index', () => {
            const bus = new Bus<number>('replaceBus');
            const received1: number[] = [];
            const received2: number[] = [];

            const index = bus.resubscribe((n) => received1.push(n), -1);
            bus.publish(1);

            bus.resubscribe((n) => received2.push(n), index);
            bus.publish(2);

            expect(received1).toEqual([1]);
            expect(received2).toEqual([2]);
        });

        test('returns same index when replacing', () => {
            const bus = new Bus<void>('sameIndexBus');

            const originalIndex = bus.resubscribe(() => {}, -1);
            const replacedIndex = bus.resubscribe(() => {}, originalIndex);

            expect(replacedIndex).toBe(originalIndex);
        });

        test('preserves other listeners when replacing one', () => {
            const bus = new Bus<number>('preserveBus');
            const receivedA: number[] = [];
            const receivedB: number[] = [];
            const receivedC: number[] = [];

            bus.resubscribe((n) => receivedA.push(n), -1);
            const indexB = bus.resubscribe((n) => receivedB.push(n * 10), -1);
            bus.resubscribe((n) => receivedC.push(n), -1);

            bus.publish(1);
            expect(receivedA).toEqual([1]);
            expect(receivedB).toEqual([10]);
            expect(receivedC).toEqual([1]);

            // Replace middle listener
            bus.resubscribe((n) => receivedB.push(n * 100), indexB);
            bus.publish(2);

            expect(receivedA).toEqual([1, 2]);
            expect(receivedB).toEqual([10, 200]);
            expect(receivedC).toEqual([1, 2]);
        });
    });

    describe('integration scenarios', () => {
        test('simulates state change event flow', () => {
            type StateChangedEvent = { state: { tonic: string } };
            const bus = new Bus<StateChangedEvent>('stateChange');

            const uiUpdates: string[] = [];
            const persistedStates: string[] = [];

            // Multiple modules subscribe
            bus.subscribe((e) => uiUpdates.push(`UI: ${e.state.tonic}`));
            bus.subscribe((e) => persistedStates.push(`Save: ${e.state.tonic}`));

            // State changes
            bus.publish({ state: { tonic: 'C' } });
            bus.publish({ state: { tonic: 'G' } });

            expect(uiUpdates).toEqual(['UI: C', 'UI: G']);
            expect(persistedStates).toEqual(['Save: C', 'Save: G']);
        });

        test('simulates hot module replacement pattern', () => {
            const bus = new Bus<number>('hmrBus');
            const results: number[] = [];

            // First version of module subscribes
            let moduleIndex = bus.resubscribe((n) => results.push(n * 2), -1);
            bus.publish(5);
            expect(results).toEqual([10]);

            // Module hot reloads, resubscribes at same index
            moduleIndex = bus.resubscribe((n) => results.push(n * 3), moduleIndex);
            bus.publish(5);
            expect(results).toEqual([10, 15]);
        });
    });
});
