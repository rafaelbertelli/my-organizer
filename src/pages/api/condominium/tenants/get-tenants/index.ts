import { ErrorHttp, SuccessHttp } from "@/backend/domain/http-response"
import { Tenant } from "@/backend/domain/tenant"
import dbConnect from "@/backend/infra/db/connection/mongo-connection"
import TenantModel from "@/backend/infra/db/model/tenant.model"
import { HttpStatusCode } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessHttp<Tenant[]> | ErrorHttp>
) {
  try {
    const { method } = req

    if (method !== "GET") {
      return res
        .setHeader("Allow", ["GET"])
        .status(HttpStatusCode.MethodNotAllowed)
        .json({ success: false, error: `Method ${method} Not Allowed` })
    }

    await dbConnect()

    const tenants = await TenantModel.find({})
    const result = tenants.map(t => new Tenant({ id: t._id, name: t.name, apartment: t.apartment }))

    return res.json({ success: true, result })
  } catch (error) {
    return res.status(HttpStatusCode.InternalServerError).json({ success: false, error })
  }
}
