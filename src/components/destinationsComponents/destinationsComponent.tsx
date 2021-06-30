import {Destination} from '../../types';

import moon from '../../images/moon.jpg';
import mars from '../../images/mars.jpg';
import station from '../../images/space_station.jpg';
import refuel from '../../images/refuel.png';

export const destinations: Destination[] = [
    {
        name: 'SPACE-Y Station',
        distance: 84205,
        image: station
    },
    {
        name: 'Moon',
        distance: 363104,
        image: moon
    },
    {
        name: 'M1-Y Refuel Station',
        distance: 18218071,
        image: refuel
    },
    {
        name: 'M2-Y Refuel Station',
        distance: 36436142,
        image: refuel
    },
    {
        name: 'Mars',
        distance: 54654214,
        image: mars
    },
]