import { UUID } from "node:crypto"

export type MonitoringFilter = {
    name?: string
    serviceUUID: UUID
}