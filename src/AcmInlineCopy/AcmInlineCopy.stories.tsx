/* Copyright Contributors to the Open Cluster Management project */

import React from 'react'
import { Card, CardBody } from '@patternfly/react-core'
import { AcmInlineCopy } from './AcmInlineCopy'

export default {
    title: 'InlineCopy',
    component: AcmInlineCopy,
}

export const InlineCopy = () => {
    return (
        <Card>
            <CardBody>
                <AcmInlineCopy text="Copy me" />
            </CardBody>
        </Card>
    )
}
