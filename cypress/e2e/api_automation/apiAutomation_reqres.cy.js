describe('API Testing Automation using Cypress', () => {
    it('List User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=2',
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
            expect(response.body.data).to.be.an('array')
        })
    })

    it('Single User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
        })
    })
    it('Create Record', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                 name: "morpheus",
                 job: "leader"
             },
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
        })
    })
    it('Register unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            failOnStatusCode: false, 
            body: {
                email: "sydney@fife"
             },
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.eq('Missing password')
        }) 
        
    })
    it('login unsuccessful', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            failOnStatusCode: false, 
            body: {
                "email": "peter@klaven"
             },
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.eq('Missing password')
        }) 
        
    })

     it('Update Using PUT', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            body: {
                name: "morpheus",
                job: "zion resident"
             },
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
            expect(response.body.name).to.eq('morpheus')
            expect(response.body.job).to.eq('zion resident')
        }) 
        
    })

    it('Update Using Patch', () => {
        cy.request({
            method: 'Patch',
            url: 'https://reqres.in/api/users/2',
            body: {
                name: "morpheus",
                job: "zion resident"
             },
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('job')
            expect(response.body.name).to.eq('morpheus')
            expect(response.body.job).to.eq('zion resident')
        }) 
        
    })

     it('Delete', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
            expect(response.body).to.be.empty

        }) 
        
    })

    
    it('Get List <resource>', () => {
    cy.request({
        method: 'GET',
        url: 'https://reqres.in/api/unknown',
        headers: {
                'x-api-key': 'reqres_9f0b63fcfc894c77ac2fab1d661cd9c1',
            }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.page).to.be.a('number')
        expect(response.body.per_page).to.be.a('number')
        expect(response.body.total).to.be.a('number')
        expect(response.body.total_pages).to.be.a('number')
        expect(response.body.data).to.be.an('array')
      
        })
    })
    
})
