import VehicleDetailsClient from "./VehicleDetailsClient"
import { vehicleAPI } from "../../../lib/api/vehicles"

export default async function VehicleDetailsPage({ params }) {
  const result = await vehicleAPI.getVehicleById(params.id)

  return (
    <VehicleDetailsClient
      vehicleId={params.id}
      initialVehicle={result.success ? result.data : null}
      initialError={result.success ? null : result.error}
    />
  )
}
