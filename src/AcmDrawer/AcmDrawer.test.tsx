/* Copyright Contributors to the Open Cluster Management project */

import React from 'react'
import { MemoryRouter, Route, Link } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { AcmDrawer, AcmDrawerContext, AcmDrawerProvider } from './AcmDrawer'
import { AcmButton } from '../AcmButton/AcmButton'

describe('AcmDrawer', () => {
    const onCloseClick = jest.fn()
    test('renders in an open state', () => {
        render(<AcmDrawer title="Drawer" onCloseClick={onCloseClick} isExpanded={true} />)
        expect(screen.getByText('Drawer')).toBeInTheDocument()
    })
    test('renders in a closed state', () => {
        render(<AcmDrawer title="Drawer" onCloseClick={onCloseClick} isExpanded={false} />)
        expect(screen.queryByText('Drawer')).toBeNull()
    })
    test('haz zero accessibility defects', async () => {
        const { container } = render(<AcmDrawer title="Drawer" onCloseClick={onCloseClick} isExpanded={true} />)
        expect(screen.getByText('Drawer')).toBeInTheDocument()
        expect(await axe(container)).toHaveNoViolations()
    })

    describe('using context', () => {
        const Component = () => (
            <MemoryRouter initialEntries={['/drawer']}>
                <AcmDrawerProvider>
                    <AcmDrawer>
                        <Route path="/drawer">
                            <AcmDrawerContext.Consumer>
                                {({ setDrawerContext }) => (
                                    <div style={{ height: '100vh' }}>
                                        <AcmButton
                                            onClick={() =>
                                                setDrawerContext({
                                                    isExpanded: true,
                                                    title: 'Drawer title',
                                                    onCloseClick: () => setDrawerContext(undefined),
                                                    panelContent: <div id="test-content" />,
                                                })
                                            }
                                        >
                                            Open
                                        </AcmButton>
                                        <Link to="/empty">New page</Link>
                                    </div>
                                )}
                            </AcmDrawerContext.Consumer>
                        </Route>
                        <Route path="/empty">
                            <div id="no-drawer"></div>
                        </Route>
                    </AcmDrawer>
                </AcmDrawerProvider>
            </MemoryRouter>
        )
        test('should render', async () => {
            render(<Component />)
            expect(screen.queryByText('Drawer title')).toBeNull()
            expect(screen.getByText('Open')).toBeInTheDocument()
            userEvent.click(screen.getByText('Open'))
            await waitFor(() => expect(screen.getByText('Drawer title')).toBeInTheDocument())
            expect(screen.getByTestId('test-content')).toBeInTheDocument()
            expect(screen.getByLabelText('Close drawer panel')).toBeInTheDocument()
            userEvent.click(screen.getByLabelText('Close drawer panel'))
            await waitFor(() => expect(screen.queryByText('Drawer title')).toBeNull())

            // test location change
            expect(screen.queryByTestId('no-drawer')).toBeNull()
            expect(screen.getByText('Open')).toBeInTheDocument()
            userEvent.click(screen.getByText('Open'))
            await waitFor(() => expect(screen.getByText('Drawer title')).toBeInTheDocument())
            expect(screen.getByText('New page')).toBeInTheDocument()
            userEvent.click(screen.getByText('New page'))
            await waitFor(() => expect(screen.getByTestId('no-drawer')).toBeInTheDocument())
            await waitFor(() => expect(screen.queryByText('Drawer title')).toBeNull())
        })
    })
})
