import { UUID } from "node:crypto"

export type MonitoringFilter = {
    serviceUUID: UUID
    name?: string
}