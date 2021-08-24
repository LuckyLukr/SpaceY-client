import { Spacecraft } from '../../../types';

import falconImg from '../../../images/falcon.jpg'
import dinastyImg from '../../../images/starship.jpg'
import fastreqImg from '../../../images/fastreq.jpg'

    export const SCsArray: Spacecraft[] = [
        {   
            type: 'Falcon 21',
            weight: 21,
            seats: 4,
            tankCapacity: 280000,
            motorImpulse: 36000,
            fuelConsumption: 3,
            startCombustion: 3500,
            landingCombustion: 800,
            fridge: 10,
            status: 'on Earth',
            destroyed: false,
            id: '0',
            name: 'unnamed',
            tankCondition: 100,
            img: falconImg
        },
        {
            type: 'Falcon 20',
            weight: 25,
            seats: 5,
            tankCapacity: 300000,
            motorImpulse: 29880,
            fuelConsumption: 3,
            startCombustion: 3600,
            landingCombustion: 815,
            fridge: 15,
            status: 'on Earth',
            destroyed: false,
            id: '1',
            name: 'unnamed',
            tankCondition: 100,
            img: falconImg
        },
        {
            type: 'Dinasty 1',
            weight: 182,
            seats: 20,
            tankCapacity: 3200000,
            motorImpulse: 48000,
            fuelConsumption: 2,
            startCombustion: 26000,
            landingCombustion: 8000,
            fridge: 1000,
            status: 'on Earth',
            destroyed: false,
            id: '2',
            name: 'unnamed',
            tankCondition: 100,
            img: dinastyImg
        },
        {
            type: 'Fastreq 212',
            weight: 10,
            seats: 1,
            tankCapacity: 10000,
            motorImpulse: 28800,
            fuelConsumption: 10,
            startCombustion: 100,
            landingCombustion: 30,
            fridge: 1,
            status: 'on Earth',
            destroyed: false,
            id: '3',
            name: 'unnamed',
            tankCondition: 100,
            img: fastreqImg
        },
    ];