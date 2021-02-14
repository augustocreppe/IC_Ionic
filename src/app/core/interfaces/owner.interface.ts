import { VehicleInterface } from './vehicle.interface';

export interface OwnerInterface {
  id: number,
  name: string,
  email: string,
  cpf: string,
  birthdate: string,
  cep: string,
  phone: string,
  type: string,
  active: boolean,
  vehicles: VehicleInterface[]
}
