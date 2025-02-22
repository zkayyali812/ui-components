/* Copyright Contributors to the Open Cluster Management project */

import '@patternfly/react-core/dist/styles/base.css'
import React, { useState } from 'react'
import { Meta } from '@storybook/react'
import { ButtonVariant, ModalVariant } from '@patternfly/react-core'
import { AcmPageCard } from '../AcmPage/AcmPage'
import { AcmModal } from './AcmModal'
import { AcmButton } from '../'

const meta: Meta = {
    title: 'Modal',
    component: AcmModal,
    argTypes: {
        title: { type: 'string' },
        message: { type: 'string' },
        variant: {
            control: { type: 'select', options: Object.values(ModalVariant) },
        },
        titleIconVariant: {
            control: { type: 'select', options: ['success', 'danger', 'warning', 'info', 'default'] },
        },
    },
}
export default meta

export const Modal = (args) => {
    const [open, toggleOpen] = useState<boolean>(true)
    const toggle = () => toggleOpen(!open)
    return (
        <AcmPageCard>
            <AcmButton onClick={toggle}>Open Modal</AcmButton>
            <AcmModal
                variant={args.variant}
                titleIconVariant={args.titleIconVariant}
                isOpen={open}
                title={args.title}
                actions={[
                    <AcmButton key="confirm" variant={ButtonVariant.primary} onClick={toggle}>
                        Submit
                    </AcmButton>,
                    <AcmButton key="cancel" variant={ButtonVariant.link} onClick={toggle}>
                        Cancel
                    </AcmButton>,
                ]}
            >
                {args.message}
            </AcmModal>
        </AcmPageCard>
    )
}
Modal.args = {
    title: 'ACM Modal',
    message: 'Modal message here',
}
