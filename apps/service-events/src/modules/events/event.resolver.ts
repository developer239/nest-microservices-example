import { UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { GqlAuthGuard, Roles, RolesGuard, UserRole } from 'backend-shared'
import { CreateEventInput } from 'src/modules/events/inputs/create-event.input'
import { UpdateEventInput } from 'src/modules/events/inputs/update-event.input'
import { Event } from 'src/modules/events/models/event.model'
import { User } from 'src/modules/events/models/user.model'
import { EntityModelMapService } from 'src/modules/events/services/entity-model-map.service'
import { EventService } from 'src/modules/events/services/event.service'

type ExecutionContext = any

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly entityModelMapService: EntityModelMapService
  ) {}

  @Query(() => [Event])
  async events() {
    const events = await this.eventService.findAll()

    return this.entityModelMapService.mapEventToModelCollection(events)
  }

  @Query(() => Event)
  async event(@Args('id') id: string) {
    const event = await this.eventService.findOne(id)

    return this.entityModelMapService.mapEventToModel(event)
  }

  @ResolveField('attendees', () => [User])
  getAttendees(@Parent() event: Event) {
    const { attendees } = event
    return attendees.map((id) => ({ __typename: 'User', id }))
  }

  @ResolveField('owner', () => User)
  getOwner(@Parent() event: Event) {
    const { owner } = event
    return { __typename: 'User', id: owner }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Event)
  async createEvent(@Args('input') input: CreateEventInput) {
    const event = await this.eventService.create(input)

    return this.entityModelMapService.mapEventToModel(event)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Event)
  async updateEvent(
    @Args('id') id: string,
    @Args('input') input: UpdateEventInput
  ) {
    const event = await this.eventService.update(id, input)

    return this.entityModelMapService.mapEventToModel(event)
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => Boolean)
  deleteEvent(@Args('id') id: string) {
    return this.eventService.delete(id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  async attendEvent(
    @Args('id') id: string,
    @Context() context: ExecutionContext
  ) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const { userId } = request.headers

    await this.eventService.attendEvent(id, userId)

    const event = await this.eventService.findOne(id)
    return this.entityModelMapService.mapEventToModel(event)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Event)
  async unattendEvent(
    @Args('id') id: string,
    @Context() context: ExecutionContext
  ) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const { userId } = request.headers

    await this.eventService.unattendEvent(id, userId)

    const event = await this.eventService.findOne(id)
    return this.entityModelMapService.mapEventToModel(event)
  }
}
