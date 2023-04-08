import { GetTenantsHttp, Tenant } from "@/backend/domain/tenant"
import dbConnect from "@/backend/infra/db/connection/mongo-connection"
import TenantModel from "@/backend/infra/db/model/tenant.model"
import type { NextApiRequest, NextApiResponse } from "next"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTenantsHttp>
) {
  try {
    const { method } = req

    if (method !== "GET") {
      res.setHeader("Allow", ["GET"])
      return res.status(405).json({ success: false, error: `Method ${method} Not Allowed` })
    }

    await dbConnect()

    const tenants = await TenantModel.find({})
    const result = tenants.map(t =>
      new Tenant({ id: t._id, tenant: t.tenant, apartment: t.apartment }))

    return res.status(200).json({ success: true, data: result })
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
