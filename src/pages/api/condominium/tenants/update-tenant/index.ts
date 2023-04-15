import { ErrorHttp, SuccessHttp } from "@/backend/domain/http-response"
import { Tenant } from "@/backend/domain/tenant"
import dbConnect from "@/backend/infra/db/connection/mongo-connection"
import TenantModel from "@/backend/infra/db/model/tenant.model"
import { HttpStatusCode } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessHttp<string> | ErrorHttp>
) {
  try {
    const { method, body } = req

    if (method !== "PUT") {
      return res
        .setHeader("Allow", ["PUT"])
        .status(HttpStatusCode.MethodNotAllowed)
        .json({ success: false, error: `Method ${method} Not Allowed` })
    }

    const { tenant: { id = null, name = null, apartment = null } = {} } = body
    if (!id && !name && !apartment) {
      throw new Error("Tenant Object must be provided")
    }

    await dbConnect()
    await TenantModel.findByIdAndUpdate<Tenant>(id, new Tenant({ name, apartment }))

    res.status(HttpStatusCode.Accepted).json({ success: true })
  } catch (error: any) {
    res.status(HttpStatusCode.BadRequest).json({ success: false, error: error?.message })
  }
}
