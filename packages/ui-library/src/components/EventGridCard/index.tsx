import { ReactNode } from 'react'
import clsx from 'clsx'
import { Card } from '../Card'
import { ISOStringToReadable } from '../../utils/date.ts'
import UserIcon from '../Icons/UserIcon.tsx'
import { IEventUI } from '../../types.ts'

export type EventGridCardProps = {
  isDetail?: boolean
  event: IEventUI
  className?: string
  renderAttendanceButton?: (event: IEventUI) => ReactNode
}

// TODO: replace "a" with "Link" from "react-router-dom"

export const EventGridCard = ({
  isDetail,
  event,
  className,
  renderAttendanceButton,
}: EventGridCardProps) => (
  <Card
    className={clsx('flex flex-col h-full p-[2.4rem] md:p-[3.2rem]', className)}
  >
    <a
      href={isDetail ? undefined : `/event/${event.id}`}
      className="flex flex-col"
    >
      <span className="text-gray-chateau text-xs font-primary">
        {ISOStringToReadable(event.startsAt)}
      </span>
      <span className="first-letter:uppercase mt-[0.5rem] text-limed-spruce text-xl font-primary">
        {event.title}
      </span>
      <span className="text-boulder text-sm font-primary">
        {event.owner.firstName} {event.owner.lastName}
      </span>
    </a>
    <p className="first-letter:uppercase flex-grow my-[3.2rem] text-regent-gray text-base font-primary line-clamp-3">
      {event.description}
    </p>
    <div className="flex flex-grow items-end justify-between mt-[3rem]">
      <div className="flex items-center justify-center">
        <UserIcon className="w-[2.4rem] h-[2.4rem] mt-[-0.2rem] mr-[0.4rem] fill-regent-gray" />
        <span className="text-regent-gray text-sm font-primary">
          {event.attendees.length} of {event.capacity}
        </span>
      </div>
      {renderAttendanceButton && renderAttendanceButton(event)}
    </div>
  </Card>
)
