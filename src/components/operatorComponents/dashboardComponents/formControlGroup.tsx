import {
    FormGroup,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";

export default function FormControlGroup( {
    filter,
    onAll,
    onSuccess,
    onFailed,
    onInProgress
}:any) {

    return(
            <FormGroup row>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filter === 'all'}
                        onChange={onAll}
                        name="All"
                        color="primary"
                    />
                    }
                    label="All missions"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filter === 'success'}
                        onChange={onSuccess}
                        name="Success"
                        color="primary"
                    />
                    }
                    label="Succeeded missions"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filter === 'failed'}
                        onChange={onFailed}
                        name="Failed"
                        color="primary"
                    />
                    }
                    label="Failed missions"
                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={filter === 'progress'}
                        onChange={onInProgress}
                        name="Progress"
                        color="primary"
                    />
                    }
                    label="Missions in progress"
                />
            </FormGroup>
    )
}