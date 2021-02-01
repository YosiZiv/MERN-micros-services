import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@yztickets/tickets-common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
