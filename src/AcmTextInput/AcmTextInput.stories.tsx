/* Copyright Contributors to the Open Cluster Management project */

import '@patternfly/react-core/dist/styles/base.css'
import React, { useState } from 'react'
import { AcmForm } from '../AcmForm/AcmForm'
import { AcmTextInput } from './AcmTextInput'

export default {
    title: 'TextInput',
    component: AcmTextInput,
}

export const TextInput = () => {
    const [value, setValue] = useState<string>()

    return (
        <AcmForm>
            <AcmTextInput label="Label" id="123" value={value} onChange={setValue} />
            <AcmTextInput label="Secret" id="456" value={value} onChange={setValue} secret required />
        </AcmForm>
    )
}
