import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import '@testing-library/jest-dom/extend-expect'
import Button from '../components/Button'
import theme from '../components/Theme'

describe('Home', () => {
  it('renders a heading', () => {
    render(<ThemeProvider theme = {theme}> <Button buttonType='Default' text='anomot' handleClick={undefined}/> </ThemeProvider>)

    const heading = screen.getByRole('button', {
      name: "anomot",
    })

    expect(heading).toBeInTheDocument()
  })
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<ThemeProvider theme = {theme}> <Button buttonType='Solid' text='anomot' handleClick={undefined}/> </ThemeProvider>)

    const heading = screen.getByRole('button', {
      name: "anomot",
    })

    expect(heading).toBeInTheDocument()
  })
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<ThemeProvider theme = {theme}> <Button buttonType='Secondary' text='anomot' handleClick={undefined}/> </ThemeProvider>)

    const heading = screen.getByRole('button', {
      name: "anomot",
    })

    expect(heading).toBeInTheDocument()
  })
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<ThemeProvider theme = {theme}> <Button buttonType='Teriatary' text='anomot' handleClick={undefined}/> </ThemeProvider>)

    const heading = screen.getByRole('button', {
      name: "anomot",
    })

    expect(heading).toBeInTheDocument()
  })
})

jest.mock('next-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str:any) => str
    };
  },
}));