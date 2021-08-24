import {Destination} from '../../types';

import moon from '../../images/moon.jpg';
import mars from '../../images/mars.jpg';
import station from '../../images/space_station.jpg';

export const destinations: Destination[] = [
    {
        name: 'SPACE-Y Station',
        distance: 20048,
        image: station
    },
    {
        name: 'Moon',
        distance: 363104,
        image: moon
    },
    {
        name: 'Mars',
        distance: 54654214,
        image: mars
    },
]