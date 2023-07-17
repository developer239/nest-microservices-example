/* eslint-disable max-lines-per-function, max-lines */
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { WrappedConfigModule } from '@app/events/modules/config/config.module'
import { WrappedDatabaseModule } from '@app/events/modules/database/database.module'
import { EventTestingService } from '@app/events/modules/events/entities/event-testing.service'
import { EventsModule } from '@app/events/modules/events/events.module'
import { TestingDatabaseService } from '@shared/common/modules/testing/testing-database.service'
import { bootstrap } from '@shared/common/modules/testing/utilities'

describe('[events] controller', () => {
  let app: INestApplication
  let databaseService: TestingDatabaseService
  let testingEntityService: EventTestingService

  describe('GET /events', () => {
    it('should fetch events', async () => {
      // Arrange
      const data = await testingEntityService.createTestEvents(3)

      // Act
      const server = app.getHttpServer()
      const response = await request(server).get('/v1/events')

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual(data)
    })
  })

  describe('GET /events/:id', () => {
    it('should fetch event detail', async () => {
      // Arrange
      const { event } = await testingEntityService.createTestEvent()

      // Act
      const server = app.getHttpServer()
      const response = await request(server).get(`/v1/events/${event.id}`)

      // Assert
      expect(response.status).toBe(200)
      expect(response.body).toStrictEqual(event)
    })

    describe('when event does not exist', () => {
      it('should return 404', async () => {
        // Act
        const server = app.getHttpServer()
        const response = await request(server).get('/api/v1/events/1')

        // Assert
        expect(response.status).toBe(404)
      })
    })
  })

  // describe('POST /events', () => {
  //   it('should create new event', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //     const data = testingEntityService.createEventData()
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .post('/api/v1/events')
  //       .send(data)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(201)
  //     expect(response.body).toStrictEqual({
  //       id: expect.any(Number),
  //       ...data,
  //       owner: {
  //         ...user,
  //       },
  //     })
  //   })
  //
  //   describe('when user is not authenticated', () => {
  //     it('should return 401', async () => {
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server).post('/api/v1/events')
  //
  //       // Assert
  //       expect(response.status).toBe(401)
  //     })
  //   })
  // })
  //
  // describe('PATCH /events/:id', () => {
  //   it('should update event', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //     const data = await testingEntityService.createEvent(0, user.id)
  //
  //     const updatedData = testingEntityService.createEventData()
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .patch(`/api/v1/events/${data.id}`)
  //       .send(updatedData)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(200)
  //     expect(response.body).toStrictEqual({
  //       id: data.id,
  //       ...updatedData,
  //       owner: {
  //         ...user,
  //       },
  //       attendees: [],
  //     })
  //   })
  //
  //   describe('when user is not authenticated', () => {
  //     it('should return 401', async () => {
  //       // Arrange
  //       const { id } = await testingEntityService.createEvent(0)
  //
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server).patch(`/api/v1/events/${id}`)
  //
  //       // Assert
  //       expect(response.status).toBe(401)
  //     })
  //   })
  //
  //   describe('when user is not owner', () => {
  //     it('should return 403', async () => {
  //       // Arrange
  //       const { accessToken } =
  //         await testingEntityService.createAuthenticatedUser(jwtService)
  //       const data = await testingEntityService.createEvent(0)
  //
  //       const updatedData = testingEntityService.createEventData()
  //
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server)
  //         .patch(`/api/v1/events/${data.id}`)
  //         .set('Authorization', `Bearer ${accessToken}`)
  //         .send(updatedData)
  //
  //       // Assert
  //       expect(response.status).toBe(404)
  //     })
  //   })
  // })
  //
  // describe('DELETE /events/:id', () => {
  //   it('should delete event', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //
  //     const data = await testingEntityService.createEvent(2, user.id)
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .delete(`/api/v1/events/${data.id}`)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(200)
  //   })
  //
  //   describe('when user is not authenticated', () => {
  //     it('should return 401', async () => {
  //       // Arrange
  //       const { id } = await testingEntityService.createEvent(0)
  //
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server).delete(`/api/v1/events/${id}`)
  //
  //       // Assert
  //       expect(response.status).toBe(401)
  //     })
  //   })
  //
  //   describe('when user is not owner', () => {
  //     it('should return 404', async () => {
  //       // Arrange
  //       const { accessToken } =
  //         await testingEntityService.createAuthenticatedUser(jwtService)
  //
  //       const { id } = await testingEntityService.createEvent(0)
  //
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server)
  //         .delete(`/api/v1/events/${id}`)
  //         .set('Authorization', `Bearer ${accessToken}`)
  //
  //       // Assert
  //       expect(response.status).toBe(404)
  //     })
  //   })
  // })

  // describe('POST /events/:id/attendees/me', () => {
  //   it('should add me to attendees', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //
  //     const data = await testingEntityService.createEvent(0)
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .post(`/api/v1/events/${data.id}/attendees/me`)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(200)
  //     expect(response.body).toStrictEqual({
  //       ...data,
  //       attendees: [user],
  //     })
  //   })
  //
  //   describe('when user is not authenticated', () => {
  //     it('should return 401', async () => {
  //       // Arrange
  //       const { id } = await testingEntityService.createEvent(0)
  //
  //       // Act
  //       const server = app.getHttpServer()
  //       const response = await request(server).post(
  //         `/api/v1/events/${id}/attendees/me`
  //       )
  //
  //       // Assert
  //       expect(response.status).toBe(401)
  //     })
  //   })
  //
  //   // TODO:
  //   // describe('when user is already attendee', () => {
  //   //
  //   // })
  // })
  //
  // describe('DELETE /events/:id/attendees/me', () => {
  //   it('should add remove me from attendees', async () => {
  //     // Arrange
  //     const { user, accessToken } =
  //       await testingEntityService.createAuthenticatedUser(jwtService)
  //
  //     const data = await testingEntityService.createEvent(0, undefined, user.id)
  //
  //     // Act
  //     const server = app.getHttpServer()
  //     const response = await request(server)
  //       .delete(`/api/v1/events/${data.id}/attendees/me`)
  //       .set('Authorization', `Bearer ${accessToken}`)
  //
  //     // Assert
  //     expect(response.status).toBe(200)
  //     expect(response.body).toStrictEqual({
  //       ...data,
  //       attendees: [],
  //     })
  //   })
  //
  //   // TODO:
  //   // describe('when user not in attendees', () => {
  //   //
  //   // })
  // })

  //
  //
  // setup

  beforeAll(async () => {
    app = await bootstrap({
      imports: [WrappedConfigModule, WrappedDatabaseModule, EventsModule],
      providers: [EventTestingService],
    })

    databaseService = app.get(TestingDatabaseService)
    testingEntityService = app.get(EventTestingService)
  })

  beforeEach(async () => {
    await databaseService.clearDb()
  })

  afterAll(async () => {
    await databaseService.dataSource.destroy()
  })
})
