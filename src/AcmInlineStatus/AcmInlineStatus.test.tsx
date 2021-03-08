/* Copyright Contributors to the Open Cluster Management project */

import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { configureAxe } from 'jest-axe'
import React from 'react'
import { AcmInlineStatus, StatusType } from './AcmInlineStatus'
const axe = configureAxe({
    rules: {
        'aria-progressbar-name': { enabled: false },
    },
})

describe('AcmInlineStatus', () => {
    Object.values(StatusType).forEach((type) => {
        test(`has zero accessibility defects - (${type})`, async () => {
            const { container } = render(<AcmInlineStatus type={type} status="foobar" />)
            expect(await axe(container)).toHaveNoViolations()
        })
    })
    test('should allow a popover window on click', async () => {
        const { getByText } = render(
            <AcmInlineStatus
                type={StatusType.healthy}
                status="foobar"
                popover={{
                    headerContent: 'Header',
                    bodyContent: 'Some information about the status here.',
                    footerContent: <a href="#">Status link</a>,
                }}
            />
        )
        expect(getByText('foobar')).toBeInTheDocument()
        userEvent.click(getByText('foobar'))
        await waitFor(() => expect(getByText('Header')).toBeInTheDocument())
    })
    test('should allow a popover window on click with statustext', async () => {
        const { getByText } = render(
            <AcmInlineStatus
                type={StatusType.healthy}
                status="foobar"
                popover={{
                    headerContent: 'Header',
                    bodyContent: 'Some information about the status here.',
                    footerContent: <a href="#">Status link</a>,
                }}
                statusText="barfoo"
            />
        )
        expect(getByText('foobar')).toBeInTheDocument()
        expect(getByText('barfoo (')).toBeInTheDocument()
        userEvent.click(getByText('foobar'))
        await waitFor(() => expect(getByText('Header')).toBeInTheDocument())
    })
})
