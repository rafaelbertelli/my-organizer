import { ErrorHttp, SuccessHttp } from "@/backend/domain/http-response"
import dbConnect from "@/backend/infra/db/connection/mongo-connection"
import TenantModel from "@/backend/infra/db/model/tenant.model"
import { HttpStatusCode } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessHttp<string> | ErrorHttp>
) {
  try {
    const { method, query } = req

    if (method !== "DELETE") {
      return res
        .setHeader("Allow", ["DELETE"])
        .status(HttpStatusCode.MethodNotAllowed)
        .json({ success: false, error: `Method ${method} Not Allowed` })
    }

    await dbConnect()

    const { id } = query
    if (!id) throw new Error()

    await TenantModel.findByIdAndDelete(id)

    res.status(HttpStatusCode.NoContent).end()
  } catch (error) {
    res.status(HttpStatusCode.NotFound).json({ success: false, error })
  }
}
