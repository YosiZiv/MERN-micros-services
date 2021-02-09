import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@yztickets/tickets-common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
