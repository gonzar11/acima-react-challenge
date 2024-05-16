describe('App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render the Header component', () => {
    cy.get('header').should('exist')
  })

  it('should render the ItemsTablesWrapper component', () => {
    cy.get('[data-testid="items-tables-wrapper"]').should('exist')
  })

  it('should render the Calculator component', () => {
    cy.get('[data-testid="calculator"]').should('exist')
  })

  it('should display the result in Calculator after calculation', () => {
    cy.get('[data-testid="input"]').type('A+B')
    cy.get('[data-testid="calculate-button"]').click()
    cy.get('[data-testid="result"]').should('contain.text', '$ ')
  })

  it('should display an error message for invalid input', () => {
    cy.get('[data-testid="input"]').type('InvalidInput')
    cy.get('[data-testid="calculate-button"]').click()
    cy.get('[data-testid="error-message"]').should('exist')
  })
})

describe('Home Page Responsiveness', () => {
  const sizes = [
    { device: 'iphone-6', width: 375, height: 667 },
    { device: 'desktop', width: 1280, height: 800 },
  ]

  sizes.forEach((size) => {
    it(`should render correctly on ${size.device}`, () => {
      cy.viewport(size.width, size.height)

      cy.visit('/')

      cy.get('header').should('be.visible')

      cy.get('[data-testid="children-container"]').should('exist').within(() => {
        if (size.device === 'iphone-6') {
          cy.get('*').should('be.visible')
        } else {
          cy.get('*').should('not.be.visible')
        }
      })

      cy.get('[data-testid="items-tables-wrapper-container"]').should('exist').within(() => {
        if (size.device === 'iphone-6') {
          cy.get('[data-testid="items-tables-wrapper"]').should('not.be.visible')
        } else {
          cy.get('[data-testid="items-tables-wrapper"]').should('be.visible')
        }
      })
    })
  })
})
