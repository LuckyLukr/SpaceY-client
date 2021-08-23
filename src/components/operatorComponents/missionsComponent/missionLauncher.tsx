import { Grid } from "@material-ui/core"

import MissionInfo from "./missionInfo"


export default function MissionLauncher({ mission, onMissionChange, spacecraft, name, assigned }:any) {

    return (
        <Grid container justify='space-evenly'>
            <MissionInfo target={spacecraft} name={name} assigned={assigned} />

            <Grid>
                <p>Destination: {mission.destination}</p>
                <p>Spacecraft: {spacecraft.type}</p>
                <p>Astronauts on board: {mission.astronauts.length}</p>
                <p>Status: {mission.status}</p>
                <p>Blast off: {mission.blastOff}</p>
                <p>Landing time: {mission.landing}</p>
                <p>Distance: {mission.distance.toLocaleString()} km</p>
                <p>Mission time: {mission.time}</p>
                <br />
                <button style={{backgroundColor: 'red', padding: '15px'}}>
                    LAUNCH
                </button>
                <br />
                <button onClick={() => onMissionChange({})}>
                    BACK
                </button>
            </Grid>
        </Grid>
    )
}