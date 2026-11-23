import { illustrativeSlots } from "../config/booking";
export interface AvailabilityProvider {
  getSlots(date: Date, service: string): readonly string[];
}
// Adaptador ilustrativo: não consulta nem reserva disponibilidade real.
export const demoAvailability: AvailabilityProvider = {
  getSlots: (_date, _service) => [...illustrativeSlots],
};
