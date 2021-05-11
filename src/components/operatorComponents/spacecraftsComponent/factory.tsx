
    export interface Spacecraft {
        type: string;
        weight: number;
        seats: number;
        tankCapacity: number;
        motorImpulse: number;
        fridge: number;
    }

    export const SCsArray: Spacecraft[] = [
        {
            type: 'Falcon 21',
            weight: 21,
            seats: 4,
            tankCapacity: 6000,
            motorImpulse: 7000,
            fridge: 100,
        },
        {
            type: 'Falcon 20',
            weight: 25,
            seats: 5,
            tankCapacity: 6500,
            motorImpulse: 6000,
            fridge: 120,
        },
        {
            type: 'Dinasty 1',
            weight: 112,
            seats: 20,
            tankCapacity: 120000,
            motorImpulse: 42000,
            fridge: 1200,
        },
        {
            type: 'Fastreq 212',
            weight: 3,
            seats: 1,
            tankCapacity: 200,
            motorImpulse: 5000,
            fridge: 10,
        },
    ];