/* Copyright Contributors to the Open Cluster Management project */

import React from 'react'
import { Card, CardBody } from '@patternfly/react-core'
import { ExternalLinkAltIcon } from '@patternfly/react-icons'
import { AcmInlineStatus, StatusType } from './AcmInlineStatus'

export default {
    title: 'InlineStatus',
    component: AcmInlineStatus,
    argTypes: {
        type: {
            control: { type: 'select', options: Object.values(StatusType) },
        },
        status: { type: 'string' },
    },
}

export const InlineStatus = (args) => {
    return (
        <Card>
            <CardBody>
                <AcmInlineStatus type={args.type} status={args.status} />
            </CardBody>
        </Card>
    )
}

export const InlineStatusWithPopover = () => {
    return (
        <Card>
            <CardBody>
                <AcmInlineStatus
                    type={StatusType.healthy}
                    status="Ready"
                    popover={{
                        headerContent: 'Status header',
                        bodyContent: 'Some information about the status here.',
                        footerContent: (
                            <a href="#">
                                Status link <ExternalLinkAltIcon />
                            </a>
                        ),
                    }}
                />
            </CardBody>
        </Card>
    )
}

export const InlineStatusWithPopoverAsNestedLink = () => {
    return (
        <Card>
            <CardBody>
                <AcmInlineStatus
                    type={StatusType.healthy}
                    status="Action available"
                    popover={{
                        headerContent: 'Status header',
                        bodyContent: 'Some information about the status here.',
                        footerContent: (
                            <a href="#">
                                Status link <ExternalLinkAltIcon />
                            </a>
                        ),
                    }}
                    statusText="Connection valid"
                />
            </CardBody>
        </Card>
    )
}

InlineStatus.args = {
    status: 'Ready',
    type: StatusType.healthy,
}
