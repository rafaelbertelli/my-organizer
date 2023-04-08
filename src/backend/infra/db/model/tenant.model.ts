import { TenantProps } from "@/backend/domain/tenant";
import { Schema, model, models } from "mongoose";

const TenantSchema: Schema = new Schema<TenantProps>({
  id: { type: String },
  tenant: { type: String, required: true },
  apartment: { type: String, required: true },
});

const TenantModel = models.Tenant || model("Tenant", TenantSchema);

export default TenantModel;
