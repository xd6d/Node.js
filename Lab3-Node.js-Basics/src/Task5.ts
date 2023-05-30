class MyEventEmitter {
    private events: Map<string, Function> = new Map<string, Function>()
    registerHandler(eventName: string, func: Function) {
        this.events.set(eventName, func)
    }

    emitEvent(eventName: string) {
        let func = this.events.get(eventName)
        if (func)
            func()
    }
}

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено
