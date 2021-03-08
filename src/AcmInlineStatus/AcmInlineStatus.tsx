/* Copyright Contributors to the Open Cluster Management project */

import React from 'react'
import { Spinner, Popover, PopoverProps, Button } from '@patternfly/react-core'
import {
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    MinusCircleIcon,
    UnknownIcon,
    AsleepIcon,
} from '@patternfly/react-icons'
import { AcmIcon, AcmIconVariant } from '../AcmIcons/AcmIcons'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    container: {
        display: 'flex',
    },
    icon: {
        width: '18px', // Progress size md is 18px
    },
    iconMargin: {
        margin: '3px 2px 1px 2px',
    },
    button: {
        padding: 0,
        fontSize: 'inherit',
    },
})

export enum StatusType {
    'healthy' = 'healthy',
    'danger' = 'danger',
    'warning' = 'warning',
    'progress' = 'progress',
    'detached' = 'detached',
    'pending' = 'pending',
    'unknown' = 'unknown',
    'sleep' = 'sleep',
}

export function AcmInlineStatus(props: { type: StatusType; status: string | React.ReactNode; popover?: PopoverProps; statusText?: string }) {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.icon}>
                <StatusIcon type={props.type} />
            </div>
            <span style={{ marginLeft: '.4rem' }}>
                {props.popover && props.statusText ? (
                    <span>{props.statusText + " ("}</span>
                ) : (undefined)}
                 {props.popover ? (
                     <Popover hasAutoWidth {...props.popover}>
                         <Button variant="link" className={classes.button}>
                             {props.status}
                         </Button>
                     </Popover>
                 ) : (
                     props.status
                 )}
                {props.popover && props.statusText ? (
                    <span>{")"}</span>
                ) : (undefined)}
            </span>
        </div>
    )
}

function StatusIcon(props: { type: StatusType }) {
    const classes = useStyles()
    switch (props.type) {
        case StatusType.healthy:
            return <CheckCircleIcon className={classes.iconMargin} color="var(--pf-global--success-color--100)" />
        case StatusType.danger:
            return <ExclamationCircleIcon className={classes.iconMargin} color="var(--pf-global--danger-color--100)" />
        case StatusType.warning:
            return (
                <ExclamationTriangleIcon className={classes.iconMargin} color="var(--pf-global--warning-color--100)" />
            )
        case StatusType.progress:
            return <Spinner size="md" style={{ verticalAlign: 'middle' }} />
        case StatusType.detached:
            return <AcmIcon icon={AcmIconVariant.brokenlink} />
        case StatusType.pending:
            return <MinusCircleIcon className={classes.iconMargin} color="var(--pf-global--disabled-color--100)" />
        case StatusType.sleep:
            return <AsleepIcon className={classes.iconMargin} color="var(--pf-global--disabled-color--100)" />
        case 'unknown':
        default:
            return <UnknownIcon className={classes.iconMargin} color="var(--pf-global--disabled-color--100)" />
    }
}
