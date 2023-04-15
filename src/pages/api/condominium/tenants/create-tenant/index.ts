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

    if (method !== "POST") {
      return res
        .setHeader("Allow", ["POST"])
        .status(HttpStatusCode.MethodNotAllowed)
        .json({ success: false, error: `Method ${method} Not Allowed` })
    }

    const { tenant: { name = null, apartment = null } = {} } = body
    if (!name && !apartment) {
      throw new Error("Tenant Object must be provided")
    }

    await dbConnect()
    await TenantModel.create(new Tenant({ name, apartment }))

    res.status(HttpStatusCode.Created).json({ success: true })
  } catch (error: any) {
    res.status(HttpStatusCode.BadRequest).json({ success: false, error: error?.message })
  }
}
