import { Spacecraft } from '../../../types';

import falconImg from '../../../images/falcon.jpg'
import dinastyImg from '../../../images/starship.jpg'
import fastreqImg from '../../../images/fastreq.jpg'

    export const SCsArray: Spacecraft[] = [
        {   
            type: 'Falcon 21',
            weight: 21,
            seats: 4,
            tankCapacity: 16000,
            motorImpulse: 36000,
            fuelConsumption: 60,
            fridge: 100,
            onMission: false,
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
            tankCapacity: 10000,
            motorImpulse: 29880,
            fuelConsumption: 50,
            fridge: 120,
            onMission: false,
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
            tankCapacity: 150000,
            motorImpulse: 48000,
            fuelConsumption: 50,
            fridge: 1200,
            onMission: false,
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
            tankCapacity: 3000,
            motorImpulse: 28800,
            fuelConsumption: 30,
            fridge: 10,
            onMission: false,
            destroyed: false,
            id: '3',
            name: 'unnamed',
            tankCondition: 100,
            img: fastreqImg
        },
    ];