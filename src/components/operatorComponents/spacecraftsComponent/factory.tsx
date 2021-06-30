import { Spacecraft } from '../../../types';

import falconImg from '../../../images/falcon.jpg'
import dinastyImg from '../../../images/starship.jpg'
import fastreqImg from '../../../images/fastreq.jpg'

    export const SCsArray: Spacecraft[] = [
        {   
            type: 'Falcon 21',
            weight: 21,
            seats: 4,
            tankCapacity: 6000,
            motorImpulse: 7000,
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
            tankCapacity: 6500,
            motorImpulse: 6000,
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
            weight: 112,
            seats: 20,
            tankCapacity: 120000,
            motorImpulse: 42000,
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
            weight: 3,
            seats: 1,
            tankCapacity: 200,
            motorImpulse: 5000,
            fridge: 10,
            onMission: false,
            destroyed: false,
            id: '3',
            name: 'unnamed',
            tankCondition: 100,
            img: fastreqImg
        },
    ];