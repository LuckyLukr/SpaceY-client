import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    formGroup: {
        width: '100%',
        justifyContent: 'space-between'
    }
}))

export default function FormControlGroup( {
    filter,
    onAll,
    onSuccess,
    onFailed,
    onInProgress
}:any) {

    const classes = useStyles();

    return(
            <FormGroup row className={classes.formGroup}>
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